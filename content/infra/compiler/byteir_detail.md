### ByteIR：字节跳动端到端AI编译器

```yaml
id: byteir
name: ByteIR
full_name: 字节跳动端到端AI编译器 (ByteIR)
year: '2023'
org: ByteDance
paper_url: https://github.com/bytedance/byteir
category: infrastructure
parent: mlir
motivation: linalg-ext扩展覆盖复杂AI计算模式
```

#### 📝 一句话总结

ByteIR 是字节跳动基于 MLIR、MHLO/StableHLO 和 Linalg 构建的端到端模型编译方案，通过 LinalgExt、ShapeExt、ByRE 与 BRT 运行时把前端图、张量级优化、GPU/CPU/ASIC 后端和执行时接口串成可复用流水线，解决复杂 AI 模式在上游 Linalg 中表达不足、融合受限和运行时 ABI 不统一的问题。

#### 🎯 核心要点

- **端到端组件拆分**：ByteIR 同时包含 Frontends、Compiler、Runtime，但各组件可独立使用，并通过 StableHLO 与 ByRE 形成稳定通信边界
- **前端统一到 StableHLO/MHLO**：TensorFlow、PyTorch、ONNX 前端分别经各自 dialect 降到兼容的 StableHLO，Compiler 主要以 MHLO 作为输入 IR
- **不是新 IR 规范项目**：官方仓库强调 ByteIR 主要复用上游 MLIR dialect 和 Google MHLO，新增 dialect 只补齐工程和后端需要
- **LinalgExt 扩展核心**：在 Linalg 之上增加 Top-k、Scan、Softmax、BatchMatmul 等复杂模式及对应接口，目标是与上游 Linalg 互操作并逐步上游化
- **增强融合能力**：`fuse_ext` 支持 reduction 轴 tiling、diamond 数据流、中间结果作为输出、多 root fusion、与 tensor dialect 一起融合
- **HLO 到 kernel 的分层流水线**：`hlo-opt` 做 MHLO fusion group 聚类和 outlining，`linalg-tensor-opt` 降到 Linalg/LinalgExt 后继续融合、tiling、reduction codegen
- **GPU 路径明确**：MHLO → Linalg Tensor → Linalg Memref → Affine/SCF → GPU dialect，再通过 NVVM/LLVM 生成 PTX 或用 CUDA emitter 生成 CUDA C
- **ByRE/BRT 运行时边界**：ByRE 是编译器和 ByteIR Runtime 之间的执行表示，BRT 同时服务已有 kernel 和编译器生成 kernel
- **面向自定义硬件复用**：通用 graph、loop、tensor 级优化在 ByteIR 中沉淀，ASIC 编译器可只实现最后一段后端映射

#### 🔬 深入细节

![ByteIR 复用的 MLIR/Linalg 分层代码生成骨架](https://user-images.githubusercontent.com/10148468/73613629-c5586580-45c5-11ea-94b7-074aeea94c7b.png)
*图：MLIR/Linalg 官方分层代码生成视图。ByteIR 官方资料说明其直接复用上游 MLIR、MHLO 与 Linalg，并把 LinalgExt 设计为 Linalg 之上的扩展，因此这张图可用来理解 ByteIR 在 OpGraph、Linalg、Affine/SCF、Vector/LLVM 之间的降级骨架。*

```python
# ByteIR 端到端编译流水线伪代码
def compile_with_byteir(model, source_framework, target):
    # 1. 前端边界：不同框架都输出兼容 StableHLO/MHLO
    stablehlo = frontend_to_stablehlo(model, source_framework)
    mhlo = normalize_stablehlo_to_mhlo(stablehlo)

    # 2. 图层优化：聚类可融合 HLO 子图并 outline 成 kernel function
    mhlo = run_passes(mhlo, [
        "reduction-fusion",
        "elementwise-broadcast-fusion",
        "fusion-outlining",
        "canonicalize",
    ])

    # 3. 张量层优化：降到 Linalg/LinalgExt，处理复杂模式
    linalg_ir = lower_mhlo_to_linalg_ext(mhlo)
    linalg_ir = run_passes(linalg_ir, [
        "linalg-fuse-elementwise-ext",
        "linalg-tile-ext",
        "split-reduction",
        "fold-unit-extent-dims",
        "collapse-loops",
        "tensor-pad-specialization",
    ])

    # 4. 后端降级：根据目标进入 GPU、CPU 或 ASIC 的 last-mile pipeline
    if target.kind == "gpu":
        gpu_ir = lower_linalg_to_scf_affine_gpu(linalg_ir)
        binary = emit_ptx_or_cuda(gpu_ir)
    else:
        binary = target.lower_from_linalg_or_scf(linalg_ir)

    # 5. 运行时边界：用 ByRE 描述可执行调用，由 BRT 装载和调度
    byre = emit_byre_runtime_ir(binary, entry_points=collect_entry_points(mhlo))
    return package_for_brt(byre, binary)
```

**定位：ByteIR 不是“再发明一个 IR”，而是把 MLIR 编译栈产品化**

ByteIR 的官方 README 明确说明，ByteIR 项目不是 IR 规范定义项目。在大多数场景中，它直接使用上游 MLIR dialect 和 Google MHLO，并让自己的 passes 与上游 MLIR/MHLO passes 兼容。这一点决定了它的工程取向：前端不必绑定某个框架私有图，后端也不必重新实现完整编译器基础设施，而是在 StableHLO/MHLO、Linalg、SCF/Affine、GPU/LLVM 等层级之间补齐深度学习模型所需的缺口。换言之，ByteIR 的核心贡献不是单点算法，而是把“前端导入、通用张量优化、复杂 fusion、后端生成、运行时执行”整理成可拆换的流水线。

**为什么需要 LinalgExt：上游 Linalg 的表达和接口都还不够**

Linalg 适合表达结构化张量计算，但复杂 AI workload 中有三类模式会卡住普通 Linalg pipeline。第一类是 Top-k、Scan/cumsum 这种很难仅靠 `linalg.generic` 自然表达的模式；第二类是 Softmax 这类可以拆成多个 generic op 但会丢失“这是一个整体 pattern”的优化机会；第三类是 batch matmul 这类上游已有变体但需要更灵活接口的常见算子。ByteIR 的做法是在 Linalg 上方增加 `linalg-ext` dialect，而不是把所有复杂逻辑塞进 pass 的特殊分支。这样既能清楚地区分扩展语义，也能让 ext op 和普通 Linalg op 在 tiling、fusion、lower-to-loops 中互操作。

可以把一个 LinalgExt op 抽象为：

$$
op_{ext} = (\text{indexing\_maps}, \text{iterator\_types}, \text{region}, \text{interfaces}_{extra})
$$

其中前三项尽量沿用 Linalg 的结构化语义，额外接口则描述上游 Linalg 当前无法充分表达的模式属性，例如输出元素级可融合性、reduction 轴行为、scan 的前缀依赖或 top-k 的排序选择约束。这样做的好处是，优化 pass 可以基于接口而不是字符串匹配决策，后端也能在保留模式语义的同时逐步降到 loop 或 GPU dialect。

**Reduction 轴 tiling：ByteIR 修复的是语义级 fusion bug**

ByteIR 文档中特别展示了 `linalg.matmul` 在 reduction 轴上 tiling 时的错误案例。矩阵乘法本质是：

$$
C_{ij}=\sum_{k=0}^{K-1} A_{ik}B_{kj}
$$

如果沿 \(k\) 轴分块，正确的循环语义应该是先初始化一次，再在每个 tile 上累加：

$$
C_{ij}^{(0)}=0,\qquad
C_{ij}^{(t+1)}=C_{ij}^{(t)}+\sum_{k=tT}^{\min((t+1)T,K)-1} A_{ik}B_{kj}
$$

上游 `transform.structured.fuse` 的错误结果会把 `linalg.fill` 放进每个 reduction tile 的循环体，导致每个 tile 都把部分和清零，等价于只保留最后一个 tile 的贡献。ByteIR 的 `fuse_ext` 把 `fill` 保留在 reduction 循环之外，并让循环的 `iter_args` 承接上一轮部分和。这个例子说明 LinalgExt 的价值不只是“多支持几个算子”，而是把 AI 编译中常见的分块、融合和初始化语义关系显式编码进变换。

**复杂数据流融合：中间输出、diamond 和多 root 都是实际模型痛点**

普通 producer-consumer fusion 很容易处理线性链：`A -> B -> C`。真实模型中更常见的是中间值既被后续 op 消费，又作为函数输出返回，或者残差块形成 diamond 结构。ByteIR 的 LinalgExt fusion 支持“intermediates as outputs”，即被融合的 producer 可以同时服务内部 consumer 和外部返回值，避免为了返回中间结果而复制整个 producer 计算。对 ResNet block 这类 diamond 图，ByteIR 文档还指出普通算法可能因重复访问分支节点而出现指数级遍历，`fuse_ext` 会合并多条路径的 tile 范围，使共享 producer 只被 tile 一次。

用集合关系表示，一个 fusion group 不能只看边 \(u\to v\)，还要看每个值的外部用户：

$$
External(v)=Users(v)\setminus Group
$$

若 \(External(v)\neq \varnothing\)，ByteIR 的策略不是简单拒绝融合，而是把 \(v\) 作为 fused function 的额外结果或 loop-carried output。这样 fused kernel 既能减少中间张量落地，又不破坏原图对中间结果的可见性。

**从 MHLO 到 GPU：ByteIR 把通用优化和 last-mile 分开**

ByteIR 的 `hlo-opt` pipeline 先在 MHLO 层聚类 fusion group，包括 reduction fusion、elementwise/broadcast/collapse/expand shape 等双向融合，再把每个 group outline 为独立 kernel function。随后 `linalg-tensor-opt` 把这些 group 转成 Linalg/LinalgExt，继续做 producer/consumer 融合、grid-level reduction split、parallel 维 tiling、block-level reduction、`tensor.pad` specialization 和 scalar detensorize。这个顺序很务实：MHLO 层适合做全图模式识别，Linalg 层适合做结构化循环变换，SCF/Affine/GPU 层适合绑定 block/thread 和 memory space。

GPU 后端文档给出的主路线是：

$$
\text{MHLO}\rightarrow\text{LinalgTensor}\rightarrow\text{LinalgMemref}
\rightarrow\text{Affine/SCF}\rightarrow\text{GPU}\rightarrow\text{NVVM/PTX or CUDA}
$$

其中 `ConvertFuncToGPU` 会把带有循环标注的 `func.func` 转成 `gpu.func`，例如将 `__byteir_loop_to_simt__ = "block_id.x"` 的 `scf.for` 映射到 `gpu.block_id x`。这说明 ByteIR 并不试图在高层图里直接决定线程层细节，而是让 Linalg/SCF 先把循环结构整理清楚，再在 GPU dialect 层做 SIMT 映射。

**ByRE 与 BRT：运行时接口是端到端编译的一部分**

ByteIR 的另一个关键边界是 ByRE，即 ByteDance Representation for Execution。前端和编译器之间用 StableHLO 通信，编译器和运行时之间则用 ByRE 通信。这个分层避免了两类耦合：前端不需要知道 BRT 如何装载 kernel，运行时也不需要理解完整的 MHLO/Linalg 优化历史。BRT 的定位是同时服务已有手写 kernel 和 ByteIR 生成 kernel，因此 ByRE 必须描述 entry function、参数、buffer、外部库调用和生成代码之间的执行契约。

> 💡 关键：ByteIR 的工程价值在于把 MLIR 生态中的“可组合方言”落到 AI 编译产品链路中。StableHLO 解决前端入口，LinalgExt 解决复杂张量模式和融合语义，GPU/LLVM 或 ASIC backend 解决 last mile，ByRE/BRT 解决部署执行边界。

#### 🧪 练习题

```yaml
question: "ByteIR 引入 LinalgExt 的最核心原因是什么？"
options:
  - "完全替代 MLIR 和 Linalg，定义一套新的通用 IR 标准"
  - "在复用 Linalg 的同时补齐 Top-k、Scan、Softmax、复杂 fusion 等上游表达或接口不足的 AI 模式"
  - "只为 TensorFlow 图提供一个前端转换器"
  - "把所有 GPU kernel 强制改写成手写 CUDA C"
answer: 1
explain: "ByteIR 官方文档将 LinalgExt 定义为 Linalg 之上的扩展，目标是与上游 Linalg 互操作，并覆盖普通 Linalg 难以表达或难以优化的复杂 AI 计算模式。"
```
