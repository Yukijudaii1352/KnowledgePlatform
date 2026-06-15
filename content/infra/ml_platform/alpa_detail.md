### Alpa

```yaml
id: alpa
name: Alpa
full_name: Alpa自动并行 (Alpa)
year: "2022"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2201.12023
category: training_platform
parent: ray
motivation: 自动生成算子间与算子内并行策略
```

#### 📝 一句话总结

Alpa 提出自动并行化系统，将深度学习计算划分为算子间 pipeline 并行和算子内张量并行两层搜索问题，自动为 JAX 程序生成跨设备执行策略。

#### 🎯 核心要点

- 将并行空间分解为 inter-operator parallelism 与 intra-operator parallelism，降低联合搜索复杂度
- 用 dynamic programming 搜索 layer/stage 切分和设备 mesh 分配
- 对每个 stage 内部用 XLA/GSPMD 风格的张量切分搜索生成 SPMD 程序
- 自动估计计算、通信和内存成本，选择满足显存约束的最小延迟策略
- 以 Ray 作为分布式运行基础，面向大模型训练自动组合数据/张量/流水线并行

#### 🔬 深入细节

> 图示说明：论文总览图展示两层自动并行：先把计算图切为 pipeline stages 并分配 device mesh，再在每个 mesh 内为算子张量维度选择 sharding strategy。

```python
# Alpa 两层自动并行搜索伪代码
jaxpr = trace_jax_program(train_step)
layers = cluster_ops_into_layers(jaxpr)

best_plan = None
for stage_partition in candidate_pipeline_partitions(layers):
    for mesh_assignment in candidate_meshes(devices, stage_partition):
        stage_costs = []
        for stage in stage_partition:
            spmd_plan = search_intra_operator_sharding(stage, mesh_assignment[stage])
            stage_costs.append(cost(spmd_plan))
        best_plan = min_by_latency(best_plan, compose(stage_costs))

compile_and_run(best_plan)
```

大模型并行策略空间非常大：某层可以数据并行、张量并行或流水线并行，不同层还可以使用不同设备组。手工为每个模型设计 3D 并行策略需要大量专家经验，且模型结构变化后要重做。

Alpa 的关键洞察是把搜索分层。算子间并行决定哪些 layer 放入同一 stage、stage 间如何流水；算子内并行决定一个 stage 内每个矩阵乘、reshape、reduce 的张量维度如何切分。

算子内部分借鉴 XLA SPMD partitioner，为 HLO 图中的张量维度选择 sharding spec，并插入 collective communication。算子间部分用动态规划在 stage 切分和 mesh 分配上搜索，目标是在内存约束下最小化 pipeline latency。

与 Megatron/GPipe/PipeDream 的手工策略相比，Alpa 更像并行策略编译器。它并不发明新的梯度公式，而是把已有并行原语系统化组合，降低模型迁移到大规模集群的工程门槛。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Alpa 自动并行的核心分解是什么？"
options:
  - "把模型分为训练和推理两个程序"
  - "把搜索分为算子间并行与算子内并行"
  - "只搜索学习率"
  - "只做数据并行"
answer: 1
explain: "Alpa 用两层搜索降低自动并行策略空间复杂度。"
```
