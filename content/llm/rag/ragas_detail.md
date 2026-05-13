### RAGAS — Automated Evaluation of Retrieval Augmented Generation

```yaml
id: ragas
name: RAGAS
full_name: 检索增强生成评估 (Retrieval Augmented Generation Assessment)
year: "2023"
org: Exploding Gradients
paper_url: https://arxiv.org/abs/2309.15217
category: evaluation
parent: —
motivation: 用 LLM-as-judge 实现无参考的 RAG 系统自动化评估，覆盖忠实度、答案相关性与上下文相关性三个维度
```

#### 📝 一句话总结

RAGAS 提出了一套无需人工标注参考答案的 RAG 系统自动评估框架，通过 LLM 分别度量忠实度（答案是否基于上下文）、答案相关性（答案是否切题）和上下文相关性（检索内容是否聚焦），在 WikiEval 数据集上与人类判断高度一致（忠实度准确率 95%）。

#### 🎯 核心要点

- **三维度无参考评估框架**：Faithfulness（忠实度）、Answer Relevance（答案相关性）、Context Relevance（上下文相关性），完全不依赖 ground truth
- **Faithfulness 指标**：将答案分解为原子声明（statements），逐条用 LLM 验证是否可从上下文推断，\(F = |V| / |S|\)
- **Answer Relevance 指标**：从答案反向生成 \(n\) 个问题，计算与原始问题的平均余弦相似度，\(\text{AR} = \frac{1}{n}\sum_{i=1}^{n}\text{sim}(q, q_i)\)
- **Context Relevance 指标**：用 LLM 从上下文中提取回答问题所需的关键句子，\(\text{CR} = \frac{|\text{extracted sentences}|}{|\text{total sentences in } c(q)|}\)
- **WikiEval 基准数据集**：50 篇 2022 年后的 Wikipedia 页面，含人工标注的三维度质量判断，标注者一致率 90%–95%
- **实验使用 gpt-3.5-turbo-16k**，在 WikiEval 上忠实度与人类一致率 95%，答案相关性 78%，上下文相关性 70%
- **显著优于基线**：对比 GPT Score（直接打分 0–10）和 GPT Ranking（直接排序），RAGAS 在所有维度上大幅领先

#### 🔬 深入细节

**RAGAS 评估框架总览**

RAGAS 的核心思想是：RAG 系统的质量可以从三个正交维度进行评估——生成的答案是否忠于检索到的上下文（Faithfulness）、答案是否真正回答了用户的问题（Answer Relevance）、检索到的上下文是否与问题高度相关且不含冗余信息（Context Relevance）。这三个维度共同覆盖了 RAG 系统中检索器和生成器的质量。

> 💡 关键：RAGAS 的最大创新在于**完全无需参考答案**（reference-free），仅利用 \((q, c(q), a_s(q))\) 三元组——即问题、检索上下文和系统答案——就能自动评估 RAG 系统质量。这使得在缺乏标注数据的真实生产环境中也能持续监控 RAG 系统。

---

**1. Faithfulness（忠实度）：声明级验证**

忠实度衡量生成答案中的每个事实声明是否都能从检索到的上下文中推断出来。这是检测 RAG 幻觉的核心指标。

评估分两步进行：

**Step 1 — 声明分解**：使用 LLM 将答案 \(a_s(q)\) 分解为一组简短的原子声明 \(S = \{s_1, s_2, \dots, s_k\}\)。

Prompt 示例：
> *Given a question and answer, create one or more statements from each sentence in the given answer.*

**Step 2 — NLI 验证**：对每个声明 \(s_i\)，使用 LLM 判断该声明是否可以从上下文 \(c(q)\) 中推断出来（verdict: Yes/No）。

Prompt 示例：
> *Consider the given context and following statements, then determine whether they are supported by the information present in the context. Provide a brief explanation for each before arriving at the verdict (Yes/No).*

最终忠实度得分：

$$F = \frac{|V|}{|S|}$$

其中 \(|V|\) 是被判定为"Yes"的声明数量，\(|S|\) 是声明总数。\(F \in [0, 1]\)，越高表示答案越忠实于上下文。

> ⚠️ 注意：这种声明级分解+逐条验证的方式比直接让 LLM 打分更可靠，因为它将复杂的整体判断拆解为多个简单的二元判断任务，降低了 LLM 的认知负担。

---

**2. Answer Relevance（答案相关性）：反向问题生成**

答案相关性衡量生成的答案是否真正回答了用户的问题，同时惩罚不完整或包含冗余信息的答案。

RAGAS 采用了一种巧妙的**反向验证**策略：如果一个答案与问题高度相关，那么从该答案反向生成的问题应该与原始问题语义相近。

**Step 1 — 反向问题生成**：使用 LLM 从答案 \(a_s(q)\) 生成 \(n\) 个问题 \(q_1, q_2, \dots, q_n\)。

Prompt 示例：
> *Generate a question for the given answer.*

**Step 2 — 余弦相似度计算**：使用文本嵌入模型将原始问题 \(q\) 和每个生成问题 \(q_i\) 编码为向量，计算平均余弦相似度：

$$\text{AR} = \frac{1}{n}\sum_{i=1}^{n}\text{sim}(q, q_i)$$

其中 \(\text{sim}(\cdot, \cdot)\) 为余弦相似度。\(\text{AR} \in [-1, 1]\)，实际中通常为正值，越高表示答案越切题。

> 💡 关键：这种间接评估方式避免了让 LLM 直接判断"答案是否相关"这一主观任务。通过反向生成问题，将语义匹配任务交给嵌入模型，更加客观和稳定。同时，如果答案包含冗余信息，反向生成的问题会偏离原始问题，从而自然地惩罚冗余。

---

**3. Context Relevance（上下文相关性）：关键句提取**

上下文相关性衡量检索到的上下文是否聚焦于回答问题所需的信息，惩罚检索结果中的冗余内容。这是对 RAG 系统检索器质量的直接评估。

**单步评估**：使用 LLM 从上下文 \(c(q)\) 中提取对回答问题 \(q\) 至关重要的句子子集 \(S_{ext}\)。

Prompt 示例：
> *Please extract relevant sentences from the provided context that can potentially help answer the following question. If no relevant sentences are found, or if you believe the question cannot be answered from the given context, return the phrase "Insufficient Information".*

上下文相关性得分：

$$\text{CR} = \frac{|S_{ext}|}{\text{total number of sentences in } c(q)}$$

\(\text{CR} \in [0, 1]\)，越高表示检索到的上下文越聚焦、冗余越少。

> ⚠️ 注意：作者发现上下文相关性是最难评估的维度。ChatGPT 在处理较长上下文时，常常难以准确选择关键句子，导致该指标与人类判断的一致率（70%）低于其他两个维度。

---

**4. WikiEval 数据集构建**

WikiEval 是论文提出的评估基准，用于验证 RAGAS 指标与人类判断的一致性：

- **数据来源**：50 篇 2022 年后的 Wikipedia 页面（超出模型训练截止日期），优先选择有近期编辑的页面
- **问题生成**：使用 ChatGPT 基于页面引言部分生成中等难度的问题
- **答案生成**：使用 ChatGPT 在给定上下文的条件下回答问题
- **对比样本构建**：
  - Faithfulness：额外生成无上下文的答案作为低忠实度对比
  - Answer Relevance：用 prompt 生成不完整答案作为低相关性对比
  - Context Relevance：通过抓取反向链接页面添加相关但冗余的句子
- **人工标注**：两位英语流利的标注者独立标注，Faithfulness 和 Context Relevance 一致率约 95%，Answer Relevance 约 90%，分歧通过讨论解决

---

**5. 实验结果与基线对比**

```python
# RAGAS 评估流程伪代码

def evaluate_ragas(question, context, answer, llm, embedder):
    """
    输入: question q, context c(q), answer a_s(q)
    输出: faithfulness, answer_relevance, context_relevance 三个分数
    """

    # === 1. Faithfulness ===
    # Step 1: 声明分解
    statements = llm.decompose_to_statements(answer)  # a_s(q) → {s_1, ..., s_k}
    # Step 2: 逐条 NLI 验证
    verified = 0
    for s in statements:
        verdict = llm.verify_against_context(s, context)  # "Yes" or "No"
        if verdict == "Yes":
            verified += 1
    faithfulness = verified / len(statements)  # F = |V| / |S|

    # === 2. Answer Relevance ===
    generated_questions = []
    for _ in range(n):  # 生成 n 个反向问题
        q_i = llm.generate_question_from_answer(answer)
        generated_questions.append(q_i)
    # 计算嵌入余弦相似度
    q_emb = embedder.encode(question)
    similarities = [cosine_sim(q_emb, embedder.encode(q_i))
                    for q_i in generated_questions]
    answer_relevance = mean(similarities)  # AR = (1/n) Σ sim(q, q_i)

    # === 3. Context Relevance ===
    extracted = llm.extract_relevant_sentences(question, context)
    total_sentences = count_sentences(context)
    context_relevance = len(extracted) / total_sentences  # CR

    return faithfulness, answer_relevance, context_relevance
```

实验在 WikiEval 数据集上进行成对比较（pairwise comparison），每个实例要求模型比较两个答案或两个上下文片段，统计模型偏好与人类偏好的一致率：

| 方法 | Faithfulness | Answer Relevance | Context Relevance |
|------|:---:|:---:|:---:|
| **RAGAS** | **0.95** | **0.78** | **0.70** |
| GPT Score | 0.72 | 0.52 | 0.63 |
| GPT Ranking | 0.54 | 0.40 | 0.52 |

*表：WikiEval 数据集上与人类标注者的成对比较一致率（准确率）*

- **GPT Score 基线**：直接让 ChatGPT 对三个维度打 0–10 分，相同分数随机打破平局
- **GPT Ranking 基线**：直接让 ChatGPT 在两个候选中选择更好的一个

> 💡 关键：RAGAS 在忠实度上达到 95% 的人类一致率，远超直接打分（72%）和直接排序（54%）。这证明了**将复杂评估任务分解为结构化子任务**（声明分解 → 逐条验证）的有效性，而非依赖 LLM 的单次整体判断。

---

**与传统评估方法的区别**

| 特性 | 传统指标 (BLEU/ROUGE) | 基于参考的 LLM 评估 | RAGAS |
|------|:---:|:---:|:---:|
| 需要参考答案 | ✅ | ✅ | ❌ |
| 评估语义忠实度 | ❌ | 部分 | ✅ |
| 评估检索质量 | ❌ | ❌ | ✅ |
| 可用于生产监控 | 受限 | 受限 | ✅ |
| 与人类判断一致性 | 低 | 中 | 高 |

RAGAS 的核心优势在于：(1) 无需标注数据即可评估，适合快速迭代和生产环境监控；(2) 通过结构化分解将评估任务简化，提高 LLM 评估的可靠性；(3) 三个维度分别覆盖生成器和检索器，提供全面的系统诊断能力。

#### 🧪 练习题

```yaml
question: "RAGAS 的 Faithfulness 指标为什么要先将答案分解为原子声明再逐条验证，而不是直接让 LLM 判断整个答案是否忠实？"
options:
  - "为了减少 LLM 的 API 调用次数，降低评估成本"
  - "将复杂的整体判断拆解为多个简单的二元判断，降低 LLM 的认知负担，提高评估准确性"
  - "因为 LLM 无法理解完整的答案文本，只能处理短句"
  - "为了生成更多的训练数据用于微调评估模型"
answer: 1
explain: "声明级分解将'整个答案是否忠实'这一复杂判断拆解为多个'单条声明是否可从上下文推断'的简单二元任务，实验表明这种结构化方法（95%一致率）远优于直接让 LLM 整体打分（72%）。"
```