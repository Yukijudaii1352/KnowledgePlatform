### AMP — 对抗运动先验 (Adversarial Motion Priors)

```yaml
id: amp
name: AMP
full_name: 对抗运动先验 (Adversarial Motion Priors)
year: "2021"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2104.02180
category: rl_locomotion
parent: ppo
motivation: 对抗学习模仿自然动作风格
```

#### 📝 一句话总结

AMP 用对抗判别器从非结构化动作片段中学习“运动是否自然”的风格奖励，解决传统模仿学习需要手工设计跟踪误差、动作片段选择和相位同步的问题。它把任务奖励与运动先验奖励结合，使物理角色能完成目标任务的同时呈现接近 mocap 数据的自然动作风格。

#### 🎯 核心要点

- **运动先验判别器**：训练 \(D(\cdot)\) 区分参考动作片段和策略生成动作，判别器输出转为 style reward
- **无需相位同步**：不要求策略逐帧跟踪某条参考轨迹，也不需要 motion planner 选择片段
- **任务奖励 + 风格奖励**：高层目标由简单 task reward 定义，低层自然性由 adversarial motion prior 提供
- **非结构化数据可用**：动作库可以包含跑、跳、翻滚、攻击等多种片段，不需要任务级标注
- **与 PPO 结合训练**：策略通过 RL 最大化混合奖励，判别器通过二分类对抗训练同步更新
- **技能组合涌现**：在障碍穿越、击打目标等任务中，策略可自动组合数据集中不同运动风格
- **稳定化设计**：使用状态转移特征、梯度惩罚/正则和 replay 机制改善 adversarial RL 稳定性

#### 🔬 深入细节

##### 核心示意图

![AMP 框架总览](https://ar5iv.labs.arxiv.org/html/2104.02180/assets/figures/overview.png)
*图：AMP 将运动数据集训练成 Motion Prior，输出风格奖励 \(r_t^S\)，再与任务奖励 \(r_t^G\) 合并训练策略。*

##### 算法伪代码

```python
# AMP adversarial RL loop
for iteration in range(num_iterations):
    # 1. 用当前策略采样物理角色轨迹
    sim_traj = collect_rollouts(policy, env)
    ref_traj = sample_motion_clips(motion_dataset)

    # 2. 更新判别器：参考动作为真，策略动作为假
    for batch in discriminator_batches(sim_traj, ref_traj):
        d_ref = D(batch.ref_motion_features)
        d_sim = D(batch.sim_motion_features)
        disc_loss = bce(d_ref, ones) + bce(d_sim, zeros)
        disc_loss += gradient_penalty(D, batch)
        optimize(D, disc_loss)

    # 3. 判别器输出转为风格奖励
    style_reward = -log(max(1 - D(sim_traj.motion_features), eps))
    task_reward = compute_task_reward(sim_traj)
    total_reward = w_g * task_reward + w_s * style_reward

    # 4. PPO 更新控制策略
    advantages = compute_gae(total_reward, value_fn)
    ppo_update(policy, value_fn, sim_traj, advantages)
```

##### 动机与背景

物理角色控制有两个目标：完成任务和动作自然。传统 tracking-based imitation 会让角色追踪某条参考动作，奖励中手工比较关节角、速度、末端位置和身体姿态。这对单一技能很有效，但面对包含多种动作的大型数据集时，需要额外机制选择当前该跟踪哪段动作，还要处理相位对齐和片段切换。

AMP 的观点是：如果我们只需要“看起来像这个动作库的风格”，就不必逐帧跟踪某条轨迹。可以训练一个判别器判断策略产生的局部动作是否像真实 mocap 片段，然后把判别器信号作为奖励。这样任务由环境奖励指定，风格由数据集隐式指定。

##### Motion Prior 判别器

AMP 不直接对完整轨迹判别，而是对局部运动特征 \(\mathbf{s}_t, \mathbf{s}_{t+1}\) 或其组合判别。判别器训练目标可写为：

$$
\mathcal{L}_D =
-\mathbb{E}_{\mathbf{m}\sim \mathcal{M}}
[\log D(\mathbf{m})]
-\mathbb{E}_{\mathbf{s}\sim \pi}
[\log(1-D(\mathbf{s}))]
+ \lambda \mathcal{R}_{gp}
$$

其中 \(\mathcal{M}\) 是参考动作数据分布，\(\pi\) 是当前策略生成分布。训练好的 \(D\) 越认为策略动作接近参考数据，style reward 越高。

常用风格奖励形式为：

$$
r_t^S =
-\log(1-D(\mathbf{s}_t,\mathbf{s}_{t+1}))
$$

若策略动作骗过判别器，\(D\) 接近 1，奖励变大；若动作明显不像参考数据，奖励变小。

##### 任务奖励与风格奖励结合

总奖励为：

$$
r_t =
w^G r_t^G + w^S r_t^S
$$

\(r_t^G\) 可以非常简单，例如向目标方向移动、到达目标、击中物体或越过障碍；\(r_t^S\) 则负责动作质量。两者分工后，用户不需要为“自然跑步”“翻滚落地”“出拳姿态”分别写复杂奖励。

> 💡 关键：AMP 的 motion prior 是任务无关的。换任务时可复用同一动作数据集和判别式风格奖励，只需替换高层任务奖励。

##### 与 GAIL / DeepMimic 的区别

GAIL 通常从专家状态-动作对中学习策略占用分布，适合任务和演示强绑定的场景。DeepMimic 通过明确 tracking reward 跟踪指定参考动作，需要相位变量和目标姿态。AMP 则从非结构化 motion clips 中学习局部风格分布，不要求知道当前任务应对应哪条 clip。

| 方法 | 数据要求 | 是否相位同步 | 奖励设计 | 多技能数据 |
|------|----------|--------------|----------|------------|
| DeepMimic | 指定参考动作 | 需要 | 手工 tracking | 需选择片段 |
| GAIL | 专家轨迹 | 通常任务绑定 | 判别器奖励 | 依赖演示覆盖 |
| AMP | 非结构化动作片段 | 不需要 | 对抗风格奖励 + 任务奖励 | 天然支持 |

##### 训练稳定性

对抗式 RL 容易不稳定：判别器太强会让策略得不到有效奖励，判别器太弱又无法提供风格约束。AMP 通过多个工程设计缓解，包括选择合适的运动特征、对判别器做正则、保持生成样本缓存、与 PPO 的熵和价值估计配合。

在运动控制中，AMP 的影响超出了动画角色。后续人形/四足机器人工作常把它视为“从数据中学习自然运动奖励”的模板，用于替代难以手写的姿态、步态和能耗风格项。

##### 推理阶段

训练完成后，部署只需要策略网络；判别器通常不参与推理。策略输入角色状态和任务目标，输出 PD 目标或关节动作。自然运动风格已经内化到策略参数中，因此运行时开销与普通 PPO 策略相近。

#### 🧪 练习题

```yaml
question: "AMP 相比逐帧 tracking-based imitation 的核心优势是什么？"
options:
  - "完全不需要动作数据"
  - "不需要为每个时刻选择并同步具体参考片段，可从非结构化动作库学习通用风格奖励"
  - "只能学习单一周期步态"
  - "部署时必须持续运行判别器"
answer: 1
explain: "AMP 用判别器学习动作分布的自然性，而不是逐帧匹配某条轨迹，因此能处理多技能、非结构化 motion clips。"
```
