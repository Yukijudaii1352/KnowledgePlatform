### MemGPT: 记忆分页代理 (MemGPT)

```yaml
id: memgpt
name: MemGPT
full_name: 记忆分页代理 (MemGPT)
year: '2023.10'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2310.08560
category: management
parent: memorybank
motivation: 以虚拟上下文分页突破窗口限制
```

#### 📝 一句话总结
MemGPT 通过为固定上下文窗口的 LLM 引入操作系统的层次化记忆管理范式，使其能够自主调用函数在主上下文（main context）和外部存储（archival & recall memory）之间交换数据,突破了有限上下文窗口对多轮对话和长文档处理的限制。

#### 🎯 核心要点
- 受操作系统虚拟内存管理启发，将 LLM 的上下文窗口视为"物理内存"，外部存储视为"虚拟内存"，通过函数调用实现数据分页与交换
- 两级外部记忆存储：Archival Memory（存储完整文档，支持语义搜索）和 Recall Memory（存储对话历史，FIFO 队列）
- LLM 的生成输出被解析为函数调用（function calling mechanism），自主触发记忆读写操作
- 事件驱动的自主记忆管理：LLM 在每次生成时自行判断是否需要检索/写入外部记忆
- 主上下文中保存系统指令、工作上下文和 FIFO 队列，通过 yield 机制控制 token 预算
- 无需微调即可将任意固定上下文 LLM 转化为"无限长上下文"智能体
- 在深度记忆检索（DMR）和对话导语生成任务上显著优于固定上下文基线

#### 🔬 深入细节
![MemGPT 核心架构图](https://ar5iv.labs.arxiv.org/html/2310.08560/assets/x3.png)
*图：MemGPT 架构总览。固定上下文的 LLM 处理器被层次化记忆系统和自主记忆管理函数所增强。LLM 的 prompt tokens（主上下文）由系统指令、工作上下文和 FIFO 队列组成，LLM 的生成 tokens 被函数执行器解析为函数调用，从而在主上下文和外部上下文（Archival & Recall 存储）之间移动数据。*

##### 动机与背景

现有 LLM 受限于固定的上下文窗口大小（如 GPT-4 的 8192 tokens），在处理长文档分析、深层多轮对话等场景时，一旦上下文溢出就会发生灾难性遗忘。传统的应对方式如增加上下文窗口（计算开销大）、滑动窗口（丢失早期信息）或压缩摘要（丢失细节）都无法从根本上解决问题。MemGPT 受到操作系统中**虚拟内存（virtual memory）**的启发——物理内存（上下文窗口）虽然有限，但通过分页机制可以将不活跃的数据换出到磁盘，需要时再换入。类比到 LLM 中：**将主上下文视为"物理内存"，外部数据库视为"虚拟内存/磁盘"**，由 LLM 自己通过函数调用来决定何时执行"换入换出"。

##### 核心机制：层次化记忆系统

MemGPT 的记忆架构分为三层：

**1. 主上下文（Main Context）**
这是 LLM 实际接收的 prompt tokens，包含三部分：
- **System Instructions**（系统指令）：静态指令，告诉 LLM 它的角色、可用的函数及其用法
- **Working Context**（工作上下文）：可变空间，用于存储本次交互任务相关的信息
- **FIFO Queue**（先进先出队列）：存储最近的对话历史，按时间排列

主上下文的总 token 预算固定，系统指令占据固定开销，剩余空间由 Working Context 和 FIFO Queue 共享。当两者之和超出预算时，MemGPT 自动将 FIFO Queue 头部的旧消息换出到 Recall Memory，或将 Working Context 中的富余数据换出到 Archival Memory。

**2. Archival Memory（档案记忆）**
存储完整的外部文档（论文、文章等），支持语义搜索。实现层面采用向量数据库（如 FAISS），通过 `archival_memory_search(query, page)` 函数按语义相关性检索所需内容，并分页返回（每页固定 token 数）。LLM 可以在任何时候调用此函数"翻阅"长文档，就像操作系统的页表查找一样。

**3. Recall Memory（回忆记忆）**
存储换出的历史对话消息，FIFO 顺序排列。通过 `recall_memory_search(query, page)` 和 `recall_memory_date_search(start, end, page)` 函数，LLM 可以按关键词或时间窗口回溯早期的对话内容，实现跨越上下文的"记忆回溯"。

##### 自主记忆管理函数

MemGPT 的核心创新在于：**LLM 不是被动接受外部系统分配的记忆，而是主动通过函数调用来管理自己的记忆。** 每次推理时，LLM 可以生成文本回复，也可以生成一个函数调用（如 `send_message("...")` 或 `archival_memory_search("...", 1)`）。函数执行器在解析到函数调用后，执行对应的数据库操作（插入/搜索/分页），并将结果注入到主上下文中，然后触发下一次 LLM 推理。

关键函数包括：

send_message(message)           → 向用户发送消息，同时写入 Recall Memory
archival_memory_insert(content) → 将内容存入 Archival Memory
archival_memory_search(query, page) → 从 Archival Memory 检索文档
recall_memory_search(query, page)   → 从 Recall Memory 检索历史
recall_memory_date_search(start, end, page) → 按时间检索历史
conversation_search(query, page)    → 搜索当前对话（FIFO Queue）
core_memory_append / replace       → 修改系统指令或工作上下文

> 💡 关键：LLM 可以在单轮推理中链式调用多个函数。系统指令中指定了一个特殊关键字参数（如 `request_heartbeat`），当 LLM 需要连续执行操作时，可以在函数调用中设置此参数，函数执行器收到后会立即触发下一轮 LLM 推理而不等待用户输入。这相当于操作系统的"中断处理"机制。

##### 控制流与 Yield 机制

MemGPT 的事件循环如下：

1. **接收事件**（用户消息、heartbeat 请求等）→ 事件被追加到 FIFO Queue
2. **组装 Prompt**：将 System Instructions + Working Context + FIFO Queue 拼接为主上下文
3. **LLM 推理**：生成输出，可能是文本、函数调用或两者兼有
4. **解析输出**：函数执行器识别函数调用并执行（插入/检索/修改记忆）
5. **Yield（让步）**：LLM 可以通过 `yield` 关键字主动让出控制权，但当 token 预算紧张或上下文过长时，系统会自动触发 yield，将部分数据换出到外部存储
6. **循环**：更新后的主上下文进入下一轮推理

> ⚠️ 注意：MemGPT 的上下文管理是**自主且事件驱动**的。与 RAG（检索增强生成）不同，RAG 需要外部编排器在每次用户请求前预先检索；MemGPT 中 LLM 自主决定何时检索、检索什么以及检索多少页，这使其能够处理需要主动信息搜寻的复杂任务。

##### 与传统方法的区别

| 维度 | 传统固定上下文 LLM | RAG / 向量检索 | MemGPT |
|------|------------------|---------------|--------|
| 记忆管理 | 被动截断/遗忘 | 外部编排器控制检索 | LLM 自主管理记忆 |
| 长文档处理 | 截断或分 chunk | 每次查询时检索 top-k | 自主翻阅多页 |
| 对话历史 | 滑动窗口 | 无对话历史检索 | Recall Memory 可回溯 |
| 需要微调 | 可能需要 | 不需要 | 不需要 |
| 核心类比 | 单机无虚拟内存 | 外部索引查阅 | OS 虚拟内存分页 |

##### 实验验证

MemGPT 在两个核心任务上进行了评估：
- **深度记忆检索（DMR）**：在 150+ 轮对话后，向 Agent 提问需要回忆第 1 轮对话中信息的特定问题。MemGPT 可以通过 `recall_memory_search` 主动检索早期内容，准确率显著高于仅依赖滑动窗口的基线。
- **对话导语生成**：评估 Agent 在长文档分析后生成高质量开场白的`能力`。

实验结果（Table 2/3）表明，MemGPT 在不增加 LLM 上下文窗口的情况下，通过层次化记忆管理实现了远超大上下文基线的长程记忆能力。

#### 🧪 练习题
```yaml
question: "MemGPT 的 Archival Memory 与 Recall Memory 的核心区别是什么？"
options:
  - "Archival Memory 存储对话历史，Recall Memory 存储外部文档"
  - "Archival Memory 支持语义搜索并存储完整文档，Recall Memory 以 FIFO 队列存储换出的对话历史"
  - "Archival Memory 使用 FAISS，Recall Memory 使用 SQL 数据库"
  - "Archival Memory 只能由用户写入，Recall Memory 只能由 LLM 写入"
answer: 1
explain: "Archival Memory 存储外部文档并支持语义搜索，Recall Memory 以 FIFO 队列存储从主上下文换出的历史对话。"
```
