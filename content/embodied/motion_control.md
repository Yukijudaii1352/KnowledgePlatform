---
domain: embodied
topic_id: motion_control
topic_name: 运动控制
page_icon: 🦿
page_title: 具身智能运动控制算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统梳理四足/人形机器人运动控制技术演进，从经典ZMP/MPC到Teacher-Student RL再到VLA基础模型的发展历程
hero_pills:
- 🏷️ Locomotion · WBC · Sim-to-Real · VLA
count_pill: '{count} 个算法'
categories:
  classic_control:
    label: 经典控制理论
    color: '#6b7280'
  mpc:
    label: 模型预测控制
    color: '#22a06b'
  rl_locomotion:
    label: 强化学习运动
    color: '#5b63d3'
  wbc:
    label: 全身控制
    color: '#e8820c'
  sim2real:
    label: 仿真迁移
    color: '#0891b2'
  foundation_model:
    label: 基础模型
    color: '#dc2626'
image_base: ../../content/embodied/motion_control/assets/
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: zmp
  x: 100
  y: 50
  category: classic_control
- id: lipm
  x: 150
  y: 50
  category: classic_control
- id: preview_control
  x: 180
  y: 50
  category: classic_control
- id: centroidal_mpc
  x: 250
  y: 150
  category: mpc
- id: pr_mpc
  x: 300
  y: 130
  category: mpc
- id: convex_mpc
  x: 350
  y: 150
  category: mpc
- id: wb_mpc
  x: 530
  y: 130
  category: mpc
- id: perceptive_nmpc
  x: 580
  y: 170
  category: mpc
- id: ppo
  x: 300
  y: 250
  category: rl_locomotion
- id: teacher_student
  x: 420
  y: 250
  category: rl_locomotion
- id: amp
  x: 480
  y: 220
  category: rl_locomotion
- id: legged_gym
  x: 480
  y: 280
  category: rl_locomotion
- id: perceptive_loco
  x: 530
  y: 250
  category: rl_locomotion
- id: anymal_parkour
  x: 650
  y: 230
  category: rl_locomotion
- id: dreamwaq
  x: 650
  y: 270
  category: rl_locomotion
- id: exbody
  x: 650
  y: 310
  category: rl_locomotion
- id: hqp_wbc
  x: 270
  y: 350
  category: wbc
- id: ihwbc
  x: 380
  y: 350
  category: wbc
- id: hwc_loco
  x: 720
  y: 350
  category: wbc
- id: domain_rand
  x: 350
  y: 450
  category: sim2real
- id: isaac_gym
  x: 480
  y: 430
  category: sim2real
- id: rma
  x: 480
  y: 470
  category: sim2real
- id: isaac_lab
  x: 650
  y: 430
  category: sim2real
- id: asap
  x: 720
  y: 470
  category: sim2real
- id: rt2
  x: 580
  y: 550
  category: foundation_model
- id: pi0
  x: 650
  y: 550
  category: foundation_model
- id: openvla
  x: 650
  y: 590
  category: foundation_model
- id: helix02
  x: 800
  y: 530
  category: foundation_model
- id: groot_n1
  x: 800
  y: 570
  category: foundation_model
- id: ge1
  x: 800
  y: 610
  category: foundation_model
- id: dreamdojo
  x: 800
  y: 650
  category: foundation_model
edges:
- from: zmp
  to: lipm
  label: 简化动力学
- from: lipm
  to: preview_control
  label: 预测优化
- from: lipm
  to: centroidal_mpc
  label: 质心框架
- from: centroidal_mpc
  to: pr_mpc
  label: 策略融合
- from: centroidal_mpc
  to: convex_mpc
  label: 凸优化
- from: convex_mpc
  to: wb_mpc
  label: 全身扩展
- from: convex_mpc
  to: perceptive_nmpc
  label: 感知融合
- from: ppo
  to: teacher_student
  label: 特权蒸馏
- from: ppo
  to: amp
  label: 对抗模仿
- from: ppo
  to: legged_gym
  label: GPU并行
- from: teacher_student
  to: perceptive_loco
  label: 视觉感知
- from: perceptive_loco
  to: anymal_parkour
  label: 极限动作
- from: perceptive_loco
  to: dreamwaq
  label: 多模融合
- from: teacher_student
  to: exbody
  label: 表现力
- from: hqp_wbc
  to: ihwbc
  label: MPC联合
- from: ihwbc
  to: hwc_loco
  label: 鲁棒行走
- from: domain_rand
  to: isaac_gym
  label: GPU仿真
- from: domain_rand
  to: rma
  label: 在线自适应
- from: isaac_gym
  to: isaac_lab
  label: 多模态
- from: rma
  to: asap
  label: 残差补偿
- from: rt2
  to: pi0
  label: 跨形态
- from: rt2
  to: openvla
  label: 开源化
- from: pi0
  to: helix02
  label: Loco操作
- from: pi0
  to: groot_n1
  label: 人形专用
- from: pi0
  to: ge1
  label: 世界模型
- from: pi0
  to: dreamdojo
  label: 物理预判
milestones:
- convex_mpc
- teacher_student
- pi0
```

## 核心算法

### ZMP

```yaml
id: zmp
num: 1
name: ZMP
full_name: 零力矩点 (Zero Moment Point)
year: '1969'
org: Waseda University
parent: —
paper_url: https://ieeexplore.ieee.org/document/1083694
project_url: ''
category: classic_control
motivation: 定义双足稳定判据奠定机器人步态基础
```

#### 📝 一句话总结
ZMP 的核心目标是：定义双足稳定判据奠定机器人步态基础。

#### 🎯 核心要点
- 核心动机：定义双足稳定判据奠定机器人步态基础
- 代表机构：Waseda University

#### 🔬 深入细节
定义双足稳定判据奠定机器人步态基础


### LIPM

```yaml
id: lipm
num: 2
name: LIPM
full_name: 线性倒立摆模型 (Linear Inverted Pendulum Model)
year: '2001'
org: AIST
parent: zmp
paper_url: https://www.researchgate.net/publication/3578434
project_url: ''
category: classic_control
motivation: 简化行走动力学实现实时控制
```

#### 📝 一句话总结
LIPM 的核心目标是：简化行走动力学实现实时控制。

#### 🎯 核心要点
- 核心动机：简化行走动力学实现实时控制
- 演化来源：继承或改进自 zmp
- 代表机构：AIST

#### 🔬 深入细节
简化行走动力学实现实时控制


### Preview Control

```yaml
id: preview_control
num: 3
name: Preview Control
full_name: 预观控制 (Preview Control)
year: '2003'
org: AIST
parent: lipm
paper_url: https://ieeexplore.ieee.org/document/1241826
project_url: ''
category: classic_control
motivation: 预测未来ZMP轨迹优化步态规划
```

#### 📝 一句话总结
Preview Control 的核心目标是：预测未来ZMP轨迹优化步态规划。

#### 🎯 核心要点
- 核心动机：预测未来ZMP轨迹优化步态规划
- 演化来源：继承或改进自 lipm
- 代表机构：AIST

#### 🔬 深入细节
预测未来ZMP轨迹优化步态规划


### Centroidal MPC

```yaml
id: centroidal_mpc
num: 4
name: Centroidal MPC
full_name: 质心动力学MPC (Centroidal Dynamics MPC)
year: '2015'
org: ETH Zurich
parent: lipm
paper_url: https://ieeexplore.ieee.org/document/7353848
project_url: ''
category: mpc
motivation: 基于质心动量的MPC框架
```

#### 📝 一句话总结
Centroidal Dynamics MPC 将多刚体机器人的全身动力学抽象为质心线动量与角动量的演化方程（牛顿-欧拉方程），并在模型预测控制框架下滚动优化接触力与质心轨迹，解决了传统 LIPM 仅适用于准静态步态、无法处理三维角动量与多接触场景的局限性。

#### 🎯 核心要点
- **质心动力学模型 (Centroidal Dynamics)**：将浮动基多刚体系统的全身动量投影到质心，用 6 维动量向量（3 维线动量 + 3 维角动量）描述整体运动状态
- **牛顿-欧拉约束**：质心线加速度由所有接触力之和决定，角动量变化率由接触力矩之和决定
- **MPC 滚动优化**：在有限时域内预测质心状态演化，优化各足端接触力序列，实现实时反馈控制
- **摩擦锥约束**：将库仑摩擦锥线性化为多面体锥，作为不等式约束纳入 QP 求解
- **步态调度 (Gait Scheduling)**：通过接触时序表控制各足的站立/摆动相，支持 trot、pace、bound、gallop 等多种步态
- **与 LIPM 的关键区别**：保留完整的三维角动量信息，不假设恒定质心高度，支持动态步态与非共面接触
- **层次化控制架构**：Centroidal MPC 作为高层规划器输出期望接触力与质心轨迹，下层由全身控制器 (WBC) 映射到关节力矩

#### 🔬 深入细节
##### 核心框架示意

![Centroidal MPC 控制框架](assets/centroidal_mpc_framework.png)
*图：基于质心动力学的 MPC 层次化控制架构。高层 Centroidal MPC 优化质心轨迹与接触力，低层 WBC 将其映射为关节力矩。*

Centroidal MPC 的核心思想是：不直接优化机器人全部关节自由度（通常 12-30 维），而是将问题分解为两层——上层在质心空间（6 维状态 + 接触力）进行 MPC 优化，下层通过全身控制器跟踪上层指令。这种分层策略在保持物理一致性的同时，大幅降低了在线优化的计算复杂度。

##### 算法伪代码

```python
# Centroidal Dynamics MPC 核心流程
def centroidal_mpc(x0, gait_schedule, N_horizon, dt):
    """
    x0: 当前状态 [com_pos, com_vel, angular_momentum]  (9维)
    gait_schedule: 各足接触时序表 {leg_id: [contact_flags]}
    N_horizon: 预测时域步数
    dt: 时间步长
    """
    # 1. 构建参考轨迹
    x_ref = generate_reference_trajectory(x0, v_cmd, N_horizon, dt)
    
    # 2. 滚动优化：求解 QP
    for k in range(N_horizon):
        # 质心动力学离散化
        # x_{k+1} = A_k * x_k + B_k * u_k + g_vec
        # 其中 u_k = [f_1, f_2, ..., f_n_c]  (各足接触力)
        
        # 目标函数：跟踪误差 + 力正则化
        # min Σ ||x_k - x_ref_k||²_Q + ||u_k||²_R
        
        # 约束条件：
        # (a) 动力学约束: x_{k+1} = f(x_k, u_k)
        # (b) 摩擦锥约束: A_friction * f_i <= 0  (线性化锥)
        # (c) 接触互补: f_i = 0 if leg_i in swing
        # (d) 法向力非负: f_iz >= 0
    
    u_opt, x_opt = solve_qp(Q, R, A, B, constraints)
    
    # 3. 仅执行第一步最优力
    f_applied = u_opt[0]
    
    # 4. 传递给全身控制器
    tau = whole_body_controller(f_applied, x_opt[1], joint_state)
    
    return tau
```

##### 方法深入解析

**1. 动机与背景：为什么需要质心动力学？**

传统的线性倒立摆模型 (LIPM) 假设质心高度恒定、角动量为零，这使得它只能处理准静态步行。当机器人需要执行 trot、gallop 等动态步态，或在非平坦地形上运动时，角动量的变化不可忽略。质心动力学模型保留了完整的牛顿-欧拉方程，是全身动力学的"最紧凑投影"：

$$
\begin{bmatrix} \dot{\mathbf{p}} \\ \dot{\mathbf{L}} \end{bmatrix} = \begin{bmatrix} m\mathbf{g} \\ \mathbf{0} \end{bmatrix} + \sum_{i=1}^{n_c} \begin{bmatrix} \mathbf{f}_i \\ (\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i \end{bmatrix}
$$

其中 \(\mathbf{p} = m\dot{\mathbf{r}}\) 为线动量，\(\mathbf{L}\) 为绕质心的角动量，\(\mathbf{r}\) 为质心位置，\(\mathbf{f}_i\) 为第 \(i\) 个接触点的力，\(\mathbf{c}_i\) 为接触点位置，\(n_c\) 为当前接触点数。

> 💡 **关键直觉**：质心动力学本质上是牛顿第二定律和角动量定理在整个多刚体系统上的应用——不管机器人有多少关节，其质心的运动完全由外力（接触力 + 重力）决定。

**2. 状态空间与动力学模型**

系统状态定义为：

$$
\mathbf{x} = \begin{bmatrix} \mathbf{r} \\ \dot{\mathbf{r}} \\ \boldsymbol{\Theta} \end{bmatrix} \in \mathbb{R}^{9}
$$

其中 \(\mathbf{r} \in \mathbb{R}^3\) 为质心位置，\(\dot{\mathbf{r}} \in \mathbb{R}^3\) 为质心速度，\(\boldsymbol{\Theta} \in \mathbb{R}^3\) 为躯干姿态（欧拉角或等效表示）。控制输入为所有接触足的地面反力：

$$
\mathbf{u} = \begin{bmatrix} \mathbf{f}_1 \\ \mathbf{f}_2 \\ \vdots \\ \mathbf{f}_{n_c} \end{bmatrix} \in \mathbb{R}^{3n_c}
$$

连续时间动力学方程为：

$$
\dot{\mathbf{x}} = \begin{bmatrix} \dot{\mathbf{r}} \\ \frac{1}{m}\sum_{i=1}^{n_c} \mathbf{f}_i + \mathbf{g} \\ \mathbf{I}^{-1}\left(\sum_{i=1}^{n_c} (\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i\right) \end{bmatrix}
$$

其中 \(\mathbf{I}\) 为躯干惯性张量（在质心动力学简化中通常取为常数近似），\(\mathbf{g} = [0, 0, -9.81]^T\)。

通过前向欧拉或零阶保持离散化，得到线性时变系统：

$$
\mathbf{x}_{k+1} = \mathbf{A}_k \mathbf{x}_k + \mathbf{B}_k \mathbf{u}_k + \mathbf{d}_k
$$

> ⚠️ **注意**：角动量方程中 \((\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i\) 包含状态与控制的交叉项，使得原始问题非线性。实际实现中常在当前状态点线性化，将交叉项展开为线性近似，从而转化为 QP 可解的形式。

**3. MPC 优化问题公式化**

在预测时域 \(N\) 内，MPC 求解如下二次规划问题：

$$
\min_{\mathbf{u}_{0:N-1}} \sum_{k=0}^{N-1} \left[ (\mathbf{x}_k - \mathbf{x}_k^{\text{ref}})^T \mathbf{Q} (\mathbf{x}_k - \mathbf{x}_k^{\text{ref}}) + \mathbf{u}_k^T \mathbf{R} \mathbf{u}_k \right] + (\mathbf{x}_N - \mathbf{x}_N^{\text{ref}})^T \mathbf{Q}_f (\mathbf{x}_N - \mathbf{x}_N^{\text{ref}})
$$

$$
\text{s.t.} \quad \mathbf{x}_{k+1} = \mathbf{A}_k \mathbf{x}_k + \mathbf{B}_k \mathbf{u}_k + \mathbf{d}_k
$$

$$
\mathbf{D} \mathbf{f}_i \leq \mathbf{0}, \quad f_{i,z} \geq f_{\min}, \quad \forall i \in \mathcal{C}_k
$$

$$
\mathbf{f}_i = \mathbf{0}, \quad \forall i \notin \mathcal{C}_k
$$

其中：
- \(\mathbf{Q}, \mathbf{R}, \mathbf{Q}_f\) 为权重矩阵，分别惩罚状态偏差、力大小和终端误差
- \(\mathbf{D}\) 为线性化摩擦锥矩阵（将圆锥近似为 4 面或 8 面多面体）
- \(\mathcal{C}_k\) 为第 \(k\) 步的接触足集合，由步态调度器决定
- \(f_{\min}\) 为最小法向力，防止接触力过小导致滑动

**4. 摩擦锥线性化**

库仑摩擦锥约束要求接触力位于摩擦锥内：

$$
\sqrt{f_{i,x}^2 + f_{i,y}^2} \leq \mu f_{i,z}
$$

这是一个二阶锥约束（SOCP），为保持 QP 可解性，将其线性化为多面体近似：

$$
\begin{bmatrix} 1 & 0 & -\mu \\ -1 & 0 & -\mu \\ 0 & 1 & -\mu \\ 0 & -1 & -\mu \end{bmatrix} \mathbf{f}_i \leq \mathbf{0}
$$

这是最简单的 4 面近似，实际中常用 8 面或 16 面以提高精度。

**5. 步态调度与接触时序**

步态调度器定义了每条腿在预测时域内的接触/摆动状态。以四足机器人为例：

| 步态 | LF | RF | LH | RH | 特点 |
|------|----|----|----|----|------|
| Trot | ■□ | □■ | □■ | ■□ | 对角足同步，最常用 |
| Pace | ■□ | □■ | ■□ | □■ | 同侧足同步 |
| Bound | ■□ | ■□ | □■ | □■ | 前后足同步 |
| Gallop | ■□□□ | □■□□ | □□■□ | □□□■ | 四足依次着地 |

（■=站立相, □=摆动相）

接触时序直接决定了 MPC 中哪些力变量被激活（站立相）或强制为零（摆动相），从而改变优化问题的结构。

**6. 与传统方法的区别**

| 特性 | LIPM | Centroidal MPC |
|------|------|----------------|
| 质心高度 | 恒定假设 | 可变 |
| 角动量 | 忽略（假设为零） | 完整建模 |
| 接触模式 | 单/双支撑 | 任意多接触 |
| 适用步态 | 准静态行走 | 动态步态（trot/gallop等） |
| 地形适应 | 仅平地 | 非平坦地形 |
| 计算方法 | 解析解/简单QP | 在线QP求解 |
| 典型求解频率 | — | 50-400 Hz |

> 💡 **关键优势**：Centroidal MPC 在计算复杂度（~10ms QP 求解）和模型精度之间取得了最佳平衡，既比 LIPM 更准确地捕捉动态效应，又比全身动力学 MPC 计算量小一个数量级，成为当前四足/人形机器人运动控制的主流框架。

**7. 实际实现中的关键技巧**

- **热启动 (Warm-starting)**：用上一次 MPC 求解结果平移初始化当前问题，显著加速 QP 收敛
- **自适应时域**：近端用短时间步（高精度），远端用长时间步（降低变量数）
- **参考轨迹生成**：通常由速度指令积分得到质心参考位置，姿态参考保持水平或跟踪地形法线
- **典型参数**：预测时域 0.5-1.0s，时间步 10-50ms，QP 变量数 ~200-500

#### 🧪 练习题
```yaml
question: "与线性倒立摆模型 (LIPM) 相比，Centroidal Dynamics MPC 的核心改进是什么？"
options:
  - "使用非线性优化器替代线性 QP 求解"
  - "保留完整的三维角动量建模，支持动态步态与多接触场景"
  - "直接优化全部关节力矩，无需全身控制器"
  - "引入深度强化学习替代传统优化方法"
answer: 1
explain: "Centroidal MPC 的核心贡献是将 LIPM 中被忽略的角动量纳入建模，使用完整的牛顿-欧拉方程描述质心动力学，从而支持 trot、gallop 等动态步态以及非共面多接触场景。它仍然使用 QP 求解（非选项A），仍需下层 WBC（非选项C），也不涉及强化学习（非选项D）。"
```

### PR-MPC

```yaml
id: pr_mpc
num: 5
name: PR-MPC
full_name: 策略正则化MPC (Policy-Regularized MPC)
year: '2017'
org: MIT
parent: centroidal_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/8206268
project_url: ''
category: mpc
motivation: 融合学习策略与MPC提升泛化性
```

#### 📝 一句话总结
PR-MPC 的核心目标是：融合学习策略与MPC提升泛化性。

#### 🎯 核心要点
- 核心动机：融合学习策略与MPC提升泛化性
- 演化来源：继承或改进自 centroidal_mpc
- 代表机构：MIT

#### 🔬 深入细节
融合学习策略与MPC提升泛化性


### Convex MPC

```yaml
id: convex_mpc
num: 6
name: Convex MPC
full_name: 凸模型预测控制 (Convex Model Predictive Control)
year: '2018'
org: MIT
parent: centroidal_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/8594448
project_url: ''
category: mpc
motivation: 简化单刚体模型实现实时足端力优化
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

### WB-MPC

```yaml
id: wb_mpc
num: 7
name: WB-MPC
full_name: 全身模型预测控制 (Whole-Body MPC)
year: '2022'
org: LAAS-CNRS
parent: convex_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/10000129
project_url: ''
category: mpc
motivation: 全身动力学MPC控制人形机器人
```

#### 📝 一句话总结
WB-MPC 的核心目标是：全身动力学MPC控制人形机器人。

#### 🎯 核心要点
- 核心动机：全身动力学MPC控制人形机器人
- 演化来源：继承或改进自 convex_mpc
- 代表机构：LAAS-CNRS

#### 🔬 深入细节
全身动力学MPC控制人形机器人


### Perceptive NMPC

```yaml
id: perceptive_nmpc
num: 8
name: Perceptive NMPC
full_name: 感知非线性MPC (Perceptive Nonlinear MPC)
year: '2023'
org: ETH Zurich
parent: convex_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/10138309
project_url: ''
category: mpc
motivation: 结合地形感知的非线性MPC
```

#### 📝 一句话总结
本文提出了一种三层感知运动控制框架：通过将地形高程图预处理为可踏性分类、凸多边形脚点约束和有符号距离场（SDF）碰撞约束，构建包含全关节自由度的非线性 MPC 问题，并采用多重打靶 + 实时迭代（RTI）策略高效求解，使四足机器人 ANYmal 能够以多种步态自主穿越台阶、间隙、踏石等复杂地形。

#### 🎯 核心要点
- **三层异步架构**：感知层（20 Hz）预计算地形表示 → NMPC（100 Hz）全身轨迹优化 → WBC（400 Hz）力矩跟踪执行
- **地形感知管线**：高程图 → 可踏性分类（法向量 + 粗糙度阈值）→ 连通域 + RANSAC 平面分割 → 内接凸多边形提取 → 3D 体素 SDF 计算
- **全自由度 NMPC**：状态包含 6-DOF 基座 + 12 关节角 + 速度 + 接触力（共 72 维），采用单刚体 + 质心动力学模型
- **凸多边形脚点约束**：将可踏区域的凸内近似编码为半空间不等式，直接约束 MPC 中的落脚点位置
- **SDF 碰撞避障**：在膝关节和摆动足处评估预计算的 SDF，通过 relaxed barrier 函数编码为软约束
- **Loopshaping 平滑策略**：将接触力和关节速度提升为状态变量，引入辅助输入（力/速度的导数）并施加二次代价，保证力和速度的时间连续性
- **数值求解**：多重打靶离散化 + SQP 实时迭代 + HPIPM QP 求解器 + 简化 filter line-search，单次求解约 3.5 ms
- **WBC 执行层**：单 QP 全身控制器 + CBF 关节限位 + 事件驱动接触反馈（提前/延迟触地处理）
- **实验验证**：ANYmal C/D 在仿真和实机上以 trot/pace/walk/gallop 多种步态穿越台阶、间隙、踏石、碎石和户外山径

#### 🔬 深入细节
##### 系统总览

![系统总览](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x1.jpg)
*图 1：系统总览。左：ANYmal 在踏石上行走；右：三层控制架构示意——感知层异步预处理地形信息，MPC 层进行全身轨迹优化，WBC 层执行力矩跟踪。*

本文的核心思想是：**将地形感知信息转化为优化友好的数学约束**，使得非线性 MPC 能够同时优化脚点选择、碰撞避障和欠驱动系统动力学，而无需手工设计启发式规则。

##### 1. 感知层：从高程图到优化约束

![感知管线](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x2.png)
*图 2：感知处理管线。高程图 → 可踏性分类 → 平面分割 → 凸多边形 → SDF。*

感知层以 20 Hz 异步运行，将原始高程图（4 cm 分辨率）逐步转化为 MPC 可直接使用的约束：

**Step 1 — 可踏性分类**：对每个高程图像素计算局部表面法向量和粗糙度，通过阈值判定是否可踏。法向量偏离重力方向过大或粗糙度过高的区域被标记为不可踏。

**Step 2 — 平面分割**：对可踏区域进行连通域分析，将相连的可踏像素聚类为候选区域。对每个连通域使用 RANSAC 拟合平面参数 \((n, d)\)，获得局部地形平面。

**Step 3 — 凸多边形提取**：对每个分割平面计算其内接凸多边形（inscribed convex polygon），表示为半空间交集：

$$\mathcal{P}_j = \{ p \in \mathbb{R}^3 \mid A_j p \leq b_j,\ n_j^\top p = d_j \}$$

其中 \(A_j, b_j\) 定义凸多边形边界，\(n_j, d_j\) 定义平面方程。这一凸内近似保证了约束的凸性，使 MPC 求解更加可靠。

**Step 4 — SDF 计算**：在机器人周围的 3D 体素网格上计算有符号距离场。利用高程图的 2.5D 特性，先沿 z 方向解析计算距离，再沿 x、y 方向执行 2D 距离变换（基于 Felzenszwalb & Huttenlocher 的线性时间算法），总复杂度为 \(O(N)\)。

> 💡 **关键设计**：凸内近似（而非凸外近似）确保优化器找到的脚点一定位于可踏区域内，牺牲少量可行域面积换取安全性保证。

##### 2. NMPC 公式化

![状态定义](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/figures/stateDefinition.jpg)
*图：全身状态定义。包含基座位姿、关节角度、广义速度和接触力。*

**状态空间**：与传统 convex MPC 仅优化基座状态不同，本文将全部关节角纳入优化：

$$x = \begin{bmatrix} \theta_{base} \\ q_{joints} \\ v_{base} \\ \dot{q}_{joints} \\ \lambda_1, \ldots, \lambda_k \end{bmatrix} \in \mathbb{R}^{72}$$

其中 \(\theta_{base} \in \mathbb{R}^6\) 为基座位姿（位置 + ZYX 欧拉角），\(q_{joints} \in \mathbb{R}^{12}\) 为关节角，\(\lambda_i \in \mathbb{R}^3\) 为各接触点力。

**动力学模型**：采用单刚体近似——忽略腿部惯量对质心动力学的影响，但保留完整的运动学：

$$\dot{p} = v, \quad M\dot{v} = \sum_i \lambda_i + Mg$$

$$\dot{L} = \sum_i (p_i - p_{com}) \times \lambda_i$$

其中 \(M\) 为总质量，\(L\) 为角动量，\(p_i\) 为足端位置（通过正运动学从关节角计算）。关节速度通过运动学约束与基座速度耦合。

**Loopshaping 平滑化**：为避免接触力和关节速度在时间上出现不连续跳变，将它们提升为状态变量，引入辅助输入 \(u_{aux}\) 作为其时间导数：

$$\dot{\lambda}_i = u_{\lambda,i}, \quad \ddot{q}_{joints} = u_q$$

对 \(u_{aux}\) 施加二次代价 \(\|u_{aux}\|_R^2\)，等价于对力和速度施加平滑性正则化。

##### 3. 约束体系

**脚点约束**：对每只脚在每个接触相位，从预计算的凸多边形集合中选择最近的可踏多边形，将其半空间约束施加于足端位置：

$$A_j \cdot p_{foot}(q) \leq b_j$$

这里 \(p_{foot}(q)\) 是通过正运动学从关节角计算的足端位置，因此约束是关于状态 \(x\) 的非线性函数。

**碰撞避障**：在膝关节和摆动足处放置碰撞球体，评估预计算的 SDF 值：

$$\text{SDF}(p_{collision}(q)) \geq d_{margin}$$

**摩擦锥**：在局部地形平面坐标系下施加平滑化摩擦锥约束：

$$\sqrt{f_t^2 + f_s^2 + \epsilon^2} \leq \mu f_n$$

其中 \(f_t, f_s\) 为切向力分量，\(f_n\) 为法向力，\(\mu\) 为摩擦系数，\(\epsilon\) 为平滑化参数。

**Relaxed Barrier 函数**：所有不等式约束通过 relaxed log-barrier 函数转化为代价项：

$$B_\mu(h) = \begin{cases} -\mu \ln(h) & \text{if } h > \delta \\ \frac{1}{2}\mu\left(\frac{h - 2\delta}{\delta}\right)^2 - \mu \ln(\delta) & \text{if } h \leq \delta \end{cases}$$

当约束 \(h > \delta\) 时为标准对数障碍，当 \(h \leq \delta\) 时切换为二次外罚。参数 \(\mu\) 控制障碍强度，\(\delta\) 控制切换点。这种设计允许优化器从不可行初始点启动，同时在可行域内提供强约束。

> ⚠️ **与 convex MPC 的关键区别**：convex MPC 仅优化基座轨迹和接触力，脚点位置由启发式规则（如 Raibert heuristic）预先确定。本文的 NMPC 将脚点选择纳入优化变量，通过凸多边形约束让优化器自主决定最优落脚位置。

##### 4. 参考轨迹与摆动腿规划

![摆动轨迹](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x8.png)
*图：五次样条摆动轨迹示意。*

**名义脚点**：基于当前速度指令和步态时序，计算名义落脚位置，然后将其投影到最近的分割平面上。

**摆动轨迹**：使用五次样条（quintic spline）连接抬脚点和落脚点，中间经过一个抬腿高度控制点。五次样条保证位置、速度、加速度的连续性，为 MPC 提供平滑的参考轨迹。

**终端代价**：通过在参考轨迹终点线性化系统并求解连续时间 Riccati 方程，获得 LQR 终端代价矩阵 \(P\)：

$$V_f(x) = \frac{1}{2} \|x - x_{ref}\|_P^2$$

这为有限时域 MPC 提供了无限时域近似，改善了闭环稳定性。

##### 5. 数值求解策略

```
算法：Perceptive NMPC 实时迭代求解

输入：当前状态 x₀，地形约束（凸多边形、SDF），步态时序
输出：最优控制序列 u*₀, ..., u*_{N-1}

1. 初始化：用上一时刻解做时间平移（warm-start）
2. 离散化：多重打靶，N 个射击区间，RK2 积分，零阶保持输入
3. 构建 NLP：
   min  Σᵢ ℓ(xᵢ, uᵢ) + Σᵢ B_μ(hᵢ(xᵢ)) + V_f(x_N)
   s.t. xᵢ₊₁ = F(xᵢ, uᵢ)           (射击约束)
        g(xᵢ, uᵢ) = 0               (接触互补、运动学)
4. SQP 迭代（仅 1 步 = 实时迭代）：
   a. 线性化动力学和约束 → QP 子问题
   b. 等式约束投影：消除部分变量，缩减 QP 规模
   c. HPIPM 求解 QP → 搜索方向 Δx, Δu
   d. Filter line-search 确定步长 α：
      - 分支 1：满足 Armijo + filter 条件 → 接受
      - 分支 2：不满足但改善约束违反 → 接受
      - 分支 3：都不满足 → 缩小步长重试
5. 更新解：x ← x + αΔx, u ← u + αΔu
6. 输出 u*₀ 和 Riccati 反馈增益 K₀
```

**关键实现细节**：

- **多重打靶 vs iLQR**：实验表明多重打靶（MS）在处理不等式约束时显著优于 iLQR。iLQR 在踏石场景中高速运动时频繁发散，而 MS 始终稳定收敛。根本原因是 iLQR 的单打靶结构在约束激活时缺乏足够的数值稳定性。
- **并行化**：各射击区间的动力学积分和线性化可并行执行，充分利用多核 CPU。
- **求解时间**：在 ANYmal 的机载 Intel i7 处理器上，单次 MPC 求解约 3.5 ms，远低于 10 ms 的控制周期。

##### 6. 全身控制器（WBC）

WBC 以 400 Hz 运行，将 MPC 输出的状态-力矩轨迹转化为关节力矩指令：

$$\min_{\tau, \lambda, \ddot{q}} \| \text{tracking errors} \|^2 \quad \text{s.t.} \quad M\ddot{q} + h = S^\top \tau + J^\top \lambda$$

采用**单 QP**（非分层）求解，同时跟踪 MPC 的加速度、力和摆动轨迹参考。关节限位通过**控制障碍函数（CBF）**编码，保证关节角始终在安全范围内。

**事件驱动接触反馈**：当检测到提前触地（摆动相中足端接触）时，立即将该腿切换为支撑相；当检测到延迟触地（预期接触时刻未检测到接触）时，延长摆动相并降低足端高度。这种反应式机制弥补了感知误差和模型不确定性。

##### 7. 实验结果

![障碍课程](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x13.png)
*图：仿真障碍课程。ANYmal 以 0.8 m/s 的 trot 步态穿越斜坡、间隙、踏石和碎石地形。*

![硬件实验](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x16.jpg)
*图：硬件实验。ANYmal 穿越斜坡、间隙和大台阶。底部显示高程图、MPC 足端轨迹和凸多边形脚点约束。*

**仿真验证**：
- 踏石场景：以 trot（0.5 m/s）、pace（0.4 m/s）、walk（0.25 m/s）成功穿越，MS 求解器在所有速度下稳定，iLQR 在 0.3 m/s 以上发散
- 台阶场景：以 trot/pace/walk/static walk 四种步态上下 18.5 cm 高台阶，自动决定跨步/重复/跳步
- 障碍课程：连续穿越斜坡、间隙、踏石、碎石，trot 0.8 m/s 完成全程
- 对比 RL：RL 控制器在踏石和窄通道上失败，因其策略本质上是反应式的，缺乏长时域规划能力

**硬件验证（ANYmal C/D）**：
- 斜坡 + 间隙 + 大台阶组合障碍
- 20×20 cm 不规则踏石（每级高 20 cm）
- 户外森林山径徒步
- 动态步态（gallop、带飞行相的 trot）在平地上验证

> 💡 **核心发现**：所有运动行为均从优化中自动涌现，无需针对特定地形或步态的手工参数调整。同一套参数适用于所有测试场景。

#### 🧪 练习题
```yaml
question: "本文将可踏地形区域编码为凸多边形约束时，为什么选择凸内近似（inscribed polygon）而非凸外近似（circumscribed polygon）？"
options:
  - "凸内近似的计算速度更快"
  - "凸内近似保证优化器找到的脚点一定位于实际可踏区域内，确保安全性"
  - "凸外近似无法用半空间不等式表示"
  - "凸内近似能覆盖更大的可踏面积"
answer: 1
explain: "凸内近似（inscribed polygon）是可踏区域的子集，因此满足凸多边形约束的任何脚点必然位于可踏区域内。凸外近似虽然覆盖面积更大，但可能包含不可踏的区域，导致优化器选择危险的落脚点。"
```

### PPO

```yaml
id: ppo
num: 9
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: '2017'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/1707.06347
project_url: ''
category: rl_locomotion
motivation: 策略梯度优化基准算法
```

#### 📝 一句话总结
PPO 的核心目标是：策略梯度优化基准算法。

#### 🎯 核心要点
- 核心动机：策略梯度优化基准算法
- 代表机构：OpenAI

#### 🔬 深入细节
策略梯度优化基准算法


### Teacher-Student RL

```yaml
id: teacher_student
num: 10
name: Teacher-Student RL
full_name: 特权学习框架 (Privileged Learning Framework)
year: '2020'
org: ETH Zurich
parent: ppo
paper_url: https://www.science.org/doi/10.1126/scirobotics.abc5986
project_url: ''
category: rl_locomotion
motivation: 特权信息蒸馏实现零射Sim-to-Real迁移
```

#### 📝 一句话总结
Teacher-Student RL 的核心目标是：特权信息蒸馏实现零射Sim-to-Real迁移。

#### 🎯 核心要点
- 核心动机：特权信息蒸馏实现零射Sim-to-Real迁移
- 演化来源：继承或改进自 ppo
- 代表机构：ETH Zurich

#### 🔬 深入细节
特权信息蒸馏实现零射Sim-to-Real迁移


### AMP

```yaml
id: amp
num: 11
name: AMP
full_name: 对抗运动先验 (Adversarial Motion Priors)
year: '2021'
org: UC Berkeley
parent: ppo
paper_url: https://arxiv.org/abs/2104.02180
project_url: ''
category: rl_locomotion
motivation: 对抗学习模仿自然动作风格
```

#### 📝 一句话总结
AMP 的核心目标是：对抗学习模仿自然动作风格。

#### 🎯 核心要点
- 核心动机：对抗学习模仿自然动作风格
- 演化来源：继承或改进自 ppo
- 代表机构：UC Berkeley

#### 🔬 深入细节
对抗学习模仿自然动作风格


### Legged Gym

```yaml
id: legged_gym
num: 12
name: Legged Gym
full_name: 四足训练框架 (Legged Gym Framework)
year: '2021'
org: ETH Zurich
parent: ppo
paper_url: https://github.com/leggedrobotics/legged_gym
project_url: ''
category: rl_locomotion
motivation: GPU并行RL训练四足行走开源框架
```

#### 📝 一句话总结
Legged Gym 的核心目标是：GPU并行RL训练四足行走开源框架。

#### 🎯 核心要点
- 核心动机：GPU并行RL训练四足行走开源框架
- 演化来源：继承或改进自 ppo
- 代表机构：ETH Zurich

#### 🔬 深入细节
GPU并行RL训练四足行走开源框架


### Perceptive Locomotion

```yaml
id: perceptive_loco
num: 13
name: Perceptive Locomotion
full_name: 感知运动控制 (Perceptive Locomotion)
year: '2022'
org: ETH Zurich
parent: teacher_student
paper_url: https://arxiv.org/abs/2206.08392
project_url: ''
category: rl_locomotion
motivation: 引入视觉感知的地形自适应控制
```

#### 📝 一句话总结
Perceptive Locomotion 的核心目标是：引入视觉感知的地形自适应控制。

#### 🎯 核心要点
- 核心动机：引入视觉感知的地形自适应控制
- 演化来源：继承或改进自 teacher_student
- 代表机构：ETH Zurich

#### 🔬 深入细节
引入视觉感知的地形自适应控制


### ANYmal Parkour

```yaml
id: anymal_parkour
num: 14
name: ANYmal Parkour
full_name: ANYmal极限运动 (ANYmal Parkour Learning)
year: '2024'
org: ETH Zurich
parent: perceptive_loco
paper_url: https://www.science.org/doi/abs/10.1126/scirobotics.adi7566
project_url: ''
category: rl_locomotion
motivation: 四足机器人实现跳跃攀爬极限动作
```

#### 📝 一句话总结
ANYmal Parkour 提出了感知-运动-导航三层分层架构，通过多分辨率 3D 卷积感知模块、5 种专用运动技能策略和混合动作空间导航策略的端到端联合训练，使四足机器人 ANYmal 能够在真实世界中以最高 2 m/s 的速度完成跳跃 1m 间隙、攀爬 0.9m 高台、匍匐穿越低矮障碍等跑酷动作。

#### 🎯 核心要点
- **三层分层架构**：感知模块（exteroception）处理深度点云、运动模块（locomotion）包含 5 种技能策略、导航模块（navigation）进行高层决策
- **双分辨率 3D 卷积感知**：粗分辨率（0.1m 体素，2.4×2.4×1.6m 范围）带自回归时序反馈 + 细分辨率（0.05m 体素，1.2×1.2×0.8m 范围），点云→体素网格→编解码器
- **5 种运动技能**：行走（walk）、跳跃（jump）、攀爬（climb-up）、下降（climb-down）、匍匐（crouch），各自独立训练
- **Position-based 任务表述**：运动策略统一接收目标位置（而非速度命令），不同技能以各自方式到达目标
- **混合动作空间导航**：Gaussian 分布输出连续目标位置 + Categorical 分布选择离散技能，支持时间依赖命令序列
- **Teacher-Student 蒸馏**：运动策略先用特权地形信息训练 Teacher，再蒸馏到仅用本体感知 + 感知潜变量的 Student
- **稀疏导航奖励**：仅在命令序列最后一步计算距离目标的惩罚，避免密集奖励塑形偏差
- **课程学习**：地形难度随训练进度递增，每种技能 80% 专用地形 + 20% 随机粗糙地形

#### 🔬 深入细节
##### 系统架构总览

![ANYmal Parkour 系统架构](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x2.png)
*图：ANYmal Parkour 三层分层架构示意图。底层感知模块将深度点云编码为潜在表示；中层运动模块包含 5 种专用技能策略；顶层导航模块选择技能并输出运动命令。三个模块在仿真中端到端联合训练。*

![ANYmal Parkour 真实跑酷场景](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x1.png)
*图：ANYmal 机器人在真实跑酷赛道上展示多种敏捷运动技能，包括跳跃间隙、攀爬高台和匍匐穿越。*

##### 1. 动机与背景

四足机器人在非结构化环境中的敏捷运动是一个长期挑战。此前的工作主要存在两类局限：

1. **端到端方法**（如直接从图像到关节命令）将感知到控制映射为单一策略，但难以在同一策略中兼顾跳跃、攀爬、匍匐等截然不同的运动模式，且对感知噪声敏感；
2. **基于 Elevation Map 的模块化方法**使用 2.5D 高度图作为中间表示，但在复杂 3D 环境中（如悬空障碍物、需要匍匐的低矮通道）会丢失关键的高度信息。

ANYmal Parkour 的核心洞察是：**将问题分解为感知、运动技能和导航三个层次，每层专注于各自的子问题，通过明确定义的接口耦合**。这既保留了端到端学习的优势（所有模块可联合优化），又通过分层大幅降低了单一策略需要处理的复杂度。

##### 2. 感知模块（Exteroceptive Module）

感知模块负责将机载深度相机的原始点云转换为紧凑的潜在表示，分别供运动和导航模块使用。

**点云预处理**：深度相机获取的点云首先从相机坐标系转换到机器人基座坐标系（仅保留偏航对齐，消除俯仰和横滚的影响），然后体素化为 3D 二值占据网格。系统维护两个不同分辨率的体素网格：

- **粗分辨率网格**：体素大小 0.1m，覆盖范围 2.4×2.4×1.6m（24×24×16 体素），用于远距离地形感知和导航决策
- **细分辨率网格**：体素大小 0.05m，覆盖范围 1.2×1.2×0.8m（24×24×16 体素），用于近距离精细地形感知和运动控制

**3D 卷积编解码器**：每个分辨率对应一个独立的 3D 卷积编解码器网络。编码器通过多层 3D 卷积和下采样将体素网格压缩为低维潜在向量；解码器将潜在向量重建为体素网格，通过二值交叉熵重建损失进行训练：

$$\mathcal{L}_{recon} = -\sum_{i} \left[ v_i \log(\hat{v}_i) + (1 - v_i) \log(1 - \hat{v}_i) \right]$$

其中 \(v_i\) 为真实体素占据值，\(\hat{v}_i\) 为重建值。

> 💡 关键：粗分辨率编码器采用**自回归反馈机制**——将上一时间步的潜在向量拼接到当前输入中。这使得网络能够隐式地积累时间信息，弥补单帧深度图的有限视野（例如机器人转头后仍能"记住"之前看到的障碍物位置）。细分辨率编码器不使用自回归，因为近距离感知更依赖当前帧的精确信息。

> ⚠️ 注意：系统使用**密集 3D 卷积**（而非稀疏卷积），虽然训练时需要约 45GB GPU 显存，但避免了稀疏卷积在体素化点云上可能出现的梯度传播不稳定问题。推理时由于只需前向传播，计算开销可接受。

##### 3. 运动模块（Locomotion Module）

运动模块包含 5 种专用技能策略，每种策略是一个独立的 MLP 神经网络，输出 12 维关节目标位置（ANYmal 有 4 条腿，每条 3 个关节）。

| 技能 | 功能描述 | 专用地形类型 | 关键能力 |
|------|---------|-------------|---------|
| Walk | 平坦/粗糙地面行走 | 随机粗糙地形 | 稳定步态，速度跟踪 |
| Jump | 跨越间隙/沟壑 | 间隙地形（最大 1m） | 起跳时机，飞行姿态 |
| Climb-up | 攀爬高台/阶梯 | 阶梯上升（最高 0.9m） | 前肢攀附，后肢推蹬 |
| Climb-down | 从高台安全跳下 | 阶梯下降 | 着陆缓冲，姿态恢复 |
| Crouch | 低姿匍匐穿越 | 低矮障碍物 | 降低重心，HFE 偏转 160° |

**Position-based 任务表述**：所有技能策略接收统一的输入——目标位置相对于机器人的 2D 坐标 \(\mathbf{p}_{target} = (x_{rel}, y_{rel})\)，而非传统的速度命令 \((v_x, v_y, \omega_z)\)。这一设计的核心优势在于：

- **统一接口**：导航模块可以用相同的命令格式控制所有技能，无需为每种技能设计不同的命令空间
- **隐式行为差异**：不同技能对"到达目标位置"的理解不同——walk 策略会平稳行走过去，jump 策略会在间隙边缘起跳飞越，climb-up 策略会攀爬过去
- **简化导航**：导航模块只需决定"去哪里"和"用什么技能"，无需精确规划速度曲线

**Teacher-Student 两阶段训练**：

```python
# 运动策略训练伪代码
# ===== Phase 1: Teacher Training (with privileged info) =====
for iteration in range(num_iterations):
    # Teacher 可访问完整地形高度图、接触力等特权信息
    obs_teacher = concat([
        proprioception,        # 关节角度、角速度、IMU 数据
        privileged_heightmap,  # 机器人周围精确高度图
        contact_forces,        # 足端接触力
        target_position        # 目标位置 (x_rel, y_rel)
    ])
    action = teacher_policy(obs_teacher)  # 输出 12 维关节目标位置
    # PPO 更新，奖励包含位置跟踪 + 动作平滑 + 接触惩罚
    reward = r_tracking + r_smoothness + r_contact
    PPO_update(teacher_policy, value_fn, reward)

# ===== Phase 2: Student Distillation =====
for iteration in range(num_iterations):
    # Student 仅使用本体感知 + 感知模块潜在向量
    obs_student = concat([
        proprioception,        # 关节角度、角速度、IMU
        perception_latent,     # 感知模块输出的潜在向量
        target_position        # 目标位置
    ])
    action_teacher = teacher_policy(obs_teacher).detach()
    action_student = student_policy(obs_student)
    # 行为克隆损失
    loss = MSE(action_student, action_teacher)
    update(student_policy, perception_encoder, loss)
```

> 💡 关键：Student 蒸馏阶段会**同时更新感知编码器**的参数，这意味着感知模块的表示是由运动任务的需求驱动学习的，而非独立预训练。这种端到端的梯度流确保感知表示包含运动控制所需的关键信息。

每种技能的训练环境由 **80% 专用地形 + 20% 随机粗糙地形**组成。20% 的随机地形确保策略在非专用场景下也具备基本的鲁棒性（例如 jump 策略在平地上也能正常行走）。

##### 4. 导航模块（Navigation Module）

导航模块是系统的"大脑"，负责在高层决定使用哪种技能以及给出什么运动命令。它以 5Hz 频率运行（每 0.2s 决策一次），而运动策略以 50Hz 运行。

**混合动作空间 PPO**：导航策略的动作空间同时包含连续和离散部分，使用混合概率分布建模：

$$\pi_{nav}(\mathbf{a}|s) = \underbrace{\mathcal{N}(\mu_{\mathbf{v}}, \sigma_{\mathbf{v}})}_{\text{连续：目标位置}} \cdot \underbrace{\text{Cat}(\mathbf{p}_k)}_{\text{离散：技能选择}}$$

其中 \(\mu_{\mathbf{v}}, \sigma_{\mathbf{v}}\) 参数化连续目标位置的 Gaussian 分布，\(\mathbf{p}_k\) 为 5 种技能的选择概率。两部分共享同一个策略网络的主干，仅在输出层分叉。

**时间依赖命令序列**：导航策略不仅输出当前时刻的命令，而是输出未来 \(N=10\) 个时间步（每步 0.2s，共 2s）的完整命令序列：

$$\mathbf{a}_{nav} = \left\{(\mathbf{p}_{target}^{(t)}, k^{(t)})\right\}_{t=1}^{N}$$

这使得导航策略可以规划短期轨迹，例如"先用 walk 接近间隙边缘 → 切换到 jump 跳过去 → 落地后切回 walk"。运动模块按时间顺序依次执行这些命令。

**稀疏奖励设计**：

$$r_{nav} = -\left\|\mathbf{p}_{robot}^{(N)} - \mathbf{p}_{goal}\right\|_2$$

仅在命令序列执行完毕（第 \(N\) 步）计算机器人当前位置与全局目标点的欧氏距离作为惩罚。这种极度稀疏的奖励设计有两个重要优势：

1. **避免奖励塑形偏差**：密集奖励（如每步给予接近目标的奖励）可能导致策略学到贪心的局部最优行为，而非全局最优的技能切换策略
2. **鼓励长期规划**：策略必须学会在 2s 的时间窗口内做出合理的技能序列规划

**课程学习**：训练采用地形难度课程，随策略性能提升逐步增加挑战：
- 初期：小间隙（0.2m）、低台阶（0.2m）
- 中期：中等间隙（0.5m）、中等台阶（0.5m）
- 后期：大间隙（1.0m）、高台阶（0.9m）

##### 5. 联合训练与系统集成

整个系统包含 **8 个神经网络**在 Isaac Gym 仿真器中端到端联合训练：

| 网络 | 数量 | 功能 |
|------|------|------|
| 运动技能策略（Student） | 5 | 各技能的关节控制 |
| 导航策略 | 1 | 技能选择 + 命令生成 |
| 导航 Value 网络 | 1 | 导航奖励的价值估计 |
| 感知编解码器 | 2（粗+细） | 点云→潜在表示 |

训练流程在数千个并行仿真环境中同时进行：每个机器人被随机分配到不同难度的地形上，感知模块处理模拟的深度点云，导航模块选择技能和命令，运动模块执行低层控制，所有网络通过各自的损失函数同步更新。

##### 6. 与传统方法的对比

| 特性 | 端到端方法 | Elevation Map 方法 | ANYmal Parkour |
|------|-----------|-------------------|----------------|
| 感知表示 | 原始图像/点云 | 2.5D 高度图 | 3D 体素潜在编码 |
| 运动多样性 | 单一策略覆盖所有行为 | 单一策略 | 5 种专用技能策略 |
| 3D 障碍处理 | 有限 | 信息丢失（无法表示悬空物） | 完整 3D 体素感知 |
| 技能切换 | 隐式（策略内部） | 无 | 显式（导航模块选择） |
| Sim-to-Real | 较难（感知差异大） | 较易（高度图鲁棒） | 中等（Teacher-Student 蒸馏） |
| 训练复杂度 | 低（单网络） | 中 | 高（8 个网络联合训练） |
| 可扩展性 | 高 | 中 | 待验证（新增技能需重训） |

> ⚠️ 注意：该方法的主要局限在于 **8 个网络的联合训练复杂度高**，新增技能需要重新训练整个系统。作者在讨论中指出，如何实现技能的模块化扩展是未来的重要研究方向。

![ANYmal Parkour 实验结果](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x3.png)
*图：不同技能在各类地形上的表现。系统能够自主选择合适的技能应对不同障碍，实现流畅的技能切换。*

#### 🧪 练习题
```yaml
question: "ANYmal Parkour 中感知模块的粗分辨率编码器采用了什么特殊机制来弥补单帧深度图的视野限制？"
options:
  - "使用 Transformer 的注意力机制聚合多帧信息"
  - "将上一时间步的潜在向量反馈到当前输入（自回归反馈）"
  - "使用光流估计相邻帧之间的运动并融合"
  - "维护一个全局 TSDF 地图并持续更新"
answer: 1
explain: "粗分辨率编码器采用自回归反馈机制，将上一时间步的潜在向量拼接到当前输入中，使网络能隐式积累时间信息，记住之前观察到但当前帧不可见的环境特征。"
```

### DreamWaQ++

```yaml
id: dreamwaq
num: 15
name: DreamWaQ++
full_name: 梦境行走增强版 (Dream Walking for Quadrupeds++)
year: '2024'
org: KAIST
parent: perceptive_loco
paper_url: https://arxiv.org/abs/2409.19709
project_url: ''
category: rl_locomotion
motivation: 本体+视觉融合极限地形穿越
```

#### 📝 一句话总结
DreamWaQ++ 的核心目标是：本体+视觉融合极限地形穿越。

#### 🎯 核心要点
- 核心动机：本体+视觉融合极限地形穿越
- 演化来源：继承或改进自 perceptive_loco
- 代表机构：KAIST

#### 🔬 深入细节
本体+视觉融合极限地形穿越


### ExBody

```yaml
id: exbody
num: 16
name: ExBody
full_name: 表现力全身控制 (Expressive Whole-Body Control)
year: '2024'
org: CMU
parent: teacher_student
paper_url: https://arxiv.org/abs/2402.16759
project_url: ''
category: rl_locomotion
motivation: 人形机器人表现力全身控制
```

#### 📝 一句话总结
ExBody 的核心目标是：人形机器人表现力全身控制。

#### 🎯 核心要点
- 核心动机：人形机器人表现力全身控制
- 演化来源：继承或改进自 teacher_student
- 代表机构：CMU

#### 🔬 深入细节
人形机器人表现力全身控制


### HQP-WBC

```yaml
id: hqp_wbc
num: 17
name: HQP-WBC
full_name: 层次QP全身控制 (Hierarchical QP Whole-Body Control)
year: '2016'
org: IIT
parent: —
paper_url: https://www.worldscientific.com/doi/abs/10.1142/S0219843615500346
project_url: ''
category: wbc
motivation: 任务优先级层次化QP求解
```

#### 📝 一句话总结
HQP-WBC 的核心目标是：任务优先级层次化QP求解。

#### 🎯 核心要点
- 核心动机：任务优先级层次化QP求解
- 代表机构：IIT

#### 🔬 深入细节
任务优先级层次化QP求解


### IHWBC

```yaml
id: ihwbc
num: 18
name: IHWBC
full_name: 隐式层次全身控制 (Implicit Hierarchical WBC)
year: '2019'
org: MIT
parent: hqp_wbc
paper_url: https://arxiv.org/abs/1909.06586
project_url: ''
category: wbc
motivation: MPC+WBC联合优化提升动态性能
```

#### 📝 一句话总结
IHWBC 的核心目标是：MPC+WBC联合优化提升动态性能。

#### 🎯 核心要点
- 核心动机：MPC+WBC联合优化提升动态性能
- 演化来源：继承或改进自 hqp_wbc
- 代表机构：MIT

#### 🔬 深入细节
MPC+WBC联合优化提升动态性能


### HWC-Loco

```yaml
id: hwc_loco
num: 19
name: HWC-Loco
full_name: 层次全身控制行走 (Hierarchical Whole-Body Control)
year: '2025'
org: TUM
parent: ihwbc
paper_url: https://www.researchgate.net/publication/389012345
project_url: ''
category: wbc
motivation: 鲁棒人形行走控制
```

#### 📝 一句话总结
HWC-Loco 的核心目标是：鲁棒人形行走控制。

#### 🎯 核心要点
- 核心动机：鲁棒人形行走控制
- 演化来源：继承或改进自 ihwbc
- 代表机构：TUM

#### 🔬 深入细节
鲁棒人形行走控制


### Domain Randomization

```yaml
id: domain_rand
num: 20
name: Domain Randomization
full_name: 域随机化 (Domain Randomization)
year: '2018'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1804.10332
project_url: ''
category: sim2real
motivation: 随机化物理参数弥合仿真差异
```

#### 📝 一句话总结
Domain Randomization 的核心目标是：随机化物理参数弥合仿真差异。

#### 🎯 核心要点
- 核心动机：随机化物理参数弥合仿真差异
- 代表机构：Google Brain

#### 🔬 深入细节
随机化物理参数弥合仿真差异


### Isaac Gym

```yaml
id: isaac_gym
num: 21
name: Isaac Gym
full_name: NVIDIA物理仿真 (Isaac Gym Physics Simulation)
year: '2021'
org: NVIDIA
parent: domain_rand
paper_url: https://arxiv.org/abs/2108.10470
project_url: ''
category: sim2real
motivation: 端到端GPU物理仿真训练平台
```

#### 📝 一句话总结
Isaac Gym 的核心目标是：端到端GPU物理仿真训练平台。

#### 🎯 核心要点
- 核心动机：端到端GPU物理仿真训练平台
- 演化来源：继承或改进自 domain_rand
- 代表机构：NVIDIA

#### 🔬 深入细节
端到端GPU物理仿真训练平台


### RMA

```yaml
id: rma
num: 22
name: RMA
full_name: 快速运动自适应 (Rapid Motor Adaptation)
year: '2021'
org: UC Berkeley
parent: domain_rand
paper_url: https://www.science.org/doi/10.1126/scirobotics.abk2822
project_url: ''
category: sim2real
motivation: 在线自适应网络实时调整策略
```

#### 📝 一句话总结
RMA 的核心目标是：在线自适应网络实时调整策略。

#### 🎯 核心要点
- 核心动机：在线自适应网络实时调整策略
- 演化来源：继承或改进自 domain_rand
- 代表机构：UC Berkeley

#### 🔬 深入细节
在线自适应网络实时调整策略


### Isaac Lab

```yaml
id: isaac_lab
num: 23
name: Isaac Lab
full_name: NVIDIA机器人学习平台 (Isaac Lab)
year: '2024'
org: NVIDIA
parent: isaac_gym
paper_url: https://arxiv.org/abs/2407.02229
project_url: ''
category: sim2real
motivation: Omniverse多模态机器人学习平台
```

#### 📝 一句话总结
Isaac Lab 的核心目标是：Omniverse多模态机器人学习平台。

#### 🎯 核心要点
- 核心动机：Omniverse多模态机器人学习平台
- 演化来源：继承或改进自 isaac_gym
- 代表机构：NVIDIA

#### 🔬 深入细节
Omniverse多模态机器人学习平台


### ASAP

```yaml
id: asap
num: 24
name: ASAP
full_name: 残差动作学习 (ASAP Delta Action Learning)
year: '2025'
org: Stanford
parent: rma
paper_url: https://arxiv.org/abs/2504.12609
project_url: ''
category: sim2real
motivation: 残差动作补偿弥合仿真差距
```

#### 📝 一句话总结
ASAP 的核心目标是：残差动作补偿弥合仿真差距。

#### 🎯 核心要点
- 核心动机：残差动作补偿弥合仿真差距
- 演化来源：继承或改进自 rma
- 代表机构：Stanford

#### 🔬 深入细节
残差动作补偿弥合仿真差距


### RT-2

```yaml
id: rt2
num: 25
name: RT-2
full_name: 机器人Transformer 2 (Robotics Transformer 2)
year: '2023'
org: Google DeepMind
parent: —
paper_url: https://arxiv.org/abs/2307.15818
project_url: ''
category: foundation_model
motivation: 首个VLA模型实现Web知识迁移
```

#### 📝 一句话总结
RT-2 提出了 Vision-Language-Action (VLA) 模型范式，将预训练的大规模视觉-语言模型（PaLI-X、PaLM-E）通过**动作 token 化 + 协同微调**直接转化为机器人策略，使机器人继承 web 规模预训练的语义理解与推理能力，在未见物体、场景和指令上实现约 **2× 的泛化性能提升**。

#### 🎯 核心要点
- **VLA 范式**：首次将 VLM 端到端微调为可直接输出机器人动作的策略模型，无需额外任务特定头
- **动作 token 化**：将 8 维连续动作（6-DoF 末端执行器位移 + 夹爪开合 + 终止标志）离散化为 256 个 bin，表示为整数字符串 token
- **两种 VLM 骨干**：基于 PaLI-X（5B/55B 参数）和 PaLM-E（12B 参数）分别构建 RT-2-PaLI-X 和 RT-2-PaLM-E
- **协同微调（Co-fine-tuning）**：同时使用原始 web VQA 数据和机器人演示数据进行微调，防止灾难性遗忘
- **输出约束解码**：推理时限制 token 采样空间仅包含合法动作 token，确保输出始终为有效机器人动作
- **涌现能力**：继承 VLM 的符号理解、语义推理、多语言理解和人物识别能力，在涌现任务上达到基线 3× 以上的成功率
- **链式思维（Chain-of-Thought）**：通过数据增强让模型先输出自然语言计划再输出动作，展示了规划与控制的统一
- **大规模评估**：在真实机器人上进行超过 6000 次评估试验，覆盖已见任务、未见任务和涌现能力三大类别

#### 🔬 深入细节
##### 核心架构示意图

![RT-2 整体架构](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x1.png)
*图 1：RT-2 将视觉-语言模型（VLM）转化为视觉-语言-动作模型（VLA）。模型接收机器人摄像头图像和自然语言指令，直接输出以文本 token 表示的机器人动作。*

![RT-2 动作 token 化与训练流程](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x2.png)
*图 2：动作 token 化方案。连续动作被离散化为 256 个 bin 并表示为整数字符串，与自然语言 token 共享同一词表空间。*

##### 算法伪代码

```python
# RT-2 训练与推理伪代码

# === 动作 token 化 ===
def tokenize_action(action_vector):
    """将 8 维连续动作转为文本 token 序列"""
    # action_vector: [Δx, Δy, Δz, Δroll, Δpitch, Δyaw, gripper, terminate]
    tokens = []
    for dim in action_vector:
        # 将连续值均匀离散化到 [0, 255]
        bin_idx = int((dim - min_val) / (max_val - min_val) * 255)
        bin_idx = clip(bin_idx, 0, 255)
        tokens.append(str(bin_idx))  # 转为整数字符串
    return " ".join(tokens)  # e.g., "128 64 200 132 100 98 255 1"

# === 协同微调 ===
def co_fine_tune(vlm, web_data, robot_data):
    """在 web VQA 数据和机器人数据上联合微调"""
    for batch in interleave(web_data, robot_data):
        if batch.source == "web":
            # 标准 VQA: image + question → answer
            loss = cross_entropy(vlm(batch.image, batch.question), batch.answer)
        else:
            # 机器人: image + instruction → action tokens
            action_str = tokenize_action(batch.action)
            loss = cross_entropy(vlm(batch.image, batch.instruction), action_str)
        optimizer.step(loss)

# === 受限解码推理 ===
def inference(vlm, image, instruction):
    """推理时限制输出为合法动作 token"""
    valid_tokens = set(range(0, 256))  # 仅允许 0-255 的整数 token
    output_tokens = []
    for step in range(8):  # 8 个动作维度
        logits = vlm.next_token_logits(image, instruction, output_tokens)
        # 将非法 token 的 logits 设为 -inf
        for t in range(vocab_size):
            if t not in valid_tokens:
                logits[t] = -float('inf')
        next_token = argmax(logits)
        output_tokens.append(next_token)
    return detokenize_action(output_tokens)
```

##### 方法详解

**动机与背景：为什么需要 VLA？**

传统机器人学习方法面临严重的数据瓶颈：机器人演示数据的采集成本极高（RT-1 数据集由 13 台机器人耗时 17 个月收集），且覆盖的物体、场景和指令极为有限。与此同时，视觉-语言模型（VLM）已在 web 规模数据上学到了丰富的语义知识——它们理解数千种物体、场景关系和抽象概念。RT-2 的核心洞察是：**如果能让 VLM 直接输出机器人动作，就能将这些 web 知识零成本迁移到机器人控制中**。此前的工作（如 SayCan、PaLM-E）仅将 LLM/VLM 用作高层规划器，仍需独立的低层策略；RT-2 则首次实现了感知、理解、推理与控制的端到端统一。

**核心机制：动作 token 化与 VLM 复用**

RT-2 的关键技术创新在于将机器人动作表示为自然语言 token，从而复用 VLM 的整个架构和训练流程。具体而言，每个时间步的动作是一个 8 维向量：

$$\mathbf{a} = [\Delta x, \Delta y, \Delta z, \Delta \text{roll}, \Delta \text{pitch}, \Delta \text{yaw}, \text{gripper}, \text{terminate}]$$

其中前 6 维为末端执行器的位移增量，第 7 维为夹爪开合状态，第 8 维为终止标志。每个连续维度被均匀离散化为 256 个 bin（即 \(b_i = \lfloor (a_i - a_{\min}) / (a_{\max} - a_{\min}) \times 255 \rfloor\)），然后将 bin 索引转为整数字符串。例如，一个动作可能被表示为 `"128 64 200 132 100 98 255 1"`。

对于 **PaLI-X** 骨干，这些整数字符串可以直接作为 token 使用，因为 PaLI-X 的词表本身包含数字 token。对于 **PaLM-E** 骨干，由于其词表中数字 token 的语义已被占用，RT-2 采用了一种巧妙的方案：**覆写词表中使用频率最低的 256 个 token**，将它们重新映射为动作 bin 索引。这样做既不影响模型在常见文本上的表现，又能无缝引入动作表示。

> 💡 **关键洞察**：动作 token 化的本质是将控制问题转化为"受限文本生成"问题。VLM 不需要任何架构修改——它只是在"回答一个特殊格式的问题"。

**协同微调策略**

简单地用机器人数据微调 VLM 会导致灾难性遗忘——模型会丢失预训练阶段学到的语义知识。RT-2 采用**协同微调（co-fine-tuning）**策略：在微调阶段同时混合原始 web 数据（VQA、图像描述等）和机器人轨迹数据。消融实验证实，co-fine-tuning 在泛化性能上显著优于纯机器人数据微调（fine-tuning only），而纯微调又远优于从头训练（training from scratch）。这表明 web 数据在微调阶段的持续参与对于保持语义泛化能力至关重要。

**推理与部署**

推理时，模型接收当前摄像头图像和自然语言指令，自回归地生成 8 个动作 token。为确保输出始终为合法动作，RT-2 在解码时施加**输出约束**：将所有非动作 token 的 logits 设为负无穷，使采样仅在有效动作空间内进行。55B 参数的 RT-2-PaLI-X 通过多 TPU 云服务实现 1-3 Hz 的推理频率；5B 版本可达约 5 Hz。尽管频率低于 RT-1 的实时速率，但对于桌面操作任务已足够。

**涌现能力与链式思维**

RT-2 展现了三类涌现能力，均未在机器人数据中出现过：

1. **符号理解**：执行 "move apple to 3"（理解数字符号）或 "push coke can on top of heart"（理解形状符号）
2. **语义推理**：执行 "move the apple to the cup with the same color"（视觉推理）、"move X near the sum of two plus one"（数学推理）、"mueve la manzana al vaso verde"（多语言理解）
3. **人物识别**：执行 "move the coke can to the person with glasses"

在涌现能力评估中，RT-2-PaLI-X 的平均成功率达到基线 RT-1 的 **3 倍以上**。

链式思维（Chain-of-Thought）变体通过数据增强引入 "Plan" 步骤：模型先生成自然语言计划（如 "Plan: pick rxbar chocolate"），再生成动作 token。这为将 VLM 规划器与低层策略统一到单一模型中提供了初步证据。

![涌现能力与消融实验结果](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/figures/rt2_emergent_dm.png)
*图：RT-2 在符号理解、推理和人物识别等涌现任务上显著超越 RT-1 和 VC-1 基线。*

**模型规模与训练策略消融**

消融实验揭示了三个关键发现：

| 配置 | 泛化性能 |
|------|---------|
| 从头训练 5B | 极差（跳过 55B 评估） |
| 纯微调 5B | 中等 |
| 协同微调 5B | 良好 |
| 协同微调 55B | **最佳** |

$$\text{泛化性能排序: co-fine-tune 55B} > \text{co-fine-tune 5B} > \text{fine-tune 5B} \gg \text{from scratch 5B}$$

> ⚠️ **注意**：RT-2 不会习得新的运动技能——其物理操作能力仍限于机器人数据中出现过的技能分布。VLM 知识迁移的价值在于让已有技能能够泛化到新的语义场景中。

##### 与传统方法的对比

| 方法 | 参数量 | 预训练数据 | 动作表示 | 泛化能力 |
|------|--------|-----------|---------|---------|
| RT-1 | 35M | 无 | 离散化 token（专用头） | 基线 |
| VC-1 / R3M | ~100M | 视觉预训练 | 冻结特征 + 策略头 | 略优于 RT-1 |
| MOO | ~35M | 无 | 同 RT-1 | 与 RT-1 相当 |
| **RT-2-PaLI-X** | **55B** | **web VQA + 图像** | **文本 token（共享词表）** | **~2× RT-1** |
| **RT-2-PaLM-E** | **12B** | **web 文本 + 图像** | **覆写 token** | **~2× RT-1** |

#### 🧪 练习题
```yaml
question: "RT-2 中 PaLM-E 骨干如何将动作 bin 索引映射到词表中？"
options:
  - "在词表末尾追加 256 个新 token"
  - "直接使用词表中已有的数字 token（0-255）"
  - "覆写词表中使用频率最低的 256 个 token"
  - "使用独立的动作解码头，不经过词表"
answer: 2
explain: "PaLM-E 的数字 token 语义已被占用，因此 RT-2 选择覆写词表中最不常用的 256 个 token 来表示动作 bin 索引，既不影响常见文本生成，又能复用自回归解码框架。"
```

### π₀

```yaml
id: pi0
num: 26
name: π₀
full_name: 通用机器人策略 (Generalist Robot Policy)
year: '2024'
org: Physical Intelligence
parent: rt2
paper_url: https://www.pi.website/blog/pi0
project_url: ''
category: foundation_model
motivation: 跨形态通用基础模型Flow Matching架构
```

#### 📝 一句话总结
π₀ 的核心目标是：跨形态通用基础模型Flow Matching架构。

#### 🎯 核心要点
- 核心动机：跨形态通用基础模型Flow Matching架构
- 演化来源：继承或改进自 rt2
- 代表机构：Physical Intelligence

#### 🔬 深入细节
跨形态通用基础模型Flow Matching架构


### OpenVLA

```yaml
id: openvla
num: 27
name: OpenVLA
full_name: 开源视觉语言动作模型 (Open Vision-Language-Action)
year: '2024'
org: Stanford
parent: rt2
paper_url: https://huggingface.co/openvla
project_url: ''
category: foundation_model
motivation: 7B参数开源VLA模型
```

#### 📝 一句话总结
OpenVLA 的核心目标是：7B参数开源VLA模型。

#### 🎯 核心要点
- 核心动机：7B参数开源VLA模型
- 演化来源：继承或改进自 rt2
- 代表机构：Stanford

#### 🔬 深入细节
7B参数开源VLA模型


### Helix-02

```yaml
id: helix02
num: 28
name: Helix-02
full_name: Figure AI VLA系统 (Helix VLA System)
year: '2026'
org: Figure AI
parent: pi0
paper_url: https://www.figure.ai/blog/helix-02
project_url: ''
category: foundation_model
motivation: 端到端Loco-manipulation控制
```

#### 📝 一句话总结
Helix 02 提出了一种三层级（S0/S1/S2）统一全身控制架构，通过单一神经网络将视觉、触觉、本体感知等全部传感器直接映射到人形机器人全部关节执行器，实现了首个长时域（4 分钟、61 步）端到端自主 loco-manipulation 任务。

#### 🎯 核心要点
- 三层级架构：System 0（1 kHz 全身运动控制）、System 1（200 Hz 视觉运动策略）、System 2（语义推理与任务规划）
- System 0：10M 参数神经网络，基于 1,000+ 小时人体运动数据 + sim-to-real 强化学习训练，替代 109,504 行手工 C++ 代码
- System 1：统一视觉运动策略（VLA），输入头部相机、手掌相机、指尖触觉传感器和全身本体感知，输出全身关节目标
- System 2：语义推理层，处理场景理解和语言指令，生成 S1 的潜在目标向量
- "All sensors in, all actuators out"：单一网络连接所有传感器到所有执行器
- 首次在人形机器人上实现长时域端到端 pixels-to-whole-body 自主控制（4 分钟连续任务，61 个 loco-manipulation 动作）
- 新型灵巧操作能力：利用 Figure 03 嵌入式触觉传感（3 克力灵敏度）和手掌相机实现精细操作
- 全身协调：机器人可用臀部关抽屉、用脚抬洗碗机门，跨越四个数量级的运动尺度（毫米级手指动作到房间级移动）

#### 🔬 深入细节
**Helix 02 系统架构示意（交互式动画）：**

> 📎 架构动画链接：[S0/S1/S2 层级架构](https://cdn.lottielab.com/l/5M9waMD6J2Xe7S.html)
>
> *图：Helix 02 的三层级架构。System 2 在最高层进行语义推理，System 1 在中间层将感知转化为全身关节目标，System 0 在底层以 1 kHz 执行平衡与协调控制。*

**核心演示视频：**

> 📎 [厨房自主整理任务（4 分钟连续自主操作）](https://videos.ctfassets.net/qx5k8y1u9drj/1cKhxhvotDvkyJx2rfq2IN/94f100629ab7a0bdb37d5b248f8f5760/Kitchen_Tidy_MP4_Compressed.mp4)

```
┌─────────────────────────────────────────────────────┐
│                  System 2 (S2)                      │
│         语义推理层 · 场景理解 · 语言指令              │
│    输入: 场景图像 + 自然语言                         │
│    输出: 语义潜在目标向量 → S1                       │
│    频率: 低频（任务级别）                            │
├─────────────────────────────────────────────────────┤
│                  System 1 (S1)                      │
│         视觉运动策略 · Transformer · 200 Hz          │
│    输入: 头部相机 + 手掌相机 + 触觉传感器            │
│          + 全身本体感知 + S2 潜在目标                 │
│    输出: 全身关节目标 → S0                           │
│    架构: Transformer, conditioned on S2 latents      │
├─────────────────────────────────────────────────────┤
│                  System 0 (S0)                      │
│         全身运动控制 · 10M 参数 · 1 kHz              │
│    输入: 全身关节状态 + 基座运动                     │
│    输出: 关节级执行器指令                            │
│    训练: 1000h 人体运动数据 + sim-to-real RL         │
│    仿真: 200,000+ 并行环境 + 域随机化                │
└─────────────────────────────────────────────────────┘
         ↓ 最终输出: 全身关节力矩 → 物理执行
```

##### 动机与背景

Loco-manipulation（移动操作）是机器人领域长期未解决的核心难题。其困难不在于单独的行走或操作，而在于两者的**耦合性**：抬起物体会改变平衡状态，迈步会改变可达范围，手臂和腿部持续相互约束。

传统方法将运动控制和操作分离为独立控制器，通过状态机拼接：行走→停下→稳定→伸手→抓取→再行走。这种方式切换缓慢、脆弱且不自然。Helix 02 的核心目标是构建一个**统一的学习系统**，同时推理全身状态，实现连续感知、决策和执行。

##### System 0：基于人体数据的全身运动先验

System 0 是 Helix 02 的物理执行基础层，其核心创新在于**用学习的运动先验替代手工工程控制器**。

**训练数据与方法：**
- 使用超过 **1,000 小时**的关节级重定向人体运动数据作为训练语料
- 网络规模：**10M 参数**的神经网络
- 训练方式：完全在仿真中进行，使用 **200,000+ 并行环境**和广泛的**域随机化（domain randomization）**
- 不为行走、转弯、蹲下、伸手等行为分别设计奖励函数，而是直接学习**跟踪人体运动**

> 💡 关键：S0 不是一个简单的 PD 控制器，而是一个学习了人类运动模式的**运动基础模型**。它在学习复现人体运动的过程中，自然习得了力的协调、姿态调整和平衡维持能力。

**设计优势：**
- 替代了 **109,504 行手工编写的 C++ 代码**
- 以 **1 kHz** 的频率输出关节级执行器指令，确保实时响应
- 通过 sim-to-real 迁移直接部署到真实机器人，并在机器人车队间泛化

##### System 1：全传感器-全执行器视觉运动策略

System 1 是感知到动作的核心桥梁，其架构为 **Transformer**，以 S2 的潜在向量为条件。

**输入模态（All sensors in）：**
- **头部相机**：提供全局场景视觉
- **手掌相机**：提供手内视觉反馈（当物体被头部相机遮挡时尤为关键）
- **指尖触觉传感器**：检测低至 **3 克**的力（足以感知一枚回形针），实现接触感知和力调节抓取
- **全身本体感知**：关节角度、速度等状态信息

**输出（All actuators out）：**
- 完整的全身关节级控制——腿部、躯干、头部、手臂、手腕和**单个手指**
- 以 **200 Hz** 频率产生全身关节目标，由 S0 在 1 kHz 下跟踪执行

> ⚠️ 注意：这是首次在人形机器人上展示依赖手掌相机和触觉传感模态的神经网络策略。这种 pixels-to-whole-body 架构使 S1 能够将机器人和环境作为一个**单一耦合系统**进行推理。

##### System 2：语义推理与任务编排

System 2 是最高层的语义推理模块，负责：
- **场景理解**：处理视觉输入，理解环境状态
- **语言理解**：解析自然语言指令
- **行为序列生成**：产生语义级潜在目标供 S1 执行

与传统方法不同，S2 **不需要规划底层步态或指定手臂与腿部的协调方式**。它只需产生语义级指令（如"走到洗碗机并打开它"、"把碗端到台面上"），由 S1 和 S0 自动处理运动细节。

##### 关键实验结果

**1. 长时域自主 Loco-Manipulation（厨房整理任务）：**

机器人在全尺寸厨房中执行连续 4 分钟的自主任务，包括：
- 走到洗碗机 → 打开洗碗机 → 卸载餐具 → 穿越房间 → 在橱柜中堆叠物品 → 装载并启动洗碗机
- 共 **61 个 loco-manipulation 动作**，顺序正确，具有隐式错误恢复
- 全程无人干预、无重置

> 💡 关键：同一个神经网络产生毫米级手指动作和房间级移动——动态范围跨越**四个数量级**。

**2. 灵巧操作任务（触觉 + 手掌视觉）：**

| 任务 | 核心挑战 | 关键能力 |
|------|---------|---------|
| 拧开瓶盖 | 双手协调 + 力矩控制 | 触觉调节握力 + 连续旋转 |
| 从药盒取出药片 | 小物体 + 头部相机遮挡 | 手掌相机视觉反馈 + 触觉精确抓取 |
| 注射器精确推注 5ml | 可变阻力 + 严格公差 | 力控制执行 + 触觉反馈 + 多指协调 |
| 从杂乱箱中取金属件 | 物体重叠遮挡 + 交互中移动 | 视觉抓取选择 + 触觉确认安全接触 |

##### 与传统方法的对比

| 维度 | 传统方法 | Helix 02 |
|------|---------|----------|
| 控制架构 | 分离的运动/操作控制器 + 状态机 | 统一的三层级神经网络（S0/S1/S2） |
| 运动控制 | 手工 C++ 代码（10 万+行） | 10M 参数学习的运动先验 |
| 感知-执行 | 模块化管道，各模态独立处理 | All sensors in, all actuators out |
| 任务复杂度 | 短时域、单一行为 | 长时域（4 分钟、61 步）连续自主 |
| 全身协调 | 仅用手操作 | 手、臂、臀、脚全身作为工具 |
| 灵巧操作 | 纯视觉策略 | 视觉 + 触觉 + 手掌相机多模态融合 |

#### 🧪 练习题
```yaml
question: "Helix 02 中 System 0 的主要作用是什么？"
options:
  - "处理自然语言指令并进行场景理解"
  - "以 200 Hz 将视觉感知转化为全身关节目标"
  - "以 1 kHz 执行全身平衡、接触和协调控制"
  - "规划底层步态和手臂腿部协调方式"
answer: 2
explain: "System 0 是物理执行基础层，以 1 kHz 频率输出关节级执行器指令，负责平衡、接触和全身协调。S2 负责语义推理（选项 A），S1 负责 200 Hz 视觉运动策略（选项 B），而底层步态规划由 S0 隐式学习而非显式规划（选项 D）。"
```

### GR00T N1.6

```yaml
id: groot_n1
num: 29
name: GR00T N1.6
full_name: NVIDIA人形基础模型 (GR00T Humanoid Foundation)
year: '2026'
org: NVIDIA
parent: pi0
paper_url: https://developer.nvidia.com/isaac/groot
project_url: ''
category: foundation_model
motivation: 32层扩散Transformer人形控制
```

#### 📝 一句话总结
GR00T N1.6 的核心目标是：32层扩散Transformer人形控制。

#### 🎯 核心要点
- 核心动机：32层扩散Transformer人形控制
- 演化来源：继承或改进自 pi0
- 代表机构：NVIDIA

#### 🔬 深入细节
32层扩散Transformer人形控制


### GE-1

```yaml
id: ge1
num: 30
name: GE-1
full_name: AGIBOT世界模型 (AGIBOT World Model)
year: '2026'
org: AGIBOT
parent: pi0
paper_url: https://www.agibot.com/ge1
project_url: ''
category: foundation_model
motivation: 视频生成式物理交互预测
```

#### 📝 一句话总结
GE-1 的核心目标是：视频生成式物理交互预测。

#### 🎯 核心要点
- 核心动机：视频生成式物理交互预测
- 演化来源：继承或改进自 pi0
- 代表机构：AGIBOT

#### 🔬 深入细节
视频生成式物理交互预测


### DreamDojo

```yaml
id: dreamdojo
num: 31
name: DreamDojo
full_name: 梦境道场 (DreamDojo World Model)
year: '2026'
org: ShengShu
parent: pi0
paper_url: https://shengshu-ai.github.io/DreamDojo
project_url: ''
category: foundation_model
motivation: 物理交互预判世界模型
```

#### 📝 一句话总结
DreamDojo 的核心目标是：物理交互预判世界模型。

#### 🎯 核心要点
- 核心动机：物理交互预判世界模型
- 演化来源：继承或改进自 pi0
- 代表机构：ShengShu

#### 🔬 深入细节
物理交互预判世界模型
