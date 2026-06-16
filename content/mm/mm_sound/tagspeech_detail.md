### TagSpeech: 基于时间锚的端到端多说话人 ASR 与日志

```yaml
meta:
  id: tagspeech
  name: TagSpeech
  full_name: 标签语音 (TagSpeech)
  year: "2026.01"
  org: "—"
  paper_url: https://arxiv.org/abs/2601.06896
  category: frontier_2026
  parent: whisper
  motivation: 端到端多说话人ASR与日志
  topic_id: mm_sound
  yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
  output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/tagspeech_detail.md
```

#### 📝 一句话总结

TagSpeech 提出双流语义/说话人编码器与交错数字时间锚，把“谁在何时说了什么”统一成 LLM 的结构化序列生成任务，解决多说话人 ASR 与 diarization 之间时间对齐弱、重叠语音易串行化的问题。

#### 🎯 核心要点

- 任务统一：从原始会议语音直接生成转写、说话人标签和精确起止时间，显式覆盖 what、who、when。
- 双流解耦编码器：语义流用 SOT 微调的 Zipformer 捕获内容和轮次切换，说话人流用 Auden-Voice 编码身份特征。
- 交错数字时间锚：在语义流和说话人流中按相同间隔插入自然数 token，提供时间定位并同步两条流。
- XML 风格结构化输入输出：用 `<text>`、`<spk>` 等标签组织连续音频嵌入与生成目标，不改 LLM 词表。
- 参数高效训练：冻结 Qwen-2.5-Instruct-7B、语义编码器和说话人编码器，仅训练两个投影器。
- 实验表现：在 AMI-SDM 和 AliMeeting-Far 上显著优于 Gemini、Qwen-Omni 等端到端基线的 DER，并保持稳定的说话人数预测。

#### 🔬 深入细节

![TagSpeech 总体架构图](https://arxiv.org/html/2601.06896v1/x2.png)

*图：TagSpeech 的 Figure 2。语义流和说话人流分别编码，再插入时间锚并送入冻结 LLM，最终生成带时间戳的结构化输出。*

```python
# TagSpeech 的核心训练样本构造
def build_tagspeech_input(waveform, m=8):
    mel = log_mel(waveform)                         # [T, 80]
    h_sem = semantic_zipformer_sot(mel)             # 内容/轮次流
    h_spk = auden_voice_speaker_encoder(mel)        # 身份流

    h_sem = projector_sem(h_sem)                    # -> LLM hidden size
    h_spk = projector_spk(h_spk)

    z_sem = insert_numeric_anchors(h_sem, every=m)  # 1, 2, 3, ...
    z_spk = insert_numeric_anchors(h_spk, every=m)

    x_in = ["<text>"] + z_sem + ["</text>", "<spk>"] + z_spk + ["</spk>"]
    y = render_xml_target(segments=[
        # (speaker_id, start_anchor, end_anchor, transcript)
        ("S1", 12, 18, "we should start the meeting"),
        ("S2", 16, 23, "yes I agree")
    ])
    return x_in, y
```

方法的第一步是把多说话人会议从“级联任务”改写成一个结构化生成任务。传统管线通常先做 VAD/分段，再做说话人日志，再做 ASR，最后用启发式规则把文本对齐到说话人和时间；每一环都会放大前一环错误。TagSpeech 直接学习从波形 \(\mathbf{X}\) 到目标序列 \(\mathbf{Y}=(y_1,\dots,y_L)\) 的映射，其中 token 同时包含文本、说话人标识和时间锚，因此评估指标可以直接覆盖 DER、cpWER/gWER 和 SCA。

双编码器是为了避免语义和身份在同一表征空间里相互干扰。论文把 Mel 特征 \(\mathbf{M}\in\mathbb{R}^{T\times 80}\) 同时送入两个 Zipformer 结构：

$$
\mathbf{H}_{sem},\mathbf{H}_{spk}\in\mathbb{R}^{T'\times D_{enc}}
$$

语义编码器先经过 Serialized Output Training (SOT) 微调，把多个说话人的转写按时间顺序串联，并用说话人切换 token 标出轮次变化；这让编码器更擅长重叠语音和快速 turn-taking。说话人编码器则使用 Auden-Voice，预训练目标包括说话人识别、性别、年龄和情感识别，使其更偏向“谁在说话”而不是“说了什么”。

两个流随后通过投影器进入 LLM 维度：

$$
\hat{\mathbf{H}}_{sem}=P_{sem}(\mathbf{H}_{sem}),\quad
\hat{\mathbf{H}}_{spk}=P_{spk}(\mathbf{H}_{spk}),\quad
L=\left\lceil\frac{T'}{k}\right\rceil
$$

投影器是两层 MLP 加时间下采样。这个设计把可训练参数限制在投影器里，避免在小规模会议数据上全量微调 LLM 或编码器导致过拟合，同时保留冻结 LLM 的结构化文本生成能力。

时间锚是 TagSpeech 最关键的机制。设 \(\mathcal{A}\subset\mathcal{V}_{LLM}\) 为自然数 token 集合，\(\mathcal{F}_{anc}(\cdot;m)\) 每隔 \(m\) 帧插入一个锚，包括序列首尾：

$$
\mathbf{Z}_{sem}=\mathcal{F}_{anc}(\hat{\mathbf{H}}_{sem};m),\quad
\mathbf{Z}_{spk}=\mathcal{F}_{anc}(\hat{\mathbf{H}}_{spk};m)
$$

$$
L'=L+\left\lfloor\frac{L}{m}\right\rfloor+1
$$

因为语义流和说话人流使用同一个确定性插入函数，编号相同的锚天然指向同一时间位置。与新增专用 `<time=...>` 词表不同，自然数 token 已在 LLM 词表中，成本低、可扩展，并利用 LLM 对数字顺序的已有建模能力。

输入输出采用 XML 风格结构，形式为：

$$
\mathbf{X}_{in}=[\mathbf{E}_{tag},\mathbf{Z}_{sem},\mathbf{E}_{tag},\mathbf{Z}_{spk},\mathbf{E}_{tag}]
$$

训练目标是标准自回归负对数似然：

$$
\mathcal{L}=-\sum_{t=1}^{|\mathbf{Y}|}\log P(y_t\mid y_{<t},\mathbf{X}_{in};\Theta)
$$

这里 \(\Theta\) 只包含两个投影器。这个“冻结大模型 + 轻量投影器”的训练方式很适合会议数据：LLM 负责解析标签、生成结构化文本和做上下文推理，音频编码器负责把连续声学证据对齐到 LLM 可消费的嵌入。

消融实验解释了为什么这三个设计缺一不可。单编码器版本，即使用 WavLM-Large，也会出现高失败率和说话人归属崩溃；这说明把内容和身份塞进同一条流不够稳。时间锚粒度呈 U 型：每帧都插入锚会破坏语义连续性，间隔过大又不能定位重叠语音；论文发现 8 帧约 1.28 秒附近取得较好折中。时间线索类型上，文本时间锚略强但 token 成本高，数字锚以 1 到 2 个 token 达到接近效果，更适合长会议。

> 💡 关键：TagSpeech 不是简单“让 LLM 听音频”，而是给 LLM 提供两套解耦声学证据和一条共享时间坐标系，让结构化生成可以同时对齐内容、说话人和时间。

#### 🧪 练习题

```yaml
question: "TagSpeech 为什么要在语义流和说话人流中插入相同编号的数字时间锚？"
options:
  - "为了压缩音频特征长度"
  - "为了让两条流共享显式时间坐标，辅助时间戳和重叠语音建模"
  - "为了替代说话人编码器"
  - "为了让 LLM 只输出数字而不输出文本"
answer: 1
explain: "相同间隔和相同编号的锚把语义内容与说话人身份同步到同一时间轴，降低细粒度 diarization 的对齐难度。"
```
