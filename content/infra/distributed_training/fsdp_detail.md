### FSDP — PyTorch 全分片数据并行

```yaml
id: fsdp
name: FSDP
full_name: "Fully Sharded Data Parallel (PyTorch FSDP)"
year: "2023"
org: Meta
paper_url: "https://arxiv.org/abs/2304.11277"
venue: VLDB 2023
category: infrastructure
parent: ZeRO
motivation: "PyTorch原生实现ZeRO风格全分片数据并行，通过FlatParameter抽象和通信-计算重叠实现大模型高效训练"
```

#### 📝 一句话总结

FSDP 是 PyTorch 原生实现的 ZeRO-3 风格全分片数据并行方案，通过 FlatParameter 抽象、灵活分片策略、通信-计算重叠及内存管理优化，实现了大模型训练的近线性扩展性（GPT-175B 在 512 A100 上达 60% MFU）。

#### 🎯 核心要点

- **FlatParameter 设计**：将 FSDP 单元内所有参数 flatten-concat 为单一连续张量，再按 rank 数均匀分片（chunk），使 AllGather/ReduceScatter 操作高效且均匀
- **三种分片策略**：通过分片因子 F 统一表达 Full Sharding(F=W)、Hybrid Sharding(1<F<W)、No Sharding(F=1)，Hybrid Sharding 利用网络拓扑局部性降低跨主机流量
- **通信-计算重叠**：使用独立 CUDA stream 发起 AllGather 绕过虚假依赖，配合 backward prefetching 实现 ~18% 加速
- **内存管理 Rate Limiter**：限制最多 2 个 inflight AllGather，防止 caching allocator 过度分配触发 cudaMalloc retry（T5-11B 上最高 5x 加速）
- **混合精度协同设计**：本地保留 full precision 分片，动态分配 low precision 未分片参数，实际降低峰值内存

#### 🔬 深入细节

![FSDP 架构示意图](https://arxiv.org/html/2304.11277v2/x1.png)
*图：FSDP 训练流程——每个 rank 仅持有参数分片，通过 AllGather 获取完整参数用于计算，ReduceScatter 规约梯度*

##### FSDP 算法总体流程

```python
# FSDP 核心训练循环伪代码
class FSDPUnit:
    def __init__(self, params, world_size, rank):
        # Flatten-concat all params into single contiguous tensor
        flat = torch.cat([p.detach().reshape(-1) for p in params])
        # Pad and chunk across ranks
        padded = pad_to_divisible(flat, world_size)
        self.local_shard = padded.chunk(world_size)[rank]  # size = Ψ/W

    def forward(self, x):
        # 1. AllGather: collect full FlatParameter from all ranks
        full_param = all_gather(self.local_shard)  # size = Ψ
        # 2. Reshape views back to original parameter shapes
        restore_param_views(full_param)
        # 3. Compute forward
        output = self.module(x)
        # 4. (Optional) Reshard: free non-local shards
        if reshard_after_forward:
            free(full_param)
        return output

    def backward(self, grad_output):
        # 1. AllGather (if resharded after forward)
        full_param = all_gather(self.local_shard)
        # 2. Compute backward, get full gradient
        full_grad = compute_grad(grad_output, full_param)
        # 3. ReduceScatter: reduce + shard gradient
        self.grad_shard = reduce_scatter(full_grad)  # size = Ψ/W
        # 4. Free non-local shards
        free(full_param)
```

##### 动机与背景

传统 DDP（DistributedDataParallel）在每个 rank 上复制完整模型，通过 AllReduce 同步梯度。当模型规模增长到数十亿参数时，单 GPU 无法容纳完整的参数 + 梯度 + 优化器状态（Adam 需要 16× 参数量的内存用于 fp32）。

ZeRO（Zero Redundancy Optimizer）提出将参数、梯度、优化器状态分片到不同 rank，按需通过通信重建。FSDP 是 PyTorch 对 ZeRO-3 的原生实现，但在设计上有本质区别：

> 💡 **关键区别**：ZeRO 使用 per-parameter 分片 + Broadcast/Gather，可能导致不均匀负载；FSDP 使用 FlatParameter（flatten-concat 后均匀 chunk），保证通信均匀且与框架内部深度集成。

##### FlatParameter 构造与内存分析

对于 N 个 FSDP unit（参数量分别为 \(\psi_1, ..., \psi_N\)），分片因子 F：

$$\text{常驻内存} = \frac{K_{full}}{F}\sum_{i=1}^{N}\psi_i$$

$$\text{峰值临时内存} = K_{low} \cdot \max_{i=1}^{N}\psi_i$$

$$\text{总峰值} = \frac{K_{full}}{F}\sum_{i=1}^{N}\psi_i + K_{low} \cdot \max_{i=1}^{N}\psi_i$$

其中 \(K_{full}\) 为 full precision 每参数字节数（如 fp32=4），\(K_{low}\) 为 low precision 字节数（如 bf16=2）。

> ⚠️ **权衡**：更细粒度的 FSDP unit 划分 → 更小的 max(ψ_i) → 更低峰值内存，但更多通信次数。

##### Hybrid Sharding 通信量分析

对于 W 个 GPU、每主机 G 个 GPU、模型大小 M：

| 策略 | 分片因子 F | 跨主机流量/GPU |
|------|-----------|----------------|
| Full Replication (DDP) | 1 | \(2M\frac{W-1}{W}\) |
| **Hybrid Sharding** | W/G | \(2M\frac{W-1}{GW}\) |
| Full Sharding | W | \(3M\frac{W-1}{W}\) |

Hybrid Sharding 将梯度规约分解为：先在分片组（同主机内）执行 ReduceScatter，再在复制组（跨主机）执行 AllReduce。AllGather/ReduceScatter 限制在高带宽的主机内网络，仅 AllReduce 跨主机。

##### 通信-计算重叠机制

**问题**：ProcessGroupNCCL 在发起 collective 前会同步 current stream → 如果在 default stream 发起 AllGather，必须等前序计算完成。

**解决方案**：使用独立 CUDA stream 发起 AllGather，绕过对 default stream 的虚假依赖：

```
Default Stream: [Compute_i] ─────────── [Compute_{i+1}] ──────────
AllGather Stream:    [AG_{i+1}] ─────────────── [AG_{i+2}] ──────
                     ↑ 不等待 Compute_i          ↑ sync point
```

**Backward Prefetching**（~18% 加速）：改变通信顺序，先发下一个 AllGather 再做当前 ReduceScatter：

$$\text{Without: } [Bwd_i] \to [RS_i] \to [AG_{i+1}] \to [Bwd_{i+1}]$$
$$\text{With: } [Bwd_i] \to [AG_{i+1}] \to [RS_i] \to [Bwd_{i+1}]$$

AG 和 RS 在同一 NCCL stream 中顺序执行但可与计算重叠，且 AG 完成后 backward 可立即开始。

##### Rate Limiter 内存管理

快速 CPU 线程会不断发起 AllGather 分配 GPU 内存，而 GPU 执行滞后导致 caching allocator 无法重用已完成的 block → 触发 cudaMalloc retry（blocking cudaFree 序列）。

Rate Limiter 限制最多 2 个 inflight AllGather（当前执行 + 下一个预取），通过阻塞 CPU 线程实现。判断是否需要启用的指标：`torch.cuda.memory_stats()['num_alloc_retries']`。

##### 大模型初始化 - Deferred Initialization

```python
# 传统方式: 需要完整模型内存 → OOM
model = GPT175B()  # 需要 ~700GB (fp32 params + optimizer)

# FSDP Deferred Init: meta device + record-replay
with torch.device("meta"):       # 零内存，仅记录 tensor metadata
    model = GPT175B()
fsdp_model = FSDP(model)         # 仅物化本 rank 的 1/W 分片
```

##### 实验关键结果

- **GPT-175B**：128→512 A100 线性扩展，达 173-186 TFLOPS/GPU（55-60% MFU）
- **T5-11B**：8→512 GPU 仅 7% 性能回退；DDP 在 >2.28B 模型 OOM
- **Backward prefetching**：GPT-175B 上 ~18% 加速，跨集群规模一致
- **Rate limiter**：T5-11B 上最高 5x 加速（存在 cudaMalloc retry 时）

##### 已知限制

1. **数学等价性**：Optimizer step 在分片参数上执行，FlatParameter 分片不尊重原始参数边界 → 依赖参数整体值的优化器（如 vector norm）会产生不等价结果
2. **共享参数**：共享参数必须属于最低公共祖先 FSDP unit，否则 reshard 后无法访问

#### 🧪 练习题

```yaml
question: "FSDP 的 Backward Prefetching 优化为什么能带来约 18% 的加速？"
options:
  - "它减少了 AllGather 通信的数据量"
  - "它将下一个 FSDP unit 的 AllGather 提前到当前 ReduceScatter 之前发起，使两者可重叠执行"
  - "它跳过了 ReduceScatter 操作直接使用 AllReduce"
  - "它将 forward pass 和 backward pass 的通信合并为一次"
answer: 1
explain: "Backward Prefetching 改变通信顺序：先发起下一个 unit 的 AllGather，再执行当前 unit 的 ReduceScatter。由于两者在同一 NCCL stream 中顺序执行但可与计算重叠，避免了连续两次通信暴露在关键路径上。"
```