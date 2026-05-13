### ABCNet v2

```yaml
id: abcnet_v2
name: ABCNet v2
full_name: "自适应贝塞尔曲线网络 v2 (Adaptive Bezier-Curve Network for Real-time End-to-end Text Spotting)"
year: 2021
org: University of Adelaide / Fudan University
paper_url: https://arxiv.org/abs/2105.03620
category: end-to-end
parent: ABCNet
motivation: 自适应端到端增强对齐
```

#### 📝 一句话总结

ABCNet v2 提出基于贝塞尔曲线的端到端任意形状文本检测与识别框架，通过 BezierAlign 实现曲线文本的精确特征对齐，结合注意力识别模块、CoordConv 和自适应端到端训练策略，在保持实时速度（10 FPS）的同时大幅提升了弯曲文本的识别精度。

#### 🎯 核心要点

- **贝塞尔曲线检测**：用三阶贝塞尔曲线（8 个控制点）参数化任意形状文本边界，替代传统矩形/多边形标注
- **BezierAlign 特征对齐**：沿贝塞尔曲线生成正交于文本方向的非矩形采样网格，精确裁剪弯曲文本特征
- **CoordConv 增强**：在 FPN 特征图上拼接归一化坐标通道，为检测分支提供显式位置信息
- **注意力识别模块**：6 层 CNN + BiLSTM + GRU Attention Decoder，支持 96 类英文和 5462 类中英文字符
- **自适应端到端训练（AET）**：根据检测分支精度自适应调整识别分支的训练样本来源（GT vs 预测框）
- **BiFPN 特征融合**：双向特征金字塔网络增强多尺度特征表达，仅损失 1 FPS
- **模型量化**：采用 LSQ（权重）+ PACT（激活）实现 INT8 量化，模型压缩 4× 且精度损失极小
- **150K 贝塞尔曲线合成数据**：基于 VGG Synth 方法生成含曲线文本的合成数据集用于预训练

#### 🔬 深入细节

![ABCNet v2 整体架构](https://ar5iv.labs.arxiv.org/html/2105.03620/assets/x2.png)
*图：ABCNet v2 整体框架。输入图像经 ResNet-50 + BiFPN 提取多尺度特征，检测分支回归贝塞尔曲线控制点，BezierAlign 根据曲线参数从特征图中采样对齐的文本特征，送入注意力识别模块输出文本。*

##### 算法伪代码

```python
# ABCNet v2 端到端推理流程
def abcnet_v2_forward(image):
    # 1. 特征提取
    features = ResNet50(image)              # 多尺度特征 C2-C5
    fpn_features = BiFPN(features)          # 双向特征金字塔融合
    coord_features = CoordConv(fpn_features)  # 拼接 (x, y) 归一化坐标

    # 2. 检测分支：回归贝塞尔曲线控制点
    proposals = RPN(coord_features)         # 生成候选区域
    bezier_points = BezierHead(proposals)   # 回归 8 个控制点 (上下各4)
    # bezier_points shape: (N, 8, 2) — N个文本实例

    # 3. BezierAlign：沿曲线采样特征
    for each detected bezier curve:
        # 沿上下贝塞尔曲线等参数采样 W=32 个点
        top_points = bezier_sample(top_curve, num=32)
        bot_points = bezier_sample(bot_curve, num=32)
        # 在每对上下点之间线性插值 H=8 个采样点
        grid = linear_interpolate(top_points, bot_points, H=8)
        # 双线性插值从特征图采样
        text_feature = bilinear_sample(fpn_features, grid)  # (8, 32, C)

    # 4. 识别分支：Attention Decoder
    cnn_feat = RecogCNN(text_feature)       # 6层CNN降维
    seq_feat = BiLSTM(cnn_feat)             # 序列建模
    text = GRU_Attention_Decode(seq_feat)   # 逐字符解码

    return bezier_points, text
```

##### 动机与背景

传统场景文本检测方法使用水平矩形框或旋转矩形框表示文本区域，这对于弯曲文本（如弧形招牌、瓶身文字）存在严重的几何失配问题。具体而言：

1. **矩形框包含大量背景噪声**：弯曲文本的矩形外接框中，文本像素占比可能不足 30%，大量背景干扰识别
2. **RoIAlign 对曲线文本失效**：标准 RoIAlign 假设文本区域为矩形，对弯曲文本的特征提取产生严重形变
3. **多边形标注冗余**：使用密集多边形点（如 CTW1500 的 28 点标注）表示文本边界参数过多，回归困难

ABCNet v1 首次提出用贝塞尔曲线表示文本边界，ABCNet v2 在此基础上进行了全面升级。

##### 核心机制一：贝塞尔曲线文本表示

三阶贝塞尔曲线由 4 个控制点 \(\{b_0, b_1, b_2, b_3\}\) 定义，参数方程为：

$$\mathbf{c}(t) = \sum_{i=0}^{3} \binom{3}{i} (1-t)^{3-i} t^i \cdot b_i, \quad t \in [0, 1]$$

文本实例用**上下两条**三阶贝塞尔曲线表示，共 8 个控制点。这种表示具有以下优势：
- **紧凑性**：仅需 16 个坐标值（8 点 × 2 维）即可精确描述复杂曲线边界
- **连续性**：贝塞尔曲线天然光滑，避免多边形的锯齿效应
- **可微性**：曲线参数可直接通过网络回归，支持端到端训练

> 💡 关键：控制点的生成采用最小二乘法拟合——给定多边形标注点，通过求解 \(\mathbf{b} = (\mathbf{M}^T\mathbf{M})^{-1}\mathbf{M}^T\mathbf{q}\) 获得最优控制点，其中 \(\mathbf{M}\) 为伯恩斯坦基函数矩阵，\(\mathbf{q}\) 为标注点坐标。

##### 核心机制二：BezierAlign

BezierAlign 是本文最核心的创新，解决了弯曲文本的特征对齐问题。与标准 RoIAlign 的关键区别在于**采样网格的构造方式**：

1. **沿曲线等参数采样**：在上下贝塞尔曲线上分别取 \(W\) 个等间距参数点（\(t = 0, \frac{1}{W-1}, \frac{2}{W-1}, \ldots, 1\)）
2. **正交插值**：对每对上下对应点之间进行线性插值，生成 \(H\) 个中间采样点
3. **双线性采样**：将采样点映射到特征图坐标，通过双线性插值获取特征值

采样网格的数学表达为：

$$\mathbf{p}(s, t) = (1 - s) \cdot \mathbf{c}_{top}(t) + s \cdot \mathbf{c}_{bot}(t), \quad s \in [0,1], t \in [0,1]$$

其中 \(\mathbf{c}_{top}(t)\) 和 \(\mathbf{c}_{bot}(t)\) 分别为上下贝塞尔曲线。最终采样网格大小为 \(H \times W = 8 \times 32\)。

> ⚠️ 注意：BezierAlign 的采样网格不再是矩形，而是随文本弯曲程度自适应变形的曲面网格。这使得提取的特征天然"拉直"了弯曲文本，无需额外的矫正步骤。

消融实验证明了 BezierAlign 的巨大优势：
| 采样方法 | E2E F-measure |
|---------|--------------|
| 水平采样 | 38.4% |
| 四边形采样 | 44.7% |
| **BezierAlign** | **61.9%** |

##### 核心机制三：CoordConv 位置编码

检测分支在 FPN 特征图上拼接两个额外通道——归一化的 x 和 y 坐标：

$$\mathbf{F}' = \text{Concat}(\mathbf{F}, \mathbf{X}_{norm}, \mathbf{Y}_{norm})$$

其中 \(\mathbf{X}_{norm}(i,j) = \frac{j}{W-1}\)，\(\mathbf{Y}_{norm}(i,j) = \frac{i}{H-1}\)。这为卷积核提供了显式的空间位置信息，有助于精确回归控制点的绝对坐标。消融实验显示 CoordConv 带来 2.8%~2.9% 的端到端提升，且几乎无计算开销。

##### 核心机制四：注意力识别模块

识别分支采用 Encoder-Decoder 架构：

- **Encoder**：6 层 CNN（含 BN + ReLU）将 BezierAlign 输出的 \(8 \times 32\) 特征压缩为 \(1 \times 32 \times 256\) 序列，再经 BiLSTM 建模长程依赖
- **Decoder**：GRU + Attention 机制逐步解码字符序列

注意力权重计算：

$$e_{t,i} = \mathbf{w}^T \tanh(\mathbf{W}_s \mathbf{s}_t + \mathbf{W}_h \mathbf{h}_i + \mathbf{b})$$
$$\alpha_{t,i} = \frac{\exp(e_{t,i})}{\sum_j \exp(e_{t,j})}$$

其中 \(\mathbf{s}_t\) 为解码器隐状态，\(\mathbf{h}_i\) 为编码器第 \(i\) 步输出。相比 ABCNet v1 的 CTC 解码器，注意力机制在 Total-Text 上提升 2.7%，在 CTW1500 上提升 7.9%。

##### 核心机制五：自适应端到端训练（AET）

端到端训练的难点在于：训练初期检测不准确，用预测框裁剪的特征质量差，会误导识别分支。AET 策略动态调整训练样本来源：

$$\text{sample} = \begin{cases} \text{GT boxes} & \text{if IoU}_{det} < \tau \\ \alpha \cdot \text{GT} + (1-\alpha) \cdot \text{Pred} & \text{otherwise} \end{cases}$$

随着训练推进，检测精度提升，逐步增加预测框的比例，使识别分支适应真实推理时的输入分布。该策略带来 1.2%~1.7% 的额外提升。

##### 与传统方法的区别

| 特性 | 传统方法 (FOTS/Mask TextSpotter) | ABCNet v2 |
|------|-------------------------------|-----------|
| 文本表示 | 矩形框/像素级分割 | 贝塞尔曲线（8 控制点） |
| 特征对齐 | RoIAlign/RoIRotate | BezierAlign（曲线自适应） |
| 弯曲文本处理 | 需额外矫正网络 | 天然支持，无需矫正 |
| 推理速度 | 1-5 FPS | **10 FPS**（快 2-10×） |
| 参数效率 | 分割需像素级标注 | 仅 16 个坐标值 |

##### 主要实验结果

在多个基准上取得 SOTA 或接近 SOTA 的端到端文本识别性能：

| 数据集 | E2E Hmean (None) | 速度 |
|--------|-----------------|------|
| Total-Text | 70.4% (73.5% 多尺度) | 10 FPS |
| SCUT-CTW1500 | 57.5% | 10 FPS |
| ICDAR 2015 (Generic) | 73.0% | 10 FPS |
| ReCTS (1-NED) | 62.7% | 10 FPS |

检测性能：Total-Text H=87.0%, ICDAR15 H=88.1%, ReCTS H=90.4%。

#### 🧪 练习题

```yaml
question: "ABCNet v2 中 BezierAlign 相比标准 RoIAlign 的核心区别是什么？"
options:
  - "使用更高分辨率的特征图进行采样"
  - "沿贝塞尔曲线构建非矩形采样网格，使采样点正交于文本方向"
  - "在采样后增加了额外的文本矫正网络"
  - "使用可变形卷积替代双线性插值"
answer: 1
explain: "BezierAlign 的核心创新在于采样网格不再是矩形，而是沿上下贝塞尔曲线构建的自适应曲面网格，采样点方向正交于文本走向，从而天然实现弯曲文本的特征'拉直'，无需额外矫正步骤。"
```