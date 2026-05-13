### VAE

```yaml
id: vae
name: VAE
full_name: Variational Autoencoder
year: '2014'
org: U Amsterdam
paper_url: https://arxiv.org/abs/1312.6114
category: core
parent: —
motivation: 变分推断框架的生成模型
```

#### 📝 一句话总结

VAE 提出了一种基于变分推断的深度生成模型框架，通过**重参数化技巧（Reparameterization Trick）**使得含连续隐变量的有向概率模型可以用随机梯度下降端到端训练，同时联合优化生成模型参数 \(\boldsymbol{\theta}\) 和识别模型（编码器）参数 \(\boldsymbol{\phi}\)，奠定了现代深度生成模型的基础。

#### 🎯 核心要点

- **变分下界（ELBO）**：将不可解的边际似然 \(\log p_{\boldsymbol{\theta}}(\mathbf{x})\) 转化为可优化的证据下界（Evidence Lower Bound），作为训练目标
- **重参数化技巧**：将随机采样 \(\mathbf{z} \sim q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 改写为确定性变换 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)，\(\boldsymbol{\epsilon} \sim \mathcal{N}(0, I)\)，使梯度可以通过采样操作反向传播
- **编码器-解码器架构**：编码器 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 近似不可解的后验分布，解码器 \(p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\) 从隐变量生成数据
- **SGVB 估计器**：Stochastic Gradient Variational Bayes 估计器，通过蒙特卡洛采样对 ELBO 进行无偏估计
- **AEVB 算法**：Auto-Encoding Variational Bayes 算法，将摊销推断（amortized inference）与 SGVB 结合，避免逐样本迭代推断
- **KL 散度正则项可解析计算**：当先验和后验均为高斯分布时，KL 散度项有闭式解，无需蒙特卡洛估计
- **实验验证**：在 MNIST 和 Frey Face 数据集上验证了模型的生成能力和隐空间表征质量

#### 🔬 深入细节

##### 核心框架示意图

![VAE 概率图模型](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x1.png)
*图 1：VAE 的有向概率图模型。实线表示生成模型 \(p_{\boldsymbol{\theta}}(\mathbf{z})p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\)，虚线表示变分近似 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 对不可解后验 \(p_{\boldsymbol{\theta}}(\mathbf{z}|\mathbf{x})\) 的逼近。变分参数 \(\boldsymbol{\phi}\) 与生成模型参数 \(\boldsymbol{\theta}\) 联合学习。*

![重参数化技巧示意](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x2.png)
*图 2：重参数化技巧的计算图对比。左图为普通采样（梯度无法回传），右图为重参数化后的计算图（梯度可通过确定性路径反向传播）。*

##### 算法伪代码

```python
# AEVB (Auto-Encoding Variational Bayes) 算法
# 输入: 数据集 X, 编码器网络 encoder_φ, 解码器网络 decoder_θ

initialize θ, φ randomly
while not converged:
    X_M = sample_minibatch(X, M)          # 采样 mini-batch
    for x in X_M:
        # 编码: 得到后验近似的参数
        μ, log_σ² = encoder_φ(x)
        
        # 重参数化采样
        ε ~ N(0, I)
        z = μ + σ ⊙ ε                     # σ = exp(0.5 * log_σ²)
        
        # 解码: 计算重构
        x_recon = decoder_θ(z)
    
    # 计算 ELBO 损失 (取负作为最小化目标)
    L = -E[log p_θ(x|z)]                  # 重构损失
        + D_KL(q_φ(z|x) || p(z))          # KL 正则项
    
    g = ∇_{θ,φ} L                         # 计算梯度
    θ, φ = update(θ, φ, g)                # SGD / Adam 更新
    
return θ, φ
```

##### 动机与背景

**核心问题**：在含连续隐变量的有向概率模型中，如何高效地进行后验推断和参数学习？

传统变分贝叶斯（VB）方法依赖**均场近似（mean-field approximation）**，要求变分下界中的期望有解析解，这在一般情况下是不可能的。而 MCMC 方法虽然理论上可行，但计算代价过高，无法扩展到大规模数据集。

VAE 的核心洞察是：通过引入一个**参数化的推断网络**（编码器）来摊销推断成本，并利用**重参数化技巧**使得整个系统可以用标准的随机梯度下降进行端到端优化。

##### 核心机制：ELBO 推导

对于数据点 \(\mathbf{x}\)，其边际对数似然可以分解为：

$$\log p_{\boldsymbol{\theta}}(\mathbf{x}) = D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p_{\boldsymbol{\theta}}(\mathbf{z}|\mathbf{x})) + \mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x})$$

其中第一项是变分后验与真实后验之间的 KL 散度（非负），第二项即为**证据下界（ELBO）**：

$$\mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x}) = \mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\log p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})] - D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p_{\boldsymbol{\theta}}(\mathbf{z}))$$

> 💡 **关键直觉**：ELBO 由两部分组成——第一项是**重构项**，鼓励解码器从隐变量准确还原输入；第二项是 **KL 正则项**，约束编码器输出的后验分布接近先验 \(p(\mathbf{z}) = \mathcal{N}(0, I)\)，防止隐空间退化并确保生成时可以从先验采样。

由于 KL 散度非负，ELBO 是边际似然的下界：\(\mathcal{L} \leq \log p_{\boldsymbol{\theta}}(\mathbf{x})\)。最大化 ELBO 等价于同时最大化似然并最小化变分后验与真实后验的差距。

##### 核心机制：重参数化技巧

ELBO 中的期望 \(\mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\cdot]\) 需要对 \(\mathbf{z}\) 采样来估计，但直接从 \(q_{\boldsymbol{\phi}}\) 采样会导致梯度无法对 \(\boldsymbol{\phi}\) 反向传播（采样操作不可微）。

**重参数化技巧**的核心思想是将随机变量 \(\mathbf{z}\) 表示为一个关于辅助噪声变量 \(\boldsymbol{\epsilon}\) 的确定性函数：

$$\mathbf{z} = g_{\boldsymbol{\phi}}(\boldsymbol{\epsilon}, \mathbf{x}) = \boldsymbol{\mu}_{\boldsymbol{\phi}}(\mathbf{x}) + \boldsymbol{\sigma}_{\boldsymbol{\phi}}(\mathbf{x}) \odot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$$

这样，期望从对 \(q_{\boldsymbol{\phi}}\) 的积分变为对 \(p(\boldsymbol{\epsilon})\) 的积分：

$$\mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[f(\mathbf{z})] = \mathbb{E}_{p(\boldsymbol{\epsilon})}[f(g_{\boldsymbol{\phi}}(\boldsymbol{\epsilon}, \mathbf{x}))]$$

> 💡 **关键直觉**：随机性被"外包"给了与参数无关的噪声 \(\boldsymbol{\epsilon}\)，而 \(\mathbf{z}\) 关于 \(\boldsymbol{\phi}\) 的依赖变成了确定性的、可微的，从而可以用标准反向传播计算梯度。

##### 高斯情形下的 KL 散度闭式解

当编码器输出高斯分布 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) = \mathcal{N}(\boldsymbol{\mu}, \text{diag}(\boldsymbol{\sigma}^2))\)，先验为标准正态 \(p(\mathbf{z}) = \mathcal{N}(0, \mathbf{I})\) 时，KL 散度有解析解：

$$D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z})) = -\frac{1}{2} \sum_{j=1}^{J} \left(1 + \log \sigma_j^2 - \mu_j^2 - \sigma_j^2\right)$$

其中 \(J\) 是隐变量维度。这避免了对 KL 项的蒙特卡洛估计，降低了方差。

##### 训练与推理流程

**训练阶段**：
1. 输入 \(\mathbf{x}\)，编码器输出 \(\boldsymbol{\mu}, \log \boldsymbol{\sigma}^2\)
2. 采样 \(\boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})\)，计算 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)
3. 解码器从 \(\mathbf{z}\) 重构 \(\hat{\mathbf{x}}\)
4. 计算损失 = 重构损失 + KL 散度，反向传播更新 \(\boldsymbol{\theta}, \boldsymbol{\phi}\)

**生成（推理）阶段**：
1. 从先验采样 \(\mathbf{z} \sim \mathcal{N}(0, \mathbf{I})\)
2. 通过解码器生成 \(\mathbf{x} = p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\)

##### 与传统方法的区别

| 方法 | 推断方式 | 可扩展性 | 端到端训练 |
|------|---------|---------|-----------|
| 均场变分推断 | 需要解析期望 | 受限于共轭性 | ❌ |
| MCMC | 迭代采样 | 计算代价高 | ❌ |
| Wake-Sleep | 两阶段交替 | 中等 | 部分 |
| **VAE (AEVB)** | **摊销推断 + 重参数化** | **可扩展到大数据** | **✅** |

> ⚠️ **注意**：VAE 的 ELBO 目标存在一个已知问题——**后验坍缩（posterior collapse）**，即编码器可能退化为先验，隐变量不携带有用信息。这在后续工作（如 β-VAE、δ-VAE）中被广泛研究。

#### 🧪 练习题

```yaml
question: "VAE 中重参数化技巧的核心作用是什么？"
options:
  - "将离散隐变量转化为连续隐变量"
  - "将采样操作的随机性与可学习参数解耦，使梯度可以反向传播"
  - "减少隐变量的维度以降低计算复杂度"
  - "使先验分布从高斯变为更灵活的分布族"
answer: 1
explain: "重参数化技巧将 z = μ + σ⊙ε，把随机性转移到与参数无关的噪声 ε 上，使得 z 关于编码器参数 φ 的梯度可以通过确定性路径反向传播。"
```