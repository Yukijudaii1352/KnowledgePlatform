### ACP: 智能体通信协议 (Agent Communication Protocol)

```yaml
id: acp
name: ACP
full_name: 智能体通信协议 (Agent Communication Protocol)
year: '2025.03'
org: IBM Research
paper_url: https://research.ibm.com/projects/agent-communication-protocol
category: protocol
parent: —
motivation: 用轻量HTTP接口打通异构Agent
```

#### 📝 一句话总结
ACP（Agent Communication Protocol）是IBM Research于2025年3月提出的一套轻量级开放协议，以HTTP/JSON为传输基础，通过标准化Agent能力自描述清单（Agent Card）、任务生命周期管理（Task）、流式消息管道（Message）三层抽象，解决了异构AI智能体之间互操作性难题，使不同框架、不同厂商构建的Agent能够通过统一接口进行自动发现、安全认证、任务委派和实时通信。

#### 🎯 核心要点
- 提出三层核心抽象模型：**Agent Card**（Agent能力自描述清单，通过`/.well-known/agent-card.json`暴露）、**Task**（结构化任务载体，含完整状态机）、**Message**（支持请求-响应与SSE流式两种模式的通信通道）
- 完全基于 **HTTP/1.1 + JSON** 的极简协议栈设计，无额外二进制依赖或专用SDK，任何支持HTTP的技术栈均可原生实现
- Agent Card 包含 `agentId`、`capabilities`、`supportedTasks`、`endpoint`、`auth` 等字段，支持自动化Agent发现与能力匹配
- 采用 **JSON-RPC 2.0风格**的请求-响应模型，提供标准化的API接口：`POST /tasks`（创建任务）、`GET /tasks/{taskId}`（查询状态）、`POST /messages`（发送消息）、`GET /messages/stream`（SSE流式订阅）
- 内置 **Server-Sent Events (SSE)** 流式支持，实现长时间运行任务的实时进度推送和中间结果反馈
- 定义标准化**任务状态机**：`PENDING → IN_PROGRESS → COMPLETED | FAILED | CANCELLED`，状态迁移严格单向无环，保证分布式环境下状态强一致性
- 通过 **Agent Discovery** 机制实现Agent的动态注册与发现，编配器（Orchestrator）可扫描各端点自动构建Agent拓扑图
- 协议层内置三层**安全防护**：传输层（强制TLS 1.3）、身份认证层（Bearer Token / OAuth2）、内容完整性层（Agent Card数字签名验证）
- 设计哲学：**最小化耦合**——Agent间仅共享协议规范，无需共享代码库、运行时环境或消息中间件
- 与 **MCP（Model Context Protocol）**、**A2A（Agent-to-Agent）** 形成互补生态：ACP侧重于Agent间任务协作编排，MCP侧重于LLM与外部工具的连接，A2A侧重于对等Agent之间的直接对话

#### 🔬 深入细节
##### 1. 协议架构全景图

![ACP 协议栈示意图](https://research.ibm.com/_next/image?url=https%3A%2F%2Fresearch-website-prod-cms-uploads.s3.us.cloud-object-storage.appdomain.cloud%2FACP_Cover_1_308558580b.png&w=1200&q=85)
*图：ACP协议栈概览——Agent Card、Task、Message三层抽象与HTTP传输层的绑定关系*

ACP的整体架构围绕一个核心理念展开：**将每个Agent抽象为一个可通过标准HTTP URL寻址的独立微服务**。与传统多Agent系统依赖共享内存、专用中间件或中心化消息总线的架构不同，ACP将所有Agent间交互降级为简单的HTTP请求与JSON响应。这意味着一个基于Python/LangChain构建的Agent，与一个基于TypeScript/Vertex AI构建的Agent，无需任何桥接代码即可直接对话——因为它们遵循同一套协议语法和语义约定。

这种设计的工程价值在于：企业无需对现有Agent进行重构或引入额外的运行时依赖，只需在Agent外部封装一层薄薄的HTTP适配器（通常不超过200行代码），即可将其接入ACP网络。IBM Research在内部验证中展示了将一个遗留的SOAP-based系统改造为ACP兼容Agent的案例，整个适配过程不到一天。

##### 2. Agent Card — 能力的自描述与自动发现

Agent Card是ACP协议的基石，也是其区别于其他Agent协议的关键创新。每个Agent在启动后，必须在其服务端点的`/.well-known/agent-card.json`路径上暴露一个符合ACP Schema的JSON文档。这一设计借鉴了Web生态中的`/.well-known/`惯例（如`security.txt`、`apple-app-site-association`），使发现机制与现有Web基础设施完全兼容。

典型Agent Card结构如下：

```json
{
  "agentId": "weather-bot-01",
  "name": "Weather Agent",
  "description": "提供实时天气预报与历史气象数据查询服务",
  "version": "1.0.0",
  "capabilities": [
    { 
      "id": "weather:forecast", 
      "description": "获取指定地点未来7天天气预报",
      "inputSchema": { "type": "object", "properties": { "location": { "type": "string" }, "days": { "type": "integer" } } },
      "outputSchema": { "type": "object", "properties": { "forecast": { "type": "array" } } }
    },
    { 
      "id": "weather:history", 
      "description": "查询指定时间段的历史气象数据",
      "inputSchema": { "type": "object", "properties": { "location": { "type": "string" }, "startDate": { "type": "string" }, "endDate": { "type": "string" } } }
    }
  ],
  "endpoint": "https://agents.example.com/weather/v1",
  "auth": {
    "type": "bearer",
    "tokenEndpoint": "https://auth.example.com/oauth2/token",
    "scopes": ["weather:read"]
  },
  "supportedFormats": ["application/json", "text/plain", "image/png"],
  "rateLimit": { "requestsPerMinute": 120, "burstSize": 10 },
  "healthCheck": "https://agents.example.com/weather/v1/health",
  "tags": ["weather", "meteorology", "public-data"]
}
```

> 💡 **关键创新**：Agent Card不仅包含静态元数据，还通过JSON Schema定义了每个能力的输入/输出格式（`inputSchema`/`outputSchema`），使编配器可以进行**编译期的类型检查**和**运行时的参数校验**，大幅减少Agent间的契约不匹配问题。

Agent Discovery流程如下：编配器启动时，从注册中心（可配置为静态列表、Consul/etcd服务发现或纯配置文件）获取Agent端点列表，并发请求各端点的`/.well-known/agent-card.json`，根据返回的capabilities构建能力矩阵。当编配器收到用户请求时，通过语义匹配或关键词检索找到合适的Agent，并根据其inputSchema组装任务参数。若Agent Card包含签名字段（`cardSignature`），编配器还需验证签名以确保清单未被篡改。

##### 3. 任务生命周期与状态管理

ACP定义了完整的Task生命周期，状态机如下图所示：

```python
# ACP Task 生命周期状态机伪代码实现
# 展示核心状态转换逻辑与错误处理路径

import uuid
import time
from enum import Enum
from typing import Dict, Optional, Callable

class TaskStatus(Enum):
    PENDING = "PENDING"
    	IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    CANCELLED = "CANCELLED"

# 合法状态转换矩阵
VALID_TRANSITIONS = {
    TaskStatus.PENDING: [TaskStatus.IN_PROGRESS, TaskStatus.CANCELLED],
    TaskStatus.IN_PROGRESS: [TaskStatus.COMPLETED, TaskStatus.FAILED, TaskStatus.CANCELLED],
    TaskStatus.COMPLETED: [],     # 终态，不可迁移
    TaskStatus.FAILED: [],        # 终态，不可迁移
    TaskStatus.CANCELLED: [],     # 终态，不可迁移
}

class ACPTask:
    def __init__(self, task_type: str, input_data: dict):
        self.task_id = str(uuid.uuid4())
        self.task_type = task_type
        self.input = input_data
        self.output: Optional[dict] = None
        self.error: Optional[str] = None
        self.status = TaskStatus.PENDING
        self.created_at = time.time()
        self.updated_at = time.time()
        self._observers: list[Callable] = []  # SSE订阅者回调
    
    def transition_to(self, new_status: TaskStatus) -> bool:
        """严格校验状态迁移合法性"""
        if new_status not in VALID_TRANSITIONS[self.status]:
            raise ValueError(
                f"非法状态迁移: {self.status} -> {new_status}. "
                f"允许的迁移: {VALID_TRANSITIONS[self.status]}"
            )
        self.status = new_status
        self.updated_at = time.time()
        self._notify_observers()
        return True
    
    def _notify_observers(self):
        """SSE推送：通知所有订阅者状态变更"""
        event_data = {
            "taskId": self.task_id,
            "status": self.status.value,
            "timestamp": self.updated_at
        }
        if self.output:
            event_data["output"] = self.output
        if self.error:
            event_data["error"] = self.error
        for observer in self._observers:
            observer(event_data)

class ACPOrchestrator:
    """简化版ACP编配器：负责任务创建、调度与状态追踪"""
    
    def __init__(self):
        self.tasks: Dict[str, ACPTask] = {}
    
    def create_task(self, task_type: str, input_data: dict) -> ACPTask:
        """对应 POST /tasks 端点"""
        task = ACPTask(task_type, input_data)
        self.tasks[task.task_id] = task
        # 异步提交执行
        self._schedule_execution(task)
        return task
    
    def _schedule_execution(self, task: ACPTask):
        """将任务提交到线程池或消息队列执行"""
        import threading
        t = threading.Thread(target=self._execute, args=(task,), daemon=True)
        t.start()
    
    def _execute(self, task: ACPTask):
        """任务执行核心逻辑"""
        try:
            task.transition_to(TaskStatus.IN_PROGRESS)
            
            # 这里调用实际Agent的HTTP端点或本地函数
            result = self._call_agent_capability(task.task_type, task.input)
            
            task.output = result
            task.transition_to(TaskStatus.COMPLETED)
        except Exception as e:
            task.error = str(e)
            task.transition_to(TaskStatus.FAILED)
    
    def get_task(self, task_id: str) -> Optional[ACPTask]:
        """对应 GET /tasks/{taskId} 端点"""
        return self.tasks.get(task_id)
    
    def cancel_task(self, task_id: str) -> bool:
        """对应 DELETE /tasks/{taskId} 端点"""
        task = self.tasks.get(task_id)
        if task and task.status in [TaskStatus.PENDING, TaskStatus.IN_PROGRESS]:
            return task.transition_to(TaskStatus.CANCELLED)
        return False
    
    def _call_agent_capability(self, task_type: str, input_data: dict) -> dict:
        """
        实际调用目标Agent能力
        此函数通过Agent Card中的endpoint和capabilities信息路由请求
        """
        # 伪代码：实际实现会根据任务类型选择Agent并发出HTTP请求
        # response = requests.post(f"{agent_endpoint}/invoke", json=payload)
        # return response.json()
        return {"result": f"executed {task_type} with {input_data}"}
```

状态转换严格遵循单向无环图（DAG）约束：任务从`PENDING`进入，必然经过`IN_PROGRESS`才能到达终态。这种设计确保了在分布式环境下，无论消息乱序、重试还是网络分区，任务状态始终遵循确定性的演化路径——即Lamport在分布式系统理论中强调的"共识可见性"原则。

##### 4. Message管道与双模通信机制

ACP的消息系统支持两种互补的通信模式，分别适用于不同的交互场景：

- **请求-响应模式（Request-Response）**：客户端通过`POST /messages`发送JSON消息，服务端同步返回响应。适用于短时任务（<5秒）和即时查询场景，如"查询今日天气"、"翻译以下文本"。该模式实现简单，可直接对接现有REST API网关和负载均衡器。

- **SSE流式模式（Server-Sent Events）**：客户端通过`GET /messages/stream?taskId={taskId}`建立长连接，服务端以`text/event-stream`格式持续推送任务进度、中间产物和状态变更事件。适用于长时间运行的Agent任务（如代码生成、多步推理、自动数据分析），客户端可实时展示进度条或流式渲染中间结果。

一条典型的ACP消息结构如下：

```json
{
  "messageId": "msg-abc123",
  "taskId": "task-xyz789",
  "sender": { "agentId": "weather-bot-01", "role": "assistant" },
  "recipient": { "agentId": "orchestrator-01" },
  "type": "progress_update",
  "content": {
    "summary": "已完成前3步气象数据分析，正在进行第4步——异常值检测...",
    "progress": { "current": 4, "total": 7, "percentage": 57.1 },
    "intermediateResult": {
      "step3_output": { "cleaned_records": 1420, "anomalies_detected": 3 }
    }
  },
  "timestamp": "2025-03-15T10:30:00Z",
  "correlationId": "corr-xyz"
}
```

SSE流式推送的事件格式遵循SSE标准规范，每条事件以`data:`前缀，以双换行符分隔：

```
event: task_progress
data: {"taskId":"task-xyz789","status":"IN_PROGRESS","progress":{"current":4,"total":7}}

event: task_progress
data: {"taskId":"task-xyz789","status":"IN_PROGRESS","progress":{"current":5,"total":7}}

event: task_complete
data: {"taskId":"task-xyz789","status":"COMPLETED","output":{...}}
```

##### 5. 与MCP、A2A的横向对比与生态定位

ACP并非尝试重新定义Agent间通信的所有层面，而是与现有的MCP（Anthropic提出）和A2A（Google提出）形成明确分工：

| 维度 | ACP (IBM) | MCP (Anthropic) | A2A (Google) |
|------|-----------|-----------------|--------------|
| **解决的核心问题** | Agent之间的任务协作编排 | LLM调用外部工具/数据源 | Agent对等通信与对话 |
| **通信层次** | Agent ↔ Agent（编排层） | LLM ↔ Tool（工具层） | Agent ↔ Agent（对等层） |
| **传输协议** | HTTP/1.1 | stdio / HTTP+SSE | gRPC / HTTP/2 |
| **消息格式** | ACP JSON Schema | JSON-RPC 2.0 | A2A Protocol Buffers |
| **发现机制** | Agent Card (/.well-known) | 客户端声明工具列表 | 服务注册与DNS-SD |
| **流式支持** | SSE | SSE | gRPC Bidirectional Stream |
| **安全模型** | TLS + OAuth2 + 卡片签名 | 依赖传输层安全 | mTLS + JWT |
| **复杂度** | 低（纯HTTP） | 低（stdio简单，HTTP中等） | 高（需gRPC基础设施） |
| **主要场景** | 企业异构Agent集成 | 单个LLM的工具增强 | 大规模Agent Mesh |

ACP的差异化竞争优势在于**极致的简单性**：不引入新的RPC框架、不绑定任何AI框架、不要求安装SDK。任何能够发送HTTP请求的程序（包括shell脚本、Excel插件、甚至IoT设备）都可以接入ACP网络。这一特性使得ACP特别适合大型企业环境中渐进式地治理和集成已有异构Agent系统。

> ⚠️ **注意**：ACP与MCP/A2A并非竞争关系，而是不同抽象层级的互补协议。一个典型的Agent系统可以同时实现这三种协议：MCP用于LLM连接外部工具（如数据库查询、API调用），ACP用于多个Agent之间的任务编排（如将用户请求拆分为子任务分派给各Agent），A2A用于Agent之间的对等协作（如两个Agent联合推理）。理解三者的定位差异，是设计现代Multi-Agent架构的关键。

##### 6. 安全设计深度解析

ACP在协议设计阶段就将安全作为一等公民（Security by Design），而非事后追加的补丁。其安全体系分为三道防线：

- **第一道防线——传输加密**：ACP强制要求所有通信通过TLS 1.3进行，禁止明文HTTP回退。Agent端点的Scheme必须为`https://`，编配器在发现阶段即会验证证书有效性。

- **第二道防线——身份认证与授权**：Agent Card中声明`auth.type`，支持`none`（仅限开发环境）、`bearer`（Bearer Token静态令牌）、`oauth2`（OAuth2动态令牌）三种模式。编配器在调用Agent能力前，需通过`auth.tokenEndpoint`获取短期访问令牌，并在每次HTTP请求中携带`Authorization: Bearer <token>`头。令牌建议具有短有效期（通常15分钟），并限定最小权限范围（scopes）。

- **第三道防线——内容完整性验证**：Agent Card可选携带`cardSignature`字段，包含使用Agent持有者私钥对Card内容的签名（如Ed25519）。编配器在缓存Card内容前验证签名，确保Agent的能力清单在传输或存储过程中未被恶意篡改。

这种分层安全架构使ACP可以直接融入企业现有的零信任安全体系（Zero Trust Architecture），与API网关、WAF、身份提供商（IdP）等现有基础设施无缝对接。

#### 🧪 练习题
```yaml
question: "ACP协议中，Agent Card的核心作用是什么？"
options:
  - "存储Agent的模型权重和训练数据，供其他Agent下载使用"
  - "作为Agent能力的自描述清单，支持自动化Agent发现与能力匹配"
  - "记录Agent与其他Agent之间的完整对话历史和消息日志"
  - "对Agent之间的消息传输进行端到端加密和数字签名"
answer: 1
explain: "Agent Card是ACP的发现机制基石。它暴露在/.well-known/agent-card.json路径，包含Agent的capabilities、endpoint、auth方式、输入输出Schema等信息，使编配器能够自动扫描和构建能力拓扑，从而无需人工硬编码Agent配置即可完成服务发现与任务路由。"
```
