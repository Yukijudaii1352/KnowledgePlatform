### API-Bank：API工具基准 (API-Bank)

```yaml
id: api_bank_bench
name: API-Bank
full_name: API工具基准 (API-Bank)
year: 2023
org: 中科院/阿里巴巴
paper_url: https://aclanthology.org/2023.emnlp-main.187/
category: benchmark
parent: —
motivation: 首个系统性工具增强LLM基准
```

#### 📝 一句话总结
API-Bank 提出一个面向工具增强 LLM 的系统性基准，用真实可执行 API 环境评估模型的 Call、Retrieve+Call、Plan+Retrieve+Call 三类能力。它同时提供人工标注评测集和由五个 LLM agent 自动生成的训练集，并用 Lynx 微调实验说明工具调用能力可以被数据显著增强。

#### 🎯 核心要点
- 三层工具能力分级：已知 API 的 Call、未知 API 池中的 Retrieve+Call、多步复杂需求下的 Plan+Retrieve+Call。
- 可执行评测系统：实现 73 个常用 API，并用数据库状态和执行结果判断 API 调用是否真正正确。
- 人工评测数据：314 个工具使用对话、753 次 API 调用，覆盖多轮和多调用场景。
- 训练数据：1,000 个领域、2,138 个 API、1,888 个训练对话，由多 agent 数据生成流程构造。
- Multi-agent 数据生成：五个 ChatGPT agent 分别生成领域、API、查询、调用与响应，并由 tester agent 过滤质量不达标样本。
- API Search 机制：在 Retrieve+Call 与 Plan+Retrieve+Call 中，模型必须先用检索 API 找到候选工具，再执行实际 API。
- 评价指标：API 调用用执行一致性 Accuracy，最终响应用 ROUGE-L；错误分析覆盖 API 幻觉、格式错误、缺参、检索失败等。

#### 🔬 深入细节
![API-Bank 三类工具使用能力](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图：API-Bank 将工具增强 LLM 能力分成 Call、Retrieve+Call、Plan+Retrieve+Call。难度从已知 API 的单步调用逐步上升到未知 API 池中的多步规划与检索。*

![API-Bank Multi-agent 数据生成流程](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x3.png)
*图：训练集由多个生成 agent 协作构造，tester agent 负责检查生成数据是否符合设计原则。*

API-Bank 的出发点是：LLM 使用外部工具已经成为趋势，但“会不会用工具”不能只看模型能否生成一个看似合理的函数名。真实工具调用有三个连续难点。第一，模型要在给定 API 文档时正确填参数并调用；第二，当 API 池很大时，模型要先检索到正确 API；第三，当用户需求需要多个 API 串联时，模型要规划调用顺序、传递中间结果，并根据最后执行结果回复用户。API-Bank 正是围绕这三个难点定义能力分级。

论文将用户需求空间按两个维度拆分：API 池大小和单轮调用次数。少量 API 且单/多次调用时，所有 API 文档可以直接放进上下文，主要考察 Call；大量 API 且单次调用时，模型必须 Retrieve+Call；大量 API 且多次调用时，模型还要 Plan+Retrieve+Call。这个设计比只测函数调用更严格，因为检索失败、计划顺序错误、参数传递错误都会导致最终任务失败。

```python
# API-Bank 评测流程伪代码
for dialogue in evaluation_set:
    system.reset_databases_to_default()
    api_history = []

    for turn in dialogue.turns:
        prompt = build_prompt(turn.user_query, api_history, visible_api_docs=None)
        model_output = llm.generate(prompt)

        if turn.ability in ["Retrieve+Call", "Plan+Retrieve+Call"]:
            search_keywords = parse_api_search(model_output)
            candidate_api = api_search(search_keywords)          # 返回最相似 API 元信息
            model_output = llm.generate(prompt_with(candidate_api))

        predicted_call = parse_api_call(model_output)
        predicted_result = system.execute(predicted_call)
        api_history.append((predicted_call, predicted_result))

    call_correct = execution_equivalent(predicted_calls, gold_calls)
    response_score = rouge_l(final_response, gold_response)
```

API Search 是 API-Bank 的核心机制之一。对于 Retrieve+Call 和 Plan+Retrieve+Call，模型事先不知道 API Pool 中有哪些 API，必须先把用户需求压缩成关键词，再调用一个特殊的 `API Search`。系统把关键词和所有 API 元信息编码成句向量，用余弦相似度取最高者：

$$
\operatorname{API}^{*}=\arg\max_{a\in\mathcal{P}}\cos\big(E(q),E(m_a)\big)
$$

其中 \(q\) 是模型生成的检索关键词，\(m_a\) 是 API \(a\) 的名称、描述、输入输出参数等元信息。这个设计把“工具发现”纳入评测，而不是假设所有工具永远在上下文里可见。

API 调用正确性不是字符串完全匹配，而是执行一致性。评测开始时，系统把每个 API 背后的数据库重置到默认状态，然后执行模型预测调用和人工标注调用，比较它们是否执行相同查询或修改并返回相同结果。可以写成：

$$
\operatorname{Acc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\operatorname{Exec}(\hat{c}_i)\equiv \operatorname{Exec}(c_i)\right]
$$

其中 \(\hat{c}_i\) 是模型调用，\(c_i\) 是标注调用。这个定义比函数名匹配更贴近真实任务，因为参数格式、数据库修改、返回值都会影响后续对话。最终自然语言回复质量则用 ROUGE-L 衡量，补充判断模型是否能把 API 结果转成用户需要的回答。

训练集构造是 API-Bank 的另一项贡献。人工标注 API 对话成本很高，论文报告每个评测对话平均约 8 美元，因此提出 Multi-agent 自动生成流程。五个 agent 分工明确：第一个生成领域，如医疗、健身、旅行；第二个结合领域生成 API，并参考 Public APIs 示例提升真实性；第三个随机选择 API 和能力类型，生成满足该能力的用户查询；第四个生成 API 调用、模拟执行结果和最终回复；第五个 tester 检查数据是否符合设计原则，并丢弃不合格实例。最终训练集覆盖 1,000 个领域、2,138 个 API、1,888 个对话和 5,221 个 turns。

```python
# API-Bank Multi-agent 训练数据生成伪代码
for _ in range(num_samples):
    domain = domain_agent.generate()
    api_specs = api_agent.generate(domain, public_api_examples)
    ability, selected_apis, query = query_agent.compose(api_specs)
    calls, responses = execution_agent.simulate(domain, selected_apis, ability, query)

    instance = {
        "domain": domain,
        "apis": selected_apis,
        "ability": ability,
        "query": query,
        "api_calls": calls,
        "responses": responses,
    }

    if tester_agent.verify(instance):
        training_set.append(instance)
```

论文用这个训练集微调 Alpaca-7B 得到 Lynx，结果显示工具能力不是 LLM 自动具备的“天然能力”。原始 Alpaca 和 ChatGLM 在基础 API Call 上约有一定正确率，但检索和规划能力很弱；GPT-3 Davinci 在 API 使用上表现很差，作者推测缺少 instruction tuning 是原因之一；GPT-3.5 的直接调用更强，但在 Retrieve+Call 和 Plan+Retrieve+Call 难度上明显下降；GPT-4 在最难规划场景更强。Lynx 相比 Alpaca 在 API Call 正确性上显著提升，并接近 GPT-3.5 的效果，说明高质量工具调用数据能教会模型稳定遵循 API 格式和调用流程。

错误分析揭示了基准的价值。Alpaca 的主要错误包括不调用 API、调用格式错误和 API 幻觉；Lynx 经过微调后“不调用 API”的问题下降，但仍会出现 API 名称不匹配或训练中见过的工具幻觉；GPT-4 的主要问题反而是检索失败，说明强推理模型也可能不会按评测要求使用 API Search。由此论文提出三个方向：更好的 API calling 方法、更严格的 API 解码算法、更大规模和更多样的训练数据。

> 💡 关键：API-Bank 的“系统性”体现在把工具使用拆成可执行、可检索、可规划、可训练、可错误分析的闭环；它不是静态问答集，而是带 API 状态和执行结果的工具环境。

#### 🧪 练习题
```yaml
question: "API-Bank 中 Retrieve+Call 与普通 Call 的关键区别是什么？"
options:
  - "Retrieve+Call 不需要执行 API，只生成自然语言答案"
  - "Retrieve+Call 中模型事先不知道目标 API，必须先通过 API Search 检索候选 API 再调用"
  - "Retrieve+Call 只评估 ROUGE-L，不评估 API 调用正确性"
  - "Retrieve+Call 要求人工在每一步实时辅助模型"
answer: 1
explain: "普通 Call 给定 API 文档，主要考察参数填充和调用；Retrieve+Call 把工具发现也纳入评测，模型必须先检索正确 API。"
```
