### YOLOv1: You Only Look Once: Unified, Real-Time Object Detection

```yaml
id: yolov1
name: YOLOv1
full_name: "你只需要看一次v1 (You Only Look Once v1)"
year: "2016"
org: "华盛顿大学"
paper_url: "https://arxiv.org/abs/1506.02640"
category: "one_stage"
parent: "—"
motivation: "单网络直接回归边界框"
```

#### 📝 一句话总结

YOLOv1 把目标检测统一成单次前向传播的回归问题，直接从整图预测网格级边界框、置信度和类别概率。它牺牲了一部分定位精度和小目标召回，换来了端到端训练、全局上下文建模和实时推理速度。

#### 🎯 核心要点

- **统一检测框架**：单个 CNN 同时输出 bounding boxes、objectness confidence 和 class probabilities。
- **网格责任分配**：输入图像划分为 \(S\times S\) 网格，目标中心落在哪个 cell，就由该 cell 负责预测目标。
- **固定输出张量**：每个 cell 预测 \(B\) 个框和 \(C\) 类概率，总输出为 \(S\times S\times(B\cdot5+C)\)。
- **置信度定义**：confidence 同时表达“是否有目标”和“框定位质量”，即 \(\Pr(\text{Object})\times\text{IoU}\)。
- **多项损失函数**：坐标、尺寸、置信度、无目标置信度、类别概率共同优化，并对坐标项加大权重。
- **实时速度**：基础 YOLO 约 45 FPS，Fast YOLO 约 155 FPS，是早期实时检测的重要里程碑。
- **主要局限**：每个 cell 类别预测共享，密集小目标和相邻目标容易漏检，定位误差多于两阶段检测器。

#### 🔬 深入细节

##### 4.1 核心示意图

![YOLOv1 网格检测模型](https://ar5iv.labs.arxiv.org/html/1506.02640/assets/x2.png)
*图：YOLOv1 将图像划分为 \(S\times S\) 网格，每个 cell 预测 \(B\) 个边界框、置信度和 \(C\) 类概率。*

##### 4.2 算法伪代码

```python
# YOLOv1 推理伪代码
def yolov1_detect(image):
    x = resize(image, 448, 448)
    pred = cnn(x)  # [S, S, B * 5 + C]

    boxes = []
    for i in range(S):
        for j in range(S):
            class_prob = softmax(pred[i, j].classes)
            for b in range(B):
                tx, ty, tw, th, conf = pred[i, j].box[b]
                box = decode_relative_to_cell(i, j, tx, ty, tw, th)
                score = conf * class_prob
                boxes.append((box, score))

    return non_max_suppression(boxes)
```

##### 4.3 方法解读

YOLOv1 之前的主流检测器通常把分类器“改装”成检测器：先生成候选区域，再对每个区域分类和回归。这种 pipeline 精度高，但步骤多、速度慢。YOLOv1 的核心改变是把检测看成整图回归：图像只经过一次 CNN，网络直接输出所有候选框和类别概率。

其输出结构由三个超参数控制：\(S\) 是网格数，\(B\) 是每个网格预测框数，\(C\) 是类别数。对 PASCAL VOC，论文使用 \(S=7, B=2, C=20\)，最终输出为：

$$
7\times 7\times(2\cdot5+20)=7\times 7\times 30
$$

每个 bounding box 包含 \((x,y,w,h,\text{confidence})\)。其中 \((x,y)\) 是相对 cell 的中心坐标，\((w,h)\) 相对整图归一化。confidence 的训练目标是：

$$
\text{confidence}=\Pr(\text{Object})\cdot \text{IoU}_{\text{pred}}^{\text{truth}}
$$

如果 cell 内没有目标，\(\Pr(\text{Object})=0\)；如果有目标，confidence 应接近预测框与真值框的 IoU。

训练时，一个目标只分配给其中心所在 cell；该 cell 中与真值 IoU 最大的 predictor 负责框回归。YOLOv1 的损失函数对坐标误差使用较大权重 \(\lambda_{\text{coord}}\)，对无目标框置信度使用较小权重 \(\lambda_{\text{noobj}}\)，避免大量背景 cell 主导训练：

$$
\mathcal{L}=\lambda_{\text{coord}}\mathcal{L}_{xywh}+\mathcal{L}_{obj}+\lambda_{\text{noobj}}\mathcal{L}_{noobj}+\mathcal{L}_{cls}
$$

尺寸项使用 \(\sqrt{w},\sqrt{h}\) 而不是直接回归 \(w,h\)，是为了让小框的尺寸误差更重要。比如宽度从 0.1 误到 0.2，比从 0.7 误到 0.8 对检测质量影响更大。

> 💡 关键：YOLOv1 的速度来自完全取消候选框生成和逐 proposal 分类，将所有预测压进一个固定形状张量中。

##### 4.4 与两阶段检测器的区别

R-CNN/Fast R-CNN 系列依赖 region proposal，局部区域分类更精细；YOLOv1 直接看整图，因此能利用全局上下文，背景误检较少。但固定网格和每 cell 有限框数限制了密集目标检测，特别是小目标、相邻目标和需要高 IoU 的精确定位任务。这些问题后来通过 anchor、多尺度预测、特征金字塔、anchor-free dense prediction 等方向逐步改进。

#### 🧪 练习题

```yaml
question: "YOLOv1 中某个目标由哪个网格单元负责预测？"
options:
  - "与目标面积重叠最大的所有网格单元共同负责"
  - "目标中心点所在的网格单元负责"
  - "置信度最低的网格单元负责"
  - "随机选择一个没有目标的网格单元负责"
answer: 1
explain: "YOLOv1 将图像划分为 S×S 网格，目标中心落入哪个 cell，该 cell 就负责预测该目标。"
```
