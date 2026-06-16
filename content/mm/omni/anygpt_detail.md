### 任意模态GPT (AnyGPT)

```yaml
id: anygpt
name: AnyGPT
full_name: 任意模态GPT (AnyGPT)
year: '2024'
org: 复旦/上海AI Lab
paper_url: https://aclanthology.org/2024.findings-acl.521/
category: autoregressive
parent: —
motivation: 离散Token统一处理所有模态
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/anygpt_detail.md
```

#### 📝 一句话总结

AnyGPT 提出用离散 token 统一表示文本、图像、语音和音乐，让现有 LLM 在不改 Transformer 架构和训练目标的前提下完成任意模态到任意模态的理解与生成。它的关键不是增加大量模态专用桥接层，而是把多模态输入输出都变成同一种自回归 token 序列。

#### 🎯 核心要点

- **统一离散序列建模**：图像、语音、音乐先由专用 tokenizer 压缩为离散 token，再与文本 token 交错拼接给 LLaMA-2-7B 做 next-token prediction
- **模型结构基本不变**：只扩展词表、输入 embedding 和输出 prediction head，LLM 主体结构与语言模型训练范式保持不变
- **多模态 tokenizer/de-tokenizer 组合**：图像使用 SEED tokenizer 与扩散式解码，语音使用 SpeechTokenizer 语义 token + SoundStorm 补全声学 token，音乐使用 Encodec RVQ token
- **两级生成策略**：LLM 负责语义级 token，非自回归或扩散式后处理模块负责恢复高保真感知细节，缓解音频/图像长序列带来的自回归负担
- **文本中心对齐预训练**：利用文本作为语义桥，将不同模态先与文本对齐，再间接实现模态间互相对齐
- **AnyInstruct-108k**：用生成模型合成 108k 条多轮、交错多模态 instruction 数据，训练模型在对话中自由选择输出文本、图像、语音或音乐

#### 🔬 深入细节

##### 框架总览

![AnyGPT 模型架构总览](https://arxiv.org/html/2402.12226v2/x1.png)
*图：AnyGPT 将各模态先离散化为 token，LLM 在统一 token 序列上做自回归理解与生成，再由对应 de-tokenizer 还原为图像、语音或音乐。*

AnyGPT 的核心动机是避免“每个模态一套 encoder/decoder 投影接口”的系统复杂度。NExT-GPT 这类方案把 LLM 接到外部编码器和扩散解码器，输入侧和输出侧的表示形式并不统一；AnyGPT 则把非文本模态先转成离散语义 token，使图像、语音、音乐在 LLM 看来更像“新语言”。因此训练目标可以保持为标准语言模型目标：

$$
\mathcal{L}_{\mathrm{NTP}}=-\sum_{t=1}^{T}\log p_{\theta}(z_t \mid z_{<t})
$$

其中 \(z_t\) 可以是文本 BPE token，也可以是图像、语音或音乐 tokenizer 产生的离散 token。这样做的工程含义很直接：新增模态主要发生在数据预处理、词表扩展和后处理模块上，而不是重写 LLM 主干。

##### 核心流程伪代码

```python
# AnyGPT 统一离散序列训练流程
for dialogue in multimodal_corpus:
    seq = []
    for segment in dialogue:
        if segment.type == "text":
            seq += text_tokenizer(segment.text)
        elif segment.type == "image":
            seq += ["<image>"] + seed_tokenizer(segment.image) + ["</image>"]
        elif segment.type == "speech":
            semantic = speech_tokenizer.semantic_tokens(segment.audio)
            seq += ["<speech>"] + semantic + ["</speech>"]
        elif segment.type == "music":
            rvq_codes = encodec_tokenizer(segment.music)
            seq += ["<music>"] + flatten_frame_by_frame(rvq_codes) + ["</music>"]

    logits = llama2(seq[:-1])
    loss = cross_entropy(logits, seq[1:])
    update(llama2, loss)

# 推理时按特殊边界 token 分段，再交给对应 de-tokenizer
generated = autoregressive_decode(llama2, prompt_tokens)
outputs = detokenize_by_modality(generated)
```

##### 离散 token 是统一性的关键

AnyGPT 对不同模态采取“语义压缩优先”的 tokenizer 设计。图像侧使用 SEED tokenizer：输入 \(224\times224\) 图像，经 ViT 与 Causal Q-Former 得到 32 个因果视觉 embedding，再由 VQ codebook 离散化；这些 token 与 unCLIP Stable Diffusion 的潜空间对齐，方便后续还原为高质量图像。语音侧使用 SpeechTokenizer 的第一层 RVQ token 作为语义 token，后续声学细节交给 SoundStorm 与解码器补全；音乐侧使用 Encodec 的 RVQ code，并按帧展开成自回归序列。

词表扩展可以写成：

$$
V=\sum_{i=1}^{n}V_i
$$

其中 \(V_i\) 是第 \(i\) 个模态的离散词表大小。直觉上，AnyGPT 不强迫 LLM 直接预测高维像素或波形，而是预测已经被 tokenizer 压缩过的语义索引；tokenizer 的质量决定了上限，LLM 的困惑度决定了跨模态组合与推理能力。

##### 训练数据用文本做桥

多模态任意互转的真实数据稀缺，AnyGPT 采用文本中心的对齐策略：先收集图文、语音文本、音乐文本等配对数据，让每个非文本模态都能映射到自然语言语义空间；由于文本本身是最密集、最成熟的语义表示，模态 A 和模态 B 只要都能与文本对齐，就可以通过同一个 LLM 隐空间产生间接对齐。

在 instruction 阶段，作者进一步合成 AnyInstruct-108k。合成流程先生成文本版多轮对话、主题和场景，再把对话中的占位内容转换成图像、语音或音乐。这一步解决的是“模型什么时候应该输出哪种模态”的问题，而不仅是“给定 X 生成文本”。因此 AnyGPT 可以在同一轮回复中混合文本解释、图片、语音或音乐片段。

##### 生成分成语义层和感知层

纯自回归 LLM 直接生成高保真音频或图像会遇到序列极长的问题。AnyGPT 将生成拆成两层：LLM 只生成语义层离散 token，感知层细节由专业 de-tokenizer 生成。图像 token 交给扩散模型还原，语音语义 token 先由 SoundStorm 生成声学 token，再由 SpeechTokenizer decoder 还原波形；音乐 token 则由 Encodec decoder 复原。

> 💡 关键：AnyGPT 的“统一”发生在语义 token 层，而不是像素、波形或扩散 latent 层。这样既保留 LLM 的推理和对话能力，也把高保真重建交给更适合的专用生成器。

#### 🧪 练习题

```yaml
question: "AnyGPT 能在不大改 LLM 架构的情况下支持多模态生成，最核心的原因是什么？"
options:
  - "把所有非文本模态先转换为离散 token，并继续使用 next-token prediction"
  - "为每个模态训练一个独立的大型 Transformer"
  - "完全依赖外部工具链，不训练 LLM"
  - "只把图像和语音转写成文本描述"
answer: 0
explain: "AnyGPT 的统一性来自离散 token 序列建模；非文本模态被当作新词表中的 token，LLM 主体仍按标准自回归目标训练。"
```
