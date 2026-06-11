### OpenClaw: 统一 Agent 控制平面 (OpenClaw)

```yaml
id: openclaw
name: OpenClaw
full_name: 统一 Agent 控制平面 (OpenClaw)
year: '2026.05'
org: OpenClaw
paper_url: https://docs.openclaw.ai/plugins/sdk-agent-harness
category: runtime
parent: codex
motivation: 把Codex等原生运行时并入统一控制面
```

#### 📝 一句话总结
OpenClaw 提出 Agent Harness 插件 SDK，通过将 Codex 等原生 Agent 运行时抽象为可注册的 harness 插件，在统一的控制平面（session、tool policy、channel、transcript）下调度异构运行时，解决了多运行时共存时 provider/runtime 耦合、回退策略混乱和会话状态割裂的问题。

#### 🎯 核心要点
- 定义 Agent Harness 抽象层：将一次 prepared agent turn 的低级执行封装为标准接口，与 provider、channel、tool registry 解耦
- 提供 `openclaw/plugin-sdk/agent-harness` 公共 SDK，第三方可通过 `registerAgentHarness()` 注册原生运行时
- 三级运行时选择策略：Model-scoped > Provider-scoped > auto（插件候选匹配）> embedded fallback
- 引入 `runtimePlan` 策略包：包含 tools.normalize、transcript.resolvePolicy、delivery.isSilentPayload、outcome.classifyRunResult 等共享决策模块，harness 可读取但不可修改
- Codex 插件作为参考实现：provider + harness 配对模式，harness id 为 `codex`，OpenAI 模型引用默认路由到 Codex harness
- 运行时中立的工具结果中间件（`registerAgentToolResultMiddleware`）：替代旧的 Codex-only 和 embedded-only 扩展钩子
- 终端结果分类器 `classifyAgentHarnessTerminalOutcome`：区分 empty/reasoning-only/planning-only 以支持模型回退决策
- 严格的运行时绑定：一旦插件 harness 认领运行，不回退到其他运行时，避免副作用重复或语义变更
- Native session 与 OpenClaw transcript 双轨镜像机制：harness 维护原生会话 id，同时向 OpenClaw transcript 同步可见输出

#### 🔬 深入细节
![OpenClaw 示意图](https://docs.openclaw.ai/assets/pixel-lobster.svg)
*图：OpenClaw 的核心框架或系统示意。*

##### 架构总览

OpenClaw 的 Agent Harness 架构将 Agent 执行栈分为**控制平面**（OpenClaw Core）和**执行平面**（Harness Plugin）两层：

```
+-----------------------------------------------------------+
|                   OpenClaw Core (控制平面)                  |
|  +----------+ +----------+ +--------+ +---------------+  |
|  | Provider | | Channel  | | Session| | Tool Policy   |  |
|  | Resolver | | Reply    | | Store  | | & Sandbox     |  |
|  +----------+ +----------+ +--------+ +---------------+  |
|                         |                                  |
|               runtimePlan (只读策略包)                       |
|  +------------------------------------------------------+ |
|  | tools.normalize | transcript.resolvePolicy           | |
|  | delivery.isSilentPayload | outcome.classify          | |
|  | observability (provider/model/harness metadata)      | |
|  +------------------------------------------------------+ |
|                         |                                  |
|         +---------------+--------------+                 |
|         |   Harness Selection Policy     |                 |
|         |  Model > Provider > auto       |                 |
|         |  > embedded fallback           |                 |
|         +---------------+--------------+                 |
+-------------------------+--------------------------------+
                          |
+-------------------------+--------------------------------+
|              Agent Harness Plugin (执行平面)                |
|  +------------------------+---------+                    |
|  |  supports(ctx) -> {supported, priority}               |
|  |  runAttempt(params) -> AgentTurnResult                 |
|  |  reset(sessionId)                                     |
|  +------------------------------------------------------+ |
|  +----------+ +-----------+ +------------------+        |
|  |  Codex   | | Claude CLI| | Custom Daemon... |        |
|  |  Harness | |  Harness  | |                    |        |
|  +----------+ +-----------+ +------------------+        |
|       |                                                   |
|  +----+------------------------------------------+       |
|  | Native Session (thread id, resume token)       |       |
|  |    <-> Transcript Mirror (同步到 OpenClaw)      |       |
|  +-----------------------------------------------+       |
+-----------------------------------------------------------+
```

*图：OpenClaw Agent Harness 双层架构——控制平面负责 provider/channel/session/tool policy 决策并将 runtimePlan 下发给 harness；执行平面通过 supports/runAttempt/reset 接口接入原生运行时，并通过 Transcript Mirror 保持会话一致性。*

##### 核心接口定义

Harness 插件的核心接口（TypeScript）：

```typescript
// 注册入口
import { definePluginEntry } from "openclaw/plugin-sdk";

// Harness 定义
const myHarness: AgentHarness = {
  id: "my-harness",
  label: "My native agent harness",
  
  // 声明支持条件：基于 ctx.provider + ctx.model 决策
  supports(ctx) {
    return ctx.provider === "my-provider" 
      ? { supported: true, priority: 100 } 
      : { supported: false };
  },
  
  // 执行一次准备好的 turn
  async runAttempt(params) {
    // params 包含：prompt, tools, images, onPartialReply,
    // onAgentEvent, runtimePlan, sessionId...
    return await runMyNativeTurn(params);
  },
};

export default definePluginEntry({
  id: "my-native-agent",
  name: "My Native Agent",
  description: "Runs selected models through a native agent daemon.",
  register(api) {
    api.registerAgentHarness(myHarness);
  },
});
```

##### 动机与背景

传统 Agent 框架在处理多运行时共存时面临三个核心问题：

1. **Provider/Runtime 耦合**：每个模型 provider 的 API 传输层与 Agent 执行逻辑耦合，当 Codex 等产品拥有自己的原生 session 线程（含 compaction、resume、tool 执行）时，通过标准 provider 传输层适配会丢失原生能力或需要重复实现。

2. **回退策略混乱**：当原生运行时失败时，是静默回退到嵌入式运行时、重试同一运行时、还是直接报错？缺乏统一的分类和决策机制。

3. **会话状态割裂**：原生运行时的 thread id、resume token 与 OpenClaw 的 session/transcript 各自独立，切换运行时会丢失上下文。

OpenClaw Harness 的设计思路是：**将"执行"从"控制"中彻底分离**。控制平面负责所有 Agent 共用的决策（认证、预算、工具策略、通道回复），harness 只负责一次已准备好的 turn 的低级执行。这种分离使得 Codex 可以保留其原生线程管理、compaction 和 app-server 协议，同时被纳入 OpenClaw 的统一 session/channel/tool policy 框架。

##### 运行时选择策略

OpenClaw 采用三级优先级从高到低的运行时选择策略：

1. **Model-scoped runtime**：在 `models` 配置中为特定模型显式指定 `agentRuntime.id`，如 `"openai/gpt-5.5": { "agentRuntime": { "id": "codex" } }`。这是最精确的绑定。

2. **Provider-scoped runtime**：在 `providers` 配置中为整个 provider 指定默认运行时。优先级低于 model-scoped。

3. **auto 模式**（默认）：OpenClaw 遍历所有已注册 harness 插件，调用 `supports(ctx)` 询问是否支持当前 provider/model。若多个插件声明支持，按 priority 排序。无匹配时使用嵌入式运行时。

> 关键约束：一旦插件 harness 通过 `supports()` 认领了一次运行并开始执行（产生 assistant text、tool calls 或 message sends），OpenClaw **不会**将该 turn 重放到另一个运行时。这是为了避免认证/运行时语义变更或副作用重复。

##### runtimePlan 策略包

`runtimePlan` 是 OpenClaw Core 在下发 prepared attempt 时注入的策略包。Harness 可读取这些策略来做与 OpenClaw 行为一致的决策，但**不得修改**其内容或利用它在 turn 内部切换 provider/model：

| 策略模块 | 功能 |
|---|---|
| `tools.normalize(...)` | Provider 感知的工具 schema 规范化 |
| `tools.logDiagnostics(...)` | 工具调用诊断日志 |
| `transcript.resolvePolicy(...)` | Transcript 清洗和 tool-call 修复策略 |
| `delivery.isSilentPayload(...)` | 判断是否为 NO_REPLY 或媒体静默投递 |
| `outcome.classifyRunResult(...)` | 模型回退分类（empty/reasoning/planning） |
| `observability` | 已解析的 provider/model/harness 元数据 |

##### 工具结果中间件

OpenClaw 提供运行时中立的工具结果中间件机制：

```typescript
api.registerAgentToolResultMiddleware(...)
```

该接口要求插件在 manifest 的 `contracts.agentToolResultMiddleware` 中声明目标运行时 id。适用于在工具输出返回给模型之前执行异步转换（如格式化、过滤、增强）。这替代了旧的两套钩子：
- `api.registerCodexAppServerExtensionFactory(...)`（Codex-only，已标记为 legacy）
- `api.registerEmbeddedExtensionFactory(...)`（已移除，需迁移到运行时中立 API）

##### 终端结果分类

当原生 harness 完成一次 turn 但没有产生可见的 assistant text 时，调用 `classifyAgentHarnessTerminalOutcome(...)` 可将结果分类为：
- `empty`：完全空输出，可能需要重试
- `reasoning-only`：只有推理内容但无用户可见回复
- `planning-only`：只有规划步骤

OpenClaw 的 fallback 策略据此决定是否用其他模型重试。Prompt 错误、进行中的 turn 和 `NO_REPLY` 等有意静默回复**不被分类**，避免误触发回退。

##### Codex 参考实现

Codex 插件是 OpenClaw 官方捆绑的 harness 实现：

- **Provider 注册**：同时注册 provider（使 model refs、auth、`/model` 选择对 OpenClaw 可见）和 harness（通过 `supports()` 认领）。
- **Model refs 路由**：`openai/gpt-*` 引用默认选择 Codex harness；旧的 `codex/gpt-*` 引用作为兼容性别名保留。
- **App-server 协议**：OpenClaw 向 Codex 发送裸 model id，harness 负责与 Codex app-server（要求 >= 0.125.0）通信。
- **显式绑定**：通过 `agentRuntime.id: "codex"` 可强制仅使用 Codex 路径（失败即报错，不回退到嵌入式运行时）。
- **Transcript Mirror**：Codex 维护原生 thread id 和 resume 行为，同时将所有用户可见的 assistant/tool 输出镜像到 OpenClaw transcript。

##### Native Session 与 Transcript 双轨机制

Harness 可以维护自己的原生会话标识（thread id、daemon-side resume token），但必须：
1. 将该绑定显式关联到 OpenClaw session
2. 持续将用户可见的 assistant/tool 输出镜像到 OpenClaw transcript
3. 实现 `reset(...)` 方法，当 OpenClaw session 被 reset 时清除原生侧绑定

OpenClaw transcript 作为兼容层保障：
- Channel 可见的会话历史
- Transcript 搜索与索引
- 后续 turn 切换回嵌入式 OpenClaw harness 的能力
- 通用的 `/new`、`/reset` 和 session 删除行为

##### 与传统方法的区别

| 维度 | 传统 Provider 插件 | OpenClaw Harness |
|---|---|---|
| 抽象层次 | HTTP/WebSocket API 传输 | 原生 session 运行时 |
| 适用场景 | 标准 LLM API 接入 | 自有线程/compaction/resume 的 Agent 服务器 |
| Session 归属 | OpenClaw 全权管理 | Harness 管理原生 session，OpenClaw 管理 transcript |
| 回退策略 | Provider 级别 fallback | 三级选择 + 分类器驱动的模型回退 |
| 扩展方式 | Provider 专有钩子 | 运行时中立中间件 API |

#### 🧪 练习题
```yaml
question: "OpenClaw Agent Harness 的 runtimePlan 策略包的正确使用方式是？"
options:
  - "Harness 可以修改 runtimePlan 中的 tools.normalize 来实现自定义工具策略"
  - "Harness 读取 runtimePlan 做与 OpenClaw 行为一致的决策，但不得修改其内容"
  - "runtimePlan 仅用于 provider/model 的初始选择，选择完成后不再使用"
  - "Harness 可以忽略 runtimePlan，完全使用原生运行时的独立策略"
answer: 1
explain: "runtimePlan 是 OpenClaw Core 注入的只读策略包，harness 应读取其中 tools、transcript、delivery、outcome 等模块以保持与 OpenClaw 行为一致，但不得修改或利用它在 turn 内部切换 provider/model。"
```
