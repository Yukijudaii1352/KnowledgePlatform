### GQA: 分组查询注意力 (Grouped-Query Attention)

```yaml
id: gqa
name: GQA
full_name: 分组查询注意力 (Grouped-Query Attention)
year: '2023'
org: Google
paper_url: https://aclanthology.org/2023.emnlp-main.298/
category: kv_cache
parent: mqa
motivation: MHA与MQA的折中兼顾速度与精度
```

#### 📝 一句话总结

GQA 将 MQA 的全共享 K/V 推广为分组共享 K/V，并提出从 MHA checkpoint 低成本 uptraining 到 GQA/MQA 的配方。它在接近 MQA 的解码速度和接近 MHA 的模型质量之间提供可调折中。

#### 🎯 核心要点

- 每组 Query 头共享一个 Key/Value 头，组数位于 MQA 的 1 和 MHA 的 H 之间
- 通过均值池化原 MHA 的 K/V heads 初始化 GQA 权重
- 只需约 5% 原预训练计算继续训练即可恢复质量
- KV cache 比例约为 G/H，可按服务预算调节
- 系统性证明 GQA 在速度和精度上优于直接使用 MQA 的极端折中

#### 🔬 深入细节

![GQA 核心示意图](https://arxiv.org/html/extracted/5314337/images/gmq_architecture.png)
*图：论文 Figure 2 展示 MHA、GQA 和 MQA 的注意力头组织方式。*

```python
# MHA checkpoint 转换为 GQA
for layer in model.layers:
    for group in range(num_kv_groups):
        heads = query_heads_in_group(group)
        Wk_group = mean([layer.Wk[h] for h in heads])
        Wv_group = mean([layer.Wv[h] for h in heads])
    layer.replace_kv_heads(Wk_group, Wv_group)

for batch in pretrain_subset:
    loss = lm_loss(model_gqa, batch)
    optimizer.step(loss)
```

##### 动机与背景

已有大模型多以 MHA 训练，直接从头训练 MQA 成本高，直接把 MHA 改成 MQA 又会明显降质。GQA 的目标是在保留已有 checkpoint 价值的前提下，把推理 cache 和带宽压下来。

##### 核心机制

将 \(H\) 个 Query 头划分成 \(G\) 组，每组共享一个 K/V 头。缓存规模从 \(O(HL)\) 变成 \(O(GL)\)。当 \(G=1\) 时是 MQA，当 \(G=H\) 时退化为 MHA。

##### 训练/推理流程

转换阶段用同组 MHA K/V 权重均值作为初始化；uptraining 阶段在少量预训练数据上继续语言模型训练，让模型适应分组共享后的信息瓶颈。部署时与 MQA 类似，只是每个 Query 头查找所在组的 K/V cache。

##### 与传统方法的区别

GQA 的关键优势是可迁移性和连续折中：不用从头训练新结构，也不用接受 MQA 的最强压缩损失。服务系统可以按显存和延迟预算选择 KV 组数。

#### 🧪 练习题

```yaml
question: "GQA 相比 MQA 的主要折中是什么？"
options:
  - "完全取消 KV cache"
  - "使用更多 KV 组提升质量但增加部分缓存"
  - "只加速训练不加速推理"
  - "用卷积替代注意力"
answer: 1
explain: "GQA 在单 KV 头和每头独立 KV 之间选择中间组数，因此质量更稳但缓存略大。"
```
