### RetNet: 保留网络 (Retentive Network)

```yaml
id: retnet
name: RetNet
full_name: 保留网络 (Retentive Network)
year: '2023'
org: Microsoft
paper_url: https://arxiv.org/abs/2307.08621
category: linear_attn
parent: —
motivation: 三种范式统一实现线性推理复杂度
```

#### 📝 一句话总结

RetNet 提出 multi-scale retention 机制，把 Transformer 式并行训练、RNN 式常数状态推理和 chunkwise 长序列训练统一为等价计算范式，解决自注意力推理 KV cache 随序列长度增长的问题。

#### 🎯 核心要点

- 用 retention 替代 self-attention，核心计算为带因果 mask 和指数衰减的 \(QK^\top V\)
- 同一个 retention 层同时支持 parallel、recurrent、chunkwise recurrent 三种等价表示
- 推理采用递推状态 \(S_n=\gamma S_{n-1}+K_n^\top V_n\)，每步只维护固定大小状态，避免完整 KV cache
- Multi-Scale Retention 为不同 head 分配不同衰减率 \(\gamma\)，覆盖短期到长期依赖
- Gated Multi-Scale Retention 结合 gate、GroupNorm/SubLN 和 FFN，组成与 Transformer block 类似的 RetNet block
- 长序列训练可在 chunk 内并行、chunk 间递推，使内存复杂度线性增长

#### 🔬 深入细节

##### 论文图与三种范式

![RetNet parallel retention 表示](https://ar5iv.labs.arxiv.org/html/2307.08621/assets/x3.png)
![RetNet recurrent retention 表示](https://ar5iv.labs.arxiv.org/html/2307.08621/assets/x4.png)
*图源：RetNet ar5iv 论文页面 Figure 3。左图是并行表示，右图是递推表示；两者计算同一个 retention，只是执行方式不同。*

##### 核心伪代码

```python
# RetNet retention: parallel, recurrent, and chunkwise recurrent
def parallel_retention(q, k, v, decay_mask):
    # q,k,v: [batch, heads, length, dim]
    scores = q @ k.transpose(-1, -2)
    scores = scores * decay_mask          # causal mask + gamma ** distance
    out = scores @ v
    return group_norm_per_head(out)


def recurrent_retention(q_t, k_t, v_t, state, gamma):
    # state: [batch, heads, qk_dim, value_dim]
    state = gamma * state + outer(k_t, v_t)
    out_t = q_t @ state
    return group_norm_per_head(out_t), state


def chunkwise_retention(q, k, v, state, decay_mask, chunk_decay, inner_decay):
    # chunk 内并行，chunk 间递推
    inner = (q @ k.transpose(-1, -2) * decay_mask) @ v
    cross = (q @ state) * inner_decay
    out = group_norm_per_head(inner + cross)
    state = chunk_decay * state + k.transpose(-1, -2) @ v
    return out, state
```

##### 机制拆解

RetNet 的出发点是所谓 “impossible triangle”：Transformer 能并行训练且性能强，但推理时需要保存所有历史 token 的 KV cache；RNN 推理状态固定，但训练难以像 attention 一样充分并行；一些线性 attention 或 SSM 变体能降低复杂度，却常牺牲表达能力或位置建模。RetNet 试图用一个 retention 算子同时获得三者：训练时像 attention，推理时像 RNN，长序列时用分块折中。

并行表示可以写成

$$
Y = \left(QK^\top \odot D\right)V,\qquad
D_{ij}=\mathbf{1}_{i\ge j}\gamma^{i-j}.
$$

这里 \(D\) 同时承担因果 mask 和指数时间衰减。它和 attention 的相似处是仍然用 \(QK^\top\) 聚合 value；差异在于 retention 不需要 softmax，而是把相对距离衰减直接乘到 token-pair 分数上。这让同一算子可以被改写成递推形式：

$$
S_n=\gamma S_{n-1}+K_n^\top V_n,\qquad
Y_n=Q_nS_n.
$$

递推状态 \(S_n\) 是历史 key/value 外积的指数衰减累积，而不是所有历史 key/value 的列表。生成第 \(n\) 个 token 时，只需读取上一步 \(S_{n-1}\)、加入当前 \(K_n^\top V_n\)、再用当前 \(Q_n\) 读出，因此单步推理成本与历史长度无关。直觉上，\(\gamma\) 越接近 1，记忆越长；\(\gamma\) 越小，模型越偏向近期上下文。

Multi-Scale Retention 将不同 head 的 \(\gamma\) 设为不同尺度，使一层内部同时存在快衰减和慢衰减通道。快通道适合局部语法和短期依赖，慢通道适合跨段信息。因为不同尺度会造成 head 输出方差不同，RetNet 在 retention 输出上使用 per-head GroupNorm/SubLN，再通过 gate 增加非线性，整体形式可抽象为

$$
\operatorname{MSR}(X)=\left(\operatorname{GroupNorm}(\operatorname{Retention}(X))\right)\odot \operatorname{swish}(XW_g).
$$

这种 gate 类似现代 Transformer MLP 中的门控分支，用来补偿没有 softmax attention 后的表达能力。

Chunkwise recurrent 表示服务于长序列训练：如果整段都用 parallel retention，\(QK^\top\) 仍然会产生块内二次矩阵；如果完全递推，GPU 并行度又不足。RetNet 把序列切成 chunk，在 chunk 内用并行矩阵乘法吃满 GPU，在 chunk 之间只传递压缩状态 \(S\)。这使训练时可控地交换并行度和显存，同时保证和完整 recurrent/parallel 形式在数学上对齐。

与 Transformer 相比，RetNet 最大变化不是简单把 softmax 换成线性核，而是显式设计了可互相转换的执行范式。与线性 attention 相比，retention 的指数衰减和 xPos/RoPE 风格的位置结构更强；与 RWKV/AFT 相比，retention 维护的是高维 \(K^\top V\) 状态，表达能力更接近 attention。因此 RetNet 更像一个 foundation backbone 级别的替代架构，而不是单个推理 kernel 优化。

#### 🧪 练习题

```yaml
question: "RetNet 为什么能在自回归推理中避免完整 KV cache？"
options:
  - "它把历史 key/value 信息递推压缩进固定大小的 retention state"
  - "它在推理时禁用所有历史 token"
  - "它只允许长度为 1 的输入"
  - "它把 FFN 替换成卷积后不再需要位置编码"
answer: 0
explain: "recurrent retention 用 S_n=gamma S_{n-1}+K_n^T V_n 累积历史，生成新 token 时只更新固定状态，不保存全部 KV。"
```
