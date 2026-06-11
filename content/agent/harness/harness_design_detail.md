### Harness Design: 长程应用开发 Harness 设计 (Harness Design for Long-Running Application Development)

```yaml
id: harness_design
name: Harness Design
full_name: 长程应用开发 Harness 设计 (Harness Design for Long-Running Application Development)
year: '2026.03'
org: Anthropic
paper_url: https://www.anthropic.com/engineering/harness-design-long-running-apps
category: runtime
parent: claude_longrun
motivation: 用规划生成评审三Agent突破长程开发
```

#### 📝 一句话总结
Anthropic 将长程应用开发 harness 升级为 `planner-generator-evaluator` 三代理体系：先把一句话需求扩成完整产品 spec，再由生成代理分阶段实现、由评估代理用 Playwright 和显式标准验收，从而把长时自主编程从“能写代码”推进到“能持续交付可用应用”。

#### 🎯 核心要点
- 继承早期长程 harness 的两个经验：把大任务切成可控块，以及用结构化产物在会话之间交接上下文。
- 形成三代理结构：`Planner` 负责扩写产品规格，`Generator` 负责逐块实现，`Evaluator` 负责独立验收而不是让生成代理自评。
- `Planner` 不写细粒度实现细节，而是生成高层产品 spec 与功能范围，避免上游设计错误层层传导。
- `Generator` 采用 feature-at-a-time / sprint 式推进，每轮先和 `Evaluator` 协商 sprint contract，再动手实现。
- `Evaluator` 通过 Playwright MCP 真实操作应用，按产品深度、功能、视觉设计、代码质量等标准打分，并把缺陷写回下一轮。
- 随模型能力增强，Anthropic 又验证了 harness 应持续“去脚手架”：在更强模型上删掉不再 load-bearing 的 sprint 结构，只保留真正有效的 planner 与 evaluator。

#### 🔬 深入细节
![Harness Design 示意图](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff94c2257964fb2d623f1e81f874977ebfc0986bc-1920x1080.gif&w=3840)
*图：Anthropic 在长程应用开发中使用的多代理 harness 思路，重点是规划、实现、评估三者分离。*

```python
# Harness Design 的抽象执行循环
spec = planner.expand_user_prompt(user_prompt)

while not spec.all_features_done():
    sprint = generator.propose_sprint(spec)
    contract = evaluator.negotiate_contract(spec, sprint)

    build_result = generator.implement(contract, workspace)
    review = evaluator.qa(contract, build_result, tools=["playwright"])

    if review.passed:
        spec.mark_done(contract.feature_id)
    else:
        generator.consume_feedback(review)
```

这篇文章的出发点不是“再造一个更强的单代理”，而是承认长程应用开发天然包含三种不同工作：确定要做什么、把东西做出来、以及独立检查是否真的可用。Anthropic 在文中明确说，早期 long-running harness 已经证明了两件事有效：一是把任务拆成 tractable chunks，二是用结构化 artifact 在多次运行之间传递状态；新工作则把这套经验提升成更完整的三代理架构。

`Planner` 的作用是把 1 到 4 句的短 prompt 扩成完整产品规格，而不是让用户一开始就写非常细的 spec。文章特别强调，planner 应聚焦产品语境与高层技术设计，而不要过早规定具体实现细节；原因很直接，如果上游把技术细节写错，错误会沿着整条实现链传播。这个设计和传统 task decomposition 的区别在于，它不是仅列 TODO，而是给出一份足够指导后续构建、但又不过度锁死实现路径的 product spec。

`Generator` 负责真正的应用构建。Anthropic 在第一版 harness 里让它按 sprint 逐块推进，每次只拿一个 feature 施工，并在开工前与 `Evaluator` 协商一份 sprint contract，明确“这轮具体做什么、完成后如何验证”。这一步非常关键，因为产品 spec 故意写得偏高层，若没有 contract 层，生成代理容易把 user story 和可测试实现之间的空隙用自己的主观判断补齐，导致后续验收标准不稳定。通过 contract，生成代理和评估代理先对 done definition 达成一致，再进入代码实现。

`Evaluator` 是整套 harness 最重要的质量闸门。文中明确指出，代理自评时往往会过度宽容，即便在有可验证结果的软件任务中也是如此，因此要把“做事的代理”和“判断质量的代理”拆开。Anthropic 让 evaluator 使用 Playwright MCP 去真实点击运行中的应用，检查 UI 流程、API 行为、数据库状态，再按产品深度、功能、视觉设计、代码质量等维度给出是否过阈值的结论。只要任一关键维度低于阈值，该 sprint 就判失败，生成代理必须根据详细 bug 反馈返工。

文章还有一个很有价值的 engineering lesson：harness 不是越复杂越好，而是要随着模型能力演进持续剥离不再必要的脚手架。作者提到，早期 4.5 时代为了克服 context anxiety，需要更重的分段与交接机制；而在后续更强模型上，部分结构开始不再 load-bearing，于是他们尝试删掉 sprint construct，只保留 planner 与最终 evaluator，把 session 变为更连续的长程构建。这个结果说明 harness 设计不是静态最佳实践，而是和模型能力共同演化的工程层对象。

> 💡 关键：这套 harness 的核心不是“多代理数量更多”，而是把规格生成、实现、评估三种本质不同的认知工作拆给不同角色。

> ⚠️ 注意：Anthropic 明确指出 evaluator 的价值与任务难度相关。对已落入模型原生能力边界内的任务，它可能只是额外开销；但对接近能力边界的长程应用构建，独立评估仍然显著提升结果质量。

#### 🧪 练习题
```yaml
question: "Harness Design 中为什么要让 generator 和 evaluator 在实现前先协商 sprint contract？"
options:
  - "为了让 planner 直接生成每一行代码，减少 generator 的自由度"
  - "为了把高层产品 spec 转换成当前迭代可测试的完成定义，避免做错方向后才发现"
  - "为了让 evaluator 接管所有代码修改，generator 只负责运行测试"
  - "为了把 Playwright MCP 从 evaluator 手里移交给 generator 使用"
answer: 1
explain: "文章强调 sprint contract 用来桥接高层 spec 与具体实现验收标准，先约定这轮要交付什么、如何测试，再开始编码，可以显著减少偏题与返工。"
```
