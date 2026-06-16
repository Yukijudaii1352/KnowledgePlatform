### RaidServe

```yaml
id: raidserve
name: RaidServe
full_name: RaidServe
year: '2026'
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: inference_system
parent: vllm
motivation: 高可靠弹性推理平台，冗余计算与快速恢复
```

#### 📝 一句话总结

RaidServe 面向张量并行 LLM serving 的 GPU 故障与不规则可用性问题，提出 KVCache/计算均衡与 Lightning Recovery 机制，在 GPU 失效后避免整组停摆、昂贵重算和长期负载倾斜。

#### 🎯 核心要点

- 针对 tensor parallelism 的紧耦合脆弱性：任一 GPU 失效都会丢失本 rank 的 KVCache，阻塞 collective，并迫使请求重算或模型重分片。
- Cyclic KVCache Placement 将 attention head 及其 KVCache 按层循环分布，缓解非均匀 TP 配置下的显存倾斜。
- Hybrid Attention 同时使用 TP attention 与 DP-style replicated attention，让余数 attention head 的计算分散到不同 GPU，减少 straggler 和同步等待。
- Fine-Grained Load-Aware Routing 将新请求路由到剩余 DP workload 最小的 GPU，并用自适应 chunked prefill 形成更均衡的 prefill batch。
- Lightning Recovery 包含 proactive KVCache backup 与 on-demand weight recovery：后台异步备份新 KV page，故障后只恢复缺失 KV 和缺失权重块。
- Stanford MAST/MLSys 条目报告其在 8xH100 DGX 上实现最高约 2 倍吞吐提升和数量级级别的恢复延迟下降，并能在多 GPU 故障下维持较高利用率。

#### 🔬 深入细节

![RaidServe Lightning Recovery 机制](https://ar5iv.labs.arxiv.org/html/2511.14116v1/assets/images/lightning_recovery.drawio.png)
*图：RaidServe/Failsafe 论文 Figure 4 的 On-demand Recovery 机制图，来源为 DOI 10.48550/arXiv.2511.14116 的 arXiv HTML 资产；正式 MLSys/Stanford MAST 条目使用 RaidServe 题名，OpenReview PDF 也以 RaidServe 发布。*

```python
# RaidServe: DP-aware adaptive chunked prefill + failure recovery（简化伪代码）
def build_prefill_batch(token_budget, ranks, schedulable_tokens, workloads):
    load = {r: 0 for r in ranks}
    batch, candidates = [], []
    while len(batch) < token_budget and any(schedulable_tokens[r] for r in ranks):
        r = argmin([r for r in ranks if schedulable_tokens[r]], key=lambda x: load[x])
        token = schedulable_tokens[r].pop(0)
        batch.append(token)
        load[r] += estimate_prefill_cost(token, workloads[r])
        candidates.append(list(batch))
    return choose_best_balanced_batch(candidates, load)

def recover_after_gpu_failure(failed_rank, surviving_ranks):
    mark_unavailable(failed_rank)
    new_layout = cyclic_relayout_attention_and_kv(surviving_ranks)
    for rank in surviving_ranks:
        rank.keep_resident_weights_and_kv()
        rank.load_missing_kv_pages_from_host(disjoint_subset=True)
        rank.load_only_missing_weight_shards()
    nvlink_shuffle_for_locality(new_layout)
    resume_serving_with_hybrid_attention(new_layout)
```

RaidServe 的问题背景来自 TP serving 的故障边界。vLLM 解决了单个引擎内部 KV cache 的内存管理，但大模型常需要多 GPU 张量并行：每层的 attention/FFN 被切分到多个 rank，并在层内通过 collective 合并中间结果。这个设计在正常情况下吞吐高、延迟低，但容错性很差：一个 GPU 掉线不仅使该 rank 的权重 shard 不可用，还会丢失它持有的 KVCache 分片；如果直接重启或重分片，所有 inflight 长上下文请求可能要重新 prefill，尾延迟和队列积压会急剧放大。

第一组机制是“故障后继续高效运行”的平衡器。假设某层有 \(H\) 个 KV heads，故障后可用 GPU 数为 \(R\)，若 \(H\) 不能被 \(R\) 整除，朴素 non-uniform TP 会让一部分 GPU 拿到 \(\lceil H/R\rceil\) 个 heads，另一部分拿到 \(\lfloor H/R\rfloor\) 个 heads。因为 TP 层通常要同步等待最慢 rank，attention 的有效时间近似受最大负载支配：

$$
T_{\text{attn}} \approx \max_{r \in R} T_r, \qquad
T_r \propto h_r \cdot L
$$

其中 \(h_r\) 是 rank \(r\) 负责的 head 数，\(L\) 是当前上下文长度。Cyclic KVCache Placement 通过跨层轮转 head/KVCache 的归属，让长期显存占用不集中在固定 GPU；Hybrid Attention 则把“除不尽”的 head 用 DP-style 复制/路由处理，使不同请求的余数计算分散到多个 GPU，降低单层 straggler。

第二组机制解决请求流量和 prefill batch 的倾斜。长上下文 prefill 的代价不是线性的；当一个 chunk 长度为 \(N\)，此前已处理上下文长度为 \(L\) 时，论文给出的注意力代价可概括为：

$$
\operatorname{cost}_{\text{prefill}}(N,L)=O(N^2 + NL + N)
$$

如果调度器只按 FIFO 把一个长请求的 chunk 塞满 token budget，可能出现一个 GPU 忙于 DP attention、其他 GPU 空转的情况。RaidServe 的 load-aware router 将新请求分配给 pending DP token workload 最小的 rank；adaptive chunked prefill 再从最轻载 rank 迭代取 token/chunk，直到达到全局 budget。这样做不是追求单个请求最快完成，而是追求每个 batch 内各 rank 的工作量接近，从而提高整体吞吐和 SLO 稳定性。

Lightning Recovery 关注“故障瞬间如何恢复状态”。KVCache backup 不是在故障发生后才复制，而是在正常执行期间把新生成 KV page 异步增量复制到 host memory；请求完成后丢弃对应备份。故障后，幸存 GPU 直接复用本地 KVCache，只从 host 恢复缺失 rank 的那部分 KV，并借助 cyclic placement 将 host-to-device 传输分摊到多个 GPU。恢复时间因此近似由最忙恢复 rank 的缺失数据量决定：

$$
T_{\text{recover}} \approx
\max_{r \in R'} \frac{|KV^{\text{miss}}_r| + |W^{\text{miss}}_r|}{BW^{\text{PCIe}}_r}
 + T_{\text{NVLink-shuffle}}
$$

这里 \(R'\) 是幸存 rank 集合。RaidServe 的目标是让每个 rank 的 \(|KV^{\text{miss}}_r|\) 与 \(|W^{\text{miss}}_r|\) 尽量均衡，并用 NVLink 在 GPU 间交换局部状态，避免所有缺失数据都由单个 GPU 经 PCIe 重载。

On-demand weight recovery 则避免重分片时重载已经在显存中的有效权重。以 FFN 中间维度为例，权重可按与 TP world size 无关的固定 shard 切分；故障后如果朴素地把 TP4 改成 TP3，幸存 GPU 可能被迫加载新的连续 shard，造成大量重复 PCIe 传输。RaidServe 保留幸存 rank 上已有 shard，只把失效 rank 的缺失 shard 循环分派给幸存 rank。对 attention 权重和 KVCache，也采用“每个 rank 加载不相交子集，再通过高速 GPU 互联交换”的策略。与单纯全量复制模型副本相比，这种设计更接近 RAID 的思想：增加足够的恢复状态和重布局规则，而不是为每个 TP group 保留完整热备副本。

> 💡 关键：RaidServe 与 vLLM 是互补关系。vLLM 把 KV cache 管成分页对象以提高正常路径吞吐；RaidServe 进一步处理多 GPU TP group 在失效、降级和恢复期间的状态保存、计算均衡与快速重布局。

#### 🧪 练习题

```yaml
question: "RaidServe 的 Lightning Recovery 为什么能降低 GPU 故障后的恢复延迟？"
options:
  - "正常执行时异步备份 KVCache，故障后只恢复缺失 KV page 和缺失权重 shard，并复用幸存 GPU 上已有状态"
  - "把所有请求立即丢弃，从空队列重新开始服务"
  - "要求每个 GPU 始终保存完整模型和完整 KVCache 副本"
  - "关闭 tensor parallelism，改用单 GPU 执行所有模型"
answer: 0
explain: "Lightning Recovery 的关键是增量备份与按需恢复，避免长上下文 re-prefill 和重复权重传输。"
```
