### MG-CRAG

```yaml
id: mg_crag
name: MG-CRAG
full_name: 多粒度纠正式RAG (Multi-Granular Corrective RAG)
year: "2026.03"
org: Peking University
paper_url: https://link.springer.com/article/10.1007/s10115-026-02778-2
category: frontier_2026
parent: crag
motivation: 多粒度检索评估器融合，弱监督微调改进CRAG
```

#### 📝 一句话总结

MG-CRAG 在 CRAG 的检索纠错思想上引入段落级 PLRE 与句子级 SLRE 两个检索评估器，并用人工少量标注、Autoencoder 聚类伪标签和残差分类头弱监督训练，让 RAG 在更细粒度上过滤噪声上下文并减少不必要的 Web 搜索。

#### 🎯 核心要点

- **多粒度纠正式 RAG**：先用 passage-level retrieval evaluator (PLRE) 评估整段/文档，再用 sentence-level retrieval evaluator (SLRE) 评估句子级 evidence strip。
- **弱监督四阶段训练**：Retrieval → Manual Labeling → T5-GTR Embedding + Autoencoder/K-Means Clustering → Classification Head Training。
- **三类质量标签**：将候选上下文分为 high、medium、low；high 直接保留，medium 作为可补充证据，low 被过滤。
- **T5-GTR + QNLI Prompt 编码**：把 query-document 或 query-sentence 对组织成 QNLI 风格输入，再映射到 768 维向量。
- **Autoencoder-guided pseudo-labeling**：Autoencoder 将 768 维向量压到低维表示，K-Means 生成伪标签，再用少量人工标注将簇映射到 high/medium/low。
- **Residual classification head**：冻结或复用高效文本编码器表示，用带 9 个残差块的全连接分类头学习检索质量分类，降低对大规模标注和全模型微调的依赖。
- **可调推理模式**：strict、moderate、lenient 三种模式控制 PLRE/SLRE 的通过条件，在准确率、召回率和 Web 搜索调用率之间折中。
- **实验收益**：论文在 ARC-Challenge、PubHealth、PopQA 上验证，报告 ARC-Challenge 68.85% accuracy、PopQA 59.89% accuracy，并强调在 PubHealth 上以更低 Web 搜索率保持相当结果。

#### 🔬 深入细节

![MG-CRAG 训练阶段图](https://github.com/omidacoder/mg-crag/raw/main/images/train_phase.png)
*图：MG-CRAG 官方项目公开的训练阶段图，展示检索、少量人工标注、T5-GTR 嵌入与聚类、分类头训练四阶段。*

![MG-CRAG 推理阶段图](https://github.com/omidacoder/mg-crag/raw/main/images/inference_phase.png)
*图：MG-CRAG 官方项目公开的推理阶段图，展示 PLRE/SLRE 多粒度过滤、模式分支、重排序、Web 搜索补充与最终生成。*

```python
# MG-CRAG 训练与推理伪代码
def train_mg_crag_evaluators(queries, retriever, human_labeler):
    # Stage 1: retrieval
    pairs = []
    for q in queries:
        docs = retriever.retrieve(q, top_k=N)  # MS Contriever in the paper
        pairs.extend((q, doc) for doc in docs)

    # Stage 2: manual labeling on a small subset
    labeled_pairs = human_labeler.label_subset(pairs)
    unlabeled_pairs = [p for p in pairs if p not in labeled_pairs]

    # Stage 3: embedding and clustering
    all_pairs = labeled_pairs + unlabeled_pairs
    embeddings = [
        t5_gtr_encode(f"qnli question: {q} sentence: {text}")
        for q, text in all_pairs
    ]  # each vector has dimension 768
    z = autoencoder.fit_transform(
        embeddings,
        supervised_labels=labeled_pairs.labels,
        losses=["reconstruction", "classification"],
    )
    cluster_ids = kmeans(z, k=3)
    pseudo_labels = map_clusters_to_quality_labels(
        cluster_ids,
        labeled_pairs.labels,
        labels=["low", "medium", "high"],
    )

    # Stage 4: train classification heads for passage-level and sentence-level scoring
    plre = residual_classifier.fit(embeddings, pseudo_labels)
    slre = residual_classifier.fit(sentence_level_embeddings(all_pairs), pseudo_labels)
    return plre, slre


def infer_mg_crag(query, retriever, plre, slre, reranker, web_search, generator, mode):
    docs = retriever.retrieve(query, top_k=N)

    high_docs, medium_docs = [], []
    for doc in docs:
        label = plre.predict(encode_qnli(query, doc))
        if label == "high":
            high_docs.append(doc)
        elif label == "medium":
            medium_docs.append(doc)

    candidate_sentences = split_sentences(high_docs + medium_docs)
    high_sentences, medium_sentences = [], []
    for sent in candidate_sentences:
        label = slre.predict(encode_qnli(query, sent))
        if label == "high":
            high_sentences.append(sent)
        elif label == "medium":
            medium_sentences.append(sent)

    if mode == "strict":
        evidence = only_sentences_from_high_docs(high_sentences, high_docs)
    elif mode == "moderate":
        evidence = high_sentences + medium_sentences
    elif mode == "lenient":
        evidence = high_sentences + medium_sentences + sentences_from(medium_docs)

    evidence = reranker.top_m(query, evidence)
    if not evidence or len(high_sentences) <= WEB_SEARCH_THRESHOLD:
        web_docs = web_search(query_rewrite(query))
        web_sentences = slre_filter_and_rerank(query, web_docs, slre, reranker)
        evidence = reranker.top_m(query, evidence + web_sentences)

    return generator.generate(query=query, evidence=evidence)
```

MG-CRAG 的问题设定来自 CRAG：检索器会把不相关或弱相关文本送进生成器，导致答案被噪声污染；CRAG 通过检索评估器和外部搜索做纠正，但单一粒度的评估器容易把“段落整体相关但内部有噪声句子”与“段落整体一般但包含关键句子”混为一谈。MG-CRAG 的核心改动是把纠正机制拆成两个粒度：PLRE 先在段落/文档层面做粗筛，SLRE 再在句子层面做精筛，从而让生成器看到的是更聚焦的 evidence。

训练阶段的关键是弱监督。论文没有假设存在大规模 high/medium/low 标注，而是先用 MS Contriever 为 ARC-Challenge、PubHealth、PopQA 等短答案任务检索候选文档，人工只标注一小部分 query-document 对；随后 T5-GTR 用 QNLI 风格 prompt 编码每个 pair，Autoencoder 在重建损失下保留语义结构，同时借助少量标注样本的分类损失让瓶颈表示更有判别性。K-Means 在低维表示上聚成 3 类，再由人工标注子集把簇映射为 high、medium、low，形成可扩展的伪标签。

分类头采用残差全连接网络，而不是对大型生成模型做端到端微调。论文附录说明输入是 T5-GTR 的 768 维输出，先投影到 2048 维并加 dropout，核心部分是 9 个残差块；每个残差块包含线性变换、LeakyReLU 和 dropout，维度变化时用线性 down-sampling 对齐 shortcut。这个结构的作用是让轻量分类头在伪标签上学习检索质量边界，同时保持梯度稳定和较低训练成本。

推理时，MG-CRAG 不是简单地把所有 high/medium 文本塞给 LLM。PLRE 先把文档分成 high、medium、low，low 被丢弃；保留下来的文档被拆成句子后再由 SLRE 分类，随后根据 strict、moderate、lenient 三种模式选择 evidence。strict 追求高精度，倾向于只保留高置信文档里的高置信句子；moderate 接受 high 与 medium 证据以平衡召回；lenient 更偏向保留可能有用的 medium 文档内容，适合检索较难或开放域问题。

Web 搜索在 MG-CRAG 中变成一种受控补救动作，而不是默认依赖。推理图中先对高质量句子做 reranking；若没有 high evidence，或 high evidence 数量低于阈值 \(w_s\)，系统才通过 query rewriting 触发 Web 搜索，再把搜索结果交给 SLRE 和 reranker 过滤。这样既保留了 CRAG 的纠错能力，又避免每次查询都付出外部搜索成本。

实验部分表明，多粒度处理对短答案问答尤其有用。论文报告 MG-CRAG 在 ARC-Challenge 上达到 68.85% accuracy，在 PopQA 上达到 59.89% accuracy；在 PubHealth 上结果与强基线相当，同时 Web 搜索率更低。这个结果说明 MG-CRAG 的收益不只是提升回答准确率，也包括把“何时需要外部搜索”变成可调策略，从而控制成本和延迟。

> 💡 关键：MG-CRAG 的创新点不是单独的 reranker 或单独的弱监督分类，而是把多粒度质量评估、伪标签训练、模式化 evidence 选择和按需 Web 搜索组合成一条纠正式 RAG 流程。

#### 🧪 练习题

```yaml
question: "MG-CRAG 为什么同时使用 PLRE 和 SLRE 两个检索评估器？"
options:
  - "PLRE 负责生成答案，SLRE 负责把答案翻译成自然语言"
  - "PLRE 粗筛段落/文档，SLRE 细筛句子级证据，减少段落内部噪声进入生成器"
  - "PLRE 用于训练检索器，SLRE 只用于计算最终 BLEU 分数"
  - "PLRE 和 SLRE 是两个互相投票的生成模型，用来提升解码多样性"
answer: 1
explain: "MG-CRAG 的多粒度核心是先在段落级判断候选文档质量，再在句子级筛出真正支持答案的 evidence strip，从而比单一文档级评估更精细。"
```
