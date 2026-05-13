### InternImage

```yaml
id: internimage
name: "InternImage: Exploring Large-Scale Vision Foundation Models with Deformable Convolutions"
year: 2022.11
organization: 上海AI实验室 / 清华大学 / 南京大学 / 香港中文大学
paper_url: "https://openaccess.thecvf.com/content/CVPR2023/papers/Wang_InternImage_Exploring_Large-Scale_Vision_Foundation_Models_With_Deformable_Convolutions_CVPR_2023_paper.pdf"
category: foundation
parent: convnext
motivation: 以可变形卷积（DCN）为核心算子，构建可扩展至10亿参数的CNN基础模型，证明CNN同样具备与ViT匹敌的大规模表征学习能力
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

1. **概念理解**：DCNv3 相比 DCNv2 的三项改进分别解决了什么问题？如果去掉 softmax 归一化改回 sigmoid，在大规模训练中可能出现什么现象？

2. **公式推导**：假设 InternImage-T 的某一层有 $C=256$ 个通道、$G=16$ 组、$K=9$ 个采样点，请计算 DCNv3 算子中共享投影权重 $\mathbf{w}_g$ 的总参数量，并与 DCNv2 中独立权重 $\mathbf{w}_k$ 的参数量进行对比。

3. **架构分析**：InternImage 的 "AABA" 堆叠规则意味着 Stage 3 拥有最多的 block。结合特征图分辨率和通道数的变化，分析为什么将计算量集中在 Stage 3 是合理的设计选择。

4. **实验对比**：论文中 InternImage-B（97M 参数）在 ImageNet-1K 上达到 84.9% top-1 准确率，而 ConvNeXt-B（89M）为 83.8%。请从算子设计（静态卷积 vs 动态可变形卷积）的角度分析这 1.1% 的性能差距可能来源于哪些因素。

5. **扩展思考**：DCNv3 的多组机制与 Transformer 中的多头注意力（MHSA）在功能上有何异同？如果将 DCNv3 中的 3×3 网格采样点扩展为更多点（如 5×5 = 25 个点），可能带来什么收益和代价？