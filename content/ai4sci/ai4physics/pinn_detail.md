### PINN — 物理信息神经网络 (Physics-Informed Neural Networks)

```yaml
id: pinn
name: PINN
full_name: 物理信息神经网络 (Physics-Informed Neural Networks)
year: '2019'
org: 布朗大学
paper_url: https://doi.org/10.1016/j.jcp.2018.10.045
category: pde_solving
parent: —
motivation: 将PDE残差嵌入Loss实现无网格求解
```

#### 📝 一句话总结

PINN 用神经网络 \(u_\theta(t,x)\) 表示 PDE 解，并把由自动微分计算出的 PDE 残差 \(f_\theta\) 加入训练损失，使少量观测数据、边界/初始条件和物理方程约束共同驱动无网格求解与参数反演。

#### 🎯 核心要点

- **统一框架**：将 forward problem 的解函数逼近和 inverse problem 的未知物理参数识别统一写成神经网络优化问题
- **物理残差损失**：对一般 PDE \(u_t+\mathcal{N}[u;\lambda]=0\)，定义 \(f_\theta=u_{\theta,t}+\mathcal{N}[u_\theta;\lambda]\)，并在 collocation points 上最小化 \(f_\theta\)
- **自动微分**：时间导数、空间导数和高阶导数都由自动微分计算，不需要手工网格差分模板
- **数据效率**：损失同时包含初始/边界/稀疏观测误差 \(MSE_u\) 和 PDE 残差误差 \(MSE_f\)，使少量数据也能约束整个时空域
- **连续时间模型**：直接在 \((t,x)\) 上训练 \(u_\theta(t,x)\)，适合给定连续 PDE 形式并采样大量残差点
- **离散时间模型**：用 Runge-Kutta 等时间推进结构处理时间快照较少但时间跨度较大的场景
- **代表实验**：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、Navier-Stokes 等 forward/inverse 示例

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 DOI 指向 Journal of Computational Physics 版本；为了获得可直接访问的图示和方法文本，这里参考作者公开 arXiv/html 版本: https://ar5iv.labs.arxiv.org/html/1711.10561，以及项目页 https://github.com/maziarraissi/PINNs。

![PINN 求解 Burgers 方程示意](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png)
*图：PINN 在 Burgers 方程上利用少量初始/边界数据点和 10,000 个 collocation points 学习全时空解；下方对比了多个时间截面的 exact solution 与 prediction。*

##### 算法伪代码

```python
# 连续时间 PINN 训练伪代码

def neural_solution(t, x, theta):
    # MLP 输入时空坐标，输出 PDE 解 u_theta(t, x)
    return mlp(concat(t, x), theta)

def pde_residual(t, x, theta, lambda_params):
    u = neural_solution(t, x, theta)
    u_t = grad(u, t)
    u_x = grad(u, x)
    u_xx = grad(u_x, x)

    # 以 Burgers 方程为例: u_t + u u_x - nu u_xx = 0
    nu = lambda_params["nu"]
    f = u_t + u * u_x - nu * u_xx
    return f

for step in range(num_steps):
    # supervised points: 初始条件、边界条件或少量传感器观测
    t_u, x_u, y_u = sample_data_points()
    u_pred = neural_solution(t_u, x_u, theta)
    mse_u = mean((u_pred - y_u) ** 2)

    # collocation points: 不需要标签，只要求满足 PDE
    t_f, x_f = sample_collocation_points()
    f_pred = pde_residual(t_f, x_f, theta, lambda_params)
    mse_f = mean(f_pred ** 2)

    loss = mse_u + mse_f
    update(theta + lambda_params, loss)  # inverse problem 时 lambda_params 也可学习
```

##### 基本数学形式

PINN 从一般非线性 PDE 出发：

$$
u_t + \mathcal{N}[u;\lambda]=0,\qquad x\in\Omega,\ t\in[0,T].
$$

用神经网络 \(u_\theta(t,x)\) 作为解函数的连续近似，然后通过自动微分构造物理残差：

$$
f_\theta(t,x)
=
\frac{\partial u_\theta}{\partial t}(t,x)
+\mathcal{N}[u_\theta;\lambda](t,x).
$$

连续时间 PINN 的核心损失是：

$$
\mathcal{L}(\theta,\lambda)
=MSE_u+MSE_f,
$$

其中

$$
MSE_u=
\frac{1}{N_u}
\sum_{i=1}^{N_u}
\left|
u_\theta(t_u^i,x_u^i)-u^i
\right|^2,
$$

$$
MSE_f=
\frac{1}{N_f}
\sum_{i=1}^{N_f}
\left|
f_\theta(t_f^i,x_f^i)
\right|^2.
$$

\(MSE_u\) 负责贴合初始条件、边界条件或传感器数据；\(MSE_f\) 负责让网络输出在无标签 collocation points 上满足 PDE。因为 \(f_\theta\) 是由 \(u_\theta\) 的导数构造出来的，整个训练目标对网络参数可微。

##### 以 Burgers 方程为例

论文的经典示例是一维 viscous Burgers 方程：

$$
u_t + u u_x - \frac{0.01}{\pi}u_{xx}=0.
$$

PINN 用 \(u_\theta(t,x)\) 近似解，并定义：

$$
f_\theta
=
u_{\theta,t}
+u_\theta u_{\theta,x}
-\frac{0.01}{\pi}u_{\theta,xx}.
$$

训练数据只包含少量初始/边界点，但在时空域内部采样大量 collocation points 来约束 \(f_\theta \approx 0\)。这就是“物理信息”的来源：collocation points 没有真实 \(u\) 标签，却通过 PDE 残差提供训练信号。

> 💡 关键：PINN 的无网格并不是“没有坐标点”，而是不需要传统数值解法那种固定网格拓扑和离散算子。它仍然需要在连续域中采样监督点与残差点。

##### Forward problem 与 inverse problem

在 forward problem 中，\(\lambda\) 和 PDE 形式已知，训练目标是求解 \(u(t,x)\)。在 inverse problem 中，部分物理参数未知，例如 Burgers 方程中的粘性系数或 Navier-Stokes 方程中的雷诺相关参数；此时把 \(\lambda\) 也作为可学习变量，和 \(\theta\) 一起优化：

$$
(\theta^\star,\lambda^\star)
=
\arg\min_{\theta,\lambda}
\left(MSE_u(\theta)+MSE_f(\theta,\lambda)\right).
$$

这让 PINN 能在观测稀疏、噪声存在时做参数反演。直觉上，数据项告诉模型“观测到的解长什么样”，残差项告诉模型“只有某些参数值才能让这些观测符合 PDE”。

##### 连续时间与离散时间 PINN

连续时间 PINN 直接把 \((t,x)\) 输入网络，适合在整个时空域采样 collocation points。它简单通用，但当时间跨度很长、动力学很复杂或 PDE 解具有尖锐层时，优化会变难。

论文还讨论了离散时间模型：把时间推进写入 Runge-Kutta 结构，用少量时间快照训练从 \(t_n\) 到 \(t_{n+1}\) 的映射。离散时间形式的好处是可以处理大时间步和快照数据，缺点是结构更依赖所选时间积分格式。

##### 与传统数值方法和普通神经网络的区别

| 方法 | 解的表示 | PDE 使用方式 | 数据需求 | 主要限制 |
|------|----------|--------------|----------|----------|
| 有限差分/有限元 | 网格节点值 | 离散方程直接求解 | 不需要训练数据 | 依赖网格、复杂几何和高维问题成本高 |
| 普通监督神经网络 | \(u_\theta(t,x)\) | 不使用或只隐式使用 | 需要大量标签 | 容易违反物理方程 |
| PINN | \(u_\theta(t,x)\) | PDE 残差作为损失项 | 少量标签 + 大量残差点 | 非凸优化、损失权重、尺度和刚性问题敏感 |

PINN 的影响力来自它把 PDE 约束变成了深度学习训练目标的一部分，而不是在训练后检查物理一致性。但它也不是传统数值方法的通用替代品。对于多尺度、湍流、高频或长时间混沌系统，标准 PINN 往往会遇到梯度病态、谱偏置和不同损失项权重难平衡的问题；后续 XPINN、Causal PINN、自适应采样和 operator learning 方法都在解决这些瓶颈。

#### 🧪 练习题

```yaml
question: "标准连续时间 PINN 中 collocation points 的主要作用是什么？"
options:
  - "提供真实解标签，使网络做普通监督学习"
  - "在无标签时空点上计算 PDE 残差，并把物理方程作为损失约束"
  - "替代自动微分，手工计算有限差分导数"
  - "只用于可视化训练后的预测结果"
answer: 1
explain: "collocation points 通常没有真实 u 标签；它们用于评估 f_theta 是否接近 0，从而把 PDE 结构注入损失函数。"
```
