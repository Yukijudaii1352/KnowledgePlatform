### MCP: 模型上下文协议 (Model Context Protocol)

```yaml
id: mcp
name: MCP
full_name: 模型上下文协议 (Model Context Protocol)
year: '2024.11'
org: Anthropic
paper_url: https://www.anthropic.com/news/model-context-protocol?stargate_lang=en
category: protocol
parent: —
motivation: 统一工具资源提示的JSON-RPC接口
```

#### 📝 一句话总结
MCP 提出了一个基于 JSON-RPC 2.0 的客户端-服务器协议标准，统一了 AI 助手与外部数据源（内容仓库、业务工具、开发环境）之间的上下文交换方式，解决了多工具集成中"M×N 集成问题"。

#### 🎯 核心要点
- 提出 MCP 开放协议标准，将 AI 应用与工具/数据源的连接从"每个模型×每个工具"的碎片化集成转变为统一的一次性集成范式
- 采用客户端-服务器架构，定义三类参与者：MCP Host（AI 应用）、MCP Client（连接管理器）、MCP Server（上下文提供者）
- 双层协议设计：Data Layer 定义 JSON-RPC 2.0 消息语义（生命周期管理、核心原语），Transport Layer 抽象通信机制
- 支持两种传输方式：Stdio Transport（本地进程间通信）和 Streamable HTTP Transport（远程服务器通信，含 SSE 流式推送）
- 核心 Server Primitives 包括 Tools（供 AI 调用的操作）、Resources（结构化上下文数据）、Prompts（交互模板）
- 核心 Client Primitives 包括 Sampling（请求 Host LLM 采样）、Elicitation（请求用户输入）、Logging（日志回传）
- 有状态协议：生命周期分 Initialization（能力协商）、Operation（正常通信）、Shutdown（优雅关闭）三阶段
- 提供多语言 SDK（TypeScript/Python 等）和开发工具（MCP Inspector），参考实现覆盖文件系统、Sentry、GitHub 等

#### 🔬 深入细节
![MCP 架构示意图](https://modelcontextprotocol.io/images/mcp-simple-diagram.png)

*图：MCP 协议的客户端-服务器架构，Host 通过多个 Client 实例连接不同 Server，统一上下文交换*

##### 动机与背景

传统 AI 助手集成外部工具时面临"M×N 集成问题"：每新增一个 AI 应用或工具，都需要为每个组合编写定制适配代码，导致工程碎片化严重。Anthropic 在 2024 年 11 月 25 日开源 MCP，目标是成为"AI 应用的 USB-C 接口"——一个统一标准，使任何 AI 应用（Claude、VS Code 等）能够通过同一协议连接到任何提供上下文的工具或数据源。

##### 核心架构与交互流程

MCP 的架构围绕三类参与者展开：

1. **MCP Host**：实际的 AI 应用（如 Claude Desktop、Claude Code、VS Code），负责协调管理多个 MCP Client
2. **MCP Client**：为每个 MCP Server 创建一个独立的客户端连接实例，维护与该 Server 的 1:1 连接
3. **MCP Server**：提供上下文数据的程序，可运行在本地（Stdio 传输）或远程（Streamable HTTP 传输）

连接建立后经历三阶段生命周期：

```
初始化阶段 (Initialization)
  Client → Server: initialize 请求（携带 protocolVersion、capabilities、clientInfo）
  Server → Client: 响应（返回 server capabilities、serverInfo）
  Client → Server: notifications/initialized 通知
  ↓
操作阶段 (Operation)
  双向 JSON-RPC 2.0 消息交换：
    - tools/list, tools/call（工具发现与调用）
    - resources/list, resources/read（资源枚举与读取）
    - prompts/list, prompts/get（提示模板获取）
    - sampling/createMessage（Client 请求 Host LLM 采样）
    - elicitation/create（Client 请求用户输入）
  ↓
关闭阶段 (Shutdown)
  Client → Server: shutdown 请求
  Server → Client: 响应确认
  连接断开
```

##### 核心原语（Primitives）

**Server 端原语**使 AI 应用能够发现和利用外部能力：

- **Tools**：模型可调用的远程操作。Server 暴露 `tools/list` 列出可用工具及其 JSON Schema 参数定义，Client 通过 `tools/call` 发起实际调用。典型用途包括查询数据库、发送消息、操作文件系统
- **Resources**：结构化的只读数据资源。通过 URI 标识，Server 提供 `resources/list` 和 `resources/read`，支持静态资源和动态模板（如 `users://{userId}/profile`）。可选订阅机制（`resources/subscribe`）在资源变化时推送通知
- **Prompts**：预定义的交互模板，帮助用户和模型以标准化方式启动特定任务（如代码审查、数据分析）

**Client 端原语**让 Server 能反向利用 Host 的能力：

- **Sampling**：Server 通过 `sampling/createMessage` 请求 Host LLM 生成补全内容，支持指定角色（user/assistant）、上下文包含、模型偏好等参数
- **Elicitation**：Server 通过 `elicitation/create` 向终端用户请求输入，支持表单模式和 URL 模式，可要求必填验证
- **Logging**：Server 通过 `notifications/logging` 向 Client 发送结构化日志，支持 debug/info/warning/error 级别

##### 与传统方法的区别

> 💡 关键：MCP 与 Function Calling 和传统 Plugin 系统有本质区别

| 维度 | 传统 Function Calling | 传统 Plugin 系统 | MCP |
|------|----------------------|------------------|-----|
| 集成方式 | 每个模型单独定义函数 | 每个平台单独开发插件 | 统一协议，一次对接 |
| 可移植性 | 绑定特定模型/平台 | 绑定特定平台 | 跨模型、跨应用复用 |
| 传输层 | 通常同进程 | 各异 | Stdio + Streamable HTTP 双模 |
| 状态管理 | 无状态请求 | 各实现不同 | 有状态生命周期协议 |
| 能力发现 | 静态定义 | 静态清单 | 动态协商 capabilities |

MCP 的创新在于将工具集成的标准化从"应用层"下沉到"协议层"，使得 Server 开发者只需实现一次 MCP 接口，即可被任何 MCP-compatible Host 使用——无论 Host 内部使用 Claude、GPT 还是其他模型。

##### 传输层详解

MCP 的 Transport Layer 抽象了通信细节，使 Data Layer 的 JSON-RPC 消息在两种传输机制上统一运作：

- **Stdio Transport**：通过标准输入/输出流通信。Server 作为子进程由 Client 启动，消息以换行符分隔的 JSON 帧发送。零网络开销，适合本地工具集成。仅服务单个 Client
- **Streamable HTTP Transport**：通过 HTTP POST 发送 Client→Server 消息，Server 可选通过 Server-Sent Events (SSE) 向 Client 推送流式响应和通知。支持标准 HTTP 认证（Bearer Token、API Key、自定义 Header），推荐 OAuth 获取令牌。可服务多个 Client 并发连接

> ⚠️ 注意：HTTP 传输模式下需要特殊的"伪 GET"升级握手——Client 先发送 `Accept: text/event-stream` 的 GET 请求建立 SSE 通道，之后 POST 请求才能携带通知

##### 消息格式（JSON-RPC 2.0 基础）

所有 MCP 消息遵循标准 JSON-RPC 2.0 格式：

- **Request**：`{"jsonrpc":"2.0","id":<id>,"method":"<method>","params":{...}}`
- **Response**：`{"jsonrpc":"2.0","id":<id>,"result":{...}}` 或 Error：`{"jsonrpc":"2.0","id":<id>,"error":{"code":<code>,"message":"..."}}`
- **Notification**：`{"jsonrpc":"2.0","method":"notifications/<name>","params":{...}}`（无 id，无响应）

##### 生态与现状

MCP 自 2024 年 11 月发布以来迅速获得行业采纳。官方提供 TypeScript 和 Python SDK，包含 MCP Inspector 调试工具。参考 Server 实现涵盖文件系统访问、数据库查询（Postgres/SQLite）、GitHub API、Brave Search、Sentry 错误追踪等。第三方社区已贡献数百个 MCP Server，覆盖云服务、开发工具、知识管理等领域。规范仓库托管于 `github.com/modelcontextprotocol/specification`，以 MIT 许可证开源。

#### 🧪 练习题
```yaml
question: "MCP 协议中，Server 想要让 AI Host 生成一段文本时，应该使用哪个 Client 端原语？"
options:
  - "tools/call，调用文本生成工具"
  - "resources/read，读取文本资源"
  - "sampling/createMessage，请求 LLM 采样补全"
  - "elicitation/create，请求用户输入文本"
answer: 2
explain: "sampling/createMessage 是 MCP 定义的 Client Primitives 之一，允许 Server 反向请求 Host 的 LLM 进行采样/补全。这是让外部工具驱动 AI 生成内容的标准路径。"
```
