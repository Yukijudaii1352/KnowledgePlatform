### ABCNet: 自适应贝塞尔曲线网络 (Adaptive Bezier-Curve Network)

```yaml
id: abcnet
name: ABCNet
full_name: "自适应贝塞尔曲线网络 (Adaptive Bezier-Curve Network)"
year: "2020"
org: University of Adelaide
paper_url: https://arxiv.org/abs/2002.10200
category: e2e_spotting
parent: mask_textspotter
motivation: 贝塞尔曲线提速10倍
```

#### 📝 一句话总结

ABCNet 用两条三次 Bezier 曲线参数化任意形状文本边界，并设计 BezierAlign 直接从曲线区域采样识别特征，解决了分割式端到端 spotting 后处理重、速度慢的问题。它把弯曲文本检测变成轻量回归问题，在保持任意形状表达能力的同时显著提升端到端速度。

#### 🎯 核心要点

- 首次将文本上下边界表示为三次 Bezier 曲线，每条曲线 4 个控制点，共 8 个点描述任意形状文本实例
- 采用单阶段、anchor-free 检测框架，直接回归 Bezier 控制点和常规检测量
- 提出 BezierAlign：沿上下 Bezier 曲线构造规则采样网格，对弯曲文本 RoI 做精确特征对齐
- 识别分支轻量化：BezierAlign 后接 6 个卷积层、1 个 BiLSTM 和全连接层，并用 CTC loss 训练
- Bezier 曲线检测相比普通 bounding box 检测几乎不增加计算量，避免复杂分割后处理
- 使用 Bezier 曲线合成数据和公开数据预训练，在 Total-Text、CTW1500 等任意形状文本基准上实现实时端到端 spotting

#### 🔬 深入细节

##### 核心架构图

![ABCNet 框架](https://ar5iv.labs.arxiv.org/html/2002.10200/assets/x2.png)
*图：ABCNet 用检测分支回归文本的 Bezier 曲线控制点，再通过 BezierAlign 从共享特征中提取曲线对齐的序列特征，送入识别分支。*

![ABCNet 方法概览](https://ar5iv.labs.arxiv.org/html/2002.10200/assets/x1.png)
*图：相比字符级或分割式方法，ABCNet 以参数化曲线直接表达任意形状文本，并自然连接识别分支。*

##### 算法伪代码

```python
# ABCNet 检测 + BezierAlign + 识别伪代码
def forward(image):
    pyramid = fpn_resnet50(image)

    # anchor-free dense prediction
    cls_score, box_reg, bezier_ctrl, centerness = detection_head(pyramid)
    candidates = decode_and_nms(cls_score, box_reg, bezier_ctrl, centerness)

    outputs = []
    for inst in candidates:
        top_curve, bottom_curve = split_to_two_cubic_beziers(inst.bezier_ctrl)
        grid = []
        for j in range(num_width_samples):
            t = j / (num_width_samples - 1)
            tp = cubic_bezier(top_curve, t)
            bp = cubic_bezier(bottom_curve, t)
            for i in range(num_height_samples):
                alpha = i / (num_height_samples - 1)
                grid.append((1 - alpha) * tp + alpha * bp)

        roi_seq = bilinear_sample(pyramid, grid)  # BezierAlign
        logits = recognition_branch(roi_seq)
        text = ctc_decode(logits)
        outputs.append((inst.bezier_ctrl, text))
    return outputs
```

##### 方法详解

**1. 动机与背景**

Mask TextSpotter 等分割式方法能处理弯曲文本，但端到端 spotting 往往需要 RoI 分割、字符分割或复杂 mask 后处理，速度受限。另一方面，传统回归式检测多用矩形或四边形，无法精确贴合弯曲文本边界。

ABCNet 的关键判断是：大量场景文本虽然形状任意，但边界通常可由两条平滑曲线近似。用 Bezier 曲线参数化边界，比逐像素分割更轻，比矩形回归更 expressive，且易与识别分支对齐。

**2. Bezier 曲线表示**

Bezier 曲线定义为：

$$
c(t)=\sum_{i=0}^{n} b_i B_{i,n}(t), \quad 0 \leq t \leq 1
$$

其中 \(b_i\) 是控制点，Bernstein 基函数为：

$$
B_{i,n}(t)=\binom{n}{i}t^i(1-t)^{n-i}
$$

论文经验选择三次曲线 \(n=3\)。一个文本实例由上边界和下边界两条三次 Bezier 曲线描述，因此共有 \(2 \times 4\) 个控制点。相比多边形顶点序列，这种表示固定长度、连续可导、便于直接回归。

**3. Bezier 控制点标注**

训练时需要把数据集中的多边形文本标注转换为 Bezier 控制点。ABCNet 在文本边界上采样，利用最小二乘拟合上下两条三次 Bezier 曲线。这样不同数据集的弯曲标注可以统一成固定维度回归目标。

**4. BezierAlign**

普通 RoIAlign 在矩形区域均匀采样，弯曲文本会被拉伸或包含大量背景。BezierAlign 先在上边界曲线得到点 \(tp\)，在下边界曲线得到对应点 \(bp\)，再沿垂直方向线性插值：

$$
op = bp \cdot \frac{g_{ih}}{h_{out}} + tp \cdot \left(1-\frac{g_{ih}}{h_{out}}\right)
$$

采样点 \(op\) 通过双线性插值从 FPN 特征中取值。这样得到的特征网格沿文本走向展开，识别分支看到的是规整的文本序列，而不是弯曲或倾斜的原始区域。

**5. 识别分支与损失**

识别分支由轻量卷积、BiLSTM 和全连接层组成，输出字符类别序列，使用 CTC loss 进行无对齐训练。检测分支负责分类、边框/中心度以及 Bezier 控制点回归；识别分支训练时直接使用 GT Bezier 曲线采样，避免检测误差早期干扰识别学习。

> 💡 关键：ABCNet 的速度来自“固定维度曲线回归 + 规则曲线采样”。它没有牺牲任意形状表达能力，却避开了像素级实例分割的重后处理。

**6. 与 Mask TextSpotter 的区别**

Mask TextSpotter 系列主要通过 mask 表达任意形状，几何表达能力强但计算和后处理成本较高。ABCNet 直接回归曲线控制点，检测输出天然是结构化边界；BezierAlign 又把检测结果转成识别可用的序列特征，因此整个 pipeline 更接近单阶段实时 spotting。

#### 🧪 练习题

```yaml
question: "ABCNet 中 BezierAlign 相比普通 RoIAlign 的关键优势是什么？"
options:
  - "它把所有文本都转换为水平矩形，提高检测召回率"
  - "它沿 Bezier 上下边界构造采样网格，使弯曲文本特征按阅读方向对齐"
  - "它不需要检测分支输出任何几何参数"
  - "它用字符级分割替代 CTC 识别"
answer: 1
explain: "BezierAlign 根据检测到的上下 Bezier 曲线插值采样，得到贴合弯曲文本的规整序列特征，普通矩形 RoIAlign 容易引入背景和几何畸变。"
```
