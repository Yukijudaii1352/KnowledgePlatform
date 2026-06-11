### BFCL: 伯克利函数调用排行榜 (BFCL)

```yaml
id: bfcl
name: BFCL
full_name: 伯克利函数调用排行榜 (BFCL)
year: '2025.05'
org: UC Berkeley
paper_url: https://openreview.net/forum?id=2GmDdhBdDk
category: evaluation
parent: gorilla
motivation: 以AST与执行统一函数调用评测
```

#### 📝 一句话总结
BFCL 把函数调用评测从“少量 Python function call 样例”扩展为覆盖多语言、多调用模式、AST 校验与真实执行校验的大规模统一基准，并进一步把多步、带状态、需要 abstain 的 agentic function calling 纳入排行榜，成为函数调用能力评测的事实标准。

#### 🎯 核心要点
- 提出 Berkeley Function Calling Leaderboard，系统评估 serial、multiple、parallel、parallel-multiple 等函数调用场景
- 覆盖 Python、Java、JavaScript、REST API、SQL 等多种语言/接口形式，而不是局限于单一 JSON schema
- 设计 AST evaluation 与 executable evaluation 两套互补评测方式，以结构正确性和真实可执行性双重检查结果
- 数据由专家构造与用户贡献函数共同组成，目标是接近真实工具使用分布而不是玩具合成任务
- 不只测“该不该调、怎么调”，还测 abstain、memory、stateful multi-step、dynamic decision-making 等 agentic 能力
- OpenReview 版本明确指出：最强模型在单轮函数调用上已很强，但记忆、长时推理和动态决策仍是明显短板
- 论文与配套网站共同把 BFCL 推成函数调用评测的公共基准与持续更新排行榜

#### 🔬 深入细节
![BFCL 排行榜总览](https://gorilla.cs.berkeley.edu/assets/img/blog_post_8_Leaderboard.png)
*图：BFCL 官方排行榜把 AST、执行、relevance detection、成本与延迟等指标放在同一张面板里展示。*

```python
# BFCL 的核心评测流程（按论文/官方说明概括）
for sample in benchmark:
    prediction = model.generate_function_call(sample.prompt, sample.functions)
    ast_ok = ast_match(prediction, sample.reference_calls)
    exec_ok = maybe_execute(prediction, sample.runtime)
    abstain_ok = check_relevance_or_abstain(prediction, sample.label)
    record(sample.category, ast_ok, exec_ok, abstain_ok)
aggregate_by(simple, multiple, parallel, relevance, latency, cost)
```

BFCL 解决的是函数调用评测里两个最老的问题。第一，什么叫“调用对了”？如果只做字符串精确匹配，很多语义等价调用会被误判；第二，真实世界的函数形式非常多，过去的小型 benchmark 很难覆盖。论文因此把评测问题拆成 AST evaluation 与 executable evaluation。

这让 BFCL 不再只是“让模型补一个 JSON”。它同时考察 multiple function selection、parallel invocation、relevance detection，以及在没有合适函数时能否 abstain。OpenReview 版本进一步把多步、带状态的 agentic setting 纳入评测。

从方法论上看，BFCL 最重要的贡献是把函数调用从“模型功能演示”变成“可持续、可比较、可扩展的公共评测基础设施”。多语言、多类型函数、多粒度场景以及排行榜持续更新，共同让它成为后续 tool-use / agentic evaluation 工作默认会引用的基准。

因此在 `tool_use` 专题里，BFCL 的定位不只是一个 benchmark，而是“函数调用评测方法学”的拐点：从静态 schema 匹配转向结构校验、真实执行和 agentic long-horizon 分层评估。

> 💡 关键：AST evaluation 的作用不是替代真实执行，而是在无法统一执行所有语言/接口时，提供可扩展的结构正确性检查。

> ⚠️ 注意：排行榜高分不等于 agent 已经擅长多步任务；OpenReview 版本恰恰强调了从 function call 到 stateful agentic evaluation 仍有巨大落差。

#### 🧪 练习题
```yaml
question: BFCL 为什么同时保留 AST evaluation 和 executable evaluation？
options:
- 因为 AST evaluation 更慢，需要 executable evaluation 加速
- 因为并非所有场景都能统一真实执行，AST 能补足结构正确性检查
- 因为 executable evaluation 只适用于多模态任务
- 因为 AST evaluation 主要用于估计 token 成本
answer: 1
explain: 很多语言或接口难以统一真实执行，AST 检查能提供可扩展的结构验证，而可执行场景再用 execution 做更强约束。
```
