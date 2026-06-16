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

GQA 把 MQA 的“所有 Query 头共享一组 K/V”推广为“每组 Query 头共享一组 K/V”，并给出从已有 MHA checkpoint 低成本 uptraining 到 GQA/MQA 的转换配方。它在 MHA 的质量和 MQA 的解码速度之间提供可调折中。

#### 🎯 核心要点

- 结构插值：\(G=1\) 时退化为 MQA，\(G=H\) 时退化为 MHA，中间组数即 GQA
- 分组共享：\(H\) 个 Query heads 被划分为 \(G\) 组，每组只有一个 Key head 和一个 Value head
- checkpoint 转换：同组 MHA 的 \(W^K_h,W^V_h\) 通过均值池化初始化为 GQA 的组级 K/V 投影
- uptraining 配方：用原预训练目标和数据继续训练约 5% 原始预训练计算，使模型适应共享 K/V 的容量约束
- 推理收益：KV cache 从 \(2BHLd_h\) 降到 \(2BGLd_h\)，缓存与带宽压缩比约为 \(H/G\)
- 实验结论：T5-XXL 上 GQA-8 接近 MQA 的速度，同时质量更接近 MHA；论文选择 8 组作为主要折中点

#### 🔬 深入细节

![GQA 头组织方式](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/gmq_architecture.png)
*图：论文 Figure 2 展示 MHA、GQA、MQA 的头组织方式。GQA 为每个 Query 头组保留一组共享 K/V，介于每头独立和全局共享之间。*

![MHA checkpoint 到 MQA/GQA 的转换](https://arxiv.org/html/2305.13245v3/extracted/5314337/images/recycling.png)
*图：论文 Figure 1 展示 checkpoint conversion。Key/Value 投影矩阵通过均值池化合并，然后继续预训练。*

```python
# 从 MHA checkpoint 转成 GQA，并做少量 uptraining
def convert_mha_to_gqa(layer, num_query_heads, num_kv_groups):
    heads_per_group = num_query_heads // num_kv_groups
    new_Wk, new_Wv = [], []

    for g in range(num_kv_groups):
        start = g * heads_per_group
        end = (g + 1) * heads_per_group
        # 论文发现 mean pooling 优于取第一个 head 或随机初始化
        new_Wk.append(mean(layer.Wk[start:end], axis=0))
        new_Wv.append(mean(layer.Wv[start:end], axis=0))

    layer.Wk = stack(new_Wk)  # [G, d_model, d_h]
    layer.Wv = stack(new_Wv)  # [G, d_model, d_h]
    # Wq 和 Wo 仍保留 H 个 query/output heads
    return layer

for layer in model.decoder_layers:
    convert_mha_to_gqa(layer.self_attn, H, G)
    convert_mha_to_gqa(layer.cross_attn, H, G)

for batch in pretraining_data_subset:  # 约 5% 原预训练 compute
    loss = language_model_loss(model, batch)
    optimizer.step(loss)
```

GQA 的注意力可以写成带 group map 的多头注意力。设 \(g(h)\) 表示 Query head \(h\) 所属的 K/V 组，则：

$$
q_h = xW^Q_h,\quad K_{g(h)} = MW^K_{g(h)},\quad V_{g(h)} = MW^V_{g(h)}
$$

$$
o_h = \mathrm{softmax}\left(\frac{q_hK_{g(h)}^\top}{\sqrt{d_h}}\right)V_{g(h)},\quad
y = \sum_{h=1}^{H} o_h W^O_h
$$

从缓存角度看，MHA 每层存 \(H\) 组 K/V，MQA 只存 1 组，GQA 存 \(G\) 组：

$$
\mathrm{KVCache}_{\mathrm{MHA}} = 2BHLd_h,\quad
\mathrm{KVCache}_{\mathrm{GQA}} = 2BGLd_h,\quad
\mathrm{saving} \approx \frac{H}{G}
$$

GQA 的动机来自 MQA 的两个现实问题。第一，纯 MQA 把所有 heads 的历史表示压到一组 K/V，对大模型尤其是长输入任务可能带来质量下降或训练不稳定。第二，很多可用模型已经以 MHA 训练完，从头训练一个 MQA 版本成本很高。GQA 通过中间组数保留更多 K/V 容量，同时仍显著减少服务时需要读写的 KV cache。

转换步骤的重点不是简单改模型配置，而是尽可能保留原 checkpoint 的信息。论文比较了三种初始化：均值池化原 K/V heads、选择第一个 head、随机初始化。均值池化最好，因为它把同组 heads 的已学表示合并为组级投影，减少结构突变。对 GQA 来说，组 \(S_g\) 的初始化可写为：

$$
W^K_g = \frac{1}{|S_g|}\sum_{h\in S_g}W^K_h,\quad
W^V_g = \frac{1}{|S_g|}\sum_{h\in S_g}W^V_h
$$

随后 uptraining 用原来的语言模型预训练目标继续训练一小段，让 Query heads、共享 K/V heads 和 FFN 层重新协调。论文把 uptraining 比例记为 \(\alpha\)，主结果使用 \(\alpha=0.05\)，也就是约 5% 原预训练计算。这个设计承认均值池化只是一个好的初始化，并不指望一次性转换后模型完全适应新的信息瓶颈。

推理时，GQA 与 MQA 的执行模式相似但粒度更细。每个新 token 每层生成 \(G\) 组 K/V 并写入 cache；每个 Query head 只读取自己所属组的 K/V。相比 MHA，attention score 仍有 \(H\) 个 Query heads，因此当前 token 的查询表达能力保留；相比 MQA，历史记忆不再只有一组，质量损失更小。相比 MHA，历史缓存读取从 \(H\) 组降到 \(G\) 组，因此长上下文 decode 的带宽压力下降。

论文实验基于 T5.1.1 Large 和 XXL，并在 decoder self-attention 与 cross-attention 上应用 MQA/GQA，不应用于 encoder self-attention，因为 encoder 计算可并行，带宽瓶颈没有 decoder 自回归阶段强。任务覆盖 CNN/Daily Mail、arXiv、PubMed、MediaSum、Multi-News、WMT14 EN-DE 和 TriviaQA。表 1 中 T5-XXL MHA 的推理时间为 1.51 秒/sample，5% uptrained MQA-XXL 为 0.24，GQA-8-XXL 为 0.28；GQA-8 的平均指标更接近 MHA-XXL，说明少量速度损失换来了明显质量恢复。

GQA 对大模型还有一个工程细节优势：当模型被张量并行切分时，单一 MQA K/V head 往往需要在多个分片上复制，造成额外浪费；多个 GQA 组更容易与分片和 heads 划分对齐。论文也指出，随着模型尺寸增加，参数/FLOPs 随模型维度平方增长，而 KV cache 更接近线性增长，因此可以用组数调节容量与带宽，避免 MQA 对大模型变成过强的容量削减。

> 💡 关键：GQA 的价值不是“又一种注意力公式”，而是把 MQA 的极端压缩变成可部署旋钮：服务方可以用 \(G\) 控制 KV cache、带宽和质量之间的工程边界。

#### 🧪 练习题

```yaml
question: "GQA 从已有 MHA checkpoint 初始化组级 Key/Value 投影时，论文推荐的方法是什么？"
options:
  - "随机初始化所有 Key/Value 投影"
  - "删除 Query heads，只保留一个 head"
  - "对同组 MHA Key/Value heads 做均值池化"
  - "冻结模型，只修改 tokenizer"
answer: 2
explain: "论文发现均值池化能最大限度保留原 checkpoint 中 K/V heads 的信息，然后用约 5% 原预训练计算继续 uptraining。"
```
