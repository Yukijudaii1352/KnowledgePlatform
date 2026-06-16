### Apo2Mol：动态口袋感知生成

```yaml
id: apo2mol
name: Apo2Mol
full_name: 动态口袋感知生成 (Apo2Mol)
year: '2026'
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/37001
category: generation
parent: targetdiff
motivation: 动态口袋感知建模诱导契合效应
```

#### 📝 一句话总结

Apo2Mol 提出从 apo 未结合态口袋直接生成 3D 配体并同步预测 holo 结合态口袋构象的扩散框架，用实验解析的 apo-holo 结构对学习 ligand-induced fit，缓解了多数 SBDD 生成模型把蛋白口袋当作刚体模板的问题。

#### 🎯 核心要点

- **动态口袋设定**：输入 apo pocket，不假设已有 holo pocket；输出生成配体以及配体诱导后的 holo pocket 构象
- **实验结构对数据集**：基于 PLINDER/PDB 筛选 apo-holo-ligand 三元组，公开数据集说明包含 24,601 组 apo-holo 配对
- **联合扩散过程**：配体坐标和原子类型逐步加噪，蛋白口袋从 holo 状态沿 residue-level 变换插值到 apo 状态
- **残基层口袋变换**：不用直接预测每个蛋白原子坐标，而是预测 residue-level translation、rotation quaternion 和 side-chain chi angle update，保持蛋白局部结构合理
- **层级复合图**：构建 protein-ligand complex graph，包含 intra-ligand、ligand-residue、intra-residue、inter-residue 四类边
- **SE(3)-等变消息传递**：节点同时携带 invariant chemical context 和 equivariant 3D position，通过 attention-based GNN 捕获配体与口袋局部相互作用
- **评测优势**：在 apo 输入场景中平均 Vina min 优于 IPDiff、TargetDiff、Pocket2Mol、DecompDiff，并能生成与真实 apo-holo RMSD 分布相近的口袋变化

#### 🔬 深入细节

![Apo2Mol 扩散总览](https://arxiv.org/html/2511.14559v1/x2.png)
*图 1：Apo2Mol 的前向和反向过程。前向过程把 holo pocket-ligand pair 破坏为 apo-like pocket 与噪声配体；反向过程从 apo pocket 出发同时恢复 holo pocket 和配体。*

![Apo2Mol 框架结构](https://arxiv.org/html/2511.14559v1/x3.png)
*图 2：Apo2Mol 的层级图消息传递框架，用 SE(3)-等变 GNN 联合建模配体生成和口袋 refinement。*

> 来源说明：任务给定的 AAAI URL 为 `/article/view/37001`，实际可访问的 AAAI-26 PDF/页面在检索中对应 `/article/view/37138`，扩展版 arXiv 为 `https://arxiv.org/abs/2511.14559`。以下方法解读基于可访问的 AAAI/arXiv 内容与公开数据集说明。

```python
# Apo2Mol 训练与采样伪代码
for apo_pocket, holo_pocket, ligand in apo_holo_ligand_dataset:
    t = sample_time()

    # 配体前向扩散：坐标加高斯噪声，原子类型做离散扩散
    ligand_x_t = gaussian_noise(ligand.coords, t)
    ligand_a_t = categorical_noise(ligand.atom_types, t)

    # 口袋前向过程：把 holo 逐步插值到 apo
    trans_t = interpolate_translation(holo_pocket, apo_pocket, t)
    rot_t = slerp_quaternion(holo_pocket, apo_pocket, t)
    chi_t = interpolate_chi_angles(holo_pocket, apo_pocket, t)
    pocket_t = apply_residue_transforms(holo_pocket, trans_t, rot_t, chi_t)

    complex_graph = build_hierarchical_graph(
        pocket_t, ligand_x_t, ligand_a_t,
        edge_types=["ligand", "ligand-residue", "intra-residue", "inter-residue"]
    )

    pred_ligand_x0, pred_ligand_atoms, pred_trans, pred_rot, pred_chi = model(
        complex_graph, t
    )

    loss = (
        ligand_position_loss(pred_ligand_x0, ligand.coords)
        + ligand_type_kl(pred_ligand_atoms, ligand.atom_types)
        + pocket_translation_mse(pred_trans)
        + pocket_rotation_l1_and_unit_norm(pred_rot)
        + pocket_chi_cosine_loss(pred_chi)
    )
    optimize(loss)

# 推理：从 apo pocket 和随机配体噪声开始，反向积分/去噪
ligand_t = random_ligand_prior()
pocket_t = apo_pocket
for t in reversed(schedule):
    graph_t = build_hierarchical_graph(pocket_t, ligand_t)
    ligand_t, pocket_t = denoise_one_step(model, graph_t, t)
return ligand_t, pocket_t
```

**为什么要从 apo 到 holo 联合建模**

传统 pocket-based 3D molecule generation 通常使用 ligand-bound holo pocket 作为条件，默认蛋白结合位点刚性不变。但真实分子识别常有 induced fit：配体进入后，侧链旋转、局部 backbone 平移、甚至多个残基协同重排。对于新靶点，研究者更常拥有 apo 结构或预测结构，而不是高质量 holo 复合物；如果生成模型只会围绕 holo 模板设计，就会在真实应用中产生训练/测试错配。

Apo2Mol 把目标定义为条件分布：

$$
p_{\theta}(M_{\text{ligand}}, P_{\text{holo}}\mid P_{\text{apo}})
$$

也就是说，模型不仅要生成分子 \(M_{\text{ligand}}\)，还要预测该分子诱导后的结合态口袋 \(P_{\text{holo}}\)。这使配体几何和口袋形变成为同一个反向生成过程中的耦合变量，而不是先生成配体、再单独做 docking 或结构松弛。

**前向扩散：配体加噪，口袋沿 apo-holo 轨迹插值**

对配体坐标，Apo2Mol 沿用 3D 扩散模型的高斯加噪：

$$
q(\mathbf{x}_t\mid \mathbf{x}_0)=
\mathcal{N}\left(\sqrt{\bar{\alpha}_t}\mathbf{x}_0,\,(1-\bar{\alpha}_t)\mathbf{I}\right)
$$

对配体原子类型，使用离散 categorical diffusion，把真实类别逐步破坏为噪声类别分布。与配体不同，口袋不从标准高斯先验采样，因为蛋白构象需要保持残基几何与化学合理性。论文先对 apo/holo pocket 做 RMSD alignment，再用 Kabsch 估计 residue-level translation/rotation，并提取 side-chain chi angle update。

平移和 chi angle 用时间步插值，rotation 用 quaternion 的 spherical linear interpolation：

$$
\mathbf{q}_t=\operatorname{Slerp}\left(\mathbf{q}_{\text{holo}\rightarrow\text{apo}},\,\mathbf{I};\,t\right)\otimes\boldsymbol{\epsilon}_t
$$

其中 \(\boldsymbol{\epsilon}_t\) 是围绕单位四元数的小扰动，用于提升鲁棒性。这样 \(t=0\) 近似 holo，\(t=1\) 近似 apo；反向生成就是从 apo 端走回与配体匹配的 holo 端。

**层级复合图和 SE(3)-等变消息传递**

Apo2Mol 的图不是简单把所有原子混成一种 KNN 边，而是显式区分四类关系：配体内部边、配体-残基边、残基内部原子边、残基间边。这样做的作用是把小分子化学结构、配体-蛋白相互作用、残基内部刚性和残基间协同运动分开编码，避免模型把“配体成键”和“蛋白构象变化”混成同一种边更新。

每个节点有 invariant feature \(\mathbf{h}_i\) 和 equivariant coordinate/vector feature \(\mathbf{v}_i\)。消息传递层可以概括为：

$$
\mathbf{h}_i^{(\ell+1)} =
\mathbf{h}_i^{(\ell)} +
\sum_{j\in\mathcal{N}(i)}
\phi_h(\mathbf{h}_i^{(\ell)}, \mathbf{h}_j^{(\ell)}, e_{ij}, \|\mathbf{x}_i-\mathbf{x}_j\|)
$$

$$
\mathbf{x}_i^{(\ell+1)} =
\mathbf{x}_i^{(\ell)} +
\sum_{j\in\mathcal{N}(i)}
(\mathbf{x}_i-\mathbf{x}_j)\,\phi_x(\mathbf{h}_i^{(\ell)}, \mathbf{h}_j^{(\ell)}, e_{ij})
$$

其中 \(\phi_h\) 更新化学上下文，\(\phi_x\) 输出沿相对方向的等变坐标更新。这个结构保证旋转输入复合物时，坐标更新也随之旋转，而 drug-likeness、原子类型等 invariant 输出不受全局朝向影响。

**输出头与训练目标**

配体侧直接输出去噪坐标 \(\hat{\mathbf{x}}_0\) 和原子类型分布 \(\hat{\mathbf{a}}_0\)。蛋白侧先用 SAGPooling 从 atom-level 表示聚合到 residue-level，再分别预测 residue translation、rotation quaternion 和 chi angle update。整体损失可写成：

$$
\mathcal{L}=
\lambda_x\mathcal{L}_{\text{lig-pos}}
+\lambda_a\mathcal{L}_{\text{lig-type}}
+\lambda_t\mathcal{L}_{\text{trans}}
+\lambda_r\mathcal{L}_{\text{rot}}
+\lambda_{\chi}\mathcal{L}_{\chi}
$$

其中 ligand position 使用坐标误差，ligand atom type 使用 categorical KL；translation 用 MSE；rotation 用 L1 加单位范数正则，保证预测四元数仍在单位球附近；chi angle 用 cosine loss，避免角度周期性导致 \(0\) 和 \(2\pi\) 被错误视为相距很远。

**结果与局限**

在 apo 输入评测中，Apo2Mol 的平均 Vina min 为 -6.79，优于 IPDiff 的 -6.40、DecompDiff 的 -6.37、TargetDiff 的 -5.19 和 Pocket2Mol 的 -3.30；High Affinity 达到 42.7%。在以 native holo pocket 评估配体质量的设置中，Apo2Mol 仍达到平均 Vina min -7.86 和 High Affinity 52.9%，说明从 apo 端生成并不只是拟合生成口袋本身，也能产生更有竞争力的配体。

论文也指出生成 pocket 与真实 holo pocket 的 RMSD 分布仍存在一定 gap。这是合理的：从单个 apo 构象预测具体 ligand-induced holo 构象本身是多模态问题，同一 apo pocket 可能对应多个可行结合态。Apo2Mol 的贡献在于把这个多模态构象变化显式纳入生成模型，而不是把它留给后处理。

> ⚠️ 注意：Apo2Mol 相比 TargetDiff 的关键变化不是“把扩散网络换大”，而是改变了条件变量本身：模型输入的是 apo pocket，生成过程同时解决配体生成和口袋 refinement。

#### 🧪 练习题

```yaml
question: "Apo2Mol 为什么用 residue-level translation/rotation/chi angle 预测口袋变化，而不是直接预测所有蛋白原子坐标？"
options:
  - "因为模型不需要任何蛋白结构信息"
  - "因为 residue-level 变换更容易保持蛋白局部几何和侧链物理合理性"
  - "因为配体生成只依赖 SMILES 字符串"
  - "因为四元数只能表示配体原子类型"
answer: 1
explain: "直接预测全原子坐标容易破坏残基内部几何；Apo2Mol 用残基层平移、四元数旋转和 chi 角更新表达构象变化，更符合蛋白 pocket 的结构约束。"
```
