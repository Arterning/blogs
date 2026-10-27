# Phase 2.1 交易系统（Trading System）

> 目标：理解一笔交易从下单到成交的完整生命周期，以及支撑这个流程的各个系统角色。

---

## 一、订单生命周期

一笔交易不是"点击买入就完成了"，背后是一条由多个系统协作完成的流水线。

```
用户下单
   │
   ▼
[前端/APP]  ──► [风控预检]  ──► [OMS 订单管理]  ──► [路由引擎]
                                                         │
                                          ┌──────────────┼──────────────┐
                                          ▼              ▼              ▼
                                      [交易所A]      [交易所B]      [暗池/内部撮合]
                                          │
                                          ▼
                                      [成交回报]
                                          │
                                          ▼
                               [OMS 更新订单状态]
                                          │
                                          ▼
                               [持仓系统 / 清算系统]
```

### 订单状态机

每笔订单在系统中的状态流转：

```
NEW（新建）
  │
  ▼
PENDING_NEW（已发往交易所，等待确认）
  │
  ├──► REJECTED（被拒绝，风控/交易所均可拒绝）
  │
  ▼
OPEN（已在交易所挂单，等待撮合）
  │
  ├──► PARTIALLY_FILLED（部分成交，仍在等待）
  │         │
  │         ▼
  ├──► FILLED（全部成交）
  │
  ├──► PENDING_CANCEL（撤单请求已发出）
  │         │
  │         ▼
  └──► CANCELLED（已撤单）
```

**后端工程师需要理解**：
- 订单状态是有限状态机，状态转换必须严格控制
- 同一笔订单可能收到多条成交回报（部分成交），需要累加处理
- 网络超时时，订单状态可能是"未知"，需要主动查询对账

---

## 二、订单类型详解

### 市价单（Market Order）
- **含义**：以当前市场最优价格立即成交
- **特点**：保证成交，不保证价格
- **风险**：在流动性差的市场可能"滑点"严重
- **后端处理**：不需要存储限价字段，优先级最高，直接撮合队列头部

### 限价单（Limit Order）
- **含义**：只在指定价格或更优价格成交
- **特点**：保证价格，不保证成交
- **后端处理**：需要进入订单簿等待，存储 `price` 字段，按价格+时间排序

### 止损单（Stop Order）
- **含义**：价格触达触发价后，自动变为市价单执行
- **用途**：限制亏损，如"跌到 90 元就卖出"
- **后端处理**：需要监听行情，条件触发前不进入订单簿

### 止损限价单（Stop-Limit Order）
- **含义**：触发后变为限价单而非市价单
- **后端处理**：两阶段，先监听触发价，触发后挂限价单

### 冰山单（Iceberg Order）
- **含义**：只展示部分数量，成交后自动补充剩余量
- **用途**：大单隐藏真实意图，减少市场冲击
- **后端处理**：需要维护"展示量"和"总量"两个字段，每次成交后刷新展示部分

```java
// 冰山单的核心字段示意
public class IcebergOrder {
    private BigDecimal totalQty;      // 总数量（不对外暴露）
    private BigDecimal displayQty;    // 每次展示的数量
    private BigDecimal executedQty;   // 已成交数量
    private BigDecimal visibleQty;    // 当前订单簿可见数量

    // 每次 visibleQty 被成交后，从剩余量中补充
    public void replenish() {
        BigDecimal remaining = totalQty.subtract(executedQty);
        this.visibleQty = remaining.min(displayQty);
    }
}
```

---

## 三、OMS vs EMS

这两个系统经常被混淆，但职责不同：

| 维度 | OMS（Order Management System） | EMS（Execution Management System） |
|------|-------------------------------|-------------------------------------|
| 核心职责 | 订单全生命周期管理、合规检查、持仓记录 | 智能路由、执行优化、延迟敏感 |
| 使用者 | 基金经理、中后台 | 交易员、算法交易 |
| 延迟要求 | 毫秒级即可 | 微秒级 |
| 主要功能 | 订单状态追踪、持仓计算、合规审查 | 最佳执行、VWAP/TWAP 算法、Smart Order Routing |
| 数据存储 | 需要持久化全量历史 | 更关注实时内存状态 |

**在实际系统中**：
- 小型券商可能 OMS+EMS 合一
- 大型机构分离部署，OMS 侧重中后台，EMS 侧重前台执行

---

## 四、FIX 协议

FIX（Financial Information eXchange）是金融行业的标准消息协议，1992 年由 Fidelity 和 Salomon Brothers 联合制定，如今几乎所有券商、交易所之间的通信都用它。

### 为什么需要 FIX
没有 FIX 之前，每家公司用自己的消息格式，系统对接要开发大量适配器。FIX 统一了字段定义和消息结构。

### 消息格式

FIX 消息是一串 `Tag=Value` 的键值对，用 `\x01`（SOH字符）分隔：

```
8=FIX.4.2\x019=148\x0135=D\x0149=CLIENT\x0156=BROKER\x01
34=100\x0152=20240101-09:30:00\x0111=ORDER001\x0121=1\x01
55=AAPL\x0154=1\x0138=100\x0140=2\x0144=150.50\x0160=20240101-09:30:00\x0110=123\x01
```

### 关键 Tag 含义

| Tag | 字段名 | 含义 | 常见值 |
|-----|--------|------|--------|
| 8 | BeginString | FIX 版本 | FIX.4.2, FIX.4.4, FIXT.1.1 |
| 35 | MsgType | 消息类型 | D=新订单, 8=成交回报, F=撤单请求 |
| 49 | SenderCompID | 发送方标识 | 你的公司代码 |
| 56 | TargetCompID | 接收方标识 | 对方公司代码 |
| 11 | ClOrdID | 客户订单ID | 你系统内唯一订单号 |
| 55 | Symbol | 证券代码 | AAPL, 600000.SS |
| 54 | Side | 买卖方向 | 1=买, 2=卖 |
| 38 | OrderQty | 委托数量 | 100 |
| 40 | OrdType | 订单类型 | 1=市价, 2=限价 |
| 44 | Price | 限价价格 | 150.50 |
| 39 | OrdStatus | 订单状态 | 0=新建, 1=部分成交, 2=全部成交, 4=已撤 |
| 14 | CumQty | 累计成交量 | 50 |
| 6 | AvgPx | 平均成交价 | 150.30 |

### 核心消息类型

**D - New Order Single（新建单笔订单）**
```
35=D        # 消息类型：新订单
11=ORD001   # 客户订单ID
55=AAPL     # 证券代码
54=1        # 买入
38=100      # 数量100股
40=2        # 限价单
44=150.50   # 限价150.50
```

**8 - Execution Report（成交/状态回报）**
```
35=8        # 消息类型：成交回报
11=ORD001   # 对应的客户订单ID
17=EXEC001  # 成交编号
39=2        # 订单状态：全部成交
14=100      # 累计成交量
6=150.48    # 平均成交价
```

**F - Order Cancel Request（撤单请求）**
```
35=F        # 消息类型：撤单
11=CANCEL001  # 新的撤单请求ID
41=ORD001     # 要撤销的原始订单ID
```

### 用 QuickFIX/J 接收成交回报（示例）

```java
public class MyApplication implements Application {

    @Override
    public void fromApp(Message message, SessionID sessionID)
            throws FieldNotFound, IncorrectDataFormat, IncorrectTagValue, UnsupportedMessageType {

        String msgType = message.getHeader().getString(MsgType.FIELD);

        if (MsgType.EXECUTION_REPORT.equals(msgType)) {
            handleExecutionReport(message);
        }
    }

    private void handleExecutionReport(Message message) throws FieldNotFound {
        String clOrdId = message.getString(ClOrdID.FIELD);    // Tag 11
        char ordStatus = message.getChar(OrdStatus.FIELD);    // Tag 39
        double cumQty = message.getDouble(CumQty.FIELD);      // Tag 14
        double avgPx = message.getDouble(AvgPx.FIELD);        // Tag 6

        switch (ordStatus) {
            case OrdStatus.PARTIALLY_FILLED:
                // 部分成交，更新持仓，订单继续等待
                updatePosition(clOrdId, cumQty, avgPx);
                break;
            case OrdStatus.FILLED:
                // 全部成交，更新持仓，订单关闭
                updatePosition(clOrdId, cumQty, avgPx);
                closeOrder(clOrdId);
                break;
            case OrdStatus.CANCELED:
                closeOrder(clOrdId);
                break;
            case OrdStatus.REJECTED:
                handleRejection(clOrdId, message);
                break;
        }
    }
}
```

---

## 五、市场微结构与订单簿

### Level 1 vs Level 2 行情

| 级别 | 内容 | 用途 |
|------|------|------|
| Level 1 | 最优买价（Bid）、最优卖价（Ask）、最新成交价 | 普通用户看盘 |
| Level 2 | 多档买卖价格和数量（通常5档或10档） | 交易员判断市场深度 |
| Level 3 | 全部挂单明细（通常只有做市商能看） | 做市商 |

### 订单簿（Order Book）数据结构

```
卖方（Ask/Offer）        买方（Bid）
价格      数量          价格      数量
151.00    500          150.50    1000
150.80    300          150.30    800
150.70    200          150.10    600
              ← Spread →
```

- **Bid-Ask Spread（买卖价差）**：卖价 - 最优买价，反映流动性成本
- 流动性越好（大盘股），价差越小；流动性越差（小盘股），价差越大

### 订单簿的后端实现

```java
public class OrderBook {
    // 买方：价格降序（最高价优先）
    private final TreeMap<BigDecimal, Deque<Order>> bids =
        new TreeMap<>(Comparator.reverseOrder());

    // 卖方：价格升序（最低价优先）
    private final TreeMap<BigDecimal, Deque<Order>> asks =
        new TreeMap<>();

    public void addOrder(Order order) {
        if (order.getSide() == Side.BUY) {
            bids.computeIfAbsent(order.getPrice(), k -> new ArrayDeque<>())
                .addLast(order);  // 同价格按时间排队（FIFO）
        } else {
            asks.computeIfAbsent(order.getPrice(), k -> new ArrayDeque<>())
                .addLast(order);
        }
    }

    // 获取最优买价
    public BigDecimal getBestBid() {
        return bids.isEmpty() ? null : bids.firstKey();
    }

    // 获取最优卖价
    public BigDecimal getBestAsk() {
        return asks.isEmpty() ? null : asks.firstKey();
    }
}
```

### 撮合逻辑

```java
public List<Trade> match(Order incoming) {
    List<Trade> trades = new ArrayList<>();

    if (incoming.getSide() == Side.BUY) {
        // 买单：找最低卖价，且卖价 <= 买单限价
        while (!asks.isEmpty() && incoming.getRemainingQty().compareTo(ZERO) > 0) {
            Map.Entry<BigDecimal, Deque<Order>> bestAsk = asks.firstEntry();

            // 限价单：只有卖价 <= 买价才能成交
            if (incoming.getType() == LIMIT &&
                bestAsk.getKey().compareTo(incoming.getPrice()) > 0) {
                break;  // 无法成交，挂入订单簿等待
            }

            Order resting = bestAsk.getValue().peekFirst();
            BigDecimal tradeQty = incoming.getRemainingQty().min(resting.getRemainingQty());
            BigDecimal tradePrice = resting.getPrice();  // 以挂单价成交（价格优先）

            trades.add(new Trade(incoming.getId(), resting.getId(), tradeQty, tradePrice));
            incoming.fill(tradeQty);
            resting.fill(tradeQty);

            if (resting.isFullyFilled()) {
                bestAsk.getValue().pollFirst();
                if (bestAsk.getValue().isEmpty()) asks.remove(bestAsk.getKey());
            }
        }

        if (!incoming.isFullyFilled()) {
            addOrder(incoming);  // 未成交部分挂入订单簿
        }
    }
    // 卖单对称处理...

    return trades;
}
```

---

## 六、高频交易（HFT）基本概念

HFT 不是本阶段的重点，但需要理解基本概念，因为会影响系统设计决策。

### 核心特征
- 持仓时间极短（毫秒到秒级），通常日内平仓
- 每日交易量极大，单笔利润极小（靠量取胜）
- 极度依赖延迟优势（比竞争者快 1 微秒就是优势）

### Co-location（共置/托管）
HFT 公司将服务器直接放在交易所机房，物理距离缩短带来延迟优势。
- 光速在光纤中传播 1ms ≈ 200km
- 上海到深圳约 1500km，单程光传输约 7.5ms
- HFT 公司为节省这几毫秒，愿意付高额托管费

### 对后端工程师的意义
如果你不是做 HFT，不需要深入研究纳秒级优化。但要知道：
- 为什么交易系统要避免 GC 停顿
- 为什么用 Disruptor 而不是 `java.util.concurrent.ArrayBlockingQueue`
- 为什么数据库写入不能在交易热路径上

---

## 本节小结

| 概念 | 核心要点 |
|------|---------|
| 订单生命周期 | NEW → OPEN → FILLED/CANCELLED，状态机严格控制 |
| 订单类型 | 市价/限价/止损/冰山，后端处理逻辑各不同 |
| OMS vs EMS | OMS 管全生命周期和合规，EMS 管执行优化 |
| FIX 协议 | Tag=Value 格式，35=消息类型，成交回报(8)是核心 |
| 订单簿 | TreeMap 实现，价格优先+时间优先撮合 |
| HFT | 理解概念即可，核心是延迟敏感，影响技术选型 |

**下一节**：[Phase 2.2 风险管理](./phase2-02-risk-management.md)
