### rlhf: 基于人类反馈的强化学习 (RLHF)

```yaml
id: rlhf
full_name: 基于人类反馈的强化学习 (RLHF)
year: "2017"
paper_url: https://arxiv.org/abs/1706.03741
motivation: 三阶段流程，PPO+奖励模型对齐
parent: —
category: foundational
```

#### 📝 一句话总结

RLHF 把“人类更喜欢哪个行为”转成可优化的奖励模型，再用强化学习把策略推向人类偏好，是后来 InstructGPT、ChatGPT 与大量偏好优化算法的共同母体。

#### 🎯 核心要点

- **核心对象**：不是直接让人类写奖励函数，而是让人类比较两个轨迹片段的优劣。
- **奖励学习**：用 Bradley-Terry 形式把片段总奖励转成偏好概率，训练可微的奖励预测器。
- **策略优化**：把奖励模型当作环境奖励，用 RL 算法持续优化策略。
- **主动采样**：优先查询模型不确定或信息量大的片段对，降低人工反馈成本。
- **历史意义**：奠定了“预训练/监督微调 + 奖励模型 + RL 微调”的对齐范式。

#### 🔬 深入细节

##### 示意图/图源

![Deep RL from Human Preferences workflow](https://ar5iv.labs.arxiv.org/html/1706.03741/assets/x1.png)

图源：Christiano et al., 2017 论文 HTML 图 1，展示 agent 采样片段、人类比较、奖励预测器训练、策略最大化预测奖励的闭环。

##### 算法/流程伪代码

```python
initialize policy pi_theta
initialize reward_model r_phi
pretrain or randomly initialize pi_theta

for iteration in range(T):
    trajectories = rollout(policy=pi_theta, env=environment)
    segment_pairs = select_pairs(trajectories, strategy="uncertainty_or_random")

    labels = []
    for seg_a, seg_b in segment_pairs:
        # human returns which segment is preferred
        labels.append(human_preference(seg_a, seg_b))

    for batch in preference_batches(segment_pairs, labels):
        score_a = sum(r_phi(s, a) for s, a in batch.seg_a)
        score_b = sum(r_phi(s, a) for s, a in batch.seg_b)
        p_a = exp(score_a) / (exp(score_a) + exp(score_b))
        update(r_phi, loss=cross_entropy(p_a, batch.preference))

    pi_theta = reinforce_or_ppo(policy=pi_theta, reward=r_phi)
```

##### 方法解读

**1. 偏好比较替代显式奖励。** 许多复杂任务里，人类很难为每一步动作写出数值奖励，却能相对稳定地判断两个短片段哪个更好。RLHF 的关键转化是：把绝对评分问题改成成对排序问题，再从排序中恢复一个可用于 RL 的奖励函数。

**2. 奖励模型是人类反馈的压缩器。** 对两个片段 $\sigma^1,\sigma^2$，论文令片段得分为 token/时间步奖励之和，并用
$$
P(\sigma^1 \succ \sigma^2)=
\frac{\exp\sum_t r_\phi(s_t^1,a_t^1)}
{\exp\sum_t r_\phi(s_t^1,a_t^1)+\exp\sum_t r_\phi(s_t^2,a_t^2)}
$$
拟合人类偏好。训练好的 $r_\phi$ 不是“真奖励”，而是偏好数据在当前模型容量和采样分布下的代理。

**3. 策略优化与奖励学习形成闭环。** 初始策略产生的数据通常覆盖面有限；当策略被奖励模型推到新区域后，奖励模型也可能外推失准。因此 RLHF 不是一次性训练奖励模型后结束，而是持续采样、查询、更新奖励模型，再继续训练策略。

**4. 对大语言模型的启发。** 在 LLM 场景里，“轨迹片段”变成 prompt-response，“人类比较”变成两个回答的偏好标注，“环境 RL”通常变成带 KL 约束的 PPO。虽然原论文不是专门为 LLM 写的，但它给出了后来三阶段 RLHF 工业流程的算法骨架。

#### 🧪 练习题

```yaml
question: RLHF 为什么通常需要单独训练奖励模型？
options:
  - A. 因为人类更容易提供相对偏好，奖励模型能把偏好压缩成可优化信号
  - B. 因为奖励模型可以完全消除策略优化中的分布偏移
  - C. 因为 PPO 只能读取神经网络奖励，不能读取环境奖励
  - D. 因为偏好标注天然给出每个 token 的精确奖励
answer: A
explain: 人类偏好通常是成对、稀疏和相对的；奖励模型把这些比较转成连续得分，供后续 RL 优化。
```

