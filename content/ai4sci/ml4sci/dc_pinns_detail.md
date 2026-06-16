### DC-PINNs — 导数约束物理信息神经网络 (Derivative-Constrained PINNs)

```yaml
id: dc_pinns
name: DC-PINNs
full_name: 导数约束物理信息神经网络 (Derivative-Constrained PINNs)
year: '2026'
org: arXiv
paper_url: https://journals.aps.org/pre/abstract/10.1103/PhysRevE.111.015303
category: pinn_family
parent: pinn
motivation: 显式编码导数约束确保物理一致性
```

#### 📝 一句话总结

DC-PINNs 将单纯最小化 PDE 残差的 PINN 扩展为“PDE + 边界/初值 + 导数不等式约束”的多目标优化框架，用自动微分显式约束单调性、凸性、上下界和不可压缩等导数关系，从而减少物理不可行解。

#### 🎯 核心要点

- **导数约束统一形式**：把约束写为 \(h(\mathbf{x},\mathcal{D}_h u_\theta)\le 0\)，支持梯度、Hessian、方向导数、散度等条件
- **一侧惩罚机制**：对不等式只惩罚违反部分 \([h]_+=\max(h,0)\)，不干扰已经满足物理约束的区域
- **四类损失分组**：监督/初值 \(\mathcal{L}_0\)、边界 \(\mathcal{L}_b\)、PDE 残差 \(\mathcal{L}_f\)、导数约束 \(\mathcal{L}_h\)
- **样本级自适应权重**：对每类 loss 内部的单个约束点使用 \(m_\chi^{(j)}\) 调整影响，使严重违反约束的点更容易被优化器看到
- **类别级自适应权重**：用各类损失对网络参数的平均绝对梯度更新 \(\lambda_\chi\)，缓解 PDE、边界、导数约束量级不一致的问题
- **基准覆盖三类物理场景**：带上下界的热扩散、无套利约束下的局部波动率曲面、含涡脱落的 Navier-Stokes 流动
- **与硬约束方法对比**：论文对比 PINNs+固定不等式惩罚、hPINN、penalty、augmented Lagrangian 等，强调 DC-PINNs 在减少约束违反和稳定性指标上的优势

#### 🔬 深入细节

##### 图示与可访问来源

![DC-PINNs 指标改进图](https://arxiv.org/html/2604.13723v1/DC-PINNs_metrics_bar.png)
*图：论文 Figure 7，展示 DC-PINNs 相对普通 PINNs 在多项指标上的百分比改进。*

![DC-PINNs 热方程预测示例](https://arxiv.org/html/2604.13723v1/DC-PINNs_1DHeat2.png)
*图：论文 Figure 1，一维热方程预测与误差。该例用于说明仅有 PDE 残差较小时，显式导数/范围约束仍能改善物理可行性。*

可访问来源说明：任务给出的 APS URL 与 arXiv 记录的 Related DOI 不完全一致；可访问全文为 `https://arxiv.org/abs/2604.13723` 和 HTML `https://arxiv.org/html/2604.13723v1`。arXiv 记录显示论文题为 *Physics-Informed Neural Networks for Solving Derivative-Constrained PDEs*，已被 Phys. Rev. E 接收，Related DOI 为 `10.1103/5bbf-p6zk`。

##### 算法伪代码

```python
# DC-PINNs with balancing processes
initialize theta
initialize category weights lambda_chi = 1 for chi in {0, b, f, h}
initialize sample weights m_chi = ones_like(points_chi)

for k in range(max_steps):
    # 1. 前向预测与自动微分
    u0 = net_theta(x0)
    ub = net_theta(xb)
    uf = net_theta(xf)
    uh = net_theta(xh)
    derivatives_f = autodiff(uf, xf)
    derivatives_h = autodiff(uh, xh)

    # 2. 分组损失
    L0 = mse(u0, y0)
    Lb = mse(boundary_operator(ub), boundary_value)
    Lf = mean_square(pde_residual(xf, derivatives_f))
    Lh = mean_square(relu(h_constraint(xh, derivatives_h)))

    # 3. 样本级与类别级加权
    L_hat = {
        0: weighted_mean(m_0, L0),
        b: weighted_mean(m_b, Lb),
        f: weighted_mean(m_f, Lf),
        h: weighted_mean(m_h, Lh),
    }
    loss = sum(lambda_chi[chi] * L_hat[chi] for chi in {0, b, f, h})

    # 4. 定期增强违反严重的样本权重
    if k % p_m == 0:
        m_chi += eta_m * grad(L_hat_chi, m_chi)

    # 5. 定期按梯度量级平衡类别权重
    if k % p_lambda == 0:
        alpha_chi = mean_abs(grad(L_hat_chi, theta))
        lambda_chi += sum(alpha_all) / alpha_chi

    # 6. 更新网络
    theta -= eta * grad(loss, theta)
```

##### 问题形式：把物理解读为可行域

标准 PINN 主要要求神经网络输出 \(u_\theta\) 满足 PDE 和边界条件：

$$
f(\mathbf{x},\mathcal{D}u_\theta)=0,\quad
b(\mathbf{x},\mathcal{D}u_\theta)=0.
$$

但很多物理问题还要求导数满足额外条件。例如金融期权曲面不能违反无套利单调/凸性条件，流体速度场要满足不可压缩约束，温度或浓度场可能存在梯度方向和上下界要求。DC-PINNs 将这类问题写为

$$
\hat{\theta}
=
\arg\min_{\theta}\mathcal{L}(\mathbf{x},\mathcal{D}u_\theta)
\quad \text{s.t.}\quad
\begin{cases}
f(\mathbf{x},\mathcal{D}u_\theta)=0, & \mathbf{x}\in\Omega,\\
b(\mathbf{x},\mathcal{D}u_\theta)=0, & \mathbf{x}\in\partial\Omega,\\
h(\mathbf{x},\mathcal{D}_h u_\theta)\le 0, & \mathbf{x}\in\Omega.
\end{cases}
$$

其中 \(\mathcal{D}_h\) 是参与约束的导数集合。典型例子包括单调性 \(\nabla u\ge 0\)、方向凸性 \(\operatorname{diag}(\nabla^2u)\ge 0\)、斜率上界 \(\|\nabla u\|\le L\) 和散度约束 \(\nabla\cdot \mathbf{u}=0\)。

##### 一侧导数惩罚

不等式约束的关键是不能把“满足约束的点”也继续推离原解。因此 DC-PINNs 使用一侧惩罚：

$$
\mathcal{L}_h
=
\frac{1}{N_h}\sum_{i=1}^{N_h}
\left[\max\left(h(\mathbf{x}_i,\mathcal{D}_h u_\theta),0\right)\right]^2.
$$

如果 \(h\le 0\)，该点没有惩罚；只有 \(h>0\) 的物理违规区域会产生梯度。这比把导数值强行拟合到某个固定目标更稳健，因为很多物理规律只给出可行域，而不指定唯一导数值。

##### 多目标损失与自适应平衡

论文将训练损失分成四类：

$$
\mathcal{L}
=
\sum_{\chi\in\{0,b,f,h\}}
\lambda_\chi\,
\hat{\mathcal{L}}_\chi(m_\chi,x_\chi).
$$

\(\chi=0\) 表示监督/初值数据，\(b\) 表示边界，\(f\) 表示 PDE，\(h\) 表示导数约束。每一类内部有样本级权重 \(m_\chi\)，类别之间有动态乘子 \(\lambda_\chi\)。

样本级更新为

$$
m_\chi^{(j)}(k+1)
=
m_\chi^{(j)}(k)
+\eta_m\nabla_{m_\chi^{(j)}}\hat{\mathcal{L}}_\chi(k),
$$

直觉是让大违反点获得更高关注度。类别级权重则用梯度尺度调节：

$$
\lambda_\chi(k+1)=
\begin{cases}
1, & \alpha_\chi=0,\\
\lambda_\chi(k)+
\dfrac{\sum_{\chi'}\alpha_{\chi'}}{\alpha_\chi}, & \text{otherwise},
\end{cases}
\quad
\alpha_\chi=
\overline{\left|\nabla_\theta \hat{\mathcal{L}}_\chi(k)\right|}.
$$

> 💡 关键：导数不等式的梯度通常很稀疏，因为大多数点可能已经满足约束。用平均绝对梯度而不是平方梯度，有助于保留少数严重违规点对训练方向的影响。

##### 为什么普通 PINN 不够

普通 PINN 可以把 PDE 残差压低，但 PDE 残差小并不必然代表解在工程上可用。以局部波动率为例，价格曲面即便满足 Black-Scholes 型 PDE，也可能出现负局部方差、非单调或非凸结构；以不可压缩流为例，压力梯度和速度场导数关系的微小不一致会累积成错误涡结构。

DC-PINNs 的设计把这些“PDE 外但物理上必须成立”的条件直接写进训练目标。它不是替代 PINN 的 PDE 残差，而是在同一网络、同一自动微分图上增加可行域约束，使优化目标从“方程残差最小”变成“方程残差小且位于物理可行域”。

##### 与硬约束和固定惩罚的区别

硬约束方法在存在解析输出变换时很强，例如把输出限制在 \([u_{\min},u_{\max}]\)：

$$
\psi_\theta^{hard}
=
u_{\min}+(u_{\max}-u_{\min})\psi(\mathbf{x}).
$$

但很多导数约束没有简单的解析变换，例如 \(u_x\le U\) 或 Hessian 半正定。固定惩罚和 augmented Lagrangian 可以处理这些约束，但容易引入额外超参数、外循环和优化刚性。DC-PINNs 的优势在于保留软惩罚的通用性，同时用 \(m_\chi\) 和 \(\lambda_\chi\) 动态调节训练难度。

#### 🧪 练习题

```yaml
question: "DC-PINNs 中对不等式导数约束 h(x, D_h u) <= 0 使用 [h]_+ 的主要原因是什么？"
options:
  - "让所有导数都被强制拟合为 0"
  - "只惩罚违反约束的点，不干扰已经物理可行的点"
  - "避免使用自动微分计算导数"
  - "把边界条件从损失函数中删除"
answer: 1
explain: "[h]_+ = max(h, 0) 是一侧惩罚；当约束已经满足时惩罚为 0，只有 h>0 的违规区域参与优化。"
```
