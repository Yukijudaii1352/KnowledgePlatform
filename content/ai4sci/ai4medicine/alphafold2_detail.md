### AlphaFold 2 — AlphaFold第二代 (AlphaFold 2)

```yaml
id: alphafold2
name: AlphaFold 2
full_name: AlphaFold第二代 (AlphaFold 2)
year: '2021'
org: DeepMind
paper_url: https://www.nature.com/articles/s41586-021-03819-2
category: design
parent: —
motivation: 原子级蛋白结构预测革命
```

#### 📝 一句话总结

AlphaFold 2 提出了 Evoformer + Structure Module 的端到端蛋白结构预测框架，把 MSA 进化信息、残基对几何关系和 3D 等变结构更新合在一个可训练网络中，解决了无模板或弱模板蛋白难以达到原子级精度的问题。它用 FAPE、recycling、自蒸馏和置信度头把序列到全原子坐标的预测推到接近实验结构精度。

#### 🎯 核心要点

- **输入统一建模**：从氨基酸序列、MSA、pairing 信息和可用模板构建 MSA representation 与 pair representation
- **Evoformer 主干**：48 个 Evoformer block 在 MSA 轴和 residue-pair 图上反复交换信息，显式建模进化协变与几何一致性
- **三角更新机制**：triangle multiplicative update 与 triangle self-attention 用三元残基关系约束 pair representation，使距离矩阵更像可嵌入 3D 的结构
- **Structure Module**：把每个残基表示为一个 backbone rigid frame 加侧链 torsion angles，通过 Invariant Point Attention 迭代更新 3D 结构
- **FAPE 损失**：Frame Aligned Point Error 在每个局部残基坐标系下比较预测和真实原子位置，强调局部几何、手性和侧链相对取向
- **Recycling**：把预测结构、MSA 表示和 pair 表示回馈到同一个网络多轮 refinement，显著提升长程 packing 和复杂 fold 的准确率
- **辅助目标**：distogram cross-entropy、masked MSA BERT-like loss、pLDDT/pTM 置信度和 violation loss 共同稳定训练
- **自蒸馏**：用已训练模型为约 35 万条无标签 Uniclust 序列生成高置信结构，再与 PDB 数据混合训练
- **CASP14 突破**：在 CASP14 中多数目标达到接近实验结构精度，论文报告中位 backbone \(r.m.s.d._{95}\) 约 0.96 Å

#### 🔬 深入细节

##### 模型架构总览

![AlphaFold 2 总体架构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig1_HTML.png)
*图 1：AlphaFold 2 的整体流程。序列经 genetic database search 得到 MSA，经 structure database search 得到模板；Evoformer 处理 MSA/pair 表示；Structure Module 输出 3D 结构并通过 recycling 回馈。来源：Nature 论文 Figure 1。*

![AlphaFold 2 Evoformer 与 Structure Module](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png)
*图 2：Evoformer block、triangle update、Invariant Point Attention、residue gas 和 FAPE。来源：Nature 论文 Figure 3。*

##### 算法核心流程

```python
# AlphaFold 2 训练/推理核心伪代码

def alphafold2(sequence):
    msa = search_sequence_databases(sequence)        # UniRef90, BFD, MGnify 等
    templates = search_structure_templates(sequence) # HHSearch/PDB70 等

    M = embed_msa(sequence, msa)          # [N_seq, N_res, c_m]
    Z = embed_pair(sequence, templates)   # [N_res, N_res, c_z]
    prev_structure = None

    for recycle in range(num_recycles):
        if prev_structure is not None:
            Z = Z + embed_distogram(prev_structure)

        # 1. Evoformer：MSA 和 pair representation 双向通信
        for block in range(48):
            M = row_attention_with_pair_bias(M, Z)
            M = column_attention(M)
            M = transition(M)
            Z = Z + outer_product_mean(M)
            Z = triangle_multiplicative_update(Z)
            Z = triangle_self_attention(Z)
            Z = transition(Z)

        single = M[0]  # query sequence row

        # 2. Structure Module：从残基 rigid frames 生成全原子坐标
        frames = init_identity_backbone_frames(N_res)
        for layer in range(8):
            single = invariant_point_attention(single, Z, frames)
            frames = update_backbone_frames(frames, single)
            torsion_angles = predict_sidechain_angles(single)

        coords = frames_and_torsions_to_all_atom(frames, torsion_angles)
        prev_structure = coords

    plddt = predict_plddt(single)
    ptm = predict_ptm(Z)
    relaxed_coords = amber_relax(coords)  # 主要去除局部几何违规
    return relaxed_coords, plddt, ptm

# 训练目标：FAPE + distogram CE + masked MSA CE + confidence/violation 等辅助项
```

##### 动机与背景

传统蛋白结构预测主要走两条路：一类用物理能量函数搜索折叠构象，理论自然但搜索空间太大；另一类用进化协变和模板推断接触/距离，再用外部优化器拼成结构。AlphaFold 2 的判断是：蛋白折叠可以被表述为一个带 3D 几何约束的图推理问题，但网络必须在“序列家族的统计规律”和“单个蛋白的三维几何”之间反复通信。

因此 AF2 不再先预测距离图再交给 Rosetta 式搜索，而是直接输出所有 heavy atoms 坐标。它把 MSA 看成 \(N_{\text{seq}}\times N_{\text{res}}\) 的序列家族张量，把残基对看成 \(N_{\text{res}}\times N_{\text{res}}\) 的图边张量，再用 Evoformer 将这两种表示融合。

##### Evoformer：MSA 与 pair 图的双向交换

设 MSA 表示为：

$$
M \in \mathbb{R}^{N_{\text{seq}}\times N_{\text{res}}\times c_m}
$$

pair 表示为：

$$
Z \in \mathbb{R}^{N_{\text{res}}\times N_{\text{res}}\times c_z}
$$

Evoformer 的关键是让 \(M\) 与 \(Z\) 形成闭环。MSA row attention 使用 pair 表示作为 attention bias，使同源序列中每个残基位置的更新受当前结构假设影响：

$$
\text{Attn}_{ij}
\propto
\text{softmax}\left(
\frac{q_i^\top k_j}{\sqrt{d}} + b_{ij}(Z)
\right)
$$

随后 outer product mean 把 MSA 中的协变信息写回 pair representation：

$$
Z_{ij}
\leftarrow
Z_{ij}
+ W\left(
\frac{1}{N_{\text{seq}}}
\sum_s
M_{s,i} \otimes M_{s,j}
\right)
$$

直觉上，如果两个残基在进化中协同突变，它们可能在三维结构中相互接触；但 AF2 不把这种统计量固定为人工特征，而是在每个 Evoformer block 内不断重新估计。

##### 三角更新：让 pair 表示像真实 3D 几何

一个任意的残基对矩阵不一定能对应某个三维结构。真实几何必须满足三角一致性：若 \(i\) 接近 \(k\)，\(k\) 接近 \(j\)，则 \(i\) 与 \(j\) 的关系会受第三个点 \(k\) 约束。Evoformer 用两类操作注入这种归纳偏置：

$$
Z_{ij}
\leftarrow
Z_{ij}
+ \sum_k
\phi_{\text{out}}(Z_{ik}, Z_{jk})
+ \sum_k
\phi_{\text{in}}(Z_{ki}, Z_{kj})
$$

triangle multiplicative update 用两条边更新第三条边；triangle self-attention around starting/ending node 则让 \(Z_{ij}\) 在以 \(i\) 或 \(j\) 为中心的三角关系中聚合信息。这使网络能更早形成一个粗略结构假设，并在深层持续修正。

##### Structure Module：残基气体与 Invariant Point Attention

AF2 的 Structure Module 不直接把序列表示映射成一串坐标，而是把每个残基表示为一个自由漂浮的刚体 frame：

$$
T_i = (R_i, t_i)
$$

其中 \(R_i\) 是旋转，\(t_i\) 是平移，主要描述 N-Cα-C backbone frame；侧链通过 \(\chi\) torsion angles 放置。论文称这种表示为 residue gas，因为在模块内部多肽链约束可以暂时放松，各残基可以并行局部调整，最后再用 violation loss 和 Amber relaxation 修正几何违规。

Invariant Point Attention (IPA) 把普通 attention 的 query/key/value 扩展到 3D 点。每个残基在自身局部坐标系中生成 query/key 点，再投影到全局坐标系比较距离：

$$
a_{ij}
\propto
\text{softmax}_j
\left(
q_i^\top k_j
+ b_{ij}
- \sum_p w_p
\left\|
T_i q_{i,p}^{\text{point}}
- T_j k_{j,p}^{\text{point}}
\right\|^2
\right)
$$

由于距离项对整体旋转和平移不变，IPA 可以在当前 3D 假设上做几何感知的注意力；而 frame update 在局部坐标系中应用，使整体结构更新对旋转/平移等变。

##### FAPE：局部坐标系下的全原子误差

AF2 的核心结构损失是 Frame Aligned Point Error。对每个参考 frame \(k\) 和每个原子 \(i\)，先把预测坐标 \(x_i\) 和真实坐标 \(x_i^\*\) 都变换到对应 frame 的局部坐标系，再比较距离：

$$
\mathcal{L}_{\text{FAPE}}
= \frac{1}{N_{\text{frame}}N_{\text{atom}}}
\sum_{k,i}
\min\left(
\left\|
T_k^{-1}x_i - {T_k^\*}^{-1}x_i^\*
\right\|_2,\ d_{\text{clamp}}
\right)
$$

FAPE 的好处是不会因为整体刚体旋转/平移而惩罚模型，却会强烈惩罚“相对某个残基局部坐标系的原子位置错误”。这让网络更重视侧链相互作用、局部手性和界面几何，而不仅是全局 RMSD。

完整训练目标可以概括为：

$$
\mathcal{L}
= \lambda_{\text{FAPE}}\mathcal{L}_{\text{FAPE}}
+ \lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
+ \lambda_{\text{msa}}\mathcal{L}_{\text{maskedMSA}}
+ \lambda_{\text{conf}}\mathcal{L}_{\text{pLDDT/pTM}}
+ \lambda_{\text{viol}}\mathcal{L}_{\text{violation}}
$$

其中 distogram loss 监督 pair 表示中的距离分布，masked MSA loss 类似 BERT 预测被 mask 的 MSA token，置信度头学习 pLDDT 和 pTM，violation loss 在 fine-tuning 中减少肽键和局部立体化学错误。

##### Recycling 与自蒸馏

Recycling 是 AF2 从“单次预测器”变成“迭代 refinement 系统”的关键。网络一次输出结构后，会把结构的距离信息、MSA 表示和 pair 表示重新送回同一个 trunk：

$$
(M^{r+1}, Z^{r+1}, X^{r+1})
= f_{\theta}(M^{r}, Z^{r}, X^{r})
$$

这种递归不是后处理优化，而是模型训练时就学习“看到自己上一次的结构假设后如何修正”。对于多结构域 packing、远程接触和难折叠目标，recycling 可以让粗结构逐步变成稳定预测。

自蒸馏则解决 PDB 标注结构数量有限的问题。DeepMind 先训练初始 AF2，再给约 355,993 条 Uniclust30 序列预测结构，筛选高置信结果后与 PDB 数据混合训练最终模型。这样模型不仅学习实验结构，也学习自己在大规模无标签序列上的高置信归纳。

##### 与传统方法的区别与局限

AF2 相比传统 contact/distance pipeline 的本质区别是端到端：网络内部已经形成结构假设并直接输出坐标，不需要外部采样器把距离约束折成三维结构。相比纯物理模拟，它不显式搜索折叠自由能景观，而是从 PDB、MSA 和自蒸馏数据中学习结构先验。

局限也来自这个设定。AF2 主要面向单链或同源复合物，原版对异源复合物、蛋白-小分子、核酸、金属离子、构象 ensemble 和显式动力学支持有限；当 MSA 很浅、蛋白状态受配体/伙伴强烈诱导，或目标包含无序区域时，pLDDT/PAE 的不确定性需要被认真对待。

#### 🧪 练习题

```yaml
question: "AlphaFold 2 的 FAPE 损失为什么要在局部残基 frame 中比较原子坐标？"
options:
  - "为了让模型忽略所有侧链原子，只预测 Cα 坐标"
  - "为了消除整体旋转/平移影响，同时强化原子相对局部残基取向的正确性"
  - "为了把蛋白结构预测转化为纯序列分类问题"
  - "为了避免使用任何 MSA 信息"
answer: 1
explain: "FAPE 把预测和真实原子坐标都变换到局部 frame 后比较，因此对全局刚体变换不敏感，但会惩罚局部几何、侧链取向和手性错误。"
```
