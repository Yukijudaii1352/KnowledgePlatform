### ResNet | 深度残差网络 (Deep Residual Learning for Image Recognition)

```yaml
id: resnet
name: ResNet
full_name: 深度残差网络 (Deep Residual Network)
year: 2015.12
organization: 微软亚洲研究院 (Microsoft Research Asia)
authors: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun
paper_url: https://arxiv.org/abs/1512.03385
code_url: https://github.com/KaimingHe/deep-residual-networks
category: cnn_classic
parent: vggnet
motivation: 提出残差连接解决深层网络退化问题
```

#### 📝 一句话总结

ResNet 通过引入恒等快捷连接(identity shortcut connection)，让网络学习残差映射 \(\mathcal{F}(\mathbf{x}) = \mathcal{H}(\mathbf{x}) - \mathbf{x}\) 而非直接映射，从根本上解决了深层网络的退化(degradation)问题，使训练152层甚至1000+层网络成为可能，以3.57% top-5错误率赢得ILSVRC 2015冠军。

#### 🎯 核心要点

- 发现并定义**退化问题(Degradation Problem)**：深层plain网络的训练误差反而高于浅层网络，这不是过拟合而是优化困难
- 提出**残差学习框架**：通过shortcut connection让网络学习残差函数 \(\mathcal{F}(\mathbf{x}) + \mathbf{x}\)，极大降低优化难度
- 设计**Bottleneck结构**：1×1-3×3-1×1卷积组合，ResNet-152(11.3B FLOPs)比VGG-16(15.3B FLOPs)更深但计算量更低
- 三种shortcut方案对比：Option A(零填充)、B(投影shortcut用于维度变化)、C(全投影)，证明identity shortcut即可解决退化
- 提供5种深度变体：ResNet-18/34(BasicBlock)、ResNet-50/101/152(Bottleneck)
- ImageNet集成3.57% top-5错误率；单模型ResNet-152达4.49% top-5；COCO检测28%相对提升

#### 🔬 深入细节

##### 核心架构示意图

![ResNet残差学习基本单元](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x2.png)
*图：残差学习Building Block。输入 x 通过shortcut直接加到输出上，网络只需学习残差 F(x)*

![ResNet网络架构对比](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x3.png)
*图：VGG-19(左)、34层Plain网络(中)、34层ResNet(右)的架构对比。虚线shortcut表示维度变化处使用投影*

![BasicBlock与Bottleneck对比](https://ar5iv.labs.arxiv.org/html/1512.03385/assets/x5.png)
*图：左为ResNet-34使用的BasicBlock(两层3×3)，右为ResNet-50/101/152使用的Bottleneck(1×1降维→3×3→1×1升维)*

##### 算法伪代码

```python
# ResNet 前向传播核心逻辑

class BasicBlock:
    """ResNet-18/34 使用的基本残差块"""
    def forward(self, x):
        identity = x
        # 主路径: 两层3×3卷积
        out = relu(bn(conv3x3(x)))      # 第一层
        out = bn(conv3x3(out))           # 第二层(激活前)
        # 维度不匹配时使用1×1投影
        if need_downsample:
            identity = bn(conv1x1_stride2(x))
        # 残差连接 + 激活
        out = relu(out + identity)
        return out

class Bottleneck:
    """ResNet-50/101/152 使用的瓶颈残差块"""
    def forward(self, x):
        identity = x
        # 主路径: 1×1降维 → 3×3卷积 → 1×1升维
        out = relu(bn(conv1x1(x)))       # 降维(256→64)
        out = relu(bn(conv3x3(out)))     # 空间卷积
        out = bn(conv1x1(out))           # 升维(64→256)
        # 维度不匹配时使用1×1投影
        if need_downsample:
            identity = bn(conv1x1_stride2(x))
        # 残差连接 + 激活
        out = relu(out + identity)
        return out

class ResNet:
    """整体网络结构"""
    def forward(self, x):
        # Stage 0: 初始卷积
        x = relu(bn(conv7x7_stride2(x)))  # 224→112
        x = maxpool3x3_stride2(x)          # 112→56
        # Stage 1-4: 残差块堆叠
        x = layer1(x)  # 56×56,  64通道(BasicBlock) / 256通道(Bottleneck)
        x = layer2(x)  # 28×28, 128通道 / 512通道
        x = layer3(x)  # 14×14, 256通道 / 1024通道
        x = layer4(x)  #  7×7,  512通道 / 2048通道
        # 分类头
        x = global_avg_pool(x)  # 7×7→1×1
        x = fc_1000(x)
        return softmax(x)
```

##### 动机与背景

深度学习的核心假设是"更深的网络能学到更好的表示"。VGGNet证明了16-19层网络的有效性，但当研究者尝试进一步加深网络时，遇到了一个反直觉的现象：**56层的plain网络在训练集上的误差竟然高于20层网络**。

这不是过拟合（过拟合应该是训练误差低但测试误差高），而是一个纯粹的优化问题。理论上，深层网络至少可以通过让额外层学习恒等映射来达到与浅层网络相同的性能，但实际的SGD优化器无法找到这样的解。

> 💡 关键洞察：退化问题的本质是——对于标准网络，学习恒等映射（什么都不做）反而是困难的，因为非线性层的堆叠天然倾向于将信号变换为非恒等的形式。

##### 核心机制：残差学习

ResNet的核心思想极为简洁：与其让网络直接学习目标映射 \(\mathcal{H}(\mathbf{x})\)，不如让网络学习**残差** \(\mathcal{F}(\mathbf{x}) := \mathcal{H}(\mathbf{x}) - \mathbf{x}\)。

最终输出通过加法重构：

$$\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W_i\}) + \mathbf{x}$$

**为什么这样设计有效？**

1. **优化简化**：如果最优映射接近恒等，网络只需将 \(\mathcal{F}\) 推向零（所有权重趋近零即可），而不需要通过非线性层拟合恒等函数
2. **梯度高速公路**：反向传播时，梯度可以通过shortcut无衰减地直接传回浅层：\(\frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \frac{\partial \mathcal{F}}{\partial \mathbf{x}} + \mathbf{I}\)，恒等项 \(\mathbf{I}\) 保证梯度不会消失
3. **信息保持**：输入信息通过shortcut无损传递，避免在多层变换中丢失

当输入输出维度不匹配时（通道数翻倍、空间尺寸减半），使用线性投影：

$$\mathbf{y} = \mathcal{F}(\mathbf{x}, \{W_i\}) + W_s\mathbf{x}$$

其中 \(W_s\) 为1×1卷积（stride=2实现下采样）。

##### 架构设计细节

**整体设计哲学**（继承自VGGNet）：
- 对于相同输出特征图尺寸的层，使用相同数量的滤波器
- 特征图尺寸减半时，滤波器数量翻倍（保持每层计算复杂度相近）
- 下采样通过stride=2的卷积实现

**各变体配置**：

| 模型 | Block类型 | 各Stage块数 | 参数量 | FLOPs |
|------|-----------|-------------|--------|-------|
| ResNet-18 | BasicBlock | [2, 2, 2, 2] | 11.7M | 1.8B |
| ResNet-34 | BasicBlock | [3, 4, 6, 3] | 21.8M | 3.6B |
| ResNet-50 | Bottleneck | [3, 4, 6, 3] | 25.6M | 3.8B |
| ResNet-101 | Bottleneck | [3, 4, 23, 3] | 44.5M | 7.6B |
| ResNet-152 | Bottleneck | [3, 8, 36, 3] | 60.2M | 11.3B |

> ⚠️ 注意：ResNet-50与ResNet-34的Block数配置相同[3,4,6,3]，但因使用Bottleneck(3层/block)替代BasicBlock(2层/block)，总层数从34增至50。Bottleneck的1×1卷积先将通道降为1/4再升回，使得3×3卷积的计算量大幅减少。

**训练配置**：
- SGD, momentum=0.9, weight decay=0.0001
- Batch size=256, 初始lr=0.1, 误差平台时÷10
- 60×10⁴ 迭代，不使用Dropout
- He初始化，BN在每个conv后、ReLU前
- 数据增强：随机裁剪224×224 + 水平翻转 + PCA颜色增强

##### 与传统方法的区别

| 对比维度 | Plain深层网络 | Highway Networks | ResNet |
|----------|--------------|-----------------|--------|
| 深度扩展 | 退化，无法有效训练 | 门控机制，可训练深层 | identity shortcut，简洁高效 |
| 额外参数 | 无 | 门控参数（参数量翻倍） | 无（identity）或极少（投影） |
| shortcut类型 | 无 | 门控：\(T \cdot H + (1-T) \cdot x\) | 恒等：\(F + x\) |
| 信息流 | 逐层衰减 | 门控调节 | 无损直通 |
| 实际深度 | ≤30层有效 | ~100层 | 152层(ImageNet), 1202层(CIFAR) |

##### 实验验证

**退化问题验证**（ImageNet, 10-crop）：

| 网络 | plain-18 | plain-34 | ResNet-18 | ResNet-34 |
|------|----------|----------|-----------|-----------|
| Top-1 Error | 27.94% | 28.54%↑ | 27.88% | 25.03%↓ |

Plain网络加深后性能下降，ResNet加深后性能显著提升——退化问题被解决。

**深度收益**（单模型，多尺度测试）：

| 模型 | Top-1 Error | Top-5 Error |
|------|-------------|-------------|
| ResNet-34 C | 21.53% | 5.60% |
| ResNet-50 | 20.74% | 5.25% |
| ResNet-101 | 19.87% | 4.60% |
| ResNet-152 | **19.38%** | **4.49%** |

**集成结果**：6模型集成在ImageNet测试集达到**3.57%** top-5错误率，赢得ILSVRC 2015分类冠军。

#### 🧪 练习题

```yaml
question: "ResNet中退化问题(degradation problem)的本质是什么？"
options:
  - "深层网络发生了严重的过拟合"
  - "梯度消失导致深层网络无法收敛"
  - "优化器难以在深层网络中找到不差于浅层网络的解"
  - "深层网络的参数量过大导致内存不足"
answer: 2
explain: "退化问题表现为深层网络的训练误差(非测试误差)高于浅层网络，排除了过拟合；BN已解决梯度消失；本质是SGD优化器在高维损失面中搜索困难，无法找到理论上存在的恒等映射解。"
```