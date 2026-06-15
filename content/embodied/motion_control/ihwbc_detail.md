### 隐式层次全身控制 (Implicit Hierarchical WBC)

```yaml
id: ihwbc
name: IHWBC
full_name: 隐式层次全身控制 (Implicit Hierarchical WBC)
year: '2019'
org: MIT
paper_url: https://arxiv.org/abs/1909.06586
category: wbc
parent: hqp_wbc
motivation: MPC+WBC联合优化提升动态性能
```

#### 📝 一句话总结

IHWBC 清单链接对应的论文实际是 MIT Mini Cheetah 的 Whole-Body Impulse Control (WBIC) + MPC 框架：MPC 在长时域规划地面反力，WBC 在短周期内用任务优先级和 QP 修正反力、加速度与关节命令，从而实现高速动态四足运动。

#### 🎯 核心要点

- **MPC + WBC 两层架构**：MPC 用简化模型规划接触反力，WBC 用全身模型把反力、身体稳定和摆动腿任务转为关节命令
- **优先级任务执行**：通过 null-space projection 依次处理身体姿态、身体位置、足端位置等任务
- **QP 反力修正**：以 MPC 反力为参考，在满足浮动基动力学、任务加速度和接触力约束的前提下求解最终接触力
- **浮动基松弛变量**：对浮动基加速度和反力引入 relaxation，允许飞行相或强动态阶段不被不可实现约束卡死
- **多输出底层接口**：WBC 同时给关节 torque、position、velocity 命令，而不是只输出力矩
- **高频执行**：MPC 较低频更新，WBIC/WBC 以约 2 ms 级周期修正反力和任务跟踪
- **硬件验证**：Mini Cheetah 在实机上完成高速 trot、多步态切换和动态跑动，稳定速度达到约 3.7 m/s

#### 🔬 深入细节

##### 命名说明与框架图

> ⚠️ 注意：清单名为 IHWBC，但 `paper_url` 指向论文 *Highly Dynamic Quadruped Locomotion via Whole-Body Impulse Control and Model Predictive Control*。以下按该链接的 MPC + WBIC/WBC 方法精读，YAML 保持清单原值。

![WBIC + MPC 控制架构](https://ar5iv.labs.arxiv.org/html/1909.06586/assets/x1.png)
*图：MPC 计算较长时域的反力规划，WBC 将其与身体稳定、摆动腿控制结合，输出实际机器人命令。*

![整体控制框架](https://ar5iv.labs.arxiv.org/html/1909.06586/assets/x2.png)
*图：用户速度/步态命令进入 MPC，MPC 输出期望反力和足端/身体命令，WBIC/WBC 生成关节 torque、position、velocity 并交给关节控制器。*

##### 动机与背景

Convex MPC 在四足机器人中很强，因为它能实时优化未来接触反力；但只靠简化单刚体模型不能完整处理腿部运动学、摆动足跟踪和关节级执行限制。传统 WBC 能处理全身任务，却缺乏 MPC 的长时域反力规划。WBIC 的设计是把二者组合：MPC 负责“未来支撑力应该怎样变化”，WBC 负责“当前全身应该怎样执行这个力，同时稳定身体并摆动腿”。

这种组合尤其适合高速运动。高速 trot 或 bound 中支撑时间短、存在飞行相，若 WBC 严格要求每个瞬间都完全满足浮动基任务，优化可能不可行；若完全相信 MPC 反力，又无法处理实际关节和足端任务误差。因此论文在 QP 中对部分约束松弛，让控制器在强动态阶段以可执行性为优先。

##### 优先级任务执行

WBIC 先用 null-space projection 计算任务空间期望加速度。第 \(i\) 个任务的期望加速度通常为：

$$
\ddot{x}_i^{des} =
\ddot{x}_i^{ref}
 + K_p(x_i^{ref}-x_i)
 + K_d(\dot{x}_i^{ref}-\dot{x}_i)
$$

任务雅可比为 \(J_i\)，则任务约束为：

$$
J_i\ddot{q} + \dot{J}_i\dot{q} = \ddot{x}_i^{des}
$$

对多任务按优先级投影：

$$
\ddot{q}_i =
\ddot{q}_{i-1} +
(J_i N_{i-1})^\#(\ddot{x}_i^{des}-\dot{J}_i\dot{q}-J_i\ddot{q}_{i-1})
$$

其中 \(N_{i-1}\) 是更高优先级任务的零空间，\((\cdot)^\#\) 可取 SVD 伪逆或动态一致伪逆。论文用这种方式同时得到期望关节位置/速度增量和任务加速度，再把加速度送入 QP。

##### QP：用 MPC 反力做参考，而不是照抄

MPC 输出接触反力 \(\lambda^{mpc}\)。WBIC 的 QP 求解：

$$
\min_{\ddot{q},\lambda,\delta}
\|\lambda-\lambda^{mpc}\|_{W_\lambda}^2
+ \|\delta_b\|_{W_b}^2
+ \|\delta_\lambda\|_{W_r}^2
$$

subject to

$$
S_f(M\ddot{q}+h-J_c^\top \lambda)=\delta_b
$$

$$
J_{task}\ddot{q}+\dot{J}_{task}\dot{q}=\ddot{x}^{des}
$$

$$
A_f\lambda \le b_f
$$

这里 \(\delta_b\) 是浮动基动力学松弛项，\(\delta_\lambda\) 是反力松弛项。直觉上，QP 既想尽量跟随 MPC 反力，又允许在硬件、接触和任务执行需要时做局部修正。

得到 \(\ddot{q}^*\) 和 \(\lambda^*\) 后，再由刚体动力学求关节力矩：

$$
\tau =
S\left(M(q)\ddot{q}^*+h(q,\dot{q})-J_c(q)^\top\lambda^*\right)
$$

##### 算法伪代码

```python
# WBIC + MPC 控制循环伪代码
while robot_is_running:
    state = estimate_base_joints_contacts()
    gait_phase = gait_scheduler(commanded_gait, commanded_velocity)

    if mpc_tick:
        lambda_mpc, body_ref, foot_ref = solve_mpc(
            simplified_body_model,
            state,
            gait_phase,
            velocity_command,
        )

    # WBC/WBIC 高频运行
    task_acc = prioritized_task_projection([
        body_orientation_task(body_ref),
        body_position_task(body_ref),
        swing_foot_task(foot_ref),
    ])

    qddot_star, lambda_star = solve_qp(
        minimize_force_error_to=lambda_mpc,
        satisfy_floating_base_dynamics_with_relaxation=True,
        satisfy_task_acceleration=task_acc,
        satisfy_contact_force_constraints=True,
    )

    tau = inverse_dynamics(qddot_star, lambda_star)
    q_des, dq_des = integrate_task_solution(task_acc)
    send_joint_commands(tau=tau, q_des=q_des, dq_des=dq_des)
```

##### 与 HQP-WBC 和 Convex MPC 的关系

与纯 HQP-WBC 相比，WBIC 没有把所有任务都做成多层严格 QP，而是在任务投影后用一个小 QP 处理反力与动力学可行性，因此更适合 Mini Cheetah 的高频动态运动。与纯 Convex MPC 相比，它不仅输出地面反力，还把摆动腿轨迹、身体姿态和关节级命令纳入执行层。

这种方法的工程取舍很清楚：MPC 负责任务级可预见性，WBC 负责本体级实时修正；松弛变量牺牲一部分严格动力学跟踪，换来强动态场景中的可行性和稳定执行。

> 💡 关键：WBIC 不是替代 MPC，而是把 MPC 的反力计划变成“可被全身模型和硬件执行的命令”，这一步对高速四足运动尤其重要。

#### 🧪 练习题

```yaml
question: "WBIC + MPC 框架中，WBC 的主要作用是什么？"
options:
  - "完全替代 MPC，独立规划未来接触序列"
  - "将 MPC 反力与身体/足端任务结合，求解可执行的关节 torque、position、velocity 命令"
  - "只负责视觉建图，不参与动力学控制"
  - "只输出高层速度命令给遥控器"
answer: 1
explain: "MPC 给出长时域反力参考，WBC/WBIC 在当前时刻结合全身任务、动力学和接触约束，修正反力并生成关节级命令。"
```
