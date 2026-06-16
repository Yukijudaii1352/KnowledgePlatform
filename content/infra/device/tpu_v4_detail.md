### TPU v4

```yaml
id: tpu_v4
name: TPU v4
full_name: 张量处理单元v4光互联版 (TPU v4 with Optical Interconnect)
year: '2023'
org: Google
paper_url: https://arxiv.org/abs/2304.01433
category: tpu
parent: tpu_v2v3
motivation: 光路交换机实现3D Torus拓扑动态重构
```

#### 📝 一句话总结

TPU v4 提出了带光路交换机的可重构 ML 超级计算机，用 4096 芯片规模、3D mesh/torus 拓扑、twisted torus 变体和 SparseCore 嵌入加速解决 TPU v3 在大模型训练中遇到的互连、可用性和推荐模型瓶颈。它把 TPU 从固定 2D Pod 推进到可按作业重构拓扑的光互联系统，并在芯片级、网络级和模型协同优化上同时提升性能/瓦特。

#### 🎯 核心要点

- 每颗 TPU v4 芯片包含 2 个 TensorCore，每个 TensorCore 有 4 个 MXU、向量单元和标量单元
- 官方规格为每芯片 275 TFLOPS BF16/INT8、32 GiB HBM、1200 GB/s HBM 带宽、典型均值约 170 W
- Pod 规模扩大到 4096 芯片，峰值约 1.1 EFLOPS，AllReduce 带宽约 1.1 PB/s，等分带宽约 24 TB/s
- 使用 6 条 ICI 链路形成 3D mesh，并在满足形状条件的切片上配置为 3D torus 或 twisted torus
- 通过 OCS 光路交换机重构芯片间环绕连接，提升调度灵活性、故障绕行能力和拓扑匹配能力
- 引入第三代 SparseCore，加速 DLRM 等推荐模型的嵌入表 gather、dedup、all-to-all 和 reduce/update
- 相比 TPU v3，论文和官方博客报告单芯片平均约 2.1 倍性能、约 2.7 倍性能/瓦特提升

#### 🔬 深入细节

##### 核心示意图

![TPU v4 芯片架构图](https://docs.cloud.google.com/static/tpu/docs/images/tpu-v4-layout.png)
*图 1：Google Cloud 官方 TPU v4 芯片图，展示 TensorCore、MXU、SparseCore、HBM 和 ICI 链路。*

![TPU v4 OCS 光路交换示意](https://storage.googleapis.com/gweb-cloudblog-publish/images/2_Cloud_TPU_v4.max-1400x1400.jpg)
*图 2：Google Cloud 官方博客中的 OCS 工作示意。OCS 用 MEMS 光路切换连接关系，避免把高速光信号转换成电包交换流量。*

![TPU v4 twisted torus 拓扑](https://docs.cloud.google.com/static/tpu/docs/images/twisted-tori.png)
*图 3：Google Cloud 官方 twisted torus 图。wrap-around 边被偏移连接，从而把不对称 torus 变成更均衡的通信拓扑。*

##### 算法伪代码

```python
# TPU v4 切片分配、OCS 拓扑选择与训练运行的简化伪代码
def choose_topology(chip_count, parallelism):
    candidates = enumerate_3d_shapes(chip_count)  # e.g. 4x4x8, 4x8x8, 8x8x8
    best = None
    for shape in candidates:
        variants = ["mesh", "torus"]
        if supports_twisted(shape):
            variants.append("twisted_torus")

        for variant in variants:
            score = estimate_step_time(
                shape=shape,
                variant=variant,
                data_parallel=parallelism.data,
                model_parallel=parallelism.model,
                embedding_all_to_all=parallelism.embedding
            )
            best = min_by_step_time(best, (shape, variant, score))
    return best.shape, best.variant


def run_tpu_v4_job(model, batch, chip_count, parallelism):
    shape, variant = choose_topology(chip_count, parallelism)

    # OCS 在作业启动或重配置点建立所需光路，形成 3D torus/twisted torus。
    ocs_program = compile_optical_circuits(shape, variant)
    configure_ocs(ocs_program)

    compiled = xla_compile(model, target="tpu_v4", topology=(shape, variant))

    for step in training_steps:
        dense_out = tensorcores_forward_backward(
            compiled.dense_layers,
            batch.shard(step),
            dtype="bf16",
            accumulate="fp32"
        )

        # SparseCore 处理推荐模型中的嵌入表访问和跨芯片 all-to-all。
        sparse_out = sparsecores_embedding_pipeline(
            ids=batch.sparse_ids,
            stages=["fetch", "dedup", "distribute", "scvpu", "sort_reduce", "flush"]
        )

        grads = merge_dense_and_sparse_gradients(dense_out, sparse_out)
        synced = ici_allreduce(grads, topology=variant)
        optimizer_update(synced)
```

##### 方法机制解读

TPU v4 的背景是训练负载在 TPU v2/v3 之后继续变化：大语言模型需要更大的模型并行和更长时间的稳定运行，推荐系统中的嵌入表带来大量稀疏访存和 all-to-all 通信，单个 Pod 中的故障、碎片和拓扑选择也会直接影响有效算力。固定 2D torus 对许多卷积和普通数据并行任务足够好，但当芯片数扩大到 4096、通信模式变得更复杂时，二维网络的等分带宽和最长路径会成为系统级瓶颈。

TPU v4 首先在芯片级增加密度。官方文档给出的 v4 芯片结构是 2 个 TensorCore，每个 TensorCore 4 个 MXU，单芯片 275 TFLOPS BF16/INT8；同时有 32 GiB HBM 和更高 HBM 带宽。矩阵乘仍是主路径，但 v4 还加入更大的片上 common memory、更多转置/置换带宽、更快权重加载和 8-bit 模式，使同一芯片既能服务训练，也能覆盖更低 batch 的推理场景。公式上，Dense 层的主算子仍是：

$$
Y = XW,\quad C_{fp32}\leftarrow C_{fp32}+X_{bf16}W_{bf16}
$$

但系统瓶颈已经从单个 \(Y=XW\) 扩展到多维并行下的通信、调度和稀疏更新。

3D 网络的收益可以从等分带宽直观看出。若 \(N=k^d\) 个节点组成 \(d\) 维近似立方 torus，每个方向链路带宽为 \(b\)，切开系统中部时跨切面链路数量与 \(k^{d-1}\) 成正比：

$$
B_{\text{bisection}}(d)\propto b\cdot k^{d-1}=b\cdot N^{(d-1)/d}
$$

因此 2D torus 的等分带宽随规模约为 \(O(N^{1/2})\)，3D torus 则约为 \(O(N^{2/3})\)。芯片数越大，3D 的相对优势越明显。TPU v4 每芯片 6 条 ICI 链路正好对应三维邻居连接，减少网络直径并给 all-to-all、AllReduce 和模型并行激活交换更多路径。

OCS 的作用是把“物理布线”变成“可编程资源”。TPU v4 可以把 4×4×4 立方体作为构建块，通过光路交换把块之间的环绕链路按作业需要接成不同 3D 拓扑。OCS 不理解包，也不做逐包路由；它像可重接线的光纤配线架，在作业启动时把输入光纤反射到目标输出光纤。这样做的优势是功耗和延迟低、带宽随光链路自然扩展，并且可绕过故障块或把非连续资源拼成逻辑连续切片。

Twisted torus 是 OCS 可重构性的具体用法。对于 4×4×8、4×8×8、8×8×16 等某个维度为最小维度一倍或两倍的切片，普通 torus 的 wrap-around 边会造成不均衡路径；twisted torus 把环绕边连接到偏移坐标，例如二维示意中从同一 \(x\) 坐标改为 \(x+\Delta \pmod n\)。这不会改变芯片数量，却能让拓扑更对称、路径更短、负载更均衡。Google Cloud 文档也明确说明 twisted 拓扑能提升等分带宽，尤其有利于全局通信和大嵌入工作负载。

SparseCore 解决的是 Dense TensorCore 不擅长的推荐模型问题。嵌入层的计算不是大矩阵乘，而是根据 ID 对巨大的 embedding table 做随机 gather、去重、跨芯片分发、梯度合并和写回。若这些操作放在 CPU 或普通向量单元上，会被 PCIe、内存随机访问和 all-to-all 通信拖慢。TPU v4 的 SparseCore 以数据流方式执行 `fetch -> dedup -> distribute -> scVPU -> sort/reduce -> flush`，并直接接入 HBM 和 ICI，使稀疏部分不再成为整步训练的 Amdahl 瓶颈。

从软件角度看，TPU v4 把模型并行策略和物理拓扑绑定得更紧。一个 512 芯片作业可以选择 4×4×32、4×8×16 或 8×8×8；如果模型有 4 路模型并行和大量数据并行，把模型并行维度映射到物理长度为 4 的维度通常比随意映射更好。XLA、调度器和拓扑选择器需要共同决定：dense 计算如何 tile 到 MXU，稀疏嵌入如何 shard 到 SparseCore，AllReduce 或 all-to-all 应该走 regular torus 还是 twisted torus。

> 💡 关键：TPU v4 的“光互联”不是为了让每个包动态改路，而是为了在作业粒度把超级计算机重接成更适合模型通信图的拓扑。

#### 🧪 练习题

```yaml
question: "TPU v4 为什么引入 OCS 和 twisted torus，而不是继续只扩大 TPU v3 的 2D torus？"
options:
  - "因为 3D/可重构拓扑能提升大规模切片的等分带宽、缩短路径，并按作业通信模式重接环绕链路"
  - "因为 OCS 可以替代 TensorCore 做 BF16 矩阵乘"
  - "因为 twisted torus 会减少 HBM 容量，从而降低模型大小"
  - "因为 2D torus 无法执行任何 AllReduce"
answer: 0
explain: "v4 的核心瓶颈从单芯片算力扩展到 Pod 级通信和可用性；OCS 允许作业粒度重构 3D torus/twisted torus，提高等分带宽、负载均衡和故障绕行能力。"
```
