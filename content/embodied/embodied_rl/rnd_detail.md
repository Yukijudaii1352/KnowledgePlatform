### RND — 随机网络蒸馏 (Random Network Distillation)

```yaml
id: rnd
name: RND
full_name: 随机网络蒸馏 (Random Network Distillation)
year: '2018'
org: OpenAI
paper_url: https://arxiv.org/abs/1810.12894
category: reward_design
parent: icm
motivation: 随机网络蒸馏衡量状态新颖性
```

#### 📝 一句话总结

RND 提出用一个固定随机目标网络和一个可训练预测网络之间的预测误差作为内在奖励，解决稀疏奖励环境中“状态是否新颖”难以稳定估计的问题。它把探索信号从复杂的动力学预测改成简单的特征蒸馏误差，因此在 Montezuma's Revenge 等硬探索 Atari 任务上显著提升样本效率。

#### 🎯 核心要点

- **双网络新颖性估计**：固定随机目标网络 \(f\) 产生观测特征，可训练预测网络 \(\hat f_\theta\) 学习预测该特征
- **内在奖励**：使用 \(\|\hat f_\theta(o_t)-f(o_t)\|_2^2\) 衡量预测误差，误差越大说明状态越少见
- **与 PPO 结合**：论文主要把 RND 奖励加入 PPO 训练流程，策略同时最大化外在奖励和内在奖励
- **奖励归一化**：对观测、内在奖励和外在奖励做运行统计归一化，减少尺度漂移
- **双 Value 头**：分别估计外在回报和内在回报，因为两类奖励的折扣因子和动态范围不同
- **抗“噪声电视”问题**：目标网络固定且随机，预测误差只随访问频率下降，不直接追逐环境随机性
- **硬探索验证**：重点实验在 Montezuma's Revenge、Gravitar、Pitfall 等 Atari 稀疏奖励任务上展开

#### 🔬 深入细节

##### 整体机制示意图

![RND 随机网络蒸馏机制](https://ar5iv.labs.arxiv.org/html/1810.12894/assets/x1.png)

*图：RND 使用固定随机目标网络提供不可学习的特征目标，预测网络只在访问过的状态上逐渐降低误差，剩余误差被解释为探索奖励。*

##### 算法伪代码

```python
# Random Network Distillation + PPO 伪代码
initialize fixed random target network f
initialize predictor network f_hat_theta
initialize policy pi_phi and two value heads V_ext, V_int
initialize replay/statistics for observation and reward normalization

for iteration in range(num_updates):
    trajectories = []
    for t in range(rollout_length):
        o_t = normalize_obs(env.obs)
        a_t = pi_phi.sample(o_t)
        o_next, r_ext, done = env.step(a_t)

        # RND intrinsic reward
        target = stop_gradient(f(normalize_obs(o_next)))
        pred = f_hat_theta(normalize_obs(o_next))
        r_int = mean_squared_error(pred, target)

        trajectories.append(o_t, a_t, r_ext, r_int, done)

    # 分别估计外在与内在优势，再合成为 PPO 优化信号
    adv_ext = GAE(trajectories.r_ext, V_ext, gamma_ext)
    adv_int = GAE(normalize(trajectories.r_int), V_int, gamma_int)
    adv = adv_ext + beta * adv_int

    update pi_phi with PPO clipped objective using adv
    update V_ext and V_int with value regression losses
    update f_hat_theta to minimize ||f_hat_theta(o) - f(o)||^2
```

##### 动机与背景

硬探索任务的困难不在于局部控制，而在于智能体很长时间都收不到外在奖励。例如 Montezuma's Revenge 中，随机策略很难偶然完成“取钥匙、避开敌人、打开门”等长序列动作。传统基于计数的探索在高维图像观测上难以定义“同一个状态”，而基于动力学预测的 curiosity 方法又容易被不可控噪声吸引。

RND 的关键简化是把新颖性估计转化为一个监督学习问题。目标网络 \(f\) 在初始化后冻结，预测网络 \(\hat f_\theta\) 只在智能体实际访问过的观测上训练。因此，某个观测被访问越多，预测网络越会记住它，误差越低；新观测还没有被训练覆盖，误差自然更高。

核心内在奖励写作：

$$r_t^{\text{int}} = \left\|\hat f_\theta(o_t) - f(o_t)\right\|_2^2$$

这里的 \(f(o_t)\) 不是语义标签，而是随机投影后的特征。随机目标看似粗糙，但它有两个好处：一是固定不变，避免目标随训练漂移；二是足够高维时能把不同观测映射到可区分特征，让预测误差成为访问频率的近似代理。

##### 训练流程与奖励组合

RND 不是替代 RL 算法，而是提供额外奖励。论文中策略优化仍使用 PPO，轨迹采样后同时得到环境奖励 \(r_t^{\text{ext}}\) 与内在奖励 \(r_t^{\text{int}}\)，总优化信号通常写成：

$$r_t = r_t^{\text{ext}} + \beta r_t^{\text{int}}$$

由于外在奖励可能极稀疏、内在奖励会随着学习不断衰减，RND 使用运行均值和方差做归一化，并为两类奖励维护不同的 value function。外在 value 关注任务目标，内在 value 关注未来探索收益；把二者混到同一个 critic 中会让尺度和折扣选择互相干扰。

RND 与 ICM 的区别在于新颖性来源。ICM 预测动作导致的下一个特征状态，容易把环境中不可预测但与控制无关的噪声当成奖励；RND 预测的是固定随机函数输出，误差下降只依赖训练覆盖，而不是环境动力学是否随机。因此 RND 在随机背景、随机敌人等场景中更不容易被“预测不了的噪声”劫持。

> 💡 关键：RND 的探索奖励不是“这个状态是否重要”，而是“这个状态我是否还不会预测”。重要性仍由外在任务奖励最终筛选，RND 只负责把智能体推向未访问区域。

##### 与传统方法的区别

| 方法 | 新颖性信号 | 主要风险 | RND 的改进 |
|------|------------|----------|------------|
| 计数探索 | 离散状态访问次数 | 图像状态难以计数 | 用神经预测误差近似访问频率 |
| 动力学 curiosity | 下一状态预测误差 | 被不可控随机性吸引 | 固定随机目标不建模环境噪声 |
| 手工奖励塑形 | 人工中间奖励 | 任务依赖强且可能改写目标 | 通用内在奖励，少量额外网络即可接入 |

#### 🧪 练习题

```yaml
question: "RND 中内在奖励为什么会随状态访问次数增加而下降？"
options:
  - "因为 PPO 会自动降低所有奖励的尺度"
  - "因为预测网络在访问过的观测上逐渐拟合固定随机目标网络的输出"
  - "因为目标网络会把常见状态映射为更小的特征向量"
  - "因为外在奖励会抵消内在奖励"
answer: 1
explain: "目标网络固定不变，预测网络只在访问到的观测上训练；访问越频繁，预测误差越小，因此内在奖励随熟悉度下降。"
```
