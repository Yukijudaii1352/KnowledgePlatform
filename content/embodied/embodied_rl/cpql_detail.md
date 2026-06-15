### CPQL — 保守Peng's Q学习 (Conservative Peng's Q-Learning)

```yaml
id: cpql
name: CPQL
full_name: 保守Peng's Q学习 (Conservative Peng's Q-Learning)
year: '2026'
org: ICLR
paper_url: https://openreview.net/forum?id=Ml4AtrrfQT
category: offline_rl
parent: cql
motivation: Peng's Q算子保守价值估计
```

#### 📝 一句话总结

CPQL 将 Peng's Q(\(\lambda\)) 多步算子嵌入 CQL 的保守价值估计，用离线轨迹的多步信息缓解单步 Bellman backup 的过度悲观，同时保持对分布外动作的保守约束。它的固定点对应行为策略与学习策略的混合策略价值，因此天然带有隐式行为正则。

#### 🎯 核心要点

- **官方论文**：OpenReview 条目为 ICLR 2026 poster；arXiv 可访问版本为 `2605.14779`
- **多步离线算子**：使用 Peng's Q(\(\lambda\)) operator，而不是单步 Bellman operator
- **固定点解释**：PQL 在离线设置下收敛到 \(\lambda\hat{\pi}_\beta+(1-\lambda)\pi\) 的混合策略价值
- **保守项继承 CQL**：critic loss 保留 CQL 风格 log-sum-exp 减数据动作 Q 的正则
- **缓解过度悲观**：多步轨迹信息使 Q 估计比 CQL 更温和，减少 conservative value estimation 的过低估值
- **理论保证**：给出混合策略价值下界、至少不低于行为策略、缩小次优间隙等结果
- **离线到在线**：CPQL 预训练 Q 函数后接在线 PQL，可缓解 online fine-tuning 开始阶段的性能掉落

#### 🔬 深入细节

##### 方法示意图

![CPQL 方法示意图](https://arxiv.org/html/2605.14779v1/x1.png)

*图：CPQL 论文 arXiv HTML 中的主图资源。核心思想是用 PQL 多步目标替换 CQL 的单步 Bellman 目标，同时保留保守 Q 正则。*

##### 算法伪代码

```python
# Conservative Peng's Q(lambda)
initialize Q1, Q2, policy pi, target_Q1, target_Q2

for gradient_step in range(num_steps):
    traj = sample_partial_trajectories(D, length=n)

    # 从尾到头构造 Peng's Q(lambda) 多步目标
    for i in reversed(range(n)):
        for j in [1, 2]:
            q_hat[j][i] = (
                r[i]
                + gamma * target_Qj(s[i+1], pi(s[i+1]))
                + gamma * lambda_ * (q_hat[j][i+1] - target_Qj(s[i+1], pi(s[i+1])))
            )

    y = min(q_hat[1][0], q_hat[2][0]) - gamma**n * alpha_td * log_prob(pi, s[n])

    # CQL-style conservative critic loss
    conservative = logsumexp(Qj(s, all_actions)) - mean(Qj(s, dataset_actions))
    critic_loss = 0.5 * mse(Qj(s0, a0), y) + alpha_cql * conservative
    update(Q1, Q2, critic_loss)

    # SAC-style actor update
    actor_objective = mean(min(Q1(s, pi(s)), Q2(s, pi(s))) - alpha_pol * log_prob(pi, s))
    update(pi, -actor_objective)
    soft_update_targets()
```

##### 动机与背景

CQL 解决了离线 RL 的 OOD 动作过估计问题，但保守正则也可能带来过度悲观：Q 值被压得太低时，策略改进信号变弱，尤其在高质量数据或需要轨迹拼接的任务中会损失性能。另一方面，很多离线数据以完整轨迹存在，单步 Bellman backup 没有充分利用多步回报信息。CPQL 的问题意识是：能否用多步算子提供更丰富的价值传播，同时仍保持 CQL 的保守性？

Peng's Q(\(\lambda\)) operator 定义为：

$$
\mathcal{T}^{\pi_\beta,\pi}_\lambda Q
=
(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}
\mathcal{T}^{\pi_\beta,\pi}_n Q
$$

其中 \(\mathcal{T}^{\pi_\beta,\pi}_n Q=(\mathcal{T}^{\pi_\beta})^{n-1}\mathcal{T}^{\pi}Q\)。直觉上，前 \(n-1\) 步沿行为策略轨迹传播，最后一步使用学习策略评估。这非常适合离线数据，因为真实轨迹来自行为策略，而目标仍希望朝学习策略改进。

CPQL 将 CQL 的单步 Bellman 目标替换为 PQL 目标：

$$
\widehat{Q}_{k+1}
\in
\arg\min_Q
\left\{
\frac{1}{2}\mathbb{E}_{\mathcal{D}}
\left[
\left(Q(s,a)-\mathcal{T}_{\lambda}^{\hat{\pi}_\beta,\pi_k}\widehat{Q}_k(s,a)\right)^2
\right]
+\alpha
\left(
\mathbb{E}_{s\sim\mathcal{D},a\sim\pi_k}Q(s,a)
-\mathbb{E}_{s,a\sim\mathcal{D}}Q(s,a)
\right)
\right\}
$$

这个公式说明 CPQL 不是丢掉 CQL，而是把 CQL 的 target 从单步换成多步。保守项继续压制学习策略在 OOD 动作上的高 Q，PQL target 则利用离线轨迹的长时序信息，避免所有改进都依赖单步 bootstrapping。

论文给出的关键固定点解释是：PQL operator 在离线设置下对应混合策略 \(\lambda\hat{\pi}_\beta+(1-\lambda)\pi\) 的价值。这样 \(\lambda\) 控制行为策略锚定强度：\(\lambda=0\) 退回单步 CQL 风格；\(\lambda\) 较大时价值更接近行为策略，分布偏移更小，但过大也会限制最优性。

实际算法从离线数据中采样长度为 \(n\) 的 partial trajectories，从尾到头递推：

$$
\widehat{Q}_{\theta_j}^{i}
=
r_i+\gamma Q_{\theta_j^-}(s_{i+1},\pi_\phi(s_{i+1}))
+\gamma\lambda
\left(
\widehat{Q}_{\theta_j}^{i+1}
-Q_{\theta_j^-}(s_{i+1},\pi_\phi(s_{i+1}))
\right)
$$

然后用双 Q 的最小值构造 target，并加上 entropy 项。actor 更新与 SAC 类似，最大化 \(\min_jQ_{\theta_j}(s,a)-\alpha_{\mathrm{pol}}\log\pi(a|s)\)。因此 CPQL 可视为“CQL critic 正则 + PQL 多步 target + SAC actor”的组合。

> 💡 关键：CPQL 的 \(\lambda\) 不是普通 TD(\(\lambda\)) 的工程技巧，而是控制行为策略与学习策略混合固定点的保守性旋钮。

##### 与 CQL 的区别

| 维度 | CQL | CPQL |
|---|---|---|
| Backup | 单步 Bellman target | Peng's Q(\(\lambda\)) 多步 target |
| 保守性来源 | Q 正则压低 OOD 动作 | Q 正则 + 行为策略混合固定点 |
| 轨迹利用 | 主要用单步 transition | 使用 partial trajectory 多步信息 |
| 主要改进 | 防过估计 | 防过估计同时缓解过度悲观 |

CPQL 的代价是多步 target 会增加一些计算和实现复杂度，并且在低质量数据上过长轨迹可能传播不理想行为。论文因此将轨迹长度、\(\alpha\) 和 \(\lambda\) 作为关键超参数，并报告 CPQL 可在 \(\lambda=0\) 时复现单步 TD 学习。

#### 🧪 练习题

```yaml
question: "CPQL 中 Peng's Q(λ) 算子的核心作用是什么？"
options:
  - "完全移除 CQL 的保守正则项"
  - "用离线轨迹的多步信息替换单步 Bellman target，并形成行为策略与学习策略的混合固定点"
  - "把离线 RL 改成纯行为克隆"
  - "只用于图像数据增强"
answer: 1
explain: "CPQL 将 PQL 多步算子嵌入 CQL critic 目标，使价值估计利用离线轨迹长程信息，同时通过混合策略固定点减轻分布偏移和过度悲观。"
```
