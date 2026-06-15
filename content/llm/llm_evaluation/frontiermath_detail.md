### FrontierMath

```yaml
id: frontiermath
name: FrontierMath
full_name: 前沿数学基准 (FrontierMath)
year: "2024"
org: Epoch AI
paper_url: https://epoch.ai/frontiermath
category: frontier_2026
parent: math
motivation: 原创未发表数学问题研究级难度
```

#### 📝 一句话总结

FrontierMath 由 Epoch AI 组织专家创作并审查未发表高难数学题，使用从本科高难到研究级的分层问题检验 AI 是否具备推进前沿数学的能力。

#### 🎯 核心要点

- 官方页面将 FrontierMath 分为 Tiers 1-4 和 Open Problems 两个组成部分
- Tiers 1-4 包含数百道未发表、高难、专家创作并同行审查的问题
- 难度从本科高难题、研究生探索题到 Tier 4 研究级数学问题
- Open Problems 收录尚未被数学家解决的研究问题，用于测试 AI 对真正开放问题的潜在贡献
- 数据不完全公开，主要是为了减少训练数据污染和答案泄漏
- 评测强调最终答案可核验、问题原创性和专家审查，而不是依赖已有竞赛题库

#### 🔬 深入细节

![FrontierMath 官方页面图](https://epoch.ai/legacy_assets/images/frontiermath-banner.png)
*图：Epoch AI 官方 FrontierMath 页面中的 Tiers 1-4 横幅图，展示前沿数学评测定位。*

```python
# FrontierMath 题目创建与评测伪代码
for proposal in mathematician_authored_problems:
    if is_published_or_searchable(proposal):
        continue
    review = peer_review(proposal)
    if not review.has_unique_verifiable_answer:
        continue
    tier = assign_difficulty_tier(proposal, review)
    hidden_benchmark.add(problem=proposal, answer=review.verified_answer, tier=tier)

for model in evaluated_ai_systems:
    for problem in hidden_benchmark:
        solution = model.solve(problem.statement, tools=allowed_tools, time_limit=budget)
        final_answer = extract_final_answer(solution)
        correct = exact_or_symbolic_check(final_answer, problem.answer)
        record(model, problem.tier, correct, solution)
```

##### 动机与背景

数学基准很容易被饱和或污染。竞赛题、教材题和公开题库长期暴露在互联网上，模型可能在预训练中见过题干、解法或近似变体。对前沿模型而言，真正有价值的问题是：面对原创、未发表、难以检索的数学问题，系统能否产生可靠解法。

FrontierMath 正是围绕这个目标构建。它不把规模作为唯一目标，而强调原创性、专家审查和高难度分层。这样的评测更适合观察模型是否从“解已知题”走向“处理未知研究问题”。

##### 核心机制

题目由数学专家创作，经同行审查确认题意、答案和难度。只有满足答案可验证、题目未公开、难度足够高的问题才进入隐藏评测。隐藏题库减少了训练污染，但也意味着外部研究者无法像普通开源数据集那样完全复现实例级结果。

分层设计非常重要。Tier 1-3 覆盖本科到高级研究生/探索题，Tier 4 接近研究级；Open Problems 则指向尚未解决的问题。分层结果比单一总分更有解释力，因为模型可能能解决较低层级题，却完全无法处理研究级问题。

##### 评测形式

FrontierMath 依赖可核验答案。许多数学题可以通过最终数值、表达式、证明关键结论或符号形式验证。评测时需要从模型长解中抽取最终答案，并通过精确匹配、符号化简或专家核查确认。

从形式上看，它测量的是：

$$SolveRate_t=\frac{1}{|D_t|}\sum_{p\in D_t}\mathbb{1}[\text{verify}(f_\theta(p), a_p)=1]$$

其中 \(t\) 是难度层级，\(a_p\) 是专家确认答案。

##### 与传统数学基准的区别

GSM8K、MATH、OlympiadBench 等基准对算术、竞赛或奥数推理很有价值，但题目公开且更接近训练分布。FrontierMath 的优势在于原创未发表和专家级难度，缺点是开放复现性较弱、评测成本高。它更像前沿能力审计，而不是日常模型开发的快速单元测试。

> 💡 关键：FrontierMath 的核心不是“更长的数学题”，而是“未见过、专家审查、可验证且足够接近研究前沿”的题。

#### 🧪 练习题

```yaml
question: "FrontierMath 为什么强调原创未发表问题？"
options:
  - "为了让题目更容易被搜索到"
  - "为了降低训练数据污染和记忆解法带来的虚高分数"
  - "为了取消专家审查"
  - "为了只评测小学算术"
answer: 1
explain: "原创未发表问题能减少模型在预训练中见过题目或解法的概率，更接近真实未知数学问题求解。"
```
