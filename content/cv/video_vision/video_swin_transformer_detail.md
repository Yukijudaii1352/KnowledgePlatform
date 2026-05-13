### Video Swin Transformer

```yaml
id: video_swin_transformer
name: Video Swin Transformer
full_name: Video Swin Transformer
year: 2021
org: Microsoft Research Asia
paper_url: https://arxiv.org/abs/2106.13230
category: video_backbone
parent: swin_transformer
motivation: 将 Swin Transformer 的局部窗口注意力机制从图像扩展到视频领域，通过 3D shifted window 实现高效的时空建模，在多个视频理解基准上取得领先性能
```

#### 📝 一句话总结

Video Swin Transformer 将 Swin Transformer 的局部窗口自注意力机制从 2D 图像扩展到 3D 视频，通过 3D shifted window 多头自注意力实现高效的时空建模，以远低于全局注意力的计算开销在 Kinetics-400/600 和 Something-Something V2 等视频理解基准上取得了当时的最优性能。

#### 🎯 核心要点

- **3D Shifted Window MSA**：将 Swin Transformer 的 2D 窗口注意力扩展为 3D 时空窗口注意力，在局部 \(P \times M \times M\) 窗口内计算自注意力，大幅降低计算复杂度
- **时空局部性归纳偏置**：利用视频时空局部性先验，在保持建模能力的同时实现线性计算复杂度（相对于视频 token 数量）
- **3D Shifted Window 跨窗口连接**：通过在连续 Transformer 层间交替移位窗口位置，实现相邻窗口之间的信息交互，扩大感受野
- **3D 相对位置偏置**：将 2D 相对位置偏置扩展为 3D 版本 \(B \in \mathbb{R}^{P^2 \times M^2 \times M^2}\)，沿时间轴引入可学习的相对位置编码
- **ImageNet 预训练权重复用**：通过将 2D Swin Transformer 预训练权重直接初始化 3D 模型（时间维度中心初始化策略），实现高效迁移学习
- **四种模型变体**：Swin-T/S/B/L，参数量从 28.2M 到 200M，适配不同计算预算
- **多基准 SOTA**：在 Kinetics-400（84.9%）、Kinetics-600（86.1%）和 Something-Something V2（69.6%）上均达到当时最优

#### 🔬 深入细节

##### 整体架构

![Video Swin Transformer 整体架构](https://arxiv.org/html/2106.13230v2/x1.png)
*图：Video Swin Transformer 整体架构。输入视频经 3D Patch Partition 和 Linear Embedding 后，通过 4 个 Stage 逐步下采样空间分辨率，每个 Stage 包含多个 Video Swin Transformer Block（交替使用 3D W-MSA 和 3D SW-MSA）。*

Video Swin Transformer 的整体架构继承了 Swin Transformer 的层级设计思想，将其从 2D 图像域扩展到 3D 视频域。给定输入视频 \(T \times H \times W \times 3\)，处理流程如下：

1. **3D Patch Partition + Linear Embedding**：将视频划分为不重叠的 3D patch（时间步长为 2，空间步长为 \(4 \times 4\)），每个 patch 被展平并通过线性层映射到 \(C\) 维特征，得到 \(\frac{T}{2} \times \frac{H}{4} \times \frac{W}{4}\) 个 3D token。
2. **4 个 Stage**：每个 Stage 包含若干 Video Swin Transformer Block 和一个 Patch Merging 层（除最后一个 Stage）。Patch Merging 在空间维度上将 \(2 \times 2\) 邻域 token 合并，实现空间下采样和通道维度翻倍。
3. **分类头**：全局平均池化后接线性分类器。

> 💡 **关键设计**：时间维度在整个网络中保持不变（不做时间下采样），仅在空间维度上逐步下采样。这使得模型能够在所有层级上保持完整的时间分辨率。

##### 3D Shifted Window 多头自注意力

![3D Shifted Window 示意图](https://arxiv.org/html/2106.13230v2/x2.png)
*图：3D shifted window 机制示意。左侧为 Layer \(l\) 的常规窗口划分（3D W-MSA），右侧为 Layer \(l+1\) 的移位窗口划分（3D SW-MSA），通过交替使用实现跨窗口信息交互。*

**动机与背景**：标准的全局自注意力机制对视频的计算复杂度为 \(O(T^2H^2W^2)\)，这对于高分辨率长视频来说是不可接受的。TimeSformer 和 ViViT 等方法通过分解时空注意力来降低复杂度，但仍然在空间或时间维度上使用全局注意力。Video Swin Transformer 的核心思想是：**视频具有强烈的时空局部性**，相邻帧的相邻区域高度相关，因此可以在局部 3D 窗口内计算注意力。

**3D W-MSA（Window-based MSA）**：将 3D token 序列均匀划分为不重叠的 3D 窗口，每个窗口大小为 \(P \times M \times M\)（时间 × 高度 × 宽度）。自注意力仅在每个窗口内部计算：

$$\text{Attention}(Q, K, V) = \text{SoftMax}\left(\frac{QK^T}{\sqrt{d}} + B\right)V$$

其中 \(B \in \mathbb{R}^{P^2 \times M^2 \times M^2}\) 是 3D 相对位置偏置。每个窗口包含 \(P \times M \times M\) 个 token，计算复杂度从全局的 \(O((THW)^2)\) 降低为 \(O(THW \cdot PM^2)\)，实现了相对于视频 token 总数的**线性复杂度**。

**3D SW-MSA（Shifted Window-based MSA）**：常规窗口划分的问题是窗口之间没有信息交互。为此，在连续的 Transformer 层之间交替使用常规窗口和移位窗口：

$$\hat{z}^l = \text{3D-W-MSA}(\text{LN}(z^{l-1})) + z^{l-1}$$
$$z^l = \text{FFN}(\text{LN}(\hat{z}^l)) + \hat{z}^l$$
$$\hat{z}^{l+1} = \text{3D-SW-MSA}(\text{LN}(z^l)) + z^l$$
$$z^{l+1} = \text{FFN}(\text{LN}(\hat{z}^{l+1})) + \hat{z}^{l+1}$$

移位操作沿时间、高度、宽度三个维度分别移动 \((\lfloor P/2 \rfloor, \lfloor M/2 \rfloor, \lfloor M/2 \rfloor)\) 个 token。移位后，原本属于不同窗口的 token 被分配到同一窗口中，从而实现跨窗口的信息传递。

> ⚠️ **注意**：移位操作会在边界产生大小不一的窗口片段。论文采用了与 Swin Transformer 相同的**高效批量计算**策略：通过循环移位（cyclic shift）将小窗口拼接到大窗口中，并使用注意力掩码（attention mask）确保自注意力仅在原始窗口内的 token 之间计算。

##### 3D 相对位置偏置

![3D 相对位置偏置示意](https://arxiv.org/html/2106.13230v2/x3.png)
*图：从 2D 到 3D 相对位置偏置的扩展示意。*

标准 Swin Transformer 使用 2D 相对位置偏置 \(\hat{B} \in \mathbb{R}^{(2M-1) \times (2M-1)}\)。Video Swin Transformer 将其扩展到 3D：

$$B \in \mathbb{R}^{(2P-1) \times (2M-1) \times (2M-1)}$$

沿时间轴的相对位置范围为 \([-(P-1), P-1]\)，沿空间轴的相对位置范围为 \([-(M-1), M-1]\)。每个注意力头独立学习一组 3D 相对位置偏置参数。

**预训练权重初始化**：由于 2D Swin Transformer 没有时间维度的位置偏置，论文采用**中心初始化**策略——将 2D 预训练的空间相对位置偏置复制到时间相对位置为 0 的位置，其余时间位置初始化为零。这使得模型在初始化时等价于对每帧独立处理，然后在微调过程中逐步学习时间建模能力。

##### 算法伪代码

```python
# Video Swin Transformer 前向传播伪代码
def video_swin_forward(video):
    # video: [B, C, T, H, W]
    
    # Stage 0: 3D Patch Partition + Linear Embedding
    # patch_size = (2, 4, 4), 得到 T/2 × H/4 × W/4 个 token
    tokens = patch_embed(video)  # [B, T', H', W', C]
    
    for stage_idx in range(4):
        for block_idx in range(num_blocks[stage_idx]):
            if block_idx % 2 == 0:
                # 常规 3D 窗口注意力 (W-MSA)
                windows = partition_3d_windows(tokens, window_size=(P, M, M))
                attn_out = window_msa(windows, rel_pos_bias_3d)
                tokens = merge_3d_windows(attn_out)
            else:
                # 移位 3D 窗口注意力 (SW-MSA)
                shifted = cyclic_shift_3d(tokens, shift=(P//2, M//2, M//2))
                windows = partition_3d_windows(shifted, window_size=(P, M, M))
                attn_out = window_msa(windows, rel_pos_bias_3d, attn_mask)
                tokens = reverse_cyclic_shift(merge_3d_windows(attn_out))
            
            tokens = ffn(layer_norm(tokens)) + tokens
        
        if stage_idx < 3:
            tokens = patch_merging(tokens)  # 空间 2x 下采样
    
    # 分类
    output = classifier(global_avg_pool(tokens))
    return output
```

##### 计算复杂度分析

3D W-MSA 与全局 3D MSA 的计算复杂度对比：

- **全局 3D MSA**：

$$\Omega(\text{3D-MSA}) = 4ThwC^2 + 2(Thw)^2C$$

- **3D W-MSA**：

$$\Omega(\text{3D-W-MSA}) = 4ThwC^2 + 2PM^2 \cdot Thw \cdot C$$

其中 \(T, h, w\) 为 3D token 序列的时间、高度、宽度维度，\(C\) 为通道数，\(P \times M \times M\) 为 3D 窗口大小。关键差异在于第二项：全局注意力的 \((Thw)^2\) 被替换为 \(PM^2 \cdot Thw\)，当 \(PM^2 \ll Thw\) 时（通常成立），计算量大幅降低。

##### 模型变体与实验结果

论文提供了四种模型变体，对应不同的计算预算：

| 变体 | 通道数 C | 各 Stage 层数 | 注意力头数 | 参数量 | FLOPs |
|------|---------|-------------|----------|--------|-------|
| Swin-T | 96 | {2, 2, 6, 2} | {3, 6, 12, 24} | 28.2M | 88G |
| Swin-S | 96 | {2, 2, 18, 2} | {3, 6, 12, 24} | 49.8M | 166G |
| Swin-B | 128 | {2, 2, 18, 2} | {4, 8, 16, 32} | 88.1M | 282G |
| Swin-L | 192 | {2, 2, 18, 2} | {6, 12, 24, 48} | 197.0M | 604G |

**Kinetics-400 主要结果**：

| 方法 | 预训练 | Top-1 | FLOPs | 参数量 |
|------|--------|-------|-------|--------|
| TimeSformer-L | IN-21K | 80.7 | 2380G | 121.4M |
| ViViT-L/16x2 | IN-21K | 81.3 | 3992G | 310.8M |
| MViT-B, 64×3 | — | 81.2 | 455G | 36.6M |
| **Swin-B** | **IN-21K** | **82.7** | **282G** | **88.1M** |
| **Swin-L (384↑)** | **IN-21K** | **84.9** | **2107G** | **200.0M** |
| ViViT-H/16x2 | JFT-300M | 84.8 | 8316G | 647.5M |

> 💡 **关键发现**：Swin-B 仅用 ImageNet-21K 预训练就超越了使用相同预训练的 ViViT-L（82.7 vs 81.3），且 FLOPs 仅为其 1/14。Swin-L (384↑) 以 84.9% 的 Top-1 精度超越了使用 JFT-300M 预训练的 ViViT-H（84.8%），同时参数量仅为其 1/3。

**消融实验——时空注意力设计**：

| 注意力方式 | Top-1 | FLOPs | 参数量 |
|-----------|-------|-------|--------|
| Joint（默认） | 78.8 | 88G | 28.2M |
| Factorized | 78.5 | 95G | 36.5M |
| Split | 76.4 | 83G | 42.0M |

Joint 方式（在 3D 窗口内联合计算时空注意力）取得了最佳的速度-精度权衡。这得益于空间局部性假设：在局部窗口内联合计算时空注意力的开销远小于全局联合注意力，同时保持了建模效果。

**消融实验——时间窗口大小**：

| 时间维度 | 窗口大小 | Top-1 | FLOPs |
|---------|---------|-------|-------|
| 16 | 16×7×7 | 79.1 | 106G |
| 16 | 8×7×7 | 78.8 | 88G |
| 16 | 4×7×7 | 78.6 | 79G |

时间窗口大小为 8 时仅比全局时间窗口（16）低 0.3%，但计算量减少 17%，体现了局部时间注意力的高效性。

##### 与传统方法的核心区别

1. **vs 全局注意力方法（TimeSformer, ViViT）**：Video Swin Transformer 通过局部 3D 窗口将计算复杂度从 \(O(T^2H^2W^2)\) 降低到 \(O(THW \cdot PM^2)\)，在相同精度下 FLOPs 降低一个数量级以上。
2. **vs 分解注意力方法（TimeSformer-Divided, ViViT-Factorized）**：分解方法将时空注意力拆分为独立的空间和时间注意力层，丢失了时空联合建模能力。Video Swin Transformer 在局部窗口内保持了联合时空注意力，通过 shifted window 扩展感受野。
3. **vs 3D CNN 方法（SlowFast, X3D）**：Transformer 架构具有更强的全局建模能力（通过多层 shifted window 逐步扩大感受野），且更容易利用大规模预训练。实验表明 Swin-B (IN-21K) 以 82.7% 显著超越 SlowFast R101+NL 的 79.8%。

#### 🧪 练习题

```yaml
question: "Video Swin Transformer 中 3D Shifted Window 机制的主要作用是什么？"
options:
  - "减少模型参数量"
  - "在不同 3D 窗口之间建立信息交互，扩大感受野"
  - "对时间维度进行下采样以降低计算量"
  - "替代 3D 相对位置偏置编码"
answer: 1
explain: "3D Shifted Window 通过在连续 Transformer 层间交替移位窗口位置，使得原本属于不同窗口的 token 被分配到同一窗口中计算注意力，从而实现跨窗口的信息传递和感受野扩展。"
```