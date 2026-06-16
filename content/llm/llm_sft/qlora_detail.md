### QLoRA：量化低秩适配
```yaml
id: qlora
name: QLoRA
full_name: 量化低秩适配 (QLoRA)
year: "2023.05"
org: University of Washington
paper_url: https://arxiv.org/abs/2305.14314
category: peft
parent: lora
motivation: 4-bit量化实现单卡微调65B模型
```

#### 📝 一句话总结
QLoRA 提出在冻结的 4-bit 量化大模型上反向传播到 LoRA adapter，并结合 NF4、Double Quantization 与 Paged Optimizer，把 65B 模型微调压缩到单张 48GB GPU，同时接近 16-bit 微调效果。

#### 🎯 核心要点
- 冻结预训练基座权重并以 4-bit NormalFloat 存储，仅训练插入到线性层中的 LoRA 参数。
- 前向/反向计算时把 4-bit 权重临时 dequantize 到 BF16 做矩阵乘法，梯度只更新 LoRA adapter，不更新量化基座。
- 提出 NF4 数据类型：针对近似零均值正态分布的神经网络权重，用分位数量化构造 4-bit codebook。
- 提出 Double Quantization：再次量化第一层量化所需的 scale/absmax 常数，平均节省约 0.37 bit/parameter。
- 使用 Paged Optimizer 借助 NVIDIA Unified Memory，把 optimizer state 在 GPU/CPU 间分页，缓解长序列和 gradient checkpointing 带来的显存尖峰。
- 经验结论强调 LoRA 应用于所有 transformer 线性层，而不仅是 query/value projection，才能更稳定地恢复 16-bit 性能。
- 论文用 QLoRA 微调超过 1000 个模型，覆盖 LLaMA/T5、7B 到 65B、8 个 instruction datasets，并产出 Guanaco 系列聊天模型。

#### 🔬 深入细节
![QLoRA 微调框架与显存对比](https://ar5iv.labs.arxiv.org/html/2305.14314/assets/x1.png)
*图：论文 Figure 1 对比 full finetuning、LoRA 与 QLoRA 的显存结构。QLoRA 的核心变化是把 frozen transformer 压到 4-bit，并用 paged optimizer 管理训练时显存峰值。*

```python
# QLoRA 核心训练流程（概念伪代码）
W_fp16 = load_pretrained_llm()

# 1. 分块量化基座权重：NF4 存储权重，Double Quantization 存储量化常数
for block in chunks(W_fp16, block_size=64):
    c1 = absmax(block)
    W_nf4_block = quantize_to_nf4(block / c1)
store(W_nf4, quantize_fp8(c1))
freeze(W_nf4)

# 2. 在所有目标线性层插入 LoRA adapter
for linear_layer in transformer.linear_layers:
    linear_layer.add_lora_adapter(rank=r, dtype="bf16")

# 3. 训练时只更新 LoRA；4-bit 权重只在计算时临时反量化
for batch in dataloader:
    for quantized_linear in model.layers:
        W_bf16 = double_dequant(quantized_linear.W_nf4, quantized_linear.quantized_scales)
        y = x @ W_bf16 + lora_scale * (x @ A @ B)
    loss = cross_entropy(y, labels)
    loss.backward()              # gradient flows through W_bf16 into LoRA path
    paged_adamw.step(lora_params_only)
    paged_adamw.zero_grad()
```

QLoRA 解决的是一个非常具体的训练瓶颈：大模型全参微调不仅要存权重，还要存梯度、optimizer state 和激活。论文指出，常规 16-bit 微调 LLaMA 65B 需要超过 780GB GPU 显存；而仅靠 LoRA 虽然减少了可训练参数，但基座权重仍然以高精度常驻显存。QLoRA 的策略是把“模型容量”与“可训练参数”拆开：容量来自冻结的 4-bit 基座模型，任务适配能力来自小规模 BF16 LoRA adapter。

基础的 LoRA 线性层可写成：

$$
Y=XW+sXL_1L_2,
$$

其中 \(W\) 是冻结预训练权重，\(L_1,L_2\) 是可训练低秩矩阵，\(s\) 是缩放系数。QLoRA 将 \(W\) 替换为 NF4 存储的 \(W^{\text{NF4}}\)，但矩阵乘法仍在 BF16 中执行：

$$
Y^{\text{BF16}}=X^{\text{BF16}}\operatorname{doubleDequant}(W^{\text{NF4}}, c_1, c_2)+sX^{\text{BF16}}L_1^{\text{BF16}}L_2^{\text{BF16}}.
$$

直觉上，量化权重只负责“省显存存储”，而不是让 4-bit 直接承担低精度训练；每次用到权重时临时恢复到 BF16 参与计算，所以反向传播可以穿过反量化计算图，把误差信号传给 LoRA 参数。

NF4 是 QLoRA 最关键的量化设计。普通 int4/float4 的量化 bin 通常均匀或按浮点格式分布，但神经网络预训练权重大多近似零均值正态分布。NF4 用标准正态分布的分位数构造 codebook，使每个量化区间在理论上承载相近概率质量。可把第 \(i\) 个 codebook 值理解为相邻分位点的中心：

$$
q_i \approx \frac{1}{2}\left(Q_{\mathcal{N}}\left(\frac{i}{2^k+1}\right)+Q_{\mathcal{N}}\left(\frac{i+1}{2^k+1}\right)\right),
$$

其中 \(Q_{\mathcal{N}}\) 是标准正态分布的 quantile function，\(k=4\)。实际实现还会保证 zero point 可精确表示，因为 padding 或稀疏位置的 0 如果不能无误差表示，会带来不必要偏差。

分块量化会引入 scale 常数。假设每 64 个参数共享一个 \(c_1=\operatorname{absmax}(\text{block})\)，权重可近似恢复为：

$$
\hat{w}=c_1\cdot q_{\text{NF4}}.
$$

如果这些 \(c_1\) 仍用 FP32 存储，scale 本身会形成明显额外开销。Double Quantization 的做法是把 \(c_1\) 再作为输入做第二次量化，得到量化后的 scale 以及更粗粒度的二级 scale \(c_2\)。论文使用 64 blocksize 的第一层量化和 256 blocksize 的第二层量化，平均可把 scale 开销降低约 0.37 bit/parameter；对 65B 模型，这类小数级节省会累积成数 GB 显存。

Paged Optimizer 处理的是另一类问题：即使静态权重能放进显存，训练时某些 batch 仍可能因长序列、checkpointing 回放或 optimizer step 产生显存尖峰。QLoRA 用 NVIDIA Unified Memory 为 optimizer state 分页；当 GPU 显存不足时，部分状态自动迁移到 CPU RAM，需要更新时再迁回。这不改变优化目标，但把“偶发峰值导致 OOM”的硬失败变成可承受的分页成本。

> ⚠️ 注意：QLoRA 不是“直接训练 4-bit 权重”。基座权重被冻结，4-bit 是存储格式；训练信号通过临时 BF16 反量化路径流向 LoRA adapter。若更新量化基座本身，就不再是论文定义的 QLoRA。

与传统 LoRA 相比，QLoRA 的主要贡献不是新的低秩表达，而是围绕 LoRA 构建了一套可训练量化系统：NF4 降低量化误差，Double Quantization 压低 scale overhead，Paged Optimizer 控制显存峰值，所有线性层插入 LoRA 保证表达能力。论文的实验结论也很实用：在给定显存预算下，使用更大的低精度基座模型并做高质量 SFT，往往比小模型高精度微调更划算。

#### 🧪 练习题
```yaml
question: "QLoRA 中 4-bit 量化权重在训练时的角色是什么？"
options:
  - "作为可训练参数直接接收 AdamW 更新"
  - "被冻结并以 NF4 存储，用到时反量化到 BF16 参与计算"
  - "只用于推理，训练阶段仍保留完整 FP32 权重"
  - "替代 LoRA adapter，完全不需要低秩参数"
answer: 1
explain: "QLoRA 冻结 4-bit 基座权重，计算时临时 dequantize 到 BF16，梯度只更新 LoRA adapter。"
```
