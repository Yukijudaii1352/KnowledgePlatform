### 掩码Former2 (Mask2Former)

```yaml
id: mask2former
name: Mask2Former
full_name: "掩码Former2 (Mask2Former)"
year: "2022"
org: FAIR
paper_url: https://arxiv.org/abs/2112.01527
category: unified
parent: maskformer
motivation: "掩码注意力机制三任务SOTA"
```

#### 📝 一句话总结

Mask2Former 在 MaskFormer 基础上引入掩码注意力（masked attention）机制，将 Transformer 解码器的交叉注意力限制在预测掩码的前景区域内，结合高效多尺度特征策略和优化改进，以统一架构在全景分割、实例分割和语义分割三大任务上同时达到 SOTA。

#### 🎯 核心要点

- 掩码注意力（Masked Attention）：将标准交叉注意力限制在前一层预测掩码的前景区域内，加速收敛并提升性能
- 高效多尺度策略：以 round-robin 方式将不同分辨率特征图（1/32、1/16、1/8）轮流送入连续 Transformer 层，避免高分辨率特征的计算爆炸
- 优化改进：可学习 query 替代零初始化、交换 self-attention 与 cross-attention 顺序、去除 Transformer decoder 中的 dropout
- 训练效率：使用点采样（point sampling）计算匹配损失和训练损失，训练内存降低 3 倍
- 统一架构：同一模型结构无需修改即可处理全景/实例/语义分割三大任务
- 可学习 query 可作为区域提议（region proposals），在未经 Transformer 解码前即提供高质量掩码候选

#### 🔬 深入细节

![Mask2Former 架构总览](https://ar5iv.labs.arxiv.org/html/2112.01527/assets/x1.png)
*图：Mask2Former 整体架构。左侧为像素解码器（pixel decoder）提取多尺度特征，右侧为带掩码注意力的 Transformer 解码器逐层精化 query 并生成掩码预测。*

##### 动机与背景

MaskFormer 证明了掩码分类（mask classification）范式可以统一语义分割和全景分割。然而其 Transformer 解码器直接采用标准交叉注意力，每个 query 关注全局所有像素位置，导致：
1. 收敛速度慢（需要大量训练迭代）
2. 在实例分割等需要精细定位的任务上性能不足
3. 无法有效利用高分辨率特征（计算量过大）

Mask2Former 的核心思想是：**每个 query 只需关注其对应掩码区域内的特征**，而非全局所有像素，这既是合理的归纳偏置，又能显著降低计算复杂度。

##### 核心机制：掩码注意力

标准交叉注意力的公式为：

$$X_l = \text{softmax}(Q_l K_l^T) V_l + X_{l-1}$$

Mask2Former 提出的掩码注意力在 attention 矩阵中引入掩码约束：

$$X_l = \text{softmax}(\mathcal{M}_{l-1} + Q_l K_l^T) V_l + X_{l-1}$$

其中掩码项 \(\mathcal{M}_{l-1}\) 定义为：

$$\mathcal{M}_{l-1}(x, y) = \begin{cases} 0 & \text{if } M_{l-1}(x, y) = 1 \\ -\infty & \text{otherwise} \end{cases}$$

这里 \(M_{l-1}\) 是第 \(l-1\) 层 Transformer 解码器输出的二值掩码预测（通过阈值 0.5 获得），\(Q_l\) 来自 query 特征的线性变换，\(K_l, V_l\) 来自像素解码器特征的线性变换。

> 💡 关键：掩码注意力的直觉是——如果一个 query 负责预测某个物体/区域的掩码，那么它只需要从该区域内的像素收集信息即可。将掩码外的位置设为 \(-\infty\) 使得 softmax 后这些位置的权重为 0。

对于第一层（\(l=1\)），由于尚无预测掩码，使用可学习 query 通过 MLP 生成的初始掩码预测作为 \(M_0\)。

```python
# Mask2Former 掩码注意力伪代码
def masked_cross_attention(query_feat, pixel_feat, prev_mask_pred):
    """
    query_feat: (N, C) - N个query的特征
    pixel_feat: (H*W, C) - 像素解码器输出的特征图
    prev_mask_pred: (N, H, W) - 上一层的掩码预测
    """
    Q = linear_q(query_feat)        # (N, C)
    K = linear_k(pixel_feat)        # (H*W, C)
    V = linear_v(pixel_feat)        # (H*W, C)
    
    # 计算注意力分数
    attn = Q @ K.T / sqrt(C)        # (N, H*W)
    
    # 构造掩码: 前景=0, 背景=-inf
    binary_mask = (prev_mask_pred.flatten(1) < 0.5)  # True for background
    attn[binary_mask] = -inf
    
    # softmax + 加权求和
    attn = softmax(attn, dim=-1)
    output = attn @ V + query_feat  # 残差连接
    return output
```

##### 高效多尺度特征策略

像素解码器（默认使用 Multi-Scale Deformable Attention, MSDeformAttn）生成三个尺度的特征图：1/32、1/16、1/8 分辨率。

传统做法是将所有尺度特征拼接后送入每一层 Transformer 解码器，但这会导致极高的计算量（尤其是 1/8 分辨率）。Mask2Former 采用 **round-robin** 策略：

- 第 1、4、7 层使用 1/8 分辨率特征（高分辨率，捕捉细节）
- 第 2、5、8 层使用 1/16 分辨率特征
- 第 3、6、9 层使用 1/32 分辨率特征（低分辨率，捕捉全局）

每 3 层为一个 resolution cycle，共重复 3 次（9 层总计）。每个 cycle 结束时都会产生一个掩码预测，用于监督。

> ⚠️ 注意：由于掩码注意力将每个 query 的注意力限制在其掩码区域内，即使使用高分辨率 1/8 特征，实际参与计算的像素数量也远小于全图，因此计算量可控。

##### 优化改进

1. **可学习 query**：使用可学习的 query 特征（而非零初始化），这些 query 在训练后可以作为类似"区域提议"的角色，在进入 Transformer 解码器前就能产生有意义的掩码预测（AR@100 达到 ~40）。

2. **Self-attention 与 Cross-attention 顺序交换**：将原始 Transformer 解码器中"先 self-attention 再 cross-attention"的顺序改为"先 cross-attention 再 self-attention"。这使得 query 先从图像特征中获取信息，再进行 query 间的交互。

3. **去除 dropout**：在 Transformer 解码器中去除 dropout，因为掩码注意力本身已经提供了足够的正则化效果。

##### 训练效率：点采样损失

为了降低训练内存，Mask2Former 采用 PointRend 中的均匀采样策略：

- 在计算匹配损失（Hungarian matching）和最终训练损失时，不计算完整掩码上的损失
- 而是从掩码中均匀采样 \(K\) 个点（默认 \(K=12544\)）计算二值交叉熵损失
- 这将训练内存从 18GB 降低到 6GB（3 倍减少），且不影响性能

##### 与 MaskFormer 的关键区别

| 特性 | MaskFormer | Mask2Former |
|------|-----------|-------------|
| 交叉注意力 | 标准全局注意力 | 掩码注意力（限制在前景区域） |
| 特征分辨率 | 单尺度（1/32 或 1/16） | 多尺度 round-robin（1/8~1/32） |
| Query 初始化 | 零初始化 | 可学习 query |
| Attention 顺序 | self → cross | cross → self |
| 训练损失 | 全掩码计算 | 点采样计算 |
| 实例分割 AP | 较低 | 显著提升（+5.1 AP） |

##### 实验结果

Mask2Former 在三大分割任务上均达到 SOTA：
- **全景分割**：COCO val 57.8 PQ（Swin-L backbone）
- **实例分割**：COCO val 50.1 AP（Swin-L backbone），首次以掩码分类方法超越专用检测器
- **语义分割**：ADE20K val 57.7 mIoU（Swin-L backbone）

消融实验表明，掩码注意力是最重要的组件，在所有三个任务上贡献最大的性能提升。

#### 🧪 练习题

```yaml
question: "Mask2Former 中掩码注意力（Masked Attention）的核心机制是什么？"
options:
  - "使用可变形注意力替代标准注意力以降低计算量"
  - "将交叉注意力限制在上一层预测掩码的前景区域内"
  - "在注意力计算中加入位置编码以增强空间感知"
  - "使用多头注意力的不同头关注不同尺度的特征"
answer: 1
explain: "掩码注意力通过将掩码外位置的注意力权重设为-∞（softmax后为0），使每个query仅关注其预测掩码的前景区域，既提供了合理的归纳偏置又加速了收敛。"
```