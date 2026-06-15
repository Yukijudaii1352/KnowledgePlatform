### CornerNet: 角点对驱动的 Anchor-Free 目标检测

---

id: cornernet
name: CornerNet
full_name: "角点网络 (CornerNet)"
year: "2018"
org: "UT Austin"
paper_url: "https://arxiv.org/abs/1808.01244"
category: "anchor_free"
parent: "—"
motivation: "利用角点对检测目标"

---

#### 📝 一句话总结

CornerNet 把目标框检测改写为左上角与右下角两个关键点的预测和配对问题，去掉了 anchor 设计，用热力图、偏移量与 associative embedding 在单阶段框架中生成检测框。

![CornerNet 检测示意](https://ar5iv.labs.arxiv.org/html/1808.01244/assets/x1.png)

#### 🎯 核心要点

- **核心动机**：传统 anchor-based 检测器需要大量尺度、长宽比和 IoU 阈值超参数，且 anchor 与真实框的匹配会引入复杂训练规则；CornerNet 直接预测框角点，绕开 anchor 生成和匹配。
- **检测表示**：每个目标由左上角和右下角两个角点表示，网络分别输出两类角点热力图、角点亚像素偏移，以及用于判断两个角点是否属于同一目标的 embedding。
- **关键模块**：Corner pooling 沿水平与垂直方向聚合边界线索，使角点位置也能看到目标内部或边缘之外的长程上下文。
- **训练目标**：热力图采用类似关键点检测的 focal loss；embedding 使用 pull loss 拉近同一目标的角点表示、push loss 推开不同目标的角点表示；偏移量使用回归损失修正下采样误差。
- **历史意义**：CornerNet 是 anchor-free 检测路线的重要节点，推动后续 CenterNet、FCOS 等方法从关键点或像素级预测角度重新设计目标检测。

#### 🔬 深入细节

CornerNet 的基础观察是：目标框本身可以由两个对角点唯一确定，因此检测器不一定要先枚举候选框。给定输入图像，主干网络生成低分辨率特征图，在该特征图上分别预测 top-left corner heatmap 和 bottom-right corner heatmap。每个类别都有独立热力图通道，热力图局部峰值表示对应类别角点可能出现的位置。

由于特征图通常相对原图有下采样，角点坐标会发生量化误差。CornerNet 为每个预测角点额外回归 offset，用来把网格点坐标修正回更精确的连续坐标。这个设计使模型可以保留高效的密集预测形式，同时避免低分辨率特征图直接带来的定位偏差。

最困难的问题是角点配对：一张图里可能有多个同类目标，仅凭左上角和右下角热力图无法知道哪两个角点属于同一个目标。CornerNet 为每个角点预测一个 embedding，同一目标的两个角点 embedding 被 pull loss 拉近，不同目标的 embedding 被 push loss 分开。推理时取高分角点，两两组合并依据类别一致性、几何合法性和 embedding 距离过滤候选框。

Corner pooling 是论文的结构性贡献。左上角角点需要看到右侧边界和下方边界的信息，右下角角点需要看到左侧和上方的信息。普通卷积的局部感受野不一定能有效聚合这种边界证据，因此 CornerNet 沿特定方向做最大池化，把长条方向上的强响应传递到角点位置，帮助模型在没有 anchor 的情况下判断角点是否真实存在。

CornerNet 的代表性主干是 Hourglass-104，这让它在精度上有竞争力，但计算成本也偏高。它证明了 anchor-free 的可行性，不过角点组合天然存在候选对爆炸和错误配对风险；后续 CenterNet 引入中心点，FCOS 引入 center-ness，本质上都在缓解 CornerNet 的配对歧义或框质量判断问题。

```text
CornerNet 推理流程
Input: image I
Output: detection boxes D

1. F = HourglassBackbone(I)
2. Predict:
   - top-left heatmaps H_tl
   - bottom-right heatmaps H_br
   - offsets O_tl, O_br
   - embeddings E_tl, E_br
3. Select top-K peaks from H_tl and H_br for each class
4. For every valid same-class pair (tl, br):
   - require tl.x < br.x and tl.y < br.y
   - compute score = average(score_tl, score_br)
   - reject if |E_tl - E_br| is too large
   - refine coordinates with offsets
5. Apply score thresholding and NMS to obtain D
```

#### 🧩 小结与思考

CornerNet 的价值不只是提出一个检测器，而是把目标检测从“候选框分类”推进到“结构化关键点预测”。它的缺点也很清楚：两个角点必须被正确检测并正确配对，任一环节出错都会影响框质量。因此它更像 anchor-free 检测的一次重要建模突破，而不是最终形态。

