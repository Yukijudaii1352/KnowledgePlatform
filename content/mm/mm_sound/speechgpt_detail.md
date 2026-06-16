### SpeechGPT

```yaml
id: speechgpt
name: SpeechGPT
full_name: 语音GPT (SpeechGPT)
year: '2023'
org: 复旦大学
paper_url: https://aclanthology.org/2023.findings-emnlp.1055/
category: audio_llm
parent: —
motivation: 离散语音token原生对话
```

#### 📝 一句话总结

SpeechGPT 将连续语音先离散化为 HuBERT unit，再把这些 unit 作为 LLaMA 扩展词表中的“语音 token”进行语言建模，解决了语音对话系统只能依赖 ASR/TTS 串联、难以在 LLM 内部原生处理语音输入输出的问题。

#### 🎯 核心要点

- **离散语音 token 原生建模**：用 HuBERT/mHuBERT + k-means 将语音转成 unit 序列，并去除相邻重复 unit
- **扩展 LLaMA 词表**：在文本 token 外追加 \(K\) 个 unit token，使同一个 decoder-only LLM 同时建模文本与语音 unit
- **三组件架构**：Discrete Unit Extractor 负责 speech-to-unit，LLaMA 负责跨模态理解与生成，Unit Vocoder 负责 unit-to-speech
- **三阶段训练流水线**：Modality-adaptation Pre-training → Cross-modal Instruction Fine-tuning → Chain-of-modality Instruction Fine-tuning
- **SpeechInstruct 数据构造**：利用 ASR/TTS 成对数据和 GPT-4 生成指令模板，构造跨模态 instruction-following 样本
- **语音对话闭环**：模型可接收文本或语音，输出文本或语音 unit，再通过多说话人 HiFi-GAN vocoder 合成语音

#### 🔬 深入细节

![SpeechGPT 架构与训练数据构造](https://ar5iv.labs.arxiv.org/html/2305.11000/assets/x2.png)
*图：SpeechGPT 的主体框架。连续语音先经过离散 unit 提取器进入 LLaMA 扩展词表，输出语音时由 LLM 生成 unit 序列并交给 unit vocoder 合成波形。*

##### 算法伪代码

```python
# SpeechGPT 三阶段训练与推理流程
def extract_units(waveform, hubert, kmeans):
    hidden = hubert(waveform)
    units = kmeans.predict(hidden)          # frame-level cluster ids
    return deduplicate_adjacent(units)      # remove repeated neighboring ids

def train_speechgpt(llama, speech_pairs, instruction_data, com_data):
    # 扩展文本词表：新增 <unit_0> ... <unit_K-1>
    llama.resize_vocab(additional_unit_tokens=K)

    # Stage 1: modality-adaptation pre-training
    for speech in speech_pairs.unlabeled_or_paired_speech:
        unit_seq = extract_units(speech.waveform, hubert, kmeans)
        loss = next_token_loss(llama, unit_seq)
        update(llama, loss)

    # Stage 2: cross-modal instruction fine-tuning
    for sample in instruction_data:
        # sample can be speech->text, text->speech, speech->speech, text->text
        prompt_tokens, answer_tokens = serialize_multimodal_instruction(sample)
        loss = response_only_loss(llama, prompt_tokens, answer_tokens)
        update(llama, loss)

    # Stage 3: chain-of-modality instruction-following
    for sample in com_data:
        # e.g. speech instruction -> text reasoning/answer -> speech response units
        chain_prompt, chain_answer = serialize_chain_of_modality(sample)
        loss = response_only_loss(llama, chain_prompt, chain_answer)
        update(llama, loss)

def speech_dialogue(waveform_or_text, llama, vocoder):
    prompt = to_text_or_unit_tokens(waveform_or_text)
    output_tokens = llama.generate(prompt)
    if contains_unit_tokens(output_tokens):
        return vocoder(unit_tokens(output_tokens))
    return detokenize_text(output_tokens)
```

##### 动机：摆脱 ASR-LLM-TTS 的硬级联

传统语音助手通常把语音交互拆成三段：ASR 把用户语音转文本，LLM 在文本空间生成回答，TTS 再把文本合成语音。这个范式工程上可行，但信息损失明显：ASR 会丢掉情绪、语调、停顿、说话风格等非文本线索，TTS 也只是把 LLM 的文本结果再包装成声音。SpeechGPT 的目标是让 LLM 直接“看见”和“说出”语音 token，而不是只处理 ASR 转录后的文本。

连续波形长度很长、采样率高，不适合直接作为 decoder-only LLM 的 token 序列。SpeechGPT 的折中方案是借助 HuBERT 类自监督模型把语音压缩成离散 unit：这些 unit 比文本 token 更贴近声学和韵律，又比原始波形短得多，可以被 LLaMA 当作一种新 token 类型建模。这样，语音理解和语音生成都被统一成 next-token prediction。

##### 离散 unit 表示与词表扩展

设 HuBERT/k-means 提取到的离散 unit 序列为：

$$
U=(u_1,u_2,\ldots,u_T),\qquad u_i\in\{0,1,\ldots,K-1\}
$$

由于连续帧常常落在同一个聚类中心，SpeechGPT 会删除相邻重复 unit，降低序列长度并减少 vocoder 合成时的冗余。随后模型把 LLaMA 原词表 \(V_{\text{text}}\) 扩展为：

$$
V'=V_{\text{text}}\cup \{ \langle unit_0\rangle,\ldots,\langle unit_{K-1}\rangle \}
$$

对应的 embedding 和 LM head 也追加新行：

$$
\mathbf{E}'=
\begin{bmatrix}
\mathbf{E}_{\text{text}}\\
\mathbf{E}_{\text{unit}}
\end{bmatrix},\qquad
\mathbf{W}'_{\text{lm}}=
\begin{bmatrix}
\mathbf{W}_{\text{text}}\\
\mathbf{W}_{\text{unit}}
\end{bmatrix}
$$

这个做法的意义在于架构最小化：不需要额外的 cross-attention adapter，也不需要把音频编码成连续 prefix embedding；语音 unit 和文本 token 在同一个自回归上下文中竞争下一个 token 概率。代价是模型必须通过训练学会 unit token 的统计规律，以及 unit 与文本语义之间的对齐关系。

##### 三阶段训练：先学语音 token，再学跨模态指令

第一阶段是 modality-adaptation pre-training。LLaMA 原本只见过文本 token，新增 unit embedding 是随机初始化的；如果直接做指令微调，模型很难稳定生成合法 unit 序列。因此 SpeechGPT 先用大量语音 unit 序列做自回归建模：

$$
\mathcal{L}_{\text{unit}}=-\sum_{t=1}^{T}\log p_\theta(u_t|u_{<t})
$$

这一步相当于把 LLaMA 适配成“语音 unit 语言模型”，让模型知道语音 token 的局部连续性、节奏和组合规律。它不是语音理解的全部，但为后续 speech-to-text、text-to-speech、speech-to-speech 指令学习提供了可生成的 unit 空间。

第二阶段是 cross-modal instruction fine-tuning。论文构造 SpeechInstruct，把 ASR、TTS 等配对数据包成指令样本，例如“听这段语音并写出内容”“把这句话说出来”。训练时通常只对回答部分计算损失：

$$
\mathcal{L}_{\text{inst}}=-\sum_{t\in \mathcal{A}}\log p_\theta(y_t|y_{<t},x)
$$

其中 \(x\) 是文本或语音 unit 形式的指令输入，\(\mathcal{A}\) 是答案 token 位置集合。这个阶段把语音 unit 与文本语义对齐，使模型能完成 speech-to-text 和 text-to-speech 的基本转换，也能处理混合输入输出格式。

第三阶段是 chain-of-modality instruction-following。它把跨模态任务组织成“语音输入 → 文本中间语义/回答 → 语音输出”一类链式样本，使模型学习在多轮对话中保持语义一致，并在需要时生成可由 vocoder 还原的 speech unit。这个阶段接近 ChatGPT 式对话微调，只是答案空间可以包含文本 token 与 unit token。

##### Unit vocoder：从离散语音 token 回到波形

SpeechGPT 输出语音时，LLM 生成的是 unit 序列而非声波。论文训练了多说话人 unit HiFi-GAN 来完成 unit-to-speech。生成器先用 lookup table 将 unit id 嵌入为连续向量，再经过转置卷积和残差块上采样；说话人 embedding 会拼接到每一帧，帮助模型合成指定或自然的说话人特征。判别器沿用 HiFi-GAN 的 Multi-Period Discriminator 与 Multi-Scale Discriminator，以提升周期性细节和整体音质。

> ⚠️ 注意：SpeechGPT 的“端到端语音对话”不是直接从波形到波形的单网络训练，而是以离散 unit 作为接口，把 speech tokenizer、LLM 和 vocoder 串成一个可训练/可推理的闭环。

##### 与 AudioGPT 类工具编排路线的区别

AudioGPT 这类系统把 LLM 当任务规划器，具体 ASR、TTS、音频生成仍由外部专家模型完成；SpeechGPT 则把语音 unit 纳入 LLM 词表，让跨模态对齐发生在 LLM 的 token 空间内。前者更容易快速接入多种音频工具，后者更接近“一个模型内部完成语音-文本-语音对话”的方向。

与直接连续语音 encoder 接 LLM 的方法相比，SpeechGPT 的优点是训练目标统一、实现简单、自回归生成天然支持 speech output；局限是离散 unit 会损失一部分细粒度声学信息，最终音质和韵律也受 unit extractor 与 vocoder 上限约束。因此它的贡献更偏向“语音 token 原生对话范式”，而不是最高保真语音合成系统。

#### 🧪 练习题

```yaml
question: "SpeechGPT 为什么要先进行 modality-adaptation pre-training？"
options:
  - "让 LLaMA 学会新增语音 unit token 的统计规律，避免直接指令微调时无法稳定生成语音 token"
  - "替代 HuBERT 的 k-means 聚类过程"
  - "训练一个新的 ASR 模型来生成文字转录"
  - "冻结 LLaMA，只训练 HiFi-GAN 判别器"
answer: 0
explain: "LLaMA 原始词表只包含文本 token，新增 unit token 没有可靠表示。第一阶段用语音 unit 序列做 next-token prediction，使模型先适应离散语音模态。"
```
