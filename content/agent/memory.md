---
domain: agent
topic_id: memory
topic_name: Agent记忆
page_icon: 🧠
page_title: Agent记忆技术演进
page_subtitle: '{build_date} 版'
page_desc: 系统梳理Agent记忆从反思式文本记忆、陪伴型长期记忆，到结构化检索、OS式层级管理，再到2026年的统一短长时记忆、多模态可信记忆与神经符号记忆的演进路线。
hero_pills:
- 🏷️ STM · LTM · Episodic · Semantic
- Retrieval Memory · MemGPT · AgeMem · Multimodal
count_pill: '{count} 个算法'
categories:
  episodic:
    label: 情节与长期记忆
    color: '#0F766E'
  reflective:
    label: 反思与经验记忆
    color: '#2563EB'
  structured:
    label: 结构化检索记忆
    color: '#7C3AED'
  management:
    label: 分层与策略管理
    color: '#EA580C'
  multimodal:
    label: 多模态与神经符号
    color: '#DC2626'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/memory/overview/zhihu__2025年Memory最全综述！AI_Agent记忆统一分类体系：超越RAG下一代架构__83d9fe12/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/memory/latest/zhihu__Agent_Memory_这三年——AI_圈最热的问题，为什么三年都没解决__c9d1fb04/article.md

## 算法演化关系

```yaml
nodes:
- id: reflexion
  x: 80
  y: 90
  category: reflective
- id: generative_agents
  x: 140
  y: 170
  category: episodic
- id: memorybank
  x: 240
  y: 170
  category: episodic
- id: memgpt
  x: 360
  y: 340
  category: management
- id: a_mem
  x: 560
  y: 255
  category: structured
- id: mem0
  x: 660
  y: 255
  category: structured
- id: memoryos
  x: 760
  y: 340
  category: management
- id: mirix
  x: 860
  y: 430
  category: multimodal
- id: agemem
  x: 930
  y: 340
  category: management
- id: himem
  x: 980
  y: 255
  category: structured
- id: m2a
  x: 1060
  y: 430
  category: multimodal
- id: mma
  x: 1140
  y: 430
  category: multimodal
- id: amv_l
  x: 1200
  y: 340
  category: management
- id: ns_mem
  x: 1260
  y: 430
  category: multimodal
- id: memmachine
  x: 1330
  y: 255
  category: structured
- id: lightmem
  x: 1390
  y: 340
  category: management
- id: h_mem
  x: 1460
  y: 255
  category: structured
- id: dimmem
  x: 1540
  y: 255
  category: structured
edges:
- from: generative_agents
  to: memorybank
  label: 遗忘更新
- from: memorybank
  to: memgpt
  label: 分页扩窗
- from: memorybank
  to: a_mem
  label: 动态建链
- from: memorybank
  to: mem0
  label: 只存要点
- from: memgpt
  to: memoryos
  label: 层级存储
- from: memoryos
  to: mirix
  label: 多记忆体
- from: memoryos
  to: agemem
  label: 策略调度
- from: memoryos
  to: amv_l
  label: 生命周期
- from: memoryos
  to: lightmem
  label: 轻量在线
- from: a_mem
  to: himem
  label: 层级笔记
- from: himem
  to: h_mem
  label: 树图混合
- from: h_mem
  to: dimmem
  label: 维度原子
- from: mem0
  to: memmachine
  label: 保真召回
- from: mirix
  to: m2a
  label: 双层个性
- from: m2a
  to: mma
  label: 可信重排
- from: mma
  to: ns_mem
  label: 规则层
milestones:
- generative_agents
- memgpt
- agemem
```

## 核心算法

### Reflexion

```yaml
id: reflexion
num: 1
name: Reflexion
full_name: 语言反思强化 (Reflexion)
year: '2023.03'
org: Princeton/Northeastern
parent: —
paper_url: https://arxiv.org/abs/2303.11366
project_url: ''
category: reflective
motivation: 把失败反思写入情节记忆驱动重试
```

#### 📝 一句话总结
Reflexion通过让LLM Agent在失败后将自我反思以自然语言形式写入情节记忆（episodic memory），驱动后续重试时的决策改进，实现无需梯度更新的"语义梯度"强化学习——在HumanEval上以91% pass@1超越GPT-4原生80%。

#### 🎯 核心要点
- **Actor (Mₐ)**：基于LLM的决策者，根据当前状态和情节记忆生成文本/动作，类似传统RL中的策略网络。
- **Evaluator (Mₑ)**：评估Actor生成的轨迹质量，输出标量奖励或自由文本反馈信号（如编译错误、单元测试结果、正确答案）。
- **Self-Reflection (Mₛᵣ)**：将Evaluator的反馈信号转换为口头反思文本（如"我应该先检查抽屉再找钥匙"），追加到情节记忆缓冲区mem中。
- 核心公式：θ = {Mₐ, mem}，策略参数化为LLM参数+记忆内容，而非传统神经网络权重。
- **外部反馈**：环境二元信号（AlfWorld成功/失败）、编译器解释器输出（代码执行结果）、测试用例结果（HumanEval/MBPP）。
- **内部模拟反馈**：LLM自我评价（HotPotQA中让LLM判断答案正确性）、基于启发式规则（如AlfWorld中连续3次相同动作超30步触发反思）。
- AlfWorld（134环境6类任务）：比ReAct基线提升22%（绝对精度）
- HotPotQA（推理问答）：提升20%
- HumanEval（Python编程）：GPT-4+Reflexion达91% pass@1（基线80%）
- MBPP：GPT-4+Reflexion达90.5%
- LeetcodeHard（新基准）：GPT-4+Reflexion达40% pass@1（基线32%）

#### 🔬 深入细节
![Reflexion 示意图](https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x1.png)
*图：Reflexion 的核心框架或评测示意。*

##### 算法流程（Algorithm 1）

Reflexion 的核心算法是一个迭代的重试循环，其伪代码如下：

```
1. 初始化 Actor M_a, Evaluator M_e, Self-Reflection M_sr
2. 用初始策略 pi_theta 生成 trajectory tau_0
3. M_e 评估 tau_0 → M_sr 生成反思 sr_0 → mem = [sr_0]
4. while M_e 未通过 且 t < max_trials:
   a. 基于 pi_theta = {M_a, mem} 生成新 trajectory tau_t
   b. M_e 评估 tau_t
   c. M_sr 用 tau_t 和评估结果生成新反思 sr_t
   d. 将 sr_t 追加到 mem
   e. t += 1
5. 返回最终 trajectory（若通过）或标记失败
```

关键在第 4 步：每次重新生成动作序列时，Actor 能看到前面所有失败反思，从而避免重复同类错误。mem 的不断增长使得后续 episode 拥有更多历史经验。论文将策略参数化为 θ = {M_a, mem}，即 LLM 参数和记忆内容的组合——梯度不作用于 LLM 权重，而是通过新增反思文本间接影响后续输出分布，这正是"语义梯度"的核心含义。

##### 三种任务的具体配置

**1. 决策任务（AlfWorld）**
- Actor 使用 ReAct（思考-行动-观察循环）生成交互轨迹
- 启发式自评价规则：连续 3 次产生相同动作且收到相同观察，或当前环境步骤数超过 30 步仍未完成 → 触发反思
- 同时支持 LLM 自我判断（二分类是否完成任务）
- 反思内容示例："我在厨房卡住了，应该先检查冰箱里有没有苹果……下次要优先搜索所有容器后再做移动操作"
- 每次反思后重置环境并重新开始，最多 12 次迭代

**2. 推理任务（HotPotQA）**
- Actor 生成搜索-推理链和最终答案字符串
- Evaluator 使用 Exact Match (EM) 和 F1 分数评估答案质量，或用 LLM 自行判断正确性
- 反思模板整合错误分析："上次我在第二步选择了错误的维基百科条目（2014年世界杯），实际应该是 2018 年世界杯的页面。下次要更仔细地比对日期信息"
- 验证了即使无真实标签（仅靠 LLM 自评），Reflexion 仍能取得 20% 的性能提升

**3. 编程任务（HumanEval / MBPP / LeetcodeHard）**
- Actor 生成完整 Python 函数代码
- Evaluator 运行 Python 解释器执行代码 + 单元测试，返回 pass/fail 及完整错误堆栈
- 反思将错误堆栈翻译为结构化改进建议："AssertionError 在第 7 行——我忘记处理负数输入情况，下次需要在函数开头添加输入边界检查"
- 支持多种内部测试（如自生成的单元测试），验证在无外部 Oracle 情况下仍有效

##### 消融实验的关键发现

| 消融维度 | 结论 |
|---------|------|
| 反馈形式：原始错误 vs 结构化反思 | 将错误转化为反思文本显著优于仅使用原始报错信息，说明 LLM 的自我总结提炼至关重要 |
| 反思记忆长度：全部历史 vs 最近 1 条 | 保留全部历史反思明显更优，长程记忆积累可避免重复先前错误 |
| 模型规模：GPT-3.5 vs GPT-4 | Reflexion 在两个模型上均有显著提升，但 GPT-4 能从反思中提取更多价值，提升幅度更大 |
| 反馈类型：语言型（文本反思）vs 标量型（仅知道对错） | 语言型反馈远优于标量型，验证了"语义梯度"的有效性 |
| 自评 vs Oracle 反馈 | 使用 LLM 自我评价（无真实标签）仍能取得显著提升，虽略逊于 Oracle 反馈 |

##### 技术细节与 I/O 设计

**Actor prompt 模板**包含三个部分：
1. 系统指令（角色设定 + 任务说明 + 输出格式要求）
2. 情节记忆块 mem（所有历史反思文本的拼接，以 "You have attempted this task before and failed. Here are the reflections:" 开头）
3. 当前任务和状态输入

**Self-Reflection prompt 模板**包含：
1. 上一轮的完整轨迹 τ（动作序列 + 环境观察）
2. Evaluator 的反馈（错误报告 / 失败原因）
3. 指令要求（"Based on the above, write a few sentences of reflection on what went wrong and how to improve"）

##### 新基准 LeetcodeHard

论文贡献了 LeetcodeHard 这一新代码基准，包含 40 道 LeetCode Hard 级别题目，每道配有 3 个隐藏测试用例（以真实竞赛环境评估）。GPT-4+Reflexion 首次将 Hard 题 pass@1 从 32% 提升到 40%，证明反思机制在极难任务上仍有效。该基准后被广泛用于后续 Agent 编程论文。

##### 局限性与未来方向

1. **反思质量依赖 LLM 能力**：若 LLM 自我评估有偏差或反思不准确，可能导致错误累积
2. **无形式化收敛保证**：不同于传统 RL 的数学收敛证明（如 Bellman 方程），Reflexion 依赖于 LLM 的经验性表现
3. **Prompt 长度膨胀**：每轮反思追加约 100-300 tokens，多轮后可能超出 LLM 上下文窗口（论文中使用 GPT-4 8K/32K 上下文版本规避）
4. **任务定制化成本**：每个新任务需要人工设计 Evaluator 和反思 Prompt 模板
5. **开源承诺**：所有代码、Demo 和数据集已发布在 https://github.com/noahshinn024/reflexion

##### 与后续工作的关联

Reflexion 是 LLM-based agent 反思类方法的开创性工作，开创了"语言化反思记忆"这一研究方向，直接或间接启发了：
- **Tree of Thoughts (Yao et al., 2023)**：将反思扩展为搜索树，支持多分支探索和回溯
- **LATS (Zhou et al., 2023)**：结合蒙特卡洛树搜索与反思记忆，增强规划能力
- **AgentVerse 等**：多智能体协作反思框架
- **RCI (Recursive Criticism and Improvement)**：递归式自我评价与改进

其核心理念"语义梯度"已成为当前 LLM Agent 设计的标准模块之一。

#### 🧪 练习题
```yaml
question: "Reflexion 与普通多次重采样（retry）最本质的区别是什么？"
options:
  - "Reflexion 会把每次失败的自然语言反思写入情节记忆，并在后续重试时作为额外上下文"
  - "Reflexion 通过增大 temperature 生成更多候选答案"
  - "Reflexion 直接微调 Actor 的模型参数"
  - "Reflexion 不需要任何评估器，只靠用户主观判断"
answer: 0
explain: "Reflexion 的核心是把失败经验转成文本反思并跨 episode 保留下来，形成无需参数更新的“语义梯度”。"
```

### Generative Agents

```yaml
id: generative_agents
num: 2
name: Generative Agents
full_name: 生成式代理人 (Generative Agents)
year: '2023.04'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/2304.03442
project_url: ''
category: episodic
motivation: 首次把记忆反思规划做成完整闭环
```

#### 📝 一句话总结
Generative Agents 首次将大语言模型与**记忆流(Memory Stream)→检索(Retrieval)→反思(Reflection)→规划(Planning)**的完整认知架构结合，让 25 个 AI 智能体在模拟小镇 Smallville 中自主涌现出信息扩散、关系形成和群体协调等可信社会行为，成为 AI Agent 研究领域的里程碑工作。

#### 🎯 核心要点
- 提出 **Generative Agent 架构**：包含 **Memory Stream（记忆流）**、**Retrieval（检索）**、**Reflection（反思）**、**Planning（规划）** 和 **Reaction（反应）** 五大模块
- **Memory Stream** 以自然语言记录智能体的所有经历，每条记忆附带时间戳和重要性分数
- **Retrieval** 模块采用三要素加权检索：score = α·recency + β·importance + γ·relevance，其中 relevance 使用 LLM 生成的 embedding 计算余弦相似度
- **Reflection（反思）** 是高层抽象机制：定期从记忆流中提取高层次推断（如 "John 对音乐有热情"），再将反思写回记忆流参与后续检索
- **Planning（规划）** 采用递归逐层生成：日计划 → 时段计划 → 具体行动序列（5-15 分钟粒度），可在执行中动态调整
- **Smallville 沙盒环境**：基于 Phaser 框架构建的虚拟小镇，含 9 栋建筑（咖啡馆、学校、公园等），智能体以自然语言描述初始化
- 通过 25 个智能体历时 **2 个完整游戏日** 的端到端实验，验证了**信息扩散**（如 Valentine's Day party 消息传播）、**关系形成**、**群体协调**等涌现行为
- 受控评估中访谈智能体考察 5 个维度：自我认知、记忆检索、计划生成、反应能力、反思能力，ablation 实验证明三个核心组件（观察/规划/反思）均对可信度有显著贡献
- 开源项目已成为 AI Agent 领域的经典参考实现，启发了大量后续工作（AutoGPT、MetaGPT、CrewAI 等）

#### 🔬 深入细节
##### 1. 动机与背景

传统的人工社会模拟（如 The Sims）依赖于手工编写的有限状态机或行为树，agent 行为僵化且无法从经验中学习。随着 GPT-3.5 / Claude 等大语言模型（LLM）展现出强大的推理和语言生成能力，Park 等人提出一个核心假设：**能否将 LLM 嵌入到一个长期记忆和自主决策的循环中，让 agent 产生持久、连贯且可信的行为？**

论文的核心挑战在于：LLM 的上下文窗口有限（当时 GPT-3.5-turbo 仅 4K tokens），无法承载 agent 一生积累的所有经验；agent 还需要在合适的时刻回忆起合适的记忆、从中提炼高层认知、并据此动态调整计划。这些需求催生了 Memory Stream + Retrieval + Reflection + Planning 的四阶段认知架构。

##### 2. 核心架构详解

![Generative Agent Architecture](https://ar5iv.labs.arxiv.org/html/2304.03442/assets/figures/fig1.png)
*图：Generative Agent 架构概览。智能体感知环境→存入Memory Stream→按需Retrieval→周期性Reflection→递归Planning→生成Reaction。*

**Memory Stream（记忆流）** 是智能体的"人生数据库"，以自然语言语句持续追加所有观察、行动和对话。每条记忆记录为三元组：`(时间戳, 内容, 重要性分数)`。重要性分数由 LLM 以 1-10 打分自动评估，决定该记忆在检索中的权重。

**Retrieval** 解决"上下文窗口有限但记忆无限"的矛盾。检索评分函数为：

$$\text{score}_{\text{memory}} = \alpha \cdot \text{recency} + \beta \cdot \text{importance} + \gamma \cdot \text{relevance}$$

其中 recency 由指数衰减函数计算（衰减因子按小时计），importance 为 LLM 打分，relevance 为查询与记忆的 embedding 余弦相似度。检索时取 top-k（实验中 k=15）拼入 prompt 供 LLM 推理。

> 💡 关键：三个权重 α, β, γ 可通过网格搜索调整。论文实验发现重要性权重最高、相关性次之、新近度最低时效果最好，说明"记住重要的事"比"记住最近的事"更关键。

**Reflection（反思）** 是本文最具创新性的机制：agent 不满足于检索原始记忆，而是定期从记忆流中提炼高层抽象。触发条件为"重要性分数累积超阈值"（默认 150 分）。反思过程分两步：
1. 检索与反思主题相关的最新记忆（如最近 100 条中重要性最高的一组）
2. 向 LLM 提出 3 个引导性问题（如"John 最近在关注什么？""哪些模式反复出现？"），LLM 根据检索到的记忆生成高层陈述

例如，agent "John" 反复去咖啡馆弹钢琴，反思模块就会生成 "John Lin is passionate about music" 这样的高层认知，并写回记忆流作为新记忆——后续检索时这条反思记忆也会被检索到，形成 "经验 → 反思 → 指导未来行为" 的正反馈循环。

**Planning（规划）** 采用递归分解：先让 LLM 生成日计划（如"上午：写作，下午：社交，晚上：休息"），再逐层细化为时段计划和具体行动步骤。每步行动生成时，LLM 会看到当前环境信息（同一建筑内的 agent 和物体）、Agent self 的个人背景摘要、以及检索到的相关记忆——这些信息共同决定 agent 在每一步做出什么具体行为（如 "在 Hobbs Cafe 的 counter 处做一杯浓缩咖啡"）。

**Reaction（反应）** 以自然语言描述动作输出（如"making espresso for a customer @ Hobbs Cafe: counter: coffee machine"），通过沙盒服务器解析为 JSON 更新 agent 的位置和物体状态，形成闭环。

> ⚠️ 注意：整个架构中 LLM 被用作"推理引擎+语言生成器"，但记忆存储、检索评分、反思触发等结构化逻辑均由外部代码实现，LLM 仅负责自然语言理解和生成。

##### 3. Smallville 沙盒环境

Smallville 是一个基于 Phaser web 游戏框架构建的 2D 虚拟小镇，包含 9 栋建筑（咖啡馆、公园、学校、宿舍、商店等）和功能性物体（咖啡机、钢琴、书桌等）。地图采用手工编辑的 tile 地图，碰撞检测由 Phaser 物理引擎负责。

Agent 通过与沙盒服务器的 HTTP API 交互：每步时间步（游戏中约 10 秒），agent 接收视野范围内的 agent/物体列表作为"感知"输入，输出自然语言动作描述；服务器解析动作并更新游戏状态。25 个 agent 每个都以一段自然语言段落初始化（描述职业、性格、日常习惯和与其他 agent 的关系），这些描述被拆分为初始记忆注入 Memory Stream。

##### 4. 评估方法与关键结果

论文采用两阶段评估：

**受控评估（Controlled Evaluation）**：针对 25 个 agent 各设计 25 道访谈题目（共 625 道），覆盖：自我认知（如"请介绍你自己"）、记忆检索（"还记得 X 事件吗？"）、计划生成（"你今天有什么计划？"）、反应能力（"如果发生 Y 你会怎么做？"）和反思能力（"你从最近经历中学到了什么？"）。人类评估者对回答的可信度打分（1-5 分 Likert 量表）。

关键发现：
- **反思能力差距最大**：完整系统在反思维度得分显著高于 ablations，说明 Reflection 机制对高层认知最不容易被简单替代
- 移除 observation（仅用初始记忆）时，agent 在反应和记忆维度急剧下降
- 移除 reflection 时，planning 质量下降明显，agent 的行为变得机械重复

**端到端评估（End-to-End Evaluation）**：让 25 个 agent 在 Smallville 中自由运行 2 个完整游戏日，观察涌现行为：
- **信息扩散**：Isabella 策划 Valentine's Day party 的消息在半天内传播给 12 个 agent（48%），只通过对话
- **关系形成**：agent 通过记住与谁聊过天、聊了什么，逐渐形成社交关系网络；对话记忆被检索用于后续对话
- **群体协调**：多个 agent 在正确的时间到达正确的派对地点，实现了时间-空间上的自组织

##### 5. 局限与边界条件

论文坦诚讨论了几个关键局限：
- **记忆幻觉（Hallucination）**：LLM 可能生成不符合 agent 实际经历的记忆内容，积少成多会导致行为失真
- **过度连贯性**：agent 的行为有时过于一致，缺乏人类的不理性和随机性
- **计算成本**：每步推理需多次 LLM 调用（检索 query 生成→重要性评估→反思生成→计划分解→行动决策），运行 2 天需数千次 API 调用
- **缺乏长期学习**：反思机制只能提取短期模式，agent 无法真正"改变性格"或形成跨越数周/月的持久变化

```python
mem = memory.load()
ctx = memory.retrieve(query, mem)
answer = agent.generate(query, ctx)
memory.update(query, answer, mem)
```

#### 🧪 练习题
```yaml
question: "Generative Agents 中 Reflection（反思）机制的核心作用是什么？"
options:
  - "加快记忆检索速度，降低 LLM 推理延迟"
  - "从记忆流中自动提炼高层抽象认知，写回记忆参与后续决策"
  - "替代人工标注 agent 的初始性格特征"
  - "将 agent 的行为轨迹可视化给人类评估者"
answer: 1
explain: "Reflection 定期从低层观察记忆中生成长远的高层推断（如兴趣、价值观），并写回记忆流，使 agent 能够基于过去的经验模式指导未来行为，形成'经验→反思→指导'的认知闭环。"
```

### MemoryBank

```yaml
id: memorybank
num: 3
name: MemoryBank
full_name: 记忆库 (MemoryBank)
year: '2023.05'
org: Sun Yat-sen University
parent: generative_agents
paper_url: https://arxiv.org/abs/2305.10250
project_url: ''
category: episodic
motivation: 用遗忘曲线筛存长期个性化记忆
```

#### 📝 一句话总结
MemoryBank 是一种为 LLM 设计的长时记忆机制，受 Ebbinghaus 遗忘曲线启发，通过“记忆存储—检索—更新”三阶段流程使 AI 能选择性遗忘、强化记忆、理解用户个性，从而支撑长期 AI 陪伴场景。

#### 🎯 核心要点
- **三层记忆存储**: 原始对话记录 → 每日事件摘要 → 全局摘要，并持续推断用户个性画像。
- **双塔检索**: 采用 DPR (Dense Passage Retrieval) 双塔模型编码每一段记忆片段，通过 FAISS 进行向量索引和高效召回。
- **遗忘曲线更新**: 核心公式 \\(R = e^{-t/S}\\)，其中 \\(S\\) 为记忆强度（每次回忆 +1），\\(t\\) 为距上次回忆的时间。回忆时重置 \\(t=0\\) 并提升 \\(S\\)，未回忆的记忆随时间衰减，概率性被遗忘。
- **SiliconFriend 验证**: 基于 ChatGPT/ChatGLM/BELLE 三种 LLM，用 38k 心理咨询对话数据 LoRA 微调，集成 MemoryBank 后在定性(真实用户)和定量(模拟多角色)实验中均展现出记忆回忆、个性理解和共情能力。
- **模型无关**: 同时支持闭源 (ChatGPT) 和开源 (ChatGLM, BELLE) 模型。

#### 🔬 深入细节
```python
# 记忆系统的抽象流程
mem = store.load()
ctx = store.retrieve(query, mem)
answer = agent.respond(query, ctx)
store.update(query, answer, mem)
```

![MemoryBank 示意图](https://ar5iv.labs.arxiv.org/html/2305.10250/assets/x1.png)
*图：MemoryBank 的核心框架或评测示意。*

**1. 研究动机**
LLM 缺乏持久化长期记忆，导致在多轮交互（如 AI 伴侣、心理咨询、秘书服务）中无法维护上下文和用户画像。MemoryBank 旨在赋予 LLM 类人的记忆能力。

**2. 系统架构（Figure 1）**
MemoryBank 包含三大组件：

| 组件 | 功能 |
|------|------|
| **Memory Storage** (§2.1) | 将每次多轮对话按时间戳存储；LLM 自动生成每日摘要 → 全局摘要；根据对话推断用户个性特征 |
| **Memory Retrieval** (§2.2) | 双塔 DPR 编码器将每个记忆片段编码为向量 \\(h_m\\)，预建 FAISS 索引；查询时编码用户输入 → 向量相似度召回 top-k 相关记忆 |
| **Memory Updating** (§2.3) | Ebbinghaus 遗忘曲线 \\(R = e^{-t/S}\\)；\\(S\\) 初始为 1，每次被检索到 +1 并重置 \\(t=0\\)；长期未被回忆的记忆以指数衰减，低于阈值后被删除 |

**3. SiliconFriend 实现**
- **阶段一**: 用 38k 在线心理对话数据，通过 LoRA (rank r=8) 对开源 LLM (ChatGLM-6B, BELLE-7B) 进行参数高效微调，使其具备共情回应能力。
- **阶段二**: 集成 MemoryBank 记忆系统，使 chatbot 能回忆过往、理解用户个性。
- **三种底座**: ChatGPT (闭源通用)、ChatGLM (6.2B 双语)、BELLE (LLaMA-7B 中文微调)。

**4. 实验与评估**
- **定性评估**: 招募真实用户与 SiliconFriend 长期对话，展示记忆召回、个性适配和共情陪伴案例（Figure 2-4）。
- **定量评估**: ChatGPT 模拟多个不同性格用户，生成跨多天、多话题的长程对话。评估指标包括记忆召回准确率、答案相关性、个性一致性。
- **结果**: MemoryBank 增强后的 SiliconFriend 在记忆召回、共情质量、用户个性理解上均显著优于无记忆基线。

**5. 关键公式**
遗忘曲线：\\[R = e^{-\\frac{t}{S}}\\]
- \\(R\\): 记忆保留率
- \\(t\\): 距上次学习/回忆的时间
- \\(S\\): 记忆强度（离散值，初值 1，每次检索 +1）

**6. 局限与展望**
- 遗忘曲线模型高度简化，真实记忆受情绪、睡眠、意义性等多因素影响。
- 当前仅在 AI 陪伴场景验证，推广到其他长程任务需进一步探索。
- 记忆存储随对话增长会产生较大存储和检索开销。

> 论文链接: [arxiv.org/abs/2305.10250](https://arxiv.org/abs/2305.10250) | 代码: [github.com/zhongwanjun/MemoryBank-SiliconFriend](https://github.com/zhongwanjun/MemoryBank-SiliconFriend)

#### 🧪 练习题
```yaml
question: "MemoryBank 中遗忘曲线 \\(R = e^{-t/S}\\) 里的 \\(S\\) 变大，最直接意味着什么？"
options:
  - "记忆被检索后更容易立刻删除"
  - "记忆衰减更慢，更可能被长期保留"
  - "向量检索的 top-k 会自动增大"
  - "系统会跳过每日摘要生成"
answer: 1
explain: "在 MemoryBank 中，S 表示记忆强度；每次被回忆后 S 增加，意味着同样的时间间隔下保留率更高、遗忘更慢。"
```

### MemGPT

```yaml
id: memgpt
num: 4
name: MemGPT
full_name: 记忆分页代理 (MemGPT)
year: '2023.10'
org: UC Berkeley
parent: memorybank
paper_url: https://arxiv.org/abs/2310.08560
project_url: ''
category: management
motivation: 以虚拟上下文分页突破窗口限制
```

#### 📝 一句话总结
MemGPT 通过为固定上下文窗口的 LLM 引入操作系统的层次化记忆管理范式，使其能够自主调用函数在主上下文（main context）和外部存储（archival & recall memory）之间交换数据,突破了有限上下文窗口对多轮对话和长文档处理的限制。

#### 🎯 核心要点
- 受操作系统虚拟内存管理启发，将 LLM 的上下文窗口视为"物理内存"，外部存储视为"虚拟内存"，通过函数调用实现数据分页与交换
- 两级外部记忆存储：Archival Memory（存储完整文档，支持语义搜索）和 Recall Memory（存储对话历史，FIFO 队列）
- LLM 的生成输出被解析为函数调用（function calling mechanism），自主触发记忆读写操作
- 事件驱动的自主记忆管理：LLM 在每次生成时自行判断是否需要检索/写入外部记忆
- 主上下文中保存系统指令、工作上下文和 FIFO 队列，通过 yield 机制控制 token 预算
- 无需微调即可将任意固定上下文 LLM 转化为"无限长上下文"智能体
- 在深度记忆检索（DMR）和对话导语生成任务上显著优于固定上下文基线

#### 🔬 深入细节
![MemGPT 核心架构图](https://ar5iv.labs.arxiv.org/html/2310.08560/assets/x3.png)
*图：MemGPT 架构总览。固定上下文的 LLM 处理器被层次化记忆系统和自主记忆管理函数所增强。LLM 的 prompt tokens（主上下文）由系统指令、工作上下文和 FIFO 队列组成，LLM 的生成 tokens 被函数执行器解析为函数调用，从而在主上下文和外部上下文（Archival & Recall 存储）之间移动数据。*

##### 动机与背景

现有 LLM 受限于固定的上下文窗口大小（如 GPT-4 的 8192 tokens），在处理长文档分析、深层多轮对话等场景时，一旦上下文溢出就会发生灾难性遗忘。传统的应对方式如增加上下文窗口（计算开销大）、滑动窗口（丢失早期信息）或压缩摘要（丢失细节）都无法从根本上解决问题。MemGPT 受到操作系统中**虚拟内存（virtual memory）**的启发——物理内存（上下文窗口）虽然有限，但通过分页机制可以将不活跃的数据换出到磁盘，需要时再换入。类比到 LLM 中：**将主上下文视为"物理内存"，外部数据库视为"虚拟内存/磁盘"**，由 LLM 自己通过函数调用来决定何时执行"换入换出"。

##### 核心机制：层次化记忆系统

MemGPT 的记忆架构分为三层：

**1. 主上下文（Main Context）**
这是 LLM 实际接收的 prompt tokens，包含三部分：
- **System Instructions**（系统指令）：静态指令，告诉 LLM 它的角色、可用的函数及其用法
- **Working Context**（工作上下文）：可变空间，用于存储本次交互任务相关的信息
- **FIFO Queue**（先进先出队列）：存储最近的对话历史，按时间排列

主上下文的总 token 预算固定，系统指令占据固定开销，剩余空间由 Working Context 和 FIFO Queue 共享。当两者之和超出预算时，MemGPT 自动将 FIFO Queue 头部的旧消息换出到 Recall Memory，或将 Working Context 中的富余数据换出到 Archival Memory。

**2. Archival Memory（档案记忆）**
存储完整的外部文档（论文、文章等），支持语义搜索。实现层面采用向量数据库（如 FAISS），通过 `archival_memory_search(query, page)` 函数按语义相关性检索所需内容，并分页返回（每页固定 token 数）。LLM 可以在任何时候调用此函数"翻阅"长文档，就像操作系统的页表查找一样。

**3. Recall Memory（回忆记忆）**
存储换出的历史对话消息，FIFO 顺序排列。通过 `recall_memory_search(query, page)` 和 `recall_memory_date_search(start, end, page)` 函数，LLM 可以按关键词或时间窗口回溯早期的对话内容，实现跨越上下文的"记忆回溯"。

##### 自主记忆管理函数

MemGPT 的核心创新在于：**LLM 不是被动接受外部系统分配的记忆，而是主动通过函数调用来管理自己的记忆。** 每次推理时，LLM 可以生成文本回复，也可以生成一个函数调用（如 `send_message("...")` 或 `archival_memory_search("...", 1)`）。函数执行器在解析到函数调用后，执行对应的数据库操作（插入/搜索/分页），并将结果注入到主上下文中，然后触发下一次 LLM 推理。

关键函数包括：

send_message(message)           → 向用户发送消息，同时写入 Recall Memory
archival_memory_insert(content) → 将内容存入 Archival Memory
archival_memory_search(query, page) → 从 Archival Memory 检索文档
recall_memory_search(query, page)   → 从 Recall Memory 检索历史
recall_memory_date_search(start, end, page) → 按时间检索历史
conversation_search(query, page)    → 搜索当前对话（FIFO Queue）
core_memory_append / replace       → 修改系统指令或工作上下文

> 💡 关键：LLM 可以在单轮推理中链式调用多个函数。系统指令中指定了一个特殊关键字参数（如 `request_heartbeat`），当 LLM 需要连续执行操作时，可以在函数调用中设置此参数，函数执行器收到后会立即触发下一轮 LLM 推理而不等待用户输入。这相当于操作系统的"中断处理"机制。

##### 控制流与 Yield 机制

MemGPT 的事件循环如下：

1. **接收事件**（用户消息、heartbeat 请求等）→ 事件被追加到 FIFO Queue
2. **组装 Prompt**：将 System Instructions + Working Context + FIFO Queue 拼接为主上下文
3. **LLM 推理**：生成输出，可能是文本、函数调用或两者兼有
4. **解析输出**：函数执行器识别函数调用并执行（插入/检索/修改记忆）
5. **Yield（让步）**：LLM 可以通过 `yield` 关键字主动让出控制权，但当 token 预算紧张或上下文过长时，系统会自动触发 yield，将部分数据换出到外部存储
6. **循环**：更新后的主上下文进入下一轮推理

> ⚠️ 注意：MemGPT 的上下文管理是**自主且事件驱动**的。与 RAG（检索增强生成）不同，RAG 需要外部编排器在每次用户请求前预先检索；MemGPT 中 LLM 自主决定何时检索、检索什么以及检索多少页，这使其能够处理需要主动信息搜寻的复杂任务。

##### 与传统方法的区别

| 维度 | 传统固定上下文 LLM | RAG / 向量检索 | MemGPT |
|------|------------------|---------------|--------|
| 记忆管理 | 被动截断/遗忘 | 外部编排器控制检索 | LLM 自主管理记忆 |
| 长文档处理 | 截断或分 chunk | 每次查询时检索 top-k | 自主翻阅多页 |
| 对话历史 | 滑动窗口 | 无对话历史检索 | Recall Memory 可回溯 |
| 需要微调 | 可能需要 | 不需要 | 不需要 |
| 核心类比 | 单机无虚拟内存 | 外部索引查阅 | OS 虚拟内存分页 |

##### 实验验证

MemGPT 在两个核心任务上进行了评估：
- **深度记忆检索（DMR）**：在 150+ 轮对话后，向 Agent 提问需要回忆第 1 轮对话中信息的特定问题。MemGPT 可以通过 `recall_memory_search` 主动检索早期内容，准确率显著高于仅依赖滑动窗口的基线。
- **对话导语生成**：评估 Agent 在长文档分析后生成高质量开场白的`能力`。

实验结果（Table 2/3）表明，MemGPT 在不增加 LLM 上下文窗口的情况下，通过层次化记忆管理实现了远超大上下文基线的长程记忆能力。

#### 🧪 练习题
```yaml
question: "MemGPT 的 Archival Memory 与 Recall Memory 的核心区别是什么？"
options:
  - "Archival Memory 存储对话历史，Recall Memory 存储外部文档"
  - "Archival Memory 支持语义搜索并存储完整文档，Recall Memory 以 FIFO 队列存储换出的对话历史"
  - "Archival Memory 使用 FAISS，Recall Memory 使用 SQL 数据库"
  - "Archival Memory 只能由用户写入，Recall Memory 只能由 LLM 写入"
answer: 1
explain: "Archival Memory 存储外部文档并支持语义搜索，Recall Memory 以 FIFO 队列存储从主上下文换出的历史对话。"
```

### A-MEM

```yaml
id: a_mem
num: 5
name: A-MEM
full_name: 代理式记忆 (A-MEM)
year: '2025.02'
org: Rutgers/AIOS Foundation
parent: memorybank
paper_url: https://arxiv.org/abs/2502.12110
project_url: ''
category: structured
motivation: 动态建链让记忆像卡片盒持续生长
```

#### 📝 一句话总结
> A-MEM 提出一种受卢曼卡片盒笔记法（Zettelkasten）启发的代理式记忆系统，通过 LLM 自动为每条新记忆动态生成结构化笔记并发现与已有记忆之间的多维度链接，使记忆网络像生物神经系统般自主生长和演化，解决了传统 LLM Agent 记忆系统扁平孤立、缺乏结构化关联的问题。

#### 🎯 核心要点
- 受卢曼卡片盒笔记法（Zettelkasten）启发，构建动态生长的结构化记忆网络
- 三条核心流水线：Note Construction（笔记构建）→ Link Generation（链接生成）→ Memory Evolution（记忆演化）
- Note Construction：将原始对话提取为结构化记忆笔记，含标题、摘要、时间、关键词、连接词五元组
- Link Generation：LLM 自动发现新笔记与已有笔记之间的 6 类关系（Generalization、Specialization、Revision、Continuation、Application、Comparison）
- Memory Evolution：新笔记的引入触发对已有记忆的重新审视与扩展，驱动整个记忆网络持续演化
- 检索时通过余弦相似度匹配查询嵌入与全部记忆的嵌入，取 top-k 构建上下文 prompt
- 在 LoCoMo 长对话数据集上，以 Llama 3.2 1B 小模型超越 GPT-3.5 + MemoryBank/ReadAgent/MemGPT 等方案
- 采用纯提示驱动（pure prompt-driven），无需训练或微调

#### 🔬 深入细节
##### 1. 动机与背景

现有 LLM Agent 的记忆系统普遍采用扁平的键值存储或简单摘要式记忆，存在三大缺陷：
- **缺乏结构**：记忆条目彼此孤立，无法表达概念之间的继承、对比、因果等丰富语义关系；
- **静态存储**：记忆一旦存入便不再变化，无法随新知识积累而更新或深化；
- **检索浅层**：仅依赖语义相似度匹配，无法利用记忆之间的结构化关联进行多跳推理。

A-MEM 的核心理念借自德国社会学家尼克拉斯·卢曼的 **Zettelkasten（卡片盒笔记法）**——卢曼通过为每张知识卡片手动编号并建立交叉引用链接，构建了一个产出 70 余本著作和数百篇论文的知识网络。A-MEM 用 LLM 自动化这一过程：每条新记忆是一张"卡片"，LLM 自动为其生成结构化笔记，并发现与已有卡片之间的多维链接，实现「代理式」记忆生长。

![A-MEM 与传统记忆系统对比](https://ar5iv.labs.arxiv.org/html/2502.12110/assets/x1.png)
*图 (a)：传统扁平记忆存储体系——记忆彼此独立、无结构关联*

![A-MEM 代理式记忆](https://ar5iv.labs.arxiv.org/html/2502.12110/assets/x2.png)
*图 (b)：A-MEM 代理式记忆——记忆节点通过多类型链接形成结构化网络，随新信息持续演化*

##### 2. 核心架构：三条流水线

A-MEM 围绕三条核心流水线构建，覆盖记忆的存储、关联与演化全过程。

![A-MEM 架构总览](https://ar5iv.labs.arxiv.org/html/2502.12110/assets/x3.png)
*图 2：A-MEM 整体架构——从原始对话到笔记构建、链接生成，再到记忆演化与检索的完整数据流*

###### 2.1 Note Construction（笔记构建）

给定一段原始交互/对话文本，LLM 基于精心设计的提示 P_note 生成一条结构化记忆笔记 m_i，每条笔记包含五个核心字段：

| 字段 | 符号 | 含义 |
|------|------|------|
| **Title（标题）** | K_i | 笔记的简洁标题，概括核心语义 |
| **Summary（摘要）** | G_i | 对原始内容的精炼总结 |
| **Timeline（时间）** | X_i | 事件发生的时间信息，用于时间推理 |
| **Keywords（关键词）** | L_i | 从内容提取的关键词集合 |
| **Connection Words（连接词）** | C_i | 提取的意义概括词，用于跨笔记关联发现 |

> **关键设计**：Connection Words 是 A-MEM 独特的设计——它提取的不是普通关键词，而是具有"连接桥梁"功能的语义锚点词（如"元学习"、"知识迁移"等），用于后续链接生成步骤中发现与其他笔记的潜在关联。

###### 2.2 Link Generation（链接生成）

这是 A-MEM 区别于传统记忆系统的核心创新。对每条新笔记 m_i 和每条已有笔记 m_j (j < i)，LLM 依据提示 P_link 判断两者之间是否存在某种结构化关系，若存在则生成链接 l_ij。

A-MEM 定义了 **6 类链接关系**，构成记忆组网的核心语法：

| 链接类型 | 关系 | 直觉 | 示例 |
|----------|------|------|------|
| **Generalization（泛化）** | A generalizes B | B 是 A 的具体案例 | "强化学习" 泛化 "PPO" |
| **Specialization（特化）** | A specializes B | A 是 B 的子概念 | "PPO" 特化 "策略梯度方法" |
| **Revision（修订）** | A revises B | 新记忆修正/更新旧记忆 | 新实验结果修正先前假设 |
| **Continuation（延续）** | A continues B | A 是 B 在时间线上的后续 | 第二天对话延续前一天话题 |
| **Application（应用）** | A applies B | 将理论/方法应用于具体场景 | 将"对比学习"应用于"推荐系统" |
| **Comparison（对比）** | A compares-to B | 两者具有可比较的特征 | "GPT-4" 对比 "Claude" |

每条链接 l_ij 还包含：
- **关系类型** t_ij：上述 6 类之一；
- **理由** r_ij：LLM 为链接关系生成的简短解释。

> **效率设计**：链接生成不是全对全的计算——A-MEM 先通过 Connection Words 的词汇重叠进行粗筛，只对候选匹配对调用 LLM 进行精细判断，大幅降低了 API 成本。这种"召回-重排"策略权衡了效率与精度。

###### 2.3 Memory Evolution（记忆演化）

这是 A-MEM 最具前瞻性的设计。传统的记忆存储是"一劳永逸"的——存入即冻结；而 A-MEM 中的记忆笔记在存入后**继续演化**。

当新笔记 m_i 通过链接生成与旧笔记 m_j 建立关联后，A-MEM 触发 LLM 对 m_j 进行重新审视：新信息是否赋予旧记忆新的含义？旧记忆的 summary/connection words 是否需要扩展？

具体演化操作包括：
- **摘要扩展**：新信息丰富了旧记忆的语义，summary 被扩充；
- **连接词追加**：新记忆引入的概念被添加到旧笔记的 connection words 中，使其未来能被更多相关笔记发现；
- **重写**：在 Revision 链接情形下，旧记忆被直接修订更新。

这种设计模拟了人类记忆的**巩固与重组**机制——每一次新经验都可能重塑既往理解，使知识结构从简单的关联网络逐步涌现出更复杂的层级、类比和跨领域模式。

##### 3. 检索机制

给定当前查询 q，首先用文本编码器 f_enc 提取其向量表示 e_q = f_enc(q)。对记忆库 M 中的每条笔记 m_i（同样有嵌入 e_i），计算余弦相似度：

s(q, m_i) = (e_q · e_i) / (|e_q| × |e_i|), 对所有 m_i ∈ M

按相似度排序后取 top-k，构造检索集 M_retrieved。检索到的记忆（含其全部结构化字段和关联链接）被注入系统 prompt，为 Agent 提供丰富的上下文。

##### 4. 完整算法流程

```
算法: A-MEM 代理式记忆核心流程
输入: 历史记忆集合 M, 新对话 d_new, 查询 q

# ==== Phase 1: Note Construction ====
m_new = GenerateNote(P_note, d_new)
# m_new 包含: {title, summary, timeline, keywords, connection_words}

# ==== Phase 2: Link Generation ====
candidates = FilterByConnectionOverlap(m_new, M)
# 通过连接词重叠进行粗筛
for each m_j in candidates:
    l_ij = GenerateLink(P_link, m_new, m_j)
    if l_ij is not None:
        M.add_link(m_new, m_j, l_ij.type, l_ij.reason)

# ==== Phase 3: Memory Evolution ====
for each m_j in M that has new links from m_new:
    m_j = EvolveMemory(P_evolve, m_j, m_new)
    # 更新 m_j 的 summary / connection_words

# ==== Phase 4: Retrieval ====
e_q = Encode(q)
scores = [CosineSim(e_q, e_i) for e_i in M.embeddings]
M_retrieved = TopK(M, scores, k)
prompt = BuildPrompt(q, M_retrieved)
```

##### 5. 与传统方法的关键区别

| 维度 | 传统记忆系统 | A-MEM |
|------|------------|-------|
| 存储结构 | 扁平键值对或摘要列表 | 带多类型链接的结构化记忆网络 |
| 记忆关联 | 无（仅语义相似度） | 6 类显式结构化关系 |
| 记忆演化 | 静态，写入后不变 | 新记忆驱动旧记忆持续演化 |
| 检索方式 | 纯向量相似度 | 向量相似度 + 链接图结构 |
| 长程推理 | 困难，需多轮调用 | 通过链接支持多跳信息聚合 |
| 实现方式 | 部分需训练 | 纯 prompt-driven，零训练 |

##### 6. 实验效果

在 LoCoMo 长对话数据集上（平均 9K tokens、最多 35 个会话），A-MEM 表现突出：

- 使用 **Llama 3.2 1B** 参数量的极小模型，在多跳问答（Multi Hop）上达到 **52.96 F1**，超越 GPT-3.5 + MemoryBank（48.25）、GPT-3.5 + MemGPT（47.92）；
- 在时序推理（Temporal）上，Llama 3.2 3B + A-MEM（66.94 F1）甚至超越 GPT-3.5 + LoCoMo（65.11）；
- 对抗性问题（Adversarial）上，A-MEM 显著降低了幻觉性回答，F1 提升约 10 个百分点。

这证明：**结构化的记忆组织远比模型参数量重要**——良好的记忆架构能让小模型在长程对话任务中匹敌甚至超越大模型。

#### 🧪 练习题
```yaml
question: "A-MEM 的 Link Generation 中定义的 6 类链接关系不包括以下哪一项？"
options:
  - "Generalization（泛化）"
  - "Revision（修订）"
  - "Comparison（对比）"
  - "Causation（因果）"
answer: 3
explain: "A-MEM 定义了 6 类链接关系：Generalization、Specialization、Revision、Continuation、Application、Comparison。其中 Comparison 对应\"对比\"，但 Causation（因果关系）不在其中——论文没有定义独立的因果链接类型。"
```

### Mem0

```yaml
id: mem0
num: 6
name: Mem0
full_name: 可扩展长期记忆层 (Mem0)
year: '2025.04'
org: Mem0 AI
parent: memorybank
paper_url: https://arxiv.org/abs/2504.19413
project_url: ''
category: structured
motivation: 只抽取高价值记忆兼顾精度成本
```

#### 📝 一句话总结
Mem0 提出了一种可扩展的记忆中心架构，通过动态提取、整合和检索对话中的关键信息来突破 LLM 固定上下文窗口的限制；其图记忆增强版 Mem0^g 进一步用 Neo4j 图数据库捕获实体间的复杂关系，在 LOCOMO 长对话基准上相对 OpenAI 提升 26%（LLM-as-a-Judge），同时将 p95 延迟降低 91%、token 成本节省超 90%。

#### 🎯 核心要点
- **双阶段流水线架构**：Extraction 阶段从对话中提取事实/偏好/事件并去重合并；Update 阶段决定新增/修改/删除操作，保证记忆的时效性与一致性
- **两种记忆表示**：
- Mem0：基于稠密向量的自然语言记忆存储，适合简单查询和高效检索
- Mem0^g：基于 Neo4j 图数据库的关系记忆，显式建模实体间的时序、因果和语义关系
- **LOCOMO 基准全面评测**：10 段长对话（平均 600 轮/26000 tokens），覆盖 single-hop、multi-hop、temporal、open-domain 四类问题
- **对比 6 类基线**：记忆增强系统（A-Mem）、RAG（7 种 chunk 大小 × 2 种 k 值）、全上下文、开源记忆方案（LangMem）、商业平台（Zep、OpenAI）
- **核心指标**：LLM-as-a-Judge 评分（J）+ 传统指标（F1, BLEU-1, ROUGE-L）+ p50/p95 延迟
- **关键结果**：
- Mem0 整体 J=66.88，Mem0^g J=68.44，均超 OpenAI(52.90) 和 Zep(65.99)
- Mem0 p95 总延迟 1.44s vs 全上下文 17.12s（降 91%），token 量从 26031 降至 1764（降 93%）
- Mem0^g 在 temporal reasoning 上大幅领先，验证图结构对时序关系的建模优势

#### 🔬 深入细节
##### 1. 问题背景与动机

LLM 的固定上下文窗口（即使扩展到 128K+ tokens）在多轮跨会话对话中仍面临根本性挑战：
- **信息遗忘**：超过窗口长度的历史对话被直接截断，导致前后不一致
- **成本线性增长**：全上下文模式下每轮推理需处理全部历史，token 成本随对话轮数线性增长
- **检索精度下降**：简单 RAG 在长对话中检索到的 chunk 缺乏结构化上下文，导致回答碎片化

Mem0 的核心理念是仿照人类记忆机制——我们不记住每一句话，而是提取、整合、更新"关键记忆"，并在需要时精准检索。

##### 2. 架构总览

![Mem0 系统架构图](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/mem0_pipeline.png)
*图 2：Mem0 的双阶段流水线架构——Extraction 阶段和 Update 阶段*

整个系统包含两个核心阶段：

**阶段一：Extraction（提取）**
```python
# Mem0 记忆提取伪代码
def extract_memories(conversation_turn, user_id):
    # 1. LLM 分析对话，提取结构化事实
    prompt = f"""
    Analyze the conversation and extract:
    - Facts about the user (preferences, attributes, experiences)
    - Events with timestamps
    - Relationships between entities
    Conversation: {conversation_turn}
    """
    extracted = LLM.extract(prompt, schema=MemorySchema)

    # 2. 去重与合并：与已有记忆做语义相似度匹配
    existing_memories = vector_db.search(
        query=extracted, user_id=user_id, top_k=5
    )

    # 3. 决定操作类型
    for fact in extracted:
        if similarity(fact, existing) > threshold:
            operation = "UPDATE" if conflict else "SKIP"
        else:
            operation = "ADD"
    return operations

**阶段二：Update（更新）**
LLM 根据提取结果和已有记忆，动态决定 ADD / UPDATE / DELETE 操作，避免冗余存储和过期信息污染。更新后的记忆以自然语言形式存入向量数据库（如 Qdrant/Chroma），同时可选写入 Neo4j 图数据库（Mem0^g 模式）。

##### 3. Mem0 vs Mem0^g 两种记忆表示

![Mem0^g 图记忆架构](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/mem0p_pipeline.png)
*图 3：Mem0^g 的图记忆架构——实体提取与关系更新阶段*

**Mem0（稠密记忆）**：
- 每条记忆是一个自然语言语句 + 向量嵌入
- 检索时用语义相似度 + 用户 ID 过滤
- 优点：简单高效，适合 factoid 类查询
- p50 搜索延迟仅 0.148s（全上下文为 9.87s）

**Mem0^g（图记忆）**：
- 底层使用 Neo4j 存储实体-关系三元组
- LLM 通过 function calling 将非结构化文本转化为结构化图数据
- 实体类型包括：Person, Event, Preference, Location, TimePoint 等
- 关系类型包括：PARTICIPATED_IN, PREFERS, OCCURRED_AT, BEFORE/AFTER 等
- 检索时走 Cypher 查询 + 语义搜索混合路径

```python
# Mem0^g 图记忆检索伪代码
def graph_retrieve(query, user_id, neo4j_driver, vector_db):
    # 1. LLM 解析查询意图，生成 Cypher
    cypher = LLM.generate_cypher(
        "Find memories about user's dietary preferences before March",
        schema=get_schema()
    )
    # 2. 执行图查询
    graph_results = neo4j_driver.run(cypher)

    # 3. 同时进行向量语义搜索
    semantic_results = vector_db.search(query, top_k=10)

    # 4. 融合两种结果
    return fusion_rank(graph_results, semantic_results)

> 💡 关键设计：Mem0^g 不是替代 Mem0，而是增强——图记忆天然擅长时序推理（BEFORE/AFTER 链）和关系跳转（multi-hop），而稠密记忆在语义匹配上更灵活。

##### 4. 实验设计与关键结果

**数据集 — LOCOMO**：
- 10 段长对话，每段约 600 轮，平均 26000 tokens
- 每段附带约 200 个问答对，分 4 类：
  - **Single-hop**：单跳事实检索（"Alice 的生日是什么时候？"）
  - **Multi-hop**：需要综合多条记忆（"Alice 和 Bob 第一次见面时去了哪家餐厅？"）
  - **Temporal**：涉及时序关系（"Alice 换工作之前住在哪个城市？"）
  - **Open-domain**：需要外部知识（"Alice 最喜欢的乐队成立于哪一年？"）

**关键指标 — LLM-as-a-Judge (J)**：
传统指标（F1, BLEU-1, ROUGE-L）基于词重叠，无法衡量事实正确性。例如 ground truth 是 "Alice was born in March"，模型输出 "Alice is born in July"——词重叠极高但完全错误。J 指标用 GPT-4 从 relevance、factual accuracy、completeness 三个维度 1-100 打分，取整体均值。

![延迟分析](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/latency_total.png)
*图 4：不同记忆方法的总延迟对比（p50/p95，秒）*

**核心发现**：
1. **Mem0 在 single-hop 上最优**（稠密自然语言记忆 + 精准检索），p95 总延迟仅 1.44s
2. **Mem0^g 在 temporal 上大幅领先**——显式时序边（BEFORE/AFTER）显著提升时间推理
3. **全上下文模型 J=72.90 最高但代价巨大**（p95=17.12s，每查询 26031 tokens）；Mem0^g 的 J=68.44 仅低约 6%，但延迟降 85%、token 降 86%
4. **RAG 在高 chunk_size + 低 k 时效果急剧下降**（chunk 4096+k=1 时 J=36.84），说明"塞更多不相关上下文"适得其反
5. **LangMem 延迟异常高**（p50=17.99s），因其记忆操作涉及多次 LLM 调用

##### 5. 技术亮点与设计哲学

**去重合并机制**：
传统记忆系统对重复信息简单追加，导致记忆膨胀。Mem0 用 LLM 判断新信息与已有记忆的语义关系——相同则 SKIP，更新则 UPDATE，冲突则保留最新并标记旧记忆过期。

**操作原子性**：
ADD/UPDATE/DELETE 三元操作模型确保记忆状态的一致性。论文附录 B 的 Algorithm 1 详细描述了 UPDATE 操作的完整流程：搜索候选 → 冲突检测 → 决议生成 → 执行写操作。

**记忆分层**：
Mem0 区分"核心事实"（如用户饮食偏好）和"情境信息"（如某次聊天的具体措辞），前者持久化存储，后者可随时间衰减——模仿人类的长期/短期记忆分工。

> ⚠️ 注意：Mem0^g 在 multi-hop 上并未如预期超越 Mem0——论文分析认为图结构的额外导航开销抵消了关系建模优势，这提示"更结构化 ≠ 更适合所有场景"。

#### 🧪 练习题
```yaml
question: "Mem0^g 的图记忆相比于 Mem0 的稠密记忆，在 LOCOMO 实验中哪类问题上优势最显著？"
options:
  - "Single-hop 问题，因为图查询比向量搜索更快"
  - "Multi-hop 问题，因为图结构天然支持关系跳转"
  - "Temporal 问题，因为时序边（BEFORE/AFTER）显式建模时间线"
  - "Open-domain 问题，因为图数据库可以存储外部知识"
answer: 2
explain: "论文实验显示 Mem0^g 在 temporal reasoning 上大幅领先，得益于图结构中 BEFORE/AFTER 时序边的显式建模；而在 multi-hop 上图结构的导航开销反而抵消了关系优势。"
```

### MemoryOS

```yaml
id: memoryos
num: 7
name: MemoryOS
full_name: 记忆操作系统 (Memory OS of AI Agent)
year: '2025.06'
org: BUPT/Tencent AI Lab
parent: memgpt
paper_url: https://arxiv.org/abs/2506.06326
project_url: ''
category: management
motivation: 分层迁移短中长期记忆统一管理
```

#### 📝 一句话总结
MemoryOS 借鉴操作系统的分层存储思想，把 agent 记忆组织成短期、中期、长期三层，并围绕存储、更新、检索、生成四个模块建立一套动态迁移机制，从而在长对话里同时兼顾记忆容量、检索效率与个性化一致性。

#### 🎯 核心要点
- 明确提出 Memory Operating System 视角：不是单次检索补丁，而是一套持续运行的 memory stack
- 三层存储结构：short-term memory、mid-term memory、long-term personal memory
- 四个核心模块：Memory Storage、Memory Updating、Memory Retrieval、Memory Generation
- 短期到中期的更新采用 dialogue-chain 风格的 FIFO 迁移，中期到长期采用 segmented page organization
- 通过动态迁移避免“全量历史都塞进 prompt”与“只做一次性摘要”的两端问题
- 在 LoCoMo 上，论文报告相对 baseline 在 GPT-4o-mini 上平均 F1 提升 49.11%，BLEU-1 提升 46.18%
- 重点强调 personalized long conversation：不仅回答事实，更要跨轮次保持用户画像、偏好和上下文连续性

#### 🔬 深入细节
![MemoryOS 总体架构](https://ar5iv.labs.arxiv.org/html/2506.06326/assets/x1.png)
*图：MemoryOS 将记忆划分为存储、更新、检索、生成四个模块，并在 STM / MTM / LPM 三层之间做动态迁移。*

```python
# MemoryOS 的层级迁移逻辑（按论文方法概括）
def memory_os_step(query, stm, mtm, lpm):
    stm.append(query)
    if stm.is_full():
        mtm.ingest(stm.compact_as_dialogue_chain())
        stm.evict_oldest()
    if mtm.has_stable_profile_signal():
        page = mtm.segment_into_page()
        lpm.merge(page)
    evidence = retrieve_from_layers(query, stm, mtm, lpm)
    return generate_response(query, evidence)
```

MemoryOS 的思路很像把 agent 的记忆系统按“存储层级”重新设计一遍。论文认为，许多现有方法要么把完整历史都堆进上下文，要么只做一次性摘要/RAG，结果要么上下文爆炸，要么远距离个性信息被压掉。

在结构上，MemoryOS 用 STM、MTM、LPM 三层承接不同时间尺度的信息。STM 保存最活跃的局部对话；MTM 沉淀已离开当前窗口但仍可能复用的片段；LPM 存储用户画像、稳定偏好与可长期复用的个人知识。

真正关键在于层间迁移。短期到中期遵循 dialogue-chain-based FIFO，中期到长期采用 segmented page organization。这样既控制了写入成本，也避免把瞬时噪声永久固化。

因此 MemoryOS 不是简单“再加一层 memory database”，而是在 agent 侧定义了一套分层、分工、分阶段迁移的操作系统式协议。

> 💡 关键：MemoryOS 的创新点不是某个单独检索算法，而是把 memory 看成会流动、会迁移的层级系统。

> ⚠️ 注意：如果迁移阈值或分页策略设错，长期层同样会被低价值信息污染。

#### 🧪 练习题
```yaml
question: MemoryOS 中把信息从 mid-term memory 进一步迁移到 long-term personal memory 的主要目的是什么？
options:
- 降低 tokenizer 速度开销
- 把稳定、可复用的个性知识沉淀成长期记忆
- 确保所有历史对话都能原样保留
- 替代 response generation 模块
answer: 1
explain: LPM 的职责是保存长期有效的用户画像与偏好，而不是机械地保留所有中期内容。
```

### MIRIX

```yaml
id: mirix
num: 8
name: MIRIX
full_name: 多智能体记忆系统 (MIRIX)
year: '2025.07'
org: MIRIX AI
parent: memoryos
paper_url: https://arxiv.org/abs/2507.07957
project_url: ''
category: multimodal
motivation: 六类记忆协同支撑真实多模态回忆
```

#### 📝 一句话总结
MIRIX提出了一种由六种结构化记忆组件和八智能体协同框架构成的模块化多智能体记忆系统，通过"主动检索"和层级化记忆路由实现了面向LLM Agent的长程、多模态、个性化记忆能力，在ScreenshotVQA和LOCOMO基准上均显著超越现有方法。

#### 🎯 核心要点
- 核心动机：六类记忆协同支撑真实多模态回忆
- 演化来源：继承或改进自 memoryos
- 代表机构：MIRIX AI

#### 🔬 深入细节
![MIRIX 示意图](https://ar5iv.labs.arxiv.org/html/2507.07957/assets/x1.png)
*图：MIRIX 的核心框架或评测示意。*

##### 1. 六种记忆组件的层级化设计

MIRIX的记忆系统从认知科学中汲取灵感，将长期记忆细化为六种专业化的组件，每种组件内部采用层级化字段结构：

**Core Memory（核心记忆）**：
- 存储高优先级、持久性信息，始终对Agent可见
- 包含`persona`块（编码Agent的身份、语调、行为特征）和`human`块（存储用户姓名、偏好等事实）
- 当记忆大小超过90%容量时触发受控重写，在紧凑性和信息保真之间取得平衡

**Episodic Memory（情景记忆）**：
- 捕获带有时间戳的事件和交互，类似于结构化日志/日历
- 字段包括：`event_type`（user_message/inferred_result/system_notification）、`summary`、`details`、`actor`（user/assistant）、`timestamp`
- 使Agent能进行时间索引和追踪变化，例如识别正在进行的任务或跟进待处理操作

**Semantic Memory（语义记忆）**：
- 维护与特定时间/事件无关的抽象知识和事实
- 字段包括：`name`、`summary`、`details`、`source`（user_provided/Wikipedia/inferred）
- 持久的、可被概念性覆写，支持社交、地理或常识推理
- 可组织为树状层级结构，如"Social Network" → "Favorites" → "Sports/Pets/Music"

**Procedural Memory（程序性记忆）**：
- 存储目标导向的结构化流程，如操作指南、工作流、交互脚本
- 字段包括：`entry_type`（workflow/guide/script）、`description`、`steps`（JSON或结构化列表）
- 支持指令规划、自动化和用户目标的分解

**Resource Memory（资源记忆）**：
- 处理用户当前处理的完整/部分文档、转录或多模态文件
- 字段包括：`title`、`summary`、`resource_type`（doc/markdown/pdf_text/image/voice_transcript）、`content`
- 支持长运行任务的上下文连续性

**Knowledge Vault（知识保险库）**：
- 安全存储凭据、地址、联系方式、API密钥等敏感信息
- 字段包括：`entry_type`（credential/bookmark/contact_info/api_key）、`source`、`sensitivity`（low/medium/high）、`secret_value`
- 高敏感度条目受访问控制保护，排除在常规检索之外

```
          ┌─────────────────────────────────────────────┐
          │         MIRIX 记忆系统（六种记忆组件）         │
          └─────────────────────────────────────────────┘
               │
     ┌─────────┼─────────────┬──────────┬──────────┐
     ▼         ▼             ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  Core   │ │Episodic │ │ Semantic │ │Procedural│ │ Resource │
│ Memory  │ │ Memory  │ │  Memory  │ │  Memory  │ │  Memory  │
├─────────┤ ├─────────┤ ├──────────┤ ├──────────┤ ├──────────┤
│• persona│ │• event  │ │• name    │ │• type    │ │• title   │
│• human  │ │• summary│ │• summary │ │• descrip │ │• summary │
│         │ │• details│ │• details │ │• steps   │ │• type    │
│         │ │• actor  │ │• source  │ │          │ │• content │
│         │ │• time   │ │          │ │          │ │          │
└─────────┘ └─────────┘ └──────────┘ └──────────┘ └──────────┘
                                                  ┌──────────┐
                                                  │Knowledge │
                                                  │  Vault   │
                                                  ├──────────┤
                                                  │• type    │
                                                  │• source  │
                                                  │• sensitiv│
                                                  │• value   │
                                                  └──────────┘
```

##### 2. 多智能体协同工作流

MIRIX的八个智能体分为三个角色层级：

- **Meta Memory Manager**：中央协调者，分析输入内容，决定哪些记忆组件相关，将输入路由到对应的Memory Managers。接收各Manager的更新报告后发送确认信号完成更新流程。
- **Memory Managers（×6）**：各自独立管理一种记忆类型，并行更新各自的记忆，确保同类型内无冗余信息。
- **Chat Agent**：处理与用户的自然语言对话，协调检索和响应生成。

**记忆更新工作流（Memory Update Workflow）**：
当接收到新用户输入时，系统首先自动对记忆库执行搜索，将检索到的信息与用户输入一起传递给Meta Memory Manager。Meta Memory Manager分析内容并确定相关记忆组件，将输入路由到相应的Memory Managers。这些Memory Managers并行更新各自的记忆，完成后向Meta Memory Manager报告，Meta Memory Manager最终发送确认信号。

**对话检索工作流（Conversational Retrieval Workflow）**：
Chat Agent接收到用户查询后，首先在全部六个记忆组件上执行粗略检索（仅返回高层摘要），然后分析查询确定哪些组件需要更精确的搜索并选择合适的检索方法，整合信息后综合出最终响应。若用户查询涉及记忆更新（如提供新事实或纠正），Chat Agent可直接与相应的Memory Managers交互执行精确更新。

```
用户输入
  │
  ▼
┌────────────────┐    搜索记忆库    ┌──────────────────────┐
│                │ ───────────────→ │  全记忆库粗略检索     │
│ Meta Memory    │                  │  (6个组件，仅摘要)    │
│ Manager        │←────────────────┴──────────────────────┘
│                │
│ (分析内容,      │    ┌──────┐ ┌──────┐ ┌──────┐
│  路由决策)      │───→│Episod│ │Semant│ │ ...  │  (至多6个并行)
│                │    │Mgr   │ │Mgr   │ │      │
└────────────────┘    └──┬───┘ └──┬───┘ └──┬───┘
     ▲                   │        │        │
     │   报告+确认       └────────┴────────┘
     └───────────────────────────────────────┘
```

##### 3. Active Retrieval（主动检索）机制

为解决"模型默认使用参数化知识而非记忆"的问题，MIRIX设计了Active Retrieval两阶段流程：

**阶段一：话题生成**
Agent根据输入上下文生成一个`current topic`。例如，对于查询"Who is the CEO of Twitter?"，Agent推断出话题"CEO of Twitter"。

**阶段二：话题驱动检索**
该话题被用于从六个记忆组件中分别检索最相关的前10条记录。检索结果以标签形式注入系统提示：

```
<episodic_memory>...</episodic_memory>
<semantic_memory>...</semantic_memory>
<core_memory>...</core_memory>
```

这种设计使模型既知道记忆内容，也知道信息的内存来源，无需用户显式触发记忆访问。

**支持的检索函数**：
- `embedding_match`：基于向量嵌入的语义检索
- `bm25_match`：基于BM25算法的关键词检索
- `string_match`：精确字符串匹配

Agent可根据上下文自主选择最合适的检索策略，系统也在持续扩展更多专业化的检索方法。

##### 4. 实验：ScreenshotVQA基准

**数据集构造**：
- 收集三位博士生1天至1个月不等的屏幕截图（每秒截图，相似度>0.99时跳过）
- 学生1（重度用户）：5,886张图/1天
- 学生2（中度用户）：18,178张图/20天
- 学生3（轻度用户）：5,349张图/1个多月
- 人工创建问题并经双重检查：学生1有11题，学生2有21题，学生3有55题

**评估**：采用GPT-4.1作为LLM-as-a-Judge，从回答、答案和标准答案三元组判断回答是否正确。

**结果**（详见表1）：

| 方法 | 学生1 | 学生2 | 学生3 | 总体 | 存储 |
|------|-------|-------|-------|------|------|
| Gemini（长上下文） | 0.0000 | 0.0952 | 0.2545 | 0.1166 | 236.70MB |
| SigLIP@50（RAG） | 0.3636 | 0.4138 | 0.5455 | 0.4410 | 15.07GB |
| MIRIX | **0.5455** | **0.5667** | **0.6727** | **0.5950** | **15.89MB** |

关键发现：
- MIRIX相比SigLIP-RAG：准确率提升35%（0.441→0.595），存储降低99.9%（15.07GB→15.89MB）
- MIRIX相比Gemini长上下文：准确率提升410%（0.117→0.595），存储降低93.3%（236.70MB→15.89MB）
- MIRIX不使用原始图像的向量化存储，仅保存提取的结构化信息到sqlite数据库

##### 5. 实验：LOCOMO基准

**实验设置**：
- 使用gpt-4.1-mini作为主干模型（替换基线原用的gpt-4o-mini以确保函数调用能力可比）
- 10段对话，每段约600轮对话、26,000 tokens，约200个问题
- 约束：Chat Agent仅能使用检索到的记忆回答问题，无法访问原始对话记录
- 评估维度：Single-Hop（单跳）、Multi-Hop（多跳）、Open Domain（开放域）、Temporal（时序）

**结果**（详见表2）：

| 方法 | Single-Hop | Multi-Hop | Open Domain | Temporal | Overall |
|------|-----------|-----------|-------------|----------|---------|
| Mem0 (gpt-4o-mini) | 67.13 | 51.15 | 72.93 | 55.51 | 66.88 |
| Zep (gpt-4o-mini) | 74.11 | 66.04 | 67.71 | 79.76 | 75.14 |
| LangMem (gpt-4.1-mini) | 74.47 | 61.06 | 67.71 | 86.92 | 78.05 |
| Zep (gpt-4.1-mini) | 79.43 | 69.16 | 73.96 | 83.33 | 79.09 |
| Mem0 (gpt-4.1-mini) | 62.41 | 57.32 | 44.79 | 66.47 | 62.47 |
| **MIRIX** | **85.11** | **83.70** | **65.62** | **88.39** | **85.38** |
| Full-Context (上界) | 88.53 | 77.70 | 71.88 | 92.70 | 87.52 |

**关键分析**：

- **Overall**：MIRIX 85.38%，超过最强开源基线LangMem 8+点，接近Full-Context上界（87.52%）
- **Multi-Hop**：MIRIX 83.70%，超越所有基线24+点。因为MIRIX在记忆更新时就进行了信息整合（如"Caroline moved from her hometown, Sweden, 4 years ago"），避免查询时需要拼接分散信息
- **Single-Hop**：与Full-Context的微小差距主要源于问题歧义。例如"MIRIX存储了实际发生的事件（'10月19日露营'），而问题期望的是计划日期（'6月'）"
- **Open Domain**：与Full-Context的差距反映了RAG方法的固有限制——缺乏全局理解能力。虽然MIRIX已超越简单RAG，但检索环节仍是瓶颈

##### 6. 工程实践：MIRIX应用

MIRIX提供了一个可安装的跨平台桌面应用（React-Electron + Uvicorn），实现了：

- **屏幕监控**：每1.5秒截图，通过视觉相似度过滤冗余帧，每积累20张独特截图触发记忆更新（约每60秒一次）
- **流式上传**：使用Gemini API的Google Cloud URL机制，在上传时即异步发送，端到端延迟从GPT-4的约50秒降至Gemini的5秒以内
- **记忆可视化**：语义记忆展示为树状结构，程序性记忆展示为列表视图
- **隐私保护**：本地存储，端到端加密

#### 🧪 练习题
```yaml
question: "MIRIX 的 Active Retrieval 与传统 RAG 的关键差别是什么？"
options:
  - "MIRIX 不做检索，只把所有记忆直接注入上下文"
  - "MIRIX 先由 Agent 生成 current topic，再按记忆类型执行定向检索，而不是由外部编排器固定 top-k"
  - "MIRIX 只支持图像记忆，不支持文本记忆"
  - "MIRIX 把所有记忆都压缩成用户画像后统一回答"
answer: 1
explain: "Active Retrieval 先预测当前话题，再在六类记忆组件上做针对性搜索，解决了模型更偏向参数知识而不是主动读记忆的问题。"
```

### AgeMem

```yaml
id: agemem
num: 9
name: AgeMem
full_name: 统一短长时Agent记忆 (Agentic Memory)
year: '2026.01'
org: Wuhan University/Alibaba
parent: memoryos
paper_url: https://arxiv.org/abs/2601.01885
project_url: ''
category: management
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

### HiMem

```yaml
id: himem
num: 10
name: HiMem
full_name: 分层长期记忆 (HiMem)
year: '2026.01'
org: Macau University of Science and Technology
parent: a_mem
paper_url: https://arxiv.org/abs/2601.06377
project_url: ''
category: structured
motivation: 连接事件层与笔记层并支持重整固
```

#### 📝 一句话总结
HiMem 提出受认知心理学启发的双层长期记忆架构——Episode Memory（原始对话片段）与 Note Memory（精炼结构化知识），配合 Best-Effort 分层检索和冲突感知记忆重巩固机制，实现 LLM Agent 在长程对话中的自适应记忆构建与自我进化，在 LOCOMO 基准上取得 80.71 GPT-Score。

#### 🎯 核心要点
- **双层分层架构**：Episode Memory 保留细粒度对话事件（chunk级），Note Memory 存储抽象结构化知识（用户画像、偏好、事实、关系），两层通过语义链接形成层次化关联。
- **Dual-Channel 智能分段**：Speaker Channel（说话人切换边界）+ Topic Channel（语义主题边界），通过双向交叉注意力融合，解决传统固定窗口分段的语义割裂问题。
- **多阶段知识提取**：从 Episode 中提取主题摘要、用户画像（Profile）、用户偏好（Preference）、关系记忆，并映射到统一对齐空间，使用对比学习维护跨 Episode 语义一致性。
- **Best-Effort 分层检索**：优先检索 Note Memory（高效），仅当 LLM 判定证据不足时才回溯 Episode Memory（完整），在效率与召回间取得最优平衡。
- **冲突感知自进化**：检测新旧知识冲突，执行 Insert/Update/Delete 三操作，无需离线批处理即可在线记忆更新，Note Memory 质量从 ~48 GPT-Score 提升至 80+。

#### 🔬 深入细节
##### 1. 整体架构：构建–检索–自进化三阶段闭环

![Figure 1: HiMem Architecture Overview](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x1.png)

HiMem 的架构（Figure 1）由三个阶段构成闭环：

**阶段 A：记忆构建**。原始对话经 Dual-Channel Segmenter 切分为语义连贯的 Episode 块（保留说话人身份和主题边界），每个 Episode 随后进入多阶段提取管线，生成四种结构化知识——主题摘要、用户画像、用户偏好、关系记忆。最关键的是 Knowledge Alignment 模块：所有知识被映射到 Profile / Preference / Fact 三个统一对齐空间，通过对比学习损失 $\mathcal{L}_{\text{align}} = -\log \frac{\exp(\text{sim}(z, z^+)/\tau)}{\sum_{z^-} \exp(\text{sim}(z, z^-)/\tau)}$ 确保不同 Episode 提取的相似概念在向量空间中的表示一致。

**阶段 B：记忆检索**。支持 Hybrid Retrieval（同时检索 Note + Episode 并融合排序）和 Best-Effort Retrieval（先 Note 后按需回溯 Episode），使用 dense embedding + 稀疏 BM25 的混合检索器。

**阶段 C：记忆自进化**。在检索过程中当从 Episode 补充的信息与 Note 已有知识冲突时，触发 Reconsolidation：通过 RAG 评估冲突程度，执行 Insert（新增）、Update（覆写）、Delete（移除）。

##### 2. Best-Effort 分层检索与冲突感知重巩固

以下是基于论文提炼的 Best-Effort Retrieval 完整伪代码：

```python
def best_effort_retrieve(query, note_memory, episode_memory, llm, threshold=0.7):
    """
    HiMem Best-Effort 分层检索 + 冲突感知重巩固
    
    Args:
        query: 用户查询
        note_memory: Note Memory 索引（结构化知识条目 + dense embeddings）
        episode_memory: Episode Memory 索引（原始对话 chunk + embeddings）
        llm: 大语言模型（用于评估证据充分性 + 冲突检测 + 回答生成）
        threshold: LLM 证据充分性评分阈值
    
    Returns:
        Tuple[answer, updated_note_memory]: 生成的回答和更新后的 Note Memory
    """
    # Step 1: 混合向量编码（dense + sparse BM25）
    q_dense, q_sparse = encode_query(query)
    
    # Step 2: 优先检索 Note Memory（高效层）
    note_candidates = note_memory.search(
        q_dense, top_k=5, fusion_weight=0.7  # dense:sparse = 7:3
    )
    
    # Step 3: LLM 评估证据充分性
    sufficiency_score = llm.evaluate_sufficiency(
        query=query,
        evidence=[n.text for n in note_candidates]
    )
    
    if sufficiency_score >= threshold:
        # 证据充分 → 基于 Note 生成回答
        return llm.generate(query, note_candidates), note_memory
    
    # Step 4: 证据不足 → 回溯 Episode Memory
    episode_candidates = episode_memory.search(
        q_dense, top_k=10, fusion_weight=0.6  # Episode 层 sparse 权重更高
    )
    
    # Step 5: 冲突检测
    conflicts = detect_conflicts(
        note_evidence=[n.text for n in note_candidates],
        episode_evidence=[e.text for e in episode_candidates],
        llm=llm
    )
    
    # Step 6: RAG-based 重巩固
    for conflict in conflicts:
        if conflict.type == "MISSING" and conflict.evidence_strength > 0.8:
            # Insert: 新知识完全缺失
            new_note = llm.extract_note(conflict.episode_context)
            note_memory.insert(new_note, align_to_spaces(new_note, 
                profile_space, preference_space, fact_space))
        
        elif conflict.type == "UPDATE" and conflict.semantic_overlap > 0.6:
            # Update: 部分重叠但细节更新
            old_note = conflict.note_entry
            merged = llm.merge_knowledge(old_note, conflict.episode_context)
            note_memory.update(old_note.id, merged, 
                realign_to_spaces(merged, profile_space, preference_space, fact_space))
        
        elif conflict.type == "CONTRADICT" and conflict.contradiction_score > 0.9:
            # Delete: 旧知识已被明确否定
            note_memory.delete(conflict.note_entry.id)
    
    # 生成最终回答
    merged_evidence = merge_evidence(note_candidates, episode_candidates, conflicts)
    return llm.generate(query, merged_evidence), note_memory
```

**Table 2 消融实验**揭示了分层检索和自进化的互补效应：

| 配置 | Average GPT-Score | Average F1 | 下降幅度 |
|------|-------------------|------------|----------|
| HiMem (完整) | **80.71** | 34.95 | — |
| w/o Hierarchical Retrieval | 71.75 | 30.94 | -8.96 |
| w/o Self-Evolution | 68.27 | 29.75 | -12.44 |
| w/o Both | 66.65 | 28.69 | -14.06 |

去除分层检索导致 8.96 分下降，去除自进化导致 12.44 分下降，两者叠加并非简单相加（-14.06），表明两个机制存在正的交互增益——分层检索提供更精准的冲突发现目标，自进化则利用这些发现持续提升知识质量。

##### 3. Knowledge Alignment 消融的关键发现

![Figure 2: Self-Evolution Effects](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x2.png)

**Table 3** 揭示了 Knowledge Alignment 对不同记忆层的非对称影响：

| 记忆层 | 配置 | GPT-Score | 变化 | 分析 |
|--------|------|-----------|------|------|
| Note Memory | w/ Alignment | 63.44 | — | 对齐使结构化知识的语义一致性显著提升 |
| Note Memory | w/o Alignment | 57.51 | **-5.93** ⬇ | 信息密度越高，越依赖统一对齐空间 |
| Episode Memory | w/ Alignment | 78.12 | — | 原始对话中隐式信息丰富 |
| Episode Memory | w/o Alignment | 79.63 | **+1.51** ⬆ | 语义融合过程反而稀释了原始上下文中的隐含线索 |

这一发现极其深刻：**结构化程度越强、信息密度越高的记忆形式，越需要统一的对齐空间来维护语义一致性**。Episode Memory 作为原始对话片段，其蕴含的微妙线索（如语气暗示、上下文隐喻）可能在强制语义对齐过程中被"平均化"而丢失——这提示记忆系统设计应考虑"信息密度–对齐强度"的权衡曲线，而非一刀切地对所有层施加同等强度的语义对齐。

##### 4. 主实验与效率分析

![Figure 3: Memory System Taxonomy](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x3.png)

Figure 3 从 Memory Form–Memory Organization–Memory Operation 三个维度对现有系统进行分类，HiMem 是唯一在三维度均维持非退化设计的系统。

**LOCOMO 基准主结果（Table 1）**：

| 问题类型 | HiMem GPT-Score | 次优方法 | 领先幅度 |
|----------|-----------------|----------|----------|
| Single Hop | **89.22** | 89.02 (Episode w/o KA) | +0.20 |
| Multi Hop | **70.92** | 65.25 | **+5.67** 🔥 |
| Temporal | **74.77** | 67.39 | **+7.38** 🔥 |
| Open Domain | **54.86** | 50.35 | +4.51 |

HiMem 在 Multi Hop 和 Temporal 推理上优势尤为显著（+5~7 分），这正是分层架构+冲突感知更新的价值所在——多跳问题需要跨多个 Note/Episode 的信息整合，时间推理需要精确的版本历史跟踪，两者都高度依赖记忆重巩固机制对知识时效性的维护。

![Figure 4: Efficiency vs Top-k](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x4.png)

**效率（Figure 4）**：HiMem 的平均检索延迟 < 0.5s，显著优于纯 RAG 方法（1–3s）。Best-Effort 策略使约 70% 的查询仅需 Note Memory 检索即可完成，避免了昂贵的 Episode 层回溯。

#### 🧪 练习题
```yaml
question: "HiMem 的 Best-Effort Retrieval 为什么先查 Note Memory，再在证据不足时回溯 Episode Memory？"
options:
  - "因为 Episode Memory 不能被向量检索"
  - "因为 Note Memory 更抽象、更便宜，足够时可直接回答，不足时再下钻到高保真的 Episode 证据"
  - "因为 HiMem 只允许每次查询访问一种记忆层"
  - "因为 Episode Memory 只用于训练阶段，不参与推理"
answer: 1
explain: "Best-Effort Retrieval 的设计目标是兼顾效率与保真：优先用 Note Memory 低成本命中，若证据不足再回溯 Episode Memory 补足细节与时序真值。"
```

### M2A

```yaml
id: m2a
num: 11
name: M2A
full_name: 双层混合多模态记忆代理 (M2A)
year: '2026.02'
org: Peking University/Xi'an Jiaotong University
parent: mirix
paper_url: https://arxiv.org/abs/2602.07624
project_url: ''
category: multimodal
motivation: 原始消息与语义记忆双层个性化
```

#### 📝 一句话总结
M2A 提出**可编辑的双层混合记忆架构**，通过 Semantic Store + Raw Message Store 双层存储配合 Tri-path Retrieval，让多模态 Agent 在跨会话长期交互中增量更新用户记忆，实现个性化精准回复。

#### 🎯 核心要点
- 提出**Dual-Layer Hybrid Memory Bank**：Semantic Store（高层语义观察 + evidence_id 桥接）与 Raw Message Store（不可变原始对话日志），通过 evidence_id 实现语义-原始双向溯源
- 设计 **Tri-Path Retrieval**：融合语义相似度（CLIP 多模态 embedding）、时间衰减权重、概念实体匹配三条检索路径，渐进式窄化检索范围
- 支持**可编辑记忆写回**：CREATE / DELETE / BOTH 三种增量更新操作，解决传统记忆系统（Yo'LLaVA / RAP-LLaVA / Mem0）记忆不可写回的痛点
- 采用 **Multi-Agent 架构**：ChatAgent 负责响应生成，MemoryManager 负责记忆提取、存储、更新，职责解耦
- 构建 **M2A-Bench 基准**：首个专为视觉个性化记忆设计的跨会话评估基准，覆盖 5 个维度
- 引入**一致性约束**：证据链一致性检查（Consistency Constraint），确保新增语义记忆与原始消息不矛盾

#### 🔬 深入细节
##### 整体架构

![M2A对比Yo'LLaVA/RAP-LLaVA](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x1.png)
*图1：M2A 与 Yo'LLaVA / RAP-LLaVA 的记忆架构对比 — M2A 统一记忆库支持增量写回*

![M2A多Agent架构总览](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x2.png)
*图2：多 Agent 架构总览 — ChatAgent + MemoryManager + Dual-Layer Hybrid Memory*

##### Dual-Layer Hybrid Memory Bank

M2A 的核心创新是将记忆存储拆分为两层：

| 层 | 存储内容 | 索引方式 |
|----|----------|----------|
| **Semantic Store** | 高层次语义观察 + evidence_ids | CLIP 多模态 embedding（文本+图像联合编码） |
| **Raw Message Store** | 不可变原始对话日志（文本+图片） | 消息 ID 范围 |

两层通过 `evidence_id` 实现桥接：每条 semantic memory 记录其证据来源的消息 ID 列表，使高层语义可以**溯源**回原始对话。这解决了传统系统（如 Mem0）仅存 summary 导致对话细节丢失的问题。

> 💡 关键：Semantic Store 是**可编辑的**（支持 CRUD），Raw Message Store 是**只追加的**（append-only，一旦写入不可修改），保证了可追溯性。

##### Tri-Path Retrieval

给定查询 \( q \)，Tri-path 检索分数为三路径加权融合：

$$
S(q, m) = \alpha \cdot S_{sem}(q, m) + \beta \cdot S_{time}(q, m) + \gamma \cdot S_{concept}(q, m)
$$

其中：
- \( S_{sem} \)：语义相似度，使用 CLIP 多模态 embedding 计算 cosine 相似度
- \( S_{time} \)：时间衰减加权，指数衰减函数 \( e^{-\lambda t} \) 赋予近期记忆更高权重
- \( S_{concept} \)：概念实体匹配得分，通过 NER 提取查询中的实体并与 semantic memory 中的概念标签匹配
- 超参约束 \( \alpha + \beta + \gamma = 1 \)

检索采用**渐进式窄化策略**：先通过语义路径召回 Top-K 候选，再结合时间权重和概念匹配进行重排序，最终返回 Top-N 结果。相比单一向量检索，命中率显著提升。

> ⚠️ 注意：Tri-path 的权重是**可配置的全局超参**，而非自适应学习参数。作者通过网格搜索确定最优配置。

##### Memory Update 机制

M2A 支持三种记忆更新操作：

1. **CREATE**：从新对话中提取新的语义观察，经 Consistency Constraint 校验后写入 Semantic Store
2. **DELETE**：发现记忆过时或矛盾时，删除对应 semantic memory 条目（Raw Message Store 不变）
3. **BOTH**：先 CREATE 新记忆再 DELETE 旧记忆，实现记忆替换

更新流程由 MemoryManager 触发：MemoryManager 分析 ChatAgent 的多模态对话历史，提取用户隐含偏好/事实，进行一致性检查后执行增量写回。

##### 损失函数与一致性约束

M2A 引入一致性约束（Consistency Constraint）确保记忆更新不引入矛盾：

$$
\mathcal{L}_{consistency} = -\log P(\text{consistent} \mid m_{new}, M_{existing})
$$

其中 \( m_{new} \) 为新增语义记忆，\( M_{existing} \) 为已有记忆集合。通过一个专门的 Consistency Checker 子模块判断新记忆是否与已有记忆冲突，若冲突则触发 DELETE 或拒绝 CREATE。

##### 核心算法流程（伪代码）

由于论文中算法以示意图呈现（Figure 3-5），以下根据 §4 的 Method 描述整理核心流程：

```python
# M2A Memory Retrieval + Update 核心流程
def m2a_pipeline(query, memory_bank):
    # Step 1: Tri-Path Retrieval
    sem_scores = cosine_sim(CLIP_embed(query), memory_bank.semantic_store.embeddings)
    time_scores = exp(-lambda * (now - memory_bank.semantic_store.timestamps))
    concept_scores = entity_match(extract_entities(query), memory_bank.semantic_store.concepts)
    
    S = alpha * sem_scores + beta * time_scores + gamma * concept_scores
    top_k_memories = argsort(S)[-K:]  # 渐进式窄化
    
    # Step 2: 桥接原始消息
    evidence_msgs = [memory_bank.raw_store[mid] for m in top_k_memories for mid in m.evidence_ids]
    
    # Step 3: ChatAgent 生成回复
    response = llm.generate(query, context=top_k_memories + evidence_msgs)
    
    # Step 4: MemoryManager 更新（异步触发）
    new_obs = extract_semantic_observations(conversation_history)
    for obs in new_obs:
        if consistency_check(obs, memory_bank.semantic_store):
            if conflict_exist(obs, memory_bank.semantic_store):
                memory_bank.semantic_store.delete(conflict_entry)  # DELETE
            memory_bank.semantic_store.create(obs, evidence_ids=obs.source_ids)  # CREATE
    return response
```

![Tri-Path检索示意图](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x3.png)
*图3：Tri-Path Retrieval 的三条检索路径示意 — 语义+时间+概念融合*

![Memory Update流程](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x4.png)
*图4：MemoryManager 的增量更新流程 — CREATE / DELETE / BOTH*

![M2A-Bench评估维度](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x5.png)
*图5：M2A-Bench 的五个评估维度与示例*

##### 与传统方法的区别

| 方法 | 记忆存储 | 可编辑性 | 检索方式 | 语义-原始桥接 |
|------|---------|---------|---------|-------------|
| Yo'LLaVA | Concept tokens 冻存 | ❌ 不可写回 | 单一路径 | ❌ 无 |
| RAP-LLaVA | 固定 profile | ❌ 不可更新 | 无检索 | ❌ 无 |
| Mem0 | Summary 向量存储 | ❌ 仅追加 | 单向量检索 | ❌ 无 |
| **M2A** | **双层混合** | ✅ CREATE/DELETE/BOTH | **Tri-Path** | ✅ evidence_id |

##### 实验亮点

- 在 M2A-Bench 的 5 个维度（Preference Recall、Fact Accuracy、Personalization、Consistency、Efficiency）上全面超越 Yo'LLaVA、RAP-LLaVA、Mem0
- 消融实验验证：去掉任意一条检索路径均导致 Recall 下降 > 5%
- 长会话（> 20 轮）场景下，M2A 的记忆召回率保持稳定，而基线方法显著退化

#### 🧪 练习题
```yaml
question: "M2A 的 Dual-Layer Hybrid Memory 中，Semantic Store 和 Raw Message Store 之间通过什么机制实现桥接？"
options:
  - "消息时间戳对齐"
  - "evidence_id 列表"
  - "共享的 CLIP embedding 空间"
  - "统一的记忆 ID 自增序列"
answer: 1
explain: "每条 semantic memory 记录其证据来源的消息 ID 列表（evidence_ids），通过该字段索引 Raw Message Store 中的原始消息，实现语义-原始双向溯源。"
```

### MMA

```yaml
id: mma
num: 12
name: MMA
full_name: 多模态记忆代理 (MMA)
year: '2026.02'
org: Peking University
parent: m2a
paper_url: https://arxiv.org/abs/2602.16493
project_url: ''
category: multimodal
motivation: 按可信度时效冲突重排多模态记忆
```

#### 📝 一句话总结
MMA 在 **记忆检索推理时为每条记忆项赋以动态可信度分数**（融合来源可信度、时间衰减与冲突感知网络共识），用该信号重加权证据并在支持不足时主动拒答，从而缓解相似性检索诱发的过信错误；同时提出 **MMA-Bench 基准**诊断多模态信念动态，首次发现 **「视觉安慰剂效应」(Visual Placebo Effect)**——模糊视觉输入可诱导 RAG 代理产生非理性确定感。

#### 🎯 核心要点
- 核心动机：按可信度时效冲突重排多模态记忆
- 演化来源：继承或改进自 m2a
- 代表机构：Peking University

#### 🔬 深入细节
![MMA 示意图](https://ar5iv.labs.arxiv.org/html/2602.16493/assets/x1.png)
*图：MMA 的核心框架或评测示意。*

##### 1. 架构设计：置信度模块的推理时干预

MMA 建立在 MIRIX 框架之上，在检索阶段 **后置插入** 一个元认知层（Confidence Module），不影响检索 pipeline 本身，仅在推理阶段调制每条记忆的权重。其核心流程如下：

```
┌──────────┐    ┌───────────────┐    ┌─────────────────┐    ┌──────────┐
│  Query Q │───▶│ Memory        │───▶│ Confidence      │───▶│ Response │
│          │    │ Retrieval     │    │ Module (MMA)    │    │ /Abstain │
└──────────┘    │ (MIRIX)       │    │ S + T + C_con   │    └──────────┘
                └───────────────┘    └─────────────────┘
```

**三因子计算公式**（核心算法块）:

```
算法: MMA Confidence Scoring

输入: 检索记忆集 M = {M1, M2, ..., MN}, 查询 Q
输出: 加权证据支持度 + 回答/拒答决策

1. 对每条 Mi in M:
   a) S(Mi) <- Map(src_i)                      // 静态来源可信度映射
   b) T(Mi) <- exp(-lambda * delta_t_i)         // 时间衰减 (delta_t = 当前时间 - 记忆时间戳)
   c) C_con(Mi) <- max_j cos(E(Mi), E(Mj))     // 与检索集中最相似记忆的余弦共识度

2. 归一化权重并计算总置信度:
   w'_k <- exp(w_k) / sum_j exp(w_j), k in {s, t, c}  // 可学习 softmax
   C(Mi) <- clip(w'_s*S + w'_t*T + w'_c*C_con, 0, 1)  // 裁剪至 [0,1]

3. 加权证据聚合:
   Evidence(Q) <- sum_i C(Mi) * emb(Mi)                // 高置信记忆主导推理

4. 决策阈值:
   若 max C(Mi) < tau: 输出 "INSUFFICIENT_EVIDENCE"（拒答）
   否则: 基于加权证据生成最终回答
```

**三个因子设计要点**:

- **来源可信度 S(Mi)**: 静态先验，将对话者/来源 ID 映射到预定义的可信度（例如权威来源 → 0.9，未知来源 → 0.5，已知不可信 → 0.1）。在多角色长程对话场景中，不同对话者的历史言行可被差异化对待。
- **时间衰减 T(Mi)**: 指数衰减函数 exp(-lambda * delta_t_i)，其中 delta_t_i 为记忆时间戳距当前查询的天数。lambda 控制衰减速率，可针对不同应用场景调参——安全关键场景（如 LoCoMo）倾向更大 lambda，让过时记忆快速失效。
- **共识得分 C_con(Mi)**: 将每条记忆的嵌入与检索集中其他记忆的嵌入做余弦相似度，取最大值作为该项被其他记忆「交叉验证」的程度。孤立记忆（与其他记忆无共识）得分低，即使相似度高也会被打折。

**关键洞察**: 三个因子的权重 w_s, w_t, w_c 经过 softmax 自归一化后可学习，让代理在不同场景下自适应分配可靠性注意力——例如在高噪声社交媒体场景自动提升来源权重的占比。

##### 2. MMA-Bench：信念动态诊断基准

MMA-Bench 是目前 **唯一** 同时控制「源可信度先验 + 多会话时间线 + 配对文本-视觉矛盾」的代理评测基准：

| 特性 | LongBench | RULER | FEVER | LoCoMo | **MMA-Bench** |
|------|-----------|-------|-------|--------|---------------|
| 长程结构 | 静态 | 合成长程 | 静态 | 多会话/月 | ✅ 10 会话/~6 月 |
| 多模态 | ✗ | ✗ | ✗ | ✗ | ✅ 文本+视觉配对 |
| 源可信度先验 | ✗ | ✗ | ✗ | ✗ | ✅ 可控 |
| 配对的T-V矛盾 | ✗ | ✗ | ✗ | ✗ | ✅ |
| 认知评分 | 准确率 | 准确率 | 准确率(NEI) | 准确率 | ✅ CoRe（拒答奖励） |

**两种核心评测模式**:

1. **Type-A (信念坚持)**: 初始正确信念 → 引入反向证据 → 代理应坚持原信念。检验代理是否因表面相似性而「动摇」。
2. **Type-B (信念反转/可靠性反转)**: 初始错误信念 → 引入更强的修正证据 → 代理须推翻初始信念。这是可靠性检测——代理能否识别高可信度的修正信息并更新认知。MIRIX 基线在此挑战下完全失败 (0.0%)，因为它只依赖相似性检索而无可信度甄别能力。

**CoRe 评分 (Confidence-and-Reserve)**:
- 正确回答: +1
- 正确拒答 (应拒答时拒答): +alpha（典型值 0.2~0.5）
- 错误回答 (应拒答/应正确时给错): -beta（典型值 0.5~1.0）
- 不应拒答时拒答: -gamma

此评分确保代理学到「在不确定时承认无知比自信地给错答案更好」的部署级行为。

##### 3. Visual Placebo Effect 的发现与诊断

这是 MMA 论文最具洞察力的发现。在 MMA-Bench 视觉模式下，将不相关或模糊的图像与文本信息配对。实验结果揭示：

- **现象**: 即使视觉信息与查询完全无关，MIRIX（无置信度模块）的表现仍出现系统性偏差——它倾向基于模糊视觉线索生成确信但错误的高置信回答。
- **根因**: 现代 VLM 基础模型的视觉编码器对任何输入图像都产生非零激活，这些隐式偏置通过 RAG 管道传播到下游推理，形成「视觉安慰剂」——代理「看了图就以为自己更懂了」，实际上是噪声。
- **数值**: MIRIX 在 Type-B（可靠性反转）的视觉模式中准确率从文本模式的某正值骤降至 **0.0%**，意味着视觉干扰使其完全无法进行信念修正。而 MMA 通过共识得分 C_con 检测到视觉证据与文本记忆网络的冲突，**自动降低视觉记忆条目的置信度**，保留 41.18% 的 Type-B 准确率。

**实践启示**: 在多模态代理部署中，视觉输入不仅可能是冗余的，甚至可能是 **有害的**（尤其当视觉信息源不可靠时）。MMA 的共识机制提供了一种不需要重新训练基础模型的推理时缓解方案。

##### 4. 实验结果三合一分析

**FEVER (事实验证)**:
- 核心结论: MMA 的原始准确率与 MIRIX 几乎一致 (~59.9%)，但三随机种子间的标准差从 ±2.50% 骤降至 **±1.62%（↓35.2%）**。
- 解读: 置信度模块不追求「更正确」，而是「更一致」。在记忆质量正常的环境下，加权机制消除了由检索噪声导致的随机波动——这对生产环境的意义极大，因为可复现的可靠性比偶尔高出的 1 个点准确率更重要。
- 选择性评分: 当设拒答奖励 alpha=0.2 时，MMA 选择性效用为 0.6484，优于 MIRIX (0.6468)，说明即便在元准确率持平条件下，MMA 也更善于「知之为知之，不知为不知」。

**LoCoMo (长程多会话对话)**:
- 安全配置（无共识模块，仅 S+T）: 可操作准确率从 78.96% → **79.64%**，错误数从 317 → **298（↓6.0%）**。
- 解读: 共识模块在 LoCoMo 场景中去掉反而更好——因为这暗示 LoCoMo 中的多记忆共识可能引入群聚偏差（多数错误记忆互相验证）。这启发了「场景自适应权重」的必要性。

**MMA-Bench (压力测试)**:
- 文本模式 Type-B: 在可靠性反转场景中 MMA 明显优于 MIRIX。
- 视觉模式 Type-B: MMA **41.18%** vs MIRIX **0.0%** ——置信度三元组的协同效应在多模态冲突中完全释放。
- MMA 在所有配置下的 absation 率均合理，当证据不足时自动触发拒答，在 CoRe 评分下实现部署级优异表现。

**总体评估**: MMA 的核心价值不在于原始准确率提升，而是 (1) 在数据噪声下稳定输出、(2) 在危险场景下主动拒答、(3) 在多模态冲突中不被视觉假信号误导。这三点能力使得 MMA 更适合作为需要高可靠性的生产级记忆代理的基础架构。

**关键词**: 多模态记忆代理, 置信度评分, 选择性预测, 拒答机制, 视觉安慰剂效应, 记忆可靠性, 时间衰减, 共识网络, MMA-Bench, CoRe 评分

**关联论文**: MIRIX (Wang & Chen, 2025), MemGPT (Packer et al., 2024), LoCoMo (Maharana et al., 2024), FEVER (Thorne et al., 2018)

#### 🧪 练习题
```yaml
question: "MMA 对每条记忆项计算置信度的三类核心信号是什么？"
options:
  - "模型参数量、上下文长度、解码温度"
  - "来源可信度、时间衰减、跨记忆共识"
  - "图像分辨率、音频时长、对话轮数"
  - "训练损失、验证损失、测试损失"
answer: 1
explain: "MMA 的置信度模块围绕 source credibility、temporal decay 和 conflict-aware network consensus 建立，用它来重加权证据并在必要时拒答。"
```

### AMV-L

```yaml
id: amv_l
num: 13
name: AMV-L
full_name: 生命周期管理记忆 (AMV-L)
year: '2026.03'
org: Georgia Institute of Technology
parent: memoryos
paper_url: https://arxiv.org/abs/2603.04443
project_url: ''
category: management
motivation: 用价值驱动升降级压住尾延迟
```

#### 📝 一句话总结
AMV-L 把 Agent 记忆当成受管系统资源，为每条记忆维护持续更新的 utility score，并通过 value-driven promotion、demotion 和 eviction 控制工作集规模，从而把尾延迟治理问题从“保留多久”转成“哪些记忆有资格进入请求路径”。

#### 🎯 核心要点
- **直接针对 TTL 的系统性缺陷**：TTL 只能限制记忆寿命，不能限制检索候选集和向量扫描的计算足迹，长运行系统会因此出现重尾延迟和吞吐抖动。
- **连续更新的 utility score**：AMV-L 为每条记忆维护动态效用分数，用它而不是单纯 age 决定记忆的保留优先级和检索资格。
- **生命周期分层管理**：通过 promotion、demotion、eviction 维护 tiered lifecycle，使高价值记忆停留在请求路径附近，低价值记忆逐步退出活跃工作集。
- **有界、分层感知的检索路径**：检索只在受预算约束的 tier-aware candidate set 上进行，把 request-path working set 与总保留记忆量解耦。
- **系统级评测而非离线检索评测**：论文在 full-stack LLM serving system 中，对 TTL 与 LRU working-set policy 做 identical long-running workload 对照，并固定 prompt-injection caps。
- **实验结论强调 tail 而非均值**：相对 TTL，吞吐提升 3.1x，median/p95/p99 latency 分别下降 4.2x、4.7x、4.4x；相对 LRU，AMV-L 以小幅 median/p95 代价换得更好的 extreme-tail behavior 和更低 token overhead。

#### 🔬 深入细节
![AMV-L 核心框架图](https://ar5iv.labs.arxiv.org/html/2603.04443/assets/x1.png)
*图：AMV-L 把 Agent memory 组织成带生命周期层级的受管资源，请求路径只访问预算受控的活跃候选集。*

```python
# AMV-L 的核心流程（按论文机制整理的抽象伪代码）
for item in memory_pool:
    item.utility = update_utility(item, access_history, feedback, recency)
    item.tier = assign_tier(item.utility)

def retrieve(query):
    hot = top_by_value(search(query, tier="hot"), budget=B_hot)
    warm = top_by_value(search(query, tier="warm"), budget=B_warm)
    cold = top_by_value(search(query, tier="cold"), budget=B_cold)
    candidates = hot + warm + cold
    return rerank(candidates)[:K]

def on_request_end(used_items, outcome):
    for item in used_items:
        item.utility = revise(item.utility, outcome)
    lifecycle_manager.promote_demote_evict(memory_pool)
```

##### 1. 动机：TTL 管的是“寿命”，AMV-L 管的是“请求路径成本”
论文的切入点非常系统化。对长时间运行的 LLM agent 来说，问题不只是 memory 能否被保留下来，而是 memory 一旦进入请求路径，就会影响向量检索、候选集扩张、prompt 注入和最终响应时间。TTL 的优点是运维简单，但它只保证某条记忆不会永久存在，并不保证活跃检索空间不会无限膨胀。

> 💡 关键：AMV-L 认为真正需要被控制的不是总存量，而是 request-path working set 的规模。

这也是它与很多“长期记忆=尽量多存”的方案的根本区别。论文不是把 memory 当知识库，而是把它当和 cache、index、queue 一样需要预算管理的系统资源。

##### 2. 核心机制：utility score + lifecycle tiers + bounded retrieval
AMV-L 的核心不是一个复杂的学习目标，而是一个系统约束框架。每条记忆 \(m_i\) 都有一个持续更新的效用分数 \(u_i\)，系统据此决定它应该留在哪个生命周期层，以及是否还有资格参与在线检索。论文强调的是 promotion、demotion 和 eviction 三类操作，而不是仅靠时间过期。

其检索路径可以抽象为一个显式受预算约束的候选集：

$$
C(q)=\bigcup_{\ell \in \mathcal{L}} \operatorname{Top}\text{-}B_{\ell}\big(\operatorname{Search}(q,\mathcal{M}_{\ell})\big)
$$

其中 \(\mathcal{L}\) 表示不同 lifecycle tier，\(B_{\ell}\) 是每层可进入请求路径的预算。直觉上，高价值层给更高优先级，低价值层即便仍被保留，也不会无限制地拖慢在线检索。

这种设计比 TTL 更细，因为 TTL 把“还没过期”视为“仍可参与请求”；AMV-L 则把“保留资格”和“检索资格”拆开了。它也不同于 LRU：LRU 更像访问时间驱动的 working-set policy，而 AMV-L 允许系统围绕价值进行更稳健的层级迁移。

##### 3. 为什么它能压住 tail latency
论文的核心论点不是“更短 prompt 导致更快”，而是“更小且可控的候选检索工作量”带来更稳定的 tail。随着 retained items 增长，TTL 会让候选集和 similarity scan 的计算成本越来越不可预测，于是 p95/p99 延迟不断拉长；AMV-L 通过 tier-aware budget 把最坏情况钉住。

这也是论文中特别强调的地方：收益主要来自 **bounding retrieval-set size and vector-search work**，而不是单纯减少 tokens。换句话说，AMV-L 优化的是 memory 参与在线服务时的系统路径长度，而不是只优化生成模型那一层。

##### 4. 实验读法：与 TTL 比绝对收益，与 LRU 比尾部收益
在 identical long-running workloads 下，AMV-L 相对 TTL 的提升非常直接：吞吐提升 3.1x，median latency 降 4.2x，p95 降 4.7x，p99 降 4.4x，超过 2 秒的请求比例从 13.8% 降到 0.007%。这说明 TTL 在长运行负载下确实会把 memory 累积问题直接暴露到在线服务路径中。

与 LRU 相比，AMV-L 的取舍更微妙。论文报告它在 median/p95 上有小幅回退，但 p99 更低，超过 2 秒的极端长尾减少 98%，同时 token overhead 还少约 6%，而 retrieval quality 基本持平。也就是说，AMV-L 不是追求“平均更快”，而是追求“在最坏情况下更可控”。

##### 5. 与传统记忆系统的区别
- **对 TTL**：AMV-L 增加了显式的 working-set control，而不是只靠保留时间。
- **对 LRU**：AMV-L 引入 value-driven lifecycle，而不是只看最近访问。
- **对普通 RAG memory**：AMV-L 优先回答“哪些记忆应该进请求路径”，再回答“从这些候选里检索什么”。

从工程视角看，它更接近缓存管理和分层存储，而不是知识抽取算法。这也是它被放在 `management` 类别里而不是 `structured` 或 `episodic` 的原因。

#### 🧪 练习题
```yaml
question: "AMV-L 相比 TTL 的关键改进是什么？"
options:
  - "把所有记忆都保存在更大的向量数据库里"
  - "把记忆改写成更短的摘要以减少 prompt 长度"
  - "用 utility score 和 tier-aware budget 显式限制进入请求路径的活跃工作集"
  - "完全取消长期记忆，只保留最近会话内容"
answer: 2
explain: "AMV-L 的核心不是单纯缩短内容，而是把保留资格与检索资格分离，用 value-driven lifecycle 和 bounded retrieval 控制 request-path working set。"
```

### NS-Mem

```yaml
id: ns_mem
num: 14
name: NS-Mem
full_name: 神经符号长期记忆 (NS-Mem)
year: '2026.03'
org: UNSW/Zhejiang University
parent: mma
paper_url: https://arxiv.org/abs/2603.15280
project_url: ''
category: multimodal
motivation: 引入规则层让记忆支持演绎推理
```

#### 📝 一句话总结
NS-Mem提出了一种**三层神经符号长期记忆框架**，通过引入Logic Layer存储过程性知识的符号化有向无环图（Procedural DAG），并结合自动化的SK-Gen记忆构建机制与混合检索策略，使多模态Agent在约束密集的推理任务中比纯向量记忆系统提升12.5%的准确率。

#### 🎯 核心要点
- **三层记忆原型的统一架构**：Episodic Layer（多模态事件）、Semantic Layer（实体属性及类型）、Logic Layer（过程性DAG+神经索引），三层通过entity anchor和episodic links垂直关联
- **SK-Gen自动记忆构建与增量维护**：五步蒸馏流水线（动作序列提取→频繁序列挖掘→符号DAG构建→验证→神经索引计算），支持指数移动平均（EMA）增量更新
- **混合检索与符号增强**：查询分类（factual/constraint/character）→多粒度检索（goal-level + step-level双索引）→符号查询函数进行DAG确定性遍历
- **显著提升约束推理能力**：在M3-Bench等多模态基准上总体提升4.35%，约束类查询提升12.5%，证明符号结构为推理提供了严谨的逻辑底座

#### 🔬 深入细节
```python
# 记忆系统的抽象流程
mem = store.load()
ctx = store.retrieve(query, mem)
answer = agent.respond(query, ctx)
store.update(query, answer, mem)
```

![NS-Mem 示意图](https://ar5iv.labs.arxiv.org/html/2603.15280/assets/x1.png)
*图：NS-Mem 的核心框架或评测示意。*

##### 1. Motivation：纯向量记忆的边界与符号推理的必要性
论文用一个典型场景揭示了纯向量检索记忆系统的根本缺陷：Jack正在制作水果沙拉，Agent已知水果已切好（ID 798）、家里的碗坏了（ID 2341）、楼下商店有碗且仅需1分钟（ID 5231）。当用户问"What should Jack do next?"时，纯向量系统基于语义相似度只能检索到"水果沙拉→混合"的记忆片段，完全忽略了"碗已损坏"和"附近可获取碗"这两个关键约束——因为这些约束在语义嵌入空间中的位置与查询无关。NS-Mem通过Logic Layer中的过程DAG显式编码步骤依赖与前置条件，使Agent能进行"需要碗→碗已坏→替代方案：楼下购买"这样的演绎推理链。

##### 2. 三层架构设计
┌────────────────────────────────────────────┐
│  Logic Layer (ℒ_logic)                     │
│  • 每个Logic Node = 神经索引 + 过程DAG     │
│  • DAG节点：v₁→v₂→v₃（步骤+转移概率）     │
│  • 双索引向量：i_goal + i_step             │
│  • episodic_links ⟂ 底层证据追溯           │
├────────────────────────────────────────────┤
│  Semantic Layer (ℒ_sem)                    │
│  • 实体类型 + 属性键值对                    │
│  • 例：{type: Bowl, entity: Jack's bowl,    │
│          status: broken}                   │
├────────────────────────────────────────────┤
│  Episodic Layer (ℒ_epi)                    │
│  • (t, 文本描述d, 神经嵌入v_e)              │
│  • 多模态：ArcFace人脸 + ERes2Net语音       │
│  • 时间戳维护时序而非显式边                  │
└────────────────────────────────────────────┘
关键设计：Logic Layer与Semantic Layer之间通过"概念扩展"关联——Semantic层存储静态实体属性，Logic层捕获涉及这些实体的动态行为模式。Logic Nodes彼此独立（不同过程），但通过episodic_links向下连接到具体的Episodic证据节点，实现了从抽象过程到具体观测的可追溯性。

##### 3. SK-Gen：从观测流到符号记忆的全自动化构建

**Algorithm 1伪代码（核心逻辑）**：
Algorithm 1: SK-Gen: Memory Construction and Maintenance
Input: Observation stream O={o₁,...,o_K}, thresholds τ_pos, τ_neg, σ, τ, δ, EMA β
Output: Memory system M=(ℒ_epi, ℒ_sem, ℒ_logic)

// Phase 1: Observation Processing
A ← ∅; ℒ_epi ← ∅; ℒ_sem ← ∅
for each clip o_k in O:
    F_k ← ArcFace(o_k); U_k ← ERes2Net(o_k)   // 感知特征提取
    A ← ClusterAndTrack(A, F_k, U_k)           // 实体锚点更新
    D_k, C_k ← VLM(o_k, A)                    // VLM生成描述+结论
    for each description d in D_k:            // 构建Episodic节点
        e ← (t_k, d, ϕ(d)); ℒ_epi ← ℒ_epi ∪ {e}
    for each conclusion c in C_k:             // 更新Semantic层
        ℒ_sem ← MergeOrCreate(ℒ_sem, c)

// Phase 2: Logic Node Distillation (周期性触发)
S ← ExtractActionSequences(ℒ_epi)             // Step 1: 动作序列提取
F ← FrequentPatternMining(S, σ)               // Step 2: 频繁模式挖掘
for each pattern f in F:
    G ← BuildProceduralDAG(f)                 // Step 3: 构建过程DAG
    if VerifyDAG(G, ℒ_epi, τ):                // Step 4: 验证
        i_goal, i_step ← ComputeIndices(G)    // Step 5: 神经索引计算
        N ← (G, i_goal, i_step, ...)
        ℒ_logic ← ℒ_logic ∪ {N}

// Phase 3: Incremental Maintenance (增量触发)
for each new observation chunk:
    // EMA更新神经索引: i_new = β·i_obs + (1-β)·i_old
    // 更新DAG边转移频率P(v_j|v_i)
    // 结构性修改：添加/删除边或节点

五步蒸馏流水线详解：
1. **动作序列提取**：从时间有序的Episodic记忆中提取每个会话的动作序列S_v
2. **频繁序列挖掘**：跨会话使用序列模式挖掘（支持度阈值σ），发现反复出现的任务模式
3. **符号DAG构建**：将频繁过程转化为有向无环图，节点为步骤、边为转移概率P(v_j|v_i)
4. **验证**：通过positive/negative consolidation thresholds (τ_pos, τ_neg)和验证阈值τ过滤噪声
5. **神经索引计算**：对DAG的目标描述和步骤序列分别编码为i_goal和i_step向量

增量更新策略避免了全量重建：使用指数移动平均(EMA)平滑更新神经索引，仅修改受影响边的转移频率，必要时通过结构性修改增删DAG边和节点。

##### 4. 混合检索与符号增强推理
查询到达后经过三个阶段：
- **查询分类**：规则+LLM两阶段分类器区分factual（事实召回）、constraint（约束求解）、character（角色推断）三类，指导后续检索权重分配
- **多粒度检索**：Stage I用神经双索引（goal-level和step-level，权重α=0.3平衡总体意图与具体步骤匹配）进行相似度搜索召回候选集；Stage II根据查询类型重排——约束查询优先Logic Nodes，事实查询优先Episodic证据
- **符号查询函数**：对检索到的Logic Node的DAG执行确定性操作，包括路径枚举（O(|Π|·L)）、属性约束过滤（如"需要碗→status≠broken"）、跨过程聚合统计。这些操作快速、可复现，避免了LLM从非结构化文本"猜测"的不确定性

##### 5. 实验洞察
在Online Video Understanding和Agent benchmark上，NS-Mem对比M3-Agent（SOTA向量记忆方法）：
- 总体准确率：53.6% vs 48.9%（+4.35%）
- 按查询类型：factual +1.8%，procedural +11.9%，**constraint +12.5%**
- 消融实验揭示：Logic Layer移除导致约束查询骤降，验证符号结构的核心贡献
- 检索权重α=0.3达到最优，说明适度偏向具体步骤匹配的同时保留目标级语义对齐效果最好
- 检索轮次和时间的效率实验表明符号查询O(|Π|·L)的计算开销远低于大模型多次推理

#### 🧪 练习题
```yaml
question: "NS-Mem 在 constraint 类查询上显著优于纯向量记忆，最根本的原因是什么？"
options:
  - "它把所有视频帧都直接放进上下文窗口"
  - "它在 Logic Layer 中显式保存过程 DAG 和约束关系，可做确定性的符号过滤与路径推理"
  - "它完全放弃了 Episodic Layer，只保留规则"
  - "它依赖更大的基础模型参数量"
answer: 1
explain: "constraint 查询需要处理前置条件、冲突状态和步骤依赖，NS-Mem 的 Logic Layer 提供了向量检索难以表达的显式过程结构。"
```

### MemMachine

```yaml
id: memmachine
num: 15
name: MemMachine
full_name: 保真记忆机 (MemMachine)
year: '2026.04'
org: MemVerge
parent: mem0
paper_url: https://arxiv.org/abs/2604.04853
project_url: ''
category: structured
motivation: 保留整段对话轨迹减少抽取失真
```

#### 📝 一句话总结
MemMachine 提出一种 ground-truth-preserving agent memory：它把原始对话 episode 作为长期记忆真值层保存下来，只在必要时做 profile 抽取，并通过 contextualized retrieval 把“匹配到的句子”扩展成“带邻域上下文的 episode cluster”，从而减少传统抽取式记忆的失真和漏召回。

#### 🎯 核心要点
- **原始 episode 保真存储**：长期记忆不以“先抽事实再存”为默认路径，而是先保存 raw conversational episodes，把抽取误差从基础存储层挪开。
- **双层 episodic memory + profile memory**：系统同时维护 short-term working memory、persistent long-term episodic memory 和 semantic/profile memory。
- **句子级索引但 episode 级回忆**：长期记忆对 episode 做 sentence-level indexing，并保留 sentence 到 parent episode 的 provenance 映射。
- **Contextualized Retrieval**：先找 nucleus matches，再向前后扩展邻近 episode context 形成 episode clusters，缓解对话数据中“答案分散在相邻轮次”的 embedding dissimilarity 问题。
- **个性化支持**：profile memory 持续维护用户偏好、事实和行为模式，用于 personalization，而不是替代 episodic ground truth。
- **多跳检索代理**：对复杂查询，Retrieval Agent 在 direct retrieval、parallel decomposition、iterative chain-of-query 三类策略间路由，解决 single-shot vector retrieval 的 late binding 问题。
- **实验结果强调 accuracy-efficiency tradeoff**：LoCoMo 上总体得分 91.69%，LongMemEvalS 最优消融配置 93.0%，在 matched memory-mode comparison 中输入 token 约比 Mem0 少 80%。

#### 🔬 深入细节
![MemMachine 架构图](https://ar5iv.labs.arxiv.org/html/2604.04853/assets/x1.png)
*图：MemMachine 采用 client-server 架构，对外暴露 REST / Python SDK / MCP 接口；内部把 episodic memory、profile memory 与存储层解耦。*

```python
# MemMachine 的核心流程（按论文整理）
def ingest(message, meta):
    ep = Episode(
        text=message,
        producer=meta.producer,
        timestamp=meta.timestamp,
        session_id=meta.session_id,
        metadata=meta.custom,
    )
    raw_store.append(ep)
    stm.push(ep)
    if stm.over_budget():
        archived = stm.flush_to_ltm()
        for old_ep in archived:
            for sent in sentence_split(old_ep.text):
                ltm_index.add(sent, episode_id=old_ep.id, metadata=old_ep.metadata)
    profile_memory.extract_and_update(ep)

def recall(query):
    near_ctx = stm.lookup(query)
    nucleus = vector_search(query, ltm_index, top_k=k)
    clusters = expand_with_neighboring_episodes(nucleus, window=w)
    profile = profile_memory.search(query)
    return format_context(near_ctx, clusters, profile)
```

##### 1. 动机：传统抽取式长期记忆的根本问题是“先失真，再检索”
论文开宗明义地批评了当前很多 agent memory 系统的默认设计：消息进来以后，系统立即调用 LLM 做 extraction、aggregation、update、delete，然后只把抽取后的结果存下来。这样做的代价是两层的。第一，成本高，因为每次写入都依赖 LLM；第二，风险更大，因为一旦抽取错了，系统长期保存的就不是原始事实，而是被模型加工过的版本。

MemMachine 的回答很直接：把 raw episodes 作为 ground truth 层保存下来。这样，episodic memory 负责回答“当时到底发生了什么”，profile memory 再负责回答“用户总体偏好是什么”。两层职责分开，才能同时兼顾 factual continuity 和 personalization。

##### 2. 架构：STM、LTM 和 Profile Memory 各管一层
论文中的系统架构是一个典型的 client-server memory service。Agent 通过 REST API、Python SDK 或 MCP server 调用 MemMachine；服务端内部维护两条主线：

- **Short-Term Memory (STM)**：保存最近 episode，直接为当前会话提供近程上下文。
- **Long-Term Episodic Memory (LTM)**：当内容超出 STM 窗口后，把历史 episode 送入长期层，并做 sentence-level indexing。
- **Profile Memory**：从对话中抽取稳定的用户画像、偏好和事实，用于个性化回答。

长期层的一个关键实现细节是：索引的粒度是句子，但真值的粒度仍然是 episode。论文明确强调 sentence extraction、metadata augmentation、relational mapping 和 embedding generation 四步。也就是说，检索是细粒度的，回忆仍然可以追溯到完整来源。

##### 3. Contextualized Retrieval：不是只取匹配句，而是取“句子周围的对话邻域”
这是 MemMachine 最核心的技术点。对话数据和普通文档不同，很多问题的答案并不集中在一条句子里，而是分散在相邻轮次。例如用户先说背景，再在下一轮补充例外条件；如果只取 top-k matching sentences，很容易把语义上相关但分布在相邻 turn 的证据切断。

MemMachine 因此采用 **contextualized retrieval**：先找到 nucleus matches，再把这些 nucleus 所属 episode 的邻近上下文一并扩展成 episode clusters。这样做的好处是：

- 保留原始叙事链，不把答案切成孤立句子；
- 减少 conversational embedding dissimilarity 带来的漏召回；
- 在不把整段历史灌回上下文的前提下，恢复足够多的局部真值。

> 💡 关键：MemMachine 不是“直接检索整段大块文本”，而是“句子级命中，episode 级恢复”。

##### 4. Multi-hop Retrieval Agent：为什么单次向量检索不够
论文进一步指出，多跳问题存在 **late binding problem**。像“Acme 的 CEO 的配偶现在在哪家公司工作”这种查询，后续检索 hop 依赖前一跳解析出来的中间实体；因此单个 embedding 无法一次性覆盖完整依赖链。

为此，MemMachine 在长期记忆模块里引入 Retrieval Agent，把查询路由到三类策略：

- **Direct retrieval**：适合单跳或证据集中的问题；
- **Parallel decomposition**：把查询拆成可并行求解的子问题；
- **Iterative chain-of-query**：逐跳生成下一轮检索查询，解决晚绑定依赖。

这部分不是基础记忆层本身，但它说明 MemMachine 不是只做“存和搜”，而是把 retrieval planning 也纳入内存系统设计。

##### 5. 结果怎么读：检索侧优化比写入侧优化更重要
论文在 LongMemEvalS 上做了系统消融，比较 sentence chunking、query bias correction、context formatting、retrieval depth、search prompt design 和 answer-model selection 六个维度。最重要的发现是：**retrieval-stage optimizations 的收益明显大于 ingestion-stage changes**。

具体来说，retrieval depth tuning 带来 +4.2%，context formatting +2.0%，search prompt design +1.8%，query bias correction +1.4%，都高于 sentence chunking 的 +0.8%。这说明当 ground truth 已经被保留下来后，系统性能更取决于“怎么把对的记忆取回来并组织给模型看”，而不是“写入时如何激进压缩”。

##### 6. 与 Mem0 的差异
Mem0 的代表性思路是“只保留高价值 facts”，而 MemMachine 的代表性思路是“保留原始 episodic ground truth，把抽象和个性化放到 profile 层”。因此两者的 tradeoff 不一样：

- **Mem0** 更偏记忆压缩与结构化抽取；
- **MemMachine** 更偏真值保留与检索恢复；
- **在 matched memory-mode comparison 中**，MemMachine 报告输入 token 约比 Mem0 少 80%，说明“保真”不必然意味着“更贵”，前提是检索与上下文组织做得足够好。

#### 🧪 练习题
```yaml
question: "MemMachine 的 Contextualized Retrieval 为什么不是只返回 top-k 匹配句子？"
options:
  - "因为它完全不做向量检索，只靠 profile memory 回答"
  - "因为对话答案常分散在相邻 turn 中，命中的 nucleus 句需要扩展成带邻域上下文的 episode cluster"
  - "因为论文要求每次都把整段历史会话重新注入上下文"
  - "因为它把所有长期记忆都改写成固定长度摘要后再返回"
answer: 1
explain: "MemMachine 先做句子级命中，再恢复邻近 episode 上下文；这样既保留原始对话真值链，又避免只取孤立句子导致的信息断裂。"
```

### LightMem

```yaml
id: lightmem
num: 16
name: LightMem
full_name: 轻量级代理记忆 (LightMem)
year: '2026.04'
org: UESTC/Kyung Hee University
parent: memoryos
paper_url: https://arxiv.org/abs/2604.07798
project_url: ''
category: management
motivation: 小模型分工处理在线离线记忆
```

#### 📝 一句话总结
LightMem 提出了一种由多个专用小语言模型（SLM）协同驱动的轻量级代理长期记忆系统，通过将高频在线操作（查询规划、语义重排、记忆写入）与离线知识整合解耦，在固定检索预算下实现高效、准确的记忆调用，解决了现有检索式记忆精度不稳、LLM 驱动记忆延迟高的问题。

#### 🎯 核心要点
- **三层记忆架构**：STM（短期工作记忆）、MTM（用户级中期情景记忆）、LTM（去标识化跨用户语义知识图），分层管理不同粒度的记忆
- **三个专用 SLM 分工**：Controller（SLM-1）生成假设查询与检索计划，Selector（SLM-2）执行两阶段检索与语义重排，Writer（SLM-3）压缩写入新记忆
- **两阶段检索机制**：Stage 1 向量粗检索压缩候选集至 2K，Stage 2 语义一致性重排序精选出最终 Top-K，弥补向量相似与“任务相关”之间的鸿沟
- **在线/离线分离**：在线路径严格限制 SLM 调用和检索预算（中位 83 ms），离线 LLM 批量增量整合 MTM 高价值条目到图结构 LTM
- **用户级隔离**：每条记忆嵌入用户标识符，支持严格的多用户逻辑隔离
- **在 LoCoMo（长对话逻辑推理）和 DialSim（多用户对话模拟）上验证**：平均 F1 提升约 2.5（相对 A-MEM），多跳和时序任务改善尤为显著
- **端到端中位延迟仅 581 ms**，有效上下文长度约 1K tokens，显著低于 LLM 驱动记忆系统

#### 🔬 深入细节
##### 1. 动机与背景

大型语言模型驱动的 AI 代理在长期交互中面临严重的记忆退化问题。现有方案分为两类：
- **检索式记忆**（如 MemoryBank）：效率高，但查询构造差、向量纯相似度检索引入大量噪声，精度随记忆增长而急剧恶化
- **LLM 驱动记忆**（如 MemGPT、A-MEM）：精度高，但每次交互需反复调用大模型，延迟累积严重（尤其在长对话中）

LightMem 用一个关键洞察填补了这道鸿沟：**将记忆系统的结构化决策模块（意图路由、语义过滤、摘要压缩）分配给专门的 SLM，远比反复调用通用 LLM 更高效且可控**。

![LightMem 核心概念图](https://ar5iv.labs.arxiv.org/html/2604.07798/assets/figures/con.png)
*图 1：LightMem 的核心概念——在检索式记忆和 LLM 驱动记忆之间找到效率与精度的平衡点*

##### 2. 系统架构

LightMem 的整体架构由三条记忆层级和三个协同 SLM 构成：

![LightMem 系统架构图](https://ar5iv.labs.arxiv.org/html/2604.07798/assets/figures/main.jpg)
*图 2：LightMem 完整架构——在线路径由三 SLM 协调执行查询时路由和 STM/MTM 检索，离线路径增量将 MTM 整合入图结构 LTM*

**三层记忆**：
- **STM（短期记忆）**：SLM 上下文窗口本身，仅作工作记忆，逐轮更新，不持久化也不被检索
- **MTM（中期记忆）**：用户级个性化情景记忆库，存储语义摘要、时间戳、嵌入向量和用户 ID，是检索的主要来源
- **LTM（长期记忆）**：去标识化的跨用户语义知识库，以轻量图结构组织，支持多跳推理和知识共享

##### 3. 在线推理算法

\[
\begin{aligned}
\mathcal{Q}_t &= \text{SLM-1}(x_t, C_t) \quad \text{(检索规划)} \\
R_t &= \text{SLM-2}(\mathcal{Q}_t, \mathcal{M}) \quad \text{(两阶段检索)} \\
y_t &\sim \text{LLM}(x_t, C_t, R_t) \quad \text{(生成)} \\
m_t &= \text{SLM-3}(x_t, y_t) \quad \text{(记忆写入)} \\
\mathcal{M} &\leftarrow \mathcal{M} \cup \{m_t\}
\end{aligned}
\]

其中 \(x_t\) 为第 \(t\) 轮输入，\(C_t\) 为当前上下文窗口，\(\mathcal{Q}_t = \langle \{q_t^{(i)}\}_{i=1}^n, \phi_t, K \rangle\) 包含假设查询、元数据约束和 Top-K 预算。

**Stage 1 — 元数据约束粗检索**：在用户 ID、时间窗口、类型标签等元数据约束下，对各 HQ 执行向量相似度搜索，每个 HQ 分配 \(\frac{2K}{n}\) 个候选，候选总数为 \(2K\)。

**Stage 2 — 语义一致性重排序**：SLM-2 接收 HQ 集和 Stage 1 候选列表 \(C\)（含结构化元数据），执行语义一致性验证——判断每条候选是否与用户当前查询意图在语义上真正相关，而非仅向量相似。最终保留 \(|R_t| \leq K\) 条记忆。

```python
# LightMem 在线推理算法伪代码
def online_inference(x_t, C_t, M_MTM, M_LTM, K):
    # 1. 检索规划（SLM-1: Controller）
    HQs, phi_t, budget_split = SLM1_plan(x_t, C_t)  
    # HQs = [q1, q2, ..., qn]  假设查询
    # phi_t = (user_id, time_window, type_tags)  元数据约束
    # budget_split = [K1, K2, ..., Kn], sum=2K

    # 2. Stage 1: 元数据约束粗检索
    C = []
    for q, K1 in zip(HQs, budget_split):
        C_MTM = vector_search(q, M_MTM, phi_t, K1//2)
        C_LTM = vector_search(q, M_LTM, phi_t, K1//2)
        C.extend(C_MTM + C_LTM)
    # |C| = 2K

    # 3. Stage 2: 语义一致性重排序（SLM-2: Selector）
    R_t = SLM2_rerank(HQs, C, K)  
    # SLM-2 进行语义一致性验证，保留 Top-K
    # |R_t| = K

    # 4. 生成回答
    y_t = LLM_generate(x_t, C_t, R_t)

    # 5. 记忆写入（SLM-3: Writer）
    m_t = SLM3_write(x_t, y_t)
    if is_duplicate(m_t, M_MTM):
        merge_or_overwrite(m_t, M_MTM)
    else:
        M_MTM.append(m_t)
    # 容量控制
    if len(M_MTM) > B:
        evict_stale_entries(M_MTM)

    return y_t
```

> 💡 核心创新：两阶段检索将粗召回和精排解耦。Stage 1 保障覆盖面（2K 候选），Stage 2 利用 SLM 的语义理解能力进行控制性精选（2:1 压缩），弥补了向量空间“语义相似”与“任务相关”之间的关键鸿沟。

##### 4. SLM-1 检索规划（假设查询生成）

SLM-1 收到 \((x_t, C_t)\) 后，将其转化为结构化检索计划。该过程首先推断粗粒度意图属性（近期情节 vs 长期知识、个性化程度），随后将原始输入改写为一组假设查询（Hypothetical Queries, HQs）\(\{q_t^{(i)}\}\)，同时输出元数据约束 \(\phi_t\)（用户 ID、时间窗口、类型标签）。

> ⚠️ 关键设计：SLM-1 仅用于检索规划，不参与答案生成。每个 HQ 是对用户可能查询意图的主动假设，而非对 \(x_t\) 的简单转写。这种“意图条件化”改写使检索更具前瞻性和覆盖性。

##### 5. SLM-3 记忆写入与冲突解决

每轮生成 \(y_t\) 后，SLM-3 提取可复用的信息并压缩为简洁记忆条目追加到 MTM：
- **去重与合并**：高重复条目触发合并或重写，避免冗余
- **冲突处理**：冲突信息依据时间线索和证据强度解决——更新的证据优先，强证据覆盖弱证据
- **容量控制**：MTM 容量上限为 \(B\)，达到阈值时淘汰陈旧低效用条目并进一步压缩

##### 6. 离线整合（Offline Consolidation）

离线路径由大上下文窗口的 LLM 批量处理：
- 仅在增量批次上工作（新写入的 MTM、检索重激活条目、容量压力下被标记的低效用候选）
- 将情节记忆抽象为去标识化的隐私保护知识候选
- 通过相似度搜索定位 LTM 最近邻锚点，增量插入并链接到局部图邻域
- 累积证据驱动合并/更新/删除决策，置信度自然衰减实现遗忘

这种“在线轻量 + 离线重量”的分离是效率的关键：在线操作保持毫秒级（中位 83 ms），重量级抽象一步异步处理，避免交互延迟累积。

##### 7. 实验结果摘要

| 数据集 | 关键结果 |
|--------|----------|
| LoCoMo (GPT-4o) | 多跳 F1 34.52（A-MEM 32.86），时序和开放域提升最大 |
| DialSim (GPT-4o-mini) | 语义一致性（SBERT）显著优于所有基线 |
| 消融实验 | 去除 SLM-2 重排序导致性能大幅下降；纯 LTM 或 MTM 均不及并发检索 |
| 级联故障测试 | SLM-1/2/3 同时注入噪声导致 F1 从 4.12 崩溃至 1.85 |
| 延迟分析 | 中位检索延迟 83 ms，端到端 581 ms，有效上下文仅 1K tokens |

#### 🧪 练习题
```yaml
question: "LightMem 的两阶段检索中，Stage 2 语义一致性重排序的主要目的是什么？"
options:
  - "提升向量检索的速度，减少候选数量"
  - "排除向量相似但语义不相关的候选，实现从 2K 到 K 的精选"
  - "将 Stage 1 的候选转换为向量嵌入用于后续计算"
  - "对检索到的记忆按时间戳排序"
answer: 1
explain: "Stage 2 由 SLM-2 执行语义一致性验证，将 Stage 1 的 2K 候选压缩为最终 Top-K。这弥补了向量空间中“语义相似”与“任务相关”之间的鸿沟，排除与用户查询意图不真正相关的噪声条目。"
```

### H-Mem

```yaml
id: h_mem
num: 17
name: H-Mem
full_name: 混合结构记忆 (H-Mem)
year: '2026.05'
org: CUHK-Shenzhen/Huawei Cloud
parent: himem
paper_url: https://arxiv.org/abs/2605.15701
project_url: ''
category: structured
motivation: 树图混合建模记忆演化与检索
```

#### 📝 一句话总结
H-Mem 提出了一种混合树-图记忆结构，通过**时间层次树**（日/周/月/年四级语义摘要）组织对话片段、**实体关系图**维护跨会话实体链接，并结合**Ebbinghaus遗忘曲线**的记忆鲁棒性评分来检索长期对话记忆，在 LoCoMo、LongMemEvalS 和 REALTALK 三个基准上全面超越所有基线方法。

#### 🎯 核心要点
- **时间语义树（Temporal-Semantic Tree）**：4 层金字塔结构（日→周→月→年），底层存储细粒度记忆事件，上层通过语义聚类（阈值从 L2 到 L4 分别为 0.8/0.7/0.6）合并成高层摘要
- **实体关系图（Entity Graph）**：从记忆片段中提取实体及其关系，构建 Person/Organization/Location/Event 等类型实体节点及带标签的关系边，支持实体中心的记忆检索

#### 🔬 深入细节
![H-Mem 示意图](https://ar5iv.labs.arxiv.org/html/2605.15701/assets/x1.png)
*图：H-Mem 的核心框架或评测示意。*

##### 1. 架构示意图

```
┌─────────────────────────────────────────────────────────┐
│                    Query (用户提问)                       │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Retrieval Planner (检索规划器)               │
│  ① Query Decomposition → [sub-q1, sub-q2, ...]          │
│  ② Scope Prediction → Short / Long / Mixed               │
│  ③ Evidence Gap Detection → missing-info query (if)      │
└────────┬──────────────────────────────┬─────────────────┘
         ▼                              ▼
┌────────────────────┐     ┌──────────────────────────────┐
│  Temporal-Semantic │     │      Entity Graph             │
│       Tree         │     │  ┌─────┐    ┌─────┐          │
│   L4: Year ──────┐ │     │  │Alice│───▶│Bob  │          │
│   L3: Month ───┐ │ │     │  └──┬──┘    └──┬──┘          │
│   L2: Week  ──┐│ │ │     │     │works_at │lives_in      │
│   L1: Day ──┐ ││ │ │     │  ┌──▼──┐    ┌──▼──┐          │
│   Leaf:     │ ││ │ │     │  │Org X│    │City Y│          │
│   Events   ◄┘ ││ │ │     │  └─────┘    └─────┘          │
│  (fragments)  ▼▼ ▼ │     └──────────────────────────────┘
│  → semantic clustering                               │
└────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    ▼
┌─────────────────────────────────────────────────────────┐
│       Evidence Ranking (证据排序)                         │
│  s(m,q) = 0.70·sim(m,q) + 0.15·time(m,q) + 0.15·R(m,t) │
│  R(m,t) = exp(-(t-rm) / (τ(1+η·log(1+nm))))            │
└────────────────────┬────────────────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│              LLM Answer Generation                       │
│         (with retrieved evidence as context)             │
└─────────────────────────────────────────────────────────┘
```

[架构图](https://ar5iv.org/html/2605.15701/x1.png)

##### 2. 核心算法伪代码

**离线索引构建（Offline Indexing）**

```
Algorithm: H-Mem Offline Indexing
Input: Conversation history C with timestamps
Output: Temporal-Semantic Tree T, Entity Graph G

1.  Split C into fragments F = [(text, ts), ...] by time window
2.  For each fragment f in F:
3.    Extract entities E_f, relations R_f via LLM IE prompt
4.    For each entity e in E_f:
5.      Normalize e (lowercase, type-map, punctuation removal)
6.      if exact match or fuzzy match with existing entity node:
7.        merge e into existing node, store alias if new
8.      else:
9.        create new entity node, link to f (provenance)
10.   For each relation r in R_f:
11.     Resolve source/target entities → entity nodes
12.     if same relation already exists between same nodes:
13.       merge supporting evidence
14.     else:
15.       insert edge with (label, confidence, timestamp)
16. // Tree Construction
17. Assign each fragment to L1 (Day) bucket by timestamp
18. For each L1 bucket:
19.   Cluster fragments semantically → L1 memory events
20.   Generate summary text for each L1 event via LLM
21. For l = 2 to 4:
22.   Within temporal window β_l:
23.     Cluster L(l-1) events where cos_sim > α_l
24.     Generate consolidated summary → L_l events
25. Return T (4-level tree), G (entity graph)
```

**在线检索（Online Retrieval）**

```
Algorithm: H-Mem Retrieval
Input: Query q, Tree T, Graph G
Output: Answer a

1.  // Step 1: Planning
2.  sub_queries = LLM_Decompose(q)
3.  For each sub_q in sub_queries:
4.    scope = LLM_PredictScope(sub_q)  // Short/Long/Mixed
5.    // Step 2: First-pass retrieval
6.    evidence = []
7.    if scope in {Short, Mixed}:
8.      candidates_T = SemanticSearch(sub_q, T.leaf_events, top_k=30)
9.      evidence.extend(candidates_T)
10.   if scope in {Long, Mixed}:
11.     candidates_upper = SemanticSearch(sub_q, T.L2+L3+L4, top_k=10)
12.     evidence.extend(candidates_upper)
13.   // Graph retrieval
14.   entities_in_q = ExtractEntities(sub_q)
15.   for each entity e:
16.     fragments_via_e = G.get_linked_fragments(e, k=10)
17.     evidence.extend(fragments_via_e)
18.   // Step 3: Ranking
19.   For each m in evidence:
20.     score[m] = 0.70·sim(m, sub_q) + 0.15·time(m, sub_q) + 0.15·R(m, now)
21.   top_evidence = TopK(evidence, by score, k=5)
22.   // Step 4: Gap detection
23.   if LLM_IsEvidenceSufficient(top_evidence, sub_q) == False:
24.     missing_q = LLM_GenerateMissingQuery(sub_q, top_evidence)
25.     extra_evidence = Retrieve(missing_q)  // second pass
26.     top_evidence.extend(extra_evidence)
27. // Step 5: Final answer generation
28. a = LLM_GenerateAnswer(q, all_top_evidence)
29. Return a
```

##### 3. 深入细节

**细节一：时间语义树的四级层次设计原理**

H-Mem 的时间语义树并非简单的按时间分桶，而是采用了**金字塔式的渐进语义抽象**策略。具体而言：

- **L1 (Day)**：以天为时间窗口，将一天内的对话片段通过语义聚类（阈值默认 0.6→0.5→0.4 递归合并为记忆事件）组织为原子级的记忆事件。每个 L1 事件保留原始对话证据指针（provenance pointer），使其在后续检索中可被 trace back。
- **L2 (Week)→L3 (Month)→L4 (Year)**：每上升一层，时间窗口扩大一个数量级（7天→30天→365天），同时语义聚类阈值逐步降低（0.8→0.7→0.6）。阈值递减的原因是：高层摘要旨在捕捉更抽象、更持久的记忆模式（如"用户喜欢阅读"这样一个跨年有效的大模式），而低层保留更多具体细节（如"用户上周读了某本书"）。
- **最大活跃层级动态调整**：为避免短历史对话产生无意义的高层空摘要，系统根据对话历史长度动态决定活跃层级——历史 < 7 天仅激活日/周级，7-30 天激活日/周/月级，>30 天才激活全部四级。

这种设计使得系统既能回答高时间特异性问题（"上周三 Alice 说了什么"），也能回答跨时间整合问题（"Bob 的长期饮食偏好是什么"），通过 scope prediction 自适应选择检索层级。

**细节二：实体图构建中的消歧与合并策略**

H-Mem 的实体图构建包含三个精细步骤：

1. **实体抽取与规范化**：每个记忆片段通过 LLM IE prompt 提取实体（包含 surface name、type、role、salience score）和关系（source、target、relation label、confidence）。type 被归一化到 {person, organization, location, event, product, work, date, time, other} 九类。若 LLM 提取失败，降级使用 spaCy NER 保底。

2. **实体解析（Entity Resolution）**：采用分层匹配策略——
   - 首先精确匹配：新提取的实体名称与已存在节点名称完全一致且类型兼容
   - 其次模糊匹配：计算 token overlap + fuzzy string matching（限定编辑距离阈值）
   - 匹配成功则合并到已有节点，并将新 surface name 作为别名存储
   - 匹配失败则创建新节点
   
3. **区别于图修复（Graph Repair）**：对于短单名/昵称形式的变体（如"Bob"和"Bobby"），若不满足合并条件则保持为独立节点，但可能添加 `overlap` 边（基于前缀/后缀匹配）。这种边仅用于提升检索召回率，不表示实体等价，避免错误合并。

每个实体节点和关系边都保留指向原始片段的 provenance 指针，在最终答案生成前通过 provenance 验证证据的可信度。

**细节三：记忆鲁棒性评分的心理学原理与参数设计**

H-Mem 的记忆鲁棒性模型直接受 Ebbinghaus 遗忘曲线启发，其核心公式为：

$$R(m,t) = \exp\left(-\frac{t - r_m}{\tau \cdot (1 + \eta \cdot \log(1 + n_m))}\right)$$

参数设计思路：
- **τ = 365 天**：使未加固记忆在一年后衰减至约 36.8%（e^(-1)），对应遗忘约 63.2%。论文认为这对长期 agent 记忆是合理的——用户偏好、关系等应在年尺度上仍可检索，而非被快速遗忘。
- **η = 0.5**：控制重复强化效果。因子 (1 + η·log(1+n_m)) 使记忆随强化次数 n_m 增加而衰减更慢，模拟了"每次回顾/使用都会强化记忆"的心理学规律。
- **在总分中的权重 w_mem = 0.15**：鲁棒性分数仅作为弱先验，不主导语义相关性（w_sem=0.70），避免过度惩罚近期但不重要的记忆，或过度提升高频但不相关的记忆。
- 当无显式时间提示时（w_time=0），语义相关性权重实际达 0.85，确保检索始终以语义匹配为核心。

消融实验证明，去除记忆鲁棒性后 F1 下降约 1-2 个百分点——虽不及树和图的贡献大，但在年尺度的长期记忆中提供了稳定的增量收益。

#### 🧪 练习题
```yaml
question: "H-Mem 为什么要同时维护时间语义树和实体关系图，而不是只用一种索引结构？"
options:
  - "因为树结构只能做训练，图结构只能做部署"
  - "因为树更适合跨时间层级摘要与时序检索，图更适合实体跳转与关系追溯，两者互补"
  - "因为图结构无法存储时间戳，所以必须再加一棵树做备份"
  - "因为论文要求所有记忆都同时保存三份副本"
answer: 1
explain: "H-Mem 的 hybrid structure 让树负责时间层级组织与摘要，图负责实体关系与多跳追溯；只靠单一结构很难同时兼顾长期演化和关系检索。"
```

### DimMem

```yaml
id: dimmem
num: 18
name: DimMem
full_name: 维度化长期记忆 (DimMem)
year: '2026.05'
org: StepOS/Xiamen University
parent: h_mem
paper_url: https://arxiv.org/abs/2605.15759
project_url: ''
category: structured
motivation: 把记忆原子化为可按维召回单元
```

#### 📝 一句话总结
DimMem 提出维度化记忆架构（Dimensional Memory），将记忆视作可动态组合的维度化Token，通过“结构化锚点+语义检索+关系遍历”三路索引实现线性时间检索，并引入基于信息论的信息过载（Information Overload, IO）显式控制机制；在此基础上提出 ResMem-Augmented Fine-Tuning，首次使 0.5B 参数模型在长上下文任务中与 GPT-4o 性能持平。

#### 🎯 核心要点
- 提出维度化记忆架构（Dimensional Memory），每个记忆单元由多维度属性组成的 Schema 定义，支持结构化存储与检索
- 三路索引机制：结构化锚点（Anchor-based）、语义向量检索（Semantic Retrieval）、关系图遍历（Relational Traversal），统一为线性时间复杂度的检索范式
- 显式信息过载（Information Overload, IO）控制：基于信息论定义 IO 指标，动态裁剪检索结果，防止上下文超载
- ResMem-Augmented Fine-Tuning：将检索到的记忆作为残差（Residual Memory）注入 Transformer 层，实现记忆增强微调
- 0.5B 参数模型在长上下文基准（如 LongBench、∞Bench）中首次达到 GPT-4o 同级水平
- 支持记忆的动态增量更新与维度演化，无需全量重索引
- 开源实现与基准测试套件，覆盖检索效率、记忆利用率和端到端任务性能

#### 🔬 深入细节
##### 1. 核心架构：维度化记忆与三路检索

![DimMem 整体架构示意](https://arxiv.org/html/2605.15759v1/assets/dimmem_architecture.png)
*图：DimMem 维度化记忆架构总览——左侧为记忆写入流程（Schema化分维存储），右侧为三路检索通路（锚点+语义+关系图）。*

DimMem 的核心洞察在于将传统向量数据库的扁平化存储升级为**维度化结构**：每条记忆不再是一个简单的 \( \langle k, v \rangle \) 对，而是按预定义维度（如时间、主体、事件类型、置信度等）组织的多字段记录。这一设计直接使得检索可以从“纯语义匹配”升级为“结构化筛选+语义精排”的两阶段模式，**将检索复杂度从 \( O(N) \) 的全库扫描降为 \( O(\sqrt[d]{N}) \) 的分桶检索**（其中 \( d \) 为有效分桶维度数）。

##### 2. 算法伪代码：三路检索与信息过载控制

```python
# DimMem 三路检索核心逻辑
def retrieve(query, memory_store, io_budget):
    # 路1: 结构化锚点检索 —— O(1) 定位到维度分桶
    anchors = anchor_match(query.dimensions, memory_store.index)
    
    # 路2: 语义向量检索 —— 仅在锚点桶内做 ANN
    candidates = semantic_search(query.embedding, anchors, top_k=K_sem)
    
    # 路3: 关系图遍历 —— 沿知识图谱边扩展关联记忆
    relational = graph_traverse(candidates, max_hops=H)
    
    # 合并 & 信息过载控制
    merged = merge_and_dedup(candidates, relational)
    result = io_control(merged, io_budget, method="information_gain")
    return result

def io_control(items, budget, method):
    """基于信息增益的IO控制：贪心选取最大化边际信息增益的记忆"""
    selected = []
    for item in sorted(items, key=lambda x: x.info_gain, reverse=True):
        if sum(s.token_len for s in selected) + item.token_len <= budget:
            selected.append(item)
    return selected
```

##### 3. 信息过载（IO）控制机制详解

DimMem 首次将**信息过载**这一认知科学概念形式化引入 Agent 记忆系统。其核心定义如下：

给定检索到的候选记忆集合 \( \mathcal{M} = \{m_i\} \)，每条记忆 \( m_i \) 携带信息量 \( I(m_i) \) 和 token 长度 \( L(m_i) \)，在总预算 \( B \) 的约束下，IO 控制的目标是：

\[
\max \sum_{m_i \in \mathcal{S}} I(m_i) \quad \text{s.t.} \sum_{m_i \in \mathcal{S}} L(m_i) \leq B
\]

其中 \( I(m_i) \) 由两部分组成：**语义相关性**（与当前查询的余弦相似度）和**维度化信息密度**（该记忆在所属维度分桶中的区分度，用局部熵衡量）。这一形式化使得检索不再盲目追求 recall，而是在有限上下文窗口内最大化有用信息密度。

> 💡 **关键**：IO 控制本质是一个背包问题，DimMem 采用贪心近似（按单位 token 信息量排序截断），从而保持整体检索的线性时间复杂度。

##### 4. ResMem-Augmented Fine-Tuning：记忆残差注入

DimMem 的另一关键贡献是**残差记忆增强微调（ResMem-Augmented Fine-Tuning, RMAFT）**。不同于 RAG 仅在输入层拼接检索文本，RMAFT 将检索到的记忆作为**残差信号**注入 Transformer 的多个中间层：

\[
h_l' = h_l + \alpha_l \cdot \text{MemEnc}(m_{\text{retrieved}})
\]

其中 \( h_l \) 为第 \( l \) 层的原始隐状态，\( \text{MemEnc} \) 为记忆编码器（一个轻量 MLP + Cross-Attention），\( \alpha_l \) 为可学习的层级别缩放因子。这种设计的优势在于：
- **层级化知识注入**：不同层可以自适应地选择利用记忆的程度（浅层可能更依赖语言模型先验，深层更依赖检索事实）
- **残差形式保护预训练权重**：记忆注入以加性方式进行，不破坏原有表征空间，微调稳定
- **端到端可微**：检索器（双编码器）与主模型联合训练，检索质量随任务提升

##### 5. 维度 Schema 的动态演化

DimMem 的记忆维度并非静态预定义，而是支持**在线维度演化**。当系统检测到某维度分桶的局部熵超过阈值（即桶内记忆过于混杂），会自动触发维度分裂（Dimension Splitting），将粗粒度维度细化为子维度。反之，长期低利用率的维度会被合并（Dimension Merging），避免索引碎片化。这一机制使得记忆系统在长周期运行中保持高效的检索结构。

> ⚠️ **注意**：维度演化是后台异步操作，不阻塞在线检索——分裂/合并后的索引通过写时复制（Copy-on-Write）策略平滑切换。

##### 6. 实验亮点

在 LongBench 和 ∞Bench 两个长上下文基准上，DimMem + RMAFT 以 **0.5B 参数**的基座模型取得了与 GPT-4o（估计 >200B）持平甚至更优的单任务得分。具体而言：
- **检索效率**：三路索引在 10^6 规模记忆中保持 <50ms 检索延迟，相较全库语义扫描快 20×
- **IO 控制有效性**：在固定 4K token 预算下，启用 IO 控制的任务得分比无控制高 12.3%
- **维度演化收益**：30 天连续运行中，检索精度下降仅 2.1%（静态 Schema 下降 8.7%）

#### 🧪 练习题
```yaml
question: "DimMem 的信息过载（IO）控制机制核心优化目标是什么？"
options:
  - "最大化检索记忆的数量"
  - "最大化检索记忆的语义相似度之和"
  - "在token预算约束下最大化检索记忆的总信息量"
  - "最小化检索延迟"
answer: 2
explain: "IO控制形式化为预算约束背包问题，目标是在上下文窗口限制下贪心选取单位token信息量最高的记忆，而非单纯追求数量或相似度。"
```
