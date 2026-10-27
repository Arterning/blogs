# 懂金融的后端工程师：学习大纲

> 目标：成为能与交易员、风控、产品经理直接对话的后端工程师，而非只会执行技术需求的"码农"。
>
> 预计周期：18-24 个月（利用业余时间）

---

## 学习路线总览

```
Phase 1（0-3月）   金融语言关：看懂金融在说什么
Phase 2（3-6月）   核心业务关：交易/风控/清结算的运转逻辑
Phase 3（6-12月）  技术落地关：金融系统的后端实现
Phase 4（12-24月） 深度整合关：在真实项目中综合运用
```

---

## Phase 1：金融语言关（0-3 个月）

**目标**：能读懂金融新闻、产品文档、需求文档，不再对专业术语一头雾水。

### 教程文件

| 章节 | 文件 | 核心内容 |
|------|------|---------|
| 1.1 基础金融概念 | [phase1-01-basic-concepts.md](./phase1-01-basic-concepts.md) | 利率、汇率、通胀、金融市场分类、各机构角色、账户资金状态 |
| 1.2 证券基础 | [phase1-02-securities.md](./phase1-02-securities.md) | 股票、债券、基金、ETF、期货、期权 |
| 1.3 交易基础 | [phase1-03-trading-basics.md](./phase1-03-trading-basics.md) | 订单类型、撮合规则、买卖价差、T+N 交割、A 股特有规则 |

### 知识点速览

- [ ] 利率是金融系统的"全局配置"，上升 → 债券跌、股票承压
- [ ] 场内市场（交易所）标准化，场外市场（OTC）定制化
- [ ] 做市商：同时提供买卖报价，赚取价差，提供流动性
- [ ] 账户资金四状态：可用 → 冻结（下单）→ 待结算（成交）→ 已结算
- [ ] 股票 = 公司所有权，PE = 股价/每股盈利（估值指标）
- [ ] 债券价格与利率反向：利率上升 → 债券价格下跌
- [ ] 久期 = 债券对利率的敏感度，久期 5 年 → 利率涨 1% 债券跌约 5%
- [ ] 期货：约定未来以今天价格交割（标准化、场内）
- [ ] 期权：有权但无义务，买方最多亏期权费，卖方风险无限
- [ ] 限价单：保证价格不保证成交；市价单：保证成交不保证价格
- [ ] 集合竞价：以"最大成交量"原则定出开盘价
- [ ] A 股：证券 T+1（买入当天不能卖），资金 T+0（卖出当天可用）

**学习资料**：
- 书：《聪明的投资者》（建立基础直觉）
- 书：《Options, Futures, and Other Derivatives》— Hull（衍生品权威教材）
- 网站：Investopedia（英文，概念查询最佳）

---

## Phase 2：核心业务关（3-6 个月）

**目标**：理解金融公司各核心部门的业务流程，能识别技术系统服务的是哪个业务环节。

### 教程文件

| 章节 | 文件 | 核心内容 |
|------|------|---------|
| 2.1 交易系统 | [phase2-01-trading-system.md](./phase2-01-trading-system.md) | 订单生命周期、FIX 协议、订单簿撮合 |
| 2.2 风险管理 | [phase2-02-risk-management.md](./phase2-02-risk-management.md) | VaR、希腊字母、事前/实时/事后风控 |
| 2.3 清算与结算 | [phase2-03-clearing-settlement.md](./phase2-03-clearing-settlement.md) | 净额清算、DVP、CCP、保证金、对账 |
| 2.4 合规与监管 | [phase2-04-compliance.md](./phase2-04-compliance.md) | KYC、AML、交易报告、审计日志 |

### 知识点速览

- [ ] 订单生命周期：下单 → 路由 → 撮合 → 成交 → 回报
- [ ] OMS vs EMS：全生命周期管理 vs 执行优化
- [ ] FIX 协议：Tag=Value 格式，成交回报（35=8）是核心
- [ ] VaR：N 天内以 X% 置信度的最大损失
- [ ] 希腊字母：Delta/Gamma/Vega/Theta 期权风险四维度
- [ ] 净额清算 vs 逐笔清算：轧差后只结算净额
- [ ] DVP（货银对付）：证券与资金同步交割，消除违约风险
- [ ] T+N 规则：A 股 T+1，美股 T+1，外汇 T+2
- [ ] CCP 与保证金：初始保证金 + 每日变动保证金
- [ ] KYC/AML：身份核实、制裁名单筛查、可疑交易检测
- [ ] 审计日志：Append-only，不可篡改，长期留存

**学习方式**：
- 找金融公司的技术博客（Jane Street、Two Sigma 等有公开文章）
- 读 FIX 协议官方文档
- 学习开源 OMS 项目（如 QuickFIX）的设计

---

## Phase 3：技术落地关（6-12 个月）

**目标**：掌握金融系统特有的技术要求和实现模式，能设计和实现核心模块。

### 教程文件

| 章节 | 文件 | 核心内容 |
|------|------|---------|
| 3.1 低延迟系统设计 | [phase3-01-low-latency.md](./phase3-01-low-latency.md) | ZGC、Disruptor、对象池、TCP_NODELAY、HDR Histogram |
| 3.2 金融数据建模 | [phase3-02-data-modeling.md](./phase3-02-data-modeling.md) | BigDecimal 精度、持仓模型、时间序列、事件溯源 |
| 3.3 消息与通信 | [phase3-03-messaging.md](./phase3-03-messaging.md) | QuickFIX/J 实践、行情分发、Kafka 金融配置、WebSocket |
| 3.4 数据库选型 | [phase3-04-database.md](./phase3-04-database.md) | PostgreSQL Schema、TimescaleDB、Redis 金融用法、Saga |
| 3.5 金融系统可靠性 | [phase3-05-reliability.md](./phase3-05-reliability.md) | 幂等性、对账系统、灾备、审计日志哈希链 |
| 3.6 实践项目 | [phase3-06-projects.md](./phase3-06-projects.md) | 撮合引擎、持仓系统、风控引擎（三个完整项目） |

### 知识点速览

- [ ] ZGC / Shenandoah：GC 停顿 < 1ms，金融系统必选
- [ ] Disruptor：无锁队列，吞吐量是 BlockingQueue 的 5 倍
- [ ] BigDecimal：永远用字符串构造，永远不用 float/double
- [ ] 事件溯源：Append-only 事件 + 快照，满足审计和回溯
- [ ] QuickFIX/J：实现 Application 接口，处理成交回报（35=8）
- [ ] Kafka 金融配置：acks=all，同一订单同一 partition
- [ ] TimescaleDB：超表 + 连续聚合，行情数据的正确存储方式
- [ ] 幂等性：唯一业务键 + 数据库约束，或幂等令牌表
- [ ] 对账：三层（实时/日内/日终），差异必须有原因和工单
- [ ] 审计日志：哈希链防篡改，Append-only，5-10 年留存

### 3.5 金融系统可靠性

- [ ] 资金安全的零容忍设计：幂等性、防重复下单
- [ ] 对账系统设计：内部对账、与交易所/银行对账
- [ ] 灾备与故障切换：主备架构、RPO/RTO 要求
- [ ] 审计日志：不可篡改、完整链路追踪

### 3.6 实践项目

```
项目 A：简易订单匹配引擎
  - 实现价格优先/时间优先的撮合逻辑
  - 维护订单簿（Buy/Sell 两侧）
  - 支持市价单和限价单

项目 B：实时持仓系统
  - 事件驱动更新持仓
  - 支持多账户、多币种
  - 提供持仓快照与历史查询

项目 C：简易风控引擎
  - 实时限额检查（单笔/日累计）
  - 异常交易告警
  - 对账差异检测
```

---

## Phase 4：深度整合（12-24 个月）

**目标**：在实际工作或项目中综合运用，形成可被业务方感知的价值。

### 教程文件

| 章节 | 文件 | 核心内容 |
|------|------|---------|
| 4.1 业务对话能力 | [phase4-01-business-dialogue.md](./phase4-01-business-dialogue.md) | 需求评审追问清单、用业务语言表达技术方案、识别合规风险 |
| 4.2 交易系统深度 | [phase4-02-trading-deep.md](./phase4-02-trading-deep.md) | 市场微结构、执行算法（VWAP/SOR）、OMS 分布式一致性 |
| 4.3 量化方向深度 | [phase4-03-quant-deep.md](./phase4-03-quant-deep.md) | 数据质量（前视偏差）、因子 IC 评估、事件驱动回测框架 |
| 4.4 风控方向深度 | [phase4-04-risk-deep.md](./phase4-04-risk-deep.md) | 因子模型 VaR、实时 Greeks 监控、动态规则引擎、压力测试 |
| 4.5 清结算方向深度 | [phase4-05-settlement-deep.md](./phase4-05-settlement-deep.md) | 日终处理流程、高效对账算法、企业行为、财务不变式 |
| 4.6 资源与职业发展 | [phase4-06-resources.md](./phase4-06-resources.md) | 精选书单、开源项目、国内资源、职业路径 |

### 核心原则

> **这个阶段没有统一的知识点清单，只有一个问题需要回答：**
> **你能否让业务方感受到，有你参与的项目和没你参与的项目，结果是不同的？**

四个方向任选其一深入，不要全部并行：

| 方向 | 适合背景 | 深度目标 |
|------|---------|---------|
| 交易系统 | 对低延迟、高并发感兴趣 | 能设计完整 OMS，处理所有异常场景，P99 < 1ms |
| 量化/算法交易 | 对数学、统计感兴趣 | 能构建因子研究到生产的完整 Pipeline |
| 风控系统 | 对实时计算、规则引擎感兴趣 | 能设计毫秒级风控引擎，支持动态规则热更新 |
| 清结算/后台 | 对数据准确性、流程设计感兴趣 | 能设计幂等可重跑的日终流程，账目永远对得上 |

---

## 关键心法

### 精度是底线
金融系统的 bug 不是页面错位，是真实资金损失。精度、幂等性、对账是不可妥协的底线。

### 业务 > 技术
一个懂清算流程的普通工程师，比不懂业务的架构师更有价值。技术是工具，业务理解是杠杆。

### 先广后深
先把整个金融系统的全貌建立起来（Phase 1-2），再选一个点深挖（Phase 4）。不要一开始就死磕 HFT 的纳秒优化。

### 对口实践
如果在金融公司工作，主动申请参与业务评审；如果不在，用开源项目（如 OpenMAMA、QuickFIX）模拟真实场景。

---

## 推荐资料汇总

### 书籍
| 书名 | 方向 | 难度 |
|------|------|------|
| 《Options, Futures, and Other Derivatives》— Hull | 衍生品基础 | 中 |
| 《Algorithmic Trading》— Ernie Chan | 量化交易 | 中 |
| 《Trading Systems and Methods》— Kaufman | 交易系统 | 中高 |
| 《The Art of Execution》— Freeman-Shor | 交易心理/执行 | 低 |
| 《Designing Data-Intensive Applications》— Kleppmann | 金融系统架构基础 | 中高 |

### 开源项目（可读源码）
- [QuickFIX/J](https://github.com/quickfix-j/quickfixj)：FIX 协议 Java 实现
- [Agrona](https://github.com/real-logic/agrona)：低延迟 Java 数据结构
- [Aeron](https://github.com/real-logic/aeron)：高性能消息传输
- [LMAX Disruptor](https://github.com/LMAX-Exchange/disruptor)：无锁队列，金融系统标配

### 在线资源
- Investopedia：金融概念速查
- FIX Trading Community：FIX 协议官方文档
- QuantLib：开源量化金融库（了解定价模型）
