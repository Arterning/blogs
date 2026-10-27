# MinerU vlm-engine 后端代码走读

基于 MinerU 源码，逐层追踪 vlm-engine 后端的执行流程。

---

## 与 pipeline 的本质区别

| 维度 | pipeline | vlm-engine |
|------|----------|------------|
| 核心思路 | 多个小模型串行，各司其职 | 一个大 VLM 端到端理解 |
| 步骤 | 布局 → 公式 → OCR → 表格（7 步） | **两步**：页面理解 → 后处理 |
| 模型 | 7 个小模型（~500M） | 1 个 VLM（1.2B） |
| 输入 | 逐页渲染的 PIL Image | 同 |
| 输出 | 每页的 layout_res → 逐步填充 | 每页的 page_blocks（JSON）直接出来 |
| PDF 分类 | 需要（txt/ocr） | **不需要** — VLM 自己判断 |
| 公式 | 单独模型 | VLM 直接输出 LaTeX |
| 表格 | 4 个步骤（方向→分类→结构→OCR） | VLM 直接输出 HTML |
| 硬件 | CPU 可跑，GPU ≥4GB | GPU ≥8GB（vLLM/LMDeploy） |
| 精度 | ~85% | ~95% |

核心简化：**VLM 把 pipeline 的 7 个步骤压缩为了 1 次推理**。

---

## 调用链总览

```
aio_do_parse(backend="vlm-transformers")
  │
  └── _async_process_vlm()                          # cli/common.py:426
        │
        ├── prepare_env()                            # 创建输出目录
        │
        ├── aio_vlm_doc_analyze()                    # vlm_analyze.py
        │     │
        │     ├── ModelSingleton.get_model()          # 获取/初始化 MinerUClient
        │     │     └── 根据 backend 创建不同引擎
        │     │           ├─ transformers → Qwen2VL 本地加载
        │     │           ├─ vllm-engine  → vLLM LLM 引擎
        │     │           ├─ vllm-async-engine → vLLM AsyncLLM
        │     │           ├─ lmdeploy-engine → LMDeploy VLAsyncEngine
        │     │           └─ http-client   → 远程 API 调用
        │     │
        │     ├── [每批最多 64 页，滑动窗口]
        │     │     ├── pypdfium2 渲染 → PIL Image[]
        │     │     └── predictor.batch_two_step_extract() → page_blocks
        │     │
        │     └── finalize_middle_json()
        │           ├── build_para_blocks_from_preproc()  # preproc_blocks → para_blocks
        │           ├── merge_para_text_blocks()          # 段落合并
        │           ├── cross_page_table_merge()          # 跨页表格合并
        │           ├── apply_title_leveling()            # 标题层级
        │           └── cleanup_internal_metadata()       # 清理内部字段
        │
        └── _process_output(mode="vlm")               # 输出文件
              ├── union_make(MM_MD)  → .md
              ├── union_make(CONTENT_LIST)   → _content_list.json
              └── union_make(CONTENT_LIST_V2) → _content_list_v2.json
```

---

## 第一层：`_async_process_vlm()`

**位置**：`mineru/cli/common.py:426`

```python
async def _async_process_vlm(output_dir, pdf_file_names, pdf_bytes_list, backend, ...):
    parse_method = "vlm"        # 固定，不像 pipeline 有 auto/txt/ocr 之分
    f_draw_span_bbox = False    # VLM 没有 span 级别的检测
```

关键差异：
- **不需要 PDF 分类** — 不调 `_get_ocr_enable()`，VLM 自己能理解图片
- **不需要 `f_draw_span_bbox`** — pipeline 有文字行级别的 span，VLM 没有
- **`process_mode="vlm"`** — 输出时选择 `vlm_union_make()` 而非 `pipeline_union_make()`

### 逐文件处理（和 pipeline 的多文件批处理不同）

```python
for idx, pdf_bytes in enumerate(pdf_bytes_list):
    local_image_dir, local_md_dir = prepare_env(output_dir, pdf_file_name, "vlm")
    image_writer, md_writer = FileBasedDataWriter(...), FileBasedDataWriter(...)

    middle_json, infer_result = await aio_vlm_doc_analyze(
        pdf_bytes, image_writer=image_writer, backend=backend, server_url=server_url, **kwargs,
    )
    _process_output(..., middle_json, infer_result, process_mode="vlm")
```

pipeline 那边是多文档混合批处理（把多个文档的页面打包到同一个 batch），VLM 这里是**逐文档处理**，每个文档独立调一次 `aio_vlm_doc_analyze`。

---

## 第二层：`ModelSingleton.get_model()` — 引擎初始化

**位置**：`mineru/backend/vlm/vlm_analyze.py`（`ModelSingleton` 类）

这是 VLM 后端的核心——根据 `backend` 参数初始化不同的推理引擎。

### 支持的后端

| backend 参数 | 引擎 | 说明 |
|-------------|------|------|
| `transformers` | HuggingFace Transformers | 本地加载，适合开发调试 |
| `mlx-engine` | Apple MLX | macOS Apple Silicon 专用 |
| `vllm-engine` | vLLM (sync) | 高性能推理，生产环境首选 |
| `vllm-async-engine` | vLLM (async) | 异步版本，支持并发 |
| `lmdeploy-engine` | LMDeploy | 国产 GPU 友好（昇腾/寒武纪等） |
| `http-client` | 远程 HTTP | 连接已有的 `mineru-api` 实例 |

### 初始化示例：vllm-engine

```python
if backend == "vllm-engine":
    kwargs["gpu_memory_utilization"] = set_default_gpu_memory_utilization()
    kwargs["model"] = model_path
    if enable_custom_logits_processors():
        kwargs["logits_processors"] = [MinerULogitsProcessor]  # 自定义解码约束
    vllm_llm = vllm.LLM(**kwargs)
```

### 统一客户端：MinerUClient

所有后端最终都封装为 `MinerUClient`（来自 `mineru_vl_utils` 包）：

```python
predictor = MinerUClient(
    backend=backend,
    model=model,          # transformers 用
    processor=processor,  # transformers 用
    vllm_llm=vllm_llm,   # vllm-engine 用
    vllm_async_llm=...,  # vllm-async-engine 用
    lmdeploy_engine=..., # lmdeploy-engine 用
    server_url=...,       # http-client 用
    enable_table_formula_eq_wrap=True,
    image_analysis=True,
    enable_cross_page_table_merge=True,
)
```

### 模型下载

模型路径：HuggingFace `opendatalab/MinerU2.5-Pro-2605-1.2B` 或 ModelScope `OpenDataLab/MinerU2.5-Pro-2605-1.2B`

```python
if backend not in ["http-client"] and not model_path:
    model_path = auto_download_and_get_model_root_path("/", "vlm")
```

---

## 第三层：`aio_doc_analyze()` — 核心推理

**位置**：`mineru/backend/vlm/vlm_analyze.py`

### 3.1 流程概览

```python
async def aio_doc_analyze(pdf_bytes, image_writer, predictor, backend, ...):
    pdf_doc = open_pdfium_document(pdfium.PdfDocument, pdf_bytes)
    middle_json = init_middle_json()
    results = []

    # 滑动窗口：每批最多 64 页
    for window_start in range(0, page_count, window_size):
        window_end = min(page_count - 1, window_start + window_size - 1)

        # Step 1: pypdfium2 渲染页面 → PIL Image[]
        images_list = await aio_load_images_from_pdf_bytes_range(
            pdf_bytes,
            start_page_id=window_start,
            end_page_id=window_end,
        )
        images_pil_list = [item["img_pil"] for item in images_list]

        # Step 2: VLM 推理 —— 关键！
        window_results = await predictor.aio_batch_two_step_extract(
            images=images_pil_list,
            image_analysis=True,
        )

        # Step 3: 结果转换为 middle_json
        append_page_blocks_to_middle_json(
            middle_json, window_results, images_list,
            pdf_doc, image_writer, page_start_index=window_start,
        )

    # Step 4: 后处理
    finalize_middle_json(middle_json["pdf_info"])
```

和 pipeline 的最大差异在这里：**pipeline 的一个 batch 走了 7 步模型调用**，VLM 只走 `batch_two_step_extract()` **一步**。

### 3.2 `batch_two_step_extract()` — "两步提取"

这是 `MinerUClient`（来自 `mineru_vl_utils` 包）的方法。顾名思义分两阶段：

1. **Step 1 — 页面结构提取**：VLM 分析整页图片，识别所有区域（文本、标题、表格、公式、图片、页眉页脚等），输出 JSON 块列表
2. **Step 2 — 内容精炼**：对每个块的内容做二次处理——表格 HTML 格式化、公式 LaTeX 规范化、图片裁剪等

输出结构（每页）：

```python
[
    {
        "type": "title",        # 块类型
        "bbox": [0.1, 0.05, 0.9, 0.08],  # 相对坐标 (0~1)
        "content": "第一章 概述",
        "sub_type": None,
    },
    {
        "type": "text",
        "bbox": [0.1, 0.1, 0.9, 0.3],
        "content": "正文内容...",
    },
    {
        "type": "table",
        "bbox": [0.1, 0.35, 0.9, 0.6],
        "content": "<table><tr><td>...</td></tr></table>",
    },
    {
        "type": "equation",
        "bbox": [0.1, 0.65, 0.9, 0.7],
        "content": "E = mc^2",
    },
    ...
]
```

**关键**：`bbox` 是相对坐标（0~1 比例），后面在 `MagicModel` 中会乘以页面实际宽高转换为绝对像素坐标。

---

## 第四层：`blocks_to_page_info()` → `MagicModel`

**位置**：`mineru/backend/vlm/model_output_to_middle_json.py`

### 4.1 转换入口

```python
def blocks_to_page_info(page_blocks, image_dict, page, image_writer, page_index):
    scale = image_dict["scale"]

    # 获取页面实际尺寸
    width, height = map(int, page.get_size())

    # MagicModel 完成类型映射 + 结构重组
    magic_model = MagicModel(page_blocks, width, height)

    # 提取各类块
    image_blocks = magic_model.get_image_blocks()
    table_blocks = magic_model.get_table_blocks()
    ...
```

### 4.2 `MagicModel.__init__()` — VLM 输出的结构化

**位置**：`mineru/backend/vlm/vlm_magic_model.py`

这是 VLM 和 pipeline 的**关键桥梁**。`MagicModel` 将 VLM 输出的非结构化 JSON 块转换为 pipeline 兼容的内部格式。

#### 类型映射

VLM 输出的 `type` 字段 → 内部 `BlockType` / `ContentType`：

| VLM type | 内部 BlockType | ContentType |
|----------|---------------|-------------|
| `text`, `ref_text`, `header`, `footer`, `page_number`, `aside_text`, `page_footnote` | 保持原样 | `CONTENT_TYPE.TEXT` |
| `title` | `BlockType.TITLE` | `TEXT` |
| `image_caption`, `table_caption` | `BlockType.CAPTION` | `TEXT` |
| `image_footnote`, `table_footnote` | `BlockType.FOOTNOTE` | `TEXT` |
| `image` | `BlockType.IMAGE_BODY` | `IMAGE` |
| `table` | `BlockType.TABLE_BODY` | `TABLE` |
| `chart` | `BlockType.CHART_BODY` | `CHART` |
| `equation` | `BlockType.INTERLINE_EQUATION` | `INTERLINE_EQUATION` |
| `code`, `algorithm` | `BlockType.CODE_BODY` | `TEXT` |
| `list` | `BlockType.LIST` | `TEXT` |

#### 坐标转换

```python
# VLM 输出相对坐标 (0~1)，转换为绝对像素坐标
x1, y1, x2, y2 = block_bbox
x_1, y_1, x_2, y_2 = (
    int(x1 * width), int(y1 * height),
    int(x2 * width), int(y2 * height),
)
```

#### 公式处理

如果文本块内含 `\(...\)` 标记（VLM 输出的行内公式），`MagicModel` 会自动拆分为多个 span：

```python
if block_content.count("\\(") == block_content.count("\\)"):
    # 将 "文本 \(E=mc^2\) 文本" 拆为：
    #   [{type: TEXT, content: "文本 "}, {type: INLINE_EQUATION, content: "E=mc^2"}, ...]
    for match in re.finditer(r"\\\((.+?)\\\)", block_content):
        ...
```

#### 图片/表格/公式截图

```python
for span in all_spans:
    if span["type"] in [IMAGE, TABLE, CHART, INTERLINE_EQUATION]:
        span = cut_image_and_table(span, page_pil_img, ..., scale=scale)
```

和 pipeline 一样，这些区域从整页图中裁剪出来保存为独立图片。

#### 列表块合并

```python
fix_list_blocks(list_blocks, text_blocks, ref_text_blocks)
```

如果文本块 80% 以上被 list 块覆盖，则合并入 list 块。

---

## 第五层：`finalize_middle_json()` — 后处理

**位置**：`mineru/backend/vlm/model_output_to_middle_json.py:113`

```python
def finalize_middle_json(pdf_info_list):
    build_para_blocks_from_preproc(pdf_info_list)   # preproc_blocks → para_blocks
    merge_para_text_blocks(pdf_info_list)             # 段落合并
    if table_enable:
        cross_page_table_merge(pdf_info_list)         # 跨页表格合并
    apply_title_leveling_to_pdf_info(pdf_info_list)   # 标题层级后处理
    cleanup_internal_para_block_metadata(pdf_info_list)  # 清理内部字段
```

和 pipeline 相比：
- **不需要** `para_split`（段落拆分）—— VLM 已经在输出时做了
- **需要** `cross_page_table_merge`——因为跨页表格两次推理是独立的，需要后合并
- **需要** `apply_title_leveling`——VLM 可能给出不连续的标题层级

---

## 第六层：`_process_output(mode="vlm")`

**位置**：`mineru/cli/common.py:259`

```python
if process_mode == "vlm":
    make_func = vlm_union_make   # ← 和 pipeline 不同
elif process_mode == "pipeline":
    make_func = pipeline_union_make
```

`vlm_union_make()` 在 `mineru/backend/vlm/vlm_middle_json_mkcontent.py`，逻辑和 pipeline 版本类似但有些差异——比如 VLM 输出的表格 HTML 中公式用 `<eq>...</eq>` 标记需要替换为 LaTeX 定界符：

```python
def _replace_eq_tags_in_table_html(html):
    return re.sub(
        r'<eq>(.*?)</eq>',
        lambda m: f" {inline_left_delimiter}{unescape(m.group(1))}{inline_right_delimiter} ",
        html,
    )
```

---

## 完整时序

```
aio_do_parse(backend="vlm-transformers")
  │
  └── _async_process_vlm()
        │
        ├── prepare_env() → output/doc/vlm/
        │
        └── aio_vlm_doc_analyze()
              │
              ├── ModelSingleton.get_model("transformers")
              │     └── Qwen2VLForConditionalGeneration.from_pretrained()  # 加载 1.2B 模型
              │
              ├── [window 1: pages 1-64]
              │     ├── aio_load_images_from_pdf_bytes_range()
              │     │     └── pypdfium2 渲染 → PIL Image[64]
              │     │
              │     └── predictor.aio_batch_two_step_extract(images)
              │           Step 1:  VLM 推理 → 每页的 JSON 块列表
              │           Step 2:  内容精炼（表格 HTML 格式化、公式规范化）
              │           → page_blocks[64]
              │
              ├── append_page_blocks_to_middle_json()
              │     └── MagicModel(page_blocks, width, height)
              │           ├── 类型映射 (VLM type → BlockType)
              │           ├── 坐标转换 (相对→绝对)
              │           ├── 行内公式拆分
              │           ├── 图片/表格截图裁剪
              │           └── 列表块合并
              │
              ├── [window 2: pages 65-100] ...
              │
              └── finalize_middle_json()
                    ├── build_para_blocks_from_preproc()
                    ├── merge_para_text_blocks()
                    ├── cross_page_table_merge()
                    ├── apply_title_leveling()
                    └── cleanup_internal_metadata()
              │
              └── _process_output(mode="vlm")
                    ├── draw_layout_bbox()    → _layout.pdf
                    ├── vlm_union_make(MD)    → .md
                    ├── vlm_union_make(CONTENT_LIST)   → _content_list.json
                    └── vlm_union_make(CONTENT_LIST_V2) → _content_list_v2.json
```

---

## 与 pipeline 的关键代码对比

### 入口路由

```python
# cli/common.py:724
if backend == "pipeline":
    _process_pipeline(...)        # 多文档混合批处理，双线程流水线
else:
    if backend.startswith("vlm-"):
        _async_process_vlm(...)   # 逐文档处理
```

### 推理核心

| | pipeline | vlm-engine |
|------|----------|------------|
| 函数 | `batch_image_analyze()` | `predictor.batch_two_step_extract()` |
| 输入 | PIL Image + ocr_enable + lang | PIL Image |
| 输出 | `images_layout_res` (含 text/table/... 逐字段填充) | `page_blocks` (结构化 JSON) |
| 步骤 | 布局→公式→分类→表格方向→表格类型→表格OCR→表格结构→正文OCR | 1 步 |

### 后处理

| pipeline | vlm-engine |
|----------|------------|
| `para_split` 段落拆分 ✅ | `para_split` 段落拆分 ❌（VLM 已做） |
| `cross_page_table_merge` ❌（单独 `table_continuation.py`） | `cross_page_table_merge` ✅ |
| `apply_title_leveling` ❌ | `apply_title_leveling` ✅ |

---

## 关键文件索引

| 文件 | 职责 |
|------|------|
| `cli/common.py` | `_async_process_vlm`/`_process_vlm`：VLM 后端入口 |
| `backend/vlm/vlm_analyze.py` | 核心：`ModelSingleton`（引擎管理）、`aio_doc_analyze`/`doc_analyze`（推理循环） |
| `backend/vlm/vlm_magic_model.py` | VLM 输出 → 内部格式转换（`MagicModel`） |
| `backend/vlm/model_output_to_middle_json.py` | `blocks_to_page_info`、`finalize_middle_json` |
| `backend/vlm/vlm_middle_json_mkcontent.py` | `union_make`：中间 JSON → `.md` / `content_list.json` |
| `backend/vlm/utils.py` | 辅助：logits processors、默认参数 |
| `model/vlm/vllm_server.py` | vLLM 服务端启动脚本 |
| `model/vlm/lmdeploy_server.py` | LMDeploy 服务端启动脚本 |
| `utils/enum_class.py` | `ModelPath.vlm_root_hf/modelscope` |
