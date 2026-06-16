### MLIR

```yaml
id: mlir
name: MLIR
full_name: 多层级中间表示 (Multi-Level Intermediate Representation)
year: '2021'
org: Google
paper_url: —
category: hw_sw_codesign
parent: tvm
motivation: 统一多层级IR框架成为现代AI编译器基础
```

#### 📝 一句话总结

MLIR 提出了可扩展的多层级 SSA 中间表示基础设施，用 Dialect、Operation、Region、Block、Type 和 Attribute 统一表达从高层图计算到低层 LLVM/SPIR-V 的不同抽象层。它解决了 AI 编译器和异构硬件编译栈中 IR 碎片化、pass 难复用和过早降级丢失语义的问题。

#### 🎯 核心要点

- 以极小核心 IR + 可扩展 Dialect 机制组织领域专用操作、类型和属性
- Operation 是唯一通用语义单元，函数、模块、循环、张量算子和低层指令都可建模为 Op
- Region/Block 支持嵌套作用域、结构化控制流和函数式 SSA block argument，避免传统 PHI 节点复杂性
- Dialect 可在同一 module 中混合存在，支持 progressive lowering 和分阶段优化
- ODS 用 TableGen 声明 Op 结构、约束、trait、verifier 和文档，降低新 IR 建设成本
- DRR/Pattern Rewriter 用声明式或 C++ pattern 描述等价重写、规范化和 Dialect Conversion
- Linalg、Affine、SCF、Vector、MemRef、LLVM、SPIR-V 等方言构成面向 AI/异构硬件的降级路径
- 统一复用 parser/printer、验证器、Pass Manager、诊断、源位置追踪和文本 IR 测试基础设施

#### 🔬 深入细节

##### 核心示意图

![MLIR Linalg 分层代码生成流程](https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png)
*图：MLIR 官方 Linalg 文档引用的 Codegen Flow。它展示 OpGraph、TSOWB、CGSel、HHO/Linalg、Affine/Stripe、Vector 和 LLVM 等层级如何逐步降低。*

##### 降级流程伪代码

```python
# MLIR progressive lowering 的简化编译流程
def compile_with_mlir(module, target):
    module = import_frontend_as_dialects(module)  # tf / torch / mhlo / tosa / custom dialect
    verify(module)

    pipeline = [
        "canonicalize",
        "shape-inference",
        "convert-tensor-to-linalg",
        "tile-and-fuse-linalg",
        "bufferize",
        "lower-linalg-to-scf-or-affine",
        "vectorize",
        "convert-vector-to-llvm-or-spirv",
        "finalize-target-abi",
    ]

    for pass_name in pipeline:
        module = run_pass(module, pass_name)
        # 高层和低层 dialect 可以共存；每一轮只降低已合法匹配的部分。
        verify(module)

    assert target.is_legal(module)
    return emit_binary_or_target_ir(module, target)
```

##### 方法机制解读

LLVM IR 已经很好地服务了传统语言后端，但它的抽象层级偏低，难以保留张量形状、layout、结构化循环、数据流图、异步执行、量化属性和硬件特定 tile 语义。AI 编译器如果过早降到 LLVM IR，就必须从低层指令和 pointer arithmetic 里重新恢复高层信息；如果每个项目都自定义图 IR，又会重复实现 parser、verifier、pass pipeline、诊断、测试和降级基础设施。MLIR 的判断是：真正需要统一的不是某一个固定 IR，而是“定义 IR、混合 IR、验证 IR、逐步降级 IR”的基础设施。

MLIR 的核心对象可以抽象为：

$$
\operatorname{Op}=(name,\ operands,\ results,\ attributes,\ regions,\ location)
$$

`name` 通常带 Dialect 前缀，例如 `linalg.matmul`、`affine.for`、`vector.transfer_read`、`llvm.call`。Operands/results 是 SSA value，attributes 保存编译期常量元信息，regions 嵌套 block 列表，location 记录源位置或变换轨迹。函数、模块、循环和指令都只是不同 trait/interface 约束下的 Operation，因此 Pass Manager 可以在任意 Op 层级运行，而不是被固定在 module/function/loop 三个传统粒度上。

Dialect 是 MLIR 的扩展单元。TensorFlow、TOSA、MHLO 可以保留框架语义；Linalg 表达结构化张量计算；Affine/SCF 表达循环与控制流；Vector 表达向量抽象；LLVM/SPIR-V/NVGPU 等方言接近目标后端。关键是这些方言可以在一个 module 中同时出现，例如一个函数里部分 op 已降到 `scf.for` 和 `vector.contract`，另一部分仍保持 `linalg.generic`。这使合法 IR 集合随 pass 逐步扩张：

$$
\mathcal{L}_{t+1}=\mathcal{L}_t\cup \operatorname{Convert}(D_{\text{high}}\rightarrow D_{\text{low}})
$$

只要当前 IR 满足 verifier，就不要求一次性从高层图 IR 降到低层指令。高层语义会在仍有优化价值时保留，只有当后续 pass 不再需要时才被物化为循环、buffer、vector 或目标 ABI。

Region 和 block argument 是 MLIR 保留结构的另一项关键机制。传统 LLVM PHI 节点会把控制流合流值放在基本块开头，带来 dominance、异常边和多前驱块维护复杂度；MLIR 用 block argument 表示从前驱传入的 SSA 值。`scf.for` 的 induction variable、函数参数、region 内部闭包式捕获都可以以统一方式表达。配合 `isolated-from-above` trait，某些 op 能形成并行可处理的作用域边界，方便大模型图和多函数 module 的并行编译。

工程层面，ODS 和 DRR 让“新增一个 IR 层”从手写大量 C++ 降低为声明式定义。ODS 描述操作数、结果、属性、类型约束和 trait，自动生成 parser/printer、builder、verifier 框架和文档；DRR/PatternRewriter 描述 `source op DAG -> target op DAG` 的等价重写。这样，通用 pass 可以通过 trait/interface 查询性质，例如是否无副作用、是否有内存读写、是否支持 tiling 或 bufferization，而不需要认识每个具体 op 名称。

与 TVM 的 Tensor Expression/Schedule 思路相比，MLIR 更像承载多套编译器的“元基础设施”：TVM 重点解决张量算子如何自动调度到硬件，MLIR 重点解决不同抽象层的 IR 如何共存、转换和复用 pass。现代 AI 编译器常把二者思想结合起来：上层保留图和张量语义，中层做 Linalg/Transform/Affine/Vector 变换，底层再降到 LLVM、SPIR-V、ROCDL、NVVM 或专用加速器指令。

> 💡 关键：MLIR 的贡献不是又定义了一种单一中间语言，而是把多层 IR 的创建、混合、验证、重写和降级变成可复用的编译器工程平台。

#### 🧪 练习题

```yaml
question: "MLIR 的 Dialect 机制最主要解决什么问题？"
options:
  - "让不同抽象层和领域的 Op/Type/Attribute 能在统一基础设施中定义、混合并逐步降级"
  - "把所有程序强制转换成一种固定低层指令格式后再优化"
  - "替代所有硬件后端的寄存器分配和指令选择"
  - "只为 TensorFlow Graph 提供不可扩展的专用文本格式"
answer: 0
explain: "Dialect 是 MLIR 的扩展与命名空间机制，允许高层图 IR、中层结构化计算 IR 和低层目标 IR 共存，并通过 Dialect Conversion 渐进降级。"
```
