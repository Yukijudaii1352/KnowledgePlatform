### DensePose — 密集姿态(DensePose)

```yaml
id: densepose
name: DensePose
full_name: "密集姿态(DensePose)"
year: 2018
org: FAIR
paper_url: "https://openaccess.thecvf.com/content_cvpr_2018/papers/Guler_DensePose_Dense_Human_CVPR_2018_paper.pdf"
category: pose
parent: openpose
motivation: "建立图像像素到3D人体表面的稠密UV映射"
```

#### 📝 一句话总结

DensePose 提出了大规模人体稠密对应标注数据集 COCO-DensePose（50K 人体实例），并设计了基于 Mask-RCNN 的 DensePose-RCNN 架构，将图像中每个人体像素映射到 SMPL 3D 表面模型的 UV 坐标，实现了实时多人稠密姿态估计。

#### 🎯 核心要点

- **COCO-DensePose 数据集**：在 COCO 数据集上为约 50K 人体实例标注了像素级的 3D 表面对应关系，每个人体约 100-150 个对应点
- **SMPL 表面模型分区**：将 SMPL 3D 人体模型划分为 24 个语义部位，每个部位使用独立的 2D UV 坐标系参数化
- **两阶段预测**：先将像素分类到 25 类（24 个身体部位 + 背景），再在对应部位内回归连续 UV 坐标
- **DensePose-RCNN 架构**：基于 Mask-RCNN + FPN + ROI-Align，在 ROI 特征上接全卷积分支进行稠密预测
- **跨任务级联（Cross-Cascading）**：融合关键点检测和实例分割分支的输出进行二阶段精炼，显著提升性能
- **教师网络蒸馏**：训练教师网络将稀疏标注插值为稠密监督信号，解决训练时标注稀疏问题
- **GPS 评估指标**：提出基于测地线距离的 Geodesic Point Similarity 指标，类比 OKS 用于稠密对应评估
- **性能**：最佳模型 AP 达 55.8，在 320×240 图像上达 25fps 实时推理

#### 🔬 深入细节

##### 核心架构示意

![DensePose-RCNN 架构图](https://ar5iv.labs.arxiv.org/html/1802.00434v1/assets/x7.png)
*图：DensePose-RCNN 架构——通过区域提议生成和特征池化的级联，后接全卷积网络密集预测离散部位标签和连续表面坐标。*

![跨任务级联架构](https://ar5iv.labs.arxiv.org/html/1802.00434v1/assets/x8.png)
*图：Cross-Cascading 架构——ROIAlign 输出同时送入 DensePose、Mask、Keypoint 三个分支，第一阶段预测结果合并后送入各分支的第二阶段精炼单元。*

##### 算法伪代码

```python
# DensePose-RCNN 推理流程伪代码
def densepose_rcnn_inference(image):
    # Stage 1: 骨干网络 + FPN 提取多尺度特征
    features = ResNet50_FPN(image)  # P2, P3, P4, P5 特征金字塔
    
    # Stage 2: RPN 生成候选区域
    proposals = RPN(features)
    
    # Stage 3: ROI-Align 池化到固定尺寸
    roi_features = ROIAlign(features, proposals, output_size=14)
    
    # Stage 4: DensePose 全卷积分支 (8层 3x3 Conv + ReLU, 512通道)
    dp_features = DensePose_FCN_Head(roi_features)
    
    # Stage 5: 双头预测
    # 分类头: 25-way (24部位 + 背景)
    part_logits = ClassificationHead(dp_features)  # [N, 25, H, W]
    c_star = argmax(part_logits, dim=1)             # 最优部位分配
    
    # 回归头: 每个部位独立的 UV 坐标回归
    uv_coords = RegressionHead(dp_features)  # [N, 24*2, H, W]
    U, V = uv_coords[c_star]                 # 取对应部位的 UV
    
    return c_star, U, V

# 跨任务级联精炼
def cross_cascade_refinement(roi_features):
    # 第一阶段: 各任务独立预测
    dp_pred_1 = DensePose_Branch_1(roi_features)
    kp_pred_1 = Keypoint_Branch_1(roi_features)
    mask_pred_1 = Mask_Branch_1(roi_features)
    
    # 合并第一阶段输出
    combined = concat(roi_features, dp_pred_1, kp_pred_1, mask_pred_1)
    
    # 第二阶段: 利用多任务上下文精炼
    dp_pred_2 = DensePose_Branch_2(combined)
    return dp_pred_2
```

##### 动机与背景

传统人体姿态估计仅预测稀疏的关键点（如 17 个 COCO 关键点），无法提供像素级的 3D 表面对应关系。这对于增强现实、纹理映射、动作迁移等下游应用远远不够。此前的方法主要依赖：

1. **模型拟合方法**（如 SMPLify）：将 3D 参数化模型迭代拟合到 2D 图像，速度极慢（60-200 秒/图），且在遮挡和极端姿态下容易失败
2. **合成数据训练**（如 SURREAL）：通过渲染生成训练数据，但存在域偏移（domain gap）问题
3. **半自动标注**（如 Unite the People）：人工验证模型拟合结果，但拟合失败率高，标注质量不可靠

DensePose 的核心动机是：**能否像目标检测和实例分割一样，用判别式模型以前馈方式实时预测每个像素的 3D 表面坐标？**

##### 数据集构建：COCO-DensePose

标注流程分为两个阶段：

**阶段一——部位分割**：标注者在图像上将人体区域涂色为 14 个语义区域（头、躯干、上臂、下臂、大腿、小腿、手、脚，各分左右）。

**阶段二——对应点标注**：对每个已标注的部位区域，系统在图像上均匀采样约 10-15 个点，标注者在 SMPL 模型的对应部位表面上点击匹配位置，建立像素到 UV 坐标的对应关系。

> 💡 **关键设计**：将 SMPL 模型的 7829 个顶点通过谱聚类划分为 24 个部位（比标注用的 14 个区域更细），每个部位独立参数化为 \([0,1]^2\) 的 UV 空间。这种分区设计使得每个部位的 UV 映射近似保距，降低了回归难度。

##### 评估指标：Geodesic Point Similarity (GPS)

传统关键点评估使用 OKS（Object Keypoint Similarity），但 OKS 基于欧氏距离，不适合 3D 表面上的对应评估。DensePose 提出 GPS：

$$\text{GPS}_j = \frac{1}{|P_j|} \sum_{p \in P_j} \exp\left(-\frac{g(i_p, \hat{i}_p)^2}{2\kappa^2}\right)$$

其中 \(g(i_p, \hat{i}_p)\) 是预测点 \(\hat{i}_p\) 与真实点 \(i_p\) 在 SMPL 表面上的**测地线距离**（而非欧氏距离），\(\kappa\) 控制容忍度。

> ⚠️ **注意**：GPS ≈ 0.5 即可由完美的部位分割模型达到（因为分区中心点的测地线距离约 30cm），超过 0.5 则需要更精确的表面定位能力。评估采用 COCO 协议，在 GPS 阈值 0.5-0.95 范围内计算 AP/AR。

##### 核心机制：两阶段稠密预测

DensePose 的预测可形式化为：

$$c^* = \arg\max_c P(c \mid i), \quad [U, V] = R^{c^*}(i)$$

其中：
- \(P(c \mid i)\) 是像素 \(i\) 属于第 \(c\) 个部位的后验概率（25 路分类，含背景）
- \(R^{c^*}(i)\) 是第 \(c^*\) 个部位的回归器，输出该像素在部位内的连续 UV 坐标

**损失函数**：
- 部位分类使用**交叉熵损失**
- UV 坐标回归使用 **Smooth-L1 损失**，且仅对属于该部位的像素计算

$$\mathcal{L} = \mathcal{L}_{\text{cls}}^{\text{part}} + \lambda \sum_{c=1}^{24} \mathcal{L}_{\text{smooth-L1}}^{(c)}$$

##### 从 FCN 到 Region-Based：架构演进

**FCN 基线**（DensePose-FCN）直接在全图特征上预测，但面临两个问题：
1. 同一网络需同时处理检测、分割、定位多个任务，负担过重
2. 人体尺度变化极大（COCO 中从几十到几百像素），FCN 缺乏尺度选择机制

**DensePose-RCNN** 采用 Mask-RCNN 的区域处理范式：
1. **FPN 骨干**：构建多尺度特征金字塔，自然处理尺度变化
2. **ROI-Align**：精确的区域特征提取，避免量化误差
3. **专用 DensePose 分支**：8 层 3×3 卷积 + ReLU（512 通道），专注于稠密预测

> 💡 **关键优势**：区域化处理将复杂任务分解为可控模块，ROI-Align 实现尺度归一化。实验显示 DensePose-RCNN 相比 FCN 基线 AUC₃₀ 从 0.418 提升至 0.567（+35.6%）。

##### 教师网络蒸馏：从稀疏到稠密监督

每个训练样本仅有约 100-150 个标注点，这对于训练稠密预测网络是不够的。DensePose 提出了一种巧妙的解决方案：

1. **训练教师网络**：使用稀疏标注训练一个 FCN（DensePose*），利用 ground-truth 分割 mask 去除背景、多尺度集成，获得高精度预测
2. **生成稠密伪标签**：将教师网络部署在训练集全图上，在前景区域（由人工标注的部位 mask 确定）生成稠密的 UV 对应
3. **训练学生网络**：用稠密伪标签训练 DensePose-RCNN

> 💡 **效果**：蒸馏使 AUC₃₀ 从 0.567 提升至 0.645（+13.8%），AP 从约 48 提升至约 52，是性能提升的关键因素之一。

##### 跨任务级联精炼

受迭代精炼方法启发，DensePose 设计了跨任务级联架构：

- 第一阶段：DensePose、关键点、分割三个分支独立预测
- 合并阶段：将三个分支的第一阶段输出与 ROI 特征拼接
- 第二阶段：各分支利用融合特征进行精炼预测

这种设计利用了任务间的互补性——关键点提供精确的骨架约束，分割提供前景/背景先验，共同帮助稠密对应预测。

**最终性能（Table 1，COCO minival）**：

| 方法 | AP | AP₅₀ | AP₇₅ | AR |
|------|-----|-------|-------|-----|
| DensePose (ResNet-50) | 51.0 | 83.5 | 54.2 | 60.1 |
| DensePose (ResNet-101) | 51.8 | 83.7 | 56.3 | 61.1 |
| + keypoints (multi-task) | 52.8 | 85.6 | 56.2 | 62.6 |
| + keypoints (cascade) | **55.8** | **87.5** | **61.2** | **63.9** |

##### 与传统方法的对比

| 维度 | SMPLify (模型拟合) | DensePose-RCNN |
|------|-------------------|----------------|
| 推理速度 | 60-200 秒/图 | 0.04-0.25 秒/图（**快 1000×**） |
| 多人处理 | 需逐人处理 | 端到端多人 |
| 遮挡鲁棒性 | 差（拟合易失败） | 强（判别式学习） |
| AUC₁₀ (全图) | 0.099 | **0.378** |
| AUC₃₀ (全图) | 0.190 | **0.614** |

DensePose 的前馈判别式方法在精度和速度上全面超越迭代模型拟合方法，验证了大规模标注数据集对判别式训练的关键价值。

#### 🧪 练习题

```yaml
question: "DensePose 中教师网络蒸馏（distillation）的主要目的是什么？"
options:
  - "将大模型压缩为小模型以加速推理"
  - "将稀疏的人工标注插值为稠密监督信号用于训练"
  - "利用预训练模型的特征进行迁移学习"
  - "通过知识蒸馏减少模型参数量"
answer: 1
explain: "DensePose 中每个训练样本仅有约 100-150 个标注点，教师网络在前景区域生成稠密的 UV 伪标签，将稀疏监督转化为稠密监督，使 AUC₃₀ 提升了 13.8%。"
```