### 保留网络 (RetNet: Retentive Network)

```yaml
id: retnet
name: RetNet
full_name: 保留网络 (Retentive Network)
year: "2023.07"
org: Microsoft Research
paper_url: https://arxiv.org/abs/2307.08621
category: long_context
parent: transformer_xl
motivation: 保留机制兼顾并行与递归
```

#### 📝 一句话总结

RetNet 提出了 **Retention（保留）机制**替代 Transformer 的 self-attention，从理论上统一了递归与注意力的联系，使同一模型支持并行训练、\\(\mathcal{O}(1)\\) 的推理复杂度和块递归长序列建模，成为大语言模型领域 Transformer 的有力继任者。

#### 🎯 核心要点

- 提出了 **Retention 机制**，从数学上推导出递归（RNN）与注意力（Attention）在序列建模中的统一形式
- 支持 **三种计算范式**：并行表示（训练）、递归表示（\\(\mathcal{O}(1)\\) 推理）、块递归表示（线性复杂度长序列建模）
- 推理时每 token 仅需 \\(\mathcal{O}(1)\\) 计算与常数量内存，无需维护 KV cache，解码吞吐量提升约 14 倍
- 采用 **因果衰减矩阵 D**（causal decay matrix）在 attention 内部隐式编码位置信息，无需显式位置编码
- 块递归训练将长序列分块，块内并行的同时跨块逐块递归传递状态流，实现线性复杂度
- 架构上采用多层 Retention Block + FFN（SwiGLU 激活），整体设计接近 Transformer 但彻底移除 self-attention
- 语言建模实验显示 RetNet 在相同设置下**性能不输 Transformer**，且推理效率显著更优

#### 🔬 深入细节

##### 示意图

![RetNet 核心架构](https://github.com/microsoft/unilm/raw/master/retnet/assets/retnet_arch.png)
*图：RetNet 整体架构。左为 retention block 内部结构（Multi-Scale Retention + FFN），右为三种计算范式的关系：并行、递归与块递归。*

##### 核心公式：Retention 机制

Retention 的数学核心是从因果 attention 中显式注入相对位置衰减因子，推导出统一形式。给定输入 \\(\mathbf{X} \in \mathbb{R}^{\|x\| \times d}\\)，将其投影为 \\(\mathbf{Q}, \mathbf{K}, \mathbf{V}\\)：

$$
\text{Retention}(\mathbf{X}) = (\mathbf{Q}\mathbf{K}^\top \odot \mathbf{D})\mathbf{V}
$$

其中 \\(\mathbf{D}_{nm} = \gamma^{n-m}\\) 当 \\(n \geq m\\)，否则为 0（因果衰减矩阵），\\(\gamma \in (0, 1)\\) 为衰减因子（如 0.96875）。

##### 三种计算范式

**① 并行表示 (Parallel)——训练用**
展开上述矩阵乘法，直接对整序列并行计算，GPU 友好：

$$
\text{Retention}(\mathbf{X})_n = \sum_{m=1}^{n} \gamma^{n-m} (\mathbf{Q}_n^\top \mathbf{K}_m) \mathbf{V}_m
$$

**② 递归表示 (Recurrent)——推理用**
将上述求和重写为状态空间更新形式：

$$
\begin{aligned}
\mathbf{S}_n &= \gamma \mathbf{S}_{n-1} + \mathbf{K}_n \mathbf{V}_n^\top \\\\
\text{Retention}(\mathbf{X})_n &= \mathbf{Q}_n \mathbf{S}_n
\end{aligned}
$$

其中 \\(\mathbf{S}_n \in \mathbb{R}^{d \times d}\\) 为 \\(d\\) 维状态矩阵。推理时每步仅需 \\(\mathcal{O}(d^2)\\) 计算和常量内存——与序列长度无关，即 \\(\mathcal{O}(1)\\) 推理。

**③ 块递归表示 (Chunkwise Recurrent)——长序列训练**
将序列切分为长度为 \\(B\\) 的块，块内并行计算，块间逐块传递状态：

$$
\mathbf{S}_{[i]} = \gamma^B \mathbf{S}_{[i-1]} + \sum_{m=1}^{B} \gamma^{B-m} \mathbf{K}_{[i],m} \mathbf{V}_{[i],m}^\top
$$

块内 attention 同时融合上块的状态，实现线性复杂度 \\(\mathcal{O}(N \cdot d^2)\\)。

##### 伪代码

```python
def retention_parallel(Q, K, V, gamma):
    """并行计算 (训练用)"""
    L = Q.shape[0]
    D = gamma ** (np.arange(L)[:, None] - np.arange(L)[None, :])  # [L, L]
    D = np.tril(D)  # 下三角因果掩码
    attn = (Q @ K.T) * D              # (QK^T) ⊙ D
    return attn @ V

def retention_recurrent(Q, K, V, gamma, state):
    """递归计算 (推理用), state shape: [d, d]"""
    state = gamma * state + np.outer(K, V)
    output = Q @ state                # Q: [d], state: [d, d] -> [d]
    return output, state
```

##### Multi-Scale Retention (MSR)

类比 Multi-Head Attention，RetNet 将 head 分为多组，每组使用不同衰减因子 \\(\gamma_h\\)（指数级递增，覆盖短程到长程依赖）：

$$
\gamma_h = 1 - 2^{-5 - h}, \quad h = 1, \dots, H
$$

实际实验中 \\(H=8\\)，\\(\gamma\\) 从 0.96875 到约 0.9995，形成**多尺度衰减谱**，短程头捕获局部语法，长程头建模全局语义。

##### Retention Block 结构

每个 block 由 MSR + FFN 组成，采用 Pre-LayerNorm：

$$
\begin{aligned}
\mathbf{Y} &= \text{MSR}(\text{LN}(\mathbf{X})) + \mathbf{X} \\\\
\mathbf{Z} &= \text{FFN}(\text{LN}(\mathbf{Y})) + \mathbf{Y}
\end{aligned}
$$

FFN 使用 **SwiGLU** 激活（同 LLaMA 等），维度：\\(d_{model}=d, d_{ffn}=2d\\)。

##### 动机与背景

> ⚠️ **痛点**：Transformer 推理时需要维护整个历史的 KV cache，内存随序列长度线性增长（\\(\mathcal{O}(n)\\)），推理延迟高、吞吐低。线性注意力、Mamba 等方案虽提升推理效率，但训练时无法并行或性能下降。
>
>  💡 **关键洞察**：RetNet 发现，若将因果 attention 中的 softmax 替换为固定的**指数衰减加权**，则 attention 形式在数学上可等价位为 RNN 形式的状态空间更新——**同一组参数、同一组权重的模型，训练时并行、推理时递归**，无需任何近似。

##### 推理效率对比

| 指标 | Transformer | RetNet |
|------|------------|--------|
| 每个 token 推理复杂度 | \\(\mathcal{O}(n)\\) | \\(\mathcal{O}(1)\\) |
| KV Cache 内存 | \\(\mathcal{O}(n)\\) | \\(\mathcal{O}(1)\\)（矩阵状态） |
| 13B 模型解码吞吐 | 1x | ~14x |
| 训练复杂度（并行） | \\(\mathcal{O}(n^2)\\) | \\(\mathcal{O}(n^2)\\) |

> 训练时 RetNet 也可用块递归将复杂度降至 \\(\mathcal{O}(n \cdot d^2)\\)，但并行形式在小/中规模上与 Transformer 训练效率持平，因为 (QK^T ⊙ D) 本身可高度并行化，且 D 可预计算缓存。

##### 与传统方法的区别

1. **vs Transformer**：用指数衰减替代 softmax 归一化，因果掩码变成严格数学约束的自然产物；推理无需 KV cache，用固定大小的状态矩阵 S 替代。
2. **vs Linear Attention**：Linear Attention 用核函数近似 \\(\phi(Q)\phi(K)^\top\\)，RetNet 不做近似——衰减形式是严格的因果推导结果。
3. **vs RWKV / Mamba**：RetNet 同样属于"可并行训练的 RNN"类别，但其训练使用完整矩阵乘法（非扫描），只需额外计算衰减矩阵 D 的逐元素乘，GPU 利用率更高。

#### 🧪 练习题

```yaml
question: "RetNet 的 Retention 机制如何实现 O(1) 推理复杂度？"
options:
  - "训练时只保留最近 K 个 token 的 KV cache"
  - "引入量化技术压缩注意力矩阵"
  - "将因果注意力等价转化为固定大小的矩阵状态递推，每步仅更新状态矩阵而不扩展序列维度"
  - "用核方法近似注意力计算以减少计算量"
answer: 2
explain: "RetNet 通过因果衰减矩阵 D 将 attention 转化为 S_n = γS_{n-1} + K_n V_n^⊤ 的递推形式，推理时仅需存储和更新固定大小的 d×d 状态矩阵（与序列长度无关），因此达到 O(1) 计算和内存。"
```