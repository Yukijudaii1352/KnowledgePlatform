### DeepCompile：编译器驱动分布式训练优化系统

```yaml
id: deep_compile
name: DeepCompile
full_name: 编译器驱动分布式训练优化系统 (DeepCompile)
year: '2026'
org: Microsoft/UVA
paper_url: https://arxiv.org/abs/2504.09983
category: graph_compilers
parent: torch_dynamo
motivation: 编译器驱动主动预取与自适应offloading优化分布式训练
```

#### 📝 一句话总结

DeepCompile 把 ZeRO-3/FSDP 风格 fully sharded training 从 Python hook 触发的运行时策略提升为编译器图变换问题，用 profiling-guided passes 精细插入、移动或删除 all-gather、release、offload/reload 操作，从而协调 proactive prefetching、selective unsharding 与 adaptive offloading。

#### 🎯 核心要点

- **图级分布式训练优化**：基于 PyTorch/base compiler 产生的计算图，直接重写通信和内存操作
- **Fully sharded 基线 pass**：为参数首次使用前插入 all-gather，为最后使用后插入 release，缩短 gather buffer 生命周期
- **Profiling-guided pass loop**：每个 pass 后运行图并收集 operator time、communication time、memory usage，为后续 pass 提供更新反馈
- **Proactive prefetching**：按动态内存曲线尽早调度 all-gather，使通信与计算重叠，同时不越过显存上限
- **All-gather fusion**：用 profiled communication time 判断小消息是否合并，减少多次通信启动开销
- **Selective unsharding**：在 prefetch 后用剩余显存保留部分参数的 unsharded 版本，尤其利于 gradient accumulation
- **Adaptive offloading**：只 offload 超出显存限制的 optimizer state fragment，并用异步拷贝与 forward/backward 计算重叠
- **Pass 顺序意识**：先 prefetch 再 selective unsharding，避免 unsharding 抢光 prefetch buffer
- **大模型验证**：在 Llama 3 70B 与 Mixtral 8x7B MoE 上相对 ZeRO-3/FSDP 提升吞吐，资源受限 offloading 场景最高约 7.01×

#### 🔬 深入细节

![DeepCompile 工作流](https://arxiv.org/html/2504.09983v2/figs/workflow.png)
*图：DeepCompile workflow。Base compiler 将用户训练脚本和模型降为 IR/计算图，DeepCompile 注入 distributed training optimizations，再交给 GPU runtime 执行。*

![DeepCompile prefetch 内存影响](https://arxiv.org/html/2504.09983v2/figs/prefetch_mem.png)
*图：proactive prefetching 对内存占用与通信-计算重叠的影响。固定 prefetch buffer 可能过于保守或触发 OOM，DeepCompile 根据 profiling 动态决定 all-gather 提前位置。*

```python
# DeepCompile proactive prefetching 核心伪代码
def proactive_prefetch(S0, M, M_prefetch, profiled_mem, allgather_buffer):
    S = []   # output schedule
    U = []   # unscheduled all-gathers that may be moved earlier

    # 反向扫描：尝试把后面才需要的 all-gather 往前提
    for i in reversed(range(1, len(S0))):
        op = S0[i]
        if is_allgather(op):
            m_u = sum(allgather_buffer[x] for x in U + [op])
            m_before_prev = profiled_mem[S0[i - 1]] + m_u

            if m_before_prev < M and m_u < M_prefetch:
                U.append(op)
            else:
                S.extend(fuse_allgathers(U))
                U = []
        else:
            S.append(op)

    S.extend(fuse_allgathers(U))
    return reverse_to_execution_order(S)

def adaptive_offload_forward(S0, M, optimizer_state_fragments, profiled_mem):
    S = []
    offloaded = []
    offloaded_size = 0
    peak = max(profiled_mem[op] for op in S0)
    opt_size = sum(fragment.size for fragment in optimizer_state_fragments)

    for fragment in optimizer_state_fragments:
        if peak + opt_size - sum(x.size for x in offloaded) > M:
            S.append(async_offload(fragment))
            offloaded.append(fragment)

    for op in S0:
        while profiled_mem[op] + opt_size - offloaded_size > M:
            fragment = offloaded.pop()
            S.append(sync_copy_and_free(fragment))
            offloaded_size += fragment.size
        S.append(op)

    return S
```

**动机：ZeRO-3/FSDP 的 hook 机制缺少全局时序控制。** Fully sharded 方法把每层参数切到多 GPU 上，计算前 all-gather 出完整参数，计算后释放。这个策略能省显存，但如果 all-gather 总是在层边界前一刻启动，通信无法和计算充分重叠；如果静态提前太多，又会延长 gather buffer 生命周期并触发 OOM。DeepCompile 的判断是：这些决策本质上是图中 operator 的调度与内存生命周期问题，应该由编译器在全图依赖和 profiling 信息上统一处理。

**系统流程是 pass + profiling 的两层循环。** DeepCompile 先接收 base compiler 的 IR，插入 sharded training 所需的 all-gather/release。随后每个 optimization pass 都会改写图并运行短 profiling，收集算子执行时间、通信时间和显存曲线；外层还会周期性跑训练迭代，以捕获 Adam optimizer state 等运行时状态带来的内存变化。这样后续 pass 看到的是“前面 pass 已经改变后的真实内存曲线”，能协调 prefetch、unsharding 和 offloading，而不是各自按静态启发式独立决策。

**Proactive prefetching 的核心是带内存约束的反向移动。** 设初始 schedule 为 \(S_0=[o_1,\dots,o_N]\)，显存上限为 \(M\)，profiled memory 为 \(\text{P}_{\text{mem}}(o)\)，all-gather buffer 大小为 \(\text{B}_{\text{ag}}(o)\)。算法从后往前扫描 all-gather，维护待提前集合 \(U\)，并检查：

$$
\tilde{m}_U=\sum_{o\in U\cup\{o_i\}}\text{B}_{\text{ag}}(o)
$$

$$
\tilde{m}_{i-1}=\text{P}_{\text{mem}}(o_{i-1})+\tilde{m}_U
$$

只有当 \(\tilde{m}_{i-1}<M\) 且 \(\tilde{m}_U<M_{\text{prefetch}}\) 时，all-gather 才能继续提前。这个条件直接表达了“通信越早越能重叠，但提前后 buffer 活得更久，不能压爆显存”的权衡。

**All-gather fusion 用实测通信曲线决定是否合并。** 对两个通信量 \(V_1,V_2\)，DeepCompile 用 profiled communication time \(T_c(V)\) 判断：

$$
T_c(V_1)+T_c(V_2)>\alpha\cdot T_c(V_1+V_2)
$$

若成立，则把两个 all-gather 合并。小消息的通信启动开销常常占主导，合并后虽然消息更大，但总时间可能更低。论文实验中 \(M_{\text{prefetch}}\) 设为 2GB，\(\alpha\) 约为 1.5；同时保留 prefetch group 上限，是为了给后续 selective unsharding 留出显存空间。

**Selective unsharding 利用 prefetch 后剩余显存减少重复通信。** 在 gradient accumulation step 为 \(n\) 时，模型会执行 \(n\) 次 forward/backward 后才更新参数；这段时间内，已经 gather 的参数如果保持 unsharded，就能避免后续 micro-step 重复 all-gather。DeepCompile 根据每个 all-gather 的通信时间和 buffer 大小排序，优先选择单位显存收益高的参数：

$$
\text{score}(o)=\frac{T_c(\text{B}_{\text{ag}}(o))}{\text{B}_{\text{ag}}(o)}
$$

直觉上，小消息通信效率较差，单位字节通信开销更高，所以保留这些参数的 unsharded 版本往往更划算。

**Adaptive offloading 只搬必要 optimizer state，并把搬运隐藏进训练时序。** Adam 的 momentum/variance 等 optimizer states 在 forward/backward 中不用，只在参数更新时需要。传统 ZeRO offload 往往把 optimizer state 大量移到 CPU，节省显存但参数更新很慢。DeepCompile 先把 optimizer states 切成 fragments，只 offload 会导致 \(M_{\text{peak}}+M_{\text{opt}}>M\) 的部分；forward 初期异步 offload，接近显存峰值前同步并释放；backward 中随着 activation 释放，再异步 reload 回 GPU。其内存约束可以概括为：

$$
\text{P}_{\text{mem}}(o_i)+M_{\text{opt}}-M^- \le M
$$

其中 \(M^-\) 是已经成功 offload 并释放的 optimizer state 大小。这样 offloading 不再是固定“训练前搬走、训练后搬回”的停顿，而是由 profiling 驱动的异步数据流。

**与 Alpa/Unity/nnScaler 等并行编译器的区别在于运行时内存曲线。** Alpa 类系统主要搜索并行策略与静态 cost model，DeepCompile 当前不重点发明新的 parallelism search，而是把 fully sharded 训练中的通信时序、buffer 生命周期和 optimizer state 迁移变成可组合的图 pass。它与 SimpleFSDP 也不同：SimpleFSDP 聚焦 compiler-based prefetch/fusion，而 DeepCompile 让后续 pass 读取前序 pass 的 profiling 结果，因此可以处理 prefetch 与 unsharding 的相互影响。

> 💡 关键：DeepCompile 的核心价值是“把运行时启发式变成可反馈的编译器图变换”。每个 pass 改图，每次 profiling 更新事实，后续 pass 再基于新的显存曲线做决策。

#### 🧪 练习题

```yaml
question: "DeepCompile 为什么建议先应用 proactive prefetching，再应用 selective unsharding？"
options:
  - "因为 unsharding 只能在 CPU 上执行"
  - "因为 prefetch 先占用必要的通信缓冲后，unsharding 才能用剩余显存选择保留哪些参数"
  - "因为 all-gather 在 fully sharded training 中不需要显存"
  - "因为 adaptive offloading 会禁用所有 prefetch 操作"
answer: 1
explain: "如果先 unshard，会尽可能占用空闲显存，导致 prefetch 缺少 buffer 而无法提前通信；先 prefetch 再 unshard 能让两种优化共享同一显存预算。"
```
