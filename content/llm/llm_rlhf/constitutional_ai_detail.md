### constitutional_ai: 宪法AI (Constitutional AI)

```yaml
id: constitutional_ai
full_name: 宪法AI (Constitutional AI)
year: "2022"
paper_url: https://arxiv.org/abs/2212.08073
motivation: 宪法原则驱动的自我修订机制
parent: rlhf
category: rl_based
```

#### 📝 一句话总结

Constitutional AI 用一组显式原则替代大量人工无害性标注，让模型先按原则自我批评和修订，再用 AI 偏好训练奖励模型完成无害性对齐。

#### 🎯 核心要点

- **宪法原则**：把价值约束写成可读原则，指导模型 critique、revise 与 preference judgment。
- **监督阶段**：模型先生成有问题回答，再依据原则自我批评并改写，形成 SL-CAI 数据。
- **RL 阶段**：AI 根据宪法原则比较候选回答，训练偏好/奖励模型，再做强化学习。
- **减少人工标注**：目标是降低对人类逐条无害性比较的依赖，而不是完全取消人类价值选择。
- **可解释性**：原则列表把“模型为什么拒答或改写”显式化，便于审计和迭代。

#### 🔬 深入细节

##### 示意图/图源

![Constitutional AI pipeline](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)

图源：Constitutional AI 论文 HTML 图 1，展示监督式自我修订阶段和基于 AI 偏好的 RL 阶段。

##### 算法/流程伪代码

```python
constitution = load_principles()
base_assistant = helpful_rlhf_model

# Supervised Constitutional AI
for harmful_prompt in red_team_prompts:
    draft = base_assistant.generate(harmful_prompt)
    critique = base_assistant.generate_critique(draft, principles=constitution)
    revision = base_assistant.revise(draft, critique, principles=constitution)
    cai_sft_data.append((harmful_prompt, revision))

pi_cai = supervised_finetune(base_assistant, cai_sft_data)

# RL from AI Feedback
for prompt in prompts:
    y1, y2 = sample_two(pi_cai, prompt)
    preference = ai_judge(y1, y2, principles=constitution)
    ai_preference_data.append((prompt, y1, y2, preference))

reward_model = train_preference_model(ai_preference_data)
aligned_policy = ppo(pi_cai, reward_model, kl_reference=pi_cai)
```

##### 方法解读

**1. “宪法”是训练信号的来源接口。** 这里的 constitution 不是模型内部硬编码规则，而是一组自然语言原则。模型在生成 critique、revision 和偏好判断时都要参考这些原则，因此价值约束从隐式标注习惯变成显式文本条件。

**2. 自我修订把有害样本转成监督样本。** 对有害 prompt，模型先给出初稿，再指出初稿违反原则的位置，最后生成更合适的修订版。这个过程把“哪里错了”和“应该怎么改”合并到训练数据中，使监督微调阶段就能学到拒绝、解释和安全替代回答。

**3. RLAIF 阶段扩展了 RLHF 的比较者。** 传统 RLHF 的偏好标签来自人类；Constitutional AI 中，AI 根据原则对两个回答做比较，再训练偏好模型。关键假设是：如果原则清楚且 judge 模型足够强，AI 能以更低成本生成大量一致的无害性偏好。

**4. 人类仍然决定原则边界。** Constitutional AI 并不是把价值判断完全交给模型。原则的选择、冲突处理、覆盖范围和最终评估仍需要人类负责。它改变的是标注放大机制：从“人类逐条判断”转为“人类设计原则，AI 按原则批量反馈”。

#### 🧪 练习题

```yaml
question: Constitutional AI 与普通 RLHF 的主要差别是什么？
options:
  - A. 它用显式原则驱动模型自我批评、修订和 AI 偏好反馈
  - B. 它完全不需要任何人类参与或价值选择
  - C. 它只训练基础语言模型，不训练偏好模型
  - D. 它把所有安全问题都改成检索问题
answer: A
explain: CAI 的核心是用自然语言原则放大反馈过程，人类仍需设计和审计这些原则。
```

