### GPT-2：无监督多任务语言模型
```yaml
id: gpt2
name: GPT-2
full_name: "无监督多任务语言模型 (Language Models are Unsupervised Multitask Learners)"
year: "2019.02"
org: "OpenAI"
paper_url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"
category: "autoregressive"
parent: "gpt"
motivation: "规模化带来零样本迁移"
```

#### 📝 一句话总结
GPT-2 提出用更大规模的 decoder-only Transformer 在高质量 WebText 上做纯自回归语言建模，解决了传统 NLP 任务依赖显式监督和任务专用微调的问题。它的核心发现是：当模型、数据和上下文窗口足够大时，同一个语言模型可以通过自然语言提示在阅读理解、翻译、摘要、问答等任务上产生零样本迁移能力。

#### 🎯 核心要点
- 训练目标保持极简：只优化 next-token prediction，不引入任务标签、任务头或多任务监督损失。
- 数据集使用 WebText：从 Reddit 高赞外链采样约 800 万网页、约 40GB 文本，强调文档质量和领域多样性。
- 模型是 GPT 的直接规模化版本：最大 GPT-2 为 1542M 参数、48 层、`d_model=1600`、上下文长度 1024。
- 输入表示使用 byte-level BPE，词表扩展到 50,257，使模型可以给任意 Unicode 字符串赋概率并减少预处理不一致。
- 零样本任务通过自然语言序列化完成：把 `task`、`input`、`output` 都写成同一段文本，估计 \(p(\text{output}\mid\text{input},\text{task})\)。
- 架构细节包括 pre-LN、最终 self-attention block 后额外 LayerNorm、残差路径初始化按深度缩放 \(1/\sqrt{N}\)。
- 论文展示模型规模与零样本能力的强相关：1542M 模型在 8 个语言建模基准中 7 个达到 zero-shot SOTA，并在 LAMBADA、CBT、Winograd 等任务上显著提升。

#### 🔬 深入细节
![GPT-2 官方发布页示意图](https://images.ctfassets.net/kftzwdyauwt9/8df9d1ca-5128-41d0-81527fd4752f/488482a9bebc41f8d72e1d0d423a5891/better-language-models.jpg?fm=webp&q=90&w=3840)
*图：OpenAI 官方 GPT-2 发布页配图。论文 Figure 1 的主信息是 WebText 语言模型的 zero-shot 任务表现随模型规模增大而系统提升。*

```python
# GPT-2 的核心训练与零样本使用流程
model = DecoderOnlyTransformer(
    vocab_size=50257,
    context_length=1024,
    layers=48,
    d_model=1600,
)

for document in WebText:
    tokens = byte_level_bpe(document)
    for window in sliding_windows(tokens, length=1024):
        x = window[:-1]
        y = window[1:]
        logits = model(x)
        loss = cross_entropy(logits, y)
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

# 下游任务不增加新头，也不微调参数，只把任务写进 prompt
def zero_shot_infer(task, input_text):
    prompt = serialize_as_natural_language(task, input_text)
    return autoregressive_decode(model, prompt)
```

GPT-2 的方法论起点是把语言建模视为通用的序列概率估计。对一段符号序列 \(x=(s_1,\ldots,s_n)\)，模型分解联合概率：

$$
p(x)=\prod_{i=1}^{n}p(s_i\mid s_1,\ldots,s_{i-1})
$$

训练时最小化负对数似然：

$$
\mathcal{L}(\theta)=-\sum_{i=1}^{n}\log p_\theta(s_i\mid s_{<i})
$$

这个公式本身没有写任何“翻译”“摘要”“问答”的监督项，但论文的关键观察是：互联网页面中天然包含大量任务演示。例如“英文句子 + 法文翻译”“问题 + 文档 + 答案”“文章 + TL;DR 摘要”都可以被视为同一类序列预测样本。只要语料足够多样，最大化整段文本似然就会迫使模型学习这些隐式格式，从而在推理时通过 prompt 激活相应能力。

与显式多任务学习相比，GPT-2 不需要为每个任务设计数据集、标签格式、任务头或损失权重。传统 supervised multitask 可以写成 \(p(\text{output}\mid\text{input},\text{task})\)，但通常要人工提供 \((\text{task},\text{input},\text{output})\) 三元组；GPT-2 的做法是让自然语言本身承担 task conditioning 的角色，把任务描述、输入和待生成输出串接为同一 token 序列。这样，下游任务从“训练一个新模型”变成“构造一个让语言模型续写的上下文”。

架构上，GPT-2 基本沿用 GPT 的 decoder-only Transformer：每个位置只能看见左侧上下文，自注意力输出经过前馈层和残差连接。论文做了几处对大模型训练很重要的工程修改：LayerNorm 移到每个子块输入处，类似 pre-activation ResNet；最后一个 self-attention block 后再加 LayerNorm；残差层初始化按 \(1/\sqrt{N}\) 缩放，避免 48 层模型中残差信号随深度累积过大。最大模型上下文从 GPT 的 512 增加到 1024 token，批大小为 512，这让模型可以利用更长的文档级依赖。

输入表示是 GPT-2 的另一处关键设计。论文使用 byte-level BPE，而不是依赖固定词级词表或语言特定 tokenizer。直觉上，纯 byte 表示过长、学习困难，纯 word 表示又无法稳健覆盖拼写、罕见词、代码和多语言字符；byte-level BPE 在二者之间折中，既能把常见片段合并为较短 token，又保留对任意字符串建模的能力。这也是 GPT-2 可以直接评测不同语言建模基准、减少 `<UNK>` 与预处理差异的原因。

训练流程没有“预训练后微调”的第二阶段。论文在评测中明确强调 no training or fine-tuning：模型参数固定，只通过不同 prompt 诱导任务。例如阅读理解可以把文档、对话历史和 `A:` 作为条件让模型续写答案；摘要可以在文章后追加 `TL;DR:`；翻译可以给出自然语言中常见的双语表达模式。这个设置比 GPT-1 更激进：GPT-1 证明了预训练表示对微调有帮助，而 GPT-2 进一步证明了规模化语言模型本身会在零样本下显现任务能力。

> 💡 关键：GPT-2 的“无监督多任务”不是显式地训练多个任务，而是把互联网文本中的自然语言任务演示都归入同一个自回归建模目标。

论文结果的主要含义不是 GPT-2 在所有下游任务上已经可用，而是 zero-shot 曲线随参数量单调改善。1542M 模型在 LAMBADA 上取得 8.63 perplexity 和 63.24% accuracy，在 Winograd Schema Challenge 上达到 70.70%，并在多个语言建模数据集上超过当时的专用系统。不过论文也指出，摘要、翻译、问答等开放任务仍远不稳定，很多表现只是“开始学会任务”的证据，而不是完成任务的工程系统。

#### 🧪 练习题
```yaml
question: "GPT-2 为什么能够在没有下游微调的情况下尝试翻译、摘要、问答等任务？"
options:
  - "因为它为每个任务训练了独立的分类头"
  - "因为 WebText 中存在自然语言形式的任务演示，统一的自回归目标会学习这些模式"
  - "因为 byte-level BPE 会自动生成监督标签"
  - "因为模型在评测集上继续训练了若干步"
answer: 1
explain: "GPT-2 的关键是把 task、input、output 都看作自然语言序列的一部分；大规模 WebText 中的隐式任务演示让 next-token prediction 学到零样本迁移模式。"
```
