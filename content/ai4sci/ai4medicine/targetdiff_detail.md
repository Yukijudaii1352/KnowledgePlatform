### 靶点条件扩散生成 (TargetDiff)

```yaml
id: targetdiff
name: TargetDiff
full_name: 靶点条件扩散生成 (TargetDiff)
year: '2023'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2303.03543
category: generation
parent: diffsbdd
motivation: 蛋白口袋几何约束的条件扩散
```

#### 📝 一句话总结

TargetDiff 提出面向蛋白靶点的 3D 等变扩散模型，用非自回归方式联合生成配体原子坐标和离散原子类型，同时把生成模型的去噪不确定性和隐藏表征用于候选分子的亲和力排序与预测。

#### 🎯 核心要点

- **目标感知 3D 生成**：输入蛋白 binding site 原子集合，生成能占据口袋的配体原子坐标与原子类型
- **非自回归扩散采样**：整个配体点云一起从噪声去噪，避免逐原子生成的顺序偏置和 exposure bias
- **坐标与原子类型双扩散**：坐标采用高斯扩散，原子类型采用 categorical diffusion，分别拥有闭式前向分布和后验
- **SE(3) 等变 GNN 参数化反向过程**：蛋白与配体原子共同构图，边类型区分 protein-protein、ligand-ligand、protein-ligand，相互作用在 3D 空间中显式建模
- **质心平移操作保证不变 likelihood**：把蛋白原子 CoM 移到零，并用等变网络参数化 Markov transition，使复合物整体旋转和平移不改变 likelihood
- **蛋白坐标固定、配体坐标更新**：GNN 坐标更新使用 ligand mask，只移动待生成配体原子
- **亲和力无监督特征**：用 \(t=0\) 的一次前向推理得到原子类型分布熵和 hidden embedding，作为结合亲和力 ranking/prediction 信号
- **CrossDocked2020 基准**：训练使用筛选后的 100,000 个复合物，测试 100 个新蛋白口袋，并与 liGAN、AR、Pocket2Mol、GraphBP 对比

#### 🔬 深入细节

![TargetDiff 模型总览](https://ar5iv.labs.arxiv.org/html/2303.03543/assets/x1.png)
*图 1：TargetDiff 的前向扩散逐步破坏配体坐标和原子类型，反向生成过程在蛋白口袋条件下恢复配体分布。*

![TargetDiff 生成分子距离分布评估](https://ar5iv.labs.arxiv.org/html/2303.03543/assets/x2.png)
*图 2：TargetDiff 与基线在全原子距离和 C-C 距离分布上的对比；距离分布越接近真实分子，说明生成结构越符合化学几何。图像来自论文 ar5iv HTML，可访问来源为 `https://ar5iv.labs.arxiv.org/html/2303.03543`。*

```python
# TargetDiff 训练、采样与亲和力特征提取伪代码
def train_targetdiff(ligand, protein):
    x0, v0 = ligand.coords, ligand.atom_type_onehot
    xp, vp = protein.coords, protein.atom_features

    # 平移到蛋白口袋 CoM 为零，蛋白在后续坐标更新中固定
    xp_com = xp.mean(axis=0, keepdims=True)
    x0, xp = x0 - xp_com, xp - xp_com

    t = uniform_integer(1, T)
    xt = gaussian_forward_noise(x0, t)       # 连续坐标扩散
    vt = categorical_forward_noise(v0, t)    # 离散原子类型扩散

    x0_hat, v0_hat, hidden = se3_gnn(
        ligand_noisy=(xt, vt),
        protein_context=(xp, vp),
        t=t,
        freeze_protein_coords=True,
    )

    loss_x = coordinate_kl_or_mse(x0_hat, x0, xt, t)
    loss_v = categorical_kl(v0_hat, v0, vt, t)
    optimizer.step(loss_x + lambda_v * loss_v)


def sample_targetdiff(protein):
    n = sample_num_ligand_atoms(pocket_size=protein.size)
    xt = standard_normal([n, 3])
    vt = uniform_categorical([n, num_atom_types])

    for t in reversed(range(1, T + 1)):
        x0_hat, v0_hat, _ = se3_gnn((xt, vt), protein, t)
        xt = sample_coordinate_posterior(xt, x0_hat, t)
        vt = sample_categorical_posterior(vt, v0_hat, t)

    molecule = openbabel_reconstruct_bonds(xt, argmax(vt))
    return molecule


def affinity_features(protein, ligand):
    # t=0 一次前向，不更新坐标分支，只读去噪类型分布和 hidden embedding
    atom_type_prob, hidden = targetdiff_forward_t0(
        protein, ligand, freeze_coordinate_update=True
    )
    entropy_score = entropy(atom_type_prob).mean()
    return concat(entropy_score, pool(hidden))
```

**动机与背景：为什么靶点条件生成不能只靠自回归放原子？**

靶点条件药物设计要求模型同时理解小分子内部几何和蛋白口袋的空间约束。voxel 生成模型可以把口袋和配体放进三维网格，但体素数随空间尺寸立方增长，且普通 3D CNN 不具备旋转等变性。Pocket2Mol、AR、GraphBP 等点云方法能显式建模原子坐标，却通常逐原子采样：前几个原子缺少上下文，后续生成又依赖已经采样出的局部结构，训练和推理分布不一致。TargetDiff 的核心改动是把配体作为完整 3D 点云进行扩散去噪，每一步都同时调整所有原子，使模型能在全局层面考虑“这个分子是否占满口袋、局部键长是否合理、原子类型是否匹配相互作用”。

**扩散过程：坐标用高斯，类型用类别转移矩阵。**

TargetDiff 把配体表示为 \(M=[\mathbf{x},\mathbf{v}]\)，其中 \(\mathbf{x}\in\mathbb{R}^{n\times 3}\) 是坐标，\(\mathbf{v}\in\{0,1\}^{n\times K}\) 是原子类型 one-hot。坐标前向扩散为：

$$
q(\mathbf{x}_t\mid \mathbf{x}_{t-1})
=\mathcal{N}(\mathbf{x}_t;\sqrt{1-\beta_t}\mathbf{x}_{t-1},\beta_t\mathbf{I})
$$

原子类型前向扩散使用 categorical transition，把真实类别逐步混向均匀分布：

$$
q(\mathbf{v}_t\mid \mathbf{v}_{t-1})
=\mathrm{Cat}\left(\mathbf{v}_t;\,(1-\beta_t)\mathbf{v}_{t-1}+\beta_t/K\right)
$$

因此任意时间步都可直接从 \(\mathbf{x}_0,\mathbf{v}_0\) 采样，且坐标后验和类别后验都有闭式形式。反向过程让网络预测 \(\hat{\mathbf{x}}_0,\hat{\mathbf{v}}_0\)，再代入后验得到 \(p_\theta(M_{t-1}\mid M_t,P)\)。

**SE(3) 等变参数化：蛋白-配体复合物作为一张异质几何图。**

蛋白口袋表示为 \(P=\{(\mathbf{x}^P_i,\mathbf{v}^P_i)\}_{i=1}^{N_P}\)，包含蛋白原子坐标、元素类型和氨基酸类型等特征。TargetDiff 将蛋白和配体原子放入同一图中，边特征标记连接属于 protein-protein、ligand-ligand 还是 protein-ligand。第 \(\ell\) 层可概括为：

$$
\mathbf{m}_{ij}^{\ell}=\phi_m\left(\mathbf{h}_i^\ell,\mathbf{h}_j^\ell,\|\mathbf{x}_i^\ell-\mathbf{x}_j^\ell\|^2,\mathbf{e}_{ij},t\right)
$$

$$
\mathbf{h}_i^{\ell+1}=\phi_h\left(\mathbf{h}_i^\ell,\sum_j \alpha_{ij}\mathbf{m}_{ij}^{\ell}\right)
$$

$$
\mathbf{x}_i^{\ell+1}
=\mathbf{x}_i^\ell+\mathbb{1}[i\in \text{ligand}]\cdot
\sum_j(\mathbf{x}_i^\ell-\mathbf{x}_j^\ell)\phi_x(\mathbf{m}_{ij}^{\ell})
$$

其中 \(\mathbb{1}[i\in \text{ligand}]\) 是 ligand mask，保证蛋白坐标不被更新。因为消息只依赖距离和相对向量，整体旋转会让坐标输出同步旋转；整体平移通过把蛋白 CoM 移到零来处理。论文给出的命题是：若蛋白 CoM 被移到零且 Markov transition 由 SE(3) 等变网络参数化，则复合物的 likelihood 对全局平移和旋转不变。

> 💡 关键：TargetDiff 的“target-aware”不是把蛋白序列编码成条件向量，而是让每个配体原子在每一层消息传递中都直接感知附近蛋白原子的 3D 几何和化学类型。

**训练目标：坐标 KL/MSE 加类型 KL。**

TargetDiff 可按变分下界训练。坐标部分是两个高斯后验之间的 KL：

$$
\mathcal{L}_{\mathbf{x}}
=D_{\mathrm{KL}}\left(
q(\mathbf{x}_{t-1}\mid \mathbf{x}_t,\mathbf{x}_0)
\;\|\;
p_\theta(\mathbf{x}_{t-1}\mid \mathbf{x}_t,\mathbf{v}_t,P)
\right)
$$

实践中也可使用未加权 MSE 直接回归 \(\mathbf{x}_0\)。类型部分是类别分布 KL：

$$
\mathcal{L}_{\mathbf{v}}
=D_{\mathrm{KL}}\left(
q(\mathbf{v}_{t-1}\mid \mathbf{v}_t,\mathbf{v}_0)
\;\|\;
p_\theta(\mathbf{v}_{t-1}\mid \mathbf{x}_t,\mathbf{v}_t,P)
\right)
$$

最终损失为：

$$
\mathcal{L}=\mathcal{L}_{\mathbf{x}}+\lambda_{\mathbf{v}}\mathcal{L}_{\mathbf{v}}
$$

采样时先根据相似口袋大小的训练分布采样配体原子数，从坐标高斯噪声和均匀原子类型开始迭代去噪。模型输出的是原子点云和类型，化学键仍由 OpenBabel 等工具根据距离与价态后处理推断；论文也指出把 bond generation 纳入扩散过程是后续改进方向。

**亲和力排序：从去噪不确定性读出“是否像好 binder”。**

TargetDiff 的一个额外贡献是把生成模型当作无监督特征提取器。给定一个蛋白-配体复合物，在 \(t=0\) 前向一次，冻结坐标更新分支，只更新 hidden embedding 并预测原子类型分布 \(\hat{\mathbf{v}}\)。直觉是：如果配体与口袋匹配良好，模型对各原子类型的预测应更确定，熵更低；如果几何或化学相互作用不合理，类型分布会更不确定。因此可以定义：

$$
s_{\mathrm{ent}}(M,P)=\frac{1}{n}\sum_{i=1}^{n}H(\hat{\mathbf{v}}_i)
$$

作为 ranking signal，也可以把最终 hidden embedding 池化后接线性层，增强监督亲和力预测模型。论文在 CrossDocked2020 和 PDBbind v2020 上展示了这种 unsupervised feature 对 ranking 和 prediction 的帮助。

**实验解读与局限。**

在 CrossDocked2020 评估中，TargetDiff 相比 liGAN、AR、GraphBP、Pocket2Mol 生成了更接近真实分子的键长/距离分布，并在更多测试口袋上获得更好的 Vina docking 表现。论文报告 TargetDiff 生成分子在 57% 的靶点上取得最优 median Vina energy，平均 58.1% 的样本比参考配体有更高预测亲和力。它的局限也很清楚：生成结果先是“原子点云”，键需要后处理推断，因此可能出现不理想环大小或合成可及性不如 Pocket2Mol 的情况。后续方法可以把键、片段或药效团约束纳入扩散变量，减少后处理误差。

#### 🧪 练习题

```yaml
question: "TargetDiff 相比逐原子自回归 SBDD 方法的主要优势是什么？"
options:
  - "它完全不需要蛋白口袋三维坐标"
  - "它把整个配体点云作为一个整体去噪，减少生成顺序偏置并能同时利用全局口袋上下文"
  - "它只优化 QED，因此不需要 docking 或亲和力评估"
  - "它在扩散过程中直接生成蛋白序列而不是小分子"
answer: 1
explain: "TargetDiff 采用非自回归扩散采样，每一步同时更新所有配体原子的坐标和类型；这避免了逐原子生成的顺序假设，并让模型在完整蛋白-配体几何图上建模相互作用。"
```
