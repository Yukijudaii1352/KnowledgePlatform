### BladeDISC：动态形状机器学习编译优化器

```yaml
id: bladedisc
name: BladeDISC
full_name: 动态形状机器学习编译优化器 (BladeDISC)
year: '2023'
org: Alibaba
paper_url: https://dl.acm.org/doi/abs/10.1145/3617327
category: hardware_specific
parent: mlir
motivation: 符号形状传播实现动态形状下算子融合，消除频繁重编译
```

#### 📝 一句话总结

BladeDISC 提出面向动态 shape 工作负载的 MLIR 编译优化管线，用全局符号 shape 约束替代具体 shape 值来做算子融合与图优化，并通过 shape-insensitive codegen、多版本 kernel 与运行时 speculation 生成能适配任意输入形状的高性能代码。

#### 🎯 核心要点

- **动态 shape 一次编译**：目标是同一编译产物服务多种 batch size、sequence length、image size，避免静态 shape 编译器频繁重编译
- **全局符号 shape 分析**：从 op 语义中抽取 dim equality、dim collapse equality、divisibility、range 等约束
- **跨层 shape 表示**：把全局 dim symbol 绑定到 MLIR tensor type，并维护 dim collapse/property 容器，避免 pass pipeline 中 shape 信息丢失
- **动态 broadcast elimination**：在不知道具体 shape 值的情况下，利用符号相等关系消除不必要的 implicit broadcast
- **融合决策流水线**：先做 element-wise fusion，再做 compute-intensive fusion，最后用 stitch fusion 合并 memory-intensive 子图
- **symbolic dim propagation**：动态 stitch fusion 不依赖具体大小，而是传播 group-dim/tile-dim 符号关系检查 locality
- **GEMM merging**：支持共享 operand 的 GEMM 拼接，以及形状相同 GEMM 的 batched GEMM 合并
- **shape-insensitive codegen**：通过 reduce 间指令交错和 loop iteration interleaving 提高 ILP，降低 schedule 对具体 shape 的敏感性
- **multi-codegen + runtime speculation**：为 vectorization、implicit broadcast、reduce schedule、GEMM schedule 生成多版本代码，运行时根据实际 shape 选择
- **Runtime Abstraction Layer**：编译器同时生成 device tensor computation 和 host runtime flow，用 RAL 隔离 TensorFlow/PyTorch 前端与 CUDA/ROCm/CPU 后端

#### 🔬 深入细节

![BladeDISC pass pipeline](https://raw.githubusercontent.com/alibaba/BladeDISC/main/docs/developers/pics/pass_pipeline.png)
*图：BladeDISC 官方开发者文档中的 pass pipeline。模型先降到 MHLO/StableHLO，经过 shape optimization、placement、bufferization、fusion decision、codegen，最后生成 host/device 侧执行代码。*

```python
# BladeDISC 动态 shape 编译优化伪代码
def bladedisc_compile(frontend_model, target):
    hlo = lower_frontend_to_stablehlo_or_mhlo(frontend_model)

    shape_env = ShapeEnv()
    for op in hlo.ops_topological_order():
        shape_env.union_equal_dims(infer_input_output_equalities(op))
        shape_env.add_collapse_equalities(infer_dim_collapse(op))
        shape_env.propagate_dim_properties(infer_divisibility_and_ranges(op))

    annotate_tensor_types_with_global_symbols(hlo, shape_env)
    hlo = eliminate_compile_time_redundant_broadcasts(hlo, shape_env)
    hlo = graph_rewrite(hlo, passes=["dot_merge", "algebraic_simplify", "layout_transform"])

    placed = place_ops(hlo, device_ops=target.accelerator, shape_ops="host_cpu")
    memref_ir = bufferize_and_materialize_runtime_shape_calculation(placed)

    fusions = []
    fusions += fuse_elementwise_to_consumers(memref_ir)
    fusions += fuse_compute_intensive_with_epilogue(memref_ir)
    fusions += stitch_memory_intensive_fusions_by_symbolic_dim_propagation(
        memref_ir,
        shape_env,
        check=lambda producer, consumer: same_group_tile_dims(producer, consumer),
    )

    kernels = []
    for fusion in fusions:
        if fusion.is_memory_intensive():
            kernels += generate_interleaved_shape_insensitive_kernels(fusion)
            kernels += generate_vectorized_and_reduce_schedule_variants(fusion, shape_env)
        else:
            schedules = select_top_common_gemm_schedules(profile_db, top_n=target.top_n)
            classifier = train_or_load_runtime_schedule_classifier(schedules)
            kernels += generate_gemm_schedule_variants(fusion, schedules, classifier)

    host_runtime = emit_runtime_flow_with_ral(memref_ir, kernels, target)
    return link(host_runtime, kernels)
```

**动机：动态 shape 下静态编译器为什么会失效**

NLP 推理的 batch size/sequence length、CV 输入分辨率、检测模型中间候选框数量都可能随请求变化。静态 shape 编译器通常有两种处理方式：JIT 缓存每个新 shape 的编译产物，或者提前把 shape bucketing 后 padding 到固定范围。前者会造成服务 warm-up、抖动和 cache 内存膨胀；后者会引入大量冗余计算，且要求用户预先知道 shape 范围。BladeDISC 的目标是“动态 shape 模型一次编译，多 shape 运行”，因此它必须在没有具体 shape 值的编译期仍能做图优化、fusion 和 codegen。

**全局符号 shape：优化真正需要的常常是关系，不是值**

BladeDISC 的核心观察是：很多优化并不需要知道 \(M=128\) 或 \(N=512\)，只需要知道两个维度是否相等、某个维度是否是另几个维度乘积、某个维度是否能被 4 整除。它把 shape 信息抽象为两类：shape relationship 与 shape property。对 tensor \(T\) 的第 \(k\) 个维度，可用全局符号表示为：

$$
\mathrm{dim}(T,k)=S_i,\quad S_i\equiv S_j,\quad S_o=\prod_{r\in R}S_r,\quad S_i\bmod c=0,\quad S_i\in[l,u]
$$

dim equality 来自三种来源：输入输出推断，例如 matmul 输出维度继承输入 \(M,N\)；sibling constraint，例如 matmul 两个输入的 contracting dimension 必须相等；shape value extraction，例如 reshape/broadcast 的 shape tensor 元素对应输出维度。dim collapse equality 则描述 reshape 这类变换中的乘积关系，例如 `tensor<?x4>` reshape 到 `tensor<?>` 时输出维度可被 4 整除。

**跨层 shape 表示：把分析结果变成 IR 的一部分**

传统 pass pipeline 中，一个 pass 分析出的 shape 事实很容易在后续 lowering 后丢失。BladeDISC 利用 MLIR 类型系统，把符号 shape 绑定到 tensor type 上：相等维度共享同一个 `@S0/@S1/...` 符号，collapse 关系存入 `DimCollapseContainer`，property 存入 `SymbolDim`。这样 shape optimization、graph transformation、fusion decision、bufferization 和 codegen 都能读取同一份 shape 事实，而不是每个 pass 重新分析一遍。这个设计也让动态 shape IR 在下降到 memref/LLVM 前仍保留高层 shape 语义。

**动态 shape fusion：从“值检查”变成“符号传播”**

Fusion 是 BladeDISC 的主要性能来源，但动态 shape 下 fusion 决策最难。AStitch 一类静态 shape stitch fusion 会用具体 tensor size 判断 producer/consumer 在 register/shared memory/global memory 之间的 locality；BladeDISC 把这个判断改写为符号维度传播。对一个 reduce-dominated 子图，先选出 dominant op，并把每个 dominant 的循环维度分成 group-dim 与 tile-dim。以 row-reduce \(A[m,n]\rightarrow B[m]\) 为例，\(n\) 是 tile-dim，映射到一个线程 tile 内部；\(m\) 是 group-dim，映射到不同 thread block/warp 组。

stitch fusion 的合法性可以写成：

$$
\prod_{s\in G_p}s = \prod_{s\in G_c}s,\quad T_p \equiv T_c,\quad \mathrm{Coverable}(I_{\text{output}}, I_{\text{dominant}})=\mathrm{true}
$$

其中 \(G_p,G_c\) 是 producer/consumer 的 group-dim 集合，\(T_p,T_c\) 是 tile-dim 传播结果。BladeDISC 从 consumer dominant 往 producer dominant 反向传播 dim 映射，例如 reshape 的输出维度可能映射回输入维度集合；如果传播到上一个 dominant 时 group/tile 符号与原先识别结果一致，就说明两段计算的 locality 可对齐，可以 stitch 到同一个 kernel。若遇到无法解析的循环关系或 index coverability 不成立，则保守地产生 split kernels。

**融合流水线：先小后大，区分 compute-intensive 与 memory-intensive**

BladeDISC 不一次性搜索整图 fusion，而是分阶段构建。element-wise fusion 把逐元素算子贴到 consumer，遇到 reduce 或 compute-intensive op 停止；compute-intensive fusion 把 GEMM/conv 这类算子与纯 element-wise epilogue 融合，减少输出写回和后续读入；stitch fusion 再把 memory-intensive fusions 合成更大的 kernel。这个分层很重要：compute-intensive op 通常需要大量 on-chip resource 和较低并行度来获得矩阵计算效率，memory-intensive op 则需要高并行度隐藏访存延迟，强行全融合反而可能拖慢后者。

**动态 shape codegen：编译期生成更不敏感的 schedule**

没有具体 shape 值时，很难为 reduce 选择最佳 thread-level parallelism。BladeDISC 的做法之一是提高 instruction-level parallelism，让 kernel 对 TLP 的依赖降低。论文中的 reduce-sum/reduce-max 例子展示了两种写法：非交错版本先完整执行 sum reduce，再执行 max reduce；交错版本在同一个 loop、warp shuffle、cross-warp reduce 流程中同时维护 `sum` 与 `max`。这会合并相同控制流，减少分支和 loop overhead，并把独立指令放得更近，更容易填满 GPU pipeline。

可以把 memory-intensive kernel 的目标近似写成：

$$
\max\ \mathrm{Throughput}\approx f(\mathrm{TLP},\mathrm{ILP},\mathrm{MemoryCoalescing})
$$

静态 shape 编译器通常把重点放在给定 shape 下调 \( \mathrm{TLP} \)，BladeDISC 在 shape 未知时通过提升 \( \mathrm{ILP} \) 和减少控制流开销，让一个 schedule 覆盖更宽的 shape 区间。

**multi-codegen 与 runtime speculation：让运行时 shape 参与最后选择**

BladeDISC 仍然承认“一个 schedule 不可能对所有 shape 最优”。因此它在编译期生成多个版本，在运行时根据真实 shape 做极轻量选择。memory-intensive 子图常见版本包括：vectorized/non-vectorized kernel，如果维度可被向量宽度整除就选 vectorized；保守/激进 broadcast kernel，如果运行时发现剩余 implicit broadcast 实际不需要就选激进版本；row-reduce 的 one-block-one-row 与 one-warp-one-row，根据行列规模和经验阈值选择。

compute-intensive 子图则更接近数据库查询优化中的 alternative plan selection。BladeDISC 对 GEMM shape \([M,N,K,B]\) 建 profile dataset，找出能达到接近最优性能的 top schedules，再取 top-N 常见 schedule 编译进二进制；运行时用轻量分类器预测：

$$
s^\*=\mathrm{Classifier}(M,N,K,B),\quad s^\*\in\{s_1,\dots,s_N\}
$$

论文使用 decision tree，因为相近规模的 GEMM 通常共享同一好 schedule。这个 speculation 发生在 CPU host 侧，开销足够小，可以与 GPU 执行上一个 kernel 的时间重叠；并且如果多个 compute-intensive 子图共享相同 shape 约束，speculation 结果还能复用。

**系统实现：MLIR、RAL 与 host/device 共同生成**

BladeDISC 以 StableHLO/MHLO 作为多前端 hub IR：TensorFlow 通过社区 pipeline 降到 HLO，PyTorch 先到 TorchScript/torch-mlir 再到 HLO。随后 placement pass 把 tensor computation 放到 GPU/CPU device，把 shape calculation 放到 host CPU；bufferization pass 显式插入 allocation/deallocation，把 tensor 值转成 memref 和 runtime buffer 行为。与只生成 device kernel 的编译器不同，BladeDISC 还生成 host-side runtime flow，包括 shape 计算、buffer 管理、kernel launch 和 RAL custom calls。Runtime Abstraction Layer 隔离 TensorFlow/PyTorch IO context 与 CUDA/ROCm/x86/AArch64 device abstraction，使核心图优化逻辑不依赖具体前后端。

> 💡 关键：BladeDISC 的“动态 shape 编译”不是简单把 shape 变量留到运行时，而是在编译期最大化挖掘 shape 关系，用这些关系驱动 fusion 和部分 codegen；只有真正依赖具体数值的 schedule 选择，才交给低开销运行时 speculation。

#### 🧪 练习题

```yaml
question: "BladeDISC 为什么能在不知道具体 tensor shape 值的情况下做 stitch fusion 决策？"
options:
  - "它完全跳过 fusion，只在运行时解释执行所有算子"
  - "它把 producer/consumer locality 检查转化为 group-dim、tile-dim 的符号相等与传播检查"
  - "它要求用户提前枚举所有可能的 batch size 和 sequence length"
  - "它只支持静态 shape 的 GEMM，不处理 memory-intensive 子图"
answer: 1
explain: "BladeDISC 的核心观察是 fusion locality 常依赖维度关系而不是具体数值；通过全局符号 shape 和 symbolic dim propagation，它可以在编译期判断动态 shape 子图是否可 stitch。"
```
