### MiniCPM-o 4.5
```yaml
id: minicpm-o
name: MiniCPM-o 4.5
full_name: MiniCPM全模态4.5版 (MiniCPM-o 4.5)
year: '2026'
org: OpenBMB
paper_url: https://minicpm.vercel.app/blog/minicpm-o-2-6-en
category: frontier_2026
parent: gpt-4o
motivation: 全双工实时交互边端模型
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/minicpm-o_detail.md
```

#### 📝 一句话总结
MiniCPM-o 4.5 提出了面向端侧部署的 9B 全模态全双工模型，用 Omni-Flow 将实时视觉、实时音频和助手输出放到同一时间轴上，解决传统 turn-based 多模态助手“先听看、再回答”的阻塞式交互问题。

#### 🎯 核心要点
- 端到端 omni-modal 架构：流式视觉编码器、流式音频编码器、Qwen3-8B LLM backbone、轻量 speech token decoder 和 streaming flow-matching waveform decoder。
- Omni-Flow：把 env-visual、env-audio、out-stream 三条流按共享时间轴切块并序列化，支持边看边听边说。
- Listen-Speak 控制：模型先判断当前时间窗是否需要输出，再生成文本或语音内容，减少对外部 VAD 的依赖。
- 高压缩输入：LLaVA-UHD 图像切片加 SigLIP ViT，每 slice 从 1024 token 压缩到 64 token；Whisper Medium 音频特征从 50 token/s 压缩到 10 token/s。
- 轻量语音生成：LLM 只生成 3-4 token/s 的文本和隐藏状态，0.3B speech decoder 生成约 25 token/s 的 S3 speech token。
- TAIL 对齐：Time-Aligned Interleaving 让每个时间窗生成的文本与可播放语音时长匹配，避免全双工场景中输出滞后于环境。
- 训练流程：speech pretraining、joint pretraining、joint SFT、RL，再配合 smooth length reward 和 RLAIF-V 抑制幻觉。

#### 🔬 深入细节
![MiniCPM-o 4.5 端到端全模态架构](https://arxiv.org/html/2604.27393v1/x6.png)
*图：MiniCPM-o 4.5 的端到端 omni-modal 架构。输入元信息中的链接是 MiniCPM-o 2.6 博客，4.5 的公开技术报告对应 arXiv `2604.27393`。*

```python
# Omni-Flow 全双工推理的抽象流程
state = []

for k, window in enumerate(stream(time_chunk=delta)):
    visual_tokens = visual_encoder.encode(window.video_frames)   # optional
    audio_tokens = audio_encoder.encode(window.audio_samples)    # optional

    group = make_time_aligned_group(
        env_visual=visual_tokens,
        env_audio=audio_tokens,
        boundary_token="<chunk>",
    )
    state.extend(group)

    control = llm.generate_control(state)  # listen or speak
    if control == "listen":
        state.append("[listen]")
        continue

    text_tokens, hidden_states = llm.stream_text_and_hidden(state)
    speech_tokens = speech_decoder.interleave_and_decode(
        text_tokens=text_tokens,
        llm_hidden=hidden_states,
        target_duration=delta,             # TAIL keeps speech timely
    )
    waveform = flow_matching_decoder.stream(speech_tokens)
    play(waveform)
    state.extend(text_tokens + speech_tokens)
```

MiniCPM-o 4.5 的核心不是简单把图像、音频、文本都接到 LLM，而是改变交互序列的定义。传统语音或视频助手通常按 turn 运行：

$$
\mathrm{Observe}(V_{1:T}, A_{1:T}) \rightarrow \mathrm{Think} \rightarrow \mathrm{Speak}(Y_{1:M})
$$

这个流程在模型说话期间通常不能吸收新的视觉和音频输入，因此用户打断、场景变化和主动提醒都要依赖外部工程模块。Omni-Flow 把连续时间拆成长度为 \(\Delta\) 的小窗，在第 \(k\) 个时间窗中同时接收环境 token 并决定是否输出：

$$
G_k=[B_k, V_k, A_k, C_k, O_k],\qquad
S=\mathrm{Concat}(G_1,G_2,\ldots,G_K)
$$

其中 \(V_k\) 是当前窗口视觉 token，\(A_k\) 是音频 token，\(C_k\in\{\mathrm{listen},\mathrm{speak}\}\) 是控制 token，\(O_k\) 是输出 token。因果 LLM 看到的是标准序列 \(S\)，但序列内部保留了时间窗结构，所以每次输出都能条件于最新到达的输入。

端侧可跑的关键在于 token 预算。视觉侧采用 LLaVA-UHD 切片策略，每个切片先由 SigLIP ViT 编成 1024 token，再由 resampler 压成 64 token，形成 16 倍压缩；全双工流式模式最高使用 448x448，非流式高分辨率模式可到 2240x2240。音频侧用 Whisper Medium encoder 以 chunk 方式输出 50 feature token/s，再用两层 MLP 做 5 倍时间压缩，进入 LLM 时约 10 audio token/s。这样 Qwen3-8B backbone 的上下文主要用于理解和文本决策，而不是被原始音视频帧率耗尽。

语音生成被拆成“LLM 决策”和“轻量 decoder 发声”。LLM backbone 只按人类说话速度生成文本 token，并把隐藏状态传给 speech token decoder：

$$
h_t=\mathrm{LLM}_{\theta}(S_{\le t}),\qquad
r_t=W_h h_t + e_{\mathrm{text}}(y_t)
$$

$$
p_{\phi}(q_{t,1:m}\mid r_{\le t}, q_{<t})
=\prod_{j=1}^{m}p_{\phi}(q_{t,j}\mid r_{\le t}, q_{<t}, q_{t,<j})
$$

其中 \(q\) 是 S3 speech token。生成的 speech token 再由 streaming flow-matching decoder 合成为 waveform。这个设计避免让 8B LLM 直接承担 25 token/s 的语音码生成压力，也降低语音生成对语言能力的干扰。

全双工语音还需要解决“文本生成进度”和“音频播放进度”不一致。TAIL 可以抽象为在每个时间窗选择文本前缀 \(Y_k\)，使其预计播放时长贴近窗口长度：

$$
Y_k=\arg\min_{Y}\left|\sum_{y_i\in Y}d(y_i)-\Delta\right|
$$

这里 \(d(y_i)\) 表示文本 token 对应的预估语音时长。若文本领先太多，助手会继续播放已经过时的内容；若语音领先太多，则容易产生断裂和重复。TAIL 的作用是把文字和语音按时间窗自适应交错，让输出流始终跟随最新环境上下文。

训练上，MiniCPM-o 4.5 先做 speech pretraining，让语音 decoder 具备稳定发声能力；再做 joint pretraining，把视觉、音频、文本和语音输出联合起来；随后用 joint SFT 学习全双工指令、主动提醒和多模态对话；最后通过强化学习改进回答质量、长度偏好和视觉一致性。其 RL 阶段使用 smooth length reward 抑制“为了短而短”的回答，同时使用 RLAIF-V 缓解视觉幻觉，并把图文幻觉抑制迁移到流式 omni 场景。

> 💡 关键：MiniCPM-o 4.5 的 full-duplex 能力来自序列建模方式的改变。它把“是否说、说什么、什么时候说”都放进模型时间序列中学习，而不是只靠外部对话管理器切换输入和输出。

#### 🧪 练习题
```yaml
question: "MiniCPM-o 4.5 中 Omni-Flow 的主要作用是什么？"
options:
  - "把图像生成改为扩散模型"
  - "把环境视觉、环境音频和助手输出按共享时间轴序列化，使模型能边感知边输出"
  - "只压缩模型权重，与交互模式无关"
  - "让 LLM 直接以 25 token/s 生成所有语音码"
answer: 1
explain: "Omni-Flow 将输入输出组织成时间对齐的连续序列，模型在每个时间窗吸收新输入并决定 listen 或 speak，从而实现全双工交互。"
```
