### LLM-as-Judge：LLM裁判评测范式 (2023)

```yaml
id: llm_judge
name: LLM-as-Judge
full_name: LLM裁判评测范式 (LLM-as-Judge)
year: "2023"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2306.05685
category: frontier_2026
parent: helm
motivation: 自动化评测解决人工成本高问题
```

#### 📝 一句话总结

LLM-as-Judge 提出用强语言模型充当可解释评审者，评估开放式、多轮、偏好导向的聊天回答，解决人工偏好标注昂贵且传统闭集指标无法覆盖真实对话质量的问题。论文通过 MT-Bench 和 Chatbot Arena 系统验证了 GPT-4 裁判与人类偏好的高一致性，同时分析并缓解位置偏置、冗长偏置、自增强偏置和推理判分失败。

#### 🎯 核心要点

- 两个核心基准：MT-Bench 包含 80 个高质量多轮问题，Chatbot Arena 收集匿名双模型对战的人类偏好票。
- 三种裁判形式：pairwise comparison、single-answer grading、reference-guided grading，可按场景组合使用。
- 核心裁判模型：论文主要使用 GPT-4 作为强裁判，并与 GPT-3.5、Claude、人类专家和众包用户偏好进行一致性比较。
- 可解释性优势：裁判不仅输出胜负或分数，还输出判断理由，便于定位模型回答的失败模式。
- 偏置分析：系统研究位置偏置、冗长偏置、自增强偏置和数学/推理题被错误答案误导的问题。
- 偏置缓解：通过交换回答顺序、少样本裁判提示、先独立求解再判分、提供参考答案等方式提高稳定性。
- 多轮裁判设计：对 MT-Bench 的双轮问题，论文发现应把完整对话放入同一个裁判 prompt，而不是逐轮拆开，避免引用上下文错误。
- 经验结论：在非平局设置下，GPT-4 裁判与人类偏好的一致率可超过 80%，达到人类之间一致性的同一量级。

#### 🔬 深入细节

![LLM-as-Judge 多轮评测示意](https://arxiv.org/html/2306.05685v4/x1.png)
*图：论文 Figure 1 展示同一问题下两个助手的多轮回答，以及 GPT-4 如何结合完整上下文判断哪一方更好。*

LLM-as-Judge 的背景问题是：传统 NLP/LLM 评测大多假设存在短答案、标准答案或可程序化检查的输出，例如选择题、BLEU/ROUGE、HumanEval 单元测试。但聊天助手的真实价值体现在开放式问题、用户偏好、多轮上下文保持、解释质量和指令遵循上，这些输出往往没有唯一参考答案。人工评测虽然可靠，但成本高、速度慢、难以支撑模型迭代；论文因此把强 LLM 视为“可扩展的人类偏好近似器”。

![Chatbot Arena 众包偏好平台截图](https://arxiv.org/html/2306.05685v4/figures/screenshot_arena.png)
*图：Chatbot Arena 用匿名双模型对战收集真实用户偏好，构成 LLM-as-Judge 与人类偏好对齐验证的数据来源。*

方法上，论文把 LLM 裁判分成三类。Pairwise comparison 给裁判一个问题和两个候选回答，让它输出 A 胜、B 胜或平局；single-answer grading 让裁判直接给单个回答打分，然后可把两个分数转化为胜负；reference-guided grading 在数学、代码或有标准解的问题中额外提供参考答案，降低裁判被错误解法误导的概率。这三类方法不是互斥的：例如可以先用 single grading 做大规模粗排，再用 pairwise 做高价值模型之间的精排。

```python
# LLM-as-Judge 的保守 pairwise 评测伪代码
for question in benchmark:
    answer_a = model_a.generate(question)
    answer_b = model_b.generate(question)

    verdict_ab = judge_llm(prompt_pair(question, answer_a, answer_b))
    verdict_ba = judge_llm(prompt_pair(question, answer_b, answer_a))

    if verdict_ab == "A" and verdict_ba == "B":
        result = "model_a wins"
    elif verdict_ab == "B" and verdict_ba == "A":
        result = "model_b wins"
    elif verdict_ab == "tie" and verdict_ba == "tie":
        result = "tie"
    else:
        result = "tie_due_to_position_instability"

    record(question, result, judge_explanation=[verdict_ab.reason, verdict_ba.reason])
```

保守交换顺序策略可以写成一个明确的判定函数。设 \(J(q,A,B)\in\{A,B,T\}\) 是裁判在问题 \(q\) 下看到回答顺序 \((A,B)\) 后的输出，则最终判定为：

$$
J_{swap}(q,A,B)=
\begin{cases}
A, & J(q,A,B)=A \land J(q,B,A)=B \\
B, & J(q,A,B)=B \land J(q,B,A)=A \\
T, & \text{otherwise}
\end{cases}
$$

这个公式的直觉是：真正强的回答不应该只因为放在左边或右边而获胜。若交换顺序后裁判结论翻转到另一个语义等价位置，说明偏好稳定；若不一致，则保守地记为平局，牺牲一部分判别率换取更低的位置偏置。

论文对偏置的拆解是该范式最有价值的部分。位置偏置指裁判倾向选择某个固定位置，论文通过把两个相似回答交换顺序测量一致率；冗长偏置指裁判偏好更长但信息重复的回答，论文构造“repetitive list”攻击测试裁判是否会被无新增信息的扩写欺骗；自增强偏置指裁判可能偏好自己家族模型的输出；推理判分失败指裁判本来能单独解出题目，却在同时看到错误候选答案后被误导。它们说明 LLM-as-Judge 不是无偏真值机，而是需要校准和防御的评测组件。

MT-Bench 的设计让这种评测更接近真实助手使用场景。它包含 writing、roleplay、extraction、reasoning、math、coding、STEM knowledge、humanities/social science 等 8 类，每类 10 个多轮问题。多轮裁判不能只看第二轮回答，因为第二轮常依赖第一轮上下文；论文发现把完整对话放入同一个 prompt，并要求裁判关注第二轮表现，比拆成两个独立 prompt 更不容易引用错助手的历史回答。

Chatbot Arena 则提供了另一种数据分布：用户在网页上同时与两个匿名模型交互，投票后才揭示模型身份。这种“野外偏好”比 MT-Bench 更嘈杂，但覆盖真实用户需求。论文用 Arena 的人类票来验证 GPT-4 裁判与众包偏好的相关性，也用 MT-Bench 的专家票来验证受控场景下的一致性。二者结合，使 LLM-as-Judge 不只是在固定题集上拟合人工标注，而是在受控与开放环境中都接受检验。

如果用概率表示一致性，论文关注的是两个评审源在同一问题上的同意概率：

$$
\mathrm{Agree}(R_1,R_2)=\Pr_{q}\left[R_1(q)=R_2(q)\right].
$$

当去掉平局，只比较明确胜负时，随机基线约为 50%；论文报告 GPT-4 与人类专家或众包偏好能达到超过 80% 的非平局一致率。这并不意味着 GPT-4 永远正确，而是说明在大规模开放式评测中，强裁判可以成为人工评测的高性价比近似。

> ⚠️ 注意：LLM-as-Judge 的输出应被看作“可审计的偏好估计”，而不是绝对真理。高质量使用方式通常需要位置交换、参考答案、少样本校准、人工抽查和对偏置的持续监控。

#### 🧪 练习题

```yaml
question: "LLM-as-Judge 中交换两个回答顺序并重复裁判的主要目的是什么？"
options:
  - "让被评测模型生成更长的回答"
  - "缓解裁判偏好固定展示位置导致的位置偏置"
  - "减少 MT-Bench 的题目数量"
  - "把 single-answer grading 转换成 BLEU 分数"
answer: 1
explain: "若同一对回答交换顺序后裁判结论不一致，说明判断可能受位置影响；保守策略会把这类样本记为平局。"
```
