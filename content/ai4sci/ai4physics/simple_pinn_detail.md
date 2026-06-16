### SIMPLE-PINN — SIMPLE算法PINN (SIMPLE-PINN)

```yaml
id: simple_pinn
name: SIMPLE-PINN
full_name: SIMPLE算法PINN (SIMPLE-PINN)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2603.24013
category: fluid_simulation
parent: pinn
motivation: SIMPLE算法与PINN融合求解NS方程
```

#### 📝 一句话总结

SIMPLE-PINN 将经典 SIMPLE 压力-速度耦合思想改写为 PINN 可优化的速度修正损失和压力修正损失，解决高 Reynolds 数不可压 Navier-Stokes PINN 中连续性约束弱、训练不稳定和收敛慢的问题。

#### 🎯 核心要点

- **SIMPLE 启发的修正损失**：在标准 PDE/IC/BC loss 外加入 pressure correction 与 velocity correction loss，显式强化 \(u,v,p\) 的耦合
- **从残差推导修正项**：修正项由动量残差和连续性残差推导，而不是经验正则项，目标是让训练更新方向更接近守恒方程的压力校正过程
- **Taylor 展开降复杂度**：用 Taylor expansion 处理邻点依赖，避免把完整 SIMPLE stencil 直接嵌入神经网络造成过高计算开销
- **二阶外推处理未来迭代量**：用二阶 extrapolation 估计不可直接获得的下一迭代变量，使压力/速度修正可写成当前训练步骤的 loss
- **混合 ND-AD 残差计算**：规则内部点用简化 FVM/数值差分残差，复杂几何近壁点用自动微分，避免 stencil 点落入固体区域
- **网络结构朴素但约束增强**：主干使用 MLP，输入坐标经 frequency annealing mapping，输出 \(u,v,p\)，Rayleigh-Taylor 案例额外输出温度
- **验证范围覆盖复杂流动**：包括高 Re lid-driven cavity、wavy channel、NACA0012、三方柱绕流、圆柱长时间涡脱落和 Rayleigh-Taylor 多物理问题

#### 🔬 深入细节

##### 核心示意图与来源

论文 arXiv 页面为 https://arxiv.org/abs/2603.24013，HTML 版本为 https://arxiv.org/html/2603.24013v1。下图来自论文 Figure 1，展示了 SIMPLE-PINN 的整体框架和三个代表性应用。

![SIMPLE-PINN framework](https://arxiv.org/html/2603.24013v1/pictures/fig1.png)
*图：SIMPLE-PINN 在标准 PINN 的 IC/BC/PDE loss 之外加入 SIMPLE-inspired correction loss，包括 velocity correction loss 与 pressure correction loss。*

![SIMPLE-PINN control volume](https://arxiv.org/html/2603.24013v1/pictures/control_volume.png)
*图：论文用于推导修正项的二维控制体。中心点 \(P\)、面点 \(e,w,n,s\) 与邻接控制体共同定义简化 FVM stencil。*

![SIMPLE-PINN hybrid FVM-AD strategy](https://arxiv.org/html/2603.24013v1/pictures/FVM_AD.png)
*图：复杂几何中的混合策略。普通流体内部点用 FVM/ND 计算残差；靠近固体边界、stencil 可能越界的点切换到 AD。*

##### 算法伪代码

```python
# SIMPLE-PINN training loop, simplified from the paper mechanism
history = RingBuffer(size=3)  # store previous network predictions for extrapolation

for step in range(num_steps):
    xyt_int, xyt_bc, xyt_ic = sample_collocation_points()
    u, v, p = model(frequency_annealed_features(xyt_int))

    # Standard incompressible Navier-Stokes residuals
    if point_has_valid_fvm_stencil(xyt_int):
        r_c, r_u, r_v = finite_volume_residuals(u, v, p, xyt_int)
    else:
        r_c, r_u, r_v = autodiff_ns_residuals(model, xyt_int)

    loss_pde = mean(r_c**2 + r_u**2 + r_v**2)
    loss_bc = boundary_loss(model, xyt_bc)
    loss_ic = initial_loss(model, xyt_ic)

    # SIMPLE-inspired correction operators derived from continuity and momentum residuals
    dp_corr = pressure_correction_from_residuals(r_c, r_u, r_v)
    du_corr, dv_corr = velocity_correction_from_pressure(dp_corr)

    # Future iteration values are not available in NN training, so use second-order extrapolation
    u_next_hat, v_next_hat, p_next_hat = second_order_extrapolate(history, current=(u, v, p))

    loss_pc = mean((p_next_hat - (p + alpha_p * dp_corr))**2)
    loss_uc = mean((u_next_hat - (u + alpha_u * du_corr))**2)
    loss_vc = mean((v_next_hat - (v + alpha_v * dv_corr))**2)

    loss = (
        w_pde * loss_pde
        + w_bc * loss_bc
        + w_ic * loss_ic
        + w_pc * loss_pc
        + w_uc * loss_uc
        + w_vc * loss_vc
    )
    optimizer.step(loss)
    history.push(detach(u, v, p))
```

##### 标准 PINN 部分

SIMPLE-PINN 仍然以不可压 Navier-Stokes 方程为基础。对二维非定常问题，网络输出

$$
(u_\theta, v_\theta, p_\theta)=f_\theta(x,y,t).
$$

标准 PDE residual 可写为：

$$
r_c
=
\frac{\partial u_\theta}{\partial x}
+
\frac{\partial v_\theta}{\partial y},
$$

$$
r_u
=
\frac{\partial u_\theta}{\partial t}
+
u_\theta\frac{\partial u_\theta}{\partial x}
+
v_\theta\frac{\partial u_\theta}{\partial y}
+
\frac{\partial p_\theta}{\partial x}
-
\frac{1}{Re}
\left(
\frac{\partial^2 u_\theta}{\partial x^2}
+
\frac{\partial^2 u_\theta}{\partial y^2}
\right),
$$

$$
r_v
=
\frac{\partial v_\theta}{\partial t}
+
u_\theta\frac{\partial v_\theta}{\partial x}
+
v_\theta\frac{\partial v_\theta}{\partial y}
+
\frac{\partial p_\theta}{\partial y}
-
\frac{1}{Re}
\left(
\frac{\partial^2 v_\theta}{\partial x^2}
+
\frac{\partial^2 v_\theta}{\partial y^2}
\right).
$$

普通 PINN 的损失通常是：

$$
\mathcal{L}_{\mathrm{PINN}}
=
\lambda_f
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left(
|r_c^{(i)}|^2+|r_u^{(i)}|^2+|r_v^{(i)}|^2
\right)
+
\lambda_{bc}\mathcal{L}_{bc}
+
\lambda_{ic}\mathcal{L}_{ic}.
$$

问题在于，连续性 residual \(r_c\) 只在采样点上被惩罚，高 Re 下动量方程的非线性使优化地形很硬，网络可能得到局部看似残差较小、但压力和速度耦合不物理的解。SIMPLE-PINN 的核心就是把传统 CFD 中用于不可压流的压力-速度 correction 过程变成额外 loss，持续把 \(u,v,p\) 推向耦合一致。

##### SIMPLE 修正项如何进入 PINN

在经典 SIMPLE 算法中，先由当前压力估计求解动量方程得到中间速度，再由连续性方程推导压力修正 \(p'\)，最后更新压力和速度：

$$
p^{k+1}=p^{k}+\alpha_p p',
\qquad
u^{k+1}=u^{k}+\alpha_u u',
\qquad
v^{k+1}=v^{k}+\alpha_v v'.
$$

其中 \(\alpha_p,\alpha_u,\alpha_v\) 是 relaxation factors。压力修正的离散方程可以抽象写成：

$$
\mathcal{A}_p p'
=
\mathcal{B}
\left(
r_c,r_u,r_v
\right),
$$

速度修正则由压力修正梯度和动量残差信息给出：

$$
u'\approx -d_u\frac{\partial p'}{\partial x}+\Phi_u(r_u),
\qquad
v'\approx -d_v\frac{\partial p'}{\partial y}+\Phi_v(r_v).
$$

论文的推导从简化 FVM 控制体出发，先写出离散动量与连续性残差，再通过 Taylor 展开把邻点依赖整理为可在 PINN 中高效计算的 correction terms。这样避免了两个直接嵌入 SIMPLE 的难点：一是完整 stencil 会让每个采样点依赖大量邻点，计算复杂；二是 \(k+1\) 迭代的真实网络输出在当前优化步不可用。

因此 SIMPLE-PINN 把修正过程改写成 residual correction loss。用 \(\operatorname{Ext}_2[\cdot]\) 表示由历史预测得到的二阶外推，则可将三类修正损失写成概念形式：

$$
\mathcal{L}_{pc}
=
\frac{1}{N_f}
\sum_i
\left\|
\operatorname{Ext}_2[p_\theta]^{(i)}
-
\left(
p_\theta^{(i)}
+
\alpha_p C_p(r_c^{(i)},r_u^{(i)},r_v^{(i)})
\right)
\right\|^2,
$$

$$
\mathcal{L}_{uc}
=
\frac{1}{N_f}
\sum_i
\left\|
\operatorname{Ext}_2[u_\theta]^{(i)}
-
\left(
u_\theta^{(i)}
+
\alpha_u C_u(r_u^{(i)}, C_p^{(i)})
\right)
\right\|^2,
$$

$$
\mathcal{L}_{vc}
=
\frac{1}{N_f}
\sum_i
\left\|
\operatorname{Ext}_2[v_\theta]^{(i)}
-
\left(
v_\theta^{(i)}
+
\alpha_v C_v(r_v^{(i)}, C_p^{(i)})
\right)
\right\|^2.
$$

最终优化目标为：

$$
\mathcal{L}_{\mathrm{SIMPLE\text{-}PINN}}
=
\mathcal{L}_{\mathrm{PINN}}
+
\lambda_{pc}\mathcal{L}_{pc}
+
\lambda_{uc}\mathcal{L}_{uc}
+
\lambda_{vc}\mathcal{L}_{vc}.
$$

> 💡 关键：这些 correction loss 不是额外拟合数据，而是把“压力应如何修正才能让速度场更满足连续性”这件事显式写入训练目标。它补强了普通 PINN 对 pressure-velocity coupling 的弱监督。

##### 混合 ND-AD 为什么重要

SIMPLE-PINN 不是简单把所有导数从 AD 换成数值差分。论文内部点使用简化 FVM/ND，是因为控制体形式更贴近守恒离散，对流体残差更稳定；但在 NACA0012、三方柱、波形通道等复杂几何附近，某个点的上下左右 stencil 可能落到固体内部，继续使用 FVM stencil 会产生无效残差。为此论文把点分为普通流体点、近壁点和边界点：普通点用 FVM/ND，近壁点用 AD，边界点施加软边界条件。

这种设计保留了 PINN 的几何灵活性，又借用了 CFD 离散的稳定性。对于高 Re 流动，压力场往往比速度更难训；SIMPLE-PINN 的压力修正 loss 会把连续性误差和动量误差传递到压力更新方向中，因此论文报告在 lid-driven cavity 的高 Re 场景中，压力误差和收敛速度都明显受益。

与标准 PINN 相比，SIMPLE-PINN 的主要差别可以概括为：标准 PINN 只问“当前预测是否满足 PDE residual”，而 SIMPLE-PINN 进一步问“如果按 SIMPLE 的耦合逻辑修正，下一步压力和速度应该朝哪里走”。后者为优化器提供了更结构化的训练信号，尤其适合不可压流中压力没有独立演化方程、只能通过连续性和动量耦合确定的场景。

#### 🧪 练习题

```yaml
question: "SIMPLE-PINN 中新增 pressure/velocity correction loss 的主要目的是什么？"
options:
  - "用监督数据直接替代 Navier-Stokes 方程"
  - "显式强化不可压流中的压力-速度耦合，使训练更新更符合 SIMPLE 修正逻辑"
  - "把 MLP 替换成图神经网络以处理任意网格"
  - "完全避免计算 PDE residual"
answer: 1
explain: "SIMPLE-PINN 的 correction loss 来自连续性和动量残差推导，目标是补强普通 PINN 对压力-速度耦合的约束，而不是取消 PDE residual。"
```
