### ToolSandbox: 有状态工具沙箱评测 (ToolSandbox)

```yaml
id: toolsandbox
name: ToolSandbox
full_name: 有状态工具沙箱评测 (ToolSandbox)
year: '2024.08'
org: Apple
paper_url: https://arxiv.org/abs/2408.04682
category: evaluation
parent: api_bank
motivation: 评测多轮有状态工具执行能力
```

#### 📝 一句话总结
> ToolSandbox 提出了首个**有状态（Stateful）、对话式（Conversational）、交互式（Interactive）**的LLM工具使用评估基准，通过隐式状态依赖（State Dependency）、规范化（Canonicalization）和不足信息（Insufficient Information）三类核心挑战，揭示了当前最强LLM在复杂工具调用场景中的显著缺陷。

#### 🎯 核心要点
- **三维评估框架**：Stateful（有状态工具执行与隐式状态依赖）、Conversational（内置LLM用户模拟器支持on-policy对话）、Interactive（动态里程碑评估任意轨迹的中间和最终结果）
- **三大核心挑战类别**：State Dependency（工具间隐式依赖世界状态）、Canonicalization（将用户模糊输入规范化为工具参数）、Insufficient Information（工具不足以完成任务时识别并拒绝）
- **消息总线架构**：User、Agent、Execution Environment 三个角色通过 Message Bus 通信，每个角色只能访问其可见的消息子视图
- **用户模拟器增强**：引入 Knowledge Boundary（知识边界）和 Demonstration（少样本示例对话）两个组件，将幻觉率从12.4%降至6.97%
- **Murphy's Law 竞争条件处理**：执行环境检测并发工具调用中的竞争条件时，始终让竞争条件发生以惩罚不当的并行调用
- **34 个工具组合的评估矩阵**：覆盖单工具调用/多工具调用、单轮/多轮用户交互的交叉场景
- **对 10+ 主流模型全面评估**：开源与闭源模型存在显著性能差距，GPT-4o 综合得分最高，但在 State Dependency 上大模型反而不如中型模型

#### 🔬 深入细节
##### 核心架构：三角色消息总线

![ToolSandbox 架构图](https://arxiv.org/html/2408.04682v1/extracted/5780527/architecture_diagram.png)
*图：User、Agent 和 Execution Environment 之间的交互架构。三个角色共享同一个 Message Bus，但各自只能访问有权限的消息子视图。*

ToolSandbox 的核心是一个**有状态、对话式、交互式**的三方消息总线系统。三个角色分别是：

1. **User Role（用户角色）**：由 GPT-4o 驱动的模拟用户，拥有单一工具 `end_conversation` 用于终止对话。用户模拟器包含三个关键设计：
   - **Knowledge Boundary**：告知模拟器它应该和不应该知道什么信息，提供对预期结果的部分访问，以对抗幻觉
   - **Demonstration**：提供少样本示例对话（仅对用户模拟器可见，不对Agent可见）
   - 消融实验（Table 2）表明，两者结合将幻觉率从 12.4% 降至 6.97%，指令遵循错误率从 6.20% 降至 0.77%

2. **Agent Role（代理角色）**：接收用户自然语言消息，可选择追问用户或发出工具调用（JSON 对象）。JSON 对象被转换为可执行 Python 代码（见 Appendix A.5），发送到执行环境。

3. **Execution Environment Role（执行环境角色）**：类似 IPython/Jupyter 交互式控制台，执行 Python 代码片段。关键机制：
   - 通过 stderr 捕获异常，使 Agent 能够通过试错（trial and error）细化工具调用
   - **Murphy's Law 竞争条件处理**：对于并行工具调用，如果检测到依赖关系，执行环境**始终**让竞争条件发生，以此惩罚不恰当的并行调用

![消息总线](https://arxiv.org/html/2408.04682v1/extracted/5780527/message_bus.png)
*图：消息总线中不同角色的消息可见性示意。Execution Environment 可以看到所有消息，Agent 和 User 各有其可见子集。*

##### 三大核心挑战类别

ToolSandbox 定义了三种评估任务类别，旨在测试工具使用 LLM 的不同能力维度：

**1. State Dependency（状态依赖）**

这是 ToolSandbox 最核心的创新之一。在现实世界的任务导向对话中，工具调用常常**隐式依赖世界状态（World State）**。例如：
- 关闭 Wi-Fi 后才能测试离线模式功能
- 开启蜂窝数据后才能发送短信
- 多个工具操作同一个数据库，后一个操作依赖前一个操作的结果

传统基准（BFCL、ToolEval）使用无状态 RESTful API，无法评估这种依赖关系。API-Bank 虽然有状态修改工具，但没有研究状态依赖的影响。

关键发现：**GPT-4 和 Claude-3-Opus 等大模型在 State Dependency 上反而表现不如中型模型**（GPT-3.5-Turbo、Claude-3-Sonnet），这是因为大模型倾向于对有依赖关系的工具也发出并行调用，而执行环境始终让竞争条件发生。

> ⚠️ **注意**：嵌套状态依赖尤其棘手。模型常常忘记未解决的问题，无法最优回溯（backtrack），导致重复错误和远超最优的轮次数。

**2. Canonicalization（规范化）**

将用户的模糊、自然语言输入转换为工具的精确参数是一个关键挑战。例如：
- "下周五下午" → 精确的时间戳
- "附近的咖啡店" → 具体的经纬度坐标
- "给张三发个消息" → 张三的电话号码

ToolSandbox 区分了两种规范化方式：
- **基于世界知识的规范化**：利用模型内部知识（如著名地标的经纬度）
- **基于工具的规范化**：通过调用搜索等工具获取规范化的参数

关键发现：**所有模型在 Canonicalization 上都很挣扎**。大模型倾向于记忆不太可能改变的世界知识（如地标的经纬度），小模型更倾向于使用工具。**时间相关的参数尤其困难**——模型频繁产生时间戳幻觉，错误地规范化相对日期和时间（Figure 14、15）。

此外，模型在面临歧义时倾向于做出**过早决策**。如 Figure 16 所示，当工具返回多个匹配的地理位置时，模型直接选择第一个，而没有返回用户进行消歧。

**3. Insufficient Information（不足信息）**

这是另一个关键创新：**评估模型在工具不足以完成任务时，是否能识别并拒绝执行，而非产生幻觉**。

![GPT-4 幻觉示例](https://arxiv.org/html/2408.04682v1/extracted/5780527/minefield.png)
*图：GPT-4 在 Insufficient Information 场景下的错误轨迹。即使工具明显不足以完成任务，模型仍然产生幻觉工具名称或参数。*

关键发现：**Insufficient Information 性能与其他类别负相关**——在其他复杂任务上表现越强的模型，在 Insufficient Information 上表现越差。GPT-3.5-Turbo 和 GPT-4 等顶级模型，即使面对简单任务和极少的工具，也会产生工具名称幻觉或参数幻觉（Figure 3、20）。

##### 里程碑评估系统

![里程碑示例](https://arxiv.org/html/2408.04682v1/extracted/5780527/intermediate_milestone.png)
*图：中间里程碑和最终里程碑的评估示例。每个里程碑有独立的判断条件，允许评估任意轨迹的部分完成度。*

ToolSandbox 的评估系统支持**动态评估任意轨迹的中间和最终里程碑**，而不依赖预定义的轨迹或静态的轮次级别指标。这一设计的优势在于：
- 支持 on-policy 对话评估（而非 off-policy 的预定义轨迹）
- 可以评估部分完成的情况
- 通过相似度得分（Similarity Score）综合衡量轨迹质量

![评估轨迹示例](https://arxiv.org/html/2408.04682v1/extracted/5780527/introduction_300_dot.png)
*图：一个完整的评估轨迹示例，展示了 Message Bus 中的完整对话历史、World State 的可变数据库快照以及各个 Milestones 的判断时机。*

##### 实验结果与关键洞察

**开源 vs 闭源模型**：
- GPT-4o 获得最高相似度得分，Claude-3-Opus 紧随其后
- GPT-4o 在综合得分上领先，但 Claude-3-Opus 在效率上更优（平均轮次数更低，见 Appendix D.2）
- 开源模型与闭源模型之间存在显著性能差距

**模型规模的影响**：
- 对比 GPT、Claude 和 Gemini 家族的最大和最小模型，Multiple Tool Call 和 Multiple User Turn 类别的性能退化远快于 Single Tool Call 和 Single User Turn
- 推理复杂的工具调用序列和模糊的用户请求需要更多的模型容量

**工具干扰**：
- 增加干扰工具（distraction tools）对 Claude-3-Sonnet 影响最大（下降近 10 个百分点）
- GPT-4o 对工具描述扰乱（Tool Description Scrambling）特别敏感
- GPT-4 对参数描述变化（Argument Description）异常关注
- Gemini-1.5 在参数类型扰乱（Argument Type Scrambling）上表现不佳

##### 与传统方法的区别

| 特征 | BFCL | ToolEval | API-Bank | **ToolSandbox** |
|------|------|----------|----------|----------------|
| 有状态工具 | ✗ | ✗ | 部分 | **✓** |
| 隐式状态依赖 | ✗ | ✗ | ✗ | **✓** |
| 对话式评估 | ✗（单轮） | ✗（单轮） | Off-policy | **On-policy** |
| 用户模拟器 | ✗ | ✗ | ✗ | **✓（含Knowledge Boundary+Demonstration）** |
| 竞争条件处理 | N/A | N/A | N/A | **Murphy's Law** |
| 评估粒度 | 轮次级 | LLM判决 | 轨迹级 | **里程碑级** |
| 不足信息检测 | ✗ | ✗ | ✗ | **✓** |

```python
tools = retrieve_tools(query)
action = planner.select(query, tools)
obs = execute(action)
return synthesize_answer(query, obs)
```

#### 🧪 练习题
```yaml
question: "ToolSandbox 中 Execution Environment 处理并行工具调用的竞争条件时采用什么策略？"
options:
  - "随机决定竞争条件的发生顺序"
  - "遵循 Murphy's Law，始终让竞争条件发生"
  - "自动将并行调用序列化为顺序执行"
  - "忽略竞争条件，仅评估最终结果"
answer: 1
explain: "执行环境遵循 Murphy's Law，当检测到依赖工具被并发调用时始终让竞争条件发生，以此惩罚 Agent 不恰当的并行调用行为。这种设计迫使模型学会正确识别工具间的依赖关系。"
```
