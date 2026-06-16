### Hexcute - GPU程序自动布局合成编译框架

```yaml
id: hexcute
name: Hexcute
full_name: GPU程序自动布局合成编译框架 (Hexcute)
year: '2026'
org: Community
paper_url: https://ieeexplore.ieee.org/abstract/document/11395194/
category: tensor_ir
parent: triton
motivation: 自动合成GPU程序布局，消除手工布局设计负担
```

#### 📝 一句话总结

Hexcute 提出一个 GPU 编译框架，把 tensor layout 表示为函数并把布局选择建模为约束规划问题，通过类型推断式算法自动合成 shared memory / register layout 和指令选择，解决 CUTLASS/Hidet 手工布局负担重、Triton 启发式难泛化到复杂算子的问题。

#### 🎯 核心要点

- 布局函数化：把 shared memory tensor 和 register tensor 的布局都看作从逻辑坐标到物理地址或线程-值坐标的函数
- 类型系统承载布局：tensor type 中携带 layout 信息，使 copy、gemm、reduce、cast 等 tile-level operation 能产生布局约束
- thread-value layout synthesis：对 tile-level DAG 分连通分量，选择 GEMM 或 copy 作为 anchor，再用 ready queue 传播并求解布局约束
- shared-memory layout synthesis：从所有 shared-memory copy 的 alignment / coalescing / bank-conflict 要求中统一约束，失败时回退到更保守布局
- 显式数据流与流水线：用户仍能手写关键 dataflow、software pipelining、warp specialization，编译器只自动补齐最易出错的布局和指令选择
- 论文结果：相对 CUDA/CUTLASS 手写 kernel 减少 1.27x-7.94x 代码量；在 H100 上复杂 MoE 相对 Triton 平均加速 6.46x，Mamba scan 相对手写库平均加速 4.17x；集成 vLLM 后 DeepSeek-R1-AWQ 端到端最高加速 2.60x

#### 🔬 深入细节

![Hexcute shared memory layout synthesis](https://arxiv.org/html/2504.16214v3/x19.png)
*图：arXiv HTML 版本 Figure 10，展示 Hexcute 的 shared memory layout synthesis，包括约束构造、layout constraint unification，以及统一失败时的冲突情况。图源为论文官方 arXiv HTML。*

```python
# Hexcute Algorithm 1 的简化伪代码：Thread-Value Layout Synthesis
def synthesize_thread_value_layouts(tile_dag, target_gpu):
    layouts = {}
    subgraphs = partition_by_shared_memory_edges(tile_dag)

    for sg in subgraphs:
        constraints = build_constraints(sg)
        ready = []

        if sg.contains("gemm"):
            for gemm in sg.ops("gemm"):
                instr = select_fastest_tensor_core_instruction(gemm, target_gpu)
                layouts[gemm.C] = instantiate_C_layout_by_instruction(instr)
                layouts[gemm.A], layouts[gemm.B] = solve_gemm_operand_layouts(
                    instr,
                    output_layout=layouts[gemm.C],
                    constraints=constraints,
                )
        else:
            anchor = pick_largest_copy_op(sg)
            layouts[anchor.tensor] = make_coalesced_copy_layout(anchor)

        update_ready_queue(ready, constraints, layouts)

        while constraints:
            while ready:
                c = ready.pop(0)
                unknown = c.single_unknown_layout()
                layouts[unknown] = solve_constraint(c, known_layouts=layouts)
                constraints.remove(c)
            update_ready_queue(ready, constraints, layouts)

    return layouts
```

**动机：GPU kernel 性能常常卡在“布局”，但布局不是普通整数参数。** 对一个 tile-level GPU 程序来说，数据流决定从 global memory、shared memory、register 到 Tensor Core 的移动顺序；pipeline 决定加载和计算怎样重叠；layout 决定每个逻辑元素落在哪个线程、哪个寄存器、哪个 shared memory bank 或哪个地址。CUTLASS/Hidet/CuTe 给了很强的布局代数，但要求程序员手动写出合法且高性能的布局组合。Triton 则把很多布局决策藏进编译器启发式，普通 GEMM/elementwise 很方便，但对 mixed-type MoE、Mamba scan、warp-specialized GEMM 这类复杂 dataflow 容易选错内存层级或指令。Hexcute 的折中是：让用户显式写 dataflow 和 pipeline，让编译器自动合成 layout。

布局在 Hexcute 中可以抽象成函数。shared memory layout \(m\) 把 tensor 坐标映射到 shared memory 地址：

$$
m: (i,j) \mapsto \text{addr}
$$

register tensor 的 thread-value layout \(f\) 则把 tensor 坐标映射到线程和值槽位：

$$
f: (i,j) \mapsto (t,v)
$$

这个函数视角比“枚举一个 layout id”更适合 GPU，因为一个高性能 layout 往往由 reshape、permutation、tiling、swizzle、composition 等函数组合产生。论文用 composite mapping 描述 operation-level tensor 与 instruction-level fragment 的关系，例如对 MMA 指令，操作数 A、B、C 的 layout 必须能通过 \(f_A\circ p_A^{-1}\)、\(f_B\circ p_B^{-1}\)、\(f_C\circ p_C^{-1}\) 对齐到同一条 Tensor Core instruction 的 operand layout。

**thread-value layout synthesis 的核心是 anchor + 约束传播。** Hexcute 先把 tile-level program 建成 DAG，边是 tensor，节点是 tile operation。shared memory 读写会自然切断寄存器级布局传播，所以算法先按这些边分连通分量。若某个分量包含 `gemm`，GEMM 是性能关键，算法就先选目标 GPU 上最快的 Tensor Core instruction，并用该 instruction 切分 C tile，从而确定 \(L_C\)，再通过 GEMM 约束反解 \(L_A,L_B\)。若没有 GEMM，则选搬运量最大的 copy operation 作 anchor，因为这类分量通常 memory-bound，coalesced load/store 是首要目标。

约束求解并不是全局暴力搜索。算法维护剩余约束集合 \(C\) 和 ready queue \(R_q\)。当某条约束只剩一个未知 layout 时，它就变成 ready，可以把未知项移到等式左边求解。简化写法是：

$$
R_q = \{c\in C \mid |\operatorname{unknowns}(c)|=1\}
$$

$$
L_x = \operatorname{Solve}\left(c,\{L_y\mid y\ne x\}\right)
$$

这种类型推断式传播让布局像类型一样沿数据流被推导出来：已知 copy 的输出 layout 可推输入 layout，已知 reduce 的输入 layout 可推输出 layout，已知 GEMM 的 C fragment 可推 A/B operand fragment。若多个约束冲突，说明当前指令或布局候选不合法，编译器再尝试其他候选或回退。

**shared memory layout synthesis 解决的是另一个层面的约束统一。** register layout 关注线程和值槽位，shared memory layout 还要满足向量化 load/store、TMA、bank conflict、alignment 等硬件条件。论文 Figure 10 展示的 unification 直觉是：每个 copy operation 都对同一个 shared tensor 提出一个 layout constraint，比如某些维度 stride 必须能支持 `ldmatrix` 或 vectorized load。Hexcute 尝试把这些 constraint 合并成一个更具体的 layout：

$$
M = \operatorname{Unify}(C_1,C_2,\ldots,C_n)
$$

若 stride、shape 或 swizzle 要求兼容，就 materialize 出统一 layout；若要求互相矛盾，例如两个 copy 对同一维要求不同 stride，则合成失败，编译器使用更保守的中间布局或拆分搬运路径。这一点很重要，因为 shared memory 是多个 operation 之间的真实交换点，错误的 unified layout 会直接导致 bank conflict 或额外搬运。

**与 Triton 的本质差异在控制边界。** Triton 把很多线程级布局、memory placement 和 pipelining 决策交给启发式 pass，优点是代码短，缺点是复杂算子需要的 dataflow 不一定能表达或不一定被选中。Hexcute 的用户代码通常比 Triton 更显式：程序员写出 tile-level copy、MMA、reduce、pipeline stage、warp specialization，但不用手写每个 tensor 的 layout template。换句话说，Hexcute 保留专家对算法级 dataflow 的控制，把容易错且机械的 layout 推导交给编译器。

**性能结果说明布局合成不仅是省代码，也影响指令选择。** 在 mixed-type MoE 中，Triton 的启发式可能使用标量 load/store 或次优数据流，而 Hexcute 能从约束中合成适合 vectorized instruction 和 Tensor Core fragment 的布局，因此在 H100 上相对 Triton 平均加速 6.46x。Mamba scan 的瓶颈是多个 tensor 的向量化加载、scan/reduction 和寄存器布局，Hexcute 通过 layout synthesis 选择更宽的 load/store 指令，平均比手写 Mamba 库快 4.17x。集成到 vLLM 后，端到端收益低于 kernel microbenchmark 但仍显著，说明 layout synthesis 能穿透到真实 serving 工作负载。

> 💡 关键：Hexcute 不是要把 GPU kernel 完全自动生成，而是把“专家选择 dataflow/pipeline”和“编译器合成 layout/instruction”拆开。这个边界比纯手写和纯启发式都更适合复杂深度学习算子。

#### 🧪 练习题

```yaml
question: "Hexcute 为什么把 layout synthesis 建模为类型推断式约束求解，而不是简单枚举若干 layout 模板？"
options:
  - "因为 GPU layout 是函数组合，搜索空间巨大，且合法性由 copy、gemm、reduce 等 operation 的约束共同决定"
  - "因为 Tensor Core 只能执行一种固定 layout，不需要考虑 shared memory"
  - "因为 Triton 已经完全解决了所有复杂算子的 layout 选择问题"
  - "因为 layout 只影响代码行数，不影响指令选择和性能"
answer: 0
explain: "Hexcute 将 tensor layout 嵌入类型并由操作约束传播，能从已知 anchor 推导未知布局，同时处理指令 operand、coalescing、bank conflict 等条件；这比枚举少量模板更能覆盖复杂算子。"
```
