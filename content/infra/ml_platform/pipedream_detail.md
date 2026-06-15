### PipeDream

```yaml
id: pipedream
name: PipeDream
full_name: PipeDream
year: "2019"
org: Microsoft/CMU
paper_url: https://dl.acm.org/doi/10.1145/3341301.3359646
category: training_platform
parent: gpipe
motivation: 异步流水线减少bubble开销
```

#### 📝 一句话总结

PipeDream 提出异步流水线并行训练系统，通过 1F1B 调度和权重版本管理减少 GPipe 式流水线 bubble，在多 GPU/多机上提高深度模型训练吞吐。

#### 🎯 核心要点

- 自动按层 profile 计算时间和激活大小，将模型划分为负载均衡的 pipeline stages
- 采用 one-forward-one-backward 调度，让每个 stage 交替执行前向和反向以保持流水线满载
- 使用 weight stashing 保存前向所用权重版本，确保对应反向使用同一版本
- 用 vertical sync 等机制控制跨 stage 权重版本偏差，缓解异步流水线收敛问题
- 相比 GPipe 更关注吞吐和低 bubble，代价是更复杂的一致性与内存管理

#### 🔬 深入细节

> 图示说明：论文核心示意是 1F1B 流水线时序：每个 stage 在填充后交替处理不同 micro-batch 的 forward/backward，并为每个 micro-batch 记录权重版本。

```python
# PipeDream 1F1B 调度伪代码
for stage in pipeline:
    while training:
        if can_run_backward(stage):
            micro, version = recv_grad(stage)
            use_stashed_weights(version)
            backward(stage, micro)
            send_grad_to_prev(stage)
        if can_run_forward(stage):
            micro = recv_activation(stage)
            stash_current_weights(micro.id)
            forward(stage, micro)
            send_activation_to_next(stage)
        optimizer_step_stage_local(stage)
```

GPipe 为保持同步语义，会等所有 micro-batch 的前后向完成再更新，因此流水线填充和排空带来明显 bubble。PipeDream 关注持续训练吞吐，希望流水线进入稳态后每个 stage 几乎一直有活干。

1F1B 调度让 stage 在稳态下执行一个 backward 后接一个 forward。这样反向产生的梯度能尽早释放激活，内存压力低于先做完所有 forward 再 backward 的 schedule。

异步流水线的难点是权重版本。一个 micro-batch 前向经过早期 stage 时，后续 stage 可能已经更新了多次；PipeDream 用 weight stashing 保存该 micro-batch 前向时的权重版本，使反向计算的梯度与前向一致。

与 GPipe 相比，PipeDream 用更复杂的版本控制换取更小 bubble 和更高吞吐。它体现了流水线并行的核心权衡：同步语义越强，调度越简单但空闲越多；异步越激进，系统效率越高但收敛分析和实现更难。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "PipeDream 中 weight stashing 的作用是什么？"
options:
  - "保存数据集副本"
  - "确保某个 micro-batch 反向使用与前向一致的权重版本"
  - "压缩网络报文"
  - "替代优化器"
answer: 1
explain: "异步流水线会产生权重版本差异，stashing 记录前向所用版本供对应反向使用。"
```
