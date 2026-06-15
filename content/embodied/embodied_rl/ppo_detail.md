### PPO — 近端策略优化 (Proximal Policy Optimization)

```yaml
id: ppo
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: '2017'
org: OpenAI
paper_url: https://arxiv.org/abs/1707.06347
category: foundation
parent: trpo
motivation: 剪切目标函数简化信任域优化
```

#### 📝 一句话总结

PPO 用裁剪后的概率比替代 TRPO 的复杂信任域约束，使策略更新既能多轮 mini-batch 复用数据，又能抑制新旧策略差异过大。它保留了 TRPO 稳定更新的直觉，但实现成本接近普通策略梯度。

#### 🎯 核心要点

- **裁剪替代目标**：用 \(\min(r_tA_t,\mathrm{clip}(r_t,1-\epsilon,1+\epsilon)A_t)\) 限制单样本策略改进幅度
- **概率比控制**：核心变量 \(r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}\)，直接刻画新旧策略对同一动作的概率变化
- **多 epoch mini-batch 更新**：同一批 rollout 数据可反复优化多轮，相比普通 on-policy 策略梯度样本效率更高
- **两种近端方案**：论文讨论 KL penalty 与 clipped surrogate，实践中 clipped PPO 更常用
- **Actor-Critic 训练**：策略损失、价值函数损失和 entropy bonus 通常联合优化
- **GAE 优势估计**：常与 Generalized Advantage Estimation 搭配，平衡方差与偏差
- **基准广泛**：在 MuJoCo 连续控制和 Atari 任务上取得优于或接近 TRPO 的效果，同时实现更简单、运行更快

#### 🔬 深入细节

##### 方法示意图

![PPO 论文实验图直链](https://ar5iv.labs.arxiv.org/html/1707.06347/assets/x1.png)

*图：ar5iv 提供的 PPO 论文图像资源。PPO 原文主要通过公式定义裁剪目标，未提供类似 TRPO 的框架示意图；因此方法理解重点在下方目标函数与伪代码。*

##### 算法伪代码

```python
# PPO-Clip
for iteration in range(num_iterations):
    trajectories = rollout(pi_theta_old, horizon=T)
    advantages = compute_gae(trajectories)
    returns = advantages + values_old

    for epoch in range(K):
        for minibatch in split(trajectories):
            ratio = pi_theta(a | s) / pi_theta_old(a | s)
            unclipped = ratio * advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mean((V_theta(s) - returns) ** 2)
            entropy_bonus = mean(entropy(pi_theta(. | s)))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            optimizer.step(loss)

    theta_old = theta
```

##### 动机与背景

TRPO 的稳定性来自 KL 信任域，但它需要 Fisher-vector product、共轭梯度和线搜索，工程实现复杂，也不容易和包含共享网络、离散动作、循环结构的策略一起使用。PPO 的目标是保留“不要让新策略离旧策略太远”这一原则，同时把优化问题改成普通一阶优化器可以直接处理的损失函数。

PPO 的核心变量是新旧策略概率比：

$$
r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}
$$

如果 \(A_t>0\)，说明旧策略采到的动作比平均更好，优化会倾向提高该动作概率；如果 \(A_t<0\)，则倾向降低该动作概率。问题在于，普通替代目标 \(r_t(\theta)A_t\) 可能把概率推得过远，导致和 TRPO 中同样的过大策略更新问题。

PPO-Clip 将目标改为：

$$
L^{\mathrm{CLIP}}(\theta)
=
\mathbb{E}_t
\left[
\min\left(
r_t(\theta)A_t,
\mathrm{clip}(r_t(\theta),1-\epsilon,1+\epsilon)A_t
\right)
\right]
$$

这个 \(\min\) 的设计非常关键。当 \(A_t>0\) 时，如果 \(r_t\) 已经超过 \(1+\epsilon\)，继续增大动作概率不会带来更多目标收益；当 \(A_t<0\) 时，如果 \(r_t\) 已经低于 \(1-\epsilon\)，继续压低概率也不会得到额外收益。裁剪不是硬性禁止策略变化，而是让“越界方向”的梯度消失，从而降低破坏性更新的诱因。

训练流程上，PPO 仍是 on-policy：先用当前策略采样 rollout，再在这批数据上更新若干 epoch，然后丢弃旧数据。与 vanilla policy gradient 每条数据只用一次不同，PPO 的裁剪目标允许有限复用同一批样本，使得样本效率和 wall-clock 效率都更好。

实际实现通常把策略损失和价值函数损失合并：

$$
L_t(\theta)=
\mathbb{E}_t\left[
L_t^{\mathrm{CLIP}}(\theta)
-c_1(V_\theta(s_t)-V_t^{\mathrm{target}})^2
+c_2\mathcal{H}(\pi_\theta(\cdot|s_t))
\right]
$$

价值函数负责降低优势估计方差，entropy bonus 防止策略过早坍缩。PPO 的简洁性也让它成为 RLHF、机器人控制和游戏智能体中非常常用的默认策略优化器。

> ⚠️ 注意：PPO 的 clip 并不等价于严格 KL 约束。实际训练中仍常监控 approximate KL，若 KL 过大则提前停止 epoch 或调小学习率。

##### 与 TRPO 的区别

| 维度 | TRPO | PPO |
|---|---|---|
| 更新限制 | 显式平均 KL 约束 | 裁剪概率比的软限制 |
| 优化器 | 共轭梯度 + 线搜索 | Adam/SGD 一阶优化 |
| 实现复杂度 | 高 | 低 |
| 数据复用 | 有限 | 多 epoch mini-batch |
| 理论保证 | 更接近单调改进下界 | 更偏工程近似 |

PPO 的贡献不是提出一个全新的 RL 目标，而是把 TRPO 的信任域思想压缩成一个可微、可 mini-batch 优化的目标函数。这种折中让它在实践中成为最通用的 on-policy 强化学习算法之一。

#### 🧪 练习题

```yaml
question: "PPO-Clip 中 clipped surrogate 的主要效果是什么？"
options:
  - "让策略完全不再改变"
  - "限制概率比越界方向的收益，降低过大策略更新风险"
  - "把 on-policy 算法改成 off-policy 算法"
  - "用模型预测替代真实环境采样"
answer: 1
explain: "当概率比超过 [1-ε, 1+ε] 且继续变化只会朝过大更新方向推进时，clip 后的目标不再给额外收益，从而抑制破坏性更新。"
```
