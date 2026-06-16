### Evo 2 — 面向全生命域的长上下文基因组语言模型

```yaml
id: evo2
name: Evo 2
full_name: Evo 2 (Evo 2)
year: '2026.04'
org: Arc Institute
paper_url: https://www.nature.com/articles/s41586-026-10176-5
category: genomics
parent: evo
motivation: 9万亿碱基对全生命域基因组建模
```

#### 📝 一句话总结

Evo 2 提出了一个以单核苷酸为 token、可扩展到 1 Mb 上下文的全生命域基因组基础模型，用自回归序列建模同时支持变异效应预测、基因组片段表征和 genome-scale 序列生成。它把 Evo 系列从主要面向原核基因组扩展到细菌、古菌、真核和噬菌体等多类序列，并通过 StripedHyena 2 架构降低超长 DNA 建模的计算瓶颈。

#### 🎯 核心要点

- **单核苷酸分辨率**：直接对 DNA 字符序列建模，不把序列压缩成 k-mer，因此可对 SNV、indel、剪接位点和非编码调控变异做细粒度打分
- **OpenGenome2 训练集**：使用跨细菌、古菌、真核和噬菌体的高质量非冗余基因组集合，Evo 2 40B 消耗约 9.3 万亿训练 token
- **两阶段长上下文训练**：先在 8,192 token 上下文预训练，再在 midtraining 中逐步扩展到 1,000,000 token，以覆盖从启动子、基因、TAD 到染色体片段的多尺度依赖
- **StripedHyena 2 架构**：用 short explicit、medium regularized、long implicit Hyena operator 与注意力/门控/MLP 组合，在百万级上下文上比标准 Transformer 更高效
- **零样本变异效应预测**：通过野生型与突变序列的 log-likelihood 差值评价突变是否降低自然序列概率，覆盖蛋白编码、RNA、剪接和非编码变异
- **嵌入可迁移**：中间层表示可用于外接 exon classifier、BRCA1 监督分类器等轻量任务头，通常比仅用最终层 embedding 更稳健
- **可解释性与生成**：稀疏自编码器揭示 exon-intron 边界、TF binding site、蛋白结构片段和 prophage 区域等特征；生成侧支持线粒体、原核和真核序列片段设计
- **开放发布**：论文、模型权重、推理代码、训练相关代码和 OpenGenome2 数据说明均有公开入口；同时训练集排除感染真核宿主的病毒序列以降低生物安全风险

#### 🔬 深入细节

##### 模型总览图

![Evo 2 overview](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-026-10176-5/MediaObjects/41586_2026_10176_Fig1_HTML.png)
*图：Evo 2 论文 Figure 1。图中同时展示应用层、OpenGenome2 数据分布、8k 到 1M context 的训练计划、StripedHyena 2 block 以及长上下文 recall 评估。*

论文正文可从 Nature 页面访问，官方项目页为 `https://arcinstitute.org/tools/evo`，推理与示例代码位于 `https://github.com/ArcInstitute/evo2`。GitHub README 还给出 7B、20B、40B、base 和 262k context 等不同 checkpoint 的使用方式。

##### 算法伪代码

```python
# Evo 2 训练、变异打分与生成的简化流程
def causal_pretrain_evo2(genome_stream, model, tokenizer):
    for seq in sample_open_genome2_windows(genome_stream):
        ids = tokenizer.tokenize(seq)                 # A/C/G/T/N 等单核苷酸 token
        logits = model(ids[:-1])                      # StripedHyena 2 causal LM
        labels = ids[1:]
        loss = cross_entropy(logits, labels)
        optimizer.step(loss)


def extend_context_midtraining(model, genome_stream, context_schedule):
    for L in context_schedule:                        # 8k -> 65k -> ... -> 1M
        for seq in sample_long_genomic_windows(genome_stream, length=L):
            loss = causal_lm_loss(model, seq)
            optimizer.step(loss)


def score_variant(model, reference_seq, pos, ref_allele, alt_allele):
    wt = insert_allele(reference_seq, pos, ref_allele)
    mut = insert_allele(reference_seq, pos, alt_allele)
    ll_wt = sequence_log_likelihood(model, wt)
    ll_mut = sequence_log_likelihood(model, mut)
    return ll_mut - ll_wt                             # 越低通常越可能有害


def generate_genomic_sequence(model, prompt, n_tokens, temperature=1.0):
    seq = prompt
    for _ in range(n_tokens):
        logits = model(seq)[-1]
        next_token = sample(logits, temperature=temperature, top_k=4)
        seq += next_token
    return seq
```

##### 自回归 DNA 语言模型目标

Evo 2 的基础训练目标是标准 causal language modeling。给定 DNA 序列 \(x_1,\ldots,x_T\)，模型最大化每个位置在左侧上下文下出现真实下一个核苷酸的概率：

$$
\log p_\theta(x_{1:T})
= \sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

对应的训练损失为：

$$
\mathcal{L}_{\text{CLM}}
= -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

这一定义看起来简单，但在基因组上有两个关键差别。第一，输入是单核苷酸分辨率，因此一个错配、插入或删除都能直接反映在 likelihood 上。第二，上下文被扩展到 1 Mb 后，模型有机会在同一个前向过程中看到启动子、外显子、内含子、增强子、TAD 边界和较长 repeats 的组合，而不是只看几百到几千 bp 的局部窗口。

##### StripedHyena 2 为什么重要

标准 Transformer 的自注意力需要显式形成 \(T\times T\) 的相似度矩阵，长到百万 token 时内存和计算都会成为主要瓶颈。Evo 2 使用 StripedHyena 2，把局部显式建模、中等长度正则化卷积和长程隐式卷积组合起来，让每层可以在不同距离尺度上传递信息。可把其中的长卷积部分抽象为：

$$
y = \mathcal{F}^{-1}\left(\mathcal{F}(h_\theta)\odot \mathcal{F}(u)\right)
$$

其中 \(u\) 是输入激活，\(h_\theta\) 是由模型参数生成或调制的长卷积核，\(\mathcal{F}\) 表示 FFT。直觉上，注意力擅长精确选择少量位置，长卷积擅长以近线性代价把远距离上下文混合进当前位置；Evo 2 通过多种 operator 混合，让基因组中短 motif、基因级结构和染色体级组织都能被同一个模型处理。

##### 两阶段训练与数据权重

Evo 2 先在较短上下文上学习基础语法：密码子偏好、起止密码子、剪接位点、RNA 结构片段、TF motif 和常见调控上下文。随后 midtraining 将上下文长度逐步扩展到 1M token，训练样本也更强调长序列组成，使模型学习远距离元素之间的依赖。这个流程类似自然语言模型先以短上下文稳定训练，再扩大 context window 的做法，避免从一开始就把全部计算消耗在超长序列上。

数据侧的重点不是简单堆叠基因组，而是构建 OpenGenome2：去冗余、跨生命域覆盖，并对功能遗传元素和长序列窗口进行加权。论文还明确排除了感染真核宿主的病毒基因组；因此，Evo 2 在这类序列上不是一个强生成器，这属于有意的数据边界，而不是普通数据缺失。

##### 变异效应打分

零样本变异预测使用同一个语言模型 likelihood。若 \(x^{\text{wt}}\) 是参考序列，\(x^{\text{mut}}\) 是带突变序列，则变异分数可写为：

$$
\Delta_{\text{LL}}
= \log p_\theta(x^{\text{mut}}) - \log p_\theta(x^{\text{wt}})
$$

当 \(\Delta_{\text{LL}} < 0\) 时，突变降低了模型认为该序列来自自然基因组分布的概率，通常被解释为更可能破坏功能约束。对 SNV 可比较单个碱基替换；对 indel 或更长变异，则比较包含变异窗口的整段序列 likelihood。论文用 ClinVar、SpliceVarDB、BRCA1 saturation mutagenesis 和 DART-eval 等任务展示这种分数在编码、剪接和部分非编码场景中的可用性。

> 💡 关键：Evo 2 的零样本预测并不是训练一个“致病性分类器”，而是用跨物种基因组预训练学到的自然序列概率作为进化约束代理。

##### 表征、解释与设计

除了 likelihood，Evo 2 中间层 embedding 也可作为通用基因组特征。论文中用这些特征训练外显子分类器和 BRCA1 监督分类器，说明模型内部表示已经编码了可迁移的局部功能信息。稀疏自编码器进一步把隐藏激活分解成更稀疏的特征维度，用于发现 exon-intron 边界、TF binding site、tRNA/rRNA、ORF、prophage 等可解释模式。

生成时，Evo 2 仍按自回归方式从 prompt 续写 DNA。若只做 unconditional 或简单 prompt 生成，模型会倾向采样训练分布中的自然序列；若结合外部预测器或 inference-time search，则可对 chromatin accessibility、调控元件或较长基因组片段做条件设计。与传统 motif 拼接或局部序列优化相比，Evo 2 的优势是同一生成过程可以同时考虑局部语法和长程一致性；风险则是生成序列仍需严格的过滤、实验验证和生物安全约束。

#### 🧪 练习题

```yaml
question: "Evo 2 用野生型和突变序列的 log-likelihood 差值做零样本变异效应预测，其核心假设是什么？"
options:
  - "降低自然序列概率的突变更可能破坏进化约束或生物功能"
  - "所有低频突变都一定是良性突变"
  - "只有蛋白编码区才能用语言模型打分"
  - "变异预测必须先在 ClinVar 标签上监督微调"
answer: 0
explain: "Evo 2 通过大规模基因组语言建模学习自然序列分布；若突变显著降低模型概率，通常说明它偏离了模型学到的保守功能模式。"
```
