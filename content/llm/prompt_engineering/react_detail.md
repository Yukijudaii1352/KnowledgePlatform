### ReAct: 推理行动协同 (ReAct)
```yaml
id: react
name: ReAct
full_name: 推理行动协同 (ReAct)
year: '2022.10'
org: Google/Princeton
paper_url: https://arxiv.org/abs/2210.03629
category: reasoning
parent: cot
motivation: 协同推理与行动调用外部工具
```

#### 📝 一句话总结
ReAct 让语言模型交替生成 Thought、Action 和 Observation，把内部推理与外部工具或环境交互结合起来，解决了纯 CoT 容易幻觉、纯行动策略缺少任务规划的问题。

#### 🎯 核心要点
- 统一 Reasoning traces 与 task-specific actions
- 轨迹格式通常为 Thought → Action → Observation 的循环
- Action 可调用 Wikipedia API、搜索接口、网页环境或文本游戏环境
- Thought 用于分解目标、跟踪状态、修正计划和整合观察
- 在 HotpotQA、Fever、ALFWorld、WebShop 等任务上优于只推理或只行动基线
- 轨迹可解释性强，适合调试 agent 失败原因

#### 🔬 深入细节
![ReAct 与标准 prompting、CoT、Act-only 对比](https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png)
*图：论文 Figure 1，对比 Standard、CoT、Act-only 与 ReAct 在问答和环境任务中的轨迹。图源：ar5iv / arXiv。*

```python
# ReAct agent 推理-行动循环伪代码
def react_agent(lm, tools, task, examples, max_steps=8):
    trajectory = format_examples(examples) + f"\nQuestion: {task}\n"
    for _ in range(max_steps):
        thought_action = lm.generate(trajectory + "Thought:")
        thought, action = parse_thought_and_action(thought_action)
        trajectory += f"Thought: {thought}\nAction: {action}\n"

        if action.name == "Finish":
            return action.argument, trajectory

        observation = tools[action.name](*action.arguments)
        trajectory += f"Observation: {observation}\n"
    return "No answer", trajectory
```

ReAct 的状态可以写为 \(s_t=(x,\tau_{<t})\)，其中 \(x\) 是任务输入，\(\tau_{<t}\) 是已经产生的 thought/action/observation 轨迹。模型在每一步生成：

$$
(\text{thought}_t,\text{action}_t) \sim p_\theta(\cdot \mid x,\tau_{<t})
$$

Action 执行后得到外部观察 \(o_t\)，再追加到上下文中。这样模型不必完全依赖参数记忆回答事实问题，也不必在没有语言规划的情况下盲目探索环境。

纯 CoT 的缺陷是封闭世界：模型只能基于已有知识和上下文推理，遇到事实缺口时容易编造。ReAct 通过 Action 把推理链接到外部信息源，例如先搜索实体，再查找页面，再根据观察更新下一步检索。Thought 的作用是决定“下一步查什么”和“观察意味着什么”。

纯行动方法的缺陷是缺少显式状态抽象。ReAct 的 Thought 能记录目标、已完成步骤、失败原因和替代计划。例如环境返回“物品不在当前位置”时，模型可以在 Thought 中修正路线，而不是继续重复无效动作。

从 prompt engineering 角度看，ReAct 的关键是少样本轨迹示范。示例不只给最终答案，还展示可用动作名、动作参数格式、观察如何进入上下文、何时调用 `Finish`。这使模型学会一个可执行协议，而不是仅学会回答风格。

> 💡 关键：ReAct 把语言模型从“只会续写答案”变成“能维护轨迹并调用环境反馈的控制器”。

#### 🧪 练习题
```yaml
question: "ReAct 中 Observation 的作用是什么？"
options:
  - "替代语言模型参数"
  - "把外部工具或环境返回的信息写回轨迹，供后续推理使用"
  - "保存训练梯度"
  - "随机选择下一个示例"
answer: 1
explain: "Observation 是 Action 执行后的外部反馈，ReAct 将其追加到上下文中以支持下一步 Thought 和 Action。"
```
