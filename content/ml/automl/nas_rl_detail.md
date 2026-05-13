### Neural Architecture Search with Reinforcement Learning

```yaml
id: nas_rl
title: "Neural Architecture Search with Reinforcement Learning"
authors: ["Barret Zoph", "Quoc V. Le"]
affiliations: ["Google Brain"]
venue: "ICLR 2017"
year: 2017
arxiv_id: "1611.01578"
topics: ["AutoML", "Neural Architecture Search", "Reinforcement Learning", "REINFORCE"]
significance: 9
readability: 8
innovation: 9
```

---

## 📝 一句话总结

本文提出使用 RNN 控制器以自回归方式生成神经网络架构描述（变长token序列），并通过 REINFORCE 策略梯度以验证集精度为奖励信号训练控制器，在 CIFAR-10（3.65% error）和 Penn Treebank（62.4 perplexity）上超越人类设计的最优架构。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 神经网络架构设计依赖大量专家知识和反复试错，能否自动化？ |
| **核心思想** | 将架构设计建模为序列决策问题：RNN 控制器逐步输出架构超参数（filter size、stride、连接等），子网络训练后的验证精度作为奖励，用 REINFORCE 更新控制器 |
| **关键创新** | ① 变长搜索空间（不同于固定长度的超参优化）；② 用 set-selection attention 实现 skip connection 预测；③ 树结构搜索空间设计新型 RNN cell |
| **主要结果** | CIFAR-10: 3.65% test error（超越 DenseNet 3.74%）；PTB word: 62.4 perplexity（超越 RHN 66.0）；PTB char: 1.214 BPC（SOTA） |
| **计算代价** | 800 GPU 并行训练，搜索 12800 个架构（CNN）/ 15000 个架构（RNN cell） |
| **局限性** | 计算成本极高；搜索空间需人工设计；仅搜索单一重复结构而非全局拓扑 |

---

## 🔬 深入细节

### 示意图

**图1：NAS 整体流程**

![NAS Overview](https://ar5iv.labs.arxiv.org/html/1611.01578/assets/x1.png)

控制器 RNN 采样一个架构 → 构建子网络并训练至收敛 → 验证集精度作为奖励 \(R\) → 用 REINFORCE 更新控制器参数 \(\theta_c\)。

**图2：控制器生成 CNN 架构的过程**

![Controller sampling CNN](https://ar5iv.labs.arxiv.org/html/1611.01578/assets/x2.png)

控制器 RNN 每一步预测一个超参数（filter height → filter width → stride height → stride width → num filters），每层重复此过程。每个预测由 softmax 分类器完成，输出作为下一步输入。

**图3：分布式训练架构**

![Distributed training](https://ar5iv.labs.arxiv.org/html/1611.01578/assets/x3.png)

S=20 个参数服务器分片存储控制器权重，K=100 个控制器副本各采样 m=8 个子架构并行训练（共 800 GPU），梯度异步回传更新。

**图4：Skip Connection 的 Anchor Point 机制**

![Skip connections](https://ar5iv.labs.arxiv.org/html/1611.01578/assets/x4.png)

**图5：RNN Cell 的树结构搜索空间**

![Recurrent cell tree](https://ar5iv.labs.arxiv.org/html/1611.01578/assets/x5.png)

---

### 伪代码

```
Algorithm: Neural Architecture Search with REINFORCE
─────────────────────────────────────────────────────
Input: 搜索空间 S, 控制器 RNN 参数 θ_c, 基线 EMA b
Output: 最优架构 a*

1. Initialize θ_c randomly, b ← 0
2. for episode = 1, 2, ... do
3.   // 采样 m 个架构
4.   for k = 1 to m do
5.     a_k = Controller_RNN.sample(θ_c)    // 自回归生成 token 序列
6.     // token 序列: [filter_h, filter_w, stride_h, stride_w, num_filters] × L layers
7.     //           + skip connection decisions (sigmoid attention)
8.   end for
9.
10.  // 并行训练所有子网络
11.  for k = 1 to m do (in parallel)
12.    child_net_k = Build(a_k)
13.    Train child_net_k for E epochs
14.    R_k = Validate(child_net_k)          // 验证集精度作为奖励
15.  end for
16.
17.  // REINFORCE 梯度更新（带基线）
18.  b ← α * b + (1 - α) * mean(R_1:m)     // EMA 基线
19.  ∇θ_c ← (1/m) Σ_k Σ_t ∇log P(a_t^k | a_{<t}^k; θ_c) * (R_k - b)
20.  θ_c ← θ_c + lr * ∇θ_c                 // ADAM 更新
21.
22. end for
23. a* ← argmax_{a sampled} R(a)
24. return a*
```

---

### 方法解读

#### 1. 控制器 RNN 与搜索空间编码

NAS 的核心洞察是：**神经网络的结构可以用一个变长的 token 序列来描述**。控制器是一个两层 LSTM（35 hidden units），以自回归方式逐 token 生成架构描述。对于 CNN，每层需要预测 5 个超参数（filter height/width ∈ {1,3,5,7}，stride height/width ∈ {1,2,3}，filter 数量 ∈ {24,36,48,64}）；层数随训练进程递增（从 6 层开始，每 1600 个样本增加 2 层）。每个 token 由 softmax 分类器从离散候选集中采样，采样结果嵌入后作为下一步的输入。这种设计使搜索空间是**变长且组合爆炸**的——例如 RNN cell 搜索空间达 \(6 \times 10^{16}\) 种可能架构。

#### 2. REINFORCE 训练与方差控制

由于验证精度 \(R\) 对架构参数不可微，作者采用 Williams (1992) 的 REINFORCE 策略梯度：

$$\nabla_{\theta_c} J(\theta_c) = \frac{1}{m}\sum_{k=1}^{m}\sum_{t=1}^{T} \nabla_{\theta_c} \log P(a_t | a_{(t-1):1}; \theta_c)(R_k - b)$$

其中 \(b\) 是前序架构精度的**指数移动平均（EMA）基线**，用于降低梯度方差。关键的是，只要基线不依赖当前动作，梯度估计仍然无偏。CIFAR-10 实验中奖励为最后 5 个 epoch 最大验证精度的立方（\(R = \text{acc}^3\)），PTB 实验中奖励为 \(c / \text{perplexity}^2\)。这种奖励塑形（reward shaping）放大了好架构与差架构之间的信号差异。

#### 3. Skip Connection 的注意力机制

为了让搜索空间包含现代架构中的跳跃连接（如 ResNet），作者引入了 **set-selection attention** 机制。在第 \(N\) 层，控制器为前面 \(N-1\) 层各生成一个 sigmoid 概率：

$$P(\text{Layer } j \text{ is input to layer } i) = \sigma(v^T \tanh(W_{prev} \cdot h_j + W_{curr} \cdot h_i))$$

其中 \(h_j\) 和 \(h_i\) 分别是控制器在第 \(j\) 层和第 \(i\) 层 anchor point 处的隐状态。采样这些 sigmoid 决定哪些层作为当前层的输入。多个输入层在 depth 维度拼接（尺寸不同时 zero-pad）。未被任何层连接的输出层在最后全部拼接送入分类器。这一设计优雅地将离散的图结构决策纳入了可微分策略梯度框架。

#### 4. RNN Cell 的树结构搜索

对于循环架构搜索，作者将 RNN cell 的计算抽象为一棵**二叉树**：叶节点接收 \(x_t\) 和 \(h_{t-1}\) 的线性变换，内部节点执行两个子节点输出的组合。控制器需要为每个节点预测：(1) 组合方法（add 或 element-wise multiply）；(2) 激活函数（identity / tanh / sigmoid / ReLU）。此外还需预测 cell state \(c_{t-1}\) 注入的位置和 \(c_t\) 的输出位置。实验使用 base=8（8 个叶节点），搜索空间约 \(6 \times 10^{16}\)。最终发现的 NASCell 在 PTB word-level 上达到 62.4 perplexity，并成功迁移到 character-level（1.214 BPC）和机器翻译（+0.5 BLEU）任务。

#### 5. 大规模分布式训练

单个子网络训练需要数小时，为此作者采用**参数服务器 + 异步更新**的分布式方案。CNN 搜索使用 20 个参数服务器分片、100 个控制器副本、每副本采样 8 个架构 = 800 个子网络在 800 GPU 上并行训练。RNN cell 搜索使用 400 个控制器副本在 400 CPU 上训练（每副本 m=1），累积 10 个梯度后才做一次参数更新。整个 CNN 搜索过程评估了 12800 个架构，RNN 搜索评估了 15000 个架构。这一计算规模在当时是前所未有的，也成为后续工作（如 ENAS、DARTS）致力于降低搜索成本的主要动机。

---

## 🧪 练习题

**Q1（理解层）**：为什么 REINFORCE 中的基线 \(b\) 可以降低梯度方差但不引入偏差？请从数学角度简要证明。

<details><summary>参考答案</summary>

因为 \(\nabla_{\theta} \mathbb{E}[b] = b \cdot \nabla_{\theta} \sum_a P(a;\theta) = b \cdot \nabla_{\theta} 1 = 0\)。即常数基线乘以策略梯度的期望为零，所以减去基线不改变梯度期望（无偏），但通过减小 \((R-b)^2\) 的期望值来降低方差。

</details>

**Q2（分析层）**：NAS 的 skip connection 搜索使用 sigmoid（独立伯努利）而非 softmax（互斥选择）来决定输入连接，这一设计选择有什么优势和潜在问题？

<details><summary>参考答案</summary>

**优势**：sigmoid 允许每层有任意数量的输入（0 到 N-1 个），可以表达 DenseNet 式的密集连接、ResNet 式的单跳连接、以及无连接等多种拓扑。softmax 只能选择一个输入，表达能力受限。

**潜在问题**：(1) 搜索空间随层数指数增长（每层 \(2^{N-1}\) 种连接模式）；(2) 独立采样可能产生不兼容的连接（如尺寸不匹配需 zero-pad，引入噪声）；(3) 高方差——每个 sigmoid 独立采样使得单次采样的架构可能与策略期望差异很大。

</details>

**Q3（应用层）**：假设你只有 8 块 GPU，想复现 NAS 的 CNN 搜索实验。请估算所需时间，并提出至少两种降低搜索成本的策略。

<details><summary>参考答案</summary>

**时间估算**：原文 800 GPU 评估 12800 个架构，每个训练 50 epochs（约 1 小时）。8 GPU 串行化为 100 倍慢 → 约 12800 小时 ≈ 533 天，完全不可行。

**降低成本策略**：
1. **权重共享（ENAS）**：所有子架构共享一个超网络的权重，避免从头训练每个子网络，可将搜索降至单 GPU 半天。
2. **可微松弛（DARTS）**：将离散选择松弛为连续权重，用梯度下降代替 RL 搜索，数量级加速。
3. **早停 + 性能预测**：训练少量 epoch 后用学习曲线外推预测最终精度，提前终止差架构。
4. **缩小代理任务**：用更少的 epoch、更小的数据集、更少的 channel 数做搜索，最后再放大。

</details>