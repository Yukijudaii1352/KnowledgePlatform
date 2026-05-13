### DeepLabv3: Rethinking Atrous Convolution for Semantic Image Segmentation

```yaml
paper_id: "1706.05587"
title: "Rethinking Atrous Convolution for Semantic Image Segmentation"
authors: ["Liang-Chieh Chen", "George Papandreou", "Florian Schroff", "Hartmut Adam"]
year: 2017
venue: "arXiv (later ECCV 2018 workshop)"
tldr: "通过改进空洞卷积(Atrous Convolution)的使用方式——级联空洞模块和增强版ASPP(含图像级特征)——在不需要DenseCRF后处理的情况下实现了PASCAL VOC 2012上85.7%的mIOU"
tags: ["semantic_segmentation", "atrous_convolution", "ASPP", "multi_scale", "DeepLab"]
```

---

## 📝 一句话总结

DeepLabv3重新审视空洞卷积在语义分割中的应用，提出级联空洞卷积模块和增强版ASPP（加入图像级特征解决大采样率退化问题），在PASCAL VOC 2012上达到85.7% mIOU，且无需DenseCRF后处理。

---

## 🎯 核心要点

### 问题与动机

语义分割面临两大核心挑战：
1. **连续池化/步长操作导致分辨率下降**：深度网络中反复的下采样使特征图分辨率降低，丢失空间细节
2. **多尺度目标的存在**：场景中物体尺度差异大，需要捕获多尺度上下文信息

此前的DeepLabv2使用ASPP+DenseCRF，但存在两个问题：
- 大采样率的空洞卷积滤波器**退化为1×1卷积**（有效权重仅中心点），无法捕获长距离上下文
- 依赖DenseCRF后处理增加复杂度

### 关键创新

| 创新点 | 描述 | 效果 |
|--------|------|------|
| **Multi-Grid策略** | 在ResNet block内部使用不同空洞率(r₁,r₂,r₃)，而非统一率 | block4用(1,2,4)比(1,1,1)提升1.22% |
| **改进的ASPP** | 1×1 conv + 三个3×3 conv(rates=6,12,18) + **图像级特征**(GAP) | 图像级特征贡献+0.75% |
| **去除DenseCRF** | 改进的BN训练+上采样logits+大crop size使后处理不再必要 | 简化pipeline，性能更优 |
| **训练协议改进** | fine-tune BN、上采样logits(非下采样GT)、crop=513 | 新协议比旧协议提升~10% |

### 主要结果

- **PASCAL VOC 2012 val set**: 79.77% mIOU（无COCO预训练，无DenseCRF）
- **PASCAL VOC 2012 test set**: **85.7% mIOU**（COCO预训练+JFT预训练）
- 超越DeepLabv2（77.69% with DenseCRF + COCO）约2% 且无需CRF后处理

---

## 🔬 深入细节

### 1. 空洞卷积基础

空洞卷积（Atrous/Dilated Convolution）通过在滤波器权重之间插入零来扩大感受野，而不增加参数量或降低分辨率：

$$y[i] = \sum_{k} x[i + r \cdot k] \cdot w[k]$$

其中 $r$ 为空洞率（rate）。$r=1$ 时退化为标准卷积。

**output_stride**：输入图像分辨率与最终特征图分辨率之比。通过调整空洞率，可以在不改变网络结构的情况下控制output_stride（如从32降到16或8），从而获得更密集的特征图。

![Atrous Convolution示意图](https://ar5iv.labs.arxiv.org/html/1706.05587v3/assets/x1.png)

### 2. 架构设计：两种多尺度方案

#### 方案A：级联空洞卷积（Cascaded Modules）

在ResNet基础上添加额外的block（block5~block7），每个block内使用Multi-Grid策略：

```
ResNet Block结构（以block4为例）:
  block4 = 3个bottleneck单元
  Multi_Grid = (r1, r2, r3) = (1, 2, 4)
  
  对于第i个单元:
    实际空洞率 = unit_rate × Multi_Grid[i]
    其中 unit_rate 由output_stride决定
```

**关键实验结果**（output_stride=16, ResNet-101）：

| 深度 | block4 | block5 | block6 | block7 |
|------|--------|--------|--------|--------|
| mIOU | 68.39% | 73.21% | 75.34% | 75.76% |

#### 方案B：改进的ASPP（最终选择）

![ASPP架构图](https://ar5iv.labs.arxiv.org/html/1706.05587v3/assets/x9.png)

ASPP并行使用多个不同采样率的空洞卷积捕获多尺度信息：

```
ASPP Module (output_stride=16):
├── Branch 1: 1×1 Conv, 256 filters
├── Branch 2: 3×3 Conv, rate=6, 256 filters  
├── Branch 3: 3×3 Conv, rate=12, 256 filters
├── Branch 4: 3×3 Conv, rate=18, 256 filters
├── Branch 5: Global Average Pooling → 1×1 Conv → Bilinear Upsample  ← 关键新增！
│
└── Concat → 1×1 Conv (融合) → Final Logits → Bilinear 4× Upsample
    所有分支后均有 BN + ReLU
```

**为什么需要图像级特征？**

![滤波器退化示意](https://ar5iv.labs.arxiv.org/html/1706.05587v3/assets/x8.png)

当空洞率过大时，3×3滤波器的9个采样点中大部分落在特征图边界外（padding区域），有效权重退化为仅中心1个点，等价于1×1卷积。图像级特征（Global Average Pooling）提供了真正的全局上下文，弥补了这一缺陷。

### 3. 伪代码

```python
class DeepLabv3(nn.Module):
    def __init__(self, num_classes=21, output_stride=16):
        # Backbone: ResNet-101 with Multi-Grid atrous convolution
        self.backbone = ResNet101(
            output_stride=output_stride,
            multi_grid=(1, 2, 4)  # applied to block4's 3 units
        )
        
        # ASPP Module
        if output_stride == 16:
            rates = (6, 12, 18)
        elif output_stride == 8:
            rates = (12, 24, 36)
            
        self.aspp = ASPP(
            in_channels=2048,
            out_channels=256,
            rates=rates
        )
        
        # Final classifier
        self.classifier = nn.Conv2d(256, num_classes, 1)
    
    def forward(self, x):
        input_size = x.shape[2:]
        
        # 1. Extract features with controlled output_stride
        features = self.backbone(x)  # H/16 or H/8
        
        # 2. ASPP: multi-scale context encoding
        x = self.aspp(features)
        
        # 3. Classification + upsample to input resolution
        x = self.classifier(x)
        x = F.interpolate(x, size=input_size, mode='bilinear')
        return x


class ASPP(nn.Module):
    def __init__(self, in_ch, out_ch, rates=(6, 12, 18)):
        # Branch 1: 1×1 convolution
        self.conv1x1 = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 1), nn.BatchNorm2d(out_ch), nn.ReLU()
        )
        # Branch 2-4: 3×3 atrous convolutions
        self.atrous_convs = nn.ModuleList([
            nn.Sequential(
                nn.Conv2d(in_ch, out_ch, 3, padding=r, dilation=r),
                nn.BatchNorm2d(out_ch), nn.ReLU()
            ) for r in rates
        ])
        # Branch 5: Image-level features (Global Average Pooling)
        self.image_pooling = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Conv2d(in_ch, out_ch, 1), nn.BatchNorm2d(out_ch), nn.ReLU()
        )
        # Fusion: concat 5 branches → 1×1 conv
        self.project = nn.Sequential(
            nn.Conv2d(out_ch * 5, out_ch, 1),
            nn.BatchNorm2d(out_ch), nn.ReLU(), nn.Dropout(0.1)
        )
    
    def forward(self, x):
        h, w = x.shape[2:]
        branches = [self.conv1x1(x)]
        branches += [conv(x) for conv in self.atrous_convs]
        # Image-level: pool → conv → upsample back
        img_feat = self.image_pooling(x)
        img_feat = F.interpolate(img_feat, size=(h, w), mode='bilinear')
        branches.append(img_feat)
        
        return self.project(torch.cat(branches, dim=1))
```

### 4. 训练细节

| 超参数 | 值 | 说明 |
|--------|-----|------|
| 学习率策略 | poly: $lr_0 \times (1 - \frac{iter}{max\_iter})^{0.9}$ | 初始lr=0.007 |
| Crop Size | 513×513 | 大crop避免大rate空洞卷积采样到padding区域 |
| Batch Size | 16 | 用于训练BN参数 |
| BN decay | 0.9997 | fine-tune BN是关键改进 |
| 数据增强 | 随机缩放(0.5~2.0) + 随机水平翻转 | — |
| 训练阶段1 | trainaug, OS=16, 30K iter, lr=0.007 | 快速训练（特征图小4×） |
| 训练阶段2 | trainval, OS=8, 30K iter, lr=0.001, freeze BN | 精细化训练 |
| 上采样logits | ✓（而非下采样GT） | 保留GT细节，提升边界质量 |

### 5. 关键消融实验

**ASPP配置消融**（output_stride=16, PASCAL VOC 2012 val）：

| Multi-Grid | ASPP rates | Image Pooling | mIOU |
|------------|-----------|---------------|------|
| (1,1,1) | (6,12,18) | ✗ | 75.36% |
| (1,2,1) | (6,12,18) | ✗ | 75.93% |
| (1,2,4) | (6,12,18) | ✗ | 76.46% |
| (1,2,4) | (6,12,18) | **✓** | **77.21%** |
| (1,2,4) | (6,12,18,24) | ✗ | 76.58%→加rate=24反而降 |

**推理策略累积效果**：

| 配置 | mIOU |
|------|------|
| MG+ASPP+ImgPool, OS=16 | 77.21% |
| + OS=8 | 78.51% (+1.30) |
| + Multi-Scale | 79.45% (+0.94) |
| + Flip | 79.77% (+0.32) |
| + COCO pretrain | 82.70% (+2.93) |

**训练协议消融**：

| 改动 | mIOU |
|------|------|
| 完整新协议 | 77.21% |
| 不fine-tune BN | 75.95% (-1.26) |
| 不上采样logits | 76.01% (-1.20) |
| crop=321（旧设置） | 67.22% (-9.99) |

### 6. 与前作对比

| 方法 | DenseCRF | COCO | Val mIOU | Test mIOU |
|------|----------|------|----------|-----------|
| DeepLabv2 | ✓ | ✓ | 77.69% | 79.7% |
| **DeepLabv3** | **✗** | ✓ | 82.70% | **85.7%** |

核心改进来源：(1) fine-tune BN参数 (2) 更好的多尺度上下文编码（改进ASPP+图像级特征）(3) 改进的训练协议

---

## 🧪 练习题

### 概念理解

1. **空洞率退化问题**：当一个3×3空洞卷积的rate非常大（如rate=24）应用在33×33的特征图上时，为什么它会退化为1×1卷积？请画图说明9个采样点的位置。

2. **output_stride的权衡**：为什么训练时先用output_stride=16再切换到output_stride=8？如果全程使用output_stride=8会有什么问题？

3. **图像级特征的作用**：为什么Global Average Pooling能弥补大rate空洞卷积的退化问题？它捕获的信息与ASPP中其他分支有何本质区别？

### 设计分析

4. **ASPP vs 级联**：论文同时提出了级联空洞模块和ASPP两种方案，最终选择ASPP（79.77% vs 79.35%）。请分析两种方案在感受野覆盖方式上的本质差异，以及为什么ASPP略优。

5. **rate=24的反效果**：在ASPP中加入rate=24的分支反而使性能下降0.12%，这与图像级特征的加入形成对比。请解释这一现象。

### 延伸思考

6. **从DeepLabv3到v3+**：DeepLabv3的decoder极其简单（直接双线性上采样）。如果要设计一个更好的decoder来恢复边界细节，你会怎么做？（提示：参考DeepLabv3+的encoder-decoder结构）

7. **计算效率**：ASPP的5个并行分支都在高分辨率特征图（H/16或H/8）上操作。如果要在移动端部署，你会如何简化ASPP模块同时尽量保持性能？

---

*参考文献：Chen, L.C., Papandreou, G., Schroff, F., & Adam, H. (2017). Rethinking Atrous Convolution for Semantic Image Segmentation. arXiv:1706.05587*