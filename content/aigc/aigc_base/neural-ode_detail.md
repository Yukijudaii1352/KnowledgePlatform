### Neural ODE：神经常微分方程

```yaml
id: neural-ode
name: Neural ODE
full_name: "神经常微分方程 (Neural Ordinary Differential Equations)"
year: "2018"
org: "University of Toronto"
paper_url: "https://arxiv.org/abs/1806.07366"
category: flow_matching
parent: "—"
motivation: "连续深度模型为流匹配奠定数学基础"
```

#### 📝 一句话总结

Neural ODE 将神经网络层的离散残差更新推广为连续时间动力系统，用 ODE solver 计算隐藏状态演化，并用伴随敏感度方法在常数级内存下反向传播，为连续归一化流、概率流 ODE 和流匹配模型奠定了数学基础。

#### 🎯 核心要点

- 连续深度建模：用 \(\frac{d\mathbf{h}(t)}{dt}=f(\mathbf{h}(t),t,\theta)\) 替代固定层数的离散网络
- 黑盒 ODE solver 前向：输出不是逐层堆叠得到，而是由 `ODESolve` 从 \(t_0\) 积分到 \(t_1\) 得到
- 伴随敏感度反向传播：不保存每个 solver 内部步的中间激活，而是反向求解增广 ODE 来计算梯度
- 自适应计算：ODE solver 可根据误差容忍度动态选择步长，在精度和速度之间显式折中
- 连续归一化流：用瞬时变量替换公式 \(\frac{\partial \log p(\mathbf{z}(t))}{\partial t}=-\operatorname{Tr}\left(\frac{\partial f}{\partial \mathbf{z}}\right)\) 构建可逆密度模型
- 时间序列建模：连续动力学天然支持不规则采样观测，不需要把观测强行离散到固定时间网格

#### 🔬 深入细节

##### 1. 核心示意图

![ResNet 离散层示意](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x1.png)
![ODE-Net 连续动力系统示意](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x2.png)
*图：论文 Figure 1 对比 ResNet 的离散有限层变换与 ODE-Net 的连续隐藏状态演化。*

![Neural ODE 伴随反向传播示意](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x3.png)
*图：论文 Figure 2 展示伴随敏感度方法如何从终点向起点反向求解增广 ODE，并在多个观测时间点更新 adjoint。*

##### 2. 从 ResNet 到连续深度

ResNet 的残差块可以写成：

$$
\mathbf{h}_{t+1}=\mathbf{h}_t + f(\mathbf{h}_t,\theta_t)
$$

这与 Euler 方法离散求解 ODE 的形式非常相似。如果把层间步长变小、层数趋于连续，隐藏状态就不再是有限个层索引上的向量，而是连续时间函数 \(\mathbf{h}(t)\)。Neural ODE 直接参数化其导数：

$$
\frac{d\mathbf{h}(t)}{dt}=f(\mathbf{h}(t),t,\theta)
$$

给定初始状态 \(\mathbf{h}(t_0)\)，模型输出为初值问题在 \(t_1\) 的解：

$$
\mathbf{h}(t_1)=\mathbf{h}(t_0)+\int_{t_0}^{t_1} f(\mathbf{h}(t),t,\theta)\,dt
=\operatorname{ODESolve}(\mathbf{h}(t_0), f, t_0, t_1, \theta)
$$

这意味着“网络深度”不再由人工指定的层数决定，而是由 ODE solver 为达到误差容忍度而执行的函数评估次数决定。困难样本可能需要更多评估，简单样本可能更少。

##### 3. 伴随敏感度方法

训练 Neural ODE 的核心难点是如何对 ODE solver 反向传播。如果把 solver 内部每一步都展开成计算图，内存会随 solver 步数增长，而且自适应步长会让计算图复杂。论文采用伴随敏感度方法，把 solver 当作黑盒。

设损失为 \(L(\mathbf{z}(t_1))\)，定义伴随状态：

$$
\mathbf{a}(t)=\frac{\partial L}{\partial \mathbf{z}(t)}
$$

伴随状态满足反向时间 ODE：

$$
\frac{d\mathbf{a}(t)}{dt}
=-\mathbf{a}(t)^\top \frac{\partial f(\mathbf{z}(t),t,\theta)}{\partial \mathbf{z}}
$$

参数梯度也可以通过同一个反向积分累计：

$$
\frac{dL}{d\theta}
=-\int_{t_1}^{t_0}
\mathbf{a}(t)^\top
\frac{\partial f(\mathbf{z}(t),t,\theta)}{\partial \theta}
\,dt
$$

直觉上，前向时只需要知道起点和终点；反向时从终点 \(\mathbf{z}(t_1)\) 和 \(\frac{\partial L}{\partial \mathbf{z}(t_1)}\) 出发，沿着时间反方向同时恢复状态、伴随变量和参数梯度。这样避免保存所有内部激活，内存主要取决于状态维度而不是求解步数。

##### 4. 核心流程伪代码

```python
# Neural ODE forward and adjoint backward
def forward(z0, t0, t1, theta):
    z1 = ODESolve(func=f_theta, y0=z0, t0=t0, t1=t1, params=theta)
    return z1

def backward(z1, dL_dz1, t0, t1, theta):
    # augmented state contains original state, adjoint, and accumulated parameter gradient
    aug_T = (z1, dL_dz1, zeros_like(theta))

    def augmented_dynamics(t, aug):
        z, a, dL_dtheta = aug
        f = f_theta(z, t, theta)
        vjp_z, vjp_theta = vector_jacobian_products(a, f, (z, theta))
        dz_dt = f
        da_dt = -vjp_z
        dtheta_dt = -vjp_theta
        return (dz_dt, da_dt, dtheta_dt)

    z0, dL_dz0, dL_dtheta = ODESolve(
        func=augmented_dynamics,
        y0=aug_T,
        t0=t1,
        t1=t0,
        params=theta,
    )
    return dL_dz0, dL_dtheta
```

##### 5. 与传统深度网络的区别

传统前馈网络把层数、每层计算图和中间激活全部固定下来；Neural ODE 只定义连续向量场 \(f_\theta\)，把“如何从起点走到终点”交给数值积分器。这带来两个直接后果：第一，模型可用误差容忍度控制速度和精度；第二，函数评估次数成为一种数据依赖的自适应计算量。

与普通 RNN 或时间序列模型相比，Neural ODE 不要求观测出现在固定离散时间点。只要给定任意时间 \(t\)，ODE solver 都能把状态积分到该时间。因此它很自然地适配医学记录、传感器日志等不规则采样场景。

与离散 normalizing flow 相比，连续归一化流的变量替换更简洁。连续动力学下，对数密度的变化由雅可比迹控制：

$$
\frac{\partial \log p(\mathbf{z}(t))}{\partial t}
=-\operatorname{Tr}\left(\frac{\partial f}{\partial \mathbf{z}(t)}\right)
$$

这条公式把“样本如何移动”和“密度如何变化”放进同一个连续系统，也解释了 Neural ODE 为什么是后续 probability flow ODE、continuous normalizing flow、flow matching 的基础语言。

##### 6. 对流匹配的意义

流匹配方法通常学习一个时间相关向量场，把简单分布中的噪声样本连续搬运到数据分布。Neural ODE 提供了精确的计算框架：学习向量场 \(v_\theta(\mathbf{x},t)\)，再通过 ODE 积分得到生成轨迹。

区别在于，Neural ODE 原论文关注“如何把神经网络定义为连续深度模型并训练它”，而流匹配进一步规定了向量场应该匹配哪类概率路径或条件流。可以把 Neural ODE 看作连续生成模型的数值求解和反向传播基础，把 flow matching 看作在这个基础上设计更直接、更稳定的训练目标。

> 💡 关键：Neural ODE 的核心不是某个特定网络结构，而是把深度学习中的“层”替换为可学习的连续时间向量场，并用 ODE solver 作为模型执行引擎。

#### 🧪 练习题

```yaml
question: "Neural ODE 中伴随敏感度方法的主要作用是什么？"
options:
  - "让 ODE solver 不需要任何数值积分"
  - "通过反向求解增广 ODE 计算梯度，避免保存所有前向内部步的激活"
  - "把连续时间模型强制转换成固定层数的 ResNet"
  - "只用于提升分类准确率，与内存无关"
answer: 1
explain: "伴随方法把 solver 当作黑盒，从终点向起点反向积分状态、adjoint 和参数梯度，因此训练内存不随前向 solver 内部步数线性增长。"
```
