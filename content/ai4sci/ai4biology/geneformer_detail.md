### Geneformer — 用 rank-value 编码学习单细胞基因网络上下文

```yaml
id: geneformer
name: Geneformer
full_name: Geneformer (Geneformer)
year: '2023.05'
org: Broad Institute
paper_url: https://www.nature.com/articles/s41586-023-06139-9
category: single_cell
parent: —
motivation: 3000万细胞基因调控逻辑预训练
```

#### 📝 一句话总结

Geneformer 提出了面向单细胞转录组的 rank-value Transformer：先把每个细胞中按语料库中位表达量归一化后的高表达基因排序成 token 序列，再用 masked gene prediction 在约 3000 万人类单细胞上预训练。它把大规模细胞图谱中的共表达和上下文依赖迁移到小样本网络生物学任务，用于细胞状态分类、基因功能预测和 in silico perturbation。

#### 🎯 核心要点

- **rank-value encoding**：对每个细胞，将基因表达除以该基因在 Genecorpus 中的非零中位表达量，再按缩放后表达从高到低排序
- **非参数输入表示**：模型输入不是连续 count 矩阵，而是排序后的基因 token 序列；未检测到的基因不进入序列，降低稀疏零值带来的计算浪费
- **Genecorpus-30M**：V1 在约 3000 万人类单细胞转录组上预训练，覆盖多组织和细胞状态；数据与模型通过 Hugging Face 公开
- **BERT 式 masked gene objective**：随机 mask 每个细胞中约 15% 基因位置，利用剩余 rank 上下文预测被遮盖的基因身份
- **V1 模型结构**：论文主模型使用 6 层 Transformer encoder、2048 最大输入长度、256 维嵌入、4 个 attention head 和 512 维前馈层
- **上下文基因表示**：同一个基因在不同细胞状态下可得到不同 embedding 和 attention 模式，使模型能表达 context-specific gene network dynamics
- **迁移学习工作流**：预训练权重复制到不同任务模型，加任务头后用有限标注数据微调，包括细胞状态分类、转录因子剂量敏感性、染色质状态和疾病相关任务
- **in silico perturbation**：通过删除、前移、后移或插入基因 token 模拟 knockout、overexpression、activation、inhibition，再比较细胞 embedding 或预测输出变化

#### 🔬 深入细节

##### 模型架构图

![Geneformer overview](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs41586-023-06139-9/MediaObjects/41586_2023_6139_Fig1_HTML.png)
*图：Geneformer 论文 Figure 1。图中展示从 Genecorpus-30M 自监督预训练，到复制权重进行任务微调，再到 rank-value encoding 和 Transformer encoder 提取上下文 gene/cell embedding 的完整流程。*

论文页为 Nature，开放全文可通过 PubMed Central 镜像访问；官方模型、tokenizer、Genecorpus-30M 数据链接和 V1/V2 说明位于 `https://huggingface.co/ctheodoris/Geneformer`。当前 Hugging Face 页面还记录了 V2 模型，但这里按 YAML 和原始 Nature 论文解读 V1。

##### 算法伪代码

```python
# Geneformer V1 rank-value encoding 与 masked gene pretraining
def rank_value_encode(cell_counts, gene_median, gene_to_token, max_len=2048):
    scaled = {}
    for gene, count in cell_counts.items():
        if count > 0 and gene in gene_to_token:
            scaled[gene] = count / gene_median[gene]

    ranked_genes = sorted(scaled, key=scaled.get, reverse=True)
    return [gene_to_token[g] for g in ranked_genes[:max_len]]


def pretrain_geneformer(genecorpus, model):
    for cell_counts in genecorpus:
        tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
        masked_tokens, mask_pos, labels = mask_gene_tokens(tokens, mask_rate=0.15)
        logits = model(masked_tokens)
        loss = cross_entropy(logits[mask_pos], labels)
        optimizer.step(loss)


def finetune_geneformer(labeled_cells, pretrained_model, task_head):
    for cell_counts, y in labeled_cells:
        tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
        h = pretrained_model(tokens)
        cell_repr = pool_or_cls(h)
        logits = task_head(cell_repr)
        loss = task_loss(logits, y)
        optimizer.step(loss)


def in_silico_delete_gene(cell_counts, target_gene, model):
    tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
    perturbed = [tok for tok in tokens if tok != gene_to_token[target_gene]]
    return embedding_shift(model(tokens), model(perturbed))
```

##### rank-value encoding 的计算

Geneformer 的关键不是把 count 直接送入 Transformer，而是先把每个基因在当前细胞中的表达与其全语料库典型表达水平做比较。设 \(x_{c,g}\) 是细胞 \(c\) 中基因 \(g\) 的表达，\(m_g\) 是该基因在预训练语料中的非零中位表达量，则：

$$
s_{c,g} = \frac{x_{c,g}}{m_g}
$$

然后按 \(s_{c,g}\) 从高到低排序并取前 \(L=2048\) 个基因：

$$
R_c = \text{argsort}_{g: x_{c,g}>0}\left(-s_{c,g}\right)_{1:L}
$$

这个缩放会降低 housekeeping genes 的统治力。一个绝对表达很高但在几乎所有细胞中都高表达的基因，缩放后不一定排在最前；一个绝对 count 中等但相对自身基线显著上调的转录因子或状态标志基因，反而会被排到更靠前的位置。排序序列 \(R_c\) 就是 Transformer 的输入 token 序列。

##### masked gene prediction 目标

预训练时，Geneformer 随机遮盖 rank 序列中约 15% 的基因 token，并用其余基因及其相对顺序预测被遮盖基因：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(g_i \mid R_{c,\setminus\mathcal{M}})
$$

与 scBERT 预测表达 bin 不同，Geneformer 预测的是“这个 rank 位置应该是哪一个基因”。因此模型被迫学习在给定细胞状态中哪些基因组合、通路和调控模块会共同出现。注意力层计算为：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

论文主模型在最多 2048 个基因 token 上使用 dense self-attention。这样每个基因的输出 embedding 都是 context-aware 的：同一个 `GATA4`、`TEAD4` 或免疫基因在心肌细胞、免疫细胞和疾病状态中的表示可以不同。

##### 迁移学习与任务头

Geneformer 采用典型的预训练-微调范式。预训练模型学到通用单细胞转录组结构后，权重被复制到多个下游模型，再加上任务特定输出层：

$$
\hat{y}_c = f_{\text{head}}(H_c;\phi),\quad H_c = f_{\text{Geneformer}}(R_c;\theta)
$$

如果任务是细胞或疾病状态分类，\(f_{\text{head}}\) 可以作用在池化后的 cell embedding 上；如果任务是基因属性预测，则可读取目标基因位置的 contextual embedding；如果任务是网络解释，则可分析 attention 或 perturbation 后 embedding 的变化。

这种方式适合网络生物学中的小样本问题：真实疾病组织、罕见细胞类型或扰动实验往往标签有限，但预训练阶段已经从大规模细胞图谱中学习了基因共现、通路和细胞状态背景。

##### in silico perturbation

Geneformer 的扰动模拟直接作用于 rank-value 序列。例如 deletion 删除目标基因 token，overexpression 将目标基因前移到序列头部，inhibition 将其后移，activation 将其上移到更高 rank。之后比较原始细胞与扰动细胞的表示或任务输出：

$$
\Delta_{\text{emb}}
= 1 - \cos\left(h_{\text{cell}}(R_c), h_{\text{cell}}(R_c^{\text{pert}})\right)
$$

若删除某基因导致目标细胞状态 embedding 大幅偏移，说明模型认为该基因对该上下文下的网络状态重要。论文把这类分析用于候选调控因子和治疗靶点优先级排序，并结合心肌细胞实验对部分预测进行了验证。

##### 与 scBERT 等表达值模型的区别

scBERT 保留固定基因位置并预测表达量 bin；Geneformer 则把每个细胞变成按相对表达排序的可变基因 token 序列，并预测被 mask 的基因身份。前者更像“每个基因位置都有一个离散表达状态”，后者更像“一个细胞由最能定义其状态的一串基因词组成”。因此 Geneformer 特别强调 rank 中的相对优先级和上下文基因 embedding，而不是完整表达矩阵的逐基因重建。

这种设计也有代价：低 rank 或未检测基因不显式进入 V1 输入，表达幅度被压缩为排序信息，强依赖预训练语料的基因中位数和 token 字典。解释 Geneformer 结果时，应把它看作从单细胞 atlas 中学到的上下文网络先验，而不是因果调控关系的直接证明。

> 💡 关键：Geneformer 的创新点在于 rank-value encoding 把单细胞表达谱变成“细胞状态关键词序列”，再用 Transformer 学习同一基因在不同细胞上下文中的网络角色。

#### 🧪 练习题

```yaml
question: "Geneformer 的 rank-value encoding 为什么要用基因在预训练语料中的中位表达量对当前细胞表达进行缩放？"
options:
  - "为了突出相对该基因自身基线异常上调的状态相关基因，并降低普遍高表达 housekeeping genes 的排名"
  - "为了把所有基因都转换成同一个固定表达值"
  - "为了让模型只能处理蛋白质序列"
  - "为了完全移除 Transformer 中的位置顺序信息"
answer: 0
explain: "按语料库中位表达量缩放后，排序更关注某基因在当前细胞中是否相对自身典型水平突出，而不是只按绝对 count 排序。"
```
