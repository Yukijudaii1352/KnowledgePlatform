### nnScaler

```yaml
id: nnscaler
name: nnScaler
full_name: nnScaler
year: "2024"
org: Microsoft
paper_url: https://arxiv.org/abs/2312.05009
category: training_platform
parent: alpa
motivation: 约束引导的并行策略生成
```

#### 📝 一句话总结

nnScaler 提出约束引导的并行策略生成方式，让用户用少量并行约束表达意图，系统自动在可行空间内生成高效的张量/数据/流水线执行计划。

#### 🎯 核心要点

- 通过 parallelism constraints 缩小自动并行搜索空间，兼顾人工可控性和系统自动化
- 将深度学习程序转换为 IR，分析张量切分、重计算、通信和内存约束
- 支持用户约束部分张量/算子的 sharding，其余策略由编译器补全
- 生成包含 collective、reshard 和调度顺序的分布式执行图
- 目标是解决纯自动搜索成本高、纯手写策略迁移困难的问题

#### 🔬 深入细节

> 图示说明：论文方法图可概括为：PyTorch 程序进入 nnScaler IR，用户提供并行约束，策略生成器求解可行 sharding/placement，最后输出带通信的分布式程序。

```python
# nnScaler 约束引导并行伪代码
program = trace_to_ir(model_step)
constraints = [
    shard(tensor='attention.qkv.weight', dim='heads'),
    replicate(op='layernorm'),
    pipeline_boundary(after='block_23')
]
space = build_parallel_search_space(program, constraints)
plan = solve_min_cost(space, memory_limit, topology)
dist_program = insert_collectives_and_reshards(program, plan)
run(dist_program)
```

纯自动并行系统的难点是搜索空间巨大，而且成本模型不一定了解用户的工程偏好；纯手写 Megatron/DeepSpeed 配置又把策略绑定到具体模型结构。nnScaler 试图在两者之间取中间路线。

约束是它的关键接口。用户可以声明某些张量必须按 head 维切分、某些算子必须复制、某个 block 后建立 pipeline 边界；系统只在满足这些约束的策略空间内搜索和补全。

编译器需要处理 reshard：相邻算子如果期望不同的张量布局，就要插入 all-gather、reduce-scatter、all-to-all 等通信。成本模型同时估计计算、通信、显存和重计算影响。

与 Alpa 相比，nnScaler 更强调“constraint-guided”而非完全自动；这对生产训练很实用，因为工程师常常知道硬件拓扑或模型结构中的硬约束，只是不想手写所有通信细节。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "nnScaler 的核心接口思想是什么？"
options:
  - "用户给出部分并行约束，系统自动补全可行高效计划"
  - "用户只能选择单卡训练"
  - "系统随机切分张量"
  - "只保存实验指标"
answer: 0
explain: "约束引导缩小搜索空间，同时保留用户对关键并行决策的控制。"
```
