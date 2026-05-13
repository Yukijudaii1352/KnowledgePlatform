### SegFormer-RS — 遥感SegFormer (SegFormer for Remote Sensing)

```yaml
id: segformer_rs
name: SegFormer-RS
full_name: 遥感SegFormer (SegFormer for Remote Sensing)
year: '2021'
org: Various Institutions
paper_url: https://arxiv.org/abs/2105.15203
category: semantic_segmentation
parent: deeplabv3_rs
motivation: Transformer语义分割应用于遥感
```

#### 📝 一句话总结

SegFormer 提出了一种将层级 Transformer 编码器与轻量级全 MLP 解码器统一的语义分割框架，无需位置编码即可高效生成多尺度特征并融合局部与全局注意力，在遥感等密集预测任务中实现了精度与效率的最优平衡。

#### 🎯 核心要点

- **层级 Transformer 编码器 (Mix Transformer, MiT)**：输出 1/4、1/8、1/16、1/32 四级多尺度特征，类似 CNN 的金字塔结构
- **高效自注意力 (Efficient Self-Attention)**：通过序列缩减比 \(R=[64,16,4,1]\) 将复杂度从 \(O(N^2)\) 降至 \(O(N^2/R)\)
- **重叠 Patch Merging**：使用 \(K=7, S=4, P=3\) 的重叠卷积替代 ViT 的非重叠分块，保留局部连续性
- **Mix-FFN 替代位置编码**：在 FFN 中嵌入 3×3 深度可分离卷积，利用零填充隐式编码位置信息，消除测试分辨率变化时的精度下降
- **轻量级 All-MLP 解码器**：仅用 MLP 层统一通道→上采样→拼接→融合→预测，无需 ASPP 等复杂模块
- **模型系列 B0-B5**：从 3.8M 参数的实时模型到 84.7M 的高精度模型，覆盖不同部署需求
- **SOTA 性能**：B5 在 ADE20K 达 51.8% mIoU，Cityscapes 达 84.0% mIoU；B0 仅 3.8M 参数即超越 MobileNetV2 系列

#### 🔬 深入细节

##### 架构总览

![SegFormer 框架示意图](https://raw.githubusercontent.com/NVlabs/SegFormer/master/resources/image.png)
*图：SegFormer 整体架构。左侧为层级 Transformer 编码器（MiT），输出四级多尺度特征；右侧为 All-MLP 解码器，融合多级特征并预测分割掩码。*

##### 算法伪代码

```python
# SegFormer 前向推理伪代码
def segformer_forward(image):
    # === 编码器: 层级 Transformer (MiT) ===
    # Stage 1: Overlapped Patch Embedding (K=7, S=4, P=3) → H/4 × W/4 × C1
    x = overlapped_patch_embed(image, K=7, S=4, P=3)
    for block in transformer_blocks_stage1:  # Efficient Self-Attn (R=64) + Mix-FFN
        x = block(x)
    F1 = x  # 1/4 分辨率

    # Stage 2: Patch Merging (K=3, S=2, P=1) → H/8 × W/8 × C2
    x = overlapped_patch_embed(F1, K=3, S=2, P=1)
    for block in transformer_blocks_stage2:  # R=16
        x = block(x)
    F2 = x  # 1/8 分辨率

    # Stage 3 & 4: 类似，R=4, R=1
    F3 = stage3(F2)  # 1/16 分辨率
    F4 = stage4(F3)  # 1/32 分辨率

    # === 解码器: All-MLP Decoder ===
    # Step 1: 统一通道维度
    F_hat = [Linear(Ci, C)(Fi) for Fi in [F1, F2, F3, F4]]
    # Step 2: 上采样到 1/4 分辨率
    F_hat = [Upsample(H/4, W/4)(f) for f in F_hat]
    # Step 3: 拼接并融合
    F = Linear(4*C, C)(Concat(F_hat))
    # Step 4: 预测分割掩码
    M = Linear(C, N_cls)(F)  # H/4 × W/4 × N_cls
    return M
```

##### 动机与背景

传统语义分割方法（如 DeepLabv3+、PSPNet）依赖 CNN 骨干网络，其感受野有限，需要借助 ASPP、PPM 等复杂上下文模块来扩大感受野，导致计算开销大。ViT 虽具有全局注意力，但存在三个关键问题：

1. **单尺度输出**：ViT 仅生成单一分辨率特征图，不适合需要多尺度信息的密集预测任务
2. **位置编码固定**：固定分辨率的位置编码在测试分辨率变化时需要插值，导致精度下降
3. **计算复杂度高**：标准自注意力的 \(O(N^2)\) 复杂度在高分辨率遥感图像上不可接受

SegFormer 针对这三个问题分别设计了层级结构、Mix-FFN 和高效自注意力机制。

##### 核心机制详解

**1. 高效自注意力 (Efficient Self-Attention)**

标准自注意力的计算复杂度为 \(O(N^2)\)，其中 \(N = H \times W\)。SegFormer 引入序列缩减操作：

$$\hat{K} = \text{Reshape}\left(\frac{N}{R}, C \cdot R\right)(K)$$

$$K = \text{Linear}(C \cdot R, C)(\hat{K})$$

通过将 Key 序列从 \(N \times C\) 缩减为 \(\frac{N}{R} \times C\)，复杂度降为 \(O\left(\frac{N^2}{R}\right)\)。各阶段的缩减比 \(R = [64, 16, 4, 1]\)，低层（高分辨率）缩减更激进，高层保持完整注意力。

> 💡 关键：这种设计让浅层关注局部纹理（类似卷积），深层捕获全局语义上下文，天然适合遥感图像中"局部细节+全局布局"的双重需求。

**2. Mix-FFN 替代位置编码**

传统 Transformer 依赖固定位置编码，但遥感图像分辨率变化大（从 256×256 到 2048×2048）。SegFormer 提出 Mix-FFN：

$$\mathbf{x}_{out} = \text{MLP}(\text{GELU}(\text{Conv}_{3\times3}(\text{MLP}(\mathbf{x}_{in})))) + \mathbf{x}_{in}$$

其中 \(\text{Conv}_{3\times3}\) 为深度可分离卷积。零填充操作隐式泄露了位置信息，无需显式位置编码。实验证明：

- 使用 Mix-FFN 比位置编码在 Cityscapes 上高 3.2% mIoU（80.5% vs 77.3%）
- 测试分辨率变化时精度仅下降 0.7%（位置编码下降 3.3%）

> ⚠️ 注意：这一特性对遥感场景尤为重要——遥感图像通常需要在不同尺度下推理（滑窗或多尺度测试），Mix-FFN 保证了跨分辨率的鲁棒性。

**3. 轻量级 All-MLP 解码器**

解码器设计极其简洁，仅包含四步 MLP 操作：

$$\hat{F}_i = \text{Linear}(C_i, C)(F_i), \quad \forall i \in \{1,2,3,4\}$$

$$\hat{F}_i = \text{Upsample}\left(\frac{H}{4} \times \frac{W}{4}\right)(\hat{F}_i), \quad \forall i$$

$$F = \text{Linear}(4C, C)(\text{Concat}(\hat{F}_1, \hat{F}_2, \hat{F}_3, \hat{F}_4))$$

$$M = \text{Linear}(C, N_{cls})(F)$$

> 💡 关键：这种简单设计之所以有效，是因为 Transformer 编码器的有效感受野（ERF）远大于 CNN。实验表明，MiT 的 Stage-4 ERF 覆盖几乎整个图像，而 ResNet 的 Stage-4 ERF 仅覆盖局部区域。因此 Transformer 不需要 ASPP 等额外上下文模块。

**4. 重叠 Patch Merging**

不同于 ViT 使用 16×16 的非重叠分块，SegFormer 使用重叠卷积进行 Patch Embedding：
- 第一阶段：\(K=7, S=4, P=3\)，将图像从 \(H \times W \times 3\) 映射到 \(\frac{H}{4} \times \frac{W}{4} \times C_1\)
- 后续阶段：\(K=3, S=2, P=1\)，逐步降采样

重叠设计保留了 patch 边界处的局部连续性，避免了非重叠分块导致的边缘伪影——这对遥感图像中细长目标（道路、河流）的分割尤为关键。

##### 与传统方法的对比

| 特性 | DeepLabv3+ | SETR | SegFormer |
|------|-----------|------|-----------|
| 骨干网络 | CNN (ResNet) | ViT-Large | MiT (层级Transformer) |
| 特征尺度 | 多尺度 (通过空洞卷积) | 单尺度 | 原生多尺度 |
| 位置编码 | 不需要 | 固定PE (ImageNet-22K预训练) | 无需PE (Mix-FFN) |
| 解码器 | ASPP + 3×3 Conv | 复杂上采样模块 | 纯MLP (极轻量) |
| 预训练数据 | ImageNet-1K | ImageNet-22K | ImageNet-1K |
| ADE20K mIoU | 44.1% (ResNet-101) | 50.2% (ViT-L, 318M) | 51.8% (MiT-B5, 84.7M) |

##### 遥感应用价值

SegFormer 的设计特性使其天然适合遥感语义分割：

1. **多尺度特征**：遥感图像中目标尺度差异极大（建筑物 vs 道路），层级编码器直接输出多尺度特征
2. **分辨率鲁棒性**：Mix-FFN 消除了位置编码对固定分辨率的依赖，适应遥感图像的多分辨率推理
3. **全局上下文**：高效自注意力在深层保持全局感受野，有助于理解遥感场景的空间布局
4. **轻量高效**：B0 模型仅 3.8M 参数，适合边缘部署（无人机、卫星在轨处理）
5. **零样本鲁棒性**：论文展示了在 Cityscapes-C 上的优异鲁棒性，暗示对遥感图像的域偏移（季节、光照变化）具有更好的泛化能力

#### 🧪 练习题

```yaml
question: "SegFormer 使用 Mix-FFN 替代位置编码的核心原因是什么？"
options:
  - "减少模型参数量以实现实时推理"
  - "避免测试分辨率与训练分辨率不同时因位置编码插值导致的精度下降"
  - "增强模型对旋转不变性的建模能力"
  - "简化训练流程，减少超参数调节"
answer: 1
explain: "固定位置编码在测试分辨率变化时需要插值，导致精度显著下降（3.3%）。Mix-FFN 通过 3×3 深度卷积的零填充隐式编码位置信息，使精度仅下降 0.7%，对遥感等多分辨率场景尤为关键。"
```