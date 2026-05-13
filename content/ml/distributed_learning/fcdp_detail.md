### FCDP: 全缓存数据并行 (Fully Cached Data Parallel)

```yaml
id: fcdp
title: "FCDP: Fully Cached Data Parallel for Training LLMs with Trillion-Scale Commodity Clusters"
authors: "Anonymous"
year: 2026
venue: arXiv
paper_url: https://arxiv.org/abs/2602.06499
category: parallelism
parent: zero
tags: [distributed-training, data-parallel, memory-optimization, PEFT, LoRA, communication-reduction]
motivation: "利用CPU主机内存作为参数缓存层，消除50%跨节点all-gather通信；对PEFT场景进一步消除99%+通信"
```

---

## 📝 一句话总结

FCDP利用主机(CPU)内存缓存前向传播中重建的完整参数，在反向传播时通过节点内all-gather替代跨节点all-gather，将跨节点通信减少50%（全量微调）或99.9%（PEFT/LoRA），同时保持与ZeRO-3相同的GPU显存占用。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | ZeRO-3每层需执行2次跨节点all-gather（前向+反向），在低带宽商用集群上成为瓶颈 |
| **核心思路** | 前向pass后将参数缓存到CPU内存，反向pass从CPU加载+节点内all-gather重建，避免跨节点通信 |
| **关键创新** | 三组件协同：FCDP-Sched(调度)、FCDP-Cache(自适应缓存)、FCDP-Comm(PEFT感知通信) |
| **主要结果** | 全量微调提升40%吞吐；PEFT场景在1Gbps网络下比ZeRO-3快100×、比ZeRO++快51× |
| **适用场景** | 商用集群（低跨节点带宽）、大模型训练、PEFT/LoRA微调 |

### 与相关方法对比

| 方法 | 反向pass通信 | GPU显存开销 | PEFT优化 |
|------|-------------|------------|----------|
| ZeRO-3 | 跨节点all-gather | 最小(仅分片) | ❌ |
| ZeRO++ | 节点内all-gather | +W额外缓存 | ❌ |
| **FCDP** | 节点内all-gather | 最小(缓存在CPU) | ✅ 99%+减少 |

---

## 🔬 深入细节

### 1. 问题背景：ZeRO-3的通信瓶颈

ZeRO-3将模型参数、梯度和优化器状态均匀分片到所有GPU上，每层计算前需通过**跨节点all-gather**重建完整参数。每个训练步中，每层执行**两次**跨节点all-gather（前向一次、反向一次）。

在商用集群中，节点内带宽（NVLink: 600 GB/s）远高于节点间带宽（InfiniBand 100Gbps ≈ 12.5 GB/s），这种带宽不对称使得跨节点all-gather成为主要瓶颈。

![FCDP动机：带宽不对称](https://ar5iv.labs.arxiv.org/html/2602.06499/assets/x2.png)

### 2. FCDP整体架构

![FCDP三组件架构](https://ar5iv.labs.arxiv.org/html/2602.06499/assets/x3.png)

FCDP由三个组件构成：

- **FCDP-Sched**（参数调度）：协调CPU↔GPU传输与集合通信的时序
- **FCDP-Cache**（自适应缓存）：根据运行时显存压力动态选择GPU/CPU缓存
- **FCDP-Comm**（PEFT感知通信）：区分冻结/可训练参数，消除冻结参数的重复通信

### 3. FCDP-Sched：参数调度机制

![逐层执行调度对比](https://ar5iv.labs.arxiv.org/html/2602.06499/assets/x4.png)

**核心流程：**

**前向传播：**
1. 执行跨节点all-gather重建完整参数
2. 计算前向激活
3. **异步**将参数拷贝到CPU主机内存（"Cache on CPU"）

**反向传播：**
1. 从CPU加载本节点的 \(\frac{1}{N}\) 参数分片（N=节点内GPU数）
2. 执行**节点内all-gather**（通过NVLink/PCIe ring）重建完整参数
3. 计算梯度
4. 标记CPU缓存为"dirty"（因优化器更新会修改参数）

**效果：** 消除所有反向pass的跨节点all-gather → **跨节点通信减少50%**

### 4. FCDP-Cache：自适应内存管理

FCDP-Cache在前向计算完成后，根据GPU显存利用率阈值 \(\tau\) 决定缓存位置：

$$
\text{Cache Location} = \begin{cases} \text{GPU（直接保留）} & \text{if utilization} < \tau \\ \text{CPU主机内存} & \text{if utilization} \geq \tau \end{cases}
$$

**关键优化：**
- **NUMA感知**：从GPU本地NUMA节点分配pinned buffer，避免QPI/UPI跨socket开销
- **池化管理**：预分配pinned buffer，训练全程不释放，消除per-allocation延迟
- **就地更新**：参数更新直接覆盖已有buffer，无需重新分配

### 5. FCDP-Comm：PEFT感知通信优化

对于LoRA等PEFT场景（99%+参数冻结），FCDP-Comm的核心洞察是：

> **冻结参数初始化后永不改变，只需gather一次并永久缓存**

```
┌─────────────────────────────────────────────────────┐
│  PEFT-Aware Training Loop (Algorithm 1)             │
├─────────────────────────────────────────────────────┤
│  Initialize:                                        │
│    for all p ∈ W_f ∪ W_t:                          │
│      dirty(p) ← true                               │
│                                                     │
│  Forward (layer l = 1 to L):                       │
│    for all p in layer l:                           │
│      if dirty(p):           # 仅可训练参数(iter>1) │
│        p ← AllGather_inter(p^inter)  # 跨节点     │
│        H[p] ← p; dirty(p) ← false   # 刷新缓存   │
│      else:                  # 冻结参数(99%+)       │
│        p^intra ← H[p]      # CPU→GPU (PCIe)       │
│        p ← AllGather_intra(p^intra)  # 节点内     │
│    ComputeForward(l)                               │
│                                                     │
│  Backward (layer l = L to 1):                      │
│    for all p in layer l:                           │
│      p^intra ← H[p]        # 全部从CPU加载        │
│      p ← AllGather_intra(p^intra)    # 节点内     │
│    ComputeBackward(l)                              │
│  ReduceScatter_inter(∇W_t)  # 仅同步可训练梯度    │
│                                                     │
│  Update:                                            │
│    OptimizerStep(W_t)                              │
│    for all p ∈ W_t:                                │
│      dirty(p) ← true       # 仅标记可训练参数     │
└─────────────────────────────────────────────────────┘
```

**通信量分析（GPT-30B, LoRA r=8）：**

| 系统 | 前向通信(GB) | 反向通信(GB) | 总计(GB) | 减少比例 |
|------|-------------|-------------|---------|---------|
| ZeRO-3 | 110.25 | 103.48 | 213.73 | — |
| ZeRO++ | 108.18 | 0.1 | 108.28 | 49.3% |
| FCDP-Sched | 108.18 | 0.1 | 108.28 | 49.3% |
| **FCDP-Comm** | **0.06** | **0.1** | **0.16** | **99.9%** |

### 6. 实验结果

**实验环境：** 4节点×8 NVIDIA A40 (48GB)，InfiniBand 100Gbps，512GB主机内存/节点

![强扩展性能](https://ar5iv.labs.arxiv.org/html/2602.06499/assets/x5.png)

**全量微调关键结果：**
- FCDP比ZeRO-3吞吐提升最高**40.2%**
- FCDP与ZeRO-3支持相同最大batch size（GPU显存占用相同）
- ZeRO++在大模型(30B)上OOM，FCDP正常运行
- FCDP比ZeRO++吞吐最高提升**2×**（因后者显存受限导致batch更小）

![PEFT网络带宽敏感性](https://ar5iv.labs.arxiv.org/html/2602.06499/assets/x11.png)

**PEFT/LoRA关键结果：**
- FCDP-Comm比ZeRO-3吞吐提升最高**6.2×**
- 启用GPU缓存(FCDP-Cache)后提升最高**6.8×**
- 在1Gbps以太网下：FCDP保持86.3%峰值吞吐，而ZeRO-3降至1.6% → **FCDP快100×**
- FCDP对网络带宽**几乎不敏感**（因99%参数无需跨节点通信）

### 7. 设计权衡与局限

| 权衡点 | 说明 |
|--------|------|
| CPU内存需求 | 需要约2W字节主机内存（10B模型≈20GB FP16），商用服务器通常有512GB+ |
| PCIe带宽 | 依赖PCIe Gen4 x16带宽，对PCIe拓扑敏感 |
| 首次迭代 | 第一次迭代仍需全量跨节点all-gather（缓存尚未建立） |
| 全量微调 | 所有参数每次更新后dirty，仅减少50%通信（非99%） |
| 阈值τ调优 | FCDP-Cache的GPU缓存阈值需用户配置 |

---

## 🧪 练习题

### 概念理解

1. **为什么FCDP能在不增加GPU显存的情况下减少通信？** ZeRO++也能减少反向通信，但它的代价是什么？

2. **解释dirty标记机制的作用。** 为什么不在每次optimizer step后立即刷新CPU缓存？

3. **FCDP-Comm对PEFT的通信减少为什么能达到99.9%而非50%？** 关键区别在哪里？

### 计算题

4. **通信量计算：** 假设模型有30B参数(FP16)，LoRA可训练参数占0.1%，4节点32GPU。计算：
   - ZeRO-3每迭代跨节点all-gather总通信量
   - FCDP-Comm每迭代跨节点通信量（第2次迭代起）

5. **带宽分析：** 节点内8 GPU通过NVLink连接(总带宽600GB/s)，节点间InfiniBand 100Gbps。对于一个1GB的参数层：
   - 跨节点all-gather耗时约为多少？
   - 节点内all-gather耗时约为多少？
   - FCDP的加速比是多少？

### 设计题

6. **如果将FCDP应用于pipeline parallelism + data parallelism的混合场景，需要做哪些调整？** 考虑每个pipeline stage只持有部分层的情况。

7. **设计一个自适应τ调度策略：** 不依赖用户手动设置，而是根据运行时OOM风险自动调整GPU缓存阈值。描述你的算法。

### 答案提示

<details>
<summary>题1提示</summary>

FCDP将参数缓存在CPU主机内存（512GB，远大于GPU的48GB），因此不占用GPU显存。ZeRO++将完整参数副本缓存在GPU显存中，额外占用W字节GPU内存，导致可用于activation的显存减少，进而限制最大batch size。

</details>

<details>
<summary>题3提示</summary>

FCDP-Sched仅消除反向pass的跨节点通信（50%减少），因为前向pass仍需跨节点all-gather来获取最新参数。但FCDP-Comm利用PEFT中99%+参数冻结不变的特性，这些参数只需第一次迭代gather一次，后续迭代前向和反向都从本地CPU缓存服务。只有<1%的可训练adapter参数需要每次迭代跨节点all-gather。

</details>

<details>
<summary>题4提示</summary>

- ZeRO-3: 每层前向+反向各一次all-gather，每次通信量≈参数量×2字节(FP16)。30B×2B = 60GB/次，2次 = 120GB。加上reduce-scatter约60GB。总计≈180-214GB。
- FCDP-Comm: 仅可训练参数(0.1%×30B = 30M参数)需跨节点all-gather: 30M×2B×2次 = 0.12GB。加reduce-scatter: 30M×2B = 0.06GB。总计≈0.16GB。

</details>