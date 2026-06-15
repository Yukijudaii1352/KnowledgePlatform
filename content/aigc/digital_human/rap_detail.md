### RAP：基于 Video DiT 的实时音频驱动肖像动画

```yaml
id: rap
name: RAP
full_name: "实时音频驱动肖像 (Real-time Audio-driven Portrait with Video DiT)"
year: "2026"
org: "腾讯"
paper_url: "https://arxiv.org/abs/2601.23456"
category: "talking_head"
parent: "vasa1"
motivation: "Video DiT架构实时生成"
```

#### 📝 一句话总结

RAP 用高度压缩的图像/音频 token 和 Video Diffusion Transformer 统一生成实时 talking portrait，在低延迟约束下兼顾口型同步、表情自然度和背景稳定性。

#### 🎯 核心要点

- 以参考图像和音频片段为输入，生成自然肖像动画。
- 将图像和音频编码为紧凑 token，降低 Video DiT 的推理成本。
- 使用混合注意力模块同时建模空间细节、时间一致性和音频对齐。
- 重点解决实时条件下压缩 latent 易丢失细节、导致音画同步变差的问题。
- 在 HDTF、VFHQ 等 talking-head 数据上与既有方法比较视觉质量和时序稳定性。

#### 🔬 深入细节

![RAP 框架图](https://arxiv.org/html/2508.05115v1/x2.png)
*图：RAP pipeline。音频和参考图像被编码为压缩 token，经 DiT 去噪生成 talking portrait 视频。*

> ⚠️ 资料限制：manifest 中的 `2601.23456` 返回 404；公开可匹配论文为 `RAP: Real-time Audio-driven Portrait Animation with Video Diffusion Transformer`，本文据此整理。

RAP 面向实时部署的难点与 READ 类似：为了快，必须使用很紧凑的 latent；但 latent 越紧凑，唇部细节、牙齿边界、微表情和背景稳定性越容易丢。RAP 的设计目标是在压缩空间中仍能保留足够的音画同步信息。

框架先把参考图像编码为身份/外观 token，把音频编码为时间对齐 token，再在 Video DiT 中执行条件去噪。混合注意力模块把空间 token、时间 token 和音频 token 放在同一生成过程中交互，避免“嘴动了但脸部其他区域不跟随”或“头部自然但口型不准”的割裂。

```python
# RAP 推理伪代码
def rap_generate(reference_image, audio_clip):
    image_tokens = image_encoder(reference_image)
    audio_tokens = audio_encoder(audio_clip)
    z = sample_compressed_video_noise()

    for step in fast_diffusion_steps:
        eps = video_dit(
            z, step,
            image_tokens=image_tokens,
            audio_tokens=audio_tokens,
            attention="hybrid_spatial_temporal_audio"
        )
        z = scheduler.step(z, eps, step)
    return video_decoder(z)
```

与纯自回归 token 方法相比，RAP 保留了扩散模型的全局修复能力；与标准视频扩散相比，它通过压缩 token 和快速采样控制延迟。它的关键工程取舍是：把高维视频细节尽量交给参考图像和解码器保持，把动态变化集中在音频相关的低维 token 中建模。

#### 🧪 练习题

```yaml
question: "RAP 在实时场景中使用压缩 token 后，最需要额外处理的问题是什么？"
options:
  - "压缩 latent 可能丢失细粒度口型和时序信息，影响音画同步"
  - "模型无法读取参考图像"
  - "视频一定只能黑白输出"
  - "音频不再需要编码"
answer: 0
explain: "实时压缩降低计算量，但也会损失细节；RAP 通过 Video DiT 和混合注意力补偿音频对齐与时序一致性。"
```
