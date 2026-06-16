### U-Net

```yaml
id: unet
name: U-Net
full_name: U型网络 (U-Net)
year: '2015'
org: University of Freiburg
paper_url: https://arxiv.org/abs/1505.04597
category: rs_analysis
parent: —
motivation: 编码器-解码器语义分割架构
```

#### 📝 一句话总结

U-Net 提出了带跳跃连接的对称编码器-解码器全卷积网络，用下采样路径捕获上下文、上采样路径恢复定位细节，解决了少量标注图像下像素级语义分割难以兼顾全局语义和边界精度的问题。

#### 🎯 核心要点

- **U 形全卷积架构**：左侧 contracting path 提取多尺度上下文，右侧 expansive path 逐级上采样恢复空间分辨率
- **skip connection / copy-and-crop**：把编码端高分辨率特征裁剪后拼接到对应解码层，弥补 pooling 丢失的精细定位信息
- **无全连接层**：网络完全由卷积、池化、上采样和 \(1\times1\) 卷积构成，可对任意大图像做密集预测
- **valid convolution 设计**：原论文使用未 padding 的 \(3\times3\) 卷积，输出分割图小于输入图，只预测有完整上下文的像素
- **overlap-tile 推理**：通过镜像扩展边界并重叠切块，实现大图像无缝分割，避免 GPU 显存限制
- **少样本数据增强**：用随机弹性形变、平移、旋转和灰度变化扩充训练数据，尤其适合医学图像和遥感标注稀缺场景
- **加权交叉熵**：为类别频率和相邻实例之间的分割边界赋予更大权重，提升 touching objects 的分离能力
- **23 个卷积层**：每级 encoder 两个 \(3\times3\) conv+ReLU 后接 \(2\times2\) max pooling；decoder 每级 up-conv 后拼接对应 encoder 特征
- **遥感影响深远**：虽然原论文面向生物医学分割，U-Net 后来成为土地覆盖、道路提取、建筑物轮廓、水体/云检测等遥感分割任务的基础架构

#### 🔬 深入细节

##### 图示与可访问来源

![U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1505.04597/assets/x1.png)
*图：U-Net 原论文 Figure 1。蓝色框为 feature map，白色框为从编码端复制并裁剪后的 feature map，灰色箭头为 skip connection。论文页见 https://arxiv.org/abs/1505.04597；ar5iv HTML 图文页见 https://ar5iv.labs.arxiv.org/html/1505.04597。*

##### 方法背景：滑窗分割为什么不够

U-Net 出现前，像素级分割常用 sliding-window CNN：对每个待分类像素裁剪一个局部 patch，再输出该中心像素类别。这样做能把少量图像转化为大量 patch，但有两个根本问题。第一，重叠 patch 大量重复计算，推理很慢；第二，patch 大小时存在语义上下文和定位精度的矛盾，大 patch 需要更多 pooling 看到上下文却会损失精细边界，小 patch 定位好但看不到足够背景。

U-Net 把任务改成 dense prediction。整张图或大 tile 一次输入，网络一次输出整块像素类别图。左侧 encoder 负责逐步扩大感受野，右侧 decoder 负责把粗分辨率语义特征还原到像素分辨率；skip connection 把浅层边缘、纹理和边界位置直接传到 decoder，使模型不必只依赖 bottleneck 中的低分辨率表示来恢复轮廓。

##### Contracting path：用下采样捕获上下文

编码端每一级执行两个 \(3\times3\) 卷积和 ReLU，然后通过 \(2\times2\) max pooling 下采样：

$$
h_l = \operatorname{ReLU}(W_{l,2} * \operatorname{ReLU}(W_{l,1} * h_{l-1}))
$$

$$
h_{l+1}^{in}=\operatorname{MaxPool}_{2\times2}(h_l)
$$

每次下采样后通道数翻倍，例如 64、128、256、512、1024。空间尺寸变小、通道数变大，相当于逐步从局部边缘和纹理抽象到对象级或区域级上下文。对遥感图像来说，这一点对应从局部纹理识别到“道路网络、屋顶群、水体边缘、田块边界”等更大空间模式。

##### Expansive path 与 skip connection

解码端每一级先做 \(2\times2\) up-convolution，把空间尺寸扩大一倍、通道数减半，再与编码端同尺度特征拼接：

$$
g_l = \operatorname{UpConv}_{2\times2}(g_{l+1})
$$

$$
\tilde{g}_l = \operatorname{Concat}(g_l,\operatorname{Crop}(h_l))
$$

$$
g_l' = \operatorname{ReLU}(V_{l,2} * \operatorname{ReLU}(V_{l,1} * \tilde{g}_l))
$$

原论文使用 valid convolution，因此每次 \(3\times3\) 卷积都会让 feature map 边界缩小，编码端 feature map 需要 crop 后才能与解码端 feature map 对齐。现代实现常用 padding 保持尺寸不变，但核心思想没有变：decoder 的粗语义输出必须结合 encoder 的高分辨率定位信息。

> 💡 关键：U-Net 的 skip connection 不是 ResNet 那种相加残差，而是 encoder 到 decoder 的通道拼接。它让网络同时拥有“深层上下文”和“浅层位置细节”，这是分割边界清晰的主要原因。

##### 输出层与像素级 softmax

最后一层用 \(1\times1\) 卷积把每个像素位置的 64 维特征向量映射到 \(K\) 个类别 logit：

$$
z_k(x)=w_k^\top g(x)+b_k
$$

像素 \(x\) 处类别 \(k\) 的 softmax 概率为：

$$
p_k(x)=\frac{\exp(z_k(x))}{\sum_{k'=1}^{K}\exp(z_{k'}(x))}
$$

普通像素级交叉熵为：

$$
\mathcal{L}_{CE}
=
-
\sum_{x\in\Omega}
\log p_{\ell(x)}(x)
$$

其中 \(\ell(x)\) 是 ground-truth 类别。U-Net 原论文在此基础上加入空间权重 \(w(x)\)，得到加权交叉熵：

$$
\mathcal{L}
=
-
\sum_{x\in\Omega}
w(x)\log p_{\ell(x)}(x)
$$

##### 边界加权：让模型学会分开相邻实例

医学细胞分割和遥感建筑/树冠/作物田块分割都有一个共同难点：相邻目标之间可能只有很窄的背景缝隙。普通交叉熵会被大面积背景或主体区域主导，模型容易把两个贴近实例连成一片。

U-Net 设计了一个预计算权重图：

$$
w(x)=w_c(x)+w_0
\exp\left(
-
\frac{(d_1(x)+d_2(x))^2}{2\sigma^2}
\right)
$$

\(w_c(x)\) 用于平衡类别频率；\(d_1(x)\) 是像素到最近目标边界的距离，\(d_2(x)\) 是到第二近目标边界的距离。若一个像素位于两个目标之间的狭窄边界，\(d_1+d_2\) 很小，指数项变大，训练时这个像素的错误会被更重惩罚。原论文设置 \(w_0=10\)、\(\sigma\approx5\) 像素，用于强化 touching cells 之间的分离边界。

对遥感场景，这个机制可以迁移到密集建筑物、农田地块、道路交叉口或河网边界：让模型不要只追求总体像素精度，而要把目标边界和类别交界处作为高价值区域学习。

##### Overlap-tile 推理与镜像边界

由于原论文使用 valid convolution，输入 \(572\times572\) tile 会输出较小的 \(388\times388\) 分割区域。U-Net 只预测“有完整上下文”的中心区域，边缘像素需要从相邻 tile 或镜像扩展中获得上下文。

overlap-tile 策略可描述为：

1. 对大图像按输出区域大小切成重叠 tile
2. 对每个 tile 的输入边界做 mirror padding，补足卷积所需上下文
3. 只保留网络输出中心区域
4. 把所有中心区域拼接成完整分割图

这在遥感大图中尤其重要。卫星影像常远大于 GPU 可处理尺寸，直接缩放会丢失细节，直接切块又容易在 tile 边缘产生断裂；overlap-tile 用冗余上下文换取无缝预测。

##### 伪代码：U-Net forward 与训练

```python
# U-Net 核心逻辑：编码器-解码器 + skip concatenation
def conv_block(x, channels):
    x = conv3x3(x, channels)
    x = relu(x)
    x = conv3x3(x, channels)
    x = relu(x)
    return x


def unet_forward(image):
    skips = []
    x = image

    # contracting path
    for channels in [64, 128, 256, 512]:
        x = conv_block(x, channels)
        skips.append(x)
        x = max_pool2x2(x)

    # bottleneck
    x = conv_block(x, 1024)

    # expansive path
    for channels, skip in zip([512, 256, 128, 64], reversed(skips)):
        x = up_conv2x2(x, channels)
        skip = crop_to_match(skip, x)  # 原论文 valid conv 需要裁剪
        x = concat([x, skip], axis="channel")
        x = conv_block(x, channels)

    logits = conv1x1(x, num_classes)
    return softmax(logits, axis="class")


def train_step(image, mask, weight_map):
    prob = unet_forward(augment_with_elastic_deformation(image))
    loss = -sum_over_pixels(weight_map * log(prob[class_at(mask)]))
    return loss
```

##### 与 FCN、DeepLab 和遥感分割的关系

U-Net 建立在 fully convolutional network 思想上，但比早期 FCN 更强调 decoder 对称性和高通道数上采样路径。FCN 可以用粗预测加 skip 融合得到密集输出，U-Net 则把“编码-解码-同尺度拼接”做成清晰、可复用的结构模板，因此后来几乎成为小样本像素分割的默认起点。

DeepLab 系列后来用 atrous convolution 和 ASPP 扩展多尺度上下文，尤其适合大范围语义分割；U-Net 则在边界定位、小数据和医学/遥感实例相邻场景中更直接。许多遥感模型如 ResUNet、UNet++、Attention U-Net、Swin-UNet 和扩散式分割网络，本质上都保留了 U-Net 的多尺度 encoder-decoder 与 skip fusion 思路，只是替换 backbone、注意力模块或损失函数。

##### 局限性

原始 U-Net 使用 \(3\times3\) valid convolution 和较浅 CNN backbone，对超大遥感场景中的长程依赖、跨尺度类别混淆和多光谱/多时相输入并不天然最优。它也没有内置实例分离，若任务需要区分每栋建筑、每棵树或每个细胞，通常还要结合边界损失、距离变换、watershed、Mask R-CNN 风格 head 或后处理。

#### 🧪 练习题

```yaml
question: "U-Net 中 skip connection 的主要作用是什么？"
options:
  - "减少输入图像的通道数"
  - "把编码端高分辨率定位特征拼接到解码端，帮助恢复清晰边界"
  - "替代 softmax 损失函数"
  - "让网络只能处理固定大小图像"
answer: 1
explain: "U-Net 的跳跃连接把浅层高分辨率特征与深层语义特征融合，解决下采样造成的定位信息丢失，因此能在像素级分割中保留边界细节。"
```
