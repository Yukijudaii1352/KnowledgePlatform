### DAN：无所不能模式 (Do Anything Now)
```yaml
id: dan
name: DAN
full_name: 无所不能模式 (Do Anything Now)
year: '2022'
org: Community
paper_url: https://llm-attacks.org
category: jailbreak
parent: —
motivation: 角色扮演诱导脱离安全约束
```

#### 📝 一句话总结
DAN 是早期社区型越狱提示范式，通过角色扮演和规则重写诱导模型模拟“无约束助手”，暴露了对话式安全约束容易被上层自然语言指令竞争覆盖的问题。

#### 🎯 核心要点
- DAN 不是单篇算法论文提出的训练算法，而是社区传播的角色扮演越狱模板族。
- 核心机制是让模型扮演另一个虚构身份，并声称该身份不受原有安全规则约束。
- 后续研究把 DAN 视为手工越狱基线，用来比较 GCG、AutoDAN、PAIR 等自动化方法。
- “Do Anything Now” 类提示说明 LLM 对系统约束、开发者约束和用户叙事的层级区分仍可能失效。
- 相关实证研究将 DAN 归入 earliest/basic jailbreak community，并分析了其变体扩散和策略演化。

#### 🔬 深入细节
![DAN 社区提示变体图源](https://arxiv.org/html/2308.03825v2/x7.png)
*图：公开研究中对 Basic/DAN 社区提示变体的关系可视化。*

```python
# DAN 类提示的抽象流程，不包含可复用攻击模板
def dan_style_probe(user_goal):
    role_frame = create_hypothetical_unrestricted_role()
    rule_conflict = add_instruction_conflict_with_safety_policy()
    pressure = add_conversation_pressure_or_format_constraint()
    prompt = compose(role_frame, rule_conflict, pressure, sanitize(user_goal))

    response = target_llm(prompt)
    result = policy_judge(response)
    return result
```

DAN 的方法价值不在于复杂算法，而在于揭示一个基础安全缺陷：许多对话模型会把“用户当前给出的角色设定”当成高优先级上下文执行。如果安全训练没有稳固区分系统指令和用户叙事，模型就可能在角色扮演框架下输出原本应拒绝的内容。

从提示结构看，DAN 类变体通常包含三层：首先构造一个虚构角色，其次声明该角色拥有不同规则，最后用格式要求或持续施压让模型维持该角色。这些成分共同制造指令冲突。安全模型如果只学习到表层拒答模板，而没有稳定执行指令层级，就容易在多轮对话中被带偏。

从研究脉络看，DAN 是手工攻击范式，GCG、AutoDAN 和 PAIR 是自动化搜索范式。DAN 依赖人类编写和社区传播；GCG 用梯度近似找 token 后缀；AutoDAN 用遗传算法进化自然语言提示；PAIR 用攻击者 LLM 迭代改写。DAN 因此常被当作“人工提示攻击”的代表基线。

对防御而言，DAN 的教训是仅靠输出过滤不够。模型需要在输入解析阶段识别指令层级冲突，在生成阶段保持系统安全边界，并在多轮对话中不被角色设定覆盖。Self-Reminder、系统提示强化和 guardrails 都是对这类问题的不同修补方向。

#### 🧪 练习题
```yaml
question: "DAN 类越狱提示最核心的机制是什么？"
options:
  - "对模型参数做梯度更新"
  - "通过角色扮演和规则冲突诱导模型忽略安全约束"
  - "使用检索增强生成外部证据"
  - "用困惑度阈值过滤输入"
answer: 1
explain: "DAN 主要依赖自然语言角色设定和指令冲突，不是训练算法，也不是检测器。"
```
