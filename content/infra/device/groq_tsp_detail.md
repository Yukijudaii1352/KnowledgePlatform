### Groq TSP

```yaml
id: groq_tsp
name: Groq TSP
full_name: Groq张量流处理器 (Groq Tensor Streaming Processor)
year: '2020'
org: Groq
paper_url: https://ieeexplore.ieee.org/abstract/document/9138986/
category: emerging_chips
parent: —
motivation: 确定性调度取消缓存实现极低延迟推理
```

#### 📝 一句话总结

Groq TSP 提出了软件定义、确定性执行的张量流处理器，用 functionally-sliced 微架构、编译期静态调度和 producer-consumer stream 替代缓存、乱序和动态仲裁，解决 batch-1 推理中平均延迟和尾延迟不可预测的问题。

#### 🎯 核心要点

- ISCA 2020 论文《Think Fast: A Tensor Streaming Processor (TSP) for Accelerating Deep Learning Workloads》介绍首代 Groq TSP
- 微架构按功能切片而非传统 many-core tile 复制：MEM、VXM、MXM、SXM、ICU、C2C 等 slice 沿数据流方向组织
- 编译器提前分配资源、路由和每条指令的时间，使操作数与指令在确定时刻相遇
- 硬件尽量移除 reactive element，例如缓存、动态仲裁和不可预测调度，换取可计算的延迟
- producer-consumer stream programming model 让张量以 stream register/lanes 的形式穿过功能切片，被需要的 slice 拦截处理
- 首代公开实现为 25×29 mm、14nm、约 900 MHz 的 ASIC，官方介绍强调超过 1 TOPS/mm² 的计算密度
- 适合低批量、低尾延迟推理；代价是编译器必须拥有足够强的静态分析、排程和 kernel 映射能力

#### 🔬 深入细节

##### 核心示意图

![Groq TSP functional slice architecture](https://patentimages.storage.googleapis.com/f1/a0/cb/d090535dbbd678/US11360934-20220614-D00000.png)
*图：Google Patents 中 Groq 相关 Tensor Streaming Processor architecture 专利的功能切片示意图，展示传统 tiled processor 与 functional slice processor 的区别；论文机制依据 ISCA 2020 paper 和 Groq 官方页面整理。*

##### 算法伪代码

```python
# Groq TSP: 编译期生成确定性时间表，运行时按周期播放指令与张量流
schedule = groq_compiler.compile(model_graph)
# schedule 记录：每个 tensor 在哪个 MEM slice、哪个 stream id、哪个 cycle 到达哪个 functional slice

for cycle in range(schedule.total_cycles):
    for instruction in schedule.instructions_at(cycle):
        ICU.dispatch(instruction.slice_id, instruction.opcode, instruction.stream_id)

    for mem_event in schedule.memory_events_at(cycle):
        MEM[mem_event.slice].emit_stream(
            stream_id=mem_event.stream_id,
            direction=mem_event.direction,
            vector=mem_event.vector,
        )

    for stream in active_streams():
        next_slice = stream.advance_one_hop()
        if schedule.slice_intercepts(next_slice, stream, cycle):
            stream.vector = next_slice.execute(stream.vector)
```

##### 方法机制解读

Groq TSP 的目标不是做一个更复杂的 GPU，而是把神经网络推理变成可静态排程的数据流程序。传统 CPU/GPU 为通用性引入缓存、乱序执行、动态调度、仲裁器和运行时网络竞争，这些机制能提升平均吞吐，但会让某次请求到底走多少周期变得不完全可预测。低延迟推理，尤其是 batch-1 推理，关心的是一条请求的确定完成时间和尾延迟；TSP 因此把复杂度从硬件运行时转移到编译器。

functionally-sliced 是它最容易混淆也最重要的结构。传统 many-core 芯片把一个完整的小处理器复制成很多 tile，每个 tile 都带算术、访存和控制能力；TSP 则把相同功能的单元排成 slice，例如 MEM 负责 SRAM/stream，VXM 负责向量运算，MXM 负责矩阵乘，ICU 负责指令控制。张量数据沿东西方向流动，指令沿另一个方向进入 slice，编译器保证二者在第 \(t\) 个周期相遇。

对一个矩阵乘：

$$
Y_{m,n}=\sum_k X_{m,k}W_{k,n}
$$

Groq 不依赖运行时 cache miss 或 warp scheduler 去“碰运气”喂饱矩阵单元，而是在编译阶段决定 \(X\)、\(W\)、部分和分别从哪些 MEM slice 进入，以什么 stream id 穿过 VXM/MXM，以及每个周期应执行哪条指令。运行时看到的是已经排好的时间表：

$$
T_{\text{latency}}=\frac{N_{\text{scheduled cycles}}}{f_{\text{clock}}}
$$

只要输入形状和程序不变，\(N_{\text{scheduled cycles}}\) 就稳定，尾延迟也更容易被上层服务预算。

专利和论文都强调 stream register/lanes。可以把 TSP 的向量宽度抽象为：

$$
VL=N_{\text{superlanes}}\times M_{\text{lanes per superlane}}
$$

每条 stream 携带一组向量元素和方向，在功能切片之间向东或向西流动。某个 slice 可以让 stream 直通，也可以按指令拦截它执行 add、multiply、matrix accumulate、shift/rotate 或 memory read/write。由于 stream 的身份和到达时间由编译器维护，数据本身不需要携带大量元数据来说明“我该被谁处理”，这减少了硬件控制路径。

“取消缓存”不代表没有存储，而是取消不可预测的透明缓存层级。TSP 有高带宽片上 SRAM/MEM slice，但程序显式安排何时读、何时写、何时把数据作为 stream 送到计算 slice。这样做牺牲了一些动态适应能力：如果模型有很强的数据依赖、动态 shape 或分支，编译器要么生成多套 schedule，要么引入保守路径。但对于形状固定、延迟敏感的推理图，静态调度能避免 runtime jitter。

与 GPU 对比，TSP 的优势来自确定性而不只是峰值 TOPS。GPU 在大 batch dense GEMM 上极强，但 batch-1 服务常受 kernel launch、缓存状态、调度竞争和内存访问抖动影响。TSP 把网络层编译成一条跨功能切片的数据流流水线，硬件按周期执行，适合追求固定响应时间的在线推理。它的风险也相应明确：性能上限高度依赖编译器能否把模型算子、量化格式、内存布局和多芯片 C2C 通信一起排好。

> 💡 关键：Groq TSP 的“快”来自软件提前知道数据和指令何时何地相遇；硬件越少做动态猜测，延迟就越可预测。

#### 🧪 练习题

```yaml
question: "Groq TSP 取消传统缓存和动态仲裁的主要目的是什么？"
options:
  - "让编译器静态安排数据流和指令时刻，从而得到可预测的低延迟推理"
  - "让所有模型都必须在 CPU 上完成矩阵乘"
  - "提高缓存命中率并依赖运行时替换策略隐藏延迟"
  - "把张量流改成不可控制的随机路由"
answer: 0
explain: "TSP 通过软件定义 schedule，使数据和指令在确定周期相遇；移除缓存/仲裁器是为了减少运行时不可预测性和尾延迟。"
```
