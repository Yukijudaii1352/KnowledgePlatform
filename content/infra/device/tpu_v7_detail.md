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

TPU v7 Ironwood 是 Google Cloud TPU 面向大规模生成式 AI 的新一代集群加速器路线，重点在更高矩阵吞吐、HBM 容量/带宽、芯片间互联和 Pod 级扩展。由于公开资料主要来自 Cloud TPU 发布说明和产品材料，本文把它作为 TPU 系列系统架构演进进行精读，而非传统论文算法。

#### 🎯 核心要点

- 延续 TPU 的矩阵单元和大规模 Pod 互联思路，目标是训练和服务超大 Transformer
- 产品信息强调高集群算力、HBM 资源和更强互联，服务 Gemini 等生成式 AI 场景
- 与 TPU v1 的推理协处理器不同，现代 TPU 是训练/推理一体的云端系统平台
- 软件侧依赖 XLA、JAX、TensorFlow/PyTorch/XLA 和 SPMD 分片把模型映射到 TPU Pod
- 性能关键不只是单芯片 FLOPS，还包括 collective 通信、编译器布局和模型并行策略
- 当前公开细节有限，具体制程、芯粒和精度特性需以 Google 官方后续白皮书为准

#### 🔬 深入细节

##### 核心示意图

![TPU v7 Ironwood Pod 级 AI 加速示意](https://placehold.co/900x420/png?text=TPU+v7+Ironwood+Pod+Matrix+Units+HBM+Interconnect)
*图：基于 Google Cloud TPU 发布说明整理的 TPU v7 Ironwood 系统示意；重点是矩阵单元、HBM 和 Pod 级互联。*

##### 算法伪代码

```python
# XLA/SPMD 将 Transformer 分片到 TPU Pod 的伪代码
mesh = create_tpu_mesh(devices, axes=("data", "model"))
for layer in transformer.layers:
    x = shard(x, mesh["data", "model"])
    qkv = xla_dot_general(x, shard(layer.qkv_weight, mesh["model"]))
    attn = collective_permute_or_all_to_all(qkv, mesh)
    y = xla_dot_general(attn, shard(layer.out_weight, mesh["model"]))
    y = all_reduce_if_data_parallel(y, mesh["data"])
```

TPU v7 的核心背景是大模型规模已经超过单芯片能力。现代 TPU 不再只是一个矩阵加速器，而是“芯片、板级互联、机柜/Pod 网络、编译器和云调度”组成的系统。用户提交的是高层 JAX 或 TensorFlow 程序，XLA 负责把计算图分片到大量 TPU device 上。

矩阵单元仍是 TPU 的中心。Transformer 的 QKV projection、MLP、attention output projection 都是大 GEMM，最适合 TPU 的 systolic/matrix datapath。困难在于模型并行会在层间和层内引入 AllReduce、AllGather、AllToAll 等通信，如果互联或编译布局不佳，集群算力会被通信等待吞噬。

与 TPU v4 的公开论文相比，Ironwood 相关公开材料更强调面向生成式 AI 的云产品能力。可以合理推断其优化方向包括更高 HBM 带宽、更大显存容量、更强 collective 性能和更成熟的 XLA 分片，但具体微架构细节必须等待官方技术论文或白皮书确认。

因此精读 TPU v7 时，重点不是记某个单点规格，而是理解 Google TPU 的路线：用专用矩阵硬件获得高能效，用 Pod 级网络扩展规模，用 XLA/SPMD 把模型图编译成分布式执行计划。Ironwood 代表这一路线面向 2026 大模型工作负载的延续。

#### 🧪 练习题

```yaml
question: "现代 Cloud TPU 性能为什么强依赖 XLA/SPMD 编译器？"
options:
  - "因为模型必须被分片到大量芯片，通信和布局需要编译器统一规划"
  - "因为 TPU 只能运行手写汇编"
  - "因为 HBM 不参与训练"
  - "因为矩阵乘法无法并行"
answer: 0
explain: "大模型跨 Pod 执行时，张量切分、collective 插入和布局选择直接决定硬件利用率。"
```
