### ConvNeXt — 现代卷积网络 (A ConvNet for the 2020s)

```yaml
id: convnext
name: ConvNeXt
full_name: 现代卷积网络 (A ConvNet for the 2020s)
year: '2022.01'
org: Facebook AI
paper_url: https://arxiv.org/abs/2201.03545
category: modern_efficient
parent: resnet
motivation: 借鉴Transformer技巧现代化改造CNN
```

#### 📝 一句话总结

ConvNeXt 通过系统性地将 Vision Transformer 的设计策略（大核深度可分离卷积、倒瓶颈结构、LayerNorm、GELU 等）逐步移植到标准 ResNet 架构中，证明了纯卷积网络在精度和可扩展性上可以与 Swin Transformer 匹敌甚至超越，在 ImageNet 上达到 87.8% top-1 准确率，同时在 COCO 检测和 ADE20K 分割任务上也优于 Swin Transformer。

#### 🎯 核心要点

- **渐进式现代化路线图**：从标准 ResNet-50 出发，经过 7 步改造逐步逼近并超越 Swin-T（76.1% → 82.0%）
- **现代训练策略**：采用 300 epoch、AdamW、Mixup、CutMix、RandAugment、Stochastic Depth、Label Smoothing 等 Transformer 训练技巧，仅此一项即提升 +2.7%
- **宏观设计调整**：阶段计算比从 (3,4,6,3) 改为 (3,3,9,3)；Stem 从 7×7 conv + maxpool 改为 4×4 stride-4 patchify 卷积
- **深度可分离卷积 + 通道扩展**：采用 depthwise conv 分离空间与通道混合，通道数从 64 扩展到 96（对齐 Swin-T）
- **倒瓶颈结构**：MLP 隐藏维度为输入的 4 倍，与 Transformer FFN 设计一致
- **7×7 大核卷积**：将 depthwise conv 上移至 block 开头并增大到 7×7，模拟 Transformer 的大感受野
- **微观设计**：GELU 替换 ReLU、每 block 仅 1 个激活函数和 1 个 LayerNorm、独立下采样层
- **模型家族**：ConvNeXt-T/S/B/L/XL，参数量和 FLOPs 与 Swin 系列对齐
- **ImageNet-22K 预训练 + ImageNet-1K 微调**：ConvNeXt-XL 达到 87.8% top-1

#### 🔬 深入细节

![ConvNeXt 现代化路线图](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png)
*图：从标准 ResNet 到 ConvNeXt 的渐进式现代化路线图。每一步改造对应的 ImageNet-1K top-1 准确率变化。*

![ConvNeXt Block 设计对比](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x4.png)
*图：ResNet、Swin Transformer 和 ConvNeXt 的 block 结构对比。ConvNeXt block 用纯卷积模块实现了与 Transformer block 等价的设计模式。*

##### 算法伪代码

```python
# ConvNeXt Block 伪代码
def convnext_block(x):
    residual = x
    # 1. 7×7 Depthwise Conv（大核空间混合，类似 MSA 的局部窗口注意力）
    x = depthwise_conv7x7(x)       # [B, C, H, W] → [B, C, H, W]
    x = layer_norm(x)
    # 2. 1×1 Conv 升维（倒瓶颈，扩展 4 倍，类似 Transformer FFN）
    x = pointwise_conv(x, C * 4)   # [B, C, H, W] → [B, 4C, H, W]
    x = gelu(x)                    # 唯一的激活函数
    # 3. 1×1 Conv 降维
    x = pointwise_conv(x, C)       # [B, 4C, H, W] → [B, C, H, W]
    # 4. Stochastic Depth + 残差连接
    x = stochastic_depth(x) + residual
    return x

# ConvNeXt 整体架构
def convnext(image):
    # Stem: Patchify（4×4 conv, stride 4）
    x = conv2d(image, kernel=4, stride=4, out_ch=C)  # [B,3,224,224] → [B,C,56,56]
    x = layer_norm(x)

    # Stage 1-4，每个 stage 之间有独立下采样层
    for stage_id in [1, 2, 3, 4]:
        if stage_id > 1:
            x = layer_norm(x)
            x = conv2d(x, kernel=2, stride=2, out_ch=C*2)  # 空间减半，通道翻倍
        for _ in range(num_blocks[stage_id]):
            x = convnext_block(x)

    # 分类头
    x = global_avg_pool(x)         # [B, C_last, H, W] → [B, C_last]
    x = layer_norm(x)
    logits = linear(x, num_classes)
    return logits
```

##### 动机与背景

2020 年代初，Vision Transformer (ViT) 及其层级变体 Swin Transformer 在视觉识别领域迅速崛起，在 ImageNet 分类、COCO 检测、ADE20K 分割等任务上全面超越传统 ConvNet。然而，Swin Transformer 的成功在很大程度上**重新引入了卷积网络的归纳偏置**（层级结构、局部窗口），这引发了一个根本性问题：**ConvNet 与 Transformer 之间的性能差距，究竟源于 Transformer 架构本身的优越性，还是仅仅因为 ConvNet 没有采用现代的训练策略和设计选择？**

ConvNeXt 的核心动机就是回答这个问题。作者从标准 ResNet-50 出发，系统性地将 Swin Transformer 的每一个设计决策"翻译"为卷积网络的等价实现，逐步缩小差距，最终证明**纯卷积网络完全可以达到甚至超越 Transformer 的性能**。

##### 核心机制：七步现代化路线图

ConvNeXt 的方法论本身就是其最大创新——不是提出单一新模块，而是通过**受控实验**逐步改造 ResNet，每一步对应一个从 Transformer 借鉴的设计选择：

**第一步：现代训练策略（76.1% → 78.8%，+2.7%）**

传统 ResNet 使用 90 epoch + SGD 训练。作者改用 Transformer 社区的训练配方：

- 训练 300 epoch，AdamW 优化器
- 数据增强：Mixup、CutMix、RandAugment、Random Erasing
- 正则化：Stochastic Depth、Label Smoothing

> 💡 关键：仅改变训练策略（不改架构），ResNet-50 就从 76.1% 提升到 78.8%，说明传统 ConvNet 与 Transformer 的性能差距中有相当一部分来自训练策略而非架构。

**第二步：宏观设计——阶段计算比（78.8% → 79.4%）**

ResNet-50 的四阶段 block 数为 (3, 4, 6, 3)，而 Swin-T 为 (1:1:3:1) 比例。作者将 block 数调整为 **(3, 3, 9, 3)**，将更多计算集中在第三阶段（分辨率 14×14），与 Swin-T 对齐。

**第三步：宏观设计——Patchify Stem（79.4% → 79.5%）**

将 ResNet 的 7×7 conv stride-2 + maxpool 替换为 **4×4 conv stride-4 的非重叠卷积**，与 ViT/Swin 的 patch embedding 等价。这一步性能变化微小，但简化了网络入口。

**第四步：ResNeXt 化——深度可分离卷积（79.5% → 80.5%）**

采用 **depthwise convolution**（分组数 = 通道数），实现空间与通道信息的分离混合，这与 Transformer 中 MSA（空间混合）和 FFN（通道混合）的分离设计理念一致。同时将网络宽度从 64 扩展到 96 以补偿容量。

$$\text{Depthwise Conv: } y_c = \sum_{(i,j) \in \mathcal{N}} w_c^{(i,j)} \cdot x_c^{(i,j)}, \quad \forall c \in \{1,...,C\}$$

每个通道独立进行空间卷积，再通过 \(1 \times 1\) pointwise conv 进行通道间信息交换。

**第五步：倒瓶颈结构（80.5% → 80.6%）**

Transformer FFN 的隐藏维度是输入的 4 倍，形成"窄→宽→窄"的倒瓶颈。作者将 ResNet block 从传统的"宽→窄→宽"瓶颈改为 **倒瓶颈**（expansion ratio = 4），与 MobileNetV2 的设计一致。

> ⚠️ 注意：倒瓶颈在 ResNet-50 级别提升微小（+0.1%），但在 ResNet-200 级别带来显著提升（+0.7%），说明该设计在大模型中更有效。

**第六步：大核卷积（80.6% → 80.6%，但为后续微观设计奠定基础）**

这一步包含两个子操作：

1. **上移 depthwise conv**：将其从 block 中间移到开头（类似 Transformer 中 MSA 在 FFN 之前），使大核卷积作用在低维空间，降低计算量
2. **增大卷积核到 7×7**：实验了 3/5/7/9/11 多种核大小，发现 **7×7 是最佳平衡点**，与 Swin Transformer 的 7×7 窗口大小一致

$$\text{感受野对比: } \underbrace{3 \times 3}_{\text{ResNet}} \ll \underbrace{7 \times 7}_{\text{ConvNeXt/Swin}}$$

**第七步：微观设计（80.6% → 82.0%，+1.4%）**

这是提升最大的一步，包含四个子改动：

| 改动 | 准确率变化 | 说明 |
|------|-----------|------|
| ReLU → GELU | 80.6%（不变） | 更平滑的激活函数，与 BERT/GPT 一致 |
| 减少激活函数数量 | → 81.3%（+0.7%） | 每 block 仅在两个 1×1 conv 之间保留 1 个 GELU |
| 减少归一化层数量 | → 81.4%（+0.1%） | 每 block 仅保留 1 个归一化层 |
| BN → LN | → 81.5%（+0.1%） | LayerNorm 替换 BatchNorm |
| 独立下采样层 | → 82.0%（+0.5%） | 用 2×2 stride-2 conv 替代 stride-2 残差块，阶段间加 LN 稳定训练 |

> 💡 关键：减少激活函数数量（+0.7%）是微观设计中增益最大的单项改动，说明 Transformer 中"稀疏非线性"的设计哲学对 ConvNet 同样有效。

##### 模型家族与扩展性

ConvNeXt 定义了 5 个规模变体，与 Swin Transformer 严格对齐：

| 模型 | 通道数 \(C\) | Block 数 \(B\) | 参数量 | FLOPs |
|------|-------------|---------------|--------|-------|
| ConvNeXt-T | (96, 192, 384, 768) | (3, 3, 9, 3) | 29M | 4.5G |
| ConvNeXt-S | (96, 192, 384, 768) | (3, 3, 27, 3) | 50M | 8.7G |
| ConvNeXt-B | (128, 256, 512, 1024) | (3, 3, 27, 3) | 89M | 15.4G |
| ConvNeXt-L | (192, 384, 768, 1536) | (3, 3, 27, 3) | 198M | 34.4G |
| ConvNeXt-XL | (256, 512, 1024, 2048) | (3, 3, 27, 3) | 350M | 60.9G |

在 ImageNet-22K 预训练 + ImageNet-1K 微调的设置下，ConvNeXt-XL 达到 **87.8% top-1 准确率**，超越 Swin-L（87.3%）。在 COCO 目标检测（Cascade Mask R-CNN 框架）和 ADE20K 语义分割（UperNet 框架）上，ConvNeXt 同样全面超越对应规模的 Swin Transformer。

##### 与传统方法的核心区别

| 维度 | ResNet | Swin Transformer | ConvNeXt |
|------|--------|-------------------|----------|
| 基本算子 | 3×3 标准卷积 | 窗口自注意力 + Shifted Window | 7×7 深度可分离卷积 + 1×1 卷积 |
| 归一化 | BatchNorm | LayerNorm | LayerNorm |
| 激活函数 | 每层 ReLU | 每 block 1 个 GELU | 每 block 1 个 GELU |
| 瓶颈结构 | 标准瓶颈（宽→窄→宽） | FFN 倒瓶颈 | 倒瓶颈（窄→宽→窄） |
| Stem | 7×7 conv + maxpool | 4×4 patch embed | 4×4 patchify conv |
| 下采样 | Stride-2 残差块 | Patch merging | 独立 2×2 stride-2 conv + LN |
| 特殊模块 | 无 | Shifted Window、相对位置偏置 | 无（纯标准卷积） |

ConvNeXt 最重要的贡献不是某个单一的新模块，而是**证明了通过系统性地采用现代设计选择，纯卷积网络完全可以匹敌 Transformer**，且不需要任何专用模块（如 shifted window attention 或相对位置编码），保持了卷积网络的简洁性和硬件友好性。

#### 🧪 练习题

```yaml
question: "在 ConvNeXt 的渐进式现代化过程中，以下哪项微观设计改动带来了最大的单步精度提升？"
options:
  - "将 ReLU 替换为 GELU 激活函数"
  - "将 BatchNorm 替换为 LayerNorm"
  - "减少每个 block 中激活函数的数量（仅保留 1 个 GELU）"
  - "将卷积核从 3×3 增大到 7×7"
answer: 2
explain: "减少激活函数数量（从每层都有 ReLU 到每 block 仅 1 个 GELU）带来了 +0.7% 的提升（80.6% → 81.3%），是微观设计中增益最大的单项改动，体现了 Transformer 中稀疏非线性的设计哲学。"
```