### Blackwell FP4

```yaml
id: blackwell_fp4
name: Blackwell FP4
full_name: Blackwell FP4架构 (Blackwell FP4 Architecture)
year: '2025'
org: NVIDIA
paper_url: https://arxiv.org/abs/2507.10789
category: gpu_architecture
parent: hopper_fp8
motivation: FP4精度与专用解压引擎优化万亿参数模型
```

#### 📝 一句话总结

Blackwell FP4 将低比特浮点进一步推进到 4 bit，并配合块级缩放、专用解压和 Tensor Core 数据路径来服务万亿参数模型推理。它解决了 FP8 仍受显存容量和带宽限制的问题，把权重读取和矩阵乘输入压缩到更低成本，同时依靠缩放与高精度累加维持可用精度。

#### 🎯 核心要点

- FP4/NVFP4 通过极低比特权重量化显著降低 LLM 推理的显存占用和带宽需求
- 块级或微缩放因子为一组低比特值提供动态范围，缓解 4 bit 表示能力不足
- 解压/反量化路径靠近 Tensor Core，减少低比特权重到计算输入的转换开销
- 推理中常对权重使用 FP4，对激活、累加、归一化和 logits 保留 FP8/BF16/FP16
- 适合 decode 阶段和大参数量 MoE/Transformer，核心瓶颈从算力转向内存带宽
- 与 Hopper FP8 相比，Blackwell FP4 更强调 inference cost、模型驻留和能效

#### 🔬 深入细节

##### 核心示意图

![Blackwell FP4 低比特推理示意](https://ar5iv.labs.arxiv.org/html/2507.10789/assets/x1.png)
*图：FP4/NVFP4 低比特训练或推理流程示意；若论文渲染图不可用，可按块级缩放、低比特权重和高精度累加理解。*

##### 算法伪代码

```python
# FP4 权重量化与推理 GEMM 伪代码
for block in weight.blocks(block_size=16):
    scale = max(abs(block)) / fp4_max
    q = round_to_fp4(block / scale)
    store(q, scale)

for token in decode_stream:
    q_weight, scale = load_fp4_block()
    w = dequantize_near_tensor_core(q_weight, scale)
    out = tensor_core_gemm(activation, w, accumulate="FP16/BF16")
```

FP4 的根本动机来自 LLM 推理的内存墙。对超大模型，尤其是 batch 较小的 autoregressive decode，每生成一个 token 都要读取大量权重，算术单元经常等待 HBM。把权重从 FP16/FP8 压到 FP4 能显著减少带宽与容量压力，使更多参数或专家常驻更快的层次中。

4 bit 浮点本身表示能力非常有限，必须依赖缩放策略。常见做法是对一小块权重共享 scale，存储 \(\hat{w}=q_{fp4}\times s\)。块越小，scale 越能贴合局部分布，精度越好，但元数据和解码开销越高；块越大，压缩率更好但量化误差更大。Blackwell 相关 FP4 路线的核心就在于用硬件支持这个折中。

专用解压引擎的意义是避免把 FP4 变成软件负担。如果每次 GEMM 前都由普通 CUDA core 解包和反量化，节省的 HBM 带宽可能被转换开销抵消。将解包、scale 应用和 Tensor Core 输入路径合并，可以让低比特权重以接近原生格式的方式进入矩阵乘。

与 Hopper FP8 主要面向训练和通用 Transformer 加速不同，FP4 更偏向推理成本优化。实际系统通常不会把所有张量都降到 FP4，而是对权重、KV cache 或部分中间张量分级使用 FP4/FP8/BF16，以在质量、吞吐和延迟之间控制风险。

#### 🧪 练习题

```yaml
question: "FP4 推理中块级 scale 的核心作用是什么？"
options:
  - "为一组 4 bit 数值提供局部动态范围，降低量化误差"
  - "把所有运算转换成 CPU 指令"
  - "完全消除矩阵乘法"
  - "让模型不再需要权重"
answer: 0
explain: "FP4 可表示值很少，块级 scale 将局部权重范围映射到 FP4 网格，是低比特可用性的关键。"
```
