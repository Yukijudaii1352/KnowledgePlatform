### H2O: 重击者预言机 (Heavy-Hitter Oracle)

```yaml
id: h2o
name: H2O
full_name: 重击者预言机 (Heavy-Hitter Oracle)
year: '2023'
org: Texas A&M
paper_url: https://arxiv.org/abs/2306.14048
category: kv_cache
parent: —
motivation: 动态保留高权重标记剔除冗余缓存
```

#### 📝 一句话总结

H2O 使用 Heavy-Hitter Oracle 在线保留累计注意力最高的历史 token，并搭配 recent cache 保护短程依赖，从而动态压缩长上下文 KV cache。

#### 🎯 核心要点

- 发现少数 heavy-hitter token 承载大部分累计注意力
- 将缓存预算分为 heavy-hitter cache 和 recent cache
- 用历史注意力权重累计更新 token 重要性
- 淘汰低分历史 token 以控制 cache 长度
- 无需训练，可作为推理时 KV eviction 策略接入

#### 🔬 深入细节

![H2O 核心示意图](https://ar5iv.labs.arxiv.org/html/2306.14048/assets/x1.png)
*图：H2O 展示的 heavy-hitter token 现象和缓存保留思路。*

```python
# H2O online eviction
scores = defaultdict(float)
for t in decode_steps:
    logits, attn = model.decode(x_t, kv_cache)
    for pos, weight in aggregate(attn).items():
        scores[pos] += weight
    kv_cache.append(K_t, V_t)
    recent = last_positions(recent_budget)
    heavy = topk(scores, hh_budget, exclude=recent)
    kv_cache.keep_only(recent | heavy)
```

##### 动机与背景

只用滑动窗口会删除远处但重要的实体、指令或主题 token；完整保留又让 KV cache 随上下文线性膨胀。H2O 把问题转化为在线识别哪些历史 token 真正被模型持续使用。

##### 核心机制

每个 token 的重要性由跨步注意力累计得到。缓存集合为 heavy hitters 与最近窗口的并集：\(C_t=H_t\cup R_t\)。recent cache 避免新 token 因尚未积累分数而过早被删。

##### 训练/推理流程

每步生成后，系统从注意力矩阵聚合对历史 token 的关注，更新分数；当缓存超过预算，保留最近若干 token 和累计分数最高的旧 token，其余 K/V 删除。后续 attention 只在保留集合上计算。

##### 与传统方法的区别

H2O 与量化不同，它减少 token 数而非 bit 数；与纯滑窗不同，它能保留远距离 heavy hitters。代价是被淘汰 token 无法恢复，因此重要性估计质量决定上限。

#### 🧪 练习题

```yaml
question: "H2O 为什么需要 recent cache？"
options:
  - "为了训练 tokenizer"
  - "保护刚出现但尚未积累高注意力的新 token"
  - "为了禁用 softmax"
  - "为了增加 batch size 的定义"
answer: 1
explain: "累计注意力有滞后性，recent cache 防止短程上下文被误删。"
```
