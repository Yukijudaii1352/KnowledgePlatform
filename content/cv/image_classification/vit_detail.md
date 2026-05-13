### ViT — 视觉Transformer (Vision Transformer)

```yaml
id: vit
name: ViT
full_name: 视觉Transformer (Vision Transformer)
year: '2020.10'
org: Google
paper_url: https://arxiv.org/abs/2010.11929
category: vit_era
parent: —
motivation: 将图像切分为Patch，纯Transformer超越CNN
```

#### 📝 一句话总结

ViT 将图像切分为固定大小的 Patch 序列，直接输入标准 Transformer Encoder 进行分类，证明了在大规模数据预训练下，纯 Transformer 架构无需任何卷积即可超越最先进的 CNN 模型，开启了视觉 Transformer 时代。

#### 🎯 核心要点

- **Patch Embedding**：将图像切分为 \(P \times P\) 的固定大小 Patch，展平后通过线性投影映射到 \(D\) 维嵌入空间，将 2D 图像转化为 1D 序列
- **[CLS] Token**：借鉴 BERT，在 Patch 序列前添加一个可学习的分类 Token，其最终输出作为整张图像的表示用于分类
- **可学习 1D 位置编码**：为每个 Patch（含 [CLS]）添加可学习的 1D 位置嵌入，实验表明 2D 位置编码无显著增益
- **标准 Transformer Encoder**：采用 Pre-LN 结构（LayerNorm 在 MSA/MLP 之前），MLP 含两层全连接 + GELU 激活
- **三种模型规模**：ViT-Base（86M）、ViT-Large（307M）、ViT-Huge（632M），配置沿用 BERT 命名
- **大规模预训练 + 微调范式**：在 ImageNet-21k（14M）或 JFT-300M 上预训练，迁移到下游任务微调
- **归纳偏置极少**：相比 CNN 的局部性和平移等变性，ViT 仅在 Patch 切分时引入 2D 结构先验
- **高分辨率微调**：微调时保持 Patch 大小不变、增大序列长度，对预训练位置编码进行 2D 插值
- **核心发现**：大规模训练可以弥补归纳偏置的缺失——数据量足够大时，ViT 超越 CNN；数据量不足时，ViT 不如 CNN

#### 🔬 深入细节

##### 模型架构总览

![ViT 模型架构图](https://ar5iv.labs.arxiv.org/html/2010.11929/assets/x1.png)
*图：ViT 模型总览。将图像切分为固定大小的 Patch，线性嵌入后加上位置编码，送入标准 Transformer Encoder。[CLS] Token 的输出经分类头得到预测结果。*

##### 算法伪代码

```python
# Vision Transformer 前向传播伪代码
def ViT_forward(image, E, E_pos, cls_token, transformer_encoder, mlp_head):
    """
    image: (B, C, H, W)
    E: 线性投影矩阵, shape (P²·C, D)
    E_pos: 位置嵌入, shape (N+1, D)
    cls_token: 可学习分类Token, shape (1, D)
    """
    # Step 1: Patch Embedding
    patches = split_into_patches(image, patch_size=P)   # (B, N, P²·C)
    patch_embeddings = patches @ E                        # (B, N, D)

    # Step 2: 拼接 [CLS] Token
    z_0 = concat([cls_token, patch_embeddings], dim=1)   # (B, N+1, D)

    # Step 3: 加位置编码
    z_0 = z_0 + E_pos                                    # (B, N+1, D)

    # Step 4: Transformer Encoder (L 层)
    for layer in transformer_encoder:
        # Pre-LN + MSA + 残差
        z_prime = MSA(LayerNorm(z)) + z
        # Pre-LN + MLP + 残差
        z = MLP(LayerNorm(z_prime)) + z_prime

    # Step 5: 分类输出
    y = LayerNorm(z[:, 0])      # 取 [CLS] Token 输出
    logits = mlp_head(y)         # 预训练: MLP(hidden+GELU); 微调: Linear
    return logits
```

##### 动机与背景

在 ViT 提出之前，Transformer 已在 NLP 领域取得巨大成功（BERT、GPT 等），但在计算机视觉中，卷积神经网络（CNN）仍占据主导地位。此前将注意力机制引入视觉的工作要么将 self-attention 与 CNN 结合使用，要么用特殊的局部注意力模式替代卷积——这些方法虽然理论上高效，但由于使用了特殊的注意力模式，难以在现代硬件加速器上高效扩展。

ViT 的核心动机非常直接：**能否以最少的修改，将标准 Transformer 直接应用于图像？** 作者发现，只需将图像切分为 Patch 并线性嵌入，就可以将其视为 NLP 中的 Token 序列，直接复用 NLP 中成熟的 Transformer 架构及其高效实现。

##### 核心机制详解

**1. Patch Embedding — 图像序列化**

给定输入图像 \(\mathbf{x} \in \mathbb{R}^{H \times W \times C}\)，ViT 将其重塑为 \(N\) 个展平的 2D Patch：

$$\mathbf{x}_p \in \mathbb{R}^{N \times (P^2 \cdot C)}, \quad N = \frac{HW}{P^2}$$

其中 \(P\) 为 Patch 大小（通常为 16 或 14），\(N\) 为 Patch 数量，即 Transformer 的有效序列长度。例如对于 224×224 的图像、Patch 大小 16×16，序列长度 \(N = 196\)。

每个 Patch 通过可训练的线性投影矩阵 \(\mathbf{E} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 映射到 \(D\) 维空间。这一操作等价于一个 kernel size = stride = \(P\) 的卷积层，但概念上更简洁——直接将 Patch 视为"视觉词元"。

> 💡 **关键**：Patch 大小决定了序列长度，序列长度与 Patch 大小的平方成反比。更小的 Patch 意味着更长的序列和更高的计算代价，但也能捕获更精细的空间信息。

**2. [CLS] Token 与位置编码**

ViT 在 Patch 嵌入序列前拼接一个可学习的 [CLS] Token \(\mathbf{x}_{\text{class}}\)，并为整个序列（长度 \(N+1\)）添加可学习的 1D 位置嵌入 \(\mathbf{E}_{pos} \in \mathbb{R}^{(N+1) \times D}\)：

$$\mathbf{z}_0 = [\mathbf{x}_{\text{class}};\, \mathbf{x}_p^1\mathbf{E};\, \mathbf{x}_p^2\mathbf{E};\, \cdots;\, \mathbf{x}_p^N\mathbf{E}] + \mathbf{E}_{pos}$$

作者实验发现，1D 可学习位置编码与 2D 位置编码、相对位置编码的性能差异极小（<0.1%），因此选择了最简单的 1D 方案。这说明 Transformer 能够从数据中自动学习到 Patch 之间的空间关系。

**3. Transformer Encoder — Pre-LN 架构**

ViT 采用标准 Transformer Encoder，但使用 **Pre-LN**（LayerNorm 在注意力/MLP 之前）而非原始 Transformer 的 Post-LN，这有助于训练稳定性：

$$\mathbf{z}'_\ell = \text{MSA}(\text{LN}(\mathbf{z}_{\ell-1})) + \mathbf{z}_{\ell-1}, \quad \ell = 1 \ldots L$$

$$\mathbf{z}_\ell = \text{MLP}(\text{LN}(\mathbf{z}'_\ell)) + \mathbf{z}'_\ell, \quad \ell = 1 \ldots L$$

其中 MLP 包含两个全连接层，中间使用 GELU 激活函数，隐藏层维度为 \(4D\)（如 ViT-Base 的 MLP 维度为 3072 = 4×768）。

最终分类输出取 [CLS] Token 经过 LayerNorm 后的表示：

$$\mathbf{y} = \text{LN}(\mathbf{z}_L^0)$$

> ⚠️ **注意**：预训练时分类头为含一个隐藏层的 MLP，微调时替换为单层线性层，并零初始化。

**4. 归纳偏置分析**

这是 ViT 最深刻的洞察之一。CNN 在每一层都内置了三种归纳偏置：**局部性**（卷积核只看局部区域）、**二维邻域结构**（特征图保持空间排列）和**平移等变性**（同一卷积核在所有位置共享）。

而 ViT 中：
- **MSA 层是全局的**：每个 Token 可以关注所有其他 Token，没有局部性约束
- **MLP 层是局部且平移等变的**：独立作用于每个 Token
- **2D 结构仅在两处使用**：(1) 初始 Patch 切分；(2) 微调时位置编码的 2D 插值

这意味着 ViT 必须从数据中学习 CNN 天然具备的空间先验。因此，**在小数据集上 ViT 不如 CNN，但在大数据集上 ViT 的灵活性反而成为优势**。

**5. 高分辨率微调与位置编码插值**

微调时通常使用比预训练更高的分辨率（如预训练 224→微调 384/512）。由于 Patch 大小不变，更高分辨率意味着更多 Patch、更长序列。此时预训练的位置编码维度不匹配，ViT 的解决方案是对预训练位置编码进行 **2D 双线性插值**——先将 1D 位置编码按原始网格排列为 2D，插值到新网格大小，再展平回 1D。

##### 模型变体与训练细节

| 模型 | 层数 | 隐藏维度 D | MLP 维度 | 注意力头数 | 参数量 |
|------|------|-----------|----------|-----------|--------|
| ViT-Base | 12 | 768 | 3072 | 12 | 86M |
| ViT-Large | 24 | 1024 | 4096 | 16 | 307M |
| ViT-Huge | 32 | 1280 | 5120 | 16 | 632M |

命名规则 ViT-X/Y 表示模型规模 X 和 Patch 大小 Y，如 ViT-L/16 表示 Large 模型 + 16×16 Patch。

训练配置：
- **预训练**：Adam 优化器（\(\beta_1=0.9, \beta_2=0.999\)），batch size 4096，权重衰减 0.1，线性学习率 warmup + decay
- **微调**：SGD with momentum，batch size 512，高分辨率输入（ViT-L/16 用 512，ViT-H/14 用 518）

##### 与 CNN 的关键对比

| 维度 | CNN (ResNet/EfficientNet) | ViT |
|------|--------------------------|-----|
| 归纳偏置 | 强（局部性 + 平移等变性） | 弱（仅 Patch 切分引入 2D 先验） |
| 小数据表现 | 更好（归纳偏置起正则化作用） | 较差（需要大量数据学习空间关系） |
| 大数据表现 | 趋于饱和 | 持续提升，超越 CNN |
| 计算效率 | 卷积硬件优化成熟 | 可直接复用 NLP Transformer 高效实现 |
| 扩展性 | 受限于架构设计 | 与 NLP 一致的 scaling law |

在 JFT-300M 预训练后，ViT-H/14 在 ImageNet 上达到 **88.55%** top-1 准确率，超越了当时最强的 BiT（87.54%）和 Noisy Student（88.4%），且预训练计算成本更低。

#### 🧪 练习题

```yaml
question: "ViT 在中等规模数据集（如 ImageNet-1k）上直接训练时表现不如同等规模的 ResNet，主要原因是什么？"
options:
  - "Transformer 的参数量太大，容易过拟合"
  - "ViT 缺少 CNN 固有的局部性和平移等变性等归纳偏置，在数据不足时泛化能力较弱"
  - "ViT 的位置编码无法表达 2D 空间信息"
  - "Patch Embedding 的线性投影损失了太多图像信息"
answer: 1
explain: "ViT 的 self-attention 是全局操作，不具备 CNN 天然的局部性和平移等变性归纳偏置。在数据量不足时，模型需要从头学习这些空间先验，导致泛化能力不如 CNN。但当预训练数据足够大时（如 JFT-300M），这一劣势被消除，ViT 反而因更强的灵活性超越 CNN。"
```