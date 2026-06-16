### cedar

```yaml
id: cedar
name: cedar
full_name: cedar统一数据管道 (cedar)
year: '2024'
org: 学术研究
paper_url: https://arxiv.org/abs/2401.08895
category: cache
parent: dali
motivation: 统一ML输入管道优化框架
```

#### 📝 一句话总结

cedar 提出统一的 ML 输入数据管道编程与优化框架，用 Feature/Pipe 抽象描述任意训练数据流，并由优化器自动组合 offloading、caching、prefetching、fusion、reordering 和动态缩放来提升训练输入吞吐。

#### 🎯 核心要点

- **统一编程模型**：用 `Feature` 表示逻辑数据流，用无状态 `Pipe` 表示 map/filter/batch/shuffle/UDF 等操作，支持 PyTorch、TensorFlow 和任意 Python 库
- **Source 与 DataSet 解耦**：Feature 不绑定物理数据源，Source 封装原始 dataset，DataSet 对训练框架暴露可迭代接口
- **语义约束显式化**：用户可标记 operator dependency、fixed operator 和 random operator，使 optimizer 能安全地重排和缓存
- **Optimization interface**：通过 `register`、`fuse`、`update_dfg`、`assign` 等接口插入 cache/prefetch/fused Pipe 并改写数据流图
- **Execution interface**：用 Driver、Variant、shard、mutate、scale 将 Pipe 映射到本地 Python 进程、分布式 worker 或框架专用 runtime
- **查询优化器式搜索**：按 reordering、caching、fusion/offloading、prefetching/sharding 的 pass 逐步枚举、打分和剪枝
- **动态资源缩放**：Client 运行时根据 prefetch buffer 和 per-Pipe metrics 找瓶颈，扩缩 offloaded Variant 的并行度以匹配训练吞吐需求
- **实验收益**：论文在 8 条多领域 pipeline 上相对 tf.data、tf.data service、Ray Data、PyTorch DataLoader 获得最高 1.87x 到 10.65x 性能提升

#### 🔬 深入细节

![cedar 框架总览](https://arxiv.org/html/2401.08895v2/x3.png)
*图：cedar block diagram，展示用户定义 Feature/Source/Backend 后，cedar DataSet、Optimizer、Client、Driver 与 Metadata Store 如何协同优化并执行输入管道。来源：arXiv HTML Figure 7。*

![cedar Feature API](https://arxiv.org/html/2401.08895v2/extracted/5367901/figures/img/api.png)
*图：cedar Feature API 示例，展示 Pipe 组合、dependency 标注与 random operator 标注。来源：arXiv HTML Figure 8。*

```python
# cedar 优化与执行主流程伪代码
def build_dataset(source, feature, backends, framework):
    graph = parse_feature_to_logical_dfg(feature, source)
    stats = profile_if_needed(graph, backends)

    # 1. 静态优化：像数据库查询优化器一样逐 pass 搜索
    plans = [graph]
    plans = choose_best_reordering(plans, stats, respect_dependencies=True)
    plans = choose_best_cache_location(plans, stats, forbid_after_random=True)
    plans = choose_best_fusion_and_offloading(plans, backends, stats)
    plan = insert_prefetch_and_choose_shards(best(plans), stats)

    return CedarDataSet(plan, backends, framework)

def train_loop(dataset, model):
    client = dataset.create_client()
    drivers = client.shard(dataset.plan.num_shards)
    for pipe, variant in dataset.plan.assignments:
        pipe.mutate(variant)
        pipe.scale(dataset.plan.initial_parallelism(pipe))

    for batch in client:
        model.step(batch)
        client.trace_runtime_stats()
        client.scaler.maybe_adjust()

def scaler_step(client):
    if client.output_prefetch_buffer_is_full():
        pipe = random_non_base_pipe()
        pipe.scale_down_or_mutate_to_base()
        return

    bottleneck = client.find_pipe_with_smallest_prefetch_buffer()
    if bottleneck is None:
        bottleneck = client.find_base_pipe_with_largest_profiled_latency()
    bottleneck.mutate_to_best_variant_if_needed()
    bottleneck.scale_up_until_throughput_plateaus()
```

**动机与背景：ML 输入管道的瓶颈来自“优化碎片化”。** 现代训练作业不是简单读取文件后喂给 GPU，而是持续执行 decode、parse、shuffle、filter、augmentation、tokenize、batch 等在线转换。传统 Spark/Beam 适合离线批处理，tf.data、PyTorch DataLoader、Ray Data 等各自提供部分优化，却通常绑定特定框架、特定 backend 或少量优化策略。更难的是，Python UDF 与随机增强具有语义约束：例如随机 crop 后缓存会破坏每个 epoch 的随机性，把 size-reducing crop 提前可能降低计算量，但只有在语义允许时才能重排。cedar 的目标是把这些优化机会统一放入一个可扩展 optimizer，而不是让用户手工拼凑。

**核心抽象是逻辑 Feature 与物理执行分离。** `Feature` 是由 `Pipe` 组成的逻辑 DAG，每个 Pipe 是无状态转换，可表示 one-to-one 的 map、many-to-one 的 batch、one-to-many 的 file reader，也可以 zip/unzip 形成非线性图。`Source` 封装物理数据集并发出 raw samples；训练代码只迭代 `DataSet`，无需知道某个 Pipe 是在本地 Python 进程、Ray worker、Kubernetes worker 还是框架 runtime 中执行。这个分离使 optimizer 能在同一个逻辑 pipeline 上尝试不同 physical plan。

**语义提示让优化器能安全改写黑盒 UDF。** cedar 不试图完全静态理解 Python 函数，而是要求用户提供轻量 hint。若 Pipe B 必须依赖 Pipe A，则通过 tag 与 `depends_on` 表达；若某个 Pipe 位置不能动，则 `fix()`；若某个 Pipe 是随机增强，则标记 random，optimizer 不会在其下游插入缓存。形式上，优化器搜索的计划必须满足用户约束：

$$
G^*=\arg\min_{G\in\mathcal{G}}\sum_{p\in G} cost(p),
\quad \mathrm{s.t.}\;G\;\mathrm{satisfies\;user\;constraints}
$$

这条约束是 cedar 与普通“自动调参”的关键区别：它不是只追吞吐，而是在不破坏训练数据语义的前提下改写数据流。

**静态优化 pass 像数据库查询优化器。** cedar 先 profile baseline plan，收集每个 Pipe 的平均 latency、输入/输出 sample size，以及某个 Pipe offload 到某个 Variant 后的 DataSet 吞吐。基础 cost 用 Pipe latency 在端到端 latency 中的占比表示：

$$
cost_{base}(p)=
\frac{lat_{base}(p)}{\sum_{i\in G_{base}}lat_{base}(i)}
\cdot \frac{1}{tput_{base}}
$$

reordering pass 根据每个 Pipe 的 size scaling factor \(S(p)=size_{out}(p)/size_{in}(p)\) 估计换序后的输入大小，并偏好把 crop/filter 这类降采样或缩小样本的操作前移：

$$
cost_R(p)=
\frac{size_{in,R}(p)}{size_{in,base}(p)}\cdot cost_{base}(p)
$$

caching pass 枚举允许的缓存位置，将 cache 之前的 exclusive ancestors 计算成本置零，同时加入读缓存的 IO 成本。fusion/offloading pass 枚举 Pipe 到 Variant 的分配并融合相邻可融合 Pipe，offloading 收益用 Amdahl's Law 从整体吞吐反推 Pipe 局部收益。最后 prefetching/sharding pass 在 offloaded Variant 后和输出端插入 prefetch Pipe，并选择 Driver 数量。

**动态缩放负责“刚好够用”，避免为了吞吐长期过度占资源。** 静态计划给出高吞吐结构，但训练实际需求会随 GPU、batch size、数据增强和后台资源波动。每个 Client 本地运行 Scaler：若输出 prefetch buffer 长期高于阈值，说明输入管道不是瓶颈，就随机挑一个非 base Variant 降并行度，必要时 mutate 回 base Variant；若 buffer 不足，则先找 offloaded Pipe 中 buffer 最小的瓶颈 Pipe 扩并行度，或者在所有已回退到 base 的候选中挑 profile latency 最大者重新 offload。论文选择这种 hill-climbing，是因为 Pipe 并行度对整体 throughput 通常呈凹形收益，扩到 plateau 后再加资源收益很低。

**容错与 exactly-once 通过 sample UUID 实现。** Source 给每个训练样本打 UUID，Client 追踪已返回样本；聚合 Pipe 会传播其输入 ID 集，filter 会传播空 DataSample。故障发生时，由于 Pipe 无状态，Client 可要求 Source 重新发出指定 sample ID 并重算下游结果；若重复 ID 到达，Client 不返回重复样本。对训练而言，这避免了故障恢复后样本重复或丢失造成收敛偏差。

**与传统输入系统相比，cedar 的定位更接近“ML 数据管道查询优化器”。** PyTorch DataLoader 主要解决本地多进程加载，tf.data/service 偏 TensorFlow 图和服务化执行，Ray Data 提供分布式数据处理但不系统组合随机性约束、缓存位置、operator reordering 与 framework-specific Variant。cedar 将这些作为同一搜索空间中的计划选择问题，并通过接口把新增 backend 或新增 optimization pass 接入 optimizer，从而解决“每个系统只会一种优化”的碎片化问题。

#### 🧪 练习题

```yaml
question: "cedar 为什么需要用户显式标注 random operator 和 dependency？"
options:
  - "为了让优化器在缓存和重排时不破坏训练数据语义，同时仍能搜索更多合法计划"
  - "为了把所有 Python UDF 编译成 SQL 查询"
  - "为了强制所有 Pipe 都只能在本地单进程执行"
  - "为了避免 DataSet 支持 PyTorch"
answer: 0
explain: "ML 输入管道含有黑盒 UDF 和随机增强，优化器无法可靠自动推断语义；轻量标注让 cedar 可以安全地排除非法缓存和重排，同时保留自动优化空间。"
```
