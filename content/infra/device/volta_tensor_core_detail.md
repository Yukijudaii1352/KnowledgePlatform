### Volta Tensor Core

```yaml
id: volta_tensor_core
name: Volta Tensor Core
full_name: Volta张量核心架构 (Volta Tensor Core Architecture)
year: '2017'
org: NVIDIA
paper_url: https://arxiv.org/abs/1803.04432
category: gpu_architecture
parent: cuda
motivation: 引入Tensor Core实现硬件级矩阵运算
```

#### 📝 一句话总结

Volta Tensor Core 把深度学习中的小块矩阵乘加提升为 GPU SM 内的专用硬件原语，用 FP16 乘法、FP32/FP16 累加的 MMA 数据通路解决传统 CUDA core 执行 GEMM/卷积时吞吐和能效不足的问题。它是 NVIDIA 后续 TF32、BF16、FP8 等低精度 AI 计算路线的起点。

#### 🎯 核心要点

- 每个 Volta SM 集成 8 个 Tensor Core；Tesla V100 全芯片 640 个 Tensor Core，面向矩阵乘加而非标量 FMA 优化
- 硬件执行 \(D=A\times B+C\) 的小矩阵 MMA 操作，典型输入为 FP16，乘积累加可进入 FP32 累加器
- CUDA 暴露 WMMA API 和 `mma` 指令族，开发者以 warp 级 matrix fragment 组织 `load_matrix_sync`、`mma_sync`、`store_matrix_sync`
- 混合精度训练保留 FP32 master weights，使用 loss scaling 缓解 FP16 梯度下溢，同时把 GEMM/Conv 主算子交给 Tensor Core
- cuBLAS/cuDNN 把卷积和矩阵乘自动映射为 Tensor Core tile，但需要满足尺寸、对齐、数据布局和数学模式约束
- 与 Pascal/传统 CUDA core 相比，Volta 的创新是把 AI 主算子做成专用矩阵 datapath，而不是单纯堆叠更多通用浮点单元

#### 🔬 深入细节

##### 核心示意图

![Volta 混合精度训练中的 FP16 梯度范围](https://developer-blogs.nvidia.com/wp-content/uploads/2017/10/ssd_ag_log_histo_coarse.png)
*图：NVIDIA Mixed Precision Training Guide 中的梯度分布示意，展示部分 FP32 梯度直接转 FP16 会落到可表示范围之外，因此需要 loss scaling 与 FP32 master weights 配合 Tensor Core 使用。*

Volta 之前的 GPU 虽然已经能高效执行 FP32/FP64 标量或向量 FMA，但深度学习训练中的热点并不是孤立的标量运算，而是 GEMM、卷积和后来的 attention 投影矩阵。若仍把这些算子拆成大量独立 CUDA core FMA，硬件需要在寄存器、调度器和指令发射上重复付出开销。Tensor Core 的设计把一个矩阵 tile 作为单条硬件级操作，让乘法阵列和加法树在 Tensor Core 内部完成，从而提高单位面积和单位功耗的有效矩阵吞吐。

Volta Tensor Core 的基本语义可以写成：

$$
D_{m,n}=C_{m,n}+\sum_{k=0}^{K-1}A_{m,k}B_{k,n}
$$

在 Volta 的典型深度学习路径中，\(A\) 与 \(B\) 以 FP16 输入进入 Tensor Core，乘法结果以更高精度累加，最后写回 FP16 或 FP32。直觉上，FP16 负责降低读写带宽和提高乘法密度，FP32 累加负责保护长点积中的有效位；如果把整个训练过程都压成 FP16，梯度下溢和权重更新舍入会迅速破坏收敛。

##### 算法伪代码

```python
# Volta Tensor Core / WMMA 风格 GEMM tile 伪代码
# C[M, N] += A[M, K] @ B[K, N]
for block_m, block_n in cta_tiles(M, N):
    acc = zeros(fragment_shape=(16, 16), dtype=fp32)

    for block_k in range(0, K, 16):
        a_frag = wmma_load_matrix_sync(
            A[block_m:block_m+16, block_k:block_k+16],
            dtype=fp16,
            layout="row_major",
        )
        b_frag = wmma_load_matrix_sync(
            B[block_k:block_k+16, block_n:block_n+16],
            dtype=fp16,
            layout="col_major",
        )
        acc = wmma_mma_sync(a_frag, b_frag, acc)  # Tensor Core MMA

    wmma_store_matrix_sync(C[block_m:block_m+16, block_n:block_n+16], acc)
```

真正的性能来自分层 tiling，而不是仅把数据类型改成 FP16。CTA 先把全局内存中的矩阵块搬到 shared memory，再由每个 warp 把 tile 载入寄存器 fragment，最后发射 `mma_sync` 到 Tensor Core。这个流程要求矩阵维度、leading dimension、内存对齐和 layout 能匹配库或 kernel 的 tile 形状；若矩阵太小、维度不对齐、访存无法 coalesce，Tensor Core 的峰值吞吐会被访存和调度开销吞掉。

混合精度训练还需要一套数值保护机制。NVIDIA 的典型 recipe 是：前向和反向中的 GEMM/Conv 使用 FP16 Tensor Core，权重主副本保留 FP32，梯度在反向传播前乘以 loss scale，优化器更新前再反缩放。其核心过程可表示为：

$$
\tilde{L}=S\cdot L,\quad
\tilde{g}=\frac{\partial \tilde{L}}{\partial w}=S\cdot g,\quad
g=\tilde{g}/S
$$

这里 \(S\) 是 loss scale。它不改变数学上的梯度方向，只是把小梯度移入 FP16 可表示范围，避免反向传播早期被 flush-to-zero。若检测到溢出，动态 loss scaling 会降低 \(S\)；若连续若干 step 稳定，则逐步增大 \(S\)，在吞吐和稳定性之间找平衡。

与传统 CUDA core 的差异可以概括为 ISA 抽象层级的变化。CUDA core 暴露的是标量/向量 FMA，编译器和库要在软件层重构矩阵乘；Tensor Core 暴露的是矩阵块 FMA，硬件天然知道一次操作内部的 \(m\times n\times k\) 结构。后续 Ampere 的 TF32/BF16/稀疏 Tensor Core、Hopper 的 FP8 Transformer Engine 都是在这个“矩阵块作为硬件原语”的基础上继续扩展输入格式、压缩方式和自动精度控制。

> 💡 关键：Volta Tensor Core 的价值不是“FP16 更快”这么简单，而是把低精度乘法、高精度累加、warp 级 tile 编程和库级 kernel 调度结合成一条完整 AI 数据路径。

#### 🧪 练习题

```yaml
question: "Volta Tensor Core 混合精度训练为什么通常保留 FP32 master weights？"
options:
  - "因为 Tensor Core 只能读取 FP32 权重"
  - "因为优化器长期累积的小更新对舍入误差敏感，FP32 主权重能保持训练稳定"
  - "因为 FP16 只能用于推理，不能用于训练前向传播"
  - "因为 loss scaling 会把所有梯度永久变成整数"
answer: 1
explain: "Tensor Core 可用 FP16 提高 GEMM/Conv 吞吐，但权重更新和优化器状态需要更高精度来避免小更新被舍入吞掉。"
```
