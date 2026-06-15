### SayCan — 用机器人可执行性约束语言模型规划

```yaml
id: "saycan"
name: "SayCan"
full_name: "语义接地机器人 (Do As I Can, Not As I Say)"
year: "2022"
org: "Google"
paper_url: "https://say-can.github.io/"
category: "task_planning"
parent: "—"
motivation: "LLM语义概率接地机器人技能"
```

#### 📝 一句话总结

SayCan 提出把 LLM 对“下一步是否有助于任务”的语义概率与机器人技能 value function 对“当前状态是否能执行”的 affordance 概率相乘，从而让语言模型生成既合理又可执行的长程机器人计划。

#### 🎯 核心要点

- **Say + Can 双重接地**：LLM 负责高层任务语义，机器人技能 value function 负责物理可执行性。
- **候选技能约束解码**：LLM 不自由生成任意句子，而是在预定义低层技能描述集合上打分。
- **概率乘积选择动作**：每一步选择 \(p_{\text{LM}}(\text{skill}|\text{instruction}) \cdot p_{\text{VF}}(\text{success}|\text{state},\text{skill})\) 最高的技能。
- **迭代式计划生成**：执行一个技能后，把结果追加到上下文，再重新评分下一步，直到选择 done。
- **语言条件技能库**：低层技能通过 BC-Z 行为克隆或 MT-Opt 强化学习训练，value function 作为 affordance 估计器。
- **真实厨房机器人评估**：在 101 个真实移动操作任务上验证长程抽象指令执行能力，并展示 affordance grounding 的必要性。

#### 🔬 深入细节

##### 框架图

![SayCan 框架图](https://ar5iv.labs.arxiv.org/html/2204.01691/assets/figures/vfs_llm_all.png)
*图：SayCan 同时读取 LLM 对候选技能的任务相关性和 value function 对候选技能的可执行性，乘积得分最高的技能被执行。*

##### 算法伪代码

```python
# SayCan: choose useful AND feasible skills
context = user_instruction
state = robot.observe()

while True:
    best_skill = None
    best_score = -inf
    for skill in skill_library:
        say = LLM.score_next_step(context, skill.language_description)
        can = value_function(skill, state)  # affordance / success probability
        score = say * can
        if score > best_score:
            best_skill, best_score = skill, score

    if best_skill.name == "done":
        break

    result = best_skill.policy.execute(state)
    context += f"\nRobot did: {best_skill.language_description}"
    state = robot.observe()
```

##### 方法拆解

纯 LLM 知道很多日常任务步骤，但不知道当前机器人有什么技能、场景里有什么物体、某个动作此刻是否可行。例如“清理洒出的饮料”时，语言模型可能建议使用吸尘器；对人类文本世界合理，对没有吸尘器技能的移动操作机器人却不可执行。SayCan 的核心是将语言模型约束到机器人技能集合，并用 value function 过滤掉当前状态下不可行的技能。

论文把每个低层技能 \(c_i\) 表示为自然语言描述、控制策略和 value function。LLM 输出该技能作为下一步对任务是否有帮助的概率 \(p_{\text{LM}}(c_i|I)\)，value function 输出该技能在当前状态 \(s\) 下成功的概率 \(p_{\text{VF}}(c_i|s)\)。SayCan 使用乘积作为最终得分：

$$\operatorname{score}(c_i)=p_{\text{LM}}(c_i|I)\cdot p_{\text{VF}}(c_i|s)$$

这个公式的直觉很直接：只“会说”不够，动作必须对任务有用；只“能做”也不够，动作必须推进当前指令。乘积会惩罚任一侧很低的技能。

SayCan 的规划不是一次性输出完整计划，而是闭环迭代。每执行一个技能，机器人重新观察环境，value function 重新评估可行性，LLM 上下文中也加入已执行步骤。这样它能处理状态依赖的任务顺序，例如先找到物体再拿起，先拿起再放置，完成后选择 done。

低层技能由已有机器人学习方法训练。行为策略可来自 BC-Z，多任务 value function 可来自 MT-Opt。技能描述用语言嵌入条件化，因此同一个策略网络可以覆盖多种 pick/place/open/close/navigate 技能族。LLM 负责组合这些技能，而不直接输出连续控制。

与 Code as Policies 相比，SayCan 更保守：它不让 LLM 生成任意程序，而是在封闭技能库上做概率选择，因此安全性和可执行性更容易控制。与传统符号规划相比，它无需完整手写 PDDL domain，而是把 LLM 的常识作为高层任务模型，把 value function 作为环境与机器人能力模型。

> 💡 关键：SayCan 的创新不是“让 LLM 控机器人”，而是给 LLM 的每个候选动作加上当前机器人可执行性的概率门控。

#### 🧪 练习题

```yaml
question: "SayCan 选择下一步技能时为什么要把 LLM 分数和 value function 分数相乘？"
options:
  - "为了让计划更长"
  - "为了同时要求技能对任务有用且在当前状态可执行"
  - "为了训练语言模型参数"
  - "为了把自然语言翻译成 PDDL"
answer: 1
explain: "LLM 分数表示语义有用性，value function 表示物理可行性。乘积会过滤掉只合理但不可执行、或可执行但无关的技能。"
```
