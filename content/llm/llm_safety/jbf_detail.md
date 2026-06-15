### JBF: Jailbreak Foundry 的论文到可运行攻击模块流水线

```yaml
id: jbf
name: JBF
full_name: 越狱铸造厂 (Jailbreak Foundry)
year: '2026.03'
org: arXiv
paper_url: https://arxiv.org/abs/2603.05001
category: jailbreak
parent: jbfuzz
motivation: 论文自动转化攻击模块
```

#### 📝 一句话总结

Jailbreak Foundry 将越狱论文、官方代码和统一评测接口转化为可运行攻击模块，目标是让不同 jailbreak 方法在同一框架下可复现、可比较、可扩展。

#### 🎯 核心要点

- **三层结构**：JBF-LIB 提供统一攻击接口，JBF-FORGE 负责论文到模块的半自动实现，JBF-EVAL 负责标准化评测。
- **复现目标**：减少每篇论文自带代码、数据和评测口径不同造成的不可比问题。
- **智能体流程**：规划器提取算法步骤、编码器生成模块、审计器检查接口和实验契约。
- **统一评测**：在固定 victim models、数据集、judge 和指标下比较多种攻击。
- **工程意义**：把“读论文后手工复现攻击”变成更标准的软件工程流程，便于安全团队持续维护红队基准。

#### 🔬 深入细节

![Jailbreak Foundry 架构图](https://raw.githubusercontent.com/OpenSQZ/Jailbreak-Foundry/main/images/jbf_architecture.jpg)

图源：Jailbreak Foundry 官方 GitHub 仓库。manifest 中 arXiv URL 保持为输入元信息；公开仓库和论文用于补足方法细节。

```text
Algorithm: Jailbreak Foundry paper-to-module workflow
Input:
  paper P, optional official code R
  JBF attack interface contract C
  benchmark suite E
Output:
  runnable attack module A and reproducibility report

1. Planner reads P and extracts:
     threat model, prompt construction, optimization loop,
     hyperparameters, stopping criteria, and judge assumptions.
2. If R exists, map official implementation to JBF abstractions.
3. Coder implements A with standard methods:
     initialize(), generate_attack(), query_target(), update(), finalize().
4. Auditor checks that A matches P and C:
     required parameters, deterministic seeds, logging, and failure handling.
5. Run A on E with fixed victim models and safety evaluator.
6. Report ASR, query cost, runtime, reproduced gaps, and deviations from paper.
```

JBF 的核心问题是 jailbreak 研究的可复现性。许多论文都有自己的 prompt 格式、目标模型版本、过滤器、成功判据和后处理逻辑，导致 ASR 不能直接横向比较。JBF-LIB 通过统一攻击生命周期接口，把这些差异压到模块内部，让外部评测器以一致方式调度。

JBF-FORGE 关注从论文到代码的转化。规划器先把自然语言方法拆成结构化计划，例如是否需要优化循环、是否依赖 judge、是否有种子库、是否需要多轮目标模型调用。编码器再把计划落到框架接口中，审计器检查遗漏和不一致。这降低了安全团队复现新论文的手工成本。

JBF-EVAL 解决评测口径问题。它固定数据集、victim model、judge、预算和日志格式，使“某攻击在某模型上成功”变成可追踪实验记录。对于防御者，统一基准比单篇论文数字更有价值，因为它能揭示哪些攻击只在原设定有效，哪些攻击跨模型稳定。

需要注意，JBF 不是鼓励公开扩散攻击细节的产品工具，而是面向受控红队和研究复现的框架。实际组织内部使用时，应对攻击模块、日志样本和成功 prompt 做访问控制，并把复现结果接入修复流程，而不是仅仅追求更高 ASR。

#### 🧪 练习题

1. 为什么不同论文的 jailbreak ASR 往往不可直接比较？
2. 一个统一攻击接口至少应包含哪些生命周期方法？
3. JBF-FORGE 的审计器应检查哪些“论文到代码”的高风险偏差？
