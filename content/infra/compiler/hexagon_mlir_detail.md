### Hexagon-MLIR：Qualcomm NPU 开源 MLIR 编译栈

```yaml
id: hexagon_mlir
name: Hexagon-MLIR
full_name: Qualcomm NPU开源编译栈 (Hexagon-MLIR)
year: '2026'
org: Qualcomm
paper_url: https://arxiv.org/abs/2602.19762
category: hardware_specific
parent: mlir
motivation: Triton到Hexagon NPU直接编译路径
```

#### 📝 一句话总结

Hexagon-MLIR 提出一个面向 Qualcomm Hexagon NPU 的开源 MLIR 编译栈，把 PyTorch/Triton 程序统一降到 Linalg，再通过 fusion、TCM tiling、HVX 多线程、异步 DMA double buffering 和数学库 lowering 生成 NPU 可执行代码，从而为新 Triton kernel 和 PyTorch 子图提供直接编译路径。

#### 🎯 核心要点

- **统一入口**：PyTorch 模型经 Torch-MLIR 进入 Linalg，Triton kernel 经 triton-to-linalg 进入 Linalg，后续共享同一套 NPU lowering pipeline
- **面向 Hexagon NPU**：优化目标包括 HVX 向量扩展、多硬件线程与多个 HVX context、Tightly Coupled Memory (TCM)、DMA 与高吞吐矩阵乘引擎
- **mega-kernel 生成**：把长算子链作为编译区域做 fusion，减少库调用之间反复回 DDR 的带宽瓶颈
- **Linalg-on-tensors 作为中间层**：用 `linalg.generic` 保留 affine indexing map、parallel/reduction iterator 和 scalar payload region，便于结构化变换
- **TCM tiling**：把大 tensor 切成 tile，插入 memory-space 标注和 copy，使后端能生成 DDR 到 TCM 的 DMA 数据搬运
- **HVX 多线程**：先把 parallel iterator 分配到 `scf.forall` 虚拟线程，再降到 MLIR Async dialect 的 fork-join 结构
- **双缓冲流水化**：用 ping/pong buffer 和 `memref.dma_start`/`memref.dma_wait` 让下一 tile 的 DMA 与当前 tile 的计算重叠
- **方法覆盖面**：论文用 softmax 和 GELU 贯穿说明 Triton-to-Linalg、fusion、tiling、多线程、double buffering、math library 和低层 lowering

#### 🔬 深入细节

![Hexagon-MLIR AI 编译栈总览](https://arxiv.org/html/2602.19762v1/overalldiagram.png)
*图：论文 Figure 1，展示 Hexagon-MLIR 从 PyTorch/Triton 到 MLIR/Linalg，再到 Hexagon NPU 后端的整体编译栈。*

```python
# Hexagon-MLIR pass pipeline 伪代码
def compile_for_hexagon_npu(program, source_kind):
    if source_kind == "pytorch":
        ir = torch_mlir_to_linalg(program)
    elif source_kind == "triton":
        triton_ir = triton_frontend(program)
        ir = triton_to_linalg(triton_ir)

    ir = canonicalize_cse_constant_propagate(ir)
    ir = fuse_linalg_generics(ir)                 # 减少中间 tensor materialization
    ir = tile_to_tcm(ir, tile_sizes, interchange) # DDR -> TCM working set
    ir = bufferize_and_mark_memory_spaces(ir)
    ir = form_virtual_threads(ir)                 # linalg/scf -> scf.forall
    ir = lower_to_async_threads(ir)               # scf.forall -> async.execute
    ir = introduce_ping_pong_buffers(ir)
    ir = rewrite_copies_to_dma_start_wait(ir)
    ir = vectorize_for_hvx(ir)
    ir = lower_math_library_and_runtime_calls(ir)
    return lower_to_llvm_and_hexagon_binary(ir)
```

**动机：库调用无法覆盖快速变化的 Triton/LLM kernel 长尾。** 传统移动 NPU 部署依赖手写 operator library，单个标准算子可做到高性能，但新模型不断产生 fused activation、attention 变体、MoE 子图和 Inductor/Triton 生成的 kernel。若每个 operator 都以库调用为边界，数据会在调用之间回到 DDR，既丢失 fusion 机会，也形成内存带宽瓶颈。Hexagon-MLIR 的思路是把 Triton/PyTorch 子图转成一个可优化区域，生成更大的 specialized mega-kernel，让中间结果尽量停留在 TCM 或寄存器中。

**统一语义：PyTorch 和 Triton 都先投影到 Linalg。** 论文把 PyTorch 模型集合记为 \(M\)，Triton kernel 集合记为 \(K\)，Linalg op 集合记为 \(L\)，前端转换可写成：

$$
f: M \rightarrow L,\qquad g: K \rightarrow L
$$

语义保持目标是：

$$
\llbracket m \rrbracket = \llbracket f(m) \rrbracket,\qquad
\llbracket k \rrbracket = \llbracket g(k) \rrbracket
$$

有了这个公共层，后续 pass 不需要区分输入来自 PyTorch 还是手写 Triton。量化等精度变化可能放松严格等价，但大多数结构化 lowering、fusion、tiling 和并行化仍以保持 denotational semantics 为边界。

**`linalg.generic` 是结构化优化的承载点。** 一个 `linalg.generic` 可以看成由迭代域 \(I \subseteq \mathbb{Z}^d\)、一组 affine indexing map \(\phi_\ell: I \rightarrow \mathbb{Z}^{n_\ell}\)、iterator 类型和 scalar payload region 组成。以 softmax 为例，Triton 中的 `row - tl.max(row)`、`tl.exp`、`tl.sum`、division 先降成多个 `linalg.generic` 或配合控制流的结构化 op。`linalg.generic` 的价值在于把“如何遍历数据”和“每个点上做什么标量计算”分开，使 fusion、tiling、vectorization 都能基于 iteration geometry 做合法变换。

**Fusion 消除中间 materialization。** 若 producer \(P\) 产生中间 tensor \(Y\)，consumer \(Q\) 读取 \(Y\)，可以抽象为：

$$
X \xrightarrow{P} Y \xrightarrow{Q} Z
$$

若 \(P\) 的 payload 是 \(y=f(x)\)，\(Q\) 的 payload 是 \(z=g(y)\)，融合后变成：

$$
z = g(f(x))
$$

对于论文中的 softmax 片段，`subf` 和 `exp` 可融合到同一个 `linalg.generic` body 中，避免把 \(Y\) 写回再读出。对 NPU 来说，这不仅减少 DRAM/TCM 流量，也为后续 HVX 向量化和 tile 内复用创造更大连续区域。

**TCM tiling 把 structured tensor 计算变成显式局部工作集。** Hexagon NPU 的 TCM 小而快，DDR 大而慢。给定迭代域 \(I\) 和 tiling vector \(t=(t_1,\dots,t_d)\)，tiling 引入外层 `scf.for`/`scf.forall`，内层仍保留 `linalg.generic`，但它的输入输出变成当前 tile。实现上 pass 会插入 `tensor.extract_slice` 和带 memory-space attribute 的 `bufferization.alloc_tensor`/copy，后续 bufferization 和 lowering 再把这些 copy 映射为 DDR/TCM 之间的 DMA。直觉公式是：

$$
I = \bigcup_b I_b,\qquad I_b = \{ i \in I \mid b_j t_j \le i_j < (b_j+1)t_j \}
$$

每个 \(I_b\) 对应一个 TCM-resident tile，计算完成后再 `tensor.insert_slice` 回全局结果。

**HVX 多线程用 Async dialect 保留并行语义。** 论文把多线程 lowering 分成两阶段：先分析 `linalg.generic` 的 parallel iterator 和 polytope size，决定是否值得并行化，并生成 `scf.forall` 虚拟线程；再把每个 forall tile 改写成 `async.execute`，用 `async.create_group`、`async.add_to_group` 和 `async.await_all` 表示 fork-join barrier。这样做的好处是中间 IR 仍是结构化、可分析的，而不是过早落到难以优化的低层线程 runtime 调用。

**Double buffering 把内存传输和计算重叠。** 单缓冲 tile 流程通常是 copy tile 到 TCM、计算、copy 回去、再处理下一 tile。Hexagon-MLIR 的 double buffering 先做结构化变换，生成 guarded prologue、ping/pong 两套 buffer 和交替执行的 sub-kernel；再把 `memref.copy` 改写为 `memref.dma_start`/`memref.dma_wait`。简化状态机如下：

```python
prefetch(tile=0, buffer=ping)
for b in range(num_tiles):
    wait_until_ready(buffer=current)
    if b + 1 < num_tiles:
        prefetch(tile=b + 1, buffer=other)
    compute_hvx(buffer=current)
    store_back(buffer=current)
    current, other = other, current
```

该设计把 legality/scheduling 和 transport semantics 分开：第一阶段保证 ping/pong IR 结构和 hazard-free clone，第二阶段才绑定到 DMA tag 和 wait 点。最终 pipeline 可概括为 \(F \rightarrow T \rightarrow M \rightarrow DB \rightarrow V\)：fusion 提升局部性，tiling 进入 TCM，多线程分配 HVX context，double buffering 隐藏 DMA 延迟，vectorization 映射到 HVX。

> 💡 关键：Hexagon-MLIR 的价值在于把 Triton/PyTorch 生态接到 Qualcomm NPU 的硬件特性上，不是只做一个 Triton parser，而是把 TCM、HVX、DMA 和 fusion 都提升为 MLIR pass pipeline 中可组合的优化动作。

#### 🧪 练习题

```yaml
question: "Hexagon-MLIR 为什么先把 PyTorch 和 Triton 都降到 Linalg？"
options:
  - "为了绕过所有 MLIR pass，直接调用 Qualcomm 手写库"
  - "为了让不同前端共享同一套结构化 fusion、tiling、multi-threading 和 lowering pipeline"
  - "为了只支持 softmax，避免处理 GELU 和其他算子"
  - "为了把所有 tensor 立即展平成 LLVM pointer arithmetic"
answer: 1
explain: "Linalg 保留 iteration domain、indexing map 和 payload region，既统一 PyTorch/Triton 来源，又为后续面向 TCM/HVX/DMA 的结构化优化提供合法变换基础。"
```
