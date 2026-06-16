---
domain: llm
topic_id: rag
topic_name: 检索增强生成
page_icon: 🔍
page_title: 检索增强生成 (RAG) 技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 系统梳理RAG技术从2020年DPR/REALM奠基到2026年Agentic RAG、多模态RAG的演进历程，涵盖架构设计、检索策略与评测方法的完整演化路径
hero_pills:
- 🏷️ RAG · Dense Retrieval · Knowledge Augmentation · Agentic AI
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基算法
    color: '#22a06b'
  architecture:
    label: 架构改进
    color: '#5b63d3'
  evaluation:
    label: 评测体系
    color: '#e8820c'
  frontier_2026:
    label: 2026前沿
    color: '#d32f2f'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: dpr
  x: 100
  y: 150
  category: foundation
- id: realm
  x: 120
  y: 100
  category: foundation
- id: colbert
  x: 130
  y: 200
  category: foundation
- id: rag
  x: 200
  y: 150
  category: foundation
- id: fid
  x: 280
  y: 120
  category: foundation
- id: contriever
  x: 300
  y: 180
  category: foundation
- id: retro
  x: 350
  y: 100
  category: foundation
- id: atlas
  x: 380
  y: 120
  category: foundation
- id: e5
  x: 400
  y: 180
  category: foundation
- id: hyde
  x: 420
  y: 200
  category: foundation
- id: flare
  x: 500
  y: 350
  category: architecture
- id: recomp
  x: 520
  y: 380
  category: architecture
- id: self_rag
  x: 600
  y: 320
  category: architecture
- id: crag
  x: 650
  y: 300
  category: architecture
- id: graphrag
  x: 680
  y: 360
  category: architecture
- id: llmlingua
  x: 700
  y: 400
  category: architecture
- id: ragas
  x: 650
  y: 500
  category: evaluation
- id: rgb
  x: 550
  y: 500
  category: evaluation
- id: linearrag
  x: 850
  y: 360
  category: frontier_2026
- id: tm_rag
  x: 880
  y: 300
  category: frontier_2026
- id: videorag
  x: 900
  y: 250
  category: frontier_2026
- id: bayesrag
  x: 950
  y: 240
  category: frontier_2026
- id: ssrag
  x: 920
  y: 320
  category: frontier_2026
- id: vig_rag
  x: 930
  y: 380
  category: frontier_2026
- id: urag
  x: 970
  y: 260
  category: frontier_2026
- id: mg_crag
  x: 900
  y: 340
  category: frontier_2026
- id: qwen3_embedding
  x: 1000
  y: 420
  category: frontier_2026
- id: raguard
  x: 1000
  y: 500
  category: frontier_2026
edges:
- from: dpr
  to: rag
  label: 端到端框架
- from: dpr
  to: contriever
  label: 无监督学习
- from: dpr
  to: hyde
  label: 假设性嵌入
- from: contriever
  to: e5
  label: 弱监督预训练
- from: e5
  to: qwen3_embedding
  label: 大模型化
- from: rag
  to: fid
  label: 多文档融合
- from: fid
  to: atlas
  label: 联合预训练
- from: realm
  to: retro
  label: 分块注意力
- from: rag
  to: flare
  label: 主动检索
- from: rag
  to: recomp
  label: 内容压缩
- from: rag
  to: self_rag
  label: 自我反思
- from: rag
  to: graphrag
  label: 图谱推理
- from: rag
  to: llmlingua
  label: 上下文压缩
- from: self_rag
  to: crag
  label: 检索评估
- from: self_rag
  to: tm_rag
  label: Mamba融合
- from: self_rag
  to: ssrag
  label: 混合检索
- from: crag
  to: mg_crag
  label: 多粒度评估
- from: graphrag
  to: linearrag
  label: 线性索引
- from: graphrag
  to: vig_rag
  label: 时间图谱
- from: rag
  to: videorag
  label: 多模态扩展
- from: videorag
  to: bayesrag
  label: 概率互证
- from: videorag
  to: urag
  label: 统一架构
- from: rgb
  to: raguard
  label: 鲁棒性评测
milestones:
- dpr
- self_rag
- linearrag
```

## 核心算法

### DPR

```yaml
id: dpr
num: 1
name: DPR
full_name: 密集段落检索 (Dense Passage Retrieval)
year: '2020'
org: Meta AI
parent: —
paper_url: https://arxiv.org/abs/2004.04906
project_url: ''
category: foundation
motivation: 双编码器架构实现语义检索，开创密集检索时代
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

### REALM

```yaml
id: realm
num: 2
name: REALM
full_name: 检索增强语言模型预训练 (Retrieval-Augmented Language Model Pre-training)
year: '2020.02'
org: Google Research
parent: —
paper_url: https://arxiv.org/abs/2002.08909
project_url: ''
category: foundation
motivation: 将检索机制集成到预训练阶段，显著跨度掩码任务
```

#### 📝 一句话总结
REALM 提出了一种检索增强的语言模型预训练框架，将知识检索建模为可微分的潜变量，通过端到端反向传播联合训练神经知识检索器与知识增强编码器，使预训练模型能够从百万级文档语料库中主动检索相关知识，在 Open-QA 任务上以 330M 参数量超越 11B 参数的 T5 模型。

#### 🎯 核心要点
- **潜变量检索框架**：将检索文档 \(z\) 建模为潜变量，通过边际化 \(p(y|x) = \sum_z p(y|z,x) \cdot p(z|x)\) 实现端到端训练
- **双塔检索器 (Knowledge Retriever)**：使用两个独立 BERT 分别编码查询和文档，通过内积计算相关性得分，结合 MIPS 实现亚线性时间 top-k 检索
- **知识增强编码器 (Knowledge-Augmented Encoder)**：将查询与检索文档拼接后输入 Transformer，通过 cross-attention 深度融合信息
- **异步 MIPS 索引刷新**：使用异步更新机制解决训练过程中文档嵌入需要随参数更新而刷新的问题，每隔数百步重新编码全部文档
- **显著跨度掩码 (Salient Span Masking)**：优先掩码命名实体和日期等信息密集的跨度，迫使模型学习检索世界知识
- **Null 文档机制**：引入空文档 \(\varnothing\) 作为候选，允许模型在不需要检索时选择不依赖外部文档
- **ICT 预热初始化**：使用逆完形填空任务 (Inverse Cloze Task) 预热检索器，避免冷启动问题
- **评估基准**：在 NaturalQuestions-Open (40.4)、WebQuestions (40.7)、CuratedTrec (46.8) 三个 Open-QA 数据集上取得 SOTA

#### 🔬 深入细节
##### 核心框架图

![REALM 整体框架](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x2.png)
*图：REALM 整体框架。左侧为无监督预训练阶段，知识检索器与知识增强编码器联合训练；右侧为下游任务微调阶段，同样的架构用于 Open-QA。*

![REALM 预训练示意](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x1.png)
*图：REALM 预训练过程示意。对于掩码输入 "The [MASK] at the top of the pyramid"，检索器从 Wikipedia 中检索相关文档，编码器利用检索到的文档预测被掩码的词。*

##### 算法伪代码

```python
# REALM 预训练伪代码
# 初始化：用 ICT 预热 retriever，用 BERT 初始化 encoder
# 知识语料库 Z: Wikipedia (13M 文档块, 每块 ≤288 wordpieces)

for step in range(200_000):
    x = sample_masked_sentence(corpus_X)  # 显著跨度掩码
    
    # === 检索阶段 ===
    q = Embed_input(x)  # BERT_CLS + 线性投影
    # 通过 MIPS 索引检索 top-k 文档 (k=8, 含 null doc)
    top_k_docs = MIPS_search(q, index, k=8)
    
    # === 计算检索概率 ===
    for z in top_k_docs:
        f(x, z) = Embed_input(x)^T · Embed_doc(z)  # 内积相关性
    p_z_given_x = softmax([f(x, z) for z in top_k_docs])
    
    # === 知识增强编码 ===
    for z in top_k_docs:
        input_seq = [CLS] x [SEP] z_title [SEP] z_body [SEP]
        p_y_given_z_x = BERT_MLM(input_seq)  # 预测 [MASK] 位置
    
    # === 边际化 ===
    p_y_given_x = sum(p_z * p_y_z for p_z, p_y_z 
                       in zip(p_z_given_x, p_y_given_z_x))
    loss = -log(p_y_given_x)
    
    # === 反向传播 (更新 θ 和 φ) ===
    loss.backward()  # 梯度同时流向 retriever 和 encoder
    optimizer.step()
    
    # === 异步刷新 MIPS 索引 (每数百步) ===
    if step % refresh_interval == 0:
        recompute_all_doc_embeddings()  # 16 TPUs 并行
        rebuild_MIPS_index()
```

##### 动机与背景

语言模型预训练（如 BERT、GPT）的核心思想是通过大规模无监督训练将世界知识编码到模型参数中。然而，这种方式存在根本性局限：

1. **存储瓶颈**：所有知识必须压缩到固定数量的神经网络参数中，对于长尾知识和精确事实性知识（如"某人的出生日期"），模型参数的容量远远不够
2. **不可解释性**：知识以隐式方式分布在参数中，无法追溯模型的知识来源
3. **更新困难**：当世界知识发生变化时，需要重新训练整个模型

REALM 的核心洞察是：**与其将所有知识压缩到参数中，不如让模型学会在需要时从外部知识库中检索相关信息**。这类似于人类在回答问题时查阅参考资料的过程。

> 💡 关键：REALM 将"知识存储"与"知识推理"解耦——检索器负责从海量文档中定位相关知识，编码器负责基于检索到的知识进行推理。

##### 核心机制详解

**1. 生成过程建模**

REALM 将语言模型的预测过程分解为两步：

$$p(y|x) = \sum_{z \in \mathcal{Z}} p(y|z, x) \cdot p(z|x)$$

其中 \(x\) 是输入（预训练时为掩码句子，微调时为问题），\(y\) 是目标输出，\(z\) 是从知识语料库 \(\mathcal{Z}\) 中检索的文档。这个公式的含义是：对于每个可能的文档 \(z\)，计算检索该文档的概率 \(p(z|x)\) 和基于该文档生成答案的概率 \(p(y|z,x)\)，然后对所有文档求和（边际化）。

由于语料库包含数百万文档，精确求和不可行，因此实际计算中仅对 top-k 个最相关文档进行近似：

$$p(y|x) \approx \sum_{z \in \text{top-}k} p(y|z, x) \cdot p(z|x)$$

**2. 知识检索器 (Knowledge Retriever)**

检索器 \(p(z|x)\) 采用双塔架构，使用两个独立的 BERT 编码器分别处理输入和文档：

$$\text{Embed}_{\text{input}}(x) = W_{\text{input}} \cdot \text{BERT}_{\text{CLS}}(\text{join}(x))$$

$$\text{Embed}_{\text{doc}}(z) = W_{\text{doc}} \cdot \text{BERT}_{\text{CLS}}(\text{join}(z_{\text{title}}, z_{\text{body}}))$$

相关性得分通过内积计算：

$$f(x, z) = \text{Embed}_{\text{input}}(x)^{\top} \cdot \text{Embed}_{\text{doc}}(z)$$

检索概率通过 softmax 归一化：

$$p(z|x) = \frac{\exp f(x, z)}{\sum_{z'} \exp f(x, z')}$$

> 💡 关键：双塔架构的优势在于文档嵌入可以预计算并建立 MIPS（最大内积搜索）索引，实现亚线性时间的 top-k 检索。这使得在数百万文档中搜索成为可能。

**3. 知识增强编码器 (Knowledge-Augmented Encoder)**

编码器将输入 \(x\) 和检索到的文档 \(z\) 拼接为一个序列，送入另一个 BERT 进行 cross-attention：

$$\text{input} = [\text{CLS}] \; x \; [\text{SEP}] \; z_{\text{title}} \; [\text{SEP}] \; z_{\text{body}} \; [\text{SEP}]$$

- **预训练阶段**（MLM 任务）：对每个 \([\text{MASK}]\) 位置预测原始 token，损失为标准 MLM loss
- **微调阶段**（Open-QA）：在文档 token 的表示上预测答案的起止位置，类似于抽取式阅读理解

**4. 异步 MIPS 索引刷新**

![异步 MIPS 刷新](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x3.png)
*图：REALM 预训练中的异步 MIPS 索引刷新机制。训练器 (Trainer) 持续更新参数，索引构建器 (Index Builder) 周期性地用最新参数重新编码所有文档并重建索引。*

训练过程中，检索器参数 \(\theta\) 不断更新，但 MIPS 索引中的文档嵌入是基于旧参数计算的。REALM 采用异步刷新策略：

- 每隔数百个训练步，使用最新的文档编码器参数重新编码所有 1300 万文档
- 重建 MIPS 索引（在 16 个 TPU 上并行完成）
- 在两次刷新之间，索引是"过时的"（stale），但实验表明适度的过时不会显著影响训练

> ⚠️ 注意：消融实验表明，如果将刷新间隔扩大 30 倍（即索引严重过时），性能从 38.2 骤降至 28.7（NQ dev EM），说明索引新鲜度对训练至关重要。

**5. 归纳偏置：显著跨度掩码**

标准 BERT 预训练使用随机掩码，但许多被掩码的 token（如停用词、常见词）不需要世界知识即可预测。REALM 提出**显著跨度掩码 (Salient Span Masking)**：

- 首先使用 NER 标注器和正则表达式识别文本中的命名实体和日期
- 优先选择这些"显著跨度"进行掩码
- 这迫使检索器学习检索包含特定事实知识的文档

消融实验证实了其有效性：
| 掩码策略 | NQ Dev EM | 零样本检索 Recall@5 |
|---------|-----------|-------------------|
| 显著跨度掩码 (REALM) | 38.2 | 38.5 |
| 随机跨度掩码 | 35.3 | 26.1 |
| 随机均匀掩码 | 32.3 | 24.2 |

##### 与传统方法的对比

| 维度 | 传统 Retrieve-and-Read | REALM |
|------|----------------------|-------|
| 检索方式 | TF-IDF/BM25 等稀疏检索 | 端到端学习的稠密检索 |
| 预训练 | 仅训练编码器 (BERT) | 联合预训练检索器 + 编码器 |
| 知识更新 | 需重新训练 | 仅需更新知识库 |
| 梯度传播 | 检索器不可微 | 梯度穿过检索器反向传播 |

与最直接的对比对象 ORQA 相比，REALM 的关键改进在于：(1) 增加了语言模型预训练步骤（而非仅用 ICT 训练检索器）；(2) 训练过程中反向传播到 MIPS 索引（而非使用固定索引）。这两点改进使 NQ 上的 EM 从 33.3 提升至 40.4。

##### 主要实验结果

REALM 在三个 Open-QA 基准上均取得 SOTA：

| 模型 | 参数量 | NQ | WQ | CT |
|------|--------|-----|-----|-----|
| DrQA | 34M | - | 20.7 | 25.7 |
| BERT-Baseline | 110M | 26.5 | 17.7 | 21.3 |
| ORQA | 330M | 33.3 | 36.4 | 30.1 |
| T5 (11B) | 11318M | 34.5 | 37.4 | - |
| **REALM** | **330M** | **40.4** | **40.7** | **46.8** |

> 💡 关键：REALM 以仅 330M 参数（约 T5-11B 的 3%）在 NQ 和 WQ 上超越了 T5-11B，证明了"检索 + 小模型"范式相比"纯参数记忆 + 大模型"范式的效率优势。

#### 🧪 练习题
```yaml
question: "REALM 在预训练阶段使用显著跨度掩码 (Salient Span Masking) 的主要目的是什么？"
options:
  - "减少预训练的计算开销"
  - "迫使模型学习检索包含世界知识的文档，而非仅依赖局部上下文"
  - "提高 BERT 编码器的语法理解能力"
  - "使 MIPS 索引的刷新频率降低"
answer: 1
explain: "显著跨度掩码优先掩码命名实体和日期等需要世界知识才能预测的跨度，迫使检索器学习检索包含相关事实的文档，而随机掩码中大量 token 仅需局部上下文即可预测，无法有效训练检索器。"
```

### RAG

```yaml
id: rag
num: 3
name: RAG
full_name: 检索增强生成 (Retrieval-Augmented Generation)
year: '2020.05'
org: Meta AI
parent: dpr
paper_url: https://arxiv.org/abs/2005.11401
project_url: ''
category: foundation
motivation: 首个端到端RAG框架，结合DPR检索与BART生成
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
```yaml
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
```

### ColBERT

```yaml
id: colbert
num: 4
name: ColBERT
full_name: 上下文化后期交互 (Contextualized Late Interaction over BERT)
year: '2020.04'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2004.12832
project_url: ''
category: foundation
motivation: 后期交互机制平衡重排序精度与速度
```

#### 📝 一句话总结
ColBERT 提出**上下文化后期交互（Contextualized Late Interaction）**范式，将查询和文档独立编码为细粒度 token 级嵌入后，通过轻量级的 MaxSim 操作估计相关性，在保持与全交互 BERT 排序模型相当精度的同时实现 **170 倍以上的加速**，并支持端到端神经检索。

#### 🎯 核心要点
- **后期交互范式**：查询与文档由 BERT 独立编码，交互延迟到嵌入空间中的 MaxSim 运算，兼顾表达力与效率
- **MaxSim 评分机制**：对每个查询 token 取其与所有文档 token 的最大余弦相似度，再对所有查询 token 求和，实现细粒度软匹配
- **查询增强（Query Augmentation）**：用 `[MASK]` token 将查询填充至固定长度 \(N_q=32\)，BERT 对 `[MASK]` 的上下文化输出起到**隐式查询扩展**作用
- **离线文档编码 + 在线查询编码**：文档嵌入可预计算并存储，查询时仅需编码短查询后做矩阵运算
- **端到端检索**：结合 FAISS IVFPQ 索引，对每个查询 token 做 ANN 搜索后合并候选文档，再精确重排
- **空间压缩**：通过降维（128→24）和半精度存储（4B→2B/dim），可将 8.8M 文档的索引从 286 GiB 压缩至 27 GiB，MRR@10 仅下降约 1%
- **MS MARCO 与 TREC CAR 双基准验证**：重排序 MRR@10 达 34.9（与 BERT-base 的 34.7 持平），端到端检索 MRR@10 达 36.0

#### 🔬 深入细节
![ColBERT 架构总览](https://ar5iv.labs.arxiv.org/html/2004.12832/assets/x3.png)
*图：ColBERT 的整体架构。查询和文档分别经过 BERT 编码与线性投影，生成 token 级嵌入后通过 MaxSim 交互计算相关性分数。*

![查询-文档匹配范式对比](https://ar5iv.labs.arxiv.org/html/2004.12832/assets/x2.png)
*图：神经 IR 中四种查询-文档匹配范式对比。(a) 表示学习：独立编码+单向量点积；(b) 全交互：拼接输入 BERT 联合编码；(c) 后期交互（ColBERT）：独立编码+细粒度 token 级交互；(d) 效果-延迟权衡示意。*

```python
# ColBERT 核心算法伪代码

# === 离线索引阶段 ===
def encode_document(d, bert, linear):
    """文档编码：BERT + 线性投影 + L2归一化 + 过滤标点"""
    tokens = tokenize("[CLS] [D] " + d)          # 添加特殊前缀 [D]
    hidden = bert(tokens)                          # BERT 上下文化编码
    embeddings = L2_normalize(linear(hidden))      # 线性投影到 m=128 维 + 归一化
    return filter_punctuation(embeddings)           # 移除标点 token 的嵌入

# === 在线查询阶段 ===
def encode_query(q, bert, linear, Nq=32):
    """查询编码：BERT + 线性投影 + L2归一化 + MASK填充"""
    tokens = tokenize("[CLS] [Q] " + q)
    tokens = pad_with_MASK(tokens, target_length=Nq)  # [MASK] 填充至 Nq
    hidden = bert(tokens)
    return L2_normalize(linear(hidden))                # (Nq, m) 矩阵

# === 评分：MaxSim ===
def score(Eq, Ed):
    """S(q,d) = Σ_i max_j (Eq_i · Ed_j^T)"""
    sim_matrix = Eq @ Ed.T          # (Nq, Nd) 余弦相似度矩阵
    max_sim = sim_matrix.max(dim=1)  # 每个查询 token 取最大值 → (Nq,)
    return max_sim.sum()             # 求和得最终分数

# === 端到端检索 ===
def retrieve(Eq, faiss_index, all_doc_embeddings, k=1000):
    """两阶段：ANN 候选过滤 + 精确重排"""
    candidates = set()
    for qi in Eq:                                    # 对每个查询 token
        nn_ids = faiss_index.search(qi, k=k//2)     # ANN 搜索最近邻
        candidates.update(get_doc_ids(nn_ids))       # 收集候选文档
    # 精确重排
    scores = {d: score(Eq, all_doc_embeddings[d]) for d in candidates}
    return sorted(scores, key=scores.get, reverse=True)[:k]
```

**动机与背景：为什么需要后期交互？**

在 ColBERT 之前，基于 BERT 的排序模型主要分为两类。第一类是**表示学习（Representation-based）**方法，如 DSSM，将查询和文档各自编码为单一向量后计算点积，虽然文档可以离线预编码从而实现高效检索，但单向量难以捕获细粒度的语义匹配信号，效果远不及 BERT 全交互模型。第二类是**全交互（Full Interaction）**方法，如直接将查询和文档拼接输入 BERT，让每个 token 通过自注意力与所有其他 token 交互，虽然效果优异，但每个 \(\langle q, d \rangle\) 对都需要独立执行一次完整的 BERT 前向传播，在重排序 1000 篇文档时需要约 10 秒，FLOPs 高达 97 万亿，完全无法满足实际部署的延迟要求。ColBERT 的核心洞察在于：**查询和文档的深层语义编码可以独立完成，而细粒度的匹配信号可以通过编码后的轻量级交互来捕获**。这就是"后期交互"的含义——交互发生在编码之后，而非编码过程中。

**核心机制：编码器与 MaxSim 详解**

ColBERT 的编码器基于预训练 BERT，查询和文档分别添加特殊标记 `[Q]` 和 `[D]` 作为前缀以区分角色。编码后的隐藏状态通过一个无偏置的线性层投影到低维空间（\(m=128\)），再进行 L2 归一化，使得内积等价于余弦相似度。查询侧的一个关键设计是**查询增强**：无论原始查询多短，都用 `[MASK]` token 填充至固定长度 \(N_q=32\)。由于 BERT 的自注意力机制，这些 `[MASK]` token 的输出嵌入会根据查询上下文被赋予有意义的语义表示，相当于让模型学习"这个查询可能还需要匹配哪些隐含概念"，起到**软查询扩展**的效果。消融实验证实，去掉查询增强后 MRR@10 从 34.4 下降到约 33.5（5 层 BERT 设置下），验证了其有效性。

相关性评分通过 **MaxSim** 操作计算：

$$S_{q,d} = \sum_{i \in [|E_q|]} \max_{j \in [|E_d|]} E_{q_i} \cdot E_{d_j}^T$$

直觉上，每个查询 token 在文档中寻找与自己最相似的 token（最大相似度），然后将所有查询 token 的最佳匹配分数求和。这种设计有三个优势：（1）保留了 token 级别的细粒度匹配，不像单向量方法那样丢失信息；（2）max 操作天然适合捕获"查询中的某个概念是否在文档中出现"的信号，比 average 更能反映精确匹配的重要性（消融实验中 AvgSim 比 MaxSim 低约 1.5 个 MRR 点）；（3）计算仅涉及矩阵乘法和 max-pooling，可以在 GPU 上高度并行化。

**训练与推理流程**

训练采用**成对 softmax 交叉熵损失**，每个训练样本为三元组 \(\langle q, d^+, d^- \rangle\)，正样本来自标注，负样本来自 BM25 检索的高排名非相关文档。损失函数为：

$$\mathcal{L} = -\log \frac{e^{S_{q,d^+}}}{e^{S_{q,d^+}} + e^{S_{q,d^-}}}$$

使用 Adam 优化器，学习率 \(3 \times 10^{-6}\)，batch size 32，训练 200k 步。查询最大长度 32 token，文档最大长度 180 token。

> 💡 **关键设计：离线索引的工程优化**
> ColBERT 的索引流程包含多项优化：（1）按文档长度分桶（BucketIterator），减少 padding 浪费；（2）批量编码后直接写入磁盘，避免内存瓶颈；（3）文档嵌入可用 16-bit 半精度存储，空间减半而 MRR@10 几乎无损（34.9→34.8）。在 MS MARCO 的 8.8M 文档上，完整索引约需 3 小时。

**重排序模式**下，预加载候选文档的嵌入到 GPU，对每个查询执行批量矩阵乘法后 max-pool 再 sum，单查询延迟仅 **61ms**（重排 1000 篇文档），相比 BERT-base 的 10,700ms 快 **170 倍以上**，而 MRR@10 从 34.7 提升至 34.9。

**端到端检索模式**下，使用 FAISS 的 IVFPQ 索引。对查询的每个 token 嵌入执行 ANN 搜索，收集 top-\(k'\) 最近邻对应的文档 ID，取并集得到候选集（通常远小于全集），再用精确 MaxSim 重排。此模式下 MRR@10 达到 **36.0**（优于重排序模式，因为召回更好），Recall@50 达 82.9，甚至超过 BM25 的 Recall@1000（81.2）。

**与传统方法的关键区别**

| 维度 | 全交互 (BERT cross-encoder) | 表示学习 (Bi-encoder) | ColBERT (后期交互) |
|------|---------------------------|---------------------|-------------------|
| 编码方式 | 查询+文档拼接联合编码 | 各自编码为单向量 | 各自编码为 token 级嵌入矩阵 |
| 交互粒度 | 全 token 自注意力 | 无（仅向量点积） | token 级 MaxSim |
| 文档预编码 | ❌ 不可能 | ✅ 可以 | ✅ 可以 |
| 端到端检索 | ❌ 不可能 | ✅ ANN 检索 | ✅ 多向量 ANN + 重排 |
| 延迟 (top-1000) | ~10,700ms | ~几十ms | ~61ms (重排) / ~458ms (端到端) |
| MRR@10 (MS MARCO) | 34.7 | ~30 | 34.9 (重排) / 36.0 (端到端) |

ColBERT 的核心贡献在于证明了**"编码可以独立，交互可以延迟"**这一设计原则的可行性：通过保留 token 级别的细粒度表示（而非压缩为单向量），后期的轻量级交互就足以恢复全交互模型的大部分匹配能力，同时享受独立编码带来的计算效率优势。

#### 🧪 练习题
```yaml
question: "ColBERT 中查询编码时使用 [MASK] token 填充的主要目的是什么？"
options:
  - "统一查询长度以便于 GPU 批处理"
  - "利用 BERT 上下文化能力实现隐式查询扩展"
  - "防止查询 token 数量超过文档 token 数量"
  - "降低查询编码的计算复杂度"
answer: 1
explain: "[MASK] token 经过 BERT 自注意力后会获得与查询上下文相关的语义表示，相当于为查询补充隐含的匹配需求，起到软查询扩展的作用。消融实验证实去掉查询增强后 MRR@10 显著下降。"
```

### FiD

```yaml
id: fid
num: 5
name: FiD
full_name: 解码器融合 (Fusion-in-Decoder)
year: '2021.04'
org: INRIA/Meta
parent: rag
paper_url: https://arxiv.org/abs/2007.01282
project_url: ''
category: foundation
motivation: 解码器端多文档独立编码与联合注意力融合
```

#### 📝 一句话总结
FiD 提出把多个检索段落在编码器端独立编码、在解码器端统一交叉注意力融合的开放域问答架构，解决了多文档拼接编码开销高和逐文档生成难以聚合证据的问题。

#### 🎯 核心要点
- 两阶段开放域 QA：先用 BM25 或 DPR 检索支持段落，再用生成式 seq2seq reader 生成答案
- 输入模板明确：每个段落独立构造成 `question: {q} title: {t} context: {p}`
- 编码器独立处理段落：共享同一 T5/BART 编码器参数，但每个 passage 只在自身 token 内做 self-attention
- 解码器统一融合证据：把所有 encoder hidden states 拼接后交给 decoder cross-attention
- 复杂度优势：encoder 计算随段落数近似线性增长，能扩展到 100 个 retrieved passages
- 多证据聚合能力：decoder 在每个生成步可同时关注所有段落表示，而不是对单段落答案概率做后验加权
- 实验结果突出：在 Natural Questions 和 TriviaQA open benchmarks 上取得当时 SOTA，且段落数从 10 增至 100 时仍持续提升

#### 🔬 深入细节
![FiD 架构图](https://aman.ai/images/papers/FiD.jpg)
*图：FiD 架构。问题分别与多个 passage 拼接后独立编码，decoder 对拼接后的所有 encoder 表示做交叉注意力并生成答案。*

```python
# Fusion-in-Decoder 推理/训练流程伪代码
def fusion_in_decoder(question, passages, encoder, decoder, answer=None):
    encoded_blocks = []

    for passage in passages:
        x_i = (
            "question: " + question
            + " title: " + passage.title
            + " context: " + passage.text
        )
        tokens_i = tokenize(x_i, max_length=250)
        h_i = encoder(tokens_i)          # 每个 passage 独立 self-attention
        encoded_blocks.append(h_i)

    h_all = concatenate(encoded_blocks, dim="sequence")

    if answer is None:
        return decoder.generate(encoder_hidden_states=h_all)

    y = tokenize(answer)
    logits = decoder(y[:-1], encoder_hidden_states=h_all)
    return cross_entropy(logits, y[1:])
```

FiD 处理的是开放域问答：给定问题 \(q\)，系统先从 Wikipedia 等外部语料检索 \(K\) 个候选段落，再生成答案 \(y\)。闭卷生成模型可以把知识压进参数，但需要极大的模型；抽取式 reader 可以利用检索文本，却通常只能从单个段落抽 span。FiD 的选择是保留检索系统的显式知识，同时用生成式 decoder 在答案生成时聚合多段证据。

方法上，FiD 对每个段落 \(p_i\) 都构造一个独立输入 \(x_i=[q;t_i;p_i]\)，再用共享编码器得到：

$$
H_i=\mathrm{Encoder}_{\theta}(x_i), \qquad
H=\mathrm{Concat}(H_1,H_2,\ldots,H_K).
$$

随后 decoder 以 \(H\) 作为统一的 cross-attention memory，按自回归方式生成答案：

$$
P(y\mid q,p_{1:K})=\prod_t P(y_t\mid y_{<t},H).
$$

这种设计的关键取舍是把跨段落交互推迟到 decoder。若把 \(K\) 个 passage 直接拼接进 encoder，self-attention 复杂度约为 \(O((Kn)^2)\)；FiD 则对每个长度为 \(n\) 的 passage 独立编码，encoder 复杂度约为 \(O(Kn^2)\)。由于开放域 QA 的答案通常很短，decoder 对 \(K n\) 个 hidden states 做 cross-attention 的额外代价可控。

与 RAG 的区别在融合位置。RAG 类方法通常对每个 passage 独立计算生成概率，再按检索概率边际化；这意味着每条生成路径主要看见单个 passage。FiD 的 decoder 在同一生成步可以同时关注所有 passage 表示，因此更适合处理证据分散、需要比较多个段落或需要从多个候选中排除错误信息的问题。

训练上，论文初始化 T5-base 或 T5-large，冻结或单独训练检索器不是重点；reader 直接用答案的负对数似然优化。实验中 Wikipedia 被切分为不重叠的 100-word passages，训练和测试默认检索 100 个 passage，并将每个输入截断到 250 word pieces。这个设置展示了 FiD 的核心价值：reader 的性能随着可读证据数量增加仍能提升，而不是在 10 到 20 个段落后迅速饱和。

FiD 对后续 RAG 系统的影响在于明确了一个简单结构原则：检索文档可以先独立编码以控制成本，再在生成端用 cross-attention 进行深融合。后来的 RAG reader、multi-passage reranker 和轻量化 FiD 变体大多沿用了这个“独立编码、解码融合”的思想，只是在压缩 encoder 输出、选择证据 token 或加速 decoder attention 上做改进。

#### 🧪 练习题
```yaml
question: "FiD 为什么把多个 passage 的融合放到 decoder 而不是 encoder？"
options:
  - "为了让 encoder 的 self-attention 随 passage 数线性扩展，同时保留 decoder 聚合多证据的能力"
  - "因为 decoder 不能访问 encoder 输出"
  - "为了完全取消检索模块"
  - "因为 FiD 只能生成单 token 答案"
answer: 0
explain: "独立编码避免了拼接 passage 带来的二次方 self-attention 成本；decoder 对拼接后的 hidden states 做 cross-attention，仍能在生成时融合多段证据。"
```

### Contriever

```yaml
id: contriever
num: 6
name: Contriever
full_name: 对比学习检索器 (Contrastive Retriever)
year: '2021.12'
org: Meta AI
parent: dpr
paper_url: https://arxiv.org/abs/2112.09118
project_url: ''
category: foundation
motivation: 无监督对比学习实现密集检索，消除标注依赖
```

#### 📝 一句话总结
Contriever 提出了一种基于对比学习的无监督密集检索方法，通过独立随机裁剪（Independent Cropping）构建正样本对、MoCo 动量编码器扩展负样本规模，在无需任何标注数据的情况下训练 bi-encoder 检索器，在 BEIR 基准的 15 个数据集中有 11 个超越 BM25（Recall@100），并可作为预训练方法进一步微调以达到 SOTA 性能。

#### 🎯 核心要点
- **架构**：共享参数的 Bi-encoder，基于 BERT-base-uncased，使用 mean pooling 获取文档/查询表示，点积计算相似度
- **正样本对构建**：独立随机裁剪（Independent Cropping）——从同一文档中独立采样两个 token 子序列作为正对，优于 Inverse Cloze Task (ICT)
- **数据增强**：在裁剪基础上以 10% 概率随机删除 token，进一步增加多样性
- **负样本扩展**：采用 MoCo（Momentum Contrast）框架，通过动量编码器 + 队列机制将负样本数扩展至数万级别，避免超大 batch size
- **训练数据**：仅使用无标注的 Wikipedia 和 CCNet（各占一半 batch），完全无监督
- **损失函数**：InfoNCE 对比损失，带温度参数 \(\tau\)
- **无监督性能**：BEIR 基准 11/15 数据集 Recall@100 超越 BM25；NQ 上 R@100=82.1（BM25 为 78.3）
- **预训练+微调**：在 MS MARCO 微调后，BEIR nDCG@10 达到 dense bi-encoder 最优；结合 cross-encoder 重排在 8/15 数据集上达到 SOTA
- **多语言能力**：基于 mBERT 训练的多语言版本在 Mr.TyDi 基准上实现强无监督性能，并展现跨语言检索能力（如阿拉伯语查询检索英语文档）

#### 🔬 深入细节
##### 核心框架图

![Contriever 无监督检索性能对比](https://ar5iv.labs.arxiv.org/html/2112.09118v1/assets/figures/beir_recall100_unsupervised.png)

*图：Contriever 无监督检索在 BEIR 基准上与 BM25、REALM、SimCSE 的 Recall@100 对比。Contriever 在 15 个数据集中 11 个超越 BM25。*

##### 算法伪代码

```python
# Contriever 对比学习训练流程
# 初始化
encoder_q = BERTBase()          # 查询编码器 (query encoder)
encoder_k = copy(encoder_q)     # 键编码器 (key/momentum encoder)
queue = []                      # 负样本队列
m = 0.999                       # 动量系数
tau = 0.05                      # 温度参数

for batch in DataLoader(Wikipedia + CCNet):
    for doc in batch:
        # Step 1: 独立随机裁剪生成正样本对
        span_q = random_crop(doc)           # 随机采样一段 token 子序列
        span_k = random_crop(doc)           # 独立采样另一段（可重叠）
        
        # Step 2: 数据增强 — 随机删除 token (p=0.1)
        span_q = random_delete(span_q, p=0.1)
        span_k = random_delete(span_k, p=0.1)
        
        # Step 3: 编码
        q = mean_pool(encoder_q(span_q))    # query 表示
        k = mean_pool(encoder_k(span_k))    # key 表示 (no gradient)
    
    # Step 4: InfoNCE 对比损失
    # 正样本: (q_i, k_i), 负样本: queue 中所有 key
    pos_score = dot(q, k) / tau
    neg_scores = dot(q, queue) / tau
    loss = -log(exp(pos_score) / (exp(pos_score) + sum(exp(neg_scores))))
    
    # Step 5: 反向传播 (仅更新 encoder_q)
    loss.backward()
    optimizer.step()
    
    # Step 6: 动量更新 encoder_k
    encoder_k.params = m * encoder_k.params + (1 - m) * encoder_q.params
    
    # Step 7: 更新队列
    queue.enqueue(k)
    queue.dequeue_oldest()
```

##### 方法详解

**动机与背景：密集检索的标注瓶颈。** 传统稀疏检索方法（如 BM25）基于词频匹配，无需训练数据但受限于词汇鸿沟（lexical gap），无法捕捉语义相似性。近年来，基于神经网络的密集检索器（如 DPR）在有大规模标注数据（如 MS MARCO）时表现优异，但在零样本迁移到新领域时往往不如 BM25。这是因为密集检索器的表示能力高度依赖于训练数据的分布，而标注检索数据需要在百万级文档集合中人工匹配查询与相关文档，成本极高。Contriever 的核心问题是：**能否完全不使用标注数据，仅通过无监督学习训练出匹配甚至超越 BM25 的密集检索器？**

**核心机制一：独立随机裁剪构建正样本对。** 对比学习的关键在于如何构建有意义的正样本对。此前的 Inverse Cloze Task (ICT) 从文档中抽取一个句子作为"查询"，剩余部分作为"文档"，但这种方式存在两个问题：(1) 查询和文档分布不对称——查询始终是单句，文档是多句上下文；(2) 查询与文档之间没有词汇重叠，模型无法学习精确匹配信号。Contriever 借鉴计算机视觉中 SimCLR/MoCo 的随机裁剪策略，提出**独立随机裁剪**（Independent Cropping）：从同一文档中独立采样两个连续 token 子序列作为正对。这种设计的优势在于：(1) 对称性——两个视图来自相同分布，消除了查询/文档的人为区分；(2) 自然产生词汇重叠——两个随机裁剪的片段可能共享部分 token，使模型同时学习精确匹配（类似 BM25）和语义匹配信号。实验证明，独立裁剪在所有评估基准上均优于 ICT。

**核心机制二：MoCo 动量对比扩展负样本。** 对比学习的效果与负样本数量密切相关。标准的 in-batch negatives 方法要求极大的 batch size（文献报告需 8192 个负样本才能充分发挥效果），这对 GPU 内存提出了苛刻要求。Contriever 采用 MoCo（Momentum Contrast）框架解决这一问题。MoCo 维护两个编码器：查询编码器 \(\theta_q\) 通过梯度下降正常更新，键编码器 \(\theta_k\) 通过指数移动平均（EMA）缓慢更新：

$$\theta_k \leftarrow m \cdot \theta_k + (1 - m) \cdot \theta_q$$

其中动量系数 \(m = 0.999\)。同时，MoCo 维护一个先进先出队列，存储前几个 batch 的键表示作为负样本。由于键编码器变化缓慢，队列中的旧表示仍然与当前模型近似一致，从而在不增加 batch size 的情况下将负样本数量扩展到数万级别。训练使用 InfoNCE 损失：

$$\mathcal{L} = -\log \frac{\exp(q \cdot k^+ / \tau)}{\exp(q \cdot k^+ / \tau) + \sum_{k^- \in \text{queue}} \exp(q \cdot k^- / \tau)}$$

其中 \(\tau\) 为温度参数，控制分布的锐度。

**训练数据与流程。** Contriever 的训练数据完全无标注，来自两个来源：英文 Wikipedia（2019 年 8 月版本）和 CCNet（Common Crawl 的清洗子集）。每个 batch 中一半样本来自 Wikipedia，一半来自 CCNet，这种混合策略使模型既能学习结构化百科知识，又能适应多样化的网页文本。编码器基于 BERT-base-uncased（110M 参数），使用 mean pooling（对所有 token 的隐藏状态取平均）而非 [CLS] token 作为序列表示。在裁剪的基础上，还以 10% 的概率随机删除 token 作为额外数据增强，增加正样本对之间的差异性，迫使模型学习更鲁棒的语义表示。

**与传统方法的对比。** 与 BM25 相比，Contriever 能够捕捉超越词汇匹配的语义相似性，在 BEIR 基准的 15 个数据集中有 11 个在 Recall@100 上超越 BM25，尤其在需要语义理解的任务（如 ArguAna、SCIDOCS）上优势明显。与有监督的 DPR 相比，Contriever 无需任何标注数据，且在域外泛化能力上更强——DPR 在 NQ 上训练后迁移到 BEIR 其他数据集时性能大幅下降，而 Contriever 的无监督表示具有更好的通用性。与 ICT 预训练方法（如 REALM）相比，Contriever 的独立裁剪策略和 MoCo 负采样机制带来了显著提升。此外，Contriever 还可以作为预训练方法：先无监督对比学习，再在 MS MARCO 上微调，这种两阶段策略在 BEIR 上取得了 dense bi-encoder 类别的最佳 nDCG@10 和 Recall@100（平均 67.1）。

> 💡 **关键洞察**：独立随机裁剪之所以优于 ICT，核心在于它自然产生了词汇重叠，使模型同时学习精确匹配和语义匹配两种信号，而 ICT 的查询-上下文分离设计完全排除了精确匹配信号。

> ⚠️ **注意**：Contriever 在某些高度专业化的领域（如 BioASQ、CQADupStack）上仍不如 BM25，说明纯无监督对比学习在领域术语密集的场景下仍有局限。

#### 🧪 练习题
```yaml
question: "Contriever 使用独立随机裁剪（Independent Cropping）而非 Inverse Cloze Task (ICT) 构建正样本对的主要优势是什么？"
options:
  - "裁剪生成的文本更短，计算效率更高"
  - "裁剪产生的两个视图可能存在词汇重叠，使模型同时学习精确匹配和语义匹配信号"
  - "裁剪不需要句子分割，实现更简单"
  - "裁剪能保证正样本对之间完全没有重叠，增加学习难度"
answer: 1
explain: "独立随机裁剪的两个片段可能共享部分 token，这使得模型在学习语义相似性的同时也能捕捉类似 BM25 的精确匹配信号，而 ICT 的查询-上下文分离设计完全排除了词汇重叠。"
```

### RETRO

```yaml
id: retro
num: 7
name: RETRO
full_name: 基于检索的Transformer (Retrieval-Enhanced Transformer)
year: '2022.02'
org: DeepMind
parent: realm
paper_url: https://arxiv.org/abs/2112.04426
project_url: ''
category: foundation
motivation: 分块交叉注意力支持2万亿Token检索库
```

#### 📝 一句话总结
RETRO 提出了一种半参数化的检索增强语言模型架构，通过冻结的 BERT 检索器从 2 万亿 Token 数据库中获取相关文本片段，并利用分块交叉注意力（Chunked Cross-Attention, CCA）将检索信息融入自回归生成过程，以 25 倍更少的参数量达到与 GPT-3 等超大模型相当的语言建模性能。

#### 🎯 核心要点
- **半参数化架构**：将语言模型分为参数化（Transformer）和非参数化（检索数据库）两部分，通过检索外部知识替代纯粹增加模型参数
- **大规模检索数据库**：基于 MassiveText 数据集构建包含 2 万亿 Token 的键值数据库，键为冻结 BERT 的句子嵌入，值为邻居文本块及其后续文本
- **分块交叉注意力（CCA）**：将输入序列分成固定长度的块（chunk），每个块独立检索 \(k\) 个最近邻，通过 CCA 层将检索信息融入中间层表示
- **检索编码器（Encoder）**：轻量级 2 层 Transformer（约 36M 参数），将检索到的邻居文本编码后供 CCA 使用，编码时融合当前块的因果上下文
- **RETROfit 机制**：可在已预训练的标准 Transformer 上冻结原有参数，仅训练新增的检索模块（CCA + Encoder），快速获得检索增强能力
- **泄漏感知评估**：使用 13-gram Jaccard 相似度检测训练集与测试集的重叠，按重叠比例分桶报告 bits-per-byte，确保评估公正
- **模型规模**：从 132M 到 7.5B 参数，检索增益在所有规模上均不衰减，等效约 10 倍参数量的纯参数模型

#### 🔬 深入细节
##### 核心架构图

![RETRO 架构总览](https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x2.png)
*图：RETRO 架构示意。左侧为标准 Transformer 解码器（ATTN + FFW），右侧展示了 CCA 层如何将检索编码器的输出融入解码器的中间表示。编码器接收检索到的邻居块 \(\text{RET}(C_u)\) 并结合前一个块的中间激活 \(H_u\) 进行交叉注意力。*

![RETRO 性能缩放](https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x1.png)
*图：RETRO 在不同模型规模和数据库规模下的性能。检索增益在所有模型规模上保持一致，且随数据库规模增大而增大。*

##### 算法伪代码

```python
# RETRO 训练/推理核心流程伪代码
# 输入: 序列 X = (x_1, ..., x_n), n=2048
# 分块: l 个块, 每块 m=64 tokens → C = (C_1, ..., C_l), l=32

# === 第一步: 检索 ===
for u in range(1, l+1):
    if u == 1:
        RET(C_1) = ∅  # 第一个块无检索(保持自回归性)
    else:
        # 用前一个块 C_{u-1} 的 frozen BERT 嵌入作为 query
        query = BERT_frozen(C_{u-1})  # [d] 维向量
        # 从数据库中用 SCaNN 近似最近邻搜索 k 个邻居
        RET(C_u) = top_k_neighbours(query, DB, k=2)
        # 每个邻居 = [N_j (邻居块, m tokens), F_j (后续块, m tokens)]

# === 第二步: 编码检索结果 ===
for u in range(2, l+1):
    for j in range(1, k+1):
        # 拼接邻居块和后续块
        neighbour_j = concat(N_j, F_j)  # [2m] tokens
        # 编码器: 2层Transformer, 融合当前块的因果上下文
        E_u_j = ENCODER(neighbour_j, ca_context=H_u)  # H_u 来自解码器中间层

# === 第三步: 解码器前向传播 ===
for layer_idx in range(num_layers):
    H = ATTN(H)           # 因果自注意力 (所有层)
    if layer_idx in CCA_layers:  # 从第6层开始, 每3层一次
        H = CCA(H, E)     # 分块交叉注意力: Q=H_u, KV=E_u
    H = FFW(H)            # 前馈网络

# 输出: 下一个 token 的概率分布
logits = output_head(H)
loss = cross_entropy(logits, X_shifted)
```

##### 方法详解

**动机与背景**

传统语言模型通过增加参数量来存储更多世界知识，但这导致训练和推理成本急剧增长。GPT-3（175B 参数）和 Jurassic-1（178B 参数）虽然性能强大，但资源消耗巨大。RETRO 的核心洞察是：**语言模型不需要将所有知识压缩到参数中，可以通过检索外部数据库来"按需查阅"知识**。这种半参数化方法使得 7.5B 参数的 RETRO 在多个基准上达到与 175B 参数模型相当的性能。

> 💡 关键：RETRO 的检索增益等效于约 10 倍的参数量提升——即 RETRO 7.5B ≈ 纯参数模型 ~75B 的性能。

**核心机制一：分块检索（Chunked Retrieval）**

输入序列 \(X = (x_1, \ldots, x_n)\) 被分成 \(l\) 个不重叠的块，每块 \(m\) 个 token：

$$C_u = (x_{(u-1)m+1}, \ldots, x_{um}), \quad u \in \{1, \ldots, l\}$$

其中 \(n = 2048\)，\(m = 64\)，因此 \(l = 32\)。对于每个块 \(C_u\)（\(u \geq 2\)），使用**前一个块** \(C_{u-1}\) 的冻结 BERT 嵌入作为查询，从数据库中检索 \(k\) 个最近邻：

$$\text{RET}(C_u) = \{[N_1, F_1], \ldots, [N_k, F_k]\}$$

其中 \(N_j\) 是邻居块（\(m\) 个 token），\(F_j\) 是其后续块（\(m\) 个 token）。使用前一个块而非当前块作为查询，是为了**严格保持自回归性**——避免在生成当前块时"偷看"自身内容。

> ⚠️ 注意：第一个块 \(C_1\) 没有检索结果（\(\text{RET}(C_1) = \emptyset\)），因为没有前驱块可用作查询。

**核心机制二：检索数据库（Key-Value Database）**

数据库以键值对形式存储：
- **键（Key）**：每个文本块经冻结 BERT 编码后的 \(d\) 维嵌入向量（取 \([\text{CLS}]\) token 的最后一层隐藏状态的平均）
- **值（Value）**：对应的文本块 \(N\) 及其后续块 \(F\)

检索使用 L2 距离度量，通过 Google 的 SCaNN 库进行近似最近邻搜索。训练时使用约 6000 亿 Token 的数据库，评估时扩展至 1.75 万亿 Token。

> 💡 关键：包含后续块 \(F\) 是因为邻居块 \(N\) 与查询块 \(C_{u-1}\) 对齐，而 \(F\) 才与当前待预测块 \(C_u\) 的内容最相关。

**核心机制三：分块交叉注意力（Chunked Cross-Attention, CCA）**

CCA 是 RETRO 的核心创新。在标准 Transformer 层中，每一层的计算为：

$$\text{LM}(H) = \text{FFW}(\text{ATTN}(H))$$

RETRO 在部分层中插入 CCA，变为：

$$\text{RETRO}(H, E) = \text{FFW}(\text{CCA}(\text{ATTN}(H), E))$$

CCA 的具体计算过程如下。对于第 \(u\) 个块，设解码器中间激活为 \(H_u \in \mathbb{R}^{m \times d}\)，检索编码结果为 \(E_u \in \mathbb{R}^{k \times 2m \times d}\)：

$$\text{CCA}(H_u, E_u) = \text{softmax}\!\left(\frac{Q_u K_u^\top}{\sqrt{d_k}}\right) V_u + H_u$$

其中：
- \(Q_u = H_u W_Q \in \mathbb{R}^{m \times d_k}\)（查询来自解码器）
- \(K_u = E_u W_K \in \mathbb{R}^{(k \cdot 2m) \times d_k}\)（键来自编码器输出）
- \(V_u = E_u W_V \in \mathbb{R}^{(k \cdot 2m) \times d_v}\)（值来自编码器输出）

CCA 层从第 6 层开始，每隔 3 层插入一次（即第 6、9、12... 层），这样低层保持纯语言建模能力，高层逐步融合检索信息。

**核心机制四：检索编码器（Retrieval Encoder）**

编码器是一个轻量级的 2 层双向 Transformer（约 36M 参数）。它接收拼接后的邻居文本 \([N_j; F_j]\)（共 \(2m = 128\) 个 token），并在第二层通过交叉注意力融合来自解码器的上下文信息：

$$E_u^{(1)} = \text{BiAttn}(\text{Embed}([N_j; F_j]))$$

$$E_u^{(2)} = \text{BiAttn}(E_u^{(1)}) + \text{CA}(E_u^{(1)}, H_u^+)$$

其中 \(H_u^+\) 是解码器在 CCA 插入点之前、第 \(u\) 个块的最后一个 token 的中间激活（仅用最后一个 token 以保持因果性）。

**RETROfit：改造预训练模型**

RETRO 支持在已预训练的标准 Transformer 上进行改造：冻结原有的 ATTN 和 FFW 参数，仅训练新增的 CCA 层和编码器参数。实验表明，仅需 3% 的预训练序列数即可恢复大部分检索增益。

**与传统方法的区别**

| 特性 | kNN-LM | REALM/RAG | DPR | **RETRO** |
|------|--------|-----------|-----|-----------|
| 检索粒度 | Token 级 | 文档级 | 段落级 | **块级 (64 tokens)** |
| 检索器训练 | 冻结 | 端到端 | 端到端 | **冻结 BERT** |
| 融合方式 | 插值概率 | 拼接输入 | 拼接输入 | **分块交叉注意力** |
| 数据库规模 | ~百亿 Token | ~百亿 Token | ~百亿 Token | **万亿 Token** |
| 模型规模 | <1B | <1B | <1B | **最大 7.5B** |

> 💡 关键：RETRO 的冻结检索器 + CCA 设计使得数据库可以独立于模型更新，且支持万亿级规模的高效检索。

##### 关键公式汇总

**1. 分块定义：**

$$C_u = (x_{(u-1)m+1}, \ldots, x_{um}), \quad n = l \cdot m$$

**2. 检索距离（L2）：**

$$d(C_{u-1}, N) = \|\text{BERT}(C_{u-1}) - \text{BERT}(N)\|_2$$

**3. CCA 注意力计算：**

$$\text{CCA}(H_u, E_u) = \text{softmax}\!\left(\frac{(H_u W_Q)(E_u W_K)^\top}{\sqrt{d_k}}\right)(E_u W_V) + H_u$$

**4. RETRO 层公式：**

$$\text{RETRO}(H, E) = \text{FFW}\bigl(\text{CCA}(\text{ATTN}(H),\; E)\bigr)$$

**5. 标准 LM 层公式（对比）：**

$$\text{LM}(H) = \text{FFW}\bigl(\text{ATTN}(H)\bigr)$$

**6. 泄漏感知评估（按重叠比例 \(\alpha\) 过滤）：**

$$\text{bpb}_{\text{filtered}}(\alpha) = \frac{\sum_{c:\, \text{overlap}(c) \leq \alpha} \text{bits}(c)}{\sum_{c:\, \text{overlap}(c) \leq \alpha} \text{bytes}(c)}$$

#### 🧪 练习题
```yaml
question: "RETRO 在检索时使用前一个块 C_{u-1} 而非当前块 C_u 作为查询的主要原因是什么？"
options:
  - "前一个块的语义信息更丰富，检索效果更好"
  - "为了严格保持自回归性，避免在生成当前块时利用当前块自身的信息"
  - "为了减少计算量，前一个块已经编码完成可以直接复用"
  - "为了与 BERT 检索器的预训练目标保持一致"
answer: 1
explain: "在自回归生成中，当前块 C_u 的 token 尚未完全生成，不能用于检索。使用已完成的前一个块 C_{u-1} 作为查询，确保检索过程不违反因果约束。"
```

### Atlas

```yaml
id: atlas
num: 8
name: Atlas
full_name: Atlas少样本学习模型
year: '2022.08'
org: Meta AI
parent: fid
paper_url: https://arxiv.org/abs/2208.03299
project_url: ''
category: foundation
motivation: 检索器与阅读器联合预训练，少样本专家
```

#### 📝 一句话总结
Atlas 提出了一种将稠密检索器（Contriever）与 Seq2Seq 语言模型（T5/FiD）进行端到端联合预训练的检索增强框架，通过四种检索器训练信号（ADist、EMDR²、PDist、LOOP）和多种无监督预训练任务实现了极强的少样本学习能力——仅 11B 参数、64 个示例即可在 NaturalQuestions 上达到 42.4% 准确率，超越 540B 参数的 PaLM。

#### 🎯 核心要点
- **架构**：检索器采用 Contriever（双编码器），语言模型采用 Fusion-in-Decoder (FiD)，二者端到端联合训练
- **四种检索器训练目标**：Attention Distillation (ADist)、EMDR²、Perplexity Distillation (PDist)、Leave-One-Out Perplexity Distillation (LOOP)，均利用语言模型的反馈信号训练检索器
- **四种无监督预训练任务**：Prefix Language Modeling、Masked Language Modeling、Title-to-Section Generation、Salient Span Masking，其中 Prefix LM 表现最优
- **索引更新机制**：定期异步重建文档索引（每 ~2500 步），并使用 query-side fine-tuning 技术在微调时仅更新查询编码器
- **少样本 SOTA**：64-shot NaturalQuestions 42.4%（超 PaLM 540B 3%）、64-shot TriviaQA 74.4%、15-shot FEVER 56.2%（超 Gopher 5.1%）
- **全量训练 SOTA**：NaturalQuestions 60.4%、TriviaQA 84.7%、MMLU 5-shot 多任务 56.4%
- **可更新性**：通过替换文档索引即可更新模型知识，无需重新训练；时序匹配索引可额外提升 +3.6%
- **索引压缩**：使用乘积量化（Product Quantization）可将索引压缩 5 倍，性能几乎无损

#### 🔬 深入细节
![Atlas 架构总览](https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x1.png)
*图 1：Atlas 整体架构。左侧为检索器（Contriever 双编码器），从文档索引中检索 top-k 文档；右侧为 Fusion-in-Decoder 语言模型，将检索到的文档与查询拼接后独立编码，在解码器中通过交叉注意力融合所有文档信息生成答案。*

```python
# Atlas 训练流程伪代码
def atlas_train_step(query, answer, retriever, lm, index):
    # 1. 检索 top-k 文档
    docs = retriever.retrieve(query, index, top_k=K)  # K=20
    
    # 2. 语言模型前向传播（FiD: 每个文档独立编码，解码器融合）
    for d_k in docs:
        enc_k = lm.encoder(concat(query, d_k))  # 独立编码
    lm_logits = lm.decoder(cross_attend_all(enc_1, ..., enc_K))
    lm_loss = cross_entropy(lm_logits, answer)
    
    # 3. 计算检索器训练信号（以 PDist 为例）
    for d_k in docs:
        p_lm_k = lm.log_prob(answer | d_k, query)  # 每个文档的 LM 困惑度
    target_dist = softmax([p_lm_1, ..., p_lm_K])    # LM 后验分布
    retriever_dist = softmax([sim(q, d_1), ..., sim(q, d_K)])
    retriever_loss = KL(target_dist || retriever_dist)
    
    # 4. 联合更新
    total_loss = lm_loss + retriever_loss
    optimizer.step(total_loss)
    
    # 5. 定期异步重建索引（每 ~2500 步）
    if step % 2500 == 0:
        index.rebuild(retriever.doc_encoder)
```

##### 动机与背景

大语言模型（LLM）通过增大参数量来隐式存储世界知识，但这种方式存在三个根本问题：(1) **参数效率低**——需要数百亿甚至上万亿参数才能记住足够知识；(2) **知识不可更新**——模型训练后知识即固化，无法跟随世界变化；(3) **不可解释**——无法追溯模型回答的知识来源。

检索增强生成（RAG）通过外挂文档索引解决了上述问题，但此前的 RAG 方法（如 REALM、RAG、RETRO）存在一个关键缺陷：**检索器与语言模型未能充分联合训练**，尤其在预训练阶段。Atlas 的核心假设是：如果在大规模无监督预训练阶段就让检索器和语言模型学会协作，模型将获得更强的少样本泛化能力。

##### 核心机制：四种检索器训练目标

Atlas 的关键创新在于设计了四种利用语言模型反馈来训练检索器的目标函数，使检索器学会检索"对语言模型最有帮助的文档"，而非仅仅是"语义最相似的文档"：

**1. Attention Distillation (ADist)**：利用 FiD 解码器对各文档编码的交叉注意力分数作为监督信号。直觉是：语言模型在生成答案时"更关注"哪个文档，说明该文档更有用。

$$p_{\text{ADist}}(d_k) = \frac{\text{CrossAttnScore}(d_k)}{\sum_{i=1}^{K} \text{CrossAttnScore}(d_i)}$$

> 💡 **关键**：ADist 的优势在于它直接反映了语言模型"实际使用"文档的方式（通过注意力权重），而非间接的困惑度信号。

**2. EMDR²（Expectation-Maximization with Document Retrieval）**：将文档视为隐变量，使用 EM 算法训练。E 步计算文档后验分布，M 步最大化边际似然的下界：

$$p(a|q) = \sum_{d \in \mathcal{D}} p_\theta(d|q) \cdot p_\phi(a|d,q)$$

检索器梯度通过 REINFORCE 估计器计算，以 top-k 文档的语言模型概率作为奖励信号。

**3. Perplexity Distillation (PDist)**：最简洁的方法——直接用每个文档带来的语言模型困惑度改善作为检索器的训练目标。将 LM 后验分布蒸馏到检索器分布：

$$p_{\text{PDist}}(d_k) = \frac{\exp(\log p_{LM}(a|d_k, q))}{\sum_{i=1}^{K} \exp(\log p_{LM}(a|d_i, q))}$$

然后最小化 \(\text{KL}(p_{\text{PDist}} \| p_{\text{retriever}})\)。PDist 在消融实验中表现最优（64-shot NQ 45.0%），因为它提供了最直接的"文档有用性"信号。

**4. Leave-One-Out Perplexity Distillation (LOOP)**：衡量移除某个文档后语言模型性能下降多少。如果移除文档 \(d_k\) 后困惑度显著上升，说明该文档至关重要：

$$p_{\text{LOOP}}(d_k) = \frac{\exp(-\log p_{LM}(a|\mathcal{D}_K \setminus \{d_k\}, q))}{\sum_{i=1}^{K} \exp(-\log p_{LM}(a|\mathcal{D}_K \setminus \{d_i\}, q))}$$

> ⚠️ **注意**：LOOP 计算成本最高（需要 K 次前向传播），但更忠实地反映了 FiD 的实际推理方式（同时使用多个文档），而 PDist/EMDR² 只单独评估每个文档。

##### 预训练任务设计

Atlas 在无监督语料（Wikipedia + CCNet，共 ~387M 段落）上进行联合预训练，探索了四种预训练任务：

| 预训练任务 | 输入 | 输出 | 64-shot NQ |
|:---|:---|:---|:---:|
| **Prefix LM** | 文本前半段 | 文本后半段 | 42.4% |
| **Masked LM** | 带 mask 的文本 | 被 mask 的 span | 42.7% |
| **Title-to-Section** | Wikipedia 标题 | 对应章节内容 | 41.1% |
| **Salient Span Masking** | 带 mask 的文本（mask 实体） | 被 mask 的实体 | — |

实验发现 Prefix LM 和 Masked LM 效果相当，均优于 Title-to-Section。关键发现是：**联合预训练至关重要**——不进行联合预训练的模型在 64-shot NQ 上仅 9.0%，而联合预训练后达到 42.4%（提升 33.4%）。

##### 索引更新与可更新性

Atlas 的一个重要特性是**知识可更新性**。由于知识存储在外部文档索引中而非模型参数中，只需替换索引即可更新模型知识：

- 使用时序匹配的 Wikipedia 索引（与 NQ 数据集同期的 2018 年 Wikipedia）可将 NQ 准确率从 60.4% 提升至 64.0%（+3.6%）
- 索引使用乘积量化（Product Quantization）压缩 5 倍后，性能几乎无损

##### 与传统方法的对比

| 特性 | Atlas | REALM | RAG | RETRO |
|:---|:---:|:---:|:---:|:---:|
| 联合预训练 | ✅ | ✅ | ❌ | 部分 |
| 检索器端到端训练 | ✅ | ✅ | ✅ | ❌（冻结） |
| 多文档融合 | FiD（多文档） | 单文档 | 单文档边际化 | 分块交叉注意力 |
| 索引动态更新 | ✅（异步重建） | ✅ | ✅ | ❌ |
| 少样本能力 | 极强 | 一般 | 一般 | 未评估 |

Atlas 的核心优势在于：(1) 使用 FiD 架构同时融合多个文档，信息利用更充分；(2) 四种检索器训练信号均来自语言模型反馈，形成闭环优化；(3) 大规模联合预训练赋予了极强的少样本泛化能力。

![Atlas 少样本学习性能](https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x2.png)
*图 2：Atlas 在 NaturalQuestions 和 TriviaQA 上的少样本学习曲线。Atlas-11B 在仅使用 64 个示例时即超越了 PaLM-540B 等超大模型。*

#### 🧪 练习题
```yaml
question: "Atlas 中 Perplexity Distillation (PDist) 训练检索器的核心思想是什么？"
options:
  - "利用 FiD 解码器的交叉注意力权重作为文档重要性信号"
  - "将每个文档带来的语言模型困惑度改善蒸馏为检索器的训练目标"
  - "通过移除单个文档观察语言模型性能下降来衡量文档重要性"
  - "使用 EM 算法将文档视为隐变量进行边际似然最大化"
answer: 1
explain: "PDist 直接计算每个文档条件下语言模型生成答案的对数概率，将该 LM 后验分布蒸馏到检索器分布中。选项 0 是 ADist，选项 2 是 LOOP，选项 3 是 EMDR²。"
```

### E5

```yaml
id: e5
num: 9
name: E5
full_name: E5文本嵌入 (Text Embeddings by Weakly-supervised Contrastive Pre-training)
year: '2022.12'
org: Microsoft
parent: contriever
paper_url: https://arxiv.org/abs/2212.03533
project_url: ''
category: foundation
motivation: 弱监督大规模预训练提升嵌入质量
```

#### 📝 一句话总结
E5 通过构建并过滤大规模弱监督文本对 CCPairs，再用双塔对比学习和少量有监督微调训练通用文本嵌入，使稠密向量在零样本检索与多任务 embedding 基准上显著提升。

#### 🎯 核心要点
- CCPairs 数据集：从 Reddit、StackExchange、Wikipedia、Scientific papers、Common Crawl/News 等半结构化来源挖掘约 1.3B 文本对
- 一致性过滤：先在噪声文本对上训练模型，再只保留正例能在 1M 随机 passage 池中排到 top-2 的样本，得到约 270M 高质量文本对
- 简单双塔架构：query 与 passage 使用共享 Transformer 编码器，输出层平均池化得到单向量 embedding
- 角色前缀：用 `query:` 与 `passage:` 打破双塔对称性，适配非对称检索任务
- InfoNCE 预训练：使用余弦相似度除以温度 \(\tau=0.01\)，并依赖大 batch in-batch negatives
- 大 batch 是关键：预训练 batch size 设为 32,768，为每个 query 提供大量负例
- 二阶段训练：先用 CCPairs 弱监督对比预训练，再用 NLI、MS-MARCO、NQ、硬负例和 cross-encoder 蒸馏做监督微调

#### 🔬 深入细节
![E5 数据构建与训练流程图](https://arxiv.org/html/2212.03533v2/x1.png)
*图：E5 的 CCPairs 数据构建、过滤、对比预训练与有监督微调整体流程。*

```python
# E5 弱监督对比预训练与监督微调伪代码
def build_ccpairs(raw_sources, first_stage_encoder):
    noisy_pairs = harvest_pairs(raw_sources)          # ~1.3B pairs
    filtered_pairs = []
    random_pool = sample_passages(size=1_000_000)

    for q, p in noisy_pairs:
        rank = rank_positive_among_pool(first_stage_encoder, q, p, random_pool)
        if rank <= 2:
            filtered_pairs.append((q, p))             # ~270M pairs
    return filtered_pairs


def contrastive_pretrain(encoder, ccpairs, batch_size=32768, tau=0.01):
    for queries, passages in batches(ccpairs, batch_size):
        q_emb = mean_pool(encoder(prefix("query: ", queries)))
        p_emb = mean_pool(encoder(prefix("passage: ", passages)))
        scores = cosine_similarity_matrix(q_emb, p_emb) / tau
        labels = arange(len(queries))                 # 对角线为正例
        loss = cross_entropy(scores, labels)
        update(encoder, loss)


def supervised_finetune(encoder, labeled_sets, ce_teacher, alpha):
    for query, positive, hard_negatives in labeled_sets:
        candidates = [positive] + hard_negatives
        stu_scores = bi_encoder_scores(encoder, query, candidates)
        ce_scores = ce_teacher.score(query, candidates)
        loss = kl_divergence(softmax(ce_scores), softmax(stu_scores))
        loss += alpha * contrastive_loss(stu_scores, positive_index=0)
        update(encoder, loss)
```

E5 的核心判断是：通用文本嵌入的瓶颈不一定是架构，而是训练对的规模、多样性和噪声控制。论文没有设计复杂的多塔或交互式 encoder，而是从五类网络半结构化数据中挖掘自然形成的 \((q,p)\) 关系，例如问题与高赞回答、实体名与百科段落、论文标题与摘要、网页标题与正文等。这些弱监督关系覆盖问答、实体描述、主题相关和语义相似等多种 embedding 需求。

原始 1.3B 文本对噪声很高，因此 E5 使用 consistency-based filter。具体做法是先用噪声数据训练一个初始 embedding 模型，再把每个候选正例 \(p\) 放入 1M 随机 passage 池中排序；只有当模型能把真实配对排到 top-\(k\) 内时才保留，论文设置 \(k=2\)。这个过滤的直觉是：干净弱标签会先被模型学会，而随机或错配文本对很难在大候选池中保持高排名。

预训练目标是标准 InfoNCE。给定文本对集合 \(\{(q_i,p_i)\}_{i=1}^{n}\) 和负例 \(\{p^-_{ij}\}_{j=1}^{m}\)，损失为：

$$
\mathcal{L}_{cont}
=-\frac{1}{n}\sum_i
\log
\frac{\exp(s_{\theta}(q_i,p_i))}
{\exp(s_{\theta}(q_i,p_i))+\sum_j \exp(s_{\theta}(q_i,p^-_{ij}))}.
$$

其中 \(s_{\theta}(q,p)=\cos(\mathbf{E}_q,\mathbf{E}_p)/\tau\)，\(\tau=0.01\)。E5 使用共享 Transformer encoder 并做 mean pooling，query 和 passage 的区别主要通过文本前缀体现：`query:` 表示查询语义，`passage:` 表示待检索文本语义。这个小设计很重要，因为检索常常是非对称任务，查询短而意图明确，文档长且信息密集。

负例策略上，E5 选择大 batch 的 in-batch negatives，而不是复杂的 memory bank 或 pre-batch 机制。batch size 32,768 意味着一个 query 在同一批次内能看到大量其他 passage 作为负例，模型必须学习更细粒度的语义边界。论文消融显示，batch size 从 1K 增至 32K 会带来稳定提升，这解释了为什么 E5 的方法看似简单但训练资源要求并不低。

第二阶段微调把弱监督预训练得到的通用语义空间推向标注任务。E5 使用 NLI 改善语义相似与分类相关能力，用 MS-MARCO 和 NQ 改善检索能力，并为 MS-MARCO/NQ 加入硬负例与 cross-encoder teacher 分数。微调目标可写为：

$$
\mathcal{L}_{ft}
=D_{\mathrm{KL}}(p_{\mathrm{ce}},p_{\mathrm{stu}})
+\alpha \mathcal{L}_{cont},
$$

其中 \(p_{\mathrm{ce}}\) 来自 cross-encoder teacher，\(p_{\mathrm{stu}}\) 来自 E5 bi-encoder。cross-encoder 更慢但能精细比较 query-candidate，bi-encoder 更快但交互弱；蒸馏让 E5 在保持向量检索效率的同时学习 teacher 的排序偏好。

与 Contriever 这类从裁剪文本构造正例的无监督方法相比，E5 的正例来自真实网络结构，语义关系更自然；与只在 MS-MARCO 上微调的 dense retriever 相比，E5 在预训练阶段已经学到跨任务的通用匹配能力。因此 E5 可以作为 RAG 检索器、语义搜索、聚类和分类的通用 embedding backbone，而不是只服务单一检索数据集。

#### 🧪 练习题
```yaml
question: "E5 中 `query:` 和 `passage:` 前缀的主要目的是什么？"
options:
  - "区分查询和文档的语义角色，帮助共享编码器适配非对称检索"
  - "把英文输入翻译成中文"
  - "强制模型只使用 BM25 分数"
  - "替代 InfoNCE 损失中的温度参数"
answer: 0
explain: "E5 使用同一个 encoder 编码 query 和 passage，前缀用于向模型显式标记输入角色，尤其适合查询短、文档长的检索场景。"
```

### HyDE

```yaml
id: hyde
num: 10
name: HyDE
full_name: 假设性文档嵌入 (Hypothetical Document Embeddings)
year: '2022.12'
org: CMU
parent: dpr
paper_url: https://arxiv.org/abs/2212.10496
project_url: ''
category: foundation
motivation: LLM生成虚构答案再检索，答案-答案匹配提升对齐
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

### FLARE

```yaml
id: flare
num: 11
name: FLARE
full_name: 前瞻性主动检索 (Forward-Looking Active Retrieval)
year: '2023.05'
org: CMU
parent: rag
paper_url: https://arxiv.org/abs/2305.06983
project_url: ''
category: architecture
motivation: 低置信度Token触发检索，主动式知识增强
```

#### 📝 一句话总结
FLARE 提出 Forward-Looking Active Retrieval：先临时生成下一句，再用低置信度 token 判断是否检索，并把前瞻句改写成查询来重新生成，解决长文本生成中固定检索过度或单次检索不足的问题。

#### 🎯 核心要点
- **主动检索框架**：把 RAG 从“输入前检索一次”扩展为生成过程中的动态检索。
- **低置信触发**：当临时句中存在概率低于阈值 \(\theta\) 的 token 时触发检索。
- **前瞻式查询**：用即将生成的下一句，而不是已生成历史，表达当前知识缺口。
- **两种查询策略**：FLARE_direct 掩码低置信 token 后直接检索，FLARE_instruct 让 LM 生成显式搜索查询。
- **免训练部署**：只需要语言模型 logprobs 和外部检索器，不要求额外训练检索策略。
- **评测任务**：在 2WikiMQA、StrategyQA、ASQA、WikiAsp 等长文本知识密集任务上验证效果。

#### 🔬 深入细节
![FLARE 工作流程](https://ar5iv.labs.arxiv.org/html/2305.06983/assets/x2.png)

*图源：ar5iv 论文图 2，展示 FLARE 先预测下一句、检测低置信 token、检索并重新生成的循环。*

```python
def flare_generate(question, lm, retriever, theta=0.5, top_k=5):
    answer = ""
    evidence = []
    while not lm.finished(answer):
        draft, token_probs = lm.generate_next_sentence(question, answer, evidence)

        if min(token_probs) < theta:
            query = mask_low_confidence_tokens(draft, token_probs, theta)
            docs = retriever.search(query, top_k=top_k)
            evidence.extend(docs)
            sentence = lm.regenerate_sentence(question, answer, evidence)
        else:
            sentence = draft

        answer += sentence
    return answer
```

FLARE 的动机来自长文本生成的动态信息需求。传统 RAG 往往在用户问题到来时检索一次，这适合答案集中在少数段落的场景；但长答案会逐句展开，模型在后续句子中才暴露新的实体、时间或事件需求。固定每句检索虽然能覆盖这些需求，却会把无关文档频繁塞进上下文，增加成本并放大噪声。

核心机制是把模型自身的 token 概率当作不确定性信号。给定临时下一句 \(\hat{s}_t=[w_1,\dots,w_n]\)，FLARE 用如下条件判断是否检索：

$$
\operatorname{Retrieve}(\hat{s}_t)=\mathbb{1}\left[\exists i,\ p(w_i\mid x,y_{<t}) < \theta\right].
$$

这里的直觉很直接：如果模型对下一句中的某些 token 信心不足，说明它可能正在凭参数记忆猜测事实；此时用外部证据重新约束生成，比等错误写进答案后再补救更有效。

查询构造体现了“forward-looking”的关键差异。回顾式检索使用已经生成的文本，容易检索到上一段话的主题；FLARE 使用临时下一句表达即将写出的内容，更贴近当前缺口。FLARE_direct 会删除或掩码低置信 token，避免错误 token 污染检索；FLARE_instruct 则让 LM 根据问题和生成历史写出搜索查询，适合复杂推理任务。

推理流程是句级闭环：生成草稿、检查置信度、必要时检索、基于证据重写这一句，然后进入下一句。它与 Self-RAG 的区别是 FLARE 不训练反射 token，而是使用现成模型的 logprob；代价是它依赖可访问 token 概率的模型接口，并且阈值 \(\theta\) 需要按任务调节。

#### 🧪 练习题
```yaml
question: "FLARE 为什么用临时生成的下一句作为检索查询？"
options:
  - "因为下一句通常比用户问题更短，能减少检索器参数量"
  - "因为下一句直接暴露即将生成内容的知识缺口，更能匹配当前检索需求"
  - "因为下一句可以替代语言模型的最终答案"
  - "因为下一句一定包含所有证据引用"
answer: 1
explain: "FLARE 的前瞻式查询利用草稿句预测未来内容，在低置信位置触发检索，从而在错误写入答案前补充证据。"
```

### RECOMP

```yaml
id: recomp
num: 12
name: RECOMP
full_name: 检索内容压缩 (Retrieval-Augmented LMs with Compression)
year: '2023.10'
org: Princeton
parent: rag
paper_url: https://arxiv.org/abs/2310.04444
project_url: ''
category: architecture
motivation: 训练专门压缩器将多文档浓缩为极简摘要
```

#### 📝 一句话总结
RECOMP 在检索和生成之间插入专门的压缩器，把多篇检索文档压缩成面向任务的短摘要，解决 RAG 上下文过长、无关证据干扰和推理成本过高的问题。

#### 🎯 核心要点
- **实际论文页**：manifest 中 `2310.04444` 指向无关提示控制论文，RECOMP 实际公开论文为 `https://arxiv.org/abs/2310.04408`。
- **Retrieve-Compress-Prepend**：先检索文档，再压缩成摘要，最后把摘要而非全文拼接给 LM。
- **抽取式压缩器**：训练双编码器按任务收益选择最有帮助的句子。
- **生成式压缩器**：蒸馏大模型的 query-focused summarization 能力，生成跨文档摘要。
- **选择性增强**：如果检索结果无帮助，压缩器可以输出空串，避免错误或无关上下文污染 LM。
- **端任务信号训练**：压缩目标不是普通摘要质量，而是摘要拼接后能否提升 LM 的语言建模或 QA 表现。

#### 🔬 深入细节
![RECOMP 流程图](https://ar5iv.labs.arxiv.org/html/2310.04408/assets/x1.png)

*图源：ar5iv 论文图 1，展示 RECOMP 将检索文档压缩为短摘要后再送入语言模型。*

```python
def recomp_answer(query, retriever, compressor, lm, corpus):
    docs = retriever.search(query, corpus, top_k=5)
    summary = compressor.compress(query=query, documents=docs)

    # selective augmentation: 无帮助时允许不增强
    if summary.strip():
        prompt = summary + "\n\nQuestion: " + query
    else:
        prompt = "Question: " + query

    return lm.generate(prompt)

def train_abstractive_compressor(train_examples, teacher_lm, base_lm):
    targets = []
    for query, docs, gold in train_examples:
        summaries = [teacher_lm.summarize(query, docs, p) for p in prompt_pool]
        best = max(summaries, key=lambda s: score(base_lm, s, query, gold))
        if score(base_lm, best, query, gold) < score(base_lm, "", query, gold):
            best = ""
        targets.append((query, docs, best))
    return finetune_encoder_decoder(targets)
```

RECOMP 的问题设定很现实：RAG 检索到的文档通常有数百到数千 token，直接拼接会让推理成本随检索文档长度线性上涨；更糟的是，模型并不总能从长上下文中找到关键句，甚至会被中间位置或无关文档干扰。RECOMP 因此把检索文档 \(D=[d_1,\dots,d_N]\) 压缩为短摘要 \(s=c_\theta(x,D)\)，再让黑盒 LM 生成 \(p(y\mid x,s)\)。

抽取式压缩器把每个候选句子和查询分别编码，用内积估计“把这个句子放进 prompt 后是否有助于 LM 生成目标答案”。它与普通 reranker 的差异是粒度更细：检索器通常返回段落，RECOMP 的抽取器返回句子；评分依据也不是句子与问题的语义相似度，而是句子对下游 LM 生成正确输出的因果贡献。

生成式压缩器面向多文档综合。论文用强教师模型为每组 \((x,D,y)\) 产生多个 query-focused 摘要，再用端任务分数过滤：如果某个摘要比无检索更差，就把目标摘要设为空串。这个“空串目标”是选择性增强的关键，它让压缩器学会在检索无用时保持沉默，而不是为了形式完整强行写摘要。

与 Long Context LM 或直接 top-k 文档拼接相比，RECOMP 的优势是把信息瓶颈显式放在一个小模型里。它减少 token 成本，也降低 LM 在无关证据上浪费注意力的概率；局限是压缩器可能丢掉后续推理需要的细节，因此更适合答案证据可被短文本表达的 QA、语言建模和事实补全任务。

#### 🧪 练习题
```yaml
question: "RECOMP 中选择性增强的含义是什么？"
options:
  - "只检索图片，不检索文本"
  - "当检索文档无帮助时，压缩器可以输出空摘要，避免拼接噪声"
  - "把所有检索文档完整复制到 prompt"
  - "只使用最大的语言模型作为检索器"
answer: 1
explain: "RECOMP 的压缩器以端任务收益为目标训练；如果摘要会降低 LM 表现，训练目标可以设为空串。"
```

### Self-RAG

```yaml
id: self_rag
num: 13
name: Self-RAG
full_name: 自我反思检索增强生成 (Self-Reflective Retrieval-Augmented Generation)
year: '2024.03'
org: University of Washington
parent: rag
paper_url: https://arxiv.org/abs/2310.11511
project_url: ''
category: architecture
motivation: 反射Token自主决策检索时机并批判结果事实性
```

#### 📝 一句话总结
Self-RAG 训练语言模型生成特殊反射 token，让模型在推理时自主决定是否检索，并评价检索段落相关性、回答是否被支持以及输出是否有用，从而把检索控制和事实性批判内化到一个生成模型中。

#### 🎯 核心要点
- **四类反射 token**：Retrieve、IsRel、IsSup、IsUse 分别控制检索、相关性、证据支持和效用评分。
- **Critic 蒸馏**：先用 GPT-4 标注反射信号，再训练 Critic 为大规模语料自动插入 token。
- **标准 LM 训练**：Generator 在带反射 token 的语料上做 next-token prediction，无需 RL。
- **按需检索**：推理时由 Retrieve token 概率决定是否调用检索器，而不是固定检索。
- **候选证据重排**：对多个检索段落并行生成候选片段，再用 IsRel/IsSup/IsUse 加权选优。
- **可控解码**：推理阶段可调节不同 critique 权重，在引用精度、事实性和流畅度之间取舍。

#### 🔬 深入细节
![Self-RAG 框架](https://ar5iv.labs.arxiv.org/html/2310.11511/assets/x1.png)

*图源：ar5iv 论文图 1，展示 Self-RAG 通过 Retrieve 和 critique token 控制检索与自我评估。*

```python
def self_rag(query, generator, retriever, threshold=0.2, top_k=5):
    output = []
    while not generator.done(output):
        p_retrieve = generator.prob("[Retrieve]", query, output)

        if p_retrieve > threshold:
            passages = retriever.search(query, top_k=top_k)
            candidates = []
            for passage in passages:
                text, rel, sup, use = generator.generate_with_reflection(
                    query=query,
                    prefix=output,
                    passage=passage,
                )
                score = (
                    generator.logprob(text)
                    + score_relevance(rel)
                    + score_support(sup)
                    + 0.5 * score_utility(use)
                )
                candidates.append((score, text))
            output.append(max(candidates)[1])
        else:
            output.append(generator.generate_without_retrieval(query, output))

    return "".join(output)
```

Self-RAG 针对传统 RAG 的两个缺陷：第一，固定检索会让简单常识问题也携带外部文档，降低模型灵活性；第二，检索到文档后，模型通常缺少显式机制判断文档是否相关、答案是否被证据支持。Self-RAG 的做法不是外接多个分类器，而是把这些判断变成模型可生成的离散 token。

训练流程分为 Critic 和 Generator 两步。Critic 先学习 GPT-4 对检索必要性、段落相关性、证据支持度和输出效用的判断，然后离线标注训练样本。Generator 的词表加入这些反射 token，在标注语料上直接优化：

$$
\max_\theta \sum_t \log p_\theta(y_t \mid x, y_{<t}),
$$

其中 \(y_t\) 既可以是普通文本，也可以是 `[Retrieve]`、`[IsRel]`、`[IsSup]`、`[IsUse]` 等控制 token。

推理时，Retrieve token 决定是否检索；如果需要检索，模型对每个候选段落生成回答片段及 critique token。最终分数可写成：

$$
S(y,d)=\log p_\theta(y\mid x,d)+w_rR_{\text{rel}}+w_sR_{\text{sup}}+w_uR_{\text{use}}.
$$

这让 Self-RAG 在解码阶段能偏好“相关、被支持、有用”的片段，而不是只看语言模型概率。

与 FLARE 依赖 logprob 阈值不同，Self-RAG 通过训练显式学会何时检索和如何批判证据，因此不需要人工设计低置信规则；代价是需要构造反射 token 标注和训练 Generator。它适合事实性要求高、需要引用或长答案分段生成的场景。

#### 🧪 练习题
```yaml
question: "Self-RAG 的 IsSup token 主要用于判断什么？"
options:
  - "是否需要扩大模型参数量"
  - "生成内容是否被检索证据支持"
  - "检索器是否使用 BM25"
  - "输出文本是否需要翻译"
answer: 1
explain: "IsSup 是证据支持度反射 token，用来批判生成片段是否能从检索段落中得到支撑。"
```

### CRAG

```yaml
id: crag
num: 14
name: CRAG
full_name: 纠正式检索增强生成 (Corrective Retrieval Augmented Generation)
year: '2024.01'
org: Salesforce
parent: self_rag
paper_url: https://arxiv.org/abs/2401.15884
project_url: ''
category: architecture
motivation: 检索评估器判断质量，低质时触发Web搜索补充
```

#### 📝 一句话总结
CRAG 提出了一种即插即用的纠正性检索增强生成框架，通过轻量级检索评估器判断检索文档的质量置信度，并根据置信度触发三种差异化纠正动作（直接精炼、Web搜索补充、两者结合），从而显著提升 RAG 系统在检索质量不可靠时的生成鲁棒性。

#### 🎯 核心要点
- **检索评估器**：基于 T5-large 微调的轻量级评估器，对每个 (query, document) 对打分，估计检索文档与查询的相关性置信度
- **三种触发动作**：根据置信度得分将检索结果分为 Correct（至少一篇高于上阈值）、Incorrect（全部低于下阈值）、Ambiguous（介于两者之间），分别触发不同的知识处理策略
- **知识精炼操作**：将文档分解为细粒度知识条（knowledge strips），逐条用评估器过滤无关信息，重组为精炼后的知识
- **Web 搜索增强**：当检索结果不可靠时，利用 ChatGPT 重写查询关键词，通过 Google Search API 获取补充知识
- **即插即用设计**：可无缝集成到标准 RAG 和 Self-RAG 等现有框架中，无需修改底层 LLM
- **评估基准**：在 PopQA、Biography、PubHealth、Arc-Challenge 四个数据集上验证，覆盖短文本生成、长文本生成和封闭集任务

#### 🔬 深入细节
##### 框架总览

![CRAG 框架总览图](https://arxiv.org/html/2401.15884v2/x2.png)
*图：CRAG 整体框架。检索评估器评估文档质量后触发三种动作：Correct 时精炼文档、Incorrect 时触发 Web 搜索、Ambiguous 时两者结合。*

![检索质量问题示例](https://arxiv.org/html/2401.15884v2/x1.png)
*图：检索增强生成中的典型问题示例。即使是相关文档也可能包含大量无关信息（左），而不相关文档则会直接误导生成（右）。*

##### 算法伪代码

```python
# CRAG 核心流程伪代码
def CRAG(query, retrieved_docs, generator):
    # Step 1: 检索评估 — 对每篇文档评估相关性
    scores = [retrieval_evaluator(query, doc) for doc in retrieved_docs]
    confidence = aggregate_confidence(scores)
    
    # Step 2: 触发动作
    if confidence == CORRECT:  # 至少一篇文档高度相关
        # 精炼内部知识：分解→过滤→重组
        knowledge = refine_documents(query, retrieved_docs, scores)
    
    elif confidence == INCORRECT:  # 所有文档均不相关
        # 触发 Web 搜索获取外部知识
        rewritten_query = rewrite_query_with_llm(query)  # ChatGPT 重写
        web_results = google_search(rewritten_query)
        knowledge = refine_documents(query, web_results)
    
    elif confidence == AMBIGUOUS:  # 不确定
        # 同时使用精炼后的内部知识 + Web 搜索知识
        internal_knowledge = refine_documents(query, retrieved_docs, scores)
        rewritten_query = rewrite_query_with_llm(query)
        web_results = google_search(rewritten_query)
        external_knowledge = refine_documents(query, web_results)
        knowledge = combine(internal_knowledge, external_knowledge)
    
    # Step 3: 生成
    output = generator(query, knowledge)
    return output

def refine_documents(query, docs, scores=None):
    """知识精炼：分解→过滤→重组"""
    all_strips = []
    for doc in docs:
        # 将文档分解为细粒度知识条
        strips = decompose_into_strips(doc)
        # 用评估器逐条过滤
        relevant_strips = [s for s in strips 
                          if retrieval_evaluator(query, s) > threshold]
        all_strips.extend(relevant_strips)
    # 重组为连贯知识
    return recompose(all_strips)
```

##### 动机与背景

检索增强生成（RAG）通过引入外部知识来缓解大语言模型的幻觉问题，但其核心假设是"检索到的文档是相关且有用的"。然而在实际场景中，这一假设经常不成立：

1. **检索器本身不完美**：即使是最先进的检索器也无法保证每次都返回高质量相关文档，尤其在长尾知识和复杂查询场景下
2. **相关文档中的噪声**：即使文档整体相关，其中也可能包含大量与查询无关的冗余信息，这些噪声会干扰生成质量
3. **不相关文档的误导**：当检索到完全不相关的文档时，LLM 可能被错误信息误导，产生比无检索时更严重的幻觉

> 💡 关键洞察：现有 RAG 方法对检索结果"照单全收"，缺乏对检索质量的评估和纠正机制。CRAG 的核心思想是在检索和生成之间插入一个"质量检查站"，根据检索质量动态调整知识来源。

##### 核心机制详解

**1. 检索评估器（Retrieval Evaluator）**

CRAG 使用基于 T5-large 微调的轻量级评估器来估计检索文档的质量。对于每个 query \(x\) 和检索到的文档 \(d\)，评估器输出一个置信度得分：

$$\text{score} = \text{Evaluator}(x, d) \in [-1, 1]$$

评估器的训练数据来自现有数据集的正负样本对，正样本为包含正确答案的文档，负样本通过 BM25/DPR 检索的不相关文档构造。

> ⚠️ 注意：实验表明，这个轻量级 T5-based 评估器的准确率达到 84.3%，显著优于 ChatGPT（58.0%）、ChatGPT-CoT（62.4%）和 ChatGPT-few-shot（64.7%），说明针对性微调的小模型在特定任务上可以超越通用大模型。

**2. 置信度触发机制（Confidence-based Action Triggering）**

基于评估器的得分，CRAG 设定上下两个阈值，将检索结果分为三类：

- **Correct**（\(\exists\, d_i: \text{score}(d_i) > \tau_{\text{upper}}\)）：至少有一篇文档高度相关，对相关文档进行知识精炼后直接使用
- **Incorrect**（\(\forall\, d_i: \text{score}(d_i) < \tau_{\text{lower}}\)）：所有文档均不相关，丢弃检索结果，转而通过 Web 搜索获取新知识
- **Ambiguous**（其他情况）：检索质量不确定，同时使用精炼后的检索文档和 Web 搜索结果

这种三级触发机制比简单的二元判断（相关/不相关）更加灵活，能够更好地处理边界情况。

**3. 知识精炼（Knowledge Refinement）**

这是 CRAG 处理"相关文档中噪声"问题的核心操作。即使文档被判定为相关，其中仍可能包含大量无关信息。精炼过程包括三步：

- **分解（Decompose）**：将每篇文档分解为细粒度的知识条（knowledge strips），每条包含一个独立的信息单元
- **过滤（Filter）**：用检索评估器对每条知识条重新评分，过滤掉与查询不相关的条目
- **重组（Recompose）**：将保留的相关知识条串联重组为连贯的知识文本

> 💡 关键：这种"先拆后滤再组"的策略将文档级别的粗粒度相关性判断细化为条目级别的精细过滤，有效去除了文档内部的噪声信息。

**4. Web 搜索增强（Web Search Augmentation）**

当检索结果被判定为 Incorrect 或 Ambiguous 时，CRAG 启动 Web 搜索流程：

- **查询重写**：使用 ChatGPT 将原始自然语言查询重写为更适合搜索引擎的关键词查询（例如将 "Who is the spouse of XXX?" 重写为 "XXX spouse"）
- **搜索执行**：通过 Google Search API 获取 Web 页面
- **知识选择**：对搜索结果应用与内部文档相同的精炼流程，过滤无关内容

##### 与传统方法的区别

| 特性 | 标准 RAG | Self-RAG | CRAG |
|------|---------|---------|------|
| 检索质量评估 | ❌ 无 | ✅ 通过反思 token | ✅ 专用评估器 |
| 纠正机制 | ❌ 无 | 部分（可选择不使用检索） | ✅ 三级动作触发 |
| 文档精炼 | ❌ 无 | ❌ 无 | ✅ 条目级过滤 |
| 外部知识补充 | ❌ 无 | ❌ 无 | ✅ Web 搜索 |
| 对 LLM 的要求 | 无特殊要求 | 需要专门指令微调 | 无特殊要求（即插即用） |
| 更换 LLM | 简单 | 需重新微调 | 简单 |

> 💡 关键优势：Self-RAG 需要在 LLM 中嵌入反思 token 并进行专门的指令微调，这限制了其灵活性。当底层 LLM 从 SelfRAG-LLaMA2-7b 更换为普通 LLaMA2-hf-7b 时，Self-RAG 性能大幅下降甚至不如标准 RAG，而 CRAG 仍保持竞争力。

##### 实验结果

在四个基准数据集上的主要结果（基于 SelfRAG-LLaMA2-7b）：

| 方法 | PopQA (Acc) | Biography (FactScore) | PubHealth (Acc) | Arc-Challenge (Acc) |
|------|------------|----------------------|-----------------|---------------------|
| Self-RAG | 54.9 | 81.2 | 72.4 | 67.2 |
| Self-CRAG | **61.8** | **86.2** | **74.8** | 67.2 |
| 提升 | +6.9 | +5.0 | +2.4 | — |

消融实验（PopQA，SelfRAG-LLaMA2-7b）表明每个组件都不可或缺：
- 移除 Correct 动作：61.8 → 59.6（-2.2）
- 移除 Incorrect 动作：61.8 → 60.8（-1.0）
- 移除文档精炼：61.8 → 52.2（-9.6，影响最大）
- 移除查询重写：61.8 → 58.4（-3.4）

#### 🧪 练习题
```yaml
question: "当 CRAG 的检索评估器判定所有检索文档均不相关（Incorrect）时，系统会采取什么动作？"
options:
  - "直接使用原始检索文档生成回答"
  - "对检索文档进行知识精炼后使用"
  - "丢弃检索结果，通过 Web 搜索获取新的外部知识"
  - "将查询拆分为多个子查询重新检索"
answer: 2
explain: "当所有文档的置信度得分均低于下阈值时，CRAG 判定为 Incorrect，会完全丢弃不可靠的检索结果，转而通过重写查询并调用 Web 搜索来获取新的外部知识作为生成依据。"
```

### GraphRAG

```yaml
id: graphrag
num: 15
name: GraphRAG
full_name: 图谱检索增强生成 (Graph Retrieval-Augmented Generation)
year: '2024.02'
org: Microsoft Research
parent: rag
paper_url: https://arxiv.org/abs/2404.16130
project_url: ''
category: architecture
motivation: 知识图谱全局关系推理，解决跨文档总结难题
```

#### 📝 一句话总结
GraphRAG 用 LLM 从私有语料中抽取实体、关系和声明，构建图索引并预生成社区摘要，再用 map-reduce 式查询聚合回答全局问题，解决向量 RAG 难以回答“整个语料主题是什么”这类跨文档总结问题。

#### 🎯 核心要点
- **图索引构建**：从文本块中抽取 entity、relationship、claim，并汇总为图元素描述。
- **社区检测**：用 Leiden 等算法把实体图划分为层级社区。
- **社区摘要**：为每个社区预生成 report-like summary，形成可复用的全局语料记忆。
- **全局查询流程**：每个社区摘要先独立回答问题，再把相关中间答案汇总成最终回答。
- **目标场景**：面向 global sensemaking 和 query-focused summarization，而不是单段事实查找。
- **优势与成本**：提升答案全面性和多样性，但索引阶段需要较多 LLM 抽取与摘要调用。

#### 🔬 深入细节
![GraphRAG 社区结构示意](https://ar5iv.labs.arxiv.org/html/2404.16130/assets/Level0Multihop.jpg)

*图源：ar5iv 论文图 3 的 Level 0 社区可视化，展示 GraphRAG 将实体图划分为可摘要的社区。*

```python
def build_graphrag_index(documents, llm):
    chunks = split_documents(documents, chunk_size=600)
    graph = Graph()
    for chunk in chunks:
        entities, relations, claims = llm.extract_graph_elements(chunk)
        graph.add_entities(entities)
        graph.add_relations(relations)
        graph.add_claims(claims)

    graph.merge_and_summarize_elements(llm)
    communities = leiden_hierarchy(graph)
    reports = {}
    for level, groups in communities.items():
        for group in groups:
            reports[(level, group.id)] = llm.summarize_community(group)
    return graph, reports

def global_search(query, community_reports, llm, token_budget):
    partials = []
    for batch in pack_reports(community_reports, token_budget):
        answer, helpfulness = llm.answer_from_reports(query, batch)
        if helpfulness > 0:
            partials.append((helpfulness, answer))
    context = select_by_score(partials, token_budget)
    return llm.reduce_answers(query, context)
```

GraphRAG 的核心判断是：普通向量 RAG 擅长找到“局部答案所在段落”，但不擅长回答需要全语料综合的问题。例如“这个数据集中有哪些主要主题？”没有单个 chunk 能代表答案，语义检索很容易只召回几个局部片段。GraphRAG 把任务改写为 query-focused summarization，通过图社区覆盖整个语料。

索引阶段先由 LLM 从每个 chunk 抽取实体、关系和声明。与传统知识图谱追求严格三元组不同，GraphRAG 更强调 LLM 可读的丰富描述：节点和边都带自然语言摘要，claim 也可以作为 covariate 附着到实体上。这样即便抽取结果有命名不一致，后续社区摘要仍能把同一主题附近的信息聚合起来。

社区检测利用图的模块性。GraphRAG 把实体关系图看成无向加权图，边权通常来自关系实例计数或强度，再用 Leiden 得到层级社区。每个社区覆盖一组强相关实体、关系和声明；社区摘要相当于把局部子图压缩成可检索、可阅读的全局记忆。

查询阶段是 map-reduce：map 步骤让每个社区摘要独立回答问题并给出有用度分数，reduce 步骤按分数选择中间答案并生成最终回答。这样做的优势是并行、可扩展，并且避免把整个语料塞进单个上下文；不足是索引成本较高，而且社区摘要质量受 LLM 抽取和社区划分影响。

#### 🧪 练习题
```yaml
question: "GraphRAG 相比普通向量 RAG 最适合解决哪类问题？"
options:
  - "只需要查找单个精确事实的短问题"
  - "需要综合整个语料主题和跨文档关系的全局问题"
  - "只需要图像分类的问题"
  - "完全不需要外部知识的问题"
answer: 1
explain: "GraphRAG 的社区摘要和 map-reduce 查询专门面向全局 sensemaking，弥补单 chunk 语义检索的覆盖不足。"
```

### LLMLingua

```yaml
id: llmlingua
num: 16
name: LLMLingua
full_name: LLM语言压缩 (LLMLingua Prompt Compression)
year: '2024.01'
org: Microsoft Research
parent: rag
paper_url: https://arxiv.org/abs/2310.05736
project_url: ''
category: architecture
motivation: 基于困惑度剔除冗余Token，20倍压缩不损性能
```

#### 📝 一句话总结
LLMLingua 提出了一种**由粗到细的 Prompt 压缩方法**，利用小型语言模型的困惑度（Perplexity）信号，通过预算控制器、迭代式 Token 级压缩和分布对齐三大组件，在最高 20 倍压缩率下几乎不损失大语言模型的推理性能，显著降低 API 调用成本与延迟。

#### 🎯 核心要点
- **三阶段由粗到细压缩框架**：Budget Controller（粗粒度 Demonstration 级）→ Iterative Token-level Prompt Compression（细粒度 Token 级）→ Distribution Alignment（小模型与 LLM 对齐）
- **Budget Controller**：根据 Prompt 各组件（Instruction / Demonstrations / Question）的重要性差异，动态分配不同压缩比；对冗余 Demonstrations 执行整条删除的粗粒度压缩
- **迭代式 Token 级压缩（ITPC）**：将 Prompt 分段后逐段计算条件概率，前段压缩结果拼接到后段上下文，缓解独立性假设带来的信息丢失
- **分布对齐**：用 LLM 生成的数据对小模型做指令微调，缩小小模型与目标 LLM 之间的 Token 概率分布差距
- **小模型选择**：GPT-2-Alpaca（117M）或 Alpaca-7B 作为压缩代理模型 \(\mathcal{M}_s\)
- **评估覆盖四大场景**：推理（GSM8K）、ICL（BBH）、对话（ShareGPT）、摘要（Arxiv-March23），目标 LLM 为 GPT-3.5-Turbo 和 Claude-v1.3
- **核心结论**：在 GSM8K 上 9 倍压缩仅损失 1.5% 准确率；在 BBH 上 10 倍压缩性能持平甚至略优于原始 Prompt

#### 🔬 深入细节
![LLMLingua 框架总览](https://ar5iv.labs.arxiv.org/html/2310.05736/assets/x1.png)
*图：LLMLingua 的由粗到细压缩框架。左侧为 Budget Controller 进行 Demonstration 级筛选，中间为迭代式 Token 级压缩（ITPC），右侧为分布对齐模块。*

---

##### 动机与背景

随着 Chain-of-Thought、In-Context Learning 和 RAG 等技术的广泛应用，输入给 LLM 的 Prompt 越来越长，甚至超过数万 Token。这带来了两个核心问题：

1. **推理成本高**：API 按 Token 计费，长 Prompt 直接增加费用和延迟。
2. **上下文窗口受限**：超出模型最大上下文长度的内容会被截断，导致信息丢失。

已有的模型压缩方法（量化、剪枝）需要修改模型参数，不适用于只能通过 API 访问的黑盒 LLM。而自然语言本身具有冗余性（Shannon, 1951），因此可以在 **Prompt 层面** 进行无损或近无损压缩。

> 💡 关键：LLMLingua 的核心洞察是——**Token 的困惑度（Perplexity）反映其信息量**。低困惑度的 Token 对模型来说是"可预测的"，因此可以安全删除；高困惑度的 Token 携带关键信息，必须保留。

---

##### 核心机制一：Budget Controller（预算控制器）

Budget Controller 解决的问题是：**在高压缩率下，如何合理分配各部分的压缩预算？**

一个典型的 Prompt 由三部分组成：

$$\bm{x} = (\bm{x}^{\text{ins}}, \bm{x}^{\text{dems}}, \bm{x}^{\text{que}})$$

其中 Instruction 和 Question 对生成结果影响最大，应分配较低的压缩率（保留更多内容）；而多个 Demonstrations 之间信息冗余，可以大幅压缩。

**步骤 1：计算 Demonstration 压缩率**

$$\tau_{\text{dems}} = \frac{\tau L - (\tau_{\text{ins}} L_{\text{ins}} + \tau_{\text{que}} L_{\text{que}})}{L_{\text{dems}}}$$

其中 \(\tau\) 为目标总压缩率，\(\tau_{\text{ins}} = 0.85\)、\(\tau_{\text{que}} = 0.9\) 为预设值。

**步骤 2：Demonstration 级粗粒度压缩**

用小模型 \(\mathcal{M}_s\) 计算每条 Demonstration 的困惑度，按困惑度**降序排列**（高困惑度 = 高信息量 = 优先保留），贪心选取直到 Token 预算用尽。

**步骤 3：剩余预算回拨**

粗粒度选择后若有剩余 Token 预算，回拨给 Instruction 和 Question，进一步降低它们的压缩率：

$$\Delta\tau = \frac{k \cdot \tau_{\text{dems}} L_{\text{dems}} - \widetilde{L}_{\mathcal{D}}}{L_{\text{ins}} + L_{\text{que}}}$$

> ⚠️ 注意：粒度控制系数 \(k=2\) 允许 Demonstration 的实际 Token 数最多为预算的 2 倍，确保不会因为单条 Demonstration 过长而浪费预算。

---

##### 核心机制二：迭代式 Token 级压缩（ITPC）

直接用困惑度逐 Token 筛选存在一个根本问题——**独立性假设**：删除某些 Token 后，剩余 Token 的条件概率分布已经改变，但朴素方法忽略了这一点。

ITPC 的解决方案是**分段迭代**：

```python
# ITPC 伪代码
segments = split(prompt_after_budget_control, segment_size=100)
compressed_tokens = []

for segment in segments:
    # 将已压缩的前文拼接为上下文
    context = compressed_tokens
    # 用小模型计算当前段每个 token 的条件概率 p(token | context, prev_tokens_in_seg)
    probs = small_model.get_token_probs(context + segment)
    # 根据压缩率动态计算阈值 γ
    gamma = compute_threshold(probs, compression_ratio)
    # 保留困惑度 > γ 的 token（即概率低、信息量大的 token）
    kept = [tok for tok, p in zip(segment, probs) if perplexity(p) > gamma]
    compressed_tokens.extend(kept)

compressed_prompt = concat(compressed_tokens)
```

核心公式——分段条件概率估计：

$$p(\widetilde{\bm{s}}_j) = \prod_{i=1}^{L_{s,j} + \sum_k^{j-1} \widetilde{L}_{s,k}} p(s_{j,i} | s_{j,<i}, \widetilde{\bm{s}}_{<j})$$

每段的压缩阈值 \(\gamma_j\) 根据该段的 PPL 分布和对应压缩率动态计算，保留困惑度高于阈值的 Token：

$$\widetilde{\bm{s}}_j = \{s_{j,i} \mid p(s_{j,i}) > \gamma_j\}$$

> 💡 关键：ITPC 的精妙之处在于——前一段的压缩结果会作为后一段的上下文输入，使得后续段的概率估计更加准确，形成了一种**自回归式的压缩链**。

---

##### 核心机制三：分布对齐

压缩使用的小模型（如 GPT-2）与目标 LLM（如 GPT-3.5）的 Token 概率分布存在差异。如果小模型认为某个 Token 不重要（低困惑度）但 LLM 认为它很重要，就会导致关键信息被误删。

解决方案：用 LLM 生成的数据对小模型做**指令微调**，使两者的分布趋于一致：

$$\min_{\bm{\theta}_s} \mathbb{E}\left[\frac{1}{N}\sum_{i=1}^{N}\mathcal{L}(\mathbf{x}_i, \mathbf{y}_{i,\text{LLM}}; \bm{\theta}_{\mathcal{M}_s})\right]$$

实践中使用 Alpaca 数据集进行微调，得到 GPT2-Alpaca 和 Alpaca-7B。

> 💡 关键：分布对齐不需要目标任务的数据，只需通用指令数据即可，因此具有很好的泛化性。

---

##### 训练与推理流程

**离线阶段（一次性）**：
1. 选择小模型（GPT-2 或 LLaMA-7B）
2. 用 Alpaca 数据集 + LLM 生成的回答进行指令微调 → 得到对齐后的 \(\mathcal{M}_s\)

**在线推理阶段（每次请求）**：
1. **Budget Controller**：输入原始 Prompt，计算各 Demonstration 的 PPL，执行粗粒度筛选，分配 Token 预算
2. **ITPC**：对筛选后的 Prompt 分段，逐段计算 Token PPL，保留高信息量 Token
3. **拼接**：将压缩后的 Token 序列直接拼接为新 Prompt，送入目标 LLM

整个压缩过程**不需要目标 LLM 的梯度**，完全兼容黑盒 API。

---

##### 与传统方法的对比

| 方法 | 压缩粒度 | 是否考虑 Token 间依赖 | 是否需要 LLM 梯度 | 最大压缩率 |
|------|---------|---------------------|------------------|-----------|
| Selective-Context | Token 级 | ❌ 独立假设 | ❌ | ~4x |
| Sentence Selection | 句子级 | ❌ | ❌ | ~3x |
| **LLMLingua** | **粗→细两级** | **✅ 迭代式** | **❌** | **20x** |

LLMLingua 的三大优势：
1. **两级压缩**：粗粒度保证语义完整性，细粒度保留关键 Token
2. **迭代式依赖建模**：通过分段拼接缓解独立性假设
3. **分布对齐**：让小模型的"重要性判断"与 LLM 保持一致

---

#### 🧪 练习题
```yaml
question: "LLMLingua 的迭代式 Token 级压缩（ITPC）相比朴素的逐 Token 困惑度筛选，核心改进是什么？"
options:
  - "使用更大的语言模型计算困惑度"
  - "将 Prompt 分段，前段压缩结果作为后段上下文，缓解条件独立性假设"
  - "对每个 Token 计算多次困惑度取平均"
  - "用 TF-IDF 替代困惑度作为 Token 重要性指标"
answer: 1
explain: "ITPC 将 Prompt 分为多个段，每段压缩后的结果拼接到下一段的上下文中，使后续段的条件概率估计能考虑到前段的压缩结果，从而缓解了朴素方法中各 Token 独立计算困惑度的问题。"
```

### RAGAS

```yaml
id: ragas
num: 17
name: RAGAS
full_name: RAG评估框架 (Retrieval-Augmented Generation Assessment)
year: '2024.05'
org: Explorium
parent: —
paper_url: https://arxiv.org/abs/2309.15217
project_url: ''
category: evaluation
motivation: RAG三元组评估法，LLM-as-judge评估忠实度
```

#### 📝 一句话总结
RAGAS 提出了一套面向 RAG 三元组 \((q, c(q), a_s(q))\) 的无参考自动评估框架，用 LLM-as-judge 将忠实度、答案相关性、上下文相关性拆成可执行的子判断，解决 RAG 系统缺少人工参考答案时难以持续评估的问题。

#### 🎯 核心要点
- **RAG 三元组评估**：仅依赖问题 \(q\)、检索上下文 \(c(q)\)、系统答案 \(a_s(q)\)，不要求 ground truth answer。
- **Faithfulness 忠实度**：先把答案拆成原子事实声明，再逐条判断声明能否由上下文推出，用于检测基于上下文的事实幻觉。
- **Answer Relevance 答案相关性**：从答案反向生成若干可能问题，再计算这些问题与原始问题的嵌入相似度，惩罚答非所问、信息缺失和冗余回答。
- **Context Relevance 上下文相关性**：让 LLM 从检索上下文中抽取回答问题所需的关键句，按关键句占全部上下文句子的比例估计检索噪声。
- **结构化 LLM-as-judge**：避免让 LLM 一次性给整体质量打分，而是把评估拆成声明生成、NLI 判断、问题生成、句子抽取等更稳定的局部任务。
- **WikiEval 验证集**：论文构造 50 个基于 2022 年后 Wikipedia 页面的样本，并用人工偏好比较验证指标与人类判断的一致性。
- **实验结论**：在 WikiEval 成对比较中，RAGAS 在 Faithfulness、Answer Relevance、Context Relevance 上分别达到 0.95、0.78、0.70 的人工一致率，优于直接 GPT Score 和 GPT Ranking。

#### 🔬 深入细节
![RAGAS 评估框架图](https://assets.zilliz.com/large_Mar_18_RAG_Evaluation_using_Ragas_20240318_080304_62e448ec81.png)
*图：公开 RAGAS 框架示意图，展示 RAG 评估围绕问题、上下文、答案和可选参考答案展开；论文核心关注无需参考答案的 Faithfulness、Answer Relevance、Context Relevance 三项指标。*

```python
# RAGAS 三元组评估伪代码
def evaluate_ragas(question, context, answer, llm, embedder, n_questions=3):
    # 1. Faithfulness: answer -> statements -> supported / unsupported
    statements = llm.extract_atomic_statements(question=question, answer=answer)
    supported = 0
    for statement in statements:
        verdict = llm.verify_statement(context=context, statement=statement)
        if verdict == "Yes":
            supported += 1
    faithfulness = supported / max(len(statements), 1)

    # 2. Answer Relevance: answer -> reverse questions -> embedding similarity
    generated_questions = [
        llm.generate_question_from_answer(answer)
        for _ in range(n_questions)
    ]
    q_vec = embedder.encode(question)
    answer_relevance = mean(
        cosine_similarity(q_vec, embedder.encode(q_i))
        for q_i in generated_questions
    )

    # 3. Context Relevance: context -> answer-supporting sentences
    relevant_sentences = llm.extract_relevant_sentences(
        question=question,
        context=context,
    )
    total_sentences = sentence_count(context)
    context_relevance = len(relevant_sentences) / max(total_sentences, 1)

    return {
        "faithfulness": faithfulness,
        "answer_relevance": answer_relevance,
        "context_relevance": context_relevance,
    }
```

RAGAS 的出发点是生产环境里的 RAG 往往没有标准答案。传统 QA 指标通常假设有人工标注答案或可抽取短答案，但真实 RAG 系统的输出是长文本，质量同时取决于检索器是否取回了聚焦上下文，以及生成器是否正确利用了这些上下文。论文因此把评估对象固定成 \((q, c(q), a_s(q))\)：问题、检索到的上下文、系统生成答案。这样做的价值是可以直接接入线上日志，对每次 RAG 调用做自动诊断，而不是等人工标注集积累完再评估。

Faithfulness 是最核心的幻觉检测指标。RAGAS 不直接问 LLM “这个答案是否忠实”，而是先让 LLM 把答案拆成短而集中的 statements，再逐条用上下文做蕴含判断。若答案声明集合为 \(S\)，被上下文支持的声明集合为 \(V\)，则：

$$
F = \frac{|V|}{|S|}
$$

这个设计的关键直觉是把复杂主观判断变成多个二元 NLI 式判断。一个长答案可能大部分正确、局部幻觉；整体打分容易掩盖局部错误，而 statement 级验证能定位具体不被上下文支持的事实，从而给 RAG 调参与失败分析提供更细粒度信号。

Answer Relevance 只衡量“答得是否切题”，刻意不检查事实正确性。RAGAS 采用反向问题生成：如果答案确实围绕原问题，那么从答案生成的问题 \(q_i\) 应该与原问题 \(q\) 语义接近。论文用文本嵌入计算平均余弦相似度：

$$
AR = \frac{1}{n}\sum_{i=1}^{n} \operatorname{sim}(q, q_i)
$$

这种间接评估避免了让 LLM 凭感觉给“相关性”打分。答案若遗漏问题关键约束，反向生成的问题会变得更宽泛；答案若夹带冗余事实，生成的问题也可能偏离原始意图，最终拉低平均相似度。

Context Relevance 则面向检索器。它要求 LLM 从 \(c(q)\) 中抽取真正有助于回答 \(q\) 的句子集合 \(S_{ext}\)，再用关键句数占总句数的比例近似上下文聚焦程度：

$$
CR = \frac{|S_{ext}|}{\text{number of sentences in } c(q)}
$$

该指标的方向不是“检索结果越多越好”，而是惩罚噪声上下文。对于长上下文 RAG，冗余段落会增加 token 成本，也可能让模型忽略中间位置的关键信息；因此 Context Relevance 直接反映检索结果是否足够精炼。论文也指出这是三项指标里最难稳定判断的一项，因为长上下文中的关键句抽取对 LLM 本身要求更高。

WikiEval 的构造用于检验这些指标是否真能对齐人类偏好。论文选取 50 个 2022 年以后发生事件相关的 Wikipedia 页面，生成可由页面引言回答的问题，再构造高低质量对比样本：无上下文回答用于制造低忠实度答案，不完整回答用于测试答案相关性，反向链接和补全内容用于制造冗余上下文。两名英语流利标注者独立比较样本，最终 RAGAS 在忠实度上达到 0.95 的人工一致率，显著高于让 ChatGPT 直接 0-10 打分或直接排序。

> 💡 关键：RAGAS 的贡献不只是“用 LLM 当裁判”，而是提出了一套把 RAG 质量拆解为可审计中间步骤的评估流程。它牺牲了一点调用复杂度，换来更高的可解释性和更可靠的线上诊断能力。

#### 🧪 练习题
```yaml
question: "RAGAS 的 Faithfulness 指标为什么要把答案拆成 statements 再验证？"
options:
  - "为了让答案更短，从而降低生成模型的输出 token 数"
  - "为了把整体忠实度判断拆成多个声明级支持性判断，定位哪些事实无法由上下文推出"
  - "为了训练一个新的检索器，让检索结果更接近人工参考答案"
  - "为了把上下文相关性和答案相关性合并成一个单一分数"
answer: 1
explain: "Faithfulness 的核心是 statement-level verification。拆分后每条事实声明都能单独与上下文做支持性判断，比直接整体打分更可解释，也更容易发现局部幻觉。"
```

### RGB

```yaml
id: rgb
num: 18
name: RGB
full_name: RGB基准 (Retrieval-Augmented Generation Benchmark)
year: '2023.09'
org: Tsinghua
parent: —
paper_url: https://arxiv.org/abs/2309.01431
project_url: ''
category: evaluation
motivation: 诊断噪声鲁棒性与拒绝回答无解问题能力
```

#### 📝 一句话总结
RGB 提出了一个检索增强生成基准，从噪声鲁棒性、负面拒绝、信息整合和反事实鲁棒性四个维度系统评估 LLM 利用外部检索文档的能力，揭示了当前 LLM 在 RAG 场景下的关键不足。

#### 🎯 核心要点
- 定义 RAG 的 4 项核心能力：噪声鲁棒性（Noise Robustness）、负面拒绝（Negative Rejection）、信息整合（Information Integration）、反事实鲁棒性（Counterfactual Robustness）
- 基于最新新闻文章构建 QA 实例，减少 LLM 内部知识带来的评估偏差
- 使用搜索引擎（Google API）+ 稠密检索模型获取真实外部文档，模拟真实 RAG 场景
- 共 600 个基础问题 + 200 个信息整合问题 + 200 个反事实鲁棒性问题，中英文各半
- 评估 6 个主流 LLM：ChatGPT、ChatGLM-6B、ChatGLM2-6B、Vicuna-7B、Qwen-7B-Chat、BELLE-7B-2M
- 4 种评估指标：准确率（Accuracy）、拒绝率（Rejection Rate）、错误检测率（Error Detection Rate）、错误纠正率（Error Correction Rate）
- 关键发现：噪声比例超过 80% 时准确率显著下降；负面拒绝率最高仅 45%；信息整合无噪声时准确率最高仅 67%；LLM 极易被反事实文档误导

#### 🔬 深入细节
![RGB 数据构建流程](https://arxiv.org/html/2309.01431v2/x2.png)
*图：RGB 数据构建流程，包括 QA 实例生成、搜索引擎检索和四个测试集的构建过程*

##### 评估流程伪代码

```python
# RGB 评估流程伪代码
def evaluate_rgb(model, testbed, noise_ratio):
    for question, answer, documents in testbed:
        # 1. 根据噪声比例采样文档
        pos_docs = sample_positive(documents)
        neg_docs = sample_negative(documents, ratio=noise_ratio)
        context = pos_docs + neg_docs  # 共 5 篇文档
        
        # 2. 构建 prompt（系统指令 + 文档 + 问题）
        prompt = build_instruction(context, question)
        
        # 3. 模型生成回答
        response = model.generate(prompt)
        
        # 4. 根据测试集类型评估
        if testbed_type == "noise_robustness":
            score = exact_match(response, answer)  # 准确率
        elif testbed_type == "negative_rejection":
            score = check_rejection(response)  # 拒绝率
        elif testbed_type == "information_integration":
            score = exact_match(response, answer)  # 准确率
        elif testbed_type == "counterfactual":
            score = check_error_detection(response)  # 错误检测率
    return aggregate(scores)
```

##### 动机与背景

检索增强生成（RAG）是解决 LLM 幻觉和知识过时问题的关键技术路线——通过检索外部文档为 LLM 提供额外知识，使其生成更准确可靠的回答。然而，现实中的 RAG 面临三大挑战：

1. **检索噪声**：检索器并不完美，返回的文档中包含大量与问题相关但不含答案的噪声文档
2. **生成不可靠**：LLM 的生成行为不可预测，无法保证其会利用文档中的有用信息
3. **虚假信息干扰**：互联网上存在大量错误信息，LLM 容易被误导

在 RGB 之前，缺乏一个系统性的基准来评估 LLM 在这些挑战下的表现。现有的 QA 基准（如 Natural Questions、TriviaQA）主要关注检索器性能，而非 LLM 利用检索文档的能力。RGB 填补了这一空白。

##### 四项核心能力的定义与测试集构建

**噪声鲁棒性（Noise Robustness）**：评估 LLM 在包含噪声文档时能否正确提取答案。测试集通过按不同比例（0%、20%、40%、60%、80%）采样负面文档来控制噪声水平。每个问题提供 5 篇外部文档。

**负面拒绝（Negative Rejection）**：评估当所有提供的文档都不包含答案时，LLM 能否拒绝回答而非编造答案。测试集中所有 5 篇文档均为负面文档（与问题相关但不含答案）。通过指令要求模型在信息不足时输出特定拒绝语句。

**信息整合（Information Integration）**：评估 LLM 能否从多篇文档中整合信息来回答复杂问题。通过扩展或改写基础问题使其答案涉及多个方面，例如将"谁是 2023 年超级碗 MVP？"改写为"谁是 2022 和 2023 年超级碗的 MVP？"，答案分散在不同文档中。

**反事实鲁棒性（Counterfactual Robustness）**：评估 LLM 能否识别外部文档中的事实错误。与前三项不同，此测试集基于 LLM 的内部知识构建——先确认 LLM 已知某知识，再提供包含篡改答案的文档，测试 LLM 是否会被误导。通过指令提醒模型检索信息可能存在风险。

##### 数据构建方法

数据构建分三步：

1. **QA 实例生成**：收集最新新闻文章，使用 ChatGPT 为每篇文章生成事件、问题和答案。使用最新新闻是为了减少 LLM 内部知识带来的评估偏差。生成后人工校验答案并过滤难以通过搜索引擎检索的数据。

2. **搜索引擎检索**：对每个问题使用 Google API 获取 10 个相关网页及摘要片段，同时将网页内容切分为最大 300 token 的文本块，使用稠密检索模型（中文用 m3e-base，英文用 all-mpnet-base-v2）选取 Top-30 匹配文本块。根据是否包含答案将文档分为正面文档和负面文档。

3. **测试集构建**：基于上述语料，按四项能力的需求分别构建测试集，调整噪声比例、文档组成和问题复杂度。

##### 评估指标设计

| 能力 | 指标 | 计算方式 |
|------|------|----------|
| 噪声鲁棒性 | 准确率（Accuracy） | 生成文本是否精确匹配答案 |
| 信息整合 | 准确率（Accuracy） | 生成文本是否精确匹配答案 |
| 负面拒绝 | 拒绝率（Rejection Rate） | 是否输出指定拒绝语句 |
| 反事实鲁棒性 | 错误检测率 + 错误纠正率 | 是否识别错误 + 是否给出正确答案 |

> 💡 关键：由于 LLM 常不严格遵循指令，对于拒绝率和错误检测率，除精确匹配外还使用 ChatGPT 进行辅助评估（Rej\* 和 ED\*），以更全面地捕捉模型的拒绝/检测行为。

##### 核心实验结果与分析

**噪声鲁棒性**：RAG 能有效提升 LLM 回答质量，但噪声比例超过 80% 时准确率显著下降。ChatGPT 从 96.33%（无噪声）降至 76.00%（80% 噪声），ChatGLM2-6B 从 91.33% 降至 57.33%。错误分析揭示三类典型错误：
- **长距离信息**：问题信息与答案信息在文档中距离较远时，LLM 难以正确关联
- **证据不确定性**：互联网上的推测性信息会误导 LLM，即使正确答案存在于文档中
- **概念混淆**：文档中相似但不同的概念（如"汽车收入" vs "总收入"）导致 LLM 混淆

**负面拒绝**：这是 LLM 最薄弱的环节。英文最高拒绝率仅 45%（ChatGPT），中文最高仅 43.33%。精确匹配拒绝率更低（英文最高 31%，中文最高 8.67%），说明 LLM 难以严格遵循指令格式。LLM 极易被相关但无答案的文档误导而生成错误回答。

**信息整合**：即使无噪声，最高准确率仅达 60%（英文，Vicuna）和 67%（中文，Qwen）。加入噪声后性能下降更为显著——噪声比例 0.4 时即出现显著下降，而简单问题在 0.8 时才显著下降。错误分析发现三类特有错误：
- **合并错误**（28%）：将两个子问题的答案合并为一个
- **忽略错误**（28%）：只回答一个子问题而忽略另一个
- **错位错误**（6%）：将一个子问题的文档错误地对应到另一个子问题

**反事实鲁棒性**：LLM 极难识别文档中的事实错误。ChatGPT 在有反事实文档时，中文准确率从 91% 骤降至 17%，英文从 89% 降至 9%。错误检测率极低（精确匹配最高仅 8%），即使 LLM 本身拥有正确知识，也会被检索到的错误文档覆盖。

> ⚠️ 注意：反事实鲁棒性的评估仅限于通过指令提醒模型注意潜在风险的场景。在实际应用中，若无此提醒，LLM 对虚假信息的抵抗力可能更弱。

##### 与已有工作的区别

RGB 与此前的 RAG 评估工作有本质区别：

- **vs. 传统 QA 基准**（Natural Questions、TriviaQA）：传统基准关注检索器性能，RGB 关注 LLM 利用检索文档的能力
- **vs. LLM 通用基准**（MMLU、C-Eval）：通用基准评估 LLM 内部知识，RGB 评估 LLM 处理外部知识的能力
- **vs. 同期 RAG 评估**（RAGAS、ARES）：RGB 更系统地定义了四项独立能力维度，且使用最新新闻减少知识泄露偏差
- **创新点**：首次将 RAG 能力分解为四个可独立评估的维度，并提供了详细的错误分类分析

#### 🧪 练习题
```yaml
question: "在 RGB 基准的负面拒绝测试中，所有提供给 LLM 的文档具有什么特点？"
options:
  - "文档完全与问题无关"
  - "文档与问题相关但不包含答案信息"
  - "文档包含正确答案但被篡改"
  - "文档来自不同语言"
answer: 1
explain: "负面拒绝测试集中所有文档均为负面文档（negative documents），即与问题相关但不包含答案信息，用于评估 LLM 能否在无有用信息时拒绝回答而非编造答案。"
```

### LinearRAG

```yaml
id: linearrag
num: 19
name: LinearRAG
full_name: 线性图谱检索增强 (Linear Graph Retrieval-Augmented Generation)
year: '2026.01'
org: Tsinghua/Alibaba
parent: graphrag
paper_url: https://arxiv.org/abs/2412.14833
project_url: ''
category: frontier_2026
motivation: 三图层级结构使索引成本线性增长，避开关系抽取
```

#### 📝 一句话总结
LinearRAG 提出 relation-free Tri-Graph，用实体、句子和段落三类节点替代昂贵且不稳定的关系抽取，再通过局部语义桥接和全局重要性聚合完成多跳检索，解决 GraphRAG 索引成本高、关系噪声大和可扩展性差的问题。

#### 🎯 核心要点
- **实际论文页**：manifest 中 `2412.14833` 指向骨架动作识别论文；LinearRAG 实际公开论文为 `https://arxiv.org/abs/2510.10114`。
- **Tri-Graph 索引**：构建 entity、sentence、passage 三层节点，仅保留“提及/包含”边。
- **避开关系抽取**：不用 OpenIE 或 LLM 抽取三元组，减少错误关系和额外 token 成本。
- **局部语义桥接**：在 entity-sentence 子图上传播查询语义，激活隐含中间实体。
- **全局重要性聚合**：在 entity-passage 子图上用 Personalized PageRank 聚合 passage 重要性。
- **线性扩展**：句子切分、NER、稀疏邻接矩阵和 SpMM/PPR 让构建与检索近似随语料规模线性增长。

#### 🔬 深入细节
![LinearRAG 框架图](https://ar5iv.labs.arxiv.org/html/2510.10114/assets/x1.png)

*图源：ar5iv 论文图 1，展示 LinearRAG 的 relation-free 图构建与两阶段检索思路。*

```python
def build_trigraph(passages):
    graph = TriGraph()
    for passage in passages:
        p_node = graph.add_passage(passage)
        for sentence in split_sentences(passage):
            s_node = graph.add_sentence(sentence)
            for ent in ner(sentence):
                e_node = graph.add_entity(ent)
                graph.add_edge(e_node, s_node)  # mention matrix M
                graph.add_edge(e_node, p_node)  # contain matrix C
    return graph

def linearrag_retrieve(query, graph, embedder, top_k=5, delta=4):
    seed_entities = match_query_entities(query, graph.entities)
    activation = initialize(seed_entities)

    # Stage 1: local semantic bridging on entity-sentence graph
    for _ in range(4):
        activation = sparse_semantic_propagation(activation, graph.M, embedder)
        activation = prune_below_threshold(activation, delta)
        if no_new_entities(activation):
            break

    # Stage 2: global importance aggregation on entity-passage graph
    ppr_scores = personalized_pagerank(graph.C, seeds=activation)
    return top_passages_by_score(ppr_scores, top_k)
```

LinearRAG 的出发点是对 GraphRAG 做“减法”。许多 GraphRAG 系统会先把文本抽成实体-关系三元组，再在图上做推理；但关系抽取常常把否定、条件、上下文省略或层级关系抽错。一旦错误关系进入图，检索会沿着这些边扩散，把语义相关但事实无关的段落带入上下文。

Tri-Graph 只抽取实体并保留原文段落，不显式抽取关系。图中有三类节点：passage 保存完整上下文，sentence 作为局部语义桥，entity 作为跨段落锚点。两类稀疏矩阵分别表示实体被哪些句子提及、实体出现在哪些段落中。这样关系语义仍留在原文里，由生成模型在读证据时解释，而不是提前压缩成可能错误的三元组。

检索第一阶段是 entity activation。查询中的实体先成为种子，然后在 entity-sentence 子图中传播相似度，找到没有字面出现在查询里、但通过句子语义连接多跳推理链的中间实体。阈值 \(\delta\) 控制扩散边界，避免实体激活指数级膨胀。

第二阶段是 passage retrieval。LinearRAG 把激活实体作为 Personalized PageRank 的种子，在 entity-passage 子图中聚合全局重要性。一个 passage 的分数既来自与查询的直接相似度，也来自它包含多少高激活实体以及这些实体在图中的位置。最终 top-k passage 被送给 LLM 生成答案。

与 GraphRAG 相比，LinearRAG 的核心优势是“结构足够、关系留白”。它仍然利用实体连接跨文档信息，但不让不可靠的关系抽取决定推理路径；因此更适合大规模语料、多跳 QA 和需要频繁增量更新的企业知识库。

#### 🧪 练习题
```yaml
question: "LinearRAG 为什么刻意避免显式关系抽取？"
options:
  - "因为实体节点完全不能用于检索"
  - "因为关系抽取昂贵且容易产生错误边，原文段落能保留更完整的关系语义"
  - "因为 Personalized PageRank 只能处理图片"
  - "因为它不需要任何索引结构"
answer: 1
explain: "LinearRAG 用实体、句子和段落连接保留多跳检索能力，同时避免错误三元组在图中扩散噪声。"
```

### TM-RAG

```yaml
id: tm_rag
num: 20
name: TM-RAG
full_name: Transformer-Mamba混合RAG (Transformer-Mamba RAG)
year: '2026.02'
org: King Saud University
parent: self_rag
paper_url: https://link.springer.com/article/10.1007/s44443-026-00723-5
project_url: ''
category: frontier_2026
motivation: Mamba处理长程依赖，Transformer精细聚合证据
```

#### 📝 一句话总结
TM-RAG 将 Transformer 的局部精细注意力与 Mamba 的长程状态建模结合，并用 CAGF 动态融合和多层级对比学习增强证据聚合，解决长证据 RAG 中全局语义弱、细粒度事实对齐不足的问题。

#### 🎯 核心要点
- **Transformer-Mamba 编码**：Transformer 捕捉局部证据交互，Mamba 以线性序列建模处理长程依赖。
- **CAGF 动态融合**：通过 Cross-Attention Gated Fusion 类模块自适应融合两路特征。
- **多层级对比学习**：包含句级、槽位级和 token 级 masked-recovery contrastive learning。
- **长文本证据聚合**：目标是避免检索只偏向主题相似，而忽略事实一致性和关键槽位。
- **评测覆盖**：在中文左宗棠历史数据集、HotpotQA、MuSiQue、SQuAD 等任务上验证。
- **公开来源限制**：Springer 页面可访问摘要与元数据，正文图未暴露稳定图片直链；下方使用官方文章页作为公开图源链接。

#### 🔬 深入细节
![TM-RAG 官方文章页图源](https://link.springer.com/article/10.1007/s44443-026-00723-5)

*图源：Springer Open Access 文章页；该页说明 TM-RAG 由 Transformer-Mamba 编码、CAGF 融合和多层级对比目标组成。*

```python
def tm_rag_train(query, positive_evidence, negative_evidence, encoder, generator):
    evidence = positive_evidence + negative_evidence

    transformer_states = encoder.transformer_branch(query, evidence)
    mamba_states = encoder.mamba_branch(query, evidence)
    fused = cagf_gate(transformer_states, mamba_states)

    sent_loss = contrastive_sentence(fused, positive_evidence, negative_evidence)
    slot_loss = contrastive_slots(fused, extract_slots(positive_evidence))
    token_loss = masked_recovery_contrastive(fused, mask_entity_time_place_slots(evidence))
    gen_loss = generator.nll(query, positive_evidence)

    return gen_loss + sent_loss + slot_loss + token_loss

def tm_rag_answer(query, retriever, tm_encoder, generator):
    docs = retriever.search(query, top_k=20)
    fused_context = tm_encoder.aggregate_long_evidence(query, docs)
    return generator.generate(query, fused_context)
```

TM-RAG 关注的是长证据聚合，而不是单纯检索召回。真实 RAG 场景里，top-k 文档可能跨越很长上下文，普通 dense retrieval 容易根据主题相似召回材料，却没有足够机制判断“这些材料是否共同支持同一个事实”。Transformer 能做细粒度 token 交互，但在长序列上成本高；Mamba 的选择性状态空间模型更适合线性处理长程依赖，却不如注意力直观地建模局部证据对齐。

混合编码器把两者分工：Transformer 分支处理查询和证据之间的局部交互，捕捉实体、时间、地点、动作等关键槽位；Mamba 分支沿长序列传播状态，保留跨段落的全局语义。CAGF 融合模块相当于一个动态门控，按样本决定更信任局部注意力还是长程状态，而不是简单拼接两路特征。

多层级对比学习用于让编码器不只“读过证据”，还要区分事实支持关系。句级对比拉近查询与正证据句，推远负证据句；槽位级对比关注 subject、time、place、action 等结构化事实槽；token 级 masked recovery 则把被遮蔽的关键 token 与原始证据表示对齐，迫使模型保留细粒度事实。

在 RAG 推理中，TM-RAG 的输出可以看作经过长证据聚合的上下文表示：

$$
h_{\text{fused}} = g_{\text{CAGF}}\left(h_{\text{Transformer}}, h_{\text{Mamba}}\right),
$$

再由生成器基于 \(h_{\text{fused}}\) 回答。它与 Self-RAG 的关系在于都强调“不要盲信检索结果”，但 Self-RAG 用反射 token 批判检索内容，TM-RAG 则在编码层面强化长程证据一致性。

#### 🧪 练习题
```yaml
question: "TM-RAG 中引入 Mamba 分支的主要目的是什么？"
options:
  - "替代所有检索器"
  - "以更适合长序列的方式建模跨段落长程依赖"
  - "把文本转换成图片"
  - "只用于生成随机负样本"
answer: 1
explain: "Mamba 的状态空间建模适合长序列信息传播，弥补 Transformer 在长证据上下文中的成本和全局依赖问题。"
```

### VideoRAG

```yaml
id: videorag
num: 21
name: VideoRAG
full_name: 视频检索增强生成 (Video Retrieval-Augmented Generation)
year: '2026.03'
org: Zhejiang University
parent: rag
paper_url: https://arxiv.org/abs/2501.09885
project_url: ''
category: frontier_2026
motivation: 极长视频多模态编码器实现小时级上下文检索
```

#### 📝 一句话总结
VideoRAG 把 RAG 扩展到小时级、多视频语料，通过图式文本知识 grounding 和多模态上下文编码双通道索引视频片段，让 LLM 能从极长视频集合中检索视觉、语音和文本证据后生成回答。

#### 🎯 核心要点
- **实际论文页**：manifest 中 `2501.09885` 指向无关超导论文；这里依据 `https://arxiv.org/abs/2502.01549` 的 Extreme Long-Context VideoRAG。
- **双通道架构**：graph-based textual knowledge grounding + multi-modal context encoding。
- **视频切片处理**：把任意长视频切为片段，抽取 ASR 文本、采样帧和 VLM caption。
- **跨视频知识图谱**：用 LLM 从 caption/transcript 中抽取实体和关系，支持多视频知识连接。
- **多模态检索**：同时利用文本语义、图结构和视觉 embedding 找到相关片段。
- **LongerVideos 基准**：包含 160+ 视频、134+ 小时，覆盖课程、纪录片、娱乐内容。

#### 🔬 深入细节
![VideoRAG 框架图](https://ar5iv.labs.arxiv.org/html/2502.01549/assets/x1.png)

*图源：ar5iv 论文图 1，展示 VideoRAG 的视频知识索引、多模态检索和最终生成流程。*

```python
def index_videos(video_list, asr, vlm, text_encoder, multimodal_encoder):
    graph = KnowledgeGraph()
    clip_store = []
    for video in video_list:
        for clip in split_video(video, seconds=30):
            transcript = asr.transcribe(clip.audio)
            frames = sample_frames(clip, k=10)
            caption = vlm.caption(frames, transcript)
            text_chunk = merge(caption, transcript, clip.timestamp)

            entities, relations = llm_extract_graph(text_chunk)
            graph.update(entities, relations, source=clip.id)
            clip_store.append({
                "clip": clip,
                "text_vec": text_encoder(text_chunk),
                "video_vec": multimodal_encoder(frames, transcript),
            })
    return graph, clip_store

def videorag_query(query, graph, clip_store, generator):
    graph_hits = graph.retrieve_related_chunks(query)
    visual_hits = multimodal_search(query, clip_store)
    evidence = rerank_and_merge(graph_hits, visual_hits)
    return generator.answer(query, evidence)
```

VideoRAG 的关键难点是视频不是普通长文档。它同时包含视觉帧、语音、字幕、场景变化和跨片段时间依赖；如果只把视频转写成文本，视觉细节会丢失；如果只把帧塞进长视频模型，小时级视频会遇到上下文和计算瓶颈。因此 VideoRAG 使用双通道索引：文本图谱保留可符号化的知识关系，视觉编码保留难以文本化的场景信息。

索引阶段先把视频切成短片段。每个片段通过 ASR 得到 transcript，通过采样帧和 VLM 得到 caption，再把二者合并为结构化文本。随后 LLM 从文本中抽取实体和关系，增量构建跨视频知识图谱；同时，文本编码器和多模态编码器分别保存文本向量与视觉/音频上下文向量。

检索阶段不只做单一路径相似度搜索。对于查询 \(q\)，VideoRAG 可以在图谱中找到相关实体和关系，也可以在多模态 embedding 空间中匹配视觉片段。最终证据由两路候选合并、重排后提供给生成模型：

$$
\operatorname{Answer}=\operatorname{LLM}\left(q,\ \psi_{\text{text-graph}}(q,G)\cup\psi_{\text{multi-modal}}(q,E_v)\right).
$$

这套设计特别适合跨视频问题，例如“某系列课程里某概念第一次在哪一集解释、后续如何展开”。传统 LVLM 可能只能看固定帧窗口，文本 RAG 又看不到画面；VideoRAG 通过知识图谱连接多个视频片段，再用视觉检索补齐具体画面证据。

#### 🧪 练习题
```yaml
question: "VideoRAG 为什么需要同时使用图式文本 grounding 和多模态编码？"
options:
  - "因为视频信息同时包含可文本化知识关系和难以文本化的视觉细节"
  - "因为图谱会自动压缩所有模型参数"
  - "因为 ASR 可以替代视觉帧"
  - "因为多模态编码只能处理纯文本"
answer: 0
explain: "视频证据跨越语音、画面和时间关系，双通道索引能同时保留结构化语义和视觉细节。"
```

### BayesRAG

```yaml
id: bayesrag
num: 22
name: BayesRAG
full_name: 贝叶斯多模态RAG (Bayesian Multimodal RAG)
year: '2026.01'
org: KAIST
parent: videorag
paper_url: https://arxiv.org/abs/2601.07329
project_url: ''
category: frontier_2026
motivation: 概率性证据互证机制解决多模态保真度融合
```

#### 📝 一句话总结
BayesRAG 将多模态检索重写为贝叶斯证据融合问题，用查询相关 likelihood、跨模态一致性 prior 和 Dempster-Shafer 证据理论共同计算后验置信度，解决文本、图像和版面证据高相似但互相矛盾的问题。

#### 🎯 核心要点
- **多模态证据 tuple**：把文本、视觉元素和页面/截图布局组合成候选证据单元。
- **贝叶斯后验排序**：以 \(P(E\mid Q)\propto P(Q\mid E)P(E)\) 重排检索结果。
- **Dempster-Shafer likelihood**：融合不同模态的相关性质量函数，处理不确定和冲突证据。
- **一致性 prior**：用 graph-topology prior 或 layout prior 衡量文本-图像是否天然属于同一证据单元。
- **冲突惩罚**：对高单模态相似但跨模态语义不一致的候选降权。
- **适用场景**：面向图文混排、表格图表丰富的长文档 QA，如 DocBench、MMLongBench-Doc。

#### 🔬 深入细节
![BayesRAG 架构图](https://ar5iv.labs.arxiv.org/html/2601.07329/assets/x1.png)

*图源：ar5iv 论文图 1，展示 BayesRAG 把多模态检索候选通过 likelihood、prior 和 posterior 进行证据融合。*

```python
def bayesrag_rank(query, text_hits, image_hits, page_hits, graph_or_layout):
    candidates = make_evidence_tuples(text_hits, image_hits, page_hits)
    ranked = []
    for E in candidates:
        # likelihood: 各模态与 query 的相关性，经 Dempster-Shafer 融合
        masses = [mass_function(similarity(query, item)) for item in E]
        likelihood = dempster_shafer_combine(masses).belief("relevant")

        # prior: tuple 内部是否互相支持
        if graph_or_layout.type == "graph":
            prior = graph_topology_consistency(E, graph_or_layout)
        else:
            prior = layout_proximity(E, graph_or_layout)

        posterior = likelihood * prior
        ranked.append((posterior, E))
    return [E for _, E in sorted(ranked, reverse=True)]
```

BayesRAG 针对视觉丰富文档中的“bag-of-evidence”问题。普通多模态 RAG 往往分别检索文本、图片和页面，再把 top-k 合并；但高相似并不等于互相支持。例如文本候选可能说水果 apple，图像候选却是 Apple 公司 logo，二者都与查询相似，却组合成错误证据。

论文将候选证据表示为 \(E=(e_{\text{text}}, e_{\text{vision}}, e_{\text{screenshot}})\)，目标是估计：

$$
P(E\mid Q)\propto P(Q\mid E)P(E).
$$

其中 \(P(Q\mid E)\) 是 evidence tuple 对查询的解释能力，来自各模态 embedding 相似度；\(P(E)\) 是证据内部一致性，即这些文本、图片和页面元素在语义或布局上是否本来就应该关联。

likelihood 部分使用 Dempster-Shafer 证据理论。每个模态根据相似度给出“相关/不相关/不确定”的质量函数，组合规则会显式处理冲突：多个模态一致支持时 belief 上升，彼此矛盾时联合置信度下降。这比简单平均相似度更适合多模态噪声场景。

prior 部分有两种实现。Graph-topology prior 把文档元素构成多模态知识图，优先选择在图中连接强、语义一致的 tuple；layout prior 使用页面坐标和邻近关系，认为同页相邻的图文更可能互相解释。最终 posterior 重排让 BayesRAG 优先选择“既与查询相关，又相互 corroborate”的证据。

#### 🧪 练习题
```yaml
question: "BayesRAG 中 prior P(E) 主要表示什么？"
options:
  - "语言模型参数的先验分布"
  - "证据 tuple 内部在语义、图结构或版面上的一致性"
  - "检索器返回文档的原始顺序"
  - "答案长度的惩罚项"
answer: 1
explain: "BayesRAG 用 prior 衡量文本、图像和页面证据是否天然互相支持，从而惩罚跨模态冲突。"
```

### SSRAG

```yaml
id: ssrag
num: 23
name: SSRAG
full_name: 结构化语义RAG (Structured-Semantic RAG)
year: '2026.01'
org: IBM Research
parent: self_rag
paper_url: https://arxiv.org/abs/2601.12658
project_url: ''
category: frontier_2026
motivation: 混合检索与智能路由解决语义漂移问题
```

#### 📝 一句话总结
SSRAG 提出 query augmentation、agentic routing、vector + graph hybrid retrieval 和 context unification 的混合框架，通过语义检索与结构化实体关系检索互补，解决标准 RAG 容易检索偏移、上下文不完整和事实性不足的问题。

#### 🎯 核心要点
- **查询增强**：抽取实体、意图、时间线索，扩展缩写并规范别名。
- **Agentic Query Routing**：用 LLM 判断 factual/temporal，把查询路由到 Wikipedia、Google API 等合适来源。
- **混合检索**：并行执行向量检索和图检索，兼顾语义相似与关系推理。
- **Context Unification**：把图结果线性化成文本向量，与向量候选统一重排、去重、截断。
- **工程实现**：FAISS 负责 dense retrieval，Neo4j/Cypher 负责实体关系子图检索。
- **评测数据**：TruthfulQA、SQuAD、WikiQA，覆盖五类 LLM 和 RAGAS/ROUGE/BLEU/事实性指标。

#### 🔬 深入细节
![SSRAG 架构图](https://ar5iv.labs.arxiv.org/html/2601.12658/assets/Learning_to_RAG_Architecture.png)

*图源：ar5iv 论文图 1，展示 SSRAG 的查询增强、路由、混合检索和上下文统一流程。*

```python
def ssrag_answer(query, llm, vector_index, graph_db, web_api, wiki_db, k=20):
    augmented = enhance_query(
        query,
        entities=extract_entities(query),
        intent=detect_intent(query),
        aliases=canonicalize_aliases(query),
    )

    route = llm.classify_route(augmented, labels=["TEMPORAL", "FACTUAL"])
    source = web_api if route == "TEMPORAL" else wiki_db

    vector_hits = vector_index.search(augmented, source=source, top_k=k)
    subgraph = graph_db.retrieve_entities_and_relations(augmented, source=source)
    graph_texts = llm.linearize_graph(subgraph)
    graph_vectors = embed(graph_texts)

    candidates = rerank_by_cosine([*vector_hits, *graph_vectors], augmented)
    unified = deduplicate(candidates, by=["exact_match", "cosine"])
    context = take_top_k(unified, k)
    return llm.generate(query, context)
```

SSRAG 的动机是标准向量 RAG 容易出现 semantic drift：查询和文档 embedding 相似，但证据并不完整，或者缺少关键实体关系。Graph RAG 能表达结构关系，却可能漏掉语义近似但图中未显式连接的材料。SSRAG 把两者做成流水线，而不是二选一。

查询增强是前置的稳定化步骤。系统先识别查询中的实体、意图和时间敏感性，再扩展缩写与别名，例如把 “RL” 改写成 “reinforcement learning”。这一步降低了短查询、歧义查询和别名不一致导致的召回失败。

路由模块把检索源选择显式化。对于“最新突破”“今天”“当前价格”等 temporal 查询，系统路由到实时 Web；对于历史事实或百科知识，则路由到 Wikipedia 或预构建语料。路由可以表示为：

$$
r=\operatorname{Router}(Q_{\text{aug}})\in\{\text{TEMPORAL},\text{FACTUAL}\}.
$$

这比所有查询都用同一个索引更稳，因为检索源的新鲜度和可信度需求并不相同。

混合检索阶段并行运行向量检索和图检索。图检索返回实体、关系和子图路径，随后被 LLM 转成文本表示并嵌入到同一向量空间；系统把 graph-to-text 候选和 dense 候选统一重排，选 top-2k 后去重，再截断为最终上下文。这样既能保留结构化关系，也能在最终 prompt 中以 LLM 可读文本呈现。

#### 🧪 练习题
```yaml
question: "SSRAG 中 Agentic Query Routing 的核心作用是什么？"
options:
  - "把所有查询强制送到同一个向量库"
  - "根据查询是否时间敏感或事实型选择合适的数据源和检索路径"
  - "删除查询中的所有实体"
  - "只负责压缩最终答案"
answer: 1
explain: "SSRAG 用路由减少来源不匹配导致的语义漂移，例如实时问题走 Web，稳定事实走 Wikipedia。"
```

### ViG-RAG

```yaml
id: vig_rag
num: 24
name: ViG-RAG
full_name: 视频图谱RAG (Video Graph RAG)
year: '2026.02'
org: Seoul National University
parent: graphrag
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/30471
project_url: ''
category: frontier_2026
motivation: 概率时间知识图谱实现视频片段语义时间混合推理
```

#### 📝 一句话总结
ViG-RAG 为长视频构建带时间戳和置信度的概率时间知识图谱（PTKG），再用语义-时间双层检索、GMM 自适应筛选和 VLM 证据融合生成答案，解决长视频 RAG 中片段割裂、时间关系缺失和静态文本匹配不准的问题。

#### 🎯 核心要点
- **实际论文页**：manifest 中 AAAI `30471` 是语音增强学生摘要；ViG-RAG 实际 AAAI 2026 页面为 `https://ojs.aaai.org/index.php/AAAI/article/view/36963`。
- **PTKG 表示**：事实以 \((h,r,t,\tau,p)\) 表示，额外包含时间标记和置信度。
- **多模态内容抽取**：视频切片后抽取 ASR、采样帧和 VLM caption，再由 LLM 抽取实体、关系、时间、置信度。
- **语义-时间双层检索**：Text-F 判断语义相关，Temp-F 判断时间一致和长程依赖。
- **GMM 动态 Top-K**：根据相似度分布自适应区分高置信候选，避免手工阈值。
- **插件式增强**：可作为辅助模块接入 Video-LLaVA、LongVA、Qwen2-VL、LLaVA-Video 等 LVLM。

#### 🔬 深入细节
![ViG-RAG 官方 PDF 图源](https://ojs.aaai.org/index.php/AAAI/article/download/36963/40925)

*图源：AAAI 2026 官方 PDF，Figure 2 展示 ViG-RAG 将视频转成 PTKG，并通过语义-时间检索和 query-aware generation 生成答案。*

```python
def build_ptkg(videos, asr, vlm, llm):
    ptkg = []
    for video in videos:
        for segment in split_video(video, seconds=30):
            transcript = asr(segment.audio)
            frames = sample_frames(segment, k=10)
            caption = vlm.describe(frames, transcript)
            facts = llm.extract_quintuples(caption, transcript)
            # fact = (head, relation, tail, timestamp, plausibility)
            ptkg.extend(facts)
    return merge_cross_video_facts(ptkg)

def vig_rag_query(query, ptkg, visual_index, lvml):
    textual_candidates = retrieve_by_entities_and_anchors(query, ptkg)
    scored = []
    for segment in textual_candidates:
        sem = text_f(segment, query)
        temp = temp_f(segment, query, ptkg)
        scored.append((alpha * sem + (1 - alpha) * temp, segment))

    selected = gmm_select_high_confidence(scored)
    frames = retrieve_visual_frames(query, selected, visual_index)
    return lvml.generate(query, semantic_anchors=selected, frames=frames)
```

ViG-RAG 的核心是把视频片段从孤立 chunk 变成带时间和不确定性的图事实。普通视频 RAG 可能只把 transcript 或 caption 当文本检索，无法表达“某实体在某时间段做了什么，置信度多高”。PTKG 用 \((h,r,t,\tau,p)\) 同时编码关系、时间和 plausibility，更适合视频中事件随时间展开的场景。

索引阶段先把长视频切成固定片段，提取语音转写和视觉描述。LLM 随后从每个片段中抽取实体、关系、时间信息和置信分数，合并成跨视频 PTKG。这个图既是文本检索索引，也是时间推理结构，使模型可以沿实体和时间线找证据，而不是只看静态相似度。

检索阶段包含语义和时间两种过滤。Text-F 判断片段文本是否回答查询；Temp-F 判断片段是否处在正确时间范围、是否与前后事件连贯。两者加权后得到候选分数：

$$
s(S,q)=\alpha\operatorname{TextF}(S,q)+(1-\alpha)\operatorname{TempF}(S,q).
$$

由于不同查询的分数分布不同，固定 top-k 或固定阈值会不稳。ViG-RAG 用 Gaussian Mixture Model 拟合候选相似度分布，自动选择高置信簇；随后再由 VLM/LVLM 整合 semantic anchors、上下文字段和选中视频帧生成答案。

#### 🧪 练习题
```yaml
question: "ViG-RAG 的 PTKG 相比普通知识图谱多编码了哪些关键信息？"
options:
  - "只多编码模型参数量"
  - "时间标记和事实置信度"
  - "只多编码图像分辨率"
  - "只多编码答案长度"
answer: 1
explain: "PTKG 将事实表示为带时间 τ 和 plausibility p 的五元组，支持长视频中的时间推理和不确定性处理。"
```

### URaG

```yaml
id: urag
num: 25
name: URaG
full_name: 统一检索生成 (Unified Retrieval and Generation)
year: '2026.02'
org: Fudan University
parent: videorag
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39729
project_url: ''
category: frontier_2026
motivation: 多模态长文档统一架构，检索生成端到端优化
```

#### 📝 一句话总结
URaG 在单一多模态 LLM 内部统一检索与生成：利用早期 Transformer 层的粗粒度证据定位能力选择相关页面，再让深层只处理保留页面，从而在长文档理解中同时提升准确率和效率。

#### 🎯 核心要点
- **统一架构**：不外接独立 retriever，而是在 MLLM 内部加入轻量 cross-modal retrieval module。
- **粗到细观察**：早层广泛关注整份文档，深层更集中到相关证据页。
- **早层检索**：把早期 hidden states 映射后与查询计算相似度，选择 top-k 页面/视觉 token。
- **深层生成**：丢弃不相关视觉 token，让深层 Transformer 专注证据页面。
- **效率收益**：AAAI 摘要报告计算开销降低 44-56%。
- **官方图源**：作者 GitHub 提供 URaG framework 和 layer study 图。

#### 🔬 深入细节
![URaG 框架图](https://github.com/shi-yx/URaG/raw/main/figures/urag_framework.jpg)

*图源：URaG 官方 GitHub，展示早层特征进入 cross-modal retrieval module，筛选 top-k 页面后送入深层生成。*

```python
def urag_forward(document_pages, query, mllm, retriever_head, k):
    visual_tokens = mllm.vision_encoder(document_pages)
    query_tokens = mllm.text_embed(query)

    early_states = mllm.run_early_layers(visual_tokens, query_tokens)
    page_vectors = retriever_head.map_visual_pages(early_states.visual)
    query_vector = retriever_head.map_query(early_states.query)

    sim = cosine_similarity(page_vectors, query_vector)
    selected_pages = top_k_pages(sim, k)
    pruned_tokens = keep_tokens(visual_tokens, selected_pages)

    deep_states = mllm.run_deep_layers(pruned_tokens, query_tokens)
    return mllm.decode_answer(deep_states)
```

URaG 的出发点是多模态长文档理解中的两个瓶颈：无关页面造成信息干扰，Transformer 对长视觉 token 的计算成本近似二次增长。外接 retriever 能筛页面，但会增加系统复杂度，而且检索目标和生成模型不一定端到端一致。

论文的关键观察是 MLLM 本身呈现 coarse-to-fine 规律：早期层对文档页面的注意力比较广，可以作为粗检索信号；深层注意力逐渐集中到回答所需页面。因此 URaG 把早层隐藏状态拿出来做页面级相似度计算，让模型“边推理边检索”。

Cross-modal retrieval module 是轻量映射头。它把视觉页面 token 和文本查询 token 投到同一相似度空间，计算页面分数：

$$
s_i=\cos\left(W_v h_i^{\text{page}}, W_q h^{\text{query}}\right),
$$

然后保留 top-k 页面对应的视觉 token。被丢弃的页面不进入后续深层，从而节省计算并减少干扰。

与 token compression 的区别是，URaG 不是把所有页面压成短摘要，而是显式选择证据页面，保留被选页面的细粒度视觉信息。与外部检索器相比，它共享 MLLM 的视觉编码和查询表示，更容易和生成目标一致；局限是需要在特定 MLLM 结构上插入并训练/适配检索模块。

#### 🧪 练习题
```yaml
question: "URaG 为什么使用 MLLM 的早期层做检索？"
options:
  - "早期层已经生成最终答案"
  - "早期层通常保留较广的页面级注意信息，可用于粗粒度证据定位"
  - "早期层不包含任何视觉信息"
  - "早期层能完全替代深层 Transformer"
answer: 1
explain: "URaG 利用早层的粗到细观察，把早层页面表示转为检索信号，再让深层专注 top-k 证据页。"
```

### MG-CRAG

```yaml
id: mg_crag
num: 26
name: MG-CRAG
full_name: 多粒度纠正式RAG (Multi-Granular Corrective RAG)
year: '2026.03'
org: Peking University
parent: crag
paper_url: https://link.springer.com/article/10.1007/s10115-026-02778-2
project_url: ''
category: frontier_2026
motivation: 多粒度检索评估器融合，弱监督微调改进CRAG
```

#### 📝 一句话总结
MG-CRAG 在 CRAG 的检索纠错思想上引入段落级 PLRE 与句子级 SLRE 两个检索评估器，并用人工少量标注、Autoencoder 聚类伪标签和残差分类头弱监督训练，让 RAG 在更细粒度上过滤噪声上下文并减少不必要的 Web 搜索。

#### 🎯 核心要点
- **多粒度纠正式 RAG**：先用 passage-level retrieval evaluator (PLRE) 评估整段/文档，再用 sentence-level retrieval evaluator (SLRE) 评估句子级 evidence strip。
- **弱监督四阶段训练**：Retrieval → Manual Labeling → T5-GTR Embedding + Autoencoder/K-Means Clustering → Classification Head Training。
- **三类质量标签**：将候选上下文分为 high、medium、low；high 直接保留，medium 作为可补充证据，low 被过滤。
- **T5-GTR + QNLI Prompt 编码**：把 query-document 或 query-sentence 对组织成 QNLI 风格输入，再映射到 768 维向量。
- **Autoencoder-guided pseudo-labeling**：Autoencoder 将 768 维向量压到低维表示，K-Means 生成伪标签，再用少量人工标注将簇映射到 high/medium/low。
- **Residual classification head**：冻结或复用高效文本编码器表示，用带 9 个残差块的全连接分类头学习检索质量分类，降低对大规模标注和全模型微调的依赖。
- **可调推理模式**：strict、moderate、lenient 三种模式控制 PLRE/SLRE 的通过条件，在准确率、召回率和 Web 搜索调用率之间折中。
- **实验收益**：论文在 ARC-Challenge、PubHealth、PopQA 上验证，报告 ARC-Challenge 68.85% accuracy、PopQA 59.89% accuracy，并强调在 PubHealth 上以更低 Web 搜索率保持相当结果。

#### 🔬 深入细节
![MG-CRAG 训练阶段图](https://github.com/omidacoder/mg-crag/raw/main/images/train_phase.png)
*图：MG-CRAG 官方项目公开的训练阶段图，展示检索、少量人工标注、T5-GTR 嵌入与聚类、分类头训练四阶段。*

![MG-CRAG 推理阶段图](https://github.com/omidacoder/mg-crag/raw/main/images/inference_phase.png)
*图：MG-CRAG 官方项目公开的推理阶段图，展示 PLRE/SLRE 多粒度过滤、模式分支、重排序、Web 搜索补充与最终生成。*

```python
# MG-CRAG 训练与推理伪代码
def train_mg_crag_evaluators(queries, retriever, human_labeler):
    # Stage 1: retrieval
    pairs = []
    for q in queries:
        docs = retriever.retrieve(q, top_k=N)  # MS Contriever in the paper
        pairs.extend((q, doc) for doc in docs)

    # Stage 2: manual labeling on a small subset
    labeled_pairs = human_labeler.label_subset(pairs)
    unlabeled_pairs = [p for p in pairs if p not in labeled_pairs]

    # Stage 3: embedding and clustering
    all_pairs = labeled_pairs + unlabeled_pairs
    embeddings = [
        t5_gtr_encode(f"qnli question: {q} sentence: {text}")
        for q, text in all_pairs
    ]  # each vector has dimension 768
    z = autoencoder.fit_transform(
        embeddings,
        supervised_labels=labeled_pairs.labels,
        losses=["reconstruction", "classification"],
    )
    cluster_ids = kmeans(z, k=3)
    pseudo_labels = map_clusters_to_quality_labels(
        cluster_ids,
        labeled_pairs.labels,
        labels=["low", "medium", "high"],
    )

    # Stage 4: train classification heads for passage-level and sentence-level scoring
    plre = residual_classifier.fit(embeddings, pseudo_labels)
    slre = residual_classifier.fit(sentence_level_embeddings(all_pairs), pseudo_labels)
    return plre, slre


def infer_mg_crag(query, retriever, plre, slre, reranker, web_search, generator, mode):
    docs = retriever.retrieve(query, top_k=N)

    high_docs, medium_docs = [], []
    for doc in docs:
        label = plre.predict(encode_qnli(query, doc))
        if label == "high":
            high_docs.append(doc)
        elif label == "medium":
            medium_docs.append(doc)

    candidate_sentences = split_sentences(high_docs + medium_docs)
    high_sentences, medium_sentences = [], []
    for sent in candidate_sentences:
        label = slre.predict(encode_qnli(query, sent))
        if label == "high":
            high_sentences.append(sent)
        elif label == "medium":
            medium_sentences.append(sent)

    if mode == "strict":
        evidence = only_sentences_from_high_docs(high_sentences, high_docs)
    elif mode == "moderate":
        evidence = high_sentences + medium_sentences
    elif mode == "lenient":
        evidence = high_sentences + medium_sentences + sentences_from(medium_docs)

    evidence = reranker.top_m(query, evidence)
    if not evidence or len(high_sentences) <= WEB_SEARCH_THRESHOLD:
        web_docs = web_search(query_rewrite(query))
        web_sentences = slre_filter_and_rerank(query, web_docs, slre, reranker)
        evidence = reranker.top_m(query, evidence + web_sentences)

    return generator.generate(query=query, evidence=evidence)
```

MG-CRAG 的问题设定来自 CRAG：检索器会把不相关或弱相关文本送进生成器，导致答案被噪声污染；CRAG 通过检索评估器和外部搜索做纠正，但单一粒度的评估器容易把“段落整体相关但内部有噪声句子”与“段落整体一般但包含关键句子”混为一谈。MG-CRAG 的核心改动是把纠正机制拆成两个粒度：PLRE 先在段落/文档层面做粗筛，SLRE 再在句子层面做精筛，从而让生成器看到的是更聚焦的 evidence。

训练阶段的关键是弱监督。论文没有假设存在大规模 high/medium/low 标注，而是先用 MS Contriever 为 ARC-Challenge、PubHealth、PopQA 等短答案任务检索候选文档，人工只标注一小部分 query-document 对；随后 T5-GTR 用 QNLI 风格 prompt 编码每个 pair，Autoencoder 在重建损失下保留语义结构，同时借助少量标注样本的分类损失让瓶颈表示更有判别性。K-Means 在低维表示上聚成 3 类，再由人工标注子集把簇映射为 high、medium、low，形成可扩展的伪标签。

分类头采用残差全连接网络，而不是对大型生成模型做端到端微调。论文附录说明输入是 T5-GTR 的 768 维输出，先投影到 2048 维并加 dropout，核心部分是 9 个残差块；每个残差块包含线性变换、LeakyReLU 和 dropout，维度变化时用线性 down-sampling 对齐 shortcut。这个结构的作用是让轻量分类头在伪标签上学习检索质量边界，同时保持梯度稳定和较低训练成本。

推理时，MG-CRAG 不是简单地把所有 high/medium 文本塞给 LLM。PLRE 先把文档分成 high、medium、low，low 被丢弃；保留下来的文档被拆成句子后再由 SLRE 分类，随后根据 strict、moderate、lenient 三种模式选择 evidence。strict 追求高精度，倾向于只保留高置信文档里的高置信句子；moderate 接受 high 与 medium 证据以平衡召回；lenient 更偏向保留可能有用的 medium 文档内容，适合检索较难或开放域问题。

Web 搜索在 MG-CRAG 中变成一种受控补救动作，而不是默认依赖。推理图中先对高质量句子做 reranking；若没有 high evidence，或 high evidence 数量低于阈值 \(w_s\)，系统才通过 query rewriting 触发 Web 搜索，再把搜索结果交给 SLRE 和 reranker 过滤。这样既保留了 CRAG 的纠错能力，又避免每次查询都付出外部搜索成本。

实验部分表明，多粒度处理对短答案问答尤其有用。论文报告 MG-CRAG 在 ARC-Challenge 上达到 68.85% accuracy，在 PopQA 上达到 59.89% accuracy；在 PubHealth 上结果与强基线相当，同时 Web 搜索率更低。这个结果说明 MG-CRAG 的收益不只是提升回答准确率，也包括把“何时需要外部搜索”变成可调策略，从而控制成本和延迟。

> 💡 关键：MG-CRAG 的创新点不是单独的 reranker 或单独的弱监督分类，而是把多粒度质量评估、伪标签训练、模式化 evidence 选择和按需 Web 搜索组合成一条纠正式 RAG 流程。

#### 🧪 练习题
```yaml
question: "MG-CRAG 为什么同时使用 PLRE 和 SLRE 两个检索评估器？"
options:
  - "PLRE 负责生成答案，SLRE 负责把答案翻译成自然语言"
  - "PLRE 粗筛段落/文档，SLRE 细筛句子级证据，减少段落内部噪声进入生成器"
  - "PLRE 用于训练检索器，SLRE 只用于计算最终 BLEU 分数"
  - "PLRE 和 SLRE 是两个互相投票的生成模型，用来提升解码多样性"
answer: 1
explain: "MG-CRAG 的多粒度核心是先在段落级判断候选文档质量，再在句子级筛出真正支持答案的 evidence strip，从而比单一文档级评估更精细。"
```

### Qwen3-Embedding

```yaml
id: qwen3_embedding
num: 27
name: Qwen3-Embedding
full_name: Qwen3嵌入模型 (Qwen3 Text Embedding)
year: '2026.04'
org: Alibaba
parent: e5
paper_url: https://qwenlm.github.io/blog/qwen3-embedding/
project_url: ''
category: frontier_2026
motivation: 8B参数MTEB 70.6，支持32K上下文多语言检索
```

#### 📝 一句话总结
Qwen3-Embedding 基于 Qwen3 foundation model 构建文本嵌入和重排模型系列，使用双编码器、交叉编码器、多阶段训练和 instruction-aware 输入，面向多语言、长上下文、检索与 RAG 场景提供高质量向量表示。

#### 🎯 核心要点
- **模型系列**：Embedding 和 Reranker 均提供 0.6B、4B、8B 三种规模。
- **32K 上下文**：嵌入与重排模型均支持长上下文输入，适合长文档检索。
- **双编码器嵌入**：Embedding 模型用最后 `[EOS]` hidden state 表示单段文本。
- **交叉编码器重排**：Reranker 输入 query-document pair，输出相关性分数。
- **MRL 支持**：Embedding 支持自定义最终向量维度，便于不同存储/延迟预算部署。
- **多语言能力**：支持 100+ 语言和代码检索，官方博客报告 8B 在 MTEB multilingual leaderboard 得分约 70.58。

#### 🔬 深入细节
![Qwen3-Embedding 训练流程](https://ar5iv.labs.arxiv.org/html/2506.05176/assets/figures/q3e-train-pipeline.png)

*图源：Qwen3-Embedding 技术报告的公开 ar5iv 页面，展示 Qwen3-Embedding 与 Qwen3-Reranker 的三阶段训练流程。*

```python
def embed_text(text, instruction, qwen3_embedding):
    prompt = format_instruction(instruction, text)
    states = qwen3_embedding.forward(prompt)
    return normalize(states["eos_hidden_state"])

def rerank(query, documents, qwen3_reranker):
    scored = []
    for doc in documents:
        pair = format_pair(query, doc)
        score = qwen3_reranker.cross_encoder_score(pair)
        scored.append((score, doc))
    return [doc for score, doc in sorted(scored, reverse=True)]

def rag_with_qwen3(query, corpus):
    q_vec = embed_text(query, "Represent this query for retrieval", qwen3_embedding)
    candidates = vector_search(q_vec, corpus, top_k=100)
    reranked = rerank(query, candidates, qwen3_reranker)
    return llm_answer(query, reranked[:10])
```

Qwen3-Embedding 的工程定位是 RAG 检索栈中的 first-stage dense retriever 与 second-stage reranker。Embedding 模型采用双编码器，查询和文档可独立编码并存入向量库，适合大规模 ANN 检索；Reranker 采用 cross-encoder，推理更慢但能逐对建模 query-document 交互，适合重排 top-100 候选。

嵌入模型的表示取最后 `[EOS]` token 的隐藏状态。这与许多 decoder-only embedding 模型一致：把整段文本通过自回归 backbone 编码后，用句末位置聚合语义。模型还支持 instruction-aware 输入，例如为“法律检索”“代码搜索”“跨语言问答”定制不同指令，从而让同一文本在不同任务下产生更合适的向量。

训练分三阶段。第一阶段用大规模弱监督/合成 pair 做 contrastive pre-training，强化通用语义对齐；第二阶段用高质量标注数据做监督训练，提升检索任务表现；第三阶段通过采样 checkpoint merging 融合候选模型，改善泛化。Reranker 则主要使用高质量标注数据做监督训练，以提高 query-document 精细相关性判断。

在 RAG 系统中，Qwen3-Embedding 的价值不只是分数高，还在于 32K 长上下文、多语言、代码检索和可调维度。实际部署中常见组合是：8B/4B embedding 负责高召回，0.6B 或 4B reranker 按延迟预算重排；若向量库成本敏感，可利用 MRL 输出较短维度向量。

#### 🧪 练习题
```yaml
question: "Qwen3-Embedding 与 Qwen3-Reranker 在检索栈中的典型分工是什么？"
options:
  - "Embedding 负责大规模召回，Reranker 对候选 query-document pair 做精细重排"
  - "Embedding 只负责图像生成，Reranker 只负责语音识别"
  - "二者都只能处理 512 token"
  - "Reranker 用来替代向量数据库存储所有文档"
answer: 0
explain: "双编码器 embedding 适合向量库召回；交叉编码器 reranker 更适合对少量候选做高精度相关性判断。"
```

### RAGUARD

```yaml
id: raguard
num: 28
name: RAGUARD
full_name: RAG鲁棒性评测基准 (RAG Robustness Benchmark)
year: '2026.05'
org: Stanford/Google
parent: rgb
paper_url: https://arxiv.org/abs/2410.20992
project_url: ''
category: frontier_2026
motivation: 首个误导性检索鲁棒性基准，测试冲突信息判断力
```

#### 📝 一句话总结
RAGUARD 构建面向事实核查的误导性检索基准，把 PolitiFact 声明与 Reddit 讨论证据配对并标注 supporting、misleading、irrelevant，用来评估 RAG 系统在真实冲突证据下是否比零检索更可靠。

#### 🎯 核心要点
- **实际论文页**：manifest 中 `2410.20992` 指向无关信道估计论文；RAGuard 实际公开论文为 `https://arxiv.org/abs/2502.16101`。
- **任务定位**：不是评估干净 gold retrieval，而是评估 RAG 对误导性证据的鲁棒性。
- **真实噪声来源**：检索语料来自 Reddit 讨论，捕捉自然发生的错误、偏见、片面叙事和冲突信息。
- **三类证据标签**：supporting、misleading、irrelevant，区分支持、误导和无关上下文。
- **数据构造**：从 PolitiFact 收集政治声明和真伪标签，用 GPT-4 扩展关键词并检索 Reddit 文档。
- **核心发现**：多种 LLM-RAG 系统在误导性检索下表现低于 zero-shot/no retrieval 基线。

#### 🔬 深入细节
![RAGuard 数据构造流程](https://ar5iv.labs.arxiv.org/html/2502.16101/assets/figures/newconstruct.png)

*图源：ar5iv 论文图 4，展示 RAGuard 从事实核查声明、Reddit 检索和 LLM 辅助标注构造基准。*

```python
def build_raguard(politifact_claims, google_search, reddit_corpus, gpt4):
    dataset = []
    for claim, gold_label in politifact_claims:
        keywords = gpt4.extract_keywords(claim)
        docs = google_search(site="reddit.com", query=keywords, top_k=10)
        for doc in docs:
            predicted = gpt4.fact_check(claim, context=doc)
            if predicted == gold_label:
                tag = "supporting"
            elif doc_irrelevant_to_claim(doc, claim):
                tag = "irrelevant"
            else:
                tag = "misleading"
            dataset.append((claim, gold_label, doc, tag))
    return dataset

def evaluate_rag_guard(model, claim, retriever, mode):
    if mode == "zero_context":
        context = []
    elif mode == "standard_rag":
        context = retriever.search(claim, top_k=5)
    elif mode == "misleading_only":
        context = gold_associated_docs(claim, tag="misleading")
    return model.fact_check(claim, context)
```

RAGuard 的基本质疑是：RAG 并不总是提升可靠性。许多基准假设检索文档是 gold 或只有合成噪声，模型只要“利用上下文”就能得分；但真实网络检索常包含片面、过时、政治化或故意误导的信息。RAGuard 因此把检索本身变成压力测试，而不是默认可信环节。

数据集从 PolitiFact 获取政治声明及真伪标签，并把多级真伪压缩为二分类。随后用 GPT-4 提取关键词，通过搜索引擎检索 Reddit 讨论，形成更接近真实网络环境的证据池。Reddit 的价值在于它包含自然出现的支持、反驳、误解、夸张和无关讨论，而不是人为注入的简单噪声。

证据标注采用“模拟 LLM 考试”的方式：给定 claim 和单篇 retrieved document，让 GPT-4 基于该文档判断 claim 的真伪。如果判断与 PolitiFact gold label 一致，则文档是 supporting；如果文档让判断偏离 gold，则是 misleading；如果文档无法提供有效核查信息，则是 irrelevant。这一定义关注文档对 RAG 系统行为的实际影响。

评测设置包括 zero-context、standard RAG、oracle associated documents 和 misleading-only 等模式。核心指标不是召回率越高越好，而是模型能否识别上下文可能错误。论文报告的关键现象是：当提供误导性文档时，多数系统准确率明显低于无检索基线，说明“更多上下文”可能压倒模型原有判断。

#### 🧪 练习题
```yaml
question: "RAGuard 与普通干净检索 QA 基准的主要区别是什么？"
options:
  - "RAGuard 只测试图片分类"
  - "RAGuard 显式加入真实来源的 misleading 证据，测试模型能否抵抗错误检索"
  - "RAGuard 禁止使用任何事实标签"
  - "RAGuard 只比较答案长度"
answer: 1
explain: "RAGuard 的重点是误导性检索鲁棒性，检索文档可能支持、误导或无关，模型必须判断证据可信度。"
```
