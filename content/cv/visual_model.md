---
domain: cv
topic_id: visual_model
topic_name: visual_model
page_icon: "\U0001F441️"
page_title: 视觉基础模型技术演进
page_subtitle: '{build_date} 版'
page_desc: 梳理从ViT到SAM的视觉表征学习演进历程，涵盖架构创新、自监督学习与通用视觉分割三大技术脉络
hero_pills:
- "\U0001F3F7️ CV · Foundation Models · Visual Representation"
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基性架构
    color: '#4A90D9'
  representation:
    label: 通用表征学习
    color: '#50C878'
  segmentation:
    label: 视觉分割模型
    color: '#FF6B6B'
  multimodal:
    label: 多模态与前沿
    color: '#9B59B6'
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: vit
  x: 100
  y: 100
  category: foundation
- id: deit
  x: 200
  y: 100
  category: foundation
- id: swin
  x: 220
  y: 100
  category: foundation
- id: clip
  x: 200
  y: 550
  category: multimodal
- id: dino
  x: 230
  y: 250
  category: representation
- id: beit
  x: 240
  y: 250
  category: representation
- id: mae
  x: 260
  y: 250
  category: representation
- id: convnext
  x: 300
  y: 100
  category: foundation
- id: eva
  x: 340
  y: 250
  category: representation
- id: internimage
  x: 340
  y: 100
  category: foundation
- id: dinov2
  x: 400
  y: 250
  category: representation
- id: sam
  x: 400
  y: 400
  category: segmentation
- id: florence2
  x: 500
  y: 550
  category: multimodal
- id: sam2
  x: 520
  y: 400
  category: segmentation
- id: vision_mamba
  x: 650
  y: 100
  category: foundation
- id: lookwhere
  x: 650
  y: 250
  category: representation
- id: xsam
  x: 670
  y: 400
  category: segmentation
- id: unipixel
  x: 650
  y: 550
  category: multimodal
- id: rynnbrain
  x: 670
  y: 550
  category: multimodal
- id: videoloom
  x: 650
  y: 550
  category: multimodal
edges:
- from: vit
  to: deit
  label: 数据高效
- from: vit
  to: swin
  label: 层级化
- from: vit
  to: clip
  label: 多模态对齐
- from: vit
  to: dino
  label: 自监督
- from: vit
  to: beit
  label: 掩码建模
- from: vit
  to: sam
  label: 可提示
- from: beit
  to: mae
  label: 高掩码率
- from: mae
  to: eva
  label: 语义重建
- from: swin
  to: convnext
  label: CNN回归
- from: convnext
  to: internimage
  label: 可变形
- from: dino
  to: dinov2
  label: 大规模
- from: clip
  to: florence2
  label: 统一任务
- from: sam
  to: sam2
  label: 视频扩展
- from: swin
  to: vision_mamba
  label: SSM架构
- from: dinov2
  to: lookwhere
  label: 自适应
- from: sam2
  to: xsam
  label: 任意分割
- from: florence2
  to: unipixel
  label: 像素推理
- from: dinov2
  to: rynnbrain
  label: 具身智能
- from: sam2
  to: videoloom
  label: 长视频
milestones:
- vit
- clip
- sam
```

## 核心算法

### ViT

```yaml
id: vit
num: 1
name: ViT
full_name: 视觉Transformer (Vision Transformer)
year: '2020.10'
org: Google Research
parent: —
paper_url: https://arxiv.org/abs/2010.11929
project_url: ''
category: foundation
motivation: 纯Transformer首次超越CNN
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

### DeiT

```yaml
id: deit
num: 2
name: DeiT
full_name: 数据高效图像Transformer (Data-efficient Image Transformers)
year: '2021.01'
org: Meta AI
parent: vit
paper_url: https://proceedings.mlr.press/v139/touvron21a
project_url: ''
category: foundation
motivation: 知识蒸馏解决数据依赖
```

#### 📝 一句话总结
DeiT 的核心目标是：知识蒸馏解决数据依赖。

#### 🎯 核心要点
- 核心动机：知识蒸馏解决数据依赖
- 演化来源：继承或改进自 vit
- 代表机构：Meta AI

#### 🔬 深入细节
知识蒸馏解决数据依赖


### Swin Transformer

```yaml
id: swin
num: 3
name: Swin Transformer
full_name: 移动窗口层级Transformer (Swin Transformer)
year: '2021.03'
org: Microsoft Research Asia
parent: vit
paper_url: https://openaccess.thecvf.com/content/ICCV2021/html/Liu_Swin_Transformer_Hierarchical_Vision_Transformer_Using_Shifted_Windows_ICCV_2021_paper
project_url: ''
category: foundation
motivation: 层级特征+线性复杂度
```

#### 📝 一句话总结
Swin Transformer 的核心目标是：层级特征+线性复杂度。

#### 🎯 核心要点
- 核心动机：层级特征+线性复杂度
- 演化来源：继承或改进自 vit
- 代表机构：Microsoft Research Asia

#### 🔬 深入细节
层级特征+线性复杂度


### CLIP

```yaml
id: clip
num: 4
name: CLIP
full_name: 对比语言-图像预训练 (Contrastive Language-Image Pre-training)
year: '2021.01'
org: OpenAI
parent: vit
paper_url: https://openai.com/research/clip
project_url: ''
category: multimodal
motivation: 视觉语言对齐开创零样本
```

#### 📝 一句话总结
CLIP 通过在 4 亿互联网图文对上进行对比学习预训练，将图像与自然语言映射到共享嵌入空间，开创性地实现了视觉模型的零样本迁移能力，无需任何下游标注数据即可匹配 ResNet-50 在 ImageNet 上的监督学习性能。

#### 🎯 核心要点
- **对比学习目标**：给定一个 batch 的 \(N\) 个图文对，最大化 \(N\) 个正确配对的余弦相似度、最小化 \(N^2 - N\) 个错误配对的相似度，使用对称交叉熵损失（InfoNCE）
- **大规模预训练数据集 WIT**：从互联网收集 4 亿（图像, 文本）对，覆盖广泛视觉概念，规模远超 ImageNet
- **双编码器架构**：图像编码器（ResNet / ViT）+ 文本编码器（Transformer），通过线性投影映射到共享多模态嵌入空间
- **零样本迁移**：推理时用自然语言描述构造分类器权重（如 "A photo of a {class}"），无需任何训练样本即可分类
- **Prompt 工程与集成**：使用多种 prompt 模板并集成，平均提升约 5 个百分点
- **可学习温度参数 \(\tau\)**：初始化为 0.07，训练中自动调节，裁剪防止 logits 超过 100
- **8 种模型规模**：5 个 ResNet（RN50, RN101, RN50x4, RN50x16, RN50x64）+ 3 个 ViT（ViT-B/32, ViT-B/16, ViT-L/14）

#### 🔬 深入细节
##### 核心架构示意图

![CLIP 方法总览](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x1.png)
*图 1：CLIP 方法总览。左：对比预训练阶段，图像编码器和文本编码器联合训练以对齐配对的图文嵌入。右：零样本推理阶段，用自然语言构造分类器，直接对新任务进行预测。*

##### 算法伪代码

![CLIP 伪代码](https://ar5iv.labs.arxiv.org/html/2103.00020/assets/x3.png)
*图 3：CLIP 核心实现的 Numpy 风格伪代码。*

等价的 Python 伪代码如下：

```python
# CLIP 对比学习伪代码
# I[n]: 一个 batch 的图像, T[n]: 对应的文本
I_f = image_encoder(I)    # [N, d_i] 图像特征
T_f = text_encoder(T)     # [N, d_t] 文本特征

# 线性投影到共享嵌入空间
I_e = l2_normalize(I_f @ W_i, axis=1)  # [N, d_e]
T_e = l2_normalize(T_f @ W_t, axis=1)  # [N, d_e]

# 计算缩放的余弦相似度矩阵
logits = (I_e @ T_e.T) * exp(t)  # [N, N], t 为可学习温度

# 对称交叉熵损失
labels = arange(N)  # 对角线为正样本
loss_i = cross_entropy(logits, labels, axis=0)  # 图像→文本
loss_t = cross_entropy(logits, labels, axis=1)  # 文本→图像
loss = (loss_i + loss_t) / 2
```

##### 动机与背景

传统计算机视觉系统被训练为预测一组固定的预定义类别，这种受限的监督形式严重限制了模型的通用性——每当需要识别新的视觉概念时，都必须收集额外的标注数据。与此同时，NLP 领域已经证明直接从原始文本学习的预训练方法（如 GPT、BERT）能够实现强大的零样本迁移能力。

CLIP 的核心洞察是：**自然语言本身就是一种丰富的监督信号**。互联网上存在海量的图文配对数据，这些数据天然包含了对视觉概念的语言描述。与其训练模型预测固定类别标签，不如训练模型理解"哪段文本描述了哪张图像"，从而将视觉表示与语言语义对齐。

> 💡 关键：CLIP 不是第一个利用自然语言监督学习视觉表示的工作，但它是第一个证明这种方法在足够大的数据规模下可以匹配甚至超越传统监督学习的工作。

##### 核心机制：对比学习目标

CLIP 的训练目标基于 **InfoNCE 损失**（也称 multi-class N-pair loss）。给定一个 batch 中的 \(N\) 个图文对：

1. **编码**：图像编码器和文本编码器分别将图像和文本映射为特征向量
2. **投影**：通过线性投影层将两种特征映射到同一维度的共享嵌入空间，并进行 L2 归一化
3. **相似度计算**：计算所有 \(N \times N\) 个图文对的余弦相似度，乘以可学习温度参数 \(\exp(\tau)\)
4. **损失计算**：将相似度矩阵视为两个方向的分类问题——每张图像需要从 \(N\) 个文本中找到匹配的那个（反之亦然），使用对称交叉熵损失

$$\mathcal{L} = \frac{1}{2}\left[\frac{1}{N}\sum_{i=1}^{N} -\log \frac{\exp(\text{sim}(I_i, T_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(I_i, T_j)/\tau)} + \frac{1}{N}\sum_{i=1}^{N} -\log \frac{\exp(\text{sim}(I_i, T_i)/\tau)}{\sum_{j=1}^{N}\exp(\text{sim}(I_j, T_i)/\tau)}\right]$$

其中 \(\text{sim}(I, T)\) 为图像嵌入与文本嵌入的余弦相似度。

> ⚠️ 注意：作者发现对比目标比生成式目标（预测文本的精确词语）在零样本迁移效率上高出 **4 倍**。这是因为对比目标只需判断"哪个文本与图像匹配"，而非重建文本的每个词，大幅降低了学习难度。

##### 模型架构

**图像编码器**提供两种选择：

| 架构 | 特点 |
|------|------|
| **ResNet 系列** | 基于 ResNet-50，采用 ResNet-D 改进、抗锯齿 rect-2 模糊池化、注意力池化（替代全局平均池化，使用单层 Transformer 风格 QKV 注意力） |
| **ViT 系列** | 基于 Vision Transformer，添加额外的 LayerNorm 到 patch + position embedding 之前 |

**文本编码器**为 Transformer：
- 基础规模：63M 参数，12 层，512 宽度，8 个注意力头
- BPE 分词，词表大小 49,152，最大序列长度 76
- 使用 `[SOS]` 和 `[EOS]` 标记，取 `[EOS]` 位置的最高层激活作为文本表示
- 使用掩码自注意力（causal mask），保留初始化为预训练语言模型的可能性

两个编码器的输出分别通过**线性投影**（非非线性投影）映射到共享嵌入空间。作者发现线性投影与非线性投影在训练效率上无显著差异。

##### 训练流程

- **数据**：WIT 数据集，4 亿图文对，从互联网公开来源收集，每个查询最多 20,000 对，总词数与 GPT-2 的 WebText 数据集相当
- **优化器**：Adam + 解耦权重衰减（AdamW），余弦学习率调度
- **Batch 大小**：32,768（极大 batch 对对比学习至关重要，提供更多负样本）
- **训练轮数**：32 epochs
- **温度参数**：\(\tau\) 初始化为 0.07，训练中可学习，裁剪防止 logits 缩放超过 100
- **工程优化**：混合精度训练、梯度检查点、半精度 Adam 统计量、嵌入相似度分片计算
- **训练成本**：最大 ResNet（RN50x64）在 592 块 V100 上训练 18 天；最大 ViT（ViT-L/14）在 256 块 V100 上训练 12 天

##### 零样本推理机制

CLIP 的零样本分类流程如下：

1. **构造文本分类器**：对目标数据集的每个类别名称，用 prompt 模板（如 `"A photo of a {class}"`）生成文本描述，通过文本编码器得到类别嵌入向量
2. **图像编码**：将待分类图像通过图像编码器得到图像嵌入
3. **匹配预测**：计算图像嵌入与所有类别文本嵌入的余弦相似度，选择最高相似度的类别

> 💡 关键：这一机制将分类问题转化为图文匹配问题，类别集合完全由自然语言定义，因此可以在不重新训练的情况下迁移到任意分类任务。

**Prompt 工程**显著影响性能。作者发现：
- 仅使用类别名（如 "dog"）存在歧义（多义词问题）和分布偏移（训练时文本是完整句子）
- 使用 `"A photo of a {class}"` 等模板可提供上下文，提升约 1.3 个百分点
- 针对不同数据集定制模板（如卫星图用 `"a satellite photo of a {class}"`）
- 对多个模板的预测进行集成（ensemble），总计提升约 **5 个百分点**

##### 与传统方法的对比

| 维度 | 传统监督学习 | CLIP |
|------|-------------|------|
| 监督信号 | 人工标注的类别标签 | 互联网图文对中的自然语言 |
| 类别集合 | 固定（如 ImageNet 1000 类） | 开放，由自然语言定义 |
| 迁移能力 | 需要微调或线性探测 | 零样本直接迁移 |
| 数据规模 | ImageNet 128 万张 | WIT 4 亿图文对 |
| 泛化性 | 受限于训练类别分布 | 跨 30+ 数据集广泛泛化 |

CLIP 在 ImageNet 上零样本达到 76.2% top-1 准确率，匹配原始 ResNet-50 的监督学习性能，且在 27 个评估数据集上零样本性能与全监督线性探测基线竞争力相当。

#### 🧪 练习题
```yaml
question: "CLIP 在预训练时为什么选择对比学习目标而非生成式（预测文本词语）目标？"
options:
  - "对比目标的模型参数更少，节省显存"
  - "对比目标只需判断图文是否匹配，比预测精确词语更高效，零样本迁移速度提升 4 倍"
  - "生成式目标无法处理图像输入"
  - "对比目标不需要文本编码器"
answer: 1
explain: "作者实验发现，对比目标将任务从预测精确词语简化为判断图文配对关系，在零样本迁移到 ImageNet 的效率上比生成式基线提升了 4 倍。"
```

### DINO

```yaml
id: dino
num: 5
name: DINO
full_name: 无标签自蒸馏 (Self-Distillation with No Labels)
year: '2021.04'
org: Meta AI
parent: vit
paper_url: https://openaccess.thecvf.com/content/ICCV2021/html/Caron_Emerging_Properties_in_Self-Supervised_Vision_Transformers_ICCV_2021_paper
project_url: ''
category: representation
motivation: 自蒸馏涌现语义分割
```

#### 📝 一句话总结
DINO 提出了一种基于自蒸馏（self-distillation）的自监督训练框架，通过 student-teacher 架构与动量更新机制训练 Vision Transformer，发现 ViT 的自注意力图能自动涌现出显式的语义分割能力，并在 ImageNet 线性评估上以 ViT-Base 达到 80.1% top-1 准确率。

#### 🎯 核心要点
- **自蒸馏框架**：Student 网络和 Teacher 网络共享相同架构，Teacher 通过指数移动平均（EMA）更新，无需标签
- **Multi-crop 数据增强**：Student 接收全局视图和局部视图，Teacher 仅接收全局视图，鼓励 "local-to-global" 对应学习
- **防止模式坍塌**：结合 Centering（减去 teacher 输出的指数移动均值）和 Sharpening（低温度 softmax）两种机制，无需对比负样本
- **涌现语义分割**：ViT 的 [CLS] token 自注意力图自动学习到类别特定的语义分割，无需任何像素级标注
- **k-NN 分类器友好**：学到的特征在 k-NN 评估中表现优异，无需任何微调即可达到接近线性探针的性能
- **多任务迁移能力**：在图像检索（Oxford/Paris）、拷贝检测（Copydays）、视频目标分割（DAVIS 2017）等下游任务上均表现出色

#### 🔬 深入细节
##### 核心框架示意图

![DINO 自蒸馏框架](https://ar5iv.labs.arxiv.org/html/2104.14294/assets/x1.png)
*图：DINO 自蒸馏训练框架。输入图像经过不同增强生成多个视图，Student 和 Teacher 共享架构但参数不同，Teacher 通过 EMA 更新。两者输出经过 softmax 归一化后计算交叉熵损失。*

##### 算法伪代码

```python
# DINO PyTorch 伪代码（简化版，不含 multi-crop）
# gs, gt: student 和 teacher 网络
# C: centering 变量
# tps, tpt: student 和 teacher 温度
# l, m: 网络更新率和 EMA 动量

gt.params = gs.params  # 初始化 teacher = student
for x in loader:  # 加载一个 mini-batch x
    x1, x2 = augment(x), augment(x)  # 随机增强生成两个视图

    # Student 和 Teacher 前向传播
    s1, s2 = gs(x1), gs(x2)
    t1, t2 = gt(x1), gt(x2)

    # 计算损失：交叉熵 H(teacher, student)
    loss = H(t1, s2) / 2 + H(t2, s1) / 2

    loss.backward()         # 反向传播更新 student
    update(gs)              # SGD 更新 student 参数

    # EMA 更新 teacher
    gt.params = m * gt.params + (1 - m) * gs.params

    # 更新 center
    C = m * C + (1 - m) * cat([t1, t2]).mean(dim=0)

def H(t, s):
    """交叉熵损失，含 centering 和 sharpening"""
    t = softmax((t - C) / tpt, dim=-1)  # teacher: centering + sharpening
    s = softmax(s / tps, dim=-1)         # student: 普通 softmax
    return - (t * log(s)).sum(dim=-1).mean()
```

##### 动机与背景

自监督学习（Self-Supervised Learning, SSL）在 NLP 领域取得了巨大成功（如 BERT、GPT），但在计算机视觉中，SSL 方法主要依赖 CNN 架构（如 MoCo、SimCLR、BYOL、SwAV）。这些方法通常需要对比学习中的负样本、大 batch size 或特殊的归一化技巧来避免表征坍塌（representation collapse）。

DINO 的核心问题是：**能否设计一种简单的自监督框架，使 Vision Transformer 学到具有涌现语义理解能力的特征？** 作者发现，当将自蒸馏（self-distillation）与 ViT 结合时，模型的自注意力图会自动涌现出语义分割能力——这一特性在 CNN 或监督训练的 ViT 中均不明显。

##### 核心机制详解

**1. Student-Teacher 自蒸馏架构**

DINO 的核心思想来源于知识蒸馏，但与传统蒸馏不同的是，Student 和 Teacher 使用**完全相同的网络架构**（ViT 或 ResNet），且 Teacher 不需要预训练——它通过 Student 的指数移动平均（EMA）动态构建：

$$\theta_t \leftarrow \lambda \theta_t + (1 - \lambda) \theta_s$$

其中 \(\theta_t\) 和 \(\theta_s\) 分别是 Teacher 和 Student 的参数，\(\lambda\) 是动量系数。训练过程中 \(\lambda\) 从 0.996 按余弦调度逐渐增大到 1，使 Teacher 在训练后期更加稳定。

> 💡 关键：EMA Teacher 相当于 Student 历史参数的集成（ensemble），提供了比 Student 更平滑、更稳定的目标分布，这是 DINO 成功的核心因素之一。

**2. Multi-crop 增强策略**

输入图像被增强为两种类型的视图：
- **全局视图（global views）**：覆盖图像 50% 以上区域，分辨率 224×224，共 2 个
- **局部视图（local views）**：覆盖图像不到 50% 区域，分辨率 96×96，共若干个（默认 6 个）

Teacher 仅处理全局视图，而 Student 处理所有视图（包括局部视图）。这种不对称设计鼓励 Student 从局部信息推断全局语义（"local-to-global" 对应），显著提升了特征质量。

**3. 避免模式坍塌：Centering + Sharpening**

自蒸馏框架面临的最大挑战是模式坍塌——Teacher 和 Student 可能收敛到输出常数向量的平凡解。DINO 通过两个互补机制解决这一问题：

- **Centering**：维护 Teacher 输出的指数移动均值 \(\mathbf{c}\)，并在 softmax 之前减去它：

$$P_t(x)^{(i)} = \frac{\exp(g_t(x)^{(i)} - c^{(i)}) / \tau_t}{\sum_k \exp(g_t(x)^{(k)} - c^{(k)}) / \tau_t}$$

Centering 防止某一维度主导输出，但单独使用会鼓励均匀分布（另一种坍塌形式）。

- **Sharpening**：使用较低的 Teacher 温度 \(\tau_t\)（如 0.04，远低于 Student 温度 \(\tau_s = 0.1\)），使 Teacher 输出更加尖锐（peaked），避免均匀分布坍塌。

> ⚠️ 注意：Centering 和 Sharpening 必须同时使用才能有效防止坍塌。Centering 防止单一维度坍塌，Sharpening 防止均匀分布坍塌，二者形成互补。

**4. 投影头设计**

网络的输出经过一个 3 层 MLP 投影头（隐藏层维度 2048），最后接一个 \(\ell_2\) 归一化层和一个权重归一化的全连接层，输出 \(K\) 维向量（默认 \(K = 65536\)）。值得注意的是，DINO **不使用 Batch Normalization**，这与 BYOL 等方法形成对比——BYOL 依赖 BN 来隐式传递 batch 统计信息以避免坍塌，而 DINO 通过 centering + sharpening 显式解决了这一问题。

##### 与传统方法的关键区别

| 特性 | DINO | MoCo-v2 | BYOL | SwAV |
|------|------|---------|------|------|
| 负样本 | ✗ 不需要 | ✓ 需要 | ✗ 不需要 | ✗ 不需要 |
| 动量编码器 | ✓ EMA Teacher | ✓ 动量编码器 | ✓ 动量编码器 | ✗ 无 |
| Multi-crop | ✓ | ✗ | ✗ | ✓ |
| 损失函数 | 交叉熵 | InfoNCE | MSE | 交叉熵+SK |
| Predictor | ✗ 不需要 | ✗ | ✓ 必需 | ✗ |
| BN 依赖 | ✗ 无 | ✓ 有 | ✓ 关键 | ✓ 有 |

消融实验（Table 7）表明：
- 去掉动量编码器后模型完全坍塌（k-NN 准确率降至 0.1%）
- Multi-crop 贡献约 +5% k-NN 准确率（72.8% vs 67.9%）
- 交叉熵损失远优于 MSE 损失（72.8% vs 52.6%）
- 添加 Predictor 对 DINO 几乎无影响（72.8% vs 71.8%），但对 BYOL 是必需的

##### 涌现的语义分割能力

DINO 最引人注目的发现是：用 ViT-S/8 训练后，最后一层 [CLS] token 的多头自注意力图自动涌现出**类别特定的语义分割**。不同的注意力头关注物体的不同语义部分（如头部、腿部、背景），且这种能力在监督训练的 ViT 或使用 CNN 的自监督方法中均不明显。这一特性使 DINO 特征在 DAVIS 2017 视频目标分割任务上无需任何微调即可取得优异性能。

#### 🧪 练习题
```yaml
question: "DINO 中 Teacher 网络的参数更新方式是什么？"
options:
  - "通过反向传播梯度直接更新"
  - "通过 Student 参数的指数移动平均（EMA）更新"
  - "使用预训练的固定参数，不进行更新"
  - "通过 Sinkhorn-Knopp 算法迭代优化"
answer: 1
explain: "DINO 的 Teacher 通过 EMA 更新：θ_t ← λθ_t + (1-λ)θ_s，不接收梯度，相当于 Student 历史参数的集成，提供更稳定的学习目标。"
```

### BEiT

```yaml
id: beit
num: 6
name: BEiT
full_name: BERT式图像Transformer预训练 (BERT Pre-Training of Image Transformers)
year: '2021.06'
org: Microsoft Research
parent: vit
paper_url: https://arxiv.org/abs/2106.08254
project_url: ''
category: representation
motivation: 首创掩码图像建模
```

#### 📝 一句话总结
BEiT 将 BERT 的掩码语言建模思想迁移到视觉领域，提出**掩码图像建模（Masked Image Modeling, MIM）**：将图像分为 patch 和 visual token 两种视图，预训练时随机掩码约 40% 的 patch，让 Vision Transformer 预测被掩码位置对应的离散 visual token（由预训练的 dVAE 生成），从而学到强大的视觉表征。

---

#### 🎯 核心要点
- 核心动机：首创掩码图像建模
- 演化来源：继承或改进自 vit
- 代表机构：Microsoft Research

#### 🔬 深入细节
首创掩码图像建模


### MAE

```yaml
id: mae
num: 7
name: MAE
full_name: 掩码自编码器 (Masked Autoencoders)
year: '2021.11'
org: Meta AI
parent: beit
paper_url: https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper
project_url: ''
category: representation
motivation: 75%掩码率极简高效
```

#### 📝 一句话总结
MAE 提出了一种非对称编码器-解码器架构的掩码自编码方法，通过随机掩盖 75% 的图像 patch 并重建像素值来进行自监督预训练，在大幅降低计算成本（3× 以上加速）的同时使 ViT 在 ImageNet-1K 上达到 87.8% 的最优精度，并在下游任务中展现出优异的迁移能力。

#### 🎯 核心要点
- **非对称编码器-解码器架构**：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅减少预训练计算量
- **极高掩码率（75%）**：远高于 BERT 的 15% 和视觉领域此前的 20%–50%，消除图像空间冗余，迫使模型学习全局语义理解
- **像素级重建目标**：直接预测被掩盖 patch 的像素值（MSE 损失），无需额外的离散 tokenizer（如 BEiT 的 dVAE），更简单高效
- **仅在掩码 patch 上计算损失**：类似 BERT，不对可见 patch 计算重建损失
- **归一化像素作为重建目标**：对每个 patch 内像素做归一化后作为目标可进一步提升表征质量
- **Shuffle/Unshuffle 实现**：无需稀疏操作，通过随机打乱 + 截断 + 恢复顺序实现高效掩码，引入的额外开销可忽略
- **强大的可扩展性**：ViT-H/14 在仅使用 ImageNet-1K 数据下达到 87.8% top-1 精度；COCO 检测 53.3 AP\(^{\text{box}}\)，ADE20K 语义分割 53.6 mIoU

#### 🔬 深入细节
##### 核心架构示意图

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 预训练架构。输入图像被划分为 patch 后随机掩盖 75%，编码器仅处理可见 patch，解码器接收编码表示与 mask token 后重建完整图像。预训练完成后丢弃解码器，编码器用于下游任务。*

![MAE 重建示例](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x2.png)
*图：ImageNet 验证集上的重建示例。每组三张图分别为掩码图像（左）、MAE 重建结果（中）、原始图像（右），掩码率 80%。*

##### 算法伪代码

```python
# MAE 预训练伪代码
def mae_pretrain_step(image, encoder, decoder, mask_ratio=0.75):
    # 1. Patch 嵌入
    patches = patchify(image)                    # [N, patch_dim]
    tokens = linear_embed(patches) + pos_embed   # [N, D]
    
    # 2. 随机掩码（Shuffle + 截断）
    shuffled_indices = random_permutation(N)
    num_visible = int(N * (1 - mask_ratio))      # e.g., 49 out of 196
    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [num_visible, D]
    
    # 3. 编码（仅处理可见 patch）
    latent = encoder(visible_tokens)             # [num_visible, D_enc]
    
    # 4. 拼接 mask token 并恢复顺序（Unshuffle）
    mask_tokens = repeat(learnable_mask_token, N - num_visible)
    full_tokens = concat(latent, mask_tokens)    # [N, D_dec]
    full_tokens = unshuffle(full_tokens, shuffled_indices)
    full_tokens = full_tokens + decoder_pos_embed
    
    # 5. 解码
    reconstructed = decoder(full_tokens)         # [N, patch_pixel_dim]
    
    # 6. 仅在掩码位置计算 MSE 损失
    loss = MSE(reconstructed[masked_indices], target_pixels[masked_indices])
    return loss
```

##### 动机与背景

**NLP 中掩码自编码的成功与视觉领域的差距。** BERT 通过掩盖 15% 的 token 并预测被掩盖内容，在 NLP 领域取得了巨大成功。然而，将这一范式迁移到计算机视觉面临三个核心挑战：

1. **架构差异**：此前视觉领域以 CNN 为主导，卷积操作在规则网格上运行，难以自然地引入 mask token 和位置编码等"指示符"。ViT 的出现消除了这一障碍。

2. **信息密度差异**：语言是高度语义化、信息密集的人工信号，掩盖少量词即可构成有意义的预测任务。图像则是自然信号，存在大量空间冗余——缺失的 patch 往往可以通过邻近 patch 简单插值恢复，无需高层语义理解。因此需要**极高的掩码率**来消除冗余，迫使模型进行全局推理。

3. **解码器角色差异**：在 NLP 中解码器预测的是富含语义的词，因此 BERT 的解码器可以很简单（一个 MLP）。而在视觉中解码器重建的是像素——语义层级较低——因此解码器的设计对学到的表征质量至关重要。

> 💡 关键洞察：图像的空间冗余是视觉掩码自编码与 NLP 的根本差异。MAE 通过极高掩码率（75%）将"简单的插值任务"转化为"需要全局语义理解的困难任务"。

##### 核心机制详解

**1. 非对称编码器-解码器设计**

MAE 的核心创新在于编码器和解码器的**非对称**设计：

- **编码器**：标准 ViT，但仅接收**可见 patch**（约 25%）的 token 序列。被掩盖的 patch 完全不参与编码器计算——不使用 mask token 占位。这意味着编码器的计算量仅为处理全部 patch 的 \(\sim\)25%，带来巨大的效率提升。

- **解码器**：轻量级 Transformer，接收编码器输出的可见 patch 表示 + 可学习的 mask token（共享参数），加上位置编码后处理完整的 token 序列。默认配置为 8 层、宽度 512，计算量不到编码器每 token 计算量的 10%。

$$\text{Encoder input: } \{x_i + e_i \mid i \in \mathcal{V}\}, \quad |\mathcal{V}| \approx 0.25N$$

$$\text{Decoder input: } \{z_i + d_i \mid i \in \mathcal{V}\} \cup \{m + d_j \mid j \in \mathcal{M}\}$$

其中 \(x_i\) 为 patch 嵌入，\(e_i, d_i\) 为位置编码，\(z_i\) 为编码器输出，\(m\) 为共享的 mask token，\(\mathcal{V}, \mathcal{M}\) 分别为可见和掩码 patch 集合。

> ⚠️ 注意：将 mask token 从编码器移到解码器是效率的关键。如果编码器也处理 mask token（如 BEiT），计算量增加 3.3×，且精度反而下降（fine-tuning 84.2% vs 84.9%）。

**2. 高掩码率策略**

消融实验表明，75% 的掩码率在 fine-tuning 和 linear probing 两种评估协议下均为最优。这一比例远高于：
- BERT 的 15%（NLP）
- iGPT 的 50%、BEiT 的 40%（视觉）

过低的掩码率（如 50%）使任务过于简单，模型可通过局部插值完成重建而无需学习语义；过高的掩码率（如 95%）则信息过少导致任务过难。75% 恰好在"足够困难以学习语义"和"足够可行以收敛"之间取得平衡。

**3. 重建目标：像素 vs Token**

MAE 直接以**像素值**作为重建目标，使用 MSE 损失：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{j \in \mathcal{M}} \| \hat{x}_j - x_j \|_2^2$$

其中 \(\hat{x}_j\) 为解码器对第 \(j\) 个掩码 patch 的预测像素值，\(x_j\) 为真实像素值。

进一步地，对每个 patch 内的像素进行**归一化**（减均值除标准差）后作为目标，可提升表征质量（fine-tuning 85.4% vs 84.9%）。这种 per-patch 归一化鼓励模型关注局部对比和纹理结构，而非绝对亮度。

与 BEiT 使用 dVAE token 作为目标相比，MAE 的像素级目标更简单（无需预训练 tokenizer），且精度相当甚至更优。

**4. 高效实现：Shuffle/Unshuffle**

MAE 的实现极为简洁，无需稀疏操作：

1. 对所有 patch token 进行**随机打乱**（shuffle）
2. **截取前 25%** 作为可见 token 送入编码器
3. 编码后，将编码输出与 mask token 拼接，**恢复原始顺序**（unshuffle）
4. 送入解码器

这种实现等价于无放回均匀随机采样，且 shuffle/unshuffle 操作的计算开销可忽略不计。

##### 与 BEiT 的关键区别

| 维度 | MAE | BEiT |
|------|-----|------|
| 重建目标 | 像素值（MSE） | dVAE 离散 token（交叉熵） |
| 编码器输入 | 仅可见 patch | 全部 patch（含 mask token） |
| 掩码率 | 75% | 40% |
| 额外依赖 | 无 | 需预训练 dVAE tokenizer |
| 训练速度 | 3.5× 更快（每 epoch） | 基准 |
| ViT-L fine-tune | 85.9% → 86.9%（ViT-H） | 85.2% |

##### 主要实验结果

**ImageNet-1K 分类：**
- ViT-B：83.6%（fine-tune）
- ViT-L：85.9%（fine-tune）
- ViT-H (224)：86.9%（fine-tune）
- ViT-H (448)：**87.8%**（仅用 IN1K 数据的 SOTA）

**下游迁移任务（ViT-L）：**
- COCO 目标检测：53.3 AP\(^{\text{box}}\)（超越监督预训练 4.0 点）
- COCO 实例分割：47.2 AP\(^{\text{mask}}\)
- ADE20K 语义分割：53.6 mIoU（超越监督预训练 3.7 点）

**训练效率：** ViT-L 在 128 TPU-v3 上预训练 1600 epochs 仅需 31 小时，而 MoCo v3 训练 300 epochs 需 36 小时。

> 💡 关键发现：MAE 的线性探测（linear probing）精度与 fine-tuning 精度**不相关**。MAE 的线性探测精度低于对比学习方法（如 MoCo v3），但只要 fine-tune 1 个 Transformer block，精度就从 73.5% 跃升至 81.0%，说明 MAE 学到的是强大但非线性的特征表示。

#### 🧪 练习题
```yaml
question: "MAE 将 mask token 从编码器移到解码器的主要好处是什么？"
options:
  - "提升重建图像的视觉质量"
  - "使编码器仅处理约 25% 的 token，大幅减少预训练计算量"
  - "让解码器能学到更好的位置编码"
  - "避免编码器过拟合到掩码模式"
answer: 1
explain: "编码器不处理 mask token 意味着其输入序列长度仅为全部 patch 的约 25%，Transformer 的计算量与序列长度平方成正比，因此计算量大幅降低（约 3× 以上加速），这是 MAE 高效训练的核心设计。"
```

### ConvNeXt

```yaml
id: convnext
num: 8
name: ConvNeXt
full_name: 2020年代的卷积网络 (A ConvNet for the 2020s)
year: '2022.01'
org: Meta AI
parent: swin
paper_url: https://openaccess.thecvf.com/content/CVPR2022/html/Liu_A_ConvNet_for_the_2020s_CVPR_2022_paper.html
project_url: ''
category: foundation
motivation: 现代化CNN媲美Transformer
```

#### 📝 一句话总结
ConvNeXt 的核心目标是：现代化CNN媲美Transformer。

#### 🎯 核心要点
- 核心动机：现代化CNN媲美Transformer
- 演化来源：继承或改进自 swin
- 代表机构：Meta AI

#### 🔬 深入细节
现代化CNN媲美Transformer


### EVA

```yaml
id: eva
num: 9
name: EVA
full_name: 探索视觉表征学习极限 (Exploring Visual Representation)
year: '2022.11'
org: 智源研究院
parent: mae
paper_url: https://arxiv.org/abs/2211.07636
project_url: ''
category: representation
motivation: 重建CLIP特征引入语义
```

#### 📝 一句话总结
EVA 提出以 CLIP 视觉特征（而非原始像素）作为掩码图像建模（MIM）的重建目标，成功将 vanilla ViT 扩展至 10 亿参数规模（ViT-g），在图像分类、目标检测、实例分割、语义分割和视频动作识别等多项下游任务上取得了全面领先的结果。

#### 🎯 核心要点
- **架构**：vanilla ViT-g，1.011B 参数（40 层，1408 隐藏维度，6144 MLP 维度，16 头），不引入任何视觉先验
- **预训练任务**：掩码图像建模（MIM），以冻结的 OpenAI CLIP-L/14 视觉编码器输出特征作为重建目标
- **掩码策略**：40% block-wise masking ratio，仅对被掩码 patch 的特征进行回归预测
- **损失函数**：负余弦相似度（negative cosine similarity），无需对 CLIP 特征进行 tokenization 或量化
- **预训练数据**：29.6M 公开图像（ImageNet-21K + CC12M + CC3M + Object365 + COCO + ADE20K）
- **关键发现**：直接回归 CLIP 特征优于 tokenize 后做分类，蒸馏（同时预测可见+掩码 patch）反而有害
- **下游 SOTA**：ImageNet-1K 89.7%、COCO 检测 64.7 AP\(^{\text{box}}\)、LVIS 分割 55.0 AP\(^{\text{mask}}\)、ADE20K 语义分割 62.3 mIoU、Kinetics-400/600/700 视频分类 89.7/89.8/82.9%
- **EVA-CLIP**：用 EVA 预训练权重初始化 1.1B CLIP 视觉塔，稳定大规模对比学习训练，以更少数据超越从头训练的 Open CLIP-H
- **鲁棒性**：ImageNet 与其分布偏移变体之间的性能差距仅 5.6，远优于此前方法

#### 🔬 深入细节
##### 框架总览

![EVA 预训练与下游迁移流程](https://raw.githubusercontent.com/baaivision/EVA/master/assets/eva_pipeline.png)
*图：EVA 的整体流程。左侧为 MIM 预训练阶段（以 CLIP 特征为重建目标），右侧为在多种下游视觉任务上的迁移应用，最终还可用于初始化更大规模的 CLIP 模型。*

##### 算法伪代码

```python
# EVA 预训练核心流程伪代码
# 输入: 图像数据集 D, 冻结的 CLIP 视觉编码器 f_clip
# 输出: 预训练好的 ViT-g 编码器 f_eva

f_clip = load_frozen_clip("CLIP-L/14")  # 冻结，不更新
f_eva = ViT_g(layers=40, dim=1408, heads=16)  # 1.011B 参数

for epoch in range(150):
    for images in DataLoader(D, batch_size=4096):
        # Step 1: Block-wise masking (40% ratio)
        visible_patches, masked_indices = block_mask(images, ratio=0.40)
        
        # Step 2: EVA 编码器仅处理可见 patch
        visible_features = f_eva.encode(visible_patches)
        
        # Step 3: 轻量级解码器预测被掩码位置的特征
        predicted_features = decoder(visible_features, masked_indices)
        
        # Step 4: CLIP 提取完整图像的目标特征
        with torch.no_grad():
            target_features = f_clip.encode_patches(images)  # 所有 patch 的特征
            target_masked = target_features[masked_indices]   # 仅取被掩码位置
        
        # Step 5: 负余弦相似度损失（仅在 masked patches 上计算）
        loss = -cosine_similarity(predicted_features, target_masked).mean()
        
        optimizer.step(loss)
```

##### 动机与背景

掩码图像建模（MIM）借鉴了 NLP 中 BERT/GPT 的成功范式，通过"遮住一部分、预测被遮部分"来学习视觉表征。MAE 和 BEiT 等先驱工作已经证明了 MIM 的有效性，但存在两个核心问题：

1. **重建目标缺乏语义**：MAE 直接重建原始像素，学到的更多是低层纹理信息而非高层语义。BEiT 虽然用 dVAE token 作为目标，但 token 本身也缺乏显式的语义对齐。
2. **模型规模受限**：此前的 MIM 方法主要在 ViT-B/L/H（至多 630M 参数）上验证，尚未探索 10 亿参数级别的 scaling 行为。

EVA 的核心洞察是：**用 CLIP 的视觉特征作为 MIM 的重建目标，可以将图像-文本对齐的语义信息注入到纯视觉的自监督预训练中**，同时这种方法在大规模下表现出优异的 scaling 特性。

##### 核心机制详解

**1. 重建目标：CLIP 视觉特征**

EVA 使用冻结的 OpenAI CLIP-L/14 视觉编码器提取每个 patch 的特征作为预测目标。具体而言，对于输入图像 \(x\)，CLIP 编码器输出 patch-level 特征序列 \(\{f_i^{\text{clip}}\}_{i=1}^{N}\)，其中 \(N\) 为 patch 总数。EVA 编码器仅需预测被掩码位置 \(\mathcal{M}\) 对应的 CLIP 特征。

> 💡 **关键直觉**：CLIP 特征天然包含图像-文本对齐的语义信息，用它作为目标相当于让 MIM 预训练"站在巨人的肩膀上"——不仅学习视觉结构，还隐式地学习了语义理解能力。

**2. 损失函数：负余弦相似度**

EVA 使用负余弦相似度作为损失函数：

$$\mathcal{L} = -\frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \frac{\hat{f}_i \cdot f_i^{\text{clip}}}{\|\hat{f}_i\| \cdot \|f_i^{\text{clip}}\|}$$

其中 \(\hat{f}_i\) 是 EVA 对第 \(i\) 个被掩码 patch 的预测特征，\(f_i^{\text{clip}}\) 是对应的 CLIP 目标特征。

> ⚠️ **重要发现**：论文通过 pilot study 系统比较了多种重建目标设计：
> - 将 CLIP 特征 tokenize 后做分类（类似 BEiT）→ 性能下降，因为量化引入信息损失
> - 蒸馏模式（同时预测可见和掩码 patch 的特征）→ 性能下降，因为可见 patch 的预测过于简单，稀释了学习信号
> - **直接回归被掩码 patch 的 CLIP 特征** → 最优方案，简单且高效

**3. 掩码策略：Block-wise Masking**

EVA 采用 40% 的 block-wise masking ratio。与 MAE 的 75% random masking 不同，EVA 选择较低的掩码比例，这是因为：
- CLIP 特征本身已经是高层语义表示，预测难度较大
- 较低的掩码比例保留更多上下文信息，有助于学习更好的表征
- Block-wise（而非 random）masking 增加了空间连续性，迫使模型理解更大范围的视觉结构

**4. 模型架构：Vanilla ViT-g**

EVA 刻意选择了不带任何视觉先验（如窗口注意力、层级结构）的 vanilla ViT 架构：

| 参数 | 值 |
|------|-----|
| 层数 | 40 |
| 隐藏维度 | 1408 |
| MLP 维度 | 6144 |
| 注意力头数 | 16 |
| 总参数量 | 1.011B |
| Patch 大小 | 14×14 |

> 💡 **设计哲学**：EVA 认为视觉模型应当像语言模型一样，通过大规模预训练而非架构归纳偏置来获得能力。Vanilla ViT 的简洁性使其更容易扩展，且与 NLP Transformer 架构统一，有利于未来的多模态融合。

##### 训练流程与关键细节

**预训练阶段**：
- 数据：合并 6 个公开数据集共 29.6M 图像（去重后），不使用任何标签
- 输入分辨率：224×224（patch size 14×14，共 256 个 patch）
- 优化器：AdamW（\(\beta_1=0.9, \beta_2=0.98\)），学习率 1e-3，weight decay 0.05
- 训练：150 epochs，batch size 4096，fp16 混合精度
- 硬件：128 张 A100-40G GPU，约 14.5 天
- 解码器：仅 2 层 Transformer block（轻量级），训练后丢弃

**下游微调**：
- **图像分类**（ImageNet-1K）：先在 IN-21K 上中间微调（90 epochs, 224²），再在 IN-1K 上微调（10 epochs, 336² 或 560²），达到 89.7% top-1
- **目标检测/实例分割**（COCO & LVIS）：使用 Cascade Mask R-CNN（ViTDet 框架），COCO 达到 64.7 AP\(^{\text{box}}\)，LVIS 达到 62.2 AP\(^{\text{box}}\) / 55.0 AP\(^{\text{mask}}\)
- **语义分割**（ADE20K）：使用 UperNet，达到 62.3 mIoU（单尺度）
- **视频分类**（Kinetics-400/600/700）：直接微调，K-400 达到 89.7%

##### 与传统方法的核心区别

| 对比维度 | MAE | BEiT | EVA |
|---------|-----|------|-----|
| 重建目标 | 原始像素 | dVAE token（离散） | CLIP 视觉特征（连续） |
| 语义信息 | 无 | 弱（dVAE 无语义对齐） | 强（CLIP 图文对齐） |
| 掩码比例 | 75% | 40% | 40% |
| 损失函数 | MSE | 交叉熵 | 负余弦相似度 |
| 最大模型 | ViT-H (632M) | ViT-L (307M) | ViT-g (1.011B) |
| 额外依赖 | 无 | 需训练 dVAE tokenizer | 需冻结 CLIP 模型 |

EVA 的独特优势在于：**CLIP 特征作为"免费"的语义监督信号，无需额外训练 tokenizer，也无需标注数据，却能将丰富的图文对齐语义注入 MIM 预训练**。这使得 EVA 在几乎所有下游任务上都显著超越了像素重建和 token 预测的 MIM 方法。

##### EVA-CLIP：反哺多模态学习

EVA 的一个重要应用是用其预训练权重初始化更大规模的 CLIP 视觉编码器。具体做法：
1. 用 EVA 预训练的 ViT-g 权重初始化 1.1B 参数的 CLIP 视觉塔
2. 语言塔从 CLIP-L 初始化
3. 在 Merged-2B 数据集上进行图文对比学习

这种"MIM 预训练 → CLIP 微调"的交替训练策略带来了显著收益：
- 训练更稳定，避免了大规模 CLIP 训练中常见的崩溃问题
- 以更少的数据和计算量超越了从头训练的 Open CLIP-H
- EVA-CLIP 在 ImageNet 零样本分类上达到 78.5%，刷新了当时的自监督学习 SOTA

> 💡 **深层启示**：EVA 展示了一条"CLIP → MIM → 更大 CLIP"的渐进式 scaling 路径——从较小的 CLIP-L 出发，通过 MIM 预训练扩展到 1B 级别的 ViT-g，再用其初始化更大的 CLIP 模型，形成了一个高效的视觉基础模型 scaling 循环。

#### 🧪 练习题
```yaml
question: "EVA 在 MIM 预训练中选择 CLIP 视觉特征作为重建目标的核心优势是什么？"
options:
  - "CLIP 特征维度更低，降低了计算成本"
  - "CLIP 特征包含图文对齐的语义信息，为 MIM 引入了高层语义监督"
  - "CLIP 特征是离散 token，便于用交叉熵损失训练"
  - "CLIP 特征可以替代数据增强，减少对训练数据量的需求"
answer: 1
explain: "EVA 的核心创新在于利用 CLIP 视觉特征天然携带的图像-文本对齐语义信息，使 MIM 预训练不仅学习视觉结构，还隐式获得语义理解能力，这是像素重建或 dVAE token 预测所不具备的。"
```

### InternImage

```yaml
id: internimage
num: 10
name: InternImage
full_name: 可变形卷积视觉基础模型 (InternImage)
year: '2022.11'
org: 上海AI实验室
parent: convnext
paper_url: https://openaccess.thecvf.com/content/CVPR2023/html/Wang_InternImage_Exploring_Large-Scale_Vision_Foundation_Models_With_Deformable_Convolutions_CVPR_2023_paper.html
project_url: ''
category: foundation
motivation: 可变形卷积扩展至10亿参数
```

#### 📝 一句话总结
InternImage 提出 DCNv3 算子（多组可变形卷积 + 共享权重 + softmax 归一化），结合类 Transformer 的 block 设计和系统化缩放策略，将 CNN 首次扩展至 10 亿参数规模，在 ImageNet、COCO、ADE20K 等基准上达到与大规模 ViT 相当甚至超越的性能。

#### 🎯 核心要点
- **核心算子 DCNv3**：在 DCNv2 基础上做三项关键改进——(1) 采样点间共享投影权重以降低参数量；(2) 引入多组（multi-group）机制，不同组学习不同的空间聚合模式；(3) 将调制标量的归一化从 sigmoid 改为 softmax，使大规模训练更稳定
- **DCNv3 公式**：$y(p_0) = \sum_{g=1}^{G}\sum_{k=1}^{K} \mathbf{w}_g \, m_{gk} \, \mathbf{x}_g(p_0 + p_k + \Delta p_{gk})$，其中 $G$ 为组数，$K$ 为采样点数（默认 9），$\mathbf{w}_g \in \mathbb{R}^{C \times C'}$ 为组内共享权重（$C'=C/G$），$m_{gk}$ 经 softmax 归一化，$\Delta p_{gk}$ 为可学习偏移量
- **架构设计**：4 阶段层级结构，基础 block 采用 DCNv3 + LN + FFN（类 Transformer post-norm 设计）；Stem 层用两个 stride-2 的 3×3 卷积将分辨率降 4 倍；阶段间用 stride-2 的 3×3 卷积下采样
- **堆叠规则 "AABA"**：四个阶段的 block 数遵循 $L_1 = L_2 = L_4 \leq L_3$ 的模式，通道数逐阶段翻倍（$C_i = C_1 \times 2^{i-1}$），整个模型仅需 4 个超参数 $(C_1, C', L_1, L_3)$ 即可定义
- **缩放能力**：从 InternImage-T（30M）到 InternImage-H（1.08B），沿深度和宽度两个维度缩放，H 模型在 ImageNet 达 89.6% top-1，COCO 达 65.4 box mAP，ADE20K 达 62.9 mIoU，均为发表时 SOTA
- **与 MHSA 的对比**：DCNv3 兼具长程依赖（通过可学习偏移量）和自适应空间聚合（通过输入相关的偏移和调制），同时保留了卷积的归纳偏置（局部性、平移等变性），在效率上优于全局注意力

#### 🔬 深入细节
![InternImage 整体架构](https://ar5iv.labs.arxiv.org/html/2211.05778/assets/x3.png)

```
算法: InternImage 前向传播（单阶段 DCNv3 Block）

输入: 特征图 x ∈ R^{C×H×W}
输出: 更新后的特征图 x' ∈ R^{C×H×W}

# ===== DCNv3 算子 =====
# 1. 通过可分离卷积预测偏移量和调制标量
offset, mask = SepConv3x3(x)          # offset: G×K×2, mask: G×K
mask = softmax(mask, dim=K)            # 沿采样点维度做 softmax

# 2. 多组可变形采样与聚合
for g in 1..G:                         # G 个组，每组独立采样
    for k in 1..K:                     # K=9 个采样点（3×3 网格）
        sample_pos = p0 + p_k + offset[g,k]   # 基础位置 + 网格偏移 + 可学习偏移
        feat[g,k] = bilinear_sample(x_g, sample_pos)  # 双线性插值采样
    out_g = w_g @ Σ_k (mask[g,k] * feat[g,k])         # 加权聚合 + 线性投影

y = concat(out_1, ..., out_G)          # 拼接所有组的输出

# ===== Basic Block (类 Transformer) =====
x = x + DCNv3(LN(x))                  # 残差 + DCNv3（post-norm 变体）
x = x + FFN(LN(x))                    # 残差 + FFN
return x

# ===== 整体流水线 =====
# Stem: Conv3x3(s2) → LN → GELU → Conv3x3(s2) → LN   (4× 下采样)
# Stage 1: L₁ × BasicBlock (C₁ channels)
# Downsample: Conv3x3(s2) → LN                         (2× 下采样)
# Stage 2: L₁ × BasicBlock (2C₁ channels)
# Downsample: Conv3x3(s2) → LN                         (2× 下采样)
# Stage 3: L₃ × BasicBlock (4C₁ channels)              ← 主要计算量
# Downsample: Conv3x3(s2) → LN                         (2× 下采样)
# Stage 4: L₁ × BasicBlock (8C₁ channels)
```

**从 DCNv2 到 DCNv3：三步关键改进**

DCNv2 的核心问题在于其设计初衷是作为普通卷积的"增强插件"——加载预训练权重后微调，而非从头训练大规模模型。具体而言，DCNv2 中每个采样点拥有独立的投影权重 $\mathbf{w}_k \in \mathbb{R}^{C \times C}$，导致参数量随采样点数线性增长（3×3 卷积有 9 组独立权重）。InternImage 借鉴可分离卷积的思想，将位置相关的部分交给调制标量 $m_k$ 处理，而投影权重 $\mathbf{w}$ 在所有采样点间共享，大幅降低参数量。同时引入多组机制（类似多头注意力），将通道分为 $G$ 组，每组学习独立的偏移量和调制标量，使单层卷积能捕获多种空间聚合模式。最后，将调制标量的归一化从逐元素 sigmoid（输出范围 $[0,1]$，总和不稳定）改为沿采样点维度的 softmax（总和恒为 1），显著提升了大规模训练的梯度稳定性。

**架构设计：CNN 骨架 + Transformer 灵魂**

InternImage 的宏观架构遵循经典 CNN 的层级设计（4 阶段、逐步下采样），但微观 block 设计完全借鉴了 Transformer：每个 basic block 由 DCNv3 层和 FFN 层组成，均使用 LayerNorm 和残差连接，采用 post-normalization 配置。Stem 层使用两个 stride-2 的 3×3 卷积（中间夹 LN 和 GELU）将输入从 $H \times W$ 降至 $H/4 \times W/4$，第一个卷积的输出通道数为 $C_1/2$，第二个为 $C_1$。阶段间的下采样层由一个 stride-2 的 3×3 卷积加 LN 组成。偏移量和调制标量的预测采用可分离卷积实现：先用 3×3 深度卷积提取空间信息，再用线性投影生成 $G \times K \times 3$ 维输出（2 维偏移 + 1 维调制标量）。这种"CNN 骨架 + Transformer block"的混合设计使模型既保留了卷积的归纳偏置优势，又获得了类似注意力机制的动态聚合能力。

**系统化缩放：从 30M 到 1B 的路径**

模型缩放是 InternImage 的重要贡献之一。作者将搜索空间通过 4 条规则压缩为仅 4 个超参数：(1) 通道数逐阶段翻倍 $C_i = C_1 \times 2^{i-1}$；(2) 组维度 $C' = C/G$ 保持固定（T/S/B/L/XL 为 16，H 为 32）；(3) block 数遵循 "AABA" 模式 $L_1 = L_2 = L_4$；(4) $L_1 \leq L_3$。以 InternImage-T（$C_1=64, C'=16, L_1=4, L_3=18$，30M 参数）为起点，通过增加宽度 $C_1$ 和深度 $L$ 缩放至更大模型。值得注意的是，InternImage-H（1.08B）将组维度从 16 提升至 32，这是因为在超大规模下更大的组维度能提供更丰富的组内表征。缩放遵循 $\alpha \cdot \beta^2 \approx 2$ 的复合缩放原则（$\alpha$ 为深度倍率，$\beta$ 为宽度倍率），确保每次缩放约将 FLOPs 翻倍。InternImage-H 在 427M 张图像上预训练后，ImageNet top-1 达 89.6%，COCO box mAP 达 65.4，ADE20K mIoU 达 62.9，全面超越同期 ViT 模型（如 BEiT-3、FD-SwinV2-G），证明了 CNN 在大规模场景下的竞争力。

**训练策略与效率**

InternImage 的训练分为两个阶段：小模型（T/S/B）在 ImageNet-1K 上从头训练 300 epoch，使用 AdamW 优化器、余弦学习率衰减、大量数据增强（RandAugment、Mixup、CutMix、随机擦除等）；大模型（L/XL/H）先在大规模数据集（如 ImageNet-22K 或私有数据集 Laion-2B 等共 427M 张图像）上预训练，再在 ImageNet-1K 上微调。在效率方面，DCNv3 的 CUDA 实现使其在相同 FLOPs 下比基于注意力的算子更快——InternImage-B 的推理速度与 Swin-B 相当，但精度更高。此外，DCNv3 的稀疏采样特性（每个位置仅采样 $K=9$ 个点）使其内存占用远低于全局注意力，这对于处理高分辨率下游任务（如目标检测和语义分割）至关重要。

#### 🧪 练习题
```yaml
1. **概念理解**：DCNv3 相比 DCNv2 的三项改进分别解决了什么问题？如果去掉 softmax 归一化改回 sigmoid，在大规模训练中可能出现什么现象？

2. **公式推导**：假设 InternImage-T 的某一层有 $C=256$ 个通道、$G=16$ 组、$K=9$ 个采样点，请计算 DCNv3 算子中共享投影权重 $\mathbf{w}_g$ 的总参数量，并与 DCNv2 中独立权重 $\mathbf{w}_k$ 的参数量进行对比。

3. **架构分析**：InternImage 的 "AABA" 堆叠规则意味着 Stage 3 拥有最多的 block。结合特征图分辨率和通道数的变化，分析为什么将计算量集中在 Stage 3 是合理的设计选择。

4. **实验对比**：论文中 InternImage-B（97M 参数）在 ImageNet-1K 上达到 84.9% top-1 准确率，而 ConvNeXt-B（89M）为 83.8%。请从算子设计（静态卷积 vs 动态可变形卷积）的角度分析这 1.1% 的性能差距可能来源于哪些因素。

5. **扩展思考**：DCNv3 的多组机制与 Transformer 中的多头注意力（MHSA）在功能上有何异同？如果将 DCNv3 中的 3×3 网格采样点扩展为更多点（如 5×5 = 25 个点），可能带来什么收益和代价？
```

### DINOv2

```yaml
id: dinov2
num: 11
name: DINOv2
full_name: 无监督鲁棒视觉特征学习 (DINOv2)
year: '2023.04'
org: Meta AI
parent: dino
paper_url: https://arxiv.org/abs/2304.07193
project_url: ''
category: representation
motivation: 1.42亿图像通用视觉特征
```

#### 📝 一句话总结
DINOv2 提出了一套完整的"数据 + 算法 + 工程"方案：通过自动化管线构建 1.42 亿图像的 LVD-142M 数据集，结合 DINO（图像级）与 iBOT（块级）判别式自监督损失以及 SwAV 中心化、KoLeo 正则等改进，在 ViT-g（1B 参数）上训练出无需微调即可在图像级与像素级任务上超越 OpenCLIP 的通用视觉特征，并通过知识蒸馏高效获得小模型。

#### 🎯 核心要点
- **自动化数据管线 LVD-142M**：从多个人工策展数据源出发，利用自监督特征对未策展网络图像进行检索与去重，构建 1.42 亿张高质量训练集，无需人工标注
- **判别式自监督组合损失**：图像级 DINO 损失（student-teacher CLS token 交叉熵）+ 块级 iBOT 损失（掩码 patch token 预测）+ SwAV Sinkhorn-Knopp 中心化
- **DINO 与 iBOT 使用独立投影头**：在大规模训练中，解耦两个损失的 MLP head 效果优于共享权重
- **KoLeo 正则化器**：基于 Kozachenko-Leonenko 微分熵估计，鼓励 batch 内特征均匀分布，防止表示坍塌
- **高效工程实现**：序列打包（block-diagonal attention mask）、高效随机深度（跳过计算而非掩码）、FSDP 混合精度训练、FlashAttention
- **知识蒸馏**：从 ViT-g 冻结教师蒸馏 ViT-S/B/L，性能优于从头训练
- **模型规模**：ViT-S (21M) / ViT-B (86M) / ViT-L (300M) / ViT-g (1.1B)
- **短时高分辨率微调**：训练末期将分辨率从 224 提升至 518，提升密集预测任务性能

#### 🔬 深入细节
##### 整体框架

![DINOv2 特征可视化 — PCA 主成分](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/new-figure-1.jpg)
*图 1：DINOv2 学到的特征经 PCA 可视化后，能在无监督条件下精准分离前景与背景，并在语义相似的物体间产生一致的特征映射。*

DINOv2 的核心思路是：**在足够大且足够好的数据上，用足够强的判别式自监督方法训练足够大的模型，就能得到通用视觉特征**。整个系统由三大支柱组成：

1. **数据管线**（Section 3）—— 自动构建 LVD-142M
2. **训练算法**（Section 4）—— DINO + iBOT + SwAV centering + KoLeo
3. **工程优化**（Section 5）—— FSDP / FlashAttention / 序列打包 / 高效随机深度

![数据规模与模型规模的 scaling 效果](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x1.png)
*图 2：增大数据量和模型规模均能持续提升下游性能，验证了 scaling 的有效性。*

---

##### 数据管线：LVD-142M

![数据管线示意](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x2.png)
*图 3：LVD-142M 数据管线。从策展源出发，对未策展网络图像进行自监督检索和去重。*

数据管线分为三步：

1. **策展数据源汇集**：收集 ImageNet-22k、ImageNet-1k、Google Landmarks 等已有高质量数据集作为"锚点"
2. **自监督检索扩充**：用预训练自监督模型提取特征，从大规模未标注网络图像池中检索与策展图像余弦相似度高的样本
3. **去重**：使用 copy detection 方法去除近重复图像，同时在策展源与未策展源之间、未策展源内部分别去重

> 💡 关键：整个管线**不依赖任何人工标注或文本监督**，完全基于视觉自监督特征完成数据筛选，这是与 CLIP/OpenCLIP 等方法的本质区别。

最终得到 LVD-142M 数据集（142M 张图像），实验表明其效果显著优于仅使用 ImageNet-22k（14M）。

---

##### 训练算法详解

DINOv2 的训练目标由四部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{DINO}} + \lambda_1 \mathcal{L}_{\text{iBOT}} + \lambda_2 \mathcal{L}_{\text{KoLeo}}$$

**（1）图像级目标 — DINO Loss**

采用 student-teacher 框架。对同一图像生成不同裁剪（global crops + local crops），分别送入 student 和 teacher 网络。取两者的 CLS token，经各自的 MLP 投影头后得到 prototype scores，再分别做 softmax：

$$\mathcal{L}_{\text{DINO}} = -\sum p_t \log p_s$$

其中 \(p_t\) 为教师输出（经 Sinkhorn-Knopp 中心化），\(p_s\) 为学生输出（经 softmax）。教师网络参数通过学生参数的**指数移动平均（EMA）**更新：

$$\theta_t \leftarrow m \cdot \theta_t + (1 - m) \cdot \theta_s$$

**（2）块级目标 — iBOT Loss**

对学生输入随机掩码部分 patch，但教师看到完整图像。对学生的 mask token 和教师对应位置的 patch token 分别经投影头后计算交叉熵：

$$\mathcal{L}_{\text{iBOT}} = -\sum_{i \in \text{masked}} p_{t,i} \log p_{s,i}$$

> ⚠️ 注意：在大规模训练中，DINO head 和 iBOT head **使用独立参数**（untied weights），这与 iBOT 原论文中共享权重的结论相反。作者发现在大规模下解耦效果更好。

**（3）Sinkhorn-Knopp 中心化**

替代 DINO 原始的 softmax + moving-average centering，采用 SwAV 的 Sinkhorn-Knopp 批归一化（3 次迭代），对教师输出进行中心化。这能更好地防止表示坍塌。

**（4）KoLeo 正则化器**

基于 Kozachenko-Leonenko 微分熵估计器，鼓励 batch 内特征均匀分布：

$$\mathcal{L}_{\text{KoLeo}} = -\frac{1}{n}\sum_{i=1}^{n} \log(d_{n,i})$$

其中 \(d_{n,i} = \min_{j \neq i} \|x_i - x_j\|\) 是样本 \(x_i\) 到 batch 内最近邻的距离。特征在计算前先做 \(\ell_2\) 归一化。

> 💡 直觉：KoLeo 惩罚特征过于聚集（最近邻距离小 → log 值大负数 → loss 大），从而鼓励特征在超球面上均匀展开。

---

##### 训练伪代码

```python
# DINOv2 训练核心伪代码
for images in dataloader:
    # 数据增强：生成 2 个 global crops + N 个 local crops
    global_crops = augment_global(images)  # 224x224
    local_crops  = augment_local(images)   # 96x96

    # Student: 对 global crops 随机 mask patches
    student_tokens = student_backbone(mask(global_crops))
    student_cls    = student_tokens[:, 0]          # CLS token
    student_patch  = student_tokens[:, 1:]         # patch tokens

    # Teacher (frozen EMA): 看完整图像
    with no_grad():
        teacher_tokens = teacher_backbone(global_crops)
        teacher_cls    = teacher_tokens[:, 0]
        teacher_patch  = teacher_tokens[:, 1:]

    # DINO loss: 图像级 CLS token 交叉熵
    ps_cls = softmax(student_dino_head(student_cls))
    pt_cls = sinkhorn_knopp(teacher_dino_head(teacher_cls))
    L_dino = -sum(pt_cls * log(ps_cls))

    # iBOT loss: 块级 masked patch token 交叉熵
    ps_patch = softmax(student_ibot_head(student_patch[masked_indices]))
    pt_patch = sinkhorn_knopp(teacher_ibot_head(teacher_patch[masked_indices]))
    L_ibot = -sum(pt_patch * log(ps_patch))

    # KoLeo regularizer: 鼓励特征均匀分布
    feats = l2_normalize(student_cls)
    d_nn  = pairwise_min_distance(feats)
    L_koleo = -mean(log(d_nn))

    # 总损失
    loss = L_dino + λ1 * L_ibot + λ2 * L_koleo
    loss.backward()
    optimizer.step()

    # 更新教师 EMA
    teacher.params = m * teacher.params + (1 - m) * student.params
```

---

##### 工程优化

DINOv2 在工程层面做了大量优化，使得在 ViT-g（1.1B 参数）规模上的训练成为可能：

| 优化技术 | 核心思路 | 收益 |
|---------|---------|------|
| **序列打包** | 将不同分辨率的 crops 拼接为一条长序列，用 block-diagonal attention mask 隔离 | 避免多次前向/反向，显著提升吞吐 |
| **高效随机深度** | 跳过被 drop 的残差块计算（而非计算后掩码），随机 shuffle batch 后取前 \((1-d) \times B\) 个样本 | drop rate=40% 时节省约 40% 计算和显存 |
| **FSDP 混合精度** | 权重 float32 存储 + float16 通信（backbone 梯度 fp16 reduce，MLP head 梯度 fp32 reduce） | 通信量减半，显存不受单卡限制 |
| **FlashAttention** | 融合 attention 计算，减少 HBM 访问 | 加速 attention 计算 |

> 💡 关键：FSDP 混合精度在几乎所有场景下都优于 DDP + autocast，因为它同时减少了通信开销和显存占用。

---

##### 知识蒸馏

训练完 ViT-g 后，通过蒸馏获得小模型（ViT-S/B/L）：

- 使用 ViT-g 作为**冻结教师**
- 复用同一训练框架（DINO + iBOT loss）
- 关键修改：去除 masking 和 stochastic depth，对两个 global crops 都计算 iBOT loss
- 最终模型取学生的 EMA

> 💡 实验发现：蒸馏得到的 ViT-L 性能优于从头训练的 ViT-L，说明大模型的知识能有效传递。

---

##### 与先前方法的对比

| 维度 | DINO | iBOT | DINOv2 |
|------|------|------|--------|
| 图像级目标 | ✅ CLS token 蒸馏 | ✅ 继承 DINO | ✅ 继承 DINO |
| 块级目标 | ❌ | ✅ masked patch prediction | ✅ 继承 iBOT |
| 中心化方式 | softmax + moving avg | softmax + moving avg | **Sinkhorn-Knopp** |
| 投影头 | 共享 | 共享 | **独立（untied）** |
| 特征正则 | 无 | 无 | **KoLeo** |
| 数据 | ImageNet-1k | ImageNet-1k/22k | **LVD-142M（自动策展）** |
| 模型规模 | ViT-S/B | ViT-S/B/L | **ViT-S/B/L/g（1.1B）** |
| 蒸馏 | 无 | 无 | **ViT-g → 小模型** |

DINOv2 的核心贡献不在于提出全新的损失函数，而在于**系统性地将数据规模、模型规模和训练技巧整合到一起**，证明了判别式自监督方法在正确的 scaling 下可以产出媲美甚至超越弱监督方法（如 CLIP）的通用视觉特征。

#### 🧪 练习题
```yaml
question: "DINOv2 中为什么要将 DINO head 和 iBOT head 的权重解耦（untied）？"
options:
  - "为了减少模型总参数量"
  - "因为在大规模训练中，解耦两个 head 的性能优于共享权重"
  - "为了让 iBOT loss 只作用于 CLS token"
  - "因为 Sinkhorn-Knopp 中心化要求两个 head 独立"
answer: 1
explain: "iBOT 原论文在小规模实验中发现共享权重更好，但 DINOv2 在大规模训练中观察到相反结论——解耦两个投影头能获得更好的下游性能。"
```

### SAM

```yaml
id: sam
num: 12
name: SAM
full_name: 分割一切模型 (Segment Anything Model)
year: '2023.04'
org: Meta AI
parent: vit
paper_url: http://openaccess.thecvf.com/content/ICCV2023/html/Kirillov_Segment_Anything_ICCV_2023_paper.html
project_url: ''
category: segmentation
motivation: 可提示分割定义新范式
```

#### 📝 一句话总结
SAM 将 NLP 中"prompt → response"的基础模型范式迁移到视觉分割领域：给定任意提示（点、框、文本、掩码），模型输出有效的分割掩码，并通过"模型-数据"飞轮（data engine）自举式地构建了迄今最大的分割数据集 SA-1B。

---

#### 🎯 核心要点
- 定义 **可提示分割任务（Promptable Segmentation）** 作为统一预训练目标，支持点、框、文本、掩码等任意 prompt 输入
- 三组件架构：**Image Encoder**（MAE 预训练 ViT-H，632M 参数）+ **Prompt Encoder**（稀疏/稠密双路）+ **Mask Decoder**（2 层 Transformer decoder，~50ms on CPU）
- **歧义感知输出**：同时预测 3 个不同粒度的掩码 + IoU 置信度，训练时只对最小 loss 的掩码回传梯度
- **三阶段数据引擎（Data Engine）**：人工辅助 → 半自动 → 全自动，自举式构建 SA-1B 数据集
- **SA-1B 数据集**：11M 图像、1.1B 掩码（99.1% 全自动生成），94% 掩码与专业标注 IoU > 90%
- 在 23 个分割数据集上零样本迁移，多数任务超越或匹配全监督 prior art
- 损失函数：Focal Loss + Dice Loss（20:1 权重），11 轮交互式 prompt 采样训练

#### 🔬 深入细节
##### 整体架构

![SAM 模型架构总览](https://ar5iv.labs.arxiv.org/html/2304.02643/assets/x1.png)
*图：SAM 由 Image Encoder、Prompt Encoder 和 Mask Decoder 三部分组成。Image Encoder 只运行一次，后续所有 prompt 交互复用同一特征图。*

SAM 的设计哲学是"一次编码，多次解码"——将计算量最大的图像特征提取与轻量的 prompt 交互解耦，实现实时交互式分割。

---

##### 1. Promptable Segmentation 任务定义

**动机：** NLP 领域的基础模型（如 GPT）通过"next token prediction"预训练，再通过 prompt engineering 泛化到下游任务。图像分割领域缺乏类似的统一范式——语义分割、实例分割、全景分割各自为政，每种任务需要单独的模型和标注。

**核心定义：** 给定任意 prompt（前景/背景点、边界框、粗掩码、自由文本），返回一个**有效的（valid）**分割掩码。"有效"意味着即使 prompt 有歧义（如点击衬衫上的点，可能指衬衫、人、或整个场景），输出也应是其中至少一个物体的合理掩码。

> 💡 **关键洞察：** 这个任务定义同时解决了预训练和零样本迁移两个问题——预训练时模拟交互式 prompt 序列，推理时通过设计合适的 prompt 即可解决各种下游分割任务（如用检测器的框输出作为 prompt 实现实例分割）。

---

##### 2. Image Encoder — MAE 预训练的 ViT-H

SAM 选择 MAE（Masked Autoencoder）预训练的 ViT-H/16 作为图像编码器（632M 参数）：

- **输入**：\(1024 \times 1024\) 图像
- **输出**：\(64 \times 64 \times 256\) 特征图（16× 下采样）
- **位置编码**：相对位置编码（而非绝对），更好适应不同分辨率
- **注意力优化**：在第 2、5、8、11 个 block 使用全局注意力，其余使用窗口注意力，降低计算量
- **通道映射**：通过 \(1 \times 1\) 和 \(3 \times 3\) 卷积将 ViT 的 1280 维输出降至 256 维

> ⚠️ **计算瓶颈：** Image Encoder 是整个系统的计算瓶颈（~0.15s/image on GPU），但由于其输出不依赖 prompt，只需运行一次。后续所有 prompt 交互都复用同一特征图，实现"摊销"计算。

---

##### 3. Prompt Encoder — 稀疏 + 稠密双路编码

Prompt Encoder 将不同类型的提示统一编码为 256 维向量：

**稀疏 prompt（输出为 token 序列）：**
- **点（point）**：傅里叶位置编码 + 前景/背景可学习嵌入
- **框（box）**：左上角 + 右下角两个点的位置编码 + 可学习嵌入
- **文本（text）**：CLIP 文本编码器提取特征

**稠密 prompt（输出为空间特征图）：**
- **掩码（mask）**：通过 \(4 \times\) 下采样卷积网络编码，逐元素加到图像特征上

位置编码使用**随机傅里叶特征映射**，将 2D 坐标映射到高维空间，与 NeRF 中的位置编码思路一致。

---

##### 4. Mask Decoder — 轻量 Transformer 解码器

这是 SAM 最精巧的部分。Mask Decoder 仅用 **2 层修改版 Transformer decoder** 实现 prompt 到掩码的映射：

```
Mask Decoder 伪代码:
─────────────────────────────────
输入:
  image_embedding: [64×64, 256]    # Image Encoder 输出
  prompt_tokens: [N, 256]          # 稀疏 prompt 编码
  output_tokens: [5, 256]          # 4 个 mask token + 1 个 IoU token (可学习)

for layer in decoder_layers (×2):
    # Step 1: token 间自注意力
    tokens = self_attn(output_tokens + prompt_tokens)
    
    # Step 2: token → image 交叉注意力
    tokens = cross_attn(q=tokens, kv=image_embedding)
    
    # Step 3: MLP 变换
    tokens = MLP(tokens)
    
    # Step 4: image → token 交叉注意力 (关键！双向交互)
    image_embedding = cross_attn(q=image_embedding, kv=tokens)

# 上采样 + 动态 MLP 生成掩码
upsampled = upsample_4x(image_embedding)  # → [256×256, 32]
for i in range(4):
    mask_weights_i = DynamicMLP(mask_token_i)   # [32]
    masks[i] = sigmoid(upsampled @ mask_weights_i)  # [256×256]

iou_scores = MLP(iou_token)  # 4 个 IoU 置信度
─────────────────────────────────
```

**歧义处理机制：** 一个 prompt 可能对应多个合理的分割结果。SAM 同时输出 **3 个不同粒度的掩码**（whole / part / subpart）+ 1 个额外掩码，每个附带 IoU 置信度。训练时只对 loss 最小的掩码回传梯度（类似 DETR 的匹配策略），推理时选 IoU 最高的掩码。

> 💡 **为什么只用 2 层 decoder？** Image Encoder 已提供极其丰富的特征，decoder 只需做轻量的 prompt-conditioned 选择。这使得每次 prompt 交互仅需 ~50ms（CPU），支持实时交互标注。

---

##### 5. 数据引擎 — 三阶段自举式数据飞轮

SAM 的核心洞察：**模型和数据可以互相提升**。数据引擎分三个阶段：

**阶段一：人工辅助标注（Assisted-Manual）**
- 专业标注员使用 SAM 交互式标注（点击 prompt → 模型预测 → 人工修正）
- 类似经典交互式分割，但 SAM 的实时性大幅提升效率
- 收集 **4.3M 掩码**（120K 图像）

**阶段二：半自动标注（Semi-Automatic）**
- SAM 先自动检测高置信度物体，标注员只需标注 SAM 遗漏的物体
- 目标：增加多样性，标注不显眼的物体
- 新增 **5.9M 掩码**（180K 图像），每张图像平均掩码数从 44 增至 72

**阶段三：全自动标注（Fully Automatic）**
- 在图像上铺设 \(32 \times 32 = 1024\) 个均匀网格点作为 prompt
- 每个点预测一组掩码（利用歧义感知输出）
- 通过 NMS（IoU 阈值）+ 置信度过滤 + 稳定性过滤去重
- 最终生成 **1.1B 掩码**（11M 图像），99.1% 全自动

```python
# 全自动标注伪代码
for image in dataset:
    features = image_encoder(image)           # 编码一次
    points = uniform_grid(32, 32)             # 1024 个点
    all_masks = []
    for point in points:
        masks, ious = mask_decoder(features, point)  # 每点 3 个掩码
        all_masks.extend(filter_by_confidence(masks, ious))
    
    # 后处理
    all_masks = NMS(all_masks, iou_threshold=0.7)
    all_masks = stability_filter(all_masks)   # 阈值扰动稳定性
    final_masks = remove_duplicates(all_masks)
```

---

##### 6. 训练策略

**交互式训练模拟：** 每个训练样本模拟 **11 轮交互**：
1. **第 1 轮**：随机选择前景点或边界框作为初始 prompt
2. **第 2-9 轮**：从上一轮预测与 GT 的误差区域采样新的纠正点（false negative → 前景点，false positive → 背景点），同时将上一轮的**未二值化 mask logits** 作为额外 prompt 输入
3. **第 10-11 轮**：不添加新点，让模型学习自我精炼掩码

**损失函数：**

$$\mathcal{L} = \lambda_{\text{focal}} \cdot \text{FocalLoss}(m, \hat{m}) + \lambda_{\text{dice}} \cdot \text{DiceLoss}(m, \hat{m})$$

其中 \(\lambda_{\text{focal}} : \lambda_{\text{dice}} = 20 : 1\)，对 3 个输出掩码取最小 loss 回传。

**优化配置：** AdamW（\(\beta_1=0.9, \beta_2=0.999\)），初始学习率 \(8 \times 10^{-4}\)，250 步线性 warmup，在 60K 和 86.7K 步分别衰减 10×，共训练 90K 步（~2 个 SA-1B epoch），batch size 256，weight decay 0.1，drop path rate 0.4，layer-wise lr decay 0.8。

---

##### 7. 零样本迁移与传统方法对比

SAM 与传统分割方法的核心区别在于：传统方法为每个任务单独训练（语义分割用 FCN/DeepLab，实例分割用 Mask R-CNN，全景分割用 Panoptic FPN），而 SAM 通过 prompt engineering 零样本解决所有任务。

在 23 个数据集上的零样本评估中：
- **单点分割**：平均 mIoU 显著超越 RITM 等交互式分割方法
- **边界框 → 实例分割**：COCO/LVIS 上零样本接近 ViTDet 全监督性能
- **目标提议生成**：全自动网格点 prompt，中大物体 AR 超越 ViTDet
- **边缘检测**：BSDS500 上零样本达到合理性能

> ⚠️ **局限性：** SAM 不生成语义标签（只输出掩码）；对细粒度结构精度有限；文本 prompt 能力尚为初步探索；实时性依赖图像编码器预计算。

---

#### 🧪 练习题
```yaml
question: "SAM 在训练时对 3 个输出掩码的损失函数采用什么策略？"
options:
  - "对 3 个掩码的 loss 取平均后回传梯度"
  - "只对 IoU 置信度最高的掩码回传梯度"
  - "只对与 GT 匹配 loss 最小的掩码回传梯度"
  - "对 3 个掩码分别回传梯度，使用不同的 loss 权重"
answer: 2
explain: "SAM 采用类似 DETR 的匹配策略，训练时只对 loss 最小的那个掩码回传梯度，让每个 output token 学会预测不同粒度的掩码，避免 mode averaging。"
```

### Florence-2

```yaml
id: florence2
num: 13
name: Florence-2
full_name: 统一视觉任务表征 (Florence-2)
year: '2024'
org: Microsoft Research
parent: clip
paper_url: http://openaccess.thecvf.com/content/CVPR2024/html/Xiao_Florence-2_Advancing_a_Unified_Representation_for_a_Variety_of_Vision_CVPR_2024_paper.html
project_url: ''
category: multimodal
motivation: 统一Prompt处理多粒度任务
```

#### 📝 一句话总结
Florence-2 提出了一种基于序列到序列架构的统一视觉基础模型，通过构建包含 5.4B 多粒度注释的大规模数据集 FLD-5B 进行多任务预训练，使单一模型能够以统一的文本生成范式处理从图像级到像素级的多种视觉任务，在仅 0.77B 参数下实现了超越数十倍大模型的零样本性能。

#### 🎯 核心要点
- **统一 seq2seq 架构**：将所有视觉任务（分类、描述、检测、分割、Grounding 等）统一为"图像 + 文本提示 → 文本输出"的序列到序列范式
- **FLD-5B 大规模多任务数据集**：包含 126M 图片、5.4B 注释（500M 文本 + 1.3B 区域-文本 + 3.6B 文本-短语-区域），覆盖从粗到细的多粒度语义
- **数据引擎三阶段流水线**：专家模型初始标注 → 数据过滤与增强 → 迭代精炼，自动化构建高质量多任务标注
- **位置 token 量化**：将坐标归一化后量化为 1000 个 bin，作为新词加入 tokenizer，统一表示 bounding box 和多边形区域
- **DaViT 视觉编码器 + 多模态 Encoder-Decoder**：视觉特征经线性投影后与文本 embedding 拼接，输入标准 Transformer encoder-decoder
- **两种规模**：Florence-2-B（232M 参数）和 Florence-2-L（771M 参数），均以极小参数量实现 SOTA 零样本性能
- **多任务零样本能力**：单一模型在 COCO Caption、Flickr30k Grounding、RefCOCO 等多个基准上超越 Flamingo（80B）和 Kosmos-2（1.6B）

#### 🔬 深入细节
![Florence-2 模型总览](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x1.png)
*图 1：Florence-2 以统一的 prompt-based 范式处理多种视觉任务，涵盖图像级（分类、描述、VQA）、区域级（检测、Grounding、OCR）和像素级（分割、指代分割）*

![Florence-2 架构图](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x2.png)
*图 2：Florence-2 的模型架构——DaViT 视觉编码器提取图像特征，经线性投影后与文本 prompt embedding 拼接，送入多模态 encoder-decoder 生成目标文本序列*

##### 统一多任务训练的伪代码

```python
# Florence-2 统一多任务训练流程
# 所有任务共享同一模型，仅通过 text prompt 区分任务类型

for batch in multitask_dataloader:
    image, prompt, target = batch
    # prompt 示例: "<OD>" (检测), "<CAPTION>" (描述), "<REFERRING_EXPRESSION>" (指代)
    
    # 1. 视觉编码: DaViT 提取图像特征
    V = DaViT(image)                    # V ∈ R^{N_v × D_v}
    V_proj = LayerNorm(Linear(V))       # V' ∈ R^{N_v × D}
    
    # 2. 文本编码: tokenize prompt (含 location tokens)
    T = text_embedding(tokenize(prompt))  # T ∈ R^{N_t × D}
    
    # 3. 拼接视觉与文本 token
    X = concat(V_proj, T)               # X ∈ R^{(N_v + N_t) × D}
    
    # 4. Encoder-Decoder 生成目标序列
    # target 可包含普通文本 token 和 location tokens (<loc_0>...<loc_999>)
    logits = encoder_decoder(X, target_shifted)
    
    # 5. 标准交叉熵损失
    loss = cross_entropy(logits, target)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

传统视觉模型通常针对单一任务设计专门的架构和训练流程：分类模型输出类别标签，检测模型输出 bounding box，分割模型输出像素 mask。这种碎片化的设计导致：
1. **每个任务需要独立的模型和训练数据**，无法共享跨任务的视觉知识；
2. **缺乏统一的表征空间**，难以同时理解图像级语义和区域级/像素级细节；
3. **现有大规模预训练数据集**（如 CLIP 的 WIT-400M、SAM 的 SA-1B）通常只覆盖单一层级的标注。

Florence-2 的核心思想是：**视觉理解本质上是一个从图像到结构化文本的映射问题**，无论是"这张图片描述了什么"还是"图中猫的位置在哪里"，都可以用文本序列来表达答案。

##### 核心机制：统一的序列到序列框架

**任务统一化设计**

Florence-2 将所有视觉任务转化为统一的 seq2seq 格式：

$$\mathcal{L} = -\sum_{i=1}^{|y|} \log P_\theta(y_i | y_{<i}, x)$$

其中 \(x\) 是图像与文本 prompt 的组合输入，\(y\) 是目标输出序列。不同任务通过不同的 prompt 触发：

| 任务类型 | Prompt 示例 | 输出格式 |
|---------|------------|---------|
| 图像描述 | `<CAPTION>` | 自然语言文本 |
| 目标检测 | `<OD>` | `<loc_x1><loc_y1><loc_x2><loc_y2> 类别名` |
| 视觉定位 | `Locate: {phrase}` | `<loc_x1><loc_y1><loc_x2><loc_y2>` |
| 指代分割 | `<REFERRING_EXPRESSION_SEGMENTATION> {expr}` | 多边形坐标序列 |
| OCR | `<OCR>` | 识别文本 + 位置 |

> 💡 **关键创新**：位置信息的文本化表示。Florence-2 将图像坐标归一化到 [0, 1000) 范围，每个整数值对应一个特殊 token `<loc_0>` 到 `<loc_999>`。这样 bounding box `(x1, y1, x2, y2)` 就变成了 4 个 token 的序列，多边形区域则是更长的坐标 token 序列。这种设计使得位置信息可以无缝融入标准的语言模型生成框架。

**模型架构**

Florence-2 采用 encoder-decoder 架构，由三个核心组件构成：

1. **视觉编码器（DaViT）**：采用 Dual-attention Vision Transformer，结合空间注意力和通道注意力，将输入图像编码为视觉 token 序列 \(\mathbf{V} \in \mathbb{R}^{N_v \times D_v}\)。
2. **线性投影层 + LayerNorm**：将视觉特征维度对齐到语言模型维度 \(D\)，得到 \(\mathbf{V}' \in \mathbb{R}^{N_v \times D}\)。
3. **多模态 Encoder-Decoder**：基于标准 Transformer 架构，encoder 接收视觉 token 与文本 prompt token 的拼接序列，decoder 自回归生成目标文本序列。权重初始化自 BART 预训练模型。

> ⚠️ **注意**：与 BLIP-2 等使用 Q-Former 桥接视觉和语言的方法不同，Florence-2 采用简单的线性投影 + 拼接方式，没有引入额外的跨模态对齐模块。这种简洁设计依赖于大规模多任务数据的充分训练来隐式学习跨模态对齐。

##### FLD-5B 数据引擎

![Florence-2 数据引擎](https://ar5iv.labs.arxiv.org/html/2311.06242/assets/x3.png)
*图 3：Florence-2 数据引擎的三阶段流水线：专家模型初始标注 → 数据过滤 → 迭代精炼*

FLD-5B 的构建是 Florence-2 成功的关键。数据引擎包含三个阶段：

**阶段一：专家模型初始标注**
- 从 ImageNet-22k、Object 365、Open Images、Conceptual Captions、LAION 等数据集收集 126M 图片
- 使用多个专家模型为每张图片生成多粒度标注：图像描述模型生成文本、DINO 检测器生成区域框、Grounding DINO 生成短语-区域对、SAM 生成分割 mask

**阶段二：数据过滤与增强**
- 文本过滤：基于 SpaCy 解析工具提取对象/属性/动作，过滤噪声过多的文本
- 区域过滤：置信度阈值 + 非极大值抑制（NMS）去除低质量和冗余框

**阶段三：迭代精炼**
- 用过滤后的数据训练初版多任务模型
- 用该模型重新预测训练集，发现其预测质量优于原始噪声标注
- 将更新后的标注与原始标注合并，进行下一轮训练
- 对于初始数据不足的任务（如详细描述），利用迭代模型预训练后在小数据集上微调，再用微调模型标注全量数据

最终 FLD-5B 包含三种粒度的标注：
- **文本**（500M）：简短描述（~8 tokens）、详细描述（~32 tokens）、更详细描述（~71 tokens）
- **区域-文本对**（1.3B）：bounding box + 类别短语/简短描述
- **文本-短语-区域三元组**（3.6B）：图像描述 + 名词短语 + 对应区域框/mask

##### 训练与推理流程

**预训练**：
- 所有任务混合训练，共享模型参数，使用标准交叉熵损失
- 图像编码器初始化自 UniCL，encoder-decoder 初始化自 BART
- 训练 3B 有效样本，先 384×384 分辨率，再高分辨率微调至 768×768
- Base 模型 batch size 2048，Large 模型 batch size 3072

**推理**：
- 输入图像和任务 prompt，模型自回归生成输出序列
- 后处理：将输出中的 location token 转换回坐标，文本 token 直接作为结果

##### 与传统方法的区别

| 对比维度 | 传统专家模型 | Florence-2 |
|---------|------------|-----------|
| 模型数量 | 每个任务一个模型 | 单一统一模型 |
| 输出格式 | 任务特定（类别/框/mask） | 统一文本序列 |
| 位置表示 | 连续坐标回归 | 离散化 location token |
| 预训练数据 | 单任务标注 | 多粒度 5.4B 标注 |
| 参数量 | 通常 >1B（大模型） | 0.23B / 0.77B |
| 零样本能力 | 无 | 强零样本多任务能力 |

Florence-2-L 以 0.77B 参数在 COCO Caption 上达到 135.6 CIDEr（零样本），远超 80B 参数的 Flamingo（84.3 CIDEr）；在 Flickr30k Grounding 上达到 84.4 R@1，超越 1.6B 的 Kosmos-2（78.7）约 5.7 个点。这证明了**高质量多粒度数据 + 统一架构**的巨大潜力。

#### 🧪 练习题
```yaml
question: "Florence-2 如何在统一的序列到序列框架中表示目标检测任务的 bounding box 输出？"
options:
  - "使用连续浮点数坐标直接回归"
  - "将坐标归一化后量化为离散的 location token（如 <loc_0> 到 <loc_999>）作为文本序列生成"
  - "使用额外的检测头输出框坐标，与文本生成分离"
  - "将 bounding box 编码为固定长度的二进制向量"
answer: 1
explain: "Florence-2 将归一化坐标量化为 1000 个 bin 对应的特殊 token，使位置信息可以像普通文本一样通过自回归生成，实现了检测、分割等任务与语言生成的统一。"
```

### SAM 2

```yaml
id: sam2
num: 14
name: SAM 2
full_name: 分割一切模型2 (Segment Anything Model 2)
year: '2024.07'
org: Meta AI
parent: sam
paper_url: https://ai.meta.com/blog/segment-anything-2/
project_url: ''
category: segmentation
motivation: 统一图像视频分割
```

#### 📝 一句话总结
SAM 2 提出了统一的可提示视觉分割（Promptable Visual Segmentation）模型，通过在 SAM 架构上引入流式记忆机制（Memory Attention + Memory Bank），将图像分割能力自然扩展到视频领域，同时构建了迄今最大的视频分割数据集 SA-V（50.9K 视频、642.6K masklets），在 17 个视频分割基准上取得 SOTA，且图像分割速度比 SAM 快 6 倍、精度更高。

#### 🎯 核心要点
- **统一任务定义**：提出 Promptable Visual Segmentation (PVS) 任务，将图像分割（SA）和视频对象分割（VOS）统一为同一框架，支持在视频任意帧上以点击、框、掩码等方式交互式提示
- **流式架构设计**：基于 SAM 扩展，新增 Memory Attention 模块（L 层 Transformer，交叉注意力融合历史记忆）、Memory Encoder（编码预测掩码与图像特征）和 Memory Bank（FIFO 存储最近 N=6 帧 + M 个提示帧 + 对象指针）
- **图像编码器升级**：将 SAM 的 ViT 替换为 Hiera（MAE 预训练的层次化 ViT），支持多尺度特征，速度更快
- **遮挡感知**：在 Mask Decoder 中新增 occlusion prediction head，输出遮挡分数，当目标被遮挡时抑制低质量掩码进入记忆库
- **三阶段数据引擎**：Phase 1（纯 SAM 逐帧标注，37.8s/帧）→ Phase 2（SAM + SAM 2 辅助，7.4s/帧）→ Phase 3（SAM 2 主导 + 人工精修，4.5s/帧），标注效率提升 8.4 倍
- **SA-V 数据集**：50.9K 视频、642.6K masklets、35.5M 掩码，规模是现有最大 VOS 数据集的 53 倍，覆盖 47 个国家的多样化场景
- **全面 SOTA**：在 17 个 VOS 基准上全面超越先前方法；交互式视频分割比 SAM+XMem++/Cutie 组合少 3 倍交互次数；图像分割比 SAM 快 6 倍且精度更高（SA-23 上 1-click mIoU: 61.4 vs 58.1）

#### 🔬 深入细节
##### 模型架构总览

![SAM 2 模型架构图](https://raw.githubusercontent.com/facebookresearch/sam2/main/assets/model_diagram.png?raw=true)
*图：SAM 2 整体架构。图像编码器逐帧提取特征，Memory Attention 模块融合历史记忆，Prompt/Mask Decoder 生成分割掩码，Memory Encoder 将结果写入 Memory Bank 供后续帧使用。*

SAM 2 的核心设计理念是：**将视频视为"带记忆的图像序列"**。当模型处理单帧图像时，它退化为类 SAM 的交互式分割器；当处理视频时，Memory Attention 模块通过交叉注意力机制融合来自 Memory Bank 的时序信息，实现跨帧追踪。

##### 核心组件详解

**1. Image Encoder（图像编码器）**

SAM 2 将原始 SAM 的 ViT-H 编码器替换为 **Hiera**（Ryali et al., 2023），一种通过 MAE（Masked Autoencoder）预训练的层次化视觉 Transformer。Hiera 的关键优势在于：
- **多尺度特征提取**：类似 FPN 的层次结构，在不同分辨率下提取特征
- **计算效率**：去除了 ViT 中不必要的组件，推理速度显著提升
- **实时处理**：图像编码器对整个视频的每一帧运行（非条件化于交互），编码结果可被后续所有交互复用

> 💡 关键：图像编码器是**无条件的**（不依赖提示），因此对于一段视频只需编码一次，后续的多次交互可以复用特征，这是实现实时交互的关键。

**2. Memory Attention（记忆注意力）**

Memory Attention 是 SAM 2 相对于 SAM 最核心的新增模块，由 **L 层堆叠的 Transformer 块**组成。每层包含：
- **Self-Attention**：当前帧特征的自注意力
- **Cross-Attention to Memories**：当前帧特征对 Memory Bank 中存储的记忆进行交叉注意力

其计算过程可以表示为：

$$\text{MemAttn}(Q, K_{\text{mem}}, V_{\text{mem}}) = \text{Softmax}\left(\frac{Q \cdot K_{\text{mem}}^T}{\sqrt{d}}\right) V_{\text{mem}}$$

其中 \(Q\) 来自当前帧的图像特征，\(K_{\text{mem}}\) 和 \(V_{\text{mem}}\) 来自 Memory Bank 中存储的历史帧空间特征和对象指针。

经过 Memory Attention 处理后的特征被称为 **conditioned features**，它们融合了当前帧的视觉信息和历史帧的时序上下文。

**3. Prompt Encoder & Mask Decoder（提示编码器与掩码解码器）**

基本沿用 SAM 的设计：
- **Prompt Encoder**：将点击（正/负）、边界框、掩码等提示编码为 token
- **Mask Decoder**：轻量级 Transformer 解码器，融合 conditioned features 和 prompt tokens，输出分割掩码

**关键改进 — 遮挡预测头（Occlusion Head）**：

$$\text{occ\_score} = \sigma(W_{\text{occ}} \cdot h_{\text{IoU}} + b_{\text{occ}})$$

在视频场景中，目标物体可能被遮挡或离开画面。SAM 2 在 IoU 预测头旁新增了一个 occlusion prediction head，输出当前帧目标是否被遮挡的概率。当遮挡分数较高时：
- 该帧的预测掩码**不会被添加到 Memory Bank**，避免低质量记忆污染后续预测
- 输出的掩码可能为空（表示目标不可见）

**4. Memory Encoder（记忆编码器）**

Memory Encoder 将当前帧的预测结果编码为记忆表示，供后续帧使用：

$$\text{Memory}_t = \text{Conv}(\text{ImageFeature}_t) + \text{Conv}(\text{Mask}_t)$$

具体来说，它将 Image Encoder 输出的**未经条件化的特征图**（不含提示信息）与当前帧预测掩码通过轻量级卷积层融合，生成空间维度的记忆特征。

**5. Memory Bank（记忆库）**

Memory Bank 是 SAM 2 的"时序记忆系统"，存储三类信息：

| 记忆类型 | 数量 | 来源 | 说明 |
|---------|------|------|------|
| Recent Memories | N=6 | 最近 N 帧的预测 | FIFO 队列，保持时序局部性 |
| Prompted Memories | M（1-2） | 用户交互帧 | 高质量锚点，长期保留 |
| Object Pointers | 每帧 1 个 | Mask Decoder 输出 token | 高维语义向量，编码目标外观 |

> ⚠️ 注意：Object Pointers 是从 Mask Decoder 的输出 token 中提取的高维向量（类似 SAM 中的 IoU token），它们编码了目标在每帧中的高层语义信息，作为 Memory Attention 中交叉注意力的额外 key-value 对参与计算。

##### 训练策略

SAM 2 的训练采用**模拟交互式提示**的策略：

```python
# SAM 2 训练伪代码
for video_clip in training_data:  # 采样 8 帧的视频片段
    # 随机选择 1-2 帧作为"交互帧"
    prompted_frames = random_select(video_clip, k=2)
    
    for frame_t in video_clip:
        # 1. Image Encoder 提取特征
        features_t = image_encoder(frame_t)
        
        # 2. Memory Attention 融合历史记忆
        cond_features_t = memory_attention(features_t, memory_bank)
        
        if frame_t in prompted_frames:
            # 3a. 交互帧：模拟用户点击（基于GT与预测的误差区域采样）
            prompt = simulate_click(gt_mask, pred_mask)
            mask_t = mask_decoder(cond_features_t, prompt)
        else:
            # 3b. 非交互帧：无提示，纯传播
            mask_t = mask_decoder(cond_features_t, no_prompt)
        
        # 4. 计算损失（Focal + Dice Loss）
        loss += focal_loss(mask_t, gt_t) + dice_loss(mask_t, gt_t)
        
        # 5. 更新 Memory Bank
        if not is_occluded(mask_t):
            memory_bank.update(memory_encoder(features_t, mask_t))
```

训练时在 8 帧序列上展开，最多模拟 2 次交互式校正（iterative refinement），使用 Focal Loss + Dice Loss 监督。

##### 数据引擎与 SA-V 数据集

SAM 2 的数据引擎采用**模型-标注员协同的三阶段迭代**策略，逐步提升标注效率：

| 阶段 | 工具 | 每帧耗时 | 加速比 | 说明 |
|------|------|---------|--------|------|
| Phase 1 | SAM（逐帧） | 37.8s | 1× | 使用 SAM 在每帧上独立标注，无时序传播 |
| Phase 2 | SAM + SAM 2 Mask | 7.4s | 5.1× | SAM 2 提供初始掩码传播，标注员用 SAM 精修 |
| Phase 3 | SAM 2 完整版 | 4.5s | 8.4× | SAM 2 主导分割，标注员仅需少量点击校正 |

每个阶段结束后，收集的数据用于重新训练 SAM 2 模型，形成数据飞轮效应。此外，还通过**自动 masklet 生成**进一步扩充数据：对未标注的视频帧运行 SAM 生成掩码提议，再用 SAM 2 传播到全视频，经过质量过滤后加入训练集。

最终构建的 **SA-V 数据集**：
- **50.9K 视频**，平均 14 秒，来自 47 个国家
- **642.6K masklets**（视频级对象轨迹）
- **35.5M 掩码**（帧级），是现有最大 VOS 数据集的 53 倍
- 涵盖整体对象和部件级标注，场景多样性远超 DAVIS/YouTube-VOS 等传统数据集

##### 与 SAM 的关键区别

| 特性 | SAM | SAM 2 |
|------|-----|-------|
| 输入 | 单张图像 | 图像或视频（流式处理） |
| 编码器 | ViT-H（MAE） | Hiera（MAE，层次化） |
| 时序建模 | 无 | Memory Attention + Memory Bank |
| 遮挡处理 | 无 | Occlusion Head 抑制低质量记忆 |
| 推理速度 | 1× | ~6× 更快（图像任务） |
| 训练数据 | SA-1B（11M 图像） | SA-1B + SA-V（50.9K 视频）+ VOS 数据集 |

##### 实验结果亮点

**视频分割（交互式）**：在 9 个零样本视频数据集上，SAM 2 仅需 **3 次点击**即可达到 SAM+XMem++/Cutie 组合 **9 次点击**的效果，交互效率提升 3 倍。

**VOS 基准（首帧掩码）**：

| 方法 | MOSE \(\mathcal{J\&F}\) | DAVIS \(\mathcal{J\&F}\) | SA-V val \(\mathcal{J\&F}\) | SA-V test \(\mathcal{J\&F}\) |
|------|------|-------|---------|----------|
| Cutie-base+ | 71.7 | 88.1 | 61.3 | 62.8 |
| SAM 2 (Hiera-B+) | 75.8 | 90.9 | 73.6 | 74.1 |
| **SAM 2 (Hiera-L)** | **77.2** | **91.6** | **75.6** | **77.6** |

**图像分割**：在 SA-23 基准上，SAM 2 (Hiera-L) 1-click mIoU 达到 **61.4**，优于 SAM (ViT-H) 的 58.1，同时推理速度快 **6 倍**。

**数据消融**：
- 仅用 VOS 数据训练时，零样本性能仅 59.7 \(\mathcal{J\&F}\)
- 加入 SA-V 数据引擎数据后，零样本性能提升 **+12.1%** 至 71.8
- 混合所有数据（VOS + SA-1B + SA-V）获得最佳综合性能

#### 🧪 练习题
```yaml
question: "SAM 2 的 Memory Bank 中不包含以下哪种类型的记忆？"
options:
  - "最近 N 帧的空间记忆特征（Recent Memories）"
  - "用户交互帧的记忆特征（Prompted Memories）"
  - "从 Mask Decoder 输出 token 提取的对象指针（Object Pointers）"
  - "Image Encoder 的原始多尺度特征图（Raw Feature Maps）"
answer: 3
explain: "Memory Bank 存储三类信息：Recent Memories（最近 N 帧经 Memory Encoder 编码的特征）、Prompted Memories（用户交互帧的编码特征）和 Object Pointers（Mask Decoder 输出的高维语义向量）。Image Encoder 的原始特征图不直接存入 Memory Bank，而是经过 Memory Encoder 处理后才写入。"
```

### Vision Mamba

```yaml
id: vision_mamba
num: 15
name: Vision Mamba
full_name: 视觉状态空间模型 (Vision Mamba)
year: '2026.01'
org: 多机构
parent: swin
paper_url: https://arxiv.org/abs/2601.xxxxx
project_url: ''
category: foundation
motivation: SSM架构线性复杂度
```

#### 📝 一句话总结
Vision Mamba（Vim）将 Mamba 的选择性状态空间模型（SSM）引入计算机视觉，提出双向 SSM 编码器处理图像 patch 序列，在保持与 ViT 相当性能的同时实现了序列长度的线性计算复杂度，显著降低了高分辨率图像处理的计算和显存开销。

#### 🎯 核心要点
- 首个纯 SSM 架构的通用视觉骨干网络，不使用任何注意力机制
- 双向状态空间模型（Bidirectional SSM）：对 patch 序列同时进行前向和后向扫描，弥补单向 SSM 缺乏全局上下文的不足
- 类 ViT 的 patch 嵌入方式：图像分块 → 线性投影 + 位置编码 + CLS token
- 数据依赖的 SSM 参数：\(\mathbf{B}\)、\(\mathbf{C}\)、\(\boldsymbol{\Delta}\) 均由输入动态生成（继承 Mamba 的选择性机制）
- 线性复杂度 \(O(M)\)：相比 ViT 的 \(O(M^2)\) 自注意力，序列长度增长时计算量线性增长
- 两种模型规格：Vim-Ti（Tiny）和 Vim-S（Small），分别对标 DeiT-Ti 和 DeiT-S
- 在 ImageNet 分类、COCO 检测/分割、ADE20K 语义分割等任务上验证有效性

#### 🔬 深入细节
![Vision Mamba 整体架构图](https://arxiv.org/html/2401.09417v1/x2.png)
*图：Vision Mamba（Vim）模型总览。输入图像被分割为 patch 并投影为 token 序列，经过 L 层 Vim 编码器处理后，通过 CLS token 输出分类结果。Vim 编码器的核心是双向 SSM 处理（前向 + 后向）。*

##### 算法伪代码

```python
# Vision Mamba Block (Algorithm 1)
def vim_block(T_prev, norm, linear_x, linear_z, linear_T,
              conv1d_fwd, conv1d_bwd, ssm_params_fwd, ssm_params_bwd):
    # Step 1: 归一化
    T_norm = norm(T_prev)                        # (B, M, D)

    # Step 2: 双分支线性投影
    x = linear_x(T_norm)                         # (B, M, E)
    z = linear_z(T_norm)                         # (B, M, E)

    y_list = []
    for direction in ['forward', 'backward']:
        conv1d = conv1d_fwd if direction == 'forward' else conv1d_bwd
        params = ssm_params_fwd if direction == 'forward' else ssm_params_bwd

        # Step 3: 1D 卷积 + SiLU 激活
        x_prime = silu(conv1d(x))                # (B, M, E)

        # Step 4: 数据依赖的 SSM 参数
        B = linear_B(x_prime)                    # (B, M, N)
        C = linear_C(x_prime)                    # (B, M, N)
        Delta = softplus(linear_delta(x_prime) + param_delta)  # (B, M, E)

        # Step 5: 离散化
        A_bar = Delta ⊗ param_A                  # (B, M, E, N)
        B_bar = Delta ⊗ B                        # (B, M, E, N)

        # Step 6: SSM 递推
        y = SSM(A_bar, B_bar, C)(x_prime)        # (B, M, E)
        y_list.append(y)

    # Step 7: 门控融合 + 残差连接
    y_fwd_gated = y_list[0] * silu(z)            # (B, M, E)
    y_bwd_gated = y_list[1] * silu(z)            # (B, M, E)
    T_out = linear_T(y_fwd_gated + y_bwd_gated) + T_prev  # (B, M, D)
    return T_out
```

##### 动机与背景

Vision Transformer（ViT）凭借自注意力机制在视觉任务中取得了巨大成功，但其核心瓶颈在于自注意力的 **二次复杂度**——对于长度为 \(M\) 的序列，计算和显存开销为 \(O(M^2)\)。当处理高分辨率图像（如 1248×1248 像素）时，patch 序列长度可达数千甚至上万，导致 ViT 的计算成本急剧膨胀。

与此同时，状态空间模型（SSM）在 NLP 领域展现了处理长序列的强大能力。特别是 **Mamba** 通过引入数据依赖的选择性机制，在语言建模任务上达到了与 Transformer 相当的性能，同时保持了序列长度的线性复杂度。然而，Mamba 是为 1D 序列设计的，直接应用于 2D 图像面临两个关键挑战：

1. **空间感知不足**：图像具有 2D 空间结构，而标准 Mamba 仅处理 1D 序列
2. **单向建模局限**：标准 Mamba 采用因果（单向）扫描，无法同时捕获前后文信息

##### 核心机制：双向状态空间模型

**SSM 基础公式**

Vision Mamba 建立在连续状态空间模型之上。连续系统将输入信号 \(x(t) \in \mathbb{R}\) 通过隐状态 \(h(t) \in \mathbb{R}^N\) 映射到输出 \(y(t) \in \mathbb{R}\)：

$$h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t)$$
$$y(t) = \mathbf{C}h(t)$$

其中 \(\mathbf{A} \in \mathbb{R}^{N \times N}\) 是状态转移矩阵，\(\mathbf{B} \in \mathbb{R}^{N \times 1}\)、\(\mathbf{C} \in \mathbb{R}^{1 \times N}\) 是投影参数。

通过零阶保持（ZOH）离散化，引入时间步长 \(\boldsymbol{\Delta}\)：

$$\overline{\mathbf{A}} = \exp(\boldsymbol{\Delta} \mathbf{A})$$
$$\overline{\mathbf{B}} = (\boldsymbol{\Delta} \mathbf{A})^{-1}(\exp(\boldsymbol{\Delta} \mathbf{A}) - \mathbf{I}) \cdot \boldsymbol{\Delta} \mathbf{B}$$

离散递推形式为：

$$h_t = \overline{\mathbf{A}} h_{t-1} + \overline{\mathbf{B}} x_t, \quad y_t = \mathbf{C} h_t$$

> 💡 **关键直觉**：SSM 的递推形式类似 RNN，每一步只需 \(O(1)\) 计算（给定隐状态维度），因此处理长度为 \(M\) 的序列总复杂度为 \(O(M)\)，而非注意力的 \(O(M^2)\)。

**图像 Patch 化与嵌入**

与 ViT 类似，Vim 首先将输入图像 \(\mathbf{t} \in \mathbb{R}^{H \times W \times C}\) 分割为 \(J\) 个大小为 \(P \times P\) 的 patch，然后通过线性投影和位置编码生成 token 序列：

$$\mathbf{T}_0 = [\mathbf{t}_{cls}; \mathbf{t}_p^1 \mathbf{W}; \mathbf{t}_p^2 \mathbf{W}; \cdots; \mathbf{t}_p^J \mathbf{W}] + \mathbf{E}_{pos}$$

其中 \(\mathbf{W} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 是可学习的投影矩阵，\(\mathbf{E}_{pos} \in \mathbb{R}^{(J+1) \times D}\) 是位置编码，\(\mathbf{t}_{cls}\) 是可学习的分类 token。

**双向 Vim Block**

Vim Block 是整个架构的核心创新。与标准 Mamba 的单向扫描不同，Vim Block 对 token 序列同时进行 **前向扫描** 和 **后向扫描**，确保每个 token 都能感知到序列中所有其他 token 的信息：

1. **归一化与投影**：输入 \(\mathbf{T}_{l-1}\) 经过 LayerNorm 后，分别投影为主分支 \(\mathbf{x}\) 和门控分支 \(\mathbf{z}\)
2. **双向 SSM 处理**：对 \(\mathbf{x}\) 分别进行前向和后向的 Conv1d → SiLU → SSM 处理，每个方向有独立的参数
3. **数据依赖参数**：\(\mathbf{B}_o\)、\(\mathbf{C}_o\)、\(\boldsymbol{\Delta}_o\) 均从输入 \(\mathbf{x}'_o\) 动态生成，使模型能根据输入内容选择性地关注或忽略信息
4. **门控融合**：前向和后向的输出分别与 \(\text{SiLU}(\mathbf{z})\) 逐元素相乘（门控），然后相加
5. **残差连接**：最终通过线性投影映射回 \(D\) 维并加上残差

$$\mathbf{T}_l = \text{Linear}^{\mathbf{T}}(\mathbf{y}'_{forward} + \mathbf{y}'_{backward}) + \mathbf{T}_{l-1}$$

> ⚠️ **注意**：双向扫描是 Vim 区别于原始 Mamba 的核心设计。单向 SSM 在处理图像时，后面的 patch 无法感知前面的信息（或反之），而图像的空间关系是非因果的，双向扫描正好弥补了这一缺陷。

##### 架构配置与效率分析

Vim 的超参数包括：
- \(\mathtt{L}\)：Vim Block 的层数
- \(\mathtt{D}\)：隐藏状态维度
- \(\mathtt{E}\)：扩展状态维度（通常 \(E = 2D\)）
- \(\mathtt{N}\)：SSM 维度

| 模型 | 层数 L | 隐藏维度 D | 参数量 | ImageNet Top-1 |
|------|--------|-----------|--------|----------------|
| Vim-Ti | 24 | 192 | 7M | 76.1% |
| Vim-S | 24 | 384 | 26M | 80.5% |

**效率优势**：
- **计算复杂度**：Vim 的 SSM 递推为 \(O(M)\)，而 ViT 自注意力为 \(O(M^2)\)。当图像分辨率从 224 增加到 1248 时，Vim 的计算量仅线性增长，而 DeiT 的计算量增长了约 8.5 倍
- **显存效率**：Vim 在推理时显存占用远低于 DeiT，尤其在高分辨率场景下优势更加明显（1248×1248 时节省约 86.8% GPU 显存）
- **推理速度**：在 batch size=1 的 1248×1248 图像推理中，Vim-Ti 比 DeiT-Ti 快 2.8 倍

##### 与传统方法的区别

| 特性 | ViT / DeiT | Swin Transformer | Vision Mamba (Vim) |
|------|-----------|-------------------|-------------------|
| 核心机制 | 全局自注意力 | 窗口注意力 + 移位 | 双向状态空间模型 |
| 序列复杂度 | \(O(M^2)\) | \(O(M)\)（窗口内） | \(O(M)\) |
| 全局感受野 | ✅ 每层全局 | ❌ 需跨窗口交互 | ✅ 通过 SSM 递推 |
| 位置编码 | 绝对/相对 | 相对位置偏置 | 绝对位置编码 |
| 高分辨率扩展 | 显存爆炸 | 线性扩展 | 线性扩展 |
| 建模方式 | 无序集合 | 局部窗口 | 序列递推（双向） |

> 💡 **核心优势总结**：Vim 同时具备了 ViT 的全局感受野和 Swin 的线性复杂度，是首个纯 SSM 架构的通用视觉骨干，为视觉模型提供了注意力机制之外的新范式。

#### 🧪 练习题
```yaml
question: "Vision Mamba 引入双向 SSM 的主要目的是什么？"
options:
  - "加速模型训练收敛"
  - "弥补单向 SSM 无法同时捕获前后文信息的缺陷，适应图像的非因果空间关系"
  - "减少模型参数量"
  - "替代位置编码以增强空间感知能力"
answer: 1
explain: "图像 patch 之间的空间关系是非因果的，单向 SSM 只能从一个方向扫描，后方 patch 无法感知前方信息。双向扫描使每个 token 都能聚合来自两个方向的全局上下文。"
```

### LookWhere

```yaml
id: lookwhere
num: 16
name: LookWhere
full_name: 自适应视觉识别 (LookWhere)
year: '2026.01'
org: Meta AI
parent: dinov2
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/7dd74dcef03c8f88a58d18a9d49d7a10-Abstract-Conference.html
project_url: ''
category: representation
motivation: 自适应计算动态分配
```

#### 📝 一句话总结
LookWhere 提出了 selector-extractor 双模块架构，通过自监督 what-where 蒸馏从 DINOv2 教师模型中学习"在哪里计算"和"看到什么"，实现了任务通用的自适应计算——在高分辨率交通标志识别中以 34× FLOPs 削减和 6× 推理加速达到接近 SOTA 精度，在 ImageNet 上以 1.36× 加速同时提升精度。

#### 🎯 核心要点
- **Selector-Extractor 双模块架构**：selector 处理低分辨率输入预测 2D 重要性图（where），extractor 仅处理被选中的高分辨率 patch（what）
- **What-Where 蒸馏**：三个损失函数联合训练——\(L_{\text{cls}}\)（CLS token MSE）、\(L_{\text{pat}}\)（patch token MSE）、\(L_{\text{map}}\)（attention map KL 散度）
- **任务通用预训练 + 仅 extractor 微调**：selector 预训练后冻结，仅微调 extractor 即可迁移到下游任务
- **纯标准 Transformer 操作**：不依赖聚类算法或自定义 CUDA kernel，在现有 GPU 上高效加速
- **高分辨率空间稀疏场景优势显著**：Traffic Signs（34× FLOPs↓, 6× 速度↑）、CUB 鸟类细粒度识别、Billiard Balls 空间推理
- **标准基准同样有效**：ImageNet-1K 分类（ViT-S 9.5K im/s, 80.3% Top-1）、ADE20K 分割（≥2× 速度优于 DTEM）

#### 🔬 深入细节
![LookWhere 架构总览](https://arxiv.org/abs/2505.18051)
*图：LookWhere 的 selector-extractor 架构示意。Selector 在低分辨率输入上预测 patch 重要性图，选出 top-k 个 patch 位置；Extractor 仅在这些高分辨率 patch 上进行全深度 Transformer 计算，同时融合低分辨率全局上下文 token。（详见论文 Figure 2）*

##### 算法伪代码

```python
# LookWhere 推理流程
def lookwhere_forward(image, selector, extractor, k):
    # Step 1: Selector 在低分辨率上预测重要性图
    x_low = patchify(image, resolution=R_low)          # N_low × N_low patches
    features_low = selector.forward_layers(x_low, L_low)  # 前 L_low 层
    importance_map = selector.predict_map(features_low)    # N_high × N_high 的 2D map
    
    # Step 2: 选择 top-k 个高分辨率 patch
    top_k_indices = topk(importance_map.flatten(), k)
    x_high_selected = patchify(image, resolution=R_high)[top_k_indices]  # k 个 patch
    
    # Step 3: Extractor 处理选中 patch + 低分辨率全局 token
    global_tokens = features_low  # 来自 selector 的低分辨率 token
    output = extractor([cls_token, global_tokens, x_high_selected])  # 全深度 ViT
    
    return output.cls_token  # 用于下游任务
```

##### 动机与背景

Vision Transformer (ViT) 的计算量随 token 数量二次增长，在高分辨率输入（如 1000×1000 px 的交通标志图像）下变得极其昂贵。现有自适应计算方法分为两类，各有缺陷：

1. **Token Reduction（逐层削减）**：PiToMe、DTEM、ATC 等方法在每一层逐步合并或丢弃 token。问题在于第一层仍需处理所有 token，在高分辨率下依然昂贵。且它们依赖聚类算法（如二部匹配），虽然 FLOPs 低但在 GPU 上实际速度慢。

2. **Token Selection（输入选择）**：DPS、IPS 等方法选择输入 patch 子集。问题在于需要复杂的离散优化（REINFORCE 梯度估计、多阶段训练），且每个任务都需要重新训练 selector。

> 💡 关键洞察：LookWhere 的核心思想是将"在哪里计算"和"计算什么"解耦为两个独立模块，并通过自监督蒸馏实现任务通用的预训练，从而避免了逐任务优化 selector 的高昂代价。

##### 核心机制：Selector-Extractor 架构

**Selector（低分辨率定位器）**：

Selector 是 DINOv2 ViT 的前 \(L_{\text{low}}\) 层（默认 \(L_{\text{low}}=3\)），输入分辨率为 \(R_{\text{low}}=154\) px。它输出 \(N_{\text{low}} \times N_{\text{low}}\) 个 token 特征，然后通过一个轻量级线性层将每个低分辨率 token 映射到对应的高分辨率区域，生成 \(N_{\text{high}} \times N_{\text{high}}\) 的重要性图。选取 top-k 个位置作为高分辨率 patch 的采样点。

> ⚠️ 注意：Selector 在微调阶段完全冻结，不针对特定任务更新。这使得同一个 selector 可以泛化到交通标志识别、鸟类分类、语义分割等不同任务。

**Extractor（稀疏高分辨率计算器）**：

Extractor 是完整深度的 ViT（如 ViT-B 的全部 12 层），但输入仅包含：
- 1 个 CLS token
- \(N_{\text{low}}^2\) 个来自 selector 的低分辨率全局 token（提供全局上下文）
- \(k\) 个被选中的高分辨率 patch token

总 token 数为 \(1 + N_{\text{low}}^2 + k\)，远小于完整高分辨率的 \(N_{\text{high}}^2\) 个 token。例如在 Traffic Signs 实验中，\(k=128\) 而 \(N_{\text{high}}^2=4,900\)，仅处理约 2.6% 的高分辨率 token。

##### 训练流程：What-Where 蒸馏

预训练阶段使用 DINOv2 作为教师模型，通过三个损失函数联合优化 selector 和 extractor：

**1. CLS Token 蒸馏（What — 全局表征）**：

$$L_{\text{cls}} = \text{MSE}(\hat{z}_{\text{cls}}, z_{\text{cls}})$$

其中 \(\hat{z}_{\text{cls}}\) 是 extractor 的 CLS token 输出，\(z_{\text{cls}}\) 是教师模型处理完整高分辨率输入后的 CLS token。这确保稀疏计算的全局表征逼近完整计算。

**2. Patch Token 蒸馏（What — 局部表征）**：

$$L_{\text{pat}} = \text{MSE}(\hat{z}_{\text{pat}}, z_{\text{pat}})$$

仅在被选中的 \(k\) 个 patch 位置上计算 MSE，确保局部特征也准确。这对语义分割等需要像素级预测的任务至关重要。

**3. Attention Map 蒸馏（Where — 选择策略）**：

$$L_{\text{map}} = \text{KL}(\hat{A}_{\text{high}}, A_{\text{high}})$$

其中 \(A_{\text{high}}\) 是教师模型最后一层自注意力图的平均（跨所有 head），表示教师"关注哪里"。\(\hat{A}_{\text{high}}\) 是 selector 预测的重要性图。通过 KL 散度训练 selector 模仿教师的注意力分布。

总损失为：

$$L = \lambda_{\text{cls}} L_{\text{cls}} + \lambda_{\text{pat}} L_{\text{pat}} + \lambda_{\text{map}} L_{\text{map}}$$

其中 \(\lambda_{\text{cls}} = \lambda_{\text{pat}} = 1\)，\(\lambda_{\text{map}} = 0.1\)。

> 💡 关键设计：预训练时 \(k\) 在 \([16, 128]\) 范围内随机采样（总 token 数 \(N_{\text{high}}^2 = 1369\)），使模型学会在不同稀疏度下都能有效工作。

**微调阶段**：仅更新 extractor 参数和任务头，selector 完全冻结。这极大简化了下游适配流程。

##### 与现有方法的关键区别

| 特性 | Token Reduction (PiToMe/DTEM) | Token Selection (DPS/IPS) | **LookWhere** |
|------|------|------|------|
| 第一层是否处理所有 token | ✅ 是 | ❌ 否 | ❌ 否 |
| 是否需要逐任务训练 selector | — | ✅ 是 | ❌ 否（冻结） |
| 是否依赖非标准 GPU 操作 | ✅ 聚类算法 | ✅ REINFORCE | ❌ 纯 ViT 操作 |
| 预训练方式 | 无 | 无 | 自监督蒸馏 |
| 高分辨率训练内存 | 高 | 中 | **低（>5× 削减）** |

##### 实验亮点

**ImageNet-1K 分类**（224² px，ViT-B）：LookWhere（k=128）达到 83.0% Top-1，3.2K im/s，14.8G FLOPs，优于所有自适应计算方法。ViT-S 版本达到 9.5K im/s，是第二快方法 DTEM 的 1.36×。

**ADE20K 语义分割**：在三个计算级别上均优于 DTEM，且速度 ≥2× 更快（如 k=512 时 mIoU 40.6% vs DTEM 38.9%，速度 2.0K vs 0.7K im/s）。

**Traffic Signs**（994² px）：仅处理 10% 高分辨率 token，LookWhere 以 34× FLOPs 削减和 6× 推理加速接近 IPS 的精度（差 1.1%），同时训练成本仅为 IPS 的 1/13。

**消融实验关键发现**：
- 三个蒸馏损失缺一不可：去掉 \(L_{\text{map}}\) 后 selector 无法有效定位；去掉 \(L_{\text{pat}}\) 后分割性能显著下降
- 低分辨率全局 token 的共享对 extractor 性能至关重要，提供了被丢弃 patch 的上下文信息
- Selector 深度 \(L_{\text{low}}=3\) 和分辨率 \(R_{\text{low}}=154\) 在效率与精度间取得最佳平衡

#### 🧪 练习题
```yaml
question: "LookWhere 在微调阶段如何处理 selector？"
options:
  - "与 extractor 联合微调以适应特定任务"
  - "使用 REINFORCE 梯度估计更新 selector 的离散选择策略"
  - "完全冻结 selector，仅微调 extractor 和任务头"
  - "丢弃 selector，改用教师模型的注意力图直接选择 patch"
answer: 2
explain: "LookWhere 的核心设计之一是 selector 在预训练后完全冻结，下游任务仅微调 extractor。这使得同一个 selector 可以零成本迁移到不同任务，大幅简化部署流程。"
```

### X-SAM

```yaml
id: xsam
num: 17
name: X-SAM
full_name: 任意分割模型 (X-SAM)
year: '2026.02'
org: 多机构
parent: sam2
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39822
project_url: ''
category: segmentation
motivation: 任意分割交互式全实例
```

#### 📝 一句话总结
X-SAM 的核心目标是：任意分割交互式全实例。

#### 🎯 核心要点
- 核心动机：任意分割交互式全实例
- 演化来源：继承或改进自 sam2
- 代表机构：多机构

#### 🔬 深入细节
任意分割交互式全实例


### UniPixel

```yaml
id: unipixel
num: 18
name: UniPixel
full_name: 统一像素级推理 (UniPixel)
year: '2026.01'
org: 多机构
parent: florence2
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b783c44ba9adbc30344473dc633b4869-Abstract-Conference.html
project_url: ''
category: multimodal
motivation: 像素推理融合MLLM
```

#### 📝 一句话总结
UniPixel 的核心目标是：像素推理融合MLLM。

#### 🎯 核心要点
- 核心动机：像素推理融合MLLM
- 演化来源：继承或改进自 florence2
- 代表机构：多机构

#### 🔬 深入细节
像素推理融合MLLM


### RynnBrain

```yaml
id: rynnbrain
num: 19
name: RynnBrain
full_name: 开源具身基础模型 (RynnBrain)
year: '2026.02'
org: 多机构
parent: dinov2
paper_url: https://arxiv.org/abs/2602.14979
project_url: ''
category: multimodal
motivation: 开源具身感知基础模型
```

#### 📝 一句话总结
RynnBrain 的核心目标是：开源具身感知基础模型。

#### 🎯 核心要点
- 核心动机：开源具身感知基础模型
- 演化来源：继承或改进自 dinov2
- 代表机构：多机构

#### 🔬 深入细节
开源具身感知基础模型


### VideoLoom

```yaml
id: videoloom
num: 20
name: VideoLoom
full_name: 视频大语言模型 (VideoLoom)
year: '2026.01'
org: 多机构
parent: sam2
paper_url: https://arxiv.org/abs/2601.07290
project_url: ''
category: multimodal
motivation: 长视频时空联合理解
```

#### 📝 一句话总结
VideoLoom 提出了一种基于 SlowFast 视觉 token 和 MLLM-SAM2 协同架构的统一视频时空理解框架，首次在单一模型中同时实现视频时间定位（temporal grounding）和空间分割（spatial segmentation），并构建了专用数据集 LoomData 和评测基准 LoomBench 来推动联合时空理解研究。

#### 🎯 核心要点
- **统一时空架构**：将 InternVL3（MLLM）与 SAM2（分割基础模型）结合，通过特殊 `[SEG]` token 桥接语言理解和像素级分割
- **SlowFast 视觉 token 设计**：Slow tokens（5帧×256 tokens）保留高分辨率空间细节用于分割，Fast tokens（128帧×16 tokens）压缩时序信息用于时间定位
- **LoomData-8.7K 数据集**：基于 ActivityNet 构建的联合时空标注数据，包含时间边界 + 空间 mask 的配对标注，通过 4 阶段自动化流水线生成
- **LoomBench 评测基准**：包含 When（时间定位）、Where（空间分割）、Combined（联合时空）三类问答，评估模型的联合时空理解能力
- **训练策略**：LoRA 微调 LLM + 全量训练 mask decoder，冻结视觉编码器和 SAM2 image encoder
- **SOTA 性能**：ReVOS 上 63.1 J&F，Charades-STA 上 48.3 R1@0.7，同时在通用视频理解基准上保持竞争力

#### 🔬 深入细节
![VideoLoom 整体架构图](https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x2.png)
*图：VideoLoom 架构总览。左侧为 SlowFast 视觉 token 编码，右侧为 MLLM 与 SAM2 的协同推理流程。*

##### 算法伪代码

```python
# VideoLoom 推理流程伪代码
def videoloom_forward(video, text_query):
    # Step 1: SlowFast Visual Token Encoding
    frames = sample_frames(video, n_fast=128, n_slow=5)
    
    # Fast tokens: 全局时序理解 (128帧, 每帧16 tokens)
    fast_tokens = vision_encoder(frames[:128])  # [128, 256, D]
    fast_tokens = pixel_shuffle_downsample(fast_tokens)  # [128, 16, D]
    
    # Slow tokens: 高分辨率空间细节 (5帧, 每帧256 tokens)
    slow_tokens = vision_encoder(frames[:5])  # [5, 256, D]
    
    # Step 2: MLLM Reasoning
    input_tokens = concat([fast_tokens, slow_tokens, tokenize(text_query)])
    output = mllm(input_tokens)  # InternVL3-8B with LoRA
    
    # Step 3: Parse output
    if task == "temporal_grounding":
        timestamps = extract_timestamps(output)  # <ts>start</ts><ts>end</ts>
        return timestamps
    elif task == "spatial_segmentation":
        seg_token = extract_seg_token(output)  # [SEG] hidden state
        # Step 4: SAM2 Mask Decoding
        seg_embedding = mlp_projection(seg_token)  # project to SAM2 space
        masks = sam2_mask_decoder(
            image_embeddings=sam2_encoder(frames),
            prompt_embedding=seg_embedding
        )
        masks = propagate_masks(masks, video)  # SAM2 memory-based propagation
        return masks
    elif task == "combined":
        timestamps = extract_timestamps(output)
        seg_token = extract_seg_token(output)
        masks = sam2_decode_and_propagate(seg_token, frames[timestamps])
        return timestamps, masks
```

##### 动机与背景

现有视频理解方法通常将**时间理解**（如视频时间定位 VTG、视频高光检测 VHD）和**空间理解**（如指代视频目标分割 RVOS）作为独立任务处理。然而，人类对视频的理解天然是时空交织的——例如"当运动员起跳时，他的位置在哪里？"需要同时定位时间段和空间区域。

传统方法的缺陷：
1. **分离式架构**：时间定位模型无法输出像素级分割，分割模型无法理解长视频时序
2. **token 效率矛盾**：高分辨率 token 适合分割但帧数受限；低分辨率 token 适合长视频但丢失空间细节
3. **缺乏联合标注数据**：现有数据集要么只有时间标注，要么只有空间标注

##### 核心机制：SlowFast 视觉 Token

SlowFast 设计灵感来自 SlowFast Networks，但应用于 token 层面：

$$\text{Visual Input} = \underbrace{[\mathbf{F}_1^{fast}, ..., \mathbf{F}_{128}^{fast}]}_{\text{128帧} \times \text{16 tokens}} \oplus \underbrace{[\mathbf{S}_1^{slow}, ..., \mathbf{S}_5^{slow}]}_{\text{5帧} \times \text{256 tokens}}$$

- **Fast pathway**：对 128 帧视频进行 pixel shuffle 下采样（将 \(16 \times 16\) 的 token grid 压缩为 \(4 \times 4 = 16\) tokens），总共 \(128 \times 16 = 2048\) tokens，捕获长程时序动态
- **Slow pathway**：均匀采样 5 帧保持原始 \(16 \times 16 = 256\) tokens 分辨率，总共 \(5 \times 256 = 1280\) tokens，保留精细空间信息用于分割

> 💡 关键：SlowFast 设计使得单一模型同时拥有"看得远"（128帧时序覆盖）和"看得清"（高分辨率空间细节）的能力，总 token 数仅 3328，计算可控。

##### MLLM-SAM2 协同机制

VideoLoom 通过特殊的 `[SEG]` token 实现语言推理到像素级分割的桥接：

1. **MLLM 推理阶段**：模型在文本输出中生成 `[SEG]` token，其隐藏状态编码了目标对象的语义信息
2. **投影层**：通过 MLP 将 `[SEG]` token 的隐藏状态投影到 SAM2 的 prompt embedding 空间
3. **SAM2 解码**：将投影后的 embedding 作为 prompt 输入 SAM2 的 mask decoder，生成参考帧上的分割 mask
4. **时序传播**：利用 SAM2 的 memory-based propagation 机制将 mask 传播到整个视频

损失函数设计：

$$\mathcal{L} = \mathcal{L}_{CE}(\text{text output}) + \lambda_1 \mathcal{L}_{BCE}(\text{mask}) + \lambda_2 \mathcal{L}_{Dice}(\text{mask})$$

其中 \(\lambda_1 = 2.0\)，\(\lambda_2 = 0.5\)。BCE loss 处理像素级分类，Dice loss 处理前景/背景不平衡问题。

##### LoomData 构建流程

![LoomData 标注流水线](https://ar5iv.labs.arxiv.org/html/2601.07290/assets/x1.png)
*图：LoomData 4 阶段自动化标注流水线*

1. **Shot Partition**：利用 PySceneDetect 将视频切分为镜头片段
2. **Temporal Annotation**：基于 ActivityNet 已有时间标注，对齐到镜头边界
3. **Spatial Annotation**：使用 Grounding DINO + SAM2 生成空间 mask，并通过 GPT-4o 验证质量
4. **QA Generation**：生成 When/Where/Combined 三类问答对

##### 与传统方法的对比

| 维度 | 传统时间定位模型 | 传统分割模型 | VideoLoom |
|------|-----------------|-------------|-----------|
| 时间理解 | ✅ | ❌ | ✅ |
| 空间分割 | ❌ | ✅ | ✅ |
| 联合时空 | ❌ | ❌ | ✅ |
| 长视频支持 | 有限 | 有限 | 128帧 |
| 统一架构 | — | — | 单一模型端到端 |

##### 关键实验结果

- **时间定位**：Charades-STA 上 R1@0.5=68.3, R1@0.7=48.3；ActivityNet-Captions 上 R1@0.5=56.2
- **空间分割**：MeVIS 上 J&F=57.2，ReVOS 上 J&F=63.1（SOTA）
- **联合理解**：LoomBench 上 tIoU=41.6，J&F_bi-fore=49.1
- **消融实验**：SlowFast 联合训练比单独 Slow/Fast 分别提升 +4.8 mIoU（时间）和 +3.2 J&F（空间）；LoomData 带来 +5.0 J&F_bi-fore 提升；模型从 4B→8B 持续获益

> ⚠️ 注意：VideoLoom 的核心创新不在于单项任务的绝对性能（某些专用模型可能更强），而在于首次证明了单一模型可以同时高质量地完成时间定位和空间分割，且两者相互促进。

#### 🧪 练习题
```yaml
question: "VideoLoom 中 SlowFast 视觉 token 设计的核心目的是什么？"
options:
  - "减少模型参数量以加速推理"
  - "在有限 token 预算下同时兼顾长程时序覆盖和高分辨率空间细节"
  - "替代 SAM2 的图像编码器以降低计算成本"
  - "使模型能够处理不同分辨率的输入视频"
answer: 1
explain: "Fast tokens 用少量 token 覆盖 128 帧实现时序理解，Slow tokens 用高分辨率 token 保留 5 帧空间细节用于分割，两者互补实现统一时空理解。"
```
