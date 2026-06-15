### Prefix-Tuning

```yaml
id: "prefix_tuning"
name: "Prefix-Tuning"
full_name: "前缀调优 (Prefix-Tuning)"
year: "2021.05"
org: "Stanford University"
paper_url: "https://arxiv.org/abs/2101.00190"
category: "peft"
parent: "adapter"
motivation: "优化连续前缀向量引导生成"
```

#### 📝 一句话总结

Prefix-Tuning 冻结预训练生成模型，只优化一组连续前缀向量，让后续 token 在每层注意力中都能关注这些虚拟 token，从而用极少参数控制生成任务。

#### 🎯 核心要点

- 将任务参数表示为连续 prefix，而不是离散自然语言 prompt。
- 冻结 GPT-2 或 BART 主体参数，只训练 prefix 相关参数。
- Prefix 不只加在输入 embedding，而是作为每层注意力的可学习 key/value 激活。
- 使用 MLP 重参数化生成 prefix，训练后可只保存最终 prefix。
- 在 table-to-text 和 summarization 上以约 0.1% 参数达到接近全量微调的效果，低数据场景尤其强。

#### 🔬 深入细节

![Prefix-Tuning 与全量微调对比](http://ar5iv.labs.arxiv.org/html/2101.00190/assets/x1.png)
*图源：论文 Figure 1，上方为全量微调，下方为只优化连续 prefix 的 Prefix-Tuning。*

![Prefix-Tuning 在 LM 与 encoder-decoder 中的形式](http://ar5iv.labs.arxiv.org/html/2101.00190/assets/x2.png)
*图源：论文 Figure 2，展示自回归 LM 和 encoder-decoder 模型中的 prefix 位置。*

```python
# Prefix-Tuning 伪代码
model = load_pretrained_generation_model()
freeze(model.parameters())
prefix_params = init_prefix(length=L, hidden=hidden_size)
prefix_mlp = MLP(prefix_params)  # 训练期重参数化

for batch in generation_data:
    past_key_values = prefix_mlp(prefix_params)
    # 每层 attention 都将 prefix key/value 拼接到真实 token 的 key/value 前
    logits = model(batch.input_ids, past_key_values=past_key_values)
    loss = cross_entropy(logits, batch.target_ids)
    update(prefix_params, prefix_mlp.parameters(), loss)

save(prefix_params_or_projected_past_key_values)
```

Prefix-Tuning 的动机是离散 prompt 依赖人工设计且不稳定，而全量微调会为每个生成任务复制整套模型参数。作者把 prompt 从“词表中的 token”推广为连续可学习向量，并把它们放到 Transformer 每层的注意力上下文中，使冻结模型在生成时被任务特定的 prefix 条件化。

对自回归模型，可把输入输出拼接为 \(z=[x;y]\)。Prefix-Tuning 令模型在每个时间步都能关注一组前缀位置 \(P_\theta\)，训练目标为：

$$
\max_\theta \sum_{t\in Y_{\text{idx}}}\log p_\phi(z_t\mid h_{<t}, P_\theta)
$$

其中 \(\phi\) 是冻结的预训练模型参数，\(\theta\) 是 prefix 参数。因为 prefix 参与多层 attention，它对后续 token 的影响比仅在输入层添加几个向量更直接。

论文还引入 MLP 重参数化：训练时用较小的 prefix embedding 经过 MLP 生成各层 key/value，缓解直接优化高维 prefix 的不稳定；推理时可以丢弃 MLP，只保留生成后的 prefix 激活。Prefix 长度是重要超参，任务不同所需长度不同，过短容量不足，过长可能过拟合。

与 Adapter 相比，Prefix-Tuning 不在网络中插入新的非线性模块，而是修改注意力可见的上下文；与 Prompt Tuning 相比，它的任务参数存在于多层 key/value 空间中，因此参数略多但控制力更强，尤其适合生成式任务和低数据场景。

> 💡 关键：Prefix-Tuning 把“任务适配”变成多层注意力上下文的可学习前缀，而不是改动模型权重本身。

#### 🧪 练习题

```yaml
question: "Prefix-Tuning 相比普通 soft prompt 的关键区别是什么？"
options:
  - "只训练分类头"
  - "把连续前缀注入每层注意力的 key/value，而不只是输入 embedding"
  - "必须全量微调模型"
  - "只适用于图像模型"
answer: 1
explain: "Prefix-Tuning 的 prefix 会影响每层注意力计算，因此对生成过程有更强、更直接的控制。"
```
