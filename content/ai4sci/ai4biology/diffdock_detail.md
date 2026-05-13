### DiffDock (DiffDock)

```yaml
id: diffdock
name: DiffDock
full_name: "DiffDock: Diffusion Steps, Twists, and Turns for Molecular Docking"
year: 2023.03
org: MIT
paper_url: "https://arxiv.org/abs/2210.01776"
category: drug_discovery
parent: "—"
motivation: "流形扩散解决分子盲对接难题"
```

#### 📝 一句话总结

DiffDock 将分子对接建模为乘积流形 \(\mathbb{T}(3) \times SO(3) \times SO(2)^m\) 上的扩散生成过程，通过在平移、旋转和扭转自由度上独立运行前向扩散与逆向去噪，实现了无需预知结合口袋的盲对接，在 PDBBind 基准上以 38% 的 top-1 成功率（RMSD < 2Å）大幅超越传统搜索方法（23%）和先前深度学习方法（20%）。

#### 🎯 核心要点

- **范式转变**：首次将分子对接从回归/搜索问题重新定义为乘积流形上的生成建模问题，可一次性采样多个候选构象并排序
- **乘积流形扩散**：在 \(\mathbb{P} = \mathbb{T}(3) \times SO(3) \times SO(2)^m\) 上定义独立的前向 SDE，分别处理配体平移、整体旋转和可旋转键扭转角三类自由度
- **SO(3) 扩散核**：采用 IGSO(3) 分布作为旋转扩散核，支持高效采样与解析 score 计算
- **扭转角解耦**：通过 RMSD 对齐定义扭转操作，确保扭转变换在无穷小极限下与平移/旋转正交（零线动量与零角动量）
- **SE(3) 等变 Score 模型**：基于张量积卷积的异构几何图网络，蛋白质使用 α-碳粗粒化表示，配体使用全原子表示
- **Confidence 模型**：独立训练的二分类模型，以 RMSD < 2Å 为标签对生成的候选构象进行排序，显著提升选择精度
- **ESMFold 兼容性**：在计算折叠的蛋白质结构上仍保持 21.7% 成功率，远超其他方法的最高 10.4%
- **PDBBind 基准**：top-1 成功率 38%，top-5 成功率进一步提升；中位 RMSD 显著低于所有基线方法

#### 🔬 深入细节

![DiffDock 总览示意图](https://ar5iv.labs.arxiv.org/html/2210.01776/assets/x1.png)
*图：DiffDock 方法概览。左侧展示分子对接的三类自由度（平移、旋转、扭转）；中间展示在乘积流形上的前向扩散与逆向去噪过程；右侧展示 confidence 模型对多个候选构象的排序。*

```python
# DiffDock 推理伪代码
def diffdock_inference(protein_y, ligand_seed_c, score_model, confidence_model, N=40, T=20):
    """
    protein_y: 蛋白质3D结构 (α-碳 + 序列嵌入)
    ligand_seed_c: 配体种子构象 (RDKit ETKDG 生成)
    N: 并行采样的候选构象数
    T: 逆向扩散步数
    """
    poses = []
    for i in range(N):
        # 1. 从先验分布采样初始噪声态
        r_T ~ N(0, σ_tr_max² I₃)           # 平移: 高斯分布
        R_T ~ IGSO3(σ_rot_max²)             # 旋转: IGSO(3) 均匀分布
        θ_T ~ WrappedNormal(0, σ_tor_max²)  # 扭转: 环面上均匀分布
        x_T = apply_transform(ligand_seed_c, r_T, R_T, θ_T)

        # 2. 逆向扩散去噪
        for t in reversed(range(1, T+1)):
            # Score 模型预测各自由度的 score
            s_tr, s_rot, s_tor = score_model(x_t, protein_y, t)
            # 在各流形上独立执行测地线随机游走 (geodesic random walk)
            r_update = σ_tr²(t) * s_tr + noise_tr
            R_update = exp(σ_rot²(t) * s_rot + noise_rot)  # SO(3) 指数映射
            θ_update = σ_tor²(t) * s_tor + noise_tor       # 环面上加法
            x_{t-1} = apply_transform(x_t, r_update, R_update, θ_update)

        poses.append(x_0)

    # 3. Confidence 模型排序
    scores = [confidence_model(pose, protein_y) for pose in poses]
    ranked_poses = sort_by_confidence(poses, scores)
    return ranked_poses
```

**动机与背景：从搜索到生成的范式转变**

分子对接（Molecular Docking）是药物发现中的核心计算任务，目标是预测小分子配体与蛋白质靶标的结合构象。传统方法（如 AutoDock Vina、GNINA、GLIDE）采用"搜索+打分"范式：在构象空间中通过采样或优化搜索低能构象，再用物理或经验打分函数评估。这类方法面临两个根本性挑战：（1）搜索空间随可旋转键数量指数增长，计算代价高昂；（2）通常需要预先指定结合口袋位置，无法实现真正的盲对接。近年来，深度学习方法（如 EquiBind、TANKBind）尝试通过回归直接预测结合位姿，但回归框架天然只能输出单一预测，无法捕捉对接问题固有的多模态性——同一蛋白质-配体对可能存在多个合理的结合模式。DiffDock 的核心洞察在于：分子对接本质上应被视为一个**生成建模**问题，而非回归问题。通过学习结合构象的概率分布而非点估计，模型能够自然地表达多模态性，并通过采样多个候选构象来提升预测精度。

**核心机制：乘积流形上的扩散过程**

DiffDock 的技术核心在于如何在描述对接自由度的流形上定义高效的扩散过程。给定配体的种子构象 \(\mathbf{c} \in \mathbb{R}^{3n}\)，任何合法的对接构象都可以通过三类变换到达：（1）配体整体平移 \(\mathbf{r} \in \mathbb{T}(3) \cong \mathbb{R}^3\)；（2）配体绕质心旋转 \(R \in SO(3)\)；（3）\(m\) 个可旋转键的扭转角变化 \(\boldsymbol{\theta} \in SO(2)^m\)。这定义了一个 \((m+6)\) 维的构象流形 \(\mathcal{M}_\mathbf{c}\)。直接在 \(\mathcal{M}_\mathbf{c} \subset \mathbb{R}^{3n}\) 上做扩散需要数值求解测地线随机游走，计算代价极高。DiffDock 的关键理论贡献是证明了映射 \(A(\cdot, \mathbf{c}): \mathbb{P} \to \mathcal{M}_\mathbf{c}\) 是双射，其中 \(\mathbb{P} = \mathbb{T}(3) \times SO(3) \times SO(2)^m\) 是乘积空间。由于 \(\mathbb{P}\) 是乘积流形，前向扩散在各分量上独立进行，切空间为直和：

$$T_g \mathbb{P} = T_\mathbf{r} \mathbb{T}(3) \oplus T_R SO(3) \oplus T_{\boldsymbol{\theta}} SO(2)^m \cong \mathbb{R}^3 \oplus \mathbb{R}^3 \oplus \mathbb{R}^m$$

在三个分量上，前向 SDE 统一定义为 \(d\mathbf{x} = \sqrt{d\sigma^2(t)/dt}\, d\mathbf{w}\)，其中 \(\sigma^2\) 分别为 \(\sigma_{\text{tr}}^2, \sigma_{\text{rot}}^2, \sigma_{\text{tor}}^2\)。平移分量的扩散核是标准高斯分布；旋转分量使用 IGSO(3) 分布，其密度在轴角参数化下为：

$$f(\omega) = \sum_{\ell=0}^{\infty} (2\ell+1) \, e^{-\ell(\ell+1)\sigma^2} \frac{\sin\left((\ell+\frac{1}{2})\omega\right)}{\sin(\omega/2)}$$

该分布可通过先均匀采样旋转轴 \(\hat{\boldsymbol{\omega}}\)、再按 \(f(\omega)\) 采样旋转角 \(\omega \in [0, \pi]\) 实现高效采样。其 score 为 \(\nabla \ln p_t(R' \mid R) = \left(\frac{d}{d\omega}\log f(\omega)\right) \hat{\boldsymbol{\omega}}\)。扭转角分量在环面 \(\mathbb{T}^m\) 上使用 wrapped normal 分布，score 同样有解析形式。

**扭转角操作的精巧设计**

扭转角变换的定义需要特别注意与平移/旋转的解耦。对于第 \(k\) 个可旋转键 \((a_k, b_k)\)，朴素的扭转更新（仅旋转键的一侧）会引入整体平移和旋转。DiffDock 通过在所有扭转更新后执行全局 RMSD 对齐来消除这一耦合：

$$A_{\text{tor}}(\boldsymbol{\theta}, \mathbf{x}) = \text{align}\left(B_{m,\theta_m} \circ \cdots \circ B_{1,\theta_1}(\mathbf{x}),\; \mathbf{x}\right)$$

论文证明了这一定义在无穷小极限下满足零线动量和零角动量条件，即扭转变换的切向量与平移/旋转切向量正交。这确保了乘积空间上的独立扩散在映射回构象空间后仍然是良定义的。

**Score 模型与 Confidence 模型的架构设计**

Score 模型 \(\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\) 基于 SE(3) 等变卷积网络，输入为配体原子和蛋白质残基（α-碳表示）构成的异构几何图。蛋白质残基节点使用 ESM 语言模型嵌入作为初始特征。模型需要输出三类 score：（1）平移 score \(\in \mathbb{R}^3\)（SE(3) 等变向量）；（2）旋转 score \(\in \mathbb{R}^3\)（SE(3) 等变欧拉向量）；（3）扭转 score \(\in \mathbb{R}^m\)（SE(3) 不变标量）。平移和旋转 score 通过在配体质心处放置张量积滤波器卷积得到；扭转 score 通过"伪力矩"卷积计算。Confidence 模型具有类似架构，但使用全原子蛋白质表示以获得更精确的接触信息，输出 SE(3) 不变的标量置信度。训练时，先运行已训练的扩散模型生成候选构象，以 RMSD < 2Å 为正标签训练二分类交叉熵损失。这种多尺度设计（score 模型用粗粒化、confidence 模型用全原子）在保证推理速度的同时提升了排序精度。

> 💡 **关键创新**：DiffDock 的核心贡献不仅在于将扩散模型应用于对接，更在于严格地定义了乘积流形上的扩散过程，使得各自由度的扩散核均有解析形式，避免了子流形扩散中昂贵的数值积分。

**实验结果**

在 PDBBind 时间分割测试集上，DiffDock（采样 40 个构象）达到 38% 的 top-1 成功率（RMSD < 2Å），显著优于 GNINA（22.9%）、SMINA（18.7%）、GLIDE（21.8%）等传统方法，以及 EquiBind（5.5%）、TANKBind（20.9%）等深度学习方法。在使用 ESMFold 预测的蛋白质结构进行对接时，DiffDock 保持 21.7% 的成功率，而其他方法最高仅 10.4%，展示了对蛋白质结构噪声的鲁棒性。推理速度方面，DiffDock 在 GPU 上每个复合物约需 10 秒（含 40 个采样），与传统方法在 CPU 上的运行时间相当。

#### 🧪 练习题

```yaml
question: "DiffDock 在 SO(3) 旋转分量上使用的扩散核分布是什么？"
options:
  - "标准高斯分布 (Gaussian)"
  - "von Mises-Fisher 分布"
  - "IGSO(3) 分布 (Isotropic Gaussian on SO(3))"
  - "Wrapped Cauchy 分布"
answer: 2
explain: "DiffDock 在旋转自由度上使用 IGSO(3) 分布作为扩散核，该分布是 SO(3) 上布朗运动的转移核，支持通过轴角参数化进行高效采样和解析 score 计算。平移使用标准高斯，扭转角使用 wrapped normal 分布。"
```