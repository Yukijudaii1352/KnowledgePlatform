### Centauri: 通信分区调度

```yaml
id: centauri
name: Centauri
full_name: 通信分区调度 (Centauri)
year: '2024'
org: SJTU/Alibaba
paper_url: https://dl.acm.org/doi/abs/10.1145/3620666.3651379
category: comm
parent: coconet
motivation: 通信分区调度细粒度计算-通信重叠
```

#### 📝 一句话总结

Centauri 通过通信分区和层次化调度扩大计算-通信重叠空间，解决大模型混合并行训练中 collective 粒度过粗、依赖复杂而难以隐藏通信的问题。

#### 🎯 核心要点

- 针对 LLM 混合并行中的多类 collective：数据并行梯度、张量并行激活/梯度、流水线边界通信同时出现，调度空间高度耦合。
- 提出三维通信分区：primitive partitioning、group partitioning、workload partitioning，逐步把粗粒度 collective 拆成可调度子任务。
- 构造每个通信操作的 partition tree，在 operation/model 层级搜索可行分区方案。
- 使用 hierarchical scheduling 根据依赖关系和硬件层级决定哪些子通信应提前、延后或与计算重叠。
- ASPLOS 2024 论文报告 Centauri 可显著提升通信-计算重叠效率，并获得 ASPLOS 2024 Best Paper Award。

#### 🔬 深入细节

##### 核心示意图

![Centauri 论文 PDF，含 Figure 4 通信分区流程](https://openreview.net/pdf/58de1dd82ec19b52473be7e4af3f6ed777c4a525.pdf)
*图：可访问论文 PDF 中的 Figure 4 展示了对混合训练任务中 N 个通信操作构造分区树，并选择最小调度成本方案的流程。ACM 页面未直接暴露独立图片资源。*

##### 算法伪代码

```python
# Centauri-style communication partitioning and scheduling
def centauri_schedule(training_graph):
    comm_ops = extract_collectives(training_graph)
    partition_trees = {}

    for op in comm_ops:
        tree = PartitionTree(op)
        for primitive in split_primitives(op):          # primitive partitioning
            for group in split_process_groups(primitive):  # group partitioning
                for chunk in split_workload(group):     # workload partitioning
                    tree.add_candidate(chunk)
        partition_trees[op] = tree

    candidates = combine_partition_choices(partition_trees)
    best = min(candidates, key=lambda c: scheduling_cost(c, training_graph))
    return hierarchical_schedule(best, training_graph.dependencies)
```

##### 方法解释

大模型训练中的通信并不是单一 all-reduce。TP 可能在每层插入 all-reduce 或 all-gather，DP 在反向后同步梯度，PP 在 stage 间传激活和梯度。已有系统常用两类方法：一类是细粒度 kernel fusion，把通信和计算塞进同一个 kernel，但可能牺牲 GEMM/NCCL 的高性能实现；另一类是 operation-level scheduling，只移动完整 collective，粒度太粗，很多可重叠窗口无法利用。

Centauri 的核心是先拆通信，再调度通信。Primitive partitioning 把一个 collective 拆成更小的通信 primitive；group partitioning 按 rank group 或节点层级拆分通信范围；workload partitioning 再把数据量按 chunk 切开。拆分后，一个原本必须整体执行的 all-reduce 可以变成多个有依赖关系的子通信，其中一部分能提前启动，一部分能延后到计算空隙。

通信分区不是越细越好。过细会增加 kernel launch、同步和调度开销，也可能破坏 NCCL 的带宽效率。因此 Centauri 为每个通信操作构建 partition tree，节点表示不同层级的拆分选择，边表示从粗到细的分区扩展。调度器在这些树上选择一组方案，使总训练图的暴露通信时间最小：

$$
\min_{\pi \in \Pi} \; T_{\text{compute}} + T_{\text{comm}}^{\text{exposed}}(\pi) + T_{\text{overhead}}(\pi)
$$

> 💡 关键：Centauri 的“分区”是为了创造可重叠的调度单元，而不是单纯缩小通信消息。

层次化调度再考虑硬件拓扑和依赖。节点内通信、跨节点通信、不同并行维度的 collective 有不同带宽和竞争关系；调度器需要避免把所有子通信同时压到同一网络链路，也要保证某个计算 kernel 真正需要的数据已经到位。相比 CoCoNet 更偏编译融合，Centauri 更偏运行图层面的通信分区与调度搜索。

##### 与传统 overlap 的区别

传统 overlap 往往依赖框架自动把反向计算和梯度 all-reduce 异步重叠，粒度是 tensor bucket。Centauri 面向混合并行中的多种 collective，把“是否拆、怎么拆、拆到哪个 group、每块多大”纳入调度空间。这样它可以处理 TP/DP/PP 交织时的复杂依赖，而不只优化单一数据并行梯度同步。

#### 🧪 练习题

```yaml
question: "Centauri 为什么不直接把所有 collective 拆到最细粒度？"
options:
  - "过细分区会带来额外调度、同步和带宽效率损失，需要在重叠收益与开销之间权衡"
  - "细粒度分区会改变模型数学输出"
  - "collective 只能在 CPU 上执行"
  - "它只支持单 GPU 训练"
answer: 0
explain: "通信分区的目标是减少暴露通信时间，过度拆分会增加 overhead 并降低 collective 效率。"
```
