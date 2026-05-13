### Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

```yaml
id: rag
name: "RAG: Retrieval-Augmented Generation"
year: 2020.05
organization: Meta AI (Facebook AI Research)
category: foundation
paper_url: "https://arxiv.org/abs/2005.11401"
parent: dpr
```

#### 📝 一句话总结

RAG 将预训练的神经检索器（DPR）与预训练的 seq2seq 生成器（BART）相结合，通过将检索到的文档作为隐变量进行端到端联合训练，使语言模型能够动态访问外部知识库，在多个知识密集型任务上取得了当时的 SOTA 结果。

#### 🎯 核心要点

- **参数化 + 非参数化记忆融合**：将 BART 的参数化知识与 Wikipedia 向量索引的非参数化知识统一到一个概率框架中，兼具生成灵活性和知识精确性
- **两种边际化策略**：提出 RAG-Sequence（同一文档生成整个序列）和 RAG-Token（不同 token 可依赖不同文档）两种变体，适配不同任务需求
- **端到端可微训练**：检索器和生成器联合微调，无需检索监督信号，仅用问答对即可训练
- **知识可热更新**：替换文档索引即可更新模型知识，无需重新训练，解决了纯参数化模型知识过时的问题
- **广泛任务验证**：在开放域 QA（NQ 44.5 EM）、抽象 QA（MSMARCO）、问题生成（Jeopardy）和事实验证（FEVER 72.5%）四类任务上均超越基线

#### 🔬 深入细节

##### 核心图示

![RAG Architecture](https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png)

**图 1**：RAG 整体架构。输入 query $x$ 经 Query Encoder 编码后，通过 MIPS 从 Document Index 中检索 top-K 文档 $z_i$；Generator（BART）将输入 $x$ 与每个检索文档 $z_i$ 拼接后分别生成输出，最终对所有文档的生成概率进行边际化得到最终预测 $y$。

##### 算法伪代码

```
Algorithm: RAG Inference (RAG-Sequence)
────────────────────────────────────────
Input: query x, document index D, retriever p_η, generator p_θ, top-K
Output: generated sequence y

1. q ← BERT_query(x)                          // 编码 query
2. Z_topK ← MIPS(q, D, K)                     // 检索 top-K 文档
3. for each z_i in Z_topK do
4.     score_i ← q · d(z_i)                   // 检索相关性分数
5.     p_η(z_i|x) ← softmax(score_i)          // 归一化为检索概率
6. end for
7. for each z_i in Z_topK do
8.     Y_i ← BeamSearch(p_θ(·|x, z_i))        // 对每个文档独立 beam search
9. end for
10. Y ← ∪_i Y_i                               // 合并候选集
11. for each y in Y do
12.    p(y|x) ← Σ_i p_η(z_i|x) · p_θ(y|x,z_i)  // 边际化
13. end for
14. return argmax_y p(y|x)
```

```
Algorithm: RAG Training
────────────────────────────────────────
Input: training pairs {(x_j, y_j)}, retriever p_η, generator p_θ
Output: updated parameters η (query encoder), θ (BART)

1. for each (x, y) in training data do
2.     q ← BERT_query(x)
3.     Z_topK ← MIPS(q, D, K)                 // 文档编码器固定不更新
4.     loss ← -log Σ_{z∈Z_topK} p_η(z|x) · Π_i p_θ(y_i|x,z,y_{1:i-1})
5.     Update θ, η_query via backprop(loss)    // 仅更新 query encoder + BART
6. end for
// 注：document encoder 固定，避免频繁重建索引
// MIPS 索引异步更新（实验发现不更新影响不大）
```

##### 方法详解

**1. 动机与问题**

预训练语言模型（如 GPT-2、BART、T5）将知识隐式存储在参数中，存在三个核心问题：(1) 无法精确访问和修改特定知识；(2) 模型规模必须足够大才能记住足够多的知识；(3) 知识随时间过时后无法更新。传统的检索增强方法要么从头训练、要么仅用于抽取式任务。RAG 的核心动机是：**能否为预训练的生成模型添加一个可学习的非参数化记忆模块，使其在保持生成灵活性的同时精确访问外部知识？**

**2. 核心机制**

RAG 将检索到的文档视为隐变量（latent variable），通过边际化将检索与生成统一到一个端到端的概率框架中：

- **检索器** $p_\eta(z|x)$：基于 DPR，使用双塔 BERT 编码器。Query encoder $\text{BERT}_q(x)$ 编码输入，Document encoder $\text{BERT}_d(z)$ 编码文档（预计算并建立 FAISS 索引）。通过最大内积搜索（MIPS）高效检索 top-K 相关文档。

- **生成器** $p_\theta(y_i|x,z,y_{1:i-1})$：基于 BART-large。将输入 $x$ 与检索文档 $z$ 简单拼接作为编码器输入，解码器自回归生成输出。

- **两种边际化方式**：
  - **RAG-Sequence**：假设同一个文档负责生成整个输出序列，先对每个文档独立生成完整序列，再按文档概率加权求和。适合答案来自单一来源的任务。
  - **RAG-Token**：允许每个 token 依赖不同的文档，在每个生成步骤对所有文档的 token 概率加权求和。适合需要综合多文档信息的生成任务。

**3. 训练与推理细节**

- **训练**：联合最小化负对数似然。检索器和生成器通过梯度同时更新，但仅更新 query encoder 参数 $\eta$（document encoder 固定以避免频繁重建索引）。使用 Adam 优化器，学习率 1e-5，batch size 128。检索 top-5 或 top-10 文档。
- **推理**：RAG-Token 可直接用标准 beam search（每步对文档维度求和后取 top beam）。RAG-Sequence 需要特殊解码：对每个文档独立 beam search 生成候选集，合并后重新计算边际化概率排序（"Thorough Decoding"），或近似假设未在某文档 beam 中出现的序列概率为零（"Fast Decoding"）。
- **知识源**：使用 2018 年 12 月的 Wikipedia dump，切分为 100 词的 chunk，共 21M 文档。使用 FAISS + HNSW 建立高效索引。

**4. 与相关方法对比**

| 维度 | RAG | REALM | DPR+Reader | T5/GPT (Closed-Book) |
|------|-----|-------|------------|---------------------|
| 知识来源 | 参数 + 检索 | 参数 + 检索 | 仅检索 | 仅参数 |
| 生成方式 | 自由生成 | 抽取式 | 抽取式 | 自由生成 |
| 预训练需求 | 无特殊预训练 | 需 salient span masking | 需检索监督 | 需超大模型 |
| 知识更新 | ✅ 替换索引 | ✅ 替换索引 | ✅ 替换索引 | ❌ 需重训练 |
| NQ EM | **44.5** | 40.4 | 41.5 | 36.6 (11B) |

##### 关键公式

**检索器概率（DPR）**：

$$p_\eta(z|x) \propto \exp\big(\mathbf{d}(z)^\top \mathbf{q}(x)\big)$$

其中 $\mathbf{d}(z) = \text{BERT}_d(z)$，$\mathbf{q}(x) = \text{BERT}_q(x)$，分别为文档和查询的稠密向量表示。

**RAG-Sequence 模型**：

$$p_{\text{RAG-Seq}}(y|x) \approx \sum_{z \in \text{top-}K(p(\cdot|x))} p_\eta(z|x) \prod_{i}^{N} p_\theta(y_i|x, z, y_{1:i-1})$$

对每个检索文档独立生成完整序列后，按检索概率加权求和。

**RAG-Token 模型**：

$$p_{\text{RAG-Tok}}(y|x) \approx \prod_{i}^{N} \sum_{z \in \text{top-}K(p(\cdot|x))} p_\eta(z|x) \, p_\theta(y_i|x, z_i, y_{1:i-1})$$

在每个 token 生成步独立对文档概率进行边际化，允许不同 token 关注不同文档。

**训练目标**：

$$\mathcal{L} = \sum_j -\log\, p(y_j | x_j)$$

使用 RAG-Sequence 或 RAG-Token 的边际化概率，通过随机梯度下降最小化负对数似然。

#### 🧪 练习题

**Q1：RAG-Sequence 和 RAG-Token 的核心区别是什么？**

A. RAG-Sequence 使用 BART，RAG-Token 使用 GPT-2
B. RAG-Sequence 对整个序列使用同一文档边际化，RAG-Token 在每个 token 位置独立边际化
C. RAG-Sequence 检索 5 个文档，RAG-Token 检索 10 个文档
D. RAG-Sequence 用于分类任务，RAG-Token 用于生成任务

**答案：B**。RAG-Sequence 假设同一个文档负责生成整个输出序列（先生成后加权），而 RAG-Token 允许每个 token 依赖不同的文档（每步加权后生成），这是两者在概率建模上的本质区别。

---

**Q2：RAG 训练时为什么不更新 document encoder？**

A. Document encoder 的参数量太大无法训练
B. 更新 document encoder 会导致文档嵌入变化，需要频繁重建 MIPS 索引，计算代价过高
C. Document encoder 已经完美，不需要更新
D. 因为使用了 BM25 而非神经检索器

**答案：B**。如果更新 document encoder，所有 21M 文档的嵌入都需要重新计算并重建 FAISS 索引，这在训练过程中代价极高。因此 RAG 固定 document encoder，仅更新 query encoder 来调整检索行为。实验表明这种近似策略效果良好。

---

**Q3：RAG 相比纯参数化模型（如 T5-11B）的关键优势不包括以下哪项？**

A. 可以通过替换文档索引更新知识
B. 不需要超大参数量即可获得丰富知识
C. 推理速度更快
D. 生成内容更加事实准确，幻觉更少

**答案：C**。RAG 在推理时需要额外执行检索步骤（MIPS 搜索 + 多文档条件生成），推理速度通常比纯参数化模型更慢。但 RAG 的优势在于知识可更新（A）、参数效率高（B）、以及生成更准确（D）。