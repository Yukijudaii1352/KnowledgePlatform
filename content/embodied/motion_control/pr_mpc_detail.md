### PR-MPC — 策略正则化MPC (Policy-Regularized MPC)

```yaml
id: pr_mpc
name: PR-MPC
full_name: 策略正则化MPC (Policy-Regularized MPC)
year: "2017"
org: MIT
paper_url: https://ieeexplore.ieee.org/abstract/document/8206268
category: mpc
parent: centroidal_mpc
motivation: 融合学习策略与MPC提升泛化性
```

#### 📝 一句话总结

PR-MPC 在非线性 MPC 目标中加入启发式/学习策略的正则项，用参考策略引导足端落点、接触力和身体运动，解决四足动态步态优化容易病态、难以统一调参的问题。它让 MIT Cheetah 能在同一 MPC 结构下稳定 trot、bound、gallop 等多种步态，而不必为每种步态重写代价函数。

#### 🎯 核心要点

- **策略正则化项**：在 MPC 代价中惩罚偏离参考策略 \(\pi_{ref}\) 的控制序列，改善非线性优化条件数
- **统一多步态 MPC**：同一优化框架支持 trotting、bounding、galloping，无需针对每种步态重新设计权重
- **启发式先验 + 在线优化**：参考策略提供合理初值和行为偏置，MPC 仍根据动力学和约束在线修正
- **足步与力的耦合优化**：优化变量覆盖身体状态、接触力、足端位置或脚步参数，使动态步态更一致
- **降低局部极小风险**：正则项把搜索空间拉向已知可行运动模式，减少纯 MPC 在高维非凸问题中的发散
- **MPC/RL 融合雏形**：展示了“学习/启发式策略提供先验，模型优化提供约束满足”的混合控制范式

#### 🔬 深入细节

##### 核心示意图

![PR-MPC 多步态轨迹示意](https://d3i71xaburhd42.cloudfront.net/ba9bf25973fd38b636176c1c46fd83a972b9bda3/4-Figure3-1.png)
*图：PR-MPC 论文公开索引中的多步态结果图。IEEE 原文页面可能受限，公开图源用于说明其核心目标：在同一 MPC 框架内稳定多种 Cheetah 步态。*

##### 算法伪代码

```python
# Policy-Regularized MPC 的滚动优化结构
def pr_mpc_control(x0, gait_schedule, reference_policy, model, horizon):
    # 1. 参考策略给出脚步、身体速度或力分配先验
    u_ref, foot_ref, state_ref = reference_policy.rollout(x0, gait_schedule, horizon)

    # 2. 构造带策略正则化的非线性 MPC
    problem = NonlinearOCP()
    for k in range(horizon):
        problem.add_dynamics_constraint(model, k)
        problem.add_contact_constraints(gait_schedule[k])
        problem.add_friction_cone_constraints(k)
        problem.add_cost(track_body_state(k, state_ref[k]))
        problem.add_cost(track_commanded_velocity(k))
        problem.add_cost(lambda_reg * norm(control[k] - u_ref[k])**2)
        problem.add_cost(lambda_foot * norm(footstep[k] - foot_ref[k])**2)

    # 3. 用参考策略 warm-start，求解非线性优化
    solution = solve_nmpc(problem, initial_guess=(u_ref, foot_ref, state_ref))

    # 4. 只执行第一步控制，下一周期重新规划
    return solution.control[0], solution.footstep[0]
```

##### 动机与背景

四足动态步态的 MPC 难点不只是动力学复杂，而是优化问题高度非凸。足端什么时候接触、身体该如何起伏、接触力如何分配、下一步落在哪里，这些变量相互耦合。纯手工 MPC 如果代价函数过弱，会出现奇怪的局部解；如果权重过强，又会只适合某一种步态。

PR-MPC 的思路是承认“已有控制经验”很有价值。Raibert 式脚步规则、步态相位表或学习得到的局部策略虽然不保证全局最优，但能给出合理运动模板。MPC 不必从空白空间搜索，而是在这些模板附近寻找满足动力学和约束的最优修正。

##### 优化目标

标准 MPC 通常写作：

$$
\min_{\mathbf{x}_{0:N}, \mathbf{u}_{0:N-1}}
\sum_{k=0}^{N-1}
\ell(\mathbf{x}_k,\mathbf{u}_k)
+ \ell_f(\mathbf{x}_N)
$$

$$
\text{s.t.}\quad
\mathbf{x}_{k+1}=f(\mathbf{x}_k,\mathbf{u}_k),\quad
\mathbf{c}(\mathbf{x}_k,\mathbf{u}_k)\le 0
$$

PR-MPC 在此基础上加入策略正则化：

$$
\ell_{PR} =
\ell_{task}(\mathbf{x}_k,\mathbf{u}_k)
+ \lambda_u \|\mathbf{u}_k-\pi_u(\mathbf{x}_k)\|^2
+ \lambda_p \|\mathbf{p}^{foot}_k-\pi_p(\mathbf{x}_k)\|^2
$$

其中 \(\pi_u\) 和 \(\pi_p\) 可以是启发式或学习策略输出的参考控制和参考脚步。这个项并不是硬约束：当环境、速度命令或动力学约束要求偏离参考时，MPC 仍可选择更优解。

> 💡 关键：PR-MPC 不是用策略替代 MPC，而是用策略改变 MPC 的搜索地形，让优化更容易找到“像正常步态”的可行解。

##### 为什么正则化能改善优化

非线性 MPC 在四足机器人上常遇到三个问题。第一，接触力和足端位置存在冗余，多种组合都能短期满足身体加速度，导致 Hessian 条件差。第二，不同步态的身体轨迹形态差异很大，同一组权重难以覆盖。第三，优化初值若离可行步态太远，求解器容易收敛到不自然局部极小值。

策略正则化提供了“软先验”。对于 trot，参考策略给出对角腿相位和对称脚步；对于 bound，给出前后腿成对运动；对于 gallop，给出非对称触地序列。MPC 代价会鼓励解靠近这些模式，同时由动力学约束确保接触力、摩擦锥和身体运动可行。

##### 训练/推理流程

PR-MPC 的在线控制周期通常是：

1. 根据用户速度命令和当前步态生成接触时序
2. 参考策略滚动预测未来 \(N\) 步脚步或控制先验
3. 以该先验 warm-start 非线性 MPC
4. 求解满足质心/单刚体动力学、摩擦锥、接触约束的轨迹
5. 执行第一段控制，下一控制周期重新感知和优化

这种 receding horizon 结构允许控制器持续修正模型误差和扰动。参考策略只需局部合理，不需要覆盖所有外部扰动。

##### 与传统 MPC 和纯学习策略的区别

传统 MPC 依赖模型和代价设计，约束满足强，但很吃调参和初值；纯学习策略推理快、泛化潜力高，但很难显式保证摩擦锥、接触力和身体动态一致性。PR-MPC 处在二者之间：策略负责提供行为先验，MPC 负责物理可行性和在线反馈。

这种思路后来在 High-MPC、Residual MPC、learning warm-start 和 RL-MPC 混合控制中反复出现。它的局限是参考策略质量会影响优化结果，而且非线性 MPC 的实时性仍然比后来的 Convex MPC 更难保证。

#### 🧪 练习题

```yaml
question: "PR-MPC 在 MPC 目标中加入策略正则化项的主要目的是什么？"
options:
  - "完全取消动力学模型，只保留神经网络策略"
  - "用参考策略引导优化到合理步态附近，同时保留 MPC 的约束修正能力"
  - "把所有接触约束改成无约束优化"
  - "只用于减少传感器噪声"
answer: 1
explain: "策略正则项提供软先验和 warm-start，改善非线性优化的条件数与局部收敛，同时 MPC 仍显式处理动力学和接触约束。"
```
