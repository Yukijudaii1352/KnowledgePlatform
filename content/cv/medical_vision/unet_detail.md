### U-Net: Convolutional Networks for Biomedical Image Segmentation

```yaml
id: unet
name: "U-Net"
year: 2015
organization: "弗莱堡大学计算机科学系"
paper_url: "https://arxiv.org/abs/1505.04597"
category: foundation
parent: "—"
motivation: "U型对称结构与跳跃连接开创医学分割深度学习范式"
```

---

#### 📝 一句话总结

U-Net 提出了一种对称的编码器-解码器全卷积网络，通过跳跃连接将浅层高分辨率特征与深层语义特征融合，配合重叠切片策略和弹性形变数据增强，在极少标注样本下实现了精确的生物医学图像分割。

---

#### 🎯 核心要点

- U型对称架构：收缩路径（编码器）逐层提取语义 + 扩展路径（解码器）逐层恢复分辨率，共23层卷积
- 跳跃连接（Skip Connections）：将编码器高分辨率特征裁剪后与解码器拼接（crop+concat），兼顾上下文与定位
- 重叠切片策略（Overlap-Tile）：通过镜像填充和重叠patch实现任意大图像的无缝分割
- 加权损失函数：预计算权重图 \(w(\mathbf{x}) = w_c(\mathbf{x}) + w_0 \cdot \exp(-(d_1+d_2)^2/2\sigma^2)\)，强制学习相邻细胞间的分离边界
- 弹性形变数据增强：在3×3网格上随机位移+双三次插值，模拟组织真实形变，极大扩充训练多样性
- 训练策略：SGD + 高动量(0.99)、batch size=1、He初始化，NVidia Titan GPU训练仅需10小时
- 结果：ISBI 2012 EM分割 warping error 0.000353（第一名）；ISBI 2015 细胞追踪 PhC-U373 IOU 92%、DIC-HeLa IOU 77.5%（均第一）

---

#### 🔬 深入细节

##### 核心架构图

![U-Net 架构图](https://lmb.informatik.uni-freiburg.de/people/ronneber/u-net/u-net-architecture.png)
*图：U-Net 网络架构。左侧为收缩路径（编码器），右侧为扩展路径（解码器），灰色箭头为跳跃连接（copy and crop）。蓝色方块表示多通道特征图，白色方块表示复制的特征图。*

##### 算法伪代码

```python
# U-Net 前向传播与训练伪代码
class UNet:
    def __init__(self):
        # Encoder (contracting path)
        self.enc1 = DoubleConv(1, 64)       # 572→568→564
        self.enc2 = DoubleConv(64, 128)     # 280→276→272
        self.enc3 = DoubleConv(128, 256)    # 136→132→128
        self.enc4 = DoubleConv(256, 512)    # 64→60→56
        self.bottleneck = DoubleConv(512, 1024)  # 28→24→20

        # Decoder (expansive path)
        self.up4 = UpBlock(1024, 512)
        self.up3 = UpBlock(512, 256)
        self.up2 = UpBlock(256, 128)
        self.up1 = UpBlock(128, 64)
        self.final = Conv1x1(64, n_classes)

    def forward(self, x):
        # Encoder: extract multi-scale features
        e1 = self.enc1(x)
        e2 = self.enc2(max_pool_2x2(e1))
        e3 = self.enc3(max_pool_2x2(e2))
        e4 = self.enc4(max_pool_2x2(e3))
        b  = self.bottleneck(max_pool_2x2(e4))

        # Decoder: upsample + skip connection (crop & concat)
        d4 = self.up4(b, center_crop(e4))
        d3 = self.up3(d4, center_crop(e3))
        d2 = self.up2(d3, center_crop(e2))
        d1 = self.up1(d2, center_crop(e1))

        return self.final(d1)  # 1×1 conv → pixel-wise classification

# 训练循环
for each image, label in training_set:
    patch = extract_overlap_tile_patch(image)  # 572×572
    weight_map = compute_weight_map(label)
    pred = unet.forward(patch)
    loss = weighted_pixel_cross_entropy(pred, label, weight_map)
    sgd_update(loss, momentum=0.99)
```

##### 动机与背景

生物医学图像分割面临两大核心挑战：**(1)** 标注数据极度稀缺（通常仅数十张带标注图像）；**(2)** 需要像素级精确定位，尤其是相邻细胞的边界分离。

此前的主流方法是 Ciresan et al. 的滑动窗口方法——对每个像素取其周围patch送入分类网络。该方法有两个致命缺陷：
- **速度极慢**：相邻patch高度重叠导致大量冗余计算
- **上下文与定位的矛盾**：大patch提供上下文但定位模糊，小patch定位精确但缺乏语义

> 💡 关键：U-Net的核心洞察是——不需要在上下文和定位之间做取舍，通过跳跃连接可以**同时获得两者**。

##### 核心机制详解

**1. 收缩路径（Contracting Path / 编码器）**

遵循典型CNN结构，每个层级包含：
- 两个 3×3 卷积（valid，无padding）+ ReLU
- 一个 2×2 max pooling（stride=2）下采样
- 通道数翻倍：64 → 128 → 256 → 512 → 1024

每次下采样使空间分辨率减半，感受野倍增，逐步从局部纹理到全局语义。

**2. 扩展路径（Expansive Path / 解码器）**

对称地恢复分辨率：
- 2×2 上卷积（up-convolution / transposed convolution），通道数减半
- 与编码器对应层特征进行 **center crop + channel concatenation**
- 两个 3×3 卷积 + ReLU

**3. 跳跃连接的设计选择**

为什么用 **拼接（concat）** 而非 **相加（add）**？

拼接保留了编码器和解码器特征的完整独立信息，通道数翻倍后由后续卷积自主学习融合策略。相加则隐式假设两组特征在同一表示空间中对齐，约束更强、信息损失更大。

裁剪（crop）是因为 valid convolution 导致每层特征图尺寸缩小，编码器特征图比解码器对应层更大，需要中心裁剪对齐。

**4. 重叠切片策略（Overlap-Tile）**

对于超出GPU显存的大图像：

$$\text{overlap} = \frac{\text{input\_size} - \text{output\_size}}{2} = \frac{572 - 388}{2} = 92 \text{ pixels}$$

- 相邻patch重叠92像素，仅取中心388×388区域作为有效输出
- 图像边界使用镜像填充（mirror padding）补充上下文
- 拼接后实现完整图像的无缝分割

**5. 加权损失函数**

$$w(\mathbf{x}) = w_c(\mathbf{x}) + w_0 \cdot \exp\left(-\frac{(d_1(\mathbf{x}) + d_2(\mathbf{x}))^2}{2\sigma^2}\right)$$

- \(w_c(\mathbf{x})\)：类别频率平衡权重，补偿前景/背景不均衡
- \(d_1(\mathbf{x})\)：像素到最近细胞边界的距离
- \(d_2(\mathbf{x})\)：像素到第二近细胞边界的距离
- \(w_0 = 10\)，\(\sigma \approx 5\) 像素

> ⚠️ 注意：使用 \(d_1 + d_2\) 而非仅 \(d_1\) 的关键在于——只有当像素同时靠近**两个不同细胞**时（即位于细胞间隙），\(d_1+d_2\) 才会很小，权重才会很高。这精确地将学习压力聚焦在最难分割的接触区域。

**6. 弹性形变数据增强**

这是论文最重要的实践创新之一：
- 在粗糙的 3×3 网格点上采样随机位移向量（标准差 σ=10 像素）
- 通过双三次插值（bicubic interpolation）生成逐像素的平滑位移场
- 对图像和标注同时施加相同形变

该方法模拟了生物组织的真实弹性变形，使网络对形态变异具有不变性，在仅有~30张训练图像时效果尤为显著。

##### 训练细节与设计决策

| 超参数 | 值 | 设计理由 |
|--------|-----|----------|
| Batch size | 1 | 使用大patch(572×572)充分利用GPU显存 |
| Momentum | 0.99 | 高动量补偿batch size=1的梯度噪声 |
| 权重初始化 | He: \(\mathcal{N}(0, \sqrt{2/N})\) | 适配ReLU激活，防止梯度消失 |
| 无padding | Valid conv | 避免边界伪影，每个输出像素有完整上下文 |
| 最终层 | 1×1卷积 | 将64维特征映射到类别数，参数高效 |

##### 实验结果

| 数据集 | 指标 | U-Net | 次优方法 |
|--------|------|-------|----------|
| ISBI 2012 EM Segmentation | Warping Error ↓ | **0.000353** | 0.000420 |
| ISBI 2012 EM Segmentation | Rand Error ↓ | **0.0382** | 0.0611 |
| ISBI 2015 Cell Tracking (PhC-U373) | IOU ↑ | **92%** | 83% |
| ISBI 2015 Cell Tracking (DIC-HeLa) | IOU ↑ | **77.5%** | 46% |

分割速度：512×512 图像不到1秒（NVidia Titan GPU）。

##### 与前序工作的对比

| 方面 | 滑动窗口(Ciresan 2012) | FCN(Long 2015) | U-Net |
|------|------------------------|----------------|-------|
| 推理方式 | 逐像素patch分类 | 全图全卷积 | 全图全卷积 |
| 速度 | 极慢（冗余计算） | 快 | 快 |
| 多尺度融合 | 无 | 相加（sum） | 拼接（concat） |
| 解码器 | 无 | 简单上采样 | 对称扩展路径 |
| 小样本适应 | 差 | 一般 | 优（弹性形变） |
| 边界处理 | 无 | 无 | 加权损失 |

---

#### 🧪 练习题

```yaml
question: "U-Net 权重图公式中同时使用 d1 和 d2（到最近和次近细胞边界的距离）的主要目的是什么？"
options:
  - "增大所有边界像素的损失权重，提升整体边界精度"
  - "仅对两个细胞之间的狭窄间隙赋予高权重，强制学习细胞分离"
  - "平衡前景与背景的类别不均衡问题"
  - "减少距离计算的复杂度，用两个距离近似形态学操作"
answer: 1
explain: "d1+d2 仅在像素同时靠近两个不同细胞时才很小（即位于细胞间隙），此时指数项接近 w0=10，赋予极高权重。单个细胞边界处 d2 很大，权重不会显著增加。这精确地将学习压力聚焦在相邻细胞的接触/分离区域。"
```