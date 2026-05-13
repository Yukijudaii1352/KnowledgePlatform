### Convex MPC — 凸模型预测控制 (Convex Model Predictive Control)

```yaml
title: "Dynamic Locomotion in the MIT Cheetah 3 Through Convex Model-Predictive Control"
authors: "Jared Di Carlo, Patrick M. Wensing, Benjamin Katz, Gerardo Bledt, Sangbae Kim"
venue: "IROS 2018"
year: "2018"
url: "https://ieeexplore.ieee.org/abstract/document/8594448"
significance: "简化单刚体模型实现实时足端力优化"
```

#### 📝 一句话总结

Convex MPC 将四足机器人的质心动力学简化为**单刚体模型（SRBD）**，通过线性化与离散化将运动控制问题转化为**凸二次规划（QP）**，以约 30 Hz 的频率实时求解最优地面反力（GRF），在 MIT Cheetah 3 上实现了 trot、bound、pace、pronk、gallop 等多种动态步态。

#### 🎯 核心要点

- **单刚体动力学模型（SRBD）**：忽略腿部质量与惯性（仅占总质量 ~10%），将整个机器人视为一个受足端力驱动的刚体，状态维度从 36+ 降至 13
- **连续动力学线性化**：对欧拉角-角速度关系做小角度近似，惯性张量在当前姿态处冻结，忽略陀螺力矩项，使系统方程变为线性时变（LTV）形式
- **凸 QP 公式化**：将 LTV 系统通过矩阵指数离散化，结合二次代价函数和线性化摩擦锥约束，构造标准凸 QP 问题，保证全局最优解
- **摩擦锥金字塔近似**：将非线性摩擦锥约束 \(\|f_{x,y}\| \leq \mu f_z\) 近似为 4 个线性不等式（金字塔），保持 QP 的凸性
- **步态调度表（Gait Scheduler）**：通过周期性二值接触序列表定义不同步态，MPC 根据接触状态自动分配力约束，切换步态仅需更换调度表
- **实时性能**：使用 qpOASES 求解器，10 步预测窗口（~0.5s）的 QP 平均求解时间 < 1 ms，总控制周期约 33 ms

#### 🔬 深入细节

##### 整体控制架构

```
┌─────────────────────────────────────────────────────────┐
│                   Convex MPC 控制框架                     │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ 步态调度表 │───▶│  Convex MPC  │───▶│ 足端力 f_i    │  │
│  │ Gait Table│    │  (QP Solver) │    │ (GRF, 12D)   │  │
│  └──────────┘    └──────┬───────┘    └───────┬───────┘  │
│                         │                     │          │
│  ┌──────────┐           │                     ▼          │
│  │ 状态估计  │───────────┘              ┌───────────────┐ │
│  │ x = [Θ,p,│    ▲                     │ τ = J^T · f   │ │
│  │  ω,ṗ,g]  │    │ ~30 Hz              │ 关节力矩映射   │ │
│  └──────────┘    │                     └───────┬───────┘ │
│       ▲          │                             │         │
│       │     ┌────┴──────┐                      ▼         │
│       └─────│ 参考轨迹   │              ┌───────────────┐ │
│             │ x_ref(t)  │              │ 关节 PD 控制器  │ │
│             └───────────┘              │ (~1 kHz)      │ │
│                                        └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

*图：Convex MPC 控制框架。上层 MPC 以低频（~30 Hz）求解最优地面反力，通过雅可比转置映射为关节力矩，下层关节 PD 控制器以高频（~1 kHz）执行。步态调度表决定每条腿的接触/摆动状态，摆动腿由独立的摆动腿控制器驱动。*

##### 算法伪代码

```python
# Convex MPC 核心求解流程
def convex_mpc_control(x_current, x_ref_trajectory, gait_table, dt, N_horizon):
    """
    x_current:        当前状态 [Θ, p, ω, ṗ, g]^T ∈ R^13
    x_ref_trajectory: 参考轨迹 (N_horizon 步)
    gait_table:       步态接触序列 (每条腿每步是否触地)
    dt:               离散时间步长 (~30ms)
    N_horizon:        预测步数 (~10)
    """
    # 1. 构建连续线性时变系统 ẋ = A_c * x + B_c * u
    A_c, B_c = build_continuous_dynamics(x_current)
    
    # 2. 离散化: x[k+1] = A_d * x[k] + B_d * u[k]
    A_d = matrix_exp(A_c * dt)          # 13×13
    B_d = A_c_inv @ (A_d - I) @ B_c    # 13×12
    
    # 3. 展开 N 步预测为批量 QP
    #    X_bar = A_bar * x_0 + B_bar * U_bar
    A_bar, B_bar = stack_prediction_matrices(A_d, B_d, N_horizon)
    
    # 4. 构造 QP 代价: min 0.5 * U^T H U + g^T U
    #    J = Σ_k ||x[k]-x_ref[k]||²_Q + ||u[k]||²_R
    H = 2 * (B_bar.T @ Q_bar @ B_bar + R_bar)
    g_vec = 2 * B_bar.T @ Q_bar @ (A_bar @ x_current - X_ref)
    
    # 5. 构造约束: 摩擦锥(金字塔) + 接触力非负 + 摆动腿力=0
    C_ineq, d_ineq = build_friction_pyramid(mu, f_z_max, gait_table, N_horizon)
    
    # 6. 求解 QP (使用 qpOASES)
    U_optimal = qpOASES_solve(H, g_vec, C_ineq, d_ineq)
    
    # 7. 取第一步最优力，通过雅可比转置映射到关节力矩
    f_feet = U_optimal[:12]             # 4 legs × 3D force
    for leg_i in range(4):
        tau[leg_i] = J_foot[leg_i].T @ f_feet[3*leg_i : 3*(leg_i+1)]
    
    return tau
```

##### 动机与背景：为什么需要 Convex MPC？

四足机器人的运动控制面临一个核心矛盾：**模型精度与计算效率的权衡**。

传统的全身动力学（Whole-Body Dynamics, WBD）方法考虑了机器人所有连杆的质量、惯性和关节约束，模型精确但维度极高（MIT Cheetah 3 有 18 个广义坐标），导致非线性优化问题难以实时求解——典型的非线性 MPC 求解一次需要数百毫秒甚至数秒。另一方面，简单的 ZMP（零力矩点）方法虽然计算快速，但仅适用于准静态或慢速行走，无法处理动态跑动中的飞行相（flight phase）。

Di Carlo 等人的关键洞察是：**对于四足机器人的动态运动，腿部质量仅占总质量的很小比例（Cheetah 3 约 10%），因此可以忽略腿部动力学，将整个机器人简化为一个受足端力驱动的单刚体**。这一简化使得：
1. 状态维度从 36+ 降至 13
2. 动力学方程可被线性化
3. 优化问题变为凸 QP，具有全局最优解和确定性求解时间

这种"用简化模型 + 高频重规划"替代"精确模型 + 低频求解"的思路，成为了此后四足机器人控制的主流范式。

##### 核心机制：单刚体动力学模型（SRBD）

系统状态向量定义为 13 维：

$$\mathbf{x} = \begin{bmatrix} \boldsymbol{\Theta} \\ \mathbf{p} \\ \boldsymbol{\omega} \\ \dot{\mathbf{p}} \\ g \end{bmatrix} \in \mathbb{R}^{13}$$

其中 \(\boldsymbol{\Theta} = [\phi, \theta, \psi]^T\) 为欧拉角（roll, pitch, yaw），\(\mathbf{p} \in \mathbb{R}^3\) 为质心位置，\(\boldsymbol{\omega} \in \mathbb{R}^3\) 为体坐标系角速度，\(\dot{\mathbf{p}} \in \mathbb{R}^3\) 为质心线速度，\(g\) 为重力加速度常数（作为状态的一部分以简化矩阵表示）。

控制输入为 4 条腿的地面反力（Ground Reaction Forces）：

$$\mathbf{u} = \begin{bmatrix} \mathbf{f}_1 \\ \mathbf{f}_2 \\ \mathbf{f}_3 \\ \mathbf{f}_4 \end{bmatrix} \in \mathbb{R}^{12}$$

牛顿-欧拉方程给出质心平动与转动动力学：

$$m \ddot{\mathbf{p}} = \sum_{i=1}^{4} \mathbf{f}_i + m\mathbf{g}$$

$$\frac{d}{dt}(\hat{\mathbf{I}} \boldsymbol{\omega}) = \sum_{i=1}^{4} (\mathbf{r}_i - \mathbf{p}) \times \mathbf{f}_i$$

其中 \(\mathbf{r}_i\) 为第 \(i\) 条腿足端在世界坐标系下的位置，\(\hat{\mathbf{I}} = R(\boldsymbol{\Theta}) \mathbf{I}_{body} R(\boldsymbol{\Theta})^T\) 为世界坐标系下的惯性张量。

> 💡 **关键洞察**：将惯性张量变换到世界坐标系后，角动量方程中的叉积项 \(\boldsymbol{\omega} \times \hat{\mathbf{I}} \boldsymbol{\omega}\)（陀螺力矩）在中低速运动下很小，可以忽略。这使得角动量方程简化为 \(\hat{\mathbf{I}} \dot{\boldsymbol{\omega}} = \sum \mathbf{r}_i \times \mathbf{f}_i\)，对控制输入 \(\mathbf{f}_i\) 是线性的。

##### 线性化与离散化

为将系统写成标准线性形式 \(\dot{\mathbf{x}} = \mathbf{A}_c \mathbf{x} + \mathbf{B}_c \mathbf{u}\)，论文做了以下关键近似：

**近似 1：欧拉角-角速度关系线性化。** 精确关系为：

$$\dot{\boldsymbol{\Theta}} = \begin{bmatrix} \cos\psi / \cos\theta & \sin\psi / \cos\theta & 0 \\ -\sin\psi & \cos\psi & 0 \\ \cos\psi \tan\theta & \sin\psi \tan\theta & 1 \end{bmatrix} \boldsymbol{\omega}$$

在小角度假设（\(\phi, \theta \approx 0\)）下近似为 \(\dot{\boldsymbol{\Theta}} \approx R_z(\psi) \boldsymbol{\omega}\)，其中 \(R_z(\psi)\) 为绕 z 轴的旋转矩阵。论文进一步在 yaw 角较小时近似为单位阵。

**近似 2：惯性张量冻结。** 在每个 MPC 求解周期内，将 \(\hat{\mathbf{I}}\) 在当前姿态处计算并固定为常数，不随状态变化。

**近似 3：忽略陀螺力矩。** 省略 \(\boldsymbol{\omega} \times \hat{\mathbf{I}} \boldsymbol{\omega}\) 项。

经过这些近似，连续系统矩阵为：

$$\mathbf{A}_c = \begin{bmatrix} \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & R_z(\psi) & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{I}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{g}_{vec} \\ \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & 0 \end{bmatrix}$$

$$\mathbf{B}_c = \begin{bmatrix} \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} \\ \hat{\mathbf{I}}^{-1}[\mathbf{r}_1]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_2]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_3]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_4]_\times \\ \mathbf{I}/m & \mathbf{I}/m & \mathbf{I}/m & \mathbf{I}/m \\ \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} \end{bmatrix}$$

其中 \([\mathbf{r}_i]_\times\) 为力臂向量 \((\mathbf{r}_i - \mathbf{p})\) 的反对称矩阵。

离散化通过矩阵指数完成：

$$\mathbf{A}_d = e^{\mathbf{A}_c \Delta t}, \quad \mathbf{B}_d = \mathbf{A}_c^{-1}(\mathbf{A}_d - \mathbf{I})\mathbf{B}_c$$

> ⚠️ **注意**：这些近似之所以在实践中有效，是因为 MPC 以 ~30 Hz 频率重新求解。每个求解周期内姿态变化仅约 1°，线性化误差很小，且会在下一周期被自动修正。这种"频繁重规划"策略是 MPC 鲁棒性的核心来源。

##### QP 构造与摩擦锥约束

将 \(N\) 步预测窗口展开为批量形式 \(\bar{\mathbf{X}} = \bar{\mathbf{A}} \mathbf{x}_0 + \bar{\mathbf{B}} \bar{\mathbf{U}}\)，代入二次代价函数后得到标准 QP：

$$\min_{\bar{\mathbf{U}}} \quad \frac{1}{2} \bar{\mathbf{U}}^T \mathbf{H} \bar{\mathbf{U}} + \mathbf{g}^T \bar{\mathbf{U}}$$

$$\text{s.t.} \quad \mathbf{C} \bar{\mathbf{U}} \leq \mathbf{d}$$

其中 \(\mathbf{H} = 2(\bar{\mathbf{B}}^T \bar{\mathbf{Q}} \bar{\mathbf{B}} + \bar{\mathbf{R}})\)，决策变量 \(\bar{\mathbf{U}} \in \mathbb{R}^{12N}\) 为 \(N\) 步的足端力序列。

**摩擦锥的金字塔近似：** 物理摩擦锥约束为二阶锥（SOCP）：

$$\sqrt{f_x^2 + f_y^2} \leq \mu f_z, \quad f_z \geq 0$$

为保持 QP 形式，论文将其近似为内接金字塔的 4 个线性不等式加上法向力上下界：

$$\begin{cases} f_x + \mu f_z \geq 0 \\ -f_x + \mu f_z \geq 0 \\ f_y + \mu f_z \geq 0 \\ -f_y + \mu f_z \geq 0 \\ f_z \geq 0 \\ f_z \leq f_{z,\max} \end{cases}$$

对于摆动腿（swing phase），直接将对应的 \(f_{z,\max} = 0\) 强制该腿力为零。这通过步态调度表在每个时间步自动设定。

##### 步态调度与多步态支持

论文提出了一种极其简洁的步态表示方法——**步态调度表（Gait Table）**。每种步态由一个二值矩阵定义，行对应 4 条腿（FR, FL, HR, HL），列对应步态周期内的离散时间步：

| 步态 | 特征 | 占空比 | 典型周期 |
|------|------|--------|---------|
| **Trot** | 对角腿同步 | 50% | ~0.36s |
| **Bound** | 前/后腿对同步 | 50% | ~0.36s |
| **Pace** | 同侧腿同步 | 50% | ~0.36s |
| **Pronk** | 四腿同步 | 50% | ~0.36s |
| **Gallop** | 四腿依次着地 | ~65% | ~0.36s |

MPC 在每个求解周期读取当前步态相位，确定未来 \(N\) 步的接触序列，据此设置力约束。这种设计使得**切换步态只需更换步态表**，无需修改控制器结构或重新调参。

##### 与传统方法的对比

| 特性 | ZMP 方法 | 全身非线性 MPC | **Convex MPC** |
|------|----------|---------------|----------------|
| 模型维度 | 低 (2-3D) | 高 (36+) | 中 (13) |
| 动态步态支持 | ✗ | ✓ | ✓ |
| 实时性 (~30Hz) | ✓ | ✗ (~1s/次) | ✓ (<1ms/次) |
| 飞行相建模 | ✗ | ✓ | ✓ |
| 凸性保证 | ✓ | ✗ | ✓ |
| 全局最优 | ✓ | 局部最优 | ✓ |
| 地形适应 | 有限 | 强 | 中等 |

> 💡 **核心优势总结**：Convex MPC 在保留动态运动能力的同时，通过单刚体近似和线性化将问题转化为凸 QP，获得了全局最优解和确定性的求解时间。其代价是忽略了腿部动力学和接触时序优化（落脚点由启发式规则预先确定），这些限制在后续工作（如 WBC、DRL 等）中被逐步解决。

##### 实验结果与影响

论文在 MIT Cheetah 3（四足机器人，约 45 kg）上验证了以下能力：

- **多步态运动**：Trot（最高 ~3 m/s）、Bound、Pace、Pronk、Gallop 均实现稳定运动
- **外部扰动恢复**：在 trot 行走中施加侧向推力（~100 N），MPC 自动调整足端力分配实现平衡恢复
- **求解性能**：10 步预测窗口，QP 决策变量 120 维（12×10），约束 200 个，使用 qpOASES 求解器平均求解时间 < 1 ms
- **后续影响**：该方法被广泛应用于 MIT Mini Cheetah、Unitree A1/Go1、ANYmal 等平台，成为四足机器人控制的标准基线方法

#### 🧪 练习题

```yaml
question: "Convex MPC 将四足机器人动力学简化为单刚体模型时，做了哪项关键假设使得优化问题变为凸 QP？"
options:
  - "假设地面完全刚性且摩擦系数无穷大"
  - "忽略腿部质量与惯性，并对旋转动力学进行线性化近似"
  - "假设机器人始终保持静态平衡，不存在飞行相"
  - "将连续时间系统直接替换为离散时间系统，无需近似"
answer: 1
explain: "单刚体动力学模型（SRBD）忽略腿部质量（仅占 ~10%），并通过冻结惯性张量、小角度近似欧拉角-角速度关系、忽略陀螺力矩等线性化手段，将非线性动力学转化为线性时变系统，从而使 MPC 问题成为可实时求解的凸 QP。"
```