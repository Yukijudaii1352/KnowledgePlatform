### SimPLe：模拟策略学习 (Simulated Policy Learning)

```yaml
id: simple
name: SimPLe
full_name: "模拟策略学习 (Simulated Policy Learning)"
year: "2020.04"
org: Google Research
paper_url: "https://arxiv.org/abs/1903.00374"
category: planning
parent: mbpo
motivation: "在Atari 100k展示极高样本效率"
```

#### 📝 一句话总结

SimPLe 提出用视频预测世界模型反复生成短程模拟轨迹，再用 PPO 在模型内训练策略，解决 Atari 低样本场景中无模型 RL 需要海量真实交互的问题。

#### 🎯 核心要点

- **迭代式 Dyna 框架**：真实环境采样、训练世界模型、在世界模型中训练策略三步循环执行
- **Atari 100k 设置**：只使用 100k agent-environment interactions，约等于两小时真实游戏时间
- **视频预测世界模型**：输入 4 帧堆叠图像和动作，预测下一帧与奖励
- **离散随机潜变量模型**：用离散 bit latent 表达环境随机性，训练 LSTM 自回归预测 latent bits
- **短 rollout 策略训练**：从真实 replay buffer 中随机状态启动模型 rollout，定期重置以控制模型误差累积
- **PPO 作为模型内优化器**：不直接用模型做树搜索，而是在学习到的模拟器里训练策略网络
- **经验聚合**：新策略回到真实 Atari 环境采样，扩展数据集后再更新世界模型

#### 🔬 深入细节

##### 主循环示意

![SimPLe 主循环](https://arxiv.org/html/1903.00374v5/extracted/1903.00374v5/figures/Cycle_full.png)
*图：SimPLe 的三阶段循环：真实环境交互收集数据、训练世界模型、在世界模型中训练策略。*

##### 算法伪代码

```python
# SimPLe: Simulated Policy Learning
initialize policy pi
initialize world_model M
replay = []

while real_env_budget_not_exhausted:
    # 1. 用当前策略收集真实 Atari 交互
    for t in range(real_steps_per_iter):
        a_t = pi(o_t)
        o_next, r_t, done = real_env.step(a_t)
        replay.append((o_t, a_t, r_t, o_next, done))
        o_t = reset_if_done(o_next, done)

    # 2. 用真实 replay 训练视频预测世界模型
    M.fit(replay, targets=["next_frame", "reward", "done"])

    # 3. 在世界模型中短 rollout，并用 PPO 更新策略
    for update in range(ppo_updates):
        start = sample_observation_stack(replay)
        simulated_traj = M.rollout(pi, start, horizon=short_horizon)
        pi = PPO_update(pi, simulated_traj, bootstrap_value=True)
```

##### 动机与背景

Atari 是像素输入、部分可观测、长时序决策的典型基准。DQN、Rainbow、IMPALA 等无模型算法可以获得很强最终性能，但通常需要数千万到数亿帧交互；这和人类玩家几分钟内形成游戏物理直觉的样本效率差距很大。SimPLe 的核心问题是：能否把“预测未来图像和奖励”转化为真实的策略学习收益？

论文采用近似 Dyna 的思想，但关键难点在于 Atari 的图像动力学非常复杂。世界模型如果直接长程展开，像素误差会逐步放大，策略还可能利用模型错误得到虚假高奖励。因此 SimPLe 不把模型当作完美模拟器，而是只用它提供短程、反复重启的想象经验。

##### 世界模型：从动作条件视频预测到随机 latent

SimPLe 的世界模型学习：

$$\hat{o}_{t+1}, \hat{r}_t, \hat{d}_t = M_\phi(o_{t-3:t}, a_t, z_t)$$

其中 \(o_{t-3:t}\) 是 4 帧堆叠观测，\(a_t\) 是 one-hot 动作，\(z_t\) 是随机潜变量。确定性版本用卷积编码器和反卷积解码器预测下一帧；随机版本增加一个近似后验网络，在训练时看到真实下一帧并产生离散 latent bits，在推理时由 LSTM 自回归生成这些 bits。

这种离散随机设计解决了两个问题。第一，Atari 中存在闪烁、遮挡、敌人行为等不确定性，单一确定性预测会平均化未来。第二，连续 VAE latent 的 KL 权重对游戏很敏感，离散 bit + 自回归 prior 更容易在多游戏上稳定工作。

训练损失由图像预测和奖励预测组成。图像输出既可以是连续 RGB，也可以是每像素 256 类 softmax。论文强调 clipped loss 很重要，因为 Atari 大面积背景像素容易主导梯度，而真正影响控制的是球、敌人、子弹等小区域。

##### 策略训练：短 rollout 控制模型偏差

在模型内训练策略时，SimPLe 使用 PPO。每个模拟 episode 不从模型自己生成的任意状态开始，而是从真实 replay buffer 的状态堆叠启动，并且只展开较短 horizon。这个设计类似后来 MBPO 的短分支 rollout：

$$\tau_{\text{model}} = (o_i, a_i, \hat{r}_i, \hat{o}_{i+1}, \ldots, \hat{o}_{i+k})$$

当 \(k\) 较短时，模型误差还没有严重累积；当 \(k\) 太长时，策略会进入模型未见过的状态区域，导致 model exploitation。SimPLe 还在 rollout 末尾用价值函数 bootstrap，缓解短 rollout 无法看到远期奖励的问题：

$$G_t = \sum_{j=0}^{k-1}\gamma^j \hat{r}_{t+j} + \gamma^k V_\psi(\hat{o}_{t+k})$$

##### 与传统方法的区别

SimPLe 与纯无模型 Atari 算法的差异在于：真实交互只用于改进世界模型，策略的大量梯度更新发生在模型里。它与 MuZero 的差异也很明显：MuZero 学习的是只服务于价值、奖励和策略的潜在模型，并通过 MCTS 规划；SimPLe 学习可视化的下一帧模拟器，并用 PPO 在该模拟器中训练策略。

> 💡 关键：SimPLe 的贡献不是证明像素世界模型完美，而是证明“短程视频预测 + 模型内策略优化 + 数据聚合”足以在 Atari 100k 低样本设置中取得强样本效率。

#### 🧪 练习题

```yaml
question: "SimPLe 在世界模型中训练策略时为什么使用短 rollout？"
options:
  - "因为 PPO 不能处理超过 1 步的轨迹"
  - "为了减少模型预测误差在长序列中的累积和被策略利用"
  - "因为 Atari 游戏没有长期奖励"
  - "为了完全避免价值函数 bootstrap"
answer: 1
explain: "SimPLe 的 learned simulator 并不完美，长程展开会放大像素和奖励误差；短 rollout 从真实 buffer 状态重启，可以控制模型偏差。"
```
