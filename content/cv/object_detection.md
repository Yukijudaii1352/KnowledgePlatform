---
domain: cv
topic_id: object_detection
topic_name: 目标检测
page_icon: "\U0001F3AF"
page_title: 目标检测算法技术演进
page_subtitle: '{build_date} 版'
page_desc: 从R-CNN到YOLO、从Anchor-based到Anchor-free、从CNN到Transformer的技术演进脉络，涵盖两阶段检测、单阶段检测、无锚点检测及Transformer检测四大范式的核心算法与最新进展
hero_pills:
- R-CNN系列 · YOLO系列 · DETR系列 · Anchor-free
count_pill: '{count} 个算法'
categories:
  two_stage:
    label: 两阶段检测器
    color: '#3B82F6'
  one_stage:
    label: 单阶段检测器
    color: '#10B981'
  anchor_free:
    label: 无锚点检测器
    color: '#F59E0B'
  transformer_based:
    label: Transformer检测器
    color: '#8B5CF6'
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: rcnn
  x: 0
  y: 100
  category: two_stage
- id: fast_rcnn
  x: 100
  y: 100
  category: two_stage
- id: faster_rcnn
  x: 100
  y: 100
  category: two_stage
- id: mask_rcnn
  x: 300
  y: 100
  category: two_stage
- id: yolov1
  x: 200
  y: 250
  category: one_stage
- id: ssd
  x: 200
  y: 250
  category: one_stage
- id: yolov3
  x: 400
  y: 250
  category: one_stage
- id: retinanet
  x: 300
  y: 250
  category: one_stage
- id: yolov8
  x: 900
  y: 250
  category: one_stage
- id: yolov10
  x: 1000
  y: 250
  category: one_stage
- id: yolov12
  x: 1100
  y: 250
  category: one_stage
- id: yolo26
  x: 1200
  y: 250
  category: one_stage
- id: cornernet
  x: 400
  y: 400
  category: anchor_free
- id: centernet
  x: 500
  y: 400
  category: anchor_free
- id: fcos
  x: 500
  y: 400
  category: anchor_free
- id: detr
  x: 600
  y: 550
  category: transformer_based
- id: deformable_detr
  x: 700
  y: 550
  category: transformer_based
- id: dino
  x: 800
  y: 550
  category: transformer_based
- id: rt_detr
  x: 900
  y: 550
  category: transformer_based
- id: rf_detr
  x: 1100
  y: 550
  category: transformer_based
edges:
- from: rcnn
  to: fast_rcnn
  label: RoI池化
- from: fast_rcnn
  to: faster_rcnn
  label: 引入RPN
- from: faster_rcnn
  to: mask_rcnn
  label: 增加分割头
- from: yolov1
  to: ssd
  label: 多尺度特征
- from: yolov1
  to: yolov3
  label: 深度骨干
- from: ssd
  to: retinanet
  label: Focal Loss
- from: retinanet
  to: fcos
  label: 逐像素预测
- from: cornernet
  to: centernet
  label: 中心点建模
- from: centernet
  to: fcos
  label: Center-ness
- from: detr
  to: deformable_detr
  label: 可变形注意力
- from: deformable_detr
  to: dino
  label: 对比去噪
- from: dino
  to: rt_detr
  label: 实时化
- from: rt_detr
  to: rf_detr
  label: NAS优化
- from: yolov3
  to: yolov8
  label: Anchor-free
- from: yolov8
  to: yolov10
  label: NMS消除
- from: yolov10
  to: yolov12
  label: 注意力增强
- from: yolov12
  to: yolo26
  label: 边缘优化
milestones:
- faster_rcnn
- detr
- rf_detr
```

## 核心算法

### R-CNN

```yaml
id: rcnn
num: 1
name: R-CNN
full_name: 区域卷积神经网络 (Region-based CNN)
year: '2014'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/1311.2524
project_url: ''
category: two_stage
motivation: 首次将CNN引入目标检测
```

#### 📝 一句话总结
R-CNN 首次将深度卷积神经网络（CNN）引入目标检测任务，提出"区域提议 + CNN 特征提取 + SVM 分类"的两阶段检测范式，在 PASCAL VOC 2012 上将 mAP 从 35.1% 大幅提升至 53.3%，奠定了后续所有两阶段检测器（Fast R-CNN、Faster R-CNN 等）的基础框架。

#### 🎯 核心要点
- **两阶段检测范式**：首次确立"区域提议（Region Proposal）→ CNN 特征提取 → 分类/回归"的目标检测流水线
- **三模块架构**：Selective Search 生成 ~2000 个候选区域 → AlexNet 提取 4096 维特征 → 类别特定线性 SVM 分类
- **迁移学习策略**：ImageNet 预训练 → 检测域微调（domain-specific fine-tuning），证明了大规模预训练 + 小数据微调在检测任务上的有效性
- **Bounding-Box 回归**：在 pool5 特征上训练类别特定的线性回归器，对候选框进行精细校正，提升定位精度 3-4 mAP
- **正负样本定义的双重策略**：微调阶段 IoU ≥ 0.5 为正样本；SVM 训练阶段仅 Ground-Truth 为正、IoU < 0.3 为负，配合 hard negative mining
- **关键实验结论**：fc7 层特征（4096 维）优于 fc6；微调 conv3 及以上层对性能提升显著；去掉微调 mAP 下降 8 个点

#### 🔬 深入细节
![R-CNN 系统总览](https://ar5iv.labs.arxiv.org/html/1311.2524/assets/x1.png)
*图：R-CNN 目标检测系统总览。(1) 输入图像；(2) Selective Search 提取约 2000 个候选区域；(3) 每个区域 warp 到固定尺寸后送入 CNN 提取特征；(4) 使用类别特定的线性 SVM 进行分类。*

```python
# R-CNN 检测流程伪代码
def RCNN_detect(image, cnn, svms, bb_regressors, classes):
    """
    image: 输入图像
    cnn: 在 ImageNet 预训练 + 检测域微调后的 AlexNet
    svms: 每个类别一个线性 SVM (共 C 个)
    bb_regressors: 每个类别一个 BB 回归器 (共 C 个)
    """
    # Stage 1: 区域提议
    proposals = selective_search(image)  # ~2000 个候选框

    # Stage 2: CNN 特征提取
    features = []
    for box in proposals:
        warped = warp_to_square(image, box, size=227, context_pad=16)
        feat = cnn.forward(warped)  # 提取 fc7 层 4096-d 特征
        features.append(feat)

    # Stage 3: SVM 分类 + NMS
    detections = {}
    for cls in classes:
        scores = svms[cls].predict(features)  # 线性 SVM 打分
        # 对该类别所有候选框按得分做贪心 NMS
        kept = nms(proposals, scores, iou_threshold=0.3)
        detections[cls] = kept

    # Stage 4: Bounding-Box 回归精修
    for cls in classes:
        for det in detections[cls]:
            pool5_feat = cnn.pool5(det.warped_region)
            dx, dy, dw, dh = bb_regressors[cls].predict(pool5_feat)
            det.box = apply_bb_transform(det.box, dx, dy, dw, dh)

    return detections
```

##### 动机与背景

2012 年之前，目标检测领域长期由基于手工特征（HOG、SIFT）的方法主导，其中可变形部件模型（DPM）是 PASCAL VOC 上的最佳方法，但性能增长已趋于停滞。与此同时，AlexNet 在 ImageNet 图像分类任务上取得了突破性进展，展示了深度 CNN 强大的特征学习能力。

R-CNN 的核心问题是：**如何将 CNN 的图像级分类能力迁移到需要定位的目标检测任务上？** 这面临两个关键挑战：

1. **定位问题**：CNN 分类器处理整张图像，但检测需要精确定位每个物体的边界框
2. **训练数据稀缺**：检测数据集（如 VOC，几千张图）远小于分类数据集（ImageNet，百万张图），直接训练 CNN 会严重过拟合

##### 核心机制：三模块流水线

**模块一：Selective Search 区域提议**

R-CNN 采用 Selective Search 算法为每张图像生成约 2000 个类别无关的候选区域（region proposals）。这些候选区域以不同尺度和长宽比覆盖图像中可能包含物体的位置，将检测问题转化为对每个候选区域的分类问题。

> 💡 关键：区域提议机制将"在哪里检测"与"检测什么"解耦，使得 CNN 只需关注分类，大幅降低了问题复杂度。

**模块二：CNN 特征提取**

每个候选区域被各向异性缩放（warp）到 \(227 \times 227\) 像素的固定尺寸（不保持长宽比），并在周围添加 \(p=16\) 像素的上下文填充（context padding）。然后通过 AlexNet（5 个卷积层 + 2 个全连接层）前向传播，提取 fc7 层的 4096 维特征向量。

网络结构为：

$$\text{Input}(227\times227\times3) \xrightarrow{\text{conv1-5}} \text{pool}_5(6\times6\times256) \xrightarrow{\text{fc6}} 4096 \xrightarrow{\text{fc7}} 4096$$

**模块三：类别特定线性 SVM**

对每个类别训练一个独立的线性 SVM。SVM 以 4096 维 CNN 特征为输入，输出该区域属于该类别的置信度分数。检测时，对每个类别独立地对所有候选区域评分，然后使用贪心非极大值抑制（NMS，IoU 阈值 0.3）去除冗余检测框。

> ⚠️ 注意：论文发现直接使用微调后网络的 softmax 输出作为分类器（不训练 SVM），mAP 会从 54.2% 降至 50.9%。这是因为微调时的正样本定义（IoU ≥ 0.5）不够严格，且 softmax 未使用 hard negative mining。

##### 训练流程：三阶段递进

**阶段一：ImageNet 预训练**

使用 Caffe 框架在 ILSVRC 2012 分类数据集（1000 类，120 万张图像）上预训练 AlexNet，获得 top-1 错误率 2.2%（与原始 AlexNet 差距在正常范围内）。

**阶段二：检测域微调（Domain-Specific Fine-Tuning）**

将预训练 AlexNet 的 1000 路分类层替换为随机初始化的 \((N+1)\) 路分类层（\(N\) 个目标类别 + 1 个背景类），然后在检测数据上微调：

- **正样本**：与任意 Ground-Truth 框的 IoU ≥ 0.5 的候选区域
- **负样本**：IoU < 0.5 的候选区域（标记为背景）
- **Mini-batch 构成**：每批 128 个样本，其中 32 个正样本 + 96 个负样本（正负比约 1:3）
- **学习率**：初始 0.001（预训练的 1/10），SGD 优化

> 💡 关键：微调时使用较宽松的正样本定义（IoU ≥ 0.5 而非仅 GT），将正样本数量扩大约 30 倍，有效缓解了检测数据不足导致的过拟合问题。

**阶段三：SVM 训练**

微调完成后，使用 CNN 提取所有候选区域的特征，然后为每个类别训练一个线性 SVM：

- **正样本**：仅 Ground-Truth 框
- **负样本**：与该类别所有实例的 IoU < 0.3 的候选区域
- **灰色地带**：IoU 在 0.3 到 0.5 之间的区域被忽略
- **Hard Negative Mining**：由于负样本数量巨大，采用标准的 hard negative mining 策略迭代训练

##### Bounding-Box 回归

为进一步提升定位精度，R-CNN 在 pool5 特征上训练类别特定的线性回归器。给定候选框 \(P = (P_x, P_y, P_w, P_h)\)（中心坐标 + 宽高），学习四个变换函数将其映射到 Ground-Truth 框 \(G\)：

$$\hat{G}_x = P_w \cdot d_x(P) + P_x \qquad \hat{G}_y = P_h \cdot d_y(P) + P_y$$

$$\hat{G}_w = P_w \cdot \exp(d_w(P)) \qquad \hat{G}_h = P_h \cdot \exp(d_h(P))$$

其中 \(d_x, d_y\) 是尺度不变的中心平移，\(d_w, d_h\) 是对数空间的宽高缩放。每个变换函数建模为 pool5 特征的线性函数：

$$d_\star(P) = \mathbf{w}_\star^T \cdot \boldsymbol{\phi}_5(P)$$

训练目标（回归目标值）为：

$$t_x = (G_x - P_x) / P_w, \quad t_y = (G_y - P_y) / P_h, \quad t_w = \log(G_w / P_w), \quad t_h = \log(G_h / P_h)$$

使用岭回归（Ridge Regression）优化：

$$\mathbf{w}_\star = \arg\min_{\hat{\mathbf{w}}_\star} \sum_i (t_\star^i - \hat{\mathbf{w}}_\star^T \boldsymbol{\phi}_5(P^i))^2 + \lambda \|\hat{\mathbf{w}}_\star\|^2$$

其中正则化系数 \(\lambda = 1000\)。仅对与 Ground-Truth 的 IoU 最大且 IoU 足够大的候选框进行回归训练，避免对远离目标的候选框学习无意义的变换。

> 💡 关键：BB 回归使用 pool5 特征而非 fc7 特征，因为 pool5 保留了更多空间信息，有利于定位。这一参数化方式（尺度不变平移 + 对数空间缩放）后来成为目标检测领域的标准做法。

##### 与传统方法的对比

| 维度 | DPM (传统最优) | R-CNN |
|------|---------------|-------|
| 特征 | HOG 手工特征 | CNN 自动学习的层次化特征 |
| 分类器 | 潜在 SVM + 部件模型 | 线性 SVM（特征已足够强） |
| 定位 | 滑动窗口 + 部件偏移 | 区域提议 + BB 回归 |
| VOC 2010 mAP | 33.4% | 50.2% |
| VOC 2012 mAP | 35.1% (SegDPM) | **53.3%** |

R-CNN 相比 DPM 的核心优势在于：CNN 学到的特征远比手工特征更具判别力和泛化能力。论文通过消融实验证明，fc7 层的 4096 维特征在 VOC 上的表现远超 HOG 等传统特征，且这些特征具有良好的跨域迁移能力。

##### 局限性

- **速度慢**：每张图像需对 ~2000 个候选区域分别进行 CNN 前向传播，GPU 上约 13 秒/张（其中 Selective Search ~2s，CNN ~10s）
- **多阶段训练**：预训练 → 微调 → SVM 训练 → BB 回归，流程复杂且各阶段独立优化
- **存储开销大**：需要将所有候选区域的特征缓存到磁盘用于 SVM 训练
- **Warp 变形**：各向异性缩放会扭曲物体形状，可能损失信息

这些局限性直接催生了后续的 SPPNet（共享卷积计算）、Fast R-CNN（端到端训练 + RoI Pooling）和 Faster R-CNN（RPN 替代 Selective Search）。

#### 🧪 练习题
```yaml
question: "R-CNN 在微调 CNN 和训练 SVM 时，对正样本的定义有何不同？其原因是什么？"
options:
  - "两者完全相同，都使用 IoU ≥ 0.5 作为正样本阈值"
  - "微调使用 IoU ≥ 0.5 为正样本以扩充数据量防止过拟合，SVM 仅用 Ground-Truth 为正样本以获得更精确的决策边界"
  - "微调仅使用 Ground-Truth 为正样本，SVM 使用 IoU ≥ 0.5 为正样本"
  - "两者都仅使用 Ground-Truth 作为正样本，但负样本阈值不同"
answer: 1
explain: "微调阶段将 IoU ≥ 0.5 的候选区域视为正样本，将正样本数量扩大约 30 倍以防止网络过拟合；而 SVM 训练阶段仅使用 Ground-Truth 框作为正样本（IoU < 0.3 为负样本），配合 hard negative mining 获得更精确的分类边界。"
```

### Fast R-CNN

```yaml
id: fast_rcnn
num: 2
name: Fast R-CNN
full_name: 快速区域卷积神经网络 (Fast R-CNN)
year: '2015'
org: Microsoft Research
parent: rcnn
paper_url: https://arxiv.org/abs/1504.08083
project_url: ''
category: two_stage
motivation: RoI Pooling实现整图单次特征提取
```

#### 📝 一句话总结
Fast R-CNN 提出 RoI Pooling 层实现整图卷积特征共享，并将分类与边界框回归统一为端到端多任务学习框架，相比 R-CNN 训练速度提升 9 倍、推理速度提升 213 倍，同时取得更高的检测精度。

#### 🎯 核心要点
- **RoI Pooling 层**：对整图进行一次前向卷积得到共享特征图，再对每个候选区域（RoI）进行自适应最大池化，输出固定尺寸 \(H \times W\) 的特征，避免重复计算
- **多任务联合训练**：同时优化 Softmax 分类损失和 Smooth L1 边界框回归损失，端到端训练替代 R-CNN 的三阶段流水线（CNN 特征提取 → SVM 分类 → 回归器训练）
- **Smooth L1 损失函数**：结合 L1 和 L2 损失的优点，对异常值鲁棒且在零点附近可微，替代 R-CNN 中使用的 L2 损失
- **单阶段训练**：所有网络层（包括卷积层）均可通过反向传播联合微调，无需分阶段训练
- **SVD 压缩加速**：利用截断 SVD 分解全连接层权重矩阵，推理速度提升约 30%，mAP 损失极小
- **层级采样策略**：每个 mini-batch 先采样 N=2 张图像，再从每张图像中采样 R/N=64 个 RoI，同图 RoI 共享计算和内存
- **Softmax 替代 SVM**：端到端训练的 Softmax 分类器略优于后处理 SVM，简化了训练流程

#### 🔬 深入细节
##### 架构总览

![Fast R-CNN 架构图](https://ar5iv.labs.arxiv.org/html/1504.08083/assets/x1.png)
*图：Fast R-CNN 架构。输入整张图像和多个候选区域（RoIs），经卷积网络提取共享特征图，RoI Pooling 层将每个 RoI 映射为固定大小的特征向量，最终通过两个并行的全连接分支分别输出类别概率和边界框回归偏移量。*

##### 算法伪代码

```python
# Fast R-CNN 训练流程伪代码
def fast_rcnn_train(images, proposals, gt_boxes, gt_labels):
    for epoch in range(num_epochs):
        # 1. 采样 mini-batch: N=2 张图, 每张 64 个 RoI
        img_batch = sample_images(images, N=2)
        for img in img_batch:
            rois = sample_rois(proposals[img], R_per_img=64,
                               pos_ratio=0.25,    # IoU >= 0.5 为正样本
                               neg_range=[0.1, 0.5])  # 难负例挖掘

        # 2. 整图前向传播, 提取共享特征图
        feature_map = backbone_cnn(img_batch)  # 单次前向

        # 3. RoI Pooling: 每个 RoI → H×W (7×7) 固定特征
        roi_features = roi_pooling(feature_map, rois, output_size=(7, 7))

        # 4. 全连接层 → 两个并行输出分支
        fc_out = fc_layers(roi_features)       # 2 个 FC (4096-d)
        cls_scores = cls_head(fc_out)          # (K+1) 类 softmax
        bbox_deltas = reg_head(fc_out)         # 4K 个回归值

        # 5. 多任务损失
        L_cls = cross_entropy(cls_scores, gt_labels)
        L_loc = smooth_l1(bbox_deltas, gt_boxes)  # 仅正样本
        loss = L_cls + lambda_ * L_loc  # lambda=1

        # 6. 反向传播, 更新所有层(含卷积层)
        loss.backward()
        optimizer.step()
```

##### 动机与背景

R-CNN（2014）虽然在目标检测上取得了突破性进展，但存在三个严重瓶颈：

1. **训练是多阶段流水线**：需要先微调 CNN 提取特征，再训练 SVM 分类器，最后训练边界框回归器，三个阶段相互独立，无法联合优化。
2. **训练耗时且占用大量存储**：SVM 和回归器的训练需要将所有候选区域的特征写入磁盘，对于 VGG16 网络，VOC07 训练集需要数百 GB 存储空间。
3. **推理极慢**：每个候选区域都需要独立通过 CNN 前向传播，VGG16 在 GPU 上处理一张图像需要 47 秒。

SPPnet（2014）通过空间金字塔池化实现了特征共享，将推理速度提升了 10-100 倍，但仍然无法更新空间金字塔池化层之前的卷积层参数，且仍需多阶段训练。

Fast R-CNN 的核心目标就是**同时解决速度和精度问题**：用单阶段端到端训练替代多阶段流水线，并实现所有网络层的联合微调。

##### 核心机制：RoI Pooling 层

RoI Pooling 是 SPPnet 中空间金字塔池化的一个特例（单层级版本），其核心思想是将任意大小的候选区域映射为固定大小的特征表示。

给定整图卷积特征图 \(F\)（尺寸为 \(C \times H_f \times W_f\)）和一个 RoI 窗口 \((r, c, h, w)\)，RoI Pooling 的操作如下：

1. 将 RoI 窗口 \(h \times w\) 均匀划分为 \(H \times W\) 个子窗口（论文中 \(H = W = 7\)），每个子窗口大小约为 \(\frac{h}{H} \times \frac{w}{W}\)
2. 对每个子窗口内的特征值取最大值（max pooling）
3. 输出固定大小的 \(C \times H \times W\) 特征图

> 💡 **关键直觉**：RoI Pooling 使得网络可以对整张图像只做一次卷积前向传播，然后从共享特征图上"裁剪"出每个候选区域的特征。这避免了 R-CNN 中对每个候选区域重复计算卷积的巨大开销。

RoI Pooling 的反向传播公式为：

$$\frac{\partial L}{\partial x_i} = \sum_r \sum_j [i = i^*(r, j)] \frac{\partial L}{\partial y_{rj}}$$

其中 \(i^*(r,j)\) 是第 \(r\) 个 RoI 的第 \(j\) 个输出单元对应的 argmax 输入索引。与 SPPnet 不同，梯度可以从 RoI Pooling 层流回到卷积层，这是 Fast R-CNN 能够端到端微调所有层的关键。

##### 核心机制：多任务损失函数

Fast R-CNN 的每个 RoI 同时输出两个预测：

1. **分类概率** \(p = (p_0, p_1, \ldots, p_K)\)：\(K+1\) 类的 softmax 概率（含背景类）
2. **边界框回归偏移** \(t^k = (t^k_x, t^k_y, t^k_w, t^k_h)\)：对每个类别 \(k\) 预测 4 个参数化偏移

多任务损失定义为：

$$L(p, u, t^u, v) = L_{\text{cls}}(p, u) + \lambda [u \geq 1] L_{\text{loc}}(t^u, v)$$

其中：
- \(L_{\text{cls}}(p, u) = -\log p_u\)：标准交叉熵损失
- \(u\) 为真实类别标签，\(v\) 为真实边界框回归目标
- \([u \geq 1]\) 为 Iverson 括号，表示仅对非背景类（\(u \geq 1\)）计算回归损失
- \(\lambda = 1\) 平衡两个任务

回归损失采用 **Smooth L1**：

$$L_{\text{loc}}(t^u, v) = \sum_{i \in \{x,y,w,h\}} \text{smooth}_{L_1}(t^u_i - v_i)$$

$$\text{smooth}_{L_1}(x) = \begin{cases} 0.5x^2 & \text{if } |x| < 1 \\ |x| - 0.5 & \text{otherwise} \end{cases}$$

> 💡 **为什么用 Smooth L1 而非 L2？** L2 损失对大误差值非常敏感，需要仔细调节学习率以防止梯度爆炸。Smooth L1 在 \(|x| \geq 1\) 时退化为 L1（梯度恒为 ±1），对异常值更鲁棒；在 \(|x| < 1\) 时退化为 L2，保证零点附近的平滑可微性。

##### 训练策略

**层级采样（Hierarchical Sampling）**：R-CNN 和 SPPnet 从所有图像中随机采样 RoI，导致同一 mini-batch 中的 RoI 来自不同图像，无法共享计算。Fast R-CNN 改为先采样 \(N=2\) 张图像，再从每张图像中采样 \(R/N = 64\) 个 RoI。同一图像的 RoI 在前向和反向传播中共享计算和内存，训练速度大幅提升。

**正负样本定义**：
- 正样本（25%）：与真实框 IoU ≥ 0.5 的 RoI，标签为对应类别
- 负样本（75%）：IoU ∈ [0.1, 0.5) 的 RoI，标签为背景。下界 0.1 起到难负例挖掘（hard negative mining）的作用

**预训练与微调**：以 ImageNet 预训练的 VGG16 为例，将最后一个最大池化层替换为 RoI Pooling 层，最后的全连接层和 softmax 替换为两个并行分支（\(K+1\) 类 softmax + 类别相关的 bbox 回归器），网络输入扩展为图像列表和 RoI 列表。

##### SVD 加速推理

对于整图分类，卷积层计算占主导；但对于目标检测，由于每张图像有大量 RoI，全连接层的计算量不可忽视。Fast R-CNN 利用截断 SVD 将全连接层权重矩阵 \(W\)（\(u \times v\)）分解为：

$$W \approx U \Sigma_t V^T$$

其中 \(U\) 为 \(u \times t\)，\(\Sigma_t\) 为 \(t \times t\) 对角矩阵，\(V^T\) 为 \(t \times v\)。原来的一个全连接层被替换为两个无偏置的全连接层，参数量从 \(uv\) 降至 \(t(u+v)\)。当 \(t\) 远小于 \(\min(u,v)\) 时，压缩效果显著。

> ⚠️ **实验数据**：对 VGG16 的两个 FC 层使用 SVD（top 1024 奇异值），推理时间从 320ms 降至 223ms（加速 30%），mAP 仅从 66.9% 微降至 66.6%。

##### 与 R-CNN / SPPnet 的关键区别

| 特性 | R-CNN | SPPnet | Fast R-CNN |
|------|-------|--------|------------|
| 特征共享 | ❌ 每个 RoI 独立前向 | ✅ 共享卷积特征 | ✅ 共享卷积特征 |
| 端到端训练 | ❌ 三阶段 | ❌ 多阶段 | ✅ 单阶段 |
| 卷积层微调 | ✅ | ❌ 池化层前不可微调 | ✅ 所有层可微调 |
| 分类器 | SVM | SVM | Softmax |
| 磁盘缓存 | 需要数百 GB | 需要 | 不需要 |
| VGG16 训练时间 | 84h | 25h | 9.5h |
| VGG16 推理时间/图 | 47s | — | 0.32s（含 proposals） |
| VOC07 mAP | 66.0% | 63.1% | 66.9% |

##### 关键实验发现

1. **卷积层微调至关重要**：冻结所有卷积层时 VGG16 mAP 仅 61.4%，微调 conv3_1 及以上层后提升至 66.9%（+5.5 个百分点）
2. **多任务训练优于分阶段训练**：联合训练 cls+loc 的 mAP（66.9%）高于仅训练 cls 再加 loc 的 stage-wise 方式（64.0%）
3. **单尺度足够好**：深度 ConvNet 能直接学习尺度不变性，单尺度（s=600）与五尺度的 mAP 差距极小（66.9% vs 无法运行），但速度快很多
4. **更多数据有帮助**：VOC07+12 联合训练将 mAP 从 66.9% 提升至 70.0%
5. **Softmax 略优于 SVM**：三个模型上 softmax 均以 +0.1~+0.8 的优势胜出，且无需额外训练步骤

#### 🧪 练习题
```yaml
question: "Fast R-CNN 中 RoI Pooling 层相比 R-CNN 的核心优势是什么？"
options:
  - "支持多尺度输入图像处理"
  - "将任意大小的候选区域映射为固定大小特征，且允许梯度回传到卷积层"
  - "使用平均池化替代最大池化提升精度"
  - "消除了对候选区域生成算法的依赖"
answer: 1
explain: "RoI Pooling 的核心价值在于：(1) 整图只需一次卷积前向传播，所有 RoI 共享特征图；(2) 梯度可以通过 RoI Pooling 层回传到卷积层，使端到端微调成为可能。这是 SPPnet 无法做到的关键改进。"
```

### Faster R-CNN

```yaml
id: faster_rcnn
num: 3
name: Faster R-CNN
full_name: 更快区域卷积神经网络 (Faster R-CNN)
year: '2015'
org: Microsoft Research
parent: fast_rcnn
paper_url: https://arxiv.org/abs/1506.01497
project_url: ''
category: two_stage
motivation: RPN实现端到端训练
```

#### 📝 一句话总结
Faster R-CNN 提出了**区域建议网络 (Region Proposal Network, RPN)**，与检测网络共享卷积特征，以近乎零成本生成高质量候选区域，将目标检测从依赖外部提议算法（如 Selective Search）推进到**全卷积、端到端**的统一框架，在 PASCAL VOC 上以仅 300 个提议达到 73.2% mAP，速度达 5 fps。

#### 🎯 核心要点
- **区域建议网络 (RPN)**：全卷积网络，在共享特征图上滑动窗口，同时预测目标存在概率与边界框回归偏移
- **Anchor 机制**：每个滑动窗口位置预定义 \(k\) 个 anchor（3 种尺度 × 3 种宽高比 = 9 个），以平移不变的方式高效覆盖多尺度多形状目标
- **共享卷积特征**：RPN 与 Fast R-CNN 检测器共享同一组卷积层，提议生成几乎不增加额外计算开销（每张图仅约 10ms）
- **多任务联合损失**：RPN 同时优化二分类损失（目标 vs 背景）和边界框回归损失（Smooth L1），检测头同样采用分类 + 回归的多任务范式
- **4 步交替训练**：先独立训练 RPN → 用 RPN 提议训练 Fast R-CNN → 固定共享层微调 RPN → 固定共享层微调检测头，实现特征共享
- **端到端统一架构**：将"提议 + 检测"合并为单一网络，奠定了后续 two-stage 检测器的标准范式

#### 🔬 深入细节
![Faster R-CNN 整体架构](https://ar5iv.labs.arxiv.org/html/1506.01497/assets/x2.png)
*图 1：Faster R-CNN 统一网络架构。RPN 告诉 Fast R-CNN 检测器"去哪里看"，两者共享卷积特征层。*

![RPN 网络结构与 Anchor 示意](https://ar5iv.labs.arxiv.org/html/1506.01497/assets/x1.png)
*图 2：左图为 RPN 的滑动窗口 + anchor 结构；右图展示了 anchor 的多尺度多宽高比设计，用单尺度特征图实现多尺度检测。*

```python
# Faster R-CNN 训练伪代码（4 步交替训练）
# ========================================

# Step 1: 独立训练 RPN
rpn = RPN(backbone=ImageNet_pretrained_CNN)
rpn.train(images, gt_boxes)  # 多任务: cls_loss + reg_loss

# Step 2: 用 RPN 提议训练 Fast R-CNN 检测器
proposals = rpn.generate_proposals(images)
detector = FastRCNN(backbone=ImageNet_pretrained_CNN)  # 独立初始化
detector.train(images, proposals, gt_boxes, gt_labels)

# Step 3: 用检测器的共享卷积层初始化 RPN，仅微调 RPN 独有层
rpn.backbone = detector.backbone  # 共享卷积层
rpn.freeze(backbone=True)         # 固定共享层
rpn.finetune(rpn_only_layers)     # 只调 RPN 的 3×3 conv + 1×1 heads

# Step 4: 固定共享卷积层，微调 Fast R-CNN 的 fc 层
detector.backbone = rpn.backbone  # 此时 backbone 已共享
detector.freeze(backbone=True)
detector.finetune(fc_layers_only)

# 推理时：image → 共享 CNN → RPN(300 proposals) → RoI Pooling → cls + bbox
```

##### 动机与背景

在 Faster R-CNN 之前，目标检测的主流范式是 R-CNN 系列的 **"提议 + 分类"两阶段框架**。R-CNN 和 Fast R-CNN 在检测精度上取得了显著进步，但它们都依赖外部的区域提议算法——最常用的 **Selective Search** 在 CPU 上每张图需要约 2 秒，成为整个检测流水线的严重瓶颈。Fast R-CNN 本身的检测网络在 GPU 上已经很快（约 0.3 秒/图），但加上提议生成后整体速度被拖慢了一个数量级。因此，**如何用 GPU 友好的方式快速生成高质量候选区域**，成为将检测推向实时的关键问题。

##### RPN 的核心机制

RPN 的核心思想是：**在卷积特征图上用滑动窗口同时预测"这里有没有目标"和"目标的精确位置"**。具体而言，给定骨干网络（如 VGG-16 或 ZF-Net）输出的特征图，RPN 在其上滑动一个 \(n \times n\)（论文中 \(n=3\)）的小窗口。每个滑动位置映射到一个低维特征向量（ZF 为 256-d，VGG 为 512-d），然后分别送入两个并行的 \(1 \times 1\) 卷积层：

- **分类分支 (cls)**：输出 \(2k\) 个得分，表示 \(k\) 个 anchor 各自是目标/背景的概率
- **回归分支 (reg)**：输出 \(4k\) 个值，表示 \(k\) 个 anchor 的边界框偏移量 \((t_x, t_y, t_w, t_h)\)

其中 \(k\) 是每个位置的 anchor 数量。论文采用 **3 种尺度**（\(128^2, 256^2, 512^2\)）× **3 种宽高比**（1:1, 1:2, 2:1），共 \(k=9\) 个 anchor。这种设计的精妙之处在于：**不需要构建图像金字塔或滤波器金字塔，仅通过预定义不同形状的 anchor，就能在单尺度特征图上处理多尺度目标**，且整个过程保持平移不变性。

> 💡 **关键**：Anchor 是一种"参考框"机制——网络不是从零预测框的绝对坐标，而是预测相对于预定义 anchor 的偏移量，这大大降低了学习难度。

##### 损失函数设计

RPN 的训练采用多任务损失，对每个 anchor \(i\) 计算：

$$L(\{p_i\}, \{t_i\}) = \frac{1}{N_{cls}} \sum_i L_{cls}(p_i, p_i^*) + \lambda \frac{1}{N_{reg}} \sum_i p_i^* \cdot L_{reg}(t_i, t_i^*)$$

其中：
- \(p_i\) 是 anchor \(i\) 被预测为目标的概率，\(p_i^* \in \{0, 1\}\) 是真实标签
- \(t_i = (t_x, t_y, t_w, t_h)\) 是预测的参数化偏移，\(t_i^*\) 是相对于匹配 GT 框的真实偏移
- \(L_{cls}\) 为交叉熵损失，\(L_{reg}\) 为 Smooth L1 损失
- \(p_i^*\) 的乘积确保**只有正样本参与回归损失**
- \(\lambda\) 平衡两项损失（论文中取 \(\lambda = 10\)，但由于 \(N_{cls} \approx 256, N_{reg} \approx 2400\)，实际权重大致相当）

边界框回归的参数化方式沿用 R-CNN 的定义：

$$t_x = (x - x_a) / w_a, \quad t_y = (y - y_a) / h_a$$
$$t_w = \log(w / w_a), \quad t_h = \log(h / h_a)$$

其中 \((x, y, w, h)\) 为预测框，\((x_a, y_a, w_a, h_a)\) 为 anchor 框。这种对数空间的宽高回归保证了尺度不变性。

> ⚠️ **注意**：正样本定义采用双重标准——与任意 GT 框 IoU ≥ 0.7 的 anchor 为正样本，或者与某个 GT 框 IoU 最大的 anchor 也为正样本（防止某些 GT 框没有正样本匹配）。IoU < 0.3 的为负样本，其余忽略。每个 mini-batch 从单张图中随机采样 256 个 anchor，正负比例为 1:1。

##### 4 步交替训练与特征共享

为了让 RPN 和 Fast R-CNN 检测器真正**共享卷积特征**，论文提出了实用的 4 步交替训练策略：

1. **Step 1**：用 ImageNet 预训练模型初始化，端到端训练 RPN
2. **Step 2**：用 Step 1 的 RPN 生成提议，独立训练 Fast R-CNN 检测器（同样从 ImageNet 初始化）
3. **Step 3**：用 Step 2 检测器的卷积层初始化 RPN，**固定共享卷积层**，仅微调 RPN 独有的层
4. **Step 4**：保持共享卷积层固定，微调 Fast R-CNN 的全连接层

经过这 4 步，两个网络共享同一组卷积层。论文指出这一过程可以迭代，但实验表明更多迭代带来的提升微乎其微。

##### 与传统方法的对比

| 方面 | Selective Search | Faster R-CNN (RPN) |
|------|-----------------|-------------------|
| 提议生成速度 | ~2s/图 (CPU) | ~10ms/图 (GPU) |
| 提议数量 | ~2000 | **300**（即可超越 SS） |
| 是否可训练 | ❌ 手工特征 | ✅ 端到端学习 |
| 是否共享特征 | ❌ 独立计算 | ✅ 与检测器共享 CNN |
| VOC 07 mAP | 58.7% (ZF) | **59.9%** (ZF) / **73.2%** (VGG, 07+12) |

Faster R-CNN 用更少的提议（300 vs 2000）获得了更高的检测精度，同时将整体检测速度提升到 **5 fps**（VGG-16），真正实现了"更快且更准"的目标。这一架构成为后续 FPN、Mask R-CNN、Cascade R-CNN 等经典工作的基础。

#### 🧪 练习题
```yaml
question: "Faster R-CNN 中 RPN 的 Anchor 机制的主要作用是什么？"
options:
  - "通过构建图像金字塔来处理多尺度目标"
  - "在每个滑动窗口位置预定义多种尺度和宽高比的参考框，使网络能在单尺度特征图上检测多尺度目标"
  - "替代 NMS 后处理步骤以加速推理"
  - "将分类任务转化为回归任务以简化训练流程"
answer: 1
explain: "Anchor 机制通过在每个空间位置预设 k 个不同尺度和宽高比的参考框，使 RPN 无需图像金字塔即可在单尺度特征图上高效处理多尺度目标，同时保持平移不变性。"
```

### Mask R-CNN

```yaml
id: mask_rcnn
num: 4
name: Mask R-CNN
full_name: 掩码区域卷积神经网络 (Mask R-CNN)
year: '2017'
org: FAIR
parent: faster_rcnn
paper_url: https://arxiv.org/abs/1703.06870
project_url: ''
category: two_stage
motivation: RoI Align解决像素级对齐问题
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

### YOLOv1

```yaml
id: yolov1
num: 5
name: YOLOv1
full_name: 你只需要看一次v1 (You Only Look Once v1)
year: '2016'
org: 华盛顿大学
parent: —
paper_url: https://arxiv.org/abs/1506.02640
project_url: ''
category: one_stage
motivation: 单网络直接回归边界框
```

#### 📝 一句话总结
YOLOv1 的核心目标是：单网络直接回归边界框。

#### 🎯 核心要点
- 核心动机：单网络直接回归边界框
- 代表机构：华盛顿大学

#### 🔬 深入细节
单网络直接回归边界框


### SSD

```yaml
id: ssd
num: 6
name: SSD
full_name: 单次多框检测器 (Single Shot MultiBox Detector)
year: '2016'
org: UNC Chapel Hill
parent: yolov1
paper_url: https://arxiv.org/abs/1512.02325
project_url: ''
category: one_stage
motivation: 多尺度特征图检测机制
```

#### 📝 一句话总结
SSD 提出在多个不同分辨率的特征图上直接预测目标的类别和边界框偏移，通过多尺度默认框（default boxes）机制实现单次前向传播完成检测，在保持实时速度的同时显著提升了单阶段检测器的精度。

#### 🎯 核心要点
- **多尺度特征图检测**：在 VGG-16 基础网络之上添加多个逐渐缩小的卷积特征层（conv4_3、conv7、conv8_2、conv9_2、conv10_2、conv11_2），每层独立预测检测结果，天然覆盖不同尺度目标
- **默认框（Default Boxes）机制**：在每个特征图位置预设多种宽高比（1, 2, 3, 1/2, 1/3）和尺度的锚框，每个位置产生 6 个默认框，总计约 8732 个候选框（300×300 输入）
- **卷积预测器**：使用 \(3 \times 3 \times p\) 卷积核直接在特征图上预测每个默认框的类别得分和边界框偏移，取代全连接层
- **多任务损失函数**：总损失为定位损失（Smooth L1）与置信度损失（Softmax 交叉熵）的加权和，权重 \(\alpha=1\)
- **匹配策略**：将 IoU > 0.5 的默认框均匹配为正样本，允许多个默认框匹配同一目标
- **Hard Negative Mining**：按置信度损失排序负样本，控制负正样本比为 3:1，缓解正负样本极度不平衡
- **激进数据增强**：随机裁剪（最小 IoU 约束为 0.1/0.3/0.5/0.7/0.9）、随机翻转、光度扭曲，对小目标检测提升显著
- **性能**：SSD300 在 VOC2007 test 上达到 74.3% mAP / 59 FPS（Titan X），SSD512 达到 76.9% mAP，超越同期 Faster R-CNN

#### 🔬 深入细节
##### 核心架构示意图

![SSD 框架示意图：多尺度特征图上的默认框与预测](https://ar5iv.labs.arxiv.org/html/1512.02325/assets/x1.png)
*图 1：SSD 框架。(a) 训练时需要输入图像和每个目标的真值框。在不同分辨率的特征图（如 8×8 和 4×4）上，每个位置预设一组不同宽高比的默认框。对每个默认框预测类别得分和形状偏移。训练时将默认框与真值框匹配（IoU ≥ 0.5）。*

![SSD 与 YOLO 架构对比](https://ar5iv.labs.arxiv.org/html/1512.02325/assets/x2.png)
*图 2：SSD 与 YOLO 的架构对比。SSD 在基础网络末端添加多个特征层，分别预测不同尺度和宽高比的默认框偏移及类别置信度。SSD300（300×300 输入）在精度上显著超越 YOLO（448×448 输入），同时速度更快。*

##### 算法伪代码

```python
# SSD 前向推理伪代码
def ssd_forward(image):
    # 1. 基础网络特征提取（VGG-16 截断至 conv4_3）
    features = vgg16_base(image)  # → conv4_3 特征图 (38×38)
    
    # 2. 添加辅助卷积层，逐步降低分辨率
    feat_maps = [features]  # conv4_3: 38×38
    feat_maps.append(conv7(features))      # 19×19
    feat_maps.append(conv8_2(...))         # 10×10
    feat_maps.append(conv9_2(...))         # 5×5
    feat_maps.append(conv10_2(...))        # 3×3
    feat_maps.append(conv11_2(...))        # 1×1
    
    all_boxes, all_scores = [], []
    for k, feat in enumerate(feat_maps):
        # 3. 每个特征图位置用 3×3 卷积预测
        #    (c+4) × k_boxes 个输出通道
        cls_pred = cls_conv[k](feat)   # [N, n_classes × n_boxes, H, W]
        loc_pred = loc_conv[k](feat)   # [N, 4 × n_boxes, H, W]
        all_boxes.append(loc_pred)
        all_scores.append(cls_pred)
    
    # 4. 合并所有尺度的预测（约 8732 个框）
    boxes = concat(all_boxes)    # 解码为绝对坐标
    scores = concat(all_scores)  # softmax 得到类别概率
    
    # 5. NMS 后处理
    detections = nms(boxes, scores, iou_threshold=0.45)
    return detections
```

##### 动机与背景

2016 年之前，主流目标检测方法（如 Faster R-CNN）采用"先提取候选区域、再分类回归"的两阶段流程。虽然精度较高，但计算开销大、速度慢，难以满足实时需求。YOLO 虽然实现了单阶段检测，但仅在单一尺度的特征图（7×7）上预测，导致对小目标和密集目标的检测能力不足。

SSD 的核心动机是：**能否在保持单阶段检测速度优势的同时，通过多尺度特征图机制弥补精度短板？**

> 💡 关键洞察：不同层级的特征图具有不同的感受野和语义信息——浅层特征图分辨率高、适合检测小目标，深层特征图感受野大、适合检测大目标。SSD 正是利用这一特性，在多个层级上同时进行检测预测。

##### 核心机制详解

**1. 多尺度特征图预测**

SSD 以 VGG-16 为基础网络，将 fc6、fc7 转换为卷积层（conv6、conv7），并在其后依次添加 conv8、conv9、conv10、conv11 四组卷积层。这些层的空间分辨率逐步减小：

| 特征层 | 分辨率 | 默认框数量/位置 | 检测目标尺度 |
|--------|--------|----------------|-------------|
| conv4_3 | 38×38 | 4 | 小目标 |
| conv7 | 19×19 | 6 | 中小目标 |
| conv8_2 | 10×10 | 6 | 中等目标 |
| conv9_2 | 5×5 | 6 | 中大目标 |
| conv10_2 | 3×3 | 4 | 大目标 |
| conv11_2 | 1×1 | 4 | 超大目标 |

总计默认框数量：\(38^2 \times 4 + 19^2 \times 6 + 10^2 \times 6 + 5^2 \times 6 + 3^2 \times 4 + 1^2 \times 4 = 8732\)。

**2. 默认框的尺度与宽高比设计**

每个特征图层对应一个基础尺度 \(s_k\)，通过线性插值公式计算：

$$s_k = s_{\min} + \frac{s_{\max} - s_{\min}}{m - 1}(k - 1), \quad k \in [1, m]$$

其中 \(s_{\min} = 0.2\)，\(s_{\max} = 0.9\)，\(m\) 为使用的特征图数量。每个位置生成多种宽高比的默认框：

- 宽高比 \(a_r \in \{1, 2, 3, \frac{1}{2}, \frac{1}{3}\}\)
- 宽度 \(w_k^a = s_k \sqrt{a_r}\)，高度 \(h_k^a = s_k / \sqrt{a_r}\)
- 对于 \(a_r = 1\)，额外添加尺度为 \(s'_k = \sqrt{s_k \cdot s_{k+1}}\) 的默认框

因此每个位置最多产生 **6 个默认框**（5 种宽高比 + 1 个额外尺度）。

> ⚠️ 注意：conv4_3 层的特征值范数较大，SSD 对该层使用了 L2 归一化（L2Norm），将特征缩放到固定范数后再学习一个可训练的缩放因子，初始值设为 20。

**3. 卷积预测器**

与 YOLO 使用全连接层不同，SSD 对每个特征图使用 \(3 \times 3\) 卷积核直接预测。对于分辨率为 \(m \times n\)、通道数为 \(p\) 的特征图，使用 \((c + 4) \times k\) 个 \(3 \times 3 \times p\) 卷积核，其中 \(c\) 为类别数，\(k\) 为每个位置的默认框数量，4 为边界框偏移参数（\(\Delta cx, \Delta cy, \Delta w, \Delta h\)）。

这种设计的优势在于：卷积操作保留了空间位置信息，参数量远小于全连接层，且可以处理任意大小的输入。

##### 训练流程

**匹配策略**

训练时需要将真值框分配给默认框：
1. 首先，为每个真值框找到 IoU 最大的默认框（保证每个真值至少有一个匹配）
2. 然后，将所有与任意真值框 IoU > 0.5 的默认框也标记为正样本

这种双重匹配策略简化了学习问题，允许多个默认框同时匹配同一目标。

**损失函数**

总损失为定位损失和置信度损失的加权和：

$$L(x, c, l, g) = \frac{1}{N}\left(L_{conf}(x, c) + \alpha \cdot L_{loc}(x, l, g)\right)$$

其中 \(N\) 为匹配的正样本数量，\(\alpha = 1\)。

定位损失采用 Smooth L1 损失，对正样本的中心偏移和宽高偏移进行回归：

$$L_{loc}(x, l, g) = \sum_{i \in Pos}^{N} \sum_{m \in \{cx,cy,w,h\}} x_{ij}^{k} \cdot \text{smooth}_{L1}(l_i^m - \hat{g}_j^m)$$

其中偏移编码方式与 Faster R-CNN 一致：

$$\hat{g}_j^{cx} = \frac{g_j^{cx} - d_i^{cx}}{d_i^w}, \quad \hat{g}_j^{cy} = \frac{g_j^{cy} - d_i^{cy}}{d_i^h}, \quad \hat{g}_j^w = \log\frac{g_j^w}{d_i^w}, \quad \hat{g}_j^h = \log\frac{g_j^h}{d_i^h}$$

置信度损失为多类别 Softmax 交叉熵：

$$L_{conf}(x, c) = -\sum_{i \in Pos}^{N} x_{ij}^{p} \log(\hat{c}_i^p) - \sum_{i \in Neg} \log(\hat{c}_i^0)$$

**Hard Negative Mining**

由于 8732 个默认框中绝大多数为负样本，直接训练会导致严重的正负样本不平衡。SSD 采用在线难例挖掘（OHEM）：按置信度损失对负样本降序排列，选取损失最大的前 \(3N\) 个负样本（\(N\) 为正样本数），保证负正比不超过 3:1。

**数据增强**

SSD 使用了极为激进的数据增强策略，这对小目标检测至关重要：
- 使用原始图像
- 随机裁剪，要求裁剪区域与目标的最小 IoU 为 0.1、0.3、0.5、0.7 或 0.9
- 完全随机裁剪
- 裁剪区域面积为原图的 [0.1, 1]，宽高比在 [1/2, 2] 之间
- 裁剪后 resize 到固定尺寸，以 0.5 概率水平翻转，并施加光度扭曲

> 💡 关键：数据增强是 SSD 性能的重要来源。论文消融实验显示，去掉数据增强后 mAP 从 74.3% 降至 65.5%，下降近 9 个百分点。这种"zoom-in"效果相当于在多个尺度上训练检测器。

##### 与传统方法的核心区别

| 特性 | Faster R-CNN | YOLO v1 | SSD |
|------|-------------|---------|-----|
| 检测阶段 | 两阶段（RPN + 分类） | 单阶段 | 单阶段 |
| 特征图尺度 | 单一尺度 + ROI Pooling | 单一尺度（7×7） | **多尺度**（6 个层级） |
| 预测方式 | 全连接层 | 全连接层 | **卷积预测器** |
| 锚框/默认框 | 3 种尺度 × 3 种比例 | 无预设锚框 | 多尺度多比例默认框 |
| 候选框数量 | ~300（RPN 筛选后） | 98（7×7×2） | **8732** |
| 小目标能力 | 较好 | 较差 | **较好**（浅层特征图） |
| 速度（VOC） | ~7 FPS | 45 FPS | **59 FPS**（SSD300） |

SSD 的核心创新在于：**将 Faster R-CNN 的锚框思想与 YOLO 的单阶段检测框架结合，并通过多尺度特征图预测解决了 YOLO 对小目标检测能力不足的问题**，在速度和精度之间取得了更好的平衡。

#### 🧪 练习题
```yaml
question: "SSD 相比 YOLO v1 最核心的改进是什么？"
options:
  - "使用了更深的基础网络（VGG-16 替代 GoogLeNet）"
  - "在多个不同分辨率的特征图上分别进行检测预测"
  - "引入了区域候选网络（RPN）生成候选框"
  - "使用 Focal Loss 解决正负样本不平衡问题"
answer: 1
explain: "SSD 的核心创新是多尺度特征图检测机制——在 6 个不同分辨率的特征层上分别预测，使浅层特征图负责小目标、深层特征图负责大目标，解决了 YOLO 仅在单一 7×7 特征图上预测导致的小目标检测能力不足问题。"
```

### YOLOv3

```yaml
id: yolov3
num: 7
name: YOLOv3
full_name: 你只需要看一次v3 (You Only Look Once v3)
year: '2018'
org: 华盛顿大学
parent: yolov1
paper_url: https://arxiv.org/abs/1804.02767
project_url: ''
category: one_stage
motivation: Darknet-53与多尺度预测
```

#### 📝 一句话总结
YOLOv3 在 YOLOv2 基础上引入**多尺度特征预测**（类似 FPN）和更深的 **Darknet-53** 残差网络 backbone，并将类别预测改为独立 logistic 分类器，在保持极高推理速度的同时大幅提升了检测精度，尤其在 COCO AP\(_{50}\) 指标上达到 57.9%，与 RetinaNet 持平但速度快 3.8 倍。

#### 🎯 核心要点
- **多尺度预测**：在 3 个不同尺度的特征图上进行检测，每个尺度预测 3 个 bounding box，共使用 9 组先验 anchor（通过 k-means 聚类获得）
- **Darknet-53 backbone**：53 层卷积网络，大量使用残差连接（shortcut connections），兼顾精度与速度，Top-1/Top-5 准确率与 ResNet-152 相当但 FPS 高 2 倍
- **独立 logistic 分类器**：用独立的 logistic 回归替代 softmax 进行多标签分类，支持非互斥的重叠类别标签（如 Open Images 数据集中"女人"和"人"）
- **Bounding box 预测**：使用维度聚类先验 + logistic 回归预测 objectness 分数，每个 ground truth 仅分配一个最佳匹配 anchor
- **特征金字塔融合**：从不同层提取特征图并通过上采样 + 拼接进行多尺度融合，类似 FPN 结构
- **COCO 基准表现**：AP\(_{50}\) = 57.9%（与 SSD 变体和 RetinaNet 竞争力相当），AP\(_{75}\) 和小目标检测仍有提升空间

#### 🔬 深入细节
##### 整体架构示意

![YOLOv3 多尺度检测架构](https://pjreddie.com/media/image/yolov3.png)
*图：YOLOv3 在三个尺度上进行目标检测，通过特征金字塔网络融合不同层级的特征信息*

YOLOv3 的整体架构可以分为三个核心部分：**Darknet-53 特征提取网络**、**多尺度特征融合模块**（FPN-like）和**三尺度检测头**。输入图像经过 Darknet-53 提取多层特征后，在三个不同分辨率的特征图上分别进行目标检测，每个检测头输出 bounding box 坐标、objectness 分数和类别概率。

##### Darknet-53 Backbone 架构

```
┌──────────────────────────────────────────────────┐
│  Layer            Filters   Size     Output       │
├──────────────────────────────────────────────────┤
│  Convolutional      32    3×3      256×256        │
│  Convolutional      64    3×3/2    128×128        │
│  Residual Block ×1                 128×128        │
│  Convolutional     128    3×3/2     64×64         │
│  Residual Block ×2                  64×64         │
│  Convolutional     256    3×3/2     32×32         │
│  Residual Block ×8                  32×32  ← 尺度3 │
│  Convolutional     512    3×3/2     16×16         │
│  Residual Block ×8                  16×16  ← 尺度2 │
│  Convolutional    1024    3×3/2      8×8          │
│  Residual Block ×4                   8×8   ← 尺度1 │
│  Avgpool + FC + Softmax (分类任务)                  │
└──────────────────────────────────────────────────┘
每个 Residual Block = 1×1 Conv + 3×3 Conv + Shortcut
```

Darknet-53 共包含 53 个卷积层，采用连续的 3×3 和 1×1 卷积核交替堆叠，并通过 shortcut 连接构成残差块。与 ResNet-101/152 相比，Darknet-53 在 ImageNet 分类任务上达到了相近的 Top-1（77.2%）和 Top-5（93.8%）准确率，但每秒浮点运算次数（BFLOP/s）更高，推理速度显著更快。

##### 算法核心流程伪代码

```python
# YOLOv3 前向推理伪代码
def yolov3_forward(image, darknet53, anchors_per_scale=3):
    # Step 1: Darknet-53 特征提取
    feat_small  = darknet53.layer_at(scale=1)   # 8×8,   大目标
    feat_medium = darknet53.layer_at(scale=2)   # 16×16, 中目标
    feat_large  = darknet53.layer_at(scale=3)   # 32×32, 小目标

    # Step 2: FPN-like 多尺度特征融合
    # 从最小特征图开始，上采样后与上一层拼接
    out1 = detect_head(feat_small)                          # 尺度1: 8×8
    up1  = upsample(feat_small_processed)
    feat_medium_fused = concat(up1, feat_medium)
    out2 = detect_head(feat_medium_fused)                   # 尺度2: 16×16
    up2  = upsample(feat_medium_processed)
    feat_large_fused  = concat(up2, feat_large)
    out3 = detect_head(feat_large_fused)                    # 尺度3: 32×32

    # Step 3: 每个检测头输出
    # 输出张量形状: N × N × [anchors × (5 + num_classes)]
    # 5 = tx, ty, tw, th, objectness
    all_detections = merge(out1, out2, out3)
    return nms(all_detections)
```

##### 1. Bounding Box 预测机制

YOLOv3 沿用 YOLOv2 的维度聚类（dimension clusters）方法预测 bounding box。网络为每个 bounding box 预测 4 个坐标偏移量 \(t_x, t_y, t_w, t_h\)，通过以下公式映射到绝对坐标：

$$b_x = \sigma(t_x) + c_x$$
$$b_y = \sigma(t_y) + c_y$$
$$b_w = p_w \cdot e^{t_w}$$
$$b_h = p_h \cdot e^{t_h}$$

其中 \((c_x, c_y)\) 是当前网格单元（grid cell）的左上角偏移，\((p_w, p_h)\) 是先验 anchor 的宽高，\(\sigma\) 是 sigmoid 函数，将中心点坐标约束在当前网格单元内。

> 💡 **关键**：使用 sigmoid 函数约束 \(t_x, t_y\) 使得预测的中心点始终落在对应的 grid cell 内部（0~1 范围），这比直接回归绝对坐标更稳定，有效缓解了训练初期的不稳定问题。

**Objectness 预测**采用 logistic 回归。训练时，每个 ground truth 目标仅分配给与其 IoU 最大的那一个 anchor prior。如果某个 anchor 不是最佳匹配但 IoU 超过阈值（论文中为 0.5），则忽略该预测（不计入损失），既不作为正样本也不作为负样本。每个 ground truth 只有一个 anchor 负责预测，这与 Faster R-CNN 中一个 ground truth 可匹配多个 anchor 的策略不同。

训练损失函数采用**二元交叉熵（binary cross-entropy）**计算 objectness 分数：

$$L_{obj} = -\sum_{i} \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right]$$

##### 2. 多标签分类：独立 Logistic 替代 Softmax

YOLOv3 的一个重要改进是将类别预测从 softmax 分类器改为**独立的 logistic 分类器**（每个类别一个二元分类器）。

> ⚠️ **注意**：Softmax 假设类别之间互斥，但在许多真实数据集（如 Open Images）中，一个目标可以同时属于多个类别（例如"Woman"和"Person"）。独立 logistic 分类器允许多标签输出，更加灵活。

每个类别的预测独立使用 sigmoid 激活 + 二元交叉熵损失：

$$L_{cls} = -\sum_{i}\sum_{c} \left[ y_{ic} \log(\sigma(p_{ic})) + (1 - y_{ic}) \log(1 - \sigma(p_{ic})) \right]$$

其中 \(y_{ic} \in \{0, 1\}\) 表示第 \(i\) 个预测框是否属于第 \(c\) 类，\(p_{ic}\) 是网络的原始输出（logit）。

##### 3. 多尺度预测（Feature Pyramid Network）

这是 YOLOv3 最核心的架构创新。YOLOv3 在**三个不同尺度**的特征图上进行预测，机制类似于特征金字塔网络（FPN）：

| 尺度 | 特征图大小（416输入） | 感受野 | 检测目标 | Anchor 示例（COCO） |
|------|----------------------|--------|----------|---------------------|
| 尺度1 | 13×13 | 大 | 大目标 | (116,90), (156,198), (373,326) |
| 尺度2 | 26×26 | 中 | 中目标 | (30,61), (62,45), (59,119) |
| 尺度3 | 52×52 | 小 | 小目标 | (10,13), (16,30), (33,23) |

每个尺度预测 3 个 bounding box，每个 box 的输出维度为 \(5 + C\)（4 坐标 + 1 objectness + \(C\) 类概率）。对于 COCO 数据集（80 类），每个尺度的输出张量为 \(N \times N \times [3 \times (5 + 80)] = N \times N \times 255\)。

特征融合过程：
1. 从 Darknet-53 的最后一层（8×8）提取特征，经过若干卷积层后输出**尺度1**的检测结果
2. 将该特征图上采样 2 倍，与 Darknet-53 中间层（16×16）的特征**拼接（concatenate）**，经过卷积后输出**尺度2**的检测结果
3. 再次上采样并与更早的层（32×32）拼接，输出**尺度3**的检测结果

> 💡 **关键**：这种自顶向下的特征融合使得浅层特征图能够获得深层的语义信息，同时保留高分辨率的空间细节，对小目标检测尤为重要。9 个 anchor 通过 k-means 聚类在 COCO 数据集上确定，按尺寸分配到三个尺度。

##### 4. 与前代及同期方法的对比

**与 YOLOv2 的关键区别：**
- **Backbone**：Darknet-19 → Darknet-53（增加残差连接，更深更强）
- **检测尺度**：单尺度 → 三尺度（FPN 风格融合）
- **分类方式**：Softmax → 独立 logistic（支持多标签）
- **Anchor 数量**：5 个 → 9 个（每个尺度 3 个）

**与 RetinaNet（Focal Loss）的对比：**

| 方法 | AP | AP\(_{50}\) | AP\(_{75}\) | 推理时间 |
|------|-----|------------|------------|---------|
| YOLOv3-608 | 33.0 | **57.9** | 34.4 | 51 ms |
| RetinaNet-101-800 | **40.8** | 61.1 | 44.1 | 198 ms |
| SSD513 | 31.2 | 50.4 | 33.3 | 125 ms |

YOLOv3 在 AP\(_{50}\)（IoU=0.5 的 mAP）上表现极为出色，但在更严格的 AP\(_{75}\) 和整体 AP 上落后于 RetinaNet。作者指出，YOLOv3 在精确定位（高 IoU 阈值）方面仍有不足，这可能与其 bounding box 回归机制有关。

##### 5. 作者尝试过但失败的方法

论文中坦诚记录了几个未能成功的尝试，这些负面结果同样有参考价值：

- **Anchor box 坐标的 x,y 偏移预测**：尝试用线性激活替代 sigmoid 预测 x,y 偏移，导致 mAP 下降数个点
- **Focal Loss**：将 focal loss 应用于 YOLOv3 导致 mAP 下降约 2 个点。作者推测 YOLOv3 已经通过 objectness 预测和条件类别预测的分离机制解决了 focal loss 所针对的类别不平衡问题
- **双 IoU 阈值策略**：类似 Faster R-CNN 的做法，使用两个 IoU 阈值区分正负样本，效果不佳

> 💡 **关键**：Focal Loss 在 YOLOv3 上失败这一发现说明，不同检测框架的正负样本平衡机制不同，一种框架中有效的技巧不一定能迁移到另一种框架。YOLOv3 通过 objectness 分支已经隐式地处理了前景/背景不平衡。

#### 🧪 练习题
```yaml
question: "YOLOv3 将类别预测从 softmax 改为独立 logistic 分类器的主要原因是什么？"
options:
  - "降低计算复杂度，加快推理速度"
  - "支持多标签分类，处理非互斥的类别标签"
  - "提升小目标的检测精度"
  - "减少 anchor box 的数量需求"
answer: 1
explain: "Softmax 假设类别互斥，但真实数据集中一个目标可能同时属于多个类别（如 'Woman' 和 'Person'），独立 logistic 分类器允许每个类别独立预测，支持多标签输出。"
```

### RetinaNet

```yaml
id: retinanet
num: 8
name: RetinaNet
full_name: 视网膜网络 (RetinaNet)
year: '2017'
org: FAIR
parent: ssd
paper_url: https://arxiv.org/abs/1708.02002
project_url: ''
category: one_stage
motivation: Focal Loss解决类别不平衡
```

#### 📝 一句话总结
RetinaNet 提出 Focal Loss，通过动态降低易分类样本的损失权重来解决 one-stage 检测器中前景-背景极端不平衡问题（~1:1000），首次使 one-stage 检测器在精度上超越所有 two-stage 方法，同时保持更快的推理速度。

#### 🎯 核心要点
- **Focal Loss**：在标准交叉熵前添加调制因子 \((1 - p_t)^\gamma\)，自动降低易分类样本权重，聚焦难样本训练
- **最优超参**：\(\gamma = 2\)、\(\alpha = 0.25\) 在 COCO 上效果最佳
- **类别不平衡是核心瓶颈**：论文证明 one-stage 落后 two-stage 的根本原因不是网络结构，而是训练时前景-背景极端不平衡
- **RetinaNet 架构**：ResNet + FPN 骨干网络（P3-P7），附加分类子网络和回归子网络，A=9 anchors/位置
- **初始化策略**：分类子网络最后一层 bias 初始化为 \(-\log((1-\pi)/\pi)\)（\(\pi=0.01\)），防止大量负样本在训练初期产生不稳定梯度
- **COCO SOTA**：ResNet-101-FPN 达到 39.1 AP，超越最佳 one-stage（DSSD 33.2）5.9 点，超越最佳 two-stage（Faster R-CNN 36.8）2.3 点
- **对比 OHEM**：Focal Loss（36.0 AP）显著优于 OHEM（32.8 AP），且无需额外的采样超参数

#### 🔬 深入细节
![Focal Loss 曲线](https://ar5iv.labs.arxiv.org/html/1708.02002/assets/x1.png)
*图 1：不同 \(\gamma\) 值下 Focal Loss 的曲线。随着 \(\gamma\) 增大，易分类样本（\(p_t\) 大）的损失被大幅抑制*

![RetinaNet 网络架构图](https://ar5iv.labs.arxiv.org/html/1708.02002/assets/x3.png)
*图 3：RetinaNet 架构。(a) ResNet 骨干网络 (b) FPN 多尺度特征金字塔 (c) 分类子网络 (d) 回归子网络*

```python
# Focal Loss 伪代码
def focal_loss(pred, target, gamma=2.0, alpha=0.25):
    """
    pred: 模型预测概率 (sigmoid 输出), shape [N, K]
    target: 真实标签, shape [N, K] (one-hot)
    """
    # 计算 p_t：正样本取 p，负样本取 1-p
    p_t = pred * target + (1 - pred) * (1 - target)
    
    # alpha 平衡因子：正样本权重 alpha，负样本权重 1-alpha
    alpha_t = alpha * target + (1 - alpha) * (1 - target)
    
    # Focal Loss = -alpha_t * (1 - p_t)^gamma * log(p_t)
    focal_weight = alpha_t * (1 - p_t) ** gamma
    loss = -focal_weight * torch.log(p_t + 1e-8)
    
    # 归一化：除以被分配到 ground-truth 的 anchor 数量（非总 anchor 数）
    num_pos = target.sum()
    return loss.sum() / max(num_pos, 1)
```

##### 动机与背景

在目标检测领域，two-stage 检测器（如 Faster R-CNN）长期占据精度优势。论文深入分析后发现，one-stage 检测器（如 SSD、YOLO）精度落后的**根本原因不是网络容量或特征表达能力不足，而是训练过程中前景-背景类别的极端不平衡**。

具体而言，one-stage 检测器在每张图像上密集评估约 \(10^4 \sim 10^5\) 个候选位置，其中绝大多数是容易分类的背景样本。这些"easy negatives"虽然单个损失值很小，但数量巨大，累积后主导了梯度方向，导致模型退化。

> 💡 **关键洞察**：Two-stage 方法通过 RPN 的 cascade 筛选和固定正负比例采样（如 1:3）隐式地解决了类别不平衡问题。Focal Loss 则提供了一种更优雅的显式解决方案。

##### 核心机制：Focal Loss

**标准交叉熵**的问题在于，即使是高置信度的易分类样本也会贡献非零损失。当这类样本数量极大时，它们的累积损失淹没了少量难样本的信号。

标准交叉熵定义为：

$$\text{CE}(p, y) = -\log(p_t)$$

其中 \(p_t\) 在正样本时为模型预测概率 \(p\)，负样本时为 \(1-p\)。

**Focal Loss** 在交叉熵基础上引入调制因子 \((1 - p_t)^\gamma\)：

$$\text{FL}(p_t) = -\alpha_t (1 - p_t)^\gamma \log(p_t)$$

这个设计有两个关键属性：

1. **当样本被正确分类且置信度高时**（\(p_t \to 1\)），调制因子 \((1-p_t)^\gamma \to 0\)，损失被大幅抑制。例如当 \(\gamma=2\)，一个 \(p_t=0.9\) 的样本损失降为标准 CE 的 \(1/100\)。
2. **当样本被错误分类时**（\(p_t\) 小），调制因子接近 1，损失几乎不受影响。

> ⚠️ **注意**：\(\alpha_t\) 平衡因子和 \(\gamma\) 聚焦参数存在交互作用。实验表明 \(\gamma\) 增大时应适当减小 \(\alpha\)（\(\gamma=2\) 时 \(\alpha=0.25\) 最优，而非直觉上的 0.75）。

##### RetinaNet 网络架构

RetinaNet 采用简洁的单阶段架构，由三部分组成：

**1. FPN 骨干网络**：基于 ResNet 构建特征金字塔 P3-P7（分辨率依次降低 \(2^l\) 倍），所有层通道数 C=256。其中 P3-P5 通过 top-down 路径和横向连接从 ResNet 的 C3-C5 生成；P6 由 C5 经 3×3 stride-2 卷积得到；P7 由 P6 经 ReLU + 3×3 stride-2 卷积得到。

**2. 分类子网络**：每个 FPN 层级共享参数的小型 FCN——4 层 3×3 卷积（256 通道，ReLU）+ 1 层 3×3 卷积（\(K \times A\) 通道）+ sigmoid。输出每个空间位置、每个 anchor 对 K 个类别的独立二分类概率。

**3. 回归子网络**：结构与分类子网络相同，但输出为 \(4 \times A\) 个线性值（anchor 到 GT box 的偏移量），使用 class-agnostic 回归。**两个子网络不共享参数**。

**Anchor 设计**：每个 FPN 层级使用 3 种宽高比 \(\{1:2, 1:1, 2:1\}\) × 3 种尺度 \(\{2^0, 2^{1/3}, 2^{2/3}\}\) = 9 个 anchor，覆盖 32-813 像素的尺度范围。IoU ≥ 0.5 分配为正样本，< 0.4 为负样本，[0.4, 0.5) 忽略。

##### 训练与推理

**训练**：Focal Loss 直接应用于每张图像的全部 ~100k anchors（无需采样或 hard mining），损失总和除以**被分配到 GT 的 anchor 数量**（而非总 anchor 数）进行归一化。分类子网络最后一层 bias 初始化为 \(b = -\log((1-\pi)/\pi)\)（\(\pi=0.01\)），确保训练初期所有 anchor 的预测概率约为 0.01，避免大量负样本产生巨大损失导致训练发散。

**推理**：每个 FPN 层级取置信度 > 0.05 的 top-1k 预测，合并所有层级后以 IoU=0.5 阈值做 NMS 得到最终检测结果。

##### 与传统方法的对比

| 方法 | 处理不平衡的策略 | 缺陷 |
|------|-----------------|------|
| Two-stage (Faster R-CNN) | RPN cascade 筛选 + 固定正负比采样 | 速度慢，采样比例需手动调 |
| OHEM | 选取高损失样本构建 minibatch | 完全丢弃 easy examples，AP 仅 32.8 |
| SSD 式 OHEM | NMS 后强制 1:3 正负比 | 需调 NMS 阈值和 batch size |
| **Focal Loss** | 连续调制因子自动降权 | **无需采样，36.0 AP，优于所有替代方案** |

#### 🧪 练习题
```yaml
question: "Focal Loss 中当 γ=2 时，一个预测概率 p_t=0.9 的易分类样本，其损失相比标准交叉熵降低了多少倍？"
options:
  - "约 2 倍"
  - "约 10 倍"
  - "约 100 倍"
  - "约 1000 倍"
answer: 2
explain: "调制因子为 (1-0.9)^2 = 0.01，即损失降为标准 CE 的 1/100，约 100 倍。这正是 Focal Loss 能有效抑制大量易分类背景样本的关键。"
```

### YOLOv8

```yaml
id: yolov8
num: 9
name: YOLOv8
full_name: 你只需要看一次v8 (You Only Look Once v8)
year: '2023'
org: Ultralytics
parent: yolov3
paper_url: https://docs.ultralytics.com/models/yolov8/
project_url: ''
category: one_stage
motivation: Anchor-free与解耦检测头
```

#### 📝 一句话总结
YOLOv8 的核心目标是：Anchor-free与解耦检测头。

#### 🎯 核心要点
- 核心动机：Anchor-free与解耦检测头
- 演化来源：继承或改进自 yolov3
- 代表机构：Ultralytics

#### 🔬 深入细节
Anchor-free与解耦检测头


### YOLOv10

```yaml
id: yolov10
num: 10
name: YOLOv10
full_name: 你只需要看一次v10 (You Only Look Once v10)
year: '2024'
org: 清华大学
parent: yolov8
paper_url: https://arxiv.org/abs/2405.14458
project_url: ''
category: one_stage
motivation: NMS-Free一致性双重分配
```

#### 📝 一句话总结
YOLOv10 的核心目标是：NMS-Free一致性双重分配。

#### 🎯 核心要点
- 核心动机：NMS-Free一致性双重分配
- 演化来源：继承或改进自 yolov8
- 代表机构：清华大学

#### 🔬 深入细节
NMS-Free一致性双重分配


### YOLOv12

```yaml
id: yolov12
num: 11
name: YOLOv12
full_name: 你只需要看一次v12 (You Only Look Once v12)
year: '2025'
org: sunsmarterjie
parent: yolov10
paper_url: https://github.com/sunsmarterjie/yolov12
project_url: ''
category: one_stage
motivation: Area Attention与R-ELAN模块
```

#### 📝 一句话总结
YOLOv12 的核心目标是：Area Attention与R-ELAN模块。

#### 🎯 核心要点
- 核心动机：Area Attention与R-ELAN模块
- 演化来源：继承或改进自 yolov10
- 代表机构：sunsmarterjie

#### 🔬 深入细节
Area Attention与R-ELAN模块


### YOLO26

```yaml
id: yolo26
num: 12
name: YOLO26
full_name: 你只需要看一次26 (You Only Look Once 26)
year: '2026.01'
org: Ultralytics
parent: yolov12
paper_url: https://docs.ultralytics.com/models/yolo26/
project_url: ''
category: one_stage
motivation: NMS-Free原生推理与MuSGD优化
```

#### 📝 一句话总结
YOLO26 通过移除 DFL 与 NMS 实现原生端到端推理，并引入 MuSGD（SGD + Muon 混合优化器）将大语言模型训练的优化技术迁移至视觉检测，在 CPU 推理速度上提升最高 43%，成为面向边缘设备最实用的 YOLO 版本。

#### 🎯 核心要点
- **NMS-Free 端到端推理**：采用双头架构（One-to-One + One-to-Many），默认 One-to-One 头直接输出 \((N, 300, 6)\) 预测结果，无需 NMS 后处理，该思路源自 YOLOv10
- **DFL 移除**：去除 Distribution Focal Loss 模块，简化模型导出流程，提升边缘设备与低功耗硬件的兼容性
- **MuSGD 优化器**：融合 SGD 与 Muon 优化器的混合方案，灵感来自 Moonshot AI 的 Kimi K2 大模型训练，带来更稳定的收敛与更快的训练速度
- **ProgLoss + STAL**：改进的损失函数组合，显著提升小目标检测精度，适用于 IoT、机器人、航拍等场景
- **任务专用优化**：分割任务引入语义分割损失 + 多尺度 Proto 模块；姿态估计引入残差对数似然估计（RLE）；旋转框检测引入角度损失解决边界不连续问题
- **5 种规模 × 5 种任务**：n/s/m/l/x 五种模型规模，覆盖检测、实例分割、姿态估计、旋转框检测、分类五大任务
- **YOLOE-26 开放词汇**：集成 YOLOE 系列的开放词汇能力，支持文本/视觉提示的零样本推理
- **CPU 推理提速最高 43%**：针对边缘计算场景深度优化，YOLO26n 在 CPU ONNX 上仅需 38.9ms

#### 🔬 深入细节
![YOLO26 性能对比图](https://cdn.jsdelivr.net/gh/ultralytics/assets@main/docs/Ultralytics-YOLO26-Benchmark.jpg)
*图：YOLO26 各规模模型与前代 YOLO 系列在 COCO 数据集上的 mAP-延迟对比*

![YOLO26 端到端性能对比图](https://cdn.jsdelivr.net/gh/ultralytics/assets@main/docs/Ultralytics-YOLO26-Benchmark-E2E.jpg)
*图：YOLO26 端到端（NMS-Free）模式下的性能对比*

##### 算法伪代码

```python
# YOLO26 双头推理伪代码
class YOLO26Detector:
    def __init__(self):
        self.backbone = YOLO26Backbone()       # 特征提取
        self.neck = YOLO26Neck()               # 多尺度特征融合 (FPN/PAN)
        self.head_o2o = OneToOneHead(max_det=300)  # 端到端头 (默认)
        self.head_o2m = OneToManyHead(anchors=8400) # 传统头 (可选)

    def forward(self, x, end2end=True):
        features = self.backbone(x)            # 多尺度特征 {P3, P4, P5}
        fused = self.neck(features)            # 特征融合

        if end2end:
            # One-to-One: 直接输出, 无需 NMS
            preds = self.head_o2o(fused)       # (N, 300, 6) = [x, y, w, h, conf, cls]
        else:
            # One-to-Many: 传统密集预测 + NMS
            raw = self.head_o2m(fused)         # (N, nc+4, 8400)
            preds = nms(raw, iou_thresh=0.7)
        return preds

# MuSGD 优化器伪代码
class MuSGD:
    """SGD + Muon 混合优化器"""
    def __init__(self, params, lr, momentum, muon_strength):
        self.sgd = SGD(params, lr=lr, momentum=momentum)
        self.muon_strength = muon_strength     # Muon 正交化强度

    def step(self, loss):
        grads = compute_gradients(loss)
        # Muon: 对梯度矩阵做正交化投影 (源自 LLM 训练)
        for p, g in zip(params, grads):
            if g.dim() >= 2:
                g = orthogonalize(g, strength=self.muon_strength)
            p.data -= self.sgd.lr * (g + self.sgd.momentum * p.grad_buffer)
```

##### 1. 动机与背景

YOLO 系列自 2015 年诞生以来，一直是实时目标检测的标杆。然而，随着模型部署场景从 GPU 服务器扩展到边缘设备（IoT、机器人、无人机），传统 YOLO 面临三大痛点：

1. **NMS 后处理的部署负担**：非极大值抑制（NMS）是一个独立的后处理步骤，增加了推理延迟、部署复杂度，且在不同硬件平台上行为不一致。YOLOv10 首次提出了端到端方案，但仍需进一步优化。
2. **DFL 的硬件兼容性问题**：Distribution Focal Loss 虽然提升了定位精度，但其复杂的分布预测机制使模型导出困难，限制了在低功耗设备上的部署。
3. **训练优化的瓶颈**：传统 SGD 在视觉模型训练中收敛较慢，而大语言模型领域已涌现出更先进的优化技术。

> 💡 关键：YOLO26 的设计哲学是"**为部署而生**"——每一项架构改动都以简化推理、降低延迟、提升边缘兼容性为首要目标。

##### 2. NMS-Free 端到端推理与双头架构

YOLO26 最核心的架构创新是**原生端到端推理**，通过双头设计实现：

**One-to-One 头（默认）**：每个目标只产生一个最优预测，输出张量形状为 \((N, 300, 6)\)，其中 300 是每张图像的最大检测数。该头在训练时使用匈牙利匹配（Hungarian Matching）进行一对一标签分配，推理时直接输出最终结果，完全跳过 NMS。

**One-to-Many 头（可选）**：保留传统 YOLO 的密集预测方式，输出 \((N, n_c + 4, 8400)\)，其中 8400 为多尺度锚点总数。该头在训练时提供更丰富的监督信号，推理时需要 NMS 后处理，通常能获得略高的精度。

$$
\text{mAP}_{\text{e2e}} \approx \text{mAP}_{\text{o2m}} - 0.6\sim0.8
$$

> ⚠️ 注意：端到端模式的 mAP 略低于传统 NMS 模式（约 0.6-0.8 个点），但省去了 NMS 带来的延迟和部署复杂度，在实际应用中往往是更优的选择。

用户可通过 `end2end` 参数灵活切换：

```python
# 端到端模式 (默认, 无需 NMS)
results = model.predict("image.jpg")              # end2end=True
# 传统模式 (需要 NMS, 精度略高)
results = model.predict("image.jpg", end2end=False)
```

##### 3. DFL 移除与推理简化

Distribution Focal Loss（DFL）在 YOLOv8/v11/v12 中被广泛使用，它将边界框回归建模为离散分布预测问题：

$$
\text{DFL}(S_i, S_{i+1}) = -\left((y_{i+1} - y) \log(S_i) + (y - y_i) \log(S_{i+1})\right)
$$

虽然 DFL 提升了定位精度，但其预测的是一个 \(n\)-bin 分布向量而非直接的坐标值，导致：
- 模型导出时需要额外的 softmax + 期望计算层
- 在某些边缘推理框架（如 TFLite、NNAPI）中兼容性差
- 增加了推理计算量

YOLO26 **完全移除 DFL**，回归直接坐标预测，配合改进的 ProgLoss 损失函数弥补精度损失。这一简化使得模型导出更加直接，在边缘设备上的兼容性大幅提升。

##### 4. MuSGD 优化器：从 LLM 到 CV 的优化迁移

MuSGD 是 YOLO26 在训练层面的核心创新，它将大语言模型训练中的 **Muon 优化器**与经典 SGD 融合：

**Muon 的核心思想**：对梯度矩阵进行正交化投影（Orthogonalization），使参数更新方向更加"高效"，避免冗余更新。这一技术在 Moonshot AI 的 Kimi K2 大模型训练中展现了显著优势。

**MuSGD 的融合策略**：
- 对于高维参数（如卷积核、线性层权重），应用 Muon 的正交化梯度处理
- 对于低维参数（如偏置、BatchNorm 参数），保持经典 SGD 更新
- 结合 SGD 的动量机制，确保训练稳定性

$$
g_{\text{orth}} = \text{Orthogonalize}(\nabla_\theta \mathcal{L}), \quad \theta \leftarrow \theta - \eta \cdot (g_{\text{orth}} + \mu \cdot v)
$$

其中 \(\eta\) 为学习率，\(\mu\) 为动量系数，\(v\) 为动量缓存。

> 💡 关键：MuSGD 的意义在于打破了 CV 与 NLP 训练技术之间的壁垒，证明了 LLM 训练中的优化创新可以有效迁移到视觉模型。

##### 5. ProgLoss + STAL：小目标检测增强

YOLO26 引入了 **Progressive Loss（ProgLoss）** 和 **STAL（Spatial-Temporal Attention Loss）** 的组合，专门针对小目标检测进行优化：

- **ProgLoss**：在训练过程中渐进式调整损失权重，早期阶段侧重学习大目标的粗略定位，后期阶段逐步增加小目标的损失权重，避免小目标信号在训练初期被大目标淹没
- **STAL**：通过空间注意力机制增强小目标区域的特征响应，使检测头对小目标更加敏感

这一组合在 COCO 数据集上带来了显著的小目标检测提升，对于航拍图像、监控场景等小目标密集的应用尤为关键。

##### 6. 任务专用优化

YOLO26 针对不同下游任务引入了专门的优化：

| 任务 | 优化技术 | 效果 |
|------|----------|------|
| 实例分割 | 语义分割损失 + 多尺度 Proto 模块 | 更好的掩码质量与模型收敛 |
| 姿态估计 | 残差对数似然估计（RLE） | 更精确的关键点定位 |
| 旋转框检测 | 角度损失 + 优化解码 | 解决方形目标的边界不连续问题 |

##### 7. 性能数据

YOLO26 在 COCO val2017 上的检测性能（640×640 输入）：

| 模型 | mAP\(_{50-95}\) | mAP\(_{50-95}\)(e2e) | CPU ONNX (ms) | T4 TRT10 (ms) | 参数量 (M) | FLOPs (B) |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| YOLO26n | 40.9 | 40.1 | 38.9 | 1.7 | 2.4 | 5.4 |
| YOLO26s | 48.6 | 47.8 | 87.2 | 2.5 | 9.5 | 20.7 |
| YOLO26m | 53.1 | 52.5 | 220.0 | 4.7 | 20.4 | 68.2 |
| YOLO26l | 55.0 | 54.4 | 286.2 | 6.2 | 24.8 | 86.4 |
| YOLO26x | 57.5 | 56.9 | 525.8 | 11.8 | 55.7 | 193.9 |

> 💡 关键：YOLO26n 仅 2.4M 参数、5.4B FLOPs，CPU 推理 38.9ms，是目前最轻量的高精度实时检测器之一。与前代相比，CPU 推理速度提升最高达 43%。

##### 8. 与前代 YOLO 的对比

| 特性 | YOLOv8/v11 | YOLOv12 | **YOLO26** |
|------|:---:|:---:|:---:|
| NMS 后处理 | 需要 | 需要 | **原生免除** |
| DFL 模块 | 有 | 有 | **移除** |
| 优化器 | SGD/AdamW | SGD/AdamW | **MuSGD** |
| 端到端推理 | ✗ | ✗ | **✓（双头架构）** |
| 小目标优化 | 一般 | 改进 | **ProgLoss+STAL** |
| 边缘部署友好度 | 中等 | 中等 | **高** |

#### 🧪 练习题
```yaml
question: "YOLO26 的 MuSGD 优化器融合了哪两种优化方法？"
options:
  - "Adam 与 LAMB"
  - "SGD 与 Muon"
  - "AdamW 与 LARS"
  - "RMSProp 与 Lookahead"
answer: 1
explain: "MuSGD 是 SGD 与 Muon 的混合优化器，将 Moonshot AI Kimi K2 大模型训练中的 Muon 正交化梯度技术引入视觉模型训练。"
```

### CornerNet

```yaml
id: cornernet
num: 13
name: CornerNet
full_name: 角点网络 (CornerNet)
year: '2018'
org: UT Austin
parent: —
paper_url: https://arxiv.org/abs/1808.01244
project_url: ''
category: anchor_free
motivation: 利用角点对检测目标
```

#### 📝 一句话总结
CornerNet 的核心目标是：利用角点对检测目标。

#### 🎯 核心要点
- 核心动机：利用角点对检测目标
- 代表机构：UT Austin

#### 🔬 深入细节
利用角点对检测目标


### CenterNet

```yaml
id: centernet
num: 14
name: CenterNet
full_name: 中心点网络 (CenterNet)
year: '2019'
org: UT Austin
parent: cornernet
paper_url: https://arxiv.org/abs/1904.07850
project_url: ''
category: anchor_free
motivation: 将目标建模为中心点
```

#### 📝 一句话总结
CenterNet 的核心目标是：将目标建模为中心点。

#### 🎯 核心要点
- 核心动机：将目标建模为中心点
- 演化来源：继承或改进自 cornernet
- 代表机构：UT Austin

#### 🔬 深入细节
将目标建模为中心点


### FCOS

```yaml
id: fcos
num: 15
name: FCOS
full_name: 全卷积单阶段检测器 (Fully Convolutional One-Stage)
year: '2019'
org: 阿德莱德大学
parent: centernet
paper_url: https://arxiv.org/abs/1904.01355
project_url: ''
category: anchor_free
motivation: 逐像素预测与Center-ness分支
```

#### 📝 一句话总结
FCOS 的核心目标是：逐像素预测与Center-ness分支。

#### 🎯 核心要点
- 核心动机：逐像素预测与Center-ness分支
- 演化来源：继承或改进自 centernet
- 代表机构：阿德莱德大学

#### 🔬 深入细节
逐像素预测与Center-ness分支


### DETR

```yaml
id: detr
num: 16
name: DETR
full_name: 检测Transformer (Detection Transformer)
year: '2020'
org: FAIR
parent: —
paper_url: https://arxiv.org/abs/2005.12872
project_url: ''
category: transformer_based
motivation: Transformer实现端到端检测
```

#### 📝 一句话总结
DETR 的核心目标是：Transformer实现端到端检测。

#### 🎯 核心要点
- 核心动机：Transformer实现端到端检测
- 代表机构：FAIR

#### 🔬 深入细节
Transformer实现端到端检测


### Deformable DETR

```yaml
id: deformable_detr
num: 17
name: Deformable DETR
full_name: 可变形检测Transformer (Deformable DETR)
year: '2021'
org: 商汤科技
parent: detr
paper_url: https://arxiv.org/abs/2010.04159
project_url: ''
category: transformer_based
motivation: 多尺度可变形注意力加速收敛
```

#### 📝 一句话总结
Deformable DETR 的核心目标是：多尺度可变形注意力加速收敛。

#### 🎯 核心要点
- 核心动机：多尺度可变形注意力加速收敛
- 演化来源：继承或改进自 detr
- 代表机构：商汤科技

#### 🔬 深入细节
多尺度可变形注意力加速收敛


### DINO

```yaml
id: dino
num: 18
name: DINO
full_name: 带去噪锚框的改进DETR (DETR with Improved Denoising)
year: '2022'
org: IDEA
parent: deformable_detr
paper_url: https://arxiv.org/abs/2203.03605
project_url: ''
category: transformer_based
motivation: 对比去噪训练提升性能
```

#### 📝 一句话总结
DINO 的核心目标是：对比去噪训练提升性能。

#### 🎯 核心要点
- 核心动机：对比去噪训练提升性能
- 演化来源：继承或改进自 deformable_detr
- 代表机构：IDEA

#### 🔬 深入细节
对比去噪训练提升性能


### RT-DETR

```yaml
id: rt_detr
num: 19
name: RT-DETR
full_name: 实时检测Transformer (Real-Time Detection Transformer)
year: '2023'
org: 百度
parent: dino
paper_url: https://arxiv.org/abs/2304.08069
project_url: ''
category: transformer_based
motivation: 首个实时Transformer检测器
```

#### 📝 一句话总结
RT-DETR 提出了首个实时端到端目标检测器，通过**高效混合编码器**（解耦尺度内交互与跨尺度融合）和**不确定性最小查询选择**（联合优化分类与定位质量），在完全消除 NMS 后处理的前提下，以 RT-DETR-R50 实现 53.1% AP / 108 FPS（T4 GPU, TensorRT FP16），首次在速度和精度上同时超越同规模 YOLO 检测器。

#### 🎯 核心要点
- **首个实时端到端检测器**：将 DETR 范式成功拓展至实时检测场景，彻底消除 NMS 后处理带来的速度瓶颈和超参敏感性
- **NMS 瓶颈的系统性分析**：揭示 NMS 执行时间随预测数量增加而急剧上升，且不同 IoU/score 阈值组合导致精度-速度不可兼得
- **高效混合编码器（Hybrid Encoder）**：
- **AIFI（Attention-based Intra-scale Feature Interaction）**：仅对最高层特征（S5）执行自注意力，捕获尺度内语义交互
- **CCFF（CNN-based Cross-scale Feature Fusion）**：使用 RepBlock 卷积融合跨尺度特征，替代昂贵的多尺度 Transformer 编码
- **不确定性最小查询选择（Uncertainty-minimal Query Selection）**：同时约束分类与定位的联合质量，选择预测不确定性最低的 top-K 特征初始化解码器查询
- **灵活速度调节**：通过推理时调整解码器层数（无需重训练）实现速度-精度的灵活权衡
- **模型缩放策略**：支持 ResNet18/34/50/101 等多种骨干网络，覆盖从 S 到 X 的全尺度实时检测需求
- **COCO 基准 SOTA 结果**：RT-DETR-R50 达 53.1% AP / 108 FPS，RT-DETR-R101 达 54.3% AP / 74 FPS，均超越对应规模的 YOLOv5/v6/v7/v8

#### 🔬 深入细节
##### 1. 问题动机：NMS 是实时检测的隐性瓶颈

现有实时检测器（YOLO 系列）依赖 NMS 后处理来消除冗余预测框。作者通过系统实验揭示了 NMS 的两大问题：

**速度瓶颈**：NMS 的执行时间与预测框数量正相关。在 YOLOv5/v8 等模型中，NMS 耗时可达 1-2ms（占总推理时间的 10-20%），且在密集场景下更为严重。

**超参敏感性**：NMS 需要设置 score 阈值和 IoU 阈值两个超参数，二者存在内在矛盾——

> ⚠️ **关键矛盾**：降低 score 阈值可提高召回率（AP 提升），但会引入更多冗余框导致 NMS 变慢；提高 IoU 阈值可减少误抑制，但同样增加后续处理负担。两个阈值无法同时优化速度和精度。

作者以 YOLOv8-L 为例，在 COCO val2017 上测试不同阈值组合，发现 AP 最高的配置（score=0.001, IoU=0.7）对应的 NMS 耗时为 AP 最低配置的数倍。这一分析为端到端检测器的实时化提供了强有力的动机。

##### 2. 整体架构

RT-DETR 整体架构包含三个核心组件：

1. **骨干网络（Backbone）**：ResNet 系列，提取多尺度特征 \(\{S_3, S_4, S_5\}\)
2. **高效混合编码器（Efficient Hybrid Encoder）**：处理多尺度特征并输出融合后的特征序列
3. **带不确定性最小查询选择的 Transformer 解码器**：从编码器输出中选择高质量查询，迭代预测目标

```
Input Image
    │
    ▼
┌─────────────┐
│  Backbone   │ → {S3, S4, S5} 多尺度特征
│ (ResNet-50) │
└─────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│     Efficient Hybrid Encoder         │
│  ┌────────┐    ┌────────────────┐    │
│  │  AIFI  │    │     CCFF       │    │
│  │(S5自注 │ →  │(跨尺度卷积融合)│    │
│  │ 意力)  │    │  Top-down +    │    │
│  └────────┘    │  Bottom-up     │    │
│                └────────────────┘    │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│  Uncertainty-minimal Query Selection │
│  选择 top-300 低不确定性特征          │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│     Transformer Decoder (6 layers)   │
│  自注意力 + 交叉注意力 + FFN          │
│  可变形注意力 (Deformable Attention)  │
└──────────────────────────────────────┘
    │
    ▼
  {类别, 边界框} × N
```

##### 3. 高效混合编码器（Efficient Hybrid Encoder）

这是 RT-DETR 最核心的设计创新。作者通过消融实验发现，DETR 编码器中的**尺度内交互**和**跨尺度融合**是两种不同性质的操作，应当解耦处理。

**设计演进（消融实验 A→E）**：

| 变体 | 设计 | AP (%) | 延迟 (ms) |
|------|------|--------|-----------|
| A | 单尺度 Transformer 编码器 (S5) | 43.0 | 8.3 |
| B | 多尺度 Transformer 编码器 (拼接) | 44.0 | 12.2 |
| C | 尺度内 Transformer + 跨尺度 Transformer | 46.5 | 14.5 |
| D | 尺度内 Transformer + 跨尺度 CNN 融合 | 44.9 | 9.4 |
| E | **仅 S5 自注意力 (AIFI) + 跨尺度 CNN 融合 (CCFF)** | **47.9** | **9.5** |

> 💡 **关键洞察**：变体 C→D 的对比表明，跨尺度融合用 CNN 替代 Transformer 可大幅降低延迟（14.5→9.4ms）；变体 D→E 的对比表明，尺度内交互只需在最高语义层（S5）执行自注意力即可（因为低分辨率特征已包含高层语义信息），AP 反而提升 3.0%。

**AIFI（Attention-based Intra-scale Feature Interaction）**：

仅对 S5 特征（最低分辨率、最高语义）执行单层 Transformer 自注意力：

$$\text{AIFI}(S_5) = \text{TransformerLayer}(Q=S_5, K=S_5, V=S_5)$$

这一设计基于两个观察：(1) 高层特征包含丰富的语义概念，自注意力可捕获概念间的联系；(2) 低层特征主要包含细粒度纹理，对其执行自注意力收益有限但计算开销巨大。

**CCFF（CNN-based Cross-scale Feature Fusion）**：

采用类似 FPN 的 top-down 和 bottom-up 双路径融合，但使用 RepBlock（训练时多分支、推理时重参数化为单卷积）替代标准卷积：

$$\text{Fusion}(F_{high}, F_{low}) = \text{RepBlocks}(\text{Concat}(\text{Upsample}(F_{high}), F_{low}))$$

融合过程：
1. **Top-down 路径**：S5 → 上采样 → 与 S4 融合 → 上采样 → 与 S3 融合
2. **Bottom-up 路径**：融合后的 S3 → 下采样 → 与 S4 融合 → 下采样 → 与 S5 融合

最终输出三个尺度的融合特征 \(\{P_3, P_4, P_5\}\)。

##### 4. 不确定性最小查询选择（Uncertainty-minimal Query Selection）

传统 DETR 的查询选择（如 Deformable DETR 的 top-K 分类分数选择）仅关注分类置信度，忽略了定位质量。这导致选出的特征可能分类分数高但定位不准确。

**问题分析**：

作者将编码器特征的预测视为一个联合分类-定位任务。对于每个特征 \(f_i\)，编码器输出分类分数 \(\hat{p}_i\) 和定位预测 \(\hat{b}_i\)。理想情况下，高分类分数应对应高定位质量（高 IoU），但实际中二者常不一致。

**不确定性建模**：

作者将分类与定位的不一致性定义为**认知不确定性（epistemic uncertainty）**。具体地，将定位质量（预测框与 GT 的 IoU）视为分类分数的隐式约束：

$$U(f_i) = -P(\hat{p}_i) \cdot \log(P(\hat{p}_i))$$

其中 \(P(\hat{p}_i)\) 是分类概率分布。当分类分数与定位质量一致时，预测的不确定性最低。

**实现方式**：

训练时，将分类损失的目标从 one-hot 标签替换为 **IoU-aware 软标签**：

$$y_i = \hat{y}_i \cdot \text{IoU}(\hat{b}_i, b_i^{gt})$$

其中 \(\hat{y}_i\) 是类别的 one-hot 向量，\(\text{IoU}(\hat{b}_i, b_i^{gt})\) 是预测框与 GT 的 IoU。这样，分类分数被约束为同时反映分类正确性和定位质量。

推理时，选择 top-300 个分类分数最高的特征作为解码器查询。由于训练中已将 IoU 信息注入分类分数，高分类分数自然对应高定位质量，从而实现不确定性最小化。

> 💡 **效果**：不确定性最小查询选择使高分类分数（>0.5）特征的比例从 0.35% 提升至 0.82%，高 IoU（>0.5）特征的比例从 0.30% 提升至 0.67%，最终带来 +0.8% AP 的提升（48.7% vs 47.9%）。

##### 5. 灵活速度调节

RT-DETR 的 Transformer 解码器由多层堆叠组成（默认 6 层），每层独立输出预测结果。作者发现相邻解码器层的精度差异随层数增加而递减：

| 解码器层 ID | Det4 AP | Det5 AP | Det6 AP | 延迟 (ms) |
|------------|---------|---------|---------|-----------|
| 6 | - | - | 53.1 | 9.3 |
| 5 | - | 52.9 | 53.0 | 8.8 |
| 4 | 52.7 | 52.7 | 52.7 | 8.3 |
| 3 | 52.4 | 52.3 | 52.4 | 7.9 |

> 💡 **实用价值**：使用第 5 层替代第 6 层推理仅损失 0.1% AP（53.0% vs 53.1%），但节省 0.5ms 延迟。这意味着部署时可根据实际延迟预算灵活选择解码器层数，无需重新训练模型。

##### 6. 核心实验结果

**与 YOLO 系列 L/X 模型对比**（COCO val2017, T4 GPU, TensorRT FP16）：

| 模型 | AP (%) | FPS | 参数量 (M) |
|------|--------|-----|-----------|
| YOLOv5-L | 49.0 | 68 | 46.5 |
| YOLOv6-L | 51.7 | 58 | 59.6 |
| YOLOv7-L | 51.4 | 60 | 36.9 |
| YOLOv8-L | 52.9 | 63 | 43.7 |
| **RT-DETR-R50** | **53.1** | **108** | **42** |
| YOLOv5-X | 50.7 | 49 | 86.7 |
| YOLOv7-X | 53.1 | 44 | 71.3 |
| YOLOv8-X | 53.9 | 46 | 68.2 |
| **RT-DETR-R101** | **54.3** | **74** | **76** |

**与端到端检测器对比**：

| 模型 | AP (%) | FPS | 加速比 |
|------|--------|-----|--------|
| DINO-Deformable-DETR-R50 | 50.9 | 5 | 1x |
| **RT-DETR-R50** | **53.1** | **108** | **21x** |

RT-DETR-R50 比 DINO-R50 快 **21 倍**，同时 AP 高出 **2.2%**。

**Objects365 预训练提升**：

| 模型 | 无预训练 AP | 预训练后 AP | 提升 |
|------|-----------|-----------|------|
| RT-DETR-R18 | 46.5 | 49.2 | +2.7 |
| RT-DETR-R50 | 53.1 | 55.3 | +2.2 |
| RT-DETR-R101 | 54.3 | 56.2 | +1.9 |

##### 7. 训练细节

```python
# RT-DETR 核心训练配置
config = {
    "optimizer": "AdamW",
    "base_lr": 1e-4,
    "backbone_lr": 1e-5,
    "weight_decay": 0.0001,
    "batch_size": 16,  # 4x V100 GPUs
    "epochs": 72,       # 6x configuration (6x12)
    "ema_decay": 0.9999,
    
    # 编码器
    "aifi_layers": 1,
    "ccff_repblocks": 3,
    "embed_dim": 256,
    "ffn_dim": 1024,
    "nheads": 8,
    "feature_scales": 3,  # S3, S4, S5
    
    # 解码器
    "decoder_layers": 6,
    "num_queries": 300,
    "decoder_npoints": 4,  # 可变形注意力采样点
    
    # 损失函数 (匈牙利匹配 + 去噪训练)
    "class_cost_weight": 2.0,
    "bbox_cost_weight": 5.0,
    "giou_cost_weight": 2.0,
    "denoising_number": 200,
    "label_noise_ratio": 0.5,
    "box_noise_scale": 1.0,
}
```

##### 8. 局限性与展望

**局限性**：RT-DETR 在小目标检测上仍弱于最强 YOLO 模型。RT-DETR-R50 的 \(AP_S\) 比 YOLOv8-L 低 0.5%，RT-DETR-R101 的 \(AP_S\) 比 YOLOv7-X 低 0.9%。这是 DETR 系列的共性问题。

**展望**：RT-DETR 的解码器与其他大型 DETR 模型（如 DINO、Co-DETR）同构，因此可以利用高精度预训练的大型 DETR 模型对轻量级 RT-DETR 进行**知识蒸馏**，这是 RT-DETR 相对于 YOLO 系列的独特优势。

#### 🧪 练习题
```yaml
question: "RT-DETR 的高效混合编码器中，为什么只对最高层特征 S5 执行自注意力（AIFI），而不对所有尺度特征都执行？"
options:
  - "因为 S5 特征的分辨率最低，计算量最小，所以只是为了节省计算"
  - "因为高层特征包含丰富语义概念，自注意力可捕获概念间联系；低层特征主要是细粒度纹理，自注意力收益有限但开销巨大"
  - "因为低层特征已经通过骨干网络的残差连接获得了充分的全局信息"
  - "因为多尺度自注意力会导致梯度消失问题"
answer: 1
explain: "消融实验（变体 D→E）表明，仅对 S5 执行自注意力比对所有尺度都执行自注意力不仅更快（避免了低分辨率特征上昂贵的注意力计算），而且 AP 更高（+3.0%），因为高层特征的语义交互对检测最为关键，而低层特征的自注意力引入了噪声。"
```

### RF-DETR

```yaml
id: rf_detr
num: 20
name: RF-DETR
full_name: Roboflow检测Transformer (Roboflow Detection Transformer)
year: '2025'
org: Roboflow
parent: rt_detr
paper_url: https://arxiv.org/abs/2511.09554
project_url: ''
category: transformer_based
motivation: NAS优化首破60mAP大关
```

#### 📝 一句话总结
RF-DETR 的核心目标是：NAS优化首破60mAP大关。

#### 🎯 核心要点
- 核心动机：NAS优化首破60mAP大关
- 演化来源：继承或改进自 rt_detr
- 代表机构：Roboflow

#### 🔬 深入细节
NAS优化首破60mAP大关
