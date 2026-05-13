### Learning to Learn by Gradient Descent by Gradient Descent

```yaml
id: l2l
title: "Learning to Learn by Gradient Descent by Gradient Descent"
authors: ["Marcin Andrychowicz", "Misha Denil", "Sergio Gómez Colmenarejo", "Matthew W. Hoffman", "David Pfau", "Tom Schaul", "Brendan Shillingford", "Nando de Freitas"]
venue: "NeurIPS 2016"
year: 2016
url: "https://arxiv.org/abs/1606.04474"
topic: ["meta-learning", "learned optimization", "LSTM optimizer"]
```

---

## 📝 一句话总结

本文提出用 LSTM 网络参数化优化器的更新规则，通过在优化轨迹上反向传播（即"用梯度下降来学习梯度下降"），使优化器能够自动学习适应特定任务分布的优化策略，在多个任务上超越 ADAM、RMSprop 等手工设计的优化器。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 手工设计的优化算法（SGD、ADAM等）依赖人类专家经验，难以针对特定问题类自动调优 |
| **动机** | 将优化器设计视为学习问题：既然 No Free Lunch 定理表明没有通用最优优化器，不如针对特定任务分布学习专用优化器 |
| **方法** | 用 LSTM 网络 $m(\nabla_t, h_t, \phi)$ 替代手工更新规则，输入当前梯度和隐状态，输出参数更新量；通过在展开的优化轨迹上对 $\phi$ 求梯度来训练 |
| **核心公式** | $\theta_{t+1} = \theta_t + g_t$，其中 $\begin{bmatrix} g_t \\ h_{t+1} \end{bmatrix} = m(\nabla_t, h_t, \phi)$ |
| **关键设计** | Coordinatewise 架构：每个参数维度共享 LSTM 权重但维护独立隐状态，实现参数规模无关性 |
| **实验结果** | 在二次函数、MNIST MLP、CIFAR-10 CNN、Neural Art 四个任务上均超越基线优化器，且展现出良好的泛化能力（跨架构、跨分辨率） |
| **局限性** | 激活函数变化（sigmoid→ReLU）时泛化较差；训练需要展开计算图，内存开销大 |

---

## 🔬 深入细节

### 核心架构图

![Figure 3: LSTM Optimizer Architecture](https://ar5iv.labs.arxiv.org/html/1606.04474/assets/x3.png)

*Figure 3: 一步 LSTM 优化器的计算流程。所有 LSTM 共享参数 $\phi$，但每个 optimizee 参数维度维护独立的隐状态 $h_t$。*

![Figure 2: Computational Graph](https://ar5iv.labs.arxiv.org/html/1606.04474/assets/x2.png)

*Figure 2: 优化器梯度计算图。实线表示梯度流动路径，虚线表示被截断的梯度（假设 $\partial \nabla_t / \partial \phi = 0$，避免计算 $f$ 的二阶导数）。*

---

### 算法伪代码

```
Algorithm: Training the LSTM Optimizer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: 任务分布 D_f, 展开步数 T, 权重 {w_t}
Output: 优化器参数 φ

1. 初始化 LSTM 参数 φ
2. Repeat until convergence:
3.   采样任务 f ~ D_f
4.   采样初始参数 θ_0 ~ N(0, σ²I)
5.   初始化 LSTM 隐状态 h_0 = 0
6.   For t = 1 to T:
7.     计算梯度: ∇_t = ∂f(θ_t) / ∂θ_t
8.     预处理: ∇̃_t = preprocess(∇_t)        // log-scale preprocessing
9.     LSTM前向: [g_t, h_{t+1}] = m(∇̃_t, h_t, φ)  // coordinatewise
10.    更新参数: θ_{t+1} = θ_t + g_t
11.  计算元损失: L(φ) = Σ_{t=1}^{T} w_t · f(θ_t)
12.  更新优化器: φ ← φ - α · ∂L(φ)/∂φ      // 使用 ADAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Note: 梯度 ∂L/∂φ 通过 truncated BPTT 计算，
      忽略 ∂∇_t/∂φ 以避免二阶导数。
```

---

### 详细解释

#### 1. 从手工优化器到学习优化器的范式转变

传统优化算法（如 SGD: $\theta_{t+1} = \theta_t - \alpha \nabla f(\theta_t)$，或 ADAM 结合一阶/二阶矩估计）都是人类根据数学直觉手工设计的更新规则。本文的核心洞察是：**这些更新规则本身可以被参数化并通过数据驱动的方式学习**。具体地，作者将优化器建模为一个循环神经网络 $m$，其参数 $\phi$ 通过在大量优化任务上的表现来训练。这构成了一个双层优化问题：外层优化 $\phi$（元学习），内层用学到的优化器优化具体任务参数 $\theta$（基学习）。元目标函数为：

$$\mathcal{L}(\phi) = \mathbb{E}_f\left[\sum_{t=1}^{T} w_t f(\theta_t)\right]$$

其中 $w_t = 1$ 使得整条优化轨迹都提供训练信号，解决了仅用终点损失时 BPTT 效率低下的问题。

#### 2. Coordinatewise LSTM 架构的精妙设计

直接用一个 RNN 处理所有参数的梯度向量是不可行的——一个有数万参数的网络需要巨大的隐状态。本文的关键工程创新是 **coordinatewise 分解**：对 optimizee 的每个参数标量 $\theta_i$，使用同一个 LSTM（共享权重 $\phi$）但维护独立的隐状态 $h_t^{(i)}$。这意味着：
- LSTM 只需处理标量输入（单个坐标的梯度），网络极小（2层×20隐单元）
- 参数量与 optimizee 规模无关，天然支持不同大小的网络
- 类似 ADAM/RMSprop 的 coordinatewise 特性，但通过隐状态可以学习更复杂的动态规则（如自适应动量）
- 对参数排列顺序不变（permutation invariant）

对于 CIFAR-10 实验中的 CNN，作者进一步引入两个 LSTM 分别处理卷积层和全连接层参数，因为这两类参数的梯度统计特性差异较大。

#### 3. 梯度预处理与训练稳定性

由于不同层参数的梯度量级可能相差数个数量级，直接输入原始梯度会导致 LSTM 难以训练。作者提出了 log-scale 预处理方案：

$$\nabla^k \rightarrow \begin{cases} \left(\frac{\log(|\nabla|)}{p}, \operatorname{sgn}(\nabla)\right) & \text{if } |\nabla| \geq e^{-p} \\ (-1, e^p \nabla) & \text{otherwise} \end{cases}$$

其中 $p=10$ 控制小梯度的截断阈值。这将梯度的幅度信息压缩到对数尺度，同时保留符号信息，使 LSTM 能够稳健地处理跨越多个数量级的输入。此外，训练时使用 truncated BPTT（展开20步），并假设 $\partial \nabla_t / \partial \phi = 0$（即忽略优化器参数对 optimizee 梯度的间接影响），避免了计算代价高昂的二阶导数。

#### 4. 泛化能力与局限性

实验展示了学习优化器令人印象深刻的泛化能力：在 MNIST 上用 1层20单元 sigmoid MLP 训练的优化器，能泛化到 40单元、2层、甚至不同数据集（CIFAR子集）。在 Neural Art 任务中，用 64×64 分辨率训练的优化器能处理 128×128 图像和新风格。然而，当 optimizee 的动态特性发生根本变化时（如 sigmoid→ReLU 激活函数），泛化会失败。这表明学习优化器捕获的是特定梯度流动模式下的优化策略，而非通用的优化原理。

---

## 🧪 练习题

### Q1: 概念理解
**问题**：为什么本文选择 coordinatewise 架构而非让 LSTM 直接处理整个梯度向量？如果 optimizee 有 $n$ 个参数，两种方案的 LSTM 参数量分别是什么量级？

<details><summary>参考答案</summary>

Coordinatewise 架构的选择基于可扩展性考虑：
- **全连接方案**：LSTM 输入维度为 $n$（梯度向量维度），隐状态需要 $O(n)$ 维才能捕获所有参数间的交互，LSTM 参数量为 $O(n^2)$。对于 $n=10^4$ 的网络，这意味着 $10^8$ 量级的优化器参数，完全不可行。
- **Coordinatewise 方案**：LSTM 输入维度为常数（单个标量梯度经预处理后为2维），隐状态维度固定（如20），LSTM 参数量为 $O(1)$（与 $n$ 无关，本文约880个参数）。代价是无法直接建模参数间的交互。

这种设计类似于 ADAM 等优化器对每个参数独立维护动量/方差估计的思路，但通过 LSTM 隐状态可以学习更丰富的单坐标历史信息整合策略。

</details>

---

### Q2: 公式推导
**问题**：写出元损失 $\mathcal{L}(\phi)$ 对优化器参数 $\phi$ 的梯度表达式（展开2步，$T=2, w_1=w_2=1$），并解释为什么忽略 $\partial \nabla_t / \partial \phi$ 是合理的近似。

<details><summary>参考答案</summary>

设 $T=2$，则 $\mathcal{L}(\phi) = f(\theta_1) + f(\theta_2)$，其中：
- $\theta_1 = \theta_0 + g_0$，$g_0 = m(\nabla_0, h_0, \phi)$（$\nabla_0 = \nabla f(\theta_0)$ 不依赖 $\phi$）
- $\theta_2 = \theta_1 + g_1$，$g_1 = m(\nabla_1, h_1, \phi)$，$\nabla_1 = \nabla f(\theta_1)$

完整梯度：
$$\frac{\partial \mathcal{L}}{\partial \phi} = \nabla f(\theta_1) \frac{\partial g_0}{\partial \phi} + \nabla f(\theta_2)\left(\frac{\partial g_0}{\partial \phi} + \frac{\partial g_1}{\partial \phi} + \frac{\partial g_1}{\partial \nabla_1}\frac{\partial \nabla_1}{\partial \theta_1}\frac{\partial g_0}{\partial \phi}\right)$$

忽略 $\partial \nabla_t / \partial \phi$ 意味着将 $\nabla_1$ 视为不依赖 $\phi$ 的常数，简化为：
$$\frac{\partial \mathcal{L}}{\partial \phi} \approx \nabla f(\theta_1) \frac{\partial g_0}{\partial \phi} + \nabla f(\theta_2)\left(\frac{\partial g_0}{\partial \phi} + \frac{\partial g_1}{\partial \phi}\right)$$

这是合理的因为：(1) 计算 $\partial \nabla_1/\partial \phi$ 需要 $f$ 的 Hessian（二阶导数），计算代价高；(2) 在优化初期，$\phi$ 对 $\nabla_t$ 的间接影响相对较小；(3) 实验表明这种近似不影响学习效果。

</details>

---

### Q3: 实验分析
**问题**：论文发现 LSTM 优化器从 sigmoid 激活训练后无法泛化到 ReLU 激活的网络。请从梯度流动的角度解释这一现象，并提出一种可能的改进方案。

<details><summary>参考答案</summary>

**原因分析**：
- Sigmoid 的梯度 $\sigma'(x) = \sigma(x)(1-\sigma(x)) \in (0, 0.25]$，梯度始终较小且平滑
- ReLU 的梯度为 $\{0, 1\}$，存在大量精确为零的梯度（dead neurons）和不衰减的梯度
- LSTM 优化器在 sigmoid 上训练时，学到的策略可能包括：对小梯度进行放大、平滑处理等。面对 ReLU 的 0/1 二值梯度模式，这些策略完全不适用

**改进方案**：
1. **多任务元训练**：在包含多种激活函数的任务分布上训练优化器
2. **条件优化器**：给 LSTM 额外输入描述当前层类型/激活函数的元信息
3. **梯度统计特征**：除了原始梯度外，输入梯度的局部统计量（如非零比例），帮助优化器识别不同的梯度模式
4. **分层优化器**：类似 CIFAR 实验中对 conv/fc 使用不同 LSTM，对不同激活函数类型使用不同优化器模块

</details>

---

### Q4: 扩展思考
**问题**：本文的方法与后续工作 MAML (Model-Agnostic Meta-Learning) 在"学习如何学习"这一目标上有何本质区别？各自的优势和适用场景是什么？

<details><summary>参考答案</summary>

| 维度 | L2L (本文) | MAML |
|------|-----------|------|
| **学什么** | 学习优化器的更新规则 $g_t = m(\nabla_t, h_t, \phi)$ | 学习好的初始化 $\theta_0$，使得几步梯度下降即可适应新任务 |
| **参数化** | 额外引入 LSTM 参数 $\phi$ | 不引入额外参数，直接优化模型参数的初始值 |
| **优化器** | 学习得到的（黑盒） | 固定为标准梯度下降 |
| **泛化方式** | 通过学到的更新规则泛化 | 通过好的初始化位置泛化 |
| **优势** | 可学习任意复杂的优化策略（动量、自适应学习率等） | 模型无关、简单优雅、不增加推理时参数 |
| **劣势** | 需要额外的优化器网络、泛化到训练分布外较难 | 假设几步梯度下降足够、对任务相似性要求高 |
| **适用场景** | 任务分布明确且需要高效优化的场景 | Few-shot learning、快速适应新任务 |

本质区别：L2L 学习"怎么走"（更新规则），MAML 学习"从哪出发"（初始化）。两者可以结合：用学习的优化器从学习的初始化开始优化。

</details>