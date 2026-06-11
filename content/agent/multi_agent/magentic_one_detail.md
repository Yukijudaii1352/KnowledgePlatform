### Magentic-One: 通用多智能体系统 (Magentic-One)

```yaml
id: magentic_one
name: Magentic-One
full_name: 通用多智能体系统 (Magentic-One)
year: '2024.11'
org: Microsoft
paper_url: https://arxiv.org/abs/2411.04468
category: organization
parent: autogen
motivation: 总控协调专才Agent解复杂任务
```

#### 📝 一句话总结
Magentic-One 通过一个负责规划、追踪和重规划的 Orchestrator 协调 WebSurfer、FileSurfer、Coder、ComputerTerminal 等专才 agent，证明了“通用协调者 + 可插拔技能 agent”能够在 GAIA、AssistantBench、WebArena 等异构任务上形成接近 SOTA 的通用多智能体系统。

#### 🎯 核心要点
- 核心角色是 Orchestrator：负责制定计划、维护工作记忆、分配任务、检测卡住并重规划
- 团队成员围绕通用能力拆分：WebSurfer 管网页，FileSurfer 管本地文件，Coder 写代码，ComputerTerminal 执行代码
- 协作不是固定脚本，而是由 Orchestrator 动态路由任务与恢复错误
- 模块化设计允许增删 agent 而无需重新训练整队，强调 generalist system 而非 benchmark-specific pipeline
- 同时发布 AutoGenBench，用于有隔离和重复控制的 agent benchmark 评测
- 论文报告在 GAIA、AssistantBench、WebArena 上达到与 SOTA 统计上接近的表现
- 通过消融与错误分析说明：多 agent 的价值主要来自能力分工、计划恢复与工具隔离，而不是简单并行调用更多 LLM

#### 🔬 深入细节
![Magentic-One 架构示意图](https://ar5iv.labs.arxiv.org/html/2411.04468/assets/x1.png)
*图：Magentic-One 由 Orchestrator 统一调度多个专才 agent，在复杂任务执行中不断计划、分派、检查与重规划。*

```python
# Magentic-One 的外环/内环协作逻辑（按论文方法概括）
def solve(task):
    ledger = Orchestrator.init_ledger(task)
    while not ledger.finished():
        plan = Orchestrator.plan_or_replan(ledger)
        assignee, subtask = Orchestrator.route(plan, ledger)
        observation = assignee.act(subtask)
        ledger.update(observation)
        if ledger.is_stalled():
            Orchestrator.reset_or_recover(ledger)
    return ledger.final_answer()
```

Magentic-One 试图解决一个非常现实的问题：复杂任务往往同时涉及网页查找、本地文件理解、代码执行和中间结果核验，如果仍坚持单体 agent 把所有能力塞进一个 prompt，就会让工具状态、计划更新和错误恢复都变得笨重。

Orchestrator 是整篇论文最重要的设计。它不只是一个简单调度器，而是同时承担 plan、working memory、routing、recovery 四项职责。执行细节交给专才 agent，长期目标与阶段性进度则由总控持续维护。

这也是为什么论文强调 outer loop / inner loop。外环决定大方向与下一阶段子目标，内环让特定 agent 在自己的工具域内行动并返回观察。真正难的地方不是单步工具调用，而是当网页信息不全、文件结构复杂或代码失败时，系统能否诊断问题并重规划。

因此，这篇工作的代表性不只在 benchmark 分数，而在它把 generalist multi-agent system 的最小骨架定义得很清楚：一个能维护任务 ledger 的总控，加上一组可插拔的技能 agent。

> 💡 关键：Magentic-One 的多 agent 不是“让多个模型一起投票”，而是把不同能力边界和任务状态管理显式分离。

> ⚠️ 注意：若总控 ledger 更新不准确，更多专才 agent 反而会放大错误恢复成本。

#### 🧪 练习题
```yaml
question: Magentic-One 中 Orchestrator 的主要职责是什么？
options:
- 只负责执行 Python 代码
- 只在任务开始时生成一次总计划，然后完全退出
- 维护任务状态、分配子任务并在卡住时触发重规划
- 把所有网页内容压缩成单个 embedding
answer: 2
explain: Orchestrator 是持续在线的总控，不仅制定计划，还要追踪进展、路由任务并负责错误恢复。
```
