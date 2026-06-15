### Megatron-LM

```yaml
id: megatron_lm
name: Megatron-LM
full_name: Megatron-LM
year: "2019"
org: NVIDIA
paper_url: https://arxiv.org/abs/1909.08053
category: training_platform
parent: pytorch
motivation: 高效张量并行支持千亿参数训练
```

#### 📝 一句话总结

Megatron-LM 提出面向 Transformer 的高效张量并行切分方案，将注意力和 MLP 中的大矩阵按列/行分片，在保持模型结构基本不变的情况下支撑十亿到百亿参数语言模型训练。

#### 🎯 核心要点

- 对 MLP 第一层做 column parallel、第二层做 row parallel，使中间激活可局部分片
- 对 self-attention 的多头天然切分，每个 GPU 负责一部分 attention heads
- 在每个 Transformer block 中只需要少量 all-reduce/gather，同步点清晰
- 结合混合精度、activation checkpointing 和大 batch 训练提升吞吐
- 后续 Megatron-LM 成为 3D 并行中 tensor parallel 维度的经典实现

#### 🔬 深入细节

![Megatron-LM 核心示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/x1.png)
*图：图示展示 Megatron-LM 对 Transformer MLP 和 attention 的张量并行切分方式。*

```python
# Megatron-LM 张量并行核心伪代码
# MLP: Y = GeLU(X A) B
A_i = shard_columns(A, tp_rank)
Z_i = gelu(X @ A_i)          # 每卡只算部分 hidden expansion
B_i = shard_rows(B, tp_rank)
Y_partial = Z_i @ B_i
Y = all_reduce_sum(Y_partial)

# Attention: 每卡负责一组 heads，输出后再合并
heads_i = attention_heads_i(X)
out = all_reduce_or_concat(project(heads_i))
```

训练大 Transformer 的瓶颈首先是单层矩阵乘参数和激活太大。简单按层 pipeline 可以扩展深度，但单个巨大矩阵仍可能放不进一张 GPU；Megatron-LM 的重点是把单个 Transformer layer 内部也切开。

MLP 层通常是 \(X A\) 后接 GeLU 再乘 \(B\)。如果将 \(A\) 按列切分，每张卡得到一部分扩展维度并独立做 GeLU；再将 \(B\) 按行切分，各卡计算输出 partial sum，最后 all-reduce 相加即可。

多头注意力天然可按 head 切分。每张 GPU 计算部分 Q/K/V head 的 attention，减少单卡参数和激活；在输出投影或残差连接位置进行必要通信。

与 ZeRO 的数据并行状态分片不同，Megatron-LM 是模型计算本身的张量分片。它对 Transformer 结构有针对性，通信局限在层内少数位置，因此在节点内高速 NVLink 环境中效率很高。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Megatron-LM 的张量并行主要切分 Transformer 的什么部分？"
options:
  - "数据集样本"
  - "MLP/Attention 中的大矩阵和 attention heads"
  - "训练日志"
  - "优化器学习率表"
answer: 1
explain: "Megatron-LM 针对 Transformer 层内矩阵和多头注意力做分片。"
```
