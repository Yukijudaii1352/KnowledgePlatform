### ApproxMLIR：精度感知复合 ML 系统编译器

```yaml
id: approx_mlir
name: ApproxMLIR
full_name: 精度感知复合ML系统编译器 (ApproxMLIR)
year: '2026'
org: UIUC
paper_url: https://mlsys.org/Conferences/2026/Abstract/1742
category: infrastructure
parent: mlir
motivation: approx方言自动平衡精度与速度，优化复合ML系统
```

#### 📝 一句话总结

ApproxMLIR 提出面向复合 AI 系统的 `approx` MLIR 方言、`approx-opt` 优化器和 `approx-runtime` 运行时，把 LLM、RAG 检索、工具调用和传统 C/C++ 内核中的近似选择统一成可调 knob，并通过自动调参与动态决策树在 QoS 约束下寻找速度和质量的 Pareto 折中。

#### 🎯 核心要点

- **统一近似接口**：用 `approx.knob` 在 MLIR 中标记可近似区域，使 autotuner 只需要识别 knob，而不必理解 `scf`、`stablehlo`、`linalg` 等具体方言语义
- **动态近似管理**：用 `approx.decision_tree` 把运行时状态映射到不同近似强度，解决复合 AI 系统中输入状态、检索结果和工具状态变化导致静态近似失效的问题
- **近似实现解耦**：用 `approx.transform` 描述 loop perforation、function substitution、task skipping 等具体策略，管理逻辑和 rewrite rule 分离
- **安全恢复机制**：用 `approx.try` 表达 try-check-recover 合约，在近似输出不满足检查条件时调用用户提供的恢复函数
- **端到端 autotuning**：从所有 `approx.knob` 收集配置空间，借助 OpenTuner 搜索满足 QoS 下限且执行时间最短的配置，并输出质量-性能 tradeoff curve
- **跨 ML 与非 ML 工具链**：JAX/StableHLO/IREE 处理 ML 组件，Polygeist/LLVM 处理 C/C++ 非 ML 组件，ApproxMLIR 在中间层统一近似元数据
- **评估对象覆盖复合系统**：论文评估 5 个非 ML kernel 和 3 个复合 AI 系统，包括 LLM + BM25 RAG、LLM + knowledge-base RAG、LLM + tool invocation
- **性能收益来自动态组合**：例如 LLM + RAG (kb) 在 6% QoS loss 下达到 2.64x speedup，在 9% QoS loss 下达到 3.04x speedup，优于静态近似策略

#### 🔬 深入细节

![ApproxMLIR 高层编译流程图（论文 Figure 2，官方 PDF 第 5 页）](https://misailo.cs.illinois.edu/papers/approxmlir-mlsys26.pdf#page=5)
*图：ApproxMLIR 论文 Figure 2 展示的高层流程。官方公开资料当前只提供 PDF 形态的图源，核心流程是 ML/Non-ML 前端生成 MLIR 模块，经 `approx` 方言、OpenTuner、`approx-opt` 和 `approx-runtime` 统一生成动态可近似程序。*

```python
# ApproxMLIR 端到端精度感知编译伪代码
def compile_with_approxmlir(ml_kernels, non_ml_kernels, qos_target, eval_inputs):
    modules = []
    modules += lower_jax_to_mlir(ml_kernels)             # JAX / StableHLO / IREE 路径
    modules += lower_cpp_to_mlir(non_ml_kernels)         # Polygeist / LLVM 路径

    modules = emit_approx_knobs_from_annotations(modules)
    knobs = collect_ops(modules, op_name="approx.knob")
    search_space = build_config_space(knobs)
    pareto = []

    for config in opentuner_search(search_space):
        configured = write_params_to_knobs(modules, config)
        managed = emit_decision_tree_ops(configured)
        lowered = lower_management_ops_to_scf(managed)   # decision_tree -> scf.index_switch
        linked = bind_runtime_state_functions(lowered)   # runtime = "get_state" 等
        optimized = apply_approx_transforms(linked)      # loop perforate / substitute / skip
        artifacts = codegen_with_llvm_and_iree(optimized)

        qos, exec_time = run_and_measure(artifacts, eval_inputs)
        if qos >= qos_target:
            pareto = update_pareto_frontier(pareto, (qos, exec_time, config))

    return pareto
```

**动机：复合 AI 系统的近似机会跨越了多个软件栈。** 论文以 BM25 RAG 为例：查询先经过 BM25 文档打分和 top-k 过滤，再把检索结果拼进 prompt，最后交给 LLM 生成答案。BM25、PageRank、k-means、lavaMD 这类工具常由 C/C++ 编译到 LLVM；LLM 推理和张量内核则可能从 JAX/StableHLO 进入 IREE 或 XLA。传统近似优化要么只处理非 ML 代码，要么只处理模型压缩、量化或更小模型替换，导致 corpus subsetting、term scoring skipping、context truncation、LLM artifact selection 等选择无法被端到端协调。ApproxMLIR 的核心判断是：复合系统本身已经容忍一定误差，所以编译器应该在统一 IR 层管理“允许丢多少质量、换多少速度”。

**核心抽象：knob 是配置空间，decision tree 是运行时选择，transform 是实现动作。** 一个 knob 表示某个近似方法的离散参数，配置 \(c\) 是所有 knob 的赋值。论文把 tradeoff point 定义为：

$$
\tau = (\mathrm{QoS}(c), \mathrm{ExecTime}(c), c)
$$

Pareto frontier 是所有非支配点的集合：若不存在 \(c'\) 同时满足 \(\mathrm{QoS}(c') \ge \mathrm{QoS}(c)\) 且 \(\mathrm{ExecTime}(c') \le \mathrm{ExecTime}(c)\)，则 \(c\) 是 frontier 上的候选。`approx.knob` 的 `params` 字段保存 tuner 给出的阈值、分支和近似强度；`approx.decision_tree` 根据运行时函数返回值选择分支；`approx.transform` 则在对应分支中触发具体 rewrite。这样 autotuner 面对的是统一的 knob/config 空间，MLIR pass 面对的是标准化的 op lowering。

**为什么不能简单给已有 op 加 attribute。** 如果给 `scf.for`、`stablehlo.dot_general` 或 `linalg.generic` 直接挂 `approx.transform = "skip"` 之类的 attribute，近似语义会和具体方言耦合，并且在 lowering、bufferization、fusion、canonicalization 过程中很容易被丢掉。ApproxMLIR 选择独立方言的意义在于集中保存近似元数据，直到 `approx-opt` 明确把它降成标准控制流或具体 rewrite。这个设计也让外部 tuner 不需要理解每一种 MLIR op 的语义，只要遍历 `approx.knob` 即可完成配置搜索。

**动态近似：把“何时近似”和“如何近似”分开。** `approx.decision_tree` 的四类关键信息是 runtime function、thresholds、decisions 和 transform type。lowering 时它会变成普通 MLIR 控制流，例如先调用 `@get_state`，再根据阈值计算分支编号，最后用 `scf.index_switch` 进入不同 case。每个 case 内部可以复制 exact region，并插入不同 `approx.transform`。直觉上，这相当于把下面的决策函数编译成 IR：

$$
d(s) =
\begin{cases}
0, & s < t_1 \\
1, & t_1 \le s < t_2 \\
2, & s \ge t_2
\end{cases}
$$

其中 \(s\) 是运行时状态，例如检索置信度、输入规模、工具返回分布或系统负载，\(d(s)\) 决定 exact/mild/aggressive 的近似强度。论文强调这对复合 AI 系统很关键，因为同一条静态近似规则可能在高置信输入上安全，在低置信输入上却放大错误。

**具体 transform 以 MLIR rewrite rule 实现。** ApproxMLIR 实现了三类经典近似：loop perforation 修改循环 stride 以跳过部分迭代；function substitution 把精确函数替换为用户提供的近似函数；task skipping 通过控制流重连跳过一段任务。它们本身可以是静态且粗糙的，但嵌入 decision tree 后就变成了有状态策略。例如循环穿孔可以写成：

$$
\text{for } i=0; i<n; i+=1 \quad \Rightarrow \quad \text{for } i=0; i<n; i+=k
$$

其中 \(k=1\) 是 exact，\(k=2\) 或更大表示更激进的近似。`approx.transform` 只声明 `transform_type` 和 `transform_value`，真正修改 `scf.for` 的逻辑放在 RewritePattern 中，这降低了增加新近似策略时对方言本身的侵入。

**QoS 评估连接系统层目标，而不是单个 kernel 误差。** 对 LLM + RAG 这类系统，论文用问题回答是否包含短答案来定义 accuracy；对 k-means/lavaMD 使用 L2 相对误差；对 PageRank、BM25 和 embedding retrieval 使用 RBO 排名相似度。以 L2 指标为例：

$$
\mathrm{Accuracy}_{L2} = 1 - \frac{\|y_{\mathrm{exact}} - y_{\mathrm{approx}}\|_2}{\|y_{\mathrm{exact}}\|_2}
$$

这种设计让 tuner 的目标不是“某个循环少跑几次”，而是“整个复合系统是否仍满足用户 QoS 下限”。因此 ApproxMLIR 可以在 BM25 检索、上下文选择和 LLM artifact 选择之间分配误差预算，找到比单点静态近似更优的折中。

> 💡 关键：ApproxMLIR 的贡献不是某一种新的近似变换，而是把近似变换的声明、搜索、动态选择、安全恢复和跨工具链 lowering 都放进同一个 MLIR 可组合接口中。

#### 🧪 练习题

```yaml
question: "ApproxMLIR 为什么要设计独立的 approx 方言，而不是直接在已有 MLIR op 上挂 attribute？"
options:
  - "为了绕过 MLIR 的 pass manager，直接生成二进制"
  - "为了集中保存近似元数据，让 autotuner 统一识别 knob，并避免 lowering 时丢失近似语义"
  - "为了只支持 JAX 模型，不再处理 C/C++ 非 ML 代码"
  - "为了把所有近似策略固定成静态 loop perforation"
answer: 1
explain: "独立方言把 approximation management 和 concrete transform 解耦，`approx.knob` 给 tuner 统一接口，`approx.decision_tree` 支持动态选择，`approx.transform` 再由专门 pass 降成具体 rewrite。"
```
