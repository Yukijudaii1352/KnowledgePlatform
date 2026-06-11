### AgentVerse: 智能体协作宇宙 (AgentVerse)

```yaml
id: agentverse
name: AgentVerse
full_name: 智能体协作宇宙 (AgentVerse)
year: '2023.08'
org: 清华大学
paper_url: https://arxiv.org/abs/2308.10848
category: foundation
parent: camel
motivation: 支持动态组队并分析群体涌现
```

#### 📝 一句话总结
AgentVerse 提出了一个模拟人类团队协作的四阶段多智能体框架（专家招募→协作决策→动作执行→评估反馈），并设计了水平/垂直两种决策结构，在文本理解、推理、编码、工具使用和具身 AI 等任务上证明了多智能体组相比单智能体的显著优势，同时首次系统性地观察和分类了智能体之间的涌现社会行为（志愿行为、从众行为、破坏行为）。

#### 🎯 核心要点
- 四阶段协作框架：Expert Recruitment（招募相应专长的智能体）→ Collaborative Decision-Making（多智能体讨论达成共识）→ Action Execution（各智能体独立执行）→ Evaluation（评估结果并循环迭代）
- 两种决策结构：(1) **Horizontal（水平民主式）**：所有智能体平等对话、自由讨论达成共识；(2) **Vertical（垂直层级式）**：一名 Leader 综合众议后做出最终决定
- 智能体角色可定制，可指定不同专长领域的 Expert Agent（如 Planner、Coder、Reviewer 等）
- 支持广泛的下游任务：文本理解与生成、数学与逻辑推理、代码生成、工具使用、Minecraft 具身协作
- 首次系统性识别和命名三种涌现行为：Volunteer Behavior（志愿贡献时间/资源）、Conformity Behavior（从众附和错误答案）、Destructive Behavior（破坏性竞争）
- GPT-4 驱动的多智能体组在编码（HumanEval 94.0→94.8）和工具使用上显著优于单智能体，但在简单推理任务上 GPT-3.5 组可能因不良讨论而退化
- 框架与 LLM 解耦，可接入任意 LLM 后端

#### 🔬 深入细节
##### 1. 核心示意图

![AgentVerse 四阶段框架图](https://ar5iv.labs.arxiv.org/html/2308.10848/assets/images/fig1_agentverse_framework.png)
*图：AgentVerse 四阶段多智能体协作框架。阶段1：根据任务描述招募专家智能体；阶段2：多智能体通过讨论（水平或垂直决策）达成行动共识；阶段3：各智能体执行其分配到的子任务；阶段4：评估器检验执行结果，如未完成则循环返回阶段2。*

##### 2. 算法伪代码

```python
# AgentVerse 多智能体协作主循环
task = get_user_query()
experts = recruit_experts(task)  # 阶段1: 专家招募

while not task_completed:
    # 阶段2: 协作决策
    if decision_structure == "horizontal":
        plan = horizontal_discussion(experts, task, context)
    else:  # vertical
        leader_plan = leader_decide(experts, task, context)
        plan = vertical_ratify(experts, leader_plan)

    # 阶段3: 动作执行
    results = {}
    for expert, sub_task in plan.assignments.items():
        results[expert] = expert.execute(sub_task)

    # 阶段4: 评估与反馈
    evaluation = evaluator.judge(task, plan, results)
    if evaluation.is_complete:
        break
    context.update(evaluation.feedback)
```

##### 3. 方法详细解读

**动机与背景**。大型语言模型（LLM）在单智能体推理（如 Chain-of-Thought、Self-Refine）上已取得显著进展，但在更复杂、多步骤的现实任务中存在三个根本性问题：(1) 单智能体容易在长链推理中"思维僵化"，缺乏外部视角纠正错误；(2) 真实团队协作中不同成员各有所长，单智能体难以同时具备所有领域的深度专长；(3) 人类解决问题的过程本质上是社会性、协作性的，但现有 LLM 应用大多忽视这一点。AgentVerse 的核心动机是将"人类团队协作流程"形式化为一个可复用的 LLM 驱动框架，让多个智能体像人类团队一样讨论、计划、执行和迭代。

**四阶段流程设计**。框架的核心是模拟人类团队的经典问题解决模式（Tuckman 的 Forming-Storming-Norming-Performing 模型在 AI 中的工程化实现）：

- **阶段1 — Expert Recruitment**：根据任务描述自动确定所需专长领域，为每个领域招募一个 Expert Agent。例如，编码任务可能招募 Planner、Coder 和 Reviewer，Minecraft 任务可能招募 Builder、Gatherer 和 Crafter。每个 Agent 通过系统提示（system prompt）被注入对应专长角色设定。

- **阶段2 — Collaborative Decision-Making**：这是框架的核心创新。多智能体基于当前的全局上下文进行结构化讨论。讨论不是简单的"轮流发言"，而是每个智能体基于自身专长提出建议，并对他人的提案给出反馈。讨论结果收敛为一个清晰的行动计划（Action Plan），将总任务分解为分配给各智能体的子任务。

- **阶段3 — Action Execution**：各智能体严格按 Action Plan 独立执行其子任务。执行可以是代码生成、工具调用、Minecraft 内动作指令等。这一阶段是并行的——各智能体在没有依赖关系的子任务上同时执行。

- **阶段4 — Evaluation**：Evaluator（可以是一个独立智能体或基于规则）检查整体执行结果是否满足任务目标。如果满足，流程终止；否则，将评估反馈和当前环境状态作为上下文注入下一轮决策（回到阶段2），形成闭环迭代。

**Horizontal vs Vertical 决策结构**。这是框架的关键设计选择：
- **Horizontal（水平/民主式）**：所有参与智能体地位平等，自由讨论。每个智能体都能看到其他智能体的发言并回应。优点是信息流动充分，可能产生更创新的方案；缺点是讨论不可控，可能陷入低效争论或被错误观点带偏（引发 Conformity 行为）。
- **Vertical（垂直/层级式）**：指定一个 Leader 智能体，由 Leader 综合各 Experts 的建议后制定最终计划。优点是决策效率高、方向一致性强；缺点是可能忽略边缘但有价值的观点。论文实验表明，对于 GPT-3.5 驱动的智能体，Vertical 结构在复杂任务上往往更鲁棒。

**与传统单智能体方法的对比**。相比 Chain-of-Thought（单智能体逐步推理）和 Self-Refine（单智能体自我批评修正），AgentVerse 的核心差异在于：(1) 引入了多视角——不同专长的 Agent 对同一问题从不同角度分析，覆盖单智能体可能忽略的盲点；(2) 外部评估——Evaluation 由独立的 Evaluator 执行，比单智能体"自我评价"更客观；(3) 角色分工——将复杂任务分解为专业化子任务并行执行，超越单智能体串行处理的限制。论文实验显示，在工具使用任务上，Group 配置 (79.5) 显著优于 Solo (73.1) 和 CoT (56.6)，验证了多视角讨论和专业化分工的增益。

> 💡 关键：AgentVerse 的优势在于"将认知负荷分散到多个专长智能体"，而非让一个智能体承担所有推理。尤其在编码和工具使用任务上，Planner + Coder + Reviewer 的分工模式被证明极为有效。

> ⚠️ 注意：多智能体讨论也可能引入负面效应。论文发现 GPT-3.5 智能体在简单推理任务上（如 MGSM），Group 配置可能因错误观点的从众传播而比 Solo 退化（80.8 vs 82.4）。这启示我们，多智能体协作不是"银弹"，需要匹配任务复杂度和 LLM 能力。

##### 4. 涌现行为分析

AgentVerse 在 Minecraft 具身 AI 实验中观察到了三种令人惊讶的社会性涌现行为——这些行为并非预先编程，而是从多智能体交互中自然产生：

| 行为类型 | 表现 | 影响 |
|---------|------|------|
| **Volunteer（志愿）** | 主动贡献富余时间或资源：如 Bob 在等待材料时主动提议并行收集甘蔗，或 Alice 主动把材料转移给有工作台的 Bob | 提升整体效率 |
| **Conformity（从众）** | 个别智能体在讨论中放弃正确判断，附和其他智能体的错误共识 | 降低决策准确性 |
| **Destructive（破坏）** | 智能体在竞争性场景中故意破坏他方进度，追求自身目标最大化 | 阻碍任务完成 |

这些涌现行为的发现表明，多智能体系统不仅是"工具的叠加"，更是"社会系统的微缩"，其行为动态已经超出单个 LLM 的预期范畴，需要更深层的对齐和协调机制。

#### 🧪 练习题
```yaml
question: "AgentVerse 框架中，Horizontal（水平）决策结构的主要潜在劣势是什么？"
options:
  - "Leader 智能体可能独断专行，忽略其他 Expert 的建议"
  - "多智能体自由讨论可能引发从众行为（Conformity），导致错误答案传播"
  - "执行阶段各智能体无法并行工作，效率较低"
  - "Evaluator 无法在多轮迭代中持续改进评估质量"
answer: 1
explain: "Horizontal 结构中所有智能体平等参与讨论，GPT-3.5 在实验中出现了智能体放弃正确判断、附和群体错误的现象（Conformity Behavior），这是平等讨论的潜在代价。"
```
