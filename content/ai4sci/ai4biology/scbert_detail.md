### scBERT — 用 Performer 预训练单细胞表达谱的细胞类型标注模型

```yaml
id: scbert
name: scBERT
full_name: scBERT (scBERT)
year: '2022.09'
org: 腾讯AI Lab
paper_url: https://www.nature.com/articles/s42256-022-00534-z
category: single_cell
parent: —
motivation: 首个百万级单细胞数据预训练模型
```

#### 📝 一句话总结

scBERT 将每个单细胞的基因表达谱视为由基因 token 组成的“句子”，用 gene2vec 基因嵌入、离散表达量嵌入和 Performer 编码器进行自监督预训练，再迁移到细胞类型标注。它主要解决传统单细胞注释方法依赖 marker、难处理批次效应、难显式利用基因间相互作用的问题。

#### 🎯 核心要点

- **单细胞表达谱语言化**：一个细胞对应一条长度约等于基因数的序列，每个位置是固定基因，输入特征由 gene2vec 基因嵌入与表达量 bin 嵌入相加
- **表达量离散化**：预处理后表达值被分桶为有限类别，官方默认 `num_tokens=7`，包括零表达、若干非零表达 bins 和 mask 类别
- **只 mask 非零表达**：预训练阶段随机遮盖非零基因表达 bin，用剩余基因上下文重建原始 bin，减少 scRNA-seq dropout zero 对训练目标的干扰
- **Performer 编码器**：用 FAVOR+ 近似 softmax attention，将长基因序列注意力从二次复杂度降到近线性，默认 6 层、10 个 head、200 维嵌入
- **两阶段训练**：先在 PanglaoDB 等未标注 scRNA-seq 数据上自监督学习 gene-gene interaction，再在带标签参考数据上监督微调用于细胞类型注释
- **微调头设计**：预训练 encoder 之后接一维卷积和分类器输出细胞类型，novel cell type detection 可通过最大预测概率阈值实现
- **可解释性**：多层多头 attention 的平均矩阵可用于观察某个基因对其他基因的注意关系，辅助分析细胞类型相关基因互作
- **鲁棒性评估**：论文在跨器官、跨平台、类别不均衡和批次效应场景中比较 marker、相关性和机器学习基线，突出预训练迁移的泛化优势

#### 🔬 深入细节

##### 模型架构图

![scBERT overview](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-022-00534-z/MediaObjects/42256_2022_534_Fig1_HTML.png)
*图：scBERT 论文 Figure 1。上半部分展示自监督预训练与监督微调；下半部分展示 gene2vec 基因嵌入、表达量 bin 嵌入、随机 mask、Performer 层和多头注意力。*

论文页为 Nature Machine Intelligence，预印本全文可从 bioRxiv 访问，官方代码位于 `https://github.com/TencentAILabHealthcare/scBERT`。官方 README 给出的默认 Performer 配置是 `num_tokens=7`、`dim=200`、`depth=6`、`heads=10`。

##### 算法伪代码

```python
# scBERT 预训练与微调伪代码
def preprocess_cell(raw_counts):
    x = scanpy_normalize_total(raw_counts)
    x = log1p(x)
    bins = discretize_expression(x, num_bins=7)
    return bins


def build_scbert_input(gene_ids, expression_bins, gene2vec, bin_embedding):
    tokens = []
    for gene, b in zip(gene_ids, expression_bins):
        gene_emb = gene2vec[gene]
        expr_emb = bin_embedding[b]
        tokens.append(gene_emb + expr_emb)
    return tokens


def pretrain_scbert(unlabeled_cells, performer, reconstructor):
    for cell in unlabeled_cells:
        bins = preprocess_cell(cell.counts)
        masked_bins, mask_pos = random_mask_nonzero_bins(bins)
        z = build_scbert_input(cell.gene_ids, masked_bins, gene2vec, bin_embedding)
        h = performer(z)
        logits = reconstructor(h[mask_pos])
        loss = cross_entropy(logits, bins[mask_pos])
        optimizer.step(loss)


def finetune_for_cell_type(labeled_cells, pretrained_encoder, classifier):
    for cell, y in labeled_cells:
        bins = preprocess_cell(cell.counts)
        h = pretrained_encoder(build_scbert_input(cell.gene_ids, bins, gene2vec, bin_embedding))
        pooled = conv1d_pooling(h)
        logits = classifier(pooled)
        loss = cross_entropy(logits, y)
        optimizer.step(loss)
```

##### 输入表示：gene2vec 加表达量 bin

scRNA-seq 的原始矩阵非常稀疏，且同一个细胞里不同基因的表达尺度差异很大。scBERT 不直接输入连续 count，而是先标准化并离散化表达量：

$$
b_{c,g} = \text{bin}\left(\log(1+\text{normalize}(x_{c,g}))\right)
$$

其中 \(c\) 表示细胞，\(g\) 表示基因，\(b_{c,g}\) 是该基因在该细胞中的表达 bin。每个输入位置的向量为：

$$
z_{c,g} = E_{\text{gene}}(g) + E_{\text{expr}}(b_{c,g})
$$

\(E_{\text{gene}}\) 来自 gene2vec，提供基于共表达关系的基因先验；\(E_{\text{expr}}\) 表示该基因在当前细胞中的表达状态。这个设计把“这个位置是什么基因”和“它在此细胞中表达到什么水平”分离开，避免模型只从全局基因身份或只从表达量里学习。

##### 自监督重建损失

预训练阶段，scBERT 随机 mask 非零表达的基因 bin，然后根据其余基因上下文预测被 mask 的原始 bin：

$$
\mathcal{L}_{\text{rec}}
= -\sum_{g\in\mathcal{M}}
\log p_\theta(b_{c,g}\mid \{z_{c,j}: j\notin \mathcal{M}\})
$$

这里 \(\mathcal{M}\) 是被遮盖的非零基因集合。只遮盖非零表达很关键，因为 scRNA-seq 里的零既可能是真实未表达，也可能是技术 dropout；如果大量重建零，模型容易学到“预测零最安全”，而不是学习细胞状态相关的基因互作。

##### Performer 注意力

普通自注意力计算为：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

当输入包含上万基因时，\(QK^\top\) 的 \(O(N^2)\) 复杂度会很重。Performer 用随机特征映射 \(\phi(\cdot)\) 近似 softmax kernel：

$$
\widehat{\text{Att}}(Q,K,V)
= \widehat{D}^{-1}\left(\phi(Q)(\phi(K)^\top V)\right)
$$

$$
\widehat{D}
= \text{diag}\left(\phi(Q)(\phi(K)^\top \mathbf{1})\right)
$$

这样可以先聚合 \(\phi(K)^\top V\)，再乘 \(\phi(Q)\)，避免显式构造全量 \(N\times N\) 注意力矩阵。对 scBERT 来说，这使模型能在完整基因列表上捕获长距离 gene-gene interaction，而不需要像传统流程那样先强依赖 highly variable genes 或降维步骤。

##### 微调与新细胞类型检测

微调时，预训练的 Performer encoder 被复用，reconstructor 被替换为一维卷积和分类器：

$$
\hat{y}_c
= \text{softmax}\left(W\ \text{ConvPool}(H_c)+b\right)
$$

$$
\mathcal{L}_{\text{cls}}
= -\sum_c \log p_\theta(y_c\mid x_c)
$$

如果查询细胞属于训练标签之外的新类型，模型的最大 softmax 概率通常会偏低；官方推理脚本提供 `unassign_thres` 阈值，将低置信度细胞标为 unassigned。这不是严格的开放集分类理论保证，但在实际细胞注释工作中提供了一个可操作的新类型筛查入口。

##### 与传统单细胞注释方法的区别

marker-based 方法依赖人工整理的 marker gene list，面对相似细胞亚型或新数据集时容易漏标；correlation-based 方法常把细胞表达谱与参考均值做相似度比较，对批次效应和参考集质量敏感；传统机器学习方法通常需要特征筛选或任务内训练，难以把大量未标注细胞中的共表达规律迁移过来。

scBERT 的核心变化是把未标注单细胞数据变成预训练资源。自监督任务不需要细胞类型标签，却迫使模型学习在一个细胞状态下哪些基因表达模式互相支持。微调时，即使标签较少，模型也已经有了通用 gene-gene interaction 表示，因此在类别不均衡、跨 cohort 和跨平台设置中更稳健。

> 💡 关键：scBERT 的“BERT”并不是逐字复刻 NLP 输入，而是把基因身份、表达强度和长程基因互作重新组织成适合 Transformer/Performer 学习的单细胞表达语言。

#### 🧪 练习题

```yaml
question: "scBERT 为什么选择 Performer encoder 而不是普通 Transformer self-attention？"
options:
  - "因为完整基因序列很长，Performer 能以近线性复杂度近似注意力，降低内存和计算压力"
  - "因为 Performer 不需要任何表达量输入"
  - "因为普通 Transformer 无法做分类任务"
  - "因为 Performer 会自动生成 marker gene list"
answer: 0
explain: "单细胞表达谱可包含上万基因，普通注意力的二次复杂度很昂贵；Performer 用随机特征近似 softmax attention，使 scBERT 能更高效地建模全局基因互作。"
```
