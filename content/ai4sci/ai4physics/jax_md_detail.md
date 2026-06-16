### JAX MD — JAX分子动力学 (JAX Molecular Dynamics)

```yaml
id: jax_md
name: JAX MD
full_name: JAX分子动力学 (JAX Molecular Dynamics)
year: "2020"
org: Google
paper_url: https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html
category: fluid_simulation
parent: —
motivation: 端到端可微分分子动力学引擎
```

#### 📝 一句话总结

JAX MD 提出了一套基于 JAX 的端到端可微分分子动力学框架，把空间边界、势能、邻居列表、积分器和神经网络势统一写成可组合函数，解决了传统 MD 软件难以与自动微分和机器学习模型无缝集成的问题。

#### 🎯 核心要点

- **函数式仿真接口**：用 `displacement_fn`、`shift_fn`、`energy_fn`、`init_fn`、`update_fn` 等纯函数描述空间、势能和动力学状态更新
- **力由能量自动微分得到**：任意可微势能 \(E_\theta(R)\) 都可通过 `jax.grad` 得到 \(F_i=-\nabla_{R_i}E_\theta\)，减少手写力场导数
- **JAX 变换原生可组合**：同一段仿真代码可以套用 `jit`、`grad`、`vmap`、`pmap`，支持硬件加速、批量仿真和轨迹级元优化
- **空间与邻域原语**：提供自由/周期边界、pair/neighbor/bond 映射、cell list 和 neighbor list，使局域相互作用从全对全计算扩展到大规模粒子系统
- **内置物理与神经势能**：包含 Lennard-Jones、Morse、Stillinger-Weber、EAM 等经典势，也支持 Behler-Parrinello 与图神经网络能量模型
- **三个代表性用例**：DFT 数据训练神经网络势、对粒子 packing 最终能量做梯度元优化、用能量模型实现 flocking 行为

#### 🔬 深入细节

##### 图示与可访问来源

JAX MD 的 NeurIPS 论文没有给出单一“模型架构图”，而是用多个实验示例展示框架能力；下面的图来自 ar5iv 对论文图 3 的公开转换，展示了通过可微能量最小化寻找二元粒子 packing 的最大挫折态。

![JAX MD 可微 packing 元优化示例](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/x4.png)
*图：JAX MD 对粒径参数 \(D\) 做可微优化，左侧为不同粒径比下的粒子构型，右侧为最终能量和对 \(D\) 的梯度。来源：论文 ar5iv 页面 https://ar5iv.labs.arxiv.org/html/1912.04232。*

可访问来源包括 NeurIPS 论文页 `https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html`、arXiv 版本 `https://arxiv.org/abs/1912.04232` 和官方仓库 `https://github.com/jax-md/jax-md`。

##### 算法伪代码

```python
# JAX MD 风格的可微分子动力学与元优化伪代码
from jax import grad, jit, vmap
import jax.numpy as jnp
from jax_md import space, energy, simulate, quantity

# 1. 定义空间：周期边界由位移函数和位移更新函数共同描述
box_size = 25.0
displacement_fn, shift_fn = space.periodic(box_size)

# 2. 定义势能：可以是经典势，也可以是带参数的神经网络势
energy_fn = energy.lennard_jones_pair(displacement_fn)
force_fn = quantity.force(energy_fn)  # 等价于 -grad_R energy_fn(R)

# 3. 构造积分器：返回初始化函数和单步更新函数
dt = 1e-3
init_fn, update_fn = simulate.nve(energy_fn, shift_fn, dt=dt)

@jit
def rollout(key, R0, n_steps):
    state = init_fn(key, R0)
    trajectory = []
    for _ in range(n_steps):
        state = update_fn(state)
        trajectory.append(state.position)
    return jnp.stack(trajectory)

# 4. 轨迹级可微优化：对初始条件、势能参数或几何超参数求梯度
def objective(theta, key):
    R0 = initialize_particles(theta, key)
    traj = rollout(key, R0, n_steps=1000)
    return final_observable(traj)  # packing energy、结构因子、目标轨迹误差等

theta = theta - lr * grad(objective)(theta, key)

# 5. 批量化：同一仿真可在不同初始条件上并行执行
batched_objective = vmap(objective, in_axes=(None, 0))
```

##### 核心机制：把分子动力学拆成可微函数

传统 MD 软件往往把边界条件、邻居搜索、势能、力计算和积分器封装在大型状态机或 C++/CUDA 内核里。这样做性能很高，但当研究者想把神经网络势、结构优化目标或控制器接入仿真时，常需要手写桥接代码和导数。JAX MD 的关键设计是把整个仿真写成 JAX 可追踪的函数图：数据保存在数组或轻量 dataclass 中，函数把旧状态映射到新状态。

最基本的 MD 计算可以写成 pair potential 的总能量：

$$E(R)=\sum_{i<j}u\left(\left\|d(R_i,R_j)\right\|\right)$$

其中 \(R_i\) 是第 \(i\) 个粒子位置，\(d(\cdot,\cdot)\) 是由空间对象定义的位移函数；在周期边界下，\(d\) 会返回最近周期镜像的位移。力不再手工推导，而是通过自动微分得到：

$$F_i(R)=-\frac{\partial E(R)}{\partial R_i}$$

> 💡 关键：JAX MD 把“能量是一个可微函数”作为统一接口。只要 `energy_fn(R)` 可被 JAX 追踪，经典势、可学习神经势、甚至带外部控制参数的能量模型都能接入同一套积分器。

##### 空间、映射与邻居列表

JAX MD 的空间模块返回一对函数：`displacement_fn(Ra, Rb)` 计算位移，`shift_fn(R, dR)` 将粒子沿位移移动。这个拆分使自由边界、周期边界和一般周期平行六面体边界都能用同一套动力学函数处理。对于多粒子系统，`space.map_pair`、`space.map_neighbors`、`space.map_bond` 会把单对粒子的位移函数提升为全对、邻居或键连接上的批量计算。

局域相互作用若直接计算所有粒子对，复杂度为 \(O(N^2)\)。JAX MD 使用 cell list 和 neighbor list 将候选邻居限制在截断半径 \(r_c\) 附近：

$$E_{\text{nbr}}(R)=\sum_{(i,j)\in \mathcal{N}(R;r_c)}u\left(\left\|d(R_i,R_j)\right\|\right)$$

这一步对可微仿真尤其重要：它既保留了局域物理结构，也让 `jit` 编译后的 GPU/TPU 批量计算保持可扩展。

##### 动力学更新与训练目标

在 NVE 动力学中，JAX MD 可使用速度 Verlet 一类积分器。抽象地说，给定位置 \(R_t\)、速度 \(V_t\)、质量 \(m\) 和力 \(F(R_t)\)，一次时间步近似为：

$$V_{t+\frac{1}{2}}=V_t+\frac{\Delta t}{2m}F(R_t)$$

$$R_{t+1}=\mu(R_t,\Delta t V_{t+\frac{1}{2}})$$

$$V_{t+1}=V_{t+\frac{1}{2}}+\frac{\Delta t}{2m}F(R_{t+1})$$

其中 \(\mu\) 就是 `shift_fn`，负责把边界条件纳入位置更新。因为每一步都是 JAX 函数，完整轨迹

$$\tau_\theta = S_\theta^T(R_0,V_0)$$

也可以作为可微函数参与优化。例如训练神经网络势时，论文使用量子力学 DFT 数据监督能量和力，可写成：

$$\mathcal{L}(\theta)=\frac{1}{B}\sum_b\left\|E_\theta(R_b)-E_b^{\text{DFT}}\right\|_2^2+\lambda\frac{1}{BN}\sum_{b,i}\left\|-\nabla_{R_i}E_\theta(R_b)-F_{b,i}^{\text{DFT}}\right\|_2^2$$

这体现了 JAX MD 的优势：神经网络只需输出能量，力监督由能量梯度自动得到，不需要为每种神经架构手写力场。

##### 与传统 MD 软件的差异

传统 LAMMPS、HOOMD-Blue、OpenMM 等系统偏向生产级模拟，通常围绕高性能内核和固定插件接口设计。JAX MD 牺牲一部分专用内核极限性能，换取研究迭代速度和可微组合性：`grad` 可穿过势能、积分器和目标函数；`vmap` 可并行多个初始条件；`jit` 可把 Python 描述编译成 XLA 程序；神经势可与传统势共享动力学代码。

这种设计特别适合 AI4Sci 场景：研究者可以把物理仿真放进学习循环，而不是把仿真当作不可微黑盒。典型用法包括反向设计材料结构、优化粒子 packing、学习粗粒化势能、训练控制策略或在大量初始条件上估计统计物理量。

##### 局限与适用边界

JAX MD 不是传统 MD 软件的直接替代品。由于 JAX/XLA 对静态形状和动态数据结构有约束，复杂拓扑变化、极大规模 CPU 模拟和高度特化的生产力场仍可能更适合专用软件。它的优势集中在“仿真本身需要参与求导”的研究工作流：当目标是对参数、初始条件、势能模型或仿真设计变量求梯度时，JAX MD 的函数式结构会显著降低实现成本。

#### 🧪 练习题

```yaml
question: "JAX MD 能把神经网络势无缝接入分子动力学的核心原因是什么？"
options:
  - "它把所有粒子相互作用都改成了无监督聚类问题"
  - "它用可微 energy_fn 作为统一接口，并通过自动微分从能量得到力"
  - "它只支持 Lennard-Jones 势，因此力的解析形式固定"
  - "它避免使用任何数值积分器，直接预测最终轨迹"
answer: 1
explain: "JAX MD 的核心接口是可微势能函数 E(R)。只要能量可被 JAX 追踪，就可以用 grad 得到力，并复用同一套空间、邻居列表和动力学更新函数。"
```
