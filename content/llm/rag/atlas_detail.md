### Atlas

```yaml
id: atlas
name: Atlas
full_name: "Atlas: Few-shot Learning with Retrieval Augmented Language Models"
year: 2022
org: Meta AI
paper_url: "https://arxiv.org/abs/2208.03299"
category: rag
parent: "—"
motivation: "检索器与语言模型读器联合预训练，少样本专家"
```

#### 📝 一句话总结

Atlas 提出了一种将稠密检索器（Contriever）与 Seq2Seq 语言模型（T5/FiD）进行端到端联合预训练的检索增强框架，通过四种检索器训练信号（ADist、EMDR²、PDist、LOOP）和多种无监督预训练任务实现了极强的少样本学习能力——仅 11B 参数、64 个示例即可在 NaturalQuestions 上达到 42.4% 准确率，超越 540B 参数的 PaLM。

#### 🎯 核心要点

- **架构**：检索器采用 Contriever（双编码器），语言模型采用 Fusion-in-Decoder (FiD)，二者端到端联合训练
- **四种检索器训练目标**：Attention Distillation (ADist)、EMDR²、Perplexity Distillation (PDist)、Leave-One-Out Perplexity Distillation (LOOP)，均利用语言模型的反馈信号训练检索器
- **四种无监督预训练任务**：Prefix Language Modeling、Masked Language Modeling、Title-to-Section Generation、Salient Span Masking，其中 Prefix LM 表现最优
- **索引更新机制**：定期异步重建文档索引（每 ~2500 步），并使用 query-side fine-tuning 技术在微调时仅更新查询编码器
- **少样本 SOTA**：64-shot NaturalQuestions 42.4%（超 PaLM 540B 3%）、64-shot TriviaQA 74.4%、15-shot FEVER 56.2%（超 Gopher 5.1%）
- **全量训练 SOTA**：NaturalQuestions 60.4%、TriviaQA 84.7%、MMLU 5-shot 多任务 56.4%
- **可更新性**：通过替换文档索引即可更新模型知识，无需重新训练；时序匹配索引可额外提升 +3.6%
- **索引压缩**：使用乘积量化（Product Quantization）可将索引压缩 5 倍，性能几乎无损

#### 🔬 深入细节

![Atlas 架构总览](https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x1.png)
*图 1：Atlas 整体架构。左侧为检索器（Contriever 双编码器），从文档索引中检索 top-k 文档；右侧为 Fusion-in-Decoder 语言模型，将检索到的文档与查询拼接后独立编码，在解码器中通过交叉注意力融合所有文档信息生成答案。*

```python
# Atlas 训练流程伪代码
def atlas_train_step(query, answer, retriever, lm, index):
    # 1. 检索 top-k 文档
    docs = retriever.retrieve(query, index, top_k=K)  # K=20
    
    # 2. 语言模型前向传播（FiD: 每个文档独立编码，解码器融合）
    for d_k in docs:
        enc_k = lm.encoder(concat(query, d_k))  # 独立编码
    lm_logits = lm.decoder(cross_attend_all(enc_1, ..., enc_K))
    lm_loss = cross_entropy(lm_logits, answer)
    
    # 3. 计算检索器训练信号（以 PDist 为例）
    for d_k in docs:
        p_lm_k = lm.log_prob(answer | d_k, query)  # 每个文档的 LM 困惑度
    target_dist = softmax([p_lm_1, ..., p_lm_K])    # LM 后验分布
    retriever_dist = softmax([sim(q, d_1), ..., sim(q, d_K)])
    retriever_loss = KL(target_dist || retriever_dist)
    
    # 4. 联合更新
    total_loss = lm_loss + retriever_loss
    optimizer.step(total_loss)
    
    # 5. 定期异步重建索引（每 ~2500 步）
    if step % 2500 == 0:
        index.rebuild(retriever.doc_encoder)
```

##### 动机与背景

大语言模型（LLM）通过增大参数量来隐式存储世界知识，但这种方式存在三个根本问题：(1) **参数效率低**——需要数百亿甚至上万亿参数才能记住足够知识；(2) **知识不可更新**——模型训练后知识即固化，无法跟随世界变化；(3) **不可解释**——无法追溯模型回答的知识来源。

检索增强生成（RAG）通过外挂文档索引解决了上述问题，但此前的 RAG 方法（如 REALM、RAG、RETRO）存在一个关键缺陷：**检索器与语言模型未能充分联合训练**，尤其在预训练阶段。Atlas 的核心假设是：如果在大规模无监督预训练阶段就让检索器和语言模型学会协作，模型将获得更强的少样本泛化能力。

##### 核心机制：四种检索器训练目标

Atlas 的关键创新在于设计了四种利用语言模型反馈来训练检索器的目标函数，使检索器学会检索"对语言模型最有帮助的文档"，而非仅仅是"语义最相似的文档"：

**1. Attention Distillation (ADist)**：利用 FiD 解码器对各文档编码的交叉注意力分数作为监督信号。直觉是：语言模型在生成答案时"更关注"哪个文档，说明该文档更有用。

$$p_{\text{ADist}}(d_k) = \frac{\text{CrossAttnScore}(d_k)}{\sum_{i=1}^{K} \text{CrossAttnScore}(d_i)}$$

> 💡 **关键**：ADist 的优势在于它直接反映了语言模型"实际使用"文档的方式（通过注意力权重），而非间接的困惑度信号。

**2. EMDR²（Expectation-Maximization with Document Retrieval）**：将文档视为隐变量，使用 EM 算法训练。E 步计算文档后验分布，M 步最大化边际似然的下界：

$$p(a|q) = \sum_{d \in \mathcal{D}} p_\theta(d|q) \cdot p_\phi(a|d,q)$$

检索器梯度通过 REINFORCE 估计器计算，以 top-k 文档的语言模型概率作为奖励信号。

**3. Perplexity Distillation (PDist)**：最简洁的方法——直接用每个文档带来的语言模型困惑度改善作为检索器的训练目标。将 LM 后验分布蒸馏到检索器分布：

$$p_{\text{PDist}}(d_k) = \frac{\exp(\log p_{LM}(a|d_k, q))}{\sum_{i=1}^{K} \exp(\log p_{LM}(a|d_i, q))}$$

然后最小化 \(\text{KL}(p_{\text{PDist}} \| p_{\text{retriever}})\)。PDist 在消融实验中表现最优（64-shot NQ 45.0%），因为它提供了最直接的"文档有用性"信号。

**4. Leave-One-Out Perplexity Distillation (LOOP)**：衡量移除某个文档后语言模型性能下降多少。如果移除文档 \(d_k\) 后困惑度显著上升，说明该文档至关重要：

$$p_{\text{LOOP}}(d_k) = \frac{\exp(-\log p_{LM}(a|\mathcal{D}_K \setminus \{d_k\}, q))}{\sum_{i=1}^{K} \exp(-\log p_{LM}(a|\mathcal{D}_K \setminus \{d_i\}, q))}$$

> ⚠️ **注意**：LOOP 计算成本最高（需要 K 次前向传播），但更忠实地反映了 FiD 的实际推理方式（同时使用多个文档），而 PDist/EMDR² 只单独评估每个文档。

##### 预训练任务设计

Atlas 在无监督语料（Wikipedia + CCNet，共 ~387M 段落）上进行联合预训练，探索了四种预训练任务：

| 预训练任务 | 输入 | 输出 | 64-shot NQ |
|:---|:---|:---|:---:|
| **Prefix LM** | 文本前半段 | 文本后半段 | 42.4% |
| **Masked LM** | 带 mask 的文本 | 被 mask 的 span | 42.7% |
| **Title-to-Section** | Wikipedia 标题 | 对应章节内容 | 41.1% |
| **Salient Span Masking** | 带 mask 的文本（mask 实体） | 被 mask 的实体 | — |

实验发现 Prefix LM 和 Masked LM 效果相当，均优于 Title-to-Section。关键发现是：**联合预训练至关重要**——不进行联合预训练的模型在 64-shot NQ 上仅 9.0%，而联合预训练后达到 42.4%（提升 33.4%）。

##### 索引更新与可更新性

Atlas 的一个重要特性是**知识可更新性**。由于知识存储在外部文档索引中而非模型参数中，只需替换索引即可更新模型知识：

- 使用时序匹配的 Wikipedia 索引（与 NQ 数据集同期的 2018 年 Wikipedia）可将 NQ 准确率从 60.4% 提升至 64.0%（+3.6%）
- 索引使用乘积量化（Product Quantization）压缩 5 倍后，性能几乎无损

##### 与传统方法的对比

| 特性 | Atlas | REALM | RAG | RETRO |
|:---|:---:|:---:|:---:|:---:|
| 联合预训练 | ✅ | ✅ | ❌ | 部分 |
| 检索器端到端训练 | ✅ | ✅ | ✅ | ❌（冻结） |
| 多文档融合 | FiD（多文档） | 单文档 | 单文档边际化 | 分块交叉注意力 |
| 索引动态更新 | ✅（异步重建） | ✅ | ✅ | ❌ |
| 少样本能力 | 极强 | 一般 | 一般 | 未评估 |

Atlas 的核心优势在于：(1) 使用 FiD 架构同时融合多个文档，信息利用更充分；(2) 四种检索器训练信号均来自语言模型反馈，形成闭环优化；(3) 大规模联合预训练赋予了极强的少样本泛化能力。

![Atlas 少样本学习性能](https://ar5iv.labs.arxiv.org/html/2208.03299/assets/x2.png)
*图 2：Atlas 在 NaturalQuestions 和 TriviaQA 上的少样本学习曲线。Atlas-11B 在仅使用 64 个示例时即超越了 PaLM-540B 等超大模型。*

#### 🧪 练习题

```yaml
question: "Atlas 中 Perplexity Distillation (PDist) 训练检索器的核心思想是什么？"
options:
  - "利用 FiD 解码器的交叉注意力权重作为文档重要性信号"
  - "将每个文档带来的语言模型困惑度改善蒸馏为检索器的训练目标"
  - "通过移除单个文档观察语言模型性能下降来衡量文档重要性"
  - "使用 EM 算法将文档视为隐变量进行边际似然最大化"
answer: 1
explain: "PDist 直接计算每个文档条件下语言模型生成答案的对数概率，将该 LM 后验分布蒸馏到检索器分布中。选项 0 是 ADist，选项 2 是 LOOP，选项 3 是 EMDR²。"
```