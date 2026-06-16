### Tiramisu — 多面体深度学习编译器

```yaml
id: tiramisu
name: Tiramisu
full_name: 多面体深度学习编译器 (Tiramisu)
year: '2019'
org: MIT
paper_url: https://ieeexplore.ieee.org/abstract/document/8661197/
category: tensor_ir
parent: —
motivation: 四层多面体表示自动推导依赖，数学严谨保证变换正确性
```

#### 📝 一句话总结

Tiramisu 提出一种基于多面体模型的代码优化框架，把算法、执行顺序、数据布局和通信拆成四层 IR，并用调度语言把 tile、parallelize、GPU 映射、buffer placement、send/receive 等优化显式表达出来，从而在 CPU、GPU 和分布式机器上生成可移植高性能代码。

#### 🎯 核心要点

- **四层 IR**：Layer I 表达纯算法，Layer II 表达计算顺序和处理器映射，Layer III 表达数据布局和 buffer 分配，Layer IV 表达通信、同步和内存拷贝
- **多面体表示**：计算域、调度和数据映射都用整数集合与仿射关系表示，可进行精确依赖分析、set emptiness check 和合法变换组合
- **显式调度语言**：支持 `tile`、`parallelize`、`vectorize`、`compute_at`、`store_in`、`cache_shared_at`、`send`、`receive`、`barrier_at` 等命令
- **跨后端目标**：同一算法可经不同 schedule 降到 x86 LLVM IR、CUDA GPU kernel、MPI 分布式代码，并可表达 shared/global/local/constant memory placement
- **比 Halide 更强的表达力**：自然支持非矩形迭代空间、循环偏斜、循环依赖数据流，以及分布式通信调度
- **实验覆盖**：论文评估深度学习、线性代数、图像处理和分布式 benchmark，展示相对 MKL、cuBLAS、Halide、PENCIL 等系统的竞争性能

#### 🔬 深入细节

![Tiramisu 四层 IR 总览](https://ar5iv.labs.arxiv.org/html/1804.10694/assets/x3.png)
*图：Tiramisu overview。算法与 schedule 进入四层 IR，最终经不同 backend 生成 x86、GPU、分布式或 FPGA 方向的代码。*

```cpp
// Tiramisu 风格的 blur 算法与 GPU 调度伪代码
var i("i", 0, N - 2), j("j", 0, M - 2), c("c", 0, 3);

computation bx("bx", {i, j, c},
    (input(i, j, c) + input(i, j + 1, c) + input(i, j + 2, c)) / 3);

computation by("by", {i, j, c},
    (bx(i, j, c) + bx(i + 1, j, c) + bx(i + 2, j, c)) / 3);

// Schedule: tile + GPU block/thread mapping + shared memory + data layout
var i0("i0"), j0("j0"), i1("i1"), j1("j1");
by.tile_gpu(i, j, 32, 32, i0, j0, i1, j1);
bx.compute_at(by, j0);
bx.cache_shared_at(by, j0);
bx.store_in({c, i, j});
by.store_in({c, i, j});

operation cp1 = input.host_to_device();
operation cp2 = by.device_to_host();
cp1.before(bx, root);
cp2.after(by, root);
```

**动机：自动 polyhedral 不够强，手工高性能代码又不可维护。** GEMM、卷积、stencil 和图像处理需要组合 tiling、vectorization、unrolling、array packing、register blocking、prefetch、GPU shared memory、MPI 通信等优化。完全自动的 polyhedral 编译器如 Pluto/Polly 能做部分仿射循环变换，但很难选择最优的数据布局、通信粒度和硬件内存层级映射。Tiramisu 的设计判断是：让用户或上层 DSL 编译器显式给出 schedule，但让底层 IR 用多面体数学保证这些 schedule 的组合、依赖和代码生成是可分析的。

**Layer I 只描述“算什么”，不描述“什么时候算”。** 以 blur 的 `by` 为例，Layer I 可写成一个计算域加表达式：

$$
\{by(i,j,c): 0 \le i < N-2 \land 0 \le j < M-2 \land 0 \le c < 3\}
:\frac{bx(i,j,c)+bx(i+1,j,c)+bx(i+2,j,c)}{3}
$$

这一层的计算之间没有顺序，声明顺序不影响执行顺序。这样做的好处是算法语义干净：依赖来自读写关系和迭代域，而不是来自程序文本顺序。它也让不同后端共享同一个算法定义，避免为了 CPU/GPU/分布式分别改写算法。

**Layer II 把 schedule 变成 time-space 域。** 当用户执行 `tile(i, j, 32, 32, i0, j0, i1, j1)` 时，Tiramisu 生成一个仿射变换：

$$
\{by(i,j,c) \rightarrow by(i_0,j_0,i_1,j_1,c):
i_0=\lfloor i/32 \rfloor \land i_1=i\bmod 32 \land
j_0=\lfloor j/32 \rfloor \land j_1=j\bmod 32\}
$$

在多面体表示中，多个 schedule 命令就是多个 map 的组合；仿射 map 的复合仍是仿射 map，因此编译器可以继续使用整数集合库做依赖和合法性检查。Layer II 还给维度打标签，例如 `gpuB` 表示映射到 GPU block，`gpuT` 表示映射到 GPU thread，`cpu` 表示共享内存 CPU 并行维度，`node` 表示分布式节点维度。时间维度决定执行顺序，空间维度决定在哪类处理器上执行。

**Layer III 专门管理“值放在哪里”。** 传统 schedule 往往把循环变换和数据布局混在一起，导致优化 pass 之间互相牵连。Tiramisu 把数据映射分离出来，用 access relation 描述计算实例到 buffer 元素的映射。例如 `by.store_in({c,i,j})` 产生：

$$
\{by(i_0,j_0,i_1,j_1,c) \rightarrow by[c, 32i_0+i_1, 32j_0+j_1]\}
$$

这使得 AoS / SoA、维度转置、降维、环形 buffer、临时 buffer 分配都可以作为数据层关系表达。对于 GPU，`cache_shared_at` 会在这一层创建适当的 shared memory buffer 与拷贝操作；对于 CPU，可表达 vectorized layout 或 cache-friendly layout。

**Layer IV 处理通信与同步，支撑分布式目标。** Tiramisu 相比 Halide 的一项重要扩展是把 send/receive、barrier、host/device copy 都纳入调度语言。`send({is}, src, size, dst, {ASYNC})` 和 `receive({ir}, dst, size, src, {SYNC}, s)` 在 Layer IV 被翻译成语句，并在代码生成时降为 MPI 或 CUDA 拷贝/同步调用。由于通信也被放入 time-space 域，用户能控制“何时发边界数据、何时等待、哪个分布式维度负责通信”，编译器则负责把这些语义嵌入最终循环 nest。

**代码生成依赖 ISL/Cloog：遍历整数集合一次且只一次。** 从 Layer IV 生成代码，本质上是在满足词典序顺序的前提下，为每个 computation set 生成恰好访问一次每个整数点的循环 nest。Tiramisu 依赖 ISL 中的 Cloog-style code generation 算法先生成 AST，再由 backend 转成 LLVM IR、CUDA 或 MPI 代码。GPU backend 会把 `gpuT/gpuB` 维度翻译为 thread/block id，把 shared/global/constant memory 标签翻译为 CUDA buffer allocation，并把完整 tile 和边界 partial tile 分开，以减少线程分歧。

**与其他编译器的区别。** 与完全自动的 Pluto/Polly 相比，Tiramisu 不把最难的 schedule 选择全部交给启发式模型，而是把优化动作暴露成明确命令；与 Halide 相比，它使用多面体表示而不是区间表示，因此更自然支持非矩形域、任意仿射变换、循环依赖和分布式通信；与 Tensor Comprehensions 相比，Tiramisu 的重点不是仅为深度学习张量表达式做 GPU JIT，而是提供覆盖 CPU、GPU、分布式和 FPGA 的通用多面体调度框架。

#### 🧪 练习题

```yaml
question: "Tiramisu 四层 IR 中，哪一层负责把计算实例映射到具体 buffer 元素并表达数据布局？"
options:
  - "Layer I：Algorithm"
  - "Layer II：Computation Management"
  - "Layer III：Data Management"
  - "Layer IV：Communication Management"
answer: 2
explain: "Layer III 在 Layer II 的执行域基础上加入 access relation、buffer allocation/deallocation 和 store_in/cache 等数据布局信息。"
```
