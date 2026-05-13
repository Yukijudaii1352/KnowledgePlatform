### LoongTrain — 上下文并行 (Context Parallelism)

```yaml
id: loogtrain
name: LoongTrain
full_name: 上下文并行 (Context Parallelism)
year: 2024
org: ByteDance
paper_url: https://arxiv.org/abs/2406.18485
category: tp
parent: ulysses
motivation: 2D-Attention机制Head-Context双重并行
```

#### 📝 一句话总结

LoongTrain 提出 2D-Attention 机制，将序列并行组织为 Head Parallelism × Context Parallelism 的二维网格，结合 Double-Ring-Attention 通信优化，突破了 Head Parallelism 受限于注意力头数的可扩展性瓶颈，同时解决了 Context Parallelism 的 P2P 通信效率低下问题，实现长序列 LLM 训练性能最高 2.88× 的提升。

#### 🎯 核心要点

- **2D-Attention 机制**：将 \(d_{sp}\) 个 GPU 组织为 \(d_{hp} \times d_{cp}\) 二维网格，HP 维度用 SeqAlltoAll 按注意力头分发，CP 维度用 Ring-Attention 按序列分块
- **KV Replication for GQA**：当 KV 头数 \(H_{kv} < d_{hp}\) 时，复制 KV 张量使 HP 维度可扩展至 \(H\)（总头数），解除 GQA 场景下 HP 的头数限制
- **Double-Ring-Attention**：将 CP 组内 GPU 划分为多个内环（inner ring），内环间形成外环（outer ring），充分利用所有跨节点 NIC 带宽，实现通信与计算的高效重叠
- **设备放置策略**：Head-First（HP 组优先同节点）和 Context-First（CP 组优先同节点）两种策略，根据配置选择最优通信拓扑
- **Hybrid ZeRO**：跨 DP × SP 维度应用 ZeRO 优化器状态分片，采用 AMSP 灵活分片策略平衡显存与通信
- **Selective Checkpoint++**：白名单机制保留注意力块激活值避免重计算，同时通过延迟释放 QKV 张量降低峰值显存

#### 🔬 深入细节

![2D-Attention 总体框架](https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x6.png)
*图：2D-Attention 将 GPU 组织为 HP × CP 二维网格。HP 维度通过 SeqAlltoAll 按头维度分发 QKV，CP 维度通过 Double-Ring-Attention 按序列维度分块计算。*

##### 动机与背景

长序列 LLM 训练（序列长度达 128K-1M tokens）面临两大挑战：

1. **Head Parallelism (HP) 可扩展性受限**：Ulysses (DeepSpeed-Ulysses) 通过 AlltoAll 将 QKV 按注意力头维度分发到不同 GPU，但并行度上限为注意力头数 \(H\)。对于 GQA 模型（如 LLaMA-2 70B 仅 8 个 KV 头），HP 并行度极其有限。

2. **Context Parallelism (CP) 通信效率低**：Ring-Attention 使用 P2P 通信在环形拓扑中传递 KV 块，但存在两个问题：(a) 节点内 P2P 仅使用 NVLink 的一个通道，带宽利用率低；(b) 跨节点 P2P 仅使用一对 NIC，无法利用多 NIC 带宽。实验显示在 64 GPU、128K 序列长度的 GQA 场景下，Ring-Attention 通信时间是计算时间的 1.8 倍。

##### 2D-Attention 核心算法

```python
# Algorithm 1: 2D-Attention (Forward)
# Input: Q, K, V with shape (H, S/d_sp, D/H) per GPU
# d_sp = d_hp × d_cp

# Step 1: SeqAlltoAll — 按头维度重分布
# 通信模式: AlltoAll within HP group
Q = SeqAlltoAll(Q, scatter_dim=head, gather_dim=seq)  
K = SeqAlltoAll(K, scatter_dim=head, gather_dim=seq)
V = SeqAlltoAll(V, scatter_dim=head, gather_dim=seq)
# After: shape (H/d_hp, S/d_cp, D/H) per GPU

# Step 2: Double-Ring-Attention within CP group
out = DoubleRingAttention(Q, K, V, d_cp, w=inner_ring_size)

# Step 3: SeqAlltoAll — 恢复原始分布
out = SeqAlltoAll(out, scatter_dim=seq, gather_dim=head)
# After: shape (H, S/d_sp, D/H) per GPU
```

![Double-Ring-Attention 示意图](https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x9.png)
*图：Double-Ring-Attention 示例。\(d_{cp}=8\)，内环大小为 4，外环大小为 2。内环使用节点内 NVLink P2P，外环使用跨节点多 NIC P2P。*

```python
# Algorithm 2: Double-Ring-Attention
# Input: Q, K, V, d_cp, w (inner ring size)
# Outer ring has d_cp/w steps, inner ring has w steps

for outer_step in range(d_cp // w):
    # Async P2P: send KV to next outer rank, recv from prev outer rank
    P2P.async_send(KV, next_outer_rank)
    KV_hat = P2P.async_recv(previous_outer_rank)
    
    for inner_step in range(w):
        # Async P2P within inner ring
        P2P.async_send(KV, next_inner_rank)
        KV_prime = P2P.async_recv(previous_inner_rank)
        
        # Compute attention block
        block_out, block_lse = FlashAttention(Q, K, V)
        out, lse = online_softmax_update(out, lse, block_out, block_lse)
        
        # Synchronize inner ring P2P
        P2P.synchronize(inner_ring)
        K, V = KV_prime  # Update for next inner step
    
    # Synchronize outer ring P2P
    P2P.synchronize(outer_ring)
    K, V = KV_hat  # Update for next outer step
```

##### 核心机制详解

**1. 2D-Attention 的计算-通信分析**

每个 micro-step 的前向计算时间为：

$$T_{comp}^{fwd} = \alpha \frac{S^2 D}{d_{cp} \cdot d_{sp}}$$

其中 \(\alpha\) 为计算常数。总共有 \(d_{cp}\) 个 micro-step（\(w\) 个内环步 × \(d_{cp}/w\) 个外环步），总计算时间为 \(d_{cp} \times T_{comp}^{fwd}\)。

KV 块大小为：

$$Size(kv) = \frac{\max(H_{kv}, d_{hp})}{H} \times \frac{4SD}{d_{sp}}$$

> 💡 关键：通过增大 \(d_{hp}\) 减小 \(d_{cp}\)，可以减少 Ring-Attention 的 P2P 步数，从而降低通信暴露时间。同时 SeqAlltoAll 是集合通信，带宽利用率远高于 P2P。

**2. Double-Ring-Attention 的通信优化**

传统 Ring-Attention 在跨节点场景下，每个 GPU 每步只与一个邻居通信，仅使用一对 NIC。Double-Ring 的核心思想：

- **内环**（intra-node）：同节点 GPU 组成环，利用 NVLink 高带宽（600 GB/s bidirectional per GPU on DGX-A100）
- **外环**（inter-node）：内环之间形成外环，外环通信时所有 GPU 同时发送，充分利用节点所有 NIC（400 GB/s per node on DGX-A100）
- **重叠**：外环 P2P 与内环计算重叠——当内环执行 \(w\) 步计算时，外环异步传输下一轮所需的 KV 块

> ⚠️ 注意：内环大小 \(w\) 的选择需要权衡——\(w\) 越大，外环通信越容易被隐藏，但内环步数增多可能导致内环 P2P 成为瓶颈。最优 \(w\) 通常等于节点内 GPU 数（如 8）。

**3. KV Replication 突破 GQA 限制**

在 GQA 中 \(H_{kv} \ll H\)（如 LLaMA-2 70B: \(H=64, H_{kv}=8\)）。若 \(d_{hp} > H_{kv}\)，SeqAlltoAll 后某些 GPU 将没有 KV 头可处理。解决方案：

$$\text{KV Replicated Shape} = (d_{hp}, S/d_{cp}, D/H) \quad \text{when } d_{hp} > H_{kv}$$

在 SeqAlltoAll 之前将 KV 张量复制 \(d_{hp}/H_{kv}\) 份，使每个 GPU 在 AlltoAll 后都能获得完整的 KV 数据。虽然增加了通信量，但换取了更大的 HP 并行度，减少了 CP 维度的 P2P 步数。

**4. 设备放置策略**

![设备放置对比](https://ar5iv.labs.arxiv.org/html/2406.18485/assets/x11.png)
*图：Context-First vs Head-First 设备放置。不同颜色代表不同注意力头。*

| 策略 | SeqAlltoAll 通信 | P2P 通信 | 适用场景 |
|------|-----------------|----------|---------|
| Head-First | 节点内 NVLink（高效） | 跨节点（需 Double-Ring） | \(d_{hp}\) 较大时 |
| Context-First | 跨节点（需数据重排） | 节点内 NVLink（高效） | \(d_{cp}\) 较大时 |

Context-First 放置需要在数据加载器中添加后处理函数，在每个 batch 开始时调整输入张量位置，避免运行时数据搬移。

**5. 系统级优化**

- **Hybrid ZeRO**：跨 \(d_{dp} \times d_{sp}\) 维度分片优化器状态和梯度，采用 AMSP 的 Full-Replica/Full-Sharding/Partial-Sharding 三种策略，Norm 和 Linear 模块可独立选择分片粒度
- **Selective Checkpoint++**：保留注意力块的输出激活值（避免 \(O(S^2)\) 的注意力重计算），仅对 FFN 等模块做 checkpoint。通过延迟释放策略，在反向传播时按需保留 QKV 张量，峰值显存仅需 \(2SD/d_{sp}\)（FP16）

##### 实验结果

在 32 GPU（4 节点 DGX-A100）上训练 LLaMA-7B 模型，序列长度 128K-1M：

| 配置 | GQA 128K TGS | GQA 1M MFU | 对比 DS-Ulysses |
|------|-------------|------------|----------------|
| DS-Ulysses (HP32) | 629.9 | 0.365 | baseline |
| Megatron-CP (CP32) | 706.2 | OOM | — |
| LoongTrain HP8/CP4 | **838.1** | **0.448** | **1.33×/1.23×** |

最优配置 HP8/CP4 在 GQA 128K 场景下达到 838.1 TGS（tokens/GPU/s），MFU 0.448，相比 DS-Ulysses 提升 1.33×。在 MHA 1M 场景下，LoongTrain 相比 DS-Ulysses 提升最高达 2.88×。

#### 🧪 练习题

```yaml
question: "LoongTrain 的 Double-Ring-Attention 相比传统 Ring-Attention 的核心优势是什么？"
options:
  - "减少了注意力计算的 FLOPs"
  - "通过内外双环结构充分利用多 NIC 带宽，实现跨节点通信与计算重叠"
  - "消除了 P2P 通信，完全使用 AllReduce"
  - "将注意力计算从 O(S²) 降低到 O(S log S)"
answer: 1
explain: "Double-Ring 将 GPU 分为内环（节点内 NVLink）和外环（跨节点多 NIC），外环通信与内环计算重叠，充分利用所有网络资源，而非像传统 Ring 每步仅用一对 NIC。"
```