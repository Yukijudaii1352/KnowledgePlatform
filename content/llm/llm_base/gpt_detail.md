### GPT (Improving Language Understanding by Generative Pre-Training)

```yaml
id: gpt
name: GPT
full_name: 生成式预训练Transformer (Generative Pre-training Transformer)
year: "2018"
org: OpenAI
paper_url: https://arxiv.org/abs/1806.03762
category: foundation
parent: Transformer
motivation: 使用大规模无标签文本进行生成式预训练，再通过判别式微调适配下游任务，减少对标注数据的依赖
```

---

#### 📝 一句话总结

GPT 提出“生成式预训练 + 判别式微调”的两阶段范式：在大量无标签语料上训练一个单向 Transformer 语言模型，再为目标任务引入输入变换和微调，大幅降低了对有监督标注数据的依赖，在 12 项 NLP 基准中 9 项刷新最佳结果。

#### 🎯 核心要点

- 采用 12 层 Transformer **decoder-only** 架构（768 维，12 头），仅使用 Masked Self-Attention 保持从左到右的自回归约束
- 第一阶段：在 **BooksCorpus**（7,000+ 本未出版书籍）上做生成式预训练，建模长距离连续文本的语言规律
- 第二阶段：引入 **traversal-style** 输入变换，将各类 NLP 任务（蕴含、问答、相似度、分类）统一为连续 token 序列，并在微调时加入辅助语言建模目标（Auxiliary LM Objective）
- 辅助 LM 目标作为正则项：\(L = L_{cls} + \lambda \cdot L_{lm}\)，提升大数数集的泛化能力，加速收敛
- 在 12 个下游任务上验证，全面超越当时的 SOTA（包括 RACE、RTE、SNLI 等 9/12）；零样本生成行为随预训练推进稳定提升

#### 🔬 深入细节

![GPT 架构图](https://raw.githubusercontent.com/openai/finetune-transformer-lm/master/assets/gpt_schema.png)
*图：GPT 两阶段训练框架。左：Transformer 架构与预训练过程；右：不同下游任务（分类、蕴含、相似度、多项选择）的输入变换方案。*

##### 动机与背景

深度学习方法虽然能在大量有监督数据上取得优异表现，但大量领域缺乏足够的标注数据。传统 NLP 依赖精心设计的任务特定模型和人工特征，迁移能力不足。GPT 的核心动机是：**能否从海量无标签文本中学习出通用语言表征，再将其快速迁移到不同有监督任务上？**

ElMo 等基于 LSTM 的双向语言模型嵌入方法受限于浅层特征融合，而 Transformer 在处理长距离依赖上天然更优（得益于自注意力机制）。GPT 的关键洞察是：用 **单向自回归的 Transformer** 做生成式预训练，既可充分利用大规模文本，又无需修改模型结构即可适配不同的判别式微调任务。

##### 预训练阶段

给定无标签语料 token 序列 \(\mathcal{U} = \{u_1, \dots, u_n\}\)，标准语言模型目标为最大化：

\[
L_1(\mathcal{U}) = \sum_i \log P(u_i \mid u_{i-k}, \dots, u_{i-1}; \Theta)
\]

模型先过一层 Text & Position Embedding（位置用学习式，非 sinusoid），再堆叠 **12 层 Masked Decoder Block**。每层包含：

- Masked Multi-Head Self-Attention（mask 保证第 \(i\) 个 token 只能看到 \(<i\) 的位置）
- Layer Normalization + Residual Connection
- 两层 Position-wise Feed-Forward（GELU 激活，内层维度 3072）

最后经 softmax 输出 \(P(u_i | \text{context})\)。训练数据集 **BooksCorpus** 包含约 7,000 本未出版书籍（~1B words），远大于 1B Word Benchmark，且以长段落为主，有助于模型学习长程依赖。训练细节：BPE subword 40,000 合并（堆用 spaCy ftfy）、Adam(lr=2.5e-4)、batch 64、sequence 512、epoch 100，weight decay 0.01。

##### 微调阶段与输入变换

微调时的核心挑战是：**如何用同一个预训练 LM 处理不同形状的 NLP 任务**（如两个句子的蕴含判断、含上下文的答案选择）。GPT 引入 **traversal-style** 输入变换：

- **文本蕴含（Entailment）**：将 premise 和 hypothesis 拼接为 `[Start] premise $ hypothesis [Extract]`，取最后一个 token 的隐藏层表示进行分类。
- **语义相似度**：由于句子对无序，构造两种拼接顺序 `文本1 $ 文本2` 与 `文本2 $ 文本1`，将两个表示按元素加和后进行线性变换。
- **多项选择（QA）**：将上下文与每个候选答案分别拼接后独立处理，取 softmax 归一后的分数。
- **单句分类**：直接 `[Start] 文本 [Extract]`。

微调损失包括两部分：

\[
L = L_{cls} + \lambda \cdot L_{lm}, \quad L_{cls} = \sum_{(x,y)} \log P(y|x)
\]

\(L_{lm}\) 是**辅助语言建模目标**，即在微调数据上持续优化 LM 损失。论文实验发现：\(\lambda = 0.5\) 在大数据集（如 SNLI ~550k）上明显提分（+1.5–2%），小数据集上不显著或略微负面，视为正则项。

##### 与传统方法的区别

| 方法 | 架构 | 迁移方式 | 任务适配 |
|------|------|----------|----------|
| ElMo | Bi-LSTM | 冻结嵌入拼接 | 需任务特定架构 |
| ULMFiT | LSTM | 分层微调 | 需判别式/层取 LR |
| **GPT** | **Transformer Decoder** | **两阶段预微调** | traversal-style 输入统一 |

GPT 的关键创新在于 **task-agnostic backbone**：不做架构改动，靠输入层的文本拼接在 12 个任务上工作。且 GPT 首次在大规模长文本（BooksCorpus）上验证了 Transformer LM 的迁移能力，“long-range”预训练是核心。

> 💡 关键：单向（left-to-right）masked self-attention 是 GPT 与 BERT 的最大区别——后者双向，更适合理解任务；GPT 的生成式先天更适合文本生成，但理解任务通过 traversal-style 转换得以弥补。

##### 深度分析与消融

1. **层次迁移增益**（图 2 左）：每叠加一个预训练层，性能单调上升。24 层全转移比仅用 embeddings 高 **9%**（MultiNLI），充分说明各层学到的语义功能均有价值。

2. **零样本行为**（图 2 右）：随预训练步数增加，零样本启发式性能（SST-2、CoLA 等）稳定提高，说明生成式预训练在语言建模过程中**自发习得了广泛的任务相关功能**。LSTM 零样本方差大，Transformer 的归纳偏置更利于迁移。

3. **消融实验**（Table 5）：
   - 去掉辅助 LM：NLI/QPP 下降明显（1–2%），小数据集反而略好或持稳 → 辅助 LM 主要对大数据集有益
   - 换为 2048 单元 LSTM：总分降 **5.6 分**，MRPC 除外 → Transformer 模型家结构优势明显
   - 去掉预训练：总分降 **14.8%** → 预训练是性能的核心来源

##### 算法伪代码

```python
# ==== 阶段一：生成式预训练 ====
for epoch in range(100):
    for batch in BooksCorpus_iter(batch_size=64, seq_len=512):
        x = text_to_bpe(batch)          # Byte-Pair Encoding
        logits = transformer_decoder(x) # 单向 masked self-attn
        loss_lm = cross_entropy(logits[:, :-1], x[:, 1:])
        adam.step(loss_lm, lr=2.5e-4, sche dual_cosine)

# ==== 阶段二：判别式微调 ====
for epoch in range(3):  # 下游任务仅 3 epoch
    for batch in task_data_iter():
        x, y = traversal_style_transform(batch)  # 特殊 token 分隔
        h = transformer_decoder(x)
        loss_cls = cross_entropy(linear(h_last), y)
        loss_lm  = cross_entropy(logits[:, :-1], x[:, 1:])  # 辅助 LM
        loss = loss_cls + 0.5 * loss_lm
        adam.step(loss, lr=6.25e-5, sche d linear decay)
```

#### 🧪 练习题

```yaml
question: "GPT 在微调阶段引入辅助语言建模目标（Auxiliary LM Objective）的主要作用是什么？"
options:
  - "替换主分类损失，直接优化语言模型"
  - "作为正则项，帮助模型在大数据集上提升泛化能力"
  - "生成文本标签以替代人工标注"
  - "减少 Transformer 的参数量"
answer: 1
explain: "辅助 LM 目标与分类损失联合优化，起到正则化作用，在大数据集如 SNLI 上可提升约 1.5–2% 的性能，同时加速收敛。小数据集上提升不大但未见显著负面效应。"
```