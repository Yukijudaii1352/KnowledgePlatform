### Few-shot: 少样本提示 (Few-shot Prompting)
```yaml
id: few_shot
name: Few-shot
full_name: 少样本提示 (Few-shot Prompting)
year: '2020'
org: OpenAI
paper_url: https://arxiv.org/abs/2005.14165
category: basic
parent: —
motivation: 通过少量示例激发模型上下文学习能力
```

#### 📝 一句话总结
Few-shot Prompting 在 GPT-3 论文中被系统化为一种“只在输入上下文中给少量示例、不更新参数”的任务适配方式，解决了传统微调依赖大量标注样本和梯度更新的问题。

#### 🎯 核心要点
- 使用任务描述加 \(K\) 个输入-输出示例作为上下文，直接让自回归语言模型续写答案
- GPT-3 以 175B 参数规模验证少样本上下文学习随模型规模增强
- 评估范式明确区分 Fine-tuning、Zero-shot、One-shot、Few-shot
- 所有测试任务均不进行梯度更新，任务规范完全由自然语言和示例文本给出
- 在翻译、问答、完形填空、SuperGLUE、LAMBADA、简单算术等任务上展示跨任务泛化
- 局限包括上下文长度受限、示例选择敏感、部分推理和稳健性任务仍明显落后

#### 🔬 深入细节
![GPT-3 评估范式对比图](https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png)
*图：GPT-3 论文 Figure 2.1，对比 Fine-tuning、Zero-shot、One-shot 与 Few-shot 的测试时输入方式。图源：ar5iv / arXiv。*

```python
# Few-shot prompting 推理伪代码
def few_shot_predict(lm, task_description, demonstrations, query, k):
    prompt = task_description.strip() + "\n\n"
    for x_i, y_i in demonstrations[:k]:
        prompt += f"Input: {x_i}\nOutput: {y_i}\n\n"
    prompt += f"Input: {query}\nOutput:"
    return lm.generate(prompt, stop=["\n"])
```

Few-shot 的核心不是“用少量样本训练模型”，而是把少量样本作为输入条件。给定任务描述 \(d\)、示例集合 \(\{(x_i,y_i)\}_{i=1}^{K}\) 和测试样本 \(x_\*\)，模型直接估计：

$$
p_\theta(y_\* \mid d, x_1,y_1,\ldots,x_K,y_K,x_\*)
$$

这里的 \(\theta\) 在测试时保持不变，因此适配过程发生在 Transformer 的前向传播和注意力模式中，而不是参数空间中。GPT-3 论文将这种能力称为 in-context learning 的一种表现：预训练阶段形成的模式识别能力被测试时的文本示例临时调动起来。

方法设计的关键是“格式对齐”。示例不仅提供标签，还提供任务的输入输出 schema、答案风格、标签空间和隐含约束。例如情感分类中，示例会告诉模型标签只能是 `Positive` 或 `Negative`；翻译任务中，示例会告诉模型输入输出语言边界。示例数量 \(K\) 增加时，模型获得更多任务结构信号，但也会消耗上下文窗口并引入坏示例干扰。

与传统 fine-tuning 相比，Few-shot Prompting 的优势是部署成本低：同一个底座模型可以通过不同 prompt 切换任务，不需要为每个任务维护独立权重。代价是它把优化问题转移到了 prompt 设计上，示例的代表性、顺序、格式和长度都会影响输出；当任务需要精确规则、长链推理或罕见标签时，少量示例未必足以稳定约束模型行为。

> 💡 关键：Few-shot 的“学习”发生在上下文内，模型参数不变；示例越像一个清晰的小型任务说明书，模型越容易把续写分布收缩到正确答案空间。

#### 🧪 练习题
```yaml
question: "Few-shot Prompting 与传统监督微调的核心区别是什么？"
options:
  - "Few-shot 在测试时更新全部模型参数"
  - "Few-shot 通过上下文示例指定任务，测试时不做梯度更新"
  - "Few-shot 必须使用奖励模型筛选答案"
  - "Few-shot 只适用于分类任务"
answer: 1
explain: "Few-shot Prompting 将少量示例放入 prompt 中作为条件信息，模型权重保持冻结。"
```
