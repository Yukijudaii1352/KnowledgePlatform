### FCN

```yaml
id: fcn
name: FCN
full_name: "全卷积网络 (Fully Convolutional Networks)"
year: "2015"
org: "UC Berkeley"
paper_url: "https://arxiv.org/abs/1411.4038"
category: "foundation"
parent: "—"
motivation: "全卷积化实现端到端像素预测"
```

#### 📝 一句话总结

FCN 将分类 CNN 的全连接层卷积化，并用可学习上采样和跳连融合实现端到端像素预测，奠定了现代语义分割“全卷积编码器-解码器”的基础。

#### 🎯 核心要点

- Fully convolutional：把 AlexNet、VGG、GoogLeNet 等分类网络转成可接受任意尺寸输入、输出空间 score map 的网络。
- Dense prediction：用逐像素 softmax loss 直接训练语义分割，而不是 patch 分类或滑窗后处理。
- Transposed convolution：使用可学习反卷积/上采样层把粗预测恢复到输入分辨率。
- Skip architecture：FCN-32s、FCN-16s、FCN-8s 逐步融合深层语义与浅层细节。
- Transfer learning：从 ImageNet 分类模型初始化，再微调到分割任务。
- 代表数据集：PASCAL VOC、NYUDv2、SIFT Flow。
- 影响：后续 U-Net、SegNet、DeepLab、PSPNet 等都继承了全卷积像素预测范式。

#### 🔬 深入细节

![FCN 密集预测示意](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x1.png)
*图：FCN 将普通分类网络改造为整图输入、整图输出的像素级预测网络。*

##### 算法伪代码

```python
def fcn_8s(image):
    pool3, pool4, conv7 = vgg_fully_convolutional(image)

    score32 = conv1x1(conv7, num_classes)
    up32 = deconv(score32, stride=2)

    score16 = up32 + conv1x1(pool4, num_classes)
    up16 = deconv(score16, stride=2)

    score8 = up16 + conv1x1(pool3, num_classes)
    logits = deconv(score8, stride=8)

    return softmax(logits)
```

##### 方法解读

FCN 之前，很多分割系统把 CNN 当作局部 patch 分类器：对每个像素附近裁剪 patch，分类后再拼回整图。这既慢又浪费，因为相邻 patch 重叠巨大。FCN 的关键是把分类网络改成一次前向就输出二维 score map。

全连接层可以视为覆盖整个输入特征图的卷积层。例如 VGG 的 `fc6/fc7` 可改成 \(7\times7\) 与 \(1\times1\) 卷积。这样网络不再要求固定输入尺寸，输出空间尺寸随输入变化：

$$
S=f_{\theta}(I)\in\mathbb{R}^{H'\times W'\times C}
$$

粗 score map 需要上采样回原图。FCN 使用反卷积层，其实是可学习的双线性上采样泛化：

$$
\hat{Y}=\operatorname{Deconv}(S)
$$

只用最深层预测得到 FCN-32s，语义强但边界粗。FCN-16s 把上采样后的深层 score 与 pool4 的浅层 score 相加；FCN-8s 再融合 pool3，使细节更好：

$$
S_{16}=\operatorname{Up}_2(S_{32})+S_{pool4},\quad
S_{8}=\operatorname{Up}_2(S_{16})+S_{pool3}
$$

训练目标是逐像素交叉熵：

$$
\mathcal{L}=-\sum_{p}\log P(y_p\mid I;\theta)
$$

FCN 与后续分割网络的差别在于它没有复杂上下文模块、空洞卷积或注意力；它证明了“分类骨干 + 全卷积输出 + 上采样 + 跳连”这条路线可行。之后的改进基本都在扩大感受野、保留分辨率、增强上下文或改善解码边界。

> 💡 关键：FCN 的历史意义是把语义分割从手工后处理和 patch 分类推进到端到端密集预测。

#### 🧪 练习题

```yaml
question: "FCN 中 skip architecture 的主要作用是什么？"
options:
  - "减少类别数量"
  - "融合深层语义信息与浅层空间细节以改善边界"
  - "把输入图像转换成文本"
  - "替代逐像素损失函数"
answer: 1
explain: "深层特征语义强但分辨率低，浅层特征空间细节多；跳连融合可让预测更精细。"
```
