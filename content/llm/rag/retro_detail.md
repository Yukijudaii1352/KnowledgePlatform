### RETRO — 检索增强的Transformer语言模型

```yaml
id: retro
name: RETRO
full_name: "检索增强Transformer (Retrieval-Enhanced Transformer)"
year: "2022"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/2112.04426"
category: "rag"
parent: "—"
motivation: "通过从万亿级Token文本数据库中检索相关片段，以分块交叉注意力(Chunked Cross-Attention)融合检索信息，在大幅减少参数量的前提下达到与超大模型相当的性能"
```

#### 📝 一句话总结

RETRO 提出了一种半参数化的检索增强语言模型架构，通过冻结的 BERT 检索器从 2 万亿 Token 数据库中获取相关文本片段，并利用分块交叉注意力（Chunked Cross-Attention, CCA）将检索信息融入自回归生成过程，以 25 倍更少的参数量达到与 GPT-3 等超大模型相当的语言建模性能。

#### 🎯 核心要点

- **半参数化架构**：将语言模型分为参数化（Transformer）和非参数化（检索数据库）两部分，通过检索外部知识替代纯粹增加模型参数
- **大规模检索数据库**：基于 MassiveText 数据集构建包含 2 万亿 Token 的键值数据库，键为冻结 BERT 的句子嵌入，值为邻居文本块及其后续文本
- **分块交叉注意力（CCA）**：将输入序列分成固定长度的块（chunk），每个块独立检索 \(k\) 个最近邻，通过 CCA 层将检索信息融入中间层表示
- **检索编码器（Encoder）**：轻量级 2 层 Transformer（约 36M 参数），将检索到的邻居文本编码后供 CCA 使用，编码时融合当前块的因果上下文
- **RETROfit 机制**：可在已预训练的标准 Transformer 上冻结原有参数，仅训练新增的检索模块（CCA + Encoder），快速获得检索增强能力
- **泄漏感知评估**：使用 13-gram Jaccard 相似度检测训练集与测试集的重叠，按重叠比例分桶报告 bits-per-byte，确保评估公正
- **模型规模**：从 132M 到 7.5B 参数，检索增益在所有规模上均不衰减，等效约 10 倍参数量的纯参数模型

#### 🔬 深入细节

##### 核心架构图

![RETRO 架构总览](https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x2.png)
*图：RETRO 架构示意。左侧为标准 Transformer 解码器（ATTN + FFW），右侧展示了 CCA 层如何将检索编码器的输出融入解码器的中间表示。编码器接收检索到的邻居块 \(\text{RET}(C_u)\) 并结合前一个块的中间激活 \(H_u\) 进行交叉注意力。*

![RETRO 性能缩放](https://ar5iv.labs.arxiv.org/html/2112.04426/assets/x1.png)
*图：RETRO 在不同模型规模和数据库规模下的性能。检索增益在所有模型规模上保持一致，且随数据库规模增大而增大。*

##### 算法伪代码

```python
# RETRO 训练/推理核心流程伪代码
# 输入: 序列 X = (x_1, ..., x_n), n=2048
# 分块: l 个块, 每块 m=64 tokens → C = (C_1, ..., C_l), l=32

# === 第一步: 检索 ===
for u in range(1, l+1):
    if u == 1:
        RET(C_1) = ∅  # 第一个块无检索(保持自回归性)
    else:
        # 用前一个块 C_{u-1} 的 frozen BERT 嵌入作为 query
        query = BERT_frozen(C_{u-1})  # [d] 维向量
        # 从数据库中用 SCaNN 近似最近邻搜索 k 个邻居
        RET(C_u) = top_k_neighbours(query, DB, k=2)
        # 每个邻居 = [N_j (邻居块, m tokens), F_j (后续块, m tokens)]

# === 第二步: 编码检索结果 ===
for u in range(2, l+1):
    for j in range(1, k+1):
        # 拼接邻居块和后续块
        neighbour_j = concat(N_j, F_j)  # [2m] tokens
        # 编码器: 2层Transformer, 融合当前块的因果上下文
        E_u_j = ENCODER(neighbour_j, ca_context=H_u)  # H_u 来自解码器中间层

# === 第三步: 解码器前向传播 ===
for layer_idx in range(num_layers):
    H = ATTN(H)           # 因果自注意力 (所有层)
    if layer_idx in CCA_layers:  # 从第6层开始, 每3层一次
        H = CCA(H, E)     # 分块交叉注意力: Q=H_u, KV=E_u
    H = FFW(H)            # 前馈网络

# 输出: 下一个 token 的概率分布
logits = output_head(H)
loss = cross_entropy(logits, X_shifted)
```

##### 方法详解

**动机与背景**

传统语言模型通过增加参数量来存储更多世界知识，但这导致训练和推理成本急剧增长。GPT-3（175B 参数）和 Jurassic-1（178B 参数）虽然性能强大，但资源消耗巨大。RETRO 的核心洞察是：**语言模型不需要将所有知识压缩到参数中，可以通过检索外部数据库来"按需查阅"知识**。这种半参数化方法使得 7.5B 参数的 RETRO 在多个基准上达到与 175B 参数模型相当的性能。

> 💡 关键：RETRO 的检索增益等效于约 10 倍的参数量提升——即 RETRO 7.5B ≈ 纯参数模型 ~75B 的性能。

**核心机制一：分块检索（Chunked Retrieval）**

输入序列 \(X = (x_1, \ldots, x_n)\) 被分成 \(l\) 个不重叠的块，每块 \(m\) 个 token：

$$C_u = (x_{(u-1)m+1}, \ldots, x_{um}), \quad u \in \{1, \ldots, l\}$$

其中 \(n = 2048\)，\(m = 64\)，因此 \(l = 32\)。对于每个块 \(C_u\)（\(u \geq 2\)），使用**前一个块** \(C_{u-1}\) 的冻结 BERT 嵌入作为查询，从数据库中检索 \(k\) 个最近邻：

$$\text{RET}(C_u) = \{[N_1, F_1], \ldots, [N_k, F_k]\}$$

其中 \(N_j\) 是邻居块（\(m\) 个 token），\(F_j\) 是其后续块（\(m\) 个 token）。使用前一个块而非当前块作为查询，是为了**严格保持自回归性**——避免在生成当前块时"偷看"自身内容。

> ⚠️ 注意：第一个块 \(C_1\) 没有检索结果（\(\text{RET}(C_1) = \emptyset\)），因为没有前驱块可用作查询。

**核心机制二：检索数据库（Key-Value Database）**

数据库以键值对形式存储：
- **键（Key）**：每个文本块经冻结 BERT 编码后的 \(d\) 维嵌入向量（取 \([\text{CLS}]\) token 的最后一层隐藏状态的平均）
- **值（Value）**：对应的文本块 \(N\) 及其后续块 \(F\)

检索使用 L2 距离度量，通过 Google 的 SCaNN 库进行近似最近邻搜索。训练时使用约 6000 亿 Token 的数据库，评估时扩展至 1.75 万亿 Token。

> 💡 关键：包含后续块 \(F\) 是因为邻居块 \(N\) 与查询块 \(C_{u-1}\) 对齐，而 \(F\) 才与当前待预测块 \(C_u\) 的内容最相关。

**核心机制三：分块交叉注意力（Chunked Cross-Attention, CCA）**

CCA 是 RETRO 的核心创新。在标准 Transformer 层中，每一层的计算为：

$$\text{LM}(H) = \text{FFW}(\text{ATTN}(H))$$

RETRO 在部分层中插入 CCA，变为：

$$\text{RETRO}(H, E) = \text{FFW}(\text{CCA}(\text{ATTN}(H), E))$$

CCA 的具体计算过程如下。对于第 \(u\) 个块，设解码器中间激活为 \(H_u \in \mathbb{R}^{m \times d}\)，检索编码结果为 \(E_u \in \mathbb{R}^{k \times 2m \times d}\)：

$$\text{CCA}(H_u, E_u) = \text{softmax}\!\left(\frac{Q_u K_u^\top}{\sqrt{d_k}}\right) V_u + H_u$$

其中：
- \(Q_u = H_u W_Q \in \mathbb{R}^{m \times d_k}\)（查询来自解码器）
- \(K_u = E_u W_K \in \mathbb{R}^{(k \cdot 2m) \times d_k}\)（键来自编码器输出）
- \(V_u = E_u W_V \in \mathbb{R}^{(k \cdot 2m) \times d_v}\)（值来自编码器输出）

CCA 层从第 6 层开始，每隔 3 层插入一次（即第 6、9、12... 层），这样低层保持纯语言建模能力，高层逐步融合检索信息。

**核心机制四：检索编码器（Retrieval Encoder）**

编码器是一个轻量级的 2 层双向 Transformer（约 36M 参数）。它接收拼接后的邻居文本 \([N_j; F_j]\)（共 \(2m = 128\) 个 token），并在第二层通过交叉注意力融合来自解码器的上下文信息：

$$E_u^{(1)} = \text{BiAttn}(\text{Embed}([N_j; F_j]))$$

$$E_u^{(2)} = \text{BiAttn}(E_u^{(1)}) + \text{CA}(E_u^{(1)}, H_u^+)$$

其中 \(H_u^+\) 是解码器在 CCA 插入点之前、第 \(u\) 个块的最后一个 token 的中间激活（仅用最后一个 token 以保持因果性）。

**RETROfit：改造预训练模型**

RETRO 支持在已预训练的标准 Transformer 上进行改造：冻结原有的 ATTN 和 FFW 参数，仅训练新增的 CCA 层和编码器参数。实验表明，仅需 3% 的预训练序列数即可恢复大部分检索增益。

**与传统方法的区别**

| 特性 | kNN-LM | REALM/RAG | DPR | **RETRO** |
|------|--------|-----------|-----|-----------|
| 检索粒度 | Token 级 | 文档级 | 段落级 | **块级 (64 tokens)** |
| 检索器训练 | 冻结 | 端到端 | 端到端 | **冻结 BERT** |
| 融合方式 | 插值概率 | 拼接输入 | 拼接输入 | **分块交叉注意力** |
| 数据库规模 | ~百亿 Token | ~百亿 Token | ~百亿 Token | **万亿 Token** |
| 模型规模 | <1B | <1B | <1B | **最大 7.5B** |

> 💡 关键：RETRO 的冻结检索器 + CCA 设计使得数据库可以独立于模型更新，且支持万亿级规模的高效检索。

##### 关键公式汇总

**1. 分块定义：**

$$C_u = (x_{(u-1)m+1}, \ldots, x_{um}), \quad n = l \cdot m$$

**2. 检索距离（L2）：**

$$d(C_{u-1}, N) = \|\text{BERT}(C_{u-1}) - \text{BERT}(N)\|_2$$

**3. CCA 注意力计算：**

$$\text{CCA}(H_u, E_u) = \text{softmax}\!\left(\frac{(H_u W_Q)(E_u W_K)^\top}{\sqrt{d_k}}\right)(E_u W_V) + H_u$$

**4. RETRO 层公式：**

$$\text{RETRO}(H, E) = \text{FFW}\bigl(\text{CCA}(\text{ATTN}(H),\; E)\bigr)$$

**5. 标准 LM 层公式（对比）：**

$$\text{LM}(H) = \text{FFW}\bigl(\text{ATTN}(H)\bigr)$$

**6. 泄漏感知评估（按重叠比例 \(\alpha\) 过滤）：**

$$\text{bpb}_{\text{filtered}}(\alpha) = \frac{\sum_{c:\, \text{overlap}(c) \leq \alpha} \text{bits}(c)}{\sum_{c:\, \text{overlap}(c) \leq \alpha} \text{bytes}(c)}$$

#### 🧪 练习题

```yaml
question: "RETRO 在检索时使用前一个块 C_{u-1} 而非当前块 C_u 作为查询的主要原因是什么？"
options:
  - "前一个块的语义信息更丰富，检索效果更好"
  - "为了严格保持自回归性，避免在生成当前块时利用当前块自身的信息"
  - "为了减少计算量，前一个块已经编码完成可以直接复用"
  - "为了与 BERT 检索器的预训练目标保持一致"
answer: 1
explain: "在自回归生成中，当前块 C_u 的 token 尚未完全生成，不能用于检索。使用已完成的前一个块 C_{u-1} 作为查询，确保检索过程不违反因果约束。"
```