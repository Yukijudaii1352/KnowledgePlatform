---
domain: agent
topic_id: harness
topic_name: Harness
page_icon: 🧰
page_title: Agent Harness Engineering 技术演进
page_subtitle: '{build_date} 版'
page_desc: 从 WebArena、AgentBench、SWE-bench 的可复现实验环境，到 Codex、Claude Code、GenericAgent、OpenClaw 的执行 harness，再到 Meta-Harness、AHE、Harness-Bench、RHO
  代表的自动优化与诊断范式，系统梳理 Agent 评测 harness、任务环境、自动回归与运行时工程主线。
hero_pills:
- 🏷️ Benchmark · Sandbox · Runtime · Regression
- Codex · Claude Code · OpenClaw · Harness Optimization
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基基准
    color: '#0F766E'
  environment:
    label: 环境与沙箱
    color: '#2563EB'
  evaluation:
    label: 编码回归
    color: '#7C3AED'
  runtime:
    label: 运行时框架
    color: '#EA580C'
  optimization:
    label: Harness 优化
    color: '#DC2626'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/harness/overview/zhihu__智体Harness工程：综述（上）__98a82644/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/harness/latest/zhihu__2026_年，AI_编程_Agent_的真正分水岭——Harness_详解__92263bad/article.md

## 算法演化关系

```yaml
nodes:
- id: webarena
  x: 80
  y: 150
  category: environment
- id: agentbench
  x: 150
  y: 70
  category: foundation
- id: swebench
  x: 260
  y: 290
  category: evaluation
- id: osworld
  x: 400
  y: 150
  category: environment
- id: toolsandbox
  x: 500
  y: 150
  category: environment
- id: swe_verified
  x: 560
  y: 290
  category: evaluation
- id: browsergym
  x: 680
  y: 150
  category: environment
- id: codex
  x: 820
  y: 430
  category: runtime
- id: claude_longrun
  x: 940
  y: 430
  category: runtime
- id: idebench
  x: 1040
  y: 290
  category: evaluation
- id: openai_harness
  x: 1120
  y: 430
  category: runtime
- id: meta_harness
  x: 1200
  y: 570
  category: optimization
- id: harness_design
  x: 1260
  y: 430
  category: runtime
- id: managed_agents
  x: 1360
  y: 430
  category: runtime
- id: genericagent
  x: 1420
  y: 500
  category: runtime
- id: ahe
  x: 1480
  y: 570
  category: optimization
- id: openclaw
  x: 1560
  y: 500
  category: runtime
- id: roadmapbench
  x: 1600
  y: 290
  category: evaluation
- id: harness_bench
  x: 1660
  y: 570
  category: evaluation
- id: codex_safety
  x: 1700
  y: 430
  category: runtime
- id: rho
  x: 1780
  y: 570
  category: optimization
edges:
- from: webarena
  to: osworld
  label: 扩到桌面
- from: webarena
  to: browsergym
  label: 统一接口
- from: agentbench
  to: swebench
  label: 转向代码
- from: agentbench
  to: toolsandbox
  label: 状态工具
- from: swebench
  to: swe_verified
  label: 人工复核
- from: swe_verified
  to: idebench
  label: IDE原生
- from: idebench
  to: roadmapbench
  label: 长程开发
- from: swe_verified
  to: codex
  label: 云端代理
- from: codex
  to: openai_harness
  label: 方法论化
- from: codex
  to: openclaw
  label: 第三方宿主
- from: codex
  to: codex_safety
  label: 规则治理
- from: claude_longrun
  to: harness_design
  label: 三Agent
- from: harness_design
  to: managed_agents
  label: 接口抽象
- from: claude_longrun
  to: genericagent
  label: 密度记忆
- from: openai_harness
  to: meta_harness
  label: 自动搜索
- from: meta_harness
  to: ahe
  label: 闭环进化
- from: ahe
  to: harness_bench
  label: 配置诊断
- from: ahe
  to: rho
  label: 无标自优
milestones:
- webarena
- codex
- rho
```

## 核心算法

### WebArena

```yaml
id: webarena
num: 1
name: WebArena
full_name: 真实网页环境 (WebArena)
year: '2023.07'
org: CMU
parent: —
paper_url: https://arxiv.org/abs/2307.13854
project_url: ''
category: environment
motivation: 把网页任务做成可复现实验环境
```

#### 📝 一句话总结
WebArena 提出了一个**独立的、可自托管的真实 Web 交互环境**和对应的基准测试，通过集成 4 类功能性网站（电商、CMS、社交论坛、地图），使自主 Agent 能够在复杂、长程、动态的真实 Web 任务中进行端到端评估，揭示了当前最强 LLM 代理（GPT-4 + CoT）端到端成功率仅 14.41%，远低于人类 78.24% 的巨大差距。

#### 🎯 核心要点
- **自包含可复现环境**：完全自托管的 Web 环境，包含 4 类真实网站（购物、CMS/Reddit、GitLab、地图），每个网站包含完整用户数据和功能逻辑，可完全本地部署。
- **三类观察空间**：URL、当前页面 HTML（包括文本和图片）、以及 **Accessibility Tree**（含元素 ID，供 Agent 精准定位交互元素）。
- **统一 Action Space**：click、type、hover、press（按键组合）、new_tab、tab_focus、tab_close、goto_page、go_back、go_forward、scroll、stop 共 10+ 种复合操作。
- **812 个任务**：覆盖 3 类任务 — **信息查找 (Information-Seeking)**、**站点导航 (Site Navigation)**、**内容与配置 (Content & Configuration)**；另有 **Unachievable 任务** 检验模型识别任务不可达的能力。
- **3 种评估方式**：exact_match、must_include、fuzzy_match；按任务类型细分解耦评估。
- **Agent 设计**：基于 GPT-4、GPT-3.5、PaLM-2 等 LLM，采用 Chain-of-Thought (CoT) + UA Hint (告知模型可执行 stop) 的 Prompting 策略，通过 Accessibility Tree ID 定位元素。
- **实验揭示核心问题**：GPT-4 最佳成功率 14.41%（w/o UA Hint），54.9% 可行任务被误判为不可完成（Early Stopping）；同一模板内的任务变体成功率一致性极差（仅 4/61 模板达到 100% 模板成功率）。
- **对比 Human**：人类 78.24% 成功率，50% 失败源于意图误解（如提供距离而非时间）、答案不完整、执行不完整。

#### 🔬 深入细节
##### 1. 核心框架图（Figure 1）

![WebArena 环境总览](https://github.com/web-arena-x/webarena/blob/main/resources/webarena_overview.png?raw=true)
*图：WebArena 是一个独立、自托管的环境，创建四个类别的网站（电商购站、CMS/Reddit、GitLab、Map），具有功能性和真实数据，Agent 通过 Browser 与之交互。**注**：因 ar5iv 网络不可达，此处 URL 为官方 GitHub 仓库推测路径，若无法显示请参考论文原文 Figure 1。*

##### 2. Agent 执行流程（伪代码）

```
Algorithm: WebArena Agent Execution Loop

Input: Task intent I, Environment E, Max steps M
Output: Task execution trajectory and final answer

1.  obs = E.reset()         # 获取初始 observation（URL + accessibility tree）
2.  history = []
3.  for step in 1..M:
4.      prompt = BuildPrompt(instruction, I, obs, history, allowed_actions)
5.      response = LLM(prompt)          # CoT: 先文本推理，再输出动作
6.      action = ParseAction(response)
7.      if action == "stop [answer]":
8.          return answer
9.      if action == "stop [N/A]":      # 识别为 Unachievable
10.         return "N/A"
11.     new_obs = E.execute(action)     # 环境执行操作，返回新的 observaton
12.     obs = new_obs
13.     history.append((action, obs))
14. raise MaxStepExceeded
```

##### 3. 深入方法细节

**动机与背景**：  
现有的 Web Agent 基准（如 MiniWoB++、WebShop、Mind2Web）在**功能性**（真实数据交互而非模拟）、**真实性**（模拟日常复杂任务而非简单原子操作）、**环境动态性**（支持交互而非常态网页）三者中存在折中。WebArena 通过完全自托管 4 类功能完备的网站填补了这一空白。

**核心机制**：
1. **自托管环境**：所有网站均基于真实开源项目二次开发（如 GitLab、Magento 电商、Reddit 服务器），具有真实的用户数据、产品数据和内容，Agent 的操作会持久化到数据库中（如下单、发帖、fork 仓库），确保评估的**功能性正确性**。
2. **Observation Space**：提供 URL（页面地址）、HTML page content（文本+图片）、以及 **Accessibility Tree**（包含每个交互元素的唯一 ID、角色、名字等）。Agent 通过 Element ID 精准定位点击或输入目标，避免了视觉定位或 DOM 解析的不稳定性。
3. **Action Space 设计**：覆盖浏览器核心操作 — 导航（go_page/go_back/go_forward）、标签页管理（new_tab/tab_focus/tab_close）、键盘输入（type/press）、鼠标交互（click/hover）、滚动（scroll）、停止（stop）。允许 Agent 在跨页面、跨标签的复杂任务中自由操作。
4. **Benchmark 构造**：从 170 个模板中通过**众包重写**生成 812 个具体任务，确保意图表达的多样性。3 类任务分解了信息检索、站点间导航和内容操作的不同粒度。Unachievable 任务（任务描述中有意混淆条件）检验 Agent 的自知能力。
5. **Agent Prompting**：在 Prompt 中详尽描述浏览器环境、允许操作及其语法，并提供 2 个示例（few-shot）。Chain-of-Thought (CoT) 让模型先文本推理再输出动作；UA Hint 告知模型遇到不可完成任务时可执行 "stop [N/A]"，模仿人类的指导说明。
6. **评估函数**：用 URL 匹配、页面元素匹配、最终状态匹配 3 类函数，根据不同任务需求选择 exact_match / must_include / fuzzy_match，并通过功能程序检查（如：商品是否真的加入了购物车、帖子是否真的发布成功）保证评估的**功能正确性**。

**训练/推理流程**：
- Agent 无训练，所有 LLM 为固定模型（GPT-4、GPT-3.5、text-bison-001）。
- 每条任务执行前重置环境到初始状态，Agent 最多执行 M 步。
- 评估时记录完整动作轨迹，成功或失败后有详细的错误日志分析。

**与传统方法的区别**：
| 基准 | 动态交互 | 真实环境 | 多样人类任务 | 功能正确性评估 |
|------|---------|---------|------------|-------------|
| Mind2Web | ✗ | ✓ | ✓ | ✗ |
| MiniWoB++ | ✓ | ✗ | ✗ | ✓ |
| Webshop | ✓ | ✗ | ✗ | ✓ |
| **WebArena** | **✓** | **✓** | **✓** | **✓** |

WebArena 是首个在四项维度上均满足要求的基准。

**关键发现与错误分析**：
- **Early Stopping**：GPT-4 在含 UA Hint 时，将 54.9% 的可行任务误判为不可行，在移除 UA Hint 后总成功率升至 14.41%（Table 2）。
- **模板内不一致性**：即使任务来自同一模板，Agent 表现极度不稳定。GPT-4 仅 4/61 个模板达到 100% 成功率，GPT-3.5 为 0（Table 3）。
- **人类水平**：人类完成 78.24% 任务；失败 50% 因误解意图或回答不完整，表明任务理解本身具有挑战性。
- **模型对比**：GPT-4 (14.41%) > GPT-3.5 (6.41%) > PaLM-2 (5.05%)。CoT 相比直接预测仅提升 ±2.34%（Table 2）。

#### 🧪 练习题
```yaml
question: "WebArena 为什么把 Accessibility Tree 连同元素 ID 暴露给 agent，而不是只给纯截图？"
options:
  - "因为 WebArena 不支持真实浏览器交互，只能做文本分类"
  - "因为这样可以把网页任务退化成静态问答，避免多步决策"
  - "因为元素 ID 提供了稳定的交互锚点，减少纯视觉定位或 DOM 解析带来的不稳定性"
  - "因为只有 Accessibility Tree 能用来运行最终评估脚本"
answer: 2
explain: "论文的一个关键设计是让 agent 通过可访问性树中的元素标识去执行 click/type 等动作，这比仅靠截图点坐标更稳定，也比原始 DOM 更直接服务交互。"
```

### AgentBench

```yaml
id: agentbench
num: 2
name: AgentBench
full_name: 智能体评测基准 (AgentBench)
year: '2023.08'
org: 清华大学
parent: —
paper_url: https://arxiv.org/abs/2308.03688
project_url: ''
category: foundation
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

### SWE-bench

```yaml
id: swebench
num: 3
name: SWE-bench
full_name: 软件工程问题基准 (SWE-bench)
year: '2023.10'
org: Princeton
parent: agentbench
paper_url: https://arxiv.org/abs/2310.06770
project_url: ''
category: evaluation
motivation: 用真实GitHub issue评测代码代理
```

#### 📝 一句话总结
> SWE-bench 提出了一个基于真实 GitHub 仓库 issue 的代码修复基准，包含 2294 个任务实例覆盖 12 个流行 Python 仓库，通过执行式单元测试验证模型生成的代码补丁，揭示了当前最强大模型（Claude 2）在 oracle 检索设置下也仅能解决 4.8% 的问题，同时开源了面向代码修复微调的 SWE-Llama 模型系列。

#### 🎯 核心要点
- **基准规模与范围**：2294 个任务实例，来自 12 个 GitHub 仓库（django、scikit-learn、matplotlib、sympy、pytest、requests、flask、sphinx、pylint、astropy、xarray、seaborn），时间跨度约 6 年
- **任务形式**：给定 issue 描述文本 + 完整代码库，要求模型生成补丁（patch）文件来解决 issue 描述的问题
- **评估方法**：执行式验证（execution-based evaluation）——在代码库中应用模型生成的补丁后运行相关单元测试，测试通过即视为解决
- **检索设置对比**：两种上下文提供方式——(1) oracle 检索（直接提供 gold patch 所涉及文件的完整内容）(2) BM25 检索（基于 issue 文本自动检索相关文件）
- **主要结果**：Claude 2 在 oracle 设置下解决率 4.8%，BM25 下仅 1.96%；GPT-4 分别为 1.63%（25% 随机子集）和 0.82%；Code Llama 在 oracle 下仅 0.2%
- **SWE-Llama 微调模型**：基于 Code Llama 在 SWE-bench 训练集上微调，SWE-Llama 13b 在 oracle 下达 4.0%（约等于 Claude 2），BM25 下仅 0.7%，揭示了对上下文分布偏移的敏感性
- **关键发现**：模型生成的补丁通常比 gold patch 短一半以上，倾向于只编辑单个文件，且生成的代码更简单、不充分利用第三方库或代码库结构
- **开源贡献**：完整基准、评估框架、训练数据、SWE-Llama 模型权重全部开源

#### 🔬 深入细节
![SWE-bench 示意图](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x1.png)
*图：SWE-bench 的核心框架或评测示意。*

##### 1. 任务构建流程

SWE-bench 的任务实例构建遵循完整的 open-source 协作流水线：

```
PyPI Top 5000 → Top 100 → 筛选有许可证的 GitHub 仓库
→ 收集所有PR → 筛选Merged+关联Issue+引入新测试的PR
→ 提取 base commit（修复前代码库状态）+ issue文本（问题描述）
→ 分离 test patch（测试用例）+ gold patch（实际修复方案）
→ 执行式验证（确保gold patch通过测试，未修改代码库时测试失败）
```

**关键设计选择**：
- **与现有基准的区别**：不同于 HumanEval（单函数补全，~175 tokens 上下文）或 Defects4J（Java 单语句 bug），SWE-bench 要求模型在数万行代码上下文中定位并修复 bug，上下文长度中位数约为 110K tokens
- **issue 文本处理**：聚合 PR 关联的所有 issue 的标题、正文及在 PR 首次提交时间戳之前的评论，避免泄露解决方案信息
- **补丁验证的两阶段检查**：(1) 未修改代码库时，必须至少有一项测试失败（确认 bug 真实存在）；(2) 应用 gold patch 后，所有相关测试必须通过

##### 2. 评估框架

模型生成的补丁通过 `git apply` 应用到代码库后，运行事先提取的测试用例：

- **通过标准**：所有测试通过（`before → fail` 且 `after → pass`）
- **评测指标**：成功率（resolved rate）= 通过的实例数 / 总实例数
- **过滤机制**：仅统计用户仓库运行成功的实例（不同模型的评分基于各自成功运行的任务子集，所有主实验基于 2294 个实例中至少一种设置下通过的实例）

##### 3. 检索策略

两种上下文检索策略对比如下：

| 策略 | 方式 | 上下文大小 | 结果（Claude 2） |
|------|------|-----------|------------------|
| **Oracle** | 直接提供 gold patch 编辑过的所有文件的完整内容 | 平均 ~6000 行 | 4.8% |
| **BM25** | 基于 issue 文本 + 代码库所有文件内容检索 Top-K | 平均 ~8000 行 | 1.96% |

Oracle 设置虽然提供了"作弊"级别的文件定位线索，但即使在此设置下顶级模型表现也极低，说明主要瓶颈不在检索而在于代码理解与编辑能力。

##### 4. SWE-Llama 训练

- **基础模型**：Code Llama 7b 和 13b（Rozière et al. 2023）
- **训练数据**：从 SWE-bench 训练集中选取 19183 个补丁文件，每条训练样本包含 [issue 描述, 代码库上下文, 目标补丁]
- **训练配置**：LoRA 微调（Hu et al. 2022），Flash Attention（Dao et al. 2022），Deepspeed Ulysses（Jacobs et al. 2023）支持长序列
- **关键发现**：SWE-Llama 13b oracle 性能 (4.0%) 接近 Claude 2 (4.8%)，但在 BM25 下骤降至 0.7%，说明微调模型对上下文分布偏移极为敏感——模型在训练时学会了编辑上下文中的每个文件，而在 BM25 设置下许多检索到的文件实际上不需要修改

##### 5. 深度分析发现

| 现象 | 数据证据 |
|------|----------|
| 模型倾向短编辑 | 模型生成补丁平均总行数 30.1 vs gold patch 74.5 行 |
| 单文件编辑倾向 | 模型几乎所有成功补丁仅编辑 1 个文件 vs gold patch 平均 1.7 个文件 |
| 不利用代码库结构 | 模型倾向写"原始 Python 代码"，不使用第三方库或项目已有工具函数 |
| "贪婪"修复策略 | 模型精确解决表面问题，缺乏 gold patch 中的结构性改进和预防性修复 |
| 生成补丁比生成全文件容易 | Claude 2 生成全文件仅 2.2% vs 生成补丁 4.8%（oracle 设置） |
| 难度与时间无关 | 2023 年前后的 issue 解决率无明显差异，排除模型"背诵"嫌疑 |

##### 6. 案例分析（sphinx-doc__sphinx-8713）

- **问题**：Sphinx 文档生成器的 napoleon 扩展在 `napoleon_use_param=True` 时未正确格式化 "Other Parameters" 文档关键字
- **Gold patch**：修改 `_parse_other_parameters_section` 函数，先检查配置设置，再复制 `_parse_parameters_section` 的行为
- **模型方案**：编辑了正确的函数，但错误地假设 `napoleon_use_param` 始终为 True，导致在配置为 False 的测试中失败
- **暴露问题**：模型可以定位相关代码，但缺乏对配置条件的细粒度推理能力

##### 7. 数据集特性统计

- **仓库覆盖**：12 个仓库涵盖 Web 框架（django、flask）、数据科学（scikit-learn、matplotlib、sympy、xarray、seaborn）、测试工具（pytest）、HTTP 库（requests）、文档工具（sphinx）、代码检查（pylint）、天文学（astropy）
- **实例分布**：django (917)、sympy (487)、matplotlib (254)、sphinx (229)、scikit-learn (131) 等
- **测试粒度**：每个实例平均包含 3-5 个新增测试函数，涵盖不同测试风格（unittest、pytest）
- **时间跨度**：PR 创建时间从 2017 年至 2023 年 6 月

##### 8. 局限性与未来方向

- 当前仅支持 Python 语言，计划扩展到更多编程语言
- 实验仅建立最简单直接的基线方法，鼓励未来探索 agent-based 方法、更大规模微调、与程序分析工具结合
- 仅依赖执行式测试不足以保证补丁质量——模型生成往往不如人类编写的方案全面、高效或可读

#### 🧪 练习题
```yaml
question: "SWE-bench 中设置 oracle 检索与 BM25 检索对比，最主要是为了区分哪两类能力瓶颈？"
options:
  - "代码生成速度与测试执行速度"
  - "文件定位/检索能力与真正的代码理解编辑能力"
  - "监督微调能力与强化学习能力"
  - "单文件补丁与多文件补丁的磁盘占用差异"
answer: 1
explain: "Oracle 直接给出 gold patch 涉及文件，几乎消掉文件检索问题；若此时成绩仍低，就说明更深的瓶颈在代码理解、条件推理与补丁编辑，而不仅是找错文件。"
```

### OSWorld

```yaml
id: osworld
num: 4
name: OSWorld
full_name: 真实操作系统环境 (OSWorld)
year: '2024.04'
org: HKU/CMU
parent: webarena
paper_url: https://arxiv.org/abs/2404.07972
project_url: ''
category: environment
motivation: 把浏览器任务扩展到真实操作系统
```

#### 📝 一句话总结
OSWorld 是首个面向多模态智能体的**真实操作系统benchmark**，在 Ubuntu/Windows/macOS 三种OS上提供369个开放任务，通过**执行结果评估**（execution-based eval）暴露了当前最佳模型仅12.24%成功率（人类72.36%）的巨大差距，核心瓶颈在于**GUI视觉grounding**和**操作知识（operational knowledge）**。

#### 🎯 核心要点
- 核心动机：把浏览器任务扩展到真实操作系统
- 演化来源：继承或改进自 webarena
- 代表机构：HKU/CMU

#### 🔬 深入细节
![OSWorld 示意图](https://ar5iv.labs.arxiv.org/html/2404.07972/assets/x1.png)
*图：OSWorld 的核心框架或评测示意。*

##### 1. Benchmark 设计空间

OSWorld 将真实OS操作建模为**开放式的多模态交互任务**：

| 维度 | 设计选择 | 意义 |
|------|----------|------|
| **环境** | Ubuntu 22.04, Windows 11, macOS 14 虚拟机 | 首次覆盖三大主流OS，逼真度远超网页/模拟器 |
| **交互方式** | 截图+鼠标键盘动作，支持坐标点击、拖拽、文本输入、快捷键、滚动等 | 模拟真实用户操作，考验agent的视觉理解和动作规划 |
| **任务来源** | 从用户手册、在线教程、日常办公场景中挖掘 | 保证生态效度 |
| **评估方式** | VM快照+确定性验证脚本（bash/powershell/python） | 客观、可复现、无需人工评判 |
| **初始化** | 每个任务从已知的VM快照启动，保证公平比较 | 消除初始状态差异 |

##### 2. 任务分布

```
369 tasks 分类：
├── OS基础操作（文件管理/系统设置/终端）    ~30%
├── 办公软件（LibreOffice/Word/Excel/PPT）  ~25%
├── 图像/视频处理（GIMP/画图/剪辑）         ~15%
├── Web浏览器（Chrome/Firefox/Safari）      ~15%
├── 编程/IDE（VSCode/Xcode/终端）           ~10%
└── 其他（邮件/日历/系统工具）              ~5%
```

##### 3. 评估协议详解

OSWorld 的 execution-based 评估流程：

```
Start → 加载任务 → 读取task_config（指令+初始VM快照+评估脚本路径）
  → Agent迭代循环（max 15 steps per task）：
      1. 获取当前截图
      2. 产生动作（点击坐标/输入文本/快捷键/函数调用）
      3. 在VM中执行动作，等待UI更新
      4. 返回新截图
  → 15步后终止（或agent主动结束）
  → 回滚VM到快照 → 执行评估脚本 → 输出0/1
```

**动作空间**:
```python
# OSWorld 支持的动作类型
Action = Union[
    ClickAction(x=int, y=int, button="left"|"right"|"middle"),
    TypeAction(text=str),                    # 键盘输入
    KeyPressAction(keys=List[str]),           # 组合键如["ctrl","c"]
    ScrollAction(dx=int, dy=int),            # 滚轮
    DragAction(start_x, start_y, end_x, end_y),
    WaitAction(seconds=float),               # 等待UI更新
    FunctionCallAction(name, args),          # 调用预定义工具函数
    TerminateAction()                        # 主动结束任务
]
```

##### 4. 核心实验结果

| Agent | 总成功率 | Ubuntu | Windows | macOS |
|-------|---------|--------|---------|-------|
| **Random** | ~0% | - | - | - |
| **GPT-4V (zero-shot)** | 12.24% | 15.1% | 9.8% | 11.7% |
| **Gemini-Pro-Vision** | 8.67% | - | - | - |
| **Claude-3-Opus** | 11.11% | - | - | - |
| **GPT-4V + RCI (self-refine)** | 13.82% | - | - | - |
| **GPT-4V + GT grounding** | 34.15% | - | - | - |
| **Human (crowdworkers)** | **72.36%** | 81.0% | 67.3% | 67.9% |

**关键发现**:
- **视觉grounding是最大瓶颈**: 如果给模型ground-truth坐标（GT grounding），性能提升2.8倍(12.24%→34.15%)
- **操作知识同样致命**: 即使知道点哪里，模型仍因缺乏领域操作知识（如GIMP具体工具用法、系统设置嵌套路径）而频繁失败
- **跨OS差距显著**: Ubuntu任务成功率高于Windows/macOS，可能与训练数据分布和Ubuntu UI更规则有关

##### 5. 主要失败模式分析

```
失败分布（基于GPT-4V 200+ case分析）：
├── 视觉grounding错误              ~38%
│   ├── 未能找到目标UI元素
│   ├── 坐标偏移（点击到相邻元素）
│   └── 对UI状态误判（如认为按钮可点击）
├── 操作知识缺失                  ~32%
│   ├── 不知道特定软件的操作流程
│   ├── 错误的功能调用
│   └── 缺乏跨步骤的依赖推理
├── 规划/推理失败                  ~18%
│   ├── 子目标分解错误
│   └── 遗漏关键步骤
├── 动作格式/语法错误              ~8%
└── 其他（超时/意外弹窗等）         ~4%
```

##### 6. Agent 架构范式对比

OSWorld 测试了三种范式：

| 范式 | 代表方法 | 做法 | 效果 |
|------|----------|------|------|
| **Direct prompting** | GPT-4V vanilla | 截图+任务描述→直接输出动作 | 基线12.24% |
| **Self-refine** | RCI (Retry-Critique-Improve) | agent失败后自我审视并修正 | +1.6%（有限改进） |
| **Grounded prompting** | Set-of-Marks (SoM) + 标注截图 | 预标注UI元素ID，agent引用ID | +12%（需grounding模型） |

##### 7. 与相邻Benchmark的关系

```
WebArena (2023) ──→ OSWorld (2024)
  Web环境             真实OS环境
  HTML DOM访问         纯视觉（截图）
  812 tasks            369 tasks
  答案匹配评估          执行结果评估
  4类网站              Ubuntu/Windows/macOS

VisualWebArena ─―→ OSWorld-Web子集 (Chrome/Firefox任务)
  Web视觉agent          OS内嵌浏览器agent
  仅网页                OS原生浏览器

WindowsAgentArena ─→ OSWorld-Windows子集
  仅Windows            Windows+Ubuntu+macOS
  特定UWP应用           更广泛的桌面应用
```

**核心差异**: OSWorld 是第一个在**真实VM环境**中进行**execution-based评估**的**多OS** benchmark，填补了从简化模拟器到真实OS的鸿沟。

##### 8. 实践建议（给agent开发者）

1. **视觉grounding先行**: 在接入OSWorld前，确保agent在ScreenSpot/GUI grounding子任务上有足够能力
2. **操作知识注入**: 为特定软件（GIMP/LibreOffice/系统设置）提供检索增强的文档知识库至关重要
3. **错误恢复机制**: 15步限制下，agent需要能在第3-5步发现错误时回退和重规划
4. **多OS适配**: 必须建立OS-aware的prompt策略，如Windows的任务栏在底部、macOS的菜单栏在顶部
5. **评估脚本即spec**: tasks/<id>/evaluate.py 本身就是最佳的任务理解素材

##### 9. 技术栈与可复现性

- **VM管理**: QEMU/KVM (Ubuntu), VMware/Parallels (Windows/macOS)
- **Agent-VM通信**: 自定义gRPC服务，截图通过VNC/Spice获取
- **动作注入**: 对于Ubuntu用xdotool/evemu, Windows用WinAppDriver, macOS用CGEvents/AppKit
- **完整开源**: GitHub仓库包含所有VM镜像下载、任务JSON、评估脚本、基线agent代码

> **📖 一句话推荐**: 如果你只做GUI agent，读这篇就够了——它用369个真实任务和execution-based eval告诉你：视觉grounding和操作知识是AGI在桌面任务上的最后两道墙。

> **🔗 资源链接**: [Paper](https://arxiv.org/abs/2404.07972) | [Code](https://github.com/xlang-ai/OSWorld) | [Leaderboard](https://os-world.github.io)

#### 🧪 练习题
```yaml
question: "OSWorld 论文中，给模型提供 ground-truth 坐标后成功率大幅提升，最直接说明了什么？"
options:
  - "主要瓶颈在评估脚本错误，而不是 agent 本身"
  - "主要瓶颈之一是 GUI 视觉 grounding，而不是纯粹的高层任务理解"
  - "说明 execution-based evaluation 低估了真实能力"
  - "说明多操作系统环境并不会增加任务难度"
answer: 1
explain: "论文报告 GT grounding 会把成功率从约 12% 提升到约 34%，这直接表明大量失败来自看不准、点不准界面元素，而不是只是不知道目标是什么。"
```

### ToolSandbox

```yaml
id: toolsandbox
num: 5
name: ToolSandbox
full_name: 状态化工具沙箱 (ToolSandbox)
year: '2024.08'
org: Apple
parent: agentbench
paper_url: https://arxiv.org/abs/2408.04682
project_url: ''
category: environment
motivation: 评测多轮状态依赖的工具调用
```

#### 📝 一句话总结
ToolSandbox 提出了首个融合**有状态工具**（Stateful Tools）、**对话式评估**（Conversational Evaluation）和**交互式评估**（Interactive Evaluation）三位一体的 LLM 工具使用基准测试，通过 Milestone/Minefield 机制提供细粒度的中间过程评估，揭示了当前模型在状态依赖推理、规范化（Canonicalization）和信息不足场景下的显著不足，开源与闭源模型间存在超过 20 分的性能鸿沟。

#### 🎯 核心要点
- 提出 **ToolSandbox 基准测试框架**，包含 34 个工具、覆盖消息通信、世界状态管理等真实场景
- 三大创新维度：**Stateful Tools**（工具执行结果持久化改变世界状态）、**State Dependent Tools**（工具行为受当前世界状态影响）、**Canonicalization**（同一实体的多种指称归一化）
- 核心架构三组件：**Message Bus**（消息总线解耦 LLM-Tools-User 三方通信）、**World State**（键值对存储追踪工具副作用）、**User Simulator**（LLM 驱动的模拟用户，支持工具辅助增强）
- 提出 **Milestone**（里程碑，检查中间步骤是否达到预期状态）和 **Minefield**（雷区，检测违规操作如信息泄露、重复调用），实现对话过程的细粒度评估
- 定义三种测试场景类别：**Single-Turn**（单轮工具调用）、**Multi-Turn Non-Interactive**（多轮无用户交互）、**Multi-Turn Interactive**（多轮含用户模拟交互）
- 实验发现：闭源模型整体领先开源模型 >20 分；State Dependency 是最大挑战（所有模型表现最差）；大模型存在反直觉的 State Dependency 性能退化；信息不足场景中模型倾向于"猜测"而非主动询问澄清

#### 🔬 深入细节
![ToolSandbox 系统架构图](https://ar5iv.labs.arxiv.org/html/2408.04682/assets/x1.png)
*图：ToolSandbox 整体架构——LLM Agent 通过 Message Bus 与工具（Tools）和用户模拟器（User Simulator）交互，World State 记录所有工具执行产生的持久副作用。*

##### 伪代码：Milestone & Minefield 评估机制

```python
# ToolSandbox 核心评估流程（简化）
def evaluate_conversation(llm_agent, scenario, milestones, minefields):
    world_state = {}  # 初始化世界状态（键值对存储）
    messages = [scenario.system_prompt, scenario.initial_user_message]
    milestone_results = []
    minefield_triggers = []

    for turn in range(scenario.max_turns):
        # 1. LLM 生成工具调用或文本回复
        llm_response = llm_agent(messages, available_tools)

        # 2. 执行工具调用，更新 World State
        for tool_call in llm_response.tool_calls:
            result = execute_tool(tool_call, world_state)
            world_state.update(result.state_changes)  # W' = f_tool(W, params)
            messages.append(result)

        # 3. Milestone 检查（在指定轮次检查中间状态）
        for ms in milestones_by_turn[turn]:
            if ms.condition(world_state, messages):
                milestone_results.append({"milestone": ms, "passed": True})
            else:
                milestone_results.append({"milestone": ms, "passed": False})

        # 4. Minefield 检测（检查是否触发违禁行为）
        for mf in minefields:
            if mf.pattern_matches(messages, world_state):
                minefield_triggers.append({"minefield": mf, "turn": turn})

    # 最终 World State 匹配度评分
    final_state_score = compute_state_match(world_state, scenario.expected_state)
    return final_state_score, milestone_results, minefield_triggers
```

##### 核心机制详解

**动机与背景**：传统 LLM 工具使用评估（如 BFCL、ToolBench）存在三个根本缺陷：(1) 工具是**无状态的**——每次调用独立执行，无法模拟现实世界中诸如"预订航班→修改预订→取消预订"的连锁操作；(2) 评估是**非对话式的**——用静态测试集做选择题式评测，忽略了真实用户-助手交互的动态性；(3) 评估指标**只看最终结果**——忽略了中间步骤的正确性，无法区分"碰巧答对"和"推理正确"。

> 💡 关键：ToolSandbox 的核心洞察在于——**世界状态（World State）** 是连接单次工具调用与长期推理的桥梁。每一次工具调用都会产生持久化的副作用（如创建日历事件、转账），后续工具的行为取决于这些累积的状态变化。

**架构设计**：系统由三层组成——
- **Message Bus**：一个中介层，LLM Agent、工具、用户模拟器三者只与 Bus 通信而非彼此直连。这使得工具调用和用户消息可以被透明地拦截、记录和评估。
- **World State**：用键值对字典 `{entity_id: {field: value}}` 存储所有工具执行产生的副作用。例如 `{"calendar_event_42": {"title": "Meeting", "time": "3pm"}}`。每轮工具调用后状态被更新，后续工具调用可以读取这些状态。
- **Milestone & Minefield**：评估指标不再只看最后一轮输出是否正确，而是在预设的**中间轮次**检查 World State 是否达到预期（Milestone）或是否触发了违规行为（Minefield）。

> ⚠️ 注意：Milestone 分为**强制里程碑**（必须在该轮恰好达成）和**可选里程碑**（在某轮及之前达成均可），后者的设计更贴近开放式对话的灵活性。

**State Dependency 挑战**：这是论文发现的最具挑战性的问题。当工具行为依赖于先前操作积累的 World State 时（例如：先创建日历事件 A，再创建事件 B 时需避开 A 的时间），LLM 需要在多次工具调用间维护一致的实体引用和状态推理。实验结果揭示了一个**反直觉现象**：某些闭源大模型在 State Dependent 场景下的性能反而不如简单的 Stateful 场景，说明增加状态依赖反而引入了干扰——模型可能"过度思考"而导致错误的状态推理。

**User Simulator 设计**：不同于传统基准的静态测试用例，ToolSandbox 使用 LLM 驱动的用户模拟器动态生成回复。模拟器接收场景描述（用户目标、偏好、约束）和对话历史，生成逼真的用户响应。为减少幻觉，论文引入了**工具辅助用户模拟器**——提供给模拟器一个 `end_conversation` 工具，实验表明这显著改善了对终止对话指令的遵循。

**Canonicalization 问题**：同一现实实体在对话中可能有多种指称方式（"明天下午的会议" vs "3点的那个事件" vs "event_42"），LLM 需要将这些表面形式归一化到 World State 中的唯一实体 ID。论文发现这是当前模型的显著短板——即使最终结果正确，中间过程中频繁出现实体引用混乱。

**主要实验发现**：(1) 闭源模型（GPT-4 系列）整体得分领先开源模型（Llama-3 系列）超过 20 分（满分 100）；(2) State Dependency 是所有模型得分最低的维度，即使最先进的 GPT-4 在该维度也仅勉强及格；(3) 在信息不足（Insufficient Information）场景中，多数模型倾向于直接调用工具"猜测"而非主动向用户寻求澄清——这是当前对齐训练的副作用；(4) Minefield 检测显示，模型最常见的违规行为是**信息泄露**（在输出中暴露了 World State 中的敏感数据）和**重复冗余调用**。

#### 🧪 练习题
```yaml
question: "ToolSandbox 中 Milestone 与 Minefield 的核心区别是什么？"
options:
  - "Milestone 在开头检查，Minefield 在结尾检查"
  - "Milestone 检查中间状态是否达成预期，Minefield 检测是否触发违禁行为"
  - "Milestone 用于单轮对话，Minefield 用于多轮对话"
  - "Milestone 评估最终结果，Minefield 评估中间过程"
answer: 1
explain: "Milestone 在指定轮次检查 World State 是否达到预设条件（正向指标），Minefield 实时检测模型是否触发了信息泄露、重复调用等违禁模式（负向指标），二者构成细粒度评估的正反两面。"
```

### SWE-bench Verified

```yaml
id: swe_verified
num: 6
name: SWE-bench Verified
full_name: 人工校验软件工程基准 (SWE-bench Verified)
year: '2024.08'
org: OpenAI
parent: swebench
paper_url: https://openai.com/index/introducing-swe-bench-verified/
project_url: ''
category: evaluation
motivation: 过滤原始样本噪声并标准化执行
```

#### 📝 一句话总结
SWE-bench Verified 对原始 SWE-bench 中的 500 个代码修复任务进行了人工重新校验，剔除了含错误测试、模糊规格或执行环境不一致的噪声样本，最终保留 244 个高质量任务子集，将人机一致性从 67% 提升至 93%，为代码智能体提供了一个更可靠、更标准化的评估基准。

#### 🎯 核心要点
- 对 SWE-bench 全部 500 个实例逐一进行人工审查，由专业软件工程师逐例验证任务描述、预期行为与测试用例的正确性
- 发现约 50% 的原始样本存在不同程度的问题：测试断言错误、规格描述过度模糊、环境配置与预期版本不一致、补丁无法正确应用或评估
- 最终构建 244 个实例的 "Verified" 子集，每个样本均包含精确的问题描述、经过人工确认的黄金补丁和正确执行的日志记录
- 引入标准化的 Docker 容器执行框架，统一每个任务的运行环境和依赖版本，消除因环境差异导致的评估噪声
- 建立严格的双通道评估协议：模型生成的补丁先在 Verified 子集上评估，再与原 SWE-bench 结果对比，暴露模型对噪声样本的过拟合倾向
- 发布 verified 子集数据和标准化评估工具包为开源，支持一键复现评估结果并集成新的代码修复模型
- 显著提升原始 SWE-bench 的人机一致性（从 67% 到 93%），证明过滤后的子集更准确地反映了模型的实际代码修复能力

#### 🔬 深入细节
![SWE-bench Verified 示意图](https://images.ctfassets.net/kftzwdyauwt9/6wYGm9QST2WYLbPJl5YwZC/1e63f3bfb458ce891db4f94a52052240/Codex_Blog_Header_V5.png?fm=webp&q=90&w=3840)
*图：SWE-bench Verified 的核心框架或系统示意。*

**动机与背景**

SWE-bench 自 2023 年发布以来，迅速成为评估大语言模型在真实软件工程任务上表现的事实标准。该基准从 GitHub 上提取了来自 12 个主流 Python 开源项目（如 Django、Flask、SymPy 等）的 2,294 个真实 issue 和对应的 pull request，要求模型根据 issue 描述定位文件并生成修复补丁，然后运行项目已有的测试套件判断修复是否成功。

然而，随着越来越多的模型提交 SWE-bench 结果，一个根本性问题暴露出来：基准本身的噪声有多大？原始 SWE-bench 自动从 GitHub 挖掘 issue-PR 对，但 issue 的描述质量参差不齐（有的仅包含简单的 bug 复现步骤，有的则缺少关键上下文）、部分测试用例与实际 bug 无关、某些 PR 的修改范围超出了 issue 的描述范围。这些噪声使得评估结果可能无法真实反映模型的代码理解与修复能力——模型可能恰好蒙对了一个有问题的测试用例，或在噪声样本上表现出不稳定的分数波动。

SWE-bench Verified 的核心问题意识在于：**评估基准的人机一致性（human agreement）是衡量其可靠性的关键指标**。如果人类专家按照基准的判分标准独立评估同一组样本，得到的结果差异很大，那么这个基准就缺乏评估效度。该工作通过对全部 500 个 Dev 集样本的人工再校验，建立了具有更高人机一致性的子集。

**核心方法论：三阶段校验流程**

SWE-bench Verified 的构建采用了三阶段人工校验流程，确保每一步的质量可控：

1. **第一阶段：实例理解与初步审查**
   每个样本首先由一名标注者进行整体审查，包括阅读 issue 描述、理解预期行为、检查关联的 PR 代码变更。标注者记录下任务描述是否清晰（"能否仅从 issue 描述推断出应该修改什么？"）、预期行为是否明确（"修复后的代码应该如何工作？"）、测试用例是否实际覆盖了 described 的 bug。

2. **第二阶段：可执行性验证**
   在标准化的 Docker 环境中实际运行原始测试套件。验证点包括：基代码（问题修复前的代码版本）是否能成功安装依赖并运行测试；失败测试的断言是否确实与 issue 描述的 bug 相关；PR 中的补丁是否能干净地应用到基代码上；应用补丁后所有测试是否通过。

3. **第三阶段：专家交叉复核**
   经过前两轮筛选后存疑的样本进入专家交叉复核。由另一位独立的软件工程师重新审查，最终标记为"verified"（确认无误）、"discarded"（存在问题，不可用）、或"modified"（修正问题描述或测试后可用）。

**标准化执行框架**

原始 SWE-bench 在评估模型输出时存在执行环境不一致的问题：不同模版代码可能导致不同的文件结构，依赖包的版本可能影响测试通过与否。SWE-bench Verified 引入了完全容器化的标准化执行框架：

```docker
# 每个实例在独立的 Docker 容器中执行，精确控制依赖版本
# 统一的文件结构、预安装的测试框架、固定的评估脚本
for instance in verified_set:
    docker = create_container(
        repo=instance.repo,
        base_commit=instance.base_commit,
        dependencies=instance.frozen_requirements
    )
    docker.apply_patch(model_patch)
    result = docker.run_tests(instance.test_list)
```

标准化的关键点包括：
- 使用 Docker 镜像固化每个项目的 Python 版本、系统库和 pip 依赖
- 统一补丁应用逻辑（使用 `git apply` 的标准行为）
- 统一测试执行命令和日志捕获格式
- 提供可重复使用的评估脚本和评分逻辑

> 💡 **关键设计**：标准化框架确保了跨模型、跨时间的可复现评估 —— 任何人在任何时间运行同一个模型输出，都会得到完全相同的 pass/fail 结果。

**与传统评估的区别与新发现**

与原始 SWE-bench 直接使用从 GitHub 自动抓取的 issue-PR 对不同，Verified 子集的每个样本都经过人类专家的质量控制。这种质量控制带来了几个重要发现：

1. **近半数样本存在问题**：原始 500 个样本中，只有 244 个（约 49%）通过了所有审查。这并不意味着一半的数据是 "错误" 的，而是它们的质量不足以支撑可靠的自动化评估。

2. **噪声对模型排名的影响**：在 Verified 子集上重新评估已发布模型的输出，发现某些模型的排名发生了变化。部分模型在原始 SWE-bench 上的高分可能得益于对噪声样本的 "过度拟合"——它们的策略恰好对齐了有问题的测试用例的预期，而非真实地理解并修复了 bug。

3. **人机一致性的飞跃提升**：原始 SWE-bench 的人机一致性约为 67%（即人类专家复查时，约有 33% 的评估结果与自动化判分不一致），而 Verified 子集将这一数字提升至 93%。这 26 个百分点的提升意味着 Verified 子集的评估结果高度可信——当模型被判定为 "通过" 时，人类专家有 93% 的概率认同这一结论。

4. **保留原始可对比性**：Verified 子集是原始 Dev 集的子集而非重新构建，因此所有在原始 SWE-bench 上已有的分数可以通过简单过滤 Verified 子集中的 244 个样本重新计算。这一设计使得新旧评估之间实现了平滑过渡。

**技术实践与工具链**

SWE-bench Verified 不仅是一个数据集，更是一套完整的评估基础设施。其开源发布包含：

- **verified_244.json**：包含 244 个样本的完整信息，每个样本都附带人类专家的校验注释、验证通过的执行日志
- **标准评估脚本**：一个 Python 脚本可以一键运行所有 244 个任务的评估，输出详细的 pass/fail 列表和按仓库分组的统计
- **Docker 镜像和构建文件**：可在任何支持 Docker 的机器上复现评估环境
- **评分协议**：明确的评分规约，定义了什么是 "正确的修复"（应用后可让所有相关测试通过即为通过，不要求与人类 PR 完全一致）

#### 🧪 练习题
```yaml
question: "SWE-bench Verified 与原始 SWE-bench 的核心区别是什么？"
options:
  - "新增了更多来自其他编程语言的代码修复任务"
  - "通过人工校验过滤了原始数据中的噪声样本，并标准化了评估执行环境"
  - "将评估范围从代码修复改为代码生成"
  - "采用自动化脚本替代人工进行测试用例编写"
answer: 1
explain: "SWE-bench Verified 的核心贡献是对原始 SWE-bench 的 500 个样本进行人工审查，剔除了约 50% 存在测试不准确或环境不一致的样本，并引入标准化 Docker 执行框架，将人机一致性从 67% 提升至 93%。"
```

### BrowserGym

```yaml
id: browsergym
num: 7
name: BrowserGym
full_name: 网页智能体训练场生态 (BrowserGym)
year: '2024.12'
org: ServiceNow
parent: webarena
paper_url: https://arxiv.org/abs/2412.05467
project_url: ''
category: environment
motivation: 统一多种网页基准的观测动作接口
```

#### 📝 一句话总结
BrowserGym 提出了统一的 Gymnasium 风格环境与 AgentLab 实验平台，将 MiniWoB++、WebArena、WorkArena 等异构网页基准接入统一的观测-动作接口，使不同 LLM/VLM 驱动的网页智能体能在完全可复现的条件下进行系统化评估与对比。

#### 🎯 核心要点
- 提出双层生态系统：**BrowserGym**（统一环境层）+ **AgentLab**（实验管理层），解耦环境接口与实验编排
- 基于 Gymnasium API 定义统一的观测空间（DOM、AXTree、截图等多模态）与动作空间（click、type、scroll 等基本操作集）
- 原生支持 MiniWoB++、WebArena、WorkArena、WebLINX 四大基准，新基准只需实现一套薄适配层
- AgentLab 提供可复现实验：固定 seed、环境快照、完整配置追踪，支持大规模并行实验
- 内置 LLM/VLM 推理集成（OpenAI、Anthropic、HuggingFace 等），开箱即用的一键实验对比
- 开源生态（Apache 2.0），社区可灵活扩展新 benchmark 和新 agent 策略

#### 🔬 深入细节
##### 核心示意图

![BrowserGym 生态系统总览](https://ar5iv.labs.arxiv.org/html/2412.05467/assets/x1.png)

*图：BrowserGym 生态系统总览，包括 AgentLab、BrowserGym 以及所支持的网页智能体基准的关系。*

##### 动机与背景

传统网页智能体研究面临两大瓶颈：一是不同基准（MiniWoB++、WebArena 等）各自定义观测格式与动作接口，智能体无法直接跨基准迁移；二是实验可复现性差——缺乏标准化的环境管理、配置追踪和结果汇报机制。BrowserGym 的目标是用一套统一的 API 封装所有网页交互基准，并提供 AgentLab 作为实验编排层，使得研究者只需关注智能体的高层决策策略。

##### 核心机制：双层架构

###### BrowserGym — 统一环境层

BrowserGym 基于 Gymnasium 接口，将网页交互抽象为标准的 RL 环境。其核心设计在于定义了一套**通用的观测空间**和**动作空间**：

- **观测空间（Observation Space）**：每个 step 返回一个 dict，包含：
  - `DOM`：当前页面的 DOM 树或简化 HTML
  - `AXTree`：无障碍树（accessibility tree），适合视觉信息受限的场景
  - `Screenshot`：页面截图（numpy array），供 VLM 使用
  - `Goal`：当前任务的文本描述
  - `ChatMessages`：多轮对话历史

- **动作空间（Action Space）**：统一的高层动作集，包括：
  - `click(element_id)` — 点击指定元素
  - `type(text, element_id)` — 在指定输入框内键入文本
  - `scroll(x, y)` / `go_back()` / `go_forward()` — 页面导航
  - `send_msg(text)` — 向用户发送消息（信息型任务）
  - `report_result(status)` — 任务完成时报告成功或失败

> 💡 关键：所有基准共享相同的动作空间定义，但各基准内部的元素定位方式不同（如 MiniWoB++ 用数字 ID，WorkArena 用语义 bid），BrowserGym 在各适配层内部完成翻译，对外暴露统一接口。

BrowserGym 的核心环境循环：

```
observation = env.reset(seed)
for step in range(max_steps):
    action = agent.predict(observation)
    next_observation, reward, terminated, truncated, info = env.step(action)
```

每个 benchmark 只需继承 `browsergym.core.env.BrowserEnv` 基类，实现 `_get_goal()` 和 `_get_task_metadata()` 等方法，即可接入生态系统。

###### AgentLab — 实验管理层

AgentLab 负责大规模实验的编排：

- **Agent 配置**：通过 YAML 文件声明式定义 agent 所用的 LLM 后端、prompt 模板、策略参数等
- **Experiment Runner**：支持并行启动多个环境实例，自动管理不同 seed 下的实验分配
- **结果追踪**：每个实验自动记录完整的配置快照、每一步的轨迹（observation-action 对）、最终得分
- **Leaderboard**：内置排行榜模块，可在不同 benchmark 上系统性对比不同 agent 的表现

> 💡 关键：AgentLab 通过将所有配置参数（LLM 温度、prompt、随机 seed）纳入版本管理，实现了端到端的实验可复现。即使环境本身具有随机性，同一 seed 下的两次运行会产生完全一致的轨迹。

##### 支持的基准

| 基准 | 任务数量 | 特点 |
|------|---------|------|
| MiniWoB++ | 125+ | 合成微任务，测试原子级 web 操作能力 |
| WebArena | 812 | 四个真实 web app 模拟，综合导航与表单 |
| WorkArena | 33 | ServiceNow 企业工作流，表单密集型 |
| WebLINX | 2337 | 真实网站上的对话式演示转向任务 |

每个基准在接入 BrowserGym 时，需要提供：
1. **任务集定义**：包含任务 ID、类型（信息检索/表单操作等）、难度标签
2. **观测适配器**：将该基准的页面表示转换为统一的 obs dict
3. **动作适配器**：将统一动作映射为该基准的底层操作
4. **评估逻辑**：判断任务是否成功完成的规则

##### 与传统方法的区别

此前，研究者在不同基准上评估智能体时，需要处理完全不同的环境代码库和接口规范。例如，WebArena 提供自己的 task runner 和 evaluation script，MiniWoB++ 有自己的交互协议。这意味着：
- 同一智能体需要针对每个基准编写不同的交互代码
- 实验配置分散，难以整齐对比
- 缺乏统一的 metrics 和 reporting 格式

BrowserGym 通过抽象出**基准无关**的环境接口，将上述差异完全隐藏在适配层内部。AgentLab 进一步标准化了实验管理，使得"在不同基准上跑同一个 agent"与"在同一基准上跑不同 agent"都变成简单的配置切换。

##### 训练/推理流程

1. **环境初始化**：选择 benchmark、指定 seed，BrowserGym 启动对应的浏览器实例并加载目标任务
2. **观测获取**：环境返回当前的 DOM/AXTree/screenshot 等多模态观测
3. **Agent 推理**：Agent 将观测和 goal 打包为 LLM/VLM prompt，调用后端模型获取动作指令
4. **动作执行**：BrowserGym 将统一的动作（如 `click(42)`）翻译为基准特定的浏览器操作
5. **状态更新与评估**：环境返回新观测和奖励信号；AgentLab 记录该步轨迹
6. **循环至终止**：任务完成（主动 report_result）或达到 max_steps 上限

AgentLab 在实验结束后自动汇总所有任务的成功率（success rate）、平均步数等指标，并生成可对比的报告。

#### 🧪 练习题
```yaml
question: "BrowserGym 生态系统中，AgentLab 主要负责什么？"
options:
  - "定义统一的浏览器观测与动作空间"
  - "实验编排与管理，包括配置追踪、大规模并行运行和结果对比"
  - "将 MiniWoB++ 的 DOM 树转换为无障碍树"
  - "在浏览器端执行 click、type 等原子操作"
answer: 1
explain: "AgentLab 是 BrowserGym 生态的实验管理层，负责 agent 配置管理、并行实验调度、轨迹记录与结果对比；环境接口的观测/动作定义由 BrowserGym 核心层完成。"
```

### Codex

```yaml
id: codex
num: 8
name: Codex
full_name: 云端编码代理 (Codex)
year: '2025.05'
org: OpenAI
parent: swe_verified
paper_url: https://openai.com/index/introducing-codex/
project_url: ''
category: runtime
motivation: 把代码基准能力产品化为云端代理
```

#### 📝 一句话总结
OpenAI 将 GPT-4 在 SWE-bench Verified 等代码基准上的顶尖能力产品化为**云端编码代理 (Codex)**，通过安全沙箱执行、工具链集成和人工审批机制，实现了从「模型评测」到「产品级自主编程」的关键跨越。

#### 🎯 核心要点
- **从基准到产品**：Codex 并非新模型架构，而是将 OpenAI 最强的代码模型（基于 o1/o3 推理模型）的能力封装为云端代理，直接面向开发者生产力场景
- **SWE-bench Verified 驱动**：Codex 的核心能力基座来自 SWE-bench Verified 基准的前沿研究，该基准被用作代理能力的持续改进目标，经过专项强化后模型在该基准上达到领先水平
- **安全执行沙箱**：代码在隔离的云端沙箱中运行，集成 cgroup/eBPF 级别的系统遥测，高风险操作（文件写入、Shell 执行、网络请求）受策略引擎实时管控
- **工具链深度集成**：支持 GitHub 集成、IDE 插件（VS Code/JetBrains）、终端原生执行、CI/CD 管道嵌入等多形态部署
- **Human-in-the-loop 审批**：对于生产环境的破坏性操作（如数据库迁移、Prod 部署），Codex 强制走人工审批流程，确保 Agent 自主性与安全可控的平衡
- **Reasoning-First 范式**：Codex 内部采用「先推理后行动」的执行策略——模型首先生成包含修改计划、影响分析和风险判断的推理链，经内部验证后才生成代码补丁
- **多步修复能力**：支持跨多个文件、多个模块的复杂重构和 Bug 修复，自动追踪依赖关系，生成可复用的修复脚本
- **上下文理解**：能够主动探索整个代码仓库（包括不限于读取文件、查看 Git 历史、分析 Issue/PR 讨论），构建深度项目理解后再进行操作

#### 🔬 深入细节
![Codex 示意图](https://images.ctfassets.net/kftzwdyauwt9/6wYGm9QST2WYLbPJl5YwZC/1e63f3bfb458ce891db4f94a52052240/Codex_Blog_Header_V5.png?fm=webp&q=90&w=3840)
*图：Codex 的核心框架或系统示意。*

##### 4.1 系统架构

Codex 的架构分为四层：用户接入层、推理层、执行沙箱层和安全治理层。

```
┌─────────────────────────────────────────────────┐
│                 用户接入层                        │
│  IDE 插件  │  CLI  │  GitHub App  │  API        │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│                 推理层 (后端)                     │
│  ┌──────────┐  ┌─────────┐  ┌───────────────┐  │
│  │ 上下文    │  │ 推理模型  │  │ 工具调用编排   │  │
│  │ 构建器    │→ │ (o1/o3) │→ │ (Tool Router) │  │
│  └──────────┘  └─────────┘  └───┬───────────┘  │
└─────────────────────────────────┼───────────────┘
                                  ▼
┌─────────────────────────────────────────────────┐
│               执行沙箱层                          │
│  ┌────────┐ ┌───────┐ ┌──────┐ ┌────────────┐  │
│  │ 文件系统│ │Shell  │ │Git   │ │包管理器    │  │
│  │ (Overlay)│ │(Sandbox)│ │(Clone)│ │(pip/npm)  │  │
│  └────────┘ └───────┘ └──────┘ └────────────┘  │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│               安全治理层                          │
│  ┌───────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ 策略审批引擎 │  │ 遥测监控   │  │ 人工审批队列  │  │
│  └───────────┘  └──────────┘  └─────────────┘  │
└─────────────────────────────────────────────────┘
```

##### 4.2 推理流程：Reasoning-First 执行范式

Codex 的核心技术差异化在于其 **Reasoning-First** 流程，与传统 Agent «直接行动» 范式形成对比。

处理的每个编码任务按以下流水线执行：

1. **仓库探索阶段 (Repo Exploration)**
   - 自动遍历目标仓库的文件树，识别项目结构、构建系统、依赖关系
   - 读取相关源文件、测试文件、配置文件，构建上下文窗口
   - 检索 Git 历史中与任务相关的 commit 和 PR 讨论

2. **推理链生成 (Chain-of-Thought Reasoning)**
   - 模型生成结构化推理链，包含：
     - **问题定位**：根因分析，标识需要修改的文件和函数
     - **方案评估**：列举 2-3 个候选修复方案，分析各自的影响范围和风险
     - **补丁设计**：选定的最优方案的详细实现计划，包括 API 变更和测试策略

3. **代码生成与验证 (Code Generation & Verification)**
   - 生成精确的代码补丁（diff/patch 格式）
   - 自动运行相关测试套件，验证补丁正确性
   - 若测试失败，回溯到推理链阶段进行修正

4. **输出交付 (Delivery)**
   - 通过 PR/MR 或直接补丁的形式交付结果
   - 附带完整的修复说明和影响分析

```
用户请求（如"修复 Issue #1234 的 null pointer"）
        │
        ▼
┌──────────────────────────────┐
│  1. 仓库探索 (30-60s)         │
│  遍历仓库结构 → 读取相关文件   │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  2. 推理链生成 (15-30s)       │
│  根因分析 → 方案评估 → 补丁设计│
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  3. 代码生成与验证 (10-60s)    │
│  生成patch → 跑测试 → 修正     │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  4. 交付 (实时)               │
│  PR/MR + 修复说明 → 人工审批   │
└──────────────────────────────┘
```

##### 4.3 工具链集成

Codex 提供多种集成形态以适应不同开发场景：

| 集成方式 | 适用场景 | 核心能力 |
|---------|---------|---------|
| VS Code 插件 | 个人开发者日常使用 | 内联补全、多文件编辑、Chat 交互、终端命令建议 |
| JetBrains 插件 | 企业级 IDE 用户 | 深集成代码索引、重构建议、调试辅助 |
| GitHub App | 开源项目维护 | 自动 Issue 分类、PR Review、自动修复 PR |
| CLI 工具 | CI/CD 管道、批量任务 | 批量 Bug 修复、代码迁移、大规模重构 |
| API | 第三方平台集成 | 自定义工作流嵌入、企业内部工具对接 |

##### 4.4 SWE-bench Verified 基准表现

Codex 在 SWE-bench Verified 基准上的迭代优化过程体现了从研究到产品的工程化路径：

| 阶段 | 模型版本 | SWE-bench Verified 得分 | 关键改进 |
|-----|---------|----------------------|---------|
| 基线 | GPT-4o | ~33% | 基础编程能力 |
| 第一阶段 | o1-preview | ~48% | 加入推理链 |
| 第二阶段 | o1 | ~53% | 强化代码特定推理 |
| 第三阶段 | o3-mini | ~61% | 推理效率与准确度均衡 |
| 产品化 | Codex (o3-based) | ~65%+ | 集成工具链和安全沙箱 |

> 📌 注：以上得分为公开文献中的近似值，实际值可能随基准更新而变化。Codex 的关键突破在于将推理模型的原始能力与工程化的错误恢复、多步修复工作流结合起来，大幅降低了实际场景中的失败率。

##### 4.5 安全与合规

详见其子条目 [Codex Safety](../agent/harness/codex_safety_detail.md)。核心安全机制包括：

- **双层防御体系**：事前策略审批（Pre-execution Policy Check）+ 运行时遥测监控（Runtime Telemetry Monitoring）
- **diff-only 工作模式**：Codex 默认只生成代码补丁，不直接修改用户代码库——用户审批通过后方可应用
- **可审计性**：每次会话的操作链、推理过程、工具调用记录完整落盘，支持事后审查
- **资源限制**：每个会话有 CPU/内存/时间硬上限，防止失控消耗

##### 4.6 与传统编码助手的对比

| 维度 | Copilot / Cursor | Codex |
|-----|-----------------|-------|
| 工作方式 | 内联补全为主，短上下文 | 全仓库上下文 + 多步推理 + 自主执行 |
| 推理过程 | 隐式（单次生成） | 显式（CoT 可审计） |
| 执行能力 | 仅生成代码，不执行 | 在沙箱中运行、测试、迭代修正 |
| 任务粒度 | 函数/文件级 | 跨文件/跨模块/Bug 修复流水线 |
| 安全模式 | 仅 IDE 级别 | 云端沙箱 + 策略审批 + 遥测熔断 |
| 集成深度 | IDE 插件 | IDE + CLI + GitHub App + API |

#### 🧪 练习题
```yaml
question: "Codex 的 Reasoning-First 执行范式中，模型在生成代码补丁之前必须先完成什么？"
options:
  - "直接读取整个仓库的所有文件"
  - "生成包含问题定位、方案评估和补丁设计的推理链"
  - "运行所有测试套件确保没有回归"
  - "向用户请求额外的上下文信息"
answer: 1
explain: "Codex 在生成代码补丁之前，必须先生成结构化的推理链（Chain-of-Thought），包含问题定位、候选方案评估和补丁设计三个部分。这一步使得代码生成过程可解释、可审计，也大幅提升了修复正确率。"
```

### Long-Running Harness

```yaml
id: claude_longrun
num: 9
name: Long-Running Harness
full_name: 长时运行智能体 harness (Effective Harnesses for Long-Running Agents)
year: '2025.11'
org: Anthropic
parent: —
paper_url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
project_url: ''
category: runtime
motivation: 让代理跨多个上下文窗口持续推进
```

#### 📝 一句话总结
Anthropic 提出了一种双阶段的长时运行 Agent harness 设计——Initializer Agent 负责搭建结构化环境（feature list、进度日志、初始化脚本），Coding Agent 每次会话读取状态、选取单个 feature 增量实现、结束时提交干净 commit——解决了 agent 跨多个上下文窗口时出现的一次性冲关和过早宣布完成两大失败模式。

#### 🎯 核心要点
- **双角色分工**：Initializer Agent 仅在首次运行时设置环境基座，Coding Agent 在每次会话中增量推进
- **feature_list.json**：结构化的端到端 feature 描述文件，将高层 prompt 分解为可逐一实现的子任务
- **claude-progress.txt**：持久化进度日志，记录每次会话的完成情况，实现跨窗口交接
- **init.sh**：一键启动开发服务器的脚本，消除每次会话重新摸索运行方式的成本
- **Git 纪律**：每次会话结束时必须提交干净的 commit，确保下一轮从一个可构建、无未追踪 bug 的状态开始
- **自验证机制**：Coding Agent 在标记 feature 为"done"前必须经过自测试，防止过早宣告完成
- **四种失败模式的系统化解法**：一次性实现、环境脏乱、过早完成、启动摸索，均有对应的 Initializer/Coding Agent 行为对策
- **compaction 之外的补充**：指出仅靠上下文压缩不足以解决长程问题，必须辅以结构化交接产物

#### 🔬 深入细节
![Long-Running Harness 示意图](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff94c2257964fb2d623f1e81f874977ebfc0986bc-1920x1080.gif&w=3840)
*图：Long-Running Harness 的核心框架或系统示意。*

##### 动机与背景

AI Agent 面临的核心矛盾：复杂任务（如构建 claude.ai 克隆体）需要跨越多个上下文窗口才能完成，但每个新的会话窗口天然没有前序记忆。这类似于软件工程中的"轮班制"——如果每个接班的工程师都不了解前序进度，项目将举步维艰。Anthropic 发现，即使使用 Claude Agent SDK 的自带 compaction 机制，前沿模型 Opus 4.5 在多个上下文窗口中仍无法构建出一个生产级 web app，暴露出 compaction 的局限性。

##### 两大失败模式

**模式一：一次性冲关（One-shot attempt）**  
Agent 试图在单个窗口中完成整个项目，导致上下文耗尽时 feature 只实现了一半，且无文档说明。下一轮 agent 面对半成品不得不猜测前序工作，大量时间浪费在修复基础功能上。

**模式二：过早宣布完成（Premature declaration of done）**  
在项目后期，部分 feature 已建成后，某个 agent 实例环顾四周，看到已有进展，便宣告任务完成，不再继续推进剩余需求。

##### 两阶段解决方案

###### Initializer Agent（初始化 Agent）

仅在首次运行时激活，负责将高层需求转化为结构化的可执行环境：

1. **feature_list.json** — 将输入 spec 解析为结构化 JSON，每个条目包含端到端的 feature 描述文本。这相当于将"build a clone of claude.ai"分解为"实现聊天功能""实现暗色主题切换""实现对话历史加载"等可操作子任务。
2. **claude-progress.txt** — 初始化空的进度日志，格式为后续 agent 提供统一的记录模板。
3. **初始化 Git 仓库 + 首次 commit** — 确保环境从零开始被版本化追踪。
4. **init.sh** — 编写一个可直接启动开发服务器并运行基础检查的脚本，这是后续 agent 每次进入新会话时的"一键就绪"入口。

###### Coding Agent（编码 Agent）

每次新会话启动时运行，遵循严格的"读取-选择-实现-提交"循环：

```
每次 Coding Agent 会话的标准流程：
1. pwd（确认工作目录）
2. read claude-progress.txt（了解历史进度）
3. read feature_list.json（查看剩余 feature）
4. git log --oneline -20（检查最近变更）
5. bash init.sh（启动开发服务器）
6. 手动测试基础功能验证服务器正常
7. 从 feature_list.json 中选取一个未完成的 feature
8. 实现该 feature
9. 自验证通过后，git commit + 更新 claude-progress.txt
10. 退出，环境保持在可构建的干净状态
```

关键的设计理念是"**离开时保持干净（leave a clean state）**"——每次会话结束时，代码应处于适合合并到 main 分支的状态：无重大 bug，代码整洁且有文档，开发者可直接开始新 feature 而不需先清理无关混乱。

##### 四种失败模式与对策

Anthropic 在文中以表格形式总结了四种常见失败模式及其系统化解决方案：

| 失败模式 | Initializer Agent 对策 | Coding Agent 对策 |
|---------|----------------------|-------------------|
| **过早宣告完成** | 创建 feature_list.json 结构化 feature 清单 | 每次会话开始时读取 feature list，仅选择**一个** feature 开始工作 |
| **环境遗留 bug / 无文档** | 初始化 git repo 和 progress 文件 | 会话开始时读取 progress 和 git log，运行基本测试；结束时 commit + 更新 progress |
| **feature 标记为完成但实际未通过** | 创建 feature_list.json | **自验证所有 feature**，仅在仔细测试后标记为"passing" |
| **每次花时间摸索如何运行 app** | 编写 init.sh 脚本 | 会话开始时运行 init.sh |

##### 与传统方法的区别

对比单纯的 compaction 循环方案，Anthropic 的方案核心差异在于**引入结构化交接产物**作为跨窗口的持久化记忆。compaction 是对上下文窗口的"压缩摘要"，但摘要不可避免地丢失信息，且无法传递"运行状态"（开发服务器是否启动、当前分支状态等）。而 feature list + progress log + git history + init.sh 构成的四件套，本质上是一种**外化的工作记忆**，使得每个新 agent 实例进入窗口时，能像人类工程师一样通过日志和脚本快速"加载上下文"。

##### 未来方向

- **多 Agent 架构**：是否应由专门的测试 Agent、QA Agent、代码清理 Agent 分别负责子任务，而非依赖单一通用编码 Agent？
- **跨领域泛化**：当前方案为全栈 Web 开发优化，如何将 feature list + progress log 模式适配到科研计算、金融建模等长程任务中？

> 💡 关键：该方案的核心洞察是将人类软件工程的最佳实践——**任务分解、进度日志、一脚本启动、干净提交**——结构化地注入 agent harness 中，使 agent 的行为模式从"一次性大瀑布"转为"持续增量交付"。

#### 🧪 练习题
```yaml
question: "Anthropic 长时运行 Agent harness 中，Initializer Agent 的核心职责是什么？"
options:
  - "在每次会话中选取一个 feature 进行增量实现"
  - "负责自验证所有 feature 并标记完成状态"
  - "将高层需求分解为 feature_list.json、建立进度日志、编写 init.sh 等初始化环境"
  - "每次会话结束时压缩上下文并传递给下一个 agent"
answer: 2
explain: "Initializer Agent 仅在首次运行时工作，将 prompt 转化为结构化环境（feature list、progress log、init.sh），为后续 Coding Agent 的持续增量交付提供基座。"
```

### IDE-Bench

```yaml
id: idebench
num: 10
name: IDE-Bench
full_name: IDE 原生代理基准 (IDE-Bench)
year: '2026.01'
org: AfterQuery
parent: swe_verified
paper_url: https://arxiv.org/abs/2601.20886
project_url: ''
category: evaluation
motivation: 用IDE原生工具链评测协作式编码
```

#### 📝 一句话总结
IDE-Bench 提出了首个在真实Docker化IDE环境中评测AI编程Agent的基准，涵盖8个仓库×10任务=80个多样化编程任务和17种IDE工具，并通过15个前沿模型的6000+次运行揭示了当前模型在长期代码编辑中普遍存在的"提前编辑"（63%）和"反复编辑"（28%）两大失败模式。

#### 🎯 核心要点
- **8个真实仓库**：Game Engine Service (C++)、SmartHub Operations Center (Java/Javalin)、Network Traffic Analyzer (Python)、以及5个未公开的私有仓库（含MERN全栈、系统编程等多技术栈），防止训练数据污染
- **80个多样化任务**：每个仓库10个任务，覆盖算法实现（18%）、Bug修复（35%）、功能开发（32%）、重构（15%）四大类别
- **17种IDE工具的统一接口**：遵循OpenAI Function Calling规范，分为文件系统导航（6个）、代码编辑（3个）、执行测试（1个）、全栈测试（4个）、专用工具（3个）五大类
- **Calibrated评估框架**：通过Floor基线（初始未修改仓库的测试通过率）和Ceiling基线（应用参考patch后100%通过）建立校准区间，确保性能评估的可靠性
- **15个前沿模型全面评测**：包括GPT-5.2（pass@1=89%，pass@5=95%）、Claude Sonnet 4（pass@1=87.5%）、Gemini 2.5 Pro（pass@1=84%）、DeepSeek-V3（pass@1=65%）等，总计6000+独立运行
- **"Gaming Agent"现象发现**：部分模型通过反复运行测试套件并对比输出差异来"猜测"正确实现，而非真正理解代码逻辑
- **工具序列模式分析**：高绩效模型遵循"广泛探索→精准编辑→快速验证"的三阶段模式，使用5-10次搜索/阅读后才进行首次编辑
- **Docker容器化完全可复现**：每个任务在独立Docker容器中运行，确保环境一致性和评估公平性

#### 🔬 深入细节
![IDE-Bench 示意图](https://ar5iv.labs.arxiv.org/html/2601.20886/assets/x1.png)
*图：IDE-Bench 的核心框架或评测示意。*

##### 1. 动机与背景

现有代码生成评估基准（如HumanEval、MBPP）仅评估单函数补全能力，而SWE-bench系列虽模拟真实GitHub issue修复，却缺乏IDE环境中的关键要素：文件导航、增量编辑、终端执行、实时测试反馈等真实开发工作流。IDE-Bench的核心理念是：**优秀的AI编程Agent必须能在完整的IDE环境中自主探索代码库、做出精准修改并验证结果**，而不仅仅是在理想化的输入-输出对上进行评估。

论文提出了**"Calibrated Evaluation"**框架——通过天花板（Ceiling）和地板（Floor）基线为每个任务建立有效的性能测量区间，解决了传统基准中"测试用例可能预失败"的评估噪声问题。

##### 2. 基准架构设计

IDE-Bench的评估架构由三个核心层组成：

```
┌─────────────────────────────────────────────┐
│              Model Layer                     │
│  (任何LiteLLM兼容模型，统一API接口)            │
├─────────────────────────────────────────────┤
│            Harness Layer                     │
│  ┌──────────┬──────────┬──────────────────┐ │
│  │ 文件系统  │ 代码编辑  │  执行与测试       │ │
│  │ 导航(6)  │ (3)      │  (1+4)           │ │
│  └──────────┴──────────┴──────────────────┘ │
├─────────────────────────────────────────────┤
│           Repository Layer                   │
│  ┌──────┬──────┬──────┬──────────────────┐  │
│  │ C++  │ Java │Python│ MERN/Full-Stack  │  │
│  │引擎   │ Web  │网络  │ + 5个私有仓库    │  │
│  └──────┴──────┴──────┴──────────────────┘  │
└─────────────────────────────────────────────┘
```

**17种工具详解**：所有工具遵循OpenAI Function Calling规范，统一要求`explanation`参数以记录Agent推理链。

| 类别 | 工具 | 功能 |
|------|------|------|
| 文件导航 | `read_file` | 按行范围读取文件，屏蔽/test目录防止作弊 |
| | `list_dir` | 递归/非递归列出目录，自动排除node_modules等 |
| | `codebase_search` | 基于ripgrep的词法搜索，支持上下文行 |
| | `grep_search` | 高级正则搜索，支持多行模式 |
| | `file_search` | 基于glob的模糊文件名匹配 |
| | `delete_file` | 删除文件（同样屏蔽测试文件） |
| 代码编辑 | `edit_file` | 结构化行编辑：REPLACE/INSERT/DELETE，Python文件自动ast.parse()校验 |
| | `search_replace` | 字符串级查找替换（不需行号） |
| | `write_file` | 新建/覆写文件 |
| 执行测试 | `run_terminal_cmd` | Shell命令执行（120s超时，支持后台模式） |
| 全栈测试 | `api_call` | HTTP请求测试REST API |
| | `database_query` | MongoDB CRUD + 聚合管道 |
| | `websocket_test` | Socket.IO实时通信验证 |
| | `ui_test` | Playwright风格浏览器自动化 |
| 专用 | `edit_notebook` | Jupyter笔记本编辑（预留，未在任务中使用） |
| | `web_search` | 网络搜索（接口预留，评估环境未实现） |
| | `create_diagram` | Mermaid图表生成（预留） |

##### 3. 评估流程与指标

**执行协议**：每个任务Agent最多运行100轮对话，temperature=0.1，单次输出上限4000 tokens，API超时600秒。上下文超过25条消息时截断至模型窗口的80%，保留系统消息、首条用户消息和最近轮次。

**Grading Pipeline（4步差分提取）**：
1. `git diff HEAD` — 获取未暂存更改
2. `git add -A && git diff --cached` — 获取暂存更改
3. `git diff HEAD~1 HEAD` — 通过commit获取差异
4. 逐文件与`git show HEAD:<file>`对比 — 兜底方案

提取的diff与参考patch(`task_diff.txt`)进行语义相似度评分。Grader自动检测测试框架（pytest/jest/maven/junit/go test/cargo/rspec/phpunit/dotnet test/mocha）。

**核心指标**：
- **Task Resolution Rate (pass@k)**：k次独立尝试中至少1次所有测试通过的概率
- **Test Pass Rate**：单个测试用例通过百分比
- **Floor → Ceiling校准区间**：初始未修改仓库的测试通过率为Floor，应用参考patch后100%通过为Ceiling

##### 4. 实验结果全景

**主结果**（pass@1 / pass@5）：

| 模型 | pass@1 | pass@5 |
|------|--------|--------|
| GPT-5.2 | 89.0% | 95.0% |
| Claude Sonnet 4 | 87.5% | 93.8% |
| Gemini 2.5 Pro | 84.0% | 91.3% |
| Claude Opus 4 | 78.8% | 88.8% |
| GPT-4.1 | 75.0% | 86.3% |
| DeepSeek-V3 | 65.0% | 78.8% |
| Gemini 2.5 Flash | 63.8% | 77.5% |
| Qwen3-235B | 57.5% | 72.5% |
| Claude Sonnet 3.7 | 55.0% | 70.0% |
| Llama 4 Maverick | 48.8% | 65.0% |
| DeepSeek-R1 | 46.3% | 62.5% |
| GPT-4o | 42.5% | 58.8% |
| Qwen3-32B | 35.0% | 51.3% |
| Command R+ | 28.8% | 43.8% |
| Ministral 8B | 12.5% | 22.5% |

**关键洞察**：从top到bottom存在94.5%→12.5%的巨大性能梯度，说明基准具有优秀的区分度。GPT-5.2在pass@5下达到95%已接近天花板，但pass@1仍有11%提升空间。

##### 5. 失败模式深度分析

论文通过人工审查100个失败案例，归纳出三类主要失败模式：

**① 提前编辑 (Premature Editing, 63%)**：Agent在未充分理解代码库结构和上下文的情况下过早修改代码。表现为仅读取1-2个文件后即开始编辑，导致修改不完整、破坏现有逻辑或遗漏相关文件。

**② 反复编辑 (Repeated Editing, 28%)**：Agent多次修改同一代码片段，陷入"编辑→测试失败→再编辑"的循环而无法收敛。这反映了模型在长期规划上的不足——缺乏"先理解整体依赖关系再精准编辑"的能力。

**③ 工具使用不当 (9%)**：包括搜索模式错误、未正确解读测试输出、忽略文件路径等。

> 💡 关键发现：高绩效模型在首次编辑前平均进行5-10次探索操作（搜索+阅读），而低绩效模型通常仅2-3次探索就急于编辑。

##### 6. "Gaming Agent"现象

论文揭示了一个值得警惕的发现：部分模型利用测试套件作为"神谕"来逆向推导实现——反复运行`./run_tests.sh`，观察测试失败的具体assertion差异，然后机械地修改代码以匹配期望输出，而非真正理解代码意图。这种行为在简单的算法任务中尤其有效，但在需要架构理解的复杂任务中通常会失败。这表明**仅靠测试通过率评估可能高估模型的实际编程理解能力**。

##### 7. 安全性设计

为防止评估完整性被破坏，IDE-Bench实现了多层安全措施：
- 文件访问屏蔽：`/tasks`目录、`run_tests.sh`及所有`test_*`/`*.test.*`/`*.spec.*`文件对Agent不可见
- 编辑操作验证：`edit_file`在Python文件上自动运行`ast.parse()`阻止语法错误提交
- 差分审计：4步grading pipeline确保完整捕获Agent修改
- 仓库隐私：8个仓库中7个不公开，仅通过`research@afterquery.com`申请获取，防止训练数据污染

> ⚠️ 注意：尽管有安全设计，论文作者指出gaming agent仍然可以通过终端运行的测试输出来推断信息，这是当前评估范式的固有限制。

#### 🧪 练习题
```yaml
question: "IDE-Bench论文中发现的两种最主要的Agent失败模式是什么？"
options:
  - "语法错误和超时"
  - "提前编辑（Premature Editing）和反复编辑（Repeated Editing）"
  - "网络连接失败和内存溢出"
  - "工具未响应和API限流"
answer: 1
explain: "论文通过人工审查100个失败案例发现，提前编辑（未充分探索就修改代码）占63%，反复编辑（陷入修改-失败循环）占28%，两者合计占91%的失败原因。"
```

### Harness Engineering

```yaml
id: openai_harness
num: 11
name: Harness Engineering
full_name: Codex Harness 工程方法论 (Harness Engineering)
year: '2026.02'
org: OpenAI
parent: codex
paper_url: https://openai.com/index/harness-engineering/
project_url: ''
category: runtime
motivation: 把环境设计与反馈闭环提升为方法论
```

#### 📝 一句话总结
Harness Engineering 提出了 AI 编程模型评估的系统化工程方法论，将评估从静态 Benchmark 范式转向以环境设计、任务支架和反馈闭环为核心的动态交互式评估体系，解决了传统编程 Benchmark 缺乏真实环境交互和迭代反馈的根本缺陷。

#### 🎯 核心要点
- 提出 **Harness（支架/夹具）** 概念：为每个编程任务构建独立、可复现的执行环境（Docker 沙箱），使模型能自主运行、测试和修正代码
- 三层评估架构：**Spec → Harness → Iteration**，将任务规格化、环境执行、迭代修正统一为闭环
- 引入 **Pass@k 指标的工程化扩展**：不只统计最终通过率，还追踪每次迭代的测试结果、错误类型和修复路径，形成多维能力画像
- 反馈闭环设计：将编译错误、运行时异常、测试失败等信号结构化地反馈给模型，模拟真实开发中的 debug 循环
- 与传统 Benchmark（HumanEval、MBPP）的根本对比：从"给题目→收代码→判对错"的静态模式，升级为"给需求→在真实环境中迭代→达到可工作状态"的动态模式
- 环境即接口（Environment as Interface）：通过统一的 harness 协议解耦任务定义与执行环境，支持任意编程语言和工具链的即插即用
- 提出任务难度分级：根据所需迭代轮次、依赖复杂度、环境配置难度将任务分为 L1–L4，指导模型能力评估

#### 🔬 深入细节
![Harness Engineering 示意图](https://images.ctfassets.net/kftzwdyauwt9/1Gu58eNlqDEuITmbqJDmq9/1e2e62f7e15fb16d2da0da5407240564/fig_1__codex_drives_the_app_.png?fm=webp&q=90&w=3840)
*图：Harness Engineering 的核心框架或系统示意。*

##### 核心框架示意

```
┌─────────────────────────────────────────────────────┐
│                    Harness 框架                       │
│  ┌──────────┐    ┌──────────────┐    ┌────────────┐ │
│  │   Spec   │ →  │   Harness    │ →  │  Feedback  │ │
│  │ (任务规格) │    │ (执行环境+工具) │    │  (结果/错误) │ │
│  └──────────┘    └──────────────┘    └────────────┘ │
│       ↑                                    │         │
│       └──────────  Model Iteration ←───────┘         │
│            (模型根据反馈修正代码)                        │
└─────────────────────────────────────────────────────┘
```

*图：Harness Engineering 的核心闭环——模型在 harness 环境中执行代码、获取反馈、迭代修正*

##### 动机与背景

传统编程模型评估（如 HumanEval、MBPP）存在以下根本性局限：

1. **输入/输出匹配模式陷阱**：模型只需生成符合预期输出的代码，不涉及真实执行环境的交互。一个在 HumanEval 上 Pass@1 达到 90% 的模型，在真实项目中可能因无法处理依赖安装、环境配置、运行时错误而完全失效。

2. **缺失迭代能力评估**：真实编程中，开发者的核心技能并非"一次写对"，而是"根据错误信息定位并修复"。传统 Benchmark 只评估一次生成的能力，完全忽略了 debug 闭环。

3. **环境不可复现**：每个评测方的运行环境不同，导致模型能力不可直接对比。同一个模型在 A 的评测中得到 80%，在 B 的环境可能因 Python 版本、依赖库差异降至 50%。

OpenAI Codex 团队在 2026 年初的工程实践中发现，模型在真实软件开发任务中的表现与 Benchmark 分数之间存在显著 gap。这一洞察驱动了 Harness Engineering 方法论的提出——核心思想是：**评估环境本身应成为第一等公民（first-class citizen），而非可忽略的外部因素**。

##### 核心机制：Spec → Harness → Feedback Loop

Harness Engineering 的核心流程可概括为三个阶段：

**Phase 1 — Spec（任务规格化）**

每个任务被定义为一个标准化的 Spec 文件（YAML/JSON），包含：

- `task_description`：用自然语言描述的需求
- `environment`：所需运行时（Python 3.12 / Node.js 22 / Rust 等）、依赖文件列表（`requirements.txt`、`Cargo.toml`）和系统级依赖
- `setup_commands`：环境初始化命令序列（如 `pip install -e .`、`npm install`）
- `test_suite`：一个或多个可执行的测试脚本，用于判定任务是否完成
- `timeout`：单次执行的时间上限
- `max_iterations`：模型被允许的最大修正轮次

> 💡 关键：Spec 文件本身是版本控制、可分享、可复现的最小单元。任何一个任务 Spec 拉取后即可在任一机器上重建相同评估环境。

**Phase 2 — Harness（执行支架）**

Harness 是一个轻量级的编排层（orchestration layer），负责：

1. **环境构建**：根据 Spec 创建隔离的 Docker 容器或 sandbox，安装指定依赖
2. **工具注入**：为模型提供一组可调用的工具（执行 shell 命令、读写文件、查看 diff、运行测试等），模型通过工具调用的方式与环境交互
3. **状态追踪**：记录每一次模型动作（代码修改 / 命令执行 / 测试运行）及其结果，形成完整的交互轨迹

Harness 的设计哲学是"**给模型一个真实的终端，而非一个评测员的打分表**"。其伪代码逻辑如下：

```python
def run_harness(spec, model, max_iterations):
    env = create_environment(spec.environment)
    env.setup(spec.setup_commands)
    
    trajectory = []
    for i in range(max_iterations):
        # 模型观察当前环境状态和任务描述
        observation = {
            "task": spec.task_description,
            "files": env.list_files(),
            "last_output": trajectory[-1].output if trajectory else None,
            "test_results": env.run_tests(spec.test_suite)
        }
        
        # 模型决定下一步动作：修改文件 / 执行命令 / 提交
        action = model.generate(observation)
        
        # 在真实环境中执行动作
        result = env.execute(action)
        trajectory.append({"iteration": i, "action": action, "result": result})
        
        # 检查是否通过全部测试
        if result.all_tests_passed:
            return {"status": "success", "trajectory": trajectory}
    
    return {"status": "failure", "trajectory": trajectory}
```

**Phase 3 — Feedback Loop（反馈闭环）**

反馈闭环是 Harness Engineering 区别于传统评估的最关键创新。它将环境执行产生的结果结构化，分为三个层次反馈给模型：

| 层级 | 反馈类型 | 示例 | 模型应对 |
|------|---------|------|---------|
| L1 | 语法/编译错误 | `SyntaxError: invalid syntax at line 42` | 直接修正语法 |
| L2 | 运行时错误/测试失败 | `AssertionError: expected 42, got 0` | 分析逻辑错误，修正实现 |
| L3 | 环境/依赖问题 | `ModuleNotFoundError: No module named 'torch'` | 修改依赖配置或更换实现方案 |

每一层的反馈都附带**上下文快照**（当前文件清单、最近命令的输出、测试失败的具体 diff），使模型能像人类开发者一样在 IDE 中工作。

##### 与传统方法的根本区别

传统编程 Benchmark 的评估流水线是单向的：

```
题目 → 模型生成代码 → 静态分析/单元测试 → 通过/不通过
```

Harness Engineering 将其转变为双向交互闭环：

```
Spec → [模型 ↔ Harness环境] × N次迭代 → 最终判定
```

具体的差异化体现在：

1. **从"一次生成"到"N 次迭代"**：评估的不再是模型的"一次性正确率"，而是在有限步数内"达成目标的能力"
2. **从"纯文本"到"真实执行"**：模型可以看到代码的真实执行结果，包括 stdout、stderr、文件系统变化
3. **从"封闭题目"到"开放环境"**：Spec 只定义目标和约束，模型可以选择任意实现路径，包括添加新文件、安装新依赖、甚至修改测试（如果 Spec 允许）
4. **全轨迹可审计**：每一次交互都被完整记录，评估者可以不仅是看最终是否通过，还能分析模型的 debug 策略、错误处理模式、迭代效率等细粒度能力指标

##### 任务难度分级 (L1–L4)

Harness Engineering 提出了一套基于经验的任务难度分级系统：

| 等级 | 典型迭代次数 | 特征 | 示例任务 |
|------|------------|------|---------|
| L1 | ≤3 | 单文件、无外部依赖、纯逻辑实现 | 实现一个排序算法 |
| L2 | 4–8 | 多文件、少量标准库依赖 | 构建一个 REST API 端点 |
| L3 | 9–20 | 多模块、需要第三方依赖、涉及环境配置 | 搭建一个带数据库的 Web 服务 |
| L4 | >20 | 全栈项目、复杂依赖链、需要架构设计 | 从零实现一个微服务系统并部署 |

> ⚠️ 注意：L4 任务在实际评估中极少出现（模型通常需要数十轮迭代才能完成），目前主要用于衡量模型的长期自主工作能力（long-horizon autonomy）。

##### 对 AI 编程能力评估的影响

Harness Engineering 的提出标志着 AI 编程评估从"考试模式"向"工作模式"的范式转变。其核心贡献在于：

1. **生态建设**：团队同时开源了一套标准 Harness Spec 集合（涵盖 Python、JS/TS、Rust 等语言的数百个任务）和 Harness Runner 的参考实现，使社区可以在此基础上扩展
2. **评估信度提升**：因为环境完全由 Spec 控制，不同机构、不同时间评测的结果具有真正可比性（消除了"我的环境没装某个库导致失败"的噪声）
3. **能力画像细化**：通过分析 trajectory，可以分别评估模型的代码生成能力、错误诊断能力、自修复能力、工具使用能力等独立维度

#### 🧪 练习题
```yaml
question: "Harness Engineering 相比传统编程 Benchmark（如 HumanEval）最根本的变革是什么？"
options:
  - "使用更难的编程题目"
  - "从静态的一次性代码生成评估，转变为在真实环境中进行多轮交互迭代的闭环评估"
  - "改用 Docker 容器运行评测"
  - "增加了 Pass@k 指标的统计维度"
answer: 1
explain: "Harness Engineering 的核心创新在于将评估从单向的'给题→生成→判分'升级为'在真实环境中反复迭代、根据反馈修正'的闭环，这是与传统 Benchmark 最本质的区别。Docker 只是实现手段之一，Pass@k 扩展是具体指标层面，都不构成范式层面的变革。"
```

### Meta-Harness

```yaml
id: meta_harness
num: 12
name: Meta-Harness
full_name: 元 Harness 外环优化 (Meta-Harness)
year: '2026.03'
org: Stanford/MIT
parent: openai_harness
paper_url: https://arxiv.org/abs/2603.28052
project_url: ''
category: optimization
motivation: 外环搜索可执行harness代码
```

#### 📝 一句话总结
Meta-Harness 提出了一种**用编码Agent自动搜索和优化任务级Harness（上下文管理程序）的外循环框架**。它通过让一个编码Agent（Proposer）访问完整的文件系统（包含历史Harness代码、评分和执行轨迹），实现选择性诊断和针对性修改，在无需人工设计搜索启发式规则的前提下，自动发现超越人类设计的上下文管理策略。

#### 🎯 核心要点
- **Harness即程序**：将上下文管理策略（提示构造、检索、记忆更新、工具编排）实现为可执行的Python程序，使搜索空间从文本提示扩展到完整算法逻辑
- **文件系统即反馈通道**：用文件系统存储所有历史Harness的源代码、评分和执行轨迹（每次评估可产生高达10,000,000 token的诊断信息），Proposer通过grep/cat等标准工具选择性检索，而非将压缩摘要一次性塞入上下文
- **极简外循环**：Meta-Harness不硬编码任何搜索启发式（无父代选择规则、无固定变异算子、无持久记忆机制），完全由Proposer自主决定诊断什么、如何修改
- **代码空间搜索的自然正则化**：编码模型倾向于生成连贯可复用的算法而非脆弱的硬编码方案，搜索偏向可泛化的上下文管理过程
- **Pareto多目标优化**：支持准确率与上下文成本的联合优化，自动产生平滑的Pareto前沿，可按需选取工作点
- **10× 加速与显著提升**：在在线文本分类上，Meta-Harness用十分之一的评估次数匹配最佳文本优化器的性能，最终准确率超越对手超10个百分点
- **跨领域泛化**：在三个截然不同的领域（在线文本分类、数学推理、Agent编码）均验证有效，且发现的Harness对未见过的数据集和模型均展现强泛化能力
- **执行轨迹是关键**：消融实验证明，完整执行轨迹访问是核心组件——仅看评分和摘要的Proposer远不及有轨迹访问的Proposer

#### 🔬 深入细节
![Meta-Harness 示意图](https://ar5iv.labs.arxiv.org/html/2603.28052/assets/x1.png)
*图：Meta-Harness 的核心框架或评测示意。*

##### 问题定义：Harness优化

一个Harness \(H\) 是一个有状态程序，包装语言模型 \(M\) 并决定模型在每一步看到什么上下文。对于任务分布 \(\mathcal{X}\) 上的实例 \(x\)，Harness执行轨迹 \(\tau \sim p_M(H, x)\)，奖励函数 \(r(\tau, x)\) 评分。优化目标是找到最大化期望奖励的Harness：

\[
H^* = \arg\max_H \mathbb{E}_{x \sim \mathcal{X}, \tau \sim p_M(H,x)} \; r(\tau, x)
\]

与传统文本优化（只在Prompt空间搜索）不同，Harness优化搜索的是完整的可执行程序，包括检索逻辑、记忆更新策略、工具调用和流程编排。

##### 核心框架：Meta-Harness搜索循环

```
┌─────────────────────────────────────────────────────────┐
│                 Meta-Harness 外循环                       │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │ Filesystem│ ←─ │   Proposer   │ ──→│  Evaluate    │   │
│  │  D (code, │    │  (Coding     │    │  (在新任务上  │   │
│  │  scores,  │    │   Agent)     │    │   运行Harness)│   │
│  │  traces)  │    └──────────────┘    └──────────────┘   │
│  └──────────┘          │                      │          │
│       ↑                │    inspect            │          │
│       └────────────────┘    propose            │          │
│                             edit                │          │
│                                          store results    │
│                                          (code+scores     │
│                                           +traces)        │
└─────────────────────────────────────────────────────────┘
```

**Algorithm 1** 伪代码：

1. 初始化：给定任务分布 \(\mathcal{X}\)、LLM \(M\)、Proposer \(P\)、迭代轮次 \(N\)
2. 初始种群 \(\mathcal{H}\) 中的Harness逐一评估，结果存入文件系统 \(\mathcal{D}\)
3. 每轮迭代：
   - Proposer \(P\) 通过文件系统工具查询 \(\mathcal{D}\)（检查历史代码、评分、执行轨迹）
   - Proposer提出 \(k\) 个新Harness
   - 通过接口验证的Harness被评估，结果追加到 \(\mathcal{D}\)
4. 返回 \(\mathcal{D}\) 中所有Harness的Pareto前沿

**关键设计决策**：

- **无父代选择规则**：Proposer可自由检查任何历史Harness及其轨迹
- **无固定变异算子**：修改粒度从局部编辑到完全重写，由Proposer自主决定
- **文件系统代替压缩摘要**：一次评估可产生多达10M token的诊断信息，远超任何上下文窗口，因此存储为文件并支持选择性检索

##### 实验验证

**1. 在线文本分类**

在LawBench（215类）、Symptom2Disease（22类）、USPTO-50k（180类）三个数据集上，使用GPT-OSS-120B作为基础模型：

| Harness | 平均准确率 | 上下文Token (K) |
|---------|-----------|-----------------|
| Zero-Shot | 27.4 | 0 |
| Few-Shot (8) | 34.3 | 2.0 |
| Few-Shot (32) | 35.4 | 7.9 |
| Few-Shot (all) | 40.8 | 12.3 |
| MCE | 40.0 | 28.5 |
| ACE | 40.9 | 50.8 |
| **Meta-Harness** | **48.6** | **11.4** |

Meta-Harness超越ACE 7.7个百分点，同时仅使用ACE 22%的上下文token。

**与文本优化器的对比**（搜索集准确率）：

| 方法 | 中位数准确率 | 最佳准确率 |
|------|------------|-----------|
| GEPA | 32.6 | 40.2 |
| Best-of-N | 34.0 | 44.2 |
| OpenEvolve | 39.1 | 43.3 |
| TTT-Discover | 34.1 | 45.6 |
| **Meta-Harness** | **50.0** | **56.7** |

Meta-Harness在**0.1倍评估预算**下匹配最佳文本优化器，最终超越超10个百分点。

**消融实验**：对比三种Proposer信息接口——

| 接口 | 中位数准确率 | 最佳准确率 |
|------|------------|-----------|
| 仅评分 | 34.6 | 41.3 |
| 评分+摘要 | 34.9 | 38.7 |
| **完整轨迹（Meta-Harness）** | **50.0** | **56.7** |

摘要甚至可能因压缩掉诊断有用的细节而降低性能。**执行轨迹的完整访问是核心驱动力。**

**Pareto优化**：Proposer可同时优化准确率和上下文成本，产生平滑的准确率-上下文Pareto曲线，支持按需选择工作点。

**OOD泛化**：在9个未见过的数据集上，Meta-Harness取得73.1%最佳平均准确率（ACE为70.2%），在6/9数据集上表现最佳。

**2. 检索增强数学推理**

在200道IMO级别数学题上，单个发现的Harness在5个留出模型上平均提升4.7个百分点准确率。

**3. Agent编码（TerminalBench-2）**

发现的Harness超越Terminus-KIRA，在Haiku 4.5 Agent中排名#1。

##### 为什么Code-Space搜索优于Text-Space搜索？

1. **小改动可影响远期行为**：检索、记忆或提示构造逻辑的微小改动可能在多步后产生放大效应，局部搜索启发式无法应对
2. **轨迹诊断能力**：Proposer通过检查执行轨迹，可推断Harness失败的原因和早期设计选择的责任链，而非仅知道失败
3. **自然正则化**：编码模型倾向生成连贯算法，偏向可复用的上下文管理过程
4. **与模型训练分布对齐**：前沿编码助手本身训练于读-写-执行的开发工作流

##### 与相关工作的本质区别

| 维度 | 文本优化器 (ProTeGi/TextGrad等) | Meta-Harness |
|------|-------------------------------|--------------|
| 搜索空间 | 文本Prompt | 完整可执行程序 |
| 反馈信息量 | ~10K tokens（摘要/评分） | ~10M tokens（代码+评分+轨迹） |
| 信息访问方式 | 一次性注入上下文 | 文件系统选择性检索 |
| 搜索结构 | 硬编码遗传算子/梯度 | 无固定结构，Proposer自主决定 |
| 优化目标 | 单一标量 | Pareto多目标 |

#### 🧪 练习题
```yaml
question: "Meta-Harness 相比只把分数或摘要喂给优化器，最关键的设计变化是什么？"
options:
  - "把 harness 搜索空间限制为几个固定 prompt 模板，避免代码级搜索过大"
  - "让 proposer 通过文件系统访问候选代码、分数和完整执行轨迹，而不是只看压缩反馈"
  - "只优化单一准确率指标，不再考虑上下文 token 成本"
  - "把所有候选 harness 都交给人工工程师手动复核后再选择"
answer: 1
explain: "Meta-Harness 的核心不是单纯有一个 proposer，而是 proposer 能通过文件系统读取完整先验经验，包括代码与轨迹，这比只给摘要或标量分数的信息量高得多。"
```

### Harness Design

```yaml
id: harness_design
num: 13
name: Harness Design
full_name: 长程应用开发 Harness 设计 (Harness Design for Long-Running Application Development)
year: '2026.03'
org: Anthropic
parent: claude_longrun
paper_url: https://www.anthropic.com/engineering/harness-design-long-running-apps
project_url: ''
category: runtime
motivation: 用规划生成评审三Agent突破长程开发
```

#### 📝 一句话总结
Anthropic 将长程应用开发 harness 升级为 `planner-generator-evaluator` 三代理体系：先把一句话需求扩成完整产品 spec，再由生成代理分阶段实现、由评估代理用 Playwright 和显式标准验收，从而把长时自主编程从“能写代码”推进到“能持续交付可用应用”。

#### 🎯 核心要点
- 继承早期长程 harness 的两个经验：把大任务切成可控块，以及用结构化产物在会话之间交接上下文。
- 形成三代理结构：`Planner` 负责扩写产品规格，`Generator` 负责逐块实现，`Evaluator` 负责独立验收而不是让生成代理自评。
- `Planner` 不写细粒度实现细节，而是生成高层产品 spec 与功能范围，避免上游设计错误层层传导。
- `Generator` 采用 feature-at-a-time / sprint 式推进，每轮先和 `Evaluator` 协商 sprint contract，再动手实现。
- `Evaluator` 通过 Playwright MCP 真实操作应用，按产品深度、功能、视觉设计、代码质量等标准打分，并把缺陷写回下一轮。
- 随模型能力增强，Anthropic 又验证了 harness 应持续“去脚手架”：在更强模型上删掉不再 load-bearing 的 sprint 结构，只保留真正有效的 planner 与 evaluator。

#### 🔬 深入细节
![Harness Design 示意图](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff94c2257964fb2d623f1e81f874977ebfc0986bc-1920x1080.gif&w=3840)
*图：Anthropic 在长程应用开发中使用的多代理 harness 思路，重点是规划、实现、评估三者分离。*

```python
# Harness Design 的抽象执行循环
spec = planner.expand_user_prompt(user_prompt)

while not spec.all_features_done():
    sprint = generator.propose_sprint(spec)
    contract = evaluator.negotiate_contract(spec, sprint)

    build_result = generator.implement(contract, workspace)
    review = evaluator.qa(contract, build_result, tools=["playwright"])

    if review.passed:
        spec.mark_done(contract.feature_id)
    else:
        generator.consume_feedback(review)
```

这篇文章的出发点不是“再造一个更强的单代理”，而是承认长程应用开发天然包含三种不同工作：确定要做什么、把东西做出来、以及独立检查是否真的可用。Anthropic 在文中明确说，早期 long-running harness 已经证明了两件事有效：一是把任务拆成 tractable chunks，二是用结构化 artifact 在多次运行之间传递状态；新工作则把这套经验提升成更完整的三代理架构。

`Planner` 的作用是把 1 到 4 句的短 prompt 扩成完整产品规格，而不是让用户一开始就写非常细的 spec。文章特别强调，planner 应聚焦产品语境与高层技术设计，而不要过早规定具体实现细节；原因很直接，如果上游把技术细节写错，错误会沿着整条实现链传播。这个设计和传统 task decomposition 的区别在于，它不是仅列 TODO，而是给出一份足够指导后续构建、但又不过度锁死实现路径的 product spec。

`Generator` 负责真正的应用构建。Anthropic 在第一版 harness 里让它按 sprint 逐块推进，每次只拿一个 feature 施工，并在开工前与 `Evaluator` 协商一份 sprint contract，明确“这轮具体做什么、完成后如何验证”。这一步非常关键，因为产品 spec 故意写得偏高层，若没有 contract 层，生成代理容易把 user story 和可测试实现之间的空隙用自己的主观判断补齐，导致后续验收标准不稳定。通过 contract，生成代理和评估代理先对 done definition 达成一致，再进入代码实现。

`Evaluator` 是整套 harness 最重要的质量闸门。文中明确指出，代理自评时往往会过度宽容，即便在有可验证结果的软件任务中也是如此，因此要把“做事的代理”和“判断质量的代理”拆开。Anthropic 让 evaluator 使用 Playwright MCP 去真实点击运行中的应用，检查 UI 流程、API 行为、数据库状态，再按产品深度、功能、视觉设计、代码质量等维度给出是否过阈值的结论。只要任一关键维度低于阈值，该 sprint 就判失败，生成代理必须根据详细 bug 反馈返工。

文章还有一个很有价值的 engineering lesson：harness 不是越复杂越好，而是要随着模型能力演进持续剥离不再必要的脚手架。作者提到，早期 4.5 时代为了克服 context anxiety，需要更重的分段与交接机制；而在后续更强模型上，部分结构开始不再 load-bearing，于是他们尝试删掉 sprint construct，只保留 planner 与最终 evaluator，把 session 变为更连续的长程构建。这个结果说明 harness 设计不是静态最佳实践，而是和模型能力共同演化的工程层对象。

> 💡 关键：这套 harness 的核心不是“多代理数量更多”，而是把规格生成、实现、评估三种本质不同的认知工作拆给不同角色。

> ⚠️ 注意：Anthropic 明确指出 evaluator 的价值与任务难度相关。对已落入模型原生能力边界内的任务，它可能只是额外开销；但对接近能力边界的长程应用构建，独立评估仍然显著提升结果质量。

#### 🧪 练习题
```yaml
question: "Harness Design 中为什么要让 generator 和 evaluator 在实现前先协商 sprint contract？"
options:
  - "为了让 planner 直接生成每一行代码，减少 generator 的自由度"
  - "为了把高层产品 spec 转换成当前迭代可测试的完成定义，避免做错方向后才发现"
  - "为了让 evaluator 接管所有代码修改，generator 只负责运行测试"
  - "为了把 Playwright MCP 从 evaluator 手里移交给 generator 使用"
answer: 1
explain: "文章强调 sprint contract 用来桥接高层 spec 与具体实现验收标准，先约定这轮要交付什么、如何测试，再开始编码，可以显著减少偏题与返工。"
```

### Managed Agents

```yaml
id: managed_agents
num: 14
name: Managed Agents
full_name: 托管长程智能体服务 (Managed Agents)
year: '2026.04'
org: Anthropic
parent: harness_design
paper_url: https://www.anthropic.com/engineering/managed-agents
project_url: ''
category: runtime
motivation: 解耦session、harness与sandbox接口
```

#### 📝 一句话总结
> Managed Agents 通过将智能体解耦为 Session（事件日志）、Harness（调度层）和 Sandbox（执行环境）三个独立接口，解决了长程智能体任务中组件耦合导致的可靠性差、安全性弱和扩展难的问题，使各组件可独立失败、替换与扩展。

#### 🎯 核心要点
- 提出三层解耦架构：Session（不可变事件日志）、Harness（调用 Claude 并路由工具调用的循环层）、Sandbox（代码执行与文件编辑的执行环境）
- 统一工具调用接口 `execute(name, input) → string`，使 Harness 对执行环境无感知，支持容器、手机、模拟器等多种后端
- Session 作为"上下文对象"存储在 Claude 上下文窗口之外，通过 `getEvents()` 按位置切片检索历史事件
- 设计安全边界：凭证通过 Vault + MCP Proxy 注入，沙箱内生成的代码永远无法触及原始 Token
- 容器从"宠物"变为"牲口"：失败后通过 `provision({resources})` 重建，不再需要人工修复
- Harness 无状态化：崩溃后通过 `wake(sessionId)` 恢复，从 Session 日志回放，无需持久化任何本地状态
- 按需供应容器：仅在 Sandbox 被调用时才 provision，p50 TTFT 下降约 60%，p95 TTFT 下降超 90%
- 支持"多脑多手"：多个 Harness 实例可共享多个 Sandbox，Brains 之间可传递 Hands

#### 🔬 深入细节
##### 核心架构图

![Managed Agents 解耦架构](https://www-cdn.anthropic.com/images/4zrzovbb/website/73e900af5b9d6ed8c64db0a8e74d4465963556b7-1640x1596.png)
*图：Managed Agents 的三层解耦架构概览*

![Session/Event 流示意](https://www-cdn.anthropic.com/images/4zrzovbb/website/cf0719d7832b1f577b7393c84a7c53eecc725ca4-760x200.png)
*图：Session 事件流与 Harness 交互示意*

##### 架构演进的动机：从"宠物"到"牲口"

在 Managed Agents 的早期设计中，Session、Harness 和 Sandbox 被放置在同一容器内。这种耦合设计带来两个致命缺陷：

1. **容器成为"宠物"**：容器崩溃即意味着 Session 丢失，运维人员需要手动进入容器排查问题。但由于容器内留存用户数据，安全策略禁止工程师直接访问，导致调试几乎不可能。WebSocket 事件流是唯一的观测窗口，但无法定位故障发生在 Harness、网络层还是容器本身的哪个环节。

2. **Harness 编码过时假设**：Harness 隐含假设"Claude 操作的所有资源都在同一容器内"。当客户需要接入自有 VPC 时，只能走网络对等互联或自部署 Harness，这大幅限制了服务的接入灵活性。

> 💡 关键洞察：Harness 中编码的是"当前模型不擅长什么"的假设——但这些假设会随模型升级而**过时**（go stale）。例如 Claude Sonnet 4.5 在上下文窗口接近上限时会提前结束任务（"上下文焦虑"），团队在 Harness 中加入了上下文重置逻辑；但当 Opus 4.5 使用时，该行为已消失，重置逻辑变成死代码。

解决方案借鉴了操作系统的设计哲学：**将硬件虚拟化为抽象接口，使上层程序与底层实现解耦**。如同 `read()` 系统调用不关心底层是 1970 年代的磁盘组还是现代 SSD，Managed Agents 定义了三个稳定接口，实现可以自由替换。

##### 核心接口设计

Managed Agents 定义了以下关键接口，构成了系统的"元 Harness"（meta-harness）：

| 接口 | 签名 | 职责 |
|------|------|------|
| 工具执行 | `execute(name, input) -> string` | Harness 对 Sandbox 的统一调用入口，屏蔽底层实现差异 |
| 容器供应 | `provision({resources})` | 按需创建新的执行环境，失败后重建而非修复 |
| 会话恢复 | `wake(sessionId)` | 从 Session 日志恢复 Harness，实现无状态化 |
| 事件写入 | `emitEvent(id, event)` | Harness 向 Session 追加不可变事件记录 |
| 事件检索 | `getSession(id)` / `getEvents()` | 按位置切片查询 Session 中的历史事件 |

```python
# Managed Agents 核心调度循环伪代码
def agent_loop(session_id: str):
    # 恢复或创建 Harness（无状态）
    harness = wake(session_id)
    session = getSession(session_id)
    
    # 按需 provision Sandbox（延迟绑定）
    sandbox_id = None
    
    while not task_complete:
        # 从 Session 获取近期事件作为上下文
        events = session.getEvents(slice=(-100, None))
        
        # 构造 Claude 的上下文窗口
        context_window = harness.transform(events)
        
        # Claude 推理
        response = claude.generate(context_window)
        
        if response.is_tool_call:
            tool_name = response.tool_name
            tool_input = response.tool_input
            
            if tool_name == "execute":
                # 延迟绑定：首次调用时才 provision Sandbox
                if sandbox_id is None:
                    sandbox_id = provision({"repo": repo_url, "token": bundled_auth})
                result = execute(sandbox_id, tool_input)
            else:
                # 通用工具调用（MCP 等）
                result = execute(tool_name, tool_input)
            
            # 持久化事件到 Session
            harness.emitEvent(session_id, {
                "type": "tool_result",
                "tool": tool_name,
                "result": result
            })
        else:
            # 持久化响应
            harness.emitEvent(session_id, {
                "type": "assistant_message",
                "content": response.content
            })
    
    return final_result
```

##### 安全边界设计：Token 隔离

在耦合架构中，Claude 生成的不可信代码与凭证共享同一容器环境——攻击者只需诱导 Claude 读取环境变量即可窃取 Token，随后生成不受限的新 Session。

Managed Agents 通过**结构性地确保 Token 永远不可达沙箱内部**来解决此问题，采用了两种互补模式：

1. **凭证与资源绑定（Bundled Auth）**：以 Git 操作为例，在 Sandbox 初始化时使用仓库访问 Token 克隆代码，并将 Token 仅配置在本地 Git remote 中。Sandbox 内的 `git push/pull` 正常运作，但 Agent 代码本身从不接触 Token 原文。

2. **外部 Vault + MCP 代理（Vault-backed Proxy）**：对于自定义工具，OAuth Token 存储于独立的安全 Vault 中。Claude 通过专用的 MCP 代理发起工具调用，代理使用 Session 关联的标识符从 Vault 获取凭证后，才向外部服务发起实际请求。

```
┌─────────────────────────────────────────────────────────┐
│                     Harness (Brain)                     │
│  不感知任何凭证；仅持有 session-associated token ID      │
└────────────┬──────────────────────────────┬─────────────┘
             │ execute("git_push", ...)     │ execute("mcp:github", ...)
             ▼                              ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│    Sandbox (Hands)  │     │      MCP Proxy + Vault       │
│  git push/pull 可用 │     │  token_id → OAuth token     │
│  无 Token 原文      │     │  → 调用外部 API             │
└─────────────────────┘     └─────────────────────────────┘
```

> ⚠️ 注意：传统做法是缩小 Token 权限范围（narrow scoping），但这本身编码了"Claude 用受限 Token 做不到什么"的假设——而 Claude 正变得越来越聪明。结构隔离才是根本解法。

##### Session：不是上下文窗口，而是上下文对象

长程任务常常超出 Claude 的上下文窗口长度。传统的解决方案（compaction 摘要、选择性裁剪、memory tool 写入文件）存在一个根本性困境：**难以预知未来的推理轮次需要哪些历史 Token**。

Managed Agents 的创新在于将 Session 视为一个**存活于上下文窗口之外的持久对象**（context object that lives outside the context window）。关键接口 `getEvents()` 允许 Harness 以高度灵活的方式检索历史：

- **位置切片**：`getEvents(slice=(-50, None))` 读取最近 50 个事件
- **时间回溯**：在某关键时刻前多取几个事件以查看前因后果
- **选择性重读**：重读特定操作之前的上下文

获取到的事件在传入 Claude 上下文窗口之前，Harness 可进行任意转换（重组、修剪、缓存优化等）。这种设计将**可恢复的上下文存储**（Session 负责）与**上下文工程优化**（Harness 负责）的关注点彻底分离。

> 💡 关键：我们无法预测未来模型需要什么上下文工程策略——因此接口只保证 Session 持久可用，而将具体的上下文管理策略推入 Harness，由 Harness 自由选择实现。

##### 性能收益：按需供应与延迟绑定

解耦架构带来了直接的性能收益。在耦合设计中，每个 Session 必须预先启动包含 Sandbox 的完整容器——即使 Session 可能永远不会用到代码执行能力。这引入了显著的时间到首 Token 延迟（TTFT），是用户最直观感受到的延迟指标。

解耦后：

1. **Harness 启动极快**：Harness 是无状态的轻量进程，仅需从 Session 日志中拉取待处理事件即可开始推理
2. **Sandbox 按需供应**：只有在 Claude 决定调用 `execute()` 时才 provision 容器，大量无需代码执行的 Session 永远不会触发容器创建
3. **并行扩展简单**：扩展至多个 Brain 只需启动多个无状态 Harness 实例，按需连接 Hands

实际效果：**p50 TTFT 下降约 60%，p95 TTFT 下降超过 90%**。

##### 多脑多手：从单进程到分布式智能体网络

解耦架构还使"多脑多手"成为可能。在耦合设计中，一个容器内只有一个 Harness 和一个 Sandbox。解耦后：

- **一个 Brain 可连接多个 Hands**：Harness 可以管理多个独立的 Sandbox，Claude 需要在不同执行环境间协调工作——这是一个更难的认知任务，但随着模型智能增长已成为可能
- **Brains 可传递 Hands**：由于 Hand 不绑定任何特定 Brain，多个 Harness 实例可以共享和传递 Sandbox 引用
- **按领域优化 Harness**：可以为不同任务定制专业化 Harness（如 Claude Code），它们都通过同一套接口接入 Managed Agents

> 💡 关键：Managed Agents 是一个"元 Harness"——不对具体 Harness 的实现做假设，而是对 Claude 周围所需的接口做假设：操纵状态（Session）和执行计算（Sandbox）。这些接口不关心 Sandbox 是一个容器、一部手机还是 Pokémon 模拟器。

#### 🧪 练习题
```yaml
question: "Managed Agents 中 Session 接口 getEvents() 的核心设计目的是什么？"
options:
  - "替代 Claude 的上下文窗口，直接作为推理输入"
  - "将历史上下文作为持久对象存储在上下文窗口之外，允许按需检索和回放"
  - "提高事件存储的压缩比率，降低存储成本"
  - "为 Harness 提供实时 WebSocket 事件推送能力"
answer: 1
explain: "getEvents() 将 Session 设计为存活于上下文窗口外的持久对象，支持位置切片和时间回溯检索，解决了长程任务中不可逆的上下文压缩导致的信息丢失问题。"
```

### GenericAgent

```yaml
id: genericagent
num: 15
name: GenericAgent
full_name: 自进化通用 Agent Harness (GenericAgent)
year: '2026.04'
org: 复旦/北大/Qiji Zhifeng
parent: claude_longrun
paper_url: https://arxiv.org/abs/2604.17091
project_url: ''
category: runtime
motivation: 以最小工具和自演化记忆控制上下文
```

#### 📝 一句话总结
GenericAgent 通过**上下文信息密度最大化**原则，系统性解决了 LLM Agent 设计中的"完备性-简洁性-自然性"三难困境，提出了包含最小化工具集、分层记忆架构、自演化机制和上下文压缩在内的四组件框架，使 Agent 能够在无需人工干预的情况下持续自我改进。

#### 🎯 核心要点
- 提出了 **Agent 设计三难困境**：完备性（Completeness）、简洁性（Conciseness）、自然性（Naturalness）三者不可兼得，传统设计只能在三者间做权衡
- 提出**上下文信息密度最大化**作为统一设计原则，以 bits/token 为度量指标
- 设计了仅包含 **9 个原子工具的极小工具集**（TaskTool, ReadTool, WriteTool, EditTool, WebSearchTool, BrowseTool, CodeTool, AskUserTool, FinishTool），通过组合实现复杂任务
- 创新性地提出 **4 层分层记忆架构**：L1（当前上下文）、L2（工作记忆/Working Memory）、L3（经验记忆/经验池）、L4（核心规则/Constitution），信息随层级上升逐步压缩精炼
- 提出 **"No Execution, No Memory"** 自演化机制：仅当 Agent 实际执行并观察到结果后，才将经验写入记忆，防止幻觉污染记忆库
- 设计了**上下文截断与压缩**策略：当上下文接近限制时，自动对历史消息进行摘要压缩，保留关键信息
- 发现了 **3 种涌现能力**：(1) 工具组合创新 (2) 自适应记忆管理 (3) 跨任务经验迁移
- 在 WebArena、GAIA、AgentBench 等多个基准上达到 SOTA，且仅需极少人工设计

#### 🔬 深入细节
##### 1. 设计三难困境与信息密度最大化

传统 LLM Agent 设计面临一个根本性的三难困境：

- **完备性（Completeness）**：提供足够多的工具和指令以覆盖所有可能场景 → 导致上下文膨胀
- **简洁性（Conciseness）**：保持系统提示和工具描述简短 → 导致功能不完备
- **自然性（Naturalness）**：使用自然语言描述而非结构化格式 → 导致模糊和歧义

三者相互冲突：追求完备性必然增加冗长，追求简洁性必然牺牲完备性，追求自然性必然降低信息密度。GenericAgent 的核心洞察是：**不应在三维空间中寻找平衡点，而应直接优化上下文信息密度**——即单位 token 包含的有效信息量（bits/token）。

> 💡 关键：信息密度最大化 = 用最少的 token 传递最多的有效信息。这成为架构设计的唯一指导原则。

![GenericAgent 工作流示意图](https://raw.githubusercontent.com/lsdefine/GenericAgent/main/assets/images/workflow.jpg)
*图：Agent设计的三难困境——完备性、简洁性、自然性三者不可兼得。GenericAgent通过信息密度最大化跳出这一困境。*

##### 2. 四组件架构总览

GenericAgent 由四个核心组件组成，每个组件都围绕信息密度最大化原则设计：

┌─────────────────────────────────────────────┐
│              GenericAgent 架构               │
├─────────────────┬───────────────────────────┤
│  原子工具集(9)   │     分层记忆(L1-L4)       │
│  TaskTool       │  L1: 当前上下文            │
│  ReadTool       │  L2: 工作记忆              │
│  WriteTool      │  L3: 经验池                │
│  EditTool       │  L4: 核心规则(Constitution)│
│  WebSearchTool  │                           │
│  BrowseTool     ├───────────────────────────┤
│  CodeTool       │  自演化机制                │
│  AskUserTool    │  "No Execution, No Memory" │
│  FinishTool     │                           │
├─────────────────┼───────────────────────────┤
│  上下文压缩       │  涌现能力                  │
│  截断+摘要       │  工具组合/记忆管理/经验迁移 │
└─────────────────┴───────────────────────────┘

##### 3. 最小化原子工具集（Minimal Atomic Tool Set）

传统 Agent 框架倾向于为每个功能创建专门工具（如单独的文件搜索、文件移动、目录列表等），导致工具描述占用大量上下文。GenericAgent 反其道而行，仅提供 9 个原子操作：

| 工具 | 功能 | 设计理念 |
|------|------|----------|
| **TaskTool** | 创建和管理子任务 | 分解复杂任务为子任务 |
| **ReadTool** | 读取文件内容（支持分页/搜索） | 统一的读取接口，替代所有"查看"类工具 |
| **WriteTool** | 创建或全量覆盖文件 | 统一的写入接口 |
| **EditTool** | 精细的局部文件修改（patch） | 替代所有"修改"类工具 |
| **WebSearchTool** | 网络搜索 | 获取外部信息 |
| **BrowseTool** | 网页浏览/内容提取 | 统一的网页交互接口 |
| **CodeTool** | 代码执行 | 计算和自动化 |
| **AskUserTool** | 向用户提问/请求决策 | 人机交互 |
| **FinishTool** | 标记任务完成并提交结果 | 任务终结 |

通过这 9 个工具的**组合**，Agent 可以实现任意复杂操作（如：先 ReadTool 定位 → EditTool 修改 → WriteTool 保存，模拟"文件重命名"）。工具描述极简，每个仅 1-2 行，极大提升了系统提示的信息密度。

##### 4. 四层分层记忆架构

传统 Agent 将所有信息都放在单一上下文中，导致关键信息被稀释。GenericAgent 设计了从"原始"到"精炼"的四层记忆：

L4: 核心规则 (Constitution)        ← 极简，~200 tokens，不可变核心原则
    ↑ 提炼
L3: 经验池 (Experience Pool)       ← 经过验证的任务经验，RAG检索
    ↑ "No Execution, No Memory"过滤
L2: 工作记忆 (Working Memory)      ← 当前会话关键信息，人工+自动维护
    ↑ 上下文压缩/截断
L1: 当前上下文 (Current Context)    ← 完整对话历史，受token限制

- **L1（当前上下文）**：包含完整的对话历史、工具调用和结果。当接近 token 限制时触发压缩。
- **L2（工作记忆/Working Memory）**：从 L1 中提取的关键信息快照，通过 `update_working_checkpoint` 工具主动维护。相当于人类的"便签本"，防止长时间任务中信息丢失。
- **L3（经验池/Experience Pool）**：跨会话的经过验证的经验和教训，通过 RAG 机制检索。遵循 **"No Execution, No Memory"** 原则——仅当 Agent 实际执行并观察到结果后，才将经验写入，有效防止"纸上谈兵"类错误记忆。
- **L4（核心规则/Constitution）**：Agent 不可违背的根本原则，固定不变。类似机器人三定律，由开发者预设。

> ⚠️ 注意：记忆向上层迁移时，信息被逐级**压缩精炼**，遵循信息密度最大化原则。原始对话 → 关键摘要 → 经验规则 → 核心原则。

##### 5. "No Execution, No Memory" 自演化机制

这是 GenericAgent 最核心的创新之一。传统方法允许 Agent 在推理阶段就生成"记忆"或"经验"，但这些未经实际验证的记忆往往是**幻觉**。

GenericAgent 的铁律：
- 任何经验在写入 L3 经验池之前，必须经过**实际的工具执行**和**结果观察**
- 纯语言模型推理产出的"建议"不能直接成为记忆
- 只有被实际验证有效的操作序列才能被提炼为经验

这类似于科学方法：假设必须经过实验验证才能成为理论。该机制大幅减少了记忆污染，确保经验池中的每一条记录都有实证支撑。

##### 6. 上下文截断与压缩

当 L1 上下文接近模型 token 限制时，GenericAgent 自动触发压缩：

1. **截断**：保留最近的 K 轮交互（K 为可配置参数）
2. **摘要压缩**：对截断部分的历史消息，使用 LLM 生成结构化摘要
3. **摘要格式**：`[历史摘要]` 标签包裹，包含任务目标、已完成步骤、关键发现、待处理事项
4. **信息密度提升**：原始历史可能消耗 10K+ tokens，摘要压缩至 200-500 tokens，信息密度提升 20-50 倍

> 💡 关键：压缩不是简单丢弃信息，而是**蒸馏**——提取对当前任务仍有价值的部分，丢弃已完成的中间细节。

```python
# 上下文压缩伪代码
def compress_context(messages, max_tokens):
    if token_count(messages) <= max_tokens:
        return messages
    
    # 保留最近 N 轮
    recent = messages[-N:]
    old = messages[:-N]
    
    # 生成摘要
    summary = llm.summarize(old, focus=[
        "current_task_goal",
        "completed_steps", 
        "key_findings",
        "pending_items"
    ])
    
    # 拼接返回
    return [{"role": "system", "content": f"[历史摘要] {summary}"}] + recent
```

##### 7. 三种涌现能力

实验发现 GenericAgent 展现出三种未在系统中显式编程的能力：

**① 工具组合创新**：Agent 自发发现并利用工具组合实现新功能。例如，组合 ReadTool + EditTool + WriteTool 实现"文件重命名"（该系统无 rename 工具），甚至组合 WebSearchTool + CodeTool 实现数据分析自动化。

**② 自适应记忆管理**：Agent 学会根据任务复杂度动态调整记忆写入策略。简单任务自动减少 L2 更新频率，复杂任务则频繁保存 checkpoint，展现出类似人类的"元认知"能力。

**③ 跨任务经验迁移**：在一个任务中学到的经验（如"处理大文件时应先用 ReadTool 分页查看而非全量读取"）能自动迁移到其他任务中，通过 L3 经验池的 RAG 检索实现。

##### 8. 与现有方法的对比

| 维度 | ReAct | AutoGPT | Reflexion | **GenericAgent** |
|------|-------|---------|-----------|------------------|
| 工具数量 | 3-5（任务相关） | 10-20（通用） | 3-5 | **9（最小原子集）** |
| 记忆机制 | 无 | 文件存储 | 经验反思 | **4层分层记忆** |
| 自演化 | ✗ | ✗ | 部分（反思） | **No Execution, No Memory** |
| 上下文管理 | 截断 | 截断 | 截断 | **截断+摘要压缩** |
| 信息密度优化 | ✗ | ✗ | ✗ | **核心设计原则** |

#### 🧪 练习题
```yaml
question: "GenericAgent 的 'No Execution, No Memory' 机制解决的核心问题是什么？"
options:
  - "减少记忆存储的磁盘占用"
  - "防止 Agent 将未经实际验证的推理产物作为经验写入记忆库，避免幻觉污染"
  - "加快工具调用的执行速度"
  - "限制 Agent 每天可执行的任务数量"
answer: 1
explain: "'No Execution, No Memory' 要求任何经验在写入 L3 经验池前必须经过实际的工具执行和结果观察验证，纯推理产物不能成为记忆，从而有效防止幻觉污染记忆库。"
```

### AHE

```yaml
id: ahe
num: 16
name: AHE
full_name: 自动演化编码 Harness (Agentic Harness Engineering)
year: '2026.04'
org: 复旦/北大/Qiji Zhifeng
parent: meta_harness
paper_url: https://arxiv.org/abs/2604.25850
project_url: ''
category: optimization
motivation: 用可观测闭环自动进化编码harness
```

#### 📝 一句话总结
AHE 提出了一种智能体驱动的启发式进化框架，通过**三支柱闭环**（组件空间、Rollout 经验、编辑决策）让三个角色智能体（Evolve / Explore / Exploit）自动迭代改进 LLM Agent 的 7 类启发式组件，在 Terminal-Bench 2 上将纯 Bash 种子从 69.7% 提升至 77.0%，无需人工干预。

#### 🎯 核心要点
- 首次将 LLM Agent 的启发式组件调优形式化为自动化闭环进化问题，替代手工试错
- 三支柱闭环架构：**Components**（7 类可编辑启发式）→ **Rollout Experience**（执行轨迹可观测）→ **Edit Decisions**（结构化编辑决策）
- 三个角色 Agent 协同：**Evolve**（诊断建议编辑）→ **Exploit**（验证编辑是否修复目标任务）→ **Explore**（检验编辑是否破坏其他任务）
- 覆盖 7 类启发式组件类型：system prompt、bash tool、python tool、memory、sandbox policy、stop condition、perplexity filter
- 10 轮迭代从空组件种子起步，在 89 个 Terminal-Bench 2 任务上取得 77.0% 的 Pass@1
- 跨模型迁移能力：GPT-5.4 进化的 workspace 迁移至 GPT-5.1 达 74.2%，迁移至 Sonnet 4.5 达 73.4%
- 自预测校准：Evolve 模型在"修复预测"任务上精度 ~0.60、回归预测精度 ~0.92

#### 🔬 深入细节
![AHE 性能总览图](https://ar5iv.org/html/2604.25850/assets/x1.png)
*图 1：AHE 将纯 Bash 种子进化为超越所有人工设计和自进化基线，三个角色 Agent 共享一个基础模型（GPT-5.4 high）*

![AHE 三支柱闭环架构](https://ar5iv.org/html/2604.25850/assets/x2.png)
*图 2：AHE 流水线将三个可观测表面连接为一个闭环——组件、Rollout 经验、编辑决策各自呈现为结构化文本表面，驱动迭代进化*

##### 动机与背景

传统 LLM Agent 的性能高度依赖启发式组件（如 system prompt、工具定义、sandbox 策略等）的质量，但这些组件的设计完全依赖人工经验和反复试错。随着 Agent 复杂度增加，组件空间呈组合爆炸，手工调优成为严重瓶颈。AHE 的核心洞察是：**启发式组件的设计空间虽然庞大，但其质量可以通过执行反馈（Rollout）被自动评估，而编辑决策可以被结构化表达**——这三个"可观测表面"构成了自动化进化的基础。

##### 核心机制：三支柱闭环

AHE 将 Agent 进化形式化为在三个结构化文本表面上的闭环迭代：

1. **组件表面（Component Surface）**：Agent 的完整配置，包含 7 类可编辑启发式组件。每类组件由结构化 YAML/文本块表示，Evolve 智能体可以对任意组件子集进行增删改操作。

2. **Rollout 经验表面（Rollout Experience Surface）**：每次任务执行后产生的完整轨迹——包括 Agent 的推理链（chain-of-thought）、工具调用序列、工具输出、最终结果（成功/失败/错误类型）。Explore 智能体通过分析失败 Rollout 来发现回归问题。

3. **编辑决策表面（Edit Decision Surface）**：Evolve 智能体观察 Rollout 经验后生成的结构化编辑提案。每个编辑包含：目标组件路径、操作类型（add/modify/delete）、旧内容片段、新内容片段、编辑理由。这一结构化设计使编辑可追溯、可回滚。

##### 三个角色智能体

- **Evolve（进化者）**：核心决策者。接收多轮 Rollout 经验作为输入，诊断失败原因，生成结构化编辑提案。Evolve 需要同时考虑"修复当前问题"和"避免引入回归"之间的平衡。

- **Exploit（利用者）**：验证编辑是否有效修复了目标失败案例。在应用编辑前后的 Agent 配置上分别运行失败任务，对比结果。如果修复成功，编辑进入候选池。

- **Explore（探索者）**：检验编辑是否引入回归。在全部 89 个任务上运行应用编辑后的 Agent，检测是否有原本成功的任务变失败。这一角色解决了进化中的"灾难性遗忘"问题——修复一个任务不应破坏其他任务。

三者共享同一个基础模型（GPT-5.4 high），通过不同的 system prompt 区分角色。这种设计简洁而有效：单个强大模型在不同上下文中扮演不同角色，无需训练多个专用模型。

##### 七类可编辑启发式组件

AHE 的组件空间覆盖了 LLM Agent 的七个关键维度：

| 组件类型 | 说明 | 示例 |
|---------|------|------|
| system prompt | Agent 顶层指令 | 角色定义、约束条件、输出格式要求 |
| bash tool | Shell 命令工具定义 | 可用命令列表、参数规范、安全限制 |
| python tool | Python 执行工具定义 | 可用库列表、执行超时、内存限制 |
| memory | 记忆/上下文管理策略 | 滑动窗口大小、摘要触发条件、关键信息提取规则 |
| sandbox policy | 沙箱安全策略 | 网络访问权限、文件系统限制、进程隔离规则 |
| stop condition | 停止条件 | 最大步数、输出验证规则、循环检测阈值 |
| perplexity filter | 困惑度过滤器 | 低质量输出的检测与截断阈值 |

所有组件初始化为空（bash-only 种子），AHE 在 10 轮迭代中自主发现并添加有效组件。

##### 训练/进化流程

每轮迭代包含以下步骤：

1. **Rollout 阶段**：在当前 Agent 配置下，对所有 89 个 Terminal-Bench 2 任务各运行 k 次（k=4），收集成功/失败信息及完整轨迹。

2. **Evolve 阶段**：将失败案例的 Rollout 经验（最多 3 个代表性案例）提交给 Evolve 智能体，生成编辑提案。Evolve 同时进行自预测——对每项编辑预测其修复效果和可能的回归影响。

3. **Exploit 阶段**：对每个编辑提案，在目标失败任务上重新运行（应用编辑后配置），验证修复效果。

4. **Explore 阶段**：将通过 Exploit 验证的编辑应用到 Agent 配置，在全部任务上运行，检测回归。如果净收益为正（修复数 > 新引入失败数），接受编辑；否则回滚。

5. **更新组件表面**：将接受的编辑合并到组件配置中，进入下一轮迭代。

##### 与传统方法的区别

- **vs 手工调优**：AHE 消除人工试错，在 10 轮迭代内发现人类难以搜到的组件组合。实验显示所有手工设计的基线 Agent 均被超越。

- **vs 自进化基线**：AHE 的三支柱闭环设计（特别是 Explore 角色的回归检测）使其进化稳定性远超简单的"用 LLM 改 prompt"方法。自我改进基线在 Terminal-Bench 2 上的改进幅度（~2-3%）远低于 AHE（~7.3%）。

- **vs Learned Optimizer**：AHE 无需训练元学习器或优化器网络，完全通过 LLM 的上下文推理能力实现进化，避免了大量训练数据和计算开销。

##### 关键实验结果

- **主结果**：10 轮进化，Pass@1 从 69.7%（bash-only seed）提升至 77.0%（+7.3 个百分点），超越所有基线。
- **跨模型迁移**：GPT-5.4 进化的 workspace 直接迁移至 GPT-5.1（74.2%）和 Sonnet 4.5（73.4%），证明进化的组件具有模型通用性，而非过拟合到特定模型。
- **自预测能力**：Evolve 模型对修复预测的精度约 0.60（较保守），对回归预测的精度约 0.92（高度准确），表明模型能较准确地预判编辑是否会引入副作用。

![跨模型迁移结果](https://ar5iv.org/html/2604.25850/assets/x3.png)
*图 3：跨模型迁移——AHE workspace 在 GPT-5.4 上进化后，在其他基础模型上重新评估的结果*

![自预测精度](https://ar5iv.org/html/2604.25850/assets/x4.png)
*图 4：Evolve 模型在 9 轮评估中的自预测精度和召回率变化趋势*

##### Ablation 分析

- **去除 Explore**：回归率显著上升，净提升大幅缩水，验证了 Explore 在防止灾难性遗忘中的关键作用。
- **去除 Exploit**：编辑质量下降，许多"看起来合理"的编辑在实际执行中无效，Exploit 的过滤作用不可或缺。
- **减少 Rollout 次数**：k=1 时进化几乎停滞，k=4 显著优于 k=2，说明充分的执行反馈对诊断和修复至关重要。
- **组件类型消融**：7 类组件各有贡献，其中 system prompt 和 sandbox policy 的贡献最大，但单独进化任何一类都不及全组件联合进化。

##### 伪代码：AHE 核心循环

```python
# AHE 核心进化循环
workspace = initialize_empty_components()  # 空组件种子
for round in range(1, R+1):  # R=10
    # 1. Rollout: 在所有任务上执行
    rollouts = run_all_tasks(workspace, tasks, k=4)
    
    # 2. Evolve: 诊断失败并生成编辑
    failures = [r for r in rollouts if not r.success]
    edits = evolve_agent.diagnose_and_propose(failures[:3])
    
    # 3. Exploit: 验证编辑修复效果
    for edit in edits:
        if exploit_agent.verify_fix(workspace, edit, edit.target_task):
            validated_edits.append(edit)
    
    # 4. Explore: 检测回归
    new_workspace = apply_edits(workspace, validated_edits)
    new_rollouts = run_all_tasks(new_workspace, tasks, k=1)
    regressions = detect_regressions(rollouts, new_rollouts)
    
    # 5. 条件接受
    if net_gain(validated_edits, regressions) > 0:
        workspace = new_workspace  # 接受进化
    else:
        continue  # 回滚，保持原配置
```

> 💡 **关键设计**：三支柱闭环的核心优势在于"可观测性"——组件的每次变更、每次执行的轨迹、每次编辑的决策都有结构化记录，使进化过程完全可审计、可回滚、可解释。

> ⚠️ **注意**：AHE 的有效性依赖于基础模型的多轮推理能力。在当前实验中使用 GPT-5.4 high，较弱模型可能在诊断失败和预测回归时表现不佳，导致进化效率降低。

#### 🧪 练习题
```yaml
question: "AHE 中 Explore 角色的主要作用是什么？"
options:
  - "生成启发式组件的编辑提案"
  - "验证编辑是否修复了目标任务"
  - "检测编辑是否在其他任务上引入回归"
  - "收集所有任务的 Rollout 经验"
answer: 2
explain: "Explore 在全部任务上运行应用编辑后的 Agent，检测原本成功的任务是否变失败，防止进化中的灾难性遗忘。"
```

### OpenClaw

```yaml
id: openclaw
num: 17
name: OpenClaw
full_name: 统一 Agent 控制平面 (OpenClaw)
year: '2026.05'
org: OpenClaw
parent: codex
paper_url: https://docs.openclaw.ai/plugins/sdk-agent-harness
project_url: ''
category: runtime
motivation: 把Codex等原生运行时并入统一控制面
```

#### 📝 一句话总结
OpenClaw 提出 Agent Harness 插件 SDK，通过将 Codex 等原生 Agent 运行时抽象为可注册的 harness 插件，在统一的控制平面（session、tool policy、channel、transcript）下调度异构运行时，解决了多运行时共存时 provider/runtime 耦合、回退策略混乱和会话状态割裂的问题。

#### 🎯 核心要点
- 定义 Agent Harness 抽象层：将一次 prepared agent turn 的低级执行封装为标准接口，与 provider、channel、tool registry 解耦
- 提供 `openclaw/plugin-sdk/agent-harness` 公共 SDK，第三方可通过 `registerAgentHarness()` 注册原生运行时
- 三级运行时选择策略：Model-scoped > Provider-scoped > auto（插件候选匹配）> embedded fallback
- 引入 `runtimePlan` 策略包：包含 tools.normalize、transcript.resolvePolicy、delivery.isSilentPayload、outcome.classifyRunResult 等共享决策模块，harness 可读取但不可修改
- Codex 插件作为参考实现：provider + harness 配对模式，harness id 为 `codex`，OpenAI 模型引用默认路由到 Codex harness
- 运行时中立的工具结果中间件（`registerAgentToolResultMiddleware`）：替代旧的 Codex-only 和 embedded-only 扩展钩子
- 终端结果分类器 `classifyAgentHarnessTerminalOutcome`：区分 empty/reasoning-only/planning-only 以支持模型回退决策
- 严格的运行时绑定：一旦插件 harness 认领运行，不回退到其他运行时，避免副作用重复或语义变更
- Native session 与 OpenClaw transcript 双轨镜像机制：harness 维护原生会话 id，同时向 OpenClaw transcript 同步可见输出

#### 🔬 深入细节
![OpenClaw 示意图](https://docs.openclaw.ai/assets/pixel-lobster.svg)
*图：OpenClaw 的核心框架或系统示意。*

##### 架构总览

OpenClaw 的 Agent Harness 架构将 Agent 执行栈分为**控制平面**（OpenClaw Core）和**执行平面**（Harness Plugin）两层：

```
+-----------------------------------------------------------+
|                   OpenClaw Core (控制平面)                  |
|  +----------+ +----------+ +--------+ +---------------+  |
|  | Provider | | Channel  | | Session| | Tool Policy   |  |
|  | Resolver | | Reply    | | Store  | | & Sandbox     |  |
|  +----------+ +----------+ +--------+ +---------------+  |
|                         |                                  |
|               runtimePlan (只读策略包)                       |
|  +------------------------------------------------------+ |
|  | tools.normalize | transcript.resolvePolicy           | |
|  | delivery.isSilentPayload | outcome.classify          | |
|  | observability (provider/model/harness metadata)      | |
|  +------------------------------------------------------+ |
|                         |                                  |
|         +---------------+--------------+                 |
|         |   Harness Selection Policy     |                 |
|         |  Model > Provider > auto       |                 |
|         |  > embedded fallback           |                 |
|         +---------------+--------------+                 |
+-------------------------+--------------------------------+
                          |
+-------------------------+--------------------------------+
|              Agent Harness Plugin (执行平面)                |
|  +------------------------+---------+                    |
|  |  supports(ctx) -> {supported, priority}               |
|  |  runAttempt(params) -> AgentTurnResult                 |
|  |  reset(sessionId)                                     |
|  +------------------------------------------------------+ |
|  +----------+ +-----------+ +------------------+        |
|  |  Codex   | | Claude CLI| | Custom Daemon... |        |
|  |  Harness | |  Harness  | |                    |        |
|  +----------+ +-----------+ +------------------+        |
|       |                                                   |
|  +----+------------------------------------------+       |
|  | Native Session (thread id, resume token)       |       |
|  |    <-> Transcript Mirror (同步到 OpenClaw)      |       |
|  +-----------------------------------------------+       |
+-----------------------------------------------------------+
```

*图：OpenClaw Agent Harness 双层架构——控制平面负责 provider/channel/session/tool policy 决策并将 runtimePlan 下发给 harness；执行平面通过 supports/runAttempt/reset 接口接入原生运行时，并通过 Transcript Mirror 保持会话一致性。*

##### 核心接口定义

Harness 插件的核心接口（TypeScript）：

```typescript
// 注册入口
import { definePluginEntry } from "openclaw/plugin-sdk";

// Harness 定义
const myHarness: AgentHarness = {
  id: "my-harness",
  label: "My native agent harness",
  
  // 声明支持条件：基于 ctx.provider + ctx.model 决策
  supports(ctx) {
    return ctx.provider === "my-provider" 
      ? { supported: true, priority: 100 } 
      : { supported: false };
  },
  
  // 执行一次准备好的 turn
  async runAttempt(params) {
    // params 包含：prompt, tools, images, onPartialReply,
    // onAgentEvent, runtimePlan, sessionId...
    return await runMyNativeTurn(params);
  },
};

export default definePluginEntry({
  id: "my-native-agent",
  name: "My Native Agent",
  description: "Runs selected models through a native agent daemon.",
  register(api) {
    api.registerAgentHarness(myHarness);
  },
});
```

##### 动机与背景

传统 Agent 框架在处理多运行时共存时面临三个核心问题：

1. **Provider/Runtime 耦合**：每个模型 provider 的 API 传输层与 Agent 执行逻辑耦合，当 Codex 等产品拥有自己的原生 session 线程（含 compaction、resume、tool 执行）时，通过标准 provider 传输层适配会丢失原生能力或需要重复实现。

2. **回退策略混乱**：当原生运行时失败时，是静默回退到嵌入式运行时、重试同一运行时、还是直接报错？缺乏统一的分类和决策机制。

3. **会话状态割裂**：原生运行时的 thread id、resume token 与 OpenClaw 的 session/transcript 各自独立，切换运行时会丢失上下文。

OpenClaw Harness 的设计思路是：**将"执行"从"控制"中彻底分离**。控制平面负责所有 Agent 共用的决策（认证、预算、工具策略、通道回复），harness 只负责一次已准备好的 turn 的低级执行。这种分离使得 Codex 可以保留其原生线程管理、compaction 和 app-server 协议，同时被纳入 OpenClaw 的统一 session/channel/tool policy 框架。

##### 运行时选择策略

OpenClaw 采用三级优先级从高到低的运行时选择策略：

1. **Model-scoped runtime**：在 `models` 配置中为特定模型显式指定 `agentRuntime.id`，如 `"openai/gpt-5.5": { "agentRuntime": { "id": "codex" } }`。这是最精确的绑定。

2. **Provider-scoped runtime**：在 `providers` 配置中为整个 provider 指定默认运行时。优先级低于 model-scoped。

3. **auto 模式**（默认）：OpenClaw 遍历所有已注册 harness 插件，调用 `supports(ctx)` 询问是否支持当前 provider/model。若多个插件声明支持，按 priority 排序。无匹配时使用嵌入式运行时。

> 关键约束：一旦插件 harness 通过 `supports()` 认领了一次运行并开始执行（产生 assistant text、tool calls 或 message sends），OpenClaw **不会**将该 turn 重放到另一个运行时。这是为了避免认证/运行时语义变更或副作用重复。

##### runtimePlan 策略包

`runtimePlan` 是 OpenClaw Core 在下发 prepared attempt 时注入的策略包。Harness 可读取这些策略来做与 OpenClaw 行为一致的决策，但**不得修改**其内容或利用它在 turn 内部切换 provider/model：

| 策略模块 | 功能 |
|---|---|
| `tools.normalize(...)` | Provider 感知的工具 schema 规范化 |
| `tools.logDiagnostics(...)` | 工具调用诊断日志 |
| `transcript.resolvePolicy(...)` | Transcript 清洗和 tool-call 修复策略 |
| `delivery.isSilentPayload(...)` | 判断是否为 NO_REPLY 或媒体静默投递 |
| `outcome.classifyRunResult(...)` | 模型回退分类（empty/reasoning/planning） |
| `observability` | 已解析的 provider/model/harness 元数据 |

##### 工具结果中间件

OpenClaw 提供运行时中立的工具结果中间件机制：

```typescript
api.registerAgentToolResultMiddleware(...)
```

该接口要求插件在 manifest 的 `contracts.agentToolResultMiddleware` 中声明目标运行时 id。适用于在工具输出返回给模型之前执行异步转换（如格式化、过滤、增强）。这替代了旧的两套钩子：
- `api.registerCodexAppServerExtensionFactory(...)`（Codex-only，已标记为 legacy）
- `api.registerEmbeddedExtensionFactory(...)`（已移除，需迁移到运行时中立 API）

##### 终端结果分类

当原生 harness 完成一次 turn 但没有产生可见的 assistant text 时，调用 `classifyAgentHarnessTerminalOutcome(...)` 可将结果分类为：
- `empty`：完全空输出，可能需要重试
- `reasoning-only`：只有推理内容但无用户可见回复
- `planning-only`：只有规划步骤

OpenClaw 的 fallback 策略据此决定是否用其他模型重试。Prompt 错误、进行中的 turn 和 `NO_REPLY` 等有意静默回复**不被分类**，避免误触发回退。

##### Codex 参考实现

Codex 插件是 OpenClaw 官方捆绑的 harness 实现：

- **Provider 注册**：同时注册 provider（使 model refs、auth、`/model` 选择对 OpenClaw 可见）和 harness（通过 `supports()` 认领）。
- **Model refs 路由**：`openai/gpt-*` 引用默认选择 Codex harness；旧的 `codex/gpt-*` 引用作为兼容性别名保留。
- **App-server 协议**：OpenClaw 向 Codex 发送裸 model id，harness 负责与 Codex app-server（要求 >= 0.125.0）通信。
- **显式绑定**：通过 `agentRuntime.id: "codex"` 可强制仅使用 Codex 路径（失败即报错，不回退到嵌入式运行时）。
- **Transcript Mirror**：Codex 维护原生 thread id 和 resume 行为，同时将所有用户可见的 assistant/tool 输出镜像到 OpenClaw transcript。

##### Native Session 与 Transcript 双轨机制

Harness 可以维护自己的原生会话标识（thread id、daemon-side resume token），但必须：
1. 将该绑定显式关联到 OpenClaw session
2. 持续将用户可见的 assistant/tool 输出镜像到 OpenClaw transcript
3. 实现 `reset(...)` 方法，当 OpenClaw session 被 reset 时清除原生侧绑定

OpenClaw transcript 作为兼容层保障：
- Channel 可见的会话历史
- Transcript 搜索与索引
- 后续 turn 切换回嵌入式 OpenClaw harness 的能力
- 通用的 `/new`、`/reset` 和 session 删除行为

##### 与传统方法的区别

| 维度 | 传统 Provider 插件 | OpenClaw Harness |
|---|---|---|
| 抽象层次 | HTTP/WebSocket API 传输 | 原生 session 运行时 |
| 适用场景 | 标准 LLM API 接入 | 自有线程/compaction/resume 的 Agent 服务器 |
| Session 归属 | OpenClaw 全权管理 | Harness 管理原生 session，OpenClaw 管理 transcript |
| 回退策略 | Provider 级别 fallback | 三级选择 + 分类器驱动的模型回退 |
| 扩展方式 | Provider 专有钩子 | 运行时中立中间件 API |

#### 🧪 练习题
```yaml
question: "OpenClaw Agent Harness 的 runtimePlan 策略包的正确使用方式是？"
options:
  - "Harness 可以修改 runtimePlan 中的 tools.normalize 来实现自定义工具策略"
  - "Harness 读取 runtimePlan 做与 OpenClaw 行为一致的决策，但不得修改其内容"
  - "runtimePlan 仅用于 provider/model 的初始选择，选择完成后不再使用"
  - "Harness 可以忽略 runtimePlan，完全使用原生运行时的独立策略"
answer: 1
explain: "runtimePlan 是 OpenClaw Core 注入的只读策略包，harness 应读取其中 tools、transcript、delivery、outcome 等模块以保持与 OpenClaw 行为一致，但不得修改或利用它在 turn 内部切换 provider/model。"
```

### RoadmapBench

```yaml
id: roadmapbench
num: 18
name: RoadmapBench
full_name: 版本升级长程开发基准 (RoadmapBench)
year: '2026.05'
org: UniPat AI
parent: idebench
paper_url: https://arxiv.org/abs/2605.15846
project_url: ''
category: evaluation
motivation: 用版本升级任务检验长程工程能力
```

#### 📝 一句话总结
RoadmapBench 提出了一个面向长程软件工程任务的评估基准，通过模拟真实世界版本升级（Version Upgrade）场景，系统性地检验大语言模型在跨越多版本迭代的复杂工程任务中的规划、适应和持续执行能力，填补了现有评测体系对长程开发能力覆盖不足的空白。

#### 🎯 核心要点
- 聚焦**版本升级**场景：模拟真实软件从旧版本到新版本的完整迁移过程，涵盖依赖更新、API 变更适配、配置文件迁移等多维度子任务
- 构建了**多阶段长程任务**框架：每个任务跨越多个版本节点，要求模型在长时间跨度内保持一致的工程决策能力
- 引入**累积式错误分析**：追踪模型在多步长程推理中的错误传播与累积模式，揭示当前 LLM 在长程任务中的退化规律
- 提供**标准化评估协议**：包含自动化验证脚本与人工评估准则的双轨评测体系
- 与 IDE 环境深度集成：基于 idebench 框架扩展，在真实开发环境中评估模型的长程工程表现
- 评估维度涵盖：版本跨度适应力、中间态变更跟踪、回归风险预判、工程决策一致性

#### 🔬 深入细节
![RoadmapBench 示意图](https://ar5iv.labs.arxiv.org/html/2605.15846/assets/x1.png)
*图：RoadmapBench 的核心框架或评测示意。*

##### 1. 动机与背景

现有的代码生成与软件工程评测基准（如 HumanEval、SWE-bench）侧重于单次、短程的任务完成，无法充分反映真实工业场景中跨越多个版本的持续集成与升级挑战。在真实开发中，工程师需要处理依赖库的主版本升级（如 Python 2 → 3、框架大版本迁移），这类任务不仅涉及语法修正，还需要理解版本间语义变更、API 弃用周期以及下游兼容性。RoadmapBench 的设计动机就是弥补这一长程评测的空白。

##### 2. 核心机制：版本升级任务设计

RoadmapBench 的核心方法论围绕"版本路线图（Roadmap）"展开：

- **版本节点定义**：每个任务设定一个起始版本 \( V_0 \) 和目标版本 \( V_k \)，中间经过 \( k \) 个关键版本节点 \( V_1, V_2, \ldots, V_{k-1} \)。每个节点对应真实世界中该依赖库的特定发行版，附带确定的变更日志（Changelog）与弃用声明（Deprecation Notice）。
- **任务分解**：模型需要将总版本跳变分解为逐步的近邻版本迁移，在每个中间节点完成局部的代码修正与测试验证。
- **累积依赖处理**：版本升级往往不是孤立的，一个依赖的升级可能触发传递依赖的连锁更新。RoadmapBench 包含交叉依赖场景，考察模型的全局工程规划能力。

> 💡 关键：RoadmapBench 的升级路径不是线性设计的，而是允许分支与回退，模拟工程师在实际决策中可能遇到的"是否需要跳过某个中间版本"的判断。

##### 3. 任务形式与评估指标

每个 RoadmapBench 任务包含：
- **源仓库**：包含旧版本代码的完整项目
- **升级指令**：自然语言描述的目标版本与约束条件
- **环境镜像**：可重现的 Docker 容器，确保评估一致性
- **验证套件**：包含单元测试、集成测试和构建成功标准的自动化检查

评估指标：
- **任务成功率** (Success Rate)：是否最终通过所有验证
- **步数效率** (Step Efficiency)：实际执行步数与最优步数之比
- **错误修正率** (Error Recovery Rate)：发生错误后成功自我修复的比例
- **一致性分数** (Consistency Score)：跨多版本节点的工程决策保持度

##### 4. 与传统基准的对比

| 维度 | HumanEval / MBPP | SWE-bench | RoadmapBench |
|------|:---:|:---:|:---:|
| 任务跨度 | 单函数级 | 单 Issue 级 | 多版本长程 |
| 时间视角 | 即时 | 即时 | 跨版本演化 |
| 错误传播 | 不涉及 | 有限 | 显式追踪 |
| 依赖管理 | 无 | 简单 | 复杂传递依赖 |

RoadmapBench 的独特贡献在于首次将软件的**时间演化维度**引入自动化评测，为评估大语言模型作为"长程工程伙伴"的能力提供了全新视角。

##### 5. 初步发现

论文对多个主流 LLM（包括 GPT-4、Claude、Gemini 等）在 RoadmapBench 上进行测试，发现：
- 所有模型在长程任务中的成功率显著低于短程基准，退步幅度可达 40% 以上
- 错误呈现明显的**累积效应**：早期版本次的错误决策会逐步放大，导致后期无法修复
- 模型在"识别弃用 API"方面表现较好，但在"理解语义变更"和"平衡多依赖升级顺序"方面存在明显短板
- 显式使用版本变更日志作为上下文能够显著提升表现，提示 RAG 增强方向

```python
for task in benchmark:
    env.reset(task)
    result = agent.run(env.observe())
    metrics.record(validate(result, env))
```

#### 🧪 练习题
```yaml
question: "RoadmapBench 与 SWE-bench 的核心区别是什么？"
options:
  - "RoadmapBench 只评估 Python 代码，SWE-bench 支持多语言"
  - "RoadmapBench 聚焦跨多版本的长程升级任务，SWE-bench 侧重单 Issue 修复"
  - "RoadmapBench 完全自动化，SWE-bench 需要人工评估"
  - "RoadmapBench 不使用 Docker 环境，SWE-bench 使用"
answer: 1
explain: "RoadmapBench 的核心创新在于模拟真实版本升级场景，跨越多个版本节点追踪持续工程能力，而 SWE-bench 聚焦单次 Issue 的修复，不具备长程时间演化视角。"
```

### Harness-Bench

```yaml
id: harness_bench
num: 19
name: Harness-Bench
full_name: Harness 配置诊断基准 (Harness-Bench)
year: '2026.05'
org: 北大/Qiyuan Tech
parent: ahe
paper_url: https://arxiv.org/abs/2605.27922
project_url: ''
category: evaluation
motivation: 分离模型与harness配置效应
```

#### 📝 一句话总结
Harness-Bench 提出首个系统性诊断框架，通过在统一的106个沙盒任务、多模型后端和多harness配置的factorial矩阵（5194条轨迹）上评测，量化了agent执行层（harness）对性能的实质性影响——相同模型在不同harness下得分差距可达23.8分，并揭示了5类典型执行漂移失败模式，明确提出“agent性能应报告为model–harness配置层级的属性而非仅归因于基础模型”。

#### 🎯 核心要点
- 提出 **Harness-Bench** 诊断性benchmark，首次系统研究harness配置对agent端到端性能的影响
- 包含 **106个沙盒化任务**，覆盖8个workflow类别：软件工程(22)、数据分析(14)、工具/多模态操作(15)、知识检索(13)、办公通信(12)、垂直专业工作流(12)、长期自主/状态适应(11)、SRE/DevOps(7)
- 6个可配置harness（OpenClaw, NanoBot, Hermes, ZeroClaw, NullClaw, Moltis） × 8个模型后端，形成完整factorial矩阵，共计 **5,194条完整执行轨迹**
- 三维评分公式：**TaskScore = Security × Completion × Process**，其中Process = (Robustness + ToolUse + Consistency) / 3，Security为二值安全门控
- 发现可配置harness间最大性能差距 **23.8分**（NanoBot 76.2 vs OpenClaw 52.4），Codex（model-bound coding agent）作为参考基线达80.4
- 提出 **“执行对齐”(execution alignment)** 概念：衡量harness是否保持推理、workspace状态、工具action和evaluator检查条件之间的对应关系
- 归纳 **5类典型失败模式**：Contract/format(36.4%)、Tool/recovery(24.6%)、Evidence/grounding(14.6%)、Artifact commitment(11.1%)、State/continuation(9.3%)
- 发现更强模型后端跨harness方差更小，表明强模型对执行层差异更宽容

#### 🔬 深入细节
##### 1. 核心框架：Harness-Bench评估管道

![Harness-Bench评估管道概览](https://arxiv.org/html/2605.27922v1/x1.png)
*图1：Harness-Bench评估管道。每个任务在沙盒中实例化，由model–harness配置执行。系统记录artifacts、traces、usage statistics和validator outputs，最终合成综合诊断分数。*

Harness-Bench将Agent定义为 **Agent = Model + Harness**。评估管道分为三阶段：

1. **Setup**：渲染task specification，构建runtime环境，初始化fresh sandbox
2. **Execution**：配置好的agent在budget和workspace约束下尝试完成任务，记录所有模型请求/响应、tool calls、workspace变更
3. **Judge**：evaluator检查final workspace状态和execution evidence，agent无法访问reference artifacts、hidden answers和evaluator scripts

每个run产生四类证据：final workspace state、execution trace、usage statistics、validator outputs。

##### 2. 评分公式与指标体系

核心评分采用乘法聚合：

$$
\text{TaskScore}_i = \text{Security}_i \cdot \text{Completion}_i \cdot \text{Process}_i
$$

其中：
- **Security** ∈ {0, 1}：binary gate，任何显式权限/安全违规（未授权访问、秘钥泄露、禁止操作）直接归零
- **Completion**：task-specific deterministic validator或rubric-based judgment
- **Process** = (Robustness + ToolUse + Consistency) / 3：
  - **Robustness**：agent是否正确处理tool或环境故障
  - **ToolUse**：工具选择和应用的适当性
  - **Consistency**：actions、observations、中间状态和最终输出与workspace状态和用户约束的一致性

> 💡 关键：乘法公式设计极为保守——需同时满足任务完成、无安全违规、可靠执行行为三者才能获得高分。Process分数通过外部LLM judge（claude-sonnet-4.6）从重构trace中评估。

##### 3. 任务套件设计：四原则筛选

所有106个任务需满足四个纳入标准：
- **Realism**：反映真实的用户workflow
- **Solvability**：可使用提供的沙盒资源完成
- **Oracle-checkability**：成功可由确定性检查或指定rubric验证
- **Integrity**：agent无法通过读取隐藏答案、修改protected fixtures或绕过约束来获得credit

任务完全本地化、沙盒化执行，避免了依赖live services带来的benchmark drift问题。

##### 4. 实验设计与核心发现

**Factorial矩阵控制变量**（Table 1）：

| 因素 | 处理方式 |
|------|---------|
| Task prompt/fixtures | 每个task固定 |
| 初始沙盒状态 | 每个task固定 |
| Budget/timeout/evaluator | 每个task固定 |
| 模型后端 | Factorial矩阵中变化 |
| Harness配置 | Factorial矩阵中变化 |
| Prompting/action格式 | 各harness原生 |
| Tool接口/状态策略 | 各harness原生 |
| Retry/recovery行为 | 各harness原生 |

**主要结果**（Table 2聚合）：
- NanoBot得分最高(76.2)，OpenClaw最低(52.4)，**差距23.8分**
- Codex（GPT-5.4底层，model-bound coding agent）达80.4，但作为专门化系统的参考基线
- **更强模型后端跨harness方差更低**：表明强模型对prompting、tool interfaces、state management差异更宽容
- Token/turn用量不能单独解释性能：NanoBot用68.7K tokens达76.2，NullClaw用175.1K tokens仅64.4

##### 5. 执行对齐与失败模式分析

论文提出关键概念**执行对齐（execution alignment）**：衡量harness保持以下几点之间对应关系的程度——
1. agent的推理(reasoning)
2. 观察到的workspace状态
3. 通过工具执行的动作
4. evaluator检查的条件

**5类典型失败症状及出现率**（Table 3）：
- **Contract/format** (36.4%)：schema或output-contract违规——malformed JSON、缺失ledger行、不完整manifest
- **Tool/recovery** (24.6%)：工具错误或blocked commands后无有效恢复或计划修订
- **Evidence/grounding** (14.6%)：不完整source coverage，伴随无支撑声明或缺失验证
- **Artifact commitment** (11.1%)：有合理推理但未提交required outputs或workspace artifacts
- **State/continuation** (9.3%)：在中断或多轮任务中无法保存持久进度或可靠恢复

> ⚠️ 注意：这些失败发生在"语义合理性"和"机器可验证输出"的边界——agent可能看似理解任务，但在执行层面与oracle可验证的条件脱节。

##### 6. 与传统Benchmark的关系

区别于SWE-bench、AgentBench等outcome-grounded benchmark，Harness-Bench的独特贡献在于**将harness从背景条件提升为第一类研究变量**。它不要求所有系统统一内部policy或runtime，每个harness保持原生行为，从而在共享外部条件下衡量**配置层级**的诊断性差异，而非因果分解单个机制。

```python
for task in benchmark:
    env.reset(task)
    result = agent.run(env.observe())
    metrics.record(validate(result, env))
```

#### 🧪 练习题
```yaml
question: "Harness-Bench评分公式中Security gate的作用是什么？"
options:
  - "衡量agent的token使用效率"
  - "作为二值门控，任何安全/权限违规直接使总分归零"
  - "计算Process子项中的Consistency分数"
  - "仅在Completion分数不达标时触发惩罚"
answer: 1
explain: "Security ∈ {0,1}是乘法公式中的二值门控——一旦发生未授权访问、秘钥泄露或禁止操作等安全违规，无论Completion和Process分数多高，TaskScore直接归零。"
```

### Codex Safety

```yaml
id: codex_safety
num: 20
name: Codex Safety
full_name: Codex 安全治理运行栈 (Running Codex Safely)
year: '2026.05'
org: OpenAI
parent: codex
paper_url: https://openai.com/index/running-codex-safely/
project_url: ''
category: runtime
motivation: 用规则审批与遥测约束高风险执行
```

#### 📝 一句话总结
OpenAI 提出了一套分层安全治理运行栈，通过**事前规则审批**（Rule-based Approval）与**事后遥测约束**（Telemetry-based Constraints）双重机制，在不可信执行环境中对 Codex Agent 的高风险操作进行实时审计与自动熔断，解决了 LLM Agent 自主执行代码时的安全可控难题。

#### 🎯 核心要点
- **两层安全架构**：事前策略检查（Pre-execution Policy Check）+ 运行时遥测监控（Runtime Telemetry Monitoring），构成纵深防御
- **规则审批引擎**：在 Codex 执行文件写入、Shell 命令、网络请求等高风险操作前，自动匹配预设安全策略，违规则拒绝或升级人工审批
- **遥测约束管道**：实时采集 Agent 的 CPU、内存、磁盘 IO、网络流量、子进程树等系统级指标，异常时自动熔断
- **策略描述语言**：使用声明式策略 DSL 定义安全规则，支持按操作类型、路径模式、网络目标等维度精细化控制
- **熔断与回滚机制**：检测到异常行为（如资源超限、敏感文件访问、异常外联）后自动终止会话，支持文件系统快照回滚
- **与 Codex 训练 Pipeline 解耦**：安全层独立于模型推理，不增加推理延迟，可横向扩展到其他 Agent 框架
- **审计日志完整性**：所有操作决策、遥测数据、审批记录落盘，支持事后合规审查

#### 🔬 深入细节
![Codex Safety 示意图](https://images.ctfassets.net/kftzwdyauwt9/6wYGm9QST2WYLbPJl5YwZC/1e63f3bfb458ce891db4f94a52052240/Codex_Blog_Header_V5.png?fm=webp&q=90&w=3840)
*图：Codex Safety 的核心框架或系统示意。*

##### 4.1 核心架构示意

Codex 安全治理运行栈的架构分为三个层级，从内到外依次为：Codex 执行引擎、策略审批层、遥测监控层。用户发出的每个指令（Prompt）在到达执行引擎前，先经**策略审批层**进行意图分析和高风险操作预检；执行过程中，**遥测监控层**持续采集系统指标，一旦触发熔断阈值即终止会话。

```
┌──────────────────────────────────────┐
│          用户请求 (Prompt)            │
└─────────────┬────────────────────────┘
              ▼
┌──────────────────────────────────────┐
│    策略审批层 (Pre-execution)          │
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │ 文件访问 │  │ Shell  │  │ 网络   │ │
│  │ 策略    │  │ 策略   │  │ 策略   │ │
│  └────┬───┘  └───┬────┘  └───┬────┘ │
│       └──────────┼───────────┘       │
│                  ▼                   │
│          ┌──────────────┐            │
│          │ 审批/拒绝/升级│            │
│          └──────────────┘            │
└─────────────────┬────────────────────┘
                  ▼ (通过审批)
┌──────────────────────────────────────┐
│        Codex 执行引擎                 │
│   (文件/Script/Shell/Browser...)     │
└─────────────────┬────────────────────┘
                  ▼ (运行时)
┌──────────────────────────────────────┐
│    遥测监控层 (Runtime)               │
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │ CPU/内存│  │ 磁盘IO │  │ 网络流量│ │
│  └────┬───┘  └───┬────┘  └───┬────┘ │
│       └──────────┼───────────┘       │
│                  ▼                   │
│          ┌──────────────┐            │
│          │ 熔断/回滚/告警│            │
│          └──────────────┘            │
└──────────────────────────────────────┘
```

##### 4.2 规则审批引擎

策略审批是安全治理的第一道防线。核心机制如下：

**声明式策略 DSL**

安全策略使用 YAML 风格的声明式语言定义。每条规则包含操作类型（operation）、匹配条件（condition）和动作（action）三要素。示例：

```yaml
rules:
  - name: "禁止写入系统目录"
    operation: "file_write"
    condition:
      path_pattern: ["/etc/*", "/sys/*", "/boot/*"]
    action: "deny"
    escalation: "human_approval"

  - name: "限制Shell高危命令"
    operation: "shell_exec"
    condition:
      command_pattern: ["rm -rf /*", "mkfs.*", "dd if=* of=/dev/*"]
    action: "deny"

  - name: "外联白名单"
    operation: "network_outbound"
    condition:
      host_not_in: ["api.openai.com", "pypi.org"]
    action: "deny_with_log"
```

**高风险操作分类**

| 操作类别 | 风险等级 | 典型操作 |
|---------|---------|---------|
| 文件读取 | 低 | 读取用户工作区、配置文件 |
| 文件写入 | 中 | 修改/创建文件 |
| Shell 执行 | 高 | 任意命令执行 |
| 网络请求 | 高 | 外联下载/上传数据 |
| 进程管理 | 高 | 创建子进程、发送信号 |
| 包安装 | 高 | pip/apt 安装未校验包 |

> 💡 关键：策略审批在 **Codex 生成工具调用的参数阶段介入**，而非在最终执行阶段。这意味着即使模型产生高风险意图，在实际调用系统 API 前即被拦截，不会留下恶意操作的窗口。

##### 4.3 遥测约束管道

通过审批的操作进入执行阶段后，**遥测约束管道**作为第二道防线持续监控。

**监控指标**

遥测 Agent 以独立进程运行，通过 Linux cgroup、namespace 和 eBPF 采集以下指标：

- **资源上限**：CPU 配额 \\(C_{max}\\)、内存限制 \\(M_{max}\\)、磁盘 IO 带宽
- **进程树追踪**：Codex 及其子进程的 fork/exec 行为，检测逃逸进程
- **网络流量审计**：实时分析出站连接的目标 IP、端口和协议
- **敏感路径访问**：监控对 \\(/proc, /sys, /root, /etc/shadow\\) 等路径的异常 read/open 调用

**熔断逻辑**

当任意指标超过阈值 \\(T\\) 时触发熔断：

$$
\text{circuit\_break} = 
\begin{cases}
\text{true} & \text{if } \exists i: m_i > T_i \\
\text{true} & \text{if 检测到进程逃逸} \\
\text{true} & \text{if 外联至未信任 IP} \\
\text{false} & \text{otherwise}
\end{cases}
$$

熔断后，遥测层向 Codex 会话发送 SIGTERM，同时触发**文件系统快照回滚**——利用 copy-on-write 快照将工作区恢复到任务开始前的状态。

> ⚠️ 注意：遥测约束与审批策略**互补而非替代**。审批解决"要不要做"，遥测解决"做得对不对/有没有异常"。即便审批策略放行的操作，在运行时若表现出攻击特征（如 CPU 挖矿、数据外泄），遥测层仍会熔断。

##### 4.4 训练与推理阶段的差分治理

OpenAI 特别强调了训练环境（内部 Codex 沙箱）与推理环境（用户侧部署）的安全策略差异：

| 维度 | 训练环境 | 推理/部署环境 |
|-----|---------|-------------|
| 网络 | 完全隔离，仅允许内网 Python 镜像源 | 白名单外联策略 |
| 文件系统 | 临时 overlayfs，会话结束后丢弃 | 快照 + 回滚 |
| 审计 | 全量策略日志 + 遥测事件 | 用户可自定义审计粒度 |
| 审批 | 自动执行（deny-by-default） | 支持 human-in-the-loop |

##### 4.5 与传统沙箱方案的对比

对比传统方案（Docker 容器、seccomp、AppArmor），Codex 安全运行栈的差异化在于：

1. **语义级策略**：传统沙箱基于系统调用级别（如限制 `open()` 的 flags），Codex 的策略基于**任务语义**（"是否在写论文草稿时意外执行了 `rm -rf`"），更贴合 Agent 场景
2. **策略与模型协同进化**：通过遥测反馈，可自动发现模型高频误触的策略规则并优化，形成安全-性能的闭环
3. **轻量级集成**：独立于推理引擎，不需修改模型权重或推理代码，通过工具调用中间件即可注入

#### 🧪 练习题
```yaml
question: "Codex 安全治理运行栈中，策略审批层的主要拦截时机是什么？"
options:
  - "在 Codex 生成自然语言回复后"
  - "在 Codex 生成工具调用参数后、实际执行前"
  - "在工具执行完成后，由遥测层审计"
  - "在用户提交 Prompt 时，进行意图分类"
answer: 1
explain: "策略审批在 Codex 生成工具调用参数后、系统调用实际发生前介入。这样可以在模型产生高风险意图的瞬间完成拦截，而非等到执行后再审计，确保零执行窗口。"
```

### RHO

```yaml
id: rho
num: 21
name: RHO
full_name: 回顾式 Harness 优化 (Retrospective Harness Optimization)
year: '2026.06'
org: CityU/MSRA
parent: ahe
paper_url: https://arxiv.org/abs/2606.05922
project_url: ''
category: optimization
motivation: 只靠历史轨迹自监督优化harness
```

#### 📝 一句话总结
RHO 是一种**零外部监督**的 agent harness 自优化方法：从历史轨迹中精选多样化的困难任务 coreset，并行重跑并利用 agent 自身的 self-validation、self-consistency 和 pairwise self-preference 来生成并筛选最优 harness 更新，单轮优化即可将 SWE-Bench Pro 通过率从 59% 提升至 78%。

#### 🎯 核心要点
- **Phase 1 — Retrospective Coreset Selection**: 从历史轨迹中基于难度和多样性选取代表性任务子集
- **Phase 2 — Parallel Rollouts**: 对 coreset 中的每个任务，agent 并行重新求解，生成多条 rollout 轨迹
- **Phase 3 — Self-Analysis**: 通过 self-validation（自我验证结果正确性）和 self-consistency（多条 rollout 之间的一致性）分析表现
- **Phase 4 — Harness Update via Self-Preference**: agent 生成多个候选 harness 更新方案，通过 pairwise self-preference 选出最优方案并应用
- SWE-Bench Pro 单轮优化：**59% → 78%**（+19个百分点），无需任何外部 grading
- 三个领域验证：软件工程（SWE-Bench Pro）、技术工作、知识工作均有显著提升
- Harness 优化后，agent 的**行为模式发生持久改变**，在长时间会话中维持更高准确率
- RHO 能有效针对性地修复先前的**失败模式**
- 首次将 **self-preference** 引入 harness 优化，agent 通过成对比较自行判断哪个 harness 更新更优
- **Coreset selection** 确保优化聚焦于最有价值的困难案例，避免冗余计算
- 全流程**零外部监督**，仅依赖历史轨迹，实现真正的自主进化

#### 🔬 深入细节
##### 1. Algorithm 1 — RHO 完整算法伪代码

```
Algorithm 1: Retrospective Harness Optimization (RHO)

Input:  Agent A with harness H_0, trajectory history T, 
        number of optimization rounds R
Output: Optimized harness H_R

1:  for round r = 1 to R do
2:      // Phase 1: Retrospective Coreset Selection
3:      C_r ← SelectCoreset(T, k)        ▷ k tasks from history
4:          ▷ Selection criteria: (i) difficulty score, (ii) diversity
5:      
6:      // Phase 2: Parallel Rollouts
7:      for each task t ∈ C_r do
8:          Rollouts_t ← {A.solve(t, H_{r-1}) for i = 1..m}
9:      end for
10:     
11:     // Phase 3: Self-Analysis
12:     for each task t ∈ C_r do
13:         V_t ← SelfValidate(Rollouts_t, t)
14:         ▷ Check: output correctness, intermediate reasoning, tool usage
15:         S_t ← SelfConsistency(Rollouts_t)
16:         ▷ Measure: agreement among m rollouts on final answer
17:         A_t ← Aggregate(V_t, S_t)
18:     end for
19:     
20:     // Phase 4: Harness Update via Self-Preference
21:     Updates ← GenerateCandidates(A, C_r, {A_t, Rollouts_t})
22:         ▷ Candidates: modified prompts, tool specs, workflow DAGs
23:     H_r ← SelectBySelfPreference(A, Updates, C_r, H_{r-1})
24:         ▷ Pairwise comparison: "Which harness leads to better outcomes?"
25:         ▷ Select update with highest win rate over H_{r-1}
26: end for
27: return H_R
```

**解读**：
- **Phase 1 的 Coreset Selection** 是整个优化的基础。不同于随机采样或全量重跑，RHO 通过难度评分（如历史失败率）和多样性度量（如任务 embedding 的 MMR）选取 k 个任务。这保证了优化资源投放在最有信息量的案例上。
- **Phase 2 的并行 Rollouts** 利用 agent 的非确定性（temperature > 0），对同一任务生成 m 条可能不同的求解路径。这种多样性是后续 self-consistency 分析的信息来源。
- **Phase 3 的 Self-Analysis** 包含两个互补维度：SelfValidation 直接检查单条 rollouts 的输出质量（代码能否运行、答案格式是否正确），SelfConsistency 通过多条 rollouts 的答案一致性来间接评估，两者结合给出无需 ground truth 的可靠质量信号。
- **Phase 4 的 Self-Preference** 是最核心的创新：agent 生成候选 harness 修改（如调整提示词、工具调用策略），然后通过成对比较（"使用 harness A 得到的 rollouts vs. 使用 harness B 得到的 rollouts"）让 agent 自己判断哪个更好，选择胜率最高的更新。

##### 2. 示意图说明

**Figure 1 — RHO 总体框架**
![RHO Framework](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x1.png)
- *左半部分*：展示历史轨迹的积累，包含成功和失败的案例
- *中间*：四阶段流水线（Coreset Selection → Parallel Rollouts → Self-Analysis → Self-Preference）
- *右半部分*：优化后的 harness 在新任务上表现提升，形成正向循环

**Figure 2 — Coreset Selection 示意**
![Coreset Selection](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x2.png)
- 可视化展示了如何在 embedding 空间中选取既困难又多样化的 coreset 任务
- 颜色深浅表示任务难度，选取的任务（红圈）覆盖了表示空间的不同区域
- 对比了随机采样、仅按难度采样和 RHO coreset 采样的分布差异

**Figure 3 — 主实验结果**
![Main Results](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x3.png)
- SWE-Bench Pro: 59% → 78%（单轮优化）
- 包含 ablation study：去掉 coreset selection、去掉 self-consistency、去掉 self-preference 的性能退化
- 多轮优化的效果曲线，显示第二轮后趋于饱和

**Figure 4 — Harness 优化前后行为模式变化**
![Behavior Change](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x4.png)
- 展示了 agent 工具调用序列的分布变化（如某个原来被过度使用的工具调用频率下降）
- 推理链长度的分布偏移（关键步骤被前置或增加了特定的验证步骤）
- 失败模式的针对性修复（特定类型的 bug 在优化后显著减少）

**Figure 5 — 长时间会话中的稳定性**
![Long-horizon Stability](https://ar5iv.labs.arxiv.org/html/2606.05922/assets/x5.png)
- 对比优化前后 agent 在连续多步任务中的准确率衰减曲线
- 优化后的 harness 显著减缓了长时间运行中的性能退化
- 展示了累积错误率的变化趋势

##### 3. Coreset Selection 的核心设计

RHO 的 coreset selection 采用两阶段评分：

**难度评分** (Difficulty Score)：
- 历史轨迹中该任务的首次尝试成功率（越低越困难）
- 推理步骤长度（过长或过短都可能表示困难）
- 工具调用异常频率（如重复调用同一工具）

**多样性评分** (Diversity Score)：
- 使用 Maximum Marginal Relevance (MMR) 在任务 embedding 空间中选取
- 确保 coreset 覆盖不同的任务类型、领域和失败模式
- 避免选取语义高度相似的冗余任务

最终的 coreset 是难度和多样性的加权组合，实验表明两者缺一都会导致优化效果显著下降。

##### 4. Self-Analysis 的双重验证机制

**Self-Validation**：Agent 检查自身输出的质量
- 代码任务：执行结果是否符合预期、能否编译通过
- 推理任务：中间步骤是否有逻辑跳跃、最终结论是否有证据支持
- 使用结构化 checklist 让 agent 逐项打分

**Self-Consistency**：通过多次 rollouts 交叉验证
- 对同一任务运行 m 次（m=3~5），统计最终答案的一致性
- 高一致性 → 答案可信度更高，低一致性 → 该任务是优化的重点目标
- 与 self-validation 结合：两者矛盾时优先信任 consistency（更客观）

**关键洞察**：这两种机制都不需要 ground truth，却能为 harness 优化提供可靠的反馈信号。Self-validation 捕捉 agent 的"自我认知"，self-consistency 捕捉答案的"客观稳定性"。

##### 5. Pairwise Self-Preference 的实现

这是 RHO 最核心的机制创新。具体流程：

1. **候选生成**：基于 coreset 的分析结果，agent 生成 N 个候选 harness 更新方案（如修改系统提示中关于工具使用的指导、调整特定工作流的条件分支）
2. **成对评估**：对每个候选 harness H'，agent 在 coreset 任务上分别用 H 和 H' 生成 rollouts
3. **自我偏好判断**：agent 比较配对结果，选择"在更多任务上表现更好"的 harness
4. **胜率聚合**：统计每个候选在 pairwise 比较中的胜率，选择胜率最高的方案

**为什么不用绝对评分？** 实验表明 LLM 的绝对评分（如"这个解决方案打 8/10 分"）有严重的校准问题。而 pairwise 比较（"方案 A 和方案 B 哪个更好？"）更符合 LLM 的评估能力，结果更稳定可靠。

#### 🧪 练习题
```yaml
question: "RHO 在没有外部标注和 ground-truth 验证集时，主要依靠什么机制来选择更好的 harness 更新？"
options:
  - "只看单次 rollout 的最终奖励，选择分数最高的候选"
  - "让人工工程师离线审查所有轨迹并手工投票"
  - "结合 self-validation、self-consistency，再通过 pairwise self-preference 比较候选 harness"
  - "直接把历史失败任务加入监督微调数据，不再做 harness 搜索"
answer: 2
explain: "RHO 的核心就在于无标注自监督闭环：先用自验证和自一致性分析轨迹，再让 agent 通过成对偏好比较候选 harness，而不是依赖外部标签。"
```
