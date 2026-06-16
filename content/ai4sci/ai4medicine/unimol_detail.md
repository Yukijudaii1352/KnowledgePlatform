### Uni-Mol — 统一分子表征 (Uni-Mol)

```yaml
id: unimol
name: Uni-Mol
full_name: 统一分子表征 (Uni-Mol)
year: '2023'
org: DP Technology
paper_url: https://openreview.net/forum?id=6K2RM6wVqKu
category: foundation
parent: —
motivation: 首个纯3D分子预训练框架
```

#### 📝 一句话总结

Uni-Mol 提出首个面向药物设计的纯 3D 分子预训练框架，用同一类 3D Transformer 预训练分子模型和蛋白口袋模型，解决了传统 1D SMILES/2D 图模型难以直接输入和输出三维几何的问题。它把 3D 坐标恢复、掩码原子预测和下游 3D 任务统一到一个可微的表示学习框架中。

#### 🎯 核心要点

- **双预训练模型**：分子模型使用 209M 个分子 3D 构象预训练，口袋模型使用约 3M 个候选蛋白口袋预训练
- **纯 3D 输入/输出**：原子类型和三维坐标同时作为输入，模型通过 SE(3)-equivariant 坐标头直接输出更新后的 3D 坐标
- **全连接 Transformer 骨架**：不用局部半径图，而是让所有原子两两注意力交互以捕捉长程空间相互作用
- **pair representation**：用原子对欧氏距离和 pair-type aware Gaussian kernel 初始化原子对表示，并把它作为 attention bias 注入原子表示
- **双向通信机制**：atom-to-pair 用注意力中的 \(QK^\top\) 更新 pair 表示，pair-to-atom 用 pair 表示影响 self-attention 权重
- **两类核心预训练任务**：Masked Atom Prediction 预测被遮蔽原子类型，3D Position Recovery 从加噪坐标恢复真实构象
- **多下游适配**：可用于分子性质预测、口袋性质预测、蛋白-配体结合姿态预测和分子构象生成
- **实验覆盖广**：论文报告在 MoleculeNet 14/15 个性质预测任务超过当时 SOTA，并在结合姿态和构象生成等 3D 任务上表现突出
- **工程取舍明确**：用近似标准 Transformer 的高效骨架实现 3D 建模，相比完整 SE(3)-Transformer 显著降低预训练成本

#### 🔬 深入细节

##### 核心示意图

![Uni-Mol 框架图](https://github.com/deepmodeling/Uni-Mol/raw/main/unimol/figure/overview.png)
*图：Uni-Mol 官方仓库中的框架示意。左侧是 209M 分子构象和 3M 候选口袋的预训练数据，中间是 3D Position Recovery 与 Masked Atom Prediction，右侧展示性质预测、构象生成、口袋性质预测和蛋白-配体复合物预测等下游任务。*

##### 算法伪代码

```python
# Uni-Mol 预训练核心流程
for batch in pretraining_loader:
    atom_type, coord, pair_type = batch.atom_type, batch.coord, batch.pair_type

    # 1. 随机选原子，遮蔽原子类型并扰动坐标
    masked = sample_mask(atom_type)
    noisy_atom_type = bert_style_mask(atom_type, masked)
    noisy_coord = coord.clone()
    noisy_coord[masked] = coord[masked] + uniform_noise(radius=1.0)  # paper final setting

    # 2. 用 pairwise distance 初始化 pair representation
    dist = pairwise_euclidean_distance(noisy_coord)
    pair_repr = gaussian_kernel(dist, pair_type)
    atom_repr = atom_embedding(noisy_atom_type)

    # 3. Transformer 中 pair-to-atom 与 atom-to-pair 交替通信
    for layer in unimol_layers:
        atom_repr, pair_repr = layer(atom_repr, pair_repr)

    # 4. 多头预训练目标
    atom_logits = atom_type_head(atom_repr[masked])
    pred_coord = coord_head(atom_repr, pair_repr, noisy_coord)
    pred_dist = pair_distance_head(pair_repr)

    loss_atom = cross_entropy(atom_logits, atom_type[masked])
    loss_coord = smooth_l1(pred_coord[masked], coord[masked])
    loss_dist = smooth_l1(pred_dist, pairwise_euclidean_distance(coord))
    loss_norm = representation_norm_regularizer(atom_repr, pair_repr)

    loss = loss_atom + loss_coord + loss_dist + 0.01 * loss_norm
    optimizer.step(loss)
```

##### 为什么需要纯 3D 预训练

传统分子表示学习通常把分子转成 SMILES 序列或 2D 分子图。SMILES 模型能利用 NLP 工具链，但同一分子有多种字符串写法，而且三维构象、口袋形状和配体姿态不是字符串中的显式变量。2D 图模型保留了拓扑关系，却通常只在局部邻接图上传播消息，长程空间作用和构象变化仍然需要额外特征或后处理。Uni-Mol 的目标是把三维坐标变成模型的一等公民：预训练时输入 3D 坐标，训练目标也要求恢复 3D 坐标，因此下游 3D 任务不再只是把几何当辅助标签。

Uni-Mol 为分子和口袋分别训练两个同构模型。分子模型学习小分子构象空间，口袋模型学习蛋白结合位点的局部 3D 环境；二者可以独立用于性质预测，也可以在蛋白-配体任务中组合使用。这个设计避免把口袋和配体强行塞进同一数据分布，同时保留了统一的 3D backbone 与微调接口。

##### Backbone：用 pair representation 让 Transformer 看见三维空间

普通 Transformer 对输入 token 的排列不敏感，必须依赖 positional encoding 才能区分位置。3D 坐标不能直接用 NLP 中的离散位置编码，因为模型需要对全局平移和旋转不敏感。Uni-Mol 使用任意两原子 \(i,j\) 的欧氏距离 \(d_{ij}=\|\mathbf{x}_i-\mathbf{x}_j\|_2\)，再经过与原子对类型相关的 Gaussian kernel 得到 pair representation：

$$
\mathbf{q}^{0}_{ij}=\mathrm{GaussianKernel}(d_{ij}, t_{ij})
$$

这里 \(t_{ij}\) 表示原子对类型。由于距离在全局旋转和平移下不变，pair representation 能稳定描述 3D 空间关系。模型在每层同时维护 atom representation 和 pair representation，并让二者交互：

$$
\mathbf{q}^{l+1}_{ij}
=\mathbf{q}^{l}_{ij}
+\left\{\frac{\mathbf{Q}^{l,h}_{i}(\mathbf{K}^{l,h}_{j})^\top}{\sqrt d}\mid h\in[1,H]\right\}
$$

$$
\mathrm{Attention}^{l,h}_{ij}
=\mathrm{softmax}\left(
\frac{\mathbf{Q}^{l,h}_{i}(\mathbf{K}^{l,h}_{j})^\top}{\sqrt d}
+q^{l-1,h}_{ij}
\right)\mathbf{V}^{l,h}_{j}
$$

第一式是 atom-to-pair：注意力中的 query-key 相似度反过来更新原子对表示。第二式是 pair-to-atom：pair 表示作为 attention bias，让原子更新时显式感知 3D 距离关系。这样做比完整 SE(3)-Transformer 轻量得多，但仍能让注意力权重学习与距离矩阵和长程相互作用相关的模式。

##### 坐标头：从 invariant 表示恢复 equivariant 坐标

pair representation 本身对全局旋转和平移不变，但坐标输出必须随输入坐标一起旋转和平移。Uni-Mol 用相对坐标向量 \(\mathbf{x}_i-\mathbf{x}_j\) 作为方向基，再用 pair representation 产生标量权重：

$$
\hat{\mathbf{x}}_i
=\mathbf{x}_i+\frac{1}{n}\sum_{j=1}^{n}(\mathbf{x}_i-\mathbf{x}_j)c_{ij}
$$

$$
c_{ij}=\mathrm{ReLU}(\mathrm{Linear}(\mathbf{q}^{L}_{ij}))
$$

直觉上，模型不是凭空输出一个绝对坐标，而是学习“每个邻居应该把当前原子往哪个相对方向推多少”。如果输入整体旋转，所有 \(\mathbf{x}_i-\mathbf{x}_j\) 同步旋转，输出也会同步旋转；如果输入整体平移，相对向量不变，输出会保持同样平移。这就是坐标头的 SE(3)-equivariant 性质。

##### 预训练任务与损失

预训练阶段先随机污染分子或口袋：一部分原子类型被 mask，部分坐标被加噪。论文最终采用半径约 \(1\) Å 的坐标扰动设置。模型需要同时完成三个恢复目标：

$$
\mathcal{L}_{\mathrm{atom}}
=-\sum_{i\in\mathcal{M}}\log p_\theta(a_i\mid \tilde{\mathbf{a}},\tilde{\mathbf{x}})
$$

$$
\mathcal{L}_{\mathrm{coord}}
=\sum_{i\in\mathcal{M}}\mathrm{SmoothL1}(\hat{\mathbf{x}}_i,\mathbf{x}_i)
$$

$$
\mathcal{L}_{\mathrm{dist}}
=\sum_{i,j}\mathrm{SmoothL1}(\hat d_{ij},\|\mathbf{x}_i-\mathbf{x}_j\|_2)
$$

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{atom}}
+\mathcal{L}_{\mathrm{coord}}
+\mathcal{L}_{\mathrm{dist}}
+\lambda\mathcal{L}_{\mathrm{norm}}
$$

其中 \(\mathcal{M}\) 是被 mask 的原子集合，\(\mathcal{L}_{\mathrm{norm}}\) 是稳定混合精度训练的表示范数正则。Masked Atom Prediction 迫使模型从上下文识别化学局部结构，3D Position Recovery 迫使模型学习构象空间中的几何约束，Pair-distance Head 则补充了全局距离矩阵监督。

##### 微调到性质、构象和 docking

对于非 3D 输出任务，例如分子性质、口袋可成药性或结合亲和力，Uni-Mol 使用 `[CLS]` 表示或原子表示平均池化，再接线性头微调。对于蛋白-配体结合任务，分子模型和口袋模型先分别编码配体与口袋，再把表示输入额外的 Uni-Mol decoder 预测配体重原子与口袋重原子之间的 pair-distance matrix；推理时可把预测距离矩阵当作 scoring function，通过反向传播直接优化配体坐标。

这与传统 docking 工具的区别在于，Uni-Mol 学到的是数据驱动的口袋-配体空间兼容性，而不是完全依赖手工势能项和采样规则。论文也承认其 ligand conformation 物理约束还不如成熟 docking 工具完备，因此更适合把 Uni-Mol 的结合位置预测能力与物理/化学感知的构象采样结合使用。

> 💡 关键：Uni-Mol 的核心不是“给 2D 图加一点 3D 特征”，而是让预训练目标本身要求模型从污染坐标中恢复三维分子结构，因此它能自然迁移到构象生成和结合姿态预测这类 3D 输出任务。

#### 🧪 练习题

```yaml
question: "Uni-Mol 为什么要维护 pair representation，并把它加入 self-attention？"
options:
  - "为了把 SMILES token 转换成 SELFIES token"
  - "为了用旋转/平移不变的原子对距离信息影响原子注意力，同时保留全连接长程相互作用"
  - "为了让模型只关注共价键相邻原子，降低到局部图卷积"
  - "为了在预训练时跳过坐标恢复任务"
answer: 1
explain: "pair representation 由原子对距离等 3D 信息初始化，对全局旋转和平移不变；它作为 attention bias 注入 Transformer，使原子更新能显式利用三维空间关系。"
```
