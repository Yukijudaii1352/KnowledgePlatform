### TorchDynamo：PyTorch 动态字节码编译器

```yaml
id: torch_dynamo
name: TorchDynamo
full_name: PyTorch动态字节码编译器 (TorchDynamo + TorchInductor)
year: '2022'
org: Meta
paper_url: https://dl.acm.org/doi/abs/10.1145/3620665.3640366
category: infrastructure
parent: —
motivation: Python字节码变换实现零侵入动态图编译加速
```

#### 📝 一句话总结

TorchDynamo 通过 CPython frame evaluation hook 在 Python 字节码执行前做 JIT 级别的字节码改写，把可编译的 PyTorch 操作片段捕获为 FX Graph，同时用 guards 和 graph break 保留完整 Python 语义；TorchInductor 则把这些图降到 loop-level IR，并生成 Triton/C++ 内核，实现 PyTorch 2 `torch.compile` 的零侵入动态图编译加速。

#### 🎯 核心要点

- **PEP 523 frame hook**：拦截 CPython 函数调用帧，在执行原始 bytecode 前分析、改写并缓存新 bytecode
- **Python bytecode-to-bytecode translator**：不是替换 Python 语言，而是在原函数中嵌入对已编译 FX Graph 的调用
- **FX Graph 捕获**：用符号解释器逐条模拟 Python bytecode，把 PyTorch Tensor 操作记录为 `torch.fx.GraphModule`
- **Guard 复用机制**：对 tensor metadata、Python 类型、常量、module 属性、全局 PyTorch 状态等动态假设生成 guard，guard 通过才复用缓存代码
- **Graph break + continuation**：遇到不可捕获 Python 行为、外部库或数据依赖控制流时切分图，并生成 `resume_at_X` 继续执行
- **Side effect tracking**：延迟并重放全局变量、属性、list/dict、closure cell 等副作用，避免 trace 语义丢失
- **AOTAutograd**：用 fake tensor 记录 forward/backward joint graph，通过 min-cut 分割前向与反向图，并做 functionalization/decomposition
- **TorchInductor 默认后端**：把 FX Graph 降为 define-by-run loop-level IR，再为 GPU 生成 Triton，为 CPU 生成 C++/OpenMP
- **动态 shape 支持**：使用 SymPy 符号尺寸、meta functions 和 shape guards，默认支持动态维度但不支持动态 rank
- **混合执行模型**：可编译片段走 compiler backend，不可编译片段回落到 CPython/PyTorch eager，兼顾覆盖率与性能

#### 🔬 深入细节

![TorchDynamo 修改 CPython 解释器捕获 FX Graph 的流程](https://canada1.discourse-cdn.com/flex036/uploads/pytorch1/original/1X/473093b09f6856e7f8fa957100ef12436c7a7526.jpeg)
*图：TorchDynamo 开发文档中的总体流程。Dynamo 通过 CPython frame evaluation API 接管函数帧，分析 bytecode，生成 guards、FX graph 和新的 bytecode，再交给后端编译。*

```python
# TorchDynamo + TorchInductor 的核心流程伪代码
def eval_frame_with_torchdynamo(frame, backend="inductor"):
    code = frame.code

    if should_skip_frame(frame):
        return cpython_eval(frame)

    for cached in code_cache[code]:
        if cached.guard_fn(frame.locals, frame.globals, torch_state()):
            return cpython_eval(cached.rewritten_bytecode, frame)

    state = SymbolicState(
        stack=[],
        locals=wrap_inputs_as_variable_trackers(frame.locals),
        fx_graph=FXGraph(),
        guards=[],
        side_effects=[],
    )

    while state.pc < len(code.bytecode):
        instr = code.bytecode[state.pc]
        ok = symbolic_execute_one_bytecode(instr, state)
        if not ok:
            partial_graph = state.fx_graph.finish()
            compiled_call = backend(partial_graph, state.example_inputs)
            resume_fn = emit_resume_at(state.pc, state.live_values, code.bytecode)
            new_code = emit_bytecode_calling(compiled_call, resume_fn, state.side_effects)
            return cache_and_run(code, new_code, state.guards, frame)

    fx_graph = state.fx_graph.finish()
    fw_bw_graph = aot_autograd_capture_if_training(fx_graph)
    inductor_ir = lower_fx_to_loop_ir(fw_bw_graph)
    compiled_call = torchinductor_codegen(inductor_ir, targets=["triton", "cpp"])

    new_code = emit_bytecode_calling(compiled_call, None, state.side_effects)
    return cache_and_run(code, new_code, state.guards, frame)
```

**动机：为什么 PyTorch 需要字节码级图捕获**

PyTorch 的核心吸引力来自 eager mode：模型就是普通 Python 程序，可以用 `print`、`pdb`、list/dict、closure、异常、第三方库和自定义类。问题是 eager mode 每次只看到单个 operator，编译器无法跨 operator 做 fusion、memory planning、kernel scheduling。早期 `torch.jit.trace` 在 dispatcher 层记录操作，遇到 Python 控制流会把示例输入走过的路径“烙死”进图里；`torch.jit.script` 尝试静态解析 Python AST，但需要重实现 Python 子集，覆盖率不够；lazy tensor 每轮积累图再编译，运行时维护图结构和延迟 kernel launch 都有额外开销。TorchDynamo 的设计判断是：不要要求用户放弃 Python，而是让编译器在 CPython 执行边界上工作，把“可图化的片段”从原 bytecode 中抽出来。

**Frame hook、guard 与缓存：Dynamo 的正确性边界**

TorchDynamo 利用 PEP 523 暴露的 `eval_frame` 扩展点接管 CPython 函数帧。第一次运行某个 `PyCodeObject` 时，Dynamo 逐条符号解释 bytecode；后续运行时先执行 guard 函数，如果 guard 为真就复用缓存的改写 bytecode 和后端编译产物。guard 可以写成如下逻辑：

$$
\mathrm{Reusable}(C, E)=\bigwedge_{g_i\in G_C} g_i(E)
$$

其中 \(C\) 是一次编译产物，\(E\) 是当前 locals/globals/tensor metadata/全局 PyTorch 状态组成的运行环境。只要任何一个假设失效，比如输入 tensor stride 变化、module 属性变化、某个 list 长度变化，Dynamo 就不能复用旧图，必须重新分析或回落。这个机制把动态图编译的“乐观特化”显式化：编译器可以对当前观察到的 Python 状态做强优化，但必须把每个特化条件变成可检查的 guard。

**符号 bytecode 解释器：VariableTracker、fake tensor 与 FX Graph**

Dynamo 的核心不是 AST parser，而是一个 Python bytecode 符号解释器。运行时栈、本地变量、异常上下文、闭包和副作用都被建模到 `SymbolicState` 中；每个值由 `VariableTracker` 子类表示，例如 `TensorVariable` 持有指向 FX Graph 节点的 proxy 和 fake tensor metadata，`ListVariable`/`ConstDictVariable` 表示 Python 容器，`UserFunctionVariable` 支持内联用户函数。当解释器遇到 `BINARY_ADD` 一类指令时，如果两个输入是 tensor，就在 FX Graph 中插入 `aten.add` 节点；如果只是 Python 常量，就在符号状态中折叠；如果遇到无法安全建模的外部行为，就触发 graph break。

**Graph break：不是失败，而是混合执行协议**

传统图捕获系统常是 all-or-nothing，某个 Python 特性不支持就整段模型失败。TorchDynamo 选择把程序切成：

$$
P = P_{\text{python},0};\ C_{\text{graph},1};\ P_{\text{python},1};\ C_{\text{graph},2};\cdots
$$

其中 \(C_{\text{graph}}\) 是已编译 FX Graph，\(P_{\text{python}}\) 是原始或 continuation bytecode。遇到 graph break 时，Dynamo 会先编译当前已捕获的 partial graph，再生成 `resume_at_X(...livevars...)` 函数恢复栈、局部变量和异常状态，从原函数 bytecode 的中间位置继续执行。由于 continuation 本身也是普通 Python 函数，它再次进入 frame hook 后还能继续被 Dynamo 捕获。这是 TorchDynamo 覆盖真实模型的关键：它允许编译器吃掉大块 tensor 程序，同时把稀疏的 Python 动态行为留给 CPython。

**副作用处理：捕获 tensor 图但不丢 Python 语义**

Python 程序并不总是纯函数。模型代码可能修改全局变量、对象属性、list/dict、closure cell，甚至构造对象。Dynamo 在符号解释期间把这些 mutation 放进 side-effect log，而不是立刻执行；如果后续 bytecode 读取了一个待修改值，就从 pending side effect 中取值。生成输出 bytecode 时，Dynamo 会在 compiled graph 调用之后重放仍可被外部观察到的副作用，并丢弃不会逃逸的临时 mutation。直觉上，Dynamo 维护的是“tensor 计算进图，Python 可观察效果回到 Python bytecode”的分层语义。

**AOTAutograd 与 Inductor：从 FX Graph 到真实 kernel**

训练场景还需要处理 autograd。AOTAutograd 在 fake tensor 上运行 eager autograd，记录 forward/backward 的 joint graph，再用 min-cut 思路把 joint graph 分成前向和反向，同时决定哪些 activation 保存、哪些在 backward 中重算。可以把内存优化目标理解为：

$$
\min_{S\subseteq V}\ \mathrm{SaveBytes}(S)+\lambda\cdot\mathrm{RecomputeCost}(V\setminus S)
$$

其中 \(S\) 是前向阶段保存给反向使用的中间值集合。随后，decomposition 把复杂 PyTorch operator 改写成更小、更规则的 primitive operator，functionalization 把 mutation 改写为纯函数式形式，为后端降低语义复杂度。

TorchInductor 接手后，不直接把 FX Graph 映射到某个固定图 IR，而是降为 define-by-run 的 loop-level IR：一个 buffer 的计算体可以是 Python closure，输入是 SymPy 索引变量，内部调用 `ops.load`、`ops.mul`、`ops.reduction` 等虚拟 primitive。分析时把 `ops.*` 绑定到访存分析器；代码生成时绑定到 Triton/C++ printer；重写时还可用 FX tracing 重新获得闭包图。这个设计让 Inductor 能用 Python 表达复杂 lowering，同时保留符号尺寸和 stride 信息。

**调度与代码生成：为什么默认后端选择 Triton/C++**

Inductor scheduler 先把每个 buffer 变成调度节点，再根据 read/write set 和符号地址建立依赖。两个节点能否 fusion 由 `can_fuse` 判断，排序由 `score_fusion` 控制，典型评分会考虑 fusion 类型、节省的 memory traffic 和原图距离：

$$
\mathrm{score}(u,v)=w_1\cdot\mathrm{FusionKind}+w_2\cdot\mathrm{BytesSaved}(u,v)-w_3\cdot\mathrm{GraphDistance}(u,v)
$$

GPU 后端生成 Triton kernel，适合 pointwise、reduction、matmul/convolution template；CPU 后端生成 C++/OpenMP，并可使用 vectorized 或 non-vectorized 变体。Inductor 还生成 wrapper code 负责 tensor size 计算、内存分配、kernel 调用；在 `reduce-overhead` 模式下，满足条件时可用 CUDA Graphs 降低 launch overhead。

**动态 shape：特化路径但避免每个 shape 都重编译**

PyTorch 2 的动态 shape 支持仍然是“固定 rank + 符号维度”的路线。每个动态尺寸用 SymPy 符号表示，第一次编译时保留一个 concrete size hint；当代码对 shape 做条件判断时，Dynamo 用 hint 选择分支，并添加 shape guard。operator 的 meta function 负责不做真实计算也能推导输出 metadata，例如 `cat` 的输出长度可表达为 \(s_x+s_y\)。这样，编译器可以把中间 shape 条件化简为输入符号表达式：

$$
z=\mathrm{cat}(x,y),\quad z.\mathrm{size}(0)=x.\mathrm{size}(0)+y.\mathrm{size}(0)
$$

如果尺寸来自 `nonzero()` 或 `.item()` 这类数据依赖结果，就会产生没有 hint 的 unbacked symbolic integer；当程序对它做 Python 控制流时，Dynamo 不能提前判断分支，只能 graph break。这也是 TorchDynamo 的边界：它优先保持 Python 正确性，而不是强行把所有动态行为塞进图里。

> 💡 关键：TorchDynamo 的贡献不是“把 PyTorch 变成静态图框架”，而是在 CPython bytecode 层建立一套可回退、可缓存、可验证的 partial graph capture 协议；TorchInductor 的贡献是把这些 partial graph 变成可融合、可调度、可生成 Triton/C++ 的高性能 kernel。

#### 🧪 练习题

```yaml
question: "TorchDynamo 中 guard 的核心作用是什么？"
options:
  - "把所有 Python 控制流静态展开成一个完整计算图"
  - "检查本次运行是否仍满足上次编译依赖的动态假设，从而决定能否复用缓存编译产物"
  - "替代 TorchInductor 的 Triton 代码生成"
  - "在 GPU 上同步所有 kernel launch"
answer: 1
explain: "TorchDynamo 会根据 tensor metadata、Python 对象状态和全局状态生成 guard；guard 通过才说明旧的 FX Graph 和改写 bytecode 对当前输入仍然正确。"
```
