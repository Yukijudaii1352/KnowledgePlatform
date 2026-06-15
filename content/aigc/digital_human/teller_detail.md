### Teller：实时流式音频驱动肖像动画

```yaml
id: teller
name: Teller
full_name: "实时流式音频驱动 (Real-time Streaming Audio-driven Portrait)"
year: "2025"
org: "字节跳动"
paper_url: "https://arxiv.org/abs/2409.01776"
category: "talking_head"
parent: "vasa1"
motivation: "自回归实时流式生成架构"
```

#### 📝 一句话总结

Teller 提出首个面向实时流式 talking-head 的自回归运动生成框架，用 Facial Motion Latent Generation 和 Efficient Temporal Module 在低延迟条件下生成自然连续的面部与身体细节运动。

#### 🎯 核心要点

- 采用自回归 Transformer 按流式音频逐步预测肖像运动 latent，避免等待完整音频。
- 用 Residual VQ 将隐式关键点运动压缩为离散/紧凑 motion token。
- Facial Motion Latent Generation 负责从音频和历史状态预测下一段面部运动。
- Efficient Temporal Module 对生成的运动序列做真实性与时序平滑修正。
- 面向实时应用优化首帧延迟、内存和流式稳定性，而不是离线整段重采样。

#### 🔬 深入细节

![Teller 整体框架](https://arxiv.org/html/2503.18429v1/x2.png)
*图：Teller 的实时流式音频驱动肖像动画框架，包含自回归运动 latent 生成和时序真实性增强模块。*

> ⚠️ 资料限制：manifest 中 `paper_url` 指向的 `2409.01776` 与 Teller 标题不匹配；公开可匹配论文为 `Teller: Real-Time Streaming Audio-Driven Portrait Animation with Autoregressive Motion Generation`，本文据此整理。

Teller 针对的是实时系统里的核心矛盾：高质量扩散/视频生成往往需要整段上下文和多步推理，而直播、对话代理、数字人客服需要边听边动。直接使用离线扩散模型会带来不可接受的延迟；直接逐帧回归又容易抖动、表情僵硬。

它先把复杂的面部和身体局部运动压缩到 motion latent 空间。Residual VQ 模型把隐式关键点或运动表示编码成紧凑 token，自回归 Transformer 每次接收当前音频特征和历史 motion token，预测下一组 token。论文图注指出，Teller 的 AR 输入/输出以 token pair 为单位，目的是在流式条件下同时保持局部细节和相邻帧关系。

Efficient Temporal Module 是第二个关键模块。它不重新生成整段视频，而是在低成本的时序模块中校正运动真实性，抑制自回归累积误差。最终 renderer 再把 motion latent 作用到参考肖像上生成视频帧。

```python
# Teller 流式推理伪代码
def teller_stream(reference_image, audio_stream):
    state = init_motion_tokens(reference_image)
    cache = init_transformer_cache()
    for audio_chunk in audio_stream:
        audio_feat = encode_audio(audio_chunk)
        next_tokens, cache = ar_transformer(audio_feat, state, cache)
        refined_motion = efficient_temporal_module(next_tokens, state)
        frame = portrait_renderer(reference_image, refined_motion)
        state = update_state(state, refined_motion)
        yield frame
```

与 VASA-1 等潜在运动建模方法相比，Teller 的重点不是一次性生成完整 latent 序列，而是把运动生成改造成可缓存、可递推的在线过程。这样做牺牲了一部分全局后验修正能力，但换来了实时首包输出和持续流式响应能力。

#### 🧪 练习题

```yaml
question: "Teller 为什么要采用自回归 motion token 生成？"
options:
  - "为了完全避免使用音频编码器"
  - "为了能在流式音频到达时逐步生成运动，降低实时系统延迟"
  - "为了把图像分辨率固定为 4K"
  - "为了只生成静态头像"
answer: 1
explain: "自回归结构可以缓存历史状态，并随音频 chunk 到达预测下一段运动，是实时 streaming talking-head 的关键。"
```
