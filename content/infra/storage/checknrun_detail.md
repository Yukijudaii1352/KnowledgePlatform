### Check-N-Run

```yaml
id: checknrun
name: Check-N-Run
full_name: Check-N-Run差异检查点 (Check-N-Run)
year: '2022'
org: Meta
paper_url: https://www.usenix.org/conference/nsdi22/presentation/eisenman
category: checkpoint
parent: checkfreq
motivation: 差异化+量化,4-13倍压缩
```

#### 📝 一句话总结

Check-N-Run 提出面向超大规模推荐模型训练的差异检查点系统，用 embedding table 的稀疏更新特性只保存变化行，再用低比特量化压缩检查点，从而缓解远程存储写带宽、网络带宽和容量瓶颈。

#### 🎯 核心要点

- 差异检查点：追踪训练间隔内被访问和更新的 embedding 行，只持久化修改部分而不是每次写全量模型
- 量化检查点：对检查点中的浮点 embedding 向量做 2/3/4/8 bit 量化，论文报告量化单项可带来 4-13 倍检查点压缩
- 默认策略：Intermittent Differential 在连续增量与重置全量基线之间动态切换，兼顾写入带宽和长期存储容量
- 低开销追踪：每个 GPU/分片维护 bit-vector，在 embedding lookup 路径上标记被修改行，并与训练通信重叠
- 训练解耦：GPU 只在复制快照到 CPU 时短暂停顿，差异计算、量化和远程写入在 CPU 后台流水化执行
- 精度约束：量化只作用于持久化检查点，训练仍使用全精度参数；位宽依据预期恢复次数选择，超出故障预期时回退到更高位宽
- 端到端效果：在 Meta/Facebook 生产推荐模型上减少 6-17 倍写带宽和 2.5-8 倍存储容量，目标是将精度影响控制在业务可接受的 0.01% 以内

#### 🔬 深入细节

![Check-N-Run 高层数据流图](https://www.usenix.org/system/files/nsdi22-paper-eisenman.pdf#page=4)
*图：Check-N-Run 训练、Reader、Trainer 与远程 checkpoint storage 的数据流。图片来源为 USENIX NSDI 2022 官方论文 PDF 第 4 页 Figure 2。*

```python
# Check-N-Run: differential checkpoint + adaptive quantization

def train_step(batch, model, modified_bits):
    sparse_ids = batch.embedding_indices
    for table_id, row_ids in sparse_ids.items():
        for row_id in row_ids:
            modified_bits[table_id][row_id] = 1
    loss = model.forward_backward_update(batch)
    return loss

def create_checkpoint(model, modified_bits, baseline, expected_restarts):
    snapshot = copy_gpu_state_to_cpu(model)  # short trainer stall

    if should_reset_baseline(baseline, modified_bits):
        diff = snapshot                      # full baseline checkpoint
        baseline = snapshot
        reset(modified_bits)
    else:
        diff = {}
        for table_id, bits in modified_bits.items():
            rows = bits.nonzero()
            diff[table_id] = snapshot.embedding_tables[table_id][rows]

    bit_width = select_bit_width(expected_restarts)
    for chunk in stream_chunks(diff):
        if bit_width <= 4:
            encoded = adaptive_asymmetric_quantize(chunk, bit_width)
        else:
            encoded = asymmetric_quantize(chunk, bit_width)
        write_remote_storage(encoded)

def should_reset_baseline(baseline, modified_bits):
    # Reset when keeping more incrementals is no longer cheaper than a new baseline.
    return estimated_future_incremental_cost(modified_bits) >= estimated_new_baseline_cost(baseline)
```

推荐模型与普通 dense DNN 的关键差异在于参数访问模式。Dense 网络每个 step 通常会对几乎所有权重产生梯度，而 DLRM 类推荐模型的大头是 embedding table，单表可以有海量行，但一个 batch 只访问其中很少一部分 ID。论文指出 embedding table 可占模型大小的 99% 以上，因此全量 checkpoint 的绝大部分成本来自 sparse layer；另一方面，在一个 checkpoint 间隔内未被访问的 embedding 行与上次 checkpoint 完全一致。这让“保存变化行”比通用压缩更有效，因为通用压缩面对训练后的浮点数高熵分布，只能获得很有限的压缩。

差异检查点的机制可以写成集合形式。设第 \(t\) 次快照的完整参数为 \(W_t\)，其中 embedding 行集合为 \(R\)，本轮被更新行集合为 \(M_t \subset R\)。全量 checkpoint 保存 \(W_t\)，而差异 checkpoint 保存：

$$
\Delta_t = \{(r, W_t[r]) \mid r \in M_t\}
$$

恢复时从最近的基线 \(B_k\) 开始，按时间顺序 replay 后续差异：

$$
W_t[r] =
\begin{cases}
\Delta_j[r], & r \in M_j \text{ 且 } j=\max\{i \le t \mid r \in M_i\}\\
B_k[r], & r \notin \bigcup_{i=k+1}^{t} M_i
\end{cases}
$$

这种设计的难点不是公式，而是生命周期策略。One-shot Differential 只保留一个基线和“相对基线的变化”，恢复简单，但变化集合会持续膨胀。Consecutive Incremental 每次只写最近间隔变化，单次写带宽最低，但恢复需要读取一串历史差异，存储和恢复链路越来越长。Intermittent Differential 则用历史大小估计何时重置全量基线：当继续积累增量的长期成本接近或超过新建基线成本时，系统写一个新基线并清空 bit-vector，让后续差异重新变小。

量化解决的是“即使只保存变化行，变化行本身仍是 FP32 浮点向量”的问题。朴素对称量化假设范围关于 0 对称，容易浪费码点；非对称量化用每个向量或分块的 \(x_{\min}, x_{\max}\) 覆盖实际范围，公式为：

$$
q(x)=\operatorname{round}\left(\frac{x-x_{\min}}{x_{\max}-x_{\min}}(2^b-1)\right)
$$

$$
\hat{x}=x_{\min}+\frac{q(x)}{2^b-1}(x_{\max}-x_{\min})
$$

但 embedding 向量常有 outlier，极值会拉大量化区间，让大多数元素分辨率下降。Check-N-Run 的 adaptive asymmetric quantization 通过贪心收缩 \(x_{\min}\) 或 \(x_{\max}\) 来寻找更小的重构误差：每一步比较“去掉左侧一小段”和“去掉右侧一小段”后的 L2 error，选择误差更小的方向，并限制最多收缩到原范围的一定比例。这比 K-means 量化便宜得多，又能避免少数 outlier 统治码本。

位宽选择体现了系统论文里的工程约束：checkpoint 量化误差只有在故障恢复后才进入后续训练状态。如果一次训练几乎不恢复，2 bit 可能足够；如果训练期间多次从量化 checkpoint 恢复，误差会累积，就要升到 3/4/8 bit。可以将累计误差风险粗略理解为：

$$
E_{\text{total}} \approx n_{\text{restart}} \cdot E_q(b)
$$

其中 \(E_q(b)\) 随位宽 \(b\) 增大而下降，而 \(n_{\text{restart}}\) 来自集群故障概率估计。Check-N-Run 因此不是固定压缩率系统，而是在“预期恢复次数、允许精度损失、写入成本”之间动态选择量化策略。

实现上，Check-N-Run 继承了 CheckFreq 式的 snapshot/persist 解耦思想，但利用推荐模型的稀疏更新做得更细。训练进程只需要在 checkpoint 触发时把 GPU 状态复制到 CPU pinned memory；随后训练继续，CPU 后台进程负责读取 bit-vector、组织差异块、量化并上传远程存储。Reader 状态也必须和 Trainer 状态一起记录，否则恢复后可能重复消费或跳过训练样本。最终，系统把原本阻塞训练和压垮远程存储的全量写入，拆成短暂停顿加后台流水线。

#### 🧪 练习题

```yaml
question: "Check-N-Run 为什么特别适合推荐模型而不是任意 dense DNN？"
options:
  - "推荐模型不需要保存 optimizer state"
  - "推荐模型 embedding table 巨大且每个训练间隔只更新其中一部分行"
  - "推荐模型 checkpoint 可以完全丢弃 dense MLP 参数"
  - "推荐模型的浮点参数可被通用压缩算法无损压到很小"
answer: 1
explain: "Check-N-Run 的核心收益来自 sparse embedding 的稀疏更新：未访问行与旧 checkpoint 相同，只需保存变化行；dense DNN 通常每步都会更新大部分参数。"
```
