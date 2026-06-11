### A2A: 智能体到智能体协议 (Agent2Agent)

```yaml
id: a2a
name: A2A
full_name: 智能体到智能体协议 (Agent2Agent)
year: '2025.04'
org: Google Cloud
paper_url: https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/
category: protocol
parent: —
motivation: 标准化跨框架任务协作与发现
```

#### 📝 一句话总结
A2A（Agent-to-Agent Protocol）是Google推出的开放标准协议，定义了AI Agent之间的通信规范和任务协作流程，通过Agent Card能力发现、异步任务生命周期管理和灵活消息交换机制，解决了不同框架/厂商构建的Agent系统无法互操作的问题。

#### 🎯 核心要点
- 基于HTTP(S) + JSON-RPC 2.0的标准化通信协议，支持同步请求/响应、流式传输（SSE）和异步推送通知
- Agent Card：JSON元数据文档，描述Agent的身份、技能、服务端点和认证要求，实现自动发现
- 三层架构：数据模型层（Task/Message/Part/Artifact）、操作层（Send Message/Get Task等6个核心操作）、协议绑定层（JSON-RPC/gRPC/HTTP+REST）
- Task生命周期管理：状态机从submitted→working→completed/failed，支持人工介入（input-required状态）
- Modality Agnostic：通过Part容器支持文本、文件引用、结构化数据和二进制内容，统一异构模态交换
- Opaque Execution原则：Agent间仅基于声明的能力和交换信息协作，无需暴露内部状态/记忆/工具实现
- 多语言SDK生态：Python/Go/JavaScript/Java/.NET/Rust全栈支持
- 企业级特性：内置认证授权声明、OpenTelemetry追踪、加密和监控支持

#### 🔬 深入细节
##### 一、背景与设计动机

在AI Agent爆炸式增长的时代，不同公司基于不同框架（LangChain、AutoGen、CrewAI、Google ADK等）构建的Agent系统形成了信息孤岛。传统集成方式是将Agent降级为工具调用（Function Calling），但这种方式丧失了Agent的自主性和协作能力。A2A的设计核心是为Agent建立一种"通用语言"，使Agent能够以原生Agent身份协作，而非退化为被动工具。

五大核心设计原则：
1. **拥抱自然非结构化**：Agent的输出本质上是非结构化的，A2A不强制要求Agent输出结构化API响应，而是允许混合文本、文件、结构化数据和嵌入式UI的灵活内容交换。
2. **安全为本**：安全机制不嵌入协议本身，而是通过建立身份认证和授权声明机制，与现有企业安全基础设施无缝对接。
3. **超长任务支持**：从快速查询到可能需要数天甚至人工介入的任务，A2A原生支持异步长任务和人工审批流程。
4. **模态无关（Modality Agnostic）**：统一的Part内容容器设计，支持文本、图像、音频、视频、表单和iframe UI片段。
5. **不透明执行（Opaque Execution）**：Agent之间仅通过声明的Agent Card和交换的消息进行协作，无需暴露内部prompt、记忆或工具细节。

> 💡 关键：A2A与MCP（Model Context Protocol，Anthropic）的关系——MCP解决工具/数据源与单Agent的连接，A2A解决Agent与Agent之间的协作，二者互补构成完整AI生态栈。

##### 二、协议核心架构

![A2A Protocol Architecture](https://raw.githubusercontent.com/a2aproject/A2A/refs/heads/main/docs/assets/a2a-logo-black.svg)
*图：A2A协议的核心三层架构——数据模型层定义核心数据结构，操作层定义6个API操作，协议绑定层实现具体的传输映射*

**三层架构：**
- **Layer 1 — 数据模型层**：定义Task、Message、Part、Artifact、AgentCard、Extension等核心对象及其关系。
- **Layer 2 — 操作层**：定义与传输无关的6个核心操作（Send Message、Send Streaming Message、Get Task、List Tasks、Cancel Task、Get Agent Card）。
- **Layer 3 — 协议绑定层**：将操作映射到具体传输协议（JSON-RPC 2.0、gRPC、HTTP+REST），支持自定义扩展绑定。

##### 三、核心数据结构详解

**Agent Card** — Agent的数字名片：
Agent Card是A2A的入口机制，每个A2A Server在已知URL上发布一份JSON文档，包含：
- `name`、`description`：身份描述
- `url`：服务端点地址
- `version`：支持的A2A协议版本
- `capabilities`：能力声明（是否支持streaming、push notifications等）
- `skills`：技能列表（唯一ID、名称、描述、输入输出模态、可选示例和触发条件）
- `authentication`：认证方案声明（OAuth、API Key等），凭据通过HTTP Header传递，不嵌入协议消息体
- `defaultInputModes` / `defaultOutputModes`：支持的默认模态（text、file、data、form等）

**Task** — 基本工作单元：
Task是A2A中追踪和管理工作的核心对象，通过唯一`taskId`标识，遵循严格状态机：
```
submitted → working → completed
                  ↘ failed
                  ↘ input-required → working（人工介入后继续）
                  ↘ canceled
```
Task对象包含`status`、`messages`（历史消息列表）、`artifacts`（产出物列表）、`contextId`（逻辑分组上下文）等字段。

**Message和Part** — 灵活的内容交换：
- Message代表一次通信轮次，包含`role`（user/agent）和一个或多个Part。
- Part是最小内容单元，通过`oneof`字段支持四种类型：
  - `text`：纯文本
  - `raw`：内联二进制数据（byte array）
  - `url`：外部文件引用
  - `data`：结构化JSON值
- 每个Part可附带`mediaType`（MIME类型）和`filename`元数据。

**Artifact** — 任务产出物：
Artifact代表Agent生成的最终输出（如文档、图像、结构化数据），有唯一`artifactId`，由多个Part组成，支持流式增量传输。

##### 四、任务交互流程（伪代码）

```
# A2A Send Message 核心交互流程

1. Client → Server: SendMessageRequest {
     message: Message(role="user", parts=[Part(text="查询任务")]),
     configuration: {blocking: false, acceptedOutputModes: ["text", "data"]}
   }

2. Server 解析 Agent Card 匹配 Skill，
   若需长时处理 → 返回 Task(submitted):
     {"id": "task-123", "status": "submitted"}

3. Client 轮询: GetTaskRequest(taskId="task-123")
   → working: {"status": "working", "messages": [...]}

4. (可选)人工介入: Task 进入 input-required
   Client 发送新 Message → Task 回到 working

5. Server 完成 → completed:
     {"status": "completed", "artifacts": [Artifact(parts=[...])]}

6. Client 可选: CancelTaskRequest(taskId="task-123")
   → canceled
```

##### 五、三种传输模式

A2A支持三种通信模式，适应不同场景：

1. **请求/响应（轮询）**：客户端发起请求，服务器返回结果。对于长任务，客户端周期性调用GetTask轮询状态。
2. **流式传输（SSE）**：通过Server-Sent Events建立持久连接，服务端推送实时增量更新（状态变化、Artifact分块、消息流）。
3. **推送通知（Webhook）**：客户端提供回调URL，服务器在任务状态发生重大变化时主动POST通知，适合超长任务或断连场景。

> ⚠️ 注意：并非所有A2A Server都必须支持全部三种模式，具体能力在Agent Card的`capabilities`字段中声明。

##### 六、与传统方法的关键区别

| 维度 | 传统方法（工具调用/API集成） | A2A协议 |
|------|---------------------------|---------|
| 集成方式 | Agent退化为工具/函数 | Agent保持自主，以Agent身份协作 |
| 能力暴露 | 通过函数签名描述 | 通过Agent Card声明的技能+模态 |
| 状态管理 | 无状态或应用层自定义 | 原生Task生命周期+状态机 |
| 长任务支持 | 需自行实现超时/重试 | 协议原生异步+人工介入状态 |
| 模态支持 | 通常仅JSON | 文本/文件/结构化数据/嵌入式UI |
| 安全性 | 混入应用逻辑 | 独立认证声明层+企业级标准 |

#### 🧪 练习题
```yaml
question: "A2A协议中Agent Card的主要作用是什么？"
options:
  - "存储Agent的内部工具列表和prompt模板"
  - "声明Agent的身份、技能、服务端点和认证要求，供其他Agent自动发现和匹配"
  - "记录Agent之间的所有历史对话内容"
  - "作为Agent的运行时执行环境容器"
answer: 1
explain: "Agent Card是A2A的发现机制，每个A2A Server发布一份JSON元数据描述自身能力，其他Agent通过解析Agent Card判断是否适合协作，无需预先了解内部实现。"
```
