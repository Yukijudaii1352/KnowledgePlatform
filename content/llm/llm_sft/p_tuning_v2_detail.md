### P-Tuning v2

```yaml
id: "p_tuning_v2"
name: "P-Tuning v2"
full_name: "P调优v2 (P-Tuning v2)"
year: "2022.05"
org: "Tsinghua University"
paper_url: "https://aclanthology.org/2022.acl-short.8/"
category: "peft"
parent: "p_tuning"
motivation: "跨规模通用NLU任务适配"
```

#### 📝 一句话总结

P-Tuning v2 将连续 prompt 从输入层扩展到 Transformer 多层深处，并去掉对 verbalizer 的强依赖，使 prompt tuning 在不同模型规模和 NLU 任务类型上接近全量微调。

#### 🎯 核心要点

- 从输入层 soft prompt 扩展为 deep prompt，在多个 Transformer 层加入连续前缀。
- 参数量从极小输入 prompt 增加到约 0.1%-3%，换取更强任务容量。
- 对分类、NER、抽取式 QA、语义角色标注等 NLU 任务使用任务头而非强制 verbalizer。
- 在 BERT/RoBERTa/DeBERTa 等不同规模模型上验证小模型也能受益。
- 消融显示深层 prompt 比只在浅层加入 prompt 更有效，靠近输出层的 prompt 影响更直接。

#### 🔬 深入细节

![P-Tuning v2 深层提示结构](http://ar5iv.labs.arxiv.org/html/2110.07602/assets/x2.png)
*图源：论文 Figure 2，从 Lester Prompt Tuning 和 P-Tuning 过渡到在多层加入 prefix 的 P-Tuning v2。*

```python
# P-Tuning v2 伪代码
encoder = load_pretrained_encoder()
freeze(encoder.parameters())

deep_prompts = {
    layer: Parameter(shape=(prompt_len, hidden_size))
    for layer in selected_transformer_layers
}
task_head = init_task_head(task_type)  # 分类、序列标注、抽取 QA 等

for batch in task_data:
    h = encoder.embed(batch.input_ids)
    for layer_id, layer in enumerate(encoder.layers):
        if layer_id in deep_prompts:
            h = layer.forward_with_prefix(h, prefix=deep_prompts[layer_id])
        else:
            h = layer(h)
    logits = task_head(h)
    loss = task_specific_loss(logits, batch.labels)
    update(deep_prompts, task_head.parameters(), loss)
```

P-Tuning v2 的动机来自早期 prompt tuning 的两个限制：一是输入层 prompt 的可训练容量太小，小模型或复杂 NLU 任务往往无法逼近全量微调；二是把所有任务都塞进 mask + verbalizer 格式，会让序列标注、抽取式问答等任务变得别扭。P-Tuning v2 把 prompt 改成深层前缀，同时回到更通用的任务头建模。

深层 prompt 可以理解为在第 \(l\) 层注入一组可训练隐藏向量 \(P_l\)。模型原本只处理真实 token 的隐藏状态 \(H_l\)，现在在注意力计算中额外看到 \(P_l\)，使每层表示都能被任务条件调制。相比只在输入层加入 \(P_0\)，深层 prompt 的梯度路径更短，对高层语义和输出决策影响更直接。

论文的一个关键判断是：参数高效不等于参数越少越好。Prompt Tuning 的极少参数在超大模型上可行，但在中小模型和复杂 NLU 任务上容量不足。P-Tuning v2 允许更多任务参数，仍远少于全量微调，同时显著提高跨规模稳定性。

训练/推理流程上，预训练编码器保持冻结，训练 deep prompt 和轻量任务头。对分类任务可取 `[CLS]` 表示接线性层；对 NER/SRL 可对每个 token 做序列标注；对抽取式 QA 可预测 start/end 位置。这种设计让 P-Tuning v2 不再被固定 verbalizer 限制。

> 💡 关键：P-Tuning v2 的本质是用“分层可训练条件”替代“输入层少量软 token”，因此更接近全量微调的层级控制能力。

#### 🧪 练习题

```yaml
question: "P-Tuning v2 相比 P-Tuning 的核心改进是什么？"
options:
  - "把 prompt 扩展到多层 Transformer，并支持通用 NLU 任务头"
  - "将模型权重量化为 NF4"
  - "用人工偏好训练奖励模型"
  - "只保留离散人工模板"
answer: 0
explain: "P-Tuning v2 通过 deep prompt 提升容量和控制力，并避免所有任务都依赖 verbalizer。"
```
