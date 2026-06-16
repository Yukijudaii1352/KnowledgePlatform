### Colossal-AI

```yaml
id: colossal_ai
name: Colossal-AI
full_name: Colossal-AI
year: '2023'
org: HPC-AI Tech
paper_url: https://arxiv.org/abs/2110.14883
category: training_platform
parent: alpa
motivation: 统一的大规模并行训练系统
```

#### 📝 一句话总结

Colossal-AI 提出一个统一的大规模并行训练系统，把数据并行、流水线并行、多维张量并行、序列并行、ZeRO/异构内存管理和混合精度等能力组织成可组合的训练运行时，解决超大模型训练中“能并行但难组合、能省显存但难写代码”的工程问题。

#### 🎯 核心要点

- 统一系统抽象：用 parallel context、execution engine、trainer/hooks 管理复杂混合并行环境
- 多种并行原语：支持 data parallel、pipeline parallel、1D/2D/2.5D/3D tensor parallel、sequence parallel
- 增强 sharding/offloading：重设计 sharded tensor 接口，结合 PatrickStar 风格 chunk 管理提升带宽利用率并降低碎片
- 动态异构内存：Hybrid Adam 根据 GPU 可用空间动态决定 FP32 参数和梯度在 GPU/CPU 间的放置，而不是固定全部 offload
- 用户友好接口：通过配置和初始化接口把并行策略注入普通 PyTorch 训练循环，后续工程版本演化为 Booster/Plugin 风格
- 经验结论：多维张量并行在跨节点或非全互联 GPU 拓扑上比 1D tensor parallel 更容易降低通信组规模和显存压力

#### 🔬 深入细节

![Colossal-AI 系统架构](https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x1.png)
*图：Colossal-AI 论文 Figure 1，来源于 ar5iv 对 arXiv:2110.14883 的 HTML 渲染。*

```python
# Colossal-AI 论文 Listing 1 风格的训练流程伪代码
import colossalai

config = dict(
    parallel=dict(
        tensor=dict(size=4, mode="1d"),
        pipeline=dict(size=2),
        sequence=dict(enabled=True),
    ),
    fp16=dict(mode="amp"),
    zero=dict(stage=3, offload=True),
)

colossalai.launch_from_torch(config=config)

engine, trainloader, _ = colossalai.initialize(
    model=model,
    optimizer=optimizer,
    criterion=criterion,
    train_dataloader=trainloader,
)

for data, label in trainloader:
    engine.zero_grad()
    output = engine(data)
    loss = engine.criterion(output, label)
    engine.backward(loss)
    engine.step()
```

Colossal-AI 的出发点不是提出一种单点并行算法，而是把训练大模型时常见的多类手段放进同一个系统边界内。单纯数据并行会复制参数、梯度和优化器状态；单纯张量并行受限于高速互联范围；流水线并行需要切层和调度；ZeRO/offload 又会引入额外通信和 CPU-GPU 数据移动。Colossal-AI 的架构图把这些能力放到 parallel context、model builder、schedule、engine、trainer、hooks 等模块中，核心目标是让用户仍然按普通深度学习训练习惯写模型和训练循环，而并行语义由系统注入。

在张量并行部分，论文用 Transformer MLP 的矩阵乘说明 1D tensor parallel 的基本形态：

$$
Y = W_2 W_1 X
$$

如果在 \(N\) 个设备上切分 \(W_1\) 和 \(W_2\)，每个设备只保存约 \(1/N\) 的权重分片，但需要用 collective 通信聚合局部结果。1D 方案通常让一次 collective 覆盖全部参与设备，因此在单机 NVLink 全互联时很高效，但跨节点或部分互联拓扑上容易被低带宽链路拖慢。Colossal-AI 把 2D、2.5D、3D tensor parallel 也纳入同一系统：这些方案把计算设备组织成网格或立方体，通信只发生在行、列或子组内，用更多维度的切分换取更小的通信组和更低的单卡显存占用。系统层面的判断不是“某一种并行永远最好”，而是最小化每个 rank 的计算、通信与内存移动瓶颈：

$$
T_{\text{step}} \approx \max_r \left(T^{\text{compute}}_r + T^{\text{comm}}_r + T^{\text{memory}}_r\right)
$$

内存管理是 Colossal-AI 区别于只做模型切分系统的关键。以混合精度 Adam 为例，模型状态通常包含 FP16 参数、FP16 梯度、FP32 master weight、两个 FP32 动量项，显存近似随参数量 \(P\) 线性膨胀：

$$
M_{\text{Adam states}} \approx 2P + 2P + 4P + 8P = 16P\ \text{bytes}
$$

ZeRO 类方法把这些状态沿数据并行组分片，理想情况下单卡模型状态可降到约 \(1/D\)，其中 \(D\) 是数据并行规模：

$$
M_{\text{per GPU}} \approx \frac{M_{\text{params}} + M_{\text{grads}} + M_{\text{optimizer}}}{D} + M_{\text{activation}}
$$

论文进一步指出，普通按 tensor 粒度搬运状态会产生碎片和大量小通信，带宽利用率低。Colossal-AI 因此引入 chunk 思路，把初始化顺序相近的一组参数放入连续内存块，以 chunk 为单位进行通信、offload 和生命周期管理。这让许多小 tensor 的移动变成少量大块移动，减少 kernel launch 与内存碎片，同时更适合 PCIe、NVLink、RDMA 等链路的带宽特性。

增强 sharding/offloading 还体现在生命周期复用上。前向阶段需要 FP16 参数，反向阶段参数使用结束后会产生 FP16 梯度；Colossal-AI 允许在合适位置复用 FP16 参数存储来放置 FP16 梯度，从而降低峰值显存。Hybrid Adam 则避免 DeepSpeed ZeRO-Offload 中“FP32 master weight 全部放 CPU”的静态策略：如果 GPU 仍有空闲内存，系统会把一部分 FP32 参数和梯度保留在 GPU 上更新，只把必要部分移到 CPU。这个机制的直觉是：offload 节省显存但增加数据移动，静态 offload 可能浪费 GPU 空间；动态 placement 能在显存余量和通信成本之间取更好的折中。

与 Alpa 的自动搜索路线相比，Colossal-AI 更偏“统一训练平台 + 手动/配置化组合并行能力”。Alpa 试图在编译图上自动搜索 pipeline/tensor 计划，Colossal-AI 则强调可插拔模块、常用并行策略覆盖和 PyTorch 生态可用性。对工程用户来说，这种设计的价值在于降低采用门槛：同一个模型可以根据硬件拓扑选择 1D/2D/2.5D/3D 张量并行，根据模型深度选择流水线并行，根据显存压力启用 ZeRO、chunk、offload、activation checkpointing 和 AMP，而不是重写一套训练框架。

> 💡 关键：Colossal-AI 的核心贡献是把“并行策略选择”“模型状态生命周期”“通信组管理”“用户训练接口”放进同一个运行时，使大模型训练从手写分布式程序变成可配置、可组合的系统工程问题。

#### 🧪 练习题

```yaml
question: "Colossal-AI 为什么要在 ZeRO/offload 之外引入 chunk-based memory management？"
options:
  - "把多个小 tensor 组织成连续大块，降低碎片并提升通信/搬运带宽利用率"
  - "把模型参数全部复制到每张 GPU 上，减少通信"
  - "只为了改变模型的损失函数"
  - "让训练完全不需要数据并行"
answer: 0
explain: "chunk 以连续内存块为通信和生命周期管理单位，能减少小 tensor 通信和内存碎片；它与 ZeRO/offload 是互补关系。"
```
