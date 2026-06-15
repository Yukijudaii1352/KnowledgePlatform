### READ：实时高效异步扩散说话头生成

```yaml
id: read
name: READ
full_name: "实时异步扩散 (Real-time Efficient Asynchronous Diffusion)"
year: "2025"
org: "学术界"
paper_url: "https://arxiv.org/abs/2508.03457"
category: "talking_head"
parent: "vasa1"
motivation: "异步噪声调度实现实时性"
```

#### 📝 一句话总结

READ 提出实时音频驱动 talking-head 的扩散 Transformer 框架，通过时间 VAE、SpeechAE 和异步噪声调度大幅压缩视频/语音 token，使扩散生成从离线多步推理走向实时应用。

#### 🎯 核心要点

- 用 temporal VAE 学习时空高度压缩的视频 latent，显著减少 DiT token 数。
- 预训练 Speech Autoencoder，将语音特征压缩到与视频 latent 对齐的时间尺度。
- 采用 asynchronous noise schedule，让不同时间片在训练/推理中处于不同噪声阶段。
- DiT 在压缩 latent 空间完成音频条件去噪，兼顾速度和唇音对齐。
- 目标是解决扩散 talking-head 推理慢、实时性差的问题。

#### 🔬 深入细节

![READ 框架图](https://arxiv.org/html/2508.03457v1/x1.png)
*图：READ 框架。先预训练 SpeechAE，再用异步前向过程训练 DiT，推理时执行异步去噪以提升实时效率。*

READ 的问题设定很明确：扩散模型在 talking-head 上质量高，但标准视频扩散需要大量空间 token、时间 token 和采样步数。若直接对每帧 latent 同步去噪，延迟和吞吐都难以满足实时数字人。

第一步是压缩表示。Temporal VAE 不只压缩空间分辨率，也压缩时间维，把一段视频映射到更短、更稠密的 latent 序列；SpeechAE 则把原始语音特征压缩到相同时间粒度，避免音频 token 远多于视频 token 导致对齐困难。

第二步是异步噪声调度。传统扩散对整段 latent 使用同一个时间步 \(t\)，READ 则允许序列中不同块处在不同噪声级别。靠近当前输出的块更快完成去噪，后续块保留较高噪声继续滚动优化，从而形成连续流式生成。

```python
# READ 训练/推理核心流程
def read_inference(reference, audio):
    video_latent = init_noisy_latent_queue()
    speech_latent = speech_autoencoder(audio)
    ref_feat = encode_reference(reference)

    for realtime_tick in stream_ticks:
        # 每个 latent block 使用不同扩散步，形成异步去噪
        timesteps = asynchronous_schedule(video_latent)
        eps = dit_denoiser(video_latent, timesteps, speech_latent, ref_feat)
        video_latent = scheduler.step_async(video_latent, eps, timesteps)
        yield temporal_vae.decode_ready_frames(video_latent)
```

从公式看，READ 学的是：

$$\epsilon_\theta(z_t, t_i, c_a, c_r) \rightarrow \epsilon$$

其中每个时间块的 \(t_i\) 可以不同，\(c_a\) 是 SpeechAE 输出的语音 latent，\(c_r\) 是参考肖像条件。异步设计的直觉是：实时系统只要求“马上要播放的帧”足够干净，而不要求未来所有帧同步完成采样。

#### 🧪 练习题

```yaml
question: "READ 的异步噪声调度主要解决什么问题？"
options:
  - "让所有帧在同一步扩散中同步结束"
  - "让不同时间块处于不同去噪阶段，从而降低流式生成延迟"
  - "完全取消视频 VAE"
  - "把语音识别替换为文本输入"
answer: 1
explain: "异步调度允许即将输出的帧先完成去噪，未来帧继续滚动优化，是 READ 实时性的关键。"
```
