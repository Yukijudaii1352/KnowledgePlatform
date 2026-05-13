### RoI Transformer

```yaml
id: roi_transformer
name: RoI Transformer
full_name: "Learning RoI Transformer for Oriented Object Detection in Aerial Images"
year: 2019
org: Wuhan University
paper_url: "https://openaccess.thecvf.com/content_CVPR_2019/papers/Ding_Learning_RoI_Transformer_for_Oriented_Object_Detection_in_Aerial_Images_CVPR_2019_paper.pdf"
category: detection
parent: "—"
motivation: "提出RoI Transformer模块将水平RoI转换为旋转RoI，解决遥感图像中旋转目标检测的特征对齐问题"
```

#### 📝 一句话总结

RoI Transformer 提出了一种轻量级的空间变换模块，通过学习将水平 RoI（HRoI）转换为旋转 RoI（RRoI），并结合旋转位置敏感 RoI 对齐（RPS RoI Align）操作提取与旋转目标精确对齐的特征，在遥感图像旋转目标检测任务上取得了显著性能提升。

#### 🎯 核心要点

- **RoI Transformer 模块**：在两阶段检测器的 RoI 特征提取阶段插入一个空间变换层，将水平 RoI 转换为旋转 RoI，解决特征与目标之间的空间错位问题
- **RRoI Learner（旋转 RoI 学习器）**：基于 PS RoI Align 提取的特征，通过全连接层回归 5 个参数 \((t_x, t_y, t_w, t_h, t_\theta)\)，将 HRoI 变换为 RRoI
- **RPS RoI Align（旋转位置敏感 RoI 对齐）**：将旋转 RoI 划分为 \(K \times K\) 个 bin，通过旋转坐标变换在特征图上进行双线性插值采样，提取旋转对齐的特征
- **即插即用设计**：RoI Transformer 可嵌入任意两阶段检测器（如 Faster R-CNN、Light-Head R-CNN），仅增加极少计算开销（推理时间增加约 0.03s/image）
- **DOTA 数据集**上 mAP 达到 69.56%（含 FPN），**HRSC2016 数据集**上 mAP 达到 86.2%，均为当时最优
- 与 Deformable PS RoI Pooling 相比，参数更少（5 vs 98）、推理更快，且精度更高（67.74 vs 63.89 mAP）

#### 🔬 深入细节

![RoI Transformer 整体框架](https://ar5iv.labs.arxiv.org/html/1812.00155v2/assets/x2.png)
*图：RoI Transformer 整体流程。从 RPN 获取水平 RoI 后，经过 RRoI Learner 学习旋转参数，再通过 RPS RoI Align 提取旋转对齐特征用于最终分类和回归。*

##### 算法伪代码

```python
# RoI Transformer 核心流程
def roi_transformer(feature_map, horizontal_rois):
    # Step 1: 对水平RoI进行PS RoI Align，提取位置敏感特征
    ps_features = ps_roi_align(feature_map, horizontal_rois)  # [N, C, K, K]
    
    # Step 2: RRoI Learner - 从池化特征回归旋转参数
    pooled = global_avg_pool(ps_features)  # [N, C]
    deltas = fc_layer(pooled)  # [N, 5] -> (tx, ty, tw, th, tθ)
    
    # Step 3: 将水平RoI通过学到的变换转换为旋转RoI
    rotated_rois = apply_transform(horizontal_rois, deltas)
    # rotated_roi = (cx, cy, w, h, θ)
    
    # Step 4: RPS RoI Align - 在旋转RoI上提取对齐特征
    aligned_features = rps_roi_align(feature_map, rotated_rois)  # [N, C, K, K]
    
    # Step 5: 最终分类和旋转框回归
    cls_score, bbox_pred = detection_head(aligned_features)
    return cls_score, bbox_pred
```

##### 动机与背景

遥感图像中的目标（如车辆、船舶、飞机）具有任意方向，且常常密集排列。传统的水平边界框检测器存在两个核心问题：

1. **特征错位**：水平 RoI 与旋转目标之间存在严重的空间错位，导致池化特征中包含大量背景噪声，尤其对于长宽比极端的目标（如船舶）更为严重。
2. **NMS 失效**：密集排列的旋转目标使用水平框会产生大量重叠，导致 NMS 误抑制正确检测。

已有方法主要分为两类：(1) 使用旋转 anchor（如 RRPN），但需要大量预定义角度，计算开销大；(2) 直接从水平 RoI 回归旋转框（如 R2CNN），但特征仍未与目标对齐。RoI Transformer 的核心思想是：**先学习旋转变换，再提取对齐特征**，从而同时解决特征错位和检测精度问题。

##### 核心机制详解

**1. RRoI Learner（旋转 RoI 学习器）**

RRoI Learner 的目标是从水平 RoI 学习一个空间变换，将其转换为旋转 RoI。具体地，给定水平 RoI \(R_h = (x, y, w, h)\)，学习器预测变换参数 \((t_x, t_y, t_w, t_h, t_\theta)\)，得到旋转 RoI \(R_r = (x', y', w', h', \theta)\)：

$$x' = x + w \cdot t_x, \quad y' = y + h \cdot t_y$$
$$w' = w \cdot e^{t_w}, \quad h' = h \cdot e^{t_h}$$
$$\theta = \arctan(t_\theta)$$

> 💡 关键：角度参数使用 \(\arctan\) 变换而非直接回归角度值，这是因为 \(\arctan\) 的值域为 \((-\pi/2, \pi/2)\)，天然适合旋转框的角度范围，且梯度更稳定。

训练时，RRoI Learner 的监督信号来自旋转真值框（Rotated Ground Truth, RGT）。对于每个水平 RoI，通过 IoU 匹配找到对应的 RGT，计算回归目标。

**2. RPS RoI Align（旋转位置敏感 RoI 对齐）**

RPS RoI Align 是对 PS RoI Align 的旋转扩展。对于旋转 RoI \((x_r, y_r, w_r, h_r, \theta)\)，将其划分为 \(K \times K\) 个 bin。对于第 \((i, j)\) 个 bin 中的采样点 \((x_{bin}, y_{bin})\)（在 RoI 局部坐标系中），通过旋转变换映射到特征图坐标：

$$x_{feat} = x_r + x_{bin} \cdot \cos\theta - y_{bin} \cdot \sin\theta$$
$$y_{feat} = y_r + x_{bin} \cdot \sin\theta + y_{bin} \cdot \cos\theta$$

然后在特征图上进行双线性插值获取特征值。每个 bin 内的多个采样点取平均，得到该 bin 的特征表示。

> ⚠️ 注意：RPS RoI Align 继承了位置敏感（Position-Sensitive）设计，即不同 bin 从不同通道组的特征图中采样，这使得特征具有空间位置编码能力，有助于精确定位。

**3. 轻量化设计（Light RRoI Learner）**

为减少计算开销，作者提出 Light RRoI Learner：使用较小的池化尺寸（如 \(7 \times 7\)）和较少的通道数进行 RRoI 学习，而非使用完整的检测头特征。实验表明，Light RRoI Learner 在保持精度的同时显著降低了计算量。

**4. 上下文区域扩大（Context Region Enlarge）**

在 RRoI Learner 阶段，将水平 RoI 适当扩大（如 1.2 倍），以包含更多上下文信息，有助于更准确地预测旋转参数。消融实验表明该策略带来约 2.86 mAP 的提升。

##### 与传统方法的对比

| 方法 | 特征对齐 | Anchor 设计 | 额外参数 |
|------|---------|------------|---------|
| RRPN | 旋转 Anchor + 旋转池化 | 需要多角度旋转 anchor | 大量 anchor 参数 |
| R2CNN | 无（水平 RoI 直接回归） | 标准水平 anchor | 无 |
| Deformable PS RoI | 可变形采样点 | 标准水平 anchor | 98 个偏移参数 |
| **RoI Transformer** | **旋转 RoI + RPS RoI Align** | **标准水平 anchor** | **仅 5 个变换参数** |

RoI Transformer 的优势在于：(1) 使用标准水平 anchor 避免了旋转 anchor 的组合爆炸；(2) 通过显式学习旋转变换实现精确的特征对齐；(3) 仅需 5 个参数即可完成变换，远少于 Deformable 方法的 98 个参数。

##### 实验结果

在 DOTA 数据集上，RoI Transformer + FPN 达到 69.56% mAP，相比基线 Light-Head R-CNN OBB（58.31%）提升 9.43 个百分点。特别是在密集排列的小目标类别上提升显著：Ship 类别从 38.30% 提升到 83.59%（+45.29），Small Vehicle 从 38.99% 提升到 68.81%（+29.82）。

在 HRSC2016 数据集上达到 86.2% mAP，超越当时最优方法 RRD（84.3%）1.9 个百分点。

#### 🧪 练习题

```yaml
question: "RoI Transformer 中 RRoI Learner 学习的旋转参数数量是多少？"
options:
  - "3 个 (tx, ty, tθ)"
  - "4 个 (tx, ty, tw, th)"
  - "5 个 (tx, ty, tw, th, tθ)"
  - "98 个 (每个 bin 的 x, y 偏移)"
answer: 2
explain: "RRoI Learner 学习 5 个参数 (tx, ty, tw, th, tθ)，分别控制旋转 RoI 的中心平移、尺度缩放和旋转角度，这比 Deformable PS RoI Pooling 的 98 个参数（7×7×2）轻量得多。"
```