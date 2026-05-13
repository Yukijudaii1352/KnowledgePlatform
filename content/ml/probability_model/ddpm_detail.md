### DDPM — 去噪扩散概率模型 (Denoising Diffusion Probabilistic Models)

```yaml
id: ddpm
name: DDPM
full_name: "去噪扩散概率模型 (Denoising Diffusion Probabilistic Models)"
year: 2020
org: "UC Berkeley"
paper_url: "https://arxiv.org/abs/2006.11239"
category: foundation
parent: "—"
motivation: "通过参数化反向去噪过程实现高质量图像生成，奠定现代扩散模型基础"
```

#### 📝 一句话总结

DDPM 提出了一种基于马尔可夫链的去噪扩散概率模型，通过将神经网络参数化为噪声预测器（\(\boldsymbol{\epsilon}\)-prediction）并使用简化训练目标，在无条件图像生成任务上取得了当时最优的 FID 分数，奠定了现代扩散模型的基础框架。

#### 🎯 核心要点

- **前向扩散过程**：通过 \(T=1000\) 步的高斯噪声逐步破坏数据，噪声调度 \(\beta_t\) 从 \(10^{-4}\) 线性增长到 \(0.02\)
- **反向去噪过程**：学习一个参数化的高斯转移核 \(p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t)\)，从纯噪声逐步恢复数据
- **\(\boldsymbol{\epsilon}\)-prediction 参数化**：将均值预测重新参数化为噪声预测 \(\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\)，等价于去噪得分匹配（Denoising Score Matching）
- **简化训练目标 \(L_{\text{simple}}\)**：去除变分下界中的加权系数，直接最小化 \(\|\boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\|^2\)，显著提升样本质量
- **网络架构**：基于 U-Net 的骨干网络，使用 Group Normalization、Transformer 正弦位置编码和 \(16 \times 16\) 分辨率的自注意力
- **无条件 CIFAR10 上 FID=3.17**，超越当时所有 GAN 以外的生成模型；LSUN 256×256 上也展示了高质量样本
- **与得分匹配/朗之万动力学的等价性**：DDPM 的采样过程等价于带噪声的朗之万动力学，训练目标等价于多尺度去噪得分匹配

#### 🔬 深入细节

![DDPM 前向与反向过程示意图](https://ar5iv.labs.arxiv.org/html/2006.11239v4/assets/x1.png)
*图：DDPM 的有向图模型。前向过程 \(q\) 逐步向数据添加高斯噪声，反向过程 \(p_\theta\) 学习逐步去噪恢复数据。*

##### 算法伪代码

**Algorithm 1: Training（训练）**
```python
# DDPM 训练过程
repeat:
    x_0 ~ q(x_0)                          # 从数据分布采样
    t ~ Uniform({1, ..., T})               # 随机采样时间步
    ε ~ N(0, I)                            # 采样标准高斯噪声
    # 对以下目标做梯度下降:
    loss = ||ε - ε_θ(√ᾱ_t · x_0 + √(1-ᾱ_t) · ε, t)||²
until converged
```

**Algorithm 2: Sampling（采样）**
```python
# DDPM 采样过程
x_T ~ N(0, I)                             # 从标准高斯采样
for t = T, ..., 1:
    z ~ N(0, I) if t > 1, else z = 0
    x_{t-1} = (1/√α_t) * (x_t - (1-α_t)/√(1-ᾱ_t) · ε_θ(x_t, t)) + σ_t · z
return x_0
```

##### 动机与背景

生成模型的核心目标是学习数据分布 \(p(\mathbf{x})\) 并从中采样。在 DDPM 之前，GAN 在图像生成质量上占据主导地位，但存在模式崩塌和训练不稳定等问题。变分自编码器（VAE）虽然训练稳定，但生成质量受限于后验近似的精度。基于能量的模型和自回归模型也各有局限。

扩散概率模型（Diffusion Probabilistic Models）最早由 Sohl-Dickstein 等人在 2015 年提出，其核心思想是：**定义一个逐步向数据添加噪声的前向过程，然后学习其反向过程来生成数据**。然而，原始工作的生成质量远不及 GAN。DDPM 的关键贡献在于：通过精心设计的参数化方式和简化的训练目标，首次证明扩散模型能够生成与 GAN 媲美甚至超越的高质量样本。

##### 核心机制详解

**1. 前向扩散过程（Forward Process）**

前向过程定义为一个固定的马尔可夫链，逐步向数据 \(\mathbf{x}_0\) 添加高斯噪声：

$$q(\mathbf{x}_t | \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1-\beta_t}\,\mathbf{x}_{t-1},\; \beta_t \mathbf{I})$$

其中 \(\beta_1, \beta_2, \ldots, \beta_T\) 是预定义的噪声调度（variance schedule）。DDPM 使用从 \(\beta_1 = 10^{-4}\) 到 \(\beta_T = 0.02\) 的线性调度，\(T = 1000\)。

> 💡 **关键性质**：利用 \(\alpha_t = 1 - \beta_t\) 和 \(\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s\)，可以直接从 \(\mathbf{x}_0\) 一步采样任意时间步 \(t\) 的噪声样本，无需逐步执行：

$$q(\mathbf{x}_t | \mathbf{x}_0) = \mathcal{N}(\mathbf{x}_t; \sqrt{\bar{\alpha}_t}\,\mathbf{x}_0,\; (1-\bar{\alpha}_t)\mathbf{I})$$

等价地：\(\mathbf{x}_t = \sqrt{\bar{\alpha}_t}\,\mathbf{x}_0 + \sqrt{1-\bar{\alpha}_t}\,\boldsymbol{\epsilon}\)，其中 \(\boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})\)。这使得训练时可以高效地随机采样时间步。

**2. 反向去噪过程（Reverse Process）**

反向过程同样定义为马尔可夫链，从高斯噪声 \(\mathbf{x}_T \sim \mathcal{N}(\mathbf{0}, \mathbf{I})\) 出发，逐步去噪：

$$p_\theta(\mathbf{x}_{t-1} | \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1};\; \boldsymbol{\mu}_\theta(\mathbf{x}_t, t),\; \sigma_t^2 \mathbf{I})$$

> ⚠️ **注意**：DDPM 将方差 \(\sigma_t^2\) 固定为 \(\beta_t\) 或 \(\tilde{\beta}_t = \frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_t}\beta_t\)（两者实验效果相近），仅学习均值 \(\boldsymbol{\mu}_\theta\)。

**3. \(\boldsymbol{\epsilon}\)-prediction 参数化（核心创新）**

传统做法是直接预测后验均值 \(\tilde{\boldsymbol{\mu}}_t\)。DDPM 的关键洞察是：将均值参数化为噪声预测。

前向过程的后验均值为：

$$\tilde{\boldsymbol{\mu}}_t(\mathbf{x}_t, \mathbf{x}_0) = \frac{\sqrt{\bar{\alpha}_{t-1}}\,\beta_t}{1-\bar{\alpha}_t}\mathbf{x}_0 + \frac{\sqrt{\alpha_t}(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_t}\mathbf{x}_t$$

将 \(\mathbf{x}_0 = \frac{1}{\sqrt{\bar{\alpha}_t}}(\mathbf{x}_t - \sqrt{1-\bar{\alpha}_t}\,\boldsymbol{\epsilon})\) 代入，得到：

$$\boldsymbol{\mu}_\theta(\mathbf{x}_t, t) = \frac{1}{\sqrt{\alpha_t}}\left(\mathbf{x}_t - \frac{1-\alpha_t}{\sqrt{1-\bar{\alpha}_t}}\,\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\right)$$

> 💡 **直觉**：网络不再直接预测去噪后的均值，而是预测"当前样本中混入了多少噪声"。这等价于学习数据分布在不同噪声尺度下的得分函数（score function）\(\nabla_{\mathbf{x}} \log q(\mathbf{x}_t)\)。

**4. 简化训练目标 \(L_{\text{simple}}\)**

标准变分下界（VLB）可以分解为：

$$L = \underbrace{D_{\text{KL}}(q(\mathbf{x}_T|\mathbf{x}_0) \| p(\mathbf{x}_T))}_{L_T} + \sum_{t=2}^{T} \underbrace{D_{\text{KL}}(q(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0) \| p_\theta(\mathbf{x}_{t-1}|\mathbf{x}_t))}_{L_{t-1}} - \underbrace{\log p_\theta(\mathbf{x}_0|\mathbf{x}_1)}_{L_0}$$

其中 \(L_T\) 为常数（前向过程固定），\(L_{t-1}\) 是两个高斯分布的 KL 散度，可以解析计算。使用 \(\boldsymbol{\epsilon}\)-prediction 参数化后，\(L_{t-1}\) 正比于：

$$L_{t-1} \propto \frac{1}{2\sigma_t^2} \cdot \frac{(1-\alpha_t)^2}{(1-\bar{\alpha}_t)\alpha_t} \left\|\boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\right\|^2$$

DDPM 发现，**去除前面的加权系数**，使用简化目标效果更好：

$$L_{\text{simple}} = \mathbb{E}_{t, \mathbf{x}_0, \boldsymbol{\epsilon}}\left[\left\|\boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta\!\left(\sqrt{\bar{\alpha}_t}\,\mathbf{x}_0 + \sqrt{1-\bar{\alpha}_t}\,\boldsymbol{\epsilon},\; t\right)\right\|^2\right]$$

> 💡 **为什么简化目标更好？** 加权 VLB 中，小 \(t\)（低噪声）的权重很大，大 \(t\)（高噪声）的权重很小。去除权重后，大 \(t\) 时间步获得更多训练信号，这相当于在高噪声区域进行更多的"粗粒度"去噪训练，有助于生成全局结构更合理的样本。虽然 \(L_{\text{simple}}\) 不再是严格的变分下界，但它显著提升了样本质量（FID 从 13.51 降至 3.17）。

**5. 与去噪得分匹配和朗之万动力学的联系**

DDPM 的训练目标 \(L_{\text{simple}}\) 等价于多尺度去噪得分匹配（Denoising Score Matching）。具体而言：

$$\boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \approx -\sqrt{1-\bar{\alpha}_t}\,\nabla_{\mathbf{x}_t} \log q(\mathbf{x}_t)$$

即噪声预测网络学习的是（缩放后的）数据在噪声扰动下的得分函数。DDPM 的采样过程则类似于带退火的朗之万动力学（Annealed Langevin Dynamics），这与 Song & Ermon (2019) 的 NCSN 方法形成了理论统一。

**6. 网络架构**

DDPM 使用基于 PixelCNN++ 的 U-Net 架构：
- **骨干**：类似 PixelCNN++ 的 U-Net，带跳跃连接
- **归一化**：全局使用 Group Normalization
- **时间步编码**：采用 Transformer 的正弦位置编码，通过 MLP 投影后加入各残差块
- **自注意力**：在 \(16 \times 16\) 特征图分辨率处使用自注意力层
- **参数共享**：所有时间步共享同一套网络参数，时间步信息通过条件输入提供

##### 与传统方法的对比

| 特性 | GAN | VAE | DDPM |
|------|-----|-----|------|
| 训练稳定性 | 差（模式崩塌） | 好 | 好 |
| 样本质量 | 高 | 中等 | 高（FID=3.17） |
| 似然估计 | 无 | 有（ELBO） | 有（≤3.75 bpd） |
| 采样速度 | 快（单次前向） | 快（单次前向） | 慢（T=1000 步） |
| 模式覆盖 | 差 | 好 | 好 |

DDPM 首次证明扩散模型在样本质量上可以与 GAN 竞争，同时保持训练稳定性和良好的模式覆盖。其主要代价是采样速度慢（需要 1000 步迭代去噪），这催生了后续 DDIM、DPM-Solver 等加速采样方法。

#### 🧪 练习题

```yaml
question: "DDPM 中简化训练目标 L_simple 相比标准变分下界 L 的关键区别是什么？"
options:
  - "L_simple 使用了 L2 损失而非 KL 散度"
  - "L_simple 去除了不同时间步 t 的加权系数，对所有时间步均匀加权"
  - "L_simple 预测原始图像 x_0 而非噪声 ε"
  - "L_simple 增加了对抗损失项以提升样本质量"
answer: 1
explain: "L_simple 的核心改动是去除了 VLB 中各时间步的加权系数（该系数使小 t 权重大、大 t 权重小），改为对所有时间步均匀加权，从而让模型在高噪声时间步获得更多训练信号，显著提升了样本质量。"
```