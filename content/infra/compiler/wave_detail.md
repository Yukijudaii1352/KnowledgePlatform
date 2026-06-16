### 符号化Python DSL编译器 (Wave)

```yaml
id: wave
name: Wave
full_name: 符号化Python DSL编译器 (Wave)
year: '2026'
org: Modular
paper_url: https://mlsys.org/Conferences/2026/AcceptedPapers
category: infrastructure
parent: mojo
motivation: 符号化Python DSL统一AI硬件编程与编译优化
```

#### 📝 一句话总结

Wave 是面向高性能机器学习 kernel 的符号化 Python DSL，它把计算逻辑与 GPU 分发策略分离，用 symbolic shape、显式约束、FX/MLIR/IREE 编译管线把 Python 级 kernel 描述降到高性能 GPU 代码。

#### 🎯 核心要点

- **Python DSL + symbolic expression**：用 Python 语法和符号维度表达 tensor shape、索引、layout 与动态假设
- **计算与分发解耦**：kernel body 描述数学计算，`WorkgroupConstraint`、`WaveConstraint`、`TilingConstraint`、`HardwareConstraint` 描述并行映射
- **支持 tile-based 与 SIMT 模型**：高层以 tile/wave 为单位写 kernel，编译器展开到线程级 SIMT 执行
- **硬件感知抽象**：直接表达 wave size、MMA/MFMA 类型、shared/global memory、寄存器 accumulator 等 GPU 概念
- **PyTorch 集成**：可从 PyTorch 调用自定义 kernel，复用 PyTorch tensor，避免每次调用重新编译
- **MLIR/IREE 后端**：使用 torch.fx + sympy 作为中间表示，再降到 MLIR vector/arith/scf/amdgpu 等 dialect，交给 IREE 做最后优化与运行时
- **内置优化 passes**：包括 global load minimization、shared memory promotion/reuse、LICM、barrier insertion、instruction scheduling、contiguous load detection 等

#### 🔬 深入细节

![Wave 编译管线](https://wave-lang.readthedocs.io/en/latest/_images/wave_pipeline.excalidraw.png)
*图：Wave 从 Python 表达式经过 FX tracing、约束上下文、类型推断、索引分析、SIMW 到 SIMT 展开、优化、MLIR emission 和 IREE compile，最终生成可运行 kernel。来源：Wave 官方文档。*

```python
# Wave GEMM 风格伪代码，展示“计算逻辑”和“分发约束”分离
from wave_lang.kernel._support.indexing import sym
import wave_lang.kernel.lang as tkl
import wave_lang.kernel.wave as tkw

M, N, K = sym.M, sym.N, sym.K
BLOCK_M, BLOCK_N, BLOCK_K = sym.BLOCK_M, sym.BLOCK_N, sym.BLOCK_K
ADDRESS_SPACE = sym.ADDRESS_SPACE

constraints = [
    tkw.WorkgroupConstraint(M, BLOCK_M, 0),      # M 维映射到 grid axis 0
    tkw.WorkgroupConstraint(N, BLOCK_N, 1),      # N 维映射到 grid axis 1
    tkw.TilingConstraint(K, BLOCK_K),            # K 维按 BLOCK_K 做 reduction tiling
    tkw.WaveConstraint(M, BLOCK_M / 2),          # workgroup 内继续分到 wave
    tkw.WaveConstraint(N, BLOCK_N / 2),
    tkw.HardwareConstraint(
        threads_per_wave=64,
        mma_type=tkw.MMAType.F32_16x16x16_F16,
    ),
]

@tkw.wave(constraints)
def gemm(
    a: tkl.Memory[M, K, ADDRESS_SPACE, tkl.f16],
    b: tkl.Memory[N, K, ADDRESS_SPACE, tkl.f16],
    c: tkl.Memory[M, N, tkl.GLOBAL_ADDRESS_SPACE, tkl.f32],
):
    acc = tkl.Register[M, N, tkl.f32](0.0)

    @tkw.iterate(K, init_args=[acc])
    def repeat(acc):
        a_reg = tkw.read(a)
        b_reg = tkw.read(b)
        acc = tkw.mma(a_reg, b_reg, acc)
        return acc

    tkw.write(repeat, c)
```

**动机与背景：现代 ML kernel 需要硬件矩阵指令，但 CUDA/HIP 级手写成本太高。** 高性能 GEMM、attention、conv 往往必须使用 GPU vendor 的矩阵乘 intrinsics，例如 AMD MFMA 或 NVIDIA MMA。这些指令是跨线程协作的 tile 操作，寄存器/共享内存 layout、tile size、线程分发和调度互相耦合，直接用 SIMT C 写既慢又容易错。Triton 降低了一部分门槛，但当 kernel 需要更细的分发、layout 或硬件控制时，仍可能难以表达。Wave 的定位是：保留 Python 的可编程性，同时显式提供足够的硬件映射约束，让编译器自动完成索引、layout、线程展开和后端 lowering。

**Wave 的核心抽象是“符号计算图 + 约束系统”。** 用户在函数签名中写 `Memory[M, K, ADDRESS_SPACE, f16]`，这里的 \(M,K\) 不是立即数，而是可被编译期替换、推理和简化的符号。分发策略不写进 kernel body，而由约束给出。例如一个 workgroup 约束可理解为：

$$
\text{wg}_M=\left\lfloor\frac{i_M}{B_M}\right\rfloor,\qquad
\text{local}_M=i_M\bmod B_M.
$$

`WaveConstraint` 再把 workgroup 内的 tile 分给 wave；`TilingConstraint(K,B_K)` 表示 reduction 维 \(K\) 以 \(B_K\) 为粒度推进；`HardwareConstraint` 绑定 wave size 与 MMA 类型。这样同一个数学计算可以换不同 tile size、wave 切分或硬件指令，而不需要重写核心计算逻辑。

**编译管线先保留 Python 灵活性，再逐步变成硬件可执行 IR。** 官方架构图中，Wave 从 Python expression 进入 torch.fx tracing，得到带 Wave-specific ops 与 symbolic types 的 FX graph；随后结合 constraints 做 type inference 与 initial indexing determination。Index sequence analysis 会从 MMA/vector shape 这类“源约束”向图中其他节点传播访问模式，决定每个 `read`、`write`、`mma` 的 per-thread/per-wave 索引。当不同节点的 thread shape 冲突时，简单情况可 broadcast，复杂情况需要 shuffle 或 shared memory 往返。

**SIMW 到 SIMT 的 Expansion 是 Wave 区别于普通 Python tensor DSL 的关键。** 用户以 wave/tile 视角写：

$$
C_{mn}=\sum_{k=0}^{K-1} A_{mk}B_{nk},
$$

但真实 GPU 执行的是线程级指令序列。Wave 编译器根据约束把一个 wave 看到的 tile 展开成每个 lane 的寄存器片段、load/store mask、MMA operand layout 和 reduction 片段。对非整除 shape，编译器插入 masking；对符号表达式，先用 sympy 简化，再降到 MLIR affine/vector/arith 操作，减少除法、取模、select 等低效指令。

**优化 pass 面向机器学习 kernel 的数据搬运瓶颈。** Wave 文档与 LLVM talk 中列出的中端优化包括 promotion to shared memory、global load optimization、reuse shared allocations、fold extract slice、barrier insertion、instruction scheduling、hoisting loop-invariant Wave ops、contiguous load detection 等。可以把它理解成一个从高层 tile 计算到低层内存层次的自动调度器：先判断哪些全局读可合并或提升到 shared memory，再用 lifetime 分析复用 shared buffer，最后插入必要 barrier 并排列指令减少等待。

**APLP 软件流水线分析说明 Wave 不只做语法糖。** Wave 的软件流水线资料把路径表示成：

$$
L(S)=\text{delay}-\text{iter\_diff}\cdot S,
$$

其中 \(S\) 是符号 initiation interval。多个候选路径只保留上包络，因为对任意 \(S\) 只有最大约束会限制调度。文档用 Andrew monotone chain 类似方法剪枝上包络，复杂度主要来自排序 \(O(N\log N)\)，再用 Floyd-Warshall 风格的 all-pairs longest path 组合依赖。这类机制表明 Wave 的优化目标不仅是把 Python 翻译到 MLIR，还包括对调度合法性与流水线间隔做符号级分析。

**与 Triton、CUDA/HIP 手写和普通图编译器的区别。** CUDA/HIP 提供最大控制但开发慢；高层图编译器能融合普通 tensor op 但通常难以表达硬件矩阵 intrinsics 的 layout；Triton 介于两者之间，但用户仍要显式写很多 tile 程序细节。Wave 选择把“计算”写成 tensor/tile 级 Python，把“分发”写成 declarative constraints，再由 compiler 决定 memory access pattern、thread expansion 和 MLIR lowering。它的优势是探索新 kernel 时修改约束很快；风险是编译器必须足够理解硬件，否则自动生成的 layout、barrier 或 schedule 会成为性能上限。

#### 🧪 练习题

```yaml
question: "Wave 的设计中，为什么要把计算逻辑和分发策略分离？"
options:
  - "为了让所有 kernel 都退化成 CPU 上的 Python 循环"
  - "为了让同一数学 kernel 能通过不同约束映射到 workgroup、wave、tile 和硬件 MMA，而不重写计算主体"
  - "为了避免使用 MLIR/IREE 后端"
  - "为了禁止用户控制 shared memory"
answer: 1
explain: "Wave 的 kernel body 表达计算，constraints 表达 tiling、workgroup/wave 映射和硬件指令选择，因此可以快速试验不同硬件分发方案并交给编译器完成索引与 lowering。"
```
