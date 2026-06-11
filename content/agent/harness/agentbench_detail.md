### AgentBench: 智能体评测基准 (AgentBench)

```yaml
id: agentbench
name: AgentBench
full_name: 智能体评测基准 (AgentBench)
year: '2023.08'
org: 清华大学
paper_url: https://arxiv.org/abs/2308.03688
category: foundation
parent: —
motivation: 首次系统评测LLM作为交互Agent
```

#### 📝 一句话总结
AgentBench 提出了首个多维度的 LLM-as-Agent 交互式评测基准，涵盖 8 类环境（代码/游戏/Web）共 3 种交互基底，系统评估了 27 个 LLM 的推理与决策能力，揭示了顶级商业模型与开源模型之间在自主代理任务上的显著性能差距。

#### 🎯 核心要点
- 提出 **AgentBench** 基准，由 **8 个交互式环境** 组成，分为三类：Code（OS、Database、Knowledge Graph）、Game（Digital Card Game、Lateral Thinking Puzzles、House-Holding）、Web（Web Shopping、Web Browsing）
- 评估了 **27 个 LLM**，包括 API-based 商业模型（GPT-4、Claude 等）和开源模型（LLaMA-2、CodeLlama、Vicuna 等）
- 将 LLM-as-Agent 评估形式化为 **部分可观测马尔可夫决策过程（POMDP）**，定义 5 种执行结果：Completed、Context Limit Exceeded、Invalid Format、Invalid Action、Task Limit Exceeded
- 开发了 **统一评估工具包**，支持不同 LLM 在多样化定制代理任务上运行
- 核心发现：**GPT-4 在 8 个环境中的 6 个上表现最优**，开源模型平均分 0.51 vs 商业模型 2.15，差距显著
- **Task Limit Exceeded（TLE）** 是失败主因，表明 LLM 的长程推理和决策能力不足
- **代码训练具有双刃剑效应**：在程序化任务（如 Web Shopping）上有优势，但在需要通用推理的任务（如 Digital Card Game）上可能退化
- **高质量对齐数据（如 GPT-4 生成数据）** 能显著提升 Agent 性能，Vicuna-13b 通过 ShareGPT 数据对齐后性能匹敌 3 倍参数的 CodeLlama-34b

#### 🔬 深入细节
##### 1. 框架总览

AgentBench 提出了一个系统性的 LLM-as-Agent 评估框架。该框架将 LLM 作为自主代理置于 8 个不同的交互式环境中，通过与环境的持续交互来评估其推理、决策和指令遵循能力。

![AgentBench 8个环境总览](https://ar5iv.labs.arxiv.org/html/2308.03688/assets/figures/env_overview.png)
*图：AgentBench 的 8 个评估环境，涵盖 Code、Game、Web 三类交互基底*

##### 2. 评估框架形式化

AgentBench 将 LLM-as-Agent 的交互式评估形式化为一个 **部分可观测马尔可夫决策过程（POMDP）**，定义为 \(\langle \mathcal{S}, \mathcal{A}, \mathcal{T}, \mathcal{R}, \mathcal{U}, \mathcal{O} \rangle\)：

- **\(\mathcal{S}\)**：环境状态空间
- **\(\mathcal{A}\)**：动作空间（LLM 可执行的操作）
- **\(\mathcal{T}\)**：状态转移函数 \(\mathcal{T}(s'|s, a)\)
- **\(\mathcal{R}\)**：奖励函数
- **\(\mathcal{U}\)**：LLM 代理的观察空间
- **\(\mathcal{O}\)**：观察函数 \(\mathcal{O}(u|s)\)

在每一轮交互中，LLM 代理接收当前观察文本，生成一个动作（自然语言指令或代码），环境执行该动作并返回新的观察。评测的核心是 LLM 在多轮交互中能否逐步完成目标任务。

```python
# AgentBench 评估循环伪代码
def evaluate_agent(llm, env, max_turns):
    observation = env.reset()
    for turn in range(max_turns):
        action = llm.generate(observation)  # LLM 生成动作
        result = env.step(action)           # 环境执行动作
        if result.status == "Completed":
            return "Success"
        elif result.status in ["Invalid Format", "Invalid Action"]:
            return "Error"
        observation = result.observation
    return "Task Limit Exceeded (TLE)"
```

##### 3. 8 个环境详解

**代码类环境（Code-grounded）**：

1. **Operating System (OS)**：模拟真实 Linux 终端环境。LLM 需要通过执行 bash 命令来完成系统管理任务（如文件操作、进程管理、文本处理等）。测试 LLM 的命令行操作能力和对操作系统概念的理解。

2. **Database (DB)**：模拟关系型数据库操作环境。LLM 需要根据自然语言查询生成正确的 SQL 语句来操作数据库。考验 LLM 将自然语言转译为结构化查询语言的能力，输出格式要求严格。

3. **Knowledge Graph (KG)**：基于知识图谱的查询与推理环境。LLM 需要通过生成 SPARQL/Cypher 等图查询语言来回答问题，测试在结构化知识上的检索和推理能力。

**游戏类环境（Game-grounded）**：

4. **Digital Card Game (DCG)**：模拟数字卡牌对战游戏。LLM 需要在理解复杂的游戏规则后做出策略决策，选择出牌或使用技能。规则说明较长，对指令遵循和策略规划要求极高。

5. **Lateral Thinking Puzzles (LTP)**：横向思维解谜。LLM 需要通过提出是/否问题逐步推理出谜题的答案，考验创造性思维和假设验证能力。

6. **House-Holding (HH)**：模拟家庭场景中的物品整理任务。LLM 需要理解物理常识和空间关系，在交互式环境中将物品放到正确的位置。GPT-4 在此任务上达到了 78% 的成功率。

**Web 类环境（Web-grounded）**：

7. **Web Shopping (WS)**：模拟在线购物环境。LLM 需要根据用户需求在虚拟电商平台上搜索、比较和选择商品，测试多步决策和信息筛选能力。

8. **Web Browsing (WB)**：模拟网页浏览和信息检索。LLM 需要在模拟的网页环境中导航、点击链接、填写表单来完成信息获取任务。

##### 4. 核心发现与分析

**性能差距巨大**：在 AgentBench 整体评分中，API-based 商业模型平均得分 2.15，开源模型仅 0.51。最强开源模型 CodeLlama-34b（0.96 分）仍与 GPT-3.5-turbo 存在明显差距。这与开源模型在其他基准（如 MMLU、HumanEval）上的强劲表现形成鲜明对比，说明 **Agent 能力需要不同于静态基准的评测维度**。

**失败模式分析**（Table 4）：

| 结果类型 | OS | DB | KG | DCG | LTP | HH | WS | WB |
|---------|-----|-----|------|-----|------|-----|-----|-----|
| Completed | 75.0 | 37.9 | 30.1 | 51.2 | 14.0 | 13.1 | 54.9 | 56.6 |
| TLE | 23.9 | 8.0 | **67.9** | 0.0 | **82.5** | 22.1 | 27.8 | 35.0 |
| Invalid Format | 0.0 | **53.3** | 0.0 | 38.5 | 0.0 | 0.0 | 17.2 | 0.0 |
| Invalid Action | 0.9 | 0.0 | 0.0 | 10.2 | 0.0 | **64.1** | 0.0 | 8.4 |

> 💡 关键：**Task Limit Exceeded（TLE）** 在 KG（67.9%）和 LTP（82.5%）中占比极高，表明 LLM 在需要深度推理的任务中容易陷入循环生成或超出交互轮次。**Invalid Format** 在 DB（53.3%）中最为严重，说明格式严格约束是 LLM 的一大弱点。

**代码训练的双刃剑效应**：CodeLlama 系列在程序化任务（Web Shopping）上表现优异，但在需要通用推理的 Digital Card Game 上不如 LLaMA-2 系列。这表明代码语料训练可能强化了模型的过程性思维，但同时弱化了其通用推理的灵活性。

**高质量对齐数据的价值**：Vicuna-13b 与 LLaMA-2-13b 共享相同基座模型，但 Vicuna 通过在 ShareGPT（GPT-4 生成数据）上进行对齐训练，在 AgentBench 上显著优于 LLaMA-2-13b，甚至与 3 倍参数量的 CodeLlama-34b 持平。这证明 **高质量多轮交互对齐数据是提升 LLM Agent 能力的关键路径**。

> ⚠️ 注意：尽管代码训练能提升部分 Agent 任务表现，但其效果因任务类型而异，并非万能策略。在追求 Agent 能力提升时，需要在过程性执行能力和通用推理能力之间寻找平衡。

##### 5. 与先前工作的区别

- vs 传统 NLP 基准（MMLU、HumanEval）：AgentBench 强调**多轮交互**和**环境反馈**，而非单轮静态评估，更贴近真实 Agent 应用场景。
- vs 现有 Agent 评测（WebArena、InterCode）：AgentBench 是首个覆盖 Code/Game/Web 三类环境的**多维度统一评测框架**，且提供了完整的统一评估工具包。
- 评估模式上，AgentBench 将评测对象从"语言模型"转变为"自主代理"，关注的是在不确定环境中的连续决策能力，而非孤立的语言理解或生成能力。

#### 🧪 练习题
```yaml
question: "在 AgentBench 的评估中，导致 LLM Agent 任务失败最普遍的原因是什么？"
options:
  - "Context Limit Exceeded（上下文超限）"
  - "Invalid Format（无效格式）"
  - "Invalid Action（无效动作）"
  - "Task Limit Exceeded（任务轮次超限，即长程推理不足）"
answer: 3
explain: "从 Table 4 的失败原因分布可以看出，TLE 在 KG（67.9%）、LTP（82.5%）等多个环境中占比极高，是导致任务未完成的最普遍原因，反映了 LLM 在多轮交互中长程推理和决策能力的不足。"
```
