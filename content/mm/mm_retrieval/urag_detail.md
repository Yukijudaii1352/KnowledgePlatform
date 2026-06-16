### URaG：统一检索生成

```yaml
id: urag
name: URaG
full_name: 统一检索生成 (URaG)
year: '2026'
org: —
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/39729
category: frontier_2026
parent: blip2
motivation: 检索与生成深度耦合
```

#### 📝 一句话总结

URaG 提出在单个多模态大语言模型内部统一检索与生成，把早期 Transformer 层的隐藏状态转化为证据页选择器，解决长文档理解中无关页面干扰和长序列计算开销过高的问题。它不额外引入独立检索器，而是在推理过程中保留 top-k 相关页面、丢弃无关视觉 token，让深层 LLM 只对关键证据进行精读和回答生成。

#### 🎯 核心要点

- **统一检索与生成**：在一个 MLLM 内完成证据页检索和答案生成，避免外部 retriever 与 generator 分离带来的系统复杂度和误差传播。
- **粗到细观察**：论文发现 MLLM 处理多页文档时，早层注意力更分散，中深层逐渐聚焦证据页，说明模型内部已经具备可利用的证据定位能力。
- **轻量跨模态检索模块**：在早期 LLM 层隐藏状态上接入两层线性投影和 GELU，把视觉 token 与查询 token 映射到低维归一化特征空间。
- **Contextualized late interaction**：对每个查询 token 取其与页面视觉 token 的最大相似度，再对查询 token 求和，得到 query-page 相关性分数。
- **Top-k 页面保留**：默认在第 6 层检索 top-5 页面，并直接从隐藏状态中删除未命中页面的视觉 token，降低后续深层 Transformer 的序列长度。
- **两阶段训练**：先冻结 MLLM、只预训练检索模块；再给 LLM 和检索模块加入 LoRA，用检索损失与生成交叉熵联合微调。
- **基座与数据**：URaG-3B/7B 基于 Qwen2.5-VL，在 MPDocVQA、DUDE、SlideVQA 等多页文档数据上训练和评测。
- **效率收益**：在长输入设置下相对 baseline 降低约 44%-56% FLOPs，同时在多个长文档理解与证据页检索基准上达到或刷新最佳结果。

#### 🔬 深入细节

![URaG 框架图](https://raw.githubusercontent.com/shi-yx/URaG/main/figures/urag_framework.jpg)
*图：URaG 在早期 LLM 层后插入跨模态检索模块，选择 top-k 证据页，并让深层 LLM 只继续处理保留下来的视觉 token。*

![URaG 层级分析](https://raw.githubusercontent.com/shi-yx/URaG/main/figures/layer_study.png)
*图：论文对不同模型和数据集的层级分析。早层 attention entropy 较高，深层更聚焦证据页；embedding-based retrieval 在中早层已经能取得较稳定的证据检索效果。*

```python
# URaG 推理与训练核心流程（简化版）

def urag_forward(document_pages, query, mllm, retriever, top_k=5, retrieve_layer=6):
    visual_tokens = []
    page_spans = []
    for page in document_pages:
        start = len(visual_tokens)
        visual_tokens.extend(mllm.vision_encoder(page))
        page_spans.append((start, len(visual_tokens)))

    text_tokens = mllm.tokenize(query)
    hidden = mllm.embed(visual_tokens, text_tokens)

    for layer_id, layer in enumerate(mllm.llm_layers, start=1):
        hidden = layer(hidden)

        if layer_id == retrieve_layer:
            query_features, page_features = retriever.project_and_split(
                hidden, text_tokens, page_spans
            )
            scores = {}
            for page_id, features in page_features.items():
                # late interaction: each query token matches its best visual token
                scores[page_id] = sum(
                    max(dot(q, v) for v in features) for q in query_features
                )

            keep_pages = topk(scores, k=top_k)
            hidden = drop_visual_tokens_except(hidden, page_spans, keep_pages)

    answer = mllm.decode(hidden)
    return answer


def train_urag(batch, mllm, retriever):
    # Stage 1: freeze MLLM and pretrain only the retrieval module.
    freeze(mllm)
    for document_pages, query, positive_pages, negative_pages in batch:
        scores = retriever.score_pages(mllm.early_hidden(document_pages, query))
        s_pos = sum(scores[p] for p in positive_pages)
        hard_negs = select_hard_negatives(scores, negative_pages, len(positive_pages))
        s_neg = sum(scores[p] for p in hard_negs)
        loss_retrieval = log(1 + exp(s_neg - s_pos))
        update(retriever, loss_retrieval)

    # Stage 2: add LoRA adapters and jointly optimize retrieval + generation.
    add_lora(mllm.llm_layers)
    add_lora(retriever)
    for document_pages, query, positive_pages, answer in batch:
        pred_answer, scores = urag_forward_with_scores(document_pages, query)
        loss_generation = cross_entropy(pred_answer, answer)
        loss_retrieval = retrieval_ranking_loss(scores, positive_pages)
        update_lora_and_retriever(loss_retrieval + loss_generation)
```

**动机与背景：长文档 MLLM 的瓶颈在哪里？**

多页文档理解不是把单页 VQA 简单扩展到更多图片。若把所有页面的高分辨率视觉 token 都送入 LLM，一方面会引入大量与问题无关的页面，答案生成阶段容易被噪声干扰；另一方面 Transformer self-attention 的计算复杂度随序列长度近似二次增长，页数增加后推理成本迅速上升。传统做法主要有两类：压缩所有视觉 token，代价是细粒度表格、图表和版面信息会丢失；或者先用外部检索器选页面，再交给 MLLM 回答，代价是检索器与生成器分开训练，部署链路更复杂，也难以端到端协调。

URaG 的关键判断是：MLLM 在内部已经出现了“先粗看、再精读”的层级行为。论文用 attention entropy 和证据页检索准确率分析不同 LLM 层，发现早层通常对多页输入分布较均匀，中间层开始形成可区分的 query-page 语义表示，深层则更集中在证据页上。因为 embedding-based retrieval 在中早层已经较稳定，URaG 不等到最终层再检索，而是在第 6 层左右把隐藏状态拿出来做页面选择，既能利用已经成形的语义特征，又能让后续大部分深层计算只发生在少数相关页面上。

**核心机制：用早层隐藏状态做跨模态页面检索**

设长文档包含页面 \(\{p_1,p_2,\dots,p_n\}\)，查询为 \(Q\)。每页图像经过视觉编码器和 projector 得到视觉 token，查询经 tokenizer 得到文本 token，二者一起进入 LLM。到某个早期层 \(\ell\) 后，模型得到隐藏状态：

$$
H^{(\ell)} \in \mathbb{R}^{L \times D}
$$

跨模态检索模块是一个很轻的映射层，论文实现为两层线性投影加 GELU，把隐藏状态降维并做 L2 归一化：

$$
H' = \operatorname{Norm}\left(W_2\,\operatorname{GELU}(W_1 H^{(\ell)})\right), \qquad
H' \in \mathbb{R}^{L \times D'}
$$

随后根据 token 位置切分出查询特征 \(E_q\) 和第 \(p\) 页的视觉特征 \(E_v^{(p)}\)。由于这些特征来自同一个 MLLM 的上下文化隐藏状态，视觉 token 已经受到查询和文档上下文影响，页面检索不再是一个独立编码器上的静态相似度计算。

**Late interaction：为什么不是简单平均池化？**

URaG 使用类似 ColBERT 的 contextualized late interaction。对每个查询 token \(E_{q_i}\)，它在某一页的所有视觉 token 中寻找最相似的 token，再把所有查询 token 的最佳匹配求和：

$$
s_{q,v}(p)=
\sum_{i=1}^{|E_q|}
\max_{j \in [|E_v^{(p)}|]}
E_{q_i}\cdot \left(E_{v_j}^{(p)}\right)^\top
$$

这个公式的直觉是：一个问题通常由多个语义片段组成，例如“图表标题”“某一行指标”“年份范围”。平均池化会把页面压成一个向量，容易抹平局部证据；late interaction 则允许每个查询 token 分别寻找页面中最相关的视觉证据，再合成页面级分数。因此它既保留了 token 级细粒度匹配，又只输出页面级 top-k 决策，适合“先找页、再生成”的长文档场景。

**隐藏状态裁剪：检索结果如何影响生成？**

得到每页分数 \(s_{q,v}(p)\) 后，URaG 选择 top-k 页面，默认 \(k=5\)。关键点是它不是把选中页面重新送进一个新模型，而是在当前 LLM 的隐藏状态序列中直接删除未选中页面对应的视觉 token，只保留文本 token 与 top-k 页面视觉 token 继续向深层传播。若保留页面集合为 \(\mathcal{K}\)，深层输入可以理解为：

$$
\tilde{H}^{(\ell)} =
\operatorname{Keep}\left(H^{(\ell)}, \text{text tokens} \cup \{ \text{visual tokens of } p \mid p \in \mathcal{K} \}\right)
$$

这样做有两个直接收益。第一，深层 self-attention 不再被无关页面占据，答案生成时更容易集中在证据上；第二，后续层的序列长度显著缩短，页数越多，计算节省越明显。论文在 20、60、100 页输入上报告相对 baseline 的 FLOPs 降低约 44.0%、53.9%、55.8%，说明 URaG 的效率收益主要来自“尽早裁掉无关视觉 token”。

**训练策略：先让检索器会找证据，再让检索和生成协同**

URaG 采用两阶段训练。第一阶段冻结 MLLM，只训练跨模态检索模块。若正证据页集合为 \(P\)，负页集合为 \(N\)，页面分数为 \(s_i\)，正负分数聚合为：

$$
S_{\mathrm{pos}} = \sum_{i\in P} s_i
$$

$$
S_{\mathrm{neg}} =
\begin{cases}
\sum_{j\in N} s_j, & |N| < |P| \\
\sum_{j\in \operatorname{TopK}(\{s_k \mid k\in N\}, |P|)} s_j, & |N| \ge |P|
\end{cases}
$$

检索损失是一个 pairwise ranking 目标：

$$
\mathcal{L}_{\mathrm{retrieval}} =
\log\left(1 + \exp(S_{\mathrm{neg}} - S_{\mathrm{pos}})\right)
$$

它要求正证据页总分高于最有迷惑性的负页总分。第二阶段给 LLM 和检索模块加入 LoRA，联合优化检索损失和生成交叉熵：

$$
\mathcal{L}_{\mathrm{total}} =
\mathcal{L}_{\mathrm{retrieval}} +
\mathcal{L}_{\mathrm{generation}}
$$

训练时还会强制保留 ground-truth evidence pages，再用检索分数补足到最多 5 页，避免早期检索错误导致生成端完全看不到答案证据。这个细节很重要：它让生成模型在联合微调时持续接触正确证据，同时仍学习如何在有限页面预算内处理真实检索结果。

**与传统 RAG 和 token compression 的区别**

URaG 和传统 RAG 的目标相似，都是先定位证据再生成答案，但实现位置完全不同。传统 RAG 通常在模型外部运行 OCR、文本检索器、视觉检索器或独立 MLLM retriever，再把检索结果作为新的输入交给 generator；URaG 则在同一个 MLLM 的中间层完成检索，检索特征来自生成模型自身的上下文化表示，后续生成也直接沿用同一条前向传播。与 token compression 相比，URaG 不是均匀压缩每一页，而是选择性保留少数页面的较完整视觉 token，因此更适合需要图表、表格、图片和版面细节的问答。

> 💡 关键：URaG 的“统一”不只是把两个模块放在一个系统里，而是让检索决策发生在 MLLM 的推理过程中，并且让检索后的隐藏状态继续服务答案生成。

#### 🧪 练习题

```yaml
question: "URaG 为什么把跨模态检索模块插入到早期 LLM 层，而不是在最终层之后再检索？"
options:
  - "早中层已经形成可用于证据页选择的语义表示，同时越早裁剪无关页面，后续深层计算节省越明显"
  - "最终层没有任何视觉 token，因此无法计算 query-page 相似度"
  - "早期层的参数量比深层更大，所以检索模块必须放在早期层"
  - "URaG 需要先生成完整答案，再根据答案反向选择证据页"
answer: 0
explain: "论文观察到 embedding-based retrieval 在中早层已较稳定；把检索放在第 6 层附近可以在保留足够语义信息的同时尽早删除无关视觉 token，让深层 LLM 专注于 top-k 证据页。"
```
