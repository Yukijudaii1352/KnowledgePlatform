### SegFormer (2021, NVIDIA)

```yaml
id: segformer
name: SegFormer
full_name: 分割Former (SegFormer)
year: '2021'
org: NVIDIA
paper_url: https://arxiv.org/abs/2105.15203
category: unified
parent: setr
motivation: 分层Mix Transformer+MLP解码
```

#### 📝 一句话总结

SegFormer 提出了分层 Mix Transformer 编码器（MiT）与轻量级全 MLP 解码器的统一框架，无需位置编码即可高效生成多尺度特征并融合局部与全局注意力，在语义分割任务上实现了精度与效率的最优平衡。

#### 🎯 核心要点

- **分层 Mix Transformer 编码器（MiT-B0 ~ B5）**：生成 1/4、1/8、1/16、1/32 四级多尺度特征，类似 CNN 的金字塔结构
- **无位置编码设计**：用 Mix-FFN（含 3×3 深度可分离卷积）替代固定位置编码，避免测试分辨率变化时的插值精度损失
- **高效自注意力**：通过序列缩减（Reduction Ratio R=[64,16,4,1]）将复杂度从 \(O(N^2)\) 降至 \(O(N^2/R)\)
- **重叠 Patch Merging**：使用重叠卷积（K=7,S=4,P=3）替代 ViT 的非重叠 patch 划分，保持局部连续性
- **轻量级全 MLP 解码器**：仅用 4 步 Linear 层完成多尺度特征融合，解码器参数仅占模型总参数的 ~4%
- **模型系列化**：B0（3.8M 参数，实时）到 B5（84.7M 参数，SOTA），覆盖从边缘部署到最高精度的全场景
- **SOTA 结果**：ADE20K 51.0% mIoU，Cityscapes 84.0% mIoU，且具备优秀的零样本鲁棒性

#### 🔬 深入细节

![SegFormer 整体框架图](https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x2.png)
*图：SegFormer 框架由分层 Transformer 编码器（左）和轻量 All-MLP 解码器（右）组成。编码器输出四级多尺度特征，解码器通过 MLP 融合后预测分割掩码。*

![性能 vs 效率对比](https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x1.png)
*图：SegFormer 在 ADE20K 上的性能-效率权衡，显著优于 SETR、DeepLabV3+ 等方法。*

##### 动机与背景

SETR 首次将 ViT 引入语义分割，但存在三个核心问题：
1. **单尺度特征**：ViT 仅输出单一低分辨率特征图，无法提供多尺度信息
2. **固定位置编码**：测试分辨率与训练不同时需插值 PE，导致精度下降
3. **重型解码器**：SETR 依赖复杂 CNN 解码器恢复分辨率，计算开销大

SegFormer 从编码器和解码器两端同时重新设计，追求简洁、高效、强大的统一框架。

##### 编码器：Mix Transformer（MiT）

**1. 分层特征提取**

输入图像 \(H \times W \times 3\) 首先被划分为 \(4 \times 4\) 的 patch（比 ViT 的 \(16 \times 16\) 更细），经过 4 个 stage 逐级下采样，产生分辨率为 \(\{H/4, H/8, H/16, H/32\}\) 的特征图 \(F_1, F_2, F_3, F_4\)，通道数逐级增大。

**2. 重叠 Patch Merging**

不同于 ViT 的非重叠 patch 划分，SegFormer 使用重叠卷积实现 patch 合并：
- 第一层：\(K=7, S=4, P=3\)
- 后续层：\(K=3, S=2, P=1\)

这保证了相邻 patch 之间的局部连续性，避免边界伪影。

**3. 高效自注意力（Efficient Self-Attention）**

标准自注意力复杂度为 \(O(N^2)\)，对高分辨率特征图不可承受。SegFormer 采用序列缩减策略：

$$\hat{K} = \text{Reshape}\left(\frac{N}{R}, C \cdot R\right)(K)$$

$$K = \text{Linear}(C \cdot R, C)(\hat{K})$$

将 Key 序列长度从 \(N\) 缩减为 \(N/R\)，复杂度降为 \(O(N^2/R)\)。四个 stage 的缩减比 \(R = [64, 16, 4, 1]\)，越深层分辨率越低，缩减越少。

**4. Mix-FFN（替代位置编码）**

SegFormer 完全移除位置编码，转而在 FFN 中嵌入 3×3 深度可分离卷积，利用零填充隐式提供位置信息：

$$\mathbf{x}_{out} = \text{MLP}(\text{GELU}(\text{Conv}_{3\times3}(\text{MLP}(\mathbf{x}_{in})))) + \mathbf{x}_{in}$$

> 💡 关键：Mix-FFN 的 3×3 卷积不仅引入位置信息，还增强了局部特征建模能力，使编码器同时具备局部注意力（低层）和全局注意力（高层）。

##### 解码器：All-MLP Decoder

```python
# SegFormer All-MLP Decoder 伪代码
def decode(F1, F2, F3, F4, C_embed):
    # Step 1: 统一通道维度
    F1_hat = Linear(C1, C_embed)(F1)  # H/4 × W/4
    F2_hat = Linear(C2, C_embed)(F2)  # H/8 × W/8
    F3_hat = Linear(C3, C_embed)(F3)  # H/16 × W/16
    F4_hat = Linear(C4, C_embed)(F4)  # H/32 × W/32
    
    # Step 2: 上采样到统一分辨率 H/4 × W/4
    F1_hat = Upsample(H/4, W/4)(F1_hat)
    F2_hat = Upsample(H/4, W/4)(F2_hat)
    F3_hat = Upsample(H/4, W/4)(F3_hat)
    F4_hat = Upsample(H/4, W/4)(F4_hat)
    
    # Step 3: 拼接 + 融合
    F = Linear(4*C_embed, C_embed)(Concat(F1_hat, F2_hat, F3_hat, F4_hat))
    
    # Step 4: 预测分割掩码
    M = Linear(C_embed, N_cls)(F)  # H/4 × W/4 × N_cls
    return M
```

> 💡 关键：如此简单的解码器之所以有效，是因为 Transformer 编码器的有效感受野（ERF）远大于 CNN。Stage-4 已具备高度非局部注意力，MLP 解码器只需融合多尺度特征即可获得强大表征，无需 ASPP 等复杂上下文模块。

![有效感受野对比](https://ar5iv.labs.arxiv.org/html/2105.15203/assets/x3.png)
*图：DeepLabV3+（上）vs SegFormer（下）的有效感受野对比。SegFormer 在 Stage-4 具有显著更大的非局部注意力范围。*

##### 与 SETR 的核心区别

| 维度 | SETR | SegFormer |
|------|------|-----------|
| 预训练数据 | ImageNet-22K | ImageNet-1K |
| 编码器结构 | 单尺度 ViT | 分层多尺度 MiT |
| 位置编码 | 固定形状 PE | 无 PE（Mix-FFN 替代）|
| 解码器 | 重型 CNN 解码器 | 轻量 All-MLP |
| 分辨率泛化 | 需插值 PE，精度下降 | 天然支持任意分辨率 |

##### 模型系列与性能

SegFormer 提供 B0~B5 六个规模的模型：

| 模型 | 编码器参数 | 解码器参数 | ADE20K mIoU | Cityscapes mIoU |
|------|-----------|-----------|-------------|-----------------|
| B0 | 3.4M | 0.4M | 37.4% | 76.2% |
| B1 | 13.1M | 0.6M | 42.2% | 78.5% |
| B2 | 24.2M | 3.3M | 46.5% | 81.0% |
| B3 | 44.0M | 3.3M | 49.4% | 81.7% |
| B4 | 60.8M | 3.3M | 50.3% | 82.3% |
| B5 | 81.4M | 3.3M | 51.0% | 82.4% |

> ⚠️ 注意：B4 以 64M 参数达到 50.3% mIoU，比此前最佳方法小 5 倍且高 2.2%。B5 在 Cityscapes 验证集达 84.0% mIoU（多尺度测试），并展现出优秀的零样本鲁棒性（Cityscapes-C）。

#### 🧪 练习题

```yaml
question: "SegFormer 用什么机制替代了传统 Transformer 中的位置编码（Positional Encoding）？"
options:
  - "可学习的绝对位置嵌入"
  - "相对位置偏置（Relative Position Bias）"
  - "Mix-FFN 中的 3×3 深度可分离卷积利用零填充隐式编码位置"
  - "正弦余弦位置编码的改进版本"
answer: 2
explain: "SegFormer 完全移除位置编码，在 FFN 中嵌入 3×3 深度可分离卷积，利用零填充（zero padding）隐式泄露位置信息，从而避免了固定 PE 在分辨率变化时的插值问题。"
```