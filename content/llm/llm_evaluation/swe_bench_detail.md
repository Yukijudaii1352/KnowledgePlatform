### SWE-bench

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

SWE-bench 将真实 GitHub issue 和对应 pull request 转化为可执行软件工程任务，要求模型在完整代码库中生成补丁并通过项目测试，评估远超函数补全的工程修复能力。

#### 🎯 核心要点

- 原始 SWE-bench 包含 2,294 个任务，来自 12 个流行 Python 仓库的真实 issue 与 PR
- 输入是代码库和 issue 描述，输出是 patch，不是单函数代码片段
- 任务常需跨文件理解、定位 bug、修改实现、兼顾已有接口和测试
- 数据构建包含抓取 PR、属性过滤和执行过滤，确保 PR 关联 issue 且测试可运行
- 评测通过项目自己的测试套件验证 patch 是否解决问题，强调可执行正确性
- 早期评估中 Claude 2 只能解决约 1.96% 任务，显示真实软件工程远难于传统代码生成基准

#### 🔬 深入细节

![SWE-bench 任务示意](https://raw.githubusercontent.com/swe-bench/SWE-bench/main/docs/assets/figures/teaser.png)
*图：SWE-bench 官方仓库中的 teaser，展示从真实 GitHub issue 到模型生成 patch 再到测试验证的流程。*

```python
# SWE-bench 数据构建与评测伪代码
for repo in popular_python_repos:
    prs = scrape_pull_requests(repo)
    for pr in prs:
        if not pr.links_issue or not pr.modifies_tests:
            continue
        base_commit = checkout_before_pr(pr)
        if not install_successfully(base_commit):
            continue
        if not tests_pass_before_and_fail_relevant_case(base_commit, pr):
            continue
        task = make_task(repo, base_commit, pr.issue_text, pr.gold_patch, pr.tests)
        swe_bench.append(task)

for task in swe_bench:
    workspace = checkout(task.repo, task.base_commit)
    predicted_patch = agent.generate_patch(workspace, task.issue_text)
    apply_patch(workspace, predicted_patch)
    result = run_tests(workspace, task.test_command)
    score += int(result.resolves_issue)
```

##### 动机与背景

HumanEval、MBPP 等传统代码基准通常要求模型补全一个函数，输入短、依赖少、测试集中。真实软件工程任务完全不同：开发者要阅读 issue、理解现有项目结构、定位相关模块、修改多个文件，并确保不破坏其他测试。

SWE-bench 把评测对象升级为“能否修复真实开源项目的问题”。这类任务对长上下文、代码搜索、工具使用、环境管理和迭代调试都有要求，因此更接近工程代理的实际能力边界。

##### 核心机制

数据来自真实 issue-PR 对。一个合格实例要求 PR 关联 issue，并且修改了至少一个测试相关文件，说明该 PR 能提供可验证信号。随后执行过滤确保仓库可安装、测试可运行，并能用 PR 前后的状态构造任务。

评测时模型拿到 issue 描述和代码库，生成 unified diff 或直接修改文件。系统应用补丁后在隔离环境中运行测试，只有通过相关测试且不引入回归才算解决。核心指标是 resolved rate：

$$Resolved=\frac{1}{N}\sum_{i=1}^{N}\mathbb{1}[\text{tests}(repo_i+\Delta_i)=\text{pass}]$$

##### 为什么困难

SWE-bench 任务经常需要非局部修改：一个 issue 可能由 API 设计、边界条件、依赖版本或跨模块状态引起。模型如果只看 issue 文本，很难定位；如果只做局部搜索，又可能漏掉测试期望或项目约定。成功系统通常需要 agent scaffold：搜索、打开文件、编辑、运行测试、根据失败信息迭代。

这也是 SWE-bench 与代码补全基准的根本差异。它测的不只是“会写 Python”，还包括“会在陌生代码库里完成一次小型维护任务”。

##### 评测影响

SWE-bench 促成了后续 SWE-bench Lite、Verified、Multimodal 以及软件工程 agent 的发展。原始基准中的低解题率说明，LLM 在聊天和短代码生成上表现强，并不自动意味着具备可靠的端到端工程修复能力。

> ⚠️ 注意：SWE-bench 的测试通过率依赖测试覆盖；通过测试不保证补丁语义完美，但比静态文本匹配更接近真实工程验收。

#### 🧪 练习题

```yaml
question: "SWE-bench 相比 HumanEval/MBPP 的核心区别是什么？"
options:
  - "只要求输出一句自然语言解释"
  - "要求模型在真实代码库中根据 GitHub issue 生成补丁，并通过项目测试"
  - "所有任务都不需要运行测试"
  - "只评测单行代码补全"
answer: 1
explain: "SWE-bench 使用真实 issue-PR 对和执行式测试，评估跨文件定位、修改和验证的工程能力。"
```
