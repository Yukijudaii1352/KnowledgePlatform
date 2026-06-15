### Adapter

```yaml
id: "adapter"
name: "Adapter"
full_name: "适配器 (Adapter)"
year: "2019.06"
org: "Google Research"
paper_url: "http://proceedings.mlr.press/v97/houlsby19a.html"
category: "peft"
parent: "—"
motivation: "插入瓶颈层实现模块化迁移学习"
```

#### 📝 一句话总结

Adapter 在冻结预训练 Transformer 主体的前提下，在每层插入小型瓶颈模块并只训练这些模块，解决多任务迁移时每个任务都保存完整模型副本的参数低效问题。

#### 🎯 核心要点

- 在 Transformer 层的注意力子层和前馈子层后插入任务专属 adapter。
- Adapter 采用 down-projection、非线性、up-projection 和残差连接的瓶颈结构。
- 预训练 BERT 参数冻结，每个任务只新增并训练少量 adapter 参数。
- 在 GLUE 上只增加约 3.6% 参数即可达到距离全量微调约 0.8% 的性能。
- 新任务可通过新增 adapter 模块扩展，不需要重训或覆盖旧任务参数。

#### 🔬 深入细节

![Adapter 模块结构](http://ar5iv.labs.arxiv.org/html/1902.00751/assets/x2.png)
*图源：论文 Figure 2 子图，展示 adapter 的瓶颈变换结构。*

![Adapter 插入 Transformer](http://ar5iv.labs.arxiv.org/html/1902.00751/assets/x3.png)
*图源：论文 Figure 2 子图，展示 adapter 在 Transformer 层中的插入位置。*

```python
# Adapter tuning 伪代码
bert = load_pretrained_bert()
freeze(bert.parameters())

for layer in bert.layers:
    layer.attention_output = Sequential(
        layer.attention_output,
        Adapter(hidden_size=d, bottleneck=m)
    )
    layer.ffn_output = Sequential(
        layer.ffn_output,
        Adapter(hidden_size=d, bottleneck=m)
    )

for batch in task_data:
    logits = bert_with_adapters(batch.input)
    loss = task_loss(logits, batch.label)
    update_only(adapter_parameters, loss)
```

Adapter 的动机来自预训练模型进入大规模迁移学习阶段后的存储问题。对每个任务都复制并全量微调一个 BERT，效果好但部署和维护成本随任务数线性增长；只训练分类头又容量不足，无法吸收任务特有的中间表示变化。Adapter 选择在每层内部增加一个很小的可训练旁路，使任务信息可以逐层注入。

一个典型 adapter 对隐藏状态 \(h\in\mathbb{R}^d\) 做如下变换：

$$
\text{Adapter}(h)=h+W_{\text{up}} f(W_{\text{down}}h)
$$

其中 \(W_{\text{down}}\in\mathbb{R}^{m\times d}\)，\(W_{\text{up}}\in\mathbb{R}^{d\times m}\)，且 \(m\ll d\)。瓶颈维度 \(m\) 控制参数预算；残差连接让 adapter 初始时接近恒等映射，降低对冻结主干的破坏。

训练时，BERT 的词嵌入、注意力层、FFN 等主干参数保持固定，只有 adapter、LayerNorm 和任务头等少量参数更新。这样每个任务只需保存自己的 adapter 权重，多个任务共享同一份预训练主干。部署时加载同一 BERT，再按任务切换 adapter 即可。

与全量微调相比，Adapter 的表达能力来自层间多处小容量调整，而非一次性改动全部权重。与后来的 LoRA 相比，Adapter 增加了额外前向模块，因此可能带来少量推理延迟；但它的模块化边界清晰，适合多任务可插拔管理，是 PEFT 思路的早期代表。

> 💡 关键：Adapter 把“任务知识”封装成可插拔模块，冻结共享主干，从而用少量参数换取接近全量微调的迁移效果。

#### 🧪 练习题

```yaml
question: "Adapter 中瓶颈层的主要作用是什么？"
options:
  - "把所有预训练权重量化到 4-bit"
  - "用低维中间表示限制每个任务新增参数量"
  - "替代 Transformer 的自注意力"
  - "只在推理阶段生成提示词"
answer: 1
explain: "Adapter 通过 down/up projection 形成小瓶颈，在保留逐层适配能力的同时显著减少任务专属参数。"
```
