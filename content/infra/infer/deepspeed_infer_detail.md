### DeepSpeed-Inference: DeepSpeed推理 (DeepSpeed-Inference)

```yaml
id: deepspeed_infer
name: DeepSpeed-Inference
full_name: DeepSpeed推理 (DeepSpeed-Inference)
year: '2022'
org: Microsoft
paper_url: https://arxiv.org/abs/2207.00032
category: engine
parent: —
motivation: 异构存储卸载支持万亿参数模型推理
```

#### 📝 一句话总结

DeepSpeed-Inference 把面向推理的 Transformer kernel、张量/流水/专家并行和 ZeRO-Inference 异构卸载组合成一个系统，使从低延迟在线推理到资源受限的百亿、千亿乃至万亿参数模型推理都能落地。

#### 🎯 核心要点

- DeepSpeed Transformer 面向 GPU-only 场景，优化小 batch 低延迟和大 batch 高吞吐两类推理负载。
- Deep-Fusion 融合 LayerNorm、transpose、Attention 周边、bias/residual 等多类非 GeMM 操作，减少 kernel launch 和全局内存往返。
- SBI-GeMM 针对 small-batch inference 的 skinny GEMM 设计权重布局、tiling 和 cooperative-group reduction，提高有效内存带宽。
- 多 GPU dense transformer 结合 tensor parallelism 与 inference-optimized pipeline schedule，用 aggregate memory bandwidth 降低超大 dense 模型延迟。
- DeepSpeed-MoE 结合 expert parallelism、expert slicing、data/tensor parallelism 和 all-to-all 通信优化，服务稀疏 MoE 模型。
- ZeRO-Inference 使用 GPU + CPU + NVMe 异构存储，按层预取权重并把 GPU 显存更多留给激活和大 batch，支持 GPU 显存放不下的模型。

#### 🔬 深入细节

![DeepSpeed-Inference kernel 与 Deep-Fusion 图示](https://ar5iv.labs.arxiv.org/html/2207.00032/assets/x1.png)
*图：ar5iv 从论文生成的 Figure 1，展示 small-batch GeMM 调度、权重布局变换和 Deep-Fusion 策略。*

```python
# DeepSpeed-Inference 执行路径概念化伪代码
engine = DeepSpeedInferenceEngine(
    model,
    tensor_parallel_size=tp,
    pipeline_parallel_size=pp,
    kernel_injection=True,
    zero_inference=offload_to_cpu_or_nvme,
)

for request_batch in serving_loop():
    hidden = embed(request_batch.tokens)
    for stage in pipeline_stages:
        for layer in stage.layers:
            if zero_inference:
                prefetch(layer.weights, dst="gpu")

            hidden = deepspeed_transformer_kernel(
                hidden,
                layer.weights,
                kv_cache=request_batch.kv_cache,
                fused_ops=["layernorm", "qkv", "attention_io", "mlp", "residual"],
            )

            if zero_inference:
                evict_or_stream_next(layer.weights)
        hidden = send_to_next_pipeline_stage(hidden)
    emit_next_tokens(sample(hidden))
```

DeepSpeed-Inference 先把问题拆成两类：如果模型能放进聚合 GPU 显存，关键是低延迟和吞吐；如果模型放不进 GPU，关键是可行性和异构带宽利用。在线生成常用小 batch，此时延迟下界接近“把所有权重从显存读到计算单元”的时间，训练时代码常用的大 batch GEMM 并不合适。论文因此提出 DeepSpeed Transformer，用推理专用 kernel、CUDA Graph、张量并行和流水并行来最大化 memory bandwidth utilization，而不是只追求训练式的高算力占用。

Deep-Fusion 的设计直觉是：Transformer 层里很多耗时不来自大矩阵乘本身，而来自小算子的 kernel launch、全局内存写回和再读取。普通 fusion 多停留在 element-wise 操作；Deep-Fusion 以 tile 为单位分析依赖，只要第二个算子的每个 tile 只依赖第一个算子的一个输出 tile，就可以把 reduction、transpose、LayerNorm、部分 GeMM 周边逻辑一起放入同一 kernel。对一个 Transformer block，可近似写成：

$$
Y = X + W_o\operatorname{Attn}(W_q\operatorname{LN}(X), W_k\operatorname{LN}(X), W_v\operatorname{LN}(X))
$$

Deep-Fusion 的目标不是改变这个函数，而是把 \(\operatorname{LN}\)、QKV 投影前后的 layout 变换、attention 输出投影附近的数据搬运合并，减少中间张量写入 HBM 的次数。

SBI-GeMM 解决的是 small-batch skinny matrix multiplication。生成式推理的 token 数很少，矩阵形状常接近 \([B,H]\times[H,4H]\)，其中 \(B\) 很小，cuBLAS/CUTLASS 的训练场景优化不一定能吃满内存带宽。DeepSpeed-Inference 通过沿输出维切 tile、必要时沿输入维二次切分，并在 shared memory 中转置 partial result，让同一输出元素的部分和连续放置，再用 cooperative-group collectives 在寄存器中归约。权重读取也按 cache line 对齐重排，使每个 warp 更充分利用 128B cache line。

当模型跨 GPU 时，DeepSpeed-Inference 把并行策略按模型结构分层。dense transformer 主要用 tensor parallelism 切分线性层，并用流水并行扩展到多节点；MoE 模型则把 expert 参数按 expert parallelism 分散，同时保留 tensor slicing 处理非 expert 参数。论文中的调度思想是让推理阶段的 prompt processing 和 token generation 不被训练式 micro-batch 方式束缚：生成 token 有严格的前后依赖，流水线若只照搬训练 schedule 容易产生空泡，因此 DeepSpeed 使用 inference-optimized pipeline schedule 和 hybrid scheduling 来提高 prompt 和 decode 的设备利用率。

ZeRO-Inference 是另一条线：当模型权重远大于 GPU 显存时，不强行复制或常驻所有权重，而是把参数放在 CPU 或 NVMe，执行到某层时流式搬到 GPU。其有效性来自大 batch 下计算可以隐藏一部分 PCIe/NVMe 传输，且 GPU 显存不再被权重长期占满，可以容纳更大的 activation/KV 工作集。可以把单层执行时间粗略理解为：

$$
T_l \approx \max\left(T_{\text{compute}}(B,l),\ T_{\text{transfer}}(W_l)\right)
$$

当 batch 足够大、预取足够早时，权重传输被计算覆盖；当 batch 太小时，异构卸载会受传输延迟限制。因此 DeepSpeed-Inference 同时提供 GPU-only 低延迟路径和 ZeRO-Inference 资源受限路径，覆盖的是不同 serving 约束。

与 Orca/vLLM 这类主要优化请求调度和 KV cache 管理的系统不同，DeepSpeed-Inference 更偏向“模型本身太大、kernel 太慢、并行通信太贵”这组问题。它可以与 continuous batching 或分页 KV 思想互补：前者决定一轮服务里放哪些请求，DeepSpeed-Inference 决定这些请求经过超大 Transformer 层时如何在 kernel、GPU 集群和 CPU/NVMe 层面高效执行。

> 💡 关键：DeepSpeed-Inference 的核心不是单一算法，而是推理系统栈的组合优化：小 batch kernel 降低延迟，多 GPU 并行扩展带宽，ZeRO-Inference 用异构存储突破显存容量。

#### 🧪 练习题

```yaml
question: "ZeRO-Inference 为什么能让 GPU 显存放不下的模型仍可推理？"
options:
  - "它把 Transformer 的 Attention 层全部删除"
  - "它把权重常驻 CPU/NVMe，并在执行到对应层前预取到 GPU，让 GPU 显存主要用于当前计算、激活和缓存"
  - "它要求所有请求只生成一个 token"
  - "它通过训练一个更小模型替代原模型"
answer: 1
explain: "ZeRO-Inference 的关键是异构权重流式加载和预取；它牺牲部分传输开销，换取远超 GPU 显存容量的模型可执行性。"
```
