### TPU v4: 基于光路交换的可重构ML超级计算机

```yaml
id: tpu_v4
name: "TPU v4"
year: 2023
organization: Google
category: tpu
parent: tpu_v2v3
paper: "TPU v4: An Optically Reconfigurable Supercomputer for Machine Learning with Hardware Support for Embeddings"
arxiv: "2304.01433"
venue: ISCA 2023
authors: "Norm Jouppi, George Kurian, Sheng Li, Peter Ma, et al."
```

---

## 一句话总结

TPU v4 通过**光路交换机（OCS）实现 4096 芯片的 3D Torus 拓扑动态重构**，并引入 **SparseCore 硬件加速嵌入训练**，在同等规模下比 A100 快 1.2–1.7×、能效高 1.3–1.9×。

---

## 核心要点

1. **OCS 可重构互连**：64 个 4×4×4 电气立方体通过 48 个 136 端口 MEMS 光路交换机组成 4096 芯片超算，支持按作业动态切换 3D Torus 拓扑（含 twisted torus），OCS 成本 <5% 总资本、<3% 总功耗。

2. **SparseCore 嵌入加速**：每芯片 4 个 SparseCore（仅占 ~5% 面积/功耗），含 16 个 compute tile + 5 个跨通道单元，为推荐模型嵌入训练提供专用 scatter/gather 和 all-to-all 通信支持，比 CPU 方案快 30×。

3. **芯片架构升级**：7nm 工艺、2 个 TensorCore（各含 4 个 128×128 MXU）、新增 128 MiB CMEM 片上缓存、275 TFLOPS (bf16)、32 GiB HBM2 @ 1200 GB/s，峰值性能 2.2× TPU v3。

4. **Twisted Torus 拓扑**：对 n×n×2n 形状切片，通过 OCS 重编程实现扭曲环面，all-to-all 吞吐提升 1.31–1.63×，无需物理重新布线。

5. **PA-NAS 协同优化**：平台感知神经架构搜索可同时优化模型结构和 TPU 拓扑，DLRM 端到端性能提升 >10%，LLM 拓扑搜索提升可达 2.3×。

6. **生产性能**：同等切片大小下 TPU v4 比 v3 快 1.5–3.5×；MLPerf 中比 A100 快 1.15×(BERT)–1.67×(ResNet)，功耗低 30–48%；运营碳排放比本地 DSA 低 ~18×。

7. **可用性与调度**：OCS 路由绕过故障节点，主机可用性 99.0% 时仍有合理 goodput；每个 4³ 块独立部署，调度器可从任意位置拼接切片，支持非 2 的幂切片（如 4×4×12=192）。

---

## 深入细节

### 1. 系统架构总览

```
┌─────────────────────────────────────────────────────────┐
│                TPU v4 Supercomputer (4096 chips)         │
│                                                         │
│  ┌─────────┐  ┌─────────┐       ┌─────────┐            │
│  │ 4³ Block │  │ 4³ Block │ ...  │ 4³ Block │  × 64     │
│  │ (64 chip)│  │ (64 chip)│       │ (64 chip)│           │
│  │ 1 rack   │  │ 1 rack   │       │ 1 rack   │           │
│  └────┬─────┘  └────┬─────┘       └────┬─────┘           │
│       │              │                  │                 │
│       └──────────────┼──────────────────┘                 │
│                      ▼                                    │
│         ┌──────────────────────┐                          │
│         │   48 × Palomar OCS   │  136×136 MEMS mirrors   │
│         │   (光路交换机层)       │  毫秒级切换             │
│         └──────────────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

**关键设计决策**：
- **为什么选 4³ = 64 芯片作为电气构建块？** 3D Torus 中立方体有最佳等分带宽。4 个 TPU v4 共享一个 CPU 主机，64 芯片 + 16 主机恰好装入一个机架。
- **为什么用 OCS 而非 InfiniBand？** OCS 是无源光反射（MEMS 镜面），支持任意带宽（波分复用可达 Tbit/s 级），功耗极低；IB 交换机需要有源包处理，568 台 IB 交换机成本远高于 48 台 OCS，且 all-reduce 慢 1.8–2.4×。
- **每个 4³ 块的 96 条光纤**：6 个面 × 16 条/面 = 96 条光纤，对面连同一 OCS，故 96/2 = 48 个 OCS。

### 2. OCS 拓扑重构机制

```
常规 Torus (4×2 示例):          Twisted Torus:
  ┌──0,0──0,1──0,2──0,3──┐      ┌──0,0──0,1──0,2──0,3──┐
  │   │    │    │    │    │      │   │    │    │    │    │
  └──1,0──1,1──1,2──1,3──┘      └──1,2──1,3──1,0──1,1──┘
       电气连接(固定)                    ↑ OCS 重编程光连接
       光连接(可重构)                    (坐标偏移, 降低最坏延迟)
```

**Twisted Torus 原理**：对 k×k×2k 形状切片，通过 OCS 重新编程光连接的路由表（无需物理重新布线），将环绕链路的目标偏移，使得最坏情况下的跳数减少。实测 all-to-all 吞吐：
- 4×4×8 切片：twisted 比 regular 快 **1.63×**
- 4×8×8 切片：twisted 比 regular 快 **1.31×**

**生产使用统计**（2022 年 11 月采样）：
- 29% 作业 < 64 芯片（仅 2D mesh）
- 71% ≥ 64 芯片中，48% 可 twist（n×n×2n 或 n×2n×2n）
- 可 twist 中 86% 实际选择了 twisted torus
- 最受欢迎切片：4×4×4 (14%)、4×4×8_T (16%)、4×8×8_T (9.2%)、8×8×8 (9.6%)

### 3. SparseCore 架构详解

```
┌─────────────────── SparseCore ───────────────────────┐
│                                                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │          5 个 Cross-Channel Units (金色)          │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐  │  │
│  │  │Dedup Unit│Distribute│ Sort/    │Reduce    │  │  │
│  │  │(去重)    │Unit(分发)│ Merge    │Unit(规约)│  │  │
│  │  └──────────┴──────────┴──────────┴──────────┘  │  │
│  └─────────────────────────────────────────────────┘  │
│                         ↕                             │
│  ┌──────── 2.5 MiB Sparse Vector Memory (Spmem) ──┐  │
│  │  Bank 0 │ Bank 1 │ ... │ Bank 15               │  │
│  └─────────┴────────┴─────┴───────────────────────┘  │
│       ↕          ↕              ↕                     │
│  ┌─ Tile 0 ─┐ ┌─ Tile 1 ─┐  ┌─ Tile 15 ─┐          │
│  │ Fetch Unit│ │ Fetch Unit│  │ Fetch Unit │          │
│  │ scVPU(8w) │ │ scVPU(8w) │  │ scVPU(8w)  │          │
│  │ Flush Unit│ │ Flush Unit│  │ Flush Unit │          │
│  │    ↕      │ │    ↕      │  │    ↕       │          │
│  │ HBM Ch.0 │ │ HBM Ch.1 │  │ HBM Ch.15  │          │
│  └──────────┘ └──────────┘  └───────────┘           │
└───────────────────────────────────────────────────────┘
```

**嵌入训练流水线**：
```
1. Fetch: 从 HBM 读取嵌入向量 → Spmem
2. Dedup: 对高频特征值去重（减少冗余内存访问和通信量）
3. Distribute: 跨芯片 all-to-all 交换嵌入向量
4. scVPU: 8-wide SIMD 计算（前向/反向传播中的向量运算）
5. Sort/Reduce: 梯度聚合
6. Flush: 更新后的参数写回 HBM
```

**为什么不用 TensorCore 做嵌入？**
- 嵌入是小粒度 scatter/gather 访存，算术强度极低
- TensorCore 的宽 MXU 和 VPU 针对稠密运算优化，处理稀疏访存效率低
- 嵌入放 CPU 内存则受限于 Amdahl 定律（4:1 TPU/CPU 比率放大瓶颈）

**性能关键**：3D Torus 等分带宽 ∝ N^(2/3)（vs 2D 的 N^(1/2)），在 256 芯片时 TPU v4 等分带宽比 v3 高 4×，嵌入性能提升 1.1–2.0×。

### 4. 芯片微架构

| 特性 | TPU v4 | TPU v3 |
|------|--------|--------|
| 工艺 | 7nm, <600mm² | 16nm, <700mm² |
| 晶体管 | 220 亿 | 100 亿 |
| 峰值算力 | 275 TFLOPS (bf16/int8) | 123 TFLOPS (bf16) |
| 时钟 | 1050 MHz | 940 MHz |
| MXU | 2×4 = 8 个 128×128 | 2×2 = 4 个 128×128 |
| 片上存储 | 128 MiB CMEM + 32 MiB VMEM + 10 MiB spMEM | 32 MiB VMEM + 5 MiB spMEM |
| HBM | 32 GiB, 1200 GB/s | 32 GiB, 900 GB/s |
| ICI | 6 links × 50 GB/s = 300 GB/s | 4 links × 70 GB/s = 280 GB/s |
| SparseCore | 4 个/芯片 | 2 个/芯片 |
| 功耗(实测) | 121/170/192 W (min/mean/max) | 175/220/262 W |
| 最大规模 | 4096 芯片 | 1024 芯片 |

**CMEM 的价值**：128 MiB 共享片上缓存是 v4 新增的关键特性。关闭 CMEM 后性能下降 1.18×，RNN1（小权重小 batch）下降 2×。CMEM 带宽远高于 HBM，减少了对外部存储的依赖。

### 5. 性能对比与 Roofline 分析

**TPU v4 vs TPU v3（同等切片大小）**：
- 通用负载：1.5–2.0×
- DLRM0：3.0–3.5×（SC 数量翻倍 + 更快时钟）
- RNN1：3.3×（受益于 CMEM 带宽）
- 整体：2.1× 性能，2.7× 性能/瓦特（~40% 来自工艺，~60% 来自设计）

**TPU v4 vs A100（MLPerf Training 2.0）**：
- BERT：TPU v4 快 1.15×（4096 芯片）
- ResNet：TPU v4 快 1.67×（4096 vs 4216 芯片）
- 功耗：A100 高 1.3–1.9×（BERT: 380W vs 197W, ResNet: 273W vs 206W）

**为什么 A100 峰值 FLOPS 更高但实际更慢？**
- A100 boost 频率 1410 MHz 实测被功耗限制到 ~1280 MHz
- TPU v4 的 128×128 MXU 复用率（128×）远高于 A100 的 4×4 阵列（4×）
- TPU v4 片上 SRAM 4× 大（160 vs 40 MiB），减少 DRAM 访问
- A100 多线程需要 27 MiB 寄存器堆（vs TPU v4 的 0.25 MiB），增加能耗

### 6. PA-NAS 拓扑协同优化

```python
# PA-NAS 搜索空间伪代码
def pa_nas_search(model, chip_count):
    best_config = None
    for topology in generate_topologies(chip_count):
        # e.g., 8×8×8, 4×8×16, 4×4×32 for 512 chips
        for partition in generate_partitions(topology):
            # [pipeline_depth, data_parallel, model_dim1, model_dim2]
            for activation_spec in ["1D", "2D"]:
                for weight_spec in ["1D", "2D"]:
                    perf = simulate(model, topology, partition,
                                   activation_spec, weight_spec)
                    quality = evaluate_quality(model)
                    if pareto_optimal(perf, quality, best_config):
                        best_config = (topology, partition, ...)
    return best_config

# 实际案例: 512-chip LLM
# Novice: 4×8×16, [1,1,16,32], 2D/2D → 17.9 seq/s
# PA-NAS: 8×8×8, [1,1,64,8],  1D/2D → 41.3 seq/s (2.3×)
```

**DLRM 优化**：原始 DLRM0 中 SC 空闲 ~25%（SC-TC 负载不均衡），PA-NAS 通过调整稀疏层和稠密层的计算分配，实现近乎完美的 SC-TC 负载平衡，端到端性能提升 >10%。

---

## 练习题

### Q1: OCS 构建块大小选择
**问题**：为什么 TPU v4 选择 4×4×4 = 64 芯片作为电气构建块，而非 8×8×8 = 512？如果选择 2×2×2 = 8 芯片会有什么问题？

**参考答案**：
- 4³ 选择原因：(1) 3D 立方体有最佳等分带宽；(2) 4 TPU/主机 × 16 主机 = 64 芯片恰好装入一个机架；(3) 512 需要多机架，增加电气布线复杂度。
- 2³ 的问题：(1) 每块仅 8 芯片，需要 512 个块和更多 OCS 端口来组成 4096 芯片系统；(2) 光纤数量爆炸（每块 6 面 × 4 链路 = 24 光纤，512 块共 12288 条）；(3) 更多光电转换增加延迟和成本。

### Q2: 等分带宽与拓扑维度
**问题**：解释为什么 3D Torus 的等分带宽 ∝ N^(2/3) 而 2D Torus ∝ N^(1/2)，并计算 1024 芯片时两者的比值。

**参考答案**：
- 对于 d 维 Torus（每维 k 个节点，N = k^d），等分切面穿过 d-1 维的 k^(d-1) 条链路，故等分带宽 ∝ k^(d-1) = N^((d-1)/d)。
- 2D: N^(1/2)；3D: N^(2/3)。
- 1024 芯片：2D = 1024^(1/2) = 32；3D = 1024^(2/3) ≈ 101.6。比值 ≈ 3.17×，与论文 Figure 8 中 2–4× 的范围一致。

### Q3: SparseCore vs TensorCore 设计权衡
**问题**：SparseCore 仅占 ~5% 芯片面积和功耗，却使 DLRM 性能提升 5–7×（相比嵌入放 CPU 内存）。分析这种"小投入大回报"的根本原因。

**参考答案**：
- **Amdahl 定律放大效应**：4:1 TPU/CPU 比率意味着 CPU 成为严重瓶颈，即使 CPU 处理嵌入只占模型一小部分，也会限制整体吞吐。
- **访存模式匹配**：嵌入是稀疏 scatter/gather，SC 的 16 个 tile 各有独立 HBM 通道，天然支持高并发随机访问；TensorCore 的宽 SIMD 对此效率低下。
- **通信优化**：SC 直连 ICI 网络，all-to-all 嵌入交换无需经过 CPU 或 PCIe 瓶颈。
- **去重硬件**：专用 Dedup Unit 减少冗余内存访问和网络通信，这在软件实现中开销大。

### Q4: Twisted Torus 的适用条件
**问题**：为什么只有 n×n×2n 或 n×2n×2n 形状的切片才能使用 twisted torus？对于 8×8×8 的完美立方体切片，twisted torus 是否有意义？

**参考答案**：
- Twisted torus 通过偏移环绕链路来减少最坏跳数，要求至少一个维度是另一个的 2 倍（k×k×2k），这样偏移后坐标映射才能保持一致性且降低直径。
- 对于 8×8×8 完美立方体，所有维度对称，已经是最优的对称 torus（最小延迟、最大等分带宽），twisting 不会带来改善。论文 Table 2 中 8×8×8 (512 chips, 9.6%) 确实列在 "Regular Tori" 而非 "Twisted" 类别。

### Q5: OCS 可用性分析
**问题**：假设 CPU 主机可用性为 99.5%，4096 芯片系统中平均有多少主机故障？在无 OCS 的静态连接中，为什么 2048 芯片切片的 goodput 仅约 50%？

**参考答案**：
- 1024 主机 × 0.5% 故障率 = ~5 台主机故障（~20 芯片不可用）。
- 无 OCS 时，切片必须是物理连续的。2048 芯片切片占总 4096 的 50%，需要一大块连续区域。故障主机"打断"连续区域，使得最多只能调度一个 2048 切片，剩余 2048 芯片作为备用（无法利用），goodput = 50%。
- 有 OCS 时，可以从任意位置的 4³ 块拼接切片，绕过故障块，goodput 显著提升。