### Sequence Parallelism: Long Sequence Training from System Perspective

```yaml
id: sequence_parallelism_ring_attention
paper: "Sequence Parallelism: Long Sequence Training from System Perspective"
arxiv: "2105.13120"
authors: "Shenggui Li, Fuzhao Xue, Chaitanya Baranwal, Yongbin Li, Yang You"
affiliation: "National University of Singapore, Colossal-AI"
venue: "ACL 2023"
year: 2023
topic: "distributed_training"
keywords: ["sequence parallelism", "ring attention", "long sequence", "transformer", "distributed training"]
```

---

## 📝 一句话总结

提出**Ring Self-Attention (RSA)**，沿序列维度切分输入并通过环形通信计算完整注意力，使Transformer可在多GPU上训练超长序列，通信开销与Tensor Parallelism相同但内存效率显著更优。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | Transformer的自注意力内存随序列长度L平方增长，单GPU无法训练长序列；现有Tensor Parallelism切分hidden维度，无法有效降低序列相关的激活内存 |
| **方法** | Ring Self-Attention：将长度为L的序列均分到N个GPU，每GPU持有Q^n, K^n, V^n (长度L/N)，通过环形P2P通信传递K和V，逐步计算完整注意力分数和输出 |
| **关键洞察** | 注意力计算中Q可以保持本地不动，只需环形传递K和V即可得到完整结果；MLP层无需通信（每GPU独立计算子序列） |
| **通信开销** | 与Tensor Parallelism完全相同：总计 8(N-1)×B×Z×(L/N)×A 数据量，但与Pipeline Parallelism兼容性更好（省去stage间的split/all-gather） |
| **内存优势条件** | MLP块：BL > 32H 时SP更优；注意力块：BL > 16AZ 时SP更优（长序列+大batch时优势明显） |
| **实验亮点** | 64 P100 GPUs: 13.7×最大batch size, 3×最大序列长度；稀疏注意力下支持114K tokens (27×单卡) |

---

## 🔬 深入细节

### 1. 核心动机：为什么需要序列并行？

**Tensor Parallelism (Megatron-LM)** 切分的是模型权重的hidden维度(H/N)，但每个GPU仍需持有**完整序列长度L**的激活。当L很大时：
- 注意力分数矩阵 S ∈ R^{L×L} 无法切分
- 激活内存随L线性/平方增长，成为瓶颈

**Sequence Parallelism** 切分序列维度(L/N)，每GPU只需存储子序列的激活，从根本上解决长序列内存问题。

### 2. Ring Self-Attention 算法

```
┌─────────────────────────────────────────────────────────────┐
│  Ring Self-Attention (RSA) - N个GPU环形排列                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  输入: 序列 X ∈ R^{B×L×H} 均分到N个GPU                       │
│        GPU_n 持有 X^n ∈ R^{B×(L/N)×H}                       │
│        各GPU本地计算 Q^n, K^n, V^n                            │
│                                                             │
│  ═══════════════════════════════════════════════════════     │
│  阶段1: 计算注意力分数 (环形传递K)                              │
│  ═══════════════════════════════════════════════════════     │
│                                                             │
│  for step = 0 to N-1:                                       │
│      # GPU_n 当前持有 K^{(n+step)%N}                         │
│      S_step^n = Q^n × (K^{(n+step)%N})^T   # 局部分数        │
│      # 环形发送K到下一个GPU                                    │
│      send K^{(n+step)%N} → GPU_{(n+1)%N}                    │
│      recv K^{(n+step-1)%N} ← GPU_{(n-1)%N}                  │
│                                                             │
│  # 拼接得到完整注意力分数                                      │
│  S^n = [S_0^n, S_1^n, ..., S_{N-1}^n]  ∈ R^{(L/N)×L}       │
│  S^n = softmax(S^n / √d)                                    │
│                                                             │
│  ═══════════════════════════════════════════════════════     │
│  阶段2: 计算注意力输出 (环形传递V)                              │
│  ═══════════════════════════════════════════════════════     │
│                                                             │
│  O^n = 0                                                    │
│  for step = 0 to N-1:                                       │
│      # GPU_n 当前持有 V^{(n+step)%N}                         │
│      O^n += S_{step}^n × V^{(n+step)%N}                     │
│      # 环形发送V到下一个GPU                                    │
│      send V^{(n+step)%N} → GPU_{(n+1)%N}                    │
│      recv V^{(n+step-1)%N} ← GPU_{(n-1)%N}                  │
│                                                             │
│  输出: O^n ∈ R^{B×(L/N)×H}  (GPU_n的局部输出)                │
└─────────────────────────────────────────────────────────────┘
```

**关键公式：**

$$O^n = \sum_{i=1}^{N} S_i^n \cdot V_i$$

其中 $S_i^n = \text{softmax}(Q^n \cdot (K^i)^T / \sqrt{d})$ 的第i个分块。

### 3. 内存对比分析

#### MLP块内存 (Table 1)

| 操作 | Tensor Parallelism | Sequence Parallelism |
|------|-------------------|---------------------|
| Linear 1 | (B,L,H) × (H, 4H/N) → (B,L,4H/N) | (B,L/N,H) × (H,4H) → (B,L/N,4H) |
| GeLU | (B,L,4H/N) | (B,L/N,4H) |
| Linear 2 | (B,L,4H/N) × (4H/N,H) → (B,L,H) | (B,L/N,4H) × (4H,H) → (B,L/N,H) |
| **总激活内存** | **32H²/N + 5BLH/N** | **32H² + 4BLH/N + BLH** → 但当BL>32H时SP更优 |

> **SP更优条件 (MLP)**: BL > 32H

#### 注意力块内存 (Table 2)

| 方法 | 切分维度 | 注意力矩阵大小 |
|------|---------|--------------|
| Tensor Parallelism | 切attention heads (Z/N) | B×(Z/N)×L×L (仍含完整L²) |
| Sequence Parallelism | 切sequence (L/N) | B×Z×(L/N)×L (行维度缩小) |

> **SP更优条件 (Attention)**: BL > 16AZ

### 4. 通信开销对比

```
┌──────────────────────────────────────────────────────────────┐
│              通信量对比 (单层Transformer)                       │
├────────────────────┬─────────────────┬───────────────────────┤
│                    │ Tensor Parallel │ Sequence Parallel      │
├────────────────────┼─────────────────┼───────────────────────┤
│ MLP Forward        │ 1 all-reduce    │ 0 (无通信!)            │
│ MLP Backward       │ 1 all-reduce    │ 0                     │
│ Attn Forward       │ 1 all-reduce    │ 2 ring P2P            │
│ Attn Backward      │ 1 all-reduce    │ 2 all-reduce+2 ring   │
├────────────────────┼─────────────────┼───────────────────────┤
│ 总数据量            │ 8(N-1)BZA(L/N) │ 8(N-1)BZA(L/N)        │
│                    │ = 相同!          │ = 相同!               │
├────────────────────┼─────────────────┼───────────────────────┤
│ Pipeline兼容性      │ 需额外split+    │ 天然兼容，无需额外      │
│                    │ all-gather      │ 通信                   │
└────────────────────┴─────────────────┴───────────────────────┘
```

**核心洞察**: SP将通信集中在注意力层（需要跨序列交互的地方），MLP层完全无通信；而TP在每层都需要通信。总量相同，但SP与Pipeline Parallelism组合时省去了stage间的额外通信。

### 5. 与稀疏注意力的兼容

论文展示了与Linformer（线性注意力）的结合：

- Linformer将K,V投影到低维 K' ∈ R^{K×d}（K << L）
- 结合SP后，所有包含L的内存项都被N整除
- **理论上可将序列长度扩展到无限长**（内存不再是瓶颈）
- 实验：32 P100 GPUs + 稀疏注意力 → **114K tokens**

### 6. 实验结果

**实验设置**: Piz Daint超算, P100 16GB GPUs, BERT Base/Large

#### 关键结果

| 实验 | 结果 |
|------|------|
| 最大Batch Size | SP(64 GPU) vs TP(12 GPU): **13.7×** |
| 最大序列长度 | SP(64 GPU) vs TP(12 GPU): **3×** (同16 GPU: 1.4×) |
| 稀疏注意力序列长度 | 114K tokens (**27×** 单卡稀疏注意力) |
| 吞吐量 | 相同并行度下SP与TP相当；SP可扩展到更大并行度 |

#### 弱缩放结果 (Weak Scaling)

| 并行度 | Batch | TP内存(MB) | SP内存(MB) | 说明 |
|--------|-------|-----------|-----------|------|
| 1 | 64 | 8477 | 8478 | 基线相同 |
| 2 | 128 | 9520 | 8479 | SP内存不增长! |
| 4 | 256 | 12233 | 8481 | TP内存快速增长 |
| 8 | 512 | **OOM** | 8491 | TP溢出，SP稳定 |

> **关键发现**: SP的内存几乎不随并行度增加而增长（因为每GPU的子序列长度保持L/N不变），而TP因为持有完整序列，batch增大时必然OOM。

### 7. 与后续工作的关系

```
时间线:
2021.05 - 本文(Ring Self-Attention, Colossal-AI)
2023.10 - Ring Attention (UC Berkeley, Liu et al.)  ← 类似思想，增加了blockwise计算
2023.11 - Megatron-LM Context Parallelism           ← 工业级实现

区别:
- 本文: 先计算完整softmax再环形传V，需存储完整注意力分数S^n∈R^{(L/N)×L}
- Ring Attention (2023): 结合FlashAttention的online softmax，无需存储完整S
- Context Parallelism: Megatron框架内的工程实现，支持多种注意力mask
```

---

## 🧪 练习题

### 基础题

**Q1**: Ring Self-Attention中，如果有N=4个GPU，序列长度L=1024，每个GPU在阶段1需要进行几次环形通信？每次通信传输的张量形状是什么？

<details>
<summary>答案</summary>

需要 N-1 = 3 次环形通信。每次传输的是K子块，形状为 (B, Z, L/N, A) = (B, Z, 256, A)，其中Z是注意力头数，A是每头维度。

注意第一步使用本地K^n不需要通信，后续3步每步接收一个新的K子块。
</details>

**Q2**: 为什么Sequence Parallelism在MLP层不需要任何通信？

<details>
<summary>答案</summary>

MLP层的计算是逐token独立的（pointwise），即 MLP(x_i) 只依赖于 x_i 本身，不依赖其他位置的token。因此每个GPU可以独立对自己持有的子序列 X^n ∈ R^{(L/N)×H} 进行MLP计算，无需与其他GPU交换信息。

相比之下，Tensor Parallelism切分的是权重矩阵的列/行，所以即使在MLP层也需要all-reduce来聚合部分结果。
</details>

### 进阶题

**Q3**: 论文指出SP的通信量与TP相同，但为什么SP与Pipeline Parallelism组合时通信更少？

<details>
<summary>答案</summary>

在Pipeline Parallelism中，需要在stage之间传递激活。

- **TP + Pipeline**: 每个GPU持有完整序列的激活(B,L,H)，但为了节省跨节点带宽，Megatron需要先split激活、传输部分激活、再all-gather恢复。这引入了额外的split和all-gather操作。

- **SP + Pipeline**: 每个GPU本来就只持有子序列的激活(B,L/N,H)，天然就是"已切分"状态，可以直接传递给下一个pipeline stage，无需额外的split/all-gather操作。

因此SP在每个pipeline stage可以省去一次all-gather操作。
</details>

**Q4**: 本文的RSA方法有一个关键限制：需要存储完整的注意力分数矩阵 S^n ∈ R^{(L/N)×L}。后续的Ring Attention (2023)如何解决这个问题？请描述核心思路。

<details>
<summary>答案</summary>

Ring Attention (2023, UC Berkeley) 利用了FlashAttention的**online softmax**技巧：

1. 不需要先计算完整的S^n再做softmax，而是在接收每个K块时**增量更新**softmax的分母和输出
2. 维护running max和running sum，每接收一个新的K^i块：
   - 计算局部分数 s_i = Q^n × (K^i)^T
   - 更新全局max: m_new = max(m_old, max(s_i))
   - 用修正因子重新缩放之前的累积结果
   - 累加新的贡献
3. 这样每步只需O(L/N × L/N)的内存，而非O(L/N × L)

这使得内存从O(L²/N)降低到O(L²/N²)，是一个质的飞跃。
</details>

### 思考题

**Q5**: 在什么场景下，你会选择Tensor Parallelism而非Sequence Parallelism？请从序列长度、模型大小、硬件拓扑三个角度分析。

<details>
<summary>答案</summary>

选择TP而非SP的场景：

1. **序列长度较短** (BL < 32H): 当序列短时，SP的内存优势消失（不满足BL>32H条件），而TP切分大模型权重更有效。例如L=512, H=12288的GPT-3，BL可能不满足条件。

2. **模型非常大**: TP可以切分模型权重(每GPU只存H/N的参数)，而SP每GPU需要存储完整模型权重。对于参数量极大的模型（如175B），单GPU可能放不下完整权重，必须用TP。

3. **硬件拓扑**: TP通常用于节点内（NVLink高带宽），SP的环形通信对延迟更敏感。如果节点内GPU数量有限（如8卡）且需要更大并行度，SP可以跨节点扩展（因为P2P通信模式对带宽要求相对均匀）。

实践中最佳方案往往是**组合使用**: 节点内用TP(切模型)，跨节点用SP(切序列) + PP(切层)。
</details>