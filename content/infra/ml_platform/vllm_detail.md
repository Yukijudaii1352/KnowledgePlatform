### vLLM

```yaml
id: vllm
name: vLLM
full_name: vLLM
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2309.06180
category: inference_system
parent: kserve
motivation: 提出PagedAttention，极大提升LLM推理吞吐量
```

#### 📝 一句话总结

vLLM 提出 PagedAttention，把操作系统分页思想引入 LLM KV cache 管理，让连续逻辑 token 的 KV 可以映射到非连续物理 block，从而减少显存浪费、支持 cache 共享，并显著提升高并发推理吞吐。

#### 🎯 核心要点

- PagedAttention 将每个序列的 KV cache 划分为固定大小 KV block，通过 block table 完成逻辑块到物理块的映射。
- KV cache manager 按需分配和释放 GPU/CPU block，避免按最大输出长度预分配连续 tensor 带来的 reserved waste、内部碎片和外部碎片。
- PagedAttention kernel 根据 block table 读取非连续 KV block，在 attention 计算中保持逻辑连续视图。
- 通过 reference count 与 copy-on-write 支持 parallel sampling、beam search 和 shared prefix 场景下的 KV cache 共享。
- 中央 scheduler 与 block manager 协同进行 continuous batching、抢占、recompute/swap 和分布式 GPU worker 执行。
- 论文在 ShareGPT/Alpaca 等 workload 上显示，在相同延迟水平下，vLLM 相比 FasterTransformer/Orca 可获得约 2-4 倍吞吐提升，长上下文和复杂 decoding 更受益。

#### 🔬 深入细节

![vLLM block table 翻译示意图](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：vLLM 论文 Figure 6，来源为 ar5iv/arXiv HTML；逻辑 KV block 通过 block table 映射到 GPU DRAM 中非连续的物理 KV block。*

```python
# vLLM decoding loop with PagedAttention（简化伪代码）
while scheduler.has_unfinished_requests():
    batch = scheduler.select_requests(policy="FCFS", memory_budget=kv_allocator.free_blocks)

    for seq in batch:
        # prefill 阶段可能一次写入多个 token；decode 阶段通常每步追加一个 token
        needed = seq.required_new_kv_blocks()
        for _ in range(needed):
            physical_block = kv_allocator.allocate_gpu_block()
            seq.block_table.append(physical_block)

    input_tokens = scheduler.pack_current_step_tokens(batch)
    block_tables = [seq.block_table for seq in batch]

    # kernel 按 block table 读取非连续 KV，并把新 KV 写入当前 block
    logits, new_kv = model.forward_with_paged_attention(input_tokens, block_tables)
    next_tokens = sampler.sample(logits, batch.sampling_params)

    for seq, token in zip(batch, next_tokens):
        seq.append(token)
        if seq.finished():
            kv_allocator.free(seq.block_table)
        elif kv_allocator.needs_preemption():
            scheduler.preempt_latest(seq, mode="swap_or_recompute")
```

LLM serving 的主要瓶颈往往不是单步矩阵乘本身，而是能否在 GPU 显存中容纳足够多并发请求。每个 token 在每一层都产生 key/value 向量，KV cache 会随 prompt 和生成长度增长；输出长度在请求开始时未知，因此传统系统若为每个请求按最大长度预留连续 tensor，会把大量显存锁在未来可能用不到的位置上。论文将浪费分为保留未用位置、内部碎片和外部碎片，这些浪费会直接压低 batch size，导致 GPU 算力利用率不足。

PagedAttention 的核心是把 KV cache 的地址空间虚拟化。对一个序列而言，逻辑 token 仍然是连续的；对 GPU allocator 而言，存储被切成固定大小 block，序列的第 \(j\) 个逻辑 block 可以映射到任意空闲物理 block。设 block size 为 \(B\)，第 \(j\) 个 key/value block 为：

$$
K_j=(k_{(j-1)B+1},\ldots,k_{jB}), \qquad
V_j=(v_{(j-1)B+1},\ldots,v_{jB})
$$

对第 \(i\) 个 query token，attention 不再假设所有 \(K,V\) 在一段连续地址中，而是按 block table 逐块读取：

$$
A_{ij}=\operatorname{softmax}_j\left(\frac{q_i^\top K_j}{\sqrt d}\right), \qquad
o_i=\sum_{j=1}^{\lceil i/B\rceil} A_{ij}V_j
$$

公式的直觉是：数学上的 attention 仍然覆盖所有历史 token，只是 kernel 获取历史 KV 的方式从“连续数组下标”变成“查表后访问物理块”。只要 block table 维护正确，模型语义不变，显存分配却可以动态增长。由于每个请求只可能在最后一个 block 留有空位，浪费上界被限制在一个 block 内；block 越小，碎片越低，但 kernel 管理和调度开销越高，因此实现需要在 block size、访存合并和调度复杂度之间折中。

PagedAttention 还把复杂 decoding 的 cache 共享变成自然结果。parallel sampling 中，同一个 prompt 会分叉成多个输出；beam search 中，多个 beam 在早期共享前缀，后续逐步分叉。传统系统常需要复制大量 KV tensor，而 vLLM 让多个逻辑 block 指向同一个物理 block，并维护 reference count。当某个分支要写入共享 block 时，系统只复制一个 block 并更新映射，这就是 block 粒度的 copy-on-write。共享关系由 block table 隐藏，模型执行只看到每个序列的物理 block 列表。

系统层面，vLLM 将 scheduler、KV cache manager 和 GPU worker 共同设计。scheduler 负责选择当前 batch、执行抢占策略并发送每个请求的 token 与 block table；KV cache manager 负责 GPU block、CPU block、swap 或 recompute；GPU worker 只需按调度器给出的 block table 执行模型分片，并通过 NCCL 等 collective 同步张量并行结果。相比 KServe 这种平台控制面，vLLM 的位置更靠近推理引擎内核：它把显存管理、attention kernel 和 batching 策略绑定起来优化吞吐。

> 💡 关键：PagedAttention 的价值不只是“省显存”，而是把可变长、可共享、可抢占的 KV cache 变成一个分页对象，使调度器可以用更多并发请求填满 GPU。

#### 🧪 练习题

```yaml
question: "PagedAttention 中 block table 的主要作用是什么？"
options:
  - "记录逻辑 KV block 到非连续物理 KV block 的映射，让 attention kernel 按表访问历史 KV"
  - "保存模型权重的梯度，供反向传播使用"
  - "把所有请求强制填充到相同最大长度"
  - "替代 tokenizer，把文本直接转换成 logits"
answer: 0
explain: "vLLM 保持逻辑序列连续，但物理 KV block 可以非连续分配；block table 是二者之间的地址翻译层。"
```
