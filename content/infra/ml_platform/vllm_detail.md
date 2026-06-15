### vLLM

```yaml
id: vllm
name: vLLM
full_name: vLLM
year: "2023"
org: UC Berkeley
paper_url: https://arxiv.org/abs/2309.06180
category: inference_system
parent: kserve
motivation: 提出PagedAttention，极大提升LLM推理吞吐量
```

#### 📝 一句话总结

vLLM 提出 PagedAttention，用操作系统分页思想管理 LLM KV cache，使请求的 KV 块可非连续存储和共享，从而显著降低显存浪费并提升高并发推理吞吐。

#### 🎯 核心要点

- PagedAttention 将每个序列 KV cache 划分为固定大小 block，逻辑块映射到非连续物理块
- KV cache manager 按需分配/释放 block，避免最大长度预分配造成的内部和外部碎片
- 支持 parallel sampling、beam search 等场景下的 block 级共享与 copy-on-write
- 集中式 scheduler 协调请求批处理、抢占和 GPU worker 执行
- 论文显示在相同延迟下较 FasterTransformer/Orca 获得 2-4 倍吞吐提升

#### 🔬 深入细节

![vLLM 核心示意图](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x5.png)
*图：图示展示 vLLM 系统架构：scheduler、KV cache manager、CPU/GPU block allocator 与多个 GPU worker 协同。*

```python
# PagedAttention / vLLM 调度伪代码
for iteration in decoding_loop:
    batch = scheduler.select_ready_requests(memory_budget)
    for req in batch:
        if req.needs_new_token_block():
            block = kv_allocator.allocate()
            req.block_table.append(block)
    logits = paged_attention_kernel(batch, block_tables)
    next_tokens = sample(logits)
    scheduler.update_requests(batch, next_tokens)
    kv_allocator.free_finished_request_blocks()
```

LLM 解码吞吐往往受 KV cache 显存限制，而不是纯计算限制。传统系统为每个请求按最大序列长度预留连续 KV tensor，实际输出长度未知时会产生大量 reserved waste、内部碎片和外部碎片。

PagedAttention 借鉴虚拟内存分页。逻辑上，一个请求的 token 序列仍是连续的；物理上，它的 KV cache 被切成固定大小 block，block table 记录逻辑块到物理块的映射，attention kernel 根据表去读取非连续块。

固定大小 block 消除了外部碎片，按需分配降低预留浪费。对于 beam search 或 parallel sampling，共享 prompt 部分 KV block 并用 copy-on-write 分叉，可以避免重复存储相同上下文。

与 KServe/TF Serving 这类平台相比，vLLM 是专门的 LLM serving engine。它最重要的贡献不是 API，而是把显存管理纳入 attention 算法设计，让调度器和 kernel 共同优化吞吐。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "PagedAttention 主要优化 LLM 推理中的哪类内存？"
options:
  - "KV cache"
  - "模型源码"
  - "训练标签"
  - "HTTP header"
answer: 0
explain: "PagedAttention 用分页式 block 管理 KV cache，降低碎片和重复存储。"
```
