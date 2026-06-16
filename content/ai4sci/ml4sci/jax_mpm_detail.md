### JAX-MPM — JAX物质点法 (JAX Material Point Method)

```yaml
id: jax_mpm
name: JAX-MPM
full_name: JAX物质点法 (JAX Material Point Method)
year: '2026'
org: 清华大学
paper_url: https://link.springer.com/article/10.1007/s00366-026-02320-6
category: diff_sim
parent: jax_md
motivation: 统一拉格朗日-欧拉数据同化GPU框架
```

#### 📝 一句话总结

JAX-MPM 用 JAX/XLA 实现可微 Material Point Method，把大变形、摩擦接触和非弹性材料仿真变成可反向传播的 GPU 求解器，解决了地质灾害与固体力学中高保真前向仿真和稀疏观测反演难以统一的问题。

#### 🎯 核心要点

- **JAX 原生可微 MPM**：P2G、网格更新、G2P、材料本构和观测层均以 JAX 函数组合实现，可用 `jax.grad` 反传整段时间轨迹
- **Hybrid Eulerian-Lagrangian 公式**：粒子携带质量、体积、速度、应力、密度和形变信息，背景网格负责动量方程、接触和力更新
- **统一数据同化层**：同时支持 Lagrangian particle observations 和 Eulerian region observations，将稀疏监测数据映射到可微损失
- **PDE 约束优化**：把初速度、空间变化摩擦系数、材料参数或神经场参数作为优化变量，通过仿真-观测误差反推
- **JIT/vmap/scan/remat 工程化**：利用 JIT 编译、向量化、`jax.scan` 循环和 `jax.checkpoint` 降低 Python 开销与反向传播内存占用
- **材料与场景覆盖**：支持弱可压 Newtonian fluid、Drucker-Prager elastoplastic granular material、摩擦接触和 2D/3D dam-break/granular collapse
- **大规模 GPU 性能**：论文报告 270 万粒子 3D granular cylinder collapse 的 1000 步单卡耗时约 22 秒（单精度）和 98 秒（双精度）

#### 🔬 深入细节

##### 核心架构示意

![JAX-MPM 反演框架示意](https://arxiv.org/html/2507.04192v2/figures/show.png)
*图：JAX-MPM 的 inverse modeling framework。神经网络或参数场给出未知空间参数，JAX-MPM 生成状态轨迹，观测算子抽取 Lagrangian/Eulerian 观测并计算损失，梯度通过整条仿真链路反传。来源为 arXiv:2507.04192v2 HTML。正式 DOI 页面为 https://link.springer.com/article/10.1007/s00366-026-02320-6，方法细节与图源可从 arXiv 预印本和项目仓库访问。*

##### 算法伪代码

```python
# JAX-MPM 可微时间步与反演伪代码
@jax.checkpoint
def mpm_substep(state, params):
    x_p, v_p, rho_p, stress_p, F_p = state

    base, fx, w, dw = precompute_bspline_weights(x_p)

    # P2G: 粒子质量、动量、内力投到背景网格
    grid_m, grid_v, grid_f = particle_to_grid(
        x_p, v_p, rho_p, stress_p, base, w, dw, params
    )

    # Grid update: 显式动量推进、边界条件、摩擦接触
    grid_v = grid_v + dt * grid_f / grid_m
    grid_v = apply_boundary_and_contact(grid_v, params.friction)

    # G2P: 网格速度/速度梯度插回粒子，更新位置、本构状态
    v_p_new, grad_v_p = grid_to_particle(grid_v, x_p, base, w, dw)
    x_p_new = x_p + dt * v_p_new
    F_p_new, stress_p_new, rho_p_new = constitutive_update(
        F_p, grad_v_p, rho_p, params.material
    )

    return (x_p_new, v_p_new, rho_p_new, stress_p_new, F_p_new)

def rollout(state0, params, num_steps):
    return jax.lax.scan(lambda s, _: (mpm_substep(s, params), s),
                        state0, None, length=num_steps)

def inverse_loss(theta, observations):
    params = decode_unknowns(theta)  # 初速度、摩擦系数场、神经本构等
    final_state, trajectory = rollout(state0(params), params, T)
    pred_obs = observation_layer(trajectory, observations.indices)
    return mse(pred_obs, observations.values)

theta = optimizer.minimize(jax.grad(inverse_loss), theta0)
```

##### 方法机制与关键公式

MPM 的优势是同时拥有 Lagrangian 和 Eulerian 两种视角：粒子随物质运动，适合大变形和历史变量；背景网格每步重置，适合求解动量方程并处理接触。JAX-MPM 的贡献不是重新发明 MPM，而是把这条求解链路实现成 JAX 可微函数，使科学计算、自动微分和神经网络训练在同一框架内运行。

连续动量方程可写为：

$$
\rho \frac{D v}{D t}=\nabla\cdot\sigma+\rho b,
$$

其弱式经粒子离散与网格 shape function \(N_i(x_p)\) 后得到节点力与质量：

$$
m_i=\sum_p m_p N_i(x_p),
\qquad
f_i^{\text{int}}=-\sum_p V_p\,\sigma_p\nabla N_i(x_p),
\qquad
f_i^{\text{ext}}=\sum_p m_p b_p N_i(x_p).
$$

显式时间积分下，节点速度更新为：

$$
v_i^{n+1}=v_i^n+\Delta t
\frac{f_i^{\text{int}}+f_i^{\text{ext}}}{m_i}.
$$

随后 G2P 将网格信息插回粒子：

$$
v_p^{n+1}=\sum_i N_i(x_p)v_i^{n+1},
\qquad
x_p^{n+1}=x_p^n+\Delta t\,v_p^{n+1},
\qquad
\nabla v_p^{n+1}=\sum_i v_i^{n+1}\otimes\nabla N_i(x_p).
$$

JAX-MPM 支持不同 transfer scheme。PIC 直接插值节点速度，数值耗散更强；FLIP 插值速度增量，保留粒子动量但可能更噪；APIC/TPIC 用仿射或张量动量项改善角动量和稳定性。论文的 2D/3D benchmark 使用这些 transfer scheme 验证 dam-break 与 granular collapse 的表现。

##### 数据同化与反向传播

JAX-MPM 把一次时间步表示为可微映射：

$$
S_{t+1}=\Phi(S_t;\theta)
=\mathrm{G2P}\circ\mathrm{GridUpdate}\circ\mathrm{P2G}(S_t;\theta),
$$

整段轨迹是：

$$
S_{1:T}=\Phi^T(S_0;\theta).
$$

给定观测 \(y_{l,t}\)，论文引入统一观测算子 \(\mathcal{O}_{l,t}\)。若观测追踪具体粒子，就是 Lagrangian supervision：

$$
\hat{y}_{l,t}=\mathcal{O}_{l,t}^{L}(S_t)=s_{p_l,t}.
$$

若观测来自固定空间区域，例如监测窗口内平均速度，就是 Eulerian supervision：

$$
\hat{y}_{l,t}=\mathcal{O}_{l,t}^{E}(S_t)
=\frac{1}{|\mathcal{P}_{l,t}|}\sum_{p\in\mathcal{P}_{l,t}} s_{p,t},
\qquad
\mathcal{P}_{l,t}=\{p:x_{p,t}\in\Omega_l\}.
$$

反演目标因此统一为：

$$
\min_{\theta}\ \mathcal{L}(\theta)
=\sum_{(l,t)\in\mathcal{D}}
\left\|\mathcal{O}_{l,t}(S_t(\theta))-y_{l,t}^{\text{obs}}\right\|_2^2
+\lambda\mathcal{R}(\theta),
\quad
\text{s.t. } S_{t+1}=\Phi(S_t;\theta).
$$

这里 \(\theta\) 可以是初速度常数、初速度场、分段摩擦系数，也可以是神经网络 \(\mathcal{N}_{\theta}(x)\) 输出的空间参数场。由于 \(\Phi\) 是 JAX 函数组合，反向传播由 reverse-mode autodiff 处理，无需手写传统 adjoint。

##### 工程实现与传统方法差异

JAX-MPM 的工程重点在于让可微仿真可扩展。P2G/G2P 会产生大量临时网格 buffer，如果反向传播保存所有中间值，长时间轨迹会迅速耗尽显存。论文用 `jax.checkpoint`/`jax.remat` 在反向时重算网格操作，只保留粒子级状态；再用 `jax.scan` 分段执行时间循环，使峰值内存从随总步数线性增长，降低到与 segment length 相关。

与 DiffTaichi 这类可微仿真框架相比，JAX-MPM 的优势是完全处在 JAX 生态中：JIT 编译减少 Python 循环开销，`vmap` 方便批量仿真，`pmap` 具备多设备扩展路径，Flax/Haiku/Equinox 等神经网络模块可以直接耦合。限制是 JAX 的纯函数式写法要求更严格的数据结构设计，粒子-网格 scatter/gather 也需要小心处理静态 shape、padding 和编译开销。

> 💡 关键：JAX-MPM 的“学习增强”不是用网络替代物理求解器，而是让 MPM 求解器本身成为可微层，神经网络和未知物理参数通过同一个 PDE 约束优化目标被训练。

#### 🧪 练习题

```yaml
question: "JAX-MPM 中统一 Lagrangian 和 Eulerian 观测层的主要作用是什么？"
options:
  - "把粒子追踪数据和固定空间区域监测数据都映射为可微损失，便于通过 MPM 轨迹反推未知参数"
  - "把所有粒子永久固定在 Eulerian 网格节点上，避免 G2P 操作"
  - "只用于加速前向渲染，与反演问题无关"
  - "替代本构模型，使应力不再需要计算"
answer: 0
explain: "JAX-MPM 的观测算子既能读取粒子状态，也能对固定区域内粒子求平均，从而让稀疏、多模态观测统一进入 PDE 约束优化并反传到初值、摩擦或材料参数。"
```
