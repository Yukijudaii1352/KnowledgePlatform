### 更快的区域卷积神经网络 (Faster R-CNN)

```yaml
id: faster_rcnn
name: Faster R-CNN
full_name: 更快的区域卷积神经网络 (Faster R-CNN)
year: 2015
org: Microsoft Research
paper_url: https://arxiv.org/abs/1506.01497
category: foundation
parent: —
motivation: 提出区域建议网络(RPN)替代选择性搜索，实现端到端目标检测
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