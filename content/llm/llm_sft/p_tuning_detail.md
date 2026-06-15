### P-Tuning

```yaml
id: "p_tuning"
name: "P-Tuning"
full_name: "P调优 (P-Tuning)"
year: "2021"
org: "Tsinghua University"
paper_url: "https://arxiv.org/abs/2103.10385"
category: "peft"
parent: "prefix_tuning"
motivation: "连续嵌入替代离散提示优化"
```

#### 📝 一句话总结

P-Tuning 用可微的连续 prompt embedding 和 prompt encoder 替代离散 prompt 搜索，缓解人工模板选择不稳定的问题，并提升 GPT/BERT 类模型在知识探测和 NLU 任务上的表现。

#### 🎯 核心要点

- 将离散模板中的提示 token 替换为可训练连续向量。
- 使用 LSTM/MLP prompt encoder 建模 prompt token 间依赖，避免直接优化孤立 embedding 不稳定。
- 支持把连续 prompt 插入句首、句中或多个语义片段之间。
- 在 LAMA 知识探测和 SuperGLUE 上提升性能，并降低不同离散模板带来的方差。
- 对 GPT、BERT、ALBERT 等模型均可使用，但仍主要作用于输入层 prompt。

#### 🔬 深入细节

![P-Tuning 连续提示优化](http://ar5iv.labs.arxiv.org/html/2103.10385/assets/x2.png)
*图源：论文 Figure 2，对比离散 prompt 搜索和可微连续 prompt 优化。*

```python
# P-Tuning 伪代码
plm = load_pretrained_model()
freeze_or_partially_freeze(plm)

prompt_tokens = init_virtual_tokens(length=m)
prompt_encoder = LSTM_or_MLP(prompt_tokens)

for batch in task_data:
    h_prompt = prompt_encoder(prompt_tokens)
    # 例如: [x, h0, h1, ..., [MASK]] 或按模板插入多个位置
    inputs_embeds = assemble(batch.text_embeds, h_prompt, mask_or_label_position)
    logits = plm(inputs_embeds=inputs_embeds)
    loss = verbalizer_or_lm_loss(logits, batch.labels)
    update(prompt_tokens, prompt_encoder.parameters(), loss)
```

P-Tuning 关注的是离散 prompt 的不稳定性。同一个知识探测问题“Britain 的首都是 [MASK]”，人工模板稍有变化就可能导致预测差异很大；用强化学习或搜索找离散模板又只有稀疏奖励，优化困难。P-Tuning 把模板中的提示片段改成连续向量，使 prompt 可以通过下游损失端到端学习。

方法上，模型输入不再只是离散词 embedding，而是混合真实文本 embedding 与虚拟 prompt embedding。若上下文为 \(x\)，连续提示为 \(h_0,\dots,h_i\)，可构造：

$$
[e(x), h_0,\dots,h_i,e(\text{[MASK]})]
$$

对于分类任务，再通过 verbalizer 把 label 映射到词表 token；对于生成或知识填空任务，则直接优化 mask 或目标 token 的似然。连续 prompt 由 prompt encoder 产生，而不是每个位置独立学习，这让提示内部具备顺序结构。

Prompt encoder 是 P-Tuning 的关键工程选择。论文发现直接训练 embedding 容易不稳定，LSTM 或 MLP 可以作为重参数化网络，把可训练参数映射到更平滑的 prompt 表示。训练结束后，使用 encoder 生成的 prompt embedding 与预训练模型配合推理。

与 Prompt Tuning 相比，P-Tuning 更强调“替代离散模板搜索”和“在模板内部插入连续提示”，尤其针对 NLU、知识探测和少样本场景；与 Prefix-Tuning 相比，它通常不把 prompt 注入每层 key/value，因此容量和深层控制力有限，这也为 P-Tuning v2 的深层 prompt 铺垫了动机。

> 💡 关键：P-Tuning 把原本不可微的 prompt 设计问题，转化为连续向量和 prompt encoder 的梯度优化问题。

#### 🧪 练习题

```yaml
question: "P-Tuning 使用 prompt encoder 的主要目的是什么？"
options:
  - "压缩预训练模型权重到 4-bit"
  - "生成更稳定的连续 prompt 表示，缓解直接优化 embedding 的不稳定"
  - "替代所有 self-attention 层"
  - "只用于评估模型困惑度"
answer: 1
explain: "Prompt encoder 对虚拟 token 建模并重参数化连续提示，使优化更平滑、模板方差更小。"
```
