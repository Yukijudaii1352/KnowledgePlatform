### HyDE

```yaml
id: hyde
name: HyDE
full_name: "假设文档嵌入 (Hypothetical Document Embeddings)"
year: 2022
org: "CMU & Microsoft"
paper_url: "https://arxiv.org/abs/2212.10496"
category: rag
parent: "—"
motivation: "用LLM生成假设文档再编码检索，答案-答案匹配提升对齐"
```

#### 📝 一句话总结

HyDE 提出利用指令跟随型 LLM（InstructGPT）为查询生成假设性文档，再通过无监督对比编码器（Contriever）将假设文档编码为稠密向量进行最近邻检索，将传统的"查询-文档"匹配转化为"文档-文档"匹配，在完全不需要相关性标注的零样本设定下达到接近有监督稠密检索器的性能。

#### 🎯 核心要点

- **零样本检索范式**：无需任何相关性标注数据，仅依赖 LLM 的生成能力和无监督编码器即可完成高质量检索
- **假设文档生成**：利用 InstructGPT（text-davinci-003, 175B）根据任务特定的 instruction 为查询生成假设性回答文档
- **文档-文档匹配**：将查询侧从短文本 query 转化为与语料库文档同质的长文本，消除 query-document 之间的表示不对称
- **向量平均聚合**：对多个假设文档的编码向量取平均，过滤掉不正确的细节，保留与查询相关的核心语义信号
- **编码器无关**：底层编码器可替换（Contriever / mContriever），且可与微调编码器叠加使用进一步提升性能
- **多任务 prompt 设计**：针对 Web 搜索、科学事实验证、金融问答、多语言检索等 8 类任务设计了不同的生成指令
- **评测覆盖广泛**：在 TREC DL19/20（Web 搜索）、BEIR 6 个低资源数据集、Mr.TyDi 4 种语言上全面验证

#### 🔬 深入细节

##### 核心示意图

![HyDE 模型流程图](https://ar5iv.labs.arxiv.org/html/2212.10496/assets/x1.png)
*图：HyDE 模型示意。查询经 InstructGPT 生成假设文档，再由 Contriever 编码为向量，通过内积搜索检索真实文档。HyDE 无需修改底层 GPT-3 和 Contriever/mContriever 模型即可服务各类查询。*

##### 算法伪代码

```python
# HyDE: Hypothetical Document Embeddings
# 输入: query q, 语料库 C, 编码器 f, 生成模型 G, 指令模板 inst
# 输出: 检索到的 top-k 真实文档

def hyde_retrieve(q, C, f, G, inst, N=1, k=10):
    # Step 1: 生成 N 个假设文档
    hypothetical_docs = []
    for i in range(N):
        prompt = inst.format(query=q)          # 构造指令 prompt
        d_hat = G.generate(prompt)              # LLM 生成假设文档
        hypothetical_docs.append(d_hat)
    
    # Step 2: 编码假设文档并取平均
    vectors = [f.encode(d) for d in hypothetical_docs]
    v_q = sum(vectors) / len(vectors)           # 向量平均 (Eq. 7)
    
    # Step 3: 最大内积搜索 (MIPS)
    results = MIPS(v_q, C_encoded, k)           # 检索真实文档
    return results

# 可选变体: 将原始 query 向量也纳入平均 (Eq. 8)
# v_q = (f.encode(q) + sum(vectors)) / (1 + len(vectors))
```

##### 动机与背景

稠密检索（Dense Retrieval）的核心挑战在于：如何将查询和文档映射到同一向量空间中，使得相关的查询-文档对具有高相似度。传统方法（如 DPR、ANCE）依赖大量人工标注的相关性判断数据进行对比学习，这在实际场景中往往难以获取。即使是广泛使用的 MS-MARCO 数据集也限制商业使用。

无监督方法（如 Contriever）通过自监督对比学习避免了标注依赖，但由于缺乏相关性信号，其性能通常不如 BM25 等经典词汇匹配方法。核心瓶颈在于 **query-document 的表示不对称**：查询通常是简短的几个词或一句话，而文档则是包含丰富上下文的长文本段落。编码器难以将这两种截然不同的文本形式映射到语义一致的向量空间。

> 💡 **关键洞察**：与其让编码器学习跨越 query-document 的鸿沟，不如先用 LLM 将 query "展开"为一个假设性文档，将问题转化为 **document-document 的语义匹配**——这对无监督编码器来说是更自然的任务。

##### 核心机制详解

**1. 假设文档生成（Hypothetical Document Generation）**

给定查询 \(q\)，HyDE 使用指令跟随型语言模型 \(\mathcal{G}\) 生成假设文档：

$$\hat{d} \sim p_{\mathcal{G}}(\cdot \mid \text{prompt}(q))$$

其中 prompt 由任务特定的指令（instruction）和查询拼接而成。例如 Web 搜索的指令为：

> *"Please write a passage to answer the question. Question: {query}. Passage:"*

生成的假设文档 \(\hat{d}\) 可能包含事实性错误，但其关键价值在于**捕获了相关性模式**——它与真实相关文档在词汇选择、句式结构、主题分布上高度相似。这种"形似而非实"的特性恰好是 HyDE 的设计精髓。

**2. 对比编码与向量聚合**

假设文档通过无监督对比编码器 \(f\)（Contriever）映射为稠密向量：

$$\mathbf{v}_{\hat{d}} = f(\hat{d})$$

当生成 \(N\) 个假设文档时，通过向量平均进行聚合：

$$\mathbf{v}_q = \frac{1}{N} \sum_{k=1}^{N} f(\hat{d}_k)$$

> ⚠️ **向量平均的作用**：多个假设文档各自可能包含不同的错误细节（如错误的年份、人名），但它们共享的核心语义信号（与查询相关的主题和概念）在平均后被保留和增强，而随机错误则被"稀释"。这类似于集成学习中的 bagging 思想。

可选地，还可以将原始查询的编码向量也纳入平均（论文 Eq. 8）：

$$\mathbf{v}_q = \frac{1}{N+1} \left( f(q) + \sum_{k=1}^{N} f(\hat{d}_k) \right)$$

**3. 最大内积搜索（MIPS）**

最终的检索通过向量内积完成：

$$d^* = \arg\max_{d \in \mathcal{C}} \langle \mathbf{v}_q, \, f(d) \rangle$$

语料库中所有文档的编码 \(f(d)\) 可以离线预计算并建立索引，检索时仅需计算查询侧的假设文档编码和一次向量搜索。

##### 实验结果与关键发现

**Web 搜索（TREC DL19/20）**：HyDE 在 MAP、NDCG@10、Recall@1k 上全面超越 BM25 和无监督 Contriever。在 DL19 上，HyDE 的 NDCG@10（61.3）与有监督的 Contriever\(^{\text{FT}}\)（62.1）接近；Recall@1k（97.8）甚至超过所有有监督模型。

**低资源检索（BEIR）**：在 SciFact、Arguana、TREC-COVID、FiQA、DBPedia、TREC-NEWS 6 个数据集上，HyDE 在 NDCG@10 上仅在 TREC-COVID 上以 0.2 的微小差距落后于 BM25，而底层 Contriever 在该数据集上落后超过 50%。HyDE 普遍优于在 MS-MARCO 上微调的 DPR 和 ANCE。

**多语言检索（Mr.TyDi）**：在斯瓦希里语、韩语、日语、孟加拉语上，HyDE 均提升了 mContriever 的性能，并超越了从 MS-MARCO 迁移的微调模型（mDPR、mBERT、XLM-R），但与微调的 mContriever\(^{\text{FT}}\) 仍有差距，作者归因于 LLM 在非英语低资源语言上的预训练不足。

**生成模型规模效应（Table 4）**：Flan-T5（11B）→ Cohere（52B）→ InstructGPT（175B），模型越大，HyDE 性能越好。即使是 11B 的 Flan-T5 也能为 Contriever 带来显著提升。当 HyDE 与微调编码器 Contriever\(^{\text{FT}}\) 结合时，InstructGPT 仍能进一步提升性能（DL19: 62.1 → 67.4），说明生成模型捕获了微调编码器未覆盖的相关性信号。

##### 与传统方法的区别

| 维度 | 传统稠密检索 (DPR/ANCE) | BM25 | HyDE |
|------|------------------------|------|------|
| 相关性建模 | 向量相似度（需标注训练） | 词频统计 | LLM 生成 + 向量匹配 |
| 标注需求 | 大量 query-document 对 | 无 | **无** |
| 查询表示 | 短文本编码 | 关键词 | **假设文档编码** |
| 匹配范式 | query-document | query-document | **document-document** |
| 零样本能力 | 弱（依赖域内数据） | 强 | **强** |
| 可扩展性 | 需重新训练 | 即插即用 | **即插即用**（换 prompt 即可） |

> 💡 **核心创新**：HyDE 将"相关性"的概念从数值化的向量相似度分数转移到了自然语言生成过程中。LLM 通过生成与查询相关的文本来隐式地建模相关性，而非显式地学习一个评分函数。这开辟了一种全新的 LLM-检索器交互范式。

#### 🧪 练习题

```yaml
question: "HyDE 将查询编码为假设文档向量后进行检索，其核心优势来源于什么？"
options:
  - "假设文档的事实准确性高于原始查询"
  - "将 query-document 匹配转化为 document-document 匹配，消除表示不对称"
  - "InstructGPT 生成的文档可以直接替代真实文档作为检索结果"
  - "向量平均操作提升了编码器的表示能力"
answer: 1
explain: "HyDE 的核心优势在于将短查询扩展为与语料库文档同质的长文本，使无监督编码器在 document-document 的对称匹配场景下工作，而非依赖假设文档的事实准确性。"
```