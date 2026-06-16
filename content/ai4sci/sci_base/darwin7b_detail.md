### Darwin-7B — 质量感知稀疏化的肠道微生物组多组学基础模型

```yaml
id: darwin7b
name: Darwin-7B
full_name: Darwin-7B (Darwin-7B)
year: '2026'
org: ICLR 2026
paper_url: https://fm-science.github.io/
category: unified_foundation
parent: —
motivation: 肠道微生物组多组学基础模型
```

#### 📝 一句话总结

Darwin-7B 提出了“稀疏化 genomics + 质量感知 tokenization + Mamba/Transformer 多组学模型”的肠道微生物组基础模型，解决公共测序档案质量异质、原始 reads 计算成本高、宏基因组与代谢组难以联合建模的问题。

#### 🎯 核心要点

- **两阶段数据回收**：先用结构化二进制 mask 稀疏化 metagenomic reads，再用 QA-Token 将 Phred 质量分数纳入词表构造
- **可用数据扩大**：论文称该 pipeline 将公共档案可用于预训练的比例从 5% 提升到 40%，相当于 8 倍数据回收
- **224 个稀疏配置评估**：在 CAMI species-level taxonomic classification 上寻找速度和准确率的 Pareto frontier，覆盖 5.1x 加速到近无损 F1=0.994
- **质量感知词表**：QA-Token 用多目标 reward 和 Gumbel-Softmax relaxation 优化 merge 决策，相比标准 BPE 报告 12% bits-per-base-pair 改善
- **7B 多组学模型**：Darwin-7B 在 8T base pairs metagenomics 与 250K metabolite profiles 上预训练
- **混合主干**：32 层堆栈中 24 层是 Mamba，8 层是局部 Transformer window attention，兼顾 \(O(N)\) 长程建模与局部 motif 分辨率
- **代谢组 HyperGNN**：用 KEGG pathway 反应构造超边，以 3 层 hypergraph neural network 处理 metabolite profile
- **跨模态注意力**：在第 16 层和第 32 层后插入双向 cross-attention，对齐 genomic 与 metabolomic 表示
- **任务覆盖**：病原检测、宏基因组 profiling、代谢通路预测、IBD/T2D 疾病预测、抗生素耐药预测
- **来源限制**：FM4Science 页面是 workshop 首页；Darwin-7B 的可访问论文页面为 OpenReview `https://openreview.net/forum?id=X5Ii21IdDF`，PDF 为 `https://openreview.net/pdf?id=X5Ii21IdDF`

#### 🔬 深入细节

##### 图示与来源说明

OpenReview 条目和 PDF 没有提供独立稳定的架构图片文件 URL；可访问方法来源为 OpenReview 页面 `https://openreview.net/forum?id=X5Ii21IdDF` 与 PDF `https://openreview.net/pdf?id=X5Ii21IdDF`。PDF 的第 4-5 页给出稀疏化、QA-Token、Darwin-7B 数据与架构描述，附录 E.1 给出 32 层 Mamba/Transformer interleaving、HyperGNN 和 cross-attention 细节。下面用文字流程图复现论文方法框架：

![Darwin-7B OpenReview 论文入口](https://openreview.net/images/openreview-logo.png)
*图：OpenReview 论文入口标识；Darwin-7B 公开页面/PDF 未提供独立稳定架构图直链，因此下方用文字流程图复现论文中的数据回收、QA-Token、多组学编码和跨模态对齐流程。*

```text
raw public reads + quality scores + metabolomics
    │
    ├─ sparsification mask p in {0,1}^w
    │      retain base i iff p[i mod w] = 1
    │
    ├─ QA-Token vocabulary learning
    │      reward = quality + information + efficiency + robustness
    │      differentiable merge via Gumbel-Softmax
    │
    ├─ genomic tokens (~2T)        metabolite profiles (250K)
    │          │                         │
    │     Mamba/Transformer         HyperGNN over KEGG hyperedges
    │          └──────── bidirectional cross-attention ────────┘
    │
    └─ task heads: pathogen, profiling, pathway, disease, resistance
```

##### 核心算法伪代码

```python
# Darwin-7B 训练前的数据回收和多组学预训练伪代码
def sparsify_read(read, pattern):
    kept = []
    for i, base in enumerate(read):
        if pattern[i % len(pattern)] == 1:
            kept.append(base)
    return "".join(kept)

def learn_qa_tokenizer(reads, qualities, candidate_merges):
    vocab = initialize_base_vocab()
    for step in range(num_merge_steps):
        rewards = []
        for merge in candidate_merges:
            q = phred_quality_score(merge, qualities)
            info = pointwise_mutual_information(merge, reads)
            eff = compression_gain(merge, reads)
            rob = robustness_under_quality_noise(merge, reads, qualities)
            rewards.append(lambda_q*q + lambda_i*info + lambda_e*eff + lambda_r*rob)

        # Gumbel-Softmax 让离散 merge 选择可微
        merge_weights = gumbel_softmax(rewards, temperature=tau)
        vocab = apply_weighted_merge(vocab, candidate_merges, merge_weights)
    return vocab

def pretrain_darwin(genomic_tokens, metabolite_profiles):
    g = genomic_embedding(genomic_tokens)
    m = hypergnn_metabolites(metabolite_profiles, kegg_hyperedges)

    for layer in range(32):
        if layer in transformer_layers:
            g = local_transformer(g, window=256)
        else:
            g = mamba_block(g)
        if layer in [15, 31]:
            g, m = bidirectional_cross_attention(g, m)

    loss = (
        lm_loss(g, genomic_tokens)
        + masked_metabolite_loss(m, metabolite_profiles)
        + contrastive_alignment_loss(g, m)
        + task_supervised_loss(g, m)
    )
    return loss
```

##### 问题动机：为什么宏基因组不能直接照搬普通 DNA 大模型

宏基因组 reads 与干净参考基因组不同。它们来自多物种混合样本，测序质量不均，错误率随 Phred 分数变化，并且很多公共档案缺少可用于因果建模的干预结构。传统 genomic foundation model 如果直接用标准 BPE 处理 reads，会把频繁出现的测序错误也纳入词表，使模型在预训练时学习到噪声。

Darwin-7B 的第一步是“少读但读得有信息”。稀疏化 pattern \(p \in \{0,1\}^w\) 周期性作用在 read 上：

$$
\operatorname{keep}(i)=\mathbb{1}\left[p_{i \bmod w}=1\right]
$$

例如 \(p=1010\) 表示保留隔位碱基。论文评估了 224 个 pattern，发现均匀分布的 mask 通常优于聚集 mask，因为均匀采样能保留更分散的序列上下文。稀疏化的作用不是随机丢信息，而是在速度和 taxonomic signal 之间寻找 Pareto frontier。

##### QA-Token：把测序质量放进词表学习

标准 BPE 的 merge 决策主要依赖频率。QA-Token 将“高质量碱基更值得合并、低质量噪声不应主导词表”写进 reward。论文给出的 merge reward 可概括为：

$$
R(a,b)
=
\lambda_Q Q(ab)
+\lambda_I \operatorname{PMI}(a,b)
+\lambda_E E(ab)
+\lambda_R \operatorname{Robust}(ab)
$$

其中 \(Q(ab)\) 表示合并 token 的质量分数，\(\operatorname{PMI}\) 衡量两个片段共同出现的信息量，\(E(ab)\) 表示压缩收益，\(\operatorname{Robust}\) 衡量在质量扰动下是否稳定。因为 token merge 是离散选择，QA-Token 用 Gumbel-Softmax relaxation 近似：

$$
\tilde{z}_k =
\frac{\exp((\log \pi_k + g_k)/\tau)}
{\sum_j \exp((\log \pi_j + g_j)/\tau)}
$$

这样可以在外层优化词表 reward、内层训练 proxy model 的 bilevel 设置中反向传播。直觉上，它让 tokenizer 不再只问“哪个片段出现得多”，还要问“这个片段是否由可信测序信号支持”。

##### Darwin-7B 架构：长序列效率与局部 motif 的折中

Darwin-7B 使用 LLaMA-7B 的维度配置作为初始化尺度，但不是普通 LLaMA。附录 E.1 指出其 32 层堆栈采用 3:1 Mamba-to-Transformer interleaving：24 层 Mamba 负责 \(O(N)\) 长程依赖，8 层局部 Transformer 负责 window size 256 的 motif 解析。

一层局部 attention 的复杂度大致为：

$$
O(Nw^2)
$$

其中 \(w=256\) 是局部窗口；Mamba/SSM 路径则近似 \(O(N)\)。这种混合设计适合宏基因组：reads 很长且样本量巨大，需要线性时间建模长距离上下文；同时，启动子、codon pattern、酶相关 motif 等局部结构又需要 attention 的精细分辨率。

##### 代谢组与跨模态对齐

代谢组不是简单向量分类任务。代谢反应通常是多对多关系：多个底物、酶和产物共同构成一条 pathway。Darwin-7B 使用 KEGG pathway annotations 构造 hyperedges，并用 HyperGNN 做消息传递：

$$
h_i^{(l+1)}
=
\sigma
\left(
\sum_{e \ni i}
\alpha_{ie}
\sum_{j \in e} W^{(l)}h_j^{(l)}
\right)
$$

这里 \(e\) 是代谢反应超边，\(\alpha_{ie}\) 是节点 \(i\) 对超边 \(e\) 的注意力权重。随后 genomic representation \(H_g \in \mathbb{R}^{L_g \times d}\) 与 metabolomic representation \(H_m \in \mathbb{R}^{L_m \times d}\) 做双向 cross-attention：

$$
\operatorname{CrossAttn}(H_g,H_m)
=
\operatorname{softmax}
\left(
\frac{H_gW_Q(H_mW_K)^\top}{\sqrt{d_k}}
\right)H_mW_V
$$

这一步让模型学习“哪些基因序列片段与哪些代谢物或 pathway 对齐”，比后验拼接 feature 更适合多组学推理。

##### 训练目标与任务头

论文描述 Darwin-7B 使用四类预训练目标。可简化为：

$$
\mathcal{L}
=
\mathcal{L}_{\text{ALM}}
+\lambda_m \mathcal{L}_{\text{met-mask}}
+\lambda_c \mathcal{L}_{\text{contrast}}
+\lambda_s \mathcal{L}_{\text{sup}}
$$

其中 autoregressive language modeling 学习 genomic token 序列分布；masked metabolite loss 学习代谢组缺失项重建；contrastive alignment 让同一样本的宏基因组和代谢组表示靠近；supervised heads 支持病原检测、profiling、疾病和耐药预测等任务。OpenReview 摘要报告 Darwin-7B 在 pathogen detection 上达到 94.5±0.4 MCC，在 metagenomic profiling 上达到 0.98±0.01 F1，并给出四个多组学任务结果。

##### 与 METAGENE-1 和 Evo2 的区别

METAGENE-1 面向 metagenomic reads，但使用标准 BPE 且不建模测序质量；Evo2 更偏干净组装基因组，难以覆盖真实微生物群落中的混合物种、混合质量 reads。Darwin-7B 的区别在三处：先用稀疏化降低计算负担，再用 QA-Token 控制噪声进入词表，最后用 HyperGNN 与 cross-attention 将代谢组纳入同一个基础模型。

> ⚠️ 注意：Darwin-7B 目前公开来源是 ICLR 2026 workshop OpenReview 投稿/海报论文，部分数据和 MetaOmics-10T pilot 仍属于早期报告；解读应把它视为方法路线和初步实验，而不是已经完全独立复现的成熟基准。

#### 🧪 练习题

```yaml
question: "Darwin-7B 中 QA-Token 相比标准 BPE 的核心区别是什么？"
options:
  - "只按 token 出现频率做 merge，不考虑测序质量"
  - "把 Phred 质量、信息量、压缩收益和鲁棒性共同写入 merge reward，并用 Gumbel-Softmax 优化离散词表选择"
  - "完全丢弃所有低频 DNA 片段，不再训练 tokenizer"
  - "只处理代谢物浓度，不处理宏基因组 reads"
answer: 1
explain: "QA-Token 的关键是质量感知词表学习：高质量、信息量高且鲁棒的片段更可能被合并，避免测序错误主导 vocabulary。"
```
