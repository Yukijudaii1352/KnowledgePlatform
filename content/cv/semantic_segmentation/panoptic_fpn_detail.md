### Panoptic FPN

```yaml
id: panoptic_fpn
name: "Panoptic FPN"
full_name: "全景特征金字塔网络 (Panoptic Feature Pyramid Networks)"
year: "2019"
org: "Facebook AI Research (FAIR)"
paper_url: "https://arxiv.org/abs/1901.02446"
category: "core"
parent: "fpn"
motivation: "在FPN上添加轻量语义分割分支，统一实例与语义分割实现全景分割"
```

#### 📝 一句话总结

Panoptic FPN 在 Mask R-CNN 的 FPN 骨干上添加一个轻量级语义分割分支（Semantic FPN），通过多尺度特征融合实现像素级 stuff 分类，与实例分割分支联合训练，以单一统一架构同时完成 thing 和 stuff 的全景分割任务。

#### 🎯 核心要点

- 统一架构：在 Mask R-CNN + FPN 基础上增加语义分割分支，单模型同时输出实例分割和语义分割
- 轻量语义分支（Semantic FPN）：将 FPN 各层级（P2-P5，1/4 到 1/32）通过上采样统一到 1/4 分辨率后逐元素相加，再经 1×1 卷积输出类别预测
- 联合训练策略：总损失 \(L = \lambda_i(L_c + L_b + L_m) + \lambda_s L_s\)，通过调节 \(\lambda_i / \lambda_s\) 平衡实例与语义任务
- FPN 效率优势：相比空洞卷积方法，FPN 计算量和内存占用大幅降低（约 4-7× 更高效），同时产生更高分辨率特征
- 实验结果：Cityscapes 语义分割 79.1% mIoU（ResNeXt-101-FPN）；COCO Stuff 2017 挑战赛第一名（28.8 mIoU）

#### 🔬 深入细节

![Panoptic FPN 整体架构](https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x1.png)
*图：Panoptic FPN 架构总览。上方为 FPN 骨干 + 实例分割分支（Region-based），下方为新增的轻量语义分割分支（Dense-pixels）。两条分支共享 FPN 特征，联合训练。*

##### 动机与背景

全景分割（Panoptic Segmentation）要求同时完成：
- **Thing 分割**（可数物体如人、车）：传统由实例分割方法（如 Mask R-CNN）处理
- **Stuff 分割**（不可数区域如天空、道路）：传统由语义分割方法（如 DeepLab、PSPNet）处理

此前这两类任务使用完全不同的架构：实例分割依赖 FPN + Region Proposal，语义分割依赖空洞卷积（dilated convolution）扩大感受野。Panoptic FPN 的核心洞察是：**FPN 本身已经生成了适合语义分割的多尺度特征**，只需添加一个轻量分支即可，无需空洞卷积。

> 💡 关键洞察：FPN 在每个空间分辨率上都生成了语义丰富的特征图，天然适合密集像素预测任务，而不仅仅是实例检测。

##### 语义分割分支（Semantic FPN）设计

![Semantic FPN 分支结构](https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x3.png)
*图：Semantic FPN 分支。将 FPN 各层级特征逐步上采样至 1/4 分辨率后相加融合。*

Semantic FPN 的设计遵循**简洁高效**原则：

```python
# Semantic FPN 前向推理伪代码
def semantic_fpn_forward(fpn_features):
    """
    输入: FPN 各层级特征 {P2, P3, P4, P5}
          P2: 1/4 分辨率, P3: 1/8, P4: 1/16, P5: 1/32
          每层 256 通道
    """
    # 每个层级通过上采样链路统一到 1/4 分辨率 (128 通道)
    # P5 路径: 3×3 conv → 2× upsample → 3×3 conv → 2× upsample → 3×3 conv → 2× upsample
    p5_out = upsample_2x(conv3x3_gn_relu(
             upsample_2x(conv3x3_gn_relu(
             upsample_2x(conv3x3_gn_relu(P5))))))  # 3次 2× 上采样
    
    # P4 路径: 3×3 conv → 2× upsample → 3×3 conv → 2× upsample
    p4_out = upsample_2x(conv3x3_gn_relu(
             upsample_2x(conv3x3_gn_relu(P4))))     # 2次 2× 上采样
    
    # P3 路径: 3×3 conv → 2× upsample
    p3_out = upsample_2x(conv3x3_gn_relu(P3))       # 1次 2× 上采样
    
    # P2 路径: 3×3 conv (已在 1/4 分辨率)
    p2_out = conv3x3_gn_relu(P2)                     # 无需上采样
    
    # 逐元素求和融合
    fused = p2_out + p3_out + p4_out + p5_out  # [B, 128, H/4, W/4]
    
    # 最终预测: 1×1 卷积 → 4× 双线性上采样
    logits = bilinear_upsample_4x(conv1x1(fused))  # [B, num_classes, H, W]
    return logits
```

设计要点：
1. **每个上采样阶段**由 `3×3 conv + GroupNorm + ReLU + 2× bilinear upsample` 组成
2. **通道数统一为 128**（消融实验表明 128 在精度与效率间最优）
3. **求和聚合**优于拼接（concat），且更节省内存
4. 所有卷积后使用 **Group Normalization**（而非 BN），因为语义分割训练时 batch size 通常较小

> ⚠️ 注意：该分支极其轻量——仅包含少量 3×3 卷积和上采样操作，不使用空洞卷积、ASPP 或任何复杂模块。

##### 联合训练与损失函数

Panoptic FPN 的总损失函数为：

$$L = \lambda_i \cdot (L_{cls} + L_{box} + L_{mask}) + \lambda_s \cdot L_{sem}$$

其中：
- \(L_{cls}, L_{box}, L_{mask}\)：Mask R-CNN 的分类、边框回归、实例掩码损失
- \(L_{sem}\)：语义分割的逐像素交叉熵损失
- \(\lambda_i, \lambda_s\)：实例与语义任务的损失权重

**关键发现**：联合训练不仅不会相互干扰，反而能**互相促进**：
- 固定 \(\lambda_i = 1\)，增大 \(\lambda_s\) 时，语义 mIoU 提升（0 → 41.5），实例 AP 仅轻微下降（33.9 → 32.1）
- 固定 \(\lambda_s = 1\)，增大 \(\lambda_i\) 时，实例 AP 提升（0 → 32.1），语义 mIoU 也略有提升（40.2 → 41.5）
- 最佳平衡点约在 \(\lambda_i = 1, \lambda_s = 0.5\)

> 💡 关键：两个任务共享 FPN 特征，语义分割的梯度信号有助于学习更好的底层特征表示，从而也提升实例分割性能。

##### FPN vs 空洞卷积：效率对比

![FPN 与空洞卷积效率对比](https://ar5iv.labs.arxiv.org/html/1901.02446/assets/x4.png)
*图：FPN 与空洞卷积（Dilated-FCN）在 FLOPs 和内存占用上的对比。FPN 在各种骨干网络下均显著更高效。*

论文的一个重要贡献是系统性地对比了 FPN 与空洞卷积两种多尺度特征提取范式：

| 方法 | 输出分辨率 | FLOPs（相对） | 内存（相对） |
|------|-----------|--------------|-------------|
| Dilated-FCN (output stride 8) | 1/8 | 高 | 高 |
| FPN | 1/4 | **~4-7× 更低** | **~4-7× 更低** |

FPN 更高效的原因：
- 空洞卷积在高分辨率特征图上操作（如 1/8），计算量与分辨率平方成正比
- FPN 在低分辨率上提取高层语义，仅在最后阶段上采样，大部分计算在小特征图上完成
- FPN 同时产生 **1/4 分辨率**输出（比空洞卷积的 1/8 更精细）

##### 与传统方法的区别

| 特性 | 传统语义分割（DeepLab等） | Panoptic FPN |
|------|------------------------|-------------|
| 多尺度机制 | 空洞卷积 / ASPP | FPN 自顶向下路径 |
| 计算效率 | 高（高分辨率特征图） | 低（金字塔结构） |
| 输出分辨率 | 1/8 | 1/4 |
| 实例分割 | 需要额外模型 | 同一模型内置 |
| 全景分割 | 需要后融合两个模型 | 单模型端到端 |

#### 🧪 练习题

```yaml
question: "Panoptic FPN 的语义分割分支如何融合 FPN 各层级的特征？"
options:
  - "将所有层级特征拼接（concat）后通过 1×1 卷积降维"
  - "仅使用最高分辨率的 P2 层特征"
  - "将各层级特征分别上采样到 1/4 分辨率后逐元素求和"
  - "使用注意力机制加权融合各层级特征"
answer: 2
explain: "Semantic FPN 将 P2-P5 各层级通过逐步 2× 上采样统一到 1/4 分辨率，然后逐元素求和（element-wise sum），简洁高效。消融实验表明求和略优于拼接。"
```