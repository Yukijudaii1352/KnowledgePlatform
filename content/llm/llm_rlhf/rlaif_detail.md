### 基于AI反馈的强化学习 (RLAIF)

```yaml
id: rlaif
full_name: 基于AI反馈的强化学习 (RLAIF)
year: 2023
paper_url: https://arxiv.org/abs/2309.00267
motivation: AI反馈替代人工偏好标注
parent: constitutional_ai
category: rl_based
```

#### 📝 一句话总结

RLAIF 用现成 LLM 生成偏好标签来替代昂贵的人类偏好标注，并在 summarization、helpful dialogue、harmless dialogue 上验证其效果可接近 RLHF。论文还提出 direct-RLAIF，直接在 RL 过程中查询 LLM 作为奖励源，避免单独训练 reward model 及其 stale reward 问题。

#### 🎯 核心要点

- Canonical RLAIF：用 off-the-shelf LLM 给候选回答对打软偏好标签，再训练 reward model，最后用 RL 优化 policy。
- 标签生成方式：提示 LLM 比较两个候选，抽取生成 “1” 和 “2” 的 log-probabilities，经 softmax 得到偏好分布。
- 位置偏差修正：同一候选对做两次推理，第二次交换 A/B 顺序，再平均两个方向的偏好分布。
- CoT 偏好判断：先让 LLM 生成评价理由，再把理由拼回提示中提取偏好 token 概率，以提升与人类偏好的一致性。
- Direct-RLAIF：不训练 RM，而是在 RL 中让 LLM 对单个生成打 1-10 分，按分数 token 概率求期望并归一化为 reward。
- 实验任务包括 Reddit TL;DR summarization、helpful dialogue generation、harmless dialogue generation，并与 RLHF 和 SFT baseline 对比。
- RL 训练使用适配语言模型的 REINFORCE with baseline，policy 和 value model 从 SFT checkpoint 初始化。

#### 🔬 深入细节

![RLAIF 与 RLHF 对比流程](https://arxiv.org/html/2309.00267v3/x3.png)
*图：论文 Figure 2。RLAIF 与 RLHF 的训练骨架相同，关键区别是 preference labels 来自 AI labeler 而不是 human annotator。*

RLAIF 解决的是 RLHF 的标注扩展性问题。标准 RLHF 需要人类比较候选回答，训练 reward model，再用 RL 优化策略；这在高质量偏好标签昂贵、任务需要大量迭代、或标注内容有心理负担时会成为瓶颈。RLAIF 保留 RLHF 的“偏好建模 + 强化学习”结构，但把偏好标注者换成一个通用 LLM。论文的关键实验问题不是“AI 标签是否理论上可行”，而是直接比较 RLAIF 与 RLHF 在端到端人类评估中的差距：结果显示在 summarization 和 helpful dialogue 中 RLAIF 与 RLHF 对 SFT 的提升非常接近，在 harmless dialogue 中 RLAIF 的 harmless rate 还高于 RLHF。

偏好标签生成是 RLAIF 的核心。给定上下文 \(x\) 和两个候选回答 \((y_1, y_2)\)，系统构造一个评价 prompt，包含任务说明、可选 few-shot 示例、待评价样本，以及类似 “Preferred Response=” 的结尾。LLM 不一定要自由生成完整判断；论文选择读取下一个 token 为 “1” 和 “2” 的 log-probability：

$$
p_{AI}(y_1 \succ y_2 \mid x) = \frac{\exp(\ell_1)}{\exp(\ell_1)+\exp(\ell_2)}, \quad
p_{AI}(y_2 \succ y_1 \mid x) = 1 - p_{AI}(y_1 \succ y_2 \mid x)
$$

这里 \(\ell_1\) 和 \(\ell_2\) 是 LLM 对选项 token 的 log-probability。相比硬标签，这种 soft label 保留了不确定性；相比解析自由文本，它实现简单且不容易因为输出格式漂移而失败。

```python
# RLAIF preference labeling with an off-the-shelf LLM
for x, y1, y2 in candidate_pairs:
    prompt = build_preference_prompt(x, y1, y2, ending="Preferred Response=")
    logp_1 = llm.logprob(prompt, next_token="1")
    logp_2 = llm.logprob(prompt, next_token="2")
    pref_forward = softmax([logp_1, logp_2])

    # position debiasing: swap the order and score again
    prompt_swapped = build_preference_prompt(x, y2, y1, ending="Preferred Response=")
    logp_1s = llm.logprob(prompt_swapped, next_token="1")
    logp_2s = llm.logprob(prompt_swapped, next_token="2")
    pref_swapped = softmax([logp_1s, logp_2s])

    # convert swapped result back to original order and average
    q_y1 = 0.5 * pref_forward[0] + 0.5 * pref_swapped[1]
    preference_dataset.add(x, y1, y2, q_y1)
```

位置偏差是论文特别处理的细节。LLM 评价器可能偏好第一个或第二个展示的候选，而不是完全根据内容判断；这个偏差在较小 labeler 上更明显。RLAIF 的修正方法很直接：每个候选对推理两次，第二次交换候选顺序，然后把第二次结果映射回原始候选顺序再平均。如果原始顺序给出 \(q\)，交换顺序后第二个位置其实对应原来的 \(y_1\)，最终偏好就是 \(\frac{1}{2}(q + q'_{mapped})\)。这不是完美去偏，但能显著降低“固定选项位置”导致的系统性错误。

论文还研究了 CoT 对 AI labeler 的影响。普通偏好提示直接要求输出 1/2；CoT 版本先把结尾替换成要求解释的句子，让 LLM 生成 rationale，然后把原 prompt、rationale 和标准结尾拼接起来，再读取 “1”/“2” 的概率。其直觉是：复杂偏好判断往往需要比较 factuality、coverage、coherence、helpfulness 或 harmlessness；先生成理由能让 LLM 在打分前显式完成评价步骤。论文发现 CoT 通常提升与人类偏好的 alignment，尤其在 summarization 上更稳定。

Canonical RLAIF 接着把 AI 软偏好蒸馏成 reward model。若 RM 对两个候选输出标量 \(r_\phi(x,y_1), r_\phi(x,y_2)\)，先用 softmax 得到 RM 的偏好分布：

$$
\hat{p}_\phi(y_1 \succ y_2|x)=\frac{\exp(r_\phi(x,y_1))}{\exp(r_\phi(x,y_1))+\exp(r_\phi(x,y_2))}
$$

若 AI label 给出软标签 \(q=[q_1,q_2]\)，RM 用 cross-entropy 拟合：

$$
\mathcal{L}_{RM}=-q_1\log \hat{p}_\phi(y_1 \succ y_2|x)-q_2\log \hat{p}_\phi(y_2 \succ y_1|x)
$$

这个步骤本质上是 distillation：把大 LLM labeler 的偏好判断压缩到一个可高效查询的 RM 中。随后 RL 阶段与 RLHF 类似，用 RM 对 policy 生成的回答打分，并用带 baseline 的 REINFORCE 更新 policy。

```python
# Canonical RLAIF training
rm = train_reward_model(preference_dataset, loss="soft_label_cross_entropy")
policy = initialize_from_sft()
value = initialize_from_sft()

for batch in prompts:
    responses = policy.sample(batch)
    rewards = rm.score(batch, responses)
    advantages = rewards - value(batch, responses).detach()
    policy_loss = -mean(advantages * policy.logprob(batch, responses))
    value_loss = mse(value(batch, responses), rewards)
    update(policy, value, policy_loss + value_loss)
```

![Direct-RLAIF 流程](https://arxiv.org/html/2309.00267v3/x5.png)
*图：论文 Figure 4。d-RLAIF 在 RL 过程中直接让 LLM 打分，不再先训练静态 reward model。*

Direct-RLAIF 是论文更进一步的简化。Canonical RLAIF 的 RM 在训练前由初始策略样本构造的数据集训练得到；随着 policy 通过 RL 逐步改变，新的生成可能偏离 RM 训练分布，导致 reward staleness。d-RLAIF 直接在 RL loop 中调用 off-the-shelf LLM 给当前生成打分，省掉 AI preference labeling 和 RM training。具体做法是让 LLM 对单个生成在 1 到 10 之间打质量分，读取每个分数 token 的概率并计算期望：

$$
s(y|x)=\sum_{i=1}^{10} i\,P(i|y,x)
$$

之后把分数归一化到 \([-1,1]\)，作为 RL reward。它的优点是 reward 总是针对当前 policy 的生成计算，不需要担心 RM 只见过旧策略样本；缺点是每次 RL rollout 都要查询更大的 LLM labeler，计算成本和服务延迟更高。

RLAIF 与 Constitutional AI 的关系也值得区分。Constitutional AI 首先引入“AI 根据宪法原则提供反馈”的思想，用于 harmlessness；RLAIF vs. RLHF 这篇论文则系统比较 AI feedback 与 human feedback，并把任务扩展到 summarization、helpful dialogue 和 harmless dialogue。它还证明了一个更强的自改进现象：即使 AI labeler 与 policy 同尺寸，甚至在某些设置下是同一个初始 checkpoint，RLAIF 仍能超过 SFT baseline。直觉上，生成回答和评价回答是不同能力切片；同一模型可能无法一次生成最佳回答，但在两个候选之间仍能识别更好的那个。

> ⚠️ 注意：RLAIF 不是“完全没有人类价值输入”。Prompt preamble、few-shot exemplars、任务定义、评估标准和最终 human evaluation 仍由人设计；它减少的是大规模逐样本偏好标注，而不是所有人类监督。

#### 🧪 练习题

```yaml
question: "Direct-RLAIF 相比 canonical RLAIF 主要解决什么问题？"
options:
  - "避免 reward model 随 policy 更新而 stale，并省去 RM 训练流程"
  - "完全取消强化学习，只做监督微调"
  - "把人类偏好标签扩展为多标签分类任务"
  - "只通过交换候选顺序来修正位置偏差"
answer: 0
explain: "d-RLAIF 在 RL 过程中直接调用 LLM 打分，因此不需要先训练静态 RM，也减少了策略分布变化导致的 RM 过时问题。"
```
