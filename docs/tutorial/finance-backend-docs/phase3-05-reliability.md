# Phase 3.5 金融系统可靠性

> 目标：掌握金融系统在资金安全、对账、灾备等方面的可靠性设计。

---

## 一、金融系统可靠性的特殊性

普通系统：页面崩溃了，刷新重试。  
金融系统：一笔钱如果扣了但没到账，不能"刷新重试"。

金融系统的可靠性要求：

| 普通 Web 服务 | 金融交易系统 |
|-------------|------------|
| 99.9% 可用性（8.7小时/年停机） | 99.999%（5分钟/年） |
| 数据最终一致 | 资金类数据强一致 |
| 错误可重试 | 操作必须幂等，不能重复扣款 |
| 日志用于调试 | 审计日志是法律证据 |

---

## 二、幂等性设计

### 幂等性的核心：相同的操作执行多次，结果与执行一次相同

为什么金融系统必须幂等：
- 网络超时后，客户端不知道服务端是否处理成功，会重试
- 消息队列至少一次（at-least-once）语义，可能重复投递
- 分布式事务失败后的补偿操作可能重复执行

### 方案一：唯一业务键 + 数据库唯一约束

```java
// 每笔交易有唯一的 idempotency_key（客户端生成或订单ID）
public TradeResult recordTrade(Trade trade) {
    try {
        tradeRepository.insert(trade);  // trade 有 UNIQUE(client_order_id, exchange_trade_id)
        return TradeResult.success(trade.getId());
    } catch (DataIntegrityViolationException e) {
        // 唯一键冲突，说明已经处理过，幂等返回
        Trade existing = tradeRepository.findByExchangeTradeId(trade.getExchangeTradeId());
        return TradeResult.success(existing.getId());  // 返回已存在的记录
    }
}
```

### 方案二：幂等性令牌表

```sql
-- 幂等性令牌表（防止任何操作被重复执行）
CREATE TABLE idempotency_key (
    key         VARCHAR(128) PRIMARY KEY,
    result      TEXT,                         -- 第一次执行的结果（JSON）
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    expires_at  TIMESTAMPTZ  NOT NULL
);
```

```java
public <T> T executeIdempotently(String idempotencyKey, Supplier<T> operation) {
    // 1. 查询是否已执行过
    Optional<IdempotencyRecord> existing =
        idempotencyRepo.findByKey(idempotencyKey);

    if (existing.isPresent()) {
        // 已执行过，直接返回缓存结果
        return deserialize(existing.get().getResult());
    }

    // 2. 执行操作
    T result = operation.get();

    // 3. 保存执行结果（带过期时间，避免永久占存储）
    idempotencyRepo.save(new IdempotencyRecord(
        idempotencyKey,
        serialize(result),
        Instant.now().plus(Duration.ofDays(7))
    ));

    return result;
}

// 使用：下单接口
public OrderResponse placeOrder(String idempotencyKey, OrderRequest request) {
    return executeIdempotently(idempotencyKey, () -> {
        // 这里的逻辑只会执行一次，即使客户端重试
        return orderService.createOrder(request);
    });
}
```

### 方案三：状态机保护（防止无效状态转换）

```java
// 订单状态机：只允许合法的状态转换
public void transitionStatus(Order order, OrderStatus newStatus) {
    Map<OrderStatus, Set<OrderStatus>> allowedTransitions = Map.of(
        NEW,              Set.of(PENDING_NEW, REJECTED),
        PENDING_NEW,      Set.of(OPEN, REJECTED),
        OPEN,             Set.of(PARTIALLY_FILLED, FILLED, PENDING_CANCEL, CANCELLED),
        PARTIALLY_FILLED, Set.of(FILLED, PENDING_CANCEL, CANCELLED),
        PENDING_CANCEL,   Set.of(CANCELLED, OPEN)  // 撤单可能失败，回到 OPEN
    );

    Set<OrderStatus> allowed = allowedTransitions.getOrDefault(
        order.getStatus(), Collections.emptySet());

    if (!allowed.contains(newStatus)) {
        throw new InvalidStateTransitionException(
            String.format("Cannot transition from %s to %s for order %s",
                order.getStatus(), newStatus, order.getId())
        );
    }

    order.setStatus(newStatus);
}
```

---

## 三、对账系统设计

对账是金融系统的"最后防线"——即使前面的代码有 bug，对账能发现问题。

### 对账的三个层次

```
Layer 1：实时对账（毫秒级）
  每笔成交后，立即校验：OMS持仓 == 风控持仓

Layer 2：日内对账（分钟级）
  每隔 N 分钟，全量比对：内部持仓 vs 清算系统持仓

Layer 3：日终对账（T+1）
  收到托管行日终报告后，全量比对：
    ├── 持仓对账：内部持仓 vs 托管行持仓
    ├── 资金对账：内部资金 vs 银行账单
    └── 交易对账：内部成交 vs 交易所成交记录
```

### 对账引擎实现

```java
public class ReconciliationEngine {

    // 持仓对账：比较内部持仓与外部来源（交易所/托管行）
    public ReconciliationReport reconcilePositions(
            List<InternalPosition> internal,
            List<ExternalPosition> external,
            ReconciliationSource source,
            LocalDate asOfDate) {

        Map<String, InternalPosition> internalMap = internal.stream()
            .collect(toMap(p -> p.getSymbol() + ":" + p.getAccountId(), p -> p));

        Map<String, ExternalPosition> externalMap = external.stream()
            .collect(toMap(p -> p.getSymbol() + ":" + p.getAccountId(), p -> p));

        List<ReconciliationBreak> breaks = new ArrayList<>();

        // 检查内部有但外部没有的
        internalMap.forEach((key, inPos) -> {
            ExternalPosition exPos = externalMap.get(key);
            if (exPos == null) {
                breaks.add(ReconciliationBreak.missingExternal(inPos));
            } else {
                BigDecimal diff = inPos.getNetQty().subtract(exPos.getNetQty());
                if (diff.abs().compareTo(TOLERANCE) > 0) {
                    breaks.add(ReconciliationBreak.quantityMismatch(inPos, exPos, diff));
                }
            }
        });

        // 检查外部有但内部没有的
        externalMap.forEach((key, exPos) -> {
            if (!internalMap.containsKey(key)) {
                breaks.add(ReconciliationBreak.missingInternal(exPos));
            }
        });

        return new ReconciliationReport(source, asOfDate, breaks);
    }

    // 资金对账
    public ReconciliationReport reconcileCash(
            List<InternalTransaction> internalTxns,
            List<BankStatement> bankStatements) {

        // 按日期、金额、对方账户匹配
        List<BankStatement> unmatchedBank = new ArrayList<>(bankStatements);
        List<InternalTransaction> unmatchedInternal = new ArrayList<>(internalTxns);

        for (InternalTransaction txn : internalTxns) {
            Optional<BankStatement> match = unmatchedBank.stream()
                .filter(stmt ->
                    stmt.getAmount().compareTo(txn.getAmount()) == 0 &&
                    stmt.getDate().equals(txn.getSettlementDate()) &&
                    stmt.getReference().contains(txn.getReference())
                )
                .findFirst();

            if (match.isPresent()) {
                unmatchedBank.remove(match.get());
                unmatchedInternal.remove(txn);
            }
        }

        // 未匹配的就是对账差异
        return buildReport(unmatchedInternal, unmatchedBank);
    }
}
```

### 对账差异的处理流程

```
对账差异发现
        │
        ▼
自动分类（是否有已知原因？）
        │
   ┌────┴────┐
   ▼         ▼
已知差异    未知差异
（如：      （需人工介入）
 T+1延迟）       │
   │             ▼
   │       差异工单创建
   │             │
   │       ┌────┴────┐
   │       ▼         ▼
   │    可自动修复  需人工处理
   │    （补录交易） │
   │             ▼
   │       合规上报（超过阈值）
   │
   ▼
自动标记已解释，纳入例外报告
```

---

## 四、防重复下单

### 场景

1. 用户点击下单按钮，网络超时
2. 用户以为失败，再次点击
3. 实际上第一次请求已经到达服务器并处理成功
4. 如果不处理幂等性：用户重复下单两次

```java
// 前端：按钮点击后立即禁用，请求成功或明确失败才恢复
// 后端：幂等键防重

@PostMapping("/orders")
public ResponseEntity<OrderResponse> placeOrder(
        @RequestHeader("X-Idempotency-Key") String idempotencyKey,
        @RequestBody OrderRequest request) {

    // 格式校验
    if (!isValidIdempotencyKey(idempotencyKey)) {
        return ResponseEntity.badRequest().body(OrderResponse.error("INVALID_IDEMPOTENCY_KEY"));
    }

    OrderResponse response = idempotentOrderService.placeOrder(idempotencyKey, request);
    return ResponseEntity.ok(response);
}
```

### 防止内部系统重复处理

```java
// Kafka 消费时的去重
@KafkaListener(topics = "order-events", groupId = "position-service")
public void onOrderEvent(OrderEvent event, Acknowledgment ack) {
    String dedupKey = "processed:" + event.getEventId();

    // 用 Redis SET NX（Not eXists）做分布式去重
    Boolean isNew = redisTemplate.opsForValue()
        .setIfAbsent(dedupKey, "1", Duration.ofDays(3));

    if (Boolean.FALSE.equals(isNew)) {
        log.info("Duplicate event skipped: {}", event.getEventId());
        ack.acknowledge();
        return;
    }

    try {
        positionService.apply(event);
        ack.acknowledge();
    } catch (Exception e) {
        // 处理失败，删除去重标记，允许重试
        redisTemplate.delete(dedupKey);
        throw e;
    }
}
```

---

## 五、灾备架构

### RPO 与 RTO

- **RPO（Recovery Point Objective）**：最多允许丢失多长时间的数据
- **RTO（Recovery Time Objective）**：最多允许多长时间恢复服务

金融系统典型要求：
| 系统 | RPO | RTO |
|------|-----|-----|
| 交易核心系统 | 0（不允许数据丢失） | < 30 秒 |
| 行情数据 | < 1 分钟 | < 5 分钟 |
| 报表系统 | < 4 小时 | < 2 小时 |

### 主备架构

```
正常情况：
用户/交易所 ──► 主节点（Active）
                    │
                    │ 同步复制
                    ▼
                备节点（Standby）

故障切换（< 30秒）：
主节点宕机
    │
    ▼
健康检查失败
    │
    ▼
VIP 漂移到备节点
    │
    ▼
备节点升为主节点
    │
    ▼
用户/交易所流量自动切换（DNS/VIP 方式）
```

```yaml
# PostgreSQL 主备同步复制（postgresql.conf）
# 主库配置
wal_level = replica
max_wal_senders = 3
synchronous_commit = on           # 同步提交，确保 RPO=0
synchronous_standby_names = '*'   # 所有备库必须确认才算提交成功
```

### 多活架构（Active-Active）

比主备更高的可用性，两个数据中心同时处理请求：

```
数据中心 A                    数据中心 B
   │                              │
   ├── 交易系统 A                  ├── 交易系统 B
   ├── 数据库 A（主）              ├── 数据库 B（主）
   └── 数据同步 ──────────────────►└── 数据同步
                ◄──────────────────

账户级别分片：
奇数 AccountID → 数据中心 A 处理
偶数 AccountID → 数据中心 B 处理
（避免同一账户的操作在两个数据中心并发）
```

---

## 六、审计日志系统

### 设计原则

审计日志是金融监管的法律要求，必须满足：
1. **完整性**：所有关键操作都有记录
2. **不可篡改**：日志不能被修改或删除
3. **可追溯**：从任何操作可以追溯到人和原因
4. **长期保存**：通常 5-10 年

### 审计切面

```java
// 使用 AOP 自动记录关键操作，无需在每个方法里手写
@Aspect
@Component
public class AuditLogAspect {

    @Around("@annotation(Auditable)")
    public Object audit(ProceedingJoinPoint joinPoint) throws Throwable {
        AuditContext context = buildContext(joinPoint);

        // 记录操作前状态
        String beforeState = captureState(joinPoint.getArgs());
        long startTime = System.currentTimeMillis();

        try {
            Object result = joinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;

            // 记录成功日志
            auditLogService.record(AuditLog.builder()
                .operatorId(SecurityContext.getCurrentUserId())
                .operationType(context.operationType())
                .resourceType(context.resourceType())
                .resourceId(extractResourceId(joinPoint.getArgs()))
                .beforeState(beforeState)
                .afterState(captureState(result))
                .result("SUCCESS")
                .durationMs(duration)
                .ipAddress(RequestContext.getClientIp())
                .requestId(RequestContext.getRequestId())
                .timestamp(Instant.now())
                .build());

            return result;

        } catch (Exception e) {
            // 记录失败日志
            auditLogService.record(AuditLog.builder()
                // ...
                .result("FAILED")
                .errorMessage(e.getMessage())
                .build());
            throw e;
        }
    }
}

// 使用注解标记需要审计的操作
@Auditable(operationType = "ORDER_CANCEL", resourceType = "ORDER")
public void cancelOrder(String orderId, String reason) {
    // 业务逻辑，AOP 自动记录审计日志
}
```

### 审计日志存储

```java
// 审计日志写入专用的 append-only 表
// 数据库层面：revoke UPDATE, DELETE 权限
// 应用层面：Repository 只提供 save 方法，不提供 update/delete

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    // 只提供写入和查询，不提供更新/删除
    // 框架生成的 delete 方法会被数据库权限拦截

    List<AuditLog> findByOperatorIdAndTimestampBetween(
        String operatorId, Instant start, Instant end);

    List<AuditLog> findByResourceTypeAndResourceId(
        String resourceType, String resourceId);
}
```

### 日志防篡改：哈希链

```java
// 每条日志包含前一条日志的哈希，形成哈希链
// 任何篡改都会破坏哈希链，可以被检测到

public AuditLog record(AuditLog.Builder builder) {
    // 获取最新一条日志的哈希
    String previousHash = auditLogRepository.findLatestHash()
        .orElse("GENESIS");  // 第一条日志的前驱哈希

    String content = buildContent(builder);  // 序列化日志内容

    // 计算本条日志的哈希（内容 + 前一条哈希）
    String currentHash = sha256(content + previousHash);

    AuditLog log = builder
        .previousHash(previousHash)
        .currentHash(currentHash)
        .build();

    return auditLogRepository.save(log);
}

// 验证日志完整性
public boolean verifyIntegrity(List<AuditLog> logs) {
    for (int i = 1; i < logs.size(); i++) {
        AuditLog current  = logs.get(i);
        AuditLog previous = logs.get(i - 1);

        // 检查哈希链是否完整
        if (!current.getPreviousHash().equals(previous.getCurrentHash())) {
            log.error("Hash chain broken at log id: {}", current.getId());
            return false;
        }

        // 检查内容哈希是否一致
        String expectedHash = sha256(buildContent(current) + current.getPreviousHash());
        if (!expectedHash.equals(current.getCurrentHash())) {
            log.error("Content hash mismatch at log id: {}", current.getId());
            return false;
        }
    }
    return true;
}
```

---

## 七、监控与告警

### 金融系统的关键指标

```yaml
# Prometheus + Grafana 监控指标

# 业务指标（比技术指标更重要）
orders_placed_total          # 下单总量
orders_rejected_total        # 被拒绝的订单（分原因统计）
trades_executed_total        # 成交笔数
position_update_lag_seconds  # 持仓更新延迟

# 风控指标
risk_checks_failed_total     # 风控拦截次数
daily_loss_limit_utilization # 日亏损限额使用率（接近 100% 要告警）
credit_limit_utilization     # 信用额度使用率

# 系统健康指标
fix_session_status           # FIX 连接状态（0=断开，1=连接）
order_processing_latency_p99 # 99 百分位处理延迟
reconciliation_breaks_count  # 对账差异数量（非零立即告警）
```

### 告警分级

```yaml
# 告警规则示例（Prometheus Alerting Rules）
groups:
  - name: trading_alerts
    rules:
      # P1：立即处理（5分钟内）
      - alert: FIXSessionDown
        expr: fix_session_status == 0
        for: 30s
        labels:
          severity: critical
        annotations:
          summary: "FIX session disconnected"

      # P1：资金安全告警
      - alert: ReconciliationBreakDetected
        expr: reconciliation_breaks_count > 0
        for: 0m  # 立即告警，不等待
        labels:
          severity: critical

      # P2：30分钟内处理
      - alert: HighOrderRejectionRate
        expr: rate(orders_rejected_total[5m]) / rate(orders_placed_total[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Order rejection rate > 5%"

      # P3：工作时间处理
      - alert: SlowOrderProcessing
        expr: order_processing_latency_p99 > 0.1  # > 100ms
        for: 2m
        labels:
          severity: warning
```

---

## 本节小结

| 可靠性能力 | 实现方式 |
|-----------|---------|
| 幂等性 | 唯一业务键 + 数据库唯一约束，或幂等令牌表 |
| 防重复下单 | 前端禁用按钮 + 后端幂等键 |
| 对账 | 三层对账（实时/日内/日终），差异工单 |
| 状态机保护 | 定义合法状态转换，非法转换抛异常 |
| 灾备 | 同步主备复制（RPO=0），VIP 漂移（RTO<30s） |
| 审计日志 | AOP 切面，Append-only，哈希链防篡改 |
| 监控告警 | 业务指标优先，对账差异 P1 级别即时告警 |

**下一节**：[Phase 3.6 实践项目](./phase3-06-projects.md)
