# MinerU pipeline 后端代码走读

从入口到输出，逐层追踪 pipeline 后端的执行流程。

---

## 调用链总览

```
aio_do_parse()                         # cli/common.py:760
  ├── _process_office_doc()           # Office 文件单独处理（同步→线程池）
  ├── _prepare_pdf_bytes()            # 图片→PDF 转换，页码范围截取
  ├── _process_pipeline()             # pipeline 后端路由
  │     ├── prepare_env()             # 创建输出目录
  │     ├── doc_analyze_streaming()   # 核心：逐页推理
  │     │     ├── _get_ocr_enable()   #   PDF 分类 (txt/ocr)
  │     │     ├── load_images_from_pdf_doc()  #   渲染为 PIL Image
  │     │     └── batch_image_analyze()       #   批量推理
  │     │           ├── layout_model.batch_predict()    # 布局检测
  │     │           ├── mfr_model.batch_predict()       # 公式识别
  │     │           ├── get_res_list_from_layout_res()  # 分类结果
  │     │           ├── → 表格方向 + 表格分类 + 表格 OCR
  │     │           ├── → 无线表格识别 (SlanetPlus)
  │     │           ├── → 有线表格识别 (UnetStructure)
  │     │           └── → OCR det + rec (正文)
  │     └── on_doc_ready() → _process_output()  # 异步输出
  │           ├── draw_layout_bbox() / draw_span_bbox()
  │           ├── union_make()  → .md / content_list.json
  │           └── json.dump()   → _middle.json / _model.json
  └── (vlm / hybrid 分支，跳过)
```

---

## 第一层：`aio_do_parse()` → `do_parse()`

**位置**：`mineru/cli/common.py:760`

```python
async def aio_do_parse(output_dir, pdf_file_names, pdf_bytes_list, p_lang_list,
                        backend="pipeline", parse_method="auto", ...):
```

核心逻辑三步：

### Step 1：Office 文件拦截

```python
need_remove_index = await asyncio.to_thread(
    _process_office_doc, ...  # 线程池里跑，避免阻塞 asyncio 事件循环
)
```

`_process_office_doc()` 通过 `guess_suffix_by_bytes()` 检测文件头魔数，判断是 DOCX/PPTX/XLSX 则走 office 管线，完成后将该文件从列表中移除（`need_remove_index`）。剩下的 PDF/图片继续走正常管线。

### Step 2：PDF 预处理

```python
pdf_bytes_list = _prepare_pdf_bytes(pdf_bytes_list, start_page_id, end_page_id)
```

`_prepare_pdf_bytes()` 做了两件事：
- 非 PDF 文件（图片）→ 用 `images_bytes_to_pdf_bytes()` 包装为单页 PDF
- 如果指定了 `start_page_id`/`end_page_id` → 用 pypdfium2 截取页面范围

### Step 3：路由到后端

```python
if backend == "pipeline":
    _process_pipeline(...)
elif backend.startswith("vlm-"):
    _process_vlm(...)
elif backend.startswith("hybrid-"):
    _process_hybrid(...)
```

---

## 第二层：`_process_pipeline()`

**位置**：`mineru/cli/common.py:351`

```python
def _process_pipeline(output_dir, pdf_file_names, pdf_bytes_list, p_lang_list,
                       parse_method, p_formula_enable, p_table_enable, ...):
```

### 2.1 创建输出目录

```python
for idx, pdf_bytes in enumerate(pdf_bytes_list):
    local_image_dir, local_md_dir = prepare_env(output_dir, pdf_file_name, parse_method)
    image_writer, md_writer = FileBasedDataWriter(local_image_dir), FileBasedDataWriter(local_md_dir)
```

`prepare_env()` 创建 `{output_dir}/{filename}/{parse_method}/` 目录结构——这就是我们之前发现的 `auto/` 子目录的来源。

### 2.2 双线程流水线

关键设计：**推理和输出各跑各的线程**。

```python
with ThreadPoolExecutor(max_workers=1) as output_executor:
    def on_doc_ready(doc_index, model_list, middle_json, ocr_enable):
        future = output_executor.submit(run_output_task, doc_index, middle_json, model_list)

    pipeline_doc_analyze_streaming(  # 主线程跑推理
        pdf_bytes_list, image_writer_list, p_lang_list,
        on_doc_ready,  # 每完成一个文档就回调
        ...
    )
```

- **主线程**：`doc_analyze_streaming()` 做推理
- **输出线程**：`on_doc_ready()` 回调提交 `run_output_task()` 到线程池，写 `.md` / `.json` 文件

这样推理和 IO 可以重叠，不互相阻塞。

### 2.3 `run_output_task()` → `_process_output()`

```python
def run_output_task(doc_index, middle_json, model_list):
    _process_output(
        middle_json["pdf_info"], pdf_bytes, pdf_file_name,
        local_md_dir, local_image_dir, md_writer,
        f_draw_layout_bbox, f_draw_span_bbox, ...,
        middle_json, model_list, process_mode="pipeline"
    )
```

`_process_output()` 按开关生成各类文件（见"第六层"）。

---

## 第三层：`doc_analyze_streaming()` — pipeline 核心

**位置**：`mineru/backend/pipeline/pipeline_analyze.py:157`

这是 pipeline 最核心的函数，负责**滑动窗口批处理**。

### 3.1 打开 PDF + 分类

```python
for doc_index, (pdf_bytes, image_writer, lang) in enumerate(zip(...)):
    _ocr_enable = _get_ocr_enable(pdf_bytes, parse_method)  # ← PDF 分类
    pdf_doc = open_pdfium_document(pdfium.PdfDocument, pdf_bytes)
    page_count = get_pdfium_document_page_count(pdf_doc)
    context = { 'pdf_doc': pdf_doc, 'page_count': page_count, 'ocr_enable': _ocr_enable, ... }
```

每个文档创建独立的 `context`，维护 `pdf_doc`、`next_page_idx`、`middle_json` 等状态。

#### `_get_ocr_enable()` — PDF 分类

```python
def _get_ocr_enable(pdf_bytes, parse_method):
    if parse_method == 'auto':
        return classify(pdf_bytes) == 'ocr'   # ← classify() 来自 pdf_classify.py
    if parse_method == 'ocr':
        return True
    return False
```

`classify()` 在 `mineru/utils/pdf_classify.py`，做了非常详尽的 PDF 质量检测：

| 检测项 | 阈值 | 说明 |
|--------|------|------|
| 字符密度 | < 50 字符/页 | 扫描件 |
| 极端宽高比 | > 10:1 | 可能是海报/长图 |
| Unicode 映射错误率 | ≥ 4% | CID 字体无 ToUnicode |
| 异常字符比例 | ≥ 3%（含空字符/U+FFFD/控制字符/私用区） | 乱码 PDF |
| 跨脚本混入 | Cyrillic/Arabic/Devanagari 等 > 18% | 编码错乱 |
| U+7280-U+72DF 占比 | > 2.6%（Chinese char 区块内的符号） | 可疑映射 |
| ASCII 标点连续运行 | > 10% | 目录点线或乱码 |
| 图片覆盖率 | > 80% | 纯扫描 PDF |

> 分类结果 `"txt"` → OCR 关闭，`"ocr"` → OCR 开启。

### 3.2 滑动窗口批处理

```python
window_size = get_processing_window_size(default=64)

while processed_pages < total_pages:
    # 收集各文档的下一批页面（最多 window_size 页）
    for context in doc_contexts:
        take_count = min(batch_capacity, context['page_count'] - page_start)
        images_list = load_images_from_pdf_doc(
            context['pdf_doc'], start_page_id=page_start, end_page_id=page_end, ...
        )
        batch_images.append((image, ocr_enable, lang))

    # 批量推理
    batch_results = batch_image_analyze(batch_images, ...)

    # 结果回填到各文档的 middle_json
    for context, images_list, page_start, take_count in batch_payloads:
        append_batch_results_to_middle_json(
            context['middle_json'], result_slice, images_list, ...
        )
```

流程：
1. 每次取最多 64 页
2. pypdfium2 渲染为 PIL Image
3. 调用 `batch_image_analyze()` 做推理（下一层）
4. 结果写入 `middle_json`
5. 当一个文档的所有页处理完毕 → `on_doc_ready()` 回调

---

## 第四层：`batch_image_analyze()` → `BatchAnalyze.__call__()`

**位置**：`mineru/backend/pipeline/batch_analyze.py`

这是**模型调度的核心**，按严格顺序执行：

### 流程图

```
batch_images (PIL Image 列表)
  │
  ├── 4.1  布局检测
  │        layout_model.batch_predict(pil_images)
  │        → images_layout_res: [{label, bbox, score}, ...]
  │        clean_vram()
  │
  ├── 4.2  公式识别（可选）
  │        对 layout_res 中的 display_formula / inline_formula
  │        mfr_model.batch_predict(formula_regions, np_images)
  │        → 回填 latex 到原 res
  │        clean_vram()
  │
  ├── 4.3  分类结果
  │        get_res_list_from_layout_res(layout_res)
  │        → ocr_res_list (文本区) / table_res_list (表格区)
  │        → table_inline_objects (表格内的嵌入图片/公式)
  │
  ├── 4.4  表格方向分类（可选）
  │        table_orientation_cls_model.batch_predict()
  │        → rotate_label: "0"/"90"/"270"
  │
  ├── 4.5  表格类型分类（可选）
  │        table_cls_model.batch_predict()
  │        → cls_label: "wired_table"/"wireless_table"
  │
  ├── 4.6  表格 OCR（可选）
  │        OCR det → OCR rec → 回填 ocr_result
  │
  ├── 4.7  无线表格结构识别（可选）
  │        wireless_table_model.batch_predict()
  │        → table_res["html"] (初始)
  │
  ├── 4.8  有线表格结构识别（可选）
  │        wired_table_model.predict() (逐表)
  │        → table_res["html"] (精修)
  │        HTML 裁剪：保留 <table>...</table>
  │
  └── 4.9  正文 OCR
           OCR det → 行级裁剪 → OCR rec → 回填 text
```

### 4.1 布局检测

```python
images_layout_res += run_layout_inference(
    self.model.layout_model.batch_predict,
    pil_images,
    batch_size=min(8, self.batch_ratio * 1),  # LAYOUT_BASE_BATCH_SIZE=1
)
```

模型：`PP-DocLayoutV2`（`mineru/model/layout/pp_doclayoutv2.py`）

输入一整页的 PIL Image，输出 JSON：

```python
[
  {"label": "title",     "bbox": [x0,y0,x1,y1], "score": 0.98},
  {"label": "text",      "bbox": [...], "score": 0.95},
  {"label": "table",     "bbox": [...], "score": 0.92},
  {"label": "display_formula", "bbox": [...], "score": 0.88},
  ...
]
```

### 4.2 公式识别

```python
# 从 layout_res 中筛选公式区域
for res in layout_res:
    if res.get("label") in ["display_formula", "inline_formula"]:
        page_formula_res.append(res)

# 批量预测
images_formula_list = run_mfr_inference(
    self.model.mfr_model.batch_predict,
    images_mfd_res,  # 公式元数据
    np_images,        # 整页 numpy 图（用于裁剪公式区域）
    batch_size=self.batch_ratio * 16,  # MFR_BASE_BATCH_SIZE=16
)

# 回填 LaTeX
for formula_res, formula_with_latex in zip(...):
    formula_res["latex"] = formula_with_latex.get("latex", "")
```

模型：Unimernet（默认）或 PP-FormulaNet-Plus-M

### 4.3 分类结果

```python
ocr_res_list, table_res_list, single_page_mfdetrec_res = get_res_list_from_layout_res(layout_res)
```

`get_res_list_from_layout_res()` 在 `mineru/utils/model_utils.py:148`：

```python
TEXT_REGION_LABELS = {"text", "title", "header", "footer", "page_number", ...}

for res in layout_res:
    if label in ["display_formula", "inline_formula"]:
        single_page_mfdetrec_res.append(res)
    elif label == "table":
        table_res_list.append(res)
    elif label in TEXT_REGION_LABELS:
        ocr_res_list.append(res)
    # image/seal/ref_text 等其他类型在此处去重处理后由后续步骤处理
```

同时处理**嵌套文本框去重**（`remove_nested_ocr_text_blocks()`）：如果 text 框完全被 table 框覆盖，则移除。

### 4.4-4.8 表格识别

详细流程见架构文档。关键：先分类有线/无线 → 分别用 SlanetPlus / UnetStructure 识别结构 → 生成 HTML。

### 4.9 正文 OCR

```python
for res in ocr_res_list:
    new_image, useful_list = crop_img(res, np_img, crop_paste_x=50, crop_paste_y=50)
    # 对裁剪区域做 OCR det + rec
```

- 每个 OCR 区域裁剪出来 → 送 PaddleOCR 检测文字行 → 行级裁剪 → 送 PaddleOCR 识别文字
- 结果回填到 `res["text"]`

---

## 第五层：模型单例与懒加载

**位置**：`mineru/backend/pipeline/model_init.py`

```python
class AtomModelSingleton:       # 原子模型单例（layout/ocr/mfr/table）
    def get_atom_model(self, atom_model_name, **kwargs):
        key = (atom_model_name, **kwargs)
        if key not in self._models:
            self._models[key] = atom_model_init(model_name, **kwargs)
        return self._models[key]

class ModelSingleton:           # 组合的 Pipeline 模型
    def get_model(self, lang, formula_enable, table_enable):
        key = (lang, formula_enable, table_enable)
        if key not in self._models:
            self._models[key] = custom_model_init(...)  # → MineruPipelineModel()
        return self._models[key]
```

两层单例：
- `ModelSingleton` → `MineruPipelineModel`（包含 layout + ocr + mfr + table 全部子模型）
- `AtomModelSingleton` → 各个原子模型

这种设计确保模型只加载一次，跨 batch 复用。

---

## 第六层：`_process_output()` — 输出生成

**位置**：`mineru/cli/common.py:259`

生成以下文件（按开关控制）：

| 开关 | 文件 | 生成方式 |
|------|------|----------|
| `f_draw_layout_bbox` | `_layout.pdf` | `draw_layout_bbox()` 在原 PDF 上画框 |
| `f_draw_span_bbox` | `_span.pdf` | `draw_span_bbox()` 画更细粒度的 span 框 |
| `f_dump_orig_pdf` | `_origin.pdf` | 直接写 PDF bytes |
| `f_dump_md` | `.md` | `union_make(pdf_info, MM_MD)` |
| `f_dump_content_list` | `_content_list.json` | `union_make(pdf_info, CONTENT_LIST)` |
| `f_dump_content_list` | `_content_list_v2.json` | `union_make(pdf_info, CONTENT_LIST_V2)` |
| `f_dump_middle_json` | `_middle.json` | `json.dump(middle_json)` |
| `f_dump_model_output` | `_model.json` | `json.dump(model_output)` |

`union_make()` 在 `mineru/backend/pipeline/pipeline_middle_json_mkcontent.py`，根据 `MakeMode` 枚举选择不同格式化逻辑：

```python
if f_dump_md:
    md_content_str = make_func(pdf_info, MakeMode.MM_MD, image_dir)
    # → 遍历 para_blocks，按类型生成 Markdown

if f_dump_content_list:
    content_list = make_func(pdf_info, MakeMode.CONTENT_LIST, image_dir)
    # → 平铺格式 [{type, text, bbox, page_idx}, ...]

    content_list_v2 = make_func(pdf_info, MakeMode.CONTENT_LIST_V2, image_dir)
    # → 嵌套格式 [[{type, content: {...}, bbox}, ...], ...]
```

---

## 总控流程（完整时序）

```
用户调用 aio_do_parse(doc.pdf)
  │
  ├── guess_suffix_by_bytes → 非 office，跳过
  ├── _prepare_pdf_bytes → 是 PDF，直接通过
  │
  └── _process_pipeline()
        │
        ├── prepare_env() → 创建 output/doc/auto/
        │
        ├── doc_analyze_streaming()  ─────────────────────┐
        │     │                                              │
        │     ├── classify(pdf_bytes) → "ocr" (扫描件)      │
        │     │                                              │
        │     ├── [batch 1]                                  │
        │     │   ├── pypdfium2 渲染 64 页 → PIL Image[]    │
        │     │   └── batch_image_analyze():                 │
        │     │         ├── PP-DocLayoutV2 → layout_res[]    │
        │     │         ├── Unimernet → latex (公式区域)    │
        │     │         ├── 分类: ocr_res / table_res       │
        │     │         ├── 表格方向 → 表格类型              │
        │     │         ├── SlanetPlus → table html         │
        │     │         ├── UnetStructure → wired table html│
        │     │         └── PaddleOCR → text (文本区域)     │
        │     │                                              │
        │     ├── [batch 2] ... [batch N]                   │
        │     │                                              │
        │     └── on_doc_ready() → 提交 run_output_task() ─┐│
        │                                                    ││
        └── run_output_task() (线程池)  ◄───────────────────┘│
              │                                               │
              └── _process_output():                          │
                    ├── draw_layout_bbox() → _layout.pdf     │
                    ├── union_make(MD) → .md                 │
                    ├── union_make(CONTENT_LIST)  → .json    │
                    ├── union_make(CONTENT_LIST_V2) → .json  │
                    ├── json.dump(middle_json) → _middle.json│
                    └── json.dump(model_output) → _model.json│
```

---

## 关键文件索引

| 文件 | 职责 |
|------|------|
| `cli/common.py` | 入口：`do_parse`/`aio_do_parse`、`_process_pipeline`、`_process_output` |
| `backend/pipeline/pipeline_analyze.py` | 核心：滑动窗口批处理、`doc_analyze_streaming`、`batch_image_analyze` |
| `backend/pipeline/batch_analyze.py` | 模型调度：`BatchAnalyze.__call__`，按顺序调布局→公式→表格→OCR |
| `backend/pipeline/model_init.py` | 模型单例：`MineruPipelineModel`、`AtomModelSingleton` |
| `backend/pipeline/model_list.py` | 模型枚举：`AtomicModel.Layout/MFR/OCR/WiredTable/...` |
| `backend/pipeline/model_json_to_middle_json.py` | 模型输出 → 中间 JSON 结构转换 |
| `backend/pipeline/pipeline_middle_json_mkcontent.py` | 中间 JSON → `.md` / `content_list.json` 格式化 |
| `utils/pdf_classify.py` | PDF 分类：`classify()` 判断 txt/ocr |
| `utils/model_utils.py` | 辅助：`get_res_list_from_layout_res()` 分类布局结果 |
| `utils/pdf_image_tools.py` | PDF 渲染：`load_images_from_pdf_doc()` 逐页转 PIL Image |
| `utils/config_reader.py` | 配置读取：`get_device()`、`get_processing_window_size()` |
| `model/layout/pp_doclayoutv2.py` | 布局模型：PP-DocLayoutV2 |
| `model/mfr/unimernet/Unimernet.py` | 公式模型：Unimernet |
| `model/ocr/pytorch_paddle.py` | OCR 模型：PaddleOCR PyTorch 版 |
| `model/table/rec/slanet_plus/main.py` | 表格模型：SlanetPlus |
| `model/table/rec/unet_table/main.py` | 表格模型：UnetStructure |
