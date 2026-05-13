### Dynamic Context Parallelism (Dynamic CP)

```yaml
id: dynamic_cp
name: "Dynamic Context Parallelism (Dynamic CP)"
full_name: "动态上下文并行：面向变长序列的自适应负载均衡长序列训练方法"
year: "2025"
org: "NVIDIA"
paper_url: "https://arxiv.org/abs/2603.07685"
category: "distributed_training"
parent: "context_parallelism"
motivation: "标准上下文并行假设序列长度均匀，在 RL/RLHF 等变长序列场景下导致严重负载不均衡；Dynamic CP 通过贪心装箱动态分配 token，实现 CP rank 间的负载均衡"
```

#### 📝 一句话总结

Dynamic CP 针对标准 Context Parallelism 在变长序列场景（如 RL/RLHF）中因 padding 导致的严重负载不均衡问题，提出基于**贪心装箱算法**的动态 token 分配策略，支持**样本间与样本内拆分**，通过 all-to-all 通信重新分配 token 并修正注意力掩码，在 RL 工作负载上实现 **1.6× 吞吐量提升**。

#### 🎯 核心要点

- **问题根源**：标准 CP 将全局 batch 中的 token 按序列均匀切分到各 CP rank，当序列长度差异大时（如 RL 场景中 prompt 与 response 长度悬殊），短序列 rank 被大量 padding 填充，造成计算浪费和负载不均
- **贪心装箱分配**：将每条序列视为"物品"，各 CP rank 视为"箱子"，按序列长度降序排列后贪心分配到当前 token 数最少的 rank，使各 rank token 总量尽量均衡
- **两级拆分策略**：
  - **样本间拆分 (Inter-sample)**：整条序列分配到不同 rank，不切割单条序列
  - **样本内拆分 (Intra-sample)**：当单条序列过长时，将其切分为多个 chunk 分配到不同 rank，进一步均衡负载
- **All-to-All Token 重分配**：分配方案确定后，通过 all-to-all 集合通信将 token 从原始位置搬运到目标 rank
- **注意力掩码修正**：重分配后需重建正确的因果注意力掩码，确保跨 rank 的 token 仍能正确计算自注意力
- **KV 复制机制**：对于因果注意力，某些 rank 需要来自其他 rank 的 KV 对才能正确计算注意力，Dynamic CP 通过额外的 KV 复制/通信解决此问题
- **与 RL 训练的结合**：在 RLHF/GRPO 等场景中，同一 prompt 生成多个不同长度的 response，序列长度方差极大，Dynamic CP 的收益最为显著
- **性能**：在 RL 工作负载上相比标准 CP 实现 **1.6× 吞吐量提升**

#### 🔬 深入细节

##### 4.1 示意图

![Dynamic CP 负载均衡示意图](https://arxiv.org/html/2603.07685v1/extracted/6310429/figures/dynamic_cp.png)
*图：Dynamic CP 的工作流程。左侧展示变长序列在标准 CP 下的不均衡分配（短序列 rank 被 padding 填充），右侧展示 Dynamic CP 通过贪心装箱将 token 动态重新分配到各 CP rank，使负载趋于均衡。All-to-all 通信完成 token 的物理搬运，注意力掩码随之修正。*

##### 4.2 伪代码

```python
# Dynamic Context Parallelism 核心流程伪代码
# 输入：一个全局 batch 中的 S 条序列，CP 并行度为 C

def dynamic_cp_forward(sequences, cp_size):
    """
    Dynamic CP 前向传播流程
    Args:
        sequences: List[Tensor], 长度各异的输入序列
        cp_size: int, CP 并行度（CP rank 数量）
    """
    # ========== Phase 1: 贪心装箱分配 ==========
    # 按序列长度降序排列
    sorted_seqs = sorted(enumerate(sequences), key=lambda x: len(x[1]), reverse=True)
    
    # 每个 CP rank 的 token 计数器
    rank_token_counts = [0] * cp_size
    # 分配方案：rank -> [(seq_id, start, end), ...]
    assignment = [[] for _ in range(cp_size)]
    
    for seq_id, seq in sorted_seqs:
        seq_len = len(seq)
        
        if seq_len > max_chunk_size:
            # ---- 样本内拆分 (Intra-sample splitting) ----
            # 将长序列切分为多个 chunk
            chunks = split_into_chunks(seq, max_chunk_size)
            for chunk_start, chunk_end in chunks:
                target_rank = argmin(rank_token_counts)  # 分配到最空闲的 rank
                assignment[target_rank].append((seq_id, chunk_start, chunk_end))
                rank_token_counts[target_rank] += (chunk_end - chunk_start)
        else:
            # ---- 样本间拆分 (Inter-sample splitting) ----
            # 整条序列分配到最空闲的 rank
            target_rank = argmin(rank_token_counts)
            assignment[target_rank].append((seq_id, 0, seq_len))
            rank_token_counts[target_rank] += seq_len
    
    # ========== Phase 2: All-to-All Token 重分配 ==========
    # 根据 assignment 方案，通过 all-to-all 通信将 token 搬运到目标 rank
    local_tokens = all_to_all_redistribute(sequences, assignment, cp_group)
    
    # ========== Phase 3: 构建修正后的注意力掩码 ==========
    # 根据重分配后的 token 归属关系，构建正确的因果注意力掩码
    # 同一序列的 token 之间保持因果关系，不同序列的 token 之间互相屏蔽
    attention_mask = build_dynamic_attention_mask(local_tokens, assignment)
    
    # ========== Phase 4: 前向计算 ==========
    # 对于因果注意力，可能需要从其他 rank 获取 KV 对
    kv_cache = replicate_kv_if_needed(local_tokens, assignment, cp_group)
    
    # 执行 Transformer 前向（注意力 + FFN）
    output = transformer_forward(local_tokens, attention_mask, kv_cache)
    
    # ========== Phase 5: 反向 All-to-All 恢复原始布局 ==========
    # 将输出 token 通过反向 all-to-all 搬回原始 rank
    original_layout_output = all_to_all_reverse(output, assignment, cp_group)
    
    return original_layout_output


def greedy_bin_packing(seq_lengths, num_bins):
    """
    贪心装箱算法：将序列分配到 num_bins 个 rank
    目标：最小化各 rank 间的 token 数量差异
    
    时间复杂度: O(S log S + S log C)，S=序列数，C=rank数
    """
    # 按长度降序排列
    indexed_lengths = sorted(enumerate(seq_lengths), key=lambda x: -x[1])
    
    # 最小堆维护各 rank 的当前 token 总量
    import heapq
    heap = [(0, rank_id) for rank_id in range(num_bins)]  # (token_count, rank_id)
    heapq.heapify(heap)
    
    assignment = {}
    for seq_id, length in indexed_lengths:
        min_count, target_rank = heapq.heappop(heap)
        assignment[seq_id] = target_rank
        heapq.heappush(heap, (min_count + length, target_rank))
    
    return assignment
```

##### 4.3 方法细节

**背景：Context Parallelism (CP) 基础**

Context Parallelism 是 Megatron-Core 中用于训练长序列的并行策略。其核心思想是将输入序列沿序列维度切分到多个 GPU（CP rank）上，每个 rank 只持有序列的一部分 token。在注意力计算时，通过 **all-gather**（收集所有 rank 的 KV）和 **reduce-scatter**（聚合注意力输出）实现完整的自注意力计算。这使得单条序列的长度可以超过单 GPU 的显存限制。

标准 CP 假设所有序列长度相同（或接近），将 token 均匀切分。这在预训练阶段（固定序列长度）工作良好，但在以下场景中会出现严重问题：

| 场景 | 序列长度特征 | 问题 |
|------|------------|------|
| RL/RLHF 训练 | 同一 prompt 生成多个不同长度的 response | 最长 response 决定 padding 长度，短 response 浪费大量计算 |
| 变长指令微调 | 指令和回答长度差异大 | 短样本 rank 空闲等待长样本 rank |
| 多轮对话训练 | 对话轮次不同导致总长度差异大 | 同上 |

**Dynamic CP 的核心设计**

1. **贪心装箱算法**：这是一个经典的 NP-hard 问题（bin packing）的贪心近似。算法将序列按长度降序排列，依次将每条序列分配到当前 token 总量最少的 rank。使用最小堆维护各 rank 的 token 计数，时间复杂度为 \(O(S \log S + S \log C)\)，其中 \(S\) 为序列数，\(C\) 为 CP rank 数。

2. **样本内拆分的必要性**：当某条序列的长度远超平均值时，仅靠样本间分配无法均衡。此时需要将该长序列切分为多个 chunk，分配到不同 rank。切分点需要考虑注意力的因果性——被切分的 chunk 在计算注意力时仍需访问前序 chunk 的 KV 对。

3. **All-to-All 通信开销**：Dynamic CP 引入了额外的 all-to-all 通信（标准 CP 不需要）。但由于 all-to-all 的通信量与 token 数成正比，而节省的 padding 计算量通常远大于通信开销，因此净收益为正。

4. **注意力掩码的复杂性**：重分配后，同一 rank 上可能存在来自不同序列的 token。注意力掩码需要确保：(a) 不同序列的 token 之间不产生注意力；(b) 同一序列内被拆分到不同 rank 的 token 仍保持正确的因果关系。这通过构建 **document mask**（标记每个 token 所属的序列 ID）实现。

##### 4.4 公式

**标准 CP 的负载不均衡度量**

设一个 batch 中有 \(S\) 条序列，长度分别为 \(l_1, l_2, \ldots, l_S\)，CP 并行度为 \(C\)。标准 CP 将所有序列 padding 到最大长度 \(l_{\max}\)，则：

$$\text{计算浪费比} = 1 - \frac{\sum_{i=1}^{S} l_i}{S \cdot l_{\max}}$$

当序列长度方差大时，该比值趋近于 1，意味着大部分计算被浪费在 padding 上。

**Dynamic CP 的均衡目标**

Dynamic CP 的目标是最小化各 rank 间的最大 token 数：

$$\min \max_{c \in [C]} \sum_{i \in \mathcal{A}_c} l_i$$

其中 \(\mathcal{A}_c\) 是分配到 rank \(c\) 的序列集合。贪心装箱算法给出的近似解满足：

$$\max_{c} T_c \leq \frac{\sum l_i}{C} + l_{\max}$$

即最大 rank 的 token 数不超过平均值加上最长序列长度。

**通信开销分析**

Dynamic CP 的额外通信开销为一次 all-to-all，通信量为：

$$V_{\text{all-to-all}} = 2 \cdot \sum_{i=1}^{S} l_i \cdot h$$

其中 \(h\) 为隐藏维度大小，因子 2 来自前向和反向各一次。相比标准 CP 节省的计算量：

$$\Delta_{\text{compute}} \propto S \cdot l_{\max} \cdot h - \sum_{i=1}^{S} l_i \cdot h$$

当 \(l_{\max} \gg \bar{l}\)（平均长度）时，计算节省远大于通信开销。

#### 🧪 练习题

1. **概念题**：标准 Context Parallelism 在什么条件下性能最优？为什么 RL/RLHF 场景会打破这一条件？

2. **设计题**：假设一个 batch 中有 8 条序列，长度分别为 [1024, 512, 256, 256, 128, 128, 64, 64]，CP 并行度为 4。请手动执行贪心装箱算法，给出每个 rank 的序列分配方案和 token 总量。最大 rank 与最小 rank 的 token 数差异是多少？

3. **分析题**：Dynamic CP 引入了 all-to-all 通信开销。在什么情况下这个开销会抵消负载均衡带来的收益？请从序列长度分布的角度分析。

4. **进阶题**：样本内拆分（intra-sample splitting）在因果注意力下会引入额外的 KV 复制通信。请分析：如果一条长度为 L 的序列被切分到 k 个 rank 上，每个 rank 需要额外获取多少 KV 对？总的额外通信量是多少？

5. **实践题**：如果你要在 Megatron-Core 中实现 Dynamic CP，需要修改哪些模块？请列出至少 3 个关键修改点及其原因。