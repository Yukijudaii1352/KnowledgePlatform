### LegalBench

```yaml
id: legalbench
name: LegalBench
full_name: 法律推理基准 (LegalBench)
year: "2023"
org: Stanford Law School
paper_url: https://arxiv.org/abs/2308.11462
category: specialized
parent: "—"
motivation: 162个法律推理任务协同构建
```

#### 📝 一句话总结
LegalBench 提出了由法律专业人士和机器学习研究者协同构建的 162 任务法律推理基准，用统一的 prompt 与评测接口衡量大语言模型在法律问题识别、规则回忆、规则适用、文本解释和论证理解上的能力。

#### 🎯 核心要点
- 基准包含 162 个英文法律任务，来自 36 个不同语料/数据源，并由法律社区协作扩展与审查。
- 任务格式覆盖 35 个多项选择、7 个开放生成、112 个二分类、8 个多类/多标签分类任务。
- 法律能力类型按六类组织：issue-spotting、rule-recall、rule-conclusion、rule-application、interpretation、rhetorical-understanding。
- 任务来源分三类：已有法律数据集重构、法律专业人士既有但未发布的数据、论文作者专门设计的新任务。
- 评测面向 few-shot LLM，而不是传统微调模型；每个任务都定义输入、输出、prompt 模板和解析规则。
- rule-application 不只看最终答案，还用 answer guide 判断解释是否正确、是否包含法律分析。
- LegalBench 的贡献是把“法律推理”拆成可讨论、可复现、可比较的能力维度，而不是只用律师资格考试总分粗略衡量。

#### 🔬 深入细节
![LegalBench prompt 结构示意图](https://raw.githubusercontent.com/HazyResearch/legalbench/main/img/prompt_elements.png)
*图：LegalBench 官方仓库中的 prompt 组成示意，展示任务说明、示例、输入与目标输出如何被组织成可复现的 LLM 评测格式。*

LegalBench 的方法论出发点是：法律行业讨论“推理”时并不是一个单一能力，而是由多个可区分的环节组成。论文借鉴法律教育中常见的 IRAC 框架，把法律分析拆为 Issue、Rule、Application、Conclusion，并额外加入 interpretation 与 rhetorical-understanding 两类不完全落在 IRAC 内的能力。这样做的意义是，模型如果在某个法律题上答错，研究者可以进一步判断它是没有发现法律问题、想不起规则、适用规则失败，还是读不懂合同/判例文本。

```python
# LegalBench 通用评测流程（按论文和官方仓库抽象）
for task in legalbench_tasks:
    prompt_template = load_prompt(task)
    parser = load_output_parser(task)
    scores = []

    for x, y in task.dataset:
        prompt = prompt_template.format(input=x, few_shot_examples=task.dev_examples)
        raw = model.generate(prompt)
        pred = parser(raw)

        if task.reasoning_type == "rule-application":
            # 除最终结论外，还检查解释是否有法律错误、是否真正分析事实与规则的关系
            score = answer_guide_judge(pred, y, dimensions=["correctness", "analysis"])
        else:
            score = exact_or_normalized_match(pred, y)

        scores.append(score)

    report(task.name, mean(scores))
```

形式化地，普通分类/选择任务可以写成：

$$
\text{Acc}(t,M)=\frac{1}{|D_t|}\sum_{(x_i,y_i)\in D_t}\mathbf{1}\left[g_t(M(P_t(x_i)))=y_i\right]
$$

其中 \(P_t\) 是任务 \(t\) 的 prompt 模板，\(M\) 是被评测模型，\(g_t\) 是把自然语言输出解析成标签的任务解析器。分类任务依赖 \(g_t\) 做答案归一化，例如把 “Yes.”、“yes” 或解释后的最终 yes 映射到同一标签；开放生成任务则需要任务特定的规范化或人工/规则评估。

LegalBench 与传统法律 NLP 基准的核心区别在于它面向 in-context/few-shot 使用方式。许多早期法律数据集假设研究者会在任务训练集上微调 BERT 类模型，因此数据格式常常是长文档 span extraction、法律判决预测或特定分类。LegalBench 将这些数据重构为 LLM 可以直接消费的 input-output pairs：给定一段合同条款，问是否包含 audit right；给定证据描述和争点，问是否构成 hearsay；给定法条或事实，问是否触发某一法律后果。这个重构动作使不同任务能放到同一 prompt/evaluation harness 中比较。

六类推理能力各自捕获不同失败模式。Issue-spotting 测试模型能否从事实中发现法律问题，例如 Reddit 法律咨询帖子是否涉及移民、住房或劳动问题；rule-recall 测试模型是否能回忆某一管辖区的法律规则或引用；rule-conclusion 测试模型在给定规则时能否给出正确结论；rule-application 进一步要求解释“为什么事实满足或不满足规则”；interpretation 覆盖合同、隐私政策、并购协议等文本的条款理解；rhetorical-understanding 则关注判例或法律论证中句子的功能，例如某句是否在定义术语、陈述 holding 或提出区分。

对于 rule-application，论文没有简单把“结论正确”当成好答案。它把解释质量拆成 correctness 与 analysis 两个维度：correctness 要求解释不能误述规则、误述事实、给出错误法律结论、出现逻辑错误或算术错误；analysis 要求解释必须从事实推出与规则相关的中间推理，而不是只复述题干和结论。可抽象为：

$$
s_i^{\text{app}}=\left(c_i,a_i\right),\quad c_i,a_i\in\{0,1\}
$$

其中 \(c_i\) 表示解释是否无错误，\(a_i\) 表示是否包含法律分析。一个答案可能结论正确但 \(a_i=0\)，因为它没有说明关键事实如何触发规则；这正是法律场景与普通选择题评测的差异。

LegalBench 还特别强调任务异质性。162 个任务平均每个任务数百样本，既包含 plain English，也包含法院意见、并购协议、合同、法条和隐私政策。论文报告任务格式分布为 112 个二分类、35 个多项选择、7 个开放生成、8 个多类/多标签分类。这样的设计让研究者可以追踪模型在不同法律文本类型、不同输出空间、不同推理类别上的表现，而不是把所有法律能力压缩成一个总分。

> ⚠️ 注意：LegalBench 不是法律执业能力认证。它测的是 LLM 在受控输入输出任务上的经验表现，且论文明确指出目前任务偏向美国法和英文资料。高分说明模型在这些任务格式上有较强模式匹配与推理能力，不等价于可在真实案件中独立替代律师。

从工程角度看，LegalBench 的价值在于可扩展的任务协议：每个任务都需要清楚定义输入字段、目标标签、prompt、样例、解析方式和许可证信息。新任务只要满足这个协议，就可以接入统一 harness。对法律大模型研发来说，这比单次考试题评测更有用，因为它能定位改进方向：如果模型 rule-recall 强但 rule-application 弱，可能需要更多事实-规则对齐训练；如果 interpretation 弱，可能需要长文档合同理解或检索增强；如果 rhetorical-understanding 弱，可能需要判例论证结构学习。

#### 🧪 练习题
```yaml
question: "LegalBench 中 rule-application 任务为什么不能只用最终答案 accuracy 评估？"
options:
  - "因为所有 rule-application 任务都是开放生成，无法解析最终答案"
  - "因为法律适用还要求解释事实如何触发规则，需要检查 correctness 和 analysis"
  - "因为 LegalBench 只评估模型是否能背诵法律条文"
  - "因为 rule-application 任务不提供标准答案"
answer: 1
explain: "论文将 rule-application 的解释质量拆成 correctness 与 analysis；结论正确但没有事实到规则的推理链，仍然可能不是合格法律分析。"
```
