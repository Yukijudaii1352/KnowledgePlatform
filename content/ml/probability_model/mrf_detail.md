### MRF

```yaml
id: mrf
name: MRF
full_name: 马尔可夫随机场 (Markov Random Field)
year: "1984"
org: Brown Univ.
paper_url: https://ieeexplore.ieee.org/abstract/document/4767596/
category: core
parent: mcmc
motivation: 无向图建模空间相关性
```

#### 📝 一句话总结

Geman 与 Geman 提出将马尔可夫随机场（MRF）作为图像的先验模型，利用 Hammersley-Clifford 定理建立 MRF 与 Gibbs 分布的等价关系，并引入 Gibbs 采样和模拟退火算法实现贝叶斯图像复原中的后验采样与 MAP 估计，奠定了空间统计建模与随机优化在计算机视觉中的理论基础。

#### 🎯 核心要点

- **马尔可夫随机场先验**：将图像像素建模为无向图上的随机场，像素值仅依赖于其邻域（局部马尔可夫性），自然编码空间相关性与局部平滑约束
- **Hammersley-Clifford 定理**：证明满足正性条件的随机场是 MRF 当且仅当其联合分布为 Gibbs 分布 \(P(\mathbf{x}) = Z^{-1}\exp(-U(\mathbf{x})/T)\)，其中能量函数 \(U(\mathbf{x})\) 可分解为团势函数之和
- **Gibbs 采样器**：提出逐像素条件采样的迭代算法，证明其生成的马尔可夫链收敛到联合 Gibbs 分布，为高维 MRF 提供了可行的采样方案
- **模拟退火（Simulated Annealing）**：将温度参数 \(T\) 按对数调度 \(T_n = c/\log(1+n)\) 逐步降低，证明在此调度下 Gibbs 采样器以概率 1 收敛到全局能量最小值（MAP 估计）
- **贝叶斯图像复原框架**：将退化观测建模为似然 \(P(\mathbf{y}|\mathbf{x})\)，MRF 作为先验 \(P(\mathbf{x})\)，通过后验 \(P(\mathbf{x}|\mathbf{y}) \propto P(\mathbf{y}|\mathbf{x})P(\mathbf{x})\) 进行复原
- **线过程（Line Process）**：引入二值边缘变量显式建模不连续性（边缘），使 MRF 先验能同时编码区域平滑性与边界保持

#### 🔬 深入细节

![MRF 图模型与邻域系统示意](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Markov_random_field_example.png/400px-Markov_random_field_example.png)
*图：马尔可夫随机场的图结构示意。每个节点表示一个像素随机变量，边连接相邻像素，体现局部马尔可夫性：给定邻域后，中心像素条件独立于所有其他像素。*

```python
# Gibbs 采样器 + 模拟退火用于 MRF 图像复原（论文核心算法）
import numpy as np

def gibbs_sampler_annealing(y, beta, sigma, n_iter, T_schedule):
    """
    y:          观测退化图像 (H x W)
    beta:       MRF 先验中邻域交互强度
    sigma:      观测噪声标准差
    n_iter:     总迭代次数
    T_schedule: 温度调度函数 T(n)
    """
    H, W = y.shape
    # 初始化为观测图像
    x = y.copy()
    labels = np.unique(y)  # 离散标签集合

    for n in range(1, n_iter + 1):
        T = T_schedule(n)  # 当前温度，如 T(n) = c / log(1+n)

        # 逐像素 Gibbs 采样（随机扫描或光栅扫描）
        for i in range(H):
            for j in range(W):
                # 计算每个可能标签的条件能量
                energies = []
                for label in labels:
                    # 似然能量（数据项）
                    E_data = (y[i, j] - label) ** 2 / (2 * sigma ** 2)

                    # 先验能量（MRF 团势：Ising/Potts 模型）
                    E_prior = 0
                    for di, dj in [(-1,0),(1,0),(0,-1),(0,1)]:
                        ni, nj = i + di, j + dj
                        if 0 <= ni < H and 0 <= nj < W:
                            E_prior += beta * (1 if x[ni, nj] != label else 0)

                    energies.append(E_data + E_prior)

                # Gibbs 条件分布
                energies = np.array(energies)
                probs = np.exp(-energies / T)
                probs /= probs.sum()

                # 按条件分布采样
                x[i, j] = np.random.choice(labels, p=probs)

    return x  # 退火后近似 MAP 估计
```

##### 动机与背景

1984 年之前，图像处理领域主要依赖确定性方法（如线性滤波、边缘检测算子），缺乏统一的概率建模框架来处理噪声去除、纹理分析和图像分割等问题。核心困难在于：图像具有强烈的**空间相关性**——相邻像素倾向于取相似值（平滑区域），但又存在突变（边缘）。如何用概率模型同时编码这两种特性？

传统的独立像素假设（每个像素独立同分布）完全忽略空间结构；而直接指定高维联合分布 \(P(x_1, x_2, \ldots, x_N)\)（\(N\) 为像素总数，通常 \(>10^5\)）在参数化和计算上都不可行。Geman 与 Geman 的关键洞察是：**利用无向图模型（MRF）通过局部交互隐式定义全局联合分布**，使得模型既能捕获空间相关性，又在参数和计算上可控。

##### 核心机制一：MRF 与 Gibbs 分布的等价性

论文的理论基石是 **Hammersley-Clifford 定理**。设 \(S = \{1, 2, \ldots, N\}\) 为像素集合（图的节点），\(\partial_i\) 为像素 \(i\) 的邻域。随机场 \(\mathbf{X} = (X_1, \ldots, X_N)\) 称为关于邻域系统 \(\{\partial_i\}\) 的 MRF，若满足：

$$P(X_i = x_i \mid X_j = x_j, \, j \neq i) = P(X_i = x_i \mid X_j = x_j, \, j \in \partial_i)$$

即给定邻域后，中心像素条件独立于所有非邻域像素。Hammersley-Clifford 定理指出，若 \(P(\mathbf{x}) > 0\) 对所有构型成立（正性条件），则 \(\mathbf{X}\) 是 MRF 当且仅当其联合分布为 Gibbs 分布：

$$P(\mathbf{x}) = \frac{1}{Z} \exp\left(-\frac{U(\mathbf{x})}{T}\right), \quad Z = \sum_{\mathbf{x}} \exp\left(-\frac{U(\mathbf{x})}{T}\right)$$

其中能量函数 \(U(\mathbf{x})\) 可唯一分解为**团势函数**之和：

$$U(\mathbf{x}) = \sum_{c \in \mathcal{C}} V_c(\mathbf{x})$$

\(\mathcal{C}\) 是图中所有团（clique，即完全子图）的集合，\(V_c\) 仅依赖于团 \(c\) 中节点的取值。

> 💡 **关键直觉**：这个定理将"局部条件独立性"（MRF 定义，直观但难以直接计算）与"全局 Gibbs 分布"（参数化形式，可通过能量函数设计）等价起来。建模者只需设计局部的团势函数，就自动获得了一个满足空间马尔可夫性的全局概率模型。

##### 核心机制二：Gibbs 采样器

即使有了 Gibbs 分布的显式形式，直接计算后验期望或 MAP 估计仍然不可行，因为配分函数 \(Z\) 涉及对所有可能构型（指数多个）的求和。论文提出 **Gibbs 采样器**（也称热浴算法）作为解决方案：

**算法**：在每一步中，随机选取一个像素 \(i\)，根据其**完全条件分布**重新采样：

$$P(X_i = x_i \mid \mathbf{X}_{\setminus i} = \mathbf{x}_{\setminus i}) = \frac{\exp(-U_i(x_i) / T)}{\sum_{x_i'} \exp(-U_i(x_i') / T)}$$

其中 \(U_i(x_i)\) 仅涉及包含像素 \(i\) 的团的势函数之和（因此只依赖邻域值）。

论文证明了：在温度 \(T\) 固定时，Gibbs 采样器生成的马尔可夫链满足细致平衡条件，且是遍历的，因此从任意初始状态出发都收敛到目标 Gibbs 分布 \(P(\mathbf{x})\)。这使得通过长时间运行采样器并收集样本，可以近似计算任意后验统计量（如条件均值、边缘概率等）。

> ⚠️ **注意**：Gibbs 采样器是 MCMC 方法的一个特例——它等价于 Metropolis-Hastings 算法中接受率恒为 1 的情形（因为提议分布就是完全条件分布）。论文正是在 Metropolis 算法（1953）的基础上，针对 MRF 的条件独立结构设计了更高效的采样方案。

##### 核心机制三：模拟退火与 MAP 估计

对于图像复原，通常需要找到后验概率最大的构型（MAP 估计），即最小化后验能量。这是一个组合优化问题（NP-hard），传统的贪心方法（如 ICM，Iterated Conditional Modes）容易陷入局部极小值。

论文将物理学中的**模拟退火**思想与 Gibbs 采样结合：在采样过程中逐步降低温度 \(T\)。高温时分布接近均匀（广泛探索），低温时分布集中在能量最低的状态（精细优化）。关键理论结果是：

$$\text{若温度调度满足 } T_n \geq \frac{c}{\log(1+n)}, \text{ 其中 } c \geq \Delta^* \text{（最大能量壁垒）}$$

则 Gibbs 采样器以概率 1 收敛到全局能量最小值集合。这是论文最重要的理论贡献之一——它为随机优化提供了严格的收敛保证。

$$\lim_{n \to \infty} P(\mathbf{X}^{(n)} \in \arg\min U(\mathbf{x})) = 1$$

##### 贝叶斯图像复原框架

论文将上述工具整合为完整的贝叶斯复原框架：

1. **先验模型**：图像 \(\mathbf{x}\) 服从 MRF/Gibbs 分布，能量函数编码平滑性（如 Ising 模型的 \(V_c(x_i, x_j) = \beta \cdot \mathbf{1}[x_i \neq x_j]\)）和边缘保持（通过线过程）
2. **似然模型**：观测 \(\mathbf{y}\) 由真实图像经退化（模糊+噪声）得到，\(P(\mathbf{y}|\mathbf{x}) \propto \exp(-\|\mathbf{y} - H\mathbf{x}\|^2 / 2\sigma^2)\)
3. **后验推断**：后验 \(P(\mathbf{x}|\mathbf{y}) \propto P(\mathbf{y}|\mathbf{x})P(\mathbf{x})\) 仍为 Gibbs 分布，能量为 \(U_{\text{posterior}} = U_{\text{data}} + U_{\text{prior}}\)
4. **求解**：用 Gibbs 采样 + 模拟退火找到 MAP 估计

> 💡 **历史影响**：这篇论文开创了将概率图模型用于计算机视觉的范式，直接催生了条件随机场（CRF, Lafferty 2001）、图割优化（Boykov 2001）等后续工作。MRF 模型至今仍是图像分割、立体匹配、纹理合成等任务的核心建模工具。Gibbs 采样则成为贝叶斯统计中最广泛使用的 MCMC 方法之一。

##### 与传统方法的对比

| 方法 | 空间建模 | 不确定性量化 | 全局最优保证 | 适用场景 |
|------|---------|------------|------------|---------|
| 线性滤波（维纳滤波） | 平稳假设，全局频域 | 无 | 线性最优 | 平稳退化、高斯噪声 |
| 边缘检测 + 区域生长 | 启发式局部规则 | 无 | 无 | 简单场景 |
| **MRF + Gibbs 采样** | **局部马尔可夫性，灵活团势** | **完整后验分布** | **模拟退火保证** | **复杂纹理、非平稳、多类分割** |

#### 🧪 练习题

```yaml
question: "Hammersley-Clifford 定理建立了什么等价关系？"
options:
  - "有向图模型与无向图模型之间的等价"
  - "满足正性条件的马尔可夫随机场与 Gibbs 分布之间的等价"
  - "Gibbs 采样与 Metropolis-Hastings 算法之间的等价"
  - "模拟退火与梯度下降之间的等价"
answer: 1
explain: "Hammersley-Clifford 定理证明：在正性条件下，随机场满足关于邻域系统的局部马尔可夫性（MRF）当且仅当其联合分布为 Gibbs 分布（能量可分解为团势函数之和），这是 MRF 建模的理论基石。"
```