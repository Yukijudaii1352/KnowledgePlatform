### Qwen-Audio

```yaml
id: qwen_audio
name: Qwen-Audio
full_name: 通义千问音频 (Qwen-Audio)
year: '2023'
org: 阿里巴巴
paper_url: https://arxiv.org/abs/2311.07919
category: audio_llm
parent: audiogpt
motivation: 统一音频-语言预训练
```

#### 📝 一句话总结

Qwen-Audio 用单一 Whisper-large-v2 初始化的音频编码器连接 Qwen-7B，并通过覆盖语音、自然声音、音乐和歌曲的层级 tag 多任务预训练，解决了音频大模型只能处理少数音频类型或依赖外部工具编排的问题。

#### 🎯 核心要点

- **统一音频-语言架构**：单个 audio encoder 处理多种音频，输出接入 Qwen-7B decoder-only LLM 生成文本答案
- **Whisper encoder 初始化**：音频编码器基于 Whisper-large-v2，输入 16kHz waveform 转 80-channel mel-spectrogram
- **覆盖 30+ 音频任务**：包含 ASR、S2TT、SRWT、speaker/emotion/language tasks、audio caption、scene/event、AQA、music QA 等
- **层级 tag 多任务格式**：用起始类型、音频语言、任务、输出语言、时间戳、输出指令等 tag 缓解 one-to-many 标签冲突
- **SRWT 细粒度时间戳任务**：引入 word-level timestamp prediction，提升音频 grounding、ASR 和音频问答能力
- **两阶段训练**：Qwen-Audio 多任务预训练时冻结 LLM 优化音频编码器；Qwen-Audio-Chat 指令微调时冻结音频编码器优化 LLM

#### 🔬 深入细节

![Qwen-Audio 架构与多任务预训练框架](https://arxiv.org/html/2311.07919v2/x3.png)
*图：Qwen-Audio 的多任务输入格式与整体架构。音频经统一 encoder 得到表示，decoder 端通过层级 tag 指定任务、语言、时间戳需求和输出格式。*

##### 算法伪代码

```python
# Qwen-Audio 多任务预训练与对话微调流程
def build_qwen_audio_sample(audio, task_meta, target_text):
    tags = [
        task_meta.start_tag,       # <|startoftranscripts|> or <|startofanalysis|>
        task_meta.audio_language,  # <|en|>, <|zh|>, ..., or <|unknown|>
        task_meta.task_tag,        # <|transcribe|>, <|caption|>, <|question-answer|>, ...
        task_meta.text_language,   # output language
        task_meta.timestamp_tag,   # <|timestamps|> or <|notimestamps|>
        task_meta.output_instruction,
    ]
    return tags, target_text

def multitask_pretrain(audio_encoder, qwen_llm, training_sets):
    freeze(qwen_llm)
    unfreeze(audio_encoder)
    for audio, task_meta, target_text in mix(training_sets):
        mel = whisper_log_mel(audio, sample_rate=16000)
        audio_repr = audio_encoder(mel)          # Whisper-large-v2 initialized encoder
        tags, y = build_qwen_audio_sample(audio, task_meta, target_text)
        loss = next_text_token_loss(qwen_llm, prefix=[audio_repr, tags], target=y)
        update(audio_encoder, loss)

def supervised_chat_finetune(audio_encoder, qwen_llm, chat_data):
    freeze(audio_encoder)
    unfreeze(qwen_llm)
    for audio_text_dialogue, answer in chat_data:
        audio_repr = encode_optional_audio(audio_encoder, audio_text_dialogue)
        prompt = serialize_multiturn_prompt(audio_text_dialogue, audio_repr)
        loss = response_only_loss(qwen_llm, prompt, answer)
        update(qwen_llm, loss)
```

##### 动机：从“语音模型”走向“通用音频理解模型”

在 Qwen-Audio 之前，很多音频-语言模型仍集中在语音识别、语音翻译或自然声音 caption 的单一子领域。工具编排路线如 AudioGPT 可以调度多个专家模型，但 LLM 本身并没有真正获得音频感知能力；而一些端到端模型又往往只支持语音或只支持自然声音。Qwen-Audio 的目标是训练一个统一 audio-language model，让同一个模型处理人声、环境声、音乐、歌曲等多种音频，并在不做 task-specific fine-tuning 的情况下完成多类 benchmark。

困难不只在模型结构，而在多任务数据格式。不同数据集的标签粒度差异很大：ASR 是逐字转录，音频 caption 是自由文本，scene classification 是类别标签，music note analysis 是结构化音乐信息，QA 还带问题输入。如果直接混合训练，模型会遇到 one-to-many 干扰：同一段音频在不同任务下可以对应完全不同的文本输出。Qwen-Audio 的核心工程设计就是用层级 tag 明确“这次要做什么、用什么语言输出、是否需要时间戳、输出格式是什么”。

##### 架构：单音频编码器连接 Qwen-7B

给定音频序列 \(\mathbf{a}\) 和目标文本序列 \(\mathbf{x}=(x_1,\ldots,x_T)\)，Qwen-Audio 的训练目标是最大化条件 next-token probability：

$$
\max_{\theta,\phi}\sum_{t=1}^{T}
\log P_{\theta}(x_t|\mathbf{x}_{<t},\mathrm{Encoder}_{\phi}(\mathbf{a}),\mathbf{g})
$$

其中 \(\phi\) 是音频编码器参数，\(\theta\) 是 Qwen LLM 参数，\(\mathbf{g}\) 是层级任务 tag 序列。等价的损失写作：

$$
\mathcal{L}_{\text{audio-text}}
=-\sum_{t=1}^{T}\log P_{\theta}(x_t|\mathbf{x}_{<t},\mathrm{Encoder}_{\phi}(\mathbf{a}),\mathbf{g})
$$

音频编码器初始化自 Whisper-large-v2，包含 32 层 Transformer 和两个卷积下采样层，约 640M 参数。输入音频先重采样到 16kHz，再转成 80 通道 mel-spectrogram，窗口 25ms、hop 10ms；编码器输出后再经过 stride 2 pooling，使每个输出帧大约对应 40ms 原始音频。LLM 侧初始化自 Qwen-7B，32 层 decoder Transformer，hidden size 4096，约 7.7B 参数。

##### 层级 tag：把多任务冲突显式条件化

Qwen-Audio 的 tag 设计借鉴 Whisper，但覆盖面更广。一个训练样本的 decoder 侧条件通常包含：

- **Transcription/Analysis 起始 tag**：`<|startoftranscripts|>` 表示精确转录类任务，`<|startofanalysis|>` 表示分析、问答、caption 等任务
- **Audio Language tag**：标记语音语言；如果是环境声或音乐等无语言音频，则使用 `<|unknown|>`
- **Task tag**：如 `<|transcribe|>`、`<|translate|>`、`<|caption|>`、`<|analysis|>`、`<|question-answer|>`
- **Text Language tag**：指定输出文本语言
- **Timestamp tag**：`<|timestamps|>` 或 `<|notimestamps|>`，决定是否生成时间戳
- **Output instruction**：进一步指定子任务和输出格式

这个格式的价值在于把“同一音频对应多个可能标签”的歧义转化成条件生成问题。共享 tag 让相近任务共享能力，例如 ASR、翻译和 speech QA 都依赖语音内容识别；特定 tag 又能防止模型把 caption、分类标签和转录文本混在一起。相比只给 dataset id，这种层级条件更细，可以同时表达任务类别、语言和输出结构。

##### SRWT：用词级时间戳增强 grounding

论文特别强调 Speech Recognition with Word-level Timestamps (SRWT)。传统 Whisper 式时间戳多为句级或片段级，Qwen-Audio 要求在转录中交错预测每个词的开始和结束时间：

$$
y=(\langle t^{s}_1\rangle,w_1,\langle t^{e}_1\rangle,\ldots,
\langle t^{s}_n\rangle,w_n,\langle t^{e}_n\rangle)
$$

这种目标让模型不仅知道“音频里说了什么”，还知道“每个语义单元何时出现”。论文的消融显示，加入 SRWT 不只改善 ASR，也提升自然声音/音乐问答等 grounding-based QA。这说明细粒度时间对齐是一种可迁移的音频理解能力：模型学会把文本 token 与音频时间位置绑定，后续回答“某个声音什么时候出现”“某句话从哪一秒开始”时更稳。

##### 训练流程：先对齐音频编码器，再对齐对话行为

Qwen-Audio 的训练分为两个阶段。第一阶段是 multi-task pretraining：冻结 Qwen LLM，仅优化 audio encoder。这样做的目的很明确：保留 Qwen-7B 原有语言能力，让音频编码器学会产生 LLM 可消费的表示。训练数据覆盖 30+ 任务、8 种语言以及 speech、sound、music/song 三大音频类型，模型通过统一格式学习从音频到文本的条件生成。

第二阶段得到 Qwen-Audio-Chat：冻结 audio encoder，仅优化 LLM，使用监督指令数据让模型适应多轮对话、人类意图和音频中心场景。这个阶段类似多模态 instruction tuning，不再主要解决“音频表示能否被读懂”，而是解决“模型如何按用户意图组织答案”。这也解释了论文中 Qwen-Audio 与 Qwen-Audio-Chat 的角色分工：前者是通用音频理解基座，后者是面向交互的聊天模型。

##### 与 SpeechGPT / AudioGPT 的区别

相对 AudioGPT，Qwen-Audio 不是让 LLM 调用外部工具，而是端到端训练一个能直接感知音频表示的模型；相对 SpeechGPT，Qwen-Audio 没有把语音离散化为 unit 并生成语音 token，而是以连续音频 encoder 表示作为 LLM 条件，重点放在通用音频理解和文本输出。两者代表了 audio LLM 的两条路线：SpeechGPT 更强调语音输入输出闭环，Qwen-Audio 更强调跨音频类型的统一理解能力。

> 💡 关键：Qwen-Audio 成功的核心不是“把 Whisper 接到 Qwen”这么简单，而是用大规模多任务数据和层级 tag 把不同音频任务的输出空间显式拆开，避免混合训练中的标签冲突。

#### 🧪 练习题

```yaml
question: "Qwen-Audio 使用层级 tag 多任务格式的主要目的是什么？"
options:
  - "减少音频编码器参数量"
  - "把不同任务、语言、时间戳需求和输出格式显式条件化，缓解多数据集混训的 one-to-many 干扰"
  - "让模型只支持 ASR 和语音翻译任务"
  - "替代 Whisper 的 mel-spectrogram 输入"
answer: 1
explain: "不同音频数据集的文本标签格式差异很大。层级 tag 将任务类型、语言、时间戳和输出格式作为条件输入，让共享学习与任务区分同时成立。"
```
