# MinerU hybrid-engine 后端代码走读

hybrid-engine = pipeline 的版面检测 + VLM 的内容理解，取两者的长处。

---

## 一句话总结

> pipeline（PP-DocLayoutV2）做"哪里是什么"，VLM（MinerUClient）做"内容是什么"。

pipeline 擅长精确定位区域边界和类型判断，VLM 擅长理解内容并输出结构化文本。hybrid 把两者拼接——pipeline 检测出区域框，VLM 只负责填充内容。

---

## 与 pipeline / vlm-engine 的对比

| 维度 | pipeline | vlm-engine | hybrid-engine |
|------|----------|------------|---------------|
| 版面检测 | PP-DocLayoutV2 | VLM 自己做 | PP-DocLayoutV2 ← 同 pipeline |
| 内容提取 | OCR+MFR+表格模型 | VLM | VLM |
| 公式 | Unimernet | VLM 输出 LaTeX | VLM (medium) / VLM+Unimernet (high) |
| 表格 | SlanetPlus+UnetStructure | VLM 输出 HTML | VLM 输出 HTML |
| 文字 | PaddleOCR | VLM | VLM + OCR det sidecar |
| 精度 | ~85% | ~95% | ~95% |
| 速度 | 最快 | 慢（大模型推理） | 介于两者之间 |
| GPU | ≥4GB | ≥8GB | ≥8GB |
| effort 参数 | 无 | 无 | `medium` / `high` |

---

## 调用链总览

```
aio_do_parse(backend="hybrid-vllm-engine")
  │
  └── _async_process_hybrid()                      # cli/common.py:563
        │
        └── aio_hybrid_doc_analyze()               # hybrid_analyze.py
              │
              ├── PDF 分类 (同 pipeline)
              │     └── classify() → _ocr_enable
              │
              ├── ModelSingleton.get_model()       # VLM 引擎（同 vlm-engine）
              │
              ├── HybridModelSingleton.get_model() # pipeline 小模型（精简版）
              │     ├── PP-DocLayoutV2 (layout)
              │     ├── PaddleOCR (OCR det)
              │     └── Unimernet (公式，可选)
              │
              ├── [滑动窗口，每批 64 页]
              │     │
              │     ├── 1. 渲染 PIL Image（同 pipeline/vlm）
              │     │
              │     ├── 2. pipeline layout 检测
              │     │     └── layout_model.batch_predict() → layout_res
              │     │
              │     ├── 3. VLM 内容提取
              │     │     ├── medium: predictor.batch_extract_with_layout()
              │     │     │   VLM 只提取 pipeline 指定的区域内容
              │     │     └── high:   predictor.batch_two_step_extract()
              │     │         VLM 自由提取，pipeline layout 做辅助
              │     │
              │     ├── 4. OCR 辅助
              │     │     ├── 非 OCR 模式: OCR det + MFR → 补充文本行和公式
              │     │     └── OCR 模式: OCR det sidecar → 补充行级信息
              │     │
              │     ├── 5. 标题拆分
              │     │     └── pipeline layout 的 doc_title 框 → 拆分 VLM title
              │     │
              │     └── 6. append_page_model_list_to_middle_json()
              │
              └── finalize_middle_json()
```

---

## effort 参数：medium vs high

这是 hybrid 独有的概念，控制 pipeline 和 VLM 的分工边界。

### medium（默认，快速路径）

```
pipeline 做：布局检测 (PP-DocLayoutV2) + 表格方向分类
VLM 做：  内容提取（仅 pipeline 指定的区域）
```

VLM 不自己做布局分析，而是接收 pipeline 检测好的区域列表：

```python
vlm_blocks_list = [
    _build_medium_vlm_layout_blocks(page_layout_res, width, height)
    for page_layout_res in images_layout_res
]
window_model_list = await predictor.aio_batch_extract_with_layout(
    images_pil_list,
    vlm_blocks_list,  # ← pipeline 检测的区域，VLM 只需填内容
)
```

`_build_medium_vlm_layout_blocks()` 将 pipeline 的 layout label 映射为 VLM 理解的类型：

```python
MEDIUM_EFFORT_LAYOUT_LABEL_TO_VLM_TYPE = {
    "text": BlockType.TEXT,
    "title": BlockType.TITLE,
    "table": BlockType.TABLE,
    "image": BlockType.IMAGE,
    "chart": BlockType.CHART,
    "display_formula": BlockType.EQUATION,
    "header": BlockType.HEADER,
    "footer": BlockType.FOOTER,
    "page_number": BlockType.PAGE_NUMBER,
    ...
}
```

### high（最高精度路径）

```
pipeline 做：布局检测（辅助用）
VLM 做：  完整的 two_step_extract（同 vlm-engine）
```

VLM 自己做完整的页面理解，pipeline 的布局结果作为辅助信号（OCR 检测框、公式识别、标题拆分）。

```python
elif effort == "high":
    window_model_list = await predictor.aio_batch_two_step_extract(
        images=images_pil_list,
    )
```

---

## 第一层：`HybridModelSingleton` — pipeline 侧模型

**位置**：`mineru/backend/pipeline/model_init.py:294`

```python
class HybridModelSingleton:
    def get_model(self, lang=None, formula_enable=None):
        key = (lang, formula_enable)
        if key not in self._models:
            self._models[key] = MineruHybridModel(lang=lang, formula_enable=formula_enable)
        return self._models[key]
```

`MineruHybridModel` 只加载 pipeline 的一个子集，不需要表格结构模型（那是 VLM 的工作）：

```python
class MineruHybridModel:
    def __init__(self, lang=None, formula_enable=True):
        self.ocr_model = atom_model_manager.get_atom_model(AtomicModel.OCR, lang=lang)
        self.layout_model = atom_model_manager.get_atom_model(AtomicModel.Layout, ...)
        if formula_enable:
            self.mfr_model = atom_model_manager.get_atom_model(AtomicModel.MFR, ...)
```

对比 `MineruPipelineModel`，少加载了：`wired_table_model`、`wireless_table_model`、`table_cls_model`。表格识别完全交给 VLM。

---

## 第二层：核心推理 — `aio_hybrid_doc_analyze()`

**位置**：`mineru/backend/hybrid/hybrid_analyze.py`

### 2.1 PDF 分类（同 pipeline）

```python
_ocr_enable = ocr_classify(pdf_bytes, parse_method)
# → classify() 判断 txt/ocr，同 pipeline
```

### 2.2 滑动窗口 — 每批主要流程

```
[pipeline] 版面检测 → [VLM] 内容提取 → [pipeline] OCR 辅助 → 标题拆分
```

#### Step 1：pipeline 版面检测

```python
images_layout_res, hybrid_pipeline_model = _predict_layout_for_window(
    images_pil_list, inline_formula_enable, batch_ratio, _ocr_enable,
)
# → PP-DocLayoutV2.batch_predict() → layout_res[{label, bbox, score}, ...]
# → 过滤掉 table/image/chart/display_formula 内部的行内公式
```

#### Step 2a：medium — VLM 按 layout 提取

```python
if effort == "medium":
    # pipeline 先做表格方向分类
    _apply_medium_table_orientation_labels(images_pil_list, images_layout_res, ...)

    # 构造 VLM 输入：每个区域指定类型和 bbox
    vlm_blocks_list = [
        _build_medium_vlm_layout_blocks(layout_res, width, height)
        for layout_res in images_layout_res
    ]

    # VLM 只做内容填充
    window_model_list = await predictor.aio_batch_extract_with_layout(
        images_pil_list,
        vlm_blocks_list,          # ← pipeline 检测的区域
        image_analysis=...,
    )
```

`aio_batch_extract_with_layout` 和 `aio_batch_two_step_extract` 的区别：

| | two_step_extract | extract_with_layout |
|------|-------------------|----------------------|
| 布局 | VLM 自己检测 | 跳过，用外部提供的 |
| 输入 | PIL Image | PIL Image + layout blocks |
| 速度 | 慢（含布局推理） | 快（只做内容提取） |

#### Step 2b：high — VLM 全量提取

```python
elif effort == "high":
    window_model_list = await predictor.aio_batch_two_step_extract(
        images=images_pil_list,
    )
    # 同 vlm-engine，VLM 自己做完整的页面理解
```

#### Step 3：OCR 辅助

根据 OCR 模式和 effort 分两种策略：

```
非 OCR 模式（原生文字 PDF）:
  pipeline OCR det → 检测文本行的精确 bbox
  pipeline MFR → 识别行内公式

OCR 模式（扫描件）:
  pipeline OCR det → 提供行级 bbox 作为 sidecar
  不跑 OCR rec（文字由 VLM 提取）
```

```python
if _ocr_enable:
    # OCR 模式：OCR det 只做行定位，不做文字识别
    _apply_vlm_ocr_det_sidecars_for_window(...)
else:
    # 非 OCR 模式：OCR det + MFR 补充行级信息和公式
    window_model_list = _process_ocr_and_formulas(...)
```

#### Step 4：标题拆分

pipeline 的 layout 模型能区分 `doc_title`（文档标题）和 `paragraph_title`（段落标题），VLM 不区分——它对两种都输出 `title`。

```python
_apply_layout_title_split(window_model_list, images_layout_res, page_sizes)
# → 如果 VLM 的 title 块和 pipeline 的 doc_title 框重叠度 ≥ 80%
#   → 标记为 DOC_TITLE
#   否则 → 标记为 PARAGRAPH_TITLE
```

---

## 第三层：`_process_ocr_and_formulas()` — 非 OCR 模式辅助

```python
def _process_ocr_and_formulas(images_pil_list, model_list, inline_formula_enable, ...):
    np_images = [np.asarray(pil).copy() for pil in images_pil_list]

    if inline_formula_enable:
        # MFR 识别行内公式 → LaTeX
        inline_formula_list = run_mfr_inference(
            hybrid_pipeline_model.mfr_model.batch_predict,
            images_mfd_res, np_images,
        )

    # OCR det：检测文本行 bbox（不做 rec）
    ocr_res_list = ocr_det(
        hybrid_pipeline_model, np_images, model_list, mfd_res,
    )
```

注意：这里 OCR **只做 det（检测）不做 rec（识别）**。文字由 VLM 提取，OCR 只是补充精确的行级 bbox。

---

## 第四层：`HybridMagicModel` — hybrid 专用中间格式

**位置**：`mineru/backend/hybrid/hybrid_magic_model.py`

和 vlm-engine 的 `MagicModel` 类似，但多了 hybrid 特有的处理：

```python
class MagicModel:
    def __init__(self, page_model_list, page, scale, page_pil_img, width, height, _ocr_enable):
        self.page_blocks, self.page_inline_formula, self.page_ocr_res = \
            self._split_page_model_list(copy.deepcopy(page_model_list))
```

Hybrid 的 VLM 输出中包含 `_ocr_det_lines` 和 `_inline_formula` 等 sidecar 数据，`MagicModel` 将它们拆分出来，分别处理。

---

## 第五层：`finalize_middle_json()` — 后处理

同 vlm-engine（`cross_page_table_merge`、`apply_title_leveling`），但多了 OCR rec 步骤：

```python
def finalize_middle_json(pdf_info_list, hybrid_pipeline_model, _ocr_enable, effort="medium"):
    build_para_blocks_from_preproc(pdf_info_list)
    merge_para_text_blocks(pdf_info_list)

    if table_enable:
        cross_page_table_merge(pdf_info_list)

    apply_title_leveling_to_pdf_info(pdf_info_list)
```

如果是 OCR 模式，在 `build_para_blocks_from_preproc` 之后还要跑一次 OCR rec 来识别文字（因为之前 OCR 只做了 det）。

---

## 完整时序

```
aio_do_parse(backend="hybrid-vllm-engine", effort="medium")
  │
  └── _async_process_hybrid()
        │
        ├── classify(pdf_bytes) → _ocr_enable = False (原生 PDF)
        │
        ├── ModelSingleton.get_model("vllm-engine")      # VLM 引擎
        ├── HybridModelSingleton.get_model()              # pipeline 小模型
        │
        └── aio_hybrid_doc_analyze()
              │
              ├── [window 1: pages 1-64]
              │     │
              │     ├── pypdfium2 渲染 → PIL Image[64]
              │     │
              │     ├── PP-DocLayoutV2.batch_predict() → layout_res[64]
              │     ├── 表格方向分类 (pipeline)
              │     │
              │     ├── _build_medium_vlm_layout_blocks()
              │     │     → ContentBlock[region_type, bbox, ...]
              │     │
              │     ├── predictor.aio_batch_extract_with_layout()
              │     │     → window_model_list (VLM 填充内容)
              │     │
              │     ├── _process_ocr_and_formulas()
              │     │     ├── MFR 识别行内公式 → LaTeX
              │     │     └── OCR det → 行级 bbox
              │     │
              │     └── _apply_layout_title_split()
              │           → DOC_TITLE vs PARAGRAPH_TITLE
              │
              ├── [window 2: pages 65-100] ...
              │
              └── finalize_middle_json()
```

---

## 关键设计决策

### 为什么 layout 用 pipeline 而不用 VLM？

1. **定位精度**：pipeline 的 PP-DocLayoutV2 是专门训练的版面检测模型，bbox 精度高于通用 VLM
2. **类型区分**：pipeline 能区分 `doc_title`/`paragraph_title`/`header`/`footer`/`page_number` 等细粒度类型，VLM 只输出 `title`/`text`
3. **速度**：layout 模型很小（~30M 参数），比 VLM 的布局推理快得多
4. **复用 OCR 基础设施**：pipeline 的 OCR det 能给 VLM 提供精确的行级坐标

### 为什么表格用 VLM 而不用 pipeline 的 SlanetPlus？

VLM 直接输出 HTML 表格，对复杂表格（合并单元格、嵌套表格）的理解远优于规则+小模型方案。

### 为什么 OCR 模式和非 OCR 模式不同？

- **非 OCR（txt）**：PDF 自带文字层，VLM 可直接读取。OCR det 只提供行级 bbox 用于精确定位。
- **OCR（扫描件）**：没有文字层。pipeline 做 OCR det → OCR rec，VLM 的提取作为补充和修正。

---

## 关键文件索引

| 文件 | 职责 |
|------|------|
| `cli/common.py` | `_process_hybrid`/`_async_process_hybrid`：hybrid 后端入口 |
| `backend/hybrid/hybrid_analyze.py` | 核心：`aio_hybrid_doc_analyze`、`_process_ocr_and_formulas`、`_build_medium_vlm_layout_blocks` |
| `backend/hybrid/hybrid_magic_model.py` | VLM+pipeline 混合输出 → 内部格式（`HybridMagicModel`） |
| `backend/hybrid/hybrid_model_output_to_middle_json.py` | `blocks_to_page_info`、`finalize_middle_json` |
| `backend/pipeline/model_init.py` | `HybridModelSingleton`、`MineruHybridModel`（hybrid 用的精简版 pipeline 模型） |
| `backend/vlm/vlm_analyze.py` | `ModelSingleton`（VLM 引擎，同 vlm-engine 共享） |
| `backend/vlm/vlm_middle_json_mkcontent.py` | 输出生成（同 vlm-engine，`process_mode="vlm"`） |
