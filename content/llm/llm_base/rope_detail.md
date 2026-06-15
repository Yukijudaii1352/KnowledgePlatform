### RoPE (旋转位置编码)

```yaml
id: rope
name: RoPE
full_name: 旋转位置编码 (Rotary Position Embedding)
year: "2021.04"
org: Zhuiyi Technology
paper_url: https://arxiv.org/abs/2104.09864
category: architecture
parent: transformer
motivation: 相对位置信息融入注意力
```

#### 📝 一句话总结
RoPE 通过旋转矩阵将绝对位置编码融入自注意力的 Query/Key 向量中，使得注意力分数天然仅依赖相对位置差异，兼具绝对位置编码的简洁性与相对位置编码的表达力，且支持序列长度灵活外推与线性注意力。

#### 🎯 核心要点
- 提出**旋转位置编码 (Rotary Position Embedding, RoPE)**：将绝对位置编码为 d 维空间中的旋转矩阵，施加于 Q/K 向量
- 旋转矩阵的巧妙性质使得 QK 内积只依赖于相对位置 \(m-n\)，而无需显式计算相对位置偏移
- 具备**远程衰减**性质：token 间的注意力权重随相对距离增大而自然衰减，符合自然语言的距离敏感特性
- 支持**序列长度外推**：训练时未见过的更长序列在推理时可直接使用，无需重新训练
- 兼容**线性自注意力**：RoPE 可直接装备线性注意力机制，而传统绝对/相对位置编码方案难以做到
- 实现极简：在多头注意力中仅需对 Q/K 的每对维度施加不同频率的旋转变换，计算开销极小
- 在长文本分类基准上，基于 RoPE 的 RoFormer 模型一致优于 BERT/ALBERT/XLNet 等替代方案
- 自 2021 年起成为主流位置编码方案之一，被 LLaMA/Qwen/Mistral 等大量 LLM 采用

#### 🔬 深入细节

![RoPE 实现示意图](https://ar5iv.labs.arxiv.org/html/2104.09864/assets/x1.png)
*图：RoPE 的核心思想 — 将 Query 和 Key 向量按维度分组后在 2D 平面上旋转，旋转角度正比于 token 位置。注意力得分 \(\boldsymbol{q}_m^\top \boldsymbol{k}_n\) 由此天然表达为 \(\boldsymbol{x}_m^\top \boldsymbol{W}_q^\top \boldsymbol{R}_{n-m} \boldsymbol{W}_k \boldsymbol{x}_n\)，仅依赖相对位置。*

##### 动机与背景

Transformer 的自注意力机制本质是**位置无关**的 — 若不给 token 嵌入注入位置信息，模型将无法区分"我爱你"和"你爱我"。传统解决方案分为两类：

1. **绝对位置编码 (APE)**：在词嵌入上叠加位置向量（正弦/可学习），如原始 Transformer 的 sinusoidal encoding。位置信息在线性层中被混合，但进入注意力计算后位置间的相对关系被模糊。
2. **相对位置编码 (RPE)**：在注意力分数中显式加入相对位置偏置项 \(a_{m-n}\)，如 T5 的相对位置偏置和 Transformer-XL 的方案。表达力强但计算复杂，且难以兼容线性注意力（线性注意力将 softmax 替换为核函数乘积，无法直接注入加性偏置）。

RoPE 的核心洞察：**在 Q/K 向量上乘以位置相关的旋转矩阵，让注意力内积自动包含相对位置信息。** 这既保留了绝对位置编码的简单性（仅修改 Q/K 向量），又获得了相对位置编码的表达力（内积依赖相对位置）。

##### 核心机制：旋转矩阵编码位置

设 d 维向量 \(\boldsymbol{x}\)，RoPE 将其按维度两两配对，每对 (2i, 2i+1) 视为一个 2D 平面，并施加角度为 \(m\theta_i\) 的旋转：

$$
\boldsymbol{R}_m =
\begin{pmatrix}
\cos m\theta_0 & -\sin m\theta_0 & 0 & 0 & \cdots & 0 & 0 \\
\sin m\theta_0 & \cos m\theta_0 & 0 & 0 & \cdots & 0 & 0 \\
0 & 0 & \cos m\theta_1 & -\sin m\theta_1 & \cdots & 0 & 0 \\
0 & 0 & \sin m\theta_1 & \cos m\theta_1 & \cdots & 0 & 0 \\
\vdots & \vdots & \vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & 0 & 0 & \cdots & \cos m\theta_{d/2-1} & -\sin m\theta_{d/2-1} \\
0 & 0 & 0 & 0 & \cdots & \sin m\theta_{d/2-1} & \cos m\theta_{d/2-1}
\end{pmatrix}
$$

其中 \(\theta_i = 10000^{-2i/d}\)，与原始 Transformer 正弦编码频率一致。该矩阵是分块对角的正交矩阵（旋转矩阵），满足：

$$
\boldsymbol{R}_m^\top \boldsymbol{R}_n = \boldsymbol{R}_{n-m}
$$

**关键性质**：两个旋转矩阵的乘积（或转置乘）仍然是旋转矩阵，且角度为两者之差。

将 RoPE 应用于自注意力的 Query 和 Key 计算：

$$
\boldsymbol{q}_m = \boldsymbol{R}_m \boldsymbol{W}_q \boldsymbol{x}_m, \quad \boldsymbol{k}_n = \boldsymbol{R}_n \boldsymbol{W}_k \boldsymbol{x}_n
$$

Value 不施加位置编码。注意力分数变为：

$$
\boldsymbol{q}_m^\top \boldsymbol{k}_n = (\boldsymbol{R}_m \boldsymbol{W}_q \boldsymbol{x}_m)^\top (\boldsymbol{R}_n \boldsymbol{W}_k \boldsymbol{x}_n) = \boldsymbol{x}_m^\top \boldsymbol{W}_q^\top \boldsymbol{R}_m^\top \boldsymbol{R}_n \boldsymbol{W}_k \boldsymbol{x}_n = \boldsymbol{x}_m^\top \boldsymbol{W}_q^\top \boldsymbol{R}_{n-m} \boldsymbol{W}_k \boldsymbol{x}_n
$$

> 💡 关键：注意力分数仅依赖于相对位置 \(n-m\)，而旋转矩阵天然将绝对位置 \(m\) 编码进了 Q/K，无需任何显式相对位置偏置项。这是 RoPE 最精妙的设计。

##### 高效实现

在 PyTorch/TensorFlow 中，逐元素施加旋转矩阵可利用欧拉公式简化为**复数的旋转**操作。将每对相邻维度 (2i, 2i+1) 视为复数 \(a + ib\)，旋转角度为 \(\theta\)，则：

```python
def rotary_embedding(q, k, positions, dim):
    """
    q, k: [batch, heads, seq_len, dim]
    positions: [seq_len]
    """
    # 生成频率: theta_i = 10000^{-2i/dim}
    freqs = 1.0 / (10000 ** (torch.arange(0, dim, 2).float() / dim))
    # [seq_len, dim/2]
    angles = positions[:, None] * freqs[None, :]

    # cos/sin 缓存
    cos = angles.cos().unsqueeze(0).unsqueeze(0)  # [1, 1, seq, dim/2]
    sin = angles.sin().unsqueeze(0).unsqueeze(0)

    # 将 q/k 的最后维 reshape 为 [..., dim/2, 2]（复数对）
    # q = [a1, b1, a2, b2, ...] -> 旋转后 = [a1*cos - b1*sin, b1*cos + a1*sin, ...]
    def rotate_half(x):
        x1, x2 = x[..., 0::2], x[..., 1::2]
        return torch.stack((-x2, x1), dim=-1).flatten(-2)

    q_rot = q * cos.repeat_interleave(2, dim=-1) + rotate_half(q) * sin.repeat_interleave(2, dim=-1)
    k_rot = k * cos.repeat_interleave(2, dim=-1) + rotate_half(k) * sin.repeat_interleave(2, dim=-1)
    return q_rot, k_rot
```

> ⚠️ 注意：上述实现将 Q/K 的相邻维度对解释为 (实部, 虚部)，旋转即复数乘法 \(e^{i\theta} \cdot z\)。这是 RoPE 在实际框架中的标准实现方式，LLaMA/Qwen 等模型均沿用此模式。

##### 远程衰减性质

RoPE 具备一个重要的数学性质：注意力权重随相对距离增长而自然衰减。这是因为旋转频率 \(\theta_i\) 沿维度递减（低频 → 高频），使得不同维度的旋转对不同相对距离的敏感度不同：低频维度捕捉长距离依赖，高频维度捕捉短距离细节。综合所有维度的内积结果，形成一个随 \(|n-m|\) 增大而衰减的上界。

![RoPE 远程衰减性质](https://ar5iv.labs.arxiv.org/html/2104.09864/assets/x2.png)
*图：RoPE 注意力权重随相对距离的衰减曲线。x 轴为相对距离，y 轴为注意力权重上界。可见相对距离越大，注意力上界越低，自然实现"近者关注、远者忽略"。*

##### 与线性自注意力的兼容性

线性注意力将标准 softmax 注意力替换为核函数形式：

$$
\text{Attention}(\boldsymbol{Q},\boldsymbol{K},\boldsymbol{V}) = \frac{\phi(\boldsymbol{Q})(\phi(\boldsymbol{K})^\top \boldsymbol{V})}{\phi(\boldsymbol{Q})\sum \phi(\boldsymbol{K})^\top}
$$

这使得计算复杂度从 \(O(n^2)\) 降至 \(O(n)\)。RoPE 可以直接装备线性注意力，只需将旋转后的 \(\boldsymbol{Q}', \boldsymbol{K}'\) 送入核函数即可。传统 RPE（加性偏置）无法被分解到核函数中，因此无法与线性注意力兼容。这是 RoPE 相对于传统 RPE 的一个关键优势。

##### 与已有方法的关键区别

| 方法 | 位置编码方式 | 相对信息 | 线性注意力兼容 | 长度外推 |
|------|-------------|---------|---------------|---------|
| Sinusoidal APE | 加到词嵌入 | 隐式 | ✓ | ✗ |
| Learnable APE | 可学习向量 | 无 | ✓ | ✗ |
| T5 RPE | 注意力加性偏置 | 显式 | ✗ | ✗ |
| Transformer-XL RPE | 注意力加性偏置 | 显式 | ✗ | 部分 |
| **RoPE** | **Q/K 旋转变换** | **显式** | **✓** | **✓** |

> 💡 关键：RoPE 是首个同时满足"自然包含相对位置信息"和"兼容线性注意力"的位置编码方案。其"旋转矩阵乘 Q/K"的设计使得位置编码与内容表征在乘法层面融合，而非简单的加法叠加。

#### 🧪 练习题

```yaml
question: "RoPE 为什么能够兼容线性自注意力，而传统相对位置编码 (如 T5 的加性偏置) 不能？"
options:
  - "RoPE 的计算量更小，所以线性注意力可以承受"
  - "RoPE 将位置信息乘性融入 Q/K 向量本身，而线性注意力的核函数分解要求位置信息不能是加性偏置"
  - "RoPE 使用了可学习的旋转角度，可以自适应线性注意力的需求"
  - "传统相对位置编码无法处理长序列，而 RoPE 可以"
answer: 1
explain: "线性注意力依赖核函数分解 φ(Q)φ(K)ᵀ，而加性偏置 b(m-n) 无法分解为两个向量的内积。RoPE 的旋转矩阵直接作用于 Q/K 向量，使得位置信息成为向量的一部分，天然兼容核函数分解。"
```
