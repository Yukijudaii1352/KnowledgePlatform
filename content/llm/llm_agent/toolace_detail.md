### 工具调用王牌 (ToolACE)

```yaml
id: toolace
name: ToolACE
full_name: 工具调用王牌 (ToolACE)
year: '2025'
org: 浙江大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/663865ea167425c6c562cb0b6bcf76c7-Abstract-Conference.html
category: tool_use
parent: toolllm
motivation: 自动化数据合成提升函数调用准确率
```

#### 📝 一句话总结

ToolACE 提出自动化 agentic 数据合成流水线，通过 API 自演化、模型能力引导的对话生成和双层验证，生成准确、复杂且多样的函数调用训练数据，显著提升小参数 LLM 的函数调用能力。

#### 🎯 核心要点

- **三模块数据管线**：Tool Self-evolution Synthesis、Self-Guided Dialog Generation、Dual-Layer Validation
- **大规模 API 池**：构建 26,507 个多样 API，覆盖真实与合成 API 场景
- **API 自演化**：用层次化 API context tree 进行 speciation、adaptation、evolution
- **模型能力自适应**：用待训练 LLM 作为复杂度评估器，生成适合其能力缺口的数据
- **多代理对话合成**：通过用户代理、工具代理、复杂度评估器等协作生成函数调用对话
- **双层验证 DLV**：结合规则检查器与模型检查器验证可执行性、参数一致性和答案一致性
- **强基准表现**：在 BFCL 和 APIBank 上，8B 级 ToolACE 模型显著超过开源函数调用模型，并接近 GPT-4 系列表现

#### 🔬 深入细节

##### 核心示意图

![ToolACE 总体框架](https://arxiv.org/html/2409.00920v2/x1.png)
*图：ToolACE 的整体数据生成框架，由 TSS、SDG、DLV 三个模块组成。图源：arXiv HTML。*

##### 算法伪代码

```python
# ToolACE 自动化数据合成伪代码
def toolace_pipeline(raw_api_documents, target_llm):
    api_tree = build_api_context_tree(raw_api_documents)
    api_pool = []
    example_buffer = []

    for subtree in sample_subtrees(api_tree):
        base_api = sample(example_buffer) if example_buffer else None
        api = synthesize_api_definition(subtree, base_api)
        api = evolve_api(
            api,
            mutations=["new_functionality", "new_parameter",
                       "nested_type", "return_schema_change", "constraints"]
        )
        if rule_check_api(api):
            api_pool.append(api)
            example_buffer.append(api)

    dialogs = []
    for api_set in sample_api_sets(api_pool):
        complexity = target_llm.estimate_complexity(api_set)
        dialog = multi_agent_generate_dialog(api_set, complexity)
        if dual_layer_validation(dialog, api_set):
            dialogs.append(dialog)

    return instruction_tune(target_llm, dialogs)
```

##### 方法解读

ToolACE 的问题设定比单纯“收集真实 API”更进一步。真实函数调用数据难以采集和标注，而已有合成数据常见两个问题：覆盖面不足和准确性不足。覆盖面不足会导致模型只会少数简单调用模式；准确性不足会把错误参数、不可执行调用或不一致返回写进训练集，直接污染函数调用能力。

Tool Self-evolution Synthesis (TSS) 先解决 API 多样性。它从 API 相关文档中抽取领域和功能，形成层次化 API context tree。Speciation 决定 API 属于哪个领域和功能子树，Adaptation 调整每个 API 的能力范围，Evolution 用变异操作加入新功能、参数、约束、嵌套类型或返回结构。这个过程让合成 API 不只是换名字，而是在功能和 schema 上持续扩展。

Self-Guided Dialog Generation (SDG) 解决“数据是否适合当前模型”的问题。论文指出，不同规模模型需要的训练样本复杂度不同：过难样本对小模型不可学习，过易样本对大模型没有增益。ToolACE 让待调优 LLM 参与复杂度评估，围绕其能力缺口生成单函数、多函数、并行函数等不同类型对话。

Dual-Layer Validation (DLV) 是质量闸门。规则层检查函数名是否存在、参数类型和必填字段是否满足 schema、调用结果是否可解析；模型层进一步检查对话语义、函数调用与用户意图是否一致、最终回答是否忠实于工具返回。两层结合是为了同时覆盖格式错误和语义错误。

与 ToolLLM 的 DFSDT 强调为真实 API 生成可执行轨迹不同，ToolACE 更强调数据合成本身的“准确、复杂、多样”三目标。它把 API 生成、对话生成和验证都交给 agentic pipeline，并显式让目标模型能力参与数据难度控制，因此更适合持续扩展函数调用训练集。

> 💡 关键：ToolACE 的核心假设是函数调用能力受训练数据质量强约束。高质量合成数据必须同时覆盖 API schema 多样性、调用组合复杂度和可执行一致性。

#### 🧪 练习题

```yaml
question: "ToolACE 的 Dual-Layer Validation 主要用于保证什么？"
options:
  - "让所有 API 都来自同一个真实网站"
  - "同时用规则检查和模型检查过滤不可执行或语义不一致的合成数据"
  - "减少模型参数量"
  - "把多函数调用强制改写为单函数调用"
answer: 1
explain: "DLV 包含规则层与模型层，前者检查 schema 和执行约束，后者检查语义一致性与回答忠实性。"
```
