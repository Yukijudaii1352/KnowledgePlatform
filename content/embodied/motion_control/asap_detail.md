### ASAP：残差动作学习对齐仿真与真实人形动力学

```yaml
id: asap
name: ASAP
full_name: 残差动作学习 (ASAP Delta Action Learning)
year: "2025"
org: Stanford
paper_url: https://arxiv.org/abs/2504.12609
category: sim2real
parent: rma
motivation: 残差动作补偿弥合仿真差距
```

#### 📝 一句话总结

ASAP 提出两阶段 sim-to-real 框架：先在仿真中用人类动作重定向训练人形全身跟踪策略，再用真实机器人 rollout 学习 delta action 残差模型并嵌入仿真微调策略，从而补偿动力学差距并实现更敏捷的真实人形动作。

#### 🎯 核心要点

- 提出 **ASAP (Aligning Simulation and Real Physics)**，目标是让人形机器人执行跳跃、踢腿、舞蹈等高动态全身技能
- 使用人类视频/动作数据重建 SMPL 运动，并通过 motion retargeting 转成 Unitree G1 等人形机器人可执行目标
- 第一阶段在仿真中训练 motion tracking policy，得到可在真实机器人上 rollout 的初始策略
- 第二阶段收集真实 rollout，训练 **delta action model**，用残差动作修正仿真状态转移，使仿真更接近真实物理
- 将冻结的 delta action model 接入 simulator，对原策略继续 fine-tune，最终部署时只使用策略本身
- 评估覆盖 IsaacGym→IsaacSim、IsaacGym→Genesis、IsaacGym→真实 Unitree G1 三种迁移场景
- 相比 SysID、Domain Randomization、delta dynamics 等基线，ASAP 更少牺牲动作敏捷性，能降低真实跟踪误差

#### 🔬 深入细节

##### 核心示意图

![ASAP 方法流程图](https://agile.human2humanoid.com/static/images/ASAP_pipeline-crop.png)
*图：ASAP 的四步流程：运动跟踪预训练与真实轨迹采集、delta action model 训练、带对齐仿真的策略微调、真实部署。*

> ⚠️ 依据限制：清单中的 `paper_url` 指向 arXiv:2504.12609（Human2Sim2Robot），不是 ASAP 论文。以下内容基于 ASAP 官方项目页与正确公开论文 arXiv:2502.01143，YAML 元信息按任务清单原样保留。

##### 算法伪代码

```python
# ASAP: delta action model for sim-to-real humanoid skills

# Stage 1: motion tracking pre-training in simulation
for motion in retargeted_human_motions:
    for rollout in simulator:
        a_t = policy(s_t, motion_phase, motion_target)
        s_next = simulator.step(a_t)
        r = tracking_reward(s_next, motion_target)
        update_policy_with_rl(r)

# Collect real trajectories with the pretrained policy
real_buffer = []
for episode in real_robot_rollouts:
    a_t = policy(s_t)
    s_real_next = robot.step(a_t)
    real_buffer.append((s_t, a_t, s_real_next))

# Stage 2: train delta action model to align simulated transition
for s_t, a_t, s_real_next in real_buffer:
    delta_a = delta_model(s_t, a_t)
    s_sim_next = simulator.step(a_t + delta_a)
    loss_delta = mse(features(s_sim_next), features(s_real_next))
    update(delta_model, loss_delta)

# Fine-tune policy inside aligned simulator
freeze(delta_model)
for rollout in aligned_simulator:
    a_t = policy(s_t)
    s_next = simulator.step(a_t + delta_model(s_t, a_t))
    r = tracking_reward(s_next, target_motion)
    update_policy_with_rl(r)

# Deployment: use policy only; delta model served its role during fine-tuning
deploy(policy)
```

##### 方法详解

**动机与背景：为什么 SysID 和域随机化不够？**

高动态人形动作对仿真误差极其敏感。慢速行走可以通过保守策略、摩擦随机化和关节增益调参获得一定鲁棒性，但跳跃、侧移、踢腿、快速转身会放大每个接触、执行器和惯量误差。传统 SysID 试图找到一组更准确的物理参数，但真实硬件中未建模因素很多；域随机化能提高鲁棒性，却容易让策略变保守，牺牲敏捷动作。

ASAP 的核心判断是：与其只改 simulator 参数，不如学习一个“动作侧的残差补偿器”。这个补偿器不直接替换真实动力学，而是在仿真训练时告诉 simulator：如果真实机器人执行 \(a_t\) 会产生某种状态变化，那么仿真中应该用 \(a_t + \Delta a_t\) 才能产生相似后果。

**核心机制一：从人类动作到机器人 motion tracking**

ASAP 首先从人类运动中获得高层动作目标。人类视频经过姿态估计/SMPL 重建后得到人体运动，再通过 retargeting 转成机器人目标姿态。由于人和机器人形态不同，直接复制关节角不可行，训练过程使用 RL 让机器人在自身动力学约束下跟踪目标运动。

策略可写成：

$$
a_t = \pi_\theta(s_t, g_t)
$$

其中 \(s_t\) 是机器人状态，\(g_t\) 是当前相位对应的人类重定向运动目标。奖励通常包含关键点位置、关节姿态、基座速度、接触稳定性和能量项。第一阶段目标不是完美真实部署，而是得到一个足够接近目标技能、能安全收集真实 rollout 的初始策略。

**核心机制二：delta action model 学仿真到真实的转移差异**

给定真实 rollout 数据 \((s_t, a_t, s^r_{t+1})\)，ASAP 学习残差模型：

$$
\Delta a_t = f_\phi(s_t, a_t)
$$

然后让仿真执行：

$$
s^s_{t+1} = F_{sim}(s_t, a_t + \Delta a_t)
$$

训练目标是让仿真下一状态接近真实下一状态：

$$
\mathcal{L}_{\Delta} =
\left\| \psi(s^s_{t+1}) - \psi(s^r_{t+1}) \right\|_2^2
$$

这里 \(\psi(\cdot)\) 可以选择关键的状态特征，例如基座姿态、关节状态、足端接触和速度。相比直接学习 \(\Delta s\) 的 delta dynamics，delta action 的好处是仍然让物理引擎承担大部分动力学约束，残差只在动作接口处调节，减少生成不物理状态的风险。

> 💡 关键：ASAP 不是把真实机器人数据拿来训练一个黑盒动力学模型，而是把残差模型嵌入仿真动作通道，让策略在“更像真实世界的仿真”里继续用 RL 改进。

**核心机制三：对齐仿真中的策略微调**

训练好 delta action model 后，ASAP 将其冻结并接入仿真环境。策略继续输出原始动作 \(a_t\)，仿真执行 \(a_t + f_\phi(s_t, a_t)\)。这一步的意义是让策略在训练时体验真实硬件会产生的动力学偏差，从而主动学会补偿。

最终部署到真实机器人时，ASAP 不需要把 delta model 放在线上控制环里。因为微调后的策略参数已经吸收了这种对齐关系。这一设计让部署系统更简单，也避免残差模型在线推理带来的额外延迟和安全边界问题。

**与传统方法的区别**

SysID 调的是 simulator 参数，假设误差能被少量物理参数解释；Domain Randomization 扩大训练分布，假设真实世界落在随机化包络内；Residual dynamics 学状态变化补偿，容易绕开物理约束。ASAP 的 delta action 位于动作接口，既保留物理仿真的结构先验，又能用真实 rollout 学到复杂误差。

对运动控制而言，ASAP 的价值在于保住“敏捷性”。许多 sim-to-real 方法为了安全会让策略动作变钝，而 ASAP 通过更准确地对齐训练环境，让高动态动作仍能维持节奏、幅度和全身协调。

#### 🧪 练习题

```yaml
question: "ASAP 中 delta action model 的主要作用是什么？"
options:
  - "直接替代真实机器人控制策略，在部署时输出全部动作"
  - "在仿真中给策略动作加残差，使仿真转移更接近真实机器人"
  - "把人类视频直接转换成机器人关节角并跳过强化学习"
  - "随机化所有物理参数，使策略完全不依赖仿真精度"
answer: 1
explain: "ASAP 用真实 rollout 训练 delta action model，在仿真中执行 a_t + Δa_t 来对齐真实动力学；策略随后在该对齐仿真中微调，部署时主要使用微调后的策略。"
```
