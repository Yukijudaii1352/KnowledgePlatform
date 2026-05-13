### QSGD

```yaml
id: qsgd
name: QSGD
full_name: 量化随机梯度下降 (Quantized Stochastic Gradient Descent)
year: 2017
org: ETH Zurich, IST Austria, MIT, MSR, LSE
paper_url: https://arxiv.org/abs/1610.02132
category: foundation
parent: —
motivation: 通过随机量化梯度并结合高效编码，在通信带宽与收敛速度之间实现可调最优权衡
```

#### 📝 一句话总结

QSGD 提出了一种随机梯度量化算子 \(Q_s\)，通过可调的 \(s\) 个量化级别在通信比特数与收敛方差之间实现最优权衡，并结合 Elias 递归编码将梯度通信压缩至 \(2.8n+32\) 比特（仅为全精度的 8.75%），同时保持理论收敛保证和实际训练精度。

#### 🎯 核心要点

- **随机量化算子 \(Q_s\)**：将梯度向量的每个分量随机映射到 \(s\) 个均匀量化级别之一，保证无偏性（\(\mathbb{E}[Q_s(\mathbf{v})] = \mathbf{v}\)）
- **方差-通信权衡**：方差放大因子为 \(\min(n/s^2, \sqrt{n}/s)\)，\(s=\sqrt{n}\) 时方差仅放大 2 倍
- **Elias 递归编码**：利用量化后梯度的稀疏性，将通信开销从 32n 比特压缩至 \(2.8n+32\) 比特
- **信息论最优性**：证明该权衡不可渐近改进，任何保证常数方差放大的算法都需 \(\Omega(n)\) 比特
- **广泛适用性**：可黑盒应用于凸/非凸 SGD、异步 SGD、SVRG 等多种优化算法
- **QSVRG 变体**：结合方差缩减技术实现指数收敛速率
- **实验验证**：在 CNTK 上实现，ImageNet (AlexNet/Inception/ResNet/VGG)、CIFAR-10、LSTM 语音识别均获显著加速

#### 🔬 深入细节

![QSGD 量化示意图](https://ar5iv.labs.arxiv.org/html/1610.02132/assets/x1.png)
*图：5 级随机量化示意。每个梯度分量被归一化后随机映射到相邻的两个量化级别之一，概率与距离成正比，保证期望无偏。*

**算法伪代码（Algorithm 1: Parallel QSGD）：**

```python
# Parallel QSGD with K workers
for t in range(T):
    for each worker i in parallel:
        # 1. Compute stochastic gradient
        g_i = stochastic_gradient(f, x_t)
        
        # 2. Encode: quantize gradient
        M_i = Encode(Q_s(g_i))  # Apply Q_s then Elias coding
        
        # 3. Broadcast encoded message to all peers
        broadcast(M_i)
        
        # 4. Receive and decode from all peers
        for each peer l:
            M_l = receive(l)
            g_hat_l = Decode(M_l)  # Recover quantized gradient
        
        # 5. Aggregate and update
        x_{t+1} = x_t - (eta_t / K) * sum(g_hat_l for l in range(K))
```

##### 动机与背景

在数据并行分布式训练中，每轮迭代需要在 \(K\) 个工作节点之间同步梯度。对于含 \(n\) 个参数的模型（如 ResNet-152 有 6000 万参数），每轮全精度通信需传输 \(32n\) 比特。当 GPU 计算速度远超网络带宽时，**通信成为训练瓶颈**。实验表明，在 16 GPU 训练 VGG 时，通信占总时间的 80% 以上。

传统方法要么牺牲收敛性（如直接截断低位），要么缺乏理论保证（如 1BitSGD）。QSGD 的核心洞察是：**量化引入的额外方差可以被视为 SGD 本身随机性的一部分**，从而利用已有的 SGD 收敛理论来分析量化对收敛速度的影响。

##### 核心机制：随机量化算子 \(Q_s\)

对于向量 \(\mathbf{v} \in \mathbb{R}^n\)，量化算子定义为：

$$Q_s(v_i) = \|\mathbf{v}\|_2 \cdot \text{sgn}(v_i) \cdot \xi_i(\mathbf{v}, s)$$

其中 \(\xi_i(\mathbf{v}, s)\) 是独立随机变量。设 \(\ell\) 为满足 \(|v_i|/\|\mathbf{v}\|_2 \in [\ell/s, (\ell+1)/s]\) 的整数，则：

$$\xi_i(\mathbf{v}, s) = \begin{cases} \ell/s & \text{概率 } 1 - p(|v_i|/\|\mathbf{v}\|_2, s) \\ (\ell+1)/s & \text{否则} \end{cases}$$

其中 \(p(a, s) = as - \ell\)。

> 💡 **直觉**：每个分量先除以向量范数归一化到 \([0,1]\)，然后随机"舍入"到最近的两个量化点之一。舍入概率与到两端的距离成正比，这保证了 \(\mathbb{E}[\xi_i] = |v_i|/\|\mathbf{v}\|_2\)，即**无偏性**。

**关键性质（Lemma 3.1）：**

1. **无偏性**：\(\mathbb{E}[Q_s(\mathbf{v})] = \mathbf{v}\)
2. **方差界**：\(\mathbb{E}[\|Q_s(\mathbf{v}) - \mathbf{v}\|_2^2] \leq \min\left(\frac{n}{s^2}, \frac{\sqrt{n}}{s}\right) \|\mathbf{v}\|_2^2\)
3. **稀疏性**：\(\mathbb{E}[\|Q_s(\mathbf{v})\|_0] \leq s(s + \sqrt{n})\)

> ⚠️ **注意**：方差界有两个分支——\(n/s^2\) 来自最坏情况分析，\(\sqrt{n}/s\) 来自利用归一化后分量的 \(\ell_1/\ell_2\) 范数比值（Cauchy-Schwarz 不等式）。实际中后者通常更紧。

##### 高效编码：Elias 递归编码

量化后的梯度表示为三元组 \((\|\mathbf{v}\|_2, \boldsymbol{\sigma}, \boldsymbol{\zeta})\)：范数（32位浮点）、符号向量、量化整数向量。关键观察是**较大的量化整数出现概率较低**，因此可用变长编码压缩。

Elias 递归编码对正整数 \(k\) 的编码长度为 \(|\text{Elias}(k)| \leq (1+o(1))\log k + 1\)。编码方案：
1. 用 32 位编码 \(\|\mathbf{v}\|_2\)
2. 用 Elias 编码第一个非零位置
3. 逐个编码非零项的符号（1位）+ 量化值（Elias 编码）+ 到下一非零项的距离（Elias 编码）

**通信开销（Corollary 3.3）：** 当 \(s = \sqrt{n}\) 时，期望通信量仅为 \(2.8n + 32\) 比特，相比全精度 \(32n\) 比特压缩约 **11.4 倍**。

##### 收敛保证

**凸情形（Theorem 3.4）：** 对 \(L\)-光滑凸函数，\(K\) 个处理器并行 QSGD 以步长 \(\eta_t = 1/(L + \sqrt{K}/\gamma)\) 运行，收敛到 \(\epsilon\) 精度需要：

$$T = O\left(R^2 \cdot \max\left(\frac{2B'}{K\epsilon^2}, \frac{L}{\epsilon}\right)\right)$$

其中 \(B' = \min(n/s^2, \sqrt{n}/s) \cdot B\) 是量化后的二阶矩界。

> 💡 **关键洞察**：量化仅影响方差项 \(B' / (K\epsilon^2)\)，不影响光滑性项 \(L/\epsilon\)。当 \(K\) 足够大使得光滑性项主导时，量化对收敛速度**几乎无影响**。

**非凸情形（Theorem 3.5）：** 对 \(L\)-光滑（可能非凸）函数：

$$\frac{1}{L}\mathbb{E}\left[\|\nabla f(\mathbf{x})\|_2^2\right] \leq O\left(\frac{\sqrt{L(f(\mathbf{x}_1) - f^*)}}{N} + \frac{\min(n/s^2, \sqrt{n}/s) \cdot B}{L}\right)$$

##### 与传统方法的对比

| 方法 | 通信比特/轮 | 方差放大 | 理论保证 | 可调性 |
|------|------------|---------|---------|--------|
| 全精度 SGD | \(32n\) | 1× | ✓ | — |
| 1BitSGD | \(n + 64\) | 无界 | ✗ | ✗ |
| TernGrad | \(2n\) | \(\sqrt{n}\)× | 部分 | ✗ |
| **QSGD** (\(s=\sqrt{n}\)) | \(2.8n + 32\) | 2× | ✓ | ✓ |
| **QSGD** (\(s=1\)) | \(O(\sqrt{n}\log n)\) | \(\sqrt{n}\)× | ✓ | ✓ |

##### 实验结果

在 Amazon EC2 p2.16xlarge（16× NVIDIA K80 GPU）上的实验结果：

- **AlexNet/ImageNet**（16 GPU）：通信时间减少 4×，端到端训练加速 2.5×，精度无损
- **ResNet-152/ImageNet**（16 GPU）：端到端收敛时间减少约 2×
- **LSTM 语音识别**（2 GPU）：通信时间减少 6.8×，训练加速 2.7×
- **VGG/CIFAR-10**：通信占比从 >80% 降至 <40%，精度保持不变
- 所有实验中量化训练的最终精度与全精度训练**几乎完全一致**

#### 🧪 练习题

```yaml
question: "QSGD 中设置量化级别 s=√n 时，相比全精度 32 位浮点通信，期望通信量约为多少？"
options:
  - "n 比特，压缩 32 倍"
  - "2.8n + 32 比特，压缩约 11 倍"
  - "32√n 比特，压缩 √n 倍"
  - "n·log(n) 比特，无显著压缩"
answer: 1
explain: "Corollary 3.3 证明当 s=√n 时，Elias 编码的期望通信量为 2.8n+32 比特，相比全精度 32n 比特压缩约 11.4 倍，同时方差仅放大 2 倍。"
```