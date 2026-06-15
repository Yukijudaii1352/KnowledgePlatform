### Teacher-Student RL — 特权学习框架 (Privileged Learning Framework)

```yaml
id: teacher_student
name: Teacher-Student RL
full_name: 特权学习框架 (Privileged Learning Framework)
year: "2020"
org: ETH Zurich
paper_url: https://www.science.org/doi/10.1126/scirobotics.abc5986
category: rl_locomotion
parent: ppo
motivation: 特权信息蒸馏实现零射Sim-to-Real迁移
```

#### 📝 一句话总结

Teacher-Student RL 先在仿真中训练可访问地形、接触和物理参数等特权信息的教师策略，再把其行为和潜变量蒸馏给仅使用本体感知历史的学生策略，解决了粗糙地形四足行走中真实部署无法获得完整环境状态的问题。该框架使 ANYmal 在泥地、雪地、碎石和植被等未仿真真实地形上实现零射迁移。

#### 🎯 核心要点

- **两阶段训练**：Teacher 用 RL 和 privileged information 学会粗糙地形运动，Student 用监督/DAgger 模仿 Teacher
- **特权信息编码**：Teacher 访问地形高度、足端接触、摩擦、外力等真实机器人部署时不可用信息
- **本体感知学生**：Student 只输入 IMU、关节状态、速度估计和历史序列，通过时间卷积推断隐含地形状态
- **自动地形课程**：用粒子滤波维护“既可通过又有挑战”的地形参数分布
- **PMTG 运动先验**：策略调制周期足端轨迹生成器，而不是从零输出全关节轨迹
- **零射 Sim-to-Real**：学生策略部署到 ANYmal B/C，无需真实微调即可穿越自然复杂地形
- **鲁棒反射行为涌现**：足部被卡、湿滑、负载变化等情况通过本体历史触发适应动作

#### 🔬 深入细节

##### 核心示意图

![Teacher-Student RL 方法总览](https://ar5iv.labs.arxiv.org/html/2010.11251/assets/x4.png)
*图：论文 Figure 4 展示两阶段训练、自动地形课程和控制架构。Teacher 使用特权信息训练，Student 通过本体感知历史模仿并部署到真实机器人。*

##### 算法伪代码

```python
# Privileged Teacher -> Proprioceptive Student
def train_teacher_student(env_generator):
    teacher = MLPPolicy(obs="proprioception + privileged_info")
    student = TCNPolicy(obs="history_of_proprioception")

    # Phase 1: teacher RL
    for iteration in range(num_teacher_updates):
        terrains = env_generator.sample_curriculum()
        rollouts = collect_rollouts(teacher, terrains)
        update_teacher_with_trpo_or_ppo(teacher, rollouts)
        env_generator.update_by_traversability(rollouts)

    # Phase 2: student distillation with DAgger
    replay = []
    for iteration in range(num_student_updates):
        rollouts = collect_rollouts(student, env_generator.sample_curriculum())
        for state in rollouts.states:
            target_action, target_latent = teacher.query_with_privileged_info(state)
            replay.append((state.proprioceptive_history, target_action, target_latent))
        loss = mse(student.action, target_action) + beta * mse(student.latent, target_latent)
        optimize(student, replay, loss)

    return student
```

##### 动机与背景

粗糙地形行走需要知道很多机器人本体传感器看不到的东西：脚下石块是否会滚动、泥地摩擦系数是多少、足端是否被草或障碍卡住、局部坡度和高度如何变化。直接训练一个只看本体感知的策略，奖励稀疏且状态部分可观测，学习难度很高。

但在仿真中，这些信息是可以免费读取的。Teacher-Student 框架利用这一点：让教师在“作弊”的全观测条件下先学会正确行为，再要求学生从真实可用的历史观测中推断教师的隐含判断。这是一种面向 sim-to-real 的 privileged learning。

##### Teacher 的 MDP

Teacher 状态可分为两部分：

$$
s_t^{T} = [o_t, p_t]
$$

其中 \(o_t\) 是真实机器人可测的本体信息，如机体姿态、速度、关节角、关节速度和命令方向；\(p_t\) 是特权信息，如地形扫描点、接触状态、接触力、摩擦系数和扰动力。Teacher 策略输出：

$$
a_t^T, z_t^T = \pi_T(o_t, p_t)
$$

\(z_t^T\) 是对特权环境的潜在表示，\(a_t^T\) 是对运动生成器的调制命令。论文中 Teacher 使用 RL 训练，目标是沿命令方向前进，同时保持稳定、平滑和不过度碰撞。

##### Student 蒸馏

Student 无法访问 \(p_t\)，只看到一段本体历史：

$$
h_t = [o_{t-H+1}, \ldots, o_t]
$$

学生策略为：

$$
a_t^S, z_t^S = \pi_S(h_t)
$$

训练损失通常包含动作模仿和潜变量模仿：

$$
\mathcal{L}_{student}
=
\|a_t^S-a_t^T\|_2^2
+ \beta \|z_t^S-z_t^T\|_2^2
$$

这使 Student 不只是复制动作，还学习从本体历史中重建教师对地形/接触状态的隐含估计。例如脚被台阶卡住时，关节速度、位置误差和机体姿态历史会留下信号，TCN 可以据此触发抬脚反射。

> 💡 关键：Student 并没有“看到地形”，但它通过时间序列推断地形对身体产生的影响。这是该方法能在无视觉条件下穿越复杂自然地形的核心。

##### 自动地形课程

训练地形如果太简单，策略不会学到适应能力；如果太难，RL 几乎得不到有效奖励。论文使用自适应课程：用地形参数生成不同难度样本，评估策略 traversability，把采样分布集中在“成功率中等”的区域。

可把地形参数记为 \(\theta\)，可通行性为：

$$
T(\theta, \pi)=
\mathbb{E}[\mathbf{1}(\text{trajectory succeeds})]
$$

期望采样那些 \(T\) 既不接近 0 也不接近 1 的 \(\theta\)。粒子滤波维护这些参数的分布，随着策略变强，地形难度自动上升。

##### 控制架构：PMTG + 残差

策略没有直接输出 12 个关节力矩，而是调制 Policies Modulating Trajectory Generators。每条腿有周期相位和足端轨迹生成器，策略输出频率偏置、相位调制和足端残差，再通过解析 IK 和关节 PD 控制执行。

这种设计把“周期步态”作为先验交给控制结构，RL 重点学习如何在复杂地形中调整步高、落脚和姿态。相比端到端力矩策略，它更容易训练，也更利于真实机器部署。

##### 与普通 Domain Randomization 的区别

域随机化只是在训练中随机物理参数，希望策略对变化不敏感；Teacher-Student 则把随机化后的隐藏因素显式提供给 Teacher，并把其适应方式蒸馏给 Student。前者强调鲁棒不变性，后者强调从观测历史中进行在线隐式辨识。

这也带来限制：Student 能推断的环境因素必须在本体历史中留下可观测痕迹。对于悬崖、远处障碍或需要提前规划的视觉任务，纯本体感知学生仍然不足，需要外感知模块扩展。

#### 🧪 练习题

```yaml
question: "Teacher-Student RL 中 Teacher 可以访问 privileged information 的主要作用是什么？"
options:
  - "让真实机器人部署时也读取仿真内部状态"
  - "降低训练难度并产生可模仿的适应行为，再蒸馏给只用真实可测本体感知的 Student"
  - "替代所有奖励函数"
  - "保证 Student 不需要历史观测"
answer: 1
explain: "Teacher 在仿真中利用地形、接触等特权信息学会适应策略，Student 通过模仿动作和潜变量，从本体历史中间接恢复这些信息。"
```
