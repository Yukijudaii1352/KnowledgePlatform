### LLVM：底层虚拟机编译框架

```yaml
id: llvm
name: LLVM
full_name: 底层虚拟机编译框架 (Low Level Virtual Machine)
year: '2004'
org: UIUC
paper_url: https://ieeexplore.ieee.org/abstract/document/1281665/
category: infrastructure
parent: —
motivation: 提供硬件无关IR，实现编译器组件高度解耦复用
```

#### 📝 一句话总结

LLVM 提出了一套低层但保留类型、控制流和 SSA 数据流信息的通用 IR，以及围绕该 IR 组织的可复用编译器框架，解决了传统编译器前端、优化器、后端紧耦合且优化只能发生在单一阶段的问题。

#### 🎯 核心要点

- **统一中间表示**：LLVM IR 使用 SSA、无限虚拟寄存器、显式控制流图和简单类型系统，在接近机器码的同时保留跨阶段分析需要的信息
- **三种等价形态**：同一 IR 可在文本 `.ll`、二进制 bitcode `.bc`、内存对象三种形态间无损转换，方便持久化、调试和编译器内部变换
- **前端/优化器/后端解耦**：不同语言前端只需生成 LLVM IR，不同硬件后端只需消费 LLVM IR，将 \(N\) 种语言到 \(M\) 种硬件的工作量从 \(N \times M\) 降为 \(N + M\)
- **生命周期优化**：同一 IR 可在编译期、链接期、安装期、运行期和空闲期持续参与优化，支撑 LTO、JIT、PGO 和离线重优化
- **低层类型和地址模型**：通过 typed pointer、`getelementptr`、`invoke`/`unwind` 等机制暴露地址计算和异常控制流，同时避免绑定到特定源语言运行时
- **模块化 Pass 体系**：分析和变换以可组合 Pass 形式复用，既服务 Clang 这类静态编译器，也服务 JIT、DSL、分析工具和后续机器学习编译栈

#### 🔬 深入细节

![LLVM 三阶段编译架构](https://aosabook.org/static/llvm/LLVMCompiler1.png)
*图：LLVM 将多语言前端、共享优化器和多硬件后端通过 LLVM IR 连接起来，实现编译器组件复用。来源：Chris Lattner, The Architecture of Open Source Applications*

```python
# LLVM 生命周期优化伪代码
def llvm_pipeline(source_units, target):
    modules = []
    for unit in source_units:
        ast = frontend_parse_and_check(unit)
        ir = lower_to_llvm_ir(ast)              # typed SSA + CFG
        ir = run_pass_pipeline(ir, phase="compile")
        modules.append(ir)

    whole_program_ir = llvm_link(modules)
    whole_program_ir = run_pass_pipeline(whole_program_ir, phase="link")

    native_obj = codegen(whole_program_ir, target)
    executable = embed_bitcode(native_obj, whole_program_ir)

    while executable.runs_in_field():
        profile = collect_hot_paths(executable)
        if profile.has_stable_hotspots():
            hot_ir = recover_embedded_bitcode(executable)
            tuned_ir = run_profile_guided_passes(hot_ir, profile)
            executable = replace_hot_code(executable, codegen(tuned_ir, target))
    return executable
```

**动机与背景：传统编译器的复用边界太窄**

LLVM 论文的核心问题不是“再做一个后端”，而是重新定义编译器内部的公共契约。传统静态编译器通常把源语言前端、优化器和目标机器后端绑在一个大系统里，前端生成的内部结构不适合长期保存，后端又依赖大量机器细节。结果是，跨文件优化、跨语言优化、运行时重优化都很难共用同一套分析。JVM/CLI 虽然保存了 bytecode，但它们带有高级运行时和对象模型假设，不适合 C/C++ 这类需要透明本地运行时和手动内存控制的语言。LLVM 的判断是：公共 IR 必须足够低层，才能表达任意语言和目标；又必须比裸机器码多保留一些语义，才能让优化器看见类型、CFG、SSA def-use 等结构。

**核心机制：LLVM IR 是“低层虚拟 ISA”，不是普通 AST**

LLVM IR 的基本单位是 module、function、basic block 和 instruction。函数体被拆成基本块，基本块以 `br`、`ret`、`switch`、`invoke` 等 terminator 结束；普通值使用 SSA 名称，写成 `%x = add i32 %a, %b` 这类三地址形式。SSA 的关键约束可以理解为：

$$
\forall v,\ \text{def}(v)\ \text{dominates}\ \text{every use}(v)
$$

当多个控制流路径汇合时，IR 使用 \(\phi\) 节点选择来自不同前驱块的值：

$$
x = \phi(x_{\text{then}}, x_{\text{else}})
$$

这让数据流依赖变得显式，公共子表达式消除、死代码删除、循环不变量外提等 Pass 可以直接基于 def-use 链工作，而不需要反复从机器寄存器或栈槽里恢复变量关系。

**地址计算与类型系统：低层但不丢掉分析线索**

LLVM IR 的类型系统不是为了做 Java 式安全验证，而是为了帮助优化器理解数据布局和操作意图。典型例子是 `getelementptr`，它表达“从某个聚合对象的基址出发，按类型布局走到某个字段或数组元素”，不是简单整数加法。可把它抽象为：

$$
\text{addr} = \text{base} + \sum_i \text{index}_i \cdot \text{sizeof}(\text{element}_i)
$$

因为索引路径仍带有类型和聚合结构信息，别名分析、边界推断和标量替换能比处理裸地址常量更精确。异常处理也类似：`invoke` 显式区分正常返回边和异常边，使 C++/setjmp 等控制流不会在优化器视角里退化成不可见的运行时黑盒。

**生命周期优化：把 IR 留到链接后和运行后**

LLVM 的系统架构把 bitcode 当作可持久化程序表示，而不是前端到后端之间的临时文件。编译期可先在单个 translation unit 上优化；链接期把多个 module 合并后做 interprocedural optimization，例如跨文件内联、全局常量传播和 whole-program 死代码删除；安装期或首次运行时可按本机 CPU 重新选择指令；运行期和空闲期可用用户真实 profile 重新优化热点。这个模型把 profile-guided optimization 从“开发者构造代表性输入”改成“收集终端用户运行行为”，也让 JIT 和静态编译共享 IR、分析和后端设施。

**与传统方法的区别**

和 GCC 早期内部表示相比，LLVM IR 是第一类语言：文本、bitcode、内存对象三种形态语义一致，工具链可以用 `llvm-as`、`llvm-dis`、`opt`、`llc` 等组件拼装出不同编译流程。和 JVM/CLI 相比，LLVM 不规定垃圾回收、对象模型、异常语义或类型安全策略，因此 C、C++、Rust、Swift、Julia、OpenCL、Halide 等语言都能把自己的运行时策略降到同一低层 IR。它的影响也正来自这种边界选择：IR 足够低，能落到真实机器；IR 又足够结构化，能让优化器长期复用。

> 💡 **关键**：LLVM 真正的发明点是把“中间表示”提升为稳定基础设施。前端、优化器、后端、链接器、JIT 和分析工具都围绕同一 IR 协作，编译器因此从单体程序变成可组合平台。

#### 🧪 练习题

```yaml
question: "LLVM IR 为什么能显著降低多语言、多硬件编译器的实现复杂度？"
options:
  - "因为 LLVM IR 保留完整源语言 AST，后端可以直接生成源语言对象模型"
  - "因为所有语言前端和硬件后端都以同一低层 SSA IR 为边界，优化器可以在中间复用"
  - "因为 LLVM 只支持 C/C++，因此减少了语言兼容问题"
  - "因为 LLVM 把所有优化都推迟到运行时 JIT，静态编译不再需要优化器"
answer: 1
explain: "LLVM 的核心边界是统一、低层、SSA 形式的 IR。前端生成 IR，优化器变换 IR，后端消费 IR，使语言和硬件两侧可以独立扩展。"
```
