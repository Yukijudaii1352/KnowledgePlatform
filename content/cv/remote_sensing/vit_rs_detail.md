### 遥感视觉Transformer (Vision Transformers for Remote Sensing)

```yaml
id: vit_rs
name: ViT-RS
full_name: 遥感视觉Transformer (Vision Transformers for Remote Sensing)
year: '2021'
org: UAE University
paper_url: https://www.mdpi.com/2072-4292/13/3/516
category: scene_classification
parent: self_attention_fusion
motivation: 首次验证ViT在遥感场景分类优越性
```

#### 📝 一句话总结

本文首次将 Vision Transformer（ViT）引入遥感场景分类任务，证明了基于多头自注意力机制的纯 Transformer 架构在无需卷积操作的情况下即可超越传统 CNN 方法，并通过数据增强策略和层剪枝压缩进一步提升了实用性。

#### 🎯 核心要点

- **首次将 ViT 应用于遥感场景分类**：验证了纯 Transformer 架构在遥感领域的有效性，无需依赖卷积层
- **采用 ViT-B/16 架构**：将遥感图像分割为 16×16 的 patch 序列，通过线性嵌入和位置编码输入 12 层 Transformer Encoder
- **多种数据增强策略**：包括随机翻转、旋转、颜色抖动（Color Jitter）、随机擦除（Cutout）和 Mixup，有效缓解遥感数据集样本不足问题
- **层剪枝压缩**：移除一半的多头注意力层（12→6 层），在精度损失极小的情况下大幅减少计算量
- **四大遥感基准数据集验证**：UC Merced（98.49%）、AID（95.86%）、Optimal-31（95.56%）、NWPU-RESISC45（93.83%），均达到或超越当时 SOTA

#### 🔬 深入细节

##### 架构示意图

![ViT 架构示意图](https://raw.githubusercontent.com/google-research/vision_transformer/main/vit_figure.png)
*图：Vision Transformer 整体架构。输入图像被分割为固定大小的 patch，经线性嵌入后加上位置编码，送入多层 Transformer Encoder，最终通过 CLS token 完成分类。（图源：Dosovitskiy et al., 2020）*

##### 算法伪代码

```python
# ViT-RS 遥感场景分类核心流程
def vit_rs_forward(image, patch_size=16, num_layers=12, num_heads=12, dim=768):
    # Step 1: 图像分割为 patch 序列
    patches = split_into_patches(image, patch_size)  # (H/P × W/P) 个 patch
    # e.g., 256×256 图像 → 16×16 = 256 个 patch，每个 patch 为 16×16×3

    # Step 2: 线性嵌入 (Patch Embedding)
    patch_embeddings = linear_projection(patches, dim)  # [N, D]

    # Step 3: 添加 CLS token 和位置编码
    cls_token = learnable_parameter(dim)               # [1, D]
    tokens = concat(cls_token, patch_embeddings)       # [N+1, D]
    tokens = tokens + position_embedding               # 可学习位置编码

    # Step 4: 通过 L 层 Transformer Encoder
    for layer in range(num_layers):  # L=12 (完整) 或 L=6 (压缩)
        tokens = multi_head_attention(tokens, num_heads) + tokens  # MSA + 残差
        tokens = feed_forward_network(tokens) + tokens             # FFN + 残差

    # Step 5: 分类
    cls_output = tokens[0]                             # 取 CLS token
    logits = softmax(linear_classifier(cls_output))    # 场景类别预测
    return logits
```

##### 动机与背景

遥感场景分类是遥感图像理解的基础任务，旨在将遥感图像自动归类为预定义的语义类别（如机场、港口、农田等）。传统方法主要依赖 CNN（如 VGGNet、ResNet、DenseNet）提取特征，虽然取得了显著进展，但存在以下局限：

1. **局部感受野限制**：CNN 的卷积核天然关注局部区域，难以直接建模图像中远距离像素之间的语义关系。遥感图像通常覆盖大范围地物，不同区域之间的空间关系对场景理解至关重要。
2. **深层堆叠的低效性**：为扩大感受野，CNN 需要堆叠大量卷积层或使用空洞卷积，导致参数量和计算量急剧增加。
3. **缺乏全局上下文**：尽管注意力机制（如 SE-Net、CBAM）可以部分缓解，但仍然是在 CNN 框架内的"补丁"，未从根本上改变特征提取范式。

2020 年，Dosovitskiy 等人提出的 Vision Transformer（ViT）在 ImageNet 上证明了纯 Transformer 架构可以匹敌甚至超越 CNN。本文作者敏锐地将这一范式迁移到遥感领域，**首次系统验证了 ViT 在遥感场景分类中的优越性**。

##### 核心机制：Vision Transformer 详解

**1. Patch 分割与线性嵌入**

给定输入图像 \(x \in \mathbb{R}^{H \times W \times C}\)，将其分割为 \(N = HW/P^2\) 个不重叠的 patch，每个 patch 大小为 \(P \times P \times C\)。本文采用 \(P = 16\)，对于 \(256 \times 256\) 的遥感图像，产生 \(N = 256\) 个 patch。

每个 patch 被展平为一维向量后，通过可训练的线性投影映射到 \(D\) 维嵌入空间：

$$z_0^i = x_p^i \cdot E, \quad E \in \mathbb{R}^{(P^2 \cdot C) \times D}$$

其中 \(x_p^i\) 为第 \(i\) 个展平后的 patch，\(E\) 为投影矩阵，\(D = 768\)（ViT-Base 配置）。

> 💡 关键：这一步等价于一个 kernel size = stride = 16 的卷积操作，但概念上完全不同——它将图像视为"视觉词汇序列"而非空间特征图。

**2. CLS Token 与位置编码**

在 patch 嵌入序列前添加一个可学习的分类 token \(z_0^{\text{cls}}\)，最终序列为：

$$z_0 = [z_0^{\text{cls}}; z_0^1; z_0^2; \ldots; z_0^N] + E_{\text{pos}}$$

其中 \(E_{\text{pos}} \in \mathbb{R}^{(N+1) \times D}\) 为可学习的一维位置编码，为模型提供 patch 的空间位置信息。

> ⚠️ 注意：与 CNN 不同，Transformer 本身不具备位置感知能力（排列不变性），位置编码是唯一的空间信息来源。对于遥感图像，空间布局对场景判别至关重要（如跑道的方向性、建筑群的排列模式）。

**3. 多头自注意力（Multi-Head Self-Attention, MSA）**

Transformer Encoder 的核心是多头自注意力机制。对于输入序列 \(z\)，首先计算 Query、Key、Value：

$$Q = z W_Q, \quad K = z W_K, \quad V = z W_V$$

单头注意力计算为：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) V$$

其中 \(d_k = D / h\) 为每个头的维度，\(h = 12\) 为头数。多头注意力将 \(h\) 个头的输出拼接后投影：

$$\text{MSA}(z) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h) W_O$$

> 💡 关键：自注意力使得每个 patch 都能直接关注图像中所有其他 patch，这对遥感场景分类尤为重要——例如，"机场"场景中跑道 patch 可以直接与航站楼 patch 建立关联，无需通过多层卷积逐步扩大感受野。

**4. Transformer Encoder Block**

每个 Encoder Block 包含 MSA 和前馈网络（FFN），均配有 LayerNorm 和残差连接：

$$z'_l = \text{MSA}(\text{LN}(z_{l-1})) + z_{l-1}$$

$$z_l = \text{FFN}(\text{LN}(z'_l)) + z'_l$$

FFN 由两层全连接层组成，中间使用 GELU 激活函数，隐藏层维度为 \(4D = 3072\)。ViT-Base 包含 \(L = 12\) 个这样的 Block。

**5. 分类头**

最终，取 CLS token 对应的输出 \(z_L^{\text{cls}}\)，通过一个线性分类头映射到类别数：

$$\hat{y} = \text{softmax}(z_L^{\text{cls}} \cdot W_c + b_c)$$

##### 数据增强策略

由于遥感数据集规模相对较小（如 UC Merced 仅 2100 张），而 ViT 参数量庞大（ViT-Base 约 86M 参数），数据增强对防止过拟合至关重要。本文系统探索了以下策略：

| 增强方法 | 描述 | 作用 |
|---------|------|------|
| 随机水平/垂直翻转 | 以 50% 概率翻转图像 | 利用遥感图像的旋转不变性 |
| 随机旋转 | 0°/90°/180°/270° 随机旋转 | 增强方向鲁棒性 |
| 颜色抖动（Color Jitter） | 随机调整亮度、对比度、饱和度 | 模拟不同成像条件 |
| 随机擦除（Cutout） | 随机遮挡图像区域 | 迫使模型关注全局特征 |
| Mixup | 两张图像按比例混合 | 正则化，平滑决策边界 |

> 💡 关键：实验表明，数据增强组合使用可将分类精度提升 2-4 个百分点，是 ViT 在小规模遥感数据集上成功的关键因素之一。

##### 层剪枝压缩

本文的另一重要贡献是验证了 ViT 的可压缩性。具体做法是：在预训练的 ViT-Base（12 层）基础上，**均匀移除一半的 Transformer 层**（保留第 1、3、5、7、9、11 层），得到 6 层的压缩模型，然后在目标数据集上微调。

实验结果表明，压缩模型的精度下降非常有限：

| 数据集 | 完整模型（12层） | 压缩模型（6层） | 精度下降 |
|--------|-----------------|-----------------|---------|
| UC Merced | 98.49% | 97.90% | -0.59% |
| AID | 95.86% | 94.27% | -1.59% |
| Optimal-31 | 95.56% | 95.30% | -0.26% |
| NWPU-RESISC45 | 93.83% | 93.05% | -0.78% |

> 💡 关键：这说明 ViT 的中间层存在较大冗余，对于遥感场景分类任务，6 层 Transformer 已足够捕获判别性特征。这一发现对边缘部署（如星载/机载平台）具有重要实际意义。

##### 与传统 CNN 方法的对比

| 特性 | CNN（ResNet等） | ViT-RS |
|------|----------------|--------|
| 特征提取 | 局部卷积 → 逐层扩大感受野 | 全局自注意力，一步建模所有 patch 关系 |
| 位置信息 | 隐式编码在卷积结构中 | 显式位置编码 |
| 归纳偏置 | 平移不变性、局部性 | 几乎无归纳偏置，依赖数据驱动 |
| 数据需求 | 较少数据即可训练 | 需要大规模预训练（ImageNet-21k） |
| 可解释性 | 特征图可视化 | 注意力图可视化，更直观展示全局关注区域 |
| 远距离依赖 | 需要深层网络 | 单层即可建模 |

本文的核心发现是：**当使用 ImageNet-21k 预训练权重并配合适当的数据增强时，ViT 在遥感场景分类上全面超越 CNN 方法**，这标志着遥感图像理解从 CNN 时代向 Transformer 时代的范式转变。

#### 🧪 练习题

```yaml
question: "ViT-RS 中，将遥感图像分割为 patch 后添加位置编码的主要原因是什么？"
options:
  - "减少模型参数量，提高计算效率"
  - "Transformer 缺乏位置感知能力，需要显式注入空间信息"
  - "增加数据增强的多样性"
  - "替代 CLS token 进行分类"
answer: 1
explain: "Transformer 的自注意力机制具有排列不变性，无法感知输入序列的顺序。位置编码为每个 patch 提供空间位置信息，使模型能够利用遥感图像中地物的空间布局关系进行场景判别。"
```