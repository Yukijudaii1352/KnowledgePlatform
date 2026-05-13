### RTMDet-R

```yaml
id: rtmdet_r
name: RTMDet-R
full_name: "实时旋转目标检测 (RTMDet: An Empirical Study of Designing Real-Time Object Detectors — Rotated Extension)"
year: "2022"
org: "OpenMMLab / 上海人工智能实验室"
paper_url: "https://arxiv.org/abs/2212.07784"
category: "rotated_detection"
parent: "RTMDet"
motivation: "通过最小化适配将高效通用检测器RTMDet扩展到旋转目标检测，利用COCO预训练+SimOTA动态标签分配实现DOTA SOTA"
```

#### 📝 一句话总结

RTMDet-R 在高效实时检测器 RTMDet 基础上，仅通过三步最小化适配（增加角度预测分支、引入旋转框编码器、替换为 RotatedIoU 损失）即可将水平框检测器扩展为旋转目标检测器，结合 COCO 预训练迁移和动态软标签分配策略，在 DOTA v1.0 上以 81.33% mAP 达到 SOTA 水平。

#### 🎯 核心要点

- **基础架构**：基于 CSPDarkNet backbone + CSPNeXt 构建块，使用 5×5 大核深度可分离卷积扩大感受野
- **Backbone-Neck 容量平衡**：将更多参数分配给 Neck（PAFPN），使 backbone 与 neck 容量接近，提升多尺度特征融合能力
- **共享检测头 + 分离 BN（SepBNHead）**：不同尺度共享卷积权重但使用独立 BN 层，减少参数同时保持精度
- **动态软标签分配**：基于 SimOTA 改进，使用 IoU 作为软标签替代二值标签，回归代价采用 \(-\log(\text{IoU})\) 放大低质量匹配差异
- **Cached Mosaic & MixUp**：通过缓存机制减少数据加载开销，两阶段训练（强增强 280 epoch → 弱增强 20 epoch）
- **RTMDet-R 三步适配**：(1) 回归分支增加 1×1 卷积预测角度 (2) 引入旋转框编码器 (3) GIoU 损失替换为 RotatedIoU 损失
- **COCO 预训练迁移**：水平框 COCO 预训练权重直接迁移到旋转检测任务，显著提升性能
- **DOTA v1.0 SOTA**：RTMDet-R-l 达到 81.33% mAP，超越同期旋转检测方法

#### 🔬 深入细节

![RTMDet 整体架构图](https://raw.githubusercontent.com/open-mmlab/mmdetection/main/resources/rtmdet_overview.png)
*图：RTMDet 整体架构示意，包含 CSPDarkNet Backbone、PAFPN Neck 和共享检测头*

##### 1. 模型架构设计

**CSPNeXt 基础构建块**

RTMDet 的核心创新之一是重新设计了基础构建块。传统 YOLO 系列使用 3×3 常规卷积堆叠，RTMDet 将其替换为 **5×5 大核深度可分离卷积**，在几乎不增加计算量的前提下显著扩大了感受野：

$$
\text{CSPNeXt Block}: x \rightarrow \text{DWConv}_{5\times5}(x) \rightarrow \text{PWConv}_{1\times1}(\cdot)
$$

> 💡 **关键**：5×5 深度卷积的有效感受野远大于两个 3×3 卷积的堆叠，而 FLOPs 仅为常规 5×5 卷积的 \(\frac{1}{C}\)（C 为通道数），这是 RTMDet 能在保持实时性的同时提升精度的核心设计。

**Backbone-Neck 容量平衡**

传统检测器（如 YOLOX）将大部分参数集中在 backbone，neck 仅占很小比例。RTMDet 的实验发现：**当 backbone 和 neck 的参数量接近时，多尺度特征融合效果最佳**。因此 RTMDet 增大了 PAFPN neck 的通道数和层数，使其与 backbone 容量匹配。

**SepBNHead：共享卷积 + 分离 BN**

检测头在不同 FPN 层级间共享卷积权重，但为每个层级使用独立的 Batch Normalization 层：

```python
# SepBNHead 伪代码
class SepBNHead:
    def __init__(self, num_levels=3):
        self.shared_conv = Conv2d(...)       # 所有层级共享
        self.bn_list = [BN() for _ in range(num_levels)]  # 每层独立BN
    
    def forward(self, features):
        outputs = []
        for i, feat in enumerate(features):
            x = self.shared_conv(feat)
            x = self.bn_list[i](x)          # 使用对应层级的BN
            outputs.append(x)
        return outputs
```

> 💡 **关键**：不同 FPN 层级的特征统计分布差异较大，独立 BN 可以为每个层级学习合适的归一化参数，而共享卷积则大幅减少了参数量。

##### 2. 动态软标签分配策略

RTMDet 基于 SimOTA 提出了改进的动态标签分配策略，核心改进在于引入**软标签**替代传统的二值标签。总代价函数为：

$$
C = \lambda_1 C_{cls} + \lambda_2 C_{reg} + \lambda_3 C_{center}
$$

其中 \(\lambda_1=1, \lambda_2=3, \lambda_3=1\)。

**软分类代价**：使用预测框与 GT 框的 IoU 作为软标签 \(Y_{soft}\)，而非传统的 0/1 二值标签：

$$
C_{cls} = \text{CE}(P, Y_{soft}) \times (Y_{soft} - P)^2
$$

> ⚠️ **注意**：传统二值标签会导致分类得分高但定位差的预测获得低代价，造成分类与回归不一致。软标签将 IoU 质量编码进分类目标，迫使模型同时优化分类和定位。

**对数回归代价**：使用 \(-\log(\text{IoU})\) 替代 GIoU 作为回归代价：

$$
C_{reg} = -\log(\text{IoU})
$$

这一设计放大了低 IoU 匹配对的代价差异，使高质量匹配和低质量匹配更容易区分。

**软中心先验代价**：使用指数衰减的软中心区域替代固定的中心先验：

$$
C_{center} = \alpha^{|x_{pred} - x_{gt}| - \beta}
$$

其中 \(\alpha=10, \beta=3\)。

##### 3. 数据增强与训练策略

**Cached Mosaic & MixUp**

传统 Mosaic 增强每次需要加载 4 张图像，MixUp 需要额外加载 1 张，数据 I/O 成为瓶颈。RTMDet 引入**缓存机制**：维护一个图像缓存队列，混合时直接从缓存中取图，将数据加载开销降低到单张图像水平。

**两阶段训练**：
- **第一阶段（前 280 epoch）**：使用 Cached Mosaic + MixUp 强增强
- **第二阶段（后 20 epoch）**：切换为 Large Scale Jittering (LSJ) + 随机翻转，让模型在更接近真实分布的数据上微调

**Flat Cosine 学习率调度**：先以恒定学习率训练（Flat 阶段），再以余弦退火衰减，配合 AdamW 优化器使用。

##### 4. RTMDet-R：旋转目标检测适配

RTMDet-R 是 RTMDet 向旋转目标检测的扩展，核心思想是**最小化适配**——仅需三步修改即可将水平框检测器转换为旋转框检测器：

```python
# RTMDet → RTMDet-R 三步适配伪代码

# Step 1: 增加角度预测分支
# 原始回归头输出 4 维 (x, y, w, h)
# 新增 1×1 卷积预测角度，输出变为 5 维 (x, y, w, h, θ)
angle_pred = nn.Conv2d(feat_channels, 1, kernel_size=1)

# Step 2: 引入旋转框编码器
# 将角度编码为适合回归的表示形式
encoded_angle = rotated_box_encoder(angle_pred)

# Step 3: 替换损失函数
# GIoU Loss → RotatedIoU Loss
loss_bbox = RotatedIoULoss(pred_rbox, gt_rbox)
```

> 💡 **关键**：这种最小化适配的设计哲学意味着 RTMDet 在 COCO 水平框检测上学到的特征表示可以直接迁移到旋转检测任务。实验证明，**COCO 预训练 + DOTA 微调**的策略比从头训练带来显著提升。

##### 5. 实验结果

**DOTA v1.0 旋转目标检测**（单尺度测试）：

| 模型 | Backbone | mAP (%) |
|------|----------|---------|
| Oriented R-CNN | ResNet-50 | 75.87 |
| ReDet | ReResNet-50 | 76.25 |
| LSKNet-S | LSKNet | 81.64 |
| **RTMDet-R-tiny** | CSPNeXt | 75.60 |
| **RTMDet-R-s** | CSPNeXt | 78.98 |
| **RTMDet-R-m** | CSPNeXt | 80.26 |
| **RTMDet-R-l** | CSPNeXt | **81.33** |

RTMDet-R-l 以 81.33% mAP 在 DOTA v1.0 上达到极具竞争力的结果，同时保持了远优于两阶段方法的推理速度。

**与传统方法的核心区别**：
1. **vs 两阶段旋转检测器**（如 Oriented R-CNN）：RTMDet-R 为单阶段 anchor-free 设计，推理速度快数倍
2. **vs 专用旋转检测器**（如 ReDet）：无需设计旋转等变特征提取器，通过通用检测器最小化适配即可达到相当精度
3. **vs 角度分类方法**（如 CSL）：直接回归角度值，避免角度离散化带来的精度损失

#### 🧪 练习题

```yaml
question: "RTMDet-R 从水平框检测器适配为旋转框检测器，以下哪项不是其核心适配步骤？"
options:
  - "在回归分支增加 1×1 卷积预测旋转角度"
  - "将 GIoU 损失替换为 RotatedIoU 损失"
  - "重新设计 backbone 引入旋转等变卷积"
  - "引入旋转框编码器对角度进行编码"
answer: 2
explain: "RTMDet-R 的核心设计哲学是最小化适配，直接复用 RTMDet 的 backbone 架构，仅在检测头增加角度预测、旋转编码器和 RotIoU 损失三步修改，无需重新设计 backbone。"
```