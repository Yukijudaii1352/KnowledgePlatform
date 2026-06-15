### Gliding Vertex

```yaml
id: gliding_vertex
name: Gliding Vertex
full_name: "滑动顶点检测 (Gliding Vertex on Horizontal Bounding Box)"
year: "2020"
org: "Various Institutions"
paper_url: "https://ieeexplore.ieee.org/abstract/document/9001201/"
category: "object_detection"
parent: "roi_transformer"
motivation: "滑动顶点表征避免角度边界问题"
```

#### 📝 一句话总结

Gliding Vertex 用水平框四条边上的滑动比例和一个倾斜度因子来表示任意方向目标，避免旋转框角度边界敏感和四点回归顺序歧义，并能以很小改动接入 Faster R-CNN。

#### 🎯 核心要点

- 目标场景：航拍遥感、场景文本、鱼眼行人等任意方向目标检测。
- 表征方式：水平框 \((x,y,w,h)\) 加四个边上滑动比例 \((\alpha_1,\alpha_2,\alpha_3,\alpha_4)\)。
- Obliquity factor：用方向目标面积与水平外接框面积比 \(r=|O|/|B_h|\) 衡量倾斜程度。
- 分治推理：近水平目标输出水平框，明显倾斜目标输出滑动顶点恢复的四边形。
- 网络改动：在 Faster R-CNN 检测头上额外回归 5 个量，计算开销很小。
- 损失函数：分类损失 + 水平框回归 + 滑动比例回归 + 倾斜度回归。
- 实验覆盖 DOTA、HRSC2016、文本检测和鱼眼行人检测，证明该表示不局限于遥感。

#### 🔬 深入细节

![Gliding Vertex 表征示意](https://ar5iv.labs.arxiv.org/html/1911.09358/assets/x2.png)
*图：方向目标与水平外接框四条边相交，通过四个滑动顶点比例恢复四边形。*

##### 算法伪代码

```python
def gliding_vertex_inference(image, threshold=0.8):
    proposals = faster_rcnn_rpn(image)  # 水平候选框
    outputs = roi_head(proposals)       # cls, hbox_delta, alpha[4], obliquity r
    detections = []

    for det in outputs:
        hbox = decode_hbox(det.hbox_delta)
        alpha = sigmoid(det.alpha)      # 每条边 [0, 1]
        r = sigmoid(det.obliquity)

        if r > threshold:
            box = hbox                  # 近水平目标，避免不稳定的顶点偏移
        else:
            box = recover_quad(hbox, alpha)
        detections.append((box, det.score, det.cls))

    return oriented_nms(detections)
```

##### 方法解读

旋转目标检测常用 \((x,y,w,h,\theta)\)，但角度 \(\theta\) 有周期边界，细长目标对微小角度误差极敏感。另一类方法直接回归四个顶点，却需要人为规定顶点顺序；同一个四边形从不同角点开始都会产生不同标签，训练时容易混淆。

Gliding Vertex 的观察很简单：一个方向四边形 \(O\) 的水平外接框 \(B_h\) 与目标边界通常在上、右、下、左四条边各有一个交点。只要记录交点在对应边上的归一化位置，就能恢复目标四边形：

$$
\alpha_{1,3}=\frac{\|s_{1,3}\|}{w},\quad
\alpha_{2,4}=\frac{\|s_{2,4}\|}{h}
$$

其中 \(\alpha_1,\alpha_2,\alpha_3,\alpha_4\in[0,1]\)，分别绑定到水平框的上、右、下、左边。这种绑定消除了“从哪个顶点开始回归”的顺序问题，也避免了角度边界。

倾斜度因子 \(r\) 解决近水平目标的特殊情况：

$$
r=\frac{|O|}{|B_h|}
$$

当目标几乎水平时，\(O\) 和 \(B_h\) 面积接近，\(r\) 接近 1；此时四个滑动比例很容易受噪声影响，直接输出水平框反而更稳定。倾斜明显时，\(r\) 较小，模型输出恢复后的方向四边形。

训练时在 Faster R-CNN 原有分类与水平框回归外，增加滑动比例和倾斜度回归：

$$
\mathcal{L}_{reg}=\lambda_h\mathcal{L}_h+\lambda_\alpha\sum_{i=1}^{4}\operatorname{SmoothL1}(\alpha_i-\alpha_i^*)+\lambda_r\operatorname{SmoothL1}(r-r^*)
$$

推理阶段先可用水平 NMS 快速过滤，再做 oriented NMS 精筛。与 RoI Transformer 等方法相比，Gliding Vertex 没有引入旋转 RoI 特征变换，而是把“方向”压进检测头回归变量，因此实现轻量。

> 💡 关键：Gliding Vertex 的贡献是一个稳定表示，不是复杂网络。它把旋转框难题转成有界比例回归和一个面积比选择问题。

#### 🧪 练习题

```yaml
question: "Gliding Vertex 引入 obliquity factor 的主要原因是什么？"
options:
  - "替代分类分支"
  - "判断目标是否近水平，从而在水平框和方向四边形之间选择"
  - "增加图像分辨率"
  - "减少训练数据类别数"
answer: 1
explain: "近水平目标的滑动比例不稳定，面积比 r 可指导模型直接选择水平框；倾斜目标再使用滑动顶点恢复四边形。"
```
