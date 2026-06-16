### NeuralPDE-jl — NeuralPDE.jl

```yaml
id: neuralpde_jl
name: NeuralPDE-jl
full_name: NeuralPDE.jl
year: '2022'
org: MIT/NASA
paper_url: https://github.com/SciML/NeuralPDE.jl
category: acceleration
parent: deepxde
motivation: Julia高性能符号微分框架
```

#### 📝 一句话总结

NeuralPDE.jl 将 PINN 从“手写残差函数”推进到 Julia/SciML 的符号-数值工作流：用户用 `ModelingToolkit.jl` 描述 PDE 系统，框架自动生成物理损失、训练点/积分策略和 `OptimizationProblem`，从而把 PINN 与 SciML 的求解器、自动微分、GPU 和参数估计生态连接起来。

#### 🎯 核心要点

- **符号 PDE 输入**：通过 `PDESystem(eq, bcs, domains, params, vars)` 表达 PDE、边界条件、定义域和未知量
- **自动损失生成**：`PhysicsInformedNN` 把符号系统离散化为 PINN 的 PDE loss、BC loss、full loss 和可优化问题
- **积分视角训练**：`QuadratureTraining` 将残差损失视为定义域上的积分，并用 `Integrals.jl` 按 `reltol/abstol` 做自适应数值积分
- **多采样策略**：支持 `GridTraining`、`StochasticTraining`、`QuasiRandomTraining`、`QuadratureTraining`、`WeightedIntervalTraining`
- **自适应损失权重**：支持非自适应、梯度尺度自适应、MiniMax 自适应等方式平衡 PDE 与边界损失
- **反问题与数据融合**：`param_estim` 和 `additional_loss` 允许同时学习微分方程参数、拟合观测数据或做算子发现
- **SciML 生态集成**：兼容 Lux/Flux 神经网络、Optimization.jl、ModelingToolkit、NeuralOperators.jl，并支持 ODE/SDE/RODE/PDE、积分微分方程与 GPU 层

#### 🔬 深入细节

##### 核心架构示意

![NeuralPDE 通用 PDE 形式](https://user-images.githubusercontent.com/12683885/86625781-5648c800-bfce-11ea-9d99-fbcb5c37fe0c.png)
*图：NeuralPDE 官方文档中的通用非线性 PDE 形式。用户在符号层描述 \(u\)、导数、定义域和边界条件，框架再生成 PINN 优化问题。*

![NeuralPDE 2D Poisson 示例结果](https://user-images.githubusercontent.com/12683885/90962648-2db35980-e4ba-11ea-8e58-f4f07c77bcb9.png)
*图：NeuralPDE.jl README 的 2D Poisson 示例，展示解析解、PINN 预测和误差图。*

来源说明：任务给出的 `paper_url` 是 GitHub 项目页。可追溯论文为 [NeuralPDE: Automating Physics-Informed Neural Networks (PINNs) with Error Approximations](https://arxiv.org/abs/2107.09443)；本文图示采用官方文档/README 中可访问图片，因为该论文的 arXiv HTML 图页不可稳定访问。

##### 算法伪代码

```julia
# NeuralPDE.jl 符号 PINN 工作流伪代码
using NeuralPDE, Lux, ModelingToolkit, Optimization, OptimizationOptimisers
import DomainSets: Interval

@parameters x y
@variables u(..)
Dxx = Differential(x)^2
Dyy = Differential(y)^2

# 1. 用符号表达式定义 PDE 与边界条件
eq = Dxx(u(x, y)) + Dyy(u(x, y)) ~ -sin(pi * x) * sin(pi * y)
bcs = [
    u(0, y) ~ 0.0,
    u(1, y) ~ 0.0,
    u(x, 0) ~ 0.0,
    u(x, 1) ~ 0.0,
]
domains = [x ∈ Interval(0.0, 1.0), y ∈ Interval(0.0, 1.0)]

# 2. 定义神经网络近似解 phi_theta(x, y)
chain = Lux.Chain(Dense(2, 16, tanh), Dense(16, 16, tanh), Dense(16, 1))

# 3. 选择训练策略；QuadratureTraining 将 loss 视为积分
strategy = QuadratureTraining(reltol = 1e-6, abstol = 1e-3, batch = 100)
discretization = PhysicsInformedNN(chain, strategy)

# 4. 符号 PDE 系统 -> PINN 表示 -> OptimizationProblem
@named pde_system = PDESystem(eq, bcs, domains, [x, y], [u(x, y)])
prob = discretize(pde_system, discretization)

# 可选：检查自动生成的 PDE/BC loss
pinn_rep = symbolic_discretize(pde_system, discretization)
loss_fns = pinn_rep.loss_functions

# 5. 使用 Optimization.jl 训练
res = Optimization.solve(prob, ADAM(0.01), maxiters = 6000)
phi = discretization.phi
u_pred = phi([0.5, 0.5], res.minimizer)
```

##### 方法机制

NeuralPDE.jl 的核心思想是把 PINN 看成一种 **PDE 系统的离散化器**。在 DeepXDE 这类 Python 框架中，用户通常直接写一个 residual 函数；NeuralPDE.jl 则先让用户在 `ModelingToolkit.jl` 的符号层定义方程、边界条件和定义域，再通过 `PhysicsInformedNN` 把这个符号对象转成优化问题。官方文档明确说明：`discretize(pde_system, discretization)` 会把 `PDESystem` 转换为 `Optimization.jl` 的 `OptimizationProblem`。

给定一般 PDE：

$$
\mathcal{F}\left(x; u, \frac{\partial u}{\partial x_1},\ldots,
\frac{\partial^2 u}{\partial x_1\partial x_d},\ldots;\lambda\right)=0,
\quad x\in\Omega,
$$

以及边界条件 \(\mathcal{B}_j(u,x)=0,\ x\in\Gamma_j\)，NeuralPDE.jl 用神经网络试探函数 \(\phi_\theta(x)\) 代替 \(u(x)\)，生成如下形式的目标：

$$
\mathcal{L}(\theta)=
\sum_i w_i^{pde}\int_{\Omega_i}
\left\|\mathcal{F}_i(x;\phi_\theta,\partial\phi_\theta,\partial^2\phi_\theta,\ldots)\right\|^2 dx
+
\sum_j w_j^{bc}\int_{\Gamma_j}
\left\|\mathcal{B}_j(\phi_\theta,x)\right\|^2 dS
+ w_{add}\mathcal{L}_{add}.
$$

这里的 \(\mathcal{L}_{add}\) 对应 `additional_loss(phi, θ, p_)`，可用来混合真实观测数据、参数正则项或领域特定约束。若 `param_estim = true`，微分方程参数会被拼接进优化变量，和网络权重一起由优化器估计。

> 💡 关键：NeuralPDE.jl 的“自动化”不是自动发现 PDE，而是自动把用户给出的符号 PDE 编译成可训练损失、导数计算函数、采样/积分过程和优化问题。

论文标题中的 “Error Approximations” 主要体现在积分化损失和训练策略上。`QuadratureTraining` 不把残差点仅仅看成 minibatch 样本，而是把损失写成积分：

$$
\int_\Omega g_\theta(x)\,dx,
\quad
g_\theta(x)=\left\|\mathcal{F}(x;\phi_\theta,\partial\phi_\theta,\ldots)\right\|^2.
$$

数值上再用求积近似：

$$
\int_\Omega g_\theta(x)\,dx \approx \sum_{k=1}^{N_q}\omega_k g_\theta(x_k).
$$

当选择自适应求积算法时，`reltol` 和 `abstol` 给出积分误差控制目标；这比固定随机配点更贴近传统数值分析，也解释了 NeuralPDE.jl 为什么强调 quadrature training。对于高维或 GPU 训练，文档建议常用 `QuasiRandomTraining`，因为低差异序列在高维空间通常比纯随机采样更稳定且可 GPU 化。

`symbolic_discretize` 是 NeuralPDE.jl 区别于脚本式 PINN 的另一个关键接口。它返回 `PINNRepresentation`，其中包含 `eqs`、`bcs`、`domains`、`depvars`、`indvars`、`phi`、`derivative`、`strategy`、`symbolic_pde_loss_functions`、`symbolic_bc_loss_functions` 和 `loss_functions` 等字段。研究者可以在不改动高层模型的情况下检查自动生成的 loss，定位某个边界项或 PDE 项是否主导训练。

训练稳定性方面，NeuralPDE.jl 将损失权重变成显式策略。`GradientScaleAdaptiveLoss` 根据 PDE loss 与 BC loss 的梯度尺度比例动态调权，目标是避免某一类约束梯度过大而压制其他约束；`MiniMaxAdaptiveLoss` 则用内部优化器增大尚未满足的 loss 权重。这些方法并不改变 PINN 的物理建模假设，但改变多目标优化的数值行为。

##### 与 DeepXDE 的关系

NeuralPDE.jl 可以看作 DeepXDE 思路在 SciML 生态中的符号化、高性能版本。DeepXDE 的优势是 Python 简洁 API 与多后端普及度；NeuralPDE.jl 的优势是 Julia 多重派发、符号建模和 DifferentialEquations/Optimization/Sensitivity 等库的组合能力。对于需要把 PINN 放进更大的科学计算管线、做参数估计或和传统求解器互操作的任务，NeuralPDE.jl 的 `PDESystem -> OptimizationProblem` 路径更自然。

#### 🧪 练习题

```yaml
question: "NeuralPDE.jl 中 PhysicsInformedNN 的核心职责是什么？"
options:
  - "自动从数据中发现未知 PDE 的符号形式"
  - "把 ModelingToolkit 的 PDESystem 转换成 PINN 损失与 OptimizationProblem"
  - "只负责绘制 PDE 解的等高线图"
  - "用有限元网格替代神经网络试探函数"
answer: 1
explain: "PhysicsInformedNN 是 NeuralPDE.jl 的 PINN 离散化器，它根据符号 PDE、边界条件和训练策略生成可优化的物理损失。"
```
