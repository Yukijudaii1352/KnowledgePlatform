### RaidServe

```yaml
id: raidserve
name: RaidServe
full_name: RaidServe
year: "2026"
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: inference_system
parent: vllm
motivation: 高可靠弹性推理平台，冗余计算与快速恢复
```

#### 📝 一句话总结

RaidServe 面向张量并行 LLM 推理提出高可靠弹性 serving 思路，在 GPU 不规则失效或可用性变化时维持服务吞吐，降低单卡故障导致的 KV cache 重算和长期负载失衡。

#### 🎯 核心要点

- 针对 tensor parallel serving 的紧耦合脆弱性：任一 GPU 失败都可能阻塞整个 TP group
- 通过冗余计算/状态与快速恢复机制减少故障后 KV cache 重建成本
- 在 GPU 可用性变化时重新平衡计算和内存，避免幸存节点长期热点
- 面向高性能和高可靠同时优化，而不是简单复制整个模型副本
- 公开资料显示其为 MLSys 2026 高性能 resilient LLM serving 系统

#### 🔬 深入细节

> 图示说明：公开页面暂未提供稳定架构图直链；核心图可理解为 TP group 增加 RAID-like 冗余/恢复路径，故障检测后由幸存 GPU 或备用资源接管缺失分片，并重建必要 KV 状态。

```python
# RaidServe 容错 TP 推理伪代码
while serving:
    batch = scheduler.next_batch()
    try:
        partials = tensor_parallel_forward(batch, shards)
        cache_redundancy.update(batch.kv_delta)
    except GPUFailure as failed:
        mark_unavailable(failed)
        recovered_shard = reconstruct_from_redundancy(failed, cache_redundancy)
        rebalance_tp_group(recovered_shard, available_gpus)
        replay_minimal_pending_work(batch)
    return merge_partials(partials)
```

张量并行推理把一个模型层的计算切到多张 GPU，延迟和显存效率高，但容错性差：只要一个 rank 掉线，整个 group 的 collective 和 KV cache 分片都会失效。

普通恢复方式往往需要重启 group、重新加载模型并重算请求上下文 KV cache。长上下文服务中，KV cache 重算非常昂贵，会造成明显尾延迟和吞吐下降。

RaidServe 的思想是借鉴存储系统 RAID：为关键状态或计算保留可恢复冗余，使单个 GPU 不可用时能快速重建缺失分片，并让服务继续处理请求。

它与 vLLM 的关系是互补的：vLLM 优化 KV cache 内存管理和吞吐，RaidServe 关注 TP serving 的故障恢复和弹性可用性。生产环境中两类能力都很关键。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "RaidServe 主要解决 TP LLM serving 的什么问题？"
options:
  - "单个 GPU 故障导致整个张量并行组停摆和 KV cache 重算"
  - "训练数据标注错误"
  - "超参搜索太慢"
  - "网页 CSS 过大"
answer: 0
explain: "TP 组紧耦合，RaidServe 通过冗余和快速恢复提高故障下可用性。"
```
