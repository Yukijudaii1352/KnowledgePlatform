### PagedAttention: 分页注意力 (PagedAttention)

```yaml
id: pagedattn
name: PagedAttention
full_name: 分页注意力 (PagedAttention)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2309.06180
category: kv_cache
parent: —
motivation: 引入虚拟内存分页解决显存碎片化
```

#### 📝 一句话总结

PagedAttention 把操作系统的分页思想引入 LLM serving，把每个请求的 KV cache 切成固定大小 block，并用 block table 把逻辑连续的 token 序列映射到物理上不连续的显存块。它不改变注意力数学结果，而是通过按需分配、非连续存储和共享前缀显著降低 KV cache 的碎片与重复拷贝。

#### 🎯 核心要点

- KV cache 分块：每个 KV block 容纳固定数量 token 的 key/value 向量，block size 记为 \(B\)
- 逻辑/物理分离：请求看到连续 logical KV blocks，GPU 上实际分配为可不连续的 physical KV blocks
- block table：每个请求维护逻辑块到物理块的映射，并记录最后块已填充位置
- PagedAttention kernel：attention 计算时先查 block table，再按物理块读取 K/V，输出仍是 exact attention
- 按需分配：不按最大输出长度预留，只有前面块填满时才申请新物理块，单请求浪费被限制在一个块内
- 内存共享：引用计数和 copy-on-write 支持 parallel sampling、beam search、shared prefix
- 系统效果：vLLM 基于该机制实现近零 KV cache 浪费，在相同延迟水平下相对 FasterTransformer/Orca 提升 2-4 倍吞吐

#### 🔬 深入细节

![PagedAttention 非连续 KV block](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x6.png)
*图：论文 Figure 5，PagedAttention 将注意力 Key/Value 存储在非连续物理块中，kernel 按块读取并完成注意力计算。*

![vLLM block table 翻译](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：论文 Figure 6，vLLM 通过 block table 把逻辑 KV blocks 映射到物理 KV blocks，并在 decode 过程中按需分配新块。*

```python
# PagedAttention 的 KV block 管理和注意力读取伪代码
def append_kv(seq, pos, k_t, v_t):
    logical_id = pos // BLOCK_SIZE
    offset = pos % BLOCK_SIZE

    if logical_id not in seq.block_table:
        physical_id = gpu_block_allocator.alloc()
        seq.block_table[logical_id] = {
            "physical": physical_id,
            "filled": 0,
            "refcnt": 1,
        }

    entry = seq.block_table[logical_id]
    write_block(entry["physical"], offset, k_t, v_t)
    entry["filled"] = max(entry["filled"], offset + 1)

def paged_attention(q_i, seq):
    numerator, denominator = 0.0, 0.0
    for logical_id in visible_logical_blocks(seq, q_i.position):
        entry = seq.block_table[logical_id]
        K_j, V_j = read_physical_block(entry["physical"], entry["filled"])
        scores = exp(q_i @ K_j.T / sqrt(d_head))
        numerator += scores @ V_j
        denominator += sum(scores)
    return numerator / denominator
```

论文将长度为 \(B\) 的 KV block 表示为：

$$
K_j = (k_{(j-1)B+1}, \ldots, k_{jB}),\quad
V_j = (v_{(j-1)B+1}, \ldots, v_{jB})
$$

对第 \(i\) 个 query，块级注意力可写为：

$$
A_{ij}=
\frac{\exp(q_i^\top K_j/\sqrt{d})}
{\sum_{t=1}^{\lceil i/B\rceil}\exp(q_i^\top K_t\mathbf{1}/\sqrt{d})},
\quad
o_i=\sum_{j=1}^{\lceil i/B\rceil} V_j A_{ij}^\top
$$

LLM serving 的核心难点是输出长度未知。传统连续 KV cache 管理通常要为每个请求预留最大长度，或者用动态连续张量扩容。前者产生严重内部碎片：请求实际输出远短于上限时，预留空间不能给别的请求用；后者会遇到外部碎片和搬移成本。论文指出，在已有系统中，实际 token 状态只占 KV cache 分配的一部分，碎片和重复复制限制了可并发 batch size。

PagedAttention 的核心抽象是把 token 序列的逻辑连续性和显存物理连续性解耦。一个请求的 logical block 0、1、2 在语义上连续，但它们可以映射到物理块 7、1、3。attention kernel 不再假设 K/V 是一整段连续数组，而是拿到该请求的 block table，逐块读取物理地址。这类似操作系统页表：进程看到连续虚拟地址，页表负责翻译到任意物理页。

这个设计不改变注意力结果。普通 causal attention 对所有可见历史 token 做 \(q_iK^\top\)、softmax、再乘 \(V\)；PagedAttention 只是把 \(K,V\) 分成多个块，逐块累积等价的 softmax 归一化与 value 加权。额外开销是 block table 间接寻址和处理非连续块，但收益是 KV cache 不必连续、无需最大长度预留，且可以把更多请求同时放进显存。

decode 流程上，prefill 阶段只为 prompt 已产生的 KV cache 分配足够 block。每个 decode iteration，vLLM 先由 scheduler 选择可批处理的序列，再为即将写入的新 token 分配必要物理块。如果最后一个 logical block 还有空位，新 K/V 直接写入该块并更新 `#filled`；如果块满了，才申请新的 physical block 并在 block table 中增加映射。请求结束时，相关物理块返回 allocator。

内存浪费被固定 block size 控制。因为每个请求总是从左到右填充 block，除最后一个未满块外，其余块都接近满载；所以单请求内部碎片上界约为一个 block。block size 越大，kernel 一次读块的并行度更好，但最后块浪费也更大；block size 越小，碎片更低，但 block table 和 kernel 间接访问开销更高。论文在 vLLM 中通过实验选择合适区间，而不是把它当成纯算法常数。

PagedAttention 还把共享前缀变成自然的数据结构操作。在 parallel sampling 中，同一 prompt 的多个样本可以把 prompt logical blocks 映射到同一批 physical blocks，并用引用计数记录共享。当某个样本要写入仍被多个序列共享的最后块时，vLLM 执行 copy-on-write：复制一个物理块、降低旧块引用计数，然后只让该样本写新块。beam search 也类似，不同 beam candidate 可以共享尚未分叉的历史块，淘汰候选时只减少引用计数并释放归零的块。

与 FasterTransformer 或 Orca 这类连续缓存/调度思路相比，PagedAttention 的创新点在于把注意力 kernel 和内存管理一起设计。仅有 iteration-level scheduling 仍会受 KV cache 浪费限制；仅有分页 allocator 但 kernel 仍要求连续 K/V 也无法工作。vLLM 的 scheduler、KV block manager、GPU block allocator 和 PagedAttention kernel 共同构成系统：scheduler 下发当前 batch 的 token 与 block table，GPU worker 按映射读取历史 K/V 并写入新 K/V。

论文报告 vLLM 在多种模型和 workload 上相对 FasterTransformer/Orca 达到 2-4 倍吞吐提升，同等延迟下改善在长序列、大模型、复杂解码算法中更明显。注意这不是因为模型输出更近似或减少层数，而是因为显存里能容纳更多真实有效的 KV cache，从而服务系统能维持更大的动态 batch。

> 💡 关键：PagedAttention 是 KV cache 的“页表化”。它把显存管理从“给每个请求切一整段连续大数组”改成“按 token 增长逐块映射”，因此同时解决碎片、预留浪费和前缀共享。

#### 🧪 练习题

```yaml
question: "PagedAttention 中 block table 的作用是什么？"
options:
  - "记录模型每层权重的量化比例"
  - "把请求的逻辑 KV blocks 映射到物理 KV blocks"
  - "为 beam search 排序所有候选 token"
  - "替代 Transformer 的位置编码"
answer: 1
explain: "block table 类似页表，让逻辑连续的 KV cache 可以存放在非连续物理显存块中，并支持按需分配和共享。"
```
