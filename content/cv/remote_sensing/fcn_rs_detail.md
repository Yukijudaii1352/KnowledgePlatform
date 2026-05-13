### FCN: Fully Convolutional Networks for Semantic Segmentation

```yaml
id: fcn_rs
name: FCN-RS
year: 2016
category: semantic_segmentation
paper_url: https://arxiv.org/abs/1411.4038
motivation: 全卷积网络引入遥感实现端到端分割
```

---

## 📝 一句话总结

FCN 将分类网络中的全连接层替换为卷积层，实现任意尺寸输入的端到端像素级语义分割，并通过跳跃连接（skip connection）融合多尺度特征以恢复空间细节。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 传统语义分割依赖手工特征或patch-wise分类，无法端到端训练且效率低 |
| **核心思想** | 将分类CNN的全连接层转为1×1卷积，使网络接受任意尺寸输入并输出对应空间尺寸的dense prediction |
| **关键创新** | ① FC→Conv转换 ② 可学习反卷积上采样 ③ Skip架构融合多层特征(FCN-32s/16s/8s) |
| **骨干网络** | VGG-16（FCN-VGG16性能最优，134M参数） |
| **损失函数** | 逐像素多项式交叉熵损失（pixel-wise multinomial logistic loss） |
| **主要结果** | PASCAL VOC 2012: 62.2% mIoU（当时SOTA）；推理速度 < 0.2s/image |
| **局限性** | 分辨率恢复有限（最细stride=8），对小目标和边界细节仍不够精细 |

---

## 🔬 深入细节

### 网络架构示意图

![FCN Skip Architecture](https://ar5iv.labs.arxiv.org/html/1411.4038/assets/x3.png)

> **图示说明**：FCN的DAG跳跃连接架构。实线为FCN-32s（直接32×上采样）；虚线为FCN-16s（融合pool4的stride-16预测）；点线为FCN-8s（进一步融合pool3的stride-8预测）。逐级融合使输出从粗糙逐步精细化。

---

### 方法详解

#### 1. 全连接层到卷积层的转换

传统分类网络（如VGG-16）的最后三层为全连接层（fc6, fc7, fc8），它们要求固定尺寸输入并输出一维向量。FCN的核心洞察是：**全连接层本质上是核大小等于输入特征图尺寸的卷积操作**。具体地，对于VGG-16：
- fc6（4096维）→ 7×7×512 → 4096 的卷积，等价于 7×7 conv with 4096 filters
- fc7（4096维）→ 1×1×4096 → 4096 的卷积
- fc8（1000类）→ 1×1×4096 → 1000 的卷积

转换后网络可接受任意尺寸 \(H \times W\) 的输入，输出 \(\lceil H/s \rceil \times \lceil W/s \rceil\) 的得分图（其中 \(s\) 为网络总步长）。这一转换使得原本需要对每个patch独立前向传播的密集预测，变为对整张图的单次高效计算。

#### 2. 反卷积上采样（Backwards Strided Convolution）

经过多次池化后，特征图分辨率大幅降低（VGG-16中降至原图的1/32）。为恢复到原始分辨率，FCN使用**转置卷积（transposed convolution / deconvolution）**进行可学习的上采样。

转置卷积的输出尺寸关系为：

$$o = s \cdot (i - 1) + k - 2p$$

其中 \(i\) 为输入尺寸，\(k\) 为卷积核大小，\(s\) 为步长，\(p\) 为填充。滤波器初始化为双线性插值权重，训练中允许学习调整。对于FCN-32s，使用单个stride=32的反卷积将粗糙预测直接上采样到原图尺寸。

#### 3. 跳跃连接与多尺度融合

直接32×上采样会丢失大量空间细节。FCN通过**跳跃连接（skip connections）**融合不同深度的特征层：

- **FCN-32s**：仅使用conv7（convolutionalized fc7）输出，32×上采样 → 59.4% mIoU
- **FCN-16s**：将conv7预测2×上采样后与pool4的1×1 conv预测逐元素相加，再16×上采样 → 62.4% mIoU（+3.0%）
- **FCN-8s**：将上述融合结果再2×上采样后与pool3的1×1 conv预测相加，再8×上采样 → 62.7% mIoU

融合时，新增的1×1卷积层（作用于pool4/pool3）零初始化，确保训练初期网络行为与未融合版本一致，学习率降低100倍以稳定微调。

#### 4. 训练策略

网络使用逐像素损失进行端到端训练：

$$\ell(\mathbf{x}; \theta) = \sum_{i,j} \ell'(x_{ij}; \theta)$$

其中 \(\ell'\) 为每个像素位置的多项式logistic loss。训练采用SGD（momentum=0.9, weight decay=5×10⁻⁴），全图训练（非patch采样），batch size=20。实验表明全图训练与patch采样收敛速度相当，但wall-clock时间更优。数据增强（翻转、平移）未带来显著提升。

---

### 伪代码

```python
# FCN-8s 前向传播伪代码
def FCN_8s_forward(image):
    # ===== Encoder: VGG-16 卷积部分 =====
    x = vgg_conv_block1(image)     # stride 1 → stride 2 (pool1)
    x = vgg_conv_block2(x)         # stride 2 → stride 4 (pool2)
    pool3 = vgg_conv_block3(x)     # stride 4 → stride 8 (pool3)
    pool4 = vgg_conv_block4(pool3) # stride 8 → stride 16 (pool4)
    x = vgg_conv_block5(pool4)     # stride 16 → stride 32 (pool5)
    
    # ===== FC层转为卷积 =====
    x = conv2d(x, 7, 7, 4096, relu=True)   # fc6 → conv6
    x = dropout(x)
    x = conv2d(x, 1, 1, 4096, relu=True)   # fc7 → conv7
    x = dropout(x)
    score_conv7 = conv2d(x, 1, 1, num_classes)  # 类别得分, stride 32
    
    # ===== Skip融合 =====
    # Step 1: conv7预测 2x上采样 + pool4预测
    upscore2 = deconv2d(score_conv7, stride=2)  # stride 32 → 16
    score_pool4 = conv2d(pool4, 1, 1, num_classes)  # 1x1 conv
    fuse_pool4 = upscore2 + score_pool4  # 逐元素相加
    
    # Step 2: 融合结果 2x上采样 + pool3预测
    upscore_pool4 = deconv2d(fuse_pool4, stride=2)  # stride 16 → 8
    score_pool3 = conv2d(pool3, 1, 1, num_classes)
    fuse_pool3 = upscore_pool4 + score_pool3
    
    # Step 3: 最终 8x上采样恢复原始分辨率
    output = deconv2d(fuse_pool3, stride=8)  # stride 8 → 1
    
    return output  # shape: [B, num_classes, H, W]

# 训练
loss = pixel_wise_cross_entropy(output, ground_truth_mask)
loss.backward()
optimizer.step()  # SGD, lr=1e-4, momentum=0.9
```

---

### 关键实验结果

| 模型 | Pixel Acc. | Mean Acc. | Mean IU | f.w. IU |
|------|-----------|-----------|---------|---------|
| FCN-32s-fixed | 83.0 | 59.7 | 45.4 | 72.0 |
| FCN-32s | 89.1 | 73.3 | 59.4 | 81.4 |
| FCN-16s | 90.0 | 75.7 | 62.4 | 83.0 |
| FCN-8s | 90.3 | 75.9 | 62.7 | 83.2 |

---

## 🧪 练习题

```yaml
questions:
  - question: "FCN中将全连接层转换为卷积层的核心意义是什么？"
    type: single_choice
    options:
      - "A. 减少模型参数量"
      - "B. 使网络能接受任意尺寸输入并输出空间维度的密集预测"
      - "C. 提高分类精度"
      - "D. 加速反向传播"
    answer: "B"
    explanation: "FC层要求固定尺寸输入并输出一维向量，转为等价卷积后网络可处理任意尺寸输入，输出保留空间维度的dense prediction map，这是实现端到端语义分割的关键。"

  - question: "FCN-16s相比FCN-32s，主要改进在于？"
    type: single_choice
    options:
      - "A. 使用了更深的骨干网络"
      - "B. 融合了pool4层的特征以获得更精细的空间信息"
      - "C. 使用了更大的训练数据集"
      - "D. 采用了更小的学习率"
    answer: "B"
    explanation: "FCN-16s通过跳跃连接将conv7的粗糙预测（stride 32）与pool4层的细粒度特征（stride 16）融合，使mIoU从59.4%提升到62.4%，显著改善了空间细节。"

  - question: "在FCN的skip架构中，融合pool4预测时新增的1×1卷积层如何初始化？为什么？"
    type: short_answer
    answer: "零初始化。这样在训练初期，融合分支的贡献为零，网络行为等价于未融合的FCN-32s，避免随机初始化破坏已学习的粗糙预测，确保训练稳定性。"

  - question: "FCN使用的上采样方法（转置卷积）与简单的双线性插值相比有什么优势？"
    type: short_answer
    answer: "转置卷积的滤波器参数可学习（虽然初始化为双线性插值权重），网络可以通过端到端训练学习到比固定双线性插值更优的上采样策略，自适应地恢复不同类别的空间细节。"

  - question: "论文实验表明，全图训练（whole image training）相比patch-wise训练的优势是什么？"
    type: single_choice
    options:
      - "A. 收敛更快（按迭代次数）"
      - "B. 最终精度更高"
      - "C. wall-clock时间更短，收敛速度相当"
      - "D. 不需要数据增强"
    answer: "C"
    explanation: "实验表明两者按迭代次数的收敛速度相当，但全图训练通过卷积的计算共享避免了重复计算重叠区域，wall-clock时间显著更短，因此更高效。"
```