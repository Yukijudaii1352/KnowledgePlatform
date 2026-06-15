### grpo: 组相对策略优化 (GRPO)

```yaml
id: grpo
full_name: 组相对策略优化 (GRPO)
year: "2025"
paper_url: https://arxiv.org/abs/2501.12948
motivation: 组相对评分取代Critic模型
parent: rlhf
category: rl_based
```

#### 📝 一句话总结

GRPO 在同一问题上采样一组回答，用组内奖励均值和标准差估计相对 advantage，从而在 PPO 式 RL 中省掉单独的 critic/value model。

#### 🎯 核心要点

- **组内比较**：每个 prompt 采样 $G$ 个输出，用同组奖励相对高低定义 advantage。
- **无 critic**：不训练 value function，降低大模型 RL 的显存与训练复杂度。
- **PPO 近亲**：仍使用 ratio clipping 与 KL 参考约束控制策略更新。
- **DeepSeek-R1 场景**：用于推理模型强化学习，奖励常来自规则化 accuracy 与格式检查。
- **关键假设**：同一 prompt 下多样本奖励能提供足够稳定的局部基线。

#### 🔬 深入细节

##### 示意图/图源

![DeepSeek-R1 benchmark overview](https://ar5iv.labs.arxiv.org/html/2501.12948/assets/x1.png)

图源：DeepSeek-R1 论文 HTML 图 1；GRPO 方法在该论文的强化学习训练部分描述。

##### 算法/流程伪代码

```python
pi_ref = frozen_reference_model
pi_old = copy(policy)

for prompt in training_questions:
    outputs = [sample(pi_old, prompt) for _ in range(G)]
    rewards = [rule_or_model_reward(prompt, y) for y in outputs]

    mean_r = mean(rewards)
    std_r = std(rewards) + 1e-6
    advantages = [(r - mean_r) / std_r for r in rewards]

    for y, adv in zip(outputs, advantages):
        ratio = prob(policy, prompt, y) / prob(pi_old, prompt, y)
        clipped = clip(ratio, 1 - eps, 1 + eps)
        pg_obj = min(ratio * adv, clipped * adv)
        kl_penalty = beta * kl(policy, pi_ref, prompt, y)
        loss = -(pg_obj - kl_penalty)
        update(policy, loss)
```

##### 方法解读

**1. GRPO 的基线来自组内相对分数。** PPO 通常需要 value model 估计状态价值，作为 advantage 的基线。GRPO 对同一问题采样多条回答，用这些回答的奖励均值作为 baseline，用标准差归一化，从而得到组相对 advantage。

**2. 省掉 critic 是大模型 RL 的实际收益。** 对 7B、70B 乃至更大模型来说，训练和维护一个同规模或近似规模的 value model 成本很高，还会带来 value 估计不准的问题。GRPO 用采样组内统计替代 critic，显著简化训练系统。

**3. 目标仍然保留 PPO 的稳定机制。** GRPO 并不是无约束地提高高分回答概率。它仍使用旧策略比值、clip 操作和参考模型 KL 惩罚，防止单次更新过大，并限制策略偏离基础模型太远。

**4. 它特别适合可自动评分的推理任务。** DeepSeek-R1 场景中，数学、代码和格式化推理往往有规则奖励或可验证答案。只要同一 prompt 的多样采样能产生分数差，组内相对优势就能提供有效学习信号。

#### 🧪 练习题

```yaml
question: GRPO 为什么可以不训练单独的 critic/value model？
options:
  - A. 它用同一 prompt 下多条回答的组内奖励统计来估计 advantage
  - B. 它完全不需要奖励函数
  - C. 它只做监督学习，不做策略更新
  - D. 它把所有回答都赋予相同分数
answer: A
explain: GRPO 用组内均值和标准差构造相对 advantage，替代 PPO 中的 value baseline。
```

