### SA-PINN — 自适应物理信息神经网络 (Self-Adaptive PINN)

```yaml
id: sa_pinn
name: SA-PINN
full_name: 自适应物理信息神经网络 (Self-Adaptive PINN)
year: '2020'
org: 布朗大学
paper_url: https://arxiv.org/abs/2009.04544
category: pinn_family
parent: pinn
motivation: 引入软注意力自动调整损失权重
```

#### 📝 一句话总结

SA-PINN 把每个初值点、边界点和 PDE 残差点的损失权重变成可训练变量，并通过“网络参数最小化、注意力权重最大化”的鞍点优化，让模型自动关注难拟合区域。它解决了标准 PINN 在 stiff PDE、尖锐时空过渡和损失项不平衡时容易忽视局部高误差点的问题。

#### 🎯 核心要点

- **逐点软注意力权重**：不是给整个 residual loss 一个标量权重，而是给每个训练点分配单独的非负 self-adaptive weight。
- **最小-最大训练目标**：网络参数 \(\theta\) 通过梯度下降减小误差，权重 \(\lambda\) 通过梯度上升增大高误差点的惩罚，形成 saddle-point 优化。
- **单调 mask 函数**：用非负、可微、严格递增的 \(m(\lambda)\) 作为软注意力 mask，保证误差越大的点越容易获得更高权重。
- **无需手工指定困难区域**：模型通过反向传播自行发现初值、边界或残差中的 stubborn spots，替代硬编码的区域加权。
- **可扩展到 SGD**：论文提出用 Gaussian Process regression 拟合连续自适应权重图，使 mini-batch 训练时也能给新采样点分配注意力权重。
- **NTK 解释**：自适应权重会改变 SA-PINN 的 empirical NTK，直观上可缓解不同损失项/训练点特征值尺度不均衡导致的训练失衡。

#### 🔬 深入细节

##### 来源与核心图示

论文公开版本为 `https://arxiv.org/abs/2009.04544`，arXiv HTML 页面提供可访问图像：`https://arxiv.org/html/2009.04544v5`。下图展示 self-adaptive mask 的形状；这些 mask 是非负、单调递增函数，用于把 trainable weight \(\lambda_i\) 转换为训练点损失的乘法注意力。

![SA-PINN 软注意力 mask 函数示意](https://ar5iv.labs.arxiv.org/html/2009.04544/assets/figs/mask_function-0.png)
*图：SA-PINN 使用单调递增 mask \(m(\lambda)\) 把可训练权重映射到每个训练点的损失系数。*

![SA-PINN 在 Allen-Cahn 方程中学到的权重分布](https://ar5iv.labs.arxiv.org/html/2009.04544/assets/figs/weight_plots.png)
*图：较亮/较大的点表示更高自适应权重，模型会把注意力集中到解的尖锐过渡和高误差区域。*

##### 算法伪代码

```python
# SA-PINN 训练伪代码
# 输入: 初值点 T0, 边界点 Tb, 残差点 Tr, PDE residual f_theta
theta = initialize_network()
lambda_0 = initialize_positive_weights(T0)
lambda_b = initialize_positive_weights(Tb)
lambda_r = initialize_positive_weights(Tr)

for step in range(num_steps):
    u0_error = u_theta(T0.x, T0.t, theta) - T0.u
    ub_error = boundary_error(u_theta, Tb, theta)
    r_error = pde_residual(u_theta, Tr, theta)

    loss_0 = mean(mask(lambda_0) * abs(u0_error) ** 2)
    loss_b = mean(mask(lambda_b) * abs(ub_error) ** 2)
    loss_r = mean(mask(lambda_r) * abs(r_error) ** 2)
    loss = loss_0 + loss_b + loss_r

    # 网络参数: 梯度下降，降低带权误差
    theta = theta - eta_theta * grad(loss, theta)

    # 自适应权重: 梯度上升，提高高误差点的惩罚
    lambda_0 = lambda_0 + eta_0 * grad(loss, lambda_0)
    lambda_b = lambda_b + eta_b * grad(loss, lambda_b)
    lambda_r = lambda_r + eta_r * grad(loss, lambda_r)

    lambda_0, lambda_b, lambda_r = project_or_parameterize_nonnegative(
        lambda_0, lambda_b, lambda_r
    )
```

##### 方法机制解释

标准连续时间 PINN 通常把 PDE、初值和边界条件写成联合损失：

$$
\mathcal{L}_{PINN}(\theta)
=\mathcal{L}_r(\theta)+\mathcal{L}_b(\theta)+\mathcal{L}_0(\theta),
$$

$$
\mathcal{L}_r
=\frac{1}{N_r}\sum_{i=1}^{N_r}
\left|f_\theta(\mathbf{x}_r^{(i)},t_r^{(i)})\right|^2,\quad
\mathcal{L}_0
=\frac{1}{N_0}\sum_{i=1}^{N_0}
\left|u_\theta(\mathbf{x}_0^{(i)},0)-u_0^{(i)}\right|^2.
$$

这种写法假设同一损失项内的所有点同等重要，也常常只用少量全局超参数平衡 residual、boundary、initial 三类损失。对 Allen-Cahn、wave、advection 等含尖锐时空变化的问题，高误差点可能只占训练集的一小部分；平均损失会把这些 stubborn spots 淹没，导致网络优先拟合大面积平滑区域。

SA-PINN 的改动是把每个训练点的损失系数变成可训练变量。令 \(\lambda_r,\lambda_b,\lambda_0\) 分别表示残差点、边界点和初值点的自适应权重，并用单调递增 mask \(m(\lambda)\) 保证权重非负，则损失可写作：

$$
\mathcal{L}(\theta,\lambda_r,\lambda_b,\lambda_0)
=\mathcal{L}_r^{SA}+\mathcal{L}_b^{SA}+\mathcal{L}_0^{SA},
$$

$$
\mathcal{L}_r^{SA}
=\frac{1}{N_r}\sum_{i=1}^{N_r}
m(\lambda_r^{(i)})
\left|f_\theta(\mathbf{x}_r^{(i)},t_r^{(i)})\right|^2,
$$

$$
\mathcal{L}_b^{SA}
=\frac{1}{N_b}\sum_{i=1}^{N_b}
m(\lambda_b^{(i)})
\left|\mathcal{B}[u_\theta](\mathbf{x}_b^{(i)},t_b^{(i)})-g_b^{(i)}\right|^2,
$$

$$
\mathcal{L}_0^{SA}
=\frac{1}{N_0}\sum_{i=1}^{N_0}
m(\lambda_0^{(i)})
\left|u_\theta(\mathbf{x}_0^{(i)},0)-u_0^{(i)}\right|^2.
$$

训练目标不是同时最小化所有变量，而是寻找鞍点：

$$
\min_{\theta}\max_{\lambda_r,\lambda_b,\lambda_0}
\mathcal{L}(\theta,\lambda_r,\lambda_b,\lambda_0).
$$

对应更新为：

$$
\theta^{k+1}=\theta^k-\eta_\theta\nabla_\theta \mathcal{L},
$$

$$
\lambda_r^{k+1}=\lambda_r^k+\eta_r\nabla_{\lambda_r}\mathcal{L},\qquad
\lambda_b^{k+1}=\lambda_b^k+\eta_b\nabla_{\lambda_b}\mathcal{L},\qquad
\lambda_0^{k+1}=\lambda_0^k+\eta_0\nabla_{\lambda_0}\mathcal{L}.
$$

为什么梯度上升会自动关注困难点？以 residual 点为例：

$$
\frac{\partial \mathcal{L}_r^{SA}}{\partial \lambda_r^{(i)}}
=\frac{1}{N_r}m'(\lambda_r^{(i)})
\left|f_\theta(\mathbf{x}_r^{(i)},t_r^{(i)})\right|^2.
$$

由于 \(m'(\lambda)\ge 0\)，误差越大的点给 \(\lambda_i\) 的上升梯度越大；而 \(\lambda_i\) 上升后，下一轮该点的损失权重 \(m(\lambda_i)\) 更大，迫使网络参数更新时更重视该点。这就是“软注意力”的含义：它不是离散选择一个区域，而是连续地放大难点的惩罚。

> 💡 关键：SA-PINN 的自适应发生在训练点粒度，而不是损失项粒度。传统加权可能只把 \(\mathcal{L}_r\) 整体乘以一个标量；SA-PINN 可以在同一个 residual loss 内区分平滑区域和尖锐过渡区域。

论文还把这种训练解释为带可训练 penalty coefficient 的 PDE-constrained optimization。若某个点违反初值、边界或 PDE 约束，它的 penalty 会单调增大；当网络把该点误差压低后，权重继续增大带来的梯度会减弱，因为误差平方项已经变小。这样形成一个动态过程：权重不断寻找当前最难满足的约束，网络不断补偿这些约束。

为了使用 mini-batch SGD，SA-PINN 还提出连续自适应权重图。离散训练点上的 \(\lambda_i\) 可通过 Gaussian Process regression 插值到整个时空域，得到 \(\lambda(\mathbf{x},t)\)。当下一批采样点变化时，模型可以从 GP 权重图预测这些新点的 self-adaptive weight，而不必为每个可能采样点维护固定参数。这对大规模 PDE 或需要随机采样的训练尤其重要。

NTK 分析提供了另一种直觉。标准 PINN 的不同损失项可能对应尺度差异很大的 NTK 特征值，导致某些约束训练很慢；逐点 self-adaptive weights 会非线性改变 empirical NTK 中各点的贡献，论文观察到其能使不同损失项的特征值尺度更匹配。实际理解时，可以把 SA-PINN 看作一种由误差驱动的、细粒度的动态损失预条件器。

#### 🧪 练习题

```yaml
question: "SA-PINN 中自适应权重为什么要对 \\(\\lambda\\) 做梯度上升？"
options:
  - "为了减少网络参数数量"
  - "为了让高误差训练点的权重增大，迫使网络优先修正难点"
  - "为了取消边界条件损失"
  - "为了把自动微分替换成有限差分"
answer: 1
explain: "SA-PINN 对网络参数做梯度下降、对逐点权重做梯度上升。由于权重梯度与该点误差平方成正比，高误差点会获得更大惩罚，形成软注意力。"
```
