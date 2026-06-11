### ACEBench: 工具使用综合评测 (ACEBench)

```yaml
id: acebench
name: ACEBench
full_name: 工具使用综合评测 (ACEBench)
year: '2025.01'
org: USTC/Huawei/SJTU
paper_url: https://arxiv.org/abs/2501.12851
category: evaluation
parent: toolsandbox
motivation: 以Normal/Special/Agent三类场景细分工具评测
```

#### 📝 一句话总结
ACEBench 提出了一套覆盖 **Normal / Special / Agent** 三类场景的细粒度工具使用基准，用统一而低开销的自动化评测流程同时考察基础工具调用、含歧义或不完整指令，以及真实多轮代理交互。

#### 🎯 核心要点
- 把评测数据分成 **Normal、Special、Agent** 三类，而不是只看单一成功率。
- 覆盖 **8 个大域、68 个子域、4,538 个中英双语 API**，数据规模明显大于很多早期工具基准。
- 数据集包含约 **2,000** 条高质量测试样本，其中 Agent 类专门用于模拟真实多轮对话和环境交互。
- 设计了 **自动化且不依赖真实 API 执行** 的评估框架，降低了成本并提升了复现实验稳定性。
- 相比只测单轮调用的基准，ACEBench 更强调 **歧义指令、缺失信息、交互式代理行为** 的区分诊断。

#### 🔬 深入细节
![ACEBench 数据构成图](https://raw.githubusercontent.com/chenchen0103/ACEBench/main/fig/data_composition.png)

*图：ACEBench 的数据构成。基准把样本拆成 Normal、Special、Agent 三大类，而不是把所有工具调用场景混成一个总分。*

##### 动机：为什么现有工具基准还不够

ACEBench 论文对旧基准的批评很明确，主要有三点：

- **场景不够真实**：很多基准只有单轮工具调用，缺少真实多轮对话。
- **维度不够细**：往往只有“对/错”或端到端成功率，难以看出模型具体栽在哪类场景。
- **评估成本高**：有些方案依赖真实 API 执行或 LLM 评委，难以大规模、稳定复现。

所以 ACEBench 的设计目标不是再做一个更大的“工具调用题库”，而是把工具使用拆成几类本质不同的问题，并尽量用统一自动流程做评测。

##### 三类数据：Normal / Special / Agent

ACEBench 的核心不是错误标签，而是 **评测场景类型**：

**1. Normal**

最基础的工具使用场景，重点看模型能否：

- 选对工具；
- 填对参数；
- 生成正确格式的调用。

这类样本类似“标准函数调用题”，主要衡量基础 tool use 能力。

**2. Special**

这一类专门测试现实里常见但更麻烦的情况：

- 用户指令含糊；
- 信息不完整；
- 需要补问或澄清；
- 可能根本无法完成。

这也是当前很多模型的薄弱环节，因为它们经常在信息不足时“猜一个调用”，而不是停下来澄清。

**3. Agent**

Agent 类是 ACEBench 最重要的扩展。它不再只看单步调用，而是构造 **多轮用户-环境-代理交互**，考察：

- 工具调用链是否合理；
- 中间状态是否被正确利用；
- 多轮交互里是否能持续保持目标；
- 在环境反馈变化时是否会修正策略。

这部分是 ACEBench 区分于很多旧工具基准的核心价值。

##### 数据构建与验证

ACEBench 覆盖技术、金融、娱乐、社会、健康、文化、环境等多个领域，共 **8 大域、68 子域、4,538 个 API**。论文还强调：

- 数据是 **中英双语** 的；
- Special 与 Agent 数据不是简单模板拼接，而是专门设计含歧义与交互性的样本；
- 构建流程包含自动化质量检查、模型辅助验证和人工审核，避免工具描述或标注本身出错。

从工程视角看，这意味着 ACEBench 不是只追求“大”，而是把数据质量和评测分层一起做了。

##### 评测框架：按类型分别打分

ACEBench 的评估思路可以简化成：

```python
def evaluate(sample, model_output):
    if sample.type == "normal":
        return eval_normal_tool_call(sample, model_output)
    if sample.type == "special":
        return eval_ambiguous_or_incomplete_case(sample, model_output)
    if sample.type == "agent":
        return eval_multi_turn_agent_trace(sample, model_output)
```

这背后的思想很重要：**同一个模型在三类场景里失败原因完全不同**。

- 在 Normal 上失败，通常说明基础函数调用能力不足；
- 在 Special 上失败，往往说明缺乏澄清、拒答或处理不完整约束的能力；
- 在 Agent 上失败，则更接近规划、记忆和交互式执行问题。

因此，ACEBench 的总分有意义，但更重要的是 **分类型诊断**。

##### 与旧基准的区别

和 API-Bank、ToolLLM、StableToolBench、ToolSandbox 这类基准相比，ACEBench 的定位更偏“综合诊断”：

- 它不像 BFCL 那样主要聚焦函数调用结构；
- 也不像 ToolSandbox 那样主打 stateful 环境与世界状态依赖；
- 它更像把 **基础调用、复杂边界条件、真实代理交互** 拉到同一个评测体系下。

论文声称，ACEBench 是少数能同时覆盖：

- 多轮对话
- 细粒度工具评测
- 复杂边界条件
- 自动化可复现流程

的综合型基准。

##### 为什么这篇工作重要

ACEBench 的真正价值，在于它把“工具使用失败”拆成了更可操作的工程问题：

- 如果 Normal 差，先补 schema、参数与格式遵循；
- 如果 Special 差，补澄清、拒答、信息不足判断；
- 如果 Agent 差，补规划、记忆和多轮交互。

这种拆法，比只看一个 Overall Accuracy 更接近真实部署诊断。

> ⚠️ 注意：ACEBench 仍然是 benchmark，不是训练方法。它能更好地暴露问题，但不会自动解决模型的 tool use 缺陷。

#### 🧪 练习题
```yaml
question: "ACEBench 中哪一类数据最直接用于测试含歧义或信息不完整的工具使用场景？"
options:
  - "Normal"
  - "Special"
  - "Agent"
  - "Overall"
answer: 1
explain: "Special 类专门针对 ambiguous or incomplete instructions，测试模型是否会澄清、拒绝或在缺信息时避免盲目调用工具。"
```
