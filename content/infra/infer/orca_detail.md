### Orca: 虎鲸 (Orca)

```yaml
id: orca
name: Orca
full_name: 虎鲸 (Orca)
year: '2022'
org: SNU
paper_url: https://www.usenix.org/conference/osdi22/presentation/yu
category: engine
parent: —
motivation: 首次提出迭代级调度实现连续批处理
```

#### 📝 一句话总结

Orca 提出了 iteration-level scheduling 和 selective batching，把生成式 Transformer 服务从“整批请求跑到结束”改成“每轮 token 重新调度”，解决早完成请求被长请求拖住、晚到请求无法插队以及不同阶段请求难以共同批处理的问题。

#### 🎯 核心要点

- 以 decode iteration 为调度粒度：调度器每次只让执行引擎运行一轮模型，而不是把一批请求固定到全部完成。
- 用 request pool 替代静态 request queue：已到达但未完成的请求持续留在池中，每轮按到达顺序、最大 batch size 和 KV slot 预算选择。
- 区分 initiation phase 与 increment phase：长 prompt 的首次 prefill 和后续单 token decode 可以在同一调度机制下被统一管理。
- selective batching 只批量化不依赖 request 边界的算子，把 Attention 按请求拆开执行，再把结果 merge 回 token-wise batch。
- Attention K/V manager 维护跨 iteration 的 key/value 状态，调度器用 `max_tokens` 预留 KV slot，避免运行中因 cache 空间不足死锁。
- 支持 inter-layer 与 intra-layer model parallelism，并利用迭代级调度改善流水线并行中的空泡。

#### 🔬 深入细节

![Orca selective batching 图示](https://insujang.github.io/assets/images/240107/orca_selective_batching.png)
*图：Insu Jang 技术笔记中对 Orca 论文 Figure 5 的重绘，展示 selective batching；方法依据来自 USENIX OSDI 2022 官方论文 PDF，USENIX 页面未提供单独拆分的图片直链。*

```python
# Orca iteration-level scheduling，整理自论文 Algorithm 1
n_scheduled = 0
n_reserved = 0

while True:
    batch = []
    for req in sort_by_arrival_time(request_pool):
        if req.state == "RUNNING":
            continue
        if len(batch) == max_batch_size:
            break
        if req.state == "INITIATION":
            if n_reserved + req.max_tokens > n_kv_slots:
                break
            n_reserved += req.max_tokens
        batch.append(req)

    engine.run_one_iteration(batch)
    for req in batch:
        req.state = "RUNNING"
        n_scheduled += 1

    if n_scheduled == n_workers:
        returned = engine.wait_returned_batch()
        for req in returned:
            req.state = "INCREMENT"
            if req.finished():
                request_pool.remove(req)
                n_reserved -= req.max_tokens
        n_scheduled -= 1
```

Orca 的出发点是生成式 Transformer 与传统单次推理模型的执行形态不同。GPT 类模型一次请求要经历多次完整模型前向：首次 iteration 读入 prompt 并生成第一个 token，后续每个 iteration 只读入上一个 token 并生成下一个 token。若服务系统像 Triton + FasterTransformer 那样按 request-level batch 调度，一旦某个请求提前生成 `<EOS>`，它仍要等待同 batch 中最长请求结束；新来的请求也只能等当前 batch 全部完成。因此，静态 batching 在输出长度分布很宽时会同时制造额外计算、额外排队和响应延迟。

Orca 的核心机制是把调度接口下沉到“运行一轮模型”。每轮结束后，scheduler 都能观察哪些请求完成、哪些请求仍需继续 decode，并把新请求纳入下一轮候选集合。可以把系统状态理解为一个请求池 \(P\)，每轮调度选择：

$$
B_t=\operatorname{Select}(P_t,\ \text{max\_bs},\ \text{free\_kv\_slots})
$$

执行引擎只对 \(B_t\) 跑一次模型前向并返回一个 token。这个设计后来通常被称为 continuous batching：batch 的成员在 token iteration 之间连续变化，而不是在一个长请求批次生命周期内保持不变。

selective batching 解决的是另一个关键矛盾：迭代级调度会把不同阶段的请求放在同一批里，例如两个请求在 increment phase，只处理 \([1,H]\) token；另两个请求仍在 initiation phase，prompt 长度可能是 \([2,H]\) 与 \([3,H]\)。非 Attention 算子如 Linear、LayerNorm、Add、GeLU 通常只需要 token-wise 输入，可把所有 token 拼成：

$$
X_{\text{flat}}\in\mathbb{R}^{(\sum_i L_i)\times H}
$$

一起执行以复用参数读带宽。但 Attention 必须知道每个 token 属于哪个请求，因为 causal attention 只能访问同一请求的历史 KV；它天然需要 request boundary。Orca 因此在 Attention 前执行 Split，按请求分别计算 attention，再 Merge 回 flat tensor，让大部分参数化算子仍然享受 batching。

从机制上看，Orca 不是改变 Transformer 数学，而是改变 serving 系统与执行引擎的契约。Attention 中每层每个 token 的 key/value 会被保存为内部状态，后续 decode 时读取历史：

$$
\operatorname{Attn}(q_{l,t},K_{l,1:t},V_{l,1:t})
=\operatorname{softmax}\left(\frac{q_{l,t}K_{l,1:t}^{\top}}{\sqrt{d}}\right)V_{l,1:t}
$$

这意味着 KV cache 的生命周期跨越多个 iteration，不能像中间激活那样一轮后释放。论文中的调度算法在请求第一次被调度时按 `max_tokens` 预留 KV slots，完成时再释放，避免系统在所有请求都需要写入下一 token KV 但显存槽不足时停住。

Orca 的分布式设计把大模型并行纳入同一套调度语义。inter-layer parallelism 把层切到不同 worker，intra-layer parallelism 在层内切矩阵或 hidden 维度；调度器向 execution engine master 下发 batch，worker controller 再向各 GPU 下发控制消息和 token。由于每个 batch 只代表“一次 iteration”，流水线中不同 worker 可以更快接收下一批 iteration，减少 request-level batch 必须等完整生成结束带来的长空泡。与后来的 vLLM 相比，Orca 的主要贡献在调度和执行边界；它还没有引入分页式 KV cache，因此仍需要预留式 KV 管理。

> 💡 关键：Orca 让 GPU 调度单位从“请求完成时间”变成“token 生成步”，selective batching 则让这种细粒度调度不会因为 Attention 形状不一致而完全失去 batch 效率。

#### 🧪 练习题

```yaml
question: "Orca 为什么需要 selective batching？"
options:
  - "因为所有 Transformer 算子都无法批处理"
  - "因为不同请求处在不同 token 位置时，Attention 需要保留 request 边界，而非 Attention 算子仍可按 token 拼接批处理"
  - "因为 selective batching 可以删除 KV cache"
  - "因为它把模型训练改成了在线强化学习"
answer: 1
explain: "迭代级调度会混合不同 prompt/生成长度的请求；Orca 对非 Attention 算子做 token-wise batching，对 Attention split/merge，兼顾灵活调度和参数读复用。"
```
