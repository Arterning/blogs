# MP4 转 RTSP/WebRTC 的流畅度调优记录

本文记录 `scripts/publish-mp4.cmd` 的一次实际调优过程，目标是把本地 MP4 通过 FFmpeg 发布到 MediaMTX，再由浏览器通过 WebRTC 流畅播放。

## 数据链路

```text
MP4 文件
  │
  │ FFmpeg 解码、重新编码、按实时速度发布
  ▼
MediaMTX RTSP
  │
  │ WebRTC
  ▼
浏览器播放器
```

这条链路中的卡顿不一定来自同一个位置，可能来自：

- MP4 本身帧率或时间戳不稳定
- FFmpeg 编码速度跟不上
- 编码瞬时码率波动过大
- 关键帧间隔不适合实时传输
- MediaMTX 或网络传输问题
- 浏览器解码、页面渲染或本机 CPU 竞争

因此，调参之前应该先确定问题出现在哪一层。

## 素材信息

使用 `ffprobe` 检查测试视频：

```powershell
ffprobe -v error `
  -show_entries format=duration,bit_rate:stream=index,codec_type,codec_name,width,height,r_frame_rate,avg_frame_rate,time_base,sample_rate,channels `
  -of json `
  .\scripts\test.mp4
```

测试素材的主要参数为：

| 项目 | 数值 |
| --- | --- |
| 视频编码 | H.264 High Profile |
| 分辨率 | 720×404 |
| 帧率 | 25 FPS |
| 视频码率 | 约 669 kbps |
| B 帧 | 存在 |
| 音频编码 | AAC |
| 采样率 | 44.1 kHz |
| 声道 | 双声道 |

源视频包含 B 帧。浏览器通过 WebRTC 播放 H.264 时通常不适合直接传输带 B 帧的视频，因此不能简单使用：

```text
-c:v copy
```

仍然需要将视频重新编码为不含 B 帧、浏览器兼容性更好的 H.264 Baseline 流。

## 调整前的参数

原脚本的视频编码部分主要使用：

```text
-c:v libx264
-preset ultrafast
-tune zerolatency
-profile:v baseline
-pix_fmt yuv420p
-crf 20
-g 30
-keyint_min 30
-sc_threshold 0
-bf 0
```

这里使用 CRF 控制画面质量。CRF 的特点是尽量保持视觉质量，但场景复杂度变化时，瞬时码率也会明显变化。

对于保存到磁盘的视频，码率波动通常不是问题；对于低延迟实时传输，过大的瞬时码率可能造成接收端缓冲不均匀，表现为画面偶尔停顿后追帧。

原来的关键帧间隔为 30 帧。对于 25 FPS 素材，相当于：

```text
30 ÷ 25 = 1.2 秒
```

关键帧体积通常远大于普通预测帧。关键帧过于频繁，会增加瞬时带宽和编码数据量。

## 最终改动

最终脚本的视频参数调整为：

```text
-c:v libx264
-preset ultrafast
-tune zerolatency
-profile:v baseline
-pix_fmt yuv420p
-b:v 1500k
-maxrate 1500k
-bufsize 3000k
-g 50
-keyint_min 50
-sc_threshold 0
-bf 0
```

完整命令位于：

```text
scripts/publish-mp4.cmd
```

### 1. 从 CRF 改为受约束的码率控制

移除：

```text
-crf 20
```

增加：

```text
-b:v 1500k
-maxrate 1500k
-bufsize 3000k
```

参数含义：

- `-b:v 1500k`：目标视频码率约为 1500 kbps。
- `-maxrate 1500k`：限制编码器的瞬时输出码率。
- `-bufsize 3000k`：设置码率控制缓冲区，大小约等于 2 秒目标码率。

这组参数的目的不是单纯降低码率，而是让数据输出更均匀，减少 WebRTC 接收端遇到突然码率峰值的概率。

1500 kbps 对当前 720×404、25 FPS 的素材有较大余量。更高分辨率可以参考以下起点：

| 分辨率 | 帧率 | 建议起始码率 |
| --- | --- | --- |
| 640×360 | 25–30 FPS | 600–1000 kbps |
| 1280×720 | 25–30 FPS | 1500–3000 kbps |
| 1920×1080 | 25–30 FPS | 3000–6000 kbps |

这些只是起点。人物动作复杂、画面纹理丰富时通常需要更高码率。

### 2. 关键帧间隔调整为 2 秒

修改前：

```text
-g 30 -keyint_min 30
```

修改后：

```text
-g 50 -keyint_min 50
```

测试视频是 25 FPS，所以 50 帧对应 2 秒：

```text
50 ÷ 25 = 2 秒
```

这样既能让新加入的 WebRTC 客户端较快等到关键帧，又不会过于频繁地产生较大的 I 帧。

如果素材是 30 FPS，可以考虑使用：

```text
-g 60 -keyint_min 60
```

通用计算方式：

```text
关键帧间隔 = 帧率 × 2
```

### 3. 禁止场景切换额外插入关键帧

```text
-sc_threshold 0
```

默认情况下，x264 可能在画面发生大幅变化时额外插入关键帧。这对普通视频压缩有帮助，但可能让实时流的码率出现不可预测的峰值。

设置为 `0` 后，关键帧节奏更加固定。

### 4. 禁用 B 帧

```text
-bf 0
```

B 帧需要参考前后帧，会增加帧重排和播放延迟。MediaMTX 官方也指出，浏览器 WebRTC 对包含 B 帧的 H.264 流兼容性不好。

实时 WebRTC 场景通常应禁用 B 帧。

### 5. 保留低延迟编码设置

```text
-preset ultrafast
-tune zerolatency
```

- `ultrafast`：降低编码复杂度和 CPU 使用量，代价是相同画质下码率更高。
- `zerolatency`：关闭或缩短编码器内部会增加延迟的缓冲机制。

当前项目还要同时运行本地 ASR 推理，因此优先减少视频编码对 CPU 的占用。

### 6. 保留 Baseline 与 yuv420p

```text
-profile:v baseline
-pix_fmt yuv420p
```

这两个参数用于提高浏览器和 WebRTC 的兼容性：

- Baseline Profile 避免使用部分复杂编码特性。
- `yuv420p` 是浏览器和硬件解码器支持最广泛的像素格式。

## 曾尝试但最终撤回的参数

调试期间曾尝试：

```text
-fflags +genpts
-fps_mode cfr
```

它们分别用于重新生成时间戳和强制输出恒定帧率。

但测试素材本身已经是标准的 25 FPS，并且时间戳正常。在约 15 秒的测试中，强制 CFR 导致 FFmpeg 报告：

```text
dup=3 drop=0
```

这表示 FFmpeg 为了满足强制帧率复制了 3 帧。重复帧虽然不等于真正的编码卡顿，但肉眼可能看到轻微顿挫。

因此最终撤回了这两个参数。经验是：

> 不要在源视频时间戳正常时无条件重建时间戳或强制帧率。

如果某个素材确实是可变帧率、时间戳损坏或时间戳不连续，再针对该素材使用这些参数。

## 音频参数

音频编码部分保持为：

```text
-c:a libopus
-b:a 64k
-ar 48000
-ac 1
-application lowdelay
```

参数含义：

- 转码为 WebRTC 兼容性良好的 Opus。
- 码率为 64 kbps。
- 采样率为 48 kHz，这是 Opus 和 WebRTC 的常用采样率。
- 转换为单声道，足够用于语音识别并减少数据量。
- 使用 Opus 低延迟模式。

ASR 后端会再次将音频转换为模型需要的 16 kHz 单声道 PCM。

## 如何判断编码器是否跟得上

运行脚本时注意 FFmpeg 的状态行：

```text
frame= 321 fps=25 ... speed=1.04x
```

重点关注：

| 字段 | 含义 |
| --- | --- |
| `fps` | FFmpeg 当前处理帧率 |
| `speed` | 处理速度相对于实时速度的倍数 |
| `dup` | 为满足帧率要求而复制的帧数 |
| `drop` | 丢弃的帧数 |

对于 25 FPS 实时流，理想状态是：

```text
fps ≈ 25
speed ≈ 1.0x
drop = 0
```

本次测试中 FFmpeg 稳定输出约 25 FPS，速度约为 `1.04x`，且没有丢帧，说明 CPU 编码能力足够，问题不是编码器处理不过来。

## 分层排查卡顿

### 1. 直接播放原始 MP4

```powershell
ffplay .\scripts\test.mp4
```

如果这里也卡顿，问题来自素材本身。

### 2. 播放 RTSP

先启动推流脚本，然后执行：

```powershell
ffplay -rtsp_transport tcp rtsp://localhost:8554/mystream
```

如果原始 MP4 流畅，但 RTSP 卡顿，应检查 FFmpeg 日志、MediaMTX 和编码参数。

### 3. 播放 WebRTC

打开：

```text
http://localhost:8889/mystream/
```

如果 RTSP 流畅而 WebRTC 卡顿，问题更可能出现在浏览器解码、WebRTC 传输或页面渲染层。

### 4. 检查本机资源竞争

当前项目会同时运行：

- FFmpeg H.264 视频转码
- FFmpeg 音频解码
- sherpa-onnx CPU 语音识别
- MediaMTX
- 浏览器视频解码与页面渲染

即使 FFmpeg 没有报告丢帧，ASR 推理也可能抢占 CPU，造成浏览器渲染不稳定。可以临时停止后端 ASR，再观察视频是否改善。

## 最终命令

脚本最终使用的核心命令如下：

```powershell
ffmpeg -hide_banner -re -stream_loop -1 -i "输入文件.mp4" `
  -map 0:v:0 -map 0:a:0? `
  -c:v libx264 `
  -preset ultrafast `
  -tune zerolatency `
  -profile:v baseline `
  -pix_fmt yuv420p `
  -b:v 1500k `
  -maxrate 1500k `
  -bufsize 3000k `
  -g 50 `
  -keyint_min 50 `
  -sc_threshold 0 `
  -bf 0 `
  -c:a libopus `
  -b:a 64k `
  -ar 48000 `
  -ac 1 `
  -application lowdelay `
  -f rtsp `
  -rtsp_transport tcp `
  "rtsp://localhost:8554/mystream"
```

其中：

- `-re` 让 FFmpeg 按正常播放速度读取 MP4，而不是尽快发送完整文件。
- `-stream_loop -1` 让视频无限循环。
- `-map 0:a:0?` 中的 `?` 表示音轨是可选的，没有音轨时仍可推送视频。

## 总结

本次改善的核心不是让 FFmpeg“跑得更快”，而是让实时数据输出更加稳定：

1. 从质量优先的 CRF 改为带上限和缓冲的码率控制。
2. 将关键帧间隔调整为适合 25 FPS 实时流的 2 秒。
3. 保持无 B 帧的 WebRTC 兼容编码。
4. 不随意重建正常素材的时间戳或强制帧率。
5. 通过 `fps`、`speed`、`dup` 和 `drop` 数据验证调优效果。

