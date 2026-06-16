### Dynamic Context Parallelism (动态上下文并行)

```yaml
id: dynamic_cp
name: Dynamic Context Parallelism
full_name: 动态上下文并行 (Dynamic Context Parallelism)
year: '2026'
org: NVIDIA
paper_url: https://github.com/NVIDIA/Megatron-LM
category: tp
parent: loogtrain
motivation: 自适应调整并行尺寸实现变长序列1.48x加速
```

#### 📝 一句话总结

Dynamic Context Parallelism 在 Megatron Core 中按 microbatch 的真实 packed sequence 形状动态选择 CP size 和 CP group，解决变长序列训练里短样本被最长样本强制大规模 context sharding 后产生的通信浪费与 DP/PP 气泡问题。

#### 🎯 核心要点

- 面向 variable-length packed sequences：pack 后 token 总数相同，attention FLOPs 仍由子序列长度平方和决定。
- 动态 CP size：短样本或轻工作量 microbatch 使用较小 CP，长样本才升高 CP 以满足显存约束。
- 预建多组 CP group：初始化时为每个 rank 创建多个 power-of-two CP group，运行时只选择，不临时建通信组。
- `PackedSeqParams` 承载动态配置：把 `cp_size`、`cp_group`、`max_seqlen`、`cu_seqlens` 传给 position embedding、TE Attention、FLOPs 统计等组件。
- 三段式调度器：cost model 估计样本执行成本，solver 近似 packing 与 CP 分配，simulator 在 PP/DP schedule 下评估端到端时间和峰值显存。
- 官方结果：NVIDIA 博客报告 Llama-13B 在 GitHub 与 CommonCrawl 数据集上分别达到 1.48x 与 1.25x 加速，多千 GPU 工业环境端到端提升超过 35%。

#### 🔬 深入细节

##### 远程示意图

![Dynamic-CP 集成到 Megatron Core 的流程](https://developer-blogs.nvidia.com/wp-content/uploads/2026/01/Dynamic-CP-Integration-png.webp)
*图：NVIDIA 官方技术博客 Figure 6，展示 Dynamic-CP 如何通过 data iterator wrapper、PackedSeqParams、CP group 广播、position embedding、Transformer Engine Attention 和 FLOPs 统计集成到 Megatron Core。*

![Dynamic-CP 降低 DP/PP 气泡](https://developer-blogs.nvidia.com/wp-content/uploads/2026/01/Dynamic-CP-1-png.webp)
*图：NVIDIA 官方技术博客 Figure 5，展示调度前后的 DP rank 与 microbatch 工作量气泡变化。*

##### 算法伪代码

```python
# Dynamic Context Parallelism scheduler and runtime selection
def plan_dynamic_cp(global_batch, dp_size, pp_size, max_cp_size, memory_limit):
    samples = probe_sequence_lengths_and_shapes(global_batch)
    candidates = []

    for microbatch_count in grid_search_counts(start=pp_size, stop=small_multiple(pp_size)):
        quotas = build_work_and_memory_quotas(samples, dp_size, microbatch_count, pp_size)
        buckets = initialize_microbatch_buckets(dp_size, microbatch_count, quotas)

        for sample in sort_by_estimated_work(samples, descending=True):
            cp_size = 1
            while estimate_memory(sample, cp_size) > memory_limit:
                cp_size *= 2
                assert cp_size <= max_cp_size

            bucket = choose_bucket_by_work_then_memory(buckets, sample, cp_size)
            bucket.add(sample, cp_size=cp_size)

        schedule = simulate_pipeline_and_dp_execution(buckets)
        if schedule.peak_memory <= memory_limit:
            candidates.append(schedule)

    return min(candidates, key=lambda s: s.estimated_iteration_time)

def dynamic_cp_data_iterator(data_iterator, prebuilt_cp_groups):
    for global_batch in data_iterator:
        schedule = plan_dynamic_cp(global_batch, dp_size, pp_size, max_cp_size, memory_limit)
        for microbatch in schedule.microbatches_for_this_rank():
            cp_size = microbatch.cp_size
            yield PackedSeqParams(
                tokens=microbatch.tokens_thd,
                cu_seqlens=microbatch.cu_seqlens,
                max_seqlen=microbatch.max_seqlen,
                cp_size=cp_size,
                cp_group=prebuilt_cp_groups[cp_size],
            )
```

##### 机制解读

静态 Context Parallelism 通常为整次训练或整个 batch 使用同一个 CP size。这个选择必须能容纳最长样本，否则长序列会 OOM；但真实后训练、长文档和视频 DiT 数据有明显长尾分布，绝大多数 packed microbatch 并不需要最大 CP。结果是短序列也被切到多张 GPU 上，attention 计算量不足以隐藏 NCCL 通信，尤其当 CP 通信跨 InfiniBand 域时，通信 kernel 会暴露成瓶颈。

Dynamic-CP 的第一步是认识到 packed token 数相等不代表工作量相等。一个 packed 样本包含若干子序列 \(\{S_i\}\) 时，注意力有效计算近似与平方和相关：

$$
C_{\mathrm{attn}} \propto \sum_i S_i^2
$$

激活显存则更接近线性：

$$
M_{\mathrm{act}} \propto \sum_i S_i
$$

因此 FLOPs 均衡和显存均衡并不总能同时满足：把短样本凑到一起可以平衡工作量，但可能推高一个 microbatch 的 token 峰值；把长样本拆得更细可以控显存，却会增加 CP 通信。Dynamic-CP 的调度器在这两个目标之间做近似搜索。

在 Megatron Core 集成上，Dynamic-CP 避免了动态 TP/PP 那类高开销重构。TP/PP 改变通常意味着权重重分布或 pipeline graph 重建；CP 改变主要影响序列激活分片和 attention 通信组。系统在初始化阶段为 rank 预先构造多个 CP group，大小从 1 到 \(dp \times cp\) 的 2 次幂。运行时 `PackedSeqParams` 携带当前 microbatch 的 `cp_size` 与 `cp_group`，让 position embedding 和 Transformer Engine Attention 从该对象读取动态 CP 配置，而不是读取全局静态 CP 变量。

调度器由 cost model、solver、simulator 三段组成。Cost model 用序列长度和模型配置估计每个样本的执行时间；solver 使用启发式方法把样本打包成 microbatch，并给重样本分配更大 CP size；simulator 再把候选 microbatch 放进 DP/PP schedule 中，估计 pipeline bubble、DP rank 等待和峰值显存。NVIDIA 博客给出的端到端平衡公式可以写为：

$$
W_1(m_1V+p-1)=W_2(m_2V+p-1)
$$

其中 \(W_i\) 是第 \(i\) 个 DP rank 的 microbatch 工作量 quota，\(m_i\) 是 microbatch 数，\(V\) 是 virtual pipeline stage 数，\(p\) 是 pipeline stage 数。这个公式表达的是：不同 DP rank 的总执行时间应接近，而不是只让每个 microbatch 的 token 数相同。

Zero-overhead execution 的关键在于把额外工作移出主训练路径。为生成计划，系统需要额外 probe 一次 global batch 的长度与形状元信息；NVIDIA 的方案将 probe 分散到集群并只 gather 轻量 metadata。Solver 运行在 `data_sampler` 后台，与当前训练 iteration 重叠；microbatch 数不是全量穷举，而是在从 \(PP \times 1\) 到小倍数 \(PP\) 的小网格中找 knee point，限制搜索区域。

官方 benchmark 使用 Llama-13B、global batch size 2048、PP=8、CP=8、full recompute，并把 Dynamic CP 与 only packing 对比。GitHub 数据集 TFLOPS/GPU 从 195.88 提升到 289.32：

$$
\frac{289.32}{195.88}\approx 1.48
$$

CommonCrawl 数据集从 139.17 到 174.39：

$$
\frac{174.39}{139.17}\approx 1.25
$$

这些数字说明 Dynamic-CP 的收益主要来自减少变长样本引入的 DP 等待、PP 气泡和短样本过度 CP 通信，而不是改变 attention 的数学语义。训练 loss 仍按 valid token 归一化：

$$
\mathcal{L}=\frac{\sum_{\text{valid token}} \ell}{N_{\text{valid token}}}
$$

这避免 padding token 或不同 packing 形状改变优化目标。

#### 🧪 练习题

```yaml
question: "Dynamic Context Parallelism 为什么要把 cp_size 放进 PackedSeqParams？"
options:
  - "因为每个 microbatch 可能选择不同 CP group，运行时组件不能再依赖全局静态 CP 配置"
  - "因为 cp_size 决定模型参数量，必须写入 checkpoint"
  - "因为它会把所有变长样本强制 pad 到同一长度"
  - "因为 Dynamic-CP 只适用于推理，不需要训练 scheduler"
answer: 0
explain: "Dynamic-CP 的核心是按 microbatch 切换 CP size。PackedSeqParams 携带 cp_size 和 cp_group，保证 position embedding、TE Attention 和 FLOPs 统计使用一致的动态上下文配置。"
```
