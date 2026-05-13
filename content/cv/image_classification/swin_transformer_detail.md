### Swin Transformer — 移动窗口Transformer (Shifted Window Transformer)

```yaml
id: swin_transformer
name: Swin Transformer
full_name: 移动窗口Transformer (Shifted Window Transformer)
year: '2021.03'
org: 微软亚洲研究院
paper_url: https://arxiv.org/abs/2103.14030
category: vit_era
parent: vit
motivation: 引入移动窗口机制，将计算复杂度降至线性并构建层级特征
```

#### 📝 一句话总结

Swin Transformer 提出了基于**移动窗口（Shifted Window）**的层级式 Vision Transformer 架构，通过在局部窗口内计算自注意力将复杂度从二次降至线性，并借助窗口移位策略实现跨窗口信息交互，使 Transformer 首次作为通用视觉骨干在分类、检测、分割任务上全面超越 CNN。

#### 🎯 核心要点

- **层级式特征金字塔**：通过 Patch Merging 逐阶段下采样（4×→8×→16×→32×），生成多尺度特征图，可直接替代 CNN 骨干接入 FPN/UPerNet 等下游头
- **窗口自注意力（W-MSA）**：将特征图划分为不重叠的 \(M \times M\) 局部窗口，在窗口内计算自注意力，复杂度从 \(O((hw)^2)\) 降至 \(O(M^2 \cdot hw)\)，对输入尺寸线性
- **移动窗口自注意力（SW-MSA）**：相邻 Transformer 块交替使用常规窗口与移位窗口（偏移 \(\lfloor M/2 \rfloor\) 像素），在不增加计算量的前提下建立跨窗口连接
- **循环移位 + 掩码的高效实现**：通过向左上方循环移位将移位后的子窗口拼回等大窗口，配合注意力掩码保证正确性，避免窗口数量增加
- **相对位置偏置（Relative Position Bias）**：在注意力矩阵中加入可学习的相对位置偏置 \(B\)，替代绝对位置编码，效果更优且支持跨分辨率迁移
- **四种模型变体**：Swin-T / S / B / L，分别对标 ResNet-50 / ResNet-101 / ViT-B / 更大模型，覆盖不同计算预算

#### 🔬 深入细节

##### 整体架构

![Swin Transformer 架构总览](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser11.png)
*图 1：(a) Swin Transformer 构建层级特征图，仅在局部窗口内计算自注意力，复杂度对输入尺寸线性；(b) ViT 生成单一低分辨率特征图，全局自注意力导致二次复杂度。*

![Swin Transformer Block 结构](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png)
*图 2：(a) Swin-T 整体架构；(b) 连续两个 Swin Transformer Block，交替使用 W-MSA 和 SW-MSA。*

Swin Transformer 的整体流程如下：

1. **Patch Splitting + Linear Embedding（Stage 1 入口）**：输入 RGB 图像被切分为 \(4 \times 4\) 的不重叠 patch，每个 patch 展平为 48 维向量，经线性层投影到 \(C\) 维，得到 \(\frac{H}{4} \times \frac{W}{4}\) 个 token。
2. **Swin Transformer Blocks**：在每个 Stage 内，多个 Swin Transformer Block 对 token 序列进行特征变换，token 数量不变。
3. **Patch Merging（Stage 2/3/4 入口）**：将相邻 \(2 \times 2\) 个 token 的特征拼接（4C 维），再经线性层降至 2C 维，实现 2× 空间下采样。
4. 四个 Stage 的输出分辨率分别为 \(\frac{H}{4}, \frac{H}{8}, \frac{H}{16}, \frac{H}{32}\)，与 ResNet 的 C2–C5 特征层完全对齐。

##### 核心机制：窗口自注意力与移动窗口

**动机与背景**：ViT 对所有 token 计算全局自注意力，复杂度为 \(O(n^2)\)，当输入分辨率较高时（如检测任务需要 800×1200），token 数量可达数万，计算代价不可接受。传统 CNN 通过局部卷积核天然具有线性复杂度，但感受野受限。Swin Transformer 的目标是**兼顾局部高效计算与全局信息流通**。

**窗口自注意力（W-MSA）**：将 \(h \times w\) 的 token 网格均匀划分为 \(\frac{h}{M} \times \frac{w}{M}\) 个大小为 \(M \times M\) 的不重叠窗口，自注意力仅在每个窗口内部计算。复杂度对比：

$$\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C$$

$$\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC$$

当 \(M\) 固定（默认 \(M=7\)）时，W-MSA 的复杂度对 \(hw\) 为**线性**，而全局 MSA 为**二次**。

> 💡 关键：W-MSA 将全局注意力的 \(O(n^2)\) 瓶颈项 \(2(hw)^2C\) 替换为 \(2M^2 \cdot hwC\)，其中 \(M^2=49\) 是常数，因此整体复杂度变为线性。

**移动窗口自注意力（SW-MSA）**：W-MSA 的窗口之间没有信息交互，限制了建模能力。Swin Transformer 在连续的两个 Block 中交替使用常规窗口和移位窗口：

![移动窗口示意图](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/figs/teaser_v4.png)
*图 3：移动窗口机制——Layer l 使用常规窗口划分，Layer l+1 将窗口偏移 \(\lfloor M/2 \rfloor\) 像素，使得相邻窗口的边界区域在新窗口中相遇，实现跨窗口连接。*

连续两个 Block 的计算公式为：

$$\hat{\mathbf{z}}^l = \text{W-MSA}(\text{LN}(\mathbf{z}^{l-1})) + \mathbf{z}^{l-1}$$

$$\mathbf{z}^l = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^l)) + \hat{\mathbf{z}}^l$$

$$\hat{\mathbf{z}}^{l+1} = \text{SW-MSA}(\text{LN}(\mathbf{z}^l)) + \mathbf{z}^l$$

$$\mathbf{z}^{l+1} = \text{MLP}(\text{LN}(\hat{\mathbf{z}}^{l+1})) + \hat{\mathbf{z}}^{l+1}$$

其中 W-MSA 和 SW-MSA 分别表示常规窗口和移位窗口的多头自注意力。每个 Block 内部结构与标准 Transformer 一致：LayerNorm → (S)W-MSA → 残差 → LayerNorm → MLP（2 层，GELU 激活，扩展率 4×）→ 残差。

##### 高效循环移位实现

![循环移位批量计算](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x2.png)
*图 4：循环移位的高效批量计算方法——将特征图向左上方循环移位后，移位窗口重新对齐为等大窗口，配合注意力掩码保证不同子窗口之间不交互。*

移位窗口划分会产生更多且大小不一的窗口（从 \(\lceil\frac{h}{M}\rceil \times \lceil\frac{w}{M}\rceil\) 增加到 \((\lceil\frac{h}{M}\rceil+1) \times (\lceil\frac{w}{M}\rceil+1)\)）。朴素的 padding + mask 方案会使窗口数增加 2.25 倍。Swin Transformer 提出**循环移位（Cyclic Shift）**策略：

1. 将特征图向左上方循环移位 \(\lfloor M/2 \rfloor\) 个像素
2. 移位后的特征图仍按常规方式划分为等大窗口
3. 在注意力计算中施加**掩码矩阵**，确保来自不同原始区域的 token 之间不产生注意力
4. 计算完成后将结果反向移位恢复

> ⚠️ 注意：循环移位不改变窗口数量，因此 SW-MSA 与 W-MSA 的计算量完全相同，仅多了移位和掩码操作的极小开销。

##### 相对位置偏置

Swin Transformer 在注意力计算中引入可学习的**相对位置偏置** \(B\)：

$$\text{Attention}(Q, K, V) = \text{SoftMax}\left(\frac{QK^T}{\sqrt{d}} + B\right)V$$

其中 \(Q, K, V \in \mathbb{R}^{M^2 \times d}\)，\(B \in \mathbb{R}^{M^2 \times M^2}\)。由于相对位置沿每个轴的范围为 \([-(M-1), M-1]\)，实际参数化一个较小的偏置矩阵 \(\hat{B} \in \mathbb{R}^{(2M-1) \times (2M-1)}\)，\(B\) 中的值通过索引从 \(\hat{B}\) 中取出。

> 💡 关键：相对位置偏置相比绝对位置编码有两大优势——(1) 更好地编码 token 间的空间关系，实验中带来显著精度提升；(2) 预训练的偏置可通过双三次插值迁移到不同窗口大小，支持灵活的分辨率微调。

##### 与 ViT 的核心区别

| 特性 | ViT | Swin Transformer |
|------|-----|-------------------|
| 特征分辨率 | 单一（16× 下采样） | 多尺度金字塔（4×/8×/16×/32×） |
| 自注意力范围 | 全局（所有 token） | 局部窗口（\(M \times M\)） |
| 计算复杂度 | \(O(n^2)\) 二次 | \(O(n)\) 线性 |
| 位置编码 | 绝对位置编码 | 相对位置偏置 |
| 下游任务适配 | 需额外适配（如 ViTDet） | 天然兼容 FPN/UPerNet 等 |
| 跨窗口信息流 | 天然全局 | 移动窗口机制 |

##### 模型变体与伪代码

```python
# Swin Transformer 前向传播伪代码
def swin_transformer_forward(image):
    # Stage 1: Patch Splitting + Linear Embedding
    x = patch_split(image, patch_size=4)        # [B, H/4*W/4, 48]
    x = linear_embed(x, dim=C)                  # [B, H/4*W/4, C]
    for block in stage1_blocks:                  # {2,2,6,2} blocks per stage
        x = swin_block(x, shift=False)           # W-MSA
        x = swin_block(x, shift=True)            # SW-MSA
    
    # Stage 2/3/4: Patch Merging + Swin Blocks
    for stage in [stage2, stage3, stage4]:
        x = patch_merge(x)                       # 2x downsample, 2C dim
        for block in stage.blocks:
            x = swin_block(x, shift=False)
            x = swin_block(x, shift=True)
    
    return x  # 多尺度特征 {C, 2C, 4C, 8C}

def swin_block(x, shift):
    # 循环移位（仅 SW-MSA）
    if shift:
        x_shifted = cyclic_shift(x, displacement=M//2)
        attn_mask = create_mask()
    else:
        x_shifted = x
        attn_mask = None
    
    # Window Partition → Attention → Window Reverse
    windows = partition_windows(x_shifted, M=7)  # [num_win*B, M*M, C]
    attn_out = window_attention(windows, mask=attn_mask,
                                 rel_pos_bias=B_hat)
    x_out = reverse_windows(attn_out)
    
    if shift:
        x_out = cyclic_shift(x_out, displacement=-M//2)  # 反向移位
    
    return x_out
```

四种模型变体的超参数配置：

| 变体 | 嵌入维度 C | 各 Stage 层数 | 参数量 | FLOPs | 对标模型 |
|------|-----------|--------------|--------|-------|---------|
| Swin-T | 96 | {2, 2, 6, 2} | 29M | 4.5G | ResNet-50 / DeiT-S |
| Swin-S | 96 | {2, 2, 18, 2} | 50M | 8.7G | ResNet-101 |
| Swin-B | 128 | {2, 2, 18, 2} | 88M | 15.4G | ViT-B / DeiT-B |
| Swin-L | 192 | {2, 2, 18, 2} | 197M | 34.5G | — |

所有变体默认窗口大小 \(M=7\)，每头 query 维度 \(d=32\)，MLP 扩展率 \(\alpha=4\)。

#### 🧪 练习题

```yaml
question: "Swin Transformer 中移动窗口（Shifted Window）机制的主要作用是什么？"
options:
  - "减少模型参数量以提升推理速度"
  - "在不增加计算量的前提下建立相邻窗口之间的信息交互"
  - "将自注意力的复杂度从线性降至对数级别"
  - "替代相对位置偏置以编码空间位置信息"
answer: 1
explain: "W-MSA 仅在窗口内部计算注意力，窗口间无信息流通。SW-MSA 通过将窗口偏移 ⌊M/2⌋ 像素，使原本处于不同窗口边界的 token 在新窗口中相遇，从而建立跨窗口连接，且配合循环移位保持窗口数不变，计算量与 W-MSA 相同。"
```