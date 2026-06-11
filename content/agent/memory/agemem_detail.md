### AgeMem: 统一短长时Agent记忆 (Agentic Memory)

```yaml
id: agemem
name: AgeMem
full_name: 统一短长时Agent记忆 (Agentic Memory)
year: '2026.01'
org: Wuhan University/Alibaba
paper_url: https://arxiv.org/abs/2601.01885
category: management
parent: memoryos
motivation: 把存取删改忘统一成可学习动作
```

#### 📝 一句话总结
AgeMem 把长期记忆与短期记忆的“存、取、改、删、摘要、过滤”全部纳入同一个 agent policy 中，把记忆管理从外挂 heuristics 变成可学习动作，并通过三阶段渐进式 RL 与 step-wise GRPO 训练出统一的 memory policy。

#### 🎯 核心要点
- 统一管理 LTM 与 STM，不再把长期记忆和上下文管理拆成两个独立模块
- 把记忆操作显式工具化：LTM 对应 Add / Update / Delete，STM 对应 Retrieve / Summary / Filter
- 状态由任务输入、当前上下文与长期记忆库共同组成，动作空间同时包含自然语言生成与 memory operation
- 提出三阶段 progressive RL：先学 LTM 构建，再学 STM 抗干扰控制，最后学二者协同
- 为应对 memory operation 带来的稀疏、断裂奖励，设计 step-wise GRPO 做跨阶段 credit assignment
- 在五个长程 benchmark 与多个 backbone 上持续超过强记忆基线，同时改善长期记忆质量与上下文效率
- 强调不再依赖外部 memory manager 或手写触发规则，而是把记忆管理直接嵌进 agent 决策回路

#### 🔬 深入细节
![AgeMem 统一记忆管理框架](https://ar5iv.labs.arxiv.org/html/2601.01885/assets/x1.png)
*图：论文对比了静态 STM + 触发式 LTM、静态 STM + agent-based LTM，以及 AgeMem 的统一管理范式。*

```python
# AgeMem 的统一记忆策略（按论文方法概括）
for task in tasks:
    ltm = MemoryStore()
    for turn in stage1_dialogue(task):
        action = policy(context=turn.context, ltm=ltm)
        if action.tool in {"Add", "Update", "Delete"}:
            ltm.apply(action)
    stm = reset_context_with_distractors(task)
    for step in stage2_steps(task):
        action = policy(context=stm, ltm=ltm)
        stm = apply_stm_tool(stm, action)
    traj = rollout_final_task(policy, stm, ltm, task)
    stepwise_grpo_update(traj)
```

AgeMem 的出发点，是很多记忆工作虽然都在说“让 agent 记住东西”，但长期记忆与短期记忆往往分开设计，最后再用手写规则拼接。这带来系统复杂、策略不统一与协同差三个问题。

AgeMem 的核心改造是把记忆管理提升为动作空间的一部分。agent 每一步不只会“回答”，还可以调用 Add / Update / Delete / Retrieve / Summary / Filter 等工具，主动决定何时写入长期记忆、何时从长期记忆拉回上下文、何时对当前上下文做摘要或过滤。

训练上最大的难点，是记忆操作的收益往往跨阶段才能体现。论文因此设计三阶段 progressive RL，并用 step-wise GRPO 把跨阶段、断裂式收益传回前面步骤。

这套设计的意义在于，它把 memory problem 从“外挂一个更聪明的 manager”转成“让 agent 自己学会记忆策略”。

> 💡 关键：AgeMem 统一的是决策逻辑，而不是把 LTM 与 STM 混成一个存储结构。

> ⚠️ 注意：step-wise GRPO 解决的是 credit assignment，而不是替代记忆库本身的设计。

#### 🧪 练习题
```yaml
question: AgeMem 相比传统 memory manager 方案的本质变化是什么？
options:
- 把长期记忆完全删除，只保留压缩后的上下文
- 把记忆操作从外部规则改成 agent policy 可选择的工具动作
- 只允许在对话结束后统一写入长期记忆
- 把奖励函数替换成监督微调损失
answer: 1
explain: AgeMem 的关键在于把 Add / Retrieve / Summary 等记忆操作并入动作空间，让 policy 学会何时以及如何管理记忆。
```
