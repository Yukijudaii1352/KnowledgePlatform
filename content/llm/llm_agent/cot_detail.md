### CoT：思维链 (Chain-of-Thought)

```yaml
id: cot
name: CoT
full_name: 思维链 (Chain-of-Thought)
year: 2022
org: Google
paper_url: https://arxiv.org/abs/2201.11903
category: planning
parent: —
motivation: 激发中间推理步骤提升复杂推理
```

#### 📝 一句话总结
Chain-of-Thought Prompting 提出在 few-shot 示例中加入自然语言中间推理步骤，使大语言模型在不微调参数的情况下显著提升算术、常识和符号推理能力。

#### 🎯 核心要点
- 核心形式：将 few-shot 示例从 `<input, output>` 扩展为 `<input, chain of thought, output>`。
- 不需要训练：CoT 是纯 prompting 方法，不要求构造大规模 rationale 数据集进行微调。
- 适用任务：论文系统评估 arithmetic reasoning、commonsense reasoning、symbolic reasoning 三类复杂推理。
- 规模涌现：CoT 的收益主要出现在足够大的模型上，小模型可能无法稳定利用或生成有效推理链。
- 示例数量：数学推理实验中主要使用 8 个手写 CoT exemplar，AQuA 多选任务使用训练集中的 4 个示例。
- 解释性收益：中间步骤为模型答案提供可读推理轨迹，便于定位语义理解错误、计算错误或缺失步骤。
- 代表结果：PaLM 540B 在 GSM8K 上用 CoT few-shot prompt 达到强于 standard prompting 的效果，并超过当时带 verifier 的 finetuned GPT-3 基线。

#### 🔬 深入细节

![Chain-of-Thought Prompting 示例图](https://ar5iv.labs.arxiv.org/html/2201.11903/assets/x1.png)
*图：CoT Figure 1，对比 standard prompting 直接给答案与 chain-of-thought prompting 先生成中间推理步骤再给答案。*

CoT 的基本观察是：很多复杂任务不是缺少最终答案格式，而是缺少可展开的中间计算过程。标准 few-shot prompting 给模型若干“问题-答案”对，模型只能学习输入到输出的短映射；但数学题、日期推理、硬币翻转、最后字母拼接等任务需要多步状态更新。如果 prompt 中展示“如何一步步到达答案”，大模型就能在测试样本上模仿这种中间过程，把原本压缩在一次前向生成中的推理显式展开。

论文将 CoT 定义为自然语言中间步骤序列。对第 \(i\) 个示例，普通 few-shot 使用 \((x_i,y_i)\)，而 CoT 使用三元组：

$$
(x_i, z_i, y_i)
$$

其中 \(x_i\) 是输入问题，\(z_i\) 是 chain of thought，\(y_i\) 是最终答案。测试时给定上下文 \(\mathcal{D}_{cot}=\{(x_i,z_i,y_i)\}_{i=1}^{k}\)，模型生成：

$$
(z_*, y_*) \sim p_\theta(\cdot \mid \mathcal{D}_{cot}, x_*)
$$

也就是先输出中间推理 \(z_*\)，再输出最终答案 \(y_*\)。关键在于 \(z_*\) 不是监督训练出的隐藏变量，而是在自然语言空间中由 prompt 诱导出来的显式生成序列。

```python
# Chain-of-Thought Prompting 推理伪代码

def build_cot_prompt(exemplars, test_question):
    prompt = ""
    for q, rationale, answer in exemplars:
        prompt += f"Q: {q}\n"
        prompt += f"A: {rationale} The answer is {answer}.\n\n"
    prompt += f"Q: {test_question}\nA:"
    return prompt


def cot_inference(model, exemplars, test_question):
    prompt = build_cot_prompt(exemplars, test_question)
    completion = model.generate(
        prompt,
        decoding="greedy",   # 论文主实验多使用 greedy decoding
        stop=None,
    )
    rationale = extract_reasoning_steps(completion)
    final_answer = extract_after_answer_phrase(completion)
    return rationale, final_answer
```

CoT 与“解释答案”表面相似，但顺序相反。许多 explainable QA 数据是在答案之后附解释，而 CoT 要求模型在最终答案之前先写中间步骤。这个顺序对自回归模型很关键，因为生成第 \(t\) 个 token 时只能条件化于左侧上下文。先生成推理链相当于给后续答案 token 增加了中间计算 scratchpad，使答案可以依赖前面已经写出的局部结果。

从概率分解看，标准 prompting 直接建模：

$$
p_\theta(y\mid x,\mathcal{D}_{std})
$$

CoT 则把最终答案的生成拆成：

$$
p_\theta(z,y\mid x,\mathcal{D}_{cot})=p_\theta(z\mid x,\mathcal{D}_{cot})\cdot p_\theta(y\mid x,z,\mathcal{D}_{cot})
$$

这不是改变模型参数，而是改变条件分布中的可见上下文。直觉上，模型先把“隐式思考”外化为 token 序列，再基于这段序列回答；因此对于多步问题，它获得了更多生成步数来存储中间变量、检查局部关系和执行简单计算。

论文强调 CoT 的收益具有规模依赖。小模型即使看到 CoT 示例，也可能只是生成格式相似但逻辑无效的文字；随着模型规模增大，模型更可能掌握“把问题分解成有效步骤”的模式。实验中，CoT 在 PaLM 540B、GPT-3 175B 等大模型上带来显著提升，尤其是 GSM8K 这类多步数学题；而在较小模型或单步任务上，收益不稳定甚至可能很小。

CoT 的另一个重要贡献是把推理 prompting 从数学题扩展到了更广任务。论文展示了常识问答、StrategyQA、日期理解、体育语义判断、最后字母拼接、硬币翻转状态跟踪、SayCan 机器人规划等示例。这说明“中间自然语言步骤”不只服务算术计算，也能表达实体属性比较、时间偏移、状态奇偶性、字符串操作和行动计划。

与微调 rationale 模型相比，CoT 的成本非常低。它只需要少量手写 exemplar，不需要为每个任务收集大规模推理标注，也不需要训练新 checkpoint。与普通 few-shot prompting 相比，它提供了更强的任务归纳偏置：模型不仅看到答案格式，还看到答案生成过程。代价是上下文更长、推理链可能不忠实、错误步骤可能诱导错误答案，并且对模型规模和 exemplar 质量敏感。

> ⚠️ 注意：CoT 生成的文字推理不等于模型内部真实因果机制的完整解释。它是有用的可见中间表示，能提升和诊断推理，但仍可能出现“看似合理但答案错误”或“推理有瑕疵但答案碰巧正确”的情况。

#### 🧪 练习题
```yaml
question: "Chain-of-Thought Prompting 相比标准 few-shot prompting 的关键变化是什么？"
options:
  - "在训练集中加入更多无标签文本"
  - "在示例答案前加入自然语言中间推理步骤"
  - "把最终答案隐藏起来，只训练模型生成解释"
  - "要求模型调用外部计算器完成所有推理"
answer: 1
explain: "CoT 将示例从输入-输出对扩展为输入-中间推理-输出三元组，诱导模型测试时先生成推理链再给最终答案。"
```
