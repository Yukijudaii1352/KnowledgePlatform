### WavBench: 端到端口语对话推理评测基准

```yaml
id: wavbench
name: Wavbench
full_name: 语音基准 (Wavbench)
year: "2026.02"
org: "—"
paper_url: https://arxiv.org/abs/2602.12135
category: frontier_2026
parent: wavlm
motivation: 端到端口语对话推理评测
```

#### 📝 一句话总结

WavBench 提出了一个面向端到端 spoken dialogue models 的综合评测基准，用 Pro/Basic/Acoustic 三分框架同时考察复杂推理、口语化表达和副语言信息理解/生成，解决了现有语音对话评测过度沿用文本生成标准、忽视可听性和声学交互的问题。

#### 🎯 核心要点

- **17,577 条、76.5 小时评测数据**：覆盖文本认知任务、口语表达改写和声学交互三类能力
- **三分评测框架**：Pro subset 测高难推理的口语解释能力，Basic subset 测日常对话的自然口语表达，Acoustic set 测副语言理解与生成
- **七个认知领域**：Code、Creative Writing、Instruction Following、Logical Reasoning、Math、Common QA、Safety
- **十类副语言属性**：年龄、性别、口音、语言、音高、语速、音量、情绪、背景音、音乐
- **显式与隐式声学交互**：显式指令分别评估理解和生成，隐式对话要求模型从语音中主动推断风格并生成匹配回应
- **LLM-as-judge 分层评分**：口语表达用 Gemini 3 Pro Preview 给 1/3/5 分，声学理解/生成用标签准确率和 0-10 风格/内容评分

#### 🔬 深入细节

![WavBench 声学交互样例](https://arxiv.org/html/2602.12135v2/x3.png)
*图：WavBench Acoustic Interaction Set 的样例，覆盖显式声学理解、显式声学生成和隐式多轮对话。*

##### 基准构建伪代码

```python
# WavBench 数据构建与评测流程
def build_and_evaluate_wavbench(seed_text_datasets, acoustic_labels, models):
    # 1. 构造 Colloquial Expression Set
    text_items = collect_from_15_sources(seed_text_datasets)
    basic, pro = stratify_by_complexity(text_items)  # Basic: everyday; Pro: hard reasoning
    spoken_scripts = qwen3_max_rewrite_for_listenability(basic + pro)
    verified_scripts = human_verify(spoken_scripts)
    speech_audio = IndexTTS2.synthesize(verified_scripts, prompts=SeedTTS_eval)
    speech_audio = filter_by_whisper_wer(speech_audio, threshold=0.05)

    # 2. 构造 Acoustic Interaction Set
    dialogs = generate_dialog_scripts(acoustic_labels, modes=["explicit", "implicit"])
    dialogs = verify_label_text_consistency(dialogs)
    acoustic_audio = synthesize_with_attribute_control(dialogs)
    acoustic_audio = filter_by_whisper_and_emotion2vec(acoustic_audio)
    acoustic_audio = human_quality_check(acoustic_audio)

    # 3. 评测端到端语音对话模型
    results = {}
    for model in models:
        responses = model.respond_audio_to_audio(speech_audio + acoustic_audio)
        results[model.name] = score_with_gemini_and_label_accuracy(responses)
    return aggregate_by_subset(results)
```

##### 为什么普通语音基准不够

传统语音理解基准常把问题简化为 ASR 准确率、情绪分类、年龄/性别识别或文本问答正确率。这些任务可以分别衡量声学识别或语言推理，但无法回答一个关键问题：端到端语音对话模型能不能在“直接听、直接说”的场景中同时保持推理正确、表达自然和声音风格匹配？WavBench 的出发点是，现代 spoken dialogue model 已经不再只是 ASR+LLM+TTS 的流水线，模型会直接处理语音 token、生成语音响应，因此评测也必须覆盖音频交互的完整闭环。

论文把能力拆成三个互补维度。Pro subset 不是只问难题，而是要求模型把复杂数学、代码、逻辑任务讲得适合被听懂；Basic subset 则强调日常对话里的 lexical appropriateness、linguistic naturalness 和 interactive rapport；Acoustic Interaction Set 进一步测试模型能否听出情绪、口音、音量、背景声等副语言信息，并在回答中复现或顺应这些信息。

##### Colloquial Expression Set：把文本任务转成“可听懂的推理”

Colloquial Expression Set 来自 15 个开源文本数据源，按七个认知领域组织，并分成 Basic 与 Pro 两档。Basic 侧重低到中等复杂度的日常交互，要求模型避免机械书面语；Pro 则保留高认知负载样本，例如多步数学、复杂代码逻辑和细粒度安全判断。WavBench 关心的不是“答案文本是否能写对”，而是“答案被朗读出来后用户是否能跟上”。

这带来了一个不同于文本 benchmark 的约束：许多符号、表格、代码块在音频中不可直接消费。因此论文的生成流水线会把公式转写为自然语言步骤，把代码任务转成算法思路解释，把多选项逻辑题线性化为可听的比较叙述。可以把口语化质量抽象为：

$$
S_{\text{colloquial}} =
\mathbb{1}[\text{task correct}]
\cdot g(\text{lexicon}, \text{syntax}, \text{rapport}, \text{context})
$$

其中任务失败直接得到最低分；只有在语义正确的前提下，才进一步比较词汇是否日常、句式是否短而自然、是否有确认/反问等互动感，以及情绪语境是否匹配。

##### Acoustic Interaction Set：显式指令和隐式对话共同测 EQ

Acoustic set 覆盖 9,915 条样本，副语言属性包括 speaker information、acoustic characteristics 和 background sound。显式理解任务会直接询问“Can you perceive my emotions?”，模型需要从输入语音预测标签；显式生成任务会要求“Please respond in a cheerful tone”，模型必须生成满足目标风格的语音；隐式对话则不在文本中给出声学标签，要求模型自己从语音中推断用户的情绪、语速、背景环境，并在内容和声音上共同回应。

评测时，显式理解可写成常规准确率：

$$
\text{Acc}_{\text{understand}}=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}[\hat{y}_i=y_i]
$$

显式生成先由 Gemini 3 Pro Preview 或专门判别器标注模型输出的副语言属性，再与目标标签比较；隐式对话则同时评分内容正确性 \(s_i^{text}\) 与声学风格一致性 \(s_i^{audio}\)，可概括为：

$$
S_{\text{implicit}}=\frac{1}{N}\sum_{i=1}^{N}\frac{s_i^{text}+s_i^{audio}}{2}
$$

这个设计能暴露“会答题但不会说话”与“会模仿风格但内容漂移”的不同错误类型。

##### 数据生成与质量控制

WavBench 并不是简单把文本题 TTS 一遍。Colloquial 部分先由 Qwen3-Max 做场景化口语改写，再由 5 名专家检查 11,000 个样本，剔除公式转写错误、代码逻辑错误、保留不适合语音的格式约束等问题；音频合成使用 IndexTTS2，并用 Seed-TTS-Eval 的 1,088 个英文提示音做 zero-shot voice cloning，最后用 Whisper-Large-V3 过滤 WER 超过 5% 的样本。

Acoustic 部分则为不同属性选择不同合成控制策略：pitch/speed/volume 通过合成条件控制，gender/language 用 curated speaker prompts，age 用四年龄段参考声音，accent/emotion 用 GPT-4o-mini-TTS 风格指令，background audio/music 从 AudioCaps 与 MusicCaps 拼接。随后用 Whisper 过滤转写错误，用 Emotion2Vec 过滤低情绪置信度，再由 10 名专家做自然度和准确性检查。

##### 评测发现与方法意义

论文评测了 Qwen3-Omni、Kimi-Audio、Mimo-Audio、Step-Audio-2-mini 和 GPT-4o Audio。结果显示 GPT-4o Audio 在 Basic 和 Pro 口语表达上领先，但 Pro 平均分也只有 58.23，说明复杂推理转成自然听觉解释仍未解决；显式声学理解里，语言和情绪通常较容易，而 pitch、volume、accent 等细粒度 prosody 更难；显式生成中 GPT-4o Audio 平均准确率达到 79.23%，但所有模型在复杂背景音生成上都低于 50%。隐式多轮对话还揭示一个更细的断点：模型的语义一致性可随多轮改善，但声学风格一致性显著下降。

> 💡 关键：WavBench 的价值不是提出新模型，而是把端到端语音对话的评测目标从“听懂文字内容”推进到“听懂声音中的语义、情绪、场景，并用适合被听的方式回答”。

#### 🧪 练习题

```yaml
question: "WavBench 中 Pro subset 相比普通文本推理题的核心区别是什么？"
options:
  - "只测试 ASR 转写错误率"
  - "要求模型在高难推理正确的同时，把解释改写成适合听觉理解的自然口语"
  - "只用人工录制的环境声音做分类"
  - "只评估模型是否能输出更长回答"
answer: 1
explain: "Pro subset 关注复杂推理与口语可听性的结合，模型不仅要答对，还要把符号化、结构化逻辑转成用户能听懂的表达。"
```
