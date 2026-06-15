### Dynamic Context Parallelism: 动态上下文并行

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

Dynamic Context Parallelism 在 Megatron Core 中按 microbatch 的真实序列长度和 packing 结果动态选择 context-parallel 大小，解决变长训练中“短样本被最长样本过度切分”导致的通信浪费和 DP/PP 气泡问题。

#### 🎯 核心要点

- 针对 packed variable-length sequence：即使 pack 后 token 数相同，attention FLOPs 仍随各子序列长度平方变化，导致 DP rank 间工作量不平衡。
- 将 CP size 从全局静态配置改为每个 microbatch 的运行时选择，短序列可用较小 CP 甚至 CP=1，长序列才使用更大 CP。
- 初始化阶段预先构造多种 CP group，运行时只从 `PackedSeqParams` 选择 `cp_size` 和 `cp_group`，避免动态创建通信组。
- 数据调度器由 cost model、solver、simulator 组成，同时约束 FLOPs 均衡、显存峰值和 pipeline bubble。
- NVIDIA 官方博客报告在 Llama-13B 变量长度数据上，GitHub 数据集 1.48x、CommonCrawl 1.25x 加速，多千 GPU 生产环境可带来 35% 以上端到端提升。

#### 🔬 深入细节

##### 核心示意图

![Dynamic-CP 集成到 Megatron Core 的流程](https://developer-blogs.nvidia.com/wp-content/uploads/2026/01/Dynamic-CP-Integration-png.webp)
*图：Dynamic-CP 在 Megatron Core 中通过 data iterator wrapper、PackedSeqParams、动态 CP group 和 TE Attention 串起调度与执行。*

##### 算法伪代码

```python
# per global batch scheduling in Dynamic-CP
def dynamic_cp_iterator(global_samples, memory_limit):
    meta = probe_lengths_and_shapes(global_samples)
    plans = []

    for num_microbatches in candidate_counts():
        buckets = initialize_work_memory_quotas(meta, num_microbatches)
        for sample in sort_by_workload(meta):
            cp_size = smallest_power2_cp_that_fits(sample, memory_limit)
            assign_sample_to_bucket(sample, buckets, cp_size)

        plan = simulate_pp_dp_schedule(buckets)
        if plan.peak_memory <= memory_limit:
            plans.append(plan)

    best = min(plans, key=lambda p: p.iteration_time)
    for microbatch in best.microbatches:
        yield PackedSeqParams(
            tokens=microbatch.tokens,
            cu_seqlens=microbatch.cu_seqlens,
            cp_size=microbatch.cp_size,
            cp_group=prebuilt_cp_group(microbatch.cp_size),
        )
```

##### 方法解释

静态 context parallelism 的默认假设是：为了防止最长样本 OOM，整个 batch 都用同一个 CP 度切分序列。这个策略对长上下文预训练有效，但对真实后训练或视频 DiT 数据很浪费。一个 packed microbatch 可能包含多个短样本，attention 的有效计算是 \(\sum_i S_i^2\)，而不是 \((\sum_i S_i)^2\)。短样本本来能在单卡或小 CP 下完成，却被大 CP 切开，额外触发跨 GPU attention 通信。

Dynamic-CP 的核心是把“选择 CP 度”移动到数据调度层。调度器先读取每个样本的长度和形状元信息，估计每个样本的计算量与显存需求，然后在 packing 时决定 microbatch 的 CP size。若某个样本的显存超过单卡限制，就提高 CP；若样本较短，则保留小 CP，减少不必要的 KV 交换和 NCCL kernel 暴露。

运行时动态切换 CP 的难点是通信组一致性。Megatron Core 不能在每个 microbatch 临时创建 NCCL group，因此 Dynamic-CP 在初始化时为每个 rank 建好多组 CP group，大小从 1 到 \(dp \times cp\) 的 2 次幂。训练时 `PackedSeqParams` 携带当前 microbatch 的 `cp_size`、`cp_group`、`max_seqlen` 和 `cu_seqlens`，position embedding、Transformer Engine attention 和 FLOPs 统计都从该对象读取动态上下文。

> 💡 关键：Dynamic-CP 改的是“同一批数据如何 pack、每个 microbatch 用多大 CP、PP/DP 如何排程”，不是改变 attention 数学结果。

调度目标是双目标的：计算量希望均衡，显存希望不超限。由于 attention FLOPs 近似 \(O(S^2)\)，激活内存近似 \(O(S)\)，二者不可能总是同时完美均衡。NVIDIA 的实现使用 cost model 估计样本工作量，用 heuristic solver 做近似 packing，再用 simulator 评估 pipeline schedule，选择端到端迭代时间最小且满足峰值内存的方案。

##### 与传统 CP 的区别

LoongTrain、RingAttention 和静态 CP 更像是固定并行策略：给定 CP 度后，每个 batch 按同样方式沿序列切分。Dynamic-CP 则把 CP 度看作调度变量，使短样本避免跨 IB 域通信，使长样本仍能通过大 CP 满足显存约束。与动态 TP/PP 相比，动态 CP 只重排激活和通信组，不需要重分发权重或重建 pipeline 图，因此运行时开销更可控。

#### 🧪 练习题

```yaml
question: "Dynamic-CP 为什么比动态调整 TP/PP 更容易做到低开销？"
options:
  - "CP 只影响序列激活和 attention 通信组，不需要迁移模型权重或重建 pipeline"
  - "CP 完全不使用 NCCL 通信"
  - "CP 会把所有样本 pad 到同样长度"
  - "CP 只适用于推理，不参与训练"
answer: 0
explain: "TP/PP 动态变化通常涉及权重重分布或执行图变化，而 Dynamic-CP 通过预建通信组和 PackedSeqParams 在运行时选择序列切分。"
```
