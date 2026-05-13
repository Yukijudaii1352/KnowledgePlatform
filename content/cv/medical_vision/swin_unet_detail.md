### Swin-Unet

```yaml
id: swin_unet
name: Swin-Unet
full_name: "Swin-Unet: Unet-like Pure Transformer for Medical Image Segmentation"
year: "2021"
org: "Fudan University / Huawei Noah's Ark Lab"
paper_url: "https://arxiv.org/abs/2105.05537"
category: "medical_vision"
parent: "Swin Transformer / U-Net"
motivation: "医学分割"
```

#### 📝 一句话总结

Swin-Unet 提出了首个**纯 Transformer** 的 U 形编解码架构用于医学图像分割，通过在编码器中使用 Swin Transformer 的移位窗口自注意力进行层级特征提取，并设计对称的 **Patch Expanding Layer** 实现上采样解码，在 Synapse 多器官 CT 和 ACDC 心脏 MRI 数据集上超越了 CNN 及 CNN-Transformer 混合方法。

#### 🎯 核心要点

- **纯 Transformer U 形架构**：编码器、瓶颈层、解码器全部基于 Swin Transformer block，不依赖任何卷积操作
- **Patch Expanding Layer**：与 Patch Merging 对称的上采样模块，通过线性层将特征维度扩展至 \(2C^2\)，再 reshape 实现 2× 空间分辨率上采样
- **移位窗口自注意力（W-MSA / SW-MSA）**：在固定窗口内计算自注意力以降低计算复杂度，交替使用移位窗口建立跨窗口连接
- **Skip Connection**：编码器多尺度特征与解码器对应层级特征拼接后通过线性层融合
- **ImageNet-22K 预训练**：编码器使用 Swin Transformer Tiny 的 ImageNet-22K 预训练权重初始化，解码器随机初始化
- **实验基准**：Synapse 多器官 CT（DSC 79.13% / HD 21.55mm）、ACDC 心脏 MRI（DSC 90.00%）

#### 🔬 深入细节

![Swin-Unet 整体架构图](https://ar5iv.labs.arxiv.org/html/2105.05537/assets/images/Swin-unet.png)
*图 1：Swin-Unet 架构，由编码器（Patch Embedding + Swin Transformer Blocks + Patch Merging）、瓶颈层、解码器（Swin Transformer Blocks + Patch Expanding）和跳跃连接组成*

![Swin Transformer Block 结构](https://ar5iv.labs.arxiv.org/html/2105.05537/assets/images/swin_block.png)
*图 2：Swin Transformer Block 内部结构，连续两个 block 分别使用 W-MSA 和 SW-MSA*

```python
# Swin-Unet 前向传播伪代码
def swin_unet_forward(x):
    # x: (B, H, W, 1) 医学图像输入，224×224

    # === Patch Embedding ===
    tokens = patch_embed(x, patch_size=4)  # (B, H/4*W/4, C), C=96

    # === Encoder: 3 stages ===
    skip_features = []
    for stage in [stage1, stage2, stage3]:
        tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks (W-MSA + SW-MSA)
        skip_features.append(tokens)
        tokens = patch_merging(tokens)  # 2× downsample, dim → 2×dim

    # === Bottleneck ===
    tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks at lowest resolution

    # === Decoder: 3 stages (symmetric) ===
    for stage in [stage1, stage2, stage3]:
        tokens = patch_expanding(tokens)  # 2× upsample, dim → dim/2
        tokens = concat(tokens, skip_features.pop())  # skip connection
        tokens = linear_projection(tokens)  # fuse concatenated features
        tokens = swin_transformer_blocks(tokens)  # 2× Swin Blocks

    # === Final Patch Expanding (4×) + Segmentation Head ===
    tokens = patch_expanding_4x(tokens)  # restore to H×W resolution
    output = linear_classifier(tokens)  # (B, H, W, num_classes)
    return output
```

**动机与背景**

医学图像分割长期由 U-Net 及其 CNN 变体主导。CNN 的局部感受野限制了对远距离空间依赖关系的建模能力，而这种全局上下文对于器官形状和位置关系的理解至关重要。TransUNet 等工作尝试将 Transformer 引入编码器，但仍依赖 CNN 解码器进行上采样。Swin-Unet 的核心动机是：**能否构建一个完全不依赖卷积的纯 Transformer 分割网络，同时保持 U-Net 的多尺度编解码优势？**

**核心机制：Swin Transformer Block 与移位窗口**

Swin-Unet 的基本计算单元是 Swin Transformer Block，每个 block 包含一个窗口多头自注意力（W-MSA 或 SW-MSA）、LayerNorm 和 MLP。标准 ViT 的全局自注意力计算复杂度为 \(\mathcal{O}(n^2)\)（\(n\) 为 token 总数），而 W-MSA 将特征图划分为 \(M \times M\)（默认 \(M=7\)）的不重叠窗口，在每个窗口内独立计算自注意力，复杂度降至 \(\mathcal{O}(M^2 \cdot n)\)，对 \(n\) 为线性。连续两个 block 交替使用常规窗口和移位窗口：

$$\hat{z}^l = \text{W-MSA}(\text{LN}(z^{l-1})) + z^{l-1}$$
$$z^l = \text{MLP}(\text{LN}(\hat{z}^l)) + \hat{z}^l$$
$$\hat{z}^{l+1} = \text{SW-MSA}(\text{LN}(z^l)) + z^l$$
$$z^{l+1} = \text{MLP}(\text{LN}(\hat{z}^{l+1})) + \hat{z}^{l+1}$$

其中 SW-MSA 通过将窗口偏移 \(\lfloor M/2 \rfloor\) 像素，使相邻窗口的 token 能够交互，从而在不增加计算量的前提下建立跨窗口的信息流动。这种设计是 Swin-Unet 能够高效建模全局上下文的关键。

> 💡 **关键**：移位窗口机制的精妙之处在于——它用两次线性复杂度的局部注意力，等效实现了一次全局注意力的信息传播效果。

**编码器的层级下采样：Patch Merging**

编码器由 3 个 stage 组成，每个 stage 包含若干 Swin Transformer Block，stage 之间通过 Patch Merging 层进行 2× 空间下采样。Patch Merging 将相邻 \(2 \times 2\) 位置的 token 拼接为一个 token（通道维度变为 \(4C\)），再通过线性层降维至 \(2C\)。这样，经过 3 次 Patch Merging 后，特征图分辨率从 \(\frac{H}{4} \times \frac{W}{4}\) 逐步降至 \(\frac{H}{32} \times \frac{W}{32}\)，通道数从 \(C\) 增至 \(8C\)。

**解码器的核心创新：Patch Expanding Layer**

Patch Expanding 是 Swin-Unet 最重要的设计贡献，它是 Patch Merging 的对称逆操作。具体地，对于输入特征 \(\mathbb{R}^{\frac{H}{s} \times \frac{W}{s} \times C_{\text{in}}}\)，Patch Expanding 首先通过线性层将通道维度扩展至 \(2C_{\text{in}}\)，然后执行 reshape 操作将通道维度的信息重新排列到空间维度，实现 2× 上采样，输出为 \(\mathbb{R}^{\frac{H}{s/2} \times \frac{W}{s/2} \times C_{\text{in}}/2}\)。这一设计完全避免了转置卷积或双线性插值等 CNN 操作，保持了架构的纯 Transformer 特性。

> ⚠️ **注意**：最终恢复到原始分辨率时使用的是 4× Patch Expanding（而非 2×），因为 Patch Embedding 阶段已将分辨率降低了 4 倍。

**跳跃连接与预训练策略**

与 U-Net 类似，Swin-Unet 在编码器和解码器的对应层级之间建立跳跃连接。编码器的多尺度特征与 Patch Expanding 上采样后的解码器特征在通道维度上拼接，再通过线性层将通道数恢复。这种设计有效缓解了深层语义信息与浅层空间细节之间的信息鸿沟。

训练策略上，Swin-Unet 采用 Swin Transformer Tiny 配置（\(C=96\)，层数 \([2,2,6,2]\)，头数 \([3,6,12,24]\)），编码器和瓶颈层使用 ImageNet-22K 预训练权重初始化，解码器随机初始化。实验表明，ImageNet 预训练对医学图像分割性能至关重要——在 Synapse 数据集上，预训练使 DSC 从约 72% 提升至 79.13%。训练使用 SGD 优化器，学习率 0.05，batch size 24，共 150 个 epoch，输入分辨率 224×224。

**与传统方法的对比**

相比 TransUNet（CNN 编码器 + Transformer + CNN 解码器），Swin-Unet 完全移除了卷积操作，证明纯 Transformer 架构在医学图像分割中的可行性。相比标准 ViT，Swin Transformer 的移位窗口机制将计算复杂度从二次降至线性，使得处理高分辨率医学图像成为可能。在 Synapse 数据集上，Swin-Unet（DSC 79.13%）超越了 TransUNet（77.48%）和 AttnUNet（75.57%），在 ACDC 数据集上达到 90.00% DSC。

#### 🧪 练习题

```yaml
question: "Swin-Unet 解码器中 Patch Expanding Layer 的核心操作是什么？"
options:
  - "使用转置卷积进行 2× 上采样"
  - "通过线性层扩展通道维度，再 reshape 将通道信息重排到空间维度实现上采样"
  - "使用双线性插值进行上采样后接 1×1 卷积降维"
  - "将相邻 2×2 token 拼接后通过线性层降维"
answer: 1
explain: "Patch Expanding 先用线性层将通道维度扩展至 2C，再通过 reshape 将多余通道重排为空间像素，实现纯 Transformer 的 2× 上采样。选项 D 描述的是编码器中的 Patch Merging（下采样）操作。"
```