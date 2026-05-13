### Non-local Neural Networks

```yaml
id: non_local
name: Non-local Neural Networks
full_name: 非局部神经网络 (Non-local Neural Networks)
year: "2018"
org: CMU / Facebook AI Research (FAIR)
paper_url: https://arxiv.org/abs/1711.07971
category: video_vision
parent: —
motivation: 提出非局部操作捕获视频与图像中的远程时空依赖，克服卷积/循环网络仅建模局部邻域的局限
```

#### 📝 一句话总结

提出了非局部（Non-local）操作作为通用神经网络构建模块，通过计算所有位置间的加权响应直接捕获长程依赖关系，在视频分类、目标检测与分割、姿态估计等任务上均取得显著提升。

#### 🎯 核心要点

- 提出通用的非局部操作公式：\(y_i = \frac{1}{\mathcal{C}(x)} \sum_{\forall j} f(x_i, x_j) \cdot g(x_j)\)，一次操作即可聚合全局信息
- 4 种成对函数实例化：Gaussian、Embedded Gaussian（等价于 self-attention）、Dot-product、Concatenation，实验证明效果相近
- 设计可即插即用的 Non-local Block：包含残差连接 \(z_i = W_z y_i + x_i\)，可嵌入任意已有架构的任意位置
- 效率优化：通道瓶颈（bottleneck）减半通道数 + 子采样（subsampling）将计算量降至约 1/4
- 视频分类 Kinetics：NL I3D ResNet-101 达到 77.7% top-1（128帧），超越当时所有 RGB 方法
- 视频分类 Charades：NL I3D 达到 39.5% mAP，超越 2017 竞赛冠军
- 静态图像 COCO：仅加 1 个 NL block，目标检测 AP 提升 ~1 点，关键点检测 AP 提升 1.4 点
- 证明非局部建模与 3D 卷积互补：NL + I3D 优于单独使用任一方法

#### 🔬 深入细节

![Non-local Block 结构示意图](https://ar5iv.labs.arxiv.org/html/1711.07971/assets/x2.png)
*图：Non-local Block 的计算图。输入 x 经过 θ、φ、g 三个变换后计算成对关系，输出经 W_z 投影后与输入残差相加。*

```python
# Non-local Block 伪代码 (Embedded Gaussian 版本)
def non_local_block(x):
    """
    x: 输入特征 [B, C, T, H, W] (视频) 或 [B, C, H, W] (图像)
    """
    batch, C, *spatial = x.shape
    
    # 1x1x1 卷积降维 (bottleneck, C -> C//2)
    theta = W_theta(x)  # [B, C//2, T*H*W]  query
    phi = W_phi(x)      # [B, C//2, T*H*W]  key
    g = W_g(x)          # [B, C//2, T*H*W]  value
    
    # 可选: 对 phi 和 g 进行子采样 (max pooling) 减少计算
    phi = max_pool(phi)  # [B, C//2, T*H*W / 4]
    g = max_pool(g)      # [B, C//2, T*H*W / 4]
    
    # 计算成对关系矩阵 (Embedded Gaussian)
    attn = softmax(theta^T @ phi)  # [B, T*H*W, T*H*W/4]
    
    # 加权聚合
    y = attn @ g^T  # [B, T*H*W, C//2]
    
    # 1x1x1 卷积恢复维度 + 残差连接
    y = W_z(y)  # [B, C, T, H, W], W_z 的 BN 初始化为 0
    return y + x  # 残差连接，初始时 block 为恒等映射
```

##### 动机与背景

传统深度网络依赖卷积和循环操作逐层堆叠来扩大感受野，存在以下根本局限：

1. **局部性**：卷积核仅覆盖局部邻域（如 3×3 或 3×3×3），捕获远程依赖需要堆叠大量层，信号在多层传播中逐渐衰减
2. **序列瓶颈**：RNN/LSTM 按时间步顺序处理，难以直接建模相距较远的帧间关系，且梯度传播路径长
3. **计算效率**：大卷积核（如全局卷积）虽然理论上可覆盖全局，但参数量和计算量不可接受

受经典计算机视觉中非局部均值（Non-local Means）去噪算法的启发，作者提出将"非局部操作"引入深度网络——让每个位置直接与所有其他位置交互，一步到位地捕获全局依赖。

##### 核心机制：非局部操作

**通用公式定义**：

$$y_i = \frac{1}{\mathcal{C}(x)} \sum_{\forall j} f(x_i, x_j) \cdot g(x_j)$$

其中：
- \(i\) 是输出位置（时空中的某一点），\(j\) 枚举所有可能位置
- \(f(x_i, x_j)\) 是成对函数，计算位置 \(i\) 和 \(j\) 之间的关系/相似度
- \(g(x_j) = W_g x_j\) 是对位置 \(j\) 特征的线性变换
- \(\mathcal{C}(x)\) 是归一化因子

> 💡 关键直觉：非局部操作本质上是一种"软注意力"——对所有位置的特征做加权平均，权重由位置间的相似度决定。这使得网络可以在单层内直接"看到"并利用远处的信息。

**四种成对函数 \(f\) 的实例化**：

| 变体 | 公式 | 归一化 \(\mathcal{C}(x)\) | 特点 |
|------|------|--------------------------|------|
| Gaussian | \(f = e^{x_i^T x_j}\) | \(\sum_j f(x_i, x_j)\) | 原始空间计算相似度 |
| Embedded Gaussian | \(f = e^{\theta(x_i)^T \phi(x_j)}\) | \(\sum_j f(x_i, x_j)\) | **等价于 self-attention** |
| Dot-product | \(f = \theta(x_i)^T \phi(x_j)\) | \(N\)（位置总数） | 无 softmax，更简洁 |
| Concatenation | \(f = \text{ReLU}(w_f^T [\theta(x_i), \phi(x_j)])\) | \(N\) | 非对称关系建模 |

其中 \(\theta(x_i) = W_\theta x_i\)，\(\phi(x_j) = W_\phi x_j\) 为嵌入变换。

> ⚠️ 重要发现：实验表明四种变体效果相近（Kinetics 上差异 < 0.5%），说明**非局部行为本身**（而非特定的注意力归一化方式）才是性能提升的关键。

##### Non-local Block 的工程设计

为了将非局部操作无缝嵌入现有网络，作者设计了 Non-local Block：

$$z_i = W_z y_i + x_i$$

关键设计选择：

1. **残差连接**：输出 = 非局部响应 + 原始输入。\(W_z\) 的 BatchNorm 层初始化为零，使得初始时整个 block 等价于恒等映射，不破坏预训练权重
2. **瓶颈结构**：\(W_\theta, W_\phi, W_g\) 将通道数从 \(C\) 降至 \(C/2\)，\(W_z\) 再恢复为 \(C\)，计算量减半
3. **子采样技巧**：对 \(\phi\) 和 \(g\) 的空间维度做 max pooling（步长为2），将注意力矩阵大小缩减为 1/4，不影响性能

##### 时空域中的非局部操作

在视频理解中，非局部操作可以在不同维度上应用：
- **时空联合**（spacetime）：\(j\) 遍历所有帧的所有空间位置 → 效果最优
- **仅空间**（space-only）：\(j\) 仅遍历当前帧内的空间位置
- **仅时间**（time-only）：\(j\) 仅遍历同一空间位置在不同帧的特征

实验证明时空联合版本最优（73.8% vs 72.9%/73.1%），因为它能同时捕获空间中的物体关系和时间中的运动模式。

##### 与 Self-Attention 的关系

作者明确指出 Embedded Gaussian 版本的非局部操作**数学上等价于 Transformer 中的 self-attention**：

$$y = \text{softmax}(x^T W_\theta^T W_\phi x) \cdot g(x)$$

但本文的贡献在于：
1. 将 self-attention 从 NLP 序列推广到**时空视觉特征**
2. 证明 softmax 归一化并非必要（dot-product 版本同样有效）
3. 提出了实用的 block 设计使其可嵌入任意 CNN 架构

##### 实验结果

**Kinetics 视频分类**：

| 模型 | Backbone | 帧数 | Top-1 (%) |
|------|----------|------|-----------|
| C2D baseline | R-50 | 32 | 71.8 |
| NL C2D (5 blocks) | R-50 | 32 | 73.8 |
| NL C2D (5 blocks) | R-101 | 32 | 75.1 |
| I3D | R-50 | 32 | 73.3 |
| NL I3D (5 blocks) | R-50 | 32 | 74.9 |
| NL I3D (5 blocks) | R-101 | 128 | **77.7** |

**COCO 目标检测/分割**（Mask R-CNN + 1 NL block）：

| Backbone | AP^box (baseline → +NL) | AP^mask (baseline → +NL) |
|----------|------------------------|--------------------------|
| R-50 | 38.0 → 39.0 (+1.0) | 34.6 → 35.5 (+0.9) |
| R-101 | 39.5 → 40.8 (+1.3) | 36.0 → 37.1 (+1.1) |
| X-152 | 44.1 → 45.0 (+0.9) | 39.7 → 40.3 (+0.6) |

**COCO 关键点检测**：R-101 baseline 65.1 AP → +4 NL in head + 1 NL in backbone = 66.5 AP (+1.4)

> 💡 关键洞察：即使在极深的 X-152 上，1 个 NL block 仍能带来提升，说明**非局部依赖未被现有模型充分捕获**，无论深度/容量如何增加。

#### 🧪 练习题

```yaml
question: "Non-local Neural Networks 中，Embedded Gaussian 版本的非局部操作与以下哪个机制数学上等价？"
options:
  - "LSTM 中的门控机制"
  - "Transformer 中的 self-attention"
  - "ResNet 中的跳跃连接"
  - "GAN 中的判别器"
answer: 1
explain: "Embedded Gaussian 使用 softmax(θ(x_i)^T φ(x_j)) 作为权重对 g(x_j) 加权求和，这与 Transformer self-attention 的 Query-Key-Value 机制在数学形式上完全一致。"
```