### QLoRA

```yaml
id: "qlora"
name: "QLoRA"
full_name: "量化低秩适配 (QLoRA)"
year: "2023.05"
org: "University of Washington"
paper_url: "https://arxiv.org/abs/2305.14314"
category: "peft"
parent: "lora"
motivation: "4-bit量化实现单卡微调65B模型"
```

#### 📝 一句话总结

QLoRA 将冻结基座模型量化到 4-bit，并通过反量化计算把梯度传给 LoRA 适配器，配合 NF4、双重量化和分页优化器，使超大模型能在单卡级显存预算下微调。

#### 🎯 核心要点

- 冻结 4-bit 量化基座模型，只训练 LoRA adapter。
- 提出 NF4 数据类型，适配近似正态分布的预训练权重。
- 使用 double quantization 进一步量化量化常数，降低额外存储。
- 使用 paged optimizers 处理长序列或大 batch 带来的显存峰值。
- 在 Guanaco 系列中展示 33B/65B 量级模型可高效指令微调并获得强聊天能力。

#### 🔬 深入细节

![QLoRA 与其他微调方式显存对比](http://ar5iv.labs.arxiv.org/html/2305.14314/assets/x1.png)
*图源：论文 Figure 1，QLoRA 通过 4-bit 基座、LoRA 和分页优化器显著降低微调显存。*

```python
# QLoRA 训练伪代码
base_4bit = load_quantized_model(dtype="NF4", double_quant=True)
freeze(base_4bit.quantized_weights)
attach_lora_adapters(base_4bit, target_modules="all_linear")
optimizer = paged_adamw(lora_parameters)

for batch in instruction_data:
    # 前向时将 4-bit 权重反量化到 BF16/FP16 计算
    logits = base_4bit.forward_with_dequant(batch.input_ids)
    loss = causal_lm_loss(logits, batch.labels)
    loss.backward()  # 梯度只更新 LoRA 参数
    optimizer.step()
```

QLoRA 的目标是降低“微调时基座模型常驻显存”的成本。LoRA 已经减少了可训练参数和优化器状态，但如果基座模型仍以 16-bit 加载，65B 级模型仍然很难在单卡上训练。QLoRA 把冻结基座压到 4-bit，反向传播时不更新量化权重，只让梯度流经反量化计算图到 LoRA 参数。

NF4 是论文的关键量化格式。预训练权重通常接近零均值正态分布，NF4 选择对正态分布更合适的离散码点，使 4-bit 表示在信息利用上优于普通 FP4/Int4。前向计算可抽象为：

$$
y = X \cdot \text{dequant}(Q_{\text{NF4}}(W)) + X \cdot \Delta W_{\text{LoRA}}
$$

其中 \(Q_{\text{NF4}}(W)\) 是冻结的 4-bit 权重，\(\Delta W_{\text{LoRA}}\) 是训练中的低秩增量。

Double quantization 进一步压缩量化 scale/zero 等常数，减少每个 block 的元数据成本。Paged optimizer 则利用统一内存机制把优化器状态的峰值压力分页处理，尤其在长序列和梯度 checkpointing 场景下避免瞬时 OOM。

与普通 LoRA 相比，QLoRA 的算法输出仍是 LoRA adapter，但训练系统的内存边界完全不同。它证明了“高质量指令微调不一定需要 16-bit 全量加载基座”，并推动了后来大量消费级 GPU 上的大模型微调实践。代价是训练吞吐可能受反量化和分页影响，且量化格式、目标模块覆盖和数据质量会强烈影响最终效果。

> ⚠️ 注意：QLoRA 不是训练 4-bit 权重本身，而是在冻结 4-bit 基座之上训练高精度 LoRA 参数。

#### 🧪 练习题

```yaml
question: "QLoRA 中 NF4 的作用是什么？"
options:
  - "为近似正态分布的预训练权重提供更合适的 4-bit 量化码点"
  - "把 LoRA rank 自动变为 0"
  - "替代所有优化器状态"
  - "让模型只能做分类任务"
answer: 0
explain: "NF4 针对预训练权重分布设计 4-bit 表示，降低量化误差，是 QLoRA 节省显存且保持效果的关键之一。"
```
