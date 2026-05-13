### TextBoxes

```yaml
id: textboxes
name: TextBoxes
full_name: 文本框检测网络 (TextBoxes)
year: '2017'
org: Huazhong University of Science and Technology
paper_url: https://arxiv.org/abs/1611.06779
category: detection
parent: ctpn
motivation: 长条卷积核适配高宽比文本
```

#### 📝 一句话总结

TextBoxes 基于 SSD 框架，通过引入长条形默认框（大宽高比）和 1×5 不规则卷积核来适配文本的极端宽高比特征，实现了端到端可训练的单次前向传播场景文字检测，在保持高精度的同时达到 0.09s/图的实时速度。

#### 🎯 核心要点

- 基于 SSD 的全卷积文本检测架构：28 层网络，VGG-16 骨干 + 9 层额外卷积层，6 个 text-box 输出层
- 长宽比默认框设计：宽高比为 1, 2, 3, 5, 7, 10 的 default boxes，并引入垂直偏移解决匹配稀疏问题
- 1×5 不规则卷积核：替代标准 3×3 卷积，产生矩形感受野，更好匹配水平文本
- 多尺度输入策略：5 种尺度（300×300, 700×700, 300×700, 500×700, 1600×1600）进一步提升检测精度
- 结合 CRNN 文本识别器：利用识别置信度重新评分检测框，消除假阳性，提升 word spotting 和端到端识别性能
- 损失函数：与 SSD 相同，分类使用 2-class softmax loss，定位使用 smooth L1 loss

#### 🔬 深入细节

![TextBoxes 网络架构图](https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x1.png)
*图：TextBoxes 架构总览。28 层全卷积网络，text-box 层连接到 6 个卷积层，每个位置预测 12 个默认框的文本存在分数和偏移量（72 维向量）。*

![默认框设计示意图](https://ar5iv.labs.arxiv.org/html/1611.06779/assets/x2.png)
*图：默认框设计。展示了宽高比为 1 和 5 的默认框，以及带有垂直偏移的变体，用于解决水平方向密集、垂直方向稀疏的匹配问题。*

```python
# TextBoxes 检测流程伪代码
def textboxes_detect(image):
    # 1. 多尺度输入（可选）
    scales = [(300,300), (700,700), (300,700), (500,700), (1600,1600)]
    all_boxes = []
    
    for scale in scales:
        img_resized = resize(image, scale)
        # 2. 前向传播：VGG-16 骨干 + 额外卷积层
        features = backbone(img_resized)  # 多层特征图
        
        # 3. 6 个 text-box 层分别预测
        for feat_map in selected_feature_maps:  # 6 层
            # 使用 1x5 卷积核预测
            # 每个位置 12 个默认框 × (2 分类 + 4 回归) = 72 维
            preds = conv1x5(feat_map)  
            boxes = decode(preds, default_boxes)
            all_boxes.extend(boxes)
    
    # 4. NMS 后处理
    final_boxes = nms(all_boxes, threshold=0.45)
    return final_boxes

# 可选：结合 CRNN 重评分
def rescore_with_crnn(boxes, image, lexicon):
    for box in boxes:
        crop = crop_image(image, box)
        score = max(crnn.prob(word | crop) for word in lexicon)
        box.score = score
    return nms(boxes)  # 二次 NMS
```

**动机与背景**

场景文字检测面临的核心挑战是文本具有极端的宽高比（如长单词或短语），这与通用目标检测中物体通常接近正方形的假设截然不同。传统方法依赖多步流水线（字符检测→过滤→分组），参数调优困难且速度慢。SSD 等通用检测器虽然速度快，但其默认框和 3×3 卷积核的设计无法有效覆盖高宽高比的文本区域——实验表明直接使用 SSD 检测文本的 F-measure 仅为 0.68（ICDAR 2013），远低于专用方法。

**核心机制：Text-box 层**

Text-box 层是 TextBoxes 的关键创新。在每个特征图位置，该层同时预测文本存在概率和边界框偏移量。其核心设计包含两个方面：

**1. 大宽高比默认框 + 垂直偏移**

与 SSD 使用 \(1, 2, 1/2, 3, 1/3\) 等对称宽高比不同，TextBoxes 定义了 6 种宽高比：\(1, 2, 3, 5, 7, 10\)，全部偏向水平方向。然而，仅增加水平方向的默认框会导致水平方向密集而垂直方向稀疏，造成 ground-truth 与默认框的匹配质量下降。为此，每个默认框额外设置一个垂直偏移版本（偏移量为网格单元高度的一半），使得每个位置共有 \(6 \times 2 = 12\) 个默认框。

**2. 1×5 不规则卷积核**

标准 3×3 卷积核产生正方形感受野，对于水平延伸的文本会引入大量背景噪声。TextBoxes 采用 1×5 的 inception 风格卷积核，产生水平矩形感受野，更好地匹配文本的形态特征，同时减少垂直方向的噪声干扰。

**边界框回归公式**

给定默认框 \(\mathbf{b}_0 = (x_0, y_0, w_0, h_0)\)，text-box 层预测偏移量 \((\Delta x, \Delta y, \Delta w, \Delta h)\)，最终检测框通过以下公式解码：

$$x = x_0 + w_0 \cdot \Delta x$$
$$y = y_0 + h_0 \cdot \Delta y$$
$$w = w_0 \cdot \exp(\Delta w)$$
$$h = h_0 \cdot \exp(\Delta h)$$

**损失函数**

TextBoxes 采用与 SSD 相同的多任务损失：

$$L(x, c, l, g) = \frac{1}{N}\left(L_{\text{conf}}(x, c) + \alpha \cdot L_{\text{loc}}(x, l, g)\right)$$

其中 \(N\) 为匹配的默认框数量，\(\alpha = 1\)。\(L_{\text{conf}}\) 为 2-class softmax 分类损失，\(L_{\text{loc}}\) 为 smooth L1 回归损失。

**训练流程**

- 输入尺寸：训练时固定 300×300
- 预训练：在 SynthText（80 万合成图像）上训练 50k 迭代
- 微调：在 ICDAR 2013 训练集上微调 2k 迭代
- 优化器：SGD，momentum=0.9，weight decay=5×10⁻⁴
- 学习率：初始 10⁻³，40k 迭代后衰减至 10⁻⁴
- 数据增强：在线随机裁剪和翻转
- 训练时间：约 25 小时（单块 Titan X GPU）

**与 CRNN 结合的 Word Spotting**

TextBoxes 先以低阈值生成候选框（约 35 个/图，召回率 0.93），然后用 CRNN 对每个候选框计算识别置信度：

$$s = \max_{\mathbf{w} \in \mathcal{W}} p(\mathbf{w} | I)$$

其中 \(\mathcal{W}\) 为给定词典。该分数替代原始检测分数后进行二次阈值过滤和 NMS。对于识别为相同单词的框，采用更低的 NMS 重叠阈值以施加更强的抑制。

**与传统方法的区别**

| 特性 | 传统方法 | SSD | TextBoxes |
|------|----------|-----|-----------|
| 流水线 | 多步（检测→过滤→分组） | 单步 | 单步 |
| 默认框宽高比 | — | 对称（1, 2, 1/2, 3, 1/3） | 偏水平（1,2,3,5,7,10）+ 垂直偏移 |
| 卷积核 | — | 3×3 | 1×5 |
| 文本适配 | 手工规则 | 无 | 专门设计 |
| ICDAR 2013 F值 | ~0.80 | 0.68 | **0.85**（多尺度 0.86） |
| 速度 | 1-7s | 0.1s | 0.09s（快速）/ 0.73s（多尺度） |

> 💡 关键：TextBoxes 的核心贡献在于证明了只需对通用检测器（SSD）做针对性的"形状适配"改造——长条默认框 + 长条卷积核——就能大幅提升文本检测性能，无需复杂的多阶段流水线。

#### 🧪 练习题

```yaml
question: "TextBoxes 相比 SSD 的核心改进是什么？"
options:
  - "使用更深的骨干网络（ResNet 替代 VGG）"
  - "引入大宽高比默认框和 1×5 卷积核以适配文本的极端宽高比"
  - "采用 Faster R-CNN 的两阶段检测策略"
  - "使用可变形卷积替代标准卷积"
answer: 1
explain: "TextBoxes 保持 VGG-16 骨干不变，核心改进是将默认框宽高比从对称设计改为偏水平的 1,2,3,5,7,10，并用 1×5 卷积核替代 3×3 以产生矩形感受野，专门适配文本的大宽高比特征。"
```