### Legged Gym — 四足训练框架 (Legged Gym Framework)

```yaml
id: legged_gym
name: Legged Gym
full_name: 四足训练框架 (Legged Gym Framework)
year: "2021"
org: ETH Zurich
paper_url: https://github.com/leggedrobotics/legged_gym
category: rl_locomotion
parent: ppo
motivation: GPU并行RL训练四足行走开源框架
```

#### 📝 一句话总结

Legged Gym 将 Isaac Gym 的 GPU 并行物理仿真、PPO 训练、地形课程、域随机化和四足机器人任务封装成开源训练框架，解决了 legged locomotion RL 训练慢、复现难和 sim-to-real 组件分散的问题。它把数千个机器人环境放在单 GPU 上并行 rollout，使 ANYmal 等四足策略能在几十分钟量级完成训练。

#### 🎯 核心要点

- **端到端 GPU pipeline**：物理仿真和 PyTorch 训练都在 GPU 上，减少 CPU-GPU 数据搬运瓶颈
- **大规模并行环境**：典型配置同时运行 2048-4096 个机器人，提高 PPO on-policy 样本吞吐
- **粗糙地形课程**：机器人从简单地形逐步推进到台阶、斜坡、离散障碍等更难地形
- **PPO + rsl_rl**：使用高吞吐 actor-critic PPO 作为默认训练算法
- **Sim-to-Real 组件齐全**：摩擦/质量随机化、观测噪声、随机推搡、执行器网络等提高真实迁移鲁棒性
- **任务配置模块化**：环境、奖励、机器人资产、控制参数通过配置类组织，便于迁移到新机器人
- **开源生态影响**：成为后续 legged RL、humanoid-gym、parkour、RMA/teacher-student 实验的重要基础设施

#### 🔬 深入细节

##### 核心示意图

![Legged Gym 大规模并行训练](https://ar5iv.labs.arxiv.org/html/2109.11978/assets/x1.png)
*图：Learning to Walk in Minutes 中的 Isaac Gym 大规模并行四足训练场景。Legged Gym 仓库提供了这类训练环境和 sim-to-real 组件。*

##### 算法伪代码

```python
# Legged Gym 风格的 PPO 训练循环
env = LeggedRobot(num_envs=4096, terrain_curriculum=True, domain_randomization=True)
policy = ActorCritic(obs_dim=env.num_obs, action_dim=env.num_actions)
runner = PPORunner(env, policy)

for iteration in range(max_iterations):
    obs = env.get_observations()
    rollout = []
    for t in range(num_steps_per_env):
        action = policy.act(obs)
        obs_next, reward, done, info = env.step(action)
        rollout.append((obs, action, reward, done, info))
        obs = obs_next

    advantages, returns = runner.compute_returns(rollout)
    runner.ppo_update(rollout, advantages, returns)
    env.update_terrain_curriculum()
    env.randomize_physics_if_needed()
```

##### 动机与背景

PPO 虽然稳定，但 on-policy 样本效率不高。传统 CPU 仿真一次只能跑几十到几百个环境，四足机器人需要数亿步交互，训练周期很长。Isaac Gym 的关键突破是把 PhysX 仿真和张量接口放到 GPU，Legged Gym 则把这个能力整理成专门面向腿式机器人的训练框架。

仓库 README 明确强调它提供训练 ANYmal 和其他腿式机器人的环境，并包括 sim-to-real 所需的执行器网络、摩擦和质量随机化、观测噪声、随机推搡等组件。配套论文 Learning to Walk in Minutes 进一步分析了并行机器人数量、batch size 和训练时间的关系。

##### 环境与观测动作设计

典型 Legged Gym 任务中，策略输入包括：

- 机体线速度和角速度
- 重力方向在机体系下的投影
- 速度命令
- 关节位置和速度
- 上一时刻动作
- 可选地形高度采样点

策略动作通常不是直接力矩，而是关节目标位置残差：

$$
\mathbf{q}^{target}_t =
\mathbf{q}^{default} + \alpha \mathbf{a}_t
$$

底层 PD 控制器生成力矩：

$$
\boldsymbol{\tau}
= K_p(\mathbf{q}^{target}-\mathbf{q})
- K_d\dot{\mathbf{q}}
$$

这种动作空间降低了探索难度，也让真实机器人部署更稳健。

##### 奖励函数

奖励通常是多项加权和：

$$
r =
w_v r_{velocity}
+ w_\omega r_{yaw}
- w_\tau \|\boldsymbol{\tau}\|^2
- w_{\Delta a}\|\mathbf{a}_t-\mathbf{a}_{t-1}\|^2
- w_c r_{collision}
+ w_s r_{survival}
$$

核心项鼓励跟踪线速度和角速度命令，惩罚非期望方向速度、姿态偏差、力矩、关节加速度、动作变化和身体碰撞。Legged Gym 的工程价值在于这些奖励和终止条件被组织成可配置函数，方便不同机器人复用。

> 💡 关键：Legged Gym 的贡献不只是“跑 PPO”，而是把可迁移的 locomotion 训练配方工程化，包括观测、动作、奖励、课程、随机化和日志。

##### 大规模并行与 PPO

在大规模并行下，每次 PPO 更新的 batch 来自许多短轨迹。论文观察到并行数并非越大越好：环境数太多而每个环境 rollout 太短时，单个机器人的时间相关经验不足，会影响学习；环境数太少则样本多样性和吞吐不足。实践中 2048-4096 个环境常是较好折中。

这种结构非常适合 GPU：所有机器人状态、动作、奖励和重置都以张量形式批处理，PPO 更新也在同一设备上完成。相比传统仿真，训练时间从天级缩短到分钟/小时级。

##### Sim-to-Real 机制

Legged Gym 默认集成多种迁移技巧：

- 摩擦系数随机化：让策略适应不同地面
- 质量和质心随机化：提高模型误差鲁棒性
- 观测噪声：模拟真实 IMU 和关节编码器误差
- 随机推搡：训练抗扰恢复能力
- 执行器网络：用神经网络近似 SEA/电机动态，弥合仿真 PD 与真实执行器差异

这些组件共同减少 reality gap。单独使用 PPO 往往只能得到仿真内高分策略；加入随机化和执行器建模后，策略更可能零射部署。

##### 与单篇算法论文的区别

Legged Gym 更像“可复现实验系统”而不是单一控制算法。其理论基础来自 PPO、域随机化、课程学习和 Isaac Gym GPU 仿真；贡献在于把这些要素组合成标准化、可扩展代码库。它降低了 legged RL 的进入门槛，也使后续论文能以统一平台比较奖励、观测和网络结构。

限制也很明确：框架依赖 Isaac Gym 预览版生态，任务仍需要大量奖励调参；学到的策略通常对训练命令分布和机器人形态敏感，迁移到人形或极端地形时需要改造环境、奖励和随机化设置。

#### 🧪 练习题

```yaml
question: "Legged Gym 能显著缩短四足 RL 训练时间的关键原因是什么？"
options:
  - "完全不使用物理仿真"
  - "将大量机器人环境和 PPO 张量计算放在 GPU 上并行执行"
  - "只训练单个关节控制器"
  - "取消所有域随机化"
answer: 1
explain: "Legged Gym 基于 Isaac Gym 的 GPU pipeline，可同时运行数千个环境并直接把仿真数据用于 PyTorch PPO 更新，大幅提高 on-policy 样本吞吐。"
```
