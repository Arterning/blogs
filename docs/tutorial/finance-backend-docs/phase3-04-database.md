# Phase 3.4 数据库选型与使用

> 目标：掌握金融系统中不同类型数据的存储方案，以及金融场景下的 Schema 设计最佳实践。

---

## 一、金融系统的数据分类

不同业务数据有完全不同的读写模式，需要选择不同的存储方案：

| 数据类型 | 特点 | 推荐存储 |
|---------|------|---------|
| 交易记录、持仓 | 强一致性、复杂查询、审计要求 | PostgreSQL / MySQL |
| 行情时间序列 | 写入量极大、范围查询为主 | TimescaleDB / ClickHouse |
| 实时持仓缓存 | 毫秒级读写、高并发 | Redis |
| 向量相似度检索 | 量化因子相似度查询 | pgvector |
| 日志/事件流 | 顺序写入、不修改 | Kafka + S3 |

---

## 二、关系型数据库：核心业务数据

### 交易记录 Schema

```sql
-- 交易记录表（Append-only，永不修改）
CREATE TABLE trade (
    id              VARCHAR(36)    PRIMARY KEY,       -- UUID
    order_id        VARCHAR(36)    NOT NULL,
    account_id      VARCHAR(32)    NOT NULL,
    symbol          VARCHAR(32)    NOT NULL,
    exchange        VARCHAR(16)    NOT NULL,

    side            CHAR(1)        NOT NULL CHECK (side IN ('B','S')),
    qty             DECIMAL(20,6)  NOT NULL CHECK (qty > 0),
    price           DECIMAL(20,8)  NOT NULL CHECK (price > 0),
    gross_amount    DECIMAL(26,4)  NOT NULL,          -- qty × price
    commission      DECIMAL(16,4)  NOT NULL DEFAULT 0,
    net_amount      DECIMAL(26,4)  NOT NULL,          -- gross ± commission

    currency        CHAR(3)        NOT NULL DEFAULT 'CNY',
    trade_time      TIMESTAMPTZ    NOT NULL,
    settlement_date DATE           NOT NULL,

    -- 来源追踪
    exchange_trade_id VARCHAR(64),                    -- 交易所成交编号
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- 索引策略：覆盖最常见的查询模式
CREATE INDEX idx_trade_account_time  ON trade (account_id, trade_time DESC);
CREATE INDEX idx_trade_symbol_time   ON trade (symbol, trade_time DESC);
CREATE INDEX idx_trade_settlement    ON trade (settlement_date) WHERE settlement_date >= CURRENT_DATE;
CREATE INDEX idx_trade_order         ON trade (order_id);
```

### 订单表 Schema

```sql
CREATE TABLE order_record (
    id              VARCHAR(36)    PRIMARY KEY,
    client_order_id VARCHAR(64)    NOT NULL UNIQUE,   -- 客户端生成的订单ID
    account_id      VARCHAR(32)    NOT NULL,
    symbol          VARCHAR(32)    NOT NULL,
    exchange        VARCHAR(16)    NOT NULL,

    side            CHAR(1)        NOT NULL,
    order_type      VARCHAR(16)    NOT NULL,           -- LIMIT, MARKET, STOP
    status          VARCHAR(16)    NOT NULL DEFAULT 'NEW',

    -- 委托信息
    ordered_qty     DECIMAL(20,6)  NOT NULL,
    limit_price     DECIMAL(20,8),                    -- 市价单为 NULL
    stop_price      DECIMAL(20,8),

    -- 成交信息（随成交逐步更新）
    filled_qty      DECIMAL(20,6)  NOT NULL DEFAULT 0,
    avg_fill_price  DECIMAL(20,8),

    -- 时间轴
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    submitted_at    TIMESTAMPTZ,                      -- 发往交易所的时间
    last_updated_at TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    expired_at      TIMESTAMPTZ,                      -- GTD 订单到期时间

    -- 交易所返回
    exchange_order_id VARCHAR(64),
    reject_reason   VARCHAR(256),

    -- 乐观锁
    version         BIGINT         NOT NULL DEFAULT 0
);

-- 状态机约束：只允许合法的状态转换（数据库层面保护）
ALTER TABLE order_record ADD CONSTRAINT chk_status
    CHECK (status IN ('NEW','PENDING_NEW','OPEN','PARTIALLY_FILLED',
                      'FILLED','PENDING_CANCEL','CANCELLED','REJECTED','EXPIRED'));
```

### 持仓表 Schema

```sql
CREATE TABLE position (
    id              BIGSERIAL      PRIMARY KEY,
    account_id      VARCHAR(32)    NOT NULL,
    symbol          VARCHAR(32)    NOT NULL,
    exchange        VARCHAR(16)    NOT NULL,

    -- 数量
    net_qty         DECIMAL(20,6)  NOT NULL DEFAULT 0,
    long_qty        DECIMAL(20,6)  NOT NULL DEFAULT 0 CHECK (long_qty >= 0),
    short_qty       DECIMAL(20,6)  NOT NULL DEFAULT 0 CHECK (short_qty >= 0),
    frozen_qty      DECIMAL(20,6)  NOT NULL DEFAULT 0 CHECK (frozen_qty >= 0),

    -- 成本
    avg_cost        DECIMAL(20,8),
    total_cost      DECIMAL(26,8)  NOT NULL DEFAULT 0,

    -- 盯市价值（由行情更新作业填写，非实时）
    last_price      DECIMAL(20,8),
    market_value    DECIMAL(26,4),
    unrealized_pnl  DECIMAL(26,4),
    price_updated_at TIMESTAMPTZ,

    updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
    version         BIGINT         NOT NULL DEFAULT 0,

    UNIQUE (account_id, symbol, exchange)
);

-- 原子更新持仓（避免并发冲突）
-- 买入时：
UPDATE position
SET    long_qty   = long_qty + $qty,
       net_qty    = long_qty + $qty - short_qty,
       total_cost = total_cost + $qty * $price,
       avg_cost   = (total_cost + $qty * $price) / (long_qty + $qty),
       version    = version + 1,
       updated_at = NOW()
WHERE  account_id = $account_id
AND    symbol     = $symbol
AND    exchange   = $exchange;
```

### 账户资金表

```sql
CREATE TABLE account_balance (
    account_id          VARCHAR(32)   PRIMARY KEY,
    currency            CHAR(3)       NOT NULL DEFAULT 'CNY',

    -- 余额分类（单位：分，存 BIGINT 避免精度问题）
    available_balance   BIGINT        NOT NULL DEFAULT 0 CHECK (available_balance >= 0),
    frozen_balance      BIGINT        NOT NULL DEFAULT 0 CHECK (frozen_balance >= 0),
    pending_settlement  BIGINT        NOT NULL DEFAULT 0,  -- 待结算（可为负）

    total_balance       BIGINT GENERATED ALWAYS AS
                        (available_balance + frozen_balance + pending_settlement) STORED,

    updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    version             BIGINT        NOT NULL DEFAULT 0
);

-- 下单冻结资金（原子操作，用 CAS 乐观锁）
UPDATE account_balance
SET    available_balance = available_balance - $amount,
       frozen_balance    = frozen_balance    + $amount,
       version           = version + 1,
       updated_at        = NOW()
WHERE  account_id        = $account_id
AND    available_balance >= $amount        -- 余额充足检查
AND    version           = $expected_version;  -- 乐观锁检查
-- 如果返回 0 行，说明余额不足或版本冲突，需要重试或报错
```

---

## 三、TimescaleDB：时间序列行情数据

### 为什么不用普通 MySQL 存行情

一个活跃股票每天产生约 100 万条 tick，全市场 5000 只股票 = 50 亿条/天。

普通 B-Tree 索引在超过数亿行后性能急剧下降，而 TimescaleDB 的分区设计专为时间序列优化。

### 建表与分区

```sql
-- 安装 TimescaleDB 扩展（PostgreSQL 插件）
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- 创建 tick 数据表
CREATE TABLE tick_data (
    symbol      VARCHAR(32)    NOT NULL,
    exchange    VARCHAR(16)    NOT NULL,
    trade_time  TIMESTAMPTZ(6) NOT NULL,  -- 微秒精度
    price       DECIMAL(20,8)  NOT NULL,
    qty         DECIMAL(20,6)  NOT NULL,
    side        CHAR(1),
    trade_id    VARCHAR(64)
);

-- 转换为超表，按时间自动分区
SELECT create_hypertable('tick_data', 'trade_time',
    chunk_time_interval => INTERVAL '1 day');

-- 添加空间维度（按 symbol 哈希分区，提升并行查询）
SELECT add_dimension('tick_data', 'symbol', number_partitions => 8);

-- 创建索引（TimescaleDB 会在每个 chunk 上创建索引）
CREATE INDEX ON tick_data (symbol, trade_time DESC);
```

### 常用查询

```sql
-- 查询某只股票最近 1 小时的 tick
SELECT * FROM tick_data
WHERE  symbol     = 'AAPL'
AND    trade_time >= NOW() - INTERVAL '1 hour'
ORDER BY trade_time ASC;

-- 聚合为 1 分钟 K 线（TimescaleDB 内置时间桶函数）
SELECT
    time_bucket('1 minute', trade_time) AS bucket,
    symbol,
    first(price, trade_time)  AS open,
    max(price)                AS high,
    min(price)                AS low,
    last(price, trade_time)   AS close,
    sum(qty)                  AS volume
FROM   tick_data
WHERE  symbol     = 'AAPL'
AND    trade_time >= '2024-01-15 09:30:00'
AND    trade_time <  '2024-01-15 16:00:00'
GROUP BY bucket, symbol
ORDER BY bucket;

-- 连续聚合（Continuous Aggregate）：预计算 K 线，查询更快
CREATE MATERIALIZED VIEW ohlcv_1min
WITH (timescaledb.continuous) AS
SELECT
    time_bucket('1 minute', trade_time) AS bucket,
    symbol,
    first(price, trade_time) AS open,
    max(price)               AS high,
    min(price)               AS low,
    last(price, trade_time)  AS close,
    sum(qty)                 AS volume
FROM tick_data
GROUP BY bucket, symbol;

-- 自动刷新（每 10 秒更新最近 1 小时的数据）
SELECT add_continuous_aggregate_policy('ohlcv_1min',
    start_offset => INTERVAL '1 hour',
    end_offset   => INTERVAL '10 seconds',
    schedule_interval => INTERVAL '10 seconds');
```

### 数据压缩与归档

```sql
-- 超过 7 天的数据自动压缩（压缩比通常 10:1）
ALTER TABLE tick_data SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'symbol',
    timescaledb.compress_orderby   = 'trade_time DESC'
);

SELECT add_compression_policy('tick_data', INTERVAL '7 days');

-- 超过 1 年的数据移至冷存储（S3 等对象存储）
SELECT add_data_tiering_policy('tick_data',
    move_after => INTERVAL '1 year');
```

---

## 四、Redis 在金融场景的应用

### 实时持仓缓存

```java
// 持仓数据写入 Redis（成交后实时更新）
public void updatePositionCache(String accountId, String symbol, BigDecimal delta) {
    String key = String.format("position:%s:%s", accountId, symbol);

    // 使用 Redis HSET 存储持仓各字段
    redisTemplate.opsForHash().increment(key, "net_qty",
        delta.multiply(new BigDecimal("1000000")).longValue()); // 存微单位避免精度

    redisTemplate.expire(key, Duration.ofHours(24));
}

// 读取实时持仓
public BigDecimal getPositionQty(String accountId, String symbol) {
    String key = String.format("position:%s:%s", accountId, symbol);
    Object val = redisTemplate.opsForHash().get(key, "net_qty");
    if (val == null) return BigDecimal.ZERO;
    return new BigDecimal(val.toString()).divide(new BigDecimal("1000000"));
}
```

### 限额计数器（滑动窗口）

```java
// 日累计交易金额限制（使用 Redis 原子操作）
public boolean checkAndIncrementDailyLimit(
        String accountId, BigDecimal amount, BigDecimal dailyLimit) {

    String key = String.format("daily_limit:%s:%s",
        accountId, LocalDate.now().toString());

    // Lua 脚本保证原子性：检查 + 累加
    String script = """
        local current = tonumber(redis.call('GET', KEYS[1]) or '0')
        local amount  = tonumber(ARGV[1])
        local limit   = tonumber(ARGV[2])
        if current + amount > limit then
            return 0
        end
        redis.call('INCRBY', KEYS[1], amount)
        redis.call('EXPIRE',  KEYS[1], 86400)
        return 1
        """;

    Long result = redisTemplate.execute(
        new DefaultRedisScript<>(script, Long.class),
        List.of(key),
        amount.multiply(new BigDecimal("100")).longValue(),  // 存分
        dailyLimit.multiply(new BigDecimal("100")).longValue()
    );

    return Long.valueOf(1L).equals(result);
}
```

### 最新行情缓存

```java
// 行情到来时更新
public void cacheMarketData(MarketData data) {
    String key = String.format("market:%s:%s", data.exchange(), data.symbol());

    Map<String, String> fields = Map.of(
        "last",    data.lastPrice().toPlainString(),
        "bid",     data.bidPrice().toPlainString(),
        "ask",     data.askPrice().toPlainString(),
        "ts",      String.valueOf(data.timestamp())
    );

    redisTemplate.opsForHash().putAll(key, fields);
    redisTemplate.expire(key, Duration.ofMinutes(5));  // 5分钟过期，防止行情停止后读到陈旧数据
}

// 风控查最新价格（必须极快）
public BigDecimal getLastPrice(String exchange, String symbol) {
    String key = String.format("market:%s:%s", exchange, symbol);
    Object val = redisTemplate.opsForHash().get(key, "last");
    if (val == null) {
        // 缓存未命中，降级查数据库
        return fallbackToDatabase(exchange, symbol);
    }
    return new BigDecimal(val.toString());
}
```

### Redis 在金融系统的注意事项

```java
// 1. Redis 是非持久化的（默认），重启后缓存消失
//    解决：仅存可以从数据库重建的数据，持仓快照是数据库权威源

// 2. Redis 单线程，复杂 Lua 脚本会阻塞其他请求
//    解决：Lua 脚本保持简短，复杂计算在应用层完成

// 3. 缓存与数据库的一致性
//    推荐：先更新数据库，再更新缓存（而非反过来）
//         或使用 Cache-Aside 模式（读时加载）

// Cache-Aside 模式
public Position getPosition(String accountId, String symbol) {
    String cacheKey = "pos:" + accountId + ":" + symbol;

    // 先查缓存
    Position cached = redisTemplate.opsForValue().get(cacheKey);
    if (cached != null) return cached;

    // 缓存未命中，查数据库
    Position pos = positionRepository.findByAccountAndSymbol(accountId, symbol);

    // 写入缓存
    redisTemplate.opsForValue().set(cacheKey, pos, Duration.ofMinutes(10));

    return pos;
}
```

---

## 五、数据一致性边界

### 什么时候用分布式事务，什么时候用最终一致性

金融系统最怕的错误：**资金凭空消失**（扣款成功但没有到账）。

```
严格一致性（同步，必须成功或失败）：
  ├── 账户扣款 + 持仓增加（同一数据库，用本地事务）
  ├── 风控更新 + 订单提交（必须同时成功）
  └── DVP 结算（资金 + 证券同步变更）

最终一致性（可以接受短暂不一致）：
  ├── 成交后更新行情统计（延迟几秒可以接受）
  ├── 盈亏报告生成（T+1 日终计算即可）
  └── 客户端持仓展示（延迟 1-2 秒可以接受）
```

### Saga 模式处理跨服务事务

当跨服务操作无法用本地事务时，用 Saga 模式管理补偿：

```java
// 下单流程：扣款 → 提交订单 → 失败时补偿
public class PlaceOrderSaga {

    public OrderResult execute(OrderRequest request) {
        String sagaId = UUID.randomUUID().toString();

        try {
            // Step 1: 冻结资金
            freezeResult = accountService.freezeFunds(request.getAccountId(),
                request.getEstimatedAmount(), sagaId);

            // Step 2: 风控检查
            RiskCheckResult riskResult = riskService.check(request);
            if (!riskResult.isPassed()) {
                // 风控拒绝，补偿：解冻资金
                accountService.unfreezeFunds(request.getAccountId(),
                    request.getEstimatedAmount(), sagaId);
                return OrderResult.rejected(riskResult.getReason());
            }

            // Step 3: 提交订单到交易所
            String orderId = orderService.submitOrder(request);
            return OrderResult.success(orderId);

        } catch (Exception e) {
            // 任何步骤失败，执行补偿
            compensate(sagaId, request);
            throw e;
        }
    }

    private void compensate(String sagaId, OrderRequest request) {
        // 查找该 sagaId 已完成的步骤，逆序补偿
        sagaLog.getCompletedSteps(sagaId).reversed().forEach(step -> {
            switch (step) {
                case "FREEZE_FUNDS" ->
                    accountService.unfreezeFunds(request.getAccountId(),
                        request.getEstimatedAmount(), sagaId);
                // 其他补偿操作...
            }
        });
    }
}
```

---

## 六、数据库连接池配置

金融系统的连接池配置与普通 Web 服务不同：

```yaml
# HikariCP 配置（Spring Boot）
spring:
  datasource:
    hikari:
      maximum-pool-size: 20         # 不要设太大，数据库连接是昂贵资源
      minimum-idle: 5
      connection-timeout: 3000      # 3秒获取连接超时（金融系统不能等太久）
      idle-timeout: 600000          # 10分钟空闲连接回收
      max-lifetime: 1800000         # 30分钟连接最大生命周期
      keepalive-time: 60000         # 1分钟发一次 keepalive，防止防火墙断开连接

      # 连接验证（确保连接可用）
      connection-test-query: SELECT 1
      validation-timeout: 1000      # 1秒内必须验证成功

      # 事务隔离级别（金融系统通常用 READ_COMMITTED 而非默认）
      transaction-isolation: TRANSACTION_READ_COMMITTED
```

### 读写分离

```java
// 交易热路径走主库（强一致性）
@Transactional
public void processOrder(Order order) {
    positionRepository.updatePosition(...);  // 主库写
    tradeRepository.save(trade);             // 主库写
}

// 报表查询走从库（允许略有延迟）
@Transactional(readOnly = true)
@ReadReplica  // 自定义注解路由到从库
public List<Trade> getTradeHistory(String accountId, LocalDate date) {
    return tradeRepository.findByAccountAndDate(accountId, date);
}
```

---

## 本节小结

| 存储类型 | 使用场景 | 关键配置 |
|---------|---------|---------|
| PostgreSQL | 交易、持仓、账户（强一致） | 乐观锁、原子 UPDATE、DECIMAL 精度 |
| TimescaleDB | Tick 行情、K 线（时间序列） | 超表分区、连续聚合、自动压缩 |
| Redis | 实时持仓缓存、限额计数、行情缓存 | Lua 原子脚本、设置过期时间 |
| Kafka | 事件流、审计日志（不可变流） | acks=all、幂等生产者 |

**下一节**：[Phase 3.5 金融系统可靠性](./phase3-05-reliability.md)
