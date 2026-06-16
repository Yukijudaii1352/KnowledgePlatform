### Glow：图下降神经网络编译器

```yaml
id: glow
name: Glow
full_name: "图下降神经网络编译器 (Graph Lowering Compiler)"
year: "2018"
org: Meta
paper_url: https://arxiv.org/abs/1805.00907
category: graph_compilers
parent: "—"
motivation: "两级IR渐进下降结合静态内存规划，提升推理内存效率"
```

#### 📝 一句话总结

Glow 提出面向神经网络的 graph lowering 编译器，把前端计算图逐步下降为强类型高层 IR 和地址式低层指令 IR，通过算子规范化、目标无关优化、静态内存规划和后端代码生成，让新硬件只需支持少量低层线性代数原语即可高效执行推理图。

#### 🎯 核心要点

- **Graph Lowering 思想**：将复杂高层算子拆成更少、更基础的线性代数节点，减少后端必须实现的 op 种类
- **两级强类型 IR**：高层 IR 是带 tensor shape/type 的数据流图，适合常量传播、节点替换、量化、批归一化折叠等图优化；低层 IR 是地址式指令流，适合内存生命周期、拷贝消除、in-place 和指令调度
- **强类型张量系统**：每个节点/指令输入输出都有明确元素类型、shape 和量化参数，编译期验证类型一致性
- **Node Lowering 时机**：先自动微分/图优化，再将 FullyConnected、SGD、Regression 等高层节点降成 MatMul、Add、Sub、Mul、Save 等低层节点
- **静态内存规划**：低层 IR 中 `alloc/dealloc` 描述 activation 生命周期，最终分配器把所有临时 buffer 合并到单个可复用内存区域
- **Profile-Guided Quantization**：先插入 profiling node 估计激活范围，再重新编译为 int8 图，并优化 rescale/convert 节点
- **CPU 后端优化**：通过卷积权重布局变换、operator stacking、LLVM JIT/AOT 生成直接卷积和融合逐元素代码
- **Runtime 分区执行**：Partitioner/Provisioner/DeviceManager/Executor 将图切成子图，分配到多个加速器并异步执行推理请求

#### 🔬 深入细节

![Glow 高层 IR 降低后的计算图](https://ar5iv.labs.arxiv.org/html/1805.00907/assets/x1.png)
*图：Glow 论文 Figure 2。自动微分后的回归/SGD 相关高层节点被降低为 Sub、Mul、Add、Save 等基础节点，后端无需直接实现 DivGrad 或 SGD 这类复杂 op。*

```python
# Glow graph lowering + 静态内存规划伪代码
def glow_compile(frontend_graph, backend):
    module = load_as_high_level_ir(frontend_graph)       # ONNX / Caffe2 / PyTorch exporter ...
    verify_strong_tensor_types(module)

    if module.requires_training_graph:
        module = differentiate(module)

    module = optimize_high_level_graph(module, passes=[
        "constant_propagation",
        "dead_node_elimination",
        "batchnorm_fold_into_conv",
        "transpose_elimination",
        "profile_guided_quantization_optional",
    ])

    lowered = node_lowering(module, backend.capabilities)
    lowered = backend.target_specific_graph_opt(lowered)
    schedule = schedule_nodes(lowered, objective="minimize_activation_memory")

    ir = irgen(schedule)                                # high-level nodes -> low-level instructions
    ir = optimize_low_level_ir(ir, passes=[
        "copy_elimination",
        "inplace_buffer_reuse",
        "lifetime_shrinking",
    ])

    memory_plan = static_allocate(ir.alloc_dealloc_lifetimes())
    return backend.codegen(ir, memory_plan)


def static_allocate(lifetimes):
    # lifetimes: [(name, start, end, bytes)]
    blocks = []
    for name, start, end, size in sorted(lifetimes, key=lambda x: x[1]):
        block = first_fit(
            blocks,
            predicate=lambda b: b.size >= size and not overlaps(b.live_range, (start, end)),
        )
        if block is None:
            block = new_block(size)
            blocks.append(block)
        block.assign(name, start, end)
    return coalesce_to_single_activation_arena(blocks)
```

##### 1. 动机：为什么不能直接把每个框架 op 翻译成 C++ 循环

Glow 论文从一个很小的例子说明普通低层编译器的局限：两个循环依次写同一个数组，最后只读第二次写入的值，人类很容易看出第一个循环冗余，但 C++ 编译器要证明指针别名、整数溢出、循环边界和语言语义，往往无法删除。神经网络图中这个问题更严重：如果把卷积、BatchNorm、ReLU、SGD 直接展开成低层循环，后端编译器很难再反推出“这是一个卷积后接逐元素激活”。因此 Glow 保留高层 IR，让编译器先在 tensor/op 语义上做优化，再逐步下降到指令和地址。

##### 2. 高层 IR：强类型数据流图负责语义级优化

Glow 的高层 IR 类似 Caffe 风格的数据流图，但每个节点都有强类型 tensor 输入输出：shape、element type、量化参数都在编译期可见。`Constant` 表示编译期已知权重，优化器可以转置、量化、删除或折叠；`Placeholder` 表示运行时绑定输入/输出或可训练权重，优化器不能假设其具体值。这个区分让推理图的权重成为可优化对象，例如把 BatchNorm 参数折叠到卷积权重：

$$
y=\gamma\frac{x-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta
$$

对于卷积输出 \(x=W*a+b\)，可以预先改写为：

$$
W'=\frac{\gamma}{\sqrt{\sigma^2+\epsilon}}W,\quad
b'=\frac{\gamma}{\sqrt{\sigma^2+\epsilon}}(b-\mu)+\beta
$$

这样运行时不再需要单独 BatchNorm 节点，既减少计算，也缩短 activation 生命周期。

##### 3. Node Lowering：用少量基础 op 覆盖大量前端 op

传统框架如果有 \(N\) 个高层 op 和 \(M\) 个硬件后端，最坏需要维护 \(N\times M\) 份实现。Glow 的 node lowering 把这个矩阵压缩：高层 `FullyConnected` 降为 `MatMul + BroadcastAdd`，训练相关 `SGD` 可降为 `Sub/Mul/Add/Save`，`Regression` 在不同场景下降为 no-op 或 element-wise subtract。后端只需实现更小的基础算子集合。这个过程必须发生在高层 IR 中，而不是低层 IR 中，因为降低后的图还能继续触发图优化、影响调度和目标相关重写。其本质是把后端接口从“完整神经网络 op 集”收敛为“线性代数核心 op 集”：

$$
\mathcal{O}_{\text{frontend}} \xrightarrow{\text{lowering}} \mathcal{O}_{\text{primitive}},\quad |\mathcal{O}_{\text{primitive}}|\ll|\mathcal{O}_{\text{frontend}}|
$$

##### 4. 低层 IR：地址式指令让内存优化变得显式

当图优化和 node lowering 完成后，IRGen 将高层节点转为低层指令。低层 IR 不再是“张量节点图”，而是带 `declare` 和 `program` 的指令列表；指令操作的是内存区域，operand 标注 `@in`、`@out`、`@inout`。这让编译器可以明确判断某个 buffer 是否只读、只写或原地更新，从而做 copy elimination 和 in-place reuse。论文强调 `alloc` 指令不是真正运行时 malloc，而是声明 activation 生命周期；真正分配发生在低层内存规划阶段。

低层 IR 的峰值 activation 内存同样可以用生命周期公式描述：

$$
M=\max_t \sum_{a\in A}\text{size}(a)\cdot \mathbf{1}[\text{alloc}(a)\le t<\text{dealloc}(a)]
$$

调度器和 allocator 的目标是通过节点顺序、生命周期缩短和 buffer 复用降低 \(M\)。相比 eager 框架逐 op 分配释放，Glow 在编译期知道整张推理图，因此可以把多个互不重叠 activation 映射到同一 arena offset。这个机制直接对应用户给出的动机：两级 IR 渐进下降结合静态内存规划，提升推理内存效率。

##### 5. 量化：profile 决定 scale/offset，编译优化消除转换

Glow 支持 profile-guided int8 quantization。第一阶段，编译器在浮点图中插入 profiling 节点，运行代表性输入，记录每条边的数值范围；第二阶段，使用这些 range 重新编译图，把浮点 tensor 转为带 scale 和 offset 的 int8 tensor。Glow 使用的反量化关系是：

$$
\text{value}=(\text{input}-\text{offset})\cdot \text{scale}
$$

量化图中会出现 `rescale`、`convert` 等节点，用来对齐不同整数范围。Glow 的优化会尽量减少 float/int 往返、折叠 rescale 到产生数值的节点中，并把 `max` 等算子的输入归一到相同 scale，使硬件可以直接比较整数。这里的重点不是“简单把 float 换成 int8”，而是让量化信息进入类型系统和图优化，使后端拿到更干净的整数子图。

##### 6. CPU 后端与 Runtime：从单图优化到多设备执行

Glow CPU 后端会进一步执行目标相关图变换，例如将卷积权重从 `[depth, filter_x, filter_y, channel]` 改为 `[depth/N, filter_x, filter_y, channel, N]`，让 SIMD 指令连续访问；再根据 cache 大小选择卷积 tile。operator stacking 类似自动融合：多个数据并行节点被合并到一个循环中，减少内存读写和 dispatch/kernel launch。Runtime 层则面向部署：Partitioner 按内存约束、估计时间和通信代价切分子图，Provisioner 编译并放置子图，DeviceManager 管理具体设备加载和执行，Executor 按依赖异步触发子网络。这样 Glow 不只是离线代码生成器，也提供了面向多加速器推理服务的执行抽象。

> 💡 **关键**：Glow 的“降低”不是简单把图翻译成低层代码，而是在多个 IR 层级之间选择合适的优化位置：高层 IR 做语义优化和 op 规范化，低层 IR 做地址/生命周期/拷贝优化，后端做布局、SIMD、JIT/AOT 和设备特化。

#### 🧪 练习题

```yaml
question: "Glow 采用两级 IR 的主要原因是什么？"
options:
  - "高层 IR 负责张量语义级优化，低层 IR 负责地址、生命周期和静态内存规划等优化"
  - "高层 IR 只用于存储 Python 源码，低层 IR 只用于调试日志"
  - "两级 IR 的目的只是让文件格式更复杂"
  - "低层 IR 可以完全替代图级优化，因此不需要高层 IR"
answer: 0
explain: "Glow 在高层 IR 保留 tensor/op 语义以做 lowering 和图优化，在低层地址式 IR 中显式表示内存读写和生命周期，便于 copy elimination、in-place 和静态分配。"
```
