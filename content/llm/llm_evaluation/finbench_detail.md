### FinBench

```yaml
id: finbench
name: FinBench
full_name: 金融领域评测 (Financial Benchmark)
year: "2024"
org: 多机构联合
paper_url: https://arxiv.org/abs/2407.00365
category: specialized
parent: —
motivation: 金融知识风险评估市场分析专项
```

#### 📝 一句话总结

FinBench 在金融专业考试和金融事实知识场景上构建评测流程，用标准化题目、双语输入和可插拔模型接口衡量 LLM 是否具备可靠的金融知识、风险判断和市场分析能力。

#### 🎯 核心要点

- 以 CPA、CFA 等权威金融专业考试题为核心来源，覆盖会计、公司金融、投资组合、衍生品、伦理等多个金融学科
- 支持中文与英文问题、单选/多选/判断等题型，减少只测英文通用知识带来的领域偏差
- 评测协议区分 zero-shot、few-shot、answer-only 与 Chain-of-Thought 设置，用同一题库检查提示策略带来的真实收益
- 论文同时讨论 IDEA-FinKER 的软注入与硬注入知识增强，展示检索式示例和指令微调如何改善金融知识答题
- 金融应用强调准确性、时效性和合规风险，因此基准将“会不会答题”转化为可复现的专业知识测量

#### 🔬 深入细节

![IDEA-FinBench 数据统计与题型示意](https://arxiv.org/html/2407.00365/x4.png)
*图：论文 Chapter 3 中 IDEA-FinBench 的金融考试题分布与数据构成示意，图源来自 arXiv HTML。*

```python
# FinBench / IDEA-FinBench 评测流程伪代码
for item in finbench_questions:
    prompt = build_prompt(
        question=item.question,
        options=item.options,
        language=item.language,
        mode=["zero_shot", "few_shot", "cot", "answer_only"],
    )
    response = llm.generate(prompt)
    pred = extract_choice_or_label(response, item.question_type)
    record(
        subject=item.subject,
        exam=item.exam_source,
        correct=(pred == item.gold_answer),
        reasoning=response if uses_cot(prompt) else None,
    )

score = aggregate_accuracy(records, by=["exam", "subject", "language", "question_type"])
report(score)
```

##### 动机与问题设定

金融场景对事实可靠性和法规一致性要求很高，模型生成一个看似合理但错误的会计处理、风险敞口判断或投资建议，都可能造成实际损失。通用基准很难暴露这种问题，因为它们通常只考察开放百科知识或初级数学推理，不覆盖金融专业考试中密集的概念边界、公式约束和伦理规则。

FinBench 的核心思路是把金融知识评测锚定到已经被行业认可的考试体系。CPA 与 CFA 题目天然包含“专业人士应当知道什么”的标准答案，也包含不同难度、不同学科和不同题型。相比临时编写的金融问答，这种来源更容易复核，也更能防止基准退化成通用常识测试。

##### 核心机制

评测不是简单地把题目丢给模型，而是把题目规范化为统一输入：题干、候选项、语言、题型和学科标签都被保留。答案抽取再按题型执行，例如单选题取一个选项，多选题需要集合匹配，判断题映射到二元标签。这样做可以把模型“会解释但选错”与“格式错误无法判分”分开记录。

在 few-shot 设置中，FinBench 从同领域题库检索或采样示例放入上下文，让模型获得题型格式和答题风格；在 CoT 设置中，模型被要求先推理再给出最终选项。关键不是默认认为 CoT 更好，而是在相同题库上比较提示策略是否稳定提升金融题表现。

##### 与金融知识增强的关系

论文中的 IDEA-FinKER 把 FinBench 作为评估端，比较通用模型、金融模型以及知识注入后的模型。软注入侧重在上下文中检索相似金融题或知识片段，相当于 \(p(a \mid q, r(q))\)；硬注入则通过指令微调把金融题解模式写入参数，相当于更新模型参数 \(\theta\) 后再评测 \(p_{\theta'}(a \mid q)\)。

> 💡 关键：FinBench 的价值不在某个单一分数，而在它能按学科、语言和题型定位模型短板，例如“英文 CFA 伦理题强、中文 CPA 会计题弱”。

##### 评测解释

对金融模型来说，高分并不等于可以直接替代专业人员。FinBench 主要测量封闭选项下的知识与推理能力，不覆盖实时市场数据、客户适配性和法律责任判断。因此它更适合作为模型上线前的回归测试与横向比较工具，而不是单独的金融顾问合规认证。

#### 🧪 练习题

```yaml
question: "FinBench 采用金融专业考试题作为核心数据来源的主要原因是什么？"
options:
  - "考试题更容易让模型随机猜中答案"
  - "权威考试题有明确标准答案和学科结构，能更稳定地测量金融专业知识"
  - "考试题只需要英文评测，减少了双语处理成本"
  - "考试题可以完全替代真实金融业务评估"
answer: 1
explain: "CPA、CFA 等考试题具有可复核答案和专业学科划分，适合构建标准化金融知识评测；它不能覆盖所有真实业务风险。"
```
