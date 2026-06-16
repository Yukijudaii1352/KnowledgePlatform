### SuperInfer

```yaml
id: superinfer
name: SuperInfer
full_name: SuperInfer
year: '2026'
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: inference_system
parent: vllm
motivation: 针对超级芯片的SLO感知调度系统
```

#### 📝 一句话总结

SuperInfer 面向 NVIDIA GH200 这类 GPU-CPU Superchip，提出 RotaSched 与 DuplexKV，把 SLO 感知调度和 KV cache 分层内存管理联合起来，解决高并发 LLM 推理中 GPU HBM 不足导致的 TTFT/TBT 尾延迟问题。

#### 🎯 核心要点

- 硬件假设从传统 PCIe GPU 扩展到 GH200 的 Hopper HBM + Grace DRAM + NVLink-C2C 分层内存
- RotaSched 引入 running、waiting、rotary 三类请求状态，用主动轮转替代仅在 OOM 前触发的被动抢占
- Virtual Lag Time (VLT) 同时表达 TTFT 和 TBT 的 SLO 滞后程度，Largest-VLT-First (LVF) 优先恢复最可能违约的请求
- DuplexKV 用 eager block rotation 消除 swap-in/swap-out 数据竞争，使 H2D 与 D2H 可以全双工重叠
- KV cache 从 layer-first 改为 block-first 布局，并用 batched transfer 合并小段传输，避免 PagedAttention 细粒度块拖垮 C2C 带宽
- 跨迭代流水线把调度、KV 迁移和 decode 计算重叠，目标是在不牺牲吞吐的前提下提升 SLO attainment

#### 🔬 深入细节

![SuperInfer 总体架构](https://arxiv.org/html/2601.20309v2/x7.png)
*图源：SuperInfer arXiv HTML 版 Figure 6。图中 RotaSched 维护请求状态并按 VLT/LVF 调度，DuplexKV 用 block table 管理 Hopper HBM 与 Grace DRAM 中的 KV cache 驻留和迁移。*

![DuplexKV block-first KV cache 布局](https://arxiv.org/html/2601.20309v2/x15.png)
*图源：SuperInfer arXiv HTML 版 Figure 14。block-first 布局把同一 KV block 的多层小 segment 合并成更大的连续传输单元，并通过 `cudaMemcpyBatchAsync` 降低 launch 开销。*

```python
# SuperInfer: LVF scheduling + DuplexKV rotation sketch
def vlt(req, now, alpha, beta_ttft, beta_tbt, slo_ttft, slo_tbt):
    if req.state == "rotary":
        return alpha * max(0, now - req.last_token_time - beta_tbt * slo_tbt)
    if req.state == "waiting":
        return max(0, now - req.arrival_time - beta_ttft * slo_ttft)
    if req.state == "running":
        return -(now - req.running_since)

for iteration in decode_loop:
    requests = running + waiting + rotary
    if hbm_can_hold_all(requests):
        batch = fcfs_batch(requests)
    else:
        ranked = sorted(requests, key=lambda r: vlt(r, now(), alpha, beta_F, beta_B, S_F, S_B), reverse=True)
        prioritized = pick_from_head(ranked, free_hbm_blocks + transfer_budget)
        preempted = pick_running_from_tail(ranked, blocks_needed(prioritized) - free_hbm_blocks)

        DuplexKV.eager_offload_synced_blocks(running)
        DuplexKV.swap_out_dirty_blocks(preempted)      # HBM -> DRAM
        DuplexKV.swap_in_required_blocks(prioritized) # DRAM -> HBM
        batch = form_decode_batch(prioritized)

    run_decode_step(batch)
    DuplexKV.update_block_table(batch)
```

SuperInfer 的出发点是：LLM serving 的瓶颈并不只是“算得慢”，而是每个请求在自回归生成中不断增长的 KV cache 会迅速吃满 HBM。一旦高 RPS 下 HBM 无法容纳所有活跃请求，FCFS、SJF 或只在内存不足时触发的被动 swap 都会出现队头阻塞。论文把用户体验拆成两个 SLO：TTFT 约束首 token 等待时间，TBT 约束相邻 token 间隔。Waiting-First 会照顾新请求 TTFT 却让已生成中的请求长期停顿，Swapped-First 又会保护 TBT 但让新请求排队，二者都不是统一的 SLO 策略。

RotaSched 的关键抽象是 rotary state：请求可以暂时离开 GPU 执行队列，KV cache 放在 Grace DRAM，稍后再被轮转回 Hopper HBM。调度优先级由 VLT 给出：

$$
VLT =
\begin{cases}
\alpha \cdot \mathrm{ReLU}(t_{\text{now}} - t_{\text{last}} - \beta_B S_B), & \text{rotary} \\
\mathrm{ReLU}(t_{\text{now}} - t_{\text{arr}} - \beta_F S_F), & \text{waiting} \\
-(t_{\text{now}} - t_{\text{run}}), & \text{running}
\end{cases}
$$

其中 \(S_B\) 和 \(S_F\) 分别对应 TBT 与 TTFT SLO，\(\alpha\) 调整 TBT 相对 TTFT 的敏感度，\(\beta_B,\beta_F\) 是容忍系数。直觉上，waiting/rotary 请求一旦超过容忍窗口，VLT 变正并随等待时间增大，表示“落后”；running 请求 VLT 为负且越跑越小，表示“已经占用了较多 GPU 时间”。LVF 每轮把 VLT 最大的 waiting/rotary 请求放回 HBM，把 VLT 最小的 running 请求换出，从而把有限 HBM 当成 OS scheduler 中的时间片资源来管理。

DuplexKV 解决的是“即使有 GH200，也不能天真地 memcpy”。vLLM/PagedAttention 的 layer-first 布局让每层每块形成很小的 segment，例如一个 block 的完整 KV 可能有数 MB，但每次连续内存段只有数十 KB，导致大量 `cudaMemcpyAsync` launch，实际 C2C 带宽远低于硬件上限。SuperInfer 把布局改成 block-first，使一个请求 block 跨层连续，近似有：

$$
S_{\text{block}} = N_L \cdot S_{\text{seg}}
$$

当 \(N_L\) 层的 segment 被合并后，传输粒度进入 NVLink-C2C 的高效区间；再用 batch copy 把同方向多个 block 描述符合并提交，就减少了 kernel launch 的固定成本。

全双工迁移还有一个正确性问题：swap-in 的目标 HBM block 可能正是 swap-out 的源 block，直接开两个 CUDA stream 会产生数据竞争。DuplexKV 的 eager block rotation 利用 KV cache 只追加写入的性质，把已填满且不会再修改的 synced block 提前后台复制到 DRAM；真正抢占时，只需要处理最后一个 dirty block，已同步 block 可以从 HBM 丢弃。这让 H2D 和 D2H 在多数情况下不再互相等待，并能和 decode 计算跨迭代重叠。

与 vLLM 的关系可以理解为“保留分页抽象，扩大调度边界”。PagedAttention 解决的是 GPU 内部 KV cache 碎片与复用问题，SuperInfer 进一步把 CPU DRAM 纳入 serving 的热/冷层级，并让请求调度显式感知 SLO、传输预算与 KV 驻留位置。它不是替代连续 batching，而是在 HBM 成为约束时决定哪些请求应该继续运行、哪些应该进入 rotary、哪些应该被立即恢复。

> 💡 关键：SuperInfer 的核心不是单个更快的 kernel，而是把请求调度、KV cache 布局、双向数据搬运和 GH200 硬件层级共同建模，避免“有高速互联但软件仍按 PCIe 时代方式搬数据”。

#### 🧪 练习题

```yaml
question: "SuperInfer 中 VLT 的主要作用是什么？"
options:
  - "把所有请求固定为 FCFS 顺序"
  - "估计请求相对 TTFT/TBT SLO 的滞后程度，用于决定恢复和抢占"
  - "压缩模型权重以减少参数量"
  - "选择 HTTP 网关的负载均衡策略"
answer: 1
explain: "VLT 把 waiting、rotary、running 请求统一到同一优先级尺度；LVF 优先执行 VLT 高的滞后请求，并抢占 VLT 很低的长期 running 请求。"
```
