### GenericAgent: 自进化通用 Agent Harness (GenericAgent)

```yaml
id: genericagent
name: GenericAgent
full_name: 自进化通用 Agent Harness (GenericAgent)
year: '2026.04'
org: 复旦/北大/Qiji Zhifeng
paper_url: https://arxiv.org/abs/2604.17091
category: runtime
parent: claude_longrun
motivation: 以最小工具和自演化记忆控制上下文
```

#### 📝 一句话总结
GenericAgent 通过**上下文信息密度最大化**原则，系统性解决了 LLM Agent 设计中的"完备性-简洁性-自然性"三难困境，提出了包含最小化工具集、分层记忆架构、自演化机制和上下文压缩在内的四组件框架，使 Agent 能够在无需人工干预的情况下持续自我改进。

#### 🎯 核心要点
- 提出了 **Agent 设计三难困境**：完备性（Completeness）、简洁性（Conciseness）、自然性（Naturalness）三者不可兼得，传统设计只能在三者间做权衡
- 提出**上下文信息密度最大化**作为统一设计原则，以 bits/token 为度量指标
- 设计了仅包含 **9 个原子工具的极小工具集**（TaskTool, ReadTool, WriteTool, EditTool, WebSearchTool, BrowseTool, CodeTool, AskUserTool, FinishTool），通过组合实现复杂任务
- 创新性地提出 **4 层分层记忆架构**：L1（当前上下文）、L2（工作记忆/Working Memory）、L3（经验记忆/经验池）、L4（核心规则/Constitution），信息随层级上升逐步压缩精炼
- 提出 **"No Execution, No Memory"** 自演化机制：仅当 Agent 实际执行并观察到结果后，才将经验写入记忆，防止幻觉污染记忆库
- 设计了**上下文截断与压缩**策略：当上下文接近限制时，自动对历史消息进行摘要压缩，保留关键信息
- 发现了 **3 种涌现能力**：(1) 工具组合创新 (2) 自适应记忆管理 (3) 跨任务经验迁移
- 在 WebArena、GAIA、AgentBench 等多个基准上达到 SOTA，且仅需极少人工设计

#### 🔬 深入细节
##### 1. 设计三难困境与信息密度最大化

传统 LLM Agent 设计面临一个根本性的三难困境：

- **完备性（Completeness）**：提供足够多的工具和指令以覆盖所有可能场景 → 导致上下文膨胀
- **简洁性（Conciseness）**：保持系统提示和工具描述简短 → 导致功能不完备
- **自然性（Naturalness）**：使用自然语言描述而非结构化格式 → 导致模糊和歧义

三者相互冲突：追求完备性必然增加冗长，追求简洁性必然牺牲完备性，追求自然性必然降低信息密度。GenericAgent 的核心洞察是：**不应在三维空间中寻找平衡点，而应直接优化上下文信息密度**——即单位 token 包含的有效信息量（bits/token）。

> 💡 关键：信息密度最大化 = 用最少的 token 传递最多的有效信息。这成为架构设计的唯一指导原则。

![GenericAgent 工作流示意图](https://raw.githubusercontent.com/lsdefine/GenericAgent/main/assets/images/workflow.jpg)
*图：Agent设计的三难困境——完备性、简洁性、自然性三者不可兼得。GenericAgent通过信息密度最大化跳出这一困境。*

##### 2. 四组件架构总览

GenericAgent 由四个核心组件组成，每个组件都围绕信息密度最大化原则设计：

┌─────────────────────────────────────────────┐
│              GenericAgent 架构               │
├─────────────────┬───────────────────────────┤
│  原子工具集(9)   │     分层记忆(L1-L4)       │
│  TaskTool       │  L1: 当前上下文            │
│  ReadTool       │  L2: 工作记忆              │
│  WriteTool      │  L3: 经验池                │
│  EditTool       │  L4: 核心规则(Constitution)│
│  WebSearchTool  │                           │
│  BrowseTool     ├───────────────────────────┤
│  CodeTool       │  自演化机制                │
│  AskUserTool    │  "No Execution, No Memory" │
│  FinishTool     │                           │
├─────────────────┼───────────────────────────┤
│  上下文压缩       │  涌现能力                  │
│  截断+摘要       │  工具组合/记忆管理/经验迁移 │
└─────────────────┴───────────────────────────┘

##### 3. 最小化原子工具集（Minimal Atomic Tool Set）

传统 Agent 框架倾向于为每个功能创建专门工具（如单独的文件搜索、文件移动、目录列表等），导致工具描述占用大量上下文。GenericAgent 反其道而行，仅提供 9 个原子操作：

| 工具 | 功能 | 设计理念 |
|------|------|----------|
| **TaskTool** | 创建和管理子任务 | 分解复杂任务为子任务 |
| **ReadTool** | 读取文件内容（支持分页/搜索） | 统一的读取接口，替代所有"查看"类工具 |
| **WriteTool** | 创建或全量覆盖文件 | 统一的写入接口 |
| **EditTool** | 精细的局部文件修改（patch） | 替代所有"修改"类工具 |
| **WebSearchTool** | 网络搜索 | 获取外部信息 |
| **BrowseTool** | 网页浏览/内容提取 | 统一的网页交互接口 |
| **CodeTool** | 代码执行 | 计算和自动化 |
| **AskUserTool** | 向用户提问/请求决策 | 人机交互 |
| **FinishTool** | 标记任务完成并提交结果 | 任务终结 |

通过这 9 个工具的**组合**，Agent 可以实现任意复杂操作（如：先 ReadTool 定位 → EditTool 修改 → WriteTool 保存，模拟"文件重命名"）。工具描述极简，每个仅 1-2 行，极大提升了系统提示的信息密度。

##### 4. 四层分层记忆架构

传统 Agent 将所有信息都放在单一上下文中，导致关键信息被稀释。GenericAgent 设计了从"原始"到"精炼"的四层记忆：

L4: 核心规则 (Constitution)        ← 极简，~200 tokens，不可变核心原则
    ↑ 提炼
L3: 经验池 (Experience Pool)       ← 经过验证的任务经验，RAG检索
    ↑ "No Execution, No Memory"过滤
L2: 工作记忆 (Working Memory)      ← 当前会话关键信息，人工+自动维护
    ↑ 上下文压缩/截断
L1: 当前上下文 (Current Context)    ← 完整对话历史，受token限制

- **L1（当前上下文）**：包含完整的对话历史、工具调用和结果。当接近 token 限制时触发压缩。
- **L2（工作记忆/Working Memory）**：从 L1 中提取的关键信息快照，通过 `update_working_checkpoint` 工具主动维护。相当于人类的"便签本"，防止长时间任务中信息丢失。
- **L3（经验池/Experience Pool）**：跨会话的经过验证的经验和教训，通过 RAG 机制检索。遵循 **"No Execution, No Memory"** 原则——仅当 Agent 实际执行并观察到结果后，才将经验写入，有效防止"纸上谈兵"类错误记忆。
- **L4（核心规则/Constitution）**：Agent 不可违背的根本原则，固定不变。类似机器人三定律，由开发者预设。

> ⚠️ 注意：记忆向上层迁移时，信息被逐级**压缩精炼**，遵循信息密度最大化原则。原始对话 → 关键摘要 → 经验规则 → 核心原则。

##### 5. "No Execution, No Memory" 自演化机制

这是 GenericAgent 最核心的创新之一。传统方法允许 Agent 在推理阶段就生成"记忆"或"经验"，但这些未经实际验证的记忆往往是**幻觉**。

GenericAgent 的铁律：
- 任何经验在写入 L3 经验池之前，必须经过**实际的工具执行**和**结果观察**
- 纯语言模型推理产出的"建议"不能直接成为记忆
- 只有被实际验证有效的操作序列才能被提炼为经验

这类似于科学方法：假设必须经过实验验证才能成为理论。该机制大幅减少了记忆污染，确保经验池中的每一条记录都有实证支撑。

##### 6. 上下文截断与压缩

当 L1 上下文接近模型 token 限制时，GenericAgent 自动触发压缩：

1. **截断**：保留最近的 K 轮交互（K 为可配置参数）
2. **摘要压缩**：对截断部分的历史消息，使用 LLM 生成结构化摘要
3. **摘要格式**：`[历史摘要]` 标签包裹，包含任务目标、已完成步骤、关键发现、待处理事项
4. **信息密度提升**：原始历史可能消耗 10K+ tokens，摘要压缩至 200-500 tokens，信息密度提升 20-50 倍

> 💡 关键：压缩不是简单丢弃信息，而是**蒸馏**——提取对当前任务仍有价值的部分，丢弃已完成的中间细节。

```python
# 上下文压缩伪代码
def compress_context(messages, max_tokens):
    if token_count(messages) <= max_tokens:
        return messages
    
    # 保留最近 N 轮
    recent = messages[-N:]
    old = messages[:-N]
    
    # 生成摘要
    summary = llm.summarize(old, focus=[
        "current_task_goal",
        "completed_steps", 
        "key_findings",
        "pending_items"
    ])
    
    # 拼接返回
    return [{"role": "system", "content": f"[历史摘要] {summary}"}] + recent
```

##### 7. 三种涌现能力

实验发现 GenericAgent 展现出三种未在系统中显式编程的能力：

**① 工具组合创新**：Agent 自发发现并利用工具组合实现新功能。例如，组合 ReadTool + EditTool + WriteTool 实现"文件重命名"（该系统无 rename 工具），甚至组合 WebSearchTool + CodeTool 实现数据分析自动化。

**② 自适应记忆管理**：Agent 学会根据任务复杂度动态调整记忆写入策略。简单任务自动减少 L2 更新频率，复杂任务则频繁保存 checkpoint，展现出类似人类的"元认知"能力。

**③ 跨任务经验迁移**：在一个任务中学到的经验（如"处理大文件时应先用 ReadTool 分页查看而非全量读取"）能自动迁移到其他任务中，通过 L3 经验池的 RAG 检索实现。

##### 8. 与现有方法的对比

| 维度 | ReAct | AutoGPT | Reflexion | **GenericAgent** |
|------|-------|---------|-----------|------------------|
| 工具数量 | 3-5（任务相关） | 10-20（通用） | 3-5 | **9（最小原子集）** |
| 记忆机制 | 无 | 文件存储 | 经验反思 | **4层分层记忆** |
| 自演化 | ✗ | ✗ | 部分（反思） | **No Execution, No Memory** |
| 上下文管理 | 截断 | 截断 | 截断 | **截断+摘要压缩** |
| 信息密度优化 | ✗ | ✗ | ✗ | **核心设计原则** |

#### 🧪 练习题
```yaml
question: "GenericAgent 的 'No Execution, No Memory' 机制解决的核心问题是什么？"
options:
  - "减少记忆存储的磁盘占用"
  - "防止 Agent 将未经实际验证的推理产物作为经验写入记忆库，避免幻觉污染"
  - "加快工具调用的执行速度"
  - "限制 Agent 每天可执行的任务数量"
answer: 1
explain: "'No Execution, No Memory' 要求任何经验在写入 L3 经验池前必须经过实际的工具执行和结果观察验证，纯推理产物不能成为记忆，从而有效防止幻觉污染记忆库。"
```
