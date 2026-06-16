### Triton — 分块神经网络计算中间语言与编译器

```yaml
id: triton
name: Triton
full_name: 分块神经网络计算中间语言与编译器 (Triton)
year: '2019'
org: OpenAI
paper_url: https://dl.acm.org/doi/abs/10.1145/3315508.3329973
category: tensor_ir
parent: —
motivation: Tile抽象屏蔽GPU细节，非专家也能写出高性能内核
```

#### 📝 一句话总结

Triton 提出以静态形状 tile 为一等对象的 GPU 编程语言与 LLVM 风格中间表示，让开发者在块级张量上表达矩阵乘、卷积和融合算子，并由编译器自动完成层级 tiling、内存合并、共享内存分配和同步插入，从而用接近 Python/C 的代码达到接近 cuBLAS/cuDNN 的性能。

#### 🎯 核心要点

- **Tile-first 抽象**：程序员操作的是 \(M \times N\) 的块级张量，而不是 CUDA 线程和 warp；块级算子如 `dot`、`load`、`store` 成为 IR 的核心对象
- **两层语言设计**：Triton-C 用类 C 语法表达参数化 tile 程序，Triton-IR 用 SSA 与块级类型承载后续优化
- **JIT 编译管线**：Triton-C / Python AST 生成 Triton-IR，经过机器无关优化和机器相关优化后降到 LLVM-IR / PTX
- **机器相关优化**：自动执行层级 tiling、DRAM 访问 coalescing、共享内存 allocation、共享内存 barrier insertion
- **自动调参**：Triton-JIT 可从 IR 优化 pass 中直接抽取 tile、micro-tile、nano-tile 等元参数，不依赖手写模板空间
- **应用覆盖**：论文展示矩阵乘、dense convolution、shift convolution 等工作负载，矩阵乘性能通常与 cuBLAS 接近，并明显优于当时多个 DSL 方案

#### 🔬 深入细节

![Triton 面向的 GPU 存储与计算结构](https://images.ctfassets.net/kftzwdyauwt9/778bccdf-6cb5-4d9f-3a247ae7f2e3/9e6d1bb6bc09e1f7b3a9adc50fc776b3/gpu-architecture.svg?q=90&w=3840)
*图：OpenAI Triton 官方资料中的 GPU 架构示意。论文 Figure 2 的 Triton 管线可概括为 Triton-C → Triton-IR → Triton-JIT / Auto-Tuner → machine-independent passes → machine-dependent passes → machine-code。*

```python
# Triton 风格的块级矩阵乘伪代码
@triton_jit
def matmul_kernel(A, B, C, M, N, K, stride_am, stride_ak, stride_bk, stride_bn,
                  BLOCK_M, BLOCK_N, BLOCK_K, GROUP_M):
    pid_m, pid_n = remap_program_id_for_l2_reuse(program_id())

    rm = pid_m * BLOCK_M + arange(0, BLOCK_M)
    rn = pid_n * BLOCK_N + arange(0, BLOCK_N)
    rk = arange(0, BLOCK_K)

    a_ptrs = A + rm[:, None] * stride_am + rk[None, :] * stride_ak
    b_ptrs = B + rk[:, None] * stride_bk + rn[None, :] * stride_bn
    acc = zeros((BLOCK_M, BLOCK_N), dtype=float32)

    for k0 in range(0, K, BLOCK_K):
        a_tile = load(a_ptrs, mask=(rm[:, None] < M) & (k0 + rk[None, :] < K))
        b_tile = load(b_ptrs, mask=(k0 + rk[:, None] < K) & (rn[None, :] < N))
        acc += dot(a_tile, b_tile)
        a_ptrs += BLOCK_K * stride_ak
        b_ptrs += BLOCK_K * stride_bk

    store(C + rm[:, None] * stride_cm + rn[None, :] * stride_cn,
          acc,
          mask=(rm[:, None] < M) & (rn[None, :] < N))
```

**动机：填补“库函数太固定、CUDA 太底层”的中间层。** 深度学习研究经常需要 fused softmax、变体卷积、块稀疏访问、特殊激活融合等非标准 kernel。只用 PyTorch/TensorFlow 原子算子会产生临时张量和多次 kernel launch；直接写 CUDA 又要求开发者手动管理 DRAM 合并访问、shared memory、warp 同步、tensor core 指令排布。Triton 的切入点是把程序员暴露在“块级数据并行”层：跨 SM 的 work partition 仍由程序员用 `program_id` 和 tile shape 控制，但 SM 内部的线程级并行、内存合并和同步尽量交给编译器。

**核心表示：tile 是类型系统和优化 pass 的共同语言。** 在 Triton-IR 中，一个值可以是形如 `tensor<16x32xf32>` 的 tile，而不是标量寄存器或一维向量。矩阵乘的数学目标仍是：

$$
C_{m,n} = \sum_{k=0}^{K-1} A_{m,k} B_{k,n}
$$

Triton 把它重写为块级累加：

$$
C_{M_t,N_t} \leftarrow C_{M_t,N_t} + A_{M_t,K_t} \cdot B_{K_t,N_t}
$$

其中 \(M_t,N_t,K_t\) 是 tile 维度。这个表示让 `tl.dot(a_tile, b_tile)` 在 IR 层保留为高层块级乘加，编译器可以在看到 `dot` 后再决定是否把输入搬到 shared memory、如何分配微块到 SIMD lane、如何在寄存器中保存 accumulator，而不是过早把程序展平成线程代码。

**机器无关优化先处理“块代数”，机器相关优化再贴近 GPU。** 论文把优化分成两类。机器无关 pass 包括循环不变量外提、自动 prefetch、tile-level peephole 等，例如连续转置可以按 \(X=(X^T)^T\) 消去。机器相关 pass 则面向 GPU 存储层级：层级 tiling 把 tile 继续切成 micro-tile / nano-tile，匹配 core、SIMD 单元和寄存器文件；memory coalescing 通过调整微块内部线程到数据元素的映射，减少访问一列 tile 时的 DRAM transaction；shared-memory allocation 根据变量活跃区间把高复用 tile 暂存到 shared memory；synchronization pass 根据数据流危险自动插入 barrier。

**同步插入可以理解为对 shared memory 读写集合做数据流分析。** 论文中的 RAW / WAR hazard 分析可简化表示为：

$$
in_s^{RAW} = \bigcup_{p \in pred(s)} out_p^{RAW}, \qquad
out_s^{RAW} =
\begin{cases}
\emptyset, & in_s^{RAW} \cap read(s) \ne \emptyset \quad \text{insert barrier} \\
in_s^{RAW} \cup write(s), & \text{otherwise}
\end{cases}
$$

类似地，WAR 分析用 \(read(s)\) 累积潜在冲突并在后续写入前清空。直觉是：当某个语句要读到前序语句写入 shared memory 的区域，而这些操作在 GPU 机器模型中可能异步重排时，编译器必须在中间插入同步屏障。Triton 的优势在于 tile-level IR 保留了足够的读写集合信息，因此 barrier 不是程序员手写的，而是从 IR 分析中推导出来。

**自动调参不是 AutoTVM 式手写模板，而是 pass 参数空间。** 传统 autotuner 往往需要专家写“这个 conv2d 可以怎么 tile、哪个轴可以 unroll”的模板。Triton-JIT 则从 IR 和优化 pass 自身抽取 meta-parameter，例如每个 tile 维度的 tile size、micro-tile size、nano-tile size。论文实验中主要调层级 tiling，并在 powers of two 上穷举。这样的空间不一定比后来的学习型搜索更强，但它展示了一个关键方向：如果 IR 抽象足够贴近硬件优化动作，调参空间可以由编译器自动暴露，而不是由专家为每个算子重新编码。

**与 TVM / Tensor Comprehensions / Halide 的区别。** TVM 和 Halide 的强项是“算法描述 + schedule”，但 2019 年的 GPU 高性能 kernel 往往仍依赖专家模板和外部库。Tensor Comprehensions 通过 polyhedral 表示自动生成代码，但对非仿射访问、低层内存层级和 tensor core 友好代码并不总是自然。Triton 牺牲了一部分完全自动调度的目标，要求开发者显式选择 tile 级 work decomposition，却把 CUDA 中最易出错的线程级并发细节封装在编译器 pass 中，因此更适合深度学习研究者快速写高性能特化 kernel。

#### 🧪 练习题

```yaml
question: "Triton 相比手写 CUDA 最核心的抽象提升是什么？"
options:
  - "完全隐藏跨 SM 的任务划分，自动决定所有 tile 的位置"
  - "把 tile / block 级张量作为一等对象，让编译器处理线程级并行、内存合并和同步"
  - "只调用 cuBLAS/cuDNN，因此不需要生成 GPU 代码"
  - "用多面体模型自动搜索所有合法仿射变换"
answer: 1
explain: "Triton 仍要求开发者表达块级任务划分，但不再要求手动管理 CUDA 线程、shared memory barrier 和 coalescing 等细节；这些由 tile-level IR 和编译器 pass 推导。"
```
