### ReAct: 推理-行动协同 (ReAct)

```yaml
id: react
name: ReAct
full_name: 推理-行动协同 (ReAct)
year: '2022.10'
org: Princeton/Google
paper_url: https://arxiv.org/abs/2210.03629
category: foundation
parent: —
motivation: 交错思考与行动驱动工具闭环
```

#### 📝 一句话总结
ReAct 提出**在语言模型的行动空间中注入“思维（thought）”**——一种不影响外部环境、仅用于推理的语言动作——通过交替生成 Thought-Action-Observation 三元组，实现推理与行动的协同，在知识密集问答和交互决策两类任务上显著降低了幻觉并提升了可解释性。

#### 🎯 核心要点
- **动作空间扩展**：将策略的动作空间从纯环境动作 𝒜 扩展为 𝒜 ∪ ℒ（ℒ 为语言空间），其中“思维”不产生环境反馈，仅通过推理当前上下文更新内部状态。
- **两种思维模式**：推理任务采用**密集思维**（每步行动前都有思维），决策任务采用**稀疏思维**（模型自主决定何时插入思维），体现框架的灵活性。
- **Prompt 即策略**：利用 PaLM-540B 的 few-shot 能力，人工编写含 Thought-Action-Observation 的完整轨迹作为 in-context 示例（1-6个），无需额外训练。
- **幻觉大幅降低**：HotPotQA 上 ReAct 失败模式中幻觉率 0%，而 CoT 高达 56%；成功模式中正确率 94% vs 86%。
- **微调潜力巨大**：PaLM-8B 微调 ReAct 即可超越 PaLM-540B 所有 Prompt 方法，证明外部知识交互是可迁移的通用技能。
- **人类可编辑**：思维以自然语言呈现，人类可随时插入/修改思维来纠正 Agent 行为，实现实时可控性。

#### 🔬 深入细节
![ReAct 示意图](https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png)
*图：ReAct 的核心框架或评测示意。*

##### 1. 形式化定义：增强动作空间

**原始 MDP 问题**：给定上下文 $c_t = (o_1, a_1, \cdots, o_{t-1}, a_{t-1}, o_t)$，策略需学习 $c_t \mapsto a_t$ 的映射。当推理链复杂时（如多跳 QA），该映射高度隐式且极易出错。

**ReAct 核心创新**：将动作空间扩展为 $\hat{\mathcal{A}} = \mathcal{A} \cup \mathcal{L}$，其中 $\mathcal{L}$ 为无限的语言空间。一个“思维” $\hat{a}_t \in \mathcal{L}$：
- **不影响外部环境**（无 observation 反馈）
- **更新内部上下文**：$c_{t+1} = (c_t, \hat{a}_t)$
- **用途多样**：分解任务目标、注入常识知识、提取关键信息、跟踪进度、处理异常、调整计划

```
┌─────────────────────────────────────────────────────────────────┐
│                    ReAct 循环 (密集模式)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  for each step t:                                                │
│      Thought_t  ← 推理当前上下文 c_t                              │
│      Action_t   ← 基于 Thought_t 生成环境动作                     │
│      Obs_t      ← 环境返回观察结果                               │
│      c_{t+1}    ← c_t ∪ {Thought_t, Action_t, Obs_t}            │
│                                                                  │
│  关键性质：                                                       │
│  • Thought ∈ ℒ 不影响环境，仅推进内部推理链                       │
│  • Action  ∈ 𝒜 产生真实的 Observation                            │
│  • 稀疏模式下，Thought 由模型自主决定何时插入                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

##### 2. 实现方式：Few-Shot Prompt 即策略

ReAct 不对模型参数做任何修改，完全依赖**冻结的大语言模型（PaLM-540B）**的 few-shot in-context learning 能力。

**Prompt 构建流程**：
1. 从训练集中随机选取 1-6 条任务实例（HotpotQA 用 6，FEVER 用 3，ALFWorld 用 6）
2. 人类标注者**手动编写完整的 Thought-Action-Observation 轨迹**
3. 这些轨迹以自然语言形式拼接为 few-shot prompt
4. 测试时模型按相同格式生成推理-行动-观察序列

**思维类型的多样性**（单条轨迹中可能包含多种）：

| 思维类型 | 示例 | 作用 |
|---------|------|------|
| 任务分解 | "I need to search x, find y, then find z" | 制定搜索计划 |
| 信息提取 | "x was started in 1844" | 从观察中提炼关键事实 |
| 常识推理 | "x is not y, so z must instead be…" | 基于外部知识推理 |
| 算术推理 | "1844 < 1989" | 数值比较与计算 |
| 搜索重规划 | "maybe I can search/look up x instead" | 失败后的策略调整 |
| 最终合成 | "…so the answer is x" | 综合所有信息给出答案 |

**密集 vs 稀疏模式**：
- **密集模式**（知识推理任务）：每一步环境动作前都插入 Thought → Thought-Action-Observation 严格交替
- **稀疏模式**（决策任务）：模型自主决定插入 Thought 的位置和频率，在大量动作中仅在关键节点推理

##### 3. 关键实验发现

**主实验（HotpotQA & FEVER）**：

| 方法 | HotpotQA (EM) | FEVER (Acc) |
|------|:------------:|:----------:|
| Standard Prompt | 25.7 | 57.1 |
| CoT (Chain-of-Thought) | **29.4** | 56.3 |
| Act (纯行动) | 25.7 | 58.9 |
| ReAct | 27.4 | **60.9** |
| ReAct→CoT-SC (3-5 samples) | **33.8**† | 62.9 |
| CoT-SC→ReAct (3-5 samples) | 32.9 | **64.6**† |

† 达到 CoT-SC 需 21 个 sample 的性能水平，仅用 3-5 个样本

**失败模式分析（HotpotQA 200条随机轨迹）**：

| 类别 | ReAct | CoT |
|------|:-----:|:---:|
| **成功-正确推理** | 94% | 86% |
| **成功-幻觉** | 6% | 14% |
| **失败-推理错误** | 47% | 16% |
| **失败-搜索无结果** | 23% | - |
| **失败-幻觉** | **0%** | **56%** |
| **失败-标签歧义** | 29% | 28% |

**核心洞察**：
> ReAct 通过引入外部知识检索，**完全消除了 CoT 中最大的失败源——幻觉（56%→0%）**。代价是推理的灵活性降低（推理错误 47% vs 16%），以及检索失败时的恢复困难（23% 因搜索无结果失败）。这体现了**事实性（factuality）与灵活性（flexibility）之间的基本权衡**，启发后续 ReAct+CoT-SC 的组合策略。

**微调 Scaling（HotpotQA PaLM-8B/62B）**：
- PaLM-8B 微调 ReAct > PaLM-62B 所有 Prompt 方法
- PaLM-62B 微调 ReAct > PaLM-540B 所有 Prompt 方法
- 仅需 **3000 条标注数据**即可实现大幅超越
- 关键结论：微调教给模型的是"如何与 Wikipedia 交互"这一**可泛化的技能**，而非记忆事实——因此微调 Act 和 ReAct 远优于微调 CoT

**决策任务（ALFWorld & WebShop）**：

| 任务 | ReAct | Act (纯行动) | BUTLER (SOTA) |
|------|:-----:|:----------:|:-----------:|
| ALFWorld (6 tasks avg) | **71%** | 45% | 37% (专家系统) |
| WebShop (success rate) | **66.6%** | 58.0% | 59.8% (IL + RL) |

- ALFWorld：ReAct 仅用 **6** 个 in-context 示例即超越领域专用专家系统 BUTLER
- WebShop：ReAct 超越 Imitation Learning + RL 的 1100 万训练样本模型
- 稀疏思维模式下，模型学会在遇到歧义观察时才插入思维进行推理

##### 4. 人类可控性

如 Figure 5 所示，由于思维以自然语言呈现，人类可以在推理过程的任意节点**插入或编辑 Thought**，直接修正 Agent 行为。例如：
- Agent 陷入循环时，插入 "You have already searched... try looking up..."
- Agent 忽略关键信息时，插入 "The observation says... this means..."
- 这种**运行时编辑**无需重新训练，实现了对黑箱模型的即时行为修正

##### 5. 理论意义：为什么 ReAct 有效？

1. **认知科学对齐**：人类的决策过程天然包含“内部独白”（inner monologue），ReAct 让模型模拟这一机制
2. **接地性（Groundedness）**：思维由环境观察驱动，反过来指导行动，形成“感知→推理→行动”的闭环，避免纯推理的空想
3. **组合泛化**：Reasoning 和 Acting 两种技能在 ReAct 框架中解耦又协同，使模型能在需要时调用内部知识，在必要时查询外部环境
4. **可诊断性**：思维链为模型行为提供了逐级解释，使失败分析从“黑箱猜测”变为“逻辑追踪”

##### 6. 局限与未来方向

- **推理错误增加**：思维-行动的结构化约束降低了 CoT 的自由推理能力，47% 的失败源于推理错误
- **检索依赖**：当搜索 API 返回无用信息时（23% 失败），模型难以恢复——这是接地性的代价
- **贪心解码缺陷**：观察到的“重复生成”错误可能与贪心解码有关，beam search 等策略或可缓解
- **跨任务泛化**：本文仅测试了 Wiki API 和文本游戏两类环境，更丰富的环境交互（如代码执行、多模态感知）仍有待探索

#### 🧪 练习题
```yaml
question: "ReAct 相比纯 Chain-of-Thought，为什么更容易降低工具使用场景中的幻觉？"
options:
  - "因为 ReAct 会禁止模型输出自然语言推理"
  - "因为 ReAct 让推理过程不断接受外部观察反馈，避免长期脱离环境空想"
  - "因为 ReAct 完全不需要 prompt 示例"
  - "因为 ReAct 只适用于单步检索任务"
answer: 1
explain: "ReAct 的 Thought-Action-Observation 闭环让模型持续被环境反馈校正，因此比纯 CoT 更不容易在错误假设上一路推理下去。"
```
