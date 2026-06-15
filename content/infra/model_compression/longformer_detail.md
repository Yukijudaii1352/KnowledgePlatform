### Longformer

```yaml
id: longformer
name: Longformer
full_name: 长文档Transformer (Longformer)
year: 2020
org: Allen AI
paper_url: https://arxiv.org/abs/2004.05150
category: sparsity_deploy
parent: —
motivation: 局部窗口+全局注意力实现线性复杂度
```

#### 📝 一句话总结

Longformer 提出滑动窗口局部注意力与任务驱动全局注意力结合的长文档 Transformer，把标准自注意力的 \(O(n^2)\) 复杂度降为近似线性，解决了 BERT/RoBERTa 难以处理数千 token 长文档的问题。

#### 🎯 核心要点

- 用 sliding window attention 让每个 token 只关注邻近窗口
- 可加入 dilated window 扩大感受野而不显著增加计算
- 对 `[CLS]`、问题 token 或任务关键 token 使用 global attention
- attention pattern 可作为标准 self-attention 的 drop-in replacement
- 提供 Longformer-chunk 和自定义 CUDA kernel 实现，改善长序列显存与速度
- 扩展出 LED，用于长文档生成式 seq2seq 任务

#### 🔬 深入细节

![Longformer 滑动窗口注意力](https://ar5iv.labs.arxiv.org/html/2004.05150/assets/x3.png)
*图：Longformer 的 sliding window attention 让每个 token 只与固定窗口内 token 交互，从而线性扩展到长序列。*

```python
# Longformer attention 伪代码
for i in range(seq_len):
    attend_to = tokens[i-w:i+w+1]          # local sliding window
    if i in global_token_indices:
        attend_to = tokens[:]              # global token attends all
    if any_global_tokens:
        attend_to += global_tokens         # all tokens can attend global tokens
    context[i] = attention(q[i], keys(attend_to), values(attend_to))
```

标准 Transformer 的 self-attention 需要计算所有 token 两两相似度，复杂度和显存为 \(O(n^2)\)。当文档长度从 512 扩到 4096 或更长时，attention 矩阵会成为主要瓶颈。Longformer 的核心思路是承认大多数语言依赖是局部的，同时给少数任务关键 token 全局视野。

局部窗口注意力可写成：

$$
\mathrm{Attn}(i)=\{j: |i-j|\le w\}
$$

若窗口大小 \(w\) 固定，每个 token 只看 \(2w+1\) 个邻居，总复杂度为 \(O(nw)\)，在 \(w\ll n\) 时近似线性。多层堆叠后，信息仍能跨窗口逐层传播。

全局注意力弥补纯局部模式的不足。对于分类任务，`[CLS]` 可作为汇聚全局信息的 token；对于问答任务，问题 token 可设置为 global，使上下文 token 能与问题直接交互。这样既保持稀疏计算，又避免长距离任务信号被局部窗口阻断。

> 💡 关键：Longformer 的全局 token 是任务驱动的稀疏“枢纽”，不是让所有 token 恢复 full attention。

与 BigBird 相比，Longformer 更偏工程实用和任务模式设计；BigBird 进一步加入随机块并给出理论保证。与截断长文档相比，Longformer 能保留完整上下文，适合长文档分类、抽取式问答和摘要等任务。

#### 🧪 练习题

```yaml
question: "Longformer 如何将长序列注意力复杂度从二次降到近似线性？"
options:
  - "每个 token 只做局部窗口注意力，并只给少数任务 token 全局注意力"
  - "删除所有 position embeddings"
  - "把所有权重量化为 2 bit"
  - "只保留最后一层 Transformer"
answer: 0
explain: "固定窗口大小下每个 token 的注意力连接数不随序列长度线性增长，再配合少量全局 token 保留任务级信息流。"
```
