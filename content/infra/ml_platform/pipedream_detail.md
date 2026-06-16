### PipeDream

```yaml
id: pipedream
name: PipeDream
full_name: PipeDream
year: '2019'
org: Microsoft/CMU
paper_url: https://dl.acm.org/doi/10.1145/3341301.3359646
category: training_platform
parent: gpipe
motivation: 异步流水线减少bubble开销
```

#### 📝 一句话总结

PipeDream 提出 generalized pipeline parallelism，把层切分、阶段复制、1F1B 调度和 weight stashing 组合起来，在保持训练正确性近似可控的同时减少 GPipe 式流水线 flush 与 bubble。

#### 🎯 核心要点

- 将 DNN 层划分为多个 pipeline stages，并允许某些 stage 用数据并行副本复制来消除负载不均衡
- 通过短 profile 收集每层前向/反向时间、激活大小、参数大小和平台通信带宽，再自动搜索 stage 切分与复制因子
- 使用 1F1B 调度：稳态中每个 worker 严格交替执行一个 backward 和一个 forward，减少启动/排空之外的空闲时间
- 扩展为 1F1B-RR：在被复制的 stage 内 round-robin 路由 microbatch，并保证反向梯度回到执行过对应前向的副本
- 使用 weight stashing 保存每个 microbatch 前向时的权重版本，使该 microbatch 的反向在同一 stage 内使用一致参数
- 用 vertical sync 等版本控制手段缓解跨 stage 权重版本偏移，在吞吐、内存占用和统计效率之间取舍

#### 🔬 深入细节

![PipeDream pipeline-parallel assignment 与 1F1B 时序图](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/pipedream_figure2.png)
*图：来自 Microsoft Research PipeDream 官方博客 Figure 2，左侧展示 8 GPU 被切成 4 个 stage 且部分 stage 有副本，右侧展示启动后进入 steady state 的 1F1B forward/backward 交替。*

![PipeDream workflow 图](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/Figure3_pipedream.png)
*图：来自 Microsoft Research PipeDream 官方博客 Figure 3，展示 profiler、optimizer、constraints 与 runtime 如何形成 pipeline-parallel execution。*

```python
# PipeDream core loop, simplified.
# Each worker owns one stage replica and repeats a static 1F1B-RR schedule.
while training:
    if has_ready_backward(stage):
        mb_id, grad_out = recv_from_next_stage()
        version = forward_weight_version[mb_id]
        weights = load_stashed_weights(version)
        grad_in, grad_w = backward(stage, mb_id, grad_out, weights)
        apply_stage_local_update(stage, grad_w)
        send_to_prev_stage(mb_id, grad_in, route=forward_route[mb_id])

    if has_ready_forward(stage):
        mb_id, activation = recv_from_prev_stage_or_loader()
        version = current_weight_version(stage)
        stash_weights(mb_id, version)
        forward_route[mb_id] = this_stage_replica()
        activation_out = forward(stage, activation, weights_at(version))
        send_to_next_stage(mb_id, activation_out)
```

PipeDream 的出发点是传统 intra-batch 并行的两个极端都不理想。数据并行每个 worker 持有完整模型，扩展到多机后需要频繁同步大梯度，通信量随参数量增长；朴素模型并行只让一个 minibatch 穿过分布式层序列，任一时刻只有少数 worker 忙，硬件利用率低。Pipeline parallelism 的思路是把模型层序列切成 stage，同时把训练 batch 分成连续 microbatch，使多个 microbatch 像流水线指令一样同时处于不同 stage。

如果 stage \(s\) 的一次 microbatch 前向加反向服务时间为 \(t_s\)，稳态吞吐受最慢 stage 限制：

$$
T_{\text{step}} \approx T_{\text{fill/drain}} + (M-1)\max_s t_s
$$

其中 \(M\) 是流入流水线的 microbatch 数。这个公式说明了 PipeDream 为什么必须自动 partition：只要某个 stage 显著更慢，所有其他 stage 都会等待它。PipeDream 先 profile 每层的 compute time、activation/gradient 边界大小和参数大小，再结合硬件拓扑估计 stage 内计算与 stage 间通信；优化目标是选择连续层段、stage 数、stage 副本数和 microbatch 数，使 \(\max_s t_s\) 尽量小，同时满足 GPU 显存和网络带宽约束。

调度层面，PipeDream 使用 1F1B 而不是 GPipe 的“先做完所有 forward，再做所有 backward，再 flush 更新”。在 pipeline 填满后，每个 worker 优先执行一个 ready backward，然后执行一个 ready forward，因此 backward 产生的 activation 可以尽早释放，worker 也不必为了全局同步频繁排空流水线。对包含副本的 stage，1F1B-RR 会把 forward 按 round-robin 分配给副本，并记录 microbatch 的 route；反向时梯度必须回到执行过对应 forward 的同一副本，因为该副本保留了对应 activation 和权重版本。

异步流水线的核心风险是权重版本不一致。若 microbatch \(m\) 在 stage \(s\) 的前向使用权重 \(W_s^{v(m,s)}\)，但它的反向到达时该 stage 已经完成多次本地更新，直接用最新 \(W_s\) 会让梯度不再对应前向计算图。PipeDream 的 weight stashing 明确保存这个版本：

$$
g_s(m)=\nabla_{W_s} L_m\left(W_s^{v(m,s)}\right)
$$

也就是说，反向计算使用前向时的同一 stage-local 权重版本，保证单个 stage 内的梯度数值是自洽的。它不能完全消除跨 stage 的 staleness，因为同一个 microbatch 经过不同 stage 时可能看到不同版本；PipeDream 通过版本管理和可选 vertical sync 限制这种偏移，使统计效率接近数据并行，同时保留高硬件利用率。

与 GPipe 相比，PipeDream 的主要取舍是“少 flush、少 bubble，但要保存多个权重版本并处理 stale gradient”。GPipe 更接近同步 SGD 语义，理解和收敛分析更直接，但周期性排空会损失吞吐；PipeDream 让各 stage 本地更快更新，稳态几乎所有 worker 都有活干，适合通信受限或模型层计算不均的环境。它也不是纯 pipeline：stage replication 本质上把数据并行嵌入 pipeline stage 内，用复制因子吸收层耗时差异，这是 generalized pipeline parallelism 中“generalized”的重要含义。

> ⚠️ 注意：PipeDream 的正确性边界依赖 weight stashing 和路由记录；如果 backward 没有回到执行对应 forward 的 stage 副本，保存的 activation/weight version 就对不上。

#### 🧪 练习题

```yaml
question: "PipeDream 中 weight stashing 主要解决什么问题？"
options:
  - "减少输入数据集的磁盘占用"
  - "确保某个 microbatch 的反向在同一 stage 内使用它前向时的权重版本"
  - "把所有 stage 的权重强制变成同一个全局版本"
  - "让 GPU 不再需要保存 activation"
answer: 1
explain: "异步流水线中 stage 会持续更新权重；stashing 记录 microbatch 前向用过的版本，反向时加载同一版本以得到数值自洽的梯度。"
```
