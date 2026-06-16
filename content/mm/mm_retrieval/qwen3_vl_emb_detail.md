### Qwen3-VL-Embedding — 通义千问多模态嵌入 (Qwen3-VL-Embedding)

```yaml
id: qwen3_vl_emb
name: Qwen3-VL-Embedding
full_name: 通义千问多模态嵌入 (Qwen3-VL-Embedding)
year: '2026'
org: Alibaba
paper_url: https://arxiv.org/abs/2601.04720
category: frontier_2026
parent: blip2
motivation: 统一检索与重排序框架
```

#### 📝 一句话总结

Qwen3-VL-Embedding 基于 Qwen3-VL 构建统一多模态向量模型，并配套 Qwen3-VL-Reranker 形成“召回 + 重排”框架，解决文本、图像、文档图像和视频检索难以同时兼顾泛化、精度与部署效率的问题。

#### 🎯 核心要点

- 统一输入模态：支持文本、图像、截图、视频及混合多模态实例
- 双模型框架：Embedding 用双塔独立编码做高效召回，Reranker 用单塔交叉编码做精细相关性判断
- 表征方式：Embedding 取 Qwen3-VL 上下文末尾 PAD token 的最后隐状态作为 dense vector
- 多阶段训练：大规模对比预训练 → 多任务对比学习与 reranker SFT → reranker 蒸馏与模型合并
- 检索目标：多模态 retrieval 用带 hard negative 和 false-negative mask 的 InfoNCE 变体
- 部署增强：支持 Matryoshka Representation Learning、量化感知训练、32K 上下文和 2B/8B 两档规模

#### 🔬 深入细节

![Qwen3-VL-Embedding 官方示意图](https://model-demo.oss-cn-hangzhou.aliyuncs.com/Qwen3-VL-Embedding.png)
*图：官方模型卡示意。论文 Figure 2 进一步给出 Qwen3-VL-Embedding 与 Qwen3-VL-Reranker 的架构总览：Embedding 输出向量，Reranker 输出 yes/no 相关性分数。*

```python
# Qwen3-VL-Embedding + Reranker 两阶段检索流程
def encode_instance(instance, instruction="Represent the user's input"):
    tokens = qwen3_vl_format(
        system=instruction,
        user=instance,
        assistant_suffix="<|endoftext|>",
    )
    hidden = qwen3_vl(tokens).last_hidden_state
    return l2_normalize(hidden[position_of("<|endoftext|>")])

def retrieve_and_rerank(query, corpus, top_k=100):
    q_vec = encode_instance(query, instruction="Retrieve relevant multimodal content.")
    d_vecs = [encode_instance(doc) for doc in corpus]
    recall = topk(cosine(q_vec, d_vecs), k=top_k)

    scores = []
    for doc in recall:
        logits = qwen3_vl_reranker(instruction, query, doc).next_token_logits
        score = sigmoid(logits["yes"] - logits["no"])
        scores.append((score, doc))
    return sorted(scores, reverse=True)
```

Qwen3-VL-Embedding 的核心设计是把 Qwen3-VL 的多模态理解能力转成可离线存储的检索向量。输入遵循 Qwen3-VL 对话格式：系统消息放任务 instruction，用户消息放待表示的文本、图像、视频或混合实例，最后追加 PAD token `<|endoftext|>`；模型取该 token 对应的最后一层隐状态作为实例向量 \(z\)。查询和文档独立编码，因此大规模语料可以提前建库，在线只做向量相似度。

对于检索数据，论文使用多任务对比学习。给定查询 \(q_i\)、正样本文档 \(d_i^+\)、hard negatives \(d_{i,k}^-\)，Stage 1 的核心目标为：

$$
\mathcal{L}_{\mathrm{retrieval}}
=-\frac{1}{N}\sum_{i=1}^{N}
\log\frac{\exp(s(q_i,d_i^+)/\tau)}{Z_i}
$$

其中 \(s(\cdot,\cdot)\) 是余弦相似度，\(\tau\) 是温度。\(Z_i\) 不只包含正样本和 hard negatives，还包含 batch 内 query-query、document-document、query-document 等负项；论文用 mask \(m_{ij}\) 过滤潜在 false negatives，避免把比正样本还相似的样本硬当负例。Stage 2 面向更高质量数据时移除了 query-query 和 document-document 项，让目标更贴近实际检索排序。

Reranker 是同一框架的精排模块。它不再独立编码查询和文档，而是把 instruction、query、document 一起送入 Qwen3-VL，做 pointwise 二分类：相关输出 `yes`，不相关输出 `no`。训练损失为：

$$
\mathcal{L}_{\mathrm{reranking}}=-\log p(l\mid I,q,d)
$$

推理时把 yes/no logits 转成连续相关性分数：

$$
s=\operatorname{sigmoid}(\operatorname{logit}(\text{yes})-\operatorname{logit}(\text{no}))
$$

这种设计牺牲了独立编码的效率，但能让查询和文档在 Transformer 内充分交互，因此适合对 Embedding 召回的 top candidates 做二阶段重排。

训练流程的第三阶段把 Reranker 的细粒度判断蒸馏回 Embedding。对一个 query 的正样本和 \(k\) 个负样本，先离线计算 reranker 分布，再让 embedding 相似度分布去拟合它：

$$
\mathcal{L}_{\text{distill}}
=-\sum_{i=1}^{k+1}P_{\text{reranker}}(d_i\mid q)
\log P_{\text{embedding}}(d_i\mid q)
$$

这一步把交叉编码器的精排知识压进双塔向量空间，让最终 Embedding 在保持检索效率的同时获得更强的相关性边界。论文还使用模型合并缓解蒸馏后分类、QA 等非检索任务的退化。

MRL 和 QAT 是面向部署的关键补丁。MRL 在完整向量及多个前缀维度上同时优化，使用户可以按存储预算截断维度，例如从 4096 维降到更低维仍保持可用效果；QAT 在训练时同时考虑全精度和低精度嵌入，并用 LSQ/STE 让模型适应 int8 或二值化等量化格式。它们共同把“好用的多模态向量”推进到可大规模建索引的形态。

> 💡 关键：Qwen3-VL-Embedding 不是只做图文 CLIP 式对齐，而是把 instruction-aware、多模态长上下文、reranker 蒸馏和可变维/量化部署放在同一个检索框架里。

#### 🧪 练习题

```yaml
question: "Qwen3-VL-Embedding 为什么还需要配套 Qwen3-VL-Reranker？"
options:
  - "Embedding 不能处理图像，只能处理文本"
  - "Reranker 可对召回候选做查询-文档交叉编码，提供更细粒度的相关性评分"
  - "Reranker 用来替代所有向量索引，直接遍历全库"
  - "Embedding 只在训练阶段使用，推理时不会输出向量"
answer: 1
explain: "Embedding 适合高效召回，Reranker 通过单塔交互精排 top candidates，两者组合兼顾效率与精度。"
```
