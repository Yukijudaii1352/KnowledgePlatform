### OpenFold - 可训练的 AlphaFold2 PyTorch 开源复现

```yaml
id: openfold
name: OpenFold
full_name: "OpenFold (OpenFold)"
year: "2024.05"
org: "Columbia University"
paper_url: "https://www.nature.com/articles/s41592-024-02272-z"
category: protein_structure
parent: alphafold2
motivation: "AlphaFold2的PyTorch开源复现"
```

#### 📝 一句话总结

OpenFold 在 PyTorch 中完整复现并开放可训练的 AlphaFold2，实现了从数据准备、训练、推理到参数转换的端到端开源流程，解决了原始 AlphaFold2 只能可靠推理、难以重新训练和改造的问题。它在从头训练后匹配 AlphaFold2 精度，同时用低显存注意力、FlashAttention、DeepSpeed Evoformer Attention 等工程优化显著降低长序列和训练成本。

#### 🎯 核心要点

- **可训练复现**：忠实复现 AlphaFold2 monomer 与 AlphaFold-Multimer 推理代码的核心数学计算，并提供完整 PyTorch 训练路径
- **从头训练达到精度对齐**：OpenFold 论文报告从头训练模型可匹配 AlphaFold2，在 CAMEO、CASP 等验证集上达到相近结构预测准确度
- **开放训练资源**：使用 OpenProteinSet 和公开 PDB/模板/多序列比对流程，模型参数、训练数据索引与代码均可由社区复现和扩展
- **继承 AlphaFold2 架构**：核心仍是 MSA representation、pair representation、Evoformer、Structure Module、recycling 与多任务辅助损失
- **显存与速度优化**：实现低显存注意力、chunking、自定义 CUDA attention kernel、FlashAttention、DeepSpeed DS4Sci_EvoformerAttention
- **长序列能力**：官方文档报告可在单张 A100 上预测超过 4000 个残基的序列，长链推理比参考实现更稳健
- **研究价值**：通过可重复训练观察模型学习过程，论文发现 OpenFold 对训练集大小和二级结构类别删减具有较强泛化鲁棒性
- **工程互操作性**：支持 AlphaFold 官方 JAX 参数与 OpenFold PyTorch 参数双向转换，便于复现实验、消融和后续模型开发

#### 🔬 深入细节

##### 图示与来源

![OpenFold 与 AlphaFold2 精度对齐结果](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs41592-024-02272-z/MediaObjects/41592_2024_2272_Fig1_HTML.png)
*图：Nature Methods 论文 Figure 1 展示 OpenFold 与 AlphaFold2 的预测精度对齐。OpenFold 没有提出新的主干网络架构图，方法架构继承 AlphaFold2；可访问来源包括论文页 https://www.nature.com/articles/s41592-024-02272-z、官方文档 https://openfold.readthedocs.io/ 和代码仓库 https://github.com/aqlaboratory/openfold。*

##### 算法伪代码

```python
# OpenFold 训练/推理核心流程，省略特征细节和 Amber relaxation
def openfold_forward(sequence, msa_db, template_db, params, recycle_steps=3):
    # 1. 构造 AlphaFold2 风格输入特征
    msa = search_msa(sequence, msa_db)                 # UniRef90 / MGnify / BFD / UniClust 等
    templates = search_templates(sequence, template_db)
    feats = featurize(sequence, msa, templates)

    # 2. 初始化 MSA 表征、pair 表征与结构状态
    m = embed_msa(feats.msa, feats.extra_msa)
    z = embed_pair(feats.residue_index, feats.template_features)
    prev = init_recycle_state()

    # 3. Recycling: 多次把上一轮结构和 pair 信息反馈给 Evoformer
    for r in range(recycle_steps):
        m, z = add_recycle_features(m, z, prev)

        # Evoformer: MSA attention、outer product mean、triangle update/attention
        for block in evoformer_blocks:
            m = msa_row_col_attention(m, z)
            z = z + outer_product_mean(m)
            z = triangle_multiplication_and_attention(z)
            m, z = transition(m), pair_transition(z)

        # Structure Module: 从 pair/single 表征生成残基刚体框架和原子坐标
        single = extract_single_representation(m)
        coords, frames, sidechains = structure_module(single, z)
        prev = make_recycle_state(coords, z)

    # 4. 训练时计算多任务损失；推理时输出坐标和置信度
    outputs = confidence_heads(single, z, coords)
    return coords, outputs
```

##### 动机与背景

AlphaFold2 的原始开源版本极大推动了蛋白质结构预测，但它主要开放的是推理代码和预训练参数。对研究者而言，真正困难的是重新训练、消融、迁移到新任务和验证模型到底学到了什么。比如要扩展到蛋白质-配体复合物、替换 MSA 特征、改造注意力模块、加入新的损失函数，只有推理代码远远不够。

OpenFold 的定位不是重新发明一个结构预测架构，而是把 AlphaFold2 变成一个可训练、可扩展、可调试的开源系统。它保持 AlphaFold2 内部数学计算的一致性，同时把实现迁移到 PyTorch 生态，并补齐大规模训练所需的数据处理、分布式训练、混合精度、内存优化和权重转换工具。

##### 核心机制 1：AlphaFold2 主干的可训练复现

OpenFold 继承 AlphaFold2 的核心表示学习范式：从序列、MSA、模板中构造输入，维护两类关键表示：

$$
M \in \mathbb{R}^{N_{\text{msa}} \times L \times c_m}, \quad
Z \in \mathbb{R}^{L \times L \times c_z}
$$

其中 \(M\) 是 MSA 表示，捕获同源序列中的共进化信息；\(Z\) 是残基对表示，捕获任意两个残基之间的几何关系。Evoformer 在两者之间反复交换信息：

$$
Z \leftarrow Z + \operatorname{OuterProductMean}(M)
$$

随后通过 triangle multiplication 和 triangle attention 让残基对关系满足空间几何的一致性。直觉上，如果 \(i\) 接近 \(j\)，\(j\) 接近 \(k\)，那么 \(i\) 与 \(k\) 的相对关系不能独立决定，三角更新正是把这种几何约束写入 pair representation。

Structure Module 则把最终的 single/pair 表示转换为残基刚体框架、主链坐标和侧链构象。训练目标沿用 AlphaFold2 的多任务设计，可抽象为：

$$
\mathcal{L}
= \lambda_{\text{FAPE}}\mathcal{L}_{\text{FAPE}}
+ \lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
+ \lambda_{\text{msa}}\mathcal{L}_{\text{masked-MSA}}
+ \lambda_{\text{plddt}}\mathcal{L}_{\text{pLDDT}}
+ \lambda_{\text{viol}}\mathcal{L}_{\text{violation}}
$$

其中 FAPE 约束局部坐标框架下的原子位置，distogram 监督残基对距离分布，masked-MSA 提供序列语言式辅助学习，pLDDT 让模型学会预测自身置信度，violation loss 惩罚键长、键角、原子冲突等结构不合理项。

> 💡 关键：OpenFold 的算法贡献主要是“忠实、可训练、可扩展”，而不是改变 AlphaFold2 的科学假设。它让 AlphaFold2 从一个强大的推理程序变成可以被社区重新训练和系统研究的模型平台。

##### 核心机制 2：大规模训练数据与重训流程

OpenFold 与 OpenProteinSet 结合，补上了 AlphaFold2 复现中最昂贵的数据环节。MSA 搜索通常需要对 UniRef90、MGnify、BFD、UniClust、PDB70 等大库运行 HHblits、JackHMMER、HHSearch 等工具，成本远高于单次模型前向。OpenProteinSet 提供大规模预计算 MSA、模板命中和相关结构数据，使研究者能够绕过重复的海量序列搜索。

训练流程可理解为三层：

1. **数据层**：PDB/mmCIF 结构、模板命中、MSA、release date cutoff、链聚类和训练/验证拆分
2. **特征层**：AlphaFold2 风格的 target features、MSA features、template features、residue index、mask
3. **模型层**：Evoformer 与 Structure Module 的端到端优化，训练中使用 recycling 和辅助监督

这种重训能力使论文能够做更深入的问题分析：当训练集故意删掉某些 fold 或二级结构类型时，模型是否只是记忆模板，还是学到了更可迁移的折叠规律。OpenFold 的结果显示，即使训练集规模和多样性被刻意限制，模型仍有相当强的泛化能力。

##### 核心机制 3：内存优化与长序列推理

AlphaFold2 的注意力模块在长序列上显存压力很大，pair representation 的规模为 \(O(L^2)\)，三角注意力和 MSA 注意力还会进一步放大峰值显存。OpenFold 将标准注意力：

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}} + B\right)V
$$

改造成支持 chunking、低显存注意力和高效 CUDA kernel 的实现。低显存注意力的思想不是改变数学结果，而是把 \(QK^\top\) 和 softmax 的计算拆成块，避免一次性 materialize 巨大的注意力矩阵：

```python
def low_memory_attention(Q, K, V, bias, q_chunk=1024, k_chunk=4096):
    outputs = []
    for q in chunks(Q, q_chunk):
        # 对每个 query chunk 分块扫过 key/value，在线维护 softmax 归一化
        out_q = streaming_softmax_attention(q, K, V, bias, k_chunk)
        outputs.append(out_q)
    return concat(outputs)
```

官方文档还记录了 FlashAttention 对 MSA attention 的加速，以及 DeepSpeed DS4Sci_EvoformerAttention 对 Evoformer attention 的优化。后者作为 OpenFold 与 DeepSpeed4Science 合作的一部分，目标是在不改变模型数学含义的前提下降低训练和推理峰值显存，并提升长序列吞吐。

##### 核心机制 4：与 AlphaFold2 的差异

OpenFold 与 AlphaFold2 的关系更接近“可训练工程复现”而非新算法替代：

| 维度 | AlphaFold2 开源实现 | OpenFold |
|---|---|---|
| 主框架 | JAX | PyTorch |
| 训练代码 | 不完整，社区难以复现训练 | 公开可训练路径 |
| 数据资源 | 原始训练数据和 MSA 流程难以完整复现 | 结合 OpenProteinSet 和公开训练资源 |
| 模型数学 | 原始 AF2 | 尽量保持 AF2 数学一致 |
| 长序列推理 | 显存瓶颈明显 | 低显存注意力、chunking、CPU offload |
| 可研究性 | 更适合直接推理 | 更适合消融、重训和新任务改造 |

##### 训练与推理的关键计算直觉

OpenFold 的训练信号之所以不只用最终坐标误差，是因为蛋白质结构预测存在刚体对齐、局部几何、侧链原子、置信度校准等多个层次。FAPE 在局部坐标系里比较预测点和真实点，避免全局旋转平移影响：

$$
\mathcal{L}_{\text{FAPE}}
= \frac{1}{N}\sum_{i,j}
\min\left(
\left\|T_i^{-1}x_j - \hat{T}_i^{-1}\hat{x}_j\right\|,
d_{\text{clamp}}
\right)
$$

其中 \(T_i\) 和 \(\hat{T}_i\) 是真实与预测的第 \(i\) 个残基局部框架。这个损失鼓励模型学到局部几何一致性，而不是只在全局 RMSD 上拟合。

推理时，recycling 是另一个关键机制。上一轮预测的结构会被编码回 pair features，下一轮 Evoformer 可以基于“当前猜测的结构”继续修正。形式上可以写作：

$$
(M^{r+1}, Z^{r+1}, X^{r+1})
= f_\theta(M^r, Z^r, \operatorname{Embed}(X^r))
$$

这让模型像迭代优化器一样工作：先给出粗略折叠，再逐步调整长程接触、二级结构和局部构象。

##### 来源限制与可复现性说明

本条目的论文链接指向 Nature Methods 正式论文页面；该页面可访问摘要、图示、数据可用性和代码可用性说明。方法细节主要结合正式论文、OpenFold 官方文档与 GitHub 仓库整理。由于 OpenFold 不改变 AlphaFold2 的核心网络，本文中的架构与损失函数解释基于 AlphaFold2/OpenFold 共同实现的机制，而 OpenFold 特有贡献集中在可训练复现、数据公开、效率优化和重训实验。

#### 🧪 练习题

```yaml
question: "OpenFold 相比 AlphaFold2 原始开源实现最核心的贡献是什么？"
options:
  - "把 Evoformer 替换成扩散模型，从而支持小分子生成"
  - "完整提供可训练的 PyTorch 复现和训练/数据/推理工程，使社区可以重训和改造 AlphaFold2"
  - "只保留单序列语言模型输入，完全取消 MSA"
  - "用 Rosetta 能量函数替代 FAPE 损失"
answer: 1
explain: "OpenFold 的重点是忠实复现 AlphaFold2 并使其可训练、可扩展、显存更友好；它没有用扩散模型替换 Evoformer，也没有取消 MSA 或改用 Rosetta 能量函数。"
```
