### MOTO — 隐式MPM拓扑优化 (Topology Optimization via Implicit MPM)

```yaml
id: moto
name: MOTO
full_name: 隐式MPM拓扑优化 (Topology Optimization via Implicit MPM)
year: '2026'
org: Wisconsin
paper_url: https://arxiv.org/abs/2603.14596
category: diff_sim
parent: jax_mpm
motivation: 端到端可微分隐式MPM拓扑优化
```

#### 📝 一句话总结

MOTO 提出了一套端到端可微的隐式 GIMP-MPM 拓扑优化框架，用固定背景网格求解大变形超弹性结构响应，并把材料分布随拉格朗日粒子携带，从而绕开 FEM 拓扑优化在大旋转、网格畸变和单元翻转下的收敛问题。

#### 🎯 核心要点

- **MPM 替代 FEM 分析器**：结构由材料点携带质量、体积、应力、形变梯度和设计变量，背景欧拉网格只用于组装并求解准静态力平衡
- **隐式大变形求解**：每个载荷步用 Newton-Raphson 解非线性残差 \(\mathbf{R}(\mathbf{u})=\mathbf{0}\)，切线刚度由 JAX 自动微分获得
- **单材料 TO**：每个材料点有伪密度 \(\gamma_p\in[0,1]\)，通过 SIMP 将伪密度映射到 Hencky 超弹性模型的 Lamé 参数
- **多材料 TO**：用坐标 MLP 表示体积分数场 \(\mathbf{v}(\mathbf{x};\mathbf{w})\)，Fourier projection 缓解谱偏置，Softmax 保证各材料体积分数非负且和为 1
- **端到端敏感度**：目标函数、约束、隐式 MPM 求解器和神经材料场都在 JAX 中可微，Newton 求解的梯度通过隐函数定理避免反向展开全部迭代
- **内存控制**：增量载荷的大变形历史用 checkpointing 处理，反向传播时按需重算中间状态
- **目标覆盖**：既支持最小柔顺度的承载结构设计，也支持软体夹爪等 compliant mechanism 的运动传递目标

#### 🔬 深入细节

##### 核心示意图

![MOTO 的 GIMP-MPM 粒子-网格耦合流程](https://arxiv.org/html/2603.14596v1/x4.png)
*图：GIMP-MPM 的初始化、粒子影响域、P2G、网格求解、G2P 和材料点更新流程。来源为 arXiv:2603.14596 的 HTML 渲染图。论文源码还提供 `network.pdf`，展示多材料坐标网络结构。*

##### 算法伪代码

```python
# MOTO: differentiable implicit MPM topology optimization
initialize_grid(Omega)
initialize_material_points(Omega_D)

if single_material:
    design = particle_density_gamma          # gamma_p in [0, 1]
else:
    design = coordinate_network_weights_w    # v(x; w) via Fourier features + MLP + softmax

for opt_iter in range(max_iter):
    # 1. design -> material
    for particle p:
        if single_material:
            lambda_p = gamma_p**q * lambda_0
            mu_p = gamma_p**q * mu_0
            rho_p = gamma_p * rho_0
        else:
            v_p = neural_volume_fraction(x_p, w)
            lambda_p = sum((v_p[s]**q) * lambda_s[s] for s in materials)
            mu_p = sum((v_p[s]**q) * mu_s[s] for s in materials)
            rho_p = sum(v_p[s] * rho_s[s] for s in materials)

    # 2. incremental implicit MPM forward solve
    for load_step in load_schedule:
        reset_grid_quantities()
        p2g_assemble_internal_external_forces()
        u = newton_solve(lambda u: residual_R(u, particles, grid))
        g2p_transfer_displacement(u)
        update_particle_state(F, stress, volume, position)

    # 3. objective, constraints, gradients
    J = compliance(u, f_ext) or compliant_mechanism_ratio(u, v)
    g = volume_constraint(gamma) or mass_constraint(v_p)
    grad = autodiff_with_implicit_function_theorem(J, g, design)

    # 4. optimizer update and continuation
    design = MMA_or_OC_update(gamma, grad) if single_material else adam_update(w, grad)
    q = increase_simp_penalty(q)
```

##### 方法机制

MOTO 处理的问题是“拓扑优化 + 大变形 + 非线性材料”。传统 FEM-TO 把设计变量绑在会随材料一起变形的单元上；一旦结构发生大转角或局部折叠，网格可能畸变、缠结甚至翻转，导致前向求解器不收敛，后向敏感度也失效。MPM 的关键替换是：物理状态跟随材料点移动，力平衡在固定背景网格上解，因此网格不会被永久拉坏；每个时间/载荷步结束后网格量重置，材料点保留应力、形变梯度、体积和位置。

前向力平衡采用准静态残差：

$$
\mathbf{R}(\mathbf{u})=\mathbf{f}^{\mathrm{int}}(\mathbf{u})-\mathbf{f}^{\mathrm{ext}}=\mathbf{0}.
$$

材料点到网格的内力贡献由应力和 GIMP 形函数梯度组装：

$$
\mathbf{f}^{\mathrm{int}}_{v,p}=V_p(\nabla_x S^{vp})^\top\boldsymbol{\sigma}_p,
$$

外力则用同一套形函数从粒子映射到网格：

$$
\mathbf{f}^{\mathrm{ext}}_{v,p}=S^{vp}m_p\mathbf{b}_p+S^{vp}\mathbf{f}^{\mathrm{ext}}_p.
$$

由于大变形超弹性使残差高度非线性，MOTO 在每个载荷步使用 Newton-Raphson：

$$
\mathbf{K}^{(k)}\delta\mathbf{u}^{(k)}=-\mathbf{R}(\mathbf{u}^{(k)}),
\qquad
\mathbf{K}^{(k)}=\left.\frac{\partial\mathbf{R}}{\partial\mathbf{u}}\right|_{\mathbf{u}^{(k)}}.
$$

论文没有手推复杂的有限应变 GIMP 切线刚度，而是在 JAX 中通过自动微分构造 \(\mathbf{K}\)。这也是“端到端可微”的基础：同一条计算图覆盖材料设计、MPM 求解和目标函数。

单材料版本把设计变量直接放到材料点上。SIMP 插值为：

$$
\lambda_p=\gamma_p^q\lambda_0,\qquad
\mu_p=\gamma_p^q\mu_0,\qquad
\rho_p=\gamma_p\rho_0.
$$

多材料版本改用坐标网络 \(\mathbf{v}(\mathbf{x};\mathbf{w})=[v_1,\ldots,v_S]\)，Softmax 保证 \(\sum_s v_s=1\)，材料属性为：

$$
\lambda_p=\sum_{s=1}^{S}v_{s,p}^{q}\lambda_s,\qquad
\mu_p=\sum_{s=1}^{S}v_{s,p}^{q}\mu_s,\qquad
\rho_p=\sum_{s=1}^{S}v_{s,p}\rho_s.
$$

这种设计把“设计分辨率”和“MPM 网格/粒子分辨率”解耦：优化的是神经场权重，最终可以在更高分辨率坐标上查询出更清晰的材料分布。

目标函数包括承载结构柔顺度：

$$
J_c=\mathbf{f}^{\mathrm{ext}\top}\mathbf{u}^*,
$$

以及 compliant mechanism 中的运动传递目标：

$$
J_m=-\frac{\mathrm{MSE}}{\mathrm{SE}_{in}+\mathrm{SE}_{out}}
=-\frac{\mathbf{f}^{\mathrm{ext}\top}_{in}\mathbf{v}^*}
{\mathbf{f}^{\mathrm{ext}\top}_{in}\mathbf{u}^*+\mathbf{f}^{\mathrm{ext}\top}_{out}\mathbf{v}^*}.
$$

反向传播的难点在于 Newton 迭代和增量载荷历史。若直接展开 \(K\) 次 Newton 迭代，梯度链会很长：

$$
\frac{d\mathbf{u}^{(K)}}{d\boldsymbol{\gamma}}
=
\frac{\partial\mathbf{u}^{(K)}}{\partial\mathbf{u}^{(K-1)}}\cdots
\frac{\partial\mathbf{u}^{(1)}}{\partial\mathbf{u}^{(0)}}
\frac{\partial\mathbf{u}^{(0)}}{\partial\boldsymbol{\gamma}}.
$$

MOTO 用隐函数定理在收敛点求导：

$$
\frac{d\mathbf{u}^{(K)}}{d\boldsymbol{\gamma}}
=-\mathbf{K}^{-1}\frac{\partial\mathbf{R}}{\partial\boldsymbol{\gamma}},
$$

这样只依赖最终收敛状态和切线刚度。对于 Hencky 超弹性，矩阵对数的导数还需要 Fréchet derivative；论文用 Loewner matrix，并在特征值接近时用极限 \(1/\Lambda_i\) 正则化，避免大旋转小拉伸下的数值奇异。

> 💡 关键：MOTO 的创新不只是“用 MPM 做 TO”，而是把隐式大变形 MPM、材料点设计变量/神经材料场、自动微分切线刚度、隐函数定理敏感度和拓扑优化器接成同一条可微流水线。

#### 🧪 练习题

```yaml
question: "MOTO 为什么要用隐函数定理处理 Newton-Raphson 求解器的梯度？"
options:
  - "为了避免反向传播展开全部 Newton 迭代历史，直接从收敛残差和切线刚度计算设计敏感度"
  - "为了把所有材料点固定在初始位置，避免 G2P 更新"
  - "为了让 SIMP 惩罚指数 q 始终等于 1"
  - "为了把多材料 Softmax 约束改写成无约束线性回归"
answer: 0
explain: "隐函数定理利用收敛条件 R(gamma,u*)=0，给出 du*/dgamma=-K^{-1} partial R/partial gamma，避免存储和反传全部 Newton 迭代。"
```
