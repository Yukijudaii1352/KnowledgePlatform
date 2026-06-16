### RLAIF

```yaml
id: rlaif
name: RLAIF
full_name: AI反馈强化学习 (RL from AI Feedback)
year: '2023.09'
org: Google
paper_url: https://arxiv.org/abs/2309.00267
category: rlhf
parent: instructgpt
motivation: AI反馈替代昂贵的人工标注
```

#### 📝 一句话总结

RLAIF 用现成 LLM 生成偏好或奖励信号来替代昂贵的人类偏好标注，并证明在摘要、帮助性对话和无害性对话任务上可达到与 RLHF 接近的对齐效果。

#### 🎯 核心要点

- 系统比较 RLAIF 与 RLHF：用 AI 偏好标签训练奖励模型，再用强化学习优化策略模型
- AI 标注器使用 off-the-shelf LLM，不针对下游任务微调，主要实验使用 PaLM 2 系列
- 偏好标签来自 token “1” 与 “2” 的 log-probability softmax，保留软标签不确定性
- 通过交换候选回答顺序做两次推断并平均，缓解 LLM 对第一/第二位置的偏置
- 引入 CoT 两阶段偏好标注：先让 LLM 生成理由，再把理由拼回 prompt 中计算偏好分布
- 提出 canonical RLAIF 和 direct-RLAIF：前者蒸馏 AI 偏好到 Reward Model，后者直接让 LLM 在 RL 时给 1-10 分奖励
- RL 阶段采用带 baseline 的 REINFORCE 语言模型目标，终止 token 获得 RM 或 LLM 奖励
- 实验覆盖 Reddit TL;DR、OpenAI human preferences、Anthropic Helpful/Harmless 偏好数据集
- 人类评估中 RLAIF 与 RLHF 在摘要和帮助性对话上无显著差异，在无害性对话上 RLAIF harmless rate 更高

#### 🔬 深入细节

![RLAIF 与 RLHF 流程对比](https://arxiv.org/html/2309.00267v3/x3.png)
*图：论文 Figure 2。RLAIF 用 LLM 生成偏好标签训练 RM，而 RLHF 使用人类偏好标注。*

![RLAIF 的 AI 偏好标注流程](https://arxiv.org/html/2309.00267v3/x4.png)
*图：论文 Figure 3。LLM 先生成偏好理由，再基于拼接后的 prompt 输出 “1” 与 “2” 的偏好分布。*

![Direct-RLAIF 流程](https://arxiv.org/html/2309.00267v3/x5.png)
*图：论文 Figure 4。Direct-RLAIF 直接调用通用 LLM 给生成结果打分，把分数作为 RL 奖励。*

```python
# Canonical RLAIF + Direct-RLAIF 训练流程伪代码
def ai_preference_labeler(llm, context, response_a, response_b):
    prompt_ab = build_preference_prompt(context, response_a, response_b)
    p_ab = softmax(llm.logprob(prompt_ab, tokens=["1", "2"]))

    prompt_ba = build_preference_prompt(context, response_b, response_a)
    p_ba_reversed = softmax(llm.logprob(prompt_ba, tokens=["2", "1"]))

    return average(p_ab, p_ba_reversed)  # 缓解位置偏差的软偏好标签


def canonical_rlaif(policy_sft, ai_labeler, preference_pairs):
    ai_labels = []
    for context, y1, y2 in preference_pairs:
        ai_labels.append(ai_preference_labeler(ai_labeler, context, y1, y2))

    reward_model = train_reward_model_cross_entropy(preference_pairs, ai_labels)

    policy = copy(policy_sft)
    value_model = initialize_value_model(policy_sft)
    for batch in rollout_prompts():
        responses = policy.generate(batch)
        rewards = reward_model.score(batch, responses)
        policy, value_model = reinforce_update(policy, value_model, batch, responses, rewards)

    return policy


def direct_rlaif(policy_sft, scoring_llm):
    policy = copy(policy_sft)
    value_model = initialize_value_model(policy_sft)

    for batch in rollout_prompts():
        responses = policy.generate(batch)
        rewards = []
        for context, response in zip(batch, responses):
            probs = normalize(scoring_llm.logprob(score_prompt(context, response), tokens=list("123456789") + ["10"]))
            score = sum(i * probs[str(i)] for i in range(1, 11))
            rewards.append(normalize_to_minus_one_one(score))
        policy, value_model = reinforce_update(policy, value_model, batch, responses, rewards)

    return policy
```

RLAIF 的动机来自 RLHF 的标注瓶颈。RLHF 需要人类对候选回答做成对偏好比较，这在摘要、对话安全、复杂指令等任务中成本高、周期长且扩展困难。本文要回答的问题不是“AI 反馈能不能辅助人类反馈”，而是更强的版本：在控制任务和训练流程的情况下，AI 反馈能否作为人类反馈的可行替代。

AI 偏好标注的基本单元是一段上下文 \(x\) 和两个候选回答 \(y_1,y_2\)。论文把 prompt 组织为 preamble、few-shot exemplars、sample、ending 四段，然后读取 LLM 生成 token “1” 和 “2” 的 log-probability：
$$
P_{\text{AI}}=\operatorname{softmax}(\log p(\text{"1"}\mid x,y_1,y_2),\log p(\text{"2"}\mid x,y_1,y_2)).
$$
使用软标签比硬标签更有信息量，因为 \(P_{\text{AI}}=[0.55,0.45]\) 和 \([0.99,0.01]\) 代表完全不同的置信度。

位置偏差是 AI 标注器的主要噪声源。LLM 可能偏向第一或第二个展示的回答，而不是只根据内容判断。论文对同一候选对做两次推断：一次按 \((y_1,y_2)\)，一次交换为 \((y_2,y_1)\)，再把第二次结果映射回原顺序后平均。这个设计把“内容偏好”和“位置偏好”拆开，尤其能缓解小模型标注器更强的位置偏置。

Canonical RLAIF 把 AI 偏好蒸馏进 Reward Model。若 RM 给两个回答的分数为 \(r_\phi(x,y_1)\)、\(r_\phi(x,y_2)\)，训练目标是让 RM 的 softmax 分布匹配 AI 软偏好：
$$
\mathcal{L}_{RM}
=-\sum_{i\in\{1,2\}}P_{\text{AI}}(i)
\log\frac{\exp r_\phi(x,y_i)}{\exp r_\phi(x,y_1)+\exp r_\phi(x,y_2)}.
$$
这样做的好处是 RL 阶段只需调用较小 RM，成本低；缺点是 RM 固定在初始策略生成的数据分布上，随着策略更新可能出现 reward model staleness。

Direct-RLAIF 直接绕过 RM。论文让 off-the-shelf LLM 对生成回答给 1 到 10 分，读取每个分数 token 的概率并计算期望分：
$$
s(y\mid x)=\sum_{i=1}^{10} i\cdot P(i\mid x,y),
$$
再归一化到 \([-1,1]\) 作为 RL 奖励。它省掉了偏好数据生成和 RM 训练，也避免 RM 过时；代价是 RL 过程中需要频繁调用 LLM 标注器，计算成本更高。

RL 优化采用语言模型版 REINFORCE。状态 \(X_t\) 是 prompt 加上已生成 token，动作 \(A_t\) 是下一个 token，只有完整回答结束时获得非零奖励 \(R_T\)。当 \(\gamma=1\) 时，每个时间步的 return 都是 \(Z_t=R_T\)，策略梯度损失写作：
$$
\mathcal{L}_{PG}(\theta)
=-\sum_t \log\pi_\theta(A_t\mid X_t)\,
\overline{(Z_t-V^\pi_\psi(X_t))}.
$$
上划线表示优势项不反传梯度；\(V^\pi_\psi\) 是 value baseline，用 MSE 拟合 return，从而降低 REINFORCE 的方差。

实验结论的关键是：RLAIF 不只是省钱，还能在端到端人类评估中接近 RLHF。论文报告摘要任务中 RLAIF/RLHF 相对 SFT 胜率为 71%/73%，帮助性对话为 63%/64%，两者差异不显著；无害性对话中 RLAIF harmless rate 为 88%，高于 RLHF 的 76%。不过 AI 反馈也会继承标注 LLM 的偏见和盲点，在医疗、法律等高风险场景仍不应把 AI 标注器视为人类专家的无条件替代。

> 💡 关键：RLAIF 的核心不是换一个奖励函数名称，而是把“人类偏好数据采集”替换为“LLM 偏好或评分生成”，并用位置去偏、CoT、软标签和 direct scoring 控制 AI 标注噪声。

#### 🧪 练习题

```yaml
question: "Direct-RLAIF 相比 canonical RLAIF 的主要区别是什么？"
options:
  - "Direct-RLAIF 不使用任何强化学习"
  - "Direct-RLAIF 直接调用 LLM 给生成结果打分作为奖励，不先训练 Reward Model"
  - "Direct-RLAIF 只能使用人类偏好标签"
  - "Direct-RLAIF 只适用于分类任务，不能用于文本生成"
answer: 1
explain: "Canonical RLAIF 先用 AI 偏好训练 RM，再用 RM 奖励做 RL；Direct-RLAIF 在 RL 过程中直接用 LLM 打分作为奖励，避免 RM staleness。"
```
