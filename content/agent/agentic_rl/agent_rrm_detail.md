### Agent-RRM: 代理推理奖励模型 (Agent-RRM)

```yaml
id: agent_rrm
name: Agent-RRM
full_name: 代理推理奖励模型 (Agent-RRM)
year: '2026.01'
org: Meituan/CUHK
paper_url: https://arxiv.org/abs/2601.22154
category: reward
parent: istar
motivation: 以推理轨迹批评提供结构化奖励
```

#### 📝 一句话总结
Agent-RRM 将 agent 轨迹的过程监督从“只看最终成败”升级为“显式推理痕迹 + 面向修正的批评 + 整体质量分数”的三层反馈，并系统比较了把这类反馈用于推理时修正、训练时奖励、以及统一联合优化三种路径，最终的 Reagent-U 在 GAIA 和 WebWalkerQA 上都取得了显著增益。

#### 🎯 核心要点
- 提出 Agent-RRM：对整条 agent 轨迹同时产出 reasoning trace、focused critique、overall score 三类结构化反馈
- 设计三种集成策略：Reagent-C 用文本批评做推理期 refinement，Reagent-R 用模型奖励补充规则奖励，Reagent-U 同时融合文本批评与标量奖励
- 训练依赖四类专门构造的数据与两阶段流程，既训练 agent policy，也训练 reasoning reward model
- 支持搜索、网页浏览、代码执行、文件/图像/音频处理等多工具 agent 场景，而不是只做纯文本打分
- 目标不是替代 verifiable reward，而是为长轨迹中的中间推理质量提供更细粒度的过程信号
- 论文在 12 个 benchmark 上做系统评测，报告 Reagent-U 在 GAIA 达到 43.7%，在 WebWalkerQA 达到 46.2%
- 额外分析了统一奖励中 λ 的权衡作用：它决定规则奖励与 Agent-RRM 评分在 RL 更新中的相对占比

#### 🔬 深入细节
![Agent-RRM 与 Reagent 训练框架](https://arxiv.org/html/2601.22154v2/x2.png)
*图：论文将 agent、工具环境与 Agent-RRM 连接起来，比较 Reagent-C、Reagent-R、Reagent-U 三种反馈接入方式。*

```python
# Reagent-U 的核心逻辑（按论文方法概括）
for query in training_set:
    trajectories = [agent.rollout(query, tools) for _ in range(G)]
    rule_rewards = [verifier(traj) for traj in trajectories]
    rrms = [agent_rrm.evaluate(query, traj) for traj in trajectories]
    critiques = [r.critique for r in rrms]
    scores = [r.score for r in rrms]
    rewards = [(1 - lam) * rr + lam * rs for rr, rs in zip(rule_rewards, scores)]
    refined = [agent.refine(traj, critique) for traj, critique in zip(trajectories, critiques)]
    agent.grpo_update(refined, rewards)
```

论文的起点非常明确：现有 Agentic RL 往往只在轨迹结束后给一个 outcome reward，这对长链路、多工具、多跳推理极其粗糙。一个只在最后一步答错的轨迹，与前面就一路错误的轨迹会得到相同的失败信号，导致中间高质量 reasoning 无法被识别，也不利于 agent 学会“哪一步推理已经正确、哪一步才是问题源头”。

Agent-RRM 的核心设计，是让 reward model 不只吐一个分数，而是先“显式想一遍”，再给出可执行的批评文本，最后再输出可用于 RL 的整体标量。这样文字批评负责指出逻辑瑕疵，分数负责进入优化回路，两者互补。

在此基础上，作者比较了三种接法。Reagent-C 更像 inference-time refinement；Reagent-R 把 score 直接并入训练奖励；Reagent-U 则把文本与分数一起利用，既用于局部修正，也用于全局优化。论文的主要结论正是：统一式接入优于单一路径。

从训练实现看，这不是简单地把 step reward 变密，而是通过 reasoning-aware evaluator 对整条轨迹做带解释的过程审查，从而在不完全依赖人工逐步标注的情况下为 agent 提供更高信息量的训练信号。

> 💡 关键：Agent-RRM 的价值不在于“再造一个更强的打分器”，而在于把自然语言批评与数值奖励统一进同一条训练链路。

> ⚠️ 注意：λ 过大时会让模型过分迎合 reward model，过小时又退回纯 outcome reward，二者需要平衡。

#### 🧪 练习题
```yaml
question: Reagent-U 相比 Reagent-C 与 Reagent-R 的关键区别是什么？
options:
- 只使用文本批评做推理期修正
- 只使用标量奖励替代规则奖励
- 同时融合文本批评与标量 reasoning reward 做统一优化
- 完全移除规则奖励，只保留人类偏好对比
answer: 2
explain: Reagent-U 的核心就是把 critique 与 score 两种反馈一起接入 agent 训练，而不是只选其一。
```
