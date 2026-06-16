### NVIDIA-Warp — NVIDIA Warp

```yaml
id: nvidia_warp
name: NVIDIA-Warp
full_name: NVIDIA Warp
year: '2022'
org: NVIDIA
paper_url: https://github.com/NVIDIA/warp
category: diff_sim
parent: difftaichi
motivation: Python编译为CUDA支持大规模微分模拟
```

#### 📝 一句话总结

NVIDIA Warp 是面向仿真、机器人和几何计算的 Python JIT kernel 框架，把类型标注的 Python 函数编译为 CPU/CUDA 代码并自动生成 adjoint kernel，使大规模 GPU 物理程序能接入 PyTorch、JAX 和 Paddle 等机器学习训练流程。

#### 🎯 核心要点

- **项目页型来源**：任务给定 URL 是官方 GitHub；本文基于官方 README、当前稳定版文档的 Runtime 与 Differentiability 章节解读
- **Python 到 C++/CUDA/PTX**：用户用 `@wp.kernel` 写类型化 Python 函数，首次 launch 时按模块 JIT 编译并缓存
- **CUDA kernel 式并行模型**：`wp.launch(kernel, dim=...)` 以一维到四维线程网格执行，kernel 内用 `wp.tid()` 取得线程索引
- **默认生成 forward/backward kernel**：Warp 为 kernel 定义生成前向和反向 adjoint 版本，支持反向模式自动微分
- **显式 tape 机制**：`wp.Tape()` 记录 kernel launch，`tape.backward(loss)` 或传入输出 adjoint 后反向重放计算梯度
- **显式内存管理**：数组需声明 dtype、device 和 `requires_grad=True`，反向后梯度在 `array.grad` 或 tape gradients 中读取
- **物理计算原语丰富**：内置向量、矩阵、四元数、变换、网格/几何、FEM、稀疏矩阵和多类仿真示例
- **框架互操作**：Warp kernel 可作为机器学习 pipeline 的自定义可微分计算模块，与 PyTorch、JAX、Paddle 数据互通
- **相对 DiffTaichi 的定位**：继承“高性能可微分 kernel + tape”的思想，但使用更贴近普通 Python 的前端和 NVIDIA GPU 生态

#### 🔬 深入细节

##### 核心架构示意

![NVIDIA Warp 示例仿真集合](https://github.com/NVIDIA/warp/raw/main/docs/img/header.jpg)
*图：官方 README 展示的 Warp 物理仿真示例集合，覆盖粒子、流体、几何和优化类任务。*

![Warp 编译流水线](https://nvidia.github.io/warp/stable/_images/compiler_pipeline.svg)
*图：官方文档的 compilation model。Warp 从 Python kernel 定义生成 C++/CUDA 中间代码，运行时编译成动态库和 PTX 并缓存。*

##### 算法伪代码

```python
# Warp 的基本模式：类型化 kernel -> launch -> tape 记录 -> backward
import warp as wp

@wp.kernel
def integrate(
    pos: wp.array[wp.vec3],
    vel: wp.array[wp.vec3],
    mass: wp.array[float],
    force: wp.array[wp.vec3],
    dt: float,
):
    i = wp.tid()
    acc = force[i] / mass[i]
    vel[i] = vel[i] + dt * acc
    pos[i] = pos[i] + dt * vel[i]

@wp.kernel
def compute_loss(pos: wp.array[wp.vec3], target: wp.array[wp.vec3], loss: wp.array[float]):
    i = wp.tid()
    diff = pos[i] - target[i]
    wp.atomic_add(loss, 0, wp.dot(diff, diff))

pos = wp.array(init_pos, dtype=wp.vec3, device="cuda", requires_grad=True)
vel = wp.array(init_vel, dtype=wp.vec3, device="cuda", requires_grad=True)
force = wp.array(ctrl_force, dtype=wp.vec3, device="cuda", requires_grad=True)
loss = wp.zeros(1, dtype=float, device="cuda", requires_grad=True)

with wp.Tape() as tape:
    for _ in range(num_steps):
        wp.launch(integrate, dim=n_particles, inputs=[pos, vel, mass, force, dt], device="cuda")
    wp.launch(compute_loss, dim=n_particles, inputs=[pos, target, loss], device="cuda")

tape.backward(loss)
force_grad = force.grad
```

##### 编程模型：Python 表达，CUDA 语义

Warp kernel 看起来是 Python 函数，但它并不是逐行由 CPython 执行。用户用 `@wp.kernel` 声明 kernel，并为每个参数提供静态类型，例如 `wp.array[wp.vec3]`、`float`、`wp.mat33`。首次调用时，Warp 会把模块内注册的 kernel 编译成原生代码：

$$
\text{Python AST / type hints}
\longrightarrow
\text{Warp IR}
\longrightarrow
\text{C++/CUDA}
\longrightarrow
\text{dynamic library + PTX}
$$

kernel launch 的并行语义接近 CUDA。若执行：

```python
wp.launch(add_kernel, dim=1024, inputs=[a, b], outputs=[c], device="cuda")
```

则 kernel body 会被 1024 个 logical threads 执行，线程 \(i\) 通过 `wp.tid()` 访问自己的数组元素。二维或三维问题可以用 `dim=(nx, ny)` 或 `dim=(nx, ny, nz)`，此时 `wp.tid()` 返回坐标索引。这种模型比 NumPy 式整体数组表达更适合写碰撞、稀疏邻接、粒子系统、网格 stencil 和几何查询。

##### 自动微分：adjoint kernel 与 tape

Warp 默认为 kernel 生成 forward 和 backward/adjoin 版本。设若干 kernel 组合成映射：

$$
\mathbf{y}=F_K\circ F_{K-1}\circ\cdots\circ F_1(\mathbf{x})
$$

目标损失为：

$$
\mathcal{L}(\mathbf{x})=\ell(\mathbf{y})
$$

反向模式需要计算：

$$
\bar{\mathbf{x}}
=
\left(\frac{\partial F}{\partial \mathbf{x}}\right)^{\top}
\bar{\mathbf{y}},\qquad
\bar{\mathbf{y}}=\frac{\partial \ell}{\partial \mathbf{y}}
$$

Warp 的 `wp.Tape` 记录 forward pass 中的 kernel launch，然后从后往前调用对应 adjoint kernel。数组若要参与梯度链路，需要在创建时设置：

```python
x = wp.zeros(1024, dtype=wp.vec3, device="cuda", requires_grad=True)
```

反向结束后，梯度可从 `x.grad` 读取。对非标量输出，`tape.backward(grads={output: seed})` 可显式提供输出 adjoint，相当于计算向量-Jacobian product：

$$
\mathbf{v}^{\top}J
=
\mathbf{v}^{\top}\frac{\partial \mathbf{y}}{\partial \mathbf{x}}
$$

##### 一个最小公式例子

考虑 kernel 中每个线程计算：

$$
y_i=x_i^2+3x_i+1
$$

若损失为：

$$
\mathcal{L}=\sum_i y_i
$$

则反向 kernel 对每个线程执行的核心逻辑就是：

$$
\frac{\partial \mathcal{L}}{\partial x_i}
=
\frac{\partial \mathcal{L}}{\partial y_i}
\frac{\partial y_i}{\partial x_i}
=
1\cdot(2x_i+3)
$$

在真实仿真中，\(y_i\) 可能是下一步粒子位置、接触力、FEM 残差或渲染结果；Warp 的价值在于让这些计算保持 GPU kernel 形态，同时生成对应反向程序，而不是退回 Python 循环或小算子图。

##### 原地写入与梯度正确性

Warp 与 PyTorch/JAX 的重要区别是显式内存管理。深度学习框架通常每个操作产生新 tensor，因此中间值自然保留；Warp kernel 常写入用户提供的数组，甚至多次覆盖同一 buffer。自动微分时，如果某个数组元素被覆盖，旧值是否仍需用于反向传播就变成用户和框架共同管理的问题。

官方文档的规则是：输出梯度在 backward 中默认会被消费并清零，从而让多次写入时只通过最后一次写入传播梯度；如果用户设置 `retain_grad=True` 保留中间梯度，就必须确保每个元素最多写一次，否则可能重复计数。对 `wp.atomic_add()` 等累加式操作，Warp 的图会专门处理 adjoint accumulation。

> ⚠️ 注意：Warp 不是“任意 Python 程序自动可微”。kernel scope 支持的是可编译到 CPU/CUDA 的类型化子集；Python list、动态对象、任意全局状态和不可静态分析的控制流都不属于常规 kernel 语义。

##### 面向大规模微分模拟的机制

物理仿真常见更新可以写成：

$$
\mathbf{s}_{t+1}
=
\Phi_{\Delta t}(\mathbf{s}_t,\mathbf{u}_t,\phi)
$$

其中 \(\mathbf{u}_t\) 是控制输入，\(\phi\) 是质量、刚度、摩擦、几何等参数。Warp kernel 可以把每步分解为力计算、约束求解、积分、碰撞、loss reduction：

```python
with wp.Tape() as tape:
    for t in range(T):
        wp.launch(compute_forces, dim=n, inputs=[state, params, forces])
        wp.launch(solve_contacts, dim=num_contacts, inputs=[state, contacts, impulses])
        wp.launch(integrate, dim=n, inputs=[state, forces, impulses, dt])
    wp.launch(task_loss, dim=n, inputs=[state, target, loss])
tape.backward(loss)
```

如果优化目标是反推控制力或材料参数：

$$
\min_{\mathbf{u}_{0:T-1},\phi}
\left\|\mathbf{o}(\mathbf{s}_T)-\mathbf{o}^{\star}\right\|_2^2
+\lambda\sum_{t=0}^{T-1}\|\mathbf{u}_t\|_2^2
$$

Warp 的反向传播会给出 \(\partial\mathcal{L}/\partial \mathbf{u}_t\) 和 \(\partial\mathcal{L}/\partial\phi\)，这些梯度可直接交给 PyTorch/JAX 优化器。相比黑盒仿真加 finite difference，反向模式对高维参数更有效；相比完全手写 CUDA adjoint，开发成本显著降低。

##### 与 DiffTaichi 的关系和差异

| 方面 | DiffTaichi | NVIDIA Warp |
|------|------------|-------------|
| 前端 | Taichi DSL/Python 前端 | 类型化 Python 函数与装饰器 |
| 编译目标 | Taichi IR 到 CPU/GPU 后端 | Python 到 C++/CUDA/PTX，模块缓存 |
| AD 组织 | kernel 内源变换 + kernel 间 tape | forward/backward kernel + `wp.Tape` |
| 生态重点 | 论文级可微分物理语言与示例 | NVIDIA GPU、仿真、机器人、几何、ML 互操作 |
| 内存模型 | Taichi field/global tensor | 显式 `wp.array`、device、grad buffer |
| 典型用户 | 研究者实现可微分物理模拟器 | 需要 Python 生产力与 CUDA 性能的仿真/ML 开发者 |

可以把 Warp 看作 DiffTaichi 思路在更通用 Python/NVIDIA 生态中的工程化延展：保留“高性能 kernel 级编译 + 反向 adjoint + tape”的核心，同时提供更丰富的几何、FEM、稀疏、框架互操作和示例库。

#### 🧪 练习题

```yaml
question: "在 NVIDIA Warp 中，`wp.Tape()` 的主要作用是什么？"
options:
  - "把 Python 源文件保存成普通日志，供调试打印使用"
  - "记录 forward pass 的 kernel launch，并在 backward 中反向重放 adjoint kernel"
  - "自动把所有 Python 对象转换为 PyTorch tensor"
  - "为每个 GPU 线程动态分配 Python list"
answer: 1
explain: "Warp 的可微分流程依赖 tape 记录 kernel 调用图；反向阶段根据 loss 或输出 adjoint 触发对应 backward kernel 计算输入梯度。"
```
