### Adapter：适配器 (Adapter)

```yaml
id: adapter
name: Adapter
full_name: 适配器 (Adapter)
year: "2019.06"
org: Google Research
paper_url: http://proceedings.mlr.press/v97/houlsby19a.html
category: peft
parent: —
motivation: 插入瓶颈层实现模块化迁移学习
```

#### 📝 一句话总结
Adapter 在冻结预训练 Transformer 主干的前提下，为每个下游任务插入小型瓶颈模块，解决了多任务/多客户场景中“每个任务都保存一整份微调模型”的参数浪费问题。

#### 🎯 核心要点
- 在每个 Transformer 层中插入两个 Adapter：一个位于多头注意力投影之后，一个位于前馈网络投影之后。
- Adapter 使用瓶颈结构：先将隐藏维度从 \(d\) 降到 \(m\)，经过非线性激活后再升回 \(d\)。
- 原始预训练网络参数保持冻结；每个任务只训练 Adapter、LayerNorm 参数和最终分类头。
- Adapter 内部带残差连接，并采用近似恒等初始化，使新模块在训练初期尽量不破坏预训练表示。
- 每个 Adapter 的参数量为 \(2md+d+m\)，通过设置 \(m \ll d\) 将每任务新增参数控制在很小范围。
- 论文在 BERT 上验证了 26 个文本任务；在 GLUE 上接近全量微调性能，仅增加约 3.6% 每任务参数，而全量微调需要训练 100% 参数。

#### 🔬 深入细节

![Adapter 在 Transformer 中的插入位置](https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x2.png)
![Adapter 瓶颈模块结构](https://ar5iv.labs.arxiv.org/html/1902.00751/assets/x3.png)
*图：论文 Figure 2 的两个面板。左图展示 Adapter 被插入到 Transformer 子层之后；右图展示降维、非线性、升维和内部残差组成的瓶颈模块。*

Adapter 的核心动机是把“任务特定能力”和“通用预训练能力”分离。标准 fine-tuning 会为每个任务复制并更新整个 BERT，这在任务数量增加时线性增加存储和部署成本；Adapter 则把 BERT 主干当成共享基础设施，只为每个任务追加一组小模块。这样新增任务不需要重新访问旧任务数据，也不会覆盖旧任务参数，适合云服务、多租户或持续加入任务的场景。

在 Transformer 层内，论文不是只在顶层加一个小头，而是让任务特定参数能够影响每一层的中间激活。设某个子层输出为 \(s\)，Adapter 近似可写成：

$$
A(s)=s+W_{\text{up}} f(W_{\text{down}}s+b_{\text{down}})+b_{\text{up}},
$$

其中 \(W_{\text{down}}\in\mathbb{R}^{m\times d}\)，\(W_{\text{up}}\in\mathbb{R}^{d\times m}\)，\(m\) 是瓶颈维度。内部残差项 \(s+\cdots\) 很关键：如果升维/降维投影初始化接近零，Adapter 初始时接近恒等函数，原始 BERT 的表示分布不会被突然扰动，训练更稳定。

在论文采用的集成方式中，Adapter 放在每个子层投影之后、加外部 residual 和 LayerNorm 之前。用简化符号表示，一个 Transformer block 可以写成：

$$
u = \mathrm{LayerNorm}(h + A_{\text{attn}}(\mathrm{MHA}(h))),
$$

$$
h' = \mathrm{LayerNorm}(u + A_{\text{ffn}}(\mathrm{FFN}(u))).
$$

这里 \(\mathrm{MHA}\)、\(\mathrm{FFN}\) 和主干中的大部分权重被冻结，只有 \(A_{\text{attn}}\)、\(A_{\text{ffn}}\)、LayerNorm 的缩放/偏置以及任务头被更新。LayerNorm 参数单独训练虽然也很省参数，但论文发现仅调 LayerNorm 表达能力不足；Adapter 提供了更强的任务特定非线性变换。

参数效率来自瓶颈层。一个 Adapter 的参数量包括降维矩阵、升维矩阵和两个 bias：

$$
\#\theta_{\text{adapter}} = md + dm + m + d = 2md + d + m.
$$

当 \(m\ll d\) 时，新增参数相对原始 Transformer 的注意力和前馈层很小。论文将 Adapter size 作为主要超参，使用约 0.5% 到 8% 的原模型参数即可覆盖性能/存储折中。直觉上，较小的 \(m\) 相当于限制任务更新只能经过低秩瓶颈，避免为每个任务重写完整表示空间。

训练流程可以概括为：冻结预训练 BERT，随机初始化每个任务的 Adapter 和头部，随后只在这些任务参数上反向传播。伪代码如下：

```python
# Adapter tuning for one downstream task
bert = load_pretrained_bert()
freeze(bert.backbone_weights)

for layer in bert.transformer_layers:
    layer.attn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)
    layer.ffn_adapter = BottleneckAdapter(d_hidden=d, bottleneck=m)
    layer.layer_norm_params.requires_grad = True

classifier = TaskHead(d, num_labels)
trainable = adapters + layer_norm_params + classifier.parameters()

for batch in downstream_data:
    h = bert.embeddings(batch.input_ids)
    for layer in bert.transformer_layers:
        attn_out = layer.self_attention(h)          # frozen weights
        h = layer.norm1(h + layer.attn_adapter(attn_out))
        ffn_out = layer.feed_forward(h)             # frozen weights
        h = layer.norm2(h + layer.ffn_adapter(ffn_out))
    logits = classifier(h[:, 0])
    loss = cross_entropy(logits, batch.labels)
    update(trainable, loss)
```

与传统 fine-tuning 相比，Adapter 的行为更像“给冻结网络增加可插拔的任务补丁”。全量微调直接改动原模型参数，任务之间互不兼容；Adapter 保留共享主干，同一输入可以通过不同任务 Adapter 得到不同决策。与只微调顶层相比，Adapter 的优势是它分布在所有层，能逐层调整表示，但每次调整又受瓶颈限制，不会像全量微调那样产生大规模任务副本。

> 💡 关键：Adapter 不是简单地“少训练一些层”，而是把任务更新重新参数化为许多小型残差瓶颈模块；它用结构约束换取参数效率和模块化部署能力。

#### 🧪 练习题

```yaml
question: "Adapter 采用瓶颈结构的主要目的是什么？"
options:
  - "让每个任务只新增少量可训练参数，同时仍能在各层调整表示"
  - "让模型在推理时跳过 Transformer 的注意力计算"
  - "将 BERT 的词表替换为任务专用词表"
  - "避免使用 LayerNorm，因为 LayerNorm 会破坏迁移学习"
answer: 0
explain: "瓶颈维度 m 远小于隐藏维度 d，使每层 Adapter 的参数量约为 2md+d+m；它保留逐层调节能力，但避免为每个任务复制完整模型。"
```
