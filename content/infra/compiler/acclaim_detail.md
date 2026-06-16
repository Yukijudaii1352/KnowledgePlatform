### ACCLAIM：编译器-LLM协作代码优化系统

```yaml
id: acclaim
name: ACCLAIM
full_name: 编译器-LLM协作代码优化系统 (ACCLAIM)
year: '2026'
org: Community
paper_url: https://arxiv.org/abs/2604.04238
category: llm_driven
parent: —
motivation: 源码-IR-汇编三层LLM协作，系统化编译优化决策
```

#### 📝 一句话总结

ACCLAIM 提出 compiler-LLM cooperation：让 LLM 在源代码、LLVM IR、x86 汇编三个抽象层做创造性重写，同时把 clang frontend/middle-end/backend 作为可靠工具交给 guiding agent 编排，从而在正确性测试约束下获得超过单层 LLM 优化和传统 `clang -O3` 的性能。

#### 🎯 核心要点

- **三层优化空间**：同时支持 C source、LLVM IR、x86 assembly 三个层级的 LLM rewrite
- **编译器组件工具化**：clang frontend、middle-end、backend 被建模为 guiding agent 可调用工具
- **Guiding agent 编排**：中心 LLM 动态选择调用源代码 agent、IR agent、汇编 agent 或编译器组件，并允许回退、重复调用和跨层协同
- **Level-specific agent**：每个层级 agent 使用 \(n\) 个并行样本和 \(k\) 轮反馈迭代，选择最快且正确的候选
- **Testing agent**：先生成测试脚本，再在每次候选评测时运行正确性输入和大规模输入，给出 correctness/performance 反馈
- **形式化问题定义**：把 rewrite、lowering、compiler、agent 和 testing 都写成函数组合，目标是在正确性为 1 的约束下最大化性能
- **预算分配机制**：guiding agent 有预算 \(b\)，调用 LLM level-specific agent 计费，调用本地编译器组件近似免费
- **实验证据**：在 Project CodeNet C 程序上，相比 `clang -O3` 可达到最高约 1.25× 平均加速，少数程序出现大幅加速
- **关键发现**：source-level 贡献最大，但 IR/assembly 和编译器 pass 的交互能产生单层方案难以发现的协同优化

#### 🔬 深入细节

![ACCLAIM 加速分布图](https://arxiv.org/html/2604.04238v1/histo_1822.png)
*图：ACCLAIM 论文 arXiv HTML 暴露的 Figure 4 结果图之一，展示 ACCLAIM 相对基线的 speedup 分布。论文 Figure 1/3 的系统架构为内嵌 TikZ/SVG：Input Source 由 guiding agent 在 Source Agent、IR Agent、Assembly Agent、Compiler Frontend/Middle-end/Backend 与 Testing Agent 之间调度，最终输出 assembly。*

```python
# ACCLAIM 的 compiler-LLM cooperation 伪代码
def acclaim_optimize(source_program, compiler, budget_b, samples_n, loops_k):
    tests = testing_agent_generate_script(source_program)
    state = Program(level="source", code=source_program)
    best = compile_with_clang_O3(source_program)
    context = {"history": [], "best": best, "tests": tests}

    while budget_b > 0:
        tool = guiding_agent_choose_tool(
            tools=[
                compiler.frontend,      # source -> LLVM IR
                compiler.middle_end,    # LLVM IR -> optimized LLVM IR
                compiler.backend,       # LLVM IR -> x86 assembly
                source_agent, ir_agent, assembly_agent
            ],
            context=context,
        )

        if tool in compiler.components:
            state = tool(state)         # 本地编译器组件近似免费且通常保持语义
            feedback = "lowered_or_rewritten_by_compiler"
        else:
            budget_b -= 1
            state, feedback = level_specific_loop(
                agent=tool,
                program=state,
                tests=tests,
                n=samples_n,
                k=loops_k,
            )

        result = testing_agent_run(state, tests)
        if result.correct and result.speedup > best.speedup:
            best = maybe_lower_to_assembly(state, compiler)
        context["history"].append((tool.name, feedback, result))

    return maybe_lower_to_assembly(best, compiler)

def level_specific_loop(agent, program, tests, n, k):
    best = program
    feedback = ""
    for _ in range(k):
        candidates = [agent.rewrite(best, feedback) for _ in range(n)]
        scored = [testing_agent_run(c, tests) for c in candidates]
        correct = [x for x in scored if x.correct]
        if correct:
            best = max(correct, key=lambda x: x.speedup).program
            feedback = summarize_success(correct)
        else:
            feedback = summarize_failures(scored)  # compile errors + failing cases
    return best, feedback
```

**动机：LLM 有“语义跳跃”能力，编译器有“保守正确”能力。** 论文用 popcount 示例说明协作价值：LLM 可以从源代码或 IR 中识别“循环在数 bit”，把内层循环改成 `llvm.ctpop` 这样的语义 intrinsic；传统 LLVM 在该上下文中未必会主动引入这个高层语义。但一旦 LLM 暴露出 `ctpop`，LLVM 又能可靠地做向量化，把多个 scalar popcount 变成 vector intrinsic。ACCLAIM 的设计目标就是让这两类能力串起来，而不是让 LLM 直接替代编译器。

**形式化框架把“调用哪个层级”变成组合优化问题。** 论文定义有序语言集合 \(\mathbb{L}=\{L_1,L_2,\dots,L_n\}\)，例如 \(L_1\) 是 C source，\(L_2\) 是 LLVM IR，\(L_n\) 是 assembly。层内重写是：

$$
f: L_i \rightarrow L_i
$$

跨层 lowering 是：

$$
f: L_i \rightarrow L_j,\quad i<j
$$

编译器是这些 rewrite/lowering 的有限集合与合法序列；level-specific LLM agent 也是某个 \(L_i\) 上的 rewrite。最终目标是构造一个函数组合 \(\mathcal{C}\)，在输出落到最低层语言的同时满足：

$$
\max_{\mathcal{C}} T_{\text{perf}}(\mathcal{C}(p))
\quad \text{s.t.} \quad
T_{\text{correct}}(\mathcal{C}(p)) = 1
$$

其中 \(T_{\text{perf}}\) 可理解为原程序运行时间与候选程序运行时间之比，\(T_{\text{correct}}\) 是测试通过比例。这个定义把 ACCLAIM 变成一个受正确性约束的 phase-ordering/search 问题。

**Guiding agent 是 phase ordering 的学习型控制器。** 它有 6 个工具：clang frontend、clang middle-end、clang backend、source agent、IR agent、assembly agent。调用编译器组件成本近似为 0，调用 level-specific agent 消耗预算 \(b\)。系统不固定顺序，因此可以 source → frontend → IR agent → backend，也可以发现结果不佳后回到 source 层重试。论文观察到 guiding agent 会重复调用某个层级，也会从 backend 回到 frontend/source，这说明它不是线性编译管线，而是在不同抽象层之间做动态试探。

**Level-specific agent 用 sampling 和反馈环抵消 LLM 不稳定性。** 每个层级 agent 参数化为 \(n\) 个并行样本和 \(k\) 轮反馈循环，总 LLM 生成预算近似随 \(b \times n \times k\) 增长。每轮会生成 \(n\) 个候选，testing agent 评测后只保留最快且正确的候选；如果一个样本集合全错，则把编译错误、失败测试或性能反馈压缩进下一轮上下文。论文的 ablation 发现，在 Claude 3.7 Sonnet 设置下，把预算更多投给反馈迭代（如 \(n=1,k=4\)）通常比只扩大并行采样更好，因为反馈能提升正确生成比例。

**Testing agent 的职责不只是跑单元测试，而是构造性能可区分输入。** 它先基于原始程序生成 deterministic test script；每次评测时产生 \(C\) 个 correctness exploration inputs 和 \(L\) 个 large-scale inputs，论文实验中使用 \(C=10,L=5\)。大规模输入需要跨数量级变化，才能区分两个候选的渐近复杂度。例如网格 BFS 程序如果只测小网格，就看不出把每行 `malloc` 改成整块分配的系统调用复杂度差异。

**与传统编译器优化相比，ACCLAIM 的优势来自跨层语义与成本模型互补。** LLVM 的 `-O3` 必须依赖通用、安全、可证明收益的局部规则和成本模型；LLM 能根据程序意图提出更大胆的结构性改写，例如把 \(H\) 次行分配改成一次连续内存分配，或者在 IR 中把乘 7 改写为左移 3 再减原值。风险是 LLM 经常生成错误代码，尤其在 IR/assembly 层。因此 ACCLAIM 并不信任 LLM 输出，而是把所有 LLM rewrite 放进 testing agent 与 compiler lowering 的闭环中。

> ⚠️ 注意：ACCLAIM 的正确性仍主要依赖测试而非形式化等价验证。论文明确讨论了 testing 可能漏错，未来可把 Alive2、translation validation 或更强 verification agent 接入同一模块化框架。

#### 🧪 练习题

```yaml
question: "ACCLAIM 中 guiding agent 的核心作用是什么？"
options:
  - "只在源码层调用一次 LLM 并直接输出 C 代码"
  - "动态选择编译器组件和不同抽象层的 LLM agent，在正确性约束下搜索更快程序"
  - "替代 clang 的所有 frontend、middle-end 和 backend"
  - "只生成测试数据，不参与优化决策"
answer: 1
explain: "Guiding agent 将 clang 组件和 source/IR/assembly agent 都视为工具，并根据反馈决定下一步调用顺序，本质上是在求解跨层 phase-ordering 与 LLM rewrite 的组合优化。"
```
