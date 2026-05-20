---
domain: aigc
topic_id: text2image
topic_name: 文生图技术演进
page_icon: 🎨
page_title: 文生图技术演进
page_subtitle: '{build_date} 版'
page_desc: 从GAN到扩散模型，从Stable Diffusion到FLUX.1的文生图技术全景演进
hero_pills:
- 🏷️ Diffusion Models · GAN · Transformer · Flow Matching · AIGC
count_pill: '{count} 个算法'
categories:
  gan_era:
    label: 对抗生成时代
    color: '#8B5CF6'
  vae_discrete:
    label: 离散化与VAE
    color: '#F59E0B'
  diffusion_foundation:
    label: 扩散模型奠基
    color: '#10B981'
  sd_evolution:
    label: SD系列演进
    color: '#3B82F6'
  frontier_2026:
    label: 2026前沿探索
    color: '#EF4444'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: stackgan
  x: 100
  y: 100
  category: gan_era
- id: attngan
  x: 200
  y: 100
  category: gan_era
- id: stylegan
  x: 300
  y: 100
  category: gan_era
- id: vqvae
  x: 100
  y: 200
  category: vae_discrete
- id: vqgan
  x: 400
  y: 200
  category: vae_discrete
- id: llamagen
  x: 800
  y: 200
  category: vae_discrete
- id: ddpm
  x: 400
  y: 300
  category: diffusion_foundation
- id: ddim
  x: 450
  y: 280
  category: diffusion_foundation
- id: score_sde
  x: 450
  y: 320
  category: diffusion_foundation
- id: clip
  x: 500
  y: 300
  category: diffusion_foundation
- id: ldm
  x: 600
  y: 400
  category: sd_evolution
- id: sd_v2
  x: 650
  y: 400
  category: sd_evolution
- id: controlnet
  x: 700
  y: 380
  category: sd_evolution
- id: ip_adapter
  x: 700
  y: 420
  category: sd_evolution
- id: sdxl
  x: 750
  y: 400
  category: sd_evolution
- id: sd3
  x: 850
  y: 400
  category: sd_evolution
- id: flux_1
  x: 900
  y: 400
  category: sd_evolution
- id: lumina_mgpt
  x: 950
  y: 200
  category: frontier_2026
- id: npp
  x: 950
  y: 220
  category: frontier_2026
- id: infinitystar
  x: 1000
  y: 200
  category: frontier_2026
- id: argen_dexion
  x: 1000
  y: 220
  category: frontier_2026
- id: nextstep_1
  x: 1000
  y: 240
  category: frontier_2026
- id: tlcm
  x: 850
  y: 500
  category: frontier_2026
- id: dit_air
  x: 920
  y: 480
  category: frontier_2026
- id: pixart_alpha
  x: 900
  y: 500
  category: frontier_2026
- id: sana
  x: 950
  y: 500
  category: frontier_2026
- id: mm_r1
  x: 980
  y: 440
  category: frontier_2026
- id: vinci
  x: 1020
  y: 440
  category: frontier_2026
- id: lmfusion
  x: 1000
  y: 460
  category: frontier_2026
- id: unigen
  x: 1040
  y: 460
  category: frontier_2026
edges:
- from: stackgan
  to: attngan
  label: 注意力增强
- from: attngan
  to: stylegan
  label: 风格控制
- from: vqvae
  to: vqgan
  label: 感知增强
- from: vqgan
  to: llamagen
  label: 自回归统一
- from: ddpm
  to: ddim
  label: 加速采样
- from: ddpm
  to: score_sde
  label: 理论统一
- from: ddpm
  to: ldm
  label: 潜空间迁移
- from: ldm
  to: sd_v2
  label: 编码器升级
- from: sd_v2
  to: sdxl
  label: 级联增强
- from: sdxl
  to: sd3
  label: MMDiT引入
- from: sd3
  to: flux_1
  label: 流匹配巅峰
- from: ldm
  to: controlnet
  label: 空间控制
- from: ldm
  to: ip_adapter
  label: 图像提示
- from: llamagen
  to: lumina_mgpt
  label: 多模态扩展
- from: llamagen
  to: npp
  label: 预测策略
- from: lumina_mgpt
  to: infinitystar
  label: 时空统一
- from: llamagen
  to: argen_dexion
  label: 解码器增强
- from: llamagen
  to: nextstep_1
  label: 连续Token
- from: ldm
  to: tlcm
  label: 一致性加速
- from: sd3
  to: dit_air
  label: 架构优化
- from: sd3
  to: pixart_alpha
  label: 训练高效
- from: pixart_alpha
  to: sana
  label: 线性注意力
- from: flux_1
  to: mm_r1
  label: 偏好对齐
- from: mm_r1
  to: vinci
  label: 推理增强
- from: flux_1
  to: lmfusion
  label: 理解生成统一
- from: lmfusion
  to: unigen
  label: 多任务统一
milestones:
- id: clip
  label: 跨模态语义对齐基石
- id: ldm
  label: 潜空间扩散开创开源生态
- id: flux_1
  label: 流匹配与大规模Transformer成熟
```

## 核心算法

### StackGAN

```yaml
id: stackgan
num: 1
name: StackGAN
full_name: 条件增强文生图 (StackGAN)
year: '2017'
org: 百度/Rutgers
parent: —
paper_url: https://arxiv.org/abs/1612.03242
project_url: ''
category: gan_era
motivation: 两阶段生成与条件增强
```

#### 📝 一句话总结
StackGAN 的核心目标是：两阶段生成与条件增强。

#### 🎯 核心要点
- 核心动机：两阶段生成与条件增强
- 代表机构：百度/Rutgers

#### 🔬 深入细节
两阶段生成与条件增强


### AttnGAN

```yaml
id: attngan
num: 2
name: AttnGAN
full_name: 注意力文生图 (AttnGAN)
year: '2018'
org: 微软
parent: stackgan
paper_url: https://arxiv.org/abs/1711.10485
project_url: ''
category: gan_era
motivation: 单词级注意力与DAMSM
```

#### 📝 一句话总结
AttnGAN 的核心目标是：单词级注意力与DAMSM。

#### 🎯 核心要点
- 核心动机：单词级注意力与DAMSM
- 演化来源：继承或改进自 stackgan
- 代表机构：微软

#### 🔬 深入细节
单词级注意力与DAMSM


### StyleGAN

```yaml
id: stylegan
num: 3
name: StyleGAN
full_name: 风格生成网络 (StyleGAN)
year: '2019'
org: NVIDIA
parent: attngan
paper_url: https://arxiv.org/abs/1812.04948
project_url: ''
category: gan_era
motivation: 映射网络与AdaIN风格注入
```

#### 📝 一句话总结
StyleGAN 的核心目标是：映射网络与AdaIN风格注入。

#### 🎯 核心要点
- 核心动机：映射网络与AdaIN风格注入
- 演化来源：继承或改进自 attngan
- 代表机构：NVIDIA

#### 🔬 深入细节
映射网络与AdaIN风格注入


### VQ-VAE

```yaml
id: vqvae
num: 4
name: VQ-VAE
full_name: 矢量量化变分自编码器 (VQ-VAE)
year: '2017'
org: DeepMind
parent: —
paper_url: https://arxiv.org/abs/1711.00937
project_url: ''
category: vae_discrete
motivation: 可学习码本将图像离散化
```

#### 📝 一句话总结
VQ-VAE 的核心目标是：可学习码本将图像离散化。

#### 🎯 核心要点
- 核心动机：可学习码本将图像离散化
- 代表机构：DeepMind

#### 🔬 深入细节
可学习码本将图像离散化


### VQ-GAN

```yaml
id: vqgan
num: 5
name: VQ-GAN
full_name: 矢量量化生成网络 (VQ-GAN)
year: '2020'
org: 海德堡大学
parent: vqvae
paper_url: https://arxiv.org/abs/2012.09841
project_url: ''
category: vae_discrete
motivation: CNN归纳偏置与Transformer建模
```

#### 📝 一句话总结
VQ-GAN 的核心目标是：CNN归纳偏置与Transformer建模。

#### 🎯 核心要点
- 核心动机：CNN归纳偏置与Transformer建模
- 演化来源：继承或改进自 vqvae
- 代表机构：海德堡大学

#### 🔬 深入细节
CNN归纳偏置与Transformer建模


### DDPM

```yaml
id: ddpm
num: 6
name: DDPM
full_name: 去噪扩散概率模型 (DDPM)
year: '2020'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2006.11239
project_url: ''
category: diffusion_foundation
motivation: 确立去噪扩散范式
```

#### 📝 一句话总结
DDPM 的核心目标是：确立去噪扩散范式。

#### 🎯 核心要点
- 核心动机：确立去噪扩散范式
- 代表机构：UC Berkeley

#### 🔬 深入细节
确立去噪扩散范式


### DDIM

```yaml
id: ddim
num: 7
name: DDIM
full_name: 去噪扩散隐式模型 (DDIM)
year: '2020'
org: Stanford
parent: ddpm
paper_url: https://arxiv.org/abs/2010.02502
project_url: ''
category: diffusion_foundation
motivation: 非马尔可夫加速采样
```

#### 📝 一句话总结
DDIM 的核心目标是：非马尔可夫加速采样。

#### 🎯 核心要点
- 核心动机：非马尔可夫加速采样
- 演化来源：继承或改进自 ddpm
- 代表机构：Stanford

#### 🔬 深入细节
非马尔可夫加速采样


### Score SDE

```yaml
id: score_sde
num: 8
name: Score SDE
full_name: 基于分数的SDE (Score SDE)
year: '2020'
org: Stanford
parent: ddpm
paper_url: https://arxiv.org/abs/2011.13456
project_url: ''
category: diffusion_foundation
motivation: 统一SDE理论框架
```

#### 📝 一句话总结
Score SDE 的核心目标是：统一SDE理论框架。

#### 🎯 核心要点
- 核心动机：统一SDE理论框架
- 演化来源：继承或改进自 ddpm
- 代表机构：Stanford

#### 🔬 深入细节
统一SDE理论框架


### CLIP

```yaml
id: clip
num: 9
name: CLIP
full_name: 对比语言图像预训练 (CLIP)
year: '2021'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2103.00020
project_url: ''
category: diffusion_foundation
motivation: 大规模跨模态语义对齐
```

#### 📝 一句话总结
CLIP 的核心目标是：大规模跨模态语义对齐。

#### 🎯 核心要点
- 核心动机：大规模跨模态语义对齐
- 代表机构：OpenAI

#### 🔬 深入细节
大规模跨模态语义对齐


### LDM/SD v1.5

```yaml
id: ldm
num: 10
name: LDM/SD v1.5
full_name: 潜在扩散模型 (Latent Diffusion)
year: '2022'
org: CompVis/Stability AI
parent: ddpm
paper_url: https://arxiv.org/abs/2112.10752
project_url: ''
category: sd_evolution
motivation: 潜空间扩散降低计算成本
```

#### 📝 一句话总结
LDM/SD v1.5 的核心目标是：潜空间扩散降低计算成本。

#### 🎯 核心要点
- 核心动机：潜空间扩散降低计算成本
- 演化来源：继承或改进自 ddpm
- 代表机构：CompVis/Stability AI

#### 🔬 深入细节
潜空间扩散降低计算成本


### SD v2.0

```yaml
id: sd_v2
num: 11
name: SD v2.0
full_name: Stable Diffusion v2.0
year: '2022.11'
org: Stability AI
parent: ldm
paper_url: —
project_url: ''
category: sd_evolution
motivation: OpenCLIP编码器升级
```

#### 📝 一句话总结
SD v2.0 的核心目标是：OpenCLIP编码器升级。

#### 🎯 核心要点
- 核心动机：OpenCLIP编码器升级
- 演化来源：继承或改进自 ldm
- 代表机构：Stability AI

#### 🔬 深入细节
OpenCLIP编码器升级


### SDXL

```yaml
id: sdxl
num: 12
name: SDXL
full_name: Stable Diffusion XL
year: '2023'
org: Stability AI
parent: sd_v2
paper_url: https://arxiv.org/abs/2307.01952
project_url: ''
category: sd_evolution
motivation: Base+Refiner级联架构
```

#### 📝 一句话总结
SDXL 的核心目标是：Base+Refiner级联架构。

#### 🎯 核心要点
- 核心动机：Base+Refiner级联架构
- 演化来源：继承或改进自 sd_v2
- 代表机构：Stability AI

#### 🔬 深入细节
Base+Refiner级联架构


### SD3

```yaml
id: sd3
num: 13
name: SD3
full_name: Stable Diffusion 3
year: '2024.02'
org: Stability AI
parent: sdxl
paper_url: —
project_url: ''
category: sd_evolution
motivation: MMDiT架构与整流流
```

#### 📝 一句话总结
SD3 的核心目标是：MMDiT架构与整流流。

#### 🎯 核心要点
- 核心动机：MMDiT架构与整流流
- 演化来源：继承或改进自 sdxl
- 代表机构：Stability AI

#### 🔬 深入细节
MMDiT架构与整流流


### FLUX.1

```yaml
id: flux_1
num: 14
name: FLUX.1
full_name: FLUX.1流匹配模型 (FLUX.1)
year: '2024.08'
org: Black Forest Labs
parent: sd3
paper_url: —
project_url: ''
category: sd_evolution
motivation: 12B流匹配Transformer
```

#### 📝 一句话总结
FLUX.1 的核心目标是：12B流匹配Transformer。

#### 🎯 核心要点
- 核心动机：12B流匹配Transformer
- 演化来源：继承或改进自 sd3
- 代表机构：Black Forest Labs

#### 🔬 深入细节
12B流匹配Transformer


### ControlNet

```yaml
id: controlnet
num: 15
name: ControlNet
full_name: 可控条件网络 (ControlNet)
year: '2023'
org: Stanford
parent: ldm
paper_url: https://arxiv.org/abs/2302.05543
project_url: ''
category: sd_evolution
motivation: 零卷积引入空间控制
```

#### 📝 一句话总结
ControlNet 通过将预训练扩散模型（Stable Diffusion）的编码器权重克隆为可训练副本，并以**零卷积（Zero Convolution）**连接原始网络与副本，实现了在保留大模型生成能力的同时，精确注入边缘图、深度图、人体姿态等多种空间条件控制信号。

#### 🎯 核心要点
- **零卷积机制**：使用权重和偏置均初始化为零的 1×1 卷积层连接原始网络与训练副本，训练初始阶段输出恒为零，确保不向预训练模型注入有害噪声
- **锁定副本架构**：将预训练模型的编码器（locked copy）完整克隆为可训练副本（trainable copy），通过零卷积将副本输出加回原始网络的跳跃连接
- **条件编码器**：4 层卷积网络（4×4 kernel, 2×2 stride, 通道数 16→32→64→128, ReLU 激活），将 512×512 条件图像压缩为 64×64 特征图
- **突然收敛现象**：由于零卷积的保护，模型在约 6K 步时突然学会遵循条件，而非渐进式学习
- **50% Prompt Dropout**：训练时以 50% 概率将文本提示替换为空字符串，增强模型直接从条件图像识别语义的能力
- **CFG Resolution Weighting**：推理时对不同分辨率的 ControlNet 连接施加权重 \(w_i = 64 / h_i\)，消除 Classifier-Free Guidance 引起的伪影
- **多 ControlNet 组合**：多个 ControlNet 的输出可直接相加到 Stable Diffusion 模型中，实现多条件联合控制
- **支持 8 种以上条件类型**：Canny 边缘、HED 边界、M-LSD 直线、深度图、法线图、语义分割、人体姿态、用户涂鸦等

#### 🔬 深入细节
![ControlNet 基本结构](https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x2.png)
*图 2：(a) 原始神经网络块；(b) 加入 ControlNet 后的结构。可训练副本通过两组零卷积与原始锁定块相连。*

![ControlNet 与 Stable Diffusion U-Net 的连接方式](https://ar5iv.labs.arxiv.org/html/2302.05543/assets/x3.png)
*图 3：ControlNet 连接到 Stable Diffusion U-Net 编码器的完整架构。SD 编码器的 12 个块和 1 个中间块被完整克隆，条件图像经 4 层卷积编码后输入可训练副本。*

```python
# ControlNet 训练与推理伪代码
# === 训练阶段 ===
# 初始化：克隆 SD 编码器权重 → trainable_copy
#         创建零卷积层（weight=0, bias=0）→ zero_conv_in, zero_conv_out
# 条件编码器 E: 4层Conv(4×4, stride=2) + ReLU, channels: 16→32→64→128

for batch in dataloader:
    image, prompt, condition = batch          # condition: Canny/depth/pose 等
    # 50% prompt dropout
    if random() < 0.5:
        prompt = ""
    
    z = VAE_encode(image)                     # 编码到潜空间 64×64
    t = sample_timestep()
    noise = sample_noise()
    z_t = add_noise(z, noise, t)
    
    c_f = E(condition)                        # 条件编码: 512×512 → 64×64
    
    # Locked SD encoder (frozen)
    h_locked = SD_encoder(z_t, t, prompt)     # 原始特征
    
    # ControlNet (trainable copy)
    h_ctrl = trainable_copy(z_t + zero_conv_in(c_f), t, prompt)
    h_ctrl_out = zero_conv_out(h_ctrl)        # 各层输出经零卷积
    
    # 将 ControlNet 输出加到 SD decoder 的跳跃连接
    noise_pred = SD_decoder(h_locked + h_ctrl_out, t, prompt)
    
    loss = MSE(noise_pred, noise)
    loss.backward()                           # 仅更新 trainable_copy + zero_conv

# === 推理阶段 (CFG Resolution Weighting) ===
# 对每个连接层 i，施加权重 w_i = 64 / h_i (h_i 为该层特征图高度)
# 条件引导: noise_pred = noise_uncond + β_cfg * (noise_cond - noise_uncond)
```

**动机与背景：为什么需要 ControlNet？**

大规模文本到图像扩散模型（如 Stable Diffusion）虽然能生成高质量图像，但仅依靠文本提示难以精确控制生成图像的空间结构。例如，用户可能希望生成的图像严格遵循特定的边缘轮廓、人体姿态或深度布局。传统的微调方法（如直接 fine-tune 整个模型）在数据量有限时容易导致过拟合和灾难性遗忘，破坏预训练模型学到的丰富语义知识。ControlNet 的核心目标是：**在不破坏预训练大模型能力的前提下，高效地学习新的空间条件控制**。

**核心机制：零卷积为何如此关键？**

ControlNet 的核心创新在于**零卷积（Zero Convolution）**的设计。对于一个预训练的神经网络块 \(\mathcal{F}(\cdot; \Theta)\)，ControlNet 创建其可训练副本 \(\mathcal{F}(\cdot; \Theta_c)\)，并通过两组零卷积层 \(\mathcal{Z}(\cdot; \Theta_{z1})\) 和 \(\mathcal{Z}(\cdot; \Theta_{z2})\) 连接。零卷积是 1×1 卷积层，其权重和偏置在训练开始时均初始化为零。完整的前向传播公式为：

$$y_c = \mathcal{F}(x; \Theta) + \mathcal{Z}\big(\mathcal{F}(x + \mathcal{Z}(c; \Theta_{z1}); \Theta_c); \Theta_{z2}\big)$$

在训练的第一步，由于 \(\mathcal{Z}\) 的输出恒为零，因此 \(y_c = \mathcal{F}(x; \Theta)\)，即 ControlNet 的加入对原始模型的输出**完全没有影响**。这一特性至关重要——它意味着无论训练数据的质量如何，模型都不会在初始阶段被随机噪声破坏。论文的消融实验证实，如果将零卷积替换为标准高斯随机初始化的卷积层，预训练模型的能力会被立即摧毁，即使经过长时间训练也无法完全恢复。

> 💡 **关键直觉**：零卷积就像一个"安全阀"——训练开始时完全关闭（输出为零），随着梯度更新逐渐打开，让条件信号以可控的速度流入预训练网络。

**训练与推理流程**

在 Stable Diffusion 的具体应用中，ControlNet 克隆了 U-Net 编码器的全部 12 个 Transformer 块和 1 个中间块（共 13 个块），参数量约为原始 SD 模型的一半。条件图像（如 Canny 边缘图）首先通过一个轻量级的 4 层卷积编码器 \(\mathcal{E}(\cdot)\) 从 512×512 压缩到 64×64 的特征图，与潜空间表示的分辨率对齐。训练损失为标准的噪声预测 MSE：

$$\mathcal{L} = \mathbb{E}_{z_0, t, c_t, c_f, \epsilon \sim \mathcal{N}(0,1)} \left[ \| \epsilon - \epsilon_\theta(z_t, t, c_t, c_f) \|_2^2 \right]$$

其中 \(c_t\) 为文本提示，\(c_f\) 为条件特征图。训练时采用 50% 的 prompt dropout 策略（将 \(c_t\) 替换为空字符串），迫使模型学会直接从条件图像中识别语义内容（如从 Canny 边缘推断物体类别），而非完全依赖文本描述。

推理阶段，ControlNet 与 Classifier-Free Guidance (CFG) 结合使用。然而，直接应用 CFG 会导致低分辨率特征层的引导信号过强，产生伪影。论文提出了 **CFG Resolution Weighting** 策略：对第 \(i\) 个连接层施加权重 \(w_i = 64 / h_i\)（\(h_i\) 为该层特征图的高度），使得高分辨率层（64×64）权重为 1，低分辨率层（8×8）权重为 8，有效平衡了不同尺度的控制强度。

**与传统方法的区别和优势**

与 HyperNetwork、Adapter 等轻量级微调方法相比，ControlNet 保留了预训练编码器的完整结构，因此能够学习更复杂的空间条件映射。消融实验表明，仅使用单层卷积连接的 ControlNet-lite 变体在处理复杂条件（如语义分割图）时效果显著下降。与全量微调相比，ControlNet 仅增加约 23% 的 GPU 显存和 34% 的训练时间，且由于锁定了原始模型权重，完全避免了灾难性遗忘的风险。此外，多个独立训练的 ControlNet 可以通过简单地将输出相加来实现多条件组合控制，无需联合训练。

![多种条件控制效果](https://ar5iv.labs.arxiv.org/html/2302.05543/assets/imgs/qua.jpg)
*图 7：ControlNet 在无文本提示情况下，仅通过不同类型的条件图像（Canny、HED、深度、法线、分割、姿态等）控制 Stable Diffusion 的生成结果。*

> ⚠️ **注意**：ControlNet 的"突然收敛"现象（约 6K 步时模型突然学会遵循条件）是零卷积保护机制的直接结果——模型在前期保持稳定输出，直到零卷积层的参数积累到足够大的值，条件信号才突然"涌入"网络。

#### 🧪 练习题
```yaml
question: "ControlNet 中零卷积（Zero Convolution）的核心作用是什么？"
options:
  - "减少模型参数量，提升训练效率"
  - "在训练初始阶段确保 ControlNet 不向预训练模型注入有害噪声"
  - "替代标准卷积以提升图像生成质量"
  - "将条件图像从高分辨率压缩到低分辨率"
answer: 1
explain: "零卷积的权重和偏置初始化为零，使得训练开始时 ControlNet 分支的输出恒为零，从而保护预训练模型不受随机初始化噪声的破坏。"
```

### IP-Adapter

```yaml
id: ip_adapter
num: 16
name: IP-Adapter
full_name: 图像提示适配器 (IP-Adapter)
year: '2023'
org: 腾讯
parent: ldm
paper_url: https://arxiv.org/abs/2308.06721
project_url: ''
category: sd_evolution
motivation: 解耦图像提示控制
```

#### 📝 一句话总结
IP-Adapter 的核心目标是：解耦图像提示控制。

#### 🎯 核心要点
- 核心动机：解耦图像提示控制
- 演化来源：继承或改进自 ldm
- 代表机构：腾讯

#### 🔬 深入细节
解耦图像提示控制


### LlamaGen

```yaml
id: llamagen
num: 17
name: LlamaGen
full_name: 自回归图像生成 (LlamaGen)
year: '2024'
org: 北大/港大
parent: vqgan
paper_url: https://arxiv.org/abs/2406.06525
project_url: ''
category: vae_discrete
motivation: 纯Llama架构图像生成
```

#### 📝 一句话总结
LlamaGen 的核心目标是：纯Llama架构图像生成。

#### 🎯 核心要点
- 核心动机：纯Llama架构图像生成
- 演化来源：继承或改进自 vqgan
- 代表机构：北大/港大

#### 🔬 深入细节
纯Llama架构图像生成


### Lumina-mGPT

```yaml
id: lumina_mgpt
num: 18
name: Lumina-mGPT
full_name: 多模态自回归生成 (Lumina-mGPT)
year: '2026.03'
org: 上海AI Lab
parent: llamagen
paper_url: IJCV 2026
project_url: ''
category: frontier_2026
motivation: 灵活多模态自回归
```

#### 📝 一句话总结
Lumina-mGPT 的核心目标是：灵活多模态自回归。

#### 🎯 核心要点
- 核心动机：灵活多模态自回归
- 演化来源：继承或改进自 llamagen
- 代表机构：上海AI Lab

#### 🔬 深入细节
灵活多模态自回归


### Next Patch Prediction

```yaml
id: npp
num: 19
name: Next Patch Prediction
full_name: 下一块预测 (NPP)
year: '2026.02'
org: 北大
parent: llamagen
paper_url: AAAI 2026
project_url: ''
category: frontier_2026
motivation: 扩展自回归预测策略
```

#### 📝 一句话总结
Next Patch Prediction 的核心目标是：扩展自回归预测策略。

#### 🎯 核心要点
- 核心动机：扩展自回归预测策略
- 演化来源：继承或改进自 llamagen
- 代表机构：北大

#### 🔬 深入细节
扩展自回归预测策略


### InfinityStar

```yaml
id: infinitystar
num: 20
name: InfinityStar
full_name: 统一时空自回归 (InfinityStar)
year: '2026.01'
org: 上海AI Lab
parent: lumina_mgpt
paper_url: NeurIPS 2025
project_url: ''
category: frontier_2026
motivation: 统一时空自回归建模
```

#### 📝 一句话总结
InfinityStar 的核心目标是：统一时空自回归建模。

#### 🎯 核心要点
- 核心动机：统一时空自回归建模
- 演化来源：继承或改进自 lumina_mgpt
- 代表机构：上海AI Lab

#### 🔬 深入细节
统一时空自回归建模


### ARGen-Dexion

```yaml
id: argen_dexion
num: 21
name: ARGen-Dexion
full_name: 增强视觉解码器 (ARGen-Dexion)
year: '2026'
org: 字节跳动
parent: llamagen
paper_url: —
project_url: ''
category: frontier_2026
motivation: 视觉解码器架构增强
```

#### 📝 一句话总结
ARGen-Dexion 的核心目标是：视觉解码器架构增强。

#### 🎯 核心要点
- 核心动机：视觉解码器架构增强
- 演化来源：继承或改进自 llamagen
- 代表机构：字节跳动

#### 🔬 深入细节
视觉解码器架构增强


### NextStep-1

```yaml
id: nextstep_1
num: 22
name: NextStep-1
full_name: 连续Token自回归 (NextStep-1)
year: '2026'
org: 阿里巴巴
parent: llamagen
paper_url: —
project_url: ''
category: frontier_2026
motivation: 大规模连续Token生成
```

#### 📝 一句话总结
NextStep-1 的核心目标是：大规模连续Token生成。

#### 🎯 核心要点
- 核心动机：大规模连续Token生成
- 演化来源：继承或改进自 llamagen
- 代表机构：阿里巴巴

#### 🔬 深入细节
大规模连续Token生成


### TLCM

```yaml
id: tlcm
num: 23
name: TLCM
full_name: 训练高效一致性模型 (TLCM)
year: '2024.06'
org: 清华
parent: ldm
paper_url: https://arxiv.org/abs/2406.05768
project_url: ''
category: frontier_2026
motivation: 训练高效潜一致性
```

#### 📝 一句话总结
TLCM 的核心目标是：训练高效潜一致性。

#### 🎯 核心要点
- 核心动机：训练高效潜一致性
- 演化来源：继承或改进自 ldm
- 代表机构：清华

#### 🔬 深入细节
训练高效潜一致性


### DiT-AIR

```yaml
id: dit_air
num: 24
name: DiT-AIR
full_name: 高效扩散Transformer (DiT-AIR)
year: '2025.03'
org: 腾讯
parent: sd3
paper_url: https://arxiv.org/abs/2503.10618
project_url: ''
category: frontier_2026
motivation: 重审DiT架构效率
```

#### 📝 一句话总结
DiT-AIR 的核心目标是：重审DiT架构效率。

#### 🎯 核心要点
- 核心动机：重审DiT架构效率
- 演化来源：继承或改进自 sd3
- 代表机构：腾讯

#### 🔬 深入细节
重审DiT架构效率


### PixArt-α

```yaml
id: pixart_alpha
num: 25
name: PixArt-α
full_name: 高效文生图 (PixArt-α)
year: '2024'
org: 华为
parent: sd3
paper_url: https://arxiv.org/abs/2310.00426
project_url: ''
category: frontier_2026
motivation: 高效DiT训练策略
```

#### 📝 一句话总结
PixArt-α 的核心目标是：高效DiT训练策略。

#### 🎯 核心要点
- 核心动机：高效DiT训练策略
- 演化来源：继承或改进自 sd3
- 代表机构：华为

#### 🔬 深入细节
高效DiT训练策略


### SANA

```yaml
id: sana
num: 26
name: SANA
full_name: 高分辨率线性注意力 (SANA)
year: '2024'
org: NVIDIA
parent: pixart_alpha
paper_url: https://arxiv.org/abs/2410.10629
project_url: ''
category: frontier_2026
motivation: 线性注意力高分辨率
```

#### 📝 一句话总结
SANA 的核心目标是：线性注意力高分辨率。

#### 🎯 核心要点
- 核心动机：线性注意力高分辨率
- 演化来源：继承或改进自 pixart_alpha
- 代表机构：NVIDIA

#### 🔬 深入细节
线性注意力高分辨率


### MM-R1

```yaml
id: mm_r1
num: 27
name: MM-R1
full_name: 统一多模态生成 (MM-R1)
year: '2026.02'
org: 北大
parent: flux_1
paper_url: AAAI 2026
project_url: ''
category: frontier_2026
motivation: GRPO偏好对齐减少畸变
```

#### 📝 一句话总结
MM-R1 的核心目标是：GRPO偏好对齐减少畸变。

#### 🎯 核心要点
- 核心动机：GRPO偏好对齐减少畸变
- 演化来源：继承或改进自 flux_1
- 代表机构：北大

#### 🔬 深入细节
GRPO偏好对齐减少畸变


### Vinci

```yaml
id: vinci
num: 28
name: Vinci
full_name: 深度思考文生图 (Vinci)
year: '2026.01'
org: 浙大
parent: mm_r1
paper_url: NeurIPS 2025
project_url: ''
category: frontier_2026
motivation: QA奖励增强逻辑推理
```

#### 📝 一句话总结
Vinci 的核心目标是：QA奖励增强逻辑推理。

#### 🎯 核心要点
- 核心动机：QA奖励增强逻辑推理
- 演化来源：继承或改进自 mm_r1
- 代表机构：浙大

#### 🔬 深入细节
QA奖励增强逻辑推理


### LMFusion

```yaml
id: lmfusion
num: 29
name: LMFusion
full_name: 语言模型融合生成 (LMFusion)
year: '2026'
org: Meta
parent: flux_1
paper_url: —
project_url: ''
category: frontier_2026
motivation: 理解与生成统一骨干
```

#### 📝 一句话总结
LMFusion 的核心目标是：理解与生成统一骨干。

#### 🎯 核心要点
- 核心动机：理解与生成统一骨干
- 演化来源：继承或改进自 flux_1
- 代表机构：Meta

#### 🔬 深入细节
理解与生成统一骨干


### UniGen

```yaml
id: unigen
num: 30
name: UniGen
full_name: 统一生成框架 (UniGen)
year: '2026'
org: Google
parent: lmfusion
paper_url: —
project_url: ''
category: frontier_2026
motivation: 多任务统一生成
```

#### 📝 一句话总结
UniGen 的核心目标是：多任务统一生成。

#### 🎯 核心要点
- 核心动机：多任务统一生成
- 演化来源：继承或改进自 lmfusion
- 代表机构：Google

#### 🔬 深入细节
多任务统一生成
