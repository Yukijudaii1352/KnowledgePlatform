### CMMLU

```yaml
id: cmmlu
name: CMMLU
full_name: 中文大规模多任务语言理解 (Chinese MMLU)
year: '2023'
org: 复旦大学
paper_url: https://arxiv.org/abs/2306.09212
category: general
parent: c_eval
motivation: 扩展中文评测覆盖面与题目多样性
```

#### 📝 一句话总结

CMMLU 将 MMLU 风格的多任务知识评测扩展到中文语境，提出 67 个科目、11,528 道题的中文多学科基准，重点补足中国文化、本土专业知识和中文推理场景。

#### 🎯 核心要点

- 11,528 道题覆盖 67 个中文科目，每个科目至少包含 few-shot 开发样例和 100 道以上测试题
- 科目分为 STEM、人文、社会科学和其他四大类，其中包含多项中国特有知识任务
- 同时比较 next-token 多选打分和自由生成解析两类评测策略
- 分析 negation、sub-options 等中文题目结构对模型解析和推理的影响
- 论文报告 CoT 在部分模型上会增加不可解析输出，说明中文评测需关注答案抽取稳定性

#### 🔬 深入细节

![CMMLU 任务总览](https://ar5iv.labs.arxiv.org/html/2306.09212/assets/x1.png)
*图源：ar5iv 论文 Figure 1，展示 CMMLU 的学科组成与中文任务覆盖。*

```python
# CMMLU 自由生成评测与答案抽取伪代码
def evaluate_cmmlu(model, subjects, strategy="generation"):
    scores = {}
    for subject in subjects:
        demos = load_dev(subject, n=5)
        hits = 0
        for ex in load_test(subject):
            prompt = format_fewshot_mcq(demos, ex.question, ex.choices)
            if strategy == "next_token":
                pred = argmax({
                    c: model.logprob(prompt + c)
                    for c in ["A", "B", "C", "D"]
                })
            else:
                response = model.generate(prompt)
                pred = regex_extract_choice(response)  # 解析“答案是A”等中文表达
            hits += int(pred == ex.answer)
        scores[subject] = hits / len(load_test(subject))
    return macro_average_by_category(scores)
```

CMMLU 的动机是：中文评测不能只做翻译版 MMLU。很多中文模型的训练语料、用户场景和知识需求都具有强本土性，例如中国历史、中文文学、行政考试、驾驶规则、食品文化等；这些题目在英文 MMLU 中不存在，或者答案随地区制度不同而不同。CMMLU 因此把“中文语言能力”和“中文知识环境”同时纳入基准。

评测机制仍然是多选题，但论文特别强调解析策略。对基础语言模型，可以比较 \(p(A|q),p(B|q),p(C|q),p(D|q)\)；对聊天模型，常见做法是让模型自由生成再用规则抽取答案。问题是中文模型可能输出“我认为应该选择乙项”或先给解释再给选项，导致 regex 抽取失败。因此 CMMLU 把不可匹配比例也作为评测可靠性的一个观察点。

在提示策略上，CMMLU 比较了 direct answer 与 chain-of-thought。CoT 不一定总是提升分数，尤其在中文多选中，模型可能生成长解释后改变最终格式，或在否定题、带子选项的题目中误解析。这个发现说明，评测中文 LLM 时不能只套用英文 CoT 模板，还需要控制输出格式、抽取规则和题目结构。

与 C-Eval 相比，CMMLU 的特点是覆盖面更宽、题型结构分析更细，并且把中国特有科目显式纳入统计。它更适合作为中文通识能力的广覆盖基准；C-Eval 的四级难度和 Hard 子集则更适合观察考试难度分层。两者组合使用时，可以同时衡量中文知识覆盖、专业难度和答案格式鲁棒性。

#### 🧪 练习题

```yaml
question: "为什么 CMMLU 同时讨论 next-token 打分和自由生成解析？"
options:
  - "因为二者分别对应基础语言模型和聊天模型，且自由生成可能出现答案抽取失败"
  - "因为 next-token 打分无法用于多选题"
  - "因为自由生成一定比 logprob 打分更公平"
  - "因为 CMMLU 只接受长篇解释作为答案"
answer: 0
explain: "基础模型常用选项 logprob，聊天模型常用生成后解析；中文输出格式变化会影响最终可评估性。"
```
