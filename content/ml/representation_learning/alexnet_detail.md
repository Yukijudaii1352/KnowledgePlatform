### AlexNet

```yaml
id: alexnet
name: AlexNet
full_name: AlexNet
year: '2012'
org: Hinton Lab
paper_url: —
category: deep_rep
parent: —
motivation: 深度CNN视觉表示突破
```

#### 📝 一句话总结

AlexNet 首次证明了深度卷积神经网络在大规模图像分类任务上的巨大优势，以 top-5 错误率 15.3%（远超第二名的 26.2%）赢得 ILSVRC-2012 竞赛，开启了深度学习在计算机视觉领域的统治时代。

#### 🎯 核心要点

- **深度架构**：5 层卷积 + 3 层全连接，共 60M 参数、650K 神经元，是当时最大的 CNN
- **ReLU 激活函数**：首次大规模使用非饱和激活 \(\text{ReLU}(x) = \max(0, x)\)，训练速度比 tanh 快约 6 倍
- **双 GPU 并行训练**：将网络分布在两块 GTX 580 GPU 上，特定层跨 GPU 通信，突破显存限制
- **局部响应归一化（LRN）**：模拟生物神经元的侧抑制机制，提升泛化能力
- **重叠池化（Overlapping Pooling）**：池化窗口 3×3、步长 2，相比非重叠池化降低过拟合
- **Dropout 正则化**：在全连接层以 0.5 概率随机置零神经元，有效减少过拟合
- **数据增强**：随机裁剪（224×224 from 256×256）、水平翻转、PCA 颜色扰动
- **ILSVRC-2012 冠军**：top-5 错误率 15.3%，大幅领先传统手工特征方法（26.2%）

#### 🔬 深入细节

![AlexNet 网络架构图](https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png)
*图：AlexNet 网络架构。网络被分为上下两部分分别部署在两块 GPU 上，仅在特定层（Conv3、FC6、FC7、FC8）进行跨 GPU 通信。来源：Krizhevsky et al., 2012*

##### 算法伪代码

```python
# AlexNet 前向传播伪代码
def AlexNet_forward(image):
    """
    image: (3, 227, 227) RGB 输入图像
    输出: 1000 类概率分布
    """
    # ===== 卷积特征提取 =====
    # Conv1: 96 kernels, 11×11, stride 4
    x = conv2d(image, filters=96, kernel=11, stride=4)  # → (96, 55, 55)
    x = relu(x)
    x = local_response_norm(x, k=2, n=5, α=1e-4, β=0.75)
    x = max_pool(x, kernel=3, stride=2)                 # → (96, 27, 27)
    
    # Conv2: 256 kernels, 5×5, pad 2
    x = conv2d(x, filters=256, kernel=5, pad=2)         # → (256, 27, 27)
    x = relu(x)
    x = local_response_norm(x, k=2, n=5, α=1e-4, β=0.75)
    x = max_pool(x, kernel=3, stride=2)                 # → (256, 13, 13)
    
    # Conv3: 384 kernels, 3×3, pad 1 (跨GPU通信)
    x = conv2d(x, filters=384, kernel=3, pad=1)         # → (384, 13, 13)
    x = relu(x)
    
    # Conv4: 384 kernels, 3×3, pad 1
    x = conv2d(x, filters=384, kernel=3, pad=1)         # → (384, 13, 13)
    x = relu(x)
    
    # Conv5: 256 kernels, 3×3, pad 1
    x = conv2d(x, filters=256, kernel=3, pad=1)         # → (256, 13, 13)
    x = relu(x)
    x = max_pool(x, kernel=3, stride=2)                 # → (256, 6, 6)
    
    # ===== 全连接分类器 =====
    x = flatten(x)                                       # → (9216,)
    x = dropout(relu(linear(x, 4096)), p=0.5)           # FC6
    x = dropout(relu(linear(x, 4096)), p=0.5)           # FC7
    x = softmax(linear(x, 1000))                        # FC8
    return x
```

##### 动机与背景

在 AlexNet 之前，计算机视觉的主流方法依赖手工设计的特征描述子（如 SIFT、HOG）配合浅层分类器（如 SVM）。这些方法在 ImageNet 这样包含 1000 类、120 万张图像的大规模数据集上表现有限——2011 年 ILSVRC 冠军的 top-5 错误率仍高达 25.7%。

Krizhevsky、Sutskever 和 Hinton 认为，深度卷积神经网络具有足够的学习能力来直接从原始像素学习层次化的视觉表示，但此前受限于三个瓶颈：

1. **训练数据不足**：ImageNet 的出现（2009）首次提供了百万级标注数据
2. **计算能力不足**：GPU（特别是 NVIDIA GTX 580）使大规模 CNN 训练成为可能
3. **训练技巧缺乏**：过拟合和梯度消失问题阻碍了深层网络的训练

AlexNet 通过一系列工程创新和正则化技术，首次成功训练了一个 8 层深度 CNN，并以压倒性优势赢得了 ILSVRC-2012 竞赛。

##### 核心机制：ReLU 与训练加速

AlexNet 最重要的技术贡献之一是用 ReLU（Rectified Linear Unit）替代传统的 sigmoid/tanh 激活函数：

$$f(x) = \max(0, x)$$

相比饱和激活函数 \(\tanh(x)\) 或 \(\sigma(x) = \frac{1}{1+e^{-x}}\)，ReLU 具有以下关键优势：

- **无梯度饱和**：正区间梯度恒为 1，避免了深层网络中的梯度消失问题
- **计算高效**：仅需阈值判断，无需指数运算
- **稀疏激活**：约 50% 的神经元输出为零，产生稀疏表示

> 💡 关键：论文实验表明，使用 ReLU 的 4 层 CNN 在 CIFAR-10 上达到 25% 训练错误率的速度是使用 tanh 的 6 倍。这一发现使训练更深的网络成为可能。

##### 局部响应归一化（LRN）

AlexNet 引入了受生物视觉系统侧抑制（lateral inhibition）启发的局部响应归一化：

$$b_{x,y}^{i} = a_{x,y}^{i} \bigg/ \left( k + \alpha \sum_{j=\max(0,i-n/2)}^{\min(N-1,i+n/2)} (a_{x,y}^{j})^2 \right)^{\beta}$$

其中 \(a_{x,y}^{i}\) 是第 \(i\) 个卷积核在位置 \((x,y)\) 的激活值，归一化在相邻 \(n\) 个通道上进行。论文使用 \(k=2, n=5, \alpha=10^{-4}, \beta=0.75\)。

> ⚠️ 注意：后续研究（如 VGGNet）发现 LRN 的实际效果有限，现代网络已普遍使用 Batch Normalization 替代。但 LRN 的提出体现了从生物神经科学汲取灵感的思路。

##### Dropout 正则化

AlexNet 在全连接层（FC6、FC7）中使用了 Dropout，这是该技术首次在大规模视觉任务中成功应用：

$$\hat{h}_i = m_i \cdot h_i, \quad m_i \sim \text{Bernoulli}(p=0.5)$$

训练时，每个神经元以概率 0.5 被随机置零；推理时，所有神经元激活值乘以 0.5（或等价地，训练时除以保留概率）。

Dropout 的核心直觉是：它迫使网络学习更鲁棒的特征，因为每个神经元不能依赖特定其他神经元的存在。这相当于训练了一个指数级数量的"瘦网络"的集成（ensemble）。

> 💡 关键：没有 Dropout，AlexNet 的全连接层（参数量占总量的 90% 以上）会严重过拟合。Dropout 将 top-1 错误率降低了约 1-2%。

##### 数据增强策略

AlexNet 采用了两种数据增强方法来人为扩大训练集：

**1. 空间变换**：从 256×256 的图像中随机裁剪 224×224 的区域，并进行水平翻转。这使训练集扩大了 \(2 \times (256-224)^2 = 2048\) 倍。测试时，从四角和中心裁剪 5 个 patch 加上翻转共 10 个 patch，取预测均值。

**2. PCA 颜色扰动**：对训练图像的 RGB 通道进行 PCA，然后沿主成分方向添加随机扰动：

$$[\mathbf{p}_1, \mathbf{p}_2, \mathbf{p}_3][\alpha_1 \lambda_1, \alpha_2 \lambda_2, \alpha_3 \lambda_3]^\top$$

其中 \(\mathbf{p}_i, \lambda_i\) 是 RGB 像素值 3×3 协方差矩阵的特征向量和特征值，\(\alpha_i \sim \mathcal{N}(0, 0.1)\)。这种方法利用了自然图像在光照变化下的不变性，将 top-1 错误率降低了超过 1%。

##### 训练细节与超参数

AlexNet 使用带动量的 SGD 进行训练：

$$v_{t+1} = 0.9 \cdot v_t - 0.0005 \cdot \epsilon \cdot w_t - \epsilon \cdot \frac{\partial L}{\partial w_t}$$
$$w_{t+1} = w_t + v_{t+1}$$

关键训练配置：
- 批大小：128
- 初始学习率：0.01，当验证错误率不再下降时除以 10
- 权重衰减：0.0005（论文指出这不仅是正则化，还有助于训练）
- 权重初始化：零均值高斯分布，标准差 0.01
- 偏置初始化：Conv2/4/5 和 FC 层为 1，其余为 0
- 训练周期：约 90 个 epoch，在两块 GTX 580 上训练 5-6 天

##### 与传统方法的对比

| 特性 | 传统方法（SIFT+SVM） | AlexNet |
|------|---------------------|---------|
| 特征提取 | 手工设计（SIFT, HOG） | 端到端学习 |
| 表示层次 | 单层/浅层 | 8 层深度层次化表示 |
| ILSVRC top-5 错误率 | ~26% | 15.3% |
| 可迁移性 | 任务特定 | 特征可迁移到其他视觉任务 |
| 计算需求 | CPU 可完成 | 需要 GPU 加速 |

AlexNet 的成功不仅在于竞赛成绩，更在于它证明了：深度 CNN 学到的中间层特征（尤其是 FC7 层的 4096 维表示）具有强大的迁移能力，可以作为通用视觉特征用于检测、分割等下游任务。这一发现奠定了"预训练+微调"范式的基础。

#### 🧪 练习题

```yaml
question: "AlexNet 中使用 ReLU 激活函数替代 tanh 的主要优势是什么？"
options:
  - "减少模型参数量，降低过拟合风险"
  - "训练速度显著加快（约6倍），且避免梯度饱和问题"
  - "使网络输出值归一化到 [0,1] 区间"
  - "增强模型对旋转变换的不变性"
answer: 1
explain: "ReLU 在正区间梯度恒为1，不存在梯度饱和问题，且计算简单（无需指数运算），论文实验证明训练速度约为 tanh 的6倍。"
```