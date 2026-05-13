### EfficientNet

```yaml
id: efficientnet
name: EfficientNet
full_name: "高效网络：重新思考卷积神经网络的模型缩放 (EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks)"
year: "2019"
org: Google
paper_url: "https://arxiv.org/abs/1905.11946"
category: foundation
parent: "—"
motivation: "提出复合缩放方法，统一平衡网络深度、宽度和分辨率三个维度，以更少参数和计算量实现更高精度"
```

#### 📝 一句话总结

EfficientNet 提出了一种**复合缩放方法（Compound Scaling）**，通过同时按固定比例缩放网络深度、宽度和输入分辨率三个维度，结合神经架构搜索（NAS）得到的高效基线网络 EfficientNet-B0，构建了 B0–B7 系列模型，在 ImageNet 上以 8.4 倍更少的参数达到了当时最优的 84.3% top-1 准确率。

#### 🎯 核心要点

- **复合缩放方法**：提出统一缩放深度（\(d\)）、宽度（\(w\)）和分辨率（\(r\)）三个维度，使用用户指定的复合系数 \(\phi\) 控制总计算量
- **缩放公式**：\(d = \alpha^\phi,\ w = \beta^\phi,\ r = \gamma^\phi\)，约束 \(\alpha \cdot \beta^2 \cdot \gamma^2 \approx 2\)，FLOPS 约增长 \(2^\phi\) 倍
- **关键观察**：单一维度缩放存在收益递减（diminishing returns），平衡三个维度的缩放才能获得最佳精度-效率权衡
- **EfficientNet-B0 基线**：通过 NAS 搜索得到（搜索空间同 MnasNet），以 MBConv（移动倒置瓶颈）+ Squeeze-and-Excitation 为核心模块
- **搜索到的最优缩放系数**：\(\alpha=1.2,\ \beta=1.1,\ \gamma=1.15\)
- **ImageNet SOTA**：EfficientNet-B7 达到 84.3% top-1 准确率，仅 66M 参数、37B FLOPS，比 GPipe 小 8.4 倍、快 6.1 倍
- **迁移学习**：在 8 个数据集中的 5 个达到 SOTA，平均参数减少 9.6 倍
- **通用性验证**：复合缩放方法在 MobileNet 和 ResNet 上同样有效，优于单维度缩放

#### 🔬 深入细节

##### 核心示意图

![EfficientNet 复合缩放方法示意图](https://ar5iv.labs.arxiv.org/html/1905.11946/assets/x2.png)
*图：模型缩放方法对比。(a) 基线网络；(b) 仅增加宽度；(c) 仅增加深度；(d) 仅增加分辨率；(e) 本文提出的复合缩放方法，同时平衡三个维度。*

##### EfficientNet-B0 基线架构

```
┌──────────┬───────────────────────┬──────────────┬──────────┬────────┐
│  Stage   │      Operator         │  Resolution  │ Channels │ Layers │
├──────────┼───────────────────────┼──────────────┼──────────┼────────┤
│    1     │ Conv3x3               │  224 × 224   │    32    │   1    │
│    2     │ MBConv1, k3×3         │  112 × 112   │    16    │   1    │
│    3     │ MBConv6, k3×3         │  112 × 112   │    24    │   2    │
│    4     │ MBConv6, k5×5         │   56 × 56    │    40    │   2    │
│    5     │ MBConv6, k3×3         │   28 × 28    │    80    │   3    │
│    6     │ MBConv6, k5×5         │   14 × 14    │   112    │   3    │
│    7     │ MBConv6, k5×5         │   14 × 14    │   192    │   4    │
│    8     │ MBConv6, k3×3         │    7 × 7     │   320    │   1    │
│    9     │ Conv1x1 & Pooling & FC│    7 × 7     │  1280    │   1    │
└──────────┴───────────────────────┴──────────────┴──────────┴────────┘
```
*表：EfficientNet-B0 架构。MBConv\(N\) 表示扩展比为 \(N\) 的移动倒置瓶颈卷积（Mobile Inverted Bottleneck Conv），所有 MBConv 块均包含 Squeeze-and-Excitation 优化。*

##### 复合缩放伪代码

```python
# EfficientNet 复合缩放方法
# Step 1: 在基线模型上搜索最优缩放系数
phi = 1  # 固定 φ=1，假设可用资源翻倍
# 网格搜索 α, β, γ，约束: α · β² · γ² ≈ 2
best_alpha, best_beta, best_gamma = grid_search(
    constraint=lambda a, b, g: a * b**2 * g**2 ≈ 2
)
# 搜索结果: α=1.2, β=1.1, γ=1.15

# Step 2: 固定 α, β, γ，用不同 φ 缩放得到 B1-B7
alpha, beta, gamma = 1.2, 1.1, 1.15
for phi in [1, 2, 3, 3.5, 4, 5, 6.5]:  # B1 到 B7
    depth_coeff  = alpha ** phi   # 深度缩放系数
    width_coeff  = beta  ** phi   # 宽度缩放系数
    resolution   = int(base_resolution * gamma ** phi)  # 输入分辨率
    # FLOPS ≈ base_flops * 2^φ
    model = scale_baseline(EfficientNet_B0, depth_coeff, width_coeff, resolution)
```

##### 动机与背景

卷积神经网络的性能提升传统上依赖于增大模型规模，但如何高效地缩放模型一直缺乏系统性研究。此前的工作通常只关注单一维度的缩放：

- **深度缩放**（如 ResNet-18 → ResNet-200）：增加网络层数，能学习更复杂的特征，但过深的网络面临梯度消失问题，训练困难
- **宽度缩放**（如 WideResNet）：增加每层通道数，能捕获更细粒度的特征，但浅而宽的网络难以学习高层语义特征
- **分辨率缩放**：使用更大的输入图像，能获得更精细的特征模式，但高分辨率带来的精度增益在极高分辨率时迅速递减

> 💡 **关键观察**：论文通过系统实验发现，单独缩放任何一个维度都存在**收益递减**现象——当模型达到一定规模后，继续在单一维度上增加资源带来的精度提升越来越小。更重要的是，**平衡缩放所有三个维度**才能获得最佳的精度-效率权衡。

##### 核心机制：复合缩放方法

论文将模型缩放形式化为一个优化问题。给定基线网络的每一层 \(i\) 的操作 \(\hat{F}_i\)、输入张量维度 \(\langle H_i, W_i, C_i \rangle\)，目标是在给定资源约束下最大化模型精度：

$$\max_{d, w, r} \text{Accuracy}\big(\mathcal{N}(d, w, r)\big)$$

$$\text{s.t.} \quad \mathcal{N}(d, w, r) = \bigodot_{i=1..s} \hat{F}_i^{d \cdot \hat{L}_i}\big(X_{\langle r \cdot \hat{H}_i,\ r \cdot \hat{W}_i,\ w \cdot \hat{C}_i \rangle}\big)$$

$$\text{Memory}(\mathcal{N}) \leq \text{target\_memory}, \quad \text{FLOPS}(\mathcal{N}) \leq \text{target\_flops}$$

其中 \(d, w, r\) 分别是深度、宽度和分辨率的缩放系数。

为了简化搜索空间，论文提出使用**单一复合系数 \(\phi\)** 统一控制三个维度的缩放：

$$d = \alpha^\phi, \quad w = \beta^\phi, \quad r = \gamma^\phi$$

$$\text{s.t.} \quad \alpha \cdot \beta^2 \cdot \gamma^2 \approx 2, \quad \alpha \geq 1, \quad \beta \geq 1, \quad \gamma \geq 1$$

> ⚠️ **约束条件的直觉**：卷积层的 FLOPS 与 \(d\)（深度）成正比，与 \(w^2\)（宽度的平方，因为卷积核输入输出通道都缩放）成正比，与 \(r^2\)（分辨率的平方，因为特征图面积缩放）成正比。因此总 FLOPS 正比于 \(\alpha^\phi \cdot (\beta^\phi)^2 \cdot (\gamma^\phi)^2 = (\alpha \cdot \beta^2 \cdot \gamma^2)^\phi\)。当 \(\alpha \cdot \beta^2 \cdot \gamma^2 = 2\) 时，总 FLOPS 约增长 \(2^\phi\) 倍，使得用户可以通过 \(\phi\) 精确控制计算预算。

##### 两步缩放流程

**Step 1**：固定 \(\phi = 1\)（即资源翻倍），在 EfficientNet-B0 上进行小规模网格搜索，找到最优的 \(\alpha, \beta, \gamma\)。搜索结果为：

$$\alpha = 1.2, \quad \beta = 1.1, \quad \gamma = 1.15$$

验证：\(1.2 \times 1.1^2 \times 1.15^2 = 1.2 \times 1.21 \times 1.3225 \approx 1.92 \approx 2\) ✓

**Step 2**：固定 \(\alpha, \beta, \gamma\) 为常数，通过调整 \(\phi\) 得到不同规模的模型（B1–B7）。这种方法的优势在于只需在小模型上搜索一次，即可应用于所有规模。

##### EfficientNet-B0 的 NAS 搜索

基线网络 EfficientNet-B0 通过神经架构搜索（NAS）获得，搜索空间与 MnasNet 相同，优化目标同时考虑准确率和效率：

$$\text{ACC}(m) \times \left[\frac{\text{FLOPS}(m)}{T}\right]^w$$

其中 \(T = 400M\) FLOPS 为目标计算量，\(w = -0.07\) 为权重因子。搜索得到的 B0 架构以 **MBConv（移动倒置瓶颈卷积）** 为核心构建块，每个 MBConv 块包含：

1. **逐点卷积（1×1）扩展**：将通道数扩展 \(N\) 倍（扩展比）
2. **深度可分离卷积（3×3 或 5×5）**：在扩展后的通道上进行空间卷积
3. **Squeeze-and-Excitation（SE）模块**：通过全局平均池化 → FC → ReLU → FC → Sigmoid 学习通道注意力权重
4. **逐点卷积（1×1）压缩**：将通道数压缩回目标维度
5. **残差连接**：当输入输出维度匹配时添加跳跃连接

##### 训练细节

- **优化器**：RMSProp（decay=0.9, momentum=0.9）
- **激活函数**：SiLU（Swish-1），即 \(x \cdot \sigma(x)\)
- **数据增强**：AutoAugment
- **正则化**：
  - 权重衰减 1e-5
  - Stochastic Depth（存活概率 0.8）
  - Dropout 从 B0 的 0.2 线性增加到 B7 的 0.5
- **学习率**：初始 0.256，每 2.4 个 epoch 衰减 0.97
- **Batch Norm**：momentum=0.99

##### ImageNet 实验结果

| 模型 | Top-1 Acc. | #Params | #FLOPS | 对比 |
|------|-----------|---------|--------|------|
| EfficientNet-B0 | 77.1% | 5.3M | 0.39B | 基线 |
| EfficientNet-B1 | 79.1% | 7.8M | 0.70B | 比 ResNet-152 (77.8%) 更准，参数少 7.6× |
| EfficientNet-B2 | 80.1% | 9.2M | 1.0B | 媲美 Inception-ResNet-v2 (80.1%) |
| EfficientNet-B3 | 81.6% | 12M | 1.8B | 超越 ResNeXt-101 (80.9%)，FLOPS 少 18× |
| EfficientNet-B4 | 82.9% | 19M | 4.2B | 超越 NASNet-A (82.7%)，参数少 4.7× |
| EfficientNet-B5 | 83.6% | 30M | 9.9B | 超越 AmoebaNet-C (83.5%) |
| EfficientNet-B6 | 84.0% | 43M | 19B | — |
| EfficientNet-B7 | **84.3%** | 66M | 37B | 媲美 GPipe (84.3%)，参数少 **8.4×**，快 **6.1×** |

##### 与传统方法的区别

| 对比维度 | 传统缩放方法 | EfficientNet 复合缩放 |
|---------|------------|---------------------|
| 缩放维度 | 通常只缩放单一维度（深度 OR 宽度 OR 分辨率） | 同时平衡缩放三个维度 |
| 缩放策略 | 手动设计，缺乏理论指导 | 基于约束优化，用 \(\phi\) 统一控制 |
| 基线网络 | 手动设计（ResNet、VGG 等） | NAS 自动搜索高效基线 |
| 搜索成本 | 每个规模独立设计 | 只在小模型上搜索一次，复用到所有规模 |
| 效率 | 参数和 FLOPS 增长不可控 | FLOPS 精确按 \(2^\phi\) 增长 |

> 💡 **核心洞察**：更高分辨率的图像需要更深的网络来捕获更大的感受野，也需要更宽的网络来捕获更精细的模式。这三个维度之间存在内在耦合关系，因此必须协调缩放才能获得最优性能。

#### 🧪 练习题

```yaml
question: "EfficientNet 复合缩放公式中约束 α·β²·γ² ≈ 2 的主要目的是什么？"
options:
  - "确保模型参数量恰好翻倍"
  - "使总 FLOPS 随复合系数 φ 按 2^φ 倍增长，便于精确控制计算预算"
  - "保证三个缩放维度的系数之和为常数"
  - "限制搜索空间大小以加速 NAS 搜索过程"
answer: 1
explain: "由于 FLOPS 正比于 d·w²·r² = (α·β²·γ²)^φ，当 α·β²·γ²=2 时，FLOPS 增长为 2^φ，用户可通过 φ 直接控制计算预算的倍数增长。"
```