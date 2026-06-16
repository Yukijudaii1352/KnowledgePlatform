### Uni-Mol (Uni-Mol)

```yaml
id: unimol
name: Uni-Mol
full_name: Uni-Mol (Uni-Mol)
year: '2023.04'
org: 深势科技
paper_url: https://openreview.net/forum?id=6K2RM6wVqKu
category: drug_discovery
parent: —
motivation: 统一三维分子与蛋白质表征学习
```

#### 📝 一句话总结

Uni-Mol 提出统一的 3D molecular representation learning 框架，用同构的 SE(3) Transformer 分别预训练小分子模型和蛋白口袋模型，并通过掩码原子、坐标去噪和距离矩阵恢复把 3D 几何直接纳入分子性质预测、构象生成和蛋白-配体结合位姿预测。

#### 🎯 核心要点

- **双预训练模型**：molecular model 训练于 209M 小分子 3D conformations；pocket model 训练于 3M candidate protein pockets；两者架构相同但词表和数据不同
- **统一 3D 输入**：每个原子/口袋原子以 token、3D 坐标和 pairwise distance 输入，额外加入 `[CLS]` 表示整体分子或口袋
- **Transformer + pair bias**：用距离的 Gaussian basis function 和 edge type 构造 attention bias，使自注意力直接感知三维几何
- **三重预训练目标**：masked atom prediction、masked coordinate denoising、masked pair-distance prediction 同时优化
- **坐标更新头**：由 pair representation 预测原子间相对位移权重，通过 \(\sum_j (x_i-x_j)w_{ij}\) 形式更新被噪声扰动的坐标
- **多任务迁移**：分子性质预测只用 molecular model；口袋性质预测只用 pocket model；蛋白-配体位姿预测同时使用 molecule 与 pocket 表征
- **实验覆盖广**：OpenReview 论文报告在 15 个分子性质任务中 14 个达到 SOTA，并在构象生成、binding pose prediction 和 pocket druggability few-shot 等 3D 空间任务中表现突出
- **官方资源完整**：论文、代码、预训练权重和数据均公开；框架图可访问 `https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png`

#### 🔬 深入细节

![Uni-Mol framework overview](https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png)
*图：Uni-Mol 官方仓库中的框架示意图。左侧展示分子与蛋白口袋的两类预训练模型，中间是 3D Transformer 表征学习，右侧是性质预测、构象生成、口袋任务和蛋白-配体结合位姿预测等下游应用。*

##### 算法伪代码

```python
# Uni-Mol pretraining and downstream transfer
def unimol_pretrain(batch, model, lambda_tok=1, lambda_coord=5, lambda_dist=10):
    tokens, coord, edge_type = batch.atom_tokens, batch.coord, batch.edge_type
    coord = add_cls_atom_at_center(coord)
    tokens = add_cls_token(tokens)

    # 1. 15% atoms are masked; coordinates are corrupted by uniform noise
    mask = sample_atom_mask(tokens, ratio=0.15)
    tokens_in = replace(tokens, mask, "[MASK]")
    coord_noisy = coord.clone()
    coord_noisy[mask] += uniform(-1.0, 1.0, size=(mask.sum(), 3))

    # 2. Pairwise distance becomes pair attention bias
    dist = pairwise_distance(coord_noisy)
    pair_bias = gaussian_basis(dist, edge_type)

    # 3. SE(3)-aware Transformer encoder
    atom_repr, pair_repr = model(tokens_in, dist, coord_noisy, pair_bias)

    # 4. Three pretraining heads
    logits_atom = atom_head(atom_repr[mask])
    coord_pred = coord_head(pair_repr, coord_noisy)[mask]
    dist_pred = distance_head(pair_repr)[mask, :]

    loss_tok = cross_entropy(logits_atom, tokens[mask])
    loss_coord = smooth_l1(coord_pred, coord[mask])
    loss_dist = smooth_l1(normalize(dist_pred), normalize(pairwise_distance(coord)[mask, :]))
    return lambda_tok * loss_tok + lambda_coord * loss_coord + lambda_dist * loss_dist

def unimol_binding_pose(protein_pocket, ligand):
    pocket_h = pocket_unimol(protein_pocket).cls_and_pair_repr()
    ligand_h = molecular_unimol(ligand).cls_and_pair_repr()
    cross_distance = binding_pose_head(pocket_h, ligand_h)
    pose = optimize_ligand_pose(ligand.initial_conformer, cross_distance)
    return pose
```

##### 为什么 1D/2D 分子表示不够

传统 molecular representation learning 常把 SMILES 当作 1D 序列，或把分子拓扑当作 2D 图。它们能覆盖原子连接关系，却很难直接表达构象、手性、远程空间接触、蛋白口袋几何互补等 3D 信息。药物设计中的很多任务本质上依赖三维结构：构象生成要输出坐标，docking 要预测配体在口袋中的位置和取向，结合亲和力也强依赖氢键、疏水接触、空间排斥等几何关系。

Uni-Mol 的设计目标是把 3D 坐标作为一等公民，而不是在 2D 图模型后面外挂几何特征。模型输入包含原子 token、原子坐标 \(x_i \in \mathbb{R}^3\)、原子对距离 \(d_{ij}=\|x_i-x_j\|_2\) 和边类型 \(e_{ij}\)。距离不是简单拼到节点特征中，而是转成 pair attention bias 影响任意两原子的注意力：

$$
b_{ij}=\operatorname{MLP}(\operatorname{GBF}(d_{ij}, e_{ij}))
$$

其中 GBF 是 Gaussian basis function expansion。这样每个注意力头都能根据空间距离和原子对类型调整信息传递强度。

##### 三重预训练目标

Uni-Mol 预训练的核心是让模型同时恢复“化学身份”和“几何结构”。被掩码原子的 token loss 是：

$$
\mathcal{L}_{\text{atom}}
=-\sum_{i \in M}\log p_\theta(a_i \mid A_{\setminus M}, X_{\text{noisy}})
$$

如果只做 atom prediction，模型可能利用 3D 位置泄漏的信息轻易猜出原子类型，学不到强表征。因此论文对被选中原子的坐标加入均匀噪声，并要求模型恢复真实坐标和距离矩阵：

$$
\mathcal{L}_{\text{coord}}
=\operatorname{SmoothL1}(\hat{x}_i, x_i), \qquad
\mathcal{L}_{\text{dist}}
=\operatorname{SmoothL1}(\hat{d}_{ij}, d_{ij})
$$

总目标可写为：

$$
\mathcal{L}
=\lambda_{\text{atom}}\mathcal{L}_{\text{atom}}
+\lambda_{\text{coord}}\mathcal{L}_{\text{coord}}
+\lambda_{\text{dist}}\mathcal{L}_{\text{dist}}
+\lambda_x\mathcal{L}_{x\text{-norm}}
+\lambda_{\Delta p}\mathcal{L}_{\Delta\text{pair-norm}}
$$

官方训练配置中 molecular pretraining 常使用 `masked_token_loss=1`、`masked_coord_loss=5`、`masked_dist_loss=10`，说明几何恢复在预训练中被显式加权。

##### 坐标头如何从 pair 表征恢复 3D 结构

Uni-Mol 的坐标恢复不是直接对每个原子输出绝对坐标，而是利用 pair representation 预测相对位移的权重。源码中的简化更新形式为：

$$
\Delta x_i=\frac{1}{N}\sum_j (x_i-x_j)\,w_{ij}, \qquad
\hat{x}_i=x_i+\Delta x_i
$$

其中 \(w_{ij}\) 来自 pair representation 的投影。这个形式天然依赖相对坐标，因此对整体平移不敏感；如果分子整体移动，\((x_i-x_j)\) 不变，模型预测的几何修正也保持一致。距离头则从 pair representation 预测 \(\hat{d}_{ij}\)，迫使 pair 通道保留全局几何一致性。

##### 分子模型与口袋模型为何分开训练

小分子和蛋白口袋都可以表示为原子集合，但数据分布差异很大：小分子有明确化学键、构象库和药物样属性；口袋来自蛋白局部环境，残基类型、空间约束和生物大分子上下文不同。Uni-Mol 因此用相同架构训练两个模型：molecular model 学小分子构象和性质，pocket model 学蛋白局部结合环境。下游任务按需组合：

- 分子性质预测：取 molecular model 的 `[CLS]` 表征接 MLP head
- 口袋 druggability：取 pocket model 的 `[CLS]` 表征做分类或回归
- 蛋白-配体结合位姿：联合 pocket 与 ligand 表征，预测跨分子几何约束，再优化配体构象

这种拆分让 Uni-Mol 既能作为通用分子 encoder，又能在 docking 场景中显式建模 pocket-ligand 互补。

##### 与后续 docking diffusion 方法的区别

Uni-Mol 的原始论文不是扩散 docking 模型。它更像“3D 表征基座”：先通过大规模 3D 预训练得到稳定的原子级和分子级表征，再把表征迁移到具体任务。DiffDock/PhysDock 这类方法把 docking 本身建模为生成过程；Uni-Mol 则先学习分子与口袋的几何语言，再用下游头或优化过程完成位姿预测。优势是任务覆盖广、可复用性强；不足是原始 Uni-Mol 的 docking 生成能力不如后续专门面向 realistic docking 的 Uni-Mol Docking V2 或 diffusion docking 方法。

> 💡 关键：Uni-Mol 的贡献在于把“原子 token + 3D 坐标 + pair distance”组织成一个统一预训练问题，让同一个 3D Transformer 可以服务性质、构象、口袋和蛋白-配体任务。

#### 🧪 练习题

```yaml
question: "Uni-Mol 预训练中加入坐标去噪和 pair-distance prediction 的主要目的是什么？"
options:
  - "让模型只学习 SMILES 语法，避免使用三维坐标"
  - "防止 masked atom prediction 过于简单，同时迫使表征编码真实 3D 几何"
  - "把分子坐标固定为二维平面，便于图卷积计算"
  - "删除蛋白口袋模型，只保留小分子性质预测"
answer: 1
explain: "Uni-Mol 对部分原子坐标加噪，并要求恢复坐标和距离矩阵；这样模型不能只靠泄漏的空间位置猜原子类型，而必须学习可迁移的三维分子几何。"
```
