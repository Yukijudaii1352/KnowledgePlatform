### ConvNeXt: A ConvNet for the 2020s

```yaml
title: "A ConvNet for the 2020s"
authors: "Zhuang Liu, Hanzi Mao, Chao-Yuan Wu, Christoph Feichtenhofer, Trevor Darrell, Saining Xie"
venue: "CVPR 2022"
year: 2022
url: "https://arxiv.org/abs/2201.03545"
code: "https://github.com/facebookresearch/ConvNeXt"
tags: [ConvNet, Vision Transformer, Architecture Design, Image Classification, Object Detection]
```

---

## 📝 总结

本文从标准 ResNet-50 出发，逐步借鉴 Swin Transformer 的设计决策（现代训练策略、宏观/微观架构调整），在不引入任何注意力模块的前提下，构建了纯卷积网络家族 ConvNeXt。关键改动包括：Patchify stem、Depthwise 大核卷积、反转瓶颈、GELU/LN 等微观设计、独立下采样层。最终 ConvNeXt 在 ImageNet 分类（87.8% top-1）、COCO 检测和 ADE20K 分割上均匹敌或超越 Swin Transformer，证明了精心设计的 ConvNet 仍具强大竞争力。

---

## 🎯 要点

1. **训练技巧的巨大影响**：仅将 ResNet-50 的训练方案从传统 90 epoch 升级为 ViT 风格（300 epoch + AdamW + 数据增强 + 正则化），准确率即从 76.1% 提升至 78.8%（+2.7%），说明 ConvNet 与 Transformer 的性能差距很大程度源于训练策略而非架构本身。

2. **系统化的"现代化路线图"**：作者将 ResNet→ConvNeXt 的演进分解为 5 个可控维度——宏观设计（stage ratio + patchify stem）、ResNeXt 化（depthwise conv）、反转瓶颈、大核卷积（7×7）、微观设计（GELU/LN/fewer norm & act/独立下采样），每步独立消融，最终从 78.8% 提升至 82.0%。

3. **Depthwise 卷积 ≈ Self-Attention 的空间混合**：Depthwise conv 在逐通道维度上混合空间信息，与 self-attention 的 per-head 加权求和高度类似；配合 1×1 conv 实现空间/通道混合的分离，是 ConvNeXt 性能提升的核心设计。

4. **纯卷积架构的可扩展性**：ConvNeXt-XL（350M 参数）在 ImageNet-22K 预训练后达到 87.8% top-1，在 COCO 检测上 box AP 超过 Swin-L +1.0，证明 ConvNet 在大规模数据和大模型下同样具备优秀的 scaling 能力。

5. **简洁性优势**：ConvNeXt 无需 shifted window、相对位置偏置等专用模块，全卷积设计使其在不同分辨率微调时无需插值位置编码，部署更简单，推理吞吐量也更高。

---

## 🔬 细节

### 1. 核心动机与方法论

论文的核心问题是：**Transformer 的哪些设计决策真正提升了性能？这些设计能否在纯 ConvNet 中复现？**

作者采用"控制变量"的实验方法论，从 ResNet-50 出发，在保持 ~4.5 GFLOPs 的约束下，逐步引入 Swin Transformer 的设计元素，观察每一步的精度变化：

![ConvNeXt 现代化路线图](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png)
*Figure 2: 从 ResNet 到 ConvNeXt 的逐步现代化路线图。前景柱状图为 ResNet-50/Swin-T 量级的结果。*

### 2. 逐步改造详解

#### Step 1: 训练策略升级（76.1% → 78.8%）

采用 DeiT/Swin 风格训练：

| 超参数 | 值 |
|--------|-----|
| Epochs | 300 |
| Optimizer | AdamW |
| Learning Rate | 4e-3 |
| Batch Size | 4096 |
| Weight Decay | 0.05 |
| 数据增强 | Mixup, Cutmix, RandAugment, Random Erasing |
| 正则化 | Stochastic Depth, Label Smoothing |
| 其他 | Layer Scale (1e-6), EMA |

#### Step 2: 宏观设计（78.8% → 79.5%）

**Stage Ratio 调整**：ResNet 的 (3,4,6,3) → Swin 风格的 (3,3,9,3)，将更多计算集中在第 3 阶段。精度 78.8% → 79.4%。

**Patchify Stem**：将 ResNet 的 7×7 conv + maxpool 替换为 4×4 stride 4 的非重叠卷积（类似 ViT 的 patch embedding）。精度 79.4% → 79.5%。

#### Step 3: ResNeXt 化（79.5% → 80.5%）

采用 depthwise convolution（分组数 = 通道数），将网络宽度从 64 扩展到 96（对齐 Swin-T）。Depthwise conv 实现空间信息混合，1×1 conv 实现通道信息混合，二者分离。

#### Step 4: 反转瓶颈（80.5% → 80.6%）

借鉴 MobileNetV2 的反转瓶颈设计，将隐藏层维度扩展为输入的 4 倍（96 → 384 → 96）。这与 Transformer 的 FFN（4× 扩展比）一致。

#### Step 5: 大核卷积（80.6% → 80.6%）

将 depthwise conv 上移至反转瓶颈的顶部（类似 Transformer 中 MSA 在 FFN 之前），并将核大小从 3×3 增大到 7×7。中间步骤精度先降后升，最终持平但 FLOPs 降低。

#### Step 6: 微观设计（80.6% → 82.0%）

| 改动 | 精度变化 | 说明 |
|------|----------|------|
| ReLU → GELU | 80.6% → 80.6% | 与 Transformer 对齐 |
| 减少激活函数 | → 81.3% | 仅在两个 1×1 conv 之间保留一个 GELU |
| 减少归一化层 | → 81.4% | 仅在第一个 1×1 conv 前保留一个 LN |
| BN → LN | → 81.5% | Layer Norm 替代 Batch Norm |
| 独立下采样层 | → 82.0% | 用 2×2 stride 2 conv 做下采样，前后加 LN 稳定训练 |

### 3. ConvNeXt Block 结构

![ConvNeXt Block 对比](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x4.png)
*Figure 4: (a) ResNet block (b) Swin Transformer block (c) ConvNeXt block*

ConvNeXt block 的伪代码：

```python
def convnext_block(x, dim, kernel_size=7):
    """ConvNeXt Block: DwConv → LN → 1x1 Conv → GELU → 1x1 Conv"""
    residual = x
    # Depthwise convolution (空间混合)
    x = depthwise_conv2d(x, kernel_size=kernel_size, padding=kernel_size//2)
    # Layer Normalization
    x = layer_norm(x)
    # Pointwise expansion (通道混合, 4x expansion)
    x = linear(x, dim * 4)  # 等价于 1x1 conv
    x = gelu(x)
    # Pointwise projection
    x = linear(x, dim)      # 等价于 1x1 conv
    # Residual connection
    return residual + x
```

### 4. 模型变体配置

| 变体 | 通道数 C | Block 数 B | 参数量 | FLOPs |
|------|---------|-----------|--------|-------|
| ConvNeXt-T | (96, 192, 384, 768) | (3, 3, 9, 3) | 29M | 4.5G |
| ConvNeXt-S | (96, 192, 384, 768) | (3, 3, 27, 3) | 50M | 8.7G |
| ConvNeXt-B | (128, 256, 512, 1024) | (3, 3, 27, 3) | 89M | 15.4G |
| ConvNeXt-L | (192, 384, 768, 1536) | (3, 3, 27, 3) | 198M | 34.4G |
| ConvNeXt-XL | (256, 512, 1024, 2048) | (3, 3, 27, 3) | 350M | 60.9G |

通道数每阶段翻倍，与 ResNet 和 Swin 一致。T/S 共享通道配置，通过 block 数区分；B/L/XL 逐步扩大通道。

### 5. 关键实验结果

#### ImageNet 分类

| 模型 | 预训练 | 分辨率 | Top-1 Acc |
|------|--------|--------|-----------|
| Swin-T | IN-1K | 224² | 81.3% |
| **ConvNeXt-T** | IN-1K | 224² | **82.1%** |
| Swin-B | IN-22K | 384² | 86.4% |
| **ConvNeXt-B** | IN-22K | 384² | **86.8%** |
| Swin-L | IN-22K | 384² | 87.3% |
| **ConvNeXt-L** | IN-22K | 384² | **87.5%** |
| **ConvNeXt-XL** | IN-22K | 384² | **87.8%** |

#### COCO 目标检测（Cascade Mask R-CNN）

ConvNeXt 在各规模上均匹敌或超越 Swin Transformer。ConvNeXt-B/L/XL 在 IN-22K 预训练下，box AP 显著优于对应的 Swin（如 +1.0 AP）。

#### Isotropic 架构对比

在无下采样的 ViT 风格 isotropic 架构中，ConvNeXt block 同样与 ViT 性能持平（如 ConvNeXt-B iso. 82.0% vs ViT-B 81.8%），证明 block 设计本身的竞争力。

### 6. 整体架构示意

```
Input (224×224×3)
    │
    ▼
[Patchify Stem] 4×4 conv, stride 4, C=96 → LN
    │  (56×56×96)
    ▼
[Stage 1] ConvNeXt Block × 3
    │
[Downsample] LN → 2×2 conv, stride 2, C=192
    │  (28×28×192)
    ▼
[Stage 2] ConvNeXt Block × 3
    │
[Downsample] LN → 2×2 conv, stride 2, C=384
    │  (14×14×384)
    ▼
[Stage 3] ConvNeXt Block × 9
    │
[Downsample] LN → 2×2 conv, stride 2, C=768
    │  (7×7×768)
    ▼
[Stage 4] ConvNeXt Block × 3
    │
[Global Avg Pool] → LN → Linear → 1000 classes
```

### 7. 设计哲学总结

论文的核心洞察是：**Swin Transformer 的成功很大程度上归功于从 ConvNet 借鉴的归纳偏置（层级结构、局部窗口），而非 self-attention 本身。** 反过来，将 Transformer 的训练策略和架构微调（如 LN、GELU、反转瓶颈、大感受野）应用于 ConvNet，同样能达到甚至超越 Transformer 的性能。

![ImageNet 精度对比](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x1.png)
*Figure 1: ConvNeXt 与各类视觉模型在 ImageNet 上的精度-FLOPs 对比。ConvNeXt 在各计算量级上均具竞争力。*

---

## 🧪 练习

**Q1**：ConvNeXt 将 ResNet 的 BN 替换为 LN，但 BN 在 ConvNet 中长期被认为是标配。请分析：为什么在 ConvNeXt 的设计中 LN 能够生效？如果直接在标准 ResNet-50 中将 BN 换成 LN 会怎样？

<details><summary>参考答案</summary>

LN 在 ConvNeXt 中能生效的关键前提是：(1) 使用了 depthwise conv 分离了空间和通道混合，减少了对 batch 统计量的依赖；(2) 归一化层数量大幅减少（每个 block 仅一个 LN），降低了 LN 对训练动态的负面影响；(3) 配合 AdamW 等现代优化器。如果直接在标准 ResNet-50 中将所有 BN 换成 LN，论文指出会导致性能显著下降（训练不稳定），因为标准 ResNet 的 block 结构中有多个归一化层且依赖 BN 的 batch 统计特性来稳定训练。

</details>

**Q2**：ConvNeXt 使用 7×7 depthwise conv 来扩大感受野。请计算：在 ConvNeXt-T 的 Stage 3（9 个 block）中，仅通过 depthwise conv 堆叠，理论感受野能覆盖多大的空间范围？这与 Swin-T 在同一 stage 使用 7×7 窗口注意力相比如何？

<details><summary>参考答案</summary>

每个 7×7 depthwise conv 在每个方向扩展 3 个像素的感受野。9 个 block 堆叠后，理论感受野为 $1 + 9 \times (7-1) = 55$ 像素（在 14×14 的特征图上）。这远超 14×14 的特征图尺寸，意味着 Stage 3 的输出已经具有全局感受野。相比之下，Swin-T 在同一 stage 使用 7×7 窗口注意力（配合 shifted window），每个 block 的注意力范围限制在 7×7 窗口内，需要通过 shift 机制跨窗口传播信息，理论上也能覆盖全局但效率不同。ConvNeXt 通过简单的大核卷积堆叠自然获得了大感受野，无需复杂的窗口移位机制。

</details>

**Q3**：论文发现独立下采样层（2×2 stride 2 conv + LN）对训练稳定性至关重要，直接使用会导致训练发散。请解释为什么需要在分辨率变化处添加归一化层？这与 Transformer 中的设计有什么对应关系？

<details><summary>参考答案</summary>

当使用独立的 2×2 stride 2 conv 进行下采样时，特征图的统计分布会发生剧烈变化（空间分辨率减半、通道数翻倍），如果没有归一化层来重新校准特征分布，梯度可能会爆炸或消失，导致训练发散。添加 LN 可以在分辨率变化的边界处稳定特征分布。这与 Swin Transformer 的设计直接对应：Swin 在每个 patch merging 层（即下采样层）前后都使用了 LN。此外，ConvNeXt 在 stem 之后和最终全局平均池化之后也添加了 LN，这些位置同样对应 Swin 中的归一化层位置。本质上，这反映了一个通用原则：在特征分布发生显著变化的网络节点处，归一化是维持训练稳定性的关键。

</details>