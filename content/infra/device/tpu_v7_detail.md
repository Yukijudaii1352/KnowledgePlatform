### TPU v7 Ironwood

```yaml
id: tpu_v7
name: TPU v7 Ironwood
full_name: 张量处理单元v7铁杉版 (TPU v7 Ironwood)
year: '2026'
org: Google
paper_url: https://cloud.google.com/tpu/docs/release-notes
category: tpu
parent: tpu_v4
motivation: 3nm双芯粒架构42.5 Exaflops集群算力
```

#### 📝 一句话总结

TPU v7 Ironwood 是 Google 面向生成式 AI 推理与训练的双芯粒 Cloud TPU 系统，通过更大的 HBM、片间 ICI、OCS 可重构互联和 XLA/SPMD 编译栈，把单芯片矩阵算力扩展到 9216 芯片、约 42.5 Exaflops 的 Pod 级平台。

#### 🎯 核心要点

- 双芯粒封装：一个 Ironwood chip 向软件暴露为两个 TPU device，每个 device 具有独立 HBM、一个 TensorCore、一个 SparseCore、ICI 和 PCIe 资源
- 单芯片规格：官方 TPU7x 文档给出 4614 TFLOPS 峰值算力、192 GiB HBM、7.2 TB/s HBM 带宽、1.2 TB/s ICI 互联带宽
- Pod 级规模：最大 9216 个 chip 组成单个 TPU7x Pod，官方发布说明标称 42.5 Exaflops、约 1.77 PB HBM 和 9.6 PB/s bisection bandwidth
- 互联设计：继承 TPU v4 的 3D torus/光路交换机路线，Ironwood 在芯片内用 die-to-die ICI 连接双芯粒，在芯片间用 6 条 1D ICI 链路扩展
- 编程模型：JAX 看到的是 4D 拓扑，末维包含同一 chip 内的两个 device；跨芯片通信比芯片内通信更贵，需要显式考虑 mesh 和 sharding
- 软件栈：XLA、JAX、Pallas、TensorFlow/PyTorch/XLA 把 Transformer 计算图映射到 MXU、VPU、SparseCore、HBM 和 collective 通信

#### 🔬 深入细节

##### 核心示意图

![TPU v7 Ironwood chip 架构图](https://docs.cloud.google.com/static/tpu/docs/images/ironwood-architecture.png)
*图：Google Cloud TPU7x 官方文档中的 Ironwood 架构图，展示双芯粒、HBM、die-to-die ICI、chip-to-chip ICI、TensorCore、SparseCore 和 PCIe；来源：https://cloud.google.com/tpu/docs/tpu7x。*

##### 算法伪代码

```python
# TPU v7 Ironwood 上的 Transformer block SPMD 分片伪代码
mesh = Mesh(
    devices=tpu7x_devices,
    axes=("data", "fsdp", "tensor", "chiplet"),
)

def transformer_block(x, weights):
    # batch/sequence 沿 data 维分片，权重沿 tensor 维分片；
    # chiplet 维优先放同一 Ironwood chip 内的两个 TPU device。
    x = shard(x, mesh=("data", "fsdp", None, "chiplet"))
    w_qkv = shard(weights.qkv, mesh=(None, "tensor"))

    qkv = mxu_dot(x, w_qkv)                   # TensorCore/MXU 执行大 GEMM
    qkv = all_gather(qkv, axis="tensor")      # 需要完整 attention head 时通信
    attn = fused_attention(qkv, layout="block")

    y = mxu_dot(attn, shard(weights.out, mesh=("tensor", None)))
    y = reduce_scatter(y, axis="tensor")      # 把输出重新切回 tensor mesh
    y = all_reduce(y, axis="data")            # 数据并行梯度/激活规约
    return y
```

TPU v7 的公开材料不是传统论文，而是 Google Cloud TPU7x 文档、release notes 和官方产品博客，因此精读重点应放在“系统机制”而不是单个算法公式上。Ironwood 的关键变化是双芯粒：一个物理 chip 由两个 die 组成，软件侧会看到两个 device。官方文档明确说明每个 device 有自己的 HBM、TensorCore、SparseCore、ICI 和 PCIe，而 die-to-die ICI 让同一 chip 内两个 device 的通信比跨 chip 更近。这意味着模型分片时不能只看设备数量，还要把物理邻近性纳入 mesh 规划。

Pod 级算力来自单芯片吞吐和规模扩展的乘积。官方 TPU7x 文档给出单 chip 约 4614 TFLOPS，最大 Pod 为 9216 chips，因此：

$$
P_{\text{pod}} = 9216 \times 4614\ \text{TFLOP/s}
\approx 42.5\ \text{EFLOP/s}
$$

这个公式解释了“42.5 Exaflops”不是单芯片突破，而是单芯片 MXU 吞吐、HBM 带宽、ICI 链路和 OCS 网络共同放大后的系统指标。对大模型而言，真正瓶颈通常是如下 roofline 式上界：

$$
T_{\text{layer}} \approx
\max \left(
\frac{F_{\text{GEMM}}}{P_{\text{MXU}}},
\frac{B_{\text{HBM}}}{BW_{\text{HBM}}},
\frac{B_{\text{collective}}}{BW_{\text{ICI/OCS}}}
\right)
$$

第一项是矩阵乘法时间，第二项是 HBM 读写时间，第三项是模型并行或数据并行 collective 的通信时间。Ironwood 把 HBM 提升到 192 GiB/chip 和 7.2 TB/s/chip，目的是让更大的参数、KV cache、activation shard 留在高带宽本地存储里；但如果 attention head、MoE expert 或 FSDP shard 布局不匹配，AllGather/AllReduce 仍会压低有效利用率。

互联层是 TPU v4 到 TPU v7 的连续主线。TPU v4 论文已经证明了 3D torus 与光路交换机可以让 4096 芯片系统按作业动态组成 topology；Ironwood 文档进一步强调 6 条 1D ICI chip-to-chip 链路和 OCS 对 9216 chip Pod 的扩展价值。对一个跨 \(p\) 个设备的数据并行 AllReduce，通信量近似为：

$$
T_{\text{allreduce}} \approx
2 \cdot \frac{p-1}{p} \cdot \frac{S}{BW_{\text{effective}}}
 + O(\text{latency} \cdot \log p)
$$

其中 \(S\) 是待规约张量大小。TPU v7 的优化目标就是提高 \(BW_{\text{effective}}\)，并让编译器把高频通信放在更近的 chiplet/chip/torus 维度上。

软件栈决定这些硬件资源能否被用满。JAX 在 TPU7x 上看到 4D topology，最后一维的两个 device 属于同一个 chip；Pallas kernel 还能使用逻辑 VMEM、SMEM 和管线化 DMA，手动把片上 SRAM 当作显式缓存使用。换言之，TPU v7 并不是“自动变快的 GPU 替代品”，而是需要 XLA/SPMD 根据张量形状、mesh 轴和 collective 模式生成分布式执行计划。

与 TPU v4 相比，Ironwood 公开资料更少披露微架构细节，但方向清楚：v4 论文强调 OCS、SparseCore、3D torus 和高能效训练，v7 则把同一系统思想推进到双芯粒封装、更高 HBM 容量、更大 Pod 和生成式 AI 服务。对于 LLM 推理，HBM 容量直接决定可驻留权重与 KV cache；对于训练，ICI/OCS 决定张量并行、pipeline 并行和数据并行能否在 9216 芯片规模下保持高利用率。

> 💡 关键：Ironwood 的“算法”不是新的神经网络训练算法，而是硬件-编译器协同算法：把大模型矩阵计算留在 MXU，把大容量状态留在 HBM，把频繁通信映射到尽量近的 ICI/OCS 维度。

#### 🧪 练习题

```yaml
question: "为什么 TPU v7 Ironwood 的软件侧要把同一 chip 内的两个 device 当作特殊拓扑维度处理？"
options:
  - "因为两个 device 共享同一条更近的 die-to-die ICI，通信代价低于普通跨 chip 通信"
  - "因为 TPU v7 不能执行矩阵乘法，只能执行通信"
  - "因为 HBM 只存在于其中一个 device 上"
  - "因为 JAX 不支持跨设备分片"
answer: 0
explain: "Ironwood 是双芯粒设计，两个 die 各自有 HBM 和计算单元，并通过 die-to-die ICI 连接；合理的 mesh 映射会优先利用这种近距离通信。"
```
