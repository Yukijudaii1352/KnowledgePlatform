### API工具基准 (API-Bank)

```yaml
id: api_bank
name: API-Bank
full_name: API工具基准 (API-Bank)
year: '2023'
org: 中科院/阿里巴巴
paper_url: https://aclanthology.org/2023.emnlp-main.187/
category: tool_use
parent: —
motivation: 首个系统性工具增强LLM基准
```

#### 📝 一句话总结

API-Bank 提出面向工具增强 LLM 的系统性基准，围绕 API 调用、检索与多步规划三类能力构建可执行评测与训练数据，并用 Lynx 验证工具使用能力可以通过专门数据显著提升。

#### 🎯 核心要点

- **三层能力分级**：Call、Retrieve+Call、Plan+Retrieve+Call，分别考察调用、检索与多步规划能力
- **可执行评测系统**：包含 73 个常用 API、314 段人工标注工具对话和 753 次 API 调用
- **大规模训练集**：包含 2,138 个 API、1,888 段工具使用对话和 4,149 次 API 调用
- **Multi-agent 数据生成**：用五个协作代理生成领域、API、用户需求、调用与返回结果，并做质量控制
- **Lynx 模型**：在 Alpaca-7B 基础上用 API-Bank 训练集微调得到工具增强 LLM
- **评测维度完整**：同时评估 API 规划、API 检索、API 调用准确性，而不是只看最终文本答案
- **误差分析导向**：指出 GPT-4 与 Lynx 在 API 选择、参数构造、调用顺序等方面仍有明显失败模式

#### 🔬 深入细节

##### 核心示意图

![API-Bank 能力分级图](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图：API-Bank 将工具增强 LLM 的能力拆分为 Call、Retrieve+Call、Plan+Retrieve+Call 三个层级。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# API-Bank 评测与训练数据生成伪代码
def evaluate_api_bank(model, dialogue, api_pool):
    state = init_dialogue_state(dialogue)
    trace = []
    for turn in dialogue.user_turns:
        if len(api_pool) <= small_pool_threshold:
            candidate_apis = api_pool
        else:
            candidate_apis = retrieve_apis(turn, api_pool)

        plan = model.plan(turn, state, candidate_apis)
        for step in plan:
            api_name, params = model.call_api(step, candidate_apis, state)
            response = execute_api(api_name, params)
            trace.append((api_name, params, response))
            state = update_state(state, response)

    return score_trace(trace, dialogue.gold_calls)

def multi_agent_data_generation(seed_domains):
    for domain in seed_domains:
        api_specs = api_agent_generate(domain)
        user_queries = query_agent_generate(api_specs)
        call_traces = call_agent_generate(user_queries, api_specs)
        verified = quality_agent_filter(call_traces)
        yield build_dialogue(verified)
```

##### 方法解读

API-Bank 的出发点是：早期工具增强论文通常展示若干 demo，但缺少统一、可执行、可分层的评测。论文通过用户访谈归纳出两个维度：API 池大小和调用步数。小 API 池可以直接把所有工具放入上下文，大 API 池必须先检索；单次调用只需选对一个 API，多次调用还要规划顺序和状态传递。

因此，API-Bank 把能力拆成三层。Level 1 的 Call 能力考察模型在已知 API 集合中生成正确函数名和参数；Level 2 的 Retrieve+Call 额外要求从大规模 API 池中找出相关工具；Level 3 的 Plan+Retrieve+Call 要求模型先规划多步调用，再逐步执行。这种分层让错误可定位，例如失败到底来自检索漏召回、参数格式错误，还是调用顺序不合理。

训练数据构建上，API-Bank 同时使用人工评测集和自动生成训练集。自动生成并不是单个 prompt 直接产出完整样本，而是用多个代理分工：先生成领域和 API 规格，再生成用户请求，再合成 API 调用和响应，最后进行一致性检查。论文报告这种 Multi-agent 流程显著降低标注成本，同时保持覆盖面。

Lynx 的训练方式相对直接：以 Alpaca-7B 为初始化模型，把工具使用对话组织成指令微调数据，让模型学习在对话中选择 API、填充参数、读取 API 返回值并继续交互。它说明工具调用能力不是预训练模型自然稳定具备的能力，专门的工具数据能带来明显提升。

评测时，API-Bank 不只看最后回答是否像自然语言正确，而是检查每个 API 调用的名称、参数和顺序。若一个模型最终“猜对”答案但未正确调用工具，在该基准下仍不能被视为掌握工具使用。这使 API-Bank 更接近真实系统集成场景。

> ⚠️ 注意：API-Bank 是基准和数据体系，不是单一 Agent 算法。它的核心价值在于把工具增强 LLM 的能力边界变成可执行、可复现、可诊断的评测协议。

#### 🧪 练习题

```yaml
question: "API-Bank 中最难的 Plan+Retrieve+Call 层级额外考察了什么能力？"
options:
  - "只在固定 API 列表中选择一个函数"
  - "从大 API 池检索相关 API，并规划多步调用顺序"
  - "把 API 文档压缩成向量索引"
  - "用人工反馈训练奖励模型"
answer: 1
explain: "Plan+Retrieve+Call 同时要求检索、调用和多步规划，模型需要决定哪些 API 先后执行以及如何利用中间返回结果。"
```
