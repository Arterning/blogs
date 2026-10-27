# Phase 4.3 深度方向：量化与算法交易

> 适合人群：对数学、统计感兴趣，想做量化研究基础设施、回测框架、因子平台的工程师。

---

## 一、量化交易的技术栈全景

量化交易不只是"写策略"，背后需要完整的工程支撑体系：

```
研究端（Research）
├── 数据获取与清洗（行情、财务、另类数据）
├── 因子研究平台（因子计算、有效性验证）
├── 回测框架（策略历史表现模拟）
└── 风险模型（组合风险分解）

执行端（Production）
├── 信号生成（因子 → 目标仓位）
├── 组合优化（目标仓位 → 实际仓位，考虑成本和约束）
├── 执行算法（实际仓位 → 订单，最小化市场冲击）
└── 绩效归因（收益从哪里来？）
```

后端工程师在量化领域的核心价值：**让研究员的想法从笔记本能跑到生产环境**，并且跑得又快又可靠。

---

## 二、数据基础设施

### 数据质量是一切的基础

坏数据比没有数据更危险：策略在错误数据上回测结果很好，但在真实数据上会亏损。

**常见数据问题及处理**：

**前视偏差（Look-Ahead Bias）**：
```
最常见的回测错误——使用了在当时不可能知道的数据

错误示例：
  在 2020年1月 使用了"2020年全年财务数据"来计算因子
  → 这些数据要到 2021年3月 才会公布

正确做法：
  每个数据项必须打上"可知时间（as-of-date）"戳
  回测时，只使用在该时间点之前已经"可知"的数据
```

**幸存者偏差（Survivorship Bias）**：
```
回测数据库中只有"活着的"公司（历史上退市的公司被排除了）

影响：
  退市公司通常是表现差的公司，排除它们会高估策略表现

解决：
  使用包含退市公司的"全量历史成分"数据
  中国：使用包含 ST、退市股的完整 A 股历史数据
```

**数据漂移（Data Drift）**：
```
同一指标的计算口径随时间改变

例：某数据供应商在 2018 年改变了"净利润"的统计口径
  → 2018 年前后的数据不具有可比性
  → 因子在这个时间点前后表现突变

解决：
  记录数据供应商的修订历史
  使用"点对点"（point-in-time）数据
```

### 数据存储架构

```
原始数据层（Raw Data）
  └── 从交易所、数据供应商拉取的原始数据
      按来源和日期分目录存储，永不修改
      格式：Parquet（列存储，压缩比高）

清洗数据层（Clean Data）
  └── 原始数据经过清洗、对齐、填充后的版本
      统一时区（UTC）、统一精度、统一字段命名

特征数据层（Feature Data）
  └── 从清洗数据计算得到的因子数据
      时间序列形式，每个截面日期对应全市场因子值

对齐数据层（Aligned Data）
  └── 按策略频率对齐的数据
      日频、周频、月频，方便回测直接使用
```

```python
# 使用 Parquet + DuckDB 做高效的因子数据查询
import duckdb
import pandas as pd

# DuckDB 可以直接查询 Parquet 文件，无需加载到内存
conn = duckdb.connect()

# 查询特定日期范围的因子数据
factor_data = conn.execute("""
    SELECT
        date,
        symbol,
        pe_ttm,
        pb,
        momentum_12m,
        volatility_20d
    FROM 'data/factors/*.parquet'
    WHERE date BETWEEN '2020-01-01' AND '2023-12-31'
      AND market = 'A_SHARE'
    ORDER BY date, symbol
""").df()
```

---

## 三、因子研究

### 什么是因子

因子是能够解释股票收益差异的特征变量。

```
直觉：
  如果低估值（低 PE）的股票长期来看表现好于高 PE 的股票，
  那么 "PE" 就是一个有效的因子

五大经典因子（Fama-French 因子模型）：
  市场因子（Beta）：持有股票相对无风险收益的超额回报
  规模因子（SMB）：小盘股相对大盘股的超额回报
  价值因子（HML）：高账面市值比相对低账面市值比的超额回报
  盈利因子（RMW）：高盈利能力相对低盈利能力的超额回报
  投资因子（CMA）：低投资增速相对高投资增速的超额回报
```

### 因子有效性验证

```python
import pandas as pd
import numpy as np
from scipy import stats

def evaluate_factor(factor_df: pd.DataFrame, returns_df: pd.DataFrame) -> dict:
    """
    评估因子有效性
    factor_df: 每行是日期，每列是股票，值是因子值
    returns_df: 同结构，值是未来 N 日收益率
    """
    results = {}

    # 1. IC（Information Coefficient）：因子与未来收益的相关性
    ic_series = []
    for date in factor_df.index:
        factor_cross = factor_df.loc[date].dropna()
        return_cross = returns_df.loc[date].reindex(factor_cross.index).dropna()

        common_stocks = factor_cross.index.intersection(return_cross.index)
        if len(common_stocks) < 30:
            continue

        # Rank IC：使用排名相关系数（更稳健，减少极值影响）
        ic = stats.spearmanr(
            factor_cross[common_stocks],
            return_cross[common_stocks]
        ).correlation
        ic_series.append(ic)

    ic_series = pd.Series(ic_series)

    results['IC均值'] = ic_series.mean()
    results['IC标准差'] = ic_series.std()
    results['ICIR'] = ic_series.mean() / ic_series.std()  # 越高越稳定
    results['IC胜率'] = (ic_series > 0).mean()  # IC 为正的比例

    # 2. 分组回测：因子排名分 5 组，看各组收益是否单调
    quantile_returns = []
    for date in factor_df.index:
        factor_cross = factor_df.loc[date].dropna()
        return_cross = returns_df.loc[date].reindex(factor_cross.index).dropna()

        common = factor_cross.index.intersection(return_cross.index)
        df = pd.DataFrame({'factor': factor_cross[common], 'return': return_cross[common]})
        df['quantile'] = pd.qcut(df['factor'], 5, labels=[1,2,3,4,5])
        quantile_returns.append(df.groupby('quantile')['return'].mean())

    quantile_df = pd.DataFrame(quantile_returns)
    results['分组平均收益'] = quantile_df.mean().to_dict()
    results['多空收益'] = quantile_df[5].mean() - quantile_df[1].mean()

    return results

# 有效因子的标准（业内经验）：
# IC 均值 > 0.03（3%）
# ICIR > 0.5
# IC 胜率 > 55%
# 分组收益单调（第5组 > 第4组 > ... > 第1组）
```

### 因子衰减分析

```python
def analyze_factor_decay(factor_df, returns_df, max_horizon=20):
    """分析因子对未来 N 日收益的预测力随时间的衰减"""
    ic_by_horizon = {}

    for horizon in range(1, max_horizon + 1):
        # 计算 horizon 日后的收益
        forward_returns = returns_df.shift(-horizon)
        ic_mean = calculate_ic(factor_df, forward_returns)
        ic_by_horizon[horizon] = ic_mean

    # 衰减快 → 适合高频交易
    # 衰减慢 → 适合低频/中频交易
    return pd.Series(ic_by_horizon)
```

---

## 四、回测框架设计

### 回测的本质难题

```
回测想解决的问题：
  "如果我在历史上运行这个策略，我能赚多少钱？"

回测无法解决的问题：
  1. 市场冲击：你的大单会移动价格，回测通常假设以收盘价成交
  2. 实盘 vs 回测的差异：真实的成交时序、延迟、失败率
  3. 数据 snooping：反复测试直到找到"有效"的参数，实际上是过拟合

诚实的回测系统应该：
  ✓ 模拟真实的成交滑点（slippage）
  ✓ 模拟真实的交易成本（佣金、印花税、冲击成本）
  ✓ 使用 point-in-time 数据，消除前视偏差
  ✓ 包含退市股票数据，消除幸存者偏差
```

### 事件驱动回测框架

```python
class BacktestEngine:
    """事件驱动回测引擎"""

    def __init__(self, start_date, end_date, initial_capital):
        self.portfolio = Portfolio(initial_capital)
        self.data_handler = DataHandler()  # 负责提供数据（严格按时序）
        self.event_queue = queue.Queue()

    def run(self, strategy):
        # 主循环：按时间顺序处理事件
        for date in self.trading_dates:
            # 1. 更新行情数据（触发 MarketEvent）
            new_data = self.data_handler.get_data(date)
            self.event_queue.put(MarketEvent(date, new_data))

            # 处理队列中的所有事件
            while not self.event_queue.empty():
                event = self.event_queue.get()

                if isinstance(event, MarketEvent):
                    # 策略接收行情，生成交易信号
                    signal = strategy.on_market_data(event)
                    if signal:
                        self.event_queue.put(signal)

                elif isinstance(event, SignalEvent):
                    # 组合优化：信号 → 目标持仓 → 订单
                    orders = self.portfolio.generate_orders(event)
                    for order in orders:
                        self.event_queue.put(order)

                elif isinstance(event, OrderEvent):
                    # 模拟成交（加入滑点和成本模型）
                    fill = self.simulate_fill(event, new_data)
                    if fill:
                        self.event_queue.put(fill)

                elif isinstance(event, FillEvent):
                    # 更新持仓和资金
                    self.portfolio.update_on_fill(fill)

    def simulate_fill(self, order, market_data):
        """成交模拟：加入市场冲击和滑点"""
        price = market_data.get_price(order.symbol, order.side)

        # 市场冲击模型：订单量相对于市场成交量的比例越大，冲击越大
        market_volume = market_data.get_volume(order.symbol)
        participation_rate = order.qty / market_volume
        # 简单线性冲击模型（实际更复杂）
        impact_bps = participation_rate * 50  # 参与率每增加 1%，冲击 0.5bp

        slippage = price * impact_bps / 10000
        fill_price = price + slippage if order.side == 'BUY' else price - slippage

        # 交易成本（A股：佣金 0.03% + 卖出印花税 0.1% + 过户费）
        commission = fill_price * order.qty * 0.0003
        stamp_duty = fill_price * order.qty * 0.001 if order.side == 'SELL' else 0

        return FillEvent(order, fill_price, commission + stamp_duty)
```

### 回测结果评估

```python
def evaluate_backtest(portfolio_history: pd.DataFrame) -> dict:
    returns = portfolio_history['net_value'].pct_change().dropna()
    annual_factor = 252  # 交易日数

    total_return = (portfolio_history['net_value'].iloc[-1] /
                    portfolio_history['net_value'].iloc[0]) - 1
    annual_return = (1 + total_return) ** (annual_factor / len(returns)) - 1
    annual_vol = returns.std() * np.sqrt(annual_factor)
    sharpe = annual_return / annual_vol  # 假设无风险利率 = 0，简化

    # 最大回撤
    rolling_max = portfolio_history['net_value'].cummax()
    drawdown = (portfolio_history['net_value'] - rolling_max) / rolling_max
    max_drawdown = drawdown.min()

    # Calmar Ratio：年化收益 / 最大回撤（越高越好）
    calmar = annual_return / abs(max_drawdown)

    return {
        '总收益率': f'{total_return:.2%}',
        '年化收益率': f'{annual_return:.2%}',
        '年化波动率': f'{annual_vol:.2%}',
        '夏普比率': f'{sharpe:.2f}',
        '最大回撤': f'{max_drawdown:.2%}',
        'Calmar比率': f'{calmar:.2f}',
        '胜率': f'{(returns > 0).mean():.2%}',
    }

# 业界参考标准（仅供参考，因策略类型差异很大）：
# 夏普比率 > 1.0：可接受
# 夏普比率 > 2.0：优秀
# 最大回撤 < 15%：稳健
```

---

## 五、组合优化

研究得到因子之后，还需要把因子信号转化为实际持仓，这一步叫组合优化（Portfolio Optimization）。

### 均值-方差优化（Markowitz）

```python
import cvxpy as cp
import numpy as np

def optimize_portfolio(expected_returns, cov_matrix, constraints):
    """
    均值方差优化
    目标：最大化风险调整后收益（最大夏普）
    """
    n_assets = len(expected_returns)
    weights = cp.Variable(n_assets)

    # 目标：最大化预期收益 - λ × 风险
    risk_aversion = 1.0  # 风险厌恶系数，越大越保守
    portfolio_return = expected_returns @ weights
    portfolio_risk = cp.quad_form(weights, cov_matrix)

    objective = cp.Maximize(portfolio_return - risk_aversion * portfolio_risk)

    # 约束条件
    constraints_list = [
        cp.sum(weights) == 1,              # 满仓
        weights >= 0,                       # 不允许做空（A股限制）
        weights <= 0.1,                     # 单股不超过 10%（分散化）
    ]

    # 换手率约束（避免过度交易产生高成本）
    if constraints.get('max_turnover') and constraints.get('current_weights') is not None:
        turnover = cp.sum(cp.abs(weights - constraints['current_weights']))
        constraints_list.append(turnover <= constraints['max_turnover'])

    problem = cp.Problem(objective, constraints_list)
    problem.solve()

    return weights.value
```

### 风险因子模型（Barra 类模型）

```
Barra 模型把股票收益分解为：

股票收益 = Σ(因子暴露 × 因子收益) + 特异性收益

因子维度：
  行业因子：沪深300成分 → 哪个行业
  风格因子：价值、成长、规模、动量、质量、波动率
  宏观因子：利率敏感性、汇率敏感性

用途：
  1. 理解组合的风险来源（因子风险 vs 个股特质风险）
  2. 中性化：去掉不想要的因子暴露（如去掉行业偏差，只保留纯alpha因子）
  3. 归因：今天的收益哪些是因子带来的，哪些是选股带来的
```

---

## 六、量化系统的工程挑战

### 计算效率

因子计算需要每天对全市场（A 股约 5000 只）计算数百个因子：

```python
# 低效写法：每次循环都做 DataFrame 操作
results = []
for symbol in universe:
    df = get_price_data(symbol, lookback=252)
    momentum = df['close'].iloc[-1] / df['close'].iloc[0] - 1
    results.append({'symbol': symbol, 'momentum': momentum})

# 高效写法：向量化操作（快 100 倍以上）
price_matrix = get_all_prices(universe, lookback=252)  # shape: (252, 5000)
momentum = price_matrix.iloc[-1] / price_matrix.iloc[0] - 1  # 一行搞定
```

**技术选型**：
- **Pandas**：灵活，适合研究阶段
- **Polars**：Rust 实现，比 Pandas 快 5-10 倍，适合生产
- **NumPy/Numba**：数值计算加速
- **Dask/Ray**：分布式并行计算（全市场 + 长历史）

### 因子平台设计

```
研究员使用场景：
  "我想计算过去 5 年，全 A 股每天的 20 日动量因子，
   并与未来 5 日收益做相关性分析"

平台应该提供：
  1. 数据访问 API（屏蔽底层存储细节）
  2. 向量化因子计算框架（避免重复造轮子）
  3. 回测触发（一行代码从因子到回测结果）
  4. 因子库管理（版本控制、依赖追踪）
  5. 计算结果缓存（避免重复计算）
```

```python
# 理想的因子平台 API（设计参考）
from factor_platform import FactorEngine, universe

@factor_engine.register(
    name="momentum_20d",
    category="technical",
    frequency="daily"
)
def momentum_20d(prices: pd.DataFrame) -> pd.Series:
    """20日价格动量"""
    return prices['close'] / prices['close'].shift(20) - 1

# 使用因子
engine = FactorEngine()
factor_data = engine.compute(
    factor="momentum_20d",
    universe=universe.A_SHARE_MAIN_BOARD,
    start_date="2020-01-01",
    end_date="2023-12-31"
)

# 一键回测
backtest_result = engine.backtest(
    factor="momentum_20d",
    holding_period=5,  # 持有 5 日
    rebalance_freq="weekly"
)
```

---

## 七、从研究到生产：最后一公里

很多量化团队的研究结果无法稳定上线，原因在"研究环境"和"生产环境"之间的 Gap：

| 差异点 | 研究环境 | 生产环境 |
|--------|---------|---------|
| 数据获取 | 批量读取历史数据 | 实时流式数据 |
| 延迟要求 | 无要求 | 毫秒级 |
| 错误处理 | 抛异常看报错 | 必须有降级和告警 |
| 代码质量 | Jupyter Notebook | 工程化代码 |
| 监控 | 无 | 完整监控 |

**工程师的核心价值**：把研究员的 Jupyter Notebook 变成稳定运行的生产系统。

```
上线流程建议：
1. 研究员完成研究，出具"策略规格文档"
   （包含：信号计算逻辑、参数、换仓频率、风险约束）
   
2. 工程师审查文档，识别工程 Gap：
   - 哪些计算无法实时完成？
   - 哪些数据依赖不存在实时版本？
   - 哪些边界情况研究员没有考虑？
   
3. 构建生产就绪的因子计算服务：
   - 单元测试：生产代码与研究代码的输出是否一致？
   - 性能测试：开盘前 5 分钟内能否完成全量计算？
   - 回归测试：每次代码修改后，与基准结果对比

4. 纸盘运行（Paper Trading）：
   系统生成真实信号，但不真实下单，观察 1-4 周

5. 真实上线：从小仓位开始
```

---

## 本节小结

| 能力层次 | 具体内容 |
|---------|---------|
| 数据工程 | Point-in-time 数据管理，防前视偏差和幸存者偏差 |
| 因子研究 | IC/ICIR 评估，分组回测，因子衰减分析 |
| 回测框架 | 事件驱动架构，滑点和成本模型，避免常见偏差 |
| 组合优化 | 均值方差，Barra 风险模型，换手率约束 |
| 平台工程 | 向量化计算，因子库管理，研究到生产的 Pipeline |

**下一节**：[Phase 4.4 风控系统深度方向](./phase4-04-risk-deep.md)
