### Evo — 从分子到基因组尺度的长上下文 DNA 语言模型

```yaml
id: evo
name: Evo
full_name: Evo (Evo)
year: '2024.11'
org: Arc Institute
paper_url: https://www.science.org/doi/10.1126/science.ado9336
category: genomics
parent: —
motivation: 长上下文分子到基因组尺度预测
```

#### 📝 一句话总结

Evo 提出了一个 7B 参数、单核苷酸 byte-level、131k 上下文的自回归基因组基础模型，用 StripedHyena 长序列架构解决传统 Transformer 在全基因组尺度建模时上下文成本过高的问题。它把 DNA 作为统一输入层，在同一模型中覆盖 DNA、RNA、蛋白质功能预测、CRISPR-Cas/转座系统生成和基因组尺度序列生成。

#### 🎯 核心要点

- **长上下文单碱基建模**：以 A/C/G/T/N 等 byte-level token 处理 DNA，最大训练上下文达到 131,072 tokens，保留单核苷酸分辨率
- **StripedHyena 架构**：采用 29 层 data-controlled Hyena convolution 与 3 层多头注意力交错的混合架构，注意力层约占 10%，并使用 RoPE
- **OpenGenome 预训练**：在约 300B nucleotide tokens 的原核 whole-genome 数据上训练，覆盖细菌、古菌、预测噬菌体和质粒序列，并排除感染真核宿主的病毒序列
- **两阶段上下文扩展**：先以 8,192 tokens 上下文训练基础模型，再扩展到 131,072 tokens 以支持基因组尺度推理和生成
- **自回归目标函数**：用 next-token prediction 学习 \(p_\theta(x_t\mid x_{<t})\)，无需功能标签、基因注释或手工划分 DNA/RNA/protein 片段
- **DNA scaling laws**：论文系统比较 Transformer++、Mamba、Hyena 与 StripedHyena，在 DNA byte-level 预训练中观察到规模扩大带来的可预测 perplexity 改善
- **跨模态零样本预测**：在蛋白突变效应、非编码 RNA 突变效应、调控 DNA 与 gene essentiality 等任务上使用序列 likelihood 或差异分数进行预测
- **系统级生成设计**：微调后生成 CRISPR-Cas protein-RNA 复合系统和 IS200/IS605 protein-DNA 转座系统，并报告了实验功能验证
- **基因组尺度生成**：131k 版本可生成具有较高 coding density、tRNA/rRNA 等基因组结构信号的长 DNA 序列；正式论文报告超过 1 Mb 的生成能力，Arc 早期页面也给出 over 650k tokens 量级说明

#### 🔬 深入细节

##### 方法示意图

![Evo StripedHyena architecture](https://arcinstitute.org/blog/evo/arch.png)
*图：Arc Institute Evo 页面给出的 StripedHyena 架构示意。输入 DNA 序列进入由 Hyena operator 与少量 rotary attention 组成的混合模型，输出下一个 nucleotide 的概率分布。Science 论文 Figure 1 还系统展示了 DNA 作为统一模态、OpenGenome 训练集与 scaling law；PMC 页面可访问正文与图注。*

来源说明：论文正式版本为 `https://www.science.org/doi/10.1126/science.ado9336`；可访问正文备份见 `https://pmc.ncbi.nlm.nih.gov/articles/PMC12057570/`；官方模型与代码见 `https://github.com/evo-design/evo`；Arc 介绍页见 `https://arcinstitute.org/news/evo`。

##### 算法伪代码

```python
# Evo 预训练与生成伪代码
def pretrain_evo(open_genome_sequences, model, context_len):
    for dna in stream_windows(open_genome_sequences, length=context_len):
        # byte-level tokenizer: A/C/G/T/N 等字符直接成为 token
        tokens = tokenize_bytes(dna)

        # 自回归语言建模：用前缀预测下一个碱基
        logits = model(tokens[:-1])
        labels = tokens[1:]
        loss = cross_entropy(logits, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def extend_context(base_model, long_windows):
    model = load(base_model)  # evo-1-8k-base
    return pretrain_evo(long_windows, model, context_len=131072)


def score_variant(model, wt_seq, mut_seq):
    # 用序列 log likelihood 差值估计突变影响
    return log_prob(model, mut_seq) - log_prob(model, wt_seq)


def generate_genomic_sequence(model, prompt, max_new_tokens, temperature=1.0, top_k=4):
    tokens = tokenize_bytes(prompt)
    for _ in range(max_new_tokens):
        logits = model(tokens[-model.context_len:])
        next_token = sample_top_k(logits[-1], k=top_k, temperature=temperature)
        tokens.append(next_token)
    return detokenize_bytes(tokens)
```

##### 动机：为什么不是普通 Transformer DNA 模型

基因组建模的难点不是“把 DNA 当文本”本身，而是 DNA 的有效上下文和分辨率同时很极端。基因调控、CRISPR 免疫、转座系统和原核 operon 都依赖相隔数千到数十万碱基的多元素协同；但单个 SNP 又可能改变蛋白功能、RNA 结构或调控位点。早期 DNA BERT 类模型常用 k-mer 或 BPE 缩短序列长度，代价是损失单碱基精度；密集 Transformer 若直接处理 byte-level DNA，注意力复杂度随长度近似二次增长：

$$
\mathrm{Cost}_{\mathrm{attn}} = O(L^2d)
$$

其中 \(L\) 是上下文长度、\(d\) 是 hidden dimension。当 \(L=131{,}072\) 时，纯 dense attention 在训练和推理上都非常昂贵。Evo 的核心工程判断是：DNA 序列中大量局部 motif、重复片段和长程共变可以由长卷积/信号处理算子高效捕获，而少量注意力层负责补充精确 token 交互和 recall。

##### StripedHyena 混合层机制

Evo 使用的 StripedHyena 是一种混合 sequence model。Hyena operator 可以理解为 input-dependent long convolution：模型先通过门控和短卷积生成调制信号，再用长卷积核在很长序列范围内混合信息。一个简化写法是：

$$
y = W_o\left(v \odot (h_\theta(x) * u)\right)
$$

其中 \(*\) 表示沿序列维度的卷积，\(h_\theta(x)\) 是由输入或位置参数化的长滤波器，\(\odot\) 是门控乘法。与固定 CNN 卷积核不同，Hyena 的滤波过程可随输入调制；与全注意力不同，它避免了 \(L^2\) 的 token-token 矩阵。

论文报告的 Evo 主体由 29 个 Hyena layers 与 3 个 multi-head attention layers 交错构成，attention 层使用 RoPE 编码相对位置信息。直觉上，Hyena 层负责在几十 kb 范围内聚合局部 motif、重复结构和 coding pattern，attention 层负责少量需要显式召回的长程依赖。这个结构解释了为什么 Evo 能在 byte-level 分辨率下扩展到 131k context，而不是必须把 DNA 聚合成粗粒度 token。

##### 预训练目标与 perplexity

Evo 的训练目标是标准自回归负对数似然。给定 DNA token 序列 \(x_1,\ldots,x_L\)，模型最小化：

$$
\mathcal{L}_{\mathrm{CLM}}(\theta)
= -\sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

对应的序列 log likelihood 为：

$$
\log p_\theta(x_{1:L})
= \sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

perplexity 可写为：

$$
\mathrm{PPL}(x)
= \exp\left(\frac{1}{L-1}\mathcal{L}_{\mathrm{CLM}}(\theta)\right)
$$

论文用这一指标做 DNA scaling law 分析，并比较 Transformer++、Mamba、Hyena、StripedHyena 等架构。关键结论不是单个模型分数，而是 byte-level DNA 上也出现类似 NLP 的尺度规律：模型规模、数据规模、计算预算合理扩展时，evaluation perplexity 可预测下降；同时 StripedHyena 在该设置下比密集 Transformer 更适合长上下文单碱基建模。

##### OpenGenome 与两阶段训练流程

OpenGenome 的设计决定了 Evo 的能力边界。预训练数据来自 GTDB 细菌/古菌基因组、IMG/VR 原核病毒、IMG/PR 质粒等来源，论文正文描述其覆盖约 300B nucleotide tokens，并包含超过 80,000 个细菌和古菌基因组以及数百万预测噬菌体和质粒序列。出于安全考虑，作者排除了感染真核宿主的病毒基因组。

训练分两步：第一步在 8,192 token context 上训练 `evo-1-8k-base`，用于分子尺度和系统尺度任务；第二步从 8k checkpoint 继续做 context extension，训练 `evo-1-131k-base`，用于 whole-genome 级别推理与采样。这个流程类似长上下文 LLM 的扩窗策略：先在较短上下文内学稳定的局部语法和 motif，再让模型适配更长序列的位置编码、卷积核和生成状态。

##### 预测：用 likelihood 差值读出生物效应

自回归模型不直接输出“这个突变是否有害”，但它能输出某个序列在训练分布下的概率。对于突变预测，可以比较野生型和突变型序列在同一上下文窗口中的 log likelihood：

$$
\Delta_{\mathrm{mut}}
= \log p_\theta(x^{\mathrm{mut}}) - \log p_\theta(x^{\mathrm{wt}})
$$

若突变破坏了高保守 coding pattern、RNA 结构序列或调控 motif，模型通常会给突变序列更低 likelihood。对单点突变，也可以只比较突变位置的条件概率：

$$
\Delta_t
= \log p_\theta(x_t^{\mathrm{alt}}\mid x_{<t})
- \log p_\theta(x_t^{\mathrm{ref}}\mid x_{<t})
$$

Evo 的特别之处在于它并非分别训练蛋白、RNA、调控 DNA 模型，而是在原始基因组 DNA 上学习所有这些信号。coding sequence 通过密码子翻译约束携带蛋白信息，非编码区携带 RNA 和调控信息，长上下文还保留 operon 与系统级共变。

##### 生成：从单分子到多元素系统

生成时，Evo 逐 token 采样 DNA。对于 CRISPR-Cas 任务，作者在 CRISPR-Cas loci 上微调 8k 模型，并使用 `cas9`、`cas12`、`cas13` 等条件 token 引导生成。模型需要同时生成 Cas 蛋白编码序列、CRISPR array、tracrRNA/crRNA 等非编码组件，这本质上是 protein-RNA codesign，而不是单个蛋白序列设计。

对于 IS200/IS605 转座系统，模型需要生成转座酶蛋白与 terminal element DNA 之间的匹配关系，属于 protein-DNA codesign。论文报告了生成系统的实验验证，这说明 Evo 的长上下文 likelihood 不只捕获单个 motif，还能捕获多个相邻遗传元件之间的协同约束。

##### 与 DNABERT、NT、HyenaDNA 的区别

DNABERT 和 Nucleotide Transformer 主要是 encoder-style masked language model，适合抽取序列表征并微调到分类任务；HyenaDNA 证明了单核苷酸长上下文建模可行，但规模和训练数据远小于 Evo。Evo 的定位更接近 biological GPT：它以自回归方式建模 whole-genome 分布，天然支持长序列生成、条件续写、likelihood-based variant scoring 和系统级 DNA 设计。

> 💡 关键：Evo 的贡献不是单纯“更大的 DNA 模型”，而是把单碱基分辨率、131k 训练上下文、OpenGenome whole-genome 数据和 StripedHyena 长序列算子组合成一个可预测也可生成的基因组级语言模型。

#### 🧪 练习题

```yaml
question: "Evo 为什么采用 StripedHyena 混合架构而不是纯 dense Transformer？"
options:
  - "为了在单核苷酸分辨率下高效处理 131k 级上下文，同时保留少量注意力层处理精确长程交互"
  - "为了把 DNA 序列固定切成不可重叠 6-mer，降低词表大小"
  - "为了只做分类任务，避免自回归生成"
  - "为了完全去掉位置编码，使模型不区分碱基顺序"
answer: 0
explain: "纯 dense attention 的计算随长度近似二次增长；StripedHyena 用长卷积/门控算子承担大部分序列混合，并保留少量 RoPE attention，使 Evo 能在 byte-level DNA 上扩展到长上下文。"
```
