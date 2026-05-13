### MCMC

```yaml
id: mcmc
name: MCMC
full_name: 马尔可夫链蒙特卡洛 (Markov Chain Monte Carlo)
year: "1953"
org: Los Alamos
paper_url: https://pubs.aip.org/jcp/article/21/6/1087/201161
category: foundation
parent: "—"
motivation: 高维空间高效随机采样
```

#### 📝 一句话总结

Metropolis 等人提出了一种基于马尔可夫链的蒙特卡洛采样方法，通过构造满足细致平衡条件的接受-拒绝准则，使得采样链收敛到目标玻尔兹曼分布，从而在高维空间中高效计算统计力学系统的状态方程，奠定了现代 MCMC 方法的理论基础。

#### 🎯 核心要点

- **Metropolis 接受准则**：对能量降低的移动无条件接受；对能量升高的移动以概率 \(\exp(-\Delta E / k_BT)\) 接受，确保满足细致平衡（detailed balance）
- **马尔可夫链构造**：通过"提议→接受/拒绝"的迭代机制构建遍历的马尔可夫链，其平稳分布即为目标分布 \(\pi(\mathbf{x}) \propto \exp(-E(\mathbf{x})/k_BT)\)
- **蒙特卡洛积分**：将高维积分（配分函数、热力学量期望）转化为对马尔可夫链样本的算术平均，避免了对全空间的网格求和
- **硬盘/硬球系统验证**：在 MANIAC I 计算机上对 224 个二维硬盘粒子系统进行模拟，计算了不同密度下的状态方程 \(pV/Nk_BT\)
- **周期性边界条件**：采用周期性边界消除有限尺寸效应，使小系统模拟近似无穷大系统
- **对称提议分布**：提议步采用均匀随机位移，保证提议概率对称 \(q(\mathbf{x}'|\mathbf{x}) = q(\mathbf{x}|\mathbf{x}')\)，简化了接受概率的计算

#### 🔬 深入细节

![Metropolis 算法采样示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Metropolis_hastings_algorithm.svg/800px-Metropolis_hastings_algorithm.svg.png)
*图：Metropolis-Hastings 算法在二维目标分布上的采样轨迹示意。蓝色点为接受的样本，红色点为拒绝的提议，采样链逐步覆盖高概率区域。*

```python
# Metropolis 算法伪代码（原始论文核心逻辑）
import numpy as np

def metropolis(energy_func, x_init, n_steps, step_size, temperature):
    """
    energy_func: 能量函数 E(x)
    x_init:      初始构型 (N个粒子的坐标)
    n_steps:     总迭代步数
    step_size:   最大位移量 δ
    temperature: 温度 T (k_B=1)
    """
    x = x_init.copy()
    samples = [x.copy()]
    E_current = energy_func(x)

    for step in range(n_steps):
        # 1. 随机选择一个粒子 i
        i = np.random.randint(len(x))

        # 2. 提议新位置：均匀随机位移
        dx = np.random.uniform(-step_size, step_size, size=x[i].shape)
        x_new = x.copy()
        x_new[i] = x[i] + dx

        # 3. 计算能量变化
        E_new = energy_func(x_new)
        delta_E = E_new - E_current

        # 4. Metropolis 接受准则
        if delta_E <= 0:
            # 能量降低 → 无条件接受
            x = x_new
            E_current = E_new
        else:
            # 能量升高 → 以概率 exp(-ΔE/T) 接受
            if np.random.random() < np.exp(-delta_E / temperature):
                x = x_new
                E_current = E_new
            # 否则拒绝，保持原构型

        samples.append(x.copy())

    return samples
```

##### 动机与背景

1953 年，统计力学面临的核心计算难题是：对于 \(N\) 个粒子组成的系统，其热力学性质（如压强、内能）需要对 \(2N\) 维（二维情形）或 \(3N\) 维（三维情形）的构型空间进行积分。以配分函数为例：

$$Z = \int \exp\left(-\frac{E(\mathbf{r}_1, \ldots, \mathbf{r}_N)}{k_B T}\right) d\mathbf{r}_1 \cdots d\mathbf{r}_N$$

传统的数值积分方法（如梯形法、Simpson 法）在高维空间中因"维度灾难"而完全失效——网格点数随维度指数增长。简单的蒙特卡洛方法（即在全空间均匀随机采样）虽然收敛速率与维度无关，但在高维空间中绝大多数随机点落在低概率区域，导致方差极大、效率极低。Metropolis 等人的关键洞察是：**不需要对全空间均匀采样，而应集中采样高概率区域**——这就是"重要性采样"（importance sampling）的思想。

##### 核心机制：Metropolis 接受准则

论文的核心创新在于设计了一种巧妙的接受-拒绝机制，使得采样链的平稳分布恰好是目标玻尔兹曼分布。具体而言：

**提议步骤**：从当前构型 \(\mathbf{X}\) 出发，随机选取一个粒子 \(i\)，对其坐标施加均匀随机位移：

$$x_i' = x_i + \xi_1 \cdot \delta, \quad y_i' = y_i + \xi_2 \cdot \delta$$

其中 \(\xi_1, \xi_2 \sim \text{Uniform}(-1, 1)\)，\(\delta\) 为最大位移步长。

**接受准则**：计算能量变化 \(\Delta E = E(\mathbf{X}') - E(\mathbf{X})\)，然后：

$$P_{\text{accept}} = \min\left(1, \, \exp\left(-\frac{\Delta E}{k_B T}\right)\right)$$

即：
- 若 \(\Delta E \leq 0\)（能量降低或不变），无条件接受新构型
- 若 \(\Delta E > 0\)（能量升高），生成均匀随机数 \(u \sim \text{Uniform}(0,1)\)，当 \(u < \exp(-\Delta E / k_BT)\) 时接受，否则拒绝

> 💡 **关键直觉**：这个准则的精妙之处在于，它允许系统"上坡"（接受能量更高的状态），但上坡的概率随能量差指数衰减。这使得采样链不会困在局部能量极小值中，而能够探索整个构型空间，最终按玻尔兹曼权重 \(\propto \exp(-E/k_BT)\) 访问各状态。

##### 理论保证：细致平衡与遍历性

Metropolis 算法之所以能收敛到目标分布，依赖两个关键数学性质：

**细致平衡条件（Detailed Balance）**：对任意两个构型 \(\mathbf{X}\) 和 \(\mathbf{X}'\)，转移概率满足：

$$\pi(\mathbf{X}) \cdot T(\mathbf{X} \to \mathbf{X}') = \pi(\mathbf{X}') \cdot T(\mathbf{X}' \to \mathbf{X})$$

其中 \(\pi(\mathbf{X}) \propto \exp(-E(\mathbf{X})/k_BT)\) 是目标分布，\(T(\mathbf{X} \to \mathbf{X}') = q(\mathbf{X}'|\mathbf{X}) \cdot \alpha(\mathbf{X}, \mathbf{X}')\) 是从 \(\mathbf{X}\) 转移到 \(\mathbf{X}'\) 的总概率（提议概率 × 接受概率）。由于提议分布对称 \(q(\mathbf{X}'|\mathbf{X}) = q(\mathbf{X}|\mathbf{X}')\)，可以验证 Metropolis 准则恰好满足此条件。

**遍历性（Ergodicity）**：由于提议步可以到达构型空间中任意位置（经过足够多步），马尔可夫链是不可约且非周期的，因此存在唯一的平稳分布，且链从任意初始状态出发都会收敛到该分布。

> ⚠️ **注意**：细致平衡是充分条件而非必要条件。满足细致平衡保证 \(\pi\) 是平稳分布，但更弱的"全局平衡"条件也足够。Metropolis 选择细致平衡是因为它更容易构造和验证。

##### 实验验证：硬盘系统的状态方程

论文在 Los Alamos 的 MANIAC I 计算机上对二维硬盘系统进行了验证。硬盘系统的能量函数极为简单：

$$E(\mathbf{r}_1, \ldots, \mathbf{r}_N) = \begin{cases} 0 & \text{若所有粒子间距} > d \\ +\infty & \text{若存在粒子重叠} \end{cases}$$

其中 \(d\) 为硬盘直径。在此势能下，接受准则简化为：若提议的新位置不导致粒子重叠则接受，否则拒绝（因为 \(\exp(-\infty) = 0\)）。

论文使用 224 个粒子、周期性边界条件，在不同面积分数（\(V/V_0\)，其中 \(V_0\) 为密堆积体积）下运行模拟，计算了约化压强 \(pV/Nk_BT\)。结果与已知的维里展开低阶项吻合良好，并首次给出了高密度区域的状态方程数据，为后续液-固相变的研究提供了关键参考。

##### 与传统方法的对比

| 方法 | 维度依赖 | 采样效率 | 适用场景 |
|------|---------|---------|---------|
| 网格积分 | \(O(M^d)\) 指数爆炸 | 低维精确 | \(d \leq 3\) |
| 简单蒙特卡洛 | \(O(1/\sqrt{N})\) 与维度无关 | 高维低概率区浪费严重 | 低维或均匀分布 |
| **Metropolis MCMC** | \(O(1/\sqrt{N})\) 与维度无关 | **集中采样高概率区** | **任意高维、复杂分布** |

Metropolis 方法的革命性在于：它将"均匀采样后加权"转变为"按目标分布直接采样"，使得每个样本都携带等量信息，极大提升了统计效率。

> 💡 **历史影响**：1953 年的 Metropolis 算法后来被 Hastings（1970）推广为 Metropolis-Hastings 算法（允许非对称提议分布），并衍生出 Gibbs 采样（Geman & Geman, 1984）、Hamiltonian Monte Carlo（Duane et al., 1987）等一系列方法，成为贝叶斯统计、机器学习、计算物理的基石工具。该论文被《Computing in Science & Engineering》评为 20 世纪十大算法之一。

#### 🧪 练习题

```yaml
question: "在 Metropolis 算法中，当提议的新构型能量高于当前构型时，算法如何处理？"
options:
  - "直接拒绝该提议，保持当前构型不变"
  - "以概率 exp(-ΔE/kT) 接受该提议，否则保持当前构型"
  - "将步长减半后重新提议"
  - "以概率 ΔE/kT 接受该提议"
answer: 1
explain: "Metropolis 准则的核心是：能量升高时以 exp(-ΔE/kT) 的概率接受，这保证了细致平衡条件，使采样链能跳出局部极小值并收敛到玻尔兹曼分布。"
```