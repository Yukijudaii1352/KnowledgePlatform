### FlexLinearAttention - 线性注意力统一抽象编译框架

```yaml
id: flex_linear_attn
name: FlexLinearAttention
full_name: 线性注意力统一抽象编译框架 (FlexLinearAttention)
year: '2026'
org: Community
paper_url: https://openreview.net/forum?id=N4jJQvQSiN
category: hardware_specific
parent: flash_attention
motivation: 统一抽象将线性注意力变体编译为可扩展高效内核
```

#### 📝 一句话总结

FlexLinearAttention 提出 FlexLA 编译器，把线性注意力变体统一拆成 intra-chunk computation、inter-chunk state propagation 和 output merging 三个阶段，解决每个新变体都要手写单机和分布式内核的问题，并把高层 PyTorch 描述编译为可扩展的 Triton-Distributed 内核。

#### 🎯 核心要点

- 三阶段 DSL：用户只需实现 `chunk_mode`、`decay_mode`、`merge_mode` 三个 PyTorch callable，就能表达 HGRN、RetNet、Mamba2、GLA、Gated DeltaNet 等线性注意力变体
- 编译前端：使用 Torch.fx 捕获三段函数的计算图，再做领域相关 graph rewrite、custom operator substitution、common subexpression elimination 和 transpose elimination
- 领域优化：围绕 chunk-wise linear attention 的并行/串行边界决定是否融合 chunk、decay、merge，减少全局内存中间状态，同时避免把本可并行的 chunk 计算串行化
- 分布式后端：基于 Triton-Distributed 生成带 OpenSHMEM 风格通信原语的代码，把 inter-chunk state propagation 中的跨设备通信融合到 tile 级计算中
- 系统优化：通过 AOT 编译、静态 kernel dispatcher 和 profile-guided dispatch 避免短序列场景中 Triton runtime / Python 调度开销
- 论文结果：单 GPU 生成内核达到 FLA 手写内核的 1.01x-4.9x 性能；分布式 scalar GLA 可在 128 GPU 上扩展到 1600 万 token，并相对 LASP-2 最高加速 7.2x

#### 🔬 深入细节

![FlexLA OpenReview 论文页面截图](https://image.thum.io/get/width/1200/crop/900/https://openreview.net/forum?id=N4jJQvQSiN)
*图：公开截图服务对 FlexLA 官方 OpenReview 页面生成的远程图片。论文的核心框架图位于 OpenReview 官方 PDF 的 Figure 3，展示 FlexLA 从三阶段 DSL 到 Torch.fx graph、领域图重写、Triton-Distributed 代码生成、AOT 编译和 tile-level compute-communication overlap 的管线；OpenReview 当前未拆出独立 Figure PNG，因此这里使用可访问的远程页面截图作为图片 URL，并在正文基于官方 PDF Figure 3 解读。*

```python
# FlexLA 三阶段抽象到分布式内核的概念伪代码
def compile_linear_attention(chunk_mode, decay_mode, merge_mode, tensors, cluster):
    # 1. 捕获用户用 PyTorch 写出的线性注意力语义
    chunk_fx = torch_fx_trace(chunk_mode, tensors.local_chunk_inputs)
    decay_fx = torch_fx_trace(decay_mode, tensors.state_inputs)
    merge_fx = torch_fx_trace(merge_mode, tensors.merge_inputs)

    # 2. 用线性注意力领域知识重写图
    graphs = [chunk_fx, decay_fx, merge_fx]
    graphs = substitute_custom_ops(graphs, ops=["lower_triangular_inverse", "scan", "state_update"])
    graphs = eliminate_transposes_and_cse(graphs)
    graphs = annotate_hardware_features(graphs, tma=cluster.gpu_supports_tma)

    # 3. 选择执行策略：是否融合阶段、如何切 tile、是否跨 GPU 传播状态
    plan = schedule_parallelism(
        graphs,
        chunk_size=tensors.chunk_size,
        state_shape=tensors.state_shape,
        devices=cluster.num_gpus,
        objective="minimize(memory_traffic + communication_latency + dispatch_overhead)",
    )

    # 4. 下降到 Triton-Distributed
    kernels = lower_to_triton_distributed(graphs, plan)
    kernels = fuse_tile_level_compute_and_comm(
        kernels,
        communication_phase="inter_chunk_state_propagation",
        primitive="OpenSHMEM-style put/get",
    )

    # 5. AOT 编译并生成静态 dispatcher
    binaries = aot_compile(kernels, static_dims=plan.static_dims)
    return make_static_dispatcher(binaries, profile_db=plan.profile_db)
```

**动机：线性注意力不是一种固定算子，而是一族快速变化的状态更新规则。** Softmax attention 已经有 FlashAttention、RingAttention 这类稳定的手写高性能内核，但线性注意力的设计空间更碎：有的状态是向量，有的是矩阵；有的 decay 是标量，有的是 data-dependent vector 或 matrix；Gated DeltaNet 还包含 delta-rule 风格的矩阵更新。若每个变体都手写 Triton/CUDA，就必须同时处理分块、状态传播、共享内存容量、通信重叠和 tile 参数，研究迭代速度会被 kernel 工程拖慢。FlexLA 的核心判断是：这些变体在 token 级更新上不同，但在 chunk-wise parallel form 上都能被拆成“块内摘要、块间状态、块内合并”。

线性注意力的基础递推可以写成：

$$
S_t = S_{t-1} + k_t v_t^\top,\qquad o_t = q_t S_t
$$

相对 softmax attention 的

$$
O = \operatorname{softmax}(QK^\top \odot M)V
$$

它把二次复杂度的注意力矩阵替换为可递推的状态 \(S_t\)。但是纯递推形式串行，完全并行形式又回到 \(O(L^2)\)。FlexLA 依赖的 chunk-wise 形式把长度 \(L\) 的序列按大小 \(C\) 切块，对第 \(i\) 个 chunk 写成：

$$
S[i] = S[i-1] + K[i]^\top V[i]
$$

$$
O[i] = Q[i]S[i-1] + \left(Q[i]K[i]^\top \odot M\right)V[i]
$$

这两个式子正好对应三阶段接口：`chunk_mode` 产生当前块的 state summary，`decay_mode` 把前序块状态传播到当前块开头，`merge_mode` 把全局 state readout 和块内 masked attention 合并成输出。

**编译机制：用 Torch.fx 保留 PyTorch 可写性，再用领域规则缩小优化空间。** FlexLA 并不是把任意 PyTorch 图交给通用编译器硬猜，而是先要求用户把语义放进三个 callable 中。这个边界告诉编译器哪些节点是 embarrassingly parallel 的 chunk 计算，哪些节点是有前缀依赖且可能需要跨设备通信的 state propagation。前端 tracing 得到 Torch.fx graph 后，编译器会把某些 PyTorch op 替换为领域手写算子，例如 Gated DeltaNet 中更适合定制 Triton 的 triangular inverse；同时做转置消除、公共子表达式消除和硬件属性标注。这样保留了 PyTorch 层面的表达能力，又避免通用图编译器在海量 schedule 空间中盲搜。

**分布式关键在第二阶段，而不是把 NCCL collective 套在外层。** 对于超长上下文，序列长度超过单卡容量后必须做 sequence parallelism。传统做法常用 All-Gather 等粗粒度 collective，但线性注意力的 state propagation 更像沿 chunk 维度的前缀传播，数据依赖粒度比一个完整 tensor 更细。FlexLA 把通信限制在 `decay_mode` 所在的 inter-chunk phase，并基于 Triton-Distributed 生成 GPU-initiated communication。可把一个 tile 的时间近似拆为：

$$
T_{\text{tile}} \approx \max(T_{\text{compute}}, T_{\text{comm}}) + T_{\text{sync-residual}}
$$

而不是传统串行的 \(T_{\text{compute}} + T_{\text{comm}} + T_{\text{host-sync}}\)。当通信以 tile 为单位被插入到计算流水线中，NIC 和 GPU 更容易同时忙起来，host synchronization 也被消除。

**融合策略本身是权衡，不是越多越好。** 例如把 `chunk_mode` 和 `decay_mode` 融合可以避免把每个 chunk 的 state summary 写回 global memory；但 `decay_mode` 有前缀依赖，过度融合会减少原本可并行的 chunk 级任务数量。论文把这类选择交给 parallelism scheduler：输入形状、head 数、head dimension、chunk size、GPU/NIC 拓扑会共同决定是物化中间状态、融合两阶段，还是把通信 tile 嵌入计算循环。这个设计的价值在于把“算法作者给出状态方程”和“系统为当前硬件选择执行形态”分开。

**AOT 和静态 dispatcher 解决短序列时的系统开销。** 许多线性注意力 kernel 在 1K-4K token 时真实执行时间只有几十到几百微秒，Triton runtime 的 hash lookup、JIT、Python 调度会变成主导开销。FlexLA 允许用户把相对固定的维度，如 head dimension、head 数、batch 范围标成静态或可枚举范围，提前编译出多个动态库；运行时由 profile-guided static dispatcher 直接选择 CUDA Driver API 可调用的二进制。对 inference 服务来说，这一点和 kernel 本身同样重要，因为吞吐通常被大量短请求、动态 shape 和调度开销共同限制。

> 💡 关键：FlexLA 的抽象不是“替代所有注意力 DSL”，而是抓住线性注意力的共有数学结构。只要一个新变体能被重写为 chunk local summary、state propagation、output merge，编译器就能复用同一套 kernel generation、通信融合和调度机制。

#### 🧪 练习题

```yaml
question: "FlexLA 为什么把线性注意力 DSL 固定为 chunk_mode、decay_mode、merge_mode 三个 callable？"
options:
  - "为了让所有线性注意力退化成 softmax attention，从而直接调用 FlashAttention"
  - "为了把块内并行计算、块间状态传播和输出合并分开，使编译器能定位可并行区域、串行依赖和通信位置"
  - "为了避免使用 Torch.fx，只用手写 CUDA 解析 Python 源码"
  - "为了强制所有模型使用同一种标量 decay 和同一种矩阵 state"
answer: 1
explain: "三阶段接口对应 chunk-wise linear attention 的数学分解。它既能表达多种状态更新规则，也给编译器提供明确边界，用于阶段融合、tile 级通信重叠和 AOT 调度。"
```
