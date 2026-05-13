### FSDP — 全分片数据并行 (Fully Sharded Data Parallel)

```yaml
id: fsdp
name: FSDP
full_name: "全分片数据并行 (Fully Sharded Data Parallel)"
year: "2023"
org: "Meta (PyTorch)"
paper_url: "https://arxiv.org/abs/2304.11277"
category: "distributed_training"
parent: "ZeRO"
motivation: "将 ZeRO-3 参数分片策略原生集成到 PyTorch 中，通过 FlatParameter 抽象和灵活分片因子实现大模型高效训练"
```

#### 📝 一句话总结

FSDP 将 ZeRO-3 的参数、梯度、优化器状态分片策略原生集成到 PyTorch 的 `nn.Module` 和 Autograd 引擎中，通过 `FlatParameter` 抽象将多个参数 flatten-concat 后按分片因子 \(F\) 切分到各 GPU，在前向/反向时动态 AllGather 恢复完整参数并用 ReduceScatter 聚合梯度，配合通信-计算重叠、backward prefetch 和 rate limiter 等优化，实现了从数百 M 到 1T+ 参数模型的高效可扩展训练。

#### 🎯 核心要点

- **PyTorch 原生 ZeRO-3 实现**：作为 `FullyShardedDataParallel` 模块包装器，无需修改模型代码即可替换 DDP
- **FlatParameter 抽象**：将一组参数 flatten → concat → chunk，形成单一连续张量进行分片和通信，减少通信次数
- **灵活分片因子 \(F\)**：\(F=1\) 为纯复制（等价 DDP），\(F=N\) 为全分片（ZeRO-3），\(1<F<N\) 为混合分片（Hybrid Sharding），在内存与通信间灵活权衡
- **通信策略**：前向 AllGather 恢复参数 → 计算 → 释放；反向 AllGather 恢复参数 → 计算梯度 → ReduceScatter 聚合梯度分片
- **通信-计算重叠**：使用独立 CUDA stream 执行集合通信，与计算 stream 并行；backward prefetch 在当前 ReduceScatter 之前发起下一个 AllGather
- **Rate Limiter**：限制 AllGather 预取数量，防止 CUDA caching allocator 在多 stream 场景下过度分配导致 OOM
- **原生混合精度**：分片参数保持全精度，动态 AllGather 的 unsharded 参数使用低精度，实际降低峰值内存
- **Autograd 集成**：通过 `nn.Module` 前向/后向 hook、`AccumulateGrad` hook 和 `queue_callback` 非侵入式嵌入训练流程
- **实验验证**：在 T5-11B、GPT-175B、DHEN-768B 上验证，backward prefetch 带来约 18% 加速，可扩展至 512 GPU

#### 🔬 深入细节

##### 核心架构图

![FSDP Algorithm Overview](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x1.png)
*图 1：FSDP 算法总览 — 展示了前向 AllGather、计算、反向 AllGather + ReduceScatter 的完整流程*

![Full Sharding Across 16 GPUs](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x4.png)
*图 3：全分片策略（F=N=16）— 每个 GPU 仅持有 1/16 的参数分片*

![Hybrid Sharding on 16 GPUs](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x5.png)
*图 4：混合分片策略（F=8）— 16 个 GPU 分为 2 个分片组，组内分片、组间复制*

![Overlap Communication and Computation](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x6.png)
*图 5：通信与计算重叠 — 独立 CUDA stream 使 AllGather/ReduceScatter 与前向/反向计算并行*

##### 算法伪代码

```python
# FSDP 核心训练流程伪代码
# 初始化：将模型参数按 FSDP unit 分组，每组 flatten-concat-chunk 为 FlatParameter
# N 个 GPU，分片因子 F，每个 GPU 持有 1/F 的参数分片

for batch in dataloader:
    # ========== Forward Pass ==========
    for fsdp_unit in model.fsdp_units_forward_order():
        # 1. AllGather: 从 F 个 rank 收集完整参数
        full_param = all_gather(fsdp_unit.flat_param_shard, group=shard_group)  # 在通信 stream
        fsdp_unit.unflatten_params(full_param)  # 恢复原始参数形状（视图）
        
        # 2. Forward 计算（在计算 stream）
        output = fsdp_unit.forward(input)
        
        # 3. 释放 unsharded 参数（仅保留本地分片）
        if reshard_after_forward:
            free(full_param)
    
    # ========== Backward Pass ==========
    for fsdp_unit in model.fsdp_units_backward_order():
        # 1. AllGather: 重新收集完整参数（若前向后已释放）
        full_param = all_gather(fsdp_unit.flat_param_shard, group=shard_group)
        fsdp_unit.unflatten_params(full_param)
        
        # 2. Backward prefetch: 提前发起下一个 unit 的 AllGather
        next_unit = get_next_backward_unit()
        prefetch_all_gather(next_unit.flat_param_shard)  # 异步，在通信 stream
        
        # 3. 计算梯度
        grad = backward(output, full_param)
        
        # 4. 释放 unsharded 参数
        free(full_param)
        
        # 5. ReduceScatter: 梯度先 reduce 再 scatter，每个 rank 得到 1/F 梯度分片
        grad_shard = reduce_scatter(grad, group=shard_group)
        fsdp_unit.flat_param_shard.grad = grad_shard
    
    # ========== Optimizer Step ==========
    optimizer.step()  # 每个 rank 仅更新自己持有的 1/F 参数分片
```

##### 动机与背景

传统的分布式数据并行（DDP）在每个 GPU 上维护完整的模型副本，仅在反向传播后通过 AllReduce 同步梯度。当模型参数量增大时，每个 GPU 需要存储完整的参数（\(\Psi\)）、梯度（\(\Psi\)）和优化器状态（如 Adam 需要 \(2\Psi\) 额外状态），总内存占用为 \(4\Psi\)（FP32 下为 \(16\Psi\) 字节）。对于 GPT-175B 等超大模型，单卡 80GB 显存远远不够。

DeepSpeed ZeRO 提出了参数分片的思路，将参数、梯度和优化器状态分散到多个 GPU 上。但 ZeRO 作为独立框架，与 PyTorch 的 `nn.Module`、Autograd 引擎和 `torch.optim` 的集成不够紧密，存在兼容性和维护性问题。

> 💡 **关键动机**：FSDP 的目标是将 ZeRO-3 的内存优化策略**原生集成到 PyTorch 中**，使其成为 PyTorch 分布式训练的一等公民，同时保持与现有 PyTorch 生态（Module hooks、Autograd、优化器、混合精度等）的完全兼容。

##### FlatParameter：核心数据抽象

FSDP 的核心创新之一是 `FlatParameter` 抽象。对于一个 FSDP unit（通常对应一个 `nn.Module` 子树），其所有参数按以下步骤处理：

1. **Flatten**：将每个参数张量展平为一维向量
2. **Concat**：将所有展平后的参数拼接为单一连续张量
3. **Chunk**：按分片因子 \(F\) 将拼接后的张量均匀切分，每个 rank 持有第 \(k\) 个分片

$$\text{FlatParameter} = \text{concat}(\text{flatten}(p_1), \text{flatten}(p_2), \ldots, \text{flatten}(p_m))$$

每个 rank \(k\) 持有的分片为：

$$\text{shard}_k = \text{FlatParameter}\left[\frac{k \cdot |\text{FlatParameter}|}{F} : \frac{(k+1) \cdot |\text{FlatParameter}|}{F}\right]$$

> 💡 **设计优势**：FlatParameter 将多个小参数合并为一次大的 AllGather 通信，显著减少通信启动开销（latency-bound → bandwidth-bound）。同时，unsharded 后的完整 FlatParameter 通过 `torch.Tensor.view` 创建原始参数形状的视图，无需额外内存拷贝。

##### 分片策略与通信分析

FSDP 通过分片因子 \(F\)（\(1 \leq F \leq N\)，\(N\) 为总 GPU 数）统一描述不同分片策略：

| 策略 | 分片因子 | 内存（参数+梯度+优化器） | 通信量 | 等价方案 |
|------|---------|------------------------|--------|---------|
| 无分片（DDP） | \(F=1\) | \(4\Psi\) | \(2\Psi\)（AllReduce） | PyTorch DDP |
| 全分片 | \(F=N\) | \(\frac{4\Psi}{N} + \text{peak}\) | \(3\Psi\)（2×AG + RS） | ZeRO-3 |
| 混合分片 | \(1<F<N\) | \(\frac{4\Psi}{F} + \text{peak}\) | \(\frac{3\Psi \cdot F}{N} + 2\Psi \cdot \frac{N-F}{N}\) | ZeRO++ / MiCS |

全分片（\(F=N\)）的通信量为 DDP 的 1.5 倍：前向一次 AllGather（\(\Psi\)）、反向一次 AllGather（\(\Psi\)）和一次 ReduceScatter（\(\Psi\)），总计 \(3\Psi\)，而 DDP 仅需一次 AllReduce（\(2\Psi\)）。

> ⚠️ **注意**：虽然全分片通信量增加 50%，但通过通信-计算重叠可以大幅隐藏这部分开销。在实践中，对于计算密集的大模型（如 Transformer），通信往往可以被完全重叠。

混合分片（Hybrid Sharding）将 \(N\) 个 GPU 划分为 \(N/F\) 个分片组，组内执行 AllGather/ReduceScatter（分片），组间执行 AllReduce（复制）。这在节点内使用高带宽 NVLink 分片、节点间使用较低带宽网络复制时特别有效。

##### 通信-计算重叠机制

FSDP 使用独立的 CUDA stream 执行集合通信操作，与计算 stream 并行执行：

1. **前向传播**：在通信 stream 上发起当前 FSDP unit 的 AllGather，完成后在计算 stream 上执行前向计算。可选的 **forward prefetch** 在当前计算完成前提前发起下一个 unit 的 AllGather。

2. **反向传播**：关键优化是 **backward prefetch** — 在发起当前 unit 的 ReduceScatter 之前，先发起下一个 unit 的 AllGather。这避免了两个连续的暴露通信调用（RS 后接 AG），使得 RS 和下一个 AG 可以在通信 stream 上背靠背执行，而计算 stream 同时处理当前梯度。

> 💡 **Backward Prefetch 的关键洞察**：在 eager execution 模式下，反向传播的执行顺序在编译时未知。FSDP 通过在每次前向传播时记录模块执行顺序，然后在反向传播时使用其逆序作为 prefetch 的依据。这个顺序每次迭代都会刷新，因此天然兼容动态计算图。

##### 内存管理：Rate Limiter

PyTorch 的 CUDA caching allocator 为每个 stream 独立分配内存块。当 CPU 线程远超 GPU 执行进度时，通信 stream 上的 AllGather 会预分配大量 unsharded 参数的内存块，而这些块无法被计算 stream 复用（跨 stream 无法安全复用未完成的块）。这导致：

1. 通信 stream 过度占用显存
2. 计算 stream 无法分配 activation 所需内存
3. 触发 `cudaMalloc retry`（阻塞式 `cudaFree` 序列），严重降低吞吐

FSDP 的 **Rate Limiter** 限制同时处于 inflight 状态的 AllGather 数量（即限制同时 unsharded 的 FlatParameter 数量），确保通信预取不会耗尽计算所需的显存。

##### 与 PyTorch Autograd 的集成

FSDP 通过四类 hook 非侵入式地嵌入 PyTorch 训练流程：

1. **`nn.Module` 前向 hook**（`register_forward_pre_hook` / `register_forward_hook`）：在前向计算前发起 AllGather，计算后释放 unsharded 参数
2. **`Tensor` hook**（`register_hook`）：注册在每个 FSDP unit 的前向输出张量上，当反向传播到达该张量时触发 AllGather
3. **`AccumulateGrad` hook**：注册在每个 FlatParameter 的梯度累积节点上，梯度就绪后立即发起 ReduceScatter（比 Tensor hook 更高效，无需等待输入 activation 的梯度计算）
4. **`queue_callback`**：在整个反向传播结束前等待所有 pending 通信完成，确保后续优化器步骤不会读取到未完成的梯度

##### 原生混合精度的内存优势

传统混合精度需要同时维护低精度和全精度参数副本，内存从 \(K_{\text{full}} \cdot \Psi\) 增加到 \((K_{\text{low}} + K_{\text{full}}) \cdot \Psi\)。但 FSDP 的设计天然规避了这个问题：

- **本地分片**始终以全精度 \(K_{\text{full}}\) 存储（\(\frac{\Psi}{F}\) 大小）
- **动态 AllGather 的 unsharded 参数**以低精度 \(K_{\text{low}}\) 分配（\(\max_i \psi_i\) 大小）

因此参数峰值内存从 \(\frac{K_{\text{full}}}{F}\sum\psi_i + K_{\text{full}}\max\psi_i\) **降低**为 \(\frac{K_{\text{full}}}{F}\sum\psi_i + K_{\text{low}}\max\psi_i\)，混合精度在 FSDP 下反而节省内存。

#### 🧪 练习题

```yaml
question: "FSDP 全分片策略（F=N）相比 DDP 的通信量变化是？"
options:
  - "通信量相同，均为 2Ψ"
  - "通信量增加到 3Ψ，为 DDP 的 1.5 倍"
  - "通信量减少到 Ψ，因为只需 ReduceScatter"
  - "通信量增加到 4Ψ，为 DDP 的 2 倍"
answer: 1
explain: "全分片需要前向 AllGather(Ψ) + 反向 AllGather(Ψ) + ReduceScatter(Ψ) = 3Ψ，而 DDP 仅需 AllReduce(2Ψ)，因此是 1.5 倍。但通过通信-计算重叠可以隐藏大部分开销。"
```