### vLLM: vLLM引擎 (vLLM)

```yaml
id: vllm
name: vLLM
full_name: vLLM引擎 (vLLM)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2309.06180
category: engine
parent: pagedattn
motivation: 集成PagedAttention的高吞吐引擎
```

#### 📝 一句话总结

vLLM 基于 PagedAttention 构建高吞吐 LLM serving 引擎，用分页式 KV cache、block table、copy-on-write 和 preemptive scheduling 解决显存碎片与重复 KV 复制问题，从而支撑更大的 continuous batch。

#### 🎯 核心要点

- PagedAttention 把每个请求的 KV cache 切成固定 token 数的 logical blocks，并映射到非连续 physical blocks。
- block table 承担虚拟内存页表角色，让 Attention kernel 按表读取离散 KV blocks，而上层仍看到连续 token 序列。
- 按需分配 block 减少预留式 contiguous KV cache 的 internal/external fragmentation，使显存浪费接近 block 尾部未填满空间。
- 支持 parallel sampling、beam search 和 shared prefix，通过 block 级共享与 copy-on-write 避免重复存储公共前缀。
- vLLM 将 block manager、scheduler、GPU workers 和 PagedAttention CUDA kernel 组合为端到端服务系统。
- 分布式执行采用 Megatron-LM 风格 tensor parallelism，中心 scheduler 维护统一 block table，各 GPU shard 只存自己 attention heads 的 KV。

#### 🔬 深入细节

![vLLM PagedAttention block table 图示](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：ar5iv 从 vLLM/PagedAttention 论文生成的 Figure 3，展示 logical KV blocks、block table 与 GPU physical KV blocks 的映射。*

```python
# vLLM / PagedAttention 推理循环概念化伪代码
while True:
    scheduler.admit(new_requests())

    batch = scheduler.select_running_requests(
        token_budget=max_tokens_per_step,
        block_budget=kv_cache_manager.free_blocks(),
    )

    for seq in batch:
        if seq.needs_new_block():
            physical = kv_cache_manager.allocate_block()
            seq.block_table.append(physical)

    logits = model.forward(
        input_tokens=[seq.last_token for seq in batch],
        block_tables=[seq.block_table for seq in batch],
        paged_kv_cache=kv_cache_manager.physical_blocks,
    )

    for seq, token in sample(logits):
        seq.append(token)          # append may fill current block or allocate next block
        if seq.finished():
            kv_cache_manager.free(seq.block_table)
        elif seq.is_forked() and seq.writes_shared_block():
            seq.block_table[-1] = kv_cache_manager.copy_on_write(seq.block_table[-1])
```

vLLM 论文指出 LLM serving 的吞吐瓶颈常常不是模型权重，而是动态增长的 KV cache。以 A100 40GB 上的 13B 模型为例，权重常驻显存，KV cache 可能占接近三成显存；传统系统为了让每个请求的 KV tensor 连续，会按最大长度或预测长度预留一大段空间。真实输出长度未知，短请求会留下大量 internal fragmentation；不同大小的连续段在反复分配释放后又造成 external fragmentation。结果是 batch size 被 KV 显存浪费限制，而不是被算力限制。

PagedAttention 借鉴操作系统虚拟内存。对请求 \(r\)，逻辑上仍有连续的 token 序列，但 KV 被切成固定大小 block：

$$
\text{logical\_block\_id}(t)=\left\lfloor\frac{t}{B}\right\rfloor,\quad
\text{offset}(t)=t\bmod B
$$

block table 负责把 \((\text{logical\_block\_id}, \text{offset})\) 翻译为 GPU 上的 physical KV block 地址。因为 physical blocks 大小相同、可非连续分配，外部碎片基本消失；因为只在需要时追加 block，内部碎片上界约为每个序列最后一个 block 的空槽，而不是整段最大长度预留。

PagedAttention 的 Attention 计算与标准 causal attention 数学一致：

$$
o_t=\operatorname{softmax}\left(\frac{q_tK_{1:t}^{\top}}{\sqrt{d}}\right)V_{1:t}
$$

变化在于 \(K_{1:t},V_{1:t}\) 不再要求物理连续。CUDA kernel 根据 block table 逐块读取 KV，并把 variable sequence length 的 batch 组织在同一次 kernel 中执行。论文实现还融合了 reshape + block write、block read + attention，以及 copy-on-write 引发的 block copy，避免分页抽象本身带来过多 kernel launch 和小拷贝开销。

vLLM 在系统层把 PagedAttention 与调度器绑在一起。scheduler 每轮选择可运行请求时不仅考虑请求状态，也考虑剩余 physical KV blocks；block manager 负责 allocate、free、fork、append。parallel sampling 和 beam search 会从同一个 prompt 分叉多个序列，传统实现要复制完整前缀 KV；vLLM 让多个序列的 block table 指向同一批 physical blocks，并维护引用计数。只有当某个序列要写入共享 block 时才 copy-on-write，因此前缀共享可以表达为：

$$
\operatorname{mem}_{\text{shared}}\approx \operatorname{mem}(\text{prefix})+\sum_i \operatorname{mem}(\text{suffix}_i)
$$

而不是 \(\sum_i \operatorname{mem}(\text{prefix}+\text{suffix}_i)\)。这也是它在 beam search、parallel sampling 和共享系统提示词场景中收益更大的原因。

分布式执行中，vLLM 使用 Megatron-LM 风格 tensor parallelism：线性层按 shard 计算，GPU workers 通过 all-reduce 同步中间结果；Attention head 维度被切分，所以每个 worker 只保存自己负责 head 的 KV cache。中心 scheduler 维护单一 KV cache manager 和 block table，并在每个 decoding iteration 开始时把 input token ids 与 block table 广播给所有 workers。这样内存管理决策集中在调度器，GPU worker 无需在运行中协商 block 分配，只按收到的映射执行 PagedAttention。

与 Orca 的关系可以这样理解：Orca 证明了 iteration-level scheduling 能提升生成服务吞吐，但它仍依赖预留或连续式 KV 管理；vLLM 继承 continuous batching 的服务模型，同时把 KV cache 改造成“分页内存”。当 KV 浪费下降后，同样延迟目标下可以同时容纳更多请求，因此论文报告 vLLM 相对 FasterTransformer/Orca 在多种 workload 上有 2-4 倍吞吐提升，且长序列、大模型和复杂 decoding 下提升更明显。

> 💡 关键：PagedAttention 不是新的注意力近似；它保持 attention 结果不变，只改变 KV cache 的物理布局和读取方式，让 serving scheduler 能把显存用在真实 token 状态上。

#### 🧪 练习题

```yaml
question: "vLLM 中 block table 的作用最接近操作系统里的什么结构？"
options:
  - "页表：把逻辑 token block 映射到物理 KV block"
  - "进程调度器：决定线程优先级"
  - "文件系统目录：记录文件名"
  - "编译器优化器：重写模型权重"
answer: 0
explain: "PagedAttention 将 KV cache 分成固定大小 block；block table 像页表一样把逻辑连续的 token 位置映射到物理上可非连续的 KV block。"
```
