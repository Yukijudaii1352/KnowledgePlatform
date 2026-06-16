### BOOST

```yaml
id: boost
name: BOOST
full_name: BOOST
year: '2026'
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: training_platform
parent: megatron_lm
motivation: 针对低秩大模型训练的瓶颈优化框架
```

#### 📝 一句话总结

BOOST 提出面向低秩瓶颈 LLM 预训练的分布式训练框架，通过 Bottleneck-aware Tensor Parallelism 将通信边界移动到低维 bottleneck，并结合 Online RMSNorm、线性层分组和低秩激活检查点，解决低秩模型在标准 Megatron 式 3D 并行下通信过多、GPU 利用率低的问题。

#### 🎯 核心要点

- 面向低秩/瓶颈 Transformer 预训练，而不是 LoRA 微调；目标是在 backbone 本身低秩化后仍能高效扩展
- 分析 vanilla low-rank TP 的双重低效：每个瓶颈线性层都引入 collective，且沿低秩维度切分会让 GEMM arithmetic intensity 下降
- 提出 Bottleneck-aware Tensor Parallelism (BTP)：把 TP chunk 边界平移一个 bottleneck layer，让 collective 发生在 \(r \ll d\) 的低维激活上
- BTP 同时减少通信量和改善 GEMM 形状：沿 hidden dimension 切分，而不是进一步切碎已经很窄的 rank dimension
- Online RMSNorm 将局部 RMSNorm 统计与后续 row-split GEMM 的 all-reduce 融合，避免独立的小 payload 同步
- Linear layer grouping 用拼接/批量 GEMM 合并多个低秩线性层，降低 kernel launch 和 collective 次数
- Comm-free low-rank activation checkpointing 只保存低秩激活，反向重算时避免额外通信
- 论文报告在多种低秩结构上相对 full-rank baseline 有 1.46-1.91x 加速，相对 naive low-rank 3D parallelism 有 1.87-2.27x 加速

#### 🔬 深入细节

![BOOST framework overview](https://arxiv.org/html/2512.12131v2/mlsys2026/figure/Framework_Overview.png)
*图：来自 BOOST 论文 Figure 1，展示低秩瓶颈结构、vanilla TP 的 runtime breakdown，以及 BOOST 框架由 BTP、Online RMSNorm、linear grouping 和 activation checkpointing 组成。*

![BOOST Bottleneck-aware Tensor Parallelism](https://arxiv.org/html/2512.12131v2/mlsys2026/figure/btp_main_edited.png)
*图：来自 BOOST 论文 Figure 3。上方 vanilla TP 为每个低秩线性块放置独立 `f/g` 通信边界；下方 BTP 将边界平移到 bottleneck，使同一个低维边界服务相邻的 up/down projection。*

```python
# BOOST: Bottleneck-aware Tensor Parallelism + Online RMSNorm, simplified.
# x: [tokens, d], low-rank dimension r << d, tp_size = p
def btp_block(x, tp_rank, tp_group):
    # Current chunk starts at an up projection and ends after the next down projection.
    # W_up is column-split along hidden dimension d, so each rank produces y_i.
    z = low_rank_activation_from_previous_chunk(x)        # [tokens, r], already at bottleneck
    y_i = z @ shard_columns(W_up, tp_rank)                # [tokens, d / p]
    y_i = activation(y_i)

    # RMSNorm is sharded-unsafe, so BOOST uses online recovery.
    local_ss = sum(y_i * y_i, axis=-1, keepdim=True)
    local_rms = sqrt(local_ss / (d / p) + eps)
    yhat_i = (y_i / local_rms) * shard_gamma(gamma, tp_rank)

    # Next down projection is row-split; fuse output and norm statistic in one collective.
    z_partial = yhat_i @ shard_rows(W_down_next, tp_rank) # [tokens, r]
    z_sum, global_ss = all_reduce_sum((z_partial, local_ss), group=tp_group)

    # Recover exact global RMSNorm effect after the fused collective.
    global_rms = sqrt(global_ss / d + eps)
    correction = local_rms / global_rms
    z_next = recover_scaled_output(z_sum, correction)
    return z_next                                         # [tokens, r]
```

低秩瓶颈层通常把一个 \(d \times d\) 投影替换成两个小矩阵：

$$
Y = \phi(X W_{\text{down}}), \quad Z = Y W_{\text{up}}, \quad
W_{\text{down}} \in \mathbb{R}^{d \times r},\; W_{\text{up}} \in \mathbb{R}^{r \times d},\; r \ll d
$$

单卡上这会显著减少 FLOPs 和参数量，但分布式训练并不会自动变快。Megatron-LM 式 TP 原本假设每个 Transformer block 里有少数几个大矩阵，通信点可以放在 MLP/attention 的自然边界。低秩化后，一个大矩阵变成更深的 down/up 链路；如果仍把每对 low-rank 层当作独立 TP chunk，就会为更多线性层插入 `f/g` collective，导致通信启动次数和激活同步量上升。

vanilla low-rank TP 的计算问题同样严重。低秩结构已经把有效维度从 \(d\) 降到 \(r\)，如果 TP 再沿 \(r\) 维切分，每张 GPU 的 GEMM reduction dimension 变成 \(r/p\)。这类小 GEMM 数据搬运多、计算少，容易落入 memory-bound 区域。BOOST 的观察是：低秩模型的并行策略必须理解 bottleneck，而不能把每个 low-rank linear 当成普通 dense linear。

BTP 的关键动作是把 TP chunk 边界平移一个 bottleneck layer：chunk 从上投影 \(W_{\text{up}}\) 开始，到下一层下投影 \(W_{\text{down}}\) 结束。这样 collective 发生在低维激活 \(r\) 上，而 shard 仍沿较大的 hidden dimension \(d\) 组织。若一次 hidden activation collective 的 payload 近似为：

$$
B_d = \text{bytes} \cdot \text{tokens} \cdot d
$$

则 bottleneck 处的 collective 近似为：

$$
B_r = \text{bytes} \cdot \text{tokens} \cdot r,\quad
\frac{B_d}{B_r} = \frac{d}{r}
$$

当 \(r \ll d\) 时，把同步点移到 bottleneck 直接降低通信量；同时 GEMM 沿 \(d\) 维切分，保留更健康的矩阵形状。论文报告 BTP 在通信量和 hardware FLOPs utilization 两端都优于 naive low-rank TP。

Online RMSNorm 解决的是 BTP 引入的新约束。RMSNorm 的标准形式为：

$$
\operatorname{RMSNorm}(x)=\gamma \odot \frac{x}{\sqrt{\frac{1}{d}\sum_{j=1}^{d}x_j^2+\epsilon}}
$$

但 BTP chunk 内的激活按 hidden dimension 分片，每个 rank 只能看到 \(d/p\) 个元素；若直接计算 RMSNorm，就缺少全局平方和。朴素做法是单独 all-reduce 一个很小的统计量，但这种小 payload collective 被 launch latency 支配。BOOST 改为先计算局部平方和 \(s_i\) 和局部 RMS，把统计量与后续 row-split GEMM 的 all-reduce 一起发送，再用全局 \(s=\sum_i s_i\) 恢复标准 RMSNorm 等价结果。直觉上，它把“必须同步归一化统计”的时刻推迟到本来就要同步的 GEMM 边界。

Linear layer grouping 和低秩激活检查点是为了把 BTP 的理论收益落到端到端训练上。低秩模型的小矩阵更多，kernel launch 和 collective 数量更容易成为瓶颈；BOOST 对共享输入的 down projections 用权重拼接，对输入不同的 up projections 用 batched GEMM，把多个小操作合并成更大的操作。激活检查点方面，低秩结构天然有小激活 \(r\)，保存这些低秩边界并在反向局部重算，可以减少 HBM 压力，同时避免为了重算而重新触发跨 rank 通信。

与 Megatron-LM 的通用 TP 相比，BOOST 更像“结构感知 TP”。Megatron-LM 通过列切/行切把 dense Transformer 的通信压到少数边界；BOOST 则在低秩 Transformer 里重新寻找这些边界。它的结论可以概括为：模型结构变成 bottleneck 后，系统并行边界也必须随之移动，否则参数/FLOPs 减少会被通信、kernel launch 和低 arithmetic intensity 抵消。

> 💡 关键：BOOST 不只是把低秩模型接到 Megatron-LM 上，而是重新定义“哪里同步、沿什么维度切、哪些小操作合并”，让低秩带来的算法节省不会在分布式系统层被吃掉。

#### 🧪 练习题

```yaml
question: "BOOST 的 Bottleneck-aware Tensor Parallelism 为什么能同时降低通信并提高 GPU 利用率？"
options:
  - "它把 collective 移到低维 bottleneck，同时沿较大的 hidden dimension 组织切分以改善 GEMM 形状"
  - "它取消了所有 tensor parallel collective"
  - "它把低秩模型还原成 full-rank 模型"
  - "它只依赖更大的 batch size，不改变并行边界"
answer: 0
explain: "BTP 利用 r << d 的瓶颈激活降低同步 payload，并避免继续切碎低秩维度，从而减少通信且提升 arithmetic intensity。"
```
