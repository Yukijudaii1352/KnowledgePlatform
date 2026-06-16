### Dynamo: NVIDIA Dynamo (Dynamo)

```yaml
id: dynamo
name: Dynamo
full_name: NVIDIA Dynamo (Dynamo)
year: '2026.03'
org: NVIDIA
paper_url: https://github.com/ai-dynamo/dynamo
category: engine
parent: trt_llm
motivation: 开源分布式推理框架支持PD物理解耦
```

#### 📝 一句话总结

NVIDIA Dynamo 提出了面向数据中心规模生成式 AI 推理的分布式运行框架，通过 prefill/decode 物理解耦、KV-aware routing、KVBM、NIXL 和 Planner 控制回路，把单机推理后端扩展为可弹性调度、可复用 KV、可跨节点传输状态的生产级 serving 系统。

#### 🎯 核心要点

- 将 serving 拆成 Request Plane、Control Plane、Storage & Events Plane，分别处理请求执行、容量规划和 KV 状态传播
- 支持 PD disaggregation：Prefill worker 计算 prompt KV，Decode worker 接收 KV 后持续生成 token
- Router 同时考虑 worker 负载和 KV overlap，避免简单 round-robin 导致的 KV cache 重算
- Planner 根据 TTFT、ITL、GPU capacity、队列长度和流量形态决定 prefill/decode 资源比例与扩缩容目标
- KVBM 管理 KV block 的复用、驱逐、offload/recall，并把 GPU HBM、CPU DRAM、SSD、远端存储组织成多级缓存
- NIXL 为 prefill/decode worker 之间的 KV handoff 提供异步、低延迟、跨互连的数据传输抽象
- 后端无关，可集成 TensorRT-LLM、vLLM、SGLang、PyTorch 等推理引擎，并支持 Kubernetes/Grove、Gateway、故障检测和请求迁移

#### 🔬 深入细节

![Dynamo 官方三平面架构图](https://raw.githubusercontent.com/ai-dynamo/dynamo/main/docs/assets/img/dynamo-architecture.svg)
*图：Dynamo GitHub 设计文档中的架构图，展示 Request Plane、Control Plane、Storage & Events Plane 及其组件关系。来源：ai-dynamo/dynamo 官方仓库。*

![NVIDIA Dynamo PD 解耦架构图](https://developer-blogs.nvidia.com/wp-content/uploads/2025/03/inference-nvidia-dynamo-architecture-diagram-r2.png)
*图：NVIDIA 技术博客 Figure 3，展示 API Server、Smart Router、disaggregated serving、Prefill/Decode worker 与 NIXL 数据传输。来源：NVIDIA Developer Blog。*

```python
# Dynamo PD-disaggregated serving sketch
def serve(request):
    frontend.validate_and_normalize(request)

    prefill_worker = router.pick_prefill(
        request,
        score=lambda w: capacity(w) - queue_delay(w) + kv_overlap(request, w),
    )
    kv_meta = prefill_worker.prefill(request.prompt_tokens)
    publish_kv_event(request.id, kv_meta, location=prefill_worker)

    decode_worker = router.pick_decode(
        request,
        score=lambda w: capacity(w) - queue_delay(w) - transfer_cost(kv_meta, w),
    )
    nixl.transfer(kv_meta, src=prefill_worker, dst=decode_worker)
    kvbm.register(request.id, kv_meta, owner=decode_worker)

    for token in decode_worker.stream_decode(request.decode_params):
        frontend.stream(token)
        kvbm.update_generated_blocks(request.id, token)

    kvbm.release_or_retain(request.id, policy="reuse-aware")
```

Dynamo 的核心定位不是替代 TensorRT-LLM 或 vLLM 的单机 kernel/runtime，而是在这些后端之上补齐分布式推理系统层。GitHub 设计文档把它拆成三条路径：Request Plane 负责 Frontend、Router、Prefill worker、Decode worker 的低延迟请求流；Control Plane 负责 Planner、Operator、Discovery、Grove/KAI 等容量与拓扑控制；Storage & Events Plane 负责 KV Events、KVBM 和 NIXL，把 cache 的位置、生命周期和跨节点移动显式化。

PD 解耦来自 prefill 与 decode 的资源特征差异。Prefill 对长 prompt 做大矩阵并行，通常更 compute-bound；decode 每步只生成少量 token，但要频繁读取全部历史 KV，通常更 memory-bandwidth-bound。把二者放在同一 GPU 池会造成资源互相干扰。Dynamo 将一次请求拆成：

$$
\mathrm{request} = \mathrm{prefill}(P) \rightarrow \mathrm{transfer}(\mathrm{KV}(P)) \rightarrow \mathrm{decode}(Y\mid P)
$$

并允许 prefill 与 decode 使用不同并行策略、不同 GPU 数、不同扩缩容节奏。一个请求是否值得 PD 解耦，可用近似不等式判断：

$$
T_{\mathrm{prefill}} + T_{\mathrm{transfer}}(\mathrm{KV}) + T_{\mathrm{decode}} + T_{\mathrm{queue}}^{PD}
<
T_{\mathrm{agg}} + T_{\mathrm{queue}}^{agg}
$$

如果 prompt 很短或 KV transfer 代价过高，聚合式执行可能更好；如果 ISL 长、OSL 长或集群负载不均，PD 解耦更容易提升吞吐并稳定 TTFT/ITL。这也是 Dynamo Planner 存在的原因：它不是静态规定所有请求都走某种模式，而是根据 live metrics 和 SLO 调整资源。

KV handoff 是 PD 解耦的技术关键。Prefill worker 计算出的 \(\mathrm{KV}(P)\) 可能很大，近似字节数为：

$$
M_{\mathrm{KV}}\approx 2 \cdot L \cdot H_{kv} \cdot d_{\mathrm{head}} \cdot |P| \cdot b
$$

其中 \(L\) 是层数，\(H_{kv}\) 是 KV head 数，\(d_{\mathrm{head}}\) 是 head 维度，\(b\) 是元素字节数。若每个请求都把这些 KV 通过慢路径复制，PD 的排队收益会被 transfer 抵消。Dynamo 用 NIXL 抽象 HBM、DRAM、SSD、对象存储和网络传输路径，统一 UCX、GPUDirect、S3/custom backend 等数据移动语义，并让传输异步化，从而把 KV 从 prefill 池交到 decode 池。

Smart Router 解决的是“请求应该送到哪里”。普通负载均衡只看队列长度或 worker 数，容易把一个能复用 KV 的请求发到没有 cache 的 worker，导致重复 prefill。Dynamo Router 维护集群级 KV 可见性，对请求 token 做 overlap 估计，并把 cache 命中、队列深度和传输成本合成路由分数：

$$
\mathrm{score}(r,w)=
\alpha\cdot \mathrm{overlap}(r,w)
-\beta\cdot \mathrm{queue}(w)
-\gamma\cdot \mathrm{transfer}(r,w)
+\delta\cdot \mathrm{capacity}(w)
$$

实际实现会比这个式子复杂，但直觉一致：命中更多前缀、队列更短、KV 更近、容量更充足的 worker 更优。这样 Dynamo 可以服务多轮聊天、agent workflow、重复系统 prompt、相似 RAG 查询等高复用流量。

KVBM 把 KV cache 从“单 worker 私有显存状态”提升为系统资源。GPU HBM 最快但最贵，CPU DRAM、local SSD、NFS/对象存储更便宜但延迟更高。KVBM 根据访问频率、复用潜力、显存压力和策略，把 block 保留在 HBM、offload 到较低层级或 recall 回来。其目标不是盲目缓存全部 KV，而是在过度缓存带来的 lookup/offload 成本和缓存不足带来的重算成本之间取平衡。

Control Plane 让这个系统能在生产中运行。Planner 消费指标，输出 prefill/decode worker 的目标容量；Kubernetes 模式下 Operator 根据 DynamoGraphDeployment 等 CRD 协调资源；Grove/KAI 提供 topology-aware placement，使 worker group 能按机架、NVLink/NVSwitch、节点和 NUMA 约束成组放置。2026 年 3 月的 Dynamo 1.0 生产化资料还强调了 ModelExpress 权重流式加载、Inference Gateway 插件、故障检测、请求取消与迁移等能力，说明 Dynamo 的边界已经从“PD 原型”扩展到“多节点推理平台”。

与 TensorRT-LLM 的关系是上下层互补：TensorRT-LLM 擅长在 NVIDIA GPU 上把单模型/单节点或多节点执行做到极致；Dynamo 关注跨 worker 的路由、KV 生命周期、PD 编排、资源规划和故障恢复。与只做单机 continuous batching 的 serving 引擎相比，Dynamo 的创新点在于把“KV 是可移动、可复用、可调度的分布式状态”作为系统设计中心。

> ⚠️ 注意：PD 解耦不是免费收益。若 KV 传输慢、prefix 复用低、decode 队列空闲或 prompt 很短，额外的 transfer 与调度成本可能抵消收益；Dynamo Planner/Router/KVBM 的价值正是动态判断这些权衡。

#### 🧪 练习题

```yaml
question: "Dynamo 中 PD disaggregation 的主要目的是什么？"
options:
  - "将 prefill 和 decode 放到可独立扩缩容的 worker 池，并通过 KV transfer 衔接"
  - "把所有模型权重都移动到 CPU 上执行，完全避免 GPU 通信"
  - "只优化 tokenizer，不改变推理执行路径"
  - "用训练任务替代在线推理任务"
answer: 0
explain: "Prefill 和 decode 的计算/带宽特征不同，Dynamo 将二者物理解耦，并用 Router、KVBM、NIXL 管理 KV 状态和跨 worker handoff。"
```
