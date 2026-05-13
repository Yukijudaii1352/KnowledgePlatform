### Contriever — 无监督对比学习密集检索

```yaml
id: contriever
name: Contriever
full_name: "无监督密集信息检索与对比学习 (Unsupervised Dense Information Retrieval with Contrastive Learning)"
year: "2022"
org: "Meta AI Research"
paper_url: "https://arxiv.org/abs/2112.09118"
category: "rag"
parent: "—"
motivation: "通过对比学习训练无监督密集检索器，消除对标注数据的依赖，实现密集检索"
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