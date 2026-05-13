### KMM: 核均值匹配 (Kernel Mean Matching)

```yaml
id: kmm
name: KMM
full_name: 核均值匹配 (Kernel Mean Matching)
year: 2006
org: 马普研究所
paper_url: https://papers.nips.cc/paper/2006/hash/a2186aa7c086b46ad4e8571f3fcf6a19-Abstract.html
category: domain_adapt
parent: —
motivation: 通过在RKHS中匹配训练与测试分布的均值嵌入来估计样本权重，无需显式密度估计即可校正协变量偏移
```

#### 📝 一句话总结

KMM 提出在再生核希尔伯特空间 (RKHS) 中直接匹配训练集与测试集的均值嵌入来估计重要性权重 \(\beta(x) = P_{\text{test}}(x)/P_{\text{train}}(x)\)，将协变量偏移校正问题转化为一个凸二次规划 (QP)，无需进行显式密度估计即可有效纠正样本选择偏差。

#### 🎯 核心要点

- **问题设定**：协变量偏移 (Covariate Shift)——训练与测试数据的输入分布 \(P(x)\) 不同，但条件分布 \(P(y|x)\) 相同
- **核心思想**：利用 RKHS 均值嵌入的单射性质，通过匹配分布的核均值来估计密度比，避免高维密度估计
- **优化形式**：凸二次规划 (QP)，全局最优解唯一，计算复杂度 \(O(m^3)\)（m 为训练样本数）
- **理论保证**：当核函数为 universal kernel 时，均值映射 \(\mu\) 是单射的，KMM 解收敛到真实密度比
- **约束设计**：\(\beta_i \in [0, B]\) 限制权重范围，\(|\sum \beta_i - m| \leq m\epsilon\) 保证加权分布接近概率分布
- **应用方式**：将估计的权重 \(\beta_i\) 插入加权 SVM 或加权最小二乘回归中使用
- **无需测试标签**：仅需测试集的无标签数据 \(\{x'_j\}\) 即可估计权重

#### 🔬 深入细节

**KMM 框架示意图**

```
┌─────────────────────────────────────────────────────────┐
│                    KMM 工作流程                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  训练集 {x_i, y_i}     测试集 {x'_j} (无标签)           │
│       ↓                       ↓                         │
│  ┌─────────┐           ┌─────────┐                     │
│  │ φ(x_i)  │           │ φ(x'_j) │   RKHS 映射        │
│  └────┬────┘           └────┬────┘                     │
│       ↓                       ↓                         │
│  Σβ_i·φ(x_i)/m    ≈    Σφ(x'_j)/m'   均值匹配         │
│       ↓                                                 │
│  ┌─────────────────────────────┐                       │
│  │  min ½β⊤Kβ - κ⊤β           │                       │
│  │  s.t. β∈[0,B], |Σβ-m|≤mε   │   凸 QP 求解         │
│  └──────────────┬──────────────┘                       │
│                 ↓                                        │
│         权重 β_1, β_2, ..., β_m                         │
│                 ↓                                        │
│  ┌─────────────────────────────┐                       │
│  │ 加权学习器 (SVM/回归)        │                       │
│  │ min Σβ_i·L(x_i, y_i, θ)+λR │                       │
│  └─────────────────────────────┘                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```
*图：KMM 通过在 RKHS 中匹配加权训练分布与测试分布的均值嵌入，求解 QP 获得样本权重，再用于下游加权学习*

**算法伪代码**

```python
# KMM (Kernel Mean Matching) 核心算法
# 输入: 训练数据 X_train (m个), 测试数据 X_test (m'个), 核函数 k, 上界 B, 容差 ε
# 输出: 训练样本权重 β

def KMM(X_train, X_test, kernel, B=1000, epsilon=None):
    m = len(X_train)
    m_prime = len(X_test)
    if epsilon is None:
        epsilon = (sqrt(m) - 1) / sqrt(m)
    
    # Step 1: 计算训练集核矩阵 K (m×m)
    K = np.zeros((m, m))
    for i in range(m):
        for j in range(m):
            K[i, j] = kernel(X_train[i], X_train[j])
    
    # Step 2: 计算交叉核向量 κ (m×1)
    kappa = np.zeros(m)
    for i in range(m):
        kappa[i] = (m / m_prime) * sum(kernel(X_train[i], X_test[j]) for j in range(m_prime))
    
    # Step 3: 求解凸二次规划
    # min  ½ β⊤Kβ - κ⊤β
    # s.t. 0 ≤ β_i ≤ B,  ∀i
    #      |Σβ_i - m| ≤ m·ε
    beta = solve_QP(H=K, f=-kappa, 
                    lb=0, ub=B,
                    Aeq_constraint=abs(sum(beta) - m) <= m * epsilon)
    
    return beta

# 使用权重进行加权 SVM 训练
def weighted_SVM(X_train, y_train, beta, C, kernel):
    # 每个样本的惩罚系数为 β_i * C
    model = SVM(C_per_sample=[beta[i] * C for i in range(len(beta))],
                kernel=kernel)
    model.fit(X_train, y_train)
    return model
```

**动机与背景**

在现实机器学习应用中，训练数据与测试数据往往来自不同的分布。例如：
- 医学研究中的志愿者偏差（健康人群更愿意参与）
- 跨平台基因芯片数据的分布差异
- 调查问卷中的自选择偏差

这种现象被称为**协变量偏移 (Covariate Shift)**，形式化为：训练分布 \(P_{\text{tr}}(x)\) 与测试分布 \(P_{\text{te}}(x)\) 不同，但条件分布 \(P(y|x)\) 保持不变。传统方法假设训练与测试同分布 (i.i.d.)，在此场景下会产生有偏估计。

经典的纠正方法是**重要性加权 (Importance Weighting)**：对训练样本赋予权重 \(\beta(x_i) = P_{\text{te}}(x_i) / P_{\text{tr}}(x_i)\)，使得加权经验风险成为测试分布下真实风险的无偏估计。然而，直接估计密度比 \(P_{\text{te}}/P_{\text{tr}}\) 需要分别进行两个高维密度估计，这在高维空间中极为困难且不稳定。

> 💡 关键：KMM 的核心洞察是——我们不需要估计两个密度再求比值，而是可以直接通过匹配分布在 RKHS 中的均值嵌入来获得密度比。

**核心机制：RKHS 均值嵌入与匹配**

KMM 的理论基础建立在**核均值嵌入 (Kernel Mean Embedding)** 之上。对于分布 \(P\)，其在 RKHS \(\mathcal{H}\) 中的均值嵌入定义为：

$$\mu[P] = \mathbb{E}_{x \sim P}[\phi(x)] \in \mathcal{H}$$

其中 \(\phi: \mathcal{X} \to \mathcal{H}\) 是核函数 \(k\) 对应的特征映射。

**定理 1 (单射性)**：当核函数 \(k\) 是 universal kernel（如高斯核 \(k(x,x') = \exp(-\|x-x'\|^2/2\sigma^2)\)）时，均值映射 \(\mu\) 是单射的，即：

$$\mu[P] = \mu[Q] \iff P = Q$$

这意味着，如果我们能找到权重 \(\beta\) 使得加权训练分布的均值嵌入等于测试分布的均值嵌入，那么加权后的分布就等于测试分布，从而 \(\beta(x)\) 就是真实的密度比。

形式化地，KMM 的目标是最小化：

$$\left\| \mu[\tilde{P}_{\text{tr}}] - \mu[P_{\text{te}}] \right\|_{\mathcal{H}}^2 = \left\| \mathbb{E}_{x \sim P_{\text{tr}}}[\beta(x)\phi(x)] - \mathbb{E}_{x \sim P_{\text{te}}}[\phi(x)] \right\|_{\mathcal{H}}^2$$

**从总体到经验：QP 公式推导**

将总体期望替换为经验均值，并利用核技巧 \(\langle \phi(x_i), \phi(x_j) \rangle = k(x_i, x_j)\)，得到经验版本的优化问题：

$$\min_{\beta} \frac{1}{2} \boldsymbol{\beta}^\top \mathbf{K} \boldsymbol{\beta} - \boldsymbol{\kappa}^\top \boldsymbol{\beta}$$

$$\text{s.t.} \quad \beta_i \in [0, B], \quad \left| \sum_{i=1}^{m} \beta_i - m \right| \leq m\epsilon$$

其中：
- \(\mathbf{K} \in \mathbb{R}^{m \times m}\)：训练集上的核矩阵，\(K_{ij} = k(x_i, x_j)\)
- \(\boldsymbol{\kappa} \in \mathbb{R}^m\)：交叉核向量，\(\kappa_i = \frac{m}{m'} \sum_{j=1}^{m'} k(x_i, x'_j)\)
- \(B\)：权重上界（实验中取 \(B = 1000\)），防止单个样本权重过大
- \(\epsilon = (\sqrt{m} - 1)/\sqrt{m}\)：松弛参数，随样本量增大趋近于 1

> ⚠️ 注意：约束 \(|\sum \beta_i - m| \leq m\epsilon\) 确保加权后的"有效样本量"接近原始样本量 \(m\)，这是保证 \(\beta\) 对应一个合法概率密度比的必要条件。

**理论保证与收敛性**

- **Lemma 2**：目标函数是凸的（\(\mathbf{K}\) 半正定），约束集是凸的，因此 QP 有唯一全局最优解。当 \(m, m' \to \infty\) 时，最优解收敛到真实密度比 \(P_{\text{te}}(x)/P_{\text{tr}}(x)\)。

- **Lemma 3-4 (有限样本界)**：经验 KMM 解 \(\hat{\beta}\) 与总体最优解 \(\beta^*\) 之间的 MMD 差距以 \(O(B/\sqrt{m})\) 的速率收敛到零：

$$\text{MMD}[\hat{P}_\beta, P_{\text{te}}] \leq O\left(\frac{B}{\sqrt{m}} + \frac{1}{\sqrt{m'}}\right)$$

**与传统方法的区别**

| 方法 | 是否需要密度估计 | 是否需要测试标签 | 计算复杂度 | 适用维度 |
|------|:---:|:---:|:---:|:---:|
| 密度比直接估计 | ✅ 需要两个密度 | ❌ | 高 | 低维 |
| KDE + 比值 | ✅ 核密度估计 | ❌ | 中 | 低维 |
| **KMM** | ❌ 无需密度估计 | ❌ | \(O(m^3)\) QP | 高维可用 |
| KLIEP (后续工作) | ❌ 直接估计比值 | ❌ | 中 | 高维可用 |

KMM 相比传统方法的核心优势：
1. **避免密度估计**：直接在 RKHS 中操作，绕过了高维密度估计的维度灾难
2. **凸优化保证**：QP 问题有唯一全局最优解，无局部极值问题
3. **仅需无标签测试数据**：不需要测试集的标签信息
4. **理论完备**：有明确的收敛速率和一致性保证

**实验验证**

论文在多个场景下验证了 KMM 的有效性：
- **玩具回归问题**：人工构造协变量偏移，KMM 加权后的回归曲线显著优于未加权版本
- **UCI 乳腺癌分类**：在基于特征的偏采样、基于距离的偏采样、甚至基于标签的偏采样（违反协变量偏移假设）下，KMM 均能提升分类精度
- **跨平台基因芯片**：不同实验平台产生的基因表达数据存在系统性分布差异，KMM 有效校正了跨平台偏差

#### 🧪 练习题

```yaml
question: "KMM 方法为什么不需要进行显式的概率密度估计就能获得密度比？"
options:
  - "因为它使用了参数化的密度比模型进行拟合"
  - "因为它利用 RKHS 均值嵌入的单射性，通过匹配分布均值间接确定密度比"
  - "因为它假设训练和测试分布都是高斯分布"
  - "因为它通过交叉验证直接选择最优权重"
answer: 1
explain: "当核函数为 universal kernel 时，RKHS 中的均值嵌入是单射映射，分布与其均值嵌入一一对应。因此匹配均值嵌入等价于匹配分布本身，无需估计密度即可通过 QP 求解密度比。"
```