### rlaif: 基于AI反馈的强化学习 (RLAIF)

```yaml
id: rlaif
full_name: 基于AI反馈的强化学习 (RLAIF)
year: "2023"
paper_url: https://arxiv.org/abs/2309.00267
motivation: AI反馈替代人工偏好标注
parent: constitutional_ai
category: rl_based
```

#### 📝 一句话总结

RLAIF 用强大的 AI 评审器生成偏好信号，替代或补充人工偏好标注，从而把 RLHF 中最昂贵、最慢的反馈环节规模化。

#### 🎯 核心要点

- **AI 偏好标签**：用 LLM judge 比较两个回答，生成软偏好或硬偏好。
- **位置偏差控制**：交换候选回答顺序并聚合判断，降低 judge 偏向第一个或第二个答案的风险。
- **蒸馏式 RLAIF**：先用 AI 标签训练奖励模型，再按 RLHF 流程优化策略。
- **直接式 RLAIF**：也可以把 judge 的反馈直接作为奖励来源，减少中间模型。
- **适用范围**：在摘要、帮助性对话和无害性对话等任务上接近或超过人类反馈基线。

#### 🔬 深入细节

##### 示意图/图源

![RLAIF versus RLHF workflow](https://ar5iv.labs.arxiv.org/html/2309.00267/assets/x3.png)

图源：RLAIF 论文 HTML 图 2，对比 AI 反馈路径与传统人工反馈路径。

##### 算法/流程伪代码

```python
judge = load_large_language_model()
policy = supervised_or_rlhf_model

for prompt in preference_prompts:
    y_a, y_b = sample_two(policy, prompt)

    score_ab = judge_preference(judge, prompt, first=y_a, second=y_b)
    score_ba = judge_preference(judge, prompt, first=y_b, second=y_a)
    preference = debias_and_average(score_ab, reverse(score_ba))

    ai_preference_data.append((prompt, y_a, y_b, preference))

reward_model = train_reward_model(ai_preference_data, soft_labels=True)

for prompt in rl_prompts:
    response = sample(policy, prompt)
    reward = reward_model(prompt, response)
    policy = ppo_update(policy, reward, kl_reference=policy.initial_checkpoint)
```

##### 方法解读

**1. RLAIF 关注反馈瓶颈。** RLHF 的数据采集成本高、周期长，并且标注一致性受标注员训练影响。RLAIF 的目标不是证明 AI judge 永远比人类正确，而是在许多可形式化的偏好维度上，用模型反馈扩大标注吞吐量。

**2. AI judge 可以输出软偏好。** 论文让 judge 对“回答 1”和“回答 2”的选择 token 产生概率，由这些概率形成偏好分布。软标签保留不确定性，比简单地取 argmax 更适合训练奖励模型，尤其是在两个回答质量接近时。

**3. 偏差处理是关键工程细节。** LLM judge 常有位置偏差、长度偏差和风格偏差。RLAIF 通过交换候选顺序、使用 chain-of-thought 式评审提示、聚合多次判断等方式提高反馈可靠性。否则，奖励模型会继承 judge 的系统偏差。

**4. 与 Constitutional AI 的关系。** Constitutional AI 可以看作 RLAIF 在安全原则上的一个代表性实例；RLAIF 更泛化，强调 AI 反馈可用于帮助性、摘要质量、无害性等多种偏好任务。两者共同推动了“AI 反馈放大人类原则”的对齐路线。

#### 🧪 练习题

```yaml
question: RLAIF 中交换两个候选回答顺序的主要目的是什么？
options:
  - A. 检测并减轻 AI judge 的位置偏差
  - B. 让两个回答拥有相同长度
  - C. 避免训练任何奖励模型
  - D. 把二分类问题变成回归问题
answer: A
explain: 如果 judge 固定偏好某个位置，交换顺序并聚合判断可以减少这种非语义偏差。
```
