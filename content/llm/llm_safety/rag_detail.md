### 检索增强生成 (Retrieval-Augmented Generation, RAG)

```yaml
id: rag
name: RAG
full_name: 检索增强生成 (Retrieval-Augmented Generation)
year: '2020'
org: Meta
paper_url: https://proceedings.neurips.cc/paper/2020/hash/6ad1d765d319713629bc3840d8d4881a-Abstract.html
category: hallucination
parent: —
motivation: 检索增强知识锚定生成
```

#### 📝 一句话总结

RAG 提出将预训练参数化记忆（BART seq2seq 生成器）与非参数化记忆（基于 DPR 的 Wikipedia 稠密向量索引）相结合的通用微调范式，通过在生成过程中检索外部知识文档作为上下文，解决了纯参数化语言模型在知识密集型任务上事实准确性不足、知识难以更新和缺乏可解释性的问题。

#### 🎯 核心要点

- 提出 RAG 框架：将检索器（非参数化记忆）与生成器（参数化记忆）以概率模型方式端到端结合
- 两种边际化变体：**RAG-Sequence**（整个输出序列使用同一检索文档）和 **RAG-Token**（每个输出 token 可使用不同检索文档）
- 检索器采用 **DPR**（Dense Passage Retriever）：基于双塔 BERT 编码器的稠密检索，通过内积计算查询-文档相关性
- 生成器采用 **BART-large**（400M 参数）：将输入查询与检索文档拼接后送入编码器-解码器生成答案
- 非参数化知识源：Wikipedia 全量转储（2018.12），切分为 2100 万个 100 词文档块，使用 FAISS 构建 MIPS 索引
- 训练策略：联合训练查询编码器 \(BERT_q\) 和 BART 生成器，**文档编码器和索引保持冻结**，无需显式检索监督
- 在 4 个开放域 QA 基准（NQ、TriviaQA、WebQuestions、CuratedTrec）上达到 SOTA，超越纯参数化和纯抽取式方法
- 在生成任务（Jeopardy 问题生成、MSMARCO 摘要式 QA）上生成更具体、多样和事实性更强的文本

#### 🔬 深入细节

![RAG 模型架构总览](https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png)
*图：RAG 模型架构。左侧为检索器（DPR），将输入查询编码后在 Wikipedia 文档索引中检索 top-K 相关文档；右侧为生成器（BART），将查询与检索文档拼接后自回归生成输出序列。两种变体 RAG-Sequence 和 RAG-Token 在边际化方式上有所不同。*

```python
# RAG 推理伪代码
def rag_inference(query_x, retriever, generator, k=5, mode="sequence"):
    """
    query_x: 输入查询
    retriever: DPR 检索器 (BERT_q + FAISS index)
    generator: BART-large 生成器
    k: 检索文档数量
    mode: "sequence" (RAG-Sequence) 或 "token" (RAG-Token)
    """
    # Step 1: 检索 top-K 文档
    q = BERT_q(query_x)                          # 编码查询
    top_k_docs = FAISS_index.search(q, k)         # MIPS 检索
    p_eta = softmax([dot(d_z, q) for d_z in top_k_docs])  # 检索概率

    if mode == "token":
        # RAG-Token: 每个 token 独立边际化
        # p'(y_i|x, y_{1:i-1}) = Σ_z p_η(z|x) * p_θ(y_i|x, z, y_{1:i-1})
        output = beam_search_with_marginalized_transition(
            generator, query_x, top_k_docs, p_eta
        )
    else:
        # RAG-Sequence: 每个文档独立 beam search，再合并
        hypotheses = {}
        for z, p_z in zip(top_k_docs, p_eta):
            input_seq = concatenate(query_x, z)
            beams = beam_search(generator, input_seq)
            for y, score in beams:
                hypotheses[y] = hypotheses.get(y, 0) + p_z * score
        output = argmax(hypotheses)

    return output
```

##### 动机与背景

大规模预训练语言模型（如 GPT-2、BERT）已被证明能在参数中存储大量事实知识，但这种纯参数化的知识存储方式存在三个根本性缺陷：

1. **知识更新困难**：模型参数中编码的世界知识无法便捷地修改或扩展，一旦训练完成，知识就被"冻结"在参数中。
2. **缺乏可解释性**：模型生成答案时无法提供决策依据的溯源（provenance），用户无法验证信息来源。
3. **幻觉问题**：模型可能生成看似合理但事实错误的内容（hallucination），在知识密集型任务上表现尤为突出。

在 RAG 之前，REALM 和 ORQA 等工作已探索将检索机制与掩码语言模型结合，但仅限于抽取式下游任务（即从检索文档中直接提取答案片段）。RAG 的核心创新在于将这一思路推广到**生成式任务**，使模型能够综合检索到的多个文档信息，自由生成答案文本。

> 💡 关键：RAG 将检索到的文档视为**潜变量（latent variable）**，通过边际化（marginalization）将检索与生成统一在一个端到端可训练的概率框架中，无需显式标注"应该检索哪个文档"。

##### 核心机制：两种边际化策略

RAG 的核心数学框架是将生成概率 \(p(y|x)\) 分解为检索概率与条件生成概率的边际化：

**RAG-Sequence 模型**——对整个输出序列使用同一文档进行边际化：

$$p_{\text{RAG-Sequence}}(y|x) \approx \sum_{z \in \text{top-}k(p(\cdot|x))} p_{\eta}(z|x) \prod_{i}^{N} p_{\theta}(y_i|x, z, y_{1:i-1})$$

直觉理解：先检索 K 个文档，对每个文档独立生成完整答案，最后按检索概率加权求和。这适合答案完全来自单一文档的场景。

**RAG-Token 模型**——允许每个 token 从不同文档中获取信息：

$$p_{\text{RAG-Token}}(y|x) \approx \prod_{i}^{N} \sum_{z \in \text{top-}k(p(\cdot|x))} p_{\eta}(z|x) \, p_{\theta}(y_i|x, z, y_{1:i-1})$$

直觉理解：生成每个 token 时，都对所有检索文档的贡献进行加权混合。这使模型能够在一个答案中融合多个文档的信息，适合需要综合多源知识的场景。

> ⚠️ 注意：两个公式的关键区别在于**求和符号 \(\sum\) 与连乘符号 \(\prod\) 的嵌套顺序**。RAG-Sequence 是"先生成后求和"，RAG-Token 是"先求和后连乘"。

##### 检索器：DPR 双塔架构

检索组件基于 Dense Passage Retriever（DPR），采用双塔（bi-encoder）架构：

$$p_{\eta}(z|x) \propto \exp\left(\mathbf{d}(z)^{\top} \mathbf{q}(x)\right)$$

其中 \(\mathbf{q}(x) = \text{BERT}_q(x)\) 为查询编码器输出，\(\mathbf{d}(z) = \text{BERT}_d(z)\) 为文档编码器输出。两者均基于 BERT-base，分别将查询和文档映射到同一稠密向量空间，通过内积衡量相关性。

文档索引使用 **FAISS** 库构建最大内积搜索（MIPS）索引，采用 HNSW（Hierarchical Navigable Small World）近似算法实现毫秒级检索。整个 Wikipedia 被切分为 2100 万个 100 词的文档块，每个块预计算稠密向量表示。

##### 生成器：BART-large

生成组件采用 BART-large（400M 参数），一个基于 Transformer 的预训练 seq2seq 模型。输入构造方式非常简洁：**将原始查询 \(x\) 与检索文档 \(z\) 直接拼接**，作为 BART 编码器的输入，解码器自回归生成输出序列。

BART 通过去噪自编码目标预训练，在多种生成任务上表现优异。论文将 BART 的参数 \(\theta\) 称为**参数化记忆（parametric memory）**，与 Wikipedia 索引构成的**非参数化记忆（non-parametric memory）**形成互补。

##### 训练流程

训练采用标准的监督微调范式，给定输入-输出对 \((x_j, y_j)\)，最小化负边际对数似然：

$$\mathcal{L} = \sum_j -\log p(y_j | x_j)$$

关键设计决策：
- **文档编码器 \(\text{BERT}_d\) 和 FAISS 索引保持冻结**：避免了 REALM 中需要周期性重建索引的高昂计算开销
- **仅微调查询编码器 \(\text{BERT}_q\) 和 BART 生成器**：通过梯度反向传播联合优化检索与生成
- **无需检索监督**：不需要标注"正确文档"，检索文档作为潜变量被自动学习
- 训练时检索 top-K 文档（\(k \in \{5, 10\}\)），测试时 K 值通过验证集选择

##### 解码策略

两种变体需要不同的解码方式：

- **RAG-Token**：由于边际化后的转移概率 \(p'_{\theta}(y_i|x, y_{1:i-1})\) 具有标准自回归形式，可直接使用常规 beam search 解码。
- **RAG-Sequence**：生成概率无法分解为逐 token 的形式，论文提出两种策略：
  - **Thorough Decoding**：对每个检索文档独立运行 beam search，收集所有候选假设，对未出现在某文档 beam 中的假设额外运行前向传播计算概率，最终加权求和。精确但计算量大。
  - **Fast Decoding**：假设未在某文档 beam 中出现的假设概率为 0，避免额外前向传播。近似但高效。

##### 与传统方法的对比

| 维度 | 纯参数化模型（如 T5） | 抽取式检索（如 DPR+Reader） | RAG |
|------|----------------------|---------------------------|-----|
| 知识来源 | 仅参数记忆 | 仅检索文档 | 参数 + 检索 |
| 答案形式 | 自由生成 | 文档片段抽取 | 自由生成 |
| 知识更新 | 需重新训练 | 替换文档索引 | 替换文档索引 |
| 可解释性 | 无 | 可追溯文档 | 可追溯文档 |
| 多文档综合 | 隐式 | 困难 | RAG-Token 原生支持 |

RAG 的独特优势在于：既保留了生成模型的灵活性（可以生成训练数据中未出现的答案），又通过检索机制锚定了外部知识，显著减少幻觉并支持知识热更新。

#### 🧪 练习题

```yaml
question: "RAG-Sequence 和 RAG-Token 两种变体的核心区别是什么？"
options:
  - "使用不同的检索器架构"
  - "边际化潜变量（检索文档）的方式不同：RAG-Sequence 对整个序列使用同一文档，RAG-Token 允许每个 token 使用不同文档"
  - "RAG-Sequence 使用 BART，RAG-Token 使用 T5"
  - "RAG-Token 不需要检索，仅依赖参数化记忆"
answer: 1
explain: "两种变体使用相同的检索器和生成器，区别在于求和(Σ)与连乘(Π)的嵌套顺序：RAG-Sequence 先对每个文档生成完整序列再求和，RAG-Token 在每个 token 位置先对文档求和再连乘。"
```