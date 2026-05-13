### FC-Siam-diff — Fully Convolutional Siamese Network with Feature Differencing

```yaml
id: fc_siam_diff
name: FC-Siam-diff
full_name: "Fully Convolutional Siamese Network with Feature Differencing"
year: 2018
org: "ONERA (French Aerospace Lab) & IRISA"
paper_url: "https://arxiv.org/abs/1810.08462"
category: change_detection_foundation
parent: U-Net
motivation: "将全卷积孪生网络引入遥感变化检测，奠定深度学习变化检测基础"
```

#### 📝 一句话总结

本文提出三种基于全卷积网络的端到端变化检测架构——FC-EF、FC-Siam-conc 和 FC-Siam-diff，其中 FC-Siam-diff 通过孪生编码器提取双时相特征并在跳跃连接中计算特征差异，在 Sentinel-2 遥感影像变化检测任务上显著优于传统方法，奠定了深度学习在遥感变化检测领域的方法基础。

#### 🎯 核心要点

- **三种全卷积架构**：FC-EF（早期融合）、FC-Siam-conc（孪生拼接）、FC-Siam-diff（孪生差分），系统探索了双时相影像融合策略
- **基于 U-Net 的编码器-解码器骨架**：编码器使用 4 层卷积块（含 batch normalization + max pooling），解码器使用转置卷积逐步上采样恢复分辨率
- **孪生权重共享机制**：FC-Siam-conc 和 FC-Siam-diff 的两个编码器共享权重，分别独立处理两个时相的影像
- **特征差分跳跃连接**：FC-Siam-diff 在 skip connection 中计算编码器对应层特征的逐元素差值，而非简单拼接，更直接地捕获变化信息
- **Onera Satellite Change Detection (OSCD) 数据集**：基于 Sentinel-2 多光谱影像（13 波段）的城市变化检测基准，包含 24 对影像
- **端到端像素级预测**：直接输出变化图（change map），无需后处理步骤

#### 🔬 深入细节

##### 架构总览

论文提出的三种架构均基于 U-Net 编码器-解码器结构，核心区别在于双时相影像的融合方式：

![FC-EF 架构](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/networks-unet.svg)
![FC-Siam-conc 架构](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/networks-unet-siam-concat.svg)
![FC-Siam-diff 架构](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/networks-unet-siam-diff.svg)

*图：三种变化检测架构示意图。蓝色为卷积块，红色为最大池化，绿色为转置卷积，灰色为跳跃连接（skip connection）。左：FC-EF（早期融合）；中：FC-Siam-conc（孪生拼接）；右：FC-Siam-diff（孪生差分）。*

##### 算法伪代码

```python
# FC-Siam-diff 前向传播伪代码
def forward(image_t1, image_t2):
    # === 孪生编码器（权重共享） ===
    # 编码器处理 t1 时相
    e1_t1 = conv_block_1(image_t1)   # [B, 16, H, W]
    e2_t1 = conv_block_2(pool(e1_t1)) # [B, 32, H/2, W/2]
    e3_t1 = conv_block_3(pool(e2_t1)) # [B, 64, H/4, W/4]
    e4_t1 = conv_block_4(pool(e3_t1)) # [B, 128, H/8, W/8]
    
    # 编码器处理 t2 时相（共享权重）
    e1_t2 = conv_block_1(image_t2)
    e2_t2 = conv_block_2(pool(e1_t2))
    e3_t2 = conv_block_3(pool(e2_t2))
    e4_t2 = conv_block_4(pool(e3_t2))
    
    # === 解码器 + 特征差分跳跃连接 ===
    d4 = conv_block_4(pool(e4_t1))  # 瓶颈层 [B, 128, H/16, W/16]（仅用t1或拼接）
    
    # 上采样 + 差分 skip connection
    d3 = conv_block(concat(upsample(d4), abs(e4_t1 - e4_t2)))
    d2 = conv_block(concat(upsample(d3), abs(e3_t1 - e3_t2)))
    d1 = conv_block(concat(upsample(d2), abs(e2_t1 - e2_t2)))
    d0 = conv_block(concat(upsample(d1), abs(e1_t1 - e1_t2)))
    
    # 输出层：1x1 卷积 + softmax
    change_map = softmax(conv_1x1(d0))  # [B, 2, H, W]
    return change_map
```

##### 动机与背景

遥感变化检测旨在从不同时间获取的同一地区影像中识别地表变化区域，在城市扩张监测、灾害评估、土地利用分析等领域具有重要应用。传统方法通常分为两步：(1) 手工设计特征或计算影像差异；(2) 通过阈值分割或分类器判断变化。这类方法依赖人工特征工程，泛化能力有限。

深度学习在语义分割领域的成功（特别是 U-Net 和全卷积网络 FCN）启发了本文的工作。然而，直接将语义分割网络应用于变化检测面临一个核心问题：**如何有效融合双时相影像信息**。本文系统性地探索了三种融合策略，为后续研究提供了基准框架。

##### 核心机制详解

**1. FC-EF（Early Fusion，早期融合）**

最简单的策略：将两个时相的影像在输入层直接沿通道维度拼接，形成一个 \(2C\) 通道的输入（\(C\) 为单时相通道数），然后送入标准 U-Net。

$$\mathbf{x}_{\text{input}} = [\mathbf{x}_{t_1}; \mathbf{x}_{t_2}] \in \mathbb{R}^{2C \times H \times W}$$

> 💡 **关键**：早期融合让网络从第一层就能同时"看到"两个时相的信息，但融合发生在原始像素层面，网络需要自行学习如何从低级特征中提取变化信息。

**2. FC-Siam-conc（Siamese Concatenation，孪生拼接）**

使用权重共享的孪生编码器分别处理两个时相的影像，在解码器的跳跃连接中将对应层的特征图拼接（concatenation）后传递给解码器：

$$\mathbf{s}_l = [\mathbf{e}_l^{t_1}; \mathbf{e}_l^{t_2}] \in \mathbb{R}^{2F_l \times H_l \times W_l}$$

其中 \(\mathbf{e}_l^{t_1}\) 和 \(\mathbf{e}_l^{t_2}\) 分别是编码器第 \(l\) 层对两个时相的特征表示，\(F_l\) 是该层的通道数。

> 💡 **关键**：孪生拼接在多个尺度上融合信息，让解码器在每个分辨率层级都能获取双时相特征，但由解码器自行学习如何从拼接特征中提取变化信号。

**3. FC-Siam-diff（Siamese Differencing，孪生差分）**

同样使用孪生编码器，但在跳跃连接中计算对应层特征的**逐元素绝对差值**：

$$\mathbf{s}_l = |\mathbf{e}_l^{t_1} - \mathbf{e}_l^{t_2}| \in \mathbb{R}^{F_l \times H_l \times W_l}$$

> 💡 **关键**：特征差分是本文最核心的创新。与拼接相比，差分操作直接编码了"变化"的语义——差值大的区域更可能发生了变化。这种设计引入了强归纳偏置（inductive bias），使网络更容易学习变化检测任务。同时，差分后的 skip connection 通道数仅为拼接方式的一半（\(F_l\) vs \(2F_l\)），减少了解码器的参数量。

**4. 编码器-解码器结构细节**

编码器由 4 个卷积块组成，每个块包含：
- 两层 \(3 \times 3\) 卷积
- 每层卷积后接 Batch Normalization 和 ReLU 激活
- 块之间使用 \(2 \times 2\) 最大池化进行下采样

通道数依次为：16 → 32 → 64 → 128。

解码器对称地使用转置卷积进行上采样，并通过跳跃连接融合编码器特征。最终通过 \(1 \times 1\) 卷积和 softmax 输出二分类变化图。

**5. 损失函数与训练策略**

采用标准交叉熵损失：

$$\mathcal{L} = -\frac{1}{N}\sum_{i=1}^{N}\left[y_i \log \hat{y}_i + (1-y_i)\log(1-\hat{y}_i)\right]$$

其中 \(y_i \in \{0, 1\}\) 为像素级标签（0=未变化，1=变化），\(\hat{y}_i\) 为预测概率。

训练细节：
- 优化器：Adam，学习率 \(10^{-3}\)，权重衰减 \(10^{-4}\)
- 输入为 \(96 \times 96\) 像素的 patch 对，使用随机裁剪进行数据增强
- 训练 100 个 epoch
- 由于变化/未变化类别严重不平衡，在损失函数中对变化类别赋予更高权重

##### 实验结果

**数据集**

- **OSCD（Onera Satellite Change Detection）数据集**：24 对 Sentinel-2 多光谱影像（13 个波段，分辨率 10m/20m/60m），覆盖全球不同城市，标注城市区域的建筑变化。14 对用于训练，10 对用于测试。
- **SZTAKI AirChange Benchmark**：航空影像变化检测数据集，包含 Szada 和 Tiszadob 两个测试集（RGB 3 波段，分辨率约 1.5m），每组 7 对 952×640 影像。

**评估指标**：Precision（精确率）、Recall（召回率）、F1-score（综合指标）、Overall Accuracy（OA）、Kappa 系数。

**主要结果**

| 方法 | 数据集 | Precision | Recall | F1 | OA | Kappa |
|------|--------|-----------|--------|-----|-----|-------|
| FC-EF | OSCD (all bands) | 52.60 | 67.77 | 59.22 | 95.05 | 56.80 |
| FC-Siam-conc | OSCD (all bands) | 47.91 | 68.30 | 56.32 | 94.44 | 53.69 |
| **FC-Siam-diff** | **OSCD (all bands)** | **51.78** | **63.42** | **57.00** | **95.05** | **54.72** |
| FC-EF | OSCD (RGB only) | 49.63 | 53.06 | 51.29 | 94.95 | 49.03 |
| FC-Siam-conc | OSCD (RGB only) | 44.90 | 60.16 | 51.42 | 94.24 | 48.67 |
| FC-Siam-diff | OSCD (RGB only) | 48.44 | 55.70 | 51.82 | 94.84 | 49.38 |
| DSCN [11] | Szada | — | — | 36.30 | — | — |
| FC-EF | Szada | — | — | 42.73 | — | — |
| FC-Siam-conc | Szada | — | — | 47.79 | — | — |
| **FC-Siam-diff** | **Szada** | **—** | **—** | **48.44** | **—** | **—** |
| DSCN [11] | Tiszadob | — | — | 47.76 | — | — |
| FC-EF | Tiszadob | — | — | 48.44 | — | — |
| FC-Siam-conc | Tiszadob | — | — | 45.36 | — | — |
| **FC-Siam-diff** | **Tiszadob** | **—** | **—** | **51.43** | **—** | **—** |

**关键发现**：
1. **FC-Siam-diff 在多数数据集上表现最优或接近最优**，尤其在 Szada 和 Tiszadob 数据集上 F1 分数最高
2. **多光谱波段显著提升性能**：使用全部 13 个 Sentinel-2 波段比仅用 RGB 3 波段提升约 5-8 个 F1 百分点
3. **所有全卷积方法均大幅优于传统 DSCN 方法**：在 Szada 上 FC-Siam-diff (48.44) vs DSCN (36.30)，提升超过 12 个百分点
4. **孪生架构参数效率更高**：FC-Siam-diff 的 skip connection 通道数为拼接方式的一半，参数更少但性能相当甚至更优

##### 可视化结果

![Montpellier 测试结果](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-img1.png)
![Montpellier 测试结果 t2](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-img2.png)
![Montpellier Ground Truth](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-cm.png)
![Montpellier FC-EF 结果](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-ef2.png)
![Montpellier FC-Siam-conc 结果](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-conc2.png)
![Montpellier FC-Siam-diff 结果](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-diff2.png)

*图：Montpellier 测试区域的变化检测结果。从左到右：t1 影像、t2 影像、Ground Truth、FC-EF 预测、FC-Siam-conc 预测、FC-Siam-diff 预测。*

##### 批判性分析

**优势**：
- **开创性工作**：首次系统性地将全卷积孪生网络应用于遥感变化检测，为后续大量研究奠定了方法基础
- **架构设计简洁优雅**：特征差分的 skip connection 设计引入了合理的归纳偏置，既直观又有效
- **端到端训练**：无需手工特征工程或复杂的后处理流程
- **开源数据集贡献**：同时发布了 OSCD 数据集，推动了社区发展

**局限性**：
- **类别不平衡处理简单**：仅使用加权交叉熵，未探索 Focal Loss、OHEM 等更先进的不平衡处理策略
- **网络容量较小**：编码器仅 4 层，最大通道数 128，对于复杂场景可能表达能力不足
- **未使用预训练骨干网络**：从头训练的小网络在数据量有限时可能欠拟合
- **多尺度信息利用不足**：未使用空洞卷积、FPN 等多尺度特征融合技术
- **仅处理二分类变化检测**：未涉及语义变化检测（即同时识别变化类型）

**后续影响与发展方向**：
- 后续工作如 STANet、BIT、ChangeFormer 等均以本文架构为基线进行改进
- 注意力机制（空间/通道注意力）被广泛引入以增强变化特征表示
- Transformer 架构逐渐替代纯 CNN 编码器以捕获长程依赖
- 语义变化检测成为新的研究热点

#### 🧪 练习题

```yaml
question: "FC-Siam-diff 与 FC-Siam-conc 在跳跃连接（skip connection）中的核心区别是什么？"
options:
  - "FC-Siam-diff 使用加法融合，FC-Siam-conc 使用乘法融合"
  - "FC-Siam-diff 计算双时相特征的逐元素差值，FC-Siam-conc 将双时相特征沿通道拼接"
  - "FC-Siam-diff 不使用跳跃连接，FC-Siam-conc 使用跳跃连接"
  - "FC-Siam-diff 在编码器中融合特征，FC-Siam-conc 在解码器中融合特征"
answer: 1
explain: "FC-Siam-diff 在 skip connection 中计算 |e_t1 - e_t2| 作为差分特征传递给解码器，而 FC-Siam-conc 将 [e_t1; e_t2] 拼接后传递。差分操作直接编码了变化信息，引入了更强的归纳偏置。"
```