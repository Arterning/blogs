# 农业物联网（AgriIoT）技术栈全解析：从田间传感器到数据大屏

【备选标题】
- 农田里的"神经系统"：农业IoT技术栈，一篇讲清楚
- 土壤传感器到数据大屏，这条链路你必须搞懂
- 为什么农业IoT项目死了一批又一批？因为没想清楚这件事

---

上周一个做农业的朋友找我抱怨：他们花了 80 万在三个大棚里装了一堆传感器，结果数据全堆在本地，根本没人看，传感器坏了也没人知道。

我问他，数据怎么上来的？他说，RS485 接线，每天人工去机房导一次 CSV。

我沉默了三秒。

这不是个例。很多农业IoT项目，传感器买了一堆，钱花出去了，但数据没有流动起来——因为从传感器到决策，中间有一条完整的技术链路，没人给他们讲清楚。

这篇文章就是补这个课的。

---

**一、先建一个整体认知：农业IoT到底在解决什么问题**

农业的核心困境是：**地太分散，人太少，凭经验种地误差太大。**

一个管理 5000 亩农田的合作社，靠人工巡田，一个人一天最多走完 200 亩，还看不出土壤深层的问题。

IoT 要解决的就是这个问题：**用传感器代替人的眼睛和鼻子，把田间状态实时数字化，交给系统去判断。**

整条技术链路长这样：

```
田间传感器
  → 有线/无线通信协议（数据怎么传出来）
  → 网关（田间数据汇聚点）
  → 物联网平台（数据接收、存储、管理）
  → 应用层（告警、决策、可视化）
```

每一层都有坑。我们逐层拆。

---

**二、传感器层：你真正需要采什么数据**

很多项目失败，死在最开始——传感器买错了，或者买多了。

先搞清楚：不同的业务目标，需要的传感器完全不同。

**土壤类传感器**

这是农业IoT的核心。最基础的是**土壤温湿度传感器**，采集土壤含水率（VWC，单位 %）、温度（°C）、和 EC 值（电导率，反映土壤盐分浓度）。

主流方案是 TDR（时域反射）或 FDR（频域反射）原理。FDR 更便宜，TDR 更精确，一般农业项目用 FDR 够了。

国内常用品牌：JXBS（嘉兴博思）、土壤帮；国际品牌：METER（原 Decagon），贵但精度高。

一块传感器通常做成**多深度探头**，同时采集 10cm、20cm、40cm 三层的数据——因为作物根系分布在不同深度，只看表层含水率会骗你。

**气象类传感器**

小型气象站，常规配置采集：温湿度、风速风向、大气压、降雨量、太阳辐射。

注意一个坑：**降雨量传感器需要定期清理**，树叶、虫子会堵住翻斗，导致数据失真。运维不到位，数据直接作废。

**图像传感器**

病虫害识别场景用。定点摄像头 + 定时拍照，图片送模型识别。

难点不在传感器，在**数据传输**——图片比数值大几百倍，同样的通信方案，传数值没问题，传图片就撑不住了。这个后面讲协议时再细说。

**常见传感器选型参考表**

| 传感器 | 采集参数 | 推荐场景 | 国内参考品牌 |
|--------|---------|---------|------------|
| 土壤温湿度（FDR） | VWC、温度、EC | 灌溉决策、大田 | JXBS、土壤帮 |
| 小型气象站 | 温湿度、降雨、风速、辐射 | 所有场景必配 | Davis、锦州阳光 |
| 叶片温湿度 | 叶温、叶湿、结露 | 病害预警（露点判断） | Decagon |
| 土壤 pH/养分 | pH、N/P/K | 精准施肥 | 研博仪器 |
| 图像摄像头 | 植株图像 | 病虫害识别 | 定制方案 |

---

**三、通信协议层：数据怎么从田间"走"出来**

这一层是最容易踩坑的地方。协议选错了，要么覆盖不到，要么功耗撑不住，要么带宽不够。

把常用协议按距离和功耗分两类来理解：**有线近距离** 和 **无线远距离**。

**有线协议：RS485 和 SDI-12**

RS485 是工业界用了几十年的有线串行通信协议，稳定、便宜、抗干扰强。一条 RS485 总线可以串联多达 32 个设备，距离可达 1200 米。

适合场景：大棚内部，线路可以布，对稳定性要求高。

SDI-12 是专门为农业和环境传感器设计的串行协议，功耗极低，适合太阳能供电设备。很多专业土壤传感器原生支持 SDI-12。

有线方案的问题是：**布线成本高，在大田里不现实**。一块 300 亩的地，你不可能拉几公里的网线。

**无线协议：LoRa 和 NB-IoT**

这才是农业IoT的主战场。

**LoRa（Long Range）** 是一种调制技术，工作在 433/470/868/915 MHz 免授权频段。它的核心特点是**覆盖远、功耗低、穿透强**，一个网关在农村空旷地带可以覆盖 5-15 公里。

LoRaWAN 是基于 LoRa 的网络协议，定义了设备如何接入网络、如何管理、如何加密。你实际部署的是 LoRaWAN，LoRa 只是它的物理层。

**NB-IoT（Narrowband IoT）** 是蜂窝物联网标准，跑在运营商的基站上。中国移动、联通、电信都部署了 NB-IoT 网络，基本上有 4G 信号的地方就有 NB-IoT。

用起来像买一张物联网 SIM 卡，插进去就能用，不用自己建网关。

**LoRa vs NB-IoT：怎么选**

这是被问最多的问题。我的判断是：

| 维度 | LoRa（自建） | NB-IoT |
|------|------------|--------|
| 网络依赖 | 自建网关，完全掌控 | 依赖运营商基站覆盖 |
| 初期成本 | 网关 3000-8000 元，有硬件投入 | 零基础设施成本 |
| 运营成本 | 流量免费，只有硬件维护 | 按连接数/流量付费，规模大了贵 |
| 数据安全 | 数据走私有链路 | 走运营商网络 |
| 适合场景 | 偏远地区、规模化、政府项目 | 有信号覆盖、小规模快速验证 |

**我的建议：先用 NB-IoT 快速跑通业务逻辑，规模化之后再评估是否换 LoRaWAN。**

别一开始就花大价钱建网关基础设施，你还不知道这个业务能不能活过第一年。

**平台协议：MQTT**

传感器数据到了网关，接下来怎么发给服务器？

答案几乎是唯一的：**MQTT（Message Queuing Telemetry Transport）**。

MQTT 是为物联网设计的轻量级消息协议，基于发布/订阅模型。设备连接一个 Broker（消息代理），往 Topic（主题）发布消息，服务器订阅这个 Topic 就能收到数据。

相比 HTTP，MQTT 的优势是：**报文极小**（最小只有 2 字节头部），在弱网环境下丢包少，连接保持，不用每次都重新握手。

一条 MQTT 消息长这样：

```
Topic:   farm/field_001/sensor/soil_moisture
Payload: {"timestamp": 1714012800, "depth_10cm": 0.32, "depth_20cm": 0.28, "temp": 18.5}
```

Topic 的命名是有讲究的，按 `农场/地块/设备类型/传感器` 分层，方便后端按层级订阅和过滤。

---

**四、网关层：田间的"数据中转站"**

网关是很多项目忽视的一层。

一个工业级农业网关需要承担的事情：
1. 汇聚多路 RS485 传感器数据
2. 支持 LoRaWAN 接入（如果用了 LoRa 终端节点）
3. 本地缓存（断网时数据不丢）
4. 4G/NB-IoT/以太网上行
5. 支持远程运维（OTA 固件升级）

**断网缓存这一点极其重要。** 农村网络不稳定，一晚上断网很正常。没有本地缓存的网关，断网期间数据全丢，后面的分析就是缺口数据，产量预测模型的精度直接崩。

国内做农业网关的厂商：研华、四信通信、有人物联网。

开源方案：树莓派 + ChirpStack（LoRaWAN 网络服务器）自己搭，适合技术验证阶段。

---

**五、数据平台层：从接收到决策**

数据到了服务器，接下来是整个链路里技术含量最高的部分。

**标准架构是这样的：**

```
设备/网关
  ↓  MQTT
MQTT Broker（消息代理）
  ↓  消费消息
消息队列（Kafka）         ← 高并发场景才需要，小项目可以省
  ↓  流处理
时序数据库（写入原始数据）
关系型数据库（写入设备元数据、告警记录）
  ↓
应用层（API 服务）
  ↓
前端可视化 / 告警通知
```

**MQTT Broker 选哪个**

这里要先解释一个常见的困惑：**为什么不用 RabbitMQ 或 RocketMQ？**

三者经常被放在一起比较，但其实解决的是完全不同的问题。

RabbitMQ 和 RocketMQ 是**业务消息队列**，设计目标是：服务与服务之间传递业务事件（订单创建、支付成功、库存变更……），连接数少、单条消息有业务含义、消息可能很大、需要复杂的路由和重试策略。

IoT 场景完全相反：**连接数极多、单条消息极小、上报频率极高、协议是 MQTT 而非 AMQP。**

一个有 10000 个传感器的农场，意味着 10000 条长连接同时在线。每 15 分钟上报一次，每条消息不过 100 字节。RabbitMQ 的连接模型根本不是为这个场景设计的，它在万级连接下性能会急剧下降，而 EMQX 单节点可以稳定支撑 100 万并发连接。

RocketMQ 连 MQTT 协议都不原生支持，它是阿里为高吞吐业务消息（双十一订单洪峰）设计的，用在传感器上报这里，是牛刀杀鸡，而且刀还不合适。

| | EMQX / Mosquitto | RabbitMQ | RocketMQ |
|--|-----------------|---------|---------|
| 核心协议 | MQTT（IoT 原生） | AMQP（有 MQTT 插件，非原生） | 私有协议（无 MQTT） |
| 连接模型 | 百万级长连接 | 千级连接 | 业务系统间 |
| 单条消息大小 | 几十到几百字节 | KB 到 MB | KB 到 MB |
| 适合场景 | IoT 设备上报 | 微服务间业务事件 | 高吞吐业务消息流 |

一句话总结：**MQTT 是传感器说话用的语言，EMQX 是专门听这种语言的服务器。** 用 RabbitMQ 接传感器，相当于用中文翻译软件去处理日语，能跑，但永远差一层转换。

实际项目里，EMQX 和 Kafka 经常组合出现：EMQX 负责接传感器连接（MQTT 入口），内置的规则引擎把消息转发给 Kafka，Kafka 负责后续的流处理和多消费者分发。两者职责不同，不是替代关系。

所以，这里的核心逻辑是：

设计目标根本不同
- RabbitMQ / RocketMQ 是业务消息队列：连接数少、消息有业务含义、需要复杂路由
- EMQX 是 IoT 消息代理：百万级长连接、每条消息几十字节、MQTT 原生支持

具体问题
- RabbitMQ：MQTT 是插件而非原生，万级连接下性能急剧下降
- RocketMQ：根本不支持 MQTT 协议，为阿里双十一订单洪峰设计，场景完全不同

实际项目里的分工：EMQX 负责接传感器（MQTT 入口）→ 规则引擎转发给 Kafka → Kafka 负责流处理和多消费者，两者不是竞争关系而是协作关系。


入门推荐 **EMQX**（开源版），国产，文档友好，部署简单，性能足够支撑几十万连接。生产环境可以直接用 EMQX Cloud（托管版），省去运维。

另一个选择是 Mosquitto，更轻量，适合边缘网关本地部署。

**时序数据库选哪个**

农业传感器数据是典型的时序数据：同一个传感器，每 15 分钟上报一次，一年就是 35040 条记录，一千个传感器就是 3500 万条。

普通关系型数据库扛不住这个写入量，专用时序数据库是必选项。

- **InfluxDB**：最成熟的开源时序数据库，生态好，Grafana 原生支持。学习成本低，入门首选。
- **TDengine**：国产，专为物联网设计，超高写入性能（单节点每秒百万条），支持 SQL 查询，国内农业项目主流选择之一。
- **TimescaleDB**：PostgreSQL 的时序扩展，如果你的团队熟悉 PG，无缝切换。

**小项目用 InfluxDB，大规模国内项目考虑 TDengine。**

---

**六、实战：从零搭一套最小可用的农业IoT数据流**

理论到这里，下面走一遍实际操作。目标：用 Python 模拟一个土壤传感器，通过 MQTT 上报数据，写入 InfluxDB，用 Grafana 可视化。

**Step 1：部署 EMQX 和 InfluxDB（Docker 方式）**

```bash
# 启动 EMQX
docker run -d --name emqx \
  -p 1883:1883 \
  -p 18083:18083 \
  emqx/emqx:latest

# 启动 InfluxDB
docker run -d --name influxdb \
  -p 8086:8086 \
  -e DOCKER_INFLUXDB_INIT_MODE=setup \
  -e DOCKER_INFLUXDB_INIT_USERNAME=admin \
  -e DOCKER_INFLUXDB_INIT_PASSWORD=password123 \
  -e DOCKER_INFLUXDB_INIT_ORG=farm \
  -e DOCKER_INFLUXDB_INIT_BUCKET=sensor_data \
  influxdb:2.7
```

**Step 2：Python 模拟传感器上报（MQTT Publisher）**

```python
import paho.mqtt.client as mqtt
import json
import time
import random
from datetime import datetime

BROKER = "localhost"
PORT = 1883
TOPIC = "farm/field_001/sensor/soil"

def simulate_soil_sensor():
    """模拟土壤传感器数据"""
    return {
        "timestamp": int(time.time()),
        "device_id": "soil_001",
        "field_id": "field_001",
        "depth_10cm": round(random.uniform(0.20, 0.45), 3),   # 体积含水率
        "depth_20cm": round(random.uniform(0.25, 0.40), 3),
        "soil_temp": round(random.uniform(15.0, 25.0), 1),
        "ec": round(random.uniform(0.2, 1.5), 2)               # 电导率 mS/cm
    }

client = mqtt.Client()
client.connect(BROKER, PORT)

print("开始模拟传感器上报，每 15 秒一次...")
while True:
    payload = simulate_soil_sensor()
    client.publish(TOPIC, json.dumps(payload))
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 上报: {payload}")
    time.sleep(15)
```

**Step 3：MQTT 订阅并写入 InfluxDB（Consumer）**

```python
import paho.mqtt.client as mqtt
import json
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# InfluxDB 配置
INFLUX_URL = "http://localhost:8086"
INFLUX_TOKEN = "your-token-here"  # 从 InfluxDB UI 获取
INFLUX_ORG = "farm"
INFLUX_BUCKET = "sensor_data"

influx_client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=INFLUX_ORG)
write_api = influx_client.write_api(write_options=SYNCHRONOUS)

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode())

        # 构建 InfluxDB 数据点
        point = (
            Point("soil_sensor")
            .tag("device_id", data["device_id"])
            .tag("field_id", data["field_id"])
            .field("vwc_10cm", data["depth_10cm"])
            .field("vwc_20cm", data["depth_20cm"])
            .field("soil_temp", data["soil_temp"])
            .field("ec", data["ec"])
            .time(data["timestamp"], WritePrecision.SECONDS)
        )

        write_api.write(bucket=INFLUX_BUCKET, record=point)
        print(f"写入 InfluxDB: field={data['field_id']}, vwc_10cm={data['depth_10cm']}")

    except Exception as e:
        print(f"处理消息失败: {e}")

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message
mqtt_client.connect("localhost", 1883)
mqtt_client.subscribe("farm/#")   # 订阅 farm 下所有 topic
mqtt_client.loop_forever()
```

注意 `mqtt_client.subscribe("farm/#")` 里的 `#` 是 MQTT 通配符，匹配 `farm/` 下任意层级的主题。`+` 只匹配一层，`#` 匹配所有层。这是初学者最容易混淆的地方。

**Step 4：Grafana 接 InfluxDB，5 分钟出大屏**

Grafana 配置流程：

1. `docker run -d -p 3000:3000 grafana/grafana` 启动 Grafana
2. 访问 `localhost:3000`，默认账号 admin/admin
3. Configuration → Data Sources → Add data source → InfluxDB
4. 选择 Flux 查询语言，填入 URL、Token、Org、Bucket
5. 新建 Dashboard，写查询：

```flux
from(bucket: "sensor_data")
  |> range(start: -24h)
  |> filter(fn: (r) => r._measurement == "soil_sensor")
  |> filter(fn: (r) => r._field == "vwc_10cm")
  |> filter(fn: (r) => r.field_id == "field_001")
```

这条 Flux 查询的意思：从 sensor_data 桶里，取最近 24 小时，soil_sensor 测量值里，字段是 vwc_10cm，地块是 field_001 的所有数据。

然后选一个时序折线图类型，几分钟你就能看到实时滚动的土壤含水率曲线。

---

**七、告警规则：让系统主动"喊人"**

数据流通了，还差最后一步：**不能让人一直盯着大屏，要让系统自动发现问题。**

最常见的告警场景：

```python
# 伪代码：土壤含水率低于阈值触发灌溉告警
def check_irrigation_alert(field_id, vwc_10cm, vwc_20cm):
    # 田间持水量的 60% 是触发灌溉的经验阈值
    FIELD_CAPACITY = 0.35   # 该地块的田间持水量（需实测）
    TRIGGER_THRESHOLD = FIELD_CAPACITY * 0.6

    if vwc_10cm < TRIGGER_THRESHOLD and vwc_20cm < TRIGGER_THRESHOLD:
        return {
            "alert_type": "LOW_SOIL_MOISTURE",
            "field_id": field_id,
            "severity": "WARNING",
            "message": f"地块 {field_id} 土壤含水率过低，建议立即灌溉",
            "current_vwc": vwc_10cm
        }
    return None
```

告警通知渠道：企业微信机器人 Webhook（最常用，一个 POST 请求搞定）、短信（适合紧急告警）、钉钉机器人。

Grafana 本身也内置了告警规则引擎（Alerting），可以直接在查询上设置阈值告警，不用写代码。小项目直接用 Grafana Alert 就行。

---

**八、上线前必须想清楚的三个问题**

**1. 供电方案**

农田里没有市电，传感器靠什么供电？

主流方案是**太阳能板 + 锂电池**。一个 10W 太阳能板配 10000mAh 锂电池，可以支撑一个 LoRa 节点运行 6 个月以上（取决于上报频率）。

上报频率设计要省电：不是所有数据都需要 1 分钟一条。土壤含水率变化慢，15 分钟一次完全够；雨量在下雨时 1 分钟一次，不下雨时 1 小时一次。**动态上报频率**能把电池寿命延长 3-5 倍。

**2. 防水防尘防雷**

户外设备的 IP 等级至少要 IP65（防尘 + 防水射流）。接线口、SIM 卡槽是最容易进水的地方，要用专用防水接头。

雷雨天气对信号传输设备威胁极大，网关要加**浪涌保护器（SPD）**，这个很多项目直接省掉了，然后一个夏天报废两三个网关。

**3. 运维体系**

没有运维规划的农业IoT项目，基本活不过第二年。

最低配置：
- 设备心跳监控（每个设备每 30 分钟上报一次心跳，超时就告警）
- 远程 OTA 升级能力（不然修一个 bug 要跑到田间地头去一台台更新固件）
- 故障设备快速定位（哪个地块、哪台设备、故障了多久）

---

**总结一下这条链路**

```
传感器（采什么数据）
  ↓ RS485/SDI-12（有线近距）/ LoRaWAN/NB-IoT（无线远距）
网关（数据汇聚 + 本地缓存）
  ↓ MQTT（轻量级消息协议）
MQTT Broker（EMQX）
  ↓ 消费 + 解析
时序数据库（InfluxDB / TDengine）
  ↓ 查询
Grafana 可视化 + 告警规则
  ↓
企微/钉钉/短信通知到人
```

每一层都有替代方案，但这是目前工程上最稳定、生态最成熟的组合。

---

农业IoT最难的地方不在技术，在**如何让农民/合作社愿意用起来**。系统再精密，如果告警发出去没人响应，灌溉建议没人执行，所有数据就是自嗨。

你觉得，农业IoT落地失败，更多是技术问题，还是推广问题？欢迎在评论区聊聊你的看法。
