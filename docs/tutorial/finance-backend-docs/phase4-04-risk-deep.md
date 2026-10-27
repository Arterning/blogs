# Phase 4.4 深度方向：风控系统

> 适合人群：对实时计算、规则引擎、系统稳定性感兴趣，想在风险管理系统方向深耕的工程师。

---

## 一、为什么风控系统是最有价值的位置之一

风控工程师直接影响公司的风险暴露，价值可量化：

- 一个好的事前风控，可以在几毫秒内阻止一次 Fat Finger 错误（潜在损失数百万）
- 一个好的实时风控，可以在市场极端波动时自动减仓（避免超额损失）
- 一个好的对账系统，可以在 T+1 发现持仓差异（而不是 T+7 才发现）

---

## 二、风控系统的架构全景

```
╔══════════════════════════════════════════════════════╗
║                  风控系统总体架构                      ║
╠══════════════════════════════════════════════════════╣
║  事前风控（Pre-trade）                                 ║
║  ┌──────────────────────────────────────────────┐   ║
║  │ 静态检查   动态检查      风险度量              │   ║
║  │ • 账户状态 • 实时持仓    • 实时 VaR 近似       │   ║
║  │ • 交易权限 • 累计损益    • Delta 敞口          │   ║
║  │ • 品种限制 • 信用额度    • 集中度风险           │   ║
║  └──────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════╣
║  日内风控（Intra-day）                                 ║
║  ┌──────────────────────────────────────────────┐   ║
║  │ • 实时盯市（MTM）   • 组合 Greeks 监控         │   ║
║  │ • 限额预警（阈值告警）• 异常交易行为检测         │   ║
║  └──────────────────────────────────────────────┘   ║
╠══════════════════════════════════════════════════════╣
║  事后风控（Post-trade）                                ║
║  ┌──────────────────────────────────────────────┐   ║
║  │ • 精确 VaR 计算     • 压力测试                 │   ║
║  │ • 绩效归因          • 合规报告                 │   ║
║  │ • 对账              • 行为监控（Surveillance） │   ║
║  └──────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════╝
```

---

## 三、实时 VaR 的工程实现

### 近似 VaR vs 精确 VaR

精确 VaR 需要完整的协方差矩阵计算，5000 只股票的协方差矩阵是 5000×5000 = 2500 万个元素，全量计算太慢。

日内实时风控用的是**近似 VaR**：

```java
/**
 * 基于因子模型的快速 VaR 计算
 * 将 N 只股票的风险分解为 K 个因子（K << N），大幅降低计算量
 */
public class FactorModelVaR {

    // 因子收益率协方差矩阵（K×K，维度小，更新快）
    private volatile double[][] factorCovariance;

    // 每只股票对各因子的暴露（因子载荷），从 Barra 模型获取
    private final Map<String, double[]> factorExposures;

    public BigDecimal calculate(Portfolio portfolio, double confidenceLevel) {
        // Step 1: 计算组合对各因子的综合暴露
        double[] portfolioExposure = new double[factorCount];

        for (Position pos : portfolio.getPositions()) {
            double[] stockExposure = factorExposures.get(pos.getSymbol());
            double weight = pos.getMarketValue().doubleValue() / portfolio.getTotalValue().doubleValue();

            for (int i = 0; i < factorCount; i++) {
                portfolioExposure[i] += weight * stockExposure[i];
            }
        }

        // Step 2: 计算因子组合的方差
        // 方差 = exposure^T × 因子协方差矩阵 × exposure
        double portfolioVariance = 0;
        for (int i = 0; i < factorCount; i++) {
            for (int j = 0; j < factorCount; j++) {
                portfolioVariance += portfolioExposure[i]
                    * factorCovariance[i][j]
                    * portfolioExposure[j];
            }
        }

        // Step 3: 加上特质性风险（各股票独立的非系统性风险）
        double specificVariance = portfolio.getPositions().stream()
            .mapToDouble(pos -> {
                double weight = pos.getMarketValue().doubleValue() /
                    portfolio.getTotalValue().doubleValue();
                double specificVol = specificVolatility.getOrDefault(pos.getSymbol(), 0.02);
                return weight * weight * specificVol * specificVol;
            }).sum();

        double totalVolatility = Math.sqrt(portfolioVariance + specificVariance);

        // Step 4: 转换为 VaR（假设正态分布）
        // 95% VaR 对应 z-score = 1.645
        double zScore = getZScore(confidenceLevel);
        double varPct = zScore * totalVolatility;

        return portfolio.getTotalValue()
            .multiply(BigDecimal.valueOf(varPct))
            .setScale(2, HALF_UP);
    }

    private double getZScore(double confidenceLevel) {
        // 常用值：95% → 1.645，99% → 2.326
        return switch ((int)(confidenceLevel * 100)) {
            case 95 -> 1.6449;
            case 99 -> 2.3263;
            default -> throw new IllegalArgumentException("Unsupported confidence: " + confidenceLevel);
        };
    }
}
```

### 因子协方差矩阵的实时更新

协方差矩阵不能每次都从头计算，需要增量更新：

```java
// 指数加权移动平均（EWMA）更新协方差矩阵
// 新数据权重更高，老数据权重指数衰减
public class EWMACovariance {
    private final double lambda;  // 衰减因子，通常 0.94（JP Morgan RiskMetrics）
    private double[][] covMatrix;

    // 每日收市后，用新的一天收益率更新
    public void update(Map<String, Double> factorReturns) {
        double[] returns = toVector(factorReturns);

        for (int i = 0; i < factorCount; i++) {
            for (int j = 0; j < factorCount; j++) {
                // EWMA 更新公式
                covMatrix[i][j] = lambda * covMatrix[i][j]
                    + (1 - lambda) * returns[i] * returns[j];
            }
        }
    }
}
```

---

## 四、实时希腊字母监控系统

期权做市商和对冲基金需要实时监控整个组合的希腊字母，系统设计挑战在于：
- 期权定价（B-S 模型）计算开销较大
- 行情每秒都在变，需要实时刷新
- 组合可能有几千个期权头寸

### 增量更新策略

```java
public class GreeksMonitor {
    // 缓存每个期权的 Greeks（避免重复计算）
    private final ConcurrentHashMap<String, OptionGreeks> greeksCache = new ConcurrentHashMap<>();

    // 行情变化时，只重算价格变动影响较大的期权
    @EventListener
    public void onPriceUpdate(PriceUpdateEvent event) {
        String underlying = event.getSymbol();

        // 找到所有以该标的为基础的期权头寸
        List<OptionPosition> affectedOptions = positionCache
            .getOptionsByUnderlying(underlying);

        // 并行重算 Greeks
        affectedOptions.parallelStream().forEach(option -> {
            OptionGreeks newGreeks = blackScholes.calculate(
                option.getStrike(),
                event.getPrice(),   // 最新标的价格
                option.getExpiry(),
                impliedVolCache.get(option.getId()),
                riskFreeRate
            );
            greeksCache.put(option.getId(), newGreeks);
        });

        // 汇总组合总 Greeks
        updatePortfolioGreeks(underlying);
    }

    // 汇总整个组合的 Delta 敞口
    public PortfolioGreeks getPortfolioGreeks(String accountId) {
        List<Position> positions = positionCache.getByAccount(accountId);

        double totalDelta = 0, totalGamma = 0, totalVega = 0, totalTheta = 0;

        for (Position pos : positions) {
            if (pos.isOption()) {
                OptionGreeks greeks = greeksCache.get(pos.getSymbol());
                if (greeks != null) {
                    double mult = pos.getNetQty().doubleValue() * pos.getContractMultiplier();
                    totalDelta += greeks.delta() * mult;
                    totalGamma += greeks.gamma() * mult;
                    totalVega  += greeks.vega()  * mult;
                    totalTheta += greeks.theta()  * mult;
                }
            } else {
                // 股票的 Delta = 1（每股价格变动 1 元，市值变动 1 元）
                totalDelta += pos.getNetQty().doubleValue();
            }
        }

        return new PortfolioGreeks(totalDelta, totalGamma, totalVega, totalTheta);
    }
}
```

### 自动对冲触发

```java
// 当 Delta 超过阈值时，自动触发对冲订单
@Scheduled(fixedDelay = 5_000)  // 每 5 秒检查一次
public void checkAndHedge() {
    for (String accountId : monitoredAccounts) {
        PortfolioGreeks greeks = greeksMonitor.getPortfolioGreeks(accountId);
        RiskLimits limits = limitCache.get(accountId);

        // Delta 中性策略：如果 Delta 偏离目标（通常是 0）超过阈值，发对冲单
        double deltaDeviation = Math.abs(greeks.delta() - limits.getTargetDelta());
        if (deltaDeviation > limits.getDeltaHedgeThreshold()) {
            // 需要买入或卖出多少份标的来恢复 Delta 中性
            double hedgeQty = -(greeks.delta() - limits.getTargetDelta());

            OrderRequest hedgeOrder = OrderRequest.builder()
                .accountId(accountId)
                .symbol(limits.getHedgeInstrument())  // 通常用期货对冲
                .side(hedgeQty > 0 ? BUY : SELL)
                .qty(BigDecimal.valueOf(Math.abs(hedgeQty)).setScale(0, FLOOR))
                .type(MARKET)  // 对冲订单通常用市价单保证成交
                .build();

            log.info("Auto-hedge triggered: account={}, delta={}, hedgeQty={}",
                accountId, greeks.delta(), hedgeQty);
            orderService.submit(hedgeOrder);
        }
    }
}
```

---

## 五、规则引擎设计

随着业务发展，风控规则越来越多，如何设计一个可维护、可扩展的规则引擎？

### 规则定义与存储

```java
// 规则模型：支持动态配置，不需要重启服务
@Entity
public class RiskRule {
    private String ruleId;
    private String ruleName;
    private RuleScope scope;        // ACCOUNT, TRADER, PORTFOLIO
    private String conditionScript; // Groovy 脚本，灵活定义条件
    private String actionType;      // REJECT, ALERT, REDUCE_POSITION
    private int priority;           // 执行优先级（越小越先执行）
    private boolean enabled;
}

// 规则示例（存储在数据库，运营人员可以修改）：
// conditionScript:
//   "order.qty * order.price > account.getDailyTurnoverLimit() * 0.5"
// actionType: "ALERT"
// ruleName: "单笔超过日换手额度 50% 预警"
```

### 规则执行引擎

```java
@Service
public class DynamicRiskRuleEngine {
    private volatile List<RiskRule> activeRules;  // 定期从 DB 刷新
    private final GroovyShell groovyShell;

    public RiskCheckResult evaluate(OrderRequest order, RiskContext context) {
        for (RiskRule rule : activeRules) {
            if (!rule.isEnabled()) continue;

            // 执行 Groovy 脚本（沙盒环境，防止恶意代码）
            boolean conditionMet = evaluateCondition(rule.getConditionScript(), order, context);

            if (conditionMet) {
                return switch (rule.getActionType()) {
                    case "REJECT" -> RiskCheckResult.reject(rule.getRuleId(), rule.getRuleName());
                    case "ALERT"  -> {
                        alertService.warn(rule, order);
                        yield RiskCheckResult.pass(); // 告警但不阻止
                    }
                    case "MANUAL_REVIEW" -> {
                        reviewQueue.enqueue(order, rule);
                        yield RiskCheckResult.pendingReview(rule.getRuleName());
                    }
                    default -> RiskCheckResult.pass();
                };
            }
        }
        return RiskCheckResult.pass();
    }

    private boolean evaluateCondition(String script, OrderRequest order, RiskContext ctx) {
        Binding binding = new Binding();
        binding.setVariable("order", order);
        binding.setVariable("account", ctx.getAccount());
        binding.setVariable("position", ctx.getPosition());
        binding.setVariable("market", ctx.getMarketData());

        // 超时保护：脚本执行不能超过 1ms
        try {
            return (Boolean) groovyShell.evaluate(script, binding);
        } catch (Exception e) {
            log.error("Rule evaluation failed: {}", script, e);
            return false; // 规则执行出错，不阻止交易（fail-open 策略）
        }
    }
}
```

### 规则的版本管理

```java
// 规则变更必须有审批流程，并记录变更历史
@Service
public class RuleManagementService {

    public void updateRule(RiskRule newRule, String operatorId, String reason) {
        RiskRule oldRule = ruleRepo.findById(newRule.getRuleId());

        // 记录变更审计日志
        ruleChangeLog.save(RuleChangeLog.builder()
            .ruleId(newRule.getRuleId())
            .oldCondition(oldRule.getConditionScript())
            .newCondition(newRule.getConditionScript())
            .operatorId(operatorId)
            .reason(reason)
            .changedAt(Instant.now())
            .build());

        ruleRepo.save(newRule);

        // 热更新：通知所有实例刷新规则缓存
        // （通过 Redis Pub/Sub 或 Kafka 广播）
        ruleUpdatePublisher.publish(newRule.getRuleId());
    }
}
```

---

## 六、压力测试系统

### 情景压力测试

```java
public class StressTester {

    // 预定义的历史压力情景
    private static final Map<String, Map<String, Double>> HISTORICAL_SCENARIOS = Map.of(
        "2008_CRISIS", Map.of(
            "EQUITY_RETURN",    -0.40,  // 股票跌 40%
            "CREDIT_SPREAD_BPS", 500.0, // 信用利差扩大 500bp
            "VOL_SHOCK",         2.0,   // 波动率翻倍
            "FX_USD_CNY",        0.05   // 美元升值 5%
        ),
        "COVID_2020_03", Map.of(
            "EQUITY_RETURN",    -0.34,
            "CREDIT_SPREAD_BPS", 300.0,
            "VOL_SHOCK",         3.0,
            "FX_USD_CNY",        0.02
        ),
        "CHINA_CIRCUIT_2016", Map.of(
            "EQUITY_RETURN",    -0.20,
            "CREDIT_SPREAD_BPS", 100.0,
            "VOL_SHOCK",         1.5,
            "FX_USD_CNY",       -0.02  // 人民币贬值
        )
    );

    public StressTestReport runAll(Portfolio portfolio) {
        Map<String, BigDecimal> results = new LinkedHashMap<>();

        for (Map.Entry<String, Map<String, Double>> entry : HISTORICAL_SCENARIOS.entrySet()) {
            BigDecimal pnl = applyScenario(portfolio, entry.getValue());
            results.put(entry.getKey(), pnl);
        }

        // 还要跑自定义情景（反向测试：最差情景在哪里）
        BigDecimal worstCase = findWorstScenario(portfolio);
        results.put("WORST_CASE_SEARCH", worstCase);

        return new StressTestReport(portfolio.getId(), results, Instant.now());
    }

    private BigDecimal applyScenario(Portfolio portfolio, Map<String, Double> shocks) {
        BigDecimal totalPnL = BigDecimal.ZERO;

        for (Position pos : portfolio.getPositions()) {
            BigDecimal positionPnL;

            if (pos.isEquity()) {
                double equityShock = shocks.getOrDefault("EQUITY_RETURN", 0.0);
                // 叠加 Beta 效应：高 Beta 股票跌得更多
                double beta = betaCache.getOrDefault(pos.getSymbol(), 1.0);
                double stockShock = equityShock * beta;
                positionPnL = pos.getMarketValue().multiply(BigDecimal.valueOf(stockShock));

            } else if (pos.isOption()) {
                // 期权使用 Full Revaluation（完整重估价），比 Greeks 近似更准确
                double newUnderlying = pos.getUnderlyingPrice() *
                    (1 + shocks.getOrDefault("EQUITY_RETURN", 0.0));
                double newVol = pos.getImpliedVol() *
                    shocks.getOrDefault("VOL_SHOCK", 1.0);
                BigDecimal newValue = optionPricer.price(pos, newUnderlying, newVol);
                positionPnL = newValue.subtract(pos.getMarketValue());

            } else {
                positionPnL = BigDecimal.ZERO;
            }

            totalPnL = totalPnL.add(positionPnL);
        }

        return totalPnL;
    }
}
```

### 反向压力测试（Reverse Stress Test）

正向压力测试：给定情景，计算损失。  
反向压力测试：给定损失阈值，找出会导致该损失的情景。

```python
from scipy.optimize import minimize
import numpy as np

def reverse_stress_test(portfolio, loss_threshold):
    """
    找出导致组合亏损 loss_threshold 的最小扰动情景
    """
    # 当前市场状态
    current_state = get_current_market_state()

    def portfolio_loss(market_shock):
        """给定市场冲击向量，返回组合损失"""
        shocked_market = current_state + market_shock
        return -evaluate_portfolio(portfolio, shocked_market)  # 负号因为我们要最小化

    def constraint_loss(market_shock):
        """约束：损失必须达到阈值"""
        return -portfolio_loss(market_shock) - loss_threshold

    # 找出使损失 = loss_threshold 的最小范数扰动（最"可能"的不利情景）
    result = minimize(
        fun=lambda x: np.linalg.norm(x),      # 最小化扰动大小
        x0=np.zeros(len(current_state)),
        constraints={'type': 'ineq', 'fun': constraint_loss},
        method='SLSQP'
    )

    worst_scenario = current_state + result.x
    return {
        'market_state': worst_scenario,
        'description': interpret_scenario(result.x),
        'probability_estimate': estimate_probability(result.x)
    }
```

---

## 七、监管资本计算

银行和大型金融机构需要按监管要求持有足够的风险资本：

### 巴塞尔协议三（Basel III）框架

```
市场风险资本要求 = max(VaR_t-1, k × VaR_60day_avg) + 压力 VaR

k：监管乘数（通常 3，根据历史 VaR 超越次数调整）
  VaR 超越次数 ≤ 4：k = 3（绿区）
  VaR 超越次数 5-9：k = 3.4-3.85（黄区，被罚款）
  VaR 超越次数 ≥ 10：k = 4（红区，重大监管问题）

工程意义：
  系统需要每日计算并留存 VaR 历史记录
  需要追踪"VaR 超越"事件（实际损失 > VaR 的天数）
  向监管机构定期报告
```

---

## 八、风控系统的运维

### 限额变更的工作流

```
业务请求提高某账户限额
        │
        ▼
风控部门审批（需要理由和签字）
        │
        ▼
合规部门审批（检查是否违反监管规定）
        │
        ▼
风控系统热更新（不需要重启，立即生效）
        │
        ▼
审计日志记录（谁批的、为什么批、何时生效）
        │
        ▼
定期复核（每季度审查所有限额是否仍然合理）
```

### 风控系统的降级策略

风控系统出故障时，业务不能完全停止，需要定义降级方案：

```java
public RiskCheckResult checkWithFallback(OrderRequest order) {
    try {
        // 正常路径：完整风控检查，超时 500µs
        return riskEngine.check(order);

    } catch (TimeoutException e) {
        // 降级：只执行最关键的检查（账户状态 + 单笔限额），跳过复杂计算
        metrics.increment("risk_check_degraded");
        log.warn("Risk check timeout, using degraded mode for order {}", order.getId());
        return degradedRiskCheck(order);

    } catch (Exception e) {
        // 严重故障：取决于业务方针
        // 方案A（保守）：拒绝所有订单，等风控恢复
        // 方案B（激进）：放行，事后对账
        // 通常金融系统选择方案A
        alertService.critical("RISK_ENGINE_DOWN", e.getMessage());
        return RiskCheckResult.reject("RISK_ENGINE_UNAVAILABLE");
    }
}

private RiskCheckResult degradedRiskCheck(OrderRequest order) {
    // 只做最基础的检查
    if (!accountService.isActive(order.getAccountId())) {
        return RiskCheckResult.reject("ACCOUNT_INACTIVE");
    }
    if (order.getQty().multiply(order.getPrice())
            .compareTo(ABSOLUTE_HARD_LIMIT) > 0) {
        return RiskCheckResult.reject("EXCEEDS_HARD_LIMIT");
    }
    return RiskCheckResult.pass();
}
```

---

## 本节小结

| 能力层次 | 具体内容 |
|---------|---------|
| 量化风险 | 因子模型 VaR，EWMA 协方差，实时 Greeks 监控 |
| 规则引擎 | 动态规则加载，Groovy 脚本，热更新 |
| 压力测试 | 历史情景，反向压力测试，监管资本计算 |
| 系统工程 | 降级策略，限额变更工作流，审计日志 |
| 业务价值 | 能量化"风控系统防止了多少潜在损失" |

**下一节**：[Phase 4.5 清结算与后台方向](./phase4-05-settlement-deep.md)
