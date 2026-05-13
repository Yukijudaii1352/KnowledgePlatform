### Swin Transformer: Hierarchical Vision Transformer using Shifted Windows

```yaml
id: swin_transformer
name: Swin Transformer
full_name: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows"
year: 2021
org: Microsoft Research Asia
paper_url: https://arxiv.org/abs/2103.14030
category: visual_model
parent: —
motivation: 通过移位窗口机制实现层级化视觉Transformer，将自注意力计算限制在局部窗口内实现线性复杂度
```

---

## 📝 一句话总结

Swin Transformer 提出了一种**基于移位窗口（Shifted Window）的层级化视觉 Transformer**，通过在非重叠局部窗口内计算自注意力并在连续层间移位窗口以实现跨窗口连接，在保持**线性计算复杂度**的同时构建多尺度特征图，成为图像分类、目标检测和语义分割等视觉任务的通用骨干网络。

---

## 🎯 核心要点

### 1. 要解决什么问题？

标准 Vision Transformer（ViT）对所有 token 做全局自注意力，计算复杂度为 $O(n^2)$（$n$ 为 token 数），这在高分辨率密集预测任务（如检测、分割）中代价极高。同时 ViT 只输出单一分辨率的特征图，无法直接适配需要多尺度特征的 FPN/UNet 等密集预测框架。

**核心矛盾**：如何在保留 Transformer 强大建模能力的同时，实现 (1) 对图像尺寸的线性复杂度；(2) 层级化多尺度特征表示。

### 2. 用了什么方法？

| 设计要素 | 具体做法 |
|---------|---------|
| **窗口自注意力 (W-MSA)** | 将特征图划分为 $M \times M$（默认 $7 \times 7$）的非重叠窗口，仅在窗口内部做自注意力，复杂度从 $O((HW)^2)$ 降至 $O(HW \cdot M^2)$ |
| **移位窗口自注意力 (SW-MSA)** | 在连续的 Transformer 层间，将窗口划分方式移位 $(\lfloor M/2 \rfloor, \lfloor M/2 \rfloor)$ 个像素，使相邻窗口间产生信息交互 |
| **循环移位 + 掩码** | 通过对特征图做 cyclic shift 将移位后的小窗口拼入大窗口，配合注意力掩码屏蔽不相邻区域，保持窗口数量不变，避免 padding 带来的额外计算 |
| **层级化结构 (Patch Merging)** | 4 个 Stage 逐步合并相邻 $2 \times 2$ patch 并降采样，分辨率依次为 $\frac{H}{4} \times \frac{W}{4}$、$\frac{H}{8} \times \frac{W}{8}$、$\frac{H}{16} \times \frac{W}{16}$、$\frac{H}{32} \times \frac{W}{32}$，类似 CNN 的多尺度金字塔 |
| **相对位置偏置** | 在注意力计算中加入可学习的相对位置偏置 $B \in \mathbb{R}^{M^2 \times M^2}$，取代绝对位置编码，效果更优且可通过双三次插值迁移到不同窗口大小 |

### 3. 效果如何？

| 任务 | 数据集 | 指标 | Swin 结果 | 对比提升 |
|------|--------|------|-----------|---------|
| 图像分类 | ImageNet-1K | Top-1 Acc | **87.3%** (Swin-L↑384) | 超越 ViT/DeiT |
| 目标检测 | COCO test-dev | Box AP | **58.7** | +2.7 vs 前SOTA |
| 实例分割 | COCO test-dev | Mask AP | **51.1** | +2.6 vs 前SOTA |
| 语义分割 | ADE20K val | mIoU | **53.5** | +3.2 vs 前SOTA |

---

## 🔬 深入细节

### 整体架构

![Swin Transformer 架构总览](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png)

Swin Transformer 采用 **4 阶段层级化设计**，整体流程如下：

1. **Patch Partition + Linear Embedding**：将输入图像 $H \times W \times 3$ 切分为 $4 \times 4$ 的非重叠 patch，每个 patch 展平为 48 维向量，再通过线性层映射到 $C$ 维，得到 $\frac{H}{4} \times \frac{W}{4} \times C$ 的 token 序列。

2. **Stage 1**：在 $\frac{H}{4} \times \frac{W}{4}$ 分辨率上堆叠若干 Swin Transformer Block（每两个连续 Block 分别使用 W-MSA 和 SW-MSA）。

3. **Patch Merging**：将相邻 $2 \times 2$ 的 token 拼接（通道维度变为 $4C$），再通过线性层降至 $2C$，空间分辨率减半。

4. **Stage 2/3/4**：重复上述 Block + Merging 过程，通道数依次为 $2C$、$4C$、$8C$，分辨率依次为 $\frac{H}{8}$、$\frac{H}{16}$、$\frac{H}{32}$。

**架构变体**：

| 变体 | 通道数 $C$ | 各 Stage 层数 | 参数量 | FLOPs | 对标 |
|------|-----------|--------------|--------|-------|------|
| Swin-T | 96 | {2, 2, 6, 2} | 29M | 4.5G | ResNet-50 |
| Swin-S | 96 | {2, 2, 18, 2} | 50M | 8.7G | ResNet-101 |
| Swin-B | 128 | {2, 2, 18, 2} | 88M | 15.4G | ViT-B |
| Swin-L | 192 | {2, 2, 18, 2} | 197M | 34.5G | — |

### 窗口自注意力与移位窗口机制

![移位窗口示意图](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x2.png)

**核心思想**：在连续两层 Transformer Block 中交替使用**常规窗口划分**和**移位窗口划分**，实现窗口间的信息流动。

**常规窗口自注意力 (W-MSA)**：将 $h \times w$ 的特征图均匀划分为 $\lceil h/M \rceil \times \lceil w/M \rceil$ 个 $M \times M$ 窗口，每个窗口内独立计算多头自注意力。

**计算复杂度对比**（对于 $h \times w$ 的特征图，$M$ 为窗口大小）：

$$\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C$$

$$\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$$

当 $M$ 固定（默认为 7）时，W-MSA 对图像尺寸 $hw$ 为**线性复杂度**，而全局 MSA 为**二次复杂度**。

**移位窗口自注意力 (SW-MSA)**：将窗口划分方式沿两个方向各移位 $\lfloor M/2 \rfloor$ 个像素。移位后，原本处于不同窗口边界的 token 被划入同一窗口，从而建立跨窗口连接。

**连续两层的计算公式**：

$$\hat{z}^l = \text{W-MSA}(\text{LN}(z^{l-1})) + z^{l-1}$$

$$z^l = \text{MLP}(\text{LN}(\hat{z}^l)) + \hat{z}^l$$

$$\hat{z}^{l+1} = \text{SW-MSA}(\text{LN}(z^l)) + z^l$$

$$z^{l+1} = \text{MLP}(\text{LN}(\hat{z}^{l+1})) + \hat{z}^{l+1}$$

### 循环移位与高效批量计算

移位窗口划分会在特征图边界产生**不足 $M \times M$ 的小窗口**，朴素做法是 padding 到 $M \times M$ 再用掩码屏蔽，但这会增加窗口数量（从 $\lceil h/M \rceil \times \lceil w/M \rceil$ 增至 $(\lceil h/M \rceil+1) \times (\lceil w/M \rceil+1)$），带来额外计算开销。

**Swin 的高效方案——循环移位（Cyclic Shift）**：

```
算法: 高效移位窗口注意力
输入: 特征图 X ∈ R^{h×w×C}, 窗口大小 M, 移位量 s = ⌊M/2⌋

1. 循环移位: X' = torch.roll(X, shifts=(-s, -s), dims=(1, 2))
   # 将左上角 s 行 s 列的像素循环搬到右下角
   
2. 窗口划分: 将 X' 划分为 ⌈h/M⌉ × ⌈w/M⌉ 个 M×M 窗口
   # 窗口数量与常规划分完全相同！
   
3. 掩码注意力: 对每个窗口计算自注意力
   # 对于包含来自不同原始区域的 token 的窗口，
   # 使用注意力掩码（将不相邻区域的注意力权重设为 -inf）
   # 确保不相邻的 token 之间不会产生注意力交互
   
4. 逆循环移位: Y = torch.roll(Y', shifts=(s, s), dims=(1, 2))
   # 将结果还原到原始位置

输出: Y ∈ R^{h×w×C}
```

**关键优势**：通过 cyclic shift，移位窗口划分的窗口数量与常规划分**完全相同**，配合掩码机制保证了计算正确性，实现了零额外计算开销的跨窗口信息交互。

### 相对位置偏置

在计算注意力时，为每个头引入可学习的相对位置偏置矩阵：

$$\text{Attention}(Q, K, V) = \text{SoftMax}\left(\frac{QK^T}{\sqrt{d}} + B\right)V$$

其中 $B$ 从一个大小为 $(2M-1) \times (2M-1)$ 的参数表 $\hat{B}$ 中按相对位置索引取值。对于 $M=7$ 的窗口，相对位置沿每个轴的范围为 $[-6, 6]$，因此参数表大小为 $13 \times 13 = 169$。

**相比绝对位置编码的优势**：
- 消融实验显示相对位置偏置比无位置编码提升约 **+2.5%** ImageNet Top-1 准确率
- 比绝对位置编码提升约 **+1.0%**
- 预训练的位置偏置可通过**双三次插值**迁移到不同窗口大小的微调任务

---

## 🧪 练习题

### 概念理解

1. **为什么 Swin Transformer 的计算复杂度对图像尺寸是线性的，而 ViT 是二次的？** 请从注意力计算的 token 数量角度解释。

2. **移位窗口机制如何在不增加计算量的情况下实现跨窗口信息交互？** 请描述 cyclic shift + mask 的完整流程。

3. **Patch Merging 层的作用是什么？它与 CNN 中的哪个操作类似？** 请说明通道数和空间分辨率的变化。

### 公式推导

4. **推导 W-MSA 和全局 MSA 的计算复杂度公式**。假设特征图大小为 $h \times w$，通道数为 $C$，窗口大小为 $M \times M$，多头注意力的头数为 $k$，每个头的维度为 $d = C/k$。

5. **计算 Swin-T 在输入 $224 \times 224$ 图像时各 Stage 的 token 数量和特征维度**。

### 代码实现

6. **实现循环移位和逆移位操作**：给定一个 $14 \times 14$ 的特征图和 $M=7$，写出 `torch.roll` 的调用方式，并画出移位前后的窗口划分示意。

7. **实现相对位置偏置索引表的构造**：对于 $M=7$ 的窗口，构造从 $(i, j)$ token 对到 $(2M-1) \times (2M-1)$ 参数表的索引映射。

### 扩展思考

8. **如果将窗口大小 $M$ 设为与特征图等大（即 $M = h = w$），Swin Transformer 退化为什么模型？此时复杂度如何？**

9. **Swin Transformer 的移位窗口策略与卷积神经网络的局部感受野有何异同？经过多少层后，Swin 的有效感受野可以覆盖整个特征图？**

10. **Swin Transformer 如何作为密集预测任务（如目标检测、语义分割）的骨干网络？它输出的多尺度特征如何与 FPN 配合？**