### 推理与行动协同 (ReAct)

```yaml
id: react
name: ReAct
full_name: 推理与行动协同 (ReAct)
year: '2022'
org: Google/普林斯顿
paper_url: https://arxiv.org/abs/2210.03629
category: planning
parent: cot
motivation: 交替执行推理与行动支持动态环境
```

#### 📝 一句话总结

ReAct 提出让语言模型交替生成 Thought、Action 和 Observation，把 CoT 的内部推理与外部环境交互结合起来，缓解纯推理幻觉和纯行动缺乏规划的问题。

#### 🎯 核心要点

- **交错轨迹格式**：用 Thought 推理、Action 调用工具或环境、Observation 接收外部反馈
- **知识密集任务**：在 HotpotQA、Fever 中通过 Wikipedia API 获取事实，降低 CoT 幻觉
- **交互式决策任务**：在 ALFWorld、WebShop 中用语言行动与环境交互
- **稀疏或密集 Thought**：问答任务可密集思考，长动作任务可只在关键节点思考
- **少样本 prompting**：只需少量人工示例即可诱导大模型生成 ReAct 轨迹
- **可解释性增强**：推理、行动、观察都留在日志中，便于诊断失败原因
- **Agent 架构基础**：后续 AutoGPT、ToolLLM、Reflexion、LATS 等都继承或扩展了 ReAct 循环

#### 🔬 深入细节

##### 核心示意图

![ReAct 提示对比图](https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png)
*图：ReAct 与 Standard、CoT、Act-only 的对比。ReAct 通过 Thought 和 Action 的交替，让模型既能推理又能获取外部观察。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# ReAct agent 伪代码
def react_agent(model, question, tools, max_steps=10):
    trajectory = []
    for step in range(max_steps):
        prompt = build_react_prompt(question, trajectory, tools)
        thought, action = model.generate_thought_and_action(prompt)

        if action.name == "Finish":
            return action.answer, trajectory + [(thought, action, None)]

        observation = tools[action.name](**action.arguments)
        trajectory.append((thought, action, observation))

    return model.generate_final_answer(question, trajectory), trajectory
```

##### 方法解读

CoT 只让模型在文本内部推理，因此面对事实密集问题时容易把错误知识写入推理链，并在后续步骤中放大错误。Act-only 只让模型执行动作，缺少显式任务分解和状态总结，容易重复无效动作或无法从观察中抽取关键信息。ReAct 的设计目标是把两者合在一个闭环中。

ReAct 轨迹可以写为 \((h_t, a_t, o_t)_{t=1}^{T}\)，其中 \(h_t\) 是 Thought，\(a_t\) 是 Action，\(o_t\) 是环境 Observation。模型在每一步根据历史轨迹生成新的思考和动作：

$$a_t,h_t \sim p_\theta(\cdot \mid x, h_{<t}, a_{<t}, o_{<t})$$

Action 可以是 `Search[query]`、`Lookup[keyword]`、网页点击、购物操作或文本游戏动作。Observation 由外部环境返回，重新进入上下文。

Thought 的作用不是装饰性解释，而是为下一步行动提供中间状态管理。例如模型可以写下“我需要先找 X，再找 Y”，也可以在观察不满足预期时改写计划。对于长交互任务，Thought 还承担压缩历史和避免迷失目标的作用。

ReAct 的另一个关键收益是减少幻觉。模型不必完全依赖参数记忆，而是可以通过工具获取新证据。若搜索结果显示某条路径不对，后续 Thought 可以修正计划。这个反馈闭环让语言模型更像 agent，而不只是一次性文本生成器。

与传统强化学习 agent 相比，ReAct 不训练策略网络，也不需要环境奖励梯度；它用少样本示例把“推理 + 行动”的格式教给 LLM。优势是实现简单、迁移快；不足是搜索空间仍由单条轨迹主导，早期错误可能让后续步骤偏离，因此后续 LATS 把 ReAct 扩展为树搜索。

> ⚠️ 注意：ReAct 的 Action 必须绑定可执行工具或环境接口。只有 Thought 而没有真实 Observation，就会退化为普通 CoT。

#### 🧪 练习题

```yaml
question: "ReAct 相比纯 CoT 的关键改进是什么？"
options:
  - "完全取消中间推理步骤"
  - "在推理过程中插入可执行 Action，并用 Observation 更新后续推理"
  - "只用多数投票选择答案"
  - "把所有任务转成监督微调数据"
answer: 1
explain: "ReAct 的核心是 Thought-Action-Observation 循环，模型可以边推理边调用外部环境获取反馈。"
```
