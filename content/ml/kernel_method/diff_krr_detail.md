### Diff-KRR — 可微核岭回归 (Differentiable Kernel Ridge Regression)

```yaml
id: diff_krr
name: Diff-KRR
full_name: 可微核岭回归 (Differentiable Kernel Ridge Regression)
year: 2025.05
org: arXiv
paper_url: https://arxiv.org/abs/2605.02313
category: frontier
parent: krr
motivation: 可微KRR层嵌入端到端深度学习流水线
```

#### 📝 一句话总结

Diff-KRR 提出了**稀疏核 (Sparse Kernels, SKs)**——一种可微、惰性 (lazy)、局部化的核岭回归变体，将 KRR 作为模块化层嵌入标准深度学习流水线，通过显式暴露特征、目标值和评估点三组参数实现端到端可训练，在迁移学习、网络探测和强化学习中匹配或超越参数化分类头。

#### 🎯 核心要点

- **稀疏核 (Sparse Kernels)** 构造：基于 M-最近邻 (M-NN) 对特征空间进行分区 (tessellation)，在每个局部单元上求解 \(M \times M\) 的小型 KRR 系统，单次查询复杂度 \(O(M^3)\)，总体线性于数据集规模 \(N\)
- **三组参数的统一框架**：特征表示 \(\theta\)、支撑点 \(\theta_x\)、目标值 \(\theta_y\) 可分别固定或学习，涵盖迁移学习（全固定）、探测（部分固定）、混合模型（全可学）等场景
- **惰性推理 (Lazy Inference)**：训练开销推迟到推理阶段，每个预测独立计算，无需全局矩阵求逆
- **两层分析框架**：特征映射 \(f(\cdot, \theta)\) → 核分类器 \(y_k(\cdot, \theta_x, \theta_y)\)，替换传统参数化分类头
- **插值体制 (Interpolation Regime)**：使用基函数 \(\psi_k(z, x) = k(z, x) k(x,x)^{-1}\)，Tikhonov 正则化趋近于零
- **PyTorch 集成**：梯度 \(\nabla_y y_k, \nabla_x y_k, \nabla_z y_k\) 由核库计算并导出至深度学习后端，保持自动微分兼容
- **实验验证**：在 ResNet-18 迁移学习 (CIFAR-10)、VGG-19/ViT 探测、Double DQN 强化学习中均展示有效性

#### 🔬 深入细节

![Diff-KRR 迁移学习实验结果](https://arxiv.org/html/2605.02313v1/extracted/6516072/figures/cifar10_transfer_learning_accuracy.png)
*图：冻结 ImageNet 预训练 ResNet-18 骨干网络后，四种读出头（线性头、MLP、不连续/连续惰性 KRR）在不同 CIFAR-10 标注样本量下的测试准确率对比。惰性 KRR 无需参数训练即可匹配或超越参数化头。*

```python
# Sparse Kernel (SK) 推理伪代码
def sparse_kernel_predict(z, X_train, Y_train, kernel_fn, M):
    """
    z: 待预测点 (D_f,)
    X_train: 训练特征 (N, D_f)
    Y_train: 训练目标 (N, D_y)
    kernel_fn: 核函数 k(·,·) = φ(d(·,·))
    M: 近邻带宽参数
    """
    # Step 1: M-NN 查找 — 找到 z 的 M 个最近邻
    sigma = find_M_nearest_neighbors(z, X_train, M)  # 索引 (M,)
    X_local = X_train[sigma]  # (M, D_f)
    Y_local = Y_train[sigma]  # (M, D_y)

    # Step 2: 构建局部核矩阵并求解
    K_local = kernel_fn(X_local, X_local)      # (M, M)
    k_eval = kernel_fn(z.unsqueeze(0), X_local) # (1, M)

    # Step 3: 基函数插值 — ψ_k(z, x_σ) = k(z, x_σ) K_local^{-1}
    psi = k_eval @ torch.linalg.inv(K_local)   # (1, M)
    y_pred = psi @ Y_local                      # (1, D_y)
    return y_pred

# 端到端可微训练流程
def train_step(model, kernel_layer, x_batch, y_batch, optimizer):
    features = model.backbone(x_batch)          # 特征映射 f(x, θ)
    y_pred = kernel_layer(features)             # 核分类器 y_k(f(x), θ_x, θ_y)
    loss = cross_entropy(y_pred, y_batch)
    loss.backward()   # 梯度通过 ∇_θ f, ∇_{θ_x} y_k, ∇_{θ_y} y_k 反传
    optimizer.step()
```

**动机与背景：核方法与深度学习的融合困境。** 核岭回归 (KRR) 具有坚实的理论基础——再生核希尔伯特空间 (RKHS) 中的表示定理保证了最优解的存在性与唯一性，且无需迭代训练即可获得闭式解。然而，标准 KRR 的 \(O(N^3)\) 矩阵求逆复杂度使其难以直接嵌入深度学习的小批量优化流程。此前的工作如 Deep Kernel Learning (DKL) 和 KISS-GP 虽然尝试了核-神经网络混合架构，但要么需要额外的变分推断层，要么无法保持端到端可微性。Diff-KRR 的核心动机是：**能否将 KRR 作为一个即插即用的可微层，直接替换深度网络中的参数化分类头，同时保持自动微分的完整性？**

**核心机制：稀疏核的 M-NN 分区与局部插值。** Diff-KRR 的技术核心是稀疏核 (Sparse Kernels) 构造。给定训练集 \(x = (x_1, \ldots, x_N)\)，对于任意评估点 \(z\)，首先通过 M-最近邻查找确定其局部邻域 \(\sigma(z) = (\sigma_1, \ldots, \sigma_M)(z)\)，这一映射在空间上定义了一个分区 (tessellation) \(\{1_{\Omega_\sigma}\}\)。在每个单元 \(\Omega_\sigma\) 上，构建局部再生核希尔伯特空间：

$$H_{k,\sigma} = \left\{ y_k(\cdot) = \psi_k(\cdot, x_\sigma) y_\sigma, \quad y_\sigma \in \mathbb{R}^{M \times D_y} \right\}$$

其中基函数 \(\psi_k(\cdot, x_\sigma) = k(\cdot, x_\sigma) k(x_\sigma, x_\sigma)^{-1}\) 仅涉及 \(M \times M\) 的局部核矩阵求逆。这使得单次预测的复杂度从全局的 \(O(N^3)\) 降至 \(O(M^3)\)，其中 \(M\) 通常取 100 左右，远小于数据集规模 \(N\)。全局函数空间 \(H_k^M\) 通过直和构造将所有局部空间联合起来，参数 \(y \in \mathbb{R}^{N \times D_y}\) 全局定义但仅在各单元内局部作用。该构造的一个重要特性是**惰性 (lazy)**：大部分计算推迟到推理时完成，每个预测相互独立，天然适合并行化。

> 💡 关键：稀疏核的"稀疏"不是指对数据集采样，而是指每次预测仅使用评估点附近 M 个最近邻构建局部核系统，从而将全局 \(O(N^3)\) 问题分解为大量独立的 \(O(M^3)\) 局部问题。

**两层模型与三组参数的灵活配置。** 论文将深度网络形式化为两层结构：特征映射 \(f(\cdot, \theta): \mathbb{R}^{D_x} \to \mathbb{R}^{D_f}\) 和分类器 \(y(\cdot, \theta_y): \mathbb{R}^{D_f} \to \mathbb{R}^{D_y}\)。将分类器替换为核岭回归器后，完整模型变为 \(y_\theta(\cdot, \theta_x, \theta_y) = y_k(f(\cdot, \theta), \theta_x, \theta_y)\)，其中 \(y_k(\cdot, \theta_x, \theta_y) = k(\cdot, \theta_x) k(\theta_x, \theta_x)^{-1} \theta_y\)。这引入了三组可独立配置的参数：(1) 骨干网络参数 \(\theta\) 控制特征提取；(2) 支撑点 \(\theta_x\) 可设为传播后的训练点 \(x_\theta = f(x, \theta)\) 或作为可学习参数；(3) 目标值 \(\theta_y\) 可使用真实标签 \(y\) 或作为可学习参数。这种灵活性使同一框架覆盖多种场景：**迁移学习**时 \(\theta\) 冻结、\(\theta_x = x_\theta\)、\(\theta_y = y\)（完全无需训练）；**探测 (probing)** 时固定骨干但学习核参数；**混合模型**时三组参数全部可学。核库提供 \(\nabla_y y_k, \nabla_x y_k, \nabla_z y_k\) 三个方向的梯度，通过 PyTorch 自动微分引擎实现端到端反向传播。

**实验验证与关键发现。** 论文在三个场景中验证了稀疏核的有效性。(1) **迁移学习**：在冻结的 ImageNet 预训练 ResNet-18 上，惰性 KRR 读出头（\(M=100\)）在 CIFAR-10 上无需任何参数训练即达到与线性头和 MLP 相当甚至更优的准确率，证明了非参数方法可有效利用预训练特征的几何结构。(2) **网络探测**：对 VGG-19 和 ViT 的逐层探测发现，中间层表示比最终层更适合核读出——最终层过度特化于原始参数化分类头，丢失了对替代任务有用的信息。这一发现对迁移学习的层选择策略具有实践指导意义。(3) **强化学习**：在 Double DQN 的 LunarLander 环境中，通过在第一层和最后一层添加核扰动项 \(P_{k}(x, y)(s)\)，核增强智能体 (DQK_Agent) 比基线更快达到更高奖励，展示了核模块作为神经网络"即插即用"增强组件的潜力。

> ⚠️ 注意：当前实验仅在 CPU 单机上运行，使用 CIFAR-10 和 LunarLander 等小规模基准。论文尚未在 ImageNet 规模、大语言模型或扩散模型上验证。此外，默认的不连续稀疏构造在单元边界处可能产生不连续性，对需要平滑预测的下游任务（如基于梯度的优化）可能需要采用附录中描述的连续变体。

**与传统方法的对比。** 相比标准 KRR 的 \(O(N^3 + N^2 D_y)\) 全局求解，稀疏核将复杂度降至 \(O(N \cdot M^3)\)（线性于 \(N\)）。相比 Deep Kernel Learning (DKL) 需要高斯过程的变分推断，Diff-KRR 直接使用闭式核插值，无需额外的近似层。相比 KISS-GP 的结构化诱导点方法，稀疏核基于数据驱动的 M-NN 分区，自适应于特征空间的局部密度。相比线性探测 (linear probing) 等标准迁移学习方法，核读出提供了非参数的非线性适应能力，且在小样本场景下优势更为显著。

#### 🧪 练习题

```yaml
question: "Diff-KRR 中稀疏核 (Sparse Kernels) 实现计算加速的核心机制是什么？"
options:
  - "对训练数据进行随机采样，减少参与计算的样本数量"
  - "使用低秩近似分解全局核矩阵"
  - "基于 M-最近邻分区，在每个局部单元上求解 M×M 的小型核系统"
  - "用神经网络近似核函数，避免核矩阵的显式计算"
answer: 2
explain: "稀疏核通过 M-NN 将特征空间分区为局部单元，每次预测仅在评估点的 M 个最近邻上构建 M×M 核矩阵并求逆，将单次查询复杂度从 O(N³) 降至 O(M³)，而非采样或低秩近似。"
```