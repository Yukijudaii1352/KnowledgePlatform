### MMLU-Pro：更鲁棒、更困难的多任务语言理解基准
```yaml
id: mmlu_pro
name: MMLU-Pro
full_name: MMLU专业版 (MMLU-Pro)
year: "2024"
org: TIGER Lab
paper_url: https://arxiv.org/abs/2406.01574
category: frontier_2026
parent: mmlu
motivation: 10选项12K研究生级问题难度升级
```

#### 📝 一句话总结
MMLU-Pro 通过移除 MMLU 中过易和噪声题、加入更强推理题、并把选择题从 4 个选项扩展到平均近 10 个选项，解决了 MMLU 分数饱和、提示敏感和区分度不足的问题。

#### 🎯 核心要点
- 数据规模：12,032 道多学科选择题，覆盖 14 个大类，包括数学、物理、化学、法律、工程、心理、健康等。
- 难度升级：从原始 MMLU 中过滤过易题，并引入 STEM Website、TheoremQA、SciBench 的大学级推理题。
- 选项增强：将传统 4 选项扩展到 10 选项，平均每题 9.47 个选项，显著降低随机猜中的概率。
- 双阶段专家复核：先核验答案正确性和题目适配性，再用 Gemini-1.5-Pro 查找潜在 false negative 选项并由人工复查。
- 评测协议：使用 5-shot Chain-of-Thought，正则抽取 A-J 答案，抽取失败时采用随机 fallback 以保证每题有预测。
- 经验结果：模型在 MMLU-Pro 上相对 MMLU 准确率下降 16% 到 33%，24 种 prompt 下分数波动从 MMLU 的约 4-5% 降到约 2%。

#### 🔬 深入细节
![MMLU-Pro 数据构造流程](https://ar5iv.labs.arxiv.org/html/2406.01574/assets/data_collection_2.png)
*图：MMLU-Pro 从原始 MMLU 出发，经初筛、题目收集与整合、选项增强、专家审核，形成最终 benchmark。*

```python
# MMLU-Pro 数据构造与评测伪代码
mmlu_pro = []

for q in original_mmlu:
    correct_count = sum(model.answer(q) == q.gold for model in small_filter_models)
    if correct_count <= 4:          # 多数小模型都能答对的题被视为过易
        q = merge_to_14_domains(q)
        mmlu_pro.append(q)

for source in [STEM_Website, TheoremQA, SciBench]:
    for raw_problem in source:
        answer = gpt4_turbo_extract_short_answer(raw_problem.solution)
        if human_check_answer(raw_problem, answer):
            q4 = build_mcq(raw_problem, answer, distractors=3)
            mmlu_pro.append(q4)

for q in mmlu_pro:
    q.options = gpt4_turbo_expand_to_10_options(q.options)
    q = expert_verify_correctness_and_format(q)
    suspicious = gemini_1_5_pro_find_false_negative_options(q)
    q = human_review_and_remove_bad_options(q, suspicious)

for model in evaluated_models:
    for q in mmlu_pro:
        prompt = five_shot_cot_prompt(q.domain, q.question, q.options)
        reasoning = model.generate(prompt)
        pred = regex_extract_A_to_J(reasoning) or random_choice(q.options)
        score(model, q, pred == q.gold)
```

MMLU-Pro 的核心问题设定来自对原始 MMLU 的三点诊断：第一，4 选项选择题只有 3 个干扰项，模型可能通过排除法、选项先验或浅层相关性猜中；第二，许多题更偏知识回忆而不是多步推理，因此强模型直接回答也能取得很高分；第三，原始数据中存在不可答、错标或噪声题，导致强模型分数接近上限后难以继续区分。MMLU-Pro 的构造目标就是同时提高 \(D\) 难度、\(R\) 鲁棒性和 \(S\) 可区分性。

初筛阶段使用 8 个相对较小的模型回答原始 MMLU 题目，包括 Llama-2、Mistral、Gemma、Yi 等不同规模和 chat/base 版本。若某题被超过 4 个模型答对，则认为它对现代模型过易并剔除。这个规则可以写成：

$$
\text{keep}(q)=\mathbf{1}\left[\sum_{i=1}^{8}\mathbf{1}(m_i(q)=a_q)\le 4\right]
$$

其中 \(m_i(q)\) 是第 \(i\) 个筛选模型的答案，\(a_q\) 是 gold answer。这个规则不是为了给题目绝对定级，而是用一组低成本模型近似估计题目的“基础可解性”。如果半数以上小模型都能答对，题目对 frontier LLM 的区分度通常有限。

在题源扩展阶段，MMLU-Pro 引入 STEM Website、TheoremQA、SciBench。STEM Website 和 TheoremQA 往往不是标准选择题，而是带解答的问题或简答题，因此作者用 GPT-4-Turbo 从 solution 中抽取短答案，并生成初始干扰项，再人工对照原解检查抽取是否完整、是否错把中间结果当最终答案。这个步骤补进了工程、数学、物理等需要公式推导和多步计算的题型，使 MMLU-Pro 不只是“更长的 MMLU”，而是更强调 deliberative reasoning。

选项增强是最直观的机制变化。原始 4 选项下，随机猜中概率为 \(1/4=25\%\)；10 选项下，随机猜中概率近似降为 \(1/10=10\%\)。更重要的是，新增选项不是随意噪声，而是由 GPT-4-Turbo 生成的 plausible distractors，要求与正确答案语义接近但存在细微错误。论文最终数据中约 83% 题目保留 10 个选项，17% 因专家审查移除无效选项而少于 10 个，平均选项数为 9.47。这个设计能减少“靠选项风格猜答案”的捷径。

专家审核分为两个阶段。第一阶段检查正确答案、题目是否适合选择题、是否缺少图表等非文本信息、是否缺少必要条件。第二阶段重点检查 false negative options，即被标成错误但实际上也正确的选项。作者让 Gemini-1.5-Pro 重新评估所有选项，标出可疑干扰项，再由专家复查。这个流程对应多选项增强的主要风险：选项越多，越容易生成另一个正确答案；如果不处理，benchmark 会把模型的合理答案判错。

评测时，MMLU-Pro 默认采用 5-shot Chain-of-Thought，而不是只做 direct answering。设模型对题目 \(q\) 输出推理文本 \(z\)，答案抽取函数 \(E(z)\in\{A,\ldots,J\}\)，则准确率为：

$$
\mathrm{Acc}(M)=\frac{1}{|Q|}\sum_{q\in Q}\mathbf{1}\big[E(M(P_{CoT}(q)))=a_q\big]
$$

其中 \(P_{CoT}\) 是按学科选择的 5-shot CoT prompt。论文比较显示，CoT 对 MMLU-Pro 的提升显著高于 MMLU，例如 GPT-4o 在 MMLU-Pro 上 CoT 比 direct answer 高 19.1 个百分点，而在原始 MMLU 上只高 1.5 个百分点。这说明 MMLU-Pro 中的题目更依赖中间推理，而非简单知识检索。

鲁棒性是 MMLU-Pro 相对 MMLU 的另一个重要指标。论文用 24 种合理 prompt style 测试同一批模型，发现原始 MMLU 的分数波动通常在 4-5%，最高可超过 10%；MMLU-Pro 通常约 2%，最高 3.74%。直觉上，难题和多选项降低了 prompt wording 对浅层猜测的影响，模型必须真正完成题目求解，prompt 变化对最终排名的扰动更小。

> 💡 关键：MMLU-Pro 不是单纯扩大题库，而是把“题目筛选、推理题补充、10 选项干扰、专家去噪、CoT 评测”连成一套 benchmark 构造算法，用更低随机性和更高推理负载恢复模型之间的可区分度。

#### 🧪 练习题
```yaml
question: "MMLU-Pro 将选择题从 4 个选项扩展到 10 个选项的主要目的是什么？"
options:
  - "让答案抽取正则表达式更简单"
  - "降低随机猜中概率并引入更强干扰项，从而提升难度和鲁棒性"
  - "减少专家审核成本"
  - "保证所有题目都来自原始 MMLU"
answer: 1
explain: "10 选项将随机猜中概率从 25% 降到约 10%，同时 plausible distractors 迫使模型进行更细致推理；但这也需要专家复核 false negative 选项。"
```
