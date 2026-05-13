### R-CNN — Rich feature hierarchies for accurate object detection and semantic segmentation

```yaml
id: rcnn
name: R-CNN
full_name: "基于丰富特征层次的精确目标检测与语义分割 (Rich feature hierarchies for accurate object detection and semantic segmentation)"
year: "2014"
org: UC Berkeley
paper_url: "https://arxiv.org/abs/1311.2524"
category: two_stage
parent: "—"
motivation: "首次将CNN引入目标检测"
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