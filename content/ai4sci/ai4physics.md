---
domain: ai4sci
topic_id: ai4physics
topic_name: 物理学AI
page_icon: ⚛️
page_title: 物理学AI 算法总结
page_subtitle: '{build_date} 版'
page_desc: 从PINN到神经算子，从流体仿真到物理定律发现，涵盖2016-2026年物理学AI核心算法演化
hero_pills:
- 🏷️ PINN · Neural Operators · AI4Sci
- 🔬 PDE求解 · 流体仿真 · 物理发现
count_pill: '{count} 个算法'
categories:
  pde_solving:
    label: 偏微分方程求解
    color: '#3B82F6'
  fluid_simulation:
    label: 流体仿真
    color: '#10B981'
  solid_mechanics:
    label: 固体力学
    color: '#F59E0B'
  physics_discovery:
    label: 理论物理发现
    color: '#8B5CF6'
  physics_constrained:
    label: 物理约束学习
    color: '#EC4899'
  quantum_particle:
    label: 量子与粒子物理
    color: '#6366F1'
image_base: ../../content/ai4sci/ai4physics/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4physics/overview/zhihu__物理AI（二）：物理AI数学原理及实操__d24e7271/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4physics/latest/zhihu__当物理遇上AI：深度学习里的物理元素（下）__7b82434b/article.md

## 算法演化关系

```yaml
nodes:
- id: sindy
  x: 0.0
  y: 70
  category: physics_discovery
- id: nqs
  x: 10.0
  y: 110
  category: quantum_particle
- id: pde_net
  x: 20.0
  y: 10
  category: pde_solving
- id: neural_ode
  x: 20.0
  y: 90
  category: physics_constrained
- id: pinn
  x: 30.0
  y: 10
  category: pde_solving
- id: hnn
  x: 30.0
  y: 90
  category: physics_constrained
- id: xpinns
  x: 40.0
  y: 10
  category: pde_solving
- id: gns
  x: 40.0
  y: 30
  category: fluid_simulation
- id: meshgraphnets
  x: 40.0
  y: 30
  category: fluid_simulation
- id: jax_md
  x: 40.0
  y: 30
  category: fluid_simulation
- id: difftaichi
  x: 40.0
  y: 30
  category: fluid_simulation
- id: phiflow
  x: 40.0
  y: 30
  category: fluid_simulation
- id: ai_feynman
  x: 40.0
  y: 70
  category: physics_discovery
- id: ude
  x: 40.0
  y: 70
  category: physics_discovery
- id: lnn
  x: 40.0
  y: 90
  category: physics_constrained
- id: sympnets
  x: 40.0
  y: 90
  category: physics_constrained
- id: particlenet
  x: 40.0
  y: 110
  category: quantum_particle
- id: hp_vpinns
  x: 50.0
  y: 10
  category: pde_solving
- id: fno
  x: 50.0
  y: 10
  category: pde_solving
- id: deeponet
  x: 50.0
  y: 10
  category: pde_solving
- id: brax
  x: 50.0
  y: 30
  category: fluid_simulation
- id: canns
  x: 50.0
  y: 50
  category: solid_mechanics
- id: tanns
  x: 50.0
  y: 50
  category: solid_mechanics
- id: egnn
  x: 50.0
  y: 90
  category: physics_constrained
- id: noether_nets
  x: 50.0
  y: 90
  category: physics_constrained
- id: gpinn
  x: 60.0
  y: 10
  category: pde_solving
- id: causal_pinn
  x: 60.0
  y: 10
  category: pde_solving
- id: pi_deeponet
  x: 60.0
  y: 10
  category: pde_solving
- id: geo_fno
  x: 70.0
  y: 10
  category: pde_solving
- id: uno
  x: 70.0
  y: 10
  category: pde_solving
- id: pysr
  x: 70.0
  y: 70
  category: physics_discovery
- id: poseidon
  x: 80.0
  y: 10
  category: pde_solving
- id: walrus
  x: 100.0
  y: 10
  category: pde_solving
- id: transolver3
  x: 100.0
  y: 10
  category: pde_solving
- id: pf_pino
  x: 100.0
  y: 10
  category: pde_solving
- id: pikan
  x: 100.0
  y: 10
  category: pde_solving
- id: fedonet
  x: 100.0
  y: 10
  category: pde_solving
- id: fano
  x: 100.0
  y: 30
  category: fluid_simulation
- id: physicsnemo
  x: 100.0
  y: 30
  category: fluid_simulation
- id: simple_pinn
  x: 100.0
  y: 30
  category: fluid_simulation
- id: fe_pinns
  x: 100.0
  y: 50
  category: solid_mechanics
- id: aion1
  x: 100.0
  y: 90
  category: physics_constrained
- id: momentum_gnn
  x: 100.0
  y: 90
  category: physics_constrained
edges:
- from: pinn
  to: xpinns
  label: 域分解
- from: gns
  to: meshgraphnets
  label: 网格扩展
- from: neural_ode
  to: ude
  label: 混合建模
- from: hnn
  to: lnn
  label: 拉格朗日
- from: hnn
  to: sympnets
  label: 辛对称
- from: pinn
  to: hp_vpinns
  label: 变分细化
- from: jax_md
  to: brax
  label: 刚体引擎
- from: pinn
  to: gpinn
  label: 梯度增强
- from: pinn
  to: causal_pinn
  label: 因果加权
- from: deeponet
  to: pi_deeponet
  label: 物理嵌入
- from: fno
  to: geo_fno
  label: 几何自适应
- from: fno
  to: uno
  label: 多尺度
- from: fno
  to: poseidon
  label: 基础模型
- from: poseidon
  to: walrus
  label: 规模化扩展
- from: fno
  to: transolver3
  label: 大规模网格
- from: fno
  to: pf_pino
  label: 相场约束
- from: pinn
  to: pikan
  label: 架构演进
- from: deeponet
  to: fedonet
  label: 谱特征嵌入
- from: fno
  to: fano
  label: 平流增强
- from: pinn
  to: simple_pinn
  label: 算法融合
- from: canns
  to: fe_pinns
  label: 有限元集成
- from: egnn
  to: momentum_gnn
  label: 守恒律硬约束
milestones:
- id: neural_ode
  label: 连续深度模型奠基
- id: pinn
  label: 物理信息嵌入范式
- id: fno
  label: 算子学习突破
- id: walrus
  label: 物理大模型时代
```

## 核心算法

### SINDy

```yaml
id: sindy
num: 1
name: SINDy
full_name: 稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)
year: '2016'
org: 华盛顿大学
parent: —
paper_url: https://www.pnas.org/doi/10.1073/pnas.1517384113
project_url: ''
category: physics_discovery
motivation: 稀疏回归识别非线性控制方程
```

#### 📝 一句话总结
SINDy 将动力系统方程发现转化为“在候选非线性函数库中寻找稀疏系数”的回归问题，用少量活跃项从观测轨迹和导数中恢复可解释的控制方程。它解决了符号回归搜索空间巨大、传统系统辨识偏线性且难以推广到强非线性动力学的问题。

#### 🎯 核心要点
- 方程假设：许多物理系统的真实动力学 \(\dot{x}=f(x)\) 在合适候选函数库中是稀疏的。
- 数据矩阵化：把时间序列状态组成 \(X\)，把状态导数组成 \(\dot{X}\)，每一行对应一个观测时刻。
- 候选函数库：构造 \(\Theta(X)\)，包含常数项、多项式项、三角函数项或领域知识给出的非线性项。
- 稀疏系数矩阵：求解 \(\dot{X}=\Theta(X)\Xi\)，\(\Xi\) 的非零元素直接给出每个状态方程中的活跃项和系数。
- 核心算法：使用 LASSO 或 sequential thresholded least squares，先最小二乘，再反复阈值化小系数并在剩余项上重拟合。
- 模型选择：通过交叉验证和 Pareto front 在预测误差与非零项数量之间选择阈值 \(\lambda\)。
- 扩展能力：可处理离散时间系统、高维 PDE 的低秩表示、带参数/分岔项、显式时间项和外部 forcing/control 的系统。
- 论文案例：线性/非线性振子、Lorenz 混沌系统、圆柱绕流 wake、logistic map 和 Hopf normal form。

#### 🔬 深入细节
来源说明：PNAS DOI 页面在命令行访问时触发了访问保护；方法细节来自同一论文的 arXiv 版本 `https://arxiv.org/abs/1509.03580` 和 ar5iv HTML 转换，图示为 ar5iv 从论文源文件渲染出的 Figure 1。

![SINDy 稀疏动力学识别流程](https://ar5iv.labs.arxiv.org/html/1509.03580/assets/x1.png)
*图：SINDy 用状态轨迹和导数构造候选非线性库 \(\Theta(X)\)，再通过稀疏回归找出满足 \(\dot{X}=\Theta(X)\Xi\) 的少数活跃项。*

```python
# SINDy sequential thresholded least-squares 伪代码
X = stack_state_snapshots(x(t_1), ..., x(t_m))
dXdt = estimate_time_derivatives(X)
Theta = build_library(X, terms=["1", "x", "x^2", "x^3", "sin(x)", "cos(x)"])

Xi = least_squares(Theta, dXdt)  # 初始全量回归
for _ in range(max_iter):
    small = abs(Xi) < lambda_
    Xi[small] = 0.0
    for k in range(state_dim):
        active = ~small[:, k]
        Xi[active, k] = least_squares(Theta[:, active], dXdt[:, k])

def discovered_rhs(x):
    return Theta_symbolic(x) @ Xi
```

SINDy 的起点是一个连续时间动力系统：

$$
\dot{\mathbf{x}}(t)=\mathbf{f}(\mathbf{x}(t)),\quad
\mathbf{x}(t)\in\mathbb{R}^n
$$

从实验或仿真得到 \(m\) 个时刻的状态和导数后，将它们堆叠为：

$$
X=
\begin{bmatrix}
\mathbf{x}^T(t_1)\\
\mathbf{x}^T(t_2)\\
\vdots\\
\mathbf{x}^T(t_m)
\end{bmatrix},\quad
\dot{X}=
\begin{bmatrix}
\dot{\mathbf{x}}^T(t_1)\\
\dot{\mathbf{x}}^T(t_2)\\
\vdots\\
\dot{\mathbf{x}}^T(t_m)
\end{bmatrix}
$$

然后构造候选函数库：

$$
\Theta(X)=
\begin{bmatrix}
|&|&|&|&&|&|\\
\mathbf{1}&X&X^{P_2}&X^{P_3}&\cdots&\sin(X)&\cos(X)\\
|&|&|&|&&|&|
\end{bmatrix}
$$

这里 \(X^{P_2}\) 表示所有二次交叉项，例如 \(x_1^2,x_1x_2,\ldots,x_n^2\)。候选库可以按问题扩展为有理函数、Fourier 项、PDE 空间导数项或已知控制输入项。最终要解的是：

$$
\dot{X}=\Theta(X)\Xi
$$

矩阵 \(\Xi=[\xi_1,\xi_2,\ldots,\xi_n]\) 的第 \(k\) 列对应第 \(k\) 个状态方程。若某个系数为 0，说明该候选函数不参与对应方程；非零项则直接构成可读的动力学：

$$
\dot{x}_k=f_k(\mathbf{x})=\Theta(\mathbf{x}^T)\xi_k
$$

稀疏性可以通过 LASSO 写成：

$$
\xi_k=\arg\min_{\xi'_k}
\left\|\Theta(X)\xi'_k-\dot{X}_k\right\|_2
+\lambda\left\|\xi'_k\right\|_1
$$

论文实际强调的 sequential thresholded least squares 更轻量：先普通最小二乘得到全量 \(\Xi\)，把绝对值小于 \(\lambda\) 的系数置零，再只在剩余列上重新最小二乘。这个循环把“选择模型结构”和“估计连续系数”交替进行，避免了符号回归枚举公式树的组合爆炸。

噪声处理是 SINDy 能否落地的关键。若 \(\dot{X}\) 来自数值微分，噪声会被放大；论文将含噪形式写作：

$$
\dot{X}=\Theta(X)\Xi+\eta Z
$$

其中 \(Z\) 是高斯噪声矩阵，\(\eta\) 是噪声强度。实践中通常要先平滑 \(X\)、用 total variation regularized derivative 估计导数，或用 SVD 硬阈值去噪。阈值 \(\lambda\) 不能只按训练误差调，因为 \(\lambda\) 太小会保留伪项，太大会删掉真实弱项；论文建议用交叉验证寻找误差-复杂度 Pareto front 的 elbow。

SINDy 和传统系统辨识的差别在于输出不是黑箱预测器，而是一组可解释方程。例如 Lorenz 系统真实方程只有线性项和二次项：

$$
\dot{x}=\sigma(y-x),\quad
\dot{y}=x(\rho-z)-y,\quad
\dot{z}=xy-\beta z
$$

只要候选库包含这些项，稀疏回归就能从混沌轨迹中恢复相同结构。对混沌系统来说，长期单条轨迹误差会因 Lyapunov 指数快速放大；SINDy 更重要的成功标准是恢复吸引子几何和方程结构，而不是长时间逐点预测。

论文的扩展也很关键。离散时间系统可写作 \(X_2^m=\Theta(X_1^{m-1})\Xi\)，线性库时退化为 DMD。高维 PDE 可先用 POD/SVD 得到低维模态系数，再对模态动力学做 SINDy。若系统受参数 \(\mu\)、控制输入 \(u(t)\) 或时间 \(t\) 影响，可以把这些量并入候选库，从而识别分岔 normal form 或 forced dynamics。

#### 🧪 练习题
```yaml
question: "SINDy 中 sequential thresholded least-squares 的主要作用是什么？"
options:
  - "把连续时间系统强制转换成离散时间系统"
  - "在候选函数库中反复删除小系数，并对剩余项重新拟合，得到稀疏方程"
  - "用神经网络逼近所有未知非线性项"
  - "只保留线性项以便和 DMD 完全一致"
answer: 1
explain: "SINDy 的核心是假设真实动力学只包含少数候选项；阈值化加重拟合能同时选择结构和估计系数。"
```

### NQS

```yaml
id: nqs
num: 2
name: NQS
full_name: 神经量子态 (Neural Quantum States)
year: '2017'
org: ETH Zurich
parent: —
paper_url: https://www.science.org/doi/10.1126/science.aag2302
project_url: ''
category: quantum_particle
motivation: RBM表示波函数解决多体问题
```

#### 📝 一句话总结
NQS 用限制玻尔兹曼机等神经网络直接参数化多体波函数 \(\Psi(\mathcal{S})\)，通过变分 Monte Carlo 和随机重构优化基态或时间演化。它把指数复杂的量子态表示问题转化为可采样、可优化的神经网络变分 ansatz。

#### 🎯 核心要点
- 波函数黑箱视角：把多体构型 \(\mathcal{S}\) 输入神经网络，输出复值波函数振幅和相位 \(\Psi(\mathcal{S})\)。
- RBM ansatz：使用 \(N\) 个可见自旋和 \(M\) 个隐藏变量，隐藏单元无层内连接，可解析求和得到 \(2\cosh\) 形式。
- 可调表达能力：隐藏单元密度 \(\alpha=M/N\) 控制参数量和精度，类似 MPS 的 bond dimension，但隐藏单元天然引入非局域关联。
- 复值参数：权重 \(\mathcal{W}=\{a_i,b_j,W_{ij}\}\) 可取复数，从而同时表示波函数的幅度与相位。
- 基态求解：用 VMC 采样 \(|\Psi_M(\mathcal{S};\mathcal{W})|^2\)，最小化能量期望 \(E(\mathcal{W})\)。
- 优化方法：采用 stochastic reconfiguration，相当于变分子空间中的虚时间演化，用协方差矩阵 \(S\) 和 force 向量 \(F\) 更新参数。
- 动力学求解：用 Dirac-Frenkel time-dependent variational principle 和 t-VMC 最小化精确演化与变分演化的 Hilbert 空间距离。
- 验证系统：在一维/二维 transverse-field Ising 和 antiferromagnetic Heisenberg 模型上比较精确解、MPS、Jastrow、EPS、PEPS 和 t-DMRG。

#### 🔬 深入细节
来源说明：Science DOI 是正式发表版本；可访问的同文 arXiv 版本为 `https://arxiv.org/abs/1606.02318`，ar5iv HTML 转换提供了论文图像直链。以下公式和算法细节来自 arXiv 源文件及其补充材料。

![RBM 神经量子态结构](https://ar5iv.labs.arxiv.org/html/1606.02318/assets/x1.png)
*图：NQS 论文中的 RBM 架构，黄色节点是物理可见自旋 \(\sigma_i^z\)，灰色节点是隐藏变量 \(h_j\)，网络输出构型 \(\mathcal{S}\) 的波函数值。*

```python
# NQS 基态 VMC + stochastic reconfiguration 伪代码
initialize_complex_parameters(W = {a_i, b_j, W_ij})

for step in range(num_optimization_steps):
    samples = []
    S = random_spin_configuration()
    for _ in range(num_mcmc_steps):
        S_new = flip_random_spin(S)
        accept_prob = min(1, abs(psi(S_new, W) / psi(S, W)) ** 2)
        S = accept_or_reject(S, S_new, accept_prob)
        samples.append(S)

    E_loc = [local_energy(S, W, Hamiltonian) for S in samples]
    O = [log_derivatives(S, W) for S in samples]
    S_matrix = covariance(O.conjugate(), O)
    F_vector = covariance(O.conjugate(), E_loc)
    W = W - gamma * solve_regularized(S_matrix, F_vector)
```

NQS 的核心是把量子多体波函数看成一个函数近似问题。对 \(N\) 个离散自由度的构型 \(\mathcal{S}=(\sigma_1^z,\ldots,\sigma_N^z)\)，RBM 形式写为：

$$
\Psi_M(\mathcal{S};\mathcal{W})=
\sum_{\{h_i\}}
\exp\left(
\sum_j a_j\sigma_j^z+
\sum_i b_i h_i+
\sum_{ij} W_{ij}h_i\sigma_j^z
\right)
$$

因为 RBM 没有可见-可见和隐藏-隐藏连接，隐藏变量可解析求和，得到更实用的闭式表达：

$$
\Psi_M(\mathcal{S};\mathcal{W})=
\exp\left(\sum_i a_i\sigma_i^z\right)
\prod_{j=1}^{M}2\cosh\theta_j(\mathcal{S})
$$

$$
\theta_j(\mathcal{S})=b_j+\sum_i W_{ij}\sigma_i^z
$$

这组参数可取复数，因此网络既能表示概率幅大小，也能表示相位。隐藏单元密度 \(\alpha=M/N\) 是精度旋钮：增加 \(\alpha\) 会增加非局域相关通道，使表示能力提高。若利用平移对称性，还可以把权重写成共享 filter，减少参数并让模型学习类似卷积特征的关联模式。

基态问题通过变分原理处理。给定 Hamiltonian \(\mathcal{H}\)，优化目标是能量期望：

$$
E(\mathcal{W})=
\frac{\langle\Psi_M|\mathcal{H}|\Psi_M\rangle}
{\langle\Psi_M|\Psi_M\rangle}
$$

由于完整 Hilbert 空间指数大，不能枚举所有 \(\mathcal{S}\)。NQS 用 Metropolis-Hastings 从 \(|\Psi_M(\mathcal{S})|^2\) 采样，单次翻转一个自旋并按以下概率接受：

$$
A(\mathcal{S}^{(k)}\rightarrow\mathcal{S}^{(k+1)})
=
\min\left(
1,
\left|
\frac{\Psi_M(\mathcal{S}^{(k+1)})}
{\Psi_M(\mathcal{S}^{(k)})}
\right|^2
\right)
$$

采样后计算局域能量和 log-derivative：

$$
E_{\textrm{loc}}(\mathcal{S})=
\frac{\langle\mathcal{S}|\mathcal{H}|\Psi_M\rangle}
{\Psi_M(\mathcal{S})},\quad
\mathcal{O}_k(\mathcal{S})=
\frac{1}{\Psi_M(\mathcal{S})}
\partial_{\mathcal{W}_k}\Psi_M(\mathcal{S})
$$

随机重构的更新式为：

$$
\mathcal{W}(p+1)=\mathcal{W}(p)-\gamma S^{-1}(p)F(p)
$$

其中

$$
S_{kk'}=
\langle\mathcal{O}_k^\star\mathcal{O}_{k'}\rangle
-\langle\mathcal{O}_k^\star\rangle\langle\mathcal{O}_{k'}\rangle
$$

$$
F_k=
\langle E_{\textrm{loc}}\mathcal{O}_k^\star\rangle
-\langle E_{\textrm{loc}}\rangle\langle\mathcal{O}_k^\star\rangle
$$

直觉上，普通梯度下降只看能量下降方向，而 SR 用 \(S\) 近似变分流形上的自然度量，减少参数化方式对优化路径的影响。论文使用对角正则化或伪逆处理 \(S\) 的病态问题。

时间演化部分把参数设为时间依赖 \(\mathcal{W}(t)\)，用 Dirac-Frenkel 变分原理最小化变分态和 Schrödinger 精确演化之间的残差：

$$
R(t;\dot{\mathcal{W}}(t))=
\mathrm{dist}\left(
\partial_t\Psi(\mathcal{W}(t)),
-i\mathcal{H}\Psi
\right)
$$

最小化后得到：

$$
\dot{\mathcal{W}}(t)=-iS^{-1}(t)F(t)
$$

这就是 t-VMC 的参数运动方程。对量子淬火等非平衡动力学，NQS 只沿变分流形积分参数，而不显式存储指数维波函数。论文在 TFI 和 AFH 模型中展示：随着 \(\alpha\) 增大，基态能量误差和时间演化残差系统性下降；在二维 Heisenberg 上，NQS 可达到或超过当时若干张量网络变分态的精度。

与 MPS/PEPS 等张量网络相比，NQS 的重要区别是非局域性。MPS 在一维非常强，但二维或长程纠缠时需要更高 bond dimension；RBM 的隐藏单元可以连接任意可见自旋，因此一个隐藏变量就能编码跨距离关联。这也是 NQS 后续发展成深度 NQS、费米子 NQS、自回归采样和神经网络量子 Monte Carlo 的原因。

#### 🧪 练习题
```yaml
question: "Carleo 和 Troyer 的 NQS 中，隐藏单元密度 alpha=M/N 的主要作用是什么？"
options:
  - "控制 RBM 表示能力和变分精度，alpha 越大通常越能表达复杂关联"
  - "决定 Hamiltonian 中自旋的物理维度"
  - "把复值波函数强制变成实值概率分布"
  - "消除 Metropolis-Hastings 采样步骤"
answer: 0
explain: "alpha 是隐藏单元数相对可见自旋数的比例，类似可调容量参数；增加 alpha 可提供更多非局域关联通道，但计算成本也会上升。"
```

### PDE-Net

```yaml
id: pde_net
num: 3
name: PDE-Net
full_name: 偏微分方程网络 (PDE-Net)
year: '2018'
org: 北京大学
parent: —
paper_url: http://proceedings.mlr.press/v80/long18a.html
project_url: ''
category: pde_solving
motivation: 卷积矩约束模拟微分算子
```

#### 📝 一句话总结
PDE-Net 提出用受矩约束的卷积滤波器学习空间微分算子，并用点式神经网络学习未知非线性响应 \(F\)，从而同时完成 PDE 系统的时间预测和隐含控制方程发现。

#### 🎯 核心要点
- **目标问题**：从离散观测序列中学习一般形式的二维演化 PDE \(u_t = F(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy},\ldots)\)
- **核心结构**：一个 \(\delta t\)-block 对应一次前向 Euler 时间推进，先用卷积得到各阶导数候选，再用共享的点式网络近似非线性响应函数
- **可解释滤波器**：用滤波器的 moment matrix / sum rules 约束卷积核，使指定卷积核近似 \(D_{10},D_{01},D_{20},D_{11},D_{02}\) 等微分算子
- **长时稳定性**：将多个共享参数的 \(\delta t\)-block 堆叠为 PDE-Net，用多步预测损失约束误差累积
- **训练策略**：先用 frozen filters 热启动响应函数，再逐层增加 block 数量训练，并逐步释放滤波器到矩约束集合内学习
- **可发现性**：训练后查看滤波器对应导数项与点式网络/多项式响应，可恢复哪些微分项进入了控制方程
- **实验场景**：在线性变系数 convection-diffusion 方程和带非线性源项的 convection-diffusion 方程上，展示了噪声环境下的预测与方程识别能力

#### 🔬 深入细节
##### 可访问来源与核心示意图

论文正式页面是 PMLR: http://proceedings.mlr.press/v80/long18a.html；图像与公式解读使用可公开访问的 ar5iv HTML 版本: https://ar5iv.labs.arxiv.org/html/1710.09668。

![PDE-Net 单个 delta t block](https://ar5iv.labs.arxiv.org/html/1710.09668/assets/f1.jpg)
*图：一个 \(\delta t\)-block。输入场 \(u\) 经过多个卷积算子 \(D_{ij}\) 得到导数候选，随后由点式网络近似 \(F\)，最后用 Euler 形式得到下一时刻预测。*

![PDE-Net 多步堆叠结构](https://ar5iv.labs.arxiv.org/html/1710.09668/assets/f2.jpg)
*图：PDE-Net 将多个共享参数的 \(\delta t\)-block 串联，用多步误差训练来提高长期预测稳定性。*

##### 算法伪代码

```python
# PDE-Net 训练伪代码
# data[s][j] 表示第 s 条轨迹在第 j 个时间点的场 u_j

initialize_filters_as_frozen_finite_differences()
initialize_pointwise_network_F()

# warm-up: 固定导数滤波器，只训练非线性响应 F
for step in range(warmup_steps):
    u0, u1 = sample_one_step_pairs(data)
    derivs = {key: conv(filter[key], u0) for key in derivative_keys}
    u_pred = conv(avg_filter, u0) + dt * F(x_grid, y_grid, derivs)
    loss = mean_squared_error(u_pred, u1)
    update(F.parameters(), loss)

# layer-wise training: 逐步增加 block 数量
release_filters_with_moment_constraints()
for n_blocks in range(1, max_blocks + 1):
    for step in range(train_steps_per_depth):
        u0, target = sample_n_step_pairs(data, n_blocks)
        u = u0
        for _ in range(n_blocks):
            derivs = {}
            for key in derivative_keys:
                # 每个 filter 在更新后都投影/参数化到指定 moment 约束集合内
                derivs[key] = conv(constrained_filter[key], u)
            response = F(x_grid, y_grid, derivs)
            u = conv(avg_filter, u) + dt * response
        loss = mean_squared_error(u, target)
        update(shared_filter_parameters + F.parameters(), loss)

return constrained_filters, F
```

##### 动机：为什么不是直接做黑盒预测

很多 PDE 发现方法会先固定一组有限差分模板，再对候选导数库做稀疏回归；这类方法的缺点是导数近似和候选库一开始就被写死，噪声或网格误差会直接进入发现过程。另一类 physics-informed 方法通常假设 PDE 的解析形式已知，只学习少数参数。PDE-Net 试图放宽这两个限制：它不预先固定微分算子的离散模板，也不要求非线性响应函数的显式形式完全给定。

论文考虑的基本对象是二维演化 PDE：

$$
u_t(t,x,y) =
F(x,y,u,u_x,u_y,u_{xx},u_{xy},u_{yy},\ldots).
$$

PDE-Net 的关键选择是把一次时间推进写成神经网络层。一个 \(\delta t\)-block 近似前向 Euler 离散：

$$
\tilde{u}_{t+\delta t}
= D_{00}u_t
+ \delta t \cdot
F_\theta(x,y,D_{00}u_t,D_{10}u_t,D_{01}u_t,D_{20}u_t,\ldots).
$$

其中 \(D_{ij}\) 不是手工有限差分，而是带约束的卷积算子；\(D_{00}\) 是平均/平滑算子，用来替代直接 identity，提升数值稳定性；\(F_\theta\) 是对每个空间位置共享参数的点式网络，因此它学习的是局部响应函数，而不是记忆整张图像。

##### 卷积核如何变成微分算子

PDE-Net 最重要的数学设计是 moment matrix。对一个二维卷积核 \(q[k,\ell]\)，定义其 \((i,j)\)-阶矩：

$$
M_{ij}(q)=\sum_{k,\ell} k^i \ell^j q[k,\ell].
$$

如果要让 \(q\) 近似某个微分算子，就对低阶矩施加约束。例如，近似 \(\partial_x\) 的卷积核应让常数项矩为 0，并让一阶 \(x\) 方向矩为非零尺度；近似 \(\partial_{xx}\) 的卷积核则需要一阶矩消失、二阶 \(x\) 方向矩匹配目标尺度。论文将这一点和 wavelet sum rules 联系起来：滤波器的 sum rules 阶数决定它近似微分算子的阶数，total sum rules 决定近似精度。

> 💡 关键：PDE-Net 的滤波器不是任意 CNN 卷积核，而是在“能解释成微分算子”的可行域内学习。这样既保留了数据驱动适配网格与噪声的能力，也使训练后的算子具有物理可读性。

在实现上，滤波器参数可以被拆分为被固定的矩约束部分和可学习的自由部分。固定部分保证“这是 \(u_x\) 或 \(u_{xx}\) 这样的导数近似”，自由部分吸收高阶截断误差、网格误差和噪声影响。

##### 多步训练与损失函数

单个 \(\delta t\)-block 只保证一步预测好，但 PDE 解算最关心长时间滚动时误差是否爆炸。因此 PDE-Net 将同一组参数反复使用 \(n\) 次，并直接优化从 \(u_j\) 到 \(u_{j+n}\) 的误差：

$$
\mathcal{L}(\Theta)
=
\frac{1}{|\mathcal{B}|}
\sum_{(s,j)\in \mathcal{B}}
\left\|
\mathcal{N}_{\Theta}^{(n)}(u^{(s)}_j)
-u^{(s)}_{j+n}
\right\|_2^2.
$$

这里 \(\mathcal{N}_{\Theta}^{(n)}\) 表示共享参数的 \(\delta t\)-block 连续作用 \(n\) 次。共享参数有两层含义：一方面它符合“同一个 PDE 在所有时间步上不变”的物理假设；另一方面它减少参数量，使模型更像一个可迭代的数值格式，而不是普通深层 CNN。

##### 方程发现如何读出来

训练结束后，PDE-Net 产生两类可解释对象：

- 卷积核约束告诉我们每个通道对应哪个微分候选项，例如 \(u_x,u_y,u_{xx},u_{xy}\)
- 点式响应 \(F_\theta\) 告诉我们这些候选项如何组合成 \(u_t\)

如果 \(F_\theta\) 使用多项式或可解释回归器，方程可以更直接地符号化；如果使用小型 MLP，也可以通过对输入导数项的敏感性分析、稀疏化或后处理回归来提取主要项。论文中的线性变系数 convection-diffusion 例子展示了这种读法：网络不仅预测 \(u\) 的未来状态，还能恢复变系数扩散/对流结构。

##### 与传统方法的区别

| 方法 | 微分算子 | 非线性响应 \(F\) | 长时预测 | 可解释性 |
|------|----------|------------------|----------|----------|
| 稀疏回归 PDE 发现 | 固定有限差分模板 | 从预定义字典稀疏选择 | 通常不是训练核心 | 强，但依赖字典 |
| 普通 CNN/ResNet | 黑盒卷积 | 黑盒 | 可训练 | 弱 |
| PINN 类方法 | 由已知 PDE 公式给定 | 形式通常已知 | 通过残差约束 | 学参数为主 |
| PDE-Net | 受矩约束的可学习卷积 | 点式网络/回归器学习 | 多个 block 累积训练 | 导数通道和响应函数均可读 |

PDE-Net 的贡献不只是“用 CNN 预测 PDE”，而是把数值微分、ResNet 式时间推进和方程发现放进同一个可训练架构中。它的局限也来自这里：候选最高导数阶数、网格形式、时间离散方式仍需人为设定；如果真实系统不是局部 PDE，或观测变量不足以闭合动力学，模型可能会给出预测可用但物理解释不可靠的方程。

#### 🧪 练习题
```yaml
question: "PDE-Net 为什么要对卷积滤波器施加 moment matrix / sum rules 约束？"
options:
  - "为了减少卷积层的显存占用，使网络可以堆得更深"
  - "为了让卷积核可解释为特定微分算子的离散近似，同时保留可学习的截断误差修正能力"
  - "为了把非线性响应函数 F 固定成一个已知多项式"
  - "为了避免使用任何时间离散格式"
answer: 1
explain: "moment/sum-rules 约束把卷积核限制在可解释为导数近似的集合内，这是 PDE-Net 能同时预测动力学和识别控制方程的关键。"
```

### Neural ODE

```yaml
id: neural_ode
num: 4
name: Neural ODE
full_name: 神经常微分方程 (Neural Ordinary Differential Equations)
year: '2018'
org: 多伦多大学
parent: —
paper_url: https://arxiv.org/abs/1806.07366
project_url: ''
category: physics_constrained
motivation: 网络层视为连续时间演化
```

#### 📝 一句话总结
Neural ODE 将 ResNet 的离散层更新推广为连续时间微分方程 \(\frac{dz}{dt}=f_\theta(z,t)\)，用黑盒 ODE solver 完成前向传播，并用伴随敏感性方法以近似常数内存训练连续深度模型。

#### 🎯 核心要点
- **连续深度建模**：把有限层网络 \(h_{k+1}=h_k+f(h_k,\theta_k)\) 的极限写成 ODE 初值问题 \(z(t_1)=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_1)\)
- **黑盒求解器前向传播**：模型输出由自适应数值积分器计算，函数评估次数可随样本复杂度和误差容忍度变化
- **伴随敏感性训练**：反向传播时不存储全部 solver 内部状态，而是从终点向起点积分 augmented dynamics，恢复对状态、时间和参数的梯度
- **连续正规化流 CNF**：利用瞬时变量变换公式 \(\frac{d\log p(z(t))}{dt}=-\operatorname{Tr}(\partial f/\partial z)\)，避免离散 normalizing flow 中昂贵的 Jacobian determinant
- **不规则时间序列**：用 latent ODE 在连续时间潜空间中演化，天然处理任意时间戳观测
- **可调精度/速度**：同一个训练后模型可以通过 ODE solver tolerance 在推理时权衡计算量与数值误差
- **主要风险**：求解器误差、刚性动力学、反向积分不稳定和函数评估次数过多，会使训练成本不一定低于普通深层网络

#### 🔬 深入细节
##### 可访问来源与核心示意图

论文 arXiv 页面: https://arxiv.org/abs/1806.07366；可访问 HTML 与图像来源: https://ar5iv.labs.arxiv.org/html/1806.07366。

![残差网络的离散变换](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x1.png)
![ODE 网络的连续变换](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x2.png)
*图：左侧 ResNet 定义有限个离散变换；右侧 Neural ODE 定义连续向量场，solver 在需要的位置评估 \(f_\theta\) 来推进状态。*

![Neural ODE 伴随状态反向传播示意](https://ar5iv.labs.arxiv.org/html/1806.07366/assets/x3.png)
*图：反向传播时从终点向起点积分 adjoint state，并在观测/损失时间点注入梯度。*

##### 算法伪代码

```python
# Neural ODE forward + adjoint backward 伪代码

def forward(z0, t0, t1, theta, rtol, atol):
    # z(t1) = z(t0) + ∫ f_theta(z(t), t) dt
    z1 = ode_solve(lambda z, t: f_theta(z, t, theta),
                   z0, t0, t1, rtol=rtol, atol=atol)
    return z1

def backward(z1, dL_dz1, t0, t1, theta):
    # a(t) = ∂L / ∂z(t)
    # augmented state stores z, adjoint a, and parameter gradient accumulator g
    aug_T = (z1, dL_dz1, zeros_like(theta))

    def augmented_dynamics(aug, t):
        z, a, g = aug
        f = f_theta(z, t, theta)

        # vector-Jacobian products, implemented by autograd
        a_f_z, a_f_theta = vjp(f, (z, theta), vector=a)

        dz_dt = f
        da_dt = -a_f_z
        dg_dt = -a_f_theta
        return (dz_dt, da_dt, dg_dt)

    # integrate backward from t1 to t0
    z0, a0, grad_theta = ode_solve(augmented_dynamics, aug_T, t1, t0)
    return a0, grad_theta
```

##### 从 ResNet 到连续时间动力系统

ResNet 的基本层更新可以写作：

$$
h_{k+1}=h_k+f(h_k,\theta_k).
$$

如果把层号视为时间，把步长取得更小，就得到连续极限：

$$
\frac{dz(t)}{dt}=f_\theta(z(t),t), \qquad z(t_0)=z_0.
$$

前向传播不再是显式执行第 1 层、第 2 层、第 3 层，而是求解初值问题：

$$
z(t_1)=z(t_0)+\int_{t_0}^{t_1} f_\theta(z(t),t)\,dt
=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_1).
$$

这带来一个重要抽象：神经网络模块变成“可微分的连续时间变换”。网络深度不再是固定整数，而由 solver 根据误差容忍度自动决定需要多少次函数评估。对简单样本，solver 可以少评估；对复杂或快速变化样本，solver 会增加评估点。

##### 伴随敏感性方法

直接对 ODE solver 的每一步反向传播会保存大量中间状态，内存随函数评估次数增长。Neural ODE 采用 adjoint sensitivity method，定义伴随变量：

$$
a(t)=\frac{\partial \mathcal{L}}{\partial z(t)}.
$$

伴随变量满足反向时间 ODE：

$$
\frac{da(t)}{dt}
=
-a(t)^\top
\frac{\partial f_\theta(z(t),t)}{\partial z(t)}.
$$

同时，参数梯度可以通过另一个累积状态得到：

$$
\frac{dg_\theta(t)}{dt}
=
-a(t)^\top
\frac{\partial f_\theta(z(t),t)}{\partial \theta}.
$$

实际反向传播时，把 \((z(t),a(t),g_\theta(t))\) 作为 augmented state，从 \(t_1\) 积分回 \(t_0\)。这样不需要保存前向求解器内部的每一步，只需保存终点、时间点和参数。

> 💡 关键：伴随法不是“没有反向传播”，而是把反向传播本身也写成一个 ODE 初值问题。它用额外的函数评估换取显存节省。

##### 连续正规化流：为什么更容易算密度

普通 normalizing flow 需要离散可逆层，并在每层计算 Jacobian determinant。Neural ODE 的连续可逆变换让 log-density 的变化率变成 trace：

$$
\frac{d \log p(z(t))}{dt}
=
-\operatorname{Tr}
\left(
\frac{\partial f_\theta(z(t),t)}{\partial z(t)}
\right).
$$

因此可以把状态和 log-density 一起积分：

$$
\frac{d}{dt}
\begin{bmatrix}
z(t) \\
\log p(z(t))
\end{bmatrix}
=
\begin{bmatrix}
f_\theta(z(t),t) \\
-\operatorname{Tr}(\partial f_\theta/\partial z)
\end{bmatrix}.
$$

这就是 continuous normalizing flow (CNF) 的核心。它不需要设计特殊三角 Jacobian 或 coupling layer 来降低 determinant 成本，模型容量可以通过向量场宽度、时间依赖和隐藏层结构提升。不过 trace 计算在高维时仍然昂贵，后续 FFJORD 等工作进一步引入 Hutchinson trace estimator 来近似这一项。

##### 不规则时间序列与 latent ODE

在时间序列任务中，传统 RNN 往往假设离散步长规则，或者需要为缺失时间做特殊插值。Neural ODE 的连续时间形式可直接在任意时间戳上求值：

$$
z(t_i)=\operatorname{ODESolve}(z(t_0),f_\theta,t_0,t_i).
$$

论文中的 latent ODE 模型用 recognition network 从观测序列推断初始潜变量 \(z(t_0)\)，再用 ODE 在潜空间中连续演化，最后用 decoder 生成不同时间点的观测。这使模型结构与真实观测时间分辨率解耦，适合医疗记录、传感器日志等不规则采样数据。

##### 与普通深层网络的区别

| 维度 | ResNet / 离散深层网络 | Neural ODE |
|------|------------------------|------------|
| 深度 | 固定层数 | 连续时间区间与 solver 评估次数 |
| 前向计算 | 顺序执行层 | 数值积分 ODE |
| 内存 | 保存中间激活 | 伴随法可近似常数内存 |
| 误差控制 | 架构固定，无显式求解误差 | solver tolerance 控制局部误差 |
| 变换性质 | 未必可逆 | ODE flow 在满足条件时可逆 |
| 主要成本 | 层数和宽度 | 函数评估次数、刚性和误差容忍度 |

Neural ODE 的思想非常适合物理建模语境，因为很多系统本来就由连续时间动力学描述。但它不是所有网络的直接替代品：如果学习到的向量场很刚性，solver 会被迫使用极小步长；如果反向积分轨迹和前向数值轨迹不一致，梯度会有偏差；如果任务本身强依赖离散事件，连续流的归纳偏置也可能不合适。

#### 🧪 练习题
```yaml
question: "Neural ODE 中 adjoint sensitivity method 的主要作用是什么？"
options:
  - "把所有 ODE 求解都替换成 Euler 显式格式"
  - "通过反向积分伴随状态来计算梯度，避免保存前向求解器的全部中间状态"
  - "保证学习到的动力系统一定满足能量守恒"
  - "让 normalizing flow 的输出维度可以随时间改变"
answer: 1
explain: "伴随法把反向传播写成 augmented ODE，从终点积分回起点来恢复状态梯度和参数梯度，因此能以额外计算换取较低内存。"
```

### PINN

```yaml
id: pinn
num: 5
name: PINN
full_name: 物理信息神经网络 (Physics-Informed Neural Networks)
year: '2019'
org: 布朗大学
parent: —
paper_url: https://doi.org/10.1016/j.jcp.2018.10.045
project_url: ''
category: pde_solving
motivation: 将PDE残差嵌入Loss实现无网格求解
```

#### 📝 一句话总结
PINN 用神经网络 \(u_\theta(t,x)\) 表示 PDE 解，并把由自动微分计算出的 PDE 残差 \(f_\theta\) 加入训练损失，使少量观测数据、边界/初始条件和物理方程约束共同驱动无网格求解与参数反演。

#### 🎯 核心要点
- **统一框架**：将 forward problem 的解函数逼近和 inverse problem 的未知物理参数识别统一写成神经网络优化问题
- **物理残差损失**：对一般 PDE \(u_t+\mathcal{N}[u;\lambda]=0\)，定义 \(f_\theta=u_{\theta,t}+\mathcal{N}[u_\theta;\lambda]\)，并在 collocation points 上最小化 \(f_\theta\)
- **自动微分**：时间导数、空间导数和高阶导数都由自动微分计算，不需要手工网格差分模板
- **数据效率**：损失同时包含初始/边界/稀疏观测误差 \(MSE_u\) 和 PDE 残差误差 \(MSE_f\)，使少量数据也能约束整个时空域
- **连续时间模型**：直接在 \((t,x)\) 上训练 \(u_\theta(t,x)\)，适合给定连续 PDE 形式并采样大量残差点
- **离散时间模型**：用 Runge-Kutta 等时间推进结构处理时间快照较少但时间跨度较大的场景
- **代表实验**：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、Navier-Stokes 等 forward/inverse 示例

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 DOI 指向 Journal of Computational Physics 版本；为了获得可直接访问的图示和方法文本，这里参考作者公开 arXiv/html 版本: https://ar5iv.labs.arxiv.org/html/1711.10561，以及项目页 https://github.com/maziarraissi/PINNs。

![PINN 求解 Burgers 方程示意](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png)
*图：PINN 在 Burgers 方程上利用少量初始/边界数据点和 10,000 个 collocation points 学习全时空解；下方对比了多个时间截面的 exact solution 与 prediction。*

##### 算法伪代码

```python
# 连续时间 PINN 训练伪代码

def neural_solution(t, x, theta):
    # MLP 输入时空坐标，输出 PDE 解 u_theta(t, x)
    return mlp(concat(t, x), theta)

def pde_residual(t, x, theta, lambda_params):
    u = neural_solution(t, x, theta)
    u_t = grad(u, t)
    u_x = grad(u, x)
    u_xx = grad(u_x, x)

    # 以 Burgers 方程为例: u_t + u u_x - nu u_xx = 0
    nu = lambda_params["nu"]
    f = u_t + u * u_x - nu * u_xx
    return f

for step in range(num_steps):
    # supervised points: 初始条件、边界条件或少量传感器观测
    t_u, x_u, y_u = sample_data_points()
    u_pred = neural_solution(t_u, x_u, theta)
    mse_u = mean((u_pred - y_u) ** 2)

    # collocation points: 不需要标签，只要求满足 PDE
    t_f, x_f = sample_collocation_points()
    f_pred = pde_residual(t_f, x_f, theta, lambda_params)
    mse_f = mean(f_pred ** 2)

    loss = mse_u + mse_f
    update(theta + lambda_params, loss)  # inverse problem 时 lambda_params 也可学习
```

##### 基本数学形式

PINN 从一般非线性 PDE 出发：

$$
u_t + \mathcal{N}[u;\lambda]=0,\qquad x\in\Omega,\ t\in[0,T].
$$

用神经网络 \(u_\theta(t,x)\) 作为解函数的连续近似，然后通过自动微分构造物理残差：

$$
f_\theta(t,x)
=
\frac{\partial u_\theta}{\partial t}(t,x)
+\mathcal{N}[u_\theta;\lambda](t,x).
$$

连续时间 PINN 的核心损失是：

$$
\mathcal{L}(\theta,\lambda)
=MSE_u+MSE_f,
$$

其中

$$
MSE_u=
\frac{1}{N_u}
\sum_{i=1}^{N_u}
\left|
u_\theta(t_u^i,x_u^i)-u^i
\right|^2,
$$

$$
MSE_f=
\frac{1}{N_f}
\sum_{i=1}^{N_f}
\left|
f_\theta(t_f^i,x_f^i)
\right|^2.
$$

\(MSE_u\) 负责贴合初始条件、边界条件或传感器数据；\(MSE_f\) 负责让网络输出在无标签 collocation points 上满足 PDE。因为 \(f_\theta\) 是由 \(u_\theta\) 的导数构造出来的，整个训练目标对网络参数可微。

##### 以 Burgers 方程为例

论文的经典示例是一维 viscous Burgers 方程：

$$
u_t + u u_x - \frac{0.01}{\pi}u_{xx}=0.
$$

PINN 用 \(u_\theta(t,x)\) 近似解，并定义：

$$
f_\theta
=
u_{\theta,t}
+u_\theta u_{\theta,x}
-\frac{0.01}{\pi}u_{\theta,xx}.
$$

训练数据只包含少量初始/边界点，但在时空域内部采样大量 collocation points 来约束 \(f_\theta \approx 0\)。这就是“物理信息”的来源：collocation points 没有真实 \(u\) 标签，却通过 PDE 残差提供训练信号。

> 💡 关键：PINN 的无网格并不是“没有坐标点”，而是不需要传统数值解法那种固定网格拓扑和离散算子。它仍然需要在连续域中采样监督点与残差点。

##### Forward problem 与 inverse problem

在 forward problem 中，\(\lambda\) 和 PDE 形式已知，训练目标是求解 \(u(t,x)\)。在 inverse problem 中，部分物理参数未知，例如 Burgers 方程中的粘性系数或 Navier-Stokes 方程中的雷诺相关参数；此时把 \(\lambda\) 也作为可学习变量，和 \(\theta\) 一起优化：

$$
(\theta^\star,\lambda^\star)
=
\arg\min_{\theta,\lambda}
\left(MSE_u(\theta)+MSE_f(\theta,\lambda)\right).
$$

这让 PINN 能在观测稀疏、噪声存在时做参数反演。直觉上，数据项告诉模型“观测到的解长什么样”，残差项告诉模型“只有某些参数值才能让这些观测符合 PDE”。

##### 连续时间与离散时间 PINN

连续时间 PINN 直接把 \((t,x)\) 输入网络，适合在整个时空域采样 collocation points。它简单通用，但当时间跨度很长、动力学很复杂或 PDE 解具有尖锐层时，优化会变难。

论文还讨论了离散时间模型：把时间推进写入 Runge-Kutta 结构，用少量时间快照训练从 \(t_n\) 到 \(t_{n+1}\) 的映射。离散时间形式的好处是可以处理大时间步和快照数据，缺点是结构更依赖所选时间积分格式。

##### 与传统数值方法和普通神经网络的区别

| 方法 | 解的表示 | PDE 使用方式 | 数据需求 | 主要限制 |
|------|----------|--------------|----------|----------|
| 有限差分/有限元 | 网格节点值 | 离散方程直接求解 | 不需要训练数据 | 依赖网格、复杂几何和高维问题成本高 |
| 普通监督神经网络 | \(u_\theta(t,x)\) | 不使用或只隐式使用 | 需要大量标签 | 容易违反物理方程 |
| PINN | \(u_\theta(t,x)\) | PDE 残差作为损失项 | 少量标签 + 大量残差点 | 非凸优化、损失权重、尺度和刚性问题敏感 |

PINN 的影响力来自它把 PDE 约束变成了深度学习训练目标的一部分，而不是在训练后检查物理一致性。但它也不是传统数值方法的通用替代品。对于多尺度、湍流、高频或长时间混沌系统，标准 PINN 往往会遇到梯度病态、谱偏置和不同损失项权重难平衡的问题；后续 XPINN、Causal PINN、自适应采样和 operator learning 方法都在解决这些瓶颈。

#### 🧪 练习题
```yaml
question: "标准连续时间 PINN 中 collocation points 的主要作用是什么？"
options:
  - "提供真实解标签，使网络做普通监督学习"
  - "在无标签时空点上计算 PDE 残差，并把物理方程作为损失约束"
  - "替代自动微分，手工计算有限差分导数"
  - "只用于可视化训练后的预测结果"
answer: 1
explain: "collocation points 通常没有真实 u 标签；它们用于评估 f_theta 是否接近 0，从而把 PDE 结构注入损失函数。"
```

### HNN

```yaml
id: hnn
num: 6
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: '2019'
org: Google
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html
project_url: ''
category: physics_constrained
motivation: 学习哈密顿量确保能量守恒
```

#### 📝 一句话总结
HNN 提出用神经网络直接参数化物理系统的哈密顿量 \(H_\theta(\mathbf{q}, \mathbf{p})\)，并通过自动微分强制输出满足哈密顿正则方程（辛结构），从而在不显式编码能量守恒规则的前提下，让网络自动学会保持系统总能量——在弹簧、单摆、两体问题乃至像素级观测等任务上，能量守恒精度比普通基线网络高出数个数量级。

#### 🎯 核心要点
- **核心思想**：不直接拟合 \(\dot{\mathbf{q}}, \dot{\mathbf{p}}\)，而是让 NN 输出标量哈密顿量 \(H_\theta\)，再通过辛梯度 \((\partial H/\partial \mathbf{p},\; -\partial H/\partial \mathbf{q})\) 得到动力学，结构性地保证能量守恒
- **损失函数**：直接监督哈密顿方程的左右两侧之差（Eq 3），无需能量标签
- **5 个实验任务**：理想弹簧（Task 1）、理想单摆（Task 2）、真实单摆视频数据（Task 3）、两体引力问题（Task 4）、像素级单摆（Task 5）
- **像素扩展**：Autoencoder + HNN 联合训练，辅助损失（Eq 7）使潜空间的后半部分 \(\mathbf{z_p}\) 近似 \(\mathbf{z_q}\) 的时间导数，从而满足正则坐标条件
- **定量结果**：在所有任务上，HNN 的能量 MSE 比基线低 1–3 个数量级（Table 1），而训练/测试损失与基线相当
- **网络架构**：极简 MLP（3 层全连接，200 隐藏单元，tanh 激活），训练使用 Adam（lr = 1e-3）

#### 🔬 深入细节
##### 核心架构示意图

![HNN 核心思想对比图](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png)
*图 1：左侧为基线方法——直接用 NN 拟合状态导数 \((\dot{q}, \dot{p})\)；右侧为 HNN——NN 输出标量 \(H_\theta\)，再通过辛梯度（自动微分）得到动力学。HNN 的相空间轨迹保持在等能量面上（右下角），而基线轨迹逐渐偏离（左下角）。*

##### 算法伪代码

```python
# HNN 训练与推理伪代码
import torch
import torch.autograd as autograd

# === 模型定义 ===
class HNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim=200):
        super().__init__()
        self.net = torch.nn.Sequential(
            torch.nn.Linear(input_dim, hidden_dim),  # (q,p) → hidden
            torch.nn.Tanh(),
            torch.nn.Linear(hidden_dim, hidden_dim),
            torch.nn.Tanh(),
            torch.nn.Linear(hidden_dim, 1)            # → 标量 H
        )

    def forward(self, q, p):
        x = torch.cat([q, p], dim=-1)
        return self.net(x)  # 输出标量哈密顿量

    def time_derivative(self, q, p):
        """通过辛梯度计算 dq/dt, dp/dt"""
        q.requires_grad_(True)
        p.requires_grad_(True)
        H = self.forward(q, p)
        dH_dq = autograd.grad(H.sum(), q, create_graph=True)[0]
        dH_dp = autograd.grad(H.sum(), p, create_graph=True)[0]
        dq_dt = dH_dp       # Hamilton 方程: dq/dt = ∂H/∂p
        dp_dt = -dH_dq      # Hamilton 方程: dp/dt = -∂H/∂q
        return dq_dt, dp_dt

# === 训练循环 ===
model = HNN(input_dim=2)  # 1D 系统: q, p 各 1 维
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

for step in range(2000):
    # 从数据中采样 (q, p, dq/dt_true, dp/dt_true)
    q, p, dq_true, dp_true = sample_batch(data, batch_size=200)
    dq_pred, dp_pred = model.time_derivative(q, p)
    # 损失: 预测导数 vs 真实导数 (Eq 3)
    loss = ((dq_pred - dq_true)**2 + (dp_pred - dp_true)**2).mean()
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# === 推理: 用 RK4 积分生成轨迹 ===
def rk4_step(model, q, p, dt):
    def f(q, p):
        return model.time_derivative(q, p)
    k1q, k1p = f(q, p)
    k2q, k2p = f(q + dt/2*k1q, p + dt/2*k1p)
    k3q, k3p = f(q + dt/2*k2q, p + dt/2*k2p)
    k4q, k4p = f(q + dt*k3q, p + dt*k3p)
    q_new = q + dt/6 * (k1q + 2*k2q + 2*k3q + k4q)
    p_new = p + dt/6 * (k1p + 2*k2p + 2*k3p + k4p)
    return q_new, p_new
```

##### 动机与背景

物理系统的动力学建模是科学计算的核心任务。传统的神经网络方法（如 Neural ODE）直接用网络拟合状态的时间导数 \(\dot{\mathbf{x}} = f_\theta(\mathbf{x})\)，虽然灵活，但**完全忽略了物理系统的守恒律**。对于保守力学系统，总能量 \(H(\mathbf{q}, \mathbf{p})\) 是一个运动常数——沿真实轨迹恒定不变。普通 NN 无法保证这一点，导致长时间积分时能量漂移、轨迹发散。

> 💡 **关键洞察**：哈密顿力学提供了一个天然的归纳偏置——只要动力学由某个标量函数 \(H\) 的辛梯度给出，能量就自动守恒。HNN 的核心贡献就是将这一结构性约束嵌入神经网络。

##### 哈密顿力学基础

对于一个具有广义坐标 \(\mathbf{q}\) 和共轭动量 \(\mathbf{p}\) 的力学系统，哈密顿量 \(H(\mathbf{q}, \mathbf{p})\) 是系统的总能量。**哈密顿正则方程**给出了系统的时间演化：

$$\frac{d\mathbf{q}}{dt} = \frac{\partial H}{\partial \mathbf{p}}, \qquad \frac{d\mathbf{p}}{dt} = -\frac{\partial H}{\partial \mathbf{q}} \tag{1}$$

这组方程具有**辛结构**（symplectic structure），可以紧凑地写为：

$$\frac{d}{dt}\begin{pmatrix} \mathbf{q} \\ \mathbf{p} \end{pmatrix} = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix} \nabla_{(\mathbf{q},\mathbf{p})} H \tag{2}$$

其中 \(J = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}\) 是辛矩阵。辛结构的直接推论是：

$$\frac{dH}{dt} = \nabla H \cdot \dot{\mathbf{x}} = \nabla H \cdot J \nabla H = 0$$

即 **\(H\) 沿轨迹恒为常数**——能量自动守恒，无需额外约束。

##### HNN 的核心机制

HNN 的设计极为优雅：

1. **参数化哈密顿量**：用一个神经网络 \(H_\theta: \mathbb{R}^{2n} \to \mathbb{R}\) 将相空间坐标 \((\mathbf{q}, \mathbf{p})\) 映射为标量。网络不直接预测动力学，而是预测一个"能量景观"。

2. **辛梯度提取动力学**：利用自动微分计算 \(\partial H_\theta / \partial \mathbf{p}\) 和 \(\partial H_\theta / \partial \mathbf{q}\)，再通过哈密顿方程得到 \(\dot{\mathbf{q}}\) 和 \(\dot{\mathbf{p}}\)。这一步是 HNN 的灵魂——它将物理结构硬编码进了计算图。

3. **损失函数（Eq 3）**：

$$\mathcal{L}_{\text{HNN}} = \left\| \frac{\partial H_\theta}{\partial \mathbf{p}} - \frac{d\mathbf{q}}{dt} \right\|^2 + \left\| \frac{\partial H_\theta}{\partial \mathbf{q}} + \frac{d\mathbf{p}}{dt} \right\|^2 \tag{3}$$

> ⚠️ **注意**：训练数据只需要状态-导数对 \((\mathbf{q}, \mathbf{p}, \dot{\mathbf{q}}, \dot{\mathbf{p}})\)，**不需要能量标签**。能量守恒是结构的自然结果，而非显式监督的目标。

##### 从坐标到像素：Autoencoder + HNN

论文最具创新性的实验是 **Task 5: Pixel Pendulum**——直接从 28×28 灰度图像序列中学习哈密顿动力学。

![像素摆实验结果](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x4.png)
*图 4：像素摆实验。HNN 在潜空间中保持能量守恒，预测轨迹数百帧后仍接近真实值；基线模型迅速衰减到低能态。*

方法设计：
- **输入**：连续两帧 28×28 图像拼接（batch × 28 × 28 × 2），双帧使速度可观测
- **Autoencoder**：4 层全连接（200 隐藏单元，ReLU + 残差连接），潜空间维度为 2（\(\mathbf{z} = (\mathbf{z_q}, \mathbf{z_p})\)）
- **HNN**：在潜空间上运行，架构与坐标实验相同
- **辅助损失（Eq 7）**：

$$\mathcal{L}_{CC} = \left\| \mathbf{z}^t_{\mathbf{p}} - (\mathbf{z}^t_{\mathbf{q}} - \mathbf{z}^{t+1}_{\mathbf{q}}) \right\|_2 \tag{7}$$

该损失鼓励 \(\mathbf{z_p}\) 近似 \(\dot{\mathbf{z}}_{\mathbf{q}}\)（有限差分），使潜空间具有正则坐标 \((\mathbf{q}, \mathbf{p})\) 的性质——这是哈密顿力学成立的前提条件。

总损失 = HNN 损失 + 自编码器重建损失（L2 像素损失）+ 辅助正则坐标损失。

##### 实验结果与对比

论文在 5 个任务上对比了 HNN 与基线（直接拟合导数的同架构 NN）：

| 任务 | 基线能量 MSE (×10³) | HNN 能量 MSE (×10³) | 提升倍数 |
|------|---------------------|---------------------|---------|
| 理想弹簧 | 170 ± 20 | **0.38 ± 0.1** | ~450× |
| 理想单摆 | 42 ± 10 | **25 ± 5** | ~1.7× |
| 真实单摆 | 390 ± 7 | **14 ± 5** | ~28× |
| 两体问题 | — | — | 约 10× |
| 像素单摆 | — | — | 数量级提升 |

> 💡 **关键发现**：HNN 与基线的训练/测试损失相当（两者拟合能力相似），但 HNN 在**能量守恒**指标上以压倒性优势胜出。这说明辛结构归纳偏置的价值不在于更好的拟合，而在于更好的**泛化和长期稳定性**。

##### 与传统方法的对比

| 特性 | 传统 NN (Neural ODE) | HNN |
|------|---------------------|-----|
| 输出 | 直接预测 \(\dot{\mathbf{q}}, \dot{\mathbf{p}}\) | 预测标量 \(H_\theta\)，辛梯度得动力学 |
| 能量守恒 | 无保证，长期漂移 | 结构性保证（精确到数值积分误差） |
| 物理先验 | 无 | 哈密顿辛结构 |
| 训练数据 | 状态-导数对 | 同样是状态-导数对（无需能量标签） |
| 长期积分 | 轨迹迅速发散 | 轨迹长期稳定 |
| 局限 | 灵活但不稳定 | 要求系统为保守系统（无耗散） |

##### 讨论与局限

- **正则坐标要求**：HNN 假设输入为正则坐标 \((\mathbf{q}, \mathbf{p})\)，对于像素等非正则输入需要额外的 Autoencoder 和辅助损失来学习正则表示
- **保守系统假设**：HNN 天然不能处理耗散系统（如有摩擦的系统），后续工作如 Dissipative HNN 对此进行了扩展
- **数值积分误差**：虽然 HNN 结构上保证 \(dH/dt = 0\)，但实际使用 RK4 等非辛积分器时仍有微小能量漂移；使用辛积分器（如 Leapfrog）可进一步改善
- **可扩展性**：论文在两体和三体问题上展示了扩展性，但更高维系统的效果有待验证

#### 🧪 练习题
```yaml
question: "HNN 相比直接拟合时间导数的基线网络，其核心优势来源于什么？"
options:
  - "使用了更深的网络架构和更多的训练数据"
  - "网络输出标量哈密顿量并通过辛梯度得到动力学，结构性地保证能量守恒"
  - "在损失函数中显式加入了能量守恒的惩罚项"
  - "使用了辛积分器（如 Leapfrog）替代 Runge-Kutta 进行时间积分"
answer: 1
explain: "HNN 的核心创新在于让 NN 输出标量 H 而非直接输出导数，再通过自动微分计算辛梯度得到动力学。由于辛结构的数学性质（dH/dt = ∇H · J∇H = 0），能量守恒是结构的自然结果，无需显式惩罚项或特殊积分器。"
```

### XPINNs

```yaml
id: xpinns
num: 7
name: XPINNs
full_name: 扩展PINN (Extended Physics-Informed Neural Networks)
year: '2020'
org: 布朗大学
parent: pinn
paper_url: https://doi.org/10.4208/cicp.OA-2020-0164
project_url: ''
category: pde_solving
motivation: 域分解策略支持复杂几何并行化
```

#### 📝 一句话总结
XPINNs 将 PINN 扩展为任意空间-时间域分解框架：每个子域训练一个独立的物理约束网络，并用接口处的解连续、PDE 残差连续等损失把子域拼接起来，从而解决单一 PINN 难以处理复杂几何、多尺度解和并行训练的问题。

#### 🎯 核心要点
- **任意空间-时间域分解**：相比只面向守恒律空间分解的 cPINN，XPINNs 可在空间、时间或空间-时间联合维度切分任意形状子域
- **每个子域一套网络**：子域 \(q\) 使用独立神经网络 \(u_{\theta_q}\)，可配置不同深度、宽度、激活函数、残差点数量和优化超参数
- **接口损失负责“缝合”**：在相邻子域接口上同时惩罚解到平均解的偏差 \(MSE_{uavg}\) 和 PDE 残差不连续 \(MSE_R\)
- **适用于通用 PDE**：接口残差连续由自动微分计算，不依赖守恒通量形式，因此可用于非守恒律、稳态/非稳态、正问题/反问题
- **天然支持并行化**：各子域的残差和数据损失可分布式计算，接口项只需要交换边界/接口点上的网络输出与残差
- **复杂区域与多尺度解更灵活**：复杂或陡峭解区域可用更深网络和更多残差点，平滑区域可用较小网络，减少单一 PINN 的容量浪费

#### 🔬 深入细节
##### 核心架构示意图

![XPINNs 子域网络与接口示意图](https://figures.semanticscholar.org/78f0649ee879d97e73d492eaf76d3f5dfc554ba0/8-Figure1-1.png)
*图：XPINNs 在每个子域内部使用 PINN 子网络，并在不规则子域接口上施加物理残差与解连续约束。原论文 DOI 页面部分内容受限；上图来自 Semantic Scholar 对论文 Figure 1 的公开图像索引，论文 PDF 可从作者 GitHub 与 CEUR-WS 页面访问。*

##### 算法伪代码

```python
# XPINNs 训练流程伪代码
subdomains = decompose_space_time_domain(Omega_T)  # Ω×[0,T] -> {Ω_q}
models = {q: PINN(network_config[q]) for q in subdomains}

for step in range(num_steps):
    total_loss = 0.0

    for q, model_q in models.items():
        # 子域内部数据/边界/初值点与 PDE 残差点
        x_u, y_u = sample_data_or_bc_ic(q)
        x_f = sample_residual_points(q)

        u_pred = model_q(x_u)
        mse_u = mean_squared_error(u_pred, y_u)

        # 自动微分计算 PDE 残差 F[u_q](x)
        residual_q = pde_residual(model_q, x_f)
        mse_f = mean(residual_q ** 2)

        loss_q = W_u[q] * mse_u + W_f[q] * mse_f

        # 与所有相邻子域在接口 Γ_{q,q+} 上交换输出与残差
        for q_plus in neighbors(q):
            x_i = sample_interface_points(q, q_plus)
            u_q = models[q](x_i)
            u_p = models[q_plus](x_i)
            u_avg = 0.5 * (u_q + u_p)

            r_q = pde_residual(models[q], x_i)
            r_p = pde_residual(models[q_plus], x_i)

            mse_uavg = mean((u_q - u_avg) ** 2)
            mse_residual = mean((r_q - r_p) ** 2)

            loss_q += W_i[q] * mse_uavg + W_if[q] * mse_residual

            # 可选：对守恒律加入法向通量连续，对高阶 PDE 加入 C^k 连续
            # loss_q += flux_or_derivative_continuity(models[q], models[q_plus], x_i)

        total_loss += loss_q

    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

##### 方法机制解释

标准 PINN 用单个网络 \(u_\theta(\mathbf{x})\) 近似整个计算域上的 PDE 解，并通过初值/边界数据项与 PDE 残差项训练：

$$
\mathcal{L}_{PINN} =
W_u MSE_u + W_F MSE_F,\qquad
MSE_F = \frac{1}{N_F}\sum_{i=1}^{N_F}\left|\mathcal{F}[u_\theta](\mathbf{x}_F^{(i)})\right|^2.
$$

当解在不同区域具有明显不同的尺度、光滑性或边界结构时，单个网络需要同时拟合所有局部行为，训练会变得僵硬；复杂几何中残差点分布也难以一次性调好。XPINNs 的核心做法是把全域 \(\Omega\) 分成 \(N_{sd}\) 个子域 \(\Omega_q\)，每个子域学习一个局部代理 \(u_{\theta_q}\)，再通过接口 \(\Gamma_{q,q^+}\) 交换信息。

对第 \(q\) 个子域，论文给出的前向问题损失可写成：

$$
\mathcal{J}(\theta_q)=
W_{u_q}MSE_{u_q}
+W_{F_q}MSE_{F_q}
+W_{I_q}MSE_{uavg}
+W_{IF_q}MSE_R
+\text{optional interface terms}.
$$

其中前两项与普通 PINN 相同，分别约束观测/初边值数据和子域内部 PDE 残差：

$$
MSE_{u_q}=\frac{1}{N_{u_q}}\sum_i
\left|u^{(i)}-u_{\theta_q}(\mathbf{x}_{u_q}^{(i)})\right|^2,\qquad
MSE_{F_q}=\frac{1}{N_{F_q}}\sum_i
\left|\mathcal{F}[u_{\theta_q}](\mathbf{x}_{F_q}^{(i)})\right|^2.
$$

真正让子域成为一个整体的是接口项。对相邻子域 \(q\) 与 \(q^+\)，接口平均解定义为：

$$
u_{avg}(\mathbf{x})=
\frac{u_{\theta_q}(\mathbf{x})+u_{\theta_{q^+}}(\mathbf{x})}{2},
\qquad \mathbf{x}\in\Gamma_{q,q^+}.
$$

XPINNs 让每一侧的解贴近这个平均值，得到 \(C^0\) 意义下的解连续；同时让两侧 PDE 残差一致：

$$
MSE_{uavg}=
\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|u_{\theta_q}(\mathbf{x}_{I_q}^{(i)})-u_{avg}(\mathbf{x}_{I_q}^{(i)})\right|^2,
$$

$$
MSE_R=
\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|
\mathcal{F}[u_{\theta_q}](\mathbf{x}_{I_q}^{(i)})
-\mathcal{F}[u_{\theta_{q^+}}](\mathbf{x}_{I_q}^{(i)})
\right|^2.
$$

> 💡 关键：XPINNs 不要求接口法向通量一定可定义。残差连续项只依赖 PDE 算子和自动微分，因此它比 cPINN 更通用；如果问题本身是守恒律，也可以额外加入通量连续项增强物理约束。

这种设计带来两个直接收益。第一，子域之间只在接口点通信，子域内部残差计算可以并行；第二，模型容量和采样密度可以按局部难度分配。例如 Burgers 方程中有陡峭梯度的区域可以使用更多残差点、更宽网络或不同激活函数，而平滑区域不必承担相同成本。论文示例中，空间-时间域被切成带不规则“dolphin”接口的两个子域，并分别使用不同网络结构与激活函数，说明 XPINNs 的域分解并不限于规则网格切块。

反问题也可自然纳入：若 PDE 含未知参数 \(\lambda\)，只需把 \(\lambda\) 加入待优化参数集合，残差 \(\mathcal{F}[u_{\theta_q};\lambda]\) 仍由自动微分计算。换言之，XPINNs 的主要变化不是改写 PINN 的物理监督，而是把“一个全局优化问题”变成“多个带接口协调的局部物理优化问题”。

#### 🧪 练习题
```yaml
question: "XPINNs 相比普通 PINN 的关键新增损失是什么？"
options:
  - "只在全域增加更多初始条件采样点"
  - "在相邻子域接口上加入解连续和 PDE 残差连续约束"
  - "把所有 PDE 都改写成守恒通量形式"
  - "用卷积网络替代全连接网络"
answer: 1
explain: "XPINNs 的核心是域分解后用接口损失拼接子域，包括解到平均解的连续约束和两侧 PDE 残差连续约束；这使多个局部 PINN 能组成一个全域解。"
```

### GNS

```yaml
id: gns
num: 8
name: GNS
full_name: 图网络模拟器 (Graph Network Simulators)
year: '2020'
org: DeepMind
parent: —
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
project_url: ''
category: fluid_simulation
motivation: 粒子图网络模拟流体与材料交互
```

#### 📝 一句话总结
GNS 将物理系统表示为粒子图，用 Encode-Process-Decode 图网络通过多轮消息传递预测每个粒子的动力学量，并用固定积分器滚动生成长时序仿真，解决了流体、颗粒、可变形材料和刚体交互难以用单一神经模拟器统一建模的问题。

#### 🎯 核心要点
- **粒子图状态表示**：节点是粒子，边连接空间半径内的相邻粒子，节点/边特征包含速度历史、材料类型、相对位移、距离等局部物理信息
- **Encode-Process-Decode 架构**：Encoder 将原始粒子图编码到潜空间，Processor 执行多轮 Graph Network 消息传递，Decoder 输出粒子加速度或动力学更新量
- **固定更新器滚动仿真**：网络只学习动力学模型 \(d_\theta\)，位置和速度由显式更新规则积分，训练一步预测，推理时递归 rollout
- **相对坐标归纳偏置**：使用相对位置和距离作为边特征，强化平移不变性，比绝对坐标编码更利于泛化
- **抗误差累积训练**：训练时向输入状态注入噪声，并调整目标加速度，让模型学会从 rollout 误差扰动中恢复
- **关键超参数**：论文默认使用 relative Encoder、10 轮消息传递、Processor 中不共享参数的 GN block，主要性能受消息传递步数和训练噪声影响
- **跨材料泛化**：在水、沙、黏性材料、多材料交互、外力扰动和更大粒子数场景上展示长时稳定 rollout

#### 🔬 深入细节
##### 核心架构示意图

![GNS Encode-Process-Decode 架构图](https://ar5iv.labs.arxiv.org/html/2002.09405/assets/x2.png)
*图：GNS 从当前粒子状态构造图，Encoder 生成潜在节点/边特征，Processor 多轮消息传递，Decoder 提取动力学信息，再由固定更新器得到下一状态。图像来自 arXiv 论文的 ar5iv HTML 转换。*

##### 算法伪代码

```python
# GNS 单步训练与 rollout 伪代码
def build_particle_graph(state, radius):
    nodes = make_node_features(
        positions=state.positions,
        velocity_history=state.velocity_history,
        particle_type=state.material_type,
        boundary_features=state.boundary_features,
    )
    edges = []
    for i, j in radius_neighbors(state.positions, radius):
        rel = state.positions[j] - state.positions[i]
        edges.append({
            "sender": j,
            "receiver": i,
            "features": concat(rel, norm(rel)),
        })
    return Graph(nodes=nodes, edges=edges)

def gns_forward(state):
    graph = build_particle_graph(state, radius=R)
    graph = encoder(graph)  # raw features -> latent nodes/edges

    for m in range(num_message_passing_steps):  # paper default: 10
        graph = graph_network_block[m](graph)   # edge update, aggregate, node update

    accel = decoder(graph.nodes)  # per-particle acceleration or dynamics info
    next_velocity = state.velocity + accel * dt
    next_position = state.position + next_velocity * dt
    return next_position, next_velocity, accel

for batch in trajectories:
    noisy_state, target_accel = corrupt_inputs_and_adjust_target(batch)
    _, _, pred_accel = gns_forward(noisy_state)
    loss = mean_squared_error(normalize(pred_accel), normalize(target_accel))
    optimizer.step(loss)

# inference: recursively feed predictions back as the next state
state = initial_state
for t in range(num_rollout_steps):
    state.position, state.velocity, _ = gns_forward(state)
```

##### 方法机制解释

GNS 的建模对象不是规则网格上的场，而是一组随时间运动的粒子。令时刻 \(t\) 的系统状态为 \(X_t=\{(\mathbf{p}_i^t,\mathbf{v}_i^t,c_i)\}_{i=1}^N\)，其中 \(\mathbf{p}_i\) 是位置，\(\mathbf{v}_i\) 是速度或速度历史，\(c_i\) 是粒子类型/材料标签。模型先按空间半径 \(R\) 构造邻接边：

$$
E_t=\{(i,j): \|\mathbf{p}_i^t-\mathbf{p}_j^t\|\le R,\ i\ne j\}.
$$

边特征使用相对位移和距离：

$$
\mathbf{e}_{ij}^{raw}=
\left[\mathbf{p}_j^t-\mathbf{p}_i^t,\ \|\mathbf{p}_j^t-\mathbf{p}_i^t\|\right],
$$

这使模型更像学习局部物理相互作用律，而不是记住全局坐标。粒子数、容器大小或初始形状变化时，只要局部相互作用分布相近，消息传递模型仍可复用。

GNS 的核心是 Graph Network 消息传递。Encoder 先把原始节点/边特征映射到潜空间：

$$
\mathbf{v}_i^0=\phi_v^{enc}(\mathbf{x}_i),\qquad
\mathbf{e}_{ij}^0=\phi_e^{enc}(\mathbf{e}_{ij}^{raw}).
$$

Processor 执行 \(M\) 轮消息传递。每轮先更新边消息，再按接收节点聚合，最后更新节点：

$$
\mathbf{e}_{ij}^{m+1}=
\phi_e^m(\mathbf{e}_{ij}^{m},\mathbf{v}_i^m,\mathbf{v}_j^m),
\qquad
\bar{\mathbf{e}}_i^{m+1}=\sum_{j:(i,j)\in E}\mathbf{e}_{ij}^{m+1},
$$

$$
\mathbf{v}_i^{m+1}=
\phi_v^m(\mathbf{v}_i^m,\bar{\mathbf{e}}_i^{m+1}).
$$

经过多轮传播后，节点隐状态包含了局部邻域内更远范围的信息。Decoder 将最终节点状态映射为动力学量，通常可理解为加速度 \(\hat{\mathbf{a}}_i^t\)。再用固定更新器积分：

$$
\hat{\mathbf{v}}_i^{t+1}=\mathbf{v}_i^t+\Delta t\,\hat{\mathbf{a}}_i^t,\qquad
\hat{\mathbf{p}}_i^{t+1}=\mathbf{p}_i^t+\Delta t\,\hat{\mathbf{v}}_i^{t+1}.
$$

训练目标是一阶监督，但模型部署时会递归滚动很多步。若只做干净输入的一步 MSE，推理时前一步微小误差会把输入推离训练分布，误差会快速累积。论文的关键实践是向输入位置和速度注入噪声，同时把目标加速度调整为“能纠正噪声后的目标”。简化写法为：

$$
\mathcal{L}_{GNS}=
\frac{1}{N}\sum_{i=1}^{N}
\left\|
\frac{\hat{\mathbf{a}}_i-\mathbf{a}_i}{\sigma_a}
\right\|_2^2,
$$

其中 \(\mathbf{a}_i\) 是由相邻真实帧反推的目标加速度，\(\sigma_a\) 是训练集统计量。噪声增强让模型在 rollout 中遇到偏离真实轨迹的小扰动时学会回到合理动力学流形。

> 💡 关键：GNS 的“物理先验”不是硬编码 Navier-Stokes 或 MPM 方程，而是把状态组织成局部交互图，并通过相对坐标消息传递学习可复用的局部动力学。

论文结果显示，GNS 能在单步训练后生成数千步合理 rollout，并可从训练中的几千粒子扩展到测试时更多粒子和更长轨迹。消融实验表明，消息传递步数越多通常越能捕捉长程复杂交互；relative Encoder 明显优于 absolute Encoder；输入噪声存在最佳中间范围，太小无法抗 rollout 误差，太大会损害单步预测。

#### 🧪 练习题
```yaml
question: "GNS 训练时向输入状态加入噪声的主要目的是什么？"
options:
  - "让模型输出更随机，从而生成更多样的视频"
  - "模拟 rollout 中的状态偏差，使模型学会纠正误差累积"
  - "减少图中边的数量，降低计算复杂度"
  - "替代消息传递步骤，直接扩大感受野"
answer: 1
explain: "GNS 推理时递归使用自身预测，误差会把状态带离训练分布；训练噪声配合调整后的目标加速度，使模型在小扰动下仍能预测回到合理轨迹的动力学更新。"
```

### MeshGraphNets

```yaml
id: meshgraphnets
num: 9
name: MeshGraphNets
full_name: 网格图网络 (Mesh Graph Networks)
year: '2020'
org: DeepMind
parent: gns
paper_url: https://arxiv.org/abs/2010.03409
project_url: ''
category: fluid_simulation
motivation: 针对欧拉网格的非结构化图网络
```

#### 📝 一句话总结
MeshGraphNets 将 GNS 的消息传递思想从粒子半径图扩展到非结构化仿真网格：模型在网格边和额外世界空间边上传递消息，预测节点动力学与可选的重网格 sizing field，从而高效学习布料、结构力学和流体等网格化物理系统的长时仿真。

#### 🎯 核心要点
- **网格图而非粒子图**：节点对应网格顶点，mesh edges 表示离散计算拓扑，保留有限元/有限体积仿真中的局部邻接结构
- **额外 world edges**：对世界空间接近但网格拓扑上不相邻的节点加边，用于建模碰撞、自接触、障碍物交互等非局部物理关系
- **Encode-Process-Decode 主体**：节点、mesh edge、world edge 分别编码后，Processor 多轮消息传递更新潜变量，Decoder 输出领域相关的节点更新量
- **领域相关积分器**：布料输出加速度并二阶积分，结构力学输出速度和应力，流体输出动量/密度变化以及压力
- **学习自适应重网格**：另一个同构网络预测每个节点的 sizing tensor，泛化 remeshing 的领域启发式部分，再交给通用局部 remesher 调整网格分辨率
- **训练方式简洁**：使用一步监督的节点输出 MSE；若有 sizing labels，也对 sizing field 使用 MSE
- **实验证据广泛**：覆盖 FlagDynamic、SphereDynamic、DeformingPlate、CylinderFlow、Airfoil 等布料、结构和流体任务，推理速度比对应传统仿真器快 1-2 个数量级

#### 🔬 深入细节
##### 核心架构示意图

![MeshGraphNets 架构图](https://ar5iv.labs.arxiv.org/html/2010.03409/assets/x1.png)
*图：MeshGraphNets 在 SphereDynamic 任务上的 Encode-Process-Decode 流程。Encoder 将当前网格转成图并加入 world edges，Processor 沿 mesh/world edges 多轮消息传递，Decoder 输出节点加速度并通过积分器得到下一网格。*

![MeshGraphNets 实验域](https://ar5iv.labs.arxiv.org/html/2010.03409/assets/x2.png)
*图：论文使用布料、结构力学、绕圆柱不可压流和翼型可压流等不同网格仿真域验证同一框架。*

##### 算法伪代码

```python
# MeshGraphNets 前向与自适应重网格伪代码
def build_mesh_graph(mesh, fields, node_types):
    nodes = make_node_features(
        mesh_position=mesh.reference_position,
        world_position=mesh.current_position,
        physical_fields=fields,
        node_type=node_types,
        history=estimate_velocity_history(mesh),
    )

    mesh_edges = []
    for i, j in mesh.topological_edges:
        mesh_edges.append(edge_features(i, j, kind="mesh"))

    world_edges = []
    for i, j in close_in_world_space(mesh.current_position):
        if not mesh.are_topological_neighbors(i, j):
            world_edges.append(edge_features(i, j, kind="world"))

    return MultiEdgeGraph(nodes, mesh_edges=mesh_edges, world_edges=world_edges)

def meshgraphnet_step(mesh, fields):
    graph = build_mesh_graph(mesh, fields, node_types=mesh.node_types)
    graph = encoder(graph)

    for k in range(num_processor_blocks):  # paper uses 15 as a good tradeoff
        graph.mesh_edges = mesh_edge_update[k](graph.mesh_edges, graph.nodes)
        graph.world_edges = world_edge_update[k](graph.world_edges, graph.nodes)
        graph.nodes = node_update[k](
            graph.nodes,
            aggregate(graph.mesh_edges),
            aggregate(graph.world_edges),
        )

    dynamics = dynamics_decoder(graph.nodes)
    next_mesh, next_fields = integrate_domain_specific(mesh, fields, dynamics)

    if use_learned_remeshing:
        sizing_tensor = sizing_decoder(graph.nodes)
        next_mesh = generic_remesher(next_mesh, sizing_tensor)

    return next_mesh, next_fields

for batch in simulator_trajectories:
    pred = meshgraphnet_step(batch.mesh_t, batch.fields_t)
    loss_dyn = mean_squared_error(pred.node_targets, batch.node_targets_t1)
    loss_size = mean_squared_error(pred.sizing, batch.sizing_labels) if has_sizing else 0
    optimizer.step(loss_dyn + loss_size)
```

##### 方法机制解释

GNS 把物理系统看成粒子集合，而许多工程仿真天然运行在网格上：有限元结构、布料三角网格、绕物体流动的非结构化 CFD 网格等。网格不仅给出“哪些点在空间上接近”，还携带离散化拓扑和材料静止构型。MeshGraphNets 的关键改动是把图的边分为两类：

$$
G=(V,E_m,E_w),
$$

其中 \(E_m\) 是网格拓扑边，表示离散 PDE/力学方程中的局部邻接；\(E_w\) 是 world-space edge，连接当前物理空间中距离近但网格上不相邻的节点，用于碰撞、自接触、障碍物影响等。

对 mesh edge，边特征通常包含参考/mesh 空间相对位置、当前 world 空间相对位置及距离；对 world edge，则强调当前空间相对几何关系：

$$
\mathbf{e}^{m}_{ij}=
\left[\mathbf{x}^{mesh}_j-\mathbf{x}^{mesh}_i,\ 
\|\mathbf{x}^{mesh}_j-\mathbf{x}^{mesh}_i\|,\ 
\mathbf{x}^{world}_j-\mathbf{x}^{world}_i,\ 
\|\mathbf{x}^{world}_j-\mathbf{x}^{world}_i\|\right].
$$

Processor 与 GNS 类似，但分别更新不同边集并在节点上聚合：

$$
\mathbf{e}_{ij}^{m,k+1}=\phi_m^k(\mathbf{e}_{ij}^{m,k},\mathbf{v}_i^k,\mathbf{v}_j^k),
\qquad
\mathbf{e}_{ij}^{w,k+1}=\phi_w^k(\mathbf{e}_{ij}^{w,k},\mathbf{v}_i^k,\mathbf{v}_j^k),
$$

$$
\mathbf{v}_i^{k+1}=
\phi_v^k\left(
\mathbf{v}_i^k,
\sum_{j:(i,j)\in E_m}\mathbf{e}_{ij}^{m,k+1},
\sum_{j:(i,j)\in E_w}\mathbf{e}_{ij}^{w,k+1}
\right).
$$

Decoder 的输出不是固定语义，而是随物理域变化。布料是二阶动力学，Decoder 输出加速度：

$$
\hat{\mathbf{v}}^{t+1}_i=\mathbf{v}^t_i+\Delta t\,\hat{\mathbf{a}}^t_i,\qquad
\hat{\mathbf{x}}^{t+1}_i=\mathbf{x}^t_i+\Delta t\,\hat{\mathbf{v}}^{t+1}_i.
$$

不可压流的 CylinderFlow 在固定欧拉网格上预测动量变化 \(\Delta\mathbf{m}\) 和压力 \(p\)；Airfoil 可压流预测动量、密度变化和压力；DeformingPlate 预测拉格朗日速度和 von-Mises 应力。这种“共享图网络骨架 + 领域相关输出头/积分器”的设计，让同一方法覆盖多类 PDE 离散系统。

训练目标是一阶监督：

$$
\mathcal{L}_{dyn}=
\frac{1}{|V|}\sum_{i\in V}
\left\|\hat{\mathbf{y}}_i-\mathbf{y}_i\right\|_2^2,
$$

其中 \(\mathbf{y}_i\) 是该领域定义的节点目标，如加速度、速度、动量变化、密度变化或压力。推理时模型递归 rollout，论文报告即使只做 next-step 训练，长时滚动也能保持稳定。

MeshGraphNets 的另一项重要机制是学习动态重网格。传统自适应 remeshing 通常包含两部分：判断哪里需要更细/更粗的 resolution，以及执行具体 split/collapse 的局部网格操作。论文把前者学习成每节点 sizing field，后者交给通用 remesher：

$$
\hat{\mathbf{S}}_i = \psi_s(\mathbf{v}_i^K),\qquad
\mathcal{L}_{size}=
\frac{1}{|V|}\sum_i \|\hat{\mathbf{S}}_i-\mathbf{S}_i\|_2^2.
$$

在 rollout 中，模型同时预测下一步状态和 sizing tensor，再调用 \(M_{t+1}=\mathrm{Remesh}(\hat{M}_{t+1},\hat{S})\)。这样可以在布料褶皱或流场边界层处自动增加分辨率，而不需要把具体物理域的启发式 remesher 放进神经网络循环。

> 💡 关键：MeshGraphNets 相比 GNS 的本质提升是“尊重网格”。mesh edges 保留材料/离散化拓扑，world edges 捕捉接触与近场相互作用；二者结合比单纯半径粒子图或规则 CNN 网格更适合非结构化、可变分辨率仿真。

论文消融显示，mesh-space 信息和沿 mesh edge 的消息传递对布料等有静止构型的系统尤其重要；只用 GNS 式世界空间半径图容易在布料任务中发散。与 U-Net 等规则网格基线相比，MeshGraphNets 能在翼型尾流等小尺度区域保持非结构网格的局部分辨率优势。

#### 🧪 练习题
```yaml
question: "MeshGraphNets 为什么同时使用 mesh edges 和 world edges？"
options:
  - "mesh edges 用于可视化，world edges 只用于减少显存"
  - "mesh edges 保留网格拓扑和材料静止结构，world edges 捕捉空间接近导致的碰撞或接触"
  - "两类边完全等价，只是为了增加模型参数量"
  - "world edges 替代积分器，mesh edges 替代损失函数"
answer: 1
explain: "mesh edges 表示仿真网格上的离散邻接关系，适合传播局部 PDE/材料信息；world edges 连接当前空间中接近但拓扑不相邻的点，用于自接触、障碍物交互等非局部效应。"
```

### JAX MD

```yaml
id: jax_md
num: 10
name: JAX MD
full_name: JAX分子动力学 (JAX Molecular Dynamics)
year: '2020'
org: Google
parent: —
paper_url: https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html
project_url: ''
category: fluid_simulation
motivation: 端到端可微分分子动力学引擎
```

#### 📝 一句话总结
JAX MD 提出了一套基于 JAX 的端到端可微分分子动力学框架，把空间边界、势能、邻居列表、积分器和神经网络势统一写成可组合函数，解决了传统 MD 软件难以与自动微分和机器学习模型无缝集成的问题。

#### 🎯 核心要点
- **函数式仿真接口**：用 `displacement_fn`、`shift_fn`、`energy_fn`、`init_fn`、`update_fn` 等纯函数描述空间、势能和动力学状态更新
- **力由能量自动微分得到**：任意可微势能 \(E_\theta(R)\) 都可通过 `jax.grad` 得到 \(F_i=-\nabla_{R_i}E_\theta\)，减少手写力场导数
- **JAX 变换原生可组合**：同一段仿真代码可以套用 `jit`、`grad`、`vmap`、`pmap`，支持硬件加速、批量仿真和轨迹级元优化
- **空间与邻域原语**：提供自由/周期边界、pair/neighbor/bond 映射、cell list 和 neighbor list，使局域相互作用从全对全计算扩展到大规模粒子系统
- **内置物理与神经势能**：包含 Lennard-Jones、Morse、Stillinger-Weber、EAM 等经典势，也支持 Behler-Parrinello 与图神经网络能量模型
- **三个代表性用例**：DFT 数据训练神经网络势、对粒子 packing 最终能量做梯度元优化、用能量模型实现 flocking 行为

#### 🔬 深入细节
##### 图示与可访问来源

JAX MD 的 NeurIPS 论文没有给出单一“模型架构图”，而是用多个实验示例展示框架能力；下面的图来自 ar5iv 对论文图 3 的公开转换，展示了通过可微能量最小化寻找二元粒子 packing 的最大挫折态。

![JAX MD 可微 packing 元优化示例](https://ar5iv.labs.arxiv.org/html/1912.04232/assets/x4.png)
*图：JAX MD 对粒径参数 \(D\) 做可微优化，左侧为不同粒径比下的粒子构型，右侧为最终能量和对 \(D\) 的梯度。来源：论文 ar5iv 页面 https://ar5iv.labs.arxiv.org/html/1912.04232。*

可访问来源包括 NeurIPS 论文页 `https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html`、arXiv 版本 `https://arxiv.org/abs/1912.04232` 和官方仓库 `https://github.com/jax-md/jax-md`。

##### 算法伪代码

```python
# JAX MD 风格的可微分子动力学与元优化伪代码
from jax import grad, jit, vmap
import jax.numpy as jnp
from jax_md import space, energy, simulate, quantity

# 1. 定义空间：周期边界由位移函数和位移更新函数共同描述
box_size = 25.0
displacement_fn, shift_fn = space.periodic(box_size)

# 2. 定义势能：可以是经典势，也可以是带参数的神经网络势
energy_fn = energy.lennard_jones_pair(displacement_fn)
force_fn = quantity.force(energy_fn)  # 等价于 -grad_R energy_fn(R)

# 3. 构造积分器：返回初始化函数和单步更新函数
dt = 1e-3
init_fn, update_fn = simulate.nve(energy_fn, shift_fn, dt=dt)

@jit
def rollout(key, R0, n_steps):
    state = init_fn(key, R0)
    trajectory = []
    for _ in range(n_steps):
        state = update_fn(state)
        trajectory.append(state.position)
    return jnp.stack(trajectory)

# 4. 轨迹级可微优化：对初始条件、势能参数或几何超参数求梯度
def objective(theta, key):
    R0 = initialize_particles(theta, key)
    traj = rollout(key, R0, n_steps=1000)
    return final_observable(traj)  # packing energy、结构因子、目标轨迹误差等

theta = theta - lr * grad(objective)(theta, key)

# 5. 批量化：同一仿真可在不同初始条件上并行执行
batched_objective = vmap(objective, in_axes=(None, 0))
```

##### 核心机制：把分子动力学拆成可微函数

传统 MD 软件往往把边界条件、邻居搜索、势能、力计算和积分器封装在大型状态机或 C++/CUDA 内核里。这样做性能很高，但当研究者想把神经网络势、结构优化目标或控制器接入仿真时，常需要手写桥接代码和导数。JAX MD 的关键设计是把整个仿真写成 JAX 可追踪的函数图：数据保存在数组或轻量 dataclass 中，函数把旧状态映射到新状态。

最基本的 MD 计算可以写成 pair potential 的总能量：

$$E(R)=\sum_{i<j}u\left(\left\|d(R_i,R_j)\right\|\right)$$

其中 \(R_i\) 是第 \(i\) 个粒子位置，\(d(\cdot,\cdot)\) 是由空间对象定义的位移函数；在周期边界下，\(d\) 会返回最近周期镜像的位移。力不再手工推导，而是通过自动微分得到：

$$F_i(R)=-\frac{\partial E(R)}{\partial R_i}$$

> 💡 关键：JAX MD 把“能量是一个可微函数”作为统一接口。只要 `energy_fn(R)` 可被 JAX 追踪，经典势、可学习神经势、甚至带外部控制参数的能量模型都能接入同一套积分器。

##### 空间、映射与邻居列表

JAX MD 的空间模块返回一对函数：`displacement_fn(Ra, Rb)` 计算位移，`shift_fn(R, dR)` 将粒子沿位移移动。这个拆分使自由边界、周期边界和一般周期平行六面体边界都能用同一套动力学函数处理。对于多粒子系统，`space.map_pair`、`space.map_neighbors`、`space.map_bond` 会把单对粒子的位移函数提升为全对、邻居或键连接上的批量计算。

局域相互作用若直接计算所有粒子对，复杂度为 \(O(N^2)\)。JAX MD 使用 cell list 和 neighbor list 将候选邻居限制在截断半径 \(r_c\) 附近：

$$E_{\text{nbr}}(R)=\sum_{(i,j)\in \mathcal{N}(R;r_c)}u\left(\left\|d(R_i,R_j)\right\|\right)$$

这一步对可微仿真尤其重要：它既保留了局域物理结构，也让 `jit` 编译后的 GPU/TPU 批量计算保持可扩展。

##### 动力学更新与训练目标

在 NVE 动力学中，JAX MD 可使用速度 Verlet 一类积分器。抽象地说，给定位置 \(R_t\)、速度 \(V_t\)、质量 \(m\) 和力 \(F(R_t)\)，一次时间步近似为：

$$V_{t+\frac{1}{2}}=V_t+\frac{\Delta t}{2m}F(R_t)$$

$$R_{t+1}=\mu(R_t,\Delta t V_{t+\frac{1}{2}})$$

$$V_{t+1}=V_{t+\frac{1}{2}}+\frac{\Delta t}{2m}F(R_{t+1})$$

其中 \(\mu\) 就是 `shift_fn`，负责把边界条件纳入位置更新。因为每一步都是 JAX 函数，完整轨迹

$$\tau_\theta = S_\theta^T(R_0,V_0)$$

也可以作为可微函数参与优化。例如训练神经网络势时，论文使用量子力学 DFT 数据监督能量和力，可写成：

$$\mathcal{L}(\theta)=\frac{1}{B}\sum_b\left\|E_\theta(R_b)-E_b^{\text{DFT}}\right\|_2^2+\lambda\frac{1}{BN}\sum_{b,i}\left\|-\nabla_{R_i}E_\theta(R_b)-F_{b,i}^{\text{DFT}}\right\|_2^2$$

这体现了 JAX MD 的优势：神经网络只需输出能量，力监督由能量梯度自动得到，不需要为每种神经架构手写力场。

##### 与传统 MD 软件的差异

传统 LAMMPS、HOOMD-Blue、OpenMM 等系统偏向生产级模拟，通常围绕高性能内核和固定插件接口设计。JAX MD 牺牲一部分专用内核极限性能，换取研究迭代速度和可微组合性：`grad` 可穿过势能、积分器和目标函数；`vmap` 可并行多个初始条件；`jit` 可把 Python 描述编译成 XLA 程序；神经势可与传统势共享动力学代码。

这种设计特别适合 AI4Sci 场景：研究者可以把物理仿真放进学习循环，而不是把仿真当作不可微黑盒。典型用法包括反向设计材料结构、优化粒子 packing、学习粗粒化势能、训练控制策略或在大量初始条件上估计统计物理量。

##### 局限与适用边界

JAX MD 不是传统 MD 软件的直接替代品。由于 JAX/XLA 对静态形状和动态数据结构有约束，复杂拓扑变化、极大规模 CPU 模拟和高度特化的生产力场仍可能更适合专用软件。它的优势集中在“仿真本身需要参与求导”的研究工作流：当目标是对参数、初始条件、势能模型或仿真设计变量求梯度时，JAX MD 的函数式结构会显著降低实现成本。

#### 🧪 练习题
```yaml
question: "JAX MD 能把神经网络势无缝接入分子动力学的核心原因是什么？"
options:
  - "它把所有粒子相互作用都改成了无监督聚类问题"
  - "它用可微 energy_fn 作为统一接口，并通过自动微分从能量得到力"
  - "它只支持 Lennard-Jones 势，因此力的解析形式固定"
  - "它避免使用任何数值积分器，直接预测最终轨迹"
answer: 1
explain: "JAX MD 的核心接口是可微势能函数 E(R)。只要能量可被 JAX 追踪，就可以用 grad 得到力，并复用同一套空间、邻居列表和动力学更新函数。"
```

### DiffTaichi

```yaml
id: difftaichi
num: 11
name: DiffTaichi
full_name: 可微分太极 (Differentiable Taichi)
year: '2020'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1910.00935
project_url: ''
category: fluid_simulation
motivation: 命令式可微分编程支持流体控制
```

#### 📝 一句话总结
DiffTaichi 提出面向物理仿真的命令式可微编程系统，用 Taichi 编译器的源代码变换生成高性能梯度内核，并用轻量 tape 反向回放仿真步骤，解决了传统深度学习框架难以高效表达碰撞、稀疏索引、粒子-网格交互和长时间步物理控制的问题。

#### 🎯 核心要点
- **两尺度自动微分**：kernel 内部用源代码变换生成反向内核，kernel 之间用轻量 tape 记录调用并按逆序回放
- **保持命令式物理代码形态**：支持并行 `for`、分支、原子加、全局张量和灵活索引，更接近 C++/CUDA/Fortran 仿真写法
- **面向 megakernel 的性能设计**：相比把所有操作拆成张量算子，DiffTaichi 保留高算术强度和并行循环结构
- **全局数据访问规则**：多次写同一全局元素时从第二次起必须是 atomic add，且累加完成前不能读该元素，以保证反向传播语义明确
- **10 个可微仿真器展示**：覆盖弹性体、3D 流体、水波、烟雾、刚体、质量弹簧、台球、电场等优化任务
- **代表性性能结果**：diffmpm 弹性体仿真代码比手写 CUDA 短 4.2 倍且速度接近，比 TensorFlow 版本快 188 倍；smoke 任务 GPU 总时间优于 PyTorch/Autograd/JAX 基线

#### 🔬 深入细节
##### 核心架构示意图

![DiffTaichi 可微物理仿真示意](https://yuanming.taichi.graphics/publication/2020-difftaichi/featured.jpg)
*图：DiffTaichi 的官方论文页面封面图，左侧强调对仿真变量求导，右侧展示论文中的 10 个可微物理仿真器示例。来源：作者项目页 https://yuanming.taichi.graphics/publication/2020-difftaichi/。*

论文 PDF 中的 Figure 2 展示了更关键的系统结构：Taichi 原有前端、IR 和 JIT 编译器被复用，DiffTaichi 增加了 local AD 源码变换、adjoint tensor 存储和 tape；tape 只记录 kernel 启动及标量参数，反向时按逆序调用对应梯度 kernel。可访问论文来源为 `https://arxiv.org/abs/1910.00935`，代码示例来源为 `https://github.com/taichi-dev/difftaichi`。

##### 算法伪代码

```python
# DiffTaichi 风格：质量弹簧系统的可微仿真与控制参数优化伪代码
import taichi as ti

steps = 1024
dt = 1e-3
lr = 1e-2

x = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
v = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
force = ti.Vector.field(2, dtype=ti.f32, shape=(steps, n_objects))
spring_length = ti.field(dtype=ti.f32, shape=n_springs, needs_grad=True)
loss = ti.field(dtype=ti.f32, shape=(), needs_grad=True)

@ti.kernel
def apply_spring_force(t: ti.i32):
    for s in range(n_springs):  # GPU/CPU parallel loop
        a = spring_anchor_a[s]
        b = spring_anchor_b[s]
        dist = x[t - 1, a] - x[t - 1, b]
        length = dist.norm() + 1e-4
        F = stiffness * (length - spring_length[s]) * dist / length
        force[t, a] += -F      # 多源写入用 atomic add
        force[t, b] += F

@ti.kernel
def time_integrate(t: ti.i32):
    for i in range(n_objects):
        v[t, i] = damping * v[t - 1, i] + dt * force[t, i] / mass[i]
        x[t, i] = x[t - 1, i] + dt * v[t, i]

def forward():
    for t in range(1, steps):
        apply_spring_force(t)
        time_integrate(t)

@ti.kernel
def compute_loss():
    area = triangle_area(x[steps - 1, 0], x[steps - 1, 1], x[steps - 1, 2])
    loss[None] = (area - target_area) ** 2

for it in range(200):
    # 论文写作时 API 为 ti.Tape；现代 Taichi 中常见写法为 ti.ad.Tape。
    with ti.ad.Tape(loss):
        forward()
        compute_loss()
    for s in range(n_springs):
        spring_length[s] -= lr * spring_length.grad[s]
```

##### 动机与背景

可微物理仿真常被用于控制、参数反演、形状优化和可学习物理模块。朴素做法是把仿真写在 PyTorch/TensorFlow/JAX 中，让框架自动微分；问题是物理仿真大量使用非规则访问、scatter/gather、粒子-网格交换、碰撞分支、边界条件和稀疏结构，这些模式在通用张量框架中要么表达笨重，要么生成大量低算术强度的小算子。

DiffTaichi 的切入点是：保留物理仿真工程师熟悉的命令式 kernel 写法，同时让编译器生成反向传播程序。它不是把仿真改写成神经网络层，而是让原本像 CUDA kernel 一样的代码直接成为可微模块。

##### 两尺度自动微分机制

DiffTaichi 把自动微分分成 local AD 和 global AD 两层。对单个 Taichi kernel，编译器先做 IR 预处理：把分支 flatten 成 `select`，消除可变局部变量并转成更接近 SSA 的形式，然后对直线代码做反向模式源码变换。若前向 kernel 表示为：

$$Y=f(X_1,X_2,\ldots,X_n)$$

则生成的 adjoint kernel 接收输出伴随 \(Y^\*\)，并把梯度累加回输入伴随：

$$X_i^\* \mathrel{+}= \left(\frac{\partial f}{\partial X_i}\right)^\top Y^\*$$

对完整仿真程序，DiffTaichi 不记录每个中间张量副本，而是依赖全局张量保存每个时间步状态，再用 tape 记录 kernel 调用序列：

$$S_T = K_T \circ K_{T-1}\circ\cdots\circ K_1(S_0)$$

反向传播时按逆序执行：

$$\bar{S}_{t-1} \mathrel{+}= \left(\frac{\partial K_t}{\partial S_{t-1}}\right)^\top \bar{S}_t$$

> 💡 关键：local AD 保留 kernel 内并行结构，global AD 只记录 kernel 调用和参数。这样既避免了通用 tracing 系统保存大量中间 buffer，也避免了对上千时间步整体做一次巨大源码变换造成编译爆炸。

##### 物理更新公式与损失

论文用质量弹簧系统解释 DiffTaichi 的基本写法。弹簧力遵循 Hooke 定律：

$$F_{a\leftarrow b}=k\left(\left\|x_a-x_b\right\|_2-l_0\right)\frac{x_a-x_b}{\left\|x_a-x_b\right\|_2}$$

半隐式 Euler 更新为：

$$v_{t,i}=e^{-\Delta t\alpha}v_{t-1,i}+\frac{\Delta t}{m_i}F_{t,i}$$

$$x_{t,i}=x_{t-1,i}+\Delta t\,v_{t,i}$$

控制或设计变量可以是弹簧静长、初始速度、神经网络控制器权重等。以目标三角形面积为例：

$$\mathcal{L}=\left(A(x_{T,0},x_{T,1},x_{T,2})-A_{\text{target}}\right)^2$$

DiffTaichi 自动计算 \(\partial\mathcal{L}/\partial l_0\)，再用梯度下降更新弹簧参数。对流体控制任务，参数也可以是初始速度场或控制器输出；损失通常是最终烟雾密度、速度场或图像与目标之间的误差。

##### 为什么命令式可微编程适合流体与材料仿真

流体、MPM 和刚体仿真常见的操作不是矩阵乘法，而是“每个粒子把质量/动量 scatter 到网格”“每个网格点求压力投影”“碰撞时根据条件修正速度”。DiffTaichi 允许代码直接写：

- 对粒子、网格或弹簧做并行循环
- 用任意索引访问全局张量
- 对同一网格节点用 atomic add 累加粒子贡献
- 在 kernel 内处理边界、碰撞和材料分支

这些特性让前向程序和传统高性能仿真代码非常接近。反向程序由编译器维护，既减少手写伴随方程的工作量，也降低梯度实现与前向实现不一致的风险。

##### 碰撞梯度与 TOI 问题

论文强调，可微仿真并不等于“直接对离散代码求导就一定物理正确”。刚体碰撞中，若只在离散时间点检测碰撞，降低初始高度可能在前向结果上看似合理，但离散碰撞时刻没有参与求导，导致最终高度相对初始高度的梯度符号错误。DiffTaichi 用 continuous time of impact (TOI) 修正此类梯度，使反向传播反映碰撞发生时刻的变化。

> ⚠️ 注意：DiffTaichi 解决的是“高性能命令式程序如何自动生成梯度”，但仿真离散化本身仍需要物理建模判断。碰撞、接触、拓扑变化等非光滑事件需要 TOI、平滑化或自定义梯度来得到有意义的优化方向。

##### 与传统自动微分框架的区别

| 维度 | PyTorch/TensorFlow/JAX 直接写仿真 | DiffTaichi |
|------|----------------------------------|------------|
| 编程风格 | 张量算子、函数式数组变换 | 命令式 kernel、并行循环、全局张量 |
| 非规则索引 | 依赖 gather/scatter，代码冗长 | 原生任意索引和数据布局 |
| kernel 粒度 | 容易产生许多小算子 | 保留 megakernel 和高算术强度 |
| 反向传播 | 通用 tape 或 JIT AD | kernel 内源码变换 + kernel 间轻量 tape |
| 适合场景 | 常规深度学习和规则数组计算 | 物理仿真、图形学、粒子-网格和控制优化 |

#### 🧪 练习题
```yaml
question: "DiffTaichi 的两尺度自动微分中，light-weight tape 主要记录什么？"
options:
  - "每个时间步的所有中间张量副本"
  - "神经网络每层的激活值和权重矩阵"
  - "kernel 调用顺序、函数指针和标量参数，并在反向时逆序回放梯度 kernel"
  - "最终渲染图像的像素梯度直方图"
answer: 2
explain: "DiffTaichi 的中间状态主要存放在全局张量中，tape 只需记录 kernel 启动结构和参数；反向传播时按相反顺序执行编译器生成的 adjoint kernel。"
```

### PhiFlow

```yaml
id: phiflow
num: 12
name: PhiFlow
full_name: 流体物理库 (PhiFlow)
year: '2020'
org: 慕尼黑工大
parent: —
paper_url: https://github.com/tum-pbs/PhiFlow
project_url: ''
category: fluid_simulation
motivation: 开源可微分流体仿真库
```

#### 📝 一句话总结
PhiFlow 提供了一个面向机器学习的开源可微 PDE/流体仿真工具箱，把网格、粒子、边界条件、微分算子、线性求解器和 PyTorch/JAX/TensorFlow 后端统一起来，解决了流体仿真代码难以跨后端求导、批量化和复用的问题。

#### 🎯 核心要点
- **多后端可微仿真**：同一套 Python API 可运行在 NumPy、PyTorch、JAX 或 TensorFlow 上，并继承后端的自动微分、JIT 和 GPU/TPU 能力
- **面向 PDE 的高层数据结构**：提供 `CenteredGrid`、`StaggeredGrid`、mesh、point cloud、geometry 等抽象，显式追踪空间维度、批量维度和通道维度
- **内置流体构件**：包含 advection、diffusion、pressure projection、incompressibility、boundary condition 等模块，可快速组装 Navier-Stokes 求解器
- **可微线性求解与矩阵生成**：支持对 sparse matrix、right-hand side 及其依赖参数求导，并可通过函数 tracing 自动生成线性系统
- **优化和学习集成**：可把仿真嵌入神经网络训练、PDE 控制、参数反演、初始条件优化和可微压力/流场设计任务
- **来源限制明确**：任务给出的 `paper_url` 是官方 GitHub 项目页；该库早期用于 2020 年 TUM 可微物理论文/教程，正式 PhiFlow 论文发表于 ICML 2024 PMLR

#### 🔬 深入细节
##### 图示与可访问来源

![PhiFlow 烟雾羽流示例](https://github.com/tum-pbs/PhiFlow/raw/master/docs/figures/examples/grids/Smoke_Plume.png)
*图：PhiFlow 官方 README 中的网格流体示例 Smoke Plume，展示其面向流体仿真的核心应用。来源：官方仓库 https://github.com/tum-pbs/PhiFlow。*

![PhiFlow 可微压力示例](https://github.com/tum-pbs/PhiFlow/raw/master/docs/figures/examples/optim/Differentiable_Pressure.jpg)
*图：PhiFlow 官方 README 中的 Differentiable Pressure 示例，展示压力投影和可微优化在障碍物绕流中的用途。*

任务提供的链接是项目页而非论文页。本文方法解读主要基于官方仓库 `https://github.com/tum-pbs/PhiFlow`、官方文档 `https://tum-pbs.github.io/PhiFlow/`，并参考后续正式论文 “\(\Phi_{\text{Flow}}\): Differentiable Simulations for PyTorch, TensorFlow and Jax” 的 PMLR 页面 `https://proceedings.mlr.press/v235/holl24a.html`。

##### 算法伪代码

```python
# PhiFlow 风格：可微不可压流体一步更新与目标优化伪代码
from phi.torch.flow import *

@jit_compile
def fluid_step(v, smoke, dt=0.25, viscosity=0.01):
    # 1. 半拉格朗日平流：速度搬运速度场，速度搬运烟雾密度
    smoke = advect.semi_lagrangian(smoke, v, dt)
    v = advect.semi_lagrangian(v, v, dt)

    # 2. 粘性扩散：可用显式或隐式扩散
    v = diffuse.explicit(v, viscosity, dt)

    # 3. 压力投影：求解 Poisson 方程并投影到散度为零的速度场
    v, pressure = fluid.make_incompressible(
        v,
        solve=Solve("CG", rel_tol=1e-5, max_iterations=200)
    )
    return v, smoke, pressure

def rollout(v0, smoke0, steps):
    v, smoke = v0, smoke0
    pressures = []
    for _ in range(steps):
        v, smoke, p = fluid_step(v, smoke)
        pressures.append(p)
    return v, smoke, pressures

# 4. 把仿真放入学习/优化循环：例如优化初始速度，让最终烟雾匹配目标图案
initial_velocity = StaggeredGrid(Noise(), x=128, y=128, bounds=Box(x=100, y=100), boundary=0)
initial_smoke = CenteredGrid(Sphere(x=50, y=10, radius=5), x=128, y=128, bounds=Box(x=100, y=100))

def loss_fn(v0):
    _, final_smoke, _ = rollout(v0, initial_smoke, steps=64)
    return field.l2_loss(final_smoke - target_smoke)

grad_v0 = math.gradient(loss_fn)(initial_velocity)
initial_velocity = optimizer_step(initial_velocity, grad_v0)
```

##### 动机与背景

机器学习中的可微物理任务通常不只需要一个“能跑”的流体求解器，还需要它能和神经网络、优化器、批量数据、GPU、JIT 编译和自动微分一起工作。直接在 PyTorch/JAX/TensorFlow 中手写 PDE 求解器会遇到大量重复问题：网格维度管理、边界条件、staggered velocity、压力 Poisson 方程、稀疏线性求解、可视化和后端切换。

PhiFlow 的目标是把这些模拟相关的基础设施封装成高层 API。用户不是从张量切片和 padding 开始写 Navier-Stokes，而是用带物理语义的 `Grid`、`Field`、`Geometry` 和 `Solve` 组合仿真步骤。这样仿真函数既可读，又能被后端 AD 系统追踪。

##### 不可压流体的核心计算

PhiFlow 的典型流体求解围绕不可压 Navier-Stokes 方程：

$$\frac{\partial \mathbf{u}}{\partial t}+(\mathbf{u}\cdot\nabla)\mathbf{u}=-\nabla p+\nu\nabla^2\mathbf{u}+\mathbf{f}$$

$$\nabla\cdot\mathbf{u}=0$$

在投影法中，一个时间步通常拆成平流、扩散、外力和压力投影：

$$\tilde{\mathbf{u}}=\text{Advect}(\mathbf{u}_t,\mathbf{u}_t,\Delta t)+\Delta t\,\nu\nabla^2\mathbf{u}_t+\Delta t\,\mathbf{f}_t$$

压力通过 Poisson 方程求解：

$$\nabla^2 p=\frac{1}{\Delta t}\nabla\cdot\tilde{\mathbf{u}}$$

然后速度被投影到无散度空间：

$$\mathbf{u}_{t+1}=\tilde{\mathbf{u}}-\Delta t\nabla p$$

PhiFlow 的 `fluid.make_incompressible()` 封装了这个投影逻辑；`advect`、`diffuse`、`field` 和 `math.solve_linear` 等模块则提供可组合的数值构件。

##### 数据结构：维度命名与物理场抽象

PhiFlow 的一个关键机制是显式命名和标注维度。传统张量代码中，`tensor.shape == (B, C, H, W)` 的含义依赖约定；PhiFlow 将 batch、spatial、channel 等维度放入类型化张量语义中。这样同一段代码可以从 2D 改成 3D，或从单个样本改成多 batch，而无需手工重写所有 axis。

流体速度常用 staggered grid 表示，即速度分量存储在网格单元面上，而标量烟雾密度、温度或压力通常存储在 centered grid 上。PhiFlow 将这些差异封装到 `StaggeredGrid` 和 `CenteredGrid` 中，避免用户在每个算子里手动维护插值与对齐。

> 💡 关键：PhiFlow 的抽象不是为了隐藏数值方法，而是为了让数值方法以“场”和“算子”的形式表达。平流、梯度、散度、拉普拉斯和边界条件都保留物理含义，同时仍映射到底层可微张量运算。

##### 可微优化与损失函数

当仿真函数 \(S_\theta\) 可微时，可以把控制变量 \(\theta\) 设为初始速度、边界形状、粘性系数、源项、神经网络参数或障碍物位置，并定义目标：

$$\mathcal{L}(\theta)=\sum_{t\in\mathcal{T}}\left\|O(S_\theta^t(x_0))-y_t\right\|_2^2+\lambda R(\theta)$$

其中 \(O\) 可以是从场中采样的观测算子，\(y_t\) 是目标烟雾图案、速度测量或压力分布，\(R(\theta)\) 是平滑性或能量正则项。梯度由后端自动微分穿过平流、扩散和线性求解器：

$$\nabla_\theta\mathcal{L}=\frac{\partial \mathcal{L}}{\partial S}\frac{\partial S_\theta}{\partial \theta}$$

这正是 PhiFlow 与普通 CFD 库的关键区别：它把 PDE 求解器作为可学习程序的一部分，而不是训练循环外部的黑盒。

##### 线性求解器与边界条件

压力投影、隐式扩散、热传导和许多 PDE 约束最终都落到线性系统：

$$A(\theta)x=b(\theta)$$

PhiFlow 的后续正式论文强调，它支持对右端项、稀疏矩阵及其依赖参数求导，并可通过函数 tracing 自动生成矩阵。这对可微物理很关键，因为在反演材料系数、优化边界或学习 PDE 参数时，矩阵本身也可能依赖待优化变量。

边界条件方面，PhiFlow 提供 Dirichlet、Neumann、periodic、symmetric 等表示，并让内置物理函数根据边界自动调整数值 scheme。对流体来说，这能显著减少手写 ghost cell、padding 和法向速度约束的错误。

##### 与 JAX MD、DiffTaichi 的位置差异

JAX MD 偏向粒子/分子动力学研究，核心接口是势能与粒子动力学；DiffTaichi 偏向高性能命令式仿真语言，强调编译器自动生成梯度 kernel；PhiFlow 则更像 PDE/流体仿真的高层 Python 工具箱，强调跨后端、可读性、物理场抽象和与神经网络训练的快速集成。

因此 PhiFlow 特别适合需要频繁试验 PDE 结构的研究：例如学习控制 PDE、把压力投影放入网络训练、构造流体数据集、优化初始条件或对不同 ML 后端做同一仿真实验。若目标是极端性能的自定义 kernel，DiffTaichi 可能更合适；若目标是可微分子系统和神经势，JAX MD 更直接。

#### 🧪 练习题
```yaml
question: "PhiFlow 中 pressure projection 的主要作用是什么？"
options:
  - "把速度场投影到散度为零的空间，从而满足不可压约束"
  - "把所有标量场转换成 RGB 图像，方便可视化"
  - "用神经网络直接替代 Navier-Stokes 方程"
  - "删除边界条件以加快自动微分"
answer: 0
explain: "不可压流体要求 ∇·u=0。压力投影通过求解 Poisson 方程得到压力，再从临时速度中减去压力梯度，使更新后的速度近似无散度。"
```

### AI Feynman

```yaml
id: ai_feynman
num: 13
name: AI Feynman
full_name: AI费曼 (AI Feynman)
year: '2020'
org: MIT
parent: —
paper_url: https://www.science.org/doi/abs/10.1126/sciadv.aay2631
project_url: ''
category: physics_discovery
motivation: 物理对称性与递归分解发现公式
```

#### 📝 一句话总结
AI Feynman 提出一种物理启发的符号回归算法，用神经网络探测维度、对称性、可分性和变量变换，把高维公式发现递归拆成更低维、更易搜索的子问题。

#### 🎯 核心要点
- **目标任务**：给定输入变量表和函数值，自动恢复解析表达式，而不是只训练一个黑盒预测器
- **核心策略**：按模块依次尝试维度分析、低阶多项式拟合、暴力符号搜索、神经网络插值、对称性检测、可分性检测、变量相等化和函数变换
- **递归分解**：一旦发现平移/缩放对称性或加法/乘法可分性，就生成变量更少的新数据集，并把子问题重新送入完整算法
- **神经网络角色**：NN 不负责输出最终公式，而是作为高维平滑插值器，在未观测点测试隐藏结构
- **复杂度控制**：先用物理先验压缩搜索空间，再用短表达式优先的 brute-force 或多项式拟合求闭式解
- **基准结果**：在 Feynman Lectures 100 个方程上全部恢复；在更难的物理测试集上将当时公开工具的成功率从约 15% 提升到约 90%
- **主要局限**：依赖足够干净的数据、变量单位或可采样区间；若目标函数缺少可检测的对称性/可分性，仍会退化为昂贵符号搜索

#### 🔬 深入细节
##### 可访问来源与核心示意图

论文正式页面是 Science Advances: https://www.science.org/doi/abs/10.1126/sciadv.aay2631；可访问全文与图像可见于 arXiv/ar5iv: https://arxiv.org/abs/1905.11481 和 https://ar5iv.labs.arxiv.org/html/1905.11481；开源实现位于 https://github.com/SJ001/AI-Feynman。

![AI Feynman 总体递归流程](https://ar5iv.labs.arxiv.org/html/1905.11481/assets/x1.png)
*图：AI Feynman 不是单一搜索器，而是一组按顺序尝试的物理启发模块；多个模块会产生新的低维数据集并递归调用完整流程。*

![AI Feynman 发现引力公式示例](https://ar5iv.labs.arxiv.org/html/1905.11481/assets/x2.png)
*图：引力公式示例中，算法先做维度分析，再发现平移对称性与乘法可分性，最后用多项式拟合和倒数变换分别求解子表达式。*

##### 算法伪代码

```python
# AI Feynman 核心流程伪代码
def ai_feynman(data, variables, units=None):
    # data: rows of (x_1, ..., x_n, y)
    # variables: symbolic names for x_i

    if units is not None:
        reduced = dimensional_analysis(data, variables, units)
        solution = ai_feynman(reduced.data, reduced.variables, units=None)
        if solution is not None:
            return lift_dimensionless_solution(solution, reduced.transform)

    solution = fit_low_order_polynomial(data, variables)
    if solution is not None:
        return solution

    solution = brute_force_symbolic_search(data, variables)
    if solution is not None:
        return solution

    f_nn, validation_error = train_smooth_interpolator(data)

    symmetry = detect_translation_scaling_or_rotation_symmetry(f_nn, data)
    if symmetry is not None:
        reduced_data = apply_symmetry_reduction(f_nn, data, symmetry)
        solution = ai_feynman(reduced_data, reduced_variables(symmetry))
        if solution is not None:
            return undo_symmetry_reduction(solution, symmetry)

    split = detect_additive_or_multiplicative_separability(f_nn, data)
    if split is not None:
        data_a, data_b = build_separable_subproblems(f_nn, data, split)
        sol_a = ai_feynman(data_a, split.vars_a)
        sol_b = ai_feynman(data_b, split.vars_b)
        if sol_a is not None and sol_b is not None:
            return combine(sol_a, sol_b, split.kind)

    for pair in variable_pairs(variables):
        collapsed = set_variables_equal_and_divide_out(f_nn, data, pair)
        solution = ai_feynman(collapsed.data, collapsed.variables)
        if solution is not None:
            return undo_variable_equality(solution, collapsed.transform)

    for transform in [sqrt, square, log, exp, inverse, sin, cos, tan, asin, acos, atan]:
        transformed = transform_output_or_inputs(data, transform)
        solution = ai_feynman(transformed.data, transformed.variables)
        if solution is not None:
            return undo_transform(solution, transform)

    return None
```

##### 动机：符号回归难在哪里

符号回归要从有限数值样本中找到一个表达式 \(f(x_1,\ldots,x_n)\)。如果直接枚举表达式字符串，搜索空间会随长度指数增长；如果用遗传算法，也很容易在大量等价或近似表达式中消耗搜索预算。物理公式却常有额外结构：单位一致、低阶多项式片段、简单组合、平滑性、平移/缩放对称性、加法或乘法可分性。AI Feynman 的核心判断是：与其让搜索器盲目找公式，不如先把这些结构找出来，把原问题变小。

因此 AI Feynman 的输出仍然是解析公式，但它的主要创新不是一个新的神经符号网络，而是一个递归问题化简器。每次化简都减少变量数、降低表达式复杂度，或把一个高维公式分解成若干低维公式。最后求解器常常只需要处理单变量、多项式或短表达式。

##### 维度分析模块

如果变量带有物理单位，AI Feynman 先把有量纲问题转成无量纲问题。设第 \(i\) 个输入变量单位向量为 \(\mathbf{u}_i\)，目标变量单位为 \(\mathbf{b}\)。选择指数向量 \(\mathbf{p}\) 使

$$
M\mathbf{p}=\mathbf{b},
$$

其中 \(M=[\mathbf{u}_1,\ldots,\mathbf{u}_n]\)。再取 \(M\) 的零空间基 \(U\)，构造无量纲变量：

$$
y'=\frac{y}{\prod_i x_i^{p_i}}, \qquad
z_j=\prod_i x_i^{U_{ij}}.
$$

原问题 \(y=f(x_1,\ldots,x_n)\) 就变成 \(y'=g(z_1,\ldots,z_k)\)，其中 \(k\) 是零空间维度，通常小于原变量数。若 \(k=0\)，函数甚至可被压缩成一个常数因子；若 \(k\) 较小，后续符号搜索也显著容易。

##### 神经网络只做结构探测

论文中神经网络的作用很克制：训练一个平滑前馈网络 \(\hat f_\theta(x)\) 拟合数据，用它在任意输入点上查询函数值，从而检测数据表中没有直接出现的关系。比如要测试 \(x_i,x_j\) 是否只通过差值 \(x_i-x_j\) 影响输出，就需要比较大量形如

$$
\hat f_\theta(\ldots,x_i+\delta,\ldots,x_j+\delta,\ldots)
\quad \text{与} \quad
\hat f_\theta(\ldots,x_i,\ldots,x_j,\ldots)
$$

的值是否一致。如果一致，就可以把两个变量替换成一个差值变量，变量数减少 1。类似地，缩放对称性可把两个变量替换成比值；旋转对称性可把多个坐标替换成半径或内积类变量。

> 💡 关键：NN 在这里不是最终答案，也不需要可解释；它只是一个可微、可查询的函数代理，用来发现可解释的低维结构。

##### 可分性检测与递归求解

可分性是 AI Feynman 最能降低难度的模块。若函数满足乘法可分：

$$
f(\mathbf{x}_A,\mathbf{x}_B)=g(\mathbf{x}_A)h(\mathbf{x}_B),
$$

则对固定参考点 \((\mathbf{x}_A^0,\mathbf{x}_B^0)\)，有

$$
f(\mathbf{x}_A,\mathbf{x}_B)
\approx
\frac{f(\mathbf{x}_A,\mathbf{x}_B^0)f(\mathbf{x}_A^0,\mathbf{x}_B)}
{f(\mathbf{x}_A^0,\mathbf{x}_B^0)}.
$$

若函数满足加法可分：

$$
f(\mathbf{x}_A,\mathbf{x}_B)=g(\mathbf{x}_A)+h(\mathbf{x}_B),
$$

则有

$$
f(\mathbf{x}_A,\mathbf{x}_B)
\approx
f(\mathbf{x}_A,\mathbf{x}_B^0)
+f(\mathbf{x}_A^0,\mathbf{x}_B)
-f(\mathbf{x}_A^0,\mathbf{x}_B^0).
$$

检测通过后，算法不再搜索 \(n\) 变量表达式，而是构造两个低维子数据集，分别求 \(g\) 和 \(h\)。递归求解成功后再把子表达式相乘或相加。引力公式示例中，维度分析和对称性先把距离项压缩，随后乘法可分把质量因子和距离因子拆开，使两个子问题都能被简单拟合解决。

##### 多项式、暴力搜索与变换

AI Feynman 保留了传统符号回归组件，但把它们放在更适合的位置使用。低阶多项式拟合通过线性最小二乘直接求系数，适合 \(x^2+y^2\)、动能项、某些变换后的表达式。暴力搜索按表达式复杂度从小到大枚举语法合法的逆波兰表示，并用最小描述长度偏好短而精确的公式：

$$
\mathrm{score}(s)
=
\mathrm{complexity}(s)
+ \lambda \log \mathrm{error}(s).
$$

如果直接搜索失败，算法还会尝试对目标值或输入做 \(\log,\exp,\sqrt{\cdot},(\cdot)^2,1/(\cdot),\sin,\cos,\tan\) 等变换。例如一个根号距离公式在平方后可能变成低阶多项式，一个指数公式在取对数后可能变成线性或多项式。

##### 与传统符号回归的区别

| 维度 | 遗传/暴力符号回归 | AI Feynman |
|------|-------------------|------------|
| 搜索对象 | 原始高维表达式 | 递归化简后的低维子表达式 |
| 神经网络用途 | 通常直接拟合或生成表达式 | 只作为结构探测的插值器 |
| 物理先验 | 通常弱或需人工给定字典 | 显式使用单位、对称性、可分性和变量变换 |
| 复杂度控制 | 靠表达式长度和误差筛选 | 先降维/分解，再搜索 |
| 适用场景 | 通用但搜索昂贵 | 对物理型、结构化函数特别高效 |

AI Feynman 的思想与科学发现流程很接近：先问“这个量纲是否允许简化”“这些变量是否只通过差值或比值进入”“公式是否能拆成两个独立部分”，再做代数搜索。它不能保证解决任意函数，但对物理公式这种高度结构化目标，递归化简会把看似不可搜索的问题变成一串可处理的小问题。

#### 🧪 练习题
```yaml
question: "AI Feynman 中神经网络的主要作用是什么？"
options:
  - "直接生成最终的符号表达式并替代符号搜索"
  - "作为平滑插值器，在未观测点测试对称性、可分性等隐藏结构"
  - "把所有变量映射到固定维度的潜空间后做分类"
  - "用强化学习选择下一个数学符号"
answer: 1
explain: "AI Feynman 的最终答案仍由多项式拟合、暴力搜索或递归组合得到；神经网络主要用于查询函数代理，从而发现可降维的物理结构。"
```

### UDE

```yaml
id: ude
num: 14
name: UDE
full_name: 通用微分方程 (Universal Differential Equations)
year: '2020'
org: Christopher Rackauckas
parent: neural_ode
paper_url: https://arxiv.org/abs/2001.04385
project_url: ''
category: physics_discovery
motivation: NN作为微分方程未知项补全物理
```

#### 📝 一句话总结
UDE 将已知科学模型与神经网络、傅里叶/切比雪夫展开等通用逼近器嵌入同一个微分方程求解框架，用可微分数值求解器和伴随敏感性训练未知项，从而在小数据条件下补全机制、发现方程并加速仿真。

#### 🎯 核心要点
- **统一形式**：把 Neural ODE、神经 SDE、神经 DDE、神经 PDE、混合 DAE 和物理约束最优控制都视为嵌入通用逼近器的微分方程
- **混合建模**：保留可信的物理项 \(f_{\mathrm{known}}\)，只让 \(U_\theta\) 学习未知闭合项、残差项、参数化项或未建模交互
- **训练机制**：通过 DifferentialEquations.jl 求解状态轨迹，通过 DiffEqSensitivity.jl/自动微分计算对 \(p,\theta\) 的梯度
- **方程发现**：先训练 UDE 拟合未知动力学，再对训练出的 \(U_\theta\) 或导数估计做稀疏回归/符号回归，得到可解释控制方程
- **数值优势**：显式纳入自适应步长、刚性求解器、DAE/DDE/SDE 支持、checkpoint adjoint 和稳定伴随方法，避免把科学模型训练完全变成 PINN 式大优化问题
- **代表案例**：Lotka-Volterra 机制补全、Fisher-KPP PDE 发现、高维 Hamilton-Jacobi-Bellman、气候参数化、非牛顿流体闭合关系
- **主要风险**：若已知物理骨架错误或数据无法辨识未知项，UDE 可能得到预测有效但解释错误的补偿项

#### 🔬 深入细节
##### 可访问来源与核心示意图

论文 arXiv 页面: https://arxiv.org/abs/2001.04385；可访问 HTML 与图像来源: https://ar5iv.labs.arxiv.org/html/2001.04385；复现实验代码: https://github.com/ChrisRackauckas/universal_differential_equations。

![SciML 与 UDE 的统一接口](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x1.png)
*图：UDE 位于 SciML 工具链中间，将高层科学模型、符号-数值表示、优化器、微分方程求解器、伴随敏感性和深度学习库组合成可训练系统。*

![UDE 在低维生物动力学中的机制补全示例](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x3.png)
*图：UDE 用少量观测数据训练未知交互项后，可以在长时间范围内重建 Lotka-Volterra 类系统轨迹。*

![UDE 学习非牛顿流体闭合关系](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x5.png)
*图：在非牛顿流体闭合问题中，神经闭合项比线性近似更准确，并可作为更快的降阶模型使用。*

##### 算法伪代码

```python
# UDE 训练 + 方程发现伪代码

def known_physics(u, t, p):
    # 可信的机理项，例如守恒律、扩散项、反应项、约束项
    return f_known(u, t, p)

def unknown_closure(u, t, theta):
    # 通用逼近器：NN、CNN、Fourier/Chebyshev 展开或其它可微模块
    return U_theta(u, t, theta)

def ude_rhs(u, t, p, theta):
    return known_physics(u, t, p) + unknown_closure(u, t, theta)

def train_ude(observations, tspan, p, theta):
    for step in range(num_steps):
        u0, ts, ys = sample_trajectory(observations)
        pred = differential_equation_solve(
            rhs=lambda u, t: ude_rhs(u, t, p, theta),
            u0=u0,
            saveat=ts,
            solver="adaptive_or_stiff_solver",
        )

        loss = mean_squared_error(pred, ys) + regularization(theta, p)

        # adjoint / sensitivity methods compute d loss / d(p, theta)
        grad_p, grad_theta = sensitivity_gradient(loss, pred, p, theta)
        p, theta = optimizer_update((p, theta), (grad_p, grad_theta))

    return p, theta

def discover_equation(trained_model, sampled_states):
    # 用训练好的 U_theta 生成未知项取值，再做稀疏符号回归
    library = build_candidate_library(sampled_states, derivatives=True)
    target = evaluate_unknown_closure(trained_model, sampled_states)
    sparse_formula = sparse_regression(library, target)
    return sparse_formula
```

##### UDE 的基本形式

最常用的 UDE 可以写成一个带未知项的 ODE：

$$
\frac{du}{dt}
=
f_{\mathrm{known}}(u,t,p)
+
U_\theta(u,t),
\qquad
u(t_0)=u_0.
$$

其中 \(f_{\mathrm{known}}\) 是研究者已经相信的机理模型，例如质量守恒、动量守恒、反应网络中已知反应、扩散项或边界条件；\(U_\theta\) 是通用逼近器，用来表达未知交互、模型误差、闭合关系或难以手写的高维算子。训练目标通常是离散观测点上的轨迹误差：

$$
\mathcal{L}(p,\theta)
=
\sum_{i=1}^{m}
\left\|
u_{p,\theta}(t_i)-y_i
\right\|_2^2
+
\lambda \mathcal{R}(p,\theta),
$$

其中

$$
u_{p,\theta}(t_i)
=
\operatorname{DESolve}
\left(u_0,\; f_{\mathrm{known}}+U_\theta,\; t_0,\; t_i\right).
$$

这一定义并不限于 ODE。把求解器换成 SDE、DDE、PDE method-of-lines、DAE 或 jump/hybrid solver，就得到对应的 Universal SDE、Universal DDE、Universal PDE 或 Universal DAE。UDE 的重点不是“神经网络替代微分方程”，而是“在微分方程内部只替代未知部分”。

##### 为什么 UDE 比纯黑盒 Neural ODE 更适合科学建模

纯 Neural ODE 通常写作 \(\dot u=f_\theta(u,t)\)，所有动力学都由网络学习。这在数据丰富时很灵活，但在科学问题中常有两个问题：实验数据昂贵，且研究者已经知道大量约束。如果忽略这些约束，模型会把数据稀缺性转化为外推失败。

UDE 把模型写成

$$
\dot u = f_{\mathrm{known}}(u,t,p) + U_\theta(u,t),
$$

等价于把学习任务从“学习整个物理世界”缩小成“学习已知模型的缺口”。这使 \(U_\theta\) 的函数复杂度更低，也让外推更受物理骨架约束。例如已知 Lotka-Volterra 系统存在增长/衰减项，但相互作用项未知时，网络只需学习交互结构；已知 PDE 是扩散-反应型时，网络只需学习未知反应项或离散算子。

> 💡 关键：UDE 的数据效率来自归纳偏置。可信物理项越多，网络需要从数据中凭空学习的东西越少。

##### 梯度计算：求解器与伴随法是核心

训练 UDE 需要对微分方程解 \(u(t;p,\theta)\) 求参数梯度。用链式法则可写成：

$$
\frac{d\mathcal{L}}{d\theta}
=
\sum_i
\frac{\partial \mathcal{L}}{\partial u(t_i)}
\frac{\partial u(t_i)}{\partial \theta}.
$$

直接存储求解器每一步再反向传播，在刚性系统或长时间积分中成本很高。论文强调 SciML 工具链提供多类 sensitivity/adjoint 选择：forward sensitivity 适合参数少的系统；连续伴随适合大参数模型；checkpointed interpolation adjoint 可避免反向积分不稳定；离散伴随更贴近实际求解器轨迹；刚性问题可使用稳定伴随和隐式求解器。

这也是 UDE 与许多 PINN 写法的差异。PINN 常把微分方程残差直接放进损失，在大量 collocation point 上优化网络；UDE 则继续使用成熟数值求解器推进状态，只把未知模型项纳入可微计算图。对于已有高质量求解器的科学模型，这通常更稳定，也更容易复用工程代码。

##### 从补全模型到发现方程

UDE 的一个重要工作流是两阶段发现：

1. 用 \(U_\theta\) 补全未知动力学，使混合模型能匹配观测；
2. 在训练好的 \(U_\theta\) 上采样，再用稀疏回归或符号回归把神经项压缩成可读公式。

例如对反应-扩散型 PDE，可先训练

$$
u_t
=
D_\phi(u)
+
N_\theta(u),
$$

其中 \(D_\phi\) 可以是可学习卷积 stencil，\(N_\theta\) 是局部非线性反应项。训练后再把 \(N_\theta(u)\) 对候选库 \(\{1,u,u^2,u^3,\ldots\}\) 做稀疏回归，可能恢复出 Fisher-KPP 型增长项：

$$
u_t = D u_{xx} + r u(1-u).
$$

这种方式把“发现方程”转化成低维、低噪声的后处理问题：神经网络先吸收复杂观测和数值误差，再由稀疏回归提取可解释结构。

##### 与相关方法的区别

| 方法 | 已知物理使用方式 | 求解方式 | 可解释性 | 典型瓶颈 |
|------|------------------|----------|----------|----------|
| 纯 Neural ODE | 几乎不用或只弱约束 | ODE solver + NN RHS | 弱 | 小数据外推差、刚性训练难 |
| PINN | PDE 残差进入损失 | 优化网络函数本身 | 中等，依赖已知 PDE | collocation 优化难、刚性问题慢 |
| 稀疏方程发现 | 候选库人工给定 | 先估导数再回归 | 强 | 对噪声和导数估计敏感 |
| UDE | 已知机理项保留，未知项由 UA 学习 | 成熟微分方程求解器 + 伴随 | 先弱后强，可再做符号回归 | 需选择正确物理骨架和敏感性方法 |

UDE 的价值在于工程组合：它把科学计算中已有的求解器、符号建模、自动微分、优化器和机器学习模块接起来。对研究者来说，最重要的设计不是网络层数，而是把什么写进 \(f_{\mathrm{known}}\)，把什么留给 \(U_\theta\)，以及训练后是否能把 \(U_\theta\) 重新解释为科学公式。

##### 局限与实践注意

UDE 不是自动保证可解释的万能模型。如果已知物理项漏掉了关键状态变量，\(U_\theta\) 可能学到一个依赖训练分布的补偿项；如果观测只覆盖很短时间窗口，未知项和初值误差、参数误差可能不可辨识；如果系统很刚性，错误选择反向伴随会导致梯度发散。实践中应同时检查轨迹拟合、外推、守恒量、参数可辨识性和符号回归残差。

#### 🧪 练习题
```yaml
question: "UDE 相比纯 Neural ODE 的核心建模优势是什么？"
options:
  - "完全不需要数值微分方程求解器"
  - "只让通用逼近器学习未知或残差项，同时保留可信物理模型作为归纳偏置"
  - "把所有科学问题都改写成图像分类任务"
  - "训练时不需要观测数据"
answer: 1
explain: "UDE 的关键是混合建模：已知机理项继续由微分方程表达，神经网络等通用逼近器只补全未知部分，因此通常比全黑盒 Neural ODE 更数据高效、更适合外推。"
```

### LNN

```yaml
id: lnn
num: 15
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: '2020'
org: DeepMind
parent: hnn
paper_url: https://arxiv.org/abs/2003.04630
project_url: ''
category: physics_constrained
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

### SympNets

```yaml
id: sympnets
num: 16
name: SympNets
full_name: 辛神经网络 (Symplectic Neural Networks)
year: '2020'
org: Pengzhan Jin
parent: hnn
paper_url: https://doi.org/10.1016/j.neunet.2020.08.028
project_url: ''
category: physics_constrained
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

### ParticleNet

```yaml
id: particlenet
num: 17
name: ParticleNet
full_name: 粒子网络 (ParticleNet)
year: '2020'
org: Huilin Qu
parent: —
paper_url: https://doi.org/10.1103/PhysRevD.101.056019
project_url: ''
category: quantum_particle
motivation: 粒子云动态图卷积提升喷注鉴别
```

#### 📝 一句话总结
ParticleNet 将高能物理喷注表示为无序的 constituent particle cloud，并用动态 kNN 图上的 EdgeConv 分层学习局部粒子关系，解决 jet image 稀疏、particle sequence 人为排序和 Deep Sets 全局聚合难以捕获局部子结构的问题。

#### 🎯 核心要点
- **表示方式**：把一个 jet 看成无序粒子集合，而不是图像、序列或树，天然贴合 permutation symmetry
- **核心算子**：使用 EdgeConv，在每个粒子的 \(k\) 个近邻上计算共享 MLP 边特征并做对称聚合
- **动态图更新**：第一层用 \((\Delta\eta,\Delta\phi)\) 作为坐标建图，后续层用 learned feature vectors 重新计算近邻
- **ParticleNet 架构**：3 个 EdgeConv block，\(k=16\)，通道分别为 \((64,64,64)\)、\((128,128,128)\)、\((256,256,256)\)
- **EdgeConv block 细节**：三层 MLP，每层 Linear + BatchNorm + ReLU，并加入 ResNet 风格 shortcut
- **分类头**：channel-wise global average pooling 聚合所有粒子，再接 256 维 FC、ReLU、dropout 0.1 和 softmax
- **轻量版本**：ParticleNet-Lite 使用 2 个 EdgeConv block，\(k=7\)，通道 \((32,32,32)\)、\((64,64,64)\)，计算量低近一个数量级
- **输入特征**：top tagging 使用前 100 个最高 \(p_T\) 粒子的 7 个运动学变量；quark-gluon tagging 可额外加入电荷和粒子 ID
- **基准结果**：在 top tagging 和 quark-gluon tagging 两个公开 benchmark 上超过 ResNeXt-50、P-CNN、PFN 等代表方法

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 DOI 指向 Phys. Rev. D 版本；可直接访问的 arXiv 版本为 https://arxiv.org/abs/1902.08570，代码仓库为 https://github.com/hqucms/ParticleNet。下图来自 ar5iv 渲染的论文架构图。

![ParticleNet 与 ParticleNet-Lite 架构](https://ar5iv.labs.arxiv.org/html/1902.08570/assets/x2.png)
*图：ParticleNet 由多个 EdgeConv block、全局平均池化和全连接分类头组成；ParticleNet-Lite 减少 block、邻居数和通道数以降低计算量。*

![EdgeConv block 结构](https://ar5iv.labs.arxiv.org/html/1902.08570/assets/x1.png)
*图：EdgeConv block 先按坐标或 learned feature 建立 kNN 图，再从近邻构造 edge features，经共享 MLP 和对称聚合得到新粒子特征。*

##### 算法伪代码

```python
# ParticleNet / EdgeConv 训练伪代码

def edge_conv_block(coords, features, k, channels):
    # coords: 用于 kNN 的坐标，首层通常是 (delta_eta, delta_phi)
    # features: 每个粒子的输入或隐藏特征
    neighbors = knn(coords, k=k)  # shape: [num_particles, k]
    edge_outputs = []

    for i in range(num_particles):
        messages = []
        for j in neighbors[i]:
            edge_feature = concat(features[i], features[j] - features[i])
            messages.append(shared_mlp(edge_feature, channels))
        # 论文使用 mean 聚合，而不是原始 DGCNN 中常用的 max
        edge_outputs.append(mean(messages, axis=0))

    out = batch_norm_relu(edge_outputs)
    out = out + shortcut_projection(features)
    return out

def particlenet(particles):
    coords = particles[["delta_eta", "delta_phi"]]
    features = particles[input_features]

    features = edge_conv_block(coords, features, k=16, channels=(64, 64, 64))
    coords = features
    features = edge_conv_block(coords, features, k=16, channels=(128, 128, 128))
    coords = features
    features = edge_conv_block(coords, features, k=16, channels=(256, 256, 256))

    jet_feature = global_average_pool(features, axis="particles")
    hidden = relu(linear(jet_feature, 256))
    hidden = dropout(hidden, p=0.1)
    logits = linear(hidden, num_classes=2)
    return softmax(logits)

for batch in dataloader:
    logits = particlenet(batch.particles)
    loss = cross_entropy(logits, batch.labels)
    adamw_update(loss, weight_decay=1e-4, one_cycle_lr=True)
```

##### Jet 为什么适合 particle cloud

喷注是 LHC 中高能 parton 强子化后形成的一簇粒子。传统 jet image 把 \((\eta,\phi)\) 平面离散成像素，但一个 jet 往往只有 \(O(10)\) 到 \(O(100)\) 个粒子，而图像需要 \(O(1000)\) 个像素，绝大多数像素为空。particle sequence 则要按 \(p_T\) 等规则排序，可粒子集合本身没有物理上的固定顺序，人工顺序可能让模型学习到无关偏置。

ParticleNet 的选择是把 jet 写成

$$
J=\{x_1,x_2,\ldots,x_N\},
$$

其中 \(x_i\) 是第 \(i\) 个粒子的特征向量，包括 \(\Delta\eta,\Delta\phi,\log p_T,\log E,\log(p_T/p_T^{jet}),\log(E/E^{jet}),\Delta R\)，在有 PID 信息时再加电荷和粒子类型 one-hot。这个表示保留原始粒子级信息，又要求网络对输入顺序不敏感。

##### EdgeConv 的关键计算

EdgeConv 先把粒子云变成 kNN 图。对每个中心粒子 \(x_i\)，找到 \(k\) 个近邻 \(x_{i_j}\)，然后计算

$$
\mathbf{x}'_i
=
\operatorname*{\square}_{j=1}^{k}
\mathbf{h}_{\Theta}(\mathbf{x}_i,\mathbf{x}_{i_j}),
$$

其中 \(\square\) 是 channel-wise 对称聚合。论文采用 mean 聚合：

$$
\mathbf{x}'_i
=
\frac{1}{k}\sum_{j=1}^{k}
\bar{\mathbf{h}}_{\Theta}
(\mathbf{x}_i,\mathbf{x}_{i_j}-\mathbf{x}_i).
$$

把邻居特征写成差分 \(\mathbf{x}_{i_j}-\mathbf{x}_i\) 的直觉是让网络同时看到“中心粒子是什么”和“邻居相对中心有什么局部结构”。共享 MLP 保证同一种局部模式可在所有粒子位置复用；mean 聚合保证近邻顺序不会改变输出。

##### 动态图带来的层次建模

第一层 kNN 用物理空间中的 \(\Delta\eta,\Delta\phi\) 计算距离，捕获局部角向结构。经过一层 EdgeConv 后，每个粒子已经拥有局部上下文特征；后续层再用这些 learned feature 作为坐标重新建图，使“邻居”不再只是几何上近，也可以是在判别任务中语义相近。这个动态更新正是 DGCNN 思想在 jet tagging 中的移植。

> 💡 关键：ParticleNet 的 permutation symmetry 不是把所有粒子直接求和，而是在局部图卷积后再做全局池化，因此既尊重无序集合，又保留多 prong、软辐射、局部能量分布等判别信息。

##### 训练目标与 benchmark

分类目标是标准交叉熵：

$$
\mathcal{L}_{CE}
=
-\frac{1}{B}\sum_{b=1}^{B}
\sum_{c=1}^{C}
y_{bc}\log \hat{p}_{bc}.
$$

论文用 AdamW 和 one-cycle learning-rate schedule 训练。top tagging benchmark 中，每个 jet 最多取 100 个最高 \(p_T\) constituent，训练/验证/测试划分为 1.2M/400k/400k；ParticleNet 的 AUC 为 0.9858，30% signal efficiency 下背景拒绝 \(1/\varepsilon_b=1615\pm93\)，显著高于 PFN、P-CNN 和 ResNeXt-50。quark-gluon tagging 中，加入 PID 的 ParticleNet AUC 达 0.9116，背景拒绝也优于 PID 版本的 PFN 和 P-CNN。

##### 与其他 jet 表示的区别

| 方法 | 输入结构 | 优点 | 主要缺陷 |
|------|----------|------|----------|
| Jet image + CNN | 稀疏 \((\eta,\phi)\) 网格 | 可直接使用成熟 CNN | 粒子信息合并困难，像素稀疏 |
| Particle sequence + RNN/1D CNN | 按 \(p_T\) 排序的序列 | 使用粒子级特征 | 人为顺序不符合物理对称性 |
| PFN / Deep Sets | 无序集合全局聚合 | 严格集合建模，速度快 | 局部邻域结构利用不足 |
| ParticleNet | 动态粒子图 | 同时建模无序集合和局部结构 | EdgeConv 计算比 PFN 更重 |

ParticleNet 的工程权衡很清楚：它用动态图卷积换取更强的局部结构表达，因此标准版推理更慢；ParticleNet-Lite 则保留主要建模思想，把参数量降到 26k，在速度和精度之间取得更适合在线应用的平衡。

#### 🧪 练习题
```yaml
question: "ParticleNet 使用动态 EdgeConv 的主要目的是什么？"
options:
  - "把 jet 转成固定大小图像以便使用 2D CNN"
  - "按 p_T 给粒子排序，让 RNN 能顺序处理"
  - "在无序粒子云上学习局部邻域关系，并随层数用 learned features 更新 kNN 图"
  - "只对所有粒子特征做一次全局求和以保证 permutation invariance"
answer: 2
explain: "ParticleNet 先在粒子云上构建 kNN 图，再用 EdgeConv 学习局部结构；后续层根据隐藏特征重建图，使邻域关系可以随任务学习。"
```

### hp-VPINNs

```yaml
id: hp_vpinns
num: 18
name: hp-VPINNs
full_name: 变分PINN (hp-Variational PINNs)
year: '2021'
org: 布朗大学
parent: pinn
paper_url: https://doi.org/10.1016/j.cma.2020.113533
project_url: ''
category: pde_solving
motivation: 变分形式与hp细化优化精度
```

#### 📝 一句话总结
hp-VPINNs 将 PINN 的强形式 collocation residual 改成局部变分残差：用一个全局神经网络作为 trial function，同时在非重叠子域上用高阶多项式 test functions 做投影，实现 \(h\)-域分解和 \(p\)-高阶测试空间细化，以提升 PDE 求解精度和局部优化效率。

#### 🎯 核心要点
- **全局 trial space**：解函数仍由一个全局 DNN \(u_{NN}(x,t;\theta)\) 表示，保持 PINN 的连续函数近似能力
- **局部 test space**：测试函数是定义在各个非重叠子域上的分片高阶多项式，常用 Legendre polynomials
- **hp-refinement**：\(h\) 表示把计算域拆成更多元素，\(p\) 表示在每个元素中增加或调整测试多项式阶数
- **变分残差**：不只在点上令 PDE residual 为 0，而是最小化 \((\mathcal{L}^q u_{NN}-f,v_k^{(e)})_{\Omega_e}\)
- **局部学习思想**：虽然网络是全局的，loss 可以按元素组织，让训练更关注不光滑、陡峭或误差大的局部区域
- **数值积分**：深层网络的变分积分通常不能解析求出，论文使用 Gauss quadrature；也讨论通过分部积分降低导数阶数
- **相对 VPINN**：VPINN 使用全局多项式测试函数，hp-VPINN 使用局部测试函数，更接近 sub-domain Petrov-Galerkin
- **实验对象**：函数逼近、1D/2D Poisson 方程、L-shape corner singularity、advection-diffusion inverse problem 等

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 DOI 指向 Computer Methods in Applied Mechanics and Engineering 版本；可直接访问的 arXiv 版本为 https://arxiv.org/abs/2003.05385。论文没有单一“网络结构图”，核心机制主要由公式定义；下图来自 ar5iv 渲染的 Figure 1，用全局/局部测试函数与子域误差示例展示 hp-VPINN 的局部测试空间思想。

![hp-VPINN 局部测试函数与子域示意](https://ar5iv.labs.arxiv.org/html/2003.05385/assets/x1.png)
*图：全局测试函数与局部 elemental test functions 的对比；局部测试函数把优化信号限制到指定子域，是 hp-VPINN 域分解与局部学习的核心。*

##### 算法伪代码

```python
# hp-VPINN 训练伪代码

def u_nn(x, t, theta):
    return mlp(concat(x, t), theta)

def strong_residual(x, t, theta, q):
    u = u_nn(x, t, theta)
    # 例如 L^q u = f，可由自动微分计算所需导数
    return L_q(u, x, t, q) - f(x, t)

def element_variational_residual(element, test_fn, theta):
    # Gauss quadrature on element Omega_e x Gamma_e
    residual_sum = 0.0
    for z, w in gauss_points(element):
        x, t = z.x, z.t
        r = strong_residual(x, t, theta, q)
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
u(\mathbf{x},t)=h(\mathbf{x},t),\quad
u(\mathbf{x},0)=g(\mathbf{x}).
$$

用神经网络 \(u_{NN}(\mathbf{x},t;\theta)\) 近似解后，强形式残差是

$$
r(u_{NN})=\mathcal{L}^{\mathbf{q}}u_{NN}-f.
$$

标准 PINN 直接在 collocation points 上最小化 \(|r|^2\)，其损失近似为

$$
L^{\mathfrak{s}}
=
\frac{1}{N_r}\sum_{i=1}^{N_r}|r(\mathbf{x}^i_r,t^i_r)|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

VPINN / hp-VPINN 改为把残差投影到测试函数上：

$$
\mathcal{R}_j(u_{NN})
=
\int_{\Omega\times(0,T]}
r(u_{NN})v_j\,dx\,dt.
$$

这样优化目标不再是“某些点上 residual 小”，而是“残差对一组测试函数的矩接近 0”。这和 Galerkin / Petrov-Galerkin 方法的思想一致。

##### hp-VPINN 的局部元素残差

hp-VPINN 的关键是测试函数局部化。把域 \(V\) 划分成非重叠子域 \(V_j\)，测试函数定义为

$$
v_j=
\begin{cases}
\bar{v}\neq0, & \text{over } V_j,\\
0, & \text{over } V_j^c,
\end{cases}
$$

其中 \(\bar{v}\) 通常取高阶多项式。对第 \(e\) 个元素，元素变分残差为

$$
\mathcal{R}^{(e)}
=
\left(\mathcal{L}^{\mathbf{q}}u_{NN}-f,\;v\right)_{\Omega_e\times\Gamma_e}.
$$

最终变分损失写成

$$
L^{\mathfrak{v}}
=
\sum_{e=1}^{N_{el}}
\frac{1}{K^{(e)}}\sum_{k=1}^{K^{(e)}}
\left|\mathcal{R}^{(e)}_k\right|^2
+\tau_b\frac{1}{N_b}\sum_{i=1}^{N_b}|r_b(\mathbf{x}^i_b,t^i_b)|^2
+\tau_0\frac{1}{N_0}\sum_{i=1}^{N_0}|r_0(\mathbf{x}^i_0)|^2.
$$

这里 \(K^{(e)}\) 是第 \(e\) 个元素中的测试函数数量。\(h\)-refinement 对应增加或重排元素；\(p\)-refinement 对应提高某个元素内的测试多项式阶数或数量。

##### 为什么这种设计能改善优化

标准 PINN 的 collocation residual 对采样点分布很敏感。若解在局部有尖峰、间断、边界层或 L-shape 角点奇异性，均匀点采样可能把训练预算浪费在平滑区域。hp-VPINN 通过局部 test functions 把 loss 拆成元素级贡献，可以在问题困难的子域使用更细的 \(h\) 或更高的 \(p\)，让优化信号更有针对性。

> 💡 关键：hp-VPINN 不是把每个子域都训练一个独立网络；论文的主设定仍是一个全局 DNN，只是 residual projection 和 loss 组织在局部元素上完成。

深层网络的积分项通常不能像浅层网络那样解析求值，因此论文使用 Gauss quadrature：

$$
\mathcal{R}^{(e)}_k
\approx
\sum_{m=1}^{Q}
w_m\,
\left(\mathcal{L}^{\mathbf{q}}u_{NN}(z_m)-f(z_m)\right)
v_k^{(e)}(z_m).
$$

当 PDE 含高阶导数时，可以对变分形式做一次或多次分部积分，把导数从 \(u_{NN}\) 转移到测试函数上，从而降低对神经网络高阶导数的要求。这也是弱形式方法相对强形式 PINN 的一个数值优势。

##### 与 PINN、VPINN 和传统有限元的区别

| 方法 | Trial function | Test / residual | 细化方式 | 主要特点 |
|------|----------------|-----------------|----------|----------|
| PINN | 全局 DNN | Dirac delta / collocation points | 采样点加密 | 简单通用，但点残差和损失权重敏感 |
| VPINN | 全局 DNN | 全局多项式测试函数 | 增加全局测试阶数 | 引入变分残差，但局部控制弱 |
| hp-VPINN | 全局 DNN | 子域上的分片高阶多项式 | \(h\) 域分解 + \(p\) 阶数提升 | 局部化优化信号，适合非光滑或局部复杂解 |
| 有限元 | 分片多项式 | 局部弱形式 | 标准 \(h/p\) 网格细化 | 线性/低阶 trial space 清晰，但不具备 DNN 的非线性全局表达 |

hp-VPINN 的定位可以理解为：保留 PINN 的神经网络 trial space，同时把有限元/Petrov-Galerkin 的局部测试空间和 hp-refinement 引入损失设计。它不是传统数值方法的直接替代，而是把“残差如何约束网络”从点约束升级成局部积分约束。

##### 实用限制

hp-VPINN 的额外精度来自更复杂的 loss。每个元素、每个测试函数、每个 quadrature point 都要计算 residual 和自动微分，训练成本可能高于标准 PINN。测试函数阶数、元素划分、quadrature 点数、边界项权重也会显著影响结果。对于高维问题，普通张量积 quadrature 会遇到维数灾难，论文也指出可考虑 quasi-Monte Carlo 或 sparse-grid quadrature。

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

### FNO

```yaml
id: fno
num: 19
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2021'
org: Caltech
parent: —
paper_url: https://openreview.net/forum?id=c8P9fhUhn9
project_url: ''
category: pde_solving
motivation: 频率域积分运算实现分辨率无关
```

#### 📝 一句话总结
FNO 将神经算子的全局积分核限制为卷积核，并直接在傅里叶频域学习低频模式上的线性变换，从而用同一组参数学习一族 PDE 的解算子，支持跨网格分辨率推理和 zero-shot super-resolution。

#### 🎯 核心要点
- **算子学习目标**：直接学习从输入函数 \(a(x)\) 到解函数 \(u(x)\) 的映射 \(\mathcal{G}: a \mapsto u\)，而不是为每个 PDE 实例重新优化一个网络
- **Lift-Fourier-Project 架构**：先用局部网络 \(P\) 将输入升维为通道特征 \(v_0(x)\)，堆叠多层 Fourier layer，再用局部网络 \(Q\) 投影回目标物理量
- **傅里叶层核心计算**：每层同时包含频域全局卷积分支 \(\mathcal{F}^{-1}(R_\phi \cdot \mathcal{F}(v))\) 和物理空间局部线性分支 \(Wv\)，二者相加后过非线性激活
- **低频模式截断**：只在前 \(k_{\max}\) 个 Fourier modes 上学习复值权重 \(R_\phi\)，高频直接过滤，计算由 FFT 主导
- **分辨率无关参数**：网络参数定义在连续 Fourier 基上，同一模型可在不同采样网格上训练/推理，论文展示了 Navier-Stokes 的 zero-shot super-resolution
- **代表基准**：Burgers 方程、Darcy flow 和 2D Navier-Stokes；在固定分辨率和跨分辨率设置中均优于 FCN、PCANN、GNO 等学习型求解器
- **数据驱动而非残差驱动**：原始 FNO 主要依赖数值求解器生成的输入-输出函数对训练，不要求显式把 PDE 残差写进损失

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 OpenReview 链接对应 ICLR 2021 论文；为了嵌入可直接访问的图片，这里使用同论文的 arXiv HTML 版本：https://ar5iv.labs.arxiv.org/html/2010.08895。

![FNO 总体架构与 Fourier layer](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/fourier_full_arch5.png)
*图：上半部分是 FNO 的 lift-Fourier-project 主干；下半部分展示 Fourier layer 中的 FFT、低频模式线性变换、逆 FFT 和局部线性分支。*

![FNO 在 Navier-Stokes 上的 zero-shot super-resolution](https://ar5iv.labs.arxiv.org/html/2010.08895/assets/figs/FourierNN_NV2.png)
*图：FNO 在 Navier-Stokes 涡量序列上用低分辨率数据训练，并在更高分辨率时间/空间网格上推理。*

##### 算法伪代码

```python
# FNO 前向传播伪代码，以规则网格上的 2D 场为例

def spectral_conv(v, R, modes):
    # v: [batch, nx, ny, channels]
    v_hat = rfft2(v)                         # 物理空间 -> Fourier 空间
    out_hat = zeros_like_selected_modes(v_hat)

    # 只学习低频 Fourier modes；R 是复值权重张量
    out_hat[:, :modes_x, :modes_y] = complex_matmul(
        v_hat[:, :modes_x, :modes_y],
        R
    )

    return irfft2(out_hat, spatial_shape=(nx, ny))

def fno_forward(a, grid):
    # 常见实现会把坐标 grid 与输入系数/初值拼接，帮助处理非周期边界
    v = P(concat(a, grid))                    # lift: d_a -> d_v

    for layer in fourier_layers:
        v_freq = spectral_conv(v, layer.R, layer.modes)
        v_local = pointwise_linear(v, layer.W)
        v = gelu(v_freq + v_local)            # 全局频域项 + 局部线性项

    u = Q(v)                                  # project: d_v -> d_u
    return u

for a_i, u_i in dataloader:
    pred = fno_forward(a_i, grid_i)
    loss = relative_l2(pred, u_i)
    optimizer.step(loss)
```

##### 从 PDE 解算到算子学习

传统数值求解器面对参数化 PDE 时，通常对每个新的初值、边界条件或系数字段 \(a\) 重新求解一次：

$$
\mathcal{P}(a, u)=0,\qquad u=\mathcal{G}(a).
$$

FNO 的目标不是学习一个单独的解函数 \(u_\theta(x)\)，而是学习整个解算子：

$$
\mathcal{G}_\theta: a(\cdot)\mapsto u(\cdot).
$$

训练数据是有限组函数对 \(\{(a_i, u_i)\}_{i=1}^N\)，常用经验风险可写为：

$$
\min_\theta
\frac{1}{N}\sum_{i=1}^{N}
\frac{\|\mathcal{G}_\theta(a_i)-u_i\|_2}{\|u_i\|_2}.
$$

这与 PINN 的“给定一个 PDE 实例后优化一个坐标网络”不同。FNO 训练一次后，新输入 \(a_\mathrm{new}\) 只需一次前向传播即可得到整场解，因此适合需要大量重复求解的代理模型、反问题采样和快速设计循环。

##### 神经算子层的数学形式

通用神经算子把隐藏函数 \(v_t(x)\) 迭代更新为：

$$
v_{t+1}(x)
=
\sigma\left(
W v_t(x)
+
(\mathcal{K}_\phi v_t)(x)
\right),
$$

其中 \(Wv_t(x)\) 是点态线性变换，\(\mathcal{K}_\phi\) 是非局部积分算子：

$$
(\mathcal{K}_\phi v)(x)
=
\int_D \kappa_\phi(x,y)v(y)\,dy.
$$

FNO 的关键约束是把核写成平移不变卷积核 \(\kappa_\phi(x-y)\)。根据卷积定理，卷积可以在频域变成逐模式线性乘法：

$$
(\mathcal{K}_\phi v)(x)
=
\mathcal{F}^{-1}
\left(
R_\phi \cdot \mathcal{F}(v)
\right)(x).
$$

实际实现只保留有限个低频模式：

$$
\hat{v}'(k)=
\begin{cases}
R_\phi(k)\hat{v}(k), & |k|\le k_{\max},\\
0, & |k|>k_{\max}.
\end{cases}
$$

直觉上，低频 Fourier modes 捕获解场的大尺度结构，非线性激活和后续层会重新混合模式并恢复部分高频信息。这样既避免在物理空间显式计算全局积分核的 \(O(n^2)\) 代价，又保留了长程相互作用建模能力。

##### 为什么能跨分辨率

CNN、FCN 这类有限维网络通常把输入看成固定大小数组，卷积核参数绑定在训练网格上；分辨率变化时，网络结构或插值策略往往需要调整。FNO 的参数 \(R_\phi(k)\) 绑定在 Fourier modes 上，而 Fourier 基函数可以在任意采样点 \(x\) 上评估。若输入函数在更细网格上采样，只需在该网格上做 FFT、取同样的低频 modes、应用同一组 \(R_\phi\)，再逆变换回物理空间。

> 💡 关键：FNO 的“分辨率无关”不是说训练数据无限精确，而是说模型参数不依赖某个固定网格尺寸；误差仍取决于训练分布、采样质量、模式截断和 PDE 本身的频谱复杂度。

##### Fourier layer 的两个分支为什么都需要

频域卷积分支提供全局感受野，任何位置的输出都能依赖整个输入场。这对椭圆型 PDE、不可压 Navier-Stokes 的压力/涡量耦合等非局部结构很重要。

局部线性分支 \(Wv(x)\) 则承担两类作用。第一，它像残差通道一样保留局部信息，避免所有信息都被低频截断过滤。第二，论文指出它帮助跟踪非周期边界或局部边界效应，使 FNO 不局限于严格周期问题。许多后续实现还会把坐标网格作为输入通道拼接进去，使网络知道点在域内的位置。

##### 与传统谱方法的区别

FNO 使用 FFT，但它不是传统意义上“把 PDE 变到频域后手写求解”。传统谱方法依赖已知 PDE 形式、边界条件和时间推进公式；FNO 则从数据中学习频域乘子 \(R_\phi\)，并通过多层非线性组合近似未知或复杂的解算子。

| 方法 | 学习/求解对象 | 是否每个实例重算 | 网格依赖 | 主要优势 |
|------|---------------|------------------|----------|----------|
| 有限差分/有限元 | 单个 PDE 实例的离散解 | 是 | 强 | 稳定、可解释、精度理论成熟 |
| PINN | 单个实例的连续解函数 | 通常是 | 弱 | 可利用 PDE 残差和少量观测 |
| CNN/FCN 代理模型 | 固定网格上的数组映射 | 否 | 强 | 工程实现简单 |
| FNO | 函数空间到函数空间的解算子 | 否 | 弱 | 全局建模、高效、可跨分辨率 |

##### 训练与推理流程

训练阶段通常先用可信数值求解器生成函数对，例如 Burgers 方程中的初值到末态，Darcy flow 中渗透率系数字段到压力场，Navier-Stokes 中初始涡量到后续涡量序列。模型在离散网格上看到的是数组，但优化目标对应的是函数误差的离散近似。

推理阶段给定新的 \(a(x)\)，FNO 只做一次前向传播。对时间相关问题，可以把时间维作为输出通道/网格维，也可以学习一步或多步演化算子再递推。论文中的 Navier-Stokes 例子强调：即使在较粗分辨率训练，模型也能在更细空间和时间网格上直接评估，表现为 zero-shot super-resolution。

> ⚠️ 注意：FNO 的 FFT 假设数据位于规则网格，因此原始 FNO 对复杂几何和非结构网格不够自然。后续 Geo-FNO、GNO、MeshGraphNets 等方法分别从坐标变换、图积分和网格图建模方向扩展这一限制。

#### 🧪 练习题
```yaml
question: "FNO 中 Fourier layer 的主要设计目的是什么？"
options:
  - "用可学习低频 Fourier 模式近似全局卷积积分算子，并通过 FFT 提高效率"
  - "把 PDE 残差强制为 0，从而不需要任何训练数据"
  - "只保留物理空间中的局部卷积，避免任何频域计算"
  - "为每个新的 PDE 参数重新训练一个坐标 MLP"
answer: 0
explain: "FNO 的核心是把积分核限制为卷积并在 Fourier 空间学习低频线性变换；FFT 让全局算子计算近似达到准线性复杂度。"
```

### DeepONet

```yaml
id: deeponet
num: 20
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: 宾大
parent: —
paper_url: https://www.nature.com/articles/s42256-021-00302-5
project_url: ''
category: pde_solving
motivation: 双分支架构学习函数空间映射
```

#### 📝 一句话总结
DeepONet 将算子近似写成“输入函数编码”和“输出位置编码”的内积：branch net 编码传感器上的输入函数值，trunk net 编码查询坐标 \(y\)，从而把通用算子逼近定理落到可训练的深度网络架构中。

#### 🎯 核心要点
- **算子输入离散化**：用固定传感器位置 \(x_1,\dots,x_m\) 上的函数值 \([u(x_1),\dots,u(x_m)]\) 表示输入函数 \(u\)
- **双分支结构**：branch net 处理输入函数采样值，trunk net 处理输出函数的查询位置 \(y\)，二者输出同维向量后做点积
- **连续输出查询**：训练后可在任意输出位置 \(y\) 评估 \(\mathcal{G}(u)(y)\)，不要求所有输出点落在固定规则网格上
- **stacked 与 unstacked 版本**：stacked DeepONet 使用多个并行 branch nets，unstacked DeepONet 用一个 branch net 一次性输出全部系数，计算和存储更高效
- **核心公式**：\(\mathcal{G}_\theta(u)(y)=\sum_{k=1}^{p} b_k(u(x_1),...,u(x_m))\,t_k(y)+b_0\)
- **理论来源**：基于非线性连续算子的通用逼近定理，并扩展到深层 branch/trunk 子网络
- **代表任务**：antiderivative operator、非线性 ODE/重力摆、带源项扩散-反应 PDE 等，论文系统考察传感器数量、数据量、网络宽度和输入函数空间复杂度对误差的影响

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 Nature Machine Intelligence 链接是正式发表版本；为了获得可直接嵌入的图示和公式上下文，这里参考作者公开 arXiv/html 版本：https://ar5iv.labs.arxiv.org/html/1910.03193，以及论文代码仓库：https://github.com/lululxvi/deeponet。

![DeepONet 问题设置、stacked 与 unstacked 架构](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：DeepONet 的输入由函数传感器值和查询位置组成；stacked 版本包含多个 branch nets，unstacked 版本用一个 branch net 输出全部系数。*

##### 算法伪代码

```python
# Unstacked DeepONet 训练伪代码

def deeponet_forward(sensor_values, y):
    """
    sensor_values: [batch, m]，输入函数 u 在固定传感器 x_1...x_m 的取值
    y:             [batch, d_y]，输出函数的查询坐标
    """
    b = branch_net(sensor_values)     # [batch, p]
    t = trunk_net(y)                  # [batch, p]
    out = sum(b * t, axis=-1) + bias  # G_theta(u)(y)
    return out

for batch in dataloader:
    # 每条样本可来自同一个输入函数 u 的多个输出查询点 y
    sensor_values = batch["u_at_sensors"]
    query_y = batch["query_location"]
    target = batch["G_u_at_y"]

    pred = deeponet_forward(sensor_values, query_y)
    loss = mean((pred - target) ** 2)
    optimizer.step(loss)

# 推理时固定一个输入函数 u，只改变 y，就能连续查询整条输出函数
sensor_values = evaluate_input_function(u_new, sensors)
solution_curve = [deeponet_forward(sensor_values, y) for y in query_grid]
```

##### 从通用逼近定理到网络结构

DeepONet 的起点是算子学习：给定一个非线性连续算子

$$
\mathcal{G}: u \mapsto \mathcal{G}(u),
$$

希望对任意输入函数 \(u\) 和任意输出位置 \(y\)，预测标量或向量值 \(\mathcal{G}(u)(y)\)。由于神经网络无法直接接收无限维函数，论文采用传感器离散化：

$$
u \quad \longrightarrow \quad
\left[u(x_1),u(x_2),\dots,u(x_m)\right].
$$

通用算子逼近定理表明，在合适紧集和连续性条件下，可以用有限个“输入函数相关系数”和“输出位置相关基函数”的组合逼近 \(\mathcal{G}(u)(y)\)。DeepONet 把这个结构参数化为：

$$
\mathcal{G}_\theta(u)(y)
=
\sum_{k=1}^{p}
b_k\left(u(x_1),\dots,u(x_m)\right)
t_k(y)
b_0.
$$

这里 \(b_k\) 由 branch net 输出，表示“这个输入函数激活了哪些算子基”；\(t_k(y)\) 由 trunk net 输出，表示“在查询位置 \(y\) 上这些基函数取什么值”。二者内积就是预测。

##### Branch net 与 trunk net 的分工

Branch net 的输入维度固定为传感器数量 \(m\)，它不关心输出位置。它的工作类似于把整条输入函数压缩成一组系数：

$$
\mathbf{b}(u)=
\left[
b_1(u),\dots,b_p(u)
\right].
$$

Trunk net 的输入是输出坐标 \(y\)，它不关心当前是哪一个输入函数。它产生位置相关的表示：

$$
\mathbf{t}(y)=
\left[
t_1(y),\dots,t_p(y)
\right].
$$

最终输出为：

$$
\mathcal{G}_\theta(u)(y)
=
\mathbf{b}(u)^\top \mathbf{t}(y)+b_0.
$$

这种分解非常像低秩函数展开，但系数和基函数都由深度网络学习，而且可以表示非线性算子。它的优势是把“函数身份”和“空间/时间位置”分开建模，因此同一个输入函数可对应多个输出查询点，同一个 trunk net 也可服务不同输入函数。

##### stacked 与 unstacked DeepONet

论文从定理结构出发提出 stacked DeepONet：每个输出通道 \(b_k\) 可以由一个独立 branch net 产生，所有 branch nets 与同一个 trunk net 相乘求和。这样最贴近理论表达，但当 \(p\) 较大时计算和显存都很重。

Unstacked DeepONet 将多个 branch nets 合并为一个网络，一次性输出向量 \(\mathbf{b}\)。实践中 \(p\) 往往至少几十，因此 unstacked 版本更常用。论文实验中也观察到 unstacked DeepONet 通常具有更小的泛化误差和更稳定的训练表现。

> 💡 关键：DeepONet 的点积不是简单的 late fusion 技巧，而是把算子近似写成“输入函数决定展开系数、输出坐标决定基函数值”的结构化归纳偏置。

##### 数据组织方式

DeepONet 对训练数据的要求比图像到图像模型宽松。对每个输入函数 \(u_i\)，传感器位置 \(x_1,\dots,x_m\) 要保持一致，使 branch net 的输入维度稳定；但输出查询点 \(y_{ij}\) 不必固定，也不必是规则网格。训练样本可以写成：

$$
\left(
\left[u_i(x_1),\dots,u_i(x_m)\right],
y_{ij},
\mathcal{G}(u_i)(y_{ij})
\right).
$$

这让 DeepONet 很适合处理 scattered observations、不同空间点上的 PDE 解查询、或者时间连续动力系统输出。对一个输入函数 \(u_i\)，采样更多 \(y_{ij}\) 会增加该函数的输出监督密度；采样更多不同 \(u_i\) 则提升对输入函数分布的覆盖。

##### 与 FNN/CNN 直接拼接的区别

一种朴素做法是把 \([u(x_1),...,u(x_m),y]\) 直接拼接后送入普通 FNN。论文指出，这样虽然理论上也可能近似目标函数，但没有利用算子结构，泛化误差往往更大。

DeepONet 的结构把问题拆成两个子问题：branch net 学“输入函数属于什么样的 forcing/initial condition/parameter field”，trunk net 学“输出位置上的响应模式”。这种分工使模型对不同 \(y\) 的共享更强，也使同一输入函数的多个查询点能共同约束一组 branch 系数。

| 方法 | 输入表示 | 输出位置处理 | 适用限制 |
|------|----------|--------------|----------|
| FNN 直接拼接 | \([u(x_1),...,u(x_m),y]\) | 与函数值混在一起建模 | 归纳偏置弱，泛化通常较差 |
| CNN image-to-image | 规则网格数组 | 固定输出网格 | 难处理 scattered sensors 和任意查询点 |
| DeepONet | branch 编码函数，trunk 编码位置 | 任意 \(y\) 连续查询 | 传感器数量和位置设计会影响精度 |

##### 误差来源与传感器数量

DeepONet 的误差可以从三方面理解。第一是输入函数离散化误差：传感器太少时，\([u(x_i)]\) 无法充分代表复杂函数。第二是网络近似和优化误差：branch/trunk 宽度、深度和训练超参数会限制可表达性。第三是泛化误差：训练函数样本数量不足时，新函数上的预测会不稳定。

论文系统研究了传感器数 \(m\)、训练样本数和输入函数空间复杂度。直觉上，输入函数越高频、越粗糙，固定传感器越难捕获其形状，因此需要更大的 \(m\)。这也是 DeepONet 与 FNO 的一个实际差异：DeepONet 的输入端依赖传感器设计，而 FNO 更偏向规则网格上的全场频域表示。

##### PDE 示例：扩散-反应系统

论文的 PDE 示例之一是带源项的扩散-反应系统，目标是学习从源项函数 \(u(x,t)\) 到 PDE 解 \(s(x,t)\) 的算子：

$$
\mathcal{G}: u(x,t)\mapsto s(x,t).
$$

训练时先用有限差分求解器在 \(100\times 100\) 网格上生成参考解，再从每个输入源项对应的输出解中抽取若干随机查询点作为监督。DeepONet 不需要把整张 \(100\times 100\) 解场一次性作为输出；每个训练样本只需一个或多个查询点 \((x,t)\) 和对应的解值。这种数据组织方式解释了它为什么适合不规则观测和多查询推理。

> ⚠️ 注意：DeepONet 本身不自动保证 PDE 残差为零。若训练数据来自高精度数值解，它学习的是数据驱动的解算子；若要显式加入物理约束，需要使用 physics-informed DeepONet 等后续变体。

#### 🧪 练习题
```yaml
question: "标准 DeepONet 中 branch net 和 trunk net 分别负责什么？"
options:
  - "branch net 编码输入函数的传感器值，trunk net 编码输出查询位置"
  - "branch net 计算 PDE 残差，trunk net 计算边界条件误差"
  - "branch net 只处理时间维度，trunk net 只处理频率维度"
  - "branch net 是优化器，trunk net 是数值求解器"
answer: 0
explain: "DeepONet 的核心结构是 branch net 输出输入函数相关系数，trunk net 输出位置相关基函数值，二者点积得到 G(u)(y)。"
```

### Brax

```yaml
id: brax
num: 21
name: Brax
full_name: JAX刚体引擎 (Brax)
year: '2021'
org: Google
parent: jax_md
paper_url: https://github.com/google/brax
project_url: ''
category: fluid_simulation
motivation: 高性能刚体动力学引擎
```

#### 📝 一句话总结
Brax 是用 JAX 编写的可微分刚体仿真与强化学习环境库，通过 JIT 编译、批量向量化和多设备并行，把大量环境步进和策略优化放到同一 GPU/TPU 上执行，大幅降低 RL 训练中的仿真吞吐瓶颈。

#### 🎯 核心要点
- **JAX 原生物理引擎**：仿真状态、环境 step、奖励计算和 RL 更新都可表示为 JAX 函数，直接使用 `jit`、`vmap`、`pmap` 和自动微分
- **最大坐标刚体表示**：每个刚体独立跟踪位置、旋转、线速度和角速度，论文中的核心状态数据结构称为 QP
- **批量并行设计**：QP 等状态张量带有环境批量维和物体维，使上千个独立环境可以在一个 accelerator 上并行 step
- **减少分支的接触建模**：用连续函数近似碰撞/接触逻辑，或把静态分支提前到 JIT 编译期，提升 SIMD/SIMT 设备上的执行一致性
- **同设备训练闭环**：PPO、SAC、ES 和 analytic policy gradients 等算法可与环境一起编译，避免传统 CPU 仿真器与 GPU 学习器之间的数据搬运
- **基准环境套件**：初始论文包含 Ant、Fetch、Grasp、HalfCheetah、Humanoid 等 MuJoCo/Gym 风格任务
- **性能目标**：单个现代 accelerator 上达到数百万 physics steps/s，多 accelerator 扩展到更高吞吐，Google Research 博客报告训练加速约 \(100\times\) 到 \(1000\times\)

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 `paper_url` 是 Brax GitHub 项目页。方法细节主要参考论文 arXiv/html 版本：https://ar5iv.labs.arxiv.org/html/2106.13281，当前项目说明参考 GitHub README：https://github.com/google/brax。arXiv HTML 页面中若干 `overpic` 图没有转换成可直接嵌入的图片，因此下图使用 Google Research 官方博客的公开图源。

![Brax 将仿真和学习放在同一 accelerator 上](https://1.bp.blogspot.com/-Za-dyrqXP24/YPBB_LLLRHI/AAAAAAAAH48/2R922TQkSwsh38UEPztNA86DqAZqAMBfACLcBGAsYHQ/w640-h326/image1.gif)
*图：传统工作站、分布式仿真和 Brax 工作流对比。Brax 的关键是让大批量仿真和学习器在同一 GPU/TPU 上并排运行。*

![Brax 刚体仿真步进示意](https://1.bp.blogspot.com/-xzTE4RTKkHg/YPBCTEmN4CI/AAAAAAAAH5E/vgQLCCI-eKw93j46VtHAyVtgLAde7M0MgCLcBGAsYHQ/w640-h440/image9.png)
*图：三个球体、墙、关节和执行器组成的 Brax 示例；每个 timestep 计算力和力矩并更新刚体位置、旋转和速度。*

##### 算法伪代码

```python
# Brax 风格的批量环境 step 与训练循环伪代码

@jax.jit
def physics_step(sys, qp, action, rng):
    # qp 保存每个刚体的位置、姿态、线速度、角速度
    force_act = actuator_forces(sys, qp, action)
    force_joint = joint_constraints(sys, qp)
    force_contact = contact_forces_branch_free(sys, qp)
    force_gravity = gravity(sys, qp)

    total_force = force_act + force_joint + force_contact + force_gravity
    qp_next = integrate_rigid_bodies(qp, total_force, sys.dt)
    return qp_next

@jax.jit
def env_step(state, action, rng):
    qp_next = physics_step(state.sys, state.qp, action, rng)
    obs_next = observe(qp_next)
    reward = reward_fn(state.qp, qp_next, action)
    done = termination_fn(qp_next)
    return state.replace(qp=qp_next, obs=obs_next), reward, done

# vmap 让一个函数同时跑成千上万个独立环境
batched_env_step = jax.vmap(env_step, in_axes=(0, 0, 0))

@jax.jit
def train_update(train_state, env_states, rngs):
    actions = policy(train_state.params, env_states.obs)
    env_states, rewards, dones = batched_env_step(env_states, actions, rngs)
    loss = rl_loss(train_state.params, env_states, rewards, dones)
    grads = jax.grad(loss_fn)(train_state.params)
    train_state = optimizer_update(train_state, grads)
    return train_state, env_states
```

##### 刚体状态：QP 数据结构

Brax 论文把物理系统写在最大坐标系中：场景里的每个可运动刚体都独立维护自己的动态状态。简化表示为：

$$
\mathrm{QP}_i(t)
=
\left(
x_i(t),\ q_i(t),\ v_i(t),\ \omega_i(t)
\right),
$$

其中 \(x_i\) 是位置，\(q_i\) 是旋转姿态四元数，\(v_i\) 是线速度，\(\omega_i\) 是角速度。一个批量仿真张量通常带有形如：

$$
[\text{num_envs},\ \text{num_bodies},\ \text{state_dim}]
$$

的前导维度。这一点很关键：Brax 不是在 Python 循环里逐个环境 step，而是把环境批量维交给 XLA 编译器和 accelerator。

##### 物理 step 的核心计算

一个 timestep 可以抽象成：

$$
F_t
=
F_\mathrm{act}(s_t,a_t)
+F_\mathrm{joint}(s_t)
+F_\mathrm{contact}(s_t)
+F_g,
$$

$$
v_{t+\Delta t}
=
v_t+\Delta t\,M^{-1}F_t,
\qquad
x_{t+\Delta t}
=
x_t+\Delta t\,v_{t+\Delta t}.
$$

旋转部分同理需要根据转动惯量、力矩和角速度更新四元数。论文强调的工程设计不是提出一种全新的刚体动力学方程，而是把执行器、关节、碰撞和积分步骤组织成 JAX 可编译的张量变换。

接触处理尤其影响 accelerator 性能。传统物理引擎常有大量 “if contact then resolve collision” 的离散分支，不同环境在同一步会走不同代码路径。Brax 尽量用连续近似替代硬分支，例如把几何接触写成 signed distance \(\phi\) 的函数：

$$
F_\mathrm{contact}
\approx
k\,\max(0,-\phi)\,n
-c\,v_n,
$$

其中 \(\phi<0\) 表示穿透，\(n\) 是接触法向，\(v_n\) 是法向相对速度。实际实现会包含稳定性和约束细节；这个式子表达的是“用连续张量计算近似接触力”的核心直觉。

##### 为什么 JAX 改变 RL 仿真吞吐

传统 RL 工作流常把环境仿真放在 CPU 进程里，把策略网络训练放在 GPU/TPU 上。每个 rollout 周期都要在仿真器、队列、序列化格式和学习器之间搬运观测、动作和奖励。Brax 的设计把环境 step 也变成 JAX 函数，使下面的组合成为可能：

$$
\text{rollout}
=
\mathrm{scan}\left(
s_{t+1}=f_\mathrm{Brax}(s_t,\pi_\theta(o_t))
\right),
$$

并且整个 rollout 可被 `jit` 编译、可被 `vmap` 批量化、可被 `pmap` 分发到多个设备。这样，环境吞吐不再主要受 Python 调度和 CPU-GPU 通信限制。

> 💡 关键：Brax 的“快”主要来自系统设计：纯 JAX 张量程序、编译期优化、大批量并行和同设备训练闭环，而不是单独某个动力学公式的改变。

##### 强化学习算法如何嵌入

论文随引擎提供了 PPO、SAC、ES 和 analytic policy gradients。以 PPO 为例，Brax 可以先在 accelerator 上并行收集 rollout，再直接计算裁剪目标：

$$
L^\mathrm{CLIP}(\theta)
=
\mathbb{E}_t
\left[
\min
\left(
r_t(\theta)\hat{A}_t,
\mathrm{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t
\right)
\right],
$$

其中：

$$
r_t(\theta)
=
\frac{\pi_\theta(a_t|s_t)}
{\pi_{\theta_\mathrm{old}}(a_t|s_t)}.
$$

对可微仿真更直接的用法是 analytic policy gradient。若奖励和物理 step 都可微，可将短轨迹目标写成：

$$
J(\theta)
=
\sum_{t=0}^{H-1}
r\left(s_t,\pi_\theta(s_t)\right),
\qquad
s_{t+1}
=
f_\mathrm{Brax}\left(s_t,\pi_\theta(s_t)\right),
$$

然后通过自动微分计算 \(\nabla_\theta J(\theta)\)。论文也谨慎指出，长轨迹可微优化容易遇到局部最小值和梯度稳定性问题，因此 APG 在初版中更多是证明能力，而 PPO/SAC/ES 是更成熟的训练路径。

##### 与 MuJoCo/Gym 工作流的区别

| 维度 | 传统 MuJoCo/Gym 常见工作流 | Brax |
|------|-----------------------------|------|
| 仿真位置 | 多在 CPU 进程或分布式 worker | GPU/TPU 上的 JAX 程序 |
| 并行方式 | 多进程、线程或集群调度 | `vmap`/`pmap` 批量张量并行 |
| 与学习器通信 | 观测/动作/奖励跨设备或跨进程搬运 | 环境和策略更新可在同设备闭环 |
| 可微性 | 引擎通常作为黑盒使用 | step 函数可参与自动微分 |
| 主要取舍 | 物理逼真度和生态成熟 | 吞吐、可编译性、可微和快速实验 |

这也是 Brax 在 AI4Physics 中的定位：它不是 PDE 求解器，而是面向刚体控制、机器人和强化学习的高吞吐仿真平台。它把“物理环境”变成可微、可批量化的机器学习组件。

##### 来源限制与当前项目状态

论文和 Google Research 博客描述的是 2021 年 Brax 初始设计。GitHub README 的当前说明显示，Brax 后续演化出多个 physics pipelines，包括 MJX、Generalized、Positional 和 Spring，并提示较新的维护重点更多放在 `brax/training` 以及与 MJX/MuJoCo Playground 相关的训练流程上。因此，本文的方法解读以 2021 论文中的原始 Brax 设计为主，同时把 GitHub README 作为项目现状来源。

> ⚠️ 注意：Brax 为了大规模并行和可微性做了工程取舍。若任务要求最高物理保真度、复杂接触稳定性或严格 sim-to-real，一般需要进一步验证与 MuJoCo、MJX、Isaac Gym 等引擎的差异。

#### 🧪 练习题
```yaml
question: "Brax 相比传统 CPU 物理引擎在 RL 训练中的核心优势是什么？"
options:
  - "把环境 step、批量 rollout 和策略优化写成 JAX 程序，在同一 accelerator 上编译并并行执行"
  - "完全省略碰撞、关节和执行器计算，只保留奖励函数"
  - "通过 Fourier 变换求解刚体动力学方程"
  - "每个环境使用一个独立 Python 进程以提高可解释性"
answer: 0
explain: "Brax 的关键优势来自 JAX 原生实现、批量向量化、JIT 编译和同设备训练闭环，从而显著减少仿真吞吐和数据搬运瓶颈。"
```

### CANNs

```yaml
id: canns
num: 22
name: CANNs
full_name: 本构神经网络 (Constitutive Artificial Neural Networks)
year: '2021'
org: ETH Zurich
parent: —
paper_url: https://doi.org/10.1016/j.jcp.2020.109841
project_url: ''
category: solid_mechanics
motivation: 应变能密度嵌入确保本构稳定
```

#### 📝 一句话总结
CANNs 将超弹性材料的应变能密度 \(\Psi\) 作为神经网络输出，再通过连续介质力学关系自动微分得到应力，使模型在训练时直接尊重客观性、参考态零能量、结构张量和不可压缩约束等本构建模先验。

#### 🎯 核心要点
- **以能量为中心**：网络学习 \(\Psi(\mathbf{F}, \text{extra})\)，而不是直接黑箱拟合应力，第一 Piola-Kirchhoff 应力由 \( \mathbf{P}=\partial \Psi / \partial \mathbf{F} \) 生成
- **连续介质先验硬编码**：由变形梯度 \(\mathbf{F}\) 计算右 Cauchy-Green 张量 \(\mathbf{C}\)、广义结构张量 \(\mathbf{H}_r\)、广义不变量 \(I_r,J_r,I_3\)
- **支持各向同性与各向异性**：无偏好方向时退化为各向同性不变量网络；有额外微结构特征时，方向子网络和权重子网络生成偏好方向与结构张量权重
- **参考态归零**：用同一 \(\Psi\) 网络计算参考构型能量并相减，强制 \(\Psi(\mathbf{I})=0\)
- **不可压缩处理**：对不可压缩材料加入拉格朗日乘子项，从等容应力中扣除压力自由度，得到满足边界条件的 \(\mathbf{P}\)
- **训练目标简洁**：论文/代码示例用单轴曲线的 \(P_{11}\) 均方误差训练，但完整模型可输出 \(\Psi,\mathbf{P},\mathbf{S},\boldsymbol{\sigma}\)
- **多源信息融合**：能够同时利用应力-应变数据、材料理论先验和微结构/加工等额外特征，提高少数据下的泛化

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 DOI `10.1016/j.jcp.2020.109841` 与公开 CANN 记录不一致；TUHH 机构库和官方代码仓库均指向 Journal of Computational Physics 429:110010，Publisher DOI 为 `10.1016/j.jcp.2020.110010`。本文方法解读以 TUHH 论文记录 https://tore.tuhh.de/entities/publication/33f32797-d1c3-452e-95a2-5e3709e4d1d7 和官方代码仓库 https://github.com/ConstitutiveANN/CANN 为可访问来源，同时保留上方 YAML 中的任务元信息不改动。

![CANN 完整模型图](https://raw.githubusercontent.com/ConstitutiveANN/CANN/master/output/GeneralizedMooneyRivlin/GeneralizedMooneyRivlin_modelGraph_Full.png)
*图：官方仓库输出的 Generalized Mooney-Rivlin 示例模型图。图中先由 \(\mathbf{F}\) 计算不变量，再经 \(\Psi\) 子网络得到应变能，最后用自动微分和连续介质公式生成应力。*

![CANN 示例拟合结果](https://raw.githubusercontent.com/ConstitutiveANN/CANN/master/output/GeneralizedMooneyRivlin/GeneralizedMooneyRivlin_result.png)
*图：官方仓库中 Generalized Mooney-Rivlin 数据的主曲线结果，用于展示 CANN 对应力-伸长曲线的拟合。*

##### 算法伪代码

```python
# CANN 超弹性本构建模伪代码
def build_generalized_invariants(F, extra=None):
    C = transpose(F) @ F
    I3 = det(C)

    if extra is None:
        # 各向同性: 只使用单位结构张量 H0 = I / 3
        H = [eye(3) / 3.0]
    else:
        # 各向异性: 由微结构/材料额外特征预测偏好方向和权重
        dirs = normalize(direction_net(extra))        # l_i
        L = [outer(l_i, l_i) for l_i in dirs]         # L_i = l_i \otimes l_i
        weights = normalize_sum(weight_net(extra))    # w_ri
        H = [sum(w_ri * L_i for i, L_i in enumerate([eye(3)/3] + L))
             for r in range(num_tensors)]

    I = [trace(C @ H_r) for H_r in H]
    J = [trace(cofactor(C) @ H_r) for H_r in H]
    return I, J, I3

def cann_forward(F, extra=None, incompressible=True):
    I, J, I3 = build_generalized_invariants(F, extra)
    I0, J0, I30 = build_generalized_invariants(eye(3), extra)

    psi = psi_net(I, J, I3, extra)
    psi_ref = psi_net(I0, J0, I30, extra)
    psi = psi - psi_ref                         # enforce Psi(reference)=0

    P_iso = autodiff_grad(psi, F)               # dPsi / dF
    if incompressible:
        P_ref = autodiff_grad(psi_ref, eye(3))
        pressure = P_ref[0, 0]
        P = P_iso - pressure * inverse(transpose(F))
    else:
        P = P_iso

    S = inverse(F) @ P
    sigma = (P @ transpose(F)) / det(F)
    return psi, P, S, sigma

for batch in stress_strain_data:
    _, P, _, _ = cann_forward(batch.F, batch.extra)
    loss = mean((P[:, 0, 0] - batch.P11_target) ** 2)
    optimizer.step(loss)
```

##### 方法机制解释

普通 ANN 做材料本构时，最直接的做法是把应变或变形梯度输入网络，让网络直接输出应力。这种做法虽然灵活，但会把客观性、参考构型、材料对称性、应力由能量导出等物理结构交给数据自己“学出来”。CANNs 的核心判断是：本构建模并不是任意函数逼近问题，超弹性材料的应力应该来自一个应变能势函数。因此网络先学习标量能量 \(\Psi\)，再由力学公式生成张量应力。

基本变形测度从变形梯度开始：

$$
\mathbf{C}=\mathbf{F}^{\mathsf{T}}\mathbf{F}, \qquad
I_3=\det(\mathbf{C}).
$$

对各向异性材料，CANN 不直接把所有张量分量丢给 MLP，而是构造结构张量。若方向子网络输出单位向量 \(\mathbf{l}_i\)，则

$$
\mathbf{L}_i=\mathbf{l}_i\otimes\mathbf{l}_i.
$$

再用权重子网络给出归一化权重 \(w_{ri}\)，形成广义结构张量：

$$
\mathbf{H}_r=\sum_i w_{ri}\mathbf{L}_i,
\qquad
\sum_i w_{ri}=1.
$$

这样网络不是随意编码“方向”，而是以材料结构张量进入不变量。对应广义不变量为：

$$
I_r=\operatorname{tr}(\mathbf{C}\mathbf{H}_r),
\qquad
J_r=\operatorname{tr}(\operatorname{cof}(\mathbf{C})\mathbf{H}_r).
$$

\(\Psi\) 子网络以 \(\{I_r\},\{J_r\},I_3\) 以及可选的额外材料特征为输入。官方实现中，\(\Psi\) 子网络对 \(I\) 与 \(J\) 分支使用 softplus 激活，再拼接并线性输出标量能量。参考态能量通过同一个网络在 \(\mathbf{F}=\mathbf{I}\) 上评估：

$$
\Psi_{\text{CANN}}(\mathbf{F})
=
\Psi_\theta(I,J,I_3,\text{extra})
-
\Psi_\theta(I_0,J_0,I_{3,0},\text{extra}).
$$

这一步很重要：它不依赖数据额外告诉模型“参考态能量为零”，而是在架构层面把 \(\Psi(\mathbf{I})=0\) 写进去。

随后应力由自动微分给出：

$$
\mathbf{P}_{\text{iso}}
=
\frac{\partial \Psi_{\text{CANN}}}{\partial \mathbf{F}}.
$$

对不可压缩材料，需要扣除压力型约束项。官方实现用参考构型的等容应力估计拉格朗日乘子 \(p\)，并构造：

$$
\mathbf{P}
=
\mathbf{P}_{\text{iso}}
-p\mathbf{F}^{-\mathsf{T}}.
$$

之后可以继续得到第二 Piola-Kirchhoff 应力与 Cauchy 应力：

$$
\mathbf{S}=\mathbf{F}^{-1}\mathbf{P},
\qquad
\boldsymbol{\sigma}
=
\frac{1}{J}\mathbf{P}\mathbf{F}^{\mathsf{T}},
\qquad
J=\det(\mathbf{F}).
$$

> 💡 关键：CANN 的“物理嵌入”不是简单给 loss 加正则项，而是改变函数参数化。网络只能通过应变能势函数、结构张量和不变量产生应力，因此输出空间天然比黑箱 ANN 更接近可接受本构模型。

训练时，论文/代码中的单轴示例只用 \(P_{11}\) 与目标曲线做 MSE：

$$
\mathcal{L}(\theta)
=
\frac{1}{N}\sum_{n=1}^N
\left(
P_{11,\theta}^{(n)}-P_{11,\text{data}}^{(n)}
\right)^2.
$$

这看起来只监督了一个应力分量，但因为 \(P_{11}\) 是从同一个 \(\Psi_\theta\) 自动微分而来，训练信号会反向更新整个能量网络。完整模型在推理时仍然能输出 \(\Psi,\mathbf{P},\mathbf{S},\boldsymbol{\sigma}\)，这比直接拟合某个加载路径上的标量应力更适合嵌入有限元材料点计算。

与普通材料网络相比，CANN 的优势来自三个层次。第一，输入层使用 \(\mathbf{C}\) 和不变量，降低了旋转坐标系变化带来的学习负担。第二，网络输出的是能量，保证应力与切线来自同一势函数，避免不同应力分量互相矛盾。第三，额外特征通过方向和权重子网络影响结构张量，使微结构信息能改变材料各向异性，而不是只作为普通标量标签拼到末端。

#### 🧪 练习题
```yaml
question: "CANNs 为什么先学习应变能密度 Psi，而不是直接输出应力张量？"
options:
  - "因为应变能是标量，训练速度一定比所有张量模型快"
  - "因为应力可由 Psi 对变形梯度自动微分得到，从架构上嵌入超弹性本构关系"
  - "因为这样可以完全不需要应力-应变训练数据"
  - "因为结构张量只能从应力张量计算，不能从变形梯度计算"
answer: 1
explain: "CANN 的核心是用 Psi 作为势函数并通过 P=dPsi/dF 生成应力，使模型满足能量一致的本构结构；它仍然需要数据训练 Psi 网络参数。"
```

### TANNs

```yaml
id: tanns
num: 23
name: TANNs
full_name: 热力学神经网络 (Thermodynamics-based ANNs)
year: '2021'
org: 希腊国立理工
parent: —
paper_url: https://doi.org/10.1016/j.jmps.2020.104277
project_url: ''
category: solid_mechanics
motivation: 强制热力学定律模拟粘塑性
```

#### 📝 一句话总结
TANNs 把热力学第一定律和第二定律写进材料点神经网络架构：网络预测自由能与耗散率等标量，再通过自动微分硬连接应力和内变量演化，从而让粘塑性/弹塑性预测在未见加载路径上仍保持热力学一致。

#### 🎯 核心要点
- **面向材料点本构**：针对 strain-rate independent processes，在增量加载下预测应力、内变量、自由能与耗散率
- **两类标量函数驱动**：以 Helmholtz free-energy \(\mathsf{F}\) 和机械耗散率 \(\mathsf{D}\) 为核心输出，其他本构量由它们的导数关系得到
- **自动微分硬连接**：用 reverse-mode autodiff 计算网络输出对输入的导数，将应力、内变量和热力学约束内嵌到网络图中
- **热力学一致性**：第二定律要求 \(\mathsf{D}\ge 0\)，第一定律给出自由能导数与应力/内变量之间的关系
- **比黑箱 ANN 更强泛化**：标准 ANN 可能在训练数据一致时仍产生热力学不一致预测；TANN 因架构受限，在未见增量范围和循环加载中更稳健
- **需要额外标量监督**：相比只监督应力的 ANN，TANN 训练数据通常还需要自由能和耗散率，这些量可从微观力学仿真或部分实验中获得
- **激活函数有特殊要求**：由于训练中会用到输出关于输入的导数，论文强调避免二阶导数消失的激活函数问题

#### 🔬 深入细节
##### 核心示意图

论文 DOI 对应 Journal of the Mechanics and Physics of Solids 147:104277；可访问版本为 arXiv: https://arxiv.org/abs/2005.12183 和 ar5iv HTML: https://ar5iv.labs.arxiv.org/html/2005.12183。下图来自 ar5iv 版 Figure 1(c)，展示 informed neural network 将导数关系放进计算图，而不是只做黑箱输入输出拟合。

![TANN informed neural network 示意图](https://ar5iv.labs.arxiv.org/html/2005.12183/assets/x3.png)
*图：TANN 的 informed neural network 思路。灰色节点是输入，黑色节点是输出，中间通过自动微分建立自由能、耗散率、应力和内变量之间的关系。*

##### 算法伪代码

```python
# TANN 材料点增量本构训练伪代码
def tann_forward(eps_t, delta_eps, zeta_t):
    # 状态输入: 当前应变、应变增量、当前内变量
    I = concat(eps_t, delta_eps, zeta_t)

    # 网络直接预测热力学标量
    F_free = free_energy_net(I)          # Helmholtz free energy
    D_diss = softplus(dissipation_net(I))  # enforce D >= 0

    # 由自动微分得到本构相关导数
    dF_deps = grad(F_free, eps_t)
    dF_dzeta = grad(F_free, zeta_t)
    dD_dzeta_rate = grad(D_diss, delta_eps)

    # 根据热力学关系生成应力和内变量更新
    sigma = stress_relation(dF_deps, D_diss, delta_eps)
    delta_zeta = flow_relation(dF_dzeta, dD_dzeta_rate)
    zeta_next = zeta_t + delta_zeta

    return {
        "F": F_free,
        "D": D_diss,
        "sigma": sigma,
        "zeta_next": zeta_next,
    }

for batch in material_point_paths:
    pred = tann_forward(batch.eps_t, batch.delta_eps, batch.zeta_t)
    loss = (
        mse(pred["sigma"], batch.sigma_target)
        + mse(pred["zeta_next"], batch.zeta_target)
        + mse(pred["F"], batch.free_energy_target)
        + mse(pred["D"], batch.dissipation_target)
    )
    optimizer.step(loss)
```

##### 热力学约束从哪里来

TANN 的出发点是，材料本构不应只是 \((\varepsilon^t,\Delta\varepsilon)\mapsto\Delta\sigma\) 的黑箱映射。热力学第一定律要求能量收支一致，第二定律要求熵产生或机械耗散非负。论文在等温材料点设置中把这些约束转化为网络内部关系。

局部 Clausius-Duhem 不等式可简化为机械耗散非负：

$$
\mathsf{D}\ge 0.
$$

对含内变量 \(\mathcal{Z}\) 的等温过程，Helmholtz 自由能可写成：

$$
\mathsf{F}
=
\widetilde{\mathsf{F}}(\theta,\varepsilon,\mathcal{Z}).
$$

当温度固定时，关键变量是应变 \(\varepsilon\)、内变量 \(\mathcal{Z}\) 以及增量路径。TANN 不让网络直接随意输出所有本构量，而是让网络输出 \(\mathsf{F}\) 和 \(\mathsf{D}\)，并通过它们对输入的导数计算应力与内变量关系。直觉上，\(\mathsf{F}\) 描述“可恢复储能”，\(\mathsf{D}\) 描述“不可逆耗散”；弹性、硬化、软化、塑性流动都必须同时解释这两部分。

在一维增量形式中，可以把网络输入抽象为：

$$
\mathcal{I}=(\varepsilon^t,\Delta\varepsilon,\zeta^t),
$$

其中 \(\zeta\) 表示材料内变量，如塑性应变或硬化变量。网络输出包括：

$$
\mathcal{O}
=
(\Delta\sigma,\Delta\zeta,\mathsf{F},\mathsf{D}).
$$

但 \(\Delta\sigma\) 与 \(\Delta\zeta\) 不是完全独立的普通输出。TANN 通过自动微分建立类似如下的依赖：

$$
\sigma
\sim
\frac{\partial \mathsf{F}}{\partial \varepsilon},
\qquad
\text{thermodynamic force}
\sim
-
\frac{\partial \mathsf{F}}{\partial \zeta}.
$$

具体符号会随 1D/3D、hyper-plastic/hypo-plastic 设置变化，但架构原则不变：应力和内变量演化必须与自由能梯度、耗散率以及耗散不等式一致。

##### 损失函数与训练信号

TANN 的训练目标通常同时监督材料可观测量和热力学标量：

$$
\mathcal{L}
=
w_\sigma\|\sigma_\theta-\sigma\|_2^2
+w_\zeta\|\zeta_\theta-\zeta\|_2^2
+w_F\|\mathsf{F}_\theta-\mathsf{F}\|_2^2
+w_D\|\mathsf{D}_\theta-\mathsf{D}\|_2^2.
$$

其中 \(\mathsf{F}\) 和 \(\mathsf{D}\) 是 TANN 相比普通 ANN 的额外监督代价。论文指出，这些标量在微观力学模拟中较容易获得，在部分实验中也可能通过能量测量间接得到。换来的好处是，网络不需要从应力数据里自行发现热力学定律；定律已经由计算图和导数关系写死。

> ⚠️ 注意：TANN 不是“给 ANN 加一个物理惩罚项”这么简单。它的关键是把自由能和耗散率设置为中间核心量，并让其他输出通过导数生成，因此训练失败往往意味着数据或结构与热力学假设不兼容。

##### 为什么激活函数很重要

因为 TANN 需要对网络输出求导，甚至训练这些导数生成的量，激活函数的二阶导数不能在大范围内消失。若使用 ReLU 这类分段线性函数，二阶导数几乎处处为 0，网络在学习“输出的导数”时会遇到论文所说的 second-order vanishing gradients。

因此 TANN 更偏好 smooth 且二阶导数非零的激活函数或改造激活函数，例如指数型 ELU、带二次项的变体等。这个细节对普通监督 ANN 可能只是优化选择，对 TANN 则直接影响热力学导数链是否可训练。

##### 与标准 ANN 的区别

| 方法 | 直接学习对象 | 热力学一致性 | 所需数据 | 主要风险 |
|------|--------------|--------------|----------|----------|
| 标准 ANN 本构 | 应力增量或下一步状态 | 训练后才检查，未见路径可能破坏 | 主要是应力/状态数据 | 可产生负耗散或能量不一致 |
| PINN 式软约束 | 黑箱输出 + 物理残差惩罚 | 取决于权重与优化质量 | 数据 + 残差点/物理项 | 软惩罚不一定严格满足 |
| TANN | 自由能、耗散率及其导数关系 | 架构层面硬编码 \(\mathsf{D}\ge0\) 和导数关系 | 还需 \(\mathsf{F},\mathsf{D}\) 标量 | 数据源必须能提供热力学标量 |

论文实验覆盖 1D 和 3D 弹塑性，包括运动硬化、软化和循环加载。标准 ANN 在训练分布附近可以拟合应力，但当应变增量超出训练范围或换加载路径时，容易出现热力学不一致；TANN 的归纳偏置更强，因此对未见路径更稳健，也更适合放入有限元增量求解的材料点例程中。

#### 🧪 练习题
```yaml
question: "TANNs 相比普通 ANN 本构模型的核心结构差异是什么？"
options:
  - "TANNs 只使用更深的 MLP，因此能拟合更多数据"
  - "TANNs 直接输出网格位移场，用 PDE 残差训练"
  - "TANNs 以自由能和耗散率为核心，并用自动微分硬连接应力和内变量关系"
  - "TANNs 不需要任何材料实验或仿真数据"
answer: 2
explain: "TANN 的重点是把热力学标量及其导数关系写入网络架构，使输出满足能量和耗散约束，而不是单纯增加网络容量。"
```

### EGNN

```yaml
id: egnn
num: 24
name: EGNN
full_name: 等变图神经网络 (Equivariant Graph Neural Networks)
year: '2021'
org: 阿姆斯特丹大学
parent: —
paper_url: https://proceedings.mlr.press/v139/satorras21a.html
project_url: ''
category: physics_constrained
motivation: 旋转平移反射等变保证物理一致
```

#### 📝 一句话总结
EGNN 提出了一种不依赖球谐函数和高阶表示的 \(E(n)\)-等变消息传递层：节点特征通过距离不变量传递消息，坐标沿相对位移方向做标量加权更新，从而天然满足平移、旋转、反射和节点置换等变。

#### 🎯 核心要点
- **作用群更一般**：对 \(E(n)\) 群等变，包括 \(n\) 维空间中的平移、旋转与反射，同时保持图节点置换等变
- **不使用高阶表示**：相比 Tensor Field Networks、SE(3)-Transformer 等方法，不需要球谐函数、Clebsch-Gordan 系数或昂贵的 type-\(\ell\) 中间特征
- **坐标与特征双更新**：节点标量特征 \(h_i\) 通过普通消息传递更新，坐标 \(x_i\) 通过相对向量 \((x_i-x_j)\) 乘标量权重更新
- **距离作为不变量输入**：边消息使用 \(\|x_i-x_j\|^2\)，它对旋转、反射和平移不变，因此不会破坏几何对称性
- **可扩展到任意维度**：模型公式与空间维度 \(n\) 无关，不局限于 3D 分子或点云
- **支持速度/动量扩展**：对动力系统可加入速度变量，使坐标更新兼顾初始速度和消息传递得到的相互作用项
- **实验覆盖多域**：N-body 动力学、图自编码器、QM9 分子性质预测，证明等变归纳偏置提升数据效率与泛化

#### 🔬 深入细节
##### 核心示意图

论文主页为 PMLR: https://proceedings.mlr.press/v139/satorras21a.html，PDF 为 http://proceedings.mlr.press/v139/satorras21a/satorras21a.pdf；可访问 HTML 图示来自 ar5iv: https://ar5iv.labs.arxiv.org/html/2102.09844。

![EGNN 旋转等变示意](https://ar5iv.labs.arxiv.org/html/2102.09844/assets/x1.png)
*图：EGNN 期望满足的旋转等变性质。先旋转输入图再过网络，等价于先过网络再旋转输出坐标。*

##### 算法伪代码

```python
# 单层 EGCL / EGNN 消息传递伪代码
def egcl_layer(h, x, edge_attr, edges):
    # h_i: node scalar features, shape [N, d_h]
    # x_i: coordinates in R^n, shape [N, n]
    messages = {}
    coord_updates = zeros_like(x)

    for i, j in edges:
        r2_ij = squared_norm(x[i] - x[j])  # E(n)-invariant
        m_ij = phi_e(concat(h[i], h[j], r2_ij, edge_attr[i, j]))
        messages[(i, j)] = m_ij

        # scalar gate times relative vector: equivariant vector field
        scalar = phi_x(m_ij)
        coord_updates[i] += (x[i] - x[j]) * scalar

    x_next = x + coord_updates / normalizer(len(edges))

    h_next = []
    for i in range(num_nodes):
        m_i = sum(messages[(i, j)] for j in neighbors(i))
        h_next.append(phi_h(concat(h[i], m_i)))

    return stack(h_next), x_next

def egnn(h0, x0, edge_attr, edges, num_layers):
    h, x = h0, x0
    for _ in range(num_layers):
        h, x = egcl_layer(h, x, edge_attr, edges)
    return h, x
```

##### EGCL 的核心公式

EGNN 的基本层称为 Equivariant Graph Convolutional Layer (EGCL)。给定节点特征 \(h_i^l\)、坐标 \(x_i^l\in\mathbb{R}^n\) 和边属性 \(a_{ij}\)，先计算边消息：

$$
m_{ij}
=
\phi_e\left(
h_i^l,\ h_j^l,\ \|x_i^l-x_j^l\|^2,\ a_{ij}
\right).
$$

这里 \(\|x_i-x_j\|^2\) 是关键：平移不改变差向量，旋转/反射只会左乘正交矩阵 \(Q\)，因此距离平方不变：

$$
\|Qx_i+g-(Qx_j+g)\|^2
=
\|Q(x_i-x_j)\|^2
=
\|x_i-x_j\|^2.
$$

坐标更新写成相对方向的加权和：

$$
x_i^{l+1}
=
x_i^l
+
C
\sum_{j\ne i}
(x_i^l-x_j^l)\,
\phi_x(m_{ij}),
$$

其中 \(C\) 是归一化常数，\(\phi_x(m_{ij})\) 输出标量。因为每一项都是“相对向量 \(\times\) 不变量标量”，整体在旋转或反射后会随坐标一起变换：

$$
x_i^l\mapsto Qx_i^l+g
\quad\Rightarrow\quad
x_i^{l+1}\mapsto Qx_i^{l+1}+g.
$$

节点消息聚合和特征更新与标准 GNN 类似：

$$
m_i=\sum_{j\ne i}m_{ij},
\qquad
h_i^{l+1}=\phi_h(h_i^l,m_i).
$$

由于 \(m_{ij}\) 只依赖标量特征、边属性和距离不变量，\(h_i\) 保持 \(E(n)\)-不变；由于聚合是对邻居求和，节点重排只会重排输出，因此保留 permutation equivariance。

##### 为什么它比传统 SE(3) 等变网络简单

许多 3D 等变网络使用高阶张量/球谐函数表示不同类型的几何量。这类方法表达力强，但需要维护 type-0、type-1、type-2 等特征，并计算旋转群相关基函数，工程和计算成本都高。EGNN 做了更克制的选择：只维护标量节点特征和坐标向量，不显式构造高阶表示。

这种选择适合很多物理问题，因为输入输出往往就是标量属性和向量坐标/速度。例如分子性质预测需要对整体旋转平移不变的能量或性质；N-body 预测需要坐标轨迹随输入旋转而旋转。EGNN 用距离不变量驱动标量消息，再用相对位移恢复等变向量更新，正好覆盖这类任务。

> 💡 关键：EGNN 的等变性来自“标量只看不变量，向量只由相对向量线性组合生成”。这比在每层维护高阶表示更简单，但也意味着模型表达的是径向方向加权的向量场。

##### 速度/动量扩展

对动力系统，论文还给出速度型扩展。将坐标更新拆成速度更新和位置更新：

$$
v_i^{l+1}
=
\phi_v(h_i^l)v_i^l
+
C
\sum_{j\ne i}
(x_i^l-x_j^l)\phi_x(m_{ij}),
$$

$$
x_i^{l+1}=x_i^l+v_i^{l+1}.
$$

如果初始速度 \(v_i^0=0\)，该形式退化为基本坐标更新。若速度存在，它本身在旋转/反射下也按向量变换，因此乘以由 \(h_i\) 生成的标量门控 \(\phi_v(h_i)\) 不会破坏等变性。这对带初速度的 charged particles N-body 预测尤其自然。

##### 边推断与训练流程

如果图边已知，EGNN 直接在给定边集合上传递消息；如果只有点云或粒子集合，可使用全连接图，也可以学习软邻接：

$$
e_{ij}=\phi_{\text{inf}}(m_{ij})\in[0,1],
\qquad
m_i=\sum_{j\ne i}e_{ij}m_{ij}.
$$

因为 \(e_{ij}\) 也是由不变量消息得到的标量，边推断不会破坏几何等变性。训练目标取决于任务：N-body 用未来位置均方误差，图自编码器用边重构二元交叉熵，QM9 用分子性质回归误差。N-body 位置预测可写成：

$$
\mathcal{L}_{\text{pos}}
=
\frac{1}{N}
\sum_{i=1}^{N}
\|\hat{x}_i^{T}-x_i^{T}\|_2^2.
$$

##### 与普通 GNN 的差异

| 方法 | 几何输入处理 | 坐标输出 | 对 \(E(n)\) 变换的性质 | 成本特点 |
|------|--------------|----------|------------------------|----------|
| 标准 GNN | 可拼接坐标但无约束 | 任意 MLP 输出 | 通常不等变 | 简单但需数据学会旋转/平移 |
| SchNet 类模型 | 使用距离不变量 | 主要输出不变量 | 适合分子标量性质 | 不直接给等变坐标更新 |
| TFN/SE(3)-Transformer | 球谐函数与高阶表示 | 等变 | 强 SE(3)/E(3) 结构 | 计算与实现复杂 |
| EGNN | 距离不变量 + 相对向量 | 相对向量标量加权更新 | \(E(n)\) 等变、置换等变 | 不用球谐函数，可扩展到任意维 |

EGNN 的局限也来自它的简洁性：坐标更新本质上是相对方向的标量加权和，如果任务需要复杂角向高阶张量相互作用，高阶等变模型可能更有表达优势。但对许多物理模拟和分子任务，EGNN 在精度、数据效率和运行成本之间给出了非常实用的折中。

#### 🧪 练习题
```yaml
question: "EGNN 坐标更新为什么能够保持旋转和反射等变？"
options:
  - "因为坐标更新完全忽略节点之间的相对位置"
  - "因为边消息只输入绝对坐标，网络会自动学习坐标系"
  - "因为更新由相对向量乘以不变量标量组成，输入旋转/反射后更新向量会同步旋转/反射"
  - "因为 EGNN 使用球谐函数显式表示所有高阶张量"
answer: 2
explain: "EGNN 的标量权重来自距离等不变量，而方向来自 x_i-x_j；正交变换会作用到相对向量上，标量不变，因此输出坐标按同样方式变换。"
```

### Noether Networks

```yaml
id: noether_nets
num: 25
name: Noether Networks
full_name: 诺特网络 (Noether Networks)
year: '2021'
org: MIT
parent: —
paper_url: https://proceedings.neurips.cc/paper/2021/hash/8e296a067a37563370ded05f5a3bf83e-Abstract.html
project_url: ''
category: physics_constrained
motivation: 基于诺特定理自动发现守恒量
```

#### 📝 一句话总结
Noether Networks 将“寻找可用归纳偏置”转化为“元学习一个在预测时被强制保持的守恒量”，用可学习的守恒损失在每个输入序列上临时调整预测器。它解决了连续对称性难以直接发现、而守恒量可从真实轨迹中观测并用于改进长时序预测的问题。

#### 🎯 核心要点
- 核心对象：基础序列预测器 \(f_\theta\) 负责 rollout，可学习嵌入 \(g_\phi\) 输出候选守恒量或守恒特征。
- Noether loss：约束预测序列中的 \(g_\phi(\tilde{x}_t)\) 与初始状态或相邻时间步的 \(g_\phi\) 保持一致。
- Prediction-time tailoring：先用 \(f_\theta\) 生成临时预测 \(\tilde{x}_{1:T}\)，再用守恒损失对 \(\theta\) 做内循环更新，最后用更新后的 \(\theta(x_0;\phi)\) 重新预测。
- 元学习目标：外循环通过监督任务损失优化 \(\phi\) 和 \(\theta\)，使“守恒损失造成的内循环更新”真正降低预测误差。
- 反平凡化思路：不是寻找任意低方差守恒量，而是寻找用于内循环后能改善任务 loss 的 useful conserved quantities。
- 理论直觉：若守恒约束把输出限制在 \(g_\phi\) 的低维 preimage 上，泛化界中的有效维度可从原始维度 \(d\) 降到 preimage 维度 \(m\)。
- 科学数据实验：用带物理量纲检查的 DSL 搜索公式，能恢复理想弹簧、理想摆以及有耗散真实摆的近似能量守恒形式。
- 原始视频实验：用 CNN 参数化 \(g_\phi\)，在 Physics 101 斜坡视频和受控摆视频中从像素学习有助于长时预测的守恒嵌入。

#### 🔬 深入细节
来源说明：NeurIPS 页面给出正式论文入口，论文公开版本与 TeX 源可从 arXiv `https://arxiv.org/abs/2112.03321` 获取；项目页为 `https://dylandoblar.github.io/noether-networks/`，代码仓库为 `https://github.com/dylandoblar/noether-networks`。下图来自 ar5iv 对论文 Figure 1 的公开 HTML 渲染。

![Noether Networks 预测时守恒约束流程](https://ar5iv.labs.arxiv.org/html/2112.03321/assets/x1.png)
*图：Noether Networks 用 \(g_\phi\) 元学习守恒损失，并在 \(f_\theta\) 生成最终预测前用该损失进行 prediction-time tailoring。*

```python
# Noether Networks with neural conservation loss 伪代码
initialize base predictor f_theta
initialize conserved embedding g_phi

def noether_loss(x0, pred_seq):
    # 论文中使用两种形式：相对初始状态，或相邻时间步
    return sum(norm(g_phi(x0) - g_phi(x_t))**2 for x_t in pred_seq)

def predict_sequence(x0, theta, phi):
    x_tilde = [x0]
    for t in range(1, T + 1):
        x_tilde.append(f_theta(x_tilde[-1], theta))

    inner_loss = noether_loss(x0, x_tilde[1:])
    theta_adapted = theta - lambda_inner * grad(inner_loss, theta)

    x_hat = [x0]
    for t in range(1, T + 1):
        x_hat.append(f_theta(x_hat[-1], theta_adapted))
    return x_hat[1:]

for batch in train_loader:
    task_loss = 0.0
    for x0, target_seq in batch:
        pred_seq = predict_sequence(x0, theta, phi)
        task_loss += supervised_loss(pred_seq, target_seq)

    # 外循环：反传穿过内循环更新，学习 theta 和守恒嵌入 phi
    theta -= lambda_outer * grad(task_loss, theta)
    phi -= lambda_embed * grad(task_loss, phi)
```

Noether Networks 的动机来自诺特定理：连续对称性对应守恒量。直接学习“系统对哪些连续变换保持不变”很难，因为对称性涉及未观测的反事实扰动；而守恒量可以沿真实轨迹直接检查，例如能量、动量或某些从像素中抽取的近似不变量。论文利用这一点，把归纳偏置写成一个守恒损失，而不是手工指定等变架构。

给定初始状态 \(x_0\)，基础模型先生成一段临时预测：

$$
\tilde{x}_t=f_\theta(\tilde{x}_{t-1}),\qquad t=1,\ldots,T.
$$

可学习嵌入 \(g_\phi\) 把状态映射到守恒特征空间。论文给出的主要守恒损失为：

$$
\mathcal{L}_{\rm Noether}(x_0,\tilde{x}_{1:T};g_\phi)
=\sum_{t=1}^{T}\left\|g_\phi(x_0)-g_\phi(\tilde{x}_t)\right\|_2^2.
$$

另一种近似形式是相邻时间步守恒：

$$
\sum_{t=1}^{T}\left\|g_\phi(\tilde{x}_{t-1})-g_\phi(\tilde{x}_t)\right\|_2^2.
$$

前者能把初始真实信息更直接地传给所有预测步，后者更适合“近似守恒但会缓慢漂移”的现实系统。两者都不是普通训练阶段的辅助损失，而是在预测函数内部执行的 tailoring loss：模型先按当前 \(\theta\) 预测，再用该序列上的守恒损失做内循环更新：

$$
\theta(x_0;\phi)=
\theta-\lambda_{\rm in}\nabla_\theta
\mathcal{L}_{\rm Noether}(x_0,\tilde{x}_{1:T}(\theta);g_\phi).
$$

最终输出由更新后的参数产生：

$$
\hat{x}_t=f_{\theta(x_0;\phi)}(\hat{x}_{t-1}).
$$

外循环再通过真实任务损失学习 \(\phi\) 与 \(\theta\)：

$$
\min_{\theta,\phi}\ \mathcal{L}_{\rm task}(x_{1:T},\hat{x}_{1:T}).
$$

> 💡 关键：\(g_\phi\) 的目标不是成为一个“看起来守恒”的描述符，而是成为一个“被预测时优化后能降低任务误差”的守恒损失。平凡常数 \(g_\phi(x)=C\) 即使完全守恒，也无法提供有用梯度，因而不会在外循环中带来预测收益。

论文还给出一个理论直觉：若 \(g_\phi\) 的 preimage 是低维流形或仿射子空间，约束 \(g_\phi(f_\theta(x))=g_\phi(x)\) 等价于把输出限制在该低维集合内。设原始输出维度为 \(d\)，preimage 维度为 \(m\)，则泛化界中的有效维度项可从 \(d\) 替换为 \(m\)。直观上，守恒量越有信息，满足守恒的候选输出空间越小，模型越不容易在训练外漂移。

在可解释物理实验中，Noether Networks 使用带量纲检查的 DSL 搜索公式。DSL 包括输入变量、\(+,-,\cdot,/,\sin,\cos,x^2\) 和带单位的可训练标量。候选公式先在真实轨迹上筛出近似低方差项，再作为 meta-tailoring loss 评估其预测收益。论文报告其在理想摆中发现 \(p^2-2.99\cos(q)\)，接近真实 Hamiltonian 的等价形式；在理想弹簧中发现 \(q^2+1.002p^2\)；在真实有耗散摆中发现近似 \(p^2-2.39\cos(q)\)，说明方法不要求守恒量严格精确，只要其软约束有助于预测即可。

在像素视频中，\(g_\phi\) 不再是显式公式，而是两层 CNN 加投影层输出 64 维嵌入。Noether loss 在原始视频帧或相邻帧上施加，使预测时的内循环更新保留与物体、运动和场景几何相关的长期信息。Grad-CAM 分析显示嵌入会关注滑动物体、目标物体、斜坡边缘等区域，这支持了“守恒量可以从原始观测中以神经特征形式出现”的假设。

#### 🧪 练习题
```yaml
question: "Noether Networks 中 prediction-time tailoring 的核心作用是什么？"
options:
  - "在训练前把所有视频帧转换成哈密顿量标签"
  - "用元学习的守恒损失在每个输入序列上临时更新预测器参数，再生成最终预测"
  - "强制所有系统都严格满足能量守恒"
  - "只在训练集上加入一个普通辅助分类损失"
answer: 1
explain: "Noether loss 被放在预测函数内部优化，使模型在测试样本上也能按学习到的守恒偏置自适应；外循环则学习这个守恒损失是否真的改善任务预测。"
```

### gPINN

```yaml
id: gpinn
num: 26
name: gPINN
full_name: 梯度增强PINN (Gradient-enhanced PINN)
year: '2022'
org: 宾大
parent: pinn
paper_url: https://doi.org/10.1016/j.cma.2022.114823
project_url: ''
category: pde_solving
motivation: 引入残差梯度项提升陡峭解精度
```

#### 📝 一句话总结
gPINN 在标准 PINN 的 PDE 残差损失之外，额外惩罚 PDE 残差对输入坐标的梯度，使网络不仅让方程残差接近零，也让残差场在空间/时间上更平滑地接近零。它主要解决标准 PINN 在训练点有限、解存在陡峭梯度或反问题参数敏感时精度不足的问题。

#### 🎯 核心要点
- 基础框架：沿用 PINN 的自动微分残差 \(f(\mathbf{x};\hat{u},\partial \hat{u},\ldots;\lambda)=0\) 与边界/初值/观测数据损失。
- 梯度增强：额外约束 \(\nabla f(\mathbf{x})=\mathbf{0}\)，即对每个坐标方向 \(x_i\) 加入 \(\left|\partial f/\partial x_i\right|^2\)。
- 统一正反问题：未知 PDE 参数 \(\lambda\) 可和网络参数 \(\theta\) 一起优化，梯度残差同样参与反问题辨识。
- 采样策略：论文实验中通常令梯度残差点集 \(\mathcal{T}_{g_i}\) 与 PDE 残差点集 \(\mathcal{T}_f\) 相同，也可按坐标方向独立采样。
- RAR 组合：把 gPINN 与 residual-based adaptive refinement 结合，在残差最大的区域持续加入 collocation points。
- 适用场景：Poisson、diffusion-reaction、Brinkman-Forchheimer、Burgers、Allen-Cahn 等正反 PDE 问题，尤其适合陡峭梯度区域。
- 权重敏感性：梯度项权重 \(w_{g_i}\) 是新增超参数；部分问题不敏感，部分问题需要调小，否则梯度项会压过基础残差。
- 计算代价：需要更高阶自动微分，论文报告通常比 PINN 多约 2-3 倍成本，但可用更少训练点达到相近或更好精度。

#### 🔬 深入细节
来源说明：期刊 DOI 页面为 `https://doi.org/10.1016/j.cma.2022.114823`；公开 arXiv 版本为 `https://arxiv.org/abs/2111.02801`；官方代码仓库为 `https://github.com/lu-group/gpinn`。论文没有单独的架构框图，下图选用 ar5iv 渲染的实验图，展示 gPINN 与 PINN 的精度差异和 gPINN+RAR 的残差点自适应机制。

![gPINN 在 Poisson 方程中的精度对比](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.2.1.png)
*图：一维 Poisson 方程中，gPINN 通过残差梯度项改善 \(u\)、\(u'\) 与 PDE residual 的误差；权重 \(w\) 过大时也可能损害效果。*

![gPINN with RAR 在 Burgers 方程中的自适应加点](https://ar5iv.labs.arxiv.org/html/2111.02801/assets/figs/Fig3.4.1.2.png)
*图：gPINN 与 RAR 结合后，在 Burgers 方程陡峭区域附近加入更多残差点，使误差和残差随训练推进下降。*

```python
# gPINN + RAR 训练伪代码
initialize neural surrogate u_hat(x, t; theta)
initialize residual_points Tf
initialize boundary_or_data_points Tb, Ti

for rar_round in range(max_rar_rounds):
    for step in range(train_steps_per_round):
        residual = pde_residual(u_hat, Tf, theta, lambda_)
        loss_f = mean(abs(residual) ** 2)
        loss_b = boundary_loss(u_hat, Tb, theta)
        loss_i = data_loss(u_hat, Ti, theta)  # 反问题或有观测数据时使用

        loss_g = 0.0
        for coord in coordinates:
            grad_residual = derivative(residual, coord)  # AD 计算 ∂f/∂x_i
            loss_g += weight_g[coord] * mean(abs(grad_residual) ** 2)

        loss = w_f * loss_f + w_b * loss_b + w_i * loss_i + loss_g
        theta, lambda_ = optimizer_step(loss, theta, lambda_)

    candidate_points = sample_many_points(domain)
    candidate_residual = abs(pde_residual(u_hat, candidate_points, theta, lambda_))
    Tf.add(top_m_points(candidate_points, candidate_residual))
    if mean(candidate_residual) < tolerance:
        break
```

标准 PINN 从如下 PDE 出发：

$$
f\left(\mathbf{x};
\frac{\partial u}{\partial x_1},\ldots,
\frac{\partial^2 u}{\partial x_i\partial x_j},\ldots;
\boldsymbol{\lambda}\right)=0,\qquad \mathbf{x}\in\Omega.
$$

神经网络 \(\hat{u}(\mathbf{x};\theta)\) 近似真实解，自动微分用于计算 PDE residual。基础 PINN 损失可写成：

$$
\mathcal{L}(\theta;\mathcal{T})
=w_f\mathcal{L}_f(\theta;\mathcal{T}_f)
+w_b\mathcal{L}_b(\theta;\mathcal{T}_b),
$$

其中

$$
\mathcal{L}_f(\theta;\mathcal{T}_f)
=\frac{1}{|\mathcal{T}_f|}
\sum_{\mathbf{x}\in\mathcal{T}_f}
\left|
f\left(\mathbf{x};
\frac{\partial \hat{u}}{\partial x_1},\ldots;
\boldsymbol{\lambda}\right)
\right|^2.
$$

若是反问题，还会加入观测数据项：

$$
\mathcal{L}_i(\theta,\lambda;\mathcal{T}_i)
=\frac{1}{|\mathcal{T}_i|}
\sum_{\mathbf{x}\in\mathcal{T}_i}
\left|\hat{u}(\mathbf{x})-u(\mathbf{x})\right|^2.
$$

gPINN 的关键观察很直接：如果 PDE residual \(f(\mathbf{x})\) 在整个区域内为 0，那么它对任意输入坐标的导数也应为 0：

$$
\nabla f(\mathbf{x})=
\left(
\frac{\partial f}{\partial x_1},
\frac{\partial f}{\partial x_2},
\ldots,
\frac{\partial f}{\partial x_d}
\right)=\mathbf{0}.
$$

因此总损失扩展为：

$$
\mathcal{L}
=w_f\mathcal{L}_f+w_b\mathcal{L}_b+w_i\mathcal{L}_i
+\sum_{i=1}^{d}w_{g_i}\mathcal{L}_{g_i}(\theta;\mathcal{T}_{g_i}),
$$

其中

$$
\mathcal{L}_{g_i}(\theta;\mathcal{T}_{g_i})
=\frac{1}{|\mathcal{T}_{g_i}|}
\sum_{\mathbf{x}\in\mathcal{T}_{g_i}}
\left|\frac{\partial f}{\partial x_i}\right|^2.
$$

这个损失的直觉是：标准 PINN 只在有限训练点上压低 residual，两个相邻点之间的 residual 场仍可能振荡或在陡峭区域漏掉重要结构；gPINN 通过惩罚 residual 的梯度，给每个 collocation point 提供局部变化率信息，相当于让一个点约束附近更大区域的 residual 形状。

以一维 Poisson 方程为例，若 residual 含有二阶导数，梯度项会涉及三阶导数：

$$
\mathcal{L}_g
=w_g\frac{1}{|\mathcal{T}_g|}
\sum_{\mathbf{x}\in\mathcal{T}_g}
\left|
\frac{d^3\hat{u}}{dx^3}-\frac{df}{dx}
\right|^2.
$$

在二维 Poisson 方程中，\(x\) 与 \(y\) 两个方向分别产生额外损失，例如：

$$
\mathcal{L}_{g_1}
=w_{g_1}\frac{1}{|\mathcal{T}_{g_1}|}
\sum_{\mathbf{x}\in\mathcal{T}_{g_1}}
\left|
\frac{\partial^3\hat{u}}{\partial x^3}
+\frac{\partial^3\hat{u}}{\partial x\partial y^2}
-\frac{\partial f}{\partial x}
\right|^2.
$$

> ⚠️ 注意：gPINN 的“梯度增强”不是直接监督解的梯度，除非问题本身有梯度观测；它监督的是 PDE residual 的梯度。这样即使没有额外标签，也能从方程本身产生更多物理约束。

RAR 是 gPINN 在陡峭解上的重要补充。Burgers 方程和 Allen-Cahn 方程的误差通常集中在 shock-like 或过渡层附近，均匀采样会把大量点浪费在平滑区域。RAR 先训练一轮模型，然后在大量候选点上评估 residual，把 residual 最大的 \(m\) 个点加入训练集，循环执行直到平均 residual 低于阈值 \(\mathcal{E}\)。gPINN+RAR 的效果来自两层机制：梯度残差让每个点的约束更强，自适应加点让点集中到最需要的区域。

gPINN 的代价也来自同一处。若 PDE 已包含高阶导数，\(\partial f/\partial x_i\) 会要求更高阶自动微分，内存和时间都上升。论文结论中强调，gPINN 通常比 PINN 更贵，但在相同训练点数量下误差更低；当用相似计算预算比较时，某些问题中“PINN 加倍训练点”可接近 gPINN，另一些如 Burgers 方程中 gPINN 仍更优。因此它更像一种提高物理约束密度的工具，而不是无条件替代 PINN 的默认配置。

#### 🧪 练习题
```yaml
question: "gPINN 相比标准 PINN 的核心新增项是什么？"
options:
  - "只增加更多边界条件点，不改变损失函数"
  - "加入 PDE residual 对输入坐标的梯度损失，使 \\(\\partial f/\\partial x_i\\) 也趋近于 0"
  - "把 PDE residual 替换成纯数据监督误差"
  - "用卷积层代替自动微分"
answer: 1
explain: "gPINN 的主要贡献是把 residual gradient 嵌入损失函数；若 PDE residual 在区域内为零，其空间/时间梯度也应为零。"
```

### Causal PINN

```yaml
id: causal_pinn
num: 27
name: Causal PINN
full_name: 因果PINN (Causal Physics-Informed Neural Networks)
year: '2022'
org: 宾大
parent: pinn
paper_url: https://arxiv.org/abs/2203.07404
project_url: ''
category: pde_solving
motivation: 时间因果律加权解决长时程收敛
```

#### 📝 一句话总结
Causal PINN 通过按时间因果顺序重加权 PDE residual，使模型只有在较早时间残差被充分压低后，才强烈优化较晚时间残差。它解决了连续时间 PINN 同时最小化所有时间点 residual、可能先拟合后期状态而违反时间因果结构的问题。

#### 🎯 核心要点
- 失败诊断：标准连续时间 PINN 的全局 residual loss 会同时优化所有时间点，可能在早期状态未正确时把后期 residual 压低到无意义的小值。
- 时间残差分解：把 residual loss 写成 \(\mathcal{L}_r(\theta)=\frac{1}{N_t}\sum_i \mathcal{L}_r(t_i,\theta)\)，显式区分每个时间切片的误差。
- 因果权重：为每个时间点设置 \(w_i=\exp(-\epsilon\sum_{k<i}\mathcal{L}_r(t_k,\theta))\)，前序 residual 大时，后序权重接近 0。
- 初值纳入因果链：把 \(\lambda_{ic}\mathcal{L}_{ic}\) 当作 \(t_0\) 的特殊时间残差，先确保初始条件被拟合。
- 退火策略：用 \(\epsilon\in[10^{-2},10^{-1},10^0,10^1,10^2]\) 逐步增强因果约束，减少单一 \(\epsilon\) 调参难度。
- 收敛判据：当所有时间权重接近 1，例如 \(\min_i w_i>\delta\)，说明前序 residual 已足够小，可以停止当前训练阶段。
- 工程细节：论文实现中对 \(w_i\) 使用 stop-gradient，避免梯度通过权重计算反传导致优化目标被扭曲。
- 适用结果：在 Allen-Cahn、Lorenz、Kuramoto-Sivashinsky 和湍流 Navier-Stokes 等标准 PINN 困难问题上显著提高精度。

#### 🔬 深入细节
来源说明：论文公开版本为 arXiv `https://arxiv.org/abs/2203.07404`，ar5iv HTML 为 `https://ar5iv.labs.arxiv.org/html/2203.07404`。下图来自论文 Figure 1 和 Figure 3 的公开渲染，展示标准 PINN 失败与因果加权训练后的 Allen-Cahn 结果。

![标准 PINN 在 Allen-Cahn 方程上违反时间因果导致失败](https://ar5iv.labs.arxiv.org/html/2203.07404/assets/AC_vanila_PINN_pred.png)
*图：标准连续时间 PINN 在 Allen-Cahn 方程上给出错误中间态，虽然部分后期 residual 可被压低。*

![Causal PINN 在 Allen-Cahn 方程上的预测结果](https://ar5iv.labs.arxiv.org/html/2203.07404/assets/AC_TW_PINN_pred.png)
*图：使用因果时间权重后，同一 Allen-Cahn 问题的预测明显贴近参考解。*

```python
# Causal training for PINNs 伪代码
initialize PINN u_theta(t, x)
time_grid = [t0, t1, ..., tN]
eps_schedule = [1e-2, 1e-1, 1e0, 1e1, 1e2]

def temporal_loss(i, theta):
    if i == 0:
        return lambda_ic * initial_condition_loss(u_theta, theta)
    return mean(abs(d_dt(u_theta, t_i, x) + N_operator(u_theta, t_i, x)) ** 2)

for epsilon in eps_schedule:
    for step in range(S):
        L = [temporal_loss(i, theta) for i in range(N + 1)]
        weights = [1.0]
        for i in range(1, N + 1):
            previous_error = sum(stop_gradient(L[k]) for k in range(i))
            weights.append(exp(-epsilon * previous_error))

        total_loss = mean(weights[i] * L[i] for i in range(N + 1))
        theta = optimizer_step(total_loss, theta)

        if min(weights) > delta:
            break
```

标准 PINN 考虑时间依赖 PDE：

$$
\mathbf{u}_t+\mathcal{N}[\mathbf{u}]=0,\qquad
t\in[0,T],\ \mathbf{x}\in\Omega,
$$

并用神经网络 \(\mathbf{u}_\theta(t,\mathbf{x})\) 近似解。常规训练目标是：

$$
\mathcal{L}(\theta)
=\lambda_{ic}\mathcal{L}_{ic}(\theta)
+\lambda_{bc}\mathcal{L}_{bc}(\theta)
+\lambda_r\mathcal{L}_r(\theta).
$$

其中 residual loss 为：

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_r}\sum_{i=1}^{N_r}
\left|
\frac{\partial \mathbf{u}_\theta}{\partial t}(t_r^i,\mathbf{x}_r^i)
+\mathcal{N}[\mathbf{u}_\theta](t_r^i,\mathbf{x}_r^i)
\right|^2.
$$

Causal PINN 的第一步是把 residual 按时间切片拆开。若 \(0=t_1<t_2<\cdots<t_{N_t}=T\)，空间点为 \(\{\mathbf{x}_j\}_{j=1}^{N_x}\)，则：

$$
\mathcal{L}_r(t_i,\theta)
=\frac{1}{N_x}\sum_{j=1}^{N_x}
\left|
\frac{\partial \mathbf{u}_\theta}{\partial t}(t_i,\mathbf{x}_j)
+\mathcal{N}[\mathbf{u}_\theta](t_i,\mathbf{x}_j)
\right|^2,
$$

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_t}\sum_{i=1}^{N_t}\mathcal{L}_r(t_i,\theta).
$$

为什么普通 PINN 会违反时间因果？用 forward Euler 近似时间导数时，第 \(i\) 个时间片 residual 近似依赖相邻状态：

$$
\mathcal{L}_r(t_i,\theta)
\approx
\frac{1}{N_x}\sum_{j=1}^{N_x}
\left|
\frac{\mathbf{u}_\theta(t_i,\mathbf{x}_j)-\mathbf{u}_\theta(t_{i-1},\mathbf{x}_j)}{\Delta t}
+\mathcal{N}[\mathbf{u}_\theta](t_i,\mathbf{x}_j)
\right|^2.
$$

如果 \(t_{i-1}\) 的状态仍是错的，单独把 \(t_i\) 的 residual 压低并不表示 \(t_i\) 的解正确。标准 loss 却把所有时间点并列求和，优化器可能先降低后期 residual，从而形成“后面的方程看似满足，前面的因果来源仍未解决”的错误收敛。

论文提出的因果 residual loss 是：

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_t}\sum_{i=1}^{N_t}
w_i\mathcal{L}_r(t_i,\theta),
$$

其中时间权重由过去 residual 的累积误差决定：

$$
w_i=
\exp\left(
-\epsilon\sum_{k=1}^{i-1}\mathcal{L}_r(t_k,\theta)
\right),\qquad i=2,\ldots,N_t.
$$

若早期时间片 residual 很大，后期 \(w_i\) 会接近 0，优化器几乎不会关注后期 residual；只有当前序 residual 降到足够小，后续权重才逐步接近 1。这相当于把时间推进的因果顺序嵌入连续时间 PINN 的 loss，而不需要把模型改成显式 time-marching solver。

完整算法还把初始条件作为 \(t_0\) 的特殊项：

$$
\mathcal{L}(t_0,\theta)=\lambda_{ic}\mathcal{L}_{ic}(\theta),
$$

并优化加权总损失：

$$
\mathcal{L}(\theta)
=\frac{1}{N_t}\sum_{i=0}^{N_t}w_i\mathcal{L}(t_i,\theta).
$$

> 💡 关键：因果权重不是为了“永久忽略”后期时间点，而是让后期时间点等待前序条件成熟。当所有 \(w_i\) 接近 1 时，说明从初值到后期的 residual 链条都已被激活。

\(\epsilon\) 控制权重曲线陡峭程度。太小会让后期权重过早激活，因果约束弱；太大则要求早期 residual 极小后后期才有梯度，优化可能困难。因此论文使用退火序列逐步增强约束，并建议用 \(\min_i w_i>\delta\) 作为阶段收敛判据。这个判据比只看总 loss 更有物理含义，因为总 loss 可能在后期权重尚未激活时已经很小。

该方法与 adaptive time sampling 或 time-marching 有相似动机，但实现不同。adaptive time sampling 改变采样密度，time-marching 显式切时间窗；Causal PINN 保留连续时间 PINN 的整体形式，只在 residual loss 中加入依赖历史误差的权重。因此它可嵌入现有 PINN、physics-informed DeepONet 或 physics-informed neural operator 训练流程中。

#### 🧪 练习题
```yaml
question: "Causal PINN 中权重 \\(w_i=\\exp(-\\epsilon\\sum_{k<i}\\mathcal{L}_r(t_k))\\) 的主要目的是什么？"
options:
  - "让所有时间点的 residual 始终具有相同权重"
  - "当前序时间 residual 仍大时降低后序时间 residual 的优化权重"
  - "只优化最终时刻的误差"
  - "把 PDE residual 替换成监督数据误差"
answer: 1
explain: "该权重把时间因果顺序写入 loss：只有较早时间片 residual 被压低后，较晚时间片权重才会接近 1 并被充分优化。"
```

### PI-DeepONet

```yaml
id: pi_deeponet
num: 28
name: PI-DeepONet
full_name: 物理信息DeepONet (Physics-Informed DeepONet)
year: '2022'
org: 布朗大学
parent: deeponet
paper_url: https://link.springer.com/book/10.1007/978-3-031-36644-4
project_url: ''
category: pde_solving
motivation: 物理信息嵌入算子网络
```

#### 📝 一句话总结
PI-DeepONet 将 PINN 的 PDE 残差约束嵌入 DeepONet 的算子学习框架，使模型不仅学习从输入函数/参数到 PDE 解函数的映射，还通过自动微分让预测解满足控制方程、初边值条件和物理约束。

#### 🎯 核心要点
- **DeepONet 主体**：沿用 branch net 编码输入函数 \(u(x_1),\ldots,u(x_m)\)，trunk net 编码查询坐标 \(y\)，二者点积输出连续解函数 \(G_\theta(u)(y)\)
- **物理信息正则**：在 DeepONet 输出上用自动微分计算空间/时间导数，将 PDE 残差写入损失函数
- **数据需求降低**：可在没有成对输入-输出解数据时训练，只依赖 PDE、初始/边界条件和 collocation points
- **算子层面的 PINN**：普通 PINN 学一个实例的解 \(s_\theta(y)\)，PI-DeepONet 学一族参数化 PDE 的解算子 \(u\mapsto s(u)\)
- **连续输出表示**：trunk net 接收任意查询点，训练后可在不同分辨率或任意坐标上评估预测解
- **代表任务**：反导数算子、扩散-反应系统、Burgers 方程、对流方程和 Eikonal/气动几何问题
- **加速效果**：训练后的算子可一次性服务大量 PDE 实例，论文报告在时间依赖 PDE 上相对传统求解器可达千倍级推理加速

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 Springer 链接是书籍页面，并不是 PI-DeepONet 的主要论文页面；本文方法解读基于同名论文的开放版本 https://arxiv.org/abs/2103.10974、作者代码库 https://github.com/PredictiveIntelligenceLab/Physics-informed-DeepONets，以及公开解读页中的论文 Figure 1 图示。

![PI-DeepONet 架构示意](https://transferlab.ai/pills/2023/physics-informed-deeponet/pideeponet.svg)
*图：DeepONet 的 branch/trunk 结构输出可微解函数，再通过 PDE、边界条件和初始条件残差训练成 physics-informed DeepONet。*

![PI-DeepONet Burgers 示例](https://transferlab.ai/pills/2023/physics-informed-deeponet/burgers.png)
*图：Burgers 方程示例展示预测解、误差以及批量求解时相对传统谱方法的推理耗时。*

##### 算法伪代码

```python
# PI-DeepONet 训练伪代码
for step in range(num_steps):
    # 1. 采样一批输入函数/参数，例如初始条件、源项或几何参数
    u_batch = sample_input_functions()
    sensor_values = evaluate_on_sensors(u_batch, x_sensors)

    # 2. 在边界/初始条件点和域内 collocation points 上查询模型
    y_data, target_data = sample_boundary_or_initial_points(u_batch)
    y_res = sample_collocation_points(u_batch)

    # 3. DeepONet 前向：branch 编码输入函数，trunk 编码查询坐标
    s_data = deeponet(sensor_values, y_data)  # G_theta(u)(y)
    s_res = deeponet(sensor_values, y_res)

    # 4. 自动微分构造 PDE 残差
    derivatives = autodiff(s_res, y_res)
    residual = pde_operator(u_batch, s_res, derivatives)

    # 5. 联合优化观测/边界项和物理残差项
    loss_operator = mean((s_data - target_data) ** 2)
    loss_physics = mean(residual ** 2)
    loss = loss_operator + lambda_phys * loss_physics

    optimizer.step(loss)
```

##### DeepONet 的算子表示

PI-DeepONet 先继承 DeepONet 对非线性算子的表示方式。设输入函数 \(u\) 在固定传感器点 \(\{x_i\}_{i=1}^m\) 上被观测，branch net 输出 \(q\) 维特征：

$$
\mathbf{b}(u)=
\left[
b_1(u(x_1),\ldots,u(x_m)),\ldots,b_q(u(x_1),\ldots,u(x_m))
\right].
$$

trunk net 对查询坐标 \(y\) 输出：

$$
\mathbf{t}(y)=
\left[t_1(y),\ldots,t_q(y)\right].
$$

二者通过点积给出目标解函数在 \(y\) 处的值：

$$
G_\theta(u)(y)=
\sum_{k=1}^{q}
b_k(u(x_1),\ldots,u(x_m))\,t_k(y).
$$

这个形式的关键是 \(G_\theta(u)(y)\) 对查询坐标 \(y\) 是连续且可微的。因此只要 trunk net 使用可微激活函数，就可以对输出做自动微分，计算 \(\partial_t G_\theta\)、\(\partial_x G_\theta\)、\(\partial_{xx}G_\theta\) 等 PDE 残差需要的导数。

##### 物理信息损失

对一般参数化 PDE，可写为：

$$
\mathcal{N}(u,s)=0,\qquad s=G(u),
$$

其中 \(u\) 是输入函数、系数、源项、初始条件或几何参数，\(s\) 是对应 PDE 解。普通 DeepONet 只最小化成对监督数据误差：

$$
\mathcal{L}_{operator}(\theta)=
\frac{1}{NP}\sum_{i=1}^{N}\sum_{j=1}^{P}
\left|
G_\theta(u^{(i)})(y_j^{(i)})-
G(u^{(i)})(y_j^{(i)})
\right|^2.
$$

PI-DeepONet 在域内 collocation points 上增加物理残差：

$$
\mathcal{L}_{physics}(\theta)=
\frac{1}{NQ}\sum_{i=1}^{N}\sum_{j=1}^{Q}
\left|
\mathcal{N}\left(u^{(i)},G_\theta(u^{(i)})(y_{r,j}^{(i)})\right)
\right|^2.
$$

总体目标可写成：

$$
\mathcal{L}(\theta)=
\mathcal{L}_{operator}(\theta)
+\lambda_{phys}\mathcal{L}_{physics}(\theta).
$$

当没有内部解标签时，\(\mathcal{L}_{operator}\) 可以只承担初始条件和边界条件监督；域内行为则由 \(\mathcal{L}_{physics}\) 约束。这是 PI-DeepONet 与纯监督 DeepONet 的核心差别：它把“解要满足 PDE”变成训练目标，而不是事后验证指标。

##### 以扩散-反应系统为例

论文中的扩散-反应示例可以抽象为由输入函数 \(u(x)\) 驱动的 PDE。PI-DeepONet 对每个 \(u^{(i)}\) 预测解 \(G_\theta(u^{(i)})(x,t)\)，并用自动微分构造残差：

$$
R_\theta^{(i)}(x,t)=
\frac{\partial G_\theta(u^{(i)})(x,t)}{\partial t}
-D\frac{\partial^2G_\theta(u^{(i)})(x,t)}{\partial x^2}
-k\left[G_\theta(u^{(i)})(x,t)\right]^2.
$$

如果方程右端包含输入源项，则物理损失比较 \(R_\theta^{(i)}(x,t)\) 与 \(u^{(i)}(x)\)；若控制方程写成齐次残差，则直接让 \(R_\theta^{(i)}(x,t)\approx 0\)。直觉上，branch net 负责告诉模型“这次 PDE 实例是什么”，trunk net 负责告诉模型“当前查询哪个时空位置”，物理残差负责排除那些虽然插值看起来合理但不满足方程的解函数。

##### 与 PINN 和 DeepONet 的区别

| 方法 | 学习对象 | 训练信号 | 一次训练后能否泛化到多组输入函数 | 主要瓶颈 |
|------|----------|----------|----------------------------------|----------|
| PINN | 单个 PDE 实例的解函数 \(s_\theta(y)\) | 初边值 + PDE 残差 | 通常不能，需要为新实例重训 | 长时间、多尺度和刚性 PDE 优化困难 |
| DeepONet | 解算子 \(G:u\mapsto s\) | 大量成对输入-输出解数据 | 可以 | 高保真训练数据昂贵，预测不保证物理一致 |
| PI-DeepONet | 物理约束下的解算子 \(G_\theta\) | 初边值/少量标签 + PDE 残差 | 可以 | 残差点规模、导数计算和损失权重会影响训练稳定性 |

> 💡 关键：PI-DeepONet 不是简单把 PINN 和 DeepONet 并排堆叠，而是利用 DeepONet 输出对坐标可微这一性质，在“算子学习”的训练循环中直接加入 PDE 约束。

##### 实践注意点

PI-DeepONet 的收益最大时，通常是同一类 PDE 需要在大量输入函数、边界条件或参数下反复求解。若只求一个固定实例，普通 PINN 或传统数值方法更直接；若已有海量高质量解数据，标准 DeepONet/FNO 可能已经足够。PI-DeepONet 的难点在于残差采样和损失尺度：\(\mathcal{L}_{operator}\) 与 \(\mathcal{L}_{physics}\) 梯度量级差异过大时，模型可能只满足边界但内部残差大，或只压低残差却无法贴合初边值。

#### 🧪 练习题
```yaml
question: "PI-DeepONet 相比普通 DeepONet 的核心变化是什么？"
options:
  - "把 branch net 删除，只保留 trunk net"
  - "用 PDE 残差和初边值条件约束 DeepONet 的可微输出函数"
  - "强制所有输入函数都必须在同一个网格分辨率上输出"
  - "只学习单个 PDE 实例，不再学习解算子"
answer: 1
explain: "PI-DeepONet 保留 DeepONet 的算子表示，但通过自动微分构造 PDE 残差，把物理一致性加入训练损失。"
```

### Geo-FNO

```yaml
id: geo_fno
num: 29
name: Geo-FNO
full_name: 几何傅里叶算子 (Geometry-Adaptive FNO)
year: '2023'
org: Caltech
parent: fno
paper_url: https://jmlr.org/papers/v24/23-0064.html
project_url: ''
category: pde_solving
motivation: 可学习坐标变换支持非规则几何
```

#### 📝 一句话总结
Geo-FNO 通过学习一个可微的坐标变换将不规则物理域映射到规则计算域，使得 FFT 可以在计算域上高效执行，从而将 FNO 扩展到任意几何形状和非均匀网格上的 PDE 求解，比数值求解器快 \(10^5\) 倍，比直接插值方法精度提升约 2 倍。

#### 🎯 核心要点
- **可学习坐标变换**：学习微分同胚映射 \(\phi^{-1}: D_a \to D_c\)，将不规则物理域 \(D_a\) 映射到单位环面 \(D_c = [0,1]^d\)
- **几何傅里叶变换**：在计算域上定义正向/逆向几何傅里叶变换 \(\mathcal{F}_a, \mathcal{F}_a^{-1}\)，仅需 \(\phi^{-1}\) 即可完成双向变换
- **结构化网格特例**：当输入为结构化网格时，索引直接提供规范坐标映射，Geo-FNO 退化为标准 FNO
- **Fourier 延拓**：对拓扑不规则域（如含孔洞），先嵌入到更大的规则域再做变换，训练时仅在原域计算损失
- **变形网络设计**：采用残差连接 \(\xi = f(x,a) + x\)（初始化为恒等映射）+ 正弦特征提升表达力
- **多场景验证**：弹性力学（点云输入）、塑性锻造、跨声速翼型流动、弯管流动四类 PDE 问题
- **逆向设计能力**：训练后可端到端优化几何参数（如翼型形状），实现气动逆设计

#### 🔬 深入细节
##### 核心架构示意图

![Geo-FNO 架构图](https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x1.png)
*图：Geo-FNO 架构。(a) 标准 FNO 在规则域上操作；(b) Geo-FNO 通过坐标变换 \(\phi_a\) 将不规则物理域映射到规则计算域，在计算域上执行 FFT，再映射回物理域。*

![实验场景](https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x2.png)
*图：弹性力学（含孔洞的单元胞）和塑性锻造问题示例。*

##### 算法伪代码

```python
# Geo-FNO 前向传播伪代码
def geo_fno_forward(x_phys, a, phi_inv_net, fno_layers, P, Q):
    """
    x_phys: 物理域网格点坐标 [N, d]
    a:      输入函数值（如几何参数、边界条件）[N, d_a]
    phi_inv_net: 变形网络 φ^{-1}
    """
    # Step 1: 坐标变换 — 物理域 → 计算域
    xi = phi_inv_net(x_phys, a)  # ξ = f(x, a) + x (残差连接)
    # xi 现在是 [0,1]^d 上的均匀网格

    # Step 2: 提升通道维度
    v = P(a)  # [N, d_a] → [N, d_v]

    # Step 3: L 层 Fourier 卷积（在计算域上）
    for l in range(L):
        # 几何傅里叶变换（首层用 F_a，中间层用标准 FFT）
        v_hat = FFT(v)                    # 在均匀计算网格上做 FFT
        v_hat = R_l @ v_hat               # 频域线性变换（截断高频）
        v_freq = IFFT(v_hat)              # 逆 FFT
        v_local = W_l @ v + b_l           # 局部线性变换
        v = activation(v_freq + v_local)  # 残差 + 激活

    # Step 4: 投影到输出空间
    u = Q(v)  # [N, d_v] → [N, d_u]

    # Step 5: 逆变换回物理域（通过 ξ → x 对应关系）
    return u  # 物理域上的解
```

##### 方法详解

**1. 动机与背景：FNO 的几何局限**

标准 Fourier Neural Operator (FNO) 通过在频域进行全局卷积来学习 PDE 的解算子，其核心优势在于利用 FFT 实现 \(O(N \log N)\) 的高效计算。然而，FFT 要求输入数据定义在**均匀网格**和**规则域**（如矩形/环面）上，这严重限制了 FNO 在实际工程问题中的应用——真实 PDE 问题通常涉及复杂几何（翼型、含孔洞结构等）和非均匀自适应网格。

现有的解决方案包括：(1) 将不规则域插值到规则网格再用 FNO，但插值引入额外误差；(2) 使用图神经网络（GNO）处理任意网格，但失去了频域全局卷积的效率优势。Geo-FNO 的核心洞察是：**与其改变算子，不如改变坐标系**。

> 💡 **关键直觉**：如果我们能找到一个光滑的坐标变换，把不规则的物理域"拉直"成规则的计算域，就可以在计算域上直接用 FFT，同时保持与物理域的精确对应关系。

**2. 核心机制：可微坐标变换**

Geo-FNO 的数学基础是微分同胚映射。定义坐标变换：

$$\phi_a: D^c \to D_a, \quad \xi \mapsto x$$

其中 \(D^c = [0,1]^d\) 是单位环面（计算域），\(D_a\) 是物理域。该映射将计算域上的均匀网格 \(\mathcal{T}^c\) 推前（pushforward）为物理域上的自适应网格：

$$\mathcal{T}_a \coloneqq \phi_a(\mathcal{T}^c), \quad \psi_a(x) \coloneqq \psi^c \circ \phi_a^{-1}(x)$$

对于物理域上的函数 \(v(x)\)，通过拉回（pullback）变换到计算域：

$$v^c(\xi) \coloneqq v(\phi_a(\xi))$$

**3. 几何傅里叶变换**

基于坐标变换，定义正向几何傅里叶变换：

$$(\mathcal{F}_a v)(k) = \int_{D^c} v^c(\xi) e^{-2i\pi \langle \xi, k \rangle} d\xi \approx \frac{1}{|\mathcal{T}^i|} \sum_{x \in \mathcal{T}^i} m(x) v(x) e^{-2i\pi \langle \phi^{-1}(x), k \rangle}$$

逆变换为：

$$(\mathcal{F}_a^{-1} \hat{v})(x) = \sum_k \hat{v}(k) e^{2i\pi \langle \phi^{-1}(x), k \rangle}$$

> ⚠️ **重要性质**：正向和逆向变换都只需要 \(\phi^{-1}\)（物理域→计算域方向），无需显式计算 \(\phi\)，这大大简化了实现。

当 \(\phi^{-1}\) 将输入网格映射为均匀网格时，权重 \(m(x) = 1\)，几何傅里叶变换退化为标准 FFT。

**4. 变形网络的设计**

变形网络 \(\phi_\theta^{-1}\) 将物理坐标和几何参数映射到计算坐标：

$$\phi_\theta^{-1}: (x_1, x_2, a) \mapsto (\xi_1, \xi_2)$$

关键设计选择：
- **残差连接**：\(\xi = f(x, a) + x\)，使 \(\phi^{-1}\) 初始化为恒等映射，训练更稳定
- **正弦位置编码**：使用 \(\sin(2^i x)\) 特征提升网络对高频几何细节的表达能力
- **端到端训练**：变形网络与 FNO 主体联合优化，损失函数为相对 L2 误差

**5. 两种使用场景**

| 场景 | 坐标映射方式 | 是否需要学习 | 示例 |
|------|-------------|-------------|------|
| 结构化网格 | 索引归一化：\(\phi^{-1}: \mathcal{T}^i[i_1,...,i_d] \mapsto (i_1/s_1,...,i_d/s_d)\) | 否 | 翼型、管道 |
| 点云/非结构网格 | 神经网络参数化 | 是 | 弹性力学 |

**6. Fourier 延拓处理拓扑不规则域**

当物理域拓扑不规则（如含孔洞，不同胚于圆盘或环面）时，不存在到 \(D^c\) 的微分同胚。此时 Geo-FNO 先将域嵌入更大的规则域 \(D_a \hookrightarrow \bar{D}_a\)（如将含孔方形补全为完整方形），在 \(\bar{D}_a\) 上做变换。训练时仅在原域 \(D_a\) 上计算损失，网络隐式学习延拓。

**7. 实验结果**

在弹性力学（点云输入）基准上，Geo-FNO 显著优于其他方法：

| 模型 | 测试误差 | 训练时间/epoch |
|------|---------|---------------|
| **Geo-FNO (learned)** | **2.29%** | 1s |
| Geo-FNO (O-mesh) | 3.63% | 0.5s |
| FNO + 插值 | 5.08% | 0.5s |
| UNet + 插值 | 5.31% | 0.9s |
| DeepONet | 9.65% | 45s |
| GNO | 12.60% | 32s |

在翼型和管道流动（结构化网格）上，Geo-FNO 同样优于插值方法（翼型测试误差 1.38% vs FNO+插值 4.21%）。推理速度约 0.01 秒/样本，比数值求解器快 \(10^5\) 倍。

> 💡 **关键发现**：学习到的变形比手工设计的启发式变形（R-mesh、O-mesh）更优，说明端到端学习坐标变换的有效性。训练后的 Geo-FNO 还可直接用于逆向设计——通过反向传播优化翼型形状参数以最小化阻力、最大化升力。

#### 🧪 练习题
```yaml
question: "Geo-FNO 中几何傅里叶变换的正向和逆向变换分别需要哪个方向的坐标映射？"
options:
  - "正向需要 φ（计算域→物理域），逆向需要 φ^{-1}（物理域→计算域）"
  - "正向和逆向都只需要 φ^{-1}（物理域→计算域）"
  - "正向和逆向都只需要 φ（计算域→物理域）"
  - "正向需要 φ^{-1}，逆向需要 φ，因此必须显式计算两个方向的映射"
answer: 1
explain: "论文的一个关键设计是正向变换 F_a 用 φ^{-1} 将输入函数拉回计算域，逆向变换 F_a^{-1} 用 φ^{-1} 将查询点映射到计算域以评估傅里叶基，因此只需定义 φ^{-1} 一个方向的映射。"
```

### U-NO

```yaml
id: uno
num: 30
name: U-NO
full_name: U形神经算子 (U-shaped Neural Operator)
year: '2023'
org: 布朗大学
parent: fno
paper_url: https://www.nature.com/articles/s41467-024-49411-w
project_url: ''
category: pde_solving
motivation: 多尺度结构捕捉全局与局部特征
```

#### 📝 一句话总结
U-NO 将 U-Net 的编码器-解码器、多尺度压缩扩张和跳连思想移植到神经算子中，使 Fourier/积分算子层能在较小函数域上堆得更深，同时保留高分辨率细节，提升 Darcy flow 与 Navier-Stokes 等 PDE 解算子的精度和内存效率。

#### 🎯 核心要点
- **U 形算子结构**：先逐层收缩函数定义域并增加通道维度，再逐层扩张回原域并降低通道维度
- **神经算子层可插拔**：内部 \(G_i\) 可由 FNO 等积分算子实现，U-NO 是架构模板而不绑定单一积分核
- **跳连保留细节**：编码阶段同尺度特征通过 function-space concatenation 传到解码阶段，缓解瓶颈层丢失高频信息
- **更深更宽**：域收缩减少中间函数的空间/时空点数，使模型能使用更多层和更多参数而不线性爆炸内存
- **2D 与 3D 任务**：支持静态二维算子，也支持在 \((x,y,t)\) 上直接执行 3D spatio-temporal operator learning
- **U-NO† 变体**：采用更激进的 \(1/2\) 空间收缩/扩张因子，以降低训练内存并支持高分辨率数据
- **实验基准**：Darcy flow、2D Navier-Stokes 自回归预测、3D 时空 Navier-Stokes、zero-shot super-resolution
- **报告效果**：论文/代码页报告 U-NO 在 Darcy flow 与湍流 Navier-Stokes 上平均提升约 26% 与 44%，3D 时空任务提升约 37%

#### 🔬 深入细节
##### 可访问来源与核心示意图

任务给出的 Nature Communications 链接对应的是后续 latent neural operator 论文，并非 U-NO 原论文。U-NO 的主要来源是 TMLR/OpenReview 论文 https://openreview.net/forum?id=j3oQF9coJd、PDF https://openreview.net/pdf/0eaad1b3c95bb018b838f3e12e6cb71274d57160.pdf、官方代码库 https://github.com/ashiq24/UNO。

![U-NO 架构图](https://raw.githubusercontent.com/ashiq24/UNO/web_resources/uno.png)
*图：U-NO 先压缩函数域并增加通道，再通过跳连和解码阶段恢复分辨率；右侧展示 Navier-Stokes 预测与真值对比。*

##### 算法伪代码

```python
# U-NO 前向传播伪代码
def uno_forward(a):
    # a: 输入函数，如 Darcy 系数场或 Navier-Stokes 初始涡量
    v = P(a)                      # point-wise lifting: d_a -> d_v
    skips = []

    # encoding: 收缩空间/时空域，增加通道
    for G in encoder_ops:
        v = G(v)                  # integral/Fourier neural operator layer
        skips.append(v)
        v = contract_domain(v)    # 例如 spectral truncation / interpolation
        v = increase_channels(v)

    # bottleneck: 在最小域上执行全局算子
    v = bottleneck_operator(v)

    # decoding: 扩张域，融合同尺度跳连，减少通道
    for G in decoder_ops:
        v = expand_domain(v)
        v = concatenate(v, skips.pop())
        v = decrease_channels(v)
        v = G(v)

    # projection: 输出解函数
    return Q(v)
```

##### 神经算子层的基本形式

U-NO 以神经算子为基础。对第 \(i\) 层输入函数 \(v_i\)，一个通用非线性算子层可写为：

$$
G_i v_i(x)
=
\sigma\left(
\int_{D_i}\kappa_i(x,y)v_i(y)\,d\mu_i(y)
+W_i v_i(x)
+b_i(x)
\right).
$$

其中 \(\kappa_i(x,y)\) 是可学习核，积分项捕获全局相互作用，\(W_i v_i(x)\) 是局部逐点线性变换，\(\sigma\) 是非线性。若用 FNO 实现 \(\kappa_i\)，积分卷积在 Fourier 域中变成低频模态上的线性变换：

$$
\mathcal{K}_i(v)(x)=
\mathcal{F}^{-1}\left(
R_i(k)\cdot \mathcal{F}(v)(k)
\right)(x),
$$

其中只保留前 \(K\) 个 Fourier modes。U-NO 的创新不在于重新定义这一层，而在于让这些层工作在逐步变化的函数域和通道维度上。

##### U 形函数空间变换

普通 FNO 通常在同一个网格和同一尺度上重复堆叠 Fourier 层。这样做的好处是简单，但深层模型会占用大量激活内存，而且每一层都在完整高分辨率域上计算。U-NO 将中间函数写成：

$$
v_i: D_i \rightarrow \mathbb{R}^{d_i},
$$

编码阶段满足：

$$
D_{i+1}\subset D_i,\qquad d_{i+1}>d_i,
$$

即空间/时间域变小，通道数变大。解码阶段反过来：

$$
D_{i+1}\supset D_i,\qquad d_{i+1}<d_i.
$$

这相当于用较低分辨率的函数域承载更抽象的全局表示。对 PDE 场而言，低频或大尺度结构常常主导整体演化，而高频局部细节可通过跳连补回。

##### 跳连为什么重要

如果只压缩再扩张，中间瓶颈会丢掉边界层、尖峰、涡结构等高频信息。U-NO 在编码器第 \(i\) 层与解码器对应层之间做拼接：

$$
\tilde{v}_{L-i}=
\operatorname{concat}\left(v_{L-i}, v_i\right).
$$

这与 U-Net 的直觉相同，但对象不是有限维图像特征图，而是函数空间中的向量值函数。论文特别指出，单纯给 FNO 加 skip connection 并不能解释全部收益；关键还包括函数域收缩带来的内存节省和多尺度表示。

##### 2D 与 3D 时空算子

对 Darcy flow，U-NO 学习从扩散系数 \(a(x)\) 到椭圆 PDE 解 \(u(x)\) 的算子：

$$
\mathcal{G}^\dagger:
\{a:(0,1)^2\rightarrow\mathbb{R}\}
\rightarrow
\{u:(0,1)^2\rightarrow\mathbb{R}\}.
$$

对 Navier-Stokes，U-NO 可采用两种方式：一种是 2D 空间算子自回归地向前滚动时间；另一种是直接在三维时空域上学习：

$$
\mathcal{G}^\dagger:
\{a:(0,1)^2\times[0,T_{in}]\rightarrow\mathbb{R}^{d_A}\}
\rightarrow
\{u:(0,1)^2\times(T_{in},T]\rightarrow\mathbb{R}^{d_U}\}.
$$

3D 版本中，\(G_i\) 同时改变空间域、时间域和通道维度。这样能避免自回归误差逐步累积，但单层计算更重；U 形收缩因此更加关键。

##### 训练目标与误差度量

U-NO 是数据驱动神经算子，训练集由数值求解器生成的输入-输出函数对 \((a_j,u_j)\) 组成。常用目标是相对 \(L^2\) 误差：

$$
\mathcal{L}(\theta)=
\frac{1}{N}\sum_{j=1}^{N}
\frac{\left\|
\mathcal{G}_\theta(a_j)-u_j
\right\|_2}
{\left\|u_j\right\|_2}.
$$

因为 \(\mathcal{G}_\theta\) 是算子，训练后可在高于训练分辨率的网格上评估，这也是 zero-shot super-resolution 实验的依据。U-NO 的多尺度结构使其比固定尺度 FNO 更适合这种分辨率迁移：压缩路径学习全局低频结构，跳连路径保留局部形态。

##### 与 FNO/UNet 的区别

| 方法 | 核心操作 | 是否学习函数到函数算子 | 多尺度方式 | 主要优势 |
|------|----------|------------------------|------------|----------|
| UNet | 局部卷积 + 下采样/上采样 | 通常不是严格神经算子 | 图像式 encoder-decoder | 局部细节强，但分辨率泛化弱 |
| FNO | Fourier 域全局卷积 | 是 | 多层通常同尺度 | 全局感受野与分辨率外推能力强 |
| U-NO | 神经算子层 + U 形函数域变换 | 是 | 收缩/扩张函数域 + 跳连 | 兼顾全局算子、多尺度表示和内存效率 |

> 💡 关键：U-NO 不是“把 UNet 用在 PDE 图像上”，而是把 U 形多尺度思想写进 neural operator 的函数空间映射中，使每层仍然是函数到函数的算子。

#### 🧪 练习题
```yaml
question: "U-NO 中逐层收缩函数定义域的主要目的是什么？"
options:
  - "让模型只能在低分辨率上输出，避免高分辨率预测"
  - "减少中间激活内存并学习紧凑多尺度表示，从而支持更深的神经算子"
  - "完全替代 Fourier 变换，使模型不再需要积分算子层"
  - "把所有 PDE 约束硬编码进损失函数"
answer: 1
explain: "U-NO 在编码阶段收缩函数域、增加通道，使昂贵算子层在更小域上计算；解码阶段结合跳连恢复细节。"
```

### PySR

```yaml
id: pysr
num: 31
name: PySR
full_name: Python符号回归 (PySR)
year: '2023'
org: Miles Cranmer
parent: —
paper_url: https://arxiv.org/abs/2305.01582
project_url: ''
category: physics_discovery
motivation: 进化算法提取物理表达式
```

#### 📝 一句话总结
PySR 是面向科学发现的高性能符号回归系统，用多种群进化搜索、表达式简化和常数优化在数据中发现简洁可解释的解析公式，并通过 Julia 后端 SymbolicRegression.jl 提供并行、可定制和可导生态接口。

#### 🎯 核心要点
- **表达式树搜索**：候选模型表示为由变量、常数、一元/二元算子组成的 expression tree
- **多种群进化**：维护多个独立“岛屿”种群异步演化，并周期性迁移优秀表达式以兼顾探索与利用
- **锦标赛选择**：随机抽取子集，按适应度以概率选择较优个体，再执行变异或交叉
- **evolve-simplify-optimize 循环**：先通过变异/交叉探索结构，再代数化简，再用 BFGS 等方法优化实数常数
- **年龄正则化**：替换最老表达式而非只替换最差表达式，降低早熟收敛风险
- **模拟退火**：高温阶段允许更多劣化变异以扩展搜索，低温阶段聚焦高适应度表达式
- **复杂度-Pareto 前沿**：按复杂度保留最优表达式，让用户在准确率与可解释性之间选择
- **科学场景适配**：支持自定义算子、自定义损失、约束、加权样本、噪声去除、特征选择和 SymPy/JAX/PyTorch 导出
- **EmpiricalBench**：论文引入科学经验公式基准，用历史经验定律和合成数据评估符号回归算法

#### 🔬 深入细节
##### 可访问来源与核心示意图

主要来源为论文 https://arxiv.org/abs/2305.01582、PDF https://arxiv.org/pdf/2305.01582、PySR 仓库 https://github.com/MilesCranmer/PySR，以及论文源码仓库 https://github.com/MilesCranmer/pysr_paper。算法循环图见论文 PDF 的 Figure 3/4；论文源码中也提供了对应的图源 `https://raw.githubusercontent.com/MilesCranmer/pysr_paper/main/src/static/pysr_diagram_v6.pdf`。

![PySR 论文快照](https://raw.githubusercontent.com/MilesCranmer/pysr_paper/main/html/abstract_snapshot.png)
*图：PySR 论文页面快照；算法级图示见 arXiv PDF 中的 Figure 3/4，分别描述内层 evolve-simplify-optimize 循环与多岛屿迁移。*

##### 算法伪代码

```python
# PySR 多种群符号回归伪代码
def pysr(X, y):
    populations = [random_expression_population(size=L) for _ in range(n_pop)]
    hall_of_fame = ParetoFront()  # 每个复杂度下的最佳表达式

    for outer_iter in range(n_iterations):
        parallel_for population in populations:
            # evolve: 多次锦标赛选择 + 变异/交叉
            for k in range(n_cycles):
                if rand() > p_crossover:
                    expr = tournament_select(population, X, y)
                    T = 1.0 - k / n_cycles
                    new_expr = mutate_with_annealing(expr, T)
                    replace_oldest(population, new_expr)
                else:
                    e1 = tournament_select(population, X, y)
                    e2 = tournament_select(population, X, y)
                    c1, c2 = crossover(e1, e2)
                    replace_oldest_two(population, c1, c2)

            # simplify + optimize constants
            for expr in population:
                expr = algebraic_simplify(expr)
                expr = optimize_constants(expr, X, y)  # 默认可用 BFGS
                hall_of_fame.update(expr, loss(expr, X, y), complexity(expr))

        # migration: 在岛屿间交换优秀表达式
        for population in populations:
            population.inject(sample_from(hall_of_fame), rate=alpha_H)
            population.inject(sample_from_other_islands(populations), rate=alpha_M)

    return hall_of_fame
```

##### 符号回归目标

给定数据 \(\{(\mathbf{x}_i,y_i)\}_{i=1}^{n}\)，符号回归希望找到一个解析表达式 \(E(\mathbf{x})\)，在误差小的同时保持简单。最基础的加权均方误差可写为：

$$
\mathcal{L}(E)=
\frac{1}{n}\sum_{i=1}^{n}
w_i\left(E(\mathbf{x}_i)-y_i\right)^2.
$$

但科学发现通常不只追求最低误差。一个表达式如果多出大量嵌套函数，只获得微小误差下降，往往不如稍粗糙但可解释的公式。PySR 因此维护复杂度 \(C(E)\) 与损失 \(\mathcal{L}(E)\) 的 Pareto front：

$$
\mathcal{P}=
\left\{
E:\nexists E'
\text{ such that }
C(E')\le C(E),\ 
\mathcal{L}(E')\le \mathcal{L}(E)
\right\}.
$$

默认复杂度通常是表达式树节点数，节点包括变量、常数和算子；但 PySR 允许用户自定义复杂度，使某些领域算子更便宜或更昂贵。这样可以把“什么公式更可解释”交给具体科学领域定义。

##### 表达式树与变异操作

PySR 的候选公式是一棵树。例如：

$$
E(x_0,x_1)=x_0^2+\cos(x_1)-2
$$

可以表示为根节点 \(+\)，左子树为 \(\operatorname{square}(x_0)\)，右子树为 \(\cos(x_1)-2\)。进化搜索通过局部修改树结构来探索公式空间。论文列出的主要变异包括：扰动常数、替换同元数算子、在根或叶子处追加节点、在中间插入节点、删除子树、化简树、生成全新树以及空操作。

对一次候选变异 \(E\rightarrow E^\*\)，模拟退火接受概率可概括为：

$$
q_{anneal}=
\exp\left(
-
\frac{\mathcal{L}(E^\*)-\mathcal{L}(E)}
{\alpha T}
\right),
$$

其中 \(T\in[0,1]\) 是退火温度，\(\alpha\) 控制温度尺度。当 \(T\) 高时，搜索更愿意接受较差但多样的新表达式；当 \(T\) 低时，搜索更偏向保留当前更优结构。

##### evolve-simplify-optimize 的意义

普通遗传编程主要依靠变异/交叉找到结构，但科学公式常含未知实数常数，例如 \(a\exp(-bt)+c\)。如果把常数也完全交给随机变异，搜索会非常慢。PySR 将结构搜索和连续常数优化分开：

1. evolve 阶段改变树结构，探索“公式长什么样”
2. simplify 阶段用代数规则减少冗余，如 \(x+0\rightarrow x\)
3. optimize 阶段固定结构，用数值优化器拟合常数

固定结构后的常数优化可写为：

$$
\mathbf{c}^\star=
\arg\min_{\mathbf{c}}
\frac{1}{n}\sum_{i=1}^{n}
\left(E(\mathbf{x}_i;\mathbf{c})-y_i\right)^2.
$$

这一步对物理发现很重要：真实经验公式往往结构简单但常数非平凡，例如比例系数、指数、偏置、归一化常数等。

##### 多种群与迁移

PySR 同时维护 \(n_p\) 个种群 \(P_1,\ldots,P_{n_p}\)。每个种群独立执行内层进化，相当于多个搜索岛屿并行探索不同区域。每轮外层循环后，系统从两个来源迁移表达式：

$$
H=\text{全局 hall-of-fame},\qquad
M_i=\text{第 }i\text{ 个种群的优秀表达式集合}.
$$

以概率 \(\alpha_H\) 从全局最优集合 \(H\) 注入表达式，以概率 \(\alpha_M\) 从其他岛屿的优秀表达式集合注入。这样既保留并行搜索的多样性，又能让局部发现扩散到其他种群继续改进。

##### 科学发现功能

PySR 的价值不只是“能跑遗传算法”。论文强调科学符号回归需要处理现实数据的复杂性：

- **噪声数据**：可先用 Gaussian process 去噪，核函数可包含 RBF、white-noise 和常数项：

$$
k(x,x')=
\sigma^2\exp\left(-\frac{\|x-x'\|^2}{2l^2}\right)
+\alpha\delta(x-x')+C.
$$

- **加权样本**：若样本测量不确定度为 \(\sigma_i\)，可令 \(w_i\propto 1/\sigma_i^2\)，降低高噪声样本影响
- **自定义损失**：用户可定义负对数似然、分类损失、隐式方程损失或带物理约束的目标
- **自定义算子**：领域函数如 Bessel 函数、特殊激活、聚合算子可作为普通一元/二元节点进入搜索
- **硬约束**：可限制表达式总大小、树深度、特定算子的子表达式复杂度，防止出现无意义嵌套
- **特征选择**：用梯度提升树先筛选重要变量，再交给符号搜索，缓解高维输入的组合爆炸

##### 与 SINDy 和黑箱模型的关系

SINDy 预先给定候选项字典 \(\Theta(X)\)，通过稀疏回归选择线性组合：

$$
\dot{X}=\Theta(X)\Xi.
$$

它在动力系统方程发现上非常高效，但搜索空间受候选库限制。PySR 则直接搜索表达式树，能组合出更灵活的非线性结构和领域算子；代价是搜索空间更大，需要进化启发式、并行种群和常数优化共同控制复杂度。

与神经网络黑箱回归相比，PySR 的输出是解析公式。黑箱模型可能获得更低插值误差，但公式模型更容易做量纲检查、极限分析、外推判断和理论解释。对 AI for Science 来说，这种“可读模型”往往比单纯预测精度更有价值。

#### 🧪 练习题
```yaml
question: "PySR 中 evolve-simplify-optimize 循环的核心目的是什么？"
options:
  - "只保留固定候选库中的线性项"
  - "先搜索表达式结构，再化简冗余形式，并对公式中的实数常数做连续优化"
  - "把所有表达式都转换成神经网络权重"
  - "强制每个候选公式具有相同复杂度"
answer: 1
explain: "PySR 将离散结构搜索和连续常数拟合分开处理，使复杂公式空间更可搜索，也更适合包含未知实数常数的科学经验公式。"
```

### Poseidon

```yaml
id: poseidon
num: 32
name: Poseidon
full_name: PDE基础模型 (Poseidon)
year: '2024'
org: ETH Zurich
parent: fno
paper_url: https://arxiv.org/abs/2405.19101
project_url: ''
category: pde_solving
motivation: 首个大规模PDE基础模型
```

#### 📝 一句话总结
Poseidon 提出面向 PDE 解算子的基础模型：用可扩展 Operator Transformer 学习从初值/条件到完整解轨迹的映射，并通过 lead-time 条件化与 all2all 轨迹训练，让少量流体 PDE 预训练能迁移到大量未见过的 PDE 下游任务。

#### 🎯 核心要点
- **基础模型目标**：学习 PDE solution operator \(\mathcal{S}(t,a)\)，而不是只预测固定时间步或固定方程实例
- **主干模型 scOT**：使用层级式多尺度 SwinV2/shifted-window Transformer，并以 U-Net 式 patch merging/patch expansion 处理函数场
- **连续时间条件化**：在 Transformer block 中使用 lead-time conditioned layer norm，让同一模型可输入任意预测时间 \(t\)
- **all2all 训练策略**：利用时间依赖 PDE 解算子的半群性质，把单条轨迹中的任意 \((t_k,t_{\bar{k}})\) 快照对都变成训练样本，从 \(O(K)\) 扩展到 \(O(K^2)\)
- **预训练数据**：包含 6 个流体力学算子，4 个 compressible Euler、2 个 incompressible Navier-Stokes，共 77,840 条轨迹、11 个时间快照，经 all2all 后约 5.11M 训练样本
- **迁移评估**：在 15 个 out-of-distribution 下游任务上评估，其中 9 个涉及预训练未见过的 PDE 或物理过程
- **实现开放**：论文、代码和 PDEgym 数据集公开，可从 arXiv、GitHub 与 Hugging Face 访问

#### 🔬 深入细节
##### 图示与来源

![Poseidon scOT 与 all2all 训练示意图](https://arxiv.org/html/2405.19101v2/x2.png)
*图：Poseidon 的 scOT 主干、SwinV2 block、shifted window 机制和 all2all training。来源为 arXiv HTML Figure 2；论文页为 https://arxiv.org/abs/2405.19101，官方代码为 https://github.com/camlab-ethz/poseidon。*

##### 算法伪代码

```python
# Poseidon/scOT 预训练与下游微调伪代码
def build_all2all_pairs(trajectory):
    # trajectory = [u(t_0), ..., u(t_K)]
    pairs = []
    for k in range(K + 1):
        for k_bar in range(k, K + 1):
            lead_time = t[k_bar] - t[k]
            pairs.append((trajectory[k], lead_time, trajectory[k_bar]))
    return pairs

def scot_forward(u_in, lead_time):
    tokens = patch_embed(u_in)
    h = tokens
    for stage in encoder_stages:
        h = shifted_window_swin_block(h, time=lead_time)
        h = patch_merge(h)
    for stage in decoder_stages:
        h = patch_expand(h)
        h = convnext_skip_mix(h)
        h = shifted_window_swin_block(h, time=lead_time)
    return recover_field(h)

for pde_family, dataset in pretraining_operators:
    for trajectory in dataset:
        for u_t, dt, u_future in build_all2all_pairs(trajectory):
            pred = scot_forward(u_t, dt)
            loss = relative_l1(pred, u_future)
            optimizer.step(loss)

# 下游任务：载入预训练参数，替换/扩展输入输出通道后少样本微调
theta = load_poseidon_pretrained()
theta = finetune(theta, downstream_trajectories)
```

##### 问题设定：从“固定网格预测”到“解算子学习”

Poseidon 要学习的是 PDE 解算子。给定初值或条件 \(a\)，真实解算子 \(\mathcal{S}\) 输出任意时刻的解 \(\mathcal{S}(t,a)\)。这与普通自回归一步预测不同：模型不是只看前几个时间步滚动预测，而是显式把 lead time \(t\) 作为输入，目标是近似整个轨迹生成机制。

标准训练可以写成：

$$
\mathcal{L}(\theta)=\frac{1}{M(K+1)}
\sum_{i=1}^{M}\sum_{k=0}^{K}
\left\|\mathcal{S}_{\theta}^{*}(t_k,a_i)-\mathcal{S}(t_k,a_i)\right\|_{L^p(D)}^p
$$

这里 \(M\) 是轨迹条数，\(K+1\) 是每条轨迹的快照数。论文实际采用相对形式并以 \(p=1\) 为主，使不同 PDE/物理量的尺度更容易平衡。

##### scOT 架构：把视觉 Transformer 改造成算子学习器

Poseidon 的主干 scOT 先把输入函数场 \(a(x)\) 切成 patch 并线性嵌入，再用 SwinV2 shifted-window attention 在局部窗口内建模空间相关性。窗口在相邻层之间平移，因此每个 token 既能享受局部窗口 attention 的计算效率，也能跨层传播到更远空间区域。

SwinV2 block 的结构可概括为：

$$
\begin{aligned}
v'_{\ell} &= v_{\ell-1} + \mathrm{LN}_{\alpha_1^\ell,\beta_1^\ell}
\left(\mathrm{W\text{-}MSA}(v_{\ell-1})\right),\\
v_{\ell} &= v'_{\ell} + \mathrm{LN}_{\alpha_2^\ell,\beta_2^\ell}
\left(\mathrm{MLP}(v'_{\ell})\right).
\end{aligned}
$$

与普通 Swin 不同，Poseidon 把 layer norm 改成时间条件化形式：

$$
\mathrm{LN}_{\alpha(t),\beta(t)}(v)(x)
= \alpha(t)\odot \frac{v(x)-\mu_v(x)}{\sigma_v(x)}+\beta(t)
$$

其中 \(\alpha(t)=\bar{\alpha}t+\alpha\)，\(\beta(t)=\bar{\beta}t+\beta\)。直觉上，模型在不同 lead time 下使用不同的归一化尺度和偏置，相当于给每个时间跨度一个可学习的调制器，因此可以直接预测 \(t=0.3\)、\(t=1.0\) 或更长时间的解，而不必把时间离散固定死。

##### all2all 训练：把一条轨迹拆成大量解算子样本

时间依赖 PDE 的解算子具有半群性质：

$$
u(t^*)=\mathcal{S}(t^*,a)
=\mathcal{S}(t^*-t,u(t))
=\mathcal{S}(t^*-t,\mathcal{S}(t,a)),
\quad 0\le t\le t^*\le T
$$

Poseidon 利用这个性质，把轨迹中任意早晚快照对 \((u(t_k),u(t_{\bar{k}}))\) 都当作一个训练样本，输入是 \(u(t_k)\)，lead time 是 \(t_{\bar{k}}-t_k\)，监督目标是 \(u(t_{\bar{k}})\)。对应损失为：

$$
\widehat{\mathcal{L}}(\theta)=
\frac{1}{M\widehat{K}}
\sum_{i=1}^{M}\sum_{0\le k\le \bar{k}\le K}
\left\|
\mathcal{S}(t_{\bar{k}}-t_k,u_i(t_k))
-\mathcal{S}_{\theta}^{*}(t_{\bar{k}}-t_k,u_i(t_k))
\right\|_{L^p(D)}^p
$$

其中 \(\widehat{K}=(K+1)(K+2)/2\)。这一步是 Poseidon 成为基础模型的关键：它不只增加样本量，还强迫模型在多个时间间隔上学习一致的动力学表示。

##### 预训练与微调机制

预训练时，Poseidon 将不同 PDE 和不同数据分布用索引 \((\lambda,\xi)\) 表示，对每个算子 \(\mathcal{S}_{\lambda,\xi}\) 共享同一个 scOT。若不同物理系统通道数不同，则用额外常零通道补齐到统一维度，再统一输入模型。预训练目标是所有预训练算子的 all2all 损失平均：

$$
\theta^*=\arg\min_{\theta}
\frac{1}{|\widehat{\Lambda}||\widehat{\Xi}|}
\sum_{\lambda\in\widehat{\Lambda}}
\sum_{\xi\in\widehat{\Xi}}
\widehat{\mathcal{L}}_{\lambda,\xi}(\theta)
$$

微调时，下游任务可以是新数据分布、新物理过程，甚至新 PDE。Poseidon 复用预训练的空间-时间表征，只针对下游算子做少样本微调。它也支持两类推理：直接输入目标 lead time 一次预测，或者把目标时间拆成若干步做 autoregressive rollout。

> 💡 关键：Poseidon 的贡献不只是“Transformer 更大”，而是把 PDE 解算子、连续时间调制、半群数据扩增和跨 PDE 预训练放在同一个训练范式里。

#### 🧪 练习题
```yaml
question: "Poseidon 的 all2all training 主要利用了时间依赖 PDE 解算子的哪一条性质？"
options:
  - "傅里叶变换后所有 PDE 都变成线性方程"
  - "解算子满足半群性质，可把同一轨迹中的任意早晚快照对作为训练样本"
  - "SwinV2 attention 的窗口大小随时间自动增大"
  - "所有下游 PDE 都与 Navier-Stokes 方程完全相同"
answer: 1
explain: "all2all training 使用 \\(u(t^*)=\\mathcal{S}(t^*-t,u(t))\\)，把单条轨迹扩展为 \\(O(K^2)\\) 个监督对。"
```

### Walrus

```yaml
id: walrus
num: 33
name: Walrus
full_name: 海象基础模型 (Walrus)
year: '2026'
org: Polymathic AI
parent: poseidon
paper_url: https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/
project_url: ''
category: pde_solving
motivation: 15TB数据训练跨领域物理基础模型
```

#### 📝 一句话总结
Walrus 是 Polymathic AI 面向连续介质动力学的跨领域物理基础模型，用 1.3B 参数的时空 Transformer 在 19 类、63 个物理变量的 2D/3D 流体及类流体数据上预训练，并通过 patch jittering、2D/3D 统一增强、adaptive-compute tokenization 和拓扑感知分布式采样提升长期稳定性与训练吞吐。

#### 🎯 核心要点
- **模型定位**：面向 fluid-like continuum dynamics 的通用代理仿真模型，可做 next-step prediction、autoregressive rollout 和下游微调
- **模型规模**：论文报告 Walrus 为 1.3B 参数 Transformer，训练覆盖 The Well 与 FlowBench 等来源
- **训练数据**：19 个物理场景、63 个状态变量，覆盖 astrophysics、geoscience、rheology、plasma physics、acoustics、classical fluids；新闻/项目页说明 The Well 约 15TB
- **核心架构**：space-time factorized transformer，交替执行空间 attention 与时间 causal attention
- **自适应 tokenization**：encoder/decoder 使用 Convolutional Stride Modulation，根据输入分辨率动态选择下采样/上采样步幅
- **长期稳定性**：patch jittering 在 patch 化前随机平移参考系，缓解 stride/patch 操作造成的 aliasing 与网格印记
- **跨维度训练**：将 2D 数据作为 3D 中的薄平面并施加 tensor-law aware rotation/reflection，使 2D/3D 数据能进入统一训练流程
- **分布式效率**：topology-aware sampling 让 HSDP/FSDP 组内采样同类数据，论文报告相对朴素 FSDP 吞吐提升 262%

#### 🔬 深入细节
##### 图示与来源

![Walrus 架构示意图](https://raw.githubusercontent.com/PolymathicAI/walrus/main/assets/ArchitectureWIP.png)
*图：Walrus 官方 GitHub README 中的架构示意，展示 adaptive-compute patching、patch jitter、空间/时间 attention 与逆 patch jitter。给定 `paper_url` 是新闻页；可追溯论文为 arXiv:2511.15684（https://arxiv.org/abs/2511.15684），官方代码为 https://github.com/PolymathicAI/walrus，模型卡为 https://huggingface.co/polymathic-ai/walrus。*

##### 算法伪代码

```python
# Walrus 训练/推理伪代码
def walrus_forward(history, system_meta):
    # history = [u(t-tau+1), ..., u(t)]，包含多个物理场
    x = normalize_by_rms(history)             # per-field RMS over space-time

    if system_meta.dim == 2:
        x = embed_2d_as_thin_3d_plane(x)      # singleton dimension + zero padding
        x = tensor_law_augmentation(x)        # vector: R u, tensor: R u R^T

    shift = sample_patch_jitter()
    x = translate_reference_frame(x, shift)

    tokens = adaptive_compute_patch(x)        # CSM 动态选择 stride，控制 token 数
    h = encoder_hmlp(tokens)

    for block in transformer_blocks:
        h = spatial_attention(h, axial_rope=True)
        h = temporal_causal_attention(h, t5_relative_position=True)
        h = swiglu_mlp(h)

    delta_norm = decoder_hmlp(h)
    delta = denormalize_by_delta_rms(delta_norm)
    delta = inverse_translate(delta, shift)
    return history[-1] + delta

for step in pretraining:
    source = topology_aware_sample_source()   # HSDP shard group 内采同一来源
    stride = random_int(1, 5)
    history, target_delta = sample_history_and_delta(source, stride)
    pred = walrus_forward(history, source.meta)
    loss = per_field_normalized_l1(pred - history[-1], target_delta)
    optimizer.step(loss)
```

##### 预测目标：学习残差式动力学更新

Walrus 不要求显式输入 PDE 系数或方程文本，而是从一小段历史快照中推断系统动力学。论文把任意系统 \(S\) 的离散快照写作 \(u_t^S\)，历史窗口为：

$$
U_t^S=[u_{t-\tau\Delta t}^S,\ldots,u_t^S]
$$

模型学习下一步残差：

$$
u_{t+\Delta t}^S \approx u_t^S + M(U_t^S)
$$

这种残差式预测适合连续动力学：模型只需预测下一步变化 \(\Delta u\)，而不是重新生成完整物理状态。推理时反复应用该更新即可得到长期 rollout。

##### 架构：空间-时间分解 Transformer

Walrus 使用 factorized space-time transformer。空间维度上采用并行化 attention 与 axial RoPE 编码位置；时间维度上使用 causal attention 和 T5-style relative position encoding，保证 next-step 预测只能使用历史信息。每个 block 中空间与时间 attention 分解计算，避免把所有空间点和时间帧拼成一个超长序列后做全局二次 attention。

encoder/decoder 不是固定 patch 大小，而是使用 Convolutional Stride Modulation。训练时，系统分辨率、维度和长宽比各不相同，固定 patching 会导致某些样本 token 极多、某些样本 token 极少。CSM 通过调整下采样 stride，把 2D 样本控制在约 \(32\) 个 token/轴、3D 样本控制在约 \(16\) 个 token/轴附近，从而让不同来源的样本在 GPU 上具有更接近的计算负载。

##### Patch jittering：抑制长期 rollout 的网格化误差

ViT 式 patchification 或 strided convolution 会进行规则下采样和上采样。对于物理场，这类规则重采样会引入 aliasing，长期自回归时小误差会沿固定网格累积，出现周期性纹理或不稳定增长。Walrus 的 patch jittering 在每一步 patch 化前随机平移参考系，边界按任务类型做 padding，然后在输出后再逆平移回原坐标。

直觉上，若固定下采样模式造成某些频率别名总是被同一种方式放大，随机平移会打散这个确定性误差通道。论文从 Fourier shift property 解释这一点，并报告 patch jittering 改善了 17/19 个预训练数据集的长期验证 rollout，中长程误差显著降低。

##### 2D/3D 统一与 tensor-law aware augmentation

Walrus 的跨领域性不仅来自数据量，还来自把不同维度和不同变量类型放入同一物理一致的增强空间。2D 场会先被嵌入为 3D 薄平面，例如 \((H,W)\) 的速度 \((v_x,v_y)\) 被扩成 \((H,W,1)\) 的 \((v_x,v_y,0)\)。随后使用 90 度旋转和反射等变换，但对不同阶数的物理量采用不同变换律：

$$
\text{vector field:}\quad u \mapsto R u
$$

$$
\text{rank-2 tensor field:}\quad u \mapsto R u R^\top
$$

这样可以避免“图像增强”式的数据变换破坏物理含义。例如旋转速度场时，只旋转像素位置而不旋转速度方向是不一致的；Walrus 显式按张量阶数同步变换数值。

##### 归一化损失与高效采样

Walrus 学的是 \(\Delta u\)，输入 \(U_t\) 和输出 \(\Delta u_{t+1}\) 的尺度通常不同，因此使用非对称归一化：输入场按历史窗口的 space-time RMS 归一化，输出残差按 \(\Delta U_t\) 的 RMS 反归一化。训练损失是按物理场归一化的 L1：

$$
\mathcal{L}
=\frac{1}{q}\sum_{i=1}^{q}
\frac{
\left\|M(U_t^{(i)})-\Delta u_{t+1}^{(i)}\right\|_1
}{
\mathrm{RMS}_{\mathrm{Space}\times\mathrm{Time}}(\Delta U_t^{(i)})
}
$$

这个设计让快速变化的大幅值变量不会完全主导 loss，同时也让缓慢变化但可预测的变量得到足够权重。训练时还随机采样 time stride \(1\) 到 \(5\)，迫使模型从历史上下文推断相对时间尺度，而不是只记住固定时间间隔。

分布式训练方面，异构数据会让 FSDP/HSDP 中不同 rank 的计算量差异很大，产生等待。Walrus 使用 topology-aware sampling，让同一个 sharding group 内的 rank 采样同一数据源，同时通过差异化 batch size 和历史长度平衡 2D/3D 负载。论文报告这些改动组合后吞吐相对朴素 FSDP 提升 262%。

> ⚠️ 来源说明：任务给定的是 Simons Foundation 新闻/项目页，方法细节主要依据可追溯 arXiv 论文、官方 GitHub README 与 Hugging Face 模型卡整理；新闻页用于确认 Walrus/AION-1 发布背景与 The Well 15TB 数据规模描述。

#### 🧪 练习题
```yaml
question: "Walrus 中 patch jittering 的主要作用是什么？"
options:
  - "把 2D 数据永久降采样成低分辨率图像"
  - "在 patch 化前随机平移参考系，缓解规则下采样造成的 aliasing 和长期 rollout 网格误差"
  - "把所有物理变量转换成文本 token"
  - "替代时间 causal attention，使模型只做空间预测"
answer: 1
explain: "patch jittering 随机化 patch/stride 的相对位置，打散固定重采样模式造成的频谱伪影，从而提升自回归长期稳定性。"
```

### Transolver-3

```yaml
id: transolver3
num: 34
name: Transolver-3
full_name: 超大规模求解器 (Transolver-3)
year: '2026'
org: 清华大学/NVIDIA
parent: fno
paper_url: https://arxiv.org/abs/2602.02414
project_url: ''
category: pde_solving
motivation: 几何切片技术支持1.6亿单元网格
```

#### 📝 一句话总结
Transolver-3 将 Transolver 的 Physics-Attention 进一步改造成工业级几何求解框架，通过 faster slice/deslice、geometry slice tiling、几何摊销训练和物理状态缓存，把神经 PDE 求解器扩展到超过 \(1.6\times10^8\) 单元的高保真航空/汽车 CFD 网格。

#### 🎯 核心要点
- **来源追溯**：给定 `paper_url` 的 arXiv:2602.02414 实际不是 Transolver-3；检索到 Transolver-3 正确论文为 https://arxiv.org/abs/2602.04940
- **核心瓶颈**：原始 Physics-Attention 虽在 slice domain 做 self-attention，但 Linear1、Linear3 和 slice weight 仍带来 \(O(NC)\)/\(O(NM)\) 级内存压力
- **faster slice/deslice**：利用矩阵乘法结合律，把 Linear1/Linear3 从 \(N\) 个网格单元域移到 \(M\) 个物理状态域，降低中间缓存
- **geometry slice tiling**：分 tile 计算 slice weights，避免一次性物化完整 \(N\times M\) 矩阵
- **geometry amortized training**：训练时从超大高分辨率网格随机抽取 \(10^5\) 到 \(10^6\) 级子集，让模型在不同 step 中摊销学习全局几何规律
- **decoupled inference**：推理时先按 chunk 聚合全局 physical state cache，再对全网格做 field decoding
- **工业级验证**：在 NASA-CRM、AhmedML、DrivAerML 等航空/汽车 CFD 任务上评估，DrivAerML 体网格可超过 160 million cells

#### 🔬 深入细节
##### 图示与来源

![Transolver-3 geometry scaling 示意图](https://arxiv.org/html/2602.04940v1/x2.png)
*图：Transolver-3 训练阶段的 geometry scaling：faster slice/deslice、geometry slice tiling 和 geometry amortized training。来源为实际 Transolver-3 arXiv HTML Figure 2；论文页为 https://arxiv.org/abs/2602.04940。*

##### 算法伪代码

```python
# Transolver-3 优化 Physics-Attention 伪代码
def optimized_physics_attention(x, num_tiles):
    # x: [N, C], N 为网格单元数，C 为通道数，M 为 slice/physical-state 数
    tiles = split_mesh_cells(x, num_tiles)
    s_raw = zeros([M, C])
    d = zeros([M, M])  # diagonal normalization
    cached_weights = []

    # Geometry slice tiling: 不一次性物化 [N, M] 权重
    for x_t in tiles:
        w_t = softmax(linear2(x_t), dim="slice")   # [N_t, M]
        s_raw += w_t.T @ x_t                       # [M, C]
        d += diag(sum(w_t, axis=0))                # [M, M]
        cached_weights.append(w_t)

    # Faster slice: Linear1 从网格域移动到 slice 域
    s = linear1(s_raw @ inverse(d))                # [M, C]
    s_out = linear3(self_attention(s))             # [M, C]

    # Faster deslice: 用 tile 权重把 slice 状态投回局部网格
    out_tiles = []
    for w_t in cached_weights:
        out_tiles.append(w_t @ s_out)              # [N_t, C]
    return concat(out_tiles, axis=0)

def transolver3_inference(full_mesh_chunks):
    # 第一阶段：聚合每层 physical state cache
    state_cache = aggregate_states_over_chunks(full_mesh_chunks)
    # 第二阶段：全网格解码，每个 chunk 与全局 cache 交互
    return decode_fields_with_cache(full_mesh_chunks, state_cache)
```

##### 背景：Transolver 已经线性化，但还不够工业级

Transolver 的基本思想是把 \(N\) 个网格点/单元软分配到 \(M\) 个隐含 physical states，其中 \(M\ll N\)。这样 self-attention 不在全网格点之间做，而是在 \(M\) 个 slice 状态之间做，避免标准 Transformer 的 \(O(N^2)\) 注意力复杂度。

原始 Physics-Attention 可写为：

$$
\mathbf{x}_{\mathrm{proj}}=\mathrm{Linear1}(\mathbf{x}),\quad
\mathbf{w}=\mathrm{Softmax}(\mathrm{Linear2}(\mathbf{x}))
$$

$$
\mathbf{s}=\mathbf{d}^{-1}\mathbf{w}^{\top}\mathbf{x}_{\mathrm{proj}},
\quad
\mathbf{d}_{jj}=\sum_{i=1}^{N}\mathbf{w}_{ij}
$$

$$
\mathbf{x}_{\mathrm{out}}=\mathrm{Linear3}(\mathbf{w}\mathbf{s}')
$$

瓶颈在于，虽然 attention 只在 \(M\) 个状态上发生，\(\mathrm{Linear1}(\mathbf{x})\)、\(\mathrm{Linear3}(\cdot)\) 和 \(\mathbf{w}\in\mathbb{R}^{N\times M}\) 仍随全网格规模 \(N\) 增长。对于 \(N>10^8\) 的工业 CFD 网格，这些中间张量的显存和访存会成为主导成本。

##### Faster slice/deslice：把线性层移到小得多的 slice 域

Transolver-3 的关键观察是矩阵乘法满足结合律。原本先对每个网格点做 Linear1，再按 \(\mathbf{w}^{\top}\) 聚合：

$$
\mathbf{s}
=\mathbf{d}^{-1}\mathbf{w}^{\top}\mathrm{Linear1}(\mathbf{x})
$$

可以改写为先聚合原始特征，再在 slice 域做 Linear1：

$$
\mathbf{s}_{\mathrm{raw}}=\mathbf{w}^{\top}\mathbf{x},\quad
\mathbf{s}=\mathrm{Linear1}(\mathbf{s}_{\mathrm{raw}}\mathbf{d}^{-1})
$$

同理，deslice 阶段将 Linear3 放到 \(M\) 个状态上：

$$
\mathbf{s}_{\mathrm{out}}'=\mathrm{Linear3}(\mathrm{Attention}(\mathbf{s})),
\quad
\mathbf{x}_{\mathrm{out}}=\mathbf{w}\mathbf{s}_{\mathrm{out}}'
$$

这在数学上与原始 slice/deslice 等价，但把两次 \(O(NC^2)\) 的大域线性投影变成 \(O(MC^2)\)。因为 \(M\ll N\)，显存缓存也从网格域的大张量转移到 slice 域的小张量。

##### Geometry slice tiling：不物化完整 \(N\times M\) 权重

即使移走 Linear1/Linear3，slice weights \(\mathbf{w}\in\mathbb{R}^{N\times M}\) 仍可能非常大。Geometry slice tiling 将网格按单元分成多个 tile，只在一个 tile 内计算 \(\mathbf{w}^{(t)}\)，并累加：

$$
\mathbf{s}_{\mathrm{raw}}=\sum_{t=1}^{T}(\mathbf{w}^{(t)})^{\top}\mathbf{x}^{(t)},
\quad
\mathbf{d}=\sum_{t=1}^{T}\mathrm{diag}\left(\sum_i \mathbf{w}^{(t)}_{ij}\right)
$$

这样 peak memory 不再需要完整 \(N\times M\) 权重矩阵，只需保留 tile 级权重和全局累加器。论文的消融显示，在不使用 amortized training 的单 GPU 容量测试中，tiling 使 Transolver-3 的可处理网格规模显著提升，并最终支撑后续的 \(10^8\) 级推理。

##### Geometry amortized training 与 decoupled inference

训练时，完整工业网格过大，无法每步都加载全分辨率网格。Transolver-3 采用 geometry amortized training：每次从原始高分辨率网格随机抽取一个子集 \(D_n\)，规模约为 \(n\sim10^5\) 到 \(10^6\)，不同训练 step 覆盖不同局部区域。由于高保真网格是连续几何流形的离散采样，随机子集仍能让模型学习局部-全局物理状态的组织方式。

推理时则不能只预测子集，因此 Transolver-3 解耦成两阶段：

1. **physical state caching**：把完整网格切成 chunk，逐块计算并聚合每层 physical states，得到全局 cache
2. **full mesh decoding**：对每个 chunk 重新计算 slice weights，并与全局 cache 交互得到该 chunk 的物理场输出

可写作：

$$
\mathbf{w}^{(l)}=\mathrm{Softmax}(\mathrm{Linear2}(\mathbf{x}^{(l)})),
\quad
\mathbf{x}^{(l)}_{\mathrm{out}}=\mathbf{w}^{(l)}\mathbf{s}^{(l)}_{\mathrm{cache}}
$$

这种推理方式类似把“全局物理状态估计”和“局部场值解码”拆开：全局信息只缓存一次，局部输出可以按块流式生成。

##### 与传统神经算子/前代 Transolver 的区别

FNO、Geo-FNO、GNO、GINO 等神经算子在规则网格或中小规模非结构网格上表现强，但面对汽车/飞机外形的 3D 高保真 CFD 网格时，\(N\) 级内存和不规则几何会迅速放大。Transolver 系列的优势是把网格点聚合成少量 learned physical states；Transolver-3 进一步把这一思想工程化到工业尺度。

与 Transolver++ 相比，Transolver-3 不只是靠多 GPU 并行扩容。论文指出 Transolver++ 为省显存移除了原始 Physics-Attention 中的 Linear1，而 Transolver-3 保留这层但把它移到 slice 域，从而兼顾表达能力和显存效率。最终在 DrivAerML 等任务中支持超过 160 million cells 的 volume field prediction。

> 💡 关键：Transolver-3 的“1.6 亿单元”不是单一技巧带来的，而是由 slice 域线性层重排、权重 tiling、随机子网格训练和全局状态缓存推理共同组成的系统级缩放方案。

#### 🧪 练习题
```yaml
question: "Transolver-3 中 faster slice/deslice 的核心作用是什么？"
options:
  - "把所有网格单元两两做全局 self-attention"
  - "利用矩阵乘法结合律，将 Linear1/Linear3 从 N 个网格单元域移动到 M 个 physical-state 域"
  - "完全删除 slice weights，改用普通 CNN"
  - "只在训练集较小时才使用 PDE residual loss"
answer: 1
explain: "由于 \\(M\\ll N\\)，把线性投影移到 slice 域可显著降低时间和显存开销，同时保持与原始 slice/deslice 等价。"
```

### PF-PINO

```yaml
id: pf_pino
num: 35
name: PF-PINO
full_name: 相场物理神经算子 (Phase-Field PINO)
year: '2026'
org: arXiv
parent: fno
paper_url: https://arxiv.org/abs/2603.09693
project_url: ''
category: pde_solving
motivation: 相场方程残差提升长期稳定性
```

#### 📝 一句话总结
PF-PINO 将相场控制方程的 PDE residual 显式加入 FNO 的训练目标，解决纯数据驱动 FNO 在尖锐界面、长时间自回归 rollout 和参数外推时容易漂移的问题。它把神经算子作为可复用的参数化相场求解器，并通过物理残差、动态损失权重和可选测试时微调提高长期稳定性。

#### 🎯 核心要点
- **核心架构**：以 Fourier Neural Operator 为 backbone，输入当前状态 \(\mathbf{u}(\mathbf{x},t_n)\) 与静态参数场 \(\mathbf{a}(\mathbf{x})\)，输出下一步状态 \(\mathbf{u}(\mathbf{x},t_{n+1})\)
- **自回归时间推进**：训练一阶时间映射，推理时递归应用得到完整相场演化轨迹
- **物理信息损失**：在数据拟合误差之外加入相场 PDE residual，包括 Allen-Cahn、Cahn-Hilliard、热扩散等问题相关残差
- **残差计算方式**：空间导数可用有限差分或谱微分计算，避免 PINN 在高阶导数自动微分上的高内存开销
- **梯度归一化权重**：用各 loss 分量对模型参数的梯度范数动态调节数据项和物理项权重，缓解多物理残差量纲与收敛速率不一致
- **可选 rollout fine-tuning**：对测试实例沿整条预测轨迹最小化 PDE residual，修正自回归误差累积
- **验证任务**：覆盖 pencil-electrode corrosion、electro-polishing corrosion、dendritic crystal solidification、spinodal decomposition 四类相场 benchmark
- **相对 FNO 的收益**：在长期预测、参数插值/外推和界面形貌保持上显著优于纯数据 FNO

#### 🔬 深入细节
##### 图示与来源

![PF-PINO 框架图](https://arxiv.org/html/2603.09693v1/x1.png)
*图：PF-PINO 的自回归 FNO 框架、谱卷积模块以及数据损失/PDE residual 组合训练目标。可访问来源包括 arXiv HTML 页面 https://arxiv.org/html/2603.09693 和官方实现 https://github.com/NanxiiChen/PF-PINO。*

##### 算法伪代码

```python
# PF-PINO training / rollout sketch
for batch in phase_field_trajectories:
    u_n, a, u_next_ref = batch.current_state, batch.params, batch.next_state

    # 1. FNO learns a one-step operator.
    u_next_pred = FNO(theta)(concat(u_n, a))

    # 2. Supervised one-step fidelity.
    loss_data = mean_square(u_next_pred - u_next_ref)

    # 3. Physics residuals from the governing phase-field equations.
    residuals = []
    for equation in governing_equations:
        derivatives = finite_difference_or_spectral_derivative(u_next_pred, u_n, a)
        residuals.append(equation.residual(u_next_pred, u_n, a, derivatives))
    loss_pde = sum(mean_square(r) for r in residuals)

    # 4. Balance data and physics terms using gradient-normalized weights.
    w_data, w_pde = gradnorm_weights([loss_data, loss_pde], theta)
    loss = w_data * loss_data + w_pde * loss_pde
    update(theta, loss)

# Optional test-time fine-tuning over a full autoregressive trajectory.
u = u0
trajectory = []
for n in range(num_steps):
    u = FNO(theta)(concat(u, a))
    trajectory.append(u)
theta = fine_tune(theta, sum_pde_residuals(trajectory, a))
```

##### 方法机制

PF-PINO 的出发点是相场模型的两个矛盾：一方面，Allen-Cahn、Cahn-Hilliard 等方程能精确描述界面迁移、腐蚀、凝固和相分离，但传统 FEM/FDM 求解在大规模参数扫描中很慢；另一方面，FNO 能学习从参数场到解场的算子映射，却不天然满足质量守恒、界面能下降或热扩散耦合等物理约束。因此论文没有把 FNO 只当回归器，而是把它训练成一个满足控制方程的时间推进算子。

FNO 主体可以写成 lifting、谱卷积和 projection 三段：

$$
\mathbf{v}_0(\mathbf{x}) = \mathcal{P}(\mathbf{u}_n(\mathbf{x}),\mathbf{a}(\mathbf{x})), \qquad
\mathbf{v}_{\ell+1}(\mathbf{x}) =
\sigma\left(\mathcal{F}^{-1}\left(R_\ell \cdot \mathcal{F}(\mathbf{v}_\ell)\right)(\mathbf{x}) + W_\ell \mathbf{v}_\ell(\mathbf{x})\right),
$$

$$
\widehat{\mathbf{u}}_{n+1}(\mathbf{x})=\mathcal{Q}(\mathbf{v}_L(\mathbf{x})).
$$

这里 \(\mathcal{F}\) 与 \(\mathcal{F}^{-1}\) 是 Fourier 变换和逆变换，\(R_\ell\) 是低频 Fourier mode 上的可学习复权重，\(W_\ell\) 是物理空间旁路。相场问题通常有全局耦合、尖锐界面和多尺度形貌，谱卷积适合捕获非局部相互作用，同时保持 \(O(N\log N)\) 的 FFT 复杂度。

训练目标是 PF-PINO 的关键。对一般相场系统

$$
\mathcal{N}_k\left[\mathbf{u};\mathbf{a}\right](\mathbf{x},t)=0,\qquad k=1,\ldots,K,
$$

模型不仅最小化一步预测误差，还最小化每个控制方程的离散残差：

$$
\mathcal{L}_{\mathrm{data}}
=\frac{1}{N}\sum_{i=1}^{N}
\left\|\widehat{\mathbf{u}}_{n+1}(\mathbf{x}_i)-\mathbf{u}_{n+1}(\mathbf{x}_i)\right\|_2^2,
$$

$$
\mathcal{L}_{\mathrm{pde}}
=\sum_{k=1}^{K}\frac{1}{N}\sum_{i=1}^{N}
\left\|\mathcal{N}_k\left[\widehat{\mathbf{u}};\mathbf{a}\right](\mathbf{x}_i,t_{n+1})\right\|_2^2,
\qquad
\mathcal{L}=\lambda_d\mathcal{L}_{\mathrm{data}}+\lambda_p\mathcal{L}_{\mathrm{pde}}.
$$

在腐蚀 benchmark 中，模型要同时处理描述界面相变量 \(\phi\) 的 Allen-Cahn 动力学和描述离子浓度 \(c\) 的 Cahn-Hilliard 约束；在枝晶凝固中，\(\phi\) 与温度 \(T\) 通过潜热项耦合；在 spinodal decomposition 中，浓度守恒由 Cahn-Hilliard 方程控制。残差项迫使网络输出不仅“像训练数据”，还要在局部导数、守恒形式和耦合源项上接近数值解。

多项物理损失的尺度往往差异很大，例如 Cahn-Hilliard 的高阶导数残差可能比数据误差更难优化。PF-PINO 使用梯度归一化思想动态更新权重，直觉是让每个 loss 分量对参数更新的影响接近同一量级：

$$
\lambda_j \propto \frac{\overline{g}}{g_j+\epsilon},
\qquad
g_j=\left\|\nabla_\theta \mathcal{L}_j\right\|_2,
\qquad
\overline{g}=\frac{1}{M}\sum_{j=1}^{M}g_j.
$$

这样可以避免训练早期被某个大残差主导，也避免数据项过强导致模型忽略物理一致性。论文还给出测试时 rollout fine-tuning：固定某个测试参数场，从 \(t_0\) 递推到 \(T\)，再对整条轨迹的累计 residual 做少量优化。这个步骤不改变 PF-PINO 的基本算子学习设定，但能在高精度场景下进一步压低长时间误差。

与传统 PINN 相比，PF-PINO 学的是“参数到轨迹”的算子，不需要为每组材料参数或初始条件重新训练；与纯 FNO 相比，它在训练时看到控制方程，因此自回归误差不会那么快放大。论文实验中的一个重要现象是：单步 validation loss 低并不必然代表长时间 rollout 好，纯 FNO 即使一步误差可控，也可能在界面位置、枝晶形貌或相分离谱结构上持续漂移；PF-PINO 的 residual 约束正是针对这个长期稳定性缺口。

#### 🧪 练习题
```yaml
question: "PF-PINO 相比普通 FNO 的核心差异是什么？"
options:
  - "把 Fourier 卷积替换为 Transformer attention"
  - "只训练最后一个时间步，不做自回归预测"
  - "在数据拟合损失之外加入相场控制方程的 PDE residual"
  - "完全不使用数值模拟数据，只依赖边界条件"
answer: 2
explain: "PF-PINO 保留 FNO 的算子架构，但把 Allen-Cahn、Cahn-Hilliard、热扩散等相场方程残差加入训练目标，从而提升物理一致性和长期 rollout 稳定性。"
```

### PIKAN

```yaml
id: pikan
num: 36
name: PIKAN
full_name: KAN物理信息网络 (Physics-Informed KAN)
year: '2026'
org: ResearchGate
parent: pinn
paper_url: https://www.researchgate.net/publication/384994434
project_url: ''
category: pde_solving
motivation: KAN替代MLP增强高维处理能力
```

#### 📝 一句话总结
PIKAN 用 Kolmogorov-Arnold Network 替换传统 PINN 中的 MLP，使物理残差约束仍然保留，同时通过可学习的一维边函数、B-spline 或 wavelet 基函数提高微分方程解的表达效率。给定 ResearchGate 链接当前指向无关页面，因此本解读追溯同名方法的 arXiv/JMLR 论文和官方代码来源。

#### 🎯 核心要点
- **核心替换**：保持 PINN 的 collocation residual 训练范式，将网络近似器从 MLP 换成 KAN
- **理论动机**：利用 Kolmogorov-Arnold 表示思想，把多变量函数表示成一维函数叠加，适合学习复杂但结构化的动力学解
- **两类实现**：Efficient-KAN 使用 B-spline/网格化边函数降低原始 KAN 的计算负担，WAV-KAN 使用 wavelet 基函数改善局部和多尺度表达
- **两种训练模式**：DF-PIKAN 在无标签数据时只用方程残差和初/边值损失，DD-PIKAN 在复杂问题中额外加入观测/数值解数据项
- **物理损失结构**：由 PDE/ODE residual loss、初值/边界条件 loss、可选数据 loss 加权组成
- **验证范围**：论文覆盖线性/非线性 ODE、Lorenz 系统、简谐振子、非线性摆、Mathieu、Van der Pol、Burgers 和 Allen-Cahn 等微分方程
- **相对 PINN 的收益**：在若干 case 中用更浅或更小的网络达到相近或更低误差，减少架构调参压力
- **来源限制**：任务给定的 ResearchGate ID `384994434` 访问时跳转到一篇阿拉伯语教学网页论文，不是 PIKAN；可访问方法来源为 https://arxiv.org/abs/2407.18373、https://www.jmlr.org/papers/v26/24-1278.html 和 https://github.com/AI-and-Quantum-Computing/PIKAN

#### 🔬 深入细节
##### 图示与来源

![PIKAN 训练结果示例](https://arxiv.org/html/2407.18373v2/x1.png)
*图：PIKAN 论文 arXiv HTML 中的示例训练曲线与数值解对比图。该论文没有给出单独的总架构图；方法结构可从 arXiv/JMLR 论文正文和官方 GitHub 代码复现。*

##### 算法伪代码

```python
# Physics-Informed KAN for an ODE/PDE
def pikan_train(collocation_points, boundary_points, data=None):
    model = KAN(width=[input_dim, hidden_dim, output_dim],
                basis="bspline_or_wavelet")  # Efficient-KAN or WAV-KAN

    for step in range(num_steps):
        x_f = sample(collocation_points)
        u_pred = model(x_f)

        # Autodiff computes derivatives needed by the governing equation.
        derivatives = autodiff(u_pred, x_f)
        residual = N(u_pred, derivatives, x_f)  # N[u](x)=0
        loss_phys = mean_square(residual)

        x_b, u_b = sample(boundary_points)
        loss_bc = mean_square(model(x_b) - u_b)

        loss_data = 0.0
        if data is not None:
            x_d, u_d = sample(data)
            loss_data = mean_square(model(x_d) - u_d)

        loss = loss_phys + lambda_bc * loss_bc + lambda_data * loss_data
        update(model.parameters(), loss)

    return model
```

##### 方法机制

PIKAN 的问题设定与 PINN 相同：给定微分方程

$$
\mathcal{N}[u](\mathbf{x})=0,\qquad \mathbf{x}\in\Omega,
$$

以及初值或边界条件

$$
\mathcal{B}[u](\mathbf{x})=g(\mathbf{x}),\qquad \mathbf{x}\in\partial\Omega,
$$

用神经网络 \(u_\theta(\mathbf{x})\) 近似未知解。标准 PINN 通常用 MLP 表示 \(u_\theta\)，再通过自动微分得到 \(\partial_t u_\theta,\nabla u_\theta,\Delta u_\theta\) 等导数，最小化方程残差和边界误差。PIKAN 的核心不是改变 physics-informed 目标，而是改变函数逼近器：把 MLP 换成 KAN，让每条边上的激活函数成为可学习的一维函数。

KAN 层可抽象写成

$$
z^{(\ell+1)}_j=\sum_i \phi^{(\ell)}_{ij}\left(z^{(\ell)}_i\right),
$$

其中 \(\phi_{ij}\) 不是固定 ReLU/Tanh，而是由 B-spline、wavelet 或其他基函数参数化的可学习一维函数。这个设计对应 Kolmogorov-Arnold 表示定理的直觉：高维连续函数可由一维函数叠加表达。对于 PDE/ODE 解，很多复杂性来自不同坐标方向、时间尺度和非线性项的组合；在边上学习一维函数可以用较小网络捕获这些组合关系。

PIKAN 的 data-free 版本只依赖物理约束：

$$
\mathcal{L}_{\mathrm{DF}}
=\frac{1}{N_f}\sum_{i=1}^{N_f}
\left\|\mathcal{N}[u_\theta](\mathbf{x}_i^f)\right\|_2^2
+\lambda_b\frac{1}{N_b}\sum_{i=1}^{N_b}
\left\|\mathcal{B}[u_\theta](\mathbf{x}_i^b)-g(\mathbf{x}_i^b)\right\|_2^2.
$$

当方程复杂、残差优化难以收敛或存在观测数据时，data-driven 版本加入监督项：

$$
\mathcal{L}_{\mathrm{DD}}
=\mathcal{L}_{\mathrm{DF}}
+\lambda_d\frac{1}{N_d}\sum_{i=1}^{N_d}
\left\|u_\theta(\mathbf{x}_i^d)-u_i^d\right\|_2^2.
$$

这和 PINN 的训练目标非常接近，因此 PIKAN 可以直接继承 collocation sampling、初/边值惩罚、Adam/AdamW 优化和自动微分流程。区别在于模型内部的频率和局部结构表达能力。Efficient-KAN 通过更高效的 B-spline 参数化降低原始 KAN 的内存与计算开销；WAV-KAN 用 wavelet basis 表示边函数，在振荡、尖峰或多尺度解中往往更容易表示局部变化。

论文对比了多类动力学问题。对于简单 ODE，DF-PIKAN 往往已经能靠残差拟合到数值解；对于耦合非线性系统、Lorenz、Burgers 或 Allen-Cahn 等问题，DD-PIKAN 的数据项能给优化提供额外引导。论文还指出若干 case 中 PIKAN 可以用比 PINN 更小的 architecture 达到相近精度，例如线性耦合系统可用一个较小 KAN 同时输出多个变量，而传统 PINN 往往需要为不同变量设置更深或更多神经元的 MLP。

需要注意的是，PIKAN 并不自动解决所有 PINN 难题。它仍然依赖 collocation 点覆盖、损失权重、优化器和边界条件处理；高维 PDE 中自动微分导数仍有计算成本。它的主要价值是提供一个更强的 physics-informed 函数逼近器，在不改变 PINN 问题形式的前提下改善表达效率、局部多尺度拟合能力和部分任务上的架构调参负担。

#### 🧪 练习题
```yaml
question: "PIKAN 与传统 PINN 最核心的架构差异是什么？"
options:
  - "PIKAN 删除了 PDE residual，只保留数据监督"
  - "PIKAN 用 KAN 替换 PINN 中的 MLP 作为解函数近似器"
  - "PIKAN 只能求解线性 ODE，不能处理 PDE"
  - "PIKAN 必须使用有限元网格，不支持 collocation 点"
answer: 1
explain: "PIKAN 保留 physics-informed residual、初值和边界损失，但把神经网络近似器换成 Efficient-KAN 或 WAV-KAN，以可学习边函数增强表达能力。"
```

### FEDONet

```yaml
id: fedonet
num: 37
name: FEDONet
full_name: 傅里叶嵌入DeepONet (Fourier-embedded DeepONet)
year: '2026'
org: JCP
parent: deeponet
paper_url: https://www.sciencedirect.com/science/article/pii/S0021999126002846
project_url: ''
category: pde_solving
motivation: 嵌入傅里叶特征实现谱精度学习
```

#### 📝 一句话总结
FEDONet 在 DeepONet 的 trunk 坐标输入前加入固定随机 Fourier 特征嵌入，解决普通 MLP trunk 对高频、振荡和多尺度 PDE 解场表达不足的问题。它保留 DeepONet 的 branch-trunk 内积形式，却用轻量的谱坐标提升获得更好的频谱保真度、样本效率和噪声鲁棒性。

#### 🎯 核心要点
- **核心架构**：保留 DeepONet 的 branch network 编码输入函数、trunk network 编码查询坐标、二者内积输出算子值
- **关键改动**：将 raw coordinate \(\zeta\) 先映射为 \(\gamma(\zeta)=[\sin(2\pi Z\zeta),\cos(2\pi Z\zeta)]\)，再输入 trunk
- **随机 Fourier 特征**：\(Z\in\mathbb{R}^{M\times d}\) 为固定 Gaussian 频率矩阵，不随训练更新
- **谱预条件解释**：Fourier embedding 近似 shift-invariant kernel，扩大 trunk 的有效假设空间并缓解 MLP 的低频谱偏置
- **训练目标**：与监督 DeepONet 一样，用输入函数-输出场样本最小化 MSE，几乎不增加训练流程复杂度
- **评估指标**：除相对 \(L^2\) 误差外，论文强调 Fourier energy spectrum 的谱保真度、输入噪声鲁棒性和低数据量样本效率
- **benchmark**：Burgers、2D Poisson、Eikonal airfoil SDF、Allen-Cahn、Kuramoto-Sivashinsky
- **相对 DeepONet 的收益**：在冲击、界面、几何尖角和混沌宽频系统中明显减少过平滑与高频能量丢失

#### 🔬 深入细节
##### 图示与来源

![FEDONet 架构图](https://arxiv.org/html/2509.12344v4/69.png)
*图：FEDONet 在 trunk 坐标端加入 sin/cos Fourier embedding，branch 输出与 trunk 输出继续通过内积得到 \(\mathcal{G}(u_0)(\zeta)\)。可访问来源包括 arXiv HTML https://arxiv.org/html/2509.12344v4、JCP DOI 页面和官方实现 https://github.com/as26101999/Fourier-Embedded-DeepONets。*

##### 算法伪代码

```python
# FEDONet forward and training sketch
Z = normal(shape=(num_fourier_features, coord_dim))  # fixed, not trainable

def fourier_embed(zeta):
    proj = 2 * pi * (Z @ zeta)
    return concat(sin(proj), cos(proj))

def fedonet(u_sensor_values, zeta):
    b = BranchNet(u_sensor_values)        # [p]
    t = TrunkNet(fourier_embed(zeta))     # [p]
    return dot(b, t)                      # operator value at zeta

for u, y_ref, query_points in dataset:
    preds = [fedonet(u.sensors, zeta) for zeta in query_points]
    loss = mean_square(preds - y_ref)
    update(branch_params + trunk_params, loss)
```

##### 方法机制

DeepONet 学习的是非线性算子 \(\mathcal{G}: u \mapsto s\)，例如从初始条件、边界条件或几何 mask 映射到 PDE 解场。标准形式把输入函数在传感器点上的取值送入 branch network，把查询坐标 \(\zeta=(x,t)\) 或 \((x,y)\) 送入 trunk network，然后用两个向量的内积输出该坐标处的解：

$$
\mathcal{G}_\theta(u)(\zeta)
=\sum_{k=1}^{p} b_k(u)\,t_k(\zeta).
$$

这个结构简单、可跨坐标查询，但 trunk 往往只是浅层 MLP。对于 Burgers shock、Allen-Cahn 界面、Eikonal 几何尖角或 Kuramoto-Sivashinsky 混沌轨迹，解场含有大量高频或多尺度成分。普通 MLP 存在 spectral bias，常先学低频结构，导致预测被过度平滑，频谱尾部能量不足，甚至在混沌系统中发生相位漂移。

FEDONet 的改动非常小：不把原始坐标 \(\zeta\) 直接喂给 trunk，而是先做固定随机 Fourier 特征映射：

$$
\gamma(\zeta)=
\begin{bmatrix}
\sin(2\pi Z\zeta)\\
\cos(2\pi Z\zeta)
\end{bmatrix},
\qquad Z_{ij}\sim \mathcal{N}(0,\sigma^2).
$$

于是算子近似变为

$$
\mathcal{G}_\theta^{\mathrm{FED}}(u)(\zeta)
=\sum_{k=1}^{p} b_k(u)\,t_k(\gamma(\zeta)).
$$

这相当于在 trunk 前做一次谱 lifting。根据随机 Fourier 特征和 Bochner 定理的直觉，\(\gamma(\zeta)\) 近似把坐标放入 shift-invariant kernel 的特征空间，使浅层 trunk 不必从 raw coordinate 中自己“造出”振荡基函数。论文还从 operator neural tangent kernel 的角度解释这种 embedding 的 whitening / conditioning 效果：特征相关性下降后，优化问题更接近各向同性，梯度传播更稳定。

训练目标保持监督 DeepONet 的经验风险最小化。若训练集为 \(\{(u^{(i)},s^{(i)})\}_{i=1}^{N}\)，并在每个样本上查询 \(Q\) 个坐标，则

$$
\mathcal{L}(\theta)
=\frac{1}{NQ}\sum_{i=1}^{N}\sum_{q=1}^{Q}
\left|
\mathcal{G}_\theta^{\mathrm{FED}}(u^{(i)})(\zeta_q)
-s^{(i)}(\zeta_q)
\right|^2.
$$

Fourier embedding 矩阵 \(Z\) 固定不训练，因此额外开销主要是一层矩阵乘法和 sin/cos 计算。相比 FNO 这类全局 spectral convolution，FEDONet 没有改变 DeepONet 的 branch-trunk 模块，也不要求在规则网格上做 FFT；它更像给 trunk 加了一个通用坐标预处理器，适合已有 DeepONet 代码中直接替换输入层。

论文评估不仅看相对 \(L^2\) 误差：

$$
\varepsilon_{\mathrm{rel}}
=\frac{\|\widehat{s}-s\|_2}{\|s\|_2},
$$

还比较预测场与参考场的 Fourier energy spectrum。这个指标能揭示普通 DeepONet 常见的“视觉上大形状对了，但高频不对”的问题。例如在 Burgers 和 Allen-Cahn 中，FEDONet 更能保持 shock/interface 附近的陡峭梯度；在 2D Poisson 中，它减少局部极值和中高波数段的伪影；在 Eikonal airfoil SDF 中，它更好恢复前缘/后缘高曲率附近的 signed distance；在 KS 方程中，FEDONet 对宽频混沌结构的优势最大，能显著降低相对误差并保留振幅和相位结构。

与传统 DeepONet 相比，FEDONet 的创新点是“把谱偏置放在坐标表示上”，而不是引入复杂的全局算子层或问题专用 Fourier basis。它的边界是：随机频率尺度 \(M,\sigma\) 仍需选择；对于强非周期边界、复杂几何或局部不连续，固定正弦基可能需要与 graph trunk、wavelet 或物理约束结合。但作为一个几乎不改变训练接口的增强，FEDONet 提供了非常直接的谱精度提升路径。

#### 🧪 练习题
```yaml
question: "FEDONet 为什么能改善普通 DeepONet 对高频 PDE 结构的拟合？"
options:
  - "它把 branch network 删除，只保留 trunk network"
  - "它在 trunk 坐标输入前加入随机 Fourier sin/cos 特征，缓解 MLP 的低频谱偏置"
  - "它用有限差分替代神经网络训练"
  - "它只预测频域系数，不再输出物理空间解"
answer: 1
explain: "FEDONet 保留 DeepONet 的 branch-trunk 内积结构，但将查询坐标谱提升为 sin/cos Fourier 特征，使 trunk 更容易表达振荡、多尺度和高梯度解场。"
```

### FANO

```yaml
id: fano
num: 38
name: FANO
full_name: 傅里叶平流算子 (Fourier Advection Neural Operator)
year: '2026'
org: IEEE
parent: fno
paper_url: https://ieeexplore.ieee.org/abstract/document/11358915/
project_url: ''
category: fluid_simulation
motivation: 傅里叶平流机制用于天气预报
```

#### 📝 一句话总结
FANO 将描述大气输运的平流方程（advection equation）嵌入傅里叶神经算子（FNO）框架，利用 Fourier 谱方法在频域仅需一次 FFT/IFFT 即可高效求解平流过程，并通过守恒量、梯度和散度三类物理约束增强模型的物理一致性，在天气预报任务上超越传统 NWP 模型并媲美最先进的深度学习方法。

#### 🎯 核心要点
- **核心架构**：基于 FNO 框架，将平流方程的求解嵌入 Fourier 层，形成 Fourier Advection Layer
- **频域平流求解**：利用 Fourier 谱方法将平流方程 \(\partial u / \partial t + \mathbf{v} \cdot \nabla u = 0\) 转化为频域的逐点乘法，仅需单次 FFT + IFFT
- **速度场学习**：通过神经网络学习大气速度向量场 \(\mathbf{v}(x,t)\)，驱动频域平流算子
- **三类物理约束**：守恒量约束（conserved quantities）、梯度约束（gradient constraints）、散度约束（divergence constraints）
- **数据集**：基于 ERA5 再分析数据，涵盖多个大气变量（含海表温度 SST 等）
- **输入序列**：支持可变长度输入序列（input sequence length），捕获时间演化信息
- **性能**：超越传统 NWP 模型（如 IFS），与 Pangu-Weather、FourCastNet、GraphCast 等 SOTA 深度学习模型性能相当
- **效率**：保持 FNO 的计算效率优势，频域操作为 \(O(N \log N)\) 复杂度

#### 🔬 深入细节
##### 模型架构总览

![FANO 架构示意图](assets/fano_architecture.png)
*图：FANO 模型架构示意。输入大气状态经 Lifting 层映射到高维空间，在 Fourier 域通过 Spectral Advection 算子（基于学习的速度场）进行平流求解，叠加物理约束后经 Projection 层输出预测结果。*

##### 算法伪代码

```python
# FANO 前向传播伪代码
def FANO_forward(x_t, num_layers=N):
    """
    x_t: 输入大气状态张量 [B, C, H, W]，包含温度、风速、气压等变量
    """
    # Step 1: Lifting — 将输入映射到高维隐空间
    h = P(x_t)                          # h: [B, d_model, H, W]

    # Step 2: N 层 Fourier Advection Block
    for l in range(num_layers):
        # 2a. 学习速度场 v(x, t)
        v = VelocityNet_l(h)             # v: [B, 2, H, W] (2D velocity field)

        # 2b. FFT 变换到频域
        h_hat = FFT2(h)                  # h_hat: [B, d_model, K1, K2] (complex)

        # 2c. 频域平流算子 — 核心创新
        # 对于波数 k = (k1, k2)，平流方程的谱解为:
        #   h_hat_new[k] = h_hat[k] * exp(-i * (v · k) * Δt)
        # 等价于频域的逐点复数乘法
        phase_shift = compute_advection_phase(v, k_grid, dt)
        h_hat = h_hat * phase_shift      # point-wise multiplication

        # 2d. IFFT 回到物理域
        h_new = IFFT2(h_hat)             # h_new: [B, d_model, H, W]

        # 2e. 残差连接 + 非线性激活
        h = activation(h_new + h)

    # Step 3: Projection — 映射回物理变量空间
    x_pred = Q(h)                        # x_pred: [B, C, H, W]

    # Step 4: 物理约束损失
    L_conserve = conservation_loss(x_t, x_pred)   # 守恒量约束
    L_gradient = gradient_loss(x_pred)              # 梯度平滑约束
    L_diverge  = divergence_loss(x_pred)            # 散度约束
    L_total = L_data + λ1*L_conserve + λ2*L_gradient + λ3*L_diverge

    return x_pred, L_total
```

##### 动机与背景

天气预报是关系国计民生的核心科学问题。传统数值天气预报（NWP）模型通过求解描述大气运动的偏微分方程组（如 Navier-Stokes 方程、热力学方程等）来预测未来天气状态，代表性系统包括 ECMWF 的 IFS（Integrated Forecasting System）。然而，NWP 模型的计算成本极高——全球 0.25° 分辨率的 10 天预报通常需要数千 CPU 核心运行数小时。

近年来，深度学习方法在天气预报领域取得了突破性进展：

| 模型 | 机构 | 年份 | 核心方法 |
|------|------|------|----------|
| FourCastNet | NVIDIA | 2022 | AFNO (Adaptive Fourier Neural Operator) |
| Pangu-Weather | 华为 | 2023 | 3D Earth-Specific Transformer |
| GraphCast | DeepMind | 2023 | Graph Neural Network on mesh |
| FengWu | 上海 AI Lab | 2023 | Multi-modal Transformer |
| GenCast | DeepMind | 2024 | Diffusion model for ensemble |

这些模型虽然在推理速度上比 NWP 快数个数量级（秒级 vs 小时级），但普遍存在一个关键缺陷：**缺乏显式的物理约束**。它们本质上是纯数据驱动的黑盒模型，不保证预测结果满足基本的物理定律（如质量守恒、能量守恒），这限制了其在实际业务中的可靠性和可解释性。

FANO 的核心动机正是弥合这一鸿沟：**如何在保持深度学习计算效率的同时，将物理方程的约束显式嵌入模型架构？**

##### 核心机制：频域平流求解

**平流方程**是大气动力学中最基本的 PDE 之一，描述了物理量（如温度、湿度、污染物浓度）被风场输运的过程：

$$\frac{\partial u}{\partial t} + \mathbf{v} \cdot \nabla u = 0$$

其中 \(u(x, y, t)\) 是被输运的标量场，\(\mathbf{v} = (v_x, v_y)\) 是速度（风）场。

FANO 的关键洞察在于：**平流方程在 Fourier 域有优雅的解析解**。对上式做空间 Fourier 变换：

$$\frac{\partial \hat{u}_{\mathbf{k}}}{\partial t} + i(\mathbf{v} \cdot \mathbf{k}) \hat{u}_{\mathbf{k}} = 0$$

其中 \(\hat{u}_{\mathbf{k}}\) 是波数 \(\mathbf{k} = (k_x, k_y)\) 处的 Fourier 系数。对于局部常速度场，其解为：

$$\hat{u}_{\mathbf{k}}(t + \Delta t) = \hat{u}_{\mathbf{k}}(t) \cdot \exp\left(-i (\mathbf{v} \cdot \mathbf{k}) \Delta t\right)$$

> 💡 **关键洞察**：平流方程在频域退化为**逐点复数乘法**（point-wise multiplication），这与 FNO 中 Fourier 层的操作形式天然一致！标准 FNO 的 Fourier 层执行 \(\hat{u}_{\mathbf{k}}' = R_{\mathbf{k}} \cdot \hat{u}_{\mathbf{k}}\)，其中 \(R_{\mathbf{k}}\) 是可学习的复数权重矩阵。FANO 将 \(R_{\mathbf{k}}\) 替换为物理驱动的相位旋转因子 \(\exp(-i(\mathbf{v} \cdot \mathbf{k})\Delta t)\)，从而将 FNO 的频域操作赋予了明确的物理含义。

这种设计的计算优势显著：整个平流求解过程仅需**一次 FFT + 频域逐点乘法 + 一次 IFFT**，时间复杂度为 \(O(N \log N)\)，与标准 FNO 相同，远低于有限差分法的迭代求解。

##### 速度场学习

与传统 NWP 中速度场由风速观测直接给出不同，FANO 通过一个子网络 \(\text{VelocityNet}(\cdot)\) 从当前大气状态中**学习**速度向量场 \(\mathbf{v}(x, y, t)\)。这使得模型能够：

1. **自适应捕获有效输运速度**：学到的速度场不仅包含显式风速，还可能编码其他隐式输运机制（如波动传播、对流参数化效应）
2. **处理多尺度动力学**：不同 Fourier Advection Layer 可以学习不同尺度的速度场，分别捕获大尺度环流和中小尺度扰动

##### 物理约束体系

FANO 嵌入三类物理约束作为正则化损失：

**1. 守恒量约束（Conservation Loss）**

大气中的总质量、总能量等物理量在封闭系统中应守恒。FANO 通过约束预测场的全局积分来近似实现：

$$\mathcal{L}_{\text{conserve}} = \left\| \int_{\Omega} x_{t+\Delta t} \, d\Omega - \int_{\Omega} x_t \, d\Omega \right\|^2$$

在离散网格上，这等价于约束预测场与输入场的全局均值一致，对应 Fourier 系数的零频分量 \(\hat{u}_{\mathbf{0}}\) 不变。

**2. 梯度约束（Gradient Loss）**

确保预测场的空间梯度合理，避免出现非物理的剧烈跳变：

$$\mathcal{L}_{\text{gradient}} = \left\| \nabla x_{t+\Delta t} \right\|_{\text{reg}}$$

这有助于保持天气场的空间平滑性，抑制 Gibbs 现象等频域方法的常见伪影。

**3. 散度约束（Divergence Loss）**

对于近似不可压缩的大气流动，速度场应满足连续性方程的约束：

$$\mathcal{L}_{\text{diverge}} = \left\| \nabla \cdot \mathbf{v} \right\|^2$$

> ⚠️ **注意**：散度约束施加在学习到的速度场上而非预测的大气状态上，确保平流输运过程本身的物理合理性。

总损失函数为：

$$\mathcal{L} = \mathcal{L}_{\text{data}} + \lambda_1 \mathcal{L}_{\text{conserve}} + \lambda_2 \mathcal{L}_{\text{gradient}} + \lambda_3 \mathcal{L}_{\text{diverge}}$$

##### 与传统方法的对比

| 特性 | 传统 NWP (IFS) | 标准 FNO | FANO |
|------|---------------|----------|------|
| 物理方程 | 完整 PDE 组 | 无显式物理 | 平流方程 |
| 求解方式 | 有限差分/谱方法迭代 | 数据驱动学习 | Fourier 谱方法 (解析) |
| 计算复杂度 | 极高 (小时级) | 低 (秒级) | 低 (秒级) |
| 物理约束 | 内建 | 无 | 守恒+梯度+散度 |
| 频域操作含义 | — | 可学习滤波器 | 物理驱动相位旋转 |
| 可解释性 | 高 | 低 | 中-高 |

FANO 相比标准 FNO 的核心改进在于：将 Fourier 层中的**任意可学习复数权重**替换为**物理驱动的平流算子**，使频域操作具有明确的物理含义（相位旋转 = 空间平移 = 大气输运），同时通过物理约束损失进一步增强预测的物理一致性。

##### 实验设置与结果

论文基于 ERA5 再分析数据集进行实验，该数据集由 ECMWF 提供，覆盖全球 0.25° 分辨率的多层大气变量。实验涵盖多个关键气象变量的预测，包括：
- 位势高度（Geopotential, Z500）
- 温度（Temperature, T850）
- 海表温度（Sea Surface Temperature, SST）
- 风速分量（U/V wind components）

实验结果表明：
1. **超越传统 NWP**：在多个变量和预报时效上，FANO 的 RMSE/ACC 指标优于 IFS 等传统模型
2. **媲美 SOTA DL**：与 Pangu-Weather、FourCastNet 等最先进深度学习模型性能相当
3. **物理一致性更强**：物理约束有效减少了非物理预测（如质量不守恒、梯度异常）
4. **计算高效**：保持了 FNO 框架的推理速度优势

#### 🧪 练习题
```yaml
question: "FANO 将平流方程嵌入 FNO 框架的关键在于，平流方程在 Fourier 域的解具有什么特殊形式？"
options:
  - "卷积运算，需要多次迭代求解"
  - "逐点复数乘法（相位旋转），可一步求解"
  - "矩阵求逆运算，需要特征值分解"
  - "非线性激活函数变换，需要反向传播"
answer: 1
explain: "平流方程在 Fourier 域的解为 û_k(t+Δt) = û_k(t)·exp(-i(v·k)Δt)，即逐点复数乘法（相位旋转），这与 FNO 的 Fourier 层操作形式天然一致，仅需单次 FFT+IFFT 即可完成。"
```

### PhysicsNeMo

```yaml
id: physicsnemo
num: 39
name: PhysicsNeMo
full_name: 物理AI框架 (PhysicsNeMo)
year: '2026'
org: NVIDIA
parent: —
paper_url: https://www.nvidia.com/en-us/ai-data-science/physics-nemo/
project_url: ''
category: fluid_simulation
motivation: 开源物理AI产业化仿真框架
```

#### 📝 一句话总结
PhysicsNeMo 不是单个网络结构，而是 NVIDIA 面向 Physics AI 的开源 PyTorch 框架：它把神经算子、GNN、Transformer、扩散模型、PINN/PINO、工程数据管线、分布式训练和 PDE 残差工具组合成可复用的工业仿真代理建模栈。

#### 🎯 核心要点
- **框架而非单篇论文算法**：任务给出的链接是 NVIDIA 官方项目页；方法解读基于官方文档、GitHub README 与示例，而不是某篇独立论文
- **模块化组件**：`physicsnemo.models` 提供模型族，`physicsnemo.datapipes` 处理网格/点云/场数据，`physicsnemo.distributed` 封装多 GPU/多节点训练，`physicsnemo.sym` 负责符号 PDE 与 physics loss
- **模型覆盖面广**：包含 FNO/AFNO/DeepONet/PINO、MeshGraphNet/GraphCast、DoMINO/XAeroNet、Transolver、扩散模型、PINN 和多种天气/CFD/结构力学模型
- **物理约束一等公民**：通过 `PDE` 子类和 `PhysicsInformer` 把连续方程残差、边界条件、数据监督项统一进 PyTorch loss
- **多种导数计算方式**：PhysicsInformer 支持 autodiff、finite difference、meshless finite difference、spectral、least squares 等梯度/残差计算路径
- **工程数据结构适配**：官方示例覆盖 Darcy flow、lid-driven cavity、vortex shedding、external aerodynamics、GraphCast 天气预测、分子动力学、结构力学等场景
- **可扩展训练与部署**：与 PyTorch 原生训练循环兼容，支持分布式训练、checkpoint/logging、ONNX 导出和领域包如 PhysicsNeMo CFD、Earth-2 Studio、PhysicsNeMo Curator

#### 🔬 深入细节
##### 可访问来源与核心示意图

`paper_url` 指向 NVIDIA PhysicsNeMo 官方介绍页，未对应一篇传统论文。本文以 NVIDIA 官方文档 https://docs.nvidia.com/physicsnemo/latest/overview.html、GitHub 仓库 https://github.com/NVIDIA/physicsnemo、Physics-guided 文档 https://docs.nvidia.com/physicsnemo/latest/user-guide/physics_addition.html 和 PINN 教程 https://docs.nvidia.com/physicsnemo/26.05/user-guide/pinns-tutorials/index.html 为来源；因此这里解读的是“框架级方法栈”，不是单个模型的封闭算法。

![PhysicsNeMo knowledge-guided models](https://raw.githubusercontent.com/NVIDIA/physicsnemo/main/docs/img/value_prop/Knowledge_guided_models.gif)
*图：NVIDIA PhysicsNeMo README 中的 knowledge-guided models 示意图。PhysicsNeMo 的核心定位是把数据、物理约束和可扩展深度学习模块放在同一训练/推理管线中。*

##### 框架训练伪代码

```python
# PhysicsNeMo physics-guided training pipeline, simplified
from physicsnemo.distributed import DistributedManager
from physicsnemo.models.fno import FNO
from physicsnemo.sym.eq.phy_informer import PhysicsInformer
from my_equations import NavierStokes2D

DistributedManager.initialize()
dist = DistributedManager()

model = FNO(in_channels=..., out_channels=...).to(dist.device)
pde = NavierStokes2D(nu=nu, rho=rho)  # physicsnemo.sym.eq.pde.PDE subclass
informer = PhysicsInformer(
    required_outputs=["continuity", "momentum_x", "momentum_y"],
    equations=pde,
    grad_method="autodiff",  # or finite_difference / spectral / least_squares
    device=dist.device,
)

for batch in datapipe:
    inputs = batch["coords_or_fields"].to(dist.device)
    target = batch.get("target")

    pred = model(inputs)
    losses = {}

    if target is not None:
        losses["data"] = mean_squared_error(pred, target)

    residuals = informer.forward({"x": inputs[..., 0], "y": inputs[..., 1]}, pred)
    losses["continuity"] = mean(residuals["continuity"] ** 2)
    losses["momentum_x"] = mean(residuals["momentum_x"] ** 2)
    losses["momentum_y"] = mean(residuals["momentum_y"] ** 2)

    loss = sum(loss_weight[name] * value for name, value in losses.items())
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

export_to_onnx_or_checkpoint(model)
```

##### 方法机制解释

PhysicsNeMo 的关键不是提出某个新的 PDE 求解公式，而是把 Physics AI 的常见构件做成可组合的工程抽象。传统 SciML 项目通常需要研究者自己处理模型实现、网格/点云数据读取、残差求导、分布式训练、日志、checkpoint 和部署接口；PhysicsNeMo 把这些拆成模块，使同一套训练循环可以在 FNO、MeshGraphNet、Transolver、PINN 或混合 physics-guided 模型之间复用。

一个典型 PhysicsNeMo 任务可以写成加权经验风险：

$$
\mathcal{L}(\theta)
=
\lambda_{\mathrm{data}}\mathcal{L}_{\mathrm{data}}
+
\sum_{k}\lambda_k
\left\|
\mathcal{R}_k[u_\theta; a]
\right\|_2^2
+
\lambda_{\mathrm{bc}}\mathcal{L}_{\mathrm{bc}},
$$

其中 \(u_\theta\) 是神经网络预测的场变量，\(a\) 可以是初始条件、边界条件、几何、材料参数或网格特征；\(\mathcal{R}_k\) 是由 PDE、守恒律或约束产生的残差。对于不可压 Navier-Stokes，一个常见 residual 形式为：

$$
\mathcal{R}_{c}
=
\frac{\partial u}{\partial x}
+
\frac{\partial v}{\partial y},
$$

$$
\mathcal{R}_{x}
=
\frac{\partial u}{\partial t}
+
u\frac{\partial u}{\partial x}
+
v\frac{\partial u}{\partial y}
+
\frac{1}{\rho}\frac{\partial p}{\partial x}
-
\nu
\left(
\frac{\partial^2 u}{\partial x^2}
+
\frac{\partial^2 u}{\partial y^2}
\right),
$$

$$
\mathcal{R}_{y}
=
\frac{\partial v}{\partial t}
+
u\frac{\partial v}{\partial x}
+
v\frac{\partial v}{\partial y}
+
\frac{1}{\rho}\frac{\partial p}{\partial y}
-
\nu
\left(
\frac{\partial^2 v}{\partial x^2}
+
\frac{\partial^2 v}{\partial y^2}
\right).
$$

`physicsnemo.sym` 的作用是把这些符号方程转换为训练时可计算的 residual。用户定义 `PDE`，指定输出变量和 `grad_method`，`PhysicsInformer` 根据模型输出自动构造计算图或有限差分/谱方法求导。这样做的优势是训练脚本仍然是普通 PyTorch 代码，但 PDE residual 不需要手写大量微分张量索引。

从数据结构看，PhysicsNeMo 同时服务规则网格、非结构网格、图、点云和多尺度天气网格。神经算子类模型适合规则场到场映射，例如 Darcy flow 或天气预测；MeshGraphNet 类模型适合非结构网格上的流固仿真；Transformer/Transolver 类模型适合点集或复杂几何上的长程相互作用；PINN/PINO 类模型则把 PDE residual 直接作为训练信号或正则项。框架把这些差异收敛到“模型 + datapipe + loss + optimizer”的组合。

> 💡 关键：PhysicsNeMo 的“物理 AI”不是只在 loss 里加一个 PDE 项。它更像一个工程化操作系统：模型库提供可替换主干，datapipe 统一工程数据输入，PhysicsInformer 统一残差计算，distributed/launch/deploy 处理规模化训练和落地。

与传统 CFD 求解器相比，PhysicsNeMo 训练出的模型通常是代理模型或校正模型：训练成本可能较高，但推理阶段可以在新参数、新几何或新初边值条件下快速给出近似场。与普通 PINN 脚本相比，PhysicsNeMo 的优势在可复用组件和规模化训练；与纯监督 CNN/Transformer 相比，它可以把守恒方程、边界条件和物理 residual 纳入优化目标，从而在数据稀缺或分布外外推时提供额外约束。

在流体仿真场景中，PhysicsNeMo 常见流程是：先用 CFD/实验/再分析数据构造样本，再选择 FNO、MeshGraphNet、Transolver 或扩散模型做场预测，随后用 PDE residual、边界条件误差或物理诊断量约束训练。对于实时工程设计，模型可导出为 checkpoint/ONNX 或接入领域包；对于研究工作，用户可以替换 PDE、模型主干、导数计算方式和 loss 聚合策略。

#### 🧪 练习题
```yaml
question: "PhysicsNeMo 中 PhysicsInformer 的核心作用是什么？"
options:
  - "把神经网络权重自动转换成有限元网格"
  - "根据符号 PDE 和模型输出计算方程残差，并将 physics loss 接入 PyTorch 训练"
  - "只负责下载 CFD 数据集，与训练损失无关"
  - "把所有模型强制改写成 GraphCast 架构"
answer: 1
explain: "PhysicsInformer 接收 PDE 定义、目标 residual 名称和导数计算方式，计算连续方程残差；这些 residual 可与数据损失一起组成 PhysicsNeMo 的训练目标。"
```

### SIMPLE-PINN

```yaml
id: simple_pinn
num: 40
name: SIMPLE-PINN
full_name: SIMPLE算法PINN (SIMPLE-PINN)
year: '2026'
org: arXiv
parent: pinn
paper_url: https://arxiv.org/abs/2603.24013
project_url: ''
category: fluid_simulation
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

### FE-PINNs

```yaml
id: fe_pinns
num: 41
name: FE-PINNs
full_name: 有限元PINN (Finite-Element-based PINNs)
year: '2026'
org: APL Machine Learning
parent: canns
paper_url: https://pubs.aip.org/aip/aml/article/4/1/016106/3379950
project_url: ''
category: solid_mechanics
motivation: 有限元基函数实现网格无关建模
```

#### 📝 一句话总结
FE-PINNs 用有限元弱式残差训练神经网络，并提出 stencil convolution 在任意有限元网格上执行类 CNN 卷积，从而让 PINN 代理模型同时获得复杂几何适配、边界条件自然进入 loss、以及比图卷积更接近规则卷积的局部算子。

#### 🎯 核心要点
- **有限元残差作为 physics loss**：不再用强形式 PDE collocation loss，而是把有限元弱 Galerkin 残差 \(\mathbf{R}(\hat{\mathbf{u}})\) 作为训练损失
- **边界条件纳入 FE 方程**：自然边界和外力通过 FE 外力向量进入 residual，避免为 BC loss 手动设置额外权重
- **stencil convolution**：在每个 FE 节点周围定义 stencil 点，用反等参映射和形函数把隐藏场插值到 stencil 点，再做卷积
- **面向任意网格/几何**：卷积不依赖规则像素网格，也不把卷积邻域完全绑定到图连边，适合结构化、非结构化、畸变 FE 网格
- **输入输出是分片函数**：网络输入节点坐标，输出节点位移；通过 FE 形函数 \(N_a\) 解释为连续/分片位移场
- **测试问题为线弹性边值问题**：使用楔形块与带孔块几何，平面应变双线性四边形单元，刚度矩阵来自 ABAQUS
- **代理建模能力来自多几何训练**：单几何训练主要近邻泛化；训练几何数量增加后，未见几何上的测试 loss 系统性下降

#### 🔬 深入细节
##### 论文来源与核心示意图

正式出版页面为 AIP APL Machine Learning：https://pubs.aip.org/aip/aml/article-abstract/4/1/016106/3379950，DOI 为 https://doi.org/10.1063/5.0299671。为保证图示 URL 可直接嵌入，这里使用同一工作的 arXiv HTML 预印本图像：https://arxiv.org/html/2412.07126v1。论文公开代码仓库见 https://gitlab.com/mmod_public/fepinn。

![FE-PINN stencil tensor](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/stencil_tensor.png)
*图：stencil tensor 定义。每个节点周围放置一组规则或自定义 stencil 点，作为类 CNN 卷积核的采样位置。*

![FE-PINN stencil convolution](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/stencil_conv.png)
*图：在 FE 网格节点上执行 stencil convolution。隐藏场先由有限元形函数插值到 stencil 点，再与卷积权重相乘。*

![FE-PINN architecture and geometries](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/blcks.png)
*图：论文使用的楔形块与带孔块测试几何，用于检验 FE-PINN 在未见几何上的代理建模能力。*

##### 算法伪代码

```python
# FE-PINN training with stencil convolution, simplified
for mesh in training_meshes:
    K_or_residual_operator = load_fe_operator(mesh)   # from FE code, e.g. ABAQUS output
    S = precompute_stencil_tensor(mesh, stencil_offsets)
    mesh.cache["stencil_tensor"] = S

def stencil_conv(hidden, S, W, bias):
    # hidden: [nodes, in_channels]
    # S[k, l, m, n] interpolates node-field values to stencil point (k,l) around node m
    stencil_values = sparse_contract(S, hidden)       # [nodes, k, l, in_channels]
    out = einsum("mklc,ockl->mo", stencil_values, W) + bias
    return relu(out)

def network_forward(node_coords, mesh):
    h = lift(node_coords)                             # x,y as input channels
    for layer in stencil_layers:
        h = stencil_conv(h, mesh.cache["stencil_tensor"], layer.W, layer.bias)
    ux = head_x(h)
    uy = head_y(h)
    return stack([ux, uy], dim=-1)                    # nodal displacement vector

for epoch in range(1000):
    loss = 0.0
    for mesh in batch_of_geometries:
        u_hat = network_forward(mesh.node_coords, mesh)
        R = finite_element_residual(mesh, u_hat)      # nonlinear R(u), or K u - f
        loss += mean(R**2)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 从强形式 PINN 到有限元弱式 residual

普通 PINN 对固体力学边值问题常直接惩罚强形式平衡方程。例如小变形静力平衡可写为：

$$
\frac{\partial \sigma_{ij}}{\partial x_j}+b_i=0
\quad \text{in } \Omega,
$$

并配合位移边界 \(\Gamma_u\) 与力边界 \(\Gamma_t\)：

$$
u_i=\bar{u}_i \quad \text{on } \Gamma_u,
\qquad
\sigma_{ij}n_j=\bar{t}_i \quad \text{on } \Gamma_t.
$$

FE-PINNs 改用有限元弱形式。引入权函数 \(w_i\) 并分部积分后，平衡方程变成：

$$
\int_{\Omega}
\sigma_{ij}(\mathbf{u})
\frac{\partial w_i}{\partial x_j}
\,d\Omega
=
\int_{\Omega} b_i w_i\,d\Omega
+
\int_{\Gamma_t}\bar{t}_i w_i\,d\Gamma.
$$

位移场使用 FE 形函数展开：

$$
u_i^h(\mathbf{x})
=
\sum_{a=1}^{N_n} N_a(\mathbf{x})\,d_{ia},
$$

其中 \(d_{ia}\) 是节点 \(a\) 上第 \(i\) 个位移分量。离散后，FE 方程可抽象成 residual：

$$
\mathbf{R}(\mathbf{d})
=
\mathbf{f}_{\mathrm{int}}(\mathbf{d})
-
\mathbf{f}_{\mathrm{ext}}
=
\mathbf{0}.
$$

对于论文实验中的线弹性问题，它进一步退化为：

$$
\mathbf{K}\mathbf{d}-\mathbf{f}=\mathbf{0}.
$$

FE-PINN 让神经网络预测节点位移 \(\hat{\mathbf{d}}_\theta\)，直接最小化有限元 residual：

$$
\mathcal{L}_{\mathrm{FE\text{-}PINN}}(\theta)
=
\frac{1}{N_R}
\left\|
\mathbf{R}(\hat{\mathbf{d}}_\theta)
\right\|_2^2.
$$

> 💡 关键：FE-PINN 的 physics loss 可由已有 FE 代码计算，因此它不是重新手写所有 PDE 微分项，而是复用有限元程序已经实现的弱式、材料模型、单元积分和边界处理。

##### stencil convolution 的数学机制

CNN 的问题是需要规则网格；GNN 的问题是卷积邻域强依赖 mesh connectivity，非结构网格上每个节点的邻域形状不同。FE-PINNs 的 stencil convolution 试图取二者中间路线：卷积核位置像 CNN 一样由固定 stencil 定义，但隐藏场值通过 FE 插值从任意网格中读取。

对每个节点 \(m\)，定义一组 stencil 偏移：

$$
s_{ikl},
\qquad
k,l\in[-\omega,\omega],
\qquad
\omega=\frac{w-1}{2},
$$

其中 \(i\) 是坐标方向，\(w\) 是卷积核大小。节点 \(m\) 的 stencil 点物理坐标可写为：

$$
x_{ikl}^{m}
=
X_i^m+s_{ikl}.
$$

为了在这个点读取隐藏场，算法先找到包含该 stencil 点的有限元单元 \(e(m,k,l)\)，再通过反等参映射求父单元坐标：

$$
\boldsymbol{\xi}_{kl}^{m}
=
\Phi_{e}^{-1}
\left(
\mathbf{x}_{kl}^{m}
\right).
$$

随后用单元形函数插值输入通道 \(c\) 的隐藏场：

$$
h_c(\mathbf{x}_{kl}^{m})
=
\sum_{n\in e(m,k,l)}
N_n
\left(
\boldsymbol{\xi}_{kl}^{m}
\right)
h_{cn}.
$$

论文把这些形函数权重预计算成稀疏 stencil convolution tensor：

$$
S_{klmn}
=
\begin{cases}
N_n(\boldsymbol{\xi}_{kl}^{m}), & n \in e(m,k,l),\\
0, & \text{otherwise}.
\end{cases}
$$

卷积层输出则为：

$$
z_{qm}
=
b_q
+
\sum_{c}
\sum_{k,l}
W_{qckl}
\sum_n
S_{klmn}h_{cn}.
$$

这一步的直觉是：即使网格节点不在规则排列上，网络仍然可以在“以当前节点为中心的规则物理 stencil”上观察场值；而这些场值由 FE 形函数从不规则网格中插值得到。预计算 \(S_{klmn}\) 后，前向传播就是稀疏张量乘法加普通卷积权重收缩。

##### 训练/推理流程与实验设置

论文实验以二维线弹性为主，输入是节点坐标 \((x,y)\)，输出是节点位移 \((u_x,u_y)\)。网络为两个位移分量使用独立子网络，每个子网络含 stencil convolution 隐藏层。训练时不需要 FE 求解标签作为监督目标；但需要 FE mesh、刚度矩阵或 residual operator 来计算 \(\mathbf{R}(\hat{\mathbf{d}}_\theta)\)。实验中的刚度矩阵由 ABAQUS 生成，网格为平面应变双线性四边形单元并使用 \(2\times2\) Gauss 积分。

对单个几何训练时，FE-PINN 可以很好拟合训练几何，也能对相近几何有一定泛化，但对差异很大的几何误差较高。这符合代理模型的插值性质。训练几何从 1 个增加到 3 个后，测试 loss 整体下降，而训练 loss 维持在相近量级，说明网络不是只能记住单个解，而是在多几何 residual 约束下学到更通用的映射。

与数据驱动 surrogate 相比，FE-PINN 不需要预先生成完整位移标签作为训练集；它只需要 FE residual 计算能力。与传统 PINN 相比，它避免了强形式高阶导数和 BC loss 权重调参，并天然适配 FE 已经支持的复杂几何与材料。与 graph PINN 相比，stencil convolution 的感受野由物理空间 stencil 控制，而不是完全由网格连边控制，因此论文观察到它对结构化/非结构化/畸变网格的敏感性较低。

局限也很清楚。stencil tensor 的预计算需要为每个 stencil 点找到所在单元并执行反等参映射；对高阶单元、三维单元或严重畸变单元，这一步可能变复杂。论文当前主要验证了线性二维固体问题，变量边界条件、材料参数、体力、非线性材料和 3D 大规模训练仍属于后续扩展方向。

#### 🧪 练习题
```yaml
question: "FE-PINNs 中 stencil convolution 相比普通 CNN 的关键区别是什么？"
options:
  - "它完全不需要卷积权重，只使用有限元刚度矩阵"
  - "它在 FE 节点周围定义 stencil 点，并用反等参映射和形函数把任意网格上的场插值到这些点后再卷积"
  - "它只能用于规则像素网格，不能用于非结构化有限元网格"
  - "它把边界条件作为额外监督标签直接拟合，不计算 physics loss"
answer: 1
explain: "stencil convolution 的核心是用 FE 插值读取任意物理位置的隐藏场，因此能在不规则 FE 网格上执行类似 CNN 的局部算子。"
```

### AION-1

```yaml
id: aion1
num: 42
name: AION-1
full_name: 天文基础模型 (AION-1)
year: '2026'
org: Flatiron Institute
parent: —
paper_url: https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/
project_url: ''
category: physics_constrained
motivation: 31亿参数统一39种观测模态
```

#### 📝 一句话总结
AION-1 提出了面向天文学的 omnimodal foundation model：先把图像、光谱、测光和标量目录量统一离散成 token，再用 Transformer 编码器-解码器做跨模态 masked modeling，从而用一个冻结骨干处理缺失模态、多模态融合和跨模态生成。

#### 🎯 核心要点
- **39 种观测模态统一建模**：覆盖 Legacy Survey、HSC、SDSS、DESI、Gaia 的多波段图像、低/高分辨率光谱、测光、红移、形状、视差和天球坐标等数据
- **大规模预训练语料**：基于超过 2 亿个恒星、星系和类星体观测，数据量约百 TB 级，强调同一天体在不同巡天/仪器下的关联
- **两阶段架构**：Universal Tokenization of Diverse Data 将异构科学观测离散化；Multimodal Masked Modeling 学习任意已观测 token 到目标 token 的条件分布
- **模态特异 tokenizer**：图像、光谱、标量和标量场分别使用适配其物理形态的 tokenization，避免把不同仪器数据粗暴重采样到同一格式
- **Transformer encoder-decoder**：编码器接收任意模态组合，解码器通过 query token 预测被遮蔽模态，可用于表示学习和条件生成
- **模型规模族**：论文/项目释放从约 300M 到 3.1B 参数的 AION-1 变体，最大模型接近 31 亿参数
- **冻结骨干下游适配**：常用流程是冻结 encoder，对 mean pooling 或 attention pooling 的 embedding 加线性/MLP/CNN 小头
- **代表性任务**：星系/恒星物理参数估计、星系形态分类、强引力透镜检索、星系分割、红移估计、Gaia 到 DESI 的光谱超分辨率
- **来源追溯说明**：任务给出的 Simons Foundation 链接是新闻页；方法级细节主要来自论文 `https://arxiv.org/abs/2510.17960`、项目页 `https://polymathic-ai.org/blog/aion-1/` 和代码仓库 `https://github.com/PolymathicAI/AION`

#### 🔬 深入细节
##### 核心架构示意

![AION-1 数据 tokenization、Transformer 与下游任务总览](https://raw.githubusercontent.com/PolymathicAI/AION/main/assets/aion.png)
*图：AION-1 先把图像、光谱、分割图和物理参数转换为离散 token，再通过统一 Transformer encoder-decoder 建模，最后把 encoder embedding 或 decoder 生成能力用于回归、分割和检索等任务。*

##### 算法伪代码

```python
# AION-1 预训练与下游使用伪代码

for object_id in astronomical_objects:
    raw_modalities = load_available_observations(
        object_id,
        surveys=["Legacy", "HSC", "SDSS", "DESI", "Gaia"],
    )

    token_stream = []
    for modality, raw_value in raw_modalities.items():
        tokenizer = tokenizer_registry[modality]
        z = tokenizer.encode(raw_value)             # image/spectrum/scalar -> discrete tokens
        token_stream.extend(add_modality_and_position(z, modality))

    observed, target = sample_observed_and_target_tokens(token_stream)
    h = transformer_encoder(observed)
    logits = transformer_decoder(query_tokens(target), h)
    loss = cross_entropy(logits, target.token_ids)
    update(loss)

# 下游任务：冻结 encoder，只训练轻量 probe/head
tokens = encode_available_modalities(new_object)
hidden = frozen_aion_encoder(tokens)
embedding = mean_pool(hidden)                       # 或 attentive pooling
prediction = task_head(embedding)
```

##### 任务背景：天文数据不是普通多模态数据

天文学的难点不是简单的“图像 + 文本”融合，而是同一个物理天体会被不同巡天、望远镜、滤波器、曝光深度和光谱分辨率观察到。传统做法通常为每个任务和每个数据源训练专用模型，例如图像形态分类用 CNN、光谱参数估计用 1D 网络、测光红移用树模型或小型 MLP。这种拆分会造成两个问题：一是缺失模态时很难复用模型，二是跨仪器的物理关联无法在一个共享表示中积累。

AION-1 的方法选择不是把所有数据强行投到连续向量后拼接，而是先离散化为 token。对第 \(m\) 个模态在位置 \(t\) 的 token \(z_{m,t}\)，编码器输入可抽象为：

$$
e_{m,t}
= \mathrm{Embed}_m(z_{m,t}) + a_m + p_t,
$$

其中 \(\mathrm{Embed}_m\) 是模态特异 token embedding，\(a_m\) 是模态/来源 embedding，\(p_t\) 是位置 embedding。AION-1 特别强调 provenance：来自不同仪器的图像即使同属 image，也使用不同模态/来源 embedding，让模型感知分辨率、噪声和巡天选择函数差异。

##### Universal Tokenization：把异构观测变成同一种建模对象

图像和标量场可使用类似 VQ/FSQ autoencoder 的离散瓶颈；光谱 tokenizer 需要保留波长网格、通量和噪声信息；标量目录量则可先做经验 CDF 映射和 Gaussianization，再量化到固定 codebook。一个简化的标量 tokenization 可写成：

$$
s = \Phi^{-1}(\hat{F}(x)),
\qquad
q = \arg\min_k |s-c_k|,
$$

其中 \(\hat{F}\) 是该物理量在训练集上的经验分布，\(\Phi^{-1}\) 是标准正态逆 CDF，\(c_k\) 是固定量化中心。这样做的直觉是：红移、通量、视差等标量常有长尾，直接等宽分桶会浪费 token；在概率空间分桶能让每个 bin 获得更均衡的样本量。

##### Multimodal Masked Modeling：学习任意模态到任意模态的条件关系

给定一个天体的全部可用 token 集合 \(X\)，训练时随机抽取已观测集合 \(O\) 和目标集合 \(T\)。编码器只看 \(O\)，解码器接收目标位置/模态 query，但不接收目标 token 的真实值：

$$
q_{m,t}=a_m+p_t.
$$

训练目标是最大化目标 token 的条件似然，等价于最小化交叉熵：

$$
\mathcal{L}_{\mathrm{M3}}(\theta)
=
-\sum_{(m,t)\in T}
\log p_{\theta}\!\left(
z_{m,t}\mid
\{z_{i,j}:(i,j)\in O\},
\{q_{m,t}:(m,t)\in T\}
\right).
$$

这个目标比传统 contrastive image-spectrum 对齐更灵活：它不要求每个样本拥有完整模态，也不只学习配对模态之间的相似度，而是直接训练“给定任意一组观测，预测另一组观测 token”的能力。因此 AION-1 可以用 Legacy 图像 + 测光预测红移，也可以用 Gaia 低分辨率光谱条件生成 DESI 高分辨率光谱样本。

##### 推理方式：冻结 embedding 与条件生成

做回归或分类时，AION-1 通常丢弃 decoder，冻结 encoder，把任意模态组合的 token 序列编码成 contextualized hidden states \(H_1,\ldots,H_N\)。最简单的对象级 embedding 是 mean pooling：

$$
h_{\mathrm{mean}}=\frac{1}{N}\sum_{t=1}^{N}H_t.
$$

更强的任务适配可用 attention pooling：

$$
\alpha_t=\mathrm{softmax}(q^\top W_k H_t),
\qquad
h_{\mathrm{attn}}=\sum_t \alpha_t W_v H_t.
$$

这解释了 AION-1 的工程价值：同一个 encoder 可接收只有测光的对象、只有图像的对象，或图像+光谱+标量的组合；下游只需训练小型 head，而不必为每种缺失模式设计单独融合网络。

条件生成时，decoder 对目标模态的离散 token 给出分类分布，再用对应 tokenizer 的 decoder 还原到图像、光谱或标量空间。论文展示了红移 posterior 样本和 Gaia 到 DESI 的光谱超分辨率，但也提醒：当前迭代揭示式采样给出的更应理解为 plausible samples，不应直接当作严格校准的高维联合后验。

##### 与传统天文模型的区别

| 方法 | 输入假设 | 学习目标 | 下游迁移方式 | 局限 |
|------|----------|----------|--------------|------|
| 单任务监督模型 | 固定模态、固定任务 | 标签监督损失 | 重新训练或微调整网 | 数据需求高，跨巡天复用弱 |
| Contrastive 多模态模型 | 通常依赖成对模态 | 对比学习对齐 embedding | 取相似度或冻结特征 | 难以预测任意缺失模态 |
| AION-1 | 任意可用模态组合 | 跨模态 masked token prediction | 冻结 encoder + 小 head，或 decoder 条件生成 | tokenization 会丢失部分连续信息，预训练选择函数会影响后验 |

> 💡 关键：AION-1 的“物理约束”不来自显式 PDE，而来自大规模真实观测的跨仪器、跨模态一致性；模型通过预测同一天体的不同观测来学习天体物理结构。

##### 实用限制

AION-1 的统一性依赖 tokenizer 质量。离散化会压缩连续信息，尤其对弱谱线、小尺度形态或极端稀有目标可能有损失。预训练数据来自特定巡天和质量筛选，其 embedding 会继承选择函数偏差；在科学测量中仍需要代表性校准集、误差评估和外推检测。对生成任务，decoder 输出的 token 分布不能自动保证物理量之间的联合校准，因此更适合做候选生成、缺失模态补全和表示学习，而不是替代完整的统计推断流程。

#### 🧪 练习题
```yaml
question: "AION-1 相比传统 image-spectrum contrastive 模型的核心优势是什么？"
options:
  - "只训练图像 encoder，因此推理更快"
  - "通过跨模态 masked token prediction 支持任意观测组合到任意目标模态的预测"
  - "完全不需要 tokenizer，直接拼接所有原始数据"
  - "显式求解天体动力学 PDE，因此不需要观测数据"
answer: 1
explain: "AION-1 将多种观测离散成 token，并随机选择 observed/target token 做条件预测，因此天然适配缺失模态、多模态融合和跨模态生成。"
```

### Momentum-GNN

```yaml
id: momentum_gnn
num: 43
name: Momentum-GNN
full_name: 动量守恒图网络 (Momentum-conserving GNN)
year: '2026'
org: Nature Communications
parent: egnn
paper_url: https://www.nature.com/articles/s41467-025-67802-5
project_url: ''
category: physics_constrained
motivation: 严格线性角动量守恒防止能量漂移
```

#### 📝 一句话总结
DYNAMI-CAL GraphNet 提出了一种物理约束的等变图神经网络，通过在边局部参考系中解码反对称力与力矩（\(\vec{F}_{ij}=-\vec{F}_{ji}\), \(\vec{A}_{ij}=-\vec{A}_{ji}\)），从架构层面严格保证线性动量和角动量守恒，解决了现有等变 GNN（如 EGNN、GMN）因消息不对称导致的动量漂移问题，并在颗粒碰撞、N 体动力学、人体运动、蛋白质分子动力学等六类任务上展现了卓越的长程稳定性与外推能力。

#### 🎯 核心要点
- **边局部参考系**：为每条边 \(ij\) 构建三个正交基向量 \(\vec{a}_{ij}, \vec{b}_{ij}, \vec{c}_{ij}\)，满足 SO(3) 等变、T(3) 不变、节点交换反对称
- **反对称力解码**：力 \(\vec{F}_{ij} = \sum_k \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[k] \cdot \text{basis}_k\)，由于基向量反对称，自动满足牛顿第三定律 \(\vec{F}_{ij} = -\vec{F}_{ji}\)，严格保守线性动量
- **反对称力矩解码**：角动量交互向量 \(\vec{A}_{ij} = -\vec{A}_{ji}\)，通过分离轨道分量得到自旋力矩，严格保守总角动量（轨道 + 自旋）
- **时空消息传递**：边嵌入通过 skip 连接跨时间步传递记忆，结合隐式 Euler 积分实现时空一致性
- **Ghost 节点边界建模**：通过反射生成 ghost 节点处理无网格边界，无需重新训练即可适配不同几何形状
- **六类基准验证**：颗粒 6-DoF 碰撞、动量守恒测试、旋转 hopper 外推（60→2073 球、平面→曲面）、约束 N 体、人体运动预测、蛋白质分子动力学

#### 🔬 深入细节
##### 核心架构示意图

![DYNAMI-CAL GraphNet 架构总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-67802-5/MediaObjects/41467_2025_67802_Fig1_HTML.png)

*图：DYNAMI-CAL GraphNet 的完整流程——从图构建、边局部参考系、反对称力/力矩解码到节点状态更新。核心创新在于边消息的物理约束设计，确保牛顿第三定律在架构层面被严格满足。*

##### 算法伪代码

```python
# DYNAMI-CAL GraphNet 单步前向传播
def forward(graph_t, edge_memory_prev):
    # === 1. 编码 ===
    h_i = φ_node(node_features_i)          # 节点标量嵌入
    
    # === 2. 边局部参考系构建 ===
    for edge (i, j) in graph:
        d_ij = r_j - r_i                    # 位移向量
        v_ij = v_j - v_i                    # 相对速度
        a_ij = d_ij / ||d_ij||              # 第一基向量（沿连线）
        c_ij = d_ij × v_ij                  # 第三基向量（叉积）
        c_ij = c_ij / ||c_ij||
        b_ij = c_ij × a_ij                  # 第二基向量（右手系）
        # 关键性质: a_ij = -a_ji, b_ij = -b_ji, c_ij = -c_ji
    
    # === 3. 边嵌入 + 时空消息传递 ===
    for edge (i, j):
        inv_features = [||d_ij||, d_ij·v_ij, ...]  # 不变量特征
        ε_ij = φ_edge(h_i, h_j, inv_features)
        ε_ij = ε_ij + skip_connection(edge_memory_prev[i,j])  # 时间记忆
        ε'_ij = MLP_interaction(ε_ij)       # 交互嵌入
    
    # === 4. 反对称力解码（线性动量守恒）===
    for edge (i, j):
        coeffs_f = ψ_ef(ε'_ij)              # 3个标量系数
        F_ij = coeffs_f[0]*a_ij + coeffs_f[1]*b_ij + coeffs_f[2]*c_ij
        # 自动满足 F_ij = -F_ji（因基向量反对称）
    
    # === 5. 反对称力矩解码（角动量守恒）===
    for edge (i, j):
        coeffs_a = ψ_ea(ε'_ij)              # 3个标量系数
        A_ij = coeffs_a[0]*a_ij + coeffs_a[1]*b_ij + coeffs_a[2]*c_ij
        # A_ij = -A_ji（总角动量交互反对称）
        
        # 对称参考点
        w_i, w_j = ψ_n1(h_i), ψ_n1(h_j)
        r0_ij = (w_i * r_i + w_j * r_j) / (w_i + w_j)  # r0_ij = r0_ji
        
        # 分离自旋力矩
        λ_ij = ψ_el(ε'_ij)                  # 稳定性标量
        M_ij = A_ij - (r_j - r0_ij) × F_ij * λ_ij  # I_j·Δω_j
    
    # === 6. 聚合 + 节点更新 ===
    for node i:
        ΔF_total = Σ_j F_ij                 # 合力
        ΔM_total = Σ_j M_ij                 # 合力矩
        Δv_i = ψ_n2(h_i) * ΔF_total         # 1/m_i · ΣF
        Δω_i = ψ_n3(h_i) * ΔM_total         # 1/I_i · ΣM
        Δv_ext = ψ_n4(h_i)                  # 外力（如重力）
        
        v_new = v_i + Δv_i + Δv_ext
        ω_new = ω_i + Δω_i
        x_new = x_i + (v_i + v_new)/2 * Δt  # 梯形积分
    
    return graph_t+1, edge_memory_current
```

##### 方法深入解析

**1. 动机与背景：等变 GNN 的动量漂移问题**

现有等变 GNN（如 EGNN、GMN、ClofNet）虽然保证了 SE(3) 等变性，但**不保证动量守恒**。根本原因在于：这些模型的边消息 \(m_{ij} \neq m_{ji}\)（或虽然力等变但不反对称），导致节点 \(i\) 对 \(j\) 施加的"力"与 \(j\) 对 \(i\) 的"力"不满足牛顿第三定律。在长程自回归推理中，这种微小的不对称性会累积，造成系统总动量漂移，最终导致物理不一致甚至轨迹发散。

> 💡 **关键洞察**：等变性（输出随输入旋转而旋转）≠ 守恒性（系统总量不变）。DYNAMI-CAL GraphNet 的核心贡献是**在保持等变性的同时，从架构层面强制守恒**。

**2. 核心机制一：边局部参考系**

对每条边 \(ij\)，利用位移向量 \(\vec{d}_{ij} = \vec{r}_j - \vec{r}_i\) 和相对速度 \(\vec{v}_{ij} = \vec{v}_j - \vec{v}_i\) 构建正交基：

$$\vec{a}_{ij} = \frac{\vec{d}_{ij}}{\|\vec{d}_{ij}\|}, \quad \vec{c}_{ij} = \frac{\vec{d}_{ij} \times \vec{v}_{ij}}{\|\vec{d}_{ij} \times \vec{v}_{ij}\|}, \quad \vec{b}_{ij} = \vec{c}_{ij} \times \vec{a}_{ij}$$

这组基向量具有三个关键性质：
- **SO(3) 等变**：全局旋转 \(R\) 作用时，\(\vec{a}_{ij} \to R\vec{a}_{ij}\)
- **T(3) 不变**：平移不改变相对位移和相对速度
- **节点交换反对称**：\(\vec{a}_{ij} = -\vec{a}_{ji}\)，\(\vec{b}_{ij} = -\vec{b}_{ji}\)，\(\vec{c}_{ij} = -\vec{c}_{ji}\)

> ⚠️ **注意**：反对称性是守恒的关键——当 \(\vec{d}_{ij}\) 变为 \(\vec{d}_{ji} = -\vec{d}_{ij}\) 时，叉积 \(\vec{d}_{ji} \times \vec{v}_{ji} = (-\vec{d}_{ij}) \times (-\vec{v}_{ij}) = \vec{d}_{ij} \times \vec{v}_{ij}\)，但归一化后 \(\vec{a}_{ji} = -\vec{a}_{ij}\)，进而 \(\vec{b}_{ji} = \vec{c}_{ji} \times \vec{a}_{ji} = (-\vec{c}_{ij}) \times (-\vec{a}_{ij}) = ... = -\vec{b}_{ij}\)。

**3. 核心机制二：反对称力与线性动量守恒**

力通过不变标量系数调制反对称基向量来解码：

$$\vec{F}_{ij} = \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[0] \cdot \vec{a}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[1] \cdot \vec{b}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[2] \cdot \vec{c}_{ij}$$

由于边嵌入 \(\boldsymbol{\epsilon}'_{ij}\) 仅依赖不变量（距离、内积等），对称边 \(ij\) 和 \(ji\) 产生相同的标量系数，但基向量反号，因此：

$$\vec{F}_{ij} = -\vec{F}_{ji} \quad \Longrightarrow \quad \sum_{i} \Delta \vec{p}_i = \sum_{i} \sum_{j \in \mathcal{N}(i)} \vec{F}_{ij} = 0$$

这就是牛顿第三定律的架构级实现，**无需任何正则化或后处理**即可严格保证线性动量守恒。

**4. 核心机制三：角动量守恒的力矩解码**

角动量守恒更为复杂，因为总角动量 = 轨道角动量 + 自旋角动量。论文定义边 \(ij\) 的总角动量交互向量：

$$\vec{A}_{ij} = I_i(\vec{\omega}_i^{t+\Delta t} - \vec{\omega}_i^t) + (\vec{r}_i - \vec{r}_0) \times m_i(\vec{v}_i^{t+\Delta t} - \vec{v}_i^t)$$

同样通过反对称基向量解码，确保 \(\vec{A}_{ij} = -\vec{A}_{ji}\)。然后通过对称参考点 \(\vec{r}_{0_{ij}}\) 分离自旋分量：

$$I_j \cdot \Delta\vec{\omega}_j = \vec{A}_{ij} - (\vec{r}_j - \vec{r}_{0_{ij}}) \times \vec{F}_{ij} \cdot \lambda_{ij}$$

其中 \(\vec{r}_{0_{ij}} = \frac{\psi_{n1}(h_i) \cdot \vec{r}_i + \psi_{n1}(h_j) \cdot \vec{r}_j}{\psi_{n1}(h_i) + \psi_{n1}(h_j)}\) 在节点交换下保持不变（\(\vec{r}_{0_{ij}} = \vec{r}_{0_{ji}}\)），\(\lambda_{ij}\) 是稳定性标量，防止微小噪声力产生不合理的大力矩。

**5. 时空消息传递与边记忆**

传统 GNN 每步独立处理图，丢失了时间连贯性。DYNAMI-CAL GraphNet 通过 **skip 连接**将上一时间步的边嵌入传递到当前步：

$$\boldsymbol{\epsilon}_{ij}^{(t)} = \phi_{\text{edge}}(\text{features}_{ij}^{(t)}) + W_{\text{skip}} \cdot \boldsymbol{\epsilon}_{ij}^{(t-1)}$$

这使得模型能够捕捉碰撞前后的时间相关性，类似于 RNN 的隐状态但作用在边上。配合隐式 Euler 积分（使用更新后的速度计算位移），提高了数值稳定性。

**6. Ghost 节点：无网格边界处理**

对于边界（如墙壁），论文提出将每个靠近边界的粒子关于边界面反射，生成 ghost 节点。Ghost 节点继承边界属性（如零速度、边界标识符），与原始粒子之间建立边连接。这种方法：
- 无需显式编码边界几何
- 可推广到任意形状（平面、曲面）
- 训练时用平面墙，测试时可直接迁移到旋转圆柱 hopper

**7. 与 EGNN/GMN 的关键区别**

| 特性 | EGNN | GMN | DYNAMI-CAL GraphNet |
|------|------|-----|---------------------|
| 等变性 | E(n) | E(n) | SE(3) |
| 消息对称性 | \(m_{ij} \neq m_{ji}\) | \(m_{ij} \neq m_{ji}\) | \(\vec{F}_{ij} = -\vec{F}_{ji}\) |
| 线性动量守恒 | ✗ | ✗ | ✓（严格） |
| 角动量守恒 | ✗ | ✗ | ✓（严格） |
| 旋转动力学 | 不支持 | 不支持 | 6-DoF（平动+转动） |
| 时间记忆 | 无 | 无 | 边 skip 连接 |

> 💡 **为什么 EGNN 不守恒？** EGNN 的位置更新 \(\vec{x}_i' = \vec{x}_i + \sum_j (\vec{x}_i - \vec{x}_j) \phi(m_{ij})\) 中，\(\phi(m_{ij})\) 是标量但 \(m_{ij} \neq m_{ji}\)（因为消息聚合依赖节点特征），所以 \(i\) 对 \(j\) 的"推力"与 \(j\) 对 \(i\) 的不等，总动量不守恒。

**8. 实验亮点**

- **旋转 hopper 外推**：仅用 60 球 + 平面墙训练，成功预测 2073 球 + 旋转曲面墙的 16000 步演化，GNS 在早期即发散
- **动量守恒验证**：两球斜碰实验中，DYNAMI-CAL GraphNet 精确保守所有分量的线性和角动量，GNS 和 EGNN 均出现明显漂移
- **蛋白质 MD**：在 NPT 系综（300K, 1 bar）条件下准确预测蛋白质构象动力学

#### 🧪 练习题
```yaml
question: "DYNAMI-CAL GraphNet 如何从架构层面保证牛顿第三定律 F_ij = -F_ji？"
options:
  - "在损失函数中添加 ||F_ij + F_ji||² 正则化项"
  - "使用节点交换反对称的边局部基向量，乘以对称的标量系数来解码力"
  - "对每条边的消息取平均值 (m_ij + m_ji)/2 作为对称消息"
  - "在后处理阶段将力投影到反对称子空间"
answer: 1
explain: "DYNAMI-CAL GraphNet 构建的边局部参考系基向量满足 a_ij=-a_ji, b_ij=-b_ji, c_ij=-c_ji，而标量系数由不变量嵌入产生（ij 和 ji 相同），因此力 F_ij = Σ coeff_k · basis_k 自动满足 F_ij = -F_ji，无需正则化或后处理。"
```
