### PipeDream: Generalized Pipeline Parallelism for DNN Training

```yaml
id: pipedream-2019
tags: [pipeline-parallelism, distributed-training, model-parallelism, scheduling]
authors: [Deepak Narayanan, Aaron Harlap, Amar Phanishayee, Vivek Seshadri, Nikhil R. Devanur, Gregory R. Ganger, Phillip B. Gibbons, Michael A. Kozuch]
venue: SOSP 2019
year: 2019
url: https://arxiv.org/abs/1806.03377
```

---

## 📝 一句话总结

PipeDream提出流水线并行训练框架，通过1F1B调度、Weight Stashing和动态规划分区算法，将流水线并行、模型并行和数据并行有机结合，在通信密集型模型上实现相比数据并行BSP高达5倍的训练加速。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 数据并行训练在通信密集型DNN（如VGG16）上因参数同步开销严重限制扩展性（8机仅2.35x加速） |
| **动机** | 流水线并行仅需传输层间激活值（远小于全部参数），且可重叠计算与通信 |
| **方法** | 1F1B调度 + Weight Stashing + DP最优分区算法 |
| **核心创新** | ①1F1B交替调度消除流水线气泡；②Weight Stashing保证前后向使用一致权重版本；③DP算法自动决定分区+复制因子 |
| **结果** | VGG16: 5.12x over BSP (V100集群)；通信减少90-95%；收敛到相同精度 |
| **局限** | 流水线深度增加staleness；内存开销随活跃minibatch数线性增长；对计算密集型模型（如Inception-v3）优势有限 |

---

## 🔬 深入细节

### 1. 问题背景与动机

数据并行（Data Parallelism, DP）是DNN分布式训练的主流方式，但存在根本瓶颈：

- **通信量大**：BSP同步需要每轮传输所有模型参数（VGG16为550MB）
- **通信不可重叠**：BSP要求梯度聚合完成后才能开始下一轮
- **扩展性差**：VGG16在8机25Gbps以太网上通信开销达72%

**关键洞察**：流水线并行中，相邻stage之间仅需传输一层的激活值输出（通常远小于模型参数总量）。例如VGG16中，最大层输出仅为模型参数的~10%。

```
通信量对比 (VGG16, minibatch=32):
┌─────────────────────────────────────────────┐
│ Data Parallel (BSP): 传输全部参数 ~550 MB    │
│ Pipeline Parallel:   传输层间激活 ~50 MB     │
│ 通信减少: >90%                               │
└─────────────────────────────────────────────┘
```

### 2. 系统架构总览

PipeDream的三大核心组件：

```
┌──────────────────────────────────────────────────────┐
│                    PipeDream System                    │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────┐   ┌─────────────┐   ┌───────────┐  │
│  │  Profiler   │──▶│ Partitioner │──▶│  Runtime   │  │
│  │ (1000 iter) │   │   (DP Algo) │   │  (1F1B)   │  │
│  └─────────────┘   └─────────────┘   └───────────┘  │
│                                                       │
│  输入: DNN模型 + M台机器                              │
│  输出: 最优分区方案 + 各stage复制因子                  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### 3. 1F1B (One Forward One Backward) 调度

**核心思想**：在流水线稳态阶段，每个stage交替执行一次前向传播和一次反向传播。

```
传统模型并行 (1个活跃minibatch, 4台机器):
时间 ──────────────────────────────────────▶
M1: [F1]                    [B1]
M2:      [F1]          [B1]
M3:           [F1] [B1]
M4:                [F1][B1]
                              ← 大量空闲时间

PipeDream 1F1B调度 (多个活跃minibatch):
时间 ──────────────────────────────────────▶
     |startup|        steady state         |
M1: [F1][F2][F3][F4][B1][F5][B2][F6][B3][F7]...
M2:      [F1][F2][F3][B1][F4][B2][F5][B3][F6]...
M3:           [F1][F2][B1][F3][B2][F4][B3][F5]...
M4:                [F1][B1][F2][B2][F3][B3][F4]...
```

**两个阶段**：
- **Startup阶段**：输入stage注入足够多的minibatch填满流水线（数量 = pipeline深度）
- **Steady State阶段**：每个stage严格交替执行1F和1B，保持流水线满载

**优势**：
- 消除流水线气泡（bubble），GPU利用率接近100%
- 限制活跃minibatch数量 = stage数，控制内存开销
- 确保每个stage的工作量均衡

### 4. Weight Stashing（权重暂存）

**问题**：流水线中同一minibatch的前向和反向传播跨越多个时间步，期间权重已被其他minibatch的梯度更新。若前后向使用不同权重版本，梯度计算无效。

**解决方案**：为每个活跃minibatch保存其前向传播时使用的权重版本，反向传播时使用相同版本计算梯度。

```
Weight Stashing 示意 (n=4 stages):

Minibatch 5 进入流水线时:
  Stage 1: 使用 w^(1)  ← 被minibatch 1更新后的权重
  Stage 2: 使用 w^(2)  ← 被minibatch 2更新后的权重  
  Stage 3: 使用 w^(3)  ← 被minibatch 3更新后的权重
  Stage 4: 使用 w^(4)  ← 被minibatch 4更新后的权重

每个stage存储当前所有活跃minibatch对应的权重版本
反向传播时取出对应版本计算梯度
```

**Staleness分析**（n个stage的直线流水线）：

```python
# 标准SGD更新:
# w^(t+1) = w^(t) - ν·∇f(w_1^(t), w_2^(t), ..., w_n^(t))

# Weight Stashing更新 (各stage staleness不同):
# w^(t+1) = w^(t) - ν·∇f(w_1^(t-n+1), w_2^(t-n+2), ..., w_n^(t))
# Stage k 的staleness = n - k

# Vertical Sync更新 (统一staleness):
# w^(t+1) = w^(t) - ν·∇f(w_1^(t-n+1), w_2^(t-n+1), ..., w_n^(t-n+1))
# 等价于 n 台机器的 BSP 数据并行 (staleness = n-1)
```

**关键发现**：
- Weight Stashing对收敛至关重要（无它则梯度不是任何有效loss的梯度）
- Vertical Sync的额外收益可忽略（实验验证）
- PipeDream默认仅使用Weight Stashing（不加Vertical Sync以避免额外同步开销）

### 5. 动态规划分区算法

**目标**：给定N层DNN和M台机器，找到最优分区使流水线最慢stage时间最小化。

**Profiling输入**（每层l）：
- `T_l`: 前向+反向计算时间
- `a_l`: 激活值输出大小
- `w_l`: 参数大小

**DP递推公式**：

```
定义:
  A(j, m) = 层1到j使用m台机器的最优流水线中最慢stage时间
  T(i→j, m) = 层i到j复制m份时单stage耗时
  
单stage耗时:
  T(i→j, m) = (1/m) · max(Σ T_l, Σ W_l^m)
                            l=i..j  l=i..j
  其中 W_l^m = 4(m-1)|w_l|/m / bandwidth (参数同步通信时间)

递推关系:
  Case 1 (单stage): A(j, m) = T(1→j, m)
  
  Case 2 (多stage): 
  A(j, m) = min_{1≤i<j} min_{1≤m'<m} max{
      A(i, m-m'),        // 前面子流水线的最慢stage
      2·C_i,             // stage间通信(激活值+梯度)
      T(i+1→j, m')      // 最后一个stage
  }

复杂度: O(N·M) 子问题，每个O(N·M)枚举 → O(N²·M²)
```

**算法同时决定**：
1. 层到stage的映射
2. 每个stage的数据并行复制因子
3. 流水线中活跃minibatch数量（= 最长路径上的stage数）

### 6. 混合并行策略

PipeDream的核心优势在于自动组合三种并行方式：

```
示例: VGG16, 8台机器, Cluster-A
最优配置: "7-1" (7层为stage1复制1份, 剩余层为stage2复制1份)
  → 实际是纯流水线并行

示例: VGG16, 16台机器, Cluster-A  
最优配置: "9-5-1-1" 
  → Stage 1: 前9层, 复制9份(数据并行)
  → Stage 2: 中间5层, 复制5份(数据并行)
  → Stage 3: 后续层, 1份
  → Stage 4: 最后层, 1份

示例: Inception-v3, 8台机器, Cluster-A
最优配置: "8" (纯数据并行)
  → 计算密集型模型，通信开销仅5%，DP已近最优
```

### 7. 实验结果

| 模型 | 集群 | 机器数 | BSP加速 | PipeDream加速 | vs BSP | 通信减少 |
|------|------|--------|---------|---------------|--------|----------|
| VGG16 | A(25Gbps) | 4 | 1.47x | 3.14x | 2.13x | 90% |
| VGG16 | A(25Gbps) | 8 | 2.35x | 7.04x | 2.99x | 95% |
| VGG16 | A(25Gbps) | 16 | 3.28x | 9.86x | 3.00x | 91% |
| VGG16 | B(10Gbps,V100) | 8 | 1.36x | 6.98x | **5.12x** | 95% |
| Inception-v3 | A | 8 | 7.66x | 7.66x | 1.00x | 0% |
| Inception-v3 | B | 8 | 4.74x | 6.88x | 1.45x | 47% |
| S2VT | A | 4 | 1.10x | 3.34x | 3.01x | 95% |

**关键观察**：
- 通信密集型模型（VGG16, S2VT）获益最大
- 网络越慢（Cluster-B），PipeDream优势越明显
- 算法能正确识别何时纯数据并行已最优（Inception-v3 on Cluster-A）
- 所有配置均收敛到与BSP相同的目标精度

### 8. 内存优化

活跃minibatch数量为d（流水线深度），每个stage需存储：
- d份权重版本（Weight Stashing）
- d份中间激活值（用于反向传播）

**优化策略**：
- 仅存储stage边界的激活值，内部层可重计算
- 权重版本间差异可用delta压缩
- d通常较小（4-16），内存开销可控

---

## 🧪 练习题

### Q1: 概念理解
**问题**：在一个4-stage流水线中使用Weight Stashing（不使用Vertical Sync），minibatch 8在stage 2进行前向传播时，使用的权重版本是由哪个minibatch更新产生的？

<details><summary>答案</summary>

在4-stage流水线的稳态中，stage k使用的权重延迟为 (n-k) 步，其中n=4。

对于stage 2 (k=2)，staleness = 4-2 = 2。

当minibatch 8到达stage 2时，stage 2已经完成了minibatch 6的反向传播（因为stage 2比stage 1少延迟1步，但比stage 4多延迟2步）。

具体地，minibatch 8在stage 2使用的是被minibatch 6更新后的权重 w_2^(6)。

关键公式：stage k处理minibatch m时使用 w_k^(m-(n-k)) = w_2^(8-2) = w_2^(6)
</details>

### Q2: 算法分析
**问题**：为什么PipeDream的DP分区算法的目标是最小化最慢stage的时间，而不是最小化所有stage时间之和？

<details><summary>答案</summary>

因为流水线的吞吐量由最慢的stage（瓶颈）决定。

在稳态运行时，流水线每隔一个"最慢stage时间"就输出一个完成的minibatch。即使其他stage更快，它们也必须等待最慢stage，产生空闲时间。

这类似于工厂流水线：整体产出速率 = 最慢工位的速率。

因此，最小化 max(各stage时间) 等价于最大化流水线吞吐量，这是经典的 makespan minimization 问题。
</details>

### Q3: 设计权衡
**问题**：PipeDream选择不默认启用Vertical Sync，请分析其权衡考虑。Weight Stashing的staleness模式（各stage不同延迟）与Vertical Sync的统一延迟相比，为何实际效果差异不大？

<details><summary>答案</summary>

**Vertical Sync的代价**：
- 需要在minibatch进入流水线时，将输入stage的当前权重版本号传播给所有下游stage
- 每个stage需要维护额外的权重版本索引
- 可能需要使用非最新权重（增加staleness）

**为何差异不大**：
1. Weight Stashing已保证每个stage内部前后向一致性，这是最关键的
2. 跨stage的版本不一致仅影响梯度的"全局一致性"，但由于SGD本身的噪声容忍性，这种轻微不一致被自然吸收
3. 实验中n通常较小（4-16），各stage间staleness差异仅为0到n-1，相对于总训练步数可忽略
4. Vertical Sync统一使用最旧版本(t-n+1)，反而增加了所有stage的平均staleness

因此PipeDream选择更简单高效的Weight Stashing作为默认方案。
</details>

### Q4: 扩展思考
**问题**：如果将PipeDream应用于Transformer模型（如GPT），相比CNN模型会面临哪些新挑战？

<details><summary>答案</summary>

1. **层间激活值巨大**：Transformer的隐藏维度大（如4096），序列长度长（如2048），层间激活值 = batch × seq_len × hidden_dim，可能比CNN层输出大得多，削弱通信优势

2. **层结构高度同质**：Transformer的每层计算量几乎相同，使得分区算法的最优解趋向于均匀切分，减少了算法的优化空间

3. **内存压力更大**：大模型（数十亿参数）的Weight Stashing需要存储多份完整权重，内存可能不足。这催生了后续工作PipeDream-2BW（仅存2份权重）和PipeDream-Flush（定期flush流水线）

4. **序列依赖**：自回归生成时前后token有依赖，流水线调度需要考虑token级别的并行

5. **模型规模**：现代LLM单层可能已超单GPU内存，需要结合张量并行（Tensor Parallelism），形成3D并行策略

这些挑战推动了Megatron-LM、DeepSpeed等后续系统的发展。
</details>