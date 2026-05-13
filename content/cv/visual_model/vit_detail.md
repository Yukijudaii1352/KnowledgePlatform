### ViT (Vision Transformer)

```yaml
id: vit
name: ViT
full_name: "视觉Transformer (Vision Transformer: An Image is Worth 16x16 Words)"
year: "2020"
org: Google Research / Brain Team
paper_url: https://arxiv.org/abs/2010.11929
category: visual_model
parent: Transformer
motivation: "将图像视为 16×16 patch 序列，直接应用标准 Transformer 编码器进行图像识别，在大规模预训练下全面超越 CNN"
```

#### 📝 一句话总结

ViT 将图像分割为固定大小的 patch 并线性嵌入为 token 序列，直接复用标准 Transformer 编码器进行图像分类，证明了在大规模数据预训练下纯 Transformer 架构无需卷积即可达到甚至超越 CNN 的 SOTA 性能（ImageNet 88.55%）。

#### 🎯 核心要点

- **Patch Embedding**：将图像切分为 \(P \times P\) 的 patch 并展平后线性投影为 token，序列长度 \(N = HW/P^2\)
- **[CLS] Token**：沿用 BERT 的可学习分类 token，拼接在 patch 序列前端，其最终输出用于分类
- **1D 可学习位置编码**：实验表明 1D 位置编码与 2D 版本性能相当，模型自动学习到 2D 空间拓扑
- **Pre-Norm Transformer**：采用 LayerNorm 前置的 Transformer 编码器（区别于原始 Transformer 的 Post-Norm）
- **三种模型规模**：ViT-Base (86M)、ViT-Large (307M)、ViT-Huge (632M)，配置借鉴 BERT
- **大规模预训练**：在 JFT-300M（303M 图像）上预训练后迁移，ViT-H/14 在 ImageNet 达 88.55%
- **计算效率优势**：相同性能下 ViT 预训练计算量仅为 ResNet 的 1/2 ~ 1/4
- **数据规模敏感性**：小数据集上 ViT 不如 CNN（缺乏归纳偏置），大数据集上全面超越
- **Hybrid 变体**：可用 CNN 特征图替代原始 patch 作为输入序列，小模型时略优于纯 ViT

#### 🔬 深入细节

##### 核心架构示意图

![ViT 模型架构](https://ar5iv.labs.arxiv.org/html/2010.11929v2/assets/x1.png)
*图：ViT 架构总览。图像被切分为固定大小的 patch，经线性投影后加上位置编码和 [CLS] token，送入标准 Transformer 编码器，最终通过 MLP Head 输出分类结果。*

##### 算法伪代码

```python
# Vision Transformer 前向传播伪代码
def vit_forward(image, E, E_pos, x_class, transformer_encoder, mlp_head):
    """
    image: (B, C, H, W) 输入图像
    E: (P²·C, D) patch 线性投影矩阵
    E_pos: (N+1, D) 可学习位置编码
    x_class: (1, D) 可学习 [CLS] token
    """
    # Step 1: Patch Embedding
    patches = split_into_patches(image, patch_size=P)  # (B, N, P²·C)
    patch_tokens = patches @ E                          # (B, N, D)

    # Step 2: 拼接 [CLS] token + 加位置编码
    cls_token = x_class.expand(B, 1, D)
    z_0 = concat([cls_token, patch_tokens], dim=1)      # (B, N+1, D)
    z_0 = z_0 + E_pos                                   # (B, N+1, D)

    # Step 3: L 层 Transformer 编码器（Pre-Norm）
    for layer in transformer_encoder:
        z_prime = layer.MSA(layer.LN1(z)) + z           # Eq.2
        z = layer.MLP(layer.LN2(z_prime)) + z_prime     # Eq.3

    # Step 4: 分类输出
    y = LN(z[:, 0])                                     # 取 [CLS] token, Eq.4
    return mlp_head(y)
```

##### 动机与背景

**传统方法的局限**：在 ViT 之前，Transformer 在 NLP 领域已成为主流架构（BERT、GPT），但在计算机视觉中，卷积神经网络（CNN）仍占据绝对主导地位。虽然有研究尝试将 self-attention 引入视觉任务（如 Non-local Networks、Stand-Alone Self-Attention），但这些方法要么仅在局部窗口内应用注意力以控制计算量，要么需要与卷积层混合使用，无法实现纯 Transformer 架构。

**核心问题**：能否像 NLP 一样，将标准 Transformer **直接**应用于图像，而不引入任何视觉特定的归纳偏置？

**关键洞察**：作者发现，当预训练数据规模足够大时（如 JFT-300M 的 3 亿张图像），Transformer 可以从数据中直接学习到 CNN 通过架构设计（局部性、平移等变性）隐式编码的视觉先验，从而在迁移学习中全面超越 CNN。

##### 核心机制详解

**1. Patch Embedding — 将图像转化为序列**

ViT 的第一步是将 2D 图像转化为 1D token 序列。给定输入图像 \(\mathbf{x} \in \mathbb{R}^{H \times W \times C}\)，将其切分为 \(N\) 个大小为 \(P \times P\) 的 patch：

$$\mathbf{x}_p \in \mathbb{R}^{N \times (P^2 \cdot C)}, \quad N = \frac{HW}{P^2}$$

每个 patch 被展平为向量后，通过一个可训练的线性投影矩阵 \(\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 映射到 \(D\) 维嵌入空间。这一步在实现上等价于一个 kernel size = stride = \(P\) 的卷积操作。

> 💡 **关键**：patch size \(P\) 决定了序列长度 \(N = HW/P^2\)。以 224×224 图像、P=16 为例，\(N = 196\)；若 P=14，则 \(N = 256\)。序列长度与 patch size 的平方成反比，因此更小的 patch 意味着更高的计算成本。

**2. [CLS] Token 与位置编码**

借鉴 BERT，ViT 在 patch 序列前拼接一个可学习的 **[CLS] token** \(\mathbf{x}_{\text{class}}\)，其在 Transformer 最后一层的输出作为整个图像的全局表示。初始嵌入为：

$$\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\; \mathbf{x}_p^1\mathbf{E};\; \mathbf{x}_p^2\mathbf{E};\; \cdots;\; \mathbf{x}_p^N\mathbf{E}] + \mathbf{E}_{\text{pos}}$$

其中 \(\mathbf{E}_{\text{pos}} \in \mathbb{R}^{(N+1) \times D}\) 是 **1D 可学习位置编码**。论文实验表明，1D 编码与手工设计的 2D 编码性能无显著差异，因为模型能自动从 1D 编码中学习到 2D 空间结构（相邻 patch 的位置编码余弦相似度更高，且呈现行列结构）。

**3. Transformer 编码器（Pre-Norm）**

ViT 使用标准 Transformer 编码器，但采用 **Pre-Norm**（LayerNorm 前置）而非原始 Transformer 的 Post-Norm：

$$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}, \quad \ell = 1 \ldots L$$

$$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell, \quad \ell = 1 \ldots L$$

- **MSA（Multi-Head Self-Attention）**：标准多头自注意力，每个 token 与所有其他 token 交互
- **MLP**：两层全连接网络，隐藏层维度为 \(4D\)，激活函数为 GELU
- **残差连接**：每个子层都有残差连接

最终分类输出：

$$\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$$

即取最后一层 [CLS] token 的输出，经 LayerNorm 后送入分类头。

> ⚠️ **注意**：Pre-Norm 与 Post-Norm 的区别在于 LayerNorm 的位置。Pre-Norm 将 LN 放在注意力/MLP **之前**，有助于深层网络的训练稳定性。

**4. 分类头**

- **预训练阶段**：使用带一个隐藏层的 MLP（隐藏层 + GELU + 输出层）
- **微调阶段**：替换为单层线性层（zero-initialized），输出维度为下游任务类别数 \(K\)

**5. 高分辨率微调**

微调时通常使用比预训练更高的分辨率（如 ViT-L/16 预训练 224 → 微调 512）。由于 patch size 不变，更高分辨率意味着更长的序列。此时对预训练的位置编码进行 **2D 插值**以适应新的序列长度。

##### 模型变体

| 模型 | 层数 | 隐藏维度 \(D\) | MLP 维度 | 注意力头数 | 参数量 |
|------|------|----------------|----------|------------|--------|
| ViT-Base | 12 | 768 | 3072 | 12 | 86M |
| ViT-Large | 24 | 1024 | 4096 | 16 | 307M |
| ViT-Huge | 32 | 1280 | 5120 | 16 | 632M |

命名规则：**ViT-{Size}/{Patch}**，如 ViT-L/16 表示 Large 模型 + 16×16 patch。

##### 训练细节

- **预训练优化器**：Adam（\(\beta_1=0.9, \beta_2=0.999\)），batch size 4096，weight decay 0.1，线性学习率 warmup + decay
- **微调优化器**：SGD with momentum，batch size 512
- **预训练数据集**：ImageNet-1k (1.3M)、ImageNet-21k (14M)、JFT-300M (303M)
- **数据增强**：标准预处理，遵循 BiT 的设置

##### 与 CNN 的关键对比

| 维度 | CNN (如 ResNet) | ViT |
|------|-----------------|-----|
| **归纳偏置** | 强（局部性、平移等变性、2D 结构） | 极弱（仅 patch 切分引入微弱 2D 先验） |
| **感受野** | 逐层递增，浅层局部 | 第一层即可全局注意 |
| **小数据表现** | 更好（归纳偏置提供正则化） | 较差（易过拟合） |
| **大数据表现** | 性能饱和较早 | 持续提升，超越 CNN |
| **计算效率** | 基准 | 相同性能下计算量为 CNN 的 1/2~1/4 |
| **可扩展性** | 有限 | 在实验范围内未见饱和 |

> 💡 **关键洞察**：卷积的归纳偏置在小数据集上是有益的正则化，但在大数据集上反而成为限制——直接从数据学习相关模式更加有效。ViT-B/32 在 JFT 9M 子集上不如 ResNet50，但在 90M+ 子集上反超。

##### 注意力可视化分析

论文对 ViT 的内部表示进行了深入分析：

1. **Patch Embedding 滤波器**：学习到的线性投影滤波器类似于 CNN 浅层的 Gabor 滤波器，捕获 patch 内部的细粒度结构
2. **位置编码**：自动学习到 2D 空间拓扑——相邻 patch 的位置编码相似度更高，且呈现清晰的行列结构
3. **注意力距离**：浅层中部分注意力头已具有全局感受野（注意力距离覆盖整幅图像），同时也有局部注意力头（类似 CNN 早期卷积层的功能）；随网络深度增加，注意力距离整体增大
4. **语义注意力**：模型的注意力集中在对分类有语义意义的图像区域

#### 🧪 练习题

```yaml
question: "ViT 在小数据集（如 ImageNet-1k）上表现不如同等规模的 CNN，主要原因是什么？"
options:
  - "Transformer 的参数量太大，无法在小数据集上训练"
  - "ViT 缺乏 CNN 的归纳偏置（局部性、平移等变性），在数据不足时难以学习有效的视觉特征"
  - "ViT 的 patch embedding 丢失了过多的空间信息"
  - "ViT 使用的 Adam 优化器不适合小数据集训练"
answer: 1
explain: "CNN 通过架构设计内置了局部性和平移等变性等视觉先验，在数据有限时起到正则化作用；ViT 几乎不含视觉归纳偏置，需要大规模数据才能从数据中学习到这些模式。"
```