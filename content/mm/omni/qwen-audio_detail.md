### Qwen-Audio
```yaml
id: qwen-audio
name: Qwen-Audio
full_name: 通义千问音频模型 (Qwen-Audio)
year: '2023'
org: 阿里通义
paper_url: https://arxiv.org/abs/2311.07919
category: encoder_llm_decoder
parent: audiopalm
motivation: 大规模音频-语言统一模型
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/qwen-audio_detail.md
```

#### 📝 一句话总结
Qwen-Audio 提出了一个以单一音频编码器连接 Qwen-7B 的大规模音频语言模型，通过层级任务标签统一语音、声音、音乐和歌曲等 30 多类任务，解决多数据集联合训练中的输出格式冲突和任务干扰问题。

#### 🎯 核心要点
- 模型结构：Whisper-large-v2 初始化的音频编码器 + Qwen-7B Transformer decoder。
- 音频覆盖：人声语音、自然声音、音乐、歌曲，训练任务超过 30 个，覆盖 8 种语言。
- 输入表示：16 kHz 音频转 80 通道 mel-spectrogram，编码器输出经 stride=2 pooling 后约每帧对应 40 ms 原始音频。
- 统一目标：LLM 在音频表示条件下自回归预测文本 token。
- 层级任务标签：起始标签、音频语言标签、任务标签、输出文本语言标签、时间戳标签共同控制输出空间。
- SRWT：引入 speech recognition with word-level timestamps，在每个词前后交错预测起止时间 token。
- 两阶段训练：多任务预训练阶段冻结 LLM、优化音频编码器；指令微调阶段冻结音频编码器、优化 LLM 得到 Qwen-Audio-Chat。

#### 🔬 深入细节
![Qwen-Audio 架构与多任务预训练总览](https://arxiv.org/html/2311.07919v2/x3.png)
*图：Qwen-Audio 使用单一音频编码器接入 Qwen-7B，并通过层级标签把不同音频任务映射到统一自回归文本生成框架。*

```python
# Qwen-Audio 多任务训练流程伪代码
for audio, target_text, meta in multitask_audio_corpus:
    mel = log_mel_spectrogram(audio, sample_rate=16000, n_mels=80)
    audio_repr = whisper_like_encoder(mel)       # shared for speech, sound, music, song
    audio_repr = stride2_pool(audio_repr)        # about 40 ms per output frame

    prompt_tags = [
        meta.start_tag,       # <|startoftranscripts|> or <|startofanalysis|>
        meta.audio_lang_tag,  # language tag or <|unknown|>
        meta.task_tag,        # transcribe / translate / caption / analysis / QA
        meta.text_lang_tag,
        meta.timestamp_tag,   # <|timestamps|> or <|notimestamps|>
    ]
    decoder_input = concat(audio_repr, embed(prompt_tags), shift_right(target_text))
    loss = cross_entropy(qwen_decoder(decoder_input), target_text)
    loss.backward()
```

Qwen-Audio 的核心建模假设是：不同音频任务可以共享底层听觉感知，但必须显式告诉解码器“现在要输出什么类型的文本”。给定音频序列 \(\mathbf{a}\) 和文本序列 \(\mathbf{x}\)，论文把训练目标写成在音频编码条件下预测下一个文本 token：

$$
\mathcal{P}_{\theta}(x_t \mid \mathbf{x}_{<t}, \mathrm{Encoder}_{\phi}(\mathbf{a}))
$$

也可以写成负对数似然形式：

$$
\mathcal{L}_{\mathrm{NLL}}
=-\sum_{t=1}^{T}\log p_{\theta}(x_t \mid x_{<t}, \mathrm{Encoder}_{\phi}(\mathbf{a}), \mathbf{z})
$$

其中 \(\mathbf{z}\) 是层级标签序列。这个设计保留了 decoder-only LLM 的语言生成能力，同时把音频编码器输出作为条件上下文输入给 Qwen-7B。与先 ASR 再把转写喂给 LLM 的级联系统不同，Qwen-Audio 让模型直接在音频表征上学习情绪、背景声、音乐信息和时间对齐信息，减少中间转写丢失非语义线索的问题。

层级标签是论文最关键的工程与算法设计。简单混合 ASR、翻译、音频问答、场景分类、音乐分析等数据时，同一段音频可能对应文本转写、类别标签、自然语言描述或问答答案，形成 one-to-many 的监督冲突。Qwen-Audio 用共享标签促进相近任务知识共享，用细粒度任务标签分隔输出格式：例如 `<|transcribe|>` 与 `<|translate|>` 对应不同文本目标，`<|caption|>` 面向开放描述，`<|question-answer|>` 会把问题拼接到标签后。这样 decoder 不是被迫从音频本身猜监督语义，而是在明确任务条件下学习条件分布 \(p(y \mid a,z)\)。

SRWT 词级时间戳进一步把“听懂内容”和“定位音频片段”绑在一起训练。对于带时间戳的识别样本，模型不只生成词，还在每个词前后生成起止时间 token，形式近似：

$$
y = [t^{\mathrm{start}}_1, w_1, t^{\mathrm{end}}_1,\ldots,t^{\mathrm{start}}_n,w_n,t^{\mathrm{end}}_n]
$$

这使模型学习词与声学帧之间的细粒度对齐。论文报告该任务不仅服务于语音 grounding，也提升音频问答和 ASR，因为时间定位迫使共享编码器保留比纯句级文本监督更细的声学结构。

训练流程也体现了“先接入模态、再对齐交互”的分工。多任务预训练阶段冻结 Qwen-7B，只优化音频编码器，让音频表示适配已有语言空间；随后在 Qwen-Audio-Chat 的监督微调中冻结音频编码器，只优化 LLM，让模型学习多轮对话和人类指令格式。这样的两阶段方案降低了同时更新大语言模型和音频编码器时的灾难性漂移风险，也让基础 Qwen-Audio 保持零样本执行多类音频理解任务的能力。

> 💡 关键：Qwen-Audio 的创新不只是“给 LLM 接一个音频 encoder”，而是用层级标签把异构音频数据整理成可共享、可区分的条件语言建模问题。

#### 🧪 练习题
```yaml
question: "Qwen-Audio 使用层级任务标签的主要目的是什么？"
options:
  - "压缩音频序列长度，减少显存占用"
  - "让 decoder 区分任务、语言、输出格式和时间戳需求，缓解多任务 one-to-many 干扰"
  - "替代 Whisper 音频编码器，使模型完全不需要声学特征"
  - "只提高音乐生成质量，与语音识别无关"
answer: 1
explain: "层级标签把不同任务的输出条件显式写入 decoder 上下文，使相近任务共享表示，同时避免不同数据集文本标签互相冲突。"
```
