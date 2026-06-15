### Zero-shot CoT: 零样本思维链 (Zero-shot CoT)
```yaml
id: zero_shot_cot
name: Zero-shot CoT
full_name: 零样本思维链 (Zero-shot CoT)
year: '2022.05'
org: 东京大学/Google
paper_url: https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html
category: reasoning
parent: cot
motivation: '"Let''s think step by step"激发推理'
```

#### 📝 一句话总结
Zero-shot CoT 通过在问题后加入 “Let's think step by step” 一类通用触发语，在没有任何示例的情况下诱导模型生成推理链，解决了 CoT 依赖人工少样本推理示例的问题。

#### 🎯 核心要点
- 使用任务无关的触发语激发逐步推理，不需要 few-shot CoT 示例
- 通常采用两阶段 prompting：先生成 reasoning，再用第二个 prompt 抽取最终答案
- 与标准 Zero-shot 相比，在算术、符号、常识推理任务上明显更强
- 与 Few-shot CoT 相比，人工 prompt 成本更低，但稳定性通常更弱
- 触发语可变，论文测试了多种类似模板
- 仍依赖模型规模和答案抽取，生成的推理链可能合理但错误

#### 🔬 深入细节
![Zero-shot CoT 输入输出对比](https://ar5iv.labs.arxiv.org/html/2205.11916/assets/x1.png)
*图：论文 Figure 1，对比标准 Few-shot、Few-shot CoT、标准 Zero-shot 与 Zero-shot CoT。图源：ar5iv / arXiv。*

```python
# Zero-shot CoT 两阶段推理伪代码
def zero_shot_cot(lm, question):
    reasoning_prompt = f"Q: {question}\nA: Let's think step by step."
    reasoning = lm.generate(reasoning_prompt)

    extraction_prompt = (
        f"Q: {question}\n"
        f"A: Let's think step by step. {reasoning}\n"
        "Therefore, the answer (arabic numerals) is"
    )
    final_answer = lm.generate(extraction_prompt, stop=["\n"])
    return normalize(final_answer), reasoning
```

Zero-shot CoT 可以看作在普通 zero-shot 条件分布里加入一个推理模式触发器 \(t\)：

$$
p_\theta(y,r \mid x,t), \quad t=\text{``Let's think step by step''}
$$

这个短语的作用不是提供具体知识，而是改变输出分布的格式先验：模型更倾向于续写一段分步分析，而不是直接给出短答案。对于需要多步计算的问题，这相当于为模型争取了额外的文本计算空间。

论文提出两阶段流程是因为第一阶段生成的文本常包含推理和答案，格式不一定适合自动评测。第二阶段把原问题、推理文本和答案抽取指令重新交给模型，让它输出标准化答案。这个设计牺牲了一次额外调用，换来更稳定的最终答案解析。

Zero-shot CoT 与 Few-shot CoT 的差别在于示例来源。Few-shot CoT 用人工构造的推理示例规定任务格式和推理粒度；Zero-shot CoT 只用通用触发语，依赖模型内部已经学到的“逐步解释”模式。因此它更便宜、更通用，但在任务特定格式、复杂符号规则或需要精确约束时不如精心设计的少样本 CoT 稳。

> ⚠️ 注意：触发“逐步思考”会增加可解释文本，但也可能增加冗长错误；在高风险任务中仍需要验证、工具执行或多路径投票。

#### 🧪 练习题
```yaml
question: "Zero-shot CoT 中第二阶段 prompting 的主要目的是什么？"
options:
  - "训练模型记住推理链"
  - "从第一阶段生成的推理中抽取格式化最终答案"
  - "随机打乱示例顺序"
  - "减少模型参数量"
answer: 1
explain: "Zero-shot CoT 第一阶段生成推理，第二阶段通常用于把推理结果转成可评测的最终答案。"
```
