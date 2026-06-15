### CoT: 思维链 (Chain-of-Thought)
```yaml
id: cot
name: CoT
full_name: 思维链 (Chain-of-Thought)
year: '2022.01'
org: Google
paper_url: https://proceedings.neurips.cc/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html
category: reasoning
parent: few_shot
motivation: 通过中间推理步骤提升复杂推理能力
```

#### 📝 一句话总结
Chain-of-Thought Prompting 在少样本示例中加入自然语言中间推理步骤，使大模型先生成推理链再给答案，解决了标准 prompt 在多步算术、常识和符号推理上容易直接跳错的问题。

#### 🎯 核心要点
- 将 few-shot 示例从“问题-答案”扩展为“问题-推理步骤-答案”
- 不训练新模型、不修改参数，只改变 prompt 中示例答案的结构
- 在算术、常识、符号推理任务上显著优于标准 few-shot prompting
- 推理能力随模型规模涌现，小模型往往无法稳定受益
- PaLM 540B 配合 8 个 CoT 示例在 GSM8K 等任务上取得强结果
- 为后续 Self-Consistency、Zero-shot CoT、Least-to-Most、ReAct、ToT 等方法奠定基础

#### 🔬 深入细节
![Chain-of-Thought Prompting 示例图](https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png)
*图：CoT 论文 Figure 1，展示标准 prompting 与带中间推理步骤的 prompting 对比。图源：ar5iv / arXiv。*

```python
# Chain-of-Thought prompting 推理伪代码
def cot_predict(lm, cot_examples, question):
    prompt = ""
    for q_i, rationale_i, answer_i in cot_examples:
        prompt += f"Q: {q_i}\nA: {rationale_i} The answer is {answer_i}.\n\n"
    prompt += f"Q: {question}\nA:"
    completion = lm.generate(prompt)
    rationale, answer = split_rationale_and_final_answer(completion)
    return answer, rationale
```

CoT 的关键变量是推理链 \(r\)。标准 prompting 直接建模 \(p_\theta(y \mid x)\)，而 CoT 让模型先生成中间步骤再生成答案：

$$
p_\theta(y,r \mid x, D_{\text{cot}})
= p_\theta(r \mid x, D_{\text{cot}})\,p_\theta(y \mid x,r,D_{\text{cot}})
$$

其中 \(D_{\text{cot}}\) 是带推理步骤的少样本示例。这个分解把隐式计算外化为文本，使模型可以把多步问题拆成更短的局部推断，例如先提取数字关系、再执行算术、最后汇总答案。

CoT 的设计非常轻量：同样的问题、同样的模型，只把示例答案从短标签改成“解释 + 最终答案”。这种结构给模型两个信号：第一，答案之前应该展开推理；第二，推理步骤的粒度应该与示例相似。它不是保证推理正确的形式化证明，但会显著降低模型从问题直接跳到答案时的压缩负担。

论文的重要发现是规模效应。对较小模型，要求生成推理链可能只是增加无用文本；对足够大的模型，推理链提供了可利用的计算轨迹，使复杂任务性能大幅提升。这解释了为什么 CoT 常被视为大模型能力涌现的代表现象之一。

与传统符号求解器相比，CoT 不需要显式写规则或程序，通用性强；但它的推理链仍是模型生成的自然语言，可能出现看似合理但计算错误的步骤。因此后续方法通常在 CoT 之上加入多路径采样、投票、工具执行或搜索机制来提升可靠性。

> ⚠️ 注意：CoT 提高的是“生成中间计算轨迹”的概率，不等于验证了轨迹的逻辑正确性。

#### 🧪 练习题
```yaml
question: "CoT Prompting 的主要改动是什么？"
options:
  - "在测试时微调模型参数"
  - "在示例答案中加入中间推理步骤"
  - "删除所有 few-shot 示例"
  - "用外部搜索引擎替代模型生成"
answer: 1
explain: "CoT 的核心是在 prompt 示例中展示推理过程，让模型按类似格式先推理再回答。"
```
