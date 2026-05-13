### CRF — 条件随机场 (Conditional Random Field)

```yaml
id: crf
name: CRF
full_name: 条件随机场 (Conditional Random Field)
year: '2001'
org: CMU
paper_url: https://repository.upenn.edu/handle/20.500.14332/6188
category: core
parent: hmm
motivation: 判别式建模克服标签偏置
```

#### 📝 一句话总结

Lafferty 等人提出了条件随机场（CRF），一种基于无向图模型的判别式序列标注框架，通过对整个标签序列进行全局归一化来建模条件概率 $p(\mathbf{y}|\mathbf{x})$，从根本上解决了 MEMM 等局部归一化模型的**标签偏置问题（Label Bias Problem）**，并在保持凸优化目标的同时支持任意观测特征依赖，成为序列标注任务的里程碑方法。

#### 🎯 核心要点

- **标签偏置问题的诊断与解决**：MEMM 等有向判别模型在每个状态进行局部归一化，导致低熵状态（出边少的状态）几乎忽略观测信息，CRF 通过全局归一化彻底消除此缺陷
- **条件随机场的形式化定义**：给定图 $G=(V,E)$，当 $Y$ 在以 $X$ 为条件时满足关于 $G$ 的马尔可夫性，则 $(X,Y)$ 构成条件随机场
- **链式 CRF 的参数化形式**：$p_\theta(\mathbf{y}|\mathbf{x}) \propto \exp\left(\sum_{e,k} \lambda_k f_k(e, \mathbf{y}|_e, \mathbf{x}) + \sum_{v,k} \mu_k g_k(v, \mathbf{y}|_v, \mathbf{x})\right)$，其中 $f_k$ 为边特征，$g_k$ 为顶点特征
- **矩阵形式与高效推断**：定义转移矩阵 $M_i(y',y|\mathbf{x})$，配分函数 $Z(\mathbf{x})$ 为矩阵连乘的 (start, stop) 元素，前向-后向算法实现 $O(|\mathcal{Y}|^2 n)$ 复杂度的精确推断
- **凸优化目标与 IIS 参数估计**：对数似然函数关于参数 $\theta$ 是凸函数，采用改进的迭代缩放算法（Algorithm S / Algorithm T）保证全局收敛
- **判别式 vs 生成式的统一视角**：CRF 可包含 HMM 作为特例（定义状态对特征和状态-观测特征），但允许任意观测依赖，无需建模 $p(\mathbf{x})$

#### 🔬 深入细节

##### 模型框架对比示意

```
HMM (生成式)          MEMM (判别式-局部)       CRF (判别式-全局)
                                              
  Y₁ → Y₂ → Y₃        Y₁ → Y₂ → Y₃          Y₁ — Y₂ — Y₃
  ↓    ↓    ↓          ↑    ↑    ↑            |    |    |
  X₁   X₂   X₃        X₁   X₂   X₃          X₁   X₂   X₃
                                              
 有向图,联合建模       有向图,局部归一化        无向图,全局归一化
 p(x,y)=∏p(yᵢ|yᵢ₋₁)  p(y|x)=∏p(yᵢ|yᵢ₋₁,x)  p(y|x)=exp(Σλf)/Z(x)
        ·p(xᵢ|yᵢ)    ↑ 标签偏置！             ✓ 无标签偏置
```

*图：三种序列模型的图结构对比。HMM 是生成式有向图模型；MEMM 是判别式有向图模型但受标签偏置困扰；CRF 是判别式无向图模型，通过全局归一化避免标签偏置。*

##### 算法伪代码

```python
# CRF 前向-后向推断 + IIS 参数估计伪代码
def crf_train(data, features_f, features_g, max_iter):
    """
    data: 训练集 {(x⁽ⁱ⁾, y⁽ⁱ⁾)}
    features_f: 边特征函数列表 fk(e, y|e, x)
    features_g: 顶点特征函数列表 gk(v, y|v, x)
    """
    # 1. 初始化参数
    lambda_k = zeros(len(features_f))  # 边特征权重
    mu_k = zeros(len(features_g))      # 顶点特征权重

    for iteration in range(max_iter):
        for x, y in data:
            n = len(x)
            # === 构造转移矩阵 ===
            # Mi(y', y | x) = exp(Σk λk·fk(ei, y'→y, x) + Σk μk·gk(vi, y, x))
            M = [build_transition_matrix(i, x, lambda_k, mu_k) for i in range(n+2)]

            # === 前向算法 ===
            # α₀(start) = 1, α₀(others) = 0
            # αᵢ = αᵢ₋₁ · Mᵢ(x)    (向量-矩阵乘法)
            alpha = forward(M)

            # === 后向算法 ===
            # βₙ₊₁(stop) = 1, βₙ₊₁(others) = 0
            # βᵢᵀ = Mᵢ₊₁(x) · βᵢ₊₁
            beta = backward(M)

            # === 计算配分函数 ===
            # Z(x) = (M₁·M₂·...·Mₙ₊₁)[start, stop] = Σy' αₙ₊₁(y')
            Z_x = compute_partition(alpha)

            # === 计算特征期望 ===
            # E_model[fk] = Σᵢ Σy',y αᵢ₋₁(y')·Mᵢ(y',y|x)·βᵢ(y) / Z(x)
            E_model_f = compute_edge_expectations(alpha, beta, M, Z_x)
            E_model_g = compute_vertex_expectations(alpha, beta, M, Z_x)

        # === IIS 参数更新 ===
        # δλk = (1/S) · log(E_empirical[fk] / E_model[fk])
        # 或求解多项式方程 (Algorithm T)
        lambda_k += delta_lambda
        mu_k += delta_mu

    return lambda_k, mu_k

def crf_viterbi_decode(x, lambda_k, mu_k):
    """Viterbi 解码：寻找最优标签序列 y* = argmax_y p(y|x)"""
    n = len(x)
    # δᵢ(y) = max_{y₁...yᵢ₋₁} Σ scores
    # 与 HMM Viterbi 相同结构，但用 log-linear 分数替代概率
    for i in range(1, n+1):
        for y in label_set:
            delta[i][y] = max_{y'} (delta[i-1][y'] + Λᵢ(y', y | x))
            psi[i][y] = argmax_{y'} (delta[i-1][y'] + Λᵢ(y', y | x))
    # 回溯
    y_star = backtrack(delta, psi)
    return y_star
```

##### 动机与背景：标签偏置问题

序列标注是 NLP 中的核心任务，包括词性标注、命名实体识别、信息抽取等。在 CRF 提出之前，主流方法包括生成式的 HMM 和判别式的 MEMM（最大熵马尔可夫模型）。HMM 建模联合概率 $p(\mathbf{x}, \mathbf{y})$，受限于观测独立性假设，无法利用丰富的重叠特征；MEMM 虽然是判别式模型，允许任意特征，但存在一个根本性缺陷——**标签偏置问题（Label Bias Problem）**。

标签偏置的本质在于 MEMM 的**局部归一化**机制。在 MEMM 中，每个状态的转移概率 $p(y_i | y_{i-1}, \mathbf{x})$ 在该状态的所有出边上归一化为 1。这意味着无论观测 $\mathbf{x}$ 如何，每个状态都必须将全部概率质量分配给其出边。当某个状态只有少量出边时（低熵状态），该状态几乎无法根据观测来区分不同的后继状态——概率质量被"强制"传递，观测信息被忽略。论文用一个区分 "rib" 和 "rob" 的简单有限状态模型生动地展示了这一问题：即使观测序列明确是 "r i b"，由于中间状态只有一条出边，两条路径的概率几乎相等。

##### 核心机制：全局归一化的条件随机场

CRF 的核心创新在于采用**无向图模型**并进行**全局归一化**。对于链式结构的 CRF，条件概率定义为：

$$p_\theta(\mathbf{y}|\mathbf{x}) = \frac{1}{Z(\mathbf{x})} \exp\left(\sum_{i,k} \lambda_k f_k(e_i, \mathbf{y}|_{e_i}, \mathbf{x}) + \sum_{i,k} \mu_k g_k(v_i, \mathbf{y}|_{v_i}, \mathbf{x})\right)$$

其中 $Z(\mathbf{x}) = \sum_{\mathbf{y}} \exp(\cdots)$ 是依赖于整个观测序列的全局配分函数。与 MEMM 的关键区别在于：
- **MEMM**：$p(\mathbf{y}|\mathbf{x}) = \prod_i p(y_i | y_{i-1}, \mathbf{x})$，每个因子独立归一化 → 局部归一化
- **CRF**：$p(\mathbf{y}|\mathbf{x}) = \frac{1}{Z(\mathbf{x})} \prod_i \Psi_i(y_{i-1}, y_i, \mathbf{x})$，势函数 $\Psi_i$ 无需归一化，仅在全局除以 $Z(\mathbf{x})$ → 全局归一化

全局归一化使得每条转移边可以根据观测自由地"放大"或"衰减"其分数，不受局部概率守恒的约束。这正是解决标签偏置的关键：低熵状态的转移不再被迫忽略观测，而是可以通过特征权重灵活调整。

##### 高效推断：矩阵形式与前向-后向算法

论文的一个重要技术贡献是将链式 CRF 的推断统一为矩阵运算。对于观测序列 $\mathbf{x}$ 的每个位置 $i$，定义 $|\mathcal{Y}| \times |\mathcal{Y}|$ 的转移矩阵：

$$M_i(y', y | \mathbf{x}) = \exp\left(\Lambda_i(y', y | \mathbf{x})\right)$$

其中 $\Lambda_i$ 汇总了位置 $i$ 处所有边特征和顶点特征的加权和。配分函数可以表示为矩阵连乘：

$$Z_\theta(\mathbf{x}) = \left(M_1(\mathbf{x}) \cdot M_2(\mathbf{x}) \cdots M_{n+1}(\mathbf{x})\right)_{\text{start, stop}}$$

前向向量 $\boldsymbol{\alpha}_i$ 和后向向量 $\boldsymbol{\beta}_i$ 的递推关系为：

$$\boldsymbol{\alpha}_i = \boldsymbol{\alpha}_{i-1} \cdot M_i(\mathbf{x}), \quad \boldsymbol{\beta}_i^\top = M_{i+1}(\mathbf{x}) \cdot \boldsymbol{\beta}_{i+1}$$

这与 HMM 的前向-后向算法结构完全对应，但关键区别在于：CRF 的转移矩阵 $M_i$ 直接从观测 $\mathbf{x}$ 和参数 $\theta$ 计算得到，无需枚举所有可能的观测序列（因为是判别式模型）。推断复杂度为 $O(|\mathcal{Y}|^2 \cdot n)$，与 HMM 相同。

##### 参数估计：迭代缩放与凸优化

CRF 的对数似然目标函数：

$$\mathcal{O}(\theta) = \sum_{i=1}^{N} \log p_\theta(\mathbf{y}^{(i)} | \mathbf{x}^{(i)})$$

是关于参数 $\theta$ 的**凸函数**（继承自最大熵模型的性质），这保证了任何局部最优都是全局最优。论文提出了两种基于改进迭代缩放（IIS）的算法：

1. **Algorithm S（松弛特征法）**：引入一个"松弛特征" $s(\mathbf{x}, \mathbf{y}) = S - \sum_{i,k} f_k - \sum_{i,k} g_k$，使得总特征计数恒为常数 $S$，从而简化更新公式为 $\delta\lambda_k = \frac{1}{S} \log \frac{\tilde{E}[f_k]}{E_\theta[f_k]}$。缺点是 $S$ 可能很大（与最长序列成正比），导致收敛缓慢。

2. **Algorithm T（分段追踪法）**：按特征总数 $T(\mathbf{x})$ 分组累积期望，通过求解多项式方程 $\sum_t a_{k,t} \beta_k^t = \tilde{E}[f_k]$ 来获得更新量，收敛速度更快。

两种算法的单次迭代复杂度与 HMM 的 Baum-Welch 算法相当。

#### 🧪 练习题

```yaml
exercises:
  - question: "请解释标签偏置问题（Label Bias Problem）的本质原因，并说明为什么 CRF 能解决而 MEMM 不能。"
    hint: "关键词：局部归一化 vs 全局归一化，概率质量守恒，低熵状态"
    answer: "标签偏置的根因是 MEMM 在每个状态进行局部归一化，使得概率质量在出边上守恒。当某状态出边少时，无论观测如何，概率都被强制分配给有限的出边，导致观测信息被忽略。CRF 采用全局归一化（整个序列只有一个配分函数 Z(x)），势函数无需局部归一化，每条边可以根据观测自由放大或衰减分数，从根本上消除了标签偏置。"

  - question: "写出链式 CRF 的条件概率公式，并解释配分函数 Z(x) 如何通过矩阵连乘高效计算。"
    hint: "定义转移矩阵 Mi(y',y|x)，利用前向向量"
    answer: "p(y|x) = (1/Z(x)) · exp(Σ_{i,k} λk·fk(ei, y|ei, x) + Σ_{i,k} μk·gk(vi, y|vi, x))。定义 |Y|×|Y| 转移矩阵 Mi(y',y|x) = exp(Λi(y',y|x))，则 Z(x) = (M1·M2·...·Mn+1)[start,stop]。通过前向递推 αi = αi-1 · Mi 即可在 O(|Y|²·n) 时间内计算 Z(x)，避免对所有 |Y|^n 条路径的暴力求和。"

  - question: "CRF 的对数似然函数为什么是凸函数？这对参数估计有什么实际意义？"
    hint: "与最大熵模型的关系，指数族分布的性质"
    answer: "CRF 属于对数线性模型（指数族），其对数似然可以写成 Σ θ·f(x,y) - log Z(x) 的形式。第一项关于 θ 是线性的，第二项 log Z(x) 是 log-sum-exp 形式，关于 θ 是凸函数，因此负对数似然是凸函数。凸性保证不存在局部最优陷阱，任何梯度方法（包括 IIS）都能收敛到全局最优，这是相对于神经网络等非凸模型的重要优势。"

  - question: "对比 HMM、MEMM 和 CRF 三种模型在建模方式、归一化方式和特征表达能力上的异同。"
    hint: "生成式 vs 判别式，有向 vs 无向，观测独立性假设"
    answer: "HMM：生成式有向模型，建模 p(x,y)=∏p(yi|yi-1)·p(xi|yi)，全局归一化（联合概率自动归一），但受观测独立性假设限制，无法使用重叠特征。MEMM：判别式有向模型，建模 p(y|x)=∏p(yi|yi-1,x)，局部归一化（每个状态独立归一），支持任意特征但有标签偏置。CRF：判别式无向模型，建模 p(y|x)=exp(Σλf)/Z(x)，全局归一化，支持任意特征且无标签偏置，对数似然凸优化。"
```