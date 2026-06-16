### ReAct：推理与行动协同 (ReAct)

```yaml
id: react
name: ReAct
full_name: 推理与行动协同 (ReAct)
year: 2022
org: Google/普林斯顿
paper_url: https://arxiv.org/abs/2210.03629
category: planning
parent: cot
motivation: 交替执行推理与行动支持动态环境
```

#### 📝 一句话总结

ReAct 提出让语言模型在同一条轨迹中交替生成 `Thought` 与 `Action`，解决纯 Chain-of-Thought 不能接入外部世界、纯行动模型缺少高层规划和可解释记忆的问题。它把“推理指导行动”和“行动反馈修正推理”闭环到提示式 agent 中，使 LLM 能在问答、事实验证、文字环境和网页购物等动态任务中边查、边想、边做。

#### 🎯 核心要点

- 统一轨迹格式：将自由文本推理痕迹、任务动作、环境观测组织为 `Thought -> Action -> Observation` 的交错序列
- 核心机制：推理痕迹用于分解目标、维护工作记忆、更新计划和处理异常，动作调用 Wikipedia API、文本游戏环境或网页环境以获取新观测
- 两类使用方式：知识密集型任务采用密集的思考-行动-观测循环，长时序决策任务采用稀疏推理并让模型在关键步骤自行插入思考
- 关键对比：相对 CoT，ReAct 能通过外部观测减少幻觉和错误传播；相对 Act-only，ReAct 能显式表达目标分解和状态跟踪
- 实验覆盖：HotpotQA、FEVER、ALFWorld、WebShop；在 QA/事实验证上与 CoT 互补，在 ALFWorld 和 WebShop 上用极少样例超过大量监督或强化学习训练的 act-only 基线
- 工程启发：不需要更新模型权重，主要依赖任务动作空间、少量 in-context 示例和可解析的环境返回，因此成为后续工具调用 agent 的基础范式

#### 🔬 深入细节

![ReAct 方法总览](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg_0lCKXSvFq4yyjM5PGdM27OF6LWco9qFGQS1dwa3DtEF8AnAuXg9Q_nPDVyAArYwl9sGsB000-iuKJuSsNjo--fi1ZCJbrj-KwsZ6M569nWg-h2xRGHkdvQobUY9RiIr4MYkathIFyiAHZSnHAwVUfeijU-tCLyaHRgqXQah1XObtE71a00IbGdywVw/s16000/image1.png)
*图：Google Research 对 ReAct 的模型总览说明，核心区别是让 LM 同时产生内部推理痕迹和面向环境的文本动作。*

ReAct 的出发点是把两条原本分离的路线合并起来。CoT 让模型写出中间推理，但这些推理完全来自模型内部参数，遇到开放世界事实、网页状态或文字游戏状态时容易把错误假设一路传下去；Act-only 方法可以执行搜索、点击、移动、拾取等动作，但通常只是把当前观察直接映射为下一个动作，缺少“为什么这样做”的计划层。ReAct 把二者放进同一个上下文窗口：模型先用自然语言压缩当前目标和不确定性，再选择动作让环境返回新证据，随后用新观测修正下一步推理。

一个 ReAct agent 的上下文可以写成：

$$
c_t = x \oplus (h_1, a_1, o_2) \oplus \cdots \oplus (h_{t-1}, a_{t-1}, o_t)
$$

其中 \(x\) 是任务输入，\(h_t\) 是第 \(t\) 步的 reasoning trace，\(a_t\) 是动作，\(o_t\) 是环境观测。每一步由同一个冻结语言模型根据当前上下文生成推理和动作：

$$
(h_t, a_t) \sim p_\theta(\cdot \mid c_t), \qquad o_{t+1}=\operatorname{Env}(a_t)
$$

随后把 \(h_t\)、\(a_t\)、\(o_{t+1}\) 追加回上下文。这个公式强调 ReAct 不是传统 RL 中通过梯度更新策略参数的算法，而是一种 in-context policy：策略改进发生在上下文状态中，环境反馈通过文本观测改变后续 token 分布。

```python
# ReAct 推理-行动循环伪代码
context = few_shot_react_examples + task_input
observation = initial_observation(task_input)

for step in range(max_steps):
    thought = LM.generate(context, prefix="Thought:")
    action = LM.generate(context + thought, prefix="Action:")

    if action.startswith("Finish["):
        return parse_answer(action)

    observation = environment.step(action)
    context += format_trace(thought, action, observation)

return fallback_answer(context)
```

在 HotpotQA 和 FEVER 这类知识密集型任务中，动作空间通常被设计成 `Search[entity]`、`Lookup[string]`、`Finish[answer]`。例如模型先写出“需要找某人物所属组织”，再调用搜索动作，拿到 Wikipedia 摘要后继续写出“现在要验证第二个实体”，这样查询目标由推理决定，推理证据又由查询结果补充。论文发现 ReAct 单独使用时不一定在所有问答指标上超过 CoT，因为 CoT 的内部知识和多步演算仍然有价值；但 ReAct 与 CoT 结合后能同时利用内部知识与外部检索，在 HotpotQA 和 FEVER 上成为最强的提示式组合。

在 ALFWorld 和 WebShop 这类长时序交互任务中，每一步都写很长的推理会消耗上下文并降低执行效率，因此论文采用稀疏推理：提示样例只在关键节点插入 `Thought`，让模型在需要重新规划、从失败中恢复、解释观测或检查目标进度时再写推理。这个设计体现了 ReAct 的一个重要实践原则：推理不是越多越好，而是要放在能改变动作选择的位置。对文字环境来说，`Thought` 相当于临时工作记忆，记录“已经拿到什么、还缺什么、下一步去哪”；`Action` 则必须满足环境语法，例如 `go to kitchen`、`take apple` 或网页中的搜索、点击、购买。

ReAct 与传统规划或强化学习的差异在于，它没有显式学习状态价值函数，也没有在训练时探索环境获得大规模轨迹，而是借助预训练 LLM 已具备的语言先验来即时构造策略。这个优势使它在少样本设置下非常轻量，但也带来局限：如果动作空间描述不清、环境观测过长、或模型在 `Thought` 中写入错误事实，后续动作仍会被误导。因此 ReAct 的可解释性不仅是展示推理链，更是调试接口：人可以直接检查哪条 thought 引入了错误，并通过编辑提示或加入反馈来改变下一步动作。

> 💡 关键：ReAct 的核心不是“多写一段思考”，而是把思考放在环境交互回路中，使 \(h_t\) 能选择更好的 \(a_t\)，而 \(o_{t+1}\) 又能纠正下一轮 \(h_{t+1}\)。

#### 🧪 练习题

```yaml
question: "ReAct 相比普通 Chain-of-Thought 的关键改进是什么？"
options:
  - "把所有推理步骤隐藏起来，只输出最终答案"
  - "在推理过程中穿插可执行动作，并用环境观测更新后续推理"
  - "通过反向传播持续微调语言模型参数"
  - "只保留搜索动作，完全取消自然语言推理"
answer: 1
explain: "ReAct 的核心是 Thought、Action、Observation 的交替闭环；它仍使用自然语言推理，但推理会被外部环境返回的证据动态修正。"
```
