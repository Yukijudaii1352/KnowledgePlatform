### LiveBench: 实时动态基准 (LiveBench)
```yaml
id: livebench
name: LiveBench
full_name: 实时动态基准 (LiveBench)
year: "2024"
org: Abacus.AI
paper_url: https://arxiv.org/abs/2406.19314
category: frontier_2026
parent: opencompass
motivation: 月度更新半年刷新防数据污染
```

#### 📝 一句话总结
LiveBench 提出了一个持续更新、客观打分、覆盖六类能力的 LLM 基准，用近期信息源和可验证答案缓解测试集污染，并避免 LLM-as-a-judge 与人工偏好评测的主观偏差。

#### 🎯 核心要点
- 采用月度更新机制，问题来自近期数学竞赛、arXiv 论文、新闻、IMDb/Wikipedia 电影梗概、Kaggle/Socrata 数据集和近期编程题。
- 强制选择有客观 ground truth 的任务，自动评分，不依赖 LLM judge 或人工偏好投票。
- 覆盖 6 大类别、18 个任务：Math、Coding、Reasoning、Language Comprehension、Instruction Following、Data Analysis。
- 每个任务约 40-100 个问题，难度从容易到很难，并刻意让强模型也保持区分度，论文报告当前模型最高仍低于 70%。
- 任务分为两类：使用新近信息源生成的新问题，以及对 BBH、AMPS、IFEval 等旧任务的更难、更抗污染版本。
- 评分器按任务定制：数学精确答案、代码单元测试、表格转换/连接 F1、指令满足率、拼写修正精确比对、电影情节排序等。
- 论文实验证明 GPT-4-Turbo 作为 judge 在困难数学和逻辑题上错误率可达约 21%-46%，支撑 LiveBench 放弃主观 judge 的设计。

#### 🔬 深入细节

![LiveBench 结果与六类能力雷达图](https://github.com/LiveBench/LiveBench/raw/main/assets/livebench-2024-09-30.png)
*图：LiveBench 同时给出总体分数和六个类别的分项表现，显示不同强模型在 Coding、Math、Reasoning、Instruction Following 等维度的排序并不一致。*

```python
# LiveBench 构建与评测伪代码
for release_month in monthly_schedule:
    candidate_questions = []

    candidate_questions += harvest_recent_math_competitions(release_month)
    candidate_questions += harvest_recent_arxiv_typos(release_month)
    candidate_questions += harvest_recent_news_instruction_tasks(release_month)
    candidate_questions += harvest_recent_kaggle_socrata_tables(release_month)
    candidate_questions += harvest_recent_lcb_coding(release_month)
    candidate_questions += generate_harder_bbh_ifeval_amps_variants(seed=release_month)

    questions = filter(lambda q: has_objective_ground_truth(q), candidate_questions)
    publish_public_subset_after_delay(questions)

    for model in evaluated_models:
        answers = model.generate(questions, prompt_style="parseable_final_answer")
        scores = [task_specific_scorer(q, a) for q, a in zip(questions, answers)]
        leaderboard.update(model, aggregate_by_category(scores))
```

LiveBench 的核心问题意识是：传统 LLM 基准一旦公开，就可能被后续模型训练语料吸收，导致分数越来越像“是否见过题”而不是“是否具备能力”。常见补救方案是让人类或 LLM 不断写新题、再用人类或 LLM 判断回答好坏，但这又引入两个新问题：问题质量和覆盖面受出题者偏好影响；LLM judge 在复杂数学、逻辑和代码题上会犯错，并且会偏好特定输出风格。LiveBench 的取舍是只收录可客观验证的问题，用时间新鲜度和自动评分同时降低污染和主观性。

其时间机制可以概括为：问题发布时间 \(t_q\) 尽量晚于模型训练截止时间 \(t_{\text{train}}\)，并持续引入新题；同时保留可复现的公开数据与答案，便于社区核验。

$$
\text{contamination\_risk}(q,m) \downarrow \quad \text{when} \quad t_q > t_{\text{train}}(m)
$$

论文并不声称时间新鲜度能完全消灭污染，因为模型训练截止时间不总是公开，网页内容也可能被提前转载；因此最新版本更谨慎地称为 contamination-limited。它通过近期来源、月度发布、问题难度升级和部分延迟公开来降低污染概率，而不是依赖“私有题库永远不泄露”。这种设计比静态 MMLU/GSM8K 更适合追踪快速迭代的前沿模型。

评分机制是 LiveBench 的第二个关键。总体分数不是一个 LLM 偏好票，而是各任务客观 scorer 的聚合。对于类别 \(c\) 下的问题集合 \(Q_c\)，可以写成：

$$
S_c(m)=\frac{1}{|Q_c|}\sum_{q\in Q_c}\text{score}_q\big(f_m(q), y_q\big),\quad
S(m)=\frac{1}{6}\sum_{c=1}^{6}S_c(m)
$$

不同任务的 \(\text{score}_q\) 具体实现不同。数学题通常抽取最终答案并与标准答案匹配；编程题运行测试；表格连接任务用列映射的 precision/recall/F1；表格重排比较目标格式和内容；拼写修正要求只修错别字、不改写风格；指令遵循则同时看整条 prompt 是否全部满足和每条约束是否满足。

$$
S_{\text{IF}}=\frac{1}{2}\left(\mathbf{1}[\forall k, c_k(\hat{y})=1]+\frac{1}{K}\sum_{k=1}^{K}\mathbf{1}[c_k(\hat{y})=1]\right)
$$

LiveBench 的 6 类任务覆盖面很有针对性。Math 使用近期竞赛题和更难的 AMPS 变体；Coding 使用 LiveCodeBench 的近期 LeetCode/AtCoder 代码生成，并加入代码补全；Reasoning 包含更难的 Web of Lies、Zebra Puzzles 和空间推理；Language Comprehension 包含 Connections、arXiv 摘要 typos 修复、近期电影剧情排序；Instruction Following 使用 Guardian 新闻文章并叠加可验证约束；Data Analysis 使用近期 Kaggle/Socrata 表格做列类型标注、表连接和格式转换。

```text
LiveBench task taxonomy:
- Math: competitions, olympiad fill-in-the-blank, AMPS_Hard
- Coding: LiveCodeBench generation, code completion
- Reasoning: Web of Lies v2, Zebra Puzzles, spatial reasoning
- Language: Connections, Typos, Plot Unscrambling
- Instruction Following: paraphrase, simplify, summarize, story generation with constraints
- Data Analysis: table reformatting, table join, column type annotation
```

一个容易忽视的细节是提示格式。论文通常要求模型使用 zero-shot chain-of-thought、在不知道时也给出最佳猜测，并把最终答案放在 XML 标签或 `**double asterisks**` 等易解析格式中。这并不是为了测试格式技巧，而是为了让自动 scorer 稳定抽取最终答案。论文也承认这会引入一定 instruction-following 成分，因此 LiveBench 的设计需要在“容易评分”和“不过度奖励格式服从”之间折中。

> 💡 关键：LiveBench 的“live”不只是排行榜实时刷新，而是数据源、题目版本、难度和模型答案都进入持续发布循环，使评测不断追上模型迭代。

与 ChatBot Arena、MT-Bench、Arena-Hard 等偏主观评测相比，LiveBench 牺牲了一部分开放式创意任务，例如“写一封邮件”或“做旅行攻略”很难定义唯一 ground truth；但它换来了困难任务上的可靠判分。论文对比 ground-truth 与 GPT-4-Turbo judge，发现后者在 AMC/AIME/SMC/Zebra 等任务上的错误率高到不适合作为严肃判分器。这解释了 LiveBench 为什么宁愿限制任务类型，也要坚持可验证答案。

LiveBench 的局限也来自同一设计：只选择客观题会低估对话风格、创意写作、开放式规划等能力；近期来源不能保证所有模型训练截止都在题目之前；自动解析最终答案可能受输出格式影响。但作为前沿模型横向比较工具，它的贡献非常清晰：把“新题”“客观评分”“多能力覆盖”合在同一个可复现基准中，让分数更接近真实能力变化，而不是训练集记忆或 judge 偏好的变化。

#### 🧪 练习题
```yaml
question: "LiveBench 避免使用 LLM-as-a-judge 的主要原因是什么？"
options:
  - "LLM judge 无法读取任何文本输入"
  - "LLM judge 在困难数学、逻辑等任务上错误率较高且存在输出风格偏差"
  - "LLM judge 只能评价代码题，不能评价语言题"
  - "LLM judge 会让所有模型得分恒为 0"
answer: 1
explain: "论文实验证明 GPT-4-Turbo judge 在困难数学和推理题上会产生显著误判，因此 LiveBench 优先选择有客观 ground truth 的自动评分任务。"
```
