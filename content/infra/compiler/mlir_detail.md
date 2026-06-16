### MLIR：多层中间表示编译基础设施

```yaml
id: mlir
name: MLIR
full_name: 多层中间表示编译基础设施 (Multi-Level Intermediate Representation)
year: '2020'
org: Google
paper_url: https://ieeexplore.ieee.org/abstract/document/9370308/
category: infrastructure
parent: llvm
motivation: Dialect元框架解决IR碎片化，实现优化Pass高度复用
```

#### 📝 一句话总结

MLIR 提出了一套可扩展的 SSA 中间表示基础设施，用 Operation、Region、Block、Attribute、Type 和 Dialect 统一表达从高层数据流图到低层 LLVM IR 的多级抽象，解决了机器学习与异构编译栈中 IR 重复建设、Pass 难复用、降级路径割裂的问题。

#### 🎯 核心要点

- **最小内核 + 全面可扩展**：MLIR 固定的核心概念很少，几乎所有语义都由用户定义的 Op、Type、Attribute 和 Dialect 承载
- **Dialect 方言机制**：每个 Dialect 以命名空间组织一组 Op/Type/Attribute，不同 Dialect 可以在同一模块中混合存在，支持逐步降级
- **Operation 作为唯一语义单元**：从指令、循环、函数到模块都建模为 Operation，Operation 可包含嵌套 Region，Region 中包含 SSA Block
- **Region 和 Block Argument**：用嵌套 Region 表达循环、函数、控制流、闭包和并行结构，用 Block Argument 替代 LLVM 风格的 PHI 节点
- **ODS 声明式定义**：通过 TableGen 的 Operation Definition Specification 定义 Op 的操作数、结果、Trait、Verifier 和文档
- **DRR 声明式重写**：用 Declarative Rewrite Rule 描述 Op 到 Op 的等价重写，服务于规范化、优化和 Dialect Conversion
- **Progressive Lowering**：允许高层 Dialect 和低层 Dialect 共存，把复杂编译过程拆成多段小降级，而不是一次性丢失高层语义
- **Affine/Vector/LLVM 等标准方言**：内置或配套方言覆盖多面体循环优化、向量化、LLVM IR 映射等关键降级阶段
- **工程基础设施复用**：统一提供 parser/printer、验证器、Pass Manager、并行编译、源位置追踪和 round-trip 文本 IR

#### 🔬 深入细节

![MLIR 分层代码生成流程](https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png)
*图：MLIR/Linalg 官方文档中的分层代码生成视图，展示从高层 OpGraph 到 Linalg、Affine/Stripe、Vector、LLVM 等低层方言的逐步降级。*

```python
# MLIR progressive lowering 的核心流程伪代码
def compile_with_mlir(module, target):
    module = import_frontend_program(module)
    verify(module)

    while not target.is_legal(module):
        for op in module.walk_preorder():
            if can_canonicalize(op):
                rewrite_to_canonical_form(op)
            elif has_dialect_conversion(op, target):
                # 只降低当前已经准备好的 Op，其它部分可继续保持高层 Dialect
                replace_op_with_lower_level_ops(op)
            elif can_fold_constants(op):
                fold(op)

        run_passes(module, [
            "canonicalize",
            "cse",
            "shape-inference",
            "bufferize-or-materialize-if-needed",
        ])
        verify(module)

    return emit_target_binary_or_ir(module, target)
```

**动机与背景：为什么 LLVM 还不够**

LLVM 成功统一了很多传统语言的后端，但它的 IR 大致处在“接近 C 加向量”的抽象层级。现代编译栈的问题不在于缺少一个后端 IR，而在于高层语义太多：TensorFlow Graph、XLA HLO、TPU IR、TensorRT、TFLite、Core ML、NNAPI 等系统各有图表示、优化器和运行时接口。每个项目都重复实现 parser、verifier、pass pipeline、诊断、调试和 lowering 基础设施，但这些 IR 又难以共享优化。MLIR 的核心判断是：与其要求所有系统都过早降到 LLVM IR，不如提供一个可定义多层 IR 的元框架，让领域专用 IR 能共享同一套编译器工程基础设施。

**核心对象模型：Operation 是唯一语义单元**

MLIR 把 IR 抽象成一个递归结构：

$$
\text{Op} = (\text{name}, \text{operands}, \text{results}, \text{attributes}, \text{regions}, \text{location})
$$

其中 `name` 通常带有 Dialect 前缀，如 `affine.for`、`linalg.generic`、`llvm.call`。Op 消费和产生 SSA value，Attribute 保存编译期静态信息，Region 提供嵌套结构，Location 记录源位置或变换轨迹。这个设计的关键是“函数、循环、模块、指令都只是 Op”：`func.func` 是带 Region 的函数 Op，`affine.for` 是带循环体 Region 的循环 Op，`module` 是带符号表的顶层 Op。这样一来，Pass Manager 不必固定在 module/function/loop 三类粒度上，而可以在任意 Op 层级运行。

**Region、Block 与 SSA：保留结构而不是过早线性化**

传统 LLVM IR 用基本块和 PHI 节点表达控制流，适合低层优化，但会丢掉很多高层结构。MLIR 的 Region 是嵌套在 Op 内的 CFG，Block 以参数承接前驱传入的值，而不是用 PHI 节点集中合流。对循环来说，`affine.for` 的 entry block argument 就是 induction variable；对函数来说，函数参数就是 entry block argument。这个机制允许 MLIR 同时表达结构化循环、非结构化 CFG、闭包、异步执行和图区域。更重要的是，带有 `isolated-from-above` 属性的 Op 会形成作用域边界，使 use-def 链不能跨越边界，编译器可以并行处理这些区域。

**Dialect：用命名空间管理抽象层，而不是制造一个巨型 IR**

Dialect 本身不强加语义，而是把一组相关 Op、Type、Attribute 和接口组织到唯一命名空间下。机器学习前端可以有 TensorFlow/TOSA/MHLO 方言，结构化张量计算可以降到 Linalg，循环与多面体分析可以使用 Affine，向量抽象可以进入 Vector，最终再降到 LLVM Dialect。关键机制是混合方言：同一个函数里可以一部分已经是 `affine.load`，另一部分仍是 `linalg.matmul` 或高层 tensor op。用集合表示，某一阶段的 IR 合法性不是全局一次性替换，而是逐步扩大低层合法集合：

$$
Legal_{t+1} = Legal_t \cup Convert(D_{\text{high}} \rightarrow D_{\text{low}})
$$

这避免了传统两阶段编译的常见问题：一旦降得太低，就必须从低层 IR 里“反推”循环、张量形状、数据布局等高层事实。MLIR 的原则是高层信息只在不再需要时才丢弃。

**声明式基础设施：ODS、DRR、Verifier 和可测试文本 IR**

MLIR 的工程贡献不只是 IR 语法，而是降低新 IR 的建设成本。ODS 用 TableGen 声明 Op 的输入输出、类型约束、Trait、summary 和 verifier，例如 `NoSideEffect`、`SameOperandsAndResultType` 可直接供优化器使用；DRR 用图重写规则表达一个 Op DAG 到另一个 Op DAG 的等价转换，可生成 C++ pattern；Verifier 先检查通用 SSA、dominance、symbol、terminator 等结构性约束，再检查每个 Op 自己的语义约束。文本 IR 可 round-trip，意味着单个 Pass 的输入输出都能用文本文件测试，极大降低了调试和回归测试成本。

**与传统编译方法的区别**

与 LLVM 相比，MLIR 不是替代 LLVM 后端，而是在 LLVM 之上补齐“多层中间表示基础设施”。与 XLA/TVM/Glow 这类深度学习编译器相比，MLIR 的目标不是只服务某一类模型或某一套后端，而是让不同领域构建自己的 Dialect 并共享基础设施。与经典多面体编译器相比，MLIR 的 Affine Dialect 把 affine map、integer set、memref layout、structured loop 作为 IR 的一部分，既能做精确依赖分析，又保留常规 SSA 操作，避免完全升降到外部 polyhedral representation 带来的表示鸿沟。

> 💡 关键：MLIR 的创新不是“又发明一个 IR”，而是把“发明领域专用 IR”本身工程化、声明式化、可组合化，让每个抽象层都能在合适的时机保留、优化或降级。

#### 🧪 练习题

```yaml
question: "MLIR 的 Dialect 机制主要解决什么问题？"
options:
  - "把所有语言强制转换成一个固定的低层指令集"
  - "让不同抽象层的 Op、Type、Attribute 可在统一基础设施中定义、混合和逐步降级"
  - "替代 LLVM 后端的寄存器分配与指令选择"
  - "只为 TensorFlow Graph 提供一种专用图格式"
answer: 1
explain: "Dialect 是 MLIR 的扩展单元，它允许不同抽象层和领域的 IR 在同一模块中共存，并通过 Dialect Conversion 逐步降低到目标后端。"
```
