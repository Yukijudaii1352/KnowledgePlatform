### 🤖 FALCON — 力自适应人形移动操控

```yaml
id: falcon
name: FALCON
full_name: "力自适应移动操控 (Force-Adaptive Loco-Manipulation)"
year: 2025
org: CMU / L4DC
paper_url: "https://arxiv.org/abs/2505.06776"
category: sim2real
parent: ppo
motivation: "双智能体RL力自适应控制，通过力矩感知的3D力课程训练使人形机器人无需力传感器即可完成移动操控任务"
```

#### 📝 一句话总结

FALCON 提出了一种**双智能体强化学习**框架，将人形机器人的上半身（操控）与下半身（运动）解耦为两个协作策略，并设计了**力矩极限感知的 3D 力课程训练**机制，使机器人无需力传感器即可在 sim-to-real 中完成负载搬运、拉车、开门等力自适应移动操控任务。

#### 🎯 核心要点

- **双智能体架构**：上半身 RL 智能体负责关节跟踪（隐式力补偿），下半身 RL 智能体负责速度跟踪与步态稳定，两者共享本体感知信息并联合训练
- **力矩极限感知的 3D 力课程**：通过雅可比矩阵和关节力矩上限计算末端执行器可承受的最大力，结合 Dirichlet 分布在 3D 力空间中采样训练力，并通过渐进式缩放因子 \(\alpha_g\) 逐步增加力的强度
- **非对称 Actor-Critic**：Actor 仅使用本体感知，Critic 额外获取特权信息（真实根速度、末端执行器外力），提升训练效率
- **AMASS 动作捕捉数据集**驱动上半身目标姿态采样，使策略泛化到多种操控姿势
- **跨平台验证**：在 Unitree G1 和 Booster T1 两款人形机器人上实现 sim-to-real 部署，完成 0–20N 负载搬运、0–100N 拉车、0–40N 开门等任务

#### 🔬 深入细节

![FALCON 系统总览](https://ar5iv.labs.arxiv.org/html/2505.06776/assets/x2.png)
*图：FALCON 双智能体训练框架。上半身智能体跟踪参考关节角度（来自 AMASS 数据集采样），下半身智能体跟踪速度指令。训练时通过 3D 力课程在末端执行器施加随机外力，Critic 获取特权信息（根速度、外力）。*

##### 算法伪代码

```python
# FALCON 双智能体联合训练伪代码
Initialize: upper_policy πU, lower_policy πL, critics VU, VL
Load: AMASS motion dataset for upper-body reference poses

for iteration in range(N_iterations):
    # === 力课程采样 ===
    for each environment:
        # 1. 计算当前姿态下的力矩极限 → 力空间边界
        J_EE = compute_jacobian(q_upper)           # 末端执行器雅可比
        tau_margin = tau_max - tau_gravity(q)       # 可用力矩余量
        F_max_per_axis = J_EE_inv_T @ tau_margin   # 各轴最大可施加力 (Eq.3)
        
        # 2. Dirichlet 分布采样力方向 + 渐进缩放
        d ~ Dirichlet(α=1, k=3)                    # 3D 方向权重
        F_applied = α_g * d * F_max_per_axis        # α_g ∈ [0,1] 渐进增大 (Eq.5)
        apply_force(F_applied, at=EE_position + Δp)  # Δp 随机偏移
    
    # === 上半身智能体 ===
    s_upper = [q, dq, ω_root, g, a_{t-1}^U]       # 本体感知
    a_upper = πU(s_upper)                           # 输出: 上半身关节目标
    r_upper = exp(-||q_upper - q_ref||² / σ²)      # 关节跟踪奖励
    
    # === 下半身智能体 ===
    s_lower = [q, dq, ω_root, g, a_{t-1}^L, v_cmd, h_cmd, ω_cmd, phase]
    a_lower = πL(s_lower)                           # 输出: 下半身关节目标
    r_lower = r_vel + r_height + r_gait + r_penalty # 运动跟踪奖励
    
    # === PPO 更新（非对称 Critic）===
    s_critic_U = [s_upper, v_root_true, F_EE_true]  # 特权信息
    s_critic_L = [s_lower, v_root_true, F_EE_true]
    Update πU, πL, VU, VL via PPO with clipped objective
```

##### 动机与背景

人形机器人的移动操控（loco-manipulation）要求同时完成稳定行走和上肢力交互，这在传统方法中面临两大挑战：

1. **力感知困难**：大多数消费级人形机器人不配备末端力/力矩传感器，无法直接测量交互力
2. **上下肢耦合**：上半身施加或承受外力时，会通过动力学耦合影响下半身的平衡与步态

现有方法要么依赖力传感器进行显式力补偿（如 Lower-RL-Upper-IK + Force Estimator），要么仅在 2D 平面施加简单推力进行鲁棒性训练，无法处理复杂的 3D 力交互场景。

> 💡 **关键洞察**：FALCON 的核心思想是——与其估计力再补偿，不如让策略在训练中**隐式学会**应对各种力扰动。通过在物理仿真中系统性地施加力矩极限范围内的 3D 外力，策略自然获得力自适应能力。

##### 核心机制详解

**1. 双智能体分离训练**

FALCON 将全身控制分解为两个独立但协作的 RL 智能体：

- **上半身智能体 \(\pi^U\)**：观测本体感知 \(s^U_t = [q_{t-4:t}, \dot{q}_{t-4:t}, \omega^{\text{root}}_{t-4:t}, g_{t-4:t}, a^U_{t-1}]\)，输出上半身关节 PD 目标。奖励函数为关节角度跟踪误差：

$$r^U_t = \exp\!\left(-\frac{\|q^{\text{upper}}_t - q^{\text{ref}}_t\|^2}{\sigma^2}\right)$$

- **下半身智能体 \(\pi^L\)**：额外观测速度指令 \(v^{\text{cmd}}\)、高度指令 \(h^{\text{cmd}}\)、角速度指令 \(\omega^{\text{cmd}}\) 和步态相位 \(\phi_t\)，输出下半身关节 PD 目标。奖励包含速度跟踪、高度跟踪、步态周期奖励和多项稳定性惩罚。

两个智能体**共享完整的本体感知**（全身关节角度、角速度、IMU 数据），使上半身的动作变化能被下半身感知并做出补偿。

> ⚠️ **注意**：虽然两个智能体独立输出动作，但它们在同一仿真环境中联合训练，下半身智能体能观测到上半身动作对机器人状态的影响，从而学会动态平衡补偿。

**2. 力矩极限感知的 3D 力课程**

这是 FALCON 最核心的技术创新。训练时在末端执行器上施加随机 3D 外力，但力的大小受限于关节力矩极限：

**Step 1 — 力矩余量计算**：给定当前关节构型 \(q\)，计算重力补偿后的可用力矩余量：

$$\tau_{\text{margin}} = \tau_{\max} - \tau_{\text{gravity}}(q)$$

**Step 2 — 力空间边界映射**：通过末端执行器雅可比矩阵 \(J_{EE}\) 将力矩空间映射到笛卡尔力空间，得到各轴最大可施加力：

$$F^{\max}_{\text{axis}_i} = \left|(J^{-T}_{EE} \cdot \tau_{\text{margin}})_i\right|, \quad i \in \{x, y, z\}$$

**Step 3 — Dirichlet 采样 + 渐进缩放**：使用 Dirichlet 分布在 3D 力方向上采样，确保力在各轴间合理分配：

$$d \sim \text{Dir}(\alpha \cdot \mathbf{1}_3), \quad F^{\text{applied}} = \alpha_g \cdot d \odot F^{\max}_{\text{axis}}$$

其中 \(\alpha_g \in [0, 1]\) 是渐进缩放因子，随训练进程从 0 线性增长到 1，实现从无力到满力的课程学习。每个力的施加位置还会在末端执行器表面随机偏移 \(\Delta p\)，增加力矩扰动的多样性。

> 💡 **为什么用 Dirichlet 分布？** Dirichlet 分布天然生成归一化的非负权重向量（\(\sum d_i = 1\)），非常适合在固定总力预算下分配各轴力分量。当 \(\alpha = 1\) 时为均匀分布，各方向等概率；增大 \(\alpha\) 可使分布更集中。

**3. 非对称 Actor-Critic**

为了在不依赖力传感器的前提下提升训练效率，FALCON 采用非对称设计：

- **Actor**（部署时使用）：仅接收本体感知信息，不需要力传感器
- **Critic**（仅训练时使用）：额外接收特权信息——真实根部速度 \(v^{\text{root}}\) 和末端执行器外力 \(F^{EE}\)

这使得 Critic 能更准确地估计状态价值，指导 Actor 学习更好的策略，而部署时 Actor 完全不依赖特权信息。

**4. 上半身参考姿态采样**

训练时，上半身的目标关节角度从 AMASS 动作捕捉数据集中随机采样。具体流程：
1. 从 AMASS 数据集中随机选取一个动作片段
2. 通过逆运动学将 SMPL 人体模型的关节角度映射到机器人关节空间
3. 仅提取上半身关节角度作为跟踪目标
4. 每个 episode 随机采样不同的目标姿态

这种设计使策略能泛化到各种上半身构型，而非仅适用于特定操控姿势。

##### 与基线方法的对比

| 方法 | 力处理方式 | 上半身控制 | 上体跟踪误差 | 力自适应 |
|------|-----------|-----------|-------------|---------|
| Vanilla Single-Agent | 无力课程 | RL 联合控制 | 基线 | ✗ |
| Lower-RL-Upper-IK | 力估计器+雅可比补偿 | IK+前馈力矩 | 较差 | 需力传感器 |
| ExBody2 (2D push) | 仅 2D 水平推力 | RL | 中等 | 有限 |
| **FALCON** | **3D 力课程+力矩感知** | **双智能体 RL** | **最优 (↓2×)** | **✓ 无需传感器** |

实验结果表明，FALCON 在上半身跟踪误差上比最佳基线降低约 **2 倍**，同时在 Unitree G1 上实现了 107.9N 的拉车峰值力和 47.3N 的开门峰值力。

##### 训练与部署细节

- **仿真器**：MuJoCo，4096 个并行环境
- **优化器**：PPO，学习率 \(1 \times 10^{-4}\)，clip ratio \(\epsilon = 0.2\)
- **控制频率**：50 Hz（策略）/ 200 Hz（PD 控制器）
- **Domain Randomization**：摩擦系数 \(\mathcal{U}(0.5, 1.25)\)、连杆质量 \(\mathcal{U}(0.9, 1.2)\times\) 默认值、基座质量偏移 \(\mathcal{U}(-1, 3)\) kg、PD 增益 \(\mathcal{U}(0.9, 1.1)\times\) 默认值、控制延迟 \(\mathcal{U}(0, 20)\) ms
- **外部扰动**：每 5 秒施加 1 m/s 的随机推力
- **硬件限制**：实际部署中手腕电机容易过热，限制了持续高力矩输出（每臂 ≤2kg 持续负载），但短时高力矩任务（如拉车）不受影响

#### 🧪 练习题

```yaml
question: "FALCON 的 3D 力课程训练中，使用 Dirichlet 分布的主要目的是什么？"
options:
  - "生成均匀分布的力方向向量，确保各轴力分量相等"
  - "在固定总力预算下对三维力轴进行归一化的随机分配，增加训练力扰动的多样性"
  - "替代高斯分布以避免生成负值力分量"
  - "对力矩极限进行概率建模，估计关节失效概率"
answer: 1
explain: "Dirichlet 分布天然输出归一化的非负权重向量 (Σdi=1)，用于将力矩极限映射的最大力在 x/y/z 三轴间随机分配，配合渐进缩放因子 αg 实现从弱到强的力课程训练。"
```