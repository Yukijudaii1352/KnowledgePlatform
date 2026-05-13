### Uni-Mol — 通用3D分子表示学习框架

```yaml
id: unimol
name: Uni-Mol
full_name: "通用3D分子表示学习框架 (Universal 3D Molecular Representation Learning Framework)"
year: 2023
org: DP Technology
paper_url: "https://openreview.net/forum?id=6K2RM6wVqKu"
category: representation
parent: gemnet
motivation: "首个纯3D分子预训练框架，通过SE(3) Transformer骨干网络和大规模3D预训练，统一处理分子性质预测、构象生成与蛋白-配体对接任务"
```

#### 📝 一句话总结

Uni-Mol 提出了首个通用的 3D 分子预训练框架，通过高效的 SE(3)-invariant Transformer 骨干网络在 2.09 亿分子构象和 300 万蛋白口袋数据上进行预训练，利用 3D 坐标去噪和掩码原子预测两个自监督任务学习 3D 空间表示，在分子性质预测（14/15 SOTA）、蛋白-配体对接和构象生成等下游任务上全面超越现有方法。

#### 🎯 核心要点

- **双模型预训练架构**：分子模型（209M 构象预训练）和口袋模型（3M 蛋白口袋预训练）共享同一 SE(3) Transformer 骨干
- **高效 SE(3) Transformer 骨干**：基于 Pre-LayerNorm Transformer，引入原子表示（atom representation）和对表示（pair representation）双通道，通过不变性空间位置编码（Euclidean 距离 + Gaussian 核）编码 3D 信息
- **双向通信机制**：atom-to-pair（QK 乘积更新 pair 表示）和 pair-to-atom（pair 表示作为注意力偏置），实现原子级与对级表示的信息交互
- **两个预训练任务**：3D 坐标去噪恢复（coordinate denoising）+ 15% 掩码原子类型预测（masked atom prediction）
- **3D 坐标直接输入/输出**：首个能直接以 3D 坐标作为输入和输出的分子预训练框架，支持构象生成和对接等 3D 空间任务
- **多任务微调策略**：分子性质预测（CLS token + MLP）、构象生成（迭代坐标优化）、对接（双模型联合 + 距离矩阵打分）
- **MoleculeNet 14/15 SOTA**；CASF-2016 对接 Top-1 成功率 91.2%；RMSD ≤ 2Å 占比 80.35%（较最佳基线提升 22.58%）

#### 🔬 深入细节

![Uni-Mol 框架总览](https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png)
*图：Uni-Mol 预训练与微调框架示意。上方为预训练阶段（分子模型 + 口袋模型），下方为多种下游任务微调。*

##### 算法伪代码

```python
# Uni-Mol 骨干网络前向传播伪代码
def unimol_forward(atom_types, coordinates, n_layers):
    # 初始化
    x = Embedding(atom_types)                          # atom repr: [N, d]
    d_ij = pairwise_euclidean(coordinates)             # [N, N]
    q = gaussian_kernel(d_ij, pair_types)              # pair repr: [N, N, H]

    for l in range(n_layers):
        # === Self-Attention with pair-to-atom communication ===
        Q, K, V = linear_qkv(LayerNorm(x))            # [N, H, d/H]
        attn_logits = Q @ K.T / sqrt(d) + q           # pair repr as bias
        attn_weights = softmax(attn_logits)
        x = x + attn_weights @ V                      # update atom repr

        # === Atom-to-pair communication ===
        q = q + concat_heads(Q @ K.T / sqrt(d))       # QK product → pair repr

        # === FFN ===
        x = x + FFN(LayerNorm(x))

    return x, q  # atom representations, pair representations

# 预训练任务
def pretrain_step(atom_types, coordinates):
    # 1. 掩码原子预测：随机掩码 15% 原子
    masked_types, mask_indices = random_mask(atom_types, ratio=0.15)

    # 2. 坐标去噪：对坐标添加均匀噪声
    noisy_coords = coordinates + uniform_noise(-1, 1)

    # 前向传播
    x, q = unimol_forward(masked_types, noisy_coords, N)

    # 损失计算
    L_atom = CrossEntropy(atom_head(x[mask_indices]), atom_types[mask_indices])
    L_coord = SmoothL1(coord_head(x, q), coordinates)  # 恢复原始坐标
    L_dist = SmoothL1(dist_head(q), pairwise_dist(coordinates))  # 恢复原子对距离
    return L_atom + L_coord + L_dist
```

##### 动机与背景

分子表示学习（MRL）在药物设计中至关重要，但现有方法存在根本性局限：**大多数方法将分子视为 1D 序列（SMILES）或 2D 拓扑图，无法充分利用决定分子性质的 3D 空间信息**。虽然部分工作（如 GraphMVP、GEM）尝试引入 3D 信息，但它们仅将 3D 作为辅助监督信号，无法直接以 3D 坐标作为输入/输出，因此无法处理构象生成、对接等真正的 3D 空间任务。Uni-Mol 的核心动机是构建一个**纯 3D 的通用分子预训练框架**，让 3D 坐标既是输入也是输出。

##### 核心机制：SE(3)-Invariant Transformer

Uni-Mol 选择 Transformer 而非 GNN 作为骨干，原因在于 Transformer 的全连接注意力能捕获**长程原子间交互**，而 GNN 受限于局部连接图。但标准 Transformer 无法处理 3D 空间数据，因此 Uni-Mol 引入了以下关键修改：

**1. 不变性空间位置编码（Invariant Spatial Positional Encoding）**

给定原子坐标 \(\mathbf{r}_i, \mathbf{r}_j\)，计算欧氏距离：

$$d_{ij} = \|\mathbf{r}_i - \mathbf{r}_j\|_2$$

然后通过对类型感知的 Gaussian 核将标量距离映射为向量表示：

$$\phi_k(d_{ij}) = \exp\left(-\beta_k (d_{ij} - \mu_k)^2\right), \quad k = 1, \ldots, K$$

其中 \(\mu_k\) 和 \(\beta_k\) 是可学习参数。这种编码对全局旋转和平移不变（SE(3)-invariant），因为仅依赖原子对距离。

**2. 双通道表示与双向通信**

Uni-Mol 维护两种表示：
- **原子表示** \(\mathbf{x}_i \in \mathbb{R}^d\)：由原子类型嵌入初始化
- **对表示** \(\mathbf{q}_{ij} \in \mathbb{R}^H\)：由空间位置编码初始化

两者通过双向通信机制交互：

**Pair-to-Atom**（对表示作为注意力偏置）：

$$\text{Attention}(\mathbf{Q}_i^{l,h}, \mathbf{K}_j^{l,h}, \mathbf{V}_j^{l,h}) = \text{softmax}\left(\frac{\mathbf{Q}_i^{l,h} (\mathbf{K}_j^{l,h})^T}{\sqrt{d}} + q_{ij}^{l-1,h}\right) \mathbf{V}_j^{l,h}$$

> 💡 **关键直觉**：对表示 \(q_{ij}\) 编码了原子 \(i, j\) 之间的空间距离信息，将其加到注意力 logits 上，使得空间上更近的原子对获得更高的注意力权重，从而让模型"感知"3D 结构。

**Atom-to-Pair**（QK 乘积更新对表示）：

$$\mathbf{q}_{ij}^{l+1} = \mathbf{q}_{ij}^l + \left\{\frac{\mathbf{Q}_i^{l,h} (\mathbf{K}_j^{l,h})^T}{\sqrt{d}} \;\middle|\; h \in [1, H]\right\}$$

> 💡 **关键直觉**：注意力的 QK 乘积反映了原子间的语义相关性，将其反馈到对表示中，使得对表示不仅包含几何距离信息，还融合了化学语义信息。

**3. 坐标预测头（SE(3)-Equivariant Output）**

虽然内部表示是 SE(3)-invariant 的，但 Uni-Mol 通过巧妙的坐标预测头实现了 SE(3)-equivariant 的坐标输出：

$$\Delta \mathbf{r}_i = \frac{1}{N} \sum_{j \neq i} f(\mathbf{q}_{ij}) \cdot \frac{\mathbf{r}_i - \mathbf{r}_j}{\|\mathbf{r}_i - \mathbf{r}_j\| + \epsilon}$$

其中 \(f(\cdot)\) 是从对表示到标量的映射。方向向量 \(\frac{\mathbf{r}_i - \mathbf{r}_j}{\|\mathbf{r}_i - \mathbf{r}_j\|}\) 提供等变性，而 \(f(\mathbf{q}_{ij})\) 提供不变的标量权重。

##### 预训练策略

Uni-Mol 使用两个互补的预训练任务：

**任务 1：3D 坐标去噪恢复（Coordinate Denoising）**

对输入坐标添加均匀噪声 \(\boldsymbol{\delta} \sim U(-1, 1)\)，模型需恢复原始坐标。损失包含两部分：

$$\mathcal{L}_{\text{coord}} = \frac{1}{N}\sum_i \text{SmoothL1}(\hat{\mathbf{r}}_i, \mathbf{r}_i) + \frac{1}{N^2}\sum_{i,j} \text{SmoothL1}(\hat{d}_{ij}, d_{ij})$$

第一项直接监督坐标恢复，第二项监督原子对距离恢复，两者共同约束 3D 结构重建。

> ⚠️ **注意**：坐标去噪任务的设计灵感来自去噪自编码器（Denoising Autoencoder），但应用在 3D 空间中——这迫使模型学习原子间的空间关系和化学键约束，而不仅仅是记忆坐标值。

**任务 2：掩码原子预测（Masked Atom Prediction）**

随机掩码 15% 的原子类型（替换为特殊 [MASK] token），模型预测被掩码原子的类型。这类似于 BERT 的 MLM 任务，但在 3D 上下文中进行：

$$\mathcal{L}_{\text{atom}} = -\frac{1}{|\mathcal{M}|}\sum_{i \in \mathcal{M}} \log P(\text{type}_i | \mathbf{x}_i)$$

##### 微调策略

Uni-Mol 针对不同下游任务设计了专门的微调策略：

| 任务类型 | 微调方式 | 关键设计 |
|---------|---------|---------|
| 分子性质预测 | CLS token + MLP | 初始构象由 RDKit 生成，无需实验3D数据 |
| 构象生成 | 迭代坐标优化 | 从 RDKit 初始构象出发，多轮前向传播逐步优化坐标 |
| 蛋白-配体对接 | 双模型联合 | 分子模型 + 口袋模型分别编码，学习距离矩阵打分函数 |
| 口袋性质预测 | 口袋模型 + MLP | 利用口袋预训练模型的表示 |

**对接任务的特殊设计**：将分子模型和口袋模型的对表示拼接，学习一个预测蛋白-配体原子对距离的打分函数。然后通过优化配体坐标使预测距离与实际距离匹配，实现对接姿态预测。

##### 预训练数据规模

- **分子数据**：从 2.09 亿个分子构象中预训练（来自 19M 分子，每个分子最多 11 个构象，由 RDKit ETKDG + MMFF94 力场生成）
- **口袋数据**：从 AlphaFold2 预测结构中提取 300 万候选蛋白口袋（使用 fpocket 工具检测）
- **模型规模**：~48M 参数（分子模型），15 层 Transformer，隐藏维度 512，注意力头 64

##### 与传统方法的区别

| 特性 | 1D/2D MRL (SMILES-BERT, MolCLR) | 3D-辅助 MRL (GraphMVP, GEM) | **Uni-Mol** |
|------|------|------|------|
| 3D 信息使用 | ❌ 无 | ⚠️ 仅作辅助监督 | ✅ 直接输入/输出 |
| 构象生成 | ❌ 不支持 | ❌ 不支持 | ✅ 迭代优化 |
| 对接任务 | ❌ 不支持 | ❌ 不支持 | ✅ 双模型联合 |
| 预训练数据 | 2D 图/SMILES | 2D+3D 对比 | 纯 3D 构象 |
| 位置编码 | 序列/图位置 | 键角/键长 | 欧氏距离 Gaussian 核 |

#### 🧪 练习题

```yaml
question: "Uni-Mol 中 pair representation 的初始化方式和更新机制分别是什么？"
options:
  - "由原子类型嵌入初始化，通过 FFN 更新"
  - "由欧氏距离 Gaussian 核初始化，通过注意力 QK 乘积更新"
  - "由键角和键长初始化，通过消息传递更新"
  - "由随机初始化，通过对比学习更新"
answer: 1
explain: "Pair representation 由原子对欧氏距离经 Gaussian 核编码初始化（SE(3)-invariant），在每层通过 atom-to-pair 通信（即注意力的 QK 乘积）进行更新，融合几何与语义信息。"
```