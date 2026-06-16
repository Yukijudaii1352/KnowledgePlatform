### ResUNet

```yaml
id: resunet
name: ResUNet
full_name: 残差U-Net (ResUNet)
year: '2019'
org: NTNU
paper_url: https://www.researchgate.net/publication/332131318
category: rs_analysis
parent: unet
motivation: 残差连接增强特征传递
```

#### 📝 一句话总结

ResUNet 用残差单元替换 U-Net 中的普通卷积块，并保留编码器到解码器的跨层拼接，使深层网络在遥感像素级分割中更容易训练，同时让浅层细节和高层语义更顺畅地传播。

#### 🎯 核心要点

- **来源限制**：给定 `paper_url` 的 ResearchGate 编号实际指向无关文章；本文以可访问的遥感论文 `Road Extraction by Deep Residual U-Net`（arXiv:1711.10684 / IEEE GRSL 2018）作为 ResUNet 方法主来源
- **U-Net 主体不变**：整体仍是 encoding、bridge、decoding 三段式结构，解码端逐级上采样并拼接对应编码层特征
- **残差单元替换 plain unit**：每个基本块用 BN、ReLU、Conv 组成残差函数，并通过 identity mapping 把输入加到输出上
- **双重跳连**：块内 residual skip 缓解梯度退化，U-Net 级别的 encoder-decoder skip 保留空间定位与细边界信息
- **无需裁剪操作**：与原始 U-Net 中因 valid convolution 带来的 cropping 不同，该设计通过 padding 保持尺寸对齐，使拼接更直接
- **更少参数的道路提取**：论文在 Massachusetts Roads 数据集上用 7-level、15-layer ResUNet，比 U-Net 参数少且 break-even point 更高
- **训练目标简单**：原论文用像素级 MSE 训练二值道路区域分割，推理大图时采用重叠裁块并对重叠区域平均融合

#### 🔬 深入细节

##### 图示与可访问来源

![Deep Residual U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1711.10684/assets/x2.png)
*图：Deep Residual U-Net 的编码、桥接和解码结构。每层由残差单元构成，解码端上采样后与对应编码层拼接。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1711.10684，论文页见 https://arxiv.org/abs/1711.10684。*

给定 ResearchGate URL `https://www.researchgate.net/publication/332131318` 当前可访问内容与 ResUNet 无关，因此不能作为该算法论文依据。下文方法细节基于遥感道路提取领域常引用的 Deep Residual U-Net 论文；它与 YAML 中“残差连接增强特征传递”的算法描述一致。

##### 算法伪代码

```python
# ResUNet road/remote-sensing segmentation 伪代码
def residual_unit(x, out_channels, stride=1):
    shortcut = x
    y = batch_norm(x)
    y = relu(y)
    y = conv2d(y, out_channels, kernel_size=3, stride=stride, padding="same")
    y = batch_norm(y)
    y = relu(y)
    y = conv2d(y, out_channels, kernel_size=3, stride=1, padding="same")

    if shortcut.shape != y.shape:
        shortcut = conv2d(shortcut, out_channels, kernel_size=1, stride=stride)
    return y + shortcut


def resunet_forward(tile):
    # Encoding: 用 stride=2 的残差单元逐级降采样，而不是单独 max pooling
    e1 = residual_unit(tile, 64, stride=1)
    e2 = residual_unit(e1, 128, stride=2)
    e3 = residual_unit(e2, 256, stride=2)

    # Bridge: 最低分辨率语义表征
    b = residual_unit(e3, 512, stride=2)

    # Decoding: 上采样后拼接同尺度编码特征，再用残差单元细化
    d3 = residual_unit(concat([upsample(b), e3]), 256)
    d2 = residual_unit(concat([upsample(d3), e2]), 128)
    d1 = residual_unit(concat([upsample(d2), e1]), 64)

    logits = conv2d(d1, 1, kernel_size=1)
    return sigmoid(logits)
```

##### 从 U-Net 到 ResUNet

原始 U-Net 的强项是多尺度细节融合：编码路径逐步压缩空间分辨率以获得语义，解码路径逐步上采样，并把同尺度编码层特征拼接回来。问题在于，如果网络变深，plain convolution block 容易出现梯度传播困难和退化现象；如果网络较浅，又可能无法利用足够大的上下文来区分道路、屋顶、河岸、停车场等外观相近区域。

ResUNet 的基本改动是把 U-Net 每一级的普通卷积块换成残差单元。一个残差单元可写为：

$$
\mathbf{x}_{l+1}=h(\mathbf{x}_{l})+\mathcal{F}(\mathbf{x}_{l}, W_l)
$$

其中 \(h(\mathbf{x}_l)\) 通常是 identity mapping；当通道数或空间尺寸变化时，用 \(1\times1\) projection 对齐。残差分支 \(\mathcal{F}\) 由 BN、ReLU 和卷积组成。这样模型不必直接学习完整映射 \(\mathbf{x}_{l}\mapsto \mathbf{x}_{l+1}\)，而是学习相对输入的修正量。

##### 双重信息通路为什么有效

ResUNet 有两类 skip connection。第一类是残差单元内部的短跳连，它让梯度可以绕过若干卷积层直接回传，缓解深层训练不稳定。第二类是 U-Net 编码器到解码器的长跳连，它把浅层空间细节送到对应尺度的解码层，帮助恢复道路边缘、窄桥、交叉口和被树冠遮挡的线状结构。

这两类跳连的作用不同：块内 residual skip 解决“学不动”的优化问题，U-Net skip 解决“定位丢失”的表示问题。遥感分割常有小目标、细目标和类间纹理相似的问题，因此同时需要深层上下文和浅层边界。

##### 网络结构与尺寸对齐

论文使用 7-level 架构：3 个编码残差单元、1 个 bridge 残差单元、3 个解码残差单元，最后用卷积和 sigmoid 输出道路概率图。编码阶段不使用单独 pooling，而是在残差单元的第一层卷积中设置 stride=2 完成下采样；解码阶段先上采样，再与对应编码特征 concatenate。

原始 U-Net 使用 valid convolution 时，特征图尺寸会收缩，因此拼接前常需要裁剪编码特征。ResUNet 使用 padding 保持尺寸更易对齐，省去 cropping，使网络结构更适合工程实现和大图滑窗推理。

##### 损失函数与重叠裁块推理

对二值道路区域，论文采用像素级均方误差训练。设训练样本为 \((X_i, Y_i)\)，模型输出为 \(f(X_i;\theta)\)，则：

$$
\mathcal{L}_{\text{MSE}}(\theta)
=\frac{1}{N}\sum_{i=1}^{N}
\left\|Y_i-f(X_i;\theta)\right\|_2^2
$$

今天的实现通常会换成 binary cross entropy、Dice loss 或 focal loss 来处理前景稀疏和类别不平衡，但原始 ResUNet 论文的核心贡献不在损失，而在残差 U-Net 结构本身。

高分辨率遥感图往往不能整幅送入 GPU。论文采用重叠滑窗策略：从大图裁出相互重叠的 patch，分别预测后再把重叠区域平均。这样可以减轻卷积 padding 在 patch 边界带来的低置信度问题：

$$
\hat{Y}(p)=
\frac{1}{|\mathcal{T}(p)|}
\sum_{t\in \mathcal{T}(p)} \hat{Y}_t(p)
$$

其中 \(\mathcal{T}(p)\) 是覆盖像素 \(p\) 的所有预测 tile 集合。

##### 与普通 U-Net 的差异

普通 U-Net 主要依靠 encoder-decoder 拼接恢复细节，但每一级的卷积块仍然是直接映射。ResUNet 把每一级变成“输入 + 残差修正”，因此可以在不显著增加训练难度的情况下加深网络或减少冗余参数。论文在 Massachusetts Roads 数据集上报告，ResUNet 的参数量约为 U-Net 的四分之一，却取得更高的 relaxed precision-recall break-even point。

从遥感应用角度看，残差结构还带来一个实用好处：道路、断层线、河网、建筑轮廓等目标都有强几何连续性，模型需要在局部纹理和大范围上下文之间来回传递信息。ResUNet 的短跳连与长跳连共同缩短了这种信息传递路径。

> 💡 关键：ResUNet 的“残差”不是替代 U-Net 跳连，而是叠加在 U-Net 跳连内部；它同时改善优化和定位，因此成为很多遥感分割模型的基础模板。

#### 🧪 练习题

```yaml
question: "ResUNet 相比普通 U-Net 的关键结构变化是什么？"
options:
  - "把编码器和解码器之间的跳连全部删除"
  - "用残差单元替换普通卷积块，同时保留 U-Net 的跨层拼接"
  - "只使用全局平均池化输出图像级类别"
  - "通过 CRF 后处理代替神经网络中的上采样"
answer: 1
explain: "ResUNet 在每一级卷积块内部加入 identity/residual skip，缓解深层训练退化；同时保留 U-Net 的 encoder-decoder skip 来恢复空间细节。"
```
