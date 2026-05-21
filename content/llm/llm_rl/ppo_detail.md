### PPO

```yaml
id: ppo
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: "2017"
org: OpenAI
paper_url: https://arxiv.org/abs/1707.06347
category: foundation
parent: trpo
motivation: 裁剪目标函数简化TRPO
```

#### 📝 一句话总结

PPO 用一个极其简单的裁剪替代目标函数近似实现了 TRPO 的 trust region 思想，在不依赖复杂二阶优化的前提下稳定约束策略更新幅度，最终成为深度强化学习和 RLHF 中最常用的策略优化算法。

#### 🎯 核心要点

- 核心创新是 clipped surrogate objective，用 `clip` 限制新旧策略概率比
- 保留 on-policy policy gradient 框架，但允许同一批 rollout 数据做多轮 minibatch 更新
- 提供两条近端化路线：clip 版本和自适应 KL penalty 版本，论文最终发现 clip 更稳更好
- 实际训练通常采用 actor-critic 形式，同时优化策略损失、价值函数损失和熵奖励
- 本质是在一阶 SGD/Adam 框架下近似 TRPO 的保守更新思想
- 在 MuJoCo 连续控制上整体优于 TRPO、A2C 等基线，在 Atari 上也表现强劲
- 后续成为 RLHF 标准优化器，InstructGPT、ChatGPT 早期 RL 流水线都沿用了 PPO 范式

#### 🔬 深入细节

##### 核心示意图

![PPO 裁剪目标函数示意](https://ar5iv.labs.arxiv.org/html/1707.06347/assets/x1.png)
*图：论文 Figure 1。横轴是新旧策略概率比 \(r_t(\theta)\)，纵轴是单步 surrogate term。可以直观看到，一旦概率比超出 \([1-\epsilon, 1+\epsilon]\)，目标函数就不再继续鼓励更激进的更新。*

##### 算法伪代码

```python
# PPO, actor-critic style
for iteration in range(num_iters):
    trajectories = collect_rollouts(policy_old, env, T)
    advantages = estimate_advantages(trajectories, value_fn)
    returns = compute_returns(trajectories)

    for epoch in range(K):
        for batch in minibatches(trajectories, advantages, returns):
            ratio = pi_theta(batch.a, batch.s) / pi_old(batch.a, batch.s)
            unclipped = ratio * batch.adv
            clipped = clip(ratio, 1 - eps, 1 + eps) * batch.adv
            policy_loss = -mean(min(unclipped, clipped))
            value_loss = mse(value_fn(batch.s), batch.ret)
            entropy_bonus = entropy(pi_theta(batch.s))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            update(theta, loss)

    policy_old = policy.copy()
```

##### 1. PPO 想解决的其实是 TRPO 的工程问题

PPO 不是凭空出现的。它面对的是策略梯度方法一个非常老但很难处理的问题：策略一旦更新太大，性能就可能瞬间崩掉。TRPO 用 trust region 解决了这个问题，做法是在每次更新时显式约束新旧策略的 KL 散度不能太大，因此理论上更稳。

但 TRPO 的代价也很明显：需要二阶近似、Fisher 信息矩阵、共轭梯度等一整套复杂 machinery。对于研究原型还行，一旦想大规模训练或者做频繁实验，这套东西就显得笨重。PPO 的问题于是变成了：能不能保留“不要一步走太远”的思想，但把优化过程简化成普通 SGD/Adam 就能做的形式？

##### 2. 核心对象：先看概率比，再看更新是否过头

PPO 沿用了 TRPO / CPI 那条线里的 surrogate objective，先定义新旧策略在样本动作上的概率比：

$$
r_t(\theta)=\frac{\pi_\theta(a_t\mid s_t)}{\pi_{\theta_{\mathrm{old}}}(a_t\mid s_t)}.
$$

如果 \(r_t(\theta) > 1\)，说明新策略更偏好这个动作；如果小于 1，说明新策略在压低这个动作。再结合优势函数 \(\hat A_t\)，最朴素的目标就是：

$$
L^{\mathrm{CPI}}(\theta)=
\mathbb{E}_t\left[r_t(\theta)\hat A_t\right].
$$

这个目标本身没错，但问题在于它会持续奖励“把好动作概率推得越来越大、把坏动作概率压得越来越小”。只要优化器还能继续走，它就没有天然刹车，于是容易出现单次更新过猛的问题。

##### 3. PPO 的关键：不是限制梯度，而是限制“继续获益的区间”

PPO 的 clip 目标写成：

$$
L^{\mathrm{CLIP}}(\theta)=
\mathbb{E}_t\left[
\min\left(
r_t(\theta)\hat A_t,\;
\operatorname{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat A_t
\right)
\right].
$$

这个式子是 PPO 最重要的部分。它的直觉可以分两种情况看：

- 如果 \(\hat A_t > 0\)，说明这个动作比基线好，优化器会倾向于增大它的概率。但一旦 \(r_t(\theta)\) 超过 \(1+\epsilon\)，clip 项就把额外收益截平，不再鼓励你继续往上推。
- 如果 \(\hat A_t < 0\)，说明这个动作不好，优化器会倾向于减小它的概率。但一旦 \(r_t(\theta)\) 跌破 \(1-\epsilon\)，同样不再鼓励进一步激进地下压。

> 💡 关键：PPO 不是硬性要求“参数不能走远”，而是更巧妙地让“走太远不再有优化收益”。这就是它为什么能在一阶优化框架里近似 trust region 效果。

论文强调 `min` 的作用是构造一个 pessimistic bound。也就是说，当 unclipped objective 和 clipped objective 冲突时，PPO 选择更保守的那个。这让更新天然偏向“不犯大错”，而不是“尽可能贪心吃掉所有优势”。

##### 4. 为什么它允许多轮复用同一批数据

传统 vanilla policy gradient 往往一批数据只更新一次，因为一旦策略变化太快，旧样本就不再可信。PPO 的近端化设计缓解了这个问题：虽然它仍然是 on-policy，但由于每一步更新都被 clip 机制束缚在局部区域内，同一批 rollout 可以安全地做多个 epoch 的 minibatch SGD。

这件事对样本效率很关键。论文里 Algorithm 1 的核心套路就是：

1. 用旧策略收集 \(N\times T\) 个时间步数据；
2. 估计优势函数；
3. 对同一批数据做 \(K\) 轮小批量优化；
4. 再同步 `policy_old <- policy`，进入下一轮。

因此 PPO 的收益不只来自“更稳”，还来自“更能榨干同一批 on-policy 数据”。这也是它相对简单 policy gradient 方法明显更实用的地方。

##### 5. KL penalty 版本为什么没成为主流

论文其实还给了另一个版本，即在 surrogate objective 上直接加 KL 惩罚：

$$
L^{\mathrm{KLPEN}}(\theta)=
\mathbb{E}_t\left[
r_t(\theta)\hat A_t
- \beta\,\mathrm{KL}\!\left(\pi_{\theta_{\mathrm{old}}}(\cdot\mid s_t),\pi_\theta(\cdot\mid s_t)\right)
\right].
$$

同时根据当前 KL 大小自适应调节 \(\beta\)。这条路线在思想上更接近 TRPO，因为它直接监控策略偏移。但论文实验发现，这种方法整体不如 clip 版本稳定、也不如 clip 版本好调。因此后面社区说“PPO”时，通常默认就是 clipped PPO，而不是 KL-penalty PPO。

这也是 PPO 设计里一个很漂亮的地方：它最终赢的不是更“理论优雅”的版本，而是更“训练实用”的版本。

##### 6. 完整训练目标并不只有策略项

真实训练里，PPO 往往配合 actor-critic 使用，所以总损失不只包含 clip 策略项，还会包含价值函数回归误差和熵奖励：

$$
L(\theta)=
\mathbb{E}_t\left[
L^{\mathrm{CLIP}}_t(\theta)
- c_1 L^{\mathrm{VF}}_t(\theta)
+ c_2 S[\pi_\theta](s_t)
\right].
$$

其中：

- \(L^{\mathrm{VF}}\) 负责让 value function 学会估计回报，用于构造优势函数；
- 熵项 \(S\) 鼓励策略保留一定探索性；
- \(c_1,c_2\) 用来平衡策略优化、价值拟合和探索。

这也是 PPO 在后续 RLHF 中看起来更“重”的原因：到了语言模型场景，除了 policy 之外，通常还会额外维护 value model、reward model 和 reference model，所以整个系统不只是一个 clip 公式，而是一个多模型训练流水线。

##### 7. 论文结果说明了什么

论文最核心的经验结论有两个。第一，在 MuJoCo 上，clip 版本整体优于“无 clipping”、固定 KL、以及自适应 KL 这些替代方案；其中 \(\epsilon=0.2\) 是表现最好的典型设置。第二，在连续控制和 Atari 上，PPO 与 TRPO、A2C 等强基线相比都非常有竞争力，而且训练过程相对稳定。

这两点合起来说明了一件事：PPO 的成功并不是因为它给出了一个更强的理论保证，而是因为它找到了一种极简但够用的更新约束。它把“稳定策略优化”从少数复杂算法的专长，变成了一个几乎所有工程师都能直接上手的标准模板。

##### 8. 为什么它后来统治了 RLHF

当 PPO 被搬到语言模型对齐里时，它的优点变得更突出。RLHF 训练非常依赖稳定性，因为 reward model 本身就可能噪声很大，若策略更新再失控，很容易 reward hacking 或直接崩坏。PPO 恰好提供了一种足够稳、足够成熟、已有大量实现经验的默认选择。

所以从 InstructGPT 到后来的很多 RLHF 系统，PPO 都成了事实标准。它当然不是最轻量的方法，这也是后来 DPO、IPO、KTO 等工作试图绕开在线 PPO 的原因；但如果你要理解“经典 RLHF 是怎么训起来的”，PPO 仍然是最关键的地基算法之一。

#### 🧪 练习题

```yaml
question: "PPO 中 clipped surrogate objective 的主要作用是什么？"
options:
  - "让算法变成 off-policy，提高经验回放效率"
  - "通过截断新旧策略概率比，抑制过大的单步策略更新"
  - "去掉价值函数网络，只保留策略网络"
  - "让 PPO 不再需要优势函数"
answer: 1
explain: "PPO 的核心就是用 clip 限制概率比超出 [1-eps, 1+eps] 后的继续获益，从而稳定策略更新。"
```
