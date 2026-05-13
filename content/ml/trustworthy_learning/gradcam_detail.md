### Grad-CAM

```yaml
id: gradcam
name: Grad-CAM
full_name: 梯度加权类激活映射 (Gradient-weighted Class Activation Mapping)
year: '2017'
org: Georgia Tech
paper_url: https://arxiv.org/abs/1610.02391
category: interpretability
parent: —
motivation: 可视化CNN关注的图像区域实现视觉解释
```

#### 📝 一句话总结

Grad-CAM 通过对最后一个卷积层的特征图梯度进行全局平均池化得到类别重要性权重，生成类别判别性热力图，将 CAM 推广到任意 CNN 架构（无需修改网络结构或重新训练），实现对分类、描述生成、VQA 等多种任务的视觉解释。

#### 🎯 核心要点

- **通用可视化方法**：适用于任意含卷积层的 CNN（VGG、ResNet、captioning、VQA 模型），无需架构修改或重训练
- **核心公式**：对目标类别得分关于最后卷积层特征图的梯度做全局平均池化，得到通道重要性权重 \(\alpha_k^c\)
- **类别判别性热力图**：\(L_{\text{Grad-CAM}}^c = \text{ReLU}(\sum_k \alpha_k^c A^k)\)，ReLU 保留正影响区域
- **Guided Grad-CAM**：将 Grad-CAM 上采样后与 Guided Backpropagation 逐元素相乘，兼具高分辨率和类别判别性
- **严格推广 CAM**：证明当网络使用 GAP+softmax 结构时，Grad-CAM 权重与 CAM 权重等价（相差常数因子）
- **弱监督定位**：在 ILSVRC-15 弱监督定位任务上超越 CAM 等先前方法
- **人类信任评估**：通过 AMT 人类实验验证 Grad-CAM 帮助用户辨别更可靠的模型
- **忠实性验证**：与遮挡图的秩相关系数达 0.261，高于 Guided Backpropagation (0.168) 和 CAM (0.208)

#### 🔬 深入细节

![Grad-CAM 框架总览](https://ar5iv.labs.arxiv.org/html/1610.02391v4/assets/x2.png)
*图：Grad-CAM 方法概览。对任意 CNN 模型，计算目标类别得分对最后卷积层的梯度，经全局平均池化得到权重，加权求和后通过 ReLU 生成类别判别性热力图。*

##### 算法伪代码

```python
# Grad-CAM 核心计算流程
def grad_cam(model, image, target_class):
    # 1. 前向传播，获取最后卷积层特征图 A^k 和目标类别得分 y^c
    features = model.forward_to_last_conv(image)  # A^k, shape: [K, u, v]
    score = model.forward_from_conv(features)      # y^c (target class score)
    
    # 2. 反向传播，计算梯度 ∂y^c/∂A^k
    score[target_class].backward()
    gradients = features.grad  # shape: [K, u, v]
    
    # 3. 全局平均池化梯度，得到通道重要性权重
    alpha = gradients.mean(dim=(1, 2))  # α_k^c = (1/Z) Σ_i Σ_j ∂y^c/∂A_{ij}^k
    
    # 4. 加权组合特征图 + ReLU
    cam = ReLU(sum(alpha[k] * features[k] for k in range(K)))
    
    # 5. 上采样到输入图像尺寸
    cam = upsample(cam, size=image.shape)
    return cam

# Guided Grad-CAM = pointwise_multiply(Guided_Backprop, upsample(Grad-CAM))
```

##### 动机与背景

深度 CNN 在图像分类、目标检测等任务上取得了突破性进展，但其"黑箱"特性使得模型决策难以解释。此前的可视化方法存在两类缺陷：

1. **像素级梯度方法**（Guided Backpropagation、Deconvolution）：生成高分辨率可视化，但**缺乏类别判别性**——对不同类别生成几乎相同的可视化结果。
2. **CAM (Class Activation Mapping)**：具有类别判别性，但**要求特定网络结构**（全局平均池化直接接 softmax），不适用于含全连接层的 VGG、多模态 VQA 模型等。

Grad-CAM 的核心动机是：**设计一种通用的、类别判别性的可视化方法，适用于任意基于 CNN 的模型架构，无需修改网络或重新训练。**

##### 核心机制

**Step 1：计算神经元重要性权重**

对于目标类别 \(c\)，首先计算类别得分 \(y^c\)（softmax 之前的 logit）对最后卷积层第 \(k\) 个特征图 \(A^k\) 中每个空间位置 \((i,j)\) 的梯度，然后进行全局平均池化：

$$\alpha_k^c = \frac{1}{Z}\sum_i\sum_j \frac{\partial y^c}{\partial A_{ij}^k}$$

其中 \(Z = u \times v\) 是特征图的空间像素数。直觉上，\(\alpha_k^c\) 衡量了第 \(k\) 个特征图对类别 \(c\) 预测的整体重要性——梯度越大，该特征图对目标类别的贡献越大。

> 💡 关键：这里使用全局平均池化而非全局最大池化，实验表明前者效果更好，因为它捕获了特征图对类别得分的整体贡献而非仅关注最强响应。

**Step 2：生成类别判别性定位图**

将重要性权重与对应特征图进行加权线性组合，再通过 ReLU 激活：

$$L_{\text{Grad-CAM}}^c = \text{ReLU}\left(\sum_k \alpha_k^c A^k\right)$$

ReLU 的作用是仅保留对目标类别有**正向影响**的区域（即增加这些像素强度会提升 \(y^c\)），负值区域通常属于图像中的其他类别。结果是一个与最后卷积层特征图同尺寸的粗粒度热力图（如 VGG 的 14×14）。

**Step 3：Guided Grad-CAM（高分辨率类别判别性可视化）**

为了同时获得高分辨率和类别判别性，将 Grad-CAM 热力图上采样到输入图像分辨率后，与 Guided Backpropagation 的结果逐元素相乘：

$$L_{\text{Guided Grad-CAM}}^c = L_{\text{Guided BP}} \odot \text{Upsample}(L_{\text{Grad-CAM}}^c)$$

这样既保留了 Guided Backpropagation 的细粒度像素级细节，又通过 Grad-CAM 的空间掩码实现了类别选择性。

##### Grad-CAM 严格推广 CAM 的证明

论文严格证明了 Grad-CAM 是 CAM 的推广。对于 CAM 要求的 GAP+线性分类器结构：

$$Y^c = \sum_k w_k^c \cdot F^k, \quad F^k = \frac{1}{Z}\sum_i\sum_j A_{ij}^k$$

通过链式法则可得 \(w_k^c = \sum_i\sum_j \frac{\partial Y^c}{\partial A_{ij}^k}\)，这与 Grad-CAM 的 \(\alpha_k^c\) 仅差一个常数因子 \(1/Z\)（在可视化归一化时被消除）。因此 Grad-CAM 在 CAM 适用的架构上等价于 CAM，同时还能推广到任意复杂的 CNN 架构。

##### 与传统方法的区别

| 方法 | 类别判别性 | 高分辨率 | 通用架构 | 无需重训练 |
|------|:---:|:---:|:---:|:---:|
| Guided Backpropagation | ✗ | ✓ | ✓ | ✓ |
| Deconvolution | ✗ | ✓ | ✓ | ✓ |
| CAM | ✓ | ✗ | ✗ (需GAP+softmax) | ✗ (需修改架构) |
| **Grad-CAM** | ✓ | ✗ (粗粒度) | ✓ | ✓ |
| **Guided Grad-CAM** | ✓ | ✓ | ✓ | ✓ |

> ⚠️ 注意：Grad-CAM 本身生成的是粗粒度热力图（与最后卷积层特征图同尺寸），需要通过与 Guided Backpropagation 结合才能获得高分辨率的类别判别性可视化。

##### 实验验证

1. **弱监督定位**：在 ILSVRC-15 验证集上，Grad-CAM (VGG-16) 的定位错误率为 56.51%，优于 CAM 需要修改架构后的结果。
2. **人类信任实验**：AMT 实验中，Guided Grad-CAM 使人类能以 61.23% 的准确率区分不同类别的可视化（vs Guided BP 的 44.44%），并能识别更可靠的模型（VGG-16 vs AlexNet 的可靠性评分 +1.27 vs +1.00）。
3. **忠实性**：与遮挡图的秩相关系数为 0.261，显著优于 Guided Backpropagation (0.168) 和 CAM (0.208)。
4. **对抗鲁棒性**：Grad-CAM 能揭示对抗样本中网络关注区域的变化，帮助理解对抗攻击机制。
5. **数据集偏差识别**：通过 Grad-CAM 发现模型利用背景等虚假相关进行预测，指导数据集去偏。

#### 🧪 练习题

```yaml
question: "Grad-CAM 相比 CAM 的核心优势是什么？"
options:
  - "生成更高分辨率的可视化热力图"
  - "适用于任意 CNN 架构，无需修改网络结构或重新训练"
  - "计算速度更快，不需要反向传播"
  - "不需要选择目标类别即可生成可视化"
answer: 1
explain: "CAM 要求网络必须使用 GAP+softmax 结构，而 Grad-CAM 通过梯度的全局平均池化获得等价权重，可应用于任意含卷积层的 CNN 架构，无需架构修改或重训练。"
```