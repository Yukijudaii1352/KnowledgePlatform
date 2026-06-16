### AlphaFold 2

```yaml
id: alphafold2
name: AlphaFold 2
full_name: AlphaFold 2 (AlphaFold 2)
year: '2021'
org: DeepMind
paper_url: https://www.nature.com/articles/s41586-021-03819-2
category: protein_structure
parent: —
motivation: Evoformer架构基本解决蛋白质折叠
```

#### 📝 一句话总结

AlphaFold 2 提出了以 Evoformer 和 Structure Module 为核心的端到端蛋白质结构预测系统，将 MSA、模板、残基对关系和三维坐标统一优化，显著解决了从氨基酸序列直接预测接近实验精度结构的问题。

#### 🎯 核心要点

- **端到端坐标预测**：从输入序列、MSA 和模板特征直接输出三维原子坐标，不再依赖先预测距离图再手工折叠的分阶段流程
- **Evoformer 双表示架构**：同时维护 MSA representation \(M \in \mathbb{R}^{N_{seq}\times N_{res}\times c_m}\) 与 Pair representation \(Z \in \mathbb{R}^{N_{res}\times N_{res}\times c_z}\)
- **MSA-Pair 持续通信**：通过 row/column attention、outer product mean、pair bias 等操作把进化共变信息持续注入残基对图
- **三角更新机制**：Triangle multiplicative update 与 triangle self-attention 在残基三元组上更新边特征，显式编码几何一致性约束
- **Structure Module**：使用 Invariant Point Attention 在 SE(3) 不变/等变条件下迭代更新每个残基的刚体框架和侧链扭转角
- **FAPE 核心损失**：Frame Aligned Point Error 在局部残基框架内比较预测原子与真实原子位置，使损失对全局旋转和平移不敏感
- **Recycling 迭代细化**：将上一轮预测的 pair/坐标信息重新输入网络，少量额外计算换取明显精度提升
- **自蒸馏与置信度估计**：用高置信无标注序列预测扩充训练集，并输出 pLDDT、PAE/pTM 等结构可靠性指标
- **CASP14 标志性结果**：在 CASP14 域上达到约 \(0.96\) Å median backbone r.m.s.d.\(_{95}\)，显著优于下一名约 \(2.8\) Å

#### 🔬 深入细节

##### 架构总览

![AlphaFold 2 架构与精度示意](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 AlphaFold 2 从输入序列、MSA、模板到 Evoformer、Structure Module 和 recycling 的整体信息流。*

![Evoformer 与 Structure Module 细节](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png)
*图：Nature 论文 Fig. 3，展示 Evoformer block、三角更新、Invariant Point Attention 和 FAPE 的结构细节。*

##### 核心流程伪代码

```python
# AlphaFold 2 推理流程的高层伪代码
def alphafold2(sequence):
    msa = search_genetic_databases(sequence)
    templates = search_structure_database(sequence)

    M = embed_msa(sequence, msa)              # (N_seq, N_res, c_m)
    Z = embed_pair_features(sequence, templates)  # (N_res, N_res, c_z)
    prev = None

    for recycle in range(num_recycles):
        if prev is not None:
            Z = Z + embed_prev_distogram(prev.coords)
            M[0] = M[0] + embed_prev_single(prev.single)

        for block in range(num_evoformer_blocks):
            M = msa_row_attention_with_pair_bias(M, Z)
            M = msa_column_attention(M)
            Z = Z + outer_product_mean(M)
            Z = triangle_multiplicative_update(Z, mode="outgoing")
            Z = triangle_multiplicative_update(Z, mode="incoming")
            Z = triangle_self_attention(Z, mode="starting_node")
            Z = triangle_self_attention(Z, mode="ending_node")
            M, Z = transition(M), transition(Z)

        single = M[0]                         # target sequence representation
        coords, frames, torsions = structure_module(single, Z)
        prev = Prediction(single=single, coords=coords, frames=frames)

    confidence = predict_plddt(single)
    return coords, confidence
```

##### 动机：从“距离图后处理”到“结构图推理”

AlphaFold 2 之前的深度学习结构预测通常把 MSA 的共进化信号转成 residue-residue contact 或 distance distribution，再用 Rosetta/优化器生成三维结构。这类方法的瓶颈在于：二维距离图并不天然保证能嵌入到一个一致的三维结构中，局部距离预测错误会在后处理阶段累积，并且端到端学习信号无法从最终坐标充分回传到早期特征。

AlphaFold 2 的核心转变是把蛋白质折叠视为三维空间中的图推理问题。残基是节点，pair representation 是有向边，MSA representation 提供进化证据；Evoformer 不断在这两个表示之间传递信息，Structure Module 再把表示落到三维刚体和原子坐标上。这样，网络不只是预测“哪些残基接近”，而是在训练中学习哪些 pair 特征能够形成一个物理上自洽的三维结构。

##### Evoformer：MSA 与 Pair 的双通道推理

Evoformer 每个 block 都让 MSA 和 pair representation 双向通信。MSA row attention 在同一条序列内沿残基维度建模长程依赖，并使用 pair representation 作为 attention bias；MSA column attention 在同一残基位点跨同源序列聚合共变模式；outer product mean 则把 MSA 中的列间相关性转换为 pair 更新：

$$
Z_{ij} \leftarrow Z_{ij} + \text{Linear}\left(\frac{1}{N_{seq}}\sum_s a(M_{s,i}) \otimes b(M_{s,j})\right)
$$

Pair track 的三角操作是 AlphaFold 2 最重要的几何归纳偏置。若 \(i,j,k\) 三个残基构成三角形，那么边 \(i\to j\) 的合理性应受 \(i\to k\) 与 \(k\to j\) 影响。Triangle multiplicative update 通过乘性门控聚合三元组边信息，triangle self-attention 则让一条边以共享端点的其他边为上下文进行注意力更新。

> 💡 关键：三角更新不是显式写入“三角不等式”，而是把三维结构中必须满足的三体一致性变成网络容易学习的信息流模式。

##### Structure Module 与 Invariant Point Attention

Evoformer 输出的 single representation 和 pair representation 会进入 Structure Module。该模块为每个残基维护一个局部刚体框架 \(T_i=(R_i,t_i)\)，并预测 backbone frame 与侧链扭转角。Invariant Point Attention (IPA) 的思想是：query/key/value 不仅有标量特征，也有在残基局部坐标系中定义的点；这些点经当前刚体框架变换到全局坐标后，用距离参与注意力计算。

一个简化的 IPA 注意力权重可以写成：

$$
a_{ij} \propto \text{softmax}_j\left(q_i^\top k_j + b_{ij} - \gamma \sum_p \left\|T_i q_{i,p}^{pt} - T_j k_{j,p}^{pt}\right\|_2^2\right)
$$

由于点之间使用距离项，整体对全局旋转和平移不敏感；由于输出会更新每个残基的刚体框架，坐标预测又具有等变性。这使网络能够在不固定全局坐标系的情况下学习三维几何。

##### FAPE 损失：在局部框架中比较原子位置

AlphaFold 2 的关键结构损失是 Frame Aligned Point Error。对每个参考残基框架 \(i\) 和原子/点 \(j\)，先把真实点 \(x_j\) 与预测点 \(\hat{x}_j\) 分别变换到对应的真实/预测局部框架，再计算距离误差：

$$
\mathcal{L}_{FAPE}
= \frac{1}{Z}\sum_{i,j}
\min\left(
\left\|
T_i^{-1}x_j - \hat{T}_i^{-1}\hat{x}_j
\right\|_2,
d_{clamp}
\right)
$$

这个损失同时关心残基局部朝向和相对位置。它不会因为整条蛋白被整体旋转或平移而变化，但会惩罚局部框架、backbone、side-chain 放置错误。实际训练还加入 distogram 交叉熵、masked MSA 交叉熵、pLDDT 置信度损失、结构 violation loss 等辅助项，可概括为：

$$
\mathcal{L}
= \lambda_{fape}\mathcal{L}_{FAPE}
+ \lambda_{dist}\mathcal{L}_{distogram}
+ \lambda_{msa}\mathcal{L}_{masked\_MSA}
+ \lambda_{conf}\mathcal{L}_{pLDDT}
+ \lambda_{viol}\mathcal{L}_{violation}
$$

##### Recycling 与自蒸馏

Recycling 是 AlphaFold 2 把“反复修模型”的传统结构生物学直觉嵌入神经网络的方式。上一轮输出的坐标会被转成距离/几何特征，加回下一轮的 pair representation；上一轮 single representation 也会参与下一轮输入。与简单堆更深网络相比，recycling 让同一组模块在“已有粗结构”的条件下做细化，尤其有利于域间相对取向和长程接触的修正。

训练数据方面，模型先用 PDB 监督训练，再对大量无标注 Uniclust30 序列生成高置信预测结构，用这些伪标签重新训练。这种 noisy-student 式自蒸馏把未标注序列中的 fold 多样性注入模型，使模型在没有近似模板的新折叠上更稳健。

##### 与传统方法的关键区别

传统 coevolution 方法通常把 MSA 压缩成固定统计量，如 inverse covariance 或 contact score；AlphaFold 2 直接对原始 MSA 做 attention，让模型学习何时信任哪些同源序列。传统距离图方法把几何一致性交给后处理；AlphaFold 2 在 pair track 中用三角信息流提前处理一致性。传统坐标优化依赖手工能量项；AlphaFold 2 则用 IPA 和 FAPE 让最终坐标成为训练目标本身。

#### 🧪 练习题

```yaml
question: "AlphaFold 2 中三角更新机制的核心作用是什么？"
options:
  - "把氨基酸序列翻译成多序列比对"
  - "在残基三元组上更新 pair representation，使残基对关系更符合三维几何一致性"
  - "直接计算所有原子的量子力学能量"
  - "用模板结构替代神经网络预测"
answer: 1
explain: "Triangle multiplicative update 和 triangle self-attention 都围绕残基三元组传播信息，让一条残基对边参考第三个残基相关的边，从而更容易形成可嵌入三维空间的一致结构。"
```
