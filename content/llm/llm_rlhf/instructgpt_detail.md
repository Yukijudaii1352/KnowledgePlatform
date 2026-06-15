### instructgpt: InstructGPT

```yaml
id: instructgpt
full_name: InstructGPT
year: "2022"
paper_url: https://arxiv.org/abs/2203.02155
motivation: RLHF工业化，指令遵循能力突破
parent: rlhf
category: rl_based
```

#### 📝 一句话总结

InstructGPT 把 RLHF 扩展成可规模化训练指令模型的工业流程：先监督微调，再训练奖励模型，最后用带 KL 约束的 PPO 优化指令遵循与人类偏好。

#### 🎯 核心要点

- **三阶段流程**：SFT、Reward Model、PPO 是 InstructGPT 的核心流水线。
- **偏好数据**：标注员对同一 prompt 的多个模型回答排序，排序被拆成成对偏好训练奖励模型。
- **KL 约束**：PPO 阶段约束策略不要偏离 SFT 模型太远，降低 reward hacking 与语言质量崩坏。
- **预训练混合**：PPO-ptx 额外混入预训练梯度，缓解对齐训练损伤通用语言建模能力。
- **影响**：证明较小的对齐模型可以比大得多的原始 GPT-3 更符合用户意图。

#### 🔬 深入细节

##### 示意图/图源

![InstructGPT three-step RLHF pipeline](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)

图源：InstructGPT 论文 HTML 图 2，展示监督微调、奖励模型训练和 PPO 强化学习三个阶段。

##### 算法/流程伪代码

```python
# Stage 1: supervised fine-tuning
pi_sft = train_lm(base_model, demonstrations)

# Stage 2: reward model
for prompt in prompts:
    responses = sample_k(pi_sft_or_candidates, prompt, k=4)
    ranking = human_rank(responses)
    pairwise_preferences += ranking_to_pairs(prompt, ranking)

r_phi = train_reward_model(pairwise_preferences)

# Stage 3: PPO with KL penalty
pi_theta = copy(pi_sft)
for batch in online_prompts:
    y = sample(pi_theta, batch.x)
    reward = r_phi(batch.x, y) - beta * kl(pi_theta(y | batch.x), pi_sft(y | batch.x))
    update_with_ppo(pi_theta, reward)
    optionally_mix_pretraining_gradient(pi_theta)
```

##### 方法解读

**1. InstructGPT 的真正创新在系统化。** RLHF 思想此前已经存在，但 InstructGPT 将它整理成面向 LLM 的稳定训练配方：用人工示范把模型带入指令分布，用偏好排序学习奖励，再用 RL 追求人类更喜欢的输出。

**2. 奖励模型学习的是排序而非单点评分。** 对同一 prompt 下的多个回答，标注员给出整体排名。训练时将排名拆为多个 $(y_w,y_l)$ 对，奖励模型学习让优胜回答的标量分数高于落败回答。这样可以高效复用一次人工排序产生的多对比较。

**3. PPO 阶段必须防止奖励过优化。** 如果只最大化奖励模型，策略可能找到奖励模型漏洞，例如空洞迎合、格式异常或偏离原有语言能力。论文用相对 SFT 模型的 KL 惩罚控制更新半径，使模型在“更符合偏好”和“仍像一个可靠语言模型”之间折中。

**4. 评估关注真实用户意图。** InstructGPT 的目标不是提高传统语言建模困惑度，而是让回答更有帮助、更诚实、更无害。论文中的人类评估显示，经过 RLHF 的 1.3B 模型在偏好上可超过 175B GPT-3 原始模型，说明对齐数据和目标函数能显著改变模型可用性。

#### 🧪 练习题

```yaml
question: InstructGPT 的 PPO 阶段为什么加入 KL 惩罚？
options:
  - A. 限制策略偏离 SFT 模型，降低奖励模型被过度利用的风险
  - B. 让奖励模型不再需要人工偏好数据
  - C. 把排序任务变成多分类任务
  - D. 保证所有回答长度完全一致
answer: A
explain: KL 项约束策略更新幅度，使模型在优化奖励时仍保持语言质量和指令分布稳定。
```

