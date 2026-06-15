### WB-MPC — 全身模型预测控制 (Whole-Body MPC)

```yaml
id: wb_mpc
name: WB-MPC
full_name: 全身模型预测控制 (Whole-Body MPC)
year: "2022"
org: LAAS-CNRS
paper_url: https://ieeexplore.ieee.org/abstract/document/10000129
category: mpc
parent: convex_mpc
motivation: 全身动力学MPC控制人形机器人
```

#### 📝 一句话总结

WB-MPC 将人形机器人的全身状态、关节运动、接触和浮动基动力学放入同一个滚动时域优化中，解决了传统“简化模型 MPC + 下层 WBC”之间动态不一致的问题。Dantec 等人在 torque-controlled Talos 上展示了用全身模型预测控制直接生成双足步态的可行性。

#### 🎯 核心要点

- **全身模型进入预测时域**：优化变量包含浮动基、关节位置/速度、控制输入和接触相关量，而非只优化质心或单刚体
- **减少层级不一致**：高层轨迹不再由低维模型单独生成，降低下层 WBC 跟踪时发现不可行动作的风险
- **DDP/Crocoddyl 系列求解**：利用多体动力学导数和轨迹优化结构，在有限时域内滚动求解非线性最优控制
- **接触序列驱动步态**：给定左右脚接触相位后，优化器同时决定身体和关节如何穿过这些相位
- **真实人形机器人验证**：面向 torque-controlled Talos 等平台，强调在线重规划与物理部署
- **计算成本高但表达强**：相比 Convex MPC 更难实时，但能处理关节限位、姿态、全身惯量和动力学耦合

#### 🔬 深入细节

##### 核心示意图

![后续公开 WB-MPC 结构示意](https://ar5iv.labs.arxiv.org/html/2505.19540v1/assets/x1.png)
*图：全身/类全身 MPC 的模型结构示意。目标 IEEE 论文页面无稳定开放图片直链，这里采用后续公开 WB-MPC 论文图源说明“全身状态进入 MPC 预测模型”的核心思想。*

##### 算法伪代码

```python
# Whole-Body MPC 的滚动时域控制
def whole_body_mpc(q, v, contact_schedule, task_command, previous_solution):
    # q, v: 浮动基 + 全部关节状态
    problem = ShootingProblem()

    for k, contact_mode in enumerate(contact_schedule):
        model = full_rigid_body_dynamics(contact_mode)
        cost = 0
        cost += w_base * base_tracking_cost(k, task_command)
        cost += w_feet * swing_foot_clearance_cost(k, contact_mode)
        cost += w_posture * joint_posture_regularization(k)
        cost += w_control * torque_or_acceleration_regularization(k)
        constraints = [
            contact_consistency(contact_mode),
            joint_limits(),
            friction_or_contact_force_limits(),
        ]
        problem.add_stage(model, cost, constraints)

    # warm-start 上一次解，求解全身非线性 OCP
    solution = ddp_or_sqp_solve(problem, warm_start=previous_solution)

    # 执行第一步关节命令，下一周期重规划
    return solution.torque[0], solution
```

##### 动机与背景

经典人形步态系统通常分为三层：LIPM/Preview Control 规划 CoM 和 ZMP，全身控制器把轨迹转成关节加速度或力矩，低层伺服执行。这种架构清晰高效，但存在结构性问题：高层简化模型可能产生下层全身动力学无法精确实现的轨迹，下层只能用投影、QP 或反馈尽量修补。

WB-MPC 的目标是把这种分裂合并。既然真实机器人最终受全身多体动力学支配，那么预测模型也应尽量使用全身状态。这样优化器在规划未来几步时就知道关节限位、身体姿态、腿部运动和接触切换的代价，不会事后才发现某个 CoM 轨迹需要不可能的关节动作。

##### 全身最优控制问题

浮动基机器人状态可写为：

$$
\mathbf{x} =
\begin{bmatrix}
\mathbf{q} \\
\mathbf{v}
\end{bmatrix}
$$

其中 \(\mathbf{q}\) 包含基座位姿和全部关节角，\(\mathbf{v}\) 包含基座速度和关节速度。连续全身动力学为：

$$
M(\mathbf{q})\dot{\mathbf{v}} + h(\mathbf{q},\mathbf{v})
= S^T\boldsymbol{\tau} + J_c(\mathbf{q})^T\boldsymbol{\lambda}
$$

接触约束为：

$$
J_c(\mathbf{q})\dot{\mathbf{v}} + \dot{J}_c(\mathbf{q},\mathbf{v})\mathbf{v}=0
$$

WB-MPC 在有限时域内求解：

$$
\min_{\mathbf{x}_{0:N}, \mathbf{u}_{0:N-1}}
\sum_{k=0}^{N-1}\ell_k(\mathbf{x}_k,\mathbf{u}_k)
+ \ell_N(\mathbf{x}_N)
$$

$$
\text{s.t.}\quad
\mathbf{x}_{k+1}=f_k(\mathbf{x}_k,\mathbf{u}_k),\quad
\mathbf{g}_k(\mathbf{x}_k,\mathbf{u}_k)\le 0
$$

这里 \(f_k\) 随接触模式变化。相比只优化质心，WB-MPC 的状态维度高得多，但每个候选轨迹都更接近真实机器人可执行运动。

##### 代价函数设计

全身 MPC 的代价通常由多项组成：

- 基座姿态和速度跟踪：让机器人朝期望方向行走
- 摆动脚轨迹/清障：防止拖脚并控制落脚相位
- 关节姿态正则：避免奇异姿态和关节限位附近运动
- 控制平滑：惩罚力矩、加速度或其变化率
- 接触稳定：约束或惩罚非法接触力、脚底滑动和冲击

> 💡 关键：WB-MPC 的优势不是某个单独代价项，而是这些目标在同一个预测问题中同时权衡。躯干摆动、膝关节弯曲和脚步清障会自然互相影响。

##### 求解与实时性

全身非线性 OCP 的计算量远高于 Convex MPC。论文所处的技术背景包括 Crocoddyl、DDP/FDDP、快速刚体动力学导数和 warm-start。实际部署时，控制器通常不会从零开始求解，而是把上一周期轨迹平移作为初值，并只执行第一步命令。

这种 receding horizon 方式带来两个好处：一是扰动可在下一周期被重新吸收；二是求解器不必每次完全收敛到高精度，只要得到足够好的下降方向即可控制真实机器人。代价是工程实现对模型、时间同步和状态估计非常敏感。

##### 与 Convex MPC / WBC 的区别

Convex MPC 常用单刚体或质心动力学，将足端力优化成 QP，实时性强但忽略关节运动细节；WBC 通常是瞬时 QP，只看当前时刻如何实现任务；WB-MPC 则在未来时域内同时考虑全身动力学和任务演化。

| 方法 | 预测模型 | 计算速度 | 表达能力 | 典型问题 |
|------|----------|----------|----------|----------|
| Preview/LIPM | 固定高度质点 | 很快 | 低 | 高层简化过强 |
| Convex MPC | 单刚体/质心 | 快 | 中 | 关节可行性依赖下层 |
| WBC | 全身瞬时模型 | 快 | 中高 | 缺少未来规划 |
| WB-MPC | 全身时域模型 | 慢 | 高 | 实时求解困难 |

WB-MPC 的研究意义在于证明“全身模型直接滚动优化”正在从离线轨迹优化走向真实机器人在线控制。随着求解器和硬件进步，它逐渐成为人形机器人复杂运动的重要方向。

#### 🧪 练习题

```yaml
question: "WB-MPC 相比“简化模型 MPC + 下层 WBC”的核心优势是什么？"
options:
  - "完全不需要状态估计"
  - "在预测时域内直接考虑全身动力学和关节约束，减少高低层轨迹不一致"
  - "一定比 Convex MPC 计算更快"
  - "只适用于静态站立"
answer: 1
explain: "WB-MPC 将浮动基、关节和接触动力学纳入同一优化问题，规划阶段就能考虑全身可行性，而不是交给下层事后修正。"
```
