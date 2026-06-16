### Habana Gaudi

```yaml
id: habana_gaudi
name: Habana Gaudi
full_name: Habana高迪处理器 (Habana Gaudi Processor)
year: '2020'
org: Intel/Habana
paper_url: https://ieeexplore.ieee.org/abstract/document/9018203/
category: npu_asic
parent: —
motivation: 集成10×100GbE以太网支持RDMA横向扩展
```

#### 📝 一句话总结

Habana Gaudi 是面向深度学习训练的专用处理器，用 MME 矩阵引擎、可编程 TPC 张量核心和片上 10×100GbE RoCE 网络接口组合成计算/通信一体化架构。它解决了多加速器训练中计算芯片与外部网络解耦导致的扩展成本和通信瓶颈问题。

#### 🎯 核心要点

- 采用异构计算架构，MME 负责 GEMM/卷积主计算，TPC 负责非矩阵张量算子和自定义内核
- 每颗芯片集成 10 个 100GbE RoCE v2 端口，可直接进行 RDMA 通信
- HLS-1 训练服务器使用 8 颗 Gaudi，服务器内通过 Gaudi 端口组成全互联拓扑
- 支持 BF16/FP32 等训练数据类型，面向数据中心训练而非单纯推理
- 片上 SRAM、DMA 和 HBM2 组成显式数据路径，服务 MME/TPC 之间的计算流水
- SynapseAI 软件栈负责图编译、算子映射、运行时调度和 PyTorch/TensorFlow 集成
- 核心差异化不只是矩阵吞吐，而是用标准以太网实现低成本横向扩展

#### 🔬 深入细节

##### 核心示意图

![Habana HLS-1 Gaudi 训练系统](https://mma.prnewswire.com/media/903247/HLS_1_Open_Overhead_View_smaller.jpg?p=publish)
*图：Habana 发布的 HLS-1 Gaudi 训练系统公开图片，展示 8 卡服务器形态；来源为 Habana Labs/PRNewswire 官方发布材料。*

![Intel Gaudi 系列高层架构图](https://docs.habana.ai/en/latest/_images/Gaudi2_Processor_High_Level_Architecture.png)
*图：Intel Gaudi 官方文档中的 Gaudi 系列高层架构图；第一代 Gaudi 与后续 Gaudi2/3 共享 MME、TPC、片上网络和存储协同的架构思想，但端口数量与单元规模不同。*

##### 算法伪代码

```python
# Gaudi 数据并行训练中的计算-通信重叠伪代码
for step, batch in enumerate(loader):
    activations = mme_tpc_forward(model, batch)
    gradients = mme_tpc_backward(model, activations)

    for chunk in shard(gradients):
        rdma_reduce_scatter_async(chunk, ports="10x100GbE RoCE")
        mme_tpc_compute_next_chunk_if_ready()

    averaged = rdma_allgather_async(gradients)
    optimizer_update(model, averaged)
```

Gaudi 的设计动机来自训练系统而不是单芯片 benchmark。深度学习训练的 step time 通常由两部分构成：本地前向/反向计算，以及跨设备梯度同步。数据并行训练中的梯度平均可以写成：

$$g=\frac{1}{P}\sum_{p=1}^{P}g_p$$

当 \(P\) 增大时，通信成本会快速侵蚀计算加速收益。传统 GPU 集群通常依赖外部 NIC、PCIe、InfiniBand 交换机或专有互联来做 AllReduce；Gaudi 则把 100GbE RoCE 网络接口直接集成进训练处理器，让芯片本身成为计算节点和网络节点。

计算侧由 MME 和 TPC 分工。MME 面向矩阵乘、卷积和 attention 中的 GEMM，是高吞吐主引擎；TPC 是可编程 VLIW/SIMD 张量处理核心，负责激活、归一化、shape 处理、数据类型转换和难以落入固定矩阵阵列的自定义算子。一个训练 layer 往往会先由 MME 产生矩阵结果，再由 TPC 做后处理，二者通过片上 SRAM、DMA 和 HBM2 交换数据。

通信侧的关键是 10×100GbE RoCE v2。第一代 Gaudi 的 HLS-1 服务器中，8 颗 Gaudi 可使用部分端口构成服务器内全互联，其余端口连接外部以太网交换机做跨服务器扩展。这样做的工程意义很直接：服务器内 AllReduce 可以走直连链路，跨服务器通信仍复用标准以太网生态，避免把系统扩展完全绑定到昂贵的专有网络。

计算-通信重叠是 Gaudi 架构能否发挥价值的核心机制。理想情况下，一个训练 step 的时间近似为：

$$T_{\text{step}}\approx \max(T_{\text{compute}},T_{\text{communication}})+T_{\text{serial}}$$

如果 RDMA 梯度同步能与后续反向计算或优化器准备并行，通信就不会线性叠加到 step time 上。Gaudi 把网络端口、DMA 和计算引擎放在同一芯片内，正是为了缩短数据从 HBM/SRAM 到网络的路径，并给运行时更多机会安排异步传输。

软件栈上，SynapseAI 负责把 PyTorch/TensorFlow 图转换成 Gaudi 可执行图，图编译器决定哪些算子落到 MME、哪些落到 TPC，以及内存和 DMA 如何排布。与 CUDA GPU 相比，Gaudi 的生态成熟度较弱，但架构方向非常鲜明：它把训练系统的瓶颈从“单卡算力”扩展到“算力、片上存储、网络和编译器共同调度”。

#### 🧪 练习题

```yaml
question: "Habana Gaudi 第一代处理器最突出的系统级创新是什么？"
options:
  - "在训练处理器上集成 10×100GbE RoCE RDMA 网络端口"
  - "只保留标量 CPU 核心，不提供矩阵乘硬件"
  - "把所有通信都强制经过主机内存和外部 NIC"
  - "取消软件编译器，所有算子都人工写二进制"
answer: 0
explain: "Gaudi 的差异化在于计算芯片直接集成高速以太网 RDMA，用标准以太网降低多卡/多节点训练扩展成本并支持计算-通信重叠。"
```
