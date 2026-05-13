### DPR — Dense Passage Retrieval for Open-Domain Question Answering

```yaml
id: dpr
name: DPR
full_name: 密集段落检索 (Dense Passage Retrieval)
year: "2020"
org: Facebook AI Research
paper_url: https://arxiv.org/abs/2004.04906
category: rag
parent: —
motivation: 用双塔 BERT 编码器替代 BM25 稀疏检索，开创密集语义检索时代
```

#### 📝 一句话总结

DPR 提出使用双塔 BERT 编码器分别编码问题和段落，通过点积相似度进行密集检索，仅依赖少量问答对监督训练即大幅超越 BM25，在开放域问答的检索阶段实现了从稀疏到密集的范式转换。

#### 🎯 核心要点

- **双塔编码器架构**：独立的 Question Encoder \(E_Q\) 和 Passage Encoder \(E_P\)，均基于 BERT-base，输出 768 维向量，相似度为点积
- **高效负样本策略**：In-batch negatives（批内共享负样本，\(B\) 个问题产生 \(B^2\) 个训练对）+ 1 个 BM25 硬负样本（高 BM25 分但不含答案的段落）
- **NLL 损失函数**：对正样本段落的负对数似然，在 \(B + 1\) 个候选中做 softmax
- **极高的样本效率**：仅 1,000 个训练样本即超越 BM25，展示预训练语言模型的强大语义泛化能力
- **FAISS 向量索引**：离线编码 2100 万段落，使用 HNSW 索引实现 995 queries/sec 的实时检索
- **端到端 QA 系统**：检索器 + BERT-base 阅读器（交叉注意力重排序 + 抽取式答案），NQ 上 EM 达 41.5%，超越 ORQA (33.3%) 和 REALM (40.4%)
- **5 个 QA 基准**：Natural Questions、TriviaQA、WebQuestions、CuratedTREC、SQuAD v1.1

#### 🔬 深入细节

![DPR 样本效率曲线](https://arxiv.org/html/2004.04906v2/extracted/3803013/sample_eff.png)
*图：DPR 在不同训练样本量下的 Top-k 检索准确率 vs BM25。仅用 1,000 个样本训练的 DPR 已超越 BM25 基线（Natural Questions 开发集）。*

```python
# DPR 训练与检索伪代码

# === 离线阶段：编码所有段落 ===
passage_index = {}
for p in all_wikipedia_passages:        # 21,015,324 个 100-word 段落
    p_input = "[CLS] title [SEP] passage [SEP]"
    p_vec = E_P(p_input)                # BERT-base → CLS token → 768-d
    passage_index[p.id] = p_vec
faiss_index = FAISS_HNSW(passage_index) # 构建 HNSW 近似最近邻索引

# === 训练阶段：In-batch Negatives + BM25 Hard Negatives ===
for epoch in range(40):                 # 大数据集 40 epochs，小数据集 100 epochs
    for batch in dataloader:            # batch_size = 128
        Q = [q_1, ..., q_B]            # B 个问题
        P_pos = [p_1+, ..., p_B+]      # B 个正样本段落
        P_bm25 = [p_1-, ..., p_B-]     # B 个 BM25 硬负样本

        q_vecs = E_Q(Q)                # (B, 768)
        p_vecs = E_P(P_pos + P_bm25)   # (2B, 768)

        # 相似度矩阵：每个 q 与所有 2B 个段落计算点积
        sim_matrix = q_vecs @ p_vecs.T  # (B, 2B)

        # NLL 损失：正样本在对角线位置
        loss = -log_softmax(sim_matrix, dim=1)[range(B), range(B)]
        loss.mean().backward()
        adam_optimizer.step()            # lr=1e-5, dropout=0.1

# === 在线阶段：检索 ===
def retrieve(question, k=100):
    q_vec = E_Q(question)               # 768-d
    top_k_ids = faiss_index.search(q_vec, k)  # ~1ms, 995 q/s
    return top_k_ids
```

**动机与背景**

开放域问答（Open-Domain QA）需要从海量文档中检索相关段落再抽取答案。传统方法依赖 TF-IDF 或 BM25 等稀疏检索，本质上是词频匹配——无法捕捉同义词、释义等语义关系。例如，问题 "Who is the bad guy inerta?" 的答案段落可能不包含 "bad guy" 而使用 "villain" 或 "antagonist"，BM25 对此束手无策。

在 DPR 之前，ORQA（Lee et al., 2019）尝试用 Inverse Cloze Task (ICT) 预训练密集检索器，但需要昂贵的预训练且效果有限。DPR 的核心洞察是：**仅用少量问答对的监督信号，配合精心设计的负样本策略，就能训练出远超 BM25 的密集检索器，无需额外预训练。**

**核心机制一：双塔编码器**

DPR 使用两个独立的 BERT-base 编码器，分别将问题和段落映射到同一个 768 维向量空间：

$$\text{sim}(q, p) = E_Q(q)^\top E_P(p)$$

其中 \(E_Q(q) = \text{BERT}_Q(q)[\text{CLS}] \in \mathbb{R}^{768}\)，\(E_P(p) = \text{BERT}_P(p)[\text{CLS}] \in \mathbb{R}^{768}\)。

> 💡 **关键设计**：使用两个独立编码器而非共享参数，因为问题（短、疑问句式）和段落（长、陈述句式）的分布差异较大，独立编码器能更好地适应各自的语言模式。

段落输入格式为 `[CLS] title [SEP] passage text [SEP]`，将文章标题作为额外上下文信息拼接在段落前。

**核心机制二：负样本策略**

训练的关键在于如何选择负样本。DPR 系统比较了三种负样本：

1. **Random negatives**：从语料库随机采样，太简单，区分度不够
2. **BM25 negatives（硬负样本）**：BM25 检索得分高但不含答案的段落——词汇高度重叠但语义不匹配，迫使模型学习深层语义
3. **Gold negatives**：其他问题的正样本段落

最终最优配置是 **In-batch gold negatives + 1 个 BM25 硬负样本**。

**核心机制三：In-batch Negatives**

这是 DPR 训练效率的关键。在一个 batch 中有 \(B\) 个 \((q_i, p_i^+)\) 对，每个问题的正样本段落自动成为其他 \(B-1\) 个问题的负样本。这样一个 batch 就产生了 \(B \times B\) 个训练对，而段落编码只需计算一次。

训练损失为：

$$L(q_i, p_i^+, p_{i,1}^-, \ldots, p_{i,n}^-) = -\log \frac{e^{\text{sim}(q_i, p_i^+)}}{e^{\text{sim}(q_i, p_i^+)} + \sum_{j=1}^{n} e^{\text{sim}(q_i, p_{i,j}^-)}}$$

其中负样本集合包括 batch 内其他 \(B-1\) 个正样本（gold negatives）加上 \(B\) 个 BM25 硬负样本。

> ⚠️ **注意**：消融实验（Table 3）显示，in-batch negatives 比标准 1-of-N 训练提升显著（Top-20: 73.0% vs 64.3%），且准确率随 batch size 增大而持续提升（batch 128 的 Gold negatives: 73.0% vs batch 8 的 69.1%）。额外加入 1 个 BM25 硬负样本后进一步提升至 78.0%，但加 2 个反而略降。

**训练与推理流程**

- **离线编码**：将 Wikipedia 切分为 21,015,324 个不重叠的 100-word 段落，每个段落前拼接文章标题。用 \(E_P\) 编码所有段落，8 GPU 并行约 8.8 小时。构建 FAISS HNSW 索引约 8.5 小时。
- **在线检索**：问题经 \(E_Q\) 编码为 768 维向量，通过 FAISS 索引检索 Top-k 段落。HNSW 配置：每节点存储 512 邻居，构建搜索深度 200，查询搜索深度 128。吞吐量 995 queries/sec（返回 Top-100），远超 BM25/Lucene 的 23.7 queries/sec。
- **阅读器**：取 Top-100 段落中的 24 个，用独立的 BERT-base 阅读器进行交叉注意力编码。阅读器同时输出段落选择分数（基于 [CLS] 向量）和答案 span 分数（起止位置概率），最终答案 = 最高段落选择分数对应段落中的最高 span。

**核心实验结果**

| 方法 | NQ Top-20 | NQ Top-100 | NQ EM |
|------|-----------|------------|-------|
| BM25 | 59.1 | 73.7 | 32.6 |
| ORQA | — | — | 33.3 |
| REALM | — | — | 40.4 |
| **DPR (Single)** | **78.4** | **85.4** | **41.5** |
| DPR (Multi) | 79.4 | 86.0 | 41.5 |

DPR 在 4/5 个数据集上的检索准确率大幅超越 BM25（唯一例外是 SQuAD，因其问题由标注者看着段落编写，词汇重叠极高，天然有利于 BM25）。

**与传统方法的关键区别**

| 维度 | BM25 | ORQA | DPR |
|------|------|------|-----|
| 检索方式 | 稀疏词频匹配 | 密集向量 | 密集向量 |
| 预训练 | 无需 | ICT 预训练（昂贵） | 无需额外预训练 |
| 语义理解 | ❌ 仅词汇匹配 | ✅ 但受限于 ICT | ✅ 监督学习 |
| 训练数据 | 无需 | 无监督 | 少量 QA 对（1k 即可超 BM25） |
| NQ Top-20 | 59.1% | — | 78.4% |

> 💡 **核心贡献**：DPR 证明了一个简单但深刻的结论——在有少量标注数据的情况下，简单的双编码器 + 精心设计的负样本策略就足以大幅超越传统稀疏检索和复杂的预训练方法（如 ORQA/ICT），为后续 RAG、ColBERT 等工作奠定了密集检索的基础范式。

#### 🧪 练习题

```yaml
question: "DPR 训练中 in-batch negatives 的核心优势是什么？"
options:
  - "减少了模型参数量，加快推理速度"
  - "利用 batch 内其他问题的正样本作为负样本，无需额外计算即可大幅增加训练对数量"
  - "消除了对 BM25 硬负样本的依赖"
  - "使问题编码器和段落编码器可以共享参数"
answer: 1
explain: "In-batch negatives 将 batch 中 B 个正样本段落交叉复用为负样本，一次编码产生 B² 个训练对，显著提升训练效率和效果，是 DPR 性能提升的关键因素之一。"
```