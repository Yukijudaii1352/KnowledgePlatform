### Scissorhands: 剪刀手 (Scissorhands)

```yaml
id: scissorhands
name: Scissorhands
full_name: 剪刀手 (Scissorhands)
year: '2023'
org: Rice Univ
paper_url: https://arxiv.org/abs/2305.17118
category: kv_cache
parent: —
motivation: 基于重要性持久化假设压缩缓存
```

#### 📝 一句话总结

Scissorhands 基于重要性持久化假设，用历史注意力统计识别 pivotal tokens，并剪除低贡献 KV cache，在不改模型的情况下减少长上下文推理内存。

#### 🎯 核心要点

- 提出 Persistence of Importance：过去重要的 token 未来仍可能重要
- 根据历史注意力分数维护 token 重要性
- 保留 pivotal tokens 与 recent window
- 在线执行 cache pruning，无需模型微调
- 适合存在长程关键 token 但完整上下文过大的场景

#### 🔬 深入细节

![Scissorhands 核心示意图](https://ar5iv.labs.arxiv.org/html/2305.17118/assets/x1.png)
*图：Scissorhands 的 cache 剪枝流程，根据注意力重要性保留关键 token。*

```python
importance = zeros(context_length)
for t in decode_steps:
    logits, attn = model.decode(x_t, kv_cache)
    importance = decay * importance + aggregate_attention(attn)
    kv_cache.append(K_t, V_t)
    protected = recent_positions(window)
    pivotal = topk_except(importance, budget-len(protected), protected)
    kv_cache.keep_only(protected | pivotal)
```

##### 动机与背景

KV cache 剪枝最难的是未来需求未知。Scissorhands 观察到，系统指令、实体、主题词等关键位置一旦被关注，往往会在后续持续被使用，因此历史注意力可以作为未来重要性的代理。

##### 核心机制

算法为每个 token 维护重要性分数，分数由历史注意力聚合并可加入衰减。超过预算时，保留高分 pivotal tokens 和最近窗口，删除其余位置的 K/V。

##### 训练/推理流程

推理中每一步先用当前 cache 生成 token，再从 attention 中更新重要性，最后执行剪枝。剪枝后模型仍做标准 causal attention，只是可见历史集合变小。

##### 与传统方法的区别

相比滑动窗口，Scissorhands 可保留远距离关键 token；相比 H2O，它更强调重要性持久化假设；相比 KV 量化，它节省的是序列维度，风险是误删造成不可逆信息丢失。

#### 🧪 练习题

```yaml
question: "Scissorhands 的核心假设是什么？"
options:
  - "所有 token 同等重要"
  - "重要 token 的注意力贡献具有持久性"
  - "KV cache 不占显存"
  - "Value 可以由 Key 完全恢复"
answer: 1
explain: "它根据过去注意力识别 pivotal tokens，并假设这些 token 未来仍可能关键。"
```
