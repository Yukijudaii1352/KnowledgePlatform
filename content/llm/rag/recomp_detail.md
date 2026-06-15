### RECOMP：检索内容压缩

```yaml
id: recomp
name: RECOMP
full_name: 检索内容压缩 (Retrieval-Augmented LMs with Compression)
year: '2023.10'
org: Princeton
paper_url: https://arxiv.org/abs/2310.04444
category: architecture
parent: rag
motivation: 训练专门压缩器将多文档浓缩为极简摘要
```

#### 📝 一句话总结

RECOMP 在检索和生成之间插入专门的压缩器，把多篇检索文档压缩成面向任务的短摘要，解决 RAG 上下文过长、无关证据干扰和推理成本过高的问题。

#### 🎯 核心要点

- **实际论文页**：manifest 中 `2310.04444` 指向无关提示控制论文，RECOMP 实际公开论文为 `https://arxiv.org/abs/2310.04408`。
- **Retrieve-Compress-Prepend**：先检索文档，再压缩成摘要，最后把摘要而非全文拼接给 LM。
- **抽取式压缩器**：训练双编码器按任务收益选择最有帮助的句子。
- **生成式压缩器**：蒸馏大模型的 query-focused summarization 能力，生成跨文档摘要。
- **选择性增强**：如果检索结果无帮助，压缩器可以输出空串，避免错误或无关上下文污染 LM。
- **端任务信号训练**：压缩目标不是普通摘要质量，而是摘要拼接后能否提升 LM 的语言建模或 QA 表现。

#### 🔬 深入细节

![RECOMP 流程图](https://ar5iv.labs.arxiv.org/html/2310.04408/assets/x1.png)

*图源：ar5iv 论文图 1，展示 RECOMP 将检索文档压缩为短摘要后再送入语言模型。*

```python
def recomp_answer(query, retriever, compressor, lm, corpus):
    docs = retriever.search(query, corpus, top_k=5)
    summary = compressor.compress(query=query, documents=docs)

    # selective augmentation: 无帮助时允许不增强
    if summary.strip():
        prompt = summary + "\n\nQuestion: " + query
    else:
        prompt = "Question: " + query

    return lm.generate(prompt)

def train_abstractive_compressor(train_examples, teacher_lm, base_lm):
    targets = []
    for query, docs, gold in train_examples:
        summaries = [teacher_lm.summarize(query, docs, p) for p in prompt_pool]
        best = max(summaries, key=lambda s: score(base_lm, s, query, gold))
        if score(base_lm, best, query, gold) < score(base_lm, "", query, gold):
            best = ""
        targets.append((query, docs, best))
    return finetune_encoder_decoder(targets)
```

RECOMP 的问题设定很现实：RAG 检索到的文档通常有数百到数千 token，直接拼接会让推理成本随检索文档长度线性上涨；更糟的是，模型并不总能从长上下文中找到关键句，甚至会被中间位置或无关文档干扰。RECOMP 因此把检索文档 \(D=[d_1,\dots,d_N]\) 压缩为短摘要 \(s=c_\theta(x,D)\)，再让黑盒 LM 生成 \(p(y\mid x,s)\)。

抽取式压缩器把每个候选句子和查询分别编码，用内积估计“把这个句子放进 prompt 后是否有助于 LM 生成目标答案”。它与普通 reranker 的差异是粒度更细：检索器通常返回段落，RECOMP 的抽取器返回句子；评分依据也不是句子与问题的语义相似度，而是句子对下游 LM 生成正确输出的因果贡献。

生成式压缩器面向多文档综合。论文用强教师模型为每组 \((x,D,y)\) 产生多个 query-focused 摘要，再用端任务分数过滤：如果某个摘要比无检索更差，就把目标摘要设为空串。这个“空串目标”是选择性增强的关键，它让压缩器学会在检索无用时保持沉默，而不是为了形式完整强行写摘要。

与 Long Context LM 或直接 top-k 文档拼接相比，RECOMP 的优势是把信息瓶颈显式放在一个小模型里。它减少 token 成本，也降低 LM 在无关证据上浪费注意力的概率；局限是压缩器可能丢掉后续推理需要的细节，因此更适合答案证据可被短文本表达的 QA、语言建模和事实补全任务。

#### 🧪 练习题

```yaml
question: "RECOMP 中选择性增强的含义是什么？"
options:
  - "只检索图片，不检索文本"
  - "当检索文档无帮助时，压缩器可以输出空摘要，避免拼接噪声"
  - "把所有检索文档完整复制到 prompt"
  - "只使用最大的语言模型作为检索器"
answer: 1
explain: "RECOMP 的压缩器以端任务收益为目标训练；如果摘要会降低 LM 表现，训练目标可以设为空串。"
```
