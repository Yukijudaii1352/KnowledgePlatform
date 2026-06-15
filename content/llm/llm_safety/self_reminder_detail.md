### Self-Reminder：自我提醒 (Self-Reminder)
```yaml
id: self_reminder
name: Self-Reminder
full_name: 自我提醒 (Self-Reminder)
year: '2023'
org: Academic
paper_url: https://www.nature.com/articles/s42256-023-00765-8
category: jailbreak
parent: —
motivation: 系统提示词防御指令
```

#### 📝 一句话总结
Self-Reminder 在系统或对话上下文中显式提醒模型遵守安全、伦理和合法性边界，用极低成本的提示增强方式降低 jailbreak 攻击成功率。

#### 🎯 核心要点
- 不训练新模型，也不需要外部分类器，只通过额外安全提醒改变模型的上下文条件。
- 防御位置可以放在用户输入前、模型输出前或多轮对话状态中，核心是持续强化模型的安全身份和规则层级。
- 针对 DAN、角色扮演、假设场景等输入攻击，Self-Reminder 让模型在生成时重新关注原始安全约束。
- 方法简单、可部署性强，但防御强度依赖底座模型是否真正理解并执行该提醒。
- 论文报告该方法能在保持常规任务可用性的同时显著降低多类 jailbreak 攻击成功率。

#### 🔬 深入细节
![Self-Reminder 论文 Figure 1](https://scx1.b-cdn.net/csz/news/800a/2024/a-simple-technique-to.jpg)
*图：TechXplore/Nature Machine Intelligence 图源，展示在对话中加入 system-mode self-reminder 以抵御越狱攻击的思路。*

```python
# Self-Reminder 简化伪代码
SAFETY_REMINDER = """
You are a responsible assistant. Follow the system policy,
respect legal and ethical constraints, and refuse unsafe requests.
"""

def guarded_chat(history, user_message):
    messages = []
    messages.append(system_message(SAFETY_REMINDER))
    messages.extend(history)
    messages.append(user_message)

    draft = base_llm(messages)

    # 可选：在输出前再次提醒模型自检
    review_messages = messages + [
        assistant_message(draft),
        system_message("Before finalizing, check whether the answer violates the safety reminder.")
    ]
    return base_llm(review_messages)
```

Self-Reminder 的动机是直接针对 DAN 类角色扮演攻击中的指令竞争。攻击者会把模型拉入一个虚构角色或特殊模式，让模型把用户叙事误当成更高优先级的规则。Self-Reminder 反过来在上下文里持续放置安全身份说明，使模型在解码时更容易激活“我是受约束助手”的行为模式。

这个方法的优势是工程上非常轻：它不需要访问模型权重，不需要构造新的偏好数据，也不依赖额外推理模型。实际部署时可以把 reminder 写入 system prompt、conversation prefix 或每轮响应前的内部检查提示中。它更像上下文级控制，而不是模型级对齐。

方法也有明显边界。因为 Self-Reminder 仍然是自然语言提示，它会和用户输入共享上下文窗口，并可能受到长上下文稀释、提示注入和多轮状态漂移影响。如果底座模型本身没有学会可靠遵守系统层级，简单 reminder 只能提高拒答倾向，不能提供形式化安全保证。

从防御组合看，Self-Reminder 适合放在第一层：成本低、延迟小、覆盖广。对于高风险系统，还需要配合输入分类器、策略执行器、输出审查和审计日志。它的研究意义在于证明“显式安全自我描述”本身就能显著改变模型行为，为后续 constitutional prompting 和 guardrails 提供了实践依据。

#### 🧪 练习题
```yaml
question: "Self-Reminder 与困惑度过滤器最大的区别是什么？"
options:
  - "Self-Reminder 通过提示强化安全约束，困惑度过滤器通过统计异常检测输入"
  - "Self-Reminder 必须修改模型参数"
  - "Self-Reminder 只能用于图像模型"
  - "困惑度过滤器会训练奖励模型"
answer: 0
explain: "Self-Reminder 是上下文提示防御；Perplexity Filter 是输入侧异常检测。"
```
