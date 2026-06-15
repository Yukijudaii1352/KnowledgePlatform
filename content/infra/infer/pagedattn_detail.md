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

PagedAttention 把操作系统分页思想引入 KV cache 管理，用固定大小 block 和 block table 解决长文本 LLM serving 的显存碎片、过度预留和前缀共享问题。

#### 🎯 核心要点

- 将每个请求的 KV cache 切成固定大小 blocks
- 通过 block table 把逻辑序列块映射到非连续物理显存块
- 按需分配和释放 KV blocks，降低内部/外部碎片
- copy-on-write 支持 beam search、parallel sampling 和共享前缀
- 构成 vLLM 连续批处理高吞吐的核心内存机制

#### 🔬 深入细节

![PagedAttention 核心示意图](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x2.png)
*图：vLLM/PagedAttention 的 block table 与物理 KV block 映射。*

```python
# PagedAttention KV block 管理
for token in request.tokens:
    logical = token.position // block_size
    if logical not in request.block_table:
        request.block_table[logical] = allocator.alloc_block()
    block = request.block_table[logical]
    write_kv(block, token.position % block_size, token.K, token.V)

# attention kernel 间接寻址历史 KV
for logical in visible_blocks(query):
    block = block_table[logical]
    out += attend(query, block.K, block.V)
```

##### 动机与背景

LLM 请求输出长度未知，传统连续 KV cache 要么按最大长度预留，浪费大量显存；要么动态扩容连续张量，产生搬移和碎片。长上下文、多租户和多候选解码会放大这个问题。

##### 核心机制

PagedAttention 让逻辑 token 序列连续，但物理显存块可以不连续。每个请求维护 block table，注意力 kernel 读取 K/V 时先查表再访问物理块。固定 block size 让 allocator 简单且可复用。

##### 训练/推理流程

prefill 时写入多个 block；decode 时当前 block 未满就追加 K/V，满后申请新 block。请求结束后释放其物理块。多个候选共享前缀时，前缀 block 引用计数共享，写入分叉块时 copy-on-write。

##### 与传统方法的区别

PagedAttention 不改变注意力结果，只改变 cache 物理布局。相比静态连续分配，它把显存需求从按最大长度预留改为按实际 token 数逐块分配，显著提高 serving batch 容量。

#### 🧪 练习题

```yaml
question: "PagedAttention 的核心数据结构是什么？"
options:
  - "奖励模型"
  - "逻辑块到物理块的 block table"
  - "全局排序队列"
  - "低秩矩阵"
answer: 1
explain: "block table 让逻辑连续的 KV cache 存在非连续物理块中，从而减少碎片和预留浪费。"
```
