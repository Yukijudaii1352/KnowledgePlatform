### REALM — 检索增强语言模型预训练

```yaml
id: realm
name: REALM
full_name: "检索增强语言模型预训练 (Retrieval-Augmented Language Model Pre-Training)"
year: "2020"
org: "Google Research"
paper_url: "https://arxiv.org/abs/2002.08909"
category: "foundation"
parent: "—"
motivation: "将知识检索作为潜变量融入语言模型预训练，使模型能够从大规模语料库中检索并利用世界知识，在训练阶段通过显著跨度掩码任务端到端学习检索与推理能力"
```

#### 📝 一句话总结

REALM 提出了一种检索增强的语言模型预训练框架，将知识检索建模为可微分的潜变量，通过端到端反向传播联合训练神经知识检索器与知识增强编码器，使预训练模型能够从百万级文档语料库中主动检索相关知识，在 Open-QA 任务上以 330M 参数量超越 11B 参数的 T5 模型。

#### 🎯 核心要点

- **潜变量检索框架**：将检索文档 \(z\) 建模为潜变量，通过边际化 \(p(y|x) = \sum_z p(y|z,x) \cdot p(z|x)\) 实现端到端训练
- **双塔检索器 (Knowledge Retriever)**：使用两个独立 BERT 分别编码查询和文档，通过内积计算相关性得分，结合 MIPS 实现亚线性时间 top-k 检索
- **知识增强编码器 (Knowledge-Augmented Encoder)**：将查询与检索文档拼接后输入 Transformer，通过 cross-attention 深度融合信息
- **异步 MIPS 索引刷新**：使用异步更新机制解决训练过程中文档嵌入需要随参数更新而刷新的问题，每隔数百步重新编码全部文档
- **显著跨度掩码 (Salient Span Masking)**：优先掩码命名实体和日期等信息密集的跨度，迫使模型学习检索世界知识
- **Null 文档机制**：引入空文档 \(\varnothing\) 作为候选，允许模型在不需要检索时选择不依赖外部文档
- **ICT 预热初始化**：使用逆完形填空任务 (Inverse Cloze Task) 预热检索器，避免冷启动问题
- **评估基准**：在 NaturalQuestions-Open (40.4)、WebQuestions (40.7)、CuratedTrec (46.8) 三个 Open-QA 数据集上取得 SOTA

#### 🔬 深入细节

##### 核心框架图

![REALM 整体框架](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x2.png)
*图：REALM 整体框架。左侧为无监督预训练阶段，知识检索器与知识增强编码器联合训练；右侧为下游任务微调阶段，同样的架构用于 Open-QA。*

![REALM 预训练示意](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x1.png)
*图：REALM 预训练过程示意。对于掩码输入 "The [MASK] at the top of the pyramid"，检索器从 Wikipedia 中检索相关文档，编码器利用检索到的文档预测被掩码的词。*

##### 算法伪代码

```python
# REALM 预训练伪代码
# 初始化：用 ICT 预热 retriever，用 BERT 初始化 encoder
# 知识语料库 Z: Wikipedia (13M 文档块, 每块 ≤288 wordpieces)

for step in range(200_000):
    x = sample_masked_sentence(corpus_X)  # 显著跨度掩码
    
    # === 检索阶段 ===
    q = Embed_input(x)  # BERT_CLS + 线性投影
    # 通过 MIPS 索引检索 top-k 文档 (k=8, 含 null doc)
    top_k_docs = MIPS_search(q, index, k=8)
    
    # === 计算检索概率 ===
    for z in top_k_docs:
        f(x, z) = Embed_input(x)^T · Embed_doc(z)  # 内积相关性
    p_z_given_x = softmax([f(x, z) for z in top_k_docs])
    
    # === 知识增强编码 ===
    for z in top_k_docs:
        input_seq = [CLS] x [SEP] z_title [SEP] z_body [SEP]
        p_y_given_z_x = BERT_MLM(input_seq)  # 预测 [MASK] 位置
    
    # === 边际化 ===
    p_y_given_x = sum(p_z * p_y_z for p_z, p_y_z 
                       in zip(p_z_given_x, p_y_given_z_x))
    loss = -log(p_y_given_x)
    
    # === 反向传播 (更新 θ 和 φ) ===
    loss.backward()  # 梯度同时流向 retriever 和 encoder
    optimizer.step()
    
    # === 异步刷新 MIPS 索引 (每数百步) ===
    if step % refresh_interval == 0:
        recompute_all_doc_embeddings()  # 16 TPUs 并行
        rebuild_MIPS_index()
```

##### 动机与背景

语言模型预训练（如 BERT、GPT）的核心思想是通过大规模无监督训练将世界知识编码到模型参数中。然而，这种方式存在根本性局限：

1. **存储瓶颈**：所有知识必须压缩到固定数量的神经网络参数中，对于长尾知识和精确事实性知识（如"某人的出生日期"），模型参数的容量远远不够
2. **不可解释性**：知识以隐式方式分布在参数中，无法追溯模型的知识来源
3. **更新困难**：当世界知识发生变化时，需要重新训练整个模型

REALM 的核心洞察是：**与其将所有知识压缩到参数中，不如让模型学会在需要时从外部知识库中检索相关信息**。这类似于人类在回答问题时查阅参考资料的过程。

> 💡 关键：REALM 将"知识存储"与"知识推理"解耦——检索器负责从海量文档中定位相关知识，编码器负责基于检索到的知识进行推理。

##### 核心机制详解

**1. 生成过程建模**

REALM 将语言模型的预测过程分解为两步：

$$p(y|x) = \sum_{z \in \mathcal{Z}} p(y|z, x) \cdot p(z|x)$$

其中 \(x\) 是输入（预训练时为掩码句子，微调时为问题），\(y\) 是目标输出，\(z\) 是从知识语料库 \(\mathcal{Z}\) 中检索的文档。这个公式的含义是：对于每个可能的文档 \(z\)，计算检索该文档的概率 \(p(z|x)\) 和基于该文档生成答案的概率 \(p(y|z,x)\)，然后对所有文档求和（边际化）。

由于语料库包含数百万文档，精确求和不可行，因此实际计算中仅对 top-k 个最相关文档进行近似：

$$p(y|x) \approx \sum_{z \in \text{top-}k} p(y|z, x) \cdot p(z|x)$$

**2. 知识检索器 (Knowledge Retriever)**

检索器 \(p(z|x)\) 采用双塔架构，使用两个独立的 BERT 编码器分别处理输入和文档：

$$\text{Embed}_{\text{input}}(x) = W_{\text{input}} \cdot \text{BERT}_{\text{CLS}}(\text{join}(x))$$

$$\text{Embed}_{\text{doc}}(z) = W_{\text{doc}} \cdot \text{BERT}_{\text{CLS}}(\text{join}(z_{\text{title}}, z_{\text{body}}))$$

相关性得分通过内积计算：

$$f(x, z) = \text{Embed}_{\text{input}}(x)^{\top} \cdot \text{Embed}_{\text{doc}}(z)$$

检索概率通过 softmax 归一化：

$$p(z|x) = \frac{\exp f(x, z)}{\sum_{z'} \exp f(x, z')}$$

> 💡 关键：双塔架构的优势在于文档嵌入可以预计算并建立 MIPS（最大内积搜索）索引，实现亚线性时间的 top-k 检索。这使得在数百万文档中搜索成为可能。

**3. 知识增强编码器 (Knowledge-Augmented Encoder)**

编码器将输入 \(x\) 和检索到的文档 \(z\) 拼接为一个序列，送入另一个 BERT 进行 cross-attention：

$$\text{input} = [\text{CLS}] \; x \; [\text{SEP}] \; z_{\text{title}} \; [\text{SEP}] \; z_{\text{body}} \; [\text{SEP}]$$

- **预训练阶段**（MLM 任务）：对每个 \([\text{MASK}]\) 位置预测原始 token，损失为标准 MLM loss
- **微调阶段**（Open-QA）：在文档 token 的表示上预测答案的起止位置，类似于抽取式阅读理解

**4. 异步 MIPS 索引刷新**

![异步 MIPS 刷新](https://ar5iv.labs.arxiv.org/html/2002.08909/assets/x3.png)
*图：REALM 预训练中的异步 MIPS 索引刷新机制。训练器 (Trainer) 持续更新参数，索引构建器 (Index Builder) 周期性地用最新参数重新编码所有文档并重建索引。*

训练过程中，检索器参数 \(\theta\) 不断更新，但 MIPS 索引中的文档嵌入是基于旧参数计算的。REALM 采用异步刷新策略：

- 每隔数百个训练步，使用最新的文档编码器参数重新编码所有 1300 万文档
- 重建 MIPS 索引（在 16 个 TPU 上并行完成）
- 在两次刷新之间，索引是"过时的"（stale），但实验表明适度的过时不会显著影响训练

> ⚠️ 注意：消融实验表明，如果将刷新间隔扩大 30 倍（即索引严重过时），性能从 38.2 骤降至 28.7（NQ dev EM），说明索引新鲜度对训练至关重要。

**5. 归纳偏置：显著跨度掩码**

标准 BERT 预训练使用随机掩码，但许多被掩码的 token（如停用词、常见词）不需要世界知识即可预测。REALM 提出**显著跨度掩码 (Salient Span Masking)**：

- 首先使用 NER 标注器和正则表达式识别文本中的命名实体和日期
- 优先选择这些"显著跨度"进行掩码
- 这迫使检索器学习检索包含特定事实知识的文档

消融实验证实了其有效性：
| 掩码策略 | NQ Dev EM | 零样本检索 Recall@5 |
|---------|-----------|-------------------|
| 显著跨度掩码 (REALM) | 38.2 | 38.5 |
| 随机跨度掩码 | 35.3 | 26.1 |
| 随机均匀掩码 | 32.3 | 24.2 |

##### 与传统方法的对比

| 维度 | 传统 Retrieve-and-Read | REALM |
|------|----------------------|-------|
| 检索方式 | TF-IDF/BM25 等稀疏检索 | 端到端学习的稠密检索 |
| 预训练 | 仅训练编码器 (BERT) | 联合预训练检索器 + 编码器 |
| 知识更新 | 需重新训练 | 仅需更新知识库 |
| 梯度传播 | 检索器不可微 | 梯度穿过检索器反向传播 |

与最直接的对比对象 ORQA 相比，REALM 的关键改进在于：(1) 增加了语言模型预训练步骤（而非仅用 ICT 训练检索器）；(2) 训练过程中反向传播到 MIPS 索引（而非使用固定索引）。这两点改进使 NQ 上的 EM 从 33.3 提升至 40.4。

##### 主要实验结果

REALM 在三个 Open-QA 基准上均取得 SOTA：

| 模型 | 参数量 | NQ | WQ | CT |
|------|--------|-----|-----|-----|
| DrQA | 34M | - | 20.7 | 25.7 |
| BERT-Baseline | 110M | 26.5 | 17.7 | 21.3 |
| ORQA | 330M | 33.3 | 36.4 | 30.1 |
| T5 (11B) | 11318M | 34.5 | 37.4 | - |
| **REALM** | **330M** | **40.4** | **40.7** | **46.8** |

> 💡 关键：REALM 以仅 330M 参数（约 T5-11B 的 3%）在 NQ 和 WQ 上超越了 T5-11B，证明了"检索 + 小模型"范式相比"纯参数记忆 + 大模型"范式的效率优势。

#### 🧪 练习题

```yaml
question: "REALM 在预训练阶段使用显著跨度掩码 (Salient Span Masking) 的主要目的是什么？"
options:
  - "减少预训练的计算开销"
  - "迫使模型学习检索包含世界知识的文档，而非仅依赖局部上下文"
  - "提高 BERT 编码器的语法理解能力"
  - "使 MIPS 索引的刷新频率降低"
answer: 1
explain: "显著跨度掩码优先掩码命名实体和日期等需要世界知识才能预测的跨度，迫使检索器学习检索包含相关事实的文档，而随机掩码中大量 token 仅需局部上下文即可预测，无法有效训练检索器。"
```