### GPQA

```yaml
id: gpqa
name: GPQA
full_name: 研究生级防搜索问答 (Graduate-Level Google-Proof QA)
year: "2024"
org: NYU
paper_url: https://arxiv.org/abs/2311.12022
category: specialized
parent: scibench
motivation: Google-proof专家级科学推理金标准
```

#### 📝 一句话总结

GPQA 构建由领域专家编写、非专家即使联网搜索也难以解答的研究生级科学多选题，用来评估模型在生物、物理、化学中的深层专业推理而非检索能力。

#### 🎯 核心要点

- 数据集包含 448 道高质量多选题，由生物、物理、化学领域专家编写和审查
- “Google-proof” 设计要求熟练非专家在开放网络搜索下仍表现很差，从而降低简单检索可解性
- 专家准确率约 65%，排除事后确认的明显失误后约 74%；高技能非专家约 34%
- 早期 GPT-4 基线约 39%，说明前沿模型仍显著低于对应领域专家
- 数据集包含 canary 字符串，用于帮助追踪训练集污染风险
- GPQA 适合作为可扩展监督研究的压力测试，因为监督者未必能可靠判断超专家模型答案

#### 🔬 深入细节

![GPQA 论文图示](https://ar5iv.labs.arxiv.org/html/2311.12022/assets/x1.png)
*图：GPQA 论文公开 HTML 图源，展示基准构造/验证相关统计。*

```python
# GPQA 数据构造与评测伪代码
for draft in expert_written_questions:
    if not has_single_unambiguous_answer(draft):
        continue
    if can_be_solved_by_simple_search(draft):
        continue
    question = add_distractors_and_metadata(draft)
    expert_result = domain_expert_answer(question)
    nonexpert_result = skilled_nonexpert_with_web_search(question, time_limit=30)
    if expert_result.correct and not nonexpert_result.reliably_correct:
        gpqa.append(question)

for model in models:
    for question in gpqa:
        prompt = shuffle_options(format_mcq(question))
        prediction = model.choose(prompt)
        score[model] += int(prediction == question.gold_answer)
```

##### 动机与问题设定

很多科学基准混合了知识记忆和推理能力，模型可能通过训练数据记忆、网页检索痕迹或题目表层线索作答。GPQA 关注更苛刻的问题：如果题目连受过训练的非专家在联网条件下都很难回答，那么模型正确作答更可能反映深入理解或推理，而不是简单搜索。

这种设计直接服务于可扩展监督问题。未来模型可能在某些专业领域超过普通监督者，评估者需要知道模型给出的复杂答案是否可信。GPQA 用专家可解、非专家难解的科学问题模拟这种监督鸿沟。

##### 核心机制

题目由对应领域专家编写，重点是避免开放网页能直接找到答案。每题为多选形式，但干扰项不是随机生成，而是要足够接近真实概念错误，防止模型通过语义粗筛轻松排除。随后专家和非专家验证者分别作答，用表现差距过滤题目。

GPQA 的分数计算本身很简单：模型对打乱选项的题目输出一个选项，准确率即为核心指标。真正复杂的是题目筛选过程，它把“高专业性”“答案唯一”“可验证”“防搜索”同时作为约束，牺牲规模换取信号质量。

##### 数据污染控制

GPQA 官方仓库声明数据中包含 canary 字符串，这是一种污染追踪手段。若未来模型训练语料中出现该字符串，可以怀疑数据集被直接纳入训练。对高影响评测来说，这一点很重要，因为少量题目泄漏就可能显著抬高模型得分。

形式上，GPQA 希望测的是条件能力：

$$\Pr(\text{correct} \mid \text{graduate-level domain reasoning})$$

而不是：

$$\Pr(\text{correct} \mid \text{memorized benchmark item})$$

##### 与 SciBench 的区别

SciBench 强调大学科学题的解题流程和错误归因，GPQA 则更强调专家级知识边界与搜索不可解性。SciBench 可以帮助分析“模型错在哪一步”，GPQA 更适合判断“模型是否真的达到研究生/专家层面的专业判断”。

> 💡 关键：GPQA 的难度来自专家知识和防搜索设计，不是简单把题干写长或把数字算复杂。

#### 🧪 练习题

```yaml
question: "GPQA 中 'Google-proof' 的核心含义是什么？"
options:
  - "题目不能出现在 Google 搜索结果里"
  - "熟练非专家即使联网搜索也难以可靠解答，题目需要真正领域理解"
  - "模型回答时必须禁用互联网"
  - "所有答案都必须来自维基百科"
answer: 1
explain: "GPQA 的目标是降低简单搜索可解性，让题目更依赖专家知识和深层推理。"
```
