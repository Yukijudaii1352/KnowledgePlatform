### API-Bank：系统评测 LLM 工具调用能力的 API 基准

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

API-Bank 构建了 API 文档、模拟工具环境和多轮对话数据，用三层任务系统评估 LLM 是否能选择、调用并组合 API 完成用户目标。

#### 🎯 核心要点

- **核心问题**：工具增强 LLM 不仅要会生成文本，还要知道何时调用 API、调用哪个 API、如何填写参数以及如何解释结果。
- **三层能力**：Level 1 评估 API 调用，Level 2 评估检索后调用，Level 3 评估多步规划、检索和调用。
- **环境设计**：API-Bank 提供 API 文档、模拟数据库和执行器，使模型输出能被真实检查。
- **评测对象**：既评估 API 调用格式与参数，也评估最终回复是否满足用户需求。
- **历史意义**：它把工具使用从零散案例推进到可复现实验基准。

#### 🔬 深入细节

![API-Bank task levels](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)

*图源：ar5iv 论文图 1，展示 API-Bank 中 Call、Retrieve+Call、Plan+Retrieve+Call 三类能力。*

```python
def api_bank_evaluate(dialogue, api_docs, simulator):
    state = init_dialogue_state(dialogue)
    score = 0
    for turn in dialogue.user_turns:
        context = state.render()
        if needs_api(turn, context):
            candidate_docs = retrieve_api_docs(turn, api_docs)
            call = llm_generate_api_call(turn, context, candidate_docs)
            result = simulator.execute(call.name, call.arguments)
            state.append_api_result(call, result)
            score += check_call_correctness(call, turn.gold_call)
        response = llm_generate_response(turn, state)
        score += check_response(response, turn.gold_answer)
        state.append_assistant(response)
    return normalize(score)
```

**方法动机**：API-Bank 的核心判断是，工具调用能力可以拆成可观察的中间决策，而不应只看最终回答。一个调用轨迹 $\tau=(api_1,args_1,\dots,api_T,args_T)$ 是否正确，既取决于工具选择，也取决于参数、调用顺序和结果整合。

**三层任务设计**：Level 1 给出明确 API 信息，测试模型能否生成正确调用；Level 2 增加 API 检索，要求模型从候选文档中找到合适工具；Level 3 进一步要求模型在多轮对话中规划多个 API 调用。这个层级设计把“会不会填参数”和“能不能自主完成任务”区分开来。

**模拟环境与数据**：基准包含一组 API、对应文档、数据库和执行环境。模型不是自由编造工具结果，而是必须输出可执行调用，由模拟器返回结果；因此评测可以检查 API 名称、参数值、执行结果和最终语言回复之间的一致性。

**评测意义**：API-Bank 让工具增强 LLM 的失败模式变得可诊断：模型可能选错工具、漏掉参数、调用顺序错误，或无法把 API 结果转成用户可用答案。后续 AgentBench、WebArena 等基准都延续了这种“交互环境 + 行动轨迹 + 结果验证”的思路。

#### 🧪 练习题

```yaml
question: API-Bank 的 Level 3 主要评估什么能力？
options:
  - A. 多步规划、API 检索与连续调用
  - B. 单句情感分类
  - C. 静态词向量训练
  - D. 图片压缩
answer: A
explain: Level 3 要求模型在多轮任务中规划并组合多个 API 调用，因此比单次调用更接近真实工具使用。
```
