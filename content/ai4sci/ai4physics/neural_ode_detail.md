### Neural ODE — 神经常微分方程 (Neural Ordinary Differential Equations)

```yaml
id: neural_ode
name: Neural ODE
full_name: 神经常微分方程 (Neural Ordinary Differential Equations)
year: '2018'
org: 多伦多大学
paper_url: https://arxiv.org/abs/1806.07366
category: physics_constrained
parent: —
motivation: 网络层视为连续时间演化
```

#### 📝 一句话总结

Neural ODE 将 ResNet 的离散层更新推广为连续时间微分方程 \(\frac{dz}{dt}=f_\theta(z,t)\)，用黑盒 ODE solver 完成前向传播，并用伴随敏感性方法以近似常数内存训练连续深度模型。

#### 🎯 核心要点

- **连续深度建模**：把有限层网络 \(h_{k+1}=h_k+f(h_k,\theta_k)\) 的极限写成 ODE 初值问题 \(z(t_1)=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_1)\)
- **黑盒求解器前向传播**：模型输出由自适应数值积分器计算，函数评估次数可随样本复杂度和误差容忍度变化
- **伴随敏感性训练**：反向传播时不存储全部 solver 内部状态，而是从终点向起点积分 augmented dynamics，恢复对状态、时间和参数的梯度
- **连续正规化流 CNF**：利用瞬时变量变换公式 \(\frac{d\log p(z(t))}{dt}=-\operatorname{Tr}(\partial f/\partial z)\)，避免离散 normalizing flow 中昂贵的 Jacobian determinant
- **不规则时间序列**：用 latent ODE 在连续时间潜空间中演化，天然处理任意时间戳观测
- **可调精度/速度**：同一个训练后模型可以通过 ODE solver tolerance 在推理时权衡计算量与数值误差
- **主要风险**：求解器误差、刚性动力学、反向积分不稳定和函数评估次数过多，会使训练成本不一定低于普通深层网络

#### 🔬 深入细节

##### 可访问来源与核心示意图

论文 arXiv 页面: https://arxiv.org/abs/1806.07366；可访问 HTML 与图像来源: https://ar5iv.labs.arxiv.org/html/1806.07366。

![残差网络的离散变换](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x1.png)
![ODE 网络的连续变换](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x2.png)
*图：左侧 ResNet 定义有限个离散变换；右侧 Neural ODE 定义连续向量场，solver 在需要的位置评估 \(f_\theta\) 来推进状态。*

![Neural ODE 伴随状态反向传播示意](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x3.png)
*图：反向传播时从终点向起点积分 adjoint state，并在观测/损失时间点注入梯度。*

##### 算法伪代码

```python
# Neural ODE forward + adjoint backward 伪代码

def forward(z0, t0, t1, theta, rtol, atol):
    # z(t1) = z(t0) + ∫ f_theta(z(t), t) dt
    z1 = ode_solve(lambda z, t: f_theta(z, t, theta),
                   z0, t0, t1, rtol=rtol, atol=atol)
    return z1

def backward(z1, dL_dz1, t0, t1, theta):
    # a(t) = ∂L / ∂z(t)
    # augmented state stores z, adjoint a, and parameter gradient accumulator g
    aug_T = (z1, dL_dz1, zeros_like(theta))

    def augmented_dynamics(aug, t):
        z, a, g = aug
        f = f_theta(z, t, theta)

        # vector-Jacobian products, implemented by autograd
        a_f_z, a_f_theta = vjp(f, (z, theta), vector=a)

        dz_dt = f
        da_dt = -a_f_z
        dg_dt = -a_f_theta
        return (dz_dt, da_dt, dg_dt)

    # integrate backward from t1 to t0
    z0, a0, grad_theta = ode_solve(augmented_dynamics, aug_T, t1, t0)
    return a0, grad_theta
```

##### 从 ResNet 到连续时间动力系统

ResNet 的基本层更新可以写作：

$$
h_{k+1}=h_k+f(h_k,\theta_k).
$$

如果把层号视为时间，把步长取得更小，就得到连续极限：

$$
\frac{dz(t)}{dt}=f_\theta(z(t),t), \qquad z(t_0)=z_0.
$$

前向传播不再是显式执行第 1 层、第 2 层、第 3 层，而是求解初值问题：

$$
z(t_1)=z(t_0)+\int_{t_0}^{t_1} f_\theta(z(t),t)\,dt
=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_1).
$$

这带来一个重要抽象：神经网络模块变成“可微分的连续时间变换”。网络深度不再是固定整数，而由 solver 根据误差容忍度自动决定需要多少次函数评估。对简单样本，solver 可以少评估；对复杂或快速变化样本，solver 会增加评估点。

##### 伴随敏感性方法

直接对 ODE solver 的每一步反向传播会保存大量中间状态，内存随函数评估次数增长。Neural ODE 采用 adjoint sensitivity method，定义伴随变量：

$$
a(t)=\frac{\partial \mathcal{L}}{\partial z(t)}.
$$

伴随变量满足反向时间 ODE：

$$
\frac{da(t)}{dt}
=
-a(t)^\top
\frac{\partial f_\theta(z(t),t)}{\partial z(t)}.
$$

同时，参数梯度可以通过另一个累积状态得到：

$$
\frac{dg_\theta(t)}{dt}
=
-a(t)^\top
\frac{\partial f_\theta(z(t),t)}{\partial \theta}.
$$

实际反向传播时，把 \((z(t),a(t),g_\theta(t))\) 作为 augmented state，从 \(t_1\) 积分回 \(t_0\)。这样不需要保存前向求解器内部的每一步，只需保存终点、时间点和参数。

> 💡 关键：伴随法不是“没有反向传播”，而是把反向传播本身也写成一个 ODE 初值问题。它用额外的函数评估换取显存节省。

##### 连续正规化流：为什么更容易算密度

普通 normalizing flow 需要离散可逆层，并在每层计算 Jacobian determinant。Neural ODE 的连续可逆变换让 log-density 的变化率变成 trace：

$$
\frac{d \log p(z(t))}{dt}
=
-\operatorname{Tr}
\left(
\frac{\partial f_\theta(z(t),t)}{\partial z(t)}
\right).
$$

因此可以把状态和 log-density 一起积分：

$$
\frac{d}{dt}
\begin{bmatrix}
z(t) \\
\log p(z(t))
\end{bmatrix}
=
\begin{bmatrix}
f_\theta(z(t),t) \\
-\operatorname{Tr}(\partial f_\theta/\partial z)
\end{bmatrix}.
$$

这就是 continuous normalizing flow (CNF) 的核心。它不需要设计特殊三角 Jacobian 或 coupling layer 来降低 determinant 成本，模型容量可以通过向量场宽度、时间依赖和隐藏层结构提升。不过 trace 计算在高维时仍然昂贵，后续 FFJORD 等工作进一步引入 Hutchinson trace estimator 来近似这一项。

##### 不规则时间序列与 latent ODE

在时间序列任务中，传统 RNN 往往假设离散步长规则，或者需要为缺失时间做特殊插值。Neural ODE 的连续时间形式可直接在任意时间戳上求值：

$$
z(t_i)=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_i).
$$

论文中的 latent ODE 模型用 recognition network 从观测序列推断初始潜变量 \(z(t_0)\)，再用 ODE 在潜空间中连续演化，最后用 decoder 生成不同时间点的观测。这使模型结构与真实观测时间分辨率解耦，适合医疗记录、传感器日志等不规则采样数据。

##### 与普通深层网络的区别

| 维度 | ResNet / 离散深层网络 | Neural ODE |
|------|------------------------|------------|
| 深度 | 固定层数 | 连续时间区间与 solver 评估次数 |
| 前向计算 | 顺序执行层 | 数值积分 ODE |
| 内存 | 保存中间激活 | 伴随法可近似常数内存 |
| 误差控制 | 架构固定，无显式求解误差 | solver tolerance 控制局部误差 |
| 变换性质 | 未必可逆 | ODE flow 在满足条件时可逆 |
| 主要成本 | 层数和宽度 | 函数评估次数、刚性和误差容忍度 |

Neural ODE 的思想非常适合物理建模语境，因为很多系统本来就由连续时间动力学描述。但它不是所有网络的直接替代品：如果学习到的向量场很刚性，solver 会被迫使用极小步长；如果反向积分轨迹和前向数值轨迹不一致，梯度会有偏差；如果任务本身强依赖离散事件，连续流的归纳偏置也可能不合适。

#### 🧪 练习题

```yaml
question: "Neural ODE 中 adjoint sensitivity method 的主要作用是什么？"
options:
  - "把所有 ODE 求解都替换成 Euler 显式格式"
  - "通过反向积分伴随状态来计算梯度，避免保存前向求解器的全部中间状态"
  - "保证学习到的动力系统一定满足能量守恒"
  - "让 normalizing flow 的输出维度可以随时间改变"
answer: 1
explain: "伴随法把反向传播写成 augmented ODE，从终点积分回起点来恢复状态梯度和参数梯度，因此能以额外计算换取较低内存。"
```
