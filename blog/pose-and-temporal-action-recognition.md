# MediaPipe Pose 与轻量时序 ONNX 动作识别方案

本文整理项目中接入 MediaPipe Pose Landmarker Lite，以及在其基础上使用轻量时序 ONNX 模型识别复杂动作的方案。

## 1. MediaPipe Pose Landmarker Lite 能做什么

Pose Landmarker Lite 适合当前 CPU 环境，不依赖 PyTorch，并且可以与现有 MediaPipe 人脸分析流程共用视频帧。

模型负责检测人体姿态，默认输出一个人的 33 个身体关键点，覆盖：

- 鼻子、眼睛、耳朵和嘴角
- 肩、肘、腕及部分手部点
- 髋、膝、踝、脚跟和脚尖

官方说明：[MediaPipe Pose Landmarker](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)

### 1.1 原始输出

| 输出 | 内容 |
| --- | --- |
| 图像坐标关键点 | 每个点包含 `x、y、z、visibility、presence`，其中 x/y 是相对于图像宽高的归一化坐标 |
| 世界坐标关键点 | 每个点包含 `x、y、z、visibility`，以髋部中心为原点，单位近似为米 |
| 人体分割掩码 | 可选，输出每个像素属于人体的概率 |
| 多人姿态 | 可通过 `num_poses` 配置，默认为 1 人 |

世界坐标适合进行关节角度和动作判断，但它是单目摄像头的估计值，不能当作精密人体尺寸测量结果。

### 1.2 可以派生的信息

利用关键点可以进一步计算：

- 肩、肘、髋和膝等关节角度
- 身体中心、朝向和倾斜程度
- 手是否高于肩膀或头部
- 身体及四肢的移动速度
- 站立、坐下、下蹲
- 左手、右手或双手举起
- 挥手、行走和跌倒疑似

需要注意，Pose Landmarker 只输出骨骼关键点，不会直接给出 `waving`、`walking` 等动作名称。简单动作可以通过规则判断，复杂动作则需要分析连续多帧。

### 1.3 模型位置

建议把模型放在：

```text
model/pose_landmarker/pose_landmarker_lite.task
```

官方下载地址：[pose_landmarker_lite.task](https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task)

### 1.4 当前项目的运行建议

- 使用 `VIDEO` 模式，利用 MediaPipe 的跨帧跟踪能力。
- CPU 环境下先使用 8～10 FPS。
- 第一版设置 `num_poses=1`。
- 暂时关闭人体分割掩码以减少 CPU 开销。
- 复用现有视觉进程解码出的 RGB 帧，不要再次连接和解码 RTSP。
- 通过 `/ws/pose` 向前端推送关键点、动作、置信度和推理耗时。

## 2. 为什么需要时序模型

单帧只能描述一个姿势。例如，手臂抬起的一帧既可能是“保持举手”，也可能是“挥手过程中的一帧”。复杂动作需要观察一段时间内关键点如何变化。

完整流程为：

```text
RTSP 视频
  -> MediaPipe Pose 提取每帧的 33 个关键点
  -> 保存最近 1～3 秒的关键点序列
  -> 轻量时序 ONNX 模型
  -> 动作类别和置信度
  -> WebSocket 推送前端
```

Pose Landmarker 回答“身体各关节在哪里”，时序模型回答“这段时间里人在做什么”。

## 3. 时序模型选型

| 方案 | 特点 | 建议 |
| --- | --- | --- |
| TCN / 1D CNN | 模型小、CPU 推理快、ONNX 兼容好 | 第一版首选 |
| GRU | 结构直观，适合小数据集 | 可选 |
| ST-GCN | 显式学习人体骨骼连接及时间变化 | 后续升级 |
| RGB 视频动作模型 | 能利用画面外观，但 CPU 开销较大 | 当前不推荐 |

第一版推荐训练一个小型 TCN。训练阶段可以使用 PyTorch，但部署时只保留导出的 ONNX 文件，运行环境不需要安装 PyTorch。

## 4. 模型输入与输出

推荐输入结构：

```text
[batch, time, joints, features]
[1, 30, 33, 4]
```

其中：

- `30`：最近 30 帧；姿态检测为 10 FPS 时对应 3 秒。
- `33`：MediaPipe 的 33 个关键点。
- `4`：`x、y、z、visibility`。

也可以展平为：

```text
[1, 30, 132]
```

为了增强动态动作识别，还可以加入相邻帧速度：

```text
x, y, z, visibility, dx, dy, dz
```

模型输出为每种动作的分数或概率：

```text
[1, action_count]
```

第一阶段可以定义以下动作类别：

```json
[
  "standing",
  "sitting",
  "walking",
  "waving",
  "drinking",
  "using_phone",
  "squatting",
  "falling"
]
```

## 5. 关键点预处理

原始关键点不能直接交给模型，否则模型可能把人物在画面中的位置和距离误认为动作特征。

每一帧建议执行：

1. 以左右髋中心作为坐标原点。
2. 使用肩宽或躯干长度缩放坐标。
3. 对低可见度关键点使用上一帧结果补充，或者置零并保留 visibility。
4. 计算相邻帧坐标差，得到运动速度。
5. 训练时加入水平翻转、轻微缩放、旋转和时间采样等数据增强。

如果某些动作需要区分左右方向，水平翻转时必须同步交换左右关键点和动作标签。

## 6. 滑动窗口实时推理

建议配置：

```text
Pose 检测频率：10 FPS
窗口长度：30 帧
窗口跨度：5 帧
动作推理频率：每 0.5 秒一次
```

伪代码：

```python
pose_buffer.append(normalized_landmarks)

if len(pose_buffer) == 30 and frame_index % 5 == 0:
    input_tensor = np.asarray(pose_buffer, dtype=np.float32)
    input_tensor = input_tensor[None, ...]

    logits = session.run(
        [output_name],
        {input_name: input_tensor},
    )[0]

    probabilities = softmax(logits[0])
```

ONNX Runtime 可以直接使用 NumPy 数据和 CPU 执行器：[ONNX Runtime Python API](https://onnxruntime.ai/docs/api/python/api_summary.html)

```python
session = ort.InferenceSession(
    "model/action_recognition/action_tcn.onnx",
    providers=["CPUExecutionProvider"],
)
```

项目已经使用 OpenVINO，后续也可以尝试 OpenVINO 原生读取 ONNX，或者使用 ONNX Runtime 的 OpenVINO Execution Provider 对 Intel 硬件进行优化：[OpenVINO Execution Provider](https://onnxruntime.ai/docs/execution-providers/OpenVINO-ExecutionProvider.html)

## 7. 动作结果稳定策略

实时分类结果可能在相似动作之间跳动，因此需要增加稳定器：

- 对最近 3～5 次预测概率做移动平均。
- 连续 2～3 次超过阈值后才切换动作。
- 最高置信度低于 `0.6` 时输出 `unknown`。
- 动作至少保持 0.5～1 秒后再允许切换。
- 对 `falling` 等重要事件设置独立阈值和冷却时间。

WebSocket 消息示例：

```json
{
  "type": "pose",
  "detected": true,
  "action": {
    "label": "waving",
    "confidence": 0.87,
    "stable": true,
    "duration_ms": 1800
  },
  "top_actions": [
    {"label": "waving", "confidence": 0.87},
    {"label": "standing", "confidence": 0.08}
  ],
  "inference_ms": 2.7
}
```

## 8. 获取动作模型的两种方式

### 8.1 训练项目专用的小型 TCN（推荐）

按照业务需要准备视频：

```text
data/
  standing/
  sitting/
  walking/
  waving/
  drinking/
  using_phone/
  falling/
```

离线使用 MediaPipe 把视频转换为关键点序列，再训练 TCN，最后导出：

```text
model/action_recognition/
  action_tcn.onnx
  labels.json
  config.json
```

这种方式具有以下优势：

- 摄像头角度和实际场景一致。
- 可以自行定义动作标签。
- 输入直接使用 MediaPipe 33 点，不需要关键点映射。
- 模型通常只有几百 KB 到几 MB，CPU 推理速度快。

### 8.2 使用公开骨骼动作模型

可以尝试 ST-GCN 等公开模型，但公开模型可能使用 COCO 17 点、OpenPose 18 点或 NTU RGB+D 25 点。因此接入前必须确认：

- 关键点数量、顺序及连接关系。
- MediaPipe 33 点到目标骨架的映射。
- 坐标归一化方法。
- 输入窗口长度和采样频率。
- 模型支持的动作类别是否符合业务需求。

公开模型适合快速实验，但训练数据的摄像头视角、动作定义和使用场景可能与本项目不同，实际效果未必优于项目专用的小模型。

## 9. 项目代码组织建议

```text
model/
  pose_landmarker/
    pose_landmarker_lite.task
  action_recognition/
    action_tcn.onnx
    labels.json
    config.json

api/app/
  pose.py
  action_features.py
  action_recognizer.py
  action_stabilizer.py
```

视觉工作进程应当复用同一份解码帧：

```text
一份 FFmpeg 解码帧
  +-- Face Landmarker
  +-- Emotion Recognition
  +-- Pose Landmarker
        +-- 关键点滑动窗口
              +-- Action ONNX
```

不要为动作模型再创建一个 RTSP 连接，否则会增加视频解码开销，还可能造成各模型之间时间不同步。

## 10. 推荐实施顺序

1. 接入 Pose Landmarker Lite 和 `/ws/pose`。
2. 在前端画出人体骨架。
3. 实现举手、站立、坐下等规则动作。
4. 增加关键点序列采集和保存工具。
5. 收集项目实际环境中的动作样本。
6. 训练小型 TCN 并导出 ONNX。
7. 在后端接入 ONNX Runtime 和动作稳定器。
8. 使用规则结果与模型结果融合，逐步替换不可靠的规则。

这条路线可以让项目先快速获得可见的动作识别能力，同时逐步积累训练数据，最终支持更复杂、更符合业务场景的动作。
