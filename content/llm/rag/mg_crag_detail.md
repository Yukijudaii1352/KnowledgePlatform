### MG-CRAG — Multi-Granular Corrective Retrieval Augmented Generation

```yaml
id: mg_crag
name: MG-CRAG
full_name: "多粒度纠正性检索增强生成 (Multi-Granular Corrective Retrieval Augmented Generation)"
year: "2026.05"
org: "Shahid Bahonar University of Kerman, Iran"
paper_url: "https://doi.org/10.1007/s10115-026-02778-2"
code_url: "https://github.com/omidacoder/mg-crag"
category: architecture
parent: crag
motivation: "通过弱监督训练的多粒度（段落级+句子级）检索评估器替代 CRAG 的单一评估器，在不依赖大规模标注数据的前提下实现更精细的检索质量评估与纠正"
```

#### 📝 一句话总结

MG-CRAG 在 CRAG 框架基础上引入双层多粒度检索评估机制——段落级评估器（PLRE）先筛选相关文档，句子级评估器（SLRE）再对文档内部句子进行细粒度过滤——两个评估器均通过"T5-GTR 编码 + Autoencoder 聚类伪标签 + ResNet 残差分类头"的弱监督流水线训练，仅需约 180 条人工标注即可完成，在 ARC-Challenge 和 PopQA 基准上取得了与 CRAG 可比甚至更优的性能。

#### 🎯 核心要点

- **双层多粒度评估**：段落级评估器（PLRE）对整篇检索文档评分，句子级评估器（SLRE）将文档拆分为句子后逐句评分，两级联动实现从粗到细的检索质量过滤
- **弱监督训练流水线**：仅需约 180 条人工标注样本，通过 T5-GTR 编码 → Autoencoder 降维聚类 → KMeans 伪标签生成 → ResNet 分类头训练的四步流水线，避免了 CRAG 依赖大规模标注数据微调 T5-large 的开销
- **三分类决策**：评估器将检索结果分为 HIGH（高度相关）、AMBIGUOUS（不确定）、LOW（不相关）三类，对应不同的知识处理策略
- **三种过滤机制**：strict（仅保留 HIGH 文档中的 HIGH 句子）、moderate（保留非 LOW 句子）、lenient（合并 AMBIGUOUS 文档的句子），适应不同精度-召回权衡需求
- **ResNet 残差分类头**：9 个残差块（768→2048→…→3），使用 LeakyReLU 和 Dropout，替代 CRAG 中的 T5 全量微调，参数量和训练成本大幅降低
- **LangGraph 工作流**：基于 LangGraph 构建 retrieve → grade_documents → (web_search | generate) → END 的有向图推理流程

#### 🔬 深入细节

##### 框架总览

```
┌─────────────────────────────────────────────────────────────────┐
│                     MG-CRAG 推理流程                             │
│                                                                 │
│  Query ──→ Contriever 检索 Top-K 文档                           │
│              │                                                  │
│              ▼                                                  │
│  ┌─────────────────────────┐                                    │
│  │  PLRE (段落级评估器)      │  对每篇文档: T5-GTR编码 → ResNet  │
│  │  → HIGH / AMBIGUOUS / LOW │  → 三分类                        │
│  └─────────┬───────────────┘                                    │
│            │                                                    │
│     ┌──────┼──────────┐                                         │
│     │      │          │                                         │
│   HIGH   AMBIG      LOW                                         │
│     │      │          │                                         │
│     ▼      ▼          ✗ (丢弃)                                  │
│  ┌─────────────────────────┐                                    │
│  │  SLRE (句子级评估器)      │  拆分为句子 → 逐句 T5-GTR → ResNet │
│  │  → HIGH / AMBIGUOUS / LOW │  → 三分类过滤                     │
│  └─────────┬───────────────┘                                    │
│            │                                                    │
│            ▼                                                    │
│  ┌─────────────────────────┐                                    │
│  │  Reranking              │  multi-qa-mpnet-base-cos-v1        │
│  │  → 余弦相似度排序 Top-3   │                                   │
│  └─────────┬───────────────┘                                    │
│            │                                                    │
│     ┌──────┴──────┐                                             │
│     │             │                                             │
│  high_strips>0  high_strips=0                                   │
│     │             │                                             │
│     ▼             ▼                                             │
│  生成回答       Web搜索补充                                      │
│  (≤10条时也     → 生成回答                                       │
│   补充Web搜索)                                                   │
└─────────────────────────────────────────────────────────────────┘
```

##### 弱监督训练流水线

MG-CRAG 的核心创新在于其弱监督训练流水线，仅需极少量人工标注即可训练出有效的检索评估器：

```
Step 0: 文本编码
  "qnli question: {q} sentence: {doc}" → T5-GTR-large → 768维嵌入向量

Step 1: 聚类伪标签生成
  768维嵌入 → Autoencoder(768→2048→1024→256→9) 降维
           → KMeans(k=3) 聚类
           → 利用180条标注样本映射聚类标签到 {HIGH, AMBIGUOUS, LOW}
           → 生成全量伪标签

Step 2: ResNet 分类头训练
  768维嵌入 → ResNet(9残差块, 768→2048→...→3)
           → 50 epochs, batch=10, Adam lr=0.001
           → 在伪标签上训练三分类

Step 3: VLLM 推理
  LangGraph 工作流 + 训练好的 PLRE/SLRE 评估器 → 端到端问答
```

##### 算法伪代码

```python
# MG-CRAG 核心推理流程
def mg_crag(query, retriever, plre, slre, reranker, generator, mechanism="moderate"):
    # Step 1: 检索
    documents = retriever.retrieve(query, top_k=10)
    
    # Step 2: 段落级评估 (PLRE)
    high_docs, ambig_docs, low_docs = [], [], []
    for doc in documents:
        embedding = t5_gtr_encode(f"qnli question: {query} sentence: {doc}")
        label = plre.classify(embedding)  # ResNet → {HIGH, AMBIGUOUS, LOW}
        if label == HIGH:
            high_docs.append(doc)
        elif label == AMBIGUOUS:
            ambig_docs.append(doc)
        # LOW 文档直接丢弃
    
    # Step 3: 句子级评估 (SLRE) — 对通过 PLRE 的文档拆句后逐句评估
    high_strips, medium_strips = [], []
    relevant_docs = high_docs + ambig_docs
    for doc in relevant_docs:
        sentences = split_into_sentences(doc)
        for sent in sentences:
            embedding = t5_gtr_encode(f"qnli question: {query} sentence: {sent}")
            label = slre.classify(embedding)
            if label == HIGH:
                high_strips.append(sent)
            elif label == AMBIGUOUS:
                medium_strips.append(sent)
    
    # Step 4: 根据 mechanism 策略过滤
    if mechanism == "strict":
        # 仅保留 HIGH 文档中的 HIGH 句子
        strips = [s for s in high_strips if s from high_docs]
    elif mechanism == "moderate":
        # 保留所有 HIGH + AMBIGUOUS 句子
        strips = high_strips + medium_strips
    elif mechanism == "lenient":
        # 将 AMBIGUOUS 文档的句子也合并到 high_strips
        strips = high_strips + medium_strips  # 更宽松的合并策略
    
    # Step 5: 重排序 — 按与 query 的余弦相似度排序
    strips = reranker.sort_by_similarity(query, strips)[:3]  # Top-3
    
    # Step 6: 决策 — 是否需要 Web 搜索补充
    if len(strips) > 0:
        web_search = "Yes" if len(strips) <= 10 else "No"
        return generator.generate(query, strips, web_search)
    else:
        # 无高质量片段，使用 medium 片段 + Web 搜索
        fallback = reranker.sort_by_similarity(query, medium_strips)[:3]
        return generator.generate(query, fallback, web_search="Yes")
```

```python
# 弱监督伪标签生成流程
def generate_pseudo_labels(labeled_data, unlabeled_data):
    """
    labeled_data: (~180条) [(query, doc, label), ...]  label ∈ {0:LOW, 1:AMBIGUOUS, 2:HIGH}
    unlabeled_data: (大量) [(query, doc), ...]
    """
    # Step 0: 编码
    all_texts = [f"qnli question: {q} sentence: {d}" for q, d, _ in labeled_data]
    all_texts += [f"qnli question: {q} sentence: {d}" for q, d in unlabeled_data]
    embeddings = t5_gtr_large.encode(all_texts)  # → [N, 768]
    
    # Step 1: Autoencoder 降维
    autoencoder = Autoencoder(input_dim=768)  # encoder: 768→2048→1024→256→9
    # 双重损失训练: 重建损失 + 分类损失(仅对标注样本)
    train_autoencoder(autoencoder, embeddings, labeled_labels)
    reduced = autoencoder.encoder(embeddings)  # → [N, 9]
    
    # Step 2: KMeans 聚类
    kmeans = KMeans(n_clusters=3, max_iter=2000).fit(reduced)
    cluster_labels = kmeans.labels_
    
    # Step 3: 标签映射 — 利用标注样本将聚类ID映射到语义标签
    label_mapping = map_clusters_to_labels(
        cluster_labels[:len(labeled_data)],
        true_labels=[l for _, _, l in labeled_data]
    )
    pseudo_labels = [label_mapping[c] for c in cluster_labels]
    return pseudo_labels
```

##### 核心组件详解

**1. T5-GTR 编码器（Sentence Encoder）**

MG-CRAG 使用 `sentence-transformers/gtr-t5-large` 作为文本编码器，将 query-document 对编码为 768 维向量。输入格式采用 QNLI（Question Natural Language Inference）模板：

```
"qnli question: {query} sentence: {document}"
```

> 💡 关键设计：使用 QNLI 格式而非简单拼接，是因为 T5-GTR 在预训练时已经学习了问题-文本对的语义关系，QNLI 格式能更好地激活这种能力。

**2. ResNet 残差分类头**

替代 CRAG 中对 T5-large 全量微调的方案，MG-CRAG 冻结 T5-GTR 编码器，仅训练一个轻量级残差网络分类头：

```
输入: 768维
  → Linear(768, 2048) + LeakyReLU(0.01) + Dropout(0.2)
  → [残差块 × 9]: 2048→1024→512→256→128→64→32→16→8
      每个残差块: Linear + LeakyReLU + Dropout + 残差连接(通过投影对齐维度)
  → Linear(8, 3) + Softmax
输出: 3类概率 [P(LOW), P(AMBIGUOUS), P(HIGH)]
```

> ⚠️ 注意：每个残差块中维度递减（如 2048→1024），因此残差连接需要通过额外的线性投影层将 shortcut 的维度对齐到输出维度，而非标准 ResNet 中的恒等映射。

**3. Autoencoder 聚类伪标签**

这是 MG-CRAG 弱监督训练的核心创新。Autoencoder 同时承担降维和分类两个任务：

- **编码器**：768 → 2048 → 1024 → 256 → 9（每层 BatchNorm + ReLU）
- **解码器**：9 → 256 → 1024 → 2048 → 768（对称结构）
- **分类层**：9 → 3 + Softmax（从瓶颈层直接分类）
- **双重损失**：重建损失（MSE，全量数据）+ 分类损失（CrossEntropy，仅标注数据）

训练完成后，Autoencoder 的编码器将 768 维嵌入压缩到 9 维，在此低维空间上运行 KMeans(k=3) 聚类，再利用 180 条标注样本将聚类 ID 映射到语义标签 {LOW, AMBIGUOUS, HIGH}。

> 💡 关键洞察：Autoencoder 的双重损失设计使其在降维时同时保留了分类相关的判别信息，使得后续 KMeans 聚类能产生更有意义的伪标签。这比单纯的无监督聚类或单纯的半监督学习都更有效。

**4. 三种过滤机制（Mechanism）**

MG-CRAG 提供三种不同严格程度的过滤策略，适应不同场景需求：

| 机制 | PLRE 通过条件 | SLRE 保留条件 | 特点 |
|------|-------------|-------------|------|
| **strict** | 仅 HIGH 文档 | 仅 HIGH 句子 | 高精度、低召回 |
| **moderate** | HIGH + AMBIGUOUS | HIGH + AMBIGUOUS 句子 | 平衡 |
| **lenient** | HIGH + AMBIGUOUS | 合并 AMBIGUOUS 文档句子到 high_strips | 高召回、低精度 |

**5. Reranking 与决策**

通过 PLRE + SLRE 双层过滤后的句子片段，使用 `multi-qa-mpnet-base-cos-v1` 模型计算与原始 query 的余弦相似度进行重排序，取 Top-3 作为最终上下文。

决策逻辑：
- 若存在高质量片段（high_strips > 0）：使用 Top-3 片段生成回答；若片段数 ≤ 10 则额外触发 Web 搜索补充
- 若无高质量片段：使用 medium 片段的 Top-3 + 强制触发 Web 搜索

##### 与 CRAG 的关键区别

| 特性 | CRAG | MG-CRAG |
|------|------|---------|
| 评估粒度 | 单层（文档级） | 双层（段落级 PLRE + 句子级 SLRE） |
| 评估器架构 | T5-large 全量微调 | T5-GTR 冻结 + ResNet 分类头 |
| 训练数据需求 | 大规模标注数据 | ~180 条标注 + 弱监督伪标签 |
| 分类类别 | Correct / Incorrect / Ambiguous | HIGH / AMBIGUOUS / LOW（语义等价） |
| 知识精炼 | 文档 → strips → 评估器逐条过滤 | 文档 → PLRE 过滤 → 句子 → SLRE 过滤 |
| 过滤灵活性 | 单一策略 | 三种机制（strict/moderate/lenient） |
| 重排序 | 无显式重排序 | multi-qa-mpnet 余弦相似度排序 |
| 推理框架 | 自定义流程 | LangGraph 有向图 |

> 💡 核心优势：MG-CRAG 的弱监督方案将标注成本从数千条降低到约 180 条，同时通过双层评估实现了比 CRAG 更精细的检索质量控制。ResNet 分类头的参数量远小于 T5-large 全量微调，训练效率显著提升。

##### 实验结果

在 CRAG 基准数据集上的主要结果（基于 VLLM 推理）：

| 方法 | ARC-Challenge (Acc) | PopQA (Acc) | PubHealth (Acc) |
|------|-------------------|------------|-----------------|
| Standard RAG | — | — | — |
| CRAG | — | 54.9 | 72.4 |
| **MG-CRAG** | **68.85** | **59.89** | 可比 |

> ⚠️ 注意：由于论文全文在 Springer 付费墙后，上述部分数值来自代码仓库中的实验配置和 README 描述。MG-CRAG 在 PopQA 上达到 59.89%，在 ARC-Challenge 上达到 68.85%，同时显著降低了对 Web 搜索的依赖频率。

硬件环境：NVIDIA L4 GPU（22GB 显存），使用 VLLM 进行高效推理。

##### LangGraph 工作流

```python
# MG-CRAG 的 LangGraph 有向图定义
from langgraph.graph import END, StateGraph

workflow = StateGraph(GraphState)

# 添加节点
workflow.add_node("retrieve", retrieve)           # Contriever 检索
workflow.add_node("grade_documents", grade_documents)  # PLRE + SLRE 双层评估
workflow.add_node("generate", generate)            # VLLM 生成
workflow.add_node("web_search", web_search_node)   # Web 搜索补充

# 定义边
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "grade_documents")
workflow.add_conditional_edges(
    "grade_documents",
    decide_to_generate,  # 根据 high_strips 数量决定
    {
        "web_search": "web_search",   # 无高质量片段 → Web 搜索
        "generate": "generate",        # 有高质量片段 → 直接生成
    }
)
workflow.add_edge("web_search", "generate")
workflow.add_edge("generate", END)
```

#### 🧪 练习题

```yaml
question: "MG-CRAG 的弱监督训练流水线中，Autoencoder 的双重损失包含哪两部分？"
options:
  - "对比损失 + 分类损失"
  - "重建损失 + 分类损失"
  - "三元组损失 + 重建损失"
  - "KL 散度损失 + 交叉熵损失"
answer: 1
explain: "Autoencoder 同时优化两个目标：(1) 重建损失（MSE），确保编码器-解码器能还原原始 768 维嵌入，保留信息完整性；(2) 分类损失（CrossEntropy），仅对约 180 条标注样本计算，引导瓶颈层学习判别性表示。这种双重损失设计使降维后的 9 维空间既保留了数据结构，又具备分类判别能力，从而让后续 KMeans 聚类产生更有意义的伪标签。"
```
###