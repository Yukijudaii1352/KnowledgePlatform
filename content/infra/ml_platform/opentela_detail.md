### OpenTela

```yaml
id: opentela
name: OpenTela
full_name: OpenTela
year: '2026'
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: inference_system
parent: vllm
motivation: 统一去中心化HPC集群的异构LLM推理系统
```

#### 📝 一句话总结

OpenTela 提出面向去中心化 HPC/云混合集群的 LLM serving overlay，用 P2P、CRDT 状态复制、身份组路由和用户态 Slurm/Kubernetes 适配，把分散异构 GPU 节点组织成一个可共享的推理资源池。

#### 🎯 核心要点

- 采用 decentralized compute fabric，而不是依赖单一 Kubernetes 控制面或中心调度器
- 通过 libp2p gossip + CRDT registry 复制 distributed node table，承载 peer、service、identity group、health、relay 等状态
- 路由入口为 `/v1/service/:service/*path`，按服务名和请求体中的 identity group 选择能服务指定模型的 worker
- 支持 exact、wildcard、catch-all 三层匹配，利用 `X-Otela-Fallback` 控制是否退化到更宽松的候选集合
- 提供 direct routing 与 relay-hop routing，适配 HPC 计算节点位于防火墙/NAT 后的常见部署
- 请求级调度内置 random、round-robin、shortest-queue，并把 fleet-level orchestration 留给外部控制环或 Fleet Manager
- 在 SwissAI 场景中连接 Alps 的 Slurm 子集群和 Kubernetes 子集群，支撑多模型、多租户、跨硬件的共享推理服务

#### 🔬 深入细节

![SwissAI OpenTela 架构图](https://raw.githubusercontent.com/eth-easl/OpenTela/main/docs/content/docs/assets/swissai-arch.png)
*图源：OpenTela 官方仓库文档中的 SwissAI 架构图。该图展示 API frontend、OpenTela overlay、Slurm/Kubernetes 子集群和 vLLM/SGLang 后端如何组成统一 serving 平台。*

```python
# OpenTela request routing and decentralized state sketch
def route_request(head, service, body, fallback_level, min_trust=0):
    table = head.crdt_node_table.snapshot()
    providers = [p for p in table.peers if p.provides(service)]

    exact = [p for p in providers if p.identity_matches(body, mode="exact")]
    wildcard = [p for p in providers if p.identity_matches(body, mode="wildcard")]
    catch_all = [p for p in providers if p.identity_matches(body, mode="all")]

    tiers = [exact]
    if fallback_level >= 1:
        tiers.append(wildcard)
    if fallback_level >= 2:
        tiers.append(catch_all)

    candidates = first_non_empty([trust_filter(t, min_trust) for t in tiers])
    worker = load_balancer.pick(candidates)  # random, round-robin, shortest-queue, or weighted

    if head.has_direct_libp2p_connection(worker):
        return p2p_forward(worker, f"/v1/_service/{service}", body)
    relay = worker.relay_peer
    return p2p_forward(relay, f"/v1/p2p/{worker.peer_id}/v1/_service/{service}", body)

def on_crdt_head_received(peer, cid):
    block = bitswap_fetch(peer, cid, timeout="5m")
    if block:
        local_node_table.merge(block.delta)
```

OpenTela 的问题设定很具体：很多科研和国家级 AI 基础设施不是云厂商式的单一弹性集群，而是由 Slurm HPC 队列、若干子集群、少量 Kubernetes 长跑服务和多种 GPU 架构组成。传统做法要求研究者自己准备环境、提交作业、等待排队、暴露服务并管理生命周期；同一个模型可能被多人重复启动，GPU 利用率和服务可达性都不好。OpenTela 的目标是在不要求 root 权限、不改内核、不把整套 HPC 纳入 Kubernetes 的前提下，给这些节点加一层“云式”的服务发现、路由、健康检查和共享访问。

系统核心状态是 distributed node table。每个 peer 在表中发布自己提供的 service、监听地址、identity group、trust/health、relay_peer 等元数据；CRDT 后端通过 Merkle-DAG head 与 PubSub/gossip 传播更新。可以把收敛过程抽象为：

$$
T_i^{(k+1)} = T_i^{(k)} \sqcup \Delta_j
$$

其中 \(T_i\) 是节点 \(i\) 当前看到的 node table，\(\Delta_j\) 是其他 peer 广播的新 delta，\(\sqcup\) 是 CRDT merge/join。即使某次 DAG block 因 peer 离线、NAT 或超时未取到，后续 gossip 仍能继续收敛；这比单中心 registry 更适合高 churn、预emptible、排队式 HPC 节点。

请求路由分两层完成。第一层是语义筛选：用户访问 head node 的 `/v1/service/llm/v1/chat/completions`，head 从 JSON body 读取 `model` 等字段，和 worker 注册的 `identity_group` 对比。候选集合可写成：

$$
C =
\begin{cases}
C_{\text{exact}}, & C_{\text{exact}}\neq\varnothing \\
C_{\text{wildcard}}, & L\ge 1 \land C_{\text{wildcard}}\neq\varnothing \\
C_{\text{all}}, & L\ge 2 \land C_{\text{all}}\neq\varnothing \\
\varnothing, & \text{otherwise}
\end{cases}
$$

这里 \(L\) 来自 `X-Otela-Fallback`。默认只接受 exact match，例如 `model=Qwen/Qwen3-8B`；开启 fallback 后才会退到 `model=*` 或 `all`。这种设计避免把不兼容模型的请求随机打到错误 worker，同时允许平台配置兜底模型或通用后端。

第二层是负载均衡与连通性处理。OpenTela 内置 random、round-robin 和 shortest-queue；`shortest-queue` 使用每个 peer 的 in-flight 请求数，等价于选择

$$
p^* = \arg\min_{p\in C} q_p
$$

其中 \(q_p\) 是该 peer 当前未完成请求数。若启用 weighted routing，还可以把候选分数 \(w_p\) 转成 \(P(p)=w_p/\sum_{c\in C}w_c\) 的随机选择。选中 worker 后，如果 head 与 worker 有直接 libp2p 连接，请求走 direct routing；如果 worker 在 HPC 防火墙后，则经 worker 注册的 relay peer 中转。对用户来说 endpoint 不变，这正是 overlay 的价值。

OpenTela 明确区分 request-level scheduling 和 fleet-level orchestration。前者在 head node 热路径内决定“这个请求给哪个 worker”；后者是外部 observe-decide-act 控制环，轮询 `/v1/dnt/table`、`/metrics`、`/v1/health` 等接口，再通过 Slurm 作业、云 VM、systemd 或 Fleet Manager 启停节点。这个边界让 OpenTela 不强行替代 HPC scheduler，而是把 Slurm 负责的资源分配和在线服务层需要的路由/发现/故障转移连接起来。

与 vLLM 的关系也很清楚：vLLM/SGLang 是单个模型实例内的推理引擎，负责 batching、KV cache 和 kernel；OpenTela 是跨节点、跨站点、跨 scheduler 的服务网络，负责把请求送到正确实例并让多个实例形成共享池。与 KServe 相比，OpenTela 不把 Kubernetes 作为唯一底座，反而把用户态 overlay 放在 Slurm 与 Kubernetes 之上，因此更适合不能长期独占节点、不能安装集群级组件的 HPC 环境。

> 💡 关键：OpenTela 的“算法”不是一个模型内调度公式，而是把分散节点状态建模成可收敛 CRDT，把模型可服务性建模成 identity group，把不可达 HPC 节点建模成 relay-hop，从而把批处理环境变成可交互推理平台。

#### 🧪 练习题

```yaml
question: "OpenTela 中 identity group 路由的主要目的是什么？"
options:
  - "按请求中的模型等语义字段筛选能处理该服务的 worker"
  - "压缩 KV cache"
  - "替代 vLLM 的 attention kernel"
  - "强制所有节点迁移到 Kubernetes"
answer: 0
explain: "identity group 让 worker 声明自己能服务的模型或服务类型；head node 根据请求体和 fallback 级别选择 exact、wildcard 或 catch-all 候选。"
```
