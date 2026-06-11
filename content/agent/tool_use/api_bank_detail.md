### API-Bank: 工具增强模型基准库 (API-Bank)

```yaml
id: api_bank
name: API-Bank
full_name: 工具增强模型基准库 (API-Bank)
year: '2023.04'
org: Alibaba Group
paper_url: https://arxiv.org/abs/2304.08244
category: evaluation
parent: toolformer
motivation: 首次系统评测规划检索调用三能力
```

#### 📝 一句话总结
API-Bank 首次提出规划（Plan）、检索（Retrieve）、调用（Call）三级工具使用能力评估体系，构建含 73 个真实 API 的可执行评测系统和基于五智能体协作的大规模训练集（2,138 API / 1,888 对话），并基于此训练出超越 Alpaca-7B 26 个点的工具增强模型 Lynx，系统揭示了 GPT-4 最强在规划、GPT-3.5 最强在调用、以及幻觉与检索失败是当前核心瓶颈。

#### 🎯 核心要点
- 首创三级工具使用能力定义：**Call**（给定 API 描述直接调用）、**Retrieve+Call**（从 API 池检索并调用）、**Plan+Retrieve+Call**（自主规划多步 API 调用链）
- 构建首个可执行评测系统：**73 个真实 API**、**314 个对话**、**753 次 API 调用**，覆盖 7 大领域（账户管理、信息查询、健康管理、日程管理、智能家居、金融管理、其他），人工标注成本 $8/对话
- 提出 **Multi-agent 数据生成框架**：5 个 LLM 智能体（Domain → API → Query → API Call & Response → Quality Check）协作自动生成训练数据，将标注成本降低 **98%**（对比纯人工）
- 构建最大规模工具增强训练集：**2,138 个 API**、**1,888 个对话**、**4,149 次 API 调用**，横跨 **1,000+ 领域**
- 训练开源模型 **Lynx**（基于 Alpaca-7B）：Call 准确率提升超 **26 个百分点**，ROUGE-L 提升 **0.41**，接近 GPT-3.5 水平
- 系统分析三大类模型的错误模式：Alpaca 主错「不调用 API」（36.77%），Lynx 主错「API 幻觉」（61.38%），GPT-4 主错「API 检索失败」（67.86%）
- 关键发现：**指令微调**是模型具备工具调用能力的必要条件（未经指令微调的 GPT-3 Davinci 几乎为零能力）；GPT-4 在规划推理上显著优于 GPT-3.5（Plan+Retrieve+Call 提升近 50%）

#### 🔬 深入细节
##### 1. 核心示意图

![API-Bank 三级能力示意图](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png)
*图 1：API-Bank 定义的三级工具使用能力——Call（调用）、Retrieve+Call（检索+调用）、Plan+Retrieve+Call（规划+检索+调用）*

![用户需求四象限](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x2.png)
*图 2：基于 500+ 用户访谈提炼的两维度四象限需求模型——API 数量（少 vs 多）× 每轮调用数（单次 vs 多次）*

![Multi-agent 数据生成框架](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x3.png)
*图 3：五个 LLM 智能体协作自动生成训练数据——Domain Agent → API Agent → Query Agent → API Call Agent → Quality Check Agent*

##### 2. 三级能力定义（核心框架）

API-Bank 的核心创新在于首次系统定义了工具增强 LLM 的三级递进能力：

- **Level 1 — Call（调用）**：给定少量 API（2-3 个）的完整描述（名称、参数、返回值），模型需在单轮对话中准确选择并调用正确的 API。这本质上是「槽位填充」任务——理解指令并填入正确的 API 参数。
  
- **Level 2 — Retrieve+Call（检索+调用）**：API 池扩大至数十到上百个，模型不再能一次性看到所有 API 描述。它必须先通过一个特殊的 `API Search` 工具，用关键词检索相关 API，再执行调用。这测试模型的「需求到关键词」凝练能力。
  
- **Level 3 — Plan+Retrieve+Call（规划+检索+调用）**：用户给出一个复杂需求（如「帮我规划一次旅行」），模型需自主将其分解为多步 API 调用链（查天气 → 订酒店 → 订机票 → 设日程提醒），每一步都可能需要先检索再调用。这测试模型的**长程规划与推理能力**。

> 💡 关键：这三个能力是严格递进的。实验表明，GPT-3.5 从 Level 1 到 Level 3 性能下降约 38%，而 GPT-4 仅下降约 21%，揭示了**规划能力**是区分大模型工具使用水平的关键维度。

##### 3. Multi-agent 数据生成方法

由于人工标注 API 对话成本极高（$8/对话）且难以覆盖上千领域，API-Bank 提出了革命性的 Multi-agent 自动数据生成流水线：

**五个智能体的分工**：
1. **Domain Agent**：生成多样化领域主题（如心理健康、牙科费用估算、营养规划等），确保领域广度
2. **API Agent**：在给定领域下，设计真实可用的 API（如 SearchDoctors、GetPrice、RecordMaintenance），确保 API 多样性与真实性
3. **Query Agent**：生成用户查询，要求覆盖三个能力等级，确保训练数据的能力完整性
4. **API Call & Response Agent**：生成对应的 API 调用及返回结果，确保对话逻辑一致性
5. **Quality Check Agent**：对生成数据逐一校验，过滤格式错误、逻辑不一致、API 幻觉等问题，确保数据质量

**核心设计洞见**：直接将所有需求（领域多样 + API 真实 + 三级能力 + 格式规范）一次性输入 ChatGPT 生成，仅 5% 数据可用；升级到 GPT-4 也仅有 25% 可用。将复杂需求**分解为多个简单子任务**交给不同智能体串行执行，是提升数据生成质量的关键。这一洞见本身对后续工作（如 ToolAlpaca、ToolLLM 等）有深远影响。

##### 4. 评测系统设计

评测系统的核心是「可执行性」——每个 API 都经过实际编码实现，数据库预填充初始值，外部信息查询结果被硬编码以确保可复现。此外：

- **特殊 API「API Search」**：当评估 Retrieve+Call 和 Plan+Retrieve+Call 时，模型不能直接看到 API 池中的所有 API，必须通过 API Search 检索。API Search 将用户的查询关键词与所有 API 元信息的句子嵌入做余弦相似度匹配，返回最相关 API。
- **评测指标**：API 调用准确性（Accuracy，判断预测与标注是否执行相同的数据库操作并返回相同结果）+ 响应质量（ROUGE-L）。注意这里的 Accuracy 并非简单的文本匹配，而是**执行层面的语义等价判断**。

##### 5. 实验结果与错误分析

![Call 示例](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x6.png)
*图 6：Level 1 Call 能力示例——给定天气和翻译 API，直接选择调用*

![Retrieve+Call 示例](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x7.png)
*图 7：Level 2 Retrieve+Call 能力示例——先用 API Search 检索，再调用*

![Plan+Retrieve+Call 示例](https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x8.png)
*图 8：Level 3 Plan+Retrieve+Call 能力示例——多步规划，自主分解复杂需求*

**主要结论**：
| 模型 | Call 能力 | Retrieve+Call | Plan+Retrieve+Call |
|------|-----------|---------------|---------------------|
| GPT-3 Davinci | 几乎为零 | — | — |
| Alpaca-7B / ChatGLM-6B | ~20% | — | 可忽略 |
| GPT-3.5 | 最优秀 | 下降 21% | 再降 17% |
| GPT-4 | 比 GPT-3.5 +4pt | 与 GPT-3.5 持平 | **提升近 50%**（最强规划） |
| **Lynx（基于 Alpaca）** | +26pt 领先 Alpaca | — | 接近 GPT-3.5 |

**Lynx vs ToolAlpaca 公平对比**：在使用相同基座模型（Alpaca-7B）的前提下，API-Bank 训练的 Lynx 仅用 6,184 个训练样本即超越 ToolAlpaca 的 10,366 样本效果，验证了 Multi-agent 数据生成的高质量。

**错误模式深度分析**：
- **Alpaca-7B 原始模型**（36.77%「No API Call」）：根本问题是其训练数据（52K instruction data）的模式与 API 调用格式不匹配，模型不理解「API 调用」这一行为范式。
- **Lynx 模型**（61.38%「API Hallucination」）：训练后虽学会了调用，但产生了严重幻觉——调用训练中见过的但当前不可用的虚假 API。同时 32% 的错误与参数问题相关（传未替换参数、格式错误、缺少参数、语义误解）。
- **GPT-4 模型**（67.86%「Failed API Retrieval」）：核心瓶颈不是调用本身，而是无法有效使用 API Search 检索到正确的 API。这说明**检索能力独立于生成能力**，是当前最强模型的主要短板。

> ⚠️ 核心洞见：工具增强 LLM 的能力瓶颈随模型能力提升而转移——从「会不会调用」（Alpaca）到「调哪个真 API」（Lynx 幻觉）再到「怎么找到该调的 API」（GPT-4 检索），每一阶段对应不同的技术挑战。

```python
tools = retrieve_tools(query)
action = planner.select(query, tools)
obs = execute(action)
return synthesize_answer(query, obs)
```

#### 🧪 练习题
```yaml
question: "API-Bank 测试中，GPT-4 在 Plan+Retrieve+Call 场景下表现显著优于 GPT-3.5，但最主要的错误类型是什么？"
options:
  - "API 调用格式错误（False API Call Format）"
  - "API 幻觉（API Hallucination），调用不存在的 API"
  - "API 检索失败（Failed API Retrieval），无法有效找到正确 API"
  - "缺少输入参数（Missing Input Parameters）"
answer: 2
explain: "GPT-4 的错误中 67.86% 属于 API 检索失败，说明即使是最强模型在从大量 API 中准确检索目标工具方面仍存在显著短板，检索能力与生成能力存在独立的能力维度。"
```
