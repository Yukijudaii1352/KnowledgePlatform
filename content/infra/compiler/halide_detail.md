### Halide：计算调度分离图像编译语言

```yaml
id: halide
name: Halide
full_name: 计算调度分离图像编译语言 (Halide)
year: '2013'
org: MIT/Google
paper_url: https://dl.acm.org/doi/abs/10.1145/2499370.2462176
category: tensor_ir
parent: —
motivation: 首创计算与调度分离范式，解决并行性与局部性权衡
```

#### 📝 一句话总结

Halide 提出将“计算什么”的算法定义与“如何计算/存储/并行化”的调度定义彻底分离，用一个面向图像与数组流水线的 DSL 解决手写高性能 stencil pipeline 难以兼顾可读性、可移植性和性能的问题。

#### 🎯 核心要点

- **计算与调度分离**：算法只描述纯函数式数据流，调度单独指定 tiling、fusion、compute_at、store_at、vectorize、parallel 等执行策略
- **函数式图像模型**：图像和中间结果被建模为从整数坐标到标量值的函数，天然表达 stencil、pointwise、reduction、data-dependent gather 等阶段
- **调度空间建模**：每条 producer-consumer 边都可独立选择内联、缓存、重计算或分块存储，显式覆盖局部性、并行性和冗余计算之间的权衡
- **自动 lowering 编译器**：根据 schedule 递归注入中间阶段的计算和存储，再通过区间推断、滑动窗口、storage folding、flattening、vectorization 生成低层代码
- **跨平台代码生成**：同一算法可通过不同 schedule 生成 x86/ARM SIMD、多核 CPU、CUDA GPU 等目标代码，后端依赖 LLVM 和 GPU 代码生成
- **随机搜索 autotuning**：论文将 schedule 参数空间交给随机搜索，在复杂图像 pipeline 上自动找到接近或超过专家手写实现的高性能调度

#### 🔬 深入细节

![Halide 应用与调度效果示意](https://people.csail.mit.edu/jrk/halide12/teaser.png)
*图：Halide 用短算法代码和独立 schedule 覆盖 Camera Raw、Local Laplacian、Bilateral Grid、Segmentation 等真实图像流水线，并通过换 schedule 移植到不同硬件。来源：Halide 作者项目页*

```cpp
// Halide 3x3 box filter：算法和调度分离
Func blur_3x3(Func input) {
  Func blur_x, blur_y;
  Var x, y, xi, yi;

  // Algorithm: 只定义像素值依赖，不指定循环、缓存、并行方式
  blur_x(x, y) = (input(x - 1, y) + input(x, y) + input(x + 1, y)) / 3;
  blur_y(x, y) = (blur_x(x, y - 1) + blur_x(x, y) + blur_x(x, y + 1)) / 3;

  // Schedule: 定义执行组织和存储位置
  blur_y.tile(x, y, xi, yi, 256, 32)
        .vectorize(xi, 8)
        .parallel(y);
  blur_x.compute_at(blur_y, x)
        .vectorize(x, 8);
  return blur_y;
}
```

```python
# Halide lowering 伪代码
def lower_halide(algorithm, schedule, target):
    loop_nest = build_loop_nest_for_output(algorithm.final_stage, schedule)

    for stage in reverse_topological_order(algorithm.stages):
        compute_level = schedule[stage].compute_at
        store_level = schedule[stage].store_at
        inject_allocation(loop_nest, stage, at=store_level)
        inject_producer_code(loop_nest, stage, at=compute_level)

    regions = infer_bounds_with_interval_arithmetic(loop_nest)
    loop_nest = add_region_preambles(loop_nest, regions)
    loop_nest = sliding_window_and_storage_folding(loop_nest)
    loop_nest = flatten_multidim_buffers(loop_nest)
    loop_nest = apply_vectorize_unroll_parallel(loop_nest, schedule)
    return llvm_or_gpu_codegen(loop_nest, target)
```

**动机与背景：图像流水线的瓶颈不是单个算子，而是全局组织方式**

图像处理 pipeline 同时有 stencil 计算和 stream 程序的特征：每个阶段单看都很简单，算术强度低，但阶段数量多、依赖图深、局部邻域重叠严重。若把每个阶段都物化成完整中间图像，会产生大量内存流量；若把所有阶段强行融合，又可能破坏并行性并引入过多冗余计算。传统循环优化器通常只能识别固定 stencil 或简单 loop fusion，难以对一个包含数十上百阶段的异构 pipeline 做全局调度。Halide 的核心洞察是：算法定义不应该夹杂缓存、循环顺序和线程划分；这些选择应该成为可搜索、可替换、可组合的 schedule。

**算法表示：把图像看成无限整数域上的纯函数**

Halide 中的 `Func f(x, y)` 表示坐标到值的映射，算法部分通常写成方程。例如一个可分离模糊可以写成：

$$
\text{blur}_x(x,y)=I(x-1,y)+I(x,y)+I(x+1,y)
$$

$$
\text{out}(x,y)=\text{blur}_x(x,y-1)+\text{blur}_x(x,y)+\text{blur}_x(x,y+1)
$$

这些方程只表达依赖，不表达“先算哪一行”“中间结果是否落内存”“是否向量化”。边界处理也可通过外部 wrapper 或函数定义表达，而不是散落在每层循环里。Reduction 则通过 `RDom` 显式给出归约域，把 histogram、scan、convolution 等非纯 stencil 操作纳入同一图模型。

**调度机制：在局部性、并行性、重计算之间选点**

Schedule 的语义可以理解为为每个 producer \(f\) 指定两个位置：`store_at` 决定分配/缓存的生命周期，`compute_at` 决定实际计算嵌入到哪个 consumer loop 层级。若 \(f\) 在外层计算并完整存储，冗余计算少但内存流量大；若 \(f\) 在内层 tile 内按需计算，局部性好但会重复算 halo；若 \(f\) inline 到 consumer，存储成本最低但可能指数式放大计算。对 consumer 需要区域 \(R_g\)，producer 的需求区域可抽象为反向传播：

$$
R_f = \bigcup_{g \in \text{consumers}(f)} \text{preimage}_{g \rightarrow f}(R_g)
$$

Halide 编译器用区间算术近似这些区域，在每个循环层前插入计算 bounds 的 preamble，保证只分配和计算后续阶段真正会消费的那一块。

**编译流程：从函数图到命令式循环**

Lowering 先为最终输出建立循环嵌套，然后按 schedule 把中间阶段的 allocation 和 computation 递归注入到指定循环层。此时每个 buffer 的范围还是符号表达式，随后 bounds inference 决定每个 tile、scanline 或 vector lane 需要的最小区域。接着，sliding window optimization 会复用相邻扫描线之间重叠的 producer 值；storage folding 会把只需保留少量行的中间 buffer 折叠成环形存储；flattening 将多维坐标转换为一维地址；vectorize/unroll/parallel 再把常量宽度循环改写为 SIMD 或多线程代码。最终后端通过 LLVM 或 GPU 代码生成落到真实硬件。

**与传统方法的区别**

和手写 C/CUDA 相比，Halide 保留了短小、可组合的算法代码，调度可以随硬件重写而不触碰算法正确性。和 polyhedral 编译器相比，Halide 放弃了完全自动从任意循环里恢复依赖的目标，转而让程序员显式给出 pipeline 的纯函数数据流和 schedule primitives，因此分析更简单、覆盖的图像 pipeline 模式更广。和固定库函数相比，Halide 能跨阶段融合和重排，不被库边界阻断局部性优化。

> 💡 **关键**：Halide 的“算法/调度分离”后来成为张量编译器的核心范式。TVM、Triton、XLA/MLIR 生态里的 schedule、tile、fusion、layout、autotune 思路，都能看到 Halide 对计算定义和执行组织拆分的影响。

#### 🧪 练习题

```yaml
question: "Halide 中 compute_at 的核心作用是什么？"
options:
  - "改变算法方程本身，使输出像素值发生变化"
  - "指定某个 producer 阶段嵌入到 consumer 的哪个循环层级计算"
  - "固定所有中间结果都必须完整写入全局内存"
  - "只用于选择 CPU 或 GPU 后端，与循环结构无关"
answer: 1
explain: "compute_at 控制 producer 计算发生的位置，直接影响融合粒度、缓存局部性、并行性和冗余计算，是 Halide schedule 的核心旋钮之一。"
```
