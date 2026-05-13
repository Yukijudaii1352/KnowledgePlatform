### Playing Atari with Deep Reinforcement Learning (DQN)

```yaml
id: dqn_atari_2013
tags: [deep-reinforcement-learning, Q-learning, experience-replay, CNN, Atari]
category: ml_paradigm
source: "Mnih et al., 2013 (arXiv:1312.5602) / Nature 2015"
prerequisite: [Q-learning, CNN基础, MDP, 时序差分学习]
difficulty: 3
```

---

## 📝 一句话总结

DQN 首次将深度卷积神经网络与 Q-learning 结合，通过**经验回放 (Experience Replay)** 打破样本相关性，直接从 Atari 游戏的原始像素输入学习控制策略，在 7 款游戏中 6 款达到 SOTA、3 款超越人类水平，开创了深度强化学习时代。

---

## 🎯 核心要点

1. **端到端像素到动作**：输入为 84×84×4 的灰度帧堆叠，输出为每个合法动作的 Q 值，无需任何手工特征工程。
2. **经验回放机制**：将 $(s_t, a_t, r_t, s_{t+1})$ 存入固定大小的回放缓冲区，训练时随机采样 minibatch，打破时序相关性、提高数据利用率、稳定训练分布。
3. **单一架构通吃多任务**：同一 CNN 架构和超参数在 7 款 Atari 游戏上均无需调整，证明了方法的通用性。
4. **奖励裁剪 (Reward Clipping)**：将所有正奖励映射为 +1、负奖励映射为 −1，统一不同游戏的奖励尺度。
5. **Nature 2015 扩展**：引入**目标网络 (Target Network)** 每 C 步同步一次参数，进一步稳定训练；扩展到 49 款游戏，多数超越人类。

---

## 🔬 深入细节

### 架构示意图

![DQN Architecture](https://huggingface.co/datasets/huggingface-deep-rl-course/course-images/resolve/main/en/unit4/deep-q-network.jpg)

> 图示：DQN 网络接收 4 帧堆叠的 84×84 灰度图像，经过两层卷积和一层全连接后，输出每个动作对应的 Q 值。与传统方法（输入 state-action pair 输出单个 Q 值）不同，DQN 一次前向传播即可获得所有动作的 Q 值。

### 算法伪代码

```
Algorithm 1: Deep Q-learning with Experience Replay
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Initialize replay memory D to capacity N
Initialize action-value function Q with random weights θ

for episode = 1 to M do
    Initialize sequence s₁ = {x₁} and preprocessed φ₁ = φ(s₁)
    for t = 1 to T do
        // ε-greedy 动作选择
        With probability ε select random action aₜ
        Otherwise select aₜ = argmax_a Q(φ(sₜ), a; θ)

        // 执行动作，观察环境反馈
        Execute aₜ in emulator, observe reward rₜ and image x_{t+1}
        Set s_{t+1} = sₜ, aₜ, x_{t+1} and preprocess φ_{t+1} = φ(s_{t+1})

        // 存储经验
        Store transition (φₜ, aₜ, rₜ, φ_{t+1}) in D

        // 经验回放：随机采样训练
        Sample random minibatch of transitions (φⱼ, aⱼ, rⱼ, φ_{j+1}) from D
        Set yⱼ = rⱼ                                    (if φ_{j+1} is terminal)
            yⱼ = rⱼ + γ · max_{a'} Q(φ_{j+1}, a'; θ)  (if φ_{j+1} is non-terminal)

        // 梯度下降更新
        Perform gradient descent step on (yⱼ − Q(φⱼ, aⱼ; θ))²
    end for
end for
```

### 方法详解

#### 1. 问题建模：从像素到决策

传统强化学习方法依赖手工设计的状态特征，而 Atari 游戏提供的是 210×160 的 RGB 视频流（60Hz）。DQN 将此问题建模为一个部分可观测的 MDP：由于单帧图像无法反映运动方向等动态信息（如 Pong 中球的速度），DQN 将连续 4 帧灰度图像堆叠为 84×84×4 的张量作为状态表示。预处理流程为：RGB → 灰度 → 降采样至 110×84 → 中心裁剪至 84×84 → 堆叠最近 4 帧。这一设计既降低了计算量，又保留了足够的时序信息。

#### 2. 核心创新：经验回放

深度学习要求训练样本独立同分布 (i.i.d.)，但 RL 中连续时间步的样本高度相关，且数据分布随策略变化而非平稳。经验回放通过三个机制解决这些问题：
- **打破相关性**：从缓冲区中随机采样，而非使用连续的时序样本，满足 i.i.d. 假设。
- **提高数据效率**：每个经验可被多次采样用于训练，而非用过即弃。
- **平滑分布漂移**：训练分布是历史多个策略的混合，避免了当前策略产生的正反馈循环导致参数振荡或发散。

代价是必须使用**离策略 (off-policy)** 学习，因为回放的经验来自旧策略——这正是选择 Q-learning（天然离策略）而非 SARSA 的原因。

#### 3. 网络架构与训练细节

**CNN 架构**（所有游戏共享同一结构）：

| 层 | 配置 | 输出尺寸 |
|---|---|---|
| 输入 | 4 帧灰度堆叠 | 84 × 84 × 4 |
| Conv1 | 16 个 8×8 滤波器, stride 4, ReLU | 20 × 20 × 16 |
| Conv2 | 32 个 4×4 滤波器, stride 2, ReLU | 9 × 9 × 32 |
| FC | 256 个 ReLU 单元 | 256 |
| 输出 | 线性层, 每个动作一个输出 | 4~18 |

**关键训练设置**：
- **ε-greedy 探索**：ε 从 1.0 线性退火至 0.1（前 100 万帧），之后固定 0.1。
- **折扣因子**：γ = 0.99。
- **回放缓冲区大小**：N = 100 万条经验。
- **奖励裁剪**：正奖励 → +1，负奖励 → −1，零 → 0，统一不同游戏的尺度。
- **评估**：使用 ε = 0.05 的 ε-greedy 策略评估，而非贪心策略。

#### 4. Nature 2015 版本的关键改进

2015 年发表于 Nature 的后续版本引入了**目标网络 (Target Network)**：用一个参数为 θ⁻ 的独立网络计算 TD 目标 $y_j = r_j + \gamma \max_{a'} Q(\phi_{j+1}, a'; \theta^-)$，每隔 C 步将主网络参数复制到目标网络（$\theta^- \leftarrow \theta$）。这避免了"用自己预测自己"导致的训练不稳定，是 DQN 成功的关键因素之一。此外，Nature 版本将实验扩展到 49 款 Atari 游戏，在多数游戏上达到或超越人类水平。

### 实验结果

DQN 在 7 款 Atari 游戏上的表现（ε-greedy, ε=0.05 评估）：

| 游戏 | DQN Avg | 人类专家 | 是否超越人类 |
|---|---|---|---|
| **Breakout** | **401.2** | 31.8 | ✅ 大幅超越 |
| **Enduro** | **301.8** | 309.6 | ✅ 接近/超越 |
| **Pong** | **20.9** | 21.0 | ✅ 接近满分 |
| Beam Rider | 4092.0 | 7456.0 | ❌ 接近 |
| Q*bert | 1952.0 | 18900.0 | ❌ |
| Seaquest | 1705.0 | 28010.0 | ❌ |
| Space Invaders | 581.0 | 3690.0 | ❌ |

DQN 在 Breakout 上的表现尤为惊艳——学会了"打隧道"策略（将球送到砖墙后方反复弹跳），这是一种连许多人类玩家都不会使用的高级策略。

---

## 🧪 练习题

### 概念理解

1. **为什么 DQN 使用 4 帧堆叠而非单帧作为输入？** 如果只用 1 帧，在 Pong 游戏中会遇到什么问题？

2. **经验回放的三个优势分别是什么？** 如果去掉经验回放，直接用连续样本训练，可能出现什么问题？

3. **为什么 DQN 选择 Q-learning 而非 SARSA？** 这与经验回放有什么关系？

### 深入思考

4. **DQN 的网络架构为每个动作输出一个 Q 值，而非将 (state, action) 作为输入输出单个 Q 值。这种设计的优势是什么？** 在动作空间非常大（如连续动作空间）时，这种设计还适用吗？

5. **奖励裁剪 (reward clipping) 有什么利弊？** 在什么类型的游戏中，奖励裁剪可能导致次优策略？

6. **Nature 2015 版本引入的目标网络解决了什么问题？** 请用直觉解释：如果不用目标网络，为什么 TD 目标会不稳定？

### 扩展阅读方向

- **Double DQN** (van Hasselt et al., 2016)：解决 Q 值过估计问题
- **Prioritized Experience Replay** (Schaul et al., 2016)：按 TD-error 优先采样重要经验
- **Dueling DQN** (Wang et al., 2016)：分离状态价值和动作优势
- **Rainbow** (Hessel et al., 2018)：整合以上所有改进