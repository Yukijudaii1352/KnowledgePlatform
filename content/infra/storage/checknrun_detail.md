### Check-N-Run

```yaml
id: checknrun
name: "Check-N-Run"
full_name: "Check-N-Run: 大规模推荐模型高性能检查点系统"
year: "2022"
org: "Meta (Facebook)"
paper_url: "https://www.usenix.org/conference/nsdi22/presentation/eisenman"
category: "infra/storage"
parent: "—"
motivation: "利用差异检查点与动态量化，将TB级推荐模型的检查点写入带宽降低6-17倍、存储容量降低2.5-8倍，精度损失<0.01%"
```

#### 📝 一句话总结

Check-N-Run 利用嵌入表的稀疏更新特性，结合差异检查点（仅存储修改过的嵌入向量）和自适应非对称量化（FP32→2-8bit），将 Facebook 生产环境中 TB 级推荐模型的检查点写入带宽降低 6-17×、存储容量降低 2.5-8×，且精度损失低于 0.01%。

#### 🎯 核心要点

- **问题背景**：Facebook 推荐模型 embedding table 占模型 >99%，单模型达 TB 级，标准压缩（Zstandard）仅 ~7% 压缩率
- **核心洞察**：30 分钟训练间隔内仅 ~26% 嵌入向量被修改；即使训练 110 亿样本后也仅 52% 被访问过
- **差异检查点**：三种策略——One-shot、Consecutive incremental、Intermittent differential（默认），仅存储修改过的向量
- **量化压缩**：对称/非对称/K-means/自适应非对称四种方案，最终采用自适应非对称量化（≤4bit）+ 朴素非对称（8bit）
- **动态 bit-width 选择**：根据预期故障恢复次数自动选择量化位宽（1次→2bit，≤3次→3bit，≤20次→4bit，>20次→8bit）
- **解耦架构**：GPU→CPU 快照仅需 ~7s（<0.4% 训练开销），量化+存储在 CPU 后台流水线执行
- **修改追踪**：per-GPU bit-vector 在前向传播中与 AlltoAll 通信重叠更新，<1% 开销，<0.05% 内存
- **总体效果**：写入带宽降低 6-17×，存储容量降低 2.5-8×，精度损失 <0.01%

#### 🔬 深入细节

**系统架构总览：**

```
┌─────────────────────────────────────────────────────────┐
│                   Check-N-Run 架构                       │
│                                                          │
│  ┌──────────────┐    Snapshot     ┌──────────────────┐  │
│  │  GPU Training │───(~7s stall)──▶│  CPU Background   │  │
│  │  (continues)  │                │  Processing       │  │
│  └──────────────┘                │                    │  │
│                                   │  ┌──────────────┐ │  │
│  ┌──────────────┐                │  │ Diff Engine   │ │  │
│  │  Bit-Vector   │──tracking───▶ │  │ (bit-vector   │ │  │
│  │  Tracker      │               │  │  comparison)  │ │  │
│  └──────────────┘                │  └──────┬───────┘ │  │
│                                   │         ▼         │  │
│  ┌──────────────┐                │  ┌──────────────┐ │  │
│  │  Controller   │──sync batch──▶│  │ Quantizer    │ │  │
│  │  (reader-     │   count       │  │ (adaptive    │ │  │
│  │   trainer)    │               │  │  asymmetric) │ │  │
│  └──────────────┘                │  └──────┬───────┘ │  │
│                                   │         ▼         │  │
│                                   │  ┌──────────────┐ │  │
│                                   │  │ Pipelined    │ │  │
│                                   │  │ Storage Write│ │  │
│                                   │  └──────────────┘ │  │
│                                   └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```
*图：Check-N-Run 系统架构。训练仅在 GPU→CPU 快照时短暂停顿（~7s），差异计算、量化和存储写入均在 CPU 后台流水线执行。*

**差异检查点伪代码：**

```python
# Check-N-Run 差异检查点 + 量化 核心流程

# === 1. 修改追踪（每个训练 iteration，与 AlltoAll 重叠） ===
def track_modifications(embedding_lookup_indices, bit_vector):
    """在前向传播中标记被访问/修改的嵌入向量"""
    for idx in embedding_lookup_indices:
        bit_vector[idx] = 1  # O(1) per access, overlapped with AlltoAll comm

# === 2. Intermittent Differential 策略（默认） ===
def should_take_full_baseline(interval_i, cumulative_sizes, incremental_size):
    """判断是否需要重置基线：当累积差异 ≥ 增量检查点总和时"""
    full_cost = 1 + sum(cumulative_sizes[:interval_i])  # 全量 + 历史增量
    incremental_cost = (interval_i + 1) * incremental_size  # 继续增量的成本
    return full_cost <= incremental_cost

# === 3. 检查点创建主流程 ===
def create_checkpoint(model, bit_vector, baseline, interval_i):
    # Step 1: GPU → CPU snapshot (training stalls ~7s)
    snapshot = copy_gpu_to_pinned_cpu(model.state_dict())
    # Training resumes immediately after snapshot

    # Step 2: Background - compute differential
    if should_take_full_baseline(interval_i, ...):
        checkpoint_data = snapshot  # Full baseline
        bit_vector.reset()
    else:
        modified_indices = bit_vector.get_set_bits()
        checkpoint_data = {idx: snapshot[idx] for idx in modified_indices}

    # Step 3: Background - quantize (chunk-by-chunk, pipelined with storage write)
    bit_width = select_bit_width(expected_failures)  # 动态选择: 2/3/4/8 bit
    for chunk in split_into_chunks(checkpoint_data):
        if bit_width <= 4:
            quantized = adaptive_asymmetric_quantize(chunk, bit_width)
        else:
            quantized = asymmetric_quantize(chunk, bit_width)
        write_to_remote_storage(quantized)  # Pipelined with next chunk quantization

# === 4. 自适应非对称量化 ===
def adaptive_asymmetric_quantize(vector, n_bits, num_bins=25, ratio=0.6):
    """贪心搜索最优 xmin, xmax 以最小化 L2 误差"""
    xmin, xmax = vector.min(), vector.max()
    original_range = xmax - xmin
    step_size = original_range / num_bins
    best_error, best_xmin, best_xmax = float('inf'), xmin, xmax

    while (xmax - xmin) > ratio * original_range:
        # 尝试两个方向的收缩
        error_shrink_min = l2_error(quantize(vector, xmin + step_size, xmax, n_bits), vector)
        error_shrink_max = l2_error(quantize(vector, xmin, xmax - step_size, n_bits), vector)

        if error_shrink_min < error_shrink_max:
            xmin += step_size
            if error_shrink_min < best_error:
                best_error, best_xmin, best_xmax = error_shrink_min, xmin, xmax
        else:
            xmax -= step_size
            if error_shrink_max < best_error:
                best_error, best_xmin, best_xmax = error_shrink_max, xmin, xmax

    return uniform_quantize(vector, best_xmin, best_xmax, n_bits)
```

**方法深入解读：**

**1. 动机与问题分析——为什么传统压缩对推荐模型无效？**

Facebook 的推荐模型（如 DLRM）核心由巨大的嵌入表（embedding table）构成，单个模型可达数 TB。这些嵌入表将稀疏的类别特征（如用户 ID、商品 ID）映射为稠密向量。在分布式训练中，嵌入表按行分片到不同 GPU（模型并行），而 MLP 层则数据并行。每 30 分钟需要做一次检查点以防故障，但 TB 级数据的写入对存储带宽和容量造成巨大压力。

传统通用压缩（如 Zstandard）对嵌入表几乎无效——因为嵌入向量是经过训练的浮点数，本质上是高熵数据，不存在通用压缩可利用的重复模式。实测仅获得 ~7% 的压缩率。然而，Check-N-Run 发现了一个关键特性：**嵌入表的更新是极度稀疏的**。在 30 分钟的训练间隔内，仅约 26% 的嵌入向量被修改（因为大部分用户/商品在短时间内不会出现在训练数据中）。即使训练了 110 亿个样本，也仅有 52% 的嵌入向量被访问过。这一洞察为差异检查点提供了理论基础。

> 💡 **关键洞察**：嵌入表的稀疏访问模式意味着大部分检查点数据与上一次完全相同——只需存储"变化的部分"即可大幅减少数据量。

**2. 差异检查点——三种策略的权衡与 Intermittent Differential 的设计智慧**

Check-N-Run 提出三种差异检查点策略，核心权衡是**写入带宽 vs 存储容量 vs 恢复复杂度**：

- **One-shot Differential**：保存一个完整基线 + 自基线以来所有修改的向量。优点是恢复简单（基线 + 最新差异），但差异会随时间单调增长，最终趋近全量。
- **Consecutive Incremental**：每次仅保存上一个间隔内修改的向量。写入带宽最优且稳定（每次 ~26%），但恢复需要读取所有历史检查点，且存储容量线性增长（11 个间隔后达 4× 模型大小）。适合在线学习（online training）场景，因为在线学习不需要回溯到很早的检查点。
- **Intermittent Differential（默认）**：结合前两者优点。使用历史预测器动态决定何时重置基线。判断条件为：当创建新全量基线的总成本 \(F_c = 1 + S_1 + ... + S_i\) 不超过继续增量的成本 \(I_c = (i+1) \cdot S_i\) 时，触发全量基线重置。实验中，该策略在第 8 个间隔自动触发重置，将存储容量控制在合理范围内。

修改追踪的实现非常精巧：每个 GPU 维护一个 bit-vector，在前向传播的嵌入查找阶段标记被访问的索引。由于嵌入查找与 AlltoAll 通信天然重叠（GPU 在等待远程嵌入返回时有空闲周期），追踪操作几乎不产生额外开销（<1% 训练吞吐量下降，<0.05% 内存开销）。

> ⚠️ **注意**：差异检查点本身不引入任何精度损失——所有被修改的数据都被完整保留。精度损失仅来自量化步骤。

**3. 自适应非对称量化——为什么比朴素方法好，又如何避免 K-means 的计算爆炸？**

量化是 Check-N-Run 的第二个压缩维度。核心思想是将 FP32 嵌入向量量化为低位整数。朴素的对称量化（以 0 为中心）效果不佳，因为嵌入向量的值分布通常不关于 0 对称。非对称量化（使用实际的 \(x_{min}\) 和 \(x_{max}\)）更好，但仍有问题：如果向量中存在少数极端值（outlier），它们会拉大量化范围，导致大部分正常值的量化精度下降。

K-means 非均匀量化理论上最优（为每个聚类中心分配一个量化值），但对 TB 级检查点需要 48 小时——完全不可行。Check-N-Run 的自适应非对称量化通过贪心搜索找到最优的 \(x_{min}\) 和 \(x_{max}\)：将原始范围分成 `num_bins` 个步长，每步尝试从两端收缩范围，选择 ℓ2 误差更小的方向。`ratio` 参数控制搜索范围（如 0.6 表示只搜索原始范围的 60%）。实验表明，25 bins + ratio=0.6 即可达到接近 K-means 的精度，而延迟仅为 K-means 的千分之一。

量化参数的自动选择也很巧妙：Check-N-Run 仅对检查点的 0.001% 进行采样量化，即可准确估计最优的 `num_bins` 和 `ratio` 参数，避免了全量搜索的开销。

$$
F_Q(x, x_{min}, x_{max}, n) = \text{round}\left(\frac{x - x_{min}}{x_{max} - x_{min}} \cdot (2^n - 1)\right) \cdot \frac{x_{max} - x_{min}}{2^n - 1} + x_{min}
$$

**4. 动态 bit-width 选择与端到端流水线**

量化误差在多次从检查点恢复时会累积。Check-N-Run 根据集群故障概率 \(p\)（从故障日志计算）估计训练期间的预期恢复次数，动态选择量化位宽：2-bit 允许 1 次恢复，3-bit 允许 3 次，4-bit 允许 20 次，8-bit 允许 100+ 次。如果实际故障超过预期，系统自动回退到 8-bit。

端到端流水线设计确保量化不阻塞训练：GPU→CPU 快照（~7s）是唯一的训练停顿点。之后，CPU 进程将检查点分块（chunk），每个 chunk 独立量化后立即写入远程存储，同时下一个 chunk 开始量化。由于远程存储写入通常是瓶颈，量化延迟被完全隐藏。

Reader-Trainer 同步机制解决了一个微妙问题：数据读取器（reader）需要知道每个检查点间隔内精确处理了多少个 batch，以便恢复时从正确位置继续。Check-N-Run 通过控制器在每个间隔结束时记录精确的 batch 计数，消除了"in-flight"数据的歧义。

#### 🧪 练习题

```yaml
question: "Check-N-Run 默认采用 Intermittent Differential 而非 Consecutive Incremental 策略的主要原因是什么？"
options:
  - "Consecutive Incremental 的写入带宽更高"
  - "Consecutive Incremental 需要保留所有历史检查点，存储容量线性增长"
  - "Consecutive Incremental 无法追踪嵌入向量的修改"
  - "Consecutive Incremental 会引入量化精度损失"
answer: 1
explain: "Consecutive Incremental 虽然每次写入量最小且稳定，但恢复需要读取所有历史检查点，导致存储容量快速增长（11个间隔后达4×模型大小），而 Intermittent Differential 通过动态重置基线将存储控制在合理范围。"
```