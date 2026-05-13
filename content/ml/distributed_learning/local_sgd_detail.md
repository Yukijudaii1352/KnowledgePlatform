### Local SGD

```yaml
id: local_sgd
name: Local SGD
full_name: 局部SGD (Local SGD)
year: '2019'
org: EPFL
paper_url: https://openreview.net/forum?id=S1glU3C9tX
category: communication
parent: —
motivation: 理论证明降低同步频率仍保持加速比
```

#### 📝 一句话总结

Local SGD 证明了在分布式训练中，各 worker 独立运行 SGD 并仅周期性地平均参数（而非每步同步），在凸优化问题上仍能达到与全同步 mini-batch SGD 相同的线性加速比，同时将通信轮次减少至 \(O(\sqrt{T})\) 量级。

#### 🎯 核心要点

- **通信高效的并行策略**：K 个 worker 各自独立运行 SGD，每隔 H 步才进行一次参数平均（AllReduce），而非每步通信
- **线性加速比保证**：理论证明当同步间隔 \(H = O\bigl(\sqrt{T/(Kb)}\bigr)\) 时，收敛率为 \(O\bigl(\frac{G^2}{\mu b K T}\bigr)\)，与全同步 mini-batch SGD 完全一致
- **通信轮次大幅削减**：相比 mini-batch SGD 的 T 轮通信，Local SGD 仅需 \(T/H = O(\sqrt{KbT})\) 轮，减少因子达 \(\sqrt{T/(Kb)}\)
- **理论覆盖强凸与凸两种设定**：分别给出 \(\mu\)-强凸和一般凸函数的收敛界
- **支持异步实现**：理论结果同样适用于异步版本的 Local SGD
- **与增大 batch size 正交的加速思路**：不增大 mini-batch（避免泛化退化），而是降低通信频率来提升计算通信比

#### 🔬 深入细节

![Local SGD 加速示意图](https://ar5iv.labs.arxiv.org/html/1805.09767/assets/x1.png)
*图：增大 mini-batch size b（路径 1→2）与增大同步间隔 H（路径 1→2）对训练加速效果的对比示意。两者都能提升计算通信比，但 Local SGD 通过增大 H 实现，避免了大 batch 带来的泛化问题。*

**算法伪代码：**

```python
# Algorithm 1: Local SGD
# 输入: K个worker, 总步数T, 同步间隔H, 学习率序列{η_t}
# 初始化: 所有worker共享相同初始参数 x_0

for t in range(T):
    # 每个worker并行执行
    for k in range(K):  # parallel
        g_t_k = stochastic_gradient(x_t_k)  # 采样计算随机梯度
        
        if (t + 1) % H == 0:  # 同步轮次
            # 先本地更新，再全局平均
            x_{t+1}_k = (1/K) * sum([x_t_j - η_t * g_t_j for j in range(K)])
        else:  # 非同步轮次
            # 仅本地更新，不通信
            x_{t+1}_k = x_t_k - η_t * g_t_k

# 输出: 加权平均 x̂_T = Σ w_t * x̄_t (x̄_t 为K个worker的平均)
```

##### 动机与背景

分布式 SGD 的核心瓶颈在于**通信开销**。标准的并行 mini-batch SGD 要求每步迭代都进行一次 AllReduce 操作来同步梯度，当网络带宽有限或延迟较高时，通信时间可能远超计算时间。

已有的两种应对策略各有局限：
1. **增大 mini-batch size**：提高每次通信的计算量，但实践中过大的 batch 会导致泛化性能下降（generalization gap）
2. **梯度压缩/量化**：减少每次通信的数据量，但引入额外近似误差

Local SGD 提出了第三条路径：**降低通信频率**。每个 worker 独立执行多步 SGD 后再同步，从根本上减少通信轮次。这一思想虽早已在实践中被使用（如 federated learning 中的 FedAvg），但此前缺乏严格的理论保证——甚至无法证明在凸问题上平均是否真的有帮助。

##### 核心理论结果

**Theorem 2.2（强凸情形）：** 设 \(f\) 为 \(L\)-光滑且 \(\mu\)-强凸函数，梯度方差有界 \(\mathbb{E}\|\nabla f_i(\mathbf{x}) - \nabla f(\mathbf{x})\|^2 \leq \sigma^2\)，二阶矩有界 \(\mathbb{E}\|\nabla f_i(\mathbf{x})\|^2 \leq G^2\)。对于 K 个 worker 运行 Local SGD，同步间隔为 H，使用递减学习率 \(\eta_t = \frac{4}{\mu(a+t)}\)，则加权平均迭代 \(\hat{\mathbf{x}}_T\) 满足：

$$\mathbb{E}[f(\hat{\mathbf{x}}_T)] - f^\star = O\left(\frac{L}{\mu^2 T^2} + \frac{\sigma^2}{\mu K T} + \frac{H G^2}{\mu T}\right)$$

> 💡 **关键洞察**：收敛界中有三项——(1) 优化偏差项（与初始距离相关），(2) 方差项（被 K 个 worker 线性减少），(3) 同步延迟项（与 H 成正比）。当 \(H = O(\sqrt{T/K})\) 时，第三项不超过第二项，从而保持线性加速比。

**Corollary（通信复杂度）：** 为达到精度 \(\epsilon\)，Local SGD 需要：
- 每个 worker 的梯度计算次数：\(T = O\bigl(\frac{G^2}{\mu K \epsilon}\bigr)\)（与 mini-batch SGD 相同）
- 通信轮次：\(T/H = O\bigl(\sqrt{\frac{K G^2}{\mu \epsilon}}\bigr)\)（比 mini-batch SGD 少 \(\sqrt{T/K}\) 倍）

##### 证明核心思路

证明的关键技术难点在于：Local SGD 中各 worker 的迭代序列 \(\mathbf{x}_t^k\) 会逐渐偏离（drift），如何控制这种偏离是核心。

作者的证明策略分两步：

1. **虚拟序列分析**：定义虚拟平均序列 \(\bar{\mathbf{x}}_t = \frac{1}{K}\sum_{k=1}^K \mathbf{x}_t^k\)，分析其收敛性。关键观察是即使各 worker 不同步，虚拟平均序列的更新方向仍然是无偏的梯度估计，且方差被 K 个独立样本降低。

2. **偏离量控制**：证明各 worker 与虚拟平均的偏离 \(\mathbb{E}\|\mathbf{x}_t^k - \bar{\mathbf{x}}_t\|^2\) 可以被 \(O(\eta_t^2 H^2 G^2)\) 控制。这一偏离引入的额外误差在学习率递减时可以被吸收。

> ⚠️ **注意**：证明要求使用递减学习率 \(\eta_t = O(1/t)\)。对于常数学习率，同步间隔 H 的允许范围会更受限。

##### 与传统方法的对比

| 方法 | 每步通信 | 通信轮次 | 收敛率 | 适用场景 |
|------|---------|---------|--------|---------|
| Mini-batch SGD | 每步 AllReduce | T | \(O(\frac{\sigma^2}{\mu KT})\) | 低延迟网络 |
| Local SGD | 每 H 步 AllReduce | T/H | \(O(\frac{G^2}{\mu KT})\) | 高延迟/低带宽 |
| One-shot Averaging | 仅最终一次 | 1 | 无线性加速 | 理论极限 |

Local SGD 的核心优势在于：在保持与 mini-batch SGD 相同计算效率的前提下，将通信复杂度从 \(O(T)\) 降低到 \(O(\sqrt{KT})\)，这对于跨数据中心训练、联邦学习等通信受限场景具有重要实际意义。

##### 实际影响与局限

**实际影响：**
- 为 FedAvg（联邦学习中的核心算法）提供了理论基础
- 指导了大规模分布式训练中同步频率的选择：\(H \propto \sqrt{T/K}\)
- 证明了"不需要用大 batch，用 Local SGD"这一实践经验的理论正确性

**局限性：**
- 理论分析限于凸/强凸设定，深度学习的非凸情形需要额外假设
- 收敛界中使用的是二阶矩界 \(G^2\) 而非方差 \(\sigma^2\)，在某些情况下可能不够紧
- 递减学习率的要求与实践中常用的分段常数学习率有差距

#### 🧪 练习题

```yaml
question: "在 Local SGD 中，为保持与全同步 mini-batch SGD 相同的线性加速比，同步间隔 H 最大可以设为多少？"
options:
  - "H = O(T)，即几乎不需要同步"
  - "H = O(√(T/K))，与总步数的平方根成正比"
  - "H = O(K)，与 worker 数量成正比"
  - "H = O(1)，必须每步同步"
answer: 1
explain: "论文 Theorem 2.2 证明当 H = O(√(T/(Kb))) 时（b=1 时即 O(√(T/K))），收敛率中的同步延迟项不会主导，从而保持 O(1/(KT)) 的线性加速比。"
```