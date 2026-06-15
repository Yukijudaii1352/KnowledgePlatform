### 快速运动自适应 (Rapid Motor Adaptation, RMA)

```yaml
id: rma
name: RMA
full_name: 快速运动自适应 (Rapid Motor Adaptation)
year: '2021'
org: UC Berkeley
paper_url: https://www.science.org/doi/10.1126/scirobotics.abk2822
category: sim2real
parent: domain_rand
motivation: 在线自适应网络实时调整策略
```

#### 📝 一句话总结

RMA 提出“基础策略 + 在线适应模块”的两阶段训练框架：基础策略在仿真中使用特权环境参数 latent 学习运动，适应模块在部署时仅从最近的本体历史估计该 latent，使四足机器人能实时适应摩擦、载荷、地形高度和执行器差异等未知变化。

#### 🎯 核心要点

- **两子系统架构**：Base policy \(\pi\) 负责 100 Hz 关节目标输出，adaptation module \(\phi\) 以较低频率从历史观测预测 extrinsics latent
- **特权环境因子编码器**：训练阶段用环境参数 \(e_t\) 经 encoder \(\mu\) 生成 latent \(z_t\)，作为基础策略输入
- **两阶段训练**：先用 RL 训练带特权 latent 的基础策略，再冻结基础策略，用监督学习训练 \(\phi\) 从历史状态-动作估计 \(z_t\)
- **纯本体在线适应**：部署时不需要视觉、真实参数测量或在线梯度更新，只用最近状态和动作历史估计环境变化
- **异步设计**：适应模块 10 Hz 更新 latent，基础策略 100 Hz 使用最近 latent 输出动作，适合低算力板载部署
- **广泛随机化环境参数**：训练中随机化摩擦、质量、质心、惯量、地形高度、外力、关节增益和电机参数
- **真实鲁棒性验证**：在油滑塑料、泡沫、台阶、斜坡和负载变化下，相比无适应策略和厂商控制器表现更稳

#### 🔬 深入细节

##### 核心框架图

![RMA 训练与部署框架](https://ar5iv.labs.arxiv.org/html/2107.04034/assets/x1.png)
*图：RMA 上半部分为两阶段训练：基础策略使用特权 extrinsics latent；适应模块学习从历史观测预测 latent。下半部分为部署：只用本体历史在线估计 latent 并驱动基础策略。*

##### 动机与背景

Domain Randomization 让策略在许多仿真参数上平均鲁棒，但它本质上训练的是一个“对所有情况都还可以”的策略。当机器人突然背上重物、踩到油滑地面或走上软泡沫时，最优动作其实应该快速改变：需要更大力矩、更短支撑周期、更谨慎的摆腿，或者更保守的速度响应。若策略无法知道当前处于哪种环境，只能学到折中行为。

RMA 的核心问题是：能否在不使用真实参数传感器、不在线反向传播的情况下，让机器人从自身运动历史推断当前环境？答案是把可观测历史映射到一个低维 extrinsics latent，再让基础策略条件化于这个 latent。

##### 阶段一：带特权 latent 的基础策略

仿真中环境因子 \(e_t\) 是已知的，例如摩擦、payload、质心偏移、地形高度和电机强度。RMA 用 encoder \(\mu\) 将其压缩为：

$$
z_t = \mu(e_t)
$$

基础策略输入当前观测 \(x_t\)、上一动作 \(a_{t-1}\) 和 latent：

$$
a_t = \pi_\theta(x_t, a_{t-1}, z_t)
$$

策略通过 model-free RL 训练：

$$
\theta^* =
\arg\max_\theta
\mathbb{E}_{e\sim p(e),\tau\sim\pi_\theta}
\sum_t \gamma^t r_t
$$

因为 \(\pi\) 能看到真实 \(z_t\)，它可以学会“在低摩擦时怎样走、在高负载时怎样走、在粗糙地形时怎样抬腿”。这一步相当于训练一个环境条件化专家。

##### 阶段二：从历史观测估计 latent

真实部署时 \(e_t\) 不可见，因此 RMA 训练适应模块 \(\phi\)：

$$
\hat{z}_t =
\phi(x_{t-k:t}, a_{t-k:t-1})
$$

监督目标是匹配阶段一中的特权 latent：

$$
\mathcal{L}_{\text{adapt}} =
\|\phi(x_{t-k:t},a_{t-k:t-1}) - \mu(e_t)\|_2^2
$$

训练数据来自基础策略在随机化仿真中的 on-policy rollout。这样 \(\phi\) 学到的是“在策略真实会遇到的状态分布上，哪些历史运动模式对应哪些环境因子”。例如低摩擦会导致足端打滑、速度跟踪误差和关节力矩模式变化；额外 payload 会造成机身下沉和更大腿部负载，这些都能从历史本体信号中推断。

##### 训练与部署伪代码

```python
# Phase 1: privileged base policy training
for iteration in range(rl_updates):
    e = sample_environment_factors()      # friction, mass, terrain, motor params
    z = mu(e)                             # privileged extrinsics latent
    for t in rollout:
        action = pi(x_t, a_prev, z)
        x_next, reward = env.step(action)
    PPO_or_RL_update(pi, mu, reward)

# Phase 2: adaptation module training
freeze(pi, mu)
dataset = collect_on_policy_rollouts(pi, randomized_envs)
for batch in dataset:
    hist = batch.states_actions_history
    z_target = mu(batch.privileged_environment_factors)
    z_hat = phi(hist)
    update(phi, mse(z_hat, z_target))

# Deployment
while robot_is_running:
    if adaptation_tick_10hz:
        z_hat = phi(recent_state_action_history)
    action = pi(current_state, previous_action, z_hat)  # 100 Hz
    send_pd_target(action)
```

##### 为什么 RMA 比“纯随机化鲁棒策略”更强

纯 domain randomization 会把所有环境变化平均到一个策略中。如果环境差异很大，策略需要选择保守动作以覆盖最坏情况。RMA 则将随机化环境中的可变因素编码成条件变量，使基础策略可以在同一个网络里表达多种行为模式：

$$
\pi(a|x) \quad \rightarrow \quad \pi(a|x,\hat{z})
$$

这相当于把“鲁棒性”从静态折中变成在线识别。适应模块每 0.1 秒更新一次 latent，基础策略不需要在线学习就能改变输出模式，因此适合真实机器人实时控制。

##### 实验直觉

论文展示了油滑塑料地面实验：机器人进入低摩擦区域后，\(\hat{z}\) 的某些维度快速变化，膝关节力矩增大，步态周期恢复到接近正常。这说明适应模块并不是识别出“摩擦系数数值”，而是输出一个对策略有用的隐式环境编码。

在负载实验中，机器人背部被增加 5 kg 沙袋后，机身瞬间下沉，\(\hat{z}\) 迅速跳变并维持在新状态，策略随之提高支撑力。对 12 kg 左右的 A1 机器人而言，5 kg 是显著载荷，这验证了 latent 适应的实际价值。

##### 与 Teacher-Student 感知方法的关系

RMA 与 Perceptive Locomotion/DreamWaQ 的共同点是都用特权信息训练、部署时用可观测历史估计隐状态。区别在于 RMA 的 latent 主要描述动力学和外部环境因子，输入只依赖本体感知；Perceptive Locomotion 额外使用外感地图；DreamWaQ++ 则进一步融合外感和本体 latent。RMA 因此是许多后续运动策略“在线适应模块”的基础模板。

> 💡 关键：RMA 的适应模块不是在线优化器，而是一个前馈历史编码器。它把最近运动误差转换为策略可用的环境 latent，实现毫秒级自适应。

#### 🧪 练习题

```yaml
question: "RMA 部署时 adaptation module 预测的是什么？"
options:
  - "真实世界的精确摩擦系数和质量标量"
  - "从最近本体状态和动作历史估计的 extrinsics latent，用于条件化基础策略"
  - "未来相机图像"
  - "MPC 的完整接触力序列"
answer: 1
explain: "RMA 的适应模块不需要显式输出物理参数，而是预测训练阶段特权环境因子 encoder 产生的低维 latent，基础策略用该 latent 实时调整动作。"
```
