### FiD: Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering

```yaml
标题: "Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering"
作者: Gautier Izacard, Edouard Grave (Facebook AI Research)
机构: Facebook AI Research
发表: EACL 2021
链接: https://arxiv.org/abs/2007.01282
代码: https://github.com/facebookresearch/FiD
领域: [RAG, 开放域问答, 检索增强生成]
关键词: [Fusion-in-Decoder, 检索增强, 生成式问答, T5, 多证据融合]
```

---

### 📝 一句话总结

FiD（Fusion-in-Decoder）提出了一种简洁而高效的检索增强生成式问答方法：**编码器独立处理每个检索段落（线性复杂度），解码器通过联合交叉注意力融合所有段落的表示**，在NaturalQuestions和TriviaQA上取得了当时的SOTA。

---

### 🎯 核心要点

1. **架构创新**：Encoder独立编码每个passage（线性扩展），Decoder联合attention融合所有passage表示，兼顾效率与多证据聚合能力
2. **性能SOTA**：NQ 51.4 EM、TriviaQA 67.6 EM（large模型），显著超越同期RAG、REALM等方法
3. **良好的扩展性**：从10到100个passage，TriviaQA提升6%、NQ提升3.5%，而抽取式模型在10-20个passage后趋于饱和
4. **训练效率技巧**：先用少量passage训练，再用100个passage微调1000步，可大幅减少GPU开销（147 vs 425 GPU hours）且性能接近
5. **显式知识存储优势**：770M参数+Wikipedia检索 vs 11B参数closed-book T5，前者EM更高（44.1 vs 36.6），说明文本显式记忆在知识检索任务上具有竞争力

---

### 🔬 深入细节

#### 1. 问题背景与动机

开放域问答（Open-domain QA）需要从大规模知识源中检索并理解信息来回答问题。传统方法分为两类：
- **抽取式方法**：从检索到的段落中抽取span作为答案（如DrQA、DPR+Reader）
- **生成式方法**：用seq2seq模型直接生成答案（如RAG、BART-based）

**核心挑战**：如何高效地让模型利用大量检索段落中的证据？

- 将所有passage拼接后输入encoder → **二次方复杂度**，无法扩展到100个passage
- RAG对每个passage独立生成再边际化 → **无法在生成过程中跨passage推理**

#### 2. FiD 方法详解

**输入格式**：每个检索到的passage与问题拼接，添加特殊标记：

```
question: {问题文本} title: {段落标题} context: {段落正文}
```

**核心架构**（基于T5 seq2seq模型）：

```
┌─────────────────────────────────────────────────────────┐
│                    FiD Architecture                      │
│                                                          │
│  Passage 1: "question: Q title: T1 context: C1"         │
│  Passage 2: "question: Q title: T2 context: C2"         │
│  ...                                                     │
│  Passage k: "question: Q title: Tk context: Ck"         │
│       │           │           │           │              │
│       ▼           ▼           ▼           ▼              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │Encoder 1│ │Encoder 2│ │Encoder 3│ │Encoder k│       │
│  │(shared) │ │(shared) │ │(shared) │ │(shared) │       │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘       │
│       │           │           │           │              │
│       └───────────┴─────┬─────┴───────────┘              │
│                         │ Concatenate                    │
│                         ▼                                │
│              ┌──────────────────┐                        │
│              │     Decoder      │                        │
│              │ (Cross-Attention │                        │
│              │  over ALL repr.) │                        │
│              └────────┬─────────┘                        │
│                       │                                  │
│                       ▼                                  │
│                    Answer                                │
└─────────────────────────────────────────────────────────┘
```

**伪代码**：

```python
def fusion_in_decoder(question, passages, encoder, decoder):
    """
    question: str - 输入问题
    passages: List[Passage] - 检索到的k个段落，每个含title和text
    encoder/decoder: T5的encoder和decoder（共享参数）
    """
    all_encoder_outputs = []
    
    # Step 1: 独立编码每个passage（线性复杂度 O(k * n^2)）
    for p in passages:
        input_text = f"question: {question} title: {p.title} context: {p.text}"
        tokens = tokenize(input_text)[:250]  # 截断到250 word pieces
        enc_output = encoder(tokens)  # shape: [seq_len, d_model]
        all_encoder_outputs.append(enc_output)
    
    # Step 2: 拼接所有encoder输出
    fused_repr = concatenate(all_encoder_outputs, dim=0)  
    # shape: [k * seq_len, d_model]
    
    # Step 3: Decoder通过cross-attention联合处理所有passage表示
    answer = decoder.generate(
        encoder_output=fused_repr,  # decoder对所有passage做cross-attention
        decoding_strategy="greedy"
    )
    return answer
```

**复杂度分析**：

设 $k$ 为passage数量，$n$ 为每个passage的token长度，$m$ 为decoder输出长度：

| 方法 | Encoder复杂度 | Decoder复杂度 | 总复杂度 |
|------|-------------|-------------|---------|
| 全拼接（如SpanSeqGen） | $O((kn)^2) = O(k^2 n^2)$ | $O(m \cdot kn)$ | $O(k^2 n^2)$ |
| **FiD** | $O(k \cdot n^2)$ | $O(m \cdot kn)$ | $O(k \cdot n^2 + m \cdot kn)$ |
| RAG（独立生成） | $O(k \cdot n^2)$ | $O(k \cdot m \cdot n)$ | $O(k \cdot n^2)$ |

**关键洞察**：
- FiD的encoder复杂度随passage数**线性增长**（vs 全拼接的二次方），使得扩展到100个passage成为可能
- 虽然decoder的cross-attention仍然是 $O(m \cdot kn)$，但由于 $m$（答案长度）通常很短（几个token），这部分开销可控
- 与RAG不同，FiD的decoder可以在**同一个生成步骤中同时关注所有passage**，实现真正的多证据融合

#### 3. 检索模块

论文使用两种现成的检索器（不进行端到端训练）：

- **BM25**：经典稀疏检索，用于SQuAD
- **DPR（Dense Passage Retrieval）**：基于BERT的双编码器密集检索，用于NQ和TriviaQA
  - 使用FAISS库进行近似最近邻搜索
  - Wikipedia被切分为不重叠的100-word段落

#### 4. 实验结果

**主实验（Exact Match scores）**：

| 模型 | 类型 | NQ | TriviaQA | SQuAD |
|------|------|-----|----------|-------|
| DrQA (Chen et al., 2017) | 抽取式 | - | - | 29.8 |
| BERTserini (Yang et al., 2019) | 抽取式 | 38.6 | - | 38.6 |
| Multi-passage BERT (Wang et al., 2019) | 抽取式 | - | - | 53.0 |
| ORQA (Lee et al., 2019) | 抽取式 | 33.3 | 45.0 | 20.2 |
| REALM (Guu et al., 2020) | 抽取式 | 40.4 | - | - |
| DPR (Karpukhin et al., 2020) | 抽取式 | 41.5 | 57.9 | 36.7 |
| T5-11B (Roberts et al., 2020) | Closed-book | 36.6 | 60.5 | - |
| GPT-3 few-shot (Brown et al., 2020) | Closed-book | 29.9 | 71.2 | - |
| RAG (Lewis et al., 2020) | 生成式+检索 | 44.5 | 56.1 | - |
| **FiD (base, 220M)** | **生成式+检索** | **48.2** | **65.0** | **56.7** |
| **FiD (large, 770M)** | **生成式+检索** | **51.4** | **67.6** | **56.7** |

**Passage数量对性能的影响**：

| Passages数量 | NQ (base) | TriviaQA (base) |
|:---:|:---:|:---:|
| 10 | ~42 | ~59 |
| 20 | ~44 | ~61 |
| 50 | ~45.5 | ~63.5 |
| 100 | ~46.5 | ~64.7 |

关键发现：生成式模型性能随passage数量持续提升，而抽取式模型在10-20个passage后趋于饱和。

**训练效率优化（Table 2）**：

| 训练Passages数 | NQ (无微调) | NQ (微调后) | TriviaQA (无微调) | TriviaQA (微调后) |
|:---:|:---:|:---:|:---:|:---:|
| 5 | 37.8 | 45.0 | 58.1 | 64.2 |
| 10 | 42.3 | 45.3 | 61.1 | 63.6 |
| 25 | 45.3 | 46.0 | 63.2 | 64.2 |
| 50 | 45.7 | 46.0 | 64.2 | 64.3 |
| 100 | 46.5 | - | 64.7 | - |

用25个passage训练 + 100个passage微调1000步 → 46.0 EM（仅需147 GPU hours vs 直接100个passage训练的425 GPU hours）。

#### 5. 与相关方法的关键对比

| 维度 | FiD | RAG | REALM | DPR (抽取式) |
|------|-----|-----|-------|-------------|
| 答案生成方式 | Seq2seq生成 | Seq2seq生成 | Span抽取 | Span抽取 |
| 多passage融合 | Decoder联合attention | 边际化（独立生成后加权） | 边际化 | 独立打分 |
| 跨passage推理 | ✅ 可以 | ❌ 不行 | ❌ 不行 | ❌ 不行 |
| Encoder处理 | 独立（线性） | 独立（线性） | 独立 | 独立 |
| 检索器训练 | 冻结（不端到端） | 端到端 | 端到端 | 独立训练 |
| Passage数量 | 100 | 5-10 | 5 | 100 |

#### 6. 训练细节

- **预训练模型**：T5-base (220M) / T5-large (770M)
- **优化器**：Adam，学习率 $10^{-4}$（恒定），dropout 10%
- **训练**：10k步，batch size 64，64张Tesla V100 32GB
- **评估**：每500步评估，选验证集最优checkpoint
- **检索**：100个passage，截断到250 word pieces
- **解码**：贪心解码（greedy decoding）
- **答案处理**：NQ/SQuAD训练时随机采样一个答案，TriviaQA用唯一人工答案

#### 7. 局限性与未来方向

论文明确提出的未来方向：
1. **效率优化**：当passage数量进一步增大时，decoder的cross-attention仍是瓶颈
2. **端到端检索**：当前检索器是冻结的，未来计划将检索集成到模型中进行端到端学习
3. **检索质量依赖**：模型性能上限受检索器质量制约

---

### 🧪 练习题

**Q1（理解题）**：FiD为什么选择在encoder中独立处理passage而不是拼接后统一处理？这带来了什么trade-off？

<details><summary>参考答案</summary>

独立处理使encoder的计算复杂度从 $O(k^2n^2)$ 降为 $O(kn^2)$，即从passage数量的二次方降为线性，使得扩展到100个passage成为可能。Trade-off是encoder阶段passage之间无法交互（无cross-passage attention），所有跨passage的信息融合推迟到decoder阶段。但实验表明decoder的cross-attention足以有效融合多passage证据。

</details>

**Q2（对比题）**：FiD与RAG在多证据融合机制上有什么本质区别？为什么FiD在需要聚合多段落信息的问题上表现更好？

<details><summary>参考答案</summary>

RAG对每个passage独立生成答案token的概率，然后通过边际化（加权求和）合并。这意味着每个生成步骤中，模型只能"看到"一个passage的信息。FiD的decoder在每个生成步骤中通过cross-attention同时关注所有passage的表示，可以在单次前向传播中比较和综合来自不同passage的信息。当答案需要综合多个passage的线索时（如不同passage提供答案的不同部分），FiD的联合attention机制天然支持这种推理，而RAG的独立生成+边际化无法实现。

</details>

**Q3（应用题）**：如果你需要将FiD部署到生产环境，passage数量从100增加到1000，主要的计算瓶颈在哪里？你会如何优化？

<details><summary>参考答案</summary>

主要瓶颈在decoder的cross-attention：decoder每个生成步需要attend到 $k \times n$ 个token（1000×250=250k tokens），计算量巨大。优化方向包括：(1) 对encoder输出进行压缩/池化，减少decoder需要attend的token数；(2) 使用稀疏attention机制（如top-k attention）让decoder只关注最相关的表示；(3) 分层融合：先在小组内融合，再跨组融合；(4) 使用passage重排序模型先筛选top-k最相关passage。后续工作FiD-Light就采用了encoder输出压缩的思路。

</details>

**Q4（延伸题）**：论文发现用少量passage训练后再用100个passage微调1000步可以接近全量训练的效果。请解释为什么这种策略有效。

<details><summary>参考答案</summary>

模型的核心能力——理解问题、从上下文中提取信息、生成答案——主要在少量passage训练阶段就已学会。增加passage数量主要影响的是decoder如何处理更长的拼接encoder输出（更多的cross-attention keys/values）。短期微调足以让模型适应这种分布变化（从25个passage的表示长度适应到100个），而不需要重新学习基础的阅读理解和生成能力。这类似于课程学习（curriculum learning）的思想：先学简单任务，再适应复杂场景。

</details>