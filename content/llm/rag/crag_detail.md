### CRAG — Corrective Retrieval Augmented Generation

```yaml
id: crag
name: CRAG
full_name: "纠正性检索增强生成 (Corrective Retrieval Augmented Generation)"
year: "2024.01"
org: "USTC & UCLA & Google Research"
paper_url: "https://arxiv.org/abs/2401.15884"
category: architecture
parent: self_rag
motivation: "通过轻量级检索评估器自动判断检索文档质量，触发纠正动作（精炼/Web搜索），解决RAG中检索质量不可靠导致生成幻觉的问题"
```

#### 📝 一句话总结

CRAG 提出了一种即插即用的纠正性检索增强生成框架，通过轻量级检索评估器判断检索文档的质量置信度，并根据置信度触发三种差异化纠正动作（直接精炼、Web搜索补充、两者结合），从而显著提升 RAG 系统在检索质量不可靠时的生成鲁棒性。

#### 🎯 核心要点

- **检索评估器**：基于 T5-large 微调的轻量级评估器，对每个 (query, document) 对打分，估计检索文档与查询的相关性置信度
- **三种触发动作**：根据置信度得分将检索结果分为 Correct（至少一篇高于上阈值）、Incorrect（全部低于下阈值）、Ambiguous（介于两者之间），分别触发不同的知识处理策略
- **知识精炼操作**：将文档分解为细粒度知识条（knowledge strips），逐条用评估器过滤无关信息，重组为精炼后的知识
- **Web 搜索增强**：当检索结果不可靠时，利用 ChatGPT 重写查询关键词，通过 Google Search API 获取补充知识
- **即插即用设计**：可无缝集成到标准 RAG 和 Self-RAG 等现有框架中，无需修改底层 LLM
- **评估基准**：在 PopQA、Biography、PubHealth、Arc-Challenge 四个数据集上验证，覆盖短文本生成、长文本生成和封闭集任务

#### 🔬 深入细节

##### 框架总览

![CRAG 框架总览图](https://arxiv.org/html/2401.15884v2/x2.png)
*图：CRAG 整体框架。检索评估器评估文档质量后触发三种动作：Correct 时精炼文档、Incorrect 时触发 Web 搜索、Ambiguous 时两者结合。*

![检索质量问题示例](https://arxiv.org/html/2401.15884v2/x1.png)
*图：检索增强生成中的典型问题示例。即使是相关文档也可能包含大量无关信息（左），而不相关文档则会直接误导生成（右）。*

##### 算法伪代码

```python
# CRAG 核心流程伪代码
def CRAG(query, retrieved_docs, generator):
    # Step 1: 检索评估 — 对每篇文档评估相关性
    scores = [retrieval_evaluator(query, doc) for doc in retrieved_docs]
    confidence = aggregate_confidence(scores)
    
    # Step 2: 触发动作
    if confidence == CORRECT:  # 至少一篇文档高度相关
        # 精炼内部知识：分解→过滤→重组
        knowledge = refine_documents(query, retrieved_docs, scores)
    
    elif confidence == INCORRECT:  # 所有文档均不相关
        # 触发 Web 搜索获取外部知识
        rewritten_query = rewrite_query_with_llm(query)  # ChatGPT 重写
        web_results = google_search(rewritten_query)
        knowledge = refine_documents(query, web_results)
    
    elif confidence == AMBIGUOUS:  # 不确定
        # 同时使用精炼后的内部知识 + Web 搜索知识
        internal_knowledge = refine_documents(query, retrieved_docs, scores)
        rewritten_query = rewrite_query_with_llm(query)
        web_results = google_search(rewritten_query)
        external_knowledge = refine_documents(query, web_results)
        knowledge = combine(internal_knowledge, external_knowledge)
    
    # Step 3: 生成
    output = generator(query, knowledge)
    return output

def refine_documents(query, docs, scores=None):
    """知识精炼：分解→过滤→重组"""
    all_strips = []
    for doc in docs:
        # 将文档分解为细粒度知识条
        strips = decompose_into_strips(doc)
        # 用评估器逐条过滤
        relevant_strips = [s for s in strips 
                          if retrieval_evaluator(query, s) > threshold]
        all_strips.extend(relevant_strips)
    # 重组为连贯知识
    return recompose(all_strips)
```

##### 动机与背景

检索增强生成（RAG）通过引入外部知识来缓解大语言模型的幻觉问题，但其核心假设是"检索到的文档是相关且有用的"。然而在实际场景中，这一假设经常不成立：

1. **检索器本身不完美**：即使是最先进的检索器也无法保证每次都返回高质量相关文档，尤其在长尾知识和复杂查询场景下
2. **相关文档中的噪声**：即使文档整体相关，其中也可能包含大量与查询无关的冗余信息，这些噪声会干扰生成质量
3. **不相关文档的误导**：当检索到完全不相关的文档时，LLM 可能被错误信息误导，产生比无检索时更严重的幻觉

> 💡 关键洞察：现有 RAG 方法对检索结果"照单全收"，缺乏对检索质量的评估和纠正机制。CRAG 的核心思想是在检索和生成之间插入一个"质量检查站"，根据检索质量动态调整知识来源。

##### 核心机制详解

**1. 检索评估器（Retrieval Evaluator）**

CRAG 使用基于 T5-large 微调的轻量级评估器来估计检索文档的质量。对于每个 query \(x\) 和检索到的文档 \(d\)，评估器输出一个置信度得分：

$$\text{score} = \text{Evaluator}(x, d) \in [-1, 1]$$

评估器的训练数据来自现有数据集的正负样本对，正样本为包含正确答案的文档，负样本通过 BM25/DPR 检索的不相关文档构造。

> ⚠️ 注意：实验表明，这个轻量级 T5-based 评估器的准确率达到 84.3%，显著优于 ChatGPT（58.0%）、ChatGPT-CoT（62.4%）和 ChatGPT-few-shot（64.7%），说明针对性微调的小模型在特定任务上可以超越通用大模型。

**2. 置信度触发机制（Confidence-based Action Triggering）**

基于评估器的得分，CRAG 设定上下两个阈值，将检索结果分为三类：

- **Correct**（\(\exists\, d_i: \text{score}(d_i) > \tau_{\text{upper}}\)）：至少有一篇文档高度相关，对相关文档进行知识精炼后直接使用
- **Incorrect**（\(\forall\, d_i: \text{score}(d_i) < \tau_{\text{lower}}\)）：所有文档均不相关，丢弃检索结果，转而通过 Web 搜索获取新知识
- **Ambiguous**（其他情况）：检索质量不确定，同时使用精炼后的检索文档和 Web 搜索结果

这种三级触发机制比简单的二元判断（相关/不相关）更加灵活，能够更好地处理边界情况。

**3. 知识精炼（Knowledge Refinement）**

这是 CRAG 处理"相关文档中噪声"问题的核心操作。即使文档被判定为相关，其中仍可能包含大量无关信息。精炼过程包括三步：

- **分解（Decompose）**：将每篇文档分解为细粒度的知识条（knowledge strips），每条包含一个独立的信息单元
- **过滤（Filter）**：用检索评估器对每条知识条重新评分，过滤掉与查询不相关的条目
- **重组（Recompose）**：将保留的相关知识条串联重组为连贯的知识文本

> 💡 关键：这种"先拆后滤再组"的策略将文档级别的粗粒度相关性判断细化为条目级别的精细过滤，有效去除了文档内部的噪声信息。

**4. Web 搜索增强（Web Search Augmentation）**

当检索结果被判定为 Incorrect 或 Ambiguous 时，CRAG 启动 Web 搜索流程：

- **查询重写**：使用 ChatGPT 将原始自然语言查询重写为更适合搜索引擎的关键词查询（例如将 "Who is the spouse of XXX?" 重写为 "XXX spouse"）
- **搜索执行**：通过 Google Search API 获取 Web 页面
- **知识选择**：对搜索结果应用与内部文档相同的精炼流程，过滤无关内容

##### 与传统方法的区别

| 特性 | 标准 RAG | Self-RAG | CRAG |
|------|---------|---------|------|
| 检索质量评估 | ❌ 无 | ✅ 通过反思 token | ✅ 专用评估器 |
| 纠正机制 | ❌ 无 | 部分（可选择不使用检索） | ✅ 三级动作触发 |
| 文档精炼 | ❌ 无 | ❌ 无 | ✅ 条目级过滤 |
| 外部知识补充 | ❌ 无 | ❌ 无 | ✅ Web 搜索 |
| 对 LLM 的要求 | 无特殊要求 | 需要专门指令微调 | 无特殊要求（即插即用） |
| 更换 LLM | 简单 | 需重新微调 | 简单 |

> 💡 关键优势：Self-RAG 需要在 LLM 中嵌入反思 token 并进行专门的指令微调，这限制了其灵活性。当底层 LLM 从 SelfRAG-LLaMA2-7b 更换为普通 LLaMA2-hf-7b 时，Self-RAG 性能大幅下降甚至不如标准 RAG，而 CRAG 仍保持竞争力。

##### 实验结果

在四个基准数据集上的主要结果（基于 SelfRAG-LLaMA2-7b）：

| 方法 | PopQA (Acc) | Biography (FactScore) | PubHealth (Acc) | Arc-Challenge (Acc) |
|------|------------|----------------------|-----------------|---------------------|
| Self-RAG | 54.9 | 81.2 | 72.4 | 67.2 |
| Self-CRAG | **61.8** | **86.2** | **74.8** | 67.2 |
| 提升 | +6.9 | +5.0 | +2.4 | — |

消融实验（PopQA，SelfRAG-LLaMA2-7b）表明每个组件都不可或缺：
- 移除 Correct 动作：61.8 → 59.6（-2.2）
- 移除 Incorrect 动作：61.8 → 60.8（-1.0）
- 移除文档精炼：61.8 → 52.2（-9.6，影响最大）
- 移除查询重写：61.8 → 58.4（-3.4）

#### 🧪 练习题

```yaml
question: "当 CRAG 的检索评估器判定所有检索文档均不相关（Incorrect）时，系统会采取什么动作？"
options:
  - "直接使用原始检索文档生成回答"
  - "对检索文档进行知识精炼后使用"
  - "丢弃检索结果，通过 Web 搜索获取新的外部知识"
  - "将查询拆分为多个子查询重新检索"
answer: 2
explain: "当所有文档的置信度得分均低于下阈值时，CRAG 判定为 Incorrect，会完全丢弃不可靠的检索结果，转而通过重写查询并调用 Web 搜索来获取新的外部知识作为生成依据。"
```