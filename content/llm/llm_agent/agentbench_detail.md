### AgentBench：智能体基准 (AgentBench)

```yaml
id: agentbench
name: AgentBench
full_name: 智能体基准 (AgentBench)
year: 2024
org: 清华大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/e9df36b21ff4ee211a8b71ee8b7e9f57-Abstract-Conference.html
category: benchmark
parent: api_bank_bench
motivation: 涵盖8个交互环境的综合评测
```

#### 📝 一句话总结

AgentBench 提出了一个面向 LLM-as-Agent 的交互式综合基准，用 8 个真实或半真实环境统一检验模型在多轮观察、规划、行动和纠错中的能力。它解决了传统 NLP 静态题目无法衡量智能体执行能力的问题，并通过加权总分和失败类型分析揭示了商业模型与开源模型之间的明显差距。

#### 🎯 核心要点

- 提出 8 个环境的多维智能体评测：Operating System、Database、Knowledge Graph、Digital Card Game、Lateral Thinking Puzzles、House-holding、Web Shopping、Web Browsing。
- 将 LLM-as-Agent 评测形式化为部分可观测马尔可夫决策过程，模型需要基于任务指令和历史观察连续输出 Thought 与 Action。
- 覆盖三类 grounding：代码环境、游戏环境、网页环境，避免只在单一问答或单一工具调用场景中评估智能体。
- 使用环境专属指标并汇总为总体 OA 分数，包括成功率、F1、胜率、网页逐步成功率等。
- 提出按任务平均难度归一化的加权总分，降低高分任务对总体排名的支配。
- 系统分析五类执行结局：Complete、Context Limit Exceeded、Invalid Format、Invalid Action、Task Limit Exceeded。
- 对 29 个 API 商业模型与开源模型评测，发现 GPT-4 等商业模型显著领先，但仍远未达到通用可用智能体水平。
- 失败分析显示 TLE 和重复行动是主要瓶颈，指向长期推理、决策、指令遵循和自我纠错能力不足。

#### 🔬 深入细节

![AgentBench 八环境总览](https://arxiv.org/html/2308.03688v3/x3.png)
*图：AgentBench 将 LLM-as-Agent 放入 8 个交互环境中评测，覆盖代码、游戏和网页三类 grounding。*

AgentBench 的核心不是给模型一道静态题，而是让模型进入环境并持续交互。论文把交互评测定义为一个 POMDP：

$$
(S, A, T, R, U, O)
$$

其中 \(S\) 是环境状态，\(A\) 是动作空间，\(T:S\times A\to S\) 是状态转移函数，\(R\) 是奖励或判分函数，\(U\) 是任务指令空间，\(O\) 是模型可见的观察空间。LLM agent 只能看到任务描述、历史交互和当前观察，因此它必须在部分信息下计划下一步动作，而不是只从题面直接预测答案。

```python
# AgentBench 交互式评测伪代码
ENVIRONMENTS = [
    "os", "database", "knowledge_graph", "digital_card_game",
    "lateral_thinking_puzzle", "house_holding", "web_shopping", "web_browsing",
]

for env in ENVIRONMENTS:
    scores = []
    for task in env.test_set:
        obs = env.reset(task)
        history = [task.instruction, obs]
        status = "Task Limit Exceeded"

        for step in range(task.max_rounds):
            response = llm.generate(format_prompt(history))

            if not follows_required_format(response):
                status = "Invalid Format"
                break

            thought, action = parse_thought_and_action(response)
            if not env.is_valid_action(action):
                status = "Invalid Action"
                break

            obs, done, raw_score = env.step(action)
            history.extend([response, obs])

            if context_too_long(history):
                status = "Context Limit Exceeded"
                break
            if done:
                status = "Complete"
                scores.append(env.metric(raw_score))
                break

        if status != "Complete":
            scores.append(0.0)

    env_score[env] = mean(scores)

overall_score = mean(weight[env] * env_score[env] for env in ENVIRONMENTS)
```

8 个环境的设计体现了论文对“智能体能力”的拆解。OS 和 Database 考察模型能否在可执行系统中完成任务，例如写 shell 命令、操作真实数据库、提交最终答案；Knowledge Graph 用大规模 Freebase 风格接口检验不完全观察下的信息检索和路径推理；Digital Card Game 要求理解规则并制定策略；Lateral Thinking Puzzles 要求在主持人只回答 yes/no/irrelevant 的场景中逐步缩小假设空间；House-holding 使用 ALFWorld 类文本化具身环境；Web Shopping 与 Web Browsing 则将模型放入网页任务，检验搜索、点击、选择、输入和多步导航能力。

AgentBench 的一个关键工程选择是统一交互协议而不统一任务指标。不同环境的“成功”含义并不相同：OS 和 Database 可以用最终状态或答案成功率，Knowledge Graph 使用答案 F1，Digital Card Game 使用胜率，Web Browsing 更关注元素选择与动作匹配。论文没有强行把所有环境改写成同一种问答格式，而是保留每个环境的自然判分方式，再用总体分数做跨环境比较。

总体分数的设计是为了避免简单平均带来的偏差。若某个任务天然更容易，所有模型都能拿较高分，它会在朴素平均中占据过大权重；若某个任务很难，低分差异反而被淹没。论文先统计每个环境在已评测模型上的平均分 \(\bar{s}_e\)，再用其倒数作为固定权重：

$$
w_e = \frac{1}{\bar{s}_e}
$$

对模型 \(M\) 的环境分数 \(s_e(M)\)，总体分数可写成：

$$
\mathrm{OA}(M)=\frac{1}{|E|}\sum_{e\in E}w_e\,s_e(M)
$$

这个机制的直觉是“越难普遍得分越低的环境，单位提升越应该被看见”。因此 AgentBench 的 OA 不是绝对能力分，而是一个跨环境归一化后的比较分，适合给不同模型排序，但解释时必须回到各环境子分数。

AgentBench 还强调失败类型比总分更有诊断价值。论文把非正常结束分为 Context Limit Exceeded、Invalid Format、Invalid Action 和 Task Limit Exceeded。Invalid Format 通常说明模型没有遵守协议，例如数据库或卡牌环境中输出格式稍错就无法执行；Invalid Action 表示格式正确但动作不在环境动作空间内，例如 House-holding 中尝试不存在的动作；TLE 则是最常见且最有代表性的失败，因为它意味着模型在多轮中没有真正推进任务。

对 TLE 的深入分析揭示了循环和重复是长期交互中的核心问题。论文将导致 TLE 的轨迹集合记为 \(\mathcal{T}\)，每条轨迹包含模型多轮响应 \((r_1,r_2,\ldots,r_m)\)，并统计最后 \(n\) 轮中是否存在两轮回复的 Rouge-L 相似度超过阈值 \(t\)：

$$
P(n,t)=\frac{\left|\{(r_1,\ldots,r_m)\in\mathcal{T}\mid \exists i,j,\ m-n<i<j\le m \land \mathrm{RougeL}(r_i,r_j)\ge t\}\right|}{|\mathcal{T}|}
$$

论文发现大量 TLE 轨迹在最后若干轮高度重复，说明许多 LLM 并不是“差一步完成”，而是在状态估计、计划更新或失败恢复上陷入循环。这也是 AgentBench 相比静态 QA 更有价值的地方：它能暴露模型在执行层面的脆弱性。

从结果看，AgentBench 不是只证明 GPT-4 更强，而是给出了更细的能力画像。商业 API 模型总体领先，开源模型在 Knowledge Graph、Digital Card Game 和 House-holding 等环境中更容易失败；代码训练对 Web Shopping 等流程化任务有帮助，但在需要一般策略推理的任务上可能出现副作用；高质量多轮对齐数据能提升智能体表现。这些结论共同说明，智能体能力不是单一的“会推理”或“会写代码”，而是格式遵循、状态追踪、工具使用、长期规划和纠错机制的组合。

> 💡 关键：AgentBench 的创新在于把 LLM 评价从“答题正确率”推进到“环境中能否完成任务”，并用失败轨迹解释模型为什么不能完成任务。

#### 🧪 练习题

```yaml
question: "AgentBench 为什么要用每个环境平均分的倒数作为总体分数权重？"
options:
  - "为了让所有模型在每个环境中的原始分数完全相同"
  - "为了降低天然高分任务对总体排名的支配，使困难环境中的提升更可见"
  - "为了只保留 Web Browsing 这类网页任务的影响"
  - "为了把所有失败类型都转换成 Rouge-L 分数"
answer: 1
explain: "论文认为不同环境难度差异很大，朴素平均会被容易任务支配；用环境平均分倒数加权可以让跨环境比较更公平。"
```
