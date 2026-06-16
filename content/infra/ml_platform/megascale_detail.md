### MegaScale

```yaml
id: megascale
name: MegaScale
full_name: MegaScale万卡训练 (MegaScale)
year: '2024'
org: ByteDance
paper_url: https://arxiv.org/abs/2402.15627
category: training_platform
parent: deepspeed
motivation: 万卡规模训练的容错与通信优化
```

#### 📝 一句话总结

MegaScale 是字节跳动面向超过 10,000 张 GPU 的生产级 LLM 训练系统，通过算法-系统协同、3D 并行通信重叠、网络调优、深度可观测性和快速故障恢复，解决万卡同步训练的效率与稳定性问题。

#### 🎯 核心要点

- 生产目标：在 12,288 张 GPU 上训练 175B Transformer，报告 55.2% MFU，相比 Megatron-LM 提升 1.34 倍
- 算法优化：采用 parallel transformer block、sliding window attention、LAMB optimizer 降低计算和流水线 bubble
- 通信重叠：分别针对 data parallel、pipeline parallel、tensor/sequence parallel 设计 all-gather、reduce-scatter、send/receive 与 GEMM 的重叠
- 算子与数据链路：使用 FlashAttention-2、LayerNorm/GeLU kernel fusion、异步数据预处理和单机共享 dataloader
- 大规模初始化与网络：用 Redis 替换 TCPStore、减少全局 barrier，把通信组初始化复杂度从 \(O(n^2)\) 降到 \(O(n)\)，并调优 ECMP、拥塞控制和 NCCL 重传
- 容错闭环：driver、executor、heartbeat、诊断测试、坏节点隔离、两阶段 checkpoint 和恢复读放大优化共同提高长期 goodput

#### 🔬 深入细节

![MegaScale 张量/序列并行通信重叠](https://arxiv.org/html/2402.15627v1/x3.png)
*图：MegaScale 论文 Figure 3，展示 parallel transformer block 中 TP/SP 通信与 FFN/GEMM 的融合和重叠，来源于 arXiv HTML。*

```python
# MegaScale 风格的生产训练控制循环伪代码
driver.submit(job)

while not job.finished:
    pods = kubernetes.allocate_or_replace_nodes(job.world_size)
    executors = launch_training_processes(pods, parallel_plan_3d)
    robust_daemons = start_heartbeat_daemons(executors)

    while job.running:
        metrics = collect(
            cuda_events=True,
            rdma_traffic=True,
            nccl_errors=True,
            heartbeat=True,
            step_latency=True,
        )
        if detect_fault_or_straggler(metrics):
            driver.suspend_all_executors()
            bad_nodes = run_lightweight_diagnostics(executors)
            kubernetes.evict_and_replenish(bad_nodes)
            ckpt = locate_latest_checkpoint()
            executors = relaunch_from_checkpoint(ckpt)
            break

        overlap_dp_pp_tp_sp_communications()
        if should_checkpoint():
            dump_gpu_state_to_host_pinned_memory()
            async_flush_host_state_to_hdfs()
```

MegaScale 的核心观察是：万卡训练下，“单步最快”不等于“长期训练最快”。同步 LLM 训练中，一个慢节点会拖住整组 collective；一个 GPU、RNIC、链路或文件系统异常都会让作业暂停；训练持续数周时，小概率故障会变成常态。因此论文把效率定义为长期稳定的有效训练吞吐，常用指标包括 MFU 和 goodput：

$$
\text{MFU}=\frac{\text{observed model FLOPs per second}}{\text{hardware peak FLOPs per second}}
$$

$$
\text{goodput} \approx \frac{\text{useful training steps or tokens}}{\text{wall-clock time including failure and recovery}}
$$

算法层面，MegaScale 先减少每步计算和流水线浪费。Parallel transformer block 把传统串行结构：

$$
y = x + \text{MLP}(\text{LN}(x + \text{Attention}(\text{LN}(x))))
$$

改写为：

$$
y = x + \text{MLP}(\text{LN}(x)) + \text{Attention}(\text{LN}(x))
$$

这样 Attention 和 MLP 两条分支可以并行执行，更适合与 TP/SP 通信重叠。Sliding window attention 把长度为 \(s\) 的全量注意力从 \(O(s^2)\) 降到 \(O(s \cdot w)\)，其中 \(w\) 是窗口大小；多层堆叠后仍可形成较大感受野。LAMB optimizer 则允许在不损害收敛的情况下放大全局 batch。论文给出 interleaved pipeline 的 bubble 对比：连续 4 个 1x batch step 的 bubble 约为

$$
\frac{4}{v}\frac{p-1}{m}
$$

而使用 4x batch 做 1 个 step 的 bubble 约为

$$
\frac{1}{v}\frac{p-1}{4m}
$$

其中 \(p\) 是 pipeline stage 数、\(m\) 是 micro-batch 数、\(v\) 是 virtual pipeline size，因此 bubble 理论上降低 87.5%。

系统层面，MegaScale 对 3D 并行中的不同通信路径分别处理。数据并行使用 ZeRO2 时，前向需要 all-gather 参数，反向需要 reduce-scatter 梯度；MegaScale 按 model chunk 触发通信，并把第一次 all-gather 预取到 iteration 开始，与数据加载重叠。流水线并行使用 interleaved 1F1B，但不把 send/receive 绑定成阻塞对：warm-up、steady 和 cool-down 阶段中，只要当前计算不依赖某个通信结果，就把 send 或 receive 异步发起。张量/序列并行更棘手，因为 LayerNorm/Dropout 沿 sequence 维切分会引入 all-gather 和 reduce-scatter；MegaScale 将这些通信融合到 FFN 的 parallel Linear 路径，并把 GEMM 切成小块，使通信可以在大 GEMM 执行期间被隐藏。

在万卡规模，初始化和网络调优也会变成训练系统的一部分。默认 `torch.distributed` 在大量 NCCL group 初始化时依赖 TCPStore 和全局 barrier，论文测得 Megatron-LM 在 2,048 张 Ampere GPU 上初始化约 1047 秒。MegaScale 用非阻塞异步的 Redis 替换 TCPStore，并重新设计通信组初始化顺序，减少不必要全局 barrier，把 barrier 复杂度从 \(O(n^2)\) 降到 \(O(n)\)，使 2,048 GPU 初始化低于 5 秒，超过 10,000 GPU 时低于 30 秒。网络上，MegaScale 还针对 CLOS-like 三层交换网络、ToR 下多 rail、ECMP hash conflict、PFC/HoL blocking、DCQCN/Swift 风格拥塞控制和 NCCL retransmit timeout 做专门调优。

容错部分体现了 MegaScale 与普通训练框架的边界差异。每个 executor 管理一个节点并启动 GPU 训练进程，同时有 robust daemon 周期性向 driver 发送 heartbeat，包含进程状态、日志、硬件信息和 RDMA 指标。driver 发现异常或 heartbeat 超时后会暂停全局训练，触发轻量诊断：单机内 RNIC loopback、RNIC-to-RNIC、单机 GPU all-to-all、同 ToR 邻近机器 all-reduce 等，用来定位坏卡、坏链路或异常节点。坏节点被 Kubernetes 驱逐并补齐，作业从最近 checkpoint 恢复。checkpoint 采用两阶段：GPU worker 先把状态写入 host pinned memory 后立刻继续训练，后台进程异步刷到 HDFS；恢复时由同一数据并行组中的一个 worker 读取共享 state partition，再广播给组内其他 worker，降低 HDFS 读放大。

> 💡 关键：MegaScale 的贡献不只是“用了更多 GPU”，而是把模型结构、并行调度、通信库、网络、数据加载、监控、诊断和 checkpoint 都纳入同一个闭环，目标是在故障频繁发生的万卡环境里维持长期有效吞吐。

#### 🧪 练习题

```yaml
question: "MegaScale 为什么特别强调 goodput 而不仅是单步吞吐？"
options:
  - "万卡训练中故障、straggler、checkpoint 和恢复时间会显著影响长期有效训练速度"
  - "goodput 只衡量单卡峰值算力"
  - "goodput 与通信和容错无关"
  - "只要使用 FlashAttention-2，goodput 一定等于 MFU"
answer: 0
explain: "万卡同步训练下，小概率故障会频繁出现；长期有效吞吐必须把暂停、诊断、重启和恢复成本计入。"
```
