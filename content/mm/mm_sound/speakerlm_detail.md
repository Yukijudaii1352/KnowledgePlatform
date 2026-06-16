### SpeakerLM: 说话人语言模型

```yaml
id: speakerlm
name: SpeakerLM
full_name: 说话人语言模型 (SpeakerLM)
year: "2026"
org: "—"
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/40745
category: frontier_2026
parent: ecapa_tdnn
motivation: MLLM端到端说话人识别
```

#### 📝 一句话总结

SpeakerLM 提出了面向 Speaker Diarization and Recognition (SDR) 的端到端多模态大语言模型，把“谁在什么时候说了什么”的识别、转写和说话人注册统一为一个自回归生成任务，解决了级联 SD+ASR 系统误差传播、重叠语音处理弱和无法联合优化的问题。

#### 🎯 核心要点

- **首个面向 SDR 的 MLLM 框架**：采用 audio encoder → audio projector → text LLM 的统一架构，同时输出说话人归属和转写文本
- **灵活说话人注册机制**：支持 No-Regist、Match-Regist、Over-Regist 三种条件，使模型既能匿名 diarization，也能输出已注册说话人的真实姓名
- **双投影模态对齐**：SenseVoice-large 编码多说话人音频，ERes2NetV2 提取注册说话人 embedding，二者分别映射到 Qwen2.5-7B-Instruct 的语言空间
- **四阶段训练策略**：先用 60 万小时 ASR 数据得到 SpeakerLM-ASR，再用模拟 SDR 数据对齐投影器，最后用真实 SDR 数据逐步解冻音频编码器和 LoRA 适配 LLM
- **注册鲁棒性建模**：Over-Regist 训练中随机加入 1 到 50 个冗余注册说话人，让模型学习抑制不在当前音频中的身份
- **数据规模驱动性能**：论文在 AliMeeting、AISHELL4、AISHELL5 等中文会议/车载场景中验证，训练数据扩大后端到端模型超越强级联基线

#### 🔬 深入细节

![SpeakerLM 总体架构](https://arxiv.org/html/2508.06372v2/x2.png)
*图：SpeakerLM 的整体架构。输入音频经 SenseVoice-large 编码和 Transformer/CNN projector 对齐到 LLM 空间；注册说话人语音经 ERes2NetV2 提取 embedding 后由线性层投影，并与文本 token、音频 token 一起送入 Qwen2.5-7B-Instruct。*

##### 核心流程伪代码

```python
# SpeakerLM 端到端 SDR 推理与注册流程
def speakerlm_sdr(mixture_audio, registered_speakers=None, mode="no_regist"):
    # 1. 多说话人音频进入音频编码器
    audio_hidden = SenseVoice_large_encoder(mixture_audio)
    audio_tokens = audio_projector(audio_hidden)  # 2-layer Transformer + CNN alignment

    # 2. 可选说话人注册：把姓名 token 和 speaker embedding 注入 LLM 上下文
    registration_tokens = []
    if mode in ["match_regist", "over_regist"]:
        for name, enroll_audio in registered_speakers:
            name_tokens = tokenizer(["<start>", name, "<end>"])
            spk_embedding = ERes2NetV2(enroll_audio)
            spk_token = speaker_projector(spk_embedding)
            registration_tokens.extend([name_tokens, spk_token])

    # 3. LLM 自回归生成结构化 SDR 输出
    prompt = build_sdr_prompt(mode)
    llm_input = concat(prompt, registration_tokens, audio_tokens)
    transcript = Qwen2_5_7B_Instruct.generate(llm_input)
    return parse_speaker_attributed_transcript(transcript)
```

##### 端到端 SDR 的建模动机

传统 SDR 通常把任务拆成 diarization、ASR、后处理对齐三个模块：先切分“谁说话”，再识别“说了什么”，最后把文本对齐到说话人。这种流水线在真实会议中很脆弱：diarization 边界错了会直接污染 ASR 归属，ASR 与说话人时间轴不一致会造成词级错配，重叠语音又会让单说话人分段假设失效。SpeakerLM 的关键判断是，SD 和 ASR 本来共享同一段声学证据，应该由一个模型联合解释，而不是先把信息压缩成互相不兼容的中间结果。

在形式上，SpeakerLM 把输入音频 \(x\)、可选注册集合 \(R\) 和输出序列 \(y\) 组织成条件语言建模：

$$
p_\theta(y \mid x, R)=\prod_{t=1}^{T}p_\theta(y_t \mid y_{<t}, f_{\text{aud}}(x), f_{\text{spk}}(R))
$$

这里 \(f_{\text{aud}}\) 是音频编码与投影后的 token 序列，\(f_{\text{spk}}\) 是注册说话人姓名与 embedding 的联合表示，\(y\) 则是带说话人标签的转写文本。这个写法的意义在于：说话人边界、说话人身份和文本内容都通过同一个自回归目标反向影响模型参数，模型可以学习“这段声学片段像谁、应该对应哪一句话、是否有重叠”之间的联合结构。

##### 模型结构：音频 token 与注册 speaker token 的统一上下文

SpeakerLM 没有把注册说话人当作后处理检索，而是把它们作为 LLM 上下文的一部分。多说话人混合音频先由 SenseVoice-large encoder 编码，随后用随机初始化的两层 Transformer projector 和 CNN 层做维度/时间对齐；注册语音则由冻结的 ERes2NetV2 speaker embedding extractor 提取说话人向量，再经单层线性 projector 映射到 LLM hidden size。注册姓名和 `<start>/<end>` 标记仍由冻结文本 tokenizer 编码。

这种设计把三类信息放在同一生成空间：文本提示告诉模型任务和输出格式，音频 token 提供时序声学证据，speaker token 提供身份锚点。相比 SA-ASR 只假设“注册说话人刚好等于真实说话人”，SpeakerLM 在训练时显式暴露无注册、精确注册和过量注册三种情况，让 LLM 学会在没有姓名时生成匿名 speaker ID，在姓名可用时执行身份匹配，在注册池过大时忽略无关 embedding。

##### 灵活注册机制的数学形式

论文把真实说话人数记为 \(N_{gt}\)，注册说话人数记为 \(N_{rg}\)，三种注册条件统一写成：

$$
N_{rg}=
\begin{cases}
0, & \text{No-Regist}\\
N_{gt}, & \text{Match-Regist}\\
N_{gt}+N_{ov}, & \text{Over-Regist}
\end{cases}
$$

其中 \(N_{ov}>0\) 是冗余注册人数。No-Regist 对应传统 diarization：输出 `spk0`、`spk1` 这样的匿名标签；Match-Regist 对应已知参会人场景：模型要把语音段落直接归到 Alice、Bob 等真实姓名；Over-Regist 更接近产品部署：系统里可能预注册了几十个用户，但当前对话只出现少数人。训练时让 \(N_{ov}\) 在 1 到 50 间采样，本质上是在做 hard negative identity training，迫使模型不仅学习“像谁”，还学习“谁没有出现”。

##### 四阶段训练为什么必要

SpeakerLM 的训练不是一次端到端全量微调，而是逐步解锁能力。Stage 1 只用 ASR 数据训练 SpeakerLM-ASR，并用 LoRA 适配 LLM，目的是先让系统具备强语音转写能力；Stage 2 冻结 LLM 和音频编码器，只在 5,000 小时模拟 SDR 数据上训练 projector，使音频 token 与文本生成空间先粗对齐；Stage 3 使用真实 SDR 数据，解冻音频编码器和 projector，让模型适应远场、混响、噪声、多人重叠等实际声学条件；Stage 4 再通过 LoRA 联合适配 LLM，使语言推理、声学证据和说话人 identity 表示进一步融合。

> 💡 关键：SpeakerLM 的“端到端”不是从裸波形直接训练一个全新大模型，而是把成熟音频编码器、说话人 embedding 模型和指令 LLM 通过可训练 projector 组合起来，再用分阶段训练降低对齐难度。

##### 与 ECAPA-TDNN/级联系统的区别

ECAPA-TDNN 一类说话人模型的核心产物是判别式 embedding，擅长“这两段语音是否同一人”或“这段语音属于哪个注册人”。SpeakerLM 继承的是 speaker embedding 的身份判别能力，但目标函数变成语言建模，输出也从固定类别/相似度变成结构化对话转写。相比 SD+ASR+LLM 的后处理范式，SpeakerLM 不需要等待 diarization 和 ASR 分别给出中间结果，也不会把 LLM 限制在纠错器角色；LLM 是主模型，直接消费声学 token 和 speaker token，并生成最终 SDR 序列。

这种差异也解释了论文中的数据缩放现象：少量 SDR 数据下，端到端模型可能不如强级联系统稳定；但当真实和模拟 SDR 数据规模扩大后，联合建模可以减少模块边界误差，并在 out-of-domain 的 AISHELL5 车载噪声场景中保留更好的泛化能力。

#### 🧪 练习题

```yaml
question: "SpeakerLM 的 Over-Regist 机制主要解决什么问题？"
options:
  - "训练 ASR 模块识别更多语言"
  - "在注册说话人多于实际发言人时，抑制未出现身份并保持正确说话人归属"
  - "用更多注册语音提升音频采样率"
  - "把 diarization 输出固定为单说话人文本"
answer: 1
explain: "Over-Regist 让模型面对冗余注册 speaker embedding，学习选择当前音频中真实出现的身份，而不是简单假设注册集合与真实说话人集合完全匹配。"
```
