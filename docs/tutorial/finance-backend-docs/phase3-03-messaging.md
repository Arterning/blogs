# Phase 3.3 消息与通信

> 目标：掌握金融系统中消息传递的核心模式：FIX 协议实现、市场数据分发、消息队列设计。

---

## 一、FIX 协议实践（QuickFIX/J）

Phase 2 介绍了 FIX 协议的格式，这里重点讲如何用代码实现。

### 项目依赖

```xml
<!-- Maven -->
<dependency>
    <groupId>org.quickfixj</groupId>
    <artifactId>quickfixj-core</artifactId>
    <version>2.3.1</version>
</dependency>
```

### Session 配置文件

```ini
# config/fix-session.cfg

[DEFAULT]
ConnectionType=initiator          # initiator=主动连接(客户端)，acceptor=接受连接(服务端)
ReconnectInterval=5
FileLogPath=logs/fix
FileStorePath=store/fix
StartTime=00:00:00
EndTime=00:00:00
UseDataDictionary=Y
DataDictionary=FIX42.xml

[SESSION]
BeginString=FIX.4.2
SenderCompID=MY_FIRM              # 我方标识
TargetCompID=BROKER               # 对方标识
SocketConnectHost=fix.broker.com
SocketConnectPort=9876
HeartBtInt=30                     # 心跳间隔（秒）
```

### Application 实现

```java
@Component
public class FixApplication implements Application {

    private SessionID sessionID;

    // 建立连接时调用
    @Override
    public void onCreate(SessionID sessionID) {
        this.sessionID = sessionID;
        log.info("FIX session created: {}", sessionID);
    }

    // 登录成功时调用
    @Override
    public void onLogon(SessionID sessionID) {
        log.info("FIX logon success: {}", sessionID);
        // 可以在这里发起订阅或恢复未完成的订单
    }

    // 断开连接时调用
    @Override
    public void onLogout(SessionID sessionID) {
        log.warn("FIX logout: {}", sessionID);
        // 需要处理连接中断期间的状态恢复
    }

    // 接收到应用层消息
    @Override
    public void fromApp(Message message, SessionID sessionID)
            throws FieldNotFound, IncorrectDataFormat, IncorrectTagValue, UnsupportedMessageType {

        String msgType = message.getHeader().getString(MsgType.FIELD);

        switch (msgType) {
            case MsgType.EXECUTION_REPORT      -> handleExecutionReport(message);
            case MsgType.ORDER_CANCEL_REJECT   -> handleCancelReject(message);
            case MsgType.BUSINESS_MESSAGE_REJECT -> handleBusinessReject(message);
            default -> log.warn("Unhandled msgType: {}", msgType);
        }
    }

    // 接收到管理层消息（心跳、登录、登出等）
    @Override
    public void fromAdmin(Message message, SessionID sessionID) {
        // 通常不需要处理，QuickFIX/J 自动管理
    }

    @Override
    public void toApp(Message message, SessionID sessionID) throws DoNotSend {}
    @Override
    public void toAdmin(Message message, SessionID sessionID) {}

    // -------- 业务逻辑 --------

    private void handleExecutionReport(Message msg) throws FieldNotFound {
        String  clOrdId   = msg.getString(ClOrdID.FIELD);      // Tag 11
        char    ordStatus = msg.getChar(OrdStatus.FIELD);       // Tag 39
        double  cumQty    = msg.getDouble(CumQty.FIELD);        // Tag 14
        double  avgPx     = msg.getDouble(AvgPx.FIELD);         // Tag 6
        String  execType  = msg.getString(ExecType.FIELD);      // Tag 150

        log.info("ExecReport: orderId={}, status={}, cumQty={}, avgPx={}",
            clOrdId, ordStatus, cumQty, avgPx);

        // 发布领域事件，由其他服务处理
        eventBus.publish(new ExecutionReportEvent(clOrdId, ordStatus, cumQty, avgPx));
    }

    // -------- 发送订单 --------

    public String sendNewOrder(NewOrderRequest request) {
        String clOrdId = orderIdGenerator.next();

        Message order = new quickfix.fix42.NewOrderSingle(
            new ClOrdID(clOrdId),
            new HandlInst(HandlInst.AUTOMATED_EXECUTION_ORDER_PRIVATE),
            new Symbol(request.getSymbol()),
            new Side(request.isBuy() ? Side.BUY : Side.SELL),
            new TransactTime(),
            new OrdType(request.isMarket() ? OrdType.MARKET : OrdType.LIMIT)
        );

        order.setField(new OrderQty(request.getQty().doubleValue()));

        if (!request.isMarket()) {
            order.setField(new Price(request.getPrice().doubleValue()));
        }

        try {
            Session.sendToTarget(order, sessionID);
            return clOrdId;
        } catch (SessionNotFound e) {
            throw new FixSessionException("FIX session not available", e);
        }
    }

    public void cancelOrder(String originalClOrdId, String symbol, char side) {
        String cancelId = orderIdGenerator.next();

        Message cancel = new quickfix.fix42.OrderCancelRequest(
            new OrigClOrdID(originalClOrdId),
            new ClOrdID(cancelId),
            new Symbol(symbol),
            new Side(side),
            new TransactTime()
        );

        try {
            Session.sendToTarget(cancel, sessionID);
        } catch (SessionNotFound e) {
            throw new FixSessionException("FIX session not available", e);
        }
    }
}
```

### FIX 消息持久化与恢复

QuickFIX/J 内置消息存储，断线重连后可以重发未确认消息：

```java
// 消息存储配置（写入文件）
settings.setString(FileStoreFactory.SETTING_FILE_STORE_PATH, "store/fix");

// 或使用数据库存储（生产推荐）
settings.setString(JdbcStoreFactory.SETTING_JDBC_DRIVER, "com.mysql.cj.jdbc.Driver");
settings.setString(JdbcStoreFactory.SETTING_JDBC_CONNECTION_URL, jdbcUrl);

// 消息日志（便于审计）
settings.setString(FileLogFactory.SETTING_FILE_LOG_PATH, "logs/fix");
```

---

## 二、市场数据分发

### 行情数据的特点

- **高频**：主要市场每秒数万条 tick
- **多订阅方**：同一行情数据需要推送给风控、策略、前端等多个消费者
- **延迟敏感**：风控系统需要毫秒级收到最新价格

### 订阅-发布模式

```java
// 行情数据结构
public record MarketData(
    String symbol,
    String exchange,
    BigDecimal lastPrice,
    BigDecimal bidPrice,
    BigDecimal askPrice,
    BigDecimal bidSize,
    BigDecimal askSize,
    long timestamp          // 纳秒级时间戳
) {}

// 行情分发器（内存中，低延迟）
public class MarketDataBroadcaster {
    // 使用 CopyOnWriteArrayList，读多写少场景下无锁读
    private final Map<String, List<MarketDataHandler>> subscribers =
        new ConcurrentHashMap<>();

    public void subscribe(String symbol, MarketDataHandler handler) {
        subscribers.compute(symbol, (k, handlers) -> {
            List<MarketDataHandler> list = handlers == null
                ? new CopyOnWriteArrayList<>() : handlers;
            list.add(handler);
            return list;
        });
    }

    public void unsubscribe(String symbol, MarketDataHandler handler) {
        Optional.ofNullable(subscribers.get(symbol))
                .ifPresent(list -> list.remove(handler));
    }

    // 行情到来时，推送给所有订阅者
    public void onMarketData(MarketData data) {
        List<MarketDataHandler> handlers = subscribers.get(data.symbol());
        if (handlers == null) return;

        for (MarketDataHandler handler : handlers) {
            try {
                handler.onMarketData(data);
            } catch (Exception e) {
                log.error("Handler error for {}: {}", data.symbol(), e.getMessage());
                // 一个处理器出错不影响其他处理器
            }
        }
    }
}

// 风控系统订阅行情：用于实时盯市
marketDataBroadcaster.subscribe("AAPL", data -> {
    riskEngine.updateMarketPrice(data.symbol(), data.lastPrice());
});

// 前端推送订阅行情：通过 WebSocket 推送给客户端
marketDataBroadcaster.subscribe("AAPL", data -> {
    webSocketSessionManager.broadcast("AAPL", data);
});
```

### UDP 多播（Multicast）

交易所向所有会员广播行情时，使用 UDP 多播，效率远高于逐一 TCP 推送：

```
交易所行情服务器
       │
       │（单次发送）
       ▼
  [多播组 239.1.1.1]
       │
  ┌────┴────┐
  ▼         ▼
会员A      会员B    （同时收到，交易所只发一次）
```

```java
// 接收 UDP 多播行情
public class MulticastMarketDataReceiver {
    private final String multicastGroup = "239.1.1.1";
    private final int    port           = 9999;

    public void start() throws Exception {
        MulticastSocket socket = new MulticastSocket(port);
        InetAddress group = InetAddress.getByName(multicastGroup);
        socket.joinGroup(group);

        byte[] buffer = new byte[4096];
        DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

        while (running) {
            socket.receive(packet);
            MarketData data = deserialize(packet.getData(), packet.getLength());
            broadcaster.onMarketData(data);
        }
    }
}
```

**UDP 多播的问题**：UDP 不保证送达，行情数据可能丢失。

解决方案：
- 行情数据有序号，接收方检测到跳号时，通过 TCP 请求补包（Gap Fill）
- 或接受少量数据丢失（对行情来说，跳过一两个 tick 通常可以接受）

---

## 三、消息队列在金融场景的特殊要求

### 顺序保证

```
订单事件必须按顺序处理：
CREATED → RISK_CHECKED → SENT_TO_EXCHANGE → FILLED → SETTLED

如果 FILLED 先于 SENT_TO_EXCHANGE 处理，持仓计算会出错。
```

**Kafka 的顺序保证**：同一 partition 内消息有序，同一订单的所有事件发往同一 partition。

```java
// 以 orderId 作为 partition key，确保同一订单的事件进同一 partition
kafkaTemplate.send(
    "order-events",
    order.getId(),    // partition key
    orderEvent        // message value
);
```

### 幂等性（Idempotency）

消息队列可能因为网络重试导致消息被处理多次，金融系统必须保证幂等。

```java
// 每个消息携带唯一的业务 ID
public record OrderFilledEvent(
    String eventId,       // 唯一事件ID，用于幂等去重
    String orderId,
    BigDecimal filledQty,
    BigDecimal filledPrice,
    Instant occurredAt
) {}

// 消费者：检查是否已处理过该事件
@KafkaListener(topics = "order-filled-events")
public void handleOrderFilled(OrderFilledEvent event) {
    // 检查是否已处理（Redis 或数据库去重表）
    if (processedEventCache.exists(event.eventId())) {
        log.info("Duplicate event ignored: {}", event.eventId());
        return;
    }

    // 业务处理
    positionService.applyFill(event);

    // 标记为已处理（设置过期时间，避免永久占用存储）
    processedEventCache.set(event.eventId(), "1", Duration.ofDays(7));
}
```

### 持久化保证

金融消息不能丢：

```java
// Kafka 生产者：最强持久化配置
Properties props = new Properties();
props.put(ProducerConfig.ACKS_CONFIG, "all");           // 所有副本确认才算成功
props.put(ProducerConfig.RETRIES_CONFIG, Integer.MAX_VALUE);  // 无限重试
props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 1);  // 保证顺序
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);    // 生产者幂等

// Kafka 主题配置
// replication.factor=3（三副本）
// min.insync.replicas=2（至少2个副本同步才允许写入）
```

### 死信队列（Dead Letter Queue）

消息处理失败后不能丢弃，需要送入死信队列待人工处理：

```java
@KafkaListener(topics = "order-events")
public void handleOrderEvent(OrderEvent event) {
    try {
        processEvent(event);
    } catch (TemporaryException e) {
        // 临时错误：重试
        throw e;  // Kafka 会根据配置重试
    } catch (PermanentException e) {
        // 永久性错误：发送到死信队列，人工处理
        deadLetterProducer.send("order-events-dlq", event, e.getMessage());
        log.error("Event sent to DLQ: {}, reason: {}", event.getId(), e.getMessage());
        // 不抛出异常，避免无限重试
    }
}
```

---

## 四、WebSocket 实时行情推送

### 架构设计

```
行情数据源（交易所）
        │
        ▼
[行情接入服务] ── 发布到 Redis Pub/Sub ──► [多个推送节点]
                                                  │
                                                  ▼
                                        [WebSocket 连接池]
                                                  │
                                    ┌─────────────┼─────────────┐
                                    ▼             ▼             ▼
                                客户端A         客户端B        客户端C
```

为什么用 Redis Pub/Sub 而不是直接推送？因为推送节点可以水平扩展，每个节点只持有一部分 WebSocket 连接。

### Spring WebSocket 实现

```java
@Component
public class MarketDataWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, Set<WebSocketSession>> symbolSubscriptions
        = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        session.getAttributes().put("subscriptions", new HashSet<String>());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        SubscribeRequest req = parseRequest(message.getPayload());

        switch (req.getAction()) {
            case "subscribe" -> {
                symbolSubscriptions
                    .computeIfAbsent(req.getSymbol(), k -> ConcurrentHashMap.newKeySet())
                    .add(session);
                ((Set<String>) session.getAttributes().get("subscriptions"))
                    .add(req.getSymbol());
            }
            case "unsubscribe" -> {
                Optional.ofNullable(symbolSubscriptions.get(req.getSymbol()))
                        .ifPresent(sessions -> sessions.remove(session));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // 清理该连接的所有订阅
        Set<String> subs = (Set<String>) session.getAttributes().get("subscriptions");
        subs.forEach(symbol ->
            Optional.ofNullable(symbolSubscriptions.get(symbol))
                    .ifPresent(sessions -> sessions.remove(session))
        );
    }

    // 行情到来时推送
    public void broadcast(String symbol, MarketData data) {
        Set<WebSocketSession> sessions = symbolSubscriptions.get(symbol);
        if (sessions == null || sessions.isEmpty()) return;

        String payload = jsonSerializer.serialize(data);
        TextMessage msg = new TextMessage(payload);

        sessions.removeIf(session -> {
            if (!session.isOpen()) return true;  // 连接已断开，移除
            try {
                session.sendMessage(msg);
                return false;
            } catch (IOException e) {
                log.warn("Failed to send to session {}: {}", session.getId(), e.getMessage());
                return true;  // 发送失败，移除该连接
            }
        });
    }
}
```

### 流量控制

高频行情不能直接全量推送给前端：

```java
// 限速：同一 symbol 最多每 100ms 推送一次
public class ThrottledMarketDataPusher {

    private final Map<String, Instant> lastSentTime = new ConcurrentHashMap<>();
    private static final Duration MIN_INTERVAL = Duration.ofMillis(100);

    public void maybePush(String symbol, MarketData data, WebSocketSession session) {
        Instant now = Instant.now();
        Instant last = lastSentTime.getOrDefault(symbol, Instant.EPOCH);

        if (Duration.between(last, now).compareTo(MIN_INTERVAL) >= 0) {
            sendToSession(session, data);
            lastSentTime.put(symbol, now);
        }
        // 否则丢弃此次推送（对行情来说可以接受）
    }
}
```

---

## 五、消息协议设计

### 内部消息格式

内部系统间通信，推荐 Protocol Buffers（性能好，有 Schema 约束）：

```protobuf
// order_events.proto
syntax = "proto3";

message OrderFilledEvent {
    string event_id       = 1;
    string order_id       = 2;
    string account_id     = 3;
    string symbol         = 4;
    string side           = 5;         // BUY / SELL
    string filled_qty     = 6;         // 用 string 保证精度
    string filled_price   = 7;
    string avg_price      = 8;
    int64  occurred_at_ms = 9;         // UTC 毫秒时间戳
}
```

```java
// 序列化
OrderFilledEvent event = OrderFilledEvent.newBuilder()
    .setEventId(UUID.randomUUID().toString())
    .setOrderId(orderId)
    .setFilledQty(filledQty.toPlainString())   // BigDecimal → String
    .setFilledPrice(filledPrice.toPlainString())
    .setOccurredAtMs(Instant.now().toEpochMilli())
    .build();

byte[] bytes = event.toByteArray();  // 紧凑的二进制格式

// 反序列化
OrderFilledEvent received = OrderFilledEvent.parseFrom(bytes);
BigDecimal qty = new BigDecimal(received.getFilledQty());  // String → BigDecimal
```

### 消息版本演进

金融系统长期运行，消息格式不可避免地会变化：

```protobuf
// 版本演进原则：只能增加字段，不能删除或改变已有字段的 field number
message OrderFilledEvent {
    string event_id       = 1;  // 不能修改或删除
    string order_id       = 2;
    // ... 原有字段 ...
    string exchange       = 10; // v2 新增字段，老版本消费者会忽略
    string venue_order_id = 11; // v2 新增字段
}
```

---

## 六、通信故障处理

### 断线检测与重连

```java
// FIX 协议内置心跳机制（HeartBeat 消息，Tag 35=0）
// QuickFIX/J 自动发送和接收，超时自动重连

// 自定义重连逻辑（适用于非 FIX 协议的 TCP 连接）
public class ReconnectingClient {
    private static final int MAX_BACKOFF_SECONDS = 60;

    public void connectWithRetry() {
        int attempt = 0;
        while (!stopped) {
            try {
                connect();
                attempt = 0;  // 连接成功，重置重试计数
                runUntilDisconnected();
            } catch (ConnectException e) {
                int backoff = Math.min((int) Math.pow(2, attempt), MAX_BACKOFF_SECONDS);
                log.warn("Connection failed, retrying in {}s (attempt {})", backoff, attempt);
                sleep(backoff, TimeUnit.SECONDS);
                attempt++;
            }
        }
    }
}
```

### 消息补单（Gap Recovery）

断线期间错过的消息需要补全：

```java
// 重连后，检查消息序号是否连续
public void onReconnect(long lastReceivedSeqNum) {
    long serverSeqNum = queryServerSequenceNumber();

    if (serverSeqNum > lastReceivedSeqNum + 1) {
        // 有消息丢失，请求重发
        requestResend(lastReceivedSeqNum + 1, serverSeqNum);
    }
}

// FIX 协议中：发送 ResendRequest（Tag 35=2）请求重发
Message resendRequest = new quickfix.fix42.ResendRequest(
    new BeginSeqNo(lastReceivedSeqNum + 1),
    new EndSeqNo(0)  // 0 表示重发到最新
);
Session.sendToTarget(resendRequest, sessionID);
```

---

## 本节小结

| 主题 | 核心要点 |
|------|---------|
| FIX 协议实现 | QuickFIX/J，Application 接口，消息持久化 |
| 市场数据分发 | 订阅-发布模式，UDP 多播，有序号的 Gap 处理 |
| Kafka 金融配置 | acks=all，幂等生产者，同一订单同一 partition |
| 幂等消费 | eventId 去重，死信队列处理永久失败 |
| WebSocket 推送 | 分层架构（Redis Pub/Sub + 推送节点），流量控制 |
| Protobuf | 内部消息格式，字符串保精度，只增不减 |
| 断线处理 | 指数退避重连，消息序号检测，Gap Fill |

**下一节**：[Phase 3.4 数据库选型与使用](./phase3-04-database.md)
