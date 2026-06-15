### 层次全身控制行走 (Hierarchical Whole-Body Control, HWC-Loco)

```yaml
id: hwc_loco
name: HWC-Loco
full_name: 层次全身控制行走 (Hierarchical Whole-Body Control)
year: '2025'
org: TUM
paper_url: https://www.researchgate.net/publication/389012345
category: wbc
parent: ihwbc
motivation: 鲁棒人形行走控制
```

#### 📝 一句话总结

HWC-Loco 将人形机器人运动学习拆成目标跟踪策略、安全恢复策略和高层切换策略，利用层次控制在“完成速度/动作目标”和“从危险状态恢复稳定”之间动态取舍，从而提升人形机器人在扰动、复杂地形和跨平台部署中的鲁棒性。

#### 🎯 核心要点

- **双低层策略**：Goal-tracking policy 负责高效人形行走，Safety recovery policy 负责从 hard kick、失衡和极端姿态中恢复
- **高层 Double-DQN selector**：输入与低层策略相同的本体观测，输出二维 Q 值，在两种低层策略之间切换
- **切换惩罚**：高层训练中加入 switch penalty，减少频繁抖动切换，保证行为连续
- **鲁棒优化视角**：把策略学习看作目标性能与安全恢复之间的约束/鲁棒优化，而不是单一奖励最大化
- **人类运动先验**：使用 CMU MoCap 行走、慢跑、跑步等 318 段 locomotion 数据进行 retargeting，形成更自然的人形行为
- **历史观测编码**：Actor 使用历史观测编码器和 merger 提取固定维特征，提高对速度、ZMP、姿态和外部扰动的感知
- **VAE 与特权信息估计**：用历史观测推断 latent 和特权状态，增强未知地形/动力学下的状态理解
- **多地形训练**：Isaac Gym 中训练 flats、obstacles、slopes、stairs，并用课程学习调整难度

#### 🔬 深入细节

##### 资料依据与框架图

> ⚠️ 说明：清单 `paper_url` 是 ResearchGate 风格占位链接，公开论文可检索为 `arXiv:2503.00923`，题名 *HWC-Loco: A Hierarchical Whole-Body Control Approach to Robust Humanoid Locomotion*。以下精读基于该公开 arXiv 版本；YAML 按清单原值保留。

![HWC-Loco 框架总览](https://arxiv.org/html/2503.00923v3/x2.png)
*图：HWC-Loco 先训练目标跟踪策略和安全恢复策略，再训练高层 selector 在两者之间切换，兼顾任务性能与安全恢复。*

##### 动机与背景

人形机器人行走策略常见问题是“正常状态性能很好，极端状态恢复很差”。如果把所有场景都放进一个 PPO 奖励里训练，策略要么为了安全变得过于保守，要么为了速度跟踪在强扰动下摔倒。HWC-Loco 的切入点是分层：把正常行走和危险恢复看成两类不同技能，再训练一个高层策略决定何时切换。

这与传统 WBC 的层次任务思想相似，但 HWC-Loco 的层次不是 QP 优先级，而是学习策略层面的层次：低层连续策略输出关节目标，高层离散策略负责选择“继续追踪目标”还是“进入恢复模式”。

##### 低层策略：目标跟踪与安全恢复

低层策略输入本体观测 \(o_t\)，包括基座角速度、roll/pitch、关节位置/速度、上一时刻动作和投影重力等；动作是关节目标位置，交给 PD 控制器生成力矩。目标跟踪策略通过 PPO 训练，奖励强调速度命令跟踪：

$$
r_{\text{track}} =
\exp(-\alpha_v\|v_{xy}-v_{xy}^{cmd}\|^2)
+ \exp(-\alpha_\omega|\omega_z-\omega_z^{cmd}|^2)
$$

同时加入能耗、安全和动作平滑约束，例如 torque、DoF velocity、DoF acceleration、action rate、碰撞和关节限位惩罚。训练地形包括平地、障碍、坡道和楼梯，并采用课程学习：当目标速度跟踪达到阈值时提高地形难度，低于阈值时降低难度。

恢复策略使用类似任务奖励，但速度跟踪容忍度更大，并加入站立/姿态恢复奖励：

$$
r_{\text{stand}} = \exp(-\alpha_q\|q-q_{\text{default}}\|^2)
$$

直觉是：危险状态下不应继续强迫机器人精确追踪速度命令，而应优先回到稳定可控的站立/行走状态。

##### 高层策略：Double-DQN 切换器

高层 selector 是一个离散动作策略：

$$
a_t^{H} \in \{\text{goal},\ \text{recovery}\}
$$

它输出两个 Q 值：

$$
Q_\psi(o_t,\text{goal}),\quad Q_\psi(o_t,\text{recovery})
$$

执行时选择 Q 值更大的低层策略。训练采用 Double-DQN，目标为：

$$
y_t = r_t + \gamma Q_{\bar{\psi}}\left(o_{t+1},
\arg\max_a Q_\psi(o_{t+1},a)\right)
$$

切换惩罚为：

$$
r_t^{H} = r_t^{task} - \lambda_{\text{switch}}\mathbf{1}[a_t^H \ne a_{t-1}^H]
$$

这样 selector 不会因为短期 Q 值波动在两个策略间高频抖动，而是在危险状态持续时进入 recovery，恢复后再切回 goal tracking。

##### 训练伪代码

```python
# HWC-Loco 训练流程伪代码
# Stage 1: 训练目标跟踪策略
pi_goal = train_ppo(
    terrains=["flat", "obstacle", "slope", "stairs"],
    reward=velocity_tracking + safety_energy_regularization,
    curriculum=True,
)

# Stage 2: 训练安全恢复策略
pi_recovery = train_ppo(
    initial_states=extreme_and_disturbed_states,
    reward=relaxed_velocity_tracking + standing_recovery + safety_regularization,
)

# Stage 3: 冻结低层策略，训练高层 Double-DQN selector
Q, Q_target = init_selector(), init_target()
replay = ReplayBuffer()
for episode in range(num_episodes):
    obs = env.reset()
    prev_mode = None
    while not done:
        mode = epsilon_greedy(Q(obs))  # goal or recovery
        switch_penalty = lambda_switch if mode != prev_mode else 0.0
        action = pi_goal(obs) if mode == "goal" else pi_recovery(obs)
        next_obs, task_reward, done = env.step(action)
        replay.add(obs, mode, task_reward - switch_penalty, next_obs, done)
        update_double_dqn(Q, Q_target, replay)
        obs, prev_mode = next_obs, mode
```

##### 历史编码、VAE 与人类先验

HWC-Loco 不只使用瞬时观测。Actor 先用 encoder 处理每个历史时刻的观测，再用 merger 聚合为固定维特征。这对人形机器人尤其重要，因为速度、接触状态、外部推搡和 ZMP 相关信息往往需要从短期历史中推断。

论文还引入 VAE：encoder 从历史观测输出 latent 和特权信息估计，decoder 从 latent 重建下一观测。这样的辅助学习让策略获得更稳定的隐式状态估计，类似 RMA/DreamWaQ 系列中“从历史推断环境”的思想。人类运动先验来自 CMU MoCap locomotion 数据，经过 skeleton 对齐、旋转/平移/尺度调整和关节映射，帮助目标跟踪策略形成更自然的人形步态。

##### 与传统 WBC / 单策略 RL 的区别

传统模型 WBC 通常通过任务优先级或 QP 约束显式保证安全，但对复杂扰动和多地形需要大量建模与调参。单策略 RL 虽部署简单，却把正常行走和极端恢复混在一个奖励里，容易出现安全-性能冲突。HWC-Loco 的折中是用学习策略表达复杂行为，用层次切换表达安全优先级。

> 💡 关键：HWC-Loco 的“层次”不是单纯多网络堆叠，而是把不同风险状态对应到不同控制目标。正常状态追求速度和人类式动作，危险状态放宽任务跟踪并优先恢复稳定。

#### 🧪 练习题

```yaml
question: "HWC-Loco 为什么要单独训练 safety recovery policy？"
options:
  - "为了替代 PD 控制器输出电流"
  - "为了在危险状态下放宽速度跟踪，优先恢复稳定姿态，再切回目标跟踪"
  - "为了只在平地上行走，避免复杂地形"
  - "为了把所有观测换成视觉图像"
answer: 1
explain: "正常行走和极端恢复的最优目标不同。恢复策略牺牲部分速度跟踪精度，强调站立、姿态和安全约束，高层 selector 在需要时切换到该策略。"
```
