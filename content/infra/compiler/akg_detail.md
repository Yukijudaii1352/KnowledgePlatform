### AKG：昇腾 NPU 自动算子生成器

```yaml
id: akg
name: AKG
full_name: 昇腾NPU自动算子生成器 (Automatic Kernel Generator)
year: '2021'
org: Huawei
paper_url: https://dl.acm.org/doi/10.1145/3453483.3454106
category: hardware_specific
parent: tiramisu
motivation: 多面体技术适配NPU，自动协同异构调度
```

#### 📝 一句话总结

AKG 将 TVM 风格的张量表达降到多面体 schedule tree，用 ILP 调度、复杂 tiling/fusion、自动存储管理和 NPU 专用卷积变换自动生成 Ascend NPU kernel，解决了手写 schedule 难覆盖异构计算单元与复杂片上内存层次的问题。

#### 🎯 核心要点

- **TVM 前端复用**：继承 TVM graph engine 和 DSL，接收深度学习框架产生的 fused operator/subgraph
- **HalideIR 到 Polyhedral IR**：把张量表达降到参数化 HalideIR，再转换为多面体 schedule tree
- **ILP 多面体调度**：利用 isl 的多面体 scheduler 自动寻找兼顾并行性与局部性的 affine schedule
- **Reverse tiling 策略**：先 tile live-out iteration space，再反推 intermediate iteration space 的复杂/重叠 tile shape
- **Tile-size specification 与 Auto Tiling**：用简洁策略语言描述 tile size 和目标 buffer，并基于硬件规格自动搜索
- **Post-tiling fusion**：用 schedule tree 的 extension node 和 mark node 在 tiling 后再融合 producer/consumer，减少片外数据搬运
- **多方向片上数据流管理**：根据 dot-product/reduction 模式将计算分流到 Cube Unit、Vector Unit、Scalar Unit 和 L1/UB/L0 buffer
- **卷积专用优化**：自动执行 img2col，将 convolution 变为 GEMM，再 graft fractal GEMM schedule tree 适配 Ascend DaVinci 架构
- **后端补充优化**：在代码生成阶段实现 SIMD vectorization、动态规划式同步合并、低层指令发射和学习型 auto-tuning

#### 🔬 深入细节

![AKG 编译流程总览](https://01.me/files/AKG/PLDI21-slides-images/slide13.png)
*图：AKG PLDI 2021 演示中的系统架构。AKG 从深度学习框架进入 Tensor Expression，经多面体 schedule tree、fusion、tiling、storage management、backend optimization、instruction emitter 与 synchronization 生成低层汇编。*

```python
# AKG 自动 kernel 生成核心伪代码
def akg_compile(fused_subgraph, hardware_spec):
    tensor_expr = tvm_graph_engine_to_tensor_expression(fused_subgraph)
    halide_ir = lower_to_parametric_halide_ir(tensor_expr)
    schedule_tree = build_polyhedral_schedule_tree(halide_ir)

    # 1. 先用 isl 找到利于 tiling/fusion 的 affine schedule
    schedule_tree = isl_schedule(schedule_tree, objective=["parallelism", "locality"])

    # 2. 自动选 tile size，并从 live-out tile 反推 producer tile shape
    tile_policy = auto_tiling(schedule_tree, hardware_spec)
    live_out_tiles = tile_live_out_iteration_spaces(schedule_tree, tile_policy)
    producer_relation = reverse_construct_producer_tiles(live_out_tiles, access_relations(halide_ir))

    # 3. 在 tiling 后插入 extension node 做 aggressive fusion
    schedule_tree = insert_extension_node(schedule_tree, producer_relation)
    schedule_tree = mark_original_producer_subtree_as_skipped(schedule_tree)

    # 4. 面向 NPU 的多方向数据流和卷积特化
    schedule_tree = mark_cube_or_local_ub(schedule_tree, hardware_spec)
    if contains_convolution(schedule_tree):
        schedule_tree = replace_conv_with_img2col_fractal_gemm(schedule_tree, hardware_spec)

    # 5. 生成 CCE/低层代码并做后端优化
    code = emit_target_code(schedule_tree, hardware_spec)
    code = vectorize_and_align(code)
    code = minimize_synchronization_by_dynamic_programming(code)
    return auto_tune(code, tile_policy.search_space)
```

**动机与背景：NPU 的难点不是“有算力”，而是“喂得上数据”**

GPU/CPU 上的张量编译器可以依赖较通用的 cache 层次、SIMD/SIMT 模型和相对稳定的 schedule primitive；NPU 则不同。以 Ascend 910 的 DaVinci 架构为例，矩阵乘法走 Cube Unit，逐元素或向量计算走 Vector Unit，控制和标量逻辑走 Scalar Unit，数据还要在 L1、Unified Buffer、L0A、L0B、L0C 之间移动。传统“内存金字塔”模型不够表达这种多层、多方向、软件控制的数据流。手写 TVM schedule 或 CCE 代码虽然能逼近高性能，但每个 shape、每个 fused pattern、每个硬件路径都需要专家调参，开发周期和调试成本很高。

**整体流程：把 TVM 的表达能力接到多面体调度能力上**

AKG 没有重做深度学习前端，而是继承 TVM 的 graph engine 和 tensor DSL：图优化器先把框架模型切成 fused subgraph，AKG 负责每个 fused operator 的 operator-level optimization 与 code generation。张量表达先降到 HalideIR，再转换成 schedule tree。Schedule tree 的 domain/filter/band/sequence/set/extension/mark node 能表达 statement instance、执行次序、循环维度、融合分组和 codegen hint。相比 TVM schedule primitive，polyhedral scheduler 能自然表达 skewing、shifting、scaling、fusion、fission 等更宽的 affine transformation 空间。

**Tiling 机制：先切 live-out，再反推 producer 的复杂 tile**

论文的关键设计是 reverse strategy。传统多面体编译常把每个 iteration space 独立 tile，然后再考虑融合；AKG 反过来，先对 live-out iteration space 做矩形 tile，再根据读访问关系计算这个 tile 需要哪些 producer 数据，从而得到 intermediate iteration space 的复杂 tile shape。对二维卷积示例，live-out tile loop \((o_0,o_1)\) 与 producer statement \(S_0(h,w)\) 的关系可写为：

$$
\{(o_0,o_1) \rightarrow S_0(h,w) :
0 \le o_0 < \lceil(H-KH+1)/T_2\rceil \land
0 \le o_1 < \lceil(W-KW+1)/T_3\rceil \land
T_2o_0 \le h < T_2o_0 + KH + T_2 - 1 \land
T_3o_1 \le w < T_3o_1 + KW + T_3 - 1\}
$$

这个关系说明 producer tile 不是普通矩形块，而可能因为卷积核重叠、stride 和 padding 形成 overlap tile。正是这种复杂 tile shape 让 AKG 能把更多中间张量保留在片上 buffer 中，减少 off-chip memory traffic。

**Fusion 机制：offload 时尽量合并，片上执行时按计算单元分流**

AKG 区分两类 fusion。第一类是 **fusion when offloading data**：用 extension node 把原本不在当前 subtree 中的 producer statement instance 引入 tile 内，实现 post-tiling fusion；再用 mark node 标记原 producer subtree 为 skip，避免重复生成代码。这比先融合再 tiling 的传统做法有更大的组合空间。第二类是 **fusion when forking data**：数据上片后需要分流到不同 compute unit。AKG 用 `local_UB` mark 表示某些 subtree 进入 Unified Buffer 并交给 Vector/Scalar Unit；包含 dot-product reduction 的计算则视为 convolution/matmul，流向 Cube Unit。片上局部还会做 intra-tile rescheduling，让 Vector/Scalar 路径更容易向量化，让 Cube 路径保持 aggressive fusion。

**存储管理与卷积特化：把 schedule tree 变成 NPU 数据流**

在 storage management 阶段，AKG 根据 tile 的访问关系自动把数据提升到目标 buffer：普通 vector/scalar 数据进入 UB，卷积/GEMM 的输入矩阵进入 L0A/L0B，输出累加进入 L0C，较大数据块进入 L1。卷积优化进一步分两步：先用 img2col 把卷积窗口展开成 GEMM 的矩阵乘形式，再把 GEMM 替换为 fractal GEMM schedule tree，使矩阵块对齐 Ascend Cube Unit 的 fractal 架构。论文中 img2col/fractal 的一个索引映射示意为：

$$
\begin{aligned}
i_0 &= i'_0,\quad
i_1 = \left\lfloor \frac{i'_2}{KH \cdot KW} \right\rfloor,\quad
i_4 = i'_4 \\
i_2 &= \left\lfloor \frac{i'_1 f + i'_3}{W_o} \right\rfloor + s_h +
\left\lfloor \frac{i'_2}{KW} \right\rfloor \bmod KH - pad_h \\
i_3 &= ((i'_1 f + i'_3) \bmod W_o) \cdot s_w + (i'_2 \bmod KW) - pad_w
\end{aligned}
$$

直观上，\(i_k\) 是原 NCHW/5D feature map 的索引，\(i'_k\) 是 fractal GEMM 中矩阵块的索引。这个映射把“卷积窗口如何展开成矩阵块”显式写进多面体关系，codegen 就能自动插入对应的数据搬运和布局变换。

**后端优化：多面体负责大结构，codegen 处理硬件细节**

AKG 并不把所有问题都强塞进多面体模型。向量化、指令级同步、double buffering、SIMD intrinsic 对齐、低层 DAE pipeline 同步等细节放在 code generator 和 post-polyhedral transformation 中处理。同步优化尤其重要：NPU 的计算单元和数据搬运单元各有流水线，需要插入同步保持依赖；AKG 先按跨单元依赖插入同步，再用动态规划合并同步点，减少等待开销。Auto-tuner 则在 Auto Tiling 给出的合法空间中采样、训练模型、再朝高性能方向继续采样，弥补静态代价模型和真实硬件之间的差距。

> 💡 关键：AKG 的本质是把 NPU 优化从“专家手写 schedule”变成“schedule tree 上的可组合变换”。多面体 IR 负责证明和组织合法变换，硬件 spec 与 mark/extension node 负责把这些变换落到真实片上数据流。

#### 🧪 练习题

```yaml
question: "AKG 中 reverse tiling 策略的主要作用是什么？"
options:
  - "先把所有循环完全展开，再交给 LLVM 自动向量化"
  - "先 tile live-out iteration space，再通过访问关系反推出 producer 的复杂 tile shape"
  - "跳过多面体调度，完全依赖 TVM 手写 schedule"
  - "只优化标量控制流，不处理卷积和矩阵乘"
answer: 1
explain: "AKG 通过 live-out tile 的读访问关系构造 producer tile，可以表达卷积中的重叠 tile，并在 tiling 后做更激进的融合与片上存储管理。"
```
