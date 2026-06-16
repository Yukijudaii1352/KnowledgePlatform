### Qwen3.5-Omni
```yaml
id: qwen3.5-omni
name: Qwen3.5-Omni
full_name: 通义千问3.5全模态版 (Qwen3.5-Omni)
year: '2026'
org: 阿里通义
paper_url: https://qwen.ai/blog/qwen2.5-omni/
category: frontier_2026
parent: gemini-1.5
motivation: Thinker-Talker双核低延迟架构
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/qwen3.5-omni_detail.md
```

#### 📝 一句话总结
Qwen3.5-Omni 沿用并扩展 Thinker-Talker 双核架构，用 Hybrid-Attention MoE、长上下文音视频输入、多码本流式语音和 ARIA 对齐机制，把文本、图像、音频、视频理解与实时语音输出统一到低延迟 omni agent 中。

#### 🎯 核心要点
- Thinker-Talker 架构：Thinker 负责多模态理解、推理和文本生成，Talker 接收 Thinker 表征并生成流式语音。
- Hybrid-Attention MoE：Thinker 和 Talker 都采用 Hybrid MoE，并利用 Gated Delta Net 降低长音视频序列 KV-cache I/O。
- 长上下文多模态：支持 256k context，公开报告称可处理超过 10 小时音频和 400 秒 720P、1 FPS 音视频输入。
- AuT 音频编码器：Audio Transformer 从头训练，FBank 经 4 个 Conv2D block 下采样 16 倍，得到 6.25 Hz audio tokens。
- 时间感知输入：继承 TM-RoPE 思路，并加入显式秒级 timestamp，缓解长视频中绝对时间位置过稀疏的问题。
- 多码本流式语音：Talker 预测 RVQ 多码本 token，MTP 输出当前 frame 的残差码本，Code2Wav/causal ConvNet 增量合成 waveform。
- ARIA：Adaptive Rate Interleave Alignment 将文本和语音组织为单一交错流，用单调比例约束减少漏字、错读和数字读法不稳定。
- 后训练：Thinker 做 multimodal post-training，Talker 经过通用、长上下文、DPO/GSPO 强化学习和 speaker fine-tuning 四阶段训练。

#### 🔬 深入细节
![Qwen3.5-Omni Thinker-Talker 架构](https://arxiv.org/html/2604.15804v2/figures/model.jpg)
*图：Qwen3.5-Omni 总览。输入元信息中的链接是 Qwen2.5-Omni 博客，Qwen3.5-Omni 的公开技术报告对应 arXiv `2604.15804`。*

```python
# Qwen3.5-Omni 流式理解和语音生成的抽象流程
thinker_cache = KVCache()
talker_cache = KVCache()

for chunk in multimodal_stream():
    text_tokens = tokenize_text(chunk.text)
    audio_tokens = AuT(chunk.audio)              # 6.25 Hz after Conv2D downsampling
    vision_tokens = vision_encoder(chunk.frames)
    timestamp_tokens = format_timestamps(chunk.time)

    thinker_inputs = interleave(
        text_tokens,
        timestamp_tokens,
        audio_tokens,
        vision_tokens,
    )
    thinker_hidden, text_out = thinker.stream_decode(
        thinker_inputs,
        cache=thinker_cache,
    )

    # ARIA creates one monotonic interleaved text-speech stream
    aligned_units = aria_schedule(text_out, global_speech_text_ratio)
    for unit in aligned_units:
        if unit.kind == "text":
            emit_text(unit.token)
        else:
            rvq_codes = talker.predict_multi_codebook(
                thinker_hidden=thinker_hidden,
                text_prefix=text_out,
                cache=talker_cache,
            )
            audio_chunk = code2wav.stream(rvq_codes)
            play(audio_chunk)
```

Qwen3.5-Omni 的基本分工是“Thinker 管语义，Talker 管声音”。Thinker 接收文本、图像、音频和音视频输入，通过 Vision Encoder 与 AuT 将非文本信号变成 token，再在统一上下文中生成文本和高层隐藏状态。Talker 不再重新理解世界，而是读取 Thinker 的上下文、文本输出和多模态表征，决定语音的发音、情感、音量、速度和说话人风格。

这种拆分可以写成两级条件生成：

$$
H, y_{1:T}
=\mathrm{Thinker}_{\theta}(x^{text}, x^{img}, x^{aud}, x^{vid})
$$

$$
p_{\phi}(q_{1:N}\mid H,y_{1:T},s)
=\prod_{n=1}^{N}p_{\phi}(q_n\mid q_{<n},H,y_{1:T},s)
$$

其中 \(H\) 是 Thinker 的高层表示，\(y\) 是文本响应，\(s\) 是 Talker 的声音控制 system prompt，\(q\) 是 RVQ speech codec token。这样做的直觉是：语义推理和多模态 grounding 交给大模型主干，声学细节由专门的语音生成模块承担，避免主干在高频 speech token 上浪费解码预算。

AuT 解决的是长音频输入进入 LLM 的吞吐问题。公开报告描述 AuT 使用从头训练的 transformer 音频编码器，音频 FBank 特征先经过 4 个 Conv2D block 下采样 16 倍，再进入 self-attention，得到约 6.25 Hz 的 audio token。若原始声学帧率是 \(100\) Hz，则下采样后 token 率为：

$$
r_{\mathrm{audio}}=\frac{100}{16}=6.25\ \mathrm{tokens/s}
$$

这使 10 小时级音频在 256k 上下文中更可行。对音视频，Qwen3.5-Omni 还显式插入秒级 timestamp，并让音频每 160 ms 对应一个 temporal ID，视频帧按实际时间戳映射到同一 160 ms 分辨率，减少长视频中仅依赖绝对位置 ID 导致的稀疏和外推困难。

Talker 的语音输出采用多码本预测。对第 \(t\) 个声学 frame，RVQ token 可写为：

$$
q_t=(q_t^{(1)},q_t^{(2)},\ldots,q_t^{(C)})
$$

$$
p(q_t\mid H,q_{<t})
=p(q_t^{(1)}\mid H,q_{<t})
\prod_{c=2}^{C}p(q_t^{(c)}\mid H,q_{<t},q_t^{(<c)})
$$

更严格地说，上式的乘积项表示对多码本条件概率的分解。MTP module 在每个解码步输出当前 frame 的残差码本，随后 causal streaming ConvNet codec decoder 增量合成 waveform，因此第一包音频不必等完整句子生成完才能播放。

ARIA 针对的是文本 token 与语音 token 速率不匹配。Qwen3-Omni 的双轨 Talker 需要同步文本轨和语音轨，容易出现漏词、错读数字或某些低编码效率语言的语音延迟。Qwen3.5-Omni 将它改成一个单通道交错流，并约束任意前缀中的累计 speech-to-text 比例不超过样本级全局比例：

$$
\rho=\frac{N_{\mathrm{speech}}}{N_{\mathrm{text}}},\qquad
\frac{N_{\mathrm{speech}}(k)}{\max(1,N_{\mathrm{text}}(k))}\le \rho
$$

这个约束让模型可以先生成任意长度文本前缀，再接上相应 speech token，但不能让语音 token 相对文本过度超前。它比固定 text:speech token 比例更灵活，也比强制 MFA 对齐更适合端到端流式生成。

训练流程上，Qwen3.5-Omni 先做大规模 omnimodal pretraining，数据包括图文、视频文本、音频文本、视频音频、视频音频文本和纯文本；报告中的 General Stage 使用约 4T token，其中音频约 1.99T、图像约 0.95T、文本约 0.92T。Talker 后训练分为四步：通用多语种语音上下文预训练、长上下文 CPT、基于人类偏好的 DPO 与规则奖励/GSPO、最后做轻量 speaker fine-tuning。这个训练顺序对应了从“会说”到“按上下文自然地说”，再到“按偏好和目标音色说”的逐步约束。

> 💡 关键：Qwen3.5-Omni 的低延迟来自两层设计：Thinker 用 chunked prefilling 和 Hybrid MoE 快速产出语义与文本，Talker 用多码本、MTP 和 ARIA 把文本与语音流稳定地交错成可播放音频。

#### 🧪 练习题
```yaml
question: "Qwen3.5-Omni 中 ARIA 主要解决什么问题？"
options:
  - "将图像 patch 压缩成更少视觉 token"
  - "动态对齐文本和语音 token 的生成速率，减少流式语音中的漏词、错读和同步开销"
  - "把 MoE 专家全部改为稠密 FFN"
  - "取消 Talker，让 Thinker 直接输出 waveform"
answer: 1
explain: "ARIA 将文本和语音组织为单一交错流，并用自适应比例约束处理不同语言和不同 tokenization 效率下的同步问题。"
```
