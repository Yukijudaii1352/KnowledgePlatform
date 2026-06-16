### Magellan：AlphaEvolve 驱动的自主编译优化发现

```yaml
id: magellan
name: Magellan
full_name: AlphaEvolve驱动自主编译优化发现 (Magellan)
year: '2026'
org: Google DeepMind
paper_url: https://arxiv.org/abs/2601.21096
category: llm_driven
parent: openxla
motivation: LLM Agent自主进化编译优化启发式
```

#### 📝 一句话总结

Magellan 把 AlphaEvolve 式 LLM coding agent、进化搜索和 autotuning 接入真实编译器源码，让系统直接合成可编译、可部署的 C++ 优化启发式，在 LLVM inlining、register allocation 以及 XLA graph rewriting/auto-sharding 上用宏基准奖励替代人工规则调参。

#### 🎯 核心要点

- **演化编译器 pass 本身**：目标不是为每个程序生成优化序列，而是修改编译器中的 C++ decision logic，使产物能像人工 heuristic 一样长期复用
- **EVOLVE-BLOCK 边界**：用户在编译器源码中标记可编辑区域，AlphaEvolve 只改写这一段，候选策略仍遵守 LLVM/XLA 的现有 API
- **四阶段闭环**：policy proposal、local evaluation、hyperparameter tuning、feedback incorporation 反复迭代
- **分层搜索**：LLM 负责提出高层 policy template，数值阈值暴露成 compiler flags，由 Vizier 等 autotuner 做低层参数搜索
- **真实宏基准奖励**：候选策略会重新编译编译器并在用户提供的 workload 上测量二进制大小或运行时间，而不是只优化合成 proxy
- **LLVM inlining 案例**：在 size 目标上，API-level full heuristic 1.5 天搜索达到相对 LLVM upstream 5.23% 的二进制减小，引入 autotuning 后约 5 小时超过 5%
- **性能 inlining 案例**：在 clang 宏基准上，从 Gemini-2.5-Pro 结果续跑 Gemini-3-Pro，最终比手工调优 baseline 提升 0.61%
- **迁移到 XLA**：在 equality-saturation graph extraction 上比手工策略提升 7%，在 auto-sharding contest 设定中达到接近顶级提交的效果

#### 🔬 深入细节

![Magellan 系统总览](https://arxiv.org/html/2601.21096v1/fig/overview-bazel.png)
*图：论文 Figure 1，Magellan 以 LLVM 为示例展示 AlphaEvolve、编译器源码、宏基准评估和 autotuner 之间的闭环；同一模式可替换为 XLA 等其他编译器。*

```python
# Magellan 发现编译优化启发式的核心闭环伪代码
def magellan_search(compiler_repo, evolve_block, benchmark_suite, objective):
    population = initialize_with_seed_policy(evolve_block)

    while not budget_exhausted():
        # 1. LLM/AlphaEvolve 生成 C++ policy template
        template = llm_propose_policy(population, editable_region=evolve_block)
        if not compiles_as_compiler_patch(compiler_repo, template):
            population.add_failure(template, reason="compile error")
            continue

        # 2. 对同一个模板调参，避免 LLM 同时搜索逻辑和阈值
        best_score = None
        best_flags = None
        for flags in vizier_suggest(template.hyperparameters):
            compiler = rebuild_compiler(compiler_repo, template, flags)
            metrics = run_macro_benchmarks(compiler, benchmark_suite)
            score = reward(metrics, objective)  # binary size 或 runtime
            best_score, best_flags = keep_best(best_score, best_flags, score, flags)

        # 3. 把分数、日志和 profile 反馈给 AlphaEvolve 做选择和变异
        population.add_candidate(template, best_flags, best_score)
        population = evolutionary_select_and_mutate(population)

    return population.best()
```

**动机：成熟编译器仍然依赖难维护的手写启发式。** 函数内联、寄存器分配、e-graph extraction、auto-sharding 等问题通常是 NP-hard 或组合爆炸，生产编译器必须依靠启发式在代码尺寸、执行时间、寄存器压力、cache 行为和通信代价之间取舍。过去的 MLGO/神经网络策略能替代部分人工规则，但集成和维护神经模型本身又是新工程负担。Magellan 选择另一条路线：让 LLM 和进化搜索直接合成 C++ 规则，最终产物仍是普通 compiler pass 代码，可审查、可编译、可部署。

**四阶段闭环：从源码 patch 到真实 reward。** Policy proposal 阶段，用户在目标源码中放置 `EVOLVE-BLOCK-START/END`，LLM 只改这一块并生成符合接口的策略，例如 LLVM `AEInlineAdvisor::getAdviceImpl(CallBase &CB)`。Local evaluation 阶段，系统把候选 patch 插入源码、重新编译编译器、运行宏基准，并用 `llvm-size`、`perf stat` 或用户给定指标计算 reward。Hyperparameter tuning 阶段，模板不变，Vizier 只搜索阈值、bonus、penalty 等 flags。Feedback incorporation 阶段，AlphaEvolve 根据分数、失败日志和 profile 选择候选并生成下一轮变体。

**分层搜索的关键是降低无效样本率。** 如果 LLM 同时决定控制流结构和所有数值阈值，很多候选会因为编译错误、阈值不合理或 reward 太稀疏而浪费。Magellan 要求 LLM 输出带符号参数的 policy template，例如：

$$
h_\theta(x) =
\begin{cases}
\text{inline}, & \mathrm{cost}(x) + b_\theta(x) < T_\theta \\
\text{no-inline}, & \text{otherwise}
\end{cases}
$$

其中 \(x\) 是 call site、callee/caller 属性、loop 信息、profile 信息等，\(\theta\) 是 autotuner 调的阈值和权重。这样 LLM 探索“看哪些特征、如何组合”，Vizier 探索“阈值取多少”，两类搜索空间不会互相污染。

**函数内联案例说明了 feature-based 和 API-level 搜索的差别。** Partial heuristic 只能组合 MLInlineAdvisor 已有的 38 个特征，早期进展快，但表达能力有限，最终在 size 任务上约 4.27% binary size reduction 后趋于平台。Full heuristic 直接从 LLVM `CallBase` 出发，能遍历 callee、caller、basic block、loop、attribute 和整个 compilation unit 上下文，早期更难搜索，但最终达到 5.23% reduction。引入 autotuning 后，每个外层迭代让 tuner 评估 10 组参数，约 100 个 program samples、5 小时就超过 5% reduction，说明“模板演化 + 参数调优”的采样效率明显更好。

**性能目标比 size 目标更难，因为 reward 更噪声且更贵。** 在 inlining-for-performance 中，Magellan 使用 clang 宏基准、PGO profile、ThinLTO 和 `-O3` 环境评价端到端性能。直接从 always-false naive policy 起步，Gemini-2.5-Pro 和 Gemini-3-Pro 都难以跨过 0% baseline；但把 Gemini-2.5-Pro 找到的较好策略作为 Gemini-3-Pro 的 seed 后，搜索被限制在更有结构的邻域内，最终获得 0.61% speedup。这个结果的含义不是数值很大，而是说明 LLM 搜索也需要好的 continuation 和 curriculum，尤其在稀疏、昂贵、带噪声的生产宏基准上。

**XLA 案例展示了 Magellan 不限于 LLVM。** 在 equality saturation graph rewriting 中，饱和后的 e-graph 包含许多等价表达式，extraction 要为 reachable e-class 选择一个 e-node，并为其 child e-class 递归选择代表，同时避免 cycle，目标是最小化总 cost。可以抽象为：

$$
\min_{n_c \in E_c} \sum_{c \in R} \mathrm{cost}(n_c)
$$

其中 \(E_c\) 是 e-class \(c\) 内可选 e-node 集合，\(R\) 是从 root 可达的 e-class 集合。论文报告 Magellan 合成的 extraction heuristic 比手工策略提升 7%。在 XLA auto-sharding 中，每个 graph node 要从离散 sharding strategy 中选一个，目标同时包含计算、通信、resharding 和时变内存约束；Magellan 在 contest split 上用公开样例训练、私有样例评估，演化一周后达到接近顶级提交的效果。

**工程边界：正确性由现有编译器接口兜底，质量由 macro-benchmark 约束。** 以内联为例，Magellan 只返回是否建议 inline，合法性检查仍由 LLVM `MLInlineAdvisor`/inliner 框架处理，因此一个能编译并接入接口的策略不会绕过基础 correctness guard。风险更多来自性能泛化和维护性，所以论文强调生成策略要 compact、人类可读，并且能直接进入现有 compiler code review 流程。相比每个程序运行一次 agent 生成 code，Magellan 的成本是一次性搜索 compiler pass，之后对所有程序复用。

> 💡 关键：Magellan 把 LLM 的创造性限制在编译器已有 API 和 `EVOLVE-BLOCK` 内，再用真实宏基准和 autotuner 过滤候选；这比“让 LLM 随便写优化器”更接近可上线的编译器工程流程。

#### 🧪 练习题

```yaml
question: "Magellan 中 LLM 和 autotuner 的分工是什么？"
options:
  - "LLM 只运行 benchmark，autotuner 负责写 C++ 源码"
  - "LLM 生成高层启发式模板，autotuner 搜索模板暴露出的数值阈值和权重"
  - "LLM 直接为每个输入程序生成机器码，autotuner 不参与"
  - "LLM 只训练神经网络模型，最终编译器必须集成推理 runtime"
answer: 1
explain: "Magellan 的分层搜索把 policy structure 和 numeric hyperparameters 分开，减少无效样本，并让最终产物保持为可审查、可部署的 C++ 编译器 heuristic。"
```
