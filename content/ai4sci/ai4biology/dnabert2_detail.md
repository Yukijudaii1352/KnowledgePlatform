### DNABERT-2 — 用 BPE 与 ALiBi 构建高效多物种 DNA 基础模型

```yaml
id: dnabert2
name: DNABERT-2
full_name: DNABERT-2 (DNABERT-2)
year: '2024.01'
org: 周德中团队
paper_url: https://openreview.net/forum?id=7YUC79v69G
category: genomics
parent: dnabert
motivation: BPE分词解决长序列效率问题
```

#### 📝 一句话总结

DNABERT-2 用 BPE tokenizer、ALiBi 位置偏置和高效 Transformer 重新设计 DNA 语言模型，解决 DNABERT 固定重叠 k-mer 带来的词表膨胀、信息泄漏和长序列外推效率问题。它同时提出 Genome Understanding Evaluation (GUE) 基准，用多物种基因组预训练模型验证 DNA 表征的泛化能力。

#### 🎯 核心要点

- **BPE DNA tokenizer**：从碱基字符出发按频繁相邻片段合并，学习可变长 DNA token，避免固定 k-mer 的指数级词表和相邻 token 强重叠
- **多物种预训练**：不再只依赖单一人类参考基因组，而是使用跨物种基因组片段，让模型学习更通用的序列上下文规律
- **ALiBi 位置编码**：用注意力分数中的距离相关线性偏置替代绝对位置 embedding，提升模型对比训练长度更长序列的外推能力
- **高效 Transformer 实现**：结合现代 BERT-style encoder、FlashAttention 等训练优化，在较小参数量和更少 GPU 时间下达到强基因组任务表现
- **GUE 基准**：覆盖 promoter、transcription factor binding、splice site、epigenetic marks、mouse regulatory 等多类任务，用统一 benchmark 比较 DNA foundation models
- **兼容下游微调**：预训练后可接分类或回归 head，用 `[CLS]` 或池化序列表征处理调控分类、序列功能预测等任务
- **针对 DNABERT 的改进**：重点修复固定重叠 k-mer 的三个问题：上下文泄漏、长输入 token 数过多、不同 \(k\) 需要不同模型/词表

#### 🔬 深入细节

##### 方法示意图与可访问来源

![DNABERT-2 BPE tokenization illustration](https://arxiv.org/html/2306.15006v2/x2.png)
*图：DNABERT-2 论文中的 BPE 分词示意。DNA 片段先由单碱基 token 出发，迭代合并高频相邻片段，最终得到可变长度的 DNA “词”。*

可访问来源说明：任务 YAML 给出的 OpenReview 链接保留在元信息中；实际可访问论文页包括 OpenReview 论文页 `https://openreview.net/forum?id=oMLQB4EZE1`、arXiv HTML `https://arxiv.org/html/2306.15006v2` 和官方 Hugging Face 模型页 `https://huggingface.co/zhihan1996/DNABERT-2-117M`。

##### 算法伪代码

```python
# DNABERT-2 的简化训练与微调流程
def train_bpe_tokenizer(genome_sequences, vocab_size):
    vocab = {"A", "C", "G", "T", "N"}
    corpus = [list(seq) for seq in genome_sequences]

    while len(vocab) < vocab_size:
        pair = most_frequent_adjacent_pair(corpus)
        merged = pair[0] + pair[1]
        corpus = merge_pair_everywhere(corpus, pair, merged)
        vocab.add(merged)
    return vocab


def pretrain_dnabert2(genome_windows, tokenizer, encoder):
    for dna in genome_windows:
        tokens = tokenizer.encode(dna)
        tokens = truncate_or_pad(tokens, max_length=512)

        masked, mask_positions, labels = mask_tokens(tokens)
        hidden = encoder(masked, attention_bias="ALiBi")

        loss = 0.0
        for pos, target in zip(mask_positions, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), target)
        optimizer.step(loss)


def finetune(sequence, tokenizer, encoder, task_head):
    tokens = tokenizer.encode(sequence)
    hidden = encoder(tokens, attention_bias="ALiBi")
    representation = hidden[0]       # [CLS] 或等价序列级表示
    return task_head(representation)
```

##### 为什么固定 k-mer 需要被替换

原始 DNABERT 把 DNA 序列切成重叠 k-mer。给定长度为 \(L\) 的序列和固定 \(k\)，token 数约为 \(L-k+1\)，词表大小为：

$$
|\mathcal{V}_{k\text{-mer}}| = 4^k + |\mathcal{V}_{\mathrm{special}}|
$$

当 \(k\) 增大时，词表按指数增长；当 \(k\) 较小时，每个 token 的生物学上下文又不足。更关键的是相邻 k-mer 共享 \(k-1\) 个碱基，例如 `ACGTTA` 与 `CGTTAG` 几乎完全重叠。若 MLM 只 mask 某个 k-mer，模型能从左右邻居恢复大部分答案，这会把预训练任务变得过于容易。

DNABERT-2 的 BPE 思路是让 token 长度由数据决定。它从单碱基词表开始，反复合并出现频率最高的相邻 token 对：

$$
(u^\*, v^\*) =
\arg\max_{(u,v)}
\mathrm{count}(u, v)
$$

合并后新 token 为 \(w=u^\*v^\*\)。经过多轮合并，常见 motif、重复片段和短上下文会成为更长 token，而罕见片段仍可由更短 token 组合表示。这比固定 k-mer 更灵活：高频局部模式被压缩，长序列的 token 数下降，且不需要为每个 \(k\) 单独训练模型。

##### MLM 目标与 DNA BPE 的直觉

DNABERT-2 仍采用 BERT-style masked language modeling。设 token 序列为 \(\mathbf{t}=(t_1,\ldots,t_n)\)，mask 位置集合为 \(\mathcal{M}\)，预训练目标为：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \mathbf{t}_{\setminus\mathcal{M}})
$$

由于 BPE token 可长可短，预测一个 token 可能对应一个碱基，也可能对应一段常见 DNA 片段。直觉上，模型不再只学习“相邻 k-mer 怎么重叠”，而是学习哪些 DNA 片段经常在某些上游/下游上下文中出现。这一点对 promoter、TF binding site、splice site 等任务尤其重要，因为功能信号常来自短 motif 与周围背景的组合，而不是单个固定窗口。

##### ALiBi 如何支持长序列外推

标准 BERT 使用绝对位置 embedding：

$$
h_i^{(0)} = e(t_i) + p_i
$$

这种做法在训练长度外的序列上不自然，因为模型只见过有限位置索引。DNABERT-2 使用 ALiBi，把距离惩罚直接加到注意力 logit 中。对第 \(h\) 个 attention head，可写为：

$$
\mathrm{Attn}_{h}(i,j)
= \mathrm{softmax}_j
\left(
\frac{q_i^\top k_j}{\sqrt{d}}
- m_h |i-j|
\right)
$$

其中 \(m_h\) 是该 head 的斜率。近距离 token 的注意力分数更少被惩罚，远距离 token 仍可被关注但需要更强内容匹配。这样做的工程价值是明确的：DNA 调控任务经常需要比预训练窗口更长的上下文，ALiBi 比固定位置表更适合向长输入外推。

##### 训练与下游流程

DNABERT-2 的训练流程可以理解为三层：先训练 BPE tokenizer，再用多物种基因组片段做 MLM 预训练，最后在 GUE 等下游任务上微调。预训练阶段只需要原始基因组序列，不需要标签；下游阶段则把 encoder 输出接到任务 head。二分类任务可写作：

$$
\hat{y} = \sigma(W h_{\mathrm{[CLS]}} + b),
\quad
\mathcal{L}_{\mathrm{cls}}
= -y\log\hat{y} - (1-y)\log(1-\hat{y})
$$

对多分类任务则使用 softmax 交叉熵：

$$
\hat{\mathbf{y}}=\mathrm{softmax}(W h_{\mathrm{[CLS]}}+b),
\quad
\mathcal{L}_{\mathrm{ce}}
=-\sum_c y_c\log \hat{y}_c
$$

GUE 的意义不只是提供分数表，而是把不同基因组任务统一成可复现的测试环境。早期 DNA 语言模型常在不同数据集、不同划分和不同微调协议下比较，结论容易混杂；GUE 让 tokenizer、预训练数据、模型大小和微调策略的影响更容易被拆开。

##### 与 DNABERT 的关键区别

| 维度 | DNABERT | DNABERT-2 |
|------|---------|-----------|
| tokenization | 固定重叠 k-mer | 数据驱动 BPE 可变长 token |
| 词表扩展 | \(4^k\) 指数增长 | 词表大小由训练合并次数控制 |
| mask 泄漏 | 相邻 k-mer 高度重叠，易泄漏答案 | token 边界不固定，泄漏显著缓解 |
| 位置建模 | 绝对位置 embedding | ALiBi 距离偏置，长序列外推更自然 |
| 预训练语料 | 以人类基因组为主 | 跨物种基因组片段 |
| 评测方式 | 多个任务分别报告 | 提出统一 GUE benchmark |

> 💡 关键：DNABERT-2 的核心贡献不是单纯“换了分词器”，而是把 DNA token 粒度、长上下文位置建模和统一评测协议一起重做，使 DNA foundation model 更像一个可迁移的通用编码器。

#### 🧪 练习题

```yaml
question: "DNABERT-2 用 BPE 替代固定重叠 k-mer 的主要原因是什么？"
options:
  - "BPE 可以学习可变长 DNA token，减少固定 k-mer 的词表膨胀和重叠泄漏"
  - "BPE 会把所有 DNA 序列压缩成一个 token，因此不需要 Transformer"
  - "BPE 只能用于蛋白质序列，不能用于基因组序列"
  - "BPE 的目标是替代 masked language modeling 损失函数"
answer: 0
explain: "固定 k-mer 会带来指数级词表和相邻 token 高度重叠；BPE 通过频繁片段合并得到可变长 token，使长序列建模更高效并缓解 MLM 答案泄漏。"
```
