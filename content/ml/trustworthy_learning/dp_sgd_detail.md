### DP-SGD

```yaml
id: dp_sgd
name: DP-SGD
full_name: 差分隐私随机梯度下降 (Differentially Private Stochastic Gradient Descent)
year: "2016"
org: Google
paper_url: https://arxiv.org/abs/1607.00133
category: trustworthy_learning
parent: —
motivation: 通过梯度裁剪+高斯噪声实现深度学习训练的差分隐私保证，并引入Moments Accountant紧致追踪隐私损失
```

#### 📝 一句话总结

DP-SGD 通过对每样本梯度进行 L2 范数裁剪并添加校准高斯噪声实现训练过程的 \((\varepsilon, \delta)\)-差分隐私保证，同时引入 Moments Accountant 实现比强组合定理紧约一个数量级的隐私损失追踪，在 MNIST 上以 \((\varepsilon=2, \delta=10^{-5})\)-DP 达到 95% 准确率。

#### 🎯 核心要点

- 提出 DP-SGD 算法：每步对每样本梯度做 L2 裁剪（阈值 \(C\)）→ 求和 → 加高斯噪声 \(\mathcal{N}(0, \sigma^2 C^2 I)\) → 除以批大小 → 梯度下降
- 引入 Moments Accountant：通过追踪隐私损失随机变量的对数矩生成函数，实现比强组合定理紧 \(\sqrt{\log(T/\delta)}\) 因子的隐私分析
- 利用 Poisson 子采样的隐私放大效应：每条记录独立以概率 \(q = L/N\) 被选中
- 差分隐私 PCA：对协方差矩阵加噪后取主方向，用于降维预处理
- TensorFlow 实现：per-example gradient 算子 + Sanitizer（裁剪加噪）+ PrivacyAccountant（隐私追踪）
- 超参数洞察：最优批大小约 \(\sqrt{N}\)；裁剪阈值取梯度范数中位数；网络增大不降低准确率

#### 🔬 深入细节

![DP-SGD Algorithm](https://arxiv.org/html/1607.00133v1/extracted/figures/algorithm1.png)
*图：DP-SGD 算法流程——对每样本梯度裁剪后加噪聚合*

> ⚠️ 注意：若上图不可访问，核心流程见下方伪代码。

```python
# Algorithm 1: Differentially Private SGD (DP-SGD)
# 输入: 数据集 {x_1,...,x_N}, 损失函数 L(θ), 学习率 η_t
#       噪声尺度 σ, 裁剪阈值 C, 批大小 L

for t in range(T):
    # 1. Poisson子采样: 每条记录独立以概率 q=L/N 被选中
    L_t = poisson_sample(dataset, q=L/N)
    
    # 2. 计算每样本梯度
    for x_i in L_t:
        g_i = compute_gradient(θ_t, x_i)
    
    # 3. 梯度裁剪 (L2范数)
    for x_i in L_t:
        g_i_clipped = g_i / max(1, ||g_i||_2 / C)
    
    # 4. 加噪聚合
    g_noisy = (1/L) * (sum(g_i_clipped) + N(0, σ²C²I))
    
    # 5. 参数更新
    θ_{t+1} = θ_t - η_t * g_noisy
```

##### 动机与背景

深度学习模型在训练过程中可能记忆训练数据的敏感信息。模型反演攻击（Fredrikson et al., 2015）已证明可以从训练好的模型中恢复训练数据。差分隐私（Dwork et al., 2006）提供了形式化的隐私保证，但此前的 DP 方法主要针对凸优化问题（如 output perturbation、objective perturbation），无法直接应用于深度学习的非凸优化。

已有工作的不足：
- Shokri & Shmatikov (2015)：分布式训练中按单个参数计算隐私损失，总隐私预算达数千级别
- 强组合定理：对 \(T\) 步迭代的隐私损失估计过于宽松（\(O(\sqrt{T \log(1/\delta)} \cdot \varepsilon_0)\)）
- 凸 ERM 方法（Wu et al.）：MNIST 仅达 83% 准确率

##### 核心机制：梯度裁剪 + 高斯噪声

**梯度裁剪**确保单样本梯度的 L2 灵敏度有界：

$$\bar{\mathbf{g}}_t(x_i) = \mathbf{g}_t(x_i) / \max\left(1, \frac{\|\mathbf{g}_t(x_i)\|_2}{C}\right)$$

> 💡 关键：裁剪后 \(\|\bar{\mathbf{g}}_t(x_i)\|_2 \leq C\)，因此聚合梯度对任意单样本的 L2 灵敏度至多为 \(C\)。

**高斯机制**：对灵敏度为 \(C\) 的查询添加 \(\mathcal{N}(0, \sigma^2 C^2 I)\) 噪声，满足 \((\varepsilon, \delta)\)-DP（当 \(\sigma\) 足够大时）。

**加噪聚合**：

$$\tilde{\mathbf{g}}_t = \frac{1}{L}\left(\sum_{i \in L_t} \bar{\mathbf{g}}_t(x_i) + \mathcal{N}(0, \sigma^2 C^2 \mathbf{I})\right)$$

##### 核心机制：Moments Accountant

传统的强组合定理对 \(T\) 次 \((\varepsilon_0, \delta_0)\)-DP 机制的组合给出：

$$(\varepsilon_0 \sqrt{2T \ln(1/\delta')} + T\varepsilon_0(e^{\varepsilon_0}-1),\; T\delta_0 + \delta')$$

Moments Accountant 通过追踪隐私损失的**对数矩生成函数**获得更紧的界：

$$\alpha_{\mathcal{M}}(\lambda) = \max_{d, d'} \log \mathbb{E}_{o \sim \mathcal{M}(d)}\left[\exp\left(\lambda \cdot \log \frac{\Pr[\mathcal{M}(d)=o]}{\Pr[\mathcal{M}(d')=o]}\right)\right]$$

**关键性质**：
1. **可组合性**：\(\alpha_{\mathcal{M}_{1:T}}(\lambda) \leq \sum_{t=1}^T \alpha_{\mathcal{M}_t}(\lambda)\)
2. **尾界转换**：\(\delta = \min_\lambda \exp(\alpha(\lambda) - \lambda\varepsilon)\)

对于采样率 \(q\) 的子采样高斯机制：

$$\alpha(\lambda) \leq \frac{q^2 \lambda(\lambda+1)}{(1-q)\sigma^2} + O(q^3/\sigma^3)$$

> 💡 关键：Moments Accountant 比强组合定理省去 \(\sqrt{\log(T/\delta)}\) 因子。实测 \(T=10000\) 时，\(\varepsilon\) 从 9.34 降至 1.26（改善 7.4×）。

**主定理**：存在常数 \(c_1, c_2\)，Algorithm 1 在 \(T\) 步后满足 \((\varepsilon, \delta)\)-DP，只要：

$$\sigma \geq c_2 \frac{q\sqrt{T \log(1/\delta)}}{\varepsilon}$$

##### 训练流程与实现

1. **差分隐私 PCA 预处理**：将输入归一化为单位向量，对 \(A^T A\) 加高斯噪声后取主方向投影（如 MNIST 784→60 维）
2. **DP-SGD 训练**：在投影空间中训练全连接网络
3. **隐私预算分配**：PCA 和 SGD 各消耗部分 \((\varepsilon, \delta)\) 预算，通过组合定理合并
4. **TensorFlow 实现**：利用 Goodfellow (2015) 的 per-example gradient 技巧高效计算每样本梯度

##### 实验结果

**MNIST**（模型：60维PCA → 1000隐藏单元ReLU → Softmax；非隐私基线 98.3%）：

| \((\varepsilon, \delta)\) | 噪声 \((\sigma, \sigma_p)\) | 测试准确率 |
|---|---|---|
| (0.5, 10⁻⁵) | (8, 16) | 90% |
| (2, 10⁻⁵) | (4, 7) | 95% |
| (8, 10⁻⁵) | (2, 4) | 97% |

**CIFAR-10**（预训练卷积层 + DP全连接层；非隐私基线 ~80%）：

| \((\varepsilon, \delta)\) | 测试准确率 |
|---|---|
| (2, 10⁻⁵) | 67% |
| (4, 10⁻⁵) | 70% |
| (8, 10⁻⁵) | 73% |

##### 与传统方法的区别

| 方法 | 适用范围 | MNIST准确率 | 隐私保证 |
|------|---------|------------|---------|
| Output Perturbation | 凸优化 | ~83% | 严格DP |
| Shokri & Shmatikov | 分布式DL | 未报告 | ε~数千 |
| **DP-SGD (本文)** | **通用DL** | **95%@ε=2** | **严格DP** |

#### 🧪 练习题

```yaml
question: "DP-SGD 中对每样本梯度进行 L2 范数裁剪的主要目的是什么？"
options:
  - "加速模型收敛"
  - "限制单样本对聚合梯度的影响，确保灵敏度有界"
  - "防止梯度爆炸导致训练不稳定"
  - "减少高斯噪声的方差"
answer: 1
explain: "裁剪确保任意单样本梯度的 L2 范数不超过 C，从而使聚合梯度的 L2 灵敏度有界（≤C），这是高斯机制提供差分隐私保证的前提条件。"
```