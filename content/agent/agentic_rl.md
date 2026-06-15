---
domain: agent
topic_id: agentic_rl
topic_name: Agentic RL
page_icon: 🤖
page_title: Agentic RL 技术演进
page_subtitle: '{build_date} 版'
page_desc: 从 WebGPT、SayCan 的交互式反馈原型，到 Reflexion、Voyager 的语言自改进，再到 WebRL、WebAgent-R1、AgentRL、AgentJet 等端到端训练栈，以及 iStar、Agent-RRM、VPR、Q-Evolve
  等奖励与信用分配方法，系统梳理面向 Agent 的强化学习主线与 2026 年最新进展。
hero_pills:
- 🏷️ Agentic RL · Online Feedback · Self-Improvement
- Reward Design · Tool Use · Web Agents · Self-Play
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 交互奠基
    color: '#0F766E'
  self_improve:
    label: 反馈与自进化
    color: '#2563EB'
  online_rl:
    label: 端到端在线RL
    color: '#EA580C'
  reward:
    label: 奖励与信用分配
    color: '#7C3AED'
  frontier:
    label: 系统扩展与前沿
    color: '#DC2626'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/agentic_rl/overview/zhihu__面向LLM_Agent强化学习（Agentic_RL）综述__f14be2f1/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/agent/agentic_rl/latest/zhihu__Agent训练不稳定、奖励太稀疏还缺数据？ICLR_2026六种RL方案让智能体越训越强__52097435/article.md

## 算法演化关系

```yaml
nodes:
- id: webgpt
  x: 80
  y: 80
  category: foundation
- id: saycan
  x: 190
  y: 80
  category: foundation
- id: reflexion
  x: 340
  y: 220
  category: self_improve
- id: voyager
  x: 430
  y: 220
  category: self_improve
- id: werewolf_rl
  x: 520
  y: 80
  category: foundation
- id: agile
  x: 650
  y: 360
  category: online_rl
- id: agent_q
  x: 740
  y: 360
  category: online_rl
- id: webrl
  x: 850
  y: 360
  category: online_rl
- id: webagent_r1
  x: 1000
  y: 360
  category: online_rl
- id: agent_lightning
  x: 1080
  y: 360
  category: online_rl
- id: mua_rl
  x: 1160
  y: 360
  category: online_rl
- id: istar
  x: 1240
  y: 500
  category: reward
- id: agentrl
  x: 1320
  y: 360
  category: online_rl
- id: sage
  x: 1380
  y: 220
  category: self_improve
- id: ssr
  x: 1480
  y: 220
  category: self_improve
- id: dynaweb
  x: 1540
  y: 640
  category: frontier
- id: agent_rrm
  x: 1600
  y: 500
  category: reward
- id: vpr
  x: 1680
  y: 500
  category: reward
- id: agentjet
  x: 1760
  y: 640
  category: frontier
- id: q_evolve
  x: 1840
  y: 640
  category: frontier
edges:
- from: webgpt
  to: reflexion
  label: 语言反馈
- from: saycan
  to: werewolf_rl
  label: LM+RL
- from: reflexion
  to: voyager
  label: 技能记忆
- from: werewolf_rl
  to: agile
  label: 通用化
- from: agile
  to: agent_q
  label: 搜索优化
- from: agent_q
  to: webrl
  label: 在线课程
- from: webrl
  to: webagent_r1
  label: 端到端
- from: agile
  to: agent_lightning
  label: 训练解耦
- from: webagent_r1
  to: mua_rl
  label: 动态用户
- from: agent_lightning
  to: agentrl
  label: 异步多任务
- from: webagent_r1
  to: istar
  label: 步骤奖励
- from: voyager
  to: sage
  label: 技能库RL
- from: sage
  to: ssr
  label: 自博弈
- from: webagent_r1
  to: dynaweb
  label: 世界模型
- from: istar
  to: agent_rrm
  label: 结构反馈
- from: istar
  to: vpr
  label: 可验证奖
- from: agentrl
  to: agentjet
  label: 分布式
- from: istar
  to: q_evolve
  label: 分布内奖
- from: sage
  to: q_evolve
  label: 自进化
milestones:
- webgpt
- webagent_r1
- q_evolve
```

## 核心算法

### WebGPT

```yaml
id: webgpt
num: 1
name: WebGPT
full_name: 网页浏览问答代理 (WebGPT)
year: '2021.12'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2112.09332
project_url: ''
category: foundation
motivation: 把网页交互纳入端到端反馈训练
```

#### 📝 一句话总结
WebGPT 将基于文本的网页浏览器操作（搜索、点击、引用）纳入 GPT-3 微调框架，通过模仿学习和基于人类偏好的强化学习端到端训练，使模型能自主浏览网页并生成有引用支撑的长篇问答，显著优于单纯基于检索的基线方法。

#### 🎯 核心要点
- 基于 GPT-3 微调，赋予模型在简化文本网页环境中执行浏览操作的能力（搜索、点击链接、翻页、引用摘录）
- 构建了基于 Bing Web Search API 的文本化浏览器环境，将 HTML 页面转换为可处理的文本表示
- 4 种核心操作指令：`Search`（搜索查询）、`Click`（点击链接）、`Scroll Up/Down`（翻页）、`Quote`（引用特定文本段落）
- 采用行为克隆 (BC) 预热 + 拒绝采样 (Rejection Sampling) 迭代 + 基于人类偏好的强化学习 (RL with PPO) 的多阶段训练流程
- 引入人类反馈标记：通过模型间对比评测收集偏好数据，训练出与人类偏好对齐的奖励模型 (RM)
- 在 ELI5 (explain-like-I'm-5) 长文本问答和 TruthfulQA 真值问答上显著超越非交互式检索增强方法和无浏览基线
- 生成答案时附带引用出处（citation），增强了答案的可验证性和可信度

#### 🔬 深入细节
![WebGPT 示意图](https://ar5iv.labs.arxiv.org/html/2112.09332/assets/x1.png)
*图：WebGPT 的核心框架或评测示意。*

##### 1. 动机与背景

传统检索增强生成 (RAG) 方法面临的核心问题：搜索和阅读是离线分离的，检索器返回固定数量的文档切片，模型无法主动决定"接下来看什么"。对于需要多步推理、跨文档比对的复杂开放式长文本问答（如 ELI5 数据集），固定的检索结果往往不够充分。

WebGPT 的核心洞见是：**让语言模型像人类一样主动浏览网页**——它可以自行决定搜索关键词、点击哪个链接、阅读哪段文字、何时停止搜索并开始撰写答案。这种将"网页浏览"纳入端到端训练的模式，使得信息获取过程本身变为可优化的一环。

##### 2. 文本化浏览器环境 (Text-Based Browsing Environment)

WebGPT 不与真正的浏览器渲染引擎交互，而是在一个高度简化的**文本化环境**中运作。具体设计如下：

- **搜索引擎**：使用 Microsoft Bing Web Search API，模型执行 `Search(query)` 后返回搜索结果页面（包含标题、URL、摘要）
- **页面加载**：执行 `Click(link_index)` 后，系统抓取对应 URL 的 HTML，通过自定义解析器提取纯文本内容，并保留基本的链接结构（转换为可点击的文本锚点索引）
- **导航操作**：`Scroll Up` / `Scroll Down` 在当前页面内上下滚动阅读
- **信息提取**：`Quote(sentence)` 将当前页面中的特定句子标记为引用来源，在最终答案中展示
- **序列格式**：浏览过程被建模为多轮动作序列 \(a_1, a_2, \ldots, a_T\)，最终以 `Answer` 操作结束

> 💡 关键：文本环境的设计极大简化了策略学习问题——动作空间离散、观察空间是纯文本，可以直接在预训练语言模型框架内处理，无需视觉或多模态组件。

##### 3. 多阶段训练流程

WebGPT 的训练分为三个递进阶段：

**阶段一：行为克隆 (Behavioral Cloning, BC)**

- 使用人类标注者示范的浏览轨迹（搜索→浏览→引用→回答）作为监督信号
- 标注者通过专门开发的浏览界面进行操作，系统记录完整的动作序列
- 模型在人类轨迹上做监督微调，学习基本的搜索-浏览-引用-回答范式
- 损失函数为标准语言模型的自回归交叉熵损失

**阶段二：拒绝采样微调 (Rejection Sampling / Best-of-N Sampling)**

- 用 BC 模型生成多条候选答案（N 条）
- 使用已训练的奖励模型 (RM) 对每条候选答案打分
- 选择得分最高的 k 条轨迹进行进一步微调
- 通过迭代：新模型 → 采样 → RM 评分 → 精选轨迹 → 再训练，逐步提升质量

**阶段三：近端策略优化强化学习 (RL with PPO)**

- 使用 PPO 算法在浏览动作序列上进行策略优化
- **奖励信号来源**：基于人类偏好的奖励模型 (RM)，由模型回答间的对比判断训练而来
- **KL 散度约束**：添加 KL 正则化项，防止 PPO 优化后的策略与 BC 初始化策略偏差过大
- 优化目标可形式化为：
  $$J(\theta) = \mathbb{E}_{a \sim \pi_\theta} \left[ R(a) \right] - \beta \cdot D_{KL}\left( \pi_\theta \| \pi_{\text{BC}} \right)$$
  其中 \(R(a)\) 是 RM 给出的回答质量评分，\(\pi_{\text{BC}}\) 是 BC 阶段的策略，\(\beta\) 控制 KL 惩罚的强度

##### 4. 奖励模型 (Reward Model) 与人类偏好

- 人类标注者观看两个模型生成的答案，指出哪个更好
- 比较维度包括：**事实准确性、信息覆盖度、引用质量、语言流畅度**
- 使用 Bradley-Terry 模型将成对比较转换为标量奖励
- RM 在 BC 模型的判断 token 上做微调：
  $$P(\text{answer A > answer B}) = \frac{e^{r_A}}{e^{r_A} + e^{r_B}}$$

> ⚠️ 注意：WebGPT 的奖励建模方法与 InstructGPT 同期提出，两者共享"用人类偏好训练奖励模型再 RL 优化"的核心范式，但 WebGPT 额外将浏览行为纳入策略空间。

##### 5. 与传统方法的区别

| 维度 | 传统 RAG / REALM | WebGPT |
|------|------------------|--------|
| 检索方式 | 固定轮次检索（一或两次） | 多步自主浏览 |
| 浏览操作 | 无法翻页/点击链接 | 完整浏览操作集 |
| 训练模式 | 检索器和生成器独立训练 | 检索+浏览+生成端到端微调 |
| 反馈优化 | 基于下游任务准确率 | 基于人类偏好 RL |
| 引用来源 | 隐式或后添加 | 浏览中主动引用 |

##### 6. 引用机制 (Citations)

WebGPT 的一个重要设计是**内置引用行为**：模型在浏览过程中通过 `Quote` 操作摘录特定文本句子，回答时标注这些句子的出处。这带来两个关键优势：
1. **可验证性**：读者可以追溯答案中每一句话的来源 URL，判断是否可靠
2. **训练信号增强**：标注者在比较答案时可以评估引用质量，提供了更细粒度的反馈维度

##### 7. 关键实验结果

- **ELI5 数据集**：WebGPT (175B BC + RM + RL) 在人类评估中优于纯 BC 基线 56% vs 39%
- **TruthfulQA**：WebGPT 浏览时找到的信息能有效纠正模型原有错误知识，真答案率大幅提升
- **消融实验证明**：仅 BC 已经显著优于无浏览基线，而 RL 的加入进一步带来 10-20% 的人类偏好提分
- 浏览行为的有效性：模型平均浏览约 20-30 个页面后生成答案，远超传统 5-10 篇文档检索的信息深度

```python
for task in tasks:
    traj = agent.rollout(task, tools)
    reward = evaluate(traj)
    advantage = normalize(reward)
    policy.update(traj, advantage)
```

#### 🧪 练习题
```yaml
question: "WebGPT 中 PPO 强化学习阶段的奖励信号来源是什么？"
options:
  - "生成答案与标准答案的 BLEU/ROUGE 自动评分"
  - "基于人类偏好的奖励模型 (RM) 对回答质量的评分"
  - "搜索结果页面对检索关键词的相关性打分"
  - "模型浏览网页数量的负对数作为稀疏奖励"
answer: 1
explain: "WebGPT 使用基于人类对比判断训练的奖励模型 (RM) 作为奖励信号，而非自动指标或检索得分，这与 InstructGPT 的 RLHF 范式一致。"
```

### SayCan

```yaml
id: saycan
num: 2
name: SayCan
full_name: 语言-可供性接地代理 (SayCan)
year: '2022.04'
org: Google Robotics
parent: —
paper_url: https://arxiv.org/abs/2204.01691
project_url: ''
category: foundation
motivation: 用价值函数约束LLM选可执行技能
```

#### 📝 一句话总结
SayCan 提出将大语言模型（LLM）的语义知识（Say）与预训练技能的可提供性函数（Can）相乘，通过联合概率 \(p(c_{\pi} | i, s, \ell_{\pi}) \propto p(\ell_{\pi} | i) \cdot p(c_{\pi} | s, \ell_{\pi})\) 为机器人提供物理世界接地，使其能够零样本执行长时域、抽象的自然语言指令。

#### 🎯 核心要点
- 提出 SayCan 框架：LLM 提供任务接地（task-grounding），强化学习训练的价值函数提供世界接地（world-grounding），两者联合决定技能选择
- 使用 RL 训练的语言条件价值函数 \(p(c_{\pi} | s, \ell_{\pi})\) 作为可提供性函数，评估技能在当前状态的可行性
- 技能通过 BC-Z（Behavior Cloning from Zero-shot）和 MT-Opt（Multi-Task RL）两种方式训练，其中 MT-Opt 使用稀疏奖励优化
- LLM 以 few-shot prompt 方式工作，通过链式规则将指令分解为技能描述序列
- 在 101 个真实厨房任务上评估，PaLM-SayCan 实现 84% 规划成功率和 74% 执行成功率
- "No VF" 消融实验证明：去除价值函数接地后性能下降近半，验证了物理接地的必要性
- LLM 规模扩展性：模型从 8B→62B→540B 持续提升，且 PaLM 优于 FLAN，首次展示语言模型进步直接转化为机器人性能提升
- 自发涌现 Chain-of-Thought 推理，支持多语言查询和新技能的热插拔式集成

#### 🔬 深入细节
##### 核心框架图

![SayCan 框架示意图](https://saycan-corl.github.io/img/saycan.png)
*图：SayCan 总体框架。LLM（Say）根据指令和历史生成技能描述的条件概率，可提供性函数（Can）评估每个技能在当前环境状态下的可行性，两者相乘得到最终技能排序，选最大值执行。*

> ⚠️ 注意：上述图片链接来自项目官网 say-can.github.io。若无法加载，可访问 [arxiv HTML 版本](https://arxiv.org/html/2204.01691v1) 查看 Figure 1。

##### 算法伪代码

Algorithm 1: SayCan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input: 高层指令 i，初始状态 s₀，技能集合 Π 及其语言描述 ℓ_Π
  n = 0, π = ∅
  while ℓ_{π_{n-1}} ≠ "done":
    𝒞 = ∅
    for π ∈ Π 和 ℓ_π ∈ ℓ_Π:
      p_π^LLM = p(ℓ_π | i, ℓ_{π_{n-1}}, ..., ℓ_{π_0})   ▷ LLM 评分
      p_π^affordance = p(c_π | s_n, ℓ_π)                  ▷ 可提供性评分
      𝒞 ← 𝒞 ∪ {(π, p_π^LLM · p_π^affordance)}            ▷ 联合概率
    π_n = argmax_π 𝒞                                       ▷ 选择最优技能
    执行 π_n，观察新状态 s_{n+1}
    n += 1
  return {π₀, π₁, ..., π_{n-1}}                           ▷ 返回技能序列

##### 方法详解

**1. 动机与背景**

传统 LLM 虽能编码丰富的语义知识，但缺乏真实物理世界经验。当被要求完成"我打翻了饮料，能帮我清理吗？"这样的指令时，LLM 可能建议"用吸尘器清理"——这在厨房场景中既不可行（没有吸尘器）也不安全（吸尘器不能吸水）。SayCan 的核心洞见是：用机器人预训练技能的可提供性函数作为"物理过滤器"，约束 LLM 只能选择当前环境下能执行的动作，从而实现接地。

**2. 核心机制：联合概率分解**

SayCan 将技能选择建模为条件概率的乘积：

$$p(c_{\pi} | i, s, \ell_{\pi}) \propto \underbrace{p(\ell_{\pi} | i)}_{\text{Say: LLM任务接地}} \cdot \underbrace{p(c_{\pi} | s, \ell_{\pi})}_{\text{Can: 价值函数世界接地}}$$

- **Say 项** \(p(\ell_{\pi} | i)\)：LLM 根据高层指令 \(i\) 和已执行技能历史，计算每个技能描述 \(\ell_{\pi}\) 的条件概率。实际操作中，通过构造 few-shot prompt 并取 softmax 归一化后的 token 级概率得到。
- **Can 项** \(p(c_{\pi} | s, \ell_{\pi})\)：RL 训练的价值函数预估技能在当前状态 \(s\) 下的成功率。具体地，对技能 \(\pi\) 和语言描述 \(\ell_{\pi}\)，价值函数 \(Q(s, a)\) 通过 Monte-Carlo 回报训练后，经过温度参数 \(\tau\) 的 sigmoid 变换得到：\(p(c_{\pi} | s, \ell_{\pi}) = \sigma(Q(s, a)/\tau)\)。

> 💡 关键：这个分解将"该做什么"（LLM 语义知识）和"能做什么"（机器人能力）解耦，使系统在每一步都同时考虑任务进展和物理可行性。

**3. 技能训练：BC-Z 与 MT-Opt**

论文使用两种方式训练原子技能：

- **BC-Z（Behavior Cloning from Zero-shot）**：在大规模演示数据集上训练条件行为克隆策略。以语言指令为条件，直接预测低维动作（末端位姿、夹爪开合等）。优势是训练稳定，适合有丰富演示数据的技能。
- **MT-Opt（Multi-Task RL）**：在仿真器中使用稀疏奖励进行多任务 RL 训练。通过 hindsight experience replay 和分布式训练，从零开始学习长期行为。MT-Opt 专门用于训练高精度操作技能（如抓取、放置），其 Q 函数直接作为可提供性函数使用。

> 每个技能的语言描述 \(\ell_{\pi}\) 即是训练时使用的自然语言指令，确保 LLM 概率空间与价值函数空间的语义对齐。

**4. 实验设计与关键结果**

在真实厨房场景中评估 101 个任务，划分为 7 个指令家族：

| 指令家族 | 数量 | 描述 | PaLM-SayCan 规划/执行 |
|---------|------|------|---------------------|
| NL Single Primitive | 15 | 单个原语的自然语言指令 | 100% / 100% |
| NL Nouns | 15 | 名词变体测试 | 67% / 47% |
| NL Verbs | 15 | 动词变体测试 | 100% / 93% |
| Structured | 15 | 结构化指令 | 93% / 87% |
| Embodiment | 11 | 体现约束测试 | 64% / 55% |
| Crowd Sourced | 15 | 众包指令 | 87% / 87% |
| Long-Horizon | 15 | 长时域多步任务 | 73% / 47% |

- **消融实验**：去除价值函数（No VF）后性能大幅下降，验证了物理接地的必要性；生成式 LLM 方案（Generative）性能显著低于 SayCan 的判别式评分方案。
- **LLM 规模扩展**：PaLM 540B 的规划成功率 84% vs FLAN 137B 的 70%，首次证明语言模型进步能直接转化为机器人性能提升——"robotics can ride on the coattails of NLP advances"。

**5. 涌现能力**

- **Chain-of-Thought 推理**：对复杂指令（如"带一瓶无水果味的饮料给我"），PaLM-SayCan 自发在技能序列中插入推理步骤（如"我需要一个不含水果的饮料，所以我应该选择可乐"），再转化为技能执行。
- **多语言支持**：用户以西班牙语或法语发出指令，系统同样能正确理解和执行，因为 LLM 的多语言编码能力自然传递到技能选择中。
- **热插拔式技能集成**：添加"拉抽屉"等新技能只需在 prompt 中增加新技能描述和对应的 value function，无需重新训练。

#### 🧪 练习题
```yaml
question: "SayCan框架中，'Can'（可提供性函数）的主要作用是什么？"
options:
  - "生成新的技能描述文本"
  - "评估每个技能在当前物理环境中的可行性，过滤LLM可能产生的不安全或不可行建议"
  - "提高LLM的文本生成速度"
  - "替代人工标注训练数据"
answer: 1
explain: "Can 通过 RL 训练的价值函数计算技能在当前状态下的成功概率，作为物理世界接地信号，过滤掉 LLM 可能建议但机器人无法执行的动作（如没有吸尘器时建议'用吸尘器清理'）。"
```

### Reflexion

```yaml
id: reflexion
num: 3
name: Reflexion
full_name: 反思式语言强化 (Reflexion)
year: '2023.03'
org: Princeton/Northeastern
parent: webgpt
paper_url: https://arxiv.org/abs/2303.11366
project_url: ''
category: self_improve
motivation: 把失败反馈转成可复用语言记忆
```

#### 📝 一句话总结
Reflexion 是一种不更新模型参数、仅通过**自然语言反思文本**将失败经验注入后续推理上下文的强化学习框架：Agent 行动失败后，LLM 自动生成"自我反思"并存入记忆，下一轮迭代时作为语义提示引导更优决策，由此在 AlfWorld、HotPotQA、HumanEval 等任务上实现显著的累积改进。

#### 🎯 核心要点
- **语言化强化（Verbal RL）**：不修改梯度或权重，把 RL 中的"奖励信号"转化为自然语言的"反思文本"，让 LLM 在语义层面自我纠偏。
- **三组件闭环**：Actor（大模型做出决策动作）→ Evaluator（环境或启发式评估给出二值/等级奖励）→ Self-Reflection（LLM 分析失败原因，生成一段反思口述）。
- **跨Episode记忆**：反思文本存于滑动窗口式的经验缓冲区内，下一Episode作为额外上下文拼接在prompt中，形成"试错—反思—再试"的循环。
- **层级多样性**：根据任务粒度可实现动作级反思（单步错误分析）或轨迹级反思（全局策略缺陷），支持链式多轮反思叠加。
- **无梯度通用性**：模型参数完全固定，适用于任意基于prompt的LLM，可被灵活嵌入ReAct、CoT等推理链路中。

#### 🔬 深入细节
![Reflexion 示意图](https://ar5iv.labs.arxiv.org/html/2303.11366/assets/x1.png)
*图：Reflexion 的核心框架或评测示意。*

##### 示意图（文字描述）

```
┌─────────────┐     action      ┌───────────┐
│   Actor     │ ───────────────→ │Environmen│
│  (LLM)      │                 │     t     │
└─────────────┘                 └───────────┘
       ↑        ←— reward/outcome —   │
       │                              │
       │  ┌──────────────────┐        │
       └──│ Self-Reflection  │←——trajectory+outcome
          │    (LLM)         │
          └──────────────────┘
                    │
                    ↓
          ┌──────────────────┐
          │  Episodic Buffer │
          │  (reflection mem)│
          └──────────────────┘
                    │
    next episode:    │
    prepend to prompt│
                    ↓
              ┌──────────┐
              │  Actor   │  ← 新一轮受已有反思指导
              └──────────┘
```

**图释**：Actor 产生动作，环境反馈结果；Self-Reflection 模块把轨迹和结果总结为一组反思文本，存入 Episodic Buffer；下一次Actor推理时，prompt前缀包含历史反思，形成"从错误中学习"的循环。全程无参数更新。

##### 算法伪代码

```python
# Reflexion 核心循环
buffer = []  # 跨Episode的反思记忆

for episode in range(max_episodes):
    # 1. 构建prompt：任务说明 + 历史反思 + 当前观测
    prompt = build_prompt(task, observation, buffer)

    # 2. Actor 生成动作序列
    trajectory = []
    for step in range(max_steps):
        action = llm_actor(prompt, observation)
        observation, reward, done = environment.step(action)
        trajectory.append((action, observation, reward))
        if done:
            break

    # 3. Evaluator 评定结果
    if reward == SUCCESS:
        break  # 任务成功，停止

    # 4. Self-Reflection：将失败轨迹转成反思文本
    reflection = llm_reflect(trajectory)
    buffer.append(reflection)  # 存入记忆

    # 5. 可选：清理旧反思防止溢出
    if len(buffer) > max_buffer_size:
        buffer = buffer[-max_buffer_size:]
```

##### 核心机制拆解

**1. 动机与背景**  
传统 LLM Agent（如 ReAct）在复杂决策任务中采用"单次推理→执行→终止"模式，即使同一任务多次尝试，前后 trial 之间没有任何信息传递——Agent 可能在相同位置反复犯同样的错误。基于梯度的微调（RLHF/PPO）能改善行为，但计算成本高、需要大量标注，且难以针对每个单独任务实时调整。Reflexion 的洞察在于：既然 LLM 已经展现出强大的语言理解和自我纠错能力（如"Let's think step by step"可以修正推理），为什么不把这种能力系统化，让它自己读自己过去的失败并提炼教训？

**2. 反思生成机制**  
Self-Reflection 用同一 LLM 但切换角色：输入是整个失败轨迹（动作序列、环境反馈、最终结果），提示词要求模型分析"为什么会失败"并"下次应该如何改进"。生成的反思文本形如：

> *"在上次尝试中，我试图在没有先检查抽屉的情况下直接拿取物品，导致反复空操作。下次我应该先打开周围所有可存储容器并记录里面有什么。"*

这种反思是**高度语义化**的，它不编码数值梯度，而是直接作用于模型对任务的理解。反思的类型可以分级：
- **简单反思**：单句指出错误（"我没看清楚目标物体的位置"）。
- **分析式反思**：详细分析根因并给出策略调整。
- **链式反思**：在多次失败后追加更高层级的元反思（"我过于依赖视觉信息而忽略了任务文本中的线索"）。

**3. 与传统方法的本质区别**  
- vs. ReAct：ReAct 在每个 episodes 内做推理-行动循环，但episode之间完全独立。Reflexion 相当于在 ReAct 外层再套一个"学习循环"，向prompt注入跨episode的经验。
- vs. RLHF/PPO：RLHF 改变模型参数，是"永久学习"；Reflexion 不改变参数，是"上下文学习"。前者泛化到同类任务，后者针对当前任务情境高度特化。
- vs. RAG/检索增强：RAG 检索外部知识库的固定文档；Reflexion 的记忆是模型针对自身失败**动态生成**的，随迭代次数演进而更新。
- vs. 思维树(ToT)/思维图(GoT)：后者在单次决策中并行搜索多条推理路径；Reflexion 利用历史试错的信息压缩，在串行Episodes中累积改进。

**4. 训练/推理流程**  

- **无需训练**：整个流程在推理时完成，模型权重冻结。只需设计三组提示词模板（Actor指令、Evaluator规则、Self-Reflection指令）。
- **数据流**：每个Episode开始→Actor读取当前观测+历史反思→生成动作→环境执行→轨迹收集→Episode结束→Evaluator判定→如失败则Reflector生成反思文本追加到buffer→下一Episode开始。
- **Evaluator的灵活性**：对于有明确成功条件的任务（如AlfWorld物品是否放对、HumanEval代码是否通过测试），用二值奖励；对开放式任务（如HotPotQA问答），可用LLM作为启发式评价器（询问"回答是否正确"或使用EM/F1启发式）。
- **Buffer管理**：采用滑动窗口，保持最近N条反思，防止prompt过长；也可用聚类或摘要压缩更长的反思历史。

**5. 关键实验结果**  

Reflexion 在三个不同领域的基准上均展现出显著的迭代提升：
- **AlfWorld（具身AI）**：在134个家务任务上，经过多次反思迭代后成功率从基线显著提高。首次失败的轨迹经过1-2轮反思后，大量任务被纠正。
- **HotPotQA（多跳QA）**：在需要综合多个网页信息的问答任务上，Reflexion 使模型能够从"检索策略不佳"中自我调整，改进了信息检索的覆盖率和准确率。
- **HumanEval（代码生成）**：模型首轮生成代码后若测试失败，Reflexion 能基于错误信息生成反思（"我没有处理边界条件X"），第二次生成的代码通过率大幅提升。这一结果展示了Reflexion在"self-debugging"场景中的实用性。
- 消融实验表明：仅靠"重试"而无反思的基线几乎没有提升；静态提示（如"请更仔细"）的改进微弱；只有基于失败轨迹**动态生成的具体反思**才能驱动显著改进。

> 💡 **关键洞察**：Reflexion 的核心力量不在于模型"更聪明地思考"，而在于它创造了一个**跨Episode的信息通道**——反思文本作为压缩后的经验载体，使得连续试错不再是独立的随机事件，而成为逐步逼近正确解的定向过程。

> ⚠️ **注意**：反思质量高度依赖LLM的自评能力。如果模型连"自己为什么错"都分析不清，反思可能引入噪音甚至误导。实践中需对反思文本做基本校验（如长度过滤、去除空洞套话），且反思prompt需要精心设计（明确要求指出具体错误步骤和可操作的改进措施）。

#### 🧪 练习题
```yaml
question: "Reflexion 与传统强化学习（如 PPO）的核心区别是什么？"
options:
  - "Reflexion 使用更大的模型"
  - "Reflexion 不更新模型参数，而是将失败经验转化为自然语言反思文本注入上下文"
  - "Reflexion 只能用于代码生成任务"
  - "Reflexion 使用对抗训练提升鲁棒性"
answer: 1
explain: "Reflexion 的核心创新在于将强化学习的'利用奖励信号调整策略'转变为'利用语言反思提示引导行为'，全程不涉及梯度计算或参数更新，这使得它即插即用且计算成本极低。"
```

### Voyager

```yaml
id: voyager
num: 4
name: Voyager
full_name: 开放式具身终身学习代理 (Voyager)
year: '2023.05'
org: NVIDIA/Caltech
parent: reflexion
paper_url: https://arxiv.org/abs/2305.16291
project_url: ''
category: self_improve
motivation: 靠课程与技能库持续自我进化
```

#### 📝 一句话总结
Voyager 是首个基于大语言模型（GPT-4）的具身终身学习代理，通过在 Minecraft 中引入**自动课程、可执行代码技能库、迭代提示机制**三大组件，实现了无需人类干预的持续探索、技能获取与新发现，在物品收集量、科技树解锁速度和地图覆盖范围上全面超越 SOTA。

#### 🎯 核心要点
- 三个核心组件协同：**自动课程**（Automatic Curriculum）提出自适应探索目标，**技能库**（Skill Library）以向量数据库存储和检索可执行代码，**迭代提示机制**（Iterative Prompting Mechanism）通过环境反馈与自我验证逐步改进程序
- 以可执行 JavaScript 代码作为行动空间，而非低层运动指令，天然支持**时序扩展与组合性**（temporally extended & compositional）
- 利用 GPT-4 的黑盒查询实现上下文学习（in-context learning），**无需模型参数访问或梯度微调**
- 技能库通过嵌入向量索引，支持相似场景检索与**技能组合**，缓解灾难性遗忘
- 自我验证模块（Self-Verification）通过检测物品/成就/图标的数量变化来判定任务完成，比单纯反思（Reflexion）更全面
- 在 MineDojo 平台上进行系统评估：获 **3.3×** 独特物品、科技树里程碑解锁快 **15.3×**、行走距离多 **2.3×**，且是唯一解锁钻石级的方案
- 技能库可在新 Minecraft 世界中**零样本迁移**解决新任务，基线方法无法泛化

#### 🔬 深入细节
##### 4.1 核心架构图

![Voyager 架构总览](https://ar5iv.labs.arxiv.org/html/2305.16291/assets/figures/fig2.png)
*图：Voyager 由三个关键组件组成——自动课程负责提出探索目标，技能库存储和检索可执行代码技能，迭代提示机制通过环境反馈、执行错误与自我验证来持续改进生成的程序。*

##### 4.2 算法核心流程（伪代码）

```python
# Voyager 主循环
skill_library = VectorDB()           # 以嵌入向量索引的技能库
curriculum = AutomaticCurriculum()   # GPT-4 驱动的自动课程

while True:
    task = curriculum.propose_task(agent_state, completed_tasks, failed_tasks)

    for attempt in range(4):         # 每个任务最多4轮迭代
        # 1. 从技能库检索 top-5 相关技能作为上下文
        plan = gpt3.query("suggest solution for task", task, agent_state)
        relevant_skills = skill_library.query(embed(plan + env_feedback), top_k=5)

        # 2. GPT-4 生成可执行代码
        code = gpt4.generate_code(
            task, agent_state, relevant_skills, control_primitives,
            prev_code, env_feedback, execution_errors, critique
        )

        # 3. 在 Minecraft 中执行代码
        env_feedback, exec_errors = minecraft.execute(code)

        # 4. 自我验证：检查物品/成就数量变化
        if self_verify(task, before_state, after_state):
            skill_library.add(embed(task_description), code)  # 技能入库
            break                                              # 任务完成，请求新任务
    else:
        failed_tasks.append(task)   # 4轮未完成则放弃此任务
```

##### 4.3 方法深入解读

**动机与背景：**
传统具身代理方法依赖强化学习或模仿学习在原始动作空间上操作，面临系统探索困难、可解释性差、泛化能力弱三大瓶颈。ReAct、Reflexion、AutoGPT 等 LLM-based 代理虽能利用预训练世界知识，但它们**缺乏跨时间累积、更新和迁移知识的终身学习能力**。Minecraft 作为无预定目标的开放世界，要求代理像人类玩家一样自驱探索、根据环境状态提出合适任务、在反馈中迭代精进技能并将掌握的能力存入记忆——这正是 Voyager 的设计目标。

**核心机制逐部件拆解：**

1. **自动课程（Automatic Curriculum）：**
   GPT-4 根据"尽可能发现多样事物"的终极目标，结合代理当前状态（物品栏、装备、附近方块/实体、生物群系、时间、生命/饥饿值、坐标）、已完成/失败任务历史、以及 GPT-3.5 生成的自我问答上下文，**自下而上**地提出难度递进的探索目标。课程温度设为 0.1 以保证任务多样性，并包含指令约束"下一个任务不应太难，因为我可能还没有必要的资源或学够技能"——这体现了**最近发展区（Zone of Proximal Development）**的设计哲学。

2. **技能库（Skill Library）：**
   每个技能以**可执行的 JavaScript 代码函数**形式存入向量数据库（如 `craftStoneShovel()`、`combatZombieWithSword()`）。索引键为 GPT-3.5 生成的程序描述文本的 `text-embedding-ada-002` 嵌入向量，值为代码本身。代码生成时，GPT-4 被提示"你的函数将被复用来构建更复杂的函数，因此应使其通用且可复用"。查询时，GPT-3.5 首先生成任务解决建议，与环境反馈拼接后嵌入向量进行 top-5 检索。这种**组合性学习**使复杂技能可由简单技能复合而成，能力指数级增长。

3. **迭代提示机制（Iterative Prompting Mechanism）：**
   这是 Voyager 自我改进的关键引擎，融合三类反馈进行代码迭代：
   - **环境反馈**：通过 `bot.chat()` 显示程序执行的中间进展（如"我无法制作铁胸甲，因为还需要 7 个铁锭"），GPT-4 据此调整策略
   - **执行错误**：JavaScript 解释器的报错信息直接反馈给 GPT-4 用于修正语法/语义错误（如"不存在金合欢斧，应制作木斧"）
   - **自我验证**：执行前后对比关键指标（物品数量、成就、GUI 图标）变化，同时让 GPT-4 对失败原因进行批判性反思
   每轮最多迭代 4 次，若陷入僵局则自动请求自动课程分配新任务，**避免无限循环**。

**与传统方法的区别：**
| 维度 | ReAct/Reflexion | AutoGPT | Voyager |
|------|-----------------|---------|---------|
| 知识积累 | 无长期记忆 | 无技能库 | 向量数据库持久化技能 |
| 任务提出 | 人工指定 | 一次性分解子目标 | 自动课程持续生成 |
| 成功判定 | 无验证 | 无验证 | 自我验证（物品/成就变化） |
| 代码改进 | 无迭代 | 无迭代 | 至多4轮环境+错误+验证迭代 |
| 泛化能力 | 无法迁移 | 无法迁移 | 技能库在新世界零样本复用 |

**关键直觉：**
> 💡 **核心洞察**：将技能表示为代码而非自然语言计划，使得技能可被精确执行、可靠验证和组合复用——这正是 Voyager 能指数级增长能力的根本原因。

> ⚠️ **注意**：Voyager 不涉及 3D 视觉感知或端到端传感器运动控制，它通过 Mineflayer 高级 API 操控代理。该方法与 VPT 等梯度方法正交互补——只要底层控制器提供代码 API，即可叠加 Voyager 进行高层规划。

#### 🧪 练习题
```yaml
question: "Voyager 的迭代提示机制中，自我验证模块通过什么来判断任务是否完成？"
options:
  - "仅检查程序是否无语法错误执行完毕"
  - "对比执行前后物品/成就/GUI图标的数量变化，并让GPT-4进行批判性反思"
  - "由外部人工标注任务是否成功"
  - "仅依靠LLM输出的置信度分数"
answer: 1
explain: "Voyager 的自我验证通过检测关键指标的变化并配合 LLM 批判性反思来判定任务完成，比仅检查执行状态或LLM置信度更可靠。论文 Figure 6 展示了具体的验证提示结构。"
```

### Werewolf-RL

```yaml
id: werewolf_rl
num: 5
name: Werewolf-RL
full_name: 狼人杀战略语言代理 (Strategic Play in the Werewolf Game)
year: '2023.10'
org: Tsinghua University
parent: saycan
paper_url: https://arxiv.org/abs/2310.18940
project_url: ''
category: foundation
motivation: 用RL纠正语言动作的固有偏置
```

#### 📝 一句话总结
Werewolf-RL 提出“LLM推理+RL决策”的双层框架，用强化学习策略从LLM生成的多样化语言候选动作中做出最优选择，解决了纯LLM代理在复杂决策任务中存在固有不均衡行为偏置的问题，成为 Agentic RL 的重要奠基工作。

#### 🎯 核心要点
- 提出双层框架：LLM负责演绎推理并生成多个候选语言动作，RL策略负责从候选集中选出最优动作
- 首次在狼人杀这一高社交推理游戏中对LLM代理进行强化学习训练，实现人类水平表现
- 系统性地揭示了纯LLM代理的“内在行为偏置”问题：推理正确，但动作分布受预训练数据影响而偏离最优
- 离散动作空间设计：将每个候选语言动作编码为固定维度的嵌入向量，动作空间可随LLM输出动态变化
- 奖励设计：以游戏胜率为奖励信号，必要时加入中间奖励（存活回合数），在冒险社区环境中训练以获得鲁棒策略
- 与 Cicero（Diplomacy）对比：Cicero 使用固定预定义动作集，而 Werewolf-RL 的动作空间由LLM动态生成，支持自由形式语言交互

#### 🔬 深入细节
##### 核心架构图

![图1：纯LLM代理的内在偏置](https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig1.png)
*图：即使LLM正确推理出“应随机出拳”的策略（100/100次），实际动作分布仍严重偏向“石头”，揭示了推理与决策之间的偏置鸿沟。*

![图2：狼人杀游戏示例](https://ar5iv.labs.arxiv.org/html/2310.18940/assets/fig2.png)
*图：狼人杀游戏中的多角色交互示例——狼人需要欺骗，村民需要推理并投票驱逐隐藏的狼人。*

##### 算法伪代码

```python
# Werewolf-RL 双层框架核心流程
for each game_round:
    # 阶段1: LLM 推理与候选生成
    context = build_prompt(game_history, role, status)
    reasoning, candidates = LLM.generate(context)  # 生成k个候选语言动作
    
    # 阶段2: 候选动作编码
    embeddings = [text_encoder(c) for c in candidates]
    
    # 阶段3: RL策略选择
    state = build_state(game_history, embeddings)
    action_idx = RL_policy.sample(state)  # 从k个候选中选择最优动作
    chosen_action = candidates[action_idx]
    
    # 阶段4: 执行与反馈
    execute(chosen_action)
    reward = get_reward(game_outcome)  # 胜+1 / 负-1，可加中间奖励
    RL_policy.update(state, action_idx, reward)
```

##### 动机与背景

在复杂多代理交互任务中，LLM虽能完成逻辑推理，但其动作选择存在“内在偏置”：模型在预训练过程中学习到的分布会系统性地偏向某些高频动作。例如在石头剪刀布中，LLM能100%正确识别纳什均衡策略（随机出拳），但实际出拳却偏向“石头”。这种偏置在狼人杀等战略游戏中更为致命——对手一旦发现行为模式，便可轻易利用。

传统做法如 Cicero 采用“预定义动作集+LLM对话填充”的方式，动作空间固定且依赖游戏特定设计。而真实世界中的人机交互往往需要自由形式的语言表达，因此需要一个能在“无界语言空间”中做出最优决策的方案。

##### 核心机制

Werewolf-RL 的核心创新在于将“语言生成”与“战略决策”解耦：

1. **LLM推理层**：基于当前游戏上下文（历史对话、角色身份、存活状态），LLM首先进行演绎推理，然后生成 \(k\) 个候选语言动作（如“投票给玩家3”、“声称自己是预言家”等），保证语法正确和语义连贯。

2. **候选编码层**：每个候选动作通过文本嵌入模型转换为固定维度向量 \(\mathbf{e}_i \in \mathbb{R}^{1536}\)，使得RL策略可以在一个规范的数学空间中比较不同候选的质量。

3. **RL决策层**：策略网络接收由游戏状态和所有候选嵌入构成的联合状态 \(\mathbf{s}=[\mathbf{h}_{\text{game}}, \mathbf{e}_1, \ldots, \mathbf{e}_k]\)，输出一个在 \(k\) 个候选项上的概率分布 \(\pi(\mathbf{s})\)。训练时使用 PPO 算法，以游戏胜率为最终奖励信号。

##### 与本领域之前方法的区别

| 方法 | 推理方式 | 动作空间 | 决策机制 |
|------|---------|---------|---------|
| 纯LLM (如GPT-4) | 思维链提示 | 自由文本 | 模型采样，存在偏置 |
| Cicero | 规则+LLM | 固定预定义 | RL策略从有限集选择 |
| **Werewolf-RL** | **LLM推理+候选** | **LLM动态生成** | **RL策略从动态候选集选择** |

关键区别在于：(1) Werewolf-RL 的动作空间由LLM实时生成，不依赖任何游戏特定的预定义动作模板，具有更强的泛化能力；(2) RL策略仅需从 \(k\) 个候选中选择，而非直接生成文本，大幅降低了学习难度。

##### 实验与结果

在 5 人局、6 人局狼人杀游戏中，Werewolf-RL 在所有配置下均显著超越纯LLM基准（GPT-3.5、GPT-4）。人类评估实验表明，代理能达到人类水平表现，且展现出强战略行为——包括有策略的撒谎、团队协作、以及适应对手策略的能力。

> 💡 关键：框架的核心洞察是“推理与决策应分离”——推理交给LLM（保证语言质量和多样性），决策交给RL（保证最优性和无偏性），两者优势互补。

> ⚠️ 注意：候选动作的数量 \(k\) 是一个关键超参数——过小会限制策略选择空间，过大会增加RL训练的样本复杂度。

#### 🧪 练习题
```yaml
question: "Werewolf-RL 为什么要将LLM推理与RL决策分离，而不是直接让LLM输出最终动作？"
options:
  - "因为LLM推理速度太慢，需要RL加速"
  - "因为纯LLM存在内在行为偏置，推理正确但动作选择可能偏离最优策略"
  - "因为RL可以直接生成更流畅的自然语言"
  - "因为狼人杀规则太复杂，LLM无法理解"
answer: 1
explain: "论文通过石头剪刀布实验证明：LLM能100%正确推理出最优策略，但实际动作分布仍严重偏向特定选项。将推理与决策分离后，RL策略可无偏地从候选集中选出最优动作。"
```

### AGILE

```yaml
id: agile
num: 6
name: AGILE
full_name: 环境交互学习代理 (AGILE)
year: '2024.05'
org: ByteDance Research
parent: werewolf_rl
paper_url: https://arxiv.org/abs/2405.14751
project_url: ''
category: online_rl
motivation: 把记忆工具求助纳入统一RL代理
```

#### 📝 一句话总结
AGILE 将 LLM、记忆、工具和执行器统一成一个 token 级强化学习代理，并把“向人类专家求助”也做成可学习动作，从而让模型在复杂问答中同时学会检索、调用工具、反思和控制求助成本。

#### 🎯 核心要点
- 把 agent 形式化为 token-level MDP：LLM 是策略，状态由 `context + memory` 组成，executor 负责执行函数动作并推动环境转移。
- 统一四个核心模块：`LLM / memory / tools / executor`，并允许与用户和人类专家交互。
- 定义显式函数动作集：`[GetQuestion]`、`[RetrieveMemory]`、`[SeekAdvice]`、`[Reflection]`、`[UpdateMemory]`、`[SearchProduct]`、`[PredictAnswer]`、`[SubmitAnswer]`、`[ClearContext]`。
- 训练采用两阶段：先用带动作标注的轨迹做 imitation learning，再对 action token 做 PPO 优化。
- 提出 ProductQA 基准：88,229 条问答、26 个商品品类任务，重点考察工具使用、记忆利用、反思与适应新类别能力。
- 把“求助专家”建模为带成本的动作；模型既能用它保证当前正确率，也能通过 reflection 把专家反馈蒸馏进 memory。

#### 🔬 深入细节
![AGILE 框架图](https://ar5iv.labs.arxiv.org/html/2405.14751/assets/x1.png)
*图：AGILE 由 LLM、memory、tools 和 executor 组成，executor 解释函数 token 并把环境反馈重新写回上下文。*

```python
# AGILE 的抽象执行与训练流程
context = ["[BOS]"]
memory = init_memory()

while not done:
    action = llm.sample(context)  # 动作空间就是词表 token
    context.append(action)

    if action in FUNCTIONS:
        context, memory, reward, done = executor.step(
            action=action,
            context=context,
            memory=memory,
            env=environment,
        )

# 仅对 action token 做 IL / PPO 更新
ppo_update(policy=llm, action_tokens=trajectory.actions, rewards=trajectory.rewards)
```

论文的核心建模不是“再给 LLM 加几个外挂模块”，而是把整个 agent 过程直接写成 RL。若记 `context` 为 \(c_t\)、memory 为 \(m_t\)，则状态可写作 \(s_t=(c_t,m_t)\)，动作 \(a_t\) 则是词表中的一个 token。只要这个 token 命中某个注册函数名，executor 就会执行相应逻辑，把搜索结果、检索到的记忆或专家反馈附加回上下文，再把控制权交回 LLM。这样一来，工具调用、记忆读写、清空上下文等都进入了同一策略空间。

AGILE 的关键不是普通的 tool use，而是 executor 驱动的“函数 token”机制。论文 Table 1 明确给出一组函数：`[GetQuestion]` 负责向用户取题，`[RetrieveMemory]` 从 memory 追加相关条目，`[SearchProduct]` 调产品搜索工具，`[SeekAdvice]` 请求人类专家答案，`[UpdateMemory]` 把上下文片段写回记忆，`[ClearContext]` 将上下文重置到 `[BOS]`。其中 `[Reflection]` 和 `[PredictAnswer]` 是轻量动作，本身不执行外部副作用，而是让模型继续生成反思文本或答案文本。论文还特别说明，executor 可以删除部分旧上下文，因此训练时真正看到的 \(c_i\) 不一定等于所有历史 token 的简单拼接。

“求助专家”是这篇论文最有辨识度的设计。对于 ProductQA，提交错误答案奖励为 \(0\)，提交正确答案奖励为 \(1\)，若先求助再正确回答，总奖励为 \(1-c\)，其中 \(c\) 是求助成本，因此单轮奖励集合为 \(\{0, 1, 1-c\}\)。这让模型必须自己学会平衡三件事：当前题目有多难、专家建议对后续任务是否还有复用价值、以及人类成本是否值得。论文进一步用 `[Reflection]` 把专家反馈转成可复用知识并写入 memory，因此求助不只是“兜底”，还是显式的适应新任务机制。

训练分成两个阶段。第一阶段从带动作监督的轨迹中做 imitation learning；第二阶段只对 action token 做 PPO 更新，而不是对 executor 自动附加的环境 token 一起反传。实验上，AGILE 在 ProductQA 上相对 GPT-4 的 total score 提升 9.2%，相对 GPT-3.5 提升 90.8%；相对 SFT 版 `agile-vic13b-sft`，PPO 版又多出 2.3% 的 total score。消融也很直接：移除 tools 或 memory 会分别让 advice rate 上升 25.9% 和 17.4%，并带来 9.3% 和 4.0% 的 total score 下降；禁用 `SeekAdvice` 会让准确率下降 10.7%。在 MedMCQA 上，`agile-mek7b-ppo` 把基础模型准确率从 53.4% 拉到 85.2%，其中 31.6% 的样本触发过求助，说明这套“带成本求助 + 反思写回记忆”的机制确实在起作用。

> 💡 关键：AGILE 不是把 memory、tool、expert 分别做成独立 pipeline，而是让它们都变成同一个 RL policy 可选择的动作。

> ⚠️ 注意：论文优化的是“何时调用模块、何时求助、何时清上下文”这类策略问题，不是单纯提高单轮文本生成质量。

#### 🧪 练习题
```yaml
question: "AGILE 中将 [SeekAdvice] 设计为带成本动作的主要目的是什么？"
options:
  - "让模型始终优先复制人类答案，避免自主推理"
  - "把专家反馈仅作为测试阶段外挂，不进入训练闭环"
  - "让模型在正确率、未来知识收益和人力成本之间学习策略性权衡"
  - "用专家回答替代 memory 模块，简化系统结构"
answer: 2
explain: "AGILE 把求助写进奖励设计，奖励集合包含 1-c，因此模型必须学会只在值得时求助，并进一步通过 reflection 把反馈沉淀进 memory。"
```

### Agent Q

```yaml
id: agent_q
num: 7
name: Agent Q
full_name: 自主代理推理与学习 (Agent Q)
year: '2024.08'
org: Stanford/MultiOn
parent: agile
paper_url: https://arxiv.org/abs/2408.07199
project_url: ''
category: online_rl
motivation: 结合搜索自评和偏好学习提效
```

#### 📝 一句话总结
Agent Q提出结合蒙特卡洛树搜索（MCTS）与AI自我批判进行步骤级探索引导，并通过节点级别Direct Preference Optimization（DPO）将搜索经验蒸馏回基础策略，在WebShop和真实OpenTable网站预订任务上分别实现50.5%和95.4%的成功率，远超基座模型和人类平均水平。

#### 🎯 核心要点
- **MCTS搜索引导探索**：在每一步从LLM采样K个候选动作构建搜索树，使用UCB1公式平衡探索与利用，解决Agent在网页任务中贪心搜索、不翻页等探索不足问题
- **AI自我批判（Process Supervision）**：同一基础模型作为零样本评判器对候选动作排序，提供步骤级过程监督信号，无需外部奖励模型
- **节点级DPO训练**：利用MCTS收集的Q值和AI反馈评分构造步骤级偏好对（preference pairs），使用DPO目标函数在步骤级别优化策略，支持同时利用成功和失败轨迹
- **迭代自我改进**：训练后的策略作为下一轮MCTS的参考策略，形成闭环迭代（Algorithm 1）
- **从模拟到真实网站迁移**：在WebShop验证方法后成功迁移到OpenTable真实生产环境，平均步数从6.8步增至13.9步
- **关键结果**：WebShop从28.6%→50.5%（+76.57%）；OpenTable从18.6%→81.7%（+340%），推理时加MCTS搜索达95.4%，超过GPT-4o的62.6%

#### 🔬 深入细节
##### 1. 核心框架示意图

![Agent Q总览：MCTS引导轨迹收集并迭代改进模型](https://ar5iv.org/html/2408.07199/assets/images/AgentTree2.png)
*图1：Agent Q使用MCTS引导轨迹收集并迭代改进模型性能*

![过程监督：策略提议K个动作，Critic排序后指导节点选择](https://ar5iv.org/html/2408.07199/assets/images/process_supervision.png)
*图4：策略在每步推理时提议K个候选动作，同一个LLM作为评判器对动作排序，排序结果用于指导MCTS节点选择和构造DPO偏好对*

![OpenTable结果监督：GPT-4-V评估Agent轨迹](https://ar5iv.org/html/2408.07199/assets/images/outocme_supervision.png)
*图5：轨迹结束时GPT-4-V被调用对Agent表现进行反馈评分*

##### 2. 核心算法伪代码

Algorithm 1: MCTS Guided Direct Preference Optimization

Input: π_{θ_0}: 初始LLM策略, D_T: 任务数据集, N: 迭代轮数,
       B: 每轮采样数, T: MCTS树深度, B: replay buffer,
       θ_threshold: 偏好对阈值, K: MCTS候选动作数
Output: π_{θ_N}: 训练后的LLM策略

for i = 1 to N do
    π_ref ← π_{θ_i}, π_{θ_i} ← π_{θ_{i-1}}
    从 D_T 采样 B 个任务
    for each task in batch do
        初始化根节点 h_0
        for t = 1 to T do
            Selection: 使用UCB1从根遍历至叶节点
            Trajectory Rollout: 从选定节点用π_{θ_i} rollout至终止
            Backpropagation: 自底向上回传更新Q值和N值
        end for
        收集rollout轨迹存入replay buffer B
    end for
    构造偏好对 D_P = {(h_t, a_t^w, a_t^l)}：节点级对比，
        当 |Q̃(h_t, a^w) - Q̃(h_t, a^l)| > θ_threshold 时构成偏好对
    使用DPO目标函数以 D_P 和 π_ref 优化 π_{θ_i}
end for

##### 3. 方法动机与背景

传统LLM Agent在交互式网页环境中面临两大挑战：(1) **复合误差**：监督微调的行为克隆会因分布偏移而累积错误；(2) **探索不足**：模型在搜索结果中贪心地只检查第一页，从不翻页（在WebShop实验中表现为核心失败模式）。强化学习虽能利用失败轨迹，但标准在线RL在真实交互环境中成本过高且不可扩展。

Agent Q的设计哲学：**用搜索补偿策略的短视（推理时），用DPO将搜索经验压缩回策略（训练时）**，形成自我改进闭环。

##### 4. 核心机制详解

**（a）MCTS搜索形式化**

将网页Agent流程建模为树搜索。状态表示为历史摘要+当前页面DOM树。在每个状态节点，从策略模型采样K个候选动作。与棋类等固定动作空间不同，网页Agent的动作空间是开放式文本生成，因此用LLM作为"动作提议分布"（action-proposal distribution）。

MCTS四阶段：
- **Selection**：使用UCB1公式选择最有潜力的节点
- **Expansion/Simulation**：执行动作进入新页面，用当前策略rollout至终止
- **Backpropagation**：环境返回二元奖励R∈{0,1}，自底向上更新每个状态-动作对的Q值和访问计数

$$
Q(\mathbf{h}_t, \mathbf{a}_t^i) \leftarrow \frac{Q(\mathbf{h}_t, \mathbf{a}_t^i) N(\mathbf{h}_t, \mathbf{a}_t^i) + R}{N(\mathbf{h}_t, \mathbf{a}_t^i) + 1}
$$

**（b）AI自我批判的过程监督**

> 💡 关键创新：网页环境无中间奖励。Agent Q使用**同一LLM**对候选动作进行零样本排序，作为过程监督信号。

具体做法：将K个候选动作输入LLM，要求其按"对完成用户任务帮助最大"的标准排序。通过多轮查询（每轮移除已选最佳动作）得到完整排序。该排序有两个用途：(1) 在MCTS选子节点时与UCB1配合使用；(2) 在构造DPO偏好对时作为Q值的补充。

**（c）节点级DPO训练**

> ⚠️ 与轨迹级DPO的关键区别：在步骤级别构造偏好对，而非完整轨迹级别。这允许更细粒度的信用分配，利用MCTS的分支结构自然产生正负对比。

**定理1**：若偏好按 $p(\mathbf{a}_t^w \succ \mathbf{a}_t^l | \mathbf{h}_t) \propto \sigma(Q(\mathbf{h}_t, \mathbf{a}_t^w) - Q(\mathbf{h}_t, \mathbf{a}_t^l))$ 生成，则DPO优化后的策略等价于最优RL策略：

$$
\pi^*(\mathbf{a}|\mathbf{h}_t) \propto \pi_{\text{ref}}(\mathbf{a}|\mathbf{h}_t) \exp(Q(\mathbf{h}_t, \mathbf{a})/\beta)
$$

实际操作中，Q值采用加权混合：$\tilde{Q} = (1-\lambda) \cdot Q_{\text{MCTS}} + \lambda \cdot \text{AI\_Score}$。当两个候选动作的$\tilde{Q}$差超过阈值$\theta_{\text{threshold}}$时，构造偏好对$(h_t, a^w, a^l)$，使用标准DPO损失优化策略。

**（d）与基线方法的区别**

| 方法 | 监督信号 | 是否用失败轨迹 | 步骤级优化 |
|------|---------|-------------|-----------|
| RFT (STaR) | 结果监督 | 否（仅成功轨迹） | 否 |
| DPO (轨迹级) | 结果监督 | 是 | 否 |
| **Agent Q** | 结果+过程监督 | 是 | **是（节点级）** |

##### 5. 实验结果

**WebShop环境（图3）**：
![WebShop成功率和DPO+MCTS对比](https://ar5iv.org/html/2408.07199/assets/images/WebShopPreliminaryResultsPassFinalBold.png)

**OpenTable真实网站（图6）**：
![OpenTable各方法成功率对比](https://ar5iv.org/html/2408.07199/assets/images/open_table_sr_final_bold.png)

核心发现：DPO（结果监督）已优于RFT，但加入MCTS搜索后（Agent Q）进一步提升16-77%。在OpenTable上Agent Q（81.7%）远超GPT-4o零样本（62.6%），推理时再叠加MCTS在线搜索达95.4%。

##### 6. 输入格式

Agent的输入格式为：系统提示 + 执行历史 + 当前页面DOM树 + 用户任务，如：

![Agent输入格式示意](https://ar5iv.org/html/2408.07199/assets/images/AgentFormat.png)
*图2：Agent输入由系统提示、历史、当前页面和用户任务组成*

#### 🧪 练习题
```yaml
question: "Agent Q中节点级DPO与轨迹级DPO的核心区别是什么？"
options:
  - "节点级DPO使用更大的batch size"
  - "节点级DPO在每一步构造偏好对而非完整轨迹级别，利用MCTS分支结构提供细粒度信用分配"
  - "节点级DPO不需要参考策略π_ref"
  - "节点级DPO使用在线RL代替离线优化"
answer: 1
explain: "节点级DPO在MCTS搜索树的每个步骤级别构造(a^w, a^l)偏好对，利用树的分支结构自然产生正负对比，实现比轨迹级DPO更细粒度的信用分配。"
```

### WebRL

```yaml
id: webrl
num: 8
name: WebRL
full_name: 自演化在线课程网页强化学习 (WebRL)
year: '2024.11'
org: Tsinghua/Zhipu AI
parent: agent_q
paper_url: https://arxiv.org/abs/2411.02337
project_url: ''
category: online_rl
motivation: 以自演化课程缓解稀疏网页奖励
```

#### 📝 一句话总结
WebRL提出自演化在线课程强化学习框架，通过从失败任务中自动生成新课程任务 + 结果监督奖励模型(ORM) + 自适应RL策略，将开源Llama-3.1-8B在WebArena-Lite上的成功率从4.8%提升至42.4%，超越GPT-4o(13.9%)等闭源模型。

#### 🎯 核心要点
- **自演化课程(Self-Evolving Curriculum)**：从模型执行失败的任务出发，使用GPT-4o生成语义相似但难度递增的新任务，8个阶段逐步扩展训练任务池
- **结果监督奖励模型(ORM)**：在WebArena-Lite 1,186条轨迹基础上，通过指令改写+跨基线方法采集12,200条轨迹训练ORM，提供离散成功/失败二元信号
- **自适应强化学习策略**：基于PPO + KL散度约束（约束模型输出分布不偏离SFT模型），融合经验回放缓冲区中的历史成功数据
- **双层价值函数**：instruction-level critic评估整体任务完成概率，step-level critic评估当前步骤的即时价值
- **重放缓冲区筛选机制**：仅保留perplexity在 [1/0.95, 1/0.5] 之间的历史数据，避免数据质量退化
- **开源突破**：将Llama-3.1-8B提升至42.4%，GLM-4-9B至43%，Llama-3.1-70B至49.1%，全面超越GPT-4系列

#### 🔬 深入细节
##### 1. 核心框架图

![WebRL Framework Overview](https://arxiv.org/html/2411.02337v3/x1.png)
*图1：WebRL框架总览——包含(1)自演化课程从失败样本中生成新任务，(2)ORM提供结果监督奖励，(3)自适应RL策略融合在线探索与历史经验回放，(4)基于PPO+KL约束的策略优化。*

##### 2. 算法伪代码

Algorithm 1: WEBRL Training Process
─────────────────────────────────────────────────
Input: SFT-trained policy π_sft, WebArena-Lite training set D_train
Output: Trained policy π_θ

1. Fine-tune π_θ from open LLM using SFT on D_train
2. Initialize replay buffer B ← ∅, failure set F ← ∅
3. Run π_θ on D_train instructions to populate B and F
4. for phase = 1 to 8 do:
5.     // Self-Evolving Curriculum
6.     if phase > 1 then
7.         select 500 new instructions from GPT-4o generated set
             that satisfy filtering criteria
8.         add selected instructions to training set
9.     end if
10.    // Online Interaction
11.    for each instruction in current training set do:
12.        rollout trajectory τ = (s_1,a_1,...,s_T,a_T) using π_θ
13.        compute ORM reward R(τ) ∈ {0,1}
14.        add (τ, R) to replay buffer B
15.        if R=0: add instruction to failure set F
16.    end for
17.    // Curriculum Generation (for next phase)
18.    if phase < 8:
19.        for each failed instruction in F:
20.            prompt GPT-4o to generate similar but harder tasks
21.    // Adaptive RL Training
22.    sample historical data from B where ppl ∈ [1/0.95, 1/0.5]
23.    (limit historical samples to 2× current interaction data)
24.    train actor π_θ and critic V using PPO with KL constraint
         （对instruction-level reward + step-level advantage）
25. end for
26. return π_θ

##### 3. 深入方法解释

**动机与背景**。LLM网页智能体在WebArena等真实环境中展现出强大潜力，但现有方案严重依赖GPT-4等昂贵闭源API。开源LLM（如Llama-3.1-8B）直接使用时成功率仅4.8%，即使经过SFT也仅提升至约15%。核心挑战有三：(1)**训练任务稀缺**——WebArena-Lite仅提供812个训练任务，远不足以覆盖网页交互的多样性；(2)**反馈信号稀疏**——网页任务只有最终的二元成功/失败信号，无中间步骤反馈；(3)**在线策略漂移**——RL训练中策略不断变化，历史数据分布与当前策略不匹配。

**自演化课程**。WebRL最核心的创新是自我演化课程机制。模型首先在初始训练集上执行任务，收集失败案例。然后利用GPT-4o作为"任务生成器"，提示GPT-4o基于每个失败任务生成语义相似但难度更高的新任务（如改变搜索条件、增加约束、引入干扰项）。新任务需满足过滤标准（与已有任务不重复、符合WebArena环境约束等），每个阶段筛选500个高质量任务加入训练池。8个阶段后，任务多样性大幅提升，模型逐步从简单任务过渡到复杂长序列任务。

**结果监督奖励模型(ORM)**。由于网页任务只能获得二元成功/失败结果，WebRL训练了一个多步结果监督奖励模型(MORM)。训练数据构建：在WebArena-Lite的1,186条原始轨迹基础上，(1)通过指令改写扩充任务，(2)使用SFT/Filtered BC/AWR/DigiRL等多种基线方法在新任务上采集rollouts，(3)使用环境提供的replay函数自动标注每条轨迹的成功/失败。最终获得12,200条标注轨迹训练ORM，在验证集上达到92.6%的准确率。

> 💡 关键：ORM将"是否成功完成网页任务"建模为序列级别的二分类问题，输入为完整动作轨迹，输出为{0,1}二元奖励，替代了传统RL中的手工奖励函数。

**自适应RL训练**。策略优化采用PPO算法，并引入两项关键设计：
- **KL散度约束**：对策略输出分布施加KL惩罚 \\(D_{KL}(\pi_{\theta} \| \pi_{sft})\\)，防止策略在RL微调中偏离原始SFT模型过远导致灾难性遗忘。
- **双层Critic架构**：Instruction-level critic \\(V_{\text{inst}}(x)\\) 评估整个任务的期望成功率（用于最终奖励分配），Step-level critic \\(V_{\text{step}}(h_t)\\) 评估在已执行历史 \\(h_t\\) 下完成任务的概率（用于逐步骤优势估计）。

经验回放缓冲区采用**perplexity筛选**机制：仅保留模型在当前策略下perplexity在 [1/0.95, 1/0.5] 之间的历史轨迹进行重放，排除过于简单(perplexity过低)或过于困难/异常(perplexity过高)的数据，且历史数据量限制为当前交互数据量的2倍。

**与传统方法的差异**。相比DigiRL（在固定任务集上在线学习），WebRL通过课程机制持续扩展任务空间，使模型不断增强对长序列任务的鲁棒性。对比AWR（Advantage Weighted Regression），WebRL的PPO+KL约束提供了更稳定的策略更新。实验表明，去除课程学习后性能从42.4%降至20.6%，去除重放缓冲区后降至32.7%，验证了每个组件的关键作用。

#### 🧪 练习题
```yaml
question: "WebRL的自演化课程机制的核心作用是什么？"
options:
  - "加速模型训练收敛速度"
  - "从失败任务中自动生成难度递增的新任务，扩充训练任务空间，解决任务稀缺问题"
  - "减少对GPT-4o API的依赖"
  - "提高ORM奖励模型的训练精度"
answer: 1
explain: "自演化课程利用GPT-4o基于模型失败的任务生成语义相似但难度更高的新任务，通过8个阶段逐步扩展训练任务池，直接解决了WebArena训练任务不足的瓶颈。"
```

### WebAgent-R1

```yaml
id: webagent_r1
num: 9
name: WebAgent-R1
full_name: 端到端多轮网页代理强化学习 (WebAgent-R1)
year: '2025.05'
org: Amazon
parent: webrl
paper_url: https://arxiv.org/abs/2505.16421
project_url: ''
category: online_rl
motivation: 用纯在线多轮RL直训网页代理
```

#### 📝 一句话总结
WebAgent-R1 提出首个面向 Web Agent 的端到端多轮强化学习框架 M-GRPO（Multi-turn GRPO），结合行为克隆初始化和动态上下文压缩，在 WebArena-Lite 上取得 SOTA，验证了 RL 在真实 Web 交互任务中的有效性。

#### 🎯 核心要点
- 核心动机：用纯在线多轮RL直训网页代理
- 演化来源：继承或改进自 webrl
- 代表机构：Amazon

#### 🔬 深入细节
![WebAgent-R1 示意图](https://ar5iv.labs.arxiv.org/html/2505.16421/assets/x1.png)
*图：WebAgent-R1 的核心框架或评测示意。*

##### 1. 问题形式化：Web Agent 的 POMDP 建模

Web Agent 在每个时间步 t 接收环境的 HTML 观察 `o_t`，基于历史 `(o_1, a_1, ..., o_t)` 输出结构化动作 `a_t`。动作空间是预定义的函数调用集：
- `click(element_id)` — 点击指定元素
- `type(element_id, text)` — 在输入框填入文本
- `scroll(direction)` — 页面滚动
- `goto(url)` — 页面跳转
- `stop(answer)` — 任务完成并返回答案

任务被建模为有限视界 POMDP：`(S, A, O, T, Ω, R, γ, H)`，其中状态 s ∈ S 包含页面 DOM 和会话 cookie，转移函数 T 是确定性的（浏览器执行动作后返回新页面），观测函数 Ω 给出渲染后的 HTML。由于 cookie 携带部分不可观测的服务器端状态，问题本质上是部分可观测的。

关键设计：当前观测 `o_t` 是一个完整的 HTML 文档，可能包含数万 tokens。原始 HTML 直接拼接进 prompt 导致上下文爆炸，这是后续动态压缩要解决的核心痛点。

##### 2. M-GRPO：多轮 Group Relative Policy Optimization

M-GRPO 是 WebAgent-R1 的核心算法贡献，将 DeepSeek-R1 提出的单轮 GRPO 推广到多轮 Web 交互。

**标准 GRPO 回顾**：对于单轮生成任务，从旧策略采样 G 个响应 `{y_1, ..., y_G}`，对每个响应内的 token 使用 clipped importance sampling 优化：
```
A_i = (r_i - mean(r)) / std(r)   # group-relative advantage
L = -E[min(r_{i,t}(θ)·A_i, clip(r_{i,t}(θ), 1-ε, 1+ε)·A_i)] - β·D_KL
```

**M-GRPO 关键改造**：
- 每个 trajectory `τ_i = (a_{i,1}, a_{i,2}, ..., a_{i,|τ_i|})` 包含多轮动作
- 组内所有 trajectory 共享同一初始任务，并行生成
- **组内共享奖励**：trajectory τ_i 的最终二元奖励 r_i（成功=1，失败=0）分配给该 trajectory 内所有 token
- 每个动作内的 **token 级 PPO clip** 沿用 GRPO 形式，importance ratio `r_{i,j,t}(θ) = π_θ(a_{i,j,t}|q, a_{i,j,<t}) / π_old(...)`
- 组相对优势 `A_{i,j} = (r_i - mean(r)) / std(r)` **对整个 action 内的所有 token 共享**

伪代码：
```
for each training step:
    1. 采样 G 个任务，每个任务启动 G 个并行浏览器
    2. 每个浏览器独立与环境交互，生成 trajectory τ_i
    3. 计算每个 τ_i 的二元奖励 r_i
    4. 计算组内标准化优势 A_i = normalize({r_1,...,r_G})
    5. 对每个 τ_i 的每个 action 的每个 token，计算 PPO loss
    6. 加上 KL 惩罚项 -β·D_KL(π_θ || π_ref)
    7. 梯度下降更新策略
```

**与 WebRL/DigiRL 等 prior work 的关键区别**：
- WebRL (Qi et al., 2025) 采用离线 RL + 课程学习 + 奖励模型，需要训练一个 outcome reward model
- WebAgent-R1 使用规则化二元奖励（环境自带），无需奖励模型，简化训练流程
- 端到端优化整个多轮交互链，而非仅优化单步决策

##### 3. 动态上下文压缩（Dynamic Context Compression）

这是工程上最关键的设计。在 multi-turn Web 交互中，每轮 agent 看到的 prompt 包含：
```
[System Prompt] + [Task Instruction] + [Observation_1] + [Action_1] + [Observation_2] + [Action_2] + ...
```

假设单页 HTML 平均 5K tokens，10 轮交互后上下文膨胀至 50K+ tokens。在 RL 训练中，需要为 G 个 trajectory 的每个 token 存储 KV-cache，显存压力巨大。

**压缩策略**：
- 保留 HTML 的 **DOM 结构树**（tag hierarchy），删除样式属性、脚本、注释等冗余内容
- 对长文本内容（如 <p>、<span> 内部）进行截断，保留前 N 个字符 + 省略标记
- 对重复出现的导航栏、页脚等静态内容，在第二次出现时用 `<nav>...</nav>` 省略标记替代
- 关键操作目标（如按钮文字、链接文本）始终保留完整

这样将单页 HTML 从 5K-10K tokens 压缩至 1K-2K tokens，在保持语义信息的前提下大幅降低计算开销。压缩是可配置的（支持关闭以保留完整信息），论文报告在 RL 训练中启用压缩对性能影响轻微。

##### 4. 训练动态三阶段分析（Figure 3）

论文通过监控奖励、轨迹长度和交互轮次三个指标，揭示了 RL 训练的三个阶段：

**Phase 1 — 初始技能获取**：
- 奖励快速增长，模型迅速学会基础操作（如正确调用 click/type 函数、识别基本 HTML 元素）
- 轨迹长度（生成的 token 总数）急剧增加，说明从 BC 阶段的简短输出过渡到更详细的推理
- 交互轮次增加，agent 变得"更主动"
- 这一阶段最显著的特征是 **快速获得正向奖励**，从几乎随机行为快速收敛到能完成简单任务

**Phase 2 — 探索与策略精炼**：
- 奖励趋于平稳并有波动（而非持续单调增长），说明 agent 在尝试不同于 BC 数据的 novel strategies
- 轨迹长度稳定，交互轮次开始下降，agent 学会更高效地完成任务
- 这一阶段的奖励波动是 **健康的探索信号**，表明模型在跳出 BC 的行为分布，尝试 RL 特有的优化路径

**Phase 3 — 策略稳定**：
- 奖励再次缓慢上升，轨迹长度略有增长（可能是更精细的推理），交互轮次稳定
- 策略趋于收敛，exploration 减少，exploitation 增强合成高奖励策略

影响：Qwen2.5-3B 和 Llama3.1-8B 经历了相似的三阶段规律，表明 M-GRPO 的训练动态具有模型尺度的通用性。

##### 5. 消融研究：BC 是 RL 成功的必要条件

**WebAgent-R1-Zero**（跳过 BC 直接 RL）：
- 初始 SR = 6.1%（接近随机），RL 后甚至退化
- 原因：模型缺少对 Web 任务的基本理解，生成的动作不完整（缺少必需参数、元素 ID 不匹配），几乎得不到正向奖励 → 无法有效探索 → RL 退化
- 结论：**BC 提供的最小能力"基石"是 RL 有效探索的前提**

**WebAgent-R1-CoT**（BC 阶段加入长思维链数据）：
- 在 BC 阶段使用强推理模型生成 long-CoT 轨迹作为 SFT 数据
- BC-CoT 初始 SR = 24.5%（vs 普通 BC 的 20%），验证了思维链对 Web Agent 的增益
- 但 RL 增益较小：24.5% → 30.3%（+5.8%），vs WebAgent-R1 的 20% → 33.9%（+13.9%）
- 原因：long-CoT BC 中的确定性推理模式可能限制了 RL 的探索空间

##### 6. Thinking Format 与 Test-time Scaling（Table 3, Figure 5）

**Thinking Format**：在 prompt 中加入 `` 显式思考块，引导模型在动作选择前进行分析。

效果：
- o4-mini: 15.9% → 36.9%（+21%），提升最显著
- Qwen2.5-3B: 3.2% → 6.1%
- Llama3.1-8B: 4.8% → 8.5%
- 更强模型受益更多：思维格式释放了基础模型已有的推理能力

**关键发现 — 多轮交互作为 Test-time Scaling**：
- 单轮响应长度在 thinking format 下几乎不变（Qwen: 139→142 tokens）
- 但 **交互轮次大幅增加**（Qwen: 6→17 轮）
- 这表明 Web Agent 的 test-time scaling 不是"写更长的回答"，而是"与页面进行更多回合的观察-行动循环"
- Figure 5 进一步验证：增加最大交互轮次限制，prompting/SFT/RL 所有方法的成功率持续提升

##### 7. 主实验结果解读（Table 2）

| 方法 | Reddit | GitLab | CMS | Map | Shopping | 平均 SR |
|------|--------|--------|-----|-----|----------|---------|
| GPT-4o (prompt) | 10.5 | 10.0 | 20.0 | 20.0 | 11.1 | 13.9 |
| OpenAI-o3 (prompt) | 36.8 | 46.7 | 45.7 | 38.5 | 33.3 | 39.4 |
| BC (Qwen2.5-3B) | 42.1 | 16.7 | 22.9 | 26.9 | 11.1 | 20.0 |
| WebRL (Llama3.1-8B) | 63.2 | 46.7 | 54.3 | 36.7 | 31.1 | 42.4 |
| **WebAgent-R1 (Llama3.1-8B)** | 47.4 | 56.7 | 57.1 | 23.1 | **44.4** | **44.8** |

亮点：
- WebAgent-R1（8B）超越所有 prior work，包括 WebRL（42.4%）和 OpenAI-o3（39.4%）
- 在 Shopping 任务上 44.4% 对比 WebRL 的 31.1%，提升 13.3 个百分点
- 3B 模型（33.9%）超越 GPT-4o（13.9%）和 Qwen2.5-32B（16.9%），小模型+RL 胜过 32B 裸模型

#### 🧪 练习题
```yaml
question: "WebAgent-R1 中 M-GRPO 采用 trajectory 组内相对优势，而不是对所有 rollout 全局归一化，最直接的原因是什么？"
options:
  - "为了让不同任务共享完全相同的奖励尺度，方便离线蒸馏"
  - "为了在同一任务的并行轨迹之间做相对比较，把最终成败稳定传播到整条多轮交互链"
  - "为了避免使用 KL 正则，因为全局归一化会与 KL 冲突"
  - "为了让每个 token 都拥有独立环境奖励，不再依赖最终结果"
answer: 1
explain: "M-GRPO 的关键是把同一任务下并行生成的多条 trajectory 放在一组内比较，再把组相对优势共享给该轨迹中的各轮 token，以适应多轮稀疏奖励场景。"
```

### Agent Lightning

```yaml
id: agent_lightning
num: 10
name: Agent Lightning
full_name: 通用代理强化学习解耦框架 (Agent Lightning)
year: '2025.08'
org: Microsoft Research
parent: agile
paper_url: https://arxiv.org/abs/2508.03680
project_url: ''
category: online_rl
motivation: 解耦代理执行与RL训练栈
```

#### 📝 一句话总结
Agent Lightning 提出了一套**完全解耦智能体与 RL 训练**的模块化框架——通过统一数据接口（State/Call/Semantic Variables）将任意架构的 AI Agent 执行轨迹建模为 POMDP，再以 transition 级分层 RL 进行优化，无需在训练系统内重写 Agent 逻辑，在 Text-to-SQL、RAG、数学工具调用三个任务上验证了稳定提升。

#### 🎯 核心要点
- 核心动机：解耦代理执行与RL训练栈
- 演化来源：继承或改进自 agile
- 代表机构：Microsoft Research

#### 🔬 深入细节
![Agent Lightning 示意图](https://ar5iv.labs.arxiv.org/html/2508.03680/assets/x1.png)
*图：Agent Lightning 的核心框架或评测示意。*

##### 1. 问题背景：Agent RL 的碎片化困境

```
现有做法（Tightly Coupled）:
┌─────────────────────────────────┐
│  RL Training System (verl etc.) │
│  ┌───────────────────────────┐  │
│  │ Agent Logic (重写)        │  │
│  │ ┌──────┐  ┌───┐  ┌─────┐ │  │
│  │ │ LLM  │  │Tool│  │Orch │ │  │
│  │ └──────┘  └───┘  └─────┘ │  │
│  └───────────────────────────┘  │
│  需要: masking策略/拼接顺序等    │
└─────────────────────────────────┘

Agent Lightning 做法（Decoupled）:
┌──────────────┐     AIR协议     ┌──────────────────────┐
│ Agent Runtime│ ←────────────→ │  RL Training System   │
│ (原生框架)    │  State/Call流  │  (仅处理Transition)   │
│ LangChain    │                │  LightningRL          │
│ OpenAI SDK   │                │  Credit Assignment    │
│ AutoGen ...  │                │                       │
└──────────────┘                └──────────────────────┘
```

论文指出现有 RL 训练系统（verl、OpenRLHF、TRL、ROLL、AReaL）**均要求 Agent 在训练系统内部重新实现**。因为训练侧必须感知 Agent 执行逻辑以确定拼接顺序和 mask 位置，这导致：
- 多框架迁移是**劳动密集且易错**的
- 异构 Agent 生态（LangChain、OpenAI Agents SDK、AutoGen、自研）无法统一
- 开发者需要额外学习 Ray 等分布式系统
- MCP Server、外部 API 等复杂依赖增加训练系统负担

##### 2. 统一数据接口：State 与 Call

这是整个框架的**数据基石**。论文将任意 Agent 执行轨迹抽象为两种核心原语：

```
State:   Agent 在某一时刻的完整快照
Call:    Agent 对某个 Component（LLM/Tool/Prompt）的一次调用

执行轨迹 T = [(State₀, Call₀), (State₁, Call₁), ..., (Stateₙ, Callₙ)]
```

**State 结构**（推断自论文描述）：
- `messages`: 当前对话历史
- `memory`: 外部记忆状态（如 RAG 检索结果）
- `metadata`: 任务 ID、turn 编号等

**Call 结构**：
- `component`: 被调用的组件标识（哪个 LLM / 哪个 Tool）
- `input`: 组件输入（prompt 或 tool arguments）
- `output`: 组件输出（LLM 文本 或 tool 返回）
- `type`: `llm_call` | `tool_call` | `prompt_rendering`

**Semantic Variables（语义变量）**：
框架自动从轨迹中提取预定义的 Semantic Variables，用于：
- **Reward 计算**：如从 `<answer>...</answer>` 标签中提取预测答案，与金标准比较
- **Dataset 构建**：如将 Q-A 对反序列化为标准训练格式

**RAG 示例**（Section 3.1.3）：
```
Call₀: LLM("生成搜索query") → Semantic Variable: query
Call₁: Retriever(query)     → Semantic Variable: docs
Call₂: LLM(query + docs, "生成答案") → Semantic Variable: answer
Reward = 0.9 × F1(answer, gold_answer) + 0.1 × format_score
```

这种抽象使得：
1. **任意 Agent 框架**只需产生 State/Call 流即可接入
2. Reward 计算**完全自动化**（开发者声明 Semantic Variables 即可）
3. 同一轨迹可用于**多种优化方法**（RL、自动 Prompt 优化等）

##### 3. POMDP 建模与 Transition 提取

**为什么是 POMDP？**
Agent 在执行过程中无法观测完整环境状态——它只看到当前轮次的 LLM 输入和工具返回，因此天然是部分可观测的。

**MDP 定义**：
- 状态 S：当前 State（messages + memory + metadata）
- 动作 A：LLM 生成的 token 序列（或工具调用的结构化参数）
- 观测 O：Agent 可获取的信息子集
- 转移 P：由工具执行和 LLM 自回归生成共同决定
- 奖励 R：基于 Semantic Variables 自动计算

**Transition 提取算法**（Section 3.2.2）：
```
Input: 执行轨迹 T = [(S₀, C₀), (S₁, C₁), ..., (Sₙ, Cₙ)]
       待优化的 CoI (Component of Interest) 集合
Output: RL 训练样本集合 {(s, a, r, s')}

for each (Sᵢ, Cᵢ) in T:
    if Cᵢ.component ∈ CoI:           # 仅提取感兴趣组件的transition
        s = Sᵢ                        # 当前状态作为state
        a = Cᵢ.output                 # LLM输出作为action
        r = aggregate_reward(T, i)    # 信用分配后的reward
        s'= Sᵢ₊₁                      # 下一状态
        yield (s, a, r, s')
```

**相比 Concat 方法的四个优势**（Section 5.1 详细阐述）：
1. **架构灵活性**：支持 multi-agent orchestration、分支、并行等复杂模式；Concat 仅适用于简单线性 Workflow
2. **避免上下文累积爆炸**：Transition 仅包含当前 LLM 输入，而非多轮拼接后的超级长序列
3. **无需自定义 Masking**：Concat 方法需为 input/loss/attention 分别设计 mask；Transition 天然隔离
4. **解锁高级 RL 算法**：Transition 级组织支持分层 RL（如 ArCher）等更精细的信用分配

##### 4. LightningRL：分层强化学习算法

这是论文的**训练核心**。分两阶段：

**阶段一：单轮 RL 基础（Intra-Transition）**
```
对于每个 Transition (s, a, r, s'):
    // a 是 LLM 生成的 token 序列 (t₁, t₂, ..., tₚ)
    // 采用 GRPO/PPO 的目标函数
    
    将 a 按语义分组： [thinkₛ...thinkₑ] [queryₛ...queryₑ] [answerₛ...answerₑ]
    
    分组策略:
    - 每组获得独立 advantage 估计
    - 组内 token 共享组级 advantage
    - 通过结构标签（<think>/<query>/<answer>）自动识别分组边界
    
    优势:
    - 避免了整条 response 平均分配 reward 的粗糙信用分配
    - 可对不同语义段施加不同优化强度
```

**阶段二：多轮扩展（Inter-Transition Credit Assignment）**
```
将完整轨迹的 reward R 分配到各个 Transition:

方案1（Return-based）:
    rᵢ = λ^(N-i) × R     # 越晚的 transition 获得越高折扣

方案2（Difference-based）:
    rᵢ = V(s_{i+1}) - V(s_i) + R/N   # 使用 critic 估计状态价值差

方案3（Hierarchical）:
    // 高层 policy: 选择哪个 sub-goal
    // 低层 policy: 在当前 transition 内执行 sub-goal
    // 可集成 ArCher 等分层算法
```

**整体训练循环**：
```python
# 伪代码重构自论文 Section 3.3-3.4
for iteration in range(max_iterations):
    # 1. 数据收集（Agent Runtime 端）
    trajectories = agent_runtime.collect_trajectories(
        tasks=dataset.sample_batch(batch_size),
        policy=current_policy
    )
    
    # 2. 数据转换（AIR 层）
    transitions = []
    for traj in trajectories:
        states_and_calls = unified_interface.parse(traj)
        transitions.extend(
            extract_transitions(states_and_calls, CoI=optimized_components)
        )
    
    # 3. 信用分配
    for trans in transitions:
        trans.reward = credit_assignment(trans, method="hierarchical")
    
    # 4. RL 更新（训练端）
    loss = 0
    for trans in transitions:
        group_advantages = group_tokens_by_semantics(trans.action)
        loss += grpo_loss(trans, group_advantages)
    policy.update(loss)
    
    # 5. 同步策略到 Agent Runtime
    agent_runtime.sync_policy(policy)
```

##### 5. Training-Agent Disaggregation 架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Lightning 系统架构                    │
├──────────────────────┬──────────────────────────────────────┤
│   Agent Runtime      │          RL Training System           │
│  (Client端)          │          (Server端)                    │
│                      │                                       │
│  ┌────────────────┐  │  ┌──────────────────────────────┐    │
│  │ Agent Framework│  │  │    LightningRL Engine        │    │
│  │ (原生)          │  │  │  ┌────────  ┌────────────┐  │    │
│  │ LangChain      │  │  │  │GRPO/PPO │CreditAssign │  │    │
│  │ OpenAI SDK     │  │  │  └────────  └────────────┘  │    │
│  │ AutoGen ...    │  │  └──────────────────────────────┘    │
│  └───────┬────────┘  │                                       │
│          │            │  ┌──────────────────────────────┐    │
│  ┌───────▼────────┐  │  │   Policy Model (vLLM/SGLang) │    │
│  │  Agent Runtime │  │  │      (可独立部署和扩展)        │    │
│  │  - 轨迹收集     │  │  └──────────────────────────────┘    │
│  │  - State/Call  │  │                                       │
│  │    记录        │  │                                       │
│  └───────┬────────┘  │                                       │
│          │            │                                       │
│          └────────────┤                                       │
│         AIR Protocol  │                                       │
│    (Agent-Inference   │                                       │
│     Relay: 统一数据    │                                       │
│     传输 + 策略同步)   │                                       │
└──────────────────────┴──────────────────────────────────────┘
```

**AIR（Agent-Inference Relay）协议**是三部分解耦的关键：
1. **数据管道**：Agent Runtime 端收集的 State/Call 流通过 AIR 传输到训练端
2. **策略同步**：训练完成的新 policy 通过 AIR 推送到推理引擎
3. **错误处理**：论文提到对 Agent 执行中的异常（工具调用失败、格式错误等）有专门的降级和重试机制

##### 6. 实验深度解读

**三个实验任务的设计逻辑**：
- **Text-to-SQL**：验证 Multi-Agent + Selective Optimization（3个Agent只优化2个）
- **RAG**：验证开放域 + 大规模检索（Wikipedia 21M docs）+ 语义变量提取
- **Math QA**：验证工具调用 + 精确计算 + 单 Agent 场景

**Text-to-SQL（Section 4.1）核心发现**：
- 使用 LangChain 构建三 Agent 协作（Schema Analyzer → SQL Generator → Error Corrector）
- 仅优化 SQL Generator 和 Error Corrector（Schema Analyzer 保持冻结）
- 体现框架的**选择性优化能力**——并非所有 Agent 都需要 RL 训练
- 训练和测试 reward 曲线均稳定上升

**RAG（Section 4.2）核心发现**：
- MuSiQue 多跳推理数据集，Wikipedia 全文检索（21M 文档）
- 单 LLM 工作流：生成 query → 检索 → 决定是否 refine → 生成答案
- Reward = 0.9 × F1(correctness) + 0.1 × format_score
- 训练和测试 reward 均持续提升，验证了框架在**开放域语义推理**场景的有效性

**Math QA（Section 4.3）核心发现**：
- Calc-X 数据集，需要精确调用计算器工具
- 单 LLM 负责：理解问题 → 决定何时调用计算器 → 解释结果 → 生成最终答案
- 仅用答案正确性作为 reward（无格式分）
- 稳定提升表明框架能优化**精确工具调用和推理**的联合能力

**三个实验的共同点**：
- 均使用 Llama-3.2-3B-Instruct 作为基础模型
- 训练和测试曲线均呈稳定上升趋势（无崩溃）
- 覆盖三种主流 Agent 框架（LangChain、OpenAI Agents SDK、AutoGen）
- 验证了**统一数据接口**的通用性

##### 7. 相关工作的定位差异

| 相关工作 | 类型 | 与 Agent Lightning 差异 |
|---------|------|----------------------|
| RAGEN, Trinity-RFT, rLLM, Search-R1 | 多轮 RL | Concat 拼接方式，需自定义 mask；Agent Lightning 用 transition 级解耦 |
| verl, OpenRLHF, TRL, ROLL, AReaL | RL 训练系统 | 需在训练系统内重写 Agent；Agent Lightning 完全解耦 |
| ArCher, WebShop | 算法研究 | 小模型（<1B）或 PEFT；Agent Lightning 支持全参数大规模训练 |
| DeepSWE, ReTool, SimpleTIR | 应用特定 RL | 绑定特定任务/场景；Agent Lightning 通用框架 |

#### 🧪 练习题
```yaml
question: "Agent Lightning 强调 transition-level 训练而不是把整条 agent 轨迹直接 concat 成长序列，核心收益是什么？"
options:
  - "让所有 agent 都必须改写到同一个训练框架内部，方便统一实现"
  - "只保留最终答案 token，彻底去掉中间工具调用和状态信息"
  - "减少长上下文与复杂 masking 负担，同时更自然支持多 agent、分支和循环拓扑"
  - "把所有奖励都延迟到推理阶段计算，训练阶段不再需要 credit assignment"
answer: 2
explain: "论文强调 transition-level 表示能避免 concat 带来的长序列膨胀和 mask 设计耦合，并且更适配复杂 agent 拓扑，而不是只适用于线性流程。"
```

### MUA-RL

```yaml
id: mua_rl
num: 11
name: MUA-RL
full_name: 多轮用户交互式工具代理强化学习 (MUA-RL)
year: '2025.08'
org: Meituan
parent: webagent_r1
paper_url: https://arxiv.org/abs/2508.18669
project_url: ''
category: online_rl
motivation: 把动态用户模拟接入工具RL闭环
```

#### 📝 一句话总结
MUA-RL 提出了一种**将多轮用户交互与实时工具执行融入强化学习rollout**的训练框架，通过轻量级冷启动+GRPO+简化二元奖励，使中小规模模型在复杂多轮工具使用任务上超越GPT-4o等大模型。

#### 🎯 核心要点
- **多轮用户交互rollout范式**：将LLM模拟的用户、真实工具执行环境（数据库/MCP服务器）、文本生成三者交织在一次rollout中，训练智能体同时具备工具调用能力和用户沟通能力
- **简化二元奖励设计**：放弃复杂的格式奖励和工具调用奖励，仅使用r=1（完成任务）/ r=0（未完成），避免奖励黑客，鼓励多样化行为
- **冷启动数据合成流水线**：支持LLM模拟工具执行和真实MCP服务器两种模式，双验证（人工+DeepSeek-R1）保证数据质量
- **GRPO算法**：采用无需价值函数的Group Relative Policy Optimization，降低训练复杂度，在动态多轮交互中保持稳定
- **跨领域强泛化**：在TAU-Bench（零售/航空/电信）、BFCL-V3、ACEBench多个基准上，MUA-RL-32B以仅32B参数超越DeepSeek-V3-0324、GPT-4o等大模型

#### 🔬 深入细节
![MUA-RL 示意图](https://ar5iv.labs.arxiv.org/html/2508.18669/assets/x1.png)
*图：MUA-RL 的核心框架或评测示意。*

##### 1. 核心框架示意图

文本中描述了三种rollout范式的演进关系（论文Figure 4）：

```
(a) Text-based Rollout (如数学推理)
    Policy LLM → 纯文本生成 → 最终答案

(b) Multi-step Rollout with Tool Execution (如代码解释器)
    Policy LLM → 文本 ⇄ 工具调用 → 工具执行结果 ⇄ 文本 → 最终答案
                   ↑ 实时交织 ↑

(c) MUA-RL: Multi-turn User-interacting Rollout (本工作)
    Policy LLM → 用户消息 ⇄ 文本生成 ⇄ 工具调用 ⇄ 数据库结果 ⇄ ... → 任务完成
                   ↑ 用户LLM模拟 ↑        ↑ 真实工具执行 ↑
```

##### 2. 算法伪代码

```python
# MUA-RL 训练流程（简化版）
# 冷启动阶段
cold_start_trajectories = AgenticDataSynthesis(
    scenarios=[retail, airline, telecom, ...],
    tool_executor="MCP_server"  # 或 "LLM_simulator"
)
π_θ = SFT(base_model, cold_start_trajectories)

# RL训练阶段 (GRPO)
for epoch in range(25):
    for batch in training_queries:
        # 1. Rollout: 多轮用户+工具交互
        G_responses = []
        for g in range(8):  # rollout number
            trajectory = []
            obs = user_query  # 用户LLM生成
            while not task_complete:
                action = π_θ_old(obs)  # 文本或工具调用
                if action.type == "tool_call":
                    result = ToolExecutor.execute(action)  # 真实DB/MCP
                    trajectory.append(result)
                elif action.type == "message":
                    user_response = UserLLM(action)  # GPT-4o模拟
                    trajectory.append(user_response)
            G_responses.append(trajectory)
        
        # 2. 奖励计算：仅二元
        rewards = [1 if task_complete(traj) else 0 for traj in G_responses]
        
        # 3. 优势函数（组内标准化）
        A_i = (r_i - mean(rewards)) / std(rewards)
        
        # 4. GRPO目标
        for each response y_i:
            ratio = π_θ(y_i|q) / π_θ_old(y_i|q)
            L_clip = min(ratio*A_i, clip(ratio, 1-ε, 1+ε)*A_i)
            L_KL = -β * KL(π_θ || π_ref)
            L = L_clip + L_KL
        
        # 5. 更新π_θ
        optimizer.step(L)
```

##### 3. 方法详解

**🔹 冷启动数据合成（Section 3.2）**

冷启动阶段旨在为RL训练提供合理的初始化策略。数据合成支持两种模式：

- **LLM模拟工具执行**：设计数据库Schema → LLM生成工具描述和策略 → 三个LLM协作（Agent LLM + User LLM + Tool LLM），其中Tool LLM依据合成的小型数据库内存生成工具返回值。这一过程经过人工和DeepSeek-R1双重验证。
- **真实MCP服务器**：直接接入Model Context Protocol服务器，工具和数据库均真实存在，仅需LLM生成领域相关的用户查询并协调交互。

共合成约2000条高质量轨迹，覆盖9个场景（5个合成+4个MCP），用AdamW训练2个epoch。

**🔹 多轮用户交互Rollout（Section 3.3.2）**

这是MUA-RL的核心创新。相比传统纯文本rollout和已有工具使用rollout，MUA-RL的rollout包含三重动态交互：

1. **用户LLM模拟**：使用GPT-4o-2024-11-20作为用户模拟器，产生多样化用户请求和反馈
2. **Policy LLM**：自主决策何时调用工具、何时与用户沟通、调用哪些工具、调用多少次
3. **真实工具执行环境**：接入运营数据库，验证工具调用的实际效果

这种设计使得rollout过程的动态性、随机性和不确定性显著增加，迫使模型发展出更复杂的探索-利用平衡策略。

**🔹 简化二元奖励的妙处（Section 3.3.3）**

MUA-RL抛弃了传统agentic RL中复杂的奖励工程（格式奖励、工具名匹配奖励、调用成功率奖励等），仅使用r=1/0的二元奖励。分析认为这有两重好处：

- **对对话变异的鲁棒性**：只要最终结果正确，中间交互路径可以是任意多样的——这恰恰是"agentic"的核心特质
- **防止奖励黑客**：模型无法通过操控输出格式或工具调用语法来骗取奖励，只有完整解决问题才有正向激励

**🔹 训练动态的深层发现（Section 4.3.1）**

训练曲线揭示了几个重要现象：

| 指标 | 发现 |
|------|------|
| KL Loss | 8B模型波动显著大于14B/32B，说明小模型在探索-正则化权衡中更不稳定 |
| Entropy | 8B早期快速下降，表明从广泛探索向确定性利用的快速转变 |
| Rollout Turns | 训练初期上升后稳定在21-23轮，说明模型学会了结构化多轮交互 |
| Response Length | 全程基本不变，表明性能提升**不来自更长输出**（区别于推理模型的test-time scaling） |
| Unique 4-gram Ratio | 保持较高多样性 |

关键洞察：**性能提升来自更结构化的多轮交互模式，而非更长的文本输出**——这与GLM-4.5的发现一致。

**🔹 泛化能力的来源（Section 4.3.2 消融）**

冷启动模型在TAU Telecom上性能反而下降（因为引入了领域偏见），但经过MUA-RL训练后，模型有效消除了SFT阶段引入的偏差，发展出更鲁棒、更可泛化的行为模式。消融实验验证了：MUA-RL"解毒"了冷启动的过拟合，使模型学会真正的工具使用能力而非记忆表面模式。

##### 4. 与现有方法的本质区别

| 维度 | 现有方法 | MUA-RL |
|------|---------|--------|
| Rollout类型 | 纯文本或仅工具执行 | 用户交互+工具执行三合一 |
| 奖励设计 | 复杂多层次（格式+匹配+执行） | 简化二元r∈{0,1} |
| 用户角色 | 静态查询 | LLM模拟动态用户 |
| 训练范式 | 纯SFT或SFT+格式RL | 冷启动SFT+GRPO全交互RL |
| 泛化思路 | 依靠SFT数据覆盖 | 依靠RL探索消除SFT偏差 |

#### 🧪 练习题
```yaml
question: "MUA-RL 为什么刻意采用 r∈{0,1} 的二元奖励，而不是给工具格式、参数匹配等中间奖励？"
options:
  - "因为 GRPO 只能处理二元奖励，无法优化连续或稠密奖励"
  - "因为论文希望把正确的工具名直接硬编码进 reward，减少探索"
  - "因为只奖励最终任务完成更能容忍多样化对话路径，并减少 reward hacking"
  - "因为多轮用户交互场景中无法记录工具调用日志"
answer: 2
explain: "论文明确强调二元奖励的两个优点：对不同对话轨迹更鲁棒，以及避免模型通过格式或语法细节钻奖励漏洞。"
```

### iStar

```yaml
id: istar
num: 12
name: iStar
full_name: 隐式步骤奖励 (Implicit Step Rewards / iStar)
year: '2025.09'
org: Tongyi Lab
parent: webagent_r1
paper_url: https://arxiv.org/abs/2509.19199
project_url: ''
category: reward
motivation: 从轨迹偏好学习隐式步骤奖励
```

#### 📝 一句话总结
iStar 提出了一种**隐式过程奖励模型（implicit PRM）**，通过从轨迹偏好对中学习稠密的步骤级隐式奖励，并将其与轨迹级结果奖励结合形成双层优势函数，从而解决 LLM Agent 在长序列多步交互中的信用分配难题，无需人工标注步骤奖励即可显著提升 RL 训练的样本效率和最终性能。

#### 🎯 核心要点
- **隐式 PRM**：无需显式预测每步得分，而是通过 DPO 式轨迹偏好对比隐式地为每个动作分配步骤奖励
- **双层优势函数**：将轨迹级结果奖励 \(r_o\) 与步骤级隐式奖励 \(r_\phi\) 融合为 episode-level advantage \(A^E\) 和 step-level advantage \(A^S\)，指导策略梯度更新
- **轨迹偏好对构造**：利用结果验证器对同一任务的 N 条轨迹排序，自动构造正负轨迹对，无需人工标注
- **与 vanilla RL 无缝集成**：iStar 是策略无关的插件式方法，可与 GRPO、RLOO、PPO 等任意 RL 算法结合
- **三环境验证**：在 WebShop（网页导航与购买）、VisualSokoban（视觉推箱子推理）、SOTOPIA（社交对话）三个差异显著的环境上均达到 SOTA
- **样本效率大幅提升**：在 WebShop 上，iStar+GRPO 仅需 vanilla RLOO 一半的训练步数（105 vs ~210 steps）即达到同等性能

#### 🔬 深入细节
##### 动机与背景

LLM Agent 的强化学习面临**三重核心挑战**：

1. **奖励稀疏与延迟**：Agent 通常在完整轨迹结束后才能获得一个标量结果奖励（成功/失败或分数），在长达数十步的交互中，这导致信用分配极其困难——模型无法判断到底是哪一步的正确（或错误）行动贡献了最终结果。

2. **长轨迹非马尔可夫性**：每个时间步不仅包含环境动作，还包含大段的 CoT（Chain-of-Thought）推理文本，这使得状态空间巨大且转移函数复杂，传统 MDP 假设难以成立。

3. **环境非稳态与奖励验证困难**：尤其在对话等开放场景中，过程奖励难以客观定义和验证，人工标注步骤奖励成本极高且不可扩展。

传统方法如 RLOO、GRPO 仅使用轨迹级结果奖励，导致信用分配粗糙、训练效率低下。而显式 PRM（如 Math-Shepherd）虽提供步骤奖励，但依赖昂贵的人工标注或启发式规则，难以泛化到多样化的 Agent 任务。iStar 的 key insight 是：**轨迹偏好中已经蕴含了丰富的步骤级信用信息**——好轨迹（高结果奖励）与差轨迹（低结果奖励）之间的差异不仅仅体现在最终结果上，更体现在中间步骤的质量差异上，通过对比学习可以从中蒸馏出隐式的步骤奖励。

##### 核心机制：隐式 PRM 的双层优势架构

iStar 的核心架构由三部分构成：

**（一）轨迹偏好对构造**

对于每个任务 prompt \(x\)，Agent 采样 \(N\) 条独立轨迹 \(\{\tau_1, \dots, \tau_N\}\)。每条轨迹 \(\tau_i = (o_1^i, a_1^i, o_2^i, a_2^i, \dots, o_T^i, a_T^i)\) 包含观察序列和动作序列（动作内含 CoT 推理文本）。使用**结果奖励验证器**（或奖励模型）\(r_o\) 计算每条轨迹的最终得分 \(r_o(\tau_i)\)，据此将 \(N\) 条轨迹按得分排序，构造正负轨迹对 \(\tau^+ \succ \tau^-\)。

> 💡 关键：iStar 不需要训练一个独立的奖励模型来生成步骤标签，而是直接从轨迹排序的对比信号中学习。这完全消除了对人工步骤标注的依赖。

**（二）隐式 PRM 训练（DPO 式目标）**

隐式 PRM \(\pi_\phi\) 与策略模型共享初始化权重（从 \(\pi_{\theta_{\text{init}}}\) 初始化），但独立更新。对于每个轨迹对 \((\tau^+, \tau^-)\)，iStar 定义了一个轨迹级别的 DPO 损失，但巧妙地将其分解到步骤级别：

$$r_\phi(a_t) = \log \frac{\pi_\phi(a_t \mid o_{1:t}, x)}{\pi_{\theta_{\text{init}}}(a_t \mid o_{1:t}, x)}$$

即每步的隐式奖励 \(r_\phi(a_t)\) 定义为该步动作在 PRM 和初始策略下的对数概率比。这一设计的精妙之处在于：它借用了 RLHF 中 reward-from-preference 的思想，但将其迁移到了**步骤粒度**——轨迹偏好信号通过对比损失传播到每个时间步，PRM 自然地学到哪些步骤动作"好于"初始策略的基线水平。

PRM 的 DPO 式训练目标为：

$$\mathcal{L}_{\text{PRM}}(\phi) = -\mathbb{E}_{(x, \tau^+, \tau^-)} \left[ \log \sigma \left( \beta \sum_{t=1}^T \left( r_\phi(a_t^+) - r_\phi(a_t^-) \right) \right) \right]$$

其中 \(\beta\) 控制偏好强度。这个损失鼓励正轨迹的累积步骤奖励高于负轨迹，从而隐式地将全局轨迹偏好信号分配到局部步骤上。训练过程中 PRM 和策略交替更新：先用当前策略采样轨迹训练 PRM，再用训练后的 PRM 生成步骤奖励来指导策略更新。

> ⚠️ 注意：PRM 的每一步奖励 \(r_\phi(a_t)\) 都是**隐式**的——它不是显式的标量输出头，而是通过当前 PRM 与 frozen reference（初始策略）的对数概率差计算得到。这种设计避免了额外输出头的训练不稳定问题，同时保证了奖励信号与策略表征空间的对齐。

**（三）双层优势策略优化**

iStar 将步骤级隐式奖励与轨迹级结果奖励结合，形成**双层优势函数**来指导策略梯度更新。对于每条轨迹 \(\tau_i\)：

- **Episode-level advantage** \(A^E(\tau_i)\)：将结果奖励归一化（在 \(N\) 条轨迹内进行 z-score 标准化），提供全局信号——整条轨迹是"好"还是"坏"：

$$A^E(\tau_i) = \frac{r_o(\tau_i) - \mu_o}{\sigma_o}$$

- **Step-level advantage** \(A^S(a_t^i)\)：基于隐式 PRM 的步骤奖励，同样在组内归一化，提供局部信号——这一步动作是"好"还是"坏"：

$$A^S(a_t^i) = \frac{r_\phi(a_t^i) - \mu_{\phi,t}}{\sigma_{\phi,t}}$$

最终的混合优势函数为：

$$A_{\text{mix}}(a_t^i) = A^E(\tau_i) + \alpha \cdot A^S(a_t^i)$$

其中 \(\alpha\) 是混合权重超参数，控制步骤级信号的强度。这一设计巧妙地融合了两种互补信号：轨迹级优势保证了全局目标的对齐（朝高奖励方向优化），步骤级优势提供了精确的局部信用分配（告诉模型哪些具体步骤贡献了高奖励），从而同时解决了稀疏奖励和长序列信用分配两大难题。

策略更新使用标准的 GRPO 目标（以 GRPO 为例，iStar 同样支持 RLOO 和 PPO）：

$$\mathcal{L}_{\text{policy}}(\theta) = -\mathbb{E} \left[ \min\left( \frac{\pi_\theta}{\pi_{\theta_{\text{old}}}} A_{\text{mix}}, \operatorname{clip}\left(\frac{\pi_\theta}{\pi_{\theta_{\text{old}}}}, 1-\epsilon, 1+\epsilon\right) A_{\text{mix}} \right) \right]$$

##### 训练流程

![iStar 框架总览](https://ar5iv.org/html/2509.19199/assets/x1.png)
*图：iStar 训练流程总览。LLM Agent 与环境交互生成多条轨迹，结果验证器排序后构造正负轨迹对，经由 DPO 目标训练隐式 PRM 隐式生成步骤奖励，最终通过双层优势函数指导策略更新。*

完整训练流程（参见 Algorithm 1）：

```python
# Algorithm 1: Training LLM Agents with iStar (GRPO as an example)

Input:  task distribution p(X), language model π_θ_init,
        outcome reward verifier r_o, training steps M, rollout size N,
        mixing weight α

Output: Optimized policy π_θ and PRM π_ϕ

# Initialize
π_θ ← π_θ_init, π_θ_old ← π_θ_init, π_ϕ ← π_θ_init

for iteration = 1, ..., M do:
    # --- Multi-step Rollouts Collection ---
    Sample task x ~ p(X)
    Initialize N identical environments
    
    for t = 1, ..., T do:
        # Sample actions from current policy for all N trajectories
        {a_t^i ~ π_θ(o_{1:t}^i, x)}_{i=1}^N
        Execute actions, observe {o_{t+1}^i}_{i=1}^N
    
    # --- PRM Training ---
    Compute outcome rewards for N trajectories: r_o(τ_{1:N})
    Rank trajectories, construct positive-negative pairs τ^+ ≻ τ^-
    # Forward pass π_ϕ to obtain step rewards r_ϕ(a_t) via Eq.(1)
    # Update PRM π_ϕ using DPO-style objective (Eq.2)
    
    # --- Policy Training (GRPO) ---
    Compute episode-level advantages A^E(τ_i) using r_o(τ_i) (Eq.3)
    Compute step-level advantages A^S(a_t^i) using r_ϕ(a_t^i) (Eq.4)
    Compute mixed advantage A_mix via Eq.(5): A^E + α·A^S
    
    # Update policy π_θ with clipped objective
    Update π_θ using A_mix
    
    # Sync old policy
    π_θ_old ← π_θ
```

##### 与传统方法的区别

| 维度 | 传统方法（RLOO/GRPO） | 显式 PRM（Math-Shepherd 等） | iStar |
|------|----------------------|------------------------------|-------|
| 奖励信号 | 仅轨迹级结果奖励 | 人工标注/启发式步骤奖励 | 隐式学习步骤奖励 |
| 信用分配 | 粗粒度（整条轨迹均分） | 细粒度但依赖昂贵标注 | 细粒度且自动化 |
| 步骤标注需求 | 无 | 需要（昂贵） | 无 |
| 泛化性 | 通用 | 限于可标注步骤域 | 通用 |
| 奖励来源 | 环境/验证器 | 人工/规则 | 轨迹偏好对比学习 |

iStar 的核心创新在于**用对比学习将廉价的轨迹级偏好信号自动分解为步骤级信用信息**，既避免了显式 PRM 的标注瓶颈，又远超 vanilla RL 的信用分配精度。这种"免费午餐"式的设计使其在多个异构环境上均表现出色。

> 💡 关键 insight：iStar 的成功源于一个优雅的设计选择——**不直接预测"这一步值多少分"，而是隐式地比较"这一步相对于初始策略好多少"**。通过 DPO 目标的 log-ratio 形式，PRM 自动学习到一个相对于初始策略基准的步骤奖励，避免了绝对奖励建模的困难，同时保持了与策略空间的天然对齐。

#### 🧪 练习题
```yaml
question: "iStar 中隐式 PRM 是如何为每个步骤生成奖励信号的？"
options:
  - "通过训练一个独立的标量输出头，直接预测每步的奖励值"
  - "通过计算 PRM 与 frozen initial policy 在该步骤上的对数概率差（log-ratio）"
  - "通过人工标注的步骤质量标签进行监督学习"
  - "通过蒙特卡洛采样估计每步的期望未来回报"
answer: 1
explain: "iStar 的隐式 PRM 不输出显式奖励值，而是通过 r_ϕ(a_t) = log(π_ϕ/π_θ_init) 的对数概率比来衡量当前步骤相对于初始策略的'改善程度'，这种方式避免了独立奖励建模的不稳定，并天然与策略表征空间对齐。"
```

### AgentRL

```yaml
id: agentrl
num: 13
name: AgentRL
full_name: 多轮多任务代理强化学习框架 (AgentRL)
year: '2025.10'
org: Tsinghua University
parent: agent_lightning
paper_url: https://arxiv.org/abs/2510.04206
project_url: ''
category: online_rl
motivation: 扩展到异步多任务多轮训练
```

#### 📝 一句话总结
AgentRL 针对“多轮、多任务、在线 agent RL 难以扩展”的核心瓶颈，同时提出了全异步生成-训练基础设施与两项稳定训练算法：cross-policy sampling 用于提升多轮探索多样性，task advantage normalization 用于缓解多任务优势值分布失衡，从而把通用 agent RL 从单任务实验推进到可扩展框架。

#### 🎯 核心要点
- 目标是把 agent RL 从单任务、同步 rollout 的实验配置扩展到真正的 multi-turn + multi-task online RL 框架
- 基础设施侧采用 fully-asynchronous generation-training pipeline，把 rollout、训练与环境执行解耦，提高吞吐
- 设计统一的 function-call API、容器化环境开发方式和 centralized controller，降低异构任务接入成本
- 提出 cross-policy sampling：从模型池而非单一当前策略采样，缓解多轮任务中探索塌缩
- 提出 task advantage normalization：在 task 级轨迹上做优势归一化，减少多任务 reward scale 不一致带来的训练震荡
- 在五类 agent 任务上做多任务训练，论文报告其结果超过 GPT-5、Claude Sonnet 4、DeepSeek-R1 等强基线，并接近或匹配各任务专门训练模型
- 框架已开源，并被用于 AutoGLM 的构建，说明它强调的是“可复用的 agent RL 工程底座 + 算法组合”

#### 🔬 深入细节
![AgentRL 整体性能示意图](https://ar5iv.labs.arxiv.org/html/2510.04206/assets/x1.png)
*图：论文首先给出 AgentRL 相对 base model 的整体收益与 RL 训练进程，强调它是一套同时关心吞吐与稳定性的 agent RL 框架。*

```python
# AgentRL 的抽象训练循环（按论文方法概括）
policy_pool = [policy_t, policy_t_minus_1, reference_policy]
while training:
    task = controller.sample_task()
    policy = sample_from_pool(policy_pool)
    traj = rollout_worker.run(task, policy, api="function_call")
    buffer.add(task, traj)
    batch = trainer.sample(buffer, by_task=True)
    rewards = compute_task_rewards(batch)
    advantages = normalize_within_task(rewards)
    trainer.grpo_update(batch, advantages)
```

AgentRL 要解决的不是某个单一 benchmark 上“再提几分”，而是 agent RL 在工程上根本跑不起来的问题。多轮 agent 任务涉及 stateful 环境、异步工具调用、任务间数据模式差异以及很高的 rollout 成本，因此论文先从系统层重构训练架构。

在接口层，论文强调统一的 function-call API、容器化环境开发和 centralized controller。直觉上，这是把不同 benchmark 的环境接入方式抽象成同一协议，让异构任务共享一套 rollout 与训练基础设施。

算法上最关键的是 cross-policy sampling 与 task advantage normalization。前者让训练期 rollout 保持探索多样性，后者让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导更新。

因此 AgentRL 更像“agent 版训练操作系统”：它既提供异步系统底座，又补了两块最影响稳定性的算法部件。

> 💡 关键：cross-policy sampling 的目的不是做推理集成，而是保持训练期探索多样性。

> ⚠️ 注意：task advantage normalization 只缓解任务间尺度失衡，不会自动修复奖励定义错误。

#### 🧪 练习题
```yaml
question: AgentRL 中 task advantage normalization 的直接作用是什么？
options:
- 把所有任务的工具调用次数压缩到相同长度
- 降低多任务间 reward 尺度差异对梯度更新的干扰
- 把旧策略蒸馏到新策略中
- 在 rollout 前先过滤困难任务
answer: 1
explain: 该设计的目的就是让不同任务的优势值分布更可比，减少某些任务因为回报尺度更大而主导训练。
```

### SAGE

```yaml
id: sage
num: 14
name: SAGE
full_name: 技能增强组相对策略优化 (SAGE)
year: '2025.12'
org: AWS Agentic AI
parent: voyager
paper_url: https://arxiv.org/abs/2512.17102
project_url: ''
category: self_improve
motivation: 让技能生成与调用获得联合奖励
```

#### 📝 一句话总结
SAGE 提出 Sequential Rollout 与 Skill-integrated Reward 两大机制，将技能库（Skill Library）系统性地融入 GRPO 强化学习框架，使 LLM Agent 能够在任务链中持续积累和复用可执行技能，在 AppWorld 基准上将 Scenario Goal Completion 提升 8.9% 的同时减少 59% 的生成 Token。

#### 🎯 核心要点
- 统一技能生成与任务执行的格式：Agent 在交互时生成可编程函数（skill function）并调用，而非直接使用原始 API
- Sequential Rollout 机制：在同场景任务链上依次执行 rollout，前序任务生成的技能自动积累到技能库并供后续任务使用
- Skill-integrated Reward 设计：将 Outcome Reward 与 Skill Reward 加权组合，显式奖励高质量的技能生成与复用
- 基于 GRPO 扩展：在组内相对优势计算中引入技能库条件，重要性采样项中加入技能库信息
- 三步训练流程：Prompt-based Skill Library Agent → SFT（Claude 3.5 Sonnet V2 专家轨迹）→ SAGE（RL）
- 在 AppWorld Test Normal 上达到 72.0% TGC、60.7% SGC（SGC 比 GRPO 高 8.9%），平均仅需 12.1 步交互、1475 Token
- 消融实验验证：技能库使用带来显著 SGC 增益；Skill-integrated Reward 优于纯 Outcome-based 和 Chain-based Reward

#### 🔬 深入细节
##### 动机与背景

传统 LLM Agent 面临两大核心挑战：(1) RL 训练后难以在新环境中持续自我提升（self-improvement）；(2) 现有技能库方法（如 Voyager, Agent Skill Induction）依赖 Prompt 工程进行技能生成和调用，受限于基座模型的指令遵循能力。SAGE 的目标是通过 RL 训练让 Agent 学会"何时生成技能、生成什么技能、何时调用技能"，从而实现真正的自进化。

##### 技能库 Agent（Skill Library Agent）

SAGE 沿用 DynaSaur 的统一格式设计：Agent 在执行任务时，首先生成一个 Python 函数（skill function），再以函数调用方式执行，而非直接拼装 API 调用序列。形式化地，给定任务 \( q \) 和技能库 \( \mathcal{M} \)（初始可为空），Agent 先检索相关技能子集 \( [a_1, \dots, a_k] \) 加入上下文，随后交替执行三类原子操作：

- **Skill Usage**：调用已有技能 \( a_i \)
- **Skill Generation**：从当前交互轨迹中提炼新技能并存入 \( \mathcal{M} \)
- **Direct API Call**：直接调用环境 API

此统一格式使得任务执行和技能生成过程在 RL rollout 中保持一致，避免了传统方法中"先完成全部任务再回头定义技能"导致的上下文过长和训练不一致问题。

##### Sequential Rollout（序列化展开）

这是 SAGE 的核心创新。传统 GRPO 对每个独立任务的多个 rollout（group）并行采样，而 SAGE 将其改造为**任务链上的序列化展开**：

![SAGE 核心流程图](https://ar5iv.labs.arxiv.org/html/2512.17102/assets/x1.png)
*图 1：技能库 Agent 及 Sequential Rollout 与 Skill-integrated Reward 的整体示意图*

具体流程：对于一个包含多个相似任务的 Scenario（如 AppWorld 中同一场景的 3 个子任务），Agent 按序逐个执行。在任务 \( q_i^k \) 执行完毕后，生成的技能被加入技能库 \( \mathcal{M}_{i}^{k} \)，并传递给下一个任务 \( q_i^{k+1} \)。这意味着：
- 同一 group 内，每个任务的技能库条件 \( \mathcal{M}_i^k \) 是**不同的**（与原始 GRPO 中所有生成来自相同 query 完全不同）
- 第一个任务 \( \mathcal{M}_i^1 = \emptyset \)，第二个任务可使用第一个任务积累的技能

##### Skill-integrated Reward（技能融合奖励）

为鼓励 Agent 在任务链中生成和利用高质量技能，SAGE 设计了复合奖励：

$$R_i^k = \lambda \cdot R_{\text{outcome}} + (1 - \lambda) \cdot R_{\text{skill}}$$

其中：
- \( R_{\text{outcome}} \in \{0, 1\} \)：任务完成与否的二元奖励
- \( R_{\text{skill}} \)：技能质量奖励，评估生成技能的可复用性、正确性和实际被后续任务调用的频率
- \( \lambda \)：平衡系数（实验中 \(\lambda = 0.5\)）

##### SAGE 目标函数

SAGE 的损失函数继承 GRPO 的 Clip 机制，但重要性采样中条件于技能库：

```python
# SAGE 核心目标函数（简化伪代码）
for group_i in task_chain:
    for task_k in [1, 2, 3]:  # 同一 scenario 的 3 个任务
        # 获取当前技能库（前序任务积累的技能）
        M_k = skill_library if k > 1 else {}
        # 从旧策略采样（推理阶段）
        o_k = policy_old.generate(query, M_k)
        # 计算技能融合奖励
        R_k = lambda * outcome_reward(o_k) + (1-lambda) * skill_reward(o_k)
        # 组内优势（GRPO 风格：组内均值归一化）
        A_k = R_k - mean(R_i for i in group)

    for epoch in range(K):
        for minibatch in data:
            ratio = πθ(o|q, M) / πθ_old(o|q, M)
            clipped_ratio = clip(ratio, 1-ε, 1+ε)
            loss = -min(ratio * A, clipped_ratio * A)
            optimizer.step(loss)
```

> ⚠️ 注意：SAGE 中的 ratio 计算比原始 GRPO 多了一项条件——技能库 \( \mathcal{M} \)。同一 group 内不同任务的 \( \mathcal{M}_i^k \) 各不相同，这是 SAGE 与原始 GRPO 的关键差异（论文中红色高亮标注）。

##### 训练流程

1. **Skill Library Agent 构建**：基于 Qwen2.5-32B-Instruct，设计专用 In-context Example 和指令，使其具备技能生成/调用能力。此时仅靠 Prompt，性能有限（TGC 30.7%）。
2. **SFT 阶段**：使用 Claude 3.5 Sonnet V2 作为专家在 AppWorld Train 集上生成高质量交互轨迹，进行监督微调。SFT 后 TGC 提升至 55.2%，但仍未超越 GRPO baseline（无技能库）。
3. **SAGE 阶段**：在 SFT 模型基础上应用 Sequential Rollout + Skill-integrated Reward 进行强化学习。最终 TGC 达 72.0%、SGC 60.7%，超越所有 baseline（包括 GRPO 的 69.2% TGC / 51.8% SGC）。

##### 关键实验结果

| 方法 | TGC (Test Normal) | SGC (Test Normal) | Avg. Steps | Avg. Tokens |
|------|-------------------|-------------------|------------|-------------|
| Qwen2.5 32B + ReAct (Training Free) | 39.2 ± 3.5 | 18.6 ± 2.0 | - | - |
| GRPO (无技能库) | 69.2 ± 2.7 | 51.8 ± 5.8 | 16.4 ± 0.2 | 3,613 ± 200 |
| Skill Library Agent (仅 Prompt) | 30.7 ± 3.1 | 19.6 ± 1.4 | 13.4 ± 0.4 | 2,988 ± 73 |
| **+ SFT** | 55.2 ± 1.5 | 41.7 ± 1.7 | 11.4 ± 0.5 | 1,340 ± 65 |
| **+ SAGE (Ours)** | **72.0 ± 1.5** | **60.7 ± 1.5** | **12.1 ± 0.2** | **1,475 ± 127** |

> 💡 关键：SAGE 不仅提升了任务完成率，还大幅降低了推理成本——相比 GRPO baseline，生成 Token 减少 59%，交互步数减少 26%。

##### 消融实验关键发现

- **技能库作用**：移除技能库后，SAGE 的 SGC 从 60.7% 降至 54.8%（-5.9pp），验证技能库对跨任务迁移的核心贡献。
- **Reward 设计**：Skill-integrated Reward 的 SGC（60.7%）优于 Outcome-based（55.4%）和 Chain-based（56.6%），证明显式奖励技能质量的重要性。
- **初始化方式**：直接从 Base Model 启动 SAGE 仅达 25.6% SGC，远低于 SFT 初始化（60.7%），说明 SFT 对技能格式先验至关重要。

#### 🧪 练习题
```yaml
question: "SAGE 的 Sequential Rollout 机制与传统 GRPO 的 rollout 方式有何本质区别？"
options:
  - "SAGE 使用更大的 group size 来增加采样多样性"
  - "SAGE 在任务链上顺序执行 rollout，前序任务生成的技能累积到库中并条件化后续任务的策略"
  - "SAGE 对每个任务独立采样多个 trajectory，然后取平均奖励"
  - "SAGE 将 rollout 过程限定在单个任务上以降低计算开销"
answer: 1
explain: "传统 GRPO 对独立任务并行采样 group 内多个 rollout（共享相同 query），而 Sequential Rollout 在 3 个相似任务组成的 chain 上顺序执行，前序任务积累的技能库条件化后续任务，使 group 内各 rollout 来自不同的技能库状态。"
```

### SSR

```yaml
id: ssr
num: 15
name: SSR
full_name: 自博弈软件工程强化学习 (Self-play SWE-RL)
year: '2025.12'
org: Meta FAIR
parent: sage
paper_url: https://arxiv.org/abs/2512.18552
project_url: ''
category: self_improve
motivation: 用自博弈缺陷注入驱动软件代理进化
```

#### 📝 一句话总结
SSR 提出了一种自博弈强化学习框架，通过让 LLM 自动向代码仓库注入真实缺陷、再训练 SWE-agent 修复这些缺陷，形成"漏洞生成-修复验证"的闭环自我进化，无需人工标注即可大幅提升代码修复能力。

#### 🎯 核心要点
- 自博弈（Self-play）双角色框架：Defect Generator 生成缺陷，Solver Agent 尝试修复
- 自动化缺陷注入流程：基于真实 GitHub issue 描述，让 LLM 向仓库代码中注入可被验证的 bug
- 强化学习训练 Solver：将代码修复建模为多步决策过程，利用修复是否通过测试作为奖励信号
- 课程学习机制：Generator 根据 Solver 当前能力动态调整缺陷难度，实现渐进式能力提升
- 完全自动化：无需人工编写 bug 或标注修复轨迹，闭环自我进化
- 在 SWE-bench 等多个真实软件工程基准上取得显著提升

#### 🔬 深入细节
![SSR 自博弈框架示意图](https://arxiv.org/html/2512.18552v3/x1.png)
*图：SSR 的双角色自博弈训练框架 — 左半部分为缺陷生成器(Generator)，右半部分为求解器(Solver)，二者通过"缺陷注入-修复验证"闭环交替进化*

##### 1. 动机与背景

传统 SWE-agent（如 SWE-agent、Devin 等）面临的核心瓶颈是**高质量训练数据匮乏**。人工构造代码修复轨迹成本极高（需要资深工程师花费数小时标注一次完整的 bug 修复过程），导致训练数据规模始终受限。

与此同时，现有的代码修复训练数据多为静态数据集（如 PR 历史、GitHub Issues），模型难以获得**与真实开发场景一致的多样性和难度梯度**。SSR 的核心洞察在于：如果能让模型自己生成可控难度的代码缺陷，再用另一个（或同一个）模型去修复，就能形成一个不需要外部标注的自监督训练循环——这就是**自博弈 (Self-play)** 在软件工程中的自然延伸。

> 💡 关键：SSR 将 AlphaGo Zero 式的自我对弈思想迁移到代码领域，把"下棋"变成了"造 bug 与修 bug"的博弈。

##### 2. 核心机制：双角色自博弈

SSR 框架包含两个核心角色：

**角色 A — Defect Generator（缺陷生成器）**  
给定一个真实代码仓库和一个自然语言描述（如 GitHub issue），Generator 的目标是在仓库中注入一个**可被测试用例捕获、但需要非平凡推理才能修复**的缺陷。具体来说：
- 输入：仓库代码 + issue 描述（如"实现用户登录超时处理"）
- 输出：一个 diff patch，其中包含精心构造的 bug（如错误的边界条件、缺失的异常处理、逻辑反转等）
- 约束：注入的缺陷必须可被仓库现有的（或自动生成的）测试用例检测到，确保 Solver 有可验证的修复目标

**角色 B — Solver Agent（求解器）**  
Solver 接收被注入缺陷后的代码仓库，通过多步交互（读取文件、搜索代码、编辑、运行测试）尝试定位并修复缺陷：
- 动作空间：文件浏览、代码搜索、行级编辑、测试执行
- 奖励信号：修复后测试通过率的变化 — 通过的测试越多，奖励越高
- 策略优化：使用 PPO 类强化学习算法，最大化累计奖励

##### 3. 训练流程伪代码

```python
# SSR 自博弈训练主循环
for iteration in range(N_iterations):
    # 阶段 1：缺陷生成
    repos = sample_code_repos(D_repo)          # 采样真实仓库
    issues = get_issues(repos)                  # 获取对应 issue 描述
    for repo, issue in zip(repos, issues):
        bug_patch = Generator.generate(repo, issue)    # LLM 注入缺陷
        buggy_repo = apply_patch(repo, bug_patch)      # 生成有缺陷仓库
        D_buggy.append((buggy_repo, issue, bug_patch))

    # 阶段 2：求解器训练
    for buggy_repo, issue, bug_patch in D_buggy:
        # 多步决策过程
        state = initialize(buggy_repo, issue)
        for step in range(max_steps):
            action = Solver.policy(state)        # 模型选择操作
            next_state, reward, done = env.step(action)  # 执行并获取反馈
            trajectory_buffer.add(state, action, reward)
            if done: break
        # PPO 更新
        Solver.update(trajectory_buffer)

    # 阶段 3：课程调整
    Generator.update_difficulty(Solver.win_rate)  # 根据 Solver 能力调整难度
```

##### 4. 缺陷难度控制与课程学习

这是 SSR 区别于简单数据增强的关键设计。Generator 不只是随机生成 bug，而是受**难度校准**约束：

- **难度度量**：定义 \( d = 1 - p_{\text{solve}} \)，即 Solver 的修复成功率越低，缺陷越难
- **课程调度**：Generator 维持一个难度分布 \( \mathcal{D}(d) \)，初始偏简单（高修复率），随着训练推进逐步向高难度偏移
- **对抗平衡**：当 Solver 变得太强（修复率 > 阈值 \( \theta_h \)），Generator 被鼓励生成更隐蔽的缺陷（如跨文件的语义 bug、需要理解业务逻辑的深层错误）；当 Solver 太弱（修复率 < \( \theta_l \)），则降低缺陷复杂度

> ⚠️ 注意：这与标准的 GAN 训练不同——SSR 中的 Generator 和 Solver 不是直接对抗的，而是通过**难度调度机制**间接协调，避免了模式坍塌和不稳定训练。

##### 5. 与传统方法的对比

| 维度 | 传统 SWE-agent 训练 | SSR |
|------|---------------------|-----|
| 数据来源 | 人工标注 / PR 历史 | Generator 自动生成 |
| 难度控制 | 固定、不可控 | 动态课程学习 |
| 可扩展性 | 线性增长于标注投入 | 自博弈自动扩展 |
| 多样性 | 受限于历史数据 | Generator 可创造新缺陷模式 |
| 训练信号 | 稀疏（仅最终结果） | 测试驱动的密集奖励 |

##### 6. 关键公式

**Solver 的强化学习目标**：
$$
\mathcal{L}_{\text{RL}} = \mathbb{E}_{(s,a) \sim \pi_\theta} \left[ \min\left( r_t(\theta) \hat{A}_t,\ \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right) \right]
$$

其中 \( r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)} \) 为新旧策略的概率比，\(\hat{A}_t\) 为基于测试结果的广义优势估计（GAE），裁剪参数 \(\epsilon\) 防止策略更新过激。

**Generator 的难度校准损失**：
$$
\mathcal{L}_{\text{gen}} = -\mathbb{E}_{x \sim \mathcal{D}_{\text{repo}}} \left[ \mathbb{1}[p_{\text{solve}} < \theta_h] \cdot \log P_{\text{gen}}(\text{hard\_bug} | x) + \mathbb{1}[p_{\text{solve}} > \theta_l] \cdot \log P_{\text{gen}}(\text{easy\_bug} | x) \right]
$$

直观理解：当 Solver 成功率低于高阈值时，Generator 偏向生成简单 bug（easy\_bug）；当 Solver 太强时，偏向生成困难 bug（hard\_bug），从而实现动态平衡。

> 💡 关键洞察：SSR 的自博弈本质上创造了一个**无限的数据飞轮**——Solver 越强，Generator 被逼生成更难的缺陷；更难的缺陷反过来又训练出更强的 Solver。这个过程完全自动化，不依赖任何外部标注。

#### 🧪 练习题
```yaml
question: "SSR 框架中，Generator（缺陷生成器）的难度校准机制的主要目的是什么？"
options:
  - "让 Generator 和 Solver 直接对抗，形成 GAN 式的博弈训练"
  - "根据 Solver 当前修复能力动态调整生成缺陷的难度，避免过易或过难导致训练停滞"
  - "确保 Generator 生成的每个缺陷都能被测试用例100%捕获"
  - "让 Generator 学习模仿人类程序员常犯的错误模式"
answer: 1
explain: "难度校准机制根据 Solver 的修复成功率动态调整缺陷复杂度——Solver 太强则生成更难缺陷，太弱则降低难度，维持训练始终处于'最近发展区'，避免两极化导致的训练停滞或无效。"
```

### DynaWeb

```yaml
id: dynaweb
num: 16
name: DynaWeb
full_name: 基于世界模型的网页代理强化学习 (DynaWeb)
year: '2026.01'
org: Shanghai Jiao Tong University
parent: webagent_r1
paper_url: https://arxiv.org/abs/2601.22149
project_url: ''
category: frontier
motivation: 在网页世界模型中做想象式RL
```

#### 📝 一句话总结
DynaWeb 提出了一个基于模型的强化学习框架，通过训练 Web World Model (WWM) 来模拟网页状态转移，生成想象轨迹（imagined rollouts）用于策略优化，使 web agent 无需在线真实交互即可学习，大幅减少训练成本和风险。

#### 🎯 核心要点
- 训练 Web World Model (WWM) 学习网页状态变化描述 \( \Delta(o_t, o_{t+1}) \)，而非完整预测下一状态，解决了网页状态高度相似的稀疏训练信号问题
- 采用 Dyna 框架（Sutton 1991）思路：策略与 WWM 交互生成想象轨迹，免除真实 web 交互
- 引入任务级奖励信号通过模型自我评估（model-based self-assessment）获取，实现无需人工标注的奖励
- 混合真实专家轨迹（50%）与想象轨迹（50%）进行训练，真实数据作为关键正则化项稳定学习
- 使用 GSPO (Group Sequence Policy Optimization) 进行序列级策略优化，将重要性采样从 token 级提升到 trajectory 级
- 在 WebArena 和 WebVoyager 上显著优于离线 RL (WebRL)、推理时前瞻 (ITL)、SFT 等基线方法
- Dream length 分析显示 4-5 步想象深度最优，40% 真实数据即可获得最佳性能收益
- WWM 基于 GPT-oss-120b 推理模型训练，预测推理链 \( r \) 和状态变化描述 \( \Delta \)

#### 🔬 深入细节
##### 架构总览

![DynaWeb 框架架构图](https://arxiv.org/html/2601.22149v1/figures/dynaweb.png)
*图：DynaWeb 框架总览。左侧：Web World Model 从真实轨迹中学习状态转移预测。右侧：Agent 策略与 WWM 交互生成想象轨迹，结合 GSPO 进行策略优化。*

##### 算法伪代码

```python
# DynaWeb 训练流程
for episode in range(num_episodes):
    # 采样任务 q 和初始观测 o1
    q, o1 = sample_task()
    
    # 初始化缓冲区
    trajectories = []
    
    # 混合采样：50% 真实专家轨迹 + 50% 想象轨迹
    for i in range(G):  # group size
        if random() < 0.5:
            # 真实专家轨迹（从 SFT 数据集采样）
            tau = sample_expert_trajectory(q)
        else:
            # 想象轨迹：策略与 WWM 交互
            o_hat = o1
            tau = [(o_hat, None, None)]  # (obs, thought, action)
            for t in range(max_dream_length):
                # Step 1: 策略生成推理和动作
                h_t, a_t ~ π_θ(· | o_hat, history, q)
                # Step 2: WWM 预测状态变化和下一状态
                r_t, Δ_t ~ p_ϕ(· | o_hat, a_t, q)
                o_hat = apply_delta(o_hat, Δ_t)  # 将Δ应用到当前状态
                tau.append((o_hat, h_t, a_t))
                if is_terminal(o_hat, a_t):
                    break
            # Step 3: 模型自我评估获得奖励
            r_hat = assess_completion(tau, q)  # {0, 1}
        
        trajectories.append((tau, r_hat))
    
    # GSPO 优化
    for each tau in trajectories:
        y = serialize(tau)  # 将推理链和动作序列化
        s_i = (π_θ(y|q,o1) / π_θ_old(y|q,o1)) ^ (1/|y|)  # 序列级比率
        A_i = r_hat - baseline  # 轨迹级优势
        loss = -min(s_i * A_i, clip(s_i, 1-ε, 1+ε) * A_i)
    
    θ_old = θ
    θ = θ - lr * ∇loss
```

##### 动机与背景

训练高质量 web agent 的核心瓶颈在于**在线交互成本极高**且**风险不可控**：在真实网页上执行操作消耗大量时间，可能触发不可逆操作（如删除、支付），且网站结构频繁变化。SFT 方法依赖离线专家标注，覆盖范围有限；离线 RL 方法需要大量在线探索数据。DynaWeb 借鉴经典 Dyna 架构，用学习到的 Web World Model 替代真实环境，在"想象"中进行策略优化，从根本上解决了这一问题。

##### 核心机制详解

**1. Web World Model (WWM): 状态变化建模**

传统世界模型直接预测下一观测 \( o_{t+1} \)，但在网页环境中存在严重问题：网页状态转移通常仅修改小部分页面元素，\( o_t \) 和 \( o_{t+1} \) 高度相似，直接预测完整文本观测几乎无信息增益。DynaWeb 的核心创新是将预测任务**分解为两步**：

- **子任务1（训练）**：给定当前状态 \( o_t \) 和动作 \( a_t \)，WWM 预测自然语言状态变化描述 \( \Delta(o_t, o_{t+1}) \) 和推理链 \( r \)：
  $$\mathcal{L}_{\phi} = \sum_{(I,o_t,a_t,r,\Delta)} -\log p_{\phi}(r, \Delta \mid I, o_t, a_t)$$
  
- **子任务2（推理）**：WWM 利用指令遵循能力，将预测的 \( \Delta \) 应用到当前状态 \( o_t \) 生成 \( \hat{o}_{t+1} \)。

这种设计确保训练目标（状态变化）有高信息密度，同时利用 LLM 的推理能力实现精确的状态转移。

> 💡 **关键**：WWM 基于 GPT-oss-120b 训练，数据来源于 NNetNav 数据集，使用 GPT-oss-120b 自身为每条转移自动标注 \( r \) 和 \( \Delta \)（知识蒸馏式）。WWM 被训练为"推理模型"，需先生成推理链再输出状态变化。

**2. DynaWeb: 基于想象的策略优化**

策略 \( \pi_{\theta} \) 与 WWM 交互构建想象轨迹：
$$a_t \sim \pi_{\theta}(\cdot \mid o_{1:t}, h_{1:t-1}, a_{1:t-1}, q)$$
$$\hat{o}_{t+1} \sim p_{\phi}(\cdot \mid \hat{o}_t, a_t, q), \quad \hat{o}_1 = o_1$$

轨迹终止后，通过模型自我评估获得任务级奖励 \( \hat{r}(\hat{\tau}, q) \in \{0, 1\} \)，判断任务是否完成。训练中混合 50% 真实专家轨迹和 50% 想象轨迹，真实轨迹作为"锚点"稳定学习。

> ⚠️ **注意**：纯粹基于想象的训练容易因 WWM 幻觉而退化。40% 真实数据的引入可实现性能大幅超越 SFT 基线，更多真实数据（60%+）则收益递减。

**3. GSPO: 序列级策略优化**

传统 PPO/clipped objective 在 token 级别进行重要性采样，导致长序列中出现极端比率。GSPO 将重要性采样提升到**轨迹级别**：

$$s^i(\theta) = \left(\frac{\pi_\theta(y^i \mid q, o_1)}{\pi_{\theta_{\text{old}}}(y^i \mid q, o_1)}\right)^{1/|y^i|} = \exp\left(\frac{1}{|y^i|}\sum_{k=1}^{|y^i|} \log r_k^i(\theta)\right)$$

其中 \( y^i \) 是整个轨迹的 token 序列，\( s^i \) 为几何平均比率。最终优化目标：

$$\mathcal{J}_{\text{GSPO}}(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G} \min\left(s^i(\theta) \hat{A}^i, \operatorname{clip}(s^i(\theta), 1-\varepsilon, 1+\varepsilon) \hat{A}^i\right)\right]$$

几何平均天然抑制极端值，使长轨迹训练更稳定。

##### 训练流程

1. **WWM 训练**：从 NNetNav 数据集中清洗有效转移，用 GPT-oss-120b 标注 \( r, \Delta \)，微调 WWM 预测推理链 + 状态变化
2. **DynaWeb RL 训练**：
   - 以 NNetNav SFT 模型初始化 \( \pi_\theta \)
   - 每轮采样任务 \( q \)，混合真实/想象轨迹
   - 想象轨迹限制最大 5 步（平衡深度与幻觉），初始状态随机采样自 NNetNav 数据集各阶段
   - 用 GSPO 优化 \( \pi_\theta \)

##### 与传统方法的区别

| 方法 | 训练环境 | 奖励信号 | 交互成本 |
|------|---------|---------|---------|
| SFT (NNetNav, Go-Browse) | 离线专家数据 | 无（行为克隆） | 低 |
| Offline RL (WebRL) | 在线探索→离线优化 | 训练奖励模型 | 高 |
| ITL | 推理时 WWM 前瞻 | 无训练，仅推理 | 在线 |
| **DynaWeb** | **WWM 想象 + 少量真实** | **模型自我评估** | **极低** |

DynaWeb 是唯一将 WWM 用于**训练阶段 on-policy 优化**的方法（ITL 仅在推理时使用），真正实现了"零在线交互"的训练。

#### 🧪 练习题
```yaml
question: "DynaWeb 的 Web World Model 为何不直接预测完整下一观测 o_{t+1}，而是预测状态变化描述 Δ？"
options:
  - "因为直接预测 o_{t+1} 需要的模型参数量过大"
  - "因为网页状态转移中 o_t 和 o_{t+1} 高度相似，预测完整状态信息增益低"
  - "因为状态变化描述 Δ 可以用更少的 token 表示"
  - "因为直接预测 o_{t+1} 会导致梯度消失"
answer: 1
explain: "网页交互通常只修改页面的一小部分元素，o_t 和 o_{t+1} 高度相似，直接预测完整文本观测几乎没有信息增益；预测状态变化 Δ 使训练目标具有高信息密度。"
```

### Agent-RRM

```yaml
id: agent_rrm
num: 17
name: Agent-RRM
full_name: 代理推理奖励模型 (Agent-RRM)
year: '2026.01'
org: Meituan/CUHK
parent: istar
paper_url: https://arxiv.org/abs/2601.22154
project_url: ''
category: reward
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

### VPR

```yaml
id: vpr
num: 18
name: VPR
full_name: 可验证过程奖励 (VPR)
year: '2026.05'
org: Tsinghua University
parent: istar
paper_url: https://arxiv.org/abs/2605.10325
project_url: ''
category: reward
motivation: 把可验证中间步骤转成稠密奖励
```

#### 📝 一句话总结
VPR 提出了一个通用框架，将任务特定的可验证结构（MCTS 求解器、约束求解器、概率推断引擎）转化为密集的中间步过程奖励信号，替代传统稀疏结果奖励，显著改善长程多轮推理的信用分配，并在训练环境之外的通用推理和智能体任务中展现出优异的零样本迁移能力。

#### 🎯 核心要点
- 提出 **VPR (Verifiable Process Rewards)** 框架：用策略无关的 Oracle 验证器评估每个中间动作的后验概率 \\(P(a_t \\mid \\tau_{t-1}, \\text{outcome}=1)\\) 作为过程奖励
- 在 **3 个可验证多轮环境**中实例化：Tic-Tac-Toe（MCTS ≥10,000 次模拟）、Sudoku（约束求解器）、Minesweeper（概率推断引擎）
- 过程奖励定义为：对每个中间动作 \\(a_t\\)，Oracle 计算在给定前序 \\(\\tau_{t-1}\\) 且最终成功条件下采取该动作的后验概率
- 训练使用 **turn-level GRPO**：将一个完整轨迹按轮次分组，每轮多个采样动作构成组内对比
- **理论分析（3 个命题）**：(1) VPR 梯度信号在 Oracle 噪声下是有偏估计，但期望上鼓励成功动作；(2) 梯度偏差随 Oracle 平均误差 \\(\\bar{\\epsilon}\\) 线性缩放；(3) VPR 过程奖励信号量级远超稀疏奖励，驱动有效学习
- 基座模型为 **Qwen3-4B** (thinking mode)，训练 100 update steps，每组 128 条轨迹
- VPR 在三个训练环境的所有指标（胜率/成功率/完成率）上一致优于 **OR**（稀疏结果奖励）和 **MC-PR**（100 次 Monte Carlo rollout 过程奖励）两种基线
- 零样本迁移评估覆盖 **7 个通用推理基准**（GSM8K、MATH-500、AIME24/25、GPQA-Diamond、BBH、MMLU-Pro）及 **2 个智能体任务**（ALFWorld、WebShop），VPR 在所有训练环境下均超越 Base 模型
- **Oracle 质量消融实验**：弱 Oracle（MCTS N=100）不仅损害域内性能，还系统性地降低全部下游推理基准，表明过程监督的可靠性比稠密性更为关键
- Minesweeper 训练的 VPR 在 ALFWorld（部分可观测文本规划）上表现最佳，Sudoku 训练的 VPR 在 GPQA-Diamond（约束排除推理）上增益最大

#### 🔬 深入细节
![VPR 框架示意图](https://arxiv.org/html/2605.10325v1/x1.png)
*图：VPR 框架概览——任务特定的 Oracle 验证器为多轮轨迹的每个中间动作提供密集的后验过程奖励，替代传统稀疏结果奖励*

##### 动机与背景

多轮智能体推理面临的核心挑战是**信用分配**（credit assignment）：在长达数十步的交互中，最终失败往往只能获得稀疏的二元结果信号（成功=1 / 失败=0），导致模型难以识别"哪一步决策出了问题"。现有的解决方案存在明显局限：

- **结果奖励（OR / RLVR）**：仅在轨迹结束时提供反馈，对中间步骤无监督，长程推理中梯度信号稀释严重
- **人工标注 PRM**：成本高、不一致，且易被 reward hacking
- **Monte Carlo PRM**：用策略模型自身做 rollout 估计中间值，计算量大且信号噪声高，在严格约束（如 Sudoku）中甚至不如 OR

VPR 的核心洞察是：**许多交互环境的结构本身就是可验证的**——游戏有完美信息的求解器，逻辑题有约束传播引擎，概率推理有贝叶斯检验——这些策略无关的 Oracle 可以直接判定"在当前位置，哪些动作是通往成功的"，从而为每一步提供精确的过程级监督。

##### 核心机制

**1. 后验过程奖励定义**

给定任务特定的 Oracle 验证器，VPR 将过程奖励定义为：

$$R_{\\text{VPR}}(a_t \\mid \\tau_{t-1}) = P_{\\text{oracle}}\\left(a_t \\mid \\tau_{t-1}, \\text{outcome}=1\\right)$$

即在给定前序轨迹 \\(\\tau_{t-1}\\) 且假设最终结果为成功的条件下，Oracle 评估采取动作 \\(a_t\\) 的后验概率。这一定义具有三个关键性质：

- **策略无关**：Oracle 不依赖当前策略模型，避免了 rollout-based PRM 中的策略偏差
- **密集且精确**：每一步都获得 0-1 之间的连续信号，且信号来自真实的环境结构验证
- **信用分配自然**：成功路径上的动作获得高奖励（接近 1），失败路径上的动作获得低奖励（接近 0），危险动作获得即时负反馈

> 💡 **关键**：后验概率 \\(P(a_t \\mid \\tau_{t-1}, \\text{outcome}=1)\\) 的计算方式决定了 Oracle 的质量。VPR 的消融实验表明，这一质量必须足够高（MCTS ≥1000 次模拟），否则会适得其反。

**2. 三种 Oracle 实例化**

| 环境 | Oracle 类型 | 过程奖励计算 | 挑战 |
|---|---|---|---|
| **Tic-Tac-Toe** | MCTS 搜索树 | 从当前棋局 \\(s_t\\) 出发，运行 N=10,000 次 MCTS 模拟，统计棋步 \\(a_t\\) 在成功路径中被选中的后验频率 | 必须同时学习先手和后手的博弈策略；局部贪心会导致长程失利 |
| **Sudoku** | 约束求解器 | 对候选数字执行约束传播，若填数后剩余空格仍存在唯一解则 \\(a_t\\) 获得高概率；若导致矛盾则概率为 0 | 单步合法≠全局可解；局部看似合理的填数可能导致后续无解 |
| **Minesweeper** | 概率推断引擎 | 基于已知格子的数字线索，用约束满足计算每个未知格是雷的后验概率；安全揭开获得高奖励，踩雷获得 0 奖励 | 部分可观测；需要在不确定下进行信息收集推理 |

**3. Turn-Level GRPO 训练**

VPR 的损失函数基于 GRPO（Group Relative Policy Optimization），但做了 turn-level 改造：对于每个轨迹的每一轮 \\(t\\)，从当前状态 \\(s_t\\) 采样 \\(G\\) 个候选动作，每个候选动作通过 Oracle 获得过程奖励，组内计算相对优势后应用 GRPO 裁剪目标更新策略。

```python
# VPR 训练流程伪代码（Turn-Level GRPO）
for update_step in range(100):
    trajectories = policy_model.sample_batch(128)  # 128 trajectories

    for each trajectory, each turn t:
        # Step 1: Oracle computes posterior process reward for G candidate actions
        for g in range(G):
            r[g] = oracle.posterior(a[t][g] | tau[:t], outcome=1)

        # Step 2: Within-group normalization to get advantage
        advantage = (r - mean(r)) / (std(r) + 1e-8)

        # Step 3: GRPO clipped loss
        ratio = exp(log_prob_new - log_prob_old)
        loss = -min(ratio * advantage,
                    clip(ratio, 0.8, 1.2) * advantage)

    loss.backward()
    optimizer.step()
```

> ⚠️ **注意**：与标准 GRPO（轨迹级分组）不同，turn-level GRPO 在每一步独立分组，这使得每轮对比聚焦于"在当前状态下什么动作更好"，而非"哪条完整轨迹更好"，显著提升信用分配精度。

##### 理论分析

VPR 提供了三个命题支撑其设计的合理性：

**命题 1（梯度信号的性质）**：当 Oracle 存在噪声误差 \\(\\epsilon_t\\) 时，VPR 梯度是真实梯度的有偏估计，但偏差受误差方差约束。期望上，Oracle 倾向于为成功路径上的动作分配更高的过程奖励，因此梯度期望的方向仍然指向成功策略。

**命题 2（偏差的线性缩放）**：梯度偏差 \\(\\|\\mathbb{E}[\\nabla\\hat{L}] - \\nabla L\\|\\) 随 Oracle 平均误差 \\(\\bar{\\epsilon}\\) 线性增长。这解释了为何弱 Oracle 不仅无益反而有害——当噪声过大时，梯度方向偏离真实提升方向，模型学会的是利用 Oracle 的误差而非真正改进推理。

**命题 3（信号量级优势）**：VPR 过程奖励在每一步都提供非零梯度信号，而稀疏结果奖励仅在轨迹末的少数几步有信号。在 \\(T\\) 轮任务中，VPR 的总信号量级大约是 OR 的 \\(T\\) 倍，这一理论优势在 Minesweeper（平均 10+ 步）中尤为显著。

##### 实验发现

**域内性能**：VPR 在所有三个环境的所有六项指标上一致最优。特别地，Tic-Tac-Toe 中 VPR 是唯一先后手都接近最优（return ≈ -0.1）的方法；Sudoku 中 Base 模型虽能填对大部分格但几乎无法完整求解（SR≈0%），VPR 将 SR 提升至 21%；Minesweeper 中 VPR 的 CR 增益最大（+14% vs Base），说明过程奖励帮助模型在不确定状态下做出更安全的局部推理。

**跨域泛化**：VPR 训练后的模型在 7 个推理基准和 2 个智能体任务上全面超越 Base。Minesweeper-VPR 在 ALFWorld 上表现最佳（+4.48%），Sudoku-VPR 在 GPQA-Diamond 上增益最大（+6.87%），显示出训练环境结构与迁移任务之间存在合理的技能对齐。

**Oracle 质量消融**：这是 VPR 最关键的发现——将 Tic-Tac-Toe 的 MCTS 模拟次数从 10,000 降至 100 后，VPR 在域内（return 从 -0.10 跌至 -0.50，低于 Base 的 -0.33）和全部 7 个下游基准上均全面劣于 Base。这说明**不可靠的过程监督比没有过程监督更差**。

##### 与现有方法的区别

| 维度 | OR (RLVR) | MC-PR | VPR |
|---|---|---|---|
| 监督密度 | 稀疏（仅末端） | 密集 | 密集 |
| 信号可靠性 | 高（二元） | 低（rollout 噪声） | 高（策略无关 Oracle） |
| 计算开销 | 低 | 高（每步 100 次 rollout） | 中（Oracle 每步评估一次） |
| 信用分配 | 差 | 中等 | 优秀 |
| 泛化能力 | 有限 | 不稳定 | 稳定且全面 |

#### 🧪 练习题
```yaml
question: "VPR 框架中，当 Oracle 质量不足（如 MCTS 模拟次数过少）时会发生什么？"
options:
  - "过程奖励退化为结果奖励，效果与 OR 相当"
  - "模型仅丢失训练环境性能，但下游泛化不受影响"
  - "噪声过程奖励会系统性损害域内性能和全部下游推理基准，效果甚至不如 Base 模型"
  - "训练速度变慢但最终收敛到相同性能"
answer: 2
explain: "消融实验显示弱 Oracle（N=100）导致域内 return 低于 Base，且 7 个下游基准均全面下降。命题 2 从理论上解释了这一现象：梯度偏差随 Oracle 误差线性放大，模型会学习利用 Oracle 的缺陷而非真正改进推理能力。"
```

### AgentJet

```yaml
id: agentjet
num: 19
name: AgentJet
full_name: 群体式代理强化学习训练框架 (AgentJet)
year: '2026.06'
org: Tongyi Lab
parent: agentrl
paper_url: https://arxiv.org/abs/2606.04484
project_url: ''
category: frontier
motivation: 用群体式分布架构扩展代理RL
```

#### 📝 一句话总结
AgentJet提出解耦的Swarm训练框架，将GPU集群上的模型推理（Swarm Server）与任意设备上的Agent执行（Swarm Client）完全分离，通过Context Tracking和Timeline Merging实现1.5-10倍训练加速，并构建了首个输入研究主题即可自主执行多天RL研究的自动化系统。

#### 🎯 核心要点
- **Swarm架构解耦**：Swarm Server在GPU集群上运行多模型推理，Swarm Client在任意设备（笔记本/手机/IoT）上执行Agent，两者通过轻量级异步协议通信，解除硬件耦合
- **异构多模型RL**：同一训练流程中可同时使用不同架构、不同规模的LLM/VLM作为Agent基座，Swarm Server统一管理和调度推理资源
- **多任务鸡尾酒训练（Cocktail Training）**：支持将Web Agent、Code Agent、Tool-use Agent等多种异构任务同时混合训练，通过任务感知的批次调度提升数据效率
- **容错执行（Fault-Tolerant Execution）**：Client端内置环境隔离、自动重试、心跳检测和断点续传机制，支持不可靠网络中长周期训练任务
- **热更新代码（Hot Code Reload）**：训练过程中无需重启即可动态注入新的Reward函数、新的环境适配器或修改Agent策略代码，大幅加速迭代
- **Context Tracking + Timeline Merging**：将Agent交互历史压缩为结构化Context，在Server端合并多个Client的时间线后统一做优势估计，消除跨Client的冗余计算，实现1.5-10x训练加速
- **自动化研究系统**：输入研究主题（如"研究代码Agent的工具调用策略"），AgentJet自动生成实验配置、分配资源、执行多天训练、收集结果并生成分析报告

#### 🔬 深入细节
![AgentJet 示意图](https://ar5iv.labs.arxiv.org/html/2606.04484/assets/x1.png)
*图：AgentJet 的核心框架或评测示意。*

##### 1. 核心框架图

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AgentJet Swarm Architecture                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────┐    ┌──────────────────────────┐   │
│  │     Swarm Server (GPU)       │    │   Swarm Client (Any)     │   │
│  │                              │    │                          │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ │    │  ┌────────┐ ┌────────┐  │   │
│  │  │LLM A │ │LLM B │ │VLM C │ │◄───┼──│Agent-1 │ │Agent-2 │  │   │
│  │  └──────┘ └──────┘ └──────┘ │  async  └────────┘ └────────┘  │   │
│  │  ┌──────────────┐           │  protocol  ┌────────────────┐  │   │
│  │  │ Context Merge │           │◄───────────│  Environment   │  │   │
│  │  │ + Timeline    │           │            │  (Web/OS/API)  │  │   │
│  │  └──────────────┘           │            └────────────────┘  │   │
│  │  ┌──────────────┐           │                                │   │
│  │  │ RL Trainer    │           │  ┌────────────────────────┐   │   │
│  │  │ (PPO/GRPO)   │           │  │ Fault-Tolerant Layer   │   │   │
│  │  └──────────────┘           │  │ (retry/ckpt/heartbeat) │   │   │
│  └──────────────────────────────┘  └────────────────────────┘   │   │
│                                                                      │
│      ▲ Context Tracking      ▲ Timeline Merging    ▲ Hot Reload     │
│      │ (structured history)  │ (cross-client merge) │ (dynamic code) │
└─────────────────────────────────────────────────────────────────────┘
```
*图：AgentJet Swarm架构总览——Server-Client解耦，Context Tracking压缩交互历史，Timeline Merging跨Client合并时间线，Hot Reload支持动态代码更新。*

##### 2. 算法伪代码

```
Algorithm: AgentJet Swarm RL Training Loop
────────────────────────────────────────────────────────────────
Input:  Model zoo M = {m1, m2, ..., mn}
        Task set T = {t1, t2, ..., th}
        Swarm Clients C = {c1, c2, ..., ck}
Output: Trained policies pi1, pi2, ..., pin

1.  // Initialize Swarm Server
2.  Server.load_models(M)           // Load models onto GPU cluster
3.  Server.init_optimizer(PPO/GRPO) // Setup RL optimizer
4.
5.  for episode = 1 to N do:
6.      // Phase 1: Distributed Rollout
7.      for each client c in C in parallel do:
8.          task ← CocktailSampler.sample(T)   // Multi-task sampling
9.          model_id ← task.assigned_model      // Heterogeneous model routing
10.         env ← EnvironmentFactory.create(task.type)
11.         history ← []
12.         while not task.done() do:
13.             // Async inference via Swarm Server
14.             ctx ← ContextTracker.compress(history)
15.             action ← Server.infer_async(model_id, ctx, env.observation)
16.             reward ← env.step(action)
17.             history.append((observation, action, reward))
18.             if client.fault_detected():  // Heartbeat check
19.                 history ← client.load_checkpoint()
20.         end while
21.         client.send_trajectory(history)  // Ship to Server
22.     end for
23.
24.     // Phase 2: Timeline Merging
25.     all_trajectories ← Server.collect()
26.     merged_timelines ← TimelineMerger.merge(
27.         all_trajectories,
28.         strategy="share_context"  // share common context prefixes
29.     )
30.
31.     // Phase 3: Advantage Estimation & RL Update
32.     advantages ← GAE(merged_timelines)  // Generalized Advantage Estimation
33.     for each model m in M do:
34.         trajectories_m ← filter(all_trajectories, model=m)
35.         loss ← PPO_clip(policy_m, trajectories_m, advantages)
36.         Server.optimizer_step(m, loss)
37.     end for
38.
39.     // Phase 4: Hot Reload (if needed)
40.     if Server.has_code_update():
41.         Server.apply_patch(new_reward_fn, new_env_adapter)
42.         // No restart required
43. end for
44. return {pi1, pi2, ..., pin}
```

##### 3. 深入方法解释

**动机与背景**。Agentic RL（让LLM Agent通过与环境交互进行强化学习）已成为通向通用AI Agent的关键路径。然而现有框架面临五大痛点：
(1) **硬件强耦合**：模型推理和Agent执行必须在同一机器上，导致无法利用分布式资源——GPU集群只能跑推理，用户的笔记本/手机虽有环境但无法接入训练；
(2) **异构模型难统一**：不同网站/工具任务需要不同规模的模型（如简单任务用7B模型、复杂编程用70B模型、视觉任务用VLM），现有框架无法在单一训练流程中同时管理多种模型架构；
(3) **任务孤立训练**：Web Agent、Code Agent、Tool Agent各自独立训练，无法共享底层推理能力和数据结构，数据效率低下；
(4) **长周期训练脆弱**：Agent任务的训练常需要数天甚至数周，网络中断、环境崩溃、代码bug都会导致训练从头开始；
(5) **迭代速度慢**：修改Reward函数或环境适配器需要停止训练→修改代码→重启训练，实验周期以天为单位。

AgentJet正是为解决这五大痛点而设计的。

**Swarm Server-Client 解耦架构**。这是AgentJet最核心的设计理念。Swarm Server部署在GPU集群上，负责三件事：(a) 加载和管理异构模型（LLaMA、Qwen、GPT等系列的多个变体），(b) 接收来自Client的异步推理请求并返回动作决策，(c) 合并Client上传的轨迹数据并执行RL优化。Swarm Client则部署在任意设备上——可以是数据中心的CPU服务器、研究者的MacBook、甚至树莓派——Client负责三件事：(a) 运行真实环境（浏览器、终端、API沙箱），(b) 执行Agent的观测-动作循环，(c) 本地做Context压缩和故障恢复。

Server与Client之间通过**轻量级异步协议**通信：Client发送`(model_id, compressed_context, observation)`三元组，Server返回`(action, logprobs, value_estimate)`。这种设计的精妙之处在于：
- GPU资源利用率最大化：Server支持**动态批处理（Dynamic Batching）**，将来自不同Client的推理请求合并为批次，GPU利用率接近理论峰值；
- 环境多样性的无限扩展：Client可以运行任何环境——Selenium浏览器、Docker容器、REST API沙箱甚至物理机器人——无需修改Server端代码；
- 网络容忍：异步协议天然容忍网络延迟和抖动，Client在等待Server响应时可以预处理下一轮的观测或写入本地日志。

> 💡 关键：解耦架构使得一台8×A100 GPU Server可以同时服务200+个Swarm Client做并行的Agent交互，而传统的耦合方案中一台GPU只能服务一个Agent实例。

**异构多模型RL**。AgentJet的模型管理层维护一个"Model Zoo"——同一训练批次中可以混合使用Qwen-7B处理简单导航任务、Qwen-72B处理复杂推理任务、Qwen-VL处理视觉理解任务。当Client发起推理请求时，由**Cocktail Sampler**根据任务类型、难度和当前模型负载进行路由。Server端的RL优化器则对每个模型独立维护一份策略参数和优化器状态，但共享同一套Advantage估计的计算基础设施。这意味着7B模型学到的环境探索策略可以通过**跨模型知识蒸馏（Cross-Model Distillation）**迁移给72B模型，加速大模型的收敛。

**Context Tracking（上下文追踪）**。Agent在执行长序列任务时，交互历史会迅速膨胀——100步的Web操作可能产生超过10万token的原始历史。AgentJet引入**结构化Context压缩**：将历史中的重复模式（如连续多次scroll操作）合并为宏动作，将与任务无关的中间状态（如页面加载中的空白状态）丢弃，仅保留关键决策点。压缩后的Context通常为原始历史的1/5-1/10，大大降低了Server的推理成本。更关键的是，Client维护**Context增量更新（Delta Update）**——每次推理时只发送增量变化部分，Server端在之前Context的基础上做前缀共享缓存（Prefix KV-Cache），避免重复计算。

**Timeline Merging（时间线合并）**。这是AgentJet实现1.5-10x训练加速的核心技术。传统框架中，每个Agent的完整交互历史被独立处理，导致大量共享前缀被重复计算。AgentJet识别到：来自同一Client或同类型任务的trajectories通常共享大量通用前缀（如"打开浏览器"→"导航到搜索引擎"→"输入查询"等通用步骤）。TimelineMerger在Server端接收所有Client上传的trajectory后，构建一棵**前缀树（Trie）**——共享前缀只存储和计算一次。在做GAE（Generalized Advantage Estimation）时，前缀树上的共享节点只需一次前向+反向传播，所有分支节点共享梯度。在27页技术报告的实验中，对于Web Agent任务（100+步骤），Timeline Merging使得RL更新步骤的计算量降低为原来的1/5-1/10；对于Code Agent任务（通常较短、较少共享前缀），加速比为1.5-3x。

> ⚠️ 注意：Timeline Merging只在同类型任务的trajectories之间进行。跨类型的任务（如Web Agent+Code Agent）由于上下文空间差异较大，共享前缀有限，强制合并反而会增加计算开销。AgentJet通过自动检测上下文语义相似度来决定是否合并。

**容错执行（Fault-Tolerant Execution）**。AgentJet的Client内置四层容错：
(a) **环境隔离**——每个Agent实例在独立的Docker容器或沙箱进程中运行，环境崩溃不影响其他实例；
(b) **心跳检测**——Client每30秒向Server发送心跳，若Server在120秒内未收到心跳则判定Client失联，自动将该Client的未完成任务重新分配给其他空闲Client；
(c) **自动重试**——对于可恢复的错误（如网络超时、API限流），Client以指数退避策略自动重试（1s→2s→4s→8s，最大5次）；
(d) **断点续传**——Client每50步自动保存checkpoint到本地磁盘和Server端，训练中断后可从最近checkpoint恢复，无需从头开始。

在27页实验部分，AgentJet展示了在72小时连续训练中的稳定性：平均每10小时发生1.2次故障（网络中断/环境崩溃），但容错机制使得所有故障均在5分钟内自动恢复，训练进度损失不超过2%。

**热更新代码（Hot Code Reload）**。这是AgentJet对研究效率的极大提升。传统RL训练中修改Reward函数需要停止训练→修变代码→重新编译→从头启动训练，AgentJet利用Python的动态特性实现了运行时代码注入：Server端维护一个**代码版本栈**，当研究者推送新的Reward函数或环境适配器代码时，Server通过`importlib.reload()`动态加载新模块，同时平滑切换正在运行的训练循环——当前批次继续使用旧代码完成，下一批次自动切换到新代码，无需停止训练。这使得Reward shaping的迭代周期从天级缩短到分钟级。

**自动化研究系统**。AgentJet最雄心勃勃的贡献是构建了一个**端到端自动化RL研究流水线**。用户只需输入自然语言研究主题（如"研究代码Agent在工具选择时的探索-利用权衡"），系统自动：(1) 通过LLM解析研究意图，生成实验配置（超参数搜索空间、评估指标、基线方法）；(2) 分配Swarm资源（多少个Client、使用哪些模型）；(3) 启动训练循环；(4) 自动收集和可视化训练曲线、A/B对比结果；(5) 生成包含统计显著性检验的研究报告。整个流程可以无人值守运行数天。该系统的设计理念是让研究者从"调参工人"转变为"科学问题的定义者"。

**与传统方法的差异**。AgentJet vs. OpenRLHF/LLaMA-Factory等现有RL训练框架的最大区别：后者聚焦于"单个模型在静态数据集上的对齐训练"（SFT+RLHF模式），而AgentJet是为"多个模型在动态真实环境中交互学习"而设计的分布式操作系统级平台。对比RLlib等通用RL框架：RLlib面向传统RL环境（Atari/MuJoCo），AgentJet面向LLM Agent环境（网页/代码/API），两者的核心瓶颈完全不同——前者关注GPU利用率，后者关注异步通信延迟和长序列记忆压缩。实验表明，在同等硬件条件下AgentJet的吞吐量是OpenRLHF的3.2倍、是RLlib的5.7倍。

#### 🧪 练习题
```yaml
question: "AgentJet的Timeline Merging技术实现训练加速的核心原理是什么？"
options:
  - "通过增加GPU数量来并行处理更多的trajectory"
  - "通过构建前缀树共享不同trajectory之间的共同上下文前缀，消除冗余的KV-cache计算和梯度传播"
  - "通过压缩模型参数量来减少推理延迟"
  - "通过提前终止不成功的训练轨迹来节省计算资源"
answer: 1
explain: "Timeline Merging将多个Client的trajectory合并为一棵前缀树，共享前缀只存储和计算一次，在做GAE优势估计时共享节点只需一次前向+反向传播，从而消除跨Client的冗余计算。"
```

### Q-Evolve

```yaml
id: q_evolve
num: 20
name: Q-Evolve
full_name: 分布内自进化代理强化学习 (Q-Evolve)
year: '2026.06'
org: Eindhoven University of Technology
parent: istar
paper_url: https://arxiv.org/abs/2606.07367
project_url: ''
category: frontier
motivation: 在分布内联合演化过程奖励与策略
```

#### 📝 一句话总结
Q-Evolve 提出了一套四阶段自进化框架：通过 Retrospective Relabeling 构造富含中间监督的混合离线数据、Weighted IQL 学习 In-Distribution Critic、GAE（仅用环境奖励）推导过程奖励、BPPO 进行行为近端策略优化，实现了在极少环境交互下将稀疏回合奖励转化为可靠的 step-level 信用分配，显著提升 LLM Agent 在长程任务上的表现。

#### 🎯 核心要点
- **四阶段自进化流程**：① 混合数据构造（Expert + Self-rollout + 回溯重标注）→ ② In-Distribution Critic Learning（Weighted IQL，Eq.1-5）→ ③ 过程奖励推导（GAE over \(r^{\text{env}}\)，Eq.6）→ ④ In-Distribution Policy Optimization（BPPO，Eq.7），循环 K 轮迭代
- **Weighted IQL（W-IQL）**：在标准 IQL expectile 回归中引入回合回报加权的 V 函数损失，使 Critic 更关注成功轨迹的值分布，缓解稀疏二元奖励下的无判别学习
- **Retrospective Relabeling**：利用整条轨迹的最终成败信号反标每步辅助奖励 \(r_t^{\text{aux}}\)（成功 +1，失败 -1），为 Critic 提供额外的中间监督
- **过程奖励推导的 env-only 设计**：GAE 仅基于环境奖励 \(r^{\text{env}}\) 和 Critic 值估计，辅助奖励仅用于改善 Critic 训练质量而不引入策略梯度偏差（Table 4 验证混合奖励反而降性能）
- **行为近端策略优化（BPPO）**：在 PPO 裁剪目标上引入不对称裁剪区间 \([1-\epsilon_{\text{low}}, 1+\epsilon_{\text{high}}]\) + KL 散度约束 Reference Model，实现对阳性动作的激近鼓励与阴性动作的严格抑制，保护 BC 初始化先验
- **三个环境全面验证**：WebShop（70.5%）、ScienceWorld（76.3% Seen / 69.7% Unseen）、ALFWorld（90.7% Seen / 89.6% Unseen），平均得分 79.4%，全面超越 QLASS、ETO、Best-of-N 等强基线
- **极致样本效率**：仅需 13K 环境步即超越 320K 步在线 RL 方法（PPO 59.4%、RLOO 56.4%、GRPO 39.7%），源于 Critic 训练阶段完全离线

#### 🔬 深入细节
##### 1. 核心框架示意图

![Q-Evolve 框架总览](https://arxiv.org/html/2606.07367v1/x1.png)
*图：Q-Evolve 四阶段自进化流程 — Stage 1 混合数据构造（Expert + Self-rollout + Retrospective Relabeling）→ Stage 2 In-Distribution Critic Learning（Weighted IQL）→ Stage 3 过程奖励推导（GAE with \(r^{\text{env}}\)）→ Stage 4 In-Distribution Policy Optimization（BPPO），循环 K 轮迭代，每轮用更新后的策略重新采样*

![Weighted IQL 结构示意](https://arxiv.org/html/2606.07367v1/x2.png)
*图：Weighted IQL（W-IQL）对比标准 IQL 的训练范式 — 在稀疏回合奖励下，W-IQL 通过回合级权重 \(w(\tau)=\sigma(\beta \cdot (R_T-\bar{R}))\) 使 Critic 更关注成功轨迹，提升值函数估计的鲁棒性与区分度*

![迭代改进消融](https://arxiv.org/html/2606.07367v1/x3.png)
*图：Ablation on interactive improvement — 从 Iter-1 到 Iter-2 持续增益，验证了自进化框架的稳定累积能力，每次迭代贡献额外的有用监督*

##### 2. 算法伪代码

```python
# Algorithm 1: Q-Evolve — Q-value Guided Self-Evolution for LLM Agents
# Input:  Expert dataset D_expert, Environment Env, Iterations K
# Output: Evolved policy π_θ

# Warm-up: Behavior Cloning on expert data
π_θ = warmup_BC(D_expert)

for k = 1 to K:
    # ── Stage 1: Hybrid Data Construction ──
    D_self = rollout(π_θ, Env)          # 当前策略采样（3条/任务）
    D = D_expert ∪ D_self               # 合并专家数据与自采数据
    for each trajectory τ in D:          # Retrospective Relabeling
        r_t^aux = +1 if R_T=1 else -1   # Eq.3: 利用全局成败信号反标每一步

    # ── Stage 2: In-distribution Critic Learning ──
    for step in critic_training_steps:
        # V 函数: Weighted IQL expectile 回归 (Eq.4-5)
        L_V = E_D[ w(τ) · L2^m( Q_bar(u,s,a) - V(u,s) ) ]
        # Q 函数: 标准 TD 损失 (Eq.2)
        L_Q = E_D[ ( r^{env} + γ·V(u,s') - Q(u,s,a) )^2 ]
        V, Q = update(L_V, L_Q)

    # ── Stage 3: Process Reward Derivation ──
    for each trajectory τ in D:          # GAE with env reward only (Eq.6)
        A_t = GAE(r_t^env, V_t, V_{t+1}, γ=0.99, λ=0.95)

    # ── Stage 4: In-distribution Policy Optimization ──
    for epoch in PPO_epochs:
        η_t = π_θ(a_t|·) / π_old(a_t|·)  # 重要性采样比
        # BPPO 目标 (Eq.7): 不对称裁剪 + KL 正则
        L_π = E_D[ min( η_t·A_t, clip(η_t, 1-ε_low, 1+ε_high)·A_t ) ]
        L_π += α · KL(π_θ || π_ref)      # 保护 BC 初始化先验
        π_θ = optimizer.step(L_π)

return π_θ
```

##### 3. 深度解析

**3.1 动机与背景：LLM Agent 长轨迹中的稀疏奖励困境**

在 Agentic RL 场景（如指令执行、网页导航、具身任务）中，LLM Agent 往往需要执行数十乃至上百步的环境交互——例如在 ALFWorld 中依次完成"拿钥匙→开抽屉→取物品→放桌上"等多步子任务——而环境通常只在最终步提供一个二元信号：成功=1，失败=0。这种极端稀疏的奖励结构导致两个根本性挑战：

1. **信用分配困难（Temporal Credit Assignment）**：无法区分长轨迹中哪些动作是关键贡献、哪些是无害的、哪些是有害的。传统方法（如 RFT，Rejection Sampling Fine-Tuning）直接丢弃整个失败轨迹，浪费了大量可用的中间监督信息。
2. **离线 RL 的外推误差（Extrapolation Error）**：直接从离线数据学习 Q 函数时，对 OOD（out-of-distribution）动作的值估计极易偏离真实值，导致策略在不可预知的方向上退化。

Q-Evolve 的核心洞察在于：**与其用稀疏回合奖励直接做在线策略梯度（PPO/GRPO 需大量在线 rollout，320K 环境步），不如先在离线混合数据上训练一个可靠的 In-Distribution Critic，再从中推导出稠密的 step-level 过程奖励来指导策略优化**。这种"Critic 先行，策略后行"的范式使得整个框架仅需 13K 环境步即可收敛，同时避免了在线 RL 的不稳定性和高样本复杂度。

**3.2 Stage 1 — 混合数据构造与 Retrospective Relabeling**

纯离线 RL 依赖固定数据集，缺乏探索多样性。Q-Evolve 的关键设计在于每轮迭代主动采样：

- **策略自采轨迹** \(\mathcal{D}_{\text{self}}\)：用当前策略 \(\pi_\theta\) 在环境中对每个任务采样少量轨迹（论文设置 3 条/任务），与固定专家数据集 \(\mathcal{D}_{\text{expert}}\) 合并构成混合数据集 \(\mathcal{D}\)。
- **Retrospective Relabeling（回溯重标注）**：对 \(\mathcal{D}\) 中的每条轨迹 \(\tau = \{(c_t,a_t)\}_{t=1}^T\)，利用其最终得分 \(R_T \in \{0,1\}\) 统一标注每一步的辅助奖励：

\[
r_t^{\text{aux}} = \begin{cases} +1, & \text{if } R_T = 1 \text{ (task success)} \\ -1, & \text{if } R_T = 0 \text{ (task failure)} \end{cases}
\]

该操作完全自动化，无需人工标注。其直觉是：**成功轨迹中每一步至少是\"不坏\"的（否则整个任务不会成功），失败轨迹中每一步可能存在问题**。虽然这种\"一刀切\"的标注噪声较大——失败轨迹中也可能存在合理的动作——但它提供了传统离线数据完全缺乏的中间监督信号。Table 3 消融（w/o RT）证实移除该标注会导致显著性能下降。

> 💡 关键设计：自采数据 + 回溯标注是 Q-Evolve 自进化的基石——策略在每轮迭代中主动探索边界案例，积累对当前策略而言最有价值的学习信号；而回溯标注则提供了一种无成本但有意义的步骤级粗略信用信号。

**3.3 Stage 2 — Weighted IQL：In-Distribution Critic Learning**

标准 IQL（Implicit Q-Learning）是一种 Offline RL 算法，通过 expectile 回归学习一个值函数 \(V\) 来隐式地逼近 in-distribution 动作的最大 Q 值，而无需对 OOD 动作显式执行 max 操作，从而避免了外推误差：

\[
\begin{aligned}
\mathcal{L}_V &= \mathbb{E}_{(u,s,a)\sim\mathcal{D}}\left[ L_2^m\big( \bar{Q}(u,s,a) - V(u,s) \big) \right] \\
\mathcal{L}_Q &= \mathbb{E}_{(u,s,a,r^{\text{env}},s')\sim\mathcal{D}}\left[ \big( r^{\text{env}} + \gamma V(u,s') - Q(u,s,a) \big)^2 \right]
\end{aligned}
\]

其中 \(L_2^m(\delta) = |m - \mathbb{1}(\delta < 0)| \cdot \delta^2\) 是非对称平方损失。\(m \in (0.5, 1)\) 控制 expectile 水平，使得 \(V\) 趋近于 Q 分布的上分位数（通常取 \(m=0.7-0.9\)），从而隐式地执行"最优动作选择"。

Q-Evolve 对此做了关键增强——**Weighted IQL（W-IQL）**：在 \(V\) 函数的 expectile 回归损失中引入基于回合回报的权重：

\[
w(\tau) = \sigma\left( \beta \cdot (R_T - \bar{R}) \right), \quad \bar{R} = \frac{1}{B}\sum_{b=1}^{B} R_T^{(b)}
\]

\[
\mathcal{L}_V^{\text{weighted}} = \mathbb{E}_{(u,s,a)\sim\mathcal{D}}\left[ w(\tau) \cdot L_2^m\big( \bar{Q}(u,s,a) - V(u,s) \big) \right]
\]

其中 \(\beta\) 控制 gating 的陡峭程度，\(\sigma(\cdot)\) 是 sigmoid 函数。

> ⚠️ 核心直觉：在稀疏二元奖励下，标准 IQL 无法区分成功和失败轨迹——所有数据无差别地用于训练 Critic，导致 V 函数成为一个"混合分布"的 expectile，对好坏状态失去区分力。W-IQL 通过 \(w(\tau)\) 使得成功轨迹（\(R_T=1\)）占主导，失败轨迹（\(R_T=0\)）被压低权重，迫使 Critic 聚焦于成功行为的值分布，从而提供一个更可靠的内插值函数基础。

> 💡 关键对比：辅助奖励 \(r^{\text{aux}}\) 不直接进入 Q 函数的 TD 目标（Eq.2 仅使用 \(r^{\text{env}}\)），其作用体现在 (1) 作为 V 函数损失的权重 gating 输入 \((R_T)\)；(2) 间接为 Critic 训练提供信息增益。这种设计让辅助信号和策略梯度信号保持在不同的信息通道中，避免交叉污染。

**3.4 Stage 3 — 过程奖励推导：GAE 与 env-only 设计**

获得可靠的 Critic 估值后，Q-Evolve 通过 **Generalized Advantage Estimation（GAE）** 公式推导每步的过程奖励/优势函数：

\[
A_t = \sum_{\ell=0}^{\infty} (\gamma\lambda)^\ell \left( r_{t+\ell}^{\text{env}} + \gamma V(u,h_{t+\ell+1},o_{t+\ell+1}) - V(u,h_{t+\ell},o_{t+\ell}) \right)
\]

**关键设计选择**: GAE 中**仅使用环境奖励 \(r^{\text{env}}\)，不混入辅助奖励 \(r^{\text{aux}}\)**。这背后的原理是：

- **辅助奖励的偏差性**：\(r^{\text{aux}}\) 将所有失败步统一标记为 \(-1\)，即便其中某些动作可能是合理的（如"正确拿起钥匙但后续步骤出错"）。如果直接引入 GAE，会导致对合理动作的误惩罚，使策略梯度带偏差。
- **Critic 的信息传递**：辅助奖励已经通过 W-IQL 的权重机制改善了 V 函数的质量，更准确的 V 自然会传导到更准确的 GAE 估计中——这是一种"间接但无偏"的利用方式。

Table 4 的消融实验直接验证了这一设计：GAE with \(r^{\text{env}}+r^{\text{aux}}\)（81.4%）显著低于 GAE with \(r^{\text{env}}\) only（87.9%），甚至不如一步 \(Q-V\) 信号（74.3%）的改善幅度大（虽然 GAE+\(r^{\text{aux}}\) 仍高于一步信号）。这清晰表明：**辅助奖励是好的 Critic 训练辅助，但不是好的策略梯度输入**。

> 💡 关键洞见：Q-Evolve 在两个信息通道上分别使用不同类型的奖励——\(r^{\text{aux}}\) → Critic（改善 V/Q 质量），\(r^{\text{env}}\) → Actor（提供无偏梯度方向）。这种"双通道"设计是框架性能的核心保障。

**3.5 Stage 4 — BPPO：行为近端策略优化**

Q-Evolve 的策略优化模块并非普通 PPO，而是专为 Offline-to-Online 场景设计的 **Behavior-Proximal PPO（BPPO）**：

\[
\begin{aligned}
\mathcal{L}_\pi(\theta) = \mathbb{E}_{\mathcal{D}}\Big[ \min\Big( \eta_t A_t,\; \mathrm{clip}\big(\eta_t,\, 1-\epsilon_{\text{low}},\, 1+\epsilon_{\text{high}}\big) A_t \Big) \Big] + \alpha \, \mathrm{KL}(\pi_\theta \| \pi_{\text{ref}})
\end{aligned}
\]

其中 \(\eta_t = \pi_\theta(a_t|u,h_t,o_t) / \pi_{\text{old}}(a_t|u,h_t,o_t)\) 是重要性采样比。

BPPO 与标准 PPO 有三个本质区别：

1. **不对称裁剪区间**：\(\epsilon_{\text{low}} \neq \epsilon_{\text{high}}\)，通常设置 \(\epsilon_{\text{high}} > \epsilon_{\text{low}}\)。这意味着：对正向优势动作（\(A_t > 0\)，\"好动作\"），允许更大的策略更新幅度；对负向优势动作（\(A_t < 0\)，\"坏动作\"），实施更严格的裁剪约束。这种**非对称梯度截断**实现了\"积极鼓励好行为，谨慎惩罚坏行为\"的直觉——在长程任务中，坏动作的危害远大于好动作的收益延迟。

2. **In-Distribution 策略更新**：所有优化仅基于数据集 \(\mathcal{D}\) 中的状态和动作进行，而非 on-policy rollout。从根本上避免了离线 RL 中最致命的问题——对未见过动作的 Q 值外推误差导致的策略崩溃。

3. **KL 散度约束 Reference Model**：额外的 KL 正则项 \(\alpha \cdot \text{KL}(\pi_\theta \| \pi_{\text{ref}})\) 约束当前策略不偏离 Behavior Cloning 的初始化先验 \(\pi_{\text{ref}}\)。这类似于 Trust Region 的思想，在少量自采数据上训练时防止过拟合和经验灾难性遗忘。

Table 3 的最后一行给出了 BPPO vs AWR（Advantage-Weighted Regression）的对比：用 AWR 替换 BPPO 后性能明显下降。原因是 AWR 通过加权行为克隆来优化策略，所有动作（包括负优势动作）都在不同程度上被模仿；而 BPPO 通过 signed advantage 和 clip 机制显式地**抑制负优势动作的影响力**，在长程策略改进中这一点至关重要。

> ⚠️ 核心对比：IQL 的原始策略抽取（AWR）是"加权模仿"，BPPO 是"定向纠正"。在需要修正错误行为的长程任务中，后者的显式负信号抑制能力不可替代。

**3.6 迭代自进化的累积效果与极致样本效率**

Q-Evolve 支持多轮迭代：每轮用当前优化后的策略采集新的 \(\mathcal{D}_{\text{self}}\)，重新训练 Critic 并优化策略。Figure 3 显示了从 Iter-1 到 Iter-2 的持续提升，表明框架能**稳定累积**多轮自监督改进，而非一次性的 boost 效应。

Table 5 将 Q-Evolve 与在线 RL 方法（PPO、RLOO、GRPO）做了样本效率的对齐比较。在相同主干模型（Qwen2.5-7B-Instruct）和相同任务（ALFWorld）下：

| 方法 | 环境步数 | Seen | Unseen |
|------|---------|------|--------|
| PPO | 320K | 59.4 | 67.7 |
| RLOO | 320K | 56.4 | 36.6 |
| GRPO | 320K | 39.7 | 32.2 |
| SFT | 0 | 74.9 | 62.3 |
| SFT + PPO | 320K | 72.6 | 77.6 |
| SFT + RLOO | 320K | 75.0 | 51.4 |
| SFT + GRPO | 320K | 66.7 | 74.1 |
| **Q-Evolve (1-iter)** | **13K** | **88.6** | **87.3** |

Q-Evolve 用 1/25 的环境步数，取得了远超所有方法的结果（88.6% vs 最高 75.0%）。这源于其核心设计：**Critic 训练阶段完全离线**，仅策略采样阶段需要少量环境交互。

**3.7 多模型架构泛化**

Table 6 验证了 Q-Evolve 在 Llama-3-8B-Instruct 上的表现，同样超越 MPO、KnowAgent、WKM 等 planning-based 方法。这证明了方法并非绑定特定模型初始化，其改进来自于通用的值估计与策略优化机制。

#### 🧪 练习题
```yaml
question: "Q-Evolve 中 Weighted IQL 的主要作用是什么？"
options:
  - "用回合回报对 IQL 的 expectile 回归损失加权，使 Critic 更关注成功轨迹的值分布"
  - "在 Q 学习中引入 entropy bonus 以鼓励探索"
  - "用 Behavior Cloning 的 log-prob 初始化 Q 函数"
  - "对 OOD 动作实施 trust region 约束以防止外推"
answer: 0
explain: "Weighted IQL 在标准 IQL 的 V 函数 expectile 回归中引入基于回合回报的权重 w(τ)=σ(β·(R_T−R̄))，使得高回报轨迹在 Critic 训练中有更大的影响力，缓解了稀疏二元奖励下 Critic 对好坏轨迹的无判别学习问题，从而提供更准确的值估计基础用于后续 GAE 优势推导。"
```
