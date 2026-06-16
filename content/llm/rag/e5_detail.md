### E5：E5文本嵌入 (Text Embeddings by Weakly-supervised Contrastive Pre-training)
```yaml
id: e5
name: E5
full_name: E5文本嵌入 (Text Embeddings by Weakly-supervised Contrastive Pre-training)
year: '2022.12'
org: Microsoft
paper_url: https://arxiv.org/abs/2212.03533
category: foundation
parent: contriever
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
