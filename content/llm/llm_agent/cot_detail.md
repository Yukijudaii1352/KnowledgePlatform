### 思维链 (Chain-of-Thought)

```yaml
id: cot
name: CoT
full_name: 思维链 (Chain-of-Thought)
year: '2022'
org: Google
paper_url: https://arxiv.org/abs/2201.11903
category: planning
parent: —
motivation: 激发中间推理步骤提升复杂推理
```

#### 📝 一句话总结

Chain-of-Thought Prompting 提出在 few-shot 示例中显式给出中间推理步骤，让足够大的语言模型在算术、常识和符号推理任务上自然生成多步推理过程并提升准确率。

#### 🎯 核心要点

- **提示范式创新**：把标准输入输出示例改为“问题 - 中间推理 - 答案”的示例格式
- **无需训练**：只改变 prompt，不需要微调、额外验证器或工具调用
- **复杂推理收益明显**：在数学文字题、常识推理、符号操作等多步任务上显著优于标准 prompting
- **规模涌现特征**：CoT 对小模型帮助有限，在 PaLM 540B 等大模型上效果最明显
- **可解释轨迹**：模型输出不仅包含答案，还包含可读的中间推理步骤
- **少样本设置**：论文典型使用 8 个 CoT exemplars，即可在 GSM8K 等任务上获得强性能
- **后续方法基石**：Self-Consistency、ReAct、ToT、Reflexion 等都以 CoT 的中间推理表示为基础

#### 🔬 深入细节

##### 核心示意图

![CoT 提示示意图](https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png)
*图：CoT 通过在 prompt 示例中加入中间推理过程，引导模型处理复杂算术、常识和符号推理任务。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# Chain-of-Thought few-shot prompting 伪代码
def chain_of_thought_prompting(model, exemplars, question):
    prompt = ""
    for ex in exemplars:
        prompt += f"Q: {ex.question}\n"
        prompt += f"A: {ex.reasoning_steps} Therefore, the answer is {ex.answer}.\n\n"

    prompt += f"Q: {question}\nA:"
    output = model.generate(prompt, decoding="greedy")
    reasoning, answer = parse_reasoning_and_answer(output)
    return reasoning, answer
```

##### 方法解读

标准 prompting 通常只给模型展示输入和答案，例如 \(x \rightarrow y\)。这对单步模式匹配足够，但对多步推理任务不友好，因为模型必须在隐状态中完成所有中间计算。CoT 把示例改成 \(x \rightarrow z_1,z_2,\ldots,z_k \rightarrow y\)，其中 \(z_i\) 是自然语言中间步骤，让模型在输出空间中显式展开推理。

这种设计的直觉很简单：如果答案需要多个中间变量，直接预测最终答案会把搜索空间压缩到一个 token 序列末端；输出推理步骤则把难题拆成更短的局部决策。模型每生成一步，就把该步写入上下文，后续 token 可以基于已经生成的中间结果继续推导。

CoT 的有效性与模型规模强相关。论文显示，小模型往往无法可靠利用中间推理示例，甚至会生成无效解释；足够大的模型则能从示例中学到“先推理再回答”的输出模式。这也是 CoT 被视为大模型涌现能力代表的原因之一。

CoT 并不保证推理过程真实或总是正确。它提升的是模型在复杂任务上的条件生成能力，而不是形式化证明系统。错误仍可能来自某一步算术、事实知识或逻辑跳转。因此后续 Self-Consistency 用多路径投票缓解单条 CoT 的脆弱性，ReAct 用环境观察补事实，ToT 用搜索和回溯修正早期选择。

形式上，CoT 把答案概率从直接建模 \(p_\theta(y\mid x)\) 改成引入推理轨迹的生成：

$$p_\theta(y,z\mid x)=p_\theta(z\mid x)\,p_\theta(y\mid x,z)$$

其中 \(z\) 是自然语言思维链。虽然推理时通常只采样一条 \(z\)，但这个分解给了模型更多中间计算空间。

> 💡 关键：CoT 的核心不是让模型“解释答案”，而是把中间推理步骤变成可生成、可条件化的上下文，从而降低多步问题的有效难度。

#### 🧪 练习题

```yaml
question: "Chain-of-Thought Prompting 提升复杂推理的主要方式是什么？"
options:
  - "在 prompt 示例中加入中间推理步骤，引导模型逐步求解"
  - "训练一个额外的奖励模型来打分答案"
  - "调用外部搜索引擎补充事实"
  - "把模型参数压缩到更小规模"
answer: 0
explain: "CoT 的关键是把示例从直接问答改为包含自然语言推理轨迹的问答，使模型在生成答案前显式展开中间步骤。"
```
