### DDPM — 去噪扩散概率模型

```yaml
id: ddpm
name: DDPM
full_name: 去噪扩散概率模型 (Denoising Diffusion Probabilistic Models)
year: 2020
org: UC Berkeley
paper_url: https://arxiv.org/abs/2006.11239
category: diffusion
parent: —
motivation: 建立扩散模型与去噪分数匹配的统一框架
```

#### 📝 一句话总结

DDPM 提出了一种基于参数化马尔可夫链的去噪扩散概率模型，通过将反向去噪过程重参数化为**预测噪声**的简化目标，在图像生成任务上取得了当时最优的 FID 分数，并揭示了扩散模型与去噪分数匹配 (Denoising Score Matching) 及 Langevin 动力学之间的深层等价关系。

#### 🎯 核心要点

- **前向扩散过程**：通过 \(T=1000\) 步的马尔可夫链逐步向数据添加高斯噪声，直至信号完全退化为标准正态分布
- **闭式采样公式**：利用 \(\bar{\alpha}_t\) 的累积乘积，可以从 \(x_0\) 一步跳转到任意时刻 \(x_t\)，无需逐步模拟前向过程
- **噪声预测重参数化**：将反向过程的均值预测转化为噪声 \(\varepsilon\) 的预测，极大简化了训练目标
- **简化损失函数 \(L_{\text{simple}}\)**：去掉 ELBO 中的权重系数，直接最小化预测噪声与真实噪声的 MSE，实验证明效果更优
- **U-Net 骨干网络**：采用基于 Wide ResNet 的 U-Net 架构，使用 Group Normalization、Transformer 正弦位置编码表示时间步、16×16 分辨率处加入自注意力
- **线性噪声调度**：\(\beta\) 从 \(10^{-4}\) 线性增长到 \(0.02\)，保证每步扩散量相对于数据尺度足够小
- **与分数匹配的等价性**：简化损失等价于多尺度去噪分数匹配目标，采样过程等价于 Langevin 动力学
- **渐进式有损压缩解释**：反向过程可视为自回归解码的推广，模型自然支持渐进式图像解码
- **SOTA 结果**：CIFAR10 上 IS=9.46、FID=3.17（当时最优）；256×256 LSUN 上质量媲美 ProgressiveGAN

#### 🔬 深入细节

##### 核心框架示意图

![DDPM 前向与反向过程的概率图模型](https://ar5iv.labs.arxiv.org/html/2006.11239/assets/x2.png)
*图：DDPM 的有向图模型。上方为前向扩散过程 \(q(x_t|x_{t-1})\)，逐步向数据注入噪声；下方为反向去噪过程 \(p_\theta(x_{t-1}|x_t)\)，由神经网络参数化，逐步恢复数据。*

##### 算法伪代码

**训练算法 (Algorithm 1)**：

```python
# DDPM 训练
while not converged:
    x_0 ~ q(x_0)                          # 从数据集采样
    t ~ Uniform({1, ..., T})               # 随机采样时间步
    ε ~ N(0, I)                            # 采样标准高斯噪声
    # 计算简化损失并梯度下降
    loss = || ε - ε_θ(√ᾱ_t · x_0 + √(1-ᾱ_t) · ε, t) ||²
    θ ← θ - η · ∇_θ loss
```

**采样算法 (Algorithm 2)**：

```python
# DDPM 采样（反向去噪）
x_T ~ N(0, I)                              # 从纯噪声开始
for t = T, T-1, ..., 1:
    z ~ N(0, I) if t > 1 else z = 0
    x_{t-1} = 1/√α_t · (x_t - (1-α_t)/√(1-ᾱ_t) · ε_θ(x_t, t)) + σ_t · z
return x_0
```

##### 1. 动机与背景：为什么需要扩散模型？

在 DDPM 之前，深度生成模型主要包括 GAN、VAE、Flow 和自回归模型。GAN 虽然生成质量高，但存在训练不稳定和模式坍塌问题；VAE 的生成质量受限于后验近似的精度；Flow 模型需要严格的可逆架构约束。

扩散概率模型（Diffusion Probabilistic Models）最早由 Sohl-Dickstein 等人在 2015 年提出，其核心思想来自非平衡热力学：通过一个固定的前向过程逐步破坏数据结构，再学习一个反向过程来恢复数据。然而早期工作的生成质量远不及 GAN。DDPM 的关键贡献在于：通过精心设计的参数化方式和简化的训练目标，首次证明扩散模型能够生成高质量图像，同时揭示了其与去噪分数匹配之间的深层联系。

##### 2. 前向扩散过程：如何系统地破坏数据？

前向过程定义为一个固定的马尔可夫链，逐步向数据 \(x_0\) 添加高斯噪声：

$$q(x_t | x_{t-1}) = \mathcal{N}(x_t;\, \sqrt{1-\beta_t}\, x_{t-1},\, \beta_t \mathbf{I})$$

其中 \(\beta_t \in (0, 1)\) 是预定义的噪声调度（variance schedule）。DDPM 使用从 \(\beta_1 = 10^{-4}\) 到 \(\beta_T = 0.02\) 的**线性调度**，共 \(T = 1000\) 步。

> 💡 **关键**：由于高斯分布的可加性，可以直接从 \(x_0\) 一步计算任意时刻的 \(x_t\)：

$$q(x_t | x_0) = \mathcal{N}(x_t;\, \sqrt{\bar{\alpha}_t}\, x_0,\, (1-\bar{\alpha}_t)\mathbf{I})$$

其中 \(\alpha_t = 1 - \beta_t\)，\(\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s\)。这意味着：

$$x_t = \sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1-\bar{\alpha}_t}\, \varepsilon, \quad \varepsilon \sim \mathcal{N}(0, \mathbf{I})$$

当 \(t\) 足够大时，\(\bar{\alpha}_T \approx 0\)，\(x_T\) 近似服从标准正态分布，数据信息几乎完全丢失。

##### 3. 反向去噪过程：如何从噪声恢复数据？

反向过程同样建模为马尔可夫链，但由神经网络参数化：

$$p_\theta(x_{t-1} | x_t) = \mathcal{N}(x_{t-1};\, \mu_\theta(x_t, t),\, \sigma_t^2 \mathbf{I})$$

**噪声预测重参数化**是 DDPM 最核心的设计。作者没有直接让网络预测 \(\mu_\theta\)，而是让网络预测添加的噪声 \(\varepsilon_\theta(x_t, t)\)，然后通过以下公式计算均值：

$$\mu_\theta(x_t, t) = \frac{1}{\sqrt{\alpha_t}} \left( x_t - \frac{1-\alpha_t}{\sqrt{1-\bar{\alpha}_t}}\, \varepsilon_\theta(x_t, t) \right)$$

> 💡 **直觉理解**：网络的任务是"看到一张加了噪声的图片 \(x_t\)，猜测其中的噪声成分 \(\varepsilon\)"。这比直接预测去噪后的图像更容易学习，因为噪声的统计特性（标准正态）是已知的。

对于方差 \(\sigma_t^2\)，DDPM 将其固定为 \(\beta_t\)（或 \(\tilde{\beta}_t = \frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_t}\beta_t\)），实验表明两种选择效果相近。

##### 4. 简化损失函数：从 ELBO 到 \(L_{\text{simple}}\)

标准的变分下界（ELBO）可以分解为多个 KL 散度项之和：

$$L = \mathbb{E}_q\Big[-\log p_\theta(x_0|x_1) + \sum_{t=2}^{T} D_{\text{KL}}(q(x_{t-1}|x_t,x_0) \| p_\theta(x_{t-1}|x_t)) + D_{\text{KL}}(q(x_T|x_0) \| p(x_T))\Big]$$

将噪声预测参数化代入后，每个 KL 散度项都简化为预测噪声与真实噪声之间的加权 MSE。DDPM 进一步发现，**去掉权重系数**后的简化目标在实践中效果更好：

$$L_{\text{simple}} = \mathbb{E}_{t, x_0, \varepsilon}\Big[\|\varepsilon - \varepsilon_\theta(\sqrt{\bar{\alpha}_t}\, x_0 + \sqrt{1-\bar{\alpha}_t}\, \varepsilon,\, t)\|^2\Big]$$

> ⚠️ **注意**：\(L_{\text{simple}}\) 虽然不是严格的变分下界，但它对小 \(t\)（低噪声）的去噪任务赋予了更高权重，这恰好有利于生成质量。论文实验证实，使用 \(L_{\text{simple}}\) 的 FID 分数优于使用完整加权 ELBO。

##### 5. 与去噪分数匹配的等价关系

DDPM 揭示了一个深刻的联系：简化损失 \(L_{\text{simple}}\) 本质上等价于**多尺度去噪分数匹配**（Denoising Score Matching）。具体而言，噪声预测网络 \(\varepsilon_\theta(x_t, t)\) 与数据分布的分数函数（score function）\(\nabla_{x_t} \log q(x_t)\) 之间存在如下关系：

$$\varepsilon_\theta(x_t, t) \approx -\sqrt{1-\bar{\alpha}_t}\, \nabla_{x_t} \log q(x_t)$$

因此，DDPM 的采样过程可以理解为一种离散化的 **Langevin 动力学**：每一步去噪都沿着数据分布的梯度方向移动，同时注入适量随机噪声以保持多样性。这一发现将扩散模型与基于分数的生成模型（Score-based Generative Models）统一在同一框架下。

##### 6. 网络架构与实验设置

DDPM 采用基于 PixelCNN++ 骨干的 **U-Net** 架构，具体设计包括：

| 组件 | 设计选择 |
|------|---------|
| 基础架构 | U-Net（基于 Wide ResNet） |
| 归一化 | Group Normalization（替代 Weight Normalization） |
| 时间编码 | Transformer 正弦位置编码 |
| 注意力机制 | 16×16 分辨率处使用自注意力 |
| 分辨率层级 | 32×32 模型使用 4 级（32→4），256×256 模型使用 6 级 |
| 正则化 | CIFAR10 使用 dropout=0.1 |

时间步 \(t\) 通过正弦位置编码注入网络，使得同一组参数可以在所有时间步之间共享，网络能够根据 \(t\) 的大小自适应地调整去噪策略。

**实验结果**：

| 数据集 | IS ↑ | FID ↓ | 备注 |
|--------|------|-------|------|
| CIFAR10 (无条件) | 9.46 | **3.17** | 当时 SOTA |
| LSUN Bedroom 256 | — | — | 质量媲美 ProgressiveGAN |
| LSUN Church 256 | — | — | 高质量无条件生成 |
| CelebA-HQ 256 | — | — | 高保真人脸生成 |

##### 7. 与传统方法的对比

| 特性 | GAN | VAE | Flow | DDPM |
|------|-----|-----|------|------|
| 训练稳定性 | 差（对抗训练） | 好 | 好 | **好（简单 MSE 损失）** |
| 生成质量 | 高 | 中 | 中 | **高** |
| 模式覆盖 | 差（模式坍塌） | 好 | 好 | **好** |
| 似然评估 | 不支持 | 下界 | 精确 | **下界** |
| 采样速度 | 快（单步） | 快（单步） | 快（单步） | **慢（T=1000 步）** |
| 架构约束 | 需判别器 | 编解码器 | 可逆网络 | **无特殊约束** |

> ⚠️ **注意**：DDPM 的主要局限在于采样速度——需要 1000 步迭代才能生成一张图片。这一问题后来被 DDIM、DPM-Solver 等加速采样方法以及 Latent Diffusion 等潜空间方法所缓解。

#### 🧪 练习题

```yaml
question: "DDPM 中简化损失函数 L_simple 的优化目标是什么？"
options:
  - "最小化生成图像与真实图像的像素级 MSE"
  - "最小化预测噪声 ε_θ 与实际添加噪声 ε 之间的 MSE"
  - "最大化反向过程的对数似然"
  - "最小化前向过程与反向过程的 KL 散度"
answer: 1
explain: "DDPM 将反向过程参数化为噪声预测网络，L_simple = E[||ε - ε_θ(x_t, t)||²]，即直接最小化网络预测的噪声与前向过程中实际添加的高斯噪声之间的均方误差。"
```