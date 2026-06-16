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

AMD MI400 是 AMD 在 2026 年面向 GenAI 训练与分布式推理规划的下一代 Instinct 加速器，公开资料把它定位为 432 GB HBM4、19.6 TB/s 显存带宽、40 PF FP4 和 Helios rack-scale AI 系统的核心 GPU。它解决的是 MI300/MI350 时代单卡容量、显存带宽和机柜级互连不足以经济承载大模型训练与 MoE 推理的问题。

#### 🎯 核心要点

- AMD 官方 2024 Computex 新闻稿确认 MI400 系列预计 2026 年推出，基于 AMD CDNA “Next” 架构；2025 Advancing AI PDF 进一步给出 MI400 的工程投影规格
- AMD Advancing AI 2025 deck 第 94 页列出 MI400：40 PF FP4、20 PF FP8、432 GB HBM4、19.6 TB/s memory bandwidth、300 GB/s scale-out bandwidth per GPU，均为 engineering projections
- Helios AI Rack 以 72 个 GPU domain 为目标，官方 deck 第 92 页给出 2.9 EF FP4、1.4 EF FP8、31 TB HBM4、1.4 PB/s HBM4 带宽、43 TB/s scale-out bandwidth
- AMD EPYC “Venice” 作为 2026 CPU 配套路线，官方 deck 标注 256 cores、2nm、Zen 6、1.6 TB/s memory bandwidth，并强调 CPU-to-GPU bandwidth 代际提升
- AMD Pensando “Vulcano” NIC 面向 AI 集群，官方 deck 标注 3nm、800G network throughput、UAL PCIe host interface、8x scale-out bandwidth per GPU
- 与 NVIDIA 的闭合 NVLink 域不同，AMD 强调 UALink / Ultra Ethernet 等开放互连路线，目标是 “any CPU, any accelerator, any switch” 的机柜级扩展
- `paper_url` 是行业报道而非论文；深入解读以 AMD 官方 PDF/新闻稿为主，Tom’s Hardware/Future CDN 图片作为远程公开配图来源

#### 🔬 深入细节

##### 核心示意图

![AMD 数据中心路线图公开报道配图](https://cdn.mos.cms.futurecdn.net/N435TKXwPMnd3GuxfhvTPZ-970-80.jpg.webp)
*图：Tom’s Hardware/Future CDN 对 AMD 2026-2027 数据中心路线图报道的远程图片；MI400 具体规格以 AMD Advancing AI 2025 distribution deck 第 92-94 页的官方工程投影为准。*

##### 算法伪代码

```python
# MI400 / Helios 上大模型训练或推理的系统级调度伪代码
def helios_step(batch, model, fabric):
    # EPYC Venice 负责数据准备、控制面和集群调度
    shards = partition_for_tensor_and_expert_parallel(batch, gpus=72)

    for layer in model.layers:
        # 本地 HBM4 提供大容量权重、KV cache 和激活 staging
        x = load_from_hbm4(shards, bandwidth="19.6 TB/s per GPU")

        # FP4/FP8 矩阵核心路径，实际由 ROCm / hipBLASLt / CK / Triton kernel 承接
        h = matrix_engine_gemm(
            x,
            layer.weights,
            dtype="fp4/fp8",
            accumulate="fp32/bf16",
        )

        if layer.uses_moe:
            # UALink / Ultra Ethernet / Pensando NIC 承担 expert all-to-all
            h = fabric.all_to_all(h, bandwidth="scale-up + scale-out")

        shards = residual_norm_and_reduce_scatter(h)

    return gather_logits_or_gradients(shards)
```

MI400 的公开信息不是完整架构白皮书，而是路线图、发布会 deck 和行业报道的组合。因此精读时要把“确定事实”和“工程投影”分开：AMD 已公开 MI400 面向 2026、属于 CDNA Next 路线，并在 2025 deck 中给出 40 PF FP4、20 PF FP8、432 GB HBM4、19.6 TB/s 等目标；但具体芯粒数量、CU 数、缓存层次、制程实现和最终 SKU 仍需等正式产品白皮书确认。`motivation` 中的 “CDNA5/2nm” 与业内常见称呼一致，但 AMD 早期官方新闻稿使用的是 CDNA “Next”。

MI400 的第一层价值来自显存容量和带宽。432 GB HBM4 相比 MI350/MI355X 的 288 GB HBM3E 提升 50%，19.6 TB/s 相比 8.0 TB/s 提升约 2.45 倍。对 dense LLM，权重驻留容量决定 tensor parallel 切分深度；对 MoE，expert 和 KV cache 的驻留容量决定路由是否频繁跨卡；对训练，激活、梯度、优化器状态和重计算策略共同受 HBM 容量影响。其近似瓶颈可写成：

$$
T_{layer}\approx \max\left(\frac{F_{matmul}}{P_{FP4/FP8}},\frac{B_{weights}+B_{act}+B_{kv}}{BW_{HBM4}},\frac{B_{comm}}{BW_{fabric}}\right)
$$

AMD 把 MI400 放进 Helios AI Rack，而不是只发布单卡规格，说明竞争点已经上移到 rack scale。官方 deck 对 Helios 给出 72 GPU domain、260 TB/s scale-up bandwidth、2.9 EF FP4、1.4 EF FP8、31 TB HBM4 和 1.4 PB/s memory bandwidth。对训练，这意味着 tensor parallel 的 all-reduce、pipeline stage 间传输、ZeRO/FSDP 的 reduce-scatter 都要在 rack 内高效完成；对推理，则重点是 MoE expert all-to-all、长上下文 KV cache 迁移和多租户请求调度。

低精度机制方面，MI400 的 FP4/FP8 不能只理解为峰值 FLOPS。一个实用的低精度 GEMM 通常需要 `q_value + scale + accumulate` 三段式：

$$
C_{ij}=\sum_k \left(q^A_{ik}\cdot s^A_{g(k)}\right)\left(q^B_{kj}\cdot s^B_{g(k)}\right),\qquad C_{ij}\in\mathrm{FP32/BF16}
$$

这里 \(g(k)\) 是缩放分组函数。分组越小，误差越低，但 scale 元数据和内核访存越复杂；分组越大，吞吐更容易做满但容易损失模型精度。AMD 若要把 40 PF FP4 转化为真实 tokens/s，ROCm、hipBLASLt、Composable Kernel、Triton 后端和 vLLM/SGLang 等框架必须能自动选择合适的 block scaling、tile shape、通信 overlap 和 KV cache 布局。

互连是 MI400 与 Helios 的另一个关键。AMD 官方 deck 强调 UALink 与开放标准，把最大可扩展性、任意 CPU/加速器/交换芯片和开放管理软件作为差异化卖点。Vulcano NIC 的 800G 与 per-GPU scale-out 带宽目标，服务的是跨机柜扩展；Helios 的 260 TB/s scale-up 带宽，则服务单 rack 内低延迟集合通信。换句话说，MI400 的胜负不只在 GPU die，而在 GPU、EPYC Venice、Pensando NIC、ROCm/RCCL 和机柜拓扑是否能作为整体交付。

> ⚠️ 注意：AMD PDF 多处标注 “engineering projections” 和 “results subject to change”。因此本文把 432 GB、19.6 TB/s、40 PF FP4、Helios 2.9 EF FP4 等作为官方公开目标规格解读，而不是已经上市产品的独立实测结论。

资料来源：AMD Advancing AI 2025 distribution deck https://www.amd.com/content/dam/amd/en/documents/corporate/events/advancing-ai-2025-distribution-deck.pdf；AMD 2024 Instinct roadmap 新闻稿 https://ir.amd.com/news-events/press-releases/detail/1201/amd-accelerates-pace-of-data-center-ai-innovation-and-leadership-with-expanded-amd-instinct-gpu-roadmap；Tom’s Hardware 报道 https://www.tomshardware.com/pc-components/gpus/amd-data-center-roadmap-2026-2027-mi400-mi500-zen-6-zen-7。

#### 🧪 练习题

```yaml
question: "评估 AMD MI400/Helios 时，为什么不能只看单 GPU 的 FP4 峰值算力？"
options:
  - "因为大模型训练和推理还受 HBM4 容量/带宽、scale 元数据、通信 fabric、ROCm kernel 和调度 overlap 共同限制"
  - "因为 FP4 峰值与矩阵乘完全无关"
  - "因为 HBM4 会让通信变得不需要任何互连"
  - "因为 ROCm 只能运行 CPU 程序"
answer: 0
explain: "MI400 的 40 PF FP4 只有在 HBM4、scale/反量化路径、UALink/Ultra Ethernet 通信和 ROCm 内核都能持续供给数据时才会转化为真实吞吐。"
```
