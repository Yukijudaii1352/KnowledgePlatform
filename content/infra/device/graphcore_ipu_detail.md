### Graphcore IPU

```yaml
id: graphcore_ipu
name: Graphcore IPU
full_name: Graphcore智能处理单元 (Graphcore Intelligence Processing Unit)
year: '2019'
org: Graphcore
paper_url: —
category: emerging_chips
parent: —
motivation: MIMD架构片上300MB SRAM适合稀疏图计算
```

#### 📝 一句话总结

Graphcore IPU 提出面向机器智能的 many-tile MIMD 加速器，把计算核心、程序和本地 SRAM 绑定成大量独立 tile，并用显式 exchange fabric 连接，从而解决 GPU/SIMT 在不规则图计算、稀疏访问和细粒度模型并行上控制与数据移动不够灵活的问题。

#### 🎯 核心要点

- 2019 年公开 microbenchmark 论文主要分析 MK1 IPU：1,216 个 tile，每个 tile 有独立处理器、本地 SRAM 和独立指令流
- MK1 约 300 MB 级片上 SRAM 可由 \(1216 \times 256\text{KiB}\) 估算得到，符合条目 motivation 中的“片上300MB SRAM”
- 后续 Colossus MK2 GC200 扩展到 1,472 个 tile、每 tile 624 KB SRAM，总 In-Processor-Memory 接近 900 MB
- IPU 是分布式本地内存架构：tile 只能直接 load/store 自己的 SRAM，跨 tile 数据移动通过 IPU Exchange 显式完成
- 执行模型采用 Bulk Synchronous Parallel (BSP)：本地计算、全局同步、数据交换三阶段重复推进
- Poplar 编译器把计算图拆成 vertex/compute set，负责把变量、代码和通信边映射到 tile 和 exchange fabric
- 与 GPU 的 SIMD/SIMT 不同，IPU 的 MIMD tile 可以执行不同控制流，更适合稀疏图、动态图、短向量和非规则访问模式

#### 🔬 深入细节

##### 核心示意图

![Graphcore IPU internal architecture](https://docs.graphcore.ai/projects/ipu-programmers-guide/en/latest/_images/ipu.png)
*图：Graphcore 官方 IPU Programmer's Guide 的 IPU internal architecture。图中 tile 阵列、exchange fabric 和外部 Streaming Memory 共同构成 IPU 的执行与存储层次。*

##### 算法伪代码

```python
# Graphcore IPU/Poplar: BSP 风格的计算图执行
graph = poplar.Graph(target="IPU")
tiles = graph.tiles()

for op in model_graph.topological_order():
    place_variables(op.inputs, op.outputs, tiles)
    compute_set = create_vertices(op, mapped_tiles=tiles)
    exchange_plan = plan_cross_tile_copies(op, fabric="IPU-Exchange")
    program.append((compute_set, exchange_plan))

for step in training_or_inference_steps:
    for compute_set, exchange_plan in program:
        parallel_for tile in tiles:
            tile.run_local_vertices(compute_set[tile])  # 只访问本 tile SRAM

        global_sync_all_tiles()
        ipu_exchange.copy(exchange_plan)                # 显式跨 tile 搬运
```

##### 方法机制解读

Graphcore IPU 的设计出发点是：机器学习计算不只有大而密的 GEMM，也包含稀疏 embedding、图神经网络消息传递、动态控制流、短向量操作和大量小张量搬运。传统 GPU 为吞吐优化，强依赖 SIMT warp、层级缓存和大块连续数据；当任务变成许多互不相同的小计算和不规则通信时，线程发散、缓存失配和同步开销会明显上升。IPU 因此把芯片拆成大量独立 tile，每个 tile 有自己的程序、寄存器和 SRAM，形成硬件层面的 MIMD。

从存储模型看，IPU 的“片上 SRAM 很大”不是一个共享大缓存，而是很多独立本地内存。MK1 代的典型容量可近似为：

$$
C_{\text{MK1}} = 1216 \times 256\text{KiB} \approx 304\text{MiB}
$$

这解释了条目中的 300 MB SRAM；而 GC200 代则为：

$$
C_{\text{GC200}} = 1472 \times 624\text{KiB} \approx 897\text{MiB}
$$

这种设计让模型权重、激活、代码和临时状态尽量留在计算发生的 tile 上，换取低延迟和高带宽。但它也要求编译器精确决定变量放在哪个 tile，以及什么时候跨 tile 搬运。

IPU 的执行模型通常被描述为 BSP。每个 superstep 包含本地计算、同步和交换：

$$
T_{\text{program}}=\sum_{s=1}^{S}\left(\max_i C_{s,i}+E_s+B_s\right)
$$

其中 \(C_{s,i}\) 是第 \(s\) 个阶段中 tile \(i\) 的本地计算时间，\(E_s\) 是 exchange fabric 的数据移动时间，\(B_s\) 是同步屏障成本。这个公式说明 IPU 程序性能不是只看算术峰值，而取决于 tile 负载是否均衡、跨 tile 通信是否紧凑，以及 Poplar 是否能把数据布局规划到减少 \(E_s\) 和长尾 \(C_{s,i}\)。

对图神经网络或稀疏图算法，IPU 的直觉优势很清晰。设图消息传递为：

$$
h_v^{(t+1)}=\phi\left(h_v^{(t)},\sum_{u\in\mathcal{N}(v)}\psi(h_u^{(t)}, e_{u,v})\right)
$$

GPU 往往把许多边或节点塞进同一个 kernel 中，由 warp 处理不等长邻接表；邻居数量不均会造成分支发散和访存不连续。IPU 可以把不同节点/边分区到不同 tile，tile 在本地 SRAM 中维护节点状态，并在 exchange 阶段发送消息。只要图分区让高频邻接通信局部化，MIMD tile 就能以更自然的方式执行不规则工作。

Poplar 是这套硬件的关键一半。开发者看到的是计算图、vertex 和 tensor，编译器负责把它们变成 tile 上的代码、变量布局和 exchange 序列。与 GPU kernel 中大量运行时调度不同，IPU 尽量让通信在编译阶段显式化：每次变量从 tile A 到 tile B，都会变成 exchange 阶段的计划数据移动。这让性能更可预测，也让 profiling 能直接暴露哪个 superstep 的本地计算或跨 tile 拷贝成为瓶颈。

IPU 的代价同样来自这个设计。分布式 SRAM 容量很大但不可像统一内存那样随意寻址；跨 tile 数据必须通过同步和 exchange，过度细碎或错误分区会让通信吞掉收益。它适合的是能被拆成许多 tile-local 子任务、通信边可被编译器规划的工作负载，而不是所有 GPU 友好的大批量密集 GEMM 都会自动更快。

> 💡 关键：Graphcore IPU 的创新不只是“片上内存大”，而是把大内存拆到独立 MIMD tile 旁边，再用 BSP 和 Poplar 把计算图显式映射成本地计算与可预测交换。

#### 🧪 练习题

```yaml
question: "Graphcore IPU 为什么更适合某些稀疏图或不规则机器学习任务？"
options:
  - "大量 MIMD tile 可执行不同控制流，本地 SRAM 保存局部状态，跨 tile 通信由 exchange fabric 显式规划"
  - "所有 tile 共享一个透明 L3 缓存，因此无需考虑数据布局"
  - "它只支持一个全局 SIMD 指令流，所有核心必须执行完全相同的分支"
  - "它完全取消同步阶段，使任意跨 tile 访问都像本地 SRAM 一样便宜"
answer: 0
explain: "IPU 的 tile 拥有独立程序和本地内存，适合不规则子任务；但跨 tile 访问仍需要通过 BSP 的同步和 exchange 阶段显式完成。"
```
