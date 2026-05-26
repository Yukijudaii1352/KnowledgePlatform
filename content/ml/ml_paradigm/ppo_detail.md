### PPO

```yaml
id: ppo
name: PPO
full_name: Proximal Policy Optimization
year: '2017'
org: OpenAI
paper_url: https://arxiv.org/abs/1707.06347
category: core
parent: dqn
motivation: 裁剪目标函数约束策略更新
```

#### 📝 一句话总结

PPO 用裁剪 surrogate objective 把“策略更新不要走太大步”直接写进目标函数里，使策略梯度方法能够在同一批 on-policy 数据上做多轮 mini-batch 优化，同时避免像 vanilla policy gradient 那样一更新就把策略推崩。它保留了 TRPO 的“近端更新”思想，但只需要一阶优化，因此很快成为强化学习和 RLHF 中最常用的策略优化算法。

#### 🎯 核心要点

- 裁剪目标函数：核心目标 \(L^{\text{CLIP}}\) 用 \(\min(\cdot,\cdot)\) 和 \(\mathrm{clip}(\cdot)\) 限制新旧策略概率比偏离 1 太远
- 概率比重参数化：通过 \(r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}\) 直接衡量策略更新幅度
- 多 epoch 数据复用：同一批采样轨迹可以做多轮 mini-batch SGD / Adam 更新，显著提升样本效率
- Actor-Critic 风格：策略网络负责行动，价值函数用于估计优势函数，实践里通常配合 GAE 使用
- 两类 PPO 变体：论文同时讨论 KL-penalty 版和 clip 版，实验结论是 clip 版更稳、更简单
- 兼顾简单与稳定：避免 TRPO 的二阶近似、共轭梯度和复杂约束求解，同时仍能抑制破坏性大更新
- 广泛适配：在 MuJoCo 连续控制和 Atari 离散控制上都表现强势，后来也被 RLHF 直接复用

#### 🔬 深入细节

##### 核心示意图

![PPO 裁剪目标曲线（按论文 Figure 1 重绘）](data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22900%22%20height%3D%22340%22%20viewBox%3D%220%200%20900%20340%22%3E%0A%3Cstyle%3E%0Atext%7Bfont-family%3AArial%2Csans-serif%3Bfill%3A%23222%7D%20.axis%7Bstroke%3A%23444%3Bstroke-width%3A2%7D%20.guide%7Bstroke%3A%23bbb%3Bstroke-dasharray%3A6%206%7D%20.line1%7Bstroke%3A%232b6cb0%3Bstroke-width%3A4%3Bfill%3Anone%7D%20.line2%7Bstroke%3A%23e67e22%3Bstroke-width%3A4%3Bfill%3Anone%7D%20.title%7Bfont-size%3A22px%3Bfont-weight%3A700%7D%20.label%7Bfont-size%3A16px%7D%20.small%7Bfont-size%3A14px%3Bfill%3A%23555%7D%0A%3C/style%3E%0A%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22white%22/%3E%0A%3Ctext%20x%3D%22450%22%20y%3D%2230%22%20text-anchor%3D%22middle%22%20class%3D%22title%22%3EPPO%20clipped%20surrogate%20objective%20%28adapted%20from%20Figure%201%29%3C/text%3E%0A%3Cg%20transform%3D%22translate%2860%2C60%29%22%3E%0A%20%20%3Ctext%20x%3D%22180%22%20y%3D%22-10%22%20text-anchor%3D%22middle%22%20class%3D%22label%22%3EAdvantage%20%26gt%3B%200%3C/text%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%22340%22%20y2%3D%22220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%220%22%20y2%3D%2220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%2280%22%20y1%3D%2220%22%20x2%3D%2280%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22160%22%20y1%3D%2220%22%20x2%3D%22160%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22240%22%20y1%3D%2220%22%20x2%3D%22240%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%20220%20L160%20120%20L340%2020%22%20class%3D%22line1%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%20220%20L160%20120%20L240%2070%20L340%2070%22%20class%3D%22line2%22/%3E%0A%20%20%3Ctext%20x%3D%220%22%20y%3D%22245%22%20class%3D%22small%22%3E0%3C/text%3E%3Ctext%20x%3D%22153%22%20y%3D%22245%22%20class%3D%22small%22%3E1%3C/text%3E%3Ctext%20x%3D%22225%22%20y%3D%22245%22%20class%3D%22small%22%3E1%2B%CE%B5%3C/text%3E%0A%20%20%3Ctext%20x%3D%22280%22%20y%3D%22100%22%20class%3D%22small%22%3Eclip%20upper%20bound%3C/text%3E%0A%20%20%3Ctext%20x%3D%22250%22%20y%3D%2235%22%20class%3D%22small%22%3Er%C2%B7%C3%82%3C/text%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2265%22%20class%3D%22small%22%3Emin%28r%C2%B7%C3%82%2C%20clip%28r%29%C2%B7%C3%82%29%3C/text%3E%0A%3C/g%3E%0A%3Cg%20transform%3D%22translate%28500%2C60%29%22%3E%0A%20%20%3Ctext%20x%3D%22180%22%20y%3D%22-10%22%20text-anchor%3D%22middle%22%20class%3D%22label%22%3EAdvantage%20%26lt%3B%200%3C/text%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%22340%22%20y2%3D%22220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%220%22%20y2%3D%2220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%2280%22%20y1%3D%2220%22%20x2%3D%2280%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22160%22%20y1%3D%2220%22%20x2%3D%22160%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22240%22%20y1%3D%2220%22%20x2%3D%22240%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%2020%20L160%20120%20L340%20220%22%20class%3D%22line1%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%2070%20L80%2070%20L160%20120%20L340%20220%22%20class%3D%22line2%22/%3E%0A%20%20%3Ctext%20x%3D%220%22%20y%3D%22245%22%20class%3D%22small%22%3E0%3C/text%3E%3Ctext%20x%3D%2265%22%20y%3D%22245%22%20class%3D%22small%22%3E1-%CE%B5%3C/text%3E%3Ctext%20x%3D%22153%22%20y%3D%22245%22%20class%3D%22small%22%3E1%3C/text%3E%0A%20%20%3Ctext%20x%3D%225%22%20y%3D%2295%22%20class%3D%22small%22%3Eclip%20lower%20bound%3C/text%3E%0A%20%20%3Ctext%20x%3D%2220%22%20y%3D%2235%22%20class%3D%22small%22%3Emin%28r%C2%B7%C3%82%2C%20clip%28r%29%C2%B7%C3%82%29%3C/text%3E%0A%20%20%3Ctext%20x%3D%22270%22%20y%3D%22200%22%20class%3D%22small%22%3Er%C2%B7%C3%82%3C/text%3E%0A%3C/g%3E%0A%3C/svg%3E)
*图：论文 Figure 1 的核心思想重绘。横轴是新旧策略概率比 \(r_t(\theta)\)，纵轴是单步 surrogate term；当优势为正时，超过 \(1+\epsilon\) 的继续放大不再被奖励，当优势为负时，低于 \(1-\epsilon\) 的继续减小也不再被奖励。*

##### 算法伪代码

```python
# PPO, actor-critic style
for iteration in range(num_iterations):
    trajectories = []
    for actor in range(N):
        traj = rollout(policy_old, env, T)
        traj.advantages = compute_gae(traj, value_fn, gamma, lam)
        traj.returns = traj.advantages + value_fn(traj.states)
        trajectories.append(traj)

    batch = merge(trajectories)

    for epoch in range(K):
        for minibatch in random_minibatches(batch, size=M):
            ratio = exp(
                log_prob(policy, minibatch.actions, minibatch.states)
                - log_prob(policy_old, minibatch.actions, minibatch.states)
            )
            unclipped = ratio * minibatch.advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * minibatch.advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mean((value_fn(minibatch.states) - minibatch.returns) ** 2)
            entropy_bonus = mean(entropy(policy, minibatch.states))

            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            optimize(loss)

    policy_old.load_state_dict(policy.state_dict())
```

##### 动机与背景

PPO 的直接背景是：vanilla policy gradient 虽然简单，但步长一大就容易把策略更新推得太远；TRPO 虽然能通过信赖域约束抑制大更新，但它需要二阶近似、共轭梯度和复杂的 KL 约束求解，工程实现与扩展性都不理想。PPO 想解决的是同一个问题: 如何保留“每次策略别变太猛”这一核心思想，同时把优化过程重新写回标准的一阶 mini-batch 训练形式。

论文最重要的操作，是把“更新不要太大”从外部约束改写成内部目标。它不再直接求解受约束优化，而是对旧策略 \(\pi_{\theta_{\text{old}}}\) 采样得到的数据，构造一个只依赖概率比的 surrogate objective。这样就能像监督学习一样，在固定 batch 上做多轮梯度更新，而不是每用一次样本就必须重新采样。

##### 核心机制：裁剪 surrogate objective

定义新旧策略对同一动作的概率比：

$$
r_t(\theta) =
\frac{\pi_\theta(a_t \mid s_t)}
{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}.
$$

如果优势函数 \(\hat{A}_t > 0\)，说明动作 \(a_t\) 比 baseline 更好，那么增大它的概率是合理的；如果 \(\hat{A}_t < 0\)，说明这是个坏动作，那么应该减小其概率。问题在于，如果完全按照 \(r_t(\theta)\hat{A}_t\) 优化，概率比可能被推得过大或过小，导致策略一步跳出“可信区域”。

PPO 的 clip 版目标写成：

$$
L^{\text{CLIP}}(\theta)=
\hat{\mathbb{E}}_t
\left[
\min\left(
r_t(\theta)\hat{A}_t,\;
\mathrm{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t
\right)
\right].
$$

这个式子的直觉非常重要。对于好动作（\(\hat{A}_t > 0\)），一旦 \(r_t(\theta)\) 超过 \(1+\epsilon\)，目标就不再继续奖励更大的概率提升；对于坏动作（\(\hat{A}_t < 0\)），一旦 \(r_t(\theta)\) 低于 \(1-\epsilon\)，目标也不再鼓励继续把概率压得更低。也就是说，PPO 不是“硬性禁止”越界，而是让越界之后的进一步更新失去收益，从目标函数层面自然抑制策略爆冲。

> 💡 关键：PPO 的裁剪并不是把参数直接截断，而是把“继续远离旧策略”的收益截断。这样一来，优化器仍然是普通的一阶方法，但目标本身已经带有“近端更新”的偏好。

##### 为什么 PPO 能重复利用同一批 on-policy 数据

在普通策略梯度里，同一批样本如果反复优化，策略可能很快偏离采样时的分布，导致估计失真。PPO 用概率比 \(r_t(\theta)\) 显式建模“当前策略相对旧策略变了多少”，再用 clip 约束这种偏移，于是同一批轨迹可以安全地进行多轮 epoch 的 mini-batch SGD。论文的 Algorithm 1 正是：先 rollout 收集 \(N \times T\) 个时间步，再对 surrogate loss 做 \(K\) 轮优化。

实际实现中，PPO 通常采用 actor-critic 结构。策略网络负责输出动作分布，价值网络负责估计 \(V(s)\)，并通过 GAE 计算优势函数 \(\hat{A}_t\)。虽然论文的核心创新在 policy loss，但价值损失和熵正则也常和它一起联合优化，这就是后来工程实践里最常见的 PPO 形式。

##### 与 TRPO、KL-penalty 版 PPO 的区别

TRPO 的思想是通过 KL 约束让每步更新都在信赖域内，但它优化复杂，和参数共享、噪声结构、超大模型并不总是兼容。PPO 论文也讨论了 KL-penalty 版本，即在目标里显式加入 KL 惩罚项并自适应调整系数，但实验结论是 clip 版往往更直接、更稳、更好调。它本质上用一个“悲观下界”近似替代了严格的 trust region 约束。

从历史位置看，PPO 是强化学习工程化的分水岭。它没有重新定义策略梯度，只是在 objective 上做了一个极其高效的改写，却因此大幅改善了稳定性、复用率与可实现性。后来的 RLHF 之所以大规模采用 PPO，也是因为这个结构天然适合“先采样，再在固定 batch 上多轮优化”的训练范式。

#### 🧪 练习题

```yaml
question: "PPO 的 clipped objective 最核心的作用是什么？"
options:
  - "让算法可以直接使用离策略 replay buffer"
  - "把优势函数替换成状态价值函数"
  - "在目标函数层面抑制新策略相对旧策略的过大偏移"
  - "把随机策略变成确定性策略"
answer: 2
explain: "PPO 通过对概率比 r_t(θ) 的收益进行裁剪，阻止策略继续从“已经够大的更新”中获益，从而在一阶优化框架内实现近端更新。"
```
