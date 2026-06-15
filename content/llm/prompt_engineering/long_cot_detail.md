### Long-CoT：长思维链缩放 (Long-CoT Scaling)
```yaml
id: long_cot
name: Long-CoT
full_name: 长思维链缩放 (Long-CoT Scaling)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html
category: frontier_2026
parent: cot
motivation: 长推理链在复杂任务中指数级增益
```

#### 📝 一句话总结
Long-CoT 研究推理链长度、模型规模、训练步数和测试时计算之间的缩放关系，说明更长推理并非无条件更好，而是要与任务难度和算力预算匹配。

#### 🎯 核心要点
- 系统比较不同 CoT 长度下推理模型的训练与测试表现
- 使用数学推理任务观察长链推理的 test-time scaling
- 长 CoT 往往带来更高的渐近性能，但也增加优化难度和 token 成本
- 短 CoT 更高效，适合简单问题或小模型；长 CoT 更适合复杂多步任务
- 关注模型规模、训练样本、推理长度和计算预算之间的联合缩放规律
- 实践上应动态分配推理预算，而不是固定要求所有问题长思考

#### 🔬 深入细节
[论文公开摘要页](https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html)；[NeurIPS 论文 PDF 图源](https://proceedings.neurips.cc/paper_files/paper/2025/file/f3b336ac87912786ef2d72238058cb4f-Paper-Conference.pdf)。

```python
# Long-CoT 缩放实验与部署策略伪代码
def choose_reasoning_budget(question, model, budgets, verifier):
    best = None
    for max_tokens in budgets:
        rationale = model.generate(
            question,
            instruction="reason step by step and verify intermediate steps",
            max_tokens=max_tokens,
        )
        answer = extract_answer(rationale)
        score = verifier(question, rationale, answer)
        best = max([best, (score, max_tokens, rationale, answer)], key=lambda x: x[0]) if best else (score, max_tokens, rationale, answer)
        if score >= 0.95:
            break
    return best[3], best[2]
```

Long-CoT 的核心问题是：推理 token 是否像模型参数和训练数据一样存在可预测的缩放规律。对于简单题，长推理链可能只是重复和绕路；对于复杂题，额外 token 能承载问题分解、候选尝试、错误修正和答案验证，从而提高最终正确率。论文将 CoT 长度作为独立变量，观察它与模型规模和训练计算之间的交互。

长链推理带来的收益通常来自两部分。第一是搜索空间扩展：模型有更多机会尝试中间路径、发现错误并回退。第二是显式验证：长答案中可以包含检查步骤，使最终答案不完全依赖一次前向直觉。但这些收益会被优化难度抵消，特别是小模型可能无法稳定生成有用长链，反而产生冗余或错误累积。

训练侧也存在长度匹配问题。如果监督数据中的推理链很短，模型未必学会如何利用长预算；如果所有样本都强制长链，简单样本又会浪费计算并引入噪声。更稳妥的策略是按任务难度组织多种长度数据，让模型学会在不同预算下保持可验证的中间状态。

部署时，Long-CoT 的启示是动态预算。可以先用较短链尝试，若验证器或置信度不足，再提升 token 上限；也可以对高风险问题直接启用长推理。最终目标不是“越长越好”，而是在正确率、延迟和成本之间找到可解释的缩放点。

#### 🧪 练习题
```yaml
question: "Long-CoT 研究中为什么不能简单认为推理链越长越好？"
options:
  - "长推理链一定无法生成"
  - "长链可能提高复杂题表现，但会增加优化难度、延迟和冗余错误"
  - "长链只能用于图像任务"
  - "长链会自动更新模型参数"
answer: 1
explain: "长 CoT 的收益依赖模型能力、任务难度和计算预算，简单题或小模型上可能得不偿失。"
```
