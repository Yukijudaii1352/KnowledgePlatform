### AMV-L: 生命周期管理记忆 (AMV-L)

```yaml
id: amv_l
name: AMV-L
full_name: 生命周期管理记忆 (AMV-L)
year: '2026.03'
org: Georgia Institute of Technology
paper_url: https://arxiv.org/abs/2603.04443
category: management
parent: memoryos
motivation: 用价值驱动升降级压住尾延迟
```

#### 📝 一句话总结
AMV-L 把 Agent 记忆当成受管系统资源，为每条记忆维护持续更新的 utility score，并通过 value-driven promotion、demotion 和 eviction 控制工作集规模，从而把尾延迟治理问题从“保留多久”转成“哪些记忆有资格进入请求路径”。

#### 🎯 核心要点
- **直接针对 TTL 的系统性缺陷**：TTL 只能限制记忆寿命，不能限制检索候选集和向量扫描的计算足迹，长运行系统会因此出现重尾延迟和吞吐抖动。
- **连续更新的 utility score**：AMV-L 为每条记忆维护动态效用分数，用它而不是单纯 age 决定记忆的保留优先级和检索资格。
- **生命周期分层管理**：通过 promotion、demotion、eviction 维护 tiered lifecycle，使高价值记忆停留在请求路径附近，低价值记忆逐步退出活跃工作集。
- **有界、分层感知的检索路径**：检索只在受预算约束的 tier-aware candidate set 上进行，把 request-path working set 与总保留记忆量解耦。
- **系统级评测而非离线检索评测**：论文在 full-stack LLM serving system 中，对 TTL 与 LRU working-set policy 做 identical long-running workload 对照，并固定 prompt-injection caps。
- **实验结论强调 tail 而非均值**：相对 TTL，吞吐提升 3.1x，median/p95/p99 latency 分别下降 4.2x、4.7x、4.4x；相对 LRU，AMV-L 以小幅 median/p95 代价换得更好的 extreme-tail behavior 和更低 token overhead。

#### 🔬 深入细节
![AMV-L 核心框架图](https://ar5iv.labs.arxiv.org/html/2603.04443/assets/x1.png)
*图：AMV-L 把 Agent memory 组织成带生命周期层级的受管资源，请求路径只访问预算受控的活跃候选集。*

```python
# AMV-L 的核心流程（按论文机制整理的抽象伪代码）
for item in memory_pool:
    item.utility = update_utility(item, access_history, feedback, recency)
    item.tier = assign_tier(item.utility)

def retrieve(query):
    hot = top_by_value(search(query, tier="hot"), budget=B_hot)
    warm = top_by_value(search(query, tier="warm"), budget=B_warm)
    cold = top_by_value(search(query, tier="cold"), budget=B_cold)
    candidates = hot + warm + cold
    return rerank(candidates)[:K]

def on_request_end(used_items, outcome):
    for item in used_items:
        item.utility = revise(item.utility, outcome)
    lifecycle_manager.promote_demote_evict(memory_pool)
```

##### 1. 动机：TTL 管的是“寿命”，AMV-L 管的是“请求路径成本”
论文的切入点非常系统化。对长时间运行的 LLM agent 来说，问题不只是 memory 能否被保留下来，而是 memory 一旦进入请求路径，就会影响向量检索、候选集扩张、prompt 注入和最终响应时间。TTL 的优点是运维简单，但它只保证某条记忆不会永久存在，并不保证活跃检索空间不会无限膨胀。

> 💡 关键：AMV-L 认为真正需要被控制的不是总存量，而是 request-path working set 的规模。

这也是它与很多“长期记忆=尽量多存”的方案的根本区别。论文不是把 memory 当知识库，而是把它当和 cache、index、queue 一样需要预算管理的系统资源。

##### 2. 核心机制：utility score + lifecycle tiers + bounded retrieval
AMV-L 的核心不是一个复杂的学习目标，而是一个系统约束框架。每条记忆 \(m_i\) 都有一个持续更新的效用分数 \(u_i\)，系统据此决定它应该留在哪个生命周期层，以及是否还有资格参与在线检索。论文强调的是 promotion、demotion 和 eviction 三类操作，而不是仅靠时间过期。

其检索路径可以抽象为一个显式受预算约束的候选集：

$$
C(q)=\bigcup_{\ell \in \mathcal{L}} \operatorname{Top}\text{-}B_{\ell}\big(\operatorname{Search}(q,\mathcal{M}_{\ell})\big)
$$

其中 \(\mathcal{L}\) 表示不同 lifecycle tier，\(B_{\ell}\) 是每层可进入请求路径的预算。直觉上，高价值层给更高优先级，低价值层即便仍被保留，也不会无限制地拖慢在线检索。

这种设计比 TTL 更细，因为 TTL 把“还没过期”视为“仍可参与请求”；AMV-L 则把“保留资格”和“检索资格”拆开了。它也不同于 LRU：LRU 更像访问时间驱动的 working-set policy，而 AMV-L 允许系统围绕价值进行更稳健的层级迁移。

##### 3. 为什么它能压住 tail latency
论文的核心论点不是“更短 prompt 导致更快”，而是“更小且可控的候选检索工作量”带来更稳定的 tail。随着 retained items 增长，TTL 会让候选集和 similarity scan 的计算成本越来越不可预测，于是 p95/p99 延迟不断拉长；AMV-L 通过 tier-aware budget 把最坏情况钉住。

这也是论文中特别强调的地方：收益主要来自 **bounding retrieval-set size and vector-search work**，而不是单纯减少 tokens。换句话说，AMV-L 优化的是 memory 参与在线服务时的系统路径长度，而不是只优化生成模型那一层。

##### 4. 实验读法：与 TTL 比绝对收益，与 LRU 比尾部收益
在 identical long-running workloads 下，AMV-L 相对 TTL 的提升非常直接：吞吐提升 3.1x，median latency 降 4.2x，p95 降 4.7x，p99 降 4.4x，超过 2 秒的请求比例从 13.8% 降到 0.007%。这说明 TTL 在长运行负载下确实会把 memory 累积问题直接暴露到在线服务路径中。

与 LRU 相比，AMV-L 的取舍更微妙。论文报告它在 median/p95 上有小幅回退，但 p99 更低，超过 2 秒的极端长尾减少 98%，同时 token overhead 还少约 6%，而 retrieval quality 基本持平。也就是说，AMV-L 不是追求“平均更快”，而是追求“在最坏情况下更可控”。

##### 5. 与传统记忆系统的区别
- **对 TTL**：AMV-L 增加了显式的 working-set control，而不是只靠保留时间。
- **对 LRU**：AMV-L 引入 value-driven lifecycle，而不是只看最近访问。
- **对普通 RAG memory**：AMV-L 优先回答“哪些记忆应该进请求路径”，再回答“从这些候选里检索什么”。

从工程视角看，它更接近缓存管理和分层存储，而不是知识抽取算法。这也是它被放在 `management` 类别里而不是 `structured` 或 `episodic` 的原因。

#### 🧪 练习题
```yaml
question: "AMV-L 相比 TTL 的关键改进是什么？"
options:
  - "把所有记忆都保存在更大的向量数据库里"
  - "把记忆改写成更短的摘要以减少 prompt 长度"
  - "用 utility score 和 tier-aware budget 显式限制进入请求路径的活跃工作集"
  - "完全取消长期记忆，只保留最近会话内容"
answer: 2
explain: "AMV-L 的核心不是单纯缩短内容，而是把保留资格与检索资格分离，用 value-driven lifecycle 和 bounded retrieval 控制 request-path working set。"
```
