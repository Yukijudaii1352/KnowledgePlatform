### DiffTaichi — 可微分Taichi (Differentiable Taichi)

```yaml
id: difftaichi
name: DiffTaichi
full_name: 可微分Taichi (Differentiable Taichi)
year: '2020'
org: MIT
paper_url: https://arxiv.org/abs/1910.03035
category: diff_sim
parent: —
motivation: 基于Taichi的自动微分比传统快188倍
```

#### 📝 一句话总结

DiffTaichi 提出面向物理仿真的可微分编程系统，把 Taichi 的高性能 imperative kernel 与自动微分结合起来，解决传统深度学习框架难以高效表达粒子-网格、碰撞、稀疏索引和长时间步仿真的问题。

#### 🎯 核心要点

- **来源修正**：任务给定 `paper_url` 指向的 arXiv 编号实际不是 DiffTaichi；本文精读使用可访问论文 `https://arxiv.org/abs/1910.00935`
- **两尺度自动微分**：kernel 内使用 source-code transformation 生成 adjoint kernel，kernel 间使用轻量 tape 记录调用并反向重放
- **保留 megakernel 性能**：允许把物理仿真的多阶段计算融合进单个 kernel，避免 TensorFlow/PyTorch 式小算子图带来的低算术强度
- **面向命令式并行程序**：支持 parallel-for、分支、显式数组读写和灵活索引，更贴近 CUDA/C++/Fortran 风格仿真代码
- **全局张量作为检查点**：反向传播时依赖每一步写入的全局状态，必要时用 checkpointing 缓解长轨迹显存压力
- **覆盖 10 类模拟器**：包括弹性体 MPM、不可压流体、刚体、布料、海浪、烟雾等，可用于控制、逆设计和参数优化
- **控制器端到端优化**：神经网络控制器和可微分仿真模块组成一个可反传程序，可用梯度下降替代高样本量强化学习
- **性能与生产力并重**：论文报告弹性体模拟器代码比手写 CUDA 短 4.2 倍、速度相近，且比 TensorFlow 实现快 188 倍

#### 🔬 深入细节

##### 核心架构示意

![DiffTaichi 神经控制器与仿真耦合示意](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/net.png)
*图：论文 Figure 1 左侧。神经网络控制器输出动作，DiffTaichi 物理仿真推进状态，最终损失对控制器参数或初始条件反向传播。*

![DiffTaichi 系统与轻量 tape](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/pipeline.png)
*图：论文 Figure 2 左侧。DiffTaichi 复用 Taichi 前端、IR 和后端编译器，在 IR 层加入可微分编程扩展。*

![DiffTaichi tape 反向重放机制](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/tape.png)
*图：论文 Figure 2 右侧。tape 只记录 kernel launch 结构，反向阶段按相反顺序调用自动生成的 gradient kernel。*

##### 算法伪代码

```python
# DiffTaichi 的两尺度 AD：kernel 内做源代码变换，kernel 间用 tape 反向重放
def optimize_controller(theta, initial_state, target):
    tape = []

    # forward simulation
    state = initial_state
    for t in range(T):
        action = neural_controller(theta, state)
        tape.append(("controller", theta, state, action))

        # each kernel is a Taichi megakernel with explicit indexing / branches
        launch_kernel(clear_grid, state.grid)
        tape.append((clear_grid, state.grid))
        launch_kernel(p2g, state.particles, state.grid, action)
        tape.append((p2g, state.particles, state.grid, action))
        launch_kernel(grid_op, state.grid)
        tape.append((grid_op, state.grid))
        launch_kernel(g2p, state.grid, state.particles)
        tape.append((g2p, state.grid, state.particles))

    loss = task_loss(state, target)
    seed_adjoint(loss, 1.0)

    # reverse pass: replay generated adjoint kernels in reverse launch order
    for item in reversed(tape):
        if item[0] == "controller":
            backprop_neural_controller(item)
        else:
            primal_kernel = item[0]
            adjoint_kernel = source_transform(primal_kernel)
            launch_kernel(adjoint_kernel, *item[1:])

    theta -= lr * theta.grad
```

##### 问题设定：为什么普通深度学习框架不够用

可微分物理仿真的目标是把一个时间推进程序看成可求导映射：

$$
\mathbf{s}_{t+1}=F_t(\mathbf{s}_t,\mathbf{a}_t,\phi),\qquad
\mathbf{a}_t=\pi_\theta(\mathbf{s}_t),\qquad
\mathcal{L}=\ell(\mathbf{s}_{T},\mathbf{s}^{\star})
$$

这里 \(\mathbf{s}_t\) 是粒子、网格、速度、密度、形变梯度等物理状态，\(\phi\) 是材料、边界或初始条件参数，\(\pi_\theta\) 可以是神经网络控制器。训练需要计算：

$$
\frac{\partial \mathcal{L}}{\partial \theta}
=
\sum_{t=0}^{T-1}
\frac{\partial \mathcal{L}}{\partial \mathbf{s}_{t+1}}
\frac{\partial F_t}{\partial \mathbf{a}_t}
\frac{\partial \pi_\theta(\mathbf{s}_t)}{\partial \theta}
$$

核心难点不是公式本身，而是 \(F_t\) 往往由大量命令式并行代码组成：粒子到网格散射、网格边界条件、碰撞分支、邻域 stencil、非连续接触和稀疏结构。把这些逻辑拆成深度学习框架里的小张量算子，会产生大量 gather/scatter、临时数组和 Python/graph 调度开销，算术强度低，且代码不接近传统仿真器写法。

##### 两尺度自动微分机制

DiffTaichi 的关键设计是把自动微分分成两个尺度。第一个尺度是 **kernel 内部**：对单个 Taichi kernel 的 IR 做 source-code transformation，生成对应的 adjoint kernel。例如一个标量赋值：

$$
y = f(x_1,x_2)
$$

反向传播维护 adjoint 变量 \(\bar{x}=\partial \mathcal{L}/\partial x\)，按链式法则更新：

$$
\bar{x}_1 \mathrel{+}= \bar{y}\frac{\partial f}{\partial x_1},\qquad
\bar{x}_2 \mathrel{+}= \bar{y}\frac{\partial f}{\partial x_2}
$$

对于并行循环和显式索引，adjoint kernel 仍然是一个高性能并行 kernel；散射累加对应 adjoint 的聚合，必要时使用原子加法或编译器生成的安全累加逻辑。这比 tracing 每一个标量操作更适合 megakernel，因为 forward kernel 的局部性和融合结构在 backward 中得以保留。

第二个尺度是 **kernel 之间**：一个仿真步通常调用多个 kernel，长轨迹会调用几百到几千次。DiffTaichi 不把整个长程序展开成一个巨大静态计算图，而是用轻量 tape 记录 “调用了哪个 kernel、参数是什么”。反向传播时，tape 按相反顺序重放每个 kernel 的 adjoint 版本：

$$
\bar{\mathbf{s}}_t
=
\left(\frac{\partial F_t}{\partial \mathbf{s}_t}\right)^{\top}\bar{\mathbf{s}}_{t+1},\qquad
\bar{\phi}
\mathrel{+}=
\left(\frac{\partial F_t}{\partial \phi}\right)^{\top}\bar{\mathbf{s}}_{t+1}
$$

> 💡 关键：DiffTaichi 不在“全程序 tracing”和“全程序源变换”之间二选一，而是 kernel 内源变换、kernel 间 tape。这样既保留灵活控制流，又避免为整段仿真生成庞大代码。

##### 全局张量、覆盖规则与 checkpoint

传统物理仿真代码经常原地更新数组，但反向传播需要知道某一步使用的旧值。DiffTaichi 要求程序员按可微分程序的规则组织状态：对时间相关变量保留历史，或把全局张量视为反向求值所需的检查点。以显式时间积分为例：

$$
\mathbf{v}_{t+1}=\mathbf{v}_{t}+\Delta t\,\mathbf{a}(\mathbf{x}_t,\mathbf{v}_t),\qquad
\mathbf{x}_{t+1}=\mathbf{x}_{t}+\Delta t\,\mathbf{v}_{t+1}
$$

若只保留最新 \(\mathbf{x},\mathbf{v}\)，反向阶段无法恢复 \(\mathbf{a}(\mathbf{x}_t,\mathbf{v}_t)\) 的输入。DiffTaichi 的实践是在数组维度中加入时间轴，或在内存受限时使用 checkpointing：保存部分时间点，反向到中间区间时重新计算 forward 状态。其本质是在内存 \(O(T)\) 和重算时间之间做权衡。

##### 以 MPM 弹性体为例

论文中的 `diffmpm` 例子使用 moving least squares material point method，连续体满足动量与质量守恒：

$$
\rho\frac{D\mathbf{v}}{Dt}
=
\nabla\cdot\boldsymbol{\sigma}+\rho\mathbf{g},\qquad
\frac{D\rho}{Dt}+\rho\nabla\cdot\mathbf{v}=0
$$

MPM 的一个时间步通常包含 particle-to-grid、grid operation、grid-to-particle 三段。普通张量框架很难自然表达粒子向网格邻域散射、网格节点条件分支、材料模型和碰撞处理；DiffTaichi 允许直接写：

```python
for p in particles:
    base = floor(x[p] * inv_dx - 0.5)
    for offset in neighborhood:
        weight = bspline_weight(x[p], base + offset)
        grid_v[base + offset] += weight * particle_momentum[p]
        grid_m[base + offset] += weight * mass[p]
```

这种代码在语义上接近 CUDA kernel，但编译器可以为它生成反向 kernel。优化任务可以是控制软体机器人向前移动：

$$
\mathcal{L}(\theta)
=
-x_{\text{center}}(T)
+\lambda\sum_{t=0}^{T-1}\|\mathbf{a}_t\|_2^2
$$

梯度 \(\partial\mathcal{L}/\partial\theta\) 会穿过所有 MPM 步和控制器。相比 model-free RL，这种梯度直接告诉控制器“哪个早期动作导致最终位移改变”，样本效率通常更高。

##### 与传统方法的区别

| 方面 | 普通深度学习框架 | 手写 CUDA adjoint | DiffTaichi |
|------|------------------|-------------------|------------|
| 程序表达 | 张量算子图，复杂索引笨重 | 性能高但开发成本高 | 命令式并行 kernel，接近仿真代码 |
| AD 粒度 | 小算子 tracing/graph | 人工推导 | kernel 内源变换 + kernel 间 tape |
| 性能 | 大量临时数组和散碎操作 | 接近硬件上限 | 保留 megakernel 算术强度 |
| 灵活性 | 分支、碰撞、scatter 不自然 | 灵活但不可维护 | 支持分支、显式索引、数据布局优化 |
| 典型应用 | 小规模可微分实验 | 单个专用模拟器 | 多类可微分物理模拟器和控制优化 |

DiffTaichi 的局限也很清楚：它要求用户理解可微分程序的写入规则；碰撞和接触可能有不可导或梯度不稳定点；长时间仿真的梯度仍可能爆炸、消失或受数值误差影响。因此它不是“自动让所有仿真问题好优化”，而是把高性能物理程序放进可反传优化回路，使梯度获取从手写工程问题变成语言和编译器问题。

#### 🧪 练习题

```yaml
question: "DiffTaichi 的两尺度自动微分中，轻量 tape 主要记录什么？"
options:
  - "每个标量算术操作的完整计算图"
  - "kernel launch 顺序与参数，并在反向阶段按相反顺序重放 adjoint kernel"
  - "神经网络每一层的权重初始化"
  - "所有粒子的最终位置快照，且不需要中间状态"
answer: 1
explain: "DiffTaichi 在 kernel 内通过源代码变换生成梯度 kernel；tape 只负责跨 kernel 的调用记录和反向调度，从而兼顾灵活性与性能。"
```
