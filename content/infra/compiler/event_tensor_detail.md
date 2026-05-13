### Event Tensor：动态 Megakernel 编译的统一抽象

```yaml
id: event_tensor
name: Event Tensor
full_name: "动态 Megakernel 编译统一抽象 (Event Tensor: A Unified Abstraction for Dynamic Megakernel Compilation)"
year: 2026
org: ByteDance
paper_url: "https://arxiv.org/abs/2604.13327"
category: tensor_ir
parent: triton
motivation: "符号变量统一动态 Megakernel 抽象"
```

#### 📝 一句话总结

Event Tensor 提出了一种将**事件（任务完成信号）组织为多维张量**的编译器 IR 抽象，使编译器能够以统一方式表达 tile 级细粒度依赖、符号化动态形状和数据依赖的动态性，从而将整个 LLM 推理子图编译为单个持久化 Megakernel，消除 kernel launch 开销并实现跨算子流水线化。

#### 🎯 核心要点

- **Event Tensor 抽象**：将事件（任务完成信号）组织为多维数组，作为编译器 IR 中的一等公民，以张量形式紧凑表达 tile 间的细粒度生产者-消费者依赖关系
- **三大动态性支持**：(1) 细粒度 tile 级依赖打破全局同步屏障；(2) 符号化形状支持避免按形状重编译；(3) 数据依赖动态性（如 MoE 路由）通过运行时事件更新与任务触发实现
- **双调度策略**：静态调度（预计算 SM 任务队列 + notify/wait 信号量）适用于可预测负载；动态调度（GPU 上轻量级 push/pop 任务调度器）适用于数据依赖的不规则负载
- **ETC 编译器**：基于 Apache TVM 实现的端到端编译流水线，将 Event Tensor 图变换为持久化 Megakernel，Event Tensor 降级为整数张量 + 硬件原子操作
- **评估覆盖**：GEMM+ReduceScatter/AllGather+GEMM 通信融合（最高 1.40x 加速）、MoE 层（最高 1.23x 加速）、端到端 LLM serving（Qwen3-30B-A3B 低 batch 下 1.48x/1.20x 优于 vLLM/SGLang）、warmup 时间从 583s/123s 降至 35s

#### 🔬 深入细节

![Event Tensor 总览](https://arxiv.org/html/2604.13327v1/x2.png)
*图：Event Tensor 概览。(a) 细粒度依赖：生产者 tile 完成后通过 Event Tensor 通知消费者 tile；(b) 符号化形状动态性：Event Tensor 维度可为符号变量；(c) 数据依赖动态性：运行时根据 MoE 路由结果更新 Event Tensor 并触发任务。*

```python
# Algorithm 1: Static Scheduling Transformation in ETC (简化伪代码)
def static_scheduling_transform(mod, G):
    """
    输入: mod — 包含 tile 级数据流图 G（带 Event Tensor 依赖）的模块
    输出: 融合后的静态调度 megakernel
    """
    mod_updated = mod.copy()
    static_schedule = generate_static_schedule(G)       # 预计算每个 SM 的任务队列
    fused_kernel = new_persistent_kernel()
    fused_kernel.add_buffer(static_schedule)             # 将调度表嵌入全局内存

    for task_grid in G:
        fused_kernel.add_dispatch_logic(task_grid)       # 分派逻辑
        for event in task_grid.in_edges:
            fused_kernel.add_wait_logic(event)           # wait(): 自旋等待计数器归零
        fused_kernel.add_tile_logic(task_grid)           # 实际 tile 计算
        for event in task_grid.out_edges:
            fused_kernel.add_notify_logic(event)         # notify(): 原子递减计数器

    mod_updated.replace(G, fused_kernel)
    return mod_updated

# Algorithm 2: Dynamic Scheduling Transformation (简化伪代码)
def dynamic_scheduling_transform(mod, G):
    mod_updated = mod.copy()
    fused_kernel = new_persistent_kernel()
    scheduler = GPUScheduler()                           # GPU 上的轻量级任务队列
    fused_kernel.add_pop_logic(scheduler.f_pop_tasks)    # SM 空闲时 pop 就绪任务

    for task_grid in G:
        fused_kernel.add_dispatch_logic(task_grid)
        fused_kernel.add_tile_logic(task_grid)
        for event in task_grid.out_edges:
            # 任务完成 → 原子递减 → 计数器归零时 push 消费者任务
            fused_kernel.add_complete_on_logic(event, scheduler.f_push_tasks)

    mod_updated.replace(G, fused_kernel)
    return mod_updated
```

**动机与背景：GPU Kernel Launch 开销与粗粒度同步的瓶颈。** 现代 LLM 推理（尤其是低 batch 解码阶段）中，单个 kernel 的计算时间可能仅有几十微秒，而每次 kernel launch 的开销为 5–10μs，这意味着 launch 开销可占总时间的显著比例。传统方案中，CUDA Graph 可以减少 launch 开销，但要求静态输入形状，无法处理 MoE 等数据依赖的动态工作负载。已有的 Megakernel 方案（如 MPK、TKMega）仅支持单 batch 密集模型推理，缺乏对动态形状和数据依赖动态性的系统化编译器支持。Event Tensor 的核心洞察是：**将事件抽象为张量**，使得编译器可以用统一的张量操作语义来表达、分析和变换 tile 间的细粒度依赖关系，从而将多个算子融合为单个持久化 Megakernel。

**核心机制：Event Tensor 的三大能力。** Event Tensor \(E \in \mathbb{Z}^{d_1 \times d_2 \times \cdots \times d_n}\) 是一个多维整数数组，其中每个元素 \(E[i_1, i_2, \ldots, i_n]\) 是一个事件计数器，初始值等于其生产者任务的数量。生产者 tile 完成后调用 `notify()` 对计数器执行原子递减；消费者 tile 在执行前调用 `wait()` 自旋等待计数器归零。这一机制的关键优势在于：

1. **细粒度依赖**：传统方案中，算子 A 和算子 B 之间存在全局同步屏障——B 必须等待 A 的所有 tile 完成。Event Tensor 将依赖粒度细化到 tile 级别：若 GEMM 的输出被按行分块，则 Reduce-Scatter 的第 \(j\) 个 tile 只需等待 GEMM 中产出第 \(j\) 行块的那些 tile 完成即可开始执行，实现了**跨算子流水线化**。形式化地，对于 GEMM（M 方向分 \(m\) 块，K 方向分 \(k\) 块）+ Reduce-Scatter 的融合，Event Tensor 形状为 \(E \in \mathbb{Z}^{m}\)，每个 \(E[j]\) 的初始计数为 \(k\)（即 GEMM 沿 K 维的分块数），当所有 \(k\) 个 GEMM tile 完成对第 \(j\) 行的累加后，\(E[j]\) 归零，RS 的第 \(j\) 个 tile 即可执行。

2. **符号化形状动态性**：Event Tensor 的维度可以是符号变量（如 \(E \in \mathbb{Z}^{s}\)，其中 \(s\) 在编译时未知）。编译器生成的代码中，notify/wait 的索引计算保留符号表达式，运行时绑定具体值即可，无需按形状重编译。对于静态调度，编译器采样一组代表性形状预计算调度表，未见形状复用下一个更大采样值的执行队列。

3. **数据依赖动态性**：MoE 中 token 到 expert 的路由在运行时才确定。ETC 引入 `topk` 和 `exp_indptr` 等运行时值来动态更新 Event Tensor 的内容和触发条件。例如，MoE 第一阶段 GroupGEMM 完成后，根据实际路由结果动态设置第二阶段 GroupGEMM 的 Event Tensor 计数器，实现了**运行时自适应的依赖图**。

**静态 vs 动态调度的权衡与编译流程。** ETC 提供两种调度变换：静态调度将 tile 级任务预分配到每个 SM 的执行队列中（round-robin 策略），依赖通过 notify/wait 信号量处理，适用于通信融合等可预测负载（如 AllGather+GEMM 的环形算法）。动态调度在 GPU 上维护一个集中式任务队列，任务完成后通过原子操作将就绪的消费者任务 push 入队，空闲 SM 通过 pop 获取任务，适用于 MoE 等不规则负载。实验表明（Table 2-3），MoE 负载下动态调度比静态调度快最多 4%，而规则密集负载下静态调度比动态调度快 20%+（动态调度在分布式场景下的远程队列 push 开销显著）。ETC 的端到端编译流程为：计算图 → 图级优化（内存规划等）→ tile 级优化（指令映射、流水线策略）→ 静态/动态调度变换 → 持久化 kernel 代码生成 → 权重预取 pass → 静态调度表物化。最终，Event Tensor 被降级为普通整数张量，notify/wait 被降级为硬件原子操作（`atomicSub` + spin-wait），运行时状态仅包含整数张量和调度器任务队列，无需传统 task-graph 运行时的图物化开销。

**实验亮点与关键数据。** 在 8×NVIDIA B200 上的评估显示：(1) GEMM+ReduceScatter 和 AllGather+GEMM 融合分别取得最高 1.40x 加速（对比 cuBLAS+NCCL 非融合基线），超越 TP-Async、Triton-Dist 和 cuBLASMp；(2) Qwen3-30B-A3B 的完整 MoE 层在 1024 tokens 下取得 1.23x 加速（对比 Triton/FlashInfer 的多 kernel 方案）；(3) 端到端 serving 中，Qwen3-30B-A3B 在 batch=1 时 TPOT 比 vLLM 快 1.48x、比 SGLang 快 1.20x；(4) 模型 warmup 时间从 SGLang 的 583s、vLLM 的 123s 降至 35s（AOT 编译消除了 JIT/CUDA Graph capture 开销）。这些结果验证了 Event Tensor 抽象在统一处理细粒度依赖、形状动态性和数据依赖动态性方面的有效性。

> 💡 **关键洞察**：Event Tensor 的核心创新在于将"事件"提升为编译器 IR 中的一等张量类型，使得依赖关系可以像数据张量一样被索引、切片和符号化推导。这使得编译器能够自动完成从多 kernel 到单 Megakernel 的融合变换，而无需手工编写复杂的同步逻辑。

> ⚠️ **局限性**：动态调度在分布式多 GPU 场景下的远程任务队列 push 开销较大（Table 3 显示动态调度比静态调度慢 15-20%）；编译器生成的 GEMM tile 在某些配置下不如 cuBLAS 优化充分；当前实现的 CPU 端 serving 引擎开销高于 SGLang 的高度优化调度器。

#### 🧪 练习题

```yaml
question: "Event Tensor 中 notify() 和 wait() 操作的底层实现机制是什么？"
options:
  - "notify() 执行原子加操作，wait() 检查计数器是否达到阈值"
  - "notify() 执行原子递减操作，wait() 自旋等待计数器归零"
  - "notify() 向全局队列 push 消息，wait() 从队列 pop 消息"
  - "notify() 触发 CPU 端中断，wait() 阻塞 GPU 线程直到 CPU 响应"
answer: 1
explain: "Event Tensor 被降级为整数张量，每个元素初始化为生产者数量。notify() 通过 atomicSub 递减计数器，wait() 自旋等待计数器归零，全部在 GPU 端通过硬件原子操作完成，无需 CPU 参与。"
```