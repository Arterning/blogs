# Phase 3.6 实践项目

> 三个由浅入深的项目，综合运用 Phase 3 的所有技术。每个项目都有明确的功能边界和验收标准。

---

## 项目 A：简易订单撮合引擎

**难度**：⭐⭐  
**周期**：1-2 周  
**综合技能**：数据结构设计、并发控制、低延迟、精度处理

### 目标

实现一个内存中的订单撮合引擎，支持：
- 限价单和市价单
- 价格优先 + 时间优先的撮合规则
- 冰山单（隐藏数量）
- 撮合结果的事件输出

### 核心数据结构

```java
// 订单
public class Order {
    private final String id;
    private final Side   side;           // BUY / SELL
    private final OrderType type;        // LIMIT / MARKET / ICEBERG
    private final BigDecimal price;      // 市价单为 null
    private BigDecimal remainingQty;
    private BigDecimal displayQty;       // 冰山单展示量
    private final BigDecimal totalQty;
    private final long timestamp;        // 纳秒级，用于时间优先排序

    public boolean isFullyFilled() {
        return remainingQty.compareTo(BigDecimal.ZERO) == 0;
    }

    public void fill(BigDecimal qty) {
        remainingQty = remainingQty.subtract(qty);
        // 冰山单：展示量耗尽后从剩余量补充
        if (type == ICEBERG && displayQty.compareTo(BigDecimal.ZERO) <= 0) {
            displayQty = remainingQty.min(totalQty.divide(TEN, 0, HALF_UP));
        }
    }
}

// 成交结果
public record Trade(
    String makerOrderId,   // 挂单方（已在订单簿等待的）
    String takerOrderId,   // 吃单方（新进来的）
    BigDecimal qty,
    BigDecimal price,      // 以挂单价成交
    long timestamp
) {}
```

### 撮合引擎实现

```java
public class MatchingEngine {
    // 买方订单簿：价格降序（最高价优先）
    private final TreeMap<BigDecimal, Deque<Order>> bids =
        new TreeMap<>(Comparator.reverseOrder());

    // 卖方订单簿：价格升序（最低价优先）
    private final TreeMap<BigDecimal, Deque<Order>> asks =
        new TreeMap<>();

    private final List<MatchingEventListener> listeners = new ArrayList<>();

    // 提交订单，返回产生的成交列表
    public List<Trade> submit(Order incoming) {
        validateOrder(incoming);

        List<Trade> trades = match(incoming);

        // 未成交部分挂入订单簿（市价单不挂单）
        if (!incoming.isFullyFilled() && incoming.getType() != MARKET) {
            addToBook(incoming);
            listeners.forEach(l -> l.onOrderAdded(incoming));
        }

        if (!trades.isEmpty()) {
            listeners.forEach(l -> l.onTrades(trades));
        }

        return trades;
    }

    private List<Trade> match(Order taker) {
        List<Trade> trades = new ArrayList<>();
        TreeMap<BigDecimal, Deque<Order>> oppositeBook =
            taker.getSide() == BUY ? asks : bids;

        while (!taker.isFullyFilled() && !oppositeBook.isEmpty()) {
            Map.Entry<BigDecimal, Deque<Order>> bestEntry = oppositeBook.firstEntry();
            BigDecimal bestPrice = bestEntry.getKey();

            // 限价单：检查是否能成交
            if (taker.getType() == LIMIT) {
                boolean canMatch = taker.getSide() == BUY
                    ? taker.getPrice().compareTo(bestPrice) >= 0   // 买单：愿意付的价格 >= 卖方要价
                    : taker.getPrice().compareTo(bestPrice) <= 0;  // 卖单：愿意收的价格 <= 买方出价
                if (!canMatch) break;
            }

            Order maker = bestEntry.getValue().peekFirst();
            BigDecimal tradeQty = taker.getRemainingQty().min(maker.getDisplayQty());

            Trade trade = new Trade(
                maker.getId(), taker.getId(),
                tradeQty, bestPrice,
                System.nanoTime()
            );
            trades.add(trade);

            taker.fill(tradeQty);
            maker.fill(tradeQty);

            if (maker.getDisplayQty().compareTo(BigDecimal.ZERO) == 0) {
                bestEntry.getValue().pollFirst();
                if (bestEntry.getValue().isEmpty()) {
                    oppositeBook.remove(bestPrice);
                }
            }
        }

        return trades;
    }

    private void addToBook(Order order) {
        TreeMap<BigDecimal, Deque<Order>> book =
            order.getSide() == BUY ? bids : asks;
        book.computeIfAbsent(order.getPrice(), k -> new ArrayDeque<>())
            .addLast(order);
    }

    // 撤单
    public boolean cancel(String orderId) {
        // 在两侧订单簿中查找并移除
        return removeFromBook(orderId, bids) || removeFromBook(orderId, asks);
    }

    // 获取订单簿快照（用于行情展示）
    public OrderBookSnapshot getSnapshot(int depth) {
        List<PriceLevel> bidLevels = bids.entrySet().stream()
            .limit(depth)
            .map(e -> new PriceLevel(
                e.getKey(),
                e.getValue().stream().map(Order::getDisplayQty)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
            ))
            .collect(toList());

        List<PriceLevel> askLevels = asks.entrySet().stream()
            .limit(depth)
            .map(e -> new PriceLevel(e.getKey(),
                e.getValue().stream().map(Order::getDisplayQty)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)))
            .collect(toList());

        return new OrderBookSnapshot(bidLevels, askLevels);
    }
}
```

### 验收标准

```java
// 单元测试覆盖以下场景：
@Test void limitBuyMatchesCheapestSell()
@Test void marketOrderMatchesImmediately()
@Test void partialFillRemainsInBook()
@Test void priceTimePriorityMaintained()   // 同价格按时间排序
@Test void icebergOrderReplenishes()
@Test void cancelRemovesFromBook()
@Test void noMatchWhenPriceCrossed()       // 买价 < 卖价时不撮合

// 性能目标：
// 10 万次撮合操作 < 1 秒（单线程）
// 99th 百分位延迟 < 100µs
```

---

## 项目 B：实时持仓系统

**难度**：⭐⭐⭐  
**周期**：2-3 周  
**综合技能**：事件驱动、数据精度、并发安全、Redis 缓存、对账

### 目标

构建一个事件驱动的持仓管理服务，支持：
- 实时处理成交事件，更新持仓
- 多账户、多币种持仓管理
- 企业行为处理（分红、拆股）
- 日终对账功能
- REST API 查询持仓和盈亏

### 系统架构

```
成交事件（Kafka）
       │
       ▼
┌─────────────────┐      ┌─────────────┐
│  Position       │─────►│   Redis     │  实时持仓缓存
│  Service        │      │  Cache      │
│                 │      └─────────────┘
│  - 处理成交      │
│  - 处理企业行为  │      ┌─────────────┐
│  - 计算盈亏      │─────►│ PostgreSQL  │  持久化存储
└─────────────────┘      │             │
       │                 │ - position  │
       │                 │ - trade     │
       ▼                 │ - event_log │
┌─────────────────┐      └─────────────┘
│   REST API      │
│  /positions     │
│  /pnl           │
└─────────────────┘
```

### 核心实现

```java
@Service
public class PositionService {

    @KafkaListener(topics = "order-filled")
    @Transactional
    public void onOrderFilled(OrderFilledEvent event) {
        // 幂等检查
        if (eventLogRepo.exists(event.getEventId())) return;

        String accountId = event.getAccountId();
        String symbol    = event.getSymbol();

        // 原子更新数据库持仓
        int updated = positionRepo.atomicUpdate(
            accountId, symbol,
            event.getSide(), event.getFilledQty(), event.getFilledPrice()
        );

        if (updated == 0) {
            // 新建持仓记录
            positionRepo.createPosition(accountId, symbol,
                event.getSide(), event.getFilledQty(), event.getFilledPrice());
        }

        // 更新 Redis 缓存
        positionCacheService.invalidate(accountId, symbol);

        // 记录已处理事件（幂等）
        eventLogRepo.save(new EventLog(event.getEventId(), Instant.now()));
    }

    // 处理股票拆分
    @Transactional
    public void applyStockSplit(String symbol, BigDecimal splitRatio) {
        // 批量更新所有持有该股票的持仓
        positionRepo.updateAllForSplit(symbol, splitRatio);

        // 清除 Redis 缓存
        positionCacheService.invalidateBySymbol(symbol);

        log.info("Applied stock split {}: ratio={}", symbol, splitRatio);
    }

    // 查询持仓（先查 Redis，缓存未命中再查 DB）
    public Position getPosition(String accountId, String symbol) {
        return positionCacheService.get(accountId, symbol)
            .orElseGet(() -> {
                Position pos = positionRepo
                    .findByAccountAndSymbol(accountId, symbol)
                    .orElse(Position.empty(accountId, symbol));
                positionCacheService.put(accountId, symbol, pos);
                return pos;
            });
    }

    // 计算投资组合盈亏
    public PortfolioPnL calculatePnL(String accountId) {
        List<Position> positions = positionRepo.findByAccount(accountId);

        BigDecimal totalCost        = BigDecimal.ZERO;
        BigDecimal totalMarketValue = BigDecimal.ZERO;
        BigDecimal realizedPnL      = pnlRepo.getTodayRealizedPnL(accountId);

        for (Position pos : positions) {
            BigDecimal price = marketDataService.getLastPrice(pos.getSymbol());
            BigDecimal mv    = price.multiply(pos.getNetQty());

            pos.setLastPrice(price);
            pos.setMarketValue(mv);
            pos.setUnrealizedPnL(mv.subtract(pos.getTotalCost()));

            totalCost        = totalCost.add(pos.getTotalCost());
            totalMarketValue = totalMarketValue.add(mv);
        }

        return new PortfolioPnL(
            totalCost,
            totalMarketValue,
            totalMarketValue.subtract(totalCost),  // 浮动盈亏
            realizedPnL
        );
    }
}
```

### API 设计

```
GET  /api/v1/positions/{accountId}
     → 账户全量持仓

GET  /api/v1/positions/{accountId}/{symbol}
     → 单只持仓详情

GET  /api/v1/positions/{accountId}/pnl
     → 账户盈亏汇总

GET  /api/v1/positions/{accountId}/history?date=2024-01-15
     → 历史某天的持仓快照（通过事件重放）

POST /api/v1/positions/reconcile
     → 触发对账，返回差异报告
```

### 验收标准

```
功能：
□ 成交后 100ms 内持仓更新
□ 并发成交不产生持仓计算错误
□ 股票拆分后持仓数量和成本正确更新
□ 对账能发现人工制造的差异

性能：
□ 单账户持仓查询 < 5ms（缓存命中）
□ 支持 1000 个并发账户的持仓更新
□ 日终对账 10 万持仓记录 < 30 秒
```

---

## 项目 C：简易风控引擎

**难度**：⭐⭐⭐⭐  
**周期**：3-4 周  
**综合技能**：低延迟设计、规则引擎、实时限额、对账告警

### 目标

构建一个事前风控检查引擎，支持：
- 微秒级的订单风控检查
- 多维度限额（单笔/日累计/持仓）
- 实时 VaR 近似计算
- 异常交易检测（Fat Finger、高频下单）
- 限额变更的热更新（不重启服务）

### 架构设计

```
下单请求
    │
    ▼（< 1ms）
┌──────────────────────────────────┐
│          Risk Engine              │
│                                   │
│  ┌─────────────────────────────┐  │
│  │      Rule Executor          │  │
│  │  1. 账户状态检查             │  │
│  │  2. 单笔金额/数量检查        │  │
│  │  3. 持仓限额检查             │  │
│  │  4. 日累计损益检查           │  │
│  │  5. 信用额度检查             │  │
│  │  6. Fat Finger 检测          │  │
│  └─────────────────────────────┘  │
│           │                       │
│  ┌────────▼────────┐              │
│  │   In-Memory     │              │
│  │   Limit Cache   │ ← 后台刷新   │
│  │   Position Cache│              │
│  │   Price Cache   │ ← 行情订阅   │
│  └─────────────────┘              │
└──────────────────────────────────┘
    │
    ├── PASS  → 转发订单到 OMS
    └── REJECT → 返回拒绝原因
```

### 核心实现

```java
@Component
public class RiskEngine {

    // 所有缓存必须在内存中，不能实时查数据库
    private volatile RiskLimitStore  limitStore;     // 原子替换，支持热更新
    private final ConcurrentHashMap<String, PositionSnapshot> posCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, BigDecimal>       pnlCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, BigDecimal>       priceCache = new ConcurrentHashMap<>();

    // 风控检查链（按优先级排序，越早能拒绝越省时间）
    private final List<RiskRule> rules = List.of(
        new AccountStatusRule(),      // 账户是否正常
        new SingleOrderSizeRule(),    // 单笔限额（最快）
        new FatFingerRule(),          // 价格偏离检测
        new PositionLimitRule(),      // 持仓限额
        new DailyLossLimitRule(),     // 日亏损限额
        new OrderFrequencyRule()      // 高频下单检测
    );

    public RiskCheckResult check(OrderRequest order) {
        long start = System.nanoTime();

        // 加载该账户的限额配置（内存中）
        RiskLimits limits = limitStore.get(order.getAccountId());
        if (limits == null) {
            return RiskCheckResult.reject("ACCOUNT_NOT_CONFIGURED");
        }

        // 构建检查上下文（避免重复查询）
        RiskContext ctx = RiskContext.builder()
            .order(order)
            .limits(limits)
            .position(posCache.getOrDefault(posKey(order), PositionSnapshot.ZERO))
            .todayPnL(pnlCache.getOrDefault(order.getAccountId(), BigDecimal.ZERO))
            .lastPrice(priceCache.get(order.getSymbol()))
            .build();

        // 逐规则检查
        for (RiskRule rule : rules) {
            RiskCheckResult result = rule.check(ctx);
            if (!result.isPassed()) {
                recordRejection(order, result, System.nanoTime() - start);
                return result;
            }
        }

        // 通过：更新冻结状态（乐观更新缓存，同时发消息到持仓服务确认）
        updateFrozenPosition(order);
        recordPass(order, System.nanoTime() - start);

        return RiskCheckResult.pass();
    }

    // 规则实现示例：Fat Finger 检测
    static class FatFingerRule implements RiskRule {
        private static final BigDecimal MAX_DEVIATION = new BigDecimal("0.10"); // 10%

        @Override
        public RiskCheckResult check(RiskContext ctx) {
            if (ctx.getOrder().getType() != LIMIT) return RiskCheckResult.pass();
            BigDecimal lastPrice = ctx.getLastPrice();
            if (lastPrice == null || lastPrice.compareTo(BigDecimal.ZERO) == 0)
                return RiskCheckResult.pass();

            BigDecimal deviation = ctx.getOrder().getPrice()
                .subtract(lastPrice).abs()
                .divide(lastPrice, 4, HALF_UP);

            if (deviation.compareTo(MAX_DEVIATION) > 0) {
                return RiskCheckResult.reject(
                    String.format("FAT_FINGER: price %.4f deviates %.1f%% from last %.4f",
                        ctx.getOrder().getPrice(), deviation.multiply(HUNDRED),lastPrice)
                );
            }
            return RiskCheckResult.pass();
        }
    }

    // 限额热更新（不停服更新限额配置）
    @Scheduled(fixedDelay = 30_000)  // 每30秒刷新一次
    public void refreshLimits() {
        RiskLimitStore newStore = riskLimitRepository.loadAll();
        this.limitStore = newStore;  // 原子替换，volatile 保证可见性
        log.debug("Risk limits refreshed: {} accounts", newStore.size());
    }
}
```

### 性能测试

```java
@Test
public void testRiskCheckLatency() throws Exception {
    // 预热
    for (int i = 0; i < 10000; i++) {
        riskEngine.check(buildSampleOrder());
    }

    Histogram histogram = new Histogram(TimeUnit.SECONDS.toNanos(1), 3);
    int iterations = 100_000;

    for (int i = 0; i < iterations; i++) {
        long start = System.nanoTime();
        riskEngine.check(buildSampleOrder());
        histogram.recordValue(System.nanoTime() - start);
    }

    System.out.printf("Risk Check Latency:%n");
    System.out.printf("  50%%ile: %,d ns%n", histogram.getValueAtPercentile(50));
    System.out.printf("  99%%ile: %,d ns%n", histogram.getValueAtPercentile(99));
    System.out.printf("  99.9%%ile: %,d ns%n", histogram.getValueAtPercentile(99.9));
    System.out.printf("  Max:    %,d ns%n", histogram.getMaxValue());

    // 验收标准
    assertThat(histogram.getValueAtPercentile(99))
        .isLessThan(TimeUnit.MICROSECONDS.toNanos(500));  // 99th < 500µs
}
```

### 验收标准

```
延迟：
□ 99th 百分位风控检查延迟 < 500µs
□ 限额热更新期间无拒绝服务（原子替换）

正确性：
□ 单笔超限被拒绝，未超限通过
□ 并发 100 个账户同时下单，无限额超用
□ Fat Finger：价格偏离 10% 以上被拒绝
□ 日亏损达到限额后，当日后续订单全部被拒

可观测性：
□ 每次拒绝有详细原因和延迟记录
□ 限额使用率 Prometheus 指标可查询
□ 热更新后限额立即生效
```

---

## 项目整合建议

三个项目可以串联成一个完整的交易系统：

```
[项目C 风控引擎]
        │ PASS
        ▼
[项目A 撮合引擎]
        │ 成交事件
        ▼
[项目B 持仓系统]
        │
        ▼
[对账 & 报告]
```

### 推荐实现顺序

1. **先做项目 A**：撮合引擎是最纯粹的算法问题，没有外部依赖，容易上手
2. **再做项目 B**：需要 Kafka、Redis、PostgreSQL，引入外部依赖
3. **最后做项目 C**：难度最高，依赖 B 中的持仓数据和行情数据

### 代码结构建议

```
trading-system/
├── matching-engine/        # 项目 A（纯 Java，无框架依赖）
│   ├── src/main/java/
│   └── src/test/java/      # 重点测试撮合逻辑的正确性
│
├── position-service/       # 项目 B（Spring Boot + Kafka + Redis + PG）
│   ├── src/main/java/
│   └── docker-compose.yml  # 本地开发环境
│
└── risk-engine/            # 项目 C（Spring Boot，低延迟设计）
    ├── src/main/java/
    └── src/test/java/      # 重点测试延迟和并发正确性
```

---

## Phase 3 完成检验

完成三个项目后，你应该能够：

- [ ] 解释 Disruptor 比 BlockingQueue 快的原因，以及 ZGC 解决了什么问题
- [ ] 在代码中坚持用 `BigDecimal("...")` 而不是 `new BigDecimal(0.1)`
- [ ] 设计一个持仓表的 Schema，包含乐观锁、精度字段、状态分类
- [ ] 用 QuickFIX/J 收发 FIX 消息，处理成交回报
- [ ] 配置 Kafka 实现至少一次语义，并在消费者端做幂等去重
- [ ] 解释为什么审计日志表要 revoke UPDATE/DELETE 权限
- [ ] 实现一个端到端的幂等下单流程（从 HTTP 请求到数据库）
- [ ] 用 HDR Histogram 测量风控检查的 99th 百分位延迟

**进入 Phase 4**：回到 [README - Phase 4 深度整合](./README.md#phase-4深度整合12-24-个月)
