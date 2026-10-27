# Phase 4.5 深度方向：清结算与后台系统

> 适合人群：对数据准确性、流程自动化、系统韧性感兴趣，想在中后台方向深耕的工程师。

---

## 一、为什么后台系统比前台更难

外行看来，后台系统不如前台（交易、行情）"酷"。但实际上：

- 前台出 bug：交易失败，用户体验差，但通常可以重新下单
- 后台出 bug：资金或证券**永久**丢失，或触发监管处罚

后台系统的核心挑战：**如何保证在各种故障场景下，账目永远对得上。**

---

## 二、日终处理（End of Day Processing）

日终处理是金融后台最复杂的流程，发生在每个交易日收市后。

### 完整的日终流程

```
15:00 收市
    │
    ▼
15:00 - 16:00：数据收集
    ├── 从交易所下载当日全量成交数据
    ├── 从托管行接收日终持仓报告
    └── 从银行接收资金流水

16:00 - 18:00：清算处理
    ├── 计算净额（同一账户、同一标的的所有成交轧差）
    ├── 计算应收应付（每个账户的资金和证券净变动）
    └── 生成清算指令（发给清算机构）

18:00 - 20:00：内部对账
    ├── OMS 成交记录 vs 交易所成交记录（逐笔核对）
    ├── 内部持仓 vs 托管行持仓（全量比对）
    └── 内部资金 vs 银行账单（金额核对）

20:00 - 22:00：结算指令生成
    ├── 生成 T+1 的结算指令
    └── 发送给中登（证券结算）和银行（资金结算）

22:00 - 次日 9:00：报告生成
    ├── 客户对账单
    ├── 监管报告（交易报告、大额报告等）
    ├── 内部风控报告
    └── 财务报告（盈亏、资产负债）
```

### 日终处理的代码框架

```java
@Component
public class EodProcessor {

    // 日终流程是有状态的，需要幂等（可以重跑）
    @Transactional
    public EodResult process(LocalDate tradeDate) {
        EodStatus status = eodStatusRepo.getOrCreate(tradeDate);

        // 每个步骤都可以独立重试
        if (!status.isCompleted(EodStep.TRADE_IMPORT)) {
            importTrades(tradeDate);
            status.complete(EodStep.TRADE_IMPORT);
        }

        if (!status.isCompleted(EodStep.RECONCILE_TRADES)) {
            TradeReconciliationResult tradeRecon = reconcileTrades(tradeDate);
            if (tradeRecon.hasBreaks()) {
                // 有差异时阻塞流程，等人工处理
                alertService.critical("EOD_TRADE_RECON_BREAKS",
                    "Date: " + tradeDate + ", Breaks: " + tradeRecon.getBreaks().size());
                return EodResult.blocked(EodStep.RECONCILE_TRADES, tradeRecon.getBreaks());
            }
            status.complete(EodStep.RECONCILE_TRADES);
        }

        if (!status.isCompleted(EodStep.NETTING)) {
            performNetting(tradeDate);
            status.complete(EodStep.NETTING);
        }

        if (!status.isCompleted(EodStep.POSITION_SNAPSHOT)) {
            snapshotPositions(tradeDate);   // 保存日终持仓快照
            status.complete(EodStep.POSITION_SNAPSHOT);
        }

        if (!status.isCompleted(EodStep.MARK_TO_MARKET)) {
            markToMarket(tradeDate);        // 用收盘价更新所有持仓市值
            status.complete(EodStep.MARK_TO_MARKET);
        }

        if (!status.isCompleted(EodStep.SETTLEMENT_INSTRUCTIONS)) {
            generateSettlementInstructions(tradeDate);
            status.complete(EodStep.SETTLEMENT_INSTRUCTIONS);
        }

        if (!status.isCompleted(EodStep.REPORTS)) {
            generateReports(tradeDate);
            status.complete(EodStep.REPORTS);
        }

        return EodResult.success(tradeDate);
    }
}
```

---

## 三、多层次对账系统

### 对账层次设计

```
L1：实时对账（毫秒级）
    成交回报到达 → 立即比对 OMS 与风控系统的持仓是否一致
    差异阈值：0（任何差异都告警）
    目的：及时发现系统 bug，防止风险敞口计算错误

L2：日内对账（5-15 分钟级）
    定时任务 → 比对 OMS 持仓 vs 清算系统持仓
    差异阈值：可接受已知延迟（如尚未处理的成交回报）
    目的：发现系统间的同步延迟问题

L3：日终对账（T+0 当晚）
    交易所成交文件 vs 内部成交记录（逐笔）
    托管行持仓报告 vs 内部持仓（全量）
    银行资金流水 vs 内部资金账户
    目的：确认与外部机构的数据完全一致

L4：月度对账（T+月末）
    内部盈亏计算 vs 财务系统
    客户账户对账单 vs 客户确认
    目的：确认财务数据准确
```

### 高效的逐笔对账算法

日终对账需要对比两个来源的成交记录，记录数可能达到百万级：

```java
public class TradeReconciler {

    /**
     * 高效对账：两边数据都按同一个 key 排序，双指针扫描
     * 时间复杂度：O(N log N)（排序）而非 O(N²)（嵌套循环）
     */
    public ReconciliationResult reconcile(
            List<InternalTrade> internal,
            List<ExchangeTrade> external) {

        // 两边都按交易所成交编号（ExecID）排序
        internal.sort(Comparator.comparing(InternalTrade::getExchangeExecId));
        external.sort(Comparator.comparing(ExchangeTrade::getExecId));

        List<ReconciliationBreak> breaks = new ArrayList<>();
        int i = 0, j = 0;

        while (i < internal.size() && j < external.size()) {
            InternalTrade inTrade = internal.get(i);
            ExchangeTrade exTrade = external.get(j);

            int cmp = inTrade.getExchangeExecId().compareTo(exTrade.getExecId());

            if (cmp == 0) {
                // 找到匹配，检查字段是否一致
                validateFields(inTrade, exTrade, breaks);
                i++; j++;
            } else if (cmp < 0) {
                // 内部有，交易所没有（可能是内部系统 bug）
                breaks.add(ReconciliationBreak.missingExternal(inTrade));
                i++;
            } else {
                // 交易所有，内部没有（可能是成交回报丢失）
                breaks.add(ReconciliationBreak.missingInternal(exTrade));
                j++;
            }
        }

        // 处理剩余未匹配的记录
        while (i < internal.size()) {
            breaks.add(ReconciliationBreak.missingExternal(internal.get(i++)));
        }
        while (j < external.size()) {
            breaks.add(ReconciliationBreak.missingInternal(external.get(j++)));
        }

        return new ReconciliationResult(breaks);
    }

    private void validateFields(InternalTrade in, ExchangeTrade ex,
                                List<ReconciliationBreak> breaks) {
        // 价格比对（允许浮点误差）
        if (in.getPrice().subtract(ex.getPrice()).abs()
                .compareTo(PRICE_TOLERANCE) > 0) {
            breaks.add(ReconciliationBreak.priceMismatch(in, ex));
        }

        // 数量比对（必须完全一致）
        if (in.getQty().compareTo(ex.getQty()) != 0) {
            breaks.add(ReconciliationBreak.qtyMismatch(in, ex));
        }

        // 买卖方向
        if (in.getSide() != ex.getSide()) {
            breaks.add(ReconciliationBreak.sideMismatch(in, ex));
        }
    }
}
```

### 差异自动分类与处理

```java
public class BreakAnalyzer {

    public List<AnalyzedBreak> analyze(List<ReconciliationBreak> breaks, LocalDate date) {
        return breaks.stream().map(breakItem -> {
            BreakCategory category = categorize(breakItem, date);
            return new AnalyzedBreak(breakItem, category, suggestAction(category));
        }).collect(toList());
    }

    private BreakCategory categorize(ReconciliationBreak b, LocalDate date) {
        // T+1 结算延迟：成交日期是今天，但外部系统明天才入账（预期差异）
        if (b.getType() == MISSING_EXTERNAL &&
            b.getTradeDate().equals(date) &&
            b.getSettlementDate().isAfter(date)) {
            return BreakCategory.KNOWN_SETTLEMENT_DELAY;
        }

        // 已知的系统对账窗口期（比如外汇 T+2，今天的成交两天后才在银行出现）
        if (b.getAssetClass() == FX && daysBetween(date, b.getSettlementDate()) <= 2) {
            return BreakCategory.FX_SETTLEMENT_WINDOW;
        }

        // 成交回报丢失（需要立即调查）
        if (b.getType() == MISSING_INTERNAL && b.getTradeDate().equals(date)) {
            return BreakCategory.MISSING_EXECUTION_REPORT;
        }

        return BreakCategory.UNKNOWN; // 需要人工处理
    }

    private String suggestAction(BreakCategory category) {
        return switch (category) {
            case KNOWN_SETTLEMENT_DELAY -> "AUTO_RESOLVE_TOMORROW";
            case FX_SETTLEMENT_WINDOW   -> "AUTO_RESOLVE_T_PLUS_2";
            case MISSING_EXECUTION_REPORT -> "URGENT_INVESTIGATE";
            case UNKNOWN               -> "MANUAL_REVIEW";
        };
    }
}
```

---

## 四、企业行为处理系统

企业行为（Corporate Actions）是后台系统中最容易出错的部分，因为种类繁多，每种都有细节陷阱。

### 现金分红的完整流程

```
时间线（以 A 股为例）：
    T-5 日：公司公告分红方案（每 10 股分 2 元）
    T 日（股权登记日）：此日持仓的股东有权获得分红
    T+1 日（除权除息日）：
      ✓ 股价开盘前按分红比例调整（减去分红金额）
      ✓ 新买入的投资者不再享有本次分红
    T+N 日（派息日）：现金实际到账（A股通常 T+4 左右）
```

```java
@Service
public class DividendProcessor {

    @Transactional
    public void processDividend(DividendEvent event) {
        // 1. 以股权登记日收盘时的持仓为基础（快照，不用实时持仓）
        LocalDate recordDate = event.getRecordDate();
        List<Position> eligiblePositions =
            positionSnapshotRepo.findBySymbolAndDate(event.getSymbol(), recordDate);

        for (Position pos : eligiblePositions) {
            // 2. 计算每个账户应得的分红金额
            // 分红比例：每10股分 X 元 → 每股 X/10 元
            BigDecimal dividendPerShare = event.getDividendPerShare();

            // 注意：只有"已结算的持仓"才有权分红（A股 T+1）
            // 也就是��，股权登记日当天买入的股票，分红没有
            BigDecimal eligibleQty = pos.getSettledQty(); // 排除当日买入的

            BigDecimal grossDividend = dividendPerShare.multiply(eligibleQty);

            // 3. 扣税（A 股：持有不足 1 个月按 20% 扣，1个月到1年按 10%，超过 1 年免税）
            BigDecimal holdingDays = calculateHoldingDays(pos, recordDate);
            BigDecimal taxRate = determineTaxRate(holdingDays);
            BigDecimal tax = grossDividend.multiply(taxRate).setScale(2, FLOOR);
            BigDecimal netDividend = grossDividend.subtract(tax);

            // 4. 记录应收分红（派息日才真正到账）
            dividendRecord.save(DividendRecord.builder()
                .accountId(pos.getAccountId())
                .symbol(event.getSymbol())
                .grossAmount(grossDividend)
                .taxAmount(tax)
                .netAmount(netDividend)
                .paymentDate(event.getPaymentDate())
                .status(DividendStatus.PENDING)
                .build());
        }
    }

    // 派息日：将待支付分红实际划入账户
    @Scheduled(cron = "0 6 * * * MON-FRI")  // 每个工作日早上 6 点处理当日到账的分红
    public void settlePendingDividends() {
        LocalDate today = LocalDate.now();
        List<DividendRecord> due = dividendRepo.findByPaymentDateAndStatus(
            today, DividendStatus.PENDING);

        for (DividendRecord record : due) {
            // 原子操作：增加账户资金 + 标记分红已结算
            accountService.creditCash(record.getAccountId(),
                record.getNetAmount(),
                "DIVIDEND_" + record.getId());
            record.setStatus(DividendStatus.SETTLED);
            dividendRepo.save(record);
        }
    }
}
```

### 配股的复杂逻辑

```java
// 配股（Rights Issue）：给现有股东以优惠价认购新股的权利
@Transactional
public void processRightsIssue(RightsIssueEvent event) {
    // 配股比例：每持有 N 股，有权认购 M 股
    BigDecimal ratio = event.getRightsRatio(); // 如 10配3 → ratio = 0.3

    List<Position> positions = positionSnapshotRepo
        .findBySymbolAndDate(event.getSymbol(), event.getRecordDate());

    for (Position pos : positions) {
        BigDecimal rightsEntitled = pos.getSettledQty().multiply(ratio)
            .setScale(0, FLOOR); // 向下取整，不足1股的权利放弃

        if (rightsEntitled.compareTo(BigDecimal.ZERO) <= 0) continue;

        // 创建"配股权利"记录，通知账户持有人决定是否行使
        RightsRecord rights = RightsRecord.builder()
            .accountId(pos.getAccountId())
            .symbol(event.getSymbol())
            .rightsSymbol(event.getRightsSymbol()) // 配股权证代码
            .entitledQty(rightsEntitled)
            .subscriptionPrice(event.getSubscriptionPrice())
            .exerciseDeadline(event.getExerciseDeadline())
            .status(RightsStatus.PENDING_DECISION)
            .build();
        rightsRepo.save(rights);

        // 发通知给账户持有人
        notificationService.sendRightsIssueNotice(rights);
    }

    // 截止日期自动处理未决策的（可配置：默认行使或放弃）
    scheduleDeadlineHandler(event);
}
```

---

## 五、资金管理与清算账户

### 内部资金流转的双向账簿

```
会计原则：每一笔资金变动都必须有对应的反向记录
（复式记账，Double-entry Bookkeeping）

示例：客户买入股票 10 万元

借：客户证券持仓账户    100,000 元
贷：客户资金账户        100,000 元

借：券商自营现金账户    100,000 元
贷：客户资金托管账户   100,000 元
（实际资金还没走，等 T+N 结算）
```

```java
// 每一笔内部转账都是一对借贷分录
@Transactional
public void transferFunds(String fromAccount, String toAccount,
                          BigDecimal amount, String reference) {
    // 借方
    journalEntryRepo.save(JournalEntry.builder()
        .accountId(fromAccount)
        .amount(amount.negate())  // 借方为负
        .entryType(DEBIT)
        .reference(reference)
        .build());

    // 贷方
    journalEntryRepo.save(JournalEntry.builder()
        .accountId(toAccount)
        .amount(amount)           // 贷方为正
        .entryType(CREDIT)
        .reference(reference)
        .build());

    // 不变式：borrowSum + creditSum == 0，可以用定时任务验证
}
```

### 清算账户（Nostro / Vostro）

跨境交易中，银行在其他银行开立的往来账户：

```
Nostro Account（我方在对方银行的账户）：
  "我方在纽约花旗银行的美元账户"
  用于进行美元结算

Vostro Account（对方在我方银行的账户）：
  "纽约花旗银行在我行的人民币账户"
  花旗银行在中国做人民币业务用

工程意义：
  系统需要对 Nostro 账户进行日常管理：
  ✓ 预测每天的资金需求（避免透支）
  ✓ 每天与对手行对账（Nostro Reconciliation）
  ✓ 优化头寸（多余资金不应空置，应收益最大化）
```

---

## 六、后台系统的数据质量保障

### 不变式（Invariant）检查

```java
// 财务不变式：定时验证，任何不满足的情况都是严重 bug
@Scheduled(cron = "0 */15 9-18 * * MON-FRI")  // 交易日每15分钟
public void verifyFinancialInvariants() {
    List<InvariantViolation> violations = new ArrayList<>();

    // 不变式 1：每个账户的总资产 = 现金 + 证券市值 + 冻结资金
    accountRepo.findAll().forEach(account -> {
        BigDecimal computed = account.getCash()
            .add(positionService.getMarketValue(account.getId()))
            .add(account.getFrozenBalance());
        BigDecimal recorded = account.getTotalAssets();

        if (computed.subtract(recorded).abs().compareTo(TOLERANCE) > 0) {
            violations.add(new InvariantViolation(
                "TOTAL_ASSETS_MISMATCH",
                account.getId(),
                "computed=" + computed + " recorded=" + recorded
            ));
        }
    });

    // 不变式 2：所有账户借方合计 = 贷方合计（会计恒等式）
    BigDecimal totalDebit  = journalEntryRepo.sumByType(DEBIT);
    BigDecimal totalCredit = journalEntryRepo.sumByType(CREDIT);
    if (totalDebit.add(totalCredit).abs().compareTo(TOLERANCE) > 0) {
        violations.add(new InvariantViolation(
            "ACCOUNTING_IMBALANCE",
            "GLOBAL",
            "totalDebit=" + totalDebit + " totalCredit=" + totalCredit
        ));
    }

    // 不变式 3：持仓数量 >= 0（除非允许做空）
    positionRepo.findAll().forEach(pos -> {
        if (!pos.isShortEnabled() && pos.getNetQty().compareTo(ZERO) < 0) {
            violations.add(new InvariantViolation(
                "NEGATIVE_POSITION",
                pos.getAccountId() + ":" + pos.getSymbol(),
                "netQty=" + pos.getNetQty()
            ));
        }
    });

    if (!violations.isEmpty()) {
        alertService.critical("INVARIANT_VIOLATION", violations);
    }
}
```

---

## 七、报表系统设计

### 客户对账单的设计挑战

```
客户对账单要包含：
  ├── 期初持仓（昨日收盘时的持仓快照）
  ├── 本日成交明细（每笔成交）
  ├── 期末持仓（今日收盘时的持仓快照）
  ├── 资金变动明细（分红、申赎、转账等）
  └── 盈亏汇总（已实现 + 浮动）

技术挑战：
  1. 数据量大：机构客户可能有数千个持仓，数万笔成交
  2. 时效性：T+1 日上午 9 点前必须发出
  3. 准确性：数字必须与系统完全一致（客户会比对）
  4. 格式多样：PDF、Excel、CSV、API
```

```java
// 报表生成流程：预计算 + 模板渲染
@Service
public class StatementGenerator {

    // T+1 凌晨 2 点，预计算所有账户的对账单数据
    @Scheduled(cron = "0 0 2 * * MON-FRI")
    public void precomputeStatements() {
        LocalDate tradeDate = LocalDate.now().minusDays(1);

        // 并行计算（按账户分片）
        accountRepo.findAllActive()
            .parallelStream()
            .forEach(account -> {
                try {
                    StatementData data = buildStatementData(account.getId(), tradeDate);
                    statementDataRepo.save(data);
                } catch (Exception e) {
                    log.error("Failed to generate statement for {}", account.getId(), e);
                    alertService.error("STATEMENT_GENERATION_FAILED", account.getId());
                }
            });
    }

    // 用户请求时，从预计算结果渲染
    public byte[] generatePdf(String accountId, LocalDate date) {
        StatementData data = statementDataRepo.findByAccountAndDate(accountId, date)
            .orElseThrow(() -> new StatementNotFoundException(accountId, date));

        return pdfRenderer.render("templates/statement.html", data);
    }
}
```

---

## 本节小结

| 能力层次 | 具体内容 |
|---------|---------|
| 日终处理 | 幂等可重跑的步骤化流程，每步骤可独立重试 |
| 对账系统 | 多层次对账，O(N log N) 双指针算法，差异自动分类 |
| 企业行为 | 分红、配股的完整处理流程，含税务和权利行使 |
| 资金管理 | 双向账簿（复式记账），Nostro 账户管理 |
| 数据质量 | 财务不变式定期验证，任何违反立即告警 |
| 报表系统 | 预计算 + 模板渲染，T+1 上午准时交付 |

**下一节**：[Phase 4.6 行业资源与信息源](./phase4-06-resources.md)
