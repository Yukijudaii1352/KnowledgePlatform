### Mask R-CNN

```yaml
id: mask_rcnn
name: Mask R-CNN
full_name: 掩码区域卷积神经网络 (Mask Region-based Convolutional Neural Network)
year: 2017
org: FAIR (Facebook AI Research)
paper_url: https://arxiv.org/abs/1703.06870
category: two_stage
parent: faster_rcnn
motivation: 在 Faster R-CNN 基础上添加并行掩码分支，通过 RoIAlign 解决像素级空间对齐问题，实现高质量实例分割
```

#### 📝 一句话总结

Mask R-CNN 在 Faster R-CNN 的基础上添加了一个并行的掩码预测分支，并提出 RoIAlign 替代 RoIPool 以消除特征提取中的量化误差，从而在不牺牲检测速度的前提下实现了高精度的实例分割，成为实例分割领域的里程碑框架。

#### 🎯 核心要点

- **扩展 Faster R-CNN 架构**：在原有分类和回归分支之外，并行添加一个全卷积掩码预测分支（FCN），对每个 RoI 输出像素级二值掩码
- **RoIAlign 层**：用双线性插值替代 RoIPool 中的量化取整操作，精确保留空间位置信息，掩码 AP 提升 10%~50%（在严格 IoU 指标下提升更大）
- **解耦掩码与分类**：对每个类别独立预测二值掩码（per-pixel sigmoid + binary loss），而非多类别 softmax，避免类间竞争，AP 提升约 5.5 个点
- **多任务损失函数**：\(L = L_{cls} + L_{box} + L_{mask}\)，三个任务联合训练，掩码分支的加入还能反向提升检测精度（+0.9 AP\(^{bb}\)）
- **灵活的骨干网络**：支持 ResNet-50/101-C4、ResNet-FPN、ResNeXt-101-FPN 等多种 backbone，其中 FPN 结构效果最佳
- **可扩展至人体姿态估计**：将关键点建模为 one-hot 二值掩码，以极少的领域适配即可超越 COCO 2016 关键点检测冠军

#### 🔬 深入细节

##### 框架总览

![Mask R-CNN 框架示意图](https://ar5iv.labs.arxiv.org/html/1703.06870/assets/x1.png)
*图：Mask R-CNN 框架。在 Faster R-CNN 的基础上为每个 RoI 添加了一个并行的掩码预测分支。*

Mask R-CNN 的整体架构可以概括为：**backbone 特征提取 → RPN 生成候选区域 → RoIAlign 提取固定尺寸特征 → 三个并行分支（分类 + 回归 + 掩码）**。

##### 网络头部结构

![Head Architecture](https://ar5iv.labs.arxiv.org/html/1703.06870/assets/x4.png)
*图：两种网络头部设计。左：ResNet-C4 backbone 使用 res5 作为头部（计算量较大）；右：FPN backbone 使用更轻量的头部结构。*

论文提出了两种头部设计方案：
1. **ResNet-C4 方案**：使用 ResNet 的第 5 阶段（res5）作为头部，计算量较大但特征表达能力强
2. **FPN 方案**：backbone 已通过 FPN 融合了多尺度特征，因此头部可以更轻量——使用 4 个连续的 3×3 256-d 卷积层后接反卷积层上采样，效率更高且效果更好

##### 核心算法伪代码

```python
# Mask R-CNN 训练流程伪代码
def mask_rcnn_forward(image, gt_boxes, gt_classes, gt_masks):
    # Stage 1: Backbone + FPN 特征提取
    features = backbone(image)          # e.g., ResNet-101-FPN
    fpn_features = fpn(features)        # 多尺度特征金字塔 {P2, P3, P4, P5}
    
    # Stage 2: RPN 生成候选区域
    proposals = rpn(fpn_features)       # ~1000 个候选框
    
    # Stage 3: 对每个 RoI 提取特征（核心改进：RoIAlign）
    roi_features = roi_align(fpn_features, proposals, output_size=7)
    
    # Stage 4: 三个并行分支
    cls_scores = cls_branch(roi_features)    # 分类分数 [N, K+1]
    box_deltas = box_branch(roi_features)    # 框回归 [N, 4K]
    mask_preds = mask_branch(roi_features)   # 掩码 [N, K, m, m]，m=28
    
    # 多任务损失
    L_cls  = cross_entropy(cls_scores, gt_classes)
    L_box  = smooth_l1(box_deltas, gt_boxes)
    L_mask = binary_cross_entropy(
        mask_preds[positive_rois, gt_class_k],  # 只对 GT 类别的掩码计算损失
        gt_masks
    )
    loss = L_cls + L_box + L_mask
    return loss
```

##### 动机与背景

实例分割（Instance Segmentation）要求同时完成目标检测和语义分割——不仅要识别图像中每个物体的类别和位置，还要为每个实例生成像素级的分割掩码。在 Mask R-CNN 之前，主流方法存在以下问题：

1. **分割先于识别的流水线方法**（如 DeepMask → Fast R-CNN）：先生成分割候选再分类，速度慢且精度受限
2. **FCIS 等全卷积方法**：虽然速度快，但在重叠实例上产生系统性错误（伪边缘、伪影）
3. **RoIPool 的量化误差**：Faster R-CNN 中的 RoIPool 操作在将浮点坐标映射到离散特征图时进行了两次取整（floor），导致 RoI 与原始像素之间产生了不可忽视的空间偏移

> 💡 **关键洞察**：对于分类任务，RoIPool 的少量空间偏移影响不大；但对于需要像素级精度的掩码预测，这种偏移是致命的。

##### RoIAlign：消除量化误差

RoIAlign 是 Mask R-CNN 最核心的技术创新。其核心思想是：**避免任何量化操作，使用双线性插值精确计算每个采样点的特征值**。

**RoIPool 的问题**：假设一个 RoI 的连续坐标为 \(x = 12.3\)，RoIPool 会将其量化为 \(\lfloor 12.3 \rfloor = 12\)。此外，在将 RoI 划分为 \(k \times k\) 个 bin 时，每个 bin 的边界也会被量化。这两次量化在 stride=16 的特征图上可能导致数个像素的偏移。

**RoIAlign 的解决方案**：
1. 不对 RoI 边界进行任何量化取整
2. 在每个 bin 内均匀采样 4 个点（2×2 网格）
3. 对每个采样点使用双线性插值从特征图中计算精确值
4. 对 4 个采样点取平均（或最大值）作为该 bin 的输出

数学表达上，对于特征图上坐标为 \((x, y)\) 的采样点，其值通过双线性插值计算：

$$f(x, y) = \sum_{i,j} f(i, j) \cdot \max(0, 1-|x-i|) \cdot \max(0, 1-|y-j|)$$

其中 \((i, j)\) 遍历 \((x, y)\) 周围的四个整数坐标点。

> ⚠️ **注意**：RoIWarp（MNC 中提出）虽然也使用了双线性插值，但仍然对 RoI 边界进行了量化，因此效果与 RoIPool 相当，远不如 RoIAlign。这说明**消除量化**才是关键，而非仅仅使用双线性插值。

实验结果表明：
- 在 ResNet-50-C4（stride=16）上，RoIAlign 比 RoIPool 提升约 **3 个 AP 点**
- 在 ResNet-50-C5（stride=32）上，提升高达 **7.3 个 AP 点**（AP\(_{75}\) 提升 10.5 点，相对提升 50%）
- stride 越大，量化误差越严重，RoIAlign 的优势越明显

##### 解耦掩码与分类预测

Mask R-CNN 的另一个关键设计是**对每个类别独立预测二值掩码**，而非使用多类别 softmax 进行像素级分类：

- **传统 FCN 做法**：对每个像素输出 \(K\) 类的 softmax 概率，类别之间存在竞争
- **Mask R-CNN 做法**：掩码分支输出 \(K\) 个 \(m \times m\) 的二值掩码（每类一个），使用 per-pixel sigmoid + binary cross-entropy loss，类别之间无竞争

$$L_{mask} = -\frac{1}{m^2} \sum_{1 \leq i,j \leq m} \left[ y_{ij} \log \hat{y}_{ij}^k + (1-y_{ij}) \log(1-\hat{y}_{ij}^k) \right]$$

其中 \(k\) 是该 RoI 的 GT 类别，\(\hat{y}_{ij}^k\) 是第 \(k\) 个掩码在位置 \((i,j)\) 的 sigmoid 输出。

> 💡 **关键**：掩码损失仅在 GT 类别对应的掩码通道上计算，其他类别的掩码不参与损失计算。这意味着分类任务完全由分类分支负责，掩码分支只需要学习"前景/背景"的二值分割。

消融实验表明，这种解耦设计比 multinomial softmax 方案高出 **5.5 个 mask AP 点**。此外，class-specific 掩码（30.3 AP）与 class-agnostic 掩码（29.7 AP）效果接近，进一步验证了分类与分割的有效解耦。

##### 训练与推理细节

**训练配置**：
- 正样本 RoI：与 GT 框的 IoU ≥ 0.5
- 掩码目标：将 GT 掩码缩放到 \(m \times m\)（\(m=28\) for FPN，\(m=14\) for C4）
- 图像短边缩放至 800 像素
- 每个 mini-batch 包含 2 张图像（每 GPU），每张图像采样 512 个 RoI（正负比 1:3）
- 学习率 0.02，在 120k 和 160k 迭代时衰减 10 倍，共训练 180k 迭代
- 权重衰减 0.0001，动量 0.9

**推理流程**：
1. RPN 生成约 1000 个候选框
2. 对候选框进行 NMS 和分类
3. 仅对得分最高的 100 个检测框预测掩码（节省计算）
4. 掩码分支输出 \(K\) 个 \(m \times m\) 掩码，选取预测类别对应的掩码
5. 将掩码缩放回原始分辨率并以 0.5 为阈值二值化

##### 与 Faster R-CNN 的核心区别

| 特性 | Faster R-CNN | Mask R-CNN |
|------|-------------|------------|
| 输出 | 类别 + 边界框 | 类别 + 边界框 + 实例掩码 |
| RoI 特征提取 | RoIPool（有量化） | RoIAlign（无量化） |
| 分支数量 | 2（分类 + 回归） | 3（分类 + 回归 + 掩码） |
| 掩码预测 | 无 | 每类独立二值掩码（FCN） |
| 多任务收益 | — | 掩码分支反向提升检测精度 |

##### 主要实验结果

在 COCO 数据集上，Mask R-CNN 取得了以下核心结果：

**实例分割（mask AP）**：
- ResNet-101-FPN：**35.7 AP**（超越 2016 COCO 分割竞赛冠军 FCIS+++）
- ResNeXt-101-FPN：**37.1 AP**

**目标检测（box AP）**：
- ResNet-101-FPN：**38.2 AP\(^{bb}\)**（超越所有同期单模型方法）
- ResNeXt-101-FPN：**39.8 AP\(^{bb}\)**
- 相比 Faster R-CNN w/ FPN（36.2 AP\(^{bb}\)），提升来源：RoIAlign（+1.1）、多任务训练（+0.9）、ResNeXt（+1.6）

**人体关键点检测（keypoint AP）**：
- ResNet-50-FPN：**63.1 AP\(^{kp}\)**（同时预测掩码和关键点时），超越 2016 COCO 关键点竞赛冠军
- 推理速度约 5 fps

**推理速度**：约 200ms/帧（GPU），训练在单台 8-GPU 机器上仅需 1~2 天。

#### 🧪 练习题

```yaml
question: "Mask R-CNN 中 RoIAlign 相比 RoIPool 的核心改进是什么？"
options:
  - "使用更大的池化窗口以获取更多上下文信息"
  - "避免坐标量化取整，使用双线性插值精确计算采样点特征值"
  - "引入可变形卷积使池化区域自适应变形"
  - "将平均池化替换为最大池化以增强特征响应"
answer: 1
explain: "RoIAlign 的核心是消除 RoIPool 中的两次量化取整操作，改用双线性插值在连续坐标上精确采样，从而保留精确的空间位置信息，这对像素级掩码预测至关重要。"
```