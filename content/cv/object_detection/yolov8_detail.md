### YOLOv8: Ultralytics YOLOv8

```yaml
id: yolov8
name: YOLOv8
full_name: "你只需要看一次v8 (You Only Look Once v8)"
year: "2023"
org: "Ultralytics"
paper_url: "https://docs.ultralytics.com/models/yolov8/"
category: "one_stage"
parent: "yolov3"
motivation: "Anchor-free与解耦检测头"
```

#### 📝 一句话总结

YOLOv8 是 Ultralytics 发布的工程化实时检测系列，用 anchor-free split head、改进 backbone/neck 和多任务模型族替代早期 YOLO 的 anchor-based 设计。它没有正式论文，核心价值在于把现代 YOLO 的 C2f/PAN 特征融合、解耦检测头和易用训练部署生态整合成稳定基线。

#### 🎯 核心要点

- **Anchor-free 检测头**：不再为每个位置配置预定义 anchor box，直接预测目标中心/距离分布。
- **Split / decoupled head**：分类分支和框回归分支分离，减少任务冲突。
- **C2f 模块**：继承 CSP 思想，用更丰富的梯度流和轻量连接增强 backbone/neck 表征。
- **PAN-FPN 融合**：多尺度特征在自顶向下和自底向上路径中融合，服务小中大目标。
- **DFL + IoU 类回归**：边界框通常通过分布式回归和 IoU 损失优化，提高定位精度。
- **统一任务族**：同一系列支持 detection、segmentation、pose、OBB、classification。
- **工程生态**：官方提供训练、验证、推理、导出和预训练权重，COCO 检测模型从 n/s/m/l/x 多尺度覆盖速度-精度取舍。

#### 🔬 深入细节

##### 4.1 核心示意图

![YOLOv8 性能对比图](https://cdn.jsdelivr.net/gh/ultralytics/assets@main/docs/yolov8-comparison-plots.avif)
*图：Ultralytics 官方 YOLOv8 文档中的性能对比图。官方文档同时说明 YOLOv8 采用 anchor-free split Ultralytics head。*

##### 4.2 算法伪代码

```python
# YOLOv8 检测流程伪代码
def yolov8_forward(image):
    feats = backbone_c2f_sppf(image)
    pyramid = pan_fpn_neck(feats)  # P3, P4, P5

    predictions = []
    for level in pyramid:
        cls_logits = cls_head(level)          # classification branch
        box_dist = box_head(level)            # regression branch, anchor-free distances
        boxes = decode_distance_distribution(box_dist, grid_points(level))
        predictions.append((boxes, cls_logits))

    return nms(concat(predictions))
```

##### 4.3 方法解读

YOLOv8 的一个重要背景是：从 YOLOv3 到 YOLOv5，anchor box 一直是单阶段 YOLO 的核心配置之一，但 anchor 需要根据数据集统计调整，且每个位置会产生多个候选框，训练和后处理都更复杂。YOLOv8 转向 anchor-free head，让每个特征位置直接预测到目标边界的距离或距离分布，从而减少 anchor 超参数。

其检测头通常拆成分类和回归两路。分类分支预测每个位置属于各类别的概率，回归分支预测框的几何信息。解耦的直觉是：分类需要关注语义判别，回归需要关注边界和几何，两者共享最后几层会产生梯度冲突。YOLOv8 的 split head 将这两个目标分开优化。

Anchor-free 距离回归可以抽象为：

$$
\mathbf{b}=(x-l,\ y-t,\ x+r,\ y+b)
$$

其中 \((x,y)\) 是特征图位置映射回原图的点，\((l,t,r,b)\) 是到四条边的距离。若使用 Distribution Focal Loss，模型不是直接输出一个距离标量，而是输出离散 bins 上的概率分布，再取期望得到距离：

$$
\hat{d}=\sum_{i=0}^{n} i\cdot p_i
$$

这让边界位置能以更细粒度表达不确定性，比单点回归更平滑。

Backbone/neck 上，YOLOv8 使用 C2f 模块替代更早的 C3/CSP 变体。C2f 保留跨阶段部分连接的低成本优势，同时让更多中间特征参与融合，改善梯度流。SPPF 提供大感受野聚合，PAN-FPN 则把高层语义和低层空间细节结合起来。

> ⚠️ 注意：YOLOv8 官方明确说明没有 formal research paper，因此精读应以官方文档、代码结构和模型配置为主，而不是把第三方文章当作论文主源。

##### 4.4 与 YOLOv3 的区别

YOLOv3 仍是 anchor-based、多尺度 logistic head，并使用 Darknet-53；YOLOv8 则采用更现代的 CSP/C2f 系列结构、anchor-free split head 和更完整的训练部署工具链。YOLOv8 仍然需要 NMS 后处理，因此在“端到端无 NMS”方面不如 YOLOv10；但它作为工程基线稳定、易训、易部署，是后续 YOLOv10/YOLOv12 继续改造的常用参照。

#### 🧪 练习题

```yaml
question: "YOLOv8 从 anchor-based 转向 anchor-free head 的主要收益是什么？"
options:
  - "不再需要任何后处理"
  - "减少预定义 anchor 的超参数和候选框冗余，简化训练与泛化"
  - "只能检测单个类别"
  - "把检测任务改成纯图像分类任务"
answer: 1
explain: "Anchor-free head 直接从位置预测框几何信息，避免为不同数据集手动配置 anchor，并减少每个位置多个 anchor 带来的冗余。"
```
