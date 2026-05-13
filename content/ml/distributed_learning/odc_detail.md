### ODC — On-Demand Communication

```yaml
id: odc
name: ODC
full_name: 按需通信 (On-Demand Communication)
year: "2025"
org: Sea AI Lab & NUS
paper_url: https://arxiv.org/abs/2601.19362
code_url: https://github.com/sail-sg/odc
category: distributed_training
parent: FSDP
motivation: 将Parameter Server范式引入FSDP，用点对点通信替代集合通信，消除逐层同步屏障，解决LLM后训练中负载不均衡导致的GPU空闲问题
```

#### 📝 一句话总结

ODC 提出将 FSDP 中的集合通信（All-Gather / Reduce-Scatter）替换为按需的点对点通信（Gather / Scatter-Accumulate），将同步粒度从逐层放宽至逐 minibatch，使各设备可独立推进计算，在 LLM 后训练（SFT/RL）的不均衡负载场景下实现最高 36% 的吞吐提升。

#### 🎯 核心要点

- **问题根源**：FSDP 的 All-Gather / Reduce-Scatter 在每一层引入同步屏障，所有设备必须等待最慢者完成，导致快设备空闲
- **核心方案**：用点对点的 `gather`（拉参数）和 `scatter-accumulate`（推梯度）替代集合通信，各设备按需独立发起通信
- **去中心化 PS 视角**：每个 GPU 同时扮演 Server（持有参数/优化器状态分片）和 Worker（执行前后向计算），无专用服务器节点
- **同步粒度放宽**：从逐层同步放宽到逐 minibatch 同步，中间各设备完全独立
- **训练语义不变**：每个 minibatch 结束时所有梯度正确聚合，数学上等价于标准 FSDP
- **负载均衡简化**：提出 LB-Mini 策略，在 minibatch 级别平衡负载，允许各设备处理不同数量的 microbatch
- **实现基础**：基于 RDMA（CUDA IPC 节点内 + NVSHMEM 跨节点）+ Triton-Distributed 构建
- **实验结果**：SFT 任务最高 36% 加速，RL 任务最高 10% 加速；加速比随序列长度增大、设备数增多而增大

#### 🔬 深入细节

##### 问题动机：FSDP 的同步瓶颈

在 LLM 后训练（SFT、RLHF/GRPO）中，训练样本的序列长度差异极大（如 LongAlign 数据集从数百到 64K tokens）。FSDP 在每一层的前向和反向传播中都需要执行集合通信：

- **前向**：All-Gather 收集完整参数 → 计算 → 丢弃
- **反向**：All-Gather 收集参数 + Reduce-Scatter 聚合梯度

这些集合操作要求所有设备同步参与，形成**逐层同步屏障**。当负载不均衡时，快设备必须等待慢设备，产生大量 bubble time。

形式化地，设 \(T_{m,d,l}(\mathcal{P}_M)\) 为设备 \(d\) 在 microbatch \(m\) 的第 \(l\) 层的执行时间，则 minibatch 总时间为：

$$T(\mathcal{P}_M) = \sum_{m=1}^{M} \sum_{l=1}^{L} \max_d T_{m,d,l}(\mathcal{P}_M)$$

由于 \(\max\) 操作在每层每个 microbatch 都出现，即使总负载均衡，逐层的不均衡仍会累积。

> 💡 关键洞察：数据并行中各设备的计算本质上是独立的，逐层同步是集合通信模型的产物，而非训练算法的必要条件。

##### ODC 核心机制

![ODC 架构示意图](https://raw.githubusercontent.com/sail-sg/odc/main/assets/odc.png)
*图：ODC 将 FSDP 重新解释为去中心化 Parameter Server，每个 GPU 同时是 Server 和 Worker*

**1. 通信原语替换**

| FSDP 集合通信 | ODC 点对点通信 | 说明 |
|---|---|---|
| All-Gather | Gather (pull) | Worker 从各 Server 拉取所需参数分片 |
| Reduce-Scatter | Scatter-Accumulate (push) | Worker 将梯度推送到对应 Server 并累加 |

**2. 去中心化 Parameter Server 架构**

```
┌─────────────────────────────────────────────────┐
│                    Device i                       │
├─────────────────────┬───────────────────────────┤
│   Server Role       │      Worker Role           │
│   ─────────────     │      ───────────           │
│   • 持有参数分片 θᵢ  │      • 前向/反向计算        │
│   • 持有优化器状态   │      • 按需 gather 参数     │
│   • 接收并累加梯度   │      • 完成后 scatter 梯度  │
│   • Minibatch 结束  │      • 独立推进各层计算      │
│     时执行优化器更新  │                            │
└─────────────────────┴───────────────────────────┘
```

**3. 同步粒度对比**

- **FSDP**：每层每个 microbatch 都同步（\(M \times L\) 个同步点）
- **ODC**：仅在 minibatch 结束时同步（1 个同步点）

ODC 下的 minibatch 时间变为：

$$T_{\text{ODC}}(\mathcal{P}) = \max_d \sum_{m=1}^{M_d} \sum_{l=1}^{L} T_{m,d,l}(\mathcal{P})$$

其中 \(M_d\) 是设备 \(d\) 的 microbatch 数（可以不同）。\(\max\) 仅出现一次，负载均衡更容易实现。

##### 实现细节

```python
# ODC 通信伪代码（简化）
# === Forward Pass (Worker side) ===
for layer_l in model.layers:
    # 按需从各 server 拉取该层参数分片
    for peer in all_devices:
        params_shard = rdma_gather(src=peer, layer=layer_l)  # 非阻塞 P2P
    full_params = concat(all_shards)
    output = layer_l.forward(input, full_params)
    del full_params  # 释放内存

# === Backward Pass (Worker side) ===
for layer_l in reversed(model.layers):
    # 拉取参数（同 forward）
    full_params = gather_all_shards(layer_l)
    grad = layer_l.backward(output_grad, full_params)
    # 将梯度分片推送到对应 server
    for peer in all_devices:
        rdma_scatter_accumulate(dst=peer, grad_shard=grad[peer])
    del full_params

# === Minibatch 结束 ===
barrier()  # 唯一的全局同步点
optimizer.step()  # 各 server 用累积梯度更新自己的参数分片
```

**RDMA 实现的关键特性：**

- **非侵入性**：gather/scatter-accumulate 通过 RDMA 单边操作完成，不中断目标设备的计算
- **节点内**：使用 CUDA IPC 实现 GPU 间直接内存访问
- **跨节点**：使用 NVSHMEM 提供 RDMA 语义
- **编程框架**：基于 Triton-Distributed，在 Python Triton kernel 中直接暴露 RDMA 功能

> ⚠️ 注意：跨节点场景下 ODC 的原始带宽低于 NCCL 集合通信（因缺少层次化优化），但长序列场景下计算量 \(O(s^2)\) 远大于通信量 \(O(s)\)，通信可被有效隐藏。

##### 负载均衡策略：LB-Mini

传统方法在 microbatch 级别平衡负载（LB-Micro），受限于：
1. 单 microbatch 容量有限，样本数少导致方差大
2. 激活内存 \(O(s)\) vs 计算量 \(O(s^2)\) 的不匹配，使得计算对齐在内存约束下不可行

ODC 的 LB-Mini 策略：
1. **Minibatch 级别分配**：将全局样本按总计算量均匀分配到各设备
2. **本地独立打包**：各设备独立将本地样本打包为 microbatch，仅受本地内存约束
3. **允许不等 microbatch 数**：各设备可处理不同数量的 microbatch

##### 实验结果摘要

| 场景 | 模型 | 数据集 | 最大加速比 | 说明 |
|---|---|---|---|---|
| SFT | 1.5B-32B | LongAlign (64K) | **36%** | 长序列 + packing 场景增益最大 |
| SFT | 1.5B-32B | SWE-Smith | ~20% | 中等长度序列 |
| RL (GRPO) | 1.5B-14B | AIME | **10%** | 受 verl 框架约束，分布不够长尾 |

**参数研究发现：**
- 加速比随**序列长度**增大而增大（\(O(s^2)\) 计算放大不均衡）
- 加速比随**设备数**增多而增大（更多设备 → 更大异构性）
- 加速比随 **packing ratio** 增大而减小（baseline 打包效率提升）
- 加速比在中等 **minibatch size** 时达到峰值

#### 🧪 练习题

```yaml
question: "ODC 相比标准 FSDP 的核心改进是什么？"
options:
  - "减少了模型参数量以降低通信开销"
  - "将逐层的集合通信同步屏障替换为按需点对点通信，放宽同步粒度到 minibatch 级别"
  - "使用模型并行替代数据并行以避免通信"
  - "通过梯度压缩减少通信数据量"
answer: 1
explain: "ODC 的核心是用 P2P 的 gather/scatter-accumulate 替代 All-Gather/Reduce-Scatter，消除逐层同步屏障，使各设备可独立推进计算，仅在 minibatch 结束时同步。"
```