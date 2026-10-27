# Phase 2.3 清算与结算（Clearing & Settlement）

> 目标：理解交易成交后的资金和证券流转过程，这是金融后台系统的核心。

---

## 一、为什么清算和结算是两件事

很多人把这两个概念混用，但它们是不同的阶段：

| 阶段 | 英文 | 发生时间 | 做什么 |
|------|------|---------|--------|
| 交易（Trade） | Trade Execution | T 日 | 买卖双方撮合成交，确定价格和数量 |
| 清算（Clearing） | Clearing | T 到 T+N | 计算买卖双方各自应收/应付多少钱和证券 |
| 结算（Settlement） | Settlement | T+N 日 | 真正的钱和证券完成划转 |

**类比**：
- 交易 = 你在超市选好商品，去收银台结账
- 清算 = 收银员算出你该付多少钱，打印小票
- 结算 = 你真正掏钱，店员把商品给你

---

## 二、清算流程详解

### 逐笔清算 vs 净额清算

**逐笔清算（Gross Settlement）**：每笔交易单独结算。

```
A 买入 AAPL 100 股 @ 150  →  A 付 15000 元，收 100 股
B 买入 AAPL 200 股 @ 150  →  B 付 30000 元，收 200 股
```

- 优点：简单直观，风险隔离
- 缺点：资金占用大，效率低

**净额清算（Net Settlement / Netting）**：同一日所有交易轧差后，只结算净额。

```
A 买入 AAPL 100 股 @ 150（应付 15000 元）
A 卖出 AAPL 60 股  @ 152（应收 9120 元）

净额清算：A 净买入 40 股，净付款 15000 - 9120 = 5880 元
```

净额清算大幅降低资金和证券的流转量，是现代清算所的标准做法。

### 多边净额清算（Multilateral Netting）

中央对手方（CCP）介入后，所有参与方只和 CCP 结算净额：

```
原始交易关系：
A ──卖50股──► B
B ──卖80股──► C
C ──卖30股──► A

经过 CCP 多边轧差：
A 净买入 20 股（30-50= -20，即卖出 20 股） ← 此处以实际净头寸为准
B 净卖出 30 股
C 净买入 50 股

实际只需三笔结算，而不是原来的三笔，且金额更小
```

### 清算的后端实现思路

```java
// 日终净额清算计算
public Map<String, NetPosition> calculateNetPositions(
        List<Trade> todayTrades,
        String settlementDate) {

    // Key: accountId + ":" + symbol
    Map<String, BigDecimal> netQtyMap = new HashMap<>();
    Map<String, BigDecimal> netAmountMap = new HashMap<>();

    for (Trade trade : todayTrades) {
        String key = trade.getAccountId() + ":" + trade.getSymbol();

        // 买入：证券+，资金-
        if (trade.getSide() == Side.BUY) {
            netQtyMap.merge(key, trade.getQty(), BigDecimal::add);
            netAmountMap.merge(key,
                trade.getQty().multiply(trade.getPrice()).negate(),
                BigDecimal::add);
        } else {
            // 卖出：证券-，资金+
            netQtyMap.merge(key, trade.getQty().negate(), BigDecimal::add);
            netAmountMap.merge(key,
                trade.getQty().multiply(trade.getPrice()),
                BigDecimal::add);
        }
    }

    // 构建净头寸结果
    Map<String, NetPosition> result = new HashMap<>();
    netQtyMap.forEach((key, qty) -> {
        result.put(key, new NetPosition(key, qty, netAmountMap.get(key), settlementDate));
    });
    return result;
}
```

---

## 三、结算流程详解

### T+N 规则

不同市场的结算周期不同：

| 市场 | 规则 | 说明 |
|------|------|------|
| A 股（中国） | T+1 | 股票 T+1 结算，资金 T+0 可用 |
| 美股 | T+1（2024年起） | 2024年5月前是 T+2 |
| 欧洲股票 | T+2 | 欧盟标准 |
| 外汇（即期） | T+2 | 大多数货币对 |
| 外汇（美加元） | T+1 | 因地理相近 |
| 国债（中国） | T+0 | 当日结算 |

**T+N 对后端系统的影响**：
- 成交后资金/证券并非立即可用
- 系统需要区分"可用余额"和"结算中余额"
- 需要维护 Settlement Calendar（排除非工作日）

```java
// 计算结算日（需考虑节假日）
public LocalDate calculateSettlementDate(LocalDate tradeDate, String market) {
    int settlementDays = getSettlementDays(market);  // T+1=1, T+2=2
    LocalDate settlementDate = tradeDate;

    int daysAdded = 0;
    while (daysAdded < settlementDays) {
        settlementDate = settlementDate.plusDays(1);
        if (isBusinessDay(settlementDate, market)) {
            daysAdded++;
        }
    }
    return settlementDate;
}
```

### DVP（货银对付，Delivery vs Payment）

DVP 是结算安全的核心机制：**证券交付和资金支付同步发生，消除其中一方违约的风险。**

```
没有 DVP 的风险：
  A 先把股票给 B → B 拿到股票后，可以不付钱（赖账）

DVP 机制：
  托管行同时操作：
    A 账户: 证券 -100 股，资金 +15000 元
    B 账户: 证券 +100 股，资金 -15000 元
  两步要么同时成功，要么都不执行（原子操作）
```

### 结算失败（Settlement Fail）

当一方无法履约时，结算失败：
- **证券交付失败（Fail to Deliver）**：卖方没有足够的证券
- **资金支付失败（Fail to Receive）**：买方没有足够的资金

处理机制：
- 推迟结算（Roll over to next day）
- 强制买入（Buy-in）：托管行代为购入证券，费用由违约方承担
- 罚款机制（某些市场对结算失败收取罚金）

---

## 四、中央对手方（CCP）

### CCP 的作用

CCP 介入原始买卖双方的交易，成为"每个买方的卖方，每个卖方的买方"，这个过程叫**合约替代（Novation）**：

```
原始交易：
A ←──── 交易 ────► B

CCP 介入后：
A ←── 新合约 ──► CCP ◄── 新合约 ──► B
```

好处：
- A 和 B 不再需要了解对方的信用状况
- 即使 B 违约，A 仍能从 CCP 处完成结算
- 风险集中管理，效率更高

### 保证金制度（Margin）

CCP 要求所有参与方缴纳保证金，分两类：

**初始保证金（Initial Margin）**：
- 开仓时缴纳，覆盖潜在市场风险
- 基于持仓规模和市场波动率计算
- 通常覆盖 1-2 天的极端价格变动

**变动保证金（Variation Margin）**：
- 每日盯市（Mark to Market）后，根据浮动盈亏调整
- 亏损方每日补缴，盈利方每日收到

```
示例：
周一：A 买入期货，初始保证金 10 万元
周一收盘：期货涨，A 浮盈 1 万元 → A 收到变动保证金 1 万元
周二收盘：期货跌，A 浮亏 3 万元 → A 需补缴变动保证金 3 万元
                                   （否则 CCP 强制平仓）
```

### 保证金追缴（Margin Call）

当变动保证金不足时，CCP 发出保证金追缴通知：

```java
// 每日盯市和保证金计算
public void dailyMarkToMarket(String accountId, LocalDate date) {
    List<Position> positions = positionRepository.getPositions(accountId);
    BigDecimal totalVariationMargin = BigDecimal.ZERO;

    for (Position pos : positions) {
        BigDecimal currentPrice = marketDataService.getClosingPrice(pos.getSymbol(), date);
        BigDecimal previousPrice = marketDataService.getClosingPrice(pos.getSymbol(), date.minusDays(1));

        BigDecimal priceDiff = currentPrice.subtract(previousPrice);
        BigDecimal variationMargin = priceDiff.multiply(pos.getNetQty());
        totalVariationMargin = totalVariationMargin.add(variationMargin);

        // 更新持仓成本价（盯市后重置）
        pos.setAverageCost(currentPrice);
    }

    // 结算变动保证金
    if (totalVariationMargin.compareTo(ZERO) > 0) {
        // 盈利，CCP 支付给账户
        creditMarginAccount(accountId, totalVariationMargin);
    } else {
        // 亏损，账户需支付给 CCP
        BigDecimal required = totalVariationMargin.negate();
        if (getMarginBalance(accountId).compareTo(required) < 0) {
            issueMarginCall(accountId, required);  // 发出追缴通知
        } else {
            debitMarginAccount(accountId, required);
        }
    }
}
```

---

## 五、托管（Custody）

### 托管的职责

托管行（Custodian Bank）负责：
- 安全保管客户的证券和资金
- 维护持仓记录（Securities Holding）
- 处理企业行为（Corporate Actions）
- 提供结算服务

### 企业行为（Corporate Actions）处理

这是托管系统中最复杂的部分之一。

**现金分红（Cash Dividend）**：
```
股权登记日（Record Date）：登记持有股东名单
除息日（Ex-Dividend Date）：当日买入不再享有本次分红
派息日（Payment Date）：实际发放现金

后端处理：
1. 从交易所接收分红通告（Dividend Announcement）
2. 以股权登记日的持仓为基准，计算每位持有人应得金额
3. 派息日将现金划入各账户
4. 记录企业行为历史，供对账和税务使用
```

**股票拆分（Stock Split）**：
```
2:1 拆分（1 股拆为 2 股）：
- 持仓数量 × 2
- 持仓成本价 ÷ 2
- 所有挂单价格和数量需相应调整

后端处理：
1. 接收交易所的拆分通告
2. 批量更新所有持仓记录
3. 更新历史成本记录（影响税务计算）
4. 通知 OMS 调整未成交挂单
```

**配股（Rights Issue）**：
```
公司给现有股东以优惠价认购新股的权利

后端处理：
1. 确认股东是否行使认购权（有时限）
2. 收取认购资金
3. 分配新股
4. 未行使的权利可能需要出售（取决于条款）
```

---

## 六、对账（Reconciliation）

清结算系统的核心质量保证机制。

### 对账的层次

```
内部对账（Internal Reconciliation）
├── OMS 持仓 vs 风控系统持仓（应实时一致）
├── 交易台持仓 vs 托管持仓（应每日一致）
└── 资金系统 vs 会计系统（应每日一致）

外部对账（External Reconciliation）
├── 我方持仓记录 vs 托管行报告
├── 我方成交记录 vs 交易所成交记录
└── 我方资金 vs 银行账单
```

### 对账差异处理

```java
public List<ReconciliationBreak> reconcile(
        List<Position> internalPositions,
        List<Position> custodianPositions) {

    List<ReconciliationBreak> breaks = new ArrayList<>();

    Map<String, Position> custodianMap = custodianPositions.stream()
        .collect(toMap(p -> p.getSymbol(), p -> p));

    for (Position internal : internalPositions) {
        Position custodian = custodianMap.get(internal.getSymbol());

        if (custodian == null) {
            breaks.add(new ReconciliationBreak(
                internal.getSymbol(),
                BreakType.MISSING_IN_CUSTODIAN,
                internal.getNetQty(),
                BigDecimal.ZERO
            ));
        } else if (internal.getNetQty().compareTo(custodian.getNetQty()) != 0) {
            breaks.add(new ReconciliationBreak(
                internal.getSymbol(),
                BreakType.QUANTITY_MISMATCH,
                internal.getNetQty(),
                custodian.getNetQty()
            ));
        }
    }

    return breaks;
}
```

**对账差异的常见原因**：
- 成交回报延迟（消息还在路上）
- 企业行为处理时间差
- 结算失败未及时处理
- 系统 bug 导致的记录不一致

---

## 七、资金账户模型

金融系统中资金账户远比银行账户复杂：

```
账户余额的构成：
┌─────────────────────────────────────┐
│  总资产（Total Assets）              │
│  ├── 现金余额（Cash Balance）        │
│  │    ├── 可用余额（Available）      │  ← 可以立即使用
│  │    ├── 冻结余额（Frozen）         │  ← 已下单但未成交，冻结中
│  │    └── 结算中（Pending Settlement）│  ← 已成交但未到结算日
│  │
│  └── 证券持仓市值（Securities Value）
│
└─────────────────────────────────────┘
```

```java
// 下单时冻结资金
public void freezeFundsForOrder(String accountId, BigDecimal amount) {
    Account account = accountRepository.findById(accountId);

    if (account.getAvailableBalance().compareTo(amount) < 0) {
        throw new InsufficientFundsException("Available: " + account.getAvailableBalance());
    }

    // 原子操作：可用余额减少，冻结余额增加
    account.setAvailableBalance(account.getAvailableBalance().subtract(amount));
    account.setFrozenBalance(account.getFrozenBalance().add(amount));
    accountRepository.save(account);
}

// 成交后：解冻 → 转入结算中
public void handleFill(String accountId, BigDecimal filledAmount) {
    Account account = accountRepository.findById(accountId);

    account.setFrozenBalance(account.getFrozenBalance().subtract(filledAmount));
    account.setPendingSettlement(account.getPendingSettlement().add(filledAmount));
    accountRepository.save(account);
}

// 结算日：结算中 → 完成
public void completeSe ttlement(String accountId, BigDecimal amount) {
    Account account = accountRepository.findById(accountId);
    account.setPendingSettlement(account.getPendingSettlement().subtract(amount));
    // 已从托管行收到实际资金，余额在托管行报告中更新
    accountRepository.save(account);
}
```

---

## 本节小结

| 概念 | 核心要点 |
|------|---------|
| 清算 vs 结算 | 清算=算账，结算=真正的钱券划转 |
| 净额清算 | 轧差后只结算净额，大幅降低资金占用 |
| T+N 规则 | A 股 T+1，美股 T+1，外汇 T+2 |
| DVP | 货银对付，证券与资金同步交割，消除违约风险 |
| CCP | 中央对手方，介入所有交易，隔离信用风险 |
| 保证金 | 初始保证金+变动保证金，每日盯市 |
| 托管 | 保管证券，处理企业行为（分红/拆股/配股） |
| 对账 | 内部对账+外部对账，差异必须有原因 |

**下一节**：[Phase 2.4 合规与监管](./phase2-04-compliance.md)
