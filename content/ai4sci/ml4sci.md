---
domain: ai4sci
topic_id: ml4sci
topic_name: 科学机器学习技术演进
page_icon: ⚛️
page_title: 科学机器学习技术演进
page_subtitle: '{build_date} 版'
page_desc: 从物理信息神经网络（PINN）到神经算子、可微分仿真与科学计算加速的技术发展脉络
hero_pills:
- 🏷️ PINN · Neural Operators · Differentiable Physics · AI4Science
count_pill: '{count} 个算法'
categories:
  pinn_family:
    label: 物理信息神经网络
    color: '#22a06b'
  operators:
    label: 神经算子
    color: '#5b63d3'
  diff_sim:
    label: 可微分仿真
    color: '#e8820c'
  acceleration:
    label: 科学计算加速
    color: '#d32f2f'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ml4sci/overview/zhihu__ML如何做科学发现？牛津大学268页博士论文详述科学机器学习内涵__14e88076/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ml4sci/latest/zhihu__从底层生态到可微分大涡模拟：近几年可微分_CFD_求解器的_AI4Science_学术探索__6b7b4988/article.md

## 算法演化关系

```yaml
nodes:
- id: pinn
  x: 100
  y: 150
  category: pinn_family
- id: hp_vpinns
  x: 250
  y: 120
  category: pinn_family
- id: cpinn
  x: 200
  y: 150
  category: pinn_family
- id: xpinns
  x: 300
  y: 150
  category: pinn_family
- id: gpinn
  x: 350
  y: 120
  category: pinn_family
- id: sa_pinn
  x: 200
  y: 180
  category: pinn_family
- id: lb_pinn
  x: 300
  y: 180
  category: pinn_family
- id: relobralo
  x: 400
  y: 180
  category: pinn_family
- id: frozen_pinn
  x: 500
  y: 120
  category: pinn_family
- id: pikans
  x: 500
  y: 150
  category: pinn_family
- id: scale_pinn
  x: 500
  y: 180
  category: pinn_family
- id: asr_pinn
  x: 550
  y: 120
  category: pinn_family
- id: ms_pinn
  x: 550
  y: 150
  category: pinn_family
- id: dc_pinns
  x: 550
  y: 180
  category: pinn_family
- id: simple_pinn
  x: 600
  y: 150
  category: pinn_family
- id: deeponet
  x: 100
  y: 350
  category: operators
- id: fno
  x: 100
  y: 300
  category: operators
- id: gno
  x: 80
  y: 380
  category: operators
- id: geo_fno
  x: 250
  y: 280
  category: operators
- id: f_fno
  x: 250
  y: 310
  category: operators
- id: u_fno
  x: 250
  y: 340
  category: operators
- id: pino
  x: 200
  y: 300
  category: operators
- id: lno
  x: 300
  y: 310
  category: operators
- id: gino
  x: 350
  y: 280
  category: operators
- id: moe_pot
  x: 450
  y: 310
  category: operators
- id: poseidon
  x: 500
  y: 300
  category: operators
- id: gaot
  x: 500
  y: 280
  category: operators
- id: ginot
  x: 550
  y: 280
  category: operators
- id: s_not
  x: 550
  y: 310
  category: operators
- id: fedonet
  x: 500
  y: 350
  category: operators
- id: pi_latent_no
  x: 400
  y: 300
  category: operators
- id: difftaichi
  x: 100
  y: 550
  category: diff_sim
- id: jax_md
  x: 100
  y: 500
  category: diff_sim
- id: nvidia_warp
  x: 250
  y: 550
  category: diff_sim
- id: pac_nerf
  x: 300
  y: 550
  category: diff_sim
- id: pie_nerf
  x: 400
  y: 550
  category: diff_sim
- id: jax_mpm
  x: 500
  y: 500
  category: diff_sim
- id: moto
  x: 600
  y: 480
  category: diff_sim
- id: as_diffmpm
  x: 600
  y: 520
  category: diff_sim
- id: pod_dl_rom
  x: 100
  y: 750
  category: acceleration
- id: deepxde
  x: 100
  y: 700
  category: acceleration
- id: neuralpde_jl
  x: 250
  y: 700
  category: acceleration
- id: modulus
  x: 100
  y: 800
  category: acceleration
- id: physicsnemo_v2
  x: 500
  y: 800
  category: acceleration
- id: pde_fm
  x: 500
  y: 750
  category: acceleration
- id: scasml
  x: 500
  y: 700
  category: acceleration
- id: mollifier_layers
  x: 550
  y: 700
  category: acceleration
edges:
- from: pinn
  to: hp_vpinns
  label: 变分法
- from: pinn
  to: cpinn
  label: 域分解
- from: cpinn
  to: xpinns
  label: 广义域分解
- from: pinn
  to: gpinn
  label: 梯度增强
- from: pinn
  to: sa_pinn
  label: 自适应权重
- from: sa_pinn
  to: lb_pinn
  label: 似然平衡
- from: lb_pinn
  to: relobralo
  label: 动态平衡
- from: pinn
  to: frozen_pinn
  label: 无梯度训练
- from: pinn
  to: pikans
  label: KAN架构
- from: pinn
  to: dc_pinns
  label: 硬约束
- from: fno
  to: geo_fno
  label: 几何感知
- from: fno
  to: f_fno
  label: 维度分解
- from: fno
  to: u_fno
  label: 多尺度
- from: fno
  to: pino
  label: 物理约束
- from: fno
  to: lno
  label: 拉普拉斯
- from: geo_fno
  to: gino
  label: GNN融合
- from: gino
  to: gaot
  label: Transformer
- from: gino
  to: ginot
  label: Transformer
- from: fno
  to: moe_pot
  label: MoE扩展
- from: fno
  to: poseidon
  label: 基础模型
- from: fno
  to: s_not
  label: 时序建模
- from: deeponet
  to: fedonet
  label: 傅里叶嵌入
- from: pino
  to: pi_latent_no
  label: 潜空间
- from: difftaichi
  to: nvidia_warp
  label: CUDA加速
- from: difftaichi
  to: pac_nerf
  label: NeRF融合
- from: pac_nerf
  to: pie_nerf
  label: 弹性动力学
- from: jax_md
  to: jax_mpm
  label: MPM扩展
- from: jax_mpm
  to: moto
  label: 拓扑优化
- from: jax_mpm
  to: as_diffmpm
  label: 碰撞处理
- from: deepxde
  to: neuralpde_jl
  label: Julia重构
- from: modulus
  to: physicsnemo_v2
  label: 模块化
- from: fno
  to: pde_fm
  label: Mamba骨干
- from: pinn
  to: scasml
  label: 误差修正
- from: pinn
  to: mollifier_layers
  label: 噪声处理
milestones:
- id: pinn
  label: 开创物理信息学习范式
- id: fno
  label: 神经算子学习里程碑
- id: poseidon
  label: PDE基础模型标杆
```

## 核心算法

### PINN

```yaml
id: pinn
num: 1
name: PINN
full_name: 物理信息神经网络 (Physics-Informed Neural Networks)
year: '2019'
org: 布朗大学
parent: —
paper_url: https://doi.org/10.1016/j.jcp.2018.10.045
project_url: ''
category: pinn_family
motivation: 利用自动微分将PDE残差嵌入损失函数
```

#### 📝 一句话总结
PINN 提出将偏微分方程（PDE）残差通过自动微分嵌入神经网络损失函数，使网络在仅有少量标注数据的情况下即可求解正问题与反问题，开创了物理信息深度学习范式。

#### 🎯 核心要点
- **通用 PDE 框架**：将 PDE 统一表示为 \(u_t + \mathcal{N}[u] = 0\)，适用于任意非线性偏微分方程
- **物理残差损失**：定义 \(f := u_t + \mathcal{N}[u]\)，通过自动微分精确计算，将 PDE 残差作为损失项 \(\text{MSE}_f\) 约束网络
- **两种时间处理方案**：连续时间模型（直接以 \((t,x)\) 为输入）与离散时间模型（将隐式 Runge-Kutta 嵌入网络结构）
- **数据高效**：Burgers 方程仅需 100 个标注点 + 10000 个配点即可达到 \(6.7 \times 10^{-4}\) 的 \(\mathcal{L}_2\) 相对误差
- **离散时间大步推进**：利用 500 阶隐式 Runge-Kutta 方案，理论时间误差 \(\mathcal{O}(\Delta t^{1000}) \approx 10^{-97}\)，单步即可跨越整个时间域
- **正/反问题统一**：同一框架可用于求解 PDE（正问题）和识别未知参数（反问题）
- **四个基准验证**：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、KdV 方程

#### 🔬 深入细节
##### 核心架构示意

![PINN 连续时间模型示意图](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png)
*图：连续时间 PINN 架构。左侧神经网络以 \((t, x)\) 为输入，输出 \(u(t,x)\)；右侧通过自动微分构造物理残差 \(f = u_t + \mathcal{N}[u]\)，两者共享参数。*

![PINN 离散时间模型示意图](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x4.png)
*图：离散时间 PINN 架构。多输出神经网络预测 Runge-Kutta 各阶段的解 \([u^{n+c_1}, \ldots, u^{n+c_q}, u^{n+1}]\)，通过 RK 公式构造物理约束。*

##### 算法伪代码

```python
# PINN 连续时间模型训练伪代码
# 输入: 标注数据 {t_u, x_u, u}, 配点 {t_f, x_f}, PDE算子 N
# 输出: 训练好的网络 u_θ(t, x)

def physics_informed_nn(t, x, theta):
    u = neural_network(t, x, theta)          # 前向传播
    u_t = auto_diff(u, t)                     # 自动微分求 ∂u/∂t
    u_x = auto_diff(u, x)                     # 自动微分求 ∂u/∂x
    u_xx = auto_diff(u_x, x)                  # 自动微分求 ∂²u/∂x²
    f = u_t + N(u, u_x, u_xx)                 # PDE 残差
    return u, f

# 损失函数
MSE_u = mean(|u_pred - u_data|²)              # 数据拟合项
MSE_f = mean(|f_pred|²)                        # 物理残差项 (配点处)
loss = MSE_u + MSE_f

# 优化: L-BFGS (拟牛顿法, 全批量)
optimizer = L_BFGS(theta)
for iteration in range(max_iter):
    u_pred, f_pred = physics_informed_nn(t, x, theta)
    loss = MSE_u + MSE_f
    optimizer.step(loss)
```

##### 动机与背景

传统 PDE 数值方法（有限元、有限差分、谱方法）依赖精细的网格剖分，在高维问题中面临"维度灾难"，且对复杂几何和多物理场耦合的适应性有限。另一方面，纯数据驱动的深度学习方法虽然灵活，但需要海量标注数据，且无法保证物理一致性。PINN 的核心思想是：**将已知的物理定律（PDE）作为正则化项嵌入神经网络的训练过程**，从而在数据稀疏的情况下仍能获得物理上合理的解。

##### 核心机制：连续时间模型

PINN 的出发点是一般形式的参数化非线性 PDE：

$$u_t + \mathcal{N}[u; \lambda] = 0, \quad x \in \Omega, \quad t \in [0, T]$$

其中 \(u(t, x)\) 是待求解的隐变量，\(\mathcal{N}[\cdot; \lambda]\) 是由参数 \(\lambda\) 参数化的非线性微分算子。

**关键设计**：定义物理残差函数

$$f := u_t + \mathcal{N}[u; \lambda]$$

用一个深度神经网络 \(u_\theta(t, x)\) 近似解 \(u(t, x)\)，然后通过**自动微分**（而非数值差分）精确计算 \(f_\theta(t, x)\)。由于自动微分利用计算图的链式法则，其精度达到机器精度级别，且不引入离散化误差。

> 💡 **关键**：\(f\) 和 \(u\) 共享同一组网络参数 \(\theta\)，因此 \(f\) 本身也是一个"神经网络"——只不过它的结构由 PDE 的形式决定，而非人工设计。

损失函数由两部分组成：

$$\text{MSE} = \text{MSE}_u + \text{MSE}_f$$

$$\text{MSE}_u = \frac{1}{N_u} \sum_{i=1}^{N_u} |u(t_u^i, x_u^i) - u^i|^2$$

$$\text{MSE}_f = \frac{1}{N_f} \sum_{i=1}^{N_f} |f(t_f^i, x_f^i)|^2$$

其中 \(\{t_u^i, x_u^i, u^i\}_{i=1}^{N_u}\) 是初始/边界条件的标注数据，\(\{t_f^i, x_f^i\}_{i=1}^{N_f}\) 是时空域内的配点（collocation points），**不需要标签**——只要求 PDE 残差为零。

> ⚠️ **注意**：配点 \(N_f\) 的选取无需网格化，可以用拉丁超立方采样等准随机方法在整个时空域中撒点，这使得 PINN 天然适用于不规则几何和高维问题。

##### 核心机制：离散时间模型

对于刚性方程或需要大时间步长的问题，论文提出将 **\(q\) 阶隐式 Runge-Kutta（IRK）方案**嵌入网络结构：

$$u^{n+c_i} = u^n - \Delta t \sum_{j=1}^{q} a_{ij} \mathcal{N}[u^{n+c_j}], \quad i = 1, \ldots, q$$

$$u^{n+1} = u^n - \Delta t \sum_{j=1}^{q} b_j \mathcal{N}[u^{n+c_j}]$$

网络以空间坐标 \(x\) 为输入，输出 \(q+1\) 个分量 \([u^{n+c_1}(x), \ldots, u^{n+c_q}(x), u^{n+1}(x)]\)，对应 RK 各阶段的解。通过 RK 公式构造 \(q+1\) 个约束 \(u_i^n(x)\)，要求它们均等于已知的 \(u^n(x)\)。

> 💡 **关键优势**：经典数值方法中，隐式 RK 的阶数受限于计算复杂度（每步需求解大型非线性方程组）。而在 PINN 中，增加 RK 阶数仅增加网络最后一层的输出维度，**计算成本几乎不变**。论文使用了 500 阶 IRK（理论时间误差 \(\Delta t^{1000} = 0.8^{1000} \approx 10^{-97}\)），这在传统数值方法中是不可想象的。

##### 训练与优化细节

- **网络架构**：全连接网络，tanh 激活函数。Burgers 方程使用 9 层 × 20 神经元；Schrödinger 方程使用 5 层 × 100 神经元
- **优化器**：L-BFGS（拟牛顿法），全批量训练。L-BFGS 利用二阶曲率信息，在 PINN 这类光滑损失景观中收敛速度远快于 Adam
- **Xavier 初始化**：权重使用 Xavier 初始化方案，确保各层梯度方差一致
- **训练时间**：Burgers 方程连续时间模型约 60 秒（单 NVIDIA Titan X GPU）

##### 实验结果与对比

| 方程 | 模型类型 | 数据量 | 配点数 | \(\mathcal{L}_2\) 误差 | 特殊说明 |
|------|---------|--------|--------|----------------------|---------|
| Burgers | 连续时间 | \(N_u=100\) | \(N_f=10000\) | \(6.7 \times 10^{-4}\) | 9层×20, 60秒训练 |
| Burgers | 离散时间 | \(N_n=250\) | — | \(8.2 \times 10^{-4}\) | 500阶IRK, 单步 t=0.1→0.9 |
| Schrödinger | 连续时间 | \(N_0=50, N_b=50\) | \(N_f=20000\) | \(1.97 \times 10^{-3}\) | 复值分解为实部+虚部 |
| Allen-Cahn | 离散时间 | \(N_n=200\) | — | — | 500阶IRK处理尖锐界面 |
| KdV | 离散时间 | \(N_n=199\) | — | — | 三阶导数, 多步推进 |

##### 与传统方法的核心区别

1. **无网格化**：传统方法需要空间网格剖分，PINN 通过随机配点避免网格生成
2. **物理即正则化**：PDE 残差项 \(\text{MSE}_f\) 本质上是一种正则化，使网络在数据稀疏区域也能给出物理合理的预测
3. **正反问题统一**：传统方法求解正问题和反问题需要完全不同的算法，PINN 只需调整损失函数中的已知/未知量
4. **自动微分 vs 数值微分**：传统方法的离散化引入截断误差，自动微分精确到机器精度
5. **隐式时间积分无额外成本**：传统隐式方法每步需求解非线性方程组，PINN 中增加 RK 阶数仅增加输出维度

#### 🧪 练习题
```yaml
question: "PINN 损失函数中 MSE_f 项的物理含义是什么？"
options:
  - "衡量神经网络预测值与训练数据之间的拟合误差"
  - "衡量神经网络输出在配点处满足 PDE 方程的程度"
  - "衡量神经网络在边界条件上的违反程度"
  - "衡量神经网络参数的 L2 正则化惩罚"
answer: 1
explain: "MSE_f = (1/N_f) Σ|f(t_f, x_f)|² 其中 f = u_t + N[u]，即 PDE 残差。该项要求网络输出在配点处精确满足 PDE，是 PINN 区别于纯数据驱动方法的核心设计。"
```

### hp-VPINNs

```yaml
id: hp_vpinns
num: 2
name: hp-VPINNs
full_name: hp变分物理信息神经网络 (hp-Variational PINNs)
year: '2021'
org: 布朗大学
parent: pinn
paper_url: https://arxiv.org/abs/2003.05385
project_url: ''
category: pinn_family
motivation: 结合变分法与hp细化处理奇异性
```

#### 📝 一句话总结
hp-VPINNs 将 PINN 的点残差约束改成局部变分残差：用一个全局神经网络表示 trial solution，同时在非重叠子域上用高阶多项式测试函数投影 PDE 残差，从而通过 \(h\)-域分解和 \(p\)-阶数提升处理局部奇异性、陡峭梯度和非均匀误差。

#### 🎯 核心要点
- **全局 trial space**：解函数仍由一个全局神经网络 \(u_{NN}(x,t;\theta)\) 表示，保持 PINN 的连续函数近似能力
- **局部 test space**：测试函数定义在每个非重叠子域上，常用 Legendre 多项式等高阶局部基
- **hp-refinement**：\(h\) 表示增加/重排子域元素，\(p\) 表示提升局部测试多项式阶数或数量
- **变分残差损失**：最小化 \((\mathcal{L}u_{NN}-f, v_k^{(e)})_{\Omega_e}\)，而不是只在 collocation points 上令强残差为零
- **局部学习机制**：网络参数是全局共享的，但 loss 按元素组织，可以把训练压力集中到误差大、非光滑或奇异的局部区域
- **数值积分实现**：深层网络的变分积分通常不能解析求出，论文使用 Gauss quadrature 近似；也可通过分部积分降低网络导数阶数
- **相对 VPINN 的改进**：VPINN 使用全局测试函数，hp-VPINNs 使用局部分片测试函数，更接近 subdomain Petrov-Galerkin
- **实验对象**：函数逼近、1D/2D Poisson 方程、L-shape corner singularity、advection-diffusion inverse problem 等

#### 🔬 深入细节
##### 核心示意图与来源

论文 arXiv 页面为 https://arxiv.org/abs/2003.05385，CMAME 版本 DOI 为 https://doi.org/10.1016/j.cma.2020.113547。论文没有单一神经网络架构图，最能体现方法的图是局部测试函数与子域误差示例；下图来自 ar5iv 对论文 Figure 1 的渲染。

![hp-VPINNs 局部测试函数与子域学习示意](https://ar5iv.labs.arxiv.org/html/2003.05385/assets/x1.png)
*图：全局测试函数与局部 elemental test functions 的对比；局部测试函数把残差投影限制到指定子域，是 hp-VPINNs 域分解和局部学习的核心。*

##### 算法伪代码

```python
# hp-VPINNs 训练伪代码

def u_nn(x, t, theta):
    return mlp(concat(x, t), theta)

def strong_residual(x, t, theta):
    u = u_nn(x, t, theta)
    # 例如 L u = f，所需导数由自动微分计算
    return L(u, x, t) - f(x, t)

def element_variational_residual(element, test_fn, theta):
    residual_sum = 0.0
    for z, w in gauss_quadrature_points(element):
        x, t = z
        r = strong_residual(x, t, theta)
        residual_sum += w * r * test_fn(x, t)
    return residual_sum

for epoch in range(num_epochs):
    loss_v = 0.0
    for element in mesh_partition:
        local_terms = []
        for v_k in element.local_polynomial_tests:
            R_ek = element_variational_residual(element, v_k, theta)
            local_terms.append(R_ek ** 2)
        loss_v += mean(local_terms)

    loss_b = mean((u_nn(x_b, t_b, theta) - boundary_value(x_b, t_b)) ** 2)
    loss_0 = mean((u_nn(x_0, 0, theta) - initial_value(x_0)) ** 2)
    loss = loss_v + tau_b * loss_b + tau_0 * loss_0

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 从强形式 PINN 到变分形式

论文考虑一般 PDE：

$$
\mathcal{L}^{\mathbf{q}}u(\mathbf{x},t)=f(\mathbf{x},t),
\qquad
(\mathbf{x},t)\in\Omega\times(0,T],
$$

配合边界与初始条件：

$$
u(\mathbf{x},t)=h(\mathbf{x},t),
\qquad
u(\mathbf{x},0)=g(\mathbf{x}).
$$

用神经网络 \(u_{NN}(\mathbf{x},t;\theta)\) 近似解后，强形式残差为：

$$
r(u_{NN})=\mathcal{L}^{\mathbf{q}}u_{NN}-f.
$$

标准 PINN 直接在 collocation points 上最小化 \(|r|^2\)，即把测试函数隐式看成一组 Dirac delta。hp-VPINNs 则把残差投影到测试函数上：

$$
\mathcal{R}_j(u_{NN})
=
\int_{\Omega\times(0,T]}
r(u_{NN})v_j\,d\mathbf{x}\,dt.
$$

这种弱/变分约束的直觉是：不要求每个采样点的强残差都精确为零，而是要求残差对一组测试函数的矩为零。对噪声、采样点布局和局部奇异结构而言，这往往比纯点约束更稳健。

##### hp-VPINNs 的局部元素残差

hp-VPINNs 的关键是测试函数局部化。把计算域划分为非重叠元素 \(\Omega_e\)，在第 \(e\) 个元素上定义局部测试函数 \(v_k^{(e)}\)，其支撑只在该元素内非零：

$$
v_k^{(e)}(\mathbf{x},t)=
\begin{cases}
\bar{v}_k^{(e)}(\mathbf{x},t), & (\mathbf{x},t)\in\Omega_e,\\
0, & \text{otherwise}.
\end{cases}
$$

元素级变分残差为：

$$
\mathcal{R}^{(e)}_k
=
\left(\mathcal{L}^{\mathbf{q}}u_{NN}-f,\;v_k^{(e)}\right)_{\Omega_e}.
$$

总损失可以写成：

$$
L^{\mathfrak{v}}
=
\sum_{e=1}^{N_{el}}
\frac{1}{K^{(e)}}\sum_{k=1}^{K^{(e)}}
\left|\mathcal{R}^{(e)}_k\right|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

这里 \(K^{(e)}\) 是第 \(e\) 个元素内的测试函数数量。\(h\)-refinement 对应把困难区域划得更细；\(p\)-refinement 对应在困难元素中使用更高阶或更多测试函数。

##### 数值积分与分部积分

由于 \(u_{NN}\) 是深层非线性函数，\(\mathcal{R}^{(e)}_k\) 通常无法解析积分，论文使用 Gauss quadrature：

$$
\mathcal{R}^{(e)}_k
\approx
\sum_{m=1}^{Q}
w_m\,
\left(\mathcal{L}^{\mathbf{q}}u_{NN}(z_m)-f(z_m)\right)
v_k^{(e)}(z_m).
$$

当 PDE 含高阶导数时，可以对弱形式做分部积分，把部分导数从 \(u_{NN}\) 转移到测试函数上。这样能降低自动微分需要计算的网络导数阶数，在高阶 PDE 或 stiff 问题中尤其重要。

##### 为什么局部变分约束能处理奇异性

标准 PINN 的误差控制强依赖 collocation 点分布和损失权重。如果解在 L-shape 角点、边界层、冲击附近或局部高频区域变化剧烈，均匀采样容易把训练预算浪费在平滑区域。hp-VPINNs 把残差损失拆成元素级贡献，允许针对困难区域增加元素数或测试阶数，使优化信号更局部、更可控。

> 💡 关键：hp-VPINNs 不是在每个子域训练独立网络；论文的主设定仍是一个全局神经网络，只是 residual projection 和损失组织在局部元素上完成。

##### 与 PINN、VPINN 和有限元的区别

| 方法 | Trial function | Test / residual | 细化方式 | 主要特点 |
|------|----------------|-----------------|----------|----------|
| PINN | 全局 DNN | 点残差 / collocation | 增加采样点 | 简单通用，但对采样和权重敏感 |
| VPINN | 全局 DNN | 全局多项式测试函数 | 增加全局测试阶数 | 引入变分残差，但局部控制较弱 |
| hp-VPINNs | 全局 DNN | 子域局部高阶测试函数 | \(h\) 域分解 + \(p\) 阶数提升 | 局部化优化信号，适合非光滑或局部复杂解 |
| 有限元 | 分片多项式 | 局部弱形式 | 标准 \(h/p\) 网格细化 | 数值理论成熟，但 trial space 表达受网格基限制 |

hp-VPINNs 的定位可以理解为：保留 PINN 的神经网络 trial space，同时把有限元/Petrov-Galerkin 的局部测试空间和 hp-refinement 引入损失设计。它不是传统数值方法的直接替代，而是把“如何约束神经网络满足 PDE”从点约束升级为局部积分约束。

##### 实用限制

hp-VPINNs 的额外精度来自更复杂的 loss。每个元素、每个测试函数、每个 quadrature point 都需要计算 residual 和自动微分，训练成本通常高于标准 PINN。测试阶数、元素划分、quadrature 点数、边界项权重都会显著影响结果。对于高维问题，普通张量积 quadrature 会遇到维数灾难，需要 sparse grid、quasi-Monte Carlo 或其他积分近似来控制成本。

#### 🧪 练习题
```yaml
question: "hp-VPINNs 中 h-refinement 和 p-refinement 分别对应什么？"
options:
  - "h 是学习率调度，p 是优化器动量"
  - "h 是增加网络隐藏层，p 是增加神经元数量"
  - "h 是域分解/元素细化，p 是提高局部测试多项式阶数或数量"
  - "h 是边界损失权重，p 是初始条件损失权重"
answer: 2
explain: "hp-VPINNs 将测试函数定义在局部子域上；h-refinement 改变子域划分，p-refinement 改变元素内高阶多项式测试空间。"
```

### cPINN

```yaml
id: cpinn
num: 3
name: cPINN
full_name: 守恒物理信息神经网络 (Conservative PINNs)
year: '2020'
org: 布朗大学
parent: pinn
paper_url: https://arxiv.org/abs/2001.08245
project_url: ''
category: pinn_family
motivation: 基于域分解强制执行物理守恒律
```

#### 📝 一句话总结
cPINN 将计算域划分为多个子域并为每个子域训练独立 PINN，在子域交界面显式惩罚通量连续和平均解一致性，从而把守恒律的跨界面约束嵌入神经网络求解器，提升非线性守恒律问题的局部表达能力与并行性。

#### 🎯 核心要点
- **面向非线性守恒律**：主要针对 Burgers、KdV、Euler、Navier-Stokes 等可写成守恒/通量形式的 PDE
- **离散域分解**：把时空或空间计算域拆成多个子域，每个子域使用独立 neural network \(u_{\theta_i}\)
- **强形式 PDE 残差**：每个子域内部仍像 PINN 一样通过自动微分最小化 PDE residual
- **界面通量连续**：在相邻子域的公共界面上强制 \(F(u_i,\nabla u_i)=F(u_j,\nabla u_j)\)，这是 cPINN 的“conservative”核心
- **平均解约束**：除通量连续外，还约束两侧网络在界面上的预测接近平均解，以加速收敛并抑制界面振荡
- **局部网络自由度**：不同子域可使用不同深度、宽度、激活函数、优化器、残差点数量和训练超参数
- **并行计算友好**：子域内部损失可在不同设备/进程上并行优化，只需交换界面预测和通量信息
- **来源限制说明**：任务给出的 arXiv URL 当前解析为另一篇非 cPINN 论文；本文方法依据作者仓库 `https://github.com/AmeyaJagtap/Conservative_PINNs`、论文 DOI `https://doi.org/10.1016/j.cma.2020.113028` 和仓库 PDF `https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf`

#### 🔬 深入细节
##### 核心示意图与来源

![cPINN 域分解与界面守恒约束示意](https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3Bsd1%5Blabel%3D%22Subdomain%201%5CnPINN%201%22%5D%3Bsd2%5Blabel%3D%22Subdomain%202%5CnPINN%202%22%5D%3Bsd3%5Blabel%3D%22Subdomain%203%5CnPINN%203%22%5D%3Bsd1-%3Esd2%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3Bsd2-%3Esd3%5Blabel%3D%22flux%20%2B%20state%20continuity%22%2Cdir%3Dboth%5D%3B%7D)
*图：cPINN 的核心是多个子域 PINN 通过界面条件耦合；原论文 Figure 1 的可访问来源见作者仓库 PDF：`https://raw.githubusercontent.com/AmeyaJagtap/Conservative_PINNs/main/cPINN_Paper.pdf`。*

##### 算法伪代码

```python
# cPINN 训练伪代码

subdomains = split_domain(Omega, interfaces)
models = {i: PINN_i(width=local_width[i], depth=local_depth[i])
          for i in subdomains}

for epoch in range(num_epochs):
    total_loss = 0.0

    # 1. 每个子域内部的 PINN 损失
    for i, Omega_i in subdomains.items():
        u_i = models[i](x_u[i], t_u[i])
        f_i = pde_residual(models[i], x_f[i], t_f[i])  # auto-diff
        loss_data_i = mse(u_i, u_data[i])
        loss_res_i = mse(f_i, 0.0)
        total_loss += lambda_u * loss_data_i + lambda_f * loss_res_i

    # 2. 相邻子域界面上的守恒耦合
    for (i, j, Gamma_ij) in neighboring_interfaces:
        u_i = models[i](Gamma_ij.x, Gamma_ij.t)
        u_j = models[j](Gamma_ij.x, Gamma_ij.t)
        flux_i = physical_flux(models[i], Gamma_ij)
        flux_j = physical_flux(models[j], Gamma_ij)
        u_avg = 0.5 * (u_i + u_j)

        loss_flux = mse(flux_i - flux_j, 0.0)
        loss_state = mse(u_i - u_avg, 0.0) + mse(u_j - u_avg, 0.0)
        total_loss += lambda_flux * loss_flux + lambda_state * loss_state

    update_all_or_local_optimizers(models, total_loss)
```

##### 从 PINN 到 cPINN：为什么需要界面守恒

标准 PINN 在整个域上训练一个网络 \(u_\theta(x,t)\)，用数据项、边界/初始条件项和 PDE 残差项组成损失。对于一般守恒律：

$$
\frac{\partial u}{\partial t} + \nabla\cdot \mathbf{F}(u,\nabla u;\lambda)=0,
$$

标准 PINN 的强形式残差可写为：

$$
r_\theta(x,t)=
\frac{\partial u_\theta}{\partial t}
+ \nabla\cdot \mathbf{F}(u_\theta,\nabla u_\theta;\lambda).
$$

当解含冲击、边界层、多尺度结构或局部复杂流动时，一个全局网络往往需要很大容量才能同时拟合所有区域。更严重的是，守恒律的数值解通常要求跨单元通量守恒；如果只把域拆开训练多个 PINN，而没有界面通量约束，各子域预测可能在界面处产生非物理的质量、动量或能量泄漏。

cPINN 的基本想法是：在每个子域 \(\Omega_i\) 中训练独立网络 \(u_{\theta_i}\)，同时在相邻子域界面 \(\Gamma_{ij}\) 上加入守恒约束。子域内部损失为：

$$
L_i^{\mathrm{PINN}}
=
\frac{1}{N_{u,i}}\sum_{n=1}^{N_{u,i}}
\left|u_{\theta_i}(x_n,t_n)-u_n\right|^2
+
\frac{1}{N_{f,i}}\sum_{n=1}^{N_{f,i}}
\left|r_{\theta_i}(x_n,t_n)\right|^2.
$$

##### 界面通量连续与平均解约束

对公共界面 \(\Gamma_{ij}\)，cPINN 要求两侧通量一致：

$$
\mathbf{F}\!\left(u_{\theta_i},\nabla u_{\theta_i}\right)\cdot \mathbf{n}_{ij}
=
\mathbf{F}\!\left(u_{\theta_j},\nabla u_{\theta_j}\right)\cdot \mathbf{n}_{ij}.
$$

对于一维粘性 Burgers 方程：

$$
u_t + u u_x - \nu u_{xx}=0,
$$

它可写成通量形式 \(u_t + \partial_x F = 0\)，其中：

$$
F(u,u_x)=\frac{u^2}{2}-\nu u_x.
$$

因此在界面 \(x=x_\Gamma\) 上的通量损失可写成：

$$
L_{\Gamma}^{\mathrm{flux}}
=
\frac{1}{N_\Gamma}\sum_{n=1}^{N_\Gamma}
\left|
\left(\frac{u_{\theta_i}^2}{2}-\nu \partial_x u_{\theta_i}\right)(x_\Gamma,t_n)
-
\left(\frac{u_{\theta_j}^2}{2}-\nu \partial_x u_{\theta_j}\right)(x_\Gamma,t_n)
\right|^2.
$$

论文/代码还加入平均解约束。令：

$$
\bar{u}_{ij}=\frac{u_{\theta_i}+u_{\theta_j}}{2},
$$

则界面状态损失为：

$$
L_{\Gamma}^{\mathrm{avg}}
=
\frac{1}{N_\Gamma}\sum_{n=1}^{N_\Gamma}
\left(
\left|u_{\theta_i}(x_\Gamma,t_n)-\bar{u}_{ij}(x_\Gamma,t_n)\right|^2
+
\left|u_{\theta_j}(x_\Gamma,t_n)-\bar{u}_{ij}(x_\Gamma,t_n)\right|^2
\right).
$$

总目标可概括为：

$$
L_{\mathrm{cPINN}}
=
\sum_i L_i^{\mathrm{PINN}}
+
\lambda_{\Gamma}
\sum_{(i,j)}
\left(
L_{\Gamma_{ij}}^{\mathrm{flux}}
+
L_{\Gamma_{ij}}^{\mathrm{avg}}
\right).
$$

> 💡 关键：cPINN 的守恒性不是靠训练后拼接结果得到的，而是在训练损失中直接约束相邻子域的物理通量。

##### 机制拆解：局部容量、界面通信和并行优化

域分解给 cPINN 带来三个实际优势。第一，局部容量可调：在解存在冲击或复杂结构的子域使用更深/更宽网络，在平滑区域使用浅网络，减少全局网络被最困难区域拖累的问题。第二，残差点分配可调：可在界面、激波附近或高误差子域放置更多 collocation points。第三，训练可并行：每个子域内部的 PDE 残差和数据项互不依赖，只在界面损失上交换 \(u\)、\(\nabla u\) 和通量。

作者仓库中的 Burgers 四子域示例体现了这种结构：不同子域有独立网络，损失中同时包含子域数据项、PDE residual、界面 flux residual，以及两侧解接近平均值的项。代码中还使用 locally adaptive activation functions，让每个子域网络可以通过可学习斜率调节激活函数形状，加速局部收敛。

##### 与 PINN、XPINN 的区别

| 方法 | 域划分 | 界面约束 | 适用重点 | 主要优势 |
|------|--------|----------|----------|----------|
| PINN | 无，全局单网络 | 无显式界面 | 一般 PDE 正/反问题 | 实现简单 |
| cPINN | 通常空间域分解 | 通量连续 + 平均解约束 | 非线性守恒律 | 强化守恒、局部容量可调、并行友好 |
| XPINN | 空间-时间广义域分解 | 解连续、残差等广义界面约束 | 更一般 PDE 和复杂时空域 | 分解更灵活 |

cPINN 比 PINN 更像传统 finite-volume / domain-decomposition 思想和 PINN 的结合：每个子域内部用神经网络近似连续解，界面上用守恒通量把局部解耦合起来。相对 XPINN，cPINN 的约束更聚焦于守恒律通量，因此在双曲/粘性守恒律问题中更自然。

##### 反问题中的用法

对于含未知参数 \(\lambda\) 的守恒律：

$$
u_t + \nabla\cdot \mathbf{F}(u,\nabla u;\lambda)=0,
$$

cPINN 可把 \(\lambda\) 作为可学习变量，与所有子域网络参数一起优化。界面通量项会同时约束 \(\lambda\) 在不同子域上的一致性，降低局部网络只靠拟合数据而产生非物理参数的风险。实际使用时，若不同子域观测稀疏程度差异很大，仍需要调节数据项、残差项和界面项权重。

##### 实用限制

cPINN 的效果依赖子域划分。如果界面正好穿过强不连续、冲击或观测稀疏区域，通量约束可能变得难优化；如果划分太细，界面项数量会增加，通信和权重调节成本也会上升。另一个限制是它主要为守恒律设计，通量形式不清晰的 PDE 需要重新设计界面条件。最后，多个局部网络提升了表达能力，但也增加了超参数搜索空间；实际训练中需要监控各子域损失和界面损失，避免某个子域或界面成为误差瓶颈。

#### 🧪 练习题
```yaml
question: "cPINN 中界面通量连续项的主要作用是什么？"
options:
  - "减少网络参数量，使所有子域共享同一组权重"
  - "保证相邻子域在公共界面上的物理通量一致，避免非物理守恒量泄漏"
  - "把 PDE 残差从强形式改写为弱形式积分"
  - "只用于可视化子域边界，不参与训练"
answer: 1
explain: "cPINN 的 conservative 特性来自界面通量约束；它让相邻子域的局部 PINN 解在守恒律意义下耦合，而不是训练后简单拼接。"
```

### XPINNs

```yaml
id: xpinns
num: 4
name: XPINNs
full_name: 扩展物理信息神经网络 (Extended PINNs)
year: '2020'
org: 布朗大学
parent: cpinn
paper_url: https://arxiv.org/abs/2005.05653
project_url: ''
category: pinn_family
motivation: 广义域分解支持任意几何形状
```

#### 📝 一句话总结
XPINNs 把 PINN 从单一全域网络扩展为通用的空间-时间域分解框架：每个子域训练一个独立的物理信息子网络，再用接口上的解连续和 PDE 残差连续项把局部解拼接成全局解。它解决了 cPINN 主要面向守恒律、空间切分和较规则接口的问题，使任意复杂几何、时间切分、多尺度区域和并行训练都能纳入 PINN 家族。

#### 🎯 核心要点
- **任意空间-时间域分解**：可在空间、时间或空间-时间联合维度把计算域切成规则或不规则子域，不要求网格状切块。
- **每个子域一套 PINN**：子域 \(\Omega_q\) 使用独立网络 \(u_{\theta_q}\)，可按局部解复杂度配置不同层数、宽度、激活函数、采样密度和优化器。
- **接口损失负责拼接**：相邻子域接口 \(\Gamma_{q,q^+}\) 上加入平均解连续 \(MSE_{uavg}\) 与残差连续 \(MSE_R\)，让信息跨子域传播。
- **比 cPINN 更通用**：cPINN 依赖守恒律的通量连续；XPINNs 的核心接口项只依赖 PDE 残差和自动微分，因此可用于非守恒律、稳态/非稳态、正问题/反问题。
- **支持复杂几何与移动接口**：接口条件不需要显式法向量，降低了高维复杂边界、非凸域和动态接口问题的实现复杂度。
- **天然并行与局部自适应**：子域内部残差计算可并行，只有接口点需要交换网络输出和残差；困难区域可部署更深网络或更多残差点。

#### 🔬 深入细节
##### 来源与核心图示

论文 arXiv 页面为 `https://arxiv.org/abs/2005.05653`，会议版 PDF 可通过 CEUR-WS 访问：`https://ceur-ws.org/Vol-2964/article_60.pdf`。下图来自 Semantic Scholar 对论文 Figure 1 的公开图像索引，展示 XPINN 子网和不规则 X-shaped 域分解。

![XPINNs 子域网络与接口示意图](https://figures.semanticscholar.org/78f0649ee879d97e73d492eaf76d3f5dfc554ba0/8-Figure1-1.png)
*图：上半部分是在单个子域内的 PINN 子网与物理残差计算；下半部分展示不规则子域，每个子域部署一个 Sub-Net，并通过接口条件连接。*

##### 算法伪代码

```python
# XPINNs 训练流程伪代码
# 输入: PDE 算子 F, 分解后的子域 {Omega_q}, 边界/初值/观测点, 接口点
subdomains = decompose_space_time_domain(Omega, mode="arbitrary")
models = {q: PINN(config_for_subdomain(q)) for q in subdomains}

for step in range(num_steps):
    total_loss = 0.0

    for q, model_q in models.items():
        x_u, y_u = sample_data_or_bc_ic(q)
        x_f = sample_residual_points(q)

        u_q = model_q(x_u)
        mse_u = mean((u_q - y_u) ** 2)

        r_q = pde_residual(model_q, x_f)       # F[u_theta_q](x_f), via AD
        mse_f = mean(r_q ** 2)

        loss_q = W_u[q] * mse_u + W_f[q] * mse_f

        for p in neighbors(q):
            x_i = sample_interface_points(q, p)

            u_left = models[q](x_i)
            u_right = models[p](x_i)
            u_avg = 0.5 * (u_left + u_right)

            r_left = pde_residual(models[q], x_i)
            r_right = pde_residual(models[p], x_i)

            mse_uavg = mean((u_left - u_avg) ** 2)
            mse_residual = mean((r_left - r_right) ** 2)

            # 可按 PDE 类型额外加入通量连续或 C^k 导数连续
            loss_q += W_i[q] * mse_uavg + W_if[q] * mse_residual

        total_loss += loss_q

    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

##### 方法机制解释

标准 PINN 用一个全局神经网络 \(u_\theta(\mathbf{x})\) 近似全域解，并最小化数据/边界项与 PDE 残差项：

$$
\mathcal{L}_{PINN}
= W_u MSE_u + W_F MSE_F,\qquad
MSE_F=\frac{1}{N_F}\sum_{i=1}^{N_F}
\left|\mathcal{F}[u_\theta](\mathbf{x}^{(i)}_F)\right|^2.
$$

这种全局单网络在简单光滑问题上有效，但在复杂几何、多尺度解、局部陡峭区域或不同物理区域并存时会变得难训：同一个网络既要拟合平滑区域，又要表达局部高频/间断结构，残差点也很难一次性分配合理。cPINN 已经把域分解引入 PINN，但其接口设计主要服务于守恒律中的通量连续。XPINNs 的关键扩展是把域分解抽象为通用机制：只要能在每个子域上用自动微分计算 PDE 残差，就可以用接口约束把子网络连接起来。

令全域被分解成 \(N_{sd}\) 个非重叠子域 \(\Omega_q\)，第 \(q\) 个子域的网络为：

$$
u_{\theta_q}(\mathbf{z}) = N_L(\mathbf{z};\theta_q),\qquad
\mathbf{z}\in\Omega_q,\quad q=1,\ldots,N_{sd}.
$$

全局解可理解为局部解的拼接：

$$
u_{\theta}(\mathbf{z})
=\sum_{q=1}^{N_{sd}} u_{\theta_q}(\mathbf{z})\,\mathbf{1}_{\Omega_q}(\mathbf{z}),
$$

其中 \(\mathbf{1}_{\Omega_q}\) 在子域内部取 1，在外部取 0；在公共接口上可按相交子域数量归一化。这个表示让每个子域拥有自己的表达能力和训练点分布，避免一个网络承担所有局部复杂性。

对第 \(q\) 个子域，XPINNs 的前向问题损失写作：

$$
\mathcal{J}(\theta_q)=
W_{u_q}MSE_{u_q}
+W_{F_q}MSE_{F_q}
+W_{I_q}MSE_{uavg}
+W_{IF_q}MSE_R
+\text{optional interface terms}.
$$

前两项与普通 PINN 相同：

$$
MSE_{u_q}
=\frac{1}{N_{u_q}}\sum_i
\left|u^{(i)}-u_{\theta_q}(\mathbf{x}^{(i)}_{u_q})\right|^2,
$$

$$
MSE_{F_q}
=\frac{1}{N_{F_q}}\sum_i
\left|\mathcal{F}[u_{\theta_q}](\mathbf{x}^{(i)}_{F_q})\right|^2.
$$

真正的新增部分是接口条件。对相邻子域 \(q\) 和 \(q^+\)，接口平均解为：

$$
u_{avg}(\mathbf{x})
=\frac{u_{\theta_q}(\mathbf{x})+u_{\theta_{q^+}}(\mathbf{x})}{2},
\qquad \mathbf{x}\in\Gamma_{q,q^+}.
$$

XPINNs 让每一侧的解贴近该平均值，并让两侧 PDE 残差一致：

$$
MSE_{uavg}
=\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|u_{\theta_q}(\mathbf{x}^{(i)}_{I_q})-u_{avg}(\mathbf{x}^{(i)}_{I_q})\right|^2,
$$

$$
MSE_R
=\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|
\mathcal{F}[u_{\theta_q}](\mathbf{x}^{(i)}_{I_q})
-\mathcal{F}[u_{\theta_{q^+}}](\mathbf{x}^{(i)}_{I_q})
\right|^2.
$$

> 💡 关键：\(MSE_{uavg}\) 主要保证 \(C^0\) 意义下的解连续；\(MSE_R\) 让相邻子域在接口处满足同一个 PDE 残差结构。两者合起来既传递数值信息，又传递物理约束。

这种设计带来的优势不是简单“把网络拆小”。第一，每个子网络只学习局部函数，困难区域可以用更深/更宽网络、更多残差点或不同激活函数，平滑区域可保持轻量。第二，子域内部训练几乎独立，适合多 GPU/多进程并行；接口通信只发生在 \(\Gamma_{q,q^+}\) 上。第三，接口残差项不需要法向通量，因此比 cPINN 更容易用于非守恒 PDE、复杂曲面接口或动态接口。

反问题也能自然处理。如果 PDE 中含未知参数 \(\lambda\)，只需把 \(\lambda\) 放入优化变量集合，残差变为 \(\mathcal{F}[u_{\theta_q};\lambda]\)，接口和子域损失的结构保持不变。因此 XPINNs 的本质不是更换 PINN 的自动微分物理监督，而是把一个全局物理优化问题改写成多个局部优化问题加接口协调条件。

#### 🧪 练习题
```yaml
question: "XPINNs 相比 cPINN 和普通 PINN 的关键扩展是什么？"
options:
  - "只把全域残差点数量增加到原来的数倍"
  - "用多个子域 PINN 和接口上的平均解连续、残差连续项拼接任意空间-时间域"
  - "把所有 PDE 改写成守恒律并强制法向通量连续"
  - "取消 PDE 残差项，只使用边界数据监督"
answer: 1
explain: "XPINNs 的核心是通用域分解：每个子域有独立 PINN，接口用解连续和 PDE 残差连续连接；这使其不局限于守恒律或规则空间切分。"
```

### gPINN

```yaml
id: gpinn
num: 5
name: gPINN
full_name: 梯度增强物理信息神经网络 (Gradient-enhanced PINNs)
year: '2022'
org: 宾夕法尼亚大学
parent: pinn
paper_url: https://arxiv.org/abs/2111.02801
project_url: ''
category: pinn_family
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

### SA-PINN

```yaml
id: sa_pinn
num: 6
name: SA-PINN
full_name: 自适应物理信息神经网络 (Self-Adaptive PINN)
year: '2020'
org: 布朗大学
parent: pinn
paper_url: https://arxiv.org/abs/2009.04544
project_url: ''
category: pinn_family
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

### lbPINN

```yaml
id: lb_pinn
num: 7
name: lbPINN
full_name: 损失平衡物理信息神经网络 (Loss-Balanced PINN)
year: '2021'
org: ETH Zurich
parent: sa_pinn
paper_url: https://arxiv.org/abs/2104.06120
project_url: ''
category: pinn_family
motivation: 通过似然估计平衡多目标损失
```

#### 📝 一句话总结
lbPINN 将 PINN 的 PDE、边界、初值和观测数据损失解释为带噪声的高斯似然项，通过联合学习每个损失项的噪声尺度 \(\varepsilon_i\) 自动决定权重，解决手工调参难以平衡多目标物理损失的问题。

#### 🎯 核心要点
- **来源修正**：任务 YAML 中的 `2104.06120` 指向无关量子代数论文；本文方法级解读基于可访问的 lbPINN 论文 `arXiv:2104.06217` 及 ar5iv HTML
- **概率化损失权重**：为每个损失项建立高斯观测模型，噪声尺度 \(\varepsilon_i\) 同时承担不确定性估计和损失权重的角色
- **最大似然推导**：负对数似然给出 \(\frac{1}{2\varepsilon_i^2}\mathcal{L}_i+\log\varepsilon_i\)，避免权重无限变小或变大
- **联合优化**：网络参数 \(\theta\) 和噪声集合 \(\varepsilon=\{\varepsilon_f,\varepsilon_b,\varepsilon_i,\varepsilon_d\}\) 在训练中同步更新
- **面向不可压 Navier-Stokes**：实验覆盖二维稳态 Kovasznay 流、二维非定常圆柱绕流、三维非定常 Beltrami 流
- **鲁棒性检验**：论文比较不同初始噪声配置，发现最终噪声和权重会收敛到相近范围，说明方法对初始化不敏感
- **与固定权重 PINN 的区别**：固定权重需要人工搜索，lbPINN 把权重选择变成可学习的统计参数估计问题

#### 🔬 深入细节
##### 核心架构示意

![lbPINN 自适应损失平衡示意图](https://ar5iv.labs.arxiv.org/html/2104.06217/assets/figure/lbPINN.jpg)
*图：lbPINN 在普通 PINN 的 PDE/边界/初值/数据损失之上引入噪声参数 \(\varepsilon_i\)，用似然目标自适应调节各项权重。*

> 来源说明：任务提供的 `https://arxiv.org/abs/2104.06120` 与 lbPINN 不匹配；可访问论文来源为 `https://arxiv.org/abs/2104.06217`，图示来自其 ar5iv HTML 页面。

##### 算法伪代码

```python
# lbPINN 自适应似然损失训练伪代码
# 输入: PDE/边界/初值/数据采样点, PINN 网络 u_theta, 初始噪声 eps_i > 0
# 输出: 网络参数 theta 与每个损失项的自适应权重

theta = initialize_network()
log_eps = initialize_log_noise(["pde", "bc", "ic", "data"])

for step in range(num_steps):
    # 1. 标准 PINN 多目标损失
    L_pde = mean_square(pde_residual(u_theta, collocation_points))
    L_bc = mean_square(boundary_residual(u_theta, boundary_points))
    L_ic = mean_square(initial_residual(u_theta, initial_points))
    L_data = mean_square(u_theta(data_points) - observations)

    # 2. 高斯负对数似然形式
    eps = exp(log_eps)                         # 保证 eps_i > 0
    losses = [L_pde, L_bc, L_ic, L_data]
    total = 0.0
    for i, Li in enumerate(losses):
        total += Li / (2 * eps[i] ** 2) + log_eps[i]

    # 3. 同步更新网络与噪声参数
    total.backward()
    adam.step([theta, log_eps])

    # 4. 可解释权重: 噪声越小, 惩罚越强
    weights = [1 / (2 * e ** 2) for e in eps]
```

##### 动机与背景

普通 PINN 的训练目标通常是多个损失项的加权和：

$$
\mathcal{L}(\theta)=
\omega_f\mathcal{L}_f+
\omega_b\mathcal{L}_b+
\omega_i\mathcal{L}_i+
\omega_d\mathcal{L}_d
$$

其中 \(\mathcal{L}_f\) 是 PDE 残差，\(\mathcal{L}_b\) 是边界条件，\(\mathcal{L}_i\) 是初值条件，\(\mathcal{L}_d\) 是观测数据误差。问题在于这些损失项的量纲、数值范围和收敛速度不同，固定权重会让训练偏向某一类约束；例如 PDE 残差过大时可能牺牲边界条件，边界权重过大时又会降低域内物理解的准确性。

lbPINN 的关键变化是把“权重调参”改写成“噪声估计”。假设某个约束项对应的观测满足高斯分布：

$$
p(y\mid \hat{u}(x,t;\theta))=
\mathcal{N}(\hat{u}(x,t;\theta),\varepsilon^2)
$$

对该似然取负对数并忽略常数项，可得到：

$$
-\log p(y\mid \hat{u}) \propto
\frac{1}{2\varepsilon^2}\left\|y-\hat{u}(x,t;\theta)\right\|^2+\log\varepsilon
$$

推广到 PINN 的多个损失项：

$$
\mathcal{L}_{lb}(\theta,\varepsilon)=
\sum_{k}
\left(
\frac{1}{2\varepsilon_k^2}\mathcal{L}_k(\theta)+\log\varepsilon_k
\right)
$$

这条公式同时完成两件事：\(\frac{1}{2\varepsilon_k^2}\) 是第 \(k\) 个损失的有效权重；\(\log\varepsilon_k\) 是正则项，防止模型通过把 \(\varepsilon_k\) 任意放大来忽略该约束。

##### 方法机制

如果某个损失项当前很难优化，模型可以通过增大 \(\varepsilon_k\) 暂时降低它对总梯度的支配性；如果某个约束更可靠或需要更强约束，\(\varepsilon_k\) 会变小，对应权重增大。论文用这种机制解释为同方差不确定性建模：不同物理目标的噪声尺度不同，训练过程应该让模型自己学习这些尺度。

在 Navier-Stokes 场景中，网络输出速度和压力，自动微分构造连续性方程与动量方程残差。以简化符号表示，不可压缩约束可写为：

$$
\nabla\cdot \mathbf{u}=0,\qquad
\partial_t\mathbf{u}+(\mathbf{u}\cdot\nabla)\mathbf{u}
+\nabla p-\frac{1}{Re}\Delta\mathbf{u}=0
$$

对应的 PDE 残差、边界约束、初值约束、数据拟合项分别进入 \(\mathcal{L}_{lb}\)。训练时并不需要预先设定 \(\omega_f,\omega_b,\omega_i,\omega_d\)，而是学习 \(\varepsilon_f,\varepsilon_b,\varepsilon_i,\varepsilon_d\)。

> 💡 关键：lbPINN 并不是改变 PINN 的网络结构，而是改变多目标损失的统计解释；任何已有 PINN 只要有多个损失项，都可以替换为这种似然平衡形式。

##### 与传统 PINN 的区别

固定权重 PINN 的难点是权重搜索成本高，且最优权重随问题、采样点、训练阶段变化。lbPINN 把权重设为动态变量，且用 \(\log\varepsilon_k\) 形成内置约束，因此比简单的可训练权重更稳定。与 SA-PINN 的点级注意力不同，lbPINN 更偏向“损失项级别”的全局平衡，适合处理 PDE 残差、边界、初值、数据之间的竞争。

实验中，论文报告了 Kovasznay 流、圆柱绕流和 Beltrami 流上的相对误差与收敛曲线，并展示不同初始噪声配置最终会收敛到相似权重范围。方法的局限也很清楚：噪声参数仍依赖梯度优化，理论上不能保证找到全局最优；当损失景观极端病态时，仍需要采样、网络结构或优化器配合。

#### 🧪 练习题
```yaml
question: "lbPINN 中噪声参数 ε_i 变小时，对应损失项会发生什么？"
options:
  - "该损失项权重降低，训练会忽略它"
  - "该损失项权重提高，约束惩罚变强"
  - "网络结构会增加一层隐藏层"
  - "该损失项会从总损失中删除"
answer: 1
explain: "lbPINN 的有效权重为 1/(2ε_i²)，因此 ε_i 越小，该项在总损失中的惩罚越强；log ε_i 项用于防止噪声尺度退化。"
```

### ReLoBRaLo

```yaml
id: relobralo
num: 8
name: ReLoBRaLo
full_name: 相对损失平衡随机回溯 (Relative Loss Balancing with Random Lookback)
year: '2021'
org: ETH Zurich
parent: lb_pinn
paper_url: https://arxiv.org/abs/2110.09813
project_url: ''
category: pinn_family
motivation: 基于损失变化率动态平衡权重
```

#### 📝 一句话总结
ReLoBRaLo 用各损失项的相对下降速度而不是绝对值或梯度范数来分配 PINN 权重，并通过指数平滑与随机回溯机制让训练周期性关注长期落后的物理约束。

#### 🎯 核心要点
- **目标场景**：解决 PINN 中 PDE、边界、初值、数据损失量纲不同、竞争关系强、固定权重难调的问题
- **相对损失标准**：根据 \(\mathcal{L}_i(t)/\mathcal{L}_i(t')\) 衡量第 \(i\) 项从历史时刻到当前的进展，而不是直接比较损失绝对大小
- **SoftAdapt 式归一化**：用带温度 \(\mathcal{T}\) 的 softmax 把每项相对进展转成有界权重，并乘以损失项数量 \(m\)
- **随机回溯**：引入 Bernoulli 变量 \(\rho\)，有时回看初始损失 \(\mathcal{L}_i(0)\)，避免模型只记住短期变化
- **指数平滑**：用 \(\alpha\) 平滑权重变化，减少每一步损失空间剧烈扭曲
- **无需梯度统计**：相比 GradNorm 和 Learning Rate Annealing，不需要每个损失项单独反向传播，计算开销更低
- **基准任务**：在 Burgers 方程、Kirchhoff 板弯曲方程、Helmholtz 方程的正问题和反问题上验证

#### 🔬 深入细节
##### 核心图示与来源

![PINN 多损失结构示意](https://raw.githubusercontent.com/rbischof/relative_balancing/main/images/PINNS_Loss.png)
*图：作者开源仓库中的 PINN 多损失结构图。ReLoBRaLo 作用于这些 PDE/边界/初值/数据损失项的权重分配。*

> 来源说明：论文 arXiv 页面可访问，TeX 源码中包含完整公式与实验图；作者仓库 `https://github.com/rbischof/relative_balancing` 提供可访问的图像与训练代码。

##### 算法伪代码

```python
# ReLoBRaLo 权重更新伪代码
# 输入: m 个 PINN 损失 L_i, 温度 T, 指数平滑 alpha, 回溯概率 p=E[rho]
# 输出: 动态权重 lambda_i

lambda_prev = ones(m)
L0 = evaluate_losses()
L_prev = L0

for step in range(1, num_steps + 1):
    L = evaluate_losses()  # [L_1(t), ..., L_m(t)]

    def balanced_weights(reference_losses):
        # 相对进展越差, softmax 权重越大
        scores = [L[i] / (T * reference_losses[i] + eps) for i in range(m)]
        return m * softmax(scores)

    lambda_short = balanced_weights(L_prev)     # 看上一步
    lambda_start = balanced_weights(L0)         # 看训练起点

    rho = bernoulli(p)                          # rho=1 保留历史, rho=0 随机回溯
    lambda_hist = rho * lambda_prev + (1 - rho) * lambda_start
    lambda_t = alpha * lambda_hist + (1 - alpha) * lambda_short
    lambda_t = stop_gradient(lambda_t)

    total_loss = sum(lambda_t[i] * L[i] for i in range(m))
    optimizer.step(total_loss)

    lambda_prev = lambda_t
    L_prev = L
```

##### 核心公式

ReLoBRaLo 从线性标量化的多目标 PINN 损失出发：

$$
\mathcal{L}(\theta)=\sum_{i=1}^{m}\lambda_i\mathcal{L}_i(\theta)
$$

关键是如何更新 \(\lambda_i\)。首先基于当前损失与某个历史时刻 \(t'\) 的相对比例计算候选权重：

$$
\lambda_i^{bal}(t,t')=
m\cdot
\frac{
\exp\left(\frac{\mathcal{L}_i(t)}
{\mathcal{T}\mathcal{L}_i(t')}\right)
}{
\sum_{j=1}^{m}
\exp\left(\frac{\mathcal{L}_j(t)}
{\mathcal{T}\mathcal{L}_j(t')}\right)
}
$$

如果某一项相对下降慢，比例 \(\mathcal{L}_i(t)/\mathcal{L}_i(t')\) 更大，softmax 会给它更高权重。温度 \(\mathcal{T}\) 控制激进程度：\(\mathcal{T}\) 越小，权重越接近“只关注最落后项”；\(\mathcal{T}\) 越大，权重越接近均匀分配。

然后用随机回溯混合历史权重与从初始损失计算出的权重：

$$
\lambda_i^{hist}(t)=
\rho\lambda_i(t-1)+(1-\rho)\lambda_i^{bal}(t,0),
\qquad \rho\sim \mathrm{Bernoulli}(\mathbb{E}[\rho])
$$

最后用指数衰减得到当前训练步的实际权重：

$$
\lambda_i(t)=
\alpha\lambda_i^{hist}(t)+(1-\alpha)\lambda_i^{bal}(t,t-1)
$$

> 💡 关键：ReLoBRaLo 不是奖励“损失值大”的项，而是奖励“相对进展慢”的项，因此能在量纲不同的 PDE、边界、初值损失之间做更公平的比较。

##### 方法机制

Learning Rate Annealing 依赖梯度统计，GradNorm 还需要额外优化权重；这两类方法在损失项数量很多时会引入明显计算开销。ReLoBRaLo 只读取损失值序列，避免为每个损失单独做反向传播，因此适合 Kirchhoff 这类含多条边界条件和高阶导数的 PINN。

随机回溯是它区别于普通 SoftAdapt 的核心。只看 \(t-1\) 会导致模型容易忘记某些长期被牺牲的约束；只看初始点又可能太僵硬，阻碍局部适应。Bernoulli 回溯在二者之间折中：大多数时间跟随短期变化，偶尔根据训练初始状态重新审视谁真正落后。

在 Burgers 方程中，损失通常包含 PDE 残差、左右边界和初值：

$$
\mathcal{L}=
\lambda_0\mathcal{L}_\Omega+
\lambda_1\mathcal{L}_{\Gamma_1}+
\lambda_2\mathcal{L}_{\Gamma_2}+
\lambda_3\mathcal{L}_{\Upsilon}
$$

其中

$$
\mathcal{L}_\Omega=
\frac{1}{|\hat{\Omega}|}\sum_{(x,t)\in\hat{\Omega}}
\left\|
\frac{\partial U}{\partial t}
+U\frac{\partial U}{\partial x}
-\nu\frac{\partial^2 U}{\partial x^2}
\right\|_2^2
$$

如果训练早期边界项下降很快、PDE 残差下降慢，ReLoBRaLo 会提高 PDE 项权重；如果后期边界项开始恶化，随机回溯能重新抬高边界项，而不是让网络只优化最显眼的 PDE 残差。

##### 实验与局限

论文比较了 ReLoBRaLo、SoftAdapt、GradNorm、Learning Rate Annealing 和手工权重基线。ReLoBRaLo 在多个正/反问题上通常取得更好的精度，并且由于不依赖梯度统计，计算开销接近 SoftAdapt，明显低于 GradNorm 和 LR Annealing。论文也指出超参数仍然重要：\(\alpha\) 决定记忆长度，\(\mathcal{T}\) 决定权重分布尖锐度，\(\mathbb{E}[\rho]\) 决定随机回溯频率。Helmholtz 这类边界项容易被忽视的问题，需要更激进的温度和更频繁的回溯。

#### 🧪 练习题
```yaml
question: "ReLoBRaLo 中随机回溯参数 ρ 的主要作用是什么？"
options:
  - "随机删除一部分训练样本以减少过拟合"
  - "偶尔用初始损失作为参照，提醒模型关注长期进展慢的损失项"
  - "随机冻结网络层以降低计算量"
  - "把所有损失权重固定为相同数值"
answer: 1
explain: "ρ 是 Bernoulli 随机变量；当发生回溯时，权重根据 L_i(t)/L_i(0) 计算，可避免训练只关注短期损失变化。"
```

### Frozen-PINN

```yaml
id: frozen_pinn
num: 9
name: Frozen-PINN
full_name: 无梯度训练物理信息神经网络 (Fast training without gradient descent)
year: '2026'
org: TUM
parent: pinn
paper_url: https://arxiv.org/abs/2405.20836
project_url: ''
category: pinn_family
motivation: 无梯度训练加速46-2945倍
```

#### 📝 一句话总结
Frozen-PINN 将时间依赖 PDE 的解表示为空间随机基函数与时间系数的组合，冻结隐藏层空间参数后用最小二乘和自适应 ODE 求解器推进输出层系数，从根源上绕开传统 PINN 的高维非凸梯度下降训练。

#### 🎯 核心要点
- **空间-时间分离**：用冻结的空间基 \(\phi_i(x)\) 和随时间变化的输出系数 \(c_i(t)\) 表示解
- **无梯度训练**：隐藏层参数由 ELM 或 SWIM 采样得到，不通过反向传播优化
- **时间因果性内置**：把 PDE 代入 ansatz 后得到关于 \(C(t)\) 的 ODE，用 RK45/LSODA 等求解器顺序推进
- **损失解耦**：初值用最小二乘求 \(C(0)\)，边界条件通过边界兼容层或增强 ODE 处理，PDE 残差由 ODE 推进吸收
- **SVD 压缩层**：对基函数矩阵截断 SVD，降低 ODE 维度与刚性，论文报告最高可减少 20 倍维度、最高 75 倍加速
- **采样策略两类**：ELM 随机采样、SWIM 基于数据点对采样，后者能把陡峭基函数放到冲击或高梯度区域附近
- **广泛基准**：覆盖线性对流、Euler-Bernoulli、Wave、Burgers、非线性扩散、反应扩散、Kuramoto-Sivashinsky 和高维扩散等九类 PDE

#### 🔬 深入细节
##### 核心架构示意

![Frozen-PINN 核心思想](https://arxiv.org/html/2405.20836v3/x1.png)
*图：Frozen-PINN 的两条核心思路：冻结空间基函数并演化输出层时间系数；将 PDE、边界和初值损失尽量分开处理。*

![Frozen-PINN 完整训练架构](https://arxiv.org/html/2405.20836v3/x4.png)
*图：Frozen-PINN 无梯度训练流水线，包括随机/数据依赖基函数采样、边界兼容层、SVD 层、最小二乘初值和 ODE 求解。*

##### 算法伪代码

```python
# Frozen-PINN 训练伪代码
# 输入: PDE 算子 L/N, 初值 u0, 边界条件, collocation points X
# 输出: 测试网格上的 PDE 解 u_hat(x, t)

X = sample_collocation_points(domain)

# 1. 构造并冻结空间基函数
if sampler == "ELM":
    W, b = sample_random_features()
else:  # SWIM
    W, b = sample_features_from_point_pairs(X)
Phi = activation(W @ X.T + b)                 # [M, Nc]

# 2. 处理边界条件
A = build_boundary_compliant_layer(Phi, boundary_condition)
Phi_A = concat(A @ Phi, ones_row)

# 3. SVD 压缩，降低 ODE 系统维度
V_r, S_r, U_r = truncated_svd(A @ Phi, threshold=eps_svd)
A_r = V_r.T @ A
Phi_r = concat(A_r @ Phi, ones_row)

# 4. 初值最小二乘，不做梯度下降
C0 = u0(X).T @ pinv(Phi_r)

# 5. 将 PDE 转成关于 C(t) 的 ODE 并推进
def rhs(t, C):
    R = -C @ L(Phi_r) - gamma * N(C @ Phi_r) + f(X).T
    return R @ pinv(Phi_r)

C_t = ode_solve(rhs, C0, t_span, method="RK45_or_LSODA")

# 6. 查询任意时刻的解
u_hat = lambda x, t: C_t(t) @ Phi_r(x)
```

##### 核心公式

Frozen-PINN 先用单隐层随机特征表示时间依赖解：

$$
\hat{u}(x,t)=\sum_{i=1}^{M}c_i(t)\sigma(w_i\cdot x+b_i)+c_0(t)
=C(t)[\Phi(x),\mathbbm{1}]
$$

其中 \(w_i,b_i\) 是空间相关参数，采样后冻结；真正随时间变化的是输出层系数 \(C(t)\)。这与传统 PINN 把 \((x,t)\) 一起输入神经网络并对所有参数做梯度下降完全不同。

把 ansatz 代入一般时间依赖 PDE，可得到关于 \(C(t)\) 的 ODE。论文给出的核心形式是：

$$
C_t(t)=R(X,C(t))[\Phi(X),\mathbbm{1}]^{+}
$$

$$
R(X,C(t))=
-C(t)\mathcal{L}[\Phi(X),\mathbbm{1}]
-\gamma\mathcal{N}(C(t)[\Phi(X),\mathbbm{1}])
+[f(X)]^\top
$$

这里 \((\cdot)^+\) 是伪逆，\(\mathcal{L}\) 是线性空间微分算子，\(\mathcal{N}\) 是非线性项，\(f\) 是外力或源项。初值通过最小二乘直接给出：

$$
C(0)=u(X,0)^\top[\Phi(X),\mathbbm{1}]^+
$$

> 💡 关键：传统 PINN 在整个时空域上最小化残差；Frozen-PINN 把时间方向变成 ODE 初值问题，因此天然按时间推进，避免非因果的全局时空拟合。

##### 边界条件与 SVD 层

Frozen-PINN 提供两种边界处理方式。第一种是边界兼容层：构造线性映射 \(A\)，令

$$
\Phi_A=[A\Phi,\mathbbm{1}]
$$

从而把边界条件编码进基函数空间。此时 ODE 改写为：

$$
C_t(t)=R(X,C(t))\Phi_A(X)^+
$$

第二种是增强 ODE：当无法方便构造边界兼容层时，在 ODE 右端加入边界纠偏项，让边界点 \(X_b\) 上的预测以速率 \(\kappa(\hat{u}-g)\) 被拉回给定边界值 \(g\)。论文默认 \(\kappa=10^5\)，并讨论它对边界误差和求解时间的影响。

SVD 层用于降低数值刚性。对 \(A\Phi(X)\) 做截断分解：

$$
V_r\Sigma_rU_r^\top=A\Phi(X)+O(\Sigma_{r+1}),\qquad
A_r=V_r^\top A
$$

然后用 \(A_r\Phi(X)\) 替换原始基函数矩阵。这样得到的数据基近似正交，伪逆更稳定，ODE 系统维度也更小。

##### ELM 与 SWIM 采样

ELM 是数据无关的随机特征方法，直接从高斯/均匀分布采样 \(w_i,b_i\)。它实现简单，但不能主动把基函数放到解变化剧烈的区域。

SWIM 是数据依赖采样策略：用两个 collocation 点构造一对权重和偏置，使激活函数的变化方向与点对方向对齐。对于 Burgers 冲击、强对流或局部高梯度问题，SWIM 能在关键区域放置更陡峭的基函数，减少无效随机特征。

##### 与传统 PINN 的区别

传统 PINN 的困难来自三个方面：参数维度高、PDE/边界/初值多目标竞争、时间被当作普通输入导致非因果拟合。Frozen-PINN 分别对应处理：冻结隐藏层减少可训练参数；最小二乘、边界层和 ODE 推进拆开损失项；按 \(C(t)\) 的初值问题顺序演化时间。

论文在 2026 年 ICLR 版本中报告 Frozen-PINN 在九个 PDE 基准上通常比 SOTA PINN 快数个数量级，并在低维问题上接近高效网格方法精度，在高维扩散等场景中避免传统网格法的维度灾难。局限是它依赖随机/数据依赖基函数质量，复杂边界和强非线性问题仍需要合适的边界处理、重采样和 ODE 求解器设置。

#### 🧪 练习题
```yaml
question: "Frozen-PINN 为什么能避免传统 PINN 的大规模梯度下降训练？"
options:
  - "它删除了 PDE 残差项，只拟合数据"
  - "它冻结空间基函数，并把输出层时间系数转化为 ODE 进行求解"
  - "它把所有边界条件都忽略，因此训练更快"
  - "它使用更深的 Transformer 代替全连接网络"
answer: 1
explain: "Frozen-PINN 采样并冻结隐藏层空间参数，用最小二乘确定初值，再通过 ODE 求解器推进 C(t)，因此不需要对全网络做反向传播式训练。"
```

### PIKANs

```yaml
id: pikans
num: 10
name: PIKANs
full_name: 物理信息KAN网络 (Physics-Informed Kolmogorov-Arnold Networks)
year: '2026'
org: PNNL
parent: pinn
paper_url: https://www.pnnl.gov/publications/from-pinns-to-pikans
project_url: ''
category: pinn_family
motivation: KAN可学习激活函数提升高维精度
```

#### 📝 一句话总结
PIKANs 将 PINN 中的 MLP 表示模型替换为 Kolmogorov-Arnold Network，使边上的一元函数成为可学习激活函数，在 PDE 残差约束不变的前提下提升表达能力、参数效率和可解释性。

#### 🎯 核心要点
- **表示模型替换**：从 \(u_\theta(x,t)=\mathrm{MLP}_\theta(x,t)\) 改为 \(u_\theta(x,t)=\mathrm{KAN}_\theta(x,t)\)，物理残差、边界损失和数据损失沿用 PINN 框架
- **边函数可学习**：KAN 将固定激活函数改为边上的一元函数 \(\phi_{j,i}\)，常见实现包括 B-spline、Chebyshev 多项式、RBF、Wavelet 等
- **物理信息训练**：通过自动微分计算 KAN 输出对时空坐标的导数，最小化 PDE 残差 \(r_f=\mathcal{N}[u_\theta]-s\) 与初始/边界条件误差
- **多种 PDE 形式**：可用于强形式 PINN、能量形式 DEM、边界积分/逆形式 BINN；KINN 工作展示了 KAN 版本的强形式、能量形式和逆形式求解
- **精度优势场景**：在多尺度、奇异性、应力集中、非线性超弹性、异质材料和部分反问题中，KAN 表示比 MLP 更容易逼近局部陡变与高低频混合解
- **参数与可解释性**：可学习一元边函数比全连接 MLP 的黑箱权重更容易可视化，且在若干 PDE 案例中可用更少参数达到更低误差
- **主要限制**：KAN 的网格大小、样条阶数和边函数类型是敏感超参数；高维配点数量仍会膨胀，原始 PIKAN 在高维问题上训练可能变慢

#### 🔬 深入细节
##### 核心架构示意

![PIML 表示模型增强示意图](https://arxiv.org/html/2410.13228v2/extracted/5944408/Images/schematic.png)
*图：From PINNs to PIKANs 综述中的 PIML 框架图。PINN/PIKAN 的共同结构是“表示模型 → PDE/边界残差 → 多目标损失 → 优化器”，区别在于表示模型从 MLP 层替换为 KAN 层。*

![KINN/PIKAN 方法概览](https://arxiv.org/html/2406.11045/x1.png)
*图：Kolmogorov-Arnold-Informed Neural Network 的图形摘要，展示了将 KAN 嵌入强形式、能量形式和逆形式 PDE 求解的思路。*

> 来源限制：任务给出的 PNNL 链接对应的是 “From PINNs to PIKANs” 综述入口；可访问正文主要来自 arXiv:2410.13228 及其引用的 KINN/PIKAN 实证论文（如 arXiv:2406.11045）。因此这里按“PIKANs 作为一类方法”解读，而不是声称存在单一同名算法论文。

##### 算法伪代码

```python
# PIKAN/KINN 训练伪代码
# 输入: PDE 算子 N, 源项 s, 初始/边界数据, 配点 Z_f
# 输出: 满足物理约束的 KAN 表示 u_theta

theta = init_kan(edge_function="bspline_or_chebyshev")

for step in range(max_steps):
    z_f = sample_collocation_points()          # z = (x, t) 或高维时空坐标
    z_b, u_b = sample_boundary_points()
    z_0, u_0 = sample_initial_points()

    u_f = KAN(theta, z_f)
    grads = auto_diff(u_f, z_f)                # 自动微分求 u_t, u_x, u_xx, ...
    r_f = PDE_operator_N(u_f, grads) - source(z_f)

    u_bc = KAN(theta, z_b)
    u_ic = KAN(theta, z_0)

    loss_pde = mean_square(r_f)
    loss_bc = mean_square(u_bc - u_b)
    loss_ic = mean_square(u_ic - u_0)
    loss = loss_pde + lambda_bc * loss_bc + lambda_ic * loss_ic

    theta = optimizer_step(theta, loss)
```

##### 动机与背景

标准 PINN 使用 MLP 作为 \(u_\theta(x,t)\) 的函数逼近器。它的优势是简单、可微、无网格；问题是 MLP 对高频、多尺度和局部奇异结构常有谱偏置，PDE 残差又需要高阶导数，训练时容易出现梯度不平衡、边界项压不过 PDE 项、或在复杂局部结构处误差集中。

KAN 的切入点是 Kolmogorov-Arnold 表示定理：多元连续函数可以由一元函数的复合与加和表示。现代 KAN 不再使用固定的 \(\tanh\)、ReLU 或 SiLU，而是在网络边上放置可学习的一元函数。一个 KAN 层可抽象写为：

$$z_j^{(\ell+1)}=\sum_{i=1}^{n_\ell}\phi_{j,i}^{(\ell)}\!\left(z_i^{(\ell)}\right)$$

其中 \(\phi_{j,i}^{(\ell)}\) 是第 \(\ell\) 层从输入节点 \(i\) 到输出节点 \(j\) 的可学习边函数。原始 KAN 常使用 B-spline 展开：

$$\phi(x)=w_b b(x)+w_s\sum_{k} c_k B_{k,p}(x)$$

这里 \(B_{k,p}\) 是 \(p\) 阶 B-spline 基函数，\(c_k\) 是可学习系数。cPIKAN/KINN 变体也常使用 Chebyshev 多项式：

$$\phi(x)=\sum_{k=0}^{K} a_k T_k(x), \quad T_{k+1}(x)=2xT_k(x)-T_{k-1}(x)$$

> 💡 关键：PIKAN 的创新不在于改变 PDE 残差形式，而在于把“表示解的神经网络”换成更接近数值基函数展开的 KAN。

##### 物理信息损失

对一般 PDE：

$$\mathcal{N}[u](z)=s(z), \quad z=(x,t)\in \Omega\times[0,T]$$

PIKAN 用 KAN 表示：

$$u_\theta(z)=\mathrm{KAN}_\theta(z)$$

并通过自动微分构造残差：

$$r_f(z;\theta)=\mathcal{N}[u_\theta](z)-s(z)$$

典型损失函数为：

$$\mathcal{L}(\theta)=
\lambda_f\frac{1}{N_f}\sum_{i=1}^{N_f}|r_f(z_f^i;\theta)|^2+
\lambda_b\frac{1}{N_b}\sum_{i=1}^{N_b}|\mathcal{B}[u_\theta](z_b^i)-g_b^i|^2+
\lambda_d\frac{1}{N_d}\sum_{i=1}^{N_d}|u_\theta(z_d^i)-u_d^i|^2$$

这里 \(\mathcal{B}\) 是边界/初始条件算子，\(\lambda_f,\lambda_b,\lambda_d\) 是损失权重。对反问题，未知物理参数 \(\lambda\) 也可以与 KAN 参数 \(\theta\) 一起优化。

##### 为什么 KAN 对 PDE 有吸引力

KAN 的 B-spline 或 Chebyshev 边函数类似局部/谱基函数，能在有限区间内构造更灵活的一元响应。对于多尺度解，MLP 需要通过层叠固定激活来合成高频结构；KAN 可以直接调整边函数形状，在局部陡变、奇异梯度和应力集中区域更快拟合目标。

另一个优势是可解释性。MLP 的知识分散在矩阵权重中，而 KAN 的每条边对应一条可视化的一元函数。对科学计算任务而言，这有助于检查模型是否学到单调性、局部峰值、周期性或材料异质性等物理相关结构。

##### 与 PINN 的区别

| 方面 | PINN | PIKANs |
|------|------|--------|
| 表示模型 | MLP + 固定激活函数 | KAN + 可学习边函数 |
| 非线性来源 | 节点激活 \(\sigma(Wx+b)\) | 边函数 \(\phi_{j,i}(x_i)\) |
| 物理约束 | PDE/IC/BC 残差 | 同 PINN |
| 导数计算 | 自动微分 MLP 输出 | 自动微分 KAN 输出 |
| 优势场景 | 中低维、较平滑解 | 多尺度、局部奇异、参数效率敏感问题 |
| 主要风险 | 谱偏置、损失不平衡 | KAN 超参数敏感、训练开销可能更高 |

##### 实践注意点

1. 输入通常需要归一化到 \([-1,1]\)，尤其是 Chebyshev 或样条边函数，否则多项式/样条基容易数值不稳定。
2. 网格大小不是越大越好。KINN 实验显示，KAN grid size 过大可能导致过拟合和边函数不光滑。
3. 对复杂几何，PIKAN 不会自动解决采样与边界表示问题；仍需距离函数、RBF、NURBS、三角积分或几何映射等辅助技术。
4. 高维 PDE 中配点数量仍然是瓶颈，后续 SPIKANs 通过变量分离让每个维度由单独 KAN 处理，正是为缓解这一问题。

#### 🧪 练习题
```yaml
question: "PIKANs 相比传统 PINN 的核心变化是什么？"
options:
  - "将 PDE 残差从强形式改成有限差分格式"
  - "用 KAN 的可学习一元边函数替换 MLP 的固定激活表示模型"
  - "取消边界条件损失，只保留数据拟合项"
  - "用强化学习选择配点"
answer: 1
explain: "PIKANs 的主体仍是 PINN 的物理残差训练框架，关键变化是把表示解的 MLP 换成 KAN，让边上的一元函数可学习。"
```

### Scale-PINN

```yaml
id: scale_pinn
num: 11
name: Scale-PINN
full_name: 序列修正物理信息神经网络 (Sequential Correction PINN)
year: '2026'
org: A*STAR
parent: pinn
paper_url: https://arxiv.org/abs/2601.scale
project_url: ''
category: pinn_family
motivation: 序列修正机制处理多尺度PDE
```

#### 📝 一句话总结
Scale-PINN 将数值迭代法中的残差修正思想直接写入 PINN 的 PDE 损失，在训练相邻迭代之间加入 Helmholtz 型残差平滑与一致性修正，使 PINN 在流体、多尺度和刚性 PDE 上更快、更稳定收敛。

#### 🎯 核心要点
- **真实论文追溯**：任务 YAML 中的 `https://arxiv.org/abs/2601.scale` 是占位式 URL；可访问论文为 arXiv:2602.19475，代码仓库为 `github.com/chiuph/SCALE-PINN`
- **损失函数创新**：不是换网络骨干，而是在标准 PDE residual loss 中加入 sequential correction auxiliary sequence
- **数值法启发**：借鉴迭代残差修正与隐式残差平滑，将前一轮网络解 \(u_{\theta^{k-1}}\) 与当前解 \(u_{\theta^k}\) 的差值用于稳定当前 PDE 残差
- **两个辅助项**：引入 stabilization term（残差平滑）和 consistency term（补偿修正项），既抑制训练振荡，又保证最终收敛到原始 PDE
- **标准 PINN 极限**：当修正超参数取零时，Scale-PINN 退化为普通 PINN 损失
- **低额外开销**：只需保存上一轮权重、额外前向一次并对当前 mini-batch 计算修正项，可嵌入 Adam/SGD 等一阶优化器
- **验证范围广**：覆盖 lid-driven cavity Navier-Stokes、NACA0012 翼型、方柱绕流、Rayleigh-Bénard 对流、Kuramoto-Sivashinsky、Gray-Scott、KdV 和 Allen-Cahn 方程
- **训练策略**：JAX 实现，MLP/多分支 MLP 骨干，首层 sine 高频初始化与 frequency annealing，Adam + warm-up cosine learning rate

#### 🔬 深入细节
##### 核心架构示意

![Scale-PINN 框架示意图](https://arxiv.org/html/2602.19475/x1.png)
*图：Scale-PINN 的整体示意。核心是把残差平滑算子作用于训练迭代中解的变化量，并将该序列修正项并入 PDE 损失。*

##### 算法伪代码

```python
# Scale-PINN 训练伪代码
# 输入: PDE residual R(u), IC/BC 数据, smoothing 参数 alpha, 修正权重 beta/gamma
# 输出: 训练后的 u_theta

theta = init_network()
theta_prev = copy(theta)

for k in range(num_iterations):
    z_f = sample_collocation_batch()
    z_b, y_b = sample_boundary_batch()

    # 当前解与上一迭代解
    u = net(theta, z_f)
    u_prev = stop_gradient(net(theta_prev, z_f))
    delta_u = u - u_prev

    # 标准 PDE 残差
    residual = PDE_residual(u, z_f, theta)

    # 序列修正：Helmholtz/残差平滑 + 一致性补偿
    smooth_delta = helmholtz_smoothing(delta_u, alpha)
    consistency = consistency_counter_term(delta_u, alpha)
    corrected_residual = residual + beta * smooth_delta - gamma * consistency

    loss_pde = mean_square(corrected_residual)
    loss_bc = mean_square(net(theta, z_b) - y_b)
    loss = loss_pde + lambda_bc * loss_bc

    theta_prev = copy(theta)
    theta = adam_step(theta, loss)
```

##### 动机与背景

普通 PINN 的目标函数通常写作：

$$\mathcal{L}_{\mathrm{PINN}}=
\lambda_f\frac{1}{N_f}\sum_i|\mathcal{R}(u_\theta)(z_i)|^2+
\lambda_b\mathcal{L}_{bc}+
\lambda_0\mathcal{L}_{ic}$$

其中 \(\mathcal{R}(u_\theta)\) 是 PDE 残差。问题在于复杂 PDE 的残差景观会非常崎岖：Navier-Stokes 的非线性对流项、反应扩散系统的多尺度结构、KdV/KS 的高阶导数都会让一阶优化器在局部震荡或早熟收敛。

Scale-PINN 的观察是：传统科学计算不只是离散化 PDE，还依赖迭代求解器中的残差修正来保证稳定收敛。PINN 训练本身也是一个迭代过程，因此可以把“相邻迭代之间解的变化”视为可利用的数值信息，而不是只在每步孤立地最小化当前 residual。

##### 序列修正损失

设第 \(k\) 次迭代的网络解为 \(u_{\theta^k}\)，上一迭代为 \(u_{\theta^{k-1}}\)，定义：

$$\Delta u^k(z)=u_{\theta^k}(z)-u_{\theta^{k-1}}(z)$$

Scale-PINN 在 PDE residual 中加入与 \(\Delta u^k\) 相关的平滑修正。一个实现层面的抽象写法是：

$$\mathcal{L}_{f}^{k}=
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left|
\mathcal{R}(u_{\theta^k})(z_i)
+\beta\,\mathcal{S}_{\alpha}[\Delta u^k](z_i)
-\gamma\,\mathcal{C}_{\alpha}[\Delta u^k](z_i)
\right|^2$$

其中 \(\mathcal{S}_{\alpha}\) 是稳定化残差平滑项，\(\mathcal{C}_{\alpha}\) 是一致性补偿项，\(\beta,\gamma,\alpha\) 为可调超参数。论文将 \(\mathcal{S}_{\alpha}\) 与 Helmholtz 型 residual smoothing 联系起来，可理解为：

$$\left(I-\alpha^2\nabla^2\right)\tilde{r}=r$$

或等价地将高频振荡残差过滤后再参与更新。

> 💡 关键：Scale-PINN 不直接改变目标 PDE，而是在优化路径上加入数值稳定机制；一致性项的作用是避免平滑项把最终解偏离原始方程。

##### Navier-Stokes 示例

以稳态不可压 Navier-Stokes 为例，标准残差包括连续性方程与动量方程：

$$\nabla\cdot \mathbf{u}=0$$

$$\mathbf{u}\cdot\nabla \mathbf{u}+\nabla p-\frac{1}{Re}\nabla^2\mathbf{u}=0$$

普通 PINN 会直接惩罚这两组残差。Scale-PINN 对动量方程残差加入序列修正项，并在连续性约束中引入压力与不可压约束之间的关系，帮助压力-速度耦合更稳定地形成。论文在 lid-driven cavity \(Re=400\) 到 \(Re=3200\) 范围展示了明显加速：在若干高 Reynolds 案例中，Scale-PINN 可在分钟级训练时间内达到普通 PINN 或二阶优化方法需要数小时才能接近的精度。

##### 网络与训练机制

Scale-PINN 的骨干仍是 MLP。对流体问题，论文使用共享隐藏层后接 \(u,v,p\) 等变量分支的多分支网络；对标量 PDE，则使用带拼接 skip connections 的网络。为了缓解高频特征难学的问题，首层用 sine 激活和频率因子初始化：

$$h_1=\sin(\omega_0 W_1 z+b_1)$$

训练中这些高频分量逐渐调整到合适范围，论文称为 frequency annealing。后续层常用 SiLU 或 softplus。优化器采用 Adam 与 warm-up cosine 学习率调度，在单张 RTX 3090 上运行 JAX 实现。

##### 与普通 PINN 的区别

| 方面 | 普通 PINN | Scale-PINN |
|------|----------|------------|
| 主要改动 | 直接最小化 PDE 残差 | 在 PDE 残差中加入序列修正项 |
| 使用历史迭代 | 不使用 | 使用 \(u_{\theta^k}-u_{\theta^{k-1}}\) |
| 稳定性来源 | 损失权重、采样、优化器 | 残差平滑 + 一致性补偿 |
| 额外成本 | 无 | 额外保存上一轮权重并做一次前向 |
| 适用场景 | 平滑/中等难度 PDE | 刚性、多尺度、复杂流动 PDE |

##### 为什么能加速

Scale-PINN 的修正项相当于给优化器提供“当前解相对上一解的物理变化方向”。在 mini-batch 采样变化较大时，普通 PINN 的 residual gradient 容易被局部配点扰动牵引；序列修正项会抑制高频振荡，使优化路径更像稳定的隐式迭代法。它因此可以使用更小 batch、更大学习率和更少训练迭代，而不容易掉入错误流场或反应扩散图案。

#### 🧪 练习题
```yaml
question: "Scale-PINN 的序列修正项主要利用了什么信息？"
options:
  - "训练集中标签数据的类别分布"
  - "当前网络解与上一迭代网络解之间的变化量"
  - "Transformer 注意力矩阵的稀疏模式"
  - "有限元网格单元的拓扑连接"
answer: 1
explain: "Scale-PINN 将 u_{theta^k}-u_{theta^{k-1}} 经过残差平滑和一致性补偿后并入 PDE 损失，从而稳定训练迭代。"
```

### ASR-PINN

```yaml
id: asr_pinn
num: 12
name: ASR-PINN
full_name: 自适应步长RK物理信息神经网络 (Adaptive step-size Runge-Kutta PINN)
year: '2026'
org: 河海大学
parent: pinn
paper_url: https://www.sciencedirect.com/science/article/pii/S0022169426002246
project_url: ''
category: pinn_family
motivation: 自适应步长处理反应输运问题
```

#### 📝 一句话总结
ASR-PINN 面向多组分反应性溶质输运，将自适应步长 Runge-Kutta 时间推进嵌入 PINN 训练，用局部截断误差控制时间步长，从而在反应刚性、浓度前沿和多物种耦合条件下提高稳定性与精度。

#### 🎯 核心要点
- **来源状态**：公开可访问题录显示论文发表于 Journal of Hydrology 669:135127，DOI 为 `10.1016/j.jhydrol.2026.135127`；ScienceDirect 正文和作者分享链接当前不可访问，ResearchGate 也标注无全文
- **问题对象**：多组分反应性溶质输运，未知量是多个浓度场 \(C_1,\dots,C_m\)，同时受对流、弥散/扩散和反应网络控制
- **离散时间 PINN**：不是只在连续时空中随机采样残差，而是在相邻时间层之间加入 Runge-Kutta 阶段约束
- **自适应步长**：根据 RK 嵌入对或 step-doubling 的局部误差估计调整 \(\Delta t\)，反应剧烈或浓度前沿陡峭时缩小步长，平滑阶段放大步长
- **多物种耦合**：网络输出向量 \(\mathbf{C}_\theta=(C_{1,\theta},\dots,C_{m,\theta})\)，反应项 \(R_i(\mathbf{C};k)\) 在各物种残差之间共享，避免逐物种独立拟合破坏质量转化关系
- **损失构成**：初始/边界条件损失、观测数据损失、PDE 残差损失、RK 时间推进一致性损失共同训练
- **适用场景**：地下水污染物迁移、串联/分支反应链、变量参数输运、高 Péclet 数下易出现数值振荡或前沿误差的问题
- **局限说明**：由于全文不可访问，以下公式和流程是基于题名、题录参考文献、PINN 离散时间模型和自适应 RK 数值方法的机制级重构；具体网络结构与实验数值需以正式论文为准

#### 🔬 深入细节
##### 可访问来源与方法流程图

论文图当前无法公开访问；可核验来源包括 DOI 题录与 ResearchGate 题录：

![ASR-PINN DOI 题录入口](https://api.crossref.org/works/10.1016/j.jhydrol.2026.135127/agency)
*图：ASR-PINN 的 DOI/Crossref 题录入口用于核验论文身份；由于论文图像当前不可公开直连，下方文字流程图复现其自适应 Runge-Kutta PINN 训练机制。*

- DOI: https://doi.org/10.1016/j.jhydrol.2026.135127
- ResearchGate: https://www.researchgate.net/publication/400792461_ASR-PINN_Adaptive_step-size_runge-kutta_physics-informed_neural_network_for_multi-component_reactive_solute_transport

```text
多组分浓度 C(t_n, x)
        │
        ▼
RK 阶段预测 C^(s) = C^n + h Σ a_sq F(C^(q))
        │
        ├── 高阶更新 C_high^(n+1)
        ├── 低阶更新 C_low^(n+1)
        ▼
局部误差 e = ||C_high - C_low||
        │
        ├── e <= tol: 接受步长，加入 RK/PDE 损失，推进 t_{n+1}
        └── e >  tol: 拒绝步长，缩小 h 重新计算
```

##### 算法伪代码

```python
# ASR-PINN 机制级伪代码
# 输入: 多物种反应输运算子 F(C), 初始/边界/观测数据, 容差 tol
# 输出: 浓度场网络 C_theta(t, x)

theta = init_multi_output_network(num_species=m)
t = t0
h = h_init

while t < T:
    x_batch = sample_spatial_points()

    # 当前时间层网络预测
    Cn = C_theta(theta, t, x_batch)

    # 嵌入式 RK 阶段，b_high/b_low 构成两个不同阶数的更新
    stages = []
    for s in range(num_stages):
        Cs = Cn + h * sum(a[s][q] * F(stages[q], t + c[q] * h, x_batch)
                          for q in range(s))
        stages.append(Cs)

    C_high = Cn + h * sum(b_high[q] * F(stages[q], t + c[q] * h, x_batch)
                          for q in range(num_stages))
    C_low = Cn + h * sum(b_low[q] * F(stages[q], t + c[q] * h, x_batch)
                         for q in range(num_stages))

    error = normalized_norm(C_high - C_low, atol, rtol)

    if error <= 1.0:
        C_next_net = C_theta(theta, t + h, x_batch)
        loss_rk = mean_square(C_next_net - C_high)
        loss_pde = mean_square(transport_reaction_residual(theta, t, x_batch))
        loss_bc_ic = boundary_initial_loss(theta)
        loss_obs = observation_loss(theta)
        theta = optimizer_step(theta, loss_rk + loss_pde + loss_bc_ic + loss_obs)
        t = t + h

    h = safety * h * error ** (-1.0 / (order + 1))
```

##### 反应输运方程

多组分反应性溶质输运常可写成向量 PDE：

$$\frac{\partial C_i}{\partial t}
+ \nabla\cdot(\mathbf{v} C_i)
- \nabla\cdot(\mathbf{D}_i\nabla C_i)
- R_i(\mathbf{C};\mathbf{k})=0,\quad i=1,\dots,m$$

其中 \(C_i\) 是第 \(i\) 个组分浓度，\(\mathbf{v}\) 是地下水流速，\(\mathbf{D}_i\) 是弥散/扩散张量，\(R_i\) 是由反应网络给出的生成/消耗项。对于串联降解链，\(R_i\) 会同时依赖上游物种的衰减和本物种的消耗；对于分支反应，多个 \(R_i\) 还会共享同一前驱物种。

PINN 用多输出网络逼近：

$$\mathbf{C}_\theta(t,x)=
\left[C_{1,\theta}(t,x),\dots,C_{m,\theta}(t,x)\right]$$

并构造每个物种的残差：

$$r_i(t,x;\theta)=
\frac{\partial C_{i,\theta}}{\partial t}
+ \nabla\cdot(\mathbf{v} C_{i,\theta})
- \nabla\cdot(\mathbf{D}_i\nabla C_{i,\theta})
- R_i(\mathbf{C}_\theta;\mathbf{k})$$

总的连续物理残差为：

$$\mathcal{L}_{pde}=
\frac{1}{mN_f}\sum_{i=1}^{m}\sum_{j=1}^{N_f}
|r_i(t_j,x_j;\theta)|^2$$

##### 自适应 RK 约束

ASR-PINN 的关键是把时间推进写成 RK 一致性约束。设 \(\mathbf{F}(\mathbf{C},t,x)\) 表示反应输运方程右端，\(s\) 阶 RK 阶段满足：

$$\mathbf{C}^{(q)}=\mathbf{C}^{n}
+h_n\sum_{j=1}^{s}a_{qj}\mathbf{F}(\mathbf{C}^{(j)},t_n+c_jh_n,x)$$

高阶和低阶嵌入更新为：

$$\mathbf{C}_{high}^{n+1}=\mathbf{C}^{n}
+h_n\sum_{q=1}^{s}b_q\mathbf{F}(\mathbf{C}^{(q)},t_n+c_qh_n,x)$$

$$\mathbf{C}_{low}^{n+1}=\mathbf{C}^{n}
+h_n\sum_{q=1}^{s}\hat{b}_q\mathbf{F}(\mathbf{C}^{(q)},t_n+c_qh_n,x)$$

局部误差估计：

$$e_n=
\left\|
\frac{\mathbf{C}_{high}^{n+1}-\mathbf{C}_{low}^{n+1}}
{\mathrm{atol}+\mathrm{rtol}\max(|\mathbf{C}^{n}|,|\mathbf{C}_{high}^{n+1}|)}
\right\|$$

步长更新：

$$h_{n+1}=\eta h_n e_n^{-1/(p+1)}$$

其中 \(\eta\in(0,1)\) 是安全因子，\(p\) 是低阶方法阶数。若 \(e_n>1\)，当前步长被拒绝并缩小；若 \(e_n\le 1\)，接受该步长并把 RK 一致性加入训练损失：

$$\mathcal{L}_{rk}=
\frac{1}{N_x}\sum_{j=1}^{N_x}
\left\|
\mathbf{C}_\theta(t_n+h_n,x_j)-\mathbf{C}_{high}^{n+1}(x_j)
\right\|^2$$

##### 总损失与训练直觉

一个合理的 ASR-PINN 总损失可写为：

$$\mathcal{L}=
\lambda_{pde}\mathcal{L}_{pde}
+\lambda_{rk}\mathcal{L}_{rk}
+\lambda_{ic}\mathcal{L}_{ic}
+\lambda_{bc}\mathcal{L}_{bc}
+\lambda_{obs}\mathcal{L}_{obs}$$

其中：

$$\mathcal{L}_{ic}=\frac{1}{N_0}\sum_j\|\mathbf{C}_\theta(0,x_j)-\mathbf{C}_0(x_j)\|^2$$

$$\mathcal{L}_{bc}=\frac{1}{N_b}\sum_j\|\mathcal{B}[\mathbf{C}_\theta](t_j,x_j)-g_b(t_j,x_j)\|^2$$

自适应 RK 的直觉是：反应输运问题的困难往往集中在少数时间段，例如污染物前沿刚进入观测截面、快速反应消耗、或分支反应导致浓度突变。固定步长 PINN 必须在所有时间段使用同样的时间分辨率；连续时间 PINN 虽然无显式步长，但会把全时域残差混在一起，容易在刚性局部欠拟合。ASR-PINN 用误差控制把训练重点自动放到难时间段。

##### 与标准 PINN 的区别

| 方面 | 标准连续时间 PINN | 固定步长 RK-PINN | ASR-PINN |
|------|------------------|------------------|----------|
| 时间处理 | 随机采样 \((t,x)\) 残差 | 固定 \(\Delta t\) 的 RK 阶段 | 按误差自适应 \(\Delta t_n\) |
| 难点处理 | 依赖采样密度和损失权重 | 依赖人工选步长 | 误差大时自动缩步 |
| 反应刚性 | 容易平均化误差 | 小步稳定但成本高 | 局部小步，全局省步 |
| 多物种耦合 | PDE 残差耦合 | RK 阶段耦合 | RK 阶段 + 误差控制耦合 |

> ⚠️ 注意：由于正式全文不可访问，以上是对 ASR-PINN 题名所指“adaptive step-size Runge-Kutta + PINN”机制的保守重构；具体采用 Dormand-Prince、Bogacki-Shampine、Cash-Karp 还是 step-doubling，需要以论文正文为准。

#### 🧪 练习题
```yaml
question: "ASR-PINN 中自适应步长机制的主要作用是什么？"
options:
  - "减少网络输出的物种数量"
  - "根据局部时间推进误差动态调整步长，以稳定反应输运训练"
  - "用卷积层替代全连接层"
  - "删除 PDE 残差，只拟合观测浓度"
answer: 1
explain: "自适应 RK 通过比较高低阶更新或等价误差估计决定接受、拒绝和调整步长，使反应剧烈或前沿陡峭的时间段获得更细分辨率。"
```

### MS-PINN

```yaml
id: ms_pinn
num: 13
name: MS-PINN
full_name: 多场耦合物理信息神经网络 (Multi-field coupled PINN)
year: '2026'
org: 大连理工大学
parent: pinn
paper_url: https://arxiv.org/abs/2601.mspinn
project_url: ''
category: pinn_family
motivation: 金属凝固多场耦合演化建模
```

#### 📝 一句话总结
MS-PINN 将金属凝固中的速度场、温度场和压力场放入同一个 PINN 框架，用 Fourier 特征编码、自动微分物理残差、自适应损失和残差自适应采样共同约束多场耦合演化，解决传统 PINN 在凝固过程高频梯度、强耦合和局部误差区域上的训练困难。

#### 🎯 核心要点
- **多场联合预测**：网络以 \((x,y,t)\) 为输入，联合输出 \((u,v,T,p)\)，同时约束动量方程、连续性方程和能量方程
- **金属凝固物理残差**：显式使用密度 \(\rho\)、黏度 \(\mu\)、比热 \(C_p\)、导热系数 \(k\)，构造 Navier-Stokes 残差与热传导-对流残差
- **Fourier Feature Encoding (FFE)**：对空间和时间分别使用多尺度正弦/余弦映射，增强网络表达高频温度梯度与局部流动结构的能力
- **Self-Adaptive Loss (SAL)**：将 PDE 残差和边界/观测误差放入可学习不确定性权重中，减少手工调 loss 权重的依赖
- **Residual Adaptive Refinement (RAR/RAD)**：周期性在全域采样候选点，根据物理残差补充配点，使训练更关注误差集中的局部区域
- **NeuroPDE 软件化实现**：作者公开仓库将 PINN 训练、回调、可视化、checkpoint、RAR 与自适应损失模块化，便于扩展到 Burgers、扩散、Navier-Stokes 等 PDE
- **来源限制**：任务给出的 arXiv 链接 `https://arxiv.org/abs/2601.mspinn` 不可访问；可追溯到的正式条目为 Computers & Mathematics with Applications 207:60-78, DOI `10.1016/j.camwa.2026.01.015`，方法细节主要来自作者公开 GitHub 仓库

#### 🔬 深入细节
##### 图示与可访问来源

![MS-PINN 总体架构](https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/pinn.png)
*图：作者公开仓库中的 MS-PINN 架构。输入空间位置和时间，经过 FFE 与神经网络得到物理状态，自动微分生成 PDE、边界和初始条件损失，并通过 SAL/RAR 提升关键区域精度。*

![NeuroPDE 软件架构](https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/softarc.png)
*图：NeuroPDE 的插件式训练框架，RAR、自适应损失、checkpoint 与可视化均通过训练回调插入。*

可访问来源说明：论文元信息可在 ResearchGate 条目 `https://www.researchgate.net/publication/403350092_MS-PINN_A_physics-informed_neural_network_for_multi-field_coupled_evolution_modeling_in_metal_solidification` 和 Mindat 索引 `https://www.mindat.org/reference.php?id=19598472` 查到；方法图、训练入口和模块代码来自作者仓库 `https://github.com/baichen99/PINN-Software`。由于论文全文未开放抓取，下述公式级解读以公开代码和 README 为主。

##### 算法伪代码

```python
# MS-PINN 训练逻辑简化版
def pde_residual(u, v, T, p, x, y, t):
    Cp, k = 448.0, 401.0
    rho, mu = 8920.0, 0.0032

    h = Cp * T
    r_energy = rho * (d(h, t) + u * d(h, x) + v * d(h, y)) \
               - k * (d2(T, x) + d2(T, y))

    r_u = d(u, t) + u * d(u, x) + v * d(u, y) \
          - mu / rho * (d2(u, x) + d2(u, y)) + d(p, x) / rho
    r_v = d(v, t) + u * d(v, x) + v * d(v, y) \
          - mu / rho * (d2(v, x) + d2(v, y)) + d(p, y) / rho
    r_c = d(u, x) + d(v, y)
    return [r_u, r_v, r_c, r_energy]

model = MLPWithFFE(
    input=(x, y, t),
    spatial_sigmas=[10, 1, 0.1, 0.01, 0.001, 0.0001],
    temporal_sigmas=[1, 0.1, 0.01],
    hidden_layers=[50] * 5,
    outputs=[u, v, T, p],
)

for epoch in range(25000):
    state = model(collocation_points)
    residual = pde_residual(*state, x, y, t)
    loss_pde = mean_square(residual, weights=[10, 10, 1, 1])
    loss_bc = mean_square(model(boundary_points)[:, supervised_dims] - bc_values,
                          weights=[1000, 1000])
    loss = self_adaptive_loss(loss_pde, loss_bc)
    update_network_with_adam(loss)

    if epoch % 1000 == 0:
        candidates = uniform_sample(domain, 5000)
        new_points = select_residual_refinement_points(candidates, top_k=50)
        collocation_points.add(new_points)
```

##### 多场耦合残差如何构造

MS-PINN 的核心不是单独预测温度或速度，而是把金属凝固中的热-流耦合关系写成同一个神经网络的物理残差。网络输出可记为

$$
\hat{\mathbf{s}}_\theta(x,y,t)=\big(u_\theta(x,y,t), v_\theta(x,y,t), T_\theta(x,y,t), p_\theta(x,y,t)\big).
$$

其中 \(u,v\) 是二维速度分量，\(T\) 是温度，\(p\) 是压力。公开训练脚本中采用的动量残差为

$$
r_u =
u_t + u u_x + v u_y
- \frac{\mu}{\rho}(u_{xx}+u_{yy})
+ \frac{1}{\rho}p_x,
$$

$$
r_v =
v_t + u v_x + v v_y
- \frac{\mu}{\rho}(v_{xx}+v_{yy})
+ \frac{1}{\rho}p_y,
$$

连续性残差为

$$
r_c = u_x + v_y.
$$

能量方程将焓近似写成 \(h=C_pT\)，残差为

$$
r_T =
\rho\left(h_t + u h_x + v h_y\right)
- k\left(T_{xx}+T_{yy}\right).
$$

> 💡 关键：所有导数都由自动微分从同一个网络输出得到，所以速度、压力和温度不会被分别拟合后再拼接，而是在反向传播中共享一组参数和互相牵制的物理约束。

##### Fourier 特征与空间-时间分解

金属凝固常见局部高温梯度、液固界面附近快速变化和局部流动结构，普通 MLP 的低频偏置容易把这些变化抹平。MS-PINN 的公开实现使用 `MLPWithFFE`，对空间 \(\mathbf{x}=(x,y)\) 和时间 \(t\) 分别构造多尺度 Fourier 特征：

$$
\gamma_{\sigma_x}(\mathbf{x}) =
\left[\sin(\mathbf{x}W_{\sigma_x}),\ \cos(\mathbf{x}W_{\sigma_x})\right],
\quad
\gamma_{\sigma_t}(t) =
\left[\sin(tW_{\sigma_t}),\ \cos(tW_{\sigma_t})\right].
$$

实现中会对多个 \(\sigma\) 的特征逐元素相乘，形成空间特征 \(H_x\) 与时间特征 \(H_t\)，再经共享 MLP 编码并相乘融合：

$$
H = \operatorname{MLP}_x(H_x)\odot \operatorname{MLP}_t(H_t),
\quad
\hat{\mathbf{s}}_\theta = \operatorname{Linear}(H).
$$

这种做法的直觉是：空间高频与时间高频先分别展开，再通过乘性融合表达“某个局部区域在某个时间阶段发生快速变化”的耦合模式，比简单拼接 \((x,y,t)\) 更适合相变和流动共同演化的场景。

##### 损失函数与自适应权重

基础损失可以写成

$$
\mathcal{L}_{pde}
=
\sum_{q\in\{u,v,c,T\}} \omega_q
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left|r_q(x_i,y_i,t_i)\right|^2,
$$

$$
\mathcal{L}_{bc}
=
\sum_j \beta_j
\frac{1}{N_b}\sum_{i=1}^{N_b}
\left|\hat{s}_{\theta,j}(x_i,y_i,t_i)-s_{j,i}^{bc}\right|^2.
$$

公开代码还启用了 self-adaptive loss，将 PDE 与边界误差放入可学习尺度参数中：

$$
\mathcal{L}
=
\frac{1}{2\exp(2s_1)}\mathcal{L}_{pde}
+
\frac{1}{2\exp(2s_2)}\mathcal{L}_{bc}
+ s_1+s_2.
$$

当某一类损失数值大且难优化时，可学习尺度会动态调整其影响，避免固定权重下“边界项压过 PDE”或“PDE 项压过数据”的问题。对金属凝固这类多场问题，这一点很重要，因为动量、连续性、能量方程的量纲和数值范围差异明显。

##### RAR/RAD 如何补点

PINN 的配点如果均匀撒在全域，局部界面、边界层或高梯度区域可能采样不足。MS-PINN 启用残差自适应补点：每隔固定 epoch 在 \([0,0.05]\times[0,0.05]\times[0,5]\) 的时空域重新采样候选点，计算这些点的 PDE 残差，并把选中的候选点追加到配点集合。

这一机制的物理意义是把训练预算从“已经满足方程的平滑区域”转移到“方程违反更明显的区域”。在凝固建模里，这通常对应温度快速变化、流动剪切更强或压力-速度耦合更难满足的位置。

##### 与普通 PINN 的区别

普通 PINN 通常写成一个标量场或少量变量的残差最小化问题，而 MS-PINN 的重点是多场耦合和工程过程建模。它不仅要求每个场分别拟合边界/观测数据，还要求速度、压力和温度在相同配点上共同满足动量守恒、质量守恒和能量守恒。

与“先用 CFD 生成数据、再训练代理模型”的流程相比，MS-PINN 的物理残差让无标签配点也参与训练，理论上可以减少对高密度 CFD 标签的依赖。与传统 CFD 相比，它牺牲了严格网格离散求解的确定性，换取可微、可快速推理、可与稀疏观测融合的神经场表达。

> ⚠️ 注意：由于可访问来源主要是公开仓库而不是论文全文，实验误差、消融表格和正式论文中的全部设定无法在此核验；本文只对公开可验证的方法机制作解读。

#### 🧪 练习题
```yaml
question: "MS-PINN 中 Fourier Feature Encoding 的主要作用是什么？"
options:
  - "把 PDE 残差替换成纯数据监督损失"
  - "增强网络表示空间和时间高频变化的能力"
  - "直接生成 CFD 网格并求解线性方程组"
  - "把温度场从模型输出中移除"
answer: 1
explain: "公开实现对空间和时间分别使用多尺度 sin/cos 映射，再经 MLP 融合，用于缓解普通 MLP 的低频偏置，更好表达凝固过程中的局部高梯度和瞬态变化。"
```

### DC-PINNs

```yaml
id: dc_pinns
num: 14
name: DC-PINNs
full_name: 导数约束物理信息神经网络 (Derivative-Constrained PINNs)
year: '2026'
org: arXiv
parent: pinn
paper_url: https://journals.aps.org/pre/abstract/10.1103/PhysRevE.111.015303
project_url: ''
category: pinn_family
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

### SIMPLE-PINN

```yaml
id: simple_pinn
num: 15
name: SIMPLE-PINN
full_name: SIMPLE算法物理信息神经网络 (SIMPLE algorithm based PINN)
year: '2026'
org: ResearchGate
parent: pinn
paper_url: https://www.researchgate.net/publication/385794553
project_url: ''
category: pinn_family
motivation: 引入CFD压力修正逻辑
```

#### 📝 一句话总结
SIMPLE-PINN 将 CFD 中 SIMPLE 算法的压力-速度修正思想转化为 PINN 的额外残差修正损失，使网络在训练时持续强化不可压缩 Navier-Stokes 方程中的速度-压力耦合，从而改善高 Reynolds 数、长时间涡脱落和复杂几何流动中的收敛稳定性。

#### 🎯 核心要点
- **压力-速度修正损失**：从 SIMPLE 的压力修正、速度修正关系推导 \(RC_p, RC_u, RC_v\)，加入 PINN 总损失
- **不可压缩 N-S 主任务**：网络预测 \([u_\theta(x,y,t),v_\theta(x,y,t),p_\theta(x,y,t)]\)，同时约束质量守恒和动量守恒
- **简化 FVM 残差**：在规则流体内部点使用有限体积模板计算 PDE 残差，提高对局部通量平衡的表达
- **AD + FVM 混合策略**：靠近不规则边界时改用自动微分残差，避免 FVM 邻点落入固体区域造成 stencil 失效
- **二阶外推避免未来值不可用**：训练中用 \(q^{n+1}\approx 2q^n-q^{n-1}\) 估计修正损失所需的下一步量
- **频率退火映射与分支 MLP**：输入 \((t,x,y)\) 先映射到高维频率特征，再进入共享层与变量专属输出层
- **强非线性基准**：论文报告了高 Re lid-driven cavity、wavy channel、NACA0012 翼型、多方柱、圆柱绕流和 Rayleigh-Taylor 多物理问题
- **来源限制**：任务给出的 ResearchGate 链接实际解析到一篇制裁法文章；可访问论文为 arXiv:2603.24013

#### 🔬 深入细节
##### 图示与可访问来源

![SIMPLE-PINN 框架图](https://arxiv.org/html/2603.24013v1/pictures/fig1.png)
*图：论文 Figure 1，展示 SIMPLE-PINN 框架、高 Reynolds 数方腔流、圆柱绕流长时间预测和多物理耦合示例。*

![复杂几何中的 FVM 与 AD 混合策略](https://arxiv.org/html/2603.24013v1/pictures/FVM_AD.png)
*图：论文 Figure 3。内部规则点使用简化 FVM 残差，靠近任意形状固体边界的点使用 AD 残差，边界点单独施加软约束。*

可访问来源说明：真实论文条目为 `https://arxiv.org/abs/2603.24013`，HTML 全文为 `https://arxiv.org/html/2603.24013v1`，题名为 *Bridging Computational Fluid Dynamics Algorithm and Physics-Informed Learning: SIMPLE-PINN for Incompressible Navier-Stokes Equations*。任务中的 ResearchGate URL `385794553` 与该论文不匹配，因此本文按可访问 arXiv 论文解读。

##### 算法伪代码

```python
# SIMPLE-PINN 训练逻辑简化版
initialize network u_theta, v_theta, p_theta
cache previous predictions q_prev = None

for step in range(max_steps):
    # 1. 采样内部点、边界点和复杂几何附近点
    points_fvm, points_ad, points_bc = sample_domain()

    # 2. 规则内部点：用简化 FVM 模板计算连续性和动量残差
    Res_c, Res_u, Res_v = finite_volume_residual(
        network, points_fvm, neighbors=["E", "W", "N", "S"]
    )

    # 3. 不规则边界邻域：改用自动微分 PDE 残差
    Res_ad = autodiff_navier_stokes_residual(network, points_ad)

    # 4. SIMPLE 启发的压力/速度修正
    q_now = network(points_fvm)
    q_next = 2 * q_now - q_prev if q_prev is not None else q_now
    R_p, R_u, R_v = simple_correction_terms(network, points_fvm)
    RC_p = mean_abs(q_next.p - q_now.p - alpha_p * R_p)
    RC_u = mean_abs(q_next.u - q_now.u - alpha_u * R_u)
    RC_v = mean_abs(q_next.v - q_now.v - alpha_v * R_v)

    # 5. 总损失
    loss = W_pde * (Res_c + Res_u + Res_v + Res_ad) \
           + W_bc * boundary_loss(network, points_bc) \
           + W_rc * (RC_p + RC_u + RC_v)
    update_network_with_adam(loss)
    q_prev = stop_gradient(q_now)
```

##### 标准 PINN 在流体问题中的痛点

二维不可压缩 Navier-Stokes 方程写作

$$
\frac{\partial u}{\partial x}+\frac{\partial v}{\partial y}=0,
$$

$$
\frac{\partial u}{\partial t}
+\frac{\partial(uu)}{\partial x}
+\frac{\partial(vu)}{\partial y}
=
\frac{1}{Re}\left(
\frac{\partial^2u}{\partial x^2}
+\frac{\partial^2u}{\partial y^2}
\right)
-\frac{\partial p}{\partial x},
$$

$$
\frac{\partial v}{\partial t}
+\frac{\partial(uv)}{\partial x}
+\frac{\partial(vv)}{\partial y}
=
\frac{1}{Re}\left(
\frac{\partial^2v}{\partial x^2}
+\frac{\partial^2v}{\partial y^2}
\right)
-\frac{\partial p}{\partial y}.
$$

普通 PINN 会把连续性残差、动量残差、边界条件和初值条件加权求和：

$$
\mathcal{L}
=
W_{\mathrm{PDE}}\mathcal{L}_{\mathrm{PDE}}
+W_{\mathrm{IC}}\mathcal{L}_{\mathrm{IC}}
+W_{\mathrm{BC}}\mathcal{L}_{\mathrm{BC}}.
$$

问题在于速度和压力之间没有像 CFD 压力修正算法那样的显式迭代耦合。高 \(Re\) 或长时间非定常流中，网络可能把动量残差和连续性残差分别压低一点，但速度场仍然存在局部散度误差，压力场也不能稳定地驱动速度修正。

##### SIMPLE 思想如何变成 PINN loss

经典 SIMPLE 算法通过压力修正 \(p'\) 迭代修正速度，使离散连续性方程逐步满足。SIMPLE-PINN 不直接运行 CFD 线性求解器，而是把这种修正关系改写成可微的损失项。论文将修正写成松弛形式：

$$
p_P^{n+1}=p_P^n+\alpha_p R_p,
\quad
u_P^{n+1}=u_P^n+\alpha_u R_u,
\quad
v_P^{n+1}=v_P^n+\alpha_v R_v.
$$

其中 \(R_p,R_u,R_v\) 来自离散动量残差、连续性残差和相邻控制体压力/速度项；\(\alpha_p,\alpha_u,\alpha_v\) 是松弛因子，用来避免修正过大导致训练震荡。

对应的残差修正损失为

$$
L_{rc,p}
=
\frac{1}{N_{rc}}
\left\|
p_P^{n+1}-p_P^n-\alpha_pR_p
\right\|_{L^1(\Omega\times(0,T])},
$$

$$
L_{rc,u}
=
\frac{1}{N_{rc}}
\left\|
u_P^{n+1}-u_P^n-\alpha_uR_u
\right\|_{L^1(\Omega\times(0,T])},
$$

$$
L_{rc,v}
=
\frac{1}{N_{rc}}
\left\|
v_P^{n+1}-v_P^n-\alpha_vR_v
\right\|_{L^1(\Omega\times(0,T])}.
$$

训练时 \(n+1\) 的值不能直接访问，论文用二阶外推估计：

$$
p_P^{n+1}\approx 2p_P^n-p_P^{n-1},
\quad
u^{n+1}\approx 2u^n-u^{n-1},
\quad
v^{n+1}\approx 2v^n-v^{n-1}.
$$

所以最终加入训练的修正项等价于要求“本轮预测相对上一轮预测的变化”接近 SIMPLE 推导出的物理修正方向。

> 💡 关键：这不是把 SIMPLE 算法外接在 PINN 后处理，而是把 SIMPLE 的压力-速度耦合方向变成反向传播中的损失梯度。

##### 简化 FVM 与 AD 混合残差

SIMPLE-PINN 的 PDE 残差不是只靠自动微分。对规则内部点，它使用控制体周围 E/W/N/S 邻点构造简化有限体积残差，例如连续性残差可理解为控制体表面的通量不平衡：

$$
Res_c
=
\frac{1}{N_{\mathrm{PDE}}}
\left\|
u_e-u_w+v_n-v_s
\right\|_{L^2}.
$$

动量残差则包含中心点、邻点和边界/压力项：

$$
Res_u
=
\frac{1}{N_{\mathrm{PDE}}}
\left\|
\left(\frac{\Delta x\Delta y}{\delta t}+a_P\right)u_P^n
+\sum a_{NB}u_{NB}^n
+\sum a_{nb}^n u_{nb}^n
+b_{P,u}^n
\right\|_{L^2},
$$

\(Res_v\) 对 \(v\) 同理。

在复杂几何附近，如果某个内部点的四邻点落入固体区域，FVM stencil 就失效。论文因此把点分为三类：普通流体内部点用简化 FVM，靠近固体边界的红色点用 AD 残差，边界点施加边界损失。这种混合策略保留了 FVM 的局部守恒结构，又避免了复杂几何下生成高质量网格的负担。

##### 总损失结构

SIMPLE-PINN 的训练目标可以概括为

$$
\mathcal{L}_{\mathrm{SIMPLE}}
=
\mathcal{L}_{\mathrm{BC}}
+\mathcal{L}_{\mathrm{IC}}
+W_{\mathrm{PDE}}
\left(Res_c+Res_u+Res_v+Res_{\mathrm{AD}}\right)
+W_{\mathrm{RC}}
\left(RC_p+RC_u+RC_v\right).
$$

其中 \(RC_p,RC_u,RC_v\) 是 SIMPLE 压力-速度修正项，\(Res_{\mathrm{AD}}\) 只在复杂几何附近补充。与只堆 PDE residual 的 PINN 相比，这个 loss 同时约束“方程是否成立”和“速度压力应该如何一起被修正”。

##### 网络结构与训练设置

论文使用 MLP 作为主干。输入层先用 frequency annealing mapping 将 \((t,x,y)\) 投影到高维频率空间，以提高对边界层、涡结构和高频扰动的表达能力。随后是共享隐藏层，再接变量专属分支输出 \(u,v,p\)；Rayleigh-Taylor 问题额外输出温度 \(T\)。训练使用 Adam 和 warmup cosine decay 学习率策略。

论文报告的代表性结果包括：在无数据监督条件下求解 \(Re=20000\) 的 lid-driven cavity flow，用 448 秒得到结果；圆柱绕流可预测 \(t=0\) 到 \(100\) 的涡脱落长期演化。这里的重点不是替代所有 CFD 求解器，而是把 CFD 的数值算法知识嵌入神经网络训练，使 PINN 在强非线性流动上更像一个带数值先验的神经求解器。

#### 🧪 练习题
```yaml
question: "SIMPLE-PINN 相比普通 PINN 增加 RC_p、RC_u、RC_v 的主要目的是什么？"
options:
  - "减少网络输出变量，只保留压力"
  - "把 SIMPLE 的压力-速度修正关系转化为训练损失，强化不可压缩流中的耦合约束"
  - "完全取消 Navier-Stokes 方程残差"
  - "只用于可视化，不参与反向传播"
answer: 1
explain: "RC_p、RC_u、RC_v 来自 SIMPLE 修正关系，作为额外 loss 引导速度和压力按满足连续性的方向共同更新，从而改善训练稳定性和收敛速度。"
```

### DeepONet

```yaml
id: deeponet
num: 16
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: 布朗大学
parent: —
paper_url: https://www.nature.com/articles/s42256-021-00302-5
project_url: ''
category: operators
motivation: Branch-Trunk网络解耦输入与坐标
```

#### 📝 一句话总结
DeepONet 基于算子万能逼近定理，提出由 Branch Net（编码输入函数）和 Trunk Net（编码输出坐标）组成的双子网络架构，首次在实践中高效学习非线性算子（函数到函数的映射），在 ODE/PDE 问题上实现了远优于全连接网络的泛化精度，并观测到关于训练数据量的指数级误差收敛。

#### 🎯 核心要点
- **理论基础**：基于 Chen & Chen (1995) 的算子万能逼近定理（Theorem 1），证明单隐层网络可逼近任意非线性连续算子
- **双子网络架构**：Branch Net 编码输入函数 \(u\) 在 \(m\) 个固定 sensor 处的离散值 \([u(x_1), \dots, u(x_m)]\)；Trunk Net 编码输出函数的求值位置 \(y\)
- **两种变体**：Stacked DeepONet（\(p\) 个独立 branch 网络）和 Unstacked DeepONet（单个 branch 网络输出 \(p\) 维向量），后者参数更少、泛化更好
- **输出融合**：通过内积 \(G(u)(y) \approx \sum_{k=1}^{p} b_k \cdot t_k + b_0\) 合并两个子网络输出，添加 bias 项可显著降低误差
- **泛化优势**：相比 FNN 基线，DeepONet 的泛化误差大幅减小；在反导数算子、非线性 ODE、扩散-反应 PDE 和 advection PDE 等 4 类问题上均表现优异
- **收敛速率**：观测到关于训练数据量的多项式（半阶到四阶）乃至指数级误差收敛，为深度学习领域首次报告指数收敛
- **灵活的数据约束**：仅要求输入函数在相同 sensor 位置采样，对输出位置 \(y\) 无任何网格或数量限制

#### 🔬 深入细节
![DeepONet 架构示意图](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：(A) DeepONet 整体架构——Branch Net 接收输入函数在 sensors 处的值，Trunk Net 接收输出位置 y，二者输出通过内积合并得到 G(u)(y)。(B) 训练数据结构：所有输入函数共享相同 sensor 位置，但输出位置可任意。(C) Stacked DeepONet：p 个独立 branch 网络。(D) Unstacked DeepONet：单个 branch 网络输出 p 维向量。*

```python
# DeepONet 前向传播伪代码（Unstacked 版本）
def deeponet_forward(u_sensors, y, branch_net, trunk_net):
    """
    u_sensors: [batch, m]   — 输入函数在 m 个 sensor 处的值
    y:         [batch, d_y] — 输出函数的求值坐标
    """
    # Branch Net: 编码输入函数 → p 维特征
    b = branch_net(u_sensors)          # [batch, p]

    # Trunk Net: 编码输出位置 → p 维基函数
    t = trunk_net(y)                   # [batch, p]

    # 内积融合 + bias
    output = torch.sum(b * t, dim=-1)  # [batch]
    output = output + bias             # 可学习标量 bias
    return output                      # ≈ G(u)(y)

# 训练循环
for epoch in range(num_epochs):
    for (u_batch, y_batch, Gu_y_batch) in dataloader:
        pred = deeponet_forward(u_batch, y_batch, branch_net, trunk_net)
        loss = MSE(pred, Gu_y_batch)
        loss.backward()
        optimizer.step()
```

##### 动机与背景

传统神经网络学习的是**函数**（向量到向量的映射），而科学计算中大量问题本质上是**算子**学习——给定一个输入函数 \(u\)（如初始条件、外力场、边界条件），求解对应的输出函数 \(G(u)\)（如 PDE 的解）。Chen & Chen (1995) 的万能逼近定理证明了神经网络具备逼近任意非线性连续算子的能力，但该定理仅保证了足够大网络的逼近误差，未考虑实际训练中同样关键的**优化误差**和**泛化误差**。

> 💡 关键：总误差 = 逼近误差 + 优化误差 + 泛化误差。万能逼近定理只控制第一项，DeepONet 通过架构设计同时压低后两项。

##### 核心机制

**1. 算子万能逼近定理（Theorem 1）**

对于任意非线性连续算子 \(G: V \to C(\mathbb{R}^d)\)，存在 \(m\) 个 sensor 点 \(x_1, \dots, x_m\) 和网络参数，使得：

$$G(u)(y) \approx \sum_{k=1}^{p} \underbrace{\sigma\!\left(\sum_{j=1}^{m} \xi_k^j \, u(x_j) + \theta_k\right)}_{\text{Branch Net 第 } k \text{ 个输出 } b_k} \cdot \underbrace{\sigma\!\left(\boldsymbol{w}_k \cdot y + \zeta_k\right)}_{\text{Trunk Net 第 } k \text{ 个输出 } t_k}$$

其中 \(\sigma\) 为激活函数。这一公式自然地将网络分解为两个子网络：
- **Branch Net**：以 \([u(x_1), \dots, u(x_m)]\) 为输入，输出 \([b_1, \dots, b_p]\)，编码输入函数的"特征"
- **Trunk Net**：以 \(y\) 为输入，输出 \([t_1, \dots, t_p]\)，可理解为一组在 \(y\) 处求值的**可学习基函数**

**2. Stacked vs. Unstacked 架构**

- **Stacked DeepONet**：严格遵循定理结构，使用 \(p\) 个独立的 branch 网络，每个输出一个标量 \(b_k\)。参数量为 \(O(p \times m \times w)\)，其中 \(w\) 为隐层宽度。
- **Unstacked DeepONet**：使用单个 branch 网络，最后一层输出 \(p\) 维向量。参数量约为 \(O(m \times w + w \times p)\)，远少于 stacked 版本。实验表明 unstacked 版本虽然训练误差略大，但**泛化误差更小**，总体测试误差更优。

**3. Bias 的重要性**

在输出公式中添加可学习 bias \(b_0\)：

$$G(u)(y) \approx \sum_{k=1}^{p} b_k \, t_k + b_0$$

实验证明添加 bias 可同时降低训练误差和测试误差，且使训练更稳定（方差更小）。

> ⚠️ 注意：这里的 bias 不是普通神经网络层的 bias，而是在 branch-trunk 内积之后额外添加的全局偏置项。

##### 训练与数据流

**数据格式**：训练集由三元组 \(\{(u^{(i)}, y^{(i,j)}, G(u^{(i)})(y^{(i,j)}))\}\) 组成。关键约束是所有输入函数 \(u^{(i)}\) 必须在**相同的 \(m\) 个 sensor 位置**采样，但输出位置 \(y^{(i,j)}\) 可以任意分布、数量不同。

**损失函数**：标准均方误差（MSE）：

$$\mathcal{L} = \frac{1}{N} \sum_{i,j} \left| G_\theta(u^{(i)})(y^{(i,j)}) - G(u^{(i)})(y^{(i,j)}) \right|^2$$

**数据生成**：输入函数从高斯随机场（GRF）或切比雪夫多项式空间中采样，输出通过数值求解器（如 Runge-Kutta、有限差分）获得真值。

##### 与传统方法的区别

| 方面 | FNN 直接学习 | CNN 图像映射 | DeepONet |
|------|-------------|-------------|----------|
| 输入表示 | 拼接 \([u(x_1),\dots,u(x_m), y]\) | 网格化图像 | Branch + Trunk 分离 |
| 网格要求 | 无 | 等距网格 | sensor 固定即可，\(y\) 任意 |
| 泛化能力 | 差（大泛化误差） | 中等 | 优（归纳偏置压低泛化误差） |
| 理论保证 | 函数逼近定理 | 无 | 算子逼近定理 |
| 输出分辨率 | 固定 | 固定网格 | 连续（任意 \(y\) 可查询） |

DeepONet 的核心优势在于其**归纳偏置**：将输入函数编码与输出坐标编码解耦，使网络天然适配算子学习的结构，从而大幅降低泛化误差。

#### 🧪 练习题
```yaml
question: "DeepONet 中 Trunk Net 的输入和作用是什么？"
options:
  - "输入为函数 u 的离散值，作用是编码输入函数特征"
  - "输入为输出位置 y，作用是生成一组可学习基函数"
  - "输入为 PDE 的参数，作用是编码物理约束"
  - "输入为训练标签，作用是计算损失函数"
answer: 1
explain: "Trunk Net 以输出位置 y 为输入，输出 p 维向量 [t_1,...,t_p]，可理解为在 y 处求值的可学习基函数，与 Branch Net 输出通过内积融合得到最终预测。"
```

### FNO

```yaml
id: fno
num: 17
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2021'
org: Caltech
parent: —
paper_url: https://arxiv.org/abs/2010.08895
project_url: ''
category: operators
motivation: 傅里叶空间参数化积分核实现高效全局卷积
```

#### 📝 一句话总结
FNO 将神经算子中的积分核直接参数化到傅里叶空间，用少量低频模态的可学习复权重实现高效全局卷积，解决了传统 CNN/PDE surrogate 绑定固定网格、难以跨分辨率泛化的问题。

#### 🎯 核心要点
- **函数空间到函数空间映射**：直接学习 PDE 参数函数到解函数的算子 \(\mathcal{G}: a \mapsto u\)，而不是为每个 PDE 实例单独训练网络
- **Fourier layer**：每层由局部线性变换 \(Wv(x)\)、傅里叶域低模态线性变换 \(R\cdot \mathcal{F}(v)\)、逆变换和非线性激活组成
- **低模态截断**：只保留前 \(k_{\max}\) 个傅里叶模态，高频被截断，从而以少量参数表达全局相互作用
- **离散化不变性**：参数定义在频率模态上，同一组权重可在不同网格分辨率上评估，支持 zero-shot super-resolution
- **准线性复杂度**：均匀网格上通过 FFT 实现，主计算复杂度约为 \(O(n \log n)\)，显著快于直接积分核或完整图消息传递
- **标准结构**：输入先经 \(P\) lift 到高维通道，堆叠 4 个 Fourier layers，再经 \(Q\) project 回目标物理量
- **验证任务**：在 Burgers 方程、Darcy Flow、Navier-Stokes 湍流上优于 FCN、PCANN、GNO、MGNO、U-Net 等基线，并能在 Navier-Stokes 上做零样本超分辨率

#### 🔬 深入细节
##### 核心架构示意

![FNO 架构与 Fourier layer 示意图](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：FNO 的整体架构与 Fourier layer。输入函数先被 lift 到高维通道，随后每层在傅里叶域对低频模态做可学习线性变换，同时保留空间域局部线性支路，最后 project 到目标解函数。来源为 ar5iv 对 arXiv:2010.08895 的 HTML 渲染图。*

##### 算法伪代码

```python
# Fourier Neural Operator 前向传播伪代码
def spectral_conv(v, R, modes):
    # v: [batch, channels_in, *grid]
    v_hat = fftn(v)                                  # 进入频域
    out_hat = zeros_like_target_modes(v_hat, R)

    # 只在低频模态上学习复数线性变换
    for k in low_frequency_indices(modes):
        out_hat[:, :, k] = R[k] @ v_hat[:, :, k]     # channel mixing in Fourier space

    return ifftn(out_hat).real                       # 回到物理空间

def fno_forward(a, coords):
    # a: PDE 参数/初值/系数字段；coords: 网格坐标，用于保留位置信息
    v = P(concat(a, coords))                         # lift: R^{d_a+d_x} -> R^c

    for layer in range(L):
        global_term = spectral_conv(v, R[layer], modes)
        local_term = pointwise_linear[layer](v)       # W v(x)
        v = activation(global_term + local_term)

    u_pred = Q(v)                                    # project: R^c -> R^{d_u}
    return u_pred

for a_batch, u_batch in dataloader:
    pred = fno_forward(a_batch, coords)
    loss = relative_l2(pred, u_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

传统有限差分、有限元或谱方法需要对每个新的 PDE 参数实例重新求解；纯 CNN surrogate 虽然推理快，但本质上学习的是固定维度向量到固定维度向量的映射，网络结构和误差都强绑定训练分辨率。神经算子的目标是学习连续函数空间上的映射：给定参数函数 \(a(x)\)、初始场或边界条件，直接输出解函数 \(u(x)\)。这样训练一次后，新参数实例只需一次前向传播。

一般神经算子可写成迭代更新：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+(\mathcal{K}_{\phi}v_t)(x)\right),
$$

其中 \(Wv_t(x)\) 是点态局部变换，\(\mathcal{K}_{\phi}\) 是非局部积分算子：

$$
(\mathcal{K}_{\phi}v)(x)=\int_D \kappa_{\phi}(x,y)v(y)\,dy.
$$

GNO 用图消息传递近似这个积分，但在密集网格上成本较高。FNO 的关键假设是把积分核限制为平移不变卷积核 \(\kappa(x-y)\)，再利用卷积定理把积分计算变成傅里叶域乘法。

##### 核心机制：傅里叶域参数化积分核

FNO 的 Fourier layer 定义为：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+\mathcal{F}^{-1}\left(R_{\phi}\cdot \mathcal{F}(v_t)\right)(x)\right).
$$

这里 \(\mathcal{F}\) 和 \(\mathcal{F}^{-1}\) 分别是 Fourier transform 与 inverse Fourier transform，\(R_{\phi}\) 是可学习的复数权重张量。对第 \(k\) 个频率模态，频域线性变换可写为：

$$
\widehat{u}_{k,i}=\sum_{j=1}^{c_{\text{in}}} R_{k,i,j}\,\widehat{v}_{k,j},
\qquad |k|\le k_{\max}.
$$

当 \(|k|>k_{\max}\) 时，高频模态直接置零或不更新。这个设计有两个效果：第一，低频模态捕获 PDE 解中长程、全局、主导能量结构；第二，参数量与保留模态数相关，而不是与网格点数直接相关，因此同一组 \(R_k\) 可以在 \(64^2\)、\(128^2\)、\(256^2\) 等不同分辨率上复用。

> 💡 关键：FNO 不是把 FFT 当作预处理特征，而是把 Fourier transform 放进每一层，作为神经算子积分核的可学习计算方式。

##### 训练与数据流

完整 FNO 由三部分组成：

1. \(P\)：将输入 \((a(x), x)\) 从低维物理通道 lift 到宽通道表示 \(v_0(x)\)
2. 多个 Fourier layers：交替执行全局谱卷积、点态线性变换和非线性激活
3. \(Q\)：将最终隐藏场 \(v_T(x)\) project 为目标解 \(u(x)\)

训练通常最小化相对 \(L_2\) 误差：

$$
\mathcal{L}(\theta)=\frac{1}{N}\sum_{j=1}^{N}
\frac{\|\mathcal{G}_{\theta}(a_j)-u_j\|_2}{\|u_j\|_2}.
$$

论文实验中，模型学习 Burgers 方程的初值到终态映射、Darcy Flow 的扩散系数到压力场映射，以及 Navier-Stokes 的历史涡量场到未来涡量场映射。对时间依赖问题，FNO 可以用 2D 空间卷积自回归推进，也可以把空间-时间一起作为 3D 张量做 FNO-3d。

##### 与传统方法和 GNO 的区别

| 方法 | 非局部交互 | 网格依赖 | 计算特征 | 主要限制 |
|------|------------|----------|----------|----------|
| CNN/FCN | 依靠局部卷积堆叠扩大感受野 | 强依赖固定分辨率 | \(O(n)\) 局部卷积 | 跨分辨率泛化弱 |
| GNO | 图上消息传递近似积分核 | 可处理不规则点 | 边数相关，可能接近 \(O(n^2)\) | 大网格成本高 |
| FNO | FFT 实现全局卷积 | 频域参数可跨分辨率 | \(O(n\log n)\) | 标准形式偏好规则网格/周期边界 |

FNO 的优势来自“全局线性算子 + 局部非线性激活”的组合：谱卷积让每个位置一层内看到全域信息，非线性激活使多层组合能够表达非线性 PDE 解算子。它也有清晰限制：FFT 要求规则网格，复杂几何和非均匀网格需要后续 Geo-FNO、GNO 或插值/变形策略处理。

#### 🧪 练习题
```yaml
question: "FNO 中 Fourier layer 只学习低频模态权重的主要原因是什么？"
options:
  - "低频模态与 PDE 解的全局结构强相关，同时可减少参数量并支持跨分辨率评估"
  - "低频模态可以完全恢复任意非周期边界条件，因此不需要空间域分支"
  - "高频模态无法通过 FFT 计算，只能通过有限元方法获得"
  - "低频模态使网络退化为普通全连接网络，便于反向传播"
answer: 0
explain: "FNO 在频域对少量低频模态学习复数线性变换，既捕获主导全局结构，又让参数量与网格分辨率解耦；空间域的 W 分支和非线性激活补充局部与非线性表达。"
```

### GNO

```yaml
id: gno
num: 18
name: GNO
full_name: 图神经算子 (Graph Neural Operator)
year: '2020'
org: Caltech
parent: —
paper_url: https://arxiv.org/abs/2003.03485
project_url: ''
category: operators
motivation: 基于GNN处理非结构化网格
```

#### 📝 一句话总结
GNO 首次把神经算子具体实现为图核网络：在物理域采样点上构图，用消息传递近似连续积分核，从而学习 PDE 参数函数到解函数的离散化不变映射。

#### 🎯 核心要点
- **神经算子概念实例化**：学习 Banach 函数空间之间的算子 \(\mathcal{F}: \mathcal{A}\to\mathcal{U}\)，而不是固定维度数组映射
- **Green's function 直觉**：把 PDE 解算子看作积分核 \(u(x)=\int_D G_a(x,y)f(y)\,dy\)，用神经网络核 \(\kappa_{\phi}\) 学习非局部影响
- **图消息传递积分**：将空间点作为节点，边特征为 \((x,y,a(x),a(y))\)，用邻域聚合近似积分算子
- **连续半径构图**：节点连接由物理空间球 \(B(x,r)\) 决定，而不是固定 kNN，因此网格细化时邻域随物理半径自然扩展
- **Nyström 近似**：训练时重复采样 \(m\ll K\) 个节点形成子图，将大图核积分近似为随机子图上的 Monte Carlo/Nyström 估计
- **支持非结构化网格**：点云、有限元网格、随机采样点都可作为图节点，查询新位置时可把新点加入图并连边
- **实验场景**：重点验证二阶椭圆 PDE/Darcy 型问题的跨分辨率泛化、半监督采样和与 FCN、PCA+NN、RBM 等方法的比较

#### 🔬 深入细节
##### 核心图示与来源说明

![GNO 低分辨率训练到高分辨率评估示意图](https://ar5iv.labs.arxiv.org/html/2003.03485/assets/Figs/uai_16to241.png)
*图：Graph Kernel Network 在 \(16\times16\) 网格训练，并在 \(241\times241\) 网格上评估椭圆 PDE 解。该图来自 ar5iv 对 arXiv:2003.03485 源文件 `Figs/uai_16to241.png` 的公开渲染。*

##### 算法伪代码

```python
# Graph Neural Operator / Graph Kernel Network 伪代码
def build_graph(points, a_values, radius):
    edges = []
    for i, x in enumerate(points):
        for j, y in enumerate(points):
            if distance(x, y) <= radius:
                edge_feature = concat(x, y, a_values[i], a_values[j])
                edges.append((i, j, edge_feature))
    return edges

def gno_forward(points, a_values, a_smooth, grad_a_smooth, edges):
    # 初始特征包含坐标、系数、平滑系数及其梯度
    v = P(concat(points, a_values, a_smooth, grad_a_smooth)) + p

    for t in range(T):
        messages = zeros_like(v)
        degree = zeros(num_nodes)

        for i, j, e_ij in edges:
            K_ij = kernel_mlp_phi(e_ij)              # R^{2(d+1)} -> R^{n x n}
            messages[i] += K_ij @ v[j]
            degree[i] += 1

        messages = messages / clamp(degree, min=1)
        v = relu(W @ v + messages)

    u_pred = Q(v) + q                                # 投影回标量/向量解
    return u_pred

for a, u in training_pairs:
    for repeat in range(l):                          # Nyström 重采样
        sub_points = sample_nodes(points, m)
        sub_graph = build_graph(sub_points, a[sub_points], radius=r)
        pred = gno_forward(sub_points, a[sub_points], ..., sub_graph)
        loss = mse(normalize(pred), normalize(u[sub_points]))
        loss.backward()
        optimizer.step()
```

##### 动机与背景

标准 CNN surrogate 需要固定网格，输入和输出维度随分辨率改变而改变；PINN/Neural-FEM 虽然网格无关，但通常为每个新的 PDE 参数实例重新优化一个网络。GNO 试图在两者之间取一个函数空间视角：模型参数 \(\theta\) 定义在连续域上的积分核中，离散网格只是数值近似这个积分核的采样方式。

论文以参数化椭圆 PDE 为典型问题：

$$
-\nabla\cdot(a(x)\nabla u(x))=f(x),\quad x\in D,\qquad u(x)=0,\quad x\in\partial D.
$$

对固定 \(a\)，如果存在 Green's function \(G_a(x,y)\)，解可写作：

$$
u(x)=\int_D G_a(x,y)f(y)\,dy.
$$

GNO 的核心思想是用可学习核 \(\kappa_{\phi}(x,y,a(x),a(y))\) 替代未知的 Green's function/积分核，并通过图上的消息传递来近似积分。

##### 核心机制：从积分核到消息传递

连续形式的图核网络更新为：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+
\int_{B(x,r)}\kappa_{\phi}(x,y,a(x),a(y))v_t(y)\,dy\right).
$$

其中 \(v_t(x)\in\mathbb{R}^n\) 是第 \(t\) 层隐藏函数，\(W\) 是点态线性变换，\(\kappa_{\phi}\) 是一个 MLP 输出的 \(n\times n\) 矩阵。积分域限制在 \(B(x,r)\) 有两个目的：降低计算量，并利用椭圆算子 Green's function 的影响随距离衰减这一先验。

离散到图 \(G=(V,E)\) 后，上式成为平均聚合消息传递：

$$
v_{t+1}(x_i)=\sigma\left(
Wv_t(x_i)+\frac{1}{|N(x_i)|}\sum_{x_j\in N(x_i)}
\kappa_{\phi}(e_{ij})v_t(x_j)
\right),
$$

$$
e_{ij}=(x_i,x_j,a(x_i),a(x_j)).
$$

> 💡 关键：边是按连续物理半径 \(r\) 定义的。网格越细，球 \(B(x,r)\) 内节点越多，但半径本身不变，因此模型学习的是物理域上的核，而不是某个固定像素邻域。

##### 初始化、训练与 Nyström 采样

实际模型先把输入节点特征 lift 到隐藏通道：

$$
v_0(x)=P(x,a(x),a_{\epsilon}(x),\nabla a_{\epsilon}(x))+p,
$$

其中 \(a_{\epsilon}\) 是高斯平滑后的系数，\(\nabla a_{\epsilon}\) 帮助网络捕获材料界面、系数跳变等局部结构。经过 \(T\) 次消息传递后，输出层为：

$$
u_{\theta}(x)=Qv_T(x)+q.
$$

直接在 \(K\) 个节点上使用半径图仍可能产生接近 \(O(K^2)\) 的边数。论文因此使用随机 Nyström 近似：每个训练样本重复 \(l\) 次，每次采样 \(m\) 个节点形成子图，用这些子图近似完整核积分。训练复杂度变为约 \(O(lm^2)\)，论文报告 \(l=4, m=200\) 在 \(421^2\) 级别网格上已可工作。测试时若需要整张网格，可将目标网格分块成子图并分别评估。

##### 与 FNO、CNN 和传统降阶方法的区别

| 方法 | 表示对象 | 网格适应性 | 非局部建模 | 主要代价 |
|------|----------|------------|------------|----------|
| FCN/CNN | 固定数组映射 | 弱，常需固定分辨率 | 依赖多层局部卷积 | 跨网格泛化弱 |
| RBM/PCA+NN | 低维基/潜空间 | 对同一离散网格效果好 | 基函数全局 | 通常需要固定训练网格或 PDE 知识 |
| GNO | 连续积分核的图近似 | 强，可用非结构化节点 | 消息传递近似核积分 | 边数和采样策略敏感 |
| FNO | 傅里叶域卷积核 | 规则网格上强 | FFT 全局卷积 | 标准 FFT 不适合任意网格 |

GNO 是 FNO 的重要前身：它证明了“同一组参数在不同离散化之间共享”的神经算子路线可行，并自然支持非结构化网格；但它的全局/半全局核需要图边来承载，计算和存储随边数增长较快。FNO 后续用 FFT 替代图消息传递，在规则网格上显著提高效率；Geo-FNO 又把 FNO 通过几何变形扩展到一般几何。

#### 🧪 练习题
```yaml
question: "GNO 中按物理半径 B(x,r) 构图，而不是固定每个节点的 k 个最近邻，主要是为了什么？"
options:
  - "让邻域定义与连续物理域一致，从而在网格细化时保持同一个积分核解释"
  - "保证每个节点的度完全相同，便于使用批归一化"
  - "避免使用节点坐标，只依赖 PDE 系数 a(x)"
  - "把图消息传递退化成标准 3x3 卷积"
answer: 0
explain: "GNO 要近似连续积分算子，半径 r 定义在物理空间中，网格变细时邻域节点数自然增加但物理支持域不变，因此有利于跨分辨率泛化。"
```

### Geo-FNO

```yaml
id: geo_fno
num: 19
name: Geo-FNO
full_name: 几何感知傅里叶神经算子 (Geometry-aware FNO)
year: '2023'
org: Caltech
parent: fno
paper_url: https://arxiv.org/abs/2207.05209
project_url: ''
category: operators
motivation: 变形映射处理不规则物理域
```

#### 📝 一句话总结
Geo-FNO 在 FNO 前后加入可给定或可学习的几何变形，把不规则物理域映射到带均匀网格的计算域，在保留 FFT 高效性的同时让 FNO 适用于点云、非均匀网格和复杂工程几何。

#### 🎯 核心要点
- **解决 FNO 几何限制**：标准 FNO 依赖均匀矩形/周期网格上的 FFT，Geo-FNO 通过物理域到计算域的变形扩展到任意几何
- **计算域统一**：把物理域 \(D_a\) 映射到统一计算域 \(D^c\)（常取 unit torus），在 \(D^c\) 上使用标准 Fourier basis 和 FFT
- **几何 Fourier transform**：用 \(\phi_a^{-1}(x)\) 将物理坐标拉回计算坐标，在变形后的基函数上做谱变换
- **可学习 deformation network**：当几何映射未知时，用神经网络参数化 \(\phi_a^{-1}\)，与 FNO 解算子端到端联合训练
- **输入格式灵活**：支持结构化/非结构化网格、点云、几何设计参数；结构化网格可由索引诱导坐标映射
- **工程基准广泛**：覆盖 hyper-elastic、plasticity、球面 advection、airfoil Euler、pipe Navier-Stokes，并包含 inverse design
- **保留 FNO 效率**：主体仍在潜在均匀网格上执行 FFT，比传统数值求解器可达数量级加速，并比直接插值到规则网格的 FNO 更准确

#### 🔬 深入细节
##### 核心架构示意

![Geo-FNO 几何变形与潜在空间 FFT 示意图](https://arxiv.org/html/2207.05209/extracted/5573661/figures/geo-FNO5.png)
*图：Geo-FNO 将不规则物理域中的输入函数变形到均匀潜在/计算空间，在该空间应用标准 FNO，再把预测解变形回物理域。下方展示 deformation 如何诱导自适应网格和变形 Fourier basis。来源为 arXiv:2207.05209 HTML 图 1。*

##### 算法伪代码

```python
# Geo-FNO 前向传播伪代码
def geo_fno_forward(x_phys, input_field, geometry_code):
    # 1. 估计或读取物理域 -> 计算域的坐标映射
    if has_given_map:
        xi = given_inverse_map(x_phys, geometry_code)          # xi = phi_a^{-1}(x)
    else:
        xi = deformation_net(x_phys, geometry_code)            # learned inverse deformation

    # 2. 将物理点上的函数拉回到均匀计算网格
    v0 = lift_P(concat(input_field, x_phys, xi))
    v_latent = pullback_to_uniform_grid(v0, xi)                 # irregular -> regular latent grid

    # 3. 在计算域上执行标准 FNO blocks
    v = v_latent
    for layer in range(L):
        v_hat = fftn(v)
        low_modes = complex_weight[layer] * truncate(v_hat)
        spectral = ifftn(pad_modes(low_modes)).real
        v = activation(spectral + pointwise_linear[layer](v))

    # 4. 将潜在解采样/推回物理点，并投影成目标物理量
    latent_solution = sample_from_uniform_grid(v, xi)
    u_pred = project_Q(latent_solution)
    return u_pred

for geometry, input_field, target_solution in dataloader:
    pred = geo_fno_forward(geometry.points, input_field, geometry.code)
    loss = relative_l2_on_physical_domain(pred, target_solution, geometry.weights)
    loss.backward()                                             # 同时更新 deformation_net 与 FNO
    optimizer.step()
```

##### 动机与背景

FNO 的高效性来自 FFT，但 FFT 的直接使用通常要求规则网格和简单拓扑。工程 PDE 恰恰常发生在复杂几何中：机翼周围的 Euler 方程、管道内 Navier-Stokes、材料结构的弹塑性问题都存在曲线边界、非均匀网格或点云表示。如果强行把这些数据插值到矩形网格，边界附近会损失精度，也会浪费大量空白区域计算。

Geo-FNO 的核心思路是借鉴自适应移动网格：不改变 FNO 主体，而是在 FNO 所需的规则计算域和真实物理域之间学习一个几何坐标变换。论文把物理域记为 \(D_a\)，计算域记为 \(D^c\)，希望存在一个近似可逆、平滑的映射：

$$
\phi_a: D^c\to D_a,\qquad \phi_a^{-1}:D_a\to D^c.
$$

计算域 \(D^c\) 上有均匀网格和标准 Fourier basis；通过 \(\phi_a\) 推到物理域后，就得到随几何变化的自适应网格和变形 Fourier basis。

##### 核心机制：几何 Fourier transform

对物理域函数 \(v(x)\)，Geo-FNO 不直接在 \(x\) 上做标准 Fourier transform，而是用反变换 \(\phi_a^{-1}(x)\) 把点拉回计算坐标 \(\xi\)。其前向几何谱变换可写成近似形式：

$$
(\mathcal{F}_{\phi_a}v)_k
\approx
\sum_{x_j\in D_a}
v(x_j)\exp\left(-2\pi i\langle \phi_a^{-1}(x_j),k\rangle\right)w_j,
$$

其中 \(w_j\) 是采样/积分权重。对应的逆变换为：

$$
(\mathcal{F}^{-1}_{\phi_a}\hat{v})(x)
=
\sum_{k\in Z_K^d}\hat{v}_k
\exp\left(2\pi i\langle \phi_a^{-1}(x),k\rangle\right).
$$

因此 Geo-FNO layer 可看作把 FNO 的普通 \(\mathcal{F}^{-1}R\mathcal{F}\) 替换为变形后的版本：

$$
v_{t+1}(x)=\sigma\left(
Wv_t(x)+
\mathcal{F}^{-1}_{\phi_a}
\left(R_{\theta}\cdot\mathcal{F}_{\phi_a}(v_t)\right)(x)
\right).
$$

> 💡 关键：Geo-FNO 不是在变形后的 Fourier 空间里手写求解 PDE，而是数据驱动地学习解算子；因此即使传统谱方法在非正交变形网格上会失去严格等价性，Geo-FNO 仍可把变形作为可学习表征。

##### 变形网络与训练目标

当网格是结构化的，例如 airfoil 常见的 C-grid/O-grid，数组索引本身就诱导了一个从计算域到物理域的坐标映射，此时 Geo-FNO 可近似退化为在索引坐标上执行标准 FNO。当映射未知或输入是点云/设计参数时，论文用一个 deformation neural network 参数化 \(\phi_a^{-1}\)，输入包括物理坐标和几何参数，并使用 sinusoidal features 增强坐标表达能力。变形网络与 FNO 主体共享同一个监督损失端到端优化。

数据监督目标使用物理域上的相对 \(L_2\) 误差：

$$
\mathcal{J}_{\text{data}}(\mathcal{G}_{\theta})
\approx
\frac{1}{N}\sum_{j=1}^{N}
\sqrt{
\frac{\int_{D_{a_j}}\left|u_j(x)-\mathcal{G}_{\theta}(a_j)(x)\right|^2\,dx}
{\int_{D_{a_j}}u_j(x)^2\,dx}
}.
$$

如果扩展到 physics-informed neural operator，\(\phi_a^{-1}\) 是神经网络，因此可用自动微分和链式法则计算变形基函数的导数，从而添加 PDE residual；论文把这一点作为后续方向。

##### Fourier continuation、拓扑与局限

标准 Fourier basis 天然适合周期边界。对非周期边界，Geo-FNO 引入 Fourier continuation 的思想：把物理函数扩展到更大的周期计算域中，再在扩展域上做 FFT。对 Chebyshev 方法，论文指出可把 cosine deformation 看作一种特殊几何变形，使边界附近网格更密。

对球面等非欧氏域，可以选择单位球面作为计算空间并用球谐基；对不同拓扑或非同胚域，单个全局变形不一定存在，需要 domain decomposition，将复杂域拆成若干可规则化子域并训练耦合的算子模型。这也是 Geo-FNO 相比 GNO 的一个边界：它很高效，但仍需要可用的几何参数化或可学习变形；若拓扑变化太大，图神经算子或分块方法更直接。

##### 与 FNO 和插值式方法的区别

| 方法 | 处理复杂几何的方式 | FFT 是否保留 | 误差来源 |
|------|--------------------|--------------|----------|
| 标准 FNO | 通常要求规则矩形网格 | 是 | 几何不匹配、边界插值误差 |
| 插值 + FNO | 先把不规则数据插值到规则网格 | 是 | 插值模糊边界和高梯度区域 |
| GNO | 直接在物理点云/网格上消息传递 | 否 | 边数、采样和长程依赖成本 |
| Geo-FNO | 学习物理域到计算域的变形 | 是 | 变形质量和拓扑可参数化性 |

Geo-FNO 的工程价值在于把 FNO 的快速谱卷积搬到“几何归一化”后的潜在域中：网络在同一个均匀计算空间学习共享规律，但输出仍定义在每个样本自己的真实物理几何上。

#### 🧪 练习题
```yaml
question: "Geo-FNO 中学习或给定坐标变换 phi_a^{-1} 的主要作用是什么？"
options:
  - "把不规则物理域中的点映射到统一计算域，使模型能在潜在均匀网格上使用 FFT"
  - "把所有 PDE 强制改写成线性方程，从而无需训练数据"
  - "删除 FNO 的低频模态截断，使模型只学习高频噪声"
  - "将图消息传递替换为 kNN 分类器"
answer: 0
explain: "Geo-FNO 的核心是通过几何变形把复杂物理域拉回规则计算域，在那里运行标准 FNO/FFT，再把解推回物理域。"
```

### F-FNO

```yaml
id: f_fno
num: 20
name: F-FNO
full_name: 分解傅里叶神经算子 (Factorized FNO)
year: '2022'
org: Caltech
parent: fno
paper_url: https://arxiv.org/abs/2111.13587
project_url: ''
category: operators
motivation: 维度分解减少参数量
```

#### 📝 一句话总结
F-FNO 将 FNO 的多维傅里叶卷积拆成按空间维度独立处理的可分离频谱层，并配合后置残差连接、Markov 训练、噪声增强和余弦学习率，使神经算子能用更少参数堆到更深层，在规则网格、点云和结构网格 PDE 上显著优于 FNO/geo-FNO。

#### 🎯 核心要点
- **来源说明**：任务元信息中的 `https://arxiv.org/abs/2111.13587` 实际指向 AFNO；F-FNO 对应官方论文为 `https://arxiv.org/abs/2111.13802`，ICLR 2023 版本见 `https://openreview.net/forum?id=tmIiMPl4IPa`，代码和图示见 `https://github.com/alasdairtran/fourierflow`
- **可分离频谱层**：把原 FNO 的 \(D\) 维 FFT 权重 \(R^{(\ell)}\) 改为每个维度的 \(R_d^{(\ell)}\)，复杂度从 \(O(LH^2M^D)\) 降到 \(O(LH^2MD)\)
- **后置残差连接**：在非线性和两层前馈块之后再加 \(z^{(\ell)}\)，保留输入表示，缓解深层 FNO/geo-FNO 随层数增加不收敛的问题
- **深层可扩展**：论文实验中 FNO/geo-FNO 在 24 层附近性能恶化或不收敛，F-FNO 可扩展到 24 层并继续受益
- **训练策略组合**：teacher forcing、一阶 Markov 假设、输入高斯噪声、AdamW/权重衰减、梯度裁剪、warmup + cosine decay 是效果的重要组成
- **几何泛化**：保留 geo-FNO 的坐标形变 \(\phi\)，可处理规则网格、点云、结构网格和 3D 时空输出
- **输入上下文灵活**：Navier-Stokes 任务可把涡量、速度、坐标、黏度 \(\nu\)、外力 \(f_t\) 作为不同通道输入
- **经验结果**：在 Navier-Stokes 上相对 FNO 降低约 83% 误差；在弹性、翼型、塑性锻造任务上相对 geo-FNO 分别降低约 31%、57%、60% 误差

#### 🔬 深入细节
##### 核心架构示意

![F-FNO 架构海报与算子层示意](https://github.com/alasdairtran/fourierflow/blob/main/figures/poster.png?raw=true)
*图：作者仓库公开海报中的 F-FNO 架构。右上展示从输入函数经形变、lifting、多个算子层、projection 到输出函数的流程；中间的算子层把 2D 问题中的 \(x\)、\(y\) 方向分别做 FFT、频谱权重乘法和 IFFT，再在物理空间合并。论文 Figure 2 的 PDF 图可从 arXiv 源码 `figures/diagram.pdf` 获得。*

##### 算法伪代码

```python
# F-FNO 前向传播伪代码（2D 版本，省略 batch/channel 维细节）
def ffno_forward(a, coords=None, context=None):
    # 可选：geo-FNO 风格坐标形变，把点云/结构网格映射到规则计算域
    x = deform_to_uniform(a, coords) if coords is not None else a

    # 输入表示可拼接涡量、坐标、黏度、外力等上下文
    x = concatenate_channels(x, context)
    z = lifting_P(x)

    for layer in range(L):
        # 按空间维度分解傅里叶算子，而不是一次性学习 D 维频谱权重
        spectral = 0
        for dim in spatial_dims:
            z_hat = fft(z, dim=dim)
            z_hat = keep_low_modes(z_hat, M)
            z_hat = complex_mul(R[layer][dim], z_hat)
            spectral = spectral + ifft(z_hat, dim=dim)

        # 两层前馈 + 后置残差
        h = relu(W1[layer](spectral) + b1[layer])
        h = relu(W2[layer](h) + b2[layer])
        z = z + h

    u = projection_Q(z)
    return deform_back(u, coords) if coords is not None else u

# 训练要点
for step in range(num_steps):
    omega_t, omega_next, context = sample_batch()
    omega_t = omega_t + gaussian_noise_like(omega_t)
    pred = ffno_forward(omega_t, context=context)  # 一阶 Markov: 只预测下一步
    loss = normalized_mse(pred, omega_next)
    loss.backward()
    clip_grad_value_(model.parameters(), 0.1)
    adamw.step()
    cosine_scheduler.step()
```

##### 动机与背景

FNO 的核心优势是把神经算子的积分核写成傅里叶卷积，从而用 FFT 高效捕获全局相互作用。但原始 FNO 的频谱权重是 \(D\) 维联合张量，若隐藏维度为 \(H\)、保留频率模态数为 \(M\)、层数为 \(L\)、问题维度为 \(D\)，参数量主要来自：

$$O(LH^2M^D)$$

这在高维问题中增长很快。更关键的是，论文作者观察到原始 FNO 和 geo-FNO 随网络层数加深会退化，甚至在 24 层附近不收敛；即使 4 层模型，在 Kolmogorov flow 这类湍流预测上仍与数值求解器有明显误差。F-FNO 的目标不是重新发明神经算子，而是在 FNO/geo-FNO 框架内把频谱表示和深层稳定性做得更可扩展。

##### 从 FNO 到 F-FNO 的关键计算

原始 FNO/geo-FNO 的整体算子可写为：

$$u = \mathcal{G}(a) =
(\phi \circ \mathcal{Q} \circ \mathcal{L}^{(L)} \circ \cdots \circ \mathcal{L}^{(1)} \circ \mathcal{P} \circ \phi^{-1})(a)$$

其中 \(\mathcal{P}\) 是 lifting，\(\mathcal{Q}\) 是 projection，\(\phi\) 是处理不规则几何时使用的可学习坐标形变。原始 FNO 的每层通常是：

$$\mathcal{L}^{(\ell)}(z^{(\ell)}) =
\sigma\left(W^{(\ell)}z^{(\ell)} + b^{(\ell)} + \mathcal{K}^{(\ell)}(z^{(\ell)})\right)$$

频谱核积分算子为：

$$\mathcal{K}^{(\ell)}(z^{(\ell)}) =
\operatorname{IFFT}\left(R^{(\ell)} \cdot \operatorname{FFT}(z^{(\ell)})\right)$$

F-FNO 改成先做维度分解，再将各维贡献相加：

$$\mathcal{K}^{(\ell)}(z^{(\ell)}) =
\sum_{d \in D}
\operatorname{IFFT}\left(
R_d^{(\ell)} \cdot \operatorname{FFT}_d(z^{(\ell)})
\right)$$

直觉上，原始 FNO 学的是一个完整 \(D\) 维频谱卷积核；F-FNO 学的是沿每个坐标轴的可分离全局混合。它牺牲了一部分全维频率耦合的直接表达，换来参数量和内存的大幅降低，也让 3D 或时空问题更容易训练。论文还指出可以跨层共享 \(R_d\)，进一步把复杂度降到 \(O(H^2MD)\)。

##### 后置残差为什么重要

F-FNO 的层更新写成：

$$\mathcal{L}^{(\ell)}(z^{(\ell)}) =
z^{(\ell)} + \sigma\left[
W_2^{(\ell)} \sigma\left(
W_1^{(\ell)} \mathcal{K}^{(\ell)}(z^{(\ell)}) + b_1^{(\ell)}
\right) + b_2^{(\ell)}
\right]$$

与原 FNO 把 \(Wz + b + \mathcal{K}(z)\) 放进同一个激活不同，F-FNO 在非线性变换之后再把输入 \(z^{(\ell)}\) 加回来。这更接近 ResNet/Transformer 前馈块的思想：每层只学习对当前函数表示的增量修正，而不是每层都重新改写完整表示。对于长时间 PDE rollout，这种设计能降低深层堆叠时的信息损失。

##### 训练与推理流程

在 Navier-Stokes/Kolmogorov flow 任务中，F-FNO 使用一阶 Markov 形式学习 \(\omega_t \mapsto \omega_{t+1}\)，而不是把多步历史全部作为输入。训练时使用 teacher forcing，即当前步输入来自真实轨迹而非模型上一步预测，避免早期误差滚雪球污染训练信号。推理时则自回归 rollout，把预测的 \(\hat{\omega}_{t+1}\) 送回模型继续预测。

评价损失使用归一化均方误差：

$$\text{N-MSE} =
\frac{1}{B}\sum_{i=1}^{B}
\frac{\|\hat{\omega}_i - \omega_i\|_2}{\|\omega_i\|_2}$$

论文还用涡量相关系数衡量长时间仿真的稳定性：

$$\rho(\omega,\hat{\omega}) =
\sum_i\sum_j
\frac{\omega_{ij}}{\|\omega\|_2}
\frac{\hat{\omega}_{ij}}{\|\hat{\omega}\|_2}$$

这比单步误差更接近真实仿真需求：如果相关性很快跌破阈值，即使单步 loss 好看，模型也无法替代长期数值模拟。

##### 与 FNO/geo-FNO 的区别

| 方面 | FNO | geo-FNO | F-FNO |
|------|-----|---------|-------|
| 频谱层 | 联合多维 FFT 权重 \(R\) | 结合几何形变的 FNO | 按维度分解 \(R_d\)，各维频谱贡献求和 |
| 参数复杂度 | \(O(LH^2M^D)\) | 仍受频谱权重规模影响 | \(O(LH^2MD)\)，可共享到 \(O(H^2MD)\) |
| 几何 | 规则网格 | 点云/结构网格 | 保留 geo-FNO 形变，可处理多几何 |
| 深层训练 | 层数增加易退化 | 复杂几何下也会退化 | 后置残差 + 分解层支持 24 层 |
| 输入上下文 | 通常固定输入变量 | 可结合几何坐标 | 显式支持黏度、外力、坐标等通道 |

> 💡 关键：F-FNO 的“分解”不是把 PDE 拆成多个子问题，而是把傅里叶域的全局混合按空间维度分解；这样保留 FFT 的长程建模能力，同时把参数增长从指数型的 \(M^D\) 拉回线性型的 \(MD\)。

#### 🧪 练习题
```yaml
question: "F-FNO 将原始 FNO 的频谱核从 R 改为按维度的 R_d，最直接解决的问题是什么？"
options:
  - "让模型完全不需要训练数据"
  - "把频谱层参数复杂度从 O(LH^2M^D) 降到 O(LH^2MD)"
  - "把所有 PDE 强制转化为一维常微分方程"
  - "消除傅里叶变换对周期边界的任何假设"
answer: 1
explain: "F-FNO 的核心是维度分解的傅里叶表示，每个空间维度独立做 FFT 和频谱权重乘法，因此参数量随维度线性增长，而不是随 M^D 指数式增长。"
```

### U-FNO

```yaml
id: u_fno
num: 21
name: U-FNO
full_name: U型傅里叶神经算子 (U-shaped FNO)
year: '2022'
org: Stanford
parent: fno
paper_url: https://doi.org/10.1016/j.advwatres.2022.104185
project_url: ''
category: operators
motivation: 结合U-Net多尺度结构
```

#### 📝 一句话总结
U-FNO 在 FNO 的傅里叶层中并联一个小型 U-Net 局部卷积分支，弥补截断傅里叶模态对高频尖锐前沿的表达不足，在 CO2-水多相流代理模拟中同时提升精度、数据效率和前沿预测能力。

#### 🎯 核心要点
- **来源说明**：任务中的 DOI 尾号 `104185` 与公开记录不一致；CaltechAUTHORS、arXiv 与作者 GitHub 均对应论文 `U-FNO--An enhanced Fourier neural operator-based deep-learning model for multiphase flow`，Advances in Water Resources 163:104180，arXiv `2109.03697`
- **U-Fourier 层**：在原 Fourier layer 的 \(\mathcal{K}v + Wv\) 之外加入 \(\mathcal{U}v\)，其中 \(\mathcal{U}\) 是两步 U-Net CNN 操作
- **全局 + 局部互补**：FFT 分支负责全局长程依赖和网格级算子学习，U-Net 分支负责局部高频、尖锐 plume front 和井附近压力梯度
- **三阶段架构**：输入 \(a(x)\) 经 fully connected lifting \(P\)，再经过若干 Fourier layers 和 U-Fourier layers，最后由 projection \(Q\) 输出 \(z(x)\)
- **任务场景明确**：面向 2D 径向 CO2 地质封存，输入包括渗透率、孔隙度、射孔、注入量、压力、温度、不可动水饱和度、毛管压力参数和时空网格
- **输出形式**：直接预测 30 年注入过程中的 24 个时间快照，输出 3D 体数据 \(96 \times 200 \times 24\) 的气相饱和度 \(SG\) 和压力增量 \(dP\)
- **损失函数增强**：使用相对 \(L_p\) 损失，同时惩罚输出本身和径向一阶导数 \(\mathrm{d}y/\mathrm{d}r\)，并用 active cell mask 处理不同储层厚度
- **数据效率**：论文报告 U-FNO 达到与 CNN 相当精度时，气相饱和度任务最多少用约 3.4 倍训练数据，压力任务少用约 2.4 倍训练数据
- **前沿预测优势**：相对 CNN，气相 plume front 误差约从 9.2% 降到 3.4%，压力 front 误差约从 21.2% 降到 12.0%

#### 🔬 深入细节
##### 核心架构示意

![U-FNO 模型架构图](https://ar5iv.labs.arxiv.org/html/2109.03697/assets/model.jpg)
*图：论文 Figure 2。A 展示 U-FNO 总体流程；B 是原 Fourier layer；C 是 U-Fourier layer，在傅里叶积分核和线性项之外加入 U-Net 分支。作者 GitHub 也提供同一架构图：`https://user-images.githubusercontent.com/34537648/160530063-255b53c6-f4db-4ceb-82ba-d6f7c2297ef3.jpg`。*

![U-FNO 输入输出样例](https://ar5iv.labs.arxiv.org/html/2109.03697/assets/figure1.jpg)
*图：论文 Figure 1。左侧是场变量和标量变量输入，右侧分别是气相饱和度与压力增量随时间演化的输出。*

##### 算法伪代码

```python
# U-FNO 前向传播伪代码
def u_fno_forward(a):
    # a: field/scalar/grid/time channels, shape roughly [B, H, R, T, C_in]
    v = P(a)  # lifting 到更高通道维度

    # 前半段：普通 Fourier layers
    for _ in range(num_fourier_layers):
        kv = fourier_kernel(v)          # IFFT(R * FFT(v))
        wv = pointwise_linear(v)
        v = activation(kv + wv)

    # 后半段：U-Fourier layers
    for _ in range(num_u_fourier_layers):
        kv = fourier_kernel(v)          # 全局频谱分支
        uv = mini_unet(v)               # 局部多尺度 CNN 分支
        wv = pointwise_linear(v)        # 逐点线性项
        v = activation(kv + uv + wv)

    z_hat = Q(v)  # projection 回气相饱和度或压力增量
    return z_hat

# 训练损失
for a, y, active_mask in dataloader:
    pred = u_fno_forward(a)
    dy_dr = radial_derivative(y)
    dpred_dr = radial_derivative(pred)
    loss = relative_lp(pred, y, mask=active_mask)
    loss += beta * relative_lp(dpred_dr, dy_dr, mask=active_mask)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

多相流数值模拟需要同时处理非线性相渗、毛管压力、重力、溶解和强非均质地质属性。传统 ECLIPSE 这类全物理模拟器精度高，但做不确定性量化、反演或工程优化时需要大量前向模拟，成本很高。CNN 代理模型可以加速，但通常绑定固定网格，容易过拟合，并且需要大量模拟数据。

FNO 的优势是直接学习函数到函数的算子映射，并在傅里叶空间用 FFT 近似全局积分核，因此对单相流等任务有较好泛化。但 U-FNO 论文指出，在 CO2-水多相流中，原 FNO 的有限截断傅里叶基有强正则化效果：测试泛化很好，但训练误差可能偏高，尤其难以还原气相饱和度 plume 前沿和井附近压力尖峰这类高频局部结构。

##### Fourier layer 的基础计算

U-FNO 继承 FNO 的积分核思想。给定中间函数 \(v_l\)，核积分算子为：

$$\left(\mathcal{K}(v_l)\right)(x)
= \int_D \kappa(x,y)v_l(y)\,\mathrm{d}y$$

若令 \(\kappa(x,y)=\kappa(x-y)\)，由卷积定理可得：

$$\left(\mathcal{K}(v_l)\right)(x)
= \mathcal{F}^{-1}\left(\mathcal{F}(\kappa)\cdot \mathcal{F}(v_l)\right)(x)$$

FNO 将 \(\mathcal{F}(\kappa)\) 直接参数化为截断后的复值权重张量 \(R\)：

$$\left(\mathcal{K}(v_l)\right)(x)
= \mathcal{F}^{-1}\left(R\cdot \mathcal{F}(v_l)\right)(x)$$

其中只保留前 \(k_{\max}\) 个 Fourier modes。对第 \(k\) 个模态和输出通道 \(i\)，频谱乘法为：

$$\left(R\cdot \mathcal{F}(v_l)\right)_{k,i}
= \sum_{j=1}^{c} R_{k,i,j}\left(\mathcal{F}(v_l)\right)_{k,j}$$

##### U-Fourier layer 的机制

原 Fourier layer 大致是：

$$v_{l+1}(x)=\sigma\left((\mathcal{K}v_l)(x)+W(v_l(x))\right)$$

U-FNO 的核心改动是在后半段层里加入 U-Net 分支：

$$v_{m_{k+1}}(x):=
\sigma\left(
(\mathcal{K}v_{m_k})(x)
+(\mathcal{U}v_{m_k})(x)
+W(v_{m_k}(x))
\right)$$

这里 \(\mathcal{U}\) 是一个小型 U-Net CNN operator。它通过下采样/上采样路径聚合局部多尺度卷积特征，增强高频和边缘结构表达。傅里叶分支擅长捕获全局流动耦合和长距离压力传播；U-Net 分支擅长恢复 plume front、薄层异质性和井附近陡峭梯度。两者在同一层相加后再过非线性，形成全局谱算子与局部卷积归纳偏置的混合层。

> ⚠️ 注意：加入 U-Net 分支会削弱原 FNO 天然的分辨率无关性，因为卷积分支与具体网格更绑定。论文在该任务中接受这个取舍，是因为 CO2-水多相流对数值弥散和数值扩散非常敏感，而这些误差本身就与固定网格分辨率相关。

##### 数据流与输入输出配置

论文的数据由 ECLIPSE e300 生成，模拟 30 年超临界 CO2 注入。每个样本包含场变量和标量变量。场变量包括水平/垂向渗透率 \(k_x,k_y\)、孔隙度 \(\phi\)、射孔图 \(perf\)；标量包括注入率 \(Q\)、初始压力 \(P_{\text{init}}\)、温度 \(T\)、不可动水饱和度 \(S_{wi}\)、van Genuchten 参数 \(\lambda\)。这些标量会 broadcast 成与场变量相同大小的通道。

由于原始径向网格逐渐变粗，训练时先对径向做 logarithm conversion，使场变量可表示为 \(96 \times 200\) 矩阵；不同储层厚度用 zero padding 和 active cell mask 处理。时间信息作为额外维度输入，模型直接输出 24 个时间快照构成的空间-时间体。

##### 损失函数设计

U-FNO 使用相对 \(L_p\) 损失，并额外约束径向导数：

$$L(y,\hat{y}) =
\frac{\|y-\hat{y}\|_p}{\|y\|_p}
+\beta
\frac{
\left\|\frac{\mathrm{d}y}{\mathrm{d}r}
- \frac{\mathrm{d}\hat{y}}{\mathrm{d}r}\right\|_p
}{
\left\|\frac{\mathrm{d}y}{\mathrm{d}r}\right\|_p
}$$

第一项要求整体场准确，第二项直接惩罚前沿和梯度形状。对于气相饱和度，导数项能改善 plume leading edge；对于压力增量，导数项能改善井附近尖锐压力变化。训练时只在 active cells 内计算 loss，避免 padding 区域产生无意义梯度。

##### 与 FNO 和 CNN 的区别

| 方面 | CNN surrogate | FNO | U-FNO |
|------|---------------|-----|-------|
| 核心归纳偏置 | 局部卷积 | 全局傅里叶积分核 | 傅里叶全局 + U-Net 局部多尺度 |
| 泛化 | 易过拟合，需大量数据 | 泛化强但高频表达受截断模态限制 | 保留 FNO 泛化，同时提升训练精度和前沿还原 |
| 网格依赖 | 强 | 弱，较分辨率无关 | 介于两者之间，U-Net 分支引入网格依赖 |
| 适合结构 | 局部纹理和边缘 | 长程相互作用、平滑场 | 多相流 plume front 与压力传播并存 |
| 训练目标 | 常规 MSE/relative loss | relative loss | relative loss + 径向导数 loss + active mask |

> 💡 关键：U-FNO 不是简单把 U-Net 接在 FNO 后面，而是在 Fourier layer 内部并联 U-Net 路径，使每一层都同时做全局谱混合和局部多尺度修正。

#### 🧪 练习题
```yaml
question: "U-FNO 在 U-Fourier layer 中加入 U-Net 分支的主要目的是什么？"
options:
  - "完全替代傅里叶变换，避免使用 FFT"
  - "增强局部高频结构表达，改善 plume front 和压力尖峰预测"
  - "让模型只能在无监督物理损失下训练"
  - "把所有标量输入压缩成一个常数"
answer: 1
explain: "FNO 的截断傅里叶模态擅长全局耦合但可能平滑高频前沿；U-Net 分支提供局部多尺度卷积特征，因此能改善气相饱和度前沿和井附近压力梯度。"
```

### PINO

```yaml
id: pino
num: 22
name: PINO
full_name: 物理信息神经算子 (Physics-Informed Neural Operator)
year: '2021'
org: Caltech
parent: fno
paper_url: https://arxiv.org/abs/2111.03794
project_url: ''
category: operators
motivation: 算子学习中加入物理约束损失
```

#### 📝 一句话总结
PINO 将 FNO/神经算子的函数空间学习与 PINN 的 PDE 残差约束结合起来，用数据损失学习一族 PDE 的解算子，再用高分辨率物理损失和实例级微调提高保真度，解决纯数据 FNO 依赖高质量数据、纯 PINN 优化困难的问题。

#### 🎯 核心要点
- **混合监督目标**：训练神经算子 \(\mathcal{G}_\theta\) 时同时使用数据损失 \(\mathcal{J}_{\text{data}}\) 和 PDE 损失 \(\mathcal{J}_{\text{pde}}\)
- **跨分辨率训练**：可用低分辨率数据监督算子输出，同时在更高分辨率网格上施加 PDE 残差，改善 zero-shot super-resolution
- **两阶段流程**：先做 physics-informed operator learning，再对单个 PDE 实例做 instance-wise fine-tuning
- **算子级 ansatz**：微调时使用 \(\mathcal{G}_\theta(a)\) 作为解函数 ansatz，而不是像 PINN 那样从随机初始化的点值网络开始
- **anchor loss**：微调时可加入 \(\mathcal{L}_{\text{anchor}}\)，约束当前算子不要偏离预训练算子，缓解高分辨率 PDE loss 的不稳定
- **导数计算方法**：讨论有限差分/Fourier 数值微分、query function + autograd、function-wise Fourier differentiation 三种方式
- **FNO 作为主干**：利用 FNO 的通用算子逼近能力、离散化收敛性和快速推理，在 PDE loss 中显式计算输出函数导数
- **数据稀缺适用**：可在只有少量粗分辨率数据甚至无标注数据时训练，并可通过采样虚拟初值/系数生成无限 PDE 实例
- **任务覆盖**：论文验证 Darcy flow、Burgers、Navier-Stokes/Kolmogorov flow、Reynolds 数迁移和 Darcy 反问题

#### 🔬 深入细节
##### 核心架构示意

![PINO 架构图](https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino-arch7.png)
*图：论文 Figure 2。输入函数 \(a\) 经 lifting、多个线性积分算子和非线性、projection 得到输出 \(u\)；右侧同时计算 data loss 和 equation loss，导数 \(Du\) 可通过算子层在函数空间中显式求出。*

![PINO 频谱外推示意](https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino_spectrum_reduced_font.png)
*图：论文 Figure 1。PINO 利用 data + PDE loss 在 Kolmogorov flow 中更好外推到训练频率之外，纯插值网络在高频段明显失真。*

##### 算法伪代码

```python
# PINO 阶段 1：物理信息算子学习
def train_pino_operator(G_theta, data_loader, pde_sampler):
    for step in range(num_steps):
        # 可用数据：粗分辨率 input-output pair
        a_data, u_data = next(data_loader)
        pred_data = G_theta(a_data)
        J_data = norm_u(pred_data - u_data) ** 2

        # 可额外采样虚拟 PDE 实例，不一定有标签
        a_phys = pde_sampler.sample_initial_or_coefficients()
        pred_high = G_theta(a_phys, resolution="high")
        residual = pde_residual(a_phys, pred_high)  # 需要 Du, D2u, ...
        J_pde = mean_square(residual) + boundary_initial_terms(pred_high, a_phys)

        loss = lambda_data * J_data + lambda_pde * J_pde
        loss.backward()
        optimizer.step()

# PINO 阶段 2：实例级微调
def fine_tune_instance(G_theta, a_star, theta0):
    for step in range(finetune_steps):
        u_pred = G_theta(a_star, resolution=current_resolution)
        L_pde = mean_square(pde_residual(a_star, u_pred))
        L_anchor = norm_u(G_theta(a_star) - G_theta(theta0, a_star)) ** 2
        loss = L_pde + alpha * L_anchor
        loss.backward()
        optimizer.step()
```

##### 问题设定

PINO 统一考虑两类 PDE。静态问题写作：

$$\mathcal{P}(u,a)=0,\quad x\in D,\qquad u=g,\quad x\in\partial D$$

其中 \(a\) 是 PDE 系数或参数，\(u\) 是未知解。它诱导出解算子：

$$\mathcal{G}^{\dagger}: \mathcal{A}\to\mathcal{U},\qquad a\mapsto u$$

动态问题写作：

$$\frac{\mathrm{d}u}{\mathrm{d}t}=\mathcal{R}(u),\quad
u|_{\partial D}=g,\quad u|_{t=0}=a$$

这时解算子把初值 \(a\) 映射到整段时间上的解函数 \(u(t)\)。PINO 的目标不是只求某一个 \(a\) 的解，而是学习整个 \(\mathcal{A}\to\mathcal{U}\) 的算子；这正是它区别于 PINN 的核心。

##### 数据损失与 PDE 损失

如果有训练数据 \(\{(a_j,u_j)\}_{j=1}^{N}\)，神经算子可用数据损失训练：

$$\mathcal{L}_{\text{data}}(u,\mathcal{G}_\theta(a))
= \|u-\mathcal{G}_\theta(a)\|_{\mathcal{U}}^2
= \int_D |u(x)-\mathcal{G}_\theta(a)(x)|^2\,\mathrm{d}x$$

算子级平均数据损失为：

$$\mathcal{J}_{\text{data}}(\mathcal{G}_\theta)
= \mathbb{E}_{a\sim\mu}
\left[\mathcal{L}_{\text{data}}(a,\theta)\right]
\approx
\frac{1}{N}\sum_{j=1}^{N}
\int_D |u_j(x)-\mathcal{G}_\theta(a_j)(x)|^2\,\mathrm{d}x$$

PDE 损失则把模型输出代回方程：

$$\mathcal{J}_{\text{pde}}(\mathcal{G}_\theta)
= \mathbb{E}_{a\sim\mu}
\left[\mathcal{L}_{\text{pde}}(a,\mathcal{G}_\theta(a))\right]$$

以静态问题为例，PINN/PINO 形式的 PDE 残差损失可写成：

$$\mathcal{L}_{\text{pde}}(a,u_\theta)
=
\int_D |\mathcal{P}(u_\theta(x),a(x))|^2\,\mathrm{d}x
+\alpha\int_{\partial D}|u_\theta(x)-g(x)|^2\,\mathrm{d}x$$

动态问题则加入时间残差、边界条件和初值条件：

$$\mathcal{L}_{\text{pde}}(a,u_\theta)
=
\int_0^T\int_D
\left|\frac{\mathrm{d}u_\theta}{\mathrm{d}t}(t,x)-\mathcal{R}(u_\theta)(t,x)\right|^2
\,\mathrm{d}x\,\mathrm{d}t
+\alpha\int_0^T\int_{\partial D}|u_\theta(t,x)-g(t,x)|^2\,\mathrm{d}x\,\mathrm{d}t
+\beta\int_D |u_\theta(0,x)-a(x)|^2\,\mathrm{d}x$$

> 💡 关键：数据损失提供强监督，让优化更容易；PDE 损失提供物理约束，能利用无标签的虚拟 PDE 实例，并可在高于数据分辨率的网格上计算。

##### 神经算子主干与 FNO 导数

PINO 使用的神经算子可抽象为：

$$\mathcal{G}_{\theta}
=
\mathcal{Q}\circ(\mathcal{W}_L+\mathcal{K}_L)
\circ\cdots\circ
\sigma(\mathcal{W}_1+\mathcal{K}_1)\circ\mathcal{P}$$

\(\mathcal{P}\) 将输入函数 lift 到高维通道，\(\mathcal{Q}\) 将最后的隐函数 project 到输出函数，\(\mathcal{K}_l\) 是积分核算子。FNO 中常用 Fourier convolution：

$$\mathcal{K}v(x)=
\mathcal{F}^{-1}\left(R\cdot \mathcal{F}(v)\right)(x)$$

PDE loss 需要 \(\partial_x u\)、\(\partial_{xx}u\)、\(\partial_tu\) 等导数。PINO 讨论三种路径：

- **数值微分**：有限差分 \(O(n)\) 或 Fourier differentiation \(O(n\log n)\)，速度快但受网格、光滑性和截断误差影响
- **query function + autograd**：把神经算子输出写成可查询的 \(u(x)\)，对查询点用自动微分，通用但慢且耗显存
- **function-wise differentiation**：对 FNO 的 Fourier 表示显式求导，在频域中乘以频率因子，再 IFFT 回物理空间

对一维 Fourier 展开，若最后的输出可写为：

$$u(x)=Q\left(
\frac{1}{k_{\max}}\sum_{k=0}^{k_{\max}}
\left(R_k(\mathcal{F}v)_k\right)
\exp\left(\frac{i2\pi k}{D}x\right)
\right)$$

则导数只需对指数项求导：

$$\frac{\mathrm{d}}{\mathrm{d}x}
\exp\left(\frac{i2\pi k}{D}x\right)
=
\frac{i2\pi k}{D}
\exp\left(\frac{i2\pi k}{D}x\right)$$

因此在规则网格上可以通过 FFT 高效得到整场导数。这是 PINO 相比朴素 PINN 的重要工程优势：它不是对每个采样点独立反传求导，而是利用算子结构批量计算函数级导数。

##### 两阶段训练机制

第一阶段是 physics-informed operator learning。PINO 训练 \(\mathcal{G}_\theta\) 去近似真实解算子 \(\mathcal{G}^{\dagger}\)，可使用：

$$\mathcal{J}(\theta)
=
\lambda_{\text{data}}\mathcal{J}_{\text{data}}(\mathcal{G}_\theta)
+\lambda_{\text{pde}}\mathcal{J}_{\text{pde}}(\mathcal{G}_\theta)$$

当数据只在低分辨率可得时，\(\mathcal{J}_{\text{data}}\) 在粗网格上计算，\(\mathcal{J}_{\text{pde}}\) 可以在细网格上计算。这使模型不仅拟合观测/求解器数据，还被物理方程约束到更高频、更高分辨率的解空间。

第二阶段是 instance-wise fine-tuning。给定一个具体实例 \(a^\star\)，用预训练算子输出 \(\mathcal{G}_\theta(a^\star)\) 作为 ansatz，再最小化该实例上的 PDE residual。为了避免微调在高分辨率 PDE loss 下偏离太远，论文加入 anchor loss：

$$\mathcal{L}_{\text{anchor}}
\left(\mathcal{G}_{\theta_i}(a),\mathcal{G}_{\theta_0}(a)\right)
:=
\|\mathcal{G}_{\theta_i}(a)-\mathcal{G}_{\theta_0}(a)\|_{\mathcal{U}}^2$$

微调目标为：

$$\mathcal{L}_{\text{fine-tune}}
=
\mathcal{L}_{\text{pde}}
+\alpha\mathcal{L}_{\text{anchor}}$$

直觉上，预训练算子给出“已经接近解流形”的初值，PDE loss 只需做物理一致性修正；而 PINN 通常从随机网络开始直接拟合一个复杂函数，优化景观更差，尤其在多尺度动态系统中容易失败。

##### 与 PINN 和纯 FNO 的区别

| 方面 | PINN | FNO | PINO |
|------|------|-----|------|
| 学习对象 | 单个 PDE 实例的解函数 | 一族 PDE 的解算子 | 一族 PDE 的物理约束解算子 |
| 监督来源 | PDE/边界/初值残差 | 求解器或观测数据 | 数据损失 + PDE 损失 |
| 数据需求 | 可无标注数据 | 依赖大量 input-output pair | 可用少量粗数据，也可采样无标签 PDE 实例 |
| 优化难度 | 多尺度动态系统困难 | 监督学习较稳定 | 预训练算子 + PDE 微调，优化更好 |
| 分辨率 | 配点灵活但逐点优化 | 可 zero-shot super-resolution，但高频可能失真 | 在高分辨率施加 PDE loss，改善高频外推 |
| 推理 | 每个实例需优化 | 一次前向很快 | 可直接前向，也可实例级微调换精度 |

> ⚠️ 注意：PINO 的 PDE loss 仍需正确的微分和边界处理。对于非周期或不光滑问题，直接 Fourier differentiation 会出现误差；论文因此讨论 Fourier continuation，把非周期问题扩展到更大的周期空间。

#### 🧪 练习题
```yaml
question: "PINO 相比纯 FNO 的核心改进是什么？"
options:
  - "完全取消数据损失，只保留随机初始化的 PINN 优化"
  - "在神经算子训练中加入 PDE 残差，并可在高分辨率上施加物理约束"
  - "把 Fourier layer 替换成普通全连接网络"
  - "只学习单个 PDE 样本，不能泛化到一族方程"
answer: 1
explain: "PINO 保留 FNO 的算子学习能力，但额外使用 PDE loss 约束输出函数，尤其能用粗分辨率数据配合高分辨率物理残差提高泛化和超分辨率保真度。"
```

### LNO

```yaml
id: lno
num: 23
name: LNO
full_name: 拉普拉斯神经算子 (Laplace Neural Operator)
year: '2023'
org: DeepMind
parent: fno
paper_url: https://arxiv.org/abs/2303.10528
project_url: ''
category: operators
motivation: 拉普拉斯变换处理非周期信号
```

#### 📝 一句话总结
LNO 将 FNO 的傅里叶域卷积核替换为拉普拉斯域的极点-留数参数化，显式同时建模瞬态响应和稳态响应，解决 FNO 在非周期、无阻尼和强瞬态 ODE/PDE 问题上泛化不足的问题。

#### 🎯 核心要点
- **拉普拉斯域算子层**：用 \(U(s)=K_\phi(s)V(s)\) 表示卷积算子，将核函数直接放在拉普拉斯域学习
- **极点-留数参数化**：令 \(K_\phi(s)=\sum_{n=1}^{N}\frac{\beta_n}{s-\mu_n}\)，把系统极点 \(\mu_n\) 和留数 \(\beta_n\) 作为可训练参数
- **瞬态/稳态分解**：输出由系统极点产生的瞬态项 \(\sum_n\gamma_n e^{\mu_n t}\) 和输入频率产生的稳态项 \(\sum_\ell\lambda_\ell e^{i\omega_\ell t}\) 组成
- **相对 FNO 的关键差异**：FNO 只在 \(i\omega\) 频率轴上学习稳态响应，LNO 通过 \(s=\sigma+i\omega\) 引入指数收敛/衰减因子，适合非周期与不稳定信号
- **单层替代多层频谱模块**：论文用一个 Laplace layer 对比四个 Fourier module，在 Duffing 振子、受迫摆、Lorenz 系统、Euler-Bernoulli 梁、扩散方程和反应-扩散系统上验证
- **可解释性更强**：学习到的 \(\mu_n,\beta_n\) 可对应动力系统的模态、阻尼/增长和响应强度，而不仅是黑箱频率权重
- **主要局限**：当输入代表初始条件而非外力/源项时，卷积积分的物理含义减弱，极点-留数形式不一定显著优于 FNO

#### 🔬 深入细节
![LNO 架构示意图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-024-00844-4/MediaObjects/42256_2024_844_Fig1_HTML.png)
*图：LNO 的整体架构与 Laplace layer。arXiv 预印本的对应图为 Figure 1，源文件为 `figure/LNO4.pdf`；Nature Machine Intelligence 版本提供了公开图片直链。*

##### 算法伪代码

```python
# LNO Laplace layer 的核心计算（简化版）
def lno_forward(f_t):
    # 1. Lift: 输入函数 f(t) 升维为 latent 表示 v(t)
    v_t = P(f_t)

    # 2. 将 v(t) 分解为输入频率极点 i*omega_l 与留数 alpha_l
    alpha, omega = fft_coefficients(v_t)

    # 3. 可训练的系统极点与留数
    mu = trainable_system_poles          # [N]
    beta = trainable_system_residues     # [N]

    # 4. 系统极点处的瞬态留数 gamma_n = beta_n * V(mu_n)
    V_mu = sum_over_l(alpha_l / (mu_n - 1j * omega_l))
    gamma = beta * V_mu
    transient = sum_over_n(gamma_n * exp(mu_n * t_grid))

    # 5. 输入频率处的稳态留数 lambda_l = alpha_l * K_phi(i omega_l)
    K_iw = sum_over_n(beta_n / (1j * omega_l - mu_n))
    lam = alpha * K_iw
    steady = ifft_from_coefficients(lam, omega)

    # 6. 局部线性变换 + 非线性 + projection
    u_t = activation(transient + steady + W(v_t))
    return Q(u_t)

for f_batch, u_batch in dataloader:
    pred = lno_forward(f_batch)
    loss = relative_l2(pred, u_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

FNO 的核心假设是把卷积核放到傅里叶域中学习，即沿纯虚频率轴 \(i\omega\) 做频谱乘法。这个设计在周期边界、稳态振荡或规则网格上很有效，但对两类动力学会吃亏：一类是非周期或不绝对可积的信号，另一类是无阻尼系统中的长瞬态响应。傅里叶变换没有显式的指数衰减/增长因子，也不自然包含初始值影响，因此容易把瞬态部分当成需要多层网络“补出来”的误差。

LNO 的核心变化是从傅里叶变量 \(i\omega\) 扩展到拉普拉斯变量 \(s=\sigma+i\omega\)。这里 \(\sigma\) 提供指数收敛因子，使模型可以表示衰减、增长和短时瞬态。直觉上，FNO 学的是“频率响应”，而 LNO 学的是“系统模态响应”：每个极点 \(\mu_n\) 对应一个模态，每个留数 \(\beta_n\) 控制这个模态对输入的响应强度。

##### 核心机制

LNO 仍然遵循神经算子的 lift-operator-project 框架。输入函数 \(\mathbf f(t)\) 先经浅层网络 \(\mathcal{P}\) 升维为 \(v(t)\)，再经过 Laplace layer 与局部线性变换 \(W\)，最后由 \(\mathcal{Q}\) 投影回目标维度：

$$
\mathbf u(t)=\sigma\left((\kappa(\mathbf f;\phi)*v)(t)+\mathbf W v(t)\right)
$$

其中卷积核积分为：

$$
(\kappa(\mathbf f;\phi)*v)(t)=\int_D\kappa_{\phi}(t-\tau)v(\tau)\,d\tau
$$

对卷积项做拉普拉斯变换，得到：

$$
U(s)=K_\phi(s)V(s)
$$

LNO 不像 FNO 那样直接学习一组离散频点的 \(K_\phi(i\omega)\)，而是把 \(K_\phi(s)\) 写成极点-留数形式：

$$
K_\phi(s)=\sum_{n=1}^{N}\frac{\beta_n}{s-\mu_n}
$$

这里 \(\mu_n\) 和 \(\beta_n\) 是网络训练参数。若输入 latent 信号写成傅里叶级数：

$$
v(t)=\sum_{\ell=-\infty}^{\infty}\alpha_\ell e^{i\omega_\ell t}
$$

则其拉普拉斯变换为：

$$
V(s)=\sum_{\ell=-\infty}^{\infty}\frac{\alpha_\ell}{s-i\omega_\ell}
$$

二者相乘后，输出 \(U(s)\) 同时具有系统极点 \(\mu_n\) 和输入激励极点 \(i\omega_\ell\)。通过留数定理可得：

$$
\gamma_n=\beta_n V(\mu_n), \qquad
\lambda_\ell=\alpha_\ell K_\phi(i\omega_\ell)
$$

逆拉普拉斯变换给出时间域输出：

$$
u_1(t)=\sum_{n=1}^{N}\gamma_n e^{\mu_n t}
+\sum_{\ell=-\infty}^{\infty}\lambda_\ell e^{i\omega_\ell t}
$$

> 💡 关键：第一项是由系统极点决定的瞬态响应，第二项是由输入频率决定的稳态响应。FNO 主要覆盖第二项，LNO 显式加入第一项。

##### 训练与数据流

训练数据仍是算子学习常见的输入-输出函数对 \(\{(\mathbf f_j,\mathbf u_j)\}_{j=1}^{N}\)。论文中的主要任务是学习外力/源项到响应函数的映射，例如 \(f(t)\rightarrow x(t)\) 或 \(f(x,t)\rightarrow y(x,t)\)。损失通常采用相对 \(\mathcal{L}_2\) 误差：

$$
\mathcal{L}_{rel}=
\frac{\|\mathcal{G}_\theta(\mathbf f)-\mathbf u\|_2}{\|\mathbf u\|_2}
$$

训练过程中，FFT 仍用于获得输入的 \(\alpha_\ell,\omega_\ell\)，但核函数不再只是一组傅里叶权重，而是由 \(\mu_n,\beta_n\) 计算出来。这样做把“如何响应某个输入频率”和“系统自身有哪些衰减/增长模态”拆开了。

##### 与 FNO 的区别

| 方面 | FNO | LNO |
|------|-----|-----|
| 核参数 | \(K_\phi(i\omega_\ell)\) | \((\mu_n,\beta_n)\) |
| 域 | 傅里叶频域 | 拉普拉斯复平面 |
| 主要响应 | 稳态/周期响应 | 瞬态 + 稳态响应 |
| 对非周期信号 | 需要网络间接拟合 | 由 \(\sigma+i\omega\) 更自然表示 |
| 可解释性 | 频谱权重 | 极点、留数、模态贡献 |

论文结果显示，在无阻尼 Duffing 振子、无阻尼受迫摆等强瞬态场景，LNO 相比 FNO 的优势最明显；在 Euler-Bernoulli 梁和扩散方程这类线性算子上，极点-留数结构几乎直接对应解析响应，因此误差可比 FNO 低一个到两个数量级。反应-扩散系统是非线性的，LNO 仍然通过可训练极点/留数获得更小误差，但优势来自有用的归纳偏置，而不是严格解析等价。

#### 🧪 练习题
```yaml
question: "LNO 相比 FNO 的核心改动是什么？"
options:
  - "把所有卷积层替换为普通全连接层"
  - "在拉普拉斯域用可训练极点和留数参数化核函数，同时表示瞬态与稳态响应"
  - "只使用更多 Fourier modes 来提升高频分辨率"
  - "用图神经网络处理不规则网格"
answer: 1
explain: "LNO 的关键是将核函数写为 K_phi(s)=sum beta_n/(s-mu_n)，系统极点产生瞬态项，输入频率产生稳态项，从而补足 FNO 对瞬态/非周期信号的短板。"
```

### GINO

```yaml
id: gino
num: 24
name: GINO
full_name: 几何信息神经算子 (Geometry-Informed Neural Operator)
year: '2023'
org: Caltech
parent: geo_fno
paper_url: https://arxiv.org/abs/2309.03019
project_url: ''
category: operators
motivation: 结合GNN与FNO优化3D几何模拟
```

#### 📝 一句话总结
GINO 将 GNO 的局部不规则网格积分与 FNO 的规则潜空间全局频谱积分组合起来，用 SDF 与点云编码复杂几何，解决 FNO 难以直接处理大规模 3D 非结构几何、GNN/GNO 又难以高效捕获全局相互作用的问题。

#### 🎯 核心要点
- **来源校正**：任务给定的 `https://arxiv.org/abs/2309.03019` 实际是语音验证论文；GINO 对应论文为 NeurIPS 2023 `Geometry-Informed Neural Operator for Large-Scale 3D PDEs`，arXiv: `https://arxiv.org/abs/2309.00583`
- **三段式架构**：GNO encoder 将不规则表面点云映射到规则 latent grid，FNO block 在规则网格上做全局频谱积分，GNO decoder 将 latent 表示查询回任意输出点
- **几何输入表示**：同时使用表面点云和 signed distance function (SDF)，其中 SDF 在规则网格上表达几何边界与域信息
- **局部图积分**：GNO 在物理空间半径球 \(B_r(x)\) 内构图，用 Riemann 权重近似连续核积分，避免普通 kNN GNN 在网格细化时退化为点算子
- **全局频谱处理**：FNO 只在 GNO 产生的规则潜空间中运行，因此可使用 FFT 的准线性复杂度捕获长程依赖
- **可扩展图构造**：使用 hash grid / voxel 邻域搜索替代全点对距离，避免 \(O(N^2)\) 内存与计算
- **CFD 验证**：在 ShapeNet car 和大规模 Ahmed body 3D 气动数据上预测表面压力，论文报告 drag coefficient 计算相对 GPU OpenFOAM 约 \(26{,}000\times\) 加速
- **离散收敛性**：训练后的模型可作用于任意分辨率/网格采样，随着离散加密收敛到连续算子，而不是绑定到固定 mesh

#### 🔬 深入细节
![GINO 架构图（Figure 1 位于论文 PDF 第 2 页）](https://proceedings.neurips.cc/paper_files/paper/2023/file/70518ea42831f02afc3a2828993935ad-Paper-Conference.pdf)
*图源说明：NeurIPS 论文 PDF 的 Figure 1 展示 GINO 架构；arXiv source 包 `https://arxiv.org/e-print/2309.00583` 中对应图文件为 `Figs/main_fig.pdf`。公开页面未提供单独图片直链，因此这里给出可访问论文 PDF 与源包位置。*

##### 算法伪代码

```python
# GINO 前向传播伪代码
def gino_forward(surface_points, sdf_grid, query_points, inlet_velocity=None):
    # surface_points: 不规则几何表面点云 S_T
    # sdf_grid:       在规则背景网格 D 上采样的 signed distance function
    # query_points:   需要预测压力/速度的任意输出点

    # 1. GNO encoder: 从不规则点云到规则 latent grid
    graph_in = radius_graph(source=surface_points, target=latent_grid, radius=r_in)
    geom_latent = gno_integral(
        target_points=latent_grid,
        source_points=surface_points,
        source_features=surface_features(surface_points),
        graph=graph_in,
        riemann_weights=surface_area_weights,
    )

    # 2. 拼接 SDF，形成规则网格上的几何表示
    z = concat(geom_latent, sdf_grid)

    # 3. FNO block: 规则潜空间中进行全局 Fourier kernel integration
    if inlet_velocity is not None:
        z = adaptive_instance_norm(z, embed_fourier(inlet_velocity))
    for block in fno_blocks:
        z = block(z)  # FFT -> spectral multiplication -> IFFT + pointwise transform

    # 4. GNO decoder: 从 latent grid 查询到任意输出点
    graph_out = radius_graph(source=latent_grid, target=query_points, radius=r_out)
    pred = gno_integral(
        target_points=query_points,
        source_points=latent_grid,
        source_features=z,
        graph=graph_out,
        riemann_weights=uniform_grid_weights,
    )

    return projection(pred)  # e.g. surface pressure

for batch in dataloader:
    pred = gino_forward(batch.surface, batch.sdf, batch.output_points, batch.velocity)
    loss = relative_l2(pred, batch.pressure)
    loss.backward()
    optimizer.step()
```

##### 问题设定

GINO 学习的是几何参数化 PDE 的解算子。论文将几何写成距离函数 \(T\)，其零水平集 \(S_T=\{x\in D:T(x)=0\}\) 定义物体表面；流体域为 \(\Omega_T=D\setminus\bar{Q}_T\)。抽象 PDE 写作：

$$
\mathcal{L}(u)=f,\quad x\in\Omega_T,
\qquad
u=g,\quad x\in\partial\Omega_T
$$

模型要学习的映射是：

$$
\Psi:\mathcal{T}\times\mathcal{F}\times\mathcal{B}\rightarrow\mathcal{U},
\qquad
(T,f,g)\mapsto E_T(u)
$$

其中 \(E_T\) 是把几何相关域 \(\Omega_T\) 上的解扩展到统一背景域 \(D\) 的算子。对汽车气动问题，\(\mathcal{L}\) 可对应稳态 Navier-Stokes 方程，输出通常是表面压力场或速度/压力组合。

##### GNO Encoder/Decoder

GINO 的局部模块来自 Graph Neural Operator，而不是普通 GNN。它从连续核积分出发：

$$
v_l(x)=\int_D \kappa_l(x,y)v_{l-1}(y)\,dy
$$

为了可扩展，实际只在物理空间半径球内做局部积分：

$$
v_l(x)=\int_{B_r(x)}\kappa(x,y)v_{l-1}(y)\,dy
$$

离散后用 Riemann 和近似：

$$
v_l(x)\approx\sum_{i=1}^{M}\kappa(x,y_i)v_{l-1}(y_i)\mu(y_i),
\qquad y_i\in B_r(x)
$$

这里 \(\mu(y_i)\) 是与点采样密度相关的积分权重。关键不是“连最近邻”，而是“在物理空间球内近似积分”。这样当点云分辨率变化时，离散和会逼近同一个连续积分算子，模型具备离散收敛性。

Encoder 用表面点云 \(\{x_i^{in}\}\subset S_T\) 作为源点，在规则 latent grid \(\{x_j^{grid}\}\subset D\) 上查询几何表示。Decoder 反过来把规则 latent grid 上的函数值映射到任意输出点 \(\{x_k^{out}\}\subset\Omega_T\) 或表面点。

##### FNO 潜空间处理

GNO 适合处理不规则几何，但局部半径构图很难高效捕获全局流动依赖。GINO 将几何编码到规则 latent grid 后，再用 FNO 做全局频谱积分：

$$
\mathcal{C}(v)=\mathcal{F}^{-1}\left(\mathcal{F}(\kappa)\cdot\mathcal{F}(v)\right)
$$

完整 FNO block 可写成：

$$
\mathcal{K}(v)(x)=\sigma\left(Wv(x)+\mathcal{C}(v)(x)\right)
$$

由于该步骤发生在规则网格上，\(\mathcal{F}\) 可以用 FFT 高效实现。GINO 因此得到两边的好处：输入/输出端可处理复杂非结构点云，中间全局传播仍保持 FNO 的频谱效率。

##### 大规模实现细节

半径图构造若直接算全点对距离，需要 \(O(N^2)\) 内存和计算，在 \(10^5\sim10^7\) 点 CFD 网格上不可行。GINO 使用 hash grid：先按体素把点放入哈希表，只检查当前体素及邻近体素，再做 \(\ell^2\) 距离过滤。论文给出的复杂度形式约为 \(O(Ndr^3)\)，其中 \(d\) 是单位密度、\(r\) 是搜索半径。

对边界条件中的标量入口速度，GINO 使用 Fourier feature embedding 加 learnable adaptive instance normalization：速度先嵌入为向量，再由 MLP 生成归一化层的 scale/shift。这样同一网络可根据 inlet velocity 调整流场幅值，而不需要为每个速度训练独立模型。

##### 与相关方法的区别

| 方法 | 几何输入 | 全局依赖 | 网格/分辨率泛化 | 主要瓶颈 |
|------|----------|----------|----------------|----------|
| 标准 FNO | 规则网格 | 强，FFT 高效 | 依赖规则网格 | 难处理复杂几何 |
| Geo-FNO | 学坐标变形 | 强 | 对复杂 3D 成本高 | 不规则 DFT/变形困难 |
| 普通 GNN | 任意图 | 局部 message passing | 细化时易退化 | 不保证连续算子极限 |
| GNO | 任意点云 | 局部积分 | 离散收敛 | 长程依赖成本高 |
| **GINO** | SDF + 点云 | GNO 局部 + FNO 全局 | 离散收敛 | 需要构造 latent grid 与半径图 |

> 💡 关键：GINO 不是简单把 GNN 和 FNO 串起来，而是用 GNO 作为连续积分意义下的 encoder/decoder，把 FNO 限定在规则潜空间中运行，从而同时满足几何灵活性、全局效率和离散收敛。

#### 🧪 练习题
```yaml
question: "GINO 为什么要使用 GNO encoder + FNO latent block + GNO decoder 的三段式结构？"
options:
  - "为了完全避免使用傅里叶变换"
  - "为了把不规则几何映射到规则潜空间，让 FNO 高效捕获全局依赖，再查询回任意输出点"
  - "为了把所有点云强制插值成固定数量的节点"
  - "为了只预测 drag coefficient 而不预测压力场"
answer: 1
explain: "GNO 负责不规则输入/输出上的局部连续积分，FNO 在规则 latent grid 上用 FFT 捕获全局相互作用，这是 GINO 兼顾复杂几何和计算效率的核心。"
```

### MoE-POT

```yaml
id: moe_pot
num: 25
name: MoE-POT
full_name: 混合专家算子Transformer (Mixture-of-Experts Operator Transformer)
year: '2026'
org: 清华大学
parent: fno
paper_url: https://arxiv.org/abs/2510.moe
project_url: ''
category: operators
motivation: 混合专家系统扩展至亿级参数
```

#### 📝 一句话总结
MoE-POT 将稀疏激活的 Mixture-of-Experts 引入 PDE operator transformer 预训练，在每层用路由网络从 16 个 routed experts 中选择 4 个并叠加 2 个 shared experts，从而在控制推理成本的同时扩展参数规模并缓解多 PDE 数据集混训的负迁移。

#### 🎯 核心要点
- **来源限制说明**：任务给定 `https://arxiv.org/abs/2510.moe` 不是有效 arXiv URL；可追溯论文为 `Mixture-of-Experts Operator Transformer for Large-Scale PDE Pre-Training`，arXiv: `https://arxiv.org/abs/2510.25803`，OpenReview: `https://openreview.net/forum?id=PNgG4H3q9D`
- **预训练目标**：沿用自回归去噪 operator pre-training，从历史 PDE 帧 \(\bm{u}^{<t}+\epsilon\) 预测下一帧 \(\bm{u}^t\)
- **输入编码**：用 patchification layer 加时空位置编码将每个时间步的场变为 patch tokens，再通过 Fourier temporal aggregation 汇聚时间动态
- **主干 block**：每个 block 包含 Fourier layer 与 MoE layer，Fourier layer 负责核积分/全局传播，MoE layer 负责按 PDE 类型选择专家
- **稀疏 MoE 结构**：每层含 16 个 routed experts 和 2 个 shared experts；推理时 Top-4 routed experts + 2 shared experts 被激活
- **共享与专用分工**：shared experts 捕获守恒律、对称性等跨 PDE 共性，routed experts 学习不同方程族的专有模式
- **负载均衡损失**：用 expert importance 的 coefficient of variation 惩罚路由塌缩，鼓励专家使用更均衡
- **多数据集预训练**：在 6 个公开 PDE 数据集上训练 30M 到 0.5B 参数模型，覆盖 FNO、PDEBench 和 CFDBench 来源
- **效果与解释性**：论文报告 90M activated params 模型相对 120M activated params 现有模型零样本误差最高降低约 40%，路由决策可用来以约 98% 准确率识别数据集类型

#### 🔬 深入细节
![MoE-POT 架构示意图](https://arxiv.org/html/2510.25803v1/x4.png)
*图：MoE-POT 的模型架构。轨迹来自混合 PDE 数据集，模型用历史帧预测下一帧；MoE layer 由 shared experts、routed experts 和 router-gating network 组成。*

##### 算法伪代码

```python
# MoE-POT 训练伪代码
def moe_pot_forward(u_history):
    # u_history: [B, H, W, T, C]

    # 1. patchification + spatiotemporal positional encoding
    z_time = []
    for t in range(T):
        z_t = PatchConv(u_history[:, :, :, t] + pos_embed(x, y, t))
        z_time.append(z_t)

    # 2. temporal aggregation with Fourier feature
    z = sum(W_t(z_time[t]) * exp(-1j * gamma * t) for t in range(T))

    # 3. repeated Fourier + MoE blocks
    balance_loss = 0.0
    for block in blocks:
        z = block.fourier_layer(z)  # F^{-1}(R_phi * F[z])

        logits = block.router(z)        # CNN router, shape [B, N_r]
        weights = softmax(logits)
        topk_idx, topk_w = topk(weights, k=4)

        shared_out = mean(expert(z) for expert in block.shared_experts)  # 2 experts
        routed_out = sum(topk_w[k] * block.routed_experts[topk_idx[k]](z)
                         for k in range(4))
        z = shared_out + routed_out

        balance_loss += cv_importance_loss(weights)

    return decode_next_frame(z), balance_loss

for u_history, u_next in mixed_pde_loader:
    noisy_history = u_history + epsilon_noise()
    pred, lb = moe_pot_forward(noisy_history)
    loss = mse(pred, u_next) + lb
    loss.backward()
    optimizer.step()
```

##### 为什么需要 MoE

PDE 预训练面临两个冲突目标。第一，模型需要把不同方程族、边界条件和时空分辨率的数据混在一起学，才能成为更通用的 PDE foundation model；第二，直接把所有异构数据压进一个 dense backbone 往往产生负迁移。论文的 preliminary experiment 显示，同一方程族内不同参数混训只会带来相对温和的误差上升，而完全不同方程类型混训时误差可能急剧恶化。

MoE-POT 的设计目标是把“容量扩展”和“每次推理成本”解耦。dense 模型增大宽度/深度时，所有参数都会在推理中激活；MoE 则把参数拆成专家集合，只激活与当前输入最相关的一小部分。对 PDE 来说，路由网络还具有物理含义：不同数据集/方程族会触发不同专家组合，shared experts 则保留跨任务共性。

##### 输入编码与时间聚合

输入是时变 PDE 场：

$$
\bm{u}^{<T}\in\mathbb{R}^{H\times W\times T\times C}
$$

每个时间步先加可学习时空位置编码，再经 patchification layer：

$$
Z_p^t=\mathcal{P}(\bm{u}^t+\bm{p}^t),\quad t=1,\ldots,T
$$

其中 \(\mathcal{P}\) 是卷积层，位置编码可写为：

$$
p_{i,j}^t=W_p(x_i,y_j,t)
$$

随后用 Fourier feature 形式的时间聚合把多个历史帧汇成局部动态表示：

$$
\bm{z}_{\operatorname{agg}}
=\sum_t W_t\cdot\bm{z}_p^t e^{-i\bm{\gamma}t}
$$

直觉上，这一步让模型仅从观测轨迹中隐式推断 PDE 类型和动力学参数，而不依赖显式方程系数输入。

##### Fourier Layer

每个主干 block 先通过 Fourier layer 近似核积分。连续形式为：

$$
(\mathcal{K}_{\phi}z^l)(x)
=\int_{\Omega}\kappa(x,y;\phi)z^l(y)\,dy
$$

为了降低复杂度，令核具有平移不变性：

$$
\kappa(x,y;\phi)=\kappa(x-y;\phi)
$$

于是可在傅里叶域高效实现：

$$
(\mathcal{K}_{\phi}z^l)(x)
=\mathcal{F}^{-1}\left[R_{\phi}\cdot\mathcal{F}[z^l]\right]
$$

其中 \(R_\phi(k)\) 是频率相关的可学习变换。论文还使用 multi-head/grouping，把通道分成多个子空间分别进行频谱变换，以兼顾表达力和显存效率。

##### MoE Layer

MoE layer 接收 Fourier layer 输出的特征 \(z_0^l(x)\)。router-gating network \(s^l\) 产生 routed experts 的 logits：

$$
s^l(z_0^l(x))\in\mathbb{R}^{N_r},\qquad N_r=16
$$

softmax 后得到路由权重：

$$
w^l(z_0^l(x))=\operatorname{Softmax}(s^l(z_0^l(x)))\in\mathbb{R}^{N_r}
$$

为保持稀疏性，只保留 Top-\(K\) 项，论文默认 \(K=4\)：

$$
\operatorname{TopK}(w^l(z_0^l(x)))
=\{(i_k,w_k^l(z_0^l(x)))\}_{k=1}^{K}
$$

shared experts 始终激活，routed experts 动态选择。MoE 输出为：

$$
z^{l+1}(x)
=\frac{1}{N_s}\sum_{i=1}^{N_s}E_i^{l(s)}(z_0^l(x))
+\sum_{k=1}^{K}w_k^l(z_0^l(x))\cdot E_{i_k}^{l(r)}(z_0^l(x))
$$

其中 \(N_s=2\)，\(N_r=16\)，\(K=4\)。论文将 expert 和 router 都实现为 CNN，以保留 PDE 场的局部空间结构。

> 💡 关键：shared experts 提供所有 PDE 都能用的“公共物理子程序”，routed experts 则按输入动态选择，降低不同方程族之间的参数冲突。

##### 负载均衡与训练损失

MoE 的常见风险是 routing collapse：少数专家被频繁选择，其余专家长期闲置。MoE-POT 对每层每个 expert 定义 batch importance：

$$
\operatorname{Importance}_i^l=\sum_{b=1}^{B}w_{i,b}^l(x)
$$

再用 routed experts importance 的变异系数作为均衡惩罚：

$$
\mathcal{L}_{balance}^l
=w_{bal}\cdot
\operatorname{CV}\left(\{\operatorname{Importance}_i^l\}_{i=1}^{N_r}\right)^2
$$

主任务是自回归去噪预测下一帧：

$$
\mathcal{L}
=\sum_{1\leq t\leq T}
\left\|\mathcal{G}_w(\bm{u}^{<t}+\bm{\varepsilon})-\bm{u}^t\right\|_2^2
+\sum_{l=1}^{N}\mathcal{L}_{balance}^l
$$

噪声 \(\bm{\varepsilon}\) 缓解训练和多步推理之间的分布偏移；balance loss 则保证扩大总参数量后，专家不会退化成只用少数几个。

##### 与 dense operator transformer 的区别

| 方面 | Dense POT/DPOT 类模型 | MoE-POT |
|------|----------------------|---------|
| 容量扩展 | 增宽/加深，所有参数激活 | 增加专家，总参数变大但稀疏激活 |
| 多 PDE 混训 | 单一参数空间承载全部方程 | 路由专家隔离方程族特征 |
| 推理成本 | 近似随总参数线性增长 | 随 activated experts 增长 |
| 可解释性 | 难判断方程类型影响 | routing pattern 可反映数据集/PDE 类型 |
| 风险 | 负迁移、过高推理成本 | routing collapse，需要 balance loss |

论文的解释性分析显示，训练后的 router-gating pattern 可用于推断数据集类型，说明 MoE 不只是增加参数量，而是在不同 PDE 动力学之间形成了可观察的专家分工。

#### 🧪 练习题
```yaml
question: "MoE-POT 中 shared experts 与 routed experts 的分工是什么？"
options:
  - "shared experts 只用于训练，routed experts 只用于推理"
  - "shared experts 始终激活以学习跨 PDE 共性，routed experts 由 router 动态选择以学习方程特异模式"
  - "shared experts 用于处理图结构，routed experts 用于处理文本 token"
  - "shared experts 负责损失函数，routed experts 负责数据增强"
answer: 1
explain: "MoE-POT 每层固定激活 2 个 shared experts，同时从 16 个 routed experts 中选择 Top-4；这种设计兼顾公共物理规律与不同 PDE 类型的专门化。"
```

### Poseidon

```yaml
id: poseidon
num: 26
name: Poseidon
full_name: PDE高效基础模型 (Efficient Foundation Models for PDEs)
year: '2026'
org: ETH Zurich
parent: fno
paper_url: https://arxiv.org/abs/2602.15004
project_url: ''
category: operators
motivation: PDE基础模型20样本达FNO千样本精度
```

#### 📝 一句话总结
Poseidon 提出以 scalable Operator Transformer (scOT) 为骨干的 PDE 基础模型，用 lead-time 条件化和 all2all 训练把少量 PDE 轨迹扩展成大规模算子学习样本，从而在下游 PDE 上用极少标注样本达到甚至超过专用 FNO 的精度。

#### 🎯 核心要点
- **scOT 多尺度算子 Transformer**：用 patch embedding、SwinV2 shifted-window attention、patch merging/expansion 和 U-Net 式跳连构成多尺度神经算子。
- **连续时间条件化**：在 LayerNorm 中注入 lead time \(t\)，使同一个模型可以直接查询任意目标时刻的解，而不只做固定步长预测。
- **all2all 训练策略**：利用时间相关 PDE 解算子的半群性质，把一条长度 \(K\) 的轨迹从 \(O(K)\) 个相邻样本扩展为 \(O(K^2)\) 个任意起止时间对。
- **PDEgym 预训练语料**：在 compressible Euler 和 incompressible Navier-Stokes 的多种数据分布上预训练，再迁移到 15 个未见下游任务。
- **跨 PDE 迁移方式**：通过通道补零、任务特定 embedding/recovery 层和主干参数迁移，把不同物理变量数目的 PDE 映射到统一 scOT 骨干。
- **样本效率突出**：论文报告 Poseidon 在 14/15 个下游任务上表现最优，并且达到同等误差所需样本数相对 FNO 的中位节省约 50 倍；任务元信息中的“20 样本达 FNO 千样本精度”对应这种少样本迁移现象。
- **开源生态**：Poseidon 模型、PDEgym 数据集和训练代码均公开，便于复现实验和作为 PDE foundation model 基线。

#### 🔬 深入细节
##### 来源与核心图示

任务给出的 `paper_url` 指向 `2602.15004`，该链接实际是 2026 年将 Poseidon 用作火星大气 weather emulator 的应用论文；Poseidon 方法本体的可访问论文是 `https://arxiv.org/abs/2405.19101`，官方代码为 `https://github.com/camlab-ethz/poseidon`。下面的方法解读以 Poseidon 本体论文为主，并把任务给出的 URL 视作相关应用来源。

![Poseidon / scOT 架构与 all2all 训练](https://arxiv.org/html/2405.19101v2/x2.png)
*图：scOT 主干、SwinV2 block、shifted-window attention 和 all2all 训练示意；Poseidon 用该骨干学习从初始条件到整条 PDE 轨迹的解算子。*

##### 算法伪代码

```python
# Poseidon 预训练与少样本微调伪代码
model = scOT(
    patch_embed=True,
    swin_v2_stages=True,
    time_conditioned_layernorm=True,
    unet_multiscale=True,
)

# 预训练：每条 PDE 轨迹 u_i(t_0), ..., u_i(t_K) 生成 all2all 时间对
for trajectory in pretraining_pdegym:
    for k in range(K + 1):
        for l in range(k, K + 1):
            x0 = trajectory.u[k]                 # 作为新的“初值”
            tau = trajectory.t[l] - trajectory.t[k]
            target = trajectory.u[l]

            pred = model(x0, lead_time=tau)
            loss = relative_l2(pred, target)
            optimizer.step(loss)

# 下游任务：迁移主干，重置或高学习率训练任务特定 embedding/recovery
model.load_pretrained_backbone()
model.reset_task_specific_io_if_needed()
for batch in few_shot_downstream_data:
    pred = model(batch.initial_or_input_field, lead_time=batch.tau)
    loss = relative_l2(pred, batch.solution)
    optimizer.step(loss)
```

##### 问题形式与解算子目标

Poseidon 学的不是单个时间步映射，而是 PDE 的解算子。对时间相关 PDE，令初值或输入函数为 \(a\)，解为 \(u(t)\)，解算子写成：

$$
u(t)=\mathcal{S}(t,a),\qquad \mathcal{S}:[0,T]\times \mathcal{X}\to \mathcal{X}.
$$

因此训练目标是得到 \(\mathcal{S}^{*}_{\theta}(t,a)\approx \mathcal{S}(t,a)\)，给定初值后可以直接生成任意时刻的解，而不是像普通自回归模型那样只能一步一步向前滚动。这个目标对 foundation model 很关键：预训练得到的表示要能迁移到不同 PDE、不同初值分布、不同时间尺度和不同输出变量数。

##### scOT 主干：把视觉 Transformer 改造成神经算子

scOT 先把输入场 \(a\in C(D;\mathbb{R}^n)\) 切成非重叠 patch，并用共享线性层嵌入为 \(C\) 维 token：

$$
\mathbf{v}=\widehat{\mathbf{E}}(a)\in C(D;\mathbb{R}^{C}).
$$

随后 token 进入分层 SwinV2 Transformer。每个 block 只在窗口内做多头自注意力，下一层窗口平移半个窗口宽度，让信息跨窗口交换。相比全局 ViT 注意力，这把高分辨率 PDE 场上的注意力成本限制在局部窗口内；相比纯卷积，又保留了跨区域组合特征的能力。编码器通过 patch merging 降低空间分辨率并提高通道数，解码器通过 patch expansion 恢复分辨率，U-Net 式跳连用 ConvNeXt block 把同尺度编码特征传给解码端。

> 💡 关键：Poseidon 的“基础模型能力”不只来自 Transformer 容量，而来自多尺度算子结构。patch/窗口机制提供可扩展性，U-Net 层级提供局部到全局的 PDE 表达，任务特定输入输出层提供跨 PDE 变量数适配。

##### lead-time 条件化：连续时间查询

标准 LayerNorm 对所有时间使用同一归一化参数，难以区分短时间外推和长时间演化。Poseidon 在归一化后加入 lead-time 调制：

$$
\mathrm{LN}_{t}(z)=\alpha(t)\odot \frac{z-\mu(z)}{\sqrt{\sigma^2(z)+\epsilon}}+\beta(t),
$$

$$
\alpha(t)=\alpha_1 t+\alpha_0,\qquad \beta(t)=\beta_1 t+\beta_0.
$$

其中 \(\alpha_1,\alpha_0,\beta_1,\beta_0\) 是可学习参数。直觉上，lead time 是“要求模型演化多远”的条件变量：小 \(t\) 更像局部时间推进，大 \(t\) 需要更强的全局稳定性和耗散/传播模式。把 \(t\) 注入每层归一化，比只把时间拼到输入通道更深地影响特征流。

##### all2all 训练：用半群性质放大数据

时间相关 PDE 解算子满足半群关系：

$$
\mathcal{S}(t_{\ell}-t_k,\mathcal{S}(t_k,a))=\mathcal{S}(t_{\ell},a),\qquad 0\le k\le \ell\le K.
$$

普通训练通常只用相邻时间对 \((u(t_k),u(t_{k+1}))\)，而 Poseidon 把任意早晚时刻都作为训练对：

$$
\mathcal{L}_{all2all}(\theta)=
\frac{1}{M\widehat{K}}
\sum_{i=1}^{M}\sum_{0\le k\le \ell\le K}
\frac{
\left\|\mathcal{S}^{*}_{\theta}(t_{\ell}-t_k,u_i(t_k))-u_i(t_{\ell})\right\|_2^2
}{
\left\|u_i(t_{\ell})\right\|_2^2+\epsilon
},
$$

$$
\widehat{K}=\frac{(K+1)(K+2)}{2}.
$$

这相当于把同一条数值轨迹切成大量“从任意状态出发、到任意未来时刻”的监督样本。它同时训练短期、长期和跨尺度时间映射，因此比只学一步预测更接近真正的解算子学习任务。

##### 预训练、微调与 FNO 的区别

FNO 的强项是频域卷积，适合在固定 PDE/固定网格分布上学习算子；但每个任务通常需要重新训练，且面对未见 PDE 时样本效率有限。Poseidon 选择先在 PDEgym 的 Euler/Navier-Stokes 族上学习通用流体动力学表示，再微调到波方程、Poisson/Helmholtz、airfoil、变系数对流等未见任务。微调时，若下游 PDE 的输入/输出通道与预训练不同，就重置或快速学习 embedding/recovery 层；大量 scOT 主干参数从预训练继承。

这解释了为什么 Poseidon 能在少样本下达到 FNO 大样本效果：FNO 从目标任务的样本里同时学习“物理表示”和“任务读写层”，Poseidon 则把前者主要放在预训练阶段完成。下游 20 个样本并不是凭空替代 1000 个样本，而是用来把已有 PDE 表示对齐到新任务。

##### 局限与使用注意

Poseidon 本体主要在规则 Cartesian 网格和有限 PDE 族上验证。论文也指出，若要覆盖更广泛的非笛卡尔几何、强边界条件变化或椭圆型稳态问题，需要更丰富的预训练数据和更强的几何适配机制。因此在复杂 CAD/非结构网格问题上，GAOT、GINO、RIGNO 等几何算子模型可能更合适；在规则网格且目标是跨 PDE 少样本迁移时，Poseidon 的 foundation model 路线更有优势。

#### 🧪 练习题
```yaml
question: "Poseidon 的 all2all 训练主要利用了时间相关 PDE 解算子的什么性质？"
options:
  - "傅里叶变换的平移不变性"
  - "解算子的半群性质，可从轨迹中构造任意起止时间对"
  - "边界条件的周期性"
  - "SwinV2 窗口注意力的局部性"
answer: 1
explain: "all2all 使用 \\(\\mathcal{S}(t_l-t_k, u(t_k))=u(t_l)\\)，把一条轨迹扩展为 \\(O(K^2)\\) 个监督样本。"
```

### GAOT

```yaml
id: gaot
num: 27
name: GAOT
full_name: 几何感知算子Transformer (Geometry Aware Operator Transformer)
year: '2026'
org: UIUC
parent: gino
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/e45a448dfa778f6d62729a7bc8633c06
project_url: ''
category: operators
motivation: 几何感知编码任意复杂域映射
```

#### 📝 一句话总结
GAOT 提出一种面向任意域 PDE 的 encode-process-decode 神经算子：用多尺度注意力图神经算子和几何嵌入把非结构点云编码成 latent tokens，再由 Transformer 做全局交互并用对称的 MAGNO 解码器在任意查询点输出解场。

#### 🎯 核心要点
- **MAGNO 编解码器**：把单尺度 GNO 扩展为 Multiscale Attentional Graph Neural Operator，在多个邻域半径上聚合 PDE 输入和局部几何信息。
- **几何嵌入显式建模域形状**：在每个尺度上用局部统计量或点集嵌入描述邻域点分布，弥补单纯坐标输入难以表达边界/空洞/局部密度的缺陷。
- **latent token grid 三种选择**：支持规则 stencil grid、原始点云下采样、投影低维网格；主实验中规则 latent grid 兼顾效率和精度。
- **Transformer 全局处理器**：MAGNO encoder 先把物理点云压到 latent tokens，ViT/RoPE/RMSNorm 处理器再做全局信息交换，避免每层都在百万级物理点上做消息传递。
- **MAGNO decoder 任意点查询**：对任意物理查询点 \(x\)，从附近 latent tokens 多尺度聚合并恢复目标解，天然支持变分辨率输入输出。
- **时间相关 PDE 支持**：把当前时间 \(t\)、lead time \(\tau\) 和当前状态 \(u(t)\) 作为输入，并可用 direct、residual 或 time-derivative 三种 time-stepping 形式；训练时可配合 all2all。
- **工程可扩展性**：图构建离线预计算/缓存、encoder/decoder 顺序处理、Transformer 批处理、必要时 edge dropping，使 GAOT 能处理 DrivAerNet++、DrivAerML、NASA-CRM 等大规模 3D CFD 数据。

#### 🔬 深入细节
##### 来源与核心图示

任务给出的 NeurIPS 页面可访问摘要和 PDF；更便于抽取方法细节的版本是 arXiv `https://arxiv.org/abs/2505.18781`，项目页为 `https://camlab-ethz.github.io/GAOT/`，代码页为 `https://github.com/shizheng-wen/GAOT`。

![GAOT 架构示意图](https://arxiv.org/html/2505.18781v4/x2.png)
*图：GAOT 使用 MAGNO encoder 将物理点云与输入函数聚合为几何感知 latent tokens，经 ViT 处理器全局交换信息，再用 MAGNO decoder 在任意查询点恢复 PDE 解。*

##### 算法伪代码

```python
# GAOT 前向传播伪代码
def gaot_forward(points_x, input_a, query_x, geometry_info, time=None, tau=None):
    # 1. 选择 latent point cloud / token grid
    latent_y = build_latent_grid(points_x, strategy="structured_stencil")

    # 2. MAGNO encoder: physical -> latent
    latent_tokens = []
    for y in latent_y:
        scale_features = []
        for r_m in multiscale_radii:
            neighbors = cached_neighbors(center=y, points=points_x, radius=r_m)
            agno = attentional_gno(y, neighbors, input_a, radius=r_m)
            geom = geometry_embedding(y, neighbors, geometry_info)
            scale_features.append(MLP(concat(agno, geom)))
        latent_tokens.append(attentional_scale_fusion(scale_features))

    # 3. Transformer processor on latent tokens
    z = patchify(latent_tokens)
    for block in vit_blocks:
        z = z + flash_grouped_attention(RMSNorm(z), rope=True)
        z = z + feed_forward(RMSNorm(z))
    processed_tokens = unpatchify(z)

    # 4. MAGNO decoder: latent -> arbitrary physical query points
    outputs = []
    for x in query_x:
        scale_features = []
        for r_m in decoder_radii:
            neighbors = cached_neighbors(center=x, points=latent_y, radius=r_m)
            agno = attentional_gno(x, neighbors, processed_tokens, radius=r_m)
            geom = geometry_embedding(x, neighbors, geometry_info)
            scale_features.append(MLP(concat(agno, geom)))
        outputs.append(readout(attentional_scale_fusion(scale_features)))

    return stack(outputs)
```

##### 从 GNO 到 AGNO：局部积分不再只看单一尺度

传统 GNO/GINO 的 encoder 可理解为在 latent 点 \(y\) 周围做核积分：

$$
w_e(y)=\sum_{x_k\in N(y)}
\alpha_k\,K_{\theta}(y,x_k,a(x_k))\,\varphi_{\theta}(a(x_k)),
$$

其中 \(N(y)\) 是半径 \(r\) 内的物理邻域。GAOT 认为单一半径很难同时处理边界层、小涡结构和大尺度几何轮廓，因此定义多组半径：

$$
r_m=s_m r_0,\qquad m=1,\ldots,\bar{m}.
$$

在每个尺度上，GAOT 用注意力替代固定 quadrature 权重：

$$
\alpha_{k}^{m}(y)=
\mathrm{softmax}_{x_k\in N_m(y)}
\left(
\frac{q_m(y)^\top k_m(x_k)}{\sqrt{d}}
\right),
$$

$$
\widetilde{w}^{m}_{e}(y)=
\sum_{x_k\in N_m(y)}
\alpha_{k}^{m}(y)\,
K_{\theta}^{m}(y,x_k,a(x_k))\,\varphi_{\theta}^{m}(a(x_k)).
$$

直觉上，半径小的邻域负责边界和局部梯度，半径大的邻域负责整体形状和远场条件；注意力权重让模型根据每个 \(y\) 的局部状态自动决定哪些邻居更重要。

##### 几何嵌入与多尺度融合

仅把坐标 \((x,y,z)\) 输入 GNO 并不足以表达“这个点附近是边界、孔洞、尖角、稀疏采样还是密集采样”。GAOT 在每个尺度 \(m\) 上为 latent 点计算几何嵌入 \(g^m(y)\)，例如邻居数量、局部点分布统计量、相对坐标形状描述等。随后将 PDE 聚合特征和几何嵌入拼接：

$$
\widehat{w}^{m}(y)=\mathrm{MLP}_{m}\left([\widetilde{w}^{m}_{e}(y), g^m(y)]\right).
$$

不同尺度不是简单相加，而是再经过一个尺度注意力：

$$
\beta_m(y)=
\mathrm{softmax}_{m}\left(\psi_m(\widehat{w}^{m}(y))\right),
\qquad
w_e(y)=\sum_{m=1}^{\bar{m}}\beta_m(y)\widehat{w}^{m}(y).
$$

这就是 MAGNO encoder。MAGNO decoder 做相反方向：以物理查询点 \(x\) 为中心，在 latent tokens 上构造多尺度邻域，聚合 processed tokens 与几何嵌入，输出 \(u(x)\)。这种对称设计使 GAOT 不依赖固定网格输出，任意点都可查询。

##### Transformer 处理器为什么放在 latent 空间

若直接在物理点云上堆 Transformer，百万级 CFD 表面点会让注意力和显存成本不可承受；若只用局部 GNN，则长程依赖传播慢。GAOT 把重计算放到 latent tokens 上：encoder 只做一次 physical \(\to\) latent，decoder 只做一次 latent \(\to\) physical，中间多层全局 self-attention 都在较小 token grid 上运行。

处理器使用 RoPE 注入相对位置，RMSNorm 稳定训练，并在实现中使用 Grouped Query / Flash Attention。对规则 latent grid，tokens 可以按 patch 输入 ViT block；对非规则 latent 点，也可以使用相应的坐标位置编码。

##### 时间相关 PDE 与训练损失

对稳态 PDE，GAOT 直接学习：

$$
\mathcal{S}_{\theta}(a)(x_j)\approx u_{\mathrm{true}}(x_j).
$$

训练损失是点级 MSE：

$$
\mathcal{L}_{MSE}=
\frac{1}{N_s N_p}
\sum_{i=1}^{N_s}\sum_{j=1}^{N_p}
\left\|
\mathcal{S}_{\theta}(\cdot)_i(x_j)-\mathbf{u}_{\mathrm{true},i}(x_j)
\right\|_2^2.
$$

对时间相关 PDE，输入扩展为 \(a(t)=(c,u(t))\)，模型输出：

$$
\widehat{\mathcal{S}}_{\theta}(x,t,\tau,a(t)).
$$

最终时间推进可以写成：

$$
\mathcal{S}_{\theta}(t,\tau,a(t))(x)
=\gamma u(t,x)+\delta\widehat{\mathcal{S}}_{\theta}(x,t,\tau,a(t)).
$$

其中 \((\gamma,\delta)=(0,1)\) 是直接预测 \(u(t+\tau)\)，\((1,1)\) 是残差预测，\((1,\tau)\) 近似预测时间导数。论文消融显示 time-derivative marching 常更优，因为它把小步演化写成对当前状态的平滑修正。

##### 与 GINO / RIGNO / Transolver 的区别

GINO 的典型路线是 GNO encoder + 规则 latent grid + FNO/神经算子处理器 + GNO decoder，适合任意几何但单尺度局部聚合较弱。RIGNO 强在图神经算子和不规则点云，但全局处理效率受图规模影响。Transolver 通过物理注意力 token 化降低点云成本，但每层都涉及 slice/deslice 到物理点，超大网格下开销仍高。

GAOT 的关键折中是：encoder/decoder 只在两端碰物理点云，中间层都在 latent token 域；同时 MAGNO 让物理到 latent 的映射具备多尺度几何感知能力。这也是它能在 DrivAerML 约 900 万表面点这种数据上保持可训练性的原因。

##### 工程注意点

GAOT 的效果依赖图构建和 latent grid 选择。论文默认把坐标缩放到 \([-1,1]^d\)，多尺度半径示例为 \(\{0.022,0.033,0.044\}\)；工业 3D 数据常用单尺度半径和 KNN 补边保证每个物理点至少连接到 latent tokens。图构建通常离线缓存，训练时避免反复搜索邻域。若直接在线构图，encoder/decoder 的邻域搜索会成为瓶颈，掩盖 Transformer 处理器的效率优势。

#### 🧪 练习题
```yaml
question: "GAOT 相比 GINO 的核心结构增强是什么？"
options:
  - "只把 FNO 的傅里叶模态数加倍"
  - "用 MAGNO 在多个邻域尺度上注意力聚合，并显式加入局部几何嵌入"
  - "完全移除 latent tokens，直接在物理点云上做全局 Transformer"
  - "只使用固定规则网格，放弃任意查询点输出"
answer: 1
explain: "GAOT 的主要创新是多尺度注意力图神经算子和几何嵌入，并通过 latent token 处理器保持全局建模效率。"
```

### GINOT

```yaml
id: ginot
num: 28
name: GINOT
full_name: 几何信息神经算子Transformer (Geometry-Informed Neural Operator Transformer)
year: '2026'
org: UIUC
parent: gino
paper_url: https://arxiv.org/abs/2601.ginot
project_url: ''
category: operators
motivation: Transformer与神经算子集成
```

#### 📝 一句话总结
GINOT 用边界点云作为几何表示，通过采样-分组几何编码器生成 cross-attention 的 Key/Value，再让任意查询点作为 Query 解码 PDE 解场，从而在无需 SDF 或固定参数化几何的情况下处理复杂 2D/3D 任意域。

#### 🎯 核心要点
- **边界点云几何表示**：以 surface/boundary point cloud 表示几何，不依赖 signed distance function、规则网格或固定维度几何参数。
- **采样与分组编码局部几何**：使用 iterative farthest point sampling 选取 \(N_s\) 个中心，再在半径 \(r\) 的球邻域内分组 \(N_p\) 个点以提取局部形状特征。
- **局部-全局 cross-attention**：局部分组特征作为 Query，NeRF positional encoding 得到的全局点云特征作为 Key/Value，通过注意力融合局部与全局几何。
- **点序与 padding 鲁棒性**：采样/分组保证对点顺序不敏感；padding 点在采样、分组和注意力矩阵中被 mask，避免影响几何编码。
- **解码器任意点查询**：query points 经 positional encoding 与 MLP 生成 Query，注意力读取几何编码器输出的 Key/Value，最后用 MLP 输出该点解场。
- **额外物理输入扩展**：载荷、材料参数、边界条件等非几何输入可由额外 encoder 处理，再与几何编码拼接并聚合成 decoder 的 Key/Value。
- **训练损失带 mask**：对变长 query points 做 padding 后，用 masked MSE 排除无效点；实验同时报告 \(L_2\) relative error 和 NRMSE。

#### 🔬 深入细节
##### 来源与核心图示

任务给出的 `https://arxiv.org/abs/2601.ginot` 不是有效 arXiv 页面。可追溯的 GINOT 论文为 `https://arxiv.org/abs/2504.19452`，UIUC/Illinois 专家页和官方 GitHub `https://github.com/QibangLiu/GINOT` 也提供了相同方法摘要。因此本文保留任务 YAML 中的 URL，但方法解读基于可访问的 `2504.19452v2` 版本。

![GINOT 架构总览图](https://arxiv.org/html/2504.19452v2/x2.png)
*图：GINOT 的 geometry encoder 先把边界点云编码为 Key/Value；solution decoder 将查询点编码为 Query，通过 cross-attention 读取几何信息并输出解场。*

![GINOT 额外输入扩展](https://arxiv.org/html/2504.19452v2/x3.png)
*图：当问题还包含载荷、材料、边界条件等非几何输入时，额外 encoder 的输出与几何编码拼接，再聚合为 solution decoder 的 Key/Value。*

##### 算法伪代码

```python
# GINOT 前向传播伪代码
def ginot_forward(boundary_points, query_points, extra_inputs=None, masks=None):
    # 1. Geometry encoder: sampling + grouping
    centers = farthest_point_sampling(boundary_points, Ns, mask=masks.boundary)
    groups = ball_grouping(boundary_points, centers, radius=r, max_points=Np)

    # 2. Local geometry features from grouped neighborhoods
    grouped_pos = nerf_positional_encoding(groups)
    local = conv2d_mlp(concat(groups, grouped_pos))  # [Ns, C]

    # 3. Cross-attention inside geometry encoder
    global_feat = linear(nerf_positional_encoding(boundary_points))
    local = cross_attention(
        Q=local,
        K=global_feat,
        V=global_feat,
        mask=masks.boundary,
    )
    geom_tokens = self_attention_stack(local)
    geom_k, geom_v = linear_to_key_value(geom_tokens)

    # 4. Optional extra inputs such as load/material/BC
    if extra_inputs is not None:
        extra_tokens = extra_encoder(extra_inputs)
        geom_k, geom_v = aggregate_with_mlp(concat(geom_k, geom_v, extra_tokens))

    # 5. Solution decoder at arbitrary query points
    q = mlp(nerf_positional_encoding(query_points))
    h = cross_attention(Q=q, K=geom_k, V=geom_v)
    pred = solution_mlp(h)

    return pred
```

##### 几何编码器：为什么采样-分组是核心

任意几何的边界点云有三个麻烦：点的顺序没有物理意义、不同区域点密度不一致、不同样本点数不同。GINOT 的 geometry encoder 首先用 iterative farthest point sampling 选择 \(N_s\) 个代表中心。该过程从一个点开始，每次选择离已选集合最远的点，直到得到较均匀覆盖的中心集合。

每个中心再用球邻域分组：半径 \(r\) 内的点组成一组；如果不足 \(N_p\) 个，用最近点补齐；如果超过 \(N_p\) 个，只保留最近的 \(N_p\) 个。于是 grouped tensor 形状为：

$$
G\in \mathbb{R}^{N_s\times N_p\times d}.
$$

这些局部分组与 NeRF positional encoding 后的点特征拼接，经 2D convolution 和 MLP 压缩为 \(N_s\times C\) 的局部几何 token。采样-分组的作用类似 PointNet++：把无序点云转成一组局部 patch 表示，同时对输入点排列保持不敏感。

##### 注意力机制：局部 Query 读取全局几何

GINOT 在 geometry encoder 内部使用 cross-attention。局部分组特征作为 \(Q\)，全局点云 positional encoding 生成 \(K,V\)：

$$
\mathrm{Attn}(Q,K,V)=
\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_e}}\right)V.
$$

这样每个局部 patch 可以从整个边界点云中选择与自己相关的全局几何信息，例如对称结构、远处孔洞或整体外形。后续 self-attention 层继续在局部 tokens 之间交换信息，最终线性层把几何 tokens 转成 solution decoder 所需的 Key/Value。

##### padding mask：变长点云不污染注意力

批训练时，不同几何的边界点数和 query 点数不同，通常需要 padding 到 batch 内最大长度。GINOT 对 padding 做两层处理：一是在采样/分组阶段禁止 padding 点被选中；二是在注意力分数中把 padding 位置设为 \(-\infty\)：

$$
\mathrm{Attn}(Q,K,V;M)=
\mathrm{softmax}\left(\frac{QK^\top+M}{\sqrt{d_e}}\right)V,
$$

其中 \(M_{ij}=0\) 表示有效点，\(M_{ij}=-\infty\) 表示 padding 点。softmax 后 padding 权重为 0，因此不会进入几何表示。这个设计让模型对点顺序和 padding 都鲁棒。

##### 解码器：查询点是 Query，几何是 Key/Value

solution decoder 的目标是在任意 query point \(x_q\) 输出解 \(u(x_q)\)。查询点先经过 NeRF positional encoding 和 MLP 得到 Query：

$$
Q_q=\mathrm{MLP}(\gamma_{\mathrm{NeRF}}(x_q)).
$$

然后用 cross-attention 从 geometry encoder 的 Key/Value 中读取几何上下文：

$$
h_q=\mathrm{Attn}(Q_q,K_{\mathrm{geom}},V_{\mathrm{geom}}),
\qquad
\hat{u}(x_q)=\mathrm{MLP}_{out}(h_q).
$$

这种结构把“几何是什么样”与“要在哪里求解”分离开来：边界点云只需要编码一次，任意数量和分布的 query points 都可以共享同一个几何表示。这与 DeepONet 的 branch/trunk 解耦有相似直觉，但 GINOT 用 attention 将查询点和几何 token 细粒度耦合。

##### 额外输入与训练损失

许多工程问题不仅有几何变化，还包含载荷、材料、边界条件或历史状态变化。GINOT 的扩展版给这些输入增加额外 encoders，并把输出与几何 encoder 的 tokens 拼接，再用 MLP 聚合成 decoder 的 \(K,V\)。例如 bracket lug 数据集中，压力载荷被 MLP 编码后与几何 token 融合，使 decoder 同时感知“形状”和“载荷”。

训练使用 masked MSE。若 batch 内 query points padding 后共有 \(N\) 个位置，mask \(m_i=1\) 表示有效点，\(m_i=0\) 表示 padding，则：

$$
\mathcal{L}_{MSE}=
\frac{
\sum_{i=1}^{N}m_i\left\|\hat{y}_i-y_i\right\|_2^2
}{
\sum_{i=1}^{N}m_i+1
}.
$$

论文实验使用六类数据：elasticity、structured/unstructured Poisson、bracket lugs、micro-periodic unit cell、Jet Engine Bracket 等，覆盖 2D/3D、参数化几何、完全任意几何和变长 query 点。结果显示 GINOT 在不依赖 SDF 的情况下能保持较好精度，但对 Jet Engine Bracket 这类样本少且几何极复杂的任务仍有过拟合风险。

##### 与 GAOT / GINO 的关系

GINOT 更像“点云几何 encoder + attention decoder”的连续查询模型，重点解决任意几何表示和变长点云输入。GAOT 更像大规模 neural operator 框架，用 MAGNO encoder/decoder + latent Transformer 处理器把精度、吞吐和工业 CFD 尺度结合起来。GINO 则主要通过 GNO 在物理域和 latent grid 之间映射，再由 FNO 处理 latent 表示。若任务规模中等、几何边界点云是主要输入，GINOT 的结构直接且易解释；若目标是百万级点云和高吞吐训练，GAOT 的 latent-token 工程设计更强。

#### 🧪 练习题
```yaml
question: "GINOT 中 solution decoder 的 Query、Key、Value 分别来自哪里？"
options:
  - "Query 来自查询点编码，Key/Value 来自几何编码器输出"
  - "Query 来自边界点云，Key/Value 来自查询点编码"
  - "Query、Key、Value 都来自同一个固定规则网格"
  - "Query 来自损失函数，Key/Value 来自优化器状态"
answer: 0
explain: "GINOT 先把边界点云编码为几何 Key/Value，再把任意 query points 编码为 Query，通过 cross-attention 输出对应位置的解场。"
```

### S-NOT

```yaml
id: s_not
num: 29
name: S-NOT
full_name: 序列神经算子Transformer (Sequential Neural Operator Transformer)
year: '2026'
org: UIUC
parent: fno
paper_url: https://arxiv.org/abs/2601.snot
project_url: ''
category: operators
motivation: 时间相关非线性PDE代理模型
```

#### 📝 一句话总结
S-NOT 将 GRU 的序列载荷编码与 Transformer 的自注意力/交叉注意力结合起来，解决 S-DeepONet 在时间依赖、路径依赖非线性 PDE 中只能用固定点积融合 branch/trunk 表征的问题，使每个空间查询点都能按需读取完整载荷历史。

#### 🎯 核心要点
- **可访问来源说明**：任务给定的 `https://arxiv.org/abs/2601.snot` 是占位式链接；可访问论文为 arXiv:2507.03272《Sequential Neural Operator Transformer for High-Fidelity Surrogates of Time-Dependent Non-linear Partial Differential Equations》
- **两段式架构**：Sequential loading encoder 处理时间序列输入，solution decoder 在目标查询点生成全场解
- **GRU 保留因果历史**：沿用 S-DON 的 GRU 编码器处理载荷、边界条件或多物理输入序列，避免普通 FNN branch 丢失顺序信息
- **Self-attention 强化序列表示**：GRU 输出叠加正弦位置编码后进入多层自注意力块，进一步选择关键时间片和输入通道
- **Cross-attention 替代点积融合**：decoder 将 NeRF 风格位置编码后的查询点作为 \(Q\)，将序列编码作为 \(K,V\)，让每个查询位置动态聚合载荷历史
- **面向强非线性材料响应**：在钢连铸热-力耦合、3D lug、dog-bone 等塑性/热黏塑性路径依赖任务上对比 S-DON
- **精度提升且推理仍快**：论文报告 S-NOT 在三个数据集上均降低 stress/PEEQ/temperature 误差，GPU 单样本推理时间与 S-DON 同量级

#### 🔬 深入细节
##### 核心架构示意

![S-NOT 架构示意图](https://arxiv.org/html/2507.03272v1/x1.png)
*图：S-NOT 由序列载荷编码器和解码器组成；编码器用 GRU 与 self-attention 得到载荷历史表示，解码器用查询点 embedding 与 cross-attention 输出目标物理场。来源为 arXiv:2507.03272v1 HTML 的 Figure 2。*

##### 算法伪代码

```python
# S-NOT 前向传播与训练伪代码
def snot_forward(load_sequence, query_points):
    # load_sequence: [batch, T, input_channels]
    # query_points: [batch, Nq, coord_dim]

    h_seq = GRU_encoder(load_sequence)                 # 保留时间/路径依赖
    h_seq = h_seq + sinusoidal_time_encoding(T=h_seq.shape[1])

    z = h_seq
    for block in encoder_self_attention_blocks:
        z = layer_norm(z + self_attention(Q=z, K=z, V=z))
        z = layer_norm(z + feed_forward(z))

    q = nerf_positional_encoding(query_points)
    q = query_mlp(q)                                   # [batch, Nq, de]

    y = q
    for block in decoder_cross_attention_blocks:
        y = layer_norm(y + cross_attention(Q=y, K=z, V=z))
        y = layer_norm(y + feed_forward(y))

    field_pred = output_mlp(y)                         # [batch, Nq, n_fields]
    return field_pred

for load_sequence, query_points, field_true in dataloader:
    field_pred = snot_forward(load_sequence, query_points)
    loss = mse(field_pred, field_true)                 # 或全场相对 L2 / MAE 指标
    loss.backward()
    optimizer.step()
```

##### 动机与背景

DeepONet 通过 branch net 编码输入函数、trunk net 编码查询坐标，再用内积输出 \(G(u)(y)\)。这个结构适合许多静态或弱路径依赖算子，但在真实工程模拟里，边界载荷、热流、位移和压力常常是时间序列；塑性、黏塑性或相变材料的当前状态不仅取决于当前输入，也取决于完整历史。

Sequential DeepONet (S-DON) 已经用 GRU 替换普通 branch network 来编码序列输入，但它仍然用固定点积合并 branch 与 trunk：

$$
\hat{u}(q)=\sum_{\ell=1}^{d_e} b_\ell(s_{1:T})\,t_\ell(q)+b_0.
$$

这个融合方式对所有查询点使用同一组 branch 表征，查询点无法显式选择“哪些时间片、哪些载荷特征对当前位置最重要”。S-NOT 的核心改动是把这个点积替换为注意力机制。

##### 核心机制：从固定内积到查询相关聚合

论文使用标准 scaled dot-product attention：

$$
\operatorname{Attention}(Q,K,V)
=\operatorname{softmax}\left(\frac{QK^{T}}{\sqrt{d_e}}\right)V.
$$

在 encoder 中，GRU 输出 \(h_{1:T}\) 叠加时间位置编码后被线性投影为 \(Q,K,V\)，经过 self-attention 得到序列表示 \(z_{1:T}\)。这一步让不同时间片之间可以直接交互，例如某个后期塑性响应可回看早期加载峰值。

在 decoder 中，每个查询点 \(q_i=(x_i,y_i,z_i,t_i)\) 先通过 NeRF-style positional encoding 和 MLP 形成查询向量 \(Q_i\)。然后 \(Q_i\) 与 encoder 输出的 \(K,V\) 做 cross-attention：

$$
c_i=\operatorname{Attention}(Q_i, K_{\text{seq}}, V_{\text{seq}}),\qquad
\hat{u}(q_i)=\operatorname{MLP}_{\text{out}}(c_i).
$$

因此，同一个载荷历史会被不同空间位置以不同权重读取。靠近约束、载荷接触面或高应力集中区域的查询点，可以关注与该位置响应更相关的时间片；远离关键区域的位置则可聚合更平滑的历史特征。

##### 训练与评估流程

训练数据由数值模拟生成：输入是时变载荷或边界条件序列，输出是目标时间或终态的全场物理量。S-NOT 可在任意查询节点上评估，因此训练时可把有限元节点、空间坐标和目标字段组成监督样本。典型监督损失可写为：

$$
\mathcal{L}(\theta)=\frac{1}{B N_q}\sum_{b=1}^{B}\sum_{i=1}^{N_q}
\left\|\hat{u}_{\theta}^{(b)}(q_i)-u^{(b)}(q_i)\right\|_2^2.
$$

论文结果主要用 stress 的相对误差和 PEEQ 的 MAE 衡量。S-NOT 在 steel solidification 中将 stress mean error 从 S-DON 的 18.1% 降到 4.3%，在 3D lug 中从 11.6% 降到 5.31%，在 dog-bone 中从 2.01% 降到 1.13%。这些提升尤其体现在高误差长尾样本上，说明 cross-attention 对异常路径和局部强非线性更稳健。

##### 与 S-DON、FNO 类方法的区别

S-NOT 不是 FNO 那类在规则网格上用频域卷积参数化积分核的模型，而是更接近 DeepONet/Transformer 组合：输入函数由序列网络编码，输出坐标作为 query 逐点解码。它继承 DeepONet 适合任意查询点的优点，也继承 GRU 对时间历史的归纳偏置。

与 S-DON 的关键差别在 fusion：S-DON 的 branch/trunk 点积相当于固定双线性读出；S-NOT 的 cross-attention 是查询相关读出。这个变化增加了模型对空间位置、载荷时间片和输出物理量之间复杂依赖的表达能力，但仍保持与 S-DON 接近的推理开销。

> 💡 关键：S-NOT 的创新不只是“把 Transformer 加进来”，而是把算子学习中最关键的 branch-trunk 融合从静态内积改成了可学习的注意力检索。

#### 🧪 练习题
```yaml
question: "S-NOT 相比 S-DeepONet 的核心机制变化是什么？"
options:
  - "用 cross-attention 让每个查询点从序列载荷表示中动态聚合信息"
  - "用 FFT 替代所有空间坐标编码，从而只在频域预测解"
  - "完全取消 GRU，只保留普通全连接 branch network"
  - "把监督损失替换为强化学习奖励函数"
answer: 0
explain: "S-DON 用固定点积合并 branch 和 trunk；S-NOT 将查询点表示作为 Q、序列编码作为 K,V，通过 cross-attention 做查询相关的信息读取。"
```

### FEDONet

```yaml
id: fedonet
num: 30
name: FEDONet
full_name: 傅里叶嵌入深度算子网络 (Fourier-Embedded DeepONet)
year: '2026'
org: arXiv
parent: deeponet
paper_url: https://arxiv.org/abs/2511.09
project_url: ''
category: operators
motivation: 傅里叶嵌入增强高频特征捕捉
```

#### 📝 一句话总结
FEDONet 在 DeepONet 的 trunk 输入端加入固定随机 Fourier feature embedding，解决普通 MLP trunk 对高频、尖锐梯度和多尺度 PDE 解存在低频偏置的问题，同时保留 Branch-Trunk 算子学习框架的连续坐标查询能力。

#### 🎯 核心要点
- **可访问来源说明**：任务给定的 `https://arxiv.org/abs/2511.09` 不指向有效论文；可访问预印本为 arXiv:2509.12344《FEDONet: Fourier-Embedded DeepONet for Spectrally Accurate Operator Learning》
- **即插即用改造**：不改 branch network，只把 trunk 的原始坐标 \(\zeta\) 替换为 Fourier embedding \(\phi(\zeta)\)
- **随机 Fourier 特征**：使用固定高斯频率矩阵 \(B\)，构造 \([\sin(2\pi B\zeta),\cos(2\pi B\zeta)]\) 作为坐标特征
- **缓解谱偏置**：把高频模式显式暴露给 trunk MLP，提升对振荡、间断、尖锐界面和混沌时空结构的表达
- **核近似视角**：\(\phi(\zeta)^\top\phi(\zeta')\) 近似 shift-invariant kernel，相当于对 trunk 做谱预条件
- **训练目标保持简单**：仍采用监督式 operator learning 和 MSE/relative \(L_2\) 误差，不需要额外 PDE 残差项
- **验证范围广**：论文覆盖 2D Poisson、Burgers、Lorenz-63、Eikonal、Lorenz-96、Allen-Cahn、Kuramoto-Sivashinsky 等 PDE/动力系统基准

#### 🔬 深入细节
##### 核心架构示意

![FEDONet 架构示意图](https://arxiv.org/html/2509.12344v1/Fourier_Embedded_DeepONet_Diagram.png)
*图：FEDONet 保持 DeepONet 的 branch-trunk 内积结构，但在 trunk 前插入 Fourier embedding，使坐标输入先被映射到随机正弦/余弦谱特征。来源为 arXiv:2509.12344v1 HTML 的 Figure 1。*

##### 算法伪代码

```python
# FEDONet 前向传播伪代码
class FourierEmbedding:
    def __init__(self, coord_dim, num_frequencies, sigma):
        self.B = normal(mean=0.0, std=sigma, shape=(num_frequencies, coord_dim))
        self.B.requires_grad_(False)                  # 论文默认固定，不训练

    def __call__(self, zeta):
        phase = 2.0 * pi * zeta @ self.B.T
        return concat([sin(phase), cos(phase)], dim=-1)

def fedonet_forward(u_sensors, zeta):
    # u_sensors: 输入函数在 sensors 上的值
    # zeta: 输出查询坐标，可为空间坐标或空间-时间坐标
    branch_coeff = branch_net(u_sensors)              # [batch, p]
    trunk_feat = fourier_embedding(zeta)              # [batch, 2M]
    trunk_basis = trunk_net(trunk_feat)                # [batch, p]
    pred = sum(branch_coeff * trunk_basis, dim=-1)
    return pred

for u_batch, zeta_batch, target_batch in dataloader:
    pred = fedonet_forward(u_batch, zeta_batch)
    loss = mean_squared_error(pred, target_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

标准 DeepONet 的预测形式为：

$$
\mathcal{G}_{\theta}(u)(\zeta)=B_{\theta}(u)\cdot T_{\theta}(\zeta).
$$

其中 branch 输出由输入函数决定，trunk 输出由查询位置决定。这个分解让 DeepONet 可以在任意坐标上求值，但 trunk 通常是以原始坐标为输入的 MLP。普通 MLP 存在 spectral bias：训练早期倾向先拟合低频分量，高频和局部尖锐结构收敛慢、误差大。对 Poisson 源项、Burgers 激波、Allen-Cahn 相界面或 KS 混沌轨迹，这种偏置会表现为过平滑和能谱衰减。

FEDONet 的改动很小：给定 \(\zeta\in\mathbb{R}^{d}\)，先做随机 Fourier 特征映射：

$$
\phi(\zeta)=\left[\sin(2\pi B\zeta),\cos(2\pi B\zeta)\right],
\qquad B_{ij}\sim\mathcal{N}(0,\sigma^2).
$$

然后把 \(\phi(\zeta)\) 而不是 \(\zeta\) 输入 trunk：

$$
\mathcal{G}_{\theta}(u)(\zeta)
=B_{\theta}(u)\cdot T_{\theta}(\phi(\zeta))
=\sum_{k=1}^{p}b_k(u)\,t_k(\phi(\zeta)).
$$

##### 核心机制：谱预条件的 trunk

Fourier embedding 的第一层作用可以理解为把低维坐标提升到一组固定正弦/余弦基上。若 \(B\) 中包含足够多尺度的频率，trunk MLP 不必从原始坐标里慢慢学习出高频振荡，而是可以直接组合已有谱特征。

从 kernel 视角看，随机特征满足近似关系：

$$
k(\zeta,\zeta')\approx \phi(\zeta)^{\top}\phi(\zeta').
$$

这意味着 trunk 不再只是在欧氏坐标上学习，而是在一个近似平移不变核的特征空间中学习。论文还讨论了近似 whitening：

$$
\mathbb{E}_{\zeta}\left[\phi(\zeta)\phi(\zeta)^{\top}\right]\approx I,
$$

它降低特征相关性，使优化问题更接近各向同性，对梯度下降和 NTK 条件数都有帮助。

##### 训练流程与损失函数

FEDONet 采用监督式数据集：

$$
\mathcal{D}=
\left\{\left(u^{(i)}, \{\zeta_j^{(i)},s_j^{(i)}\}_{j=1}^{Q}\right)\right\}_{i=1}^{N},
\qquad s_j^{(i)}=G(u^{(i)})(\zeta_j^{(i)}).
$$

训练目标是经验 MSE：

$$
\mathcal{L}(\theta)=
\frac{1}{N}\sum_{i=1}^{N}\frac{1}{Q}\sum_{j=1}^{Q}
\left\|G_{\theta}(u^{(i)})(\zeta_j^{(i)})-s_j^{(i)}\right\|^2.
$$

因为 Fourier embedding 固定不训练，新增开销主要是一次矩阵乘法和三角函数计算；branch-trunk 内积、任意查询坐标、连续输出等 DeepONet 优点都保留。频率尺度 \(\sigma\) 和频率数 \(M\) 是关键超参数：太小无法覆盖高频，太大可能引入过高频噪声或使训练更难。

##### 与 DeepONet 和 FNO 的区别

FEDONet 与 FNO 都利用频域思想，但层级完全不同。FNO 在每一层通过 FFT 参数化全局积分核，适合规则网格上的全场张量输入输出；FEDONet 只在 trunk 坐标端做 Fourier lifting，仍是 DeepONet 式的点查询结构，更容易处理连续坐标查询、非固定输出位置和已有 DeepONet 代码。

与普通 DeepONet 相比，FEDONet 的 branch 部分不变，主要改变 trunk 的函数类：

$$
\mathcal{H}_{\phi}\supset \mathcal{H}_{\text{vanilla}}.
$$

直觉上，原始 trunk 必须用 MLP 权重自己“合成”高频基；FEDONet 先把多尺度正弦/余弦交给 trunk，再由 MLP 学习组合系数。因此它对细尺度、振荡和能谱尾部更友好。论文在多个基准上报告 FEDONet 相比 vanilla DeepONet 有约 2-3 倍平均相对 \(L_2\) 改善，在 Kuramoto-Sivashinsky 等高频混沌问题上提升尤其明显。

> 💡 关键：FEDONet 的创新点不是把 DeepONet 改成 Fourier operator，而是用固定 Fourier 特征修正 trunk 的坐标表示，让 DeepONet 更像一个可学习的谱/Galerkin 合成器。

#### 🧪 练习题
```yaml
question: "FEDONet 中 Fourier embedding 放在 DeepONet 的哪个位置，主要解决什么问题？"
options:
  - "放在 trunk 输入端，用谱特征缓解 MLP 对高频结构的低频偏置"
  - "放在 branch 输出端，用随机噪声增强输入函数采样"
  - "放在损失函数之后，用 FFT 直接替代反向传播"
  - "放在优化器内部，用频率裁剪减少学习率"
answer: 0
explain: "FEDONet 将查询坐标映射为随机正弦/余弦特征后送入 trunk，使 trunk 更容易表示振荡、多尺度和尖锐结构，同时保留 DeepONet 的 branch-trunk 结构。"
```

### PI-Latent-NO

```yaml
id: pi_latent_no
num: 31
name: PI-Latent-NO
full_name: 物理信息潜空间神经算子 (Physics-Informed Latent Neural Operator)
year: '2026'
org: arXiv
parent: pino
paper_url: https://arxiv.org/abs/2601.pilno
project_url: ''
category: operators
motivation: 潜空间算子学习线性计算缩放
```

#### 📝 一句话总结
PI-Latent-NO 用两个端到端耦合的 DeepONet 在低维潜空间中学习 PDE 解算子，并通过自动微分把 PDE 残差、边界和初值约束直接加入训练，解决全空间 physics-informed neural operator 在高时空分辨率下计算和显存开销过大的问题。

#### 🎯 核心要点
- **可访问来源说明**：任务给定的 `https://arxiv.org/abs/2601.pilno` 是占位式链接；可访问论文为 arXiv:2501.08428《Physics-Informed Latent Neural Operator for Real-time Predictions of time-dependent parametric PDEs》
- **两级 DeepONet**：Latent-DeepONet 将随机输入场/参数映射到时间相关低维潜变量，Reconstruction-DeepONet 将潜变量解码回原始空间解场
- **端到端物理信息训练**：两个网络单次联合训练，通过 \(\hat{u}\) 的时空导数计算 PDE residual，不依赖大量配对标签
- **可选数据/潜变量监督**：若有少量高保真轨迹，可用 PCA/POD/autoencoder 得到 latent trajectory，并加入 \(\mathcal{L}_u\)、\(\mathcal{L}_z\) 约束
- **时空可分离计算**：PI-Vanilla-NO 需要对 \(n_t n_x\) 个时空点评估 trunk；PI-Latent-NO 可近似拆成时间潜变量评估和空间重构评估，降低到接近 \(n_t+n_x\)
- **面向高维参数 PDE**：验证包括 1D diffusion-reaction、1D Burgers、2D stove-burner transient diffusion、2D Burgers 等
- **计算缩放优势**：论文报告随空间/时间 collocation 增加，PI-Latent-NO 的 runtime 和 memory 近似稳定，PI-Vanilla-NO 更容易出现显存瓶颈

#### 🔬 深入细节
##### 核心架构示意

![PI-Latent-NO 架构示意图](https://arxiv.org/html/2501.08428v3/x2.png)
*图：PI-Latent-NO 的 proposed architecture panel。Latent-DeepONet 先学习低维 latent representation，Reconstruction-DeepONet 再从 latent 表示重构物理空间解；训练时用自动微分计算 PDE 约束。来源为 arXiv:2501.08428v3 HTML 的 Figure 1(b)。*

##### 算法伪代码

```python
# PI-Latent-NO 训练伪代码
def latent_deeponet(xi, t):
    # xi: 随机输入场、参数或初值的离散表示
    # t: 时间坐标
    return G_latent(xi, t)                            # z(t; xi) in R^{n_z}

def reconstruction_deeponet(z, x):
    # z: latent state at time t
    # x: 空间坐标
    return G_recon(z, x)                              # u_hat(t, x; xi)

for iteration in range(num_iterations):
    xi_batch = sample_input_functions(batch_size)
    t_r, x_r = sample_residual_collocation_points()
    t_bc, x_bc = sample_boundary_points()
    x_ic = sample_initial_points()

    z_r = latent_deeponet(xi_batch, t_r)
    u_r = reconstruction_deeponet(z_r, x_r)

    residual = d_dt(u_r) + PDE_operator(
        u_r, d_dt(u_r), d_dx(u_r), d2_dx2(u_r), t_r, x_r, xi_batch
    )

    loss_r = mse(residual, 0.0)
    loss_bc = mse(boundary_operator(u_hat_at(t_bc, x_bc)), 0.0)
    loss_ic = mse(u_hat_at(0.0, x_ic), initial_condition(xi_batch, x_ic))

    loss_data = optional_mse(u_hat_on_labeled_points, true_u)
    loss_latent = optional_mse(z_on_labeled_times, latent_targets)

    loss = (lambda_r * loss_r
            + lambda_bc * loss_bc
            + lambda_ic * loss_ic
            + lambda_u * loss_data
            + lambda_z * loss_latent)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

物理信息神经算子希望学习从随机输入配置 \(\boldsymbol{\xi}\) 到 PDE 解场 \(u(t,\boldsymbol{x})\) 的映射，同时满足控制方程：

$$
\begin{cases}
\frac{\partial u}{\partial t}
+\mathcal{N}\left(u,\frac{\partial u}{\partial t},
\frac{\partial u}{\partial\boldsymbol{x}},
\frac{\partial^2 u}{\partial\boldsymbol{x}^2},
\ldots,t,\boldsymbol{x},\gamma(t,\boldsymbol{x})\right)=0,
\quad \text{in }\Omega\times(0,T],\\
u(0,\boldsymbol{x})=g(\boldsymbol{x}),\quad \boldsymbol{x}\in\Omega,\\
\mathcal{B}\left(u,\frac{\partial u}{\partial\boldsymbol{x}},
t,\boldsymbol{x},\gamma\right)=0,
\quad \text{on }\partial\Omega\times(0,T].
\end{cases}
$$

直接在全时空域上训练 PI-Vanilla-NO 时，模型必须对大量 \((t,\boldsymbol{x})\) collocation 点评估解并反传导数。若时间点数为 \(n_t\)、空间点数为 \(n_x\)，全空间 trunk 评估数量接近 \(O(n_t n_x)\)，显存和自动微分成本会迅速放大。

PI-Latent-NO 的核心假设是：很多 PDE 解轨迹虽然在原始网格上维度很高，但时空动力学可由较低维潜变量描述。于是模型先学习

$$
\boldsymbol{z}(t;\boldsymbol{\xi})
=\mathcal{G}_{\text{latent}}(\boldsymbol{\xi})(t)\in\mathbb{R}^{n_z},
$$

再用重构算子输出物理空间解：

$$
\hat{u}(t,\boldsymbol{x};\boldsymbol{\xi})
=\mathcal{G}_{\text{recon}}\left(\boldsymbol{z}(t;\boldsymbol{\xi})\right)(\boldsymbol{x}).
$$

##### 物理信息损失与端到端训练

对预测解 \(\hat{u}\) 用自动微分计算时空导数，构造 residual：

$$
r_{\theta}(t,\boldsymbol{x};\boldsymbol{\xi})
=\frac{\partial \hat{u}}{\partial t}
+\mathcal{N}\left(\hat{u},\frac{\partial \hat{u}}{\partial t},
\frac{\partial \hat{u}}{\partial\boldsymbol{x}},
\frac{\partial^2 \hat{u}}{\partial\boldsymbol{x}^2},
\ldots,t,\boldsymbol{x},\gamma\right).
$$

总损失可概括为：

$$
\mathcal{L}
=\lambda_r\mathcal{L}_r
+\lambda_{bc}\mathcal{L}_{bc}
+\lambda_{ic}\mathcal{L}_{ic}
+\lambda_u\mathcal{L}_u
+\lambda_z\mathcal{L}_z.
$$

其中 \(\mathcal{L}_r\) 是 PDE residual MSE，\(\mathcal{L}_{bc}\) 与 \(\mathcal{L}_{ic}\) 分别约束边界和初值；\(\mathcal{L}_u\) 是可选的少量解场监督，\(\mathcal{L}_z\) 是可选的 latent trajectory 监督。若无标签数据，可令 \(\lambda_u=\lambda_z=0\)，进行纯 physics-informed 训练。

如果有少量高保真轨迹，论文建议先用 PCA/POD/autoencoder 获得潜变量轨迹：

$$
\mathcal{T}_{z,i}
=\left[\boldsymbol{z}_{0}^{(i)},\boldsymbol{z}_{\Delta t}^{(i)},
\ldots,\boldsymbol{z}_{n_t\Delta t}^{(i)}\right],
\qquad \boldsymbol{z}_a\in\mathbb{R}^{n_z}.
$$

这些潜变量不是必须项，而是作为数据稀缺场景下的额外约束，帮助 Latent-DeepONet 更快对齐有物理意义的低维流形。

##### 为什么能降低复杂度

PI-Vanilla-NO 通常把 \((t,\boldsymbol{x})\) 联合坐标送入 trunk，因此每个输入样本需要处理 \(n_t n_x\) 个时空查询。PI-Latent-NO 把“时间演化”和“空间重构”拆开：Latent-DeepONet 主要沿时间产生 \(n_z\) 维潜状态，Reconstruction-DeepONet 再把潜状态投影到空间坐标。

这种结构带来内在 separability。论文用一个示意例子说明：若有 5 个时间点和 10 个空间点，PI-Vanilla-NO 需要 50 个 trunk evaluations；PI-Latent-NO 可降为约 15 个，即 \(5+10\)。在大网格下，这种差异会转化为显存和自动微分成本的明显优势。

> 💡 关键：潜空间不是单独预训练后冻结的 ROM，而是与物理解码器一起端到端训练；PDE residual 仍然作用在重构后的 \(\hat{u}\) 上，因此潜变量必须服务于物理一致的原空间解。

##### 与 PINO/PI-Vanilla-NO 的区别

PINO 常在 FNO 等全场算子上加入物理残差，优势是能把数据监督与 PDE 约束结合；但若残差需要高阶导数或密集 collocation，计算仍可能随全时空网格增长。PI-Latent-NO 更强调低维 latent bottleneck 和可分离解码，用结构性压缩降低残差训练成本。

与两阶段 Latent DeepONet 相比，PI-Latent-NO 不依赖先训练好的降维模型再做算子学习，而是把 Latent-DeepONet 与 Reconstruction-DeepONet 联合优化。这样 PDE 约束、少量数据监督和潜变量形状可以共同决定最终表示，避免潜空间只为重构误差服务而忽略物理残差。

#### 🧪 练习题
```yaml
question: "PI-Latent-NO 相比 PI-Vanilla-NO 获得计算缩放优势的主要原因是什么？"
options:
  - "将时间相关潜变量学习与空间重构分离，避免对所有时空点做完整 trunk 评估"
  - "完全删除 PDE residual，只依赖监督数据训练"
  - "把所有输入场转换为固定 Fourier 模态并丢弃边界条件"
  - "只预测一个标量误差指标，不再输出物理场"
answer: 0
explain: "PI-Latent-NO 用 Latent-DeepONet 生成低维时间潜状态，再由 Reconstruction-DeepONet 解码到空间，使计算更接近 n_t+n_x，而不是 PI-Vanilla-NO 的 n_t*n_x。"
```

### DiffTaichi

```yaml
id: difftaichi
num: 32
name: DiffTaichi
full_name: 可微分Taichi (Differentiable Taichi)
year: '2020'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1910.03035
project_url: ''
category: diff_sim
motivation: 基于Taichi的自动微分比传统快188倍
```

#### 📝 一句话总结
DiffTaichi 提出面向物理仿真的可微分编程系统，把 Taichi 的高性能 imperative kernel 与自动微分结合起来，解决传统深度学习框架难以高效表达粒子-网格、碰撞、稀疏索引和长时间步仿真的问题。

#### 🎯 核心要点
- **来源修正**：任务给定 `paper_url` 指向的 arXiv 编号实际不是 DiffTaichi；本文精读使用可访问论文 `https://arxiv.org/abs/1910.00935`
- **两尺度自动微分**：kernel 内使用 source-code transformation 生成 adjoint kernel，kernel 间使用轻量 tape 记录调用并反向重放
- **保留 megakernel 性能**：允许把物理仿真的多阶段计算融合进单个 kernel，避免 TensorFlow/PyTorch 式小算子图带来的低算术强度
- **面向命令式并行程序**：支持 parallel-for、分支、显式数组读写和灵活索引，更贴近 CUDA/C++/Fortran 风格仿真代码
- **全局张量作为检查点**：反向传播时依赖每一步写入的全局状态，必要时用 checkpointing 缓解长轨迹显存压力
- **覆盖 10 类模拟器**：包括弹性体 MPM、不可压流体、刚体、布料、海浪、烟雾等，可用于控制、逆设计和参数优化
- **控制器端到端优化**：神经网络控制器和可微分仿真模块组成一个可反传程序，可用梯度下降替代高样本量强化学习
- **性能与生产力并重**：论文报告弹性体模拟器代码比手写 CUDA 短 4.2 倍、速度相近，且比 TensorFlow 实现快 188 倍

#### 🔬 深入细节
##### 核心架构示意

![DiffTaichi 神经控制器与仿真耦合示意](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/net.png)
*图：论文 Figure 1 左侧。神经网络控制器输出动作，DiffTaichi 物理仿真推进状态，最终损失对控制器参数或初始条件反向传播。*

![DiffTaichi 系统与轻量 tape](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/pipeline.png)
*图：论文 Figure 2 左侧。DiffTaichi 复用 Taichi 前端、IR 和后端编译器，在 IR 层加入可微分编程扩展。*

![DiffTaichi tape 反向重放机制](https://ar5iv.labs.arxiv.org/html/1910.00935/assets/figures/tape.png)
*图：论文 Figure 2 右侧。tape 只记录 kernel launch 结构，反向阶段按相反顺序调用自动生成的 gradient kernel。*

##### 算法伪代码

```python
# DiffTaichi 的两尺度 AD：kernel 内做源代码变换，kernel 间用 tape 反向重放
def optimize_controller(theta, initial_state, target):
    tape = []

    # forward simulation
    state = initial_state
    for t in range(T):
        action = neural_controller(theta, state)
        tape.append(("controller", theta, state, action))

        # each kernel is a Taichi megakernel with explicit indexing / branches
        launch_kernel(clear_grid, state.grid)
        tape.append((clear_grid, state.grid))
        launch_kernel(p2g, state.particles, state.grid, action)
        tape.append((p2g, state.particles, state.grid, action))
        launch_kernel(grid_op, state.grid)
        tape.append((grid_op, state.grid))
        launch_kernel(g2p, state.grid, state.particles)
        tape.append((g2p, state.grid, state.particles))

    loss = task_loss(state, target)
    seed_adjoint(loss, 1.0)

    # reverse pass: replay generated adjoint kernels in reverse launch order
    for item in reversed(tape):
        if item[0] == "controller":
            backprop_neural_controller(item)
        else:
            primal_kernel = item[0]
            adjoint_kernel = source_transform(primal_kernel)
            launch_kernel(adjoint_kernel, *item[1:])

    theta -= lr * theta.grad
```

##### 问题设定：为什么普通深度学习框架不够用

可微分物理仿真的目标是把一个时间推进程序看成可求导映射：

$$
\mathbf{s}_{t+1}=F_t(\mathbf{s}_t,\mathbf{a}_t,\phi),\qquad
\mathbf{a}_t=\pi_\theta(\mathbf{s}_t),\qquad
\mathcal{L}=\ell(\mathbf{s}_{T},\mathbf{s}^{\star})
$$

这里 \(\mathbf{s}_t\) 是粒子、网格、速度、密度、形变梯度等物理状态，\(\phi\) 是材料、边界或初始条件参数，\(\pi_\theta\) 可以是神经网络控制器。训练需要计算：

$$
\frac{\partial \mathcal{L}}{\partial \theta}
=
\sum_{t=0}^{T-1}
\frac{\partial \mathcal{L}}{\partial \mathbf{s}_{t+1}}
\frac{\partial F_t}{\partial \mathbf{a}_t}
\frac{\partial \pi_\theta(\mathbf{s}_t)}{\partial \theta}
$$

核心难点不是公式本身，而是 \(F_t\) 往往由大量命令式并行代码组成：粒子到网格散射、网格边界条件、碰撞分支、邻域 stencil、非连续接触和稀疏结构。把这些逻辑拆成深度学习框架里的小张量算子，会产生大量 gather/scatter、临时数组和 Python/graph 调度开销，算术强度低，且代码不接近传统仿真器写法。

##### 两尺度自动微分机制

DiffTaichi 的关键设计是把自动微分分成两个尺度。第一个尺度是 **kernel 内部**：对单个 Taichi kernel 的 IR 做 source-code transformation，生成对应的 adjoint kernel。例如一个标量赋值：

$$
y = f(x_1,x_2)
$$

反向传播维护 adjoint 变量 \(\bar{x}=\partial \mathcal{L}/\partial x\)，按链式法则更新：

$$
\bar{x}_1 \mathrel{+}= \bar{y}\frac{\partial f}{\partial x_1},\qquad
\bar{x}_2 \mathrel{+}= \bar{y}\frac{\partial f}{\partial x_2}
$$

对于并行循环和显式索引，adjoint kernel 仍然是一个高性能并行 kernel；散射累加对应 adjoint 的聚合，必要时使用原子加法或编译器生成的安全累加逻辑。这比 tracing 每一个标量操作更适合 megakernel，因为 forward kernel 的局部性和融合结构在 backward 中得以保留。

第二个尺度是 **kernel 之间**：一个仿真步通常调用多个 kernel，长轨迹会调用几百到几千次。DiffTaichi 不把整个长程序展开成一个巨大静态计算图，而是用轻量 tape 记录 “调用了哪个 kernel、参数是什么”。反向传播时，tape 按相反顺序重放每个 kernel 的 adjoint 版本：

$$
\bar{\mathbf{s}}_t
=
\left(\frac{\partial F_t}{\partial \mathbf{s}_t}\right)^{\top}\bar{\mathbf{s}}_{t+1},\qquad
\bar{\phi}
\mathrel{+}=
\left(\frac{\partial F_t}{\partial \phi}\right)^{\top}\bar{\mathbf{s}}_{t+1}
$$

> 💡 关键：DiffTaichi 不在“全程序 tracing”和“全程序源变换”之间二选一，而是 kernel 内源变换、kernel 间 tape。这样既保留灵活控制流，又避免为整段仿真生成庞大代码。

##### 全局张量、覆盖规则与 checkpoint

传统物理仿真代码经常原地更新数组，但反向传播需要知道某一步使用的旧值。DiffTaichi 要求程序员按可微分程序的规则组织状态：对时间相关变量保留历史，或把全局张量视为反向求值所需的检查点。以显式时间积分为例：

$$
\mathbf{v}_{t+1}=\mathbf{v}_{t}+\Delta t\,\mathbf{a}(\mathbf{x}_t,\mathbf{v}_t),\qquad
\mathbf{x}_{t+1}=\mathbf{x}_{t}+\Delta t\,\mathbf{v}_{t+1}
$$

若只保留最新 \(\mathbf{x},\mathbf{v}\)，反向阶段无法恢复 \(\mathbf{a}(\mathbf{x}_t,\mathbf{v}_t)\) 的输入。DiffTaichi 的实践是在数组维度中加入时间轴，或在内存受限时使用 checkpointing：保存部分时间点，反向到中间区间时重新计算 forward 状态。其本质是在内存 \(O(T)\) 和重算时间之间做权衡。

##### 以 MPM 弹性体为例

论文中的 `diffmpm` 例子使用 moving least squares material point method，连续体满足动量与质量守恒：

$$
\rho\frac{D\mathbf{v}}{Dt}
=
\nabla\cdot\boldsymbol{\sigma}+\rho\mathbf{g},\qquad
\frac{D\rho}{Dt}+\rho\nabla\cdot\mathbf{v}=0
$$

MPM 的一个时间步通常包含 particle-to-grid、grid operation、grid-to-particle 三段。普通张量框架很难自然表达粒子向网格邻域散射、网格节点条件分支、材料模型和碰撞处理；DiffTaichi 允许直接写：

```python
for p in particles:
    base = floor(x[p] * inv_dx - 0.5)
    for offset in neighborhood:
        weight = bspline_weight(x[p], base + offset)
        grid_v[base + offset] += weight * particle_momentum[p]
        grid_m[base + offset] += weight * mass[p]
```

这种代码在语义上接近 CUDA kernel，但编译器可以为它生成反向 kernel。优化任务可以是控制软体机器人向前移动：

$$
\mathcal{L}(\theta)
=
-x_{\text{center}}(T)
+\lambda\sum_{t=0}^{T-1}\|\mathbf{a}_t\|_2^2
$$

梯度 \(\partial\mathcal{L}/\partial\theta\) 会穿过所有 MPM 步和控制器。相比 model-free RL，这种梯度直接告诉控制器“哪个早期动作导致最终位移改变”，样本效率通常更高。

##### 与传统方法的区别

| 方面 | 普通深度学习框架 | 手写 CUDA adjoint | DiffTaichi |
|------|------------------|-------------------|------------|
| 程序表达 | 张量算子图，复杂索引笨重 | 性能高但开发成本高 | 命令式并行 kernel，接近仿真代码 |
| AD 粒度 | 小算子 tracing/graph | 人工推导 | kernel 内源变换 + kernel 间 tape |
| 性能 | 大量临时数组和散碎操作 | 接近硬件上限 | 保留 megakernel 算术强度 |
| 灵活性 | 分支、碰撞、scatter 不自然 | 灵活但不可维护 | 支持分支、显式索引、数据布局优化 |
| 典型应用 | 小规模可微分实验 | 单个专用模拟器 | 多类可微分物理模拟器和控制优化 |

DiffTaichi 的局限也很清楚：它要求用户理解可微分程序的写入规则；碰撞和接触可能有不可导或梯度不稳定点；长时间仿真的梯度仍可能爆炸、消失或受数值误差影响。因此它不是“自动让所有仿真问题好优化”，而是把高性能物理程序放进可反传优化回路，使梯度获取从手写工程问题变成语言和编译器问题。

#### 🧪 练习题
```yaml
question: "DiffTaichi 的两尺度自动微分中，轻量 tape 主要记录什么？"
options:
  - "每个标量算术操作的完整计算图"
  - "kernel launch 顺序与参数，并在反向阶段按相反顺序重放 adjoint kernel"
  - "神经网络每一层的权重初始化"
  - "所有粒子的最终位置快照，且不需要中间状态"
answer: 1
explain: "DiffTaichi 在 kernel 内通过源代码变换生成梯度 kernel；tape 只负责跨 kernel 的调用记录和反向调度，从而兼顾灵活性与性能。"
```

### JAX-MD

```yaml
id: jax_md
num: 33
name: JAX-MD
full_name: JAX分子动力学 (JAX Molecular Dynamics)
year: '2020'
org: DeepMind
parent: —
paper_url: https://github.com/google/jax-md
project_url: ''
category: diff_sim
motivation: 端到端可微分分子动力学框架
```

#### 📝 一句话总结
JAX-MD 把分子动力学写成 JAX 中的纯函数组合，使能量、力、积分器、邻居表和神经势能都可以端到端自动微分并经 XLA 加速，解决传统 MD 软件难以直接接入机器学习优化回路的问题。

#### 🎯 核心要点
- **项目页追溯论文**：任务给定 URL 是 GitHub 项目页；方法精读使用官方仓库、NeurIPS 2020 论文和 arXiv `1912.04232`
- **函数式数据流**：状态由数组/dataclass 表示，模拟由 `init_fn` 和 `update_fn` 组成，避免复杂类层次和隐式可变状态
- **JAX transformation 原生组合**：`grad` 计算力和轨迹梯度，`jit` 编译整段模拟，`vmap/pmap` 批量化或多设备并行
- **空间抽象**：用 `(displacement_fn, shift_fn)` 表达自由边界、周期边界和一般周期盒，统一距离计算和位置推进
- **势能抽象**：pair potential、many-body potential、Behler-Parrinello 网络、Graph Network 势能都可作为可微分能量函数
- **力来自能量梯度**：无需手写力场导数，核心关系是 \(\mathbf{F}_i=-\nabla_{\mathbf{R}_i}U(\mathbf{R})\)
- **邻居表和 cell list**：为有限截断势能提供空间分区，使大规模粒子模拟从全对全 \(O(N^2)\) 降到近似 \(O(Nn_{\text{nbr}})\)
- **支持多类动力学**：NVE、NVT Nose-Hoover、NPT、Langevin、Brownian、FIRE 和梯度下降等
- **研究用例明确**：论文展示神经网络势能模拟、粒子 packing 的 meta-optimization、以及基于局部邻域的 flocking 模拟

#### 🔬 深入细节
##### 核心架构示意

![JAX-MD 神经网络势能模拟示意](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/silicon_system_large.png)
*图：论文 Figure 2。JAX-MD 将图神经网络能量函数接入 NVT 模拟，展示由神经势能驱动的大规模硅原子系统快照。*

![JAX-MD flocking 示例](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/fig/flocking.png)
*图：论文 Figure 4。JAX-MD 的空间、邻居表和可微分能量抽象也可扩展到多智能体 flocking。*

##### 算法伪代码

```python
# JAX-MD 的典型工作流：定义空间 -> 定义能量 -> 自动求力 -> 构建积分器 -> 对轨迹求梯度
from jax import grad, jit, vmap
from jax_md import space, energy, simulate, quantity

def build_simulation(box_size, dt, temperature, theta):
    displacement_fn, shift_fn = space.periodic(box_size)

    # energy_fn 可以是经典势能，也可以是神经网络势能 U_theta(R)
    pair_energy = energy.lennard_jones_pair(displacement_fn)
    neural_correction = make_graph_network_energy(theta, displacement_fn)

    def total_energy(R, neighbor=None):
        return pair_energy(R, neighbor=neighbor) + neural_correction(R, neighbor)

    force_fn = quantity.force(total_energy)  # force = -grad_R total_energy
    init_fn, update_fn = simulate.nvt_nose_hoover(total_energy, shift_fn, dt, temperature)
    return init_fn, update_fn, force_fn

@jit
def rollout_loss(theta, key, R0, target_property):
    init_fn, update_fn, _ = build_simulation(box_size=25.0, dt=1e-3, temperature=1.0, theta=theta)
    state = init_fn(key, R0)
    for _ in range(num_steps):
        state = update_fn(state)
    pred = observable(state.position)
    return ((pred - target_property) ** 2).mean()

grad_theta = grad(rollout_loss)(theta, key, R0, target_property)
batched_loss = vmap(rollout_loss, in_axes=(None, 0, 0, 0))
```

##### 空间与状态：把边界条件变成函数

分子动力学的基础状态通常是粒子位置 \(\mathbf{R}\in\mathbb{R}^{N\times d}\)、速度 \(\mathbf{V}\)、动量 \(\mathbf{P}\) 和盒子参数。JAX-MD 不把“空间”写死在模拟器内部，而是用两个函数描述：

$$
\mathbf{d}_{ij}=d(\mathbf{R}_i,\mathbf{R}_j),\qquad
\mathbf{R}_{i}^{\prime}=\mu(\mathbf{R}_i,\Delta\mathbf{R}_i)
$$

\(d\) 是 displacement function，负责处理自由边界、周期边界或一般周期盒下的最短位移；\(\mu\) 是 shift function，负责按位移更新位置并施加边界规则。这样势能函数只依赖 \(d\)，积分器只依赖 \(\mu\)，同一个 Lennard-Jones 或神经势能可在不同边界条件中复用。

> 💡 关键：JAX-MD 的抽象粒度不是“某个完整 MD 引擎”，而是一组可组合纯函数。空间、能量、邻居表、积分器都能单独被 `jit`、`grad`、`vmap` 处理。

##### 能量、力与自动微分

经典 MD 中，给定势能 \(U(\mathbf{R};\theta)\)，力由负梯度给出：

$$
\mathbf{F}_i(\mathbf{R};\theta)
=
-\frac{\partial U(\mathbf{R};\theta)}{\partial \mathbf{R}_i}
$$

对于 pair potential，JAX-MD 可把二体函数 \(u(r_{ij};\theta)\) 提升到全系统能量：

$$
U(\mathbf{R};\theta)
=
\sum_{1\le i<j\le N}
u_{\theta}\left(\left\|d(\mathbf{R}_i,\mathbf{R}_j)\right\|\right)
$$

若势能来自神经网络，例如图网络势能，可写作：

$$
U_{\theta}(\mathbf{R})
=
\sum_{i=1}^{N} \epsilon_{\theta}
\left(
\mathbf{R}_i,\{\mathbf{R}_j: j\in\mathcal{N}(i)\}
\right)
$$

传统 MD 软件通常要为每种势能手写力和优化后的 kernel；JAX-MD 则让能量函数成为一等公民，力由 `grad` 自动生成。这对机器学习势能尤其重要：网络结构、参数和物理模拟在同一个 JAX 计算图中，轨迹损失可以直接对 \(\theta\) 反传。

##### 动力学更新与轨迹可微分

JAX-MD 的模拟器遵循 JAX optimizer 风格：构造函数返回 `init_fn` 和 `update_fn`。一个确定性积分器可抽象为：

$$
\mathbf{s}_{t+1}
=
\Phi_{\Delta t}(\mathbf{s}_t;\theta)
$$

例如速度 Verlet 的简化形式为：

$$
\mathbf{V}_{t+\frac12}
=
\mathbf{V}_{t}
+\frac{\Delta t}{2m}\mathbf{F}(\mathbf{R}_{t};\theta)
$$

$$
\mathbf{R}_{t+1}
=
\mu\left(\mathbf{R}_t,\Delta t\,\mathbf{V}_{t+\frac12}\right)
$$

$$
\mathbf{V}_{t+1}
=
\mathbf{V}_{t+\frac12}
+\frac{\Delta t}{2m}\mathbf{F}(\mathbf{R}_{t+1};\theta)
$$

如果最终任务是让某个观测量 \(o(\mathbf{s}_T)\) 匹配目标 \(y\)，训练损失可写成：

$$
\mathcal{L}(\theta)
=
\left\|o(\mathbf{s}_T)-y\right\|_2^2,\qquad
\mathbf{s}_T=\Phi_{\Delta t}^{T}(\mathbf{s}_0;\theta)
$$

JAX 的反向模式自动微分会穿过所有更新步，得到 \(\partial\mathcal{L}/\partial\theta\)。这就是论文所说的 meta-optimization：优化的对象不只是单步能量，也可以是经过完整物理轨迹后产生的宏观性质、packing 几何或 agent 行为。

##### 邻居表：可微分模拟中的规模瓶颈

有限截断势能只需要计算距离小于 \(r_c\) 的粒子对：

$$
U(\mathbf{R})
=
\sum_i\sum_{j\in\mathcal{N}(i)}
u(r_{ij}),\qquad
\mathcal{N}(i)=\{j:\|d(\mathbf{R}_i,\mathbf{R}_j)\|<r_c\}
$$

朴素全对全计算需要 \(O(N^2)\) 距离。JAX-MD 提供 cell list 和 neighbor list，把空间划分成网格 cell，只检查附近 cell 中的候选粒子，使每步复杂度近似为 \(O(Nn_{\text{nbr}})\)。在 JAX/XLA 中这有一个工程限制：数组 shape 通常需要静态可知，因此 neighbor list 有容量上限；如果缓冲区溢出，需要重新 allocate，而普通 step 中只 update 位置对应的邻居信息。

##### 与 DiffTaichi 和传统 MD 软件的区别

| 方面 | LAMMPS/HOOMD-Blue 等传统 MD | DiffTaichi | JAX-MD |
|------|-----------------------------|------------|--------|
| 主要目标 | 高性能生产模拟 | 高性能可微分物理 DSL | JAX 生态中的可微分 MD 研究框架 |
| 编程风格 | C++/CUDA 插件与脚本接口 | 命令式 Taichi kernel | Python 函数式、数组变换 |
| 力场导数 | 多数需专门实现 | kernel 源变换 | `grad(energy_fn)` 自动生成 |
| ML 集成 | 通常需桥接代码 | 可接控制器，但在 Taichi 体系内 | 与 JAX/Flax/Haiku/Optax 等自然组合 |
| 性能取向 | 生产级优化 | 保留 megakernel 性能 | 研究迭代快，小 GPU 系统有竞争力 |
| 适用场景 | 长时间、大规模标准 MD | 复杂物理程序可微分化 | 神经势能、meta-optimization、批量实验 |

JAX-MD 的局限也来自它的优势：XLA 偏好静态 shape，而 MD 常有动态邻居、复杂数据结构和长轨迹内存压力；在超大生产规模上，它通常不如手写 CUDA/C++ 的成熟 MD 引擎。但对于“要把模拟嵌进学习系统”的研究问题，JAX-MD 的优势是同一份 Python/JAX 代码即可获得硬件加速、自动微分、批量化和神经网络集成。

#### 🧪 练习题
```yaml
question: "JAX-MD 中力的主要计算方式是什么？"
options:
  - "为每个势能手写 CUDA 力 kernel"
  - "用自动微分对势能函数求负梯度，即 F_i = -∂U/∂R_i"
  - "用强化学习直接预测所有粒子的下一步位置"
  - "只从邻居表中读取预先存储的力，不重新计算"
answer: 1
explain: "JAX-MD 的核心设计是把能量写成 JAX 可微分函数，再通过 grad 得到力；邻居表用于减少相互作用计算量。"
```

### NVIDIA-Warp

```yaml
id: nvidia_warp
num: 34
name: NVIDIA-Warp
full_name: NVIDIA Warp
year: '2022'
org: NVIDIA
parent: difftaichi
paper_url: https://github.com/NVIDIA/warp
project_url: ''
category: diff_sim
motivation: Python编译为CUDA支持大规模微分模拟
```

#### 📝 一句话总结
NVIDIA Warp 是面向仿真、机器人和几何计算的 Python JIT kernel 框架，把类型标注的 Python 函数编译为 CPU/CUDA 代码并自动生成 adjoint kernel，使大规模 GPU 物理程序能接入 PyTorch、JAX 和 Paddle 等机器学习训练流程。

#### 🎯 核心要点
- **项目页型来源**：任务给定 URL 是官方 GitHub；本文基于官方 README、当前稳定版文档的 Runtime 与 Differentiability 章节解读
- **Python 到 C++/CUDA/PTX**：用户用 `@wp.kernel` 写类型化 Python 函数，首次 launch 时按模块 JIT 编译并缓存
- **CUDA kernel 式并行模型**：`wp.launch(kernel, dim=...)` 以一维到四维线程网格执行，kernel 内用 `wp.tid()` 取得线程索引
- **默认生成 forward/backward kernel**：Warp 为 kernel 定义生成前向和反向 adjoint 版本，支持反向模式自动微分
- **显式 tape 机制**：`wp.Tape()` 记录 kernel launch，`tape.backward(loss)` 或传入输出 adjoint 后反向重放计算梯度
- **显式内存管理**：数组需声明 dtype、device 和 `requires_grad=True`，反向后梯度在 `array.grad` 或 tape gradients 中读取
- **物理计算原语丰富**：内置向量、矩阵、四元数、变换、网格/几何、FEM、稀疏矩阵和多类仿真示例
- **框架互操作**：Warp kernel 可作为机器学习 pipeline 的自定义可微分计算模块，与 PyTorch、JAX、Paddle 数据互通
- **相对 DiffTaichi 的定位**：继承“高性能可微分 kernel + tape”的思想，但使用更贴近普通 Python 的前端和 NVIDIA GPU 生态

#### 🔬 深入细节
##### 核心架构示意

![NVIDIA Warp 示例仿真集合](https://github.com/NVIDIA/warp/raw/main/docs/img/header.jpg)
*图：官方 README 展示的 Warp 物理仿真示例集合，覆盖粒子、流体、几何和优化类任务。*

![Warp 编译流水线](https://nvidia.github.io/warp/stable/_images/compiler_pipeline.svg)
*图：官方文档的 compilation model。Warp 从 Python kernel 定义生成 C++/CUDA 中间代码，运行时编译成动态库和 PTX 并缓存。*

##### 算法伪代码

```python
# Warp 的基本模式：类型化 kernel -> launch -> tape 记录 -> backward
import warp as wp

@wp.kernel
def integrate(
    pos: wp.array[wp.vec3],
    vel: wp.array[wp.vec3],
    mass: wp.array[float],
    force: wp.array[wp.vec3],
    dt: float,
):
    i = wp.tid()
    acc = force[i] / mass[i]
    vel[i] = vel[i] + dt * acc
    pos[i] = pos[i] + dt * vel[i]

@wp.kernel
def compute_loss(pos: wp.array[wp.vec3], target: wp.array[wp.vec3], loss: wp.array[float]):
    i = wp.tid()
    diff = pos[i] - target[i]
    wp.atomic_add(loss, 0, wp.dot(diff, diff))

pos = wp.array(init_pos, dtype=wp.vec3, device="cuda", requires_grad=True)
vel = wp.array(init_vel, dtype=wp.vec3, device="cuda", requires_grad=True)
force = wp.array(ctrl_force, dtype=wp.vec3, device="cuda", requires_grad=True)
loss = wp.zeros(1, dtype=float, device="cuda", requires_grad=True)

with wp.Tape() as tape:
    for _ in range(num_steps):
        wp.launch(integrate, dim=n_particles, inputs=[pos, vel, mass, force, dt], device="cuda")
    wp.launch(compute_loss, dim=n_particles, inputs=[pos, target, loss], device="cuda")

tape.backward(loss)
force_grad = force.grad
```

##### 编程模型：Python 表达，CUDA 语义

Warp kernel 看起来是 Python 函数，但它并不是逐行由 CPython 执行。用户用 `@wp.kernel` 声明 kernel，并为每个参数提供静态类型，例如 `wp.array[wp.vec3]`、`float`、`wp.mat33`。首次调用时，Warp 会把模块内注册的 kernel 编译成原生代码：

$$
\text{Python AST / type hints}
\longrightarrow
\text{Warp IR}
\longrightarrow
\text{C++/CUDA}
\longrightarrow
\text{dynamic library + PTX}
$$

kernel launch 的并行语义接近 CUDA。若执行：

```python
wp.launch(add_kernel, dim=1024, inputs=[a, b], outputs=[c], device="cuda")
```

则 kernel body 会被 1024 个 logical threads 执行，线程 \(i\) 通过 `wp.tid()` 访问自己的数组元素。二维或三维问题可以用 `dim=(nx, ny)` 或 `dim=(nx, ny, nz)`，此时 `wp.tid()` 返回坐标索引。这种模型比 NumPy 式整体数组表达更适合写碰撞、稀疏邻接、粒子系统、网格 stencil 和几何查询。

##### 自动微分：adjoint kernel 与 tape

Warp 默认为 kernel 生成 forward 和 backward/adjoin 版本。设若干 kernel 组合成映射：

$$
\mathbf{y}=F_K\circ F_{K-1}\circ\cdots\circ F_1(\mathbf{x})
$$

目标损失为：

$$
\mathcal{L}(\mathbf{x})=\ell(\mathbf{y})
$$

反向模式需要计算：

$$
\bar{\mathbf{x}}
=
\left(\frac{\partial F}{\partial \mathbf{x}}\right)^{\top}
\bar{\mathbf{y}},\qquad
\bar{\mathbf{y}}=\frac{\partial \ell}{\partial \mathbf{y}}
$$

Warp 的 `wp.Tape` 记录 forward pass 中的 kernel launch，然后从后往前调用对应 adjoint kernel。数组若要参与梯度链路，需要在创建时设置：

```python
x = wp.zeros(1024, dtype=wp.vec3, device="cuda", requires_grad=True)
```

反向结束后，梯度可从 `x.grad` 读取。对非标量输出，`tape.backward(grads={output: seed})` 可显式提供输出 adjoint，相当于计算向量-Jacobian product：

$$
\mathbf{v}^{\top}J
=
\mathbf{v}^{\top}\frac{\partial \mathbf{y}}{\partial \mathbf{x}}
$$

##### 一个最小公式例子

考虑 kernel 中每个线程计算：

$$
y_i=x_i^2+3x_i+1
$$

若损失为：

$$
\mathcal{L}=\sum_i y_i
$$

则反向 kernel 对每个线程执行的核心逻辑就是：

$$
\frac{\partial \mathcal{L}}{\partial x_i}
=
\frac{\partial \mathcal{L}}{\partial y_i}
\frac{\partial y_i}{\partial x_i}
=
1\cdot(2x_i+3)
$$

在真实仿真中，\(y_i\) 可能是下一步粒子位置、接触力、FEM 残差或渲染结果；Warp 的价值在于让这些计算保持 GPU kernel 形态，同时生成对应反向程序，而不是退回 Python 循环或小算子图。

##### 原地写入与梯度正确性

Warp 与 PyTorch/JAX 的重要区别是显式内存管理。深度学习框架通常每个操作产生新 tensor，因此中间值自然保留；Warp kernel 常写入用户提供的数组，甚至多次覆盖同一 buffer。自动微分时，如果某个数组元素被覆盖，旧值是否仍需用于反向传播就变成用户和框架共同管理的问题。

官方文档的规则是：输出梯度在 backward 中默认会被消费并清零，从而让多次写入时只通过最后一次写入传播梯度；如果用户设置 `retain_grad=True` 保留中间梯度，就必须确保每个元素最多写一次，否则可能重复计数。对 `wp.atomic_add()` 等累加式操作，Warp 的图会专门处理 adjoint accumulation。

> ⚠️ 注意：Warp 不是“任意 Python 程序自动可微”。kernel scope 支持的是可编译到 CPU/CUDA 的类型化子集；Python list、动态对象、任意全局状态和不可静态分析的控制流都不属于常规 kernel 语义。

##### 面向大规模微分模拟的机制

物理仿真常见更新可以写成：

$$
\mathbf{s}_{t+1}
=
\Phi_{\Delta t}(\mathbf{s}_t,\mathbf{u}_t,\phi)
$$

其中 \(\mathbf{u}_t\) 是控制输入，\(\phi\) 是质量、刚度、摩擦、几何等参数。Warp kernel 可以把每步分解为力计算、约束求解、积分、碰撞、loss reduction：

```python
with wp.Tape() as tape:
    for t in range(T):
        wp.launch(compute_forces, dim=n, inputs=[state, params, forces])
        wp.launch(solve_contacts, dim=num_contacts, inputs=[state, contacts, impulses])
        wp.launch(integrate, dim=n, inputs=[state, forces, impulses, dt])
    wp.launch(task_loss, dim=n, inputs=[state, target, loss])
tape.backward(loss)
```

如果优化目标是反推控制力或材料参数：

$$
\min_{\mathbf{u}_{0:T-1},\phi}
\left\|\mathbf{o}(\mathbf{s}_T)-\mathbf{o}^{\star}\right\|_2^2
+\lambda\sum_{t=0}^{T-1}\|\mathbf{u}_t\|_2^2
$$

Warp 的反向传播会给出 \(\partial\mathcal{L}/\partial \mathbf{u}_t\) 和 \(\partial\mathcal{L}/\partial\phi\)，这些梯度可直接交给 PyTorch/JAX 优化器。相比黑盒仿真加 finite difference，反向模式对高维参数更有效；相比完全手写 CUDA adjoint，开发成本显著降低。

##### 与 DiffTaichi 的关系和差异

| 方面 | DiffTaichi | NVIDIA Warp |
|------|------------|-------------|
| 前端 | Taichi DSL/Python 前端 | 类型化 Python 函数与装饰器 |
| 编译目标 | Taichi IR 到 CPU/GPU 后端 | Python 到 C++/CUDA/PTX，模块缓存 |
| AD 组织 | kernel 内源变换 + kernel 间 tape | forward/backward kernel + `wp.Tape` |
| 生态重点 | 论文级可微分物理语言与示例 | NVIDIA GPU、仿真、机器人、几何、ML 互操作 |
| 内存模型 | Taichi field/global tensor | 显式 `wp.array`、device、grad buffer |
| 典型用户 | 研究者实现可微分物理模拟器 | 需要 Python 生产力与 CUDA 性能的仿真/ML 开发者 |

可以把 Warp 看作 DiffTaichi 思路在更通用 Python/NVIDIA 生态中的工程化延展：保留“高性能 kernel 级编译 + 反向 adjoint + tape”的核心，同时提供更丰富的几何、FEM、稀疏、框架互操作和示例库。

#### 🧪 练习题
```yaml
question: "在 NVIDIA Warp 中，`wp.Tape()` 的主要作用是什么？"
options:
  - "把 Python 源文件保存成普通日志，供调试打印使用"
  - "记录 forward pass 的 kernel launch，并在 backward 中反向重放 adjoint kernel"
  - "自动把所有 Python 对象转换为 PyTorch tensor"
  - "为每个 GPU 线程动态分配 Python list"
answer: 1
explain: "Warp 的可微分流程依赖 tape 记录 kernel 调用图；反向阶段根据 loss 或输出 adjoint 触发对应 backward kernel 计算输入梯度。"
```

### PAC-NeRF

```yaml
id: pac_nerf
num: 35
name: PAC-NeRF
full_name: 物理增强连续NeRF (Physics Augmented Continuum NeRF)
year: '2023'
org: CMU
parent: difftaichi
paper_url: https://xuan-li.github.io/PAC-NeRF/
project_url: ''
category: diff_sim
motivation: 从视频推断流体物理参数
```

#### 📝 一句话总结
PAC-NeRF 将动态 NeRF、MPM 可微分连续介质仿真和多视角视频重建放进同一个优化图，解决了“未知几何 + 未知物理参数”场景下仅凭视频做系统辨识的问题。

#### 🎯 核心要点
- **几何无关系统辨识**：不要求预先给定网格、点云或物体拓扑，而是从多视角 RGB 视频同时恢复初始几何、运动状态和物理参数
- **连续介质约束 NeRF**：让密度场、颜色场随满足连续介质守恒律的速度场演化，避免普通动态 NeRF 学到不守物理的形变
- **Eulerian-Lagrangian 混合表示**：NeRF 密度/颜色保存在 Eulerian voxel grid，物质运动由 Lagrangian particles 通过 MPM 推进
- **P2G/G2P 互转层**：用三线性 shape function 在粒子和网格之间转换辐射场属性，使仿真输出能重新回到 NeRF 渲染空间
- **纯图像损失反传到物理参数**：通过可微渲染 + DiffTaichi MPM，把多帧重建误差反传到粘度、杨氏模量、屈服应力、摩擦角等参数
- **三阶段优化流程**：视频抠图预处理、首帧几何 seeding、冻结几何后用后续帧进行物理参数与初速度优化
- **材料覆盖面广**：论文在弹性体、塑性材料、沙粒、牛顿流体和非牛顿流体上验证，真实多相机视频中也能重建掉落小球

#### 🔬 深入细节
##### 核心架构示意

![PAC-NeRF 混合 Eulerian-Lagrangian 框架](https://ar5iv.labs.arxiv.org/html/2303.05512/assets/x1.png)
*图：PAC-NeRF 的 Figure 1。左侧从首帧 voxel NeRF 初始化，经过 G2P 得到 Lagrangian particles；MPM 根据物理参数推进粒子，再 P2G 回到 Eulerian radiance grid，用多视角渲染损失反向优化参数。来源为 ar5iv 对 arXiv:2303.05512 的 HTML 渲染图。*

##### 算法伪代码

```python
# PAC-NeRF 几何无关系统辨识伪代码
def pac_nerf_identification(multiview_video, cameras, theta_phys):
    masks = video_matting(multiview_video)

    # 1) 首帧几何 seeding：训练静态 voxel NeRF
    radiance_grid = initialize_voxel_nerf()
    for step in geometry_steps:
        rgb0 = render_voxel_nerf(radiance_grid, cameras, frame=0)
        loss_geo = photometric_loss(rgb0, multiview_video[0], masks[0])
        loss_geo += lambda_surf * surface_regularizer(radiance_grid.density)
        update(radiance_grid, loss_geo)

    # 2) 从 Eulerian 网格绑定到 Lagrangian 粒子
    particles = sample_particles_in_voxels(radiance_grid, particles_per_voxel=8)
    particles.features = G2P(radiance_grid.features, particles.x)

    # 3) 用可微 MPM 推进并从图像误差优化物理参数
    theta_vel = estimate_initial_velocity(particles, first_2_or_3_frames)
    for step in system_id_steps:
        sim_particles = particles
        total_loss = 0.0
        for t in range(1, T):
            sim_particles = differentiable_mpm_step(sim_particles, theta_phys, theta_vel)
            grid_t = P2G(sim_particles.features, sim_particles.x)
            pred_images = volume_render(grid_t, cameras)
            total_loss += photometric_loss(pred_images, multiview_video[t], masks[t])
        update([theta_phys, theta_vel], total_loss)

    return radiance_grid, theta_phys
```

##### 方法机制与关键公式

PAC-NeRF 的出发点是：传统从视频估计物理参数的方法通常假设物体几何已知，或者需要先重建成可仿真的网格；普通动态 NeRF 则可以拟合外观运动，但它的形变场不一定满足质量、动量和接触约束。PAC-NeRF 把两者合并：用 NeRF 处理视觉几何与渲染，用 MPM 处理连续介质动力学，再让图像误差穿过整个管线。

体渲染部分仍然使用 NeRF 的沿光线积分。对相机光线 \(r(s)=o+s d\)，像素颜色可写成：

$$
\hat{C}(r,t)=\int_{s_n}^{s_f} T(s,t)\,\sigma(r(s),t)\,c(r(s),d,t)\,ds,
\qquad
T(s,t)=\exp\left(-\int_{s_n}^{s}\sigma(r(u),t)\,du\right).
$$

多视角视频监督直接落在图像空间：

$$
\mathcal{L}_{\text{rgb}}=
\sum_{t=1}^{T}\sum_{v=1}^{V}\sum_{r\in\mathcal{R}_{v,t}}
\left\|\hat{C}_{v,t}(r;\theta,\phi)-C_{v,t}(r)\right\|_2^2,
$$

其中 \(\theta\) 表示辐射场参数，\(\phi\) 表示材料参数、初速度或接触相关参数。关键点是 \(\hat{C}\) 不是由任意时间 MLP 直接生成，而是由 MPM 推进后的物质状态重新映射到 Eulerian grid 后渲染。

物理约束来自连续介质守恒律。任意随物质运动的场 \(q(x,t)\) 需要满足材料导数关系：

$$
\frac{Dq}{Dt}=\frac{\partial q}{\partial t}+v\cdot\nabla q,
$$

速度场 \(v\) 又由动量守恒控制：

$$
\rho\frac{Dv}{Dt}=\nabla\cdot\sigma+\rho g.
$$

论文用可微 Material Point Method 解这个动力学系统。粒子适合承载质量、速度、材料形变和颜色/密度特征；网格适合求解力、碰撞和渲染重采样。因此 PAC-NeRF 使用 P2G/G2P 作为连接层。对粒子 \(p\) 和网格节点 \(i\)，三线性权重 \(w_{ip}=N_i(x_p)\) 给出：

$$
q_i=\frac{\sum_p w_{ip} m_p q_p}{\sum_p w_{ip}m_p},
\qquad
q_p=\sum_i w_{ip}q_i.
$$

这组互转有两个作用：第一，首帧 voxel NeRF 的密度/颜色能绑定到粒子上，形成随物质运动的 Lagrangian radiance field；第二，仿真后的粒子能投回 voxel grid，继续执行高效体渲染和碰撞处理。

##### 训练流程与设计取舍

实际优化被拆成三阶段。第一步先用视频 matting 去掉静态背景，只渲染前景物体，减少无关像素对梯度的干扰。第二步只用首帧训练静态 voxel NeRF，并加入 surface regularizer 让密度边界更紧致；这一阶段的目标是获得足够稳定的初始几何。第三步冻结初始辐射场，用前 2-3 帧估计初速度，然后把后续帧图像误差反传到物理参数。

这种两段式设计不是端到端美学上的妥协，而是为了可观测性和数值稳定性：如果几何、初速度和材料参数同时自由变化，优化器很容易用错误几何解释运动；先锁定首帧几何后，后续帧误差主要由动力学参数承担。代价是几何 seeding 的质量会影响系统辨识，后续工作也针对这一点提出过 Lagrangian particle optimization。

与 D-NeRF 一类方法相比，PAC-NeRF 不学习任意时间变形场，而是学习一个可被 MPM 推进的初始物质状态；与“NeRF + 已知网格仿真”相比，它不要求 watertight mesh 或 tetrahedral mesh。核心收益是物体拓扑和几何可以很复杂，但输出轨迹仍然被连续介质方程限制。

> 💡 关键：PAC-NeRF 的“物理增强”不只是给 NeRF 加一个正则项，而是把 NeRF 状态变成 MPM 粒子携带的物质属性，渲染误差必须穿过粒子-网格仿真链路才能更新参数。

#### 🧪 练习题
```yaml
question: "PAC-NeRF 为什么要在 Eulerian voxel grid 和 Lagrangian particles 之间来回转换？"
options:
  - "因为渲染和碰撞/网格计算更适合 Eulerian 表示，而物质输运和 MPM 动力学更适合 Lagrangian 粒子表示"
  - "因为 NeRF 只能在粒子坐标中执行体渲染，不能在规则网格上采样"
  - "因为 P2G/G2P 会自动消除所有图像噪声，所以不需要多视角损失"
  - "因为 MPM 不支持材料参数优化，只能优化颜色特征"
answer: 0
explain: "PAC-NeRF 用粒子承载随物质运动的状态，用网格执行渲染、碰撞和力更新；P2G/G2P 让图像损失可以穿过可微 MPM 反传到物理参数。"
```

### PIE-NeRF

```yaml
id: pie_nerf
num: 36
name: PIE-NeRF
full_name: 物理集成弹性动力学NeRF (Physics-Integrated Elastodynamics NeRF)
year: '2024'
org: PKU
parent: pac_nerf
paper_url: https://github.com/FYTalon/pienerf
project_url: ''
category: diff_sim
motivation: 隐式NeRF无网格离散化形变模拟
```

#### 📝 一句话总结
PIE-NeRF 用自适应采样、Q-GMLS 无网格降阶弹性动力学和二次 warping，把静态 NeRF 变成可交互、可指定材料参数的物理形变对象，解决了隐式 NeRF 依赖网格/笼形变且难以实时模拟弹性动力学的问题。

#### 🎯 核心要点
- **NeRF 上的无网格弹性仿真**：不需要 tetrahedral mesh、显式表面网格或 voxel simulation grid，而是从 NeRF 密度场采样点云代理
- **密度梯度驱动采样**：augmented Poisson disk sampling 根据 NeRF 密度梯度在边界和薄结构处放置更多粒子
- **Voronoi + Q-GMLS 降阶**：把采样粒子分组为少量 Q-GMLS kernels，用二次位移场表达大形变和弯曲/扭转
- **Integrator points 能量积分**：不对所有采样粒子做完整积分，而用 IPs 近似动能、势能和超弹性材料能量
- **隐式时间积分与 Newton 求解**：从 Lagrangian 方程组装非线性弹性动力学系统，支持外力、位置约束和交互操控
- **二次反向 warping 渲染**：对变形后射线采样点求近似 rest-pose 坐标，再查询原始 NGP-NeRF 的密度和颜色
- **交互式速度**：几十到上百个 Q-GMLS kernels 通常足以驱动复杂 NeRF 场景，适合实时拖拽植物、椅子、船等对象

#### 🔬 深入细节
##### 核心架构示意

![PIE-NeRF pipeline](https://fytalon.github.io/pienerf/static/image/pipeline.png)
*图：PIE-NeRF 官方项目页 pipeline。输入多视角图像训练 NGP-NeRF，随后进行 Poisson disk sampling、Q-GMLS kernels 与 integrator points 离散化、时间积分、二次 warping，并渲染物理一致的新姿态。来源为 https://fytalon.github.io/pienerf/。*

##### 算法伪代码

```python
# PIE-NeRF 交互式弹性动力学伪代码
def build_pie_nerf(images, cameras):
    nerf = train_instant_ngp(images, cameras)

    # 1) 用密度与密度梯度自适应采样隐式几何
    particles = augmented_poisson_disk_sampling(
        density=lambda x: nerf.sigma(x),
        grad_density=lambda x: autodiff_grad_sigma(nerf, x),
        reject_if_sigma_below=tau,
    )

    # 2) 降阶离散化：Voronoi kernels + integrator points
    kernels = voronoi_partition(particles)
    ips = select_integrator_points(particles, kernels)
    precompute_q_gmls_shape_functions(kernels, ips)

    return nerf, kernels, ips

def simulate_and_render(nerf, kernels, ips, user_forces):
    q, qdot = initialize_generalized_coordinates(kernels)
    for frame in interactive_session:
        f_ext = project_external_forces(user_forces[frame], kernels)

        # 隐式 Euler：Newton 求解广义坐标 q_{n+1}
        for newton_iter in range(max_iter):
            T, U = integrate_energy_with_ips(q, qdot, ips)
            residual = mass_matrix(q) @ acceleration(q) + grad(U, q) - f_ext
            tangent = hessian(U, q) + inertia_term
            q += solve_linear_system(tangent, -residual)

        # 对每个变形后射线采样点，用二次 warping 回 rest pose 查询 NeRF
        image = volume_render_with_quadratic_warping(nerf, q, ips)
        display(image)
```

##### 方法机制与关键公式

PIE-NeRF 关注的问题不同于 PAC-NeRF 的系统辨识：它假设已经有一个静态 NeRF，希望用户能像抓取真实弹性体一样施加力、拖拽、压缩并得到物理可信的新姿态。难点是 NeRF 是隐式辐射场，没有天然的网格单元、顶点连接和有限元自由度；如果先转成 mesh，再做 FEM，会增加网格生成、薄结构处理和重拓扑成本。

论文从 NeRF 密度场 \(\sigma(x)\) 中构造无网格代理。自适应 Poisson disk sampling 的直觉是：几何边界和薄结构附近 \(\|\nabla\sigma(x)\|\) 大，采样半径应变小，以便放置更多粒子。可概括为：

$$
r(x)=\frac{r_0}{1+\alpha\|\nabla\sigma(x)\|+\epsilon},
$$

并丢弃 \(\sigma(x)<\tau\) 的低密度点。这样得到的 particles 只作为几何与积分代理，不要求形成三角网格或四面体网格。

为了交互速度，PIE-NeRF 不把每个采样粒子都作为动力学自由度，而是用 Voronoi partition 形成 \(n\) 个 Q-GMLS kernels。第 \(i\) 个 kernel 的广义坐标包括中心位移、局部仿射项和二次项；对 rest-pose 位置 \(X\)，位移可写成二次近似：

$$
u(X)\approx
\sum_{i=1}^{n} w_i(X)
\left[
u_i + A_i(X-X_i) + (X-X_i)^\top B_i (X-X_i)
\right],
$$

其中 \(w_i(X)\) 是 GMLS 权重，\(u_i,A_i,B_i\) 构成 reduced generalized coordinates。相较 affine MLS，二次项能更好表达弯曲、扭转和大形变，尤其对树叶、薄片、船帆等 codimensional 结构更不容易产生 locking artifacts。

动力学来自 Lagrangian mechanics。用广义坐标 \(q\) 表示 kernel 自由度，系统满足：

$$
\frac{d}{dt}\frac{\partial \mathcal{L}}{\partial \dot{q}}
-\frac{\partial \mathcal{L}}{\partial q}=Q_{\text{ext}},
\qquad
\mathcal{L}(q,\dot{q})=T(q,\dot{q})-U(q).
$$

实际计算中，动能和势能不在所有 PDS 粒子上积分，而在一组 integrator points 上近似：

$$
T \approx \sum_{a\in \mathcal{I}}\frac{1}{2}\rho V_a
\left\|\dot{u}(X_a)\right\|^2,
\qquad
U \approx \sum_{a\in \mathcal{I}} V_a\,\Psi(F_a),
$$

其中 \(\Psi(F)\) 可选 ARAP、Neo-Hookean 等超弹性材料能量，\(F_a=I+\nabla u(X_a)\) 是 IP 处的形变梯度。Neo-Hookean 形式可概括为：

$$
\Psi(F)=\frac{\mu}{2}\left(\mathrm{tr}(F^\top F)-3\right)
-\mu\log J+\frac{\lambda}{2}(\log J)^2,\qquad J=\det F.
$$

这个公式里的 \(\lambda,\mu\) 对应材料 Lamé 参数，可由杨氏模量 \(E\) 和泊松比 \(\nu\) 转换而来，因此用户可以指定不同软硬程度和体积保持性。

##### 渲染与传统方法差异

仿真求得的是变形后的空间位置，但 NGP-NeRF 是在 rest pose 上训练的。PIE-NeRF 采用 inverse warping：对变形后光线上的查询点 \(x'\)，估计其 rest-pose 坐标 \(X\)，再查询 \(\sigma(X)\) 与颜色 \(c(X,d)\)。若只用一阶 Taylor 展开，在大形变下颜色和纹理会滑动；PIE-NeRF 利用 Q-GMLS 的二次位移先验，在附近 IP 上做二次 warping：

$$
x' \approx X + u(X),\qquad
u(X)\approx u(X_a)+J_a(X-X_a)+\frac{1}{2}(X-X_a)^\top H_a(X-X_a).
$$

对 \(X\) 的求解可用 Newton 迭代，每次只需解小规模 \(3\times3\) 系统。若查询点离单个 IP 不够近，则用多个近邻 IP 的反解按距离加权平均。这样渲染仍然利用原始高质量 NeRF，但姿态由物理仿真决定。

与 cage-based 或编辑式 NeRF 形变相比，PIE-NeRF 的变形不是纯几何启发式能量，而是来自可指定材料模型的动力学系统；与 FEM 相比，它避免了 tetrahedralization，并且 reduced Q-GMLS kernels 远少于 FEM 顶点/单元数量。限制也很明确：它的目标是静态 NeRF 的交互式弹性运动合成，不是从视频反推未知材料参数；材料参数通常由用户设定或调节。

> 💡 关键：PIE-NeRF 的核心不是“把 NeRF 转 mesh 再仿真”，而是用 NeRF 密度场直接生成无网格代理，并用 Q-GMLS 在少量广义坐标中求解弹性动力学。

#### 🧪 练习题
```yaml
question: "PIE-NeRF 使用 Q-GMLS 而不是普通 affine MLS 的主要原因是什么？"
options:
  - "二次位移场能更好表达大形变、弯曲和薄结构运动，并改进变形后 NeRF 的反向 warping"
  - "Q-GMLS 可以完全跳过时间积分，因此不需要求解动力学方程"
  - "Q-GMLS 只用于压缩图片纹理，与弹性仿真无关"
  - "Q-GMLS 的目的只是把 NeRF 转换成四面体网格"
answer: 0
explain: "PIE-NeRF 用 Q-GMLS 在无网格粒子上构造降阶二次位移场，既减少自由度，又避免 affine 近似在薄结构和大形变下的 locking 与渲染 warping 误差。"
```

### JAX-MPM

```yaml
id: jax_mpm
num: 37
name: JAX-MPM
full_name: JAX物质点法 (JAX Material Point Method)
year: '2026'
org: 清华大学
parent: jax_md
paper_url: https://link.springer.com/article/10.1007/s00366-026-02320-6
project_url: ''
category: diff_sim
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

### MOTO

```yaml
id: moto
num: 38
name: MOTO
full_name: 隐式MPM拓扑优化 (Topology Optimization via Implicit MPM)
year: '2026'
org: Wisconsin
parent: jax_mpm
paper_url: https://arxiv.org/abs/2603.14596
project_url: ''
category: diff_sim
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

### AS-DiffMPM

```yaml
id: as_diffmpm
num: 39
name: AS-DiffMPM
full_name: 高斯增强物理仿真 (Gaussian-Augmented Physics Simulation)
year: '2026'
org: IIT
parent: jax_mpm
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/91ed94fc04f9da4a2e3e5382c56c93aa
project_url: ''
category: diff_sim
motivation: 可微分碰撞处理复杂系统辨识
```

#### 📝 一句话总结
AS-DiffMPM 提出 Any-Shape Differentiable MPM，把 CPIC 风格的粒子级碰撞处理扩展到任意形状刚体碰撞器，并与 2D Gaussian Splatting、DVGO、MDyn-3DGS 等渲染模型连接，使复杂碰撞场景中的物理参数可以从粒子轨迹或多视角视频端到端辨识。

#### 🎯 核心要点
- **任意形状碰撞器**：不再局限于地面平面或简单 SDF 边界，支持 Box、Bunny、Armadillo 等复杂刚体形状
- **Collision Grid**：在与 MPM 欧拉网格同分辨率的碰撞网格上存储 affinity \(A_g\)、距离 \(d_g\)、侧别 tag \(T_g\) 和法向 \(\mathbf{n}_g\)
- **粒子级 CPIC 碰撞**：P2G 只向兼容网格节点传输，G2P 对不兼容节点使用粒子当前速度或投影速度，避免同一网格单元内粒子共享单一碰撞速度
- **Mesh/2DGS 统一接口**：碰撞器被表示为带法向的 primitive，既可以是三角网格面，也可以是 2D Gaussian 的平面圆盘
- **穿透修正**：材料粒子从 Collision Grid 插值得到 \(d_p,T_p,\mathbf{n}_p\)，出现穿透时用 \(\mathbf{f}_p=-k_h d_p\mathbf{n}_p\) 施加 penalty force
- **系统辨识链路**：粒子轨迹监督使用 MSE；视觉监督通过 differentiable rendering 将图像误差反传到渲染 primitive、材料粒子轨迹和物理参数
- **基准设置**：论文在 Newtonian、Non-Newtonian、Granular 三类材料和三种复杂碰撞器上评估参数估计，并比较 RP-DiffMPM、GOP-DiffMPM 等碰撞处理基线

#### 🔬 深入细节
##### 核心架构示意

![AS-DiffMPM 仿真-渲染系统辨识流程](https://as-diffmpm.github.io/assets/figures/method_overview.png)
*图：多视角图像分别重建连续体对象和刚体碰撞器，AS-DiffMPM 推进粒子轨迹，再把更新后粒子位置映射回渲染 primitive。来源为 AS-DiffMPM 官方项目页。论文 arXiv HTML 也提供 Figure 2：`https://arxiv.org/html/2511.06846v1/x2.png`。*

##### 算法伪代码

```python
# AS-DiffMPM collision-aware differentiable rollout
def build_collision_grid(collider_primitives):
    for primitive xi in collider_primitives:          # mesh face or 2D Gaussian disk
        for x_rp in sample_rigid_particles(xi):
            for g in neighbor_grid_nodes(x_rp, size=3):
                x_proj = project_to_primitive_plane(x_g[g], xi)
                if projection_inside_primitive(x_proj, xi):
                    A_g[g] = 1
                    candidates[g].append((xi, point_plane_distance(x_g[g], xi)))

    for g in grid_nodes:
        xi_star = argmin_abs_distance(candidates[g])
        d_g[g] = abs(distance(x_g[g], xi_star))
        T_g[g] = sign(distance(x_g[g], xi_star))
        n_g[g] = normal(xi_star)
    return A_g, d_g, T_g, n_g

def transfer_collision_to_particles(particles, collision_grid):
    for p in particles:
        nbrs = neighbor_grid_nodes(x_p[p], size=3)
        A_p[p] = any(A_g[g] == 1 for g in nbrs)
        if A_p[p]:
            d_p[p] = sum(w(g, p) * A_g[g] * T_g[g] * d_g[g] for g in nbrs)
            n_p[p] = sum(w(g, p) * A_g[g] * n_g[g] for g in nbrs)
            T_p[p] = persistent_side_tag(p, sign(d_p[p]))
            if penetration_detected(d_p[p], T_p[p]):
                f_p[p] += -k_h * d_p[p] * n_p[p]

def as_diffmpm_step(particles, collider):
    collision_grid = build_collision_grid(collider)
    transfer_collision_to_particles(particles, collision_grid)

    # P2G: incompatible particle-node pairs do not receive particle velocity
    for p in particles:
        for g in neighbor_grid_nodes(x_p[p]):
            if compatible(T_p[p], T_g[g]):
                grid[g].mass += m_p[p] * w(g, p)
                grid[g].momentum += m_p[p] * v_p[p] * w(g, p)

    grid_operations_without_global_sticky_sdf()

    # G2P: incompatible nodes trigger particle-wise projected velocity
    for p in particles:
        v_new = 0
        for g in neighbor_grid_nodes(x_p[p]):
            if compatible(T_p[p], T_g[g]):
                v_new += w(g, p) * v_g[g]
            else:
                v_new += w(g, p) * project_to_surface(v_p[p], n_p[p])
        x_p[p], v_p[p] = advect(x_p[p], v_new)
```

##### 方法机制

标准可微 MPM 的三步是 P2G、Grid Operations、G2P。基础质量和速度传输可写为：

$$
m_g=\sum_p m_p w_g(\mathbf{x}_g-\mathbf{x}_p),\qquad
\mathbf{v}_g=\frac{1}{m_g}\sum_p m_p\mathbf{v}_p w_g(\mathbf{x}_g-\mathbf{x}_p).
$$

以往系统辨识工作通常在 G-OP 阶段处理简单边界：例如用平面或 SDF 判断网格节点是否在碰撞器内，然后把 sticky surface 内的节点速度置零。这种方法对平面地面有效，但复杂几何会出现两个问题：一是尖角、开曲面和薄结构很难通过单一网格节点速度精确表达；二是同一网格单元内的不同材料粒子可能在刚体两侧，却被迫共享同一个碰撞响应。

AS-DiffMPM 的核心是把刚体先投影到 Collision Grid，再把碰撞信息插值给材料粒子。每个网格节点存：

$$
(A_g,d_g,T_g,\mathbf{n}_g),
$$

其中 \(A_g\) 表示是否靠近碰撞边界，\(d_g\) 是到 primitive 的无符号距离，\(T_g\) 表示边界哪一侧，\(\mathbf{n}_g\) 是对应法向。对一个材料粒子 \(p\)，若其 \(3\times3\times3\) 邻域内存在 affinity 节点，就插值得到：

$$
d_p=\sum_{g\in\mathcal{N}(\mathbf{x}_p)}
w_g(\mathbf{x}_g-\mathbf{x}_p)A_gT_gd_g,
\qquad
\mathbf{n}_p=\sum_{g\in\mathcal{N}(\mathbf{x}_p)}
w_g(\mathbf{x}_g-\mathbf{x}_p)A_g\mathbf{n}_g.
$$

粒子的 tag \(T_p=\mathrm{sign}(d_p)\) 会在靠近边界期间保持首次获得的侧别。这个细节很关键：如果数值误差导致粒子穿透边界，单纯从当前插值距离重新取符号可能会把穿透后的错误侧别当成真实状态；保留 tag 可以识别并修正穿透。

碰撞修正用 penalty force：

$$
\mathbf{f}_p=-k_h d_p\mathbf{n}_p.
$$

在 CPIC 风格的 P2G/G2P 里，粒子与网格节点是否兼容由 \(T_p\) 和 \(T_g\) 决定。若二者位于边界两侧，则认为不兼容。P2G 阶段只向兼容节点传输质量和动量；G2P 阶段遇到不兼容节点时，AS-DiffMPM 不读取该节点的全局速度，而是把粒子速度投影到碰撞表面。例如 slippery surface 下：

$$
\mathbf{v}_p^{proj}=\mathbf{v}_p-(\mathbf{v}_p\cdot\mathbf{n}_p)\mathbf{n}_p.
$$

> 💡 关键：GOP-DiffMPM 是“网格节点级”碰撞，AS-DiffMPM 是“粒子-节点兼容性级”碰撞；后者能区分同一网格单元内不同粒子相对复杂边界的几何关系。

系统辨识分两种监督。若有真实粒子轨迹，训练损失就是模拟轨迹与参考轨迹之间的 particle-wise MSE：

$$
\mathcal{L}_{traj}(\theta)=
\frac{1}{TP}\sum_{t=1}^{T}\sum_{p=1}^{P}
\left\|\mathbf{x}_{p,t}^{sim}(\theta)-\mathbf{x}_{p,t}^{ref}\right\|_2^2.
$$

若只有多视角视频，渲染模型负责把粒子或 Gaussian primitive 渲染成图像，图像损失反传到物理参数。论文给出的 point-based 梯度链可以写成：

$$
\frac{\partial \mathcal{L}}{\partial\theta}
=
\sum_r\sum_p
\underbrace{\left(\frac{\partial\mathcal{L}}{\partial I}
\frac{\partial I}{\partial\mathbf{x}_r}\right)}_{\text{Rendering}}
\underbrace{\frac{\partial\mathbf{x}_r}{\partial\mathbf{x}_p^r}}_{\text{Mapping}}
\underbrace{\frac{\partial\mathbf{x}_p^r}{\partial\theta}}_{\text{MPM}}.
$$

当每个粒子直接绑定一个 point primitive 时，可简化为：

$$
\frac{\partial \mathcal{L}}{\partial\theta}
=
\sum_p
\left(\frac{\partial\mathcal{L}}{\partial I}
\frac{\partial I}{\partial\mathbf{x}_p}\right)
\frac{\partial\mathbf{x}_p}{\partial\theta}.
$$

这条链路让 AS-DiffMPM 可以和 DVGO、2DGS、MDyn-3DGS 等不同表示组合：渲染侧负责把视觉误差转成几何/粒子梯度，MPM 侧负责把粒子轨迹梯度转成粘度、体积模量、屈服应力、塑性粘度或摩擦角等物理参数梯度。

#### 🧪 练习题
```yaml
question: "AS-DiffMPM 相比 GOP-DiffMPM 处理复杂碰撞器的关键改进是什么？"
options:
  - "在 P2G/G2P 中按粒子-网格节点兼容性进行碰撞处理，而不是只在 G-OP 阶段统一修改网格速度"
  - "完全删除 MPM 的 P2G 阶段，只用神经渲染预测粒子运动"
  - "把所有碰撞器都近似为无限平面，降低系统辨识难度"
  - "只优化初始速度，不反传物理参数"
answer: 0
explain: "AS-DiffMPM 借鉴 CPIC，利用 Collision Grid 的 tag 和法向区分粒子与邻近节点是否跨越边界，从而在复杂几何处实现粒子级碰撞响应。"
```

### POD-DL-ROM

```yaml
id: pod_dl_rom
num: 40
name: POD-DL-ROM
full_name: POD深度学习降阶模型 (POD Deep Learning ROM)
year: '2021'
org: Politecnico Milano
parent: —
paper_url: https://www.researchgate.net/publication/355414331
project_url: ''
category: acceleration
motivation: POD+Autoencoder加速140-3800倍
```

#### 📝 一句话总结
POD-DL-ROM 用 randomized POD 先把高维 FOM 快照压缩到 POD 系数空间，再用 autoencoder 与前馈网络学习 \((t,\boldsymbol{\mu})\rightarrow\) 低维非线性坐标 \(\rightarrow\) POD 系数的映射，显著降低 DL-ROM 的离线训练成本，同时保留非侵入式、无需 Galerkin 投影和在线快速查询的优势。

#### 🎯 核心要点
- **两级降维**：第一层 rPOD 将 \(\mathbb{R}^{N_h}\) 的 FOM 快照投影到 \(N\)-维 POD 系数，第二层 autoencoder 将 POD 系数进一步压到 \(n\approx n_\mu+1\) 的非线性潜变量
- **非侵入式 ROM**：训练只需要 FOM snapshot，不需要访问 PDE 残差、Jacobian 或组装投影方程
- **DFNN 学动态坐标**：前馈网络 \(\boldsymbol{\phi}^{DF}_n(t,\boldsymbol{\mu})\) 直接从时间和参数预测低维潜变量，在线阶段可任意查询时间点
- **Decoder 重构 POD 系数**：autoencoder decoder \(\mathbf{f}^D_N\) 从低维潜变量输出 \(\tilde{\mathbf{u}}_N\)，再通过 \(\mathbf{V}_N\tilde{\mathbf{u}}_N\) 回到高维物理场
- **联合损失函数**：同时约束 POD 系数重构误差和 encoder/DFNN 潜变量一致性
- **rSVD 加速 POD**：用随机化 range finder 和小矩阵 SVD 计算 rPOD 基，避免对大 snapshot 矩阵做昂贵精确 SVD
- **多保真预训练**：可用粗网格、简化物理或较小参数域训练得到的权重初始化复杂模型，显著缩短训练
- **验证范围广**：论文测试线性 ADR、非线性心电 Monodomain、非线性超弹性梁和 Navier-Stokes，覆盖标量/向量、线性/非线性、时间依赖参数化 PDE

#### 🔬 深入细节
##### 核心架构示意

![POD-DL-ROM 架构图](https://ar5iv.labs.arxiv.org/html/2101.11845/assets/x1.png)
*图：POD-DL-ROM 的训练结构。FOM 解先通过 rPOD 基得到 \(\mathbf{V}_N^\top\mathbf{u}_h\)，DFNN 从 \((t,\boldsymbol{\mu})\) 预测低维坐标，decoder 重构 POD 系数，最后用 rPOD 基恢复高维场。来源为 ar5iv 对 arXiv:2101.11845 的 HTML 渲染图；Politecnico Milano MOX report 72/2021 也提供同一论文 PDF。*

##### 算法伪代码

```python
# POD-DL-ROM training
S = collect_fom_snapshots(mu_train, time_grid)       # [N_h, N_train * N_t]
M = collect_parameter_time_pairs(mu_train, time_grid) # [n_mu + 1, N_s]

# randomized POD
Omega = gaussian_random_matrix(num_snapshots=S.cols, cols=m)
Y = (S @ S.T)**q @ S @ Omega
Q, _ = qr(Y)
B = Q.T @ S
V_tilde, Sigma, Z = svd(B)
V_N = Q @ V_tilde[:, :N]

# POD coefficient data
S_N = V_N.T @ S
S_N = normalize_and_reshape_as_channels(S_N)

initialize encoder f_E, decoder f_D, dynamics_net phi_DF
for epoch in range(max_epochs):
    for M_batch, S_N_batch in minibatches(M, S_N):
        z_enc = f_E(S_N_batch)              # encoder: POD coeffs -> latent
        z_dyn = phi_DF(M_batch)             # DFNN: (t, mu) -> latent
        S_N_pred = f_D(z_dyn)               # decoder: latent -> POD coeffs
        loss = omega/2 * mse(S_N_batch, S_N_pred) \
             + (1 - omega)/2 * mse(z_enc, z_dyn)
        update_with_adam(loss)
    if validation_loss_has_not_improved():
        break

# POD-DL-ROM online query
def predict(t, mu):
    z = phi_DF(concat(t, mu))
    u_N_pred = f_D(z)
    u_h_pred = V_N @ denormalize(u_N_pred)
    return u_h_pred
```

##### 方法机制

论文从一般参数化时间依赖 PDE 的 FOM 写起。离散后的高保真模型可抽象为：

$$
\begin{cases}
\mathbf{M}(\boldsymbol{\mu})\dot{\mathbf{u}}_h(t;\boldsymbol{\mu})
=
\mathbf{f}(t,\mathbf{u}_h(t;\boldsymbol{\mu});\boldsymbol{\mu}),
\quad t\in(0,T),\\
\mathbf{u}_h(0;\boldsymbol{\mu})=\mathbf{u}_0(\boldsymbol{\mu}),
\end{cases}
$$

其中 \(\mathbf{u}_h\in\mathbb{R}^{N_h}\)，\(N_h\) 往往很大。传统 POD-Galerkin ROM 用低维线性子空间：

$$
\tilde{\mathbf{u}}_h(t;\boldsymbol{\mu})=\mathbf{V}_n\mathbf{u}_n(t;\boldsymbol{\mu}),
$$

再把 FOM 残差投影到该子空间。对非线性时间依赖问题，这会遇到两个瓶颈：POD 线性空间可能需要很多 mode 才能覆盖移动前沿/波动结构；非线性项还需要 hyper-reduction，否则在线仍依赖高维数组。

DL-ROM 的思想是直接学习非线性 trial manifold 和 reduced dynamics：

$$
\tilde{\mathbf{u}}_h(t;\boldsymbol{\mu})
=
\mathbf{f}_h^D\left(
\boldsymbol{\phi}^{DF}_n(t;\boldsymbol{\mu};\boldsymbol{\theta}_{DF});
\boldsymbol{\theta}_D
\right).
$$

但原始 DL-ROM 的 decoder 输出维度是 \(N_h\)，当 FOM 网格增大时，卷积 autoencoder 的输入输出张量和参数训练成本都会变重。POD-DL-ROM 的关键改动是先用 rPOD 做“数据压缩”，让深度网络只面对 POD 系数：

$$
\tilde{\mathbf{u}}_h(t;\boldsymbol{\mu})
=
\mathbf{V}_N\tilde{\mathbf{u}}_N(t;\boldsymbol{\mu}),
\qquad
\tilde{\mathbf{u}}_N
=
\mathbf{f}_N^D\left(
\boldsymbol{\phi}^{DF}_n(t;\boldsymbol{\mu});\boldsymbol{\theta}_D
\right).
$$

这里 \(N\ll N_h\)，但 \(N\) 可以比最终潜变量维度 \(n\) 大得多；POD 只负责把高维快照压到可训练的数据尺度，不再承担最终物理 ROM 的线性表达能力限制。真正的非线性结构由 autoencoder decoder 学习。

rSVD 的步骤是：采样高斯矩阵 \(\mathbf{\Omega}\)，构造 range finder：

$$
\mathbf{Y}=(\mathbf{S}\mathbf{S}^{T})^q\mathbf{S}\mathbf{\Omega},
$$

QR 分解得 \(\mathbf{Y}=\mathbf{Q}\mathbf{R}\)，再对小矩阵

$$
\mathbf{B}=\mathbf{Q}^{T}\mathbf{S}
=\tilde{\mathbf{V}}\tilde{\mathbf{\Sigma}}\tilde{\mathbf{Z}}
$$

做 SVD，最终 rPOD 基为：

$$
\mathbf{V}_N=\mathbf{Q}\tilde{\mathbf{V}}.
$$

训练损失由两项组成。第一项让 decoder 重构 POD 系数，第二项让 encoder 从真实 POD 系数得到的潜变量与 DFNN 从 \((t,\boldsymbol{\mu})\) 预测的潜变量一致：

$$
\mathcal{L}(t^k,\boldsymbol{\mu}_i;\boldsymbol{\theta})
=
\frac{\omega_h}{2}
\left\|
\mathbf{V}_N^T\mathbf{u}_h(t^k;\boldsymbol{\mu}_i)
-
\tilde{\mathbf{u}}_N(t^k;\boldsymbol{\mu}_i)
\right\|^2
+
\frac{1-\omega_h}{2}
\left\|
\tilde{\mathbf{u}}_n(t^k;\boldsymbol{\mu}_i)
-
\mathbf{u}_n(t^k;\boldsymbol{\mu}_i)
\right\|^2.
$$

在线阶段 encoder 被丢弃，只保留 DFNN 和 decoder，因此一次查询只需要：

$$
(t,\boldsymbol{\mu})\xrightarrow{\boldsymbol{\phi}^{DF}_n}\mathbf{u}_n
\xrightarrow{\mathbf{f}_N^D}\tilde{\mathbf{u}}_N
\xrightarrow{\mathbf{V}_N}\tilde{\mathbf{u}}_h.
$$

这解释了为什么 POD-DL-ROM 可以“在线极快”：它不求解 reduced ODE，不做 Galerkin 残差投影，也不需要从初始时刻积分到目标时间。

多保真预训练进一步降低离线成本。由于网络结构只依赖 rPOD 维度 \(N\) 而不直接依赖 \(N_h\)，可以先在粗网格、低保真材料模型或较小参数域上训练，然后把权重迁移到高分辨率/更复杂物理上继续优化。论文在心电 Monodomain 测试中报告了从 scratch 到 pretrained 的训练时间显著下降；在 Navier-Stokes 测试中，高维速度场 \(N_h=64892\) 的 POD-DL-ROM 训练约 50 分钟、测试约 0.1 秒，并在更细网格 \(N_h=257528\) 上通过预训练达到相同误差水平。

> 💡 关键：POD-DL-ROM 不是退回普通 POD-NN。它先用 POD 解决“高维快照太大”的训练瓶颈，再用 autoencoder 的非线性流形解决“POD 线性叠加表达不足”的问题。

#### 🧪 练习题
```yaml
question: "POD-DL-ROM 中 rPOD 的主要作用是什么？"
options:
  - "先把 FOM 快照压缩到 POD 系数空间，降低深度网络训练维度，而最终非线性流形仍由 autoencoder 学习"
  - "替代所有神经网络，使模型变成传统 POD-Galerkin ROM"
  - "在在线阶段求解高维 FOM 残差，提高物理一致性"
  - "只用于绘图可视化，对训练和推理没有影响"
answer: 0
explain: "rPOD 是 POD-DL-ROM 的第一层数据压缩；网络训练对象从 N_h 维场变为 N 维 POD 系数，之后 autoencoder/DFNN 再学习低维非线性坐标和系数重构。"
```

### DeepXDE

```yaml
id: deepxde
num: 41
name: DeepXDE
full_name: 深度扩展微分方程 (Deep eXtension Differential Equations)
year: '2021'
org: 布朗大学
parent: —
paper_url: https://github.com/lululxvi/deepxde
project_url: ''
category: acceleration
motivation: 多后端支持学术研究框架
```

#### 📝 一句话总结
DeepXDE 将 PINN 求解微分方程的核心流程封装成可扩展 Python 框架，用几何、PDE、边界条件、网络和训练器等模块把“写物理残差”变成接近数学表达式的程序接口，并通过残差自适应加密（RAR）、复杂几何和正/反问题统一建模提升研究效率。

#### 🎯 核心要点
- **PINN 框架化实现**：用自动微分计算 PDE 残差，把方程、边界/初始条件和观测数据统一写成损失项
- **正问题/反问题统一**：未知物理参数 \(\lambda\) 可以与网络权重 \(\theta\) 一起优化，只需增加测量数据损失
- **残差自适应加密 RAR**：在 PDE 残差大的区域追加训练点，缓解随机配点对尖峰、激波或边界层不敏感的问题
- **几何与边界条件抽象**：支持 interval、rectangle、disk、cuboid、sphere 等基本几何，并用 CSG 的 union/difference/intersection 组合复杂区域
- **紧凑工作流**：`geometry -> PDE -> BC/IC -> data.PDE/TimePDE -> network -> Model.compile -> Model.train -> Model.predict`
- **多类型方程覆盖**：论文讨论 ODE/PDE、integro-differential equation、fractional differential equation、stochastic differential equation 等 PINN 变体
- **多后端研究框架**：项目层面支持 TensorFlow、PyTorch、JAX、PaddlePaddle 等后端，便于算法比较和复现实验

#### 🔬 深入细节
##### 核心架构示意

![DeepXDE PINN 残差构造示意](https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x1.png)
*图：DeepXDE 论文中的 PINN 示意。网络输出 \(\hat{u}(x,t)\)，自动微分产生时间/空间导数，并把 PDE、Dirichlet/Robin/Neumann 边界条件和初始条件共同放入损失。*

![DeepXDE 使用流程](https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x4.png)
*图：DeepXDE 对应 Procedure 3 的工作流。用户先定义 PDE 问题与网络，再由 `Model.compile`、`Model.train`、`Model.predict` 完成优化和推理。*

来源说明：任务给出的 `paper_url` 是项目仓库；方法解读主要追溯到论文 [DeepXDE: A deep learning library for solving differential equations](https://arxiv.org/abs/1907.04502) 与官方项目/文档。

##### 算法伪代码

```python
# DeepXDE 风格 PINN + RAR 训练伪代码
# 输入: 几何域 Ω, 边界 Γ, PDE 算子 F, 边界算子 B, 初始残差点 T_f, 边界点 T_b

geom = Geometry(Ω)                              # 例如 Rectangle、Disk 或 CSG 组合几何
bc = BoundaryCondition(geom, B(u, x) == 0)      # Dirichlet / Neumann / Robin / Periodic

def pde_residual(x, u_theta):
    du = autodiff(u_theta, x)                   # 一阶/高阶导数由后端 AD 产生
    return F(x, u_theta, du)                    # 强形式 PDE 残差

data = PDEData(geom, pde_residual, bc,
               num_domain=len(T_f),
               num_boundary=len(T_b))
net = FNN(input_dim=dim_x, hidden=[width] * depth, output_dim=dim_u)
model = Model(data, net)
model.compile(optimizer="adam", loss_weights=[w_f, w_b])

while True:
    model.train(iterations=K)
    candidates = sample_uniform(Ω, M)
    residual = abs(pde_residual(candidates, model.predict(candidates)))
    mean_residual = mean(residual)
    if mean_residual < tolerance:
        break
    T_new = top_k(candidates, residual, k=m)    # RAR: 选残差最大的点
    data.add_anchors(T_new)

solution = model.predict(query_points)
```

##### 方法机制

DeepXDE 的底层对象仍是 PINN：用神经网络 \(u_\theta(x)\) 近似微分方程解，而不是先生成网格再离散代数方程。对于一般 PDE，

$$
\mathcal{F}\left(x; u, \frac{\partial u}{\partial x_1}, \ldots,
\frac{\partial^2 u}{\partial x_i \partial x_j}, \ldots; \lambda\right)=0,
\quad x \in \Omega
$$

以及边界/初始条件

$$
\mathcal{B}(u, x)=0,\quad x \in \partial\Omega,
$$

DeepXDE 令网络输出 \(u_\theta(x)\)，再通过自动微分得到 \(\partial u_\theta / \partial x_i\)、\(\partial^2 u_\theta / \partial x_i\partial x_j\) 等导数。它不对空间做有限差分 stencil，也不组装 FEM 刚度矩阵；PDE 是否成立直接以残差范数体现。

核心训练目标可以写为：

$$
\mathcal{L}(\theta)=
w_f \frac{1}{|T_f|}\sum_{x_i\in T_f}\left\|
\mathcal{F}(x_i;u_\theta,\nabla u_\theta,\nabla^2u_\theta;\lambda)
\right\|^2
+ w_b \frac{1}{|T_b|}\sum_{x_i\in T_b}
\left\|\mathcal{B}(u_\theta,x_i)\right\|^2 .
$$

如果是反问题，未知参数 \(\lambda\) 直接变成可训练变量，并增加观测数据项：

$$
\mathcal{L}_{data}=
\frac{1}{N_u}\sum_{i=1}^{N_u}\left\|u_\theta(x_i)-u_i^{obs}\right\|^2,
\quad
(\theta^\*,\lambda^\*)=\arg\min_{\theta,\lambda}
(\mathcal{L}+\mathcal{L}_{data}).
$$

> 💡 关键：DeepXDE 的贡献不只是“又写了一个 PINN”，而是把 PINN 的可变部分拆成稳定 API：几何采样、边界条件、PDE 残差、网络、优化器、回调与预测接口。这样研究者可以替换网络或采样策略，而不必重写训练框架。

RAR 是 DeepXDE 论文中最有辨识度的算法增强。普通 PINN 常把配点均匀或随机撒在整个域内，但尖锐梯度通常只出现在小区域，随机采样会浪费大量点。RAR 的做法是先训练一个粗解，再在候选点集合 \(S\) 上评估残差：

$$
r_\theta(x)=\left\|\mathcal{F}(x;u_\theta,\nabla u_\theta,\ldots)\right\|,
\quad
\bar{r}\approx\frac{1}{|S|}\sum_{x_i\in S}r_\theta(x_i).
$$

若 \(\bar{r}\) 超过阈值，就把残差最大的若干点加入训练集 \(T_f\)，继续训练。它与 FEM 自适应网格细化的精神相似：不是盲目增加全域采样密度，而是把计算预算投向模型最违反物理约束的位置。

DeepXDE 的 CSG 几何模块也很关键。复杂区域可由基本图元通过布尔运算组合，例如 \(\Omega=(A\cup B)\setminus C\)。PINN 本身不需要网格，但仍需要知道“点是否在域内”“点是否在边界上”“边界法向是什么”；几何抽象把这些操作封装起来，使 Neumann/Robin 条件中的法向导数能够通过统一接口获得。

与传统有限元/有限差分相比，DeepXDE 的主要差别在于优化对象和误差来源。FEM/FDM 把 PDE 转换成离散代数系统，误差主要来自网格、基函数阶数和数值积分；DeepXDE/PINN 把 PDE 转成非凸优化问题，误差来自网络逼近能力、配点泛化、优化器收敛和损失权重。前者通常更可靠地求单个正问题，后者在高维、反问题、参数化问题和数据稀缺情形中更方便。

##### 训练与实现细节

DeepXDE 论文强调代码应“接近数学表述”。例如用户只需写 PDE 残差函数、边界判定函数和网络结构，其余的随机/网格采样、batch、优化器、保存、回调都由框架处理。回调机制可用于监控频谱、残差或早停；`loss_weights` 可用于平衡 PDE 残差、边界条件和数据项。

库层面的多后端设计进一步服务于研究复现：同一个数学问题可以切换 TensorFlow、PyTorch、JAX 或 PaddlePaddle 后端，从而比较自动微分、高阶导数、GPU 性能和优化器行为。对于 AI4Science 研究，这比单个示例脚本更重要，因为大量工作需要快速替换 PINN 变体、采样策略或网络结构。

#### 🧪 练习题
```yaml
question: "DeepXDE 中 RAR（Residual-based Adaptive Refinement）的主要作用是什么？"
options:
  - "把所有残差点固定在规则网格上，减少随机性"
  - "在 PDE 残差大的位置追加训练点，提高尖锐区域的物理约束精度"
  - "把边界条件从软约束改成硬约束，完全消除边界误差"
  - "用有限元网格替代神经网络，避免非凸优化"
answer: 1
explain: "RAR 先评估候选点处的 PDE 残差，再把残差最大的点加入训练集，使训练点集中到当前解最不满足方程的位置。"
```

### NeuralPDE-jl

```yaml
id: neuralpde_jl
num: 42
name: NeuralPDE-jl
full_name: NeuralPDE.jl
year: '2022'
org: MIT/NASA
parent: deepxde
paper_url: https://github.com/SciML/NeuralPDE.jl
project_url: ''
category: acceleration
motivation: Julia高性能符号微分框架
```

#### 📝 一句话总结
NeuralPDE.jl 将 PINN 从“手写残差函数”推进到 Julia/SciML 的符号-数值工作流：用户用 `ModelingToolkit.jl` 描述 PDE 系统，框架自动生成物理损失、训练点/积分策略和 `OptimizationProblem`，从而把 PINN 与 SciML 的求解器、自动微分、GPU 和参数估计生态连接起来。

#### 🎯 核心要点
- **符号 PDE 输入**：通过 `PDESystem(eq, bcs, domains, params, vars)` 表达 PDE、边界条件、定义域和未知量
- **自动损失生成**：`PhysicsInformedNN` 把符号系统离散化为 PINN 的 PDE loss、BC loss、full loss 和可优化问题
- **积分视角训练**：`QuadratureTraining` 将残差损失视为定义域上的积分，并用 `Integrals.jl` 按 `reltol/abstol` 做自适应数值积分
- **多采样策略**：支持 `GridTraining`、`StochasticTraining`、`QuasiRandomTraining`、`QuadratureTraining`、`WeightedIntervalTraining`
- **自适应损失权重**：支持非自适应、梯度尺度自适应、MiniMax 自适应等方式平衡 PDE 与边界损失
- **反问题与数据融合**：`param_estim` 和 `additional_loss` 允许同时学习微分方程参数、拟合观测数据或做算子发现
- **SciML 生态集成**：兼容 Lux/Flux 神经网络、Optimization.jl、ModelingToolkit、NeuralOperators.jl，并支持 ODE/SDE/RODE/PDE、积分微分方程与 GPU 层

#### 🔬 深入细节
##### 核心架构示意

![NeuralPDE 通用 PDE 形式](https://user-images.githubusercontent.com/12683885/86625781-5648c800-bfce-11ea-9d99-fbcb5c37fe0c.png)
*图：NeuralPDE 官方文档中的通用非线性 PDE 形式。用户在符号层描述 \(u\)、导数、定义域和边界条件，框架再生成 PINN 优化问题。*

![NeuralPDE 2D Poisson 示例结果](https://user-images.githubusercontent.com/12683885/90962648-2db35980-e4ba-11ea-8e58-f4f07c77bcb9.png)
*图：NeuralPDE.jl README 的 2D Poisson 示例，展示解析解、PINN 预测和误差图。*

来源说明：任务给出的 `paper_url` 是 GitHub 项目页。可追溯论文为 [NeuralPDE: Automating Physics-Informed Neural Networks (PINNs) with Error Approximations](https://arxiv.org/abs/2107.09443)；本文图示采用官方文档/README 中可访问图片，因为该论文的 arXiv HTML 图页不可稳定访问。

##### 算法伪代码

```julia
# NeuralPDE.jl 符号 PINN 工作流伪代码
using NeuralPDE, Lux, ModelingToolkit, Optimization, OptimizationOptimisers
import DomainSets: Interval

@parameters x y
@variables u(..)
Dxx = Differential(x)^2
Dyy = Differential(y)^2

# 1. 用符号表达式定义 PDE 与边界条件
eq = Dxx(u(x, y)) + Dyy(u(x, y)) ~ -sin(pi * x) * sin(pi * y)
bcs = [
    u(0, y) ~ 0.0,
    u(1, y) ~ 0.0,
    u(x, 0) ~ 0.0,
    u(x, 1) ~ 0.0,
]
domains = [x ∈ Interval(0.0, 1.0), y ∈ Interval(0.0, 1.0)]

# 2. 定义神经网络近似解 phi_theta(x, y)
chain = Lux.Chain(Dense(2, 16, tanh), Dense(16, 16, tanh), Dense(16, 1))

# 3. 选择训练策略；QuadratureTraining 将 loss 视为积分
strategy = QuadratureTraining(reltol = 1e-6, abstol = 1e-3, batch = 100)
discretization = PhysicsInformedNN(chain, strategy)

# 4. 符号 PDE 系统 -> PINN 表示 -> OptimizationProblem
@named pde_system = PDESystem(eq, bcs, domains, [x, y], [u(x, y)])
prob = discretize(pde_system, discretization)

# 可选：检查自动生成的 PDE/BC loss
pinn_rep = symbolic_discretize(pde_system, discretization)
loss_fns = pinn_rep.loss_functions

# 5. 使用 Optimization.jl 训练
res = Optimization.solve(prob, ADAM(0.01), maxiters = 6000)
phi = discretization.phi
u_pred = phi([0.5, 0.5], res.minimizer)
```

##### 方法机制

NeuralPDE.jl 的核心思想是把 PINN 看成一种 **PDE 系统的离散化器**。在 DeepXDE 这类 Python 框架中，用户通常直接写一个 residual 函数；NeuralPDE.jl 则先让用户在 `ModelingToolkit.jl` 的符号层定义方程、边界条件和定义域，再通过 `PhysicsInformedNN` 把这个符号对象转成优化问题。官方文档明确说明：`discretize(pde_system, discretization)` 会把 `PDESystem` 转换为 `Optimization.jl` 的 `OptimizationProblem`。

给定一般 PDE：

$$
\mathcal{F}\left(x; u, \frac{\partial u}{\partial x_1},\ldots,
\frac{\partial^2 u}{\partial x_1\partial x_d},\ldots;\lambda\right)=0,
\quad x\in\Omega,
$$

以及边界条件 \(\mathcal{B}_j(u,x)=0,\ x\in\Gamma_j\)，NeuralPDE.jl 用神经网络试探函数 \(\phi_\theta(x)\) 代替 \(u(x)\)，生成如下形式的目标：

$$
\mathcal{L}(\theta)=
\sum_i w_i^{pde}\int_{\Omega_i}
\left\|\mathcal{F}_i(x;\phi_\theta,\partial\phi_\theta,\partial^2\phi_\theta,\ldots)\right\|^2 dx
+
\sum_j w_j^{bc}\int_{\Gamma_j}
\left\|\mathcal{B}_j(\phi_\theta,x)\right\|^2 dS
+ w_{add}\mathcal{L}_{add}.
$$

这里的 \(\mathcal{L}_{add}\) 对应 `additional_loss(phi, θ, p_)`，可用来混合真实观测数据、参数正则项或领域特定约束。若 `param_estim = true`，微分方程参数会被拼接进优化变量，和网络权重一起由优化器估计。

> 💡 关键：NeuralPDE.jl 的“自动化”不是自动发现 PDE，而是自动把用户给出的符号 PDE 编译成可训练损失、导数计算函数、采样/积分过程和优化问题。

论文标题中的 “Error Approximations” 主要体现在积分化损失和训练策略上。`QuadratureTraining` 不把残差点仅仅看成 minibatch 样本，而是把损失写成积分：

$$
\int_\Omega g_\theta(x)\,dx,
\quad
g_\theta(x)=\left\|\mathcal{F}(x;\phi_\theta,\partial\phi_\theta,\ldots)\right\|^2.
$$

数值上再用求积近似：

$$
\int_\Omega g_\theta(x)\,dx \approx \sum_{k=1}^{N_q}\omega_k g_\theta(x_k).
$$

当选择自适应求积算法时，`reltol` 和 `abstol` 给出积分误差控制目标；这比固定随机配点更贴近传统数值分析，也解释了 NeuralPDE.jl 为什么强调 quadrature training。对于高维或 GPU 训练，文档建议常用 `QuasiRandomTraining`，因为低差异序列在高维空间通常比纯随机采样更稳定且可 GPU 化。

`symbolic_discretize` 是 NeuralPDE.jl 区别于脚本式 PINN 的另一个关键接口。它返回 `PINNRepresentation`，其中包含 `eqs`、`bcs`、`domains`、`depvars`、`indvars`、`phi`、`derivative`、`strategy`、`symbolic_pde_loss_functions`、`symbolic_bc_loss_functions` 和 `loss_functions` 等字段。研究者可以在不改动高层模型的情况下检查自动生成的 loss，定位某个边界项或 PDE 项是否主导训练。

训练稳定性方面，NeuralPDE.jl 将损失权重变成显式策略。`GradientScaleAdaptiveLoss` 根据 PDE loss 与 BC loss 的梯度尺度比例动态调权，目标是避免某一类约束梯度过大而压制其他约束；`MiniMaxAdaptiveLoss` 则用内部优化器增大尚未满足的 loss 权重。这些方法并不改变 PINN 的物理建模假设，但改变多目标优化的数值行为。

##### 与 DeepXDE 的关系

NeuralPDE.jl 可以看作 DeepXDE 思路在 SciML 生态中的符号化、高性能版本。DeepXDE 的优势是 Python 简洁 API 与多后端普及度；NeuralPDE.jl 的优势是 Julia 多重派发、符号建模和 DifferentialEquations/Optimization/Sensitivity 等库的组合能力。对于需要把 PINN 放进更大的科学计算管线、做参数估计或和传统求解器互操作的任务，NeuralPDE.jl 的 `PDESystem -> OptimizationProblem` 路径更自然。

#### 🧪 练习题
```yaml
question: "NeuralPDE.jl 中 PhysicsInformedNN 的核心职责是什么？"
options:
  - "自动从数据中发现未知 PDE 的符号形式"
  - "把 ModelingToolkit 的 PDESystem 转换成 PINN 损失与 OptimizationProblem"
  - "只负责绘制 PDE 解的等高线图"
  - "用有限元网格替代神经网络试探函数"
answer: 1
explain: "PhysicsInformedNN 是 NeuralPDE.jl 的 PINN 离散化器，它根据符号 PDE、边界条件和训练策略生成可优化的物理损失。"
```

### Modulus

```yaml
id: modulus
num: 43
name: Modulus
full_name: NVIDIA Modulus
year: '2022'
org: NVIDIA
parent: —
paper_url: https://developer.nvidia.com/modulus
project_url: ''
category: acceleration
motivation: 工业级数字孪生GPU深度优化
```

#### 📝 一句话总结
NVIDIA Modulus 将 PINN、数据驱动建模和神经算子组织成面向工业仿真的 GPU 框架，用 Geometry/Data、Node、Constraint、Domain、Solver、Hydra 等组件把多物理场仿真、参数化设计、反问题和数字孪生统一为可扩展的优化图。

#### 🎯 核心要点
- **工程化 PINN 框架**：把 PDE、边界条件、观测数据和网络输出都表示为 `Node` 与 `Constraint` 组成的计算图
- **约束驱动训练**：`Constraint` 持有损失函数和执行节点，`Solver` 在每轮迭代汇总全局损失并优化可训练模型
- **积分化损失**：官方文档把残差损失视为区域积分，并用 Monte Carlo / quasi-Monte Carlo 近似，使 loss 与几何面积/体积尺度一致
- **参数化几何与设计空间探索**：网络可把几何参数作为输入，一次训练覆盖多个设计配置，推理阶段快速评估新配置
- **复杂几何支持**：SimNet/Modulus 系列支持 CSG、STL/OBJ tessellated geometry、点云采样和边界法向/距离计算
- **SDF 空间加权**：用 signed distance function 调整 PDE residual loss 权重，缓解尖角、间隙、壁面附近强梯度导致的训练困难
- **工业 GPU 优化**：支持 Fourier feature、modified Fourier、SiReN 等架构，并强调多 GPU/多节点、FP32/FP64/TF32 和 TensorBoard/ParaView 可视化链路

#### 🔬 深入细节
##### 核心架构示意

![SimNet/Modulus 框架结构](https://ar5iv.labs.arxiv.org/html/2012.07938/assets/x4.png)
*图：NVIDIA SimNet 论文中的系统结构。SimNet 是 Modulus 的前身/同源方法脉络，展示几何、PDE、网络、优化器、数据集、求解器、GPU 与可视化输出如何组成端到端仿真框架。*

![Modulus 参数化微分方程示例](https://docscontent.nvidia.com/dims4/default/3838a28/2147483647/strip/true/crop/960x721%2B0%2B0/resize/960x721%21/quality/90/?url=https%3A%2F%2Fk3-prod-nvidia-docs.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fsphinx%2F00000187-bf1b-d3c6-a7f7-ff7f4e8b0000%2Fdeeplearning%2Fmodulus%2Fmodulus-v2209%2F_images%2Fevery_parabola.png)
*图：NVIDIA Modulus v22.09 文档中的参数化 ODE/PDE 示例。网络输入包含参数 \(l\)，一次训练得到不同边界位置下的解族。*

来源说明：任务给出的 `paper_url` 是 NVIDIA 产品页；方法解读主要基于 NVIDIA Modulus v22.09 官方文档与论文 [NVIDIA SimNet: an AI-accelerated multi-physics simulation framework](https://arxiv.org/abs/2012.07938)。Modulus 后续品牌演进到 PhysicsNeMo，但本条目按 2022 年 Modulus/SimNet 方法脉络解读。

##### 算法伪代码

```python
# NVIDIA Modulus 风格物理约束训练伪代码
# 输入: 几何 Ω, PDE 节点, 边界/内部约束, 网络结构, Hydra 配置

@modulus_main(config_path="conf", config_name="config")
def run(cfg):
    # 1. 几何与参数化设计空间
    x, y, z = Symbol("x"), Symbol("y"), Symbol("z")
    l = Symbol("l")                         # 设计变量/几何参数
    geometry = build_csg_or_import_stl(l)

    # 2. PDE/网络都转成 Nodes，框架据此构建执行图
    pde_nodes = NavierStokes(nu=nu, rho=rho).make_nodes()
    net = FullyConnectedArch(
        input_keys=["x", "y", "z", "l"],
        output_keys=["u", "v", "w", "p"],
        frequencies="fourier"
    )
    nodes = pde_nodes + [net.make_node(name="flow_network")]

    # 3. 多个 Constraints 共同定义问题
    domain = Domain()
    domain.add_constraint(
        PointwiseBoundaryConstraint(nodes, geometry.inlet,
                                    outvar={"u": inlet_u, "v": 0, "w": 0}),
        name="inlet_bc"
    )
    domain.add_constraint(
        PointwiseInteriorConstraint(nodes, geometry,
                                    outvar={"continuity": 0, "momentum_x": 0,
                                            "momentum_y": 0, "momentum_z": 0},
                                    lambda_weighting={"momentum_x": sdf_weight(geometry)}),
        name="pde_residual"
    )
    domain.add_inferencer(PointwiseInferencer(nodes, query_points), name="vtk_export")

    # 4. Solver 汇总所有 constraint loss 并优化
    solver = Solver(cfg, domain)
    solver.solve()
```

##### 方法机制

Modulus 的基本 PINN 机制和普通 physics-informed learning 一致：用神经网络 \(u_{net}(x)\) 近似未知解，并把 PDE 与边界条件变成损失。例如官方文档用如下一维问题说明：

$$
\frac{d^2u}{dx^2}(x)=f(x),\quad u(0)=u(1)=0.
$$

边界损失为：

$$
L_{BC}=u_{net}(0)^2+u_{net}(1)^2,
$$

残差损失为：

$$
L_{residual}=\frac{1}{N}\sum_{i=0}^{N}
\left(\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\right)^2.
$$

Modulus 文档进一步把这个求和解释为积分的 Monte Carlo 近似：

$$
L_{residual}
=\int_0^1
\left(\frac{d^2u_{net}}{dx^2}(x)-f(x)\right)^2 dx
\approx
\left(\int_0^1 dx\right)\frac{1}{N}\sum_{i=0}^{N}
\left(\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\right)^2.
$$

> 💡 关键：把 loss 写成积分不是形式主义。对于复杂 2D/3D 几何，不同区域面积/体积不同，积分视角能让约束强度随物理区域尺度变化，并自然接入 Monte Carlo、quasi-Monte Carlo 和区域重采样。

Modulus 的工程抽象围绕 `Node`、`Constraint`、`Domain` 和 `Solver` 展开。`Node` 可以是 PyTorch 网络、用户函数、PDE 方程或特征变换；它声明输入/输出变量，框架据此推断执行图，并自动补齐计算 PDE 残差所需的导数。`Constraint` 是训练目标，包含采样器、目标变量、损失函数和节点集合。`Domain` 汇总所有约束、验证器、监控器和推理器；`Solver` 执行优化循环，在每次迭代中调用约束、计算全局 loss、反向传播并更新模型。

参数化几何是 Modulus/SimNet 面向工业设计的核心能力。若边界位置或几何尺寸由参数 \(l\in[1,2]\) 控制，网络可写为 \(u_{net}(x,l)\)，残差积分变成：

$$
L_{residual}=
\int_1^2\int_0^l
\left(\frac{d^2u_{net}}{dx^2}(x,l)-f(x)\right)^2 dx\,dl.
$$

这意味着一次训练得到的是一族解，而不是单一几何上的一个解。传统 CFD/FEM 通常要对每个设计点重新网格化和求解；Modulus 在训练成本付出后，可以在推理阶段快速扫描设计参数，用于设计空间探索、优化和数字孪生。

SimNet 论文指出，真实工业几何中的尖角、薄间隙和不连续边界会让 PINN 训练变得困难。SDF loss weighting 是为此设计的机制：令 \(d(x,\partial\Omega)\) 表示点到边界的 signed distance，可定义空间相关权重 \(\lambda(x)\)，将损失写成

$$
\mathcal{L}_{pde}=
\int_{\Omega}
\lambda(x)\left\|\mathcal{R}_\theta(x)\right\|^2 dx,
\quad
\lambda(x)=\psi(d(x,\partial\Omega)).
$$

在尖角或强梯度区域调低/调节 residual 权重，可以避免局部奇异性支配整个优化过程。论文还提到对 tessellated mesh 的 SDF 计算使用 NVIDIA OptiX 做 inside/outside 测试和距离计算，这体现了 Modulus 与通用研究框架的差异：它不仅关注算法公式，也关注几何预处理和 GPU 工程吞吐。

对于不可压流，Modulus/SimNet 还加入 exact continuity 与 integral continuity 约束。连续性方程

$$
\frac{\partial u}{\partial x}+
\frac{\partial v}{\partial y}+
\frac{\partial w}{\partial z}=0
$$

既可以用速度势/向量势构造严格散度为零的速度场，也可以对截面 \(S\) 添加积分流量约束：

$$
L_{IC}=
\left(\iint_S(n_xu+n_yv+n_zw)\,dS\right)^2
\approx
\left(|S|\frac{1}{N}\sum_{i=1}^{N}
(n_x^iu_i+n_y^iv_i+n_z^iw_i)\right)^2.
$$

这种约束比只在点上惩罚 divergence 更贴近工程上关心的整体质量守恒，尤其有助于长通道、出口截面和复杂 3D 流动的收敛。

##### 与普通 PINN 框架的区别

DeepXDE、NeuralPDE.jl 更偏研究者友好的算法试验平台；Modulus 的目标更偏工业仿真生产线。它内置 Hydra 配置、TensorBoard/ParaView 输出、Validator/Monitor、STL/OBJ 导入、GPU 训练优化和多种网络架构，适合把 PINN 或神经算子放入数字孪生与设计优化流程。代价是框架更重，用户需要理解 Modulus 的节点图、约束系统和配置体系。

#### 🧪 练习题
```yaml
question: "NVIDIA Modulus 将 PDE residual loss 写成区域积分并用 Monte Carlo 近似的主要好处是什么？"
options:
  - "让所有训练点必须固定在规则网格上"
  - "使损失自然随几何面积/体积缩放，并支持复杂区域上的随机/准随机采样"
  - "完全避免自动微分计算导数"
  - "把 PINN 训练转换成无需优化器的线性方程组"
answer: 1
explain: "积分视角把残差约束定义在物理区域上，Monte Carlo 近似适合复杂几何采样，也能让不同区域的 loss 与其尺度一致。"
```

### PhysicsNeMo-v2

```yaml
id: physicsnemo_v2
num: 44
name: PhysicsNeMo-v2
full_name: NVIDIA PhysicsNeMo v2.0
year: '2026'
org: NVIDIA
parent: modulus
paper_url: https://github.com/NVIDIA/physicsnemo/releases
project_url: ''
category: acceleration
motivation: PyTorch原生架构GNN速度提升2倍
```

#### 📝 一句话总结
PhysicsNeMo v2.0 不是单篇论文算法，而是 NVIDIA 将 Modulus/PhysicsNeMo 演进为 PyTorch 原生、模块化、可扩展 SciML 工具栈的一次核心重构；它通过标准化模型、数据管线、网格库、分布式与 GNN 后端，把 MeshGraphNet/GraphCast 等物理代理模型训练流程更紧密地接入 PyTorch 生态。

#### 🎯 核心要点
- **框架级重构**：v2.0 将 `physicsnemo.models.Module`、`Meta` 迁入 `physicsnemo.core`，将层级组件集中到 `physicsnemo.nn`，减少循环导入并提升可组合性
- **PyTorch 原生体验**：新增 PyTorch-like 的 `physicsnemo.nn`、`physicsnemo.nn.functional`、`physicsnemo.datapipes`、`physicsnemo.mesh` 等包，降低与外部 PyTorch 代码混用的成本
- **GPU 数据与网格栈**：`physicsnemo.datapipes` 面向高分辨率 SciML 数据加载，`physicsnemo.mesh` 提供 GPU 加速的 simplex mesh、点云、图和场数据处理
- **GNN 物理代理模型**：官方文档覆盖 MeshGraphNet、GraphCast、X-MeshGraphNet、Hybrid MeshGraphNet 等，重点服务不规则网格、瞬态动力学和大规模分布式图
- **PyG 迁移路线**：后续文档将 PyTorch Geometric 作为推荐 GNN 后端；官方 release notes 报告 MeshGraphNet 在大网格、fp16/bf16 下有 1.5-2x 性能优化
- **分布式与大规模图**：通过图分区、halo regions、Domain Parallelism、ShardTensor、FSDP 等机制扩展到超大网格和多 GPU/多节点训练
- **来源限制**：该条目的 `paper_url` 是发布页而非论文；以下解读基于 NVIDIA GitHub release、v2.0 migration guide、官方文档和 GNN 示例，而不是 peer-reviewed paper

#### 🔬 深入细节
##### 核心架构示意

![PhysicsNeMo 大规模图分区与 halo region](https://docs.nvidia.com/physicsnemo/latest/_images/mesh_with_halo_regions.png)
*图：PhysicsNeMo 文档中的大规模图分区和 halo region 示意。它体现了 PhysicsNeMo 面向大网格 GNN 时的核心工程问题：把不规则 mesh 切分到多个设备，同时保留跨分区消息传递所需的邻域。*

![MeshGraphNet 瞬态涡街预测示例](https://docs.nvidia.com/physicsnemo/latest/_images/vortex_shedding.gif)
*图：PhysicsNeMo 的 MeshGraphNet 涡街示例，展示模型在不规则二维三角网格上进行自回归瞬态预测。*

可访问来源说明：NVIDIA 的 v2.0 发布页位于 https://github.com/NVIDIA/physicsnemo/releases/tag/v2.0.0 ，迁移指南位于 https://github.com/NVIDIA/physicsnemo/blob/main/v2.0-MIGRATION-GUIDE.md ，GNN/PyG 相关文档见 https://docs.nvidia.com/physicsnemo/latest/resources/dgl_to_pyg_migration.html 和 https://docs.nvidia.com/physicsnemo/latest/user-guide/model_architectures.html 。性能描述中的 1.5-2x MeshGraphNet 优化来自官方 release notes: https://docs.nvidia.com/physicsnemo/latest/release-notes/index.html 。

##### 算法伪代码

```python
# PhysicsNeMo v2 风格的 MeshGraphNet/PyG 训练流程伪代码
# 输入: 不规则 mesh 时间序列、节点类型、边几何特征、目标物理场
# 输出: 可自回归 rollout 的物理代理模型

model = MeshGraphNet(
    node_in_dim=velocity_dim + node_type_dim,
    edge_in_dim=relative_position_dim + distance_dim,
    hidden_dim=128,
    num_message_passing_layers=15,
)

for batch in physicsnemo_datapipe:
    graph = build_pyg_graph(
        x=batch.node_features,          # u_t, v_t, node type
        edge_index=batch.edge_index,    # bidirectional mesh connectivity
        edge_attr=batch.edge_features,  # dx, dy, ||d||
    )

    pred_next = model(graph)            # predict u_{t+1}, v_{t+1}, p_{t+1}
    data_loss = mean_squared_error(pred_next, batch.target_next)

    if physics_guided:
        residual = physics_informer(pred_next, batch.geometry)
        loss = data_loss + lambda_phys * mean(residual**2)
    else:
        loss = data_loss

    loss.backward()
    optimizer.step()
    optimizer.zero_grad()

def rollout(initial_state, graph, steps):
    state = initial_state
    for _ in range(steps):
        state = model(graph.with_node_state(state))
    return state
```

##### GNN 核心计算

PhysicsNeMo 中最典型的 GNN 物理代理模型是 MeshGraphNet。它把数值仿真的 mesh 看成图 \(G=(V,E)\)：节点 \(v\in V\) 存储速度、压力、节点类型等物理量，边 \((u,v)\in E\) 存储相对坐标和距离等几何关系。一次消息传递可写为：

$$
h_v^{0}=\phi_v(x_v),\qquad h_{uv}^{0}=\phi_e(e_{uv})
$$

$$
m_{uv}^{k}=\psi_e^k\left(h_u^k,h_v^k,h_{uv}^k\right),\qquad
\bar{m}_v^k=\sum_{u:(u,v)\in E}m_{uv}^k
$$

$$
h_v^{k+1}=\psi_v^k\left(h_v^k,\bar{m}_v^k\right),\qquad
\hat{y}_{t+1,v}=\psi_{\mathrm{dec}}(h_v^K)
$$

训练目标通常是下一步物理场的监督损失：

$$
\mathcal{L}_{\mathrm{data}}
=\frac{1}{|V|}\sum_{v\in V}
\left\|\hat{y}_{t+1,v}-y_{t+1,v}\right\|_2^2
$$

若结合 PhysicsNeMo Sym/PhysicsInformer，也可以把 PDE 残差作为物理项加入：

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{data}}
\lambda_{\mathrm{phys}}
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left\|\mathcal{R}\left(\hat{u}_\theta;x_i,t_i\right)\right\|_2^2
$$

这里的关键并不是发明新的 GNN 公式，而是把 GNN、数据加载、mesh 表示、分布式并行、checkpoint、物理残差和 mixed precision 训练放进同一个 PyTorch 组合式框架中。

##### v2.0 为什么重要

PhysicsNeMo v2.0 的核心变化是工程抽象的重新划分。旧版 Modulus/PhysicsNeMo 中，模型、layers、utils、launch、checkpoint、domain parallel 等能力分布较散，迁移指南明确把公共模型基类迁到 `physicsnemo.core`，把可复用层迁到 `physicsnemo.nn`，把模型专用工具放回对应模型目录。这会减少用户在定制模型时碰到的隐式依赖和循环导入问题。

第二个变化是把科学计算中的输入表示统一到 PyTorch 张量生态。`physicsnemo.mesh` 用 `Mesh(points, cells, point_data, cell_data, global_data)` 表示二维/三维 simplex mesh、点云和图，所有几何与场数据可随 `.to("cuda")` 一起移动。对 GNN 来说，这意味着 mesh 到 graph、graph 到 batch、batch 到分布式训练的路径更短。

第三个变化是 GNN 后端从 DGL 逐步转向 PyTorch Geometric。官方 PyG 迁移文档说明：当输入图是 `torch_geometric.data.Data` 时使用 PyG backend；当输入仍是 `dgl.DGLGraph` 时保持兼容。这样既避免一次性破坏旧 checkpoint 和 dataset，又为后续 PyG 的 kernel、loader、ClusterData、k-hop subgraph 等生态优化留出空间。

##### 与传统 Modulus/单模型脚本的区别

传统单模型脚本通常把数据读取、mesh 预处理、模型定义、训练循环和分布式逻辑写在一起。PhysicsNeMo v2.0 把这些拆成稳定模块：DataPipes 负责数据，Mesh 负责几何和场，`physicsnemo.models`/`physicsnemo.nn` 负责模型和层，`physicsnemo.utils.checkpoint` 负责 checkpoint，Domain Parallelism 和 ShardTensor 负责超大图或超大张量切分。

这种拆分对 AI4Science 的价值在于可替换性。用户可以保留 MeshGraphNet 的 message passing 主体，替换 PyG graph 构造；也可以保留训练 recipe，替换模型为 Transolver、FNO 或 DoMINO；还可以把纯数据监督损失换成带 PDE residual 的 physics-guided loss。

##### 性能机制

任务元信息中的“GNN 速度提升 2 倍”对应官方 release notes 中 MeshGraphNet/GNN 的性能优化描述：在大于 200k nodes 的 mesh 上，fp16/bf16 场景报告 1.5-2x speedup。方法层面可以拆成三类来源：

- **后端切换**：PyG 图对象、loader 和稀疏操作更贴近 PyTorch 生态，可减少 DGL/PyTorch 之间的数据与 API 摩擦
- **精度与 kernel 优化**：fp16/bf16 mixed precision 让 message passing 中的 MLP 和 aggregation 更好利用 Tensor Core
- **大图并行**：graph partitioning 与 halo regions 在保持邻域消息的同时降低单卡显存压力，适配多 GPU 训练

> 💡 关键：PhysicsNeMo v2.0 的算法价值主要体现在“可组合的 SciML 基础设施”。它不是替代 MeshGraphNet、FNO 或 PINN 的单一算法，而是把这些模型变成更容易在真实工程网格、大规模数据和 PyTorch 训练栈中复用的模块。

#### 🧪 练习题
```yaml
question: "PhysicsNeMo v2.0 对 GNN 物理代理模型最直接的工程价值是什么？"
options:
  - "把所有 PDE 都改写成解析解"
  - "通过 PyTorch 原生模块、PyG 后端、DataPipes 和 Mesh 工具降低大规模 GNN 训练与部署成本"
  - "删除 MeshGraphNet 的 message passing 层，只保留 MLP"
  - "只支持规则网格上的 CNN 模型"
answer: 1
explain: "PhysicsNeMo v2.0 是框架级重构，重点在 PyTorch 原生组合、GNN/PyG 迁移、GPU 数据管线和 mesh/分布式工具，而不是改变 PDE 的数学形式。"
```

### PDE-FM

```yaml
id: pde_fm
num: 45
name: PDE-FM
full_name: PDE基础模型 (Foundation Model for PDEs)
year: '2026'
org: IBM Research
parent: fno
paper_url: https://www.ibm.com/research/publications/towards-a-foundation-model-for-pdes
project_url: ''
category: acceleration
motivation: Mamba骨干网络误差降低46%
```

#### 📝 一句话总结
PDE-FM 提出了一种融合**空间-频谱双 Tokenization**、**Mamba 状态空间骨干**和 **FNO 频谱解码器**的跨物理域 PDE 基础模型，通过在 The Well 基准的 12 个异构数据集上联合预训练，在湍流、天体物理和辐射流等非线性域实现了平均 VRMSE 降低 46% 的 SOTA 性能。

#### 🎯 核心要点
- **空间-频谱双 Tokenization**：PatchConv 提取局部空间特征 + 截断 FFT 捕获全局频谱模式，两路 Token 经 Cross-Attention 融合
- **FiLM 物理条件注入**：将数据集元信息（边界条件、物理系数等）通过 Feature-wise Linear Modulation 调制空间 Token，实现跨域泛化
- **Mamba SSM 骨干**：以 \(O(Nd)\) 线性复杂度替代 \(O(N^2)\) 的 Transformer 自注意力，在保持表达能力的同时大幅降低计算开销
- **FNO 频谱解码器**：在傅里叶域通过可学习权重矩阵进行频谱乘法，天然保持周期性和频谱连续性
- **双重损失函数**：VRMSE 物理空间损失 + 频谱 \(L_2\) 损失，可选守恒正则和 PDE 残差惩罚
- **多数据集预训练策略**：温度缩放采样 \(p(i) \propto |\mathcal{D}_i|^{\tau}\)（\(\tau=0.5\)）+ EMA 难度加权 + 数据集特定 1×1 适配器
- **12 个 The Well 数据集**覆盖活性物质、湍流辐射层、粘弹性不稳定性、剪切流、Gray-Scott 反应扩散、Rayleigh-Bénard 对流、中子星并合后、超新星爆炸、引力冷却湍流、红超巨星对流包层、Helmholtz 阶梯、声学散射
- **SOTA 结果**：6/12 数据集最优，均值 VRMSE 0.165（次优 CNextU-net 为 0.304），在 Rayleigh-Bénard 和剪切流上超越基线一个数量级

#### 🔬 深入细节
![PDE-FM 架构总览图](https://ar5iv.labs.arxiv.org/html/2511.21861/assets/figures/architecture_fm4pde.png)
*图：PDE-FM 的五阶段流水线架构——空间-频谱双 Tokenization → FiLM 物理条件注入 → Cross-Attention 融合 → Mamba SSM 骨干 → FNO 频谱解码器*

##### 算法伪代码

```python
# PDE-FM 前向传播伪代码
def forward(u_t, metadata_c):
    # Stage 1: 空间-频谱双 Tokenization
    z_spatial = PatchConv(u_t)                    # [B, N_p, d]
    z_spectral = TruncFFT(u_t, k_max)            # [B, C, k_max, k_max] → Linear → [B, M, d]

    # Stage 2: FiLM 物理条件注入
    gamma, beta = FiLM_MLP(metadata_c)            # 从元信息生成调制参数
    z_spatial = gamma * z_spatial + beta           # 逐特征仿射变换

    # Stage 3: Cross-Attention 融合
    z_fused = CrossAttn(Q=z_spatial, K=z_spectral, V=z_spectral) + z_spatial

    # Stage 4: Mamba SSM 骨干 (L 层)
    for l in range(L):
        z_fused = z_fused + Mamba_Block(LayerNorm(z_fused))  # O(Nd) 线性复杂度

    # Stage 5: FNO 频谱解码器
    z_proj = Conv1x1(z_fused).reshape(B, C_out, H, W)
    u_hat = z_proj + sum(iFFT(R_k * FFT(z_proj)) for k in range(K_modes))

    return u_hat  # 预测 u_{t+1}
```

##### 动机与背景

传统 PDE 求解器（有限元/有限差分）在高分辨率三维场景下计算成本极高，单次模拟可能需要数千 GPU 小时。**神经算子**（如 FNO、DeepONet）虽然能以数据驱动方式加速求解，但存在两个核心瓶颈：

1. **单域训练**：每个 PDE 族需要独立训练一个模型，无法利用不同物理域之间的共享结构（如不可压缩性、涡度守恒等）
2. **频谱退化**：纯空间域方法在长时间推演中高频分量迅速衰减，导致预测模糊化

PDE-FM 的核心洞察是：**不同 PDE 族共享底层的频谱-空间对偶结构**，通过联合预训练可以学习到可迁移的归纳偏置。

##### 核心机制详解

**（1）空间-频谱双 Tokenization**

空间分支使用 PatchConv（步幅卷积）将输入场 \(u_t \in \mathbb{R}^{C \times H \times W}\) 分割为 \(N_p\) 个 Patch Token：

$$z_{\text{spatial}} = \text{PatchConv}(u_t) \in \mathbb{R}^{N_p \times d}$$

频谱分支对输入做 2D FFT 并截断到前 \(k_{\max}\) 个模态，再通过线性投影对齐维度：

$$z_{\text{spectral}} = \text{Linear}\left(\text{TruncFFT}(u_t, k_{\max})\right) \in \mathbb{R}^{M \times d}$$

> 💡 **关键**：空间 Token 捕获局部梯度和边界信息，频谱 Token 捕获全局周期结构和能量级联——两者互补，缺一不可。

**（2）FiLM 物理条件注入**

为实现跨域泛化，PDE-FM 将数据集元信息（PDE 类型、边界条件、物理系数等）编码为条件向量 \(c\)，通过 Feature-wise Linear Modulation 调制空间 Token：

$$z_{\text{cond}} = \gamma(c) \odot z_{\text{spatial}} + \beta(c)$$

其中 \(\gamma(c), \beta(c) \in \mathbb{R}^d\) 由两层 MLP 从 \(c\) 生成。这种设计让同一骨干网络能根据物理上下文动态调整特征表示，无需为每个 PDE 族维护独立参数。

**（3）Cross-Attention 融合**

空间和频谱两路 Token 通过标准交叉注意力机制融合：

$$z_{\text{fused}} = \text{softmax}\!\left(\frac{Q_{\text{spatial}} \cdot K_{\text{spectral}}^T}{\sqrt{d}}\right) V_{\text{spectral}} + z_{\text{spatial}}$$

空间 Token 作为 Query，频谱 Token 作为 Key/Value，使每个空间位置都能"查询"全局频谱信息。残差连接确保局部空间特征不被稀释。

**（4）Mamba SSM 骨干**

融合后的 Token 序列送入 \(L\) 层 Mamba 残差块。Mamba 是一种选择性状态空间模型（Selective SSM），其核心递推为：

$$h_n = \bar{A} h_{n-1} + \bar{B} x_n, \quad y_n = C h_n$$

其中 \(\bar{A}, \bar{B}\) 通过零阶保持（ZOH）离散化得到，且 \(B, C, \Delta\) 均为输入依赖的（input-dependent），赋予模型选择性记忆能力。

> 💡 **关键**：Mamba 的计算复杂度为 \(O(Nd)\)（\(N\) 为序列长度，\(d\) 为隐藏维度），相比 Transformer 的 \(O(N^2)\) 在高分辨率 PDE 场景下优势显著。消融实验显示 Mamba+FNO（VRMSE 0.2581）略优于 Transformer+FNO（0.2779）。

**（5）FNO 频谱解码器**

骨干输出经 1×1 卷积投影回物理空间维度后，通过 FNO 头进行频谱精修：

$$\hat{u}_{t+1} = z_{\text{proj}} + \sum_{k=1}^{K} \mathcal{F}^{-1}\!\left(R_k \cdot \mathcal{F}(z_{\text{proj}})\right)$$

其中 \(R_k \in \mathbb{C}^{d_{\text{out}} \times d_{\text{out}}}\) 是可学习的频谱权重矩阵，\(\mathcal{F}\) 和 \(\mathcal{F}^{-1}\) 分别为 FFT 和逆 FFT。这种设计天然保持频谱连续性，避免了纯卷积解码器的高频衰减问题。

**（6）损失函数**

训练使用双重损失：

$$\mathcal{L} = \mathcal{L}_{\text{VRMSE}} + \lambda \cdot \mathcal{L}_{\text{spectral}}$$

其中 VRMSE 按空间方差归一化，确保不同物理量级的场（密度、压力、速度）具有可比性：

$$\mathcal{L}_{\text{VRMSE}} = \frac{\|u - \hat{u}\|_2}{\sqrt{\text{Var}_{\text{spatial}}(u)}}$$

频谱损失在傅里叶域计算 \(L_2\) 距离，惩罚高频分量的偏差。可选的守恒损失和 PDE 残差损失进一步增强物理一致性。

##### 多数据集预训练策略

PDE-FM 在 The Well 基准的 12 个数据集上联合预训练，涵盖从 \(128^2\) 到 \(256^3\) 的 2D/3D 系统。关键设计包括：

- **温度缩放采样**：\(p(i) \propto |\mathcal{D}_i|^{\tau}\)，\(\tau=0.5\) 平衡数据集多样性与收敛稳定性
- **数据集特定适配器**：1×1 卷积进行通道归一化和空间插值，将异构输入映射到标准化网格
- **EMA 难度加权**：用指数移动平均跟踪每个数据集的损失，动态提升困难数据集的采样权重，缓解负迁移

##### 与现有方法的对比

| 方法 | 骨干 | 复杂度 | 跨域能力 | 均值 VRMSE |
|------|------|--------|----------|------------|
| FNO | 频谱卷积 | \(O(N \log N)\) | ❌ 单域 | 0.441 |
| TFNO | Transformer+频谱 | \(O(N^2)\) | ❌ 单域 | 0.469 |
| U-net | 编码器-解码器 | \(O(N)\) | ❌ 单域 | 0.588 |
| CNextU-net | ConvNeXt+U-net | \(O(N)\) | ❌ 单域 | 0.304 |
| PhysiX | 自回归 Transformer (4.5B) | \(O(N^2)\) | ✅ 多域 | 仅 2D |
| **PDE-FM** | **Mamba+FNO** | **\(O(Nd)\)** | **✅ 多域** | **0.165** |

> ⚠️ **局限性**：PDE-FM 在粘弹性不稳定性（VRMSE 0.52 vs CNextU-net 0.25）和线性声学散射等局部刚性/准稳态系统上仍落后于卷积架构，表明长期应力-应变耦合需要显式的物理先验或时序记忆机制。

##### 消融实验关键发现

| 配置 | 均值 VRMSE |
|------|------------|
| Mamba + FiLM + FNO + SpecTok + XAttn + LayerNorm | **0.2581** |
| Transformer + FNO + SpecTok + XAttn + LayerNorm | 0.2779 |
| Transformer + Conv + SpecTok + LayerNorm | 0.3045 |
| Transformer + FNO（无 LayerNorm） | 0.3134 |
| Transformer + Conv（无 SpecTok/XAttn/Norm） | 0.3297 |

三个关键结论：(1) FNO 解码器一致优于卷积解码器；(2) Mamba 骨干略优于 Transformer 且计算成本更低；(3) 频谱 Tokenizer 和 Cross-Attention 贡献了最大的性能增益。

#### 🧪 练习题
```yaml
question: "PDE-FM 中 Cross-Attention 融合模块的 Query 和 Key/Value 分别来自哪里？"
options:
  - "Query 来自频谱 Token，Key/Value 来自空间 Token"
  - "Query 来自空间 Token，Key/Value 来自频谱 Token"
  - "Query、Key、Value 均来自空间 Token（自注意力）"
  - "Query、Key、Value 均来自频谱 Token（自注意力）"
answer: 1
explain: "空间 Token 作为 Query 查询频谱 Token（Key/Value），使每个空间位置能获取全局频率信息，实现局部-全局特征融合。"
```

### SCaSML

```yaml
id: scasml
num: 46
name: SCaSML
full_name: 仿真校准科学机器学习 (Simulation-Calibrated Scientific ML)
year: '2026'
org: ICLR 2026
parent: pinn
paper_url: https://openreview.net/forum?id=scasml2026
project_url: ''
category: acceleration
motivation: 推理阶段缺陷定律误差修正
```

#### 📝 一句话总结
SCaSML 提出在推理阶段对预训练 PDE surrogate 做 defect correction：先推导控制误差 \(\breve{u}=u-\hat{u}\) 的结构保持缺陷定律，再用 Monte Carlo/Multilevel Picard 仿真估计该误差并校正 \(\hat{u}\)，从而无需重训练即可提升高维 PDE 解的可靠性。

#### 🎯 核心要点
- **推理时缩放**：把额外计算预算放在 inference-time simulation，而不是继续训练或微调 surrogate
- **两阶段流程**：先训练 PINN、Gaussian Process 或 Tensor Network 等 SciML surrogate \(\hat{u}\)，再在目标查询点求 defect \(\breve{u}\)
- **结构保持缺陷定律**：把误差 \(u-\hat{u}\) 写成一个新的 semi-linear parabolic PDE，且保持原 PDE 可由随机仿真求解的结构
- **随机仿真校正**：使用 Feynman-Kac、Bismut-Elworthy-Li 表示和 Multilevel Picard (MLP) 迭代估计 defect
- **两类 MLP 实现**：Quadrature MLP 用 Gauss-Legendre quadrature 处理时间积分；Full-history MLP 用 Monte Carlo 采样时间
- **乘积型误差界**：最终误差由 MLP 仿真误差与 surrogate 误差的乘积控制，surrogate 越好，缺陷 PDE 越容易模拟
- **高维基准**：论文在最高 160 维 PDE 上报告对 PINN/GP surrogate 的 20-80% 误差降低
- **来源追溯**：任务给定 OpenReview id 未能直接定位论文；可访问论文为 OpenReview `d2pUyiXwcm` 与 arXiv `2504.16172`

#### 🔬 深入细节
##### 核心架构示意

![SCaSML framework pipeline](https://arxiv.org/html/2504.16172v3/x1.png)
*图：SCaSML 的整体 pipeline。先训练 surrogate \(\hat{u}\)，再在推理时通过随机仿真估计 defect \(\breve{u}=u-\hat{u}\)。*

![SCaSML defect law derivation](https://arxiv.org/html/2504.16172v3/x2.png)
*图：结构保持缺陷定律的推导示意。核心是把原 PDE 与 surrogate 诱导的残差相减，得到误差自身满足的新 PDE。*

可访问来源说明：论文 HTML/PDF 位于 https://arxiv.org/abs/2504.16172 ，ICLR 2026 OpenReview 页面位于 https://openreview.net/forum?id=d2pUyiXwcm ，代码仓库为 https://github.com/Francis-Fan-create/SCaSML 。正文保留 YAML 中的原始 `paper_url`，但方法解读基于上述可访问来源。

##### 算法伪代码

```python
# SCaSML 推理阶段 defect correction 伪代码
# 输入: PDE, 预训练 surrogate u_hat, 查询点 (s, x), MLP level n, sample base M
# 输出: 校正后的 PDE 解 u_scasml(s, x)

def scasml_inference(pde, u_hat, s, x, n, M, mode="full_history"):
    # 1. 用 surrogate 构造残差和终端 defect
    epsilon = residual_of_surrogate(pde, u_hat)          # ∂t u_hat + L u_hat + F(...)
    g_breve = lambda y: pde.terminal(y) - u_hat(pde.T, y)

    # 2. 定义结构保持 defect PDE 的非线性项
    def F_breve(z, grad_z, t, y):
        return (
            F(u_hat(t, y) + z, grad(u_hat, t, y) + grad_z)
            - F(u_hat(t, y), grad(u_hat, t, y))
            + epsilon(t, y)
        )

    # 3. 用 Multilevel Picard 递归估计 defect
    def mlp_defect(t, y, level):
        if level == 0:
            return 0.0

        terminal = average_over_paths(
            g_breve(X_T) for X_T in sample_sde_paths(t, y, pde.T, M**level)
        )

        correction = 0.0
        for l in range(level):
            for path in sample_sde_paths(t, y, random_time=True, count=M**(level-l)):
                z_l = mlp_defect(path.time, path.state, l)
                z_prev = mlp_defect(path.time, path.state, l - 1) if l > 0 else 0.0
                correction += path.weight * (F_breve(z_l) - F_breve(z_prev))

        return terminal + correction

    defect = mlp_defect(s, x, n)
    return u_hat(s, x) + defect
```

##### 原始 PDE 与 surrogate 残差

论文关注 semi-linear parabolic PDE：

$$
\begin{cases}
\partial_r u(r,\mathbf{y})+\mathcal{L}u(r,\mathbf{y})
+F\left(u(r,\mathbf{y}),\sigma^\top\nabla_{\mathbf{y}}u(r,\mathbf{y})\right)=0,\\
u(T,\mathbf{y})=g(\mathbf{y}),
\end{cases}
$$

其中

$$
\mathcal{L}u
=\langle\mu,\nabla u\rangle
+\frac{1}{2}\mathrm{Tr}\left(\sigma^\top \mathrm{Hess}(u)\sigma\right)
$$

是二阶线性微分算子。普通 PINN 或 GP surrogate 给出近似解 \(\hat{u}\)，但直接使用 \(\hat{u}\) 会继承训练误差和模型偏差。SCaSML 不重训模型，而是计算 surrogate 代入 PDE 后的残差：

$$
\epsilon(r,\mathbf{y})
:=\partial_r\hat{u}
+\mathcal{L}\hat{u}
+F\left(\hat{u},\sigma^\top\nabla_{\mathbf{y}}\hat{u}\right)
$$

以及终端条件上的缺陷：

$$
\breve{g}(\mathbf{y})=g(\mathbf{y})-\hat{u}(T,\mathbf{y})
$$

##### 结构保持缺陷定律

定义真实误差：

$$
\breve{u}(r,\mathbf{y}) := u(r,\mathbf{y})-\hat{u}(r,\mathbf{y})
$$

将原 PDE 与 surrogate 残差相减，可以得到 defect 自身满足的 PDE：

$$
\begin{cases}
\partial_r \breve{u}+\mathcal{L}\breve{u}
+\breve{F}\left(\breve{u},\sigma^\top\nabla_{\mathbf{y}}\breve{u}\right)=0,\\
\breve{u}(T,\mathbf{y})=\breve{g}(\mathbf{y}),
\end{cases}
$$

其中

$$
\breve{F}\left(\breve{u},\sigma^\top\nabla\breve{u}\right)
=F\left(\hat{u}+\breve{u},
\sigma^\top(\nabla\hat{u}+\nabla\breve{u})\right)
-F\left(\hat{u},\sigma^\top\nabla\hat{u}\right)
+\epsilon
$$

这就是论文所谓的 `Structural-preserving Law of Defect`。它的关键在于：缺陷方程仍是 semi-linear parabolic PDE，因此可继续使用高维随机 PDE 求解器，而不是退化成必须网格化全空间的有限元/有限差分校正。

##### 为什么用 Monte Carlo/MLP

对于线性情形，defect 可由 Feynman-Kac 表示：

$$
\breve{u}(s,x)
=\mathbb{E}\left[
\breve{g}(X_T^{s,x})
+\int_s^T \epsilon(t,X_t^{s,x})\,dt
\right]
$$

半线性情形中还需要处理非线性项 \(\breve{F}\) 及梯度项，论文采用 Feynman-Kac 与 Bismut-Elworthy-Li 表示，把 \((\breve{u},\sigma^\top\nabla\breve{u})\) 看成一个固定点：

$$
\breve{\mathbf{u}}^\infty
=\Phi\left(\breve{\mathbf{u}}^\infty\right)
$$

标准 Picard 迭代是 \(\breve{\mathbf{u}}_{k+1}=\Phi(\breve{\mathbf{u}}_k)\)。MLP 的改进是使用 multilevel Monte Carlo 的 telescoping 结构：

$$
\mathbb{E}[\breve{\mathbf{u}}_n]
=\mathbb{E}[\Phi(\breve{\mathbf{u}}_0)]
+\sum_{l=1}^{n-1}
\mathbb{E}\left[
\Phi(\breve{\mathbf{u}}_l)-\Phi(\breve{\mathbf{u}}_{l-1})
\right]
$$

这样低层级用更多样本、细层级用较少样本，降低方差和计算量。Full-history MLP 通过随机采样时间处理积分；Quadrature MLP 用 Gauss-Legendre 节点和权重处理时间积分。

##### 误差界与直觉

SCaSML 的理论亮点是乘积型误差界。论文给出的全局 \(L^2\) bound 可概括为：

$$
\sup_{(t,\mathbf{x})}
\left\|
\breve{\mathbf{U}}_{N,M}(t,\mathbf{x})
-\breve{\mathbf{u}}(t,\mathbf{x})
\right\|_{L^2}
\le
E(M,N)\cdot C_F e(\hat{u})
$$

其中 \(E(M,N)\) 是底层 MLP solver 的误差项，\(e(\hat{u})\) 是 surrogate 误差。直觉是：surrogate 越准，残差 \(\epsilon\)、终端 defect \(\breve{g}\) 和 \(\breve{F}\) 的尺度越小，Monte Carlo 估计 defect 的方差也越小。

如果 surrogate 用 \(m\) 个训练点达到 \(e(\hat{u})\sim m^{-\gamma}\)，则 residual 量级也随之下降；再在推理时平均 \(m\) 条 Monte Carlo 路径，统计误差可写为：

$$
\sqrt{\frac{m^{-2\gamma}}{m}}
=m^{-\gamma-\frac{1}{2}}
$$

这比单独 surrogate 的 \(m^{-\gamma}\) 和普通 Monte Carlo 的 \(m^{-1/2}\) 都更快。注意这不是“免费提升”：SCaSML 用额外 inference compute 换取目标查询点精度，而不是提升整个函数域上的 surrogate。

##### 与 PINN 的关系

PINN 通常在训练阶段通过 PDE residual loss 让 \(\hat{u}\) 尽量满足方程：

$$
\mathcal{L}_{\mathrm{PINN}}
=\mathcal{L}_{\mathrm{data}}
+\lambda_f
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left\|
\partial_t\hat{u}(t_i,x_i)
+\mathcal{N}[\hat{u}](t_i,x_i)
\right\|^2
$$

SCaSML 并不替代 PINN，而是把 PINN 当作第一阶段 surrogate。PINN 给出低成本、全域可查询的近似；SCaSML 在用户真正需要高精度的点上运行 defect simulation，把剩余偏差作为一个物理方程再求一次。

> 💡 关键：SCaSML 的“推理阶段缺陷定律误差修正”本质上是把黑盒 surrogate 的误差重新物理化，使它变成可仿真的 PDE 对象。

#### 🧪 练习题
```yaml
question: "SCaSML 的结构保持缺陷定律主要用于什么？"
options:
  - "在训练前随机初始化 PINN 参数"
  - "把 surrogate 的误差 u - u_hat 表示为一个仍可用随机仿真求解的 PDE"
  - "把所有高维 PDE 降维成一维 ODE"
  - "用更深的网络替代 Monte Carlo 求解器"
answer: 1
explain: "SCaSML 的核心是推导 defect PDE，并用 MLP/Feynman-Kac 类随机仿真估计该误差，再将其加回 surrogate 输出。"
```

### Mollifier-Layers

```yaml
id: mollifier_layers
num: 47
name: Mollifier-Layers
full_name: 逆向PDE平滑层 (Mollifier Layers for Inverse PDEs)
year: '2026'
org: 宾夕法尼亚大学
parent: pinn
paper_url: https://arxiv.org/abs/2601.mollifier
project_url: ''
category: acceleration
motivation: 平滑层处理噪声逆向PDE求解
```

#### 📝 一句话总结
Mollifier Layers 提出在网络输出端加入解析 mollifier 卷积层，用平滑积分和解析核导数替代递归自动微分来计算高阶 PDE 导数，从而提升噪声逆问题中的导数稳定性、参数反演精度和训练/显存效率。

#### 🎯 核心要点
- **替代递归 autodiff**：高阶导数不再通过多次反向传播链式求导，而是由网络输出与解析 mollifier 导数核卷积得到
- **架构无关插件**：Mollifier Layer 接在输出层之后，可用于 PINN、PirateNet 等 PhiML 架构，不要求重写主干网络
- **弱形式直觉**：借鉴有限元弱形式，用光滑测试函数积分推断导数，避免在噪声点上做不稳定的点态高阶微分
- **核心表示**：基础网络预测 \(\hat{g}\)，mollifier 层给出 \(\hat{u}=\hat{g}*\eta\) 和 \(\partial_j^k\hat{u}=\hat{g}*\partial_j^k\eta\)
- **三类收益**：计算效率、导数与网络深度解耦、局部平滑带来的噪声鲁棒性
- **逆问题覆盖**：在 1D Langevin、2D heat、2D reaction-diffusion 等一阶、二阶、四阶 PDE 上验证参数恢复
- **生物物理应用**：用于从 STORM 超分辨率染色质图像中反演空间变化的 epigenetic reaction rates
- **来源追溯**：任务给定 arXiv `2601.mollifier` 未能对应可访问论文；实际论文为 arXiv `2505.11682`，OpenReview `6mFVZSzyev` 显示 TMLR 2026 接收

#### 🔬 深入细节
##### 核心架构示意

![Mollifier Layers architecture](https://arxiv.org/html/2505.11682v1/extracted/6447334/figures/Fig1_new.png)
*图：Mollifier Layers 的动机和架构。图中对比了 autodiff 在高阶导数、训练时间和噪声参数恢复中的局限，并展示了用 mollifier convolution 替代 autodiff derivative 的 PhiML+Mollifier 结构。*

可访问来源说明：论文 arXiv 页面为 https://arxiv.org/abs/2505.11682 ，OpenReview 页面为 https://openreview.net/forum?id=6mFVZSzyev ，宾夕法尼亚大学新闻稿为 https://www.seas.upenn.edu/stories/ai-method-tackles-one-of-sciences-hardest-math-problems/ 。正文保留 YAML 中的原始 `paper_url`，但方法解读基于上述可访问来源。

##### 算法伪代码

```python
# Mollifier Layers 训练伪代码
# 输入: 观测 u_data, PDE 算子 D, 未知参数 λ(t, x), mollifier kernel η
# 输出: 反演参数 λ_hat 和满足 PDE 的平滑解 u_hat

kernel = build_compact_mollifier(support=U, order="C_infinity")
derivative_kernels = {
    "t": analytic_derivative(kernel, axis="t", order=1),
    "x": analytic_derivative(kernel, axis="x", order=1),
    "xx": analytic_derivative(kernel, axis="x", order=2),
    "xxxx": analytic_derivative(kernel, axis="x", order=4),
}

for batch in collocation_grid:
    # 1. 主干网络不直接输出 u，而输出待平滑的 g
    g_hat, lambda_hat = backbone(batch.t, batch.x)

    # 2. Mollifier Layer 在输出端执行局部积分/卷积
    u_hat = conv(g_hat, kernel)
    u_t = conv(g_hat, derivative_kernels["t"])
    u_xx = conv(g_hat, derivative_kernels["xx"])

    # 3. 用卷积导数构造 PDE residual，而不是 recursive autodiff
    f_hat = u_t + D(u_hat, u_xx, lambda_hat)

    data_loss = mean((u_hat[observed] - u_data) ** 2)
    pde_loss = mean(f_hat ** 2)
    loss = data_loss + pde_loss

    loss.backward()      # 只对网络参数和可学习参数反传；导数核固定解析
    optimizer.step()
```

##### 标准 PhiML 参数反演

论文先用一般 PDE 表示逆问题：

$$
u_t+D[u,\lambda]=0,\qquad x\in\Omega,\quad t\in T
$$

其中 \(u(t,x)\) 是观测或待拟合的解，\(\lambda(t,x)\) 是要反演的时空变化参数，\(D[\cdot;\lambda]\) 是线性或非线性 PDE 算子。传统 PhiML/PINN 用网络 \(\hat{u}_\theta(t,x)\) 和 \(\hat{\lambda}_\theta(t,x)\) 表示解与参数，并通过 autodiff 计算 PDE residual：

$$
\hat{f}
=\hat{u}_t+D[\hat{u},\hat{\lambda}]
$$

总损失为：

$$
\mathrm{MSE}_{\mathrm{total}}
=\mathrm{MSE}_u+\mathrm{MSE}_f
$$

$$
\mathrm{MSE}_u
=\frac{1}{N_u}\sum_{i=1}^{N_u}
\left|\hat{u}(t^i,x^i)-u(t^i,x^i)\right|^2
$$

$$
\mathrm{MSE}_f
=\frac{1}{N_f}\sum_{j=1}^{N_f}
\left|\hat{f}(t^j,x^j,\lambda^j)\right|^2
$$

问题在于，高阶 PDE 需要递归计算 \(\partial_x^2\hat{u}\)、\(\partial_x^4\hat{u}\) 等导数；每多一阶导数都要保留更多计算图和中间梯度，导致显存、时间和数值噪声问题。

##### Mollifier Layer 的核心公式

Mollifier Layers 不让主干网络直接输出 \(\hat{u}\)，而是输出 \(\hat{g}\)。输出端用 mollifying function \(\eta\) 做卷积：

$$
\hat{u}(n)
=\hat{g}*\eta(n)
=\int_{m\in U}\hat{g}(m)\eta(n-m)\,dm
$$

对任意变量 \(j\) 的导数，由解析核导数给出：

$$
\hat{u}_{j}(n)
=\hat{g}*\eta_j(n)
=\int_{m\in U}\hat{g}(m)\eta_j(n-m)\,dm
$$

$$
\hat{u}_{jj}(n)
=\hat{g}*\eta_{jj}(n),\qquad
\hat{u}_{jjjj}(n)
=\hat{g}*\eta_{jjjj}(n)
$$

这相当于把“对神经网络递归求导”改成“对固定解析核求导，再与网络输出卷积”。因此高阶导数的计算成本不随网络深度成倍增加，而主要由卷积核支持域和网格分辨率决定。

##### 为什么 mollifier 能抗噪

论文要求 mollifier \(\eta\) 具备三类性质：

- **无限可微**：\(\eta\in C^\infty\)，可以解析生成任意阶导数核
- **紧支撑**：\(\eta(m)=0\) for \(m\notin U\)，卷积只在局部窗口内发生
- **非负性**：作为局部平均核，减少振荡核带来的抵消误差

一致性界给出更直接的直觉。设真实场 \(u\in C^1([0,1])\) 是 \(L\)-Lipschitz，有噪声网格样本 \(g_j=u(x_j)+n_j\)，且 \(|n_j|\le\varepsilon\)。令 \(\eta_\delta(r)=\delta^{-1}\eta(r/\delta)\)，\(J_\delta g=\eta_\delta*g\)，则论文给出：

$$
\left\|D_0(J_\delta g)-u'\right\|_\infty
\le
C_1\delta+C_2(h+\varepsilon)
$$

其中 \(D_0g_j=(g_{j+1}-g_{j-1})/(2h)\)。这说明误差由平滑偏差、离散化误差和噪声共同决定。支撑半径 \(\delta\) 过大会过度平滑，过小会放大噪声，因此 kernel shape 与 support 是关键超参数。

##### 逆参数估计机制

对于形式为

$$
u_t-\lambda D[u]=0
$$

的可分离参数问题，论文还使用一种直接参数恢复策略：

$$
\hat{\lambda}_{\mathrm{final}}
=\frac{\hat{u}_t}{D[\hat{u}]}
$$

这里 \(\hat{u}_t\) 和 \(D[\hat{u}]\) 都可由 mollifier convolution 计算。这样做的动机是：\(\hat{u}\) 通过数据项 \(\mathrm{MSE}_u\) 捕获观测变化，mollifier 再稳定地恢复导数，因此比让网络直接输出高频 \(\lambda(t,x)\) 更容易处理时空变化和噪声。

##### 三个 PDE 基准

论文用从低阶到高阶的任务检验该层是否真正提升逆问题：

- **1D Langevin**：简化为 \(u_t=u+\lambda(t)\)，考察时间变化或带噪 forcing term 的恢复
- **2D Heat**：\(0=\lambda(x,y)\nabla^2u+m(x,y)\)，从稀疏温度场和已知 source 恢复空间变化热扩散率
- **2D Reaction-Diffusion**：染色质相场模型中 \(\partial_t\phi_d=\nabla^2\mu_d+2(\lambda\phi_e-\phi_h)\)，由于 \(\mu_d\propto\nabla^2\phi_d\)，整体形成四阶 PDE

这些任务共同测试了高阶导数、噪声、空间异质性和真实图像数据。论文讨论部分报告：通过把递归高阶 autodiff 压缩为单个解析卷积，Mollifier Layers 在实验中将显存和训练时间降低约 6-10x，同时保持更稳定的高阶导数估计。

##### 与 PINN/gPINN 的区别

PINN 的核心是把 PDE residual 加入损失；gPINN 进一步加入 residual 的梯度约束。但它们仍然依赖 autodiff 产生导数。Mollifier Layers 改变的是“导数生成器”：PDE residual 仍然存在，训练目标仍是 \(\mathrm{MSE}_u+\mathrm{MSE}_f\)，只是 \(\hat{f}\) 中的 \(\hat{u}_t,\nabla^2\hat{u},\nabla^4\hat{u}\) 来自输出卷积而不是递归求导。

> ⚠️ 注意：mollifier 并不是万能滤波器。它会引入平滑偏差，边界和各向异性网格也需要特殊处理。论文把自适应/可学习 kernel、boundary-aware formulation 和 adaptive mesh validation 列为后续方向。

#### 🧪 练习题
```yaml
question: "Mollifier Layers 相比传统 PINN 自动微分的核心变化是什么？"
options:
  - "删除 PDE residual，只训练数据拟合项"
  - "让网络输出经过紧支撑平滑核卷积，并用解析核导数计算高阶导数"
  - "把所有 PDE 都转换成 Transformer 语言模型任务"
  - "只在二维规则网格上使用有限差分"
answer: 1
explain: "Mollifier Layers 保留 PhiML/PINN 的残差训练框架，但把导数计算从 recursive autodiff 换成输出端解析 mollifier convolution，因此更省显存且对噪声更稳定。"
```
