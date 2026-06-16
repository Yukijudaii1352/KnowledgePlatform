### Universal Checkpointing

```yaml
id: universal_ckpt
name: Universal Checkpointing
full_name: 原子检查点系统 (Universal Checkpointing)
year: '2025'
org: 学术研究
paper_url: https://www.usenix.org/conference/atc25/presentation/lian
category: checkpoint
parent: bytecheckpoint
motivation: 原子结构,动态并行策略
```

#### 📝 一句话总结

Universal Checkpointing (UCP) 提出 atomic checkpoint 与 pattern-based reconfiguration，把分布式 checkpoint 从具体并行策略和硬件 rank 划分中解耦，使大规模训练能在故障、弹性资源或阶段切换后用不同并行策略继续运行。

#### 🎯 核心要点

- Atomic checkpoint：以参数为中心保存 consolidated weight 和 optimizer state，不携带 rank id、padding 或源并行策略细节
- Reconfigurable parallelism：支持从 Source 并行策略 \(P_{src}\) 到 Target 并行策略 \(P_{tgt}\) 的自动转换
- Pattern set：用 Unique、Replicate、Partial、Shard-V、Shard-H、Shard-Hy、Shard-NC 等模式覆盖常见张量分片形态
- Pattern-aware operators：用 Extract、Union、StripPad、UcpInfo、Save、Load 将源分布式 checkpoint 转为 atomic checkpoint，再映射到目标 rank
- 数据类型处理：atomic checkpoint 中 weight/optimizer values 保持 FP32，同时支持恢复到 FP32、FP16、BF16 等训练格式
- 高效转换：nested parallel reconfiguration 将转换建模为 MapReduce，并按参数大小做负载均衡
- 冗余加载优化：同一 DP group 内避免重复从存储读相同 atomic files，转而读一次后用 GPU 间通信分发
- Lazy invocation：正常保存路径不做重排，只有 \(P_{src}\ne P_{tgt}\) 或硬件配置变化时才触发 reconfiguration

#### 🔬 深入细节

![Universal Checkpointing 系统设计总览](https://arxiv.org/html/2406.18820v3/x2.png)
*图：UCP 系统设计总览，来自 arXiv HTML Figure 2。UCP 从 Source 并行策略经过 atomic checkpoint 和 pattern-based reconfiguration pipeline 映射到 Target 并行策略。*

```python
# Universal Checkpointing: pattern-based reconfiguration

def convert_to_atomic(distributed_ckpts, source_parallelism):
    fragments_by_param = defaultdict(list)

    for ckpt_file in distributed_ckpts:
        for fragment in Extract(ckpt_file, source_parallelism):
            pattern = infer_pattern(fragment)  # Unique, Replicate, Shard-V, ...
            fragments_by_param[fragment.fqn].append((pattern, fragment))

    atomic = {}
    for fqn, fragments in fragments_by_param.items():
        merged = Union(pattern_aware_group(fragments))
        merged = StripPad(merged)
        atomic[fqn] = {
            "model.pt": merged.weight_fp32,
            "adam_m.pt": merged.adam_m_fp32,
            "adam_v.pt": merged.adam_v_fp32,
        }
    return atomic

def load_to_target(atomic, target_parallelism):
    mapping = UcpInfo(atomic, target_parallelism)
    for rank in target_parallelism.ranks:
        for layer in mapping.layers_for(rank):
            tensors = Load(atomic, mapping[rank][layer])
            place_on_gpu(rank, tensors)
            release_cpu_buffers(tensors)
```

UCP 解决的问题与 ByteCheckpoint 相近，但抽象更“参数中心”。已有分布式 checkpoint 常是 rank-local snapshot：ZeRO-3 会把参数和 optimizer state 展平后按 data parallel rank 切开；tensor parallel 会按列或行切矩阵；pipeline parallel 则按层分配到不同 stage。这些文件能高效保存，但与源并行策略、rank 数和 padding 规则强绑定。训练如果因为故障减少 GPU、因为弹性资源增加 GPU、或从 ZeRO/TP/PP 组合切到另一种 3D parallelism，工程师往往要写成对的转换脚本。

Atomic checkpoint 是 UCP 的统一中间表示。对一个参数 \(p\)，UCP 不保存“rank 3 拥有什么”，而保存“这个参数的完整逻辑状态是什么”。以 Adam 为例，一个参数目录可包含：

$$
A(p)=\{\text{model.pt}_{fp32},\ \text{adam\_m.pt}_{fp32},\ \text{adam\_v.pt}_{fp32}\}
$$

这里的 `model.pt` 是 FP32 权重，`adam_m.pt` 和 `adam_v.pt` 是 Adam 一阶、二阶矩。atomic checkpoint 比 rank-local checkpoint 更细粒度，也不包含源并行产生的 rank id、分片 padding 或临时 layout。这样它可以作为不同并行策略之间的 common interchange format。

Pattern-based reconfiguration 负责把“各种源 checkpoint”自动归一到 atomic checkpoint。UCP 观察到复杂并行策略虽然实现不同，但张量分片模式可归纳为有限集合：Unique 表示某参数只属于一个 checkpoint，例如 pipeline stage 独占层；Replicate 表示多个 rank 都保存相同参数；Shard-V/Shard-H 表示沿列或行切分；Shard-Hy 表示多维切分；Shard-NC 表示非连续或不规则切分，可覆盖 MoE fused weight、GQA 等新结构。转换过程用模式推断决定如何 Extract 片段，再用 Union 按模式合并。

这个过程可以抽象成从源并行到目标并行的两段映射：

$$
C_{atomic}=U(P_{src}, C_{distributed})
$$

$$
C_{target}=L(P_{tgt}, C_{atomic})
$$

其中 \(U\) 包含 Extract、Union、StripPad 和 Save，\(L\) 包含 UcpInfo 与 Load。这样新增一个目标并行策略时，不需要实现从所有旧策略到它的 \(N\) 个转换器，只需让目标策略能从 atomic checkpoint 生成自己的 rank-to-tensor mapping。

UCP 的设计保留了高效保存路径。直接在每次保存时合并全量参数会拖慢训练，并且 1T 参数级模型可能没有单机内存容纳 consolidated model state。UCP 因此采用 lazy invocation：正常训练仍按原分布式 checkpoint 方式保存；只有当恢复时发现 \(P_{src}\ne P_{tgt}\)、GPU 数变化或硬件配置变化，才触发 atomic conversion。论文报告这种 lazy 设计使正常 checkpoint saving 不增加关键路径开销。

真正触发转换时，UCP 用 nested parallel reconfiguration 控制成本。它把转换看作 MapReduce：mapper 读取源 checkpoint 并 Extract 参数片段，shuffler 按参数名发送片段，reducer 根据 pattern 合并成 atomic checkpoint。参数大小差异极大，例如 embedding 矩阵可能远大于 LayerNorm bias，因此 master 先按 `numel` 做组间负载均衡，再在每个 worker 内用多 CPU core 并行处理。这个两级并行避免了一个 worker 处理大参数、其他 worker 空等的 straggler 问题。

加载端还有一个 I/O 关键优化：同一 DP group 内很多 rank 需要相同或部分相同的 model state。朴素实现会让每个 rank 都从持久化存储读取同一 atomic file，放大存储带宽压力。UCP 将读取任务在 DP group 内均分，每个 rank 只读一部分 atomic files 到 CPU/GPU，再通过 all-gather 或类似 collective 分发给同组 rank。并且加载按 layer-by-layer 执行，单层放到 GPU 后释放 CPU buffer，把峰值 CPU 内存从“完整 checkpoint 大小”降到“单层状态大小”附近。

与 ByteCheckpoint 相比，UCP 更强调“任何源并行到任何目标并行”的通用转换语言和模式体系；ByteCheckpoint 更强调工业平台中多框架、多存储后端和 load-time byte-range 查询的工程化统一。两者都把 checkpoint 从 rank-local 文件提升到可重排的逻辑表示，但 UCP 的 atomic checkpoint 是更明确的中间格式，尤其适合 ZeRO、TP、PP、SP、MoE/GQA 等混合并行策略之间的弹性切换。

#### 🧪 练习题

```yaml
question: "UCP 采用 lazy reconfiguration invocation 的主要原因是什么？"
options:
  - "每次保存时都合并 atomic checkpoint 会拖慢正常训练，并可能需要过高内存"
  - "atomic checkpoint 只能用于推理，不能用于训练恢复"
  - "UCP 不支持源并行和目标并行不同的情况"
  - "lazy invocation 会降低 checkpoint 文件大小到原来的 1/10"
answer: 0
explain: "UCP 保持正常分布式保存路径不变，只在并行策略或硬件配置变化时触发转换，避免把昂贵的 consolidation 放入训练关键路径。"
```
