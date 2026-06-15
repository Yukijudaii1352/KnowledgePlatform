### Universal SC: 通用自洽性 (Universal Self-Consistency)
```yaml
id: universal_sc
name: Universal SC
full_name: 通用自洽性 (Universal Self-Consistency)
year: '2023.11'
org: Google
paper_url: https://arxiv.org/abs/2311.17311
category: reasoning
parent: self_consistency
motivation: 扩展自洽性至开放式任务
```

#### 📝 一句话总结
Universal Self-Consistency 用语言模型直接从多个候选回答中选择最一致的一个，解决了标准 Self-Consistency 依赖答案抽取、难以处理开放式生成的问题。

#### 🎯 核心要点
- 先采样多个候选响应，再用 LLM 进行 consistency-based selection
- 不需要正则抽取最终答案，也不要求候选格式完全一致
- 适用于数学推理、代码生成、长上下文摘要、开放式问答等任务
- 在可抽取答案的数学任务上接近标准 Self-Consistency
- 在摘要和 TruthfulQA 等开放任务上提供标准 SC 无法直接使用的聚合方式
- 局限包括候选顺序偏置、长上下文理解压力和“最一致不等于最好”

#### 🔬 深入细节
![Universal Self-Consistency 工作流](https://ar5iv.labs.arxiv.org/html/2311.17311/assets/figs/usc.png)
*图：论文 Figure 1，展示采样多个候选回答并由 LLM 选择最一致响应的流程。图源：ar5iv / arXiv。*

```python
# Universal Self-Consistency 伪代码
def universal_self_consistency(lm, task_prompt, x, n_samples):
    candidates = []
    for _ in range(n_samples):
        candidates.append(lm.generate(task_prompt + format_input(x), temperature=0.7))

    selection_prompt = build_selection_prompt(
        x=x,
        candidates=candidates,
        criterion="Choose the response that is most consistent with the others.",
    )
    chosen_index = lm.generate(selection_prompt)
    return candidates[parse_index(chosen_index)], candidates
```

标准 Self-Consistency 的聚合依赖 \(a_m=\operatorname{extract}(y_m)\)，即从每条推理链中抽取一个可比较的短答案。开放式任务中这个函数很难定义：两个摘要可能都正确但措辞不同，两个实体列表可能部分重叠，代码也可能有不同实现。USC 直接把候选 \(y_{1:M}\) 交给模型判断：

$$
j^\* = \operatorname{LLMSelect}(x, y_1,\ldots,y_M; \text{consistency})
$$

然后输出 \(y_{j^\*}\)。这把“答案规范化和投票”的手工规则替换为模型自己的语义一致性判断。

USC 的动机是，判断候选之间哪一个最符合多数语义，通常比从零生成更容易。候选集中往往已经包含高质量答案，选择器只需要比较它们共享的事实、推理结论或内容覆盖。对于数学题，它可以近似标准 SC；对于开放问答，它可以选择实体覆盖最一致的候选；对于摘要，它可以偏向信息更完整或与多数内容一致的摘要。

方法的一个重要工程点是 selection prompt。候选需要编号，顺序最好随机化或多次重排以减轻位置偏置；标准可以是“most consistent”，也可以针对任务改成“most detailed”“most truthful”等。论文也指出任务特定选择标准可能进一步提升摘要等任务。

USC 的失败模式来自 LLM-as-judge 本身：长候选太多会超过上下文或削弱比较能力；多数一致也可能意味着多数候选共享同一个错误；候选顺序和表述风格可能影响选择。因此 USC 更像一个通用聚合框架，而不是完美验证器。

> 💡 关键：USC 的泛化点在于不再要求答案可被规则抽取，而是让模型在语义层面做一致性选择。

#### 🧪 练习题
```yaml
question: "Universal Self-Consistency 解决了标准 Self-Consistency 的哪类主要限制？"
options:
  - "无法进行梯度更新"
  - "开放式回答难以用规则抽取并精确投票"
  - "不能采样多个候选"
  - "只能使用小模型"
answer: 1
explain: "USC 让 LLM 直接选择最一致候选，避免为每个开放式任务手写答案抽取和匹配规则。"
```
