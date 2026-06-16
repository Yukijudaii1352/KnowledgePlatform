### Cerebras WSE

```yaml
id: cerebras_wse
name: Cerebras WSE
full_name: Cerebras晶圆级引擎 (Cerebras Wafer-Scale Engine)
year: '2024'
org: Cerebras
paper_url: —
category: emerging_chips
parent: —
motivation: 整片晶圆单颗芯片85万核消除芯片间通信
```

#### 📝 一句话总结

Cerebras WSE 把通常会被切割成许多小芯片的 300 mm 晶圆做成单颗 AI 处理器，用数十万独立核心、分布式 SRAM 和全晶圆 2D fabric 解决 GPU 集群中芯片间通信、内存带宽和模型并行复杂度过高的问题。2024 年的 WSE-3 延续这一思路，而条目中的 85 万核指标对应 WSE-2 一代的典型公开规格。

#### 🎯 核心要点

- 晶圆级集成：WSE-2 约 46,000 mm²、2.6T 晶体管、850,000 个 AI 核心；WSE-3 在 2024 年公布为 5nm、约 4T 晶体管、900,000 个 AI 优化核心
- 每个核心附近放置本地 SRAM，WSE-2 总片上 SRAM 约 40 GB，避免把激活和中间状态频繁搬到外部 DRAM
- 全晶圆核心通过 2D mesh fabric 相连，每个核心路由器面向东西南北和本地核心，使用静态路由和虚拟通道颜色传输细粒度 wavelet
- 核心采用数据流调度，非零数据到达会触发相应任务，可天然跳过稀疏权重中的零元素
- Weight Streaming 把权重保存在外部 MemoryX，按层和按权重流入 WSE，计算完成后丢弃权重，反向传播时梯度流回外部更新
- SwarmX/多系统扩展主要做数据并行广播和梯度归约，减少传统 GPU 训练中复杂的 tensor/pipeline/model parallel 组合
- 主要优势来自“把通信留在晶圆上”：片内短线替代封装、板级和网络互联，降低延迟、功耗和分布式编程成本

#### 🔬 深入细节

##### 核心示意图

![Cerebras WSE-3 官方芯片图](https://cdn.sanity.io/images/e4qjo92p/production/f552d23b565912e206698908c746f5454f9516e8-1070x877.png)
*图：Cerebras WSE-3 官方产品页使用的远程图片。公开论文图较少，架构机制依据 Cerebras 官方 Architecture Deep Dive、Hot Chips 2022/2024 资料和 SDK 文档整理。*

##### 算法伪代码

```python
# Cerebras WSE: 权重流式进入晶圆，激活常驻/分布在 PE 网格上的稀疏 GEMM 数据流
mesh = place_activations_on_2d_wafer(batch, sequence, hidden)

for layer in transformer_layers:
    route_plan = compiler_static_routes(layer, mesh)

    for out_feature in layer.output_features:
        clear_partial_sums(mesh, out_feature)

        for in_feature, weight in MemoryX.stream_nonzero_weights(layer, out_feature):
            color = route_plan.weight_broadcast_color(in_feature)
            broadcast_wavelet(color, payload=(in_feature, weight, "FMAC"))

            parallel_for pe in mesh.receivers(color):
                x = pe.local_sram.read_activation(in_feature)
                pe.acc[out_feature] += weight * x

        broadcast_wavelet(route_plan.reduce_color(out_feature), payload=("PSUM", out_feature))
        reduce_partial_sums_across_rows_and_columns(mesh, out_feature)

    stream_gradients_back_to_MemoryX_if_training(layer)
```

##### 方法机制解读

Cerebras WSE 的核心动机是把大模型训练中最昂贵的通信路径从“跨芯片、跨板卡、跨交换机”改成“同一片硅上的短距离传输”。传统 GPU 集群需要把一个模型拆成数据并行、张量并行、流水并行甚至专家并行的组合，瓶颈往往不只是 FLOPS，而是参数、激活、梯度和 KV/中间张量在设备之间移动的成本。WSE 用整片晶圆保留 die 之间的金属互联，让 84 个左右的 reticle 区域在逻辑上形成一颗芯片，尽量把通信限制在片内 fabric。

每个 WSE 核心都带本地 SRAM、程序控制和 fabric router，因此它更接近超大规模分布式 dataflow 机器，而不是一个带共享缓存的大 GPU。对矩阵乘：

$$
Y_{b,s,j}=\sum_i X_{b,s,i}W_{i,j}
$$

WSE 会把 \((b,s,h)\) 等激活维度映射到二维核心网格上，让隐藏维、batch/sequence 维沿不同方向分布。权重按行或按块从 MemoryX 流入，匹配某个输入特征的核心列收到权重 wavelet 后执行 FMAC，本地累加部分和，随后通过 fabric 规约得到输出特征。若权重稀疏，实际计算可写成：

$$
Y_{b,s,j}=\sum_{i:W_{i,j}\ne 0} X_{b,s,i}W_{i,j}
$$

这说明零权重不需要触发计算和通信，稀疏性直接变成少发 wavelet、少做 FMAC。

数据流调度是 WSE 区别于 SIMD/SIMT GPU 的关键。GPU 通常让许多线程执行同一 kernel，并依赖寄存器、shared memory、cache 和调度器隐藏访存延迟；WSE 的核心则在收到带控制信息的 wavelet 时激活对应任务，任务运行到完成后硬件选择下一个可运行任务。Cerebras 文档把这些 wavelet 组织到不同颜色的虚拟通道中，静态路由让编译器提前知道数据会沿哪些链路流动，因此片内通信更可预测，也更容易把广播、规约和计算重叠起来。

片上 SRAM 容量可以用 WSE-2 的公开指标理解：

$$
C_{\text{SRAM}}\approx 850000 \times 48\text{KB}\approx 40\text{GB}
$$

这不是普通 GPU 那种小而快的片上缓存，而是分散在核心旁的工作存储。激活、中间状态和程序代码被放在使用它们的 PE 附近，避免把每层结果反复写回 HBM/DRAM。代价是编译器必须显式规划布局、路由和同步；收益是在数据复用和通信形态符合映射时，核心可以用很低的控制开销持续消耗本地数据。

Weight Streaming 解决了“模型参数大于片上 SRAM”的问题。WSE 不要求所有权重同时驻留在晶圆上，而是把权重保存在外部 MemoryX，按计算顺序流过晶圆；每个权重触发它负责的 AXPY/FMAC 风格操作，算完即可丢弃。训练时，反向传播产生的梯度再反向流回 MemoryX 更新。这样片上内存主要服务激活和部分和，模型规模由外部权重存储扩展；与 GPU 模型并行相比，它把许多分布式切分问题推给一个静态可分析的数据流计划。

WSE-3 的意义在于把这种架构继续推到 2024 年代际：更多晶体管、更多核心、更大片上 SRAM 和更高 AI 峰值吞吐。但精读时不应把“2024 WSE-3 的 900k 核”和条目 motivation 的“85 万核”混为同一代，后者是 WSE-2/CS-2 公开架构深度资料中的代表性数字。两代共同的本质创新不是某个单点规格，而是整片晶圆作为单个 dataflow fabric，尽可能取消传统多芯片 AI 系统的通信边界。

> 💡 关键：Cerebras WSE 的“消除芯片间通信”不是完全没有外部 I/O，而是把最频繁、最细粒度的神经网络通信放到晶圆内部，让外部系统主要承担权重流、host I/O 和数据并行归约。

#### 🧪 练习题

```yaml
question: "Cerebras WSE 用整片晶圆做一颗 AI 芯片的主要架构收益是什么？"
options:
  - "把大量核心、本地 SRAM 和 2D fabric 放在同一片硅上，降低细粒度模型通信的延迟和能耗"
  - "让所有权重必须永久存放在片上 SRAM 中，禁止外部权重存储"
  - "通过透明缓存自动解决所有数据布局问题，编译器不需要参与映射"
  - "把训练任务改成只在单个 CPU 核心上串行执行"
answer: 0
explain: "WSE 的核心优势是晶圆级片内通信和分布式本地存储；MemoryX 仍可外部保存并流式提供权重，编译器也必须规划布局与路由。"
```
