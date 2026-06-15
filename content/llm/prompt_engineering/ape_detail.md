### APE：自动提示工程师 (Automatic Prompt Engineer)
```yaml
id: ape
name: APE
full_name: 自动提示工程师 (Automatic Prompt Engineer)
year: '2023'
org: 多伦多大学
paper_url: https://openreview.net/forum?id=92gvk82DE-
category: optimization
parent: —
motivation: 利用LLM自动生成筛选最优指令
```

#### 📝 一句话总结
APE 把提示词视为待搜索的自然语言程序，先让大模型批量生成候选指令，再用验证集打分筛选，从而自动找到比人工 prompt 更稳定的任务说明。

#### 🎯 核心要点
- 将 prompt engineering 形式化为黑盒指令搜索问题
- 使用 LLM 根据输入输出示例反推候选 instruction
- 通过执行准确率、似然或任务指标对候选指令排序
- 可在零样本、少样本和带约束的生成任务中使用
- 发现 LLM 既能生成 prompt，也能作为 prompt 的评估器或改写器
- 局限在于搜索质量强依赖验证集覆盖面和候选池多样性

#### 🔬 深入细节
[APE 官方项目页与示意图源](https://sites.google.com/view/automatic-prompt-engineer)；[OpenReview 论文页](https://openreview.net/forum?id=92gvk82DE-)。

```python
# APE 自动指令搜索伪代码
def automatic_prompt_engineer(demos, proposer_llm, target_llm, score_fn, k=20):
    candidates = []
    for _ in range(k):
        instruction = proposer_llm.generate(
            "Infer an instruction that maps these inputs to outputs:",
            examples=demos,
        )
        candidates.append(instruction)

    scored = []
    for instruction in candidates:
        predictions = [target_llm.generate(instruction, x) for x, y in demos]
        scored.append((score_fn(predictions, [y for x, y in demos]), instruction))

    best = max(scored, key=lambda item: item[0])[1]
    return best
```

APE 的关键抽象是“instruction as program”。对于一组输入输出样例，候选 prompt 就是描述任务变换的程序文本；优化目标不是代码可执行性，而是在目标模型上得到更高任务分数。这个视角让提示词优化可以使用经典的 generate-and-rank 框架：生成多个候选，再通过验证集选择最优。

论文中的候选生成通常由 LLM 完成。给定若干示例，模型被要求推断“什么指令能解释这些输入输出关系”。这一步类似归纳程序合成，只是程序语言变成自然语言。候选指令可能语义相近但措辞不同，APE 依赖大规模候选池覆盖这些表达差异。

评估阶段决定了 APE 的可靠性。直接准确率适合分类或问答；似然评分适合答案空间明确、希望减少采样噪声的任务；也可以用另一个 LLM 或任务特定指标评分。验证集如果太窄，APE 容易选出过拟合措辞；验证集如果足够代表真实分布，自动搜索往往能发现人类没有尝试过的高效表达。

APE 对后续方法的影响很大：PromptBreeder 将候选生成改成进化；OPRO 将历史分数放回 prompt 让 LLM 直接做优化器；多模态 APO 则把“候选 prompt + 黑盒评价”的思想搬到视觉语言模型中。它的贡献不只是一个提示模板，而是把 prompt 变成可系统优化的对象。

#### 🧪 练习题
```yaml
question: "APE 中候选指令通常如何产生？"
options:
  - "由 LLM 根据输入输出示例自动归纳生成"
  - "由优化器直接更新模型权重得到"
  - "由人工逐条标注所有测试样例"
  - "由检索系统从网页随机抽取"
answer: 0
explain: "APE 先让 LLM 生成多个自然语言指令，再在验证样例上评估并选择最优指令。"
```
