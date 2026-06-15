### JBFuzz: 用模糊测试自动搜索越狱提示

```yaml
id: jbfuzz
name: JBFuzz
full_name: 'LLM模糊测试框架 (JBFuzz: LLM Fuzzing Framework)'
year: '2026.03'
org: RedTeams
paper_url: https://redteams.ai/blog/jbfuzz-99-percent-success
category: jailbreak
parent: —
motivation: 模糊测试自动化越狱框架
```

#### 📝 一句话总结

JBFuzz 把软件模糊测试的“种子、变异、执行、反馈、保留成功样本”流程迁移到 LLM 红队评测中，用轻量变异器和轻量评估器高效搜索越狱输入。

#### 🎯 核心要点

- **攻击范式**：黑盒访问目标模型，不依赖梯度或权重，只需反复提交候选 prompt 并观察回复。
- **种子库**：从已知越狱模板或人工设计模板出发，作为模糊测试初始语料。
- **变异器**：使用同义替换、局部改写和模板扰动生成新候选，避免昂贵的大模型重写。
- **评估器**：用 embedding 与轻量分类器判断回复是否越过安全边界，减少调用强 judge 模型的成本。
- **工程价值**：适合持续红队回归，把新模型、新 guard 和新策略放到同一自动测试循环中比较。

#### 🔬 深入细节

![JBFuzz 框架图](https://arxiv.org/html/2503.08990v1/x1.png)

图源：JBFuzz 公开论文页面；manifest 中博客链接是对应公开介绍入口。

```text
Algorithm: JBFuzz-style LLM fuzzing loop
Input:
  target model API M
  seed prompt templates S
  mutation operator Mutate
  lightweight evaluator Eval
  selection policy Select
  query budget B
Output:
  successful test cases and coverage statistics

1. Initialize corpus C = S with weights or scores.
2. For step = 1..B:
     seed = Select(C)
     candidate = Mutate(seed)
     response = M(candidate)
     score = Eval(candidate, response)
     if score indicates policy violation:
         save candidate and response as a finding.
         add candidate to C with higher priority.
     else if candidate explores a novel region:
         add candidate to C with neutral or low priority.
     update selection weights from observed outcomes.
3. Deduplicate findings and report ASR, queries, time, and examples for review.
```

JBFuzz 的关键抽象来自传统 fuzzing：不试图一次构造完美攻击，而是持续变异输入并用反馈保留有价值样本。对 LLM 来说，输入空间是自然语言，变异不能像二进制 fuzzing 那样随意翻 bit，因此论文使用更语义保持的同义替换和模板扰动，让候选仍然可被模型理解。

选择策略决定测试预算花在哪里。随机选择简单但浪费；加权随机、UCB 或 EXP3 会把更多查询分配给历史上更容易产生发现的模板，同时仍保留探索新模板的概率。这个设计让 JBFuzz 不只是批量 prompt 列表，而是一个带反馈的搜索系统。

轻量评估器是效率核心。若每个候选都调用 GPT-4 级 judge，成本和延迟会限制 fuzzing 规模。JBFuzz 使用 embedding 加分类器的方式近似判断回复是否违规，再把高风险发现交给更严格复核。这样可以把大量低价值候选快速筛掉。

在防御工作流里，JBFuzz 更适合作为“持续压力测试工具”。它产生的发现应进入人工归因、策略修订和模型回归测试，而不是直接当作真实用户攻击统计。为了避免扩散风险，报告中应脱敏或抽象化具体攻击文本，只保留可复现的内部测试编号和安全标签。

#### 🧪 练习题

1. 为什么 LLM fuzzing 的变异器需要保持语义可读，而传统二进制 fuzzing 可以更随机？
2. 轻量 evaluator 会带来哪些误报和漏报风险？
3. 如何把 JBFuzz 集成到模型上线前的安全回归测试中？
