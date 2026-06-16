### TensorRT-LLM: TensorRT推理库 (TensorRT-LLM)

```yaml
id: trt_llm
name: TensorRT-LLM
full_name: TensorRT推理库 (TensorRT-LLM)
year: '2024'
org: NVIDIA
paper_url: https://github.com/NVIDIA/TensorRT-LLM
category: engine
parent: —
motivation: 深度适配NVIDIA硬件的极致性能库
```

#### 📝 一句话总结

TensorRT-LLM 提出了面向 NVIDIA GPU 的端到端 LLM 推理栈，把模型构建、专用 kernel、KV cache 管理、continuous batching、多 GPU 并行和量化部署整合到同一套运行时中，解决通用 PyTorch/服务框架难以榨干硬件吞吐的问题。

#### 🎯 核心要点

- 以 `LLM` API、PyTorch-native model authoring 和 TensorRT/TensorRT-LLM runtime 统一模型定义、构建与服务部署
- `PyExecutor` 后台循环由 Scheduler、KVCacheManager、ModelEngine、Sampler 组成，负责异步请求调度、KV 分配、GPU forward 和采样
- In-flight batching 将 context/prefill 阶段和 generation/decode 阶段混合进同一批次，减少等待并提升 GPU 利用率
- Paged KV cache 将每层 KV 拆成固定 token block，由 cache manager 按需分配、复用、回收，缓解长短请求混跑造成的显存浪费
- 针对 NVIDIA GPU 提供 fused attention、GEMM、RMSNorm、sampling、CUDA Graph、Overlap Scheduler 等软硬件协同优化
- 支持 FP8、NVFP4/FP4、INT4 AWQ、INT8 SmoothQuant、FP8 KV cache 等低精度路径，降低显存和带宽压力
- 支持 tensor parallel、pipeline parallel、expert parallel、multi-node serving、LoRA、guided decoding、speculative decoding 等生产部署特性

#### 🔬 深入细节

![TensorRT-LLM 官方架构图](https://nvidia.github.io/TensorRT-LLM/_images/TRTLLM_Architecture_Overview.png)
*图：TensorRT-LLM 官方文档的 Architecture Overview，展示 `LLM` API、PyExecutor、Scheduler、KVCacheManager、ModelEngine 与 Sampler 的请求执行路径。来源：NVIDIA TensorRT-LLM documentation。*

```python
# TensorRT-LLM executor loop sketch
engine = build_or_load_model_engine(model, plugins, quantization, parallelism)
kv_manager = KVCacheManager(block_size=kv_block_size, reuse=True, offload=True)
scheduler = Scheduler(max_batch_size=max_batch_size, max_num_tokens=max_num_tokens)
sampler = Sampler(default_sampling_params)

while server.is_running():
    new_requests = request_queue.poll()
    scheduler.add(new_requests)

    batch = scheduler.select_ready(
        prefer_decode=True,
        allow_context_and_decode_together=True,
        token_budget=max_num_tokens,
    )
    kv_manager.allocate_or_reuse_prefix_blocks(batch)

    packed_tokens, block_tables = pack_without_padding(batch, kv_manager)
    logits = engine.forward(
        packed_tokens,
        kv_cache_blocks=block_tables,
        cuda_graph=graph_cache.match_or_pad(batch.shape),
    )

    next_tokens = sampler.sample(logits, batch.sampling_params)
    kv_manager.append_generated_tokens(batch, next_tokens)
    scheduler.finish_or_reschedule(batch, next_tokens)
    stream_tokens_to_clients(batch, next_tokens)
```

TensorRT-LLM 不是单个算法 kernel，而是一套“构建期 + 运行期”的推理系统。构建期把 HuggingFace/NeMo/自定义权重映射到 TensorRT-LLM 的模型表示，选择并行策略、量化策略、插件 kernel 和 shape/profile；运行期则通过 `LLM.generate()` 或 serving API 接收请求，由每个 rank 上的 `PyExecutor` 持续执行调度循环。这个分层设计的核心好处是把模型作者接口留在 Python/PyTorch 侧，把真正昂贵的 attention、GEMM、通信、采样和 KV 管理放到更贴近 CUDA/TensorRT 的执行层。

Transformer 自回归推理的重复计算主要来自 attention。第 \(l\) 层在第 \(t\) 个 token 的注意力可写成：

$$
\mathrm{Attn}_{l,t}=\mathrm{softmax}\left(\frac{q_{l,t}K_{l,\le t}^{\top}}{\sqrt{d}}\right)V_{l,\le t}
$$

其中 \(K_{l,\le t}\) 和 \(V_{l,\le t}\) 是历史 token 的 key/value。没有 KV cache 时，每生成一个 token 都要重新计算历史 token 的 key/value；TensorRT-LLM 把这些中间状态保存在每层 cache 中，只为新 token 追加 \(K_{l,t},V_{l,t}\)。若模型有 \(L\) 层、KV head 数为 \(H_{kv}\)、head 维度为 \(d\)、每个元素 \(b\) 字节、上下文长度为 \(T\)，单请求 KV 近似显存为：

$$
M_{\mathrm{KV}}\approx 2 \cdot L \cdot H_{kv} \cdot d \cdot T \cdot b
$$

这解释了为什么 KV cache 是长上下文服务的显存瓶颈，也解释了 TensorRT-LLM 为什么把 KVCacheManager 作为一等组件。

Paged KV cache 的机制类似把一条变长序列切成固定大小的 block。连续 KV cache 会按 `max_seq_len` 为所有请求预留大张量，短请求和提前结束的请求会留下大量空洞；paged KV cache 只在请求推进时从 block pool 分配新块，完成后回收。TensorRT-LLM 还支持跨请求前缀复用、优先级/LRU 驱逐、offload 等策略，因此同一个系统既能服务短问答，也能服务长 prompt 或多轮对话。直觉上，调度器看到的是逻辑 token 序列，kernel 看到的是压缩后的 block table，从而用一次间接寻址换取更高的显存利用率。

In-flight batching 解决的是服务端吞吐问题。传统静态 batching 往往等待一批请求到齐，并把 prefill 和 decode 分开跑；LLM serving 中 decode 每步通常只有一个新 token，若单独成批容易 GPU 利用率低。TensorRT-LLM 允许 context 阶段请求与 generation 阶段请求在同一迭代中执行，并用两个约束控制批次大小：

$$
|B| \le \mathrm{max\_batch\_size}, \qquad
\sum_{r\in B}\mathrm{tokens}(r) \le \mathrm{max\_num\_tokens}
$$

这里 \(\mathrm{tokens}(r)\) 对 prefill 请求是待处理 prompt token 数，对 decode 请求通常是 1 个或少量 token。调度器优先保证正在 decode 的请求能稳定产出 token，再用剩余 token budget 填入新的 prefill 请求。配合 remove input padding，输入 token 被 packed 成紧凑张量，避免把 decode 阶段的 1-token 请求 padding 到最长 prompt 长度。

性能收益还来自 kernel 和 runtime 的组合优化。TensorRT-LLM 的 ModelEngine 调用针对 NVIDIA 架构优化的 attention/GEMM/normalization/sampling 路径；CUDA Graph 将固定形状的 kernel launch 序列捕获为图，降低 Python 和 driver 的发射开销；Overlap Scheduler 则把第 \(n+1\) 步 GPU forward 提前发射，让 CPU 在 GPU 工作时处理第 \(n\) 步的停止条件、采样状态和响应更新。对在线服务而言，这类优化通常比单个 kernel 峰值更关键，因为端到端延迟还包含调度、采样、内存管理和网络流式返回。

量化是 TensorRT-LLM 深度适配硬件的另一条主线。FP8/FP4/NVFP4 降低权重、激活和 KV cache 的字节数，INT4 AWQ/GPTQ 侧重权重量化，FP8 KV cache 则直接降低 decode 阶段的 HBM 带宽压力。可粗略把 decode 的瓶颈看成：

$$
T_{\mathrm{decode}} \approx \max(T_{\mathrm{compute}}, T_{\mathrm{HBM}} + T_{\mathrm{comm}})
$$

当模型已经接近 memory-bound 时，降低 \(T_{\mathrm{HBM}}\) 往往比继续堆算力更有效；但量化也会引入精度校准、kernel 支持和不同 GPU 架构兼容性问题，因此 TensorRT-LLM 把量化 recipe、模型支持矩阵和硬件支持矩阵放在部署流程中统一处理。

与 vLLM、SGLang 等通用开源 serving 引擎相比，TensorRT-LLM 的定位更靠近 NVIDIA 软硬件栈的“极致性能库”。它不只做请求调度，也把 Tensor Core、NVLink/NCCL、TensorRT engine、CUDA Graph、低精度格式和多种并行策略纳入同一个优化空间。代价是部署通常更依赖 NVIDIA GPU 版本、容器、驱动和模型支持路径；收益是在 Hopper/Blackwell 等硬件上更容易获得低延迟、高吞吐和可预测的生产性能。

#### 🧪 练习题

```yaml
question: "TensorRT-LLM 中 in-flight batching 的关键作用是什么？"
options:
  - "把 context 阶段和 generation 阶段请求混合调度，提高 GPU 利用率并降低等待"
  - "把所有请求 padding 到同一最大长度，简化显存管理"
  - "只保留 CPU 上的 KV cache，避免占用 GPU 显存"
  - "用训练时的反向传播来提升推理精度"
answer: 0
explain: "In-flight batching 又称 continuous/iteration-level batching，它允许 prefill 与 decode 请求在同一迭代中共享 token budget，从而减少空转和排队。"
```
