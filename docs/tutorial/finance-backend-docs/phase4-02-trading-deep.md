# Phase 4.2 深度方向：交易系统

> 适合人群：对低延迟、高并发感兴趣，想在 OMS/EMS/撮合引擎方向深耕的工程师。

---

## 一、这条路的天花板在哪里

交易系统方向的工程师，职业发展路径大致如下：

```
初级：能实现功能，能读懂 FIX 消息
  ↓
中级：能设计系统，理解撮合、风控、清结算的联动
  ↓
高级：能优化延迟，理解市场微结构，能与交易员直接协作设计执行策略
  ↓
专家：定义系统架构，参与交易策略设计，对 P&L 有直接贡献
```

到达"高级"后，你的价值不再只是"实现需求"，而是"帮助公司赚更多的钱或少损失钱"。

---

## 二、深入理解市场微结构

市场微结构（Market Microstructure）研究的是：订单怎么流动、价格怎么形成、做市商怎么定价。这是交易系统工程师与普通后端工程师的最大知识差距。

### 信息不对称与逆向选择

做市商面临的核心问题：当一个人来和你成交时，他是普通散户（信息噪音），还是知道内幕的机构（信息优势）？

```
情景：做市商报价 AAPL：买 149.90 / 卖 150.10

交易者来买入（以 150.10 卖给他）：
  情况 A：散户，随机交易 → 下一笔同样可能是买或卖
  情况 B：知道好消息的机构 → 股价即将上涨到 155

如果大量交易者都是情况 B，做市商会：
  - 以 150.10 卖出 → 之后价格涨到 155
  - 损失 = (155 - 150.10) × 数量

做市商的应对：
  观察订单流的"方向性"，如果买单持续涌入（Order Flow Imbalance），
  立即调高报价，把 Ask 从 150.10 提高到 150.30...
```

这就是为什么大额买单会"推升价格"——不只是因为吃掉了多档卖单，还因为做市商识别到了定向订单流，主动提高报价。

### 订单流毒性（Toxic Order Flow）

```
有毒订单流（Toxic）：来自知情交易者，让做市商亏钱
无毒订单流（Non-toxic）：来自普通散户，让做市商赚钱

量化指标：VPIN（Volume-synchronized Probability of Informed Trading）
  VPIN 高 → 市场中知情交易者比例高 → 做市商扩大价差
  VPIN 低 → 主要是散户 → 做市商缩小价差，赚更多成交量
```

**对交易系统的影响**：
- 算法执行策略需要监测市场微结构，避开高 VPIN 时段（成本高）
- 风控系统可以用 VPIN 作为市场压力指标

### 价格发现（Price Discovery）

价格不是凭空出现的，而是通过订单流"发现"的：

```
信息的传播路径：
  基本面变化（如财报超预期）
       ↓
  知情交易者率先交易（方向性订单流涌入）
       ↓
  做市商识别信号，调整报价
       ↓
  价格向"真实价值"移动
       ↓
  噪音交易者跟进
       ↓
  新的均衡价格形成
```

交易所之间的竞争：**谁的价格发现更快，谁的市场就更有价值。**

---

## 三、执行算法的设计

执行算法（Execution Algorithm）解决的问题：**如何以最低成本完成大单？**

### VWAP 算法深入

基础 VWAP 只是按历史成交量分布拆单，进阶版需要实时调整：

```
自适应 VWAP 流程：

1. 开盘前：根据历史数据，预测全天各时段的成交量分布
   例：9:30-9:45 通常占全天 15%，13:00-13:15 占 3%...

2. 盘中实时调整：
   实际成交量 vs 预测成交量
   → 跑赢（实际 > 预测）：减慢执行速度
   → 跑慢（实际 < 预测）：加快执行速度

3. 参与率控制：
   每个时间窗口，我方成交量不超过市场总成交量的 X%
   → 避免自己成为"主力"被其他算法识别
```

```java
public class AdaptiveVWAPAlgorithm {
    private final BigDecimal totalQty;          // 需要执行的总数量
    private BigDecimal executedQty = ZERO;

    // 每个时间桶（如每 5 分钟）应执行的数量
    private final Map<TimeSlot, BigDecimal> schedule;

    // 实时调整：根据市场实际成交量更新计划
    public BigDecimal calculateTargetForSlot(TimeSlot slot,
            BigDecimal marketVolumeActual, BigDecimal marketVolumePredicted) {

        BigDecimal baseTarget = schedule.get(slot);

        // 如果市场比预期活跃，我们也加快
        BigDecimal volumeRatio = marketVolumeActual.divide(marketVolumePredicted, 4, HALF_UP);
        BigDecimal adjustedTarget = baseTarget.multiply(volumeRatio);

        // 参与率上限：不超过市场的 15%
        BigDecimal maxByParticipation = marketVolumeActual.multiply(new BigDecimal("0.15"));

        return adjustedTarget.min(maxByParticipation)
                             .min(totalQty.subtract(executedQty)); // 不超过剩余量
    }
}
```

### 暗池（Dark Pool）路由

大单拆成小单后，路由到哪里执行也是学问：

```
路由选择的权衡：

明池（Lit Market，交易所）：
  ✓ 透明，有价格发现
  ✗ 大单会暴露意图，引起价格不利变动

暗池（Dark Pool，ATS）：
  ✓ 不透明，减少市场冲击
  ✓ 通常以买卖中间价成交（比在明池更好）
  ✗ 成交量不稳定，可能无法成交
  ✗ 潜在利益冲突（暗池运营者可能利用信息）

聪明的 Smart Order Router（SOR）策略：
  1. 先尝试暗池（成本低）
  2. 暗池无法完成的部分，分发到多个交易所
  3. 实时监控各路由的成交质量，动态调整分发比例
```

### 订单拆分的信号防范

机构投资者的算法执行被其他算法"识别"后，会被"前置交易"（Front Running）：

```
场景：你的 VWAP 算法每 5 分钟买入 100 股，连续 3 个小时

HFT 算法可能：
  识别你的规律 → 在你每次买单前 0.1 秒先买入 → 价格抬高 → 你的成本上升

防范措施：
  1. 随机化拆单大小（不要每次都是 100 股）
  2. 随机化时间间隔（加入 ±20% 的时间随机扰动）
  3. 混入少量反向噪音单（偶尔卖一小笔，迷惑识别算法）
  4. 在不同交易所交替执行
```

---

## 四、OMS 系统深度设计

### 订单状态的分布式一致性

在分布式环境中，订单状态的一致性是最难处理的问题：

```
问题场景：
  1. OMS 发出撤单请求 → 网络中断
  2. OMS 不知道撤单是否成功
  3. 交易所处理了撤单，但回报没有收到

OMS 面临三种可能：
  A. 交易所收到了撤单，订单已撤销
  B. 交易所没收到，订单还在交易所
  C. 订单在撤单请求到达前已经成交

处理策略（FIX 协议标准做法）：
  超时后主动查询交易所当前订单状态（Order Status Request，35=H）
  根据回报决定本地状态同步到哪个值
```

```java
// 订单状态同步任务
@Scheduled(fixedDelay = 30_000)
public void syncPendingOrders() {
    // 找出所有"状态不确定"的订单（超过 N 秒没有回报的）
    List<Order> pendingOrders = orderRepo.findByStatusAndLastUpdatedBefore(
        PENDING_NEW,
        Instant.now().minus(Duration.ofSeconds(30))
    );

    for (Order order : pendingOrders) {
        // 向交易所查询最新状态
        fixApplication.sendOrderStatusRequest(order.getExchangeOrderId());
        // 收到回报后，以交易所状态为权威，覆盖本地状态
    }
}
```

### 多市场订单路由的复杂性

同一只股票可能在多个市场挂牌，路由逻辑：

```java
public ExecutionVenue route(Order order) {
    List<VenueQuote> quotes = getAllVenueQuotes(order.getSymbol());

    // 过滤：该 venue 是否有该账户的交易资质？
    quotes = quotes.stream()
        .filter(q -> permissionService.hasAccess(order.getAccountId(), q.getVenue()))
        .collect(toList());

    // 过滤：当前时间 venue 是否开市？
    quotes = quotes.stream()
        .filter(q -> marketCalendar.isOpen(q.getVenue(), Instant.now()))
        .collect(toList());

    // 评分：综合价格、流动性、手续费、历史成交质量
    return quotes.stream()
        .max(Comparator.comparing(q -> scoreVenue(q, order)))
        .map(VenueQuote::getVenue)
        .orElseThrow(() -> new NoAvailableVenueException(order.getSymbol()));
}
```

### 订单生命周期的异常处理

以下场景是实际系统中最难处理的：

**场景 1：重复成交回报**

```java
// 交易所可能在网络抖动时重发成交回报
// 必须根据交易所成交编号（ExecID）去重

@Transactional
public void processExecutionReport(ExecutionReport report) {
    // 幂等检查：以 ExecID 为主键
    if (executionRepo.existsByExchangeExecId(report.getExecId())) {
        log.warn("Duplicate execution report: {}", report.getExecId());
        return;
    }

    // 正常处理...
    updateOrderStatus(report);
    updatePosition(report);
    executionRepo.save(toEntity(report));
}
```

**场景 2：成交价格超出委托价格**

```java
// 理论上不可能，实际上可能发生（交易所 bug 或特殊撮合规则）
// 系统需要检测并告警，不能静默接受

if (report.getSide() == BUY &&
    report.getFilledPrice().compareTo(order.getLimitPrice()) > 0) {
    alertService.critical("PRICE_VIOLATION",
        "Fill price {} exceeds limit price {} for order {}",
        report.getFilledPrice(), order.getLimitPrice(), order.getId());
    // 记录但仍然接受（对账时处理），不能因为检查失败而丢失成交回报
}
```

**场景 3：撤单确认收到，但随后收到成交回报**

```java
// 这是真实存在的 race condition：
// 撤单和成交同时发生，交易所先处理了成交，撤单实际上失败了
// 但撤单确认（CancelAck）先到达，成交回报（Fill）后到达

// 处理：成交回报优先级高于撤单确认
// 即使订单已被标记为 CANCELLED，收到成交回报仍然处理
if (order.getStatus() == CANCELLED && report.getExecType() == FILL) {
    log.warn("Late fill received for cancelled order: {}", order.getId());
    // 重新打开订单状态，处理成交
    order.setStatus(PARTIALLY_FILLED);
    processFilledQty(order, report);
}
```

---

## 五、性能基准与优化路径

交易系统的性能优化不是一步到位的，是分阶段迭代的：

### 阶段一：消除明显瓶颈（延迟 > 10ms → < 1ms）

```
常见问题 & 解决方案：

❌ 热路径上有数据库查询
✅ 将限额、账户信息、持仓预加载到内存

❌ 日志在热路径上同步写磁盘
✅ 使用异步日志（Log4j2 AsyncLogger + Disruptor）

❌ 使用了 synchronized 或重量级锁
✅ 改用 CAS/AtomicXxx，或重新设计为单线程处理

❌ 频繁创建对象导致 GC 停顿
✅ 对象池 + ZGC
```

### 阶段二：精细优化（延迟 1ms → 100µs）

```
工具：JMH 基准测试 + async-profiler 定位热点

常见优化：
  ✓ CPU 亲和性（绑定核心，避免跨 NUMA 域）
  ✓ 大页内存（Huge Pages，减少 TLB miss）
  ✓ 预热 JIT（开盘前运行预热请求，让 JIT 充分编译热路径）
  ✓ 避免 False Sharing（缓存行填充，padding 到 64 字节）
```

```java
// False Sharing 示例：两个计数器在同一缓存行，互相影响
// 坏：
class Counters {
    volatile long counter1;  // 地址 0
    volatile long counter2;  // 地址 8（同一缓存行！）
}

// 好：用 @Contended 注解（或手动填充）隔离到不同缓存行
class PaddedCounter {
    @jdk.internal.vm.annotation.Contended
    volatile long counter1;

    @jdk.internal.vm.annotation.Contended
    volatile long counter2;
}
```

### 阶段三：极限优化（延迟 100µs → 10µs，HFT 级别）

超出大多数工程师的工作范围，了解即可：

- **内核旁路**：DPDK 或 OpenOnload，绕过操作系统 TCP 栈
- **忙等策略**（Busy Spin）：线程不休眠，持续轮询，用 CPU 换延迟
- **RDMA**：网卡直接读写远端内存，端到端延迟 < 5µs
- **FPGA 实现撮合引擎**：硬件级别的确定性延迟 < 1µs

---

## 六、学习路径与资源

### 必读开源代码

```
1. LMAX Disruptor
   https://github.com/LMAX-Exchange/disruptor
   重点读：RingBuffer 实现、WaitStrategy、EventProcessor
   学习目标：理解无锁并发和缓存友好的数据结构

2. Agrona（LMAX 的工具库）
   https://github.com/real-logic/agrona
   重点读：ManyToOneRingBuffer、UnsafeBuffer
   学习目标：堆外内存操作、高性能数据结构

3. Aeron（消息传输）
   https://github.com/real-logic/aeron
   重点读：Publication、Subscription 的实现
   学习目标：高性能网络通信

4. QuickFIX/J
   https://github.com/quickfix-j/quickfixj
   重点读：Session 管理、MessageStore、Application 接口
   学习目标：FIX 协议实现的工程细节
```

### 必读文章

- **LMAX 架构白皮书**：Martin Fowler 写的 LMAX 系统架构介绍，是 Disruptor 的背景
- **Martin Thompson 的博客（mechanical-sympathy.blogspot.com）**：机械同情，硬件与软件的协同优化
- **Jane Street Tech Blog**：OCaml 在金融系统中的应用，思路超前

### 技能提升项目

**项目：实现一个完整的 OMS**（3-6 个月）

```
功能要求：
  ✓ FIX 4.2 客户端（接入模拟交易所）
  ✓ 订单完整状态机（含超时处理、重试、对账）
  ✓ 多账户、多品种支持
  ✓ 事前风控（持仓限额、单笔限额）
  ✓ 成交后持仓更新（幂等、精度正确）
  ✓ 断线重连与消息补单
  ✓ 延迟监控（P50/P99/P999）

验收标准：
  ✓ 连接模拟交易所（可以用 QuickFIX 模拟器），完整跑通下单-成交-持仓更新流程
  ✓ 在 1000 TPS 下，P99 延迟 < 5ms
  ✓ 断线重连后，所有在途订单状态正确恢复
```

---

## 本节小结

交易系统方向的核心竞争力：

| 能力层次 | 具体内容 |
|---------|---------|
| 协议层 | FIX 协议深度实现，处理各种异常场景 |
| 微结构层 | 理解订单流、做市商行为、价格形成 |
| 算法层 | VWAP/TWAP/POV，SOR 智能路由 |
| 工程层 | 低延迟设计，无锁并发，性能分析 |
| 业务层 | 与交易员协作，理解执行质量的商业意义 |

**下一节**：[Phase 4.3 量化交易方向](./phase4-03-quant-deep.md)
