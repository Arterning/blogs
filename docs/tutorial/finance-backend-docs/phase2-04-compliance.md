# Phase 2.4 合规与监管（Compliance & Regulation）

> 目标：理解金融合规的核心要求，以及这些要求如何落地到后端系统的设计中。

---

## 一、为什么后端工程师需要懂合规

合规不是法务团队的事，它直接决定系统架构：
- 哪些数据必须留存多少年？→ 存储架构
- 交易报告必须在多少时间内提交？→ 系统延迟要求
- 什么数据需要加密/脱敏？→ 数据安全设计
- 哪些操作必须留审计日志？→ 日志系统设计

理解合规背后的业务逻辑，才能在需求评审时识别合规风险，而不是把合规需求当成"额外负担"。

---

## 二、KYC（了解你的客户）

### 什么是 KYC

KYC（Know Your Customer）是金融机构在开户或建立业务关系时，对客户身份进行核实的过程。

**监管目的**：防止洗钱、恐怖融资等非法行为通过金融系统完成资金流转。

### KYC 的三个核心要素

**1. 身份核实（Identity Verification）**
- 个人：姓名、身份证、人脸识别
- 企业：营业执照、法人身份、股权穿透（查到实际控制人）
- 境外客户：护照、地址证明

**2. 风险评级（Risk Assessment）**
| 风险等级 | 对应客户类型 | 核实要求 |
|---------|------------|---------|
| 低风险 | 普通个人投资者 | 基础身份核实 |
| 中风险 | 企业客户、境外客户 | 增强核实 + 定期复核 |
| 高风险 | PEP（政治敏感人物）、高风险国家客户 | 最高级别核实 + 持续监控 |

**3. 持续监控（Ongoing Monitoring）**
- 客户信息变更时触发重新核实
- 定期（通常每年）对高风险客户重新评估

### KYC 系统的后端设计

```java
public class KYCService {

    // 开户时触发 KYC 流程
    public KYCResult initiateKYC(CustomerInfo customer) {
        // 1. 基础身份核实
        IdentityCheckResult idCheck = identityVerificationService.verify(
            customer.getIdType(),
            customer.getIdNumber(),
            customer.getName()
        );
        if (!idCheck.isPassed()) {
            return KYCResult.failed("IDENTITY_VERIFICATION_FAILED", idCheck.getReason());
        }

        // 2. 制裁名单筛查（必须做，否则违法）
        SanctionCheckResult sanctionCheck = sanctionListService.screen(customer);
        if (sanctionCheck.isHit()) {
            // 命中制裁名单，必须拒绝并上报
            reportSuspiciousActivity(customer, "SANCTION_LIST_HIT");
            return KYCResult.failed("SANCTION_LIST_HIT", null);
        }

        // 3. PEP 检查
        boolean isPEP = pepScreeningService.screen(customer);

        // 4. 风险评级
        RiskLevel riskLevel = assessRiskLevel(customer, isPEP);

        // 5. 存储 KYC 记录（监管要求留存）
        kycRecordRepository.save(new KYCRecord(
            customer.getId(),
            idCheck,
            sanctionCheck,
            riskLevel,
            LocalDateTime.now(),
            LocalDate.now().plusYears(5)  // 合规要求：KYC 记录留存 5 年
        ));

        return KYCResult.passed(riskLevel);
    }
}
```

### 制裁名单筛查

这是 KYC 中最关键的一步，命中制裁名单的客户必须拒绝，且可能需要向监管机构上报。

常见制裁名单：
- **OFAC SDN List**（美国财政部：特别指定国民名单）
- **EU Consolidated List**（欧盟制裁名单）
- **UN Security Council List**（联合国安理会名单）
- **中国人民银行反洗钱名单**

```java
// 制裁名单筛查需要模糊匹配（名字可能有拼写变体）
public SanctionCheckResult screen(CustomerInfo customer) {
    // 精确匹配
    if (sanctionDatabase.exactMatch(customer.getName(), customer.getIdNumber())) {
        return SanctionCheckResult.hit("EXACT_MATCH");
    }

    // 模糊匹配（名字音近、别名等）
    List<SanctionEntity> fuzzyMatches = sanctionDatabase.fuzzyMatch(
        customer.getName(),
        SIMILARITY_THRESHOLD  // 通常 80-90%
    );

    if (!fuzzyMatches.isEmpty()) {
        // 模糊命中需要人工复核
        return SanctionCheckResult.pendingReview(fuzzyMatches);
    }

    return SanctionCheckResult.clear();
}
```

---

## 三、AML（反洗钱）

### 洗钱的三个阶段

理解洗钱流程，才能理解 AML 系统在检测什么：

```
1. 放置（Placement）：将非法资金注入金融系统
   例：将现金存入银行账户

2. 分层（Layering）：通过复杂交易掩盖资金来源
   例：多次国际转账、购买高价值资产再出售

3. 整合（Integration）：使资金看起来合法
   例：用"洗白"的资金购置资产或投资
```

### 可疑交易监测规则

**大额交易上报（Currency Transaction Report, CTR）**：
- 中国：单笔或当日累计 5 万元人民币以上现金交易（个人）
- 美国：10,000 美元以上现金交易必须上报

```java
// 大额交易监控
@EventListener
public void onTransaction(TransactionEvent event) {
    if (event.getType() == TransactionType.CASH) {
        // 当日累计大额现金交易统计
        BigDecimal dailyTotal = transactionAggregator.getDailyCashTotal(
            event.getAccountId(),
            LocalDate.now()
        );

        if (dailyTotal.compareTo(LARGE_TRANSACTION_THRESHOLD) >= 0) {
            ctrReportingService.submitReport(event.getAccountId(), dailyTotal);
        }
    }
}
```

**可疑交易上报（Suspicious Activity Report, SAR）**：

以下行为触发可疑交易调查：
- 短时间内大量小额交易（化整为零，故意规避大额阈值）
- 交易与客户背景明显不符（低收入人员频繁大额转账）
- 账户快速资金进出（转入后立即转出，不留余额）
- 交易地理位置异常（与申报居住地不符）
- 频繁与高风险国家账户交互

```java
// 化整为零（Structuring）检测
public boolean detectStructuring(String accountId, LocalDate date) {
    // 检查是否存在多笔接近阈值但不触发阈值的交易
    List<Transaction> dayTransactions = transactionRepository
        .findByAccountAndDate(accountId, date);

    long suspiciousCount = dayTransactions.stream()
        .filter(t -> t.getAmount().compareTo(THRESHOLD_MINUS_10_PERCENT) > 0)
        .filter(t -> t.getAmount().compareTo(LARGE_TRANSACTION_THRESHOLD) < 0)
        .count();

    // 多笔略低于阈值的交易，高度可疑
    return suspiciousCount >= STRUCTURING_DETECTION_COUNT;
}
```

---

## 四、交易报告义务

### MiFID II（欧盟金融工具市场指令）

MiFID II 是欧盟对金融市场的综合监管框架，要求：

**交易报告（Transaction Reporting）**：
- 所有受监管金融工具的交易，必须在交易日结束后 T+1 提交给监管机构
- 报告包含 65 个字段，涵盖交易双方、工具、价格、数量等

**最佳执行报告（Best Execution）**：
- 机构必须证明以"最优价格"为客户执行订单
- 每季度发布执行质量报告

```java
// MiFID II 交易报告生成
public MiFIDReport generateTransactionReport(Trade trade) {
    return MiFIDReport.builder()
        .transactionReferenceNumber(trade.getId())
        .tradingDateTime(trade.getExecutionTime())
        .tradingCapacity(TradingCapacity.PRINCIPAL)  // 自营 vs 代理
        .instrumentIdentifier(trade.getSymbol())
        .instrumentType(InstrumentType.EQUITY)
        .priceNotation(PriceNotation.MONETARY)
        .price(trade.getPrice())
        .priceMultiplier(BigDecimal.ONE)
        .quantity(trade.getQty())
        .buyerId(trade.getBuyerLEI())     // LEI = Legal Entity Identifier
        .sellerId(trade.getSellerLEI())
        .venue(trade.getExecutionVenue()) // MIC 代码，如 XLON=伦敦证交所
        .build();
}
```

### EMIR（欧洲市场基础设施法规）

针对场外衍生品（OTC Derivatives）的报告要求：
- 所有 OTC 衍生品交易必须上报给交易数据库（Trade Repository）
- T+1 上报，双边上报（买卖双方各自上报）

### 中国监管要求

**证监会**：
- 股票交易：实时向交易所报告
- 大股东持仓变化：超过 5% 需披露
- 融资融券：每日上报规模

**人民银行**：
- 大额交易报告（5 万元以上）
- 可疑交易报告
- 跨境资金流动报告

---

## 五、最佳执行（Best Execution）

### 什么是最佳执行

监管机构要求金融机构在执行客户订单时，必须以"客户最佳利益"为原则，获得"最优可能结果"。

最优结果不只是价格，还包括：
- **价格**：在当时市场条件下的最优价格
- **成本**：佣金、税费等交易成本
- **速度**：执行速度影响成交价格
- **成交可能性**：订单是否能成交
- **市场冲击**：大单的市场冲击成本

### Smart Order Routing（智能订单路由）

EMS 的核心功能之一：将订单路由到最优执行场所。

```java
public ExecutionVenue selectBestVenue(Order order) {
    List<VenueQuote> quotes = new ArrayList<>();

    for (ExecutionVenue venue : availableVenues) {
        VenueQuote quote = venue.getQuote(order.getSymbol(), order.getSide());

        // 综合评分：价格权重 70%，成本权重 20%，速度权重 10%
        BigDecimal score = quote.getPrice()
            .multiply(isBuy ? NEGATIVE_ONE : ONE)  // 买入希望价格低，卖出希望价格高
            .multiply(new BigDecimal("0.7"))
            .subtract(quote.getCommission().multiply(new BigDecimal("0.2")))
            .subtract(quote.getExpectedLatencyMs()
                .multiply(LATENCY_COST_PER_MS)
                .multiply(new BigDecimal("0.1")));

        quotes.add(new VenueQuote(venue, score));
    }

    return quotes.stream()
        .max(Comparator.comparing(VenueQuote::getScore))
        .map(VenueQuote::getVenue)
        .orElseThrow();
}
```

---

## 六、内幕交易合规（Market Surveillance）

### 内幕交易的定义

利用未公开的重大信息（内幕信息）进行交易，获取不公平利益。

例：在公司并购公告前，利用知情的消息买入目标公司股票。

### 监控系统检测的模式

**关联交易检测**：
```
检测逻辑：
1. 记录所有"重大事件"（公告、M&A、业绩超预期）
2. 查找事件发布前 N 天内，相关账户是否有异常交易
3. 检查交易员是否有该公司内部信息的接触记录
```

**异常收益检测**：
```java
// 检测某账户在事件前是否有不寻常的盈利交易
public List<SurveillanceAlert> detectAbnormalProfit(
        String accountId,
        String symbol,
        LocalDate eventDate) {

    List<Trade> preTrades = tradeRepository.findByAccountSymbolDateRange(
        accountId, symbol,
        eventDate.minusDays(30),  // 事件前30天
        eventDate
    );

    if (preTrades.isEmpty()) return Collections.emptyList();

    BigDecimal profitRate = calculateProfitRate(preTrades, eventDate);

    List<SurveillanceAlert> alerts = new ArrayList<>();
    if (profitRate.compareTo(ABNORMAL_PROFIT_THRESHOLD) > 0) {
        alerts.add(new SurveillanceAlert(
            AlertType.POTENTIAL_INSIDER_TRADING,
            accountId, symbol, eventDate,
            "Profit rate " + profitRate + " exceeds threshold before major event"
        ));
    }
    return alerts;
}
```

**信息屏障（Chinese Wall）**：
- 投行部门（知道 M&A 信息）和销售交易部门之间必须隔离
- 系统层面：不同部门的数据访问权限严格隔离
- 通讯记录：敏感信息的邮件/即时消息自动标记和审查

---

## 七、审计日志设计

合规要求所有关键操作都有不可篡改的审计记录。

### 必须记录的操作

- 所有交易和订单操作
- 账户信息变更
- 限额修改
- 人工干预（如手动调整持仓）
- 权限变更
- 系统配置修改

### 审计日志的设计原则

**不可篡改**：日志只能追加，不能修改或删除。

```java
@Entity
@Immutable  // 标记为不可变，ORM 层面防止更新
public class AuditLog {
    @Id
    private String id;  // UUID

    private String operatorId;      // 谁操作的
    private String operationType;   // 操作类型
    private String resourceType;    // 操作的资源类型
    private String resourceId;      // 操作的资源ID
    private String beforeState;     // 操作前状态（JSON）
    private String afterState;      // 操作后状态（JSON）
    private LocalDateTime timestamp;
    private String ipAddress;       // 来源IP
    private String requestId;       // 关联的请求ID

    // 无 setter，只有构造器，确保不可变
}

// 使用 append-only 表，数据库层面禁止 UPDATE/DELETE
// PostgreSQL 示例：
// REVOKE UPDATE, DELETE ON audit_logs FROM app_user;
```

**完整链路追踪**：每个操作的 requestId 贯穿全链路。

```java
// 使用 MDC（Mapped Diagnostic Context）传递追踪ID
public class AuditInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, ...) {
        String requestId = UUID.randomUUID().toString();
        MDC.put("requestId", requestId);
        MDC.put("userId", SecurityContext.getCurrentUser().getId());
        response.setHeader("X-Request-ID", requestId);
        return true;
    }
}
```

**留存要求**：

| 数据类型 | 监管要求留存年限 |
|---------|---------------|
| 交易记录 | 7-10 年（各地区不同） |
| 通讯记录（邮件/即时消息） | 5-7 年 |
| KYC 文件 | 关系终止后 5 年 |
| 审计日志 | 5-7 年 |

---

## 八、数据安全与隐私

### 敏感数据分级

```
最高敏感：身份证号、银行账号、密码
  → 存储必须加密，日志中不得出现明文，API 返回必须脱敏

高敏感：手机号、交易金额、持仓数据
  → 存储加密，访问需要权限，日志脱敏

中敏感：姓名、地址、交易历史
  → 权限控制，不对外公开
```

### 脱敏处理

```java
public class DataMaskingUtil {

    // 身份证：显示前3后4位
    public static String maskIdNumber(String idNumber) {
        if (idNumber == null || idNumber.length() < 7) return "***";
        return idNumber.substring(0, 3)
            + "*".repeat(idNumber.length() - 7)
            + idNumber.substring(idNumber.length() - 4);
    }

    // 手机号：显示前3后4位
    public static String maskPhone(String phone) {
        if (phone == null || phone.length() != 11) return "***";
        return phone.substring(0, 3) + "****" + phone.substring(7);
    }

    // 银行卡：只显示后4位
    public static String maskBankCard(String cardNumber) {
        if (cardNumber == null || cardNumber.length() < 4) return "****";
        return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
    }
}
```

---

## 九、合规系统架构总结

```
客户接入层
├── KYC 服务（开户核实、持续监控）
└── 制裁名单筛查（实时 + 批量）

交易层
├── 事前合规检查（最佳执行、交易限制）
├── 实时 AML 监控（大额交易、可疑行为）
└── 内幕交易监控（关联分析、异常收益）

报告层
├── 监管报告（MiFID II、EMIR、证监会）
├── 大额交易报告（T+0 当日）
└── 可疑交易报告（发现后及时上报）

数据层
├── 审计日志（不可篡改，全链路追踪）
├── 敏感数据加密存储
└── 长期数据归档（满足留存要求）
```

---

## 本节小结

| 概念 | 后端系统影响 |
|------|------------|
| KYC | 开户流程、制裁名单筛查 API、风险评级存储 |
| AML | 实时交易监控、大额交易上报、可疑交易检测规则 |
| 交易报告 | T+1 批量报告生成、监管接口对接 |
| 最佳执行 | Smart Order Routing、执行质量数据收集 |
| 内幕交易监控 | 事件关联分析、异常收益检测、信息屏障权限控制 |
| 审计日志 | Append-only 存储、不可篡改、长期留存 |
| 数据安全 | 敏感字段加密、API 脱敏、访问权限控制 |

---

## Phase 2 学习完成 — 检验标准

完成 Phase 2 后，你应该能够：

- [ ] 向产品经理解释为什么一笔交易不能立即到账（T+N 结算）
- [ ] 看懂一条 FIX 成交回报消息，知道每个字段的含义
- [ ] 解释 OMS 和 EMS 的区别，以及各自适合什么延迟等级
- [ ] 设计一个简单的事前风控检查流程（内存限额+状态检查）
- [ ] 说明净额清算相比逐笔清算节省了什么
- [ ] 解释 DVP 为什么能消除结算风险
- [ ] 说出 KYC 的三个核心要素
- [ ] 设计审计日志表，满足不可篡改和长期留存的要求

**进入 Phase 3**：[Phase 3 技术落地关](./README.md#phase-3技术落地关6-12-个月)
