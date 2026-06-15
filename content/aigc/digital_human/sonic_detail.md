### Sonic：面向全局音频感知的肖像动画

```yaml
id: sonic
name: Sonic
full_name: "全局音频感知 (Shifting Focus to Global Audio Perception)"
year: "2025"
org: "阿里巴巴"
paper_url: "https://arxiv.org/abs/2410.10223"
category: "talking_head"
parent: "hallo"
motivation: "全局-局部音频注入提升表达力"
```

#### 📝 一句话总结

Sonic 将音频条件从“局部短窗驱动口型”扩展为“全局语义/韵律感知 + 局部音素对齐”的联合注入，解决长时肖像动画中表情单薄、节奏不连贯和局部口型过拟合的问题。

#### 🎯 核心要点

- 提出全局音频感知框架，将整段语音的韵律、停顿和情绪趋势编码为全局条件。
- 保留局部音频注入，用短窗音频特征对齐每一帧的唇形和下颌运动。
- 在扩散式视频生成骨干中融合参考图像、局部音频 token、全局音频 token 和时序运动信息。
- 相比 Hallo 类分层音频注入，重点增强跨句子、跨片段的表达一致性。
- 适用于长时 talking-head 生成，尤其缓解只有局部音素时常见的机械口型和表情漂移。

#### 🔬 深入细节

![Sonic 框架图](https://arxiv.org/html/2411.16331v1/x1.png)
*图：Sonic 公开 arXiv HTML 中的整体框架图，展示参考图像、音频条件和视频扩散生成骨干的协同关系。*

> ⚠️ 资料限制：manifest 中的 `paper_url` 指向 `2410.10223`，快速核验后与 Sonic 论文不匹配；本文依据公开可匹配的 Sonic 论文题名、HTML 图资源和该方向公开方法整理，YAML 仍保留 manifest 原始链接。

Sonic 的动机来自一个常见缺陷：多数音频驱动肖像方法只看当前帧附近的音频窗口，因此能对齐嘴唇，却难以理解更长范围内的语气、停顿、重音和情绪变化。局部窗口足以决定“这一帧嘴张多大”，但不足以决定“这一句话整体应该如何起伏、何时点头、何时收敛表情”。

方法上，Sonic 可以理解为在扩散式 talking-head 骨干上增加两级音频条件。局部分支提取与帧同步的 wav2vec/Hubert 类特征，进入 cross-attention 或调制层，负责精细唇形；全局分支对整段音频或较长上下文做 Transformer 聚合，得到全局韵律 token，再在视频 UNet/DiT 的时序层中注入，负责长程表情和头部动态。

核心条件可以写为：

$$\epsilon_\theta = f_\theta(z_t, t, I_{ref}, A_{local}, A_{global})$$

其中 \(z_t\) 是带噪视频 latent，\(I_{ref}\) 是身份参考图，\(A_{local}\) 提供帧级音素/能量线索，\(A_{global}\) 提供句子级节奏和情绪上下文。这样设计的直觉是：局部音频约束“准确”，全局音频约束“自然”。

```python
# Sonic 核心流程伪代码
def sonic_generate(reference_image, audio):
    ref_feat = reference_encoder(reference_image)
    local_tokens = audio_encoder(audio, window="frame_aligned")
    global_tokens = global_audio_transformer(audio)

    z = sample_video_noise()
    for step in diffusion_steps:
        cond = fuse_conditions(ref_feat, local_tokens, global_tokens)
        eps = video_denoiser(z, step, cond)
        z = scheduler.step(z, eps, step)
    return video_decoder(z)
```

与只用局部音频的框架相比，Sonic 的关键收益不是单帧指标上的小幅提升，而是长序列观感：停顿时嘴部和脸部能自然静止，重音附近表情/头部运动更明显，句间过渡更少突然抖动。它也延续 Hallo 系列的思想：不把音频直接变成像素，而是在视频扩散模型中作为多尺度条件参与生成。

#### 🧪 练习题

```yaml
question: "Sonic 引入全局音频感知的主要目的是什么？"
options:
  - "替代参考图像编码器以减少显存"
  - "利用整段语音的韵律和语义上下文增强长时表情与运动一致性"
  - "只提升单帧图像分辨率"
  - "将扩散模型改为 GAN"
answer: 1
explain: "局部音频负责帧级口型，全局音频提供长程韵律、停顿和情绪趋势，从而提升自然度和时序一致性。"
```
