### AlexNet

```yaml
id: alexnet
name: AlexNet
full_name: "深度卷积神经网络 (Deep Convolutional Neural Network)"
year: 2012.12
org: 多伦多大学
paper_url: "https://proceedings.neurips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf"
category: cnn_classic
parent: —
motivation: "首次应用ReLU、Dropout和GPU加速"
```

#### 📝 一句话总结

AlexNet首次将深度卷积神经网络应用于大规模图像分类任务，通过ReLU激活函数、Dropout正则化、数据增强和双GPU并行训练，在ILSVRC-2012上以top-5 error 15.3%大幅超越传统方法（第二名26.2%），开启了深度学习在计算机视觉领域的统治时代。

#### 🎯 核心要点

- **ReLU激活函数**：用非饱和激活函数 \(f(x) = \max(0, x)\) 替代tanh/sigmoid，训练速度提升约6倍，解决深层网络梯度消失问题
- **双GPU并行架构**：将网络分布在两块GTX 580 GPU上，每块GPU负责一半的feature maps，仅在特定层进行跨GPU通信，实现大模型高效训练
- **局部响应归一化(LRN)**：对相邻feature map通道进行归一化，模拟生物神经元的侧抑制效应，top-1/top-5 error分别降低1.4%/1.2%
- **重叠池化(Overlapping Pooling)**：使用stride=2、size=3的池化窗口（stride < size），相比非重叠池化(stride=size=2)降低top-1/top-5 error 0.4%/0.3%
- **Dropout正则化**：在全连接层以0.5概率随机置零神经元输出，有效减少过拟合，代价是收敛时间约增加一倍
- **数据增强**：包括随机裁剪(256→224)与水平翻转、PCA颜色扰动，大幅减少过拟合
- **网络规模**：5层卷积 + 3层全连接，约6000万参数、65万神经元，在120万训练图像上训练

#### 🔬 深入细节

![AlexNet Architecture](https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png)
*图：AlexNet网络架构示意图，展示双GPU分割结构。上下两条路径分别对应两块GPU，仅在第3层卷积和全连接层进行跨GPU通信。*

**算法伪代码：AlexNet 前向传播**

```
Input: RGB image 227×227×3 (从256×256随机裁剪224×224，实际实现为227)

# Conv1: 96 kernels of 11×11×3, stride 4
x = Conv(3→96, k=11, s=4) → ReLU → LRN → MaxPool(3×3, s=2)
# Output: 27×27×96 (split: 48 per GPU)

# Conv2: 256 kernels of 5×5×48
x = Conv(96→256, k=5, pad=2) → ReLU → LRN → MaxPool(3×3, s=2)
# Output: 13×13×256 (split: 128 per GPU)

# Conv3: 384 kernels of 3×3×256 (cross-GPU connection)
x = Conv(256→384, k=3, pad=1) → ReLU
# Output: 13×13×384 (split: 192 per GPU)

# Conv4: 384 kernels of 3×3×192
x = Conv(384→384, k=3, pad=1) → ReLU
# Output: 13×13×384 (split: 192 per GPU)

# Conv5: 256 kernels of 3×3×192
x = Conv(384→256, k=3, pad=1) → ReLU → MaxPool(3×3, s=2)
# Output: 6×6×256 (split: 128 per GPU)

# Classifier
x = FC(6×6×256→4096) → ReLU → Dropout(0.5)
x = FC(4096→4096) → ReLU → Dropout(0.5)
x = FC(4096→1000) → Softmax

Output: 1000-class probability
```

**核心设计原理**

1. **ReLU：解决梯度消失的关键**

   传统激活函数如sigmoid \(\sigma(x) = 1/(1+e^{-x})\) 和tanh在输入绝对值较大时梯度趋近于0（饱和区），导致深层网络训练极慢。ReLU定义为：

$$f(x) = \max(0, x)$$

   其梯度在正区间恒为1，不存在饱和问题。论文实验表明，在CIFAR-10上使用ReLU的4层CNN达到25% training error的速度比等效tanh网络快约6倍。

> 💡 关键：ReLU的计算也极其简单（仅需判断正负），相比sigmoid的指数运算大幅降低计算开销。

2. **双GPU并行训练策略**

   2012年单块GPU（GTX 580, 3GB显存）无法容纳完整的AlexNet。作者将96个/256个feature maps分为两组，分别放在两块GPU上。关键设计：
   - 第3层卷积接收两块GPU的全部feature maps（跨GPU通信）
   - 其余卷积层仅在同一GPU内部连接
   - 全连接层接收所有feature maps

   这种"受限连接"设计不仅解决了显存限制，还通过交叉验证发现能降低top-1/top-5 error约1.7%/1.2%（相比每层都跨GPU通信的方案）。

3. **局部响应归一化(Local Response Normalization)**

   受生物视觉系统侧抑制启发，对第 \(i\) 个feature map在位置 \((x,y)\) 的激活值进行归一化：

$$b_{x,y}^{i} = a_{x,y}^{i} / \left( k + \alpha \sum_{j=\max(0,i-n/2)}^{\min(N-1,i+n/2)} (a_{x,y}^{j})^2 \right)^{\beta}$$

   其中 \(k=2, n=5, \alpha=10^{-4}, \beta=0.75\)（通过验证集调优）。LRN在相邻通道间产生竞争，使响应较大的神经元相对更突出。

> ⚠️ 注意：后续研究（如VGGNet）发现LRN对性能提升有限，现代网络已被Batch Normalization完全取代。

4. **重叠池化(Overlapping Pooling)**

   传统池化使用 stride = kernel_size（如2×2池化stride=2），相邻池化窗口无重叠。AlexNet使用：

$$\text{kernel\_size} = 3, \quad \text{stride} = 2$$

   窗口间有1像素重叠，实验表明这能轻微降低过拟合倾向（top-1降0.4%，top-5降0.3%）。

5. **数据增强策略**

   两种互补的数据增强方法：

   **方法一：随机裁剪与翻转**
   - 从256×256图像中随机裁剪224×224 patch及其水平镜像
   - 测试时提取4角+中心共5个patch及其翻转（10个patch），取softmax输出均值
   - 将训练集扩大2048倍

   **方法二：PCA颜色扰动**
   - 对训练集RGB像素值进行PCA
   - 对每张图像加入扰动：\([\mathbf{p}_1, \mathbf{p}_2, \mathbf{p}_3][\alpha_1 \lambda_1, \alpha_2 \lambda_2, \alpha_3 \lambda_3]^T\)
   - 其中 \(\mathbf{p}_i, \lambda_i\) 为RGB协方差矩阵的特征向量和特征值，\(\alpha_i \sim N(0, 0.1)\)
   - 捕捉自然图像的光照变化不变性，降低top-1 error超过1%

6. **Dropout正则化**

   在前两个全连接层（4096维）中，训练时以概率0.5随机将神经元输出置零：

$$h_i = \begin{cases} 0 & \text{with probability } 0.5 \\ 2 \cdot a_i & \text{otherwise} \end{cases}$$

   每次前向传播采样不同的"瘦网络"，等效于训练大量共享参数的子网络的集成。测试时使用全部神经元但权重减半（等效于几何平均）。Dropout使模型不依赖特定神经元的共适应关系，显著减少过拟合。

7. **训练细节**

   - 优化器：SGD，batch size 128，momentum 0.9，weight decay 0.0005
   - 学习率：初始0.01，当验证集error不再下降时手动除以10，共降低3次
   - 权重初始化：均值0、标准差0.01的高斯分布；偏置在Conv2/4/5和全连接层初始化为1（加速ReLU早期学习），其余为0
   - 训练时长：120万图像训练约90个epoch，在两块GTX 580上耗时5-6天

**与传统方法的对比**

| 方法 | Top-5 Error (ILSVRC-2012) | 特点 |
|------|--------------------------|------|
| AlexNet (1 CNN) | 18.2% | 单模型深度CNN |
| AlexNet (5 CNNs) | 16.4% | 5模型集成 |
| AlexNet (7 CNNs)* | 15.3% | 含预训练微调模型 |
| 第二名 (传统方法) | 26.2% | Fisher Vector + 多尺度SIFT |
| 第三名 | 26.6% | 传统特征工程 |

*竞赛提交版本使用了在ImageNet Fall 2011数据集上预训练的两个额外CNN。

> 💡 关键：AlexNet将error rate从26.2%直接降到15.3%（相对提升41.6%），这一跨越性进步彻底改变了计算机视觉的研究范式，从手工特征工程转向端到端深度学习。

#### 🧪 练习题

```yaml
question: "AlexNet中使用ReLU激活函数替代tanh的主要优势是什么？"
options:
  - "ReLU能产生稀疏激活，减少模型参数量"
  - "ReLU在正区间梯度恒为1，避免梯度饱和，大幅加速训练收敛"
  - "ReLU的输出范围有界，有助于数值稳定性"
  - "ReLU能自动实现特征归一化"
answer: 1
explain: "ReLU的核心优势在于非饱和性——正区间梯度恒为1，不像sigmoid/tanh在大输入时梯度趋近于0。论文实验表明ReLU使训练速度提升约6倍。"
```