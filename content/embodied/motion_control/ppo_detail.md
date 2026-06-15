### PPO — 近端策略优化 (Proximal Policy Optimization)

```yaml
id: ppo
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: "2017"
org: OpenAI
paper_url: https://arxiv.org/abs/1707.06347
category: rl_locomotion
parent: "—"
motivation: 策略梯度优化基准算法
```

#### 📝 一句话总结

PPO 提出了用裁剪替代 TRPO 硬信赖域约束的策略梯度算法，解决了普通 policy gradient 更新过大易崩溃、TRPO 实现复杂的问题。它用简单的一阶优化就能多轮复用 on-policy rollout，成为机器人运动控制和 RLHF 中最常用的稳定基线之一。

#### 🎯 核心要点

- **裁剪代理目标**：通过 \(\text{clip}(r_t,1-\epsilon,1+\epsilon)\) 限制新旧策略概率比
- **近端更新思想**：保留 TRPO “不要让新策略离旧策略太远”的核心，但去掉二阶约束求解
- **多 epoch 小批量优化**：同一批 rollout 可进行多轮 minibatch SGD，提高样本利用率
- **Actor-Critic 结构**：策略网络输出动作分布，价值网络估计 \(V(s)\) 用于优势函数
- **GAE 常用搭配**：用 generalized advantage estimation 在偏差和方差间折中
- **联合损失**：实践中常组合 policy loss、value loss 和 entropy bonus
- **广泛适配连续控制**：MuJoCo locomotion、四足/人形 sim-to-real 和大规模并行仿真常以 PPO 为默认优化器

#### 🔬 深入细节

##### 核心示意图

![PPO-Clip 目标函数](https://spinningup.openai.com/en/latest/_images/math/99621d5bcaccd056d6ca3aeb48a27bf8cc0e640c.svg)
*图：PPO-Clip 的核心目标函数。PPO 原论文主要给出算法和实验曲线，这里使用 OpenAI Spinning Up 的公开公式图说明裁剪机制。*

##### 算法伪代码

```python
# PPO-Clip 训练循环
for iteration in range(num_iterations):
    trajectories = collect_rollouts(policy_old, envs, horizon)
    advantages, returns = compute_gae(trajectories, value_fn)

    # 固定旧策略概率，重复优化同一批 on-policy 数据
    old_logp = trajectories.logp.detach()
    for epoch in range(K):
        for batch in minibatches(trajectories):
            logp = policy.log_prob(batch.obs, batch.actions)
            ratio = exp(logp - old_logp[batch.indices])

            unclipped = ratio * batch.advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * batch.advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mse(value_fn(batch.obs), batch.returns)
            entropy_bonus = mean(policy.entropy(batch.obs))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

    policy_old.load_state_dict(policy.state_dict())
```

##### 动机与背景

策略梯度方法直接优化 \(\pi_\theta(a|s)\)，适合连续动作控制，但更新步长非常敏感。如果某次梯度让策略概率分布变化过大，采样数据来自旧策略，而优化目标却评估新策略，训练会出现性能崩塌。TRPO 用 KL 约束限制策略变化，但需要 Fisher-vector product、共轭梯度和 line search，实现复杂且不够通用。

PPO 的核心工程判断是：不必精确求解信赖域约束，只要构造一个简单目标，让过大的概率比不再继续带来收益，就能达到类似稳定效果。这就是 PPO-Clip。

##### 裁剪目标函数

定义新旧策略概率比：

$$
r_t(\theta)=
\frac{\pi_\theta(a_t|s_t)}
{\pi_{\theta_{old}}(a_t|s_t)}
$$

普通策略梯度代理目标为：

$$
L^{PG}(\theta)=
\hat{\mathbb{E}}_t[r_t(\theta)\hat{A}_t]
$$

PPO-Clip 改为：

$$
L^{CLIP}(\theta)=
\hat{\mathbb{E}}_t
\left[
\min
\left(
r_t(\theta)\hat{A}_t,
\text{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t
\right)
\right]
$$

当 \(\hat{A}_t>0\) 时，动作比平均更好，策略应提高其概率；但若 \(r_t>1+\epsilon\)，说明提高过多，裁剪项变成上限，继续增大概率不再增加目标。当 \(\hat{A}_t<0\) 时，动作较差，策略应降低其概率；但若 \(r_t<1-\epsilon\)，降低过多也会被截断。

> 💡 关键：PPO 的 clip 不是直接限制参数变化，而是限制“采样动作概率比”带来的优化收益，从而间接抑制大步更新。

##### 完整训练目标

实践中 PPO 通常使用 actor-critic 联合损失：

$$
L_t^{PPO}(\theta)=
\hat{\mathbb{E}}_t
\left[
L_t^{CLIP}(\theta)
- c_1 L_t^{VF}(\theta)
+ c_2 S[\pi_\theta](s_t)
\right]
$$

其中价值损失为：

$$
L_t^{VF}(\theta)=
\left(V_\theta(s_t)-\hat{R}_t\right)^2
$$

熵项 \(S[\pi_\theta]\) 鼓励探索。优势函数常用 GAE：

$$
\hat{A}_t =
\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}
$$

$$
\delta_t=r_t+\gamma V(s_{t+1})-V(s_t)
$$

\(\lambda\) 越接近 1，方差更高但偏差更低；越接近 0，更依赖价值函数，方差更低但偏差更高。

##### 训练/推理流程

PPO 是 on-policy 算法。每轮先用当前策略在环境中采集一批轨迹，保存状态、动作、奖励、done、旧 log probability 和价值估计；再计算 return 与 advantage；随后固定旧概率，使用多 epoch minibatch 更新策略和价值网络；更新后丢弃旧数据，重新采样。

在机器人 locomotion 中，PPO 常和大规模并行仿真结合：几千个环境同时 rollout，一次更新获得大量多样样本。动作通常是关节 PD 目标或残差，底层 PD 将其转成力矩。这个结构比直接输出力矩更稳定，也便于 sim-to-real。

##### 与 TRPO / 普通 PG 的区别

| 方法 | 更新约束 | 优化器 | 样本复用 | 实现复杂度 |
|------|----------|--------|----------|------------|
| Vanilla PG | 无显式约束 | 一阶 SGD | 低 | 低但不稳定 |
| TRPO | KL 硬约束 | 二阶近似 | 中 | 高 |
| PPO-Penalty | KL 软惩罚 | 一阶 Adam | 中 | 中 |
| PPO-Clip | 概率比裁剪 | 一阶 Adam | 中高 | 低 |

PPO 的主要局限是仍然 on-policy，样本效率低于 SAC/TD3 等 off-policy 方法；clip 也不是严格信赖域，超参数和奖励尺度仍会影响稳定性。但它的实现简单、吞吐高、鲁棒性好，因此成为运动控制论文中最常见的训练算法。

#### 🧪 练习题

```yaml
question: "PPO-Clip 中裁剪概率比 r_t(theta) 的主要作用是什么？"
options:
  - "强制价值函数输出为正数"
  - "限制新旧策略对采样动作的概率变化收益，避免单次策略更新过大"
  - "把 on-policy 算法变成 off-policy 算法"
  - "删除优势函数中的折扣因子"
answer: 1
explain: "裁剪目标在概率比超出 [1-epsilon, 1+epsilon] 且更新方向过激时截断收益，从而抑制破坏性大步更新。"
```
