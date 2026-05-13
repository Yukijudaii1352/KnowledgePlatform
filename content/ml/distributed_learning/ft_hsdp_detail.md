### FT-HSDP: 容错混合分片数据并行

```yaml
id: ft_hsdp
name: FT-HSDP
full_name: 容错混合分片数据并行 (Fault Tolerant Hybrid Sharded Data Parallelism)
year: "2025"
org: Meta
paper_url: https://arxiv.org/abs/2602.00277
category: distributed_training
parent: HSDP
motivation: 在100K GPU规模下通过异步容错恢复将有效训练时间从44%提升至80%，解决大规模同步训练中频繁故障导致的严重停顿问题
```

#### 📝 一句话总结

FT-HSDP 提出基于多副本 HSDP 的异步容错训练框架，通过 CPU-GPU 混合 AllReduce 协议（FTAR）、非阻塞追赶协议和 P2P checkpoint 恢复机制，使 100K GPU 训练在每 18 分钟一次故障的环境下将有效训练时间从 44% 提升至 80%。

#### 🎯 核心要点

- **多副本 HSDP 架构**：将 100K GPU 分为 10-20 个副本，每个副本内使用 FSDP（全分片数据并行），副本间通过 FTAR 交换梯度
- **FTAR 协议（Fault Tolerant All Reduce）**：CPU 驱动控制面 + GPU 执行数据面的混合设计，支持通信组动态重建、错误分类处理和拥塞控制
- **Ring 算法 + 固定大小分块流水线**：跨 DC 通信采用带宽最优的 Ring 算法，通过固定 chunk 大小控制并发数据包量
- **非阻塞追赶协议**：恢复中的副本发送零梯度参与 FTAR，自动与健康副本同步到一致状态
- **P2P Checkpoint 恢复**：恢复副本直接从健康 GPU 通过 HTTP 拉取最新状态，无需访问持久存储
- **2PC 一致性协议**：故障后副本内通过类两阶段提交决定是否应用梯度或重训该步
- **学习率干预策略**：sqrt 缩放策略（按健康副本比例的平方根调整 LR）在异步恢复期间保持训练质量
- **CPU 大规模仿真测试**：用 CPU mock 模块模拟 100K GPU 规模进行软件测试

#### 🔬 深入细节

![FT-HSDP 系统架构](https://arxiv.org/html/2602.00277v1/extracted/6173012/figures/fthsdp_overview.png)
*图：FT-HSDP 整体架构。多个副本通过 FTAR 交换梯度，故障时仅需恢复单个副本，其余副本继续训练。*

##### 算法伪代码

```python
# FT-HSDP 核心训练循环
def ft_hsdp_train_step(replicas, step_n):
    # 1. 各副本报告步号，确定健康/落后副本
    healthy, behind = consensus_check(replicas)
    
    # 2. 健康副本执行正常训练
    for replica in healthy:
        grads = replica.forward_backward(batch[step_n])
        # 副本内 FSDP AllReduce (NCCL)
        intra_allreduce(replica, grads)
    
    # 3. 落后副本发送零梯度
    for replica in behind:
        grads = zeros_like(replica.params)
        # 同时通过P2P获取step_n-1的checkpoint
        replica.fetch_checkpoint_from(healthy[0], step_n - 1)
    
    # 4. 跨副本 FTAR 梯度交换 (CPU-GPU混合)
    all_grads = ftar_allreduce(all_replicas, grads)
    
    # 5. 所有副本应用梯度更新
    for replica in all_replicas:
        replica.optimizer_step(all_grads)

# FTAR 协议核心流程
def ftar_allreduce(group, data):
    # CPU: 初始化RDMA连接，确定参与者
    connections = cpu_init_rdma(group)
    group_members = cpu_reconfig(group)  # 动态重建组
    
    # 分区流水线处理
    for partition in split(data, chunk_size * num_chunks * N):
        # Ring ReduceScatter: N-1步
        for step in range(N - 1):
            gpu_copy_to_sendbuf(partition[step])
            gpu_notify_cpu()          # GPU→CPU信号
            cpu_rdma_send(right_neighbor)  # CPU驱动RDMA发送
            cpu_wait_recv(left_neighbor)   # CPU等待接收
            cpu_notify_gpu()          # CPU→GPU信号
            gpu_reduce(recvbuf)       # GPU执行reduce
        
        # Ring AllGather: N-1步 (类似流程)
        for step in range(N - 1):
            gpu_forward_to_neighbor(result[step])
    
    return reduced_data

# 故障后2PC一致性协议
def post_failure_consistency(replica):
    if replica.rank0.ask_all("gradient_exchange_done?"):
        replica.all_ranks("apply_optimizer_step")  # 全部完成→继续
    else:
        replica.all_ranks("discard_gradients")     # 未完成→重训
        trigger_recovery_protocol(replica)
```

##### 动机与背景

在 100K GPU 规模的 LLM 训练中，硬件故障极为频繁。Meta 的生产数据显示：

- **32K GPU 集群**每 1000 台/天发生 2.3 次中断
- **100K GPU** 规模下平均每 **18 分钟**发生一次故障
- 传统同步恢复需要 **10 分钟**（含故障检测 60s、作业调度 120s、checkpoint 加载 120s、NCCL 初始化 300s、首步效应 200s）
- 有效训练时间仅 \(\frac{18-10}{18} = 44\%\)

传统方法的核心缺陷在于：每次故障都需要**所有 GPU 停止训练**，从最新 checkpoint 重启整个作业。在 100K GPU 规模下，NCCL 通信组重建（5 分钟）和 checkpoint 加载（2 分钟）成为主要瓶颈。

##### 核心机制：异步恢复范式

FT-HSDP 的核心洞察是：**故障时只需恢复受影响的副本，其余副本继续训练**。这通过三个关键组件实现：

**1. FTAR 协议 — CPU-GPU 混合设计**

NCCL 虽然性能优异，但存在三个致命缺陷：(1) GPU 驱动的设计无法实现复杂错误处理逻辑；(2) 通信组不可动态重建；(3) 无法区分可恢复错误和致命错误。

FTAR 采用分层设计：
- **控制面（CPU）**：管理 RDMA 连接生命周期、通过共识服务确定组成员、实现拥塞控制（限制在途数据量）、根据错误类型决定处理策略
- **数据面（GPU）**：执行实际数据拷贝和 reduce 操作，通过 RDMA 直接传输

> 💡 关键：CPU 和 GPU 通过 host-pinned memory 上的 flag 进行同步。GPU kernel 使用 busy-polling 等待 CPU 信号，仅占用少量 SM（如 H100 的 132 个 SM 中仅用 4 个），通过指令级并行（ILP）在低占用率下实现高内存带宽利用。

**2. Ring 算法与拥塞控制**

跨 DC 网络存在 1:2.8 的过订比（oversubscription ratio），带宽受限。FTAR 选择 Ring 算法的原因：
- 每个 GPU 仅与两个邻居通信，最小化并发流量
- 对 200MB-500MB 消息、最多 16 个 rank 的场景是带宽最优的

固定大小分块流水线设计：预分配 \(S \times C\) 大小的 sendBuf/recvBuf，每个分区包含 \(S \times C \times N\) 字节数据。这带来两个好处：
1. 控制任意两节点间并发数据包不超过 \(S \times C\) 字节
2. 允许独立调优 GPU kernel 和网络传输的吞吐量

**3. 非阻塞追赶协议**

$$\text{恢复副本状态} = \text{checkpoint}_{n-1} + \text{零梯度参与FTAR}_n = \text{健康副本状态}_n$$

这利用了训练的特殊性质：只要所有副本拥有相同的 checkpoint，未参与训练的副本发送零梯度后，经过 AllReduce 即可达到与训练副本相同的状态。这是因为：

$$w_{n} = w_{n-1} - \eta \cdot \frac{1}{R} \sum_{r=1}^{R} g_r$$

当恢复副本发送 \(g_r = 0\) 时，等效于该副本的梯度贡献为零，但所有副本最终获得相同的 \(w_n\)。

> ⚠️ 注意：这要求 checkpoint 获取时间短于一个训练步（约 20s）。通过 GPU→CPU 内存拷贝 + HTTP P2P 传输实现，与 GPU 高速网络无竞争。

**4. 故障后一致性保证**

故障可能导致部分副本完成梯度交换而其他副本未完成。FT-HSDP 的关键设计决策：**副本内一致性是必要的，副本间一致性是不必要的**。

每个副本独立执行类 2PC 协议：Rank 0 询问所有 rank 是否完成梯度交换，全部完成则应用梯度继续；否则丢弃梯度重训该步。不同副本可能做出不同决策，落后的副本通过追赶协议重新加入。

##### 训练质量保证

异步恢复引入的学习率干预策略：

$$\text{lr}_{\text{sqrt}} = \text{lr}_{\text{base}} \times \sqrt{\frac{N_{\text{healthy}}}{N_{\text{total}}}}$$

sqrt 缩放确保学习率始终与梯度噪声的标准差成正比。实验表明（256 GPU，3B MoE 模型，500B tokens）：
- 频繁故障（每 5K 步 2 次，每次持续 4K 步）对最终模型质量无显著影响
- sqrt 策略优于 linear 策略和无干预策略

##### 实验结果

**100K GPU 全规模实验**（Llama 模型，TP+CP+PP+FSDP）：
- 稳态吞吐量：450 TFlops/GPU/s，与无 FT-HSDP 时相同（零开销）
- 故障检测+处理+重训：约 3 分钟停顿
- 副本重新加入：约 2 分钟额外停顿（含首步效应）
- 有效训练时间：\(\frac{8 + 7 \times \frac{11}{12}}{18} = 80\%\)（vs 同步恢复的 44%）

**FTAR 性能**：
- 8 rank 跨 DC：达到 NCCL 同等吞吐量
- 16 rank 跨 building：接近 NCCL 性能

##### 与传统方法的区别

| 特性 | 传统同步恢复 | FT-HSDP |
|------|-------------|---------|
| 故障影响范围 | 所有 GPU 停止 | 仅受影响副本 |
| 恢复时间 | ~10 min | ~3 min 停顿 |
| 通信组重建 | NCCL 全局重建(5min) | FTAR 局部重建(秒级) |
| 有效训练时间(100K) | 44% | 80% |
| 稳态性能开销 | 无 | 无 |
| checkpoint 来源 | 持久存储 | P2P GPU→CPU→GPU |

#### 🧪 练习题

```yaml
question: "FT-HSDP 中恢复副本如何在不阻塞其他副本的情况下追赶到最新状态？"
options:
  - "恢复副本从持久存储加载最新checkpoint后重放所有缺失的训练步"
  - "恢复副本获取最新checkpoint后发送零梯度参与一次FTAR，自动同步到最新状态"
  - "健康副本暂停训练等待恢复副本完成所有缺失步的训练"
  - "恢复副本使用随机初始化的模型直接加入训练，依靠梯度平均逐步收敛"
answer: 1
explain: "非阻塞追赶协议利用训练的特殊性质：恢复副本获取step n-1的checkpoint后，在step n发送零梯度参与FTAR AllReduce，由于所有副本执行相同的梯度平均和优化器更新，恢复副本自动达到与健康副本相同的状态。"
```