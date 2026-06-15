### AMD MI400

```yaml
id: amd_mi400
name: AMD MI400
full_name: AMD Instinct MI400加速器 (AMD Instinct MI400 Accelerator)
year: '2026'
org: AMD
paper_url: https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7
category: gpu_architecture
parent: —
motivation: CDNA5架构2nm工艺432GB HBM4
```

#### 📝 一句话总结

AMD MI400 是面向 2026 前后数据中心 AI 训练与推理的 Instinct 路线延续，核心目标是在 CDNA5、先进制程、HBM4 和开放 ROCm 软件栈上提升大模型吞吐与容量。由于公开信息以路线图和行业报道为主，精读应把它理解为 AMD 对 Blackwell/Rubin 时代 GPU 加速器的体系化回应，而非已有完整论文的单一算法。

#### 🎯 核心要点

- 公开路线图指向 CDNA5 架构、先进制程和 HBM4 显存，用于提升带宽和模型驻留能力
- 重点服务大模型训练、推理和多 GPU 扩展，延续 MI300 系列 chiplet 与高带宽内存路线
- 通过 ROCm、HIP、Composable Kernel、MIOpen 等开放软件栈承接 PyTorch/JAX 等框架
- 与 NVIDIA 闭源生态不同，AMD 更强调开放编程接口和云厂商可定制部署
- 预期性能瓶颈仍围绕 HBM 带宽、矩阵引擎吞吐、互联带宽和软件 kernel 成熟度
- 当前公开细节有限，应避免把未发布规格当作确定硬件事实

#### 🔬 深入细节

##### 核心示意图

![AMD MI400 路线图式架构示意](https://placehold.co/900x420/png?text=AMD+MI400+CDNA5+HBM4+ROCm+AI+Accelerator)
*图：基于 AMD 数据中心 GPU 路线图与公开报道整理的 MI400 体系示意；官方完整白皮书尚未公开时，以路线图信息为准。*

##### 算法伪代码

```python
# 面向 AMD Instinct/ROCm 的大模型 kernel 调度伪代码
for layer in transformer.layers:
    x = rocm_all_gather_if_tensor_parallel(x)
    qkv = hipblaslt_gemm(x, layer.qkv_weight, dtype="bf16/fp8")
    attn = flash_attention_rocm(qkv, kv_cache)
    h = hipblaslt_gemm(attn, layer.out_weight)
    h = rocm_reduce_scatter_if_needed(h)
```

MI400 的设计动机可以从 MI300 系列的约束外推：大模型正在同时消耗算力、显存容量、显存带宽和集群互联。单颗 GPU 的峰值 FLOPS 只有在权重、激活和通信都及时供给时才有意义，因此 HBM4 容量和带宽、chiplet 封装、矩阵引擎以及软件库会共同决定实际吞吐。

AMD 的差异化并不只是硬件规格，而是 ROCm 生态。HIP 提供 CUDA 类似的编程模型，rocBLAS/hipBLASLt 和 Composable Kernel 提供 GEMM/attention 等高性能内核，MIOpen 覆盖深度学习算子。对用户来说，MI400 的成功取决于这些库能否在主流模型结构上达到稳定高利用率。

从系统角度看，MI400 需要解决多 GPU 扩展。训练时 tensor parallel、pipeline parallel 和 data parallel 会触发 AllReduce、AllGather、ReduceScatter 等通信；推理时则关注 KV cache、专家并行和低延迟调度。硬件互联与 RCCL/NCCL 兼容层决定了加速器能否从单卡性能扩展到机柜级性能。

由于目标条目的 `paper_url` 是行业报道页面，当前文件避免把未正式发布的规格写成论文结论。更合理的精读方式是把 MI400 放在 GPU 架构演进中理解：它代表 AMD 继续用高带宽内存、chiplet 封装和开放软件栈挑战数据中心 AI 加速器市场。

#### 🧪 练习题

```yaml
question: "评估 AMD MI400 这类未来 AI GPU 时，为什么不能只看峰值 FLOPS？"
options:
  - "因为大模型性能还受 HBM 带宽、互联、kernel 和软件栈成熟度影响"
  - "因为 FLOPS 与矩阵乘法无关"
  - "因为 GPU 不执行并行计算"
  - "因为 ROCm 只能运行文本编辑器"
answer: 0
explain: "训练和推理常被内存与通信限制，硬件峰值需要软件库和系统互联共同转化为有效吞吐。"
```
