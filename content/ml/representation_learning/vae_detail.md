### VAE — 变分自编码器 (Variational Autoencoder)

```yaml
id: vae
name: VAE
full_name: 变分自编码器 (Variational Autoencoder)
year: '2013'
org: Kingma & Welling
paper_url: https://arxiv.org/abs/1312.6114
category: deep_rep
parent: —
motivation: 重参数化技巧实现变分推断
```

#### 📝 一句话总结

VAE 提出了重参数化技巧（Reparameterization Trick），将变分推断中不可微的采样操作转化为可微的确定性变换，使得含连续隐变量的深度生成模型可以通过标准随机梯度下降进行端到端训练，奠定了深度生成模型的基础框架。

#### 🎯 核心要点

- **编码器-解码器框架**：编码器（识别模型）\(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 近似不可解的后验分布，解码器（生成模型）\(p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\) 从隐变量重建数据
- **证据下界（ELBO）**：将不可解的边际对数似然分解为可优化的变分下界，同时训练编码器和解码器
- **重参数化技巧**：将随机采样 \(\mathbf{z} \sim q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 重写为确定性函数 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)，其中 \(\boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})\)，使梯度可以反向传播
- **SGVB 估计器**：Stochastic Gradient Variational Bayes 估计器，对 ELBO 进行无偏蒙特卡洛估计
- **AEVB 算法**：Auto-Encoding VB 算法，结合 SGVB 估计器和摊销推断（amortized inference），实现高效的小批量训练
- **损失函数双组分**：ELBO = 重建损失（负重建误差）+ KL 散度正则项（约束隐空间接近先验）
- **实验验证**：在 MNIST 和 Frey Face 数据集上验证，与 Wake-Sleep 算法和 Monte Carlo EM 对比

#### 🔬 深入细节

##### 核心框架图

![VAE 训练收敛对比](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x1.png)
*图：AEVB 方法与 Wake-Sleep 算法在不同隐空间维度下的变分下界收敛对比。AEVB 在各维度下均收敛更快且达到更优的下界值。*

![学习到的 MNIST 流形](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x4.png)
*图：VAE 在 2 维隐空间上学习到的 MNIST 数字流形。通过在隐空间网格上均匀采样并解码，可以看到数字之间的平滑过渡。*

##### 算法伪代码

```python
# AEVB (Auto-Encoding Variational Bayes) 算法
# 输入: 数据集 X, 编码器参数 φ, 解码器参数 θ
# 超参数: 小批量大小 M=100, 采样数 L=1

初始化参数 θ, φ
while 未收敛:
    X_M ← 从数据集随机采样 M 个样本
    ε ← 从 N(0, I) 采样噪声
    
    # 编码: 通过编码器获得隐变量分布参数
    μ, log_σ² = encoder_φ(X_M)
    
    # 重参数化: z = μ + σ ⊙ ε (使采样可微)
    z = μ + exp(0.5 * log_σ²) * ε
    
    # 解码: 重建数据
    X_recon = decoder_θ(z)
    
    # 计算 ELBO (损失函数)
    recon_loss = -log p_θ(X_M | z)           # 重建损失
    kl_loss = KL(q_φ(z|X_M) || p(z))         # KL 散度正则项
    L = recon_loss + kl_loss
    
    # 梯度更新
    g = ∇_{θ,φ} L
    θ, φ ← 用 SGD/Adam 更新参数
    
return θ, φ
```

##### 动机与背景

在概率生成模型中，我们假设观测数据 \(\mathbf{x}\) 由隐变量 \(\mathbf{z}\) 生成：先从先验分布 \(p_{\boldsymbol{\theta}}(\mathbf{z})\) 中采样隐变量，再通过条件分布 \(p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\) 生成观测数据。模型训练的目标是最大化边际对数似然：

$$\log p_{\boldsymbol{\theta}}(\mathbf{x}) = \log \int p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z}) p_{\boldsymbol{\theta}}(\mathbf{z}) \, d\mathbf{z}$$

然而这个积分通常是**不可解的**（intractable），因为它需要对所有可能的隐变量值进行积分。传统变分推断方法（如均场近似）需要手动推导解析期望，限制了模型的灵活性；MCMC 方法虽然通用但计算代价高昂，难以扩展到大规模数据集。VAE 的核心动机就是：**如何在保持模型灵活性的同时，实现高效的、可扩展的变分推断？**

##### 证据下界（ELBO）推导

VAE 的理论基础是变分推断。对于每个数据点 \(\mathbf{x}^{(i)}\)，边际对数似然可以分解为：

$$\log p_{\boldsymbol{\theta}}(\mathbf{x}^{(i)}) = D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}^{(i)}) \| p_{\boldsymbol{\theta}}(\mathbf{z}|\mathbf{x}^{(i)})) + \mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x}^{(i)})$$

其中第一项是近似后验 \(q_{\boldsymbol{\phi}}\) 与真实后验之间的 KL 散度（非负），第二项即为**证据下界（ELBO）**：

$$\mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x}^{(i)}) = \mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\log p_{\boldsymbol{\theta}}(\mathbf{x}^{(i)}|\mathbf{z})] - D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}^{(i)}) \| p_{\boldsymbol{\theta}}(\mathbf{z}))$$

> 💡 **关键直觉**：ELBO 由两部分组成——第一项是**重建项**，鼓励解码器从隐变量准确重建输入数据；第二项是 **KL 正则项**，鼓励编码器输出的后验分布接近先验分布（通常为标准正态分布），从而使隐空间具有良好的结构。

由于 KL 散度非负，ELBO 始终是边际对数似然的下界。最大化 ELBO 等价于同时：(1) 最大化似然（使模型更好地拟合数据）；(2) 最小化近似后验与真实后验的差距。

##### 重参数化技巧（Reparameterization Trick）

ELBO 中的期望 \(\mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\cdot]\) 需要从 \(q_{\boldsymbol{\phi}}\) 中采样来估计，但采样操作是**不可微的**，无法直接反向传播梯度到编码器参数 \(\boldsymbol{\phi}\)。这是 VAE 最核心的技术贡献——**重参数化技巧**：

将随机变量 \(\mathbf{z} \sim q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 表示为确定性变换：

$$\mathbf{z} = g_{\boldsymbol{\phi}}(\boldsymbol{\epsilon}, \mathbf{x}), \quad \boldsymbol{\epsilon} \sim p(\boldsymbol{\epsilon})$$

对于高斯情形（论文中最常用的设定），编码器输出均值 \(\boldsymbol{\mu}\) 和对数方差 \(\log \boldsymbol{\sigma}^2\)，重参数化为：

$$\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(\mathbf{0}, \mathbf{I})$$

> 💡 **关键直觉**：随机性被"外包"给了与参数无关的噪声变量 \(\boldsymbol{\epsilon}\)，而 \(\mathbf{z}\) 关于 \(\boldsymbol{\phi}\) 的函数变成了确定性的、可微的。这样梯度就可以通过 \(\mathbf{z}\) 流回编码器参数。

这一技巧使得 ELBO 的蒙特卡洛估计变为：

$$\widetilde{\mathcal{L}}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x}^{(i)}) = \frac{1}{L}\sum_{l=1}^{L} \log p_{\boldsymbol{\theta}}(\mathbf{x}^{(i)}|\mathbf{z}^{(i,l)}) - D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}^{(i)}) \| p_{\boldsymbol{\theta}}(\mathbf{z}))$$

其中 \(\mathbf{z}^{(i,l)} = \boldsymbol{\mu}^{(i)} + \boldsymbol{\sigma}^{(i)} \odot \boldsymbol{\epsilon}^{(l)}\)，实验中 \(L=1\) 即可工作良好。

##### 高斯情形下的解析 KL 散度

当先验为标准正态 \(p(\mathbf{z}) = \mathcal{N}(\mathbf{0}, \mathbf{I})\)，近似后验为对角高斯 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) = \mathcal{N}(\boldsymbol{\mu}, \text{diag}(\boldsymbol{\sigma}^2))\) 时，KL 散度有解析解：

$$D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z})) = -\frac{1}{2}\sum_{j=1}^{J}(1 + \log \sigma_j^2 - \mu_j^2 - \sigma_j^2)$$

其中 \(J\) 是隐变量维度。这避免了对 KL 项进行蒙特卡洛估计，降低了方差。

##### 训练与推理流程

**训练流程**：
1. 从数据集采样小批量 \(\mathbf{X}^M\)（\(M=100\)）
2. 编码器前向传播：\(\mathbf{x} \to (\boldsymbol{\mu}, \log\boldsymbol{\sigma}^2)\)
3. 重参数化采样：\(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)
4. 解码器前向传播：\(\mathbf{z} \to \hat{\mathbf{x}}\)
5. 计算 ELBO 损失并反向传播更新 \(\boldsymbol{\theta}, \boldsymbol{\phi}\)

**生成（推理）流程**：
1. 从先验 \(p(\mathbf{z}) = \mathcal{N}(\mathbf{0}, \mathbf{I})\) 中采样 \(\mathbf{z}\)
2. 通过解码器 \(p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\) 生成新样本

##### 与传统方法的区别

| 方法 | 推断方式 | 可扩展性 | 灵活性 |
|------|---------|---------|--------|
| **均场变分推断** | 解析期望 | 中等 | 低（需共轭先验） |
| **MCMC** | 马尔可夫链采样 | 低（每个数据点需迭代） | 高 |
| **Wake-Sleep** | 双目标函数优化 | 中等 | 中等 |
| **VAE (AEVB)** | 摊销推断 + 重参数化 | **高**（SGD + 小批量） | **高**（任意可微模型） |

> ⚠️ **注意**：VAE 的一个已知问题是"后验坍缩"（posterior collapse）——当解码器过于强大时，模型可能忽略隐变量，使 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 退化为先验。这在后续工作（如 β-VAE、VQ-VAE）中得到了广泛研究。

![不同隐空间维度下的 MNIST 生成样本](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x5.png)
*图：2 维隐空间下 VAE 生成的 MNIST 样本，展示了隐空间的连续性和可解释性。*

#### 🧪 练习题

```yaml
question: "VAE 中重参数化技巧的核心作用是什么？"
options:
  - "降低模型参数量，加速训练"
  - "将采样操作转化为确定性可微变换，使梯度可以反向传播到编码器"
  - "使先验分布更接近真实数据分布"
  - "消除 ELBO 中的 KL 散度项"
answer: 1
explain: "重参数化技巧将 z = μ + σ⊙ε 中的随机性转移到与参数无关的噪声 ε 上，使 z 关于编码器参数 φ 的梯度可以正常计算和反向传播。"
```