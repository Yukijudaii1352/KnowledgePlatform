### PhiFlow — 流体物理库 (PhiFlow)

```yaml
id: phiflow
name: PhiFlow
full_name: 流体物理库 (PhiFlow)
year: "2020"
org: 慕尼黑工大
paper_url: https://github.com/tum-pbs/PhiFlow
category: fluid_simulation
parent: —
motivation: 开源可微分流体仿真库
```

#### 📝 一句话总结

PhiFlow 提供了一个面向机器学习的开源可微 PDE/流体仿真工具箱，把网格、粒子、边界条件、微分算子、线性求解器和 PyTorch/JAX/TensorFlow 后端统一起来，解决了流体仿真代码难以跨后端求导、批量化和复用的问题。

#### 🎯 核心要点

- **多后端可微仿真**：同一套 Python API 可运行在 NumPy、PyTorch、JAX 或 TensorFlow 上，并继承后端的自动微分、JIT 和 GPU/TPU 能力
- **面向 PDE 的高层数据结构**：提供 `CenteredGrid`、`StaggeredGrid`、mesh、point cloud、geometry 等抽象，显式追踪空间维度、批量维度和通道维度
- **内置流体构件**：包含 advection、diffusion、pressure projection、incompressibility、boundary condition 等模块，可快速组装 Navier-Stokes 求解器
- **可微线性求解与矩阵生成**：支持对 sparse matrix、right-hand side 及其依赖参数求导，并可通过函数 tracing 自动生成线性系统
- **优化和学习集成**：可把仿真嵌入神经网络训练、PDE 控制、参数反演、初始条件优化和可微压力/流场设计任务
- **来源限制明确**：任务给出的 `paper_url` 是官方 GitHub 项目页；该库早期用于 2020 年 TUM 可微物理论文/教程，正式 PhiFlow 论文发表于 ICML 2024 PMLR

#### 🔬 深入细节

##### 图示与可访问来源

![PhiFlow 烟雾羽流示例](https://github.com/tum-pbs/PhiFlow/raw/master/docs/figures/examples/grids/Smoke_Plume.png)
*图：PhiFlow 官方 README 中的网格流体示例 Smoke Plume，展示其面向流体仿真的核心应用。来源：官方仓库 https://github.com/tum-pbs/PhiFlow。*

![PhiFlow 可微压力示例](https://github.com/tum-pbs/PhiFlow/raw/master/docs/figures/examples/optim/Differentiable_Pressure.jpg)
*图：PhiFlow 官方 README 中的 Differentiable Pressure 示例，展示压力投影和可微优化在障碍物绕流中的用途。*

任务提供的链接是项目页而非论文页。本文方法解读主要基于官方仓库 `https://github.com/tum-pbs/PhiFlow`、官方文档 `https://tum-pbs.github.io/PhiFlow/`，并参考后续正式论文 “\(\Phi_{\text{Flow}}\): Differentiable Simulations for PyTorch, TensorFlow and Jax” 的 PMLR 页面 `https://proceedings.mlr.press/v235/holl24a.html`。

##### 算法伪代码

```python
# PhiFlow 风格：可微不可压流体一步更新与目标优化伪代码
from phi.torch.flow import *

@jit_compile
def fluid_step(v, smoke, dt=0.25, viscosity=0.01):
    # 1. 半拉格朗日平流：速度搬运速度场，速度搬运烟雾密度
    smoke = advect.semi_lagrangian(smoke, v, dt)
    v = advect.semi_lagrangian(v, v, dt)

    # 2. 粘性扩散：可用显式或隐式扩散
    v = diffuse.explicit(v, viscosity, dt)

    # 3. 压力投影：求解 Poisson 方程并投影到散度为零的速度场
    v, pressure = fluid.make_incompressible(
        v,
        solve=Solve("CG", rel_tol=1e-5, max_iterations=200)
    )
    return v, smoke, pressure

def rollout(v0, smoke0, steps):
    v, smoke = v0, smoke0
    pressures = []
    for _ in range(steps):
        v, smoke, p = fluid_step(v, smoke)
        pressures.append(p)
    return v, smoke, pressures

# 4. 把仿真放入学习/优化循环：例如优化初始速度，让最终烟雾匹配目标图案
initial_velocity = StaggeredGrid(Noise(), x=128, y=128, bounds=Box(x=100, y=100), boundary=0)
initial_smoke = CenteredGrid(Sphere(x=50, y=10, radius=5), x=128, y=128, bounds=Box(x=100, y=100))

def loss_fn(v0):
    _, final_smoke, _ = rollout(v0, initial_smoke, steps=64)
    return field.l2_loss(final_smoke - target_smoke)

grad_v0 = math.gradient(loss_fn)(initial_velocity)
initial_velocity = optimizer_step(initial_velocity, grad_v0)
```

##### 动机与背景

机器学习中的可微物理任务通常不只需要一个“能跑”的流体求解器，还需要它能和神经网络、优化器、批量数据、GPU、JIT 编译和自动微分一起工作。直接在 PyTorch/JAX/TensorFlow 中手写 PDE 求解器会遇到大量重复问题：网格维度管理、边界条件、staggered velocity、压力 Poisson 方程、稀疏线性求解、可视化和后端切换。

PhiFlow 的目标是把这些模拟相关的基础设施封装成高层 API。用户不是从张量切片和 padding 开始写 Navier-Stokes，而是用带物理语义的 `Grid`、`Field`、`Geometry` 和 `Solve` 组合仿真步骤。这样仿真函数既可读，又能被后端 AD 系统追踪。

##### 不可压流体的核心计算

PhiFlow 的典型流体求解围绕不可压 Navier-Stokes 方程：

$$\frac{\partial \mathbf{u}}{\partial t}+(\mathbf{u}\cdot\nabla)\mathbf{u}=-\nabla p+\nu\nabla^2\mathbf{u}+\mathbf{f}$$

$$\nabla\cdot\mathbf{u}=0$$

在投影法中，一个时间步通常拆成平流、扩散、外力和压力投影：

$$\tilde{\mathbf{u}}=\text{Advect}(\mathbf{u}_t,\mathbf{u}_t,\Delta t)+\Delta t\,\nu\nabla^2\mathbf{u}_t+\Delta t\,\mathbf{f}_t$$

压力通过 Poisson 方程求解：

$$\nabla^2 p=\frac{1}{\Delta t}\nabla\cdot\tilde{\mathbf{u}}$$

然后速度被投影到无散度空间：

$$\mathbf{u}_{t+1}=\tilde{\mathbf{u}}-\Delta t\nabla p$$

PhiFlow 的 `fluid.make_incompressible()` 封装了这个投影逻辑；`advect`、`diffuse`、`field` 和 `math.solve_linear` 等模块则提供可组合的数值构件。

##### 数据结构：维度命名与物理场抽象

PhiFlow 的一个关键机制是显式命名和标注维度。传统张量代码中，`tensor.shape == (B, C, H, W)` 的含义依赖约定；PhiFlow 将 batch、spatial、channel 等维度放入类型化张量语义中。这样同一段代码可以从 2D 改成 3D，或从单个样本改成多 batch，而无需手工重写所有 axis。

流体速度常用 staggered grid 表示，即速度分量存储在网格单元面上，而标量烟雾密度、温度或压力通常存储在 centered grid 上。PhiFlow 将这些差异封装到 `StaggeredGrid` 和 `CenteredGrid` 中，避免用户在每个算子里手动维护插值与对齐。

> 💡 关键：PhiFlow 的抽象不是为了隐藏数值方法，而是为了让数值方法以“场”和“算子”的形式表达。平流、梯度、散度、拉普拉斯和边界条件都保留物理含义，同时仍映射到底层可微张量运算。

##### 可微优化与损失函数

当仿真函数 \(S_\theta\) 可微时，可以把控制变量 \(\theta\) 设为初始速度、边界形状、粘性系数、源项、神经网络参数或障碍物位置，并定义目标：

$$\mathcal{L}(\theta)=\sum_{t\in\mathcal{T}}\left\|O(S_\theta^t(x_0))-y_t\right\|_2^2+\lambda R(\theta)$$

其中 \(O\) 可以是从场中采样的观测算子，\(y_t\) 是目标烟雾图案、速度测量或压力分布，\(R(\theta)\) 是平滑性或能量正则项。梯度由后端自动微分穿过平流、扩散和线性求解器：

$$\nabla_\theta\mathcal{L}=\frac{\partial \mathcal{L}}{\partial S}\frac{\partial S_\theta}{\partial \theta}$$

这正是 PhiFlow 与普通 CFD 库的关键区别：它把 PDE 求解器作为可学习程序的一部分，而不是训练循环外部的黑盒。

##### 线性求解器与边界条件

压力投影、隐式扩散、热传导和许多 PDE 约束最终都落到线性系统：

$$A(\theta)x=b(\theta)$$

PhiFlow 的后续正式论文强调，它支持对右端项、稀疏矩阵及其依赖参数求导，并可通过函数 tracing 自动生成矩阵。这对可微物理很关键，因为在反演材料系数、优化边界或学习 PDE 参数时，矩阵本身也可能依赖待优化变量。

边界条件方面，PhiFlow 提供 Dirichlet、Neumann、periodic、symmetric 等表示，并让内置物理函数根据边界自动调整数值 scheme。对流体来说，这能显著减少手写 ghost cell、padding 和法向速度约束的错误。

##### 与 JAX MD、DiffTaichi 的位置差异

JAX MD 偏向粒子/分子动力学研究，核心接口是势能与粒子动力学；DiffTaichi 偏向高性能命令式仿真语言，强调编译器自动生成梯度 kernel；PhiFlow 则更像 PDE/流体仿真的高层 Python 工具箱，强调跨后端、可读性、物理场抽象和与神经网络训练的快速集成。

因此 PhiFlow 特别适合需要频繁试验 PDE 结构的研究：例如学习控制 PDE、把压力投影放入网络训练、构造流体数据集、优化初始条件或对不同 ML 后端做同一仿真实验。若目标是极端性能的自定义 kernel，DiffTaichi 可能更合适；若目标是可微分子系统和神经势，JAX MD 更直接。

#### 🧪 练习题

```yaml
question: "PhiFlow 中 pressure projection 的主要作用是什么？"
options:
  - "把速度场投影到散度为零的空间，从而满足不可压约束"
  - "把所有标量场转换成 RGB 图像，方便可视化"
  - "用神经网络直接替代 Navier-Stokes 方程"
  - "删除边界条件以加快自动微分"
answer: 0
explain: "不可压流体要求 ∇·u=0。压力投影通过求解 Poisson 方程得到压力，再从临时速度中减去压力梯度，使更新后的速度近似无散度。"
```
