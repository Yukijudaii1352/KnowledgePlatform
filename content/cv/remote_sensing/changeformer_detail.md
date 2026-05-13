### ChangeFormer — A Transformer-Based Siamese Network for Change Detection

```yaml
id: changeformer
name: ChangeFormer
full_name: "A Transformer-Based Siamese Network for Change Detection"
year: 2022
org: Johns Hopkins University
paper_url: https://arxiv.org/abs/2201.01293
category: change_detection
parent: "—"
motivation: "首个纯Transformer架构的遥感变化检测方法，利用层级Transformer编码器和轻量MLP解码器实现多尺度变化检测"
```

#### 📝 一句话总结

ChangeFormer 提出了一种基于纯 Transformer 的孪生网络架构用于遥感图像变化检测，通过层级 Transformer 编码器提取多尺度特征、可学习的特征差异模块捕获变化信息、以及轻量级 MLP 解码器融合多层次差异特征，在 LEVIR-CD 和 DSIFN-CD 基准上取得了优于 CNN 和混合方法的性能。

#### 🎯 核心要点

- **纯 Transformer 孪生编码器**：采用层级 Transformer 编码器（基于 MiT/SegFormer 架构），以权重共享的孪生方式分别处理双时相图像，输出 4 个尺度的特征图（\(H/4\) 到 \(H/32\)）
- **序列缩减自注意力（Sequence Reduction）**：将 Key 和 Value 的空间维度缩减 \(R_i\) 倍，将自注意力复杂度从 \(O(N^2)\) 降至 \(O(N^2/R_i)\)，使高分辨率特征图上的 Transformer 计算可行
- **可学习特征差异模块**：对双时相特征进行 Concatenation + Conv2D + ReLU + BN 操作，替代传统的绝对差分，能更灵活地建模变化语义
- **轻量级 MLP 解码器**：借鉴 SegFormer 的 All-MLP 解码器，将 4 层差异特征统一通道数后上采样拼接，再通过线性层融合并转置卷积恢复至原始分辨率
- **基准数据集**：在 LEVIR-CD（建筑物变化）和 DSIFN-CD（多类别土地利用变化）上验证，F1 分别达到 90.40% 和 86.67%

#### 🔬 深入细节

![ChangeFormer 整体架构图](https://ar5iv.labs.arxiv.org/html/2201.01293/assets/x1.png)
*图：ChangeFormer 架构总览。上下两路为权重共享的层级 Transformer 编码器，中间为特征差异模块，右侧为轻量级 MLP 解码器。*

```python
# ChangeFormer 核心流程伪代码
def ChangeFormer(img_t1, img_t2):
    # 1. 孪生层级 Transformer 编码器（权重共享）
    F1 = [F1_1, F1_2, F1_3, F1_4] = HierarchicalTransformerEncoder(img_t1)  # 4个尺度
    F2 = [F2_1, F2_2, F2_3, F2_4] = HierarchicalTransformerEncoder(img_t2)  # 共享权重

    # 2. 多层级特征差异模块
    D = []
    for i in range(4):
        concat_feat = Concat(F1[i], F2[i])           # 通道拼接
        D_i = BN(ReLU(Conv2D(concat_feat)))           # 可学习差异提取
        D.append(D_i)

    # 3. 轻量级 MLP 解码器
    unified = []
    for i in range(4):
        unified_i = Linear(D[i], embed_dim=256)       # 统一通道数
        unified_i = Upsample(unified_i, size=H/4)     # 上采样到 H/4 × W/4
        unified.append(unified_i)
    fused = Linear(Concat(unified))                    # 融合所有尺度

    # 4. 分类头
    change_map = ConvTranspose2D(fused, out=2)         # 恢复到 H × W
    return change_map                                  # 二分类：变化/未变化
```

##### 动机与背景

遥感变化检测（Change Detection, CD）旨在识别同一地理区域在不同时间拍摄的两幅图像之间的语义变化。传统方法依赖手工特征或浅层分类器，难以捕获复杂的变化模式。近年来，基于 CNN 的方法（如 FC-Siam-Diff、BIT、SNUNet 等）取得了显著进展，但 CNN 的感受野受限于卷积核大小，难以建模长距离空间依赖关系——而这在大范围遥感场景中至关重要。

Transformer 凭借全局自注意力机制天然具备建模长距离依赖的能力，但直接将 ViT 应用于变化检测面临两个挑战：(1) 标准自注意力的 \(O(N^2)\) 复杂度在高分辨率遥感图像上不可行；(2) 单尺度特征无法满足像素级变化检测对多尺度信息的需求。ChangeFormer 正是为解决这些问题而设计的。

##### 核心机制：层级 Transformer 编码器

ChangeFormer 的编码器采用 4 阶段层级设计，每个阶段包含 Overlap Patch Embedding 和多个 Transformer Block：

**Overlap Patch Embedding**：不同于 ViT 的非重叠分块，ChangeFormer 使用重叠卷积（kernel=7, stride=4, pad=3 或 kernel=3, stride=2, pad=1）将特征图转换为 patch 序列，保留局部连续性。4 个阶段分别输出分辨率为 \(\frac{H}{4} \times \frac{W}{4}\)、\(\frac{H}{8} \times \frac{W}{8}\)、\(\frac{H}{16} \times \frac{W}{16}\)、\(\frac{H}{32} \times \frac{W}{32}\) 的特征图，通道数依次为 \(C_1, C_2, C_3, C_4\)。

**序列缩减自注意力（Efficient Self-Attention）**：标准多头自注意力的计算复杂度为 \(O(N^2 \cdot d)\)，其中 \(N = H \times W\) 为序列长度。ChangeFormer 引入序列缩减操作，对 Key 和 Value 进行空间维度压缩：

$$\hat{K} = \text{Reshape}(K, [N/R_i, C \cdot R_i]) \cdot W_K$$

其中 \(R_i\) 为第 \(i\) 阶段的缩减比率（论文中 \(R = [8, 4, 2, 1]\)），这将自注意力复杂度降至 \(O(N^2 / R_i)\)。低层特征图分辨率高、序列长，使用更大的缩减比率；高层特征图分辨率低，缩减比率相应减小甚至不缩减。

> 💡 **关键直觉**：序列缩减的本质是在计算注意力时，让 Query 关注"粗粒度"的 Key/Value 摘要，而非逐像素匹配。这在遥感场景中合理——低层特征主要捕获纹理和边缘，不需要像素级全局交互。

**可学习位置编码**：不同于 ViT 使用固定或可学习的绝对位置编码（限制输入分辨率），ChangeFormer 在每个 Transformer Block 的 FFN 中嵌入一个 \(3 \times 3\) 深度可分离卷积（depth-wise convolution），隐式引入位置信息。这种设计使模型能灵活处理任意分辨率的输入图像，无需插值位置编码。

$$\text{FFN}(x) = \text{MLP}(\text{GELU}(\text{DWConv}_{3 \times 3}(\text{MLP}(x)))) + x$$

##### 核心机制：特征差异模块

对于每个尺度 \(i\) 的双时相特征 \(F_i^{t_1}\) 和 \(F_i^{t_2}\)，差异模块执行：

$$D_i = \text{BN}(\text{ReLU}(\text{Conv2D}(\text{Concat}(F_i^{t_1}, F_i^{t_2}))))$$

> ⚠️ **与传统方法的区别**：早期方法（如 FC-Siam-Diff）直接计算 \(|F_i^{t_1} - F_i^{t_2}|\) 作为差异特征，这种硬编码的绝对差分假设变化信息完全体现在特征幅值差异上。而 ChangeFormer 的可学习差异模块通过拼接 + 卷积，让网络自主学习如何从双时相特征中提取变化信号，能捕获更丰富的变化模式（如方向性变化、语义级变化等）。

##### 核心机制：轻量级 MLP 解码器

解码器借鉴 SegFormer 的设计理念，避免使用复杂的多层上采样结构：

1. **通道统一**：对 4 个尺度的差异特征 \(D_i\)（通道数各异）分别通过 MLP 层映射到统一的嵌入维度 \(C_e = 256\)
2. **空间对齐**：将所有特征上采样到 \(\frac{H}{4} \times \frac{W}{4}\) 的统一空间分辨率
3. **特征融合**：沿通道维度拼接后，通过一个线性层融合为 \(C_e\) 维特征
4. **分辨率恢复**：通过转置卷积（ConvTranspose2D）将特征图从 \(\frac{H}{4} \times \frac{W}{4}\) 恢复到 \(H \times W\)，输出 2 通道（变化/未变化）

> 💡 **设计优势**：相比 U-Net 风格的逐级上采样解码器，MLP 解码器参数量更少、计算更高效，同时通过统一尺度后的拼接融合，仍能有效整合多尺度信息。

##### 训练细节

- **损失函数**：标准交叉熵损失（Cross-Entropy Loss）
- **优化器**：AdamW，初始学习率 \(10^{-4}\)，线性衰减至 0
- **训练轮数**：200 epochs，batch size = 16
- **数据增强**：随机翻转和旋转
- **预训练**：编码器使用 ImageNet-1K 预训练的 MiT-b2 权重初始化

##### 与传统方法的对比

| 方法 | 骨干网络 | 差异计算 | 解码器 | LEVIR-CD F1 |
|------|---------|---------|--------|-------------|
| FC-Siam-Diff | ResNet | 绝对差分 | U-Net | 86.31% |
| BIT | ResNet-18 + Transformer | Token差分 | FPN | 89.31% |
| SNUNet | NestedUNet | 通道注意力 | Dense | 88.16% |
| **ChangeFormer** | **纯Transformer (MiT-b2)** | **可学习(Cat+Conv)** | **MLP** | **90.40%** |

ChangeFormer 在 LEVIR-CD 上以 F1=90.40%、IoU=82.48% 超越所有对比方法；在 DSIFN-CD 上以 F1=86.67%、IoU=76.48% 同样取得最优结果。消融实验表明，纯 Transformer 编码器相比 ResNet 骨干带来约 2% 的 F1 提升，可学习差异模块相比绝对差分带来约 0.5% 的提升。

#### 🧪 练习题

```yaml
question: "ChangeFormer 中序列缩减自注意力（Sequence Reduction）的主要作用是什么？"
options:
  - "增加特征图的空间分辨率以捕获更多细节"
  - "对 Key 和 Value 进行空间压缩，降低自注意力的计算复杂度"
  - "替代位置编码，为 Transformer 引入空间位置信息"
  - "融合多尺度特征以生成统一的变化表示"
answer: 1
explain: "序列缩减通过将 Key/Value 的空间维度压缩 R 倍，将自注意力复杂度从 O(N²) 降至 O(N²/R)，使 Transformer 能高效处理高分辨率遥感图像的长序列。"
```