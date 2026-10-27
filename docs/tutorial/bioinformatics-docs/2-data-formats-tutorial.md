# 第二阶段：核心数据格式（工程师的切入点）

> 对应大纲第二阶段
> 目标：能独立处理测序数据，理解每种格式的字段含义，从原始文件到变异结果跑通一遍
> 预计完成时间：3-4 周

---

## 为什么从文件格式入手？

生物信息分析本质上是一系列**文件转换**操作：

```
FASTQ  →  SAM/BAM  →  VCF  →  注释表格
原始读段   比对结果     变异      可读报告
```

每个箭头对应一个或多个工具，工具的参数、报错信息、输出质量，你不看懂底层格式就很难判断对错。把格式搞透，是把这个领域当成工程而不是黑盒来对待的第一步。

**和第三阶段的分工：**
- 本阶段：把每种格式的结构拆开，讲清楚每个字段是什么
- 第三阶段（3.1）：讲怎么把这些格式串联成完整的分析流程

---

## 2.1 FASTQ：原始测序数据

### 格式结构

FASTQ 是测序仪直接输出的原始数据格式，每条读段（Read）占四行：

```
@SRR001666.1 071112_SLXA-EAS1_s_7:5:1:817:345 length=72   ← 行1：读段ID
GGGTGATGGCCGCTGCCGATGGCGTCAAATCCCACCAAGTTACCCTTAACAACTTAAGGGTTTTCAAATAGA   ← 行2：碱基序列
+                                                                            ← 行3：分隔符（+号）
IIIIIIIIIIIIIIIIIIIIIIIIIIIIII9IG9ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII   ← 行4：质量分
```

**行 1 —— 读段 ID**

格式因测序平台而异，Illumina 的读段 ID 包含：
```
@<仪器名>:<Run编号>:<流动槽ID>:<泳道>:<Tile编号>:<X坐标>:<Y坐标> <读取方向>:<是否过滤>:<控制位>:<样本索引>
@A00519:123:HXXXX:1:1101:3452:1031  1:N:0:ACGTTGCA
          ^   ^     ^ ^    ^     ^   ^ ^ ^  ^
          运行 流动槽 泳道 Tile  坐标  R1 通过 控制 index
```

工程上常用的信息：最后的 `1` 或 `2` 表示是 R1 还是 R2（双端测序的两个方向）。

**行 4 —— 质量分（Phred Quality Score）**

每个字符对应行 2 中同位置碱基的测序质量。字符 → 质量分的转换：

```python
# Phred+33 编码（现代 Illumina 标准）
quality_char = 'I'
phred_score = ord(quality_char) - 33   # ord('I') = 73, 73-33 = 40
error_prob = 10 ** (-phred_score / 10) # 10^(-4) = 0.0001 = 0.01%
```

常用质量分对照表：

| Phred 分 | ASCII 字符 | 错误概率 | 含义 |
|---------|-----------|---------|------|
| Q10 | + | 10% | 差，每 10 个碱基有 1 个测错 |
| Q20 | 5 | 1% | 合格下限 |
| Q30 | ? | 0.1% | 行业标准门槛 |
| Q40 | I | 0.01% | 高质量 |
| Q60 | ] | 0.000001% | ONT 长读段的目标 |

**Q30 是行业常用门槛**——测序报告里"Q30 碱基比例"应 ≥ 80%，低于此值说明测序质量不合格。

```python
def phred_to_prob(char, offset=33):
    return 10 ** (-(ord(char) - offset) / 10)

def parse_fastq(filepath):
    """逐条读取 FASTQ，返回 (id, seq, qual_scores) 三元组"""
    import gzip
    opener = gzip.open if filepath.endswith('.gz') else open
    with opener(filepath, 'rt') as f:
        while True:
            header = f.readline().strip()
            if not header:
                break
            seq  = f.readline().strip()
            f.readline()  # 跳过 '+'
            qual = f.readline().strip()
            scores = [ord(c) - 33 for c in qual]
            yield header[1:], seq, scores

# 计算一个文件的平均 Q30 比例
def q30_ratio(filepath):
    total = q30 = 0
    for _, _, scores in parse_fastq(filepath):
        total += len(scores)
        q30   += sum(1 for s in scores if s >= 30)
    return q30 / total if total else 0
```

### 双端测序（Paired-End）

现代测序通常对同一 DNA 片段从两端分别测序，产生 R1 和 R2 两个文件。R1 和 R2 的读段 ID 相同（或只有末尾 `/1` `/2` 区别），顺序严格一一对应。

```
原始 DNA 片段（~300-500bp）：
5' ──────────────────────────────── 3'
   ←── R2 (150bp)  R1 (150bp) ──→

好处：
- 知道两端序列，可以推断整个片段长度（Insert Size）
- 比对准确率更高（尤其在重复区域）
- 结构变异检测依赖 Insert Size 异常
```

**检查双端文件是否匹配：**
```bash
# 读段数量必须相等
echo "R1 reads:" && zcat sample_R1.fastq.gz | wc -l | awk '{print $1/4}'
echo "R2 reads:" && zcat sample_R2.fastq.gz | wc -l | awk '{print $1/4}'
```

### FastQC：质量报告

```bash
fastqc sample_R1.fastq.gz sample_R2.fastq.gz -t 4 -o ./qc_output/
# -t 4：4线程并行
# 输出：sample_R1_fastqc.html（HTML报告）+ sample_R1_fastqc.zip（数据）
```

FastQC 报告重点看这几项：

| 模块 | 正常 | 警告/异常 |
|------|------|----------|
| Per base sequence quality | 末端 Q 值有所下降，但 ≥ Q20 | 整体 Q<20，需要提高 Trimming 强度 |
| Per sequence GC content | 接近正态分布，峰在 40-60% | 双峰 → 污染；偏移 → 物种判断有误 |
| Sequence Length Distribution | 所有读段等长（测序仪设定值） | 长度不均匀 → 已经过 Trimming 或有降解 |
| Adapter Content | 无或极低 | 出现明显接头 → 必须 Trimming |
| Sequence Duplication Levels | WGS < 10%，WES 20-40% | WGS > 30% → 文库复杂度不足 |

### Trimming：去除低质量碱基和接头

```bash
# Trimmomatic（双端模式）
trimmomatic PE \
    sample_R1.fastq.gz sample_R2.fastq.gz \
    R1_clean.fastq.gz R1_unpaired.fastq.gz \
    R2_clean.fastq.gz R2_unpaired.fastq.gz \
    ILLUMINACLIP:TruSeq3-PE.fa:2:30:10 \  # 接头文件:seed错配:回文阈值:简单比对阈值
    LEADING:3 \         # 去除开头 Q<3 的碱基
    TRAILING:3 \        # 去除末尾 Q<3 的碱基
    SLIDINGWINDOW:4:15 \# 4bp 滑动窗口，平均 Q<15 时截断
    MINLEN:36           # 修剪后 <36bp 的读段直接丢弃

# 现代替代：fastp（更快，自动检测接头）
fastp -i sample_R1.fastq.gz -I sample_R2.fastq.gz \
      -o R1_clean.fastq.gz -O R2_clean.fastq.gz \
      -h fastp_report.html -j fastp_report.json \
      --thread 4 --detect_adapter_for_pe
```

---

## 2.2 SAM/BAM：比对结果

### 格式概览

SAM（Sequence Alignment/Map）是比对工具（BWA/Bowtie2）的输出格式。BAM 是它的二进制压缩版本（节省约 75% 空间），实际工作中几乎只用 BAM。

```
SAM = 类似 TSV，文本可读，但每个文件几十 GB
BAM = SAM 的 gzip 压缩二进制版，配合索引（.bai）可随机访问
CRAM = 更激进的压缩，需要参考基因组才能解码
```

SAM 文件由两部分组成：
1. **头部（Header）**：以 `@` 开头的元数据行
2. **比对记录（Alignment records）**：每条读段一行，11 个必填字段 + 可选标签

### 头部（Header）

```
@HD  VN:1.6  SO:coordinate         ← 文件版本，排序方式（coordinate=按坐标排序）
@SQ  SN:chr1  LN:248956422         ← 参考序列名（染色体）和长度
@SQ  SN:chr2  LN:242193529
...（共 25 条：1-22, X, Y, MT）
@RG  ID:sample1  SM:sample1  PL:ILLUMINA  LB:lib1   ← 读组信息
@PG  ID:bwa  PN:bwa  VN:0.7.17  CL:bwa mem ...      ← 产生此文件的程序
```

`@RG`（Read Group）字段很重要——GATK 等工具用它区分不同测序批次，避免批次效应。

### 比对记录（11 个必填字段）

```
QNAME    FLAG  RNAME  POS    MAPQ  CIGAR   RNEXT  PNEXT  TLEN   SEQ         QUAL
read001  99    chr1   10001  60    101M    =      10201  301    ATCGATCG... IIIIIIII...
```

| 字段 | 含义 | 注意点 |
|------|------|--------|
| QNAME | 读段名 | 对应 FASTQ 的 header，双端 R1/R2 同名 |
| FLAG | 二进制标志位 | 最复杂的字段，下面详解 |
| RNAME | 比对到的染色体 | `*` 表示未比对上 |
| POS | 比对起始位置 | **1-based**（注意！BED 格式是 0-based） |
| MAPQ | 比对质量 | 0-60，60 最好；0 表示多处相同得分 |
| CIGAR | 比对描述字符串 | 下面详解 |
| RNEXT | 配对读段的染色体 | `=` 表示和 RNAME 相同 |
| PNEXT | 配对读段的位置 | |
| TLEN | 模板长度（Insert Size） | R1 为正，R2 为负，正常约 300-500 |
| SEQ | 碱基序列 | `*` 表示不可用 |
| QUAL | 质量分 | Phred+33 编码，同 FASTQ 第 4 行 |

### FLAG 字段：12 个比特位

FLAG 是一个整数，每个比特位有独立含义：

| 比特值 | 十六进制 | 含义 |
|--------|---------|------|
| 1 | 0x1 | 双端测序（paired-end） |
| 2 | 0x2 | 双端正确配对 |
| 4 | 0x4 | **读段未比对上** |
| 8 | 0x8 | 配对读段未比对上 |
| 16 | 0x10 | **读段比对到反义链**（reverse complement） |
| 32 | 0x20 | 配对读段比对到反义链 |
| 64 | 0x40 | 是 R1（第一条读段） |
| 128 | 0x80 | 是 R2（第二条读段） |
| 256 | 0x100 | **次要比对**（secondary alignment） |
| 512 | 0x200 | 未通过质量过滤 |
| 1024 | 0x400 | **PCR 重复** |
| 2048 | 0x800 | **补充比对**（chimeric read 的其他部分） |

```python
def decode_flag(flag):
    bit_meanings = {
        1: "paired", 2: "proper pair", 4: "unmapped", 8: "mate unmapped",
        16: "reverse strand", 32: "mate reverse", 64: "read1", 128: "read2",
        256: "secondary", 512: "qc fail", 1024: "duplicate", 2048: "supplementary"
    }
    return [desc for bit, desc in bit_meanings.items() if flag & bit]

decode_flag(99)   # 99 = 1+2+32+64 → ['paired', 'proper pair', 'mate reverse', 'read1']
decode_flag(147)  # 147 = 1+2+16+128 → ['paired', 'proper pair', 'reverse strand', 'read2']
```

**常用 FLAG 值速查：**
- `4`：读段未比对上（分析时通常过滤掉）
- `1024`：PCR 重复（MarkDuplicates 后打上此标记）
- `256`/`2048`：次要/补充比对（通常只保留主要比对）

**使用 samtools view 按 FLAG 过滤：**
```bash
# 只保留正确配对、主要比对的读段（排除未比对、重复、次要、补充）
samtools view -F 4 -F 256 -F 1024 -F 2048 -f 2 sample.bam > filtered.bam

# 等价的简洁写法（-F 排除，-f 要求）
samtools view -F 3844 -f 2 sample.bam > filtered.bam
# 3844 = 4+256+512+1024+2048
```

### CIGAR 字符串：比对细节

CIGAR（Compact Idiosyncratic Gapped Alignment Report）描述读段如何与参考基因组对齐：

| 符号 | 含义 | 消耗读段 | 消耗参考 |
|------|------|---------|---------|
| M | 匹配或错配 | ✓ | ✓ |
| I | 插入（相对参考） | ✓ | — |
| D | 缺失（相对参考） | — | ✓ |
| N | 跳过区域（内含子）| — | ✓ |
| S | 软裁剪（soft clip）| ✓ | — |
| H | 硬裁剪（hard clip）| — | — |

```
例子：101M
含义：读段 101 个碱基全部与参考对齐（匹配或错配）

例子：50M3I48M
含义：前50碱基对齐，然后有3个碱基插入（Indel），后48碱基对齐

例子：20S81M
含义：前20碱基被软裁剪（通常是接头残留或质量差），后81碱基正常对齐
```

```python
import re
def parse_cigar(cigar):
    """解析 CIGAR 字符串，返回 (长度, 操作符) 列表"""
    return [(int(n), op) for n, op in re.findall(r'(\d+)([MIDNSHP=X])', cigar)]

def reference_length(cigar):
    """从 CIGAR 计算读段在参考基因组上占据的长度"""
    ops_consuming_ref = {'M', 'D', 'N', '=', 'X'}
    return sum(n for n, op in parse_cigar(cigar) if op in ops_consuming_ref)

parse_cigar("50M3I48M")   # [(50,'M'), (3,'I'), (48,'M')]
reference_length("50M3I48M")  # 98（插入不占参考基因组的长度）
```

### 可选标签（Optional Tags）

SAM 记录末尾可以有任意数量的 `TAG:TYPE:VALUE` 字段：

| 标签 | 类型 | 含义 |
|------|------|------|
| NM | i | 编辑距离（与参考的错配+Indel数） |
| MD | Z | 错配位置字符串，用于重建参考序列 |
| XS | i | 次优比对得分 |
| AS | i | 最优比对得分 |
| RG | Z | 该读段所属的读组 ID |
| MC | Z | 配对读段的 CIGAR（用于 Indel 定位） |

### SAMtools：BAM 文件操作

```bash
# ── 格式转换 ──
samtools view -Sb input.sam > output.bam       # SAM → BAM
samtools view -h input.bam > output.sam        # BAM → SAM（-h 包含头部）
samtools view -T ref.fa -C input.bam > out.cram # BAM → CRAM（需要参考基因组）

# ── 排序与索引 ──
samtools sort -@ 8 -o sorted.bam input.bam     # 按坐标排序（8线程）
samtools sort -n -o namesort.bam input.bam     # 按读段名排序（某些工具需要）
samtools index sorted.bam                      # 生成 .bai 索引

# ── 统计 ──
samtools flagstat sample.bam                   # 各类读段计数
samtools idxstats sample.bam                   # 每条染色体的读段数
samtools stats sample.bam | grep "^SN"         # 详细统计（插入片段大小等）

# ── 查看特定区域 ──
samtools view sample.bam chr1:1000000-2000000  # 查看特定坐标区域
samtools view sample.bam -L regions.bed        # 查看 BED 文件指定区域

# ── 深度统计 ──
samtools depth -a sample.bam > depth.txt       # 每个碱基的覆盖深度（-a 包含0深度位置）
samtools coverage sample.bam                   # 每条染色体的覆盖统计

# ── 常用过滤 ──
samtools view -b -q 20 sample.bam > q20.bam    # 保留 MAPQ≥20 的读段
samtools view -b -F 1796 sample.bam > clean.bam # 去除未比对、重复、次要比对
# 1796 = 4(未比对) + 256(次要) + 512(QC fail) + 1024(重复)
```

**flagstat 输出解读：**
```
500000000 + 0 in total (QC-passed reads + QC-failed reads)
498500000 + 0 primary         ← 主要比对（排除secondary和supplementary）
0 + 0 secondary               ← 次要比对（一条读段比对到多处）
1500000 + 0 supplementary     ← 补充比对（嵌合读段的其他部分）
45000000 + 0 duplicates       ← PCR重复（比例=45M/500M=9%，WGS正常）
498500000 + 0 primary duplicates
496000000 + 0 mapped (99.20%) ← 比对率，WGS正常>95%，WES>90%
498500000 + 0 primary mapped (99.70%)
500000000 + 0 paired in sequencing
250000000 + 0 read1
250000000 + 0 read2
494000000 + 0 properly paired (98.80%)  ← 正确配对率，正常>90%
```

### 用 pysam 在 Python 中操作 BAM

```python
import pysam

# 读取 BAM 文件
bam = pysam.AlignmentFile("sample.bam", "rb")

# 遍历特定区域的所有读段
for read in bam.fetch("chr1", 925000, 926000):
    if read.is_unmapped or read.is_duplicate:
        continue
    print(f"ID: {read.query_name}")
    print(f"  位置: {read.reference_name}:{read.reference_start+1}")  # +1 转为1-based
    print(f"  FLAG: {read.flag} → {read.is_read1 and 'R1' or 'R2'}")
    print(f"  MAPQ: {read.mapping_quality}")
    print(f"  CIGAR: {read.cigarstring}")
    print(f"  序列: {read.query_sequence}")
    print(f"  NM标签: {read.get_tag('NM')}")  # 编辑距离

# 计算某区域的覆盖深度
for pileup_col in bam.pileup("chr1", 925950, 925955):
    pos = pileup_col.reference_pos + 1  # 转为1-based
    depth = pileup_col.nsegments
    bases = [p.alignment.query_sequence[p.query_position] 
             for p in pileup_col.pileups if not p.is_del]
    print(f"chr1:{pos}  深度={depth}  碱基分布={dict(zip(*zip(*[(b, bases.count(b)) 
          for b in set(bases)]))[::-1])}")

bam.close()
```

---

## 2.3 VCF：变异检测结果

VCF（Variant Call Format）是变异检测的标准输出格式，由 1000 Genomes 项目制定。

### 文件结构

```
##fileformat=VCFv4.3                        ← 元信息行（双 ## 开头）
##FILTER=<ID=PASS,Description="All filters passed">
##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth">
##INFO=<ID=AF,Number=A,Type=Float,Description="Allele Frequency">
##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read Depth">
##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
##reference=hg38
#CHROM  POS     ID      REF  ALT  QUAL  FILTER  INFO           FORMAT    sample1
chr1    925952  rs1234  G    A    .     PASS    DP=45;AF=0.5   GT:DP:GQ  0/1:45:99
chr1    930100  .       AT   A    50    PASS    DP=30;AF=0.33  GT:DP:GQ  0/1:30:87
```

文件由三部分组成：
1. `##` 开头的元信息（Metainfo）：定义所有 INFO 和 FORMAT 字段的含义
2. `#CHROM` 开头的列标题行
3. 数据行：每行一个变异位点

### 9 个固定字段

| 字段 | 含义 | 注意 |
|------|------|------|
| CHROM | 染色体 | 格式因文件而异：`chr1` vs `1`（hg38 用 `chr` 前缀，老版本有时不用） |
| POS | 位置 | **1-based**，闭区间 |
| ID | 变异 ID | dbSNP 里的 `rs` 编号，未知则 `.` |
| REF | 参考等位基因 | 参考基因组在该位置的碱基 |
| ALT | 替代等位基因 | 样本中的变异碱基，多个用 `,` 分隔 |
| QUAL | 质量分 | Phred 格式，反映变异的可信度，`.` 表示无 |
| FILTER | 过滤结果 | `PASS` 表示通过；其他值是过滤原因标签 |
| INFO | 位点级注释 | 分号分隔的 `KEY=VALUE` 对 |
| FORMAT | 样本字段格式 | 定义后续样本列的字段顺序 |

之后每一列是一个样本，按 FORMAT 定义的顺序排列。

### 理解 REF/ALT 的编码规则

**SNP**（单碱基替换）：
```
REF=G  ALT=A   → G 变成了 A
```

**Indel 的锚定碱基规则（Anchor Base）：**
VCF 规定 Indel 必须包含一个锚定碱基（通常是前面的碱基），因为纯 Indel 没有明确的坐标：

```
位置：chr1:930100
参考：  ...A T C G...
删除 T：...A _ C G...  → REF=AT  ALT=A（包含锚定碱基 A）

位置：chr1:930100
参考：  ...A _ C G...
插入 T：...A T C G...  → REF=A   ALT=AT（包含锚定碱基 A）
```

**多等位基因位点（Multi-allelic）：**
```
REF=G  ALT=A,T   → 该位置有两种变异（G→A 和 G→T）
```
GATK 默认输出多等位基因合并在一行，某些下游工具需要先用 `bcftools norm -m -` 拆分。

### INFO 字段：位点级注释

INFO 字段是分号分隔的键值对，每个键的含义在头部的 `##INFO` 行定义。

**GATK HaplotypeCaller 常见 INFO 字段：**

| 标签 | 全称 | 含义 |
|------|------|------|
| DP | Depth | 该位点总覆盖深度（所有样本） |
| AF | Allele Frequency | 替代等位基因频率（肿瘤样本重要指标） |
| AN | Allele Number | 总等位基因数（二倍体 n 个样本 = 2n） |
| AC | Allele Count | 替代等位基因计数 |
| QD | Quality by Depth | QUAL/DP，归一化的质量指标（>2 为合格） |
| MQ | Mapping Quality | 比对质量的均方根（>40 为合格） |
| FS | Fisher Strand | 链偏差（strand bias）的 Fisher 检验（<60 为合格） |
| SOR | Strand Odds Ratio | 另一种链偏差指标（<3 为合格） |
| MQRankSum | MQ Rank Sum | 变异 vs 参考读段的 MAPQ 差异（接近 0 最好） |
| ReadPosRankSum | ReadPos Rank Sum | 变异在读段中的位置偏差（接近 0 最好） |

### FORMAT 字段：样本级信息

**最常见的 FORMAT 字段：**

| 标签 | 含义 | 解读 |
|------|------|------|
| GT | 基因型（Genotype） | `0/0`=纯合参考，`0/1`=杂合，`1/1`=纯合突变，`./.`=无法判断 |
| DP | 该样本在此位点的读段深度 | 越高越可靠，通常需要 ≥ 10 |
| GQ | 基因型质量（Genotype Quality） | 0-99，越高越可信，通常需要 ≥ 20 |
| AD | 等位基因深度（Allele Depth） | `REF读段数,ALT读段数`，如 `25,20` |
| PL | 基因型似然（Phred-scaled Likelihood）| 三个值：`0/0,0/1,1/1` 对应的 Phred 罚分，最小值对应最可能的基因型 |
| PS | 相位集（Phase Set） | 用于单倍型分型，判断变异在哪条染色体上 |

```python
# 解析 GT 字段
def parse_gt(gt_str):
    """返回 (allele1, allele2, phased) 三元组"""
    if '|' in gt_str:
        a1, a2 = gt_str.split('|')
        phased = True
    else:
        a1, a2 = gt_str.split('/')
        phased = False
    return int(a1) if a1 != '.' else None, int(a2) if a2 != '.' else None, phased

parse_gt("0/1")   # (0, 1, False) → 非phased杂合子
parse_gt("1|0")   # (1, 0, True)  → phased，变异在第一条单倍型上
parse_gt("./.")   # (None, None, False) → 无法判断
```

**读懂一个完整的 VCF 行：**

```
chr11  5246696  rs334  T  A  2856.77  PASS  
AC=1;AN=2;DP=95;AF=0.5;QD=30.07;MQ=60.00;FS=0.0;SOR=0.705
GT:AD:DP:GQ:PL
0/1:47,48:95:99:2885,0,2827
```

解读：
- 位置 chr11:5246696，参考 T，变异 A（这正是镰刀型细胞贫血症的变异）
- INFO：总深度 95，AF=0.5（约一半读段支持变异），质量指标均正常
- 样本基因型 `0/1`：杂合子（携带者）
- AD=47,48：47 条读段支持 REF（T），48 条支持 ALT（A）
- DP=95：该样本此位点深度 95x
- GQ=99：基因型质量 99（满分），可信度极高
- PL=2885,0,2827：`0/0` 的罚分最高（2885），`0/1` 罚分为 0（最可能），`1/1` 罚分 2827

### bcftools：VCF 文件操作

```bash
# ── 格式转换 ──
bcftools view -Oz -o output.vcf.gz input.vcf   # 压缩为 bgzipped VCF
bcftools view -Ov -o output.vcf input.vcf.gz   # 解压为文本 VCF
tabix -p vcf output.vcf.gz                     # 建立索引（随机访问必须）

# ── 统计 ──
bcftools stats input.vcf.gz | head -50         # 变异统计摘要
bcftools stats input.vcf.gz | grep "^SN"       # 只看关键数字
# 重点指标：SNPs, indels, ts/tv ratio（转换/颠换比，正常约2.0-2.1）

# ── 过滤 ──
bcftools view -f PASS input.vcf.gz             # 只保留 PASS 的变异
bcftools view -v snps input.vcf.gz             # 只保留 SNP
bcftools view -v indels input.vcf.gz           # 只保留 Indel
bcftools filter -e 'QUAL<50 || DP<10' input.vcf.gz  # 表达式过滤
bcftools view -s sample1,sample2 input.vcf.gz  # 提取指定样本

# ── 区域查询 ──
bcftools view -r chr1:1000000-2000000 input.vcf.gz          # 坐标区域
bcftools view -R regions.bed input.vcf.gz                   # BED 文件区域

# ── 合并与拆分 ──
bcftools merge -Oz -o merged.vcf.gz sample1.vcf.gz sample2.vcf.gz  # 多样本合并
bcftools norm -m - input.vcf.gz                             # 多等位基因拆分为多行
bcftools norm -m + input.vcf.gz                             # 多行合并为多等位基因

# ── 常用组合（过滤后统计）──
bcftools view -f PASS input.vcf.gz | bcftools stats | grep "^SN"
```

### 用 Python 解析 VCF

```python
# 方法一：用 cyvcf2（推荐，比 pyvcf 快 10 倍）
import cyvcf2

vcf = cyvcf2.VCF("sample.vcf.gz")

for variant in vcf:
    chrom  = variant.CHROM
    pos    = variant.POS          # 1-based
    ref    = variant.REF
    alts   = variant.ALT          # 列表
    qual   = variant.QUAL
    filter = variant.FILTER       # 字符串或 None
    
    # 访问 INFO 字段
    dp  = variant.INFO.get('DP', 0)
    af  = variant.INFO.get('AF', [0])[0]  # 注意 AF 可能是数组
    
    # 访问样本 FORMAT 字段（多样本时按索引）
    gt  = variant.genotypes[0]    # [allele1, allele2, phased]
    ad  = variant.format('AD')[0] # numpy 数组
    gq  = variant.format('GQ')[0][0]
    
    # 只关注 PASS 的杂合变异
    if filter == 'PASS' and gt[0] != gt[1]:
        print(f"{chrom}:{pos} {ref}→{alts[0]} GT={gt[:2]} DP={dp} AF={af:.3f}")

vcf.close()
```

---

## 2.4 BED/GFF/GTF：基因组区间注释

这三种格式都是描述基因组上某段区间的"意义"，用于注释基因位置、外显子边界、转录本结构等。

### BED 格式

BED（Browser Extensible Data）是最简单的区间格式，至少 3 列：

```
chr1    11873    14409    DDX11L1    0    +
chr1    14362    29370    WASH7P     0    -
chr1    925951   926000   SNP_region
```

| 列 | 字段名 | 含义 |
|----|--------|------|
| 1 | chrom | 染色体名 |
| 2 | chromStart | 起始坐标（**0-based，闭区间**） |
| 3 | chromEnd | 终止坐标（**0-based，开区间**） |
| 4 | name | 区间名称（可选） |
| 5 | score | 0-1000 的得分（可选） |
| 6 | strand | `+` 或 `-`（可选） |

**BED 坐标的坑：BED 是 0-based，SAM/VCF 是 1-based！**

```
参考序列：    A  T  C  G  A
1-based 坐标：1  2  3  4  5   ← SAM POS、VCF POS、人类直觉
0-based 坐标：0  1  2  3  4   ← BED、Python 字符串索引

第 2 个碱基 T：
- VCF/SAM 表示：POS=2
- BED 表示：chromStart=1, chromEnd=2（[1,2) 开区间）
- Python：seq[1]
```

```python
# 常见坑：VCF 坐标转 BED 坐标
vcf_pos = 925952   # 1-based
bed_start = vcf_pos - 1  # 转为 0-based
bed_end   = vcf_pos      # BED 是开区间，所以 end=vcf_pos

# 反向：BED 坐标转 VCF/SAM 坐标
bed_start, bed_end = 925951, 925952
vcf_pos = bed_start + 1
```

### GFF3 格式

GFF3（General Feature Format version 3）是最通用的基因注释格式，9 列：

```
chr1  RefSeq  gene        11873  14409  .  +  .  ID=gene-DDX11L1;Name=DDX11L1
chr1  RefSeq  transcript  11873  14409  .  +  .  ID=rna-NR_046018;Parent=gene-DDX11L1
chr1  RefSeq  exon        11873  12227  .  +  .  Parent=rna-NR_046018
chr1  RefSeq  exon        12612  12721  .  +  .  Parent=rna-NR_046018
```

| 列 | 字段 | 含义 |
|----|------|------|
| 1 | seqname | 染色体/序列名 |
| 2 | source | 数据来源（RefSeq、Ensembl 等） |
| 3 | feature | 特征类型（gene/transcript/exon/CDS） |
| 4 | start | 起始（**1-based**，和 VCF 一样） |
| 5 | end | 终止（1-based，闭区间） |
| 6 | score | 得分或 `.` |
| 7 | strand | `+`/`-`/`.` |
| 8 | frame | 读码框（0/1/2，只对 CDS 有意义）|
| 9 | attributes | 键值对，分号分隔 |

### GTF 格式

GTF（Gene Transfer Format）是 GFF2 的变体，Ensembl 和 GENCODE 常用，RNA-seq 分析（STAR、featureCounts）依赖它：

```
chr1  HAVANA  gene        11869  14409  .  +  .  gene_id "ENSG00000223972"; gene_name "DDX11L1";
chr1  HAVANA  transcript  11869  14409  .  +  .  gene_id "ENSG00000223972"; transcript_id "ENST00000456328";
chr1  HAVANA  exon        11869  12227  .  +  .  gene_id "ENSG00000223972"; transcript_id "ENST00000456328"; exon_number "1";
```

GTF 和 GFF3 很像，主要区别是 attributes 列的格式不同：
- GFF3：`key=value;key2=value2`
- GTF：`key "value"; key2 "value2";`

```python
def parse_gtf_attributes(attr_str):
    """解析 GTF 的 attributes 列"""
    result = {}
    for item in attr_str.strip().split(';'):
        item = item.strip()
        if not item:
            continue
        key, _, value = item.partition(' ')
        result[key] = value.strip('"')
    return result

attrs = parse_gtf_attributes('gene_id "ENSG00000223972"; gene_name "DDX11L1";')
# {'gene_id': 'ENSG00000223972', 'gene_name': 'DDX11L1'}
```

**实际使用中 GTF 最重要的是找到每个基因的外显子坐标：**

```python
from collections import defaultdict

def load_exons_from_gtf(gtf_path):
    """返回 {gene_id: [(chrom, start, end, strand), ...]} 的外显子坐标字典"""
    gene_exons = defaultdict(list)
    with open(gtf_path) as f:
        for line in f:
            if line.startswith('#'):
                continue
            fields = line.split('\t')
            if fields[2] != 'exon':
                continue
            chrom, start, end, strand = fields[0], int(fields[3]), int(fields[4]), fields[6]
            attrs = parse_gtf_attributes(fields[8])
            gene_id = attrs.get('gene_id', '')
            gene_exons[gene_id].append((chrom, start, end, strand))
    return gene_exons
```

### bedtools：基因组区间运算

bedtools 是基因组区间运算的瑞士军刀，支持 BED/GFF/GTF/VCF 格式：

```bash
# ── 交集：找两个区间集合的重叠 ──
bedtools intersect -a variants.vcf -b genes.bed -u   # 找位于基因内的变异（-u: 只输出a）
bedtools intersect -a variants.vcf -b exons.bed -v   # 找不在外显子内的变异（-v: 反向）
bedtools intersect -a chipseq_peaks.bed -b genes.bed -wo  # 输出重叠区间及重叠长度

# ── 覆盖：计算 BAM 在 BED 区域的深度 ──
bedtools coverage -a target_regions.bed -b sample.bam     # 每个区间的覆盖统计
bedtools coverage -a target_regions.bed -b sample.bam -d  # 每个碱基位置的深度

# ── 最近邻：找最近的基因 ──
bedtools closest -a variants.bed -b genes.bed -D b        # -D b: 显示距离，b侧为参考

# ── 区间操作 ──
bedtools merge -i peaks.bed                    # 合并重叠区间
bedtools sort -i unsorted.bed                  # 排序（染色体+坐标）
bedtools subtract -a regions.bed -b blacklist.bed  # 从A中减去B中的区间
bedtools slop -i genes.bed -g hg38.chrom.sizes -b 1000  # 区间两端各延伸1000bp
bedtools complement -i genes.bed -g hg38.chrom.sizes    # 取基因间区

# ── 序列提取 ──
bedtools getfasta -fi hg38.fa -bed regions.bed -fo sequences.fa  # 提取BED区域的序列
```

---

## 2.5 其他重要格式速查

### 索引文件

比对或查询大文件时必须先建索引：

| 原始文件 | 索引文件 | 建索引命令 |
|---------|---------|-----------|
| sorted.bam | sorted.bam.bai | `samtools index sorted.bam` |
| ref.fa | ref.fa.fai | `samtools faidx ref.fa` |
| variants.vcf.gz | variants.vcf.gz.tbi | `tabix -p vcf variants.vcf.gz` |
| regions.bed.gz | regions.bed.gz.tbi | `tabix -p bed regions.bed.gz` |
| ref.fa | ref.fa + ref.amb/ann/bwt/pac/sa | `bwa index ref.fa` |

索引文件必须和原始文件在同一目录，丢失会导致工具报错。

### FASTA：参考序列格式

```
>chr1  dna:chromosome chromosome:GRCh38:1:1:248956422:1 REF
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN...ATCGATCG...
>chr2
ATCGATCG...
```

- `>` 开头是序列 ID 行
- 之后是序列，通常每行 60 或 80 个字符
- 参考基因组 FASTA 是所有分析的基础，需要先建索引（fai 和 BWA 索引）

```bash
# 提取特定区域的序列
samtools faidx hg38.fa chr1:925951-925952
# 输出:
# >chr1:925951-925952
# GT
```

---

## 2.6 动手练习：NA12878 数据实战

NA12878 是千人基因组项目的基准样本，有公开的 FASTQ、BAM、VCF 和金标准对照集，是练手的最佳选择。

### 第一步：下载数据

```bash
# 安装 SRA 工具集
conda install -c bioconda sra-tools

# 下载 NA12878 的一小部分数据（WES，~1GB）
prefetch SRR098401
fastq-dump --split-files --gzip SRR098401

# 或直接下载 Illumina 提供的公开 BAM（更快）
wget https://ftp-trace.ncbi.nlm.nih.gov/giab/ftp/data/NA12878/Garvan_NA12878_HG001_HiSeq_Exome/\
     NIST7035_TAAGGCGA_L001_R1_001.fastq.gz
wget https://ftp-trace.ncbi.nlm.nih.gov/giab/ftp/data/NA12878/Garvan_NA12878_HG001_HiSeq_Exome/\
     NIST7035_TAAGGCGA_L001_R2_001.fastq.gz
```

### 第二步：质控

```bash
fastqc NIST7035_*_R1_*.fastq.gz NIST7035_*_R2_*.fastq.gz -o ./qc/
# 检查报告：Q30比例、GC分布、接头污染
```

### 第三步：比对

```bash
# 下载 hg38 参考基因组（如果没有）
wget https://hgdownload.soe.ucsc.edu/goldenPath/hg38/bigZips/hg38.fa.gz
gunzip hg38.fa.gz
bwa index hg38.fa  # 约1小时，建一次即可

# 比对
bwa mem -t 8 \
    -R "@RG\tID:NA12878\tSM:NA12878\tPL:ILLUMINA\tLB:WES_lib1" \
    hg38.fa \
    NIST7035_*_R1_*.fastq.gz \
    NIST7035_*_R2_*.fastq.gz \
    | samtools sort -@ 8 -o NA12878.sorted.bam

samtools index NA12878.sorted.bam

# 检查比对质量
samtools flagstat NA12878.sorted.bam
```

### 第四步：用 Python 探索文件格式

```python
import pysam, cyvcf2

# 1. 看 BAM 文件的前 5 条读段
bam = pysam.AlignmentFile("NA12878.sorted.bam", "rb")
for i, read in enumerate(bam.fetch()):
    if i >= 5: break
    print(f"ID: {read.query_name}")
    print(f"  位置: {read.reference_name}:{read.reference_start+1}")
    print(f"  MAPQ: {read.mapping_quality}")
    print(f"  CIGAR: {read.cigarstring}")
    flags = [d for bit, d in {1:'paired',4:'unmapped',16:'reverse',1024:'dup'}.items() if read.flag & bit]
    print(f"  FLAGS: {flags}")
bam.close()

# 2. 计算 NA12878 某区域的平均深度
bam = pysam.AlignmentFile("NA12878.sorted.bam", "rb")
depths = [col.nsegments for col in bam.pileup("chr1", 900000, 950000)]
print(f"chr1:900000-950000 平均深度: {sum(depths)/len(depths):.1f}x")
bam.close()
```

### 第五步：和金标准 VCF 对比

GIAB（Genome in a Bottle）提供 NA12878 的高置信区间和金标准变异集：

```bash
# 下载金标准 VCF
wget https://ftp-trace.ncbi.nlm.nih.gov/giab/ftp/release/NA12878_HG001/\
     NISTv3.3.2/GRCh38/HG001_GRCh38_GIAB_highconf_CG-IllFB-IllGATKHC-Ion-10X-SOLID_CHROM1-X_v.3.3.2_highconf_PGandRTGphasetransfer.vcf.gz

# 用 bcftools 比较你的结果和金标准
bcftools stats your_result.vcf.gz gold_standard.vcf.gz
# 查看 sensitivity 和 precision
```

---

## 2.7 坐标系统总结：避开最常见的坑

生物信息学里有两套坐标系统，搞混是新手最常犯的错误：

| 格式 | 坐标系 | 区间表示 | 说明 |
|------|--------|---------|------|
| VCF | **1-based** | 闭区间 [start, end] | POS=1 表示第一个碱基 |
| SAM | **1-based** | 闭区间 [POS, POS+len-1] | POS=1 表示第一个碱基 |
| BED | **0-based** | 半开区间 [start, end) | start=0 表示第一个碱基 |
| GFF3 | **1-based** | 闭区间 [start, end] | 同 VCF |
| GTF | **1-based** | 闭区间 [start, end] | 同 VCF |
| Python 字符串 | **0-based** | 半开区间 [i, j) | seq[0] 是第一个字符 |
| UCSC Genome Browser | **0-based** | 半开区间（显示时+1）| URL 里的坐标是 0-based |

```python
# 安全的转换函数
def vcf_to_bed(chrom, vcf_pos, ref, alt):
    """VCF 坐标（1-based）转 BED 坐标（0-based）"""
    bed_start = vcf_pos - 1
    bed_end   = vcf_pos - 1 + len(ref)
    return chrom, bed_start, bed_end

def bed_to_vcf(chrom, bed_start, bed_end):
    """BED 坐标（0-based）转 VCF 坐标（1-based）"""
    return chrom, bed_start + 1
```

---

## 本阶段完成标志

- [ ] 能手动解析一条 FASTQ 记录，计算指定字符的 Phred 质量分和错误概率
- [ ] 能从 SAM FLAG 整数解码出该读段的状态（是否配对、是否重复等）
- [ ] 能看懂一条 VCF 行的所有字段，包括 GT/AD/GQ 的含义
- [ ] 能用 `samtools view/flagstat/depth`、`bcftools view/stats/filter`、`bedtools intersect` 完成日常操作
- [ ] 用 pysam 或 cyvcf2 写过 Python 脚本处理 BAM 或 VCF 文件
- [ ] 知道 VCF/SAM（1-based）和 BED（0-based）的坐标差异，能相互转换

完成后，进入 **第三阶段：主流分析场景**——把这些格式组合成完整的分析流程，包括 WGS/WES 变异检测（见 3.1-dna-analysis-tutorial.md）和 RNA-seq 差异表达分析。
