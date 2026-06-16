### ByteCheckpoint

```yaml
id: bytecheckpoint
name: ByteCheckpoint
full_name: 字节检查点系统 (ByteCheckpoint)
year: '2025'
org: ByteDance
paper_url: https://www.usenix.org/conference/nsdi25/presentation/wan-borui
category: checkpoint
parent: checkfreq
motivation: 10TB/s带宽,统一大模型检查点
```

#### 📝 一句话总结

ByteCheckpoint 提出一套面向大模型全生命周期的统一 checkpoint 系统，用与并行策略解耦的 shard metadata、load-time resharding 和全栈 I/O 优化，让不同训练框架、并行配置和存储后端都能共享同一保存/加载工作流。

#### 🎯 核心要点

- 统一 API：提供 `bytecheckpoint.save` 和 `bytecheckpoint.load`，屏蔽 Megatron-LM、FSDP、DDP 等框架差异
- 并行无关表示：用 FQN、global shape、ShardMeta、BasicMeta、ByteMeta 和全局 metadata 文件描述张量分片
- Load-time resharding：加载时根据目标并行配置查询 metadata 并生成读取计划，不需要离线 resharding job
- Dataloader resharding：区分 replicated state 与 sharded state，避免恢复时丢样本或重复训练已消费数据
- 计划优化：Worst-Fit 负载均衡、冗余读取消除、plan/metadata 缓存，把规划开销从每次 checkpoint 变成一次性成本
- 异步 pipeline：保存时流水化 D2H copy、序列化和上传；加载时流水化读取、反序列化、H2D copy 和 GPU 间通信
- 存储与通信优化：对 HDFS 做多线程随机读、分片写后 metadata concat，并优化大规模 collective barrier
- 生产规模：论文报告支撑 405B LFM 在 8960 GPU 上训练，I/O 吞吐达到 10TB/s 量级，并显著降低 checkpoint stall

#### 🔬 深入细节

![ByteCheckpoint 系统架构](https://arxiv.org/html/2407.20143v4/x4.png)
*图：ByteCheckpoint 架构图，来自 arXiv HTML Figure 4。API 层、Planner 层、Execution Engine 和 Storage I/O 层相互解耦，使同一 workflow 可覆盖不同训练框架与存储后端。*

```python
# ByteCheckpoint load-time resharding workflow

def save(states, path, framework, storage_backend):
    local_plan = Planner(framework).make_local_save_plan(states)
    global_plan = coordinator.gather_and_balance(local_plan, policy="worst_fit")
    metadata = build_global_metadata(global_plan)  # BasicMeta + ShardMeta + ByteMeta
    cache_plan_and_metadata_if_stable(global_plan, metadata)
    Engine(storage_backend).async_save_pipeline(global_plan, metadata)

def load(states, path, target_parallelism, framework, storage_backend):
    metadata = read_global_metadata(path)
    local_plan = []
    for tensor in states.model_and_optimizer_tensors():
        target_shards = Planner(framework).target_shards(tensor, target_parallelism)
        for shard in target_shards:
            segments = metadata.TensorShardToBasicByteMap.query(
                fqn=tensor.fqn,
                offsets=shard.nD_offsets,
                lengths=shard.nD_lengths,
            )
            local_plan.append((tensor, shard, segments))

    optimized_plan = coordinator.eliminate_redundant_reads(local_plan)
    Engine(storage_backend).async_load_pipeline(optimized_plan)
    async_collective_barrier()  # integrity guarantee for distributed load
```

ByteCheckpoint 的出发点是：大模型开发不是“一个训练任务周期性保存 checkpoint”这么简单。预训练、长上下文继续训练、SFT、Reward Modeling、PPO/DPO、自动评测和跨阶段迁移都会消费中间 checkpoint，而且每个阶段可能使用不同 GPU 数量、并行度、框架和存储系统。传统做法需要离线 resharding 脚本：先下载旧 checkpoint，按新并行配置重排，再上传新 checkpoint，训练或评测任务只能等待这个额外 job 完成。ByteCheckpoint 的核心判断是，checkpoint 文件格式不能绑定某一次训练的 rank 划分，而要保存足够的全局位置元数据，让加载端按目标并行配置直接取数。

它对模型和 optimizer state 的抽象围绕张量全局坐标展开。每个张量由 fully qualified name \(fqn\) 唯一标识，并有未分片前的 global shape。某个 rank 保存的分片用如下元组描述：

$$
\text{ShardMeta}=(fqn,\ nD\_offsets,\ nD\_lengths)
$$

其中 \(nD\_offsets\) 表示该分片在原始多维张量中的起始坐标，\(nD\_lengths\) 表示每一维长度。实际落盘位置再由：

$$
\text{ByteMeta}=(file\_id,\ byte\_offset,\ byte\_length)
$$

记录。全局 metadata 文件把 `ShardMeta + BasicMeta + ByteMeta` 连接成 `TensorShardToBasicByteMap`，加载时只要目标 shard 与某些已保存 shard 在全局坐标空间相交，就能按 byte range 读出所需片段。

这种表示让 load-time resharding 成为一次空间区间查询。设保存时的分片集合为 \(\mathcal{S}_{old}\)，目标并行策略下 rank \(r\) 需要的分片为 \(s_{new}^{(r)}\)，加载计划本质是：

$$
\text{ReadPlan}(r)=\{(s, s \cap s_{new}^{(r)}) \mid s \in \mathcal{S}_{old},\ s \cap s_{new}^{(r)} \ne \varnothing\}
$$

也就是说，ByteCheckpoint 不需要先重写成一个新 checkpoint；目标 worker 只读自己需要的旧 checkpoint 片段，并在内存中拼回目标 shard。这对评测和跨阶段迁移尤其关键，因为同一个原始 checkpoint 可以被多个下游任务复用。

Dataloader state 是另一个容易被低估的细节。模型权重能按张量坐标重排，但 dataloader 还包含 RNG、global step、token buffer、数据源 offset 等训练进度状态。ByteCheckpoint 将 dataloader state 分为 replicated state 和 sharded state：前者如数据源路径、采样比例，只由 rank 0 保存即可；后者如 token buffer 和数据检索 offset，按 I/O worker 单独保存。并行度变化时，token buffer 需要 split 或 merge，否则恢复后可能重复训练已经进入 buffer 的样本，或丢弃尚未形成 micro-batch 的 token。

性能优化分三层。第一层在 Planner：保存时用 Worst-Fit 按 tensor shard size 平衡保存负载，避免只让第一个 DP group 写所有 replicated state；加载时在 DP group 内消除冗余读取，一个 worker 从存储读入后通过 GPU interconnect/collective 转发给同组其他 worker。第二层在 Engine：保存 pipeline 将 D2H copy、序列化和上传分离，用 pinned CPU memory pool 与 ping-pong buffer 减少训练停顿；加载 pipeline 并行执行文件读取、反序列化、H2D copy 和 All-to-All。第三层在存储系统：HDFS 读取利用 offset random read 做多线程下载，写入则把大文件拆成多个 sub-file 并发写，最后用 metadata concat 合并。

ByteCheckpoint 与 Check-N-Run 的重点不同。Check-N-Run 主要减少推荐模型 checkpoint 的“数据量”，尤其是稀疏 embedding 的差异化与量化；ByteCheckpoint 主要解决大模型训练平台里的“表示与调度统一性”：同一个 checkpoint 能被不同并行策略、框架和存储后端高效加载。它不依赖某种模型稀疏性，而是通过 metadata 让 checkpoint 从 rank-local dump 变成可查询的全局张量片段数据库。

#### 🧪 练习题

```yaml
question: "ByteCheckpoint 实现 load-time resharding 的关键元数据是什么？"
options:
  - "只保存每个 rank 的本地文件名，不保存张量位置"
  - "用 ShardMeta 描述张量分片在全局张量中的偏移和长度，并用 ByteMeta 描述落盘字节范围"
  - "把所有 checkpoint 先合并成单个全量模型文件"
  - "只记录 GPU 拓扑，不记录 tensor shard 信息"
answer: 1
explain: "ByteCheckpoint 的全局 metadata 将 FQN、ShardMeta、BasicMeta 和 ByteMeta 关联起来，加载端可按目标并行配置查询需要读取的旧分片字节范围。"
```
