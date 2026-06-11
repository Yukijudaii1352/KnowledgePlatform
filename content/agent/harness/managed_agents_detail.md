### Managed Agents: 托管长程智能体服务 (Managed Agents)

```yaml
id: managed_agents
name: Managed Agents
full_name: 托管长程智能体服务 (Managed Agents)
year: '2026.04'
org: Anthropic
paper_url: https://www.anthropic.com/engineering/managed-agents
category: runtime
parent: harness_design
motivation: 解耦session、harness与sandbox接口
```

#### 📝 一句话总结
> Managed Agents 通过将智能体解耦为 Session（事件日志）、Harness（调度层）和 Sandbox（执行环境）三个独立接口，解决了长程智能体任务中组件耦合导致的可靠性差、安全性弱和扩展难的问题，使各组件可独立失败、替换与扩展。

#### 🎯 核心要点
- 提出三层解耦架构：Session（不可变事件日志）、Harness（调用 Claude 并路由工具调用的循环层）、Sandbox（代码执行与文件编辑的执行环境）
- 统一工具调用接口 `execute(name, input) → string`，使 Harness 对执行环境无感知，支持容器、手机、模拟器等多种后端
- Session 作为"上下文对象"存储在 Claude 上下文窗口之外，通过 `getEvents()` 按位置切片检索历史事件
- 设计安全边界：凭证通过 Vault + MCP Proxy 注入，沙箱内生成的代码永远无法触及原始 Token
- 容器从"宠物"变为"牲口"：失败后通过 `provision({resources})` 重建，不再需要人工修复
- Harness 无状态化：崩溃后通过 `wake(sessionId)` 恢复，从 Session 日志回放，无需持久化任何本地状态
- 按需供应容器：仅在 Sandbox 被调用时才 provision，p50 TTFT 下降约 60%，p95 TTFT 下降超 90%
- 支持"多脑多手"：多个 Harness 实例可共享多个 Sandbox，Brains 之间可传递 Hands

#### 🔬 深入细节
##### 核心架构图

![Managed Agents 解耦架构](https://www-cdn.anthropic.com/images/4zrzovbb/website/73e900af5b9d6ed8c64db0a8e74d4465963556b7-1640x1596.png)
*图：Managed Agents 的三层解耦架构概览*

![Session/Event 流示意](https://www-cdn.anthropic.com/images/4zrzovbb/website/cf0719d7832b1f577b7393c84a7c53eecc725ca4-760x200.png)
*图：Session 事件流与 Harness 交互示意*

##### 架构演进的动机：从"宠物"到"牲口"

在 Managed Agents 的早期设计中，Session、Harness 和 Sandbox 被放置在同一容器内。这种耦合设计带来两个致命缺陷：

1. **容器成为"宠物"**：容器崩溃即意味着 Session 丢失，运维人员需要手动进入容器排查问题。但由于容器内留存用户数据，安全策略禁止工程师直接访问，导致调试几乎不可能。WebSocket 事件流是唯一的观测窗口，但无法定位故障发生在 Harness、网络层还是容器本身的哪个环节。

2. **Harness 编码过时假设**：Harness 隐含假设"Claude 操作的所有资源都在同一容器内"。当客户需要接入自有 VPC 时，只能走网络对等互联或自部署 Harness，这大幅限制了服务的接入灵活性。

> 💡 关键洞察：Harness 中编码的是"当前模型不擅长什么"的假设——但这些假设会随模型升级而**过时**（go stale）。例如 Claude Sonnet 4.5 在上下文窗口接近上限时会提前结束任务（"上下文焦虑"），团队在 Harness 中加入了上下文重置逻辑；但当 Opus 4.5 使用时，该行为已消失，重置逻辑变成死代码。

解决方案借鉴了操作系统的设计哲学：**将硬件虚拟化为抽象接口，使上层程序与底层实现解耦**。如同 `read()` 系统调用不关心底层是 1970 年代的磁盘组还是现代 SSD，Managed Agents 定义了三个稳定接口，实现可以自由替换。

##### 核心接口设计

Managed Agents 定义了以下关键接口，构成了系统的"元 Harness"（meta-harness）：

| 接口 | 签名 | 职责 |
|------|------|------|
| 工具执行 | `execute(name, input) -> string` | Harness 对 Sandbox 的统一调用入口，屏蔽底层实现差异 |
| 容器供应 | `provision({resources})` | 按需创建新的执行环境，失败后重建而非修复 |
| 会话恢复 | `wake(sessionId)` | 从 Session 日志恢复 Harness，实现无状态化 |
| 事件写入 | `emitEvent(id, event)` | Harness 向 Session 追加不可变事件记录 |
| 事件检索 | `getSession(id)` / `getEvents()` | 按位置切片查询 Session 中的历史事件 |

```python
# Managed Agents 核心调度循环伪代码
def agent_loop(session_id: str):
    # 恢复或创建 Harness（无状态）
    harness = wake(session_id)
    session = getSession(session_id)
    
    # 按需 provision Sandbox（延迟绑定）
    sandbox_id = None
    
    while not task_complete:
        # 从 Session 获取近期事件作为上下文
        events = session.getEvents(slice=(-100, None))
        
        # 构造 Claude 的上下文窗口
        context_window = harness.transform(events)
        
        # Claude 推理
        response = claude.generate(context_window)
        
        if response.is_tool_call:
            tool_name = response.tool_name
            tool_input = response.tool_input
            
            if tool_name == "execute":
                # 延迟绑定：首次调用时才 provision Sandbox
                if sandbox_id is None:
                    sandbox_id = provision({"repo": repo_url, "token": bundled_auth})
                result = execute(sandbox_id, tool_input)
            else:
                # 通用工具调用（MCP 等）
                result = execute(tool_name, tool_input)
            
            # 持久化事件到 Session
            harness.emitEvent(session_id, {
                "type": "tool_result",
                "tool": tool_name,
                "result": result
            })
        else:
            # 持久化响应
            harness.emitEvent(session_id, {
                "type": "assistant_message",
                "content": response.content
            })
    
    return final_result
```

##### 安全边界设计：Token 隔离

在耦合架构中，Claude 生成的不可信代码与凭证共享同一容器环境——攻击者只需诱导 Claude 读取环境变量即可窃取 Token，随后生成不受限的新 Session。

Managed Agents 通过**结构性地确保 Token 永远不可达沙箱内部**来解决此问题，采用了两种互补模式：

1. **凭证与资源绑定（Bundled Auth）**：以 Git 操作为例，在 Sandbox 初始化时使用仓库访问 Token 克隆代码，并将 Token 仅配置在本地 Git remote 中。Sandbox 内的 `git push/pull` 正常运作，但 Agent 代码本身从不接触 Token 原文。

2. **外部 Vault + MCP 代理（Vault-backed Proxy）**：对于自定义工具，OAuth Token 存储于独立的安全 Vault 中。Claude 通过专用的 MCP 代理发起工具调用，代理使用 Session 关联的标识符从 Vault 获取凭证后，才向外部服务发起实际请求。

```
┌─────────────────────────────────────────────────────────┐
│                     Harness (Brain)                     │
│  不感知任何凭证；仅持有 session-associated token ID      │
└────────────┬──────────────────────────────┬─────────────┘
             │ execute("git_push", ...)     │ execute("mcp:github", ...)
             ▼                              ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│    Sandbox (Hands)  │     │      MCP Proxy + Vault       │
│  git push/pull 可用 │     │  token_id → OAuth token     │
│  无 Token 原文      │     │  → 调用外部 API             │
└─────────────────────┘     └─────────────────────────────┘
```

> ⚠️ 注意：传统做法是缩小 Token 权限范围（narrow scoping），但这本身编码了"Claude 用受限 Token 做不到什么"的假设——而 Claude 正变得越来越聪明。结构隔离才是根本解法。

##### Session：不是上下文窗口，而是上下文对象

长程任务常常超出 Claude 的上下文窗口长度。传统的解决方案（compaction 摘要、选择性裁剪、memory tool 写入文件）存在一个根本性困境：**难以预知未来的推理轮次需要哪些历史 Token**。

Managed Agents 的创新在于将 Session 视为一个**存活于上下文窗口之外的持久对象**（context object that lives outside the context window）。关键接口 `getEvents()` 允许 Harness 以高度灵活的方式检索历史：

- **位置切片**：`getEvents(slice=(-50, None))` 读取最近 50 个事件
- **时间回溯**：在某关键时刻前多取几个事件以查看前因后果
- **选择性重读**：重读特定操作之前的上下文

获取到的事件在传入 Claude 上下文窗口之前，Harness 可进行任意转换（重组、修剪、缓存优化等）。这种设计将**可恢复的上下文存储**（Session 负责）与**上下文工程优化**（Harness 负责）的关注点彻底分离。

> 💡 关键：我们无法预测未来模型需要什么上下文工程策略——因此接口只保证 Session 持久可用，而将具体的上下文管理策略推入 Harness，由 Harness 自由选择实现。

##### 性能收益：按需供应与延迟绑定

解耦架构带来了直接的性能收益。在耦合设计中，每个 Session 必须预先启动包含 Sandbox 的完整容器——即使 Session 可能永远不会用到代码执行能力。这引入了显著的时间到首 Token 延迟（TTFT），是用户最直观感受到的延迟指标。

解耦后：

1. **Harness 启动极快**：Harness 是无状态的轻量进程，仅需从 Session 日志中拉取待处理事件即可开始推理
2. **Sandbox 按需供应**：只有在 Claude 决定调用 `execute()` 时才 provision 容器，大量无需代码执行的 Session 永远不会触发容器创建
3. **并行扩展简单**：扩展至多个 Brain 只需启动多个无状态 Harness 实例，按需连接 Hands

实际效果：**p50 TTFT 下降约 60%，p95 TTFT 下降超过 90%**。

##### 多脑多手：从单进程到分布式智能体网络

解耦架构还使"多脑多手"成为可能。在耦合设计中，一个容器内只有一个 Harness 和一个 Sandbox。解耦后：

- **一个 Brain 可连接多个 Hands**：Harness 可以管理多个独立的 Sandbox，Claude 需要在不同执行环境间协调工作——这是一个更难的认知任务，但随着模型智能增长已成为可能
- **Brains 可传递 Hands**：由于 Hand 不绑定任何特定 Brain，多个 Harness 实例可以共享和传递 Sandbox 引用
- **按领域优化 Harness**：可以为不同任务定制专业化 Harness（如 Claude Code），它们都通过同一套接口接入 Managed Agents

> 💡 关键：Managed Agents 是一个"元 Harness"——不对具体 Harness 的实现做假设，而是对 Claude 周围所需的接口做假设：操纵状态（Session）和执行计算（Sandbox）。这些接口不关心 Sandbox 是一个容器、一部手机还是 Pokémon 模拟器。

#### 🧪 练习题
```yaml
question: "Managed Agents 中 Session 接口 getEvents() 的核心设计目的是什么？"
options:
  - "替代 Claude 的上下文窗口，直接作为推理输入"
  - "将历史上下文作为持久对象存储在上下文窗口之外，允许按需检索和回放"
  - "提高事件存储的压缩比率，降低存储成本"
  - "为 Harness 提供实时 WebSocket 事件推送能力"
answer: 1
explain: "getEvents() 将 Session 设计为存活于上下文窗口外的持久对象，支持位置切片和时间回溯检索，解决了长程任务中不可逆的上下文压缩导致的信息丢失问题。"
```
