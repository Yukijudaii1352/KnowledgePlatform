### YOLOv3: An Incremental Improvement

```yaml
id: yolov3
name: YOLOv3
full_name: "YOLOv3: An Incremental Improvement"
year: 2018
org: University of Washington
paper_url: https://arxiv.org/abs/1804.02767
category: two_stage
parent: yolov2
motivation: "多尺度预测 + Darknet-53 backbone，单阶段检测"
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