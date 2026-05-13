### Concrete Subspace Learning based Interference-free Model Merging for Multi-Task Learning

```yaml
id: concrete_subspace
name: Concrete Subspace Learning
full_name: Concrete Subspace Learning based Interference-free Model Merging for Multi-Task Learning
year: 2024
org: Tsinghua University
paper_url: https://arxiv.org/abs/2312.06173
category: advanced
parent: task_arithmetic
motivation: 通过学习具体子空间来消除任务间参数干扰，实现无干扰的模型合并
```

#### 📝 一句话总结

Concrete Subspace Learning 提出利用 Hard Concrete 分布学习任务特定的参数子空间（Minimal Covering Set），通过确保子空间不重叠来消除多任务模型合并中的参数干扰，并设计基于 Gram 矩阵的重要性加权递归合并策略，在 Vision 和 NLP 任务上均达到 SOTA。

#### 🎯 核心要点

- 提出 Concrete Subspace Learning 框架，将模型合并问题转化为学习不重叠的任务特定参数子空间
- 引入 Minimal Covering Set (MCS) 概念：每个任务只需一个最小参数子集即可恢复性能
- 使用 Hard Concrete 分布实现可微分的二值掩码学习，通过 L0 正则化鼓励稀疏性
- 设计基于 Gram 矩阵的参数重要性度量，衡量每个参数对任务的贡献
- 提出递归合并算法（Recursive Merging），按任务重要性顺序逐步合并，避免多任务同时合并的冲突
- 在 ViT-B/32 上 8 任务平均准确率达 91.71%（SOTA），ViT-L/14 达 91.02%，NLP 任务达 99.60%
- 无需额外推理开销，合并后的模型与原始预训练模型结构完全一致

#### 🔬 深入细节

![Concrete Subspace Learning 框架图](https://raw.githubusercontent.com/tanganke/subspace_fusion/main/images/1702203203116.jpg)
*图：Concrete Subspace Learning 的整体框架。左侧展示了传统 Task Arithmetic 方法中任务向量重叠导致干扰的问题；右侧展示了本文方法通过学习不重叠的 Minimal Covering Set 实现无干扰合并。*

##### 动机与背景

多任务模型合并（Multi-Task Model Merging）旨在将多个独立微调的任务专家模型合并为一个统一模型，无需访问原始训练数据。Task Arithmetic 是一种代表性方法，通过将任务向量（微调参数与预训练参数的差值）相加来实现合并：

$$\theta_{merged} = \theta_{pre} + \lambda \sum_{t=1}^{T} \tau_t$$

其中 \(\tau_t = \theta_t - \theta_{pre}\) 为第 \(t\) 个任务的任务向量。然而，不同任务的任务向量在参数空间中存在大量重叠，导致**任务间干扰（inter-task interference）**，合并后性能显著下降。

> 💡 关键：传统方法的核心问题在于——所有任务共享整个参数空间，任务向量的叠加必然产生冲突。

##### 核心机制：Minimal Covering Set (MCS)

本文的核心洞察是：每个任务实际上只需要参数空间中的一个**最小子集**即可恢复其性能。这个最小子集称为 Minimal Covering Set (MCS)。

形式化定义：对于任务 \(t\)，其 MCS \(S_t\) 满足：

$$S_t = \arg\min_{S \subseteq \{1,...,d\}} |S| \quad \text{s.t.} \quad \mathcal{L}(\theta_{pre} + m_S \odot \tau_t) \leq \epsilon$$

其中 \(m_S\) 是二值掩码，\(\odot\) 表示逐元素乘法，\(\epsilon\) 为性能阈值。

如果不同任务的 MCS 互不重叠（\(S_i \cap S_j = \emptyset, \forall i \neq j\)），则合并时不会产生任何干扰：

$$\theta_{merged} = \theta_{pre} + \sum_{t=1}^{T} m_{S_t} \odot \tau_t$$

##### Hard Concrete 分布实现可微掩码学习

直接优化离散的二值掩码是 NP-hard 问题。本文采用 **Hard Concrete 分布**对掩码进行连续松弛：

$$\bar{s} = \sigma\left(\frac{\log u - \log(1-u) + \log \alpha}{\beta}\right)$$

$$\tilde{s} = \bar{s}(r - l) + l$$

$$z = \min(1, \max(0, \tilde{s}))$$

其中 \(u \sim \text{Uniform}(0,1)\)，\(\log \alpha\) 是可学习参数，\(\beta\) 为温度，\((l, r)\) 为拉伸区间（通常 \(l=-0.1, r=1.1\)）。通过 Sigmoid 和拉伸操作，\(z\) 可以精确取到 0 或 1，同时保持梯度可传播。

训练目标为：

$$\min_{\log \alpha} \mathcal{L}_{task}(\theta_{pre} + z \odot \tau_t) + \lambda_{reg} \sum_j \sigma\left(\log \alpha_j - \beta \log \frac{-l}{r}\right)$$

第二项为 L0 正则化，鼓励掩码稀疏（即 MCS 尽可能小）。

> ⚠️ 注意：训练时只优化掩码参数 \(\log \alpha\)，任务向量 \(\tau_t\) 保持冻结。

##### 算法伪代码

```python
# Concrete Subspace Learning 核心流程
# Phase 1: 学习每个任务的 MCS 掩码
for task_t in tasks:
    log_alpha_t = initialize_mask_params(dim=d)
    tau_t = theta_t - theta_pre  # 任务向量（冻结）
    
    for epoch in range(E):
        u = Uniform(0, 1).sample()
        s_bar = sigmoid((log(u) - log(1-u) + log_alpha_t) / beta)
        s_tilde = s_bar * (r - l) + l
        z = clamp(s_tilde, 0, 1)
        
        theta_masked = theta_pre + z * tau_t
        loss = task_loss(theta_masked) + lambda_reg * L0_penalty(log_alpha_t)
        loss.backward()
        optimizer.step(log_alpha_t)
    
    mask_t = (sigmoid(log_alpha_t) > 0.5).float()  # 二值化

# Phase 2: 基于 Gram 重要性的递归合并
importance = compute_gram_importance(masks, task_vectors)
merge_order = sort_tasks_by_importance(importance)
theta_merged = theta_pre
for task_t in merge_order:
    theta_merged = theta_merged + mask_t * tau_t  # 逐任务合并
```

##### Gram 矩阵重要性加权

当多个任务的 MCS 存在不可避免的重叠时，需要决定重叠参数归属哪个任务。本文提出基于 **Gram 矩阵**的重要性度量：

对于参数矩阵 \(W \in \mathbb{R}^{m \times n}\)，其 Gram 矩阵为 \(G = W^T W\)。参数 \(w_{ij}\) 的重要性定义为：

$$I(w_{ij}) = \sum_k |G_{jk}| = \sum_k \left|\sum_l w_{lj} \cdot w_{lk}\right|$$

直觉上，Gram 矩阵捕获了参数列之间的相关性，重要性高的参数对整体表示的影响更大。

##### 递归合并策略

为避免多任务同时合并时的冲突，本文设计了递归合并算法：

1. 计算每个任务在重叠区域的 Gram 重要性总和
2. 按重要性从高到低排序
3. 重要性最高的任务优先"占据"重叠参数
4. 后续任务在剩余可用参数上合并

这确保了重要性高的任务获得更完整的参数空间，最大化整体性能。

##### 与 RegMean 的关系

本文方法的理论基础部分借鉴了 RegMean 的闭式解思想。RegMean 通过最小化合并模型与各任务模型输出的加权距离来求解最优合并权重：

$$\theta^* = \arg\min_\theta \sum_t \|X_t \theta - X_t \theta_t\|^2$$

闭式解为 \(\theta^* = (\sum_t X_t^T X_t)^{-1} \sum_t X_t^T X_t \theta_t\)。本文将此思想扩展到子空间选择场景，用 Gram 矩阵近似 \(X_t^T X_t\) 来衡量参数重要性。

##### 与传统方法的区别

| 方法 | 核心思想 | 是否消除干扰 | 额外开销 |
|------|---------|:---:|:---:|
| Task Arithmetic | 直接加权求和 | ❌ | 无 |
| TIES-Merging | 符号投票+剪枝 | 部分 | 无 |
| DARE | 随机丢弃+缩放 | 部分 | 无 |
| AdaMerging | 学习层级合并系数 | 部分 | 需测试数据 |
| **Concrete Subspace (本文)** | 学习不重叠子空间 | ✅ | 掩码训练 |

> 💡 关键：本文是首个从理论上保证无干扰合并的方法——只要 MCS 不重叠，合并结果等价于各任务独立推理。

#### 🧪 练习题

```yaml
question: "Concrete Subspace Learning 中使用 Hard Concrete 分布的主要目的是什么？"
options:
  - "加速模型训练的收敛速度"
  - "实现可微分的二值掩码学习，找到每个任务的最小参数子集"
  - "增加模型的参数量以提升表达能力"
  - "替代 Softmax 函数进行概率归一化"
answer: 1
explain: "Hard Concrete 分布通过连续松弛将离散的二值掩码优化问题转化为可微分问题，配合 L0 正则化可以学习到稀疏的 Minimal Covering Set。"
```