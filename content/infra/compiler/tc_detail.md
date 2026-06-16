### TC — Tensor Comprehensions

```yaml
id: tc
name: TC
full_name: 框架无关高性能张量抽象 (Tensor Comprehensions)
year: '2018'
org: Meta/FAIR
paper_url: https://arxiv.org/abs/1802.04730
category: tensor_ir
parent: halide
motivation: 数学符号描述张量运算，多面体编译自动生成CUDA代码
```

#### 📝 一句话总结

Tensor Comprehensions 提出接近数学 Einstein 记法的张量 DSL，并用 Halide IR、多面体编译、CUDA 映射和遗传自动调优把高层张量表达自动生成高性能 GPU kernel，解决新算子需要手写 CUDA 或等待框架库支持的问题。

#### 🎯 核心要点

- **TC DSL**：用 `C(i,j) +=! A(i,k) * B(k,j)` 这类数学式描述张量计算，索引变量隐式声明，右侧独有索引自动成为 reduction 维度
- **Range Inference**：从输入 shape、仿射索引表达式和 `where` 约束推断迭代范围，减少手写边界和 off-by-one 错误
- **初始化归约语义**：`+=!`、`min=!`、`max=!` 表示先用归约单位元初始化输出，再执行归约，保持求值顺序无关性
- **多面体 JIT**：TC 先 lowering 到扩展 Halide IR，再到 Polyhedral IR，经 isl/PPCG 风格调度、tiling、fusion、mapping 生成 CUDA
- **GPU 映射**：使用 schedule tree 表示循环调度和 block/thread 映射，自动插入共享内存 promotion、同步和 kernel launch 结构
- **编译缓存**：以 `(TC, input, shapes, target, architecture)` 为 key 缓存最快 CUDA/PTX 版本，并可用 Protocol Buffer 持久化
- **遗传自动调优**：搜索 tile/block/grid 大小、unroll、fusion strategy、shared/private memory 等选项，编译并 profile 数百到数千个候选 kernel
- **框架集成**：通过 ATen 薄接口集成 PyTorch 和 Caffe2，单个 TC 可替换框架中的一个或多个计算图算子

#### 🔬 深入细节

![TC JIT 编译流程](https://ar5iv.labs.arxiv.org/html/1802.04730/assets/x1.png)
*图：TC 从 Tensor Comprehension lowering 到扩展 Halide IR、Polyhedral IR，再经多面体变换生成 CUDA/C/ATen 执行路径。来源：论文 Figure 2*

```python
# Tensor Comprehensions 的核心流程伪代码
def compile_and_run_tc(tc_source, input_tensors, target_gpu):
    # 1. 前端：解析数学式张量 DSL，并从输入 shape 推断迭代范围
    tc_ast = parse_tensor_comprehension(tc_source)
    ranges = infer_ranges(tc_ast, input_tensors.shapes)

    # 2. Lowering：TC -> 扩展 Halide IR -> Polyhedral IR
    halide_ir = lower_to_halide_ir(tc_ast, ranges)
    scop = lower_to_polyhedral_ir(halide_ir)

    # 3. 查缓存；miss 时进入多面体调度和自动调优
    key = (canonicalize(tc_source), input_tensors.shapes, target_gpu.arch)
    if cache.contains(key):
        kernel = cache[key]
    else:
        best = None
        population = init_genetic_population()
        for generation in range(max_generations):
            for config in population:
                schedule_tree = isl_schedule(scop, config.fusion_strategy)
                tiled = tile_and_map_to_cuda(schedule_tree, config)
                cuda_src = generate_cuda(tiled)
                runtime = compile_and_profile(cuda_src, input_tensors)
                best = min(best, (runtime, cuda_src), key=lambda x: x[0]) if best else (runtime, cuda_src)
            population = breed_and_mutate(population, fitness=lambda c: 1 / measured_runtime(c))
        kernel = nvrtc_compile(best[1])
        cache[key] = kernel

    return kernel.launch(input_tensors)
```

**动机与背景：新算子的“白板公式”和 GPU 性能之间缺桥**

深度学习研究经常发明新层、新归约或新数据布局，但主流框架通常只能高效调用 cuDNN、cuBLAS、NNPACK 这类手写库。只要计算不完全匹配已有库调用，就要写 custom operator，工程成本高且性能不稳定。Halide 已经证明“算法与调度分离”能提升图像处理生产力，但 GPU 调度仍常需要专家手写。TC 的目标是更激进：让用户只写张量数学式，把调度、映射和代码生成交给多面体编译器与 autotuner。

**TC 语言：隐式索引、归约和初始化**

TC 借用 Einstein notation：索引变量通过使用自动声明，出现在右侧但不在左侧的变量是 reduction 维度。例如矩阵乘法可写成：

```python
def matmul(float(M, K) A, float(K, N) B) -> (C) {
    C(m, n) +=! A(m, kk) * B(kk, n)
}
```

`kk` 只出现在右侧，因此编译器把它识别为归约维度；`+=!` 表示先把 `C(m,n)` 初始化为加法单位元 0，再累加。这与普通 `+=` 不同，后者假设输出已有合法初值。数学上，它表达的是：

$$
C_{m,n} = \sum_{k=0}^{K-1} A_{m,k} B_{k,n}
$$

因为归约运算要求交换律和结合律，TC 的语义对循环排列保持不变，给后端调度留下了 loop interchange、tiling、fusion 等优化空间。

**Range Inference：从访问表达式推断安全迭代域**

TC 的简洁性来自范围推断。对仿射访问 \(I(i+x)\)、\(K(x)\)，编译器会先找只含单个未解变量的访问表达式，推断最大不越界区间；之后逐轮用已知变量范围推断剩余变量。对于无法唯一推断的维度，用户用 `where kw in 0:2` 显式给出范围。推断本质是在构造矩形迭代域：

$$
D_S = \left\{\mathbf{i} \in \mathbb{Z}^n \mid A\mathbf{i} + \mathbf{b} \ge 0 \right\}
$$

这里 \(\mathbf{i}\) 是循环索引向量，约束来自输入张量边界、输出张量定义和 `where` 注解。论文强调 TC 采用接近 Halide 的普遍量化语义：输出域上的每个点都必须由同一组输入访问规则安全定义，这有利于生成无条件分支的紧凑代码。

**多面体编译：把张量式变成可调度的 SCoP**

TC 的 lowering 路径是 `TC -> Ext. Halide IR -> Polyhedral IR -> CUDA Kernel`。进入 Polyhedral IR 后，每个语句实例都是整数格点，读写访问是仿射关系，依赖也可表示为整数关系。调度就是为每个语句实例寻找时间戳函数：

$$
\theta_S(\mathbf{i}) = M_S \mathbf{i} + \mathbf{c}_S
$$

在满足依赖约束的前提下，\(\theta\) 决定 loop fusion、loop interchange、tiling、skewing、distribution 等变换。TC 使用 schedule tree 携带调度结构，再在树上插入 GPU mapping 信息，把外层 band 映射到 block，把内层 band 映射到 thread，并根据数据复用决定是否把全局内存 tile promotion 到 shared memory。

> 💡 关键：TC 不只是把公式翻译成嵌套循环，而是把公式翻译成可由 isl/PPCG 风格算法变换的整数集合和关系，从而系统搜索 GPU 并行与内存层级。

**自动调优与缓存：JIT 可用性的工程关键**

多面体调度本身比训练便宜，但仍不适合每次运行都重新探索。TC 因此把 JIT、autotuning 和 compilation cache 绑定在一起。缓存 key 为：

$$
K = (\text{TC}, \text{input}, \text{shapes}, \text{target}, \text{architecture})
$$

缓存 value 是当前已知最快的 CUDA/PTX 版本。miss 时，autotuner 用遗传算法搜索配置：每个候选的 gene 对应 tile 大小、block/grid 形状、unroll 上界、fusion strategy、shared/private memory 使用等参数；候选被编译并在 GPU 上 profile，fitness 与运行时间成反比：

$$
\operatorname{fitness}(c) = \frac{1}{\operatorname{runtime}(c)}
$$

下一代通过三亲本 uniform crossover 和低概率 mutation 产生。论文还提到多线程、多 GPU autotuner：CPU 线程并行编译候选，GPU 并行 profile 候选，再把性能数据写回数据库和缓存。

**与 Halide、XLA、手写 CUDA 的区别**

TC 继承 Halide 的“从高层表达推断边界和调度空间”思想，但针对深度学习张量 contraction、长距离复用和高维归约做了更强的多面体调度与 GPU mapping；与 XLA 相比，TC 不依赖某个框架图，也不只做固定 pattern fusion，而是允许用户直接表达新算子并自动生成单个 fused kernel；与手写 CUDA 相比，TC 的峰值性能不总是最强，论文也承认大规模 SGEMM 仍落后 cuBLAS，原因是寄存器 tiling、warp 级 operand reuse 等低层技巧很难由通用多面体系统完全覆盖。但在分组卷积、批量矩阵乘和 Facebook 生产 LUT 模型中，TC 的自动生成 kernel 能显著缩短从公式到可用高性能实现的路径。

#### 🧪 练习题

```yaml
question: "Tensor Comprehensions 中 `+=!` 的核心语义是什么？"
options:
  - "执行原子加，保证多个 CUDA thread 不发生写冲突"
  - "先用加法单位元初始化输出，再对右侧独有索引执行归约累加"
  - "要求编译器把该语句映射到 cuBLAS GEMM"
  - "表示该输出张量必须保留上一次调用的旧值"
answer: 1
explain: "`!` 表示 initializing reduction：先初始化为归约单位元，再执行归约；这让 TC 的归约语义明确且与循环遍历顺序无关。"
```
