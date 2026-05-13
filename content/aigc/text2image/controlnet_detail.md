### ControlNet — 可控条件网络

```yaml
id: controlnet
name: ControlNet
full_name: "可控条件网络 (Adding Conditional Control to Text-to-Image Diffusion Models)"
year: 2023
org: Stanford
paper_url: https://arxiv.org/abs/2302.05543
category: sd_evolution
parent: ldm
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