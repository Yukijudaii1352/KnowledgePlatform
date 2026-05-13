### Score Matching with Langevin Dynamics (SMLD / NCSN)

```yaml
id: score_matching
name: "Score Matching"
full_name: "基于噪声条件得分网络的生成模型 (Generative Modeling by Estimating Gradients of the Data Distribution)"
year: "2019"
org: "Stanford"
paper_url: "https://arxiv.org/abs/1907.05600"
category: "specialized"
parent: "vi"
motivation: "估计数据分布的梯度场（score），通过多尺度噪声扰动与退火 Langevin 动力学实现高质量样本生成"
```

#### 📝 一句话总结

NCSN 提出用**得分匹配（Score Matching）**训练神经网络估计数据分布的梯度场 \(\nabla_{\mathbf{x}}\log p(\mathbf{x})\)，并引入**多尺度高斯噪声扰动**与**退火 Langevin 动力学**解决低维流形、低密度区域和多模态混合三大难题，开创了基于得分的生成模型范式。

#### 🎯 核心要点

- **Score 函数**：定义 \(\nabla_{\mathbf{x}}\log p(\mathbf{x})\) 为数据分布的得分，不依赖归一化常数，可直接用于 Langevin 采样
- **Score Matching 目标**：通过 Fisher 散度 \(\frac{1}{2}\mathbb{E}_{p_{\text{data}}}\left[\|\mathbf{s}_\theta(\mathbf{x}) - \nabla_{\mathbf{x}}\log p_{\text{data}}(\mathbf{x})\|^2\right]\) 训练得分网络，等价形式避免对真实得分的依赖
- **Denoising Score Matching**：用加噪数据的条件得分 \(\nabla_{\tilde{\mathbf{x}}}\log q_\sigma(\tilde{\mathbf{x}}|\mathbf{x})\) 替代真实得分，避免计算 Jacobian 迹
- **Sliced Score Matching**：通过随机向量投影将 Jacobian 迹降为方向导数，计算复杂度从 \(O(D)\) 降到 \(O(1)\) 次前向传播
- **三大挑战**：流形假说导致得分未定义、低密度区域得分估计不准、多模态分布 Langevin 采样混合困难
- **多尺度噪声扰动**：使用 \(L\) 个几何递减的噪声级别 \(\{\sigma_i\}_{i=1}^L\)，大噪声填充低密度区域，小噪声保留数据细节
- **NCSN 架构**：条件得分网络 \(\mathbf{s}_\theta(\mathbf{x}, \sigma)\)，基于 U-Net + 空洞卷积 + 条件实例归一化
- **退火 Langevin 动力学（Algorithm 1）**：从大噪声到小噪声逐级采样，步长 \(\alpha_i = \epsilon \cdot \sigma_i^2 / \sigma_L^2\) 自适应缩放
- **加权训练目标**：\(\lambda(\sigma) = \sigma^2\) 使不同噪声级别的损失量级一致

#### 🔬 深入细节

![得分场估计示意（Figure 2）](https://ar5iv.labs.arxiv.org/html/1907.05600v4/assets/figures/score_estimation.png)
*图（论文 Figure 2）：左为真实得分场 ∇log p(x)，右为得分网络估计值 s_θ(x)。低密度区域（两个高斯模态之间）的得分估计不准确，这是朴素方法的核心缺陷。*

```python
# Algorithm 1: Annealed Langevin Dynamics (退火 Langevin 动力学)
# 输入: 训练好的 NCSN s_θ(x, σ), 噪声序列 {σ_i}, 步长 ε, 每级步数 T
import torch

def annealed_langevin_dynamics(score_net, sigmas, epsilon, T, x_shape):
    """
    sigmas: [σ_1, σ_2, ..., σ_L], 从大到小的几何序列
    epsilon: 基础步长
    T: 每个噪声级别的 Langevin 步数
    """
    # 从均匀噪声初始化
    x = torch.rand(x_shape)

    for i, sigma_i in enumerate(sigmas):
        # 自适应步长: α_i = ε * σ_i² / σ_L²
        alpha_i = epsilon * (sigma_i ** 2) / (sigmas[-1] ** 2)

        for t in range(T):
            z = torch.randn_like(x)  # z_t ~ N(0, I)
            # Langevin 更新: x ← x + (α/2) * s_θ(x, σ_i) + √α * z
            score = score_net(x, sigma_i)
            x = x + (alpha_i / 2) * score + torch.sqrt(alpha_i) * z

    return x
```

**动机与背景：为什么需要得分函数？**

传统生成模型（如 VAE、GAN、Flow）要么需要对数据分布做参数化假设并计算归一化常数，要么需要对抗训练。本文提出了一条全新路径：不直接建模概率密度 \(p(\mathbf{x})\)，而是建模其**梯度场**（得分函数）\(\nabla_{\mathbf{x}}\log p(\mathbf{x})\)。得分函数的核心优势在于它**不依赖归一化常数**——对于 \(p(\mathbf{x}) = \frac{e^{-f(\mathbf{x})}}{Z}\)，其得分 \(\nabla_{\mathbf{x}}\log p(\mathbf{x}) = -\nabla_{\mathbf{x}} f(\mathbf{x})\) 与 \(Z\) 无关。这使得得分网络 \(\mathbf{s}_\theta(\mathbf{x})\) 可以是任意神经网络，无需满足归一化约束。

> 💡 **关键直觉**：得分函数描述的是"数据密度增长最快的方向"。在数据点附近，得分指向数据密集区域；远离数据时，得分指向最近的数据簇。

**得分匹配的三种形式**

原始的**显式得分匹配**（Eq. 1）目标为：

$$J(\theta) = \frac{1}{2}\mathbb{E}_{p_{\text{data}}}\left[\|\mathbf{s}_\theta(\mathbf{x}) - \nabla_{\mathbf{x}}\log p_{\text{data}}(\mathbf{x})\|_2^2\right]$$

由于真实得分 \(\nabla_{\mathbf{x}}\log p_{\text{data}}\) 未知，Hyvärinen (2005) 证明上式等价于（省略常数项）：

$$J(\theta) = \mathbb{E}_{p_{\text{data}}}\left[\text{tr}(\nabla_{\mathbf{x}}\mathbf{s}_\theta(\mathbf{x})) + \frac{1}{2}\|\mathbf{s}_\theta(\mathbf{x})\|_2^2\right]$$

其中 \(\text{tr}(\nabla_{\mathbf{x}}\mathbf{s}_\theta)\) 是 Jacobian 矩阵的迹，计算代价为 \(O(D)\) 次反向传播，对高维数据不可行。

**Denoising Score Matching**（Vincent, 2011）巧妙地绕过了 Jacobian 计算：给数据加噪 \(\tilde{\mathbf{x}} = \mathbf{x} + \sigma\boldsymbol{\epsilon}\)，则条件得分有解析形式 \(\nabla_{\tilde{\mathbf{x}}}\log q_\sigma(\tilde{\mathbf{x}}|\mathbf{x}) = -(\tilde{\mathbf{x}} - \mathbf{x})/\sigma^2\)，训练目标变为：

$$\ell(\theta; \sigma) = \frac{1}{2}\mathbb{E}_{p_{\text{data}}(\mathbf{x})}\mathbb{E}_{\tilde{\mathbf{x}}\sim\mathcal{N}(\mathbf{x}, \sigma^2 I)}\left[\left\|\mathbf{s}_\theta(\tilde{\mathbf{x}}, \sigma) + \frac{\tilde{\mathbf{x}} - \mathbf{x}}{\sigma^2}\right\|_2^2\right]$$

> ⚠️ **注意**：Denoising score matching 实质上是让网络学习"去噪方向"——预测从加噪样本指向原始样本的归一化向量。这与后来的 DDPM 中预测噪声 \(\boldsymbol{\epsilon}\) 本质等价：\(\mathbf{s}_\theta \approx -\boldsymbol{\epsilon}/\sigma\)。

**Sliced Score Matching**（本文另一贡献）用随机投影近似 Jacobian 迹：

$$J_{\text{sliced}}(\theta) = \mathbb{E}_{p_\mathbf{v}}\mathbb{E}_{p_{\text{data}}}\left[\mathbf{v}^\top\nabla_{\mathbf{x}}\mathbf{s}_\theta(\mathbf{x})\mathbf{v} + \frac{1}{2}(\mathbf{v}^\top\mathbf{s}_\theta(\mathbf{x}))^2\right]$$

其中 \(\mathbf{v}\) 为随机投影向量（如 Rademacher 分布），只需 \(O(1)\) 次反向传播。

**三大挑战与多尺度噪声解决方案**

作者深入分析了朴素得分匹配 + Langevin 采样面临的三个根本困难：

1. **流形假说**：真实数据（如图像）集中在高维空间的低维流形上，流形外的得分未定义。加入高斯噪声后，扰动分布 \(q_\sigma(\mathbf{x})\) 的支撑集覆盖全空间，得分处处有定义。

2. **低密度区域**：数据稀疏区域缺乏训练样本，得分估计不准确。大噪声 \(\sigma_1\) 将数据"扩散"到更广区域，为低密度区域提供训练信号。

3. **多模态混合**：Langevin 动力学在模态间的低密度"山谷"中移动极慢。类比模拟退火，先在高温（大噪声）下自由移动以跨越模态，再逐步降温（小噪声）精细化。

统一训练目标将所有噪声级别的损失加权求和：

$$\mathcal{L}(\theta; \{\sigma_i\}_{i=1}^L) = \frac{1}{L}\sum_{i=1}^{L}\lambda(\sigma_i)\ell(\theta; \sigma_i)$$

其中 \(\lambda(\sigma_i) = \sigma_i^2\) 确保各级损失量级一致（因为 \(\|\nabla_{\mathbf{x}}\log q_\sigma\| \propto 1/\sigma\)，乘以 \(\sigma^2\) 后损失量级与 \(\sigma\) 无关）。

**NCSN 网络架构**

条件得分网络 \(\mathbf{s}_\theta(\mathbf{x}, \sigma)\) 的输出与输入图像同尺寸（逐像素得分向量），因此借鉴了语义分割的成功架构：**U-Net** 提供多尺度特征融合，**空洞卷积（dilated convolution）**扩大感受野而不损失分辨率，**条件实例归一化（conditional instance normalization）**将噪声级别 \(\sigma_i\) 作为条件信息注入网络各层。

**与后续工作的联系**

本文是 Score-based Generative Models 的奠基之作。后续的 DDPM（Ho et al., 2020）从离散扩散过程角度推导出几乎相同的训练目标；Song et al. (2021) 的 Score SDE 将离散噪声级别推广为连续随机微分方程，统一了 SMLD 和 DDPM 两条技术路线。

#### 🧪 练习题

```yaml
question: "在 NCSN 的训练目标中，权重系数 λ(σ) = σ² 的设计目的是什么？"
options:
  - "使大噪声级别获得更大的梯度，加速收敛"
  - "使不同噪声级别的加权损失 λ(σ)ℓ(θ;σ) 量级一致"
  - "补偿小噪声级别样本数量不足的问题"
  - "确保得分网络输出的范数与噪声级别成正比"
answer: 1
explain: "由于 ∇log q_σ 的量级约为 O(1/σ)，ℓ(θ;σ) ∝ 1/σ²，乘以 λ(σ)=σ² 后各级损失量级一致，避免某些噪声级别主导训练。"
```