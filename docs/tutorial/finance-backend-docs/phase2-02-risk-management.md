# Phase 2.2 风险管理（Risk Management）

> 目标：理解金融机构如何量化和控制风险，以及风控系统的后端实现逻辑。

---

## 一、为什么风控是后端工程师的核心战场

金融系统的 bug 不是页面崩溃，是真实资金损失。2012 年美国骑士资本（Knight Capital）因一个部署错误，45 分钟亏损 4.4 亿美元，公司直接被迫出售。

风控系统的职责：**在损失发生之前，而不是之后，阻止危险操作。**

---

## 二、风险的三大类别

### 1. 市场风险（Market Risk）
因市场价格变动（股价、利率、汇率）导致的损失风险。

**最常见的量化指标：VaR（Value at Risk，在险价值）**

VaR 回答的问题：**在未来 N 天内，以 X% 的置信度，最大损失不超过多少？**

示例：
> "我的投资组合 1 日 95% VaR 为 100 万元"
> 含义：有 95% 的概率，明天的损失不超过 100 万元（反过来，有 5% 的概率损失超过 100 万）

**三种 VaR 计算方法**：

| 方法 | 原理 | 优缺点 |
|------|------|--------|
| 历史模拟法 | 用过去 N 天的实际收益率分布，取分位数 | 直观，但依赖历史数据质量 |
| 参数法（方差-协方差） | 假设收益率正态分布，用 σ 计算 | 计算快，但正态假设在极端市场失效 |
| 蒙特卡洛模拟 | 随机生成大量情景，统计损失分布 | 最灵活，计算最重，适合复杂衍生品 |

**后端实现要点**：
```java
// 历史模拟法 VaR 示意
public BigDecimal calculateHistoricalVaR(
        List<BigDecimal> dailyPnL,  // 过去250天的每日盈亏
        double confidenceLevel) {   // 如 0.95

    List<BigDecimal> sorted = dailyPnL.stream()
        .sorted()  // 升序，最大亏损在前
        .collect(toList());

    // 95% 置信度 = 取第 5% 分位数（即最差的5%情景的边界）
    int index = (int) Math.floor((1 - confidenceLevel) * sorted.size());
    return sorted.get(index).negate();  // 取绝对值，VaR 是正数
}
```

### 2. 信用风险（Credit Risk）
交易对手方无法履约的风险。

**对手方风险（Counterparty Risk）**：
- 场景：你和 A 银行签了一份远期合约，A 银行破产了，合约无法履行
- 衍生品交易中尤其重要，因为合约期限长，风险敞口随时间变化

**CVA（信用估值调整，Credit Valuation Adjustment）**：
- 对衍生品公允价值的调整，反映对手方违约概率
- 公式简化：`CVA ≈ 违约概率 × 违约敞口 × (1 - 回收率)`

**后端工程师需要关注**：
- 交易前检查对手方信用额度是否足够
- 实时更新和监控信用敞口
- 触达阈值时自动告警或拒绝新交易

```java
// 信用额度检查（交易前风控）
public RiskCheckResult checkCreditLimit(String counterpartyId, BigDecimal newExposure) {
    BigDecimal currentExposure = creditExposureCache.get(counterpartyId);
    BigDecimal limit = creditLimitRepository.getLimit(counterpartyId);

    BigDecimal projectedExposure = currentExposure.add(newExposure);

    if (projectedExposure.compareTo(limit) > 0) {
        return RiskCheckResult.reject(
            String.format("Credit limit exceeded: projected=%.2f, limit=%.2f",
                projectedExposure, limit)
        );
    }
    return RiskCheckResult.pass();
}
```

### 3. 操作风险（Operational Risk）
因内部流程、系统或人为错误导致的损失风险。

常见来源：
- 交易员输错数量（Fat Finger 错误：把 100 万股输成了 1000 万股）
- 系统 bug 导致重复下单
- 网络中断导致订单状态不一致

---

## 三、希腊字母（The Greeks）

期权风险管理的核心工具，描述期权价值对各个参数的敏感度。

### Delta（δ）
**含义**：标的资产价格变动 1 元，期权价格变动多少元。

```
Delta = ∂V/∂S
V = 期权价值, S = 标的资产价格
```

- 看涨期权（Call）：Delta 在 0 到 1 之间
- 看跌期权（Put）：Delta 在 -1 到 0 之间
- Delta = 0.6：标的涨 1 元，期权涨约 0.6 元

**Delta 对冲（Delta Hedging）**：
持有 Delta = 0.6 的看涨期权 1000 份，需要卖出 600 股标的资产来对冲，使整体组合 Delta ≈ 0。

### Gamma（γ）
**含义**：Delta 随标的价格的变化率（Delta 的 Delta）。

```
Gamma = ∂²V/∂S²
```

- Gamma 高 → Delta 变化快 → 需要频繁再平衡对冲
- 临近到期日时 Gamma 急剧增大（Gamma 风险）

### Vega（ν）
**含义**：隐含波动率变动 1%，期权价格变动多少。

- 波动率上升 → 期权价值上升（不管涨跌期权，不确定性越大，期权越值钱）
- Vega 风险是期权做市商的主要风险之一

### Theta（θ）
**含义**：时间流逝一天，期权价值减少多少（时间价值衰减）。

- 期权买方的天然敌人：即使标的不动，每天期权都在贬值
- 做市商通常 Theta 为正（卖出期权收取时间价值）

### 实际场景理解

```
一个期权做市商的风险报告（每日）：
├── 组合 Delta: +250（相当于多持 250 股标的的风险）
├── 组合 Gamma: +50（Delta 对市场变化的敏感度）
├── 组合 Vega: -10,000（波动率每涨 1%，亏 1 万元）
└── 组合 Theta: +5,000（每天赚取 5000 元时间价值）
```

**后端工程师的职责**：
- 实时计算和聚合整个组合的希腊字母
- 监控各希腊字母是否超过限额
- 达到阈值时触发告警或自动减仓

---

## 四、风控系统架构：实时 vs 事后

### 事前风控（Pre-trade Risk Check）

在订单发出之前检查，**阻止危险操作发生**。

```
下单请求
    │
    ▼
┌─────────────────────────────────────┐
│           Pre-trade 风控             │
│  ✓ 信用额度检查                      │
│  ✓ 持仓限额检查（不能超过X手）         │
│  ✓ 单笔金额检查（防 Fat Finger）      │
│  ✓ 日累计损益检查（亏损超限停止交易）   │
│  ✓ 市场准入检查（该账户有没有交易资格） │
└─────────────────────────────────────┘
    │
    ├── 通过 ──► 发往交易所
    └── 拒绝 ──► 返回拒绝原因，记录日志
```

**延迟要求极高**：必须在微秒到毫秒级别完成，否则影响交易速度。

实现原则：
- 所有限额数据**必须在内存中**，不能实时查数据库
- 计算逻辑必须简单，不能有复杂查询
- 拒绝时必须有明确的拒绝代码，方便排查

```java
@Service
public class PreTradeRiskEngine {
    // 所有限额从数据库加载到内存，定期刷新
    private final ConcurrentHashMap<String, RiskLimits> limitsCache;
    // 当前持仓从持仓系统同步到内存
    private final ConcurrentHashMap<String, Position> positionCache;

    public RiskCheckResult check(OrderRequest order) {
        RiskLimits limits = limitsCache.get(order.getAccountId());
        if (limits == null) return RiskCheckResult.reject("ACCOUNT_NOT_FOUND");

        // 1. 单笔数量检查
        if (order.getQty().compareTo(limits.getMaxSingleOrderQty()) > 0) {
            return RiskCheckResult.reject("SINGLE_ORDER_QTY_EXCEEDED");
        }

        // 2. 持仓限额检查
        Position pos = positionCache.getOrDefault(
            order.getAccountId() + ":" + order.getSymbol(),
            Position.ZERO
        );
        BigDecimal projectedPosition = pos.getNetQty().add(
            order.getSide() == BUY ? order.getQty() : order.getQty().negate()
        );
        if (projectedPosition.abs().compareTo(limits.getMaxPositionQty()) > 0) {
            return RiskCheckResult.reject("POSITION_LIMIT_EXCEEDED");
        }

        // 3. 日累计亏损检查
        BigDecimal todayPnL = pnlCache.get(order.getAccountId());
        if (todayPnL != null && todayPnL.compareTo(limits.getDailyLossLimit().negate()) < 0) {
            return RiskCheckResult.reject("DAILY_LOSS_LIMIT_EXCEEDED");
        }

        return RiskCheckResult.pass();
    }
}
```

### 实时风控（Intra-day Risk Monitoring）

交易进行中，持续监控风险敞口。

- 成交后立即更新持仓和盈亏
- 实时计算 VaR 和希腊字母（可以用近似值）
- 触达阈值时告警（而非直接拒绝）

### 事后风控（Post-trade Risk Analysis）

交易结束后的全量风险分析。

- 精确的 VaR 和压力测试（计算量大，不影响交易）
- 交易行为分析（检测异常模式）
- 合规报告生成

---

## 五、压力测试与情景分析

VaR 有缺陷：它描述"正常市场"下的损失，但金融危机时相关性会发生剧变。

**压力测试（Stress Testing）**：用极端历史情景或假设情景测试组合表现。

常用历史情景：
| 情景 | 时间 | 主要特征 |
|------|------|---------|
| 亚洲金融危机 | 1997-1998 | 亚洲货币大幅贬值 |
| 科技泡沫破裂 | 2000-2002 | 科技股暴跌 60%+ |
| 次贷危机 | 2008-2009 | 信用市场冻结，股市腰斩 |
| 新冠暴跌 | 2020年3月 | 一个月内标普跌 34% |

```java
// 情景分析示意
public Map<String, BigDecimal> runScenarioAnalysis(
        Portfolio portfolio,
        List<Scenario> scenarios) {

    Map<String, BigDecimal> results = new LinkedHashMap<>();

    for (Scenario scenario : scenarios) {
        BigDecimal totalPnL = BigDecimal.ZERO;

        for (Position position : portfolio.getPositions()) {
            // 对每个持仓，应用情景中的价格变动
            BigDecimal priceShock = scenario.getPriceShock(position.getSymbol());
            BigDecimal pnl = position.getMarketValue().multiply(priceShock);
            totalPnL = totalPnL.add(pnl);
        }

        results.put(scenario.getName(), totalPnL);
    }

    return results;
}
```

---

## 六、异常交易检测

操作风险的重要一环：自动识别不正常的交易行为。

### 常见检测规则

**Fat Finger 检测**：
```java
// 委托价格偏离市价超过 X%，可能是输错
if (order.getPrice().subtract(marketPrice).abs()
        .divide(marketPrice, HALF_UP)
        .compareTo(MAX_PRICE_DEVIATION) > 0) {
    alert("FAT_FINGER_SUSPECTED", order);
}
```

**频率异常检测**：
```java
// 同一账户在 1 分钟内下单超过 N 次
int orderCount = orderCountCache.increment(accountId + ":1min");
if (orderCount > MAX_ORDERS_PER_MINUTE) {
    alert("HIGH_FREQUENCY_ORDER", accountId);
}
```

**自成交检测（Self-dealing）**：
- 同一实体控制的账户互相交易，可能涉及市场操纵
- 需要识别关联账户，检测买卖双方是否关联

---

## 七、限额体系设计

实际系统中，限额是分层的：

```
机构级限额（整个公司）
    │
    ├── 业务线限额（股票部门、债券部门）
    │       │
    │       ├── 交易台限额（某个交易台）
    │       │       │
    │       │       └── 交易员个人限额
    │       │
    │       └── 产品限额（某个股票的最大持仓）
    │
    └── 账户限额（特定账户）
```

**后端设计要点**：
- 限额检查需要从叶节点到根节点逐层检查
- 父级限额是子级限额之和的上界
- 限额修改需要审批流程，并记录变更日志

---

## 本节小结

| 概念 | 核心要点 |
|------|---------|
| 市场风险 | VaR 量化，三种计算方法，历史模拟最直观 |
| 信用风险 | 对手方违约风险，交易前检查信用额度 |
| 操作风险 | Fat Finger、重复下单、系统 bug 导致的损失 |
| 希腊字母 | Delta/Gamma/Vega/Theta，期权风险的四个维度 |
| 事前风控 | 内存计算，微秒级延迟，阻止危险操作 |
| 事后风控 | 精确计算，合规报告，行为分析 |
| 压力测试 | 极端情景下的组合表现，补充 VaR 的不足 |

**下一节**：[Phase 2.3 清算与结算](./phase2-03-clearing-settlement.md)
