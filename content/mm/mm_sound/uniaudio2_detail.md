### UniAudio 2.0

```yaml
id: uniaudio2
name: UniAudio 2.0
full_name: 统一音频2.0 (UniAudio 2.0)
year: '2026.02'
org: —
paper_url: https://arxiv.org/abs/2602.04683
category: frontier_2026
parent: audiogpt
motivation: 统一音频理解与生成模型
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/uniaudio2_detail.md
```

#### 📝 一句话总结

UniAudio 2.0 提出 ReasoningCodec，将音频离散化为面向理解的 reasoning tokens 与面向高保真重建的 reconstruction tokens，从表示层解决统一音频理解和生成之间的冲突。它再用统一多流自回归 Transformer、功能分层专家和四阶段训练，把文本、语音、环境声、音乐的理解与生成放进同一个音频语言模型。

#### 🎯 核心要点

- **ReasoningCodec 双分支 tokenizer**：reasoning branch 产生文本对齐的高层感知/规划 token，reconstruction branch 产生多级重建 token
- **低帧率 reasoning tokens**：通过查询压缩与 RVQ 将连续音频特征压到约 5 Hz，降低 LLM 建模成本
- **多专家 reconstruction tokens**：融合 WavLM、Whisper 与 music SSL encoder，分别覆盖语音音素、环境声残差信息和音乐结构
- **9 流输入表示**：8 个音频 codebook stream 加 1 个文本 stream，通过 masked embedding summation 统一送入自回归模型
- **功能分层自回归架构**：底层音频理解专家、中层跨模态专家、上层音频生成专家，音频专家只更新音频位置
- **四阶段训练**：audio understanding warm-up → audio generation warm-up → audio-text pre-training → audio-text mid-training
- **大规模训练语料**：论文报告使用 100B text tokens 与 60B audio tokens，覆盖 speech、sound、music 的理解、生成、few-shot 与 zero-shot 任务

#### 🔬 深入细节

![UniAudio 2.0 总体框架](https://arxiv.org/html/2602.04683v2/x1.png)
*图：UniAudio 2.0 的总体框架。模型先用 ReasoningCodec 得到音频离散 token，再用统一多流自回归模型同时处理文本与音频。*

##### 算法伪代码

```python
# UniAudio 2.0: ReasoningCodec + 多流自回归训练流程
def reasoning_codec(audio):
    # 1) 高层 reasoning tokens：低帧率、文本对齐、服务理解与规划
    h_reason = frozen_whisper_music_encoders(audio)
    z = query_transformer(learnable_queries, h_reason, interleave_factor=5)
    r = residual_vector_quantize(z, codebooks=8)

    # 2) 多级 reconstruction tokens：服务声学细节和波形重建
    h_ph = wavlm_encoder(audio)       # speech phone semantics
    h_mu = music_ssl_encoder(audio)   # music structure
    h_env = whisper_encoder(audio)    # sound/residual cues
    h_env = film(h_env, condition=r)  # inject reasoning context
    s = concat(vq_phone(h_ph), vq_music(h_mu), rvq_env(h_env))
    return r, s

def pack_multistream(text_tokens=None, audio_tokens=None):
    # streams 0..7 are audio codebooks; stream 8 is text.
    X = []
    for token in interleave(text_tokens, audio_tokens):
        if token.is_text:
            X.append([PAD] * 8 + [token.id])
        else:
            X.append(token.audio_codebooks + [PAD])
    return X

def train_uniaudio2(batch):
    r, s = reasoning_codec(batch.audio)
    X = pack_multistream(batch.text, audio_tokens=merge(r, s))
    H = audio_understanding_experts(X, update_mask="audio_only")
    H = cross_modal_experts(H)
    H = audio_generation_experts(H, update_mask="audio_only")
    loss = lambda_text * text_next_token_loss(H, X)
    loss += lambda_audio * stream_weighted_audio_loss(H, X)
    update_all_trainable_parameters(loss)
```

##### 关键公式

ReasoningCodec 将音频 \(x\) 分解为两个互补离散流：

$$
r=\mathcal{T}_{r}(x), \qquad s=\mathcal{T}_{s}(x\mid r), \qquad \hat{x}=\mathcal{D}(s)
$$

其中 \(r\) 是 reasoning tokens，\(s\) 是 reconstruction tokens；波形只由 \(s\) 重建，避免把 reasoning token 迫成声学细节容器。多流 token 的嵌入用 masked summation 融合：

$$
h_t=\sum_{i=1}^{S}m_{t,i}E_i(x_{t,i}), \qquad S=9
$$

音频专家只更新音频位置：

$$
H'=H+M_{\mathrm{aud}}\odot(f(H)-H)
$$

最终训练目标把文本语言建模和音频多流建模加权合并：

$$
\mathcal{L}_{\mathrm{AR}}
=\lambda_{\mathrm{text}}\mathcal{L}_{\mathrm{text}}
+\lambda_{\mathrm{audio}}\mathcal{L}_{\mathrm{audio}}
$$

##### 方法解读：为什么要拆成 reasoning token 和 reconstruction token

统一音频模型最难的矛盾是“理解”和“生成”需要的表示不同。音频理解希望 token 更接近文本语义：一句话的内容、事件类型、乐器、音色、节奏变化等最好被压缩成可推理的抽象表示；音频生成则需要足够多的声学细节，否则重建的波形会丢失音色、韵律、背景和音乐纹理。传统单一路径 codec 往往在这两端做折中，token 太细会让 LLM 上下文爆炸，token 太粗又会损害生成质量。

ReasoningCodec 的做法是显式分工。Reasoning branch 用冻结音频编码器和 query transformer 产生低帧率 reasoning tokens，主要服务 ASR、caption、音频问答和层级生成规划；reconstruction branch 则用多专家特征和多级 VQ/RVQ 保留声学结构。这样，LLM 可以先在低成本 token 上形成“这段音频是什么、应该如何生成/回答”的抽象，再由 reconstruction tokens 和解码器承担波形保真。

##### 方法解读：多流表示如何统一文本与音频

UniAudio 2.0 没有把音频 token 简单拼成一个超长序列，而是把每个时间步表示成 9 个 stream：前 8 个是音频 codebook，最后 1 个是文本。文本位置只激活文本 stream，音频位置只激活音频 stream，所有无效 stream 填 PAD。经过各 stream 独立 embedding 后，用 mask 求和得到单个隐藏向量，因此外层 Transformer 仍看到一个普通自回归序列。

这种设计的好处是保留了音频 codec 的并行 codebook 结构，同时不必改造文本 LLM 的接口。对音频帧，模型可以用局部自回归解码器按 codebook 顺序预测 \(x_{t,1:K}\)；对文本 token，则继续使用标准 next-token prediction。换句话说，文本和音频共享主干时序，但预测头和损失函数按模态分开。

##### 方法解读：功能分层专家为什么只更新音频位置

论文将 Transformer 主干分成音频理解专家、跨模态专家和音频生成专家。中间的 cross-modal experts 从预训练文本 LLM 初始化，用来保留语言知识和完成跨模态语义融合；底层/上层音频专家随机初始化，分别学习音频感知和音频生成能力。关键的 audio-only update 用 \(M_{\mathrm{aud}}\) 遮罩保护文本位置，让音频专家不会破坏文本 token 的隐藏状态。

这个细节对“统一”很重要：如果所有层都同时修改文本和音频位置，模型容易在大规模音频训练中遗忘原有语言能力；如果完全冻结 LLM，又难以获得强音频生成能力。音频-only 专家提供了一个折中：保留文本路径的可用性，同时给音频 token 分配足够的专门容量。

##### 方法解读：四阶段训练如何降低联合优化难度

训练流程先分别 warm-up 理解和生成，再进行音频-文本联合预训练，最后用更长上下文和 auditory sentence 做 mid-training。前两个阶段相当于先让模型分别学会“听懂”和“发声/生成音频 token”；第三阶段把 text-only、audio-only、理解任务和生成任务混合起来，真正对齐两种模态；第四阶段扩展到更复杂的上下文和未见任务，提升 few-shot/zero-shot 泛化。

论文中的加权损失也服务于这个目标。文本损失权重高于音频损失，用于减轻音频训练对语言能力的冲击；音频损失内部又对不同 codebook stream 设权重，使模型更重视高层语义 stream。整体上，UniAudio 2.0 的贡献不是单个模块，而是 tokenizer、输入表示、专家架构和训练配方共同配合，支撑“统一音频理解与生成模型”。

> 💡 关键：UniAudio 2.0 把音频 token 设计从“压缩波形”提升到“同时服务推理抽象与声学重建”，这是它区别于 AudioGPT 式工具编排和早期统一音频生成模型的核心。

#### 🧪 练习题

```yaml
question: "UniAudio 2.0 中 ReasoningCodec 将音频拆成 reasoning tokens 与 reconstruction tokens 的主要目的是什么？"
options:
  - "让所有音频任务只使用文本 token，不再需要音频编码器"
  - "把理解所需的文本对齐抽象与生成所需的声学细节分离，降低统一建模冲突"
  - "用单个 codebook 取代 RVQ，从而减少所有训练阶段"
  - "只提升 ASR 转写，不支持音频生成任务"
answer: 1
explain: "reasoning tokens 面向高层感知和规划，reconstruction tokens 面向高保真波形重建；二者分工使同一自回归模型更容易同时做音频理解与生成。"
```
