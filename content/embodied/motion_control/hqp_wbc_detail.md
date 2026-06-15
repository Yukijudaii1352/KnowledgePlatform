### 层次QP全身控制 (Hierarchical QP Whole-Body Control)

```yaml
id: hqp_wbc
name: HQP-WBC
full_name: 层次QP全身控制 (Hierarchical QP Whole-Body Control)
year: '2016'
org: IIT
paper_url: https://www.worldscientific.com/doi/abs/10.1142/S0219843615500346
category: wbc
parent: —
motivation: 任务优先级层次化QP求解
```

#### 📝 一句话总结

HQP-WBC 将全身逆动力学、接触约束、关节/力矩限制和多任务跟踪写成按优先级求解的二次规划序列，解决人形/腿足机器人在接触切换和多目标控制中“高优先级安全约束不能被低优先级任务破坏”的问题。

#### 🎯 核心要点

- **浮动基全身逆动力学**：以广义加速度 \(\ddot{q}\)、接触力 \(\lambda\) 和关节力矩 \(\tau\) 为决策变量，满足刚体动力学一致性
- **严格任务优先级**：安全/接触/动力学约束处于最高优先级，质心/动量、摆动足、姿态、关节姿态等任务按层次依次优化
- **接触约束显式建模**：包含支撑脚无滑动约束、摩擦锥、法向力非负、接触力上限等物理可行性条件
- **关节与执行器限制**：用不等式约束处理关节位置、速度、加速度和力矩限制，避免优化解不可执行
- **层次 QP / 级联 QP**：每一层在保持上层最优残差不变的可行集合内最小化当前任务误差
- **可兼容 DCM/动量控制**：高层步态或 DCM 控制器给出期望质心动量变化，WBC 将其转成可执行关节命令
- **硬件实现导向**：论文链接对应的 THOR 系列弹性执行器人形机器人工作强调 QP-WBC 与低阻抗力控硬件的结合

#### 🔬 深入细节

##### 图源与控制框架

> ⚠️ 说明：该 DOI 的公开 PDF 可访问，但页面没有暴露独立的图像直链。下方用公开 PDF 作为图源链接，并用文本框复刻 HQP-WBC 的核心计算图。

![HQP-WBC 原论文公开 PDF](https://www.cs.cmu.edu/~cga/z/Hopkins_IJHR_2016.pdf)

```text
高层步态 / DCM / 操作任务
        │
        ▼
任务参考: 质心动量、基座姿态、摆动足轨迹、关节姿态
        │
        ▼
层次 QP 逆动力学求解器
  Level 0: 刚体动力学 + 接触保持 + 摩擦锥 + 力矩/关节限制
  Level 1: 质心动量 / DCM 稳定
  Level 2: 摆动足、躯干姿态、手部任务
  Level 3: 姿态正则、力矩/加速度最小化
        │
        ▼
τ*, qddot*, λ*  →  关节力矩/位置/速度底层控制
```

##### 动机与背景

腿足机器人全身控制的难点不是单个任务的控制律，而是任务之间会冲突：支撑脚必须不滑、摩擦锥不能违反、浮动基动力学必须成立；同时机器人还要稳定质心、跟踪摆动足轨迹、保持躯干姿态、避免关节限位。若把所有任务简单加权到一个 QP，权重调小的安全任务可能被调大的运动任务牺牲；权重调参也会非常脆弱。

HQP-WBC 的核心思想是把“任务重要性”变成优化结构本身。高优先级任务先求解并固定其最优误差，低优先级任务只能在不破坏高优先级结果的剩余自由度里优化。这样，接触可行性和动力学一致性不会因为想让手或摆动足更接近目标而被破坏。

##### 全身逆动力学约束

浮动基机器人满足：

$$
M(q)\ddot{q} + h(q,\dot{q}) = S^\top \tau + J_c(q)^\top \lambda
$$

其中 \(q\in\mathbb{R}^{6+n}\) 包含 6D 浮动基和 \(n\) 个关节，\(S\) 选择可驱动关节，\(\lambda\) 是接触力。因为浮动基不可直接驱动，未驱动部分必须由接触力和惯性满足：

$$
S_f\left(M(q)\ddot{q}+h(q,\dot{q})-J_c^\top\lambda\right)=0
$$

接触保持约束通常写成：

$$
J_c\ddot{q} + \dot{J}_c\dot{q}=0
$$

摩擦锥可线性化为金字塔不等式：

$$
A_f \lambda \le b_f,\qquad \lambda_z \ge 0
$$

这些约束构成最高优先级，因为它们定义了解是否物理可行。

##### 层次 QP 公式

第 \(k\) 层任务一般写成：

$$
A_k x \approx b_k,\qquad x=[\ddot{q},\lambda,\tau]
$$

HQP 的级联形式为：

$$
x_k^* =
\arg\min_x \|A_kx-b_k\|_{W_k}^2
$$

subject to

$$
C x \le d,\quad E x = e,\quad
\|A_i x-b_i\|_{W_i}^2 = \|A_i x_i^*-b_i\|_{W_i}^2,\ i<k
$$

也就是说，第 \(k\) 层不仅要满足物理约束，还要保持所有更高层任务的最优残差。实际实现中也可用 null-space 投影近似：

$$
x = x_{1}^* + N_1 y_2,\qquad
x = x_{2}^* + N_{1:2} y_3,\ldots
$$

其中 \(N\) 是高优先级任务的零空间。QP 级联更容易纳入不等式约束；null-space 形式计算更快但对主动约束变化更敏感。

##### 算法伪代码

```python
# HQP-WBC 伪代码
def hqp_wbc(q, dq, task_refs, contacts):
    x = DecisionVars(qddot, contact_force, joint_torque)

    hard_constraints = [
        floating_base_dynamics(q, dq, x),
        stance_contact_acceleration(q, dq, x, contacts),
        friction_pyramid(x.contact_force),
        torque_limits(x.joint_torque),
        joint_position_velocity_limits(q, dq, x.qddot),
    ]

    hierarchy = [
        centroidal_momentum_task(task_refs.hdot_des),
        base_orientation_task(task_refs.base_R_des),
        swing_foot_task(task_refs.foot_acc_des),
        hand_or_manipulation_task(task_refs.ee_acc_des),
        posture_regularization(task_refs.q_nominal),
    ]

    previous_optimal_residuals = []
    for level, task in enumerate(hierarchy):
        sol = solve_qp(
            minimize=task.weighted_squared_error(x),
            subject_to=hard_constraints + previous_optimal_residuals,
        )
        previous_optimal_residuals.append(fix_residual(task, sol))

    return sol.joint_torque, sol.qddot, sol.contact_force
```

##### 与加权 QP、经典逆运动学的区别

加权 QP 将任务写成一个大目标：

$$
\min_x \sum_i w_i\|A_i x-b_i\|^2
$$

它简单、快速，但“优先级”只由权重近似表达。如果摆动足任务和接触保持冲突，优化器可能同时牺牲二者。HQP 则将高优先级任务作为低层的等式/最优性约束，所以低层任务没有权力破坏高层。

相比经典逆运动学，HQP-WBC 直接在动力学层面处理接触力和关节力矩，因此能判断目标运动是否真的可由支撑接触产生；这对人形机器人单脚支撑、推搡恢复、楼梯/不平地行走尤其关键。

> 💡 关键：HQP-WBC 的价值在于把“安全、接触和动力学一致性”从调权重问题提升为优化层级问题，减少低优先级任务对高优先级约束的干扰。

#### 🧪 练习题

```yaml
question: "HQP-WBC 相比单个加权 QP 的核心优势是什么？"
options:
  - "完全不需要机器人动力学模型"
  - "低优先级任务只能在不破坏高优先级任务最优性的空间中优化"
  - "可以把所有接触约束删除以提高速度"
  - "只适用于固定基机械臂，不适用于浮动基机器人"
answer: 1
explain: "HQP 通过级联 QP 或零空间投影保持上层任务的最优残差，使接触、安全和动力学约束不会被低优先级跟踪任务牺牲。"
```
