### Orb: A Fast, Scalable Neural Network Potential

```yaml
id: orb
name: Orb
full_name: "Orb: 快速可扩展的神经网络原子间势 (Orb: A Fast, Scalable Neural Network Potential)"
year: "2024"
org: Orbital Materials
paper_url: "https://arxiv.org/abs/2410.22570"
category: ai4material
parent: GNS
motivation: "用非等变图网络+平滑注意力+扩散预训练构建快速可扩展的通用原子间势，在精度与速度上同时超越现有方法"
```

#### 📝 一句话总结

Orb 提出了一种基于图网络模拟器（GNS）与平滑图注意力机制的非等变通用原子间势（UIP），结合去噪扩散预训练策略，在 Matbench Discovery 基准上以 F1=0.88 刷新开源 SOTA，同时推理速度比 MACE 快 3–6 倍，为大规模材料模拟提供了精度与效率兼备的解决方案。

#### 🎯 核心要点

- **非等变架构设计**：放弃等变约束，采用 GNS 架构通过数据增强学习旋转/平移不变性，大幅提升 GPU 利用率与推理速度
- **平滑图注意力（Smoothed Attention）**：将 softmax 注意力权重乘以距离衰减包络函数，消除原子进出截断半径时的力不连续性
- **两阶段训练**：Phase 1 在大规模晶体结构上做去噪扩散预训练；Phase 2 在 DFT 轨迹数据上有监督微调能量/力/应力
- **力守恒后处理**：通过 Lagrangian 约束优化对预测力施加净力为零和净力矩为零的修正，保证物理一致性
- **D3 色散校正摊销**：将 D3 长程色散校正预计算并加入训练数据，避免推理时 \(O(n^2)\) 的额外开销
- **数据集**：预训练使用跨多个数据库的基态材料结构；微调使用 MPtraj + Alexandria（均为 PBE 泛函 + VASP）
- **开源 Apache 2.0 许可**：模型权重与代码完全开放

#### 🔬 深入细节

##### 模型架构总览

![Orb 模型架构图](https://arxiv.org/html/2410.22570v2/x1.png)
*图：Orb 模型架构示意。左侧为图构建与消息传递流程，右侧为平滑注意力机制与力守恒后处理的细节。*

Orb 的核心架构基于 **Graph Network Simulator (GNS)**，这是一种在粒子模拟领域已被验证的图神经网络框架。与当前主流的等变神经网络势（如 MACE、NequIP）不同，Orb 刻意选择了**非等变**设计路线——不在网络结构中硬编码旋转等变性，而是通过随机旋转数据增强让模型从数据中学习这些对称性。

> 💡 **关键洞察**：等变架构虽然在数据效率上有优势，但其所依赖的球谐张量运算（如 Clebsch-Gordan 乘积）在 GPU 上的并行效率较低。Orb 的非等变设计使其能充分利用 GPU 的密集矩阵运算能力，在大系统上实现 3–6 倍的速度优势。

##### 图构建与特征化

给定一个原子系统，Orb 构建一个有向图 \(\mathcal{G} = (\mathcal{V}, \mathcal{E})\)：

- **节点** \(\mathcal{V}\)：每个原子 \(i\) 对应一个节点，初始特征为原子序数的可学习嵌入向量 \(\mathbf{h}_i^{(0)} \in \mathbb{R}^{128}\)
- **边** \(\mathcal{E}\)：在截断半径 \(r_c = 10\) Å 内的所有原子对 \((i, j)\) 之间建立有向边
- **边特征**：由两部分拼接而成：
  1. 原子间距离 \(r_{ij}\) 的径向基函数（RBF）展开
  2. 周期性边界条件下的晶胞偏移向量 \(\mathbf{k}_{ij}\) 的 one-hot 编码

##### 消息传递与平滑注意力

Orb 使用 **10 层 GNS 消息传递块**，每层包含：

1. **边更新**：融合发送节点、接收节点和边特征
2. **注意力聚合**：使用平滑图注意力进行邻居信息聚合
3. **节点更新**：通过 MLP 更新节点表示

**平滑注意力机制**是 Orb 的核心创新之一。标准 softmax 注意力在原子进出截断半径时会产生不连续的权重跳变，导致预测力出现非物理的不连续性。Orb 的解决方案是将注意力权重乘以一个距离衰减包络函数：

$$\alpha_{ij}^{\text{smooth}} = \alpha_{ij}^{\text{softmax}} \cdot u(r_{ij})$$

其中 \(u(r_{ij})\) 是一个在截断半径处平滑衰减到零的包络函数（如余弦衰减），\(\alpha_{ij}^{\text{softmax}}\) 是带有可学习温度参数 \(\tau\) 的标准 softmax 注意力权重：

$$\alpha_{ij}^{\text{softmax}} = \frac{\exp(\mathbf{q}_i \cdot \mathbf{k}_j / \tau)}{\sum_{j' \in \mathcal{N}(i)} \exp(\mathbf{q}_i \cdot \mathbf{k}_{j'} / \tau)}$$

> ⚠️ **注意**：仅使用包络函数（如 DimeNet 中的做法）而不结合注意力会导致远处原子的贡献过小；仅使用 softmax 注意力则会在截断边界处产生力的不连续。Orb 的平滑注意力巧妙地结合了两者的优点。

##### 输出头与力守恒

经过 10 层消息传递后，Orb 使用三个独立的 MLP 输出头：

- **能量头**：对所有节点特征求和后通过 MLP 输出标量能量 \(E\)
- **力头**：直接从节点特征通过 MLP 预测每个原子的三维力向量 \(\mathbf{f}_i\)
- **应力头**：从图级特征预测 \(3 \times 3\) 应力张量 \(\boldsymbol{\sigma}\)

由于力是直接预测而非通过能量的负梯度计算，预测的力不自动满足牛顿第三定律。Orb 通过**后处理校正**来恢复物理守恒律：

1. **净力消除**：计算所有原子预测力的均值并减去，确保 \(\sum_i \tilde{\mathbf{f}}_i = 0\)
2. **净力矩消除**：通过求解一个带约束的 Lagrangian 优化问题，找到最小 L2 范数的力修正 \(\delta\mathbf{f}_i\)，使得修正后的力既满足零净力又满足零净力矩

最终预测力为：

$$\tilde{\mathbf{f}}_i^{\text{pred}} = \hat{\mathbf{f}}_i + \delta\mathbf{f}_i$$

##### 算法伪代码：两阶段训练流程

```python
# ===== Phase 1: 去噪扩散预训练 =====
# 数据: 大规模基态晶体结构 (仅需原子位置和晶胞)
for epoch in pretraining_epochs:
    for x0 in ground_state_structures:
        t = sample_timestep()           # 采样噪声时间步
        eps = sample_noise()            # 采样高斯噪声
        x_t = x0 + sigma_t * eps       # 前向扩散加噪
        eps_pred = model(x_t, t)        # 模型预测噪声
        loss = ||eps_pred - eps||^2     # epsilon 预测损失
        optimizer.step(loss)

# ===== Phase 2: NNP 有监督微调 =====
# 数据: DFT 优化轨迹 (MPtraj + Alexandria)
model = load_pretrained_diffusion_model()
for epoch in finetuning_epochs:
    for batch in dft_trajectories:
        E_pred, f_pred, sigma_pred = model(batch)
        # 能量损失 (per-atom MAE, 减去参考能量)
        L_E = |E_pred - (E_true - E_ref) / N|
        # 力损失 (MAE over all atoms in batch)
        L_f = (1/3N) * sum(||f_pred_i - f_true_i||_1)
        # 应力损失
        L_sigma = MAE(sigma_pred, sigma_true)
        # 总损失
        L_total = lambda_E * L_E + L_f + L_sigma
        optimizer.step(L_total)
```

##### 动机与背景：为什么需要 Orb？

通用原子间势（Universal Interatomic Potentials, UIPs）旨在用单一模型替代传统的密度泛函理论（DFT）计算，以数量级的速度提升实现接近 DFT 精度的原子模拟。然而，现有的 UIP 面临两个核心挑战：

1. **精度瓶颈**：早期模型（如 M3GNet、CHGNet）在 Matbench Discovery 等严格基准上的 F1 分数仅为 0.57–0.61，距离实用化仍有差距
2. **速度瓶颈**：高精度的等变模型（如 MACE）依赖球谐张量运算，在大系统上的 GPU 利用率低，限制了可模拟的系统规模

Orb 通过非等变架构设计同时解决了这两个问题：放弃等变约束换取 GPU 友好的密集运算，同时通过扩散预训练和高质量数据策划来弥补数据效率的损失。

##### 扩散预训练的作用

扩散预训练是 Orb 的另一核心创新。其动机在于：

- **数据兼容性**：预训练仅需原子位置和晶胞信息，不需要能量/力等标签，因此可以混合使用不同 DFT 泛函、不同软件产生的数据
- **广覆盖性**：预训练数据集覆盖了广泛的原子类型、材料类别和对称群
- **训练稳定性**：实验表明，扩散预训练不仅降低了 17%–70% 的力场误差，还显著减少了训练过程中的过平滑（oversmoothing）现象

##### 与传统方法的对比

| 特性 | 等变模型 (MACE/NequIP) | Orb (非等变) |
|------|----------------------|-------------|
| 对称性处理 | 架构内置等变性 | 数据增强学习不变性 |
| 核心运算 | 球谐张量积 (Clebsch-Gordan) | 标准矩阵乘法 + 注意力 |
| GPU 利用率 | 较低（稀疏运算） | 高（密集运算） |
| 力计算 | 能量负梯度（自动守恒） | 直接预测 + 后处理校正 |
| 大系统速度 | 基准 | 3–6× 更快 |
| 数据效率 | 较高 | 通过预训练弥补 |

##### 实验结果亮点

**Matbench Discovery**（Table 1）：Orb 以 F1=0.880 大幅领先所有开源模型（此前最佳 SevenNet 为 0.724），精度（Precision=0.923）尤其突出，意味着极低的假阳性率——在实际材料筛选中，这可以避免大量无效的实验验证。

**速度基准**（Figure 3）：在单张 NVIDIA A100 GPU 上，Orb 的前向传播速度在大系统（>1000 原子）时比 MACE 快 3–6 倍。此外，通过将 D3 色散校正摊销到训练数据中，Orb 避免了推理时 \(O(n^2)\) 的 D3 计算开销。

**MD17 分子动力学**（Table 2）：在分子特异性微调设置下，Orb 在所有 4 个分子上均达到最大稳定性（300 ps），h(r) 指标与 NequIP 相当。在零样本设置下（仅用晶体数据训练），Orb 也展现出对非周期分子体系的良好泛化能力。

#### 🧪 练习题

```yaml
question: "Orb 模型使用平滑注意力机制的主要目的是什么？"
options:
  - "提高模型在小分子上的预测精度"
  - "消除原子进出截断半径时预测力的不连续性"
  - "减少消息传递层数以加速推理"
  - "替代径向基函数实现更好的距离编码"
answer: 1
explain: "标准 softmax 注意力在截断半径边界处会产生权重跳变，导致力的不连续。平滑注意力通过乘以距离衰减包络函数，确保边界处权重平滑过渡到零，从而保证力的连续性。"
```