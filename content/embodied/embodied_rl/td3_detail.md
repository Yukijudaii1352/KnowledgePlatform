### 双延迟深度确定性策略梯度 (Twin Delayed DDPG, TD3)

```yaml
id: td3
name: TD3
full_name: 双延迟深度确定性策略梯度 (Twin Delayed DDPG)
year: '2018'
org: McGill
paper_url: https://arxiv.org/abs/1802.09477
category: foundation
parent: ddpg
motivation: 双Q网络抑制值函数过估计
```

#### 📝 一句话总结

TD3 针对 Actor-Critic 方法中函数逼近误差导致的 Q 值过估计问题，提出了**截断双 Q 学习、延迟策略更新和目标策略平滑**三项关键技术，在连续控制任务上大幅超越 DDPG 等基线，成为 off-policy 连续控制的标准算法之一。

#### 🎯 核心要点

- **截断双 Q 学习 (Clipped Double Q-learning)**：维护两个独立的 Critic 网络，取二者 Q 值估计的**最小值**作为目标值，有效抑制过估计偏差
- **延迟策略更新 (Delayed Policy Updates)**：Critic 每更新 \(d\) 次（默认 \(d=2\)），Actor 才更新一次，确保 Critic 收敛后再指导策略
- **目标策略平滑 (Target Policy Smoothing)**：在计算目标 Q 值时，向目标动作添加截断高斯噪声，起到值函数正则化的作用，防止策略利用 Q 函数的局部峰值
- **基于 DDPG 框架**：继承确定性策略梯度 + 经验回放 + 目标网络的 off-policy 架构
- **在 OpenAI Gym MuJoCo 7 个连续控制任务上全面超越 DDPG、SAC（早期版本）等方法**

#### 🔬 深入细节

##### 核心示意图

![TD3 过估计偏差分析](https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x1.png)
*图 1：DDPG 在 Hopper-v1 上的训练过程中，估计 Q 值（蓝色）持续高于真实回报（橙色），展示了 Actor-Critic 方法中严重的过估计现象。TD3 的核心动机即消除此偏差。*

![TD3 与基线方法的学习曲线对比](https://ar5iv.labs.arxiv.org/html/1802.09477/assets/x5.png)
*图 2：TD3 在多个 MuJoCo 连续控制环境上的学习曲线对比，显著优于 DDPG、SAC、PPO 等方法。*

##### 算法伪代码

```python
# TD3 算法伪代码
# 初始化
Q_θ1, Q_θ2 = init_critics()        # 两个 Critic 网络
π_φ = init_actor()                   # Actor 网络
Q_θ1', Q_θ2', π_φ' = copy_targets() # 对应的目标网络
B = ReplayBuffer()

for t in range(T_max):
    # 1. 环境交互：带探索噪声
    a = π_φ(s) + ε,  ε ~ N(0, σ_explore)
    s', r, done = env.step(a)
    B.add(s, a, r, s', done)

    # 2. 采样 mini-batch
    (s, a, r, s', d) = B.sample(N)

    # 3. 计算目标值（目标策略平滑 + 截断双 Q）
    ã = π_φ'(s') + clip(N(0, σ_smooth), -c, c)   # 目标动作 + 截断噪声
    y = r + γ * (1-d) * min(Q_θ1'(s', ã), Q_θ2'(s', ã))  # 取最小值

    # 4. 更新两个 Critic
    loss_critic = MSE(Q_θ1(s,a), y) + MSE(Q_θ2(s,a), y)
    update(θ1, θ2, loss_critic)

    # 5. 延迟策略更新（每 d 步更新一次 Actor 和目标网络）
    if t % d == 0:
        loss_actor = -mean(Q_θ1(s, π_φ(s)))   # 仅用 Q_θ1 指导策略
        update(φ, loss_actor)
        # 软更新目标网络
        θ1' ← τ·θ1 + (1-τ)·θ1'
        θ2' ← τ·θ2 + (1-τ)·θ2'
        φ'  ← τ·φ  + (1-τ)·φ'
```

##### 动机与背景：Actor-Critic 中的过估计危机

在离散动作空间中，Q-learning 的过估计问题已被广泛研究——由于 \(\max\) 操作对含噪声的 Q 值取最大，会系统性地高估真实值。Double DQN 通过解耦动作选择与值评估来缓解此问题。然而，在连续动作空间的 Actor-Critic 框架中，这一问题同样严重却长期被忽视。

DDPG 中，Actor 通过梯度上升最大化 Critic 的 Q 值输出来更新策略。如果 Critic 存在过估计，Actor 就会被"欺骗"，倾向于选择那些被错误高估的动作。更糟糕的是，这种偏差通过时序差分 (TD) 的自举机制不断累积：

$$Q_{\theta}(s, a) \leftarrow r + \gamma Q_{\theta'}(s', \pi_{\phi'}(s'))$$

每次更新都使用了下一状态的估计值，误差会像滚雪球一样逐步放大。论文通过实验证实（如图 1），DDPG 的 Q 值估计在训练过程中会严重偏离真实回报，最终导致策略性能崩溃。

> 💡 **关键洞察**：Double DQN 的思路在 Actor-Critic 中直接套用效果不佳。因为 Actor-Critic 的策略更新缓慢，当前网络和目标网络的 Q 值估计过于相似，无法真正解耦以消除偏差。

##### 核心机制一：截断双 Q 学习 (Clipped Double Q-learning)

TD3 维护两个独立参数化的 Critic 网络 \(Q_{\theta_1}\) 和 \(Q_{\theta_2}\)，在计算 TD 目标时取二者的**最小值**：

$$y = r + \gamma \min_{i=1,2} Q_{\theta'_i}(s', \pi_{\phi'}(s'))$$

**为什么取最小值而非均值？** 取均值虽然能降低方差，但仍可能产生过估计。取最小值则提供了一个**近似上界**——即便某个 Critic 过估计了，另一个较低的估计也能将其拉回。这种策略倾向于产生轻微的**低估**，而低估在实践中远比过估计安全：低估的动作会被策略自然回避，不会像过估计那样引发正反馈循环。

两个 Critic 使用相同的目标值 \(y\) 独立训练，损失函数为：

$$L(\theta_i) = \mathbb{E}\left[(y - Q_{\theta_i}(s, a))^2\right], \quad i = 1, 2$$

> ⚠️ **注意**：Actor 的更新仅依赖 \(Q_{\theta_1}\)（而非两个 Critic 的组合），避免引入额外的耦合。

##### 核心机制二：延迟策略更新 (Delayed Policy Updates)

传统 Actor-Critic 方法中，Actor 和 Critic 每步同时更新。但如果 Critic 尚未收敛，Actor 就会基于不准确的值函数更新策略，进而产生的新数据又反过来干扰 Critic 的学习——形成恶性循环。

TD3 的解决方案极为简洁：**每 \(d\) 次 Critic 更新才执行一次 Actor 更新**（论文中 \(d=2\)）。这给了 Critic 足够的时间在当前策略下收敛，使得 Actor 获得更可靠的梯度信号。

Actor 的更新遵循确定性策略梯度定理：

$$\nabla_\phi J(\phi) = \mathbb{E}_{s \sim \mathcal{B}}\left[\nabla_a Q_{\theta_1}(s, a)\big|_{a=\pi_\phi(s)} \cdot \nabla_\phi \pi_\phi(s)\right]$$

目标网络的软更新也仅在 Actor 更新时执行：

$$\theta'_i \leftarrow \tau \theta_i + (1 - \tau)\theta'_i, \quad \phi' \leftarrow \tau \phi + (1 - \tau)\phi'$$

其中 \(\tau\) 为软更新系数（论文中 \(\tau = 0.005\)）。

##### 核心机制三：目标策略平滑 (Target Policy Smoothing)

确定性策略的一个固有问题是：Critic 可能在某些动作处形成尖锐的峰值（局部过拟合），而确定性策略恰好会精确地利用这些峰值，导致 Q 值估计不稳定。

TD3 借鉴了期望 SARSA 的思想，在计算目标 Q 值时向目标动作注入**截断高斯噪声**：

$$\tilde{a} = \pi_{\phi'}(s') + \epsilon, \quad \epsilon \sim \text{clip}(\mathcal{N}(0, \sigma), -c, c)$$

其中 \(\sigma\) 为噪声标准差，\(c\) 为截断范围（论文中 \(\sigma=0.2, c=0.5\)）。这等价于对 Q 值在动作空间的局部邻域内做平滑，使得策略不会过度依赖 Q 函数的局部尖峰。截断操作确保噪声不会将动作推出有效范围。

> 💡 **直觉理解**：如果一个动作只在精确的某个点上 Q 值很高，但其邻域 Q 值很低，那么加噪声后的平均 Q 值就会降低，策略不会被这种"虚假峰值"误导。

##### 与 DDPG 的关键区别总结

| 特性 | DDPG | TD3 |
|------|------|-----|
| Critic 数量 | 1 个 | **2 个**（取 min） |
| 策略更新频率 | 每步更新 | **每 \(d\) 步更新一次** |
| 目标动作噪声 | 无 | **截断高斯噪声** |
| 过估计控制 | 无显式机制 | **Clipped Double Q** |
| 探索噪声 | Ornstein-Uhlenbeck | **简单高斯噪声** |

##### 默认超参数

| 参数 | 值 | 说明 |
|------|-----|------|
| \(\tau\) | 0.005 | 目标网络软更新系数 |
| \(d\) | 2 | 策略延迟更新间隔 |
| \(\sigma_{\text{smooth}}\) | 0.2 | 目标策略平滑噪声标准差 |
| \(c\) | 0.5 | 噪声截断范围 |
| \(\gamma\) | 0.99 | 折扣因子 |
| batch size | 256 | 小批量大小 |
| 学习率 | 3e-4 | Actor 和 Critic 均使用 Adam |

#### 🧪 练习题

```yaml
question: "TD3 中使用两个 Critic 网络并取最小值的主要目的是什么？"
options:
  - "增加模型容量以拟合更复杂的值函数"
  - "通过集成学习降低值函数的方差"
  - "抑制 Q 值的过估计偏差，提供近似值上界"
  - "加速 Critic 网络的收敛速度"
answer: 2
explain: "取两个独立 Critic 的最小值可以有效抑制过估计偏差。即使其中一个 Critic 过估计，较低的那个估计也能将目标值拉回，倾向于产生轻微低估而非危险的过估计。"
```