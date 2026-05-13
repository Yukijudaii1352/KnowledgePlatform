### HMM — 隐马尔可夫模型 (Hidden Markov Model)

```yaml
id: hmm
name: HMM
full_name: 隐马尔可夫模型 (Hidden Markov Model)
year: '1970'
org: IDA
paper_url: https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-41/issue-1/A-Maximization-Technique-Occurring-in-the-Statistical-Analysis-of-Probabilistic/10.1214/aoms/1177697196.full
category: foundation
parent: —
motivation: 隐状态序列统计推断建模
```

#### 📝 一句话总结

Baum 等人提出了针对马尔可夫链概率函数（即隐马尔可夫模型）的参数极大似然估计方法——Baum-Welch 算法（前向-后向算法），通过"增长变换"（growth transformation）证明了迭代重估公式单调递增似然函数，奠定了 HMM 在语音识别、自然语言处理等序列建模领域的数学基础。

#### 🎯 核心要点

- **隐马尔可夫模型形式化定义**：将观测序列建模为隐状态马尔可夫链的概率函数，隐状态不可直接观测，仅通过发射概率生成可观测符号
- **三大核心参数**：初始状态分布 \(\pi\)、状态转移概率矩阵 \(A\)、观测发射概率矩阵 \(B\)，统一记为模型 \(\lambda = (A, B, \pi)\)
- **前向算法（Forward Algorithm）**：递推计算观测序列的似然 \(P(O|\lambda)\)，时间复杂度从暴力枚举的 \(O(N^T)\) 降至 \(O(N^2 T)\)
- **后向算法（Backward Algorithm）**：从序列末端反向递推，与前向变量配合计算隐状态后验概率
- **Baum-Welch 重估公式**：利用前向-后向变量构造参数更新公式，属于 EM 算法的特例（早于 Dempster 1977 年正式提出 EM 框架）
- **增长变换（Growth Transformation）**：论文的核心数学贡献，证明了重估公式每次迭代都单调不减似然函数值
- **HMM 三大经典问题**的基础：评估问题（前向算法）、解码问题（Viterbi 算法）、学习问题（Baum-Welch 算法）

#### 🔬 深入细节

##### 模型框架示意

![HMM 模型结构示意图](https://upload.wikimedia.org/wikipedia/commons/8/8a/HiddenMarkovModel.svg)
*图：隐马尔可夫模型的基本结构。上层 \(X\) 为隐状态序列（满足马尔可夫性），下层 \(Y\) 为观测序列，箭头表示概率依赖关系。*

##### 算法伪代码

```python
# Baum-Welch 算法（前向-后向算法）伪代码
def baum_welch(observations, N, M, max_iter):
    """
    observations: 观测序列 O = (o_1, o_2, ..., o_T)
    N: 隐状态数量
    M: 观测符号数量
    """
    # 1. 随机初始化参数 λ = (A, B, π)
    A = random_stochastic_matrix(N, N)   # 状态转移矩阵
    B = random_stochastic_matrix(N, M)   # 发射概率矩阵
    pi = random_stochastic_vector(N)     # 初始状态分布

    for iteration in range(max_iter):
        # === E-Step: 前向-后向计算 ===
        # 前向变量 α_t(i) = P(o_1,...,o_t, q_t=s_i | λ)
        alpha = forward(observations, A, B, pi)
        # 后向变量 β_t(i) = P(o_{t+1},...,o_T | q_t=s_i, λ)
        beta = backward(observations, A, B)

        # 计算 ξ_t(i,j) = P(q_t=s_i, q_{t+1}=s_j | O, λ)
        xi = compute_xi(alpha, beta, A, B, observations)
        # 计算 γ_t(i) = P(q_t=s_i | O, λ) = Σ_j ξ_t(i,j)
        gamma = compute_gamma(xi)

        # === M-Step: 参数重估 ===
        pi_new = gamma[0]                          # π̂_i = γ_1(i)
        A_new = sum(xi, t) / sum(gamma[:-1], t)    # â_ij = Σ_t ξ_t(i,j) / Σ_t γ_t(i)
        B_new = sum(gamma[where o_t=v_k]) / sum(gamma)  # b̂_j(k) = Σ_{t:o_t=v_k} γ_t(j) / Σ_t γ_t(j)

        A, B, pi = A_new, B_new, pi_new

    return A, B, pi
```

##### 动机与背景

1960 年代，序列数据的统计建模面临一个核心困难：**观测数据背后的生成机制（状态）往往不可直接观测**。例如在语音识别中，我们只能听到声学信号（观测），而产生这些信号的音素序列（状态）是隐藏的。传统的马尔可夫链模型假设状态可直接观测，无法处理这种"隐含状态"的场景。

Baum 及其在 IDA（Institute for Defense Analyses）的同事们从 1966 年开始发表一系列论文，逐步构建了隐马尔可夫模型的数学理论。1970 年的这篇论文是该系列的集大成之作，首次给出了完整的参数估计算法及其收敛性证明。

##### 核心机制：前向-后向算法

HMM 的参数学习问题可以表述为：给定观测序列 \(O = (o_1, o_2, \ldots, o_T)\)，求使似然函数 \(P(O|\lambda)\) 最大的模型参数 \(\lambda = (A, B, \pi)\)。

**前向变量**定义为：

$$\alpha_t(i) = P(o_1, o_2, \ldots, o_t, q_t = s_i \mid \lambda)$$

递推关系为：

$$\alpha_1(i) = \pi_i \cdot b_i(o_1)$$

$$\alpha_{t+1}(j) = \left[\sum_{i=1}^{N} \alpha_t(i) \cdot a_{ij}\right] \cdot b_j(o_{t+1})$$

其中 \(a_{ij}\) 是从状态 \(s_i\) 转移到 \(s_j\) 的概率，\(b_j(o_t)\) 是在状态 \(s_j\) 下观测到 \(o_t\) 的发射概率。最终似然为：

$$P(O|\lambda) = \sum_{i=1}^{N} \alpha_T(i)$$

> 💡 **关键直觉**：前向算法的本质是动态规划——将对所有可能隐状态路径的穷举求和，分解为逐时间步的局部求和，将指数级复杂度降为多项式级。

**后向变量**定义为：

$$\beta_t(i) = P(o_{t+1}, o_{t+2}, \ldots, o_T \mid q_t = s_i, \lambda)$$

递推关系为：

$$\beta_T(i) = 1$$

$$\beta_t(i) = \sum_{j=1}^{N} a_{ij} \cdot b_j(o_{t+1}) \cdot \beta_{t+1}(j)$$

##### 核心机制：Baum-Welch 重估公式

结合前向和后向变量，定义两个关键后验概率：

**状态占据概率** \(\gamma_t(i)\)——在时刻 \(t\) 处于状态 \(s_i\) 的后验概率：

$$\gamma_t(i) = P(q_t = s_i \mid O, \lambda) = \frac{\alpha_t(i) \cdot \beta_t(i)}{P(O|\lambda)}$$

**状态转移概率** \(\xi_t(i,j)\)——在时刻 \(t\) 从状态 \(s_i\) 转移到 \(s_j\) 的后验概率：

$$\xi_t(i,j) = P(q_t = s_i, q_{t+1} = s_j \mid O, \lambda) = \frac{\alpha_t(i) \cdot a_{ij} \cdot b_j(o_{t+1}) \cdot \beta_{t+1}(j)}{P(O|\lambda)}$$

由此得到**参数重估公式**：

$$\hat{\pi}_i = \gamma_1(i)$$

$$\hat{a}_{ij} = \frac{\sum_{t=1}^{T-1} \xi_t(i,j)}{\sum_{t=1}^{T-1} \gamma_t(i)}$$

$$\hat{b}_j(k) = \frac{\sum_{t=1, o_t=v_k}^{T} \gamma_t(j)}{\sum_{t=1}^{T} \gamma_t(j)}$$

> 💡 **关键直觉**：重估公式的含义非常直观——新的转移概率 \(\hat{a}_{ij}\) 等于"从 \(s_i\) 转移到 \(s_j\) 的期望次数"除以"处于 \(s_i\) 的期望总次数"，本质上是用后验期望的频率来估计概率。

##### 增长变换与收敛性证明

论文最核心的数学贡献是**增长变换（Growth Transformation）**的概念与证明。Baum 等人证明了一个一般性定理：

> ⚠️ **核心定理**：设 \(P(O|\lambda)\) 为观测序列在模型 \(\lambda\) 下的似然函数，令 \(\bar{\lambda}\) 为按上述重估公式更新后的参数，则 \(P(O|\bar{\lambda}) \geq P(O|\lambda)\)，等号成立当且仅当 \(\bar{\lambda} = \lambda\)（已达到不动点）。

这一结论意味着 Baum-Welch 算法每次迭代都保证似然函数单调不减，从而保证收敛到局部极大值。这一证明技巧后来被 Dempster、Laird 和 Rubin（1977）推广为 EM 算法的一般性框架。

##### 与传统方法的区别

| 特性 | 传统马尔可夫链 | 隐马尔可夫模型 (HMM) |
|------|---------------|---------------------|
| 状态可观测性 | 状态直接可观测 | 状态隐藏，仅观测到发射符号 |
| 参数估计 | 直接频率计数 | 需要 Baum-Welch 迭代估计 |
| 计算复杂度 | \(O(T)\) | \(O(N^2 T)\) 每次迭代 |
| 表达能力 | 仅建模状态转移 | 同时建模状态转移与观测生成 |
| 应用场景 | 天气预测等简单序列 | 语音识别、NLP、生物序列分析 |

与直接极大似然估计（MLE）相比，Baum-Welch 的优势在于：（1）不需要知道隐状态的真实标注；（2）通过 E-M 交替优化绕过了含隐变量的似然函数难以直接优化的问题；（3）每步迭代有理论保证的单调性。

##### HMM 的三大经典问题

虽然本文主要解决学习问题，但 HMM 框架衍生出三大经典问题，构成了完整的理论体系：

1. **评估问题（Evaluation）**：给定模型 \(\lambda\) 和观测序列 \(O\)，计算 \(P(O|\lambda)\) → **前向算法**
2. **解码问题（Decoding）**：给定模型 \(\lambda\) 和观测序列 \(O\)，找到最可能的隐状态序列 → **Viterbi 算法**（1967）
3. **学习问题（Learning）**：给定观测序列 \(O\)，找到最优模型参数 \(\lambda^*\) → **Baum-Welch 算法**（本文）

#### 🧪 练习题

```yaml
question: "Baum-Welch 算法中，前向变量 α_t(i) 的物理含义是什么？"
options:
  - "在时刻 t 处于状态 s_i 的先验概率"
  - "观测到前 t 个符号且时刻 t 处于状态 s_i 的联合概率"
  - "给定完整观测序列后时刻 t 处于状态 s_i 的后验概率"
  - "从状态 s_i 出发观测到后续所有符号的概率"
answer: 1
explain: "前向变量 α_t(i) = P(o_1,...,o_t, q_t=s_i | λ)，即观测到前 t 个符号且当前处于状态 s_i 的联合概率。选项 2（后验概率）对应的是 γ_t(i)，选项 3（后续概率）对应的是后向变量 β_t(i)。"
```