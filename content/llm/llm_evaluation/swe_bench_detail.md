### SWE-bench：软件工程基准 (2024)

```yaml
id: swe_bench
name: SWE-bench
full_name: 软件工程基准 (Software Engineering Benchmark)
year: "2024"
org: Princeton University
paper_url: https://arxiv.org/abs/2310.06770
category: frontier_2026
parent: mbpp
motivation: 真实GitHub问题修复工程能力
```

#### 📝 一句话总结

SWE-bench 提出用真实 GitHub issue、对应 pull request 和仓库测试套件评估语言模型的工程修复能力，解决 HumanEval/MBPP 这类短代码题无法衡量仓库级定位、跨文件修改和环境交互的问题。模型不再只是补全函数，而是要在给定问题描述和代码库上下文后生成可应用 patch，并通过真实项目的单元测试。

#### 🎯 核心要点

- 数据规模：论文构建 2,294 个软件工程任务，来自 12 个流行 Python 仓库的真实 issue 和合并 PR。
- 任务定义：输入包括问题描述、代码库基线版本和检索到的文件上下文，输出是 unified diff patch。
- 自动判分：将模型 patch 应用到仓库后运行测试，若原本失败的测试通过且原本通过的测试不回退，则任务算 resolved。
- 数据构造：从约 90,000 个 PR 出发，筛选出关联 issue、修改测试文件、可复现构建、可区分修复前后行为的实例。
- 上下文检索：论文比较 BM25 检索和 oracle 检索；oracle 直接提供 gold patch 修改过的文件，BM25 更接近真实场景但经常漏掉关键文件。
- 基线模型：评估 ChatGPT-3.5、GPT-4、Claude 2 以及基于 CodeLlama 微调的 SWE-Llama 7B/13B。
- 难点来源：任务需要理解大型仓库、定位相关文件、跨函数/跨类/跨文件修改、遵守项目测试框架和生成语法正确的 diff。
- 工程价值：SWE-bench 把 LLM 评测从“写一段独立代码”推进到“像维护者一样修一个真实项目问题”。

#### 🔬 深入细节

![SWE-bench 任务流程示意](https://github.com/SWE-bench/SWE-bench/raw/main/docs/assets/figures/teaser.png)
*图：SWE-bench 官方仓库的任务示意。模型读取 issue 与代码库，生成 PR/patch，再通过单元测试判断是否真正修复问题。*

SWE-bench 的核心动机是传统代码基准过于“自包含”。HumanEval 或 MBPP 通常给出函数签名、短题面和少量隐藏测试，模型只要写一个局部函数即可；真实软件维护则完全不同，开发者要读 issue、理解现有架构、找到相关文件、识别回归风险、修改多个位置并运行项目测试。SWE-bench 把这个真实流程抽象成可自动评测的基准：给模型一个仓库快照和 issue 描述，要求输出修复 patch。

论文的数据构造从 GitHub PR 管线开始。一个候选 PR 必须已经合并，必须与一个或多个 issue 关联，并且 PR 中既包含源码改动，也包含测试文件改动。测试文件改动很关键，因为它们帮助构造判分集合：修复前应该失败、修复后应该通过的测试称为 fail-to-pass；修复前后都应通过的测试称为 pass-to-pass。这样可以避免模型只让新增测试通过却破坏旧功能。

SWE-bench 任务可形式化为四元组：

$$
\mathcal{I}=(P, C_{base}, T, \delta^\star),
$$

其中 \(P\) 是由 issue 聚合而来的问题陈述，\(C_{base}\) 是 PR 合并前的仓库基线提交，\(T=T_{F2P}\cup T_{P2P}\) 是判分测试集合，\(\delta^\star\) 是维护者合并的参考 patch。模型看不到 \(\delta^\star\)，它需要生成候选 patch \(\hat\delta\)。判分函数可写为：

$$
\mathrm{resolved}(\hat\delta)=\mathbf{1}\left[
\forall t\in T_{F2P}: t(C_{base}+\hat\delta)=\mathrm{pass}
\land
\forall t\in T_{P2P}: t(C_{base}+\hat\delta)=\mathrm{pass}
\right].
$$

```python
# SWE-bench 评测流程伪代码
for instance in swe_bench:
    repo = checkout(instance.repo, instance.base_commit)
    context_files = retrieve_files(
        issue=instance.problem_statement,
        repo=repo,
        method="BM25",      # 或 oracle，用 gold patch 文件作为上限分析
        token_budget=instance.context_limit
    )
    prompt = format_prompt(instance.problem_statement, context_files, diff_instructions=True)
    patch = model.generate(prompt)

    if not apply_unified_diff(repo, patch):
        mark(instance, resolved=False)
        continue

    f2p_ok = run_tests(repo, instance.fail_to_pass_tests) == "all_pass"
    p2p_ok = run_tests(repo, instance.pass_to_pass_tests) == "all_pass"
    mark(instance, resolved=f2p_ok and p2p_ok)
```

上下文检索是 SWE-bench 难度的核心变量。真实仓库可能有成千上万个文件，直接把整个仓库塞进 prompt 不现实；论文因此使用 BM25 根据 issue 文本检索相关文件，并用 oracle 检索作为上限对照。oracle 检索直接提供维护者 patch 实际修改过的文件，所以它不是现实系统，而是回答“如果模型知道该看哪些文件，它能否修好”的诊断工具。论文发现 BM25 在相当多实例中无法召回 oracle 文件，说明检索失败本身就是软件工程 agent 的关键瓶颈。

生成 patch 也比生成代码片段更脆弱。模型必须遵守 diff 格式，不能引入语法错误，不能遗漏 import，不能修改错误文件，不能只贴解释文字。即使 patch 可以应用，仍可能只修复新测试而破坏旧测试；因此 pass-to-pass 测试是防止“过拟合新增测试”的回归护栏。这个判分方式接近真实 CI：最终不是看回答是否听起来合理，而是看仓库在修改后是否仍然工作。

论文的实验结果显示，当使用 BM25 检索时，Claude 2 只能解决约 1.96% 的 full SWE-bench 实例，GPT-4 和 ChatGPT-3.5 也只能处理极少数简单问题。即使在 oracle 文件上下文中，性能仍然很低，说明失败不只是“找不到文件”，还包括理解 issue、设计修复、跨文件协调、生成正确 diff 和通过测试的综合能力。SWE-Llama 用训练集的 gold patch 进行微调，在 oracle 分布下有一定收益，但对 BM25 检索上下文分布转移非常敏感。

与 MBPP/HumanEval 相比，SWE-bench 的创新点在于把评价单位从函数级提升到仓库级。传统代码题通常是 \(f: x\mapsto y\) 的局部合成问题，而 SWE-bench 是 \((issue, repo)\mapsto patch\) 的维护任务。这个变化引入了软件工程中的真实困难：需求不完整、代码风格约束、历史兼容性、测试环境依赖、局部修改和全局行为之间的冲突。它也让评测更适合衡量 agent：检索、浏览文件、运行测试、迭代修复都可以成为系统的一部分。

> 💡 关键：SWE-bench 的“答案”不是一段自然语言，也不是一个函数体，而是能在真实仓库中应用并通过测试的补丁。它评测的是端到端工程闭环，而不只是代码生成能力。

#### 🧪 练习题

```yaml
question: "SWE-bench 中 fail-to-pass 与 pass-to-pass 测试同时存在的主要原因是什么？"
options:
  - "让模型必须输出更长的 patch"
  - "同时验证问题被修复且原有功能没有回归"
  - "把 Python 任务转换成多语言任务"
  - "用 BM25 替代单元测试"
answer: 1
explain: "fail-to-pass 检查原 issue 对应行为是否被修复，pass-to-pass 检查旧测试是否仍通过，二者合起来约束 patch 的真实可用性。"
```
