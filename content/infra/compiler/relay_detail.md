### Relay：深度学习高层函数式图IR

```yaml
id: relay
name: Relay
full_name: "深度学习高层函数式图IR (Relay: A High-Level Compiler for Deep Learning)"
year: 2019
org: UW / Apache TVM
paper_url: https://arxiv.org/abs/1904.08368
category: infrastructure
parent: tvm
motivation: "函数式静态类型图IR，支持一等函数、控制流与代数数据类型，实现复杂图优化与跨硬件类型推断"
```

#### 📝 一句话总结

Relay 提出了一种基于函数式编程的静态类型中间表示（IR），将深度学习计算图扩展为支持一等函数、递归控制流和代数数据类型的完整语言，在保持与传统框架持平或更优性能的同时，实现了对复杂模型（如 TreeLSTM）的表达、可组合优化 Pass 的设计，以及从 GPU 到 FPGA 加速器的跨硬件可移植代码生成。

#### 🎯 核心要点

- **函数式 IR 设计**：在计算图基础上引入 let 绑定（显式共享与作用域）、一等函数（高阶抽象与递归）、if 条件分支、代数数据类型 ADT（list/tree 等复杂结构），形成类 OCaml/SML 的严格函数式语言
- **类型系统与推断**：Tensor 类型携带形状信息；引入 Type Relation 机制处理算子间复杂形状约束（如广播语义）；基于 Hindley-Milner 的类型推断 + 约束求解器自动推导全图类型与形状
- **算子融合**：基于后支配树（post-dominator tree）识别可融合子图，提取为 primitive 函数后由 TVM 生成硬件特定的融合代码，支持非线性（菱形）数据流融合
- **通用量化框架**：三步流程 Annotate → Calibrate → Realize，通过程序重写规则将 FP32 模型转为 INT8/INT16，支持用户自定义量化策略与舍入方式
- **可组合优化 Pass**：融合、常量折叠、算子布局变换、公共子表达式消除等 Pass 可自由组合，效果因模型和硬件而异
- **跨硬件可移植性**：同一 IR 可编译到 CPU（x86/ARM）、GPU（NVIDIA）、FPGA 加速器，无需修改模型代码
- **评估覆盖广泛**：视觉（ResNet/MobileNet/VGG）+ NLP（CharRNN/TreeLSTM/GRU/LSTM），在推理性能上匹配或超越 TensorFlow、PyTorch、MxNet

#### 🔬 深入细节

![Relay IR 语法定义](https://arxiv.org/html/1904.08368v1/extracted/figures/relay_grammar.png)
*图：Relay 的核心语法定义，包括表达式（let/if/fn/match）、类型（Tensor/Function/ADT）和声明（类型定义与全局函数）。来源：论文 Figure 1*

```python
# Relay 算子融合伪代码
def fuse_ops(relay_expr):
    # Step 1: Extraction — 构建数据流 DAG 并计算后支配树
    dag = build_dataflow_dag(relay_expr)
    post_dom_tree = compute_post_dominator(dag)

    # 按后支配关系将算子分组为等价类
    groups = {}
    for node in dag.nodes:
        dominator = post_dom_tree.immediate_dominator(node)
        groups.setdefault(dominator, []).append(node)

    # Step 2: 为每个融合组构建 primitive 函数
    fused_funcs = []
    for dom, members in groups.items():
        body = build_fused_expr(members)
        free_vars = collect_free_variables(body)
        fn = Function(params=free_vars, body=body, is_primitive=True)
        fused_funcs.append(fn)

    # Step 3: Lowering — TVM 生成硬件特定代码
    for fn in fused_funcs:
        tvm_compute = collect_tvm_exprs(fn)        # 收集各算子的 TVM 计算描述
        fused_compute = combine(tvm_compute)         # 合并为聚合表达式
        schedule = select_master_schedule(fn)        # 选择主调度模板
        compiled_fn = tvm.build(fused_compute, schedule, target)
    return replace_with_compiled(relay_expr, fused_funcs)
```

**动机与背景：计算图 IR 的三重困境**

传统深度学习框架（TensorFlow、PyTorch、MxNet）的核心抽象是计算图——一个由算子节点和张量边组成的有向无环图。这种表示在早期 CNN 时代足够使用，但随着模型复杂度的爆炸式增长，计算图暴露出三个根本性缺陷：（1）**表达力不足**——缺乏词法作用域、一等函数和递归，无法自然表达 TreeLSTM、动态路由等依赖数据的控制流，框架不得不引入 `tf.while_loop`、`tf.cond` 等临时构造，这些构造对后续优化不透明；（2）**优化不可组合**——没有类型系统和作用域信息，活跃性分析、常量传播等经典编译优化难以精确实施，各优化 Pass 之间存在隐式耦合；（3）**可移植性差**——图级优化与底层代码生成紧密绑定，新增硬件后端需要大量重复工作。Relay 的核心洞察是：函数式编程语言的设计原则（不可变绑定、静态类型、高阶函数、模式匹配）恰好能系统性地解决这三个问题。

**核心机制：从计算图到函数式语言的四步扩展**

Relay 在计算图之上逐步引入四个语言特性，每一步都解决一个具体问题：

1. **Let 绑定**：`let x = e1 in e2` 引入词法作用域和显式共享。计算图中节点的多次引用是隐式的（通过边），这导致 TensorFlow 需要插入虚拟控制边来强制副作用顺序。Let 绑定使共享和求值顺序都变得显式，为活跃性分析和内存规划提供了精确的程序结构信息。

2. **一等函数与递归**：`fn(x, y) { body }` 加上命名递归。计算图本质上是一个从多输入到多输出的单一计算，缺乏函数抽象。一等函数使 Relay 能将 `tf.while_loop` 自然表达为尾递归函数（如论文 Figure 2 所示），将 `tf.cond` 表达为 if-else，极大简化了前端导入器的实现。

3. **代数数据类型（ADT）**：通过类型声明和模式匹配支持 list、tree 等递归数据结构。这使得 TreeLSTM 等在树结构上递归的模型可以直接在 IR 中表达，而非退化为固定展开的图。

4. **类型系统**：Relay 的类型系统是整个优化框架的基石。Tensor 类型 `Tensor[shape, dtype]` 携带静态形状信息，用于指导内存分配、循环优化和硬件张量化。对于算子间复杂的形状关系（如 `broadcast_add` 的输出形状依赖两个输入的广播规则），Relay 引入了 **Type Relation** 机制：每个算子注册一个用元语言实现的关系函数，类型检查器在每个调用点实例化并求解这些关系。整个推断过程基于 Hindley-Milner 算法扩展：先遍历 AST 生成类型变量和关系约束，再通过二部图依赖求解器迭代求解，最后标注每个子表达式的类型。

**优化流程：融合、量化与可组合 Pass**

Relay 的优化体系围绕两个旗舰优化展开：

- **算子融合**是性能提升的最大来源（GPU 上尤为显著）。Relay 的融合算法优于传统方法的关键在于：（a）基于后支配树而非简单的线性链匹配，能处理菱形数据流（一个输入被多条并行链消费后再合并）；（b）融合后由 TVM 重新调度，可进行循环内联、自动调优等进一步优化；（c）对任意新增算子自动生效，因为所有算子都有 TVM 计算描述。实验显示，融合在 GPU 上为 ResNet-18 带来约 2× 加速。

- **通用量化框架**采用三步编译器重写：Annotate 阶段在每个算子输入/输出插入模拟量化节点 `simQ`；Calibrate 阶段在真实数据上运行模型以确定 scale 和 range 参数；Realize 阶段将 `simQ` 展开为实际的 cast/shift/clip 操作，随后这些逐元素操作可被融合进原始算子，生成全新的量化算子。这种设计的优势在于量化策略完全由重写规则定义，用户可自由选择 signed/unsigned、floor/ceiling/stochastic rounding 等方案。在 Raspberry Pi 3 上，INT8/INT16 量化将 MobileNet 推理时间降低约 2×，精度损失仅 ~4%。

- **可组合 Pass**：实验（Figure 5）显示，逐步叠加融合 → 常量折叠 → 布局变换 → CSE 四个 Pass 可持续提升性能，但最优组合因模型和硬件而异——CPU 上布局变换最有效（改善缓存局部性），GPU 上融合最有效（减少 kernel launch 开销）。VGG-16 因主要由不可融合的背靠背卷积组成，对融合不敏感；而 ResNet/MobileNet 因残差连接中的逐元素加法而大幅受益。

**与传统方法的对比**

与 XLA、Glow、nGraph 等图编译器相比，Relay 的核心差异在于 IR 层面的表达力——这些系统使用受限的计算图 IR，无法表达递归控制流和高阶函数。与 TorchScript 相比，Relay 是静态类型的纯函数式 IR，可进行全程序静态分析，而 TorchScript 需要适应 Python 的动态语义，只能通过 profiling JIT 识别稳定 trace 后再交给底层编译器。与 MLIR 相比，MLIR 是构建 IR 方言的共享基础设施，而 Relay 是一个完整的端到端深度学习编译解决方案。Relay 的设计洞察可以指导 MLIR 方言的开发。

> 💡 **关键洞察**：Relay 证明了"零成本抽象"在深度学习编译器中是可行的——增加 IR 表达力（函数、控制流、ADT）不会损害已有模型的性能（Stroustrup 原则："你不用的东西，你不需要为之付出代价"），同时为复杂模型带来了显著的优化机会。

#### 🧪 练习题

```yaml
question: "Relay 的算子融合算法使用什么数据结构来识别可融合的子图？"
options:
  - "拓扑排序后的线性扫描"
  - "后支配树（Post-Dominator Tree）"
  - "最小生成树（Minimum Spanning Tree）"
  - "强连通分量（Strongly Connected Components）"
answer: 1
explain: "Relay 构建数据流 DAG 的后支配树，按直接后支配关系将算子分组为等价类，这使得它能融合菱形等非线性数据流模式，而非仅限于线性链。"
```