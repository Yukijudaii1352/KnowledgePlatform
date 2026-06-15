### 哈密顿神经网络 (Hamiltonian Neural Networks)

```yaml
id: hnn
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: "2019.12"
org: Google Brain
paper_url: https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html
category: physics
parent: interaction_networks
motivation: 引入哈密顿力学确保能量守恒
```

#### 📝 一句话总结

HNN 用神经网络参数化系统的哈密顿量 \(H(q,p)\)，再通过哈密顿方程从能量梯度导出动力学，解决普通神经网络直接拟合状态导数时容易违反能量守恒、长期 rollout 漂移的问题。

#### 🎯 核心要点

- **学习标量 Hamiltonian**：网络输出单个能量式标量，而不是直接输出状态导数
- **辛梯度动力学**：通过 \(\dot{q}=\partial H/\partial p\)、\(\dot{p}=-\partial H/\partial q\) 构造向量场
- **无监督守恒量学习**：不需要能量标签，只用状态导数监督即可学到近似能量守恒量
- **时间可逆性**：哈密顿系统的流映射满足相空间体积守恒和可逆性
- **多任务验证**：质量弹簧、理想摆、真实摆、二体问题和像素摆
- **像素到 Hamiltonian**：结合 autoencoder 在 latent 空间学习 pendulum 的哈密顿动力学

#### 🔬 深入细节

![HNN 质量弹簧示意](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png)
*图：普通神经网络 rollout 出现能量漂移，而 HNN 学到近似总能量的守恒量并保持轨道稳定。*

##### 算法伪代码

```python
# Hamiltonian Neural Network training
def hnn_derivative(q, p):
    x = concat(q, p)
    H = hamiltonian_mlp(x)          # scalar
    dH_dq, dH_dp = grad(H, (q, p))
    q_dot = dH_dp
    p_dot = -dH_dq
    return q_dot, p_dot

for q, p, q_dot_true, p_dot_true in dataset:
    q_dot_pred, p_dot_pred = hnn_derivative(q, p)
    loss = mse(q_dot_pred, q_dot_true) + mse(p_dot_pred, p_dot_true)
    update(loss)

# rollout 用 ODE integrator 积分 hnn_derivative
trajectory = solve_ivp(hnn_derivative, initial_state)
```

##### 动机与背景

普通神经网络学习动力学时通常直接拟合：

$$
\dot{x} = f_{\theta}(x)
$$

这种方法可以在训练分布内拟合单步导数，但没有物理守恒约束。长期积分时，即使每步误差很小，也可能表现为能量逐渐增加或衰减，最终轨迹从真实系统中漂走。

HNN 的核心想法是把输出空间从“任意向量场”限制为“某个哈密顿量的辛梯度”。如果系统有正则坐标 \(x=(q,p)\)，哈密顿力学给出：

$$
\frac{d}{dt}
\begin{bmatrix}
q \\
p
\end{bmatrix}
=
\begin{bmatrix}
\frac{\partial H}{\partial p} \\
-\frac{\partial H}{\partial q}
\end{bmatrix}
$$

这样构造出的动力学天然沿着 \(H\) 的等值线运动，因此不会随意改变能量。

##### 学习目标

HNN 参数化标量函数：

$$
H_{\theta}(q,p) \in \mathbb{R}
$$

再用自动微分得到导数：

$$
\hat{\dot{q}} = \frac{\partial H_{\theta}}{\partial p}, \quad
\hat{\dot{p}} = -\frac{\partial H_{\theta}}{\partial q}
$$

训练损失只比较预测导数和观测导数：

$$
\mathcal{L}_{HNN} =
\left\|
\frac{\partial H_{\theta}}{\partial p} - \dot{q}
\right\|_2^2
+
\left\|
-\frac{\partial H_{\theta}}{\partial q} - \dot{p}
\right\|_2^2
$$

论文强调不需要真实能量标签；网络学到的是与真实总能量成比例或相差常数的守恒量，这已足以稳定轨迹。

##### 像素摆实验

在像素观测中，模型先用 autoencoder 把连续两帧 pendulum 图像编码为 latent 坐标 \(z=(q,p)\)，再在 latent 空间应用 HNN。损失包括像素重建、HNN 导数拟合和 latent 辅助约束，使 latent 的两半近似满足正则坐标关系。

这说明 HNN 不一定只能接收人工定义的坐标；只要编码器能学出接近正则坐标的表示，就可以把哈密顿先验用于高维观测。

##### 与 IN/GNS 的区别

IN 和 GNS 通过对象关系图表达局部相互作用，适合多对象组合泛化；HNN 则从守恒律出发，约束整个系统的动力学向量场。它不要求显式对象图，但要求状态能表示为正则坐标 \((q,p)\)，且系统近似保守。

> ⚠️ 注意：HNN 对摩擦、耗散、碰撞等非保守过程不天然适配。真实摆实验中如果存在阻尼，HNN 会倾向于学习一个近似守恒系统，无法解释能量损失本身。

#### 🧪 练习题

```yaml
question: "HNN 为什么比直接预测状态导数的 MLP 更能保持长期稳定？"
options:
  - "因为 HNN 输出更多参数"
  - "因为 HNN 通过哈密顿量的辛梯度构造动力学，天然约束能量式守恒量"
  - "因为 HNN 不需要训练数据"
  - "因为 HNN 只预测位置，不预测动量"
answer: 1
explain: "HNN 学习标量 H(q,p)，再用哈密顿方程生成向量场，使轨迹沿守恒量等值线演化，从结构上减少能量漂移。"
```
