### Token级策略优化 (TLPO)

```yaml
id: tlpo
full_name: Token级策略优化 (TLPO)
year: '2026.04'
paper_url: https://arxiv.org/abs/2604.26553
motivation: Token级策略优化缓解语言混淆
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
TLPO 针对多语种大模型的 language confusion，定位发生混淆的 token 位置，只探索该位置的候选 token 并进行局部策略优化，从而减少语言串扰且保留通用能力。

#### 🎯 核心要点
- 方法先生成完整回答并检测 language confusion point \(c\)，没有混淆的样本直接跳过。
- 在位置 \(c\) 从当前策略分布 \( \pi_\theta(\cdot|x,y_{<c}) \) 选择 Top-N 候选 token。
- 对每个候选 token 做短 lookahead rollout，并用 language confusion detector 给奖励。
- 使用 PPO 风格的 token-level objective 更新策略，只调整错误诱发位置附近的概率。
- 训练数据来自 Bactrian-X 等多语种任务，评估使用 WPR/RPR 与下游准确率衡量语言一致性和能力保持。

#### 🔬 深入细节
![TLPO language confusion 示例](https://arxiv.org/html/2604.26553v1/x1.png)
*图：论文展示 LLM 在目标语言回答中混入其他语言 token 的现象，TLPO 直接针对这些位置优化。*

```python
# TLPO 训练流程伪代码
for batch in multilingual_prompts:
    candidates_for_update = []
    for x in batch:
        y = policy.generate(x)
        c = detect_confusion_point(y, target_language=x.language)
        if c is None:
            continue

        top_tokens = top_n(policy.next_token_distribution(x, y[:c]), N=16)
        for token in top_tokens:
            rollout = policy.rollout(x, prefix=y[:c] + [token], length=k)
            reward = language_consistency_reward(rollout, target_language=x.language)
            candidates_for_update.append((x, y[:c], token, reward))

    for _ in range(p_policy_iterations):
        objective = J_TLPO(policy, candidates_for_update)
        update(policy, maximize=objective)
```

TLPO 的动机是 language confusion 往往不是整段回答都错，而是在某个局部位置开始混入非目标语言 token。SFT 或序列级 DPO 会对整条 response 施加更新，既浪费训练信号，也可能造成灾难性遗忘；TLPO 则把优化点收缩到“第一个出错 token”附近。

探索阶段，算法先让模型在线生成回答，再用检测器找混淆点 \(c\)。若模型没有发生语言混淆，该样本不参与更新。若发生混淆，TLPO 取当前位置 Top-N 候选 token，并对每个候选做长度为 \(k\) 的短 rollout，观察这个选择是否会把后续生成拉回目标语言。

优化目标是 token-level policy optimization。与 DPO/ORPO 依赖成对完整回答不同，TLPO 的训练样本是“上下文、候选 token、局部奖励”。奖励可以理解为候选 token 对 WPR/RPR 的局部贡献，更新时提升能保持目标语言的 token，压低诱发混淆的 token。

这种局部性是 TLPO 的主要优势：它不要求重写模型的全部多语能力，也不会把所有英语 token 都当作错误。论文还区分 English as neutral 与 English as confusion 的评估场景，说明方法关注的是“非预期语言切换”，而不是粗暴禁止跨语或代码混合。

> 💡 关键：TLPO 把多语对齐从 response-level 偏好转为 error-position-level 策略更新，减少不必要的全序列扰动。

#### 🧪 练习题
```yaml
question: "TLPO 为什么要在混淆点选择 Top-N 候选 token 做 lookahead？"
options:
  - "为了估计不同候选 token 是否会导致后续语言混淆"
  - "为了扩大词表大小"
  - "为了把所有回答截断到同一长度"
  - "为了只训练英文回答"
answer: 0
explain: "TLPO 的奖励来自候选 token 后续短 rollout 的语言一致性表现，因此需要在混淆点探索多个候选。"
```
