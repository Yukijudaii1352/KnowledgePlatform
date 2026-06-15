### FCOS: 逐像素回归的全卷积 Anchor-Free 检测器

---

id: fcos
name: FCOS
full_name: "全卷积单阶段检测器 (Fully Convolutional One-Stage)"
year: "2019"
org: "阿德莱德大学"
paper_url: "https://arxiv.org/abs/1904.01355"
category: "anchor_free"
parent: "centernet"
motivation: "逐像素预测与Center-ness分支"

---

#### 📝 一句话总结

FCOS 将目标检测建模为特征图每个位置到目标框四条边距离的回归问题，并通过 FPN、尺度分配和 center-ness 分支构建了无需 anchor 的单阶段全卷积检测器。

![FCOS 网络结构](https://ar5iv.labs.arxiv.org/html/1904.01355/assets/x2.png)

#### 🎯 核心要点

- **核心动机**：anchor-based 检测器依赖预设 anchor 尺度和长宽比，带来大量超参数和正负样本匹配规则；FCOS 直接在像素位置预测框，消除 anchor 设计。
- **检测表示**：若某个特征图位置落在真实框内部，则该位置可回归到四条边的距离 `(l, t, r, b)`，并预测对应类别。
- **多尺度处理**：利用 FPN 的 P3 到 P7 层负责不同尺寸目标，每层设置回归距离范围，缓解同一位置同时落入多个目标框的歧义。
- **Center-ness 分支**：额外预测位置离目标中心的程度，降低远离中心位置产生的低质量框分数，改善排序与 NMS 结果。
- **方法地位**：FCOS 证明了 anchor-free 检测可以在 RetinaNet 式 dense detector 框架中直接落地，成为后续一阶段检测头设计的重要参考。

#### 🔬 深入细节

FCOS 的基本单位不是 anchor，而是特征图上的空间位置。把一个位置映射回原图后，如果它位于某个真实框内部，则该位置可以作为正样本，并学习到框四条边的距离：左边距 `l`、上边距 `t`、右边距 `r`、下边距 `b`。这样，检测头只需输出类别概率和四个非负距离值，就能恢复完整边界框。

这个表示让检测器保持全卷积结构。分类分支预测每个位置属于各类别的概率，回归分支预测 `(l,t,r,b)`。训练时分类通常使用 focal loss 来处理前景背景不平衡，回归使用 IoU loss 等框质量相关损失。与 anchor-based 方法相比，FCOS 不再需要设置 anchor 数量、尺度、长宽比，也不需要计算每个 anchor 与真实框的匹配。

密集位置预测会遇到两个主要歧义。第一，同一个位置可能落在多个真实框内部；第二，离目标边缘很近的位置也能回归出一个框，但这类框往往定位质量较差。FCOS 用 FPN 的多层尺度范围处理第一个问题：小目标分配给高分辨率层，大目标分配给低分辨率层，若仍冲突则通常选择面积更小的目标。

第二个问题由 center-ness 分支缓解。center-ness 根据回归距离的左右、上下平衡程度定义，位置越接近框中心，左右距离和上下距离越均衡，center-ness 越接近 1；越靠近边缘则越接近 0。推理时分类分数会乘以 center-ness，因此远离中心的低质量框即使类别分数较高，也会在排序中被压低。

FCOS 与 CenterNet 都是 anchor-free，但建模粒度不同。CenterNet 只让目标中心点承担主要预测责任，而 FCOS 允许目标框内部的许多位置参与训练，再用 center-ness 调节质量。这使 FCOS 更贴近 RetinaNet 这类 dense detector 的工程形态，易于复用 FPN、卷积检测头和 NMS 流程。

```text
FCOS 前向与解码
Input: image I
Output: detections D

1. Extract FPN features P3 ... P7
2. For every location p on each FPN level:
   - predict class scores cls[p]
   - predict box distances d[p] = (l, t, r, b)
   - predict center-ness ctr[p]
3. During training:
   - mark p positive if it lies inside a ground-truth box
   - constrain positives by FPN level regression range
   - optimize focal loss, IoU loss and center-ness loss
4. During inference:
   - score[p] = cls[p] * ctr[p]
   - decode box = (x-l, y-t, x+r, y+b)
   - threshold and apply NMS
```

#### 🧩 小结与思考

FCOS 的关键贡献是把 anchor-free 从关键点路线推进到 dense prediction 路线：每个位置直接预测框距离，同时用 center-ness 做质量校准。它保留了一阶段检测器的速度和工程简洁性，也把检测头的设计从 anchor 超参数中解放出来。

