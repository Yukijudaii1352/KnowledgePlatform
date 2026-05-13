### RetinaNet

```yaml
id: retinanet
name: RetinaNet
full_name: "RetinaNet: Focal Loss for Dense Object Detection"
year: 2017
org: FAIR
paper_url: "https://arxiv.org/abs/1708.02002"
category: one_stage
parent: ssd
motivation: "提出 Focal Loss 解决 one-stage 检测器中前景-背景类别极端不平衡问题，首次使 one-stage 检测器精度超越 two-stage 方法"
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