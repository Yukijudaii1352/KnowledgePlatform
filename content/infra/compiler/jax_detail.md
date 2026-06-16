### JAX — 可组合函数变换加速框架

```yaml
id: jax
name: JAX
full_name: 可组合函数变换加速框架 (JAX)
year: '2018'
org: Google
paper_url: https://github.com/google/jax
category: graph_compilers
parent: xla
motivation: 函数式变换统一自动微分与JIT编译，极简接口极致性能
```

#### 📝 一句话总结

JAX 把 NumPy 风格 Python 函数提升为可组合程序变换对象，通过 `grad`、`jit`、`vmap`、`pmap` 等函数变换和 tracing 到 jaxpr/XLA 的编译路径，同时获得自动微分、向量化、JIT 编译和多设备加速能力。

#### 🎯 核心要点

- **NumPy-compatible 前端**：用户以 `jax.numpy` 写数组程序，保留 Python 研究体验，同时把可加速子程序交给 JAX tracing
- **可组合函数变换**：`grad` 做自动微分，`jit` 做 XLA 编译，`vmap` 做自动批量化，`pmap`/后续并行 API 做多设备 SPMD 映射
- **高层 tracing**：运行一次 Python 函数，用抽象值记录数组级 primitive，而不是解释 Python VM 指令
- **jaxpr IR**：JAX 内部 IR 是显式类型、函数式、一阶、ANF 形式，适合被不同 transform interpreter 重写或解释
- **XLA 后端**：`jit` 将 trace/jaxpr lowering 到 XLA HLO/StableHLO，再由 XLA 做 fusion、layout、buffer 和目标代码生成
- **Autograd 继承**：早期 JAX 构建在 Autograd tracing 机制上，支持 forward/reverse mode，并可组合出高阶导数
- **静态约束**：JIT 缓存按 dtype、shape、tuple/tree 结构等 monomorphic signature 专门化；新 shape/dtype 可能触发重新编译
- **纯函数倾向**：为了让 transform 可组合，JAX 鼓励不可变数组、显式 PRNG key、显式控制流 primitive 和 PyTree 参数结构

#### 🔬 深入细节

![JAX tracing 与 XLA 编译流程](https://quickchart.io/graphviz?format=svg&graph=digraph%20G%20%7B%0A%20%20rankdir%3DTB%3B%0A%20%20graph%20%5Bbgcolor%3D%22transparent%22%2C%20pad%3D%220.2%22%2C%20nodesep%3D%220.45%22%2C%20ranksep%3D%220.55%22%5D%3B%0A%20%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fontname%3D%22Arial%22%2C%20fontsize%3D12%2C%20color%3D%22%235b6472%22%2C%20fillcolor%3D%22%23f8fafc%22%5D%3B%0A%20%20edge%20%5Bcolor%3D%22%23475569%22%2C%20arrowsize%3D0.7%5D%3B%0A%20%20py%20%5Blabel%3D%22Pure%20Python%20%2B%20NumPy%20function%22%5D%3B%0A%20%20trans%20%5Blabel%3D%22Composable%20transforms%0A%20grad%20%2F%20vmap%20%2F%20jit%20%2F%20pmap%22%5D%3B%0A%20%20trace%20%5Blabel%3D%22Tracing%20with%20abstract%20values%22%5D%3B%0A%20%20jaxpr%20%5Blabel%3D%22jaxpr%0A%20typed%20functional%20ANF%20IR%22%2C%20fillcolor%3D%22%23e0f2fe%22%5D%3B%0A%20%20lower%20%5Blabel%3D%22Lowering%20to%20StableHLO%20%2F%20XLA%20HLO%22%2C%20fillcolor%3D%22%23fef3c7%22%5D%3B%0A%20%20xla%20%5Blabel%3D%22XLA%20compile%3A%20fusion%2C%20layout%2C%20codegen%22%5D%3B%0A%20%20dev%20%5Blabel%3D%22CPU%20%2F%20GPU%20%2F%20TPU%20executable%22%2C%20fillcolor%3D%22%23dcfce7%22%5D%3B%0A%20%20py%20-%3E%20trans%20-%3E%20trace%20-%3E%20jaxpr%20-%3E%20lower%20-%3E%20xla%20-%3E%20dev%3B%0A%7D)
*图：基于 SysML 2018 论文、JAX README 和官方 jaxpr 文档整理的 JAX 核心流程：Python 函数经可组合变换 tracing 成 jaxpr，再 lowering 到 XLA 执行。*

```python
# JAX transform 与 JIT 编译路径伪代码
def jax_jit_transform(f):
    cache = {}

    def wrapped(*args):
        # 1. 抽象化实参，只保留 dtype/shape/tree structure 等编译相关信息
        avals = abstractify(args)  # e.g. ShapedArray(float32[1024, 1024])
        signature = monomorphic_signature(avals)

        # 2. 缓存 miss 时执行一次 Python，收集 primitive trace
        if signature not in cache:
            jaxpr = trace_to_jaxpr(f, avals)
            stablehlo = lower_jaxpr_to_stablehlo(jaxpr)
            executable = xla_compile(stablehlo)
            cache[signature] = executable

        # 3. 缓存 hit 时直接调用已编译 executable
        return cache[signature].run(*args)

    return wrapped

def training_step(params, batch):
    def loss_fn(p, example):
        pred = model(p, example.x)
        return ((pred - example.y) ** 2).sum()

    # grad 生成梯度函数，vmap 自动批量化，jit 编译整个 batch 梯度
    per_example_grad = jax.vmap(jax.grad(loss_fn), in_axes=(None, 0))
    grads = per_example_grad(params, batch).mean(axis=0)
    return tree_map(lambda w, g: w - lr * g, params, grads)

compiled_step = jax.jit(training_step)
```

**动机与背景：动态 Python 与加速器静态需求的张力**

SysML 2018 论文把 JAX 的切入点概括为 high-level tracing JIT：研究者希望用 Python/NumPy/Autograd 这种灵活写法表达模型，但 GPU/TPU 编译器需要静态 shape、dtype、数据依赖和可融合的大块计算。论文观察到许多 ML 程序由“动态 Python orchestration + 大块纯函数式数组子程序”组成；后者被称为 pure-and-statically-composed (PSC) subroutine，可以剥离 Python 动态性并编译到加速器。JAX 的策略不是替换 Python，而是让用户用 `jit` 标记可加速函数，让 Python 执行一次并被 tracer 记录成静态数组级 IR。

**jaxpr：让变换可组合的内部语言**

JAX 官方文档定义 jaxpr 为显式类型、函数式、一阶、ANF 形式的内部 IR。一个 jaxpr 形如：

```text
{ lambda a:f32[batch, dim] b:f32[dim, out].
  let c:f32[batch, out] = dot_general a b
      d:f32[batch, out] = tanh c
  in (d,) }
```

它的关键不在语法，而在“有限 primitive + 显式数据依赖”。Python 函数中的 `jnp.dot`、`jnp.tanh`、切片、reduce、控制流 primitive 会被记录为 jaxpr equation；闭包常量被 hoist 成 constvars；输入和输出带 abstract value。这样 `grad` 可以把原 jaxpr 解释成求导 jaxpr，`vmap` 可以把 primitive 替换成 batched 版本，`jit` 可以把 jaxpr lowering 到 XLA。换句话说，JAX 的 transform 是对同一小语言的不同解释器。

**自动微分：JVP/VJP 是一等变换**

JAX 继承 Autograd 的可组合微分思想，但把它与 XLA staging 结合。前向模式计算 Jacobian-vector product：

$$
\operatorname{JVP}(f, x, v)
= \left.\frac{d}{d\epsilon} f(x + \epsilon v)\right|_{\epsilon=0}
= J_f(x)v
$$

反向模式计算 vector-Jacobian product：

$$
\operatorname{VJP}(f, x, \bar{y}) = \bar{y}^{\top} J_f(x)
$$

`grad(f)` 本质上是对标量输出函数构造 VJP，再取对输入的 cotangent。因为 JAX transform 作用于函数而不是某个全局 tape，`jit(grad(f))`、`grad(jit(f))`、`vmap(grad(f))` 都有明确含义。实际性能差异取决于 transform 顺序：通常把 `jit` 放在较外层可以让 XLA 看见更大的融合范围。

**JIT 与 XLA：trace cache、lowering 和 fusion**

`jax.jit` 会按 monomorphic signature 缓存编译结果。这个签名包含 PyTree 结构、dtype、rank、shape 以及部分 static argument；当新 shape 或 dtype 出现时，JAX 可能重新 tracing 和编译：

$$
\operatorname{signature}(x)
= \left(\operatorname{tree}(x), \operatorname{dtype}(x), \operatorname{shape}(x), \operatorname{static\_args}\right)
$$

cache miss 时，JAX 用 abstract values 执行一次 Python 函数，得到 jaxpr；随后 lowering 到 StableHLO/XLA HLO，XLA 再做 algebraic simplification、operation fusion、layout assignment、buffer assignment 和目标代码生成。对表达式 \(y=\operatorname{selu}(Wx+b)\) 这类图，XLA 可把多个 elementwise op 融合到矩阵乘后续 kernel，减少内存读写和 kernel launch。

> 💡 关键：JAX 的性能来自“尽量保留 Python 作为元语言，同时把纯数组子程序 staged out”。它不是解释每一行 Python，而是用 Python 执行一次来生成可编译 IR。

**vmap/pmap：批量化和多设备并行作为函数变换**

`vmap` 的语义可以写成：

$$
\operatorname{vmap}(f)(X)_i = f(X_i)
$$

但实现上不是 Python for-loop，而是为每个 primitive 定义 batching rule，把标量/单样本 jaxpr 转换为带 batch 维的 jaxpr。例如 `dot(x, w)` 在 batch 维上会变成 batched `dot_general`。`pmap` 的思想类似，但把 batch axis 切到多个设备，并为 `psum` 等 collective primitive 生成跨设备通信。后来的 JAX 生态继续发展出 `pjit`、`shard_map`、GSPMD 等更强的显式 sharding 能力，但 2018 年的核心洞察已经成立：并行化不是外部 runtime 选项，而是对函数的可组合变换。

**约束与区别：为什么 JAX 鼓励函数式风格**

JAX 不是“任意 Python 都能无痛编译”。如果 Python 控制流依赖运行时数组值，普通 `if`/`while` 会在 tracing 阶段失去静态性，用户需要 `lax.cond`、`lax.while_loop`、`lax.scan` 等 primitive；数组更新使用 `.at[...]` 这种函数式更新；随机数通过显式 PRNG key 传递，避免隐藏全局状态。这些约束换来的是 transform composability。与 TensorFlow 1.x 静态图相比，JAX 保留 Python 函数作为主要接口；与 PyTorch eager 相比，JAX 更早把“函数变换 + 编译 IR”放在中心，使自动微分、批量化和编译统一在同一个 jaxpr 机制上。

#### 🧪 练习题

```yaml
question: "JAX 中 jaxpr 的主要作用是什么？"
options:
  - "保存 Python 源码字符串，供解释器逐行执行"
  - "作为显式类型、函数式的一阶 IR，让 grad、vmap、jit 等变换可以解释或重写同一计算"
  - "替代 XLA 的后端代码生成器，直接输出 GPU 汇编"
  - "记录所有运行时副作用，以便反向传播恢复全局状态"
answer: 1
explain: "jaxpr 把 Python+NumPy 函数 trace 成小而静态的 primitive 程序，JAX 的自动微分、批量化和 JIT 编译都围绕这个 IR 组合。"
```
