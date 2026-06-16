### LNN — 拉格朗日神经网络 (Lagrangian Neural Networks)

```yaml
id: lnn
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: '2020'
org: DeepMind
paper_url: https://arxiv.org/abs/2003.04630
category: physics_constrained
parent: hnn
motivation: 学习拉格朗日量处理约束动力学
```

#### 📝 一句话总结

LNN 用神经网络参数化任意拉格朗日量 \(L_\theta(q,\dot q)\)，再通过 Euler-Lagrange 方程和自动微分求出加速度，使模型在无需正则动量坐标的情况下学习能量守恒动力学。

#### 🎯 核心要点

- **核心对象**：网络输出标量拉格朗日量 \(L_\theta(q,\dot q)\)，而不是直接预测 \(\ddot q\) 或哈密顿量 \(H(q,p)\)
- **动力学计算**：利用 Euler-Lagrange 方程，将 \(L_\theta\) 的梯度、Hessian 和混合二阶导数组合成 \(\ddot q_\theta\)
- **相对 HNN 的优势**：不要求输入是正则坐标 \((q,p)\)，可直接处理广义坐标和速度 \((q,\dot q)\)
- **相对 DeLaN 的优势**：不把动能固定为 \(\dot q^\top M(q)\dot q/2\)，因此能表达相对论粒子等非二次动能系统
- **训练信号**：用观测加速度监督 \(\ddot q_\theta\)，无需真实能量标签或手写 \(T-V\) 形式
- **实验验证**：双摆长期能量守恒显著优于普通 NN；相对论粒子中 HNN 在非正则坐标下失败而 LNN 可工作；Lagrangian Graph Network 可建模 1D 波方程
- **实现细节**：需要二阶导数和 Hessian 伪逆，激活函数需有非零二阶导，论文使用 JAX 与 softplus

#### 🔬 深入细节

##### 可访问来源与核心示意图

论文 arXiv 页面: https://arxiv.org/abs/2003.04630；可访问 HTML 与图像来源: https://ar5iv.labs.arxiv.org/html/2003.04630；开源代码: https://github.com/MilesCranmer/lagrangian_nns。

![LNN 核心思想图](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png)
*图：普通神经网络长期滚动时容易耗散或偏离真实轨迹；LNN 通过学习拉格朗日量并用 Euler-Lagrange 方程产生动力学，把守恒结构写进模型。*

![双摆实验中的角度与能量误差](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png)
*图：双摆短期角度误差上 LNN 与普通基线接近，但长时间能量误差上 LNN 明显更稳定。*

![Lagrangian Graph Network 的波方程示例](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x6.png)
*图：把局部拉格朗日密度在网格/图上求和后，LNN 可扩展到连续介质和 1D 波方程。*

##### 算法伪代码

```python
# LNN 训练与推理伪代码

class LagrangianNN:
    def __init__(self):
        # 使用二阶可导激活，例如 softplus；ReLU 的二阶导几乎处处为 0，不适合
        self.net = MLP(input_dim=2 * dim_q, output_dim=1, activation="softplus")

    def L(self, q, q_dot):
        return self.net(concat(q, q_dot))  # scalar L_theta(q, q_dot)

    def acceleration(self, q, q_dot):
        # L_q = ∂L/∂q
        L_q = grad(lambda q_: self.L(q_, q_dot), q)

        # H_vv = ∂²L/∂q_dot²
        H_vv = hessian(lambda v_: self.L(q, v_), q_dot)

        # H_qv = ∂²L/∂q∂q_dot
        H_qv = jacobian(
            lambda q_: grad(lambda v_: self.L(q_, v_), q_dot),
            q,
        )

        # Euler-Lagrange: H_vv q_ddot + H_qv q_dot = L_q
        q_ddot = pseudo_inverse(H_vv) @ (L_q - H_qv @ q_dot)
        return q_ddot

model = LagrangianNN()
optimizer = Adam(lr=learning_rate)

for step in range(num_steps):
    q, q_dot, q_ddot_true = sample_batch(trajectory_data)
    q_ddot_pred = model.acceleration(q, q_dot)
    loss = mean_squared_error(q_ddot_pred, q_ddot_true)
    optimizer.update(model.parameters(), grad(loss))

# 推理时把 (q_dot, q_ddot_theta) 作为一阶 ODE 积分
def state_rhs(state, t):
    q, q_dot = split(state)
    return concat(q_dot, model.acceleration(q, q_dot))
```

##### 从最小作用量到可训练模型

经典拉格朗日力学从作用量开始：

$$
S[q]=\int_{t_0}^{t_1} L(q,\dot q,t)\,dt,
$$

真实轨迹使作用量驻定，由此得到 Euler-Lagrange 方程：

$$
\frac{d}{dt}
\frac{\partial L}{\partial \dot q}
-
\frac{\partial L}{\partial q}
=0.
$$

传统物理中，研究者先写出 \(L=T-V\)，再符号推导运动方程。LNN 反过来：用神经网络 \(L_\theta(q,\dot q)\) 表示未知拉格朗日量，再通过自动微分把 Euler-Lagrange 方程变成可计算的加速度函数。这给模型提供了强归纳偏置：只要动力学来自某个时间不显含的拉格朗日量，就自然对应守恒能量。

##### 黑盒拉格朗日量如何产生加速度

因为 \(L_\theta\) 是黑盒网络，不能手工展开 Euler-Lagrange 方程。令 \(v=\dot q\)，对

$$
\frac{d}{dt}\nabla_v L(q,v)=\nabla_q L(q,v)
$$

使用链式法则：

$$
\nabla_{vv}^2 L(q,v)\,\ddot q
+
\nabla_{qv}^2 L(q,v)\,\dot q
=
\nabla_q L(q,v).
$$

于是可解出加速度：

$$
\ddot q_\theta
=
\left(\nabla_{vv}^2 L_\theta(q,v)\right)^{\dagger}
\left[
\nabla_q L_\theta(q,v)
-
\nabla_{qv}^2 L_\theta(q,v)\,v
\right],
$$

其中 \((\cdot)^\dagger\) 表示伪逆，用来处理 Hessian 奇异或病态的情况。训练损失可以直接监督加速度：

$$
\mathcal{L}_{\mathrm{train}}
=
\frac{1}{|\mathcal{B}|}
\sum_{(q,v,a)\in\mathcal{B}}
\left\|
\ddot q_\theta(q,v)-a
\right\|_2^2.
$$

推理时，把状态写成一阶系统

$$
\frac{d}{dt}
\begin{bmatrix}
q \\
v
\end{bmatrix}
=
\begin{bmatrix}
v \\
\ddot q_\theta(q,v)
\end{bmatrix},
$$

再用 ODE solver 滚动轨迹。

##### 为什么不直接用 HNN

HNN 学习哈密顿量 \(H(q,p)\)，要求输入变量是正则坐标和正则动量。如果数据只有角度和角速度 \((q,\dot q)\)，并不总能把 \(\dot q\) 当作 \(p\)。例如相对论粒子的动量是

$$
p=\frac{m\dot q}{\sqrt{1-\dot q^2/c^2}},
$$

不是简单的 \(m\dot q\)。如果把非正则速度误当作动量送入 HNN，辛结构约束会被施加在错误坐标上，模型可能无法学习正确动力学。

LNN 避免了这个问题：拉格朗日形式天然使用广义坐标和广义速度 \((q,\dot q)\)，正则动量由

$$
p = \frac{\partial L}{\partial \dot q}
$$

隐式定义，不需要作为输入给出。这就是 LNN 在“动量未知或难以计算”的实验中优于 HNN 的原因。

##### 为什么不限制成刚体动力学形式

Deep Lagrangian Networks 等机器人动力学方法通常假设

$$
L(q,\dot q)
=
\frac{1}{2}\dot q^\top M(q)\dot q
-
V(q),
$$

其中 \(M(q)\) 是正定质量矩阵。这对许多刚体系统合理，但它把动能固定成速度的二次型。LNN 不做这个限制，直接学习任意标量 \(L_\theta(q,\dot q)\)，因此可以表达磁场中带电粒子、相对论粒子等非标准动能系统。

代价是计算更重：每次求 \(\ddot q\) 都要计算 Hessian 和矩阵伪逆，复杂度随坐标维数上升。论文因此强调 JAX 自动微分、合适初始化以及 softplus 等二阶可导激活的重要性。

##### Lagrangian Graph Network：从粒子到连续介质

对网格或图结构系统，可以不直接让一个网络吃下全部坐标，而是学习局部拉格朗日密度并求和：

$$
L(q,\dot q)
=
\sum_i
\mathcal{L}_\theta
\left(q_{\mathcal{N}(i)},\dot q_{\mathcal{N}(i)}\right),
$$

其中 \(\mathcal{N}(i)\) 是节点 \(i\) 的邻域。对 1D 波方程，邻域可取左右相邻网格点；局部密度学习类似

$$
\mathcal{L}
=
\frac{1}{2}u_t^2
-
\frac{c^2}{2}u_x^2.
$$

这种写法把平移共享和局部相互作用作为先验，避免全局 Hessian 过密。论文中的 1D 波方程实验显示，Lagrangian Graph Network 可以准确传播波形并保持积分能量稳定。

##### 与相关模型的区别

| 模型 | 学习对象 | 输入坐标要求 | 守恒结构 | 主要限制 |
|------|----------|--------------|----------|----------|
| 普通 NN / Neural ODE | 直接学习 \(\dot x\) 或 \(\ddot q\) | 无特殊要求 | 无保证 | 长期滚动容易能量漂移 |
| HNN | \(H(q,p)\) | 需要正则 \((q,p)\) | 哈密顿辛结构 | 动量未知或非正则时困难 |
| DeLaN | 受限 \(T(q,\dot q)-V(q)\) | 广义坐标和速度 | 拉格朗日结构 | 动能形式通常受限为二次型 |
| LNN | 任意 \(L_\theta(q,\dot q)\) | 广义坐标和速度 | Euler-Lagrange 结构 | 二阶导与 Hessian 伪逆成本高 |

LNN 的贡献可以概括为：把 HNN 的“学习守恒标量”思想从哈密顿形式迁移到更通用的拉格朗日形式，同时不强加刚体动力学常见的动能参数化。它尤其适合只有位置和速度观测、动量定义复杂或需要广义坐标建模的物理系统。

#### 🧪 练习题

```yaml
question: "LNN 相比 HNN 的关键优势是什么？"
options:
  - "LNN 不需要任何二阶导数，因此计算总是更便宜"
  - "LNN 学习拉格朗日量并使用广义坐标和速度，不要求输入是正则动量坐标"
  - "LNN 直接把能量误差写入损失函数，因此不需要动力学数据"
  - "LNN 只能处理动能为速度二次型的刚体系统"
answer: 1
explain: "HNN 依赖正则坐标 (q,p)，而 LNN 通过 Euler-Lagrange 方程从 L(q,q_dot) 计算动力学，可在动量未知或难以构造时直接使用广义速度。"
```
