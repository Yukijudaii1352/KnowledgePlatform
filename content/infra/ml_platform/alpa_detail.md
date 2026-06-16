### Alpa

```yaml
id: alpa
name: Alpa
full_name: Alpa自动并行 (Alpa)
year: '2022'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2201.12023
category: training_platform
parent: ray
motivation: 自动生成算子间与算子内并行策略
```

#### 📝 一句话总结

Alpa 提出分层自动并行编译系统，把大模型训练计划分解为算子间 pipeline 并行和算子内 SPMD 张量并行两级搜索，自动为 JAX 程序生成跨设备执行方案。

#### 🎯 核心要点

- 重新组织并行搜索空间：用 inter-operator parallelism 表示 stage/pipeline 切分，用 intra-operator parallelism 表示算子内部张量切分
- 将物理集群抽象为多个 device meshes，使高带宽 mesh 内执行 collective-heavy 的算子内并行，mesh 间执行 point-to-point pipeline 通信
- Intra-op pass 用 sharding spec 描述张量布局，为每个 HLO/JAX 算子选择 SPMD 并行算法并插入 resharding collective
- Inter-op pass 用动态规划搜索 layer/stage 切分、mesh 切分和 stage-mesh assignment，目标是在显存约束下最小化 pipeline latency
- Runtime orchestration pass 为每个 mesh 生成静态执行指令，协调同步 1F1B pipeline schedule 与跨 mesh activation/gradient 传输
- 以 JAX/XLA 为编译基础、Ray 为分布式运行支撑，让用户通过 `@parallelize` 标注训练函数而不是手写 Megatron/GPipe/ZeRO 组合策略

#### 🔬 深入细节

![Alpa 分层并行搜索空间示意图](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x1.png)
*图：来自 Alpa 论文 Figure 1，对比手工 plan、仅 intra-op、仅 inter-op 和 Alpa 的 hierarchical space。虚线框表示 pipeline stage，颜色表示不同设备。*

![Alpa compiler passes 与 runtime 架构图](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x3.png)
*图：来自 Alpa 论文 Figure 3，展示 inter-op pass、intra-op pass、runtime orchestration 如何把计算图和设备集群变成多个 mesh executable。*

```python
# Alpa hierarchical auto-parallel compilation, simplified.
def alpa_compile(train_step, cluster):
    ir = trace_jax_to_hlo(train_step)
    layers = cluster_hlo_ops_into_layers(ir)
    candidate_meshes = enumerate_device_mesh_partitions(cluster)

    # Inter-op DP asks the intra-op solver for each candidate stage/mesh cost.
    cost_cache = {}
    for layer_interval in all_contiguous_intervals(layers):
        for mesh in candidate_meshes:
            stage_hlo = slice_layers(ir, layer_interval)
            plan, cost, memory = solve_intra_op_ilp(stage_hlo, mesh)
            if memory <= mesh.memory_budget:
                cost_cache[layer_interval, mesh] = (plan, cost)

    best = dynamic_programming_over_stage_mesh_pairs(
        layers=layers,
        meshes=candidate_meshes,
        stage_costs=cost_cache,
        objective="min_pipeline_latency_with_memory_constraints",
    )

    executables = [xla_compile(stage.plan) for stage in best.stages]
    return build_runtime_schedule(executables, schedule="sync_1f1b")
```

Alpa 要解决的问题是大模型并行策略空间爆炸。对一个 Transformer 或 MoE 模型，用户可能同时需要数据并行、张量并行、ZeRO 式状态分片和 pipeline 并行；每层怎么切、哪些层放一个 stage、哪些 GPU 组成 tensor-parallel group、跨节点怎么流水，彼此强耦合。手工系统如 Megatron-LM 对规则 Transformer 很有效，但模型结构、集群拓扑或 batch 配置变化后，专家需要重新调参。Alpa 的核心观察是：不同并行方式可以按“是否切分单个算子”分成两层，先把联合搜索拆成可求解的子问题。

Intra-operator parallelism 关注一个 stage 内部的每个算子如何切张量。Alpa 用 sharding spec 描述张量布局，例如矩阵的 batch 维、行维或列维映射到 2D device mesh 的某个轴；如果相邻算子的输入输出布局不一致，就插入 resharding 通信，如 all-gather、all-reduce 或 all-to-all。对一个 stage，intra-op pass 可以抽象成：

$$
\min_{\pi} \sum_{v \in V} c_v(\pi_v) + \sum_{(u,v)\in E} r_{u,v}(\pi_u,\pi_v)
$$

其中 \(\pi_v\) 是算子 \(v\) 的并行算法和输出布局，\(c_v\) 是本地计算/collective 成本，\(r_{u,v}\) 是从上游布局转换到下游布局的 resharding 成本。论文将该问题形式化为 ILP，使同一个 pass 可以表达数据并行、operator parallelism、ZeRO update sharding 及其组合，而不是为每种模型写一套手工规则。

Inter-operator parallelism 关注 stage 级别的图切分和设备分配。给定一段连续 layers 和一个 mesh，inter-op pass 会调用 intra-op pass 得到该 stage 在该 mesh 上的最优局部成本，然后用动态规划搜索全局 stage-mesh 序列。若同步 1F1B pipeline 有 \(K\) 个 stage、\(M\) 个 microbatch，粗略 latency 可理解为：

$$
L \approx \sum_{s=1}^{K} t_s + (M-1)\max_s t_s + \sum_{s=1}^{K-1} \operatorname{comm}(s,s+1)
$$

其中 \(t_s\) 来自 intra-op solver 的 stage 执行成本，\(\operatorname{comm}\) 是相邻 mesh 之间传 activation/gradient 的点对点成本。这个公式体现了分层设计的意义：intra-op 尽量在高带宽 mesh 内做 collective 密集的张量切分，inter-op 则把跨 mesh 通信限制在 stage 边界。

Alpa 的 device mesh 抽象也很关键。现代集群的带宽不是均匀的：同机 GPU 之间可能有 NVLink/PCIe，高速但范围小；跨机网络带宽低且延迟高。Alpa 让 inter-op pass 决定如何把物理设备切成多个 logical mesh，并倾向把通信密集的 intra-op sharding 放在 mesh 内，把只传边界 activation/gradient 的 pipeline 放到 mesh 间。这比“所有 GPU 组成一个大 collective group”更符合实际硬件层次。

从用户体验看，Alpa 更像一个并行策略编译器。用户写普通 JAX 训练步骤并加 `@parallelize`，Alpa trace 出 IR 后自动运行 inter-op/intra-op/runtime 三类 pass，最终生成多个 mesh executable 和静态通信计划。它不改变损失函数，也不发明新的优化器；它把 Megatron 的张量并行、GPipe/PipeDream 的流水线并行、ZeRO 的分片思想放入统一搜索框架，降低了大模型训练从单机程序迁移到分布式集群的工程门槛。

> 💡 关键：Alpa 的创新点是“搜索空间分层”，不是单个新的 collective。它牺牲全局穷举最优性，换来可以在真实大模型和真实集群上编译出接近手工调优的并行计划。

#### 🧪 练习题

```yaml
question: "Alpa 为什么把自动并行分成 intra-operator 和 inter-operator 两层？"
options:
  - "因为这两层分别对应模型训练和模型推理"
  - "因为它们的粒度、通信模式和适合的硬件层级不同，分层后搜索空间更可控"
  - "因为 JAX 只能表达 pipeline，不能表达 tensor sharding"
  - "因为所有算子必须放在同一张 GPU 上运行"
answer: 1
explain: "intra-op 在算子内部切张量，通常需要 mesh 内 collective；inter-op 切 stage，主要做 stage 边界通信。分层优化可以降低组合爆炸。"
```
