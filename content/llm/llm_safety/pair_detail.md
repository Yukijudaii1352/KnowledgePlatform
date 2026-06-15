### PAIR：提示词自动迭代优化 (Prompt Automatic Iterative Refinement)
```yaml
id: pair
name: PAIR
full_name: 提示词自动迭代优化 (Prompt Automatic Iterative Refinement)
year: '2024'
org: UPenn
paper_url: https://ieeexplore.ieee.org/abstract/document/10992337/
category: jailbreak
parent: autodan
motivation: 攻击者LLM迭代优化提示词
```

#### 📝 一句话总结
PAIR 用一个攻击者 LLM 根据目标模型反馈自动改写候选提示，把越狱搜索从人工试错变成少量查询内的迭代优化过程。

#### 🎯 核心要点
- 引入 Attacker LLM、Target LLM 和 Judge 三方闭环，让攻击者根据失败原因继续改写提示。
- 目标是用尽可能少的目标模型查询获得成功样本，论文强调很多设置下可在少于 20 次查询内找到有效提示。
- 支持并行维护多个候选分支，提升搜索稳定性并减少单一路径失败的影响。
- 攻击者输出的是自然语言提示，因此与 AutoDAN 一样关注语义可读性，而不是无意义 token 后缀。
- 论文在 GPT-3.5/4、Vicuna、Gemini 等模型上评估了成功率、查询效率和迁移性。

#### 🔬 深入细节
![PAIR 流程示意图](https://arxiv.org/html/2310.08419v4/x1.png)
*图：PAIR 中攻击者模型、目标模型和评分器之间的迭代闭环。*

```python
# PAIR 简化伪代码：不给出具体越狱模板，只展示优化闭环
states = [initial_attack_state(task_placeholder) for _ in range(width)]

for step in range(max_steps):
    next_states = []
    for state in states:
        candidate_prompt = attacker_llm.refine(
            goal=task_placeholder,
            previous_prompt=state.prompt,
            previous_feedback=state.feedback,
        )
        target_response = target_llm(candidate_prompt)
        score, feedback = judge(target_response, policy_criteria)

        if score >= success_threshold:
            return candidate_prompt

        next_states.append(State(candidate_prompt, feedback, score))

    states = select_top_or_diverse(next_states, width)

return best_by_score(states)
```

PAIR 的关键观察是，人工越狱提示的构造过程本质上是交互式调试：提出一个候选提示，观察目标模型拒答还是部分服从，再根据反馈调整措辞、角色设定或任务分解方式。PAIR 将这个人工循环交给攻击者 LLM，并让 judge 将目标模型输出转换为可优化的分数和反馈。

在算法结构上，PAIR 更像黑盒优化，而不是梯度攻击。攻击者看不到目标模型权重，也不需要目标模型 logits，只依赖输入输出行为。因此它能评估闭源模型，但代价是每一步都需要真实查询目标模型。论文强调查询效率，是因为现实红队测试常受成本、速率限制和审计约束影响。

PAIR 的三方分工很明确：Attacker LLM 负责生成和修改提示，Target LLM 暴露被测安全行为，Judge 负责把响应判定为成功、失败或部分成功。这个分工让攻击策略可插拔：换一个 judge 就能换评估标准，换一个 target 就能测迁移性，换一个 attacker 就能测自动红队能力。

和 AutoDAN 的区别在于搜索算子。AutoDAN 用遗传算法维护显式种群，通过交叉和变异探索文本空间；PAIR 用 LLM 的语言理解能力直接产生下一轮改写。前者更像进化搜索，后者更像带反馈的对话式策略优化。二者都体现了 2024 年之后越狱研究从手写 prompt 转向自动化搜索的趋势。

> ⚠️ 注意：PAIR 是红队评估方法。实际安全评测中应使用占位任务、受控环境和合规判定器，避免把候选提示直接用于真实伤害场景。

#### 🧪 练习题
```yaml
question: "PAIR 中 Judge 的主要作用是什么？"
options:
  - "替代目标模型生成最终回答"
  - "把目标模型响应转成分数和反馈，指导攻击者下一轮改写"
  - "训练一个新的语言模型"
  - "降低提示词长度"
answer: 1
explain: "PAIR 的闭环需要 judge 判断候选提示是否成功，并将失败原因反馈给 attacker LLM。"
```
