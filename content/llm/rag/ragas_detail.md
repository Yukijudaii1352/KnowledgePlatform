### RAGAS

```yaml
id: ragas
name: RAGAS
full_name: RAG评估框架 (Retrieval-Augmented Generation Assessment)
year: "2024.05"
org: Explorium
paper_url: https://arxiv.org/abs/2309.15217
category: evaluation
parent: —
motivation: RAG三元组评估法，LLM-as-judge评估忠实度
```

#### 📝 一句话总结

RAGAS 提出了一套面向 RAG 三元组 \((q, c(q), a_s(q))\) 的无参考自动评估框架，用 LLM-as-judge 将忠实度、答案相关性、上下文相关性拆成可执行的子判断，解决 RAG 系统缺少人工参考答案时难以持续评估的问题。

#### 🎯 核心要点

- **RAG 三元组评估**：仅依赖问题 \(q\)、检索上下文 \(c(q)\)、系统答案 \(a_s(q)\)，不要求 ground truth answer。
- **Faithfulness 忠实度**：先把答案拆成原子事实声明，再逐条判断声明能否由上下文推出，用于检测基于上下文的事实幻觉。
- **Answer Relevance 答案相关性**：从答案反向生成若干可能问题，再计算这些问题与原始问题的嵌入相似度，惩罚答非所问、信息缺失和冗余回答。
- **Context Relevance 上下文相关性**：让 LLM 从检索上下文中抽取回答问题所需的关键句，按关键句占全部上下文句子的比例估计检索噪声。
- **结构化 LLM-as-judge**：避免让 LLM 一次性给整体质量打分，而是把评估拆成声明生成、NLI 判断、问题生成、句子抽取等更稳定的局部任务。
- **WikiEval 验证集**：论文构造 50 个基于 2022 年后 Wikipedia 页面的样本，并用人工偏好比较验证指标与人类判断的一致性。
- **实验结论**：在 WikiEval 成对比较中，RAGAS 在 Faithfulness、Answer Relevance、Context Relevance 上分别达到 0.95、0.78、0.70 的人工一致率，优于直接 GPT Score 和 GPT Ranking。

#### 🔬 深入细节

![RAGAS 评估框架图](https://assets.zilliz.com/large_Mar_18_RAG_Evaluation_using_Ragas_20240318_080304_62e448ec81.png)
*图：公开 RAGAS 框架示意图，展示 RAG 评估围绕问题、上下文、答案和可选参考答案展开；论文核心关注无需参考答案的 Faithfulness、Answer Relevance、Context Relevance 三项指标。*

```python
# RAGAS 三元组评估伪代码
def evaluate_ragas(question, context, answer, llm, embedder, n_questions=3):
    # 1. Faithfulness: answer -> statements -> supported / unsupported
    statements = llm.extract_atomic_statements(question=question, answer=answer)
    supported = 0
    for statement in statements:
        verdict = llm.verify_statement(context=context, statement=statement)
        if verdict == "Yes":
            supported += 1
    faithfulness = supported / max(len(statements), 1)

    # 2. Answer Relevance: answer -> reverse questions -> embedding similarity
    generated_questions = [
        llm.generate_question_from_answer(answer)
        for _ in range(n_questions)
    ]
    q_vec = embedder.encode(question)
    answer_relevance = mean(
        cosine_similarity(q_vec, embedder.encode(q_i))
        for q_i in generated_questions
    )

    # 3. Context Relevance: context -> answer-supporting sentences
    relevant_sentences = llm.extract_relevant_sentences(
        question=question,
        context=context,
    )
    total_sentences = sentence_count(context)
    context_relevance = len(relevant_sentences) / max(total_sentences, 1)

    return {
        "faithfulness": faithfulness,
        "answer_relevance": answer_relevance,
        "context_relevance": context_relevance,
    }
```

RAGAS 的出发点是生产环境里的 RAG 往往没有标准答案。传统 QA 指标通常假设有人工标注答案或可抽取短答案，但真实 RAG 系统的输出是长文本，质量同时取决于检索器是否取回了聚焦上下文，以及生成器是否正确利用了这些上下文。论文因此把评估对象固定成 \((q, c(q), a_s(q))\)：问题、检索到的上下文、系统生成答案。这样做的价值是可以直接接入线上日志，对每次 RAG 调用做自动诊断，而不是等人工标注集积累完再评估。

Faithfulness 是最核心的幻觉检测指标。RAGAS 不直接问 LLM “这个答案是否忠实”，而是先让 LLM 把答案拆成短而集中的 statements，再逐条用上下文做蕴含判断。若答案声明集合为 \(S\)，被上下文支持的声明集合为 \(V\)，则：

$$
F = \frac{|V|}{|S|}
$$

这个设计的关键直觉是把复杂主观判断变成多个二元 NLI 式判断。一个长答案可能大部分正确、局部幻觉；整体打分容易掩盖局部错误，而 statement 级验证能定位具体不被上下文支持的事实，从而给 RAG 调参与失败分析提供更细粒度信号。

Answer Relevance 只衡量“答得是否切题”，刻意不检查事实正确性。RAGAS 采用反向问题生成：如果答案确实围绕原问题，那么从答案生成的问题 \(q_i\) 应该与原问题 \(q\) 语义接近。论文用文本嵌入计算平均余弦相似度：

$$
AR = \frac{1}{n}\sum_{i=1}^{n} \operatorname{sim}(q, q_i)
$$

这种间接评估避免了让 LLM 凭感觉给“相关性”打分。答案若遗漏问题关键约束，反向生成的问题会变得更宽泛；答案若夹带冗余事实，生成的问题也可能偏离原始意图，最终拉低平均相似度。

Context Relevance 则面向检索器。它要求 LLM 从 \(c(q)\) 中抽取真正有助于回答 \(q\) 的句子集合 \(S_{ext}\)，再用关键句数占总句数的比例近似上下文聚焦程度：

$$
CR = \frac{|S_{ext}|}{\text{number of sentences in } c(q)}
$$

该指标的方向不是“检索结果越多越好”，而是惩罚噪声上下文。对于长上下文 RAG，冗余段落会增加 token 成本，也可能让模型忽略中间位置的关键信息；因此 Context Relevance 直接反映检索结果是否足够精炼。论文也指出这是三项指标里最难稳定判断的一项，因为长上下文中的关键句抽取对 LLM 本身要求更高。

WikiEval 的构造用于检验这些指标是否真能对齐人类偏好。论文选取 50 个 2022 年以后发生事件相关的 Wikipedia 页面，生成可由页面引言回答的问题，再构造高低质量对比样本：无上下文回答用于制造低忠实度答案，不完整回答用于测试答案相关性，反向链接和补全内容用于制造冗余上下文。两名英语流利标注者独立比较样本，最终 RAGAS 在忠实度上达到 0.95 的人工一致率，显著高于让 ChatGPT 直接 0-10 打分或直接排序。

> 💡 关键：RAGAS 的贡献不只是“用 LLM 当裁判”，而是提出了一套把 RAG 质量拆解为可审计中间步骤的评估流程。它牺牲了一点调用复杂度，换来更高的可解释性和更可靠的线上诊断能力。

#### 🧪 练习题

```yaml
question: "RAGAS 的 Faithfulness 指标为什么要把答案拆成 statements 再验证？"
options:
  - "为了让答案更短，从而降低生成模型的输出 token 数"
  - "为了把整体忠实度判断拆成多个声明级支持性判断，定位哪些事实无法由上下文推出"
  - "为了训练一个新的检索器，让检索结果更接近人工参考答案"
  - "为了把上下文相关性和答案相关性合并成一个单一分数"
answer: 1
explain: "Faithfulness 的核心是 statement-level verification。拆分后每条事实声明都能单独与上下文做支持性判断，比直接整体打分更可解释，也更容易发现局部幻觉。"
```
