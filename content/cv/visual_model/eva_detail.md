### EVA — 探索掩码视觉表征学习的极限 (Exploring the Limits of Masked Visual Representation Learning at Scale)

```yaml
id: eva
name: EVA
full_name: "探索掩码视觉表征学习的极限 (Exploring the Limits of Masked Visual Representation Learning at Scale)"
year: 2022
org: 智源 (BAAI)
paper_url: https://arxiv.org/abs/2211.07636
category: representation
parent: mae
motivation: "MIM预训练1B参数vanilla ViT，用CLIP视觉特征作为重建目标，将语义信息引入掩码建模"
```

#### 📝 一句话总结

EVA 提出以 CLIP 视觉特征（而非原始像素）作为掩码图像建模（MIM）的重建目标，成功将 vanilla ViT 扩展至 10 亿参数规模（ViT-g），在图像分类、目标检测、实例分割、语义分割和视频动作识别等多项下游任务上取得了全面领先的结果。

#### 🎯 核心要点

- **架构**：vanilla ViT-g，1.011B 参数（40 层，1408 隐藏维度，6144 MLP 维度，16 头），不引入任何视觉先验
- **预训练任务**：掩码图像建模（MIM），以冻结的 OpenAI CLIP-L/14 视觉编码器输出特征作为重建目标
- **掩码策略**：40% block-wise masking ratio，仅对被掩码 patch 的特征进行回归预测
- **损失函数**：负余弦相似度（negative cosine similarity），无需对 CLIP 特征进行 tokenization 或量化
- **预训练数据**：29.6M 公开图像（ImageNet-21K + CC12M + CC3M + Object365 + COCO + ADE20K）
- **关键发现**：直接回归 CLIP 特征优于 tokenize 后做分类，蒸馏（同时预测可见+掩码 patch）反而有害
- **下游 SOTA**：ImageNet-1K 89.7%、COCO 检测 64.7 AP\(^{\text{box}}\)、LVIS 分割 55.0 AP\(^{\text{mask}}\)、ADE20K 语义分割 62.3 mIoU、Kinetics-400/600/700 视频分类 89.7/89.8/82.9%
- **EVA-CLIP**：用 EVA 预训练权重初始化 1.1B CLIP 视觉塔，稳定大规模对比学习训练，以更少数据超越从头训练的 Open CLIP-H
- **鲁棒性**：ImageNet 与其分布偏移变体之间的性能差距仅 5.6，远优于此前方法

#### 🔬 深入细节

##### 框架总览

![EVA 预训练与下游迁移流程](https://raw.githubusercontent.com/baaivision/EVA/master/assets/eva_pipeline.png)
*图：EVA 的整体流程。左侧为 MIM 预训练阶段（以 CLIP 特征为重建目标），右侧为在多种下游视觉任务上的迁移应用，最终还可用于初始化更大规模的 CLIP 模型。*

##### 算法伪代码

```python
# EVA 预训练核心流程伪代码
# 输入: 图像数据集 D, 冻结的 CLIP 视觉编码器 f_clip
# 输出: 预训练好的 ViT-g 编码器 f_eva

f_clip = load_frozen_clip("CLIP-L/14")  # 冻结，不更新
f_eva = ViT_g(layers=40, dim=1408, heads=16)  # 1.011B 参数

for epoch in range(150):
    for images in DataLoader(D, batch_size=4096):
        # Step 1: Block-wise masking (40% ratio)
        visible_patches, masked_indices = block_mask(images, ratio=0.40)
        
        # Step 2: EVA 编码器仅处理可见 patch
        visible_features = f_eva.encode(visible_patches)
        
        # Step 3: 轻量级解码器预测被掩码位置的特征
        predicted_features = decoder(visible_features, masked_indices)
        
        # Step 4: CLIP 提取完整图像的目标特征
        with torch.no_grad():
            target_features = f_clip.encode_patches(images)  # 所有 patch 的特征
            target_masked = target_features[masked_indices]   # 仅取被掩码位置
        
        # Step 5: 负余弦相似度损失（仅在 masked patches 上计算）
        loss = -cosine_similarity(predicted_features, target_masked).mean()
        
        optimizer.step(loss)
```

##### 动机与背景

掩码图像建模（MIM）借鉴了 NLP 中 BERT/GPT 的成功范式，通过"遮住一部分、预测被遮部分"来学习视觉表征。MAE 和 BEiT 等先驱工作已经证明了 MIM 的有效性，但存在两个核心问题：

1. **重建目标缺乏语义**：MAE 直接重建原始像素，学到的更多是低层纹理信息而非高层语义。BEiT 虽然用 dVAE token 作为目标，但 token 本身也缺乏显式的语义对齐。
2. **模型规模受限**：此前的 MIM 方法主要在 ViT-B/L/H（至多 630M 参数）上验证，尚未探索 10 亿参数级别的 scaling 行为。

EVA 的核心洞察是：**用 CLIP 的视觉特征作为 MIM 的重建目标，可以将图像-文本对齐的语义信息注入到纯视觉的自监督预训练中**，同时这种方法在大规模下表现出优异的 scaling 特性。

##### 核心机制详解

**1. 重建目标：CLIP 视觉特征**

EVA 使用冻结的 OpenAI CLIP-L/14 视觉编码器提取每个 patch 的特征作为预测目标。具体而言，对于输入图像 \(x\)，CLIP 编码器输出 patch-level 特征序列 \(\{f_i^{\text{clip}}\}_{i=1}^{N}\)，其中 \(N\) 为 patch 总数。EVA 编码器仅需预测被掩码位置 \(\mathcal{M}\) 对应的 CLIP 特征。

> 💡 **关键直觉**：CLIP 特征天然包含图像-文本对齐的语义信息，用它作为目标相当于让 MIM 预训练"站在巨人的肩膀上"——不仅学习视觉结构，还隐式地学习了语义理解能力。

**2. 损失函数：负余弦相似度**

EVA 使用负余弦相似度作为损失函数：

$$\mathcal{L} = -\frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \frac{\hat{f}_i \cdot f_i^{\text{clip}}}{\|\hat{f}_i\| \cdot \|f_i^{\text{clip}}\|}$$

其中 \(\hat{f}_i\) 是 EVA 对第 \(i\) 个被掩码 patch 的预测特征，\(f_i^{\text{clip}}\) 是对应的 CLIP 目标特征。

> ⚠️ **重要发现**：论文通过 pilot study 系统比较了多种重建目标设计：
> - 将 CLIP 特征 tokenize 后做分类（类似 BEiT）→ 性能下降，因为量化引入信息损失
> - 蒸馏模式（同时预测可见和掩码 patch 的特征）→ 性能下降，因为可见 patch 的预测过于简单，稀释了学习信号
> - **直接回归被掩码 patch 的 CLIP 特征** → 最优方案，简单且高效

**3. 掩码策略：Block-wise Masking**

EVA 采用 40% 的 block-wise masking ratio。与 MAE 的 75% random masking 不同，EVA 选择较低的掩码比例，这是因为：
- CLIP 特征本身已经是高层语义表示，预测难度较大
- 较低的掩码比例保留更多上下文信息，有助于学习更好的表征
- Block-wise（而非 random）masking 增加了空间连续性，迫使模型理解更大范围的视觉结构

**4. 模型架构：Vanilla ViT-g**

EVA 刻意选择了不带任何视觉先验（如窗口注意力、层级结构）的 vanilla ViT 架构：

| 参数 | 值 |
|------|-----|
| 层数 | 40 |
| 隐藏维度 | 1408 |
| MLP 维度 | 6144 |
| 注意力头数 | 16 |
| 总参数量 | 1.011B |
| Patch 大小 | 14×14 |

> 💡 **设计哲学**：EVA 认为视觉模型应当像语言模型一样，通过大规模预训练而非架构归纳偏置来获得能力。Vanilla ViT 的简洁性使其更容易扩展，且与 NLP Transformer 架构统一，有利于未来的多模态融合。

##### 训练流程与关键细节

**预训练阶段**：
- 数据：合并 6 个公开数据集共 29.6M 图像（去重后），不使用任何标签
- 输入分辨率：224×224（patch size 14×14，共 256 个 patch）
- 优化器：AdamW（\(\beta_1=0.9, \beta_2=0.98\)），学习率 1e-3，weight decay 0.05
- 训练：150 epochs，batch size 4096，fp16 混合精度
- 硬件：128 张 A100-40G GPU，约 14.5 天
- 解码器：仅 2 层 Transformer block（轻量级），训练后丢弃

**下游微调**：
- **图像分类**（ImageNet-1K）：先在 IN-21K 上中间微调（90 epochs, 224²），再在 IN-1K 上微调（10 epochs, 336² 或 560²），达到 89.7% top-1
- **目标检测/实例分割**（COCO & LVIS）：使用 Cascade Mask R-CNN（ViTDet 框架），COCO 达到 64.7 AP\(^{\text{box}}\)，LVIS 达到 62.2 AP\(^{\text{box}}\) / 55.0 AP\(^{\text{mask}}\)
- **语义分割**（ADE20K）：使用 UperNet，达到 62.3 mIoU（单尺度）
- **视频分类**（Kinetics-400/600/700）：直接微调，K-400 达到 89.7%

##### 与传统方法的核心区别

| 对比维度 | MAE | BEiT | EVA |
|---------|-----|------|-----|
| 重建目标 | 原始像素 | dVAE token（离散） | CLIP 视觉特征（连续） |
| 语义信息 | 无 | 弱（dVAE 无语义对齐） | 强（CLIP 图文对齐） |
| 掩码比例 | 75% | 40% | 40% |
| 损失函数 | MSE | 交叉熵 | 负余弦相似度 |
| 最大模型 | ViT-H (632M) | ViT-L (307M) | ViT-g (1.011B) |
| 额外依赖 | 无 | 需训练 dVAE tokenizer | 需冻结 CLIP 模型 |

EVA 的独特优势在于：**CLIP 特征作为"免费"的语义监督信号，无需额外训练 tokenizer，也无需标注数据，却能将丰富的图文对齐语义注入 MIM 预训练**。这使得 EVA 在几乎所有下游任务上都显著超越了像素重建和 token 预测的 MIM 方法。

##### EVA-CLIP：反哺多模态学习

EVA 的一个重要应用是用其预训练权重初始化更大规模的 CLIP 视觉编码器。具体做法：
1. 用 EVA 预训练的 ViT-g 权重初始化 1.1B 参数的 CLIP 视觉塔
2. 语言塔从 CLIP-L 初始化
3. 在 Merged-2B 数据集上进行图文对比学习

这种"MIM 预训练 → CLIP 微调"的交替训练策略带来了显著收益：
- 训练更稳定，避免了大规模 CLIP 训练中常见的崩溃问题
- 以更少的数据和计算量超越了从头训练的 Open CLIP-H
- EVA-CLIP 在 ImageNet 零样本分类上达到 78.5%，刷新了当时的自监督学习 SOTA

> 💡 **深层启示**：EVA 展示了一条"CLIP → MIM → 更大 CLIP"的渐进式 scaling 路径——从较小的 CLIP-L 出发，通过 MIM 预训练扩展到 1B 级别的 ViT-g，再用其初始化更大的 CLIP 模型，形成了一个高效的视觉基础模型 scaling 循环。

#### 🧪 练习题

```yaml
question: "EVA 在 MIM 预训练中选择 CLIP 视觉特征作为重建目标的核心优势是什么？"
options:
  - "CLIP 特征维度更低，降低了计算成本"
  - "CLIP 特征包含图文对齐的语义信息，为 MIM 引入了高层语义监督"
  - "CLIP 特征是离散 token，便于用交叉熵损失训练"
  - "CLIP 特征可以替代数据增强，减少对训练数据量的需求"
answer: 1
explain: "EVA 的核心创新在于利用 CLIP 视觉特征天然携带的图像-文本对齐语义信息，使 MIM 预训练不仅学习视觉结构，还隐式获得语义理解能力，这是像素重建或 dVAE token 预测所不具备的。"
```