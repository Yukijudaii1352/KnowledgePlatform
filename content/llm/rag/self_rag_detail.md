### Self-RAG：自我反思检索增强生成

```yaml
id: self_rag
name: Self-RAG
full_name: 自我反思检索增强生成 (Self-Reflective Retrieval-Augmented Generation)
year: '2024.03'
org: University of Washington
paper_url: https://arxiv.org/abs/2310.11511
category: architecture
parent: rag
motivation: 反射Token自主决策检索时机并批判结果事实性
```

#### 📝 一句话总结

Self-RAG 训练语言模型生成特殊反射 token，让模型在推理时自主决定是否检索，并评价检索段落相关性、回答是否被支持以及输出是否有用，从而把检索控制和事实性批判内化到一个生成模型中。

#### 🎯 核心要点

- **四类反射 token**：Retrieve、IsRel、IsSup、IsUse 分别控制检索、相关性、证据支持和效用评分。
- **Critic 蒸馏**：先用 GPT-4 标注反射信号，再训练 Critic 为大规模语料自动插入 token。
- **标准 LM 训练**：Generator 在带反射 token 的语料上做 next-token prediction，无需 RL。
- **按需检索**：推理时由 Retrieve token 概率决定是否调用检索器，而不是固定检索。
- **候选证据重排**：对多个检索段落并行生成候选片段，再用 IsRel/IsSup/IsUse 加权选优。
- **可控解码**：推理阶段可调节不同 critique 权重，在引用精度、事实性和流畅度之间取舍。

#### 🔬 深入细节

![Self-RAG 框架](https://ar5iv.labs.arxiv.org/html/2310.11511/assets/x1.png)

*图源：ar5iv 论文图 1，展示 Self-RAG 通过 Retrieve 和 critique token 控制检索与自我评估。*

```python
def self_rag(query, generator, retriever, threshold=0.2, top_k=5):
    output = []
    while not generator.done(output):
        p_retrieve = generator.prob("[Retrieve]", query, output)

        if p_retrieve > threshold:
            passages = retriever.search(query, top_k=top_k)
            candidates = []
            for passage in passages:
                text, rel, sup, use = generator.generate_with_reflection(
                    query=query,
                    prefix=output,
                    passage=passage,
                )
                score = (
                    generator.logprob(text)
                    + score_relevance(rel)
                    + score_support(sup)
                    + 0.5 * score_utility(use)
                )
                candidates.append((score, text))
            output.append(max(candidates)[1])
        else:
            output.append(generator.generate_without_retrieval(query, output))

    return "".join(output)
```

Self-RAG 针对传统 RAG 的两个缺陷：第一，固定检索会让简单常识问题也携带外部文档，降低模型灵活性；第二，检索到文档后，模型通常缺少显式机制判断文档是否相关、答案是否被证据支持。Self-RAG 的做法不是外接多个分类器，而是把这些判断变成模型可生成的离散 token。

训练流程分为 Critic 和 Generator 两步。Critic 先学习 GPT-4 对检索必要性、段落相关性、证据支持度和输出效用的判断，然后离线标注训练样本。Generator 的词表加入这些反射 token，在标注语料上直接优化：

$$
\max_\theta \sum_t \log p_\theta(y_t \mid x, y_{<t}),
$$

其中 \(y_t\) 既可以是普通文本，也可以是 `[Retrieve]`、`[IsRel]`、`[IsSup]`、`[IsUse]` 等控制 token。

推理时，Retrieve token 决定是否检索；如果需要检索，模型对每个候选段落生成回答片段及 critique token。最终分数可写成：

$$
S(y,d)=\log p_\theta(y\mid x,d)+w_rR_{\text{rel}}+w_sR_{\text{sup}}+w_uR_{\text{use}}.
$$

这让 Self-RAG 在解码阶段能偏好“相关、被支持、有用”的片段，而不是只看语言模型概率。

与 FLARE 依赖 logprob 阈值不同，Self-RAG 通过训练显式学会何时检索和如何批判证据，因此不需要人工设计低置信规则；代价是需要构造反射 token 标注和训练 Generator。它适合事实性要求高、需要引用或长答案分段生成的场景。

#### 🧪 练习题

```yaml
question: "Self-RAG 的 IsSup token 主要用于判断什么？"
options:
  - "是否需要扩大模型参数量"
  - "生成内容是否被检索证据支持"
  - "检索器是否使用 BM25"
  - "输出文本是否需要翻译"
answer: 1
explain: "IsSup 是证据支持度反射 token，用来批判生成片段是否能从检索段落中得到支撑。"
```
