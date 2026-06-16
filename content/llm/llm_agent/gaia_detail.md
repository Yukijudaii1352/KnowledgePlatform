### GAIA：通用AI助手评测 (GAIA)

```yaml
id: gaia
name: GAIA
full_name: 通用AI助手评测 (GAIA)
year: 2024
org: Meta/HuggingFace
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/25ae35b5b1738d80f1f03a8713e405ec-Abstract-Conference.html
category: benchmark
parent: agentbench
motivation: 现实世界复杂任务评测
```

#### 📝 一句话总结

GAIA 提出了一个面向通用 AI 助手的现实世界问答基准，用 466 个答案简短但求解过程复杂的问题检验推理、多模态、网页浏览和工具使用能力。它解决了传统高难考试型或多选题基准容易饱和、难以解释和易受污染的问题，强调“人类觉得概念简单但 AI 需要多步行动才能完成”的任务。

#### 🎯 核心要点

- 构建 466 个由人工设计和标注的问题，覆盖日常任务、科学、常识、文件读取、网页检索、计算和多模态理解。
- 每题要求一个简短、事实性、无歧义的答案，便于自动评测而不依赖开放式人工打分。
- 采用 zero-shot 助手提示，模型需在回答末尾输出 `FINAL ANSWER: ...` 以便抽取和归一化判分。
- 难度分为 Level 1、Level 2、Level 3，主要依据人工求解时的步骤数和工具数，而不是学科专业难度。
- 数据集强调 non-gameability：答案设计上不应以明文出现在训练数据中，必须通过多步检索、转换、计算或文件处理得到。
- 问题验证要求原作者之外的两名标注者独立作答并达成同一答案，否则修正或移除。
- 发布 166 题带答案开发集，保留 300 题答案用于 leaderboard，避免公开答案导致评测污染。
- 论文报告人类平均成功率约 92%，而带插件 GPT-4 约 15%，展示当前 AI 助手与普通人稳健完成现实任务之间的差距。

#### 🔬 深入细节

![GAIA 能力覆盖分布](https://ar5iv.labs.arxiv.org/html/2311.12983/assets/x2.png)
*图：GAIA 问题覆盖的能力分布，包含推理、网页浏览、多模态、代码/计算和多文件类型处理等能力。*

![GAIA 步数与工具数分布](https://ar5iv.labs.arxiv.org/html/2311.12983/assets/x3.png)
*图：GAIA 用人工标注的步骤数和工具数刻画题目难度，点的大小表示对应问题数量。*

GAIA 的核心理念与“把题目做得更难”不同。论文认为，如果一个 benchmark 需要博士级专业知识或很长的开放式输出，人类评估会昂贵且不稳定，模型评估又会依赖更强模型。GAIA 反过来选择普通人能理解、答案短且可核验的问题，但要求 AI 系统完成多步行动，例如浏览网页、读取附件、处理表格、对图像或音频取证、运行代码计算、组合多个来源的信息。

```python
# GAIA 自动评测流程伪代码
SYSTEM_PROMPT = """
You are a general AI assistant. Report your thoughts, and finish with:
FINAL ANSWER: [YOUR FINAL ANSWER]
The final answer should be a number, a few words, or a comma-separated list.
"""

for item in gaia_questions:
    prompt = SYSTEM_PROMPT + item.question
    files = item.attachments

    trace = assistant.solve(
        prompt=prompt,
        files=files,
        tools=["web_browser", "code_interpreter", "file_reader", "calculator"],
    )

    predicted = extract_after_final_answer(trace)
    predicted_norm = normalize(predicted, answer_type=item.answer_type)
    gold_norm = normalize(item.ground_truth, answer_type=item.answer_type)

    score = int(quasi_exact_match(predicted_norm, gold_norm))
    record(item.id, score)

final_score = mean(recorded_scores)
```

评测公式可以写成标准的归一化精确匹配平均值：

$$
\mathrm{Score}(M)=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\mathrm{norm}(\hat{a}_i)=\mathrm{norm}(a_i^*)\right]
$$

其中 \(\hat{a}_i\) 是模型从 `FINAL ANSWER` 中抽取的答案，\(a_i^*\) 是人工标注的唯一正确答案，\(\mathrm{norm}\) 会根据答案类型做必要归一化，例如数字、短字符串或逗号分隔列表。论文称其为 quasi exact match，因为目标不是语义开放评分，而是在允许格式归一化后检查是否与真值一致。

GAIA 的问题设计强调“Proof of Work”式直觉：求解可能很麻烦，但验证很简单。比如 Level 1 题可能要求查 NIH 网站上的临床试验实际招募人数；Level 2 题可能要求结合图像、Wikipedia 标准和百分比计算；Level 3 题可能要求追踪 NASA APOD、识别宇航员小组、排除无太空飞行记录者、再计算分钟数并按指定格式输出。每个答案都很短，但中间路径需要可靠执行多个步骤。

难度分级不是按题面知识难度，而是按人工求解路径的行动复杂度。Level 1 通常不需要工具或最多一个工具，步骤不超过 5；Level 2 通常需要约 5 到 10 步，并组合不同工具；Level 3 面向接近完美的通用助手，可能需要很长动作序列、任意数量工具和开放世界访问。论文也说明这不是硬规则，例如少于 10 步但需要复杂网页导航的问题也可能归为 Level 3。

题目构建流程是 GAIA 可信度的关键。问题由人类设计，来源可以是可信网页、论文、Wikipedia、Papers with Code、arXiv、随题附带文档或自包含谜题。创建者不仅给出答案，还标注元数据，例如使用了哪些工具、采取了多少步骤、耗时多久。随后两名新的标注者独立作答；只有原作者和两名验证者得到相同答案时，题目才通过。论文报告约 68% 题目可直接通过，其余需要修正或移除，这说明“无歧义短答案”在真实网页和文件任务中并不自动成立。

GAIA 特别关注抗污染和不可游戏化。多选题即使推理错误也可能撞对选项，训练集中出现选项或答案也较难发现；GAIA 则要求模型实际完成检索和转换过程，并且答案设计上不应以明文存在于预训练文本中。即使发生数据污染，研究者也能检查模型的 reasoning trace 是否合理，并按论文给出的构题方法补充新问题。

与 WebArena 或 AgentBench 相比，GAIA 不是让 agent 在封闭环境中点击和修改状态，而是让通用助手面对开放世界问题。它不细分每个工具调用是否正确，也不要求必须通过某种固定路径求解；只要最终短答案正确即可。这让 GAIA 更接近真实用户问助手的问题，但也意味着它评估的是整体系统能力，包括模型、提示、浏览器、代码解释器、文件读取器和工具选择策略的组合。

实验结果突出当前系统的短板。论文报告人类验证者平均约 92% 成功率，而 GPT-4 即使配合插件也约 15%，且 Level 3 对当时系统几乎不可解。这里的差距不是因为题目对人类非常专业，而是因为 AI 系统在真实信息获取、跨模态转换、工具稳定性、格式遵循和长程执行上仍不稳健。GAIA 因此把“通用助手”定义为能像普通人一样可靠完成概念简单现实任务的系统，而不是只会在考试题上拿高分的模型。

> 💡 关键：GAIA 的难点不在最终答案长度，而在得到答案前必须稳定完成一连串检索、阅读、计算、转换和核验动作。

#### 🧪 练习题

```yaml
question: "GAIA 为什么偏好短、事实性、无歧义的最终答案？"
options:
  - "为了让模型不能使用网页浏览工具"
  - "为了把复杂求解过程变成可自动、快速、稳定验证的结果"
  - "为了只测试闭卷记忆能力"
  - "为了让所有问题都变成多项选择题"
answer: 1
explain: "GAIA 允许求解过程很复杂，但最终答案必须容易核验；这避免开放式人工评分，并能用归一化精确匹配进行自动评测。"
```
