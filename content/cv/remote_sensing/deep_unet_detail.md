### Deep U-Net

```yaml
id: deep_unet
name: Deep U-Net
full_name: 深度U-Net (Deep U-Net for Remote Sensing)
year: '2018'
org: Various Institutions
paper_url: https://arxiv.org/abs/1505.04597
category: semantic_segmentation
parent: fcn_rs
motivation: 增强U-Net深度保留浅层空间细节
```

#### 📝 一句话总结

U-Net 提出了对称的编码器-解码器架构，通过跳跃连接（skip connection）将浅层高分辨率特征与深层语义特征融合，在极少标注样本下实现精确的像素级分割，其深度变体（Deep U-Net）通过增加网络深度进一步提升遥感场景中的空间细节保留能力。

#### 🎯 核心要点

- 对称编码器-解码器架构：收缩路径（contracting path）逐步提取语义特征，扩展路径（expansive path）逐步恢复空间分辨率
- 跳跃连接（Skip Connection）：将编码器各层级特征图裁剪后与解码器对应层级拼接（concatenation），保留浅层空间细节
- 全卷积设计：无全连接层，支持任意尺寸输入，23 层卷积
- Overlap-tile 策略：通过镜像填充实现大图像的无缝分割推理
- 加权交叉熵损失：引入像素级权重图，强制网络学习相邻目标间的分离边界
- 弹性形变数据增强：模拟组织形变，极少样本下有效防止过拟合
- 深度扩展（Deep U-Net）：增加编码器/解码器卷积层数，增强特征表达能力，适配遥感影像中复杂地物的精细分割

#### 🔬 深入细节

##### 核心架构图

![U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1505.04597/assets/x1.png)
*图：U-Net 编码器-解码器对称架构。蓝色方块为多通道特征图，白色方块为跳跃连接复制的特征图，箭头表示不同操作（卷积、池化、上采样、拼接）。*

##### 算法伪代码

```python
# U-Net 前向传播伪代码
def unet_forward(input_image):
    # === 编码器（收缩路径）===
    enc_features = []
    x = input_image
    for level in range(4):  # 4次下采样
        x = conv3x3_relu(x)    # 两次 3×3 卷积 + ReLU
        x = conv3x3_relu(x)
        enc_features.append(x)  # 保存用于跳跃连接
        x = max_pool_2x2(x)     # 2×2 最大池化，分辨率减半

    # === 瓶颈层 ===
    x = conv3x3_relu(x)
    x = conv3x3_relu(x)

    # === 解码器（扩展路径）===
    for level in range(4):  # 4次上采样
        x = up_conv_2x2(x)                    # 2×2 转置卷积，分辨率加倍
        crop_feat = center_crop(enc_features[3 - level], x.shape)
        x = concatenate(crop_feat, x)          # 跳跃连接：拼接
        x = conv3x3_relu(x)
        x = conv3x3_relu(x)

    # === 输出层 ===
    output = conv1x1(x, num_classes)  # 1×1 卷积映射到类别数
    return softmax(output)
```

##### 动机与背景

传统全卷积网络（FCN）虽然实现了端到端的像素级分类，但在上采样恢复分辨率的过程中，深层特征丢失了大量空间细节信息。对于遥感影像中的精细地物（如道路边缘、建筑轮廓、小目标），这种信息损失导致分割边界模糊、小目标漏检。

U-Net 的核心动机是：**在保持深层语义信息的同时，通过跳跃连接将编码器中的高分辨率浅层特征直接传递到解码器**，从而实现精确定位。Deep U-Net 进一步增加网络深度，使编码器能够提取更丰富的多尺度特征，同时依靠加深的跳跃连接通道保留各层级的空间细节。

##### 核心机制详解

**1. 编码器-解码器对称设计**

编码器遵循经典卷积网络结构：每个层级包含两次 \(3 \times 3\) 无填充卷积（unpadded convolution）+ ReLU 激活，随后是 \(2 \times 2\) 最大池化（stride=2）进行下采样。每次下采样后特征通道数翻倍（64→128→256→512→1024）。

解码器与编码器严格对称：每个层级先通过 \(2 \times 2\) 转置卷积（up-convolution）将分辨率加倍并将通道数减半，然后与编码器对应层级的特征图拼接，再经过两次 \(3 \times 3\) 卷积 + ReLU。

> 💡 关键：对称设计确保解码器在每个分辨率层级都有足够的通道数来传播上下文信息，而非仅依赖最终的低分辨率特征。

**2. 跳跃连接（Skip Connection）**

跳跃连接是 U-Net 区别于 FCN 的核心创新。编码器第 \(i\) 层的特征图被裁剪（center crop）后与解码器第 \(i\) 层的上采样结果在通道维度拼接：

$$
\mathbf{F}_{\text{dec}}^{(i)} = \text{Conv}\left( \text{Concat}\left( \text{Crop}(\mathbf{F}_{\text{enc}}^{(i)}),\ \text{UpConv}(\mathbf{F}_{\text{dec}}^{(i+1)}) \right) \right)
$$

裁剪操作是因为使用了无填充卷积（valid convolution），每次卷积后特征图尺寸略有缩小。这种拼接方式（而非 FCN 中的逐元素相加）保留了更完整的空间信息。

**3. 加权损失函数**

为解决类别不平衡和相邻目标粘连问题，U-Net 引入像素级权重图：

$$
w(\mathbf{x}) = w_c(\mathbf{x}) + w_0 \cdot \exp\left( -\frac{(d_1(\mathbf{x}) + d_2(\mathbf{x}))^2}{2\sigma^2} \right)
$$

其中 \(w_c(\mathbf{x})\) 平衡类别频率，\(d_1, d_2\) 分别为像素到最近和次近目标边界的距离，\(w_0=10, \sigma \approx 5\) 像素。该权重使相邻目标间的背景像素获得极高权重，迫使网络学习清晰的分离边界。

> ⚠️ 注意：在遥感场景中，该权重机制可类比用于密集建筑群的边界分离或相邻地块的精确划分。

**4. 弹性形变数据增强**

U-Net 使用随机弹性形变（elastic deformation）作为核心数据增强手段。在 \(3 \times 3\) 网格上生成随机位移场，经高斯平滑后应用于图像和标注，模拟真实组织/地物的非刚性变化。这使得仅用 30 张标注图像即可训练出高性能模型。

**5. Deep U-Net 对遥感的适配**

Deep U-Net 在原始 U-Net 基础上：
- 增加编码器深度（更多卷积层或引入残差块），扩大感受野以捕获遥感影像中的大尺度上下文
- 保持多层级跳跃连接，确保浅层空间细节（道路纹理、建筑边角）不因深度增加而丢失
- 适配遥感多光谱输入（多通道输入替代 RGB）

##### 与传统方法的区别

| 特性 | FCN | U-Net / Deep U-Net |
|------|-----|---------------------|
| 特征融合方式 | 逐元素相加 | 通道拼接（信息更丰富） |
| 解码器设计 | 简单双线性上采样 | 对称扩展路径+转置卷积 |
| 空间细节保留 | 有限（仅最后几层融合） | 多层级全面融合 |
| 小样本适应 | 需大量数据 | 弹性增强+权重图，极少样本可训练 |
| 边界精度 | 模糊 | 加权损失强化边界 |

#### 🧪 练习题

```yaml
question: "U-Net 跳跃连接的特征融合方式与 FCN 的主要区别是什么？"
options:
  - "U-Net 使用逐元素相加，FCN 使用拼接"
  - "U-Net 使用通道拼接（concatenation），FCN 使用逐元素相加（addition）"
  - "U-Net 仅融合最深层特征，FCN 融合所有层"
  - "两者完全相同，都使用逐元素相加"
answer: 1
explain: "U-Net 将编码器特征图与解码器特征图在通道维度拼接，保留更完整的空间信息；而 FCN 采用逐元素相加的方式融合多尺度特征。"
```