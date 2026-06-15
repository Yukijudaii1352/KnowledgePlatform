### RAGUARD：误导性检索鲁棒性基准

```yaml
id: raguard
name: RAGUARD
full_name: RAG鲁棒性评测基准 (RAG Robustness Benchmark)
year: '2026.05'
org: Stanford/Google
paper_url: https://arxiv.org/abs/2410.20992
category: frontier_2026
parent: rgb
motivation: 首个误导性检索鲁棒性基准，测试冲突信息判断力
```

#### 📝 一句话总结

RAGUARD 构建面向事实核查的误导性检索基准，把 PolitiFact 声明与 Reddit 讨论证据配对并标注 supporting、misleading、irrelevant，用来评估 RAG 系统在真实冲突证据下是否比零检索更可靠。

#### 🎯 核心要点

- **实际论文页**：manifest 中 `2410.20992` 指向无关信道估计论文；RAGuard 实际公开论文为 `https://arxiv.org/abs/2502.16101`。
- **任务定位**：不是评估干净 gold retrieval，而是评估 RAG 对误导性证据的鲁棒性。
- **真实噪声来源**：检索语料来自 Reddit 讨论，捕捉自然发生的错误、偏见、片面叙事和冲突信息。
- **三类证据标签**：supporting、misleading、irrelevant，区分支持、误导和无关上下文。
- **数据构造**：从 PolitiFact 收集政治声明和真伪标签，用 GPT-4 扩展关键词并检索 Reddit 文档。
- **核心发现**：多种 LLM-RAG 系统在误导性检索下表现低于 zero-shot/no retrieval 基线。

#### 🔬 深入细节

![RAGuard 数据构造流程](https://ar5iv.labs.arxiv.org/html/2502.16101/assets/figures/newconstruct.png)

*图源：ar5iv 论文图 4，展示 RAGuard 从事实核查声明、Reddit 检索和 LLM 辅助标注构造基准。*

```python
def build_raguard(politifact_claims, google_search, reddit_corpus, gpt4):
    dataset = []
    for claim, gold_label in politifact_claims:
        keywords = gpt4.extract_keywords(claim)
        docs = google_search(site="reddit.com", query=keywords, top_k=10)
        for doc in docs:
            predicted = gpt4.fact_check(claim, context=doc)
            if predicted == gold_label:
                tag = "supporting"
            elif doc_irrelevant_to_claim(doc, claim):
                tag = "irrelevant"
            else:
                tag = "misleading"
            dataset.append((claim, gold_label, doc, tag))
    return dataset

def evaluate_rag_guard(model, claim, retriever, mode):
    if mode == "zero_context":
        context = []
    elif mode == "standard_rag":
        context = retriever.search(claim, top_k=5)
    elif mode == "misleading_only":
        context = gold_associated_docs(claim, tag="misleading")
    return model.fact_check(claim, context)
```

RAGuard 的基本质疑是：RAG 并不总是提升可靠性。许多基准假设检索文档是 gold 或只有合成噪声，模型只要“利用上下文”就能得分；但真实网络检索常包含片面、过时、政治化或故意误导的信息。RAGuard 因此把检索本身变成压力测试，而不是默认可信环节。

数据集从 PolitiFact 获取政治声明及真伪标签，并把多级真伪压缩为二分类。随后用 GPT-4 提取关键词，通过搜索引擎检索 Reddit 讨论，形成更接近真实网络环境的证据池。Reddit 的价值在于它包含自然出现的支持、反驳、误解、夸张和无关讨论，而不是人为注入的简单噪声。

证据标注采用“模拟 LLM 考试”的方式：给定 claim 和单篇 retrieved document，让 GPT-4 基于该文档判断 claim 的真伪。如果判断与 PolitiFact gold label 一致，则文档是 supporting；如果文档让判断偏离 gold，则是 misleading；如果文档无法提供有效核查信息，则是 irrelevant。这一定义关注文档对 RAG 系统行为的实际影响。

评测设置包括 zero-context、standard RAG、oracle associated documents 和 misleading-only 等模式。核心指标不是召回率越高越好，而是模型能否识别上下文可能错误。论文报告的关键现象是：当提供误导性文档时，多数系统准确率明显低于无检索基线，说明“更多上下文”可能压倒模型原有判断。

#### 🧪 练习题

```yaml
question: "RAGuard 与普通干净检索 QA 基准的主要区别是什么？"
options:
  - "RAGuard 只测试图片分类"
  - "RAGuard 显式加入真实来源的 misleading 证据，测试模型能否抵抗错误检索"
  - "RAGuard 禁止使用任何事实标签"
  - "RAGuard 只比较答案长度"
answer: 1
explain: "RAGuard 的重点是误导性检索鲁棒性，检索文档可能支持、误导或无关，模型必须判断证据可信度。"
```
