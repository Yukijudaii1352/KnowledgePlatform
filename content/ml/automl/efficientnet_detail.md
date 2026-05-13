### EfficientNet

```yaml
id: efficientnet
name: EfficientNet
full_name: "高效网络：重新思考卷积神经网络的模型缩放 (EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks)"
year: "2019"
org: "Google Brain"
paper_url: "https://arxiv.org/abs/1905.11946"
category: "automl"
parent: "—"
motivation: "通过神经架构搜索获得高效基线网络，并提出复合缩放法则统一调节网络深度、宽度和输入分辨率，以更少参数达到更高精度"
```

#### 📝 一句话总结

EfficientNet 提出了一种复合缩放方法（Compound Scaling），通过统一缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）获得的高效基线网络 EfficientNet-B0，系统性地构建了 B0-B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数超越了当时最优模型。

#### 🎯 核心要点

- 提出复合缩放法则：用统一的复合系数 \(\phi\) 同时缩放深度、宽度和分辨率，约束条件为 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\)
- 基线网络 EfficientNet-B0 通过多目标 NAS（优化 ACC(m) × [FLOPS(m)/T]^w）搜索得到，以 MBConv（Mobile Inverted Bottleneck）为核心构建块
- 缩放系数通过小规模网格搜索确定：\(\alpha=1.2, \beta=1.1, \gamma=1.15\)
- 系列模型 B1-B7 通过逐步增大 \(\phi\) 从 B0 缩放得到
- 在 ImageNet 上，EfficientNet-B7 达到 84.3% top-1 准确率，参数量仅 66M（比 GPipe 小 8.4 倍，推理快 6.1 倍）
- 迁移学习在 CIFAR-100、Flowers、Cars 等 5 个数据集上均达到 SOTA

#### 🔬 深入细节

![EfficientNet 复合缩放示意图](https://production-media.paperswithcode.com/methods/compound_702x0Pu.png)
*图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 复合缩放同时增加三个维度（本文方法）*

##### 算法伪代码

```python
# EfficientNet 复合缩放算法
# Step 1: 固定 φ=1，网格搜索最优 α, β, γ
best_acc = 0
for alpha in [1.0, 1.1, 1.2, ...]:
    for beta in [1.0, 1.05, 1.1, ...]:
        for gamma in [1.0, 1.05, 1.1, ...]:
            if alpha * beta**2 * gamma**2 ≈ 2:
                # 在 B0 基础上缩放并评估
                model = scale(B0, depth=alpha, width=beta, resolution=gamma)
                acc = evaluate(model, ImageNet)
                if acc > best_acc:
                    best_alpha, best_beta, best_gamma = alpha, beta, gamma
# 结果: α=1.2, β=1.1, γ=1.15

# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7
for phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # 对应 B1-B7
    depth = best_alpha ** phi      # 网络层数倍数
    width = best_beta ** phi       # 通道数倍数
    resolution = best_gamma ** phi # 输入分辨率倍数
    EfficientNet_B{phi} = scale(B0, depth, width, resolution)
```

##### 动机与背景

卷积神经网络的性能提升通常依赖于模型缩放——增加网络深度（如 ResNet-18 → ResNet-200）、增加通道宽度（如 WideResNet）或提高输入分辨率。然而，传统方法只调节单一维度，且缺乏理论指导，往往需要大量人工调参。

作者通过系统实验发现：**单独缩放任何一个维度都会迅速饱和**。例如，仅增加深度时，由于梯度消失问题，非常深的网络难以训练；仅增加宽度时，宽而浅的网络难以捕获高层特征。关键洞察是：**三个维度之间存在协同关系**——更高分辨率的图像需要更深的网络来捕获更大感受野中的精细模式，同时也需要更宽的网络来捕获更多细粒度特征。

##### 核心机制：复合缩放法则

EfficientNet 的核心创新是将模型缩放形式化为一个约束优化问题。给定基线网络 \(\mathcal{N}\)，目标是找到最优的缩放系数以最大化模型精度：

$$\max_{d, w, r} \quad \text{Accuracy}(\mathcal{N}(d, w, r))$$
$$\text{s.t.} \quad \mathcal{N}(d, w, r) = \bigodot_{i=1,...,s} \hat{F}_i^{d \cdot \hat{L}_i}(X_{\langle r \cdot \hat{H}_i, r \cdot \hat{W}_i, w \cdot \hat{C}_i \rangle})$$
$$\text{Memory}(\mathcal{N}) \leq \text{target\_memory}$$
$$\text{FLOPS}(\mathcal{N}) \leq \text{target\_flops}$$

其中 \(d, w, r\) 分别为深度、宽度和分辨率的缩放系数。作者提出用单一复合系数 \(\phi\) 统一控制三个维度：

$$d = \alpha^\phi, \quad w = \beta^\phi, \quad r = \gamma^\phi$$

约束条件为：

$$\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2$$

> 💡 **关键直觉**：FLOPS 与 \(d, w^2, r^2\) 成正比（深度线性增加计算量，宽度和分辨率各自平方增加计算量），因此约束 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\) 意味着每增加 \(\phi\) 一个单位，总 FLOPS 大约翻倍（增加 \(2^\phi\) 倍）。这使得资源分配可控且可预测。

##### EfficientNet-B0 基线架构

B0 通过多目标 NAS 搜索得到，优化目标同时考虑准确率和 FLOPS。其架构以 Mobile Inverted Bottleneck Convolution（MBConv）为核心，并集成了 Squeeze-and-Excitation（SE）模块：

| Stage | Operator | Resolution | Channels | Layers |
|-------|----------|-----------|----------|--------|
| 1 | Conv3×3 | 224×224 | 32 | 1 |
| 2 | MBConv1, k3×3 | 112×112 | 16 | 1 |
| 3 | MBConv6, k3×3 | 112×112 | 24 | 2 |
| 4 | MBConv6, k5×5 | 56×56 | 40 | 2 |
| 5 | MBConv6, k3×3 | 28×28 | 80 | 3 |
| 6 | MBConv6, k5×5 | 14×14 | 112 | 3 |
| 7 | MBConv6, k5×5 | 14×14 | 192 | 4 |
| 8 | MBConv6, k3×3 | 7×7 | 320 | 1 |
| 9 | Conv1×1 & Pooling & FC | 7×7 | 1280 | 1 |

其中 MBConv6 表示扩展比为 6 的 Mobile Inverted Bottleneck，k 表示卷积核大小。每个 MBConv 块包含：depthwise separable convolution + SE attention + skip connection。

##### 与传统方法的区别

| 方法 | 缩放策略 | 缺陷 |
|------|---------|------|
| ResNet 系列 | 仅增加深度 | 深度过大时梯度消失，精度饱和 |
| WideResNet | 仅增加宽度 | 宽而浅的网络难以捕获高层语义 |
| 高分辨率输入 | 仅增加分辨率 | 感受野不足，精度增益递减 |
| **EfficientNet** | **复合缩放三维度** | **平衡分配资源，精度持续提升** |

> ⚠️ **注意**：复合缩放的有效性并不局限于 EfficientNet 架构本身。作者在 MobileNet 和 ResNet 上验证了复合缩放同样能带来显著提升（如 ResNet-50 在复合缩放后 top-1 提升 0.7%，超过单独缩放深度或宽度的效果）。

##### 实验结果

在 ImageNet 上的关键结果：
- EfficientNet-B0：77.1% top-1，5.3M 参数
- EfficientNet-B3：81.6% top-1，12M 参数（与 ResNet-152 精度相当，参数少 5 倍）
- EfficientNet-B7：84.3% top-1，66M 参数（超越 GPipe 的 84.3%，但参数少 8.4 倍）

#### 🧪 练习题

```yaml
question: "EfficientNet 复合缩放法则中，约束条件 α·β²·γ²≈2 的设计目的是什么？"
options:
  - "确保模型参数量恒定不变"
  - "使每增加一个单位的复合系数 φ，总 FLOPS 大约翻倍"
  - "保证网络深度始终大于宽度"
  - "限制输入分辨率不超过 600×600"
answer: 1
explain: "由于 FLOPS 与 d·w²·r² 成正比，约束 α·β²·γ²≈2 确保 φ 每增加 1，FLOPS 增加约 2^φ 倍，使计算资源分配可控。"
```