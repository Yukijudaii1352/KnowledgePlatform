### DenseNet

```yaml
id: densenet
name: DenseNet
full_name: 密集连接卷积网络 (Densely Connected Convolutional Networks)
year: "2017"
org: Cornell University / Tsinghua University / Facebook AI Research
paper_url: https://arxiv.org/abs/1608.06993
category: foundation
parent: ResNet
motivation: 通过密集连接实现特征复用，缓解梯度消失，大幅提升参数效率
```

#### 📝 一句话总结

DenseNet 提出了密集连接机制，将每一层与所有前序层通过特征拼接（concatenation）直接相连，实现了最大化的特征复用和信息流通，在显著减少参数量的同时超越了 ResNet 等架构的分类性能。

#### 🎯 核心要点

- **密集连接（Dense Connectivity）**：每层接收所有前序层的特征图作为输入，网络中共有 \(L(L+1)/2\) 条连接（L 为层数）
- **增长率（Growth Rate, k）**：每层仅产生 k 个新特征图，k 可以很小（如 12），网络通过累积实现丰富表示
- **特征拼接而非相加**：与 ResNet 的逐元素加法不同，DenseNet 使用 channel 维度的 concatenation 保留所有前序特征
- **Bottleneck 层（DenseNet-B）**：引入 1×1 卷积将输入压缩到 4k 个通道，再接 3×3 卷积输出 k 个通道
- **Transition 层与压缩（DenseNet-C）**：在 Dense Block 之间使用 1×1 卷积 + 2×2 平均池化进行下采样，压缩因子 θ=0.5
- **隐式深度监督**：短连接使损失信号可直接传播到浅层，天然缓解梯度消失
- **参数高效**：DenseNet-BC（L=100, k=12）仅用 0.8M 参数即可匹敌 1001 层 ResNet（10.2M 参数）的性能

#### 🔬 深入细节

##### 核心架构示意图

![DenseNet 5层Dense Block示意图](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x1.png)
*图1：一个 5 层的 Dense Block（growth rate k=4）。每层以所有前序层的特征图拼接作为输入。*

![DenseNet 整体架构](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x2.png)
*图2：包含 3 个 Dense Block 的 DenseNet 架构。相邻 Block 之间的 Transition 层负责下采样和通道压缩。*

##### 算法伪代码

```python
# DenseNet Forward Pass (单个 Dense Block)
def dense_block_forward(x0, layers, growth_rate_k):
    """
    x0: 初始输入特征图
    layers: Dense Block 中的层数 L
    """
    features = [x0]
    for l in range(layers):
        # 拼接所有前序层的输出
        input_l = concatenate(features, dim='channel')  # [x0, x1, ..., x_{l-1}]
        # Bottleneck: BN -> ReLU -> 1x1 Conv (输出 4k 通道)
        out = batch_norm(input_l)
        out = relu(out)
        out = conv1x1(out, filters=4 * growth_rate_k)
        # 主卷积: BN -> ReLU -> 3x3 Conv (输出 k 通道)
        out = batch_norm(out)
        out = relu(out)
        out = conv3x3(out, filters=growth_rate_k)
        features.append(out)
    return concatenate(features, dim='channel')

# Transition Layer
def transition_layer(x, compression_theta=0.5):
    m = x.channels
    x = batch_norm(x)
    x = conv1x1(x, filters=int(m * compression_theta))
    x = avg_pool_2x2(x)
    return x
```

##### 动机与背景

随着深度网络层数增加，输入信息和梯度在逐层传播过程中可能逐渐"消失"。ResNet 通过跳跃连接（shortcut）缓解了这一问题，但其采用的**逐元素相加**方式可能阻碍网络中的信息流动——因为恒等映射和非线性变换的输出被混合在一起，后续层无法区分二者。

DenseNet 的核心洞察是：**确保网络中各层之间的最大信息流通**。为此，每一层都直接连接到所有后续层，形成密集连接模式。

##### 核心机制详解

**1. 密集连接公式**

传统前馈网络第 \(l\) 层的输出为：

$$x_l = H_l(x_{l-1})$$

ResNet 引入跳跃连接：

$$x_l = H_l(x_{l-1}) + x_{l-1}$$

DenseNet 将所有前序层的输出拼接后作为输入：

$$x_l = H_l([x_0, x_1, \ldots, x_{l-1}])$$

其中 \([x_0, x_1, \ldots, x_{l-1}]\) 表示第 0 到 \(l-1\) 层输出特征图在 channel 维度的拼接。

> 💡 关键：拼接（concatenation）而非相加（addition）是 DenseNet 的本质区别。拼接保留了每一层的原始特征，使后续层可以选择性地复用任意前序层的信息。

**2. 增长率（Growth Rate）**

每个 \(H_l\) 产生 \(k\) 个特征图，则第 \(l\) 层的输入通道数为：

$$k_0 + k \times (l - 1)$$

其中 \(k_0\) 是初始输入通道数。虽然 DenseNet 层数很深，但 \(k\) 可以很小（如 k=12），因为每层可以访问所有前序特征（"集体知识"），无需在单层中重复学习冗余特征。

> 💡 关键：增长率 k 可理解为每层对网络"全局状态"的新增贡献量。小 k 即可实现高性能，这是 DenseNet 参数高效的根本原因。

**3. Bottleneck 层（DenseNet-B）**

随着层数增加，拼接后的输入通道数线性增长。为控制计算量，在 3×3 卷积前引入 1×1 卷积进行降维：

$$H_l = \text{BN} \to \text{ReLU} \to \text{Conv}(1\times1, 4k) \to \text{BN} \to \text{ReLU} \to \text{Conv}(3\times3, k)$$

1×1 卷积将输入压缩到 4k 个通道，有效减少了 3×3 卷积的计算开销。

**4. Transition 层与压缩（DenseNet-C）**

Dense Block 之间的 Transition 层负责：
- 通过 1×1 卷积进行通道压缩（压缩因子 \(\theta \in (0, 1]\)，论文取 \(\theta = 0.5\)）
- 通过 2×2 平均池化进行空间下采样

当同时使用 Bottleneck 和 Compression 时，称为 **DenseNet-BC**。

**5. 特征复用分析**

论文通过可视化各层对前序层特征的平均绝对权重，验证了密集连接确实实现了特征复用：
- 浅层特征被深层广泛使用（而非仅被相邻层使用）
- Transition 层之后的第一层对前一个 Dense Block 的所有层都有较高权重
- 最终分类层也会利用浅层特征，说明低级特征对最终决策有直接贡献

![特征复用热力图](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x7.png)
*图5：训练后的 DenseNet 各层卷积权重的平均绝对值热力图，颜色越深表示对该前序层特征的依赖越强。*

##### 训练细节

| 配置项 | CIFAR/SVHN | ImageNet |
|--------|-----------|----------|
| 优化器 | SGD (Nesterov momentum=0.9) | SGD (Nesterov momentum=0.9) |
| Batch size | 64 | 256 |
| 初始学习率 | 0.1 | 0.1 |
| 学习率衰减 | 在 50%、75% epoch 时 ÷10 | 在 epoch 30、60 时 ÷10 |
| 总 epoch | 300 (CIFAR) / 40 (SVHN) | 90 |
| Weight decay | \(10^{-4}\) | \(10^{-4}\) |
| Dropout | 0.2（无数据增强时） | — |

##### ImageNet 架构配置

| 模型 | 层数 | Dense Block 配置 (6,12,24,16) | 参数量 |
|------|------|-------------------------------|--------|
| DenseNet-121 | 121 | 6, 12, 24, 16 | 8.0M |
| DenseNet-169 | 169 | 6, 12, 32, 32 | 14.1M |
| DenseNet-201 | 201 | 6, 12, 48, 32 | 20.0M |
| DenseNet-264 | 264 | 6, 12, 64, 48 | 33.3M |

所有 ImageNet 模型使用 k=32，初始卷积为 7×7 stride 2 + 3×3 max pool。

##### 与 ResNet 的核心区别

| 对比维度 | ResNet | DenseNet |
|----------|--------|----------|
| 连接方式 | 跳跃连接（加法） | 密集连接（拼接） |
| 信息流 | 仅相邻层间 | 任意层到所有后续层 |
| 特征复用 | 隐式（通过恒等映射） | 显式（拼接保留原始特征） |
| 参数效率 | 较低（每层需学习完整表示） | 较高（每层仅贡献 k 个新特征） |
| 梯度传播 | 通过跳跃连接 | 直接到任意浅层 |

##### 实验结果亮点

![参数效率对比](https://ar5iv.labs.arxiv.org/html/1608.06993/assets/x3.png)
*图3：ImageNet 上 DenseNet 与 ResNet 的 top-1 错误率对比（参数量 vs 性能）。DenseNet 在相同参数量下始终优于 ResNet。*

- **CIFAR-10+**：DenseNet-BC (L=190, k=40) 达到 **3.46%** 错误率，显著优于 Wide ResNet 的 4.17%
- **CIFAR-100+**：**17.18%** 错误率，优于 Wide ResNet 的 20.50%
- **ImageNet**：DenseNet-264 达到 top-1 **20.80%** / top-5 **5.29%**（10-crop）
- **参数效率**：DenseNet-BC (L=100, k=12) 仅 0.8M 参数，性能匹敌 10.2M 参数的 1001 层 ResNet

> ⚠️ 注意：DenseNet 的朴素实现存在显存效率问题（中间拼接结果需要额外内存），论文作者后续发布了内存高效实现方案。

#### 🧪 练习题

```yaml
question: "DenseNet 中第 l 层的输入是什么？"
options:
  - "仅第 l-1 层的输出特征图"
  - "第 l-1 层输出与原始输入的逐元素相加"
  - "第 0 到第 l-1 层所有输出特征图在 channel 维度的拼接"
  - "第 0 到第 l-1 层所有输出特征图的逐元素平均"
answer: 2
explain: "DenseNet 的核心设计是将所有前序层的输出在 channel 维度拼接后作为当前层输入，即 x_l = H_l([x_0, x_1, ..., x_{l-1}])，这与 ResNet 的加法跳跃连接有本质区别。"
```