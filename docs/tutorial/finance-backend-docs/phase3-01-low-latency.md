# Phase 3.1 低延迟系统设计

> 目标：理解金融系统为何对延迟极度敏感，掌握 JVM 层面的低延迟技术手段。

---

## 一、为什么金融系统关注延迟

### 延迟的直接商业价值

在交易系统中，延迟不只是用户体验问题，而是真实的金钱损失：

- **做市商**：慢 1ms，报价可能已经过时，被对手方"吃掉"不利成交
- **套利策略**：两个市场同一资产价差只存在几毫秒，慢了套利窗口消失
- **算法执行**：VWAP/TWAP 算法若执行慢，实际成本高于预期

### 延迟的组成

```
总延迟 = 网络延迟 + 队列等待 + 处理延迟 + GC 停顿 + 系统调用开销

典型分布（交易所内网环境）：
├── 网络（网卡到网卡）：100µs - 500µs
├── 内核 TCP 栈：10µs - 50µs
├── 应用处理：5µs - 200µs（你能优化的部分）
└── GC 停顿：0µs（无停顿）- 数百 ms（Stop-the-World）
```

**关键洞察**：GC 停顿是金融系统延迟的最大"隐患"，因为它不可预测且可能达到数百毫秒。

---

## 二、JVM GC 停顿问题

### Stop-the-World 的危害

```
正常处理流程：
请求 ──► 处理 ──► 响应  （5ms）

GC 停顿发生时：
请求 ──► 处理 ──[GC停顿 200ms]──► 响应  （205ms）
```

对于交易系统，200ms 的停顿可能导致：
- 风控检查超时，订单被拒绝
- 行情推送中断，客户端收到过期数据
- 对冲信号延迟，造成风险敞口

### GC 选择策略

| GC 类型 | 停顿特性 | 适用场景 |
|---------|---------|---------|
| G1 GC（JDK 9+默认） | 停顿可控（默认200ms目标），但仍有 STW | 普通后台服务 |
| ZGC（JDK 15+ 生产可用） | 停顿 < 1ms，与堆大小无关 | 低延迟服务 |
| Shenandoah | 停顿 < 10ms | 低延迟服务 |
| Azul C4（商业） | 接近零停顿 | HFT 级别 |

**金融系统推荐**：ZGC（免费）或直接避免 GC（堆外内存）。

```bash
# 启用 ZGC
java -XX:+UseZGC -Xmx4g -Xms4g \
     -XX:+AlwaysPreTouch \        # 启动时预分配所有内存
     -XX:+DisableExplicitGC \     # 禁止代码中手动调用 System.gc()
     -jar trading-service.jar
```

### 减少 GC 压力的编码策略

**1. 对象池（Object Pool）**

```java
// 交易系统中 Order 对象创建频繁，用对象池避免频繁 GC
public class OrderPool {
    private final ArrayDeque<Order> pool = new ArrayDeque<>(1024);

    public Order acquire() {
        Order order = pool.pollFirst();
        if (order == null) {
            order = new Order();  // 池空时才创建新对象
        }
        return order;
    }

    public void release(Order order) {
        order.reset();           // 清空字段，避免内存泄漏
        pool.addFirst(order);    // 归还到池
    }
}

// 使用示例
Order order = orderPool.acquire();
try {
    order.setSymbol("AAPL");
    order.setQty(new BigDecimal("100"));
    processOrder(order);
} finally {
    orderPool.release(order);  // 必须归还，否则池会耗尽
}
```

**2. 避免装箱（Autoboxing）**

```java
// 坏：每次循环创建 Integer 对象
Map<String, Integer> orderCount = new HashMap<>();
for (Trade trade : trades) {
    orderCount.merge(trade.getSymbol(), 1, Integer::sum);  // 大量 Integer 装箱
}

// 好：使用原始类型集合（Eclipse Collections 或 Trove）
MutableObjectIntMap<String> orderCount = ObjectIntMaps.mutable.empty();
for (Trade trade : trades) {
    orderCount.addToValue(trade.getSymbol(), 1);  // 无装箱
}
```

**3. 字符串优化**

```java
// 坏：频繁拼接字符串（每次创建新对象）
String key = accountId + ":" + symbol + ":" + date;

// 好：复用 StringBuilder，或预分配足够容量
private static final ThreadLocal<StringBuilder> SB =
    ThreadLocal.withInitial(() -> new StringBuilder(64));

String buildKey(String accountId, String symbol, String date) {
    StringBuilder sb = SB.get();
    sb.setLength(0);  // 清空，不创建新对象
    return sb.append(accountId).append(':')
             .append(symbol).append(':')
             .append(date).toString();
}
```

---

## 三、无锁编程

### 锁的问题

```java
// 有锁队列的问题：线程争抢锁时，其他线程被阻塞
public class LockedQueue<T> {
    private final LinkedList<T> queue = new LinkedList<>();

    public synchronized void offer(T item) {
        queue.add(item);  // 加锁，其他线程等待
    }

    public synchronized T poll() {
        return queue.poll();  // 加锁，其他线程等待
    }
}
```

在高频场景下，锁竞争会导致线程上下文切换，每次切换约 1-10µs，严重影响吞吐量。

### CAS（Compare-And-Swap）

CPU 硬件指令，不需要加锁就能实现原子操作：

```java
// AtomicLong 底层使用 CAS
private final AtomicLong orderIdGenerator = new AtomicLong(0);

public long nextOrderId() {
    return orderIdGenerator.incrementAndGet();  // CAS 原子自增，无锁
}

// 手动 CAS 示例：原子更新持仓
private final AtomicReference<Position> positionRef = new AtomicReference<>();

public void updatePosition(BigDecimal delta) {
    Position current, updated;
    do {
        current = positionRef.get();
        updated = current.add(delta);
    } while (!positionRef.compareAndSet(current, updated));
    // 如果 CAS 失败（说明有其他线程修改），重试
}
```

### Disruptor：无锁高性能队列

LMAX Exchange（英国外汇交易所）开源的无锁队列，是金融系统中最重要的开源组件之一。

**核心思想**：
- 使用固定大小的环形数组（Ring Buffer），预分配所有对象，消除 GC
- 生产者和消费者通过序号（Sequence）协调，不用锁
- 利用 CPU 缓存行填充（Cache Line Padding）避免伪共享

```
传统 ArrayBlockingQueue：        LMAX Disruptor：
生产者 → [锁] → 队列 → [锁] → 消费者    生产者 → Ring Buffer → 消费者
        锁竞争开销大                     无锁，延迟稳定
```

```java
// Disruptor 使用示例：订单处理流水线
public class OrderProcessingPipeline {

    // 事件对象（预分配，复用，不产生 GC）
    public static class OrderEvent {
        public Order order;
    }

    public Disruptor<OrderEvent> buildPipeline() {
        int ringBufferSize = 1024;  // 必须是 2 的幂

        Disruptor<OrderEvent> disruptor = new Disruptor<>(
            OrderEvent::new,           // 预分配 1024 个 OrderEvent 对象
            ringBufferSize,
            DaemonThreadFactory.INSTANCE,
            ProducerType.SINGLE,       // 单生产者，性能最优
            new BusySpinWaitStrategy() // 忙等策略，延迟最低，CPU 占用高
        );

        // 配置处理链：风控检查 → 订单路由 → 持仓更新
        disruptor.handleEventsWith(new RiskCheckHandler())
                 .then(new OrderRoutingHandler())
                 .then(new PositionUpdateHandler());

        return disruptor;
    }
}

// 风控检查 Handler
public class RiskCheckHandler implements EventHandler<OrderEvent> {
    @Override
    public void onEvent(OrderEvent event, long sequence, boolean endOfBatch) {
        Order order = event.order;
        RiskCheckResult result = riskEngine.check(order);
        if (!result.isPassed()) {
            order.setStatus(OrderStatus.REJECTED);
            order.setRejectReason(result.getReason());
        }
    }
}
```

**性能对比**：

| 队列类型 | 吞吐量（ops/sec） | 99th 百分位延迟 |
|---------|----------------|--------------|
| ArrayBlockingQueue | ~5M | ~1ms |
| LinkedBlockingQueue | ~3M | ~2ms |
| LMAX Disruptor | ~25M | ~50µs |

---

## 四、堆外内存（Off-Heap Memory）

### 为什么需要堆外内存

JVM 堆内存受 GC 管理，但堆外内存不受 GC 扫描，适合：
- 大量短生命周期的消息缓冲区
- 网络 I/O 零拷贝缓冲
- 与本地代码（C/C++）共享数据

```java
// 使用 ByteBuffer 分配堆外内存
ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024);  // 1MB 堆外

// 使用 Unsafe（不推荐直接用，但了解原理）
// sun.misc.Unsafe unsafe = ...;
// long address = unsafe.allocateMemory(size);

// 推荐：使用 Agrona 的 UnsafeBuffer
UnsafeBuffer buffer = new UnsafeBuffer(new byte[1024]);
buffer.putInt(0, orderId);       // 直接写内存，无装箱
buffer.putLong(4, timestamp);
buffer.putDouble(12, price);
```

### 注意事项

堆外内存不受 GC 管理，必须手动释放，否则内存泄漏：

```java
// 正确的堆外内存管理
ByteBuffer direct = ByteBuffer.allocateDirect(1024);
try {
    // 使用 direct buffer
    processData(direct);
} finally {
    // 强制释放（Java 没有标准 API，需要反射或 Cleaner）
    if (direct instanceof sun.nio.ch.DirectBuffer) {
        ((sun.nio.ch.DirectBuffer) direct).cleaner().clean();
    }
}
```

---

## 五、网络优化

### TCP_NODELAY

```java
// 默认情况下，TCP 会用 Nagle 算法合并小包，引入最多 40ms 延迟
// 交易系统必须禁用：
ServerBootstrap bootstrap = new ServerBootstrap();
bootstrap.childOption(ChannelOption.TCP_NODELAY, true);  // 禁用 Nagle
bootstrap.childOption(ChannelOption.SO_KEEPALIVE, true);
```

### 内核旁路（Kernel Bypass）

传统 TCP 路径：应用 → 内核 TCP 栈 → 网卡（约 10-50µs）
内核旁路路径：应用 → 用户态协议栈 → 网卡（约 1-5µs）

常用技术：
- **DPDK**（Data Plane Development Kit）：绕过内核，用户态直接操作网卡
- **RDMA**（Remote Direct Memory Access）：网卡直接读写远程内存，延迟 < 1µs
- **OpenOnload**（Solarflare）：商业内核旁路解决方案

> 这些技术在 Java 中通过 JNI 或专门的 Java 绑定使用，属于 HFT 级别的优化，普通交易系统不需要深入，了解概念即可。

---

## 六、基准测试（Benchmarking）

金融系统的性能测试有别于普通服务：**关注尾延迟（Tail Latency），而非平均延迟**。

### 为什么关注尾延迟

```
平均延迟 1ms 的系统，可能有以下分布：
- 50%  请求：0.1ms
- 90%  请求：1ms
- 99%  请求：50ms   ← 这些是被 GC 打断的请求
- 99.9% 请求：500ms  ← 这些是 Full GC 发生时的请求

对交易系统，那 0.1% 的 500ms 请求可能导致严重问题。
```

### JMH（Java Microbenchmark Harness）

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 10, time = 1)
@State(Scope.Benchmark)
public class MatchingEngineBenchmark {

    private MatchingEngine engine;
    private Order buyOrder;

    @Setup
    public void setup() {
        engine = new MatchingEngine();
        // 预填充订单簿
        for (int i = 0; i < 1000; i++) {
            engine.addOrder(new Order(SELL, new BigDecimal("100." + i), 100));
        }
        buyOrder = new Order(BUY, new BigDecimal("101.00"), 50);
    }

    @Benchmark
    public List<Trade> benchmarkMatch() {
        return engine.match(buyOrder);
    }
}
```

### HDR Histogram（高动态范围直方图）

```java
// 记录延迟分布，适合记录尾延迟
Histogram histogram = new Histogram(3600000000000L, 3);

// 在处理循环中记录延迟
long start = System.nanoTime();
processOrder(order);
long latencyNs = System.nanoTime() - start;
histogram.recordValue(latencyNs);

// 输出统计信息
System.out.printf("50%%ile: %d µs%n", histogram.getValueAtPercentile(50) / 1000);
System.out.printf("99%%ile: %d µs%n", histogram.getValueAtPercentile(99) / 1000);
System.out.printf("99.9%%ile: %d µs%n", histogram.getValueAtPercentile(99.9) / 1000);
System.out.printf("Max:    %d µs%n", histogram.getMaxValue() / 1000);
```

---

## 七、低延迟系统设计清单

在设计金融交易热路径时，逐一检查：

```
内存层面：
□ 热路径对象是否使用对象池，避免 GC 压力？
□ 是否消除了 Integer/Long 等装箱操作？
□ 是否考虑 CPU 缓存行（64字节）的对齐问题？

线程层面：
□ 热路径是否使用无锁数据结构（CAS/Disruptor）？
□ 核心线程是否绑定到特定 CPU 核（CPU Affinity）？
□ 线程数是否和 CPU 核数匹配，避免上下文切换？

网络层面：
□ 是否设置了 TCP_NODELAY？
□ 是否设置了合适的 SO_RCVBUF / SO_SNDBUF？
□ 是否考虑内核旁路（如果需要 HFT 级别延迟）？

JVM 层面：
□ 是否使用 ZGC 或 Shenandoah 减少 GC 停顿？
□ 是否使用 -Xms = -Xmx 避免堆动态扩展？
□ 是否使用 -XX:+AlwaysPreTouch 预分配内存？

测试层面：
□ 是否用 HDR Histogram 测量尾延迟（99th, 99.9th）？
□ 测试场景是否包含了 GC 发生时的最坏情况？
□ 是否在与生产环境相近的硬件上测试？
```

---

## 本节小结

| 技术 | 解决的问题 | 使用场景 |
|------|----------|---------|
| ZGC | GC 停顿 < 1ms | 所有低延迟服务 |
| 对象池 | 减少 GC 压力 | 高频创建/销毁的对象 |
| CAS/AtomicXxx | 无锁原子操作 | 计数器、状态标记 |
| Disruptor | 无锁高性能队列 | 交易处理流水线 |
| TCP_NODELAY | 消除 Nagle 延迟 | 所有交易网络连接 |
| HDR Histogram | 准确测量尾延迟 | 性能基准测试 |

**下一节**：[Phase 3.2 金融数据建模](./phase3-02-data-modeling.md)
