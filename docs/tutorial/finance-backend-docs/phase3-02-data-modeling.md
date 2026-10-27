# Phase 3.2 金融数据建模

> 目标：掌握金融系统中数据精度、持仓模型、时间序列等核心建模问题。

---

## 一、精度问题：永远不要用 float/double

这是金融系统最基础也最容易犯错的地方。

### 浮点数为什么不能用于金融计算

```java
// 灾难性的浮点精度问题
double price = 0.1 + 0.2;
System.out.println(price);  // 输出：0.30000000000000004，不是 0.3！

// 积少成多的误差
double total = 0.0;
for (int i = 0; i < 10; i++) {
    total += 0.1;
}
System.out.println(total);  // 输出：0.9999999999999999，不是 1.0！
```

根本原因：`double` 是 IEEE 754 二进制浮点，无法精确表示大多数十进制小数（就像十进制无法精确表示 1/3）。

在金融系统中，这种精度误差会导致：
- 对账差异（内部计算结果与交易所回报不符）
- 盈亏计算错误（累计交易多了可能差出几分钱）
- 合规问题（监管报告数据不准确）

### 正确方案：BigDecimal

```java
// 正确：使用 BigDecimal
BigDecimal price = new BigDecimal("0.1").add(new BigDecimal("0.2"));
System.out.println(price);  // 输出：0.3，精确！

// 关键：必须用字符串构造，不能用 double 构造
BigDecimal wrong = new BigDecimal(0.1);   // 错！double 已经精度丢失
BigDecimal right = new BigDecimal("0.1"); // 对！字符串精确

// 计算盈亏
BigDecimal buyPrice  = new BigDecimal("150.25");
BigDecimal sellPrice = new BigDecimal("152.80");
BigDecimal qty       = new BigDecimal("100");

BigDecimal pnl = sellPrice.subtract(buyPrice).multiply(qty);
// 结果：255.00，精确
```

### 舍入模式的选择

金融计算中不同场景使用不同舍入模式：

```java
// 价格计算：四舍五入（HALF_UP）
BigDecimal avgPrice = totalAmount.divide(totalQty, 4, RoundingMode.HALF_UP);

// 税费计算：向上取整（CEILING），保守估计
BigDecimal tax = amount.multiply(TAX_RATE).setScale(2, RoundingMode.CEILING);

// 手续费：向上取整（不能少收）
BigDecimal commission = tradeValue.multiply(COMMISSION_RATE)
    .setScale(2, RoundingMode.CEILING);
    .max(MIN_COMMISSION);  // 最低手续费

// 总结
// HALF_UP：一般价格、金额计算
// CEILING：对己方有利的计算（收费时用）
// FLOOR：对客户有利的计算（退款时用）
// HALF_EVEN（银行家舍入）：统计场景，减少累计误差
```

### 存储方案：数据库中的精度

```sql
-- 错误：使用 FLOAT 或 DOUBLE
price FLOAT  -- 会有精度问题

-- 正确方案一：DECIMAL 类型
price DECIMAL(20, 8)   -- 整数部分12位，小数部分8位

-- 正确方案二：存整数（以分或最小单位存储）
price_cents BIGINT     -- 价格 × 100，存分，避免小数
qty_lots    BIGINT     -- 数量 × 1000000，存微手

-- 推荐：DECIMAL，语义清晰；
-- BIGINT 性能更好，但需要应用层做单位换算
```

---

## 二、价格与数量的单位体系

不同市场、不同资产类别有不同的计价单位，必须在建模时明确。

### 外汇市场的 Pip

```
EUR/USD 汇率：1.10250
                ↑↑↑↑↑
                || └── 第5位小数 = 0.1 pip（Point）
                |└─── 第4位小数 = 1 pip
                └──── 前3位 = 整数部分

1 pip = 0.0001（大多数货币对）
1 pip = 0.01（日元相关货币对，因日元面值小）

存储：用 BIGINT 存 pip 数
double price = 1.10250;              // 危险
long pricePips = 110250;             // 安全：1.10250 × 100000
```

### 股票市场的最小价格变动单位（Tick Size）

```java
// 不同市场的 tick size 不同
public enum Market {
    A_SHARE {
        // A 股：0.01 元
        @Override public BigDecimal tickSize() { return new BigDecimal("0.01"); }
    },
    US_EQUITY {
        // 美股：0.01 美元（2001年前是 1/8 分数报价）
        @Override public BigDecimal tickSize() { return new BigDecimal("0.01"); }
    },
    NIKKEI_225_FUTURES {
        // 日经225期货：5点
        @Override public BigDecimal tickSize() { return new BigDecimal("5"); }
    };

    public abstract BigDecimal tickSize();

    // 将价格规整到合法 tick
    public BigDecimal roundToTick(BigDecimal price) {
        BigDecimal tick = tickSize();
        return price.divide(tick, 0, RoundingMode.HALF_UP).multiply(tick);
    }
}
```

### 数量单位：手 vs 股

```java
// A 股：1手 = 100股（最小交易单位）
// 期货：1手 = 合约乘数 × 标的单位

public class QuantityConverter {
    // A 股：手 → 股
    public static BigDecimal lotsToShares(BigDecimal lots) {
        return lots.multiply(new BigDecimal("100"));
    }

    // 沪深300股指期货：1手合约价值 = 指数点 × 300元
    public static BigDecimal futuresContractValue(
            BigDecimal indexLevel, int multiplier) {
        return indexLevel.multiply(new BigDecimal(multiplier));
    }
}
```

---

## 三、持仓模型设计

持仓模型是交易系统的核心数据模型，设计不好会带来一系列连锁问题。

### 单账户单资产持仓

```sql
CREATE TABLE position (
    id              BIGINT PRIMARY KEY,
    account_id      VARCHAR(32) NOT NULL,
    symbol          VARCHAR(32) NOT NULL,
    exchange        VARCHAR(16) NOT NULL,       -- 交易所（同一股票可能在多个交易所）

    -- 数量
    net_qty         DECIMAL(20, 6) NOT NULL DEFAULT 0,  -- 净持仓（多为正，空为负）
    long_qty        DECIMAL(20, 6) NOT NULL DEFAULT 0,  -- 多头数量
    short_qty       DECIMAL(20, 6) NOT NULL DEFAULT 0,  -- 空头数量（期货/融券）

    -- 成本
    avg_cost        DECIMAL(20, 8),                     -- 平均成本价
    total_cost      DECIMAL(26, 8),                     -- 总成本（qty × avg_cost）

    -- 市值（由行情更新）
    last_price      DECIMAL(20, 8),
    market_value    DECIMAL(26, 8),
    unrealized_pnl  DECIMAL(26, 8),                     -- 浮动盈亏

    -- 结算状态
    settled_qty     DECIMAL(20, 6) NOT NULL DEFAULT 0,  -- 已结算数量
    unsettled_qty   DECIMAL(20, 6) NOT NULL DEFAULT 0,  -- 待结算数量（T+N）

    -- 冻结（已下单但未成交）
    frozen_qty      DECIMAL(20, 6) NOT NULL DEFAULT 0,

    -- 审计字段
    version         BIGINT NOT NULL DEFAULT 0,          -- 乐观锁版本号
    updated_at      TIMESTAMP NOT NULL,

    UNIQUE KEY uk_account_symbol (account_id, symbol, exchange)
);
```

### 平均成本计算（移动加权平均）

```java
// 买入时：更新平均成本
public void onBuy(BigDecimal qty, BigDecimal price) {
    // 移动加权平均：新成本 = (原总成本 + 新成本) / 新总量
    BigDecimal newTotalCost = this.totalCost.add(qty.multiply(price));
    BigDecimal newTotalQty  = this.longQty.add(qty);

    this.avgCost   = newTotalCost.divide(newTotalQty, 8, HALF_UP);
    this.totalCost = newTotalCost;
    this.longQty   = newTotalQty;
    this.netQty    = this.longQty.subtract(this.shortQty);
}

// 卖出时：成本不变，数量减少，实现盈亏
public RealizedPnL onSell(BigDecimal qty, BigDecimal price) {
    if (qty.compareTo(this.longQty) > 0) {
        throw new InsufficientPositionException();
    }
    // 实现盈亏 = (卖出价 - 平均成本) × 卖出数量
    BigDecimal realizedPnL = price.subtract(this.avgCost).multiply(qty);

    this.totalCost = this.avgCost.multiply(this.longQty.subtract(qty));
    this.longQty   = this.longQty.subtract(qty);
    this.netQty    = this.longQty.subtract(this.shortQty);

    return new RealizedPnL(realizedPnL);
}
```

### 多账户、多币种持仓

```java
// 多币种持仓需要换算为本位币（Base Currency）
public BigDecimal calculatePortfolioValueInBaseCurrency(
        List<Position> positions,
        String baseCurrency,
        Map<String, BigDecimal> fxRates) {

    return positions.stream()
        .map(pos -> {
            BigDecimal localValue = pos.getMarketValue();
            String posCurrency = pos.getCurrency();

            if (posCurrency.equals(baseCurrency)) {
                return localValue;
            }

            // 汇率换算：如 position 是 USD，base 是 CNY
            String fxPair = posCurrency + baseCurrency;  // USDCNY
            BigDecimal fxRate = fxRates.get(fxPair);

            return localValue.multiply(fxRate);
        })
        .reduce(BigDecimal.ZERO, BigDecimal::add);
}
```

---

## 四、时间序列数据

### OHLCV 数据结构

每个时间周期的行情数据：

```sql
CREATE TABLE ohlcv (
    symbol      VARCHAR(32)  NOT NULL,
    exchange    VARCHAR(16)  NOT NULL,
    interval    VARCHAR(8)   NOT NULL,    -- 1m, 5m, 1h, 1d
    open_time   TIMESTAMP    NOT NULL,    -- K线开始时间

    open        DECIMAL(20, 8) NOT NULL,  -- 开盘价
    high        DECIMAL(20, 8) NOT NULL,  -- 最高价
    low         DECIMAL(20, 8) NOT NULL,  -- 最低价
    close       DECIMAL(20, 8) NOT NULL,  -- 收盘价
    volume      DECIMAL(26, 6) NOT NULL,  -- 成交量
    turnover    DECIMAL(30, 4) NOT NULL,  -- 成交额（volume × price）
    trade_count INT          NOT NULL,    -- 成交笔数

    PRIMARY KEY (symbol, exchange, interval, open_time)
);

-- TimescaleDB 超表（大规模时间序列推荐）
SELECT create_hypertable('ohlcv', 'open_time', chunk_time_interval => INTERVAL '1 month');
```

### Tick 数据（逐笔成交）

```sql
CREATE TABLE tick (
    symbol      VARCHAR(32)  NOT NULL,
    exchange    VARCHAR(16)  NOT NULL,
    trade_time  TIMESTAMP(6) NOT NULL,  -- 微秒级精度
    trade_id    VARCHAR(64)  NOT NULL,

    price       DECIMAL(20, 8) NOT NULL,
    qty         DECIMAL(20, 6) NOT NULL,
    side        CHAR(1),                -- B=买方主动，S=卖方主动

    PRIMARY KEY (symbol, exchange, trade_time, trade_id)
);
```

### 从 Tick 合并为 K 线

```java
// 实时聚合：将 tick 数据合并为 1 分钟 K 线
public class KLineAggregator {
    private final Map<String, KLineBuilder> builders = new ConcurrentHashMap<>();

    public Optional<KLine> onTick(Tick tick) {
        String key = tick.getSymbol() + ":" + truncateToMinute(tick.getTime());
        KLineBuilder builder = builders.computeIfAbsent(key, k -> new KLineBuilder(tick));

        builder.update(tick);

        // 检查是否到了下一分钟，需要关闭当前 K 线
        if (isNewMinute(tick.getTime(), builder.getOpenTime())) {
            KLine closed = builders.remove(getPreviousMinuteKey(key)).build();
            return Optional.of(closed);
        }
        return Optional.empty();
    }

    static class KLineBuilder {
        private final BigDecimal open;
        private BigDecimal high;
        private BigDecimal low;
        private BigDecimal close;
        private BigDecimal volume = ZERO;
        private final LocalDateTime openTime;

        KLineBuilder(Tick firstTick) {
            this.open     = firstTick.getPrice();
            this.high     = firstTick.getPrice();
            this.low      = firstTick.getPrice();
            this.close    = firstTick.getPrice();
            this.openTime = truncateToMinute(firstTick.getTime());
        }

        void update(Tick tick) {
            this.high   = this.high.max(tick.getPrice());
            this.low    = this.low.min(tick.getPrice());
            this.close  = tick.getPrice();
            this.volume = this.volume.add(tick.getQty());
        }

        KLine build() {
            return new KLine(openTime, open, high, low, close, volume);
        }
    }
}
```

---

## 五、事件溯源（Event Sourcing）

传统方式存储"当前状态"，事件溯源存储"事件历史"，通过重放事件得到任意时刻的状态。

### 为什么金融系统适合事件溯源

1. **完整审计轨迹**：每一笔资金变动都有来源，满足合规要求
2. **可回溯**：可以计算任意历史时刻的持仓状态
3. **事件是事实**：交易发生了就是发生了，不能修改

### 实现示例

```java
// 领域事件定义
public sealed interface PositionEvent {
    String accountId();
    String symbol();
    Instant occurredAt();

    record OrderFilled(
        String accountId, String symbol, Instant occurredAt,
        String orderId, Side side, BigDecimal qty, BigDecimal price
    ) implements PositionEvent {}

    record DividendReceived(
        String accountId, String symbol, Instant occurredAt,
        BigDecimal cashAmount, BigDecimal shareAmount
    ) implements PositionEvent {}

    record StockSplit(
        String accountId, String symbol, Instant occurredAt,
        BigDecimal splitRatio  // 2.0 表示 2:1 拆分
    ) implements PositionEvent {}
}

// 事件存储
@Entity
public class PositionEventRecord {
    @Id private Long id;
    private String accountId;
    private String symbol;
    private String eventType;
    private String eventPayload;  // JSON 序列化的事件
    private Instant occurredAt;
    // Append-only：没有 update 方法
}

// 通过重放事件重建持仓
public Position rebuildPosition(String accountId, String symbol, Instant asOf) {
    List<PositionEvent> events = eventStore.findEvents(accountId, symbol, asOf);

    Position position = Position.empty(accountId, symbol);
    for (PositionEvent event : events) {
        position = apply(position, event);  // 纯函数，每次返回新状态
    }
    return position;
}

private Position apply(Position pos, PositionEvent event) {
    return switch (event) {
        case OrderFilled e -> e.side() == BUY
            ? pos.addLong(e.qty(), e.price())
            : pos.addShort(e.qty(), e.price());
        case DividendReceived e -> pos.applyDividend(e.cashAmount(), e.shareAmount());
        case StockSplit e -> pos.applySplit(e.splitRatio());
    };
}
```

### 性能问题：快照（Snapshot）

重放全量事件很慢，用快照优化：

```java
// 定期保存快照（如每日收盘后）
public void saveSnapshot(String accountId, String symbol, Position position) {
    PositionSnapshot snapshot = new PositionSnapshot(
        accountId, symbol,
        position,
        Instant.now()
    );
    snapshotStore.save(snapshot);
}

// 重建时：从最近快照开始，只重放快照之后的事件
public Position rebuildPosition(String accountId, String symbol, Instant asOf) {
    Optional<PositionSnapshot> snapshot =
        snapshotStore.findLatestBefore(accountId, symbol, asOf);

    Instant fromTime = snapshot.map(PositionSnapshot::getCreatedAt)
                               .orElse(Instant.EPOCH);

    Position position = snapshot.map(PositionSnapshot::getPosition)
                                .orElse(Position.empty(accountId, symbol));

    // 只重放快照之后的事件
    List<PositionEvent> events = eventStore.findEvents(accountId, symbol, fromTime, asOf);
    for (PositionEvent event : events) {
        position = apply(position, event);
    }
    return position;
}
```

---

## 六、数据建模常见陷阱

### 陷阱一：时区问题

```java
// 错误：使用系统默认时区，不同服务器时区不同会出错
LocalDateTime tradeTime = LocalDateTime.now();  // 危险！

// 正确：统一使用 UTC，存储时带时区信息
Instant tradeTime = Instant.now();  // UTC 时间戳

// 数据库存储
// 错：DATETIME（无时区）
// 对：TIMESTAMP WITH TIME ZONE 或存 UTC 的 BIGINT（毫秒时间戳）

// 展示时再转换为本地时区
ZonedDateTime displayTime = tradeTime.atZone(ZoneId.of("Asia/Shanghai"));
```

### 陷阱二：并发更新持仓

```java
// 错误：先读后写，高并发下产生竞态条件
Position pos = positionRepo.findByAccountSymbol(accountId, symbol);
pos.setNetQty(pos.getNetQty().add(delta));  // 如果两个线程同时读，会覆盖彼此的更新
positionRepo.save(pos);

// 正确方案一：乐观锁（适合冲突少的场景）
@Version
private Long version;  // JPA 乐观锁

// 正确方案二：数据库原子更新（推荐）
@Modifying
@Query("UPDATE position SET net_qty = net_qty + :delta, version = version + 1 " +
       "WHERE account_id = :accountId AND symbol = :symbol")
int updatePosition(@Param("accountId") String accountId,
                   @Param("symbol") String symbol,
                   @Param("delta") BigDecimal delta);

// 正确方案三：单线程处理同一账户的事件（事件溯源+Disruptor）
```

### 陷阱三：金额加总精度

```java
// 错误：直接 sum()，累计误差
double total = positions.stream()
    .mapToDouble(p -> p.getMarketValue().doubleValue())
    .sum();  // 精度丢失

// 正确：用 BigDecimal reduce
BigDecimal total = positions.stream()
    .map(Position::getMarketValue)
    .reduce(BigDecimal.ZERO, BigDecimal::add);
```

---

## 本节小结

| 主题 | 核心原则 |
|------|---------|
| 精度 | 永远用 `BigDecimal`，永远用字符串构造，舍入模式要明确 |
| 单位 | 明确 tick size、手数/股数、pip，换算逻辑集中管理 |
| 持仓模型 | 移动加权平均成本，区分多头/空头/冻结/待结算 |
| 时间序列 | OHLCV 结构，TimescaleDB 存储，tick 聚合为 K 线 |
| 事件溯源 | Append-only 事件流 + 快照，满足审计和回溯需求 |
| 并发 | 数据库原子更新或乐观锁，不要先读后写 |

**下一节**：[Phase 3.3 消息与通信](./phase3-03-messaging.md)
