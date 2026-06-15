### OpenTela

```yaml
id: opentela
name: OpenTela
full_name: OpenTela
year: "2026"
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: inference_system
parent: vllm
motivation: 统一去中心化HPC集群的异构LLM推理系统
```

#### 📝 一句话总结

OpenTela 面向去中心化 HPC 集群上的异构 LLM 推理，提供统一资源编排和 serving 层，使分散的 Slurm/HPC/GPU 资源能够作为一个弹性推理平台服务模型请求。

#### 🎯 核心要点

- 目标是统一多个去中心化 HPC 集群和云/本地 GPU 资源，而非假设单一 Kubernetes 集群
- 为 LLM serving 提供资源发现、模型启动、路由和弹性扩缩容控制面
- 适配 Slurm、FirecREST 等 HPC 接口，并与 SwissAI 等实际平台结合
- 处理异构 GPU、队列等待、节点生命周期和跨集群网络差异
- 对上层暴露统一 serving API，屏蔽底层资源位置和调度系统差异

#### 🔬 深入细节

> 图示说明：公开 GitHub/OSDI 信息可概括的架构为：OpenTela 控制面连接多个 HPC/云集群适配器，按模型需求启动 vLLM 等后端实例，再通过统一 API/路由层暴露服务。

```python
# OpenTela 异构集群推理编排伪代码
clusters = discover_hpc_and_cloud_clusters()
while True:
    demand = observe_serving_load()
    plan = place_model_replicas(demand, clusters, gpu_types, queue_delay, network)
    for replica in plan.to_launch:
        submit_job(replica.cluster, backend='vllm', model=replica.model)
    router.update_endpoints(healthy_replicas())
    scale_down_idle_or_expensive_replicas()
```

很多科研/国家级 AI 基础设施不是单一云原生集群，而是多个 HPC 站点、Slurm 队列和异构 GPU 分散存在。直接在这种环境中运行在线 LLM serving，会遇到资源发现、排队、网络和运维接口不统一的问题。

OpenTela 的目标是提供横跨这些环境的 serving 控制面。它需要理解每个集群可用 GPU、队列状态、模型副本启动方式和健康状态，并把这些差异隐藏在统一 API 后。

与 KServe 相比，OpenTela 不假设 Kubernetes 是唯一底座；与 vLLM 相比，它不是单个推理引擎，而是跨集群编排层，可以启动和管理 vLLM/TGI 等后端。

对去中心化 HPC 而言，弹性不只是增加 Pod 副本，还包括在不同站点申请资源、等待队列、处理节点租期和故障。OpenTela 的价值在于把这些系统问题纳入 LLM serving 平台。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "OpenTela 与 KServe 的关键差异是什么？"
options:
  - "OpenTela 面向去中心化 HPC/异构集群，不只假设单一 Kubernetes 环境"
  - "OpenTela 只做图像训练"
  - "OpenTela 不涉及模型服务"
  - "OpenTela 是一种优化器"
answer: 0
explain: "OpenTela 重点统一多个 HPC/云资源池上的 LLM serving。"
```
