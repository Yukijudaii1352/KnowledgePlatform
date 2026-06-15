### Qwen3-Embedding：面向检索与重排的 Qwen3 表征模型

```yaml
id: qwen3_embedding
name: Qwen3-Embedding
full_name: Qwen3嵌入模型 (Qwen3 Text Embedding)
year: '2026.04'
org: Alibaba
paper_url: https://qwenlm.github.io/blog/qwen3-embedding/
category: frontier_2026
parent: e5
motivation: 8B参数MTEB 70.6，支持32K上下文多语言检索
```

#### 📝 一句话总结

Qwen3-Embedding 基于 Qwen3 foundation model 构建文本嵌入和重排模型系列，使用双编码器、交叉编码器、多阶段训练和 instruction-aware 输入，面向多语言、长上下文、检索与 RAG 场景提供高质量向量表示。

#### 🎯 核心要点

- **模型系列**：Embedding 和 Reranker 均提供 0.6B、4B、8B 三种规模。
- **32K 上下文**：嵌入与重排模型均支持长上下文输入，适合长文档检索。
- **双编码器嵌入**：Embedding 模型用最后 `[EOS]` hidden state 表示单段文本。
- **交叉编码器重排**：Reranker 输入 query-document pair，输出相关性分数。
- **MRL 支持**：Embedding 支持自定义最终向量维度，便于不同存储/延迟预算部署。
- **多语言能力**：支持 100+ 语言和代码检索，官方博客报告 8B 在 MTEB multilingual leaderboard 得分约 70.58。

#### 🔬 深入细节

![Qwen3-Embedding 训练流程](https://ar5iv.labs.arxiv.org/html/2506.05176/assets/figures/q3e-train-pipeline.png)

*图源：Qwen3-Embedding 技术报告的公开 ar5iv 页面，展示 Qwen3-Embedding 与 Qwen3-Reranker 的三阶段训练流程。*

```python
def embed_text(text, instruction, qwen3_embedding):
    prompt = format_instruction(instruction, text)
    states = qwen3_embedding.forward(prompt)
    return normalize(states["eos_hidden_state"])

def rerank(query, documents, qwen3_reranker):
    scored = []
    for doc in documents:
        pair = format_pair(query, doc)
        score = qwen3_reranker.cross_encoder_score(pair)
        scored.append((score, doc))
    return [doc for score, doc in sorted(scored, reverse=True)]

def rag_with_qwen3(query, corpus):
    q_vec = embed_text(query, "Represent this query for retrieval", qwen3_embedding)
    candidates = vector_search(q_vec, corpus, top_k=100)
    reranked = rerank(query, candidates, qwen3_reranker)
    return llm_answer(query, reranked[:10])
```

Qwen3-Embedding 的工程定位是 RAG 检索栈中的 first-stage dense retriever 与 second-stage reranker。Embedding 模型采用双编码器，查询和文档可独立编码并存入向量库，适合大规模 ANN 检索；Reranker 采用 cross-encoder，推理更慢但能逐对建模 query-document 交互，适合重排 top-100 候选。

嵌入模型的表示取最后 `[EOS]` token 的隐藏状态。这与许多 decoder-only embedding 模型一致：把整段文本通过自回归 backbone 编码后，用句末位置聚合语义。模型还支持 instruction-aware 输入，例如为“法律检索”“代码搜索”“跨语言问答”定制不同指令，从而让同一文本在不同任务下产生更合适的向量。

训练分三阶段。第一阶段用大规模弱监督/合成 pair 做 contrastive pre-training，强化通用语义对齐；第二阶段用高质量标注数据做监督训练，提升检索任务表现；第三阶段通过采样 checkpoint merging 融合候选模型，改善泛化。Reranker 则主要使用高质量标注数据做监督训练，以提高 query-document 精细相关性判断。

在 RAG 系统中，Qwen3-Embedding 的价值不只是分数高，还在于 32K 长上下文、多语言、代码检索和可调维度。实际部署中常见组合是：8B/4B embedding 负责高召回，0.6B 或 4B reranker 按延迟预算重排；若向量库成本敏感，可利用 MRL 输出较短维度向量。

#### 🧪 练习题

```yaml
question: "Qwen3-Embedding 与 Qwen3-Reranker 在检索栈中的典型分工是什么？"
options:
  - "Embedding 负责大规模召回，Reranker 对候选 query-document pair 做精细重排"
  - "Embedding 只负责图像生成，Reranker 只负责语音识别"
  - "二者都只能处理 512 token"
  - "Reranker 用来替代向量数据库存储所有文档"
answer: 0
explain: "双编码器 embedding 适合向量库召回；交叉编码器 reranker 更适合对少量候选做高精度相关性判断。"
```
