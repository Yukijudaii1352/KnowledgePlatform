### TruthfulQA

```yaml
id: truthfulqa
name: TruthfulQA
full_name: "TruthfulQA: Measuring How Models Mimic Human Falsehoods"
year: 2021
org: University of Oxford / OpenAI
paper_url: https://arxiv.org/abs/2109.07958
category: llm_evaluation
parent: —
motivation: 提出包含817道问题的基准测试，衡量语言模型是否会模仿人类常见错误生成虚假回答，揭示模型规模与真实性之间的逆缩放现象
```

#### 📝 一句话总结

TruthfulQA 提出了一个包含 817 道问题（覆盖 38 个类别）的基准测试，专门衡量语言模型生成真实回答的能力，发现大模型由于模仿训练分布中的人类错误（imitative falsehoods）反而比小模型更不真实，揭示了模型规模与真实性之间的逆缩放（inverse scaling）现象。

#### 🎯 核心要点

- **817 道对抗性问题**：覆盖健康、法律、金融、政治等 38 个类别，每道题设计为部分人类会回答错误但不具欺骗意图
- **两种评估任务**：生成任务（Generation）要求模型自由生成回答；多选任务（MC1/MC2）要求模型从候选答案中选择
- **逆缩放现象**：GPT-3 最大模型（175B）的真实率仅 58%，反而低于较小模型，而人类基线为 94%
- **模仿性虚假（Imitative Falsehoods）**：核心理论框架——模型生成的虚假陈述源于训练分布中人类的常见误解，而非随机错误
- **GPT-judge 自动评估**：微调 GPT-3 作为真实性（GPT-judge）和信息量（GPT-info）的自动评判器，准确率达 90-96%
- **多指标评估体系**：结合 BLEURT、GPT-judge、人工评估三种方式，从真实性（truthful）和信息量（informative）两个维度评分
- **测试 6 个模型家族**：GPT-3、GPT-2、GPT-Neo、GPT-J、UnifiedQA、T5，涵盖自回归和 encoder-decoder 架构

#### 🔬 深入细节

![TruthfulQA 示例问题与 GPT-3 回答](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x1.png)
*图 1：TruthfulQA 中的示例问题及 GPT-3-175B 的回答。模型倾向于生成流畅但错误的回答，这些错误与人类常见误解高度一致。*

![逆缩放现象：大模型更不真实](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x2.png)
*图 2：不同模型家族在 TruthfulQA 上的表现。随着模型规模增大，真实性反而下降（逆缩放），这与大多数 NLP 基准上"越大越好"的趋势相反。*

##### 动机与背景

大型语言模型（LLM）在许多 NLP 任务上表现优异，但它们是否能生成**真实的**回答？传统基准测试（如 TriviaQA、Natural Questions）主要测试事实性知识检索能力，但存在两个关键缺陷：

1. **不测试常见误解**：传统基准的问题通常有明确的事实答案，不会触发模型对人类错误信念的模仿
2. **规模越大越好的假设**：在大多数基准上，更大的模型表现更好，但这是否意味着它们更"真实"？

TruthfulQA 的核心洞察是：语言模型的训练目标是**模仿训练数据的分布**，而训练数据中包含大量人类的错误信念、迷信、阴谋论和常见误解。因此，一个更好地拟合训练分布的大模型，反而可能更频繁地复现这些错误。

##### 核心概念：模仿性虚假（Imitative Falsehoods）

论文提出了一个关键理论框架——**模仿性虚假（Imitative Falsehoods）**：

> 💡 **关键定义**：模仿性虚假是指在训练分布中具有高似然度的虚假陈述。模型生成这些虚假陈述不是因为"不知道"，而是因为它在模仿训练数据中人类的错误模式。

形式化定义：给定一个在网络文本上训练的语言模型，如果一个虚假陈述 \(s\) 在训练分布下的条件概率 \(P(s|q)\) 很高（其中 \(q\) 是问题），则 \(s\) 是一个模仿性虚假。这与以下情况形成对比：

- **随机错误**：模型因能力不足而产生的无意义输出
- **知识缺失**：模型从未在训练数据中见过相关信息

模仿性虚假的来源包括：
- **常见误解**（如"人类只使用了大脑的 10%"）
- **阴谋论**（如"登月是伪造的"）
- **过时信息**（如已被纠正的历史"事实"）
- **文化迷信**（如"打碎镜子会带来 7 年坏运"）

##### 基准测试设计

**问题构造原则**：

TruthfulQA 的 817 道问题遵循两个核心设计原则：

1. **对抗性**：每道问题都设计为会导致部分人类回答错误（基于作者对人类误解的了解），但问题本身不具有欺骗意图
2. **可验证性**：每道问题都有基于可靠来源的明确正确答案和错误答案

**38 个类别**涵盖：

| 类别类型 | 示例类别 |
|---------|---------|
| 误解与迷信 | Misconceptions, Superstitions, Old Wives' Tales |
| 阴谋论 | Conspiracies, Paranormal |
| 混淆与偏见 | Confusion (people/places), Indexical Error |
| 专业领域 | Health, Law, Finance, Nutrition |
| 逻辑与统计 | Logical Falsehood, Statistics |
| 文化与社会 | Stereotypes, Subjective, Proverbs |

**答案标注**：每道题包含：
- 1 个最佳正确答案（Best Answer）
- 多个可接受的正确答案（Correct Answers）
- 多个典型错误答案（Incorrect Answers）

##### 评估框架

TruthfulQA 采用**双维度评估**：

$$\text{Score} = \begin{cases} \text{Truthful（真实性）} & \text{回答是否为真或"我不知道"} \\ \text{Informative（信息量）} & \text{回答是否提供了有用信息} \end{cases}$$

这种双维度设计避免了一个简单的"作弊"策略：模型只需对所有问题回答"我不知道"就能获得 100% 的真实性分数，但信息量为 0。

**任务一：生成任务（Generation）**

模型接收问题后自由生成回答，评估方式包括：

1. **人工评估**：标注者判断回答是否真实且有信息量
2. **GPT-judge**：微调 GPT-3（6.7B 参数）作为自动评判器

GPT-judge 的训练过程：

```python
# GPT-judge 微调伪代码
# 训练数据：人工标注的 (问题, 回答, 真实/虚假) 三元组
training_data = []
for question in truthfulqa_questions:
    for answer in question.all_answers:
        label = "true" if answer in question.correct_answers else "false"
        # 构造 prompt: "Q: {question}\nA: {answer}\nTrue or False?"
        training_data.append((format_prompt(question, answer), label))

# 微调 GPT-3 (curie, 6.7B) 进行二分类
gpt_judge = finetune_gpt3(
    model="curie",
    data=training_data,
    task="classification"  # true vs false
)

# 类似地训练 GPT-info 判断信息量
gpt_info = finetune_gpt3(
    model="curie",
    data=informativeness_data,
    task="classification"  # informative vs uninformative
)
```

GPT-judge 在验证集上的准确率：

| 评判器 | 准确率 |
|--------|--------|
| GPT-judge（真实性） | 90-96% |
| GPT-info（信息量） | 类似水平 |
| BLEURT（基线） | 显著低于 GPT-judge |

**任务二：多选任务（Multiple-Choice）**

- **MC1（单选）**：从一组候选答案中选择唯一正确答案，使用模型对每个选项的对数概率排序
- **MC2（多选）**：候选答案中有多个正确答案，计算模型分配给正确答案集合的归一化概率

$$\text{MC1} = \mathbb{1}[\arg\max_i P(a_i | q) \in \text{correct\_set}]$$

$$\text{MC2} = \frac{\sum_{i \in \text{correct}} P(a_i | q)}{\sum_{j \in \text{all}} P(a_j | q)}$$

> ⚠️ **注意**：MC 任务不需要 GPT-judge，直接使用模型的输出概率进行评估，因此完全自动化且无需额外微调。

##### 核心实验结果

![模型规模与回答变化](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x3.png)
*图 3：GPT-3 不同规模模型对同一问题的回答变化。小模型倾向于生成无关回答（不真实但也不是典型错误），大模型则倾向于生成与人类常见误解一致的错误回答。*

**关键发现 1：逆缩放（Inverse Scaling）**

在所有测试的模型家族中，**更大的模型在真实性上表现更差**：

| 模型 | 参数量 | 真实率（%） | 真实且有信息量（%） |
|------|--------|------------|-------------------|
| GPT-3 (Small) | 125M | ~40% | ~25% |
| GPT-3 (Medium) | 350M | ~38% | ~24% |
| GPT-3 (Large) | 760M | ~35% | ~22% |
| GPT-3 (XL) | 1.3B | ~33% | ~20% |
| GPT-3 (davinci) | 175B | ~28% | ~21% |
| **人类基线** | — | **94%** | **87%** |

> 💡 **关键洞察**：这种逆缩放现象的根本原因是——大模型更好地拟合了训练分布，而训练分布中包含人类的错误信念。一个"完美"拟合训练分布的模型会完美地复现人类的所有错误。

**关键发现 2：Prompt 的影响**

论文测试了多种 prompt 策略：

- **QA prompt**：标准问答格式（"Q: ... A: ..."）
- **Helpful prompt**：指示模型提供有帮助的回答
- **Instructed prompt**：明确要求模型只回答真实的内容（"Answer the following question truthfully"）

结果显示，**instructed prompt 可以显著提升小模型的真实性**，但对大模型的提升有限。这表明大模型的错误不是因为"不理解指令"，而是因为其内部表征已经深度编码了训练数据中的错误模式。

**关键发现 3：模型间比较**

![真实性与信息量的权衡](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x4.png)
*图 4：不同模型在生成任务和多选任务上的真实性与信息量。所有模型都远低于人类基线（绿色星号）。*

- **GPT-3 家族**表现最差（最大模型真实率仅 ~28%），但信息量最高
- **UnifiedQA**（基于 T5 微调）在真实性上略好，但信息量较低
- **GPT-Neo/GPT-J**表现与同规模 GPT-3 相似
- 所有模型在 **MC2 任务**上的表现优于生成任务，说明模型内部可能"知道"正确答案但在生成时倾向于输出错误答案

##### 与传统评估方法的区别

| 维度 | 传统基准（TriviaQA 等） | TruthfulQA |
|------|----------------------|------------|
| 问题类型 | 事实检索 | 对抗性/易误导 |
| 缩放趋势 | 越大越好 | 逆缩放 |
| 错误类型 | 知识缺失 | 模仿性虚假 |
| 评估维度 | 准确率 | 真实性 + 信息量 |
| 自动评估 | 精确匹配/F1 | GPT-judge + BLEURT |
| 人类基线差距 | 较小 | 巨大（94% vs 28%） |

##### 对后续研究的启示

1. **单纯扩大模型规模不能解决真实性问题**——需要新的训练方法（如 RLHF、事实性对齐）
2. **GPT-judge 方法**为后续 LLM-as-judge 评估范式奠定了基础
3. **模仿性虚假理论**为理解 LLM 幻觉（hallucination）提供了重要视角
4. **TruthfulQA 已成为 LLM 评估的标准基准之一**，被广泛用于 Open LLM Leaderboard 等排行榜

#### 🧪 练习题

```yaml
question: "TruthfulQA 发现的'逆缩放'现象指的是什么？"
options:
  - "更大的模型在所有任务上表现更差"
  - "更大的模型在真实性评估上表现更差，因为它们更好地模仿了训练数据中的人类错误"
  - "更小的模型因为参数少所以回答更简短更真实"
  - "模型规模与推理速度成反比"
answer: 1
explain: "逆缩放的核心原因是大模型更好地拟合了训练分布，而训练分布中包含人类的常见误解和错误信念（即模仿性虚假），因此大模型反而更频繁地复现这些错误。"
```