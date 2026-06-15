### GaLore

```yaml
id: "galore"
name: "GaLore"
full_name: "梯度低秩投影 (GaLore)"
year: "2024.03"
org: "UT Austin"
paper_url: "https://arxiv.org/abs/2403.03507"
category: "peft"
parent: "lora"
motivation: "梯度投影减少80%优化器显存"
```

#### 📝 一句话总结

GaLore 将权重梯度投影到低秩子空间中维护优化器状态，再投影回原空间更新全量权重，从而在不冻结模型、不限制权重增量秩的情况下降低大模型训练显存。

#### 🎯 核心要点

- 低秩化的是梯度和优化器状态，而不是模型权重或适配器权重。
- 周期性根据当前梯度 SVD 更新投影子空间，避免长期固定低秩方向。
- 可插入 AdamW、8-bit Adam、Adafactor 等优化器。
- 权重本身仍是全量更新，因此不同于 LoRA 的 PEFT 冻结基座范式。
- 论文显示可显著降低 optimizer memory，并支持在 24GB 级单卡上训练 LLaMA 7B 规模模型。

#### 🔬 深入细节

![GaLore 低秩子空间学习示意](http://ar5iv.labs.arxiv.org/html/2403.03507/assets/x2.png)
*图源：论文 Figure 2，GaLore 在一段训练步内使用固定低秩子空间，随后重算子空间继续训练。*

![GaLore 显存占用对比](http://ar5iv.labs.arxiv.org/html/2403.03507/assets/x1.png)
*图源：论文 Figure 1，展示 LLaMA 7B 预训练时不同方法的显存构成。*

```python
# GaLore + AdamW 伪代码
for step, batch in enumerate(data):
    loss = model(batch).loss
    loss.backward()

    for W in model.trainable_matrices:
        G = W.grad
        if step % update_proj_gap == 0:
            # 通过 SVD 或近似 SVD 计算 rank-r 投影子空间
            P, Q = compute_low_rank_projector(G, rank=r)

        if G.shape[0] <= G.shape[1]:
            low_rank_grad = P.T @ G
            low_rank_update = adam_update_state(low_rank_grad)
            W.data -= lr * (P @ low_rank_update)
        else:
            low_rank_grad = G @ Q
            low_rank_update = adam_update_state(low_rank_grad)
            W.data -= lr * (low_rank_update @ Q.T)
```

GaLore 的目标不是参数高效微调，而是内存高效训练。Adam 类优化器需要为每个权重保存一阶、二阶矩状态，显存通常是权重本身的数倍。LoRA 通过冻结权重减少可训练参数，但表达形式受低秩 adapter 限制；GaLore 则仍更新原始权重，只把优化器状态保存在低秩梯度空间中。

设某层权重 \(W\in\mathbb{R}^{m\times n}\)，梯度为 \(G\)。当 \(m\le n\) 时，GaLore 计算左投影矩阵 \(P\in\mathbb{R}^{m\times r}\)，把梯度压缩为：

$$
\tilde{G}=P^\top G
$$

优化器只在 \(\tilde{G}\) 的形状上维护状态，更新后再映射回原空间 \(P\Delta\tilde{W}\)。当 \(m>n\) 时则使用右投影 \(Q\)，计算 \(GQ\)。这样 optimizer state 的维度随 rank \(r\) 缩小，而权重矩阵本身仍保持完整。

低秩子空间不能永久固定。训练早期和后期梯度方向会变化，GaLore 每隔 \(T\) 步重算投影矩阵，使模型依次在不同低秩子空间中前进。论文把这一点称为多个低秩子空间的组合学习；更新过快会产生额外计算，更新过慢会卡在过时子空间，rank 和更新频率需要一起调节。

与 LoRA 的根本差异在于：LoRA 学习低秩权重增量 \(\Delta W=BA\)，基座权重冻结；GaLore 学习全量权重 \(W\)，只是将梯度更新和优化器状态低秩化。因此 GaLore 更适合从头预训练或全量微调的内存优化，而不是输出一个可插拔 adapter 文件。

> ⚠️ 注意：manifest 将 GaLore 放在 LoRA 线下，但它的机制不是 LoRA adapter，而是 optimizer/gradient 层面的低秩投影。

#### 🧪 练习题

```yaml
question: "GaLore 与 LoRA 的关键区别是什么？"
options:
  - "GaLore 冻结基座并只训练 BA"
  - "GaLore 低秩化梯度和优化器状态，但仍更新全量权重"
  - "GaLore 只能用于离散 prompt"
  - "GaLore 不需要反向传播"
answer: 1
explain: "GaLore 的低秩对象是梯度子空间，权重仍进行全量更新；LoRA 的低秩对象是权重增量。"
```
