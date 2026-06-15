### 工具大模型 (ToolLLM)

```yaml
id: toolllm
name: ToolLLM
full_name: 工具大模型 (ToolLLM)
year: '2024'
org: 清华大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/28e50ee5b72e90b50e7196fde8ea260e-Abstract-Conference.html
category: tool_use
parent: gorilla
motivation: DFSDT推理策略支持万级API泛化
```

#### 📝 一句话总结

ToolLLM 提出从 16,464 个真实 REST API 自动构造 ToolBench，并用 DFSDT 搜索生成高质量工具调用轨迹，训练出能泛化到未见 API 的 ToolLLaMA。

#### 🎯 核心要点

- **ToolBench 数据集**：从 RapidAPI 收集 16,464 个真实 REST API，覆盖 49 个类别
- **三阶段数据构建**：API collection、instruction generation、solution path annotation
- **多场景指令**：覆盖单工具、同类别多工具、跨集合多工具等复杂工具使用场景
- **DFSDT 推理策略**：Depth-First Search-based Decision Tree 允许模型回溯、放弃坏分支并扩展新路径
- **ToolLLaMA**：在 LLaMA-2 7B 上微调，并把上下文长度扩展到 8192 以容纳 API 响应
- **神经 API 检索器**：用指令和 API 文档的表示相似度召回相关 API，降低万级 API 池检索成本
- **ToolEval 自动评测**：用 Pass Rate 和 Win Rate 衡量可执行性与回答质量，并与人工评测保持较高一致性

#### 🔬 深入细节

##### 核心示意图

![ToolLLM 框架图](https://ar5iv.labs.arxiv.org/html/2307.16789/assets/x1.png)
*图：ToolLLM/ToolBench 的构建、训练和评测流程。API 文档经指令生成与 DFSDT 标注形成训练轨迹，ToolLLaMA 在推理时由 API 检索器提供候选工具。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# ToolLLM 中 DFSDT 标注与 ToolLLaMA 推理伪代码
def dfsdt_annotate(instruction, api_docs, max_depth, max_branch):
    root = Node(history=[], status="open")
    stack = [root]
    while stack:
        node = stack.pop()
        if node.depth >= max_depth:
            continue

        children = chatgpt_expand_distinct_actions(
            instruction=instruction,
            api_docs=api_docs,
            history=node.history,
            num=max_branch
        )
        for action in children:
            if action.name == "Finish with Final Answer" and is_valid(action):
                return node.history + [action]
            if action.name == "Finish by Giving Up":
                continue
            response = execute_api(action.api_name, action.parameters)
            stack.append(Node(history=node.history + [(action, response)]))
    return None

def toolllama_infer(query, api_index):
    candidate_apis = retrieve_top_k(api_index, query)
    history = []
    while not finished(history):
        thought, api_name, params = toolllama.generate_action(query, candidate_apis, history)
        observation = execute_api(api_name, params)
        history.append((thought, api_name, params, observation))
    return toolllama.generate_final_answer(query, history)
```

##### 方法解读

ToolLLM 解决的是开放源 LLM 的工具使用数据不足问题。普通指令微调数据主要训练聊天、问答和写作，缺少“读 API 文档、选择 API、构造参数、解析返回值、继续多轮调用”的轨迹。ToolLLM 选择从 RapidAPI 的真实 REST API 出发，把 API 文档本身作为工具学习的基础。

数据构建分三步。第一步爬取并过滤 API 文档，保留名称、描述、HTTP 方法、必填/可选参数、请求体、代码片段和示例返回。第二步用 ChatGPT 根据 API 生成自然语言指令，覆盖单工具和多工具组合。第三步为每条指令标注可执行解决路径，也就是一串 Thought、API Name、Parameters、Response，最终形成监督微调样本。

DFSDT 是论文最关键的标注策略。普通 ReAct 只有一条线性轨迹，某一步参数错了就容易进入错误循环；DFSDT 把候选工具调用看成决策树节点，用深度优先搜索优先追踪一条可能成功的路径，同时允许模型调用 “Finish by Giving Up” 放弃坏分支。形式上可把轨迹写为 \(\tau=\{(a_t,r_t)\}_{t=1}^{T}\)，每次扩展根据 \(p(a_t \mid \tau_{<t}, x, \mathcal{A})\) 生成多个候选动作。

ToolLLaMA 的训练目标是让模型在给定用户指令、候选 API 文档和历史观察时预测下一步动作。相比 Gorilla 更偏向生成单个 API 调用，ToolLLM 更强调多步工具交互和大 API 池泛化。推理阶段通过神经检索器先取回少量相关 API，再由模型多轮决策，避免把 16k API 全部塞进上下文。

ToolEval 解决评测难题：真实 API 经常变化，且一个任务可能存在多条合法调用路径。论文因此使用 ChatGPT 评估 Pass Rate 和 Win Rate，并用多次评估提高稳定性。Pass Rate 衡量是否在预算内完成任务，Win Rate 衡量两条解决轨迹哪条更有用。

> 💡 关键：ToolLLM 的核心不是“让模型记住 16k API”，而是让模型学会阅读 API 文档、检索候选工具，并在可回溯搜索生成的轨迹上学习多步工具使用模式。

#### 🧪 练习题

```yaml
question: "ToolLLM 中 DFSDT 相比普通 ReAct 的主要优势是什么？"
options:
  - "把 API 文档压缩成更短的 prompt"
  - "在多条候选工具调用路径上搜索，允许放弃错误分支并回溯"
  - "完全取消 API 执行，只预测最终答案"
  - "只适用于单工具调用任务"
answer: 1
explain: "DFSDT 把工具调用轨迹组织为决策树，通过深度优先扩展和放弃坏节点来提高复杂指令的可标注性和成功率。"
```
