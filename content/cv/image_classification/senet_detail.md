### SENet

```yaml
id: senet
name: SENet
full_name: "压缩-激励网络 (Squeeze-and-Excitation Networks)"
year: "2018"
org: "Momenta"
paper_url: "https://arxiv.org/abs/1709.01507"
category: "image_classification"
parent: "—"
motivation: "通过显式建模通道间依赖关系，自适应地重新校准通道特征响应，以极低计算代价显著提升CNN性能"
```

#### 📝 一句话总结

SENet 提出了 Squeeze-and-Excitation (SE) 模块，通过全局平均池化压缩空间信息并利用两层全连接网络学习通道注意力权重，以即插即用的方式嵌入任意 CNN 架构中，以不到 10% 的额外参数换取显著的精度提升，获得 ILSVRC 2017 图像分类冠军（top-5 错误率 2.251%）。

#### 🎯 核心要点

- **SE Block 三步操作**：Squeeze（全局平均池化）→ Excitation（FC-ReLU-FC-Sigmoid 瓶颈结构）→ Scale（通道级乘法重标定）
- **即插即用设计**：可无缝嵌入 ResNet、ResNeXt、Inception、VGG、MobileNet 等任意现有架构
- **极低计算开销**：以 ResNet-50 为例，参数仅增加约 10%（25.6M → 28.1M），GFLOPs 几乎不变（3.86 → 3.87）
- **瓶颈降维比 \(r\)**：默认 \(r=16\)，在精度与复杂度之间取得最佳平衡
- **通道注意力机制先驱**：首次系统性地在深度网络中引入轻量级通道注意力，启发了后续 CBAM、ECA-Net 等大量工作
- **ILSVRC 2017 冠军**：集成模型在测试集上达到 2.251% top-5 错误率，较 2016 年冠军相对降低约 25%

#### 🔬 深入细节

##### 核心架构示意图

![SE Block 结构示意图](https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x1.png)

*图 1：SE Block 的结构。对卷积变换 \(F_{tr}\) 的输出特征 \(U\) 依次执行 Squeeze、Excitation 和 Scale 操作，实现通道级特征重标定。*

![SE-ResNet 模块示意图](https://ar5iv.labs.arxiv.org/html/1709.01507v4/assets/x3.png)

*图 2：SE Block 嵌入 ResNet 残差模块（左）和 Inception 模块（右）的示意。SE Block 作用于残差分支输出，在与 shortcut 相加之前进行通道重标定。*

##### 算法伪代码

```python
# SE Block 伪代码
import torch
import torch.nn as nn

class SEBlock(nn.Module):
    def __init__(self, channels, reduction=16):
        super().__init__()
        mid = channels // reduction
        self.squeeze = nn.AdaptiveAvgPool2d(1)          # Squeeze: H×W → 1×1
        self.excitation = nn.Sequential(
            nn.Linear(channels, mid, bias=False),        # W1: C → C/r
            nn.ReLU(inplace=True),
            nn.Linear(mid, channels, bias=False),        # W2: C/r → C
            nn.Sigmoid()                                  # 归一化到 [0,1]
        )

    def forward(self, x):
        b, c, _, _ = x.size()
        # Squeeze: 全局平均池化
        z = self.squeeze(x).view(b, c)                   # (B, C)
        # Excitation: 学习通道权重
        s = self.excitation(z).view(b, c, 1, 1)          # (B, C, 1, 1)
        # Scale: 通道级重标定
        return x * s.expand_as(x)                         # (B, C, H, W)
```

##### 动机与背景

卷积神经网络的核心操作——卷积——在每一层中融合空间和通道信息以构建特征表示。大量先前工作（如 Inception 系列、ResNeXt）致力于增强**空间维度**的特征提取能力，但对**通道维度**的建模相对薄弱。传统卷积核对所有通道一视同仁地处理，无法根据输入内容动态调整各通道的重要性。

> 💡 **关键直觉**：不同通道对应不同的特征模式（如边缘、纹理、语义部件），它们的重要性因输入而异。SE Block 让网络学会"看哪些通道更重要"，并据此放大有用通道、抑制无用通道。

##### 核心机制详解

**1. Squeeze：全局信息嵌入**

卷积操作的感受野是局部的，底层特征难以利用全局上下文。Squeeze 操作通过全局平均池化（GAP）将每个通道的空间特征图 \(u_c \in \mathbb{R}^{H \times W}\) 压缩为一个标量，生成通道描述符 \(z \in \mathbb{R}^C\)：

$$z_c = F_{sq}(u_c) = \frac{1}{H \times W} \sum_{i=1}^{H} \sum_{j=1}^{W} u_c(i, j)$$

这一步将全局空间信息编码到通道描述符中，为后续的通道间关系建模提供全局视野。

**2. Excitation：自适应通道权重学习**

为了充分利用 Squeeze 阶段聚合的信息，Excitation 操作需要满足两个条件：（1）能够学习通道间的非线性交互；（2）能够输出非互斥的多通道权重（不同于 one-hot 的 softmax）。因此采用带瓶颈的两层全连接结构：

$$s = F_{ex}(z, W) = \sigma(W_2 \cdot \delta(W_1 \cdot z))$$

其中 \(W_1 \in \mathbb{R}^{\frac{C}{r} \times C}\)、\(W_2 \in \mathbb{R}^{C \times \frac{C}{r}}\)，\(\delta\) 为 ReLU，\(\sigma\) 为 Sigmoid。

> ⚠️ **瓶颈设计的意义**：降维比 \(r\) 控制模型复杂度。先通过 \(W_1\) 将 \(C\) 维降至 \(C/r\) 维（信息压缩），再通过 \(W_2\) 恢复至 \(C\) 维（信息恢复）。这不仅限制了参数量，还起到了正则化作用，有助于泛化。实验表明 \(r=16\) 在精度与效率间取得最佳平衡。

**3. Scale：特征重标定**

最终，将学到的通道权重 \(s_c \in [0, 1]\) 与原始特征图逐通道相乘：

$$\tilde{x}_c = F_{scale}(u_c, s_c) = s_c \cdot u_c$$

这一操作本质上是一种**通道级的注意力机制**——权重接近 1 的通道被保留，接近 0 的通道被抑制。

##### 与现有架构的集成

SE Block 的设计使其可以直接嵌入现有网络的构建模块中：

| 基础架构 | 集成方式 | Top-1 提升 | Top-5 提升 |
|---------|---------|-----------|-----------|
| ResNet-50 | 残差分支后、shortcut 相加前 | 24.56% → 23.29% (↓1.27) | 7.48% → 6.62% (↓0.86) |
| ResNet-101 | 同上 | — | 6.52% → 6.07% (↓0.45) |
| ResNeXt-50 | 同上 | 22.23% → 21.10% (↓1.13) | 5.90% → 5.49% (↓0.41) |
| VGGNet-16 | 每个卷积层后 | — | 8.67% → 7.44% (↓1.23) |
| BN-Inception | Inception 模块后 | — | 7.89% → 7.14% (↓0.75) |

> 💡 **关键发现**：SE Block 在不同深度、不同架构风格的网络上均带来一致的提升，验证了通道注意力机制的通用性。

##### 消融实验关键结论

**Squeeze 算子选择**：全局平均池化（AvgPool）优于最大池化（MaxPool），因为 AvgPool 能更好地编码通道的全局分布信息。

**Excitation 激活函数**：Sigmoid 优于 Tanh 和 ReLU。ReLU 由于将权重截断为非负且可能置零，丢失了通道间的相对关系；Tanh 虽然保留了正负信息但饱和区梯度消失；Sigmoid 输出 \([0,1]\) 的平滑权重最为合适。

**降维比 \(r\) 的影响**：

| \(r\) | Top-1 (%) | Top-5 (%) | 参数量 |
|-------|-----------|-----------|--------|
| 2 | 22.93 | 6.38 | 最多 |
| 4 | 23.01 | 6.48 | — |
| 8 | 23.19 | 6.62 | — |
| **16** | **23.29** | **6.62** | **最佳平衡** |
| 32 | 23.61 | 6.82 | 最少 |

**SE Block 位置**：在残差模块中，SE Block 放在残差分支的卷积之后、与 shortcut 相加之前（SE-PRE）效果最佳。

##### 计算效率分析

SE Block 引入的额外计算量极小：

- **参数增量**：主要来自两个 FC 层，总增量约为 \(\frac{2}{r} \sum_{s=1}^{S} N_s \cdot C_s^2\)，其中 \(S\) 为阶段数，\(N_s\) 为该阶段重复次数，\(C_s\) 为通道数
- **SE-ResNet-50**：参数从 25.56M 增至 28.07M（+10%），GFLOPs 从 3.86 增至 3.87（+0.26%）
- **推理速度**：在 GPU 上 SE-ResNet-50 单张图推理约 209 张/秒 vs ResNet-50 约 234 张/秒，增加约 10% 的推理时间

##### 竞赛成绩与跨任务泛化

- **ILSVRC 2017 分类冠军**：SENet-154 集成模型在测试集上达到 **2.251% top-5 错误率**
- **场景分类**：在 Places-365 数据集上，SE-ResNet-152 的 top-1 错误率从 41.07% 降至 40.37%
- **目标检测**：在 COCO 上使用 Faster R-CNN + SE-ResNet-50 骨干，mAP 从 ResNet-50 基线提升约 1.3%（在 COCO minival 上）
- **CIFAR-10/100**：SE-ResNet-110 在 CIFAR-10 上错误率从 6.37% 降至 5.21%，CIFAR-100 上从 27.45% 降至 24.28%

##### 与传统方法的区别

| 对比维度 | 传统 CNN | SENet |
|---------|---------|-------|
| 通道处理 | 所有通道等权重 | 自适应通道权重 |
| 注意力机制 | 无显式通道注意力 | 显式 Squeeze-Excitation |
| 全局信息利用 | 依赖感受野逐步扩大 | GAP 直接获取全局统计 |
| 架构修改 | 需要重新设计网络 | 即插即用，不改变原有架构 |
| 计算开销 | — | 仅增加 ~10% 参数，GFLOPs 几乎不变 |

#### 🧪 练习题

```yaml
question: "SE Block 中 Excitation 操作使用 Sigmoid 而非 Softmax 作为最终激活函数的主要原因是什么？"
options:
  - "Sigmoid 的计算速度比 Softmax 更快"
  - "Sigmoid 允许多个通道同时具有较高权重，而 Softmax 会强制通道间竞争"
  - "Sigmoid 的梯度比 Softmax 更稳定，不会出现梯度消失"
  - "Softmax 只能用于分类任务的最后一层"
answer: 1
explain: "SE Block 需要输出非互斥的通道权重——多个通道可以同时被增强。Sigmoid 独立地将每个通道映射到 [0,1]，而 Softmax 会使所有通道权重之和为 1，形成互斥竞争，不符合通道重标定的需求。"
```