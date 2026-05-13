### Fast R-CNN

```yaml
id: fast_rcnn
name: "Fast R-CNN"
full_name: "快速区域卷积神经网络 (Fast Region-based Convolutional Neural Network)"
year: "2015"
org: "Microsoft Research"
paper_url: "https://arxiv.org/abs/1504.08083"
category: "two_stage"
parent: "rcnn"
motivation: "提出RoI Pooling层实现特征共享，将分类与回归统一为多任务学习，大幅提升训练和推理速度"
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