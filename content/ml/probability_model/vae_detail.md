### VAE — 变分自编码器 (Variational Autoencoder)

```yaml
id: vae
name: VAE
full_name: "变分自编码器 (Variational Autoencoder)"
year: 2013
org: Universiteit van Amsterdam
paper_url: "https://arxiv.org/abs/1312.6114"
category: foundation
parent: "—"
motivation: "通过引入变分推断和重参数化技巧，将深度学习与概率生成模型结合，实现高效的潜变量模型训练与数据生成"
```

#### 📝 一句话总结

VAE 提出了一种基于变分推断的自编码器框架，通过**重参数化技巧 (Reparameterization Trick)** 使含连续潜变量的生成模型可以端到端地用随机梯度下降高效训练，解决了传统变分推断在大规模数据和复杂后验分布下不可扩展的问题。

#### 🎯 核心要点

- **变分下界 (ELBO)**：将不可计算的边际似然 \(\log p_\theta(\mathbf{x})\) 转化为可优化的证据下界，分解为重构项和 KL 正则项
- **重参数化技巧**：将随机采样从计算图中分离，令 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)（其中 \(\boldsymbol{\epsilon} \sim \mathcal{N}(0, I)\)），使梯度可以通过采样操作反向传播
- **编码器-解码器架构**：编码器 \(q_\phi(\mathbf{z}|\mathbf{x})\) 近似不可解的真实后验，解码器 \(p_\theta(\mathbf{x}|\mathbf{z})\) 从潜变量生成数据
- **SGVB 估计器**：提出随机梯度变分贝叶斯 (Stochastic Gradient Variational Bayes) 估计器，支持小批量随机优化
- **AEVB 算法**：Auto-Encoding Variational Bayes 算法，将推断网络与生成网络联合训练，实现摊销推断 (Amortized Inference)
- **KL 散度解析计算**：当先验和近似后验均为高斯分布时，KL 项可解析计算，仅需对重构项采样估计

#### 🔬 深入细节

##### 核心框架图

![VAE 概率图模型](https://ar5iv.labs.arxiv.org/html/1312.6114v2/assets/x1.png)

*图：左侧为生成模型的有向图模型 \(p_\theta(\mathbf{z}) p_\theta(\mathbf{x}|\mathbf{z})\)；右侧虚线表示变分近似后验 \(q_\phi(\mathbf{z}|\mathbf{x})\)（即编码器/识别模型），用于近似不可解的真实后验 \(p_\theta(\mathbf{z}|\mathbf{x})\)。*

##### 算法伪代码

```python
# Auto-Encoding Variational Bayes (AEVB) 算法
# 输入: 数据集 X, 编码器参数 φ, 解码器参数 θ

初始化 θ, φ
while θ, φ 未收敛:
    X_M ← 从数据集 X 中随机采样小批量（M 个样本）
    ε ← 从先验 p(ε) = N(0, I) 中采样
    
    # 编码器前向传播: x → (μ, σ)
    μ, log_σ² = encoder_φ(x)        # 输出潜变量的均值和对数方差
    
    # 重参数化技巧: 将随机性转移到 ε
    z = μ + σ ⊙ ε                    # σ = exp(0.5 * log_σ²)
    
    # 解码器前向传播: z → x̂
    x̂ = decoder_θ(z)
    
    # 计算 ELBO（使用 SGVB 估计器 B）
    KL = -0.5 * Σ_j (1 + log(σ_j²) - μ_j² - σ_j²)   # 解析 KL 散度
    recon = E[log p_θ(x|z)]                              # 重构损失（采样估计）
    L = -KL + recon                                       # ELBO
    
    # 梯度更新
    g = ∇_{θ,φ} L                    # 对 ELBO 求梯度
    θ, φ ← 用 SGD 或 Adam 更新 (θ, φ)
    
return θ, φ
```

##### 动机与背景

在概率生成模型中，我们假设观测数据 \(\mathbf{x}\) 由某个潜变量 \(\mathbf{z}\) 生成。完整的生成过程为：先从先验 \(p_\theta(\mathbf{z})\) 中采样潜变量，再通过条件分布 \(p_\theta(\mathbf{x}|\mathbf{z})\) 生成观测数据。然而，训练这类模型面临两大核心困难：

1. **边际似然不可解**：计算 \(p_\theta(\mathbf{x}) = \int p_\theta(\mathbf{z}) p_\theta(\mathbf{x}|\mathbf{z}) d\mathbf{z}\) 需要对潜变量空间积分，当 \(p_\theta(\mathbf{x}|\mathbf{z})\) 由神经网络参数化时，该积分通常无法解析计算。
2. **真实后验不可解**：\(p_\theta(\mathbf{z}|\mathbf{x}) = p_\theta(\mathbf{x}|\mathbf{z})p_\theta(\mathbf{z})/p_\theta(\mathbf{x})\) 同样不可解，传统的 EM 算法和均值场变分推断要么需要特定的共轭先验假设，要么无法扩展到大规模数据集。

传统的变分推断方法（如均值场方法）虽然可以绕过后验不可解的问题，但它们通常需要针对每个数据点单独优化变分参数，计算代价极高，且难以利用 SGD 进行高效优化。

##### 核心机制：变分下界 (ELBO)

VAE 的核心思想是引入一个**推断模型**（编码器）\(q_\phi(\mathbf{z}|\mathbf{x})\) 来近似不可解的真实后验 \(p_\theta(\mathbf{z}|\mathbf{x})\)。通过变分推断，可以推导出边际对数似然的下界：

$$\log p_\theta(\mathbf{x}^{(i)}) \geq \mathcal{L}(\theta, \phi; \mathbf{x}^{(i)}) = -D_{KL}(q_\phi(\mathbf{z}|\mathbf{x}^{(i)}) \| p_\theta(\mathbf{z})) + \mathbb{E}_{q_\phi(\mathbf{z}|\mathbf{x}^{(i)})}[\log p_\theta(\mathbf{x}^{(i)}|\mathbf{z})]$$

这个下界（ELBO）由两部分组成：

- **KL 散度项** \(-D_{KL}(q_\phi(\mathbf{z}|\mathbf{x}) \| p_\theta(\mathbf{z}))\)：作为正则化项，鼓励近似后验 \(q_\phi\) 接近先验 \(p_\theta(\mathbf{z})\)。当先验和近似后验均为高斯分布时，该项可解析计算。
- **重构项** \(\mathbb{E}_{q_\phi}[\log p_\theta(\mathbf{x}|\mathbf{z})]\)：期望的对数似然，衡量从潜变量重构原始数据的能力，可理解为负重构误差。

> 💡 **关键直觉**：ELBO 的优化同时实现了两个目标——让编码器学会提取有意义的潜变量表示（通过重构项），同时保持潜变量空间的结构化（通过 KL 项使其接近先验分布），这正是 VAE 能够生成新样本的关键。

##### 核心机制：重参数化技巧

直接对 ELBO 中的期望项求梯度面临一个根本问题：\(\mathbf{z}\) 是从 \(q_\phi(\mathbf{z}|\mathbf{x})\) 中**随机采样**得到的，采样操作不可微分，梯度无法通过采样节点反向传播到编码器参数 \(\phi\)。

**重参数化技巧**巧妙地解决了这个问题。其核心思想是将随机变量 \(\mathbf{z}\) 表示为一个确定性函数加上外部噪声：

$$\mathbf{z} = g_\phi(\boldsymbol{\epsilon}, \mathbf{x}) = \boldsymbol{\mu}_\phi(\mathbf{x}) + \boldsymbol{\sigma}_\phi(\mathbf{x}) \odot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$$

其中 \(\boldsymbol{\mu}_\phi(\mathbf{x})\) 和 \(\boldsymbol{\sigma}_\phi(\mathbf{x})\) 是编码器网络的输出，\(\odot\) 表示逐元素乘法。这样，随机性被转移到了与参数无关的辅助变量 \(\boldsymbol{\epsilon}\) 上，而 \(\mathbf{z}\) 关于 \(\phi\) 的梯度可以正常计算：

$$\mathbb{E}_{q_\phi(\mathbf{z}|\mathbf{x})}[f(\mathbf{z})] = \mathbb{E}_{p(\boldsymbol{\epsilon})}[f(g_\phi(\boldsymbol{\epsilon}, \mathbf{x}))]$$

> ⚠️ **注意**：重参数化技巧要求 \(q_\phi(\mathbf{z}|\mathbf{x})\) 的采样过程可以用确定性变换 + 固定噪声源来表示。这对高斯分布自然成立，但不适用于所有分布族（如离散分布需要 Gumbel-Softmax 等替代方案）。

##### 训练与推理流程

**训练阶段**：
1. 从数据集中采样小批量 \(\mathbf{X}^M = \{\mathbf{x}^{(i)}\}_{i=1}^M\)
2. 对每个样本，编码器输出 \(\boldsymbol{\mu}^{(i)}, \log \boldsymbol{\sigma}^{2(i)}\)
3. 采样 \(\boldsymbol{\epsilon}^{(i)} \sim \mathcal{N}(0, I)\)，通过重参数化得到 \(\mathbf{z}^{(i)}\)
4. 解码器计算 \(p_\theta(\mathbf{x}^{(i)}|\mathbf{z}^{(i)})\)
5. 计算小批量 ELBO 估计：\(\widetilde{\mathcal{L}}^M = \frac{N}{M}\sum_{i=1}^M \widetilde{\mathcal{L}}(\theta,\phi;\mathbf{x}^{(i)})\)
6. 通过反向传播同时更新 \(\theta\) 和 \(\phi\)

**生成（推理）阶段**：
1. 从先验 \(p(\mathbf{z}) = \mathcal{N}(0, I)\) 中采样 \(\mathbf{z}\)
2. 通过解码器 \(p_\theta(\mathbf{x}|\mathbf{z})\) 生成新样本

论文指出，在实践中 \(L=1\)（每个数据点仅采样一个 \(\mathbf{z}\)）在小批量足够大（如 \(M=100\)）时就能工作良好。

##### 高斯情形的具体形式

当选择高斯先验 \(p_\theta(\mathbf{z}) = \mathcal{N}(0, I)\) 和高斯近似后验 \(q_\phi(\mathbf{z}|\mathbf{x}) = \mathcal{N}(\boldsymbol{\mu}, \text{diag}(\boldsymbol{\sigma}^2))\) 时，KL 散度有解析形式：

$$D_{KL}(q_\phi(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z})) = -\frac{1}{2}\sum_{j=1}^{J}(1 + \log \sigma_j^2 - \mu_j^2 - \sigma_j^2)$$

其中 \(J\) 是潜变量维度。解码器的输出分布可以是：
- **连续数据**：高斯分布 \(p_\theta(\mathbf{x}|\mathbf{z}) = \mathcal{N}(\mathbf{x}; \boldsymbol{\mu}'_\theta(\mathbf{z}), \sigma'^2 I)\)，重构损失为 MSE
- **二值数据**：伯努利分布 \(p_\theta(\mathbf{x}|\mathbf{z}) = \text{Bernoulli}(\mathbf{x}; \mathbf{p}_\theta(\mathbf{z}))\)，重构损失为交叉熵

##### 与传统方法的区别

| 特性 | 传统变分推断 (Mean-Field VI) | VAE (AEVB) |
|------|---------------------------|-------------|
| 变分参数 | 每个数据点独立优化 | 编码器网络摊销推断，参数共享 |
| 优化方式 | 坐标上升，需解析更新公式 | SGD + 反向传播，端到端训练 |
| 可扩展性 | 难以处理大规模数据 | 支持小批量训练，线性扩展 |
| 模型灵活性 | 受限于共轭先验 | 解码器可以是任意神经网络 |
| 推断速度 | 测试时需迭代优化 | 编码器单次前向传播即可 |

与同期的 Wake-Sleep 算法相比，VAE 优化的是同一个目标函数（ELBO）的梯度，而 Wake-Sleep 的 wake 阶段和 sleep 阶段优化不同的目标，可能导致不一致。

> 💡 **核心创新总结**：VAE 的根本贡献在于将**变分推断**与**深度学习**通过重参数化技巧无缝连接，开创了"用神经网络做推断"的范式，为后续的条件 VAE、β-VAE、VQ-VAE 等大量工作奠定了基础。

#### 🧪 练习题

```yaml
question: "VAE 中重参数化技巧的核心作用是什么？"
options:
  - "降低模型参数量，加速训练"
  - "将采样操作的随机性转移到与参数无关的噪声变量上，使梯度可以反向传播"
  - "使先验分布更接近真实数据分布"
  - "替代 KL 散度的解析计算，用蒙特卡洛估计代替"
answer: 1
explain: "重参数化技巧将 z = μ + σ⊙ε 中的随机性转移到 ε ~ N(0,I)，使 z 关于编码器参数 φ 的梯度可以正常计算，从而实现端到端的反向传播训练。"
```