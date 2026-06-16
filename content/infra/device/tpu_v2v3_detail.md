### TPU v2/v3

```yaml
id: tpu_v2v3
name: TPU v2/v3
full_name: 张量处理单元v2/v3训练版 (TPU v2/v3 for Training)
year: '2020'
org: Google
paper_url: https://dl.acm.org/doi/10.1145/3360307
category: tpu
parent: tpu_v1
motivation: 引入bfloat16格式支持大规模集群训练
```

#### 📝 一句话总结

TPU v2/v3 把 TPU v1 的推理专用思想扩展为训练超级计算机：用 bfloat16 乘法、FP32 累加、HBM 和 ICI 2D torus 互连支撑大规模同步训练。它解决了训练阶段对动态范围、反向传播内存、梯度同步和 Pod 级扩展的需求，使 TPU 从单机推理加速器变成可训练 ResNet、Transformer 等模型的领域专用集群。

#### 🎯 核心要点

- 引入 bfloat16：保留 FP32 的 8 位指数，缩短尾数，兼顾训练动态范围与 16-bit 计算/存储效率
- 使用 TensorCore 和 MXU 执行 BF16 矩阵乘并用 FP32 累加，适配前向、反向和权重梯度计算
- 每颗芯片配备 HBM，TPU v2 约 16 GiB/600 GB/s，TPU v3 约 32 GiB/900 GB/s
- TPU v3 官方规格为每芯片 123 TFLOPS BF16、1024 芯片 Pod、2D torus、126 PFLOPS Pod 峰值
- ICI 专用互连支持高带宽 AllReduce，降低数据并行训练中的梯度同步瓶颈
- XLA 将 TensorFlow/JAX 图编译为 TPU 程序，负责算子融合、布局、tile 化、内存规划和通信插入
- 相比 TPU v1，v2/v3 支持训练；相比 CPU/GPU 集群，它用端到端软硬件协同提升性能/瓦特和可扩展性

#### 🔬 深入细节

##### 核心示意图

![TPU v3 芯片架构图](https://docs.cloud.google.com/static/tpu/docs/images/tpu-v3-layout.png)
*图：Google Cloud 官方 TPU v3 芯片图。该图展示了芯片内两个 TensorCore、MXU、向量/标量单元、HBM 以及 ICI 链路。TPU v2/v3 论文讨论同一训练 TPU 家族，本文用官方 v3 图作为远程架构图来源。*

##### 算法伪代码

```python
# TPU v2/v3 上的同步数据并行训练简化流程
compiled = xla_compile(
    model,
    target="tpu_v2_or_v3",
    passes=["fusion", "layout_assignment", "tiling", "memory_planning", "collectives"]
)

replicas = make_tpu_replicas(pod_slice)
master_weights_fp32 = init_weights(dtype="fp32")

for step, global_batch in enumerate(input_pipeline):
    # 每个 TensorCore 处理不同数据分片，模型参数逻辑上保持同步。
    local_batch = shard(global_batch, replicas, by=replica_id)
    weights_bf16 = cast(master_weights_fp32, "bf16")

    activations = local_batch
    for layer in compiled.forward_layers:
        if layer.is_dense_matmul_or_conv:
            # BF16 输入/权重进入 MXU，累加器保持 FP32。
            activations = mxu_matmul_bf16_accumulate_fp32(
                cast(activations, "bf16"),
                layer.weights_bf16
            )
        else:
            activations = vector_or_scalar_unit(layer, activations)

    loss = compute_loss(activations, local_batch.labels)
    local_grads = xla_backprop(loss, compiled.backward_layers)

    # ICI 2D torus 上做梯度 AllReduce，得到所有副本一致的平均梯度。
    summed_grads = ici_allreduce(local_grads, topology="2d_torus")
    mean_grads = summed_grads / len(replicas)

    # 权重更新通常保留 FP32 master copy，下一步再投影为 BF16 参与矩阵乘。
    master_weights_fp32 = optimizer_update(master_weights_fp32, mean_grads)
```

##### 方法机制解读

TPU v2/v3 的根本变化是从“只跑前向推理”转向“端到端训练”。训练不仅要计算前向矩阵乘，还要计算激活梯度、权重梯度和优化器更新，内存中还必须保存或重算中间激活。更重要的是，同步数据并行会在每个 step 后交换梯度；当芯片数扩大到数百或上千时，互连带宽和 AllReduce 延迟会和矩阵乘本身一样关键。因此 v2/v3 同时升级数值格式、片上/片外存储、芯片间网络和编译器。

bfloat16 是训练版 TPU 的核心数值选择。它的位宽仍是 16 bit，但指数位与 FP32 相同，尾数更短：

$$
\operatorname{bf16}=1\ \text{sign bit}+8\ \text{exponent bits}+7\ \text{mantissa bits}
$$

这种设计承认了深度学习训练的两个事实：梯度和激活需要接近 FP32 的动态范围，否则容易溢出或下溢；但随机梯度本身带噪声，许多矩阵乘输入不需要 FP32 的完整尾数精度。于是 TPU 让矩阵乘输入和权重以 BF16 存储/传输，同时让累加保持 FP32：

$$
C_{fp32} \leftarrow C_{fp32}+A_{bf16}B_{bf16}
$$

这比纯 FP16 更少依赖 loss scaling，也比纯 FP32 节省带宽和乘法器面积。

TensorCore 仍以 MXU 为中心，但它服务的是训练图而不是单向推理图。矩阵乘、卷积、注意力投影和 MLP 层主要落到 MXU；激活函数、归一化、softmax、优化器中的逐元素更新落到向量或标量单元。XLA 的任务是把高层计算图转换成能填满 MXU tile 的低层程序，例如融合 `MatMul + Bias + Activation`，选择 HBM 与片上缓冲之间的数据布局，并尽量让转置、重排和通信与计算重叠。

分布式训练的通信可以用一个简化 AllReduce 成本模型理解。设梯度大小为 \(S\)，参与副本数为 \(P\)，有效链路带宽为 \(B\)，则环形或分块 AllReduce 的带宽项近似为：

$$
T_{\text{allreduce}}\approx 2\frac{P-1}{P}\frac{S}{B}+T_{\text{routing}}
$$

当 \(P\) 很大时，第一项接近 \(2S/B\)，但 \(T_{\text{routing}}\) 会受拓扑直径、拥塞和调度影响。TPU v2/v3 的 ICI 2D torus 通过专用芯片间链路直接服务集合通信，比走通用数据中心网络更可预测，也能让梯度同步成为编译器可见的图节点。

与 TPU v1 相比，v2/v3 最大的设计权衡是“少一点单芯片推理极致专用，多一点训练所需通用性”。训练需要更高精度、更大 HBM、更复杂的数据重排和跨芯片同步，因此芯片不能只围绕 INT8 前向路径设计。与同期 GPU 集群相比，TPU v2/v3 则选择更封闭但更整体化的路线：硬件、互连、XLA 和框架一起设计，用户少直接写 kernel，系统用全图编译和 Pod 拓扑换取稳定的训练吞吐。

从模型训练流程看，v2/v3 支持数据并行、模型并行和混合并行。数据并行时，每个副本持有完整参数，处理不同 batch shard，再通过 ICI 平均梯度；模型并行时，矩阵或层被切到不同 TensorCore，通信发生在激活、注意力或专家路由边界。2D torus 对规则划分很友好，但它的等分带宽随规模大致按 \(O(\sqrt{P})\) 增长，这也是 TPU v4 后续转向 3D 网络和可重构光互连的重要原因。

> 💡 关键：TPU v2/v3 的贡献不是单独发明 BF16，而是证明 BF16 数值格式、MXU、HBM、ICI torus 和 XLA 全图编译可以作为一个训练系统共同扩展。

#### 🧪 练习题

```yaml
question: "TPU v2/v3 为什么选择 bfloat16 作为训练主格式？"
options:
  - "它保留 FP32 的指数动态范围，同时用 16-bit 存储和乘法降低带宽与计算成本"
  - "它比 FP32 拥有更多尾数位，因此数值精度更高"
  - "它只能用于推理，不能用于反向传播"
  - "它取消了芯片间 AllReduce 的需求"
answer: 0
explain: "BF16 的 8 位指数接近 FP32 动态范围，7 位尾数降低硬件和带宽成本；TPU 在矩阵乘中使用 BF16 输入并保留 FP32 累加以维持训练稳定性。"
```
