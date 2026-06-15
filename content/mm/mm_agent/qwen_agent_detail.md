### Qwen-Agent

```yaml
id: qwen_agent
name: Qwen-Agent
full_name: "通义千问智能体 (Qwen-Agent)"
year: "2024"
org: "Alibaba"
paper_url: "https://qwen.ai/blog/qwen3.5"
category: "framework"
parent: "llava_plus"
motivation: "原生多模态能力与百万级Token长上下文"
```

#### 📝 一句话总结

Qwen-Agent 以 Qwen3.5 的原生多模态、长上下文和内置工具调用能力为核心，提供面向搜索、代码解释器、函数调用和多模态任务的智能体范式。它解决了传统外接工具 Agent 在上下文长度、多模态理解和工具使用自适应方面割裂的问题。

#### 🎯 核心要点

- Qwen3.5-397B-A17B 是原生视觉语言模型，面向 reasoning、coding、agent capability 与 multimodal understanding
- 使用 hybrid architecture：Gated Delta Networks 线性注意力 + sparse Mixture-of-Experts
- 总参数约 397B，每次前向激活约 17B 参数，强调推理效率和成本控制
- Qwen3.5-Plus 托管版本默认支持 1M token 上下文窗口
- 官方托管能力包含 built-in tools 与 adaptive tool use，可用于 Web Search、Code Interpreter 等 Agent 功能
- ModelStudio API 通过 `enable_thinking`、`enable_search` 等参数显式控制推理模式和搜索/代码工具
- 支持 201 种语言和方言，适合跨语言、跨模态、长上下文 Agent 场景

#### 🔬 深入细节

##### 框架总览

![Qwen 官方标识图](https://img.alicdn.com/imgextra/i1/O1CN013ltlI61OTOnTStXfj_!!6000000001706-55-tps-330-327.svg)
*图：Qwen 官方页面标识图。该条目的主要来源是 Qwen3.5 官方博客而非传统论文 PDF，方法核心是原生多模态模型 + 长上下文 + 内置工具调用。*

##### 算法流程

```python
# Qwen-Agent / Qwen3.5-Plus 工具增强推理伪代码
messages = [{"role": "user", "content": user_request}]

response_stream = qwen_client.chat.completions.create(
    model="qwen3.5-plus",
    messages=messages,
    extra_body={
        "enable_thinking": True,   # 开启推理模式
        "enable_search": True,     # 开启搜索与 Code Interpreter 等工具能力
    },
    stream=True,
)

for event in response_stream:
    if event.type == "tool_call":
        tool_result = execute_builtin_tool(event.tool_name, event.arguments)
        messages.append({"role": "tool", "content": tool_result})
    else:
        yield event.delta
```

##### 方法细节

Qwen-Agent 在这份任务清单中对应的是 Qwen3.5 官方博客所描述的原生多模态 Agent 能力，而不是一篇独立的 arXiv 算法论文。它的重点不在于搭建一个像 MM-ReAct 那样由外部专家拼接的 prompt 系统，而是把多模态理解、长上下文和工具调用能力统一放在 Qwen 模型与托管服务接口中。

Qwen3.5-397B-A17B 的底层设计使用稀疏 MoE：总参数规模约 397B，但每次前向只激活约 17B 参数。这样做的直觉是把大模型知识容量和推理成本解耦：模型可以拥有接近 400B 级别的知识与能力上限，但在线服务时只计算一小部分专家，降低延迟和成本。

其注意力结构还引入 Gated Delta Networks 形式的线性注意力，与 sparse MoE 结合形成 hybrid architecture。对于 Agent 系统，这一点很关键，因为 Agent 往往需要处理很长的任务历史、网页内容、检索结果、代码执行日志和多轮工具返回。长上下文能力不足时，系统只能靠摘要或外部记忆硬切上下文，容易丢失任务约束。

Qwen3.5-Plus 的托管版本默认提供 1M token context window，并带有官方内置工具与 adaptive tool use。可以把它抽象成一个策略：

$$
y_t = \pi_\theta(x_{\leq t}, m_{\leq t}, o_{\leq t}, \mathcal{T})
$$

其中 \(x\) 是用户输入，\(m\) 是多模态内容，\(o\) 是历史工具观察，\(\mathcal{T}\) 是可调用工具集合。模型在每步可以选择直接回答，也可以发起工具调用，再根据工具 observation 继续推理。

API 层的 `enable_thinking` 和 `enable_search` 是面向 Agent 的显式控制开关。`enable_thinking` 激活更强的推理流程，适合规划、复杂数学、代码或多跳任务；`enable_search` 允许模型使用搜索和 Code Interpreter 等工具能力。与早期工具 Agent 相比，开发者不需要自己维护复杂的正则解析协议或工具 prompt，只需通过官方接口暴露工具能力。

与 LLaVA-Plus 的外部 skill repository 相比，Qwen-Agent 的方向更偏“模型原生 + 平台内置”。LLaVA-Plus 训练开源 LMM 学会使用若干视觉工具；Qwen3.5 则把多模态能力、长上下文、搜索、代码解释器和函数调用整合到一个统一模型/服务生态中。它的优势是上下文与工具调用更紧密，缺点是部分托管能力依赖平台实现，论文级细节不如开源算法充分。

> ⚠️ 注意：任务清单中的 `paper_url` 是 Qwen 官方博客入口，实际可访问页面通常以 `https://qwen.ai/blog?id=qwen3.5` 或 Alibaba Cloud 同步博客呈现。这里保持 YAML 元信息不变，只在解读中按官方博客内容说明。

#### 🧪 练习题

```yaml
question: "Qwen3.5-Plus 中 1M token 上下文和内置工具能力对 Agent 的主要价值是什么？"
options:
  - "让 Agent 只能处理单轮短文本问答"
  - "减少对外部工具的需求，并让模型在长任务历史、检索结果和工具观察中持续推理"
  - "强制所有工具调用都通过正则表达式解析"
  - "将视觉输入转换为不可读的随机 token"
answer: 1
explain: "长上下文可容纳任务历史和工具返回，内置工具与 adaptive tool use 则让模型在搜索、代码执行和回答之间自适应切换。"
```
