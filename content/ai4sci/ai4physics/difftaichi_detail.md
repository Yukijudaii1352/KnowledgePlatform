### DiffTaichi — 可微分太极 (Differentiable Taichi)

```yaml
id: difftaichi
name: DiffTaichi
full_name: 可微分太极 (Differentiable Taichi)
year: "2020"
org: MIT
paper_url: https://arxiv.org/abs/1910.00935
category: fluid_simulation
parent: —
motivation: 命令式可微分编程支持流体控制
```

#### 📝 一句话总结

DiffTaichi 提出面向物理仿真的命令式可微编程系统，用 Taichi 编译器的源代码变换生成高性能梯度内核，并用轻量 tape 反向回放仿真步骤，解决了传统深度学习框架难以高效表达碰撞、稀疏索引、粒子-网格交互和长时间步物理控制的问题。

#### 🎯 核心要点

- **两尺度自动微分**：kernel 内部用源代码变换生成反向内核，kernel 之间用轻量 tape 记录调用并按逆序回放
- **保持命令式物理代码形态**：支持并行 `for`、分支、原子加、全局张量和灵活索引，更接近 C++/CUDA/Fortran 仿真写法
- **面向 megakernel 的性能设计**：相比把所有操作拆成张量算子，DiffTaichi 保留高算术强度和并行循环结构
- **全局数据访问规则**：多次写同一全局元素时从第二次起必须是 atomic add，且累加完成前不能读该元素，以保证反向传播语义明确
- **10 个可微仿真器展示**：覆盖弹性体、3D 流体、水波、烟雾、刚体、质量弹簧、台球、电场等优化任务
- **代表性性能结果**：diffmpm 弹性体仿真代码比手写 CUDA 短 4.2 倍且速度接近，比 TensorFlow 版本快 188 倍；smoke 任务 GPU 总时间优于 PyTorch/Autograd/JAX 基线

#### 🔬 深入细节

##### 核心架构示意图

![DiffTaichi 可微物理仿真示意](https://yuanming.taichi.graphics/publication/2020-difftaichi/featured.jpg)
*图：DiffTaichi 的官方论文页面封面图，左侧强调对仿真变量求导，右侧展示论文中的 10 个可微物理仿真器示例。来源：作者项目页 https://yuanming.taichi.graphics/publication/2020-difftaichi/。*

论文 PDF 中的 Figure 2 展示了更关键的系统结构：Taichi 原有前端、IR 和 JIT 编译器被复用，DiffTaichi 增加了 local AD 源码变换、adjoint tensor 存储和 tape；tape 只记录 kernel 启动及标量参数，反向时按逆序调用对应梯度 kernel。可访问论文来源为 `https://arxiv.org/abs/1910.00935`，代码示例来源为 `https://github.com/taichi-dev/difftaichi`。

##### 算法伪代码

```python
# DiffTaichi 风格：质量弹簧系统的可微仿真与控制参数优化伪代码
import taichi as ti

steps = 1024
dt = 1e-3
lr = 1e-2

x = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
v = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
force = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
spring_length = ti.field(dtype=ti.f32, shape=n_springs, needs_grad=True)
loss = ti.field(dtype=ti.f32, shape=(), needs_grad=True)

@ti.kernel
def apply_spring_force(t: ti.i32):
    for s in range(n_springs):  # GPU/CPU parallel loop
        a = spring_anchor_a[s]
        b = spring_anchor_b[s]
        dist = x[t - 1, a] - x[t - 1, b]
        length = dist.norm() + 1e-4
        F = stiffness * (length - spring_length[s]) * dist / length
        force[t, a] += -F      # 多源写入用 atomic add
        force[t, b] += F

@ti.kernel
def time_integrate(t: ti.i32):
    for i in range(n_objects):
        v[t, i] = damping * v[t - 1, i] + dt * force[t, i] / mass[i]
        x[t, i] = x[t - 1, i] + dt * v[t, i]

def forward():
    for t in range(1, steps):
        apply_spring_force(t)
        time_integrate(t)

@ti.kernel
def compute_loss():
    area = triangle_area(x[steps - 1, 0], x[steps - 1, 1], x[steps - 1, 2])
    loss[None] = (area - target_area) ** 2

for it in range(200):
    # 论文写作时 API 为 ti.Tape；现代 Taichi 中常见写法为 ti.ad.Tape。
    with ti.ad.Tape(loss):
        forward()
        compute_loss()
    for s in range(n_springs):
        spring_length[s] -= lr * spring_length.grad[s]
```

##### 动机与背景

可微物理仿真常被用于控制、参数反演、形状优化和可学习物理模块。朴素做法是把仿真写在 PyTorch/TensorFlow/JAX 中，让框架自动微分；问题是物理仿真大量使用非规则访问、scatter/gather、粒子-网格交换、碰撞分支、边界条件和稀疏结构，这些模式在通用张量框架中要么表达笨重，要么生成大量低算术强度的小算子。

DiffTaichi 的切入点是：保留物理仿真工程师熟悉的命令式 kernel 写法，同时让编译器生成反向传播程序。它不是把仿真改写成神经网络层，而是让原本像 CUDA kernel 一样的代码直接成为可微模块。

##### 两尺度自动微分机制

DiffTaichi 把自动微分分成 local AD 和 global AD 两层。对单个 Taichi kernel，编译器先做 IR 预处理：把分支 flatten 成 `select`，消除可变局部变量并转成更接近 SSA 的形式，然后对直线代码做反向模式源码变换。若前向 kernel 表示为：

$$Y=f(X_1,X_2,\ldots,X_n)$$

则生成的 adjoint kernel 接收输出伴随 \(Y^\*\)，并把梯度累加回输入伴随：

$$X_i^\* \mathrel{+}= \left(\frac{\partial f}{\partial X_i}\right)^\top Y^\*$$

对完整仿真程序，DiffTaichi 不记录每个中间张量副本，而是依赖全局张量保存每个时间步状态，再用 tape 记录 kernel 调用序列：

$$S_T = K_T \circ K_{T-1}\circ\cdots\circ K_1(S_0)$$

反向传播时按逆序执行：

$$\bar{S}_{t-1} \mathrel{+}= \left(\frac{\partial K_t}{\partial S_{t-1}}\right)^\top \bar{S}_t$$

> 💡 关键：local AD 保留 kernel 内并行结构，global AD 只记录 kernel 调用和参数。这样既避免了通用 tracing 系统保存大量中间 buffer，也避免了对上千时间步整体做一次巨大源码变换造成编译爆炸。

##### 物理更新公式与损失

论文用质量弹簧系统解释 DiffTaichi 的基本写法。弹簧力遵循 Hooke 定律：

$$F_{a\leftarrow b}=k\left(\left\|x_a-x_b\right\|_2-l_0\right)\frac{x_a-x_b}{\left\|x_a-x_b\right\|_2}$$

半隐式 Euler 更新为：

$$v_{t,i}=e^{-\Delta t\alpha}v_{t-1,i}+\frac{\Delta t}{m_i}F_{t,i}$$

$$x_{t,i}=x_{t-1,i}+\Delta t\,v_{t,i}$$

控制或设计变量可以是弹簧静长、初始速度、神经网络控制器权重等。以目标三角形面积为例：

$$\mathcal{L}=\left(A(x_{T,0},x_{T,1},x_{T,2})-A_{\text{target}}\right)^2$$

DiffTaichi 自动计算 \(\partial\mathcal{L}/\partial l_0\)，再用梯度下降更新弹簧参数。对流体控制任务，参数也可以是初始速度场或控制器输出；损失通常是最终烟雾密度、速度场或图像与目标之间的误差。

##### 为什么命令式可微编程适合流体与材料仿真

流体、MPM 和刚体仿真常见的操作不是矩阵乘法，而是“每个粒子把质量/动量 scatter 到网格”“每个网格点求压力投影”“碰撞时根据条件修正速度”。DiffTaichi 允许代码直接写：

- 对粒子、网格或弹簧做并行循环
- 用任意索引访问全局张量
- 对同一网格节点用 atomic add 累加粒子贡献
- 在 kernel 内处理边界、碰撞和材料分支

这些特性让前向程序和传统高性能仿真代码非常接近。反向程序由编译器维护，既减少手写伴随方程的工作量，也降低梯度实现与前向实现不一致的风险。

##### 碰撞梯度与 TOI 问题

论文强调，可微仿真并不等于“直接对离散代码求导就一定物理正确”。刚体碰撞中，若只在离散时间点检测碰撞，降低初始高度可能在前向结果上看似合理，但离散碰撞时刻没有参与求导，导致最终高度相对初始高度的梯度符号错误。DiffTaichi 用 continuous time of impact (TOI) 修正此类梯度，使反向传播反映碰撞发生时刻的变化。

> ⚠️ 注意：DiffTaichi 解决的是“高性能命令式程序如何自动生成梯度”，但仿真离散化本身仍需要物理建模判断。碰撞、接触、拓扑变化等非光滑事件需要 TOI、平滑化或自定义梯度来得到有意义的优化方向。

##### 与传统自动微分框架的区别

| 维度 | PyTorch/TensorFlow/JAX 直接写仿真 | DiffTaichi |
|------|----------------------------------|------------|
| 编程风格 | 张量算子、函数式数组变换 | 命令式 kernel、并行循环、全局张量 |
| 非规则索引 | 依赖 gather/scatter，代码冗长 | 原生任意索引和数据布局 |
| kernel 粒度 | 容易产生许多小算子 | 保留 megakernel 和高算术强度 |
| 反向传播 | 通用 tape 或 JIT AD | kernel 内源码变换 + kernel 间轻量 tape |
| 适合场景 | 常规深度学习和规则数组计算 | 物理仿真、图形学、粒子-网格和控制优化 |

#### 🧪 练习题

```yaml
question: "DiffTaichi 的两尺度自动微分中，light-weight tape 主要记录什么？"
options:
  - "每个时间步的所有中间张量副本"
  - "神经网络每层的激活值和权重矩阵"
  - "kernel 调用顺序、函数指针和标量参数，并在反向时逆序回放梯度 kernel"
  - "最终渲染图像的像素梯度直方图"
answer: 2
explain: "DiffTaichi 的中间状态主要存放在全局张量中，tape 只需记录 kernel 启动结构和参数；反向传播时按相反顺序执行编译器生成的 adjoint kernel。"
```
