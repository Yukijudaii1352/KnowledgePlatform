### Quantix - 非均匀量化LLM推理加速编译器

```yaml
id: quantix
name: Quantix
full_name: 非均匀量化LLM推理加速编译器 (Quantix)
year: '2026'
org: Community
paper_url: https://dl.acm.org/doi/abs/10.1145/3774934.3786423
category: hardware_specific
parent: tensorrt
motivation: 3-bit非均匀量化编译优化，大幅提升LLM推理吞吐
```

#### 📝 一句话总结

Quantix 针对 3-bit 非均匀量化 LLM 权重“省显存但反而跑不快”的问题，提出硬件对齐 bit shuffling 和融合反量化-矩阵乘流水线，把 codebook lookup 反量化映射到 CUDA Core，把 GEMM 映射到 Tensor Core，从而把 3-bit 压缩真正转化为推理吞吐提升。

#### 🎯 核心要点

- 面向 clustering-based non-uniform quantization：3-bit 权重用每组 8-entry center/codebook 表示，比均匀 3-bit 更容易保精度，但推理必须执行索引提取和查表反量化
- 解决 3-bit 非对齐访问：3 不是 GPU 内存访问粒度的因子，朴素连续 bit packing 会产生跨 32-bit/128-bit word 的提取开销
- 硬件对齐 bit shuffling：官方 artifact 中把 3-bit index 拆成 1-bit segment 和 2-bit segment，并按 `uint4`/128-bit 友好的方式搬运到 shared memory
- 融合内核：在同一 CUDA kernel 内完成 quantized weight load、center load、register-level dequant、activation load 和 Tensor Core MMA
- 双层流水线：使用 shared-memory pipeline 和 register double buffering，在处理当前 K tile 时预取下一 tile，并把反量化与 MMA 交错执行
- 论文结果：在 NVIDIA L40 GPU 上相对 FP16 cuBLAS 获得平均 4.82x kernel-level speedup，相对已有量化方法获得最高 11.46x end-to-end speedup

#### 🔬 深入细节

![Quantix 官方 artifact 仓库预览图](https://opengraph.githubassets.com/quantix/yuang-chen/Quantix-PPoPP26)
*图：Quantix 官方 artifact 仓库 `yuang-chen/Quantix-PPoPP26` 的 GitHub OpenGraph 远程图片。ACM 页面公开摘要和 DOI，官方 artifact 提供 CUDA/C++ 实现，但未提供可拆出的论文架构图；下文的架构解读基于 DOI/PPoPP 摘要和官方 artifact 中 `gemm_3bit_reg.cuh`、`global_fp3.cuh`、`shared_fp3.cuh`、`dequant_parallel_fp3.cuh` 的实现。*

```python
# Quantix 3-bit 非均匀量化 GEMM 的概念伪代码
def quantix_3bit_gemm(weights_1bit, weights_2bit, centers, activations):
    # weights_1bit / weights_2bit 是离线 bit shuffling 后的硬件对齐段
    # centers: 每个 group 的 8 个 FP16 非均匀量化中心
    acc = fp32_zeros(BLOCK_M, BLOCK_N)

    # 预取 packed weight segment、activation tile 和 center table
    smem_w1, smem_w2 = cp_async_gmem_to_smem(weights_1bit, weights_2bit)
    smem_x = cp_async_gmem_to_smem(activations)
    center_reg = load_centers_to_registers(centers)

    # pipeline over K tiles
    for k_tile in range(num_k_tiles):
        # 1. 继续预取下一 tile，隐藏 global memory latency
        prefetch_next_weight_segments()
        prefetch_next_activation_tile()

        # 2. 从 shared memory 取当前 slice 的 1-bit/2-bit 段到寄存器
        w1_reg = load_1bit_slice(smem_w1, slice_id=k_tile)
        w2_reg = load_2bit_slice(smem_w2, slice_id=k_tile)

        # 3. CUDA Core/SIMT: 组合出 3-bit index，并查 8-entry center 表
        packed_idx = combine_segments(w1_reg, w2_reg)
        w_fp16_frag = lookup(center_reg, packed_idx)  # q in [0, 7] -> c[q]

        # 4. Tensor Core: 用反量化出的 FP16 fragment 做 MMA
        x_frag = load_activation_fragment(smem_x, k_tile)
        acc = mma_m16n8k16(x_frag, w_fp16_frag, acc)

    return store(acc)
```

**动机：非均匀 3-bit 量化的瓶颈不是压缩率，而是反量化路径。** LLM 推理中的线性层通常 memory-bound，直觉上把 FP16 权重压到 3 bit 应该显著减少 HBM 读取量。非均匀量化用 k-means 或类似聚类得到 center/codebook，3-bit index \(q\in\{0,\ldots,7\}\) 指向 8 个 FP16 center，因此可比均匀 3-bit 更贴合权重分布：

$$
q^\* = \arg\min_{q\in\{0,\ldots,7\}}\left|w - c_q\right|,\qquad \hat{w}=c_{q^\*}
$$

问题是在线推理时不能只读 index，还要从 packed bits 中抽取 \(q\)，再做 \(\hat{w}=c_q\) 查表。若先完整反量化成 FP16 矩阵再调用 cuBLAS，执行时间近似为：

$$
T_{\text{two-stage}} = T_{\text{unpack}} + T_{\text{lookup}} + T_{\text{write-fp16}} + T_{\text{cuBLAS}}
$$

中间 FP16 写回会抵消 3-bit 省下的带宽，Tensor Core 在反量化阶段空闲，CUDA Core 在 GEMM 阶段空闲，这就是“内存省了但吞吐没上去”的根本原因。

**bit shuffling 的关键是让 3-bit 适配 128-bit load/store。** 3-bit 连续打包在数学上紧凑，但对 GPU 不友好：第 10 或第 11 个值附近就会跨 32-bit word，提取一个 index 可能要读两个 word，再做额外 shift/mask。Quantix 的 artifact 将 3-bit 表示拆成 `weight_1bit` 和 `weight_2bit` 两条 segment，代码里 `BitSegments<3>` 同时启用 1-bit 和 2-bit 段；每个 warp 对 4096 个权重元素分别需要 512B 的 1-bit shared memory 和 1024B 的 2-bit shared memory。这样 global memory 侧可以用 `uint4` 进行 128-bit 对齐搬运，shared memory 侧按 lane 读取本线程所需的 packed word。

官方实现中的核心重建逻辑可以概括为：

$$
\text{idx}_{3b} =
\operatorname{combine}\left(\text{segment}_{1b},\text{segment}_{2b}\right)
$$

随后对每个 index 做：

$$
\hat{W}_{m,k}=C_{g(m,k),\text{idx}_{3b}(m,k)}
$$

其中 \(C_g\) 是 group \(g\) 的 8-entry center table。`dequant_parallel_fp3.cuh` 中先通过 mask/shift 把 1-bit 和 2-bit 段组合成 `packed_indices_x8`，再在寄存器里把 8 个 3-bit index 映射到对应 FP16 center。这个设计把不规则查表限制在寄存器和少量 center load 中，不再把完整 FP16 权重矩阵写回 global memory。

**融合反量化和 Tensor Core MMA 后，时间模型从相加变成取最大值。** Quantix 的 3-bit kernel 在一个 block 内处理 \(BLOCK_M\times BLOCK_N\) 输出 tile，沿 K 维按 \(BLOCK_K\) 迭代。`gemm_3bit_reg.cuh` 先把 packed weight segment、activation tile 和 center table 搬到 shared memory/register，然后在主循环中执行 `compute_matrix_slice_3bit`。该函数先用 Tensor Core 对已经准备好的 FP16 fragment 做 `MMA_FP16_M16N8K16`，随后加载下一 slice 的 packed bits、执行 3-bit lookup 并填充下一组 weight registers。理想情况下：

$$
T_{\text{fused}} \approx \max(T_{\text{bit-extract+lookup}},T_{\text{MMA}},T_{\text{memory}})
$$

而不是三者相加。由于 GPU 的 CUDA Core/SIMT 路径适合 shift、mask、lookup，Tensor Core 适合规则 FP16 MMA，二者交错后能提高 SM 内资源利用率。

**为什么 3-bit 需要专门内核，而不是把 4-bit 内核改一改。** 4-bit index 可自然放进 byte 的高/低半字节，8 个 index 正好 32 bits，16 个 index 正好 64 bits；许多 INT4/AWQ/GPTQ kernel 因此可以用相对直接的 nibble unpack。3-bit 的 packed index 没有这种对齐性质，且非均匀量化还需要查 center 表，不只是 `scale * q + zero`。Quantix 的硬件对齐 segment 化布局、center register layout 和 slice-level dequant 都是为 3-bit 非均匀量化定制的，所以它的优化目标不是“低位宽通用”，而是把最难用好硬件的 3-bit 码本量化推到高吞吐。

**与 TensorRT/常见推理引擎的关系。** TensorRT 这类推理系统擅长 graph-level fusion、engine build 和标准低精度路径，但对“非均匀 3-bit + codebook lookup + Tensor Core MMA”的组合通常没有开箱即用的硬件映射。Quantix 更像是可被推理引擎调用的专用 GEMM backend：模型加载阶段把权重转成硬件对齐 packed layout，运行阶段在关键线性层调用 Quantix kernel。它的贡献集中在算子级数据布局和内核流水线，而不是重新设计上层 serving scheduler。

> 💡 关键：Quantix 的加速来自三个因素叠加：3-bit 减少权重带宽，bit shuffling 消除非对齐提取开销，融合流水线避免反量化和矩阵乘串行执行。

#### 🧪 练习题

```yaml
question: "Quantix 为什么不能简单地先把 3-bit 非均匀量化权重完整反量化成 FP16，再调用 cuBLAS？"
options:
  - "因为非均匀量化没有 codebook，无法恢复 FP16 权重"
  - "因为两阶段方案会产生 unpack、lookup 和 FP16 中间写回开销，并让 CUDA Core 与 Tensor Core 分阶段空闲"
  - "因为 Tensor Core 只能处理 3-bit index，不能处理 FP16 fragment"
  - "因为 3-bit 权重的压缩率低于 FP16，没有带宽收益"
answer: 1
explain: "非均匀 3-bit 需要从 packed bits 抽取 index 并查 center 表。若先反量化再 GEMM，中间 FP16 写回和串行阶段会抵消压缩收益；Quantix 通过融合内核和流水线把这些开销隐藏在 MMA 周期内。"
```
