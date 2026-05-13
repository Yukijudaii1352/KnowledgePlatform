### MORAN — 多对象校正注意力网络 (Multi-Object Rectified Attention Network)

```yaml
id: moran
name: MORAN
full_name: "多对象校正注意力网络 (Multi-Object Rectified Attention Network)"
year: 2019
org: SCUT (华南理工大学)
paper_url: https://arxiv.org/abs/1901.03003
category: scene_text_recognition
parent: "—"
motivation: 弱监督多对象图像校正
```

#### 📝 一句话总结

MORAN 提出了一种无几何约束的多对象校正网络（MORN）与注意力序列识别网络（ASRN）联合的两阶段框架，通过弱监督方式（仅需图像-文本标签对）将不规则场景文字校正为规则形态后再识别，并引入 Fractional Pickup 方法扩展注意力视野，在 7 个主流基准上取得了当时最优的无词典识别精度。

#### 🎯 核心要点

- **两阶段架构**：MORN（多对象校正网络）负责图像校正 + ASRN（注意力序列识别网络）负责文字识别
- **无几何约束的像素级校正**：MORN 直接预测每个像素的偏移量（offset map），不受仿射/TPS 等几何变换限制，理论上可处理任意长度和任意形变的文字
- **弱监督训练**：整个网络仅需图像和对应文本标签，无需字符级标注或校正目标图像
- **Fractional Pickup（FP）**：训练时对注意力权重进行邻域混合，扩展解码器的感受野，增强对噪声和模糊边界的鲁棒性
- **课程学习策略**：先单独训练 ASRN，再联合训练 MORN+ASRN，避免端到端训练的不稳定性
- **7 个基准 SOTA**：在 IIIT5K（91.2%）、SVT（88.3%）、IC03（95.0%）、IC13（92.4%）、SVT-P（76.1%）、CUTE80（77.4%）、IC15（68.8%）上均达到当时最优无词典精度

#### 🔬 深入细节

##### 框架总览

![MORAN 整体架构图](https://ar5iv.labs.arxiv.org/html/1901.03003/assets/picture/Moran-overview.jpg)
*图：MORAN 整体框架。上半部分为 MORN（多对象校正网络），下半部分为 ASRN（注意力序列识别网络）。输入图像经 MORN 校正后送入 ASRN 进行序列识别。*

##### 算法伪代码

```python
# MORAN 训练流程伪代码
# 阶段 1: 单独训练 ASRN
for epoch in range(E1):
    for img, label in dataloader:
        # 直接用原图训练识别网络
        pred = ASRN(img)
        loss = cross_entropy(pred, label)
        optimizer_asrn.step(loss)

# 阶段 2: 联合训练 MORN + ASRN
for epoch in range(E2):
    for img, label in dataloader:
        # MORN 预测像素偏移并校正图像
        offset_x, offset_y = MORN_CNN(img)          # [B, H, W]
        grid = base_grid + offset                     # 像素级偏移
        rectified_img = bilinear_sample(img, grid)    # 可微采样
        
        # ASRN 识别校正后图像
        features = ASRN_Encoder(rectified_img)        # CNN 特征
        for t in range(max_len):
            # Fractional Pickup: 混合相邻注意力权重
            alpha_t = attention(h_{t-1}, features)     # [B, L]
            k = argmax(alpha_t)
            alpha_t[k]   = beta * alpha_t[k] + (1-beta) * alpha_t[k+1]
            alpha_t[k+1] = (1-beta) * alpha_t[k] + beta * alpha_t[k+1]
            context = sum(alpha_t * features)
            h_t, pred_t = GRU_decoder(context, h_{t-1})
        
        loss = cross_entropy(pred, label)
        optimizer_all.step(loss)
```

##### 动机与背景

场景文字识别（Scene Text Recognition, STR）是计算机视觉的核心任务之一，广泛应用于交通标志阅读、商品识别、智能检索等场景。对于**规则文字**（水平排列、无明显形变），基于 CNN+RNN+CTC 或 CNN+Attention 的方法已取得显著成功。然而，现实场景中大量存在**不规则文字**——包括透视变形、弯曲排列、旋转倾斜等，这些形变严重降低了识别精度。

在 MORAN 之前，处理不规则文字的主流方法包括：
- **仿射变换**（如 STAR-Net）：受限于旋转、缩放、平移 6 个参数，无法处理非线性形变
- **TPS 变换**（如 RARE）：通过基准点（fiducial points）拟合薄板样条，但只能捕捉全局形状，无法对每个字符独立校正，且基准点数量限制了处理无限长文字的能力

MORAN 的核心思想是：**完全摆脱几何变换的参数化约束，直接让网络学习每个像素应该"看向"原图的哪个位置**，从而实现真正灵活的多对象校正。

##### MORN：多对象校正网络

MORN 的核心是一个全卷积网络，输入图像 \(I \in \mathbb{R}^{C \times H \times W}\)，输出两个与输入同尺寸的偏移图（offset map）：

$$\Delta x, \Delta y = f_{\text{MORN}}(I), \quad \Delta x, \Delta y \in \mathbb{R}^{H \times W}$$

对于输出图像中位置 \((i, j)\) 的像素，其对应的采样坐标为：

$$x_s = x_i + \Delta x_{i,j}, \quad y_s = y_j + \Delta y_{i,j}$$

然后通过**双线性插值**从原图中采样：

$$V_c^{out}(i,j) = \sum_{n}^{H} \sum_{m}^{W} V_c^{in}(n,m) \cdot \max(0, 1-|x_s - m|) \cdot \max(0, 1-|y_s - n|)$$

> 💡 **关键**：由于双线性插值对坐标是可微的，梯度可以从 ASRN 的识别损失反向传播到 MORN 的偏移预测，实现端到端训练。这意味着 MORN **不需要任何校正目标图像作为监督**，仅通过识别损失就能学会如何校正。

MORN 的网络结构采用 U-Net 风格的编码器-解码器架构，包含下采样和上采样路径，确保偏移图具有足够的空间分辨率。为了防止偏移值过大导致采样越界，网络在最后一层使用 \(\tanh\) 激活函数将偏移限制在 \([-1, 1]\) 范围内。

> ⚠️ **注意**：与 STN（Spatial Transformer Network）的仿射变换不同，MORN 预测的是**逐像素偏移**而非全局变换参数。这使得它可以对图像中不同位置的字符施加不同的校正，真正实现"多对象"校正。例如，一个弯曲文字中，左侧字符可能需要向上移动，右侧字符需要向下移动，MORN 可以同时处理这两种情况。

##### ASRN：注意力序列识别网络

ASRN 采用经典的 Encoder-Decoder 架构：

**编码器**：一个深度 CNN（基于 ResNet 变体），将校正后的图像编码为特征序列 \(\{h_1, h_2, ..., h_L\}\)，其中 \(L\) 为特征图宽度方向的长度。

**解码器**：基于 GRU 的注意力解码器，在每个时间步 \(t\)：

1. 计算注意力权重：

$$e_{t,i} = w^T \tanh(W_s h_i + W_h s_{t-1})$$
$$\alpha_{t,i} = \frac{\exp(e_{t,i})}{\sum_{j=1}^{L} \exp(e_{t,j})}$$

2. 加权求和得到上下文向量：

$$c_t = \sum_{i=1}^{L} \alpha_{t,i} h_i$$

3. GRU 更新隐状态并预测字符：

$$s_t = \text{GRU}(c_t, s_{t-1})$$
$$y_t = \text{softmax}(W_o s_t)$$

##### Fractional Pickup（FP）

在实际场景中，文字图像常伴有阴影、模糊边界和复杂背景，注意力解码器容易聚焦到错误区域。MORAN 提出 **Fractional Pickup** 方法来缓解这一问题。

核心思想是在训练时，对注意力权重最大值位置 \(k\) 及其相邻位置 \(k+1\) 进行混合：

$$\alpha'_{t,k} = \beta \cdot \alpha_{t,k} + (1-\beta) \cdot \alpha_{t,k+1}$$
$$\alpha'_{t,k+1} = (1-\beta) \cdot \alpha_{t,k} + \beta \cdot \alpha_{t,k+1}$$

其中 \(\beta \in (0.5, 1)\) 是混合系数。这迫使解码器在训练时"看到"相邻字符的特征，从而：
- 扩展了注意力的有效感受野
- 增强了对注意力漂移的鲁棒性
- 在推理时不使用 FP，注意力自然更加精准

> 💡 **关键**：FP 仅在训练时使用，推理时关闭。这类似于 Dropout 的思想——训练时引入噪声以增强泛化能力。实验表明 FP 使 IIIT5K 精度从 89.7% 提升至 91.2%，IC03 从 94.5% 提升至 95.0%。

##### 课程学习策略

直接端到端训练 MORN+ASRN 会导致性能下降（Table 4 中端到端训练仅 89.9% vs MORAN 91.2%），因为 MORN 在训练初期产生的校正图像质量差，会误导 ASRN 的学习。

MORAN 采用两阶段课程学习：
1. **第一阶段**：冻结 MORN，仅训练 ASRN，使其具备基本的识别能力
2. **第二阶段**：联合训练 MORN+ASRN，ASRN 的梯度指导 MORN 学习有效的校正

这种策略确保了 MORN 在开始学习时，已有一个可靠的识别网络提供有意义的梯度信号。

##### 与传统方法的对比

| 特性 | 仿射变换 (STAR-Net) | TPS (RARE) | MORAN |
|------|---------------------|------------|-------|
| 变换参数 | 6 个全局参数 | K 个基准点 | H×W 个像素偏移 |
| 几何约束 | 旋转+缩放+平移 | 薄板样条 | 无约束 |
| 字符级校正 | ❌ | ❌ | ✅ |
| 无限长文字 | ✅ | ❌（受基准点数限制） | ✅ |
| 弱监督 | ✅ | ✅ | ✅ |

在 IIIT5K 无词典设置下，MORAN（91.2%）显著优于 STAR-Net（83.3%）和 RARE（81.9%）。在不规则文字数据集 CUTE80 上，MORAN（77.4%）比 RARE（59.2%）高出 18.2 个百分点。

#### 🧪 练习题

```yaml
question: "MORAN 中 MORN（多对象校正网络）的核心输出是什么？"
options:
  - "仿射变换的 6 个参数（旋转、缩放、平移）"
  - "一组 TPS 薄板样条的基准点坐标"
  - "与输入图像同尺寸的逐像素偏移图（offset map）"
  - "校正后图像的像素值"
answer: 2
explain: "MORN 输出两个与输入同尺寸的偏移图 Δx 和 Δy，每个像素独立预测偏移量，再通过双线性插值从原图采样生成校正图像，不受任何几何变换的参数化约束。"
```