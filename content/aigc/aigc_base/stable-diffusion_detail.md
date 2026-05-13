### 稳定扩散模型 (Stable Diffusion)

```yaml
id: stable-diffusion
name: Stable Diffusion
full_name: "稳定扩散模型 (Stable Diffusion)"
year: 2022
org: Stability AI
paper_url: "https://arxiv.org/abs/2112.10752"
category: diffusion
parent: ddpm
motivation: "潜空间扩散（LDM）降低计算成本"
```

#### 📝 一句话总结

Latent Diffusion Models (LDM) 提出在预训练自编码器的低维潜空间中执行扩散过程，将感知压缩与生成学习解耦，在大幅降低训练和推理计算成本的同时保持甚至超越像素空间扩散模型的生成质量，并通过交叉注意力机制实现灵活的多模态条件生成。

#### 🎯 核心要点

- **两阶段解耦训练**：第一阶段训练自编码器进行感知压缩（去除高频细节冗余），第二阶段在压缩后的潜空间中训练扩散模型学习语义生成
- **感知压缩自编码器**：使用 KL 散度或 VQ 正则化的自编码器，将图像从像素空间 \(x \in \mathbb{R}^{H \times W \times 3}\) 编码到潜空间 \(z \in \mathbb{R}^{h \times w \times c}\)，下采样因子 \(f = H/h\)
- **潜空间扩散模型**：在低维潜空间中使用 U-Net 架构的去噪网络 \(\epsilon_\theta(z_t, t)\) 执行扩散过程，计算量相比像素空间大幅降低
- **交叉注意力条件机制**：通过在 U-Net 中引入交叉注意力层，将文本、语义图、布局等多模态条件 \(y\) 经领域特定编码器 \(\tau_\theta(y)\) 映射后注入生成过程
- **下采样因子分析**：系统研究了 \(f \in \{1,2,4,8,16,32\}\) 的权衡，发现 \(f=4\) 和 \(f=8\) 在效率与质量间取得最佳平衡
- **广泛的条件生成能力**：支持文本到图像、布局到图像、语义合成、超分辨率、图像修复等多种任务
- **无分类器引导（Classifier-Free Guidance）**：结合无条件与条件预测增强生成质量，在文本到图像任务上显著提升 FID 和 IS

#### 🔬 深入细节

##### 模型架构总览

![LDM 架构示意图](https://ar5iv.labs.arxiv.org/html/2112.10752/assets/x1.png)
*图：Latent Diffusion Model 整体架构。左侧为感知压缩的自编码器（Encoder \(\mathcal{E}\) / Decoder \(\mathcal{D}\)），中间为潜空间中的扩散过程（Denoising U-Net），右侧为通过交叉注意力注入的条件信息。*

![感知与语义压缩示意](https://ar5iv.labs.arxiv.org/html/2112.10752/assets/img/generativevscompressive4.jpg)
*图：数字图像中大部分比特对应感知上不可区分的细节（感知压缩），去除后仍保留语义结构（语义压缩）。LDM 先通过自编码器完成感知压缩，再在潜空间学习语义生成。*

##### 算法伪代码

```python
# === 阶段一：训练感知压缩自编码器 ===
# 编码器 E 将图像 x 映射到潜空间 z = E(x)
# 解码器 D 从潜空间重建图像 x̃ = D(z) = D(E(x))
# 损失：L_autoencoder = L_rec(x, D(E(x))) + L_reg(z) + L_adv(D(E(x)))
#   其中 L_reg 为 KL 散度或 VQ 正则化，L_adv 为 patch-based 对抗损失

# === 阶段二：训练潜空间扩散模型 ===
# 输入：预训练编码器 E（冻结），条件编码器 τ_θ
for each training step:
    x, y = sample_data()           # x: 图像, y: 条件（文本/标签等）
    z_0 = E(x)                     # 编码到潜空间（冻结）
    t = uniform(1, T)              # 随机采样时间步
    ε = sample_normal(0, I)        # 采样噪声
    z_t = sqrt(ᾱ_t) * z_0 + sqrt(1 - ᾱ_t) * ε  # 前向加噪
    
    # 条件去噪预测
    ε_pred = ε_θ(z_t, t, τ_θ(y))  # U-Net + 交叉注意力
    loss = ||ε - ε_pred||²         # 简化损失
    optimizer.step(loss)

# === 推理：从噪声生成图像 ===
z_T = sample_normal(0, I)          # 从纯噪声开始
for t in reversed(range(1, T+1)):  # 可用 DDIM 加速
    ε_pred = ε_θ(z_t, t, τ_θ(y))
    z_{t-1} = denoise_step(z_t, ε_pred, t)  # DDPM/DDIM 更新
x_gen = D(z_0)                     # 解码回像素空间
```

##### 动机与背景

传统扩散模型（如 DDPM）直接在像素空间执行前向加噪和反向去噪过程。对于高分辨率图像（如 \(512 \times 512\) 或更高），这意味着去噪网络需要在极高维空间中操作，导致：

1. **训练成本极高**：在像素空间训练高分辨率扩散模型需要数百 GPU 天
2. **推理速度慢**：每次生成需要数百步序列化去噪，每步都在高维空间计算
3. **资源不可及**：普通研究者难以复现和改进

> 💡 **关键洞察**：图像中大量信息是感知上冗余的高频细节。生成模型不需要在原始像素空间学习这些细节——可以先压缩掉感知冗余，只在保留语义信息的低维空间中学习生成。

##### 核心机制详解

**1. 感知压缩自编码器**

第一阶段训练一个自编码器，将图像压缩到低维潜空间。编码器 \(\mathcal{E}\) 将输入图像 \(x \in \mathbb{R}^{H \times W \times 3}\) 编码为潜表示 \(z = \mathcal{E}(x) \in \mathbb{R}^{h \times w \times c}\)，解码器 \(\mathcal{D}\) 从潜表示重建图像 \(\tilde{x} = \mathcal{D}(z)\)。

训练目标结合了感知损失、正则化损失和对抗损失：

$$\mathcal{L}_{\text{Autoencoder}} = \min_{\mathcal{E}, \mathcal{D}} \max_{\psi} \left( \mathcal{L}_{\text{rec}}(x, \mathcal{D}(\mathcal{E}(x))) - \mathcal{L}_{\text{adv}}(\mathcal{D}(\mathcal{E}(x)); \psi) + \log D_\psi(x) + \mathcal{L}_{\text{reg}}(x; \mathcal{E}, \mathcal{D}) \right)$$

其中正则化项 \(\mathcal{L}_{\text{reg}}\) 有两种选择：
- **KL 正则化**：对潜空间施加轻微的 KL 散度惩罚，使其接近标准正态分布
- **VQ 正则化**：在解码器中使用向量量化层（类似 VQGAN）

> ⚠️ **注意**：与 VAE 不同，这里的正则化权重很小（KL 惩罚因子约 \(10^{-6}\)），目的是避免潜空间方差过大，而非强制匹配先验分布。这保证了重建质量的同时使潜空间足够规整以供扩散模型学习。

**2. 潜空间扩散模型**

在冻结的潜空间中，训练一个基于 U-Net 的去噪网络。核心损失函数为：

$$\mathcal{L}_{\text{LDM}} := \mathbb{E}_{\mathcal{E}(x), \epsilon \sim \mathcal{N}(0,1), t} \left[ \| \epsilon - \epsilon_\theta(z_t, t) \|_2^2 \right]$$

其中 \(z_t\) 是在时间步 \(t\) 对潜表示 \(z_0 = \mathcal{E}(x)\) 加噪后的结果。由于潜空间维度远低于像素空间（例如 \(f=8\) 时空间维度缩小 64 倍），U-Net 的计算量大幅降低。

**3. 交叉注意力条件机制**

为实现灵活的条件生成，论文在 U-Net 的中间层引入交叉注意力机制。给定条件输入 \(y\)（文本、语义图、布局等），首先通过领域特定的编码器 \(\tau_\theta\) 将其映射为中间表示 \(\tau_\theta(y) \in \mathbb{R}^{M \times d_\tau}\)，然后通过交叉注意力与 U-Net 特征交互：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d}}\right) \cdot V$$

其中：

$$Q = W_Q^{(i)} \cdot \varphi_i(z_t), \quad K = W_K^{(i)} \cdot \tau_\theta(y), \quad V = W_V^{(i)} \cdot \tau_\theta(y)$$

- \(Q\) 来自 U-Net 中间特征 \(\varphi_i(z_t)\)（展平的空间特征）
- \(K, V\) 来自条件编码 \(\tau_\theta(y)\)
- \(W_Q, W_K, W_V\) 是可学习的投影矩阵

条件生成的损失函数为：

$$\mathcal{L}_{\text{LDM}} := \mathbb{E}_{\mathcal{E}(x), y, \epsilon \sim \mathcal{N}(0,1), t} \left[ \| \epsilon - \epsilon_\theta(z_t, t, \tau_\theta(y)) \|_2^2 \right]$$

> 💡 **设计优势**：这种基于交叉注意力的条件机制是**通用的**——只需更换条件编码器 \(\tau_\theta\)，同一个 U-Net 架构就能处理文本（BERT/CLIP 编码器）、语义图（卷积编码器）、布局（边界框编码器）等不同模态的条件输入。

**4. 下采样因子的权衡**

论文系统分析了不同下采样因子 \(f\) 对生成质量和效率的影响：

| 下采样因子 | 潜空间大小（256²输入） | 特点 |
|:---:|:---:|:---|
| \(f=1\) | \(256 \times 256\) | 等同像素空间扩散，训练极慢 |
| \(f=2\) | \(128 \times 128\) | 压缩不足，训练仍然缓慢 |
| \(f=4\) | \(64 \times 64\) | ✅ 效率与质量的最佳平衡点之一 |
| \(f=8\) | \(32 \times 32\) | ✅ 效率与质量的最佳平衡点之一 |
| \(f=16\) | \(16 \times 16\) | 质量开始下降 |
| \(f=32\) | \(8 \times 8\) | 压缩过度，信息损失严重 |

实验表明，\(f=4\) 和 \(f=8\) 在 ImageNet 上训练 2M 步后，FID 比像素空间扩散模型（\(f=1\)）低约 38 分，同时采样速度显著提升。

##### 与传统方法的对比

| 特性 | 像素空间扩散 (DDPM/ADM) | LDM (本文) |
|:---|:---|:---|
| 操作空间 | 高维像素空间 | 低维潜空间 |
| 计算成本 | 极高（数百 V100 天） | 大幅降低（单 A100 可训练） |
| 条件机制 | 分类器引导或拼接 | 通用交叉注意力 |
| 多模态条件 | 需要针对性设计 | 更换编码器即可 |
| 生成质量 | 高 | 相当或更优 |
| 推理速度 | 慢 | 快（潜空间维度低 + DDIM 加速） |

与 LSGM 等同样在潜空间训练扩散模型的方法不同，LDM **分阶段独立训练**自编码器和扩散模型，避免了联合训练中重建质量与先验学习之间的权衡难题。

##### 实验结果

在无条件图像生成任务上，LDM 在 CelebA-HQ 256×256 上达到 FID=5.11 的新 SOTA；在 LSUN-Bedrooms 上达到 FID=2.95，接近 ADM 的 1.90。在文本到图像生成任务上（MS-COCO 256×256），LDM-KL-8 配合无分类器引导（\(s=1.5\)）达到 FID=12.63，IS=30.29，仅用 1.45B 参数即与 GLIDE（6B 参数）和 Make-A-Scene（4B 参数）持平。

#### 🧪 练习题

```yaml
question: "LDM 在潜空间而非像素空间执行扩散过程的核心优势是什么？"
options:
  - "潜空间的正态分布假设使扩散过程的数学推导更简洁"
  - "去除感知冗余后在低维空间操作，大幅降低计算成本同时保持生成质量"
  - "潜空间中的噪声分布更接近高斯分布，提升了去噪网络的预测精度"
  - "潜空间编码天然包含语义信息，无需额外的条件机制即可实现条件生成"
answer: 1
explain: "LDM 的核心思想是通过自编码器先去除图像中感知上冗余的高频细节（感知压缩），然后在压缩后的低维潜空间中训练扩散模型。这使得 U-Net 在远低于像素空间的维度上操作，计算量大幅降低，同时语义信息得以保留，生成质量不受损。"
```