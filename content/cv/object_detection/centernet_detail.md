### CenterNet: 把目标检测简化为中心点预测

---

id: centernet
name: CenterNet
full_name: "中心点网络 (CenterNet)"
year: "2019"
org: "UT Austin"
paper_url: "https://arxiv.org/abs/1904.07850"
category: "anchor_free"
parent: "cornernet"
motivation: "将目标建模为中心点"

---

#### 📝 一句话总结

CenterNet 将每个目标表示为一个中心点，并在中心点处回归目标宽高和坐标偏移，从而用关键点检测范式完成 anchor-free、无需角点配对的目标检测。

![CenterNet 检测框架](https://ar5iv.labs.arxiv.org/html/1904.07850/assets/x2.png)

#### 🎯 核心要点

- **核心动机**：CornerNet 依赖角点成对组合，容易产生错误配对；CenterNet 直接检测目标中心点，用一个点代表一个目标，显著简化后处理。
- **检测表示**：网络输出类别热力图、中心点 offset 和目标 size，中心点峰值给出类别与位置，size 给出框宽高。
- **训练方式**：真实中心点被绘制为二维 Gaussian 热力图，中心附近的位置也获得较软的正样本响应，减少精确单点监督的不稳定性。
- **推理方式**：从热力图中取局部极大值作为目标中心，结合 offset 和 width/height 直接恢复边界框，通常不需要复杂 anchor 匹配。
- **扩展能力**：同一中心点表示可以扩展到 3D 检测、人体姿态和实例分割等任务，只需在中心点处增加对应属性回归头。

#### 🔬 深入细节

CenterNet 的核心设计是 objects as points：目标不再由 anchor、候选区域或角点对表示，而是由边界框中心点表示。对于每个类别，模型预测一张热力图，热力图上的峰值表示该类别目标中心。相比 CornerNet 的两个角点，中心点没有配对歧义，一个峰值就对应一个候选目标。

训练时，CenterNet 会把真实框中心映射到输出特征图坐标，并围绕该位置绘制 Gaussian bump。目标越大，允许的中心偏差通常可以更大，因此 Gaussian 半径会依据目标尺寸确定。这样模型不是只在一个像素上获得正反馈，而是在中心邻域形成平滑监督，有利于训练稳定。

中心点位置只解决了目标在哪里的问题，边界框大小由 size 分支预测。具体来说，模型在中心点位置回归目标宽度和高度；同时通过 offset 分支补偿下采样造成的中心点量化误差。推理时，若中心点坐标为 `(x, y)`，预测宽高为 `(w, h)`，则框可直接写成 `(x - w/2, y - h/2, x + w/2, y + h/2)`，再加上 offset 做精确修正。

CenterNet 的后处理比 CornerNet 更简单。模型先对热力图做局部极大值筛选，再取 top-K 中心点生成检测框。因为每个中心点已经携带类别、位置和尺寸信息，推理不需要枚举角点组合，也不需要 anchor-based 检测器中的大规模候选框匹配。

不过，中心点建模也有自身限制。当多个目标中心非常接近，尤其是拥挤场景或小目标密集区域，热力图峰值可能互相干扰；目标尺寸回归也高度依赖中心点特征是否包含完整目标上下文。因此 CenterNet 的效果很大程度上取决于高分辨率特征、主干网络和热力图峰值质量。

```text
CenterNet 训练与推理
Training:
1. Map each ground-truth box b = (x1, y1, x2, y2) to center c = ((x1+x2)/2, (y1+y2)/2)
2. Draw class-specific Gaussian heatmap around c
3. Train network heads:
   - heatmap: focal-style keypoint loss
   - size: L1 loss on (width, height)
   - offset: L1 loss for downsampling quantization

Inference:
1. Predict heatmap, size and offset
2. Extract top-K local maxima from heatmap
3. For each center peak:
   - refine center with offset
   - decode box using predicted width and height
4. Return high-score detections
```

#### 🧩 小结与思考

CenterNet 的简洁性来自一个强假设：一个目标可以由其中心点稳定代表。这个假设在通用目标检测中非常有效，使检测流程接近关键点检测；但在中心重叠、尺度极小或形状极不规则的目标上，中心点热力图和尺寸回归仍可能成为瓶颈。

