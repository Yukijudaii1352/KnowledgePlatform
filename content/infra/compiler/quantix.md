### Quantix — High-Throughput Non-uniformly Quantized 3-bit LLM Inference

```yaml
id: quantix
title: "High-Throughput Non-uniformly Quantized 3-bit LLM Inference"
authors: "Yuang Chen, Wenqi Zeng, Jeffrey Xu Yu"
year: "2025"
venue: "PPoPP 2026"
paper_url: "https://doi.org/10.1145/3774934.3786423"
tags: ["quantization", "non-uniform", "3-bit", "LLM-inference", "GPU-kernel", "Tensor-Core", "bit-shuffling", "CUDA"]
one_sentence_summary: "Quantix 提出硬件对齐的位重排（bit shuffling）方案和融合反量化-矩阵乘流水线，将基于聚类的非均匀 3-bit 量化 LLM 推理在 NVIDIA L40 GPU 上实现 4.82× 内核级和 11.46× 端到端加速。"
motivation: "非均匀量化GPU推理加速"
```

#### 📝 一句话总结

Quantix 针对基于聚类的非均匀量化（clustering-based non-uniform quantization）将 LLM 权重压缩至 3 bit 后在 GPU 上推理吞吐严重下降的问题，提出了两项核心优化：(1) 硬件对齐的位重排方案（hardware-aligned bit shuffling），使 3-bit 数据在 GPU 内存层次中实现高效对齐访问；(2) 融合反量化-乘法流水线（fused dequantization-multiplication pipeline），将反量化操作映射到 CUDA Core、矩阵乘法映射到 Tensor Core 并行执行，消除传统方案中反量化的串行开销。在 NVIDIA L40 GPU 上，Quantix 实现了相对 FP16 cuBLAS 4.82× 的内核级加速，以及相对现有最优量化推理方案 11.46× 的端到端加速。

#### 🎯 核心要点

- **问题定义**：基于聚类的非均匀量化（如 k-means 量化）可将 LLM 权重压缩至 3 bit 并保持较高精度，但推理时需要查表反量化（codebook lookup），导致严重的计算开销和 GPU 利用率低下，实际推理速度甚至慢于 FP16 基线
- **3-bit 对齐难题**：3 bit 不是 2 的幂次，无法自然对齐到 GPU 的 8/16/32/128-bit 内存访问粒度，朴素的位打包（bit packing）方案导致大量跨字（cross-word）访问和位移操作，严重制约内存带宽利用率
- **硬件对齐位重排**：Quantix 设计了一种位重排方案，将 3-bit 量化索引重新组织排列，使得每次 32-bit 或 128-bit 内存加载都能获取完整的量化值集合，消除跨字边界访问，最大化内存事务效率
- **融合反量化-乘法流水线**：传统方案先将所有量化权重反量化为 FP16 再执行 GEMM，Quantix 将反量化（codebook lookup + 位提取）映射到 CUDA Core，将矩阵乘法映射到 Tensor Core，两者通过共享内存（shared memory）在流水线中并行执行，隐藏反量化延迟
- **双核协同架构**：在同一 SM（Streaming Multiprocessor）内，部分 warp 负责 CUDA Core 上的反量化工作，部分 warp 负责 Tensor Core 上的矩阵乘累加（MMA），通过 warp 级流水线调度实现计算资源的充分利用
- **性能结果**：在 NVIDIA L40 GPU 上，内核级加速 4.82×（vs FP16 cuBLAS），端到端加速 11.46×（vs 现有最优非均匀量化方案），同时保持非均匀量化的精度优势

#### 🔬 深入细节

##### 4.1 核心架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    Quantix 推理框架                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────┐  │
│  │  3-bit 量化   │    │  Bit Shuffle │    │ Codebook  │  │
│  │  权重存储     │───▶│  重排引擎     │───▶│  查表反量化│  │
│  │  (Global Mem) │    │  (对齐加载)   │    │ (CUDA Core)│  │
│  └──────────────┘    └──────────────┘    └─────┬─────┘  │
│                                                │        │
│                                          Shared Memory  │
│                                                │        │
│  ┌──────────────┐    ┌──────────────┐    ┌─────▼─────┐  │
│  │  FP16 激活值  │───▶│  激活值加载   │───▶│ Tensor Core│  │
│  │  (Global Mem) │    │  (对齐加载)   │    │  MMA 计算  │  │
│  └──────────────┘    └──────────────┘    └───────────┘  │
│                                                         │
│         CUDA Core 反量化 ∥ Tensor Core GEMM             │
│              (Warp-level Pipeline)                       │
└─────────────────────────────────────────────────────────┘
```
*图 1：Quantix 整体架构。3-bit 量化权重经过位重排后对齐加载，CUDA Core 执行 codebook 查表反量化，Tensor Core 并行执行矩阵乘累加，两者通过共享内存和 warp 级流水线协同工作。*

##### 4.2 算法伪代码

```python
# Quantix 融合反量化-矩阵乘内核（概念性伪代码）
def quantix_fused_gemm_kernel(
    Q_packed,      # 3-bit 量化权重（位重排后），shape: [K, N/pack_factor]
    codebook,      # 非均匀量化码本，shape: [num_groups, 2^3]
    A,             # FP16 激活值，shape: [M, K]
    C,             # 输出矩阵，shape: [M, N]
):
    # === 阶段 1：位重排加载（Hardware-Aligned Bit Shuffling）===
    # 每个 warp 加载 128-bit 对齐的量化权重块
    # 位重排保证每次加载获取完整的 3-bit 索引集合
    packed_data = aligned_load_128bit(Q_packed, block_offset)
    
    # === 阶段 2：CUDA Core 反量化（与 Tensor Core MMA 流水线并行）===
    for tile_k in range(0, K, TILE_K):
        # --- CUDA Core Warps: 反量化 ---
        # 从 packed_data 中提取 3-bit 索引（无跨字访问）
        indices = extract_3bit_indices(packed_data, tile_k)  # 位操作
        
        # Codebook 查表：index → FP16 反量化值
        W_dequant = codebook_lookup(codebook, indices)  # shape: [TILE_K, TILE_N]
        
        # 写入共享内存供 Tensor Core 使用
        shared_mem.store(W_dequant, smem_offset)
        __syncthreads()
        
        # --- Tensor Core Warps: 矩阵乘累加 ---
        # 从共享内存加载反量化权重片段
        W_frag = load_matrix_fragment(shared_mem, smem_offset)
        A_frag = load_matrix_fragment(A, tile_k)
        
        # Tensor Core MMA: C += A_frag @ W_frag
        C_accum = mma_sync(A_frag, W_frag, C_accum)
    
    # 写回结果
    store_output(C, C_accum, block_offset)
```

```python
# 硬件对齐位重排方案（离线预处理）
def hardware_aligned_bit_shuffle(weights_3bit, group_size=128):
    """
    将 3-bit 量化索引重排为硬件对齐的打包格式。
    
    问题：10 个 3-bit 值 = 30 bits，无法填满 32-bit 字
          朴素打包导致值跨越字边界
    
    解决：重排索引顺序，使每个 32-bit 字内的值完整且对齐
    """
    N = len(weights_3bit)
    # 32 个 3-bit 值 = 96 bits = 3 个 32-bit 字（最小公倍数）
    PACK_UNIT = 32  # 每个打包单元处理 32 个 3-bit 值
    
    packed = []
    for i in range(0, N, PACK_UNIT):
        chunk = weights_3bit[i:i+PACK_UNIT]  # 32 个 3-bit 索引
        
        # 位重排：将 32 个 3-bit 值的各位分离
        # bit[2]: 高位平面, bit[1]: 中位平面, bit[0]: 低位平面
        plane_2 = pack_bit_plane(chunk, bit_pos=2)  # 32 bits → 1 个 uint32
        plane_1 = pack_bit_plane(chunk, bit_pos=1)  # 32 bits → 1 个 uint32
        plane_0 = pack_bit_plane(chunk, bit_pos=0)  # 32 bits → 1 个 uint32
        
        # 3 个 uint32 完美对齐，无跨字访问
        packed.extend([plane_2, plane_1, plane_0])
    
    return packed
```

##### 4.3 方法细节

**动机与背景：非均匀量化的精度-速度困境**

大语言模型（LLM）的推理部署面临巨大的内存和计算挑战。量化是最主要的压缩手段之一，将权重从 FP16（16 bit）压缩至更低位宽。现有量化方法分为两大类：

1. **均匀量化**（Uniform Quantization）：量化级别等间距分布，反量化仅需简单的缩放和偏移操作（\(w = s \cdot q + z\)），计算开销极低。代表方法包括 GPTQ、AWQ、QuIP 等，通常在 4-bit 下工作良好，但在 3-bit 及以下精度显著下降。

2. **非均匀量化**（Non-uniform Quantization）：使用聚类算法（如 k-means）找到最优量化级别，级别间距不等，能更好地匹配权重的实际分布。代表方法包括 SqueezeLLM、AQLM、NormalFloat 等。非均匀量化在 3-bit 下仍能保持较高精度，但反量化需要查表操作（codebook lookup），计算开销远大于均匀量化。

Quantix 的核心观察是：非均匀量化在 3-bit 下的精度优势是显著的（相比均匀量化可降低 1-3 个困惑度点），但现有 GPU 实现的反量化开销完全抵消了内存带宽节省，导致实际推理速度甚至慢于 FP16 基线。这一性能瓶颈有两个根本原因：

**原因一：3-bit 的内存对齐问题。** GPU 的内存系统以 32-bit（4 字节）或 128-bit（16 字节）为最小访问粒度。4-bit 量化值可以自然地 2 个一组打包到 1 个字节中，8 个一组打包到 1 个 32-bit 字中。但 3-bit 值无法整除这些粒度：10 个 3-bit 值占 30 bits，11 个占 33 bits，都无法填满 32-bit 字。朴素的连续打包方案会导致某些 3-bit 值跨越 32-bit 字边界，提取时需要加载两个字并进行复杂的位移和掩码操作，严重降低内存带宽利用率。

**原因二：反量化的串行开销。** 传统实现采用两阶段方案：先将所有量化权重反量化为 FP16，再调用 cuBLAS 执行矩阵乘法。反量化阶段涉及大量的位操作（位提取）和查表操作（codebook lookup），这些操作在 GPU 上的计算密度低、内存访问模式不规则，无法充分利用 GPU 的计算资源。更关键的是，反量化和矩阵乘法是串行执行的，无法重叠计算。

**硬件对齐位重排（Hardware-Aligned Bit Shuffling）**

Quantix 的第一个核心创新是位重排方案。其核心思想是：不按照权重矩阵的自然顺序连续打包 3-bit 值，而是重新组织排列顺序，使得每次内存加载都能获取完整的、不跨字的量化值集合。

具体方法是采用**位平面分离**（bit-plane decomposition）策略。对于一组 32 个 3-bit 量化索引（共 96 bits = 3 个 32-bit 字），将每个索引的第 0 位、第 1 位、第 2 位分别收集到三个独立的 32-bit 字中：

$$\text{plane}_b[j] = \text{index}[j].\text{bit}[b], \quad b \in \{0, 1, 2\}, \quad j \in \{0, \ldots, 31\}$$

这样，3 个 32-bit 字完美存储 32 个 3-bit 值，每次 128-bit 加载（4 个 32-bit 字）可以获取 \(\lfloor 4/3 \rfloor \times 32 = 32\) 个完整的量化索引（加上 1 个字的冗余或用于下一组）。更重要的是，从位平面恢复原始 3-bit 索引只需要简单的位与（AND）和位移（SHIFT）操作，无需处理跨字边界的情况。

这种位重排是一个**离线预处理**步骤，在模型加载时一次性完成，不影响推理时的在线性能。重排后的数据布局与 GPU 的内存访问模式完美对齐，使得量化权重的加载效率接近理论带宽上限。

**融合反量化-乘法流水线（Fused Dequantization-Multiplication Pipeline）**

Quantix 的第二个核心创新是将反量化和矩阵乘法融合到同一个 CUDA 内核中，并利用 CUDA Core 和 Tensor Core 的异构计算能力实现流水线并行。

现代 NVIDIA GPU（如 L40、A100、H100）同时具备两种计算单元：
- **CUDA Core**：通用标量/向量计算单元，擅长位操作、条件分支、查表等不规则计算
- **Tensor Core**：专用矩阵乘累加单元，执行 \(D = A \times B + C\) 的小矩阵运算（如 16×16×16），吞吐量远超 CUDA Core

Quantix 的关键洞察是：反量化操作（位提取 + codebook 查表）本质上是 CUDA Core 擅长的不规则计算，而矩阵乘法是 Tensor Core 擅长的规则计算。在传统的两阶段方案中，这两种计算单元无法同时工作——反量化阶段 Tensor Core 空闲，矩阵乘阶段 CUDA Core 空闲。

Quantix 设计了一个 warp 级流水线，在同一个 SM 内：
1. **Producer warps**（生产者）：使用 CUDA Core 执行位提取和 codebook 查表，将反量化后的 FP16 权重写入共享内存
2. **Consumer warps**（消费者）：使用 Tensor Core 从共享内存读取反量化权重，与激活值执行矩阵乘累加

通过双缓冲（double buffering）技术，当 consumer warps 处理第 \(k\) 个 tile 时，producer warps 同时准备第 \(k+1\) 个 tile 的反量化数据，实现计算的完全重叠：

$$\text{Pipeline Stage } k: \quad \underbrace{\text{Dequant}(W_{k+1})}_{\text{CUDA Core}} \parallel \underbrace{\text{MMA}(A_k, W_k)}_{\text{Tensor Core}}$$

**Codebook 查表优化**

非均匀量化的反量化核心是 codebook 查表：给定 3-bit 索引 \(q \in \{0, 1, \ldots, 7\}\)，从码本中取出对应的 FP16 值 \(c[q]\)。由于码本只有 8 个条目（\(2^3 = 8\)），Quantix 将码本加载到寄存器或共享内存中，利用 GPU 的快速本地存储实现零延迟查表。对于分组量化（group quantization），每个组有独立的码本，Quantix 将当前处理组的码本预加载到寄存器文件中，避免反复访问全局内存。

**Warp 调度与资源分配**

在 SM 内部，Quantix 需要精心平衡 producer warps 和 consumer warps 的数量比例。如果 producer warps 过多，Tensor Core 利用率不足；如果过少，反量化成为瓶颈。最优比例取决于反量化的计算强度和 Tensor Core 的吞吐量。由于 3-bit 非均匀量化的反量化涉及位操作和查表两步，其计算强度高于均匀量化的简单缩放，因此需要相对更多的 producer warps。

##### 4.4 核心公式

**非均匀量化（聚类量化）**：

$$q^* = \arg\min_{q \in \{0,\ldots,2^b-1\}} |w - c[q]|$$

其中 \(w\) 为原始 FP16 权重，\(c[\cdot]\) 为通过 k-means 聚类得到的码本，\(b=3\) 为量化位宽。

> 💡 **关键**：非均匀量化的码本条目 \(c[q]\) 间距不等，能更好地匹配权重分布的密度，在 3-bit 下比均匀量化保持更高精度。

**反量化（Codebook Lookup）**：

$$\hat{w} = c[q], \quad q = \text{extract\_3bit}(\text{packed\_data}, \text{offset})$$

> ⚠️ **注意**：与均匀量化的 \(\hat{w} = s \cdot q + z\)（仅需一次乘加）不同，非均匀量化需要查表操作，这是推理开销的主要来源。

**位平面分离（Bit-Plane Decomposition）**：

$$\text{plane}_b = \bigoplus_{j=0}^{31} \left(\text{index}[j].\text{bit}[b] \ll j\right), \quad b \in \{0, 1, 2\}$$

32 个 3-bit 索引 → 3 个 32-bit 字，完美对齐，无跨字访问。

**融合流水线吞吐模型**：

$$T_{\text{fused}} = \max\left(T_{\text{dequant}}^{\text{CUDA Core}},\ T_{\text{MMA}}^{\text{Tensor Core}},\ T_{\text{mem}}\right)$$

> 💡 **关键**：融合流水线的总时间由三者中的最慢者决定（而非串行相加），这是加速的根本来源。理想情况下，反量化时间被 Tensor Core 计算完全隐藏。

**加速比分析**：

$$\text{Speedup}_{\text{kernel}} = \frac{T_{\text{FP16-cuBLAS}}}{T_{\text{Quantix}}} = 4.82\times$$

$$\text{Speedup}_{\text{e2e}} = \frac{T_{\text{SOTA-quantized}}}{T_{\text{Quantix}}} = 11.46\times$$

> ⚠️ **注意**：11.46× 的端到端加速不仅来自内核优化，还包括 3-bit 压缩带来的内存带宽节省（权重传输量仅为 FP16 的 3/16 ≈ 18.75%），这在 LLM 推理的 memory-bound 场景中尤为重要。

#### 🧪 练习题

```yaml
question: "Quantix 采用位平面分离（bit-plane decomposition）而非朴素连续打包来存储 3-bit 量化值的主要原因是什么？"
options:
  - "位平面分离可以减少量化误差，提高模型精度"
  - "位平面分离使压缩率从 3-bit 进一步降低到 2-bit"
  - "3-bit 值无法整除 32-bit 字边界，位平面分离消除了跨字访问，实现硬件对齐的高效内存加载"
  - "位平面分离是 Tensor Core 的硬件要求，不支持其他数据格式"
answer: 2
explain: "3-bit 不是 2 的幂次，朴素连续打包会导致某些 3-bit 值跨越 32-bit 字边界，提取时需要加载两个字并进行复杂位操作。位平面分离将 32 个 3-bit 值的各位分别收集到 3 个独立的 32-bit 字中，每个字内的位完整对齐，消除了跨字访问，使 GPU 内存加载效率接近理论带宽上限。"
```