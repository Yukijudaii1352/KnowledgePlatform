### API-Bank：API 工具基准 (API-Bank)
```yaml
id: api_bank
name: API-Bank
full_name: API工具基准 (API-Bank)
year: 2023
org: 中科院/阿里巴巴
paper_url: https://aclanthology.org/2023.emnlp-main.187/
category: tool_use
parent: —
motivation: 首个系统性工具增强LLM基准
```

#### 📝 一句话总结
API-Bank 提出了面向工具增强 LLM 的系统性基准，把工具使用能力拆成 Call、Retrieve+Call、Plan+Retrieve+Call 三个层级，并提供可运行 API 系统、人工评测集、自动构造训练集和 Lynx 微调模型来评估与提升 LLM 的真实 API 使用能力。

#### 🎯 核心要点
- 定义三类工具使用能力：已知少量 API 下调用、未知大量 API 下检索后调用、多步规划后检索并调用多个 API。
- 构建可运行评测系统，包含 73 个常用 API、314 条人工标注工具使用对话和 753 次 API 调用。
- 提供训练集：1,888 条工具使用对话、2,138 个 API、覆盖 1,000 个领域，用于训练工具增强 LLM。
- 提出 API Search 工具：在大量 API 池中用查询关键词和 API 元信息 embedding 的余弦相似度检索候选 API。
- 提出五代理 Multi-agent 数据生成流程，将复杂数据构造拆成领域生成、API 生成、查询生成、调用/响应生成、测试过滤。
- 训练 Lynx-7B：以 Alpaca 为初始化，经 API-Bank 数据微调后在工具使用正确率上显著超过 Alpaca，并接近 GPT-3.5。
- 评测同时关注 API 调用正确性和最终响应质量，分别使用 correctness/accuracy 与 ROUGE-L。

#### 🔬 深入细节
![API-Bank 三层工具使用能力](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图：API-Bank Figure 1，将工具增强 LLM 的能力分为 Call、Retrieve+Call、Plan+Retrieve+Call，难度从已知 API 的单步调用逐步提升到未知 API 池中的多步计划与调用。*

```python
# API-Bank 评测与训练流程伪代码

def evaluate_tool_llm(model, dialogue, api_pool):
    state = initialize_api_system(api_pool)
    api_history = []

    for turn in dialogue.turns:
        prompt = build_tool_prompt(turn, api_pool, api_history)
        prediction = model.generate(prompt)

        if prediction.calls_api_search:
            candidates = api_search(prediction.keywords, api_pool)
            prediction = model.generate(prompt_with(candidates))

        call = parse_api_call(prediction)
        result = execute_api(call, state)
        api_history.append((call, result))

    call_correct = compare_with_gold(api_history, dialogue.gold_calls)
    response_score = rouge_l(prediction.final_response, dialogue.gold_response)
    return call_correct, response_score


def multi_agent_data_generation():
    domain = agent_1_generate_domain()
    apis = agent_2_generate_apis(domain, public_api_examples=True)
    selected_apis, ability, query = agent_3_generate_query(apis)
    calls, response = agent_4_simulate_calls_and_response(domain, selected_apis, query)
    return agent_5_tester_filter(domain, apis, query, calls, response)
```

API-Bank 的核心动机是：当 LLM 被要求调用真实工具时，传统 NLP benchmark 只测回答文本是不够的。工具调用有严格格式、参数约束、状态变化和执行结果；一个模型即使能说出合理解释，也可能没有真正调用 API、调用了错误 API、参数缺失、格式不可解析，或者在多步任务中无法规划调用顺序。因此论文从用户需求出发，把工具使用能力拆成两个维度：API 池大小和每轮调用次数。少量 API 时，模型可以直接看到所有 API 文档；大量 API 时，模型必须先检索；复杂任务时，模型还必须规划多个 API 的顺序。

三层能力的定义是 API-Bank 最重要的抽象。`Call` 表示模型已知候选 API 文档时，能根据用户请求填对 API 名和参数；`Retrieve+Call` 表示 API 池很大，模型不知道具体可用 API，需要先调用 API Search 检索再调用；`Plan+Retrieve+Call` 表示用户给出一个复合需求，模型需要拆解成多个步骤，并在每一步检索和调用合适 API。可以用难度递进表示为：

$$
\text{Call} \subset \text{Retrieve+Call} \subset \text{Plan+Retrieve+Call}
$$

这个包含关系表达的是能力要求递增，而不是数据集合严格包含：后两者在前者基础上增加了检索与规划。论文的 Figure 1 正是围绕这三个层级组织评测。

API Search 是 API-Bank 中把“海量工具池”变成可操作环境的关键工具。模型在 Retrieve+Call 和 Plan+Retrieve+Call 设置中并不会预先看到所有 API，而是必须先把用户需求压缩成关键词，交给 API Search 检索相关 API。论文描述的检索机制可以写为：

$$
a^* = \arg\max_{a\in\mathcal{A}} \frac{E(q)\cdot E(m_a)}{\|E(q)\|\,\|E(m_a)\|}
$$

其中 \(q\) 是模型生成的检索关键词，\(m_a\) 是 API 的元信息文本，\(E(\cdot)\) 是句向量编码器。这个机制让模型面临两个层面的挑战：它既要理解用户需求并形成可检索关键词，又要在拿到 API 文档后生成正确调用。

评测系统不是静态文本匹配，而是可执行环境。API-Bank 实现了 73 个 API，包括天气、数据库操作、AI 模型访问等常见工具；对需要外部信息的 API，论文把检索结果固定下来以保证可复现。评测时先初始化 API 系统和数据库状态，再比较模型预测 API 调用与人工标注调用是否一致。一致性不只是字符串完全相同，而是关注是否执行同样的查询或修改、是否得到相同返回结果。最终指标包含 API 调用 correctness/accuracy 和响应 ROUGE-L：

$$
\operatorname{Accuracy}=\frac{\#\text{correct API calls}}{\#\text{all API calls}}
$$

这使 API-Bank 能区分两类错误：工具调用链是否正确，以及模型基于工具输出给用户的自然语言回答是否好。

训练集构造解决的是规模问题。人工评测集每条对话标注成本高，论文报告平均约 8 美元/对话；而工具增强训练数据又必须覆盖不同领域、真实 API、多轮对话、多调用和三类能力。单一 self-instruct 提示很难同时满足这些约束，ChatGPT 直接生成时可用率很低。API-Bank 因此提出五代理生成流程：第一个 agent 生成领域，第二个 agent 根据领域生成 API 并参考 Public APIs 保持真实性，第三个 agent 选择 API 和能力层级并生成 query，第四个 agent 生成 API 调用和响应，第五个 tester agent 检查数据是否符合设计原则并过滤错误样本。

这个 Multi-agent 流程的本质是把一个过载指令拆成有依赖关系的子任务。数据元素之间存在清晰结构：domain 决定 API 功能，API 和 ability 决定 query 类型，domain/API/query/ability 共同决定 API call 与 response。因此五代理流程不是简单多样化采样，而是在模拟数据生成的因果链。论文报告最终训练集包含 1,888 条对话、2,138 个 API 和 1,000 个领域，成本约 0.1 美元/对话，相比人工标注节省约 98%。

Lynx 是 API-Bank 对“如何提升工具使用能力”的验证。论文用 API-Bank 训练数据微调 Alpaca 得到 Lynx-7B，并在评测系统上与 Alpaca、ChatGLM、GPT-3、GPT-3.5、GPT-4 等模型比较。结果显示 Lynx 在 API call correctness 上比 Alpaca 提升超过 26 个百分点，并接近 GPT-3.5；但错误分析也暴露了工具增强 LLM 的难点：Alpaca 常见问题是没有 API 调用或格式错误，Lynx 微调后减少了这些问题，但更容易出现 API hallucination 或参数问题；GPT-4 在最难的规划任务上强，但 API Search 使用和输出格式仍可能不符合评测系统要求。

与 Toolformer、APIBench、ToolAlpaca 等工作相比，API-Bank 的贡献不只是“又一个工具调用数据集”，而是把工具使用拆成可运行、可度量、可训练的完整闭环。它强调评测集人工构造和可执行 API 环境，避免只在模型自生成数据上评估；它同时测 API call 与 response，避免只看最终自然语言答案；它覆盖多领域、多轮、多调用和检索规划场景，更贴近真实 agent 系统会遇到的问题。

> 💡 关键：API-Bank 的价值在于把“会不会用工具”从主观印象变成可执行评测：模型必须选对 API、传对参数、按顺序执行，并基于真实返回结果回答用户。

#### 🧪 练习题
```yaml
question: "API-Bank 中 `Plan+Retrieve+Call` 相比 `Retrieve+Call` 额外考察了什么能力？"
options:
  - "只考察模型能否把 API 文档压缩进上下文"
  - "考察模型在未知 API 池中先检索一个 API 后立即单步调用"
  - "考察模型能否把复合需求拆成多步，并在每一步检索和调用合适 API"
  - "只考察最终自然语言回答的 ROUGE-L 分数"
answer: 2
explain: "`Plan+Retrieve+Call` 要求模型先规划多个 API 调用步骤，再对每一步执行检索和调用，因此比单步 `Retrieve+Call` 更难。"
```
