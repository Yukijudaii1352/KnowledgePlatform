### DeepLabv3+

```yaml
id: deeplabv3plus
name: DeepLabv3+
full_name: DeepLabv3+ (DeepLabv3+)
year: '2018'
org: Google
paper_url: https://arxiv.org/abs/1802.02611
category: rs_analysis
parent: unet
motivation: ASPP多尺度上下文捕获
```

#### 📝 一句话总结

DeepLabv3+ 将 DeepLabv3 的 ASPP 多尺度上下文编码器与轻量 decoder 结合，用空洞卷积控制特征分辨率、用低层特征恢复边界细节，解决了语义分割中“全局语义强但边界粗糙”的问题。

#### 🎯 核心要点

- **DeepLabv3 作为编码器**：ASPP 并行使用 \(1\times1\) 卷积、多个不同 atrous rate 的 \(3\times3\) 卷积和 image-level pooling 来捕获多尺度上下文
- **新增轻量 decoder**：先把 encoder 输出上采样 4 倍，再与 backbone 的低层特征拼接，最后用卷积细化并上采样回原图尺度
- **低层通道压缩**：对 Conv2 等浅层特征先做 \(1\times1\) 卷积降到较少通道，避免浅层纹理压过 encoder 的 256 通道语义特征
- **可调 output stride**：通过空洞卷积把 backbone 输出步幅控制在 16 或 8，在精度、显存和速度之间做取舍
- **atrous separable convolution**：将深度可分离卷积用于 ASPP 与 decoder，降低计算量并提升 Xception backbone 下的分割表现
- **无 DenseCRF 后处理**：论文在 PASCAL VOC 2012 和 Cityscapes 上直接输出结果，报告测试 mIoU 分别达到 89.0% 和 82.1%
- **对遥感分割的意义**：遥感地物尺度差异大、边界细而复杂，ASPP 的多尺度感受野与 decoder 的边界恢复正好对应道路、建筑、水体和地貌单元的常见难点

#### 🔬 深入细节

##### 图示与整体架构

![DeepLabv3+ 编码器-解码器结构](https://ar5iv.labs.arxiv.org/html/1802.02611/assets/x4.png)
*图：DeepLabv3+ 以 ASPP 作为 encoder，在 decoder 中融合低层特征并逐步恢复空间细节。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1802.02611，论文页见 https://arxiv.org/abs/1802.02611。*

##### 算法伪代码

```python
# DeepLabv3+ semantic segmentation 伪代码
def deeplabv3plus(image, backbone, aspp, classifier):
    # 1. Backbone 用 output_stride 控制最终特征分辨率，保留一个浅层特征用于边界恢复
    low_level, high_level = backbone(image, output_stride=16)

    # 2. Encoder: ASPP 在 high_level 上并行采样多尺度上下文
    context = aspp([
        conv1x1(high_level),
        atrous_conv3x3(high_level, rate=6),
        atrous_conv3x3(high_level, rate=12),
        atrous_conv3x3(high_level, rate=18),
        image_pooling(high_level),
    ])

    # 3. Decoder: 先把语义特征放大到浅层特征尺度
    context = bilinear_upsample(context, scale=4)
    low_level = conv1x1(low_level, out_channels=48)
    fused = concat([context, low_level], axis="channels")

    # 4. 两个 3x3 卷积细化边界，再恢复到输入分辨率
    fused = separable_conv3x3(fused, out_channels=256)
    fused = separable_conv3x3(fused, out_channels=256)
    logits = classifier(bilinear_upsample(fused, scale=4))
    return softmax(logits)
```

##### 为什么只靠 DeepLabv3 不够

DeepLabv3 的强项是上下文。它通过 ASPP 在最后一层语义特征上并行使用不同采样间隔的空洞卷积，让同一个像素位置可以同时看到近邻纹理和更大范围的语义区域。对遥感图像来说，这相当于同时观察局部边缘、街区尺度和地貌尺度，能缓解建筑、道路、农田、水体在尺寸上跨度很大的问题。

但 DeepLabv3 通常直接把低分辨率 logits 双线性上采样到原图。即使高层语义判断正确，物体轮廓也容易被 output stride 抹平：细道路会断裂，建筑边界会糊成块，河岸或滑坡边界会偏移。DeepLabv3+ 的 decoder 正是为这个问题设计的，它不试图构造复杂的逐级 U-Net，而是只取一层浅层细节，与 ASPP 输出融合后做少量卷积。

##### 空洞卷积与 ASPP

二维空洞卷积可写成：

$$
y[i]=\sum_{k} x[i+r\cdot k]\,w[k]
$$

其中 \(r\) 是 atrous rate。\(r=1\) 时退化为普通卷积；\(r>1\) 时卷积核权重之间插入空洞，参数量不变但有效感受野扩大。ASPP 把多个 rate 的响应拼接：

$$
z=\operatorname{Conv}_{1\times1}\left(
\operatorname{Concat}\left[
f_{1\times1}(x),
f_{3\times3}^{r_1}(x),
f_{3\times3}^{r_2}(x),
f_{3\times3}^{r_3}(x),
f_{\text{image-pool}}(x)
\right]\right)
$$

直觉上，小 rate 更关注局部结构，大 rate 捕获更宽的上下文，image-level pooling 注入全局场景先验。对于遥感分割，某个像素是否属于道路或河道，经常不仅取决于像素颜色，还取决于它是否处在连续线状结构、城市纹理或地形背景中。

##### Decoder 为什么要压缩低层特征

论文的 decoder 做法很克制：encoder 输出先上采样 4 倍；浅层特征先过 \(1\times1\) 卷积降通道；二者拼接后接几个 \(3\times3\) 卷积，最后再上采样 4 倍。低层特征包含边缘、纹理和局部几何，但语义弱、通道多。如果直接拼接，模型容易过度依赖浅层纹理，导致同色屋顶、裸地、道路和河滩混淆。

通道压缩可以理解为给浅层信息加一个“瓶颈”：它只提供必要的定位线索，而不主导语义判断。最终 logits 由高层 ASPP 的类别语义和低层边界位置共同决定：

$$
\hat{Y}
=\operatorname{Upsample}_{4}\left(
g_{3\times3}\left(
\operatorname{Concat}\left[
\operatorname{Upsample}_{4}(z_{\text{ASPP}}),
\operatorname{Conv}_{1\times1}(x_{\text{low}})
\right]\right)\right)
$$

##### Atrous separable convolution

标准卷积把空间卷积和通道混合一起做。深度可分离卷积先对每个通道独立做空间卷积，再用 \(1\times1\) pointwise convolution 混合通道：

$$
\operatorname{SepConv}(x)
=\operatorname{Pointwise}_{1\times1}
\left(\operatorname{Depthwise}_{k\times k}(x)\right)
$$

DeepLabv3+ 进一步把 atrous convolution 放进 depthwise 阶段，得到 atrous separable convolution。这样 ASPP 的大感受野仍然保留，但计算量明显低于同等通道数的普通空洞卷积。论文还把 Xception 改成更适合 dense prediction 的 backbone：增加层数、用 depthwise separable convolution 替换更多卷积，并在最后几层配合 output stride 使用空洞卷积。

##### 训练目标和推理流程

DeepLabv3+ 的训练目标是像素级语义分类交叉熵。设类别数为 \(C\)，像素集合为 \(\Omega\)，真实标签 one-hot 为 \(y_{i,c}\)，模型输出概率为 \(p_{i,c}\)，则：

$$
\mathcal{L}_{\text{CE}}
=-\sum_{i\in\Omega}\sum_{c=1}^{C} y_{i,c}\log p_{i,c}
$$

推理时可以根据预算选择 eval output stride。较小的 output stride 让 encoder 特征更密，边界和小目标更好，但显存和 Multiply-Adds 增加；较大的 output stride 更快，但 decoder 需要从更粗的特征恢复细节。论文的关键结论是：ASPP 负责“看多大范围”，decoder 负责“把边界放准”，二者组合比单独依赖金字塔池化或普通 encoder-decoder 更稳。

> 💡 关键：DeepLabv3+ 不是把 U-Net 和 DeepLab 简单相加，而是用 ASPP 提供多尺度语义，用一个很浅的 decoder 注入边界坐标信息，因此兼顾上下文和定位。

#### 🧪 练习题

```yaml
question: "DeepLabv3+ 相比 DeepLabv3 的核心改动是什么？"
options:
  - "完全取消 ASPP，只保留普通 U-Net 跳连"
  - "在 DeepLabv3 的 ASPP 编码器后加入轻量 decoder，并融合低层特征恢复边界"
  - "把所有卷积替换为全连接层，直接分类整幅图像"
  - "只依赖 DenseCRF 后处理来提升边界质量"
answer: 1
explain: "DeepLabv3+ 保留 ASPP 的多尺度上下文建模，同时增加 decoder 融合浅层细节，主要改善上采样后物体边界粗糙的问题。"
```
