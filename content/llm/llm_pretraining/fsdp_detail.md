### FSDP

```yaml
id: fsdp
name: FSDP
full_name: FSDP (Fully Sharded Data Parallel)
year: '2023'
org: Meta
paper_url: https://arxiv.org/abs/2304.11277
category: distributed
parent: zero
motivation: PyTorch原生完全分片数据并行
```

#### 📝 一句话总结

FSDP 将 ZeRO-3 风格的参数、梯度和优化器状态完全分片做成 PyTorch 原生训练机制，通过按 FSDP unit 临时 all-gather、计算后释放、反向 reduce-scatter，让大模型以接近 DDP 的使用体验在更小单卡显存上训练。

#### 🎯 核心要点

- FSDP 把模型拆成多个 FSDP unit，每个 unit 内参数被展平为 FlatParameter 并均匀切成 rank 分片
- 前向/反向只 materialize 当前 unit 的完整参数，其余 unit 常驻为 sharded parameter
- 反向结束时对 FlatParameter gradient 执行 ReduceScatter，使每个 rank 只保存梯度分片，optimizer states 也保持分片
- 支持 full sharding、hybrid sharding 和 full replication，通过 sharding factor 在显存节省与通信开销之间调节
- 使用 deferred initialization 在 fake device 上记录初始化，再按 unit 在真实 GPU 上初始化和分片，降低超大模型初始化峰值显存
- 通信优化包括单独 CUDA stream 上的 AllGather、backward prefetch、forward prefetch、gradient accumulation 选项和 caching allocator rate limiter
- PyTorch 实现通过 autograd-visible views 和 hooks 接入原生 autograd，尽量保持用户模型代码和训练语义不变

#### 🔬 深入细节

![FSDP 算法总览](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x1.png)
*图：FSDP 论文 Figure 1，模型被拆成多个 FSDP unit；每个 unit 在前向/反向前收集完整参数，计算后释放非本地分片。*

![FlatParameter 完全分片](https://ar5iv.labs.arxiv.org/html/2304.11277/assets/x4.png)
*图：FSDP 论文 Figure 3，原始参数被 flatten/concat/pad 成 FlatParameter，再按 sharding group 均匀切分。*

```python
# FSDP 单步训练核心逻辑伪代码
def fsdp_train_step(fsdp_units, batch, optimizer):
    x = batch

    # Forward: 每个 unit 只在执行时 all-gather 完整参数
    for unit in fsdp_units:
        unit.full_param = all_gather(unit.flat_param_shard)
        unit.install_param_views(unit.full_param)
        x = unit.forward(x)
        unit.free_peer_param_shards()       # 保留本地 shard，释放临时收集的 peer shards

    loss = compute_loss(x)

    # Backward: 按反向顺序重新 materialize 参数并规约梯度
    grad = loss_grad(loss)
    for unit in reversed(fsdp_units):
        unit.full_param = all_gather(unit.flat_param_shard)
        unit.install_param_views(unit.full_param)
        grad = unit.backward(grad)
        unit.free_peer_param_shards()
        unit.grad_shard = reduce_scatter(unit.flat_param_grad)

    # Optimizer states 始终分片；每个 rank 只更新自己的 FlatParameter shard
    for unit in fsdp_units:
        optimizer.step(
            param_shard=unit.flat_param_shard,
            grad_shard=unit.grad_shard,
            optim_state_shard=unit.optim_state_shard,
        )
```

**动机与背景：FSDP 的目标是把完全分片数据并行变成 PyTorch 的工业级默认能力。** DDP 的问题很直接：每个 rank 都要放完整参数、完整梯度和完整优化器状态，模型稍大就会触发 OOM。ZeRO-3 证明了完全分片可行，但在框架层面要处理初始化、autograd、通信调度、CUDA allocator、动态图等大量工程细节。FSDP 论文的贡献不是提出新的优化目标，而是把“完全分片 + 按需 materialization”系统性集成进 PyTorch。

**FSDP unit 是显存峰值和通信效率的核心粒度。** 模型被包装成多个 FSDP unit，每个 unit 的参数被拼接成一个 FlatParameter。设模型总元素数为 \(\Psi\)，第 \(i\) 个 FlatParameter 大小为 \(\psi_i\)，sharding factor 为 \(F\)，则参数相关峰值近似包含两部分：

$$
O\left(\sum_i \frac{\psi_i}{F} + \max_i \psi_i\right)
$$

第一项是所有 unit 的常驻本地分片，第二项是当前被 all-gather 出来的最大完整 unit。unit 划得越细，峰值显存越低，但 collective 次数更多；unit 划得越粗，通信更高效但需要更大瞬时显存。因此 FSDP 的 auto-wrap/manual-wrap 本质上是在调这个 memory-throughput trade-off。

**FlatParameter 让通信更接近 NCCL 的高效路径。** 原始模型参数形状不一，直接对每个小 tensor all-gather/reduce-scatter 会产生大量小 collective 和不均匀输入。FSDP 将一个 unit 内参数 flatten、concat，并 padding 到可被 sharding factor 整除，随后每个 rank 持有等长 chunk。这样 unsharded FlatParameter 和 sharded FlatParameter 的布局天然匹配 AllGather 和 ReduceScatter，减少额外 copy，也避免小消息通信启动开销过高。

**训练流程与普通本地训练等价，但参数生命周期不同。** 前向进入某个 unit 前，FSDP all-gather 完整 FlatParameter，并把原始参数设置为其 view；计算完成后释放 peer shards，只留下本地分片。反向到达该 unit 前再次 all-gather，autograd 写入完整 FlatParameter gradient，unit 结束后用 ReduceScatter 求和并切回梯度分片。优化器只看本地 param/grad/state shard，因此 optimizer states 不需要完整 materialize。

**通信重叠和 prefetch 是 FSDP 能接近 DDP 性能的关键。** FSDP 的 full sharding 会引入比 DDP 更多的 AllGather/ReduceScatter，论文指出 ring 算法下 full sharding 通信量可达到 DDP 的约 1.5x。为了减少暴露在 critical path 上的时间，FSDP 在单独 CUDA stream 上发 AllGather，避免 default stream 的伪依赖；backward prefetch 根据记录到的 forward order 预测反向顺序，在当前 ReduceScatter 前提前发起下一个 AllGather；forward prefetch 则面向静态图和较慢 CPU 调度场景，提前填充 NCCL stream。

**FSDP 的工程难点还包括初始化和内存分配器行为。** 超大模型不能先在一张 GPU 上完整初始化再分片，因此 FSDP 支持 deferred initialization：在 fake device 上创建参数并记录初始化操作，包装后逐个 unit 在真实 GPU 上 materialize、replay 初始化、再分片。另一方面，AllGather 目标 tensor 常在 producer stream 分配，计算在 consumer stream 使用；CPU 若跑得过快，PyTorch caching allocator 可能无法复用已有 block，引发 cudaMalloc retry。FSDP 的 rate limiter 限制最多两个 inflight AllGather，在保持重叠的同时降低分配器峰值压力。

> 💡 关键：FSDP 的“fully sharded”不是把计算也切碎，而是让每个 rank 在计算当前 unit 时临时拥有完整参数；这保留了本地算子语义，也把常驻显存压到分片级别。

#### 🧪 练习题

```yaml
question: "FSDP 中 FlatParameter 的主要作用是什么？"
options:
  - "把多个参数展平拼接后均匀分片，提升 AllGather/ReduceScatter 的通信效率"
  - "把模型层改写成流水线并行 stage"
  - "把激活值压缩成低精度格式"
  - "替代 autograd 计算梯度"
answer: 0
explain: "FlatParameter 统一参数布局并保证分片大小均匀，使 FSDP 可以用高效 collective 通信，同时减少小 tensor 通信开销。"
```
