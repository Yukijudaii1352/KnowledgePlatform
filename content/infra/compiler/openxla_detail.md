### OpenXLA：开放跨框架XLA编译生态

```yaml
id: openxla
name: OpenXLA
full_name: 开放跨框架XLA编译生态 (OpenXLA)
year: '2023'
org: Google
paper_url: https://github.com/openxla/xla
category: infrastructure
parent: xla
motivation: StableHLO解耦XLA为跨框架行业标准编译后端
```

#### 📝 一句话总结

OpenXLA 把原本主要服务 TensorFlow/JAX 的 XLA 编译器开放为跨框架、跨硬件的 ML 编译生态，并以 StableHLO 作为版本化高层操作集和可移植层，解决前端框架、编译器后端和硬件厂商之间缺少稳定 IR 契约的问题。

#### 🎯 核心要点

- **StableHLO 作为前端/后端契约**：TensorFlow、JAX、PyTorch 等前端导出 StableHLO，XLA、IREE 等编译器消费 StableHLO
- **版本化 HLO 操作集**：StableHLO 定义高层 ML op、类型、属性、约束和执行语义，目标是让不同 release 之间具备可验证的兼容性
- **解耦内部 HLO 演进**：XLA 内部 HLO 可以继续快速变化，StableHLO 则承担稳定序列化、交换和长期可移植职责
- **模块化 XLA pipeline**：StableHLO 先转入 XLA HLO，随后经过目标无关优化、后端相关 HLO 优化、调度、buffer assignment 和代码生成
- **跨框架生态入口**：OpenXLA 让模型框架不再直接绑定某个硬件后端，也让硬件厂商可以优先实现 StableHLO/XLA 兼容路径
- **后端可插拔目标**：XLA 官方文档强调后端模块化，CPU/GPU 后端使用 LLVM，其他硬件可以接入自己的 HLO 优化和 codegen
- **内存与融合仍是核心收益**：XLA 继续通过 fusion、CSE、buffer analysis、layout assignment、schedule 和 rematerialization 降低 kernel launch 与中间张量内存开销
- **PJRT 连接运行时**：编译后的 platform-specific executable 可由 PJRT 等运行时抽象封装，向上屏蔽设备差异

#### 🔬 深入细节

![StableHLO 跨框架生态图](https://openxla.org/static/stablehlo/images/assets/stablehlo_ecosystem.svg)
*图：OpenXLA 官方 StableHLO 生态图，展示 StableHLO 位于 ML 框架和 ML 编译器之间，承担跨框架、跨编译器的可移植层。*

```python
# OpenXLA 编译与部署契约伪代码
def compile_with_openxla(model, frontend, target):
    # 1. 前端只需要导出一个稳定契约，而不是绑定某个 XLA 内部版本
    stablehlo = frontend.export_stablehlo(model)
    verify_against_stablehlo_spec(stablehlo)

    # 2. StableHLO 是交换格式；XLA 内部仍可转成自己的 HLO 做激进优化
    hlo = legalize_stablehlo_to_xla_hlo(stablehlo)
    hlo = run_target_independent_passes(hlo, [
        "cse",
        "algebraic-simplifier",
        "constant-folding",
        "target-independent-fusion",
        "buffer-analysis",
    ])

    # 3. 后端接管硬件相关决策
    hlo = target.backend.optimize_hlo(hlo, [
        "spmd-or-sharding",
        "layout-assignment",
        "library-rewrite",
        "priority-fusion",
        "copy-insertion",
    ])

    schedule = choose_hlo_schedule(hlo, objective="minimize_peak_memory")
    buffers = assign_buffers(hlo, schedule)
    executable = target.backend.codegen(hlo, schedule, buffers)
    return pjrt_wrap(executable)
```

**动机：XLA 需要从单一框架后端变成行业接口**

早期 XLA 的主要价值是把 TensorFlow 或 JAX 程序编译成高性能 CPU/GPU/TPU 可执行文件。随着 PyTorch/XLA、IREE、JAX、TensorFlow 以及硬件厂商共同进入同一生态，一个问题变得突出：如果每个前端都直接追随某个编译器内部 IR 的变化，框架和后端会形成强耦合；如果每个硬件后端都接入每个框架私有图，工程量又不可控。OpenXLA 的答案是把“稳定交换层”和“内部优化 IR”分开。StableHLO 对外提供版本化语义，XLA 内部 HLO 继续服务优化和代码生成。

可以把 OpenXLA 的核心接口写成：

$$
P_f \xrightarrow{\text{export}} S_v \xrightarrow{\text{consume}} C_t \xrightarrow{\text{codegen}} E_t
$$

其中 \(P_f\) 是某个前端框架的程序，\(S_v\) 是版本 \(v\) 的 StableHLO 模块，\(C_t\) 是目标 \(t\) 的编译器 pipeline，\(E_t\) 是目标平台可执行对象。这个式子的关键是 \(S_v\) 不属于某个单一框架或硬件厂商，而是作为 OpenXLA 生态的公共边界。

**StableHLO：稳定的是语义，不是某个后端实现**

StableHLO 规范定义的是高层 ML operation set，包括 program、function、op、tensor type、quantized tensor type、token、tuple 等结构。一个典型 StableHLO 函数由 MLIR `func.func` 包裹，内部包含 `stablehlo.reshape`、`stablehlo.dot`、`stablehlo.add`、`stablehlo.maximum` 等 op。它的稳定性来自三点：第一，op 的输入输出、属性和约束有规范；第二，文本/字节码可被不同工具读写；第三，版本演进可以通过 VHLO 等机制保留兼容映射。

与 XLA 内部 HLO 相比，StableHLO 更像 ABI。ABI 的目标不是暴露所有内部优化细节，而是让生产者和消费者在长期演进中仍能互相理解。因此 OpenXLA 的设计可以概括为：

$$
\text{semantics}(\text{StableHLO}_{v}) =
\text{semantics}(\text{import}_{v\rightarrow h}(\text{HLO}_{h}))
$$

这里的等式不是说两种 IR 语法相同，而是说导入到某个内部 HLO 版本后，程序的张量语义应保持一致。这样前端可以依赖 StableHLO 规范，后端仍有空间在内部 HLO 上做 aggressive rewrite、layout assignment、fusion 和 buffer planning。

**OpenXLA 中的 XLA pipeline：StableHLO 是入口，HLO 优化仍是主战场**

OpenXLA 官方 XLA 架构文档把编译过程拆成三步。第一步，XLA 对 StableHLO 图做目标无关优化和分析，例如 CSE、target-independent fusion、buffer analysis，并把 StableHLO dialect 转入内部 HLO dialect。第二步，HLO 交给目标后端做带硬件信息的优化，例如 GPU 后端可执行适合 GPU 编程模型的 fusion，决定 stream 划分，或把特定模式重写为 cuDNN/cuBLAS/Triton 等库调用。第三步，后端执行目标相关 codegen，CPU/GPU 官方后端使用 LLVM 低层 IR 生成 native code。

这种分层解释了 OpenXLA 为什么既强调 StableHLO，又不把 StableHLO 当作所有优化的终点。StableHLO 解决交换和兼容，HLO pipeline 解决性能。用图模型表示：

$$
G_{\text{StableHLO}}=(V,E,\text{shape},\text{dtype},\text{attrs})
$$

导入 HLO 后，后端会继续补充或改变 layout、sharding、schedule、buffer alias 等物理属性：

$$
G_{\text{backend}}=(G_{\text{HLO}},\text{layout},\text{sharding},\text{schedule},\text{buffers})
$$

前者是跨框架契约，后者是面向硬件的执行计划。

**内存和 fusion：OpenXLA 继承 XLA 的核心优化收益**

OpenXLA 的生态价值来自开放接口，但最终用户感受到的性能仍主要来自 XLA 的传统强项。Fusion 把多个 HLO op 合成一个 computation 或 kernel，使中间张量停留在寄存器、共享内存或局部表达式中，而不是写回 HBM 再读出。Schedule 和 Buffer Assignment 则把图上的逻辑值映射到可复用物理 buffer。给定调度 \(\pi\)，峰值内存可写成：

$$
M(\pi)=\max_t \sum_{b\in B}\text{bytes}(b)\cdot
\mathbf{1}[\text{start}_{\pi}(b)\le t<\text{end}_{\pi}(b)]
$$

XLA 调度器会尝试选择较低峰值的合法拓扑序；Buffer Assignment 会让生命周期不重叠的 HLOBuffer 共享同一 buffer slice；如果内存仍超预算，rematerialization 可以用重复计算换取更短生命周期。OpenXLA 把这些优化能力放在 StableHLO 之后，使多个前端都能复用同一套成熟优化。

**与直接使用 XLA 的区别：OpenXLA 是生态边界重构**

只说“OpenXLA 等于开源 XLA”是不准确的。XLA 是编译器，OpenXLA 是围绕 XLA、StableHLO、PJRT、Shardy 等组件形成的开放生态。它改变的是组织边界：框架开发者面向 StableHLO 导出；编译器开发者面向 StableHLO 导入并生成目标 executable；运行时通过 PJRT 等接口管理设备执行；硬件厂商可以围绕 HLO backend 或 PJRT plugin 接入。这样一来，同一个 StableHLO 程序可以成为调试、测试、序列化、兼容和后端 bring-up 的共同语言。

> 💡 关键：StableHLO 把“框架程序如何交给编译器”从 XLA 内部实现细节中抽出来。OpenXLA 的意义不是替代 XLA 优化，而是让 XLA 的优化能力以稳定、开放、跨框架的方式被更多前端和硬件后端复用。

#### 🧪 练习题

```yaml
question: "OpenXLA 中 StableHLO 最核心的作用是什么？"
options:
  - "替代所有硬件后端的代码生成器"
  - "作为版本化高层操作集，在 ML 框架和 ML 编译器之间提供稳定可移植契约"
  - "只描述 GPU 线程块和寄存器分配"
  - "把动态图强制转成 Python AST"
answer: 1
explain: "StableHLO 是 OpenXLA 的 portability layer，前端导出 StableHLO，编译器消费 StableHLO，从而解耦框架、XLA 内部 HLO 演进和硬件后端。"
```
