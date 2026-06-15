### BOOST

```yaml
id: boost
name: BOOST
full_name: BOOST
year: "2026"
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: training_platform
parent: megatron_lm
motivation: 针对低秩大模型训练的瓶颈优化框架
```

#### 📝 一句话总结

BOOST 针对低秩瓶颈大模型训练提出 bottleneck-aware tensor parallelism 和在线归一化等优化，把并行边界移动到低维瓶颈处，减少通信并提高低秩 LLM 训练的硬件利用率。

#### 🎯 核心要点

- 面向 low-rank/bottleneck Transformer，识别 vanilla tensor parallel 在低秩结构上通信边界不匹配的问题
- Bottleneck-aware Tensor Parallelism (BTP) 将切分边界放到低维表示，减少高维 all-gather/all-reduce
- Online RMSNorm 等算子优化降低额外同步和重算开销
- 集成到 PyTorch/Nanotron 训练栈，支持 DP/TP/PP 组合实验
- 公开资料显示相对 vanilla TP 在瓶颈结构上获得显著端到端加速

#### 🔬 深入细节

> 图示说明：公开 PDF 的核心图展示 vanilla TP 与 BOOST BTP 的对比：vanilla 在每个 TP chunk 周围引入通信，BTP 将并行边界移到低秩 bottleneck，使后续上投影可在低维分片上继续计算。

```python
# BOOST bottleneck-aware TP 伪代码
# 原层: y = up(norm(down(x)))，rank r << hidden d
x_i = shard_hidden(x, tp_rank)
z_i = down_project_local(x_i)        # 进入低秩瓶颈
z = reduce_scatter_or_all_reduce(z_i) # 只同步 r 维表示
z = online_rmsnorm(z)
y_i = up_project_sharded(z, tp_rank) # 在分片上完成上投影
return gather_if_needed(y_i)
```

低秩训练通过把高维矩阵分解为 down/up 两个低秩投影降低参数和计算，但分布式训练中如果仍沿用全秩模型的张量并行边界，就可能在高维激活上通信，抵消低秩收益。

BOOST 的关键是让并行策略理解 bottleneck 结构。低秩中间表示维度 \(r\) 远小于 hidden size \(d\)，因此把同步点放在 \(r\) 维处比在 \(d\) 维处通信便宜得多。

Online RMSNorm 等优化进一步避免为了归一化而重新聚合完整高维张量。整体目标是让低秩模型的计算减少、通信减少和显存减少同时成立，而不是只减少参数量。

与 Megatron-LM 的通用 Transformer 张量并行相比，BOOST 是面向低秩瓶颈架构的专用系统优化。它说明模型结构变化后，并行边界也应随之重设。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "BOOST 的 BTP 为什么能减少通信？"
options:
  - "把通信边界移动到低维 bottleneck 表示上"
  - "把所有参数复制十份"
  - "只在 CPU 上计算"
  - "取消张量并行"
answer: 0
explain: "低秩瓶颈维度远小于 hidden size，在该处同步可以显著降低通信量。"
```
