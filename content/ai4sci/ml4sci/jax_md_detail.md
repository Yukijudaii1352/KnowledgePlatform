### JAX-MD — JAX分子动力学 (JAX Molecular Dynamics)

```yaml
id: jax_md
name: JAX-MD
full_name: JAX分子动力学 (JAX Molecular Dynamics)
year: '2020'
org: DeepMind
paper_url: https://github.com/google/jax-md
category: diff_sim
parent: —
motivation: 端到端可微分分子动力学框架
```

#### 📝 一句话总结

JAX-MD 把分子动力学写成 JAX 中的纯函数组合，使能量、力、积分器、邻居表和神经势能都可以端到端自动微分并经 XLA 加速，解决传统 MD 软件难以直接接入机器学习优化回路的问题。

#### 🎯 核心要点

- **项目页追溯论文**：任务给定 URL 是 GitHub 项目页；方法精读使用官方仓库、NeurIPS 2020 论文和 arXiv `1912.04232`
- **函数式数据流**：状态由数组/dataclass 表示，模拟由 `init_fn` 和 `update_fn` 组成，避免复杂类层次和隐式可变状态
- **JAX transformation 原生组合**：`grad` 计算力和轨迹梯度，`jit` 编译整段模拟，`vmap/pmap` 批量化或多设备并行
- **空间抽象**：用 `(displacement_fn, shift_fn)` 表达自由边界、周期边界和一般周期盒，统一距离计算和位置推进
- **势能抽象**：pair potential、many-body potential、Behler-Parrinello 网络、Graph Network 势能都可作为可微分能量函数
- **力来自能量梯度**：无需手写力场导数，核心关系是 \(\mathbf{F}_i=-\nabla_{\mathbf{R}_i}U(\mathbf{R})\)
- **邻居表和 cell list**：为有限截断势能提供空间分区，使大规模粒子模拟从全对全 \(O(N^2)\) 降到近似 \(O(Nn_{\text{nbr}})\)
- **支持多类动力学**：NVE、NVT Nose-Hoover、NPT、Langevin、Brownian、FIRE 和梯度下降等
- **研究用例明确**：论文展示神经网络势能模拟、粒子 packing 的 meta-optimization、以及基于局部邻域的 flocking 模拟

#### 🔬 深入细节

##### 核心架构示意

![JAX-MD 神经网络势能模拟示意](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/silicon_system_large.png)
*图：论文 Figure 2。JAX-MD 将图神经网络能量函数接入 NVT 模拟，展示由神经势能驱动的大规模硅原子系统快照。*

![JAX-MD flocking 示例](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/flocking.png)
*图：论文 Figure 4。JAX-MD 的空间、邻居表和可微分能量抽象也可扩展到多智能体 flocking。*

##### 算法伪代码

```python
# JAX-MD 的典型工作流：定义空间 -> 定义能量 -> 自动求力 -> 构建积分器 -> 对轨迹求梯度
from jax import grad, jit, vmap
from jax_md import space, energy, simulate, quantity

def build_simulation(box_size, dt, temperature, theta):
    displacement_fn, shift_fn = space.periodic(box_size)

    # energy_fn 可以是经典势能，也可以是神经网络势能 U_theta(R)
    pair_energy = energy.lennard_jones_pair(displacement_fn)
    neural_correction = make_graph_network_energy(theta, displacement_fn)

    def total_energy(R, neighbor=None):
        return pair_energy(R, neighbor=neighbor) + neural_correction(R, neighbor)

    force_fn = quantity.force(total_energy)  # force = -grad_R total_energy
    init_fn, update_fn = simulate.nvt_nose_hoover(total_energy, shift_fn, dt, temperature)
    return init_fn, update_fn, force_fn

@jit
def rollout_loss(theta, key, R0, target_property):
    init_fn, update_fn, _ = build_simulation(box_size=25.0, dt=1e-3, temperature=1.0, theta=theta)
    state = init_fn(key, R0)
    for _ in range(num_steps):
        state = update_fn(state)
    pred = observable(state.position)
    return ((pred - target_property) ** 2).mean()

grad_theta = grad(rollout_loss)(theta, key, R0, target_property)
batched_loss = vmap(rollout_loss, in_axes=(None, 0, 0, 0))
```

##### 空间与状态：把边界条件变成函数

分子动力学的基础状态通常是粒子位置 \(\mathbf{R}\in\mathbb{R}^{N\times d}\)、速度 \(\mathbf{V}\)、动量 \(\mathbf{P}\) 和盒子参数。JAX-MD 不把“空间”写死在模拟器内部，而是用两个函数描述：

$$
\mathbf{d}_{ij}=d(\mathbf{R}_i,\mathbf{R}_j),\qquad
\mathbf{R}_{i}^{\prime}=\mu(\mathbf{R}_i,\Delta\mathbf{R}_i)
$$

\(d\) 是 displacement function，负责处理自由边界、周期边界或一般周期盒下的最短位移；\(\mu\) 是 shift function，负责按位移更新位置并施加边界规则。这样势能函数只依赖 \(d\)，积分器只依赖 \(\mu\)，同一个 Lennard-Jones 或神经势能可在不同边界条件中复用。

> 💡 关键：JAX-MD 的抽象粒度不是“某个完整 MD 引擎”，而是一组可组合纯函数。空间、能量、邻居表、积分器都能单独被 `jit`、`grad`、`vmap` 处理。

##### 能量、力与自动微分

经典 MD 中，给定势能 \(U(\mathbf{R};\theta)\)，力由负梯度给出：

$$
\mathbf{F}_i(\mathbf{R};\theta)
=
-\frac{\partial U(\mathbf{R};\theta)}{\partial \mathbf{R}_i}
$$

对于 pair potential，JAX-MD 可把二体函数 \(u(r_{ij};\theta)\) 提升到全系统能量：

$$
U(\mathbf{R};\theta)
=
\sum_{1\le i<j\le N}
u_{\theta}\left(\left\|d(\mathbf{R}_i,\mathbf{R}_j)\right\|\right)
$$

若势能来自神经网络，例如图网络势能，可写作：

$$
U_{\theta}(\mathbf{R})
=
\sum_{i=1}^{N} \epsilon_{\theta}
\left(
\mathbf{R}_i,\{\mathbf{R}_j: j\in\mathcal{N}(i)\}
\right)
$$

传统 MD 软件通常要为每种势能手写力和优化后的 kernel；JAX-MD 则让能量函数成为一等公民，力由 `grad` 自动生成。这对机器学习势能尤其重要：网络结构、参数和物理模拟在同一个 JAX 计算图中，轨迹损失可以直接对 \(\theta\) 反传。

##### 动力学更新与轨迹可微分

JAX-MD 的模拟器遵循 JAX optimizer 风格：构造函数返回 `init_fn` 和 `update_fn`。一个确定性积分器可抽象为：

$$
\mathbf{s}_{t+1}
=
\Phi_{\Delta t}(\mathbf{s}_t;\theta)
$$

例如速度 Verlet 的简化形式为：

$$
\mathbf{V}_{t+\frac12}
=
\mathbf{V}_{t}
+\frac{\Delta t}{2m}\mathbf{F}(\mathbf{R}_{t};\theta)
$$

$$
\mathbf{R}_{t+1}
=
\mu\left(\mathbf{R}_t,\Delta t\,\mathbf{V}_{t+\frac12}\right)
$$

$$
\mathbf{V}_{t+1}
=
\mathbf{V}_{t+\frac12}
+\frac{\Delta t}{2m}\mathbf{F}(\mathbf{R}_{t+1};\theta)
$$

如果最终任务是让某个观测量 \(o(\mathbf{s}_T)\) 匹配目标 \(y\)，训练损失可写成：

$$
\mathcal{L}(\theta)
=
\left\|o(\mathbf{s}_T)-y\right\|_2^2,\qquad
\mathbf{s}_T=\Phi_{\Delta t}^{T}(\mathbf{s}_0;\theta)
$$

JAX 的反向模式自动微分会穿过所有更新步，得到 \(\partial\mathcal{L}/\partial\theta\)。这就是论文所说的 meta-optimization：优化的对象不只是单步能量，也可以是经过完整物理轨迹后产生的宏观性质、packing 几何或 agent 行为。

##### 邻居表：可微分模拟中的规模瓶颈

有限截断势能只需要计算距离小于 \(r_c\) 的粒子对：

$$
U(\mathbf{R})
=
\sum_i\sum_{j\in\mathcal{N}(i)}
u(r_{ij}),\qquad
\mathcal{N}(i)=\{j:\|d(\mathbf{R}_i,\mathbf{R}_j)\|<r_c\}
$$

朴素全对全计算需要 \(O(N^2)\) 距离。JAX-MD 提供 cell list 和 neighbor list，把空间划分成网格 cell，只检查附近 cell 中的候选粒子，使每步复杂度近似为 \(O(Nn_{\text{nbr}})\)。在 JAX/XLA 中这有一个工程限制：数组 shape 通常需要静态可知，因此 neighbor list 有容量上限；如果缓冲区溢出，需要重新 allocate，而普通 step 中只 update 位置对应的邻居信息。

##### 与 DiffTaichi 和传统 MD 软件的区别

| 方面 | LAMMPS/HOOMD-Blue 等传统 MD | DiffTaichi | JAX-MD |
|------|-----------------------------|------------|--------|
| 主要目标 | 高性能生产模拟 | 高性能可微分物理 DSL | JAX 生态中的可微分 MD 研究框架 |
| 编程风格 | C++/CUDA 插件与脚本接口 | 命令式 Taichi kernel | Python 函数式、数组变换 |
| 力场导数 | 多数需专门实现 | kernel 源变换 | `grad(energy_fn)` 自动生成 |
| ML 集成 | 通常需桥接代码 | 可接控制器，但在 Taichi 体系内 | 与 JAX/Flax/Haiku/Optax 等自然组合 |
| 性能取向 | 生产级优化 | 保留 megakernel 性能 | 研究迭代快，小 GPU 系统有竞争力 |
| 适用场景 | 长时间、大规模标准 MD | 复杂物理程序可微分化 | 神经势能、meta-optimization、批量实验 |

JAX-MD 的局限也来自它的优势：XLA 偏好静态 shape，而 MD 常有动态邻居、复杂数据结构和长轨迹内存压力；在超大生产规模上，它通常不如手写 CUDA/C++ 的成熟 MD 引擎。但对于“要把模拟嵌进学习系统”的研究问题，JAX-MD 的优势是同一份 Python/JAX 代码即可获得硬件加速、自动微分、批量化和神经网络集成。

#### 🧪 练习题

```yaml
question: "JAX-MD 中力的主要计算方式是什么？"
options:
  - "为每个势能手写 CUDA 力 kernel"
  - "用自动微分对势能函数求负梯度，即 F_i = -∂U/∂R_i"
  - "用强化学习直接预测所有粒子的下一步位置"
  - "只从邻居表中读取预先存储的力，不重新计算"
answer: 1
explain: "JAX-MD 的核心设计是把能量写成 JAX 可微分函数，再通过 grad 得到力；邻居表用于减少相互作用计算量。"
```
