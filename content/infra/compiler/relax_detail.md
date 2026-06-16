### Relax：动态机器学习端到端可组合抽象

```yaml
id: relax
name: Relax
full_name: 动态机器学习端到端可组合抽象 (Relax)
year: '2025'
org: Apache TVM
paper_url: https://dl.acm.org/doi/abs/10.1145/3676641.3716249
category: infrastructure
parent: relay
motivation: 符号形状作为一等公民，完美适配LLM动态推理需求
```

#### 📝 一句话总结

Relax 提出面向动态形状机器学习的跨层编译抽象，把图级函数、TensorIR 张量程序和外部库调用放进同一 IR，并将符号形状作为一等公民在函数、算子和外部调用之间传播，解决 LLM 动态推理中 AOT 编译、跨层融合、静态内存规划和多端部署难以兼顾的问题。

#### 🎯 核心要点

- **跨层抽象**：同一 Relax 程序同时表达图级 tensor operator、loop-level TensorIR 和外部 library call，避免一次性降级后丢失高层优化信息
- **一等符号形状**：用符号变量和整数表达式表示动态维度关系，例如 `Tensor[(n, 4)]`、`Tensor[(4*n)]`，而不是只写 unknown/any
- **结构化 annotation**：每个值都有类似静态类型的 structural annotation，包含 tensor/tuple/callable、shape 和 dtype 等信息
- **Dataflow block**：用无副作用、无控制流的 straight-line block 标记可安全做 DCE、融合和图重写的区域
- **跨函数形状推导**：函数签名隔离符号关系，调用点可仅凭签名推断返回 shape，同时保留必要的轻量运行时检查
- **`call_tir` 与 DPS 语义**：图级函数通过 `call_tir` 调用 TensorIR，通过 `call_dps_library` 调用外部库，二者都采用 destination-passing style 以便后续内存规划
- **动态形状感知 fusion**：先用 TensorIR 分析反馈标注 ElementWise、Broadcast、Injective、Reduction、OutputEwiseFusible 等模式，再由 `FuseOps` 与 `FuseTensorIR` 联合完成跨层融合
- **动态内存规划**：用符号形状比较和 liveness 让动态 tensor 也能复用静态分配的 storage pool，减少 runtime allocator 依赖
- **可组合优化 pipeline**：支持 workspace lifting、CUDA Graph offloading、partial lowering、library dispatch 和最终 VM 指令打包

#### 🔬 深入细节

![Relax 总体方法概览](https://arxiv.org/html/2311.02103v2/x1.png)
*图：Relax 论文 Figure 1，展示其两个核心设计：跨层抽象连接计算图、TensorIR 和外部库，一等符号形状在全程序中追踪动态 shape 关系。*

```python
# Relax 动态形状端到端编译伪代码
def compile_relax(module, target):
    # 1. 构建带 structural annotation 的 Relax IR
    module = import_to_relax(module)
    module = annotate_symbolic_shapes(module)

    # 2. 每个 pass 后做前向符号形状推导，保持新变量的 shape 信息
    for fn in module.functions:
        for expr in fn.dataflow_order():
            expr.struct_info = infer_struct_info(
                expr,
                op_shape_rules=registered_rules,
                function_signatures=module.signatures,
                match_cast_hints=True,
            )

    # 3. 跨层融合：先从 TensorIR 得到 pattern kind，再融合图级子图和低层程序
    for tir_func in module.tensorir_functions:
        tir_func.pattern_kind = analyze_tensor_program_pattern(tir_func)
    module = fuse_ops_by_pattern(module)
    module = fuse_tensorir_inside_fused_subgraphs(module)

    # 4. 显式化 DPS 调用、workspace 和内存分配
    module = lower_call_tir_and_library_to_dps(module)
    module = lift_tensor_program_workspaces(module)
    module = plan_memory_with_symbolic_shapes(module)

    # 5. 后端优化与运行时打包
    module = offload_cuda_graph_if_static_after_planning(module, target)
    kernels = build_tensorir_and_library_calls(module, target)
    vm_code = lower_graph_level_to_vm_instructions(module)
    return package_relax_vm_module(vm_code, kernels)
```

**动机：LLM 动态推理让传统图 IR 和 JIT 都显得不够**

LLM 推理天然包含动态形状：prompt 长度、batch size、KV cache 长度、vocab 相关维度、prefill/decode 阶段的张量形状都可能变化。传统静态图编译器可以在固定 shape 下做很强的 fusion 和 memory planning，但遇到动态维度时往往只能写成 `?` 或 `any`，导致“这个维度和另一个维度相等”“flatten 后元素数是 \(4n\)”这类关系被抹掉。JIT trace 可以在运行时观察到具体 shape，但它依赖目标环境支持动态编译和缓存，移动端、WebGPU、嵌入式设备未必适合。Relax 的目标是在 AOT 编译框架下保留足够多的动态 shape 关系，使动态模型仍能做全程序优化。

Relax 的基本 annotation 可以抽象为：

$$
\text{TensorInfo} = (\text{dtype}, (s_1,\ldots,s_r)),\qquad
s_i \in \mathbb{Z}[n,m,k,\ldots]
$$

这里 \(s_i\) 不只是常数或 unknown，而可以是符号表达式。例如输入是 `Tensor[(n, 4), f32]`，flatten 后输出就是 `Tensor[(4*n), f32]`。当后续 reshape 回 `(n, 4)`，编译器可以证明元素数一致，而不是因为 unknown 而放弃优化。

**跨层抽象：图、TensorIR 和外部库在同一表示中协作**

Relay 已经把计算图扩展成函数式 IR，但 Relax 进一步把“图级算子”和“低层张量程序”放在同一程序里。图级 Relax 函数保持纯 tensor 语义，适合全局图重写；TensorIR 函数表达 loop-level 计算，适合 tiling、vectorization、memory scope 等底层优化；外部库调用负责复用 cuBLAS、CUTLASS 或平台特定算子。关键桥梁是 `call_tir` 和 `call_dps_library`。它们在图级看起来像产生 tensor 的纯调用，但底层会被降成 destination-passing style，即显式传入输出 buffer 并由 callee 写入。

这种设计解决了传统一次性 lowering 的问题。若过早把所有图算子降到 loop，图级 fusion、dead code elimination 和全局 memory planning 会变难；若一直停留在图级，则无法利用 TensorIR 分析得出的访问模式和 workspace 需求。Relax 允许某些部分先 partial lowering 到库或 TensorIR，其他部分继续保留图级结构，后续 pass 仍能在同一 IR 中看见跨层关系。

**符号形状推导：前向、局部，但跨函数可用**

Relax 选择前向 shape deduction。每个 tensor op 注册 shape 规则，根据输入 annotation 和必要的值参数推导输出 annotation；`call_tir` 和 `call_dps_library` 的输出 annotation 是调用参数的一部分，直接参与推导；`match_cast` 则允许前端或 pass 显式声明更精确的符号形状。这样每次 pass 引入新变量后，不需要全局求解大型约束系统，也能线性地补回 shape 信息。

跨函数时，Relax 把符号关系隔离在函数签名中。若函数签名为：

$$
f:\text{Tensor}[(n,m)]\rightarrow \text{Tensor}[(n\cdot m)]
$$

调用点传入 `Tensor[(a,b)]` 时，返回 shape 可直接替换为 `(a*b)`。如果调用点只有粗粒度 `Shape(ndim=2)`，也允许通过函数边界的轻量运行时检查确认具体 shape 是否满足签名。这个折中很重要：它既支持 AOT 优化常见动态关系，又不要求编译期知道所有数据依赖 shape。

**动态形状感知 fusion：先分析低层程序，再重写图级子图**

Relax 的 operator fusion 不是只看图级 op 名称。论文中的流程先对 TensorIR 函数做 analysis feedback，收集读写索引并分类为 `ElementWise`、`Broadcast`、`Injective`、`Reduction`、`OutputEwiseFusible` 或 `Opaque`。随后 `FuseOps` 根据这些 pattern kind 在 Relax 图中构造 fused subgraph function，例如把 elementwise op 融到 matmul 后处理里。最后 `FuseTensorIR` 做真正的跨层 transformation，把 fused subgraph 内的 TensorIR 程序合并，并用新的 `call_tir` 替换子图调用。

这种三段式设计对 LLM 很实际。量化模型中常见 `decode_q4 -> matmul -> bias/relu`，其中 `decode_q4` 可能是自定义 TensorIR 程序，图级 IR 未必有一个标准 op 名称能表达它。Relax 通过低层索引模式判断它是否可融合，而不是要求所有自定义程序都先抽象成高层算子。其融合合法性可以理解为：

$$
\text{CanFuse}(p,c)=
\text{Pattern}(p)\in\{\text{ElementWise},\text{Broadcast},\text{Injective}\}
\land \text{ShapeRel}(p,c)\ \text{可证明}
$$

其中 \(\text{ShapeRel}(p,c)\) 依赖符号形状系统。例如 producer 输出 `(n, 4)`、consumer 读取 flatten 后 `(4n)`，如果 Relax 能证明两者元素数一致，就可以继续做融合和 buffer 复用。

**动态内存规划：把 unknown 变成可比较的符号容量**

静态 shape 编译器通常根据 tensor 字节数和生命周期复用内存，但动态 shape 会迫使系统退回运行时 allocator。Relax 的动态 shape-aware memory planning 先把 `call_tir` 和库调用降成显式 allocation 与 DPS call，再做 liveness analysis，并在 storage pool 中按符号 shape 请求复用。两个 tensor \(a,b\) 可以复用 storage 的基本条件是生命周期不重叠，且容量关系可在符号假设下证明：

$$
\text{Reuse}(a,b) \Leftarrow
Live(a)\cap Live(b)=\varnothing
\land
Bytes(a)\le Capacity(b)
$$

如果 \(Bytes(a)=4\cdot n\cdot \text{sizeof}(f32)\)，\(Bytes(b)=8\cdot n\cdot \text{sizeof}(f32)\)，在 \(n>0\) 的形状约束下就能证明前者可放入后者容量。论文的内存规划算法会在 tensor allocation 处调用 `RequestReuseWithSymShape(shape, dtype)`，若无可复用 storage 才新建分配；当 liveness 判断某个 tensor 在当前 op 后死亡，就回收到 pool。这样动态形状模型也能预分配和复用大块内存，减少频繁 runtime allocation。

**Workspace lifting、CUDA Graph 和 VM lowering：跨层信息带来端到端收益**

Relax 的 cross-level transform 还包括 tensor program workspace lifting。某个 TensorIR 程序经过低层分析后可能需要临时 workspace，传统做法是在低层程序内部临时分配，这会让图级 memory planning 看不见它。Relax 可以把 workspace allocation 提升到图级，修改 TensorIR 函数签名，让 workspace 作为参数传入。这样 workspace 也能参与全局 liveness 和 storage reuse。

CUDA Graph offloading 也是同一逻辑的延伸。CUDA Graph 要求被捕获 kernel 访问的全局内存大小稳定并提前分配，动态 shape 通常不满足。Relax 在静态内存规划之后，已经能为动态 tensor 使用上界或符号规划出的预分配 storage，因此可以识别满足条件的子图，插入 capture/replay builtin，把原本只适合静态模型的 CUDA Graph 扩展到一部分动态 workload。最后，Relax 将图级程序降为虚拟机指令序列，每条指令调用生成函数或 builtin，同时把 GPU 代码、TensorIR 编译结果和库调用打包成一个端到端模块。

**与 Relay 的区别：表达力从“函数式图”推进到“动态跨层程序”**

Relay 的核心贡献是用函数式 IR 表达高层计算图、控制流和类型系统；Relax 继承 TVM 生态，但问题意识已经转向 LLM 时代的动态形状和跨层优化。Relay 中动态 shape 往往停留在 unknown 标注，Relax 则把符号 shape 变成 annotation 和运行时值；Relay 的图级优化和 TensorIR 降级更像前后阶段，Relax 则允许 `call_tir`、`call_dps_library`、partial lowering、workspace lifting 在同一 IR 中反复组合。它不是单纯“更高层的 Relay”，而是一个让图级、loop 级、库级优化相互反馈的端到端抽象。

> 💡 关键：Relax 的核心不是只支持动态 shape，而是保留动态 shape 之间的符号关系，并让这些关系贯穿图级函数、TensorIR、外部库和运行时内存规划。这样 AOT 编译也能服务 LLM 动态推理，而不必完全依赖 JIT。

#### 🧪 练习题

```yaml
question: "Relax 将符号形状作为一等公民的主要收益是什么？"
options:
  - "把所有动态维度都替换成固定常数"
  - "保留动态维度之间的等式和表达式关系，使 fusion、跨函数推导和内存规划仍可静态分析"
  - "禁止调用 TensorIR 或外部库函数"
  - "只为训练阶段自动生成反向传播图"
answer: 1
explain: "Relax 用符号表达式表示动态 shape，如 n、4n、n*m，并在函数和外部调用之间传播这些关系，从而让动态模型也能做 AOT 优化和静态内存复用。"
```
