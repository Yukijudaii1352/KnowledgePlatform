### vLLM v1: vLLM v1 (vLLM v1)

```yaml
id: vllm_v1
name: vLLM v1
full_name: vLLM v1 (vLLM v1)
year: '2026'
org: vLLM社区
paper_url: https://github.com/vllm-project/vllm
category: engine
parent: vllm
motivation: V2架构零泡沫异步调度
```

#### 📝 一句话总结

vLLM v1 是 vLLM 对核心 serving 引擎的重构：把 scheduler、KV cache manager、worker、sampler 和 API server 重新组织到更简单的 EngineCore/worker 架构中，用统一 token budget 调度、增量状态同步、默认 prefix caching 和异步 single-step 思路减少 CPU 调度气泡。它继承 PagedAttention/continuous batching 的内核基础，但主要创新点转向“让 GPU 不等 Python 和控制面”。

#### 🎯 核心要点

- EngineCore 重构：将核心执行循环聚焦在 scheduler 与 model executor，并与 tokenization、detokenization、streaming、API server 等 CPU-heavy 路径重叠。
- 统一 scheduler：不再把 prefill 和 decode 作为两类特殊阶段，而是用 `{request_id: num_tokens}` 表示每步给每个请求分配的 token 数。
- 默认 chunked prefill：固定 token budget 下，长 prompt 可以被切成多步，与 decode 请求共同排队，降低长上下文请求对延迟的阻塞。
- 近零开销 prefix caching：优化 hash/LRU 数据结构和 Python object 创建，使 cache hit 低时也不会明显拖慢吞吐。
- Stateful SPMD workers：worker 侧缓存请求状态，driver/scheduler 每步只发送增量 diff，降低 tensor-parallel 输入广播和 IPC 开销。
- Persistent Batch 输入准备：复用上一轮输入张量和 block table，只对新增 token、block 和请求状态做增量更新。
- `torch.compile` 与 piecewise CUDA graphs：减少 eager 执行和 CUDA launch 开销，同时保留对多模型、多形状的兼容性。

#### 🔬 深入细节

![vLLM v1 统一 token budget 调度图](https://vllm.ai/blog-assets/figures/v1/v1_scheduling.png)
*图：vLLM 官方 V1 博客中的 scheduler 示例。每一步 scheduler 输出 `{request_id: num_tokens}`，把 prompt token 与 output token 都纳入同一个 token budget。来源：https://vllm.ai/blog/2025-01-27-v1-alpha-release*

```python
# vLLM V1 / RFC-style async single-step scheduling（简化）
engine = EngineCore(scheduler, kv_cache_manager, model_executor)
pending_gpu_future = None

while engine.running:
    engine.ingest_api_events_nonblocking()

    # 当 GPU 正在执行第 n 步时，CPU 侧尽量准备第 n+1 步
    budget = scheduler.token_budget()
    plan = scheduler.schedule(
        running_requests=engine.running_requests,
        waiting_requests=engine.waiting_requests,
        kv_budget=kv_cache_manager.free_blocks(),
        max_tokens=budget,
    )  # e.g. {"r1": 1, "r2": 1, "r3": 8}

    input_diff = build_incremental_inputs(plan, persistent_batch=True)
    kv_cache_manager.reserve(plan)

    if pending_gpu_future is not None:
        completed = pending_gpu_future.poll_or_wait_if_needed()
        scheduler.commit_outputs(completed)
        kv_cache_manager.commit(completed)

    pending_gpu_future = model_executor.submit(input_diff)
```

vLLM v1 的核心不是把 PagedAttention 换成另一个 attention，而是把 **控制面成本纳入一等优化目标**。当 H100/B200 上小模型一次 forward 只需要几毫秒时，API server、调度、输入准备、detokenization、streaming 和 Python object 维护都会显得很重。V1 把核心循环收敛为 EngineCore，使它只处理 scheduler 与 model executor；API server 和文本处理等工作通过多进程/异步路径与模型执行重叠。用一个简化式子看，单步时间不再近似为 \(T_{\text{gpu}}+T_{\text{cpu}}\)，而希望变成：

$$
T_{\text{step}}\approx \max(T_{\text{gpu}}, T_{\text{cpu-hidden}})
$$

当 CPU 准备第 \(n+1\) 步能和 GPU 执行第 \(n\) 步重叠时，GPU idle fraction 近似从 \(\frac{T_{\text{cpu}}}{T_{\text{gpu}}+T_{\text{cpu}}}\) 下降到 \(\frac{\max(0,T_{\text{cpu}}-T_{\text{gpu}})}{\max(T_{\text{gpu}},T_{\text{cpu}})}\)。这就是任务元信息里“零泡沫异步调度”的工程含义：不是没有任何 CPU 工作，而是尽量让 CPU 工作不出现在 GPU critical path 上。

统一 scheduler 是第二个关键点。V0 时代很多逻辑围绕 prefill/decode 两阶段展开，chunked prefill、prefix caching、speculative decoding 往往各自引入特殊路径。V1 把调度决策压缩成 token 分配：

$$
\sum_{r\in \mathcal{B}}\Delta_r \le B,\quad \Delta_r\in\mathbb{Z}_{\ge 0}
$$

其中 \(B\) 是本步 token budget，\(\Delta_r\) 是请求 \(r\) 在本步处理的 token 数。prompt token 和 decode token 都只是“待处理 token”，因此长 prompt 可以被切片，decode 请求也能穿插执行。KV cache manager 再根据 block size 计算新增 block：

$$
\operatorname{new\_blocks}_r=\left\lceil\frac{\operatorname{cached}_r+\Delta_r}{b}\right\rceil-\left\lceil\frac{\operatorname{cached}_r}{b}\right\rceil
$$

这让 scheduler、prefix cache 和 PagedAttention 的 block 分配在同一套预算模型下工作。

第三个机制是 **stateful worker + diff 同步**。在 tensor parallel 场景里，如果 scheduler 每步都向所有 worker 广播完整 request metadata、token IDs、block table 和 sampling params，IPC 和 Python 序列化会快速膨胀。V1/RFC 的设计让 worker 保存大部分请求状态，driver 只发送新增请求、已调度请求 ID、新 block ID 等增量。这个设计的直觉类似数据库 WAL：完整状态留在 worker，本步只传“变化”。它同时让单 GPU 和多 GPU worker 的执行路径更对称，降低 Worker 0 与 scheduler 共址这类历史优化造成的架构复杂度。

第四个机制是 **把缓存优化默认化**。V1 的 prefix caching 仍然基于 hash 和 LRU，但重点是把 eviction 做到常数时间、减少 Python object 创建，并在 cache hit rate 为 0% 时也维持接近零额外开销。因此 prefix caching 可以默认打开，命中共享系统 prompt、RAG 文档、多轮上下文时获得收益，未命中时也不明显拖慢请求。Persistent Batch 同理：上一轮输入张量和 block table 不是每步重建，而是按 diff 更新，从而降低模型越来越快后暴露出的 CPU 准备成本。

与原始 vLLM 相比，v1 的边界更清楚：vLLM 早期论文贡献是 PagedAttention 和 continuous batching，把 KV cache 当作分页内存管理，解决高并发内存碎片和 batch 组织问题；V1 则是在这些 kernel 与内存机制之上重构执行引擎，目标是把 chunked prefill、prefix caching、spec decode、多模态预处理、tensor parallel 和 CUDA graph 等功能放进统一架构。它不是单个新 kernel，而是一套降低 CPU overhead、减少 GPU 空泡并提升可维护性的 serving runtime。

#### 🧪 练习题

```yaml
question: "vLLM v1 统一 scheduler 中 `{request_id: num_tokens}` 的主要作用是什么？"
options:
  - "把 prefill token 和 decode token 统一成同一种预算资源，便于 chunked prefill、prefix caching 和 speculative decoding 共享调度路径"
  - "强制每个请求每步只能生成一个 token"
  - "替代 KV cache，不再需要 block table"
  - "只用于统计 API server 的 HTTP 请求数"
answer: 0
explain: "V1 用固定 token budget 给请求分配本步处理量，避免 prefill/decode 两套特殊逻辑，使调度和 KV block 分配可以统一优化。"
```
