### NSA: 原生稀疏注意力 (Native Sparse Attention)

```yaml
id: nsa
name: NSA
full_name: 原生稀疏注意力 (Native Sparse Attention)
year: '2025'
org: DeepSeek
paper_url: https://arxiv.org/abs/2502.11089
category: attention
parent: flashattn_v2
motivation: 硬件对齐的原生可训练稀疏注意力
```

#### 📝 一句话总结

NSA 提出原生可训练的稀疏注意力，把粗粒度压缩、细粒度选择和局部窗口组合成硬件友好的层级稀疏模式，在长上下文中降低计算与缓存开销。

#### 🎯 核心要点

- 包含 compressed attention、selected attention 和 sliding-window attention 三条分支
- 稀疏模式在训练中原生使用，而不是推理后临时剪枝
- 按块/页组织 token，便于硬件高效访问
- 动态选择重要块以保留长程依赖
- 作为 DeepSeek 长上下文稀疏注意力路线的重要基础

#### 🔬 深入细节

![NSA 核心示意图](https://ar5iv.labs.arxiv.org/html/2502.11089/assets/x1.png)
*图：NSA 的三分支稀疏注意力架构，结合压缩、选择和局部窗口。*

```python
# Native Sparse Attention sketch
compressed = attend(Q, compress_blocks(KV))
selected_blocks = topk_blocks(score_blocks(Q, K), k=top_k)
selected = attend(Q, gather(KV, selected_blocks))
local = attend(Q, sliding_window(KV, w))
out = merge_heads_or_gate(compressed, selected, local)
```

##### 动机与背景

后验 KV 剪枝或稀疏化常与模型训练分布不一致，硬件访问也可能零散低效。长上下文模型需要一种训练时就使用、推理时也高效的稀疏注意力结构。

##### 核心机制

NSA 将注意力拆为三类信息：压缩分支提供全局粗粒度摘要；选择分支动态取重要块保留精确长程信息；局部窗口分支保证近邻细节。块级组织让稀疏访问更适合 GPU kernel。

##### 训练/推理流程

训练时模型就按 NSA 模式计算 attention，学习如何使用压缩和选择分支。推理时对历史 KV 按块索引，先快速评分选块，再对选中块和局部窗口执行精确注意力。

##### 与传统方法的区别

NSA 不同于 H2O 这类推理时 cache eviction，也不同于固定 Longformer 式稀疏模式；它是原生训练的、动态选择的、硬件对齐的稀疏 attention。

#### 🧪 练习题

```yaml
question: "NSA 的三个核心分支不包括哪一项？"
options:
  - "compressed attention"
  - "selected attention"
  - "sliding-window attention"
  - "奖励模型打分"
answer: 3
explain: "NSA 由压缩、选择和局部窗口分支组成，不依赖奖励模型打分。"
```
