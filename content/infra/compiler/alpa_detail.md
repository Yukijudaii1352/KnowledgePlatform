### Alpa — Automating Inter- and Intra-Operator Parallelism for Distributed Deep Learning

```yaml
id: alpa
name: Alpa
full_name: 自动层间层内并行分布式编译器 (Alpa)
year: '2022'
org: UC Berkeley
paper_url: https://www.usenix.org/conference/osdi22/presentation/zheng-lianmin
category: graph_compilers
parent: xla
motivation: 两级分层优化统一层间与层内并行，自动搜索最优分布式策略
```

#### 📝 一句话总结

Alpa 提出一种两级分层的分布式深度学习编译器，把模型并行计划拆成 inter-operator pipeline/stage 切分和 intra-operator SPMD sharding 两个子问题，用 DP + ILP 自动生成跨设备执行计划，解决大模型并行策略长期依赖人工设计的问题。

#### 🎯 核心要点

- **重新分类并行方式**：把数据并行、算子并行、ZeRO、Megatron 张量并行等归入 intra-operator parallelism，把 pipeline/device placement 归入 inter-operator parallelism
- **两级层次化计划空间**：inter-op 决定图如何切 stage、集群如何切 device mesh、stage 如何映射到 mesh；intra-op 决定每个 stage 内各算子的张量分片方式
- **Intra-op ILP**：在单个 device mesh 内采用 SPMD/GSPMD 风格，为每个 HLO 算子选择 sharding strategy，用整数线性规划最小化计算、通信和 resharding 代价
- **Inter-op DP**：枚举 stage-mesh pair，调用 intra-op pass 得到每个 pair 的执行代价，再用动态规划最小化 pipeline latency
- **Device mesh 设计**：优先把 intra-op 放在高带宽 mesh 内，跨 mesh 用 inter-op pipeline 和较小的点对点 activation 通信连接
- **Runtime orchestration**：每个 stage 编译为 XLA/GSPMD parallel executable，运行时插入跨 mesh send/recv、resharding 和 1F1B pipeline 调度
- **泛化到异构模型**：在 GPT、MoE、Wide-ResNet 等模型上匹配或超过 Megatron-LM、DeepSpeed 等手工方案；对 MoE 在多节点上显著优于缺少 inter-op 的专用系统

#### 🔬 深入细节

![Alpa 两级并行计划空间](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x1.png)
*图：Alpa 将单一 intra-op 或 inter-op 计划扩展为层次化计划空间，同时组合算子内分片和算子间 pipeline stage。来源：论文 Figure 1。*

![Alpa 编译与运行时架构](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x3.png)
*图：inter-op pass、intra-op pass 和 runtime orchestration pass 共同生成 sharded stages 与跨 mesh 执行计划。来源：论文 Figure 3。*

```python
# Alpa 编译流程伪代码：inter-op DP 调 intra-op ILP
def alpa_compile(model_graph, cluster, micro_batches):
    ops = flatten_graph(model_graph)
    layers = operator_clustering(ops)  # 把细粒度 HLO 聚成 DP 可处理的层
    submeshes = enumerate_submesh_shapes(cluster)

    # 1. 为所有 stage-mesh pair 查询 intra-op 最优代价
    stage_cost = {}
    stage_plan = {}
    for start in range(len(layers)):
        for end in range(start + 1, len(layers) + 1):
            stage = layers[start:end]
            for mesh in submeshes:
                plan, cost, memory = intra_op_ilp(stage, mesh)
                if memory <= mesh.device_memory:
                    stage_cost[(start, end, mesh)] = cost
                    stage_plan[(start, end, mesh)] = plan

    # 2. inter-op 动态规划：切分 layers，并把连续 stage 分配到 mesh
    dp = initialize_dp()
    for prefix_len in range(1, len(layers) + 1):
        for used_meshes in mesh_prefixes(cluster):
            for cut in range(prefix_len):
                for mesh in available_last_meshes(used_meshes):
                    stage_time = stage_cost.get((cut, prefix_len, mesh), inf)
                    candidate = pipeline_latency(
                        previous=dp[cut, used_meshes - mesh],
                        stage_time=stage_time,
                        micro_batches=micro_batches,
                    )
                    dp[prefix_len, used_meshes] = min(dp[prefix_len, used_meshes], candidate)

    # 3. 回溯得到 stage 切分、mesh 映射和每个 stage 的 sharding plan
    hierarchical_plan = backtrack(dp, stage_plan)
    return compile_with_xla_gspmd_and_runtime(hierarchical_plan)
```

**动机与背景：单一并行范式无法覆盖大模型训练。** 数据并行简单但复制参数，模型过大时显存不足；Megatron-LM 这类张量并行擅长 Transformer 中的 matmul，但需要专家为特定架构设计切分规则；pipeline parallelism 降低跨节点通信量，却会产生 pipeline bubble 和 stage 负载不均。Alpa 的观察是：这些不是互斥方案，而是发生在不同粒度的两类并行。intra-op 切分算子内部张量轴，通信频繁但能充分利用高带宽设备；inter-op 切分计算图 stage，通信通常只是 stage 边界 activation，更适合跨低带宽节点。

**层次化计划空间：先把难问题拆成两个可解子问题。** 一个完整执行计划可以表示为：

$$
\Pi = \{(G_1, M_1, S_1), (G_2, M_2, S_2), \ldots, (G_p, M_p, S_p)\},
$$

其中 \(G_i\) 是第 \(i\) 个 stage 的子图，\(M_i\) 是分配给该 stage 的 device mesh，\(S_i\) 是该 mesh 内的 intra-op sharding strategy。Alpa 不直接在所有可能的 \(\Pi\) 上联合搜索，因为组合空间巨大；它让 intra-op pass 负责“给定 stage 和 mesh，找最佳 sharding 及代价”，让 inter-op pass 负责“选择哪些 stage 放到哪些 mesh 上”。这种分解不是理论全局最优保证，但把搜索从不可控的联合空间降到两个结构化优化问题。

**Intra-op：用 ILP 选择 SPMD sharding。** 对一个 stage 内的计算图 \(G=(V,E)\)，每个节点 \(v\) 有若干候选并行算法或 sharding strategy，记 one-hot 决策向量为：

$$
s_v \in \{0,1\}^{k_v}, \quad \mathbf{1}^\top s_v = 1.
$$

每个策略有 compute cost \(d_v\) 和 communication cost \(c_v\)。若边 \((u,v)\) 两端策略产生不同 tensor layout，还会引入 resharding cost \(r_{uvij}\)。一个简化的 ILP 目标可写作：

$$
\min \sum_{v\in V}(c_v+d_v)^\top s_v
+ \sum_{(u,v)\in E}\sum_{i,j} r_{uvij} z_{uvij},
$$

其中 \(z_{uvij}\) 表示“\(u\) 选策略 \(i\) 且 \(v\) 选策略 \(j\)”的线性化辅助变量。这样，数据并行、ZeRO 参数/梯度分片、Megatron 张量并行都变成同一个 strategy selection 问题。Alpa 借助 XLA/GSPMD 的 sharding propagation 和 collective insertion，把 ILP 结果落成可执行 SPMD 程序。

**Inter-op：DP 选择 stage 切分和 mesh 分配。** Inter-op pass 先把 HLO graph flatten 并聚类为较粗的 layer 序列，再枚举连续 layer 区间作为候选 stage，枚举 cluster 的 submesh shape 作为候选 mesh。每个 stage-mesh pair 的代价由 intra-op ILP 返回。若 stage 时间为 \(t_i\)，使用同步 1F1B pipeline 且有 \(B\) 个 micro-batches，一个常用 latency 近似是：

$$
T_{\text{pipeline}} \approx \sum_{i=1}^{p} t_i + (B-1)\max_i t_i.
$$

第一项是 pipeline 填充和排空，第二项由最慢 stage 决定稳态吞吐。DP 的目标就是在显存约束下选择切分点和 mesh，使这个 pipeline latency 尽量低。论文还用 operator clustering 限制候选数量，使最优 layer clustering 可在 \(O(K^2L)\) 时间内求得，其中 \(K\) 是算子数、\(L\) 是聚类层数超参数。

**跨 mesh orchestration：让两级计划真正运行起来。** Intra-op 编译会在 mesh 内插入 all-reduce、all-gather、reduce-scatter 等 collective；inter-op 还需要处理 stage 之间张量 layout 不一致时的 cross-mesh resharding。Alpa 的 runtime orchestration pass 生成静态 send/recv 与必要的局部 all-gather，使相邻 stage 可以在不同 mesh shape 上交接 activation。这里的设计体现了 Alpa 的工程判断：跨 stage 通信通常小于 intra-op collective，过度精确建模会让 DP 状态指数膨胀，所以系统主要把高带宽/低带宽拓扑通过 mesh 切分和 stage 映射表达出来。

**与 XLA/GSPMD 和手工系统的关系。** Alpa 不是从零实现所有底层并行 primitive，而是站在 XLA/GSPMD 之上自动选择 sharding，并补上跨 stage 的 pipeline 编排。相比 Megatron-LM 或 DeepSpeed 的专家规则，Alpa 的优势是搜索空间覆盖更通用：Transformer、MoE、Wide-ResNet 这类结构差异很大的模型都能走同一编译流程。论文结果显示，Alpa 在 GPT 上可匹配手工 Megatron-LM，在 MoE 上因能自动引入 inter-op pipeline 跨节点扩展，相比 DeepSpeed 在 2 节点和 4 节点设置分别达到 3.5× 和 9.7× 加速。

> 💡 关键：Alpa 的核心不是发明一种新的通信 primitive，而是把“stage 怎么切”和“stage 内怎么 shard”分层建模，让 XLA/GSPMD 能在自动搜索出的层次化计划中发挥作用。

#### 🧪 练习题

```yaml
question: "Alpa 为什么把并行搜索拆成 inter-op DP 和 intra-op ILP 两级？"
options:
  - "因为 ILP 只能处理 pipeline stage，不能处理张量分片"
  - "因为所有模型都只需要 pipeline parallelism"
  - "因为联合搜索空间过大，两级分解能分别优化 stage/mesh 映射和 mesh 内 sharding"
  - "因为 XLA 不支持任何 collective communication"
answer: 2
explain: "Alpa 将跨 stage 的切分与映射交给 inter-op DP，将单个 stage 在 device mesh 内的 sharding 交给 intra-op ILP，从而把原本巨大的联合计划空间拆成两个结构化子问题。"
```
