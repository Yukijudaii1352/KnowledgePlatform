### RS2-SAM 2: SAM 2 Enhanced for Remote Sensing Referring Image Segmentation

```yaml
id: rs2_sam2
name: RS2-SAM 2
full_name: "RS2-SAM 2: SAM 2 增强的遥感指代图像分割框架"
year: "2025"
org: "WHU + HKUST + Horizon Robotics"
paper_url: "https://arxiv.org/abs/2503.07266"
category: "remote_sensing_segmentation"
parent: "SAM 2"
motivation: "通过联合编码器、双向层级融合、掩码提示生成器和文本引导边界损失四大模块增强SAM 2，使其适配遥感指代图像分割任务"
```

#### 📝 一句话总结

RS2-SAM 2 提出了一个端到端框架，通过联合编码器实现视觉-文本语义对齐、双向层级融合模块实现多尺度跨模态交互、掩码提示生成器提供密集像素级引导、以及文本引导边界损失强化边界精度，全面增强 SAM 2 在遥感指代图像分割（RRSIS）任务上的表现，在 RefSegRS 和 RRSIS-D 两个基准上取得 SOTA。

#### 🎯 核心要点

- **Union Encoder（BEiT-3）**：联合编码图像-文本对，产出语义对齐的视觉特征 \(F_v\)、文本特征 \(F_t\) 和多模态 [CLS] token \(V_{cls}\)
- **Bidirectional Hierarchical Fusion Module (BHFM)**：在 SAM2-Hiera 编码器每一层嵌入双向交叉注意力，实现文本→视觉和视觉→文本的逐层增强；编码后通过 MHCA + 逐元素乘法进一步融合高层语义
- **Mask Prompt Generator (MPG)**：利用多模态 [CLS] token 与视觉嵌入的交叉注意力生成伪掩码，作为 SAM 2 解码器的密集提示
- **Text-guided Boundary Loss (TBL)**：基于梯度的边界检测 + 文本权重加权 MSE 损失，专门优化目标边界精度
- **总损失函数**：\(\mathcal{L} = \lambda_{ce}\mathcal{L}_{ce} + \lambda_{dice}\mathcal{L}_{dice} + \lambda_{tbl}\mathcal{L}_{tbl}\)，权重分别为 1、0.1、0.2
- **SOTA 性能**：RefSegRS 测试集 oIoU 80.87% / mIoU 73.90%；RRSIS-D 测试集 oIoU 78.99% / mIoU 66.72%
- **训练配置**：SAM2-Hiera-Large + BEiT-3-Large，8×RTX4090，输入分辨率 1024²（SAM2）+ 224²（BEiT-3），AdamW 优化器

#### 🔬 深入细节

##### 架构总览

![RS2-SAM 2 整体架构图](https://arxiv.org/html/2503.07266v1/x2.png)
*图：RS2-SAM 2 整体框架。左侧为 Union Encoder（BEiT-3）联合编码图像-文本对；中间为 SAM2-Hiera 图像编码器，每层嵌入 BHFM Layer 进行双向融合；右侧为 Mask Prompt Generator 生成密集掩码提示送入 SAM 2 Mask Decoder。*

##### 算法伪代码

```python
# RS2-SAM 2 前向推理流程
def forward(image, text):
    # 1. Union Encoder: BEiT-3 联合编码
    F_v, F_t, V_cls = BEiT3_encode(image_224, text)  # 语义对齐特征
    
    # 2. SAM2-Hiera 编码 + BHFM Layer（逐层双向融合）
    F_hiera = image_1024  # SAM2 输入
    for layer_i in SAM2_Hiera_Layers:
        F_hiera = layer_i(F_hiera)
        # 双向交叉注意力
        F_hiera = α_i * MHCA(Q=F_hiera, KV=F_t) + F_hiera  # α_i=0.5
        F_t = α_t * MHCA(Q=F_t, KV=F_hiera) + F_t          # α_t=0.2
    
    # 3. 编码后融合（BHFM Post-encoding）
    F_vt = MHCA(Q=F_hiera, KV=F_t) * F_hiera  # element-wise multiply
    
    # 4. Mask Prompt Generator
    V_cls_enhanced = MHCA(Q=V_cls, KV=F_vt)  # 增强多模态token
    mask_prompt = MLP(V_cls_enhanced)          # 生成伪掩码 H/4 × W/4
    
    # 5. SAM 2 Mask Decoder
    pred_mask = SAM2_Decoder(F_vt, mask_prompt)
    return pred_mask

# 损失计算
L = L_ce + 0.1 * L_dice + 0.2 * L_tbl
```

##### 动机与背景

遥感指代图像分割（RRSIS）要求根据自然语言描述从遥感图像中分割出特定目标。与自然场景不同，遥感场景面临三大挑战：

1. **低视觉区分度**：同类目标外观高度相似（如密集排列的建筑），需要强语言引导才能定位
2. **小目标与密集排列**：遥感图像中目标往往很小且密集，边界模糊
3. **复杂背景**：鸟瞰视角下背景杂乱，干扰严重

SAM 2 虽然具有强大的分割能力，但其设计面向通用场景的点/框/掩码提示，缺乏文本理解能力，无法直接用于 RRSIS。现有方法（如 RMSIN、FIANet）虽引入了跨模态融合，但融合层次单一、缺乏对 SAM 系列模型的有效适配。

##### 核心机制详解

**1. Union Encoder（联合编码器）**

采用预训练的 BEiT-3（Large）作为联合编码器，将图像 patch 和文本 token 视为统一的"外语"进行联合编码。输入图像缩放至 224×224 后分割为 16×16 patch，与文本 token 拼接后送入 BEiT-3：

$$
[V_{cls}, F_v, F_t] = \text{BEiT-3}([I_{patch}, T_{token}])
$$

其中 \(V_{cls} \in \mathbb{R}^{1 \times C}\) 是多模态 [CLS] token，\(F_v \in \mathbb{R}^{N_v \times C}\) 是视觉特征，\(F_t \in \mathbb{R}^{N_t \times C}\) 是文本特征。联合编码确保了视觉和文本特征在同一语义空间中对齐。

**2. Bidirectional Hierarchical Fusion Module (BHFM)**

BHFM 分为两个阶段：

*编码中融合（BHFM Layer）*：在 SAM2-Hiera 编码器的每一层嵌入轻量级双向交叉注意力：

$$
F_v^{(l)'} = \alpha_i \cdot \text{MHCA}(Q{=}F_v^{(l)}, KV{=}F_t) + F_v^{(l)}, \quad \alpha_i = 0.5
$$

$$
F_t^{(l)'} = \alpha_t \cdot \text{MHCA}(Q{=}F_t, KV{=}F_v^{(l)}) + F_t, \quad \alpha_t = 0.2
$$

这种设计使得文本语义从低层到高层逐步注入视觉特征，同时视觉信息也反向增强文本表征的空间感知能力。加权残差（\(\alpha_i > \alpha_t\)）确保视觉特征获得更多语言增强，而文本特征保持稳定。

*编码后融合（BHFM Cross-attention）*：编码完成后，对高层视觉特征进行文本引导的精炼：

$$
F_{vt} = \text{MHCA}(Q{=}F_v, KV{=}F_t) \odot F_v
$$

逐元素乘法起到门控作用，让文本相关区域的视觉特征被增强，无关区域被抑制。

> 💡 **关键设计思想**：消融实验表明，双向融合（Bi）比单向融合（Uni）提升 3.8% mIoU，比线性适配器（Linear）提升 5.7% mIoU。编码中（BL）和编码后（BC）的融合缺一不可，两者结合实现了从全局到局部的层级文本理解。

**3. Mask Prompt Generator (MPG)**

SAM 2 的解码器需要提示来指导分割。MPG 利用多模态 [CLS] token 生成密集掩码提示：

$$
V_{cls}' = \text{MHCA}(Q{=}V_{cls}, KV{=}F_{vt})
$$

$$
M_{prompt} = \text{MLP}(V_{cls}') \in \mathbb{R}^{H/4 \times W/4}
$$

\(V_{cls}\) 聚合了全局多模态语义，通过与融合后的视觉特征交互，生成的伪掩码能精确指示目标位置。消融实验显示，加入 MHCA 交互比直接使用 \(V_{cls}\) 提升 2.31% mIoU。

**4. Text-guided Boundary Loss (TBL)**

遥感目标边界模糊是核心难点。TBL 通过梯度算子检测预测掩码和真值掩码的边界，并用文本相关性加权：

$$
\nabla M = \sqrt{\left(\frac{\partial M}{\partial x}\right)^2 + \left(\frac{\partial M}{\partial y}\right)^2}
$$

文本权重 \(w_t\) 通过文本特征与视觉特征的余弦相似度计算，使得文本描述相关区域的边界获得更高的优化权重：

$$
\mathcal{L}_{tbl} = \frac{1}{N} \sum_{i=1}^{N} w_t^{(i)} \cdot (\nabla M_{pred}^{(i)} - \nabla M_{gt}^{(i)})^2
$$

> ⚠️ **注意**：TBL 单独使用仅带来 ~2% 提升，但与 BHFM 和 MPG 配合时效果显著，说明边界损失需要在良好的特征融合基础上才能发挥作用。

##### 实验结果

| 数据集 | 划分 | oIoU | mIoU | Pr@0.5 | Pr@0.7 | Pr@0.9 |
|--------|------|------|------|--------|--------|--------|
| RefSegRS | Val | 88.03 | 85.21 | 93.63 | 88.24 | 52.94 |
| RefSegRS | Test | 80.87 | 73.90 | 84.31 | 70.89 | 21.19 |
| RRSIS-D | Val | 80.16 | 68.81 | 79.09 | 60.18 | 13.45 |
| RRSIS-D | Test | 78.99 | 66.72 | 77.27 | 57.27 | 11.82 |

与 SOTA 方法对比（RefSegRS Test）：

| 方法 | Backbone | oIoU | mIoU |
|------|----------|------|------|
| RMSIN (TGRS'24) | Swin-B | 72.65 | 63.67 |
| FIANet (CVPR'24) | Swin-B | 73.41 | 65.53 |
| **RS2-SAM 2** | SAM2-Hiera-L + BEiT-3-L | **80.87** | **73.90** |

##### 消融实验

| 配置 | mIoU | oIoU | Δ mIoU |
|------|------|------|--------|
| Baseline (SAM2 + Union Encoder) | 36.64 | 55.51 | — |
| + TBL | 38.63 | 57.36 | +1.99 |
| + TBL + MPG | 60.20 | 70.89 | +23.56 |
| + TBL + BHFM | 68.71 | 78.36 | +32.07 |
| + TBL + MPG + BHFM (Full) | **73.90** | **80.87** | **+37.26** |

BHFM 结构对比：

| 结构 | mIoU | oIoU |
|------|------|------|
| Linear (无文本交互) | 68.19 | 77.39 |
| Uni (单向：文本→视觉) | 70.10 | 78.93 |
| **Bi (双向)** | **73.90** | **80.87** |

#### 🧪 练习题

```yaml
question: "RS2-SAM 2 中 Bidirectional Hierarchical Fusion Module 的双向交叉注意力权重设置为 α_i=0.5, α_t=0.2，这种不对称设计的主要原因是什么？"
options:
  - "文本特征维度更低，需要较小的学习率"
  - "视觉特征需要更多语言增强来定位目标，而文本特征应保持语义稳定性"
  - "为了减少计算量，文本分支使用更小的权重"
  - "SAM 2 的 Hiera 编码器对大权重更新不稳定"
answer: 1
explain: "在 RRSIS 任务中，视觉特征需要大量语言信息来区分外观相似的目标（α_i=0.5），而文本特征本身语义明确，过多视觉信息注入可能破坏其语义表征，因此使用较小权重（α_t=0.2）保持稳定。"
```