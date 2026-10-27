# 生命科学与生物信息学：技术人学习大纲

> 目标读者：有编程基础（Python/Linux），想进入生物信息领域的技术人
> 学习周期估算：打好地基约 6 个月，能独立承接项目约 1.5–2 年

大纲结构分六个阶段：

1. 生物学基础 — 中心法则、基因组概念，用技术人熟悉的类比（代码仓库、函数、Bug）建立认知框架
2. 核心数据格式 — FASTQ/BAM/VCF 的结构解析，BWA/GATK/SAMtools 等必用工具
3. 主流分析场景 — WGS/WES/RNA-seq/scRNA-seq，每条路线的工具链和输出
4. AI/ML 应用 — ESM2 蛋白质语言模型、图神经网络做药物预测，含一个可动手的项目
5. 工程与合规 — Nextflow/Snakemake、CDISC 临床标准、国内人遗条例（这是护城河的关键）
6. 进阶方向选择 — 肿瘤基因组、单细胞多组学、AI 药物发现、平台工程，选一个深耕

末尾附有关键数据库速查表和分月时间表。

---

## 为什么现在入场？

- AlphaFold2/3 已经把蛋白质结构预测带入实用阶段，但"用好它"仍需懂生物学
- 基因测序成本从 2003 年的 30 亿美元降到现在的 200 美元，数据量爆炸，工程能力稀缺
- 国内政策：基因数据安全监管趋严，懂合规的技术人更值钱
- AI + 生物信息是当前最确定性的交叉方向之一，壁垒极高，但入门路径清晰

---

## 第一阶段：生物学基础（不可跳过）

> 目标：建立最小化的分子生物学认知框架，能读懂领域文献的背景介绍

### 1.1 中心法则

- DNA → RNA → 蛋白质 的信息流
- 转录（Transcription）、翻译（Translation）的基本机制
- 为什么这和"数据 pipeline"是同一类问题

### 1.2 基因组基础概念

| 概念 | 类比 | 实际意义 |
|------|------|---------|
| 基因组（Genome） | 整个代码仓库 | 人类约 30 亿碱基对 |
| 基因（Gene） | 一个函数 | 编码特定蛋白的 DNA 片段 |
| 外显子/内含子 | 有效代码 vs 注释 | 外显子才被翻译成蛋白 |
| SNP（单核苷酸多态性） | 代码里的一个字符差异 | 个体遗传差异的基础 |
| 突变（Mutation） | Bug | 可能致病，也可能无影响 |

### 1.3 推荐资源

- MIT OpenCourseWare: 7.016 Introductory Biology（B 站有搬运）
- 《生物信息学》（陈铭 主编）：国内教材，适合技术人入门
- NCBI Insights 博客：了解数据库背后的逻辑

---

## 第二阶段：核心数据格式（工程师的切入点）

> 目标：能独立处理测序数据，从原始文件到变异结果跑通一遍

### 2.1 必须掌握的文件格式

```
FASTQ   原始测序读段，含碱基质量值（Phred 质量分）
  ↓
SAM/BAM 比对结果（BAM 是 SAM 的二进制压缩版）
  ↓
VCF     变异检测结果（SNP、Indel、CNV 等）
  ↓
BED/GFF 基因组区间注释（基因位置、外显子边界等）
```

**FASTQ 格式解析（四行一组）：**
```
@读段ID
ATCGATCG...  碱基序列
+
IIIIIIII...  质量分（ASCII 编码，I = Phred 40 = 错误率 0.01%）
```

**VCF 关键字段：**
```
CHROM  POS    ID      REF  ALT  QUAL  FILTER  INFO
chr1   925952 rs1234  G    A    .     PASS    DP=45;AF=0.5
```

### 2.2 必用命令行工具

| 工具 | 用途 |
|------|------|
| FastQC | 原始数据质量评估 |
| BWA / Bowtie2 | 序列比对到参考基因组 |
| SAMtools | BAM 文件处理（排序、索引、统计） |
| GATK | 变异检测（业界标准，Broad Institute 出品） |
| bcftools | VCF 文件过滤和统计 |
| bedtools | 基因组区间运算 |

### 2.3 动手练习

1. 下载 NCBI SRA 上的公开测序数据（`prefetch` + `fastq-dump`）
2. 用 FastQC 检查质量
3. 用 BWA-MEM2 比对到 hg38 参考基因组
4. 用 GATK HaplotypeCaller 做变异检测
5. 用 bcftools 过滤低质量变异

> 推荐数据集：NA12878（千人基因组项目基准样本，有金标准 VCF 对照）

---

## 第三阶段：主流分析场景

### 3.1 DNA 分析方向

**全基因组测序（WGS）**
- 用途：遗传病诊断、肿瘤体细胞突变、群体遗传学
- 数据量：每个样本 ~100GB（30× 深度）
- 关键流程：FASTQ → BWA → GATK → 注释（ANNOVAR/VEP）

**全外显子组测序（WES）**
- 只捕获外显子区域（~1% 基因组），成本低 10 倍
- 适合：遗传病致病基因查找

**Panel 测序**
- 靶向几十到几百个基因，用于肿瘤精准用药
- 临床应用最广，合规要求最高

### 3.2 RNA 分析方向

**RNA-seq（转录组测序）**
- 用途：基因表达量分析，找哪些基因在某状态下被激活
- 流程：FASTQ → STAR（比对）→ featureCounts → DESeq2（差异表达）
- 输出：差异表达基因列表 + 富集分析（KEGG/GO pathway）

**单细胞 RNA-seq（scRNA-seq）**
- 不同于批量测序，能分辨单个细胞的表达状态
- 主流工具：Seurat（R）、Scanpy（Python）
- 用途：免疫细胞分型、肿瘤微环境分析

### 3.3 蛋白质与结构方向

**AlphaFold2/3 实际使用**
- 本地部署 AlphaFold2：需要 GPU + ~2TB 数据库
- ColabFold：在线版本，适合入门（colab.research.google.com）
- 输出解读：pLDDT 置信度分数，>70 为可信结构

**蛋白质数据库**
- UniProt：蛋白质序列和功能注释（Swiss-Prot 是人工审核版）
- PDB（Protein Data Bank）：实验解析的蛋白质三维结构
- ChEMBL：药物小分子与靶点的结合数据

---

## 第四阶段：AI/ML 在生物信息中的应用

### 4.1 传统机器学习场景

| 场景 | 常用方法 |
|------|---------|
| 变异致病性预测 | XGBoost / 随机森林（特征：保守性得分、位置、氨基酸变化） |
| 肿瘤分型 | 聚类 + 降维（UMAP/t-SNE）|
| 药物敏感性预测 | 回归模型（特征：基因表达 + 药物指纹） |

### 4.2 深度学习场景

**序列模型**
- DNA/蛋白质序列天然适合 Transformer
- DNABERT、ESM2（Meta 蛋白质语言模型）：直接用预训练模型做迁移学习
- 用途：启动子预测、剪接位点识别、蛋白质功能预测

**图神经网络**
- 分子结构可以表示为图（原子=节点，键=边）
- 用于：药物-靶点相互作用预测、分子性质预测

### 4.3 一个可以动手的项目

用 ESM2 做蛋白质功能分类：
1. 从 UniProt 下载某蛋白家族的序列（正例）+ 随机序列（负例）
2. 用 `fair-esm` 库提取序列 embedding
3. 训练一个简单分类器
4. 在 PDB 结构上可视化验证

---

## 第五阶段：工程与合规（进入产业的关键）

### 5.1 临床数据标准（CDISC）

**为什么重要**：FDA/NMPA 批准新药，临床试验数据必须按 CDISC 标准提交

| 标准 | 全称 | 用途 |
|------|------|------|
| CDASH | Clinical Data Acquisition Standards Harmonization | 数据采集格式 |
| SDTM | Study Data Tabulation Model | 临床数据提交格式 |
| ADaM | Analysis Data Model | 统计分析数据集格式 |

### 5.2 基因数据安全合规（中国）

- **人类遗传资源管理条例**（2023 年修订）：向境外提供遗传数据需审批
- **数据出境安全评估**：基因数据属于敏感个人信息，跨境有严格限制
- 合规意识是国内生物信息技术人的核心竞争力之一

### 5.3 系统工程能力

**流程管理工具**
- Snakemake / Nextflow：生物信息 pipeline 的标准调度框架（类比 Airflow）
- CWL（Common Workflow Language）：流程可移植性标准

**容器化**
- 几乎所有生物信息工具都有 Docker/Singularity 镜像（Biocontainers 项目）
- HPC 集群（超算）用 Singularity，云平台用 Docker

**大数据处理**
- 单个 WGS 项目可能有几千个样本，需要分布式处理
- Google Cloud Life Sciences / AWS HealthOmics 是专门的托管平台

---

## 第六阶段：进阶方向（选其一深耕）

### 方向 A：肿瘤基因组学

重点：体细胞突变、拷贝数变异（CNV）、融合基因检测、TMB/MSI 计算
应用：伴随诊断（CDx）产品开发、精准用药报告生成系统
代表公司：Foundation Medicine、燃石医学、世和基因

### 方向 B：单细胞多组学

重点：scRNA-seq + scATAC-seq 联合分析、空间转录组
应用：免疫治疗靶点发现、细胞图谱构建
工具：Seurat v5、Scanpy、Squidpy

### 方向 C：AI 药物发现

重点：分子生成（图生成模型/扩散模型）、虚拟筛选、ADMET 预测
应用：苗头化合物发现、先导化合物优化
代表工具：RDKit、DeepChem、DiffSBDD

### 方向 D：生物信息平台工程

重点：流程自动化（Nextflow + AWS Batch）、数据库设计（基因组数据仓库）、报告系统
应用：基因检测公司的核心系统、CRO 公司的数据平台
特点：纯工程，不需要深入算法，但需要懂业务流程

---

## 关键数据库速查

| 数据库 | 内容 | 地址 |
|--------|------|------|
| NCBI | 综合生物数据库（GenBank、SRA、PubMed） | ncbi.nlm.nih.gov |
| Ensembl | 基因组注释（人类/动植物） | ensembl.org |
| UniProt | 蛋白质序列与功能 | uniprot.org |
| PDB | 蛋白质三维结构 | rcsb.org |
| ChEMBL | 药物与靶点活性数据 | ebi.ac.uk/chembl |
| ClinVar | 遗传变异临床意义 | ncbi.nlm.nih.gov/clinvar |
| GEO | 基因表达数据集 | ncbi.nlm.nih.gov/geo |
| COSMIC | 肿瘤体细胞突变数据库 | cancer.sanger.ac.uk |

---

## 推荐学习路径（时间表）

```
月 1-2：生物学基础 + Linux/Python 巩固
  └── 完成 MIT 7.016 前 6 讲
  └── 能用命令行处理 FASTQ/BAM 文件

月 3-4：跑通标准分析流程
  └── GATK 变异检测流程（DNA-seq）
  └── DESeq2 差异表达分析（RNA-seq）
  └── 在 NA12878 数据上做实战练习

月 5-6：选定一个细分方向，找一个真实数据集做完整项目
  └── GitHub 上发布分析代码和报告
  └── 开始读领域顶刊：Nature Methods / Genome Research / Bioinformatics

月 7-12：进入真实业务场景
  └── 找生物信息相关岗位（不一定要算法岗，工程岗也行）
  └── 学 Nextflow，把分析流程工程化
  └── 补合规知识（CDISC 或人遗条例，取决于方向）
```

---

## 一句话定位

> 这个领域不缺生物学家，也不缺程序员，缺的是**既能看懂实验数据、又能把流程工程化的人**。
> 你的竞争优势不是比生物学家更懂生物，而是比生物学家更懂系统——这个差距，3 年足够建立。
