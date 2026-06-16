### SympNets — 辛神经网络 (Symplectic Neural Networks)

```yaml
id: sympnets
name: SympNets
full_name: 辛神经网络 (Symplectic Neural Networks)
year: '2020'
org: Pengzhan Jin
paper_url: https://doi.org/10.1016/j.neunet.2020.08.028
category: physics_constrained
parent: hnn
motivation: 本质满足辛对称消除数值耗散
```

#### 📝 一句话总结

SympNets 提出直接学习 Hamiltonian 系统相流 \(\Phi_h:y_0\mapsto y(h)\) 的辛神经网络，用线性、激活和梯度辛模块的复合让网络在结构上满足辛条件，从而避免普通神经网络或 HNN 在长时间预测中的能量漂移和数值积分开销。

#### 🎯 核心要点

- **直接学习相流**：输入当前相空间点 \(x_i=(p_i,q_i)\)，输出固定时间步后的点 \(y_i=\phi_h(x_i)\)，而不是先学习 Hamiltonian 再积分
- **硬约束辛结构**：每个模块都满足 \(\left(\partial\Phi/\partial x\right)^T J\left(\partial\Phi/\partial x\right)=J\)，复合后仍是 symplectic map
- **三类基础模块**：线性辛模块 \(\mathcal{L}\)、激活辛模块 \(\mathcal{N}\)、梯度辛模块 \(\mathcal{G}\)，都写成单位三角 shear 形式
- **两种主架构**：LA-SympNet 交替组合线性模块和激活模块；G-SympNet 只堆叠梯度模块
- **无约束参数化**：线性模块中的对称矩阵 \(S\) 用 \(A+A^T\) 表示，使普通优化器可以直接训练
- **理论保证**：论文证明 LA-SympNet 和 G-SympNet 在合适激活函数下可在 \(C^r\) 意义下逼近任意辛映射
- **实验覆盖**：摆、双摆、三体问题，包含可分和不可分 Hamiltonian；小模型也能在长时间滚动预测中保持更好的几何结构
- **相对 HNN 的优势**：预测阶段不需要计算 \(\nabla H_\theta\)，也不需要再调用数值积分器，训练和推理都更接近普通前馈网络

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 DOI 指向 Neural Networks 期刊版本；可直接访问的论文全文和图示可参考 arXiv 版本: https://arxiv.org/abs/2001.03750。下图来自 ar5iv 渲染的论文 Figure 1。

![SympNets 架构示意图](https://ar5iv.labs.arxiv.org/html/2001.03750/assets/x1.png)
*图：SympNets 以单位三角连接模式构造辛网络；LA-SympNet 使用线性模块和激活模块，G-SympNet 使用梯度模块。*

##### 算法伪代码

```python
# SympNet 固定步长相流学习伪代码

def symplectic_linear_up(p, q, A, b_p, b_q):
    S = A + A.T
    return p + S @ q + b_p, q + b_q

def symplectic_linear_low(p, q, A, b_p, b_q):
    S = A + A.T
    return p + b_p, q + S @ p + b_q

def activation_low(p, q, a, sigma):
    return p, q + diag(a) @ sigma(p)

def gradient_low(p, q, K, a, b, sigma):
    # \hat{\sigma}_{K,a,b}(p) = K^T diag(a) sigma(Kp + b)
    return p, q + K.T @ (diag(a) @ sigma(K @ p + b))

class LASympNet:
    def __call__(self, p, q):
        for block in blocks:
            p, q = block.linear(p, q)
            p, q = block.activation(p, q)
        p, q = final_linear(p, q)
        return p, q

for epoch in range(num_epochs):
    x0, x1 = sample_pairs(training_set)  # x1 = phi_h(x0)
    p0, q0 = split(x0)
    p_pred, q_pred = model(p0, q0)
    loss = mean_squared_error(concat(p_pred, q_pred), x1)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 长时间预测：直接反复应用已学习的辛映射
trajectory = [x_init]
for n in range(num_steps):
    trajectory.append(model(trajectory[-1]))
```

##### 为什么要直接学习辛相流

Hamiltonian 系统可以写成

$$
\dot{y}=J^{-1}\nabla H(y),\qquad
J=\begin{pmatrix}0&I\\-I&0\end{pmatrix}.
$$

其真实相流 \(\phi_t\) 满足辛条件：

$$
\left(\frac{\partial \phi_t}{\partial y_0}\right)^T
J
\left(\frac{\partial \phi_t}{\partial y_0}\right)
=J.
$$

普通 MLP 学习 \(x_i\mapsto y_i\) 时没有这个约束，长时间迭代后容易破坏相空间体积和近似守恒量。HNN 虽然学习 \(H_\theta\) 并通过 \(J^{-1}\nabla H_\theta\) 注入 Hamiltonian 结构，但如果训练数据只有离散轨迹，就仍要用数值差分或积分器构造导数监督；预测时还要再积分一次。SympNets 的策略更直接：把网络本身设计成一个辛映射，让一次前向传播就是一个结构保持的时间步。

训练数据是固定步长的相流样本：

$$
\mathcal{T}=\{(x_i,y_i)\}_{i=1}^{N},\qquad y_i=\phi_h(x_i),
$$

目标函数就是相流拟合误差：

$$
\mathcal{L}(\theta)=
\frac{1}{2dN}\sum_{i=1}^{N}
\left\|\Phi_{h,\theta}(x_i)-y_i\right\|^2.
$$

> 💡 关键：SympNets 不是在 loss 里“惩罚不辛”，而是把搜索空间限制在辛映射族内；只要模块实现正确，训练前后都满足辛结构。

##### 三种辛模块

SympNets 的核心构造来自一个简单事实：辛映射的复合仍是辛映射。因此只要找到容易训练的局部辛模块，就可以像堆普通神经网络层一样堆出复杂相流。

线性模块使用上下三角辛矩阵：

$$
\ell_{\mathrm{up}}
\begin{pmatrix}p\\q\end{pmatrix}
=
\begin{pmatrix}I&S\\0&I\end{pmatrix}
\begin{pmatrix}p\\q\end{pmatrix}+b,\qquad
\ell_{\mathrm{low}}
\begin{pmatrix}p\\q\end{pmatrix}
=
\begin{pmatrix}I&0\\S&I\end{pmatrix}
\begin{pmatrix}p\\q\end{pmatrix}+b,
$$

其中 \(S=S^T\)。实现时令 \(S=A+A^T\)，就不需要在优化器里显式加入对称约束。多个上下三角块交替复合可以表示任意线性辛矩阵，论文引用并使用 \(SP=L_9\) 的分解结果。

激活模块是非线性 shear：

$$
\mathcal{N}_{\mathrm{low}}
\begin{pmatrix}p\\q\end{pmatrix}
=
\begin{pmatrix}
p\\
q+\operatorname{diag}(a)\sigma(p)
\end{pmatrix},
$$

它等价于某个势函数 \(V(p)=a^T(\int\sigma)(p)\) 的梯度 shear，因此仍是辛映射。对应的 \(\mathcal{N}_{\mathrm{up}}\) 对 \(q\) 做同类操作。

梯度模块进一步增加宽度和表达力：

$$
\mathcal{G}_{\mathrm{low}}
\begin{pmatrix}p\\q\end{pmatrix}
=
\begin{pmatrix}
p\\
q+K^T\operatorname{diag}(a)\sigma(Kp+b)
\end{pmatrix}.
$$

这里 \(K\in\mathbb{R}^{n\times d}\)，通常取 \(n>d\)。它可以看成用一个单隐藏层网络近似任意 \(\nabla V\)，再将其嵌入辛 shear。

##### LA-SympNet 与 G-SympNet

LA-SympNet 的形式是

$$
\psi
=v_{k+1}\circ w_k\circ v_k\circ\cdots\circ w_1\circ v_1,
\quad v_i\in\mathcal{M}_L,\; w_i\in\mathcal{M}_A.
$$

它接近“线性层 + 激活层”的普通 MLP 直觉，但每个线性层和激活层都被替换成辛模块。G-SympNet 则是

$$
\psi=u_k\circ u_{k-1}\circ\cdots\circ u_1,
\quad u_i\in\mathcal{M}_G.
$$

它更像一串可学习的 Hamiltonian shear，结构更简单，某些实验中测试误差更低。论文证明，在 sigmoid 等 \(r\)-finite 激活下，LA-SympNet 和 G-SympNet 都能在紧集上 \(C^r\)-一致逼近任意 \(C^r\) 辛映射。

##### 与 HNN 的本质区别

HNN 的模型输出是标量 \(H_\theta(y)\)，然后用

$$
\dot{y}=J^{-1}\nabla H_\theta(y)
$$

得到向量场；要从离散数据训练它，通常还要构造 \(\dot{y}\) 的近似。SympNets 的模型输出直接是 \(\Phi_h(y)\)，损失对齐的是下一时刻状态。这样做牺牲了显式 Hamiltonian 的可解释性，但换来两个工程优势：第一，推理是一次前向传播，无需在每一步调用 ODE solver；第二，模型天然就是一个几何数值积分器，长时间迭代时不会像普通黑盒映射那样随意破坏辛结构。

局限也很明确：SympNets 假设目标动力学确实可以由辛相流描述，因此主要适用于保守 Hamiltonian 系统；如果存在强耗散、外力或接触冲击，必须扩展结构或把系统分解为保守与非保守部分。

#### 🧪 练习题

```yaml
question: "SympNets 相比 HNN 的关键结构差异是什么？"
options:
  - "SympNets 直接学习固定时间步相流，并让网络层本身都是辛映射"
  - "SympNets 在损失函数中加入更大的能量惩罚项"
  - "SympNets 只适用于可分 Hamiltonian，而 HNN 可处理不可分系统"
  - "SympNets 用 CNN 替代 MLP 来提高表达能力"
answer: 0
explain: "SympNets 的核心是把线性、激活、梯度模块设计成辛映射并复合，直接拟合 x 到 phi_h(x)；辛性来自架构而非额外惩罚项。"
```
