### gPINN — 梯度增强物理信息神经网络 (Gradient-enhanced PINNs)

```yaml
id: gpinn
name: gPINN
full_name: 梯度增强物理信息神经网络 (Gradient-enhanced PINNs)
year: '2022'
org: 宾夕法尼亚大学
paper_url: https://arxiv.org/abs/2111.02801
category: pinn_family
parent: pinn
motivation: 加入PDE残差梯度提升稀疏数据精度
```

#### 📝 一句话总结

gPINN 在标准 PINN 的 PDE 残差损失之外，额外惩罚残差对输入坐标的梯度，使网络不仅在配点处满足方程，也让残差场在局部邻域内更平滑地接近零。它主要解决标准 PINN 在训练点稀疏、解存在陡峭梯度或反问题参数敏感时精度不足的问题。

#### 🎯 核心要点

- **残差梯度增强**：对 PDE residual \(f(\mathbf{x})\) 加入 \(\partial f/\partial x_i\) 的平方损失，使 \(\nabla f(\mathbf{x})\) 也趋近于零。
- **不需要额外标签**：梯度项完全由 PDE residual 和自动微分产生，不要求观测解的梯度数据。
- **正反问题统一**：未知 PDE 参数 \(\lambda\) 可与网络参数 \(\theta\) 一起优化，残差梯度同样参与参数辨识。
- **训练点更“密集”**：每个 collocation point 同时约束 residual 值和 residual 局部变化率，相当于提升物理约束的信息密度。
- **可与 RAR 结合**：论文把 gPINN 与 residual-based adaptive refinement 组合，在残差最大的候选区域不断加入配点，适合 shock-like 或过渡层问题。
- **代价是高阶自动微分**：若 PDE 已包含高阶导数，\(\partial f/\partial x_i\) 会引入更高阶导数，训练时间和显存开销上升。

#### 🔬 深入细节

##### 来源与核心图示

论文公开版本为 `https://arxiv.org/abs/2111.02801`，ar5iv 渲染页面提供了可访问图像。原文没有单独的架构总览图，下面用论文实验图展示 gPINN 的核心效果：残差梯度项能同时改善解、导数和 residual 的误差；与 RAR 结合时能把训练点集中到陡峭区域。

![gPINN 在 Poisson 方程中的精度对比](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.2.1.png)
*图：一维 Poisson 方程中，gPINN 在标准 residual 之外加入 residual gradient 约束，比较不同权重下 \(u\)、\(u'\) 和 residual 的误差。*

![gPINN with RAR 的自适应加点](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.4.1.2.png)
*图：gPINN 与 RAR 结合，在 Burgers 方程陡峭区域附近持续加入高残差点。*

##### 算法伪代码

```python
# gPINN + RAR 训练伪代码
# 输入: PDE residual f[u_theta](x), 边界/初值/观测点, 初始 residual points
u_theta = NeuralSurrogate()
Tf = initial_collocation_points()
Tb = boundary_or_initial_points()
Ti = observation_points_if_inverse_problem()

for rar_round in range(max_rar_rounds):
    for step in range(train_steps):
        f = pde_residual(u_theta, Tf)          # f(x; u, du, d2u, ..., lambda)
        loss_f = mean(abs(f) ** 2)
        loss_b = boundary_loss(u_theta, Tb)
        loss_i = data_loss(u_theta, Ti)        # 反问题或有观测数据时使用

        loss_g = 0.0
        for coord in coordinates:              # x, y, t, ...
            df_dcoord = auto_diff(f, coord)
            loss_g += w_g[coord] * mean(abs(df_dcoord) ** 2)

        loss = w_f * loss_f + w_b * loss_b + w_i * loss_i + loss_g
        theta, lambda_ = optimizer_step(loss, theta, lambda_)

    candidates = sample_many_points(domain)
    candidate_residual = abs(pde_residual(u_theta, candidates))
    Tf.add(top_m_points(candidates, candidate_residual))
    if mean(candidate_residual) < tolerance:
        break
```

##### 方法机制解释

标准 PINN 从一个一般 PDE residual 出发：

$$
f\left(\mathbf{x};
\frac{\partial u}{\partial x_1},\ldots,
\frac{\partial^2 u}{\partial x_i\partial x_j},\ldots;
\boldsymbol{\lambda}\right)=0,\qquad \mathbf{x}\in\Omega.
$$

用神经网络 \(\hat{u}(\mathbf{x};\theta)\) 近似解，并用自动微分计算 \(f\)。基础 PINN 损失通常写为：

$$
\mathcal{L}_{PINN}
=w_f\mathcal{L}_f+w_b\mathcal{L}_b+w_i\mathcal{L}_i,
$$

其中

$$
\mathcal{L}_f(\theta;\mathcal{T}_f)
=\frac{1}{|\mathcal{T}_f|}
\sum_{\mathbf{x}\in\mathcal{T}_f}
\left|
f\left(\mathbf{x};\hat{u},\partial\hat{u},\ldots;\boldsymbol{\lambda}\right)
\right|^2.
$$

\(\mathcal{L}_b\) 约束边界/初值条件，\(\mathcal{L}_i\) 用于反问题中的观测数据。标准 PINN 的弱点在于：它只在有限配点上压低 \(f\)，两个配点之间的 residual 可能剧烈变化，特别是在解存在陡峭梯度、边界层或 shock-like 结构时，均匀采样很容易漏掉困难区域。

gPINN 的核心观察很直接：如果 PDE residual 在整个区域内应为零，那么它对任意输入方向的导数也应为零：

$$
\nabla f(\mathbf{x})
=\left(
\frac{\partial f}{\partial x_1},
\frac{\partial f}{\partial x_2},
\ldots,
\frac{\partial f}{\partial x_d}
\right)=\mathbf{0}.
$$

因此总损失扩展为：

$$
\mathcal{L}_{gPINN}
=w_f\mathcal{L}_f+w_b\mathcal{L}_b+w_i\mathcal{L}_i
+\sum_{j=1}^{d}w_{g_j}\mathcal{L}_{g_j},
$$

$$
\mathcal{L}_{g_j}(\theta;\mathcal{T}_{g_j})
=\frac{1}{|\mathcal{T}_{g_j}|}
\sum_{\mathbf{x}\in\mathcal{T}_{g_j}}
\left|\frac{\partial f}{\partial x_j}(\mathbf{x})\right|^2.
$$

这个设计的直觉是：普通 PINN 让 residual 的“高度”在采样点接近 0，而 gPINN 还让 residual 的“斜率”接近 0。于是一个配点不再只是一个孤立约束，而是对其局部邻域也产生平滑约束，从而在稀疏数据条件下减少 residual 场的隐藏振荡。

以一维 Poisson 方程为例，如果 residual 为

$$
f(x)=\frac{d^2\hat{u}}{dx^2}-s(x),
$$

那么 gPINN 额外约束

$$
\frac{df}{dx}
=\frac{d^3\hat{u}}{dx^3}-\frac{ds}{dx},
\qquad
\mathcal{L}_{g}
=w_g\frac{1}{|\mathcal{T}_g|}
\sum_{x\in\mathcal{T}_g}\left|
\frac{d^3\hat{u}}{dx^3}-\frac{ds}{dx}
\right|^2.
$$

这说明 gPINN 的精度提升并非免费：若 PDE residual 已经包含二阶导数，梯度增强会要求三阶自动微分；二维或三维问题还要对每个坐标方向分别求导，计算图更深、显存压力更大。

> ⚠️ 注意：gPINN 的“梯度增强”通常监督的是 PDE residual 的梯度，不是直接监督真实解的梯度。除非问题本身有梯度观测数据，否则它不额外引入人工标签。

论文还强调 gPINN 与 RAR 的互补性。RAR 先在当前配点上训练模型，再在大量候选点上评估 residual，把 residual 最大的点加入训练集；gPINN 则让每个点的物理约束更强。两者结合时，RAR 负责把点放到困难区域，gPINN 负责在这些点周围压低 residual 变化率，因此对 Burgers、Allen-Cahn 等有陡峭过渡的 PDE 更有效。

权重 \(w_{g_j}\) 是新增超参数。若权重太小，梯度项贡献有限；若过大，优化器可能过度追求 residual 平滑而牺牲边界/数据项或基础 residual 项。实际使用中通常从与 \(w_f\) 同量级或更小的权重开始，并结合验证误差、边界误差和 residual 分布调参。

#### 🧪 练习题

```yaml
question: "gPINN 相比标准 PINN 的核心新增损失是什么？"
options:
  - "只增加更多边界条件采样点"
  - "加入 PDE residual 对输入坐标的梯度损失，使 \\(\\partial f/\\partial x_j\\) 也趋近于零"
  - "把 PDE residual 替换为纯数据监督误差"
  - "用卷积层代替自动微分"
answer: 1
explain: "gPINN 的主要贡献是把 residual gradient 嵌入损失函数；如果 residual 在整个区域为零，它的空间/时间梯度也应为零。"
```
