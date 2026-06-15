### spac: 自博弈对抗Critic (SPAC)

```yaml
id: spac
full_name: 自博弈对抗Critic (SPAC)
year: "2024"
paper_url: https://arxiv.org/abs/2406.04274
motivation: 自博弈对抗Critic离线对齐
parent: dpo
category: direct_preference
```

#### 📝 一句话总结

SPAC 把离线偏好对齐写成策略与对抗 critic 的自博弈问题，用悲观 critic 修正离线数据覆盖不足下 DPO 类方法的最优性缺口。

#### 🎯 核心要点

- **离线对齐问题**：偏好数据固定时，策略可能在数据覆盖差的区域被过度乐观地优化。
- **自博弈结构**：learner policy 与 adversarial critic 形成 Stackelberg 式博弈。
- **悲观原则**：critic 对覆盖不足区域保持保守，降低离线外推风险。
- **理论目标**：在较弱的单策略 concentrability 条件下给出可证明收敛保证。
- **实践形态**：实现上仍可接近 DPO 风格的直接偏好优化，便于扩展到 7B 级模型。

#### 🔬 深入细节

##### 示意图/图源

公开图源链接：SPAC 论文 HTML 页面 https://ar5iv.labs.arxiv.org/html/2406.04274 ，arXiv 摘要页 https://arxiv.org/abs/2406.04274 。该公开 HTML 未提供独立论文图片资产，因此这里引用公开页面作为图源，并用下方流程伪代码概括算法结构。

##### 算法/流程伪代码

```python
offline_preferences = load_pairs()  # (x, y_win, y_lose)
pi_theta = initialize_from_sft()
critic_psi = initialize_adversarial_critic()

for step in range(T):
    # learner proposes policy scores on offline preference pairs
    policy_margin = score(pi_theta, x, y_win) - score(pi_theta, x, y_lose)

    # critic searches for conservative/adversarial values under coverage limits
    critic_penalty = critic_psi(x, y_win, y_lose, data_coverage=offline_preferences)
    critic_loss = adversarial_objective(policy_margin, critic_penalty)
    update(critic_psi, maximize=critic_loss)

    # policy improves against the adversarial critic
    preference_loss = -log_sigmoid(policy_margin - critic_penalty)
    regularizer = kl_or_reference_control(pi_theta)
    update(pi_theta, preference_loss + regularizer)
```

##### 方法解读

**1. SPAC 针对离线偏好优化的覆盖问题。** DPO 类方法通常把已有偏好对当作足够代表目标分布的数据，但离线数据不可能覆盖所有模型可能生成的回答。策略一旦偏离数据支持集，偏好估计就可能变得过度乐观。

**2. adversarial critic 扮演保守评估者。** SPAC 不只让策略最大化偏好目标，还训练一个 critic 去寻找当前策略在离线数据下不可靠的方向。这个 critic 的作用类似离线 RL 中的 pessimism：对缺乏数据支撑的改进保持怀疑。

**3. 自博弈带来理论抓手。** 论文将 learner 与 critic 的交互组织成博弈，使策略更新不是单纯追逐经验偏好，而是在对抗评估下寻找稳健解。这样可以在比全局覆盖更弱的条件下证明收敛和样本效率性质。

**4. SPAC 与 DPO 的关系是“加 critic 的直接优化”。** 它并不回到传统 RLHF 的在线 PPO 奖励模型流程，而是在离线偏好优化目标中加入对抗 critic 校正。因此 SPAC 适合被看作 DPO 家族面向离线可靠性的扩展。

#### 🧪 练习题

```yaml
question: SPAC 引入 adversarial critic 的主要原因是什么？
options:
  - A. 在离线数据覆盖不足时对策略改进进行保守校正
  - B. 替代 tokenizer 并改变词表大小
  - C. 让模型只能输出固定模板
  - D. 删除偏好数据中的所有 rejected 回答
answer: A
explain: SPAC 的 critic 用于发现和惩罚离线数据支持不足的乐观改进方向。
```

