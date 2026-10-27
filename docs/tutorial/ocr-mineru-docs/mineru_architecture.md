# MinerU 原理与架构

基于 MinerU 源码（`mineru/` 目录）分析，版本 3.x。

---

## 整体流程

```
PDF / 图片 / Office 文件
        │
        ▼
  ┌─────────────────┐
  │  1. 文件预处理    │  图片→PDF 转换，Office→内部格式，PDF 分类（txt/ocr）
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  2. 页面渲染      │  pypdfium2 将 PDF 逐页渲染为 PIL Image
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  3. 布局检测      │  PP-DocLayoutV2 模型 → 每个页面的区域框（段落/标题/表格/公式/图片...）
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  4. 公式识别      │  Unimernet / PP-FormulaNet-Plus-M → 公式区域 → LaTeX
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  5. OCR 文字识别  │  PaddleOCR（PyTorch 版）→ 文本框 → 文字
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  6. 表格识别      │  SlanetPlus/UnetStructure → 表格结构 → HTML
  └────────┬────────┘
           ▼
  ┌─────────────────┐
  │  7. 后处理        │  阅读顺序排序、段落合并、标题层级、跨页合并、Markdown 生成
  └────────┬────────┘
           ▼
       .md / .json
```

---

## 三大后端

| 后端 | 命令参数 | 原理 | 适用场景 |
|------|----------|------|----------|
| **pipeline** | `-b pipeline` | 传统 CV+NLP 管线（上图流程） | CPU/中低 GPU，速度快，无幻觉 |
| **vlm-engine** | `-b vlm-engine` | 视觉大模型端到端理解 | 高精度，需 ≥8GB 显存 |
| **hybrid-engine** | `-b hybrid-engine` | pipeline 做版面检测 + VLM 做内容提取 | 最高精度，需 ≥8GB 显存 |

### pipeline 后端（默认）

经典的模块化管线，每个步骤由独立的小模型完成。我们使用的就是它。

### vlm-engine 后端

用 VLM（MinerU2.5-Pro-2605-1.2B）直接理解文档图像，一步输出 Markdown。省去布局检测→OCR→表格→公式的串行流程，但对 GPU 要求高。

### hybrid-engine 后端

pipeline 先做版面分析（确定每个区域是什么类型），再由 VLM 对各区域做精细化的内容提取。

---

## pipeline 后端使用的模型

所有模型从 HuggingFace `opendatalab/PDF-Extract-Kit-1.0` 或 ModelScope `OpenDataLab/PDF-Extract-Kit-1.0` 下载。

### 1. 布局检测 — PP-DocLayoutV2

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/Layout/PP-DocLayoutV2` |
| 代码位置 | `mineru/model/layout/pp_doclayoutv2.py` |
| 任务 | 输入页面图片，输出所有区域的 bbox + 类别标签 |
| 检测类别 | `text`、`title`、`header`、`footer`、`page_number`、`table`、`image`、`display_formula`、`inline_formula`、`seal`、`ref_text`、`page_footnote` |
| 推理锁 | `PIPELINE_LAYOUT_INFERENCE_LOCK`（与 hybrid 后端共享） |

### 2. 公式识别 — Unimernet / PP-FormulaNet-Plus-M

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/MFR/unimernet_hf_small_2503`（默认）或 `models/MFR/pp_formulanet_plus_m`（中文增强） |
| 代码位置 | `mineru/model/mfr/unimernet/Unimernet.py` |
| 任务 | 输入公式区域图片，输出 LaTeX 字符串 |
| 切换方式 | 环境变量 `MINERU_FORMULA_CH_SUPPORT=True` 切换为 PP-FormulaNet-Plus-M |
| 推理锁 | `PIPELINE_MFR_INFERENCE_LOCK` |

### 3. OCR — PaddleOCR（PyTorch 版）

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/OCR/paddleocr_torch` |
| 代码位置 | `mineru/model/ocr/pytorch_paddle.py` |
| 任务 | 文字检测（DB）+ 文字识别（CRNN），支持 109 种语言 |
| 底层 | 将 PaddleOCR 权重转为 PyTorch 加载，无需 PaddlePaddle 依赖 |
| 推理锁 | `PIPELINE_OCR_INFERENCE_LOCK` |

OCR 子模型：

| 阶段 | 模型 | 说明 |
|------|------|------|
| 检测（det） | DB（Differentiable Binarization） | 找出文字区域的边界框 |
| 识别（rec） | CRNN / SVTR | 识别框内文字内容 |

### 4. 表格识别

#### 4a. 表格方向分类 — PP-LCNet

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/TabCls/paddle_table_cls/PP-LCNet_x1_0_table_cls.onnx` |
| 代码位置 | `mineru/model/table/cls/paddle_table_cls.py` |
| 任务 | 判断表格是否旋转（0°/90°/270°），旋转纠正后送入后续模型 |
| 框架 | ONNX Runtime |

#### 4b. 表格类型分类 — MineruTableOrientationCls

| 项目 | 内容 |
|------|------|
| 代码位置 | `mineru/model/table/cls/mineru_table_ori_cls.py` |
| 任务 | 判断表格是**有线表格**（wired_table）还是**无线表格**（wireless_table） |

#### 4c. 无线表格识别 — SlanetPlus

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/TabRec/SlanetPlus/slanet-plus.onnx` |
| 代码位置 | `mineru/model/table/rec/slanet_plus/main.py` |
| 任务 | 识别无线表格结构（无边框线），输出 HTML |
| 框架 | ONNX Runtime |

#### 4d. 有线表格识别 — UnetStructure

| 项目 | 内容 |
|------|------|
| 模型路径 | `models/TabRec/UnetStructure/unet.onnx` |
| 代码位置 | `mineru/model/table/rec/unet_table/main.py` |
| 任务 | 识别有线表格结构（有边框线），输出 HTML |
| 框架 | ONNX Runtime |

### 5. 表格 OCR

表格区域内的文字由独立的 OCR 流程处理（`det_db_box_thresh=0.5` 的高精度配置），与正文 OCR 分开，避免表格框线干扰。

---

## 关键处理流程细节

### PDF 分类（`mineru/utils/pdf_classify.py`）

```python
if parse_method == "auto":
    classify(pdf_bytes)  # → "txt" 或 "ocr"
```

- 使用轻量模型判断 PDF 是**原生文字型**（txt）还是**扫描件/图片型**（ocr）
- txt 模式：直接从 PDF 提取文字，不跑 OCR
- ocr 模式：逐页渲染为图片后跑完整 OCR 流程

### 批处理窗口（Processing Window）

```python
window_size = get_processing_window_size(default=64)
```

- 多页文档分批处理，默认窗口 64 页
- 每个 batch 内：布局检测 → 公式识别 → OCR → 表格，串行但 batch 级并行
- Batch 间共享模型实例（`ModelSingleton`），只加载一次

### 模型加载策略

- **懒加载 + 单例**：`AtomModelSingleton` 和 `ModelSingleton` 确保每个（模型+参数）组合只初始化一次
- **线程锁**：pipeline 和 hybrid 后端共享原子模型，通过 `RLock` 保证推理互斥
- **VRAM 清理**：每个阶段完成后调用 `clean_vram()` 释放中间张量

### 表格识别完整流程

```
表格区域图片
  │
  ├── 1. 方向分类（PP-LCNet）→ 旋转纠正
  ├── 2. 类型分类（有线/无线）
  ├── 3. 表格 OCR det + rec
  ├── 4. 无线模型（SlanetPlus）→ 初始 HTML
  └── 5. 有线模型（UnetStructure）→ 精修 HTML（仅有线表格）
```

### 后处理（`_process_output` → `run_output_task`）

1. **阅读顺序**：按 `bbox` 从上到下、从左到右排序
2. **段落合并**：相邻文本块合并为段落
3. **标题层级**：根据 `text_level` 生成 `#` / `##` / `###`
4. **跨页表格合并**：`mineru/utils/table_continuation.py` 和 `table_merge.py`
5. **Markdown 生成**：`pipeline_middle_json_mkcontent.py` 将中间 JSON 转为 `.md`

---

## VLM 后端使用的模型

| 模型 | 路径 |
|------|------|
| MinerU VLM | HuggingFace: `opendatalab/MinerU2.5-Pro-2605-1.2B` |
| | ModelScope: `OpenDataLab/MinerU2.5-Pro-2605-1.2B` |

- 1.2B 参数的视觉语言模型
- 通过 vLLM 或 LMDeploy 部署
- 支持 `vllm-engine`、`vllm-async-engine`、`lmdeploy-engine`、`auto-engine` 四种推理引擎

---

## 模型清单速览

| 序号 | 模型 | 参数量 | 框架 | 任务 |
|------|------|--------|------|------|
| 1 | PP-DocLayoutV2 | ~30M | PyTorch | 版面检测 |
| 2 | Unimernet-Small | ~200M | PyTorch | 公式识别（默认） |
| 3 | PP-FormulaNet-Plus-M | ~200M | PyTorch | 公式识别（中文增强） |
| 4 | PaddleOCR (DB + CRNN) | ~20M | PyTorch | 文字检测+识别 |
| 5 | PP-LCNet | ~10M | ONNX | 表格方向分类 |
| 6 | SlanetPlus | ~50M | ONNX | 无线表格结构识别 |
| 7 | UnetStructure | ~50M | ONNX | 有线表格结构识别 |
| 8 | MinerU VLM 1.2B | 1.2B | vLLM/LMDeploy | VLM 端到端理解 |
