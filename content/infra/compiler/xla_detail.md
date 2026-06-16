### XLA：加速线性代数编译器

```yaml
id: xla
name: XLA
full_name: "加速线性代数编译器 (Accelerated Linear Algebra)"
year: "2017"
org: Google
paper_url: https://openxla.org/xla
category: graph_compilers
parent: "—"
motivation: "通过HLO IR实现跨算子全局内存优化，解决内存墙问题"
```

#### 📝 一句话总结

XLA 提出以 HLO/StableHLO 为中心的机器学习编译流水线，把框架图统一降到静态形状的线性代数 IR，再通过跨算子融合、布局选择、调度和缓冲区分配减少中间张量写回与峰值显存，解决深度学习推理和训练中的内存墙与硬件可移植问题。

#### 🎯 核心要点

- **HLO IR 作为全图优化边界**：将 TensorFlow、JAX、PyTorch/XLA 等前端程序转为 StableHLO/HLO，保留张量 shape、layout、sharding 和数据依赖信息
- **目标无关优化**：在 HLO 层执行 CSE、代数化简、常量折叠、死代码删除、通用 fusion、buffer analysis 等全图 pass
- **目标相关后端优化**：GPU/CPU/TPU 后端继续执行布局分配、SPMD partition、库调用匹配、Triton/LLVM codegen、stream/thunk 调度等硬件相关 pass
- **融合解决内存墙**：将逐元素算子、reduction、dot/softmax 周边算子合并成单个 fusion computation，避免中间张量落到 HBM，并减少 kernel launch
- **静态内存规划**：基于 HLO schedule、alias analysis 和 liveness，把不重叠生命周期的 HLOBuffer 映射到同一 buffer slice，降低峰值内存
- **调度与重物化**：调度器在合法拓扑序中搜索低峰值内存顺序；必要时用 rematerialization 复制计算来缩短张量生命周期
- **运行时封装**：后端把优化后的 HLO 降为 thunk sequence / executable，由 PJRT 或后端 runtime 负责设备内存、kernel/library 调用和命令缓冲执行

#### 🔬 深入细节

![XLA 从 HLO 到 Thunks 的编译流程](https://openxla.org/xla/images/hlo_to_thunks.svg)
*图：OpenXLA 官方文档中的 HLO 到后端 thunks / executable 流程，展示优化 HLO、调度、Buffer Assignment、Thunk emission 和最终可执行对象之间的关系。*

```python
# XLA 编译流水线伪代码：从 StableHLO/HLO 到后端 executable
def compile_with_xla(stablehlo_module, target):
    hlo = legalize_stablehlo_to_hlo(stablehlo_module)

    # 目标无关：保留数学语义，先缩小图并暴露融合机会
    hlo = run_passes(hlo, [
        "canonicalize", "algebraic_simplifier", "constant_folding",
        "hlo_cse", "dead_code_elimination", "target_independent_fusion",
    ])

    # 目标相关：后端知道寄存器、HBM、库调用、layout 和通信约束
    hlo = target.backend.optimize_hlo(hlo, [
        "spmd_partition", "layout_assignment", "triton_or_library_rewrite",
        "priority_fusion", "multi_output_fusion", "copy_insertion",
    ])

    schedule = choose_schedule(hlo, objective="minimize_peak_memory")
    if estimated_peak_memory(schedule) > target.memory_budget:
        hlo, schedule = rematerialize(hlo, schedule, target.memory_budget)

    buffers = assign_buffers(hlo, schedule)
    thunks = emit_thunk_sequence(hlo, schedule, buffers, target)
    return package_executable(code=lower_to_machine_code(thunks), buffers=buffers, thunks=thunks)


def assign_buffers(hlo, schedule):
    values = hlo_dataflow_analysis(hlo)        # instruction -> logical HloValue
    buffers = hlo_alias_analysis(values)       # HloValue -> HloBuffer
    live = liveness(schedule, buffers)
    heap = interval_heap_allocate(
        intervals=[(live[b].start, live[b].end, size(b)) for b in buffers],
        can_share=lambda b1, b2: not overlap(live[b1], live[b2]),
    )
    return heap  # HloBuffer -> offset/size inside a few contiguous allocations
```

##### 1. 动机：为什么深度学习需要 HLO 级编译

传统动态图或 eager 执行模式把神经网络拆成一串框架算子，运行时逐个调用 cuDNN、cuBLAS、Eigen 或自定义 kernel。这个模式的问题不在于单个 GEMM 不够快，而在于全图信息在运行时被切碎：`matmul -> bias -> gelu -> dropout -> residual` 中间会产生多个大张量，每个中间值可能被写入 HBM 后又立即读回。对现代 GPU/TPU 来说，很多模型层已经不是纯算力瓶颈，而是内存带宽、kernel launch 和跨设备通信瓶颈。XLA 的关键设计是把前端框架图先收敛到 HLO：每条指令都有静态 shape、dtype、layout/sharding 标注和明确的数据依赖，这让编译器能在“算子边界之外”做内存与调度决策。

##### 2. HLO IR：足够高层以理解张量，足够低层以生成代码

HLO 的节点不是 C++ 循环，而是 `dot`、`convolution`、`broadcast`、`reduce`、`fusion`、`copy` 等张量操作。这个层级的好处是两方面的：一方面，代数化简可以直接识别 `broadcast(constant)`、`reshape(bitcast)`、重复子表达式、无用 tuple 等高层模式；另一方面，后端仍可把 HLO 降成 LLVM IR、Triton IR、库调用或专用硬件指令。可以把 HLO 模块抽象成带 shape/layout 的有向无环计算图：

$$
G_{\text{HLO}}=(V,E,\text{shape},\text{layout},\text{sharding})
$$

其中边 \(E\) 表示张量依赖，\(\text{shape}(v)\) 决定每个逻辑 buffer 的字节数，\(\text{layout}(v)\) 决定物理内存排列，\(\text{sharding}(v)\) 决定多设备切分方式。XLA 的多数优化都可以理解为在保持 \(G_{\text{HLO}}\) 数学语义不变的前提下，改变图结构、物理布局、执行顺序和 buffer 复用方案。

##### 3. Fusion：把带宽开销从全局内存搬回寄存器/共享内存

XLA 最重要的优化通常是 fusion。若两个 HLO 指令 \(u \to v\) 的中间张量 \(T_u\) 只用于后续局部计算，未融合时成本近似包含一次写 HBM 和一次读 HBM：

$$
T_{\text{unfused}} \approx \frac{\text{bytes}(T_u)_{\text{write}}+\text{bytes}(T_u)_{\text{read}}+\cdots}{BW_{\text{HBM}}} + N_{\text{kernels}}\cdot T_{\text{launch}}
$$

融合后，中间值在寄存器或共享内存中传递，成本变为：

$$
T_{\text{fused}} \approx \frac{\text{bytes}(\text{inputs})+\text{bytes}(\text{outputs})}{BW_{\text{HBM}}} + T_{\text{launch}}
$$

这就是“解决内存墙”的核心：不是让乘加更快，而是让中间张量不离开片上存储。OpenXLA GPU 后端中，一个 fusion computation 会编译成一个 GPU kernel；dot/softmax/layernorm 等复杂模式还可能被重写成 Triton fusion，并通过 autotuning 选择 tile、warp、stage 等参数。代价是 fusion 不能无限扩大：过大的 fusion 会增加寄存器压力、降低 occupancy，或者复制有多个用户的计算。因此现代 XLA 使用 cost model、priority fusion、多输出 fusion 等策略，在减少 HBM 流量和控制局部资源之间折中。

##### 4. Layout Assignment：逻辑 shape 和物理布局分离

同一个张量逻辑上可以是 \(f32[32,64]\)，物理上却可以用 `{1,0}` 或 `{0,1}` 排列。XLA 把 layout 作为 shape 的一部分，并让后端根据目标硬件选择布局：例如卷积可能偏好 NHWC，某些 int8 dot 的 RHS 可能偏好特定 minor dimension。布局传播的直觉是先从库调用或硬件 emitter 的约束出发，把偏好的 layout 沿 HLO 图向上下游传播；当 producer 和 consumer 的 layout 冲突时，插入 `copy` 或显式 `transpose/bitcast`。因此 layout assignment 不是单个算子的局部选择，而是一个全图最小化物理转置开销的问题：

$$
\min_{\ell_v \in \mathcal{L}(v)} \sum_{(u,v)\in E} C_{\text{copy}}(\ell_u,\ell_v) + \sum_{v\in V} C_{\text{kernel}}(v,\ell_v)
$$

实际系统不会穷举求解这个组合优化，而使用约束传播、贪心和后端规则。这个设计也解释了为什么 XLA 可以把用户显式写出的某些 transpose 当作 layout 改变处理：如果物理布局已经满足需求，transpose 可以退化成 bitcast 或被完全消除。

##### 5. Scheduling 与 Buffer Assignment：峰值内存是编译器目标函数

在 HLO 图已经优化后，仍然存在多个合法拓扑执行顺序。不同顺序会改变中间张量生命周期，从而影响峰值内存。给定调度 \(\pi\)，峰值内存可写成：

$$
M(\pi)=\max_t \sum_{b\in B} \text{size}(b)\cdot \mathbf{1}\left[\text{start}_\pi(b)\le t < \text{end}_\pi(b)\right]
$$

XLA 调度器先模拟内存使用，选择较低 \(M(\pi)\) 的顺序；随后 Buffer Assignment 把 HloValue 合并为 HloBuffer，再把生命周期不重叠的 HloBuffer 放进同一物理 buffer slice。对于 in-place 或别名操作，alias analysis 会允许输入和输出复用同一片内存；对于可能覆盖仍被使用数据的情况，CopyInsertion 会显式插入 copy 保证语义。若估算峰值超过设备预算，HloRematerialization 会选择重新计算某些中间值来缩短生命周期，本质是在计算量和显存之间做交换。

##### 6. 与传统框架和 TVM/Glow 的差异

XLA 与普通框架执行器的差别在于“先全图编译，再运行 executable”。运行时不再临时决定每个 op 如何分配内存，而是使用编译期生成的 BufferAssignment 和 ThunkSequence。与 TVM 相比，XLA 更强调框架到后端的一体化 HLO pass pipeline 和生产级 runtime；TVM 更强调 tensor expression / schedule search 的可编程自动调优。与 Glow 相比，XLA 的 HLO 是跨 Google/JAX/TensorFlow 生态长期演进的核心 IR，静态 shape 和 functional graph 假设更强；Glow 则突出两级 IR 下降和面向推理的静态内存/代码生成。三者共同点是：深度学习编译器的关键不只是“调用更快的 kernel”，而是跨算子理解数据流、内存和硬件约束。

> 💡 **关键**：XLA 的核心价值是把“每个算子单独优化”提升为“整个 HLO 模块共同优化”。Fusion 减少 HBM 往返，layout 降低物理转置，schedule 和 buffer assignment 降低峰值内存，最终由 backend executable 固化这些决策。

#### 🧪 练习题

```yaml
question: "XLA 中 fusion 对内存墙问题最直接的缓解机制是什么？"
options:
  - "把所有算子都替换为 cuDNN 调用"
  - "让中间张量在寄存器或共享内存中传递，避免写回再读出 HBM"
  - "把动态图改写成 Python 静态图"
  - "把所有输入张量复制到 CPU 内存中执行"
answer: 1
explain: "Fusion 将多个 HLO 指令合并为单个 fusion computation / kernel，中间值不再物化到 HBM，从而减少内存带宽和 kernel launch 开销。"
```
