### HyenaDNA — 单核苷酸分辨率的超长基因组序列模型

```yaml
id: hyenadna
name: HyenaDNA
full_name: HyenaDNA (HyenaDNA)
year: '2023.12'
org: Stanford University
paper_url: https://arxiv.org/abs/2306.15794
category: genomics
parent: —
motivation: 隐式卷积实现单核苷酸分辨率
```

#### 📝 一句话总结

HyenaDNA 用 Hyena 隐式长卷积算子替代 Transformer 注意力，在单字符 DNA token 上做 next nucleotide prediction，把基因组 foundation model 的上下文扩展到最高 1M token，同时保留单核苷酸分辨率。它解决了 dense attention 难以处理超长 DNA、k-mer/tokenizer 又会牺牲碱基级变异信息的问题。

#### 🎯 核心要点

- **单核苷酸 tokenizer**：直接使用 A/C/G/T 加特殊 token，不使用 k-mer、BPE 或下采样，避免把 SNP 等单碱基变化淹没在聚合 token 中
- **decoder-only Hyena 架构**：堆叠 Hyena operator、normalization 和 feed-forward network，用 causal next-token prediction 预训练
- **隐式长卷积**：卷积核由 MLP/implicit parameterization 生成，再用 FFT 计算长卷积，复杂度约为 \(O(L\log L)\)，低于 attention 的 \(O(L^2)\)
- **全局上下文**：每层 Hyena operator 都有全局 receptive field，不需要局部卷积逐层扩散或稀疏注意力近似
- **超长预训练**：在人类参考基因组 hg38 上预训练，实验覆盖 1k、32k、250k、450k、1M 等上下文长度
- **sequence length warm-up**：先用短序列稳定训练，再分阶段拉长上下文；在 450k 序列上减少训练时间并提升物种分类准确率
- **参数高效**：代表模型深度 2-8 层、宽度 128-256、参数约 400k-6.6M，却能在多个 GenomicBenchmarks/Nucleotide Transformer 任务上竞争或刷新结果
- **软提示适配**：可在输入窗口中加入 2k-32k learnable soft prompt tokens，只更新 prompt 而冻结预训练模型，实现轻量下游适配

#### 🔬 深入细节

##### 架构图与可访问来源

![HyenaDNA block architecture](https://arxiv.org/html/2306.15794v1/x2.png)
*图：HyenaDNA arXiv HTML Figure 1.3。Hyena block 由短卷积/线性投影产生门控分支，由 MLP 隐式参数化长卷积滤波器，并用 FFT 卷积实现 \(O(L\log L)\) 的长程混合。*

可访问来源：论文 `https://arxiv.org/abs/2306.15794`，arXiv HTML `https://arxiv.org/html/2306.15794v1`，官方代码和 pipeline 图在 `https://github.com/HazyResearch/hyena-dna`，预训练权重发布在 Hugging Face `https://huggingface.co/LongSafari`。

##### 算法伪代码

```python
# HyenaDNA 预训练、长度 warm-up 与下游适配伪代码
def tokenize_dna(seq):
    vocab = {"A": 0, "C": 1, "G": 2, "T": 3, "N": 4, "<bos>": 5, "<eos>": 6}
    return [vocab.get(base, vocab["N"]) for base in seq]


def hyena_block(x, max_length):
    # dense/short-conv projections create data-controlled gates
    v0, v1, v2 = project_and_short_conv(x)

    # implicit MLP generates a length-L long convolution filter
    h1 = filter_mlp_1(positions=max_length)
    h2 = filter_mlp_2(positions=max_length)

    # order-2 Hyena-style gated long convolution
    z = v2
    z = fft_convolution(h2, z) * v1
    z = fft_convolution(h1, z) * v0
    return feed_forward(norm(z + x))


def pretrain_hyenadna(hg38, model, schedule=[1024, 32000, 250000, 450000, 1000000]):
    for L in schedule:
        for seq in sample_genome_windows(hg38, length=L):
            tokens = tokenize_dna(seq)
            hidden = embed(tokens[:-1])
            for layer in model.layers:
                hidden = hyena_block(hidden, max_length=L)
            logits = lm_head(hidden)
            loss = cross_entropy(logits, tokens[1:])  # next nucleotide prediction
            optimizer.step(loss)


def soft_prompt_adapt(frozen_model, labeled_examples, prompt_len):
    prompt = initialize_learnable_tokens(prompt_len)
    freeze(frozen_model)
    for seq, label_token in labeled_examples:
        x = concat(prompt, embed(tokenize_dna(seq)), embed([label_token]))
        loss = task_loss(frozen_model(x), label_token)
        update(prompt, loss)  # only prompt tokens are trained
    return prompt
```

##### 为什么基因组需要“长上下文 + 单碱基分辨率”

基因组序列的难点在于两个尺度同时重要：调控元件、结构域和远程相互作用可能相隔数万到数十万 bp；但单个 SNP 或短 indel 又可能显著改变 TF binding、splice site 或 coding consequence。早期 DNA language model 常用 k-mer 或 BPE 聚合 token，降低序列长度；Enformer 等模型用下采样和 dilated convolution 扩展上下文。这些路线都在一定程度上牺牲了 nucleotide-level resolution。

HyenaDNA 的选择更直接：保留单字符 token，让模型看到每个碱基；用 Hyena operator 降低长序列混合的计算成本，让 100k-1M token 的上下文变得可训练。论文把这称为相对 dense attention genomic FM 最高约 500x 的上下文扩展。

##### Hyena operator：用隐式长卷积替代注意力

对长度为 \(L\) 的序列，标准 attention 的主要瓶颈是 \(L\times L\) 注意力矩阵：

$$
\operatorname{MHA}(X)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V,
\quad \text{cost}=O(L^2)
$$

Hyena 使用长卷积和门控来实现全局序列混合。离散卷积可以写作：

$$
y = h * x,\quad
y_t = \sum_{i=0}^{t} h_i x_{t-i}
$$

其中卷积核 \(h\) 不作为长度 \(L\) 的独立参数直接存储，而由隐式函数生成：

$$
h = \gamma_\theta(0,1,\ldots,L-1)
$$

实际计算时使用 FFT：

$$
h*x = \operatorname{IFFT}(\operatorname{FFT}(h)\odot \operatorname{FFT}(x)),
\quad \text{cost}=O(L\log L)
$$

Hyena block 还加入 data-controlled gating。一个 order-2 的简化表达是：

$$
\operatorname{Hyena}(x)
= v_0(x)\odot \left(h_1 * \left(v_1(x)\odot (h_2 * v_2(x))\right)\right)
$$

其中 \(v_i(x)\) 来自线性投影和短卷积，\(\odot\) 是逐元素乘法。长卷积提供全局感受野，门控让同一个全局滤波器在不同序列上下文中产生不同响应。对 DNA 来说，这相当于在每层中允许远端区域直接影响当前位置，但不需要构造二次复杂度的 attention matrix。

##### 预训练目标与长度调度

HyenaDNA 是 decoder-only causal model，预训练目标是 next nucleotide prediction：

$$
\mathcal{L}_{\text{NTP}}
= -\sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

论文在人类参考基因组上采样窗口训练，并沿模型深度、宽度、上下文长度扩展。附录给出的代表配置深度为 2-8 层，Hyena blocks 的 order \(N=2\)，宽度 128-256，MLP expansion factor 为 4，参数量约 400k 到 6.6M。

直接从超长序列开始训练不稳定且耗时。HyenaDNA 引入 sequence length warm-up：先用短上下文学习局部统计，再逐步增加到目标长度，例如从 1k 过渡到 450k。论文报告在 450k 长度上，这种调度减少训练时间并提升 species classification 任务准确率。直觉是短序列阶段提供便宜的局部模式学习，长序列阶段再学习远程依赖。

##### 下游任务与软提示

标准下游方式是在预训练 encoder/decoder 后接线性分类头，针对 GenomicBenchmarks、Nucleotide Transformer benchmark、DeepSEA chromatin profile 等任务微调。HyenaDNA 的优势不只在长序列速度，还在小模型参数量：例如论文与 500M-2.5B 参数的 Nucleotide Transformer 比较时，HyenaDNA 使用小得多的模型和单个人类参考基因组预训练，也能在多个短序列任务上达到或超过强基线。

更有意思的是软提示适配。由于 DNA 词表很小，纯文本式 in-context learning 缺少自然语言那样的标签词和任务描述。HyenaDNA 的做法是在输入中插入 learnable prompt tokens：

$$
x \leftarrow \operatorname{concat}[\operatorname{embed}(x_p), \theta],
\quad \theta \in \mathbb{R}^{N \times d}
$$

训练时冻结 HyenaDNA，只优化 prompt 参数 \(\theta\)。这些 token 占用长上下文窗口的一部分，用于承载任务定义和少量示例信息；二分类标签可复用 DNA vocabulary 中的符号。这样可以避免为每个任务更新全模型权重，也能展示长上下文模型在基因组任务上的一种 in-context/parameter-efficient adaptation 形式。

##### 与 k-mer Transformer、CNN 和 Enformer 的区别

| 维度 | k-mer/BPE Transformer | CNN / dilated CNN | Enformer | HyenaDNA |
|------|-----------------------|-------------------|----------|----------|
| token 粒度 | k-mer 或子词 | one-hot/局部窗口 | one-hot 后下采样到 128 bp bin | 单核苷酸 token |
| 长程机制 | attention，通常受 \(O(L^2)\) 限制 | 局部卷积逐层扩散 | 卷积压缩后 Transformer | 隐式长卷积 + 门控 |
| 分辨率代价 | 聚合 token 可能掩盖 SNP | 局部或下采样损失细节 | 输出为 128 bp bin | 保留每个碱基 |
| 上下文规模 | 常见为 k 到低十万级 token | 依赖 dilation/downsampling | 约 200 kb 输入、100 kb 有效调控范围 | 最高 1M token |
| 适配方式 | 微调/分类头 | 任务特异训练 | 多任务 tracks + allele difference | 微调、线性头、soft prompt |

> 💡 关键：HyenaDNA 的核心贡献是把“每个碱基都看见”和“百万级上下文”同时放进一个可训练模型中；隐式长卷积负责计算可行性，单字符 tokenizer 负责保留变异分辨率。

#### 🧪 练习题

```yaml
question: "HyenaDNA 为什么可以在单核苷酸分辨率下处理远长于普通 Transformer 的 DNA 序列？"
options:
  - "用隐式长卷积和 FFT 进行全局序列混合，避免构造 \(L^2\) 注意力矩阵"
  - "把所有 DNA 序列都压缩成固定 6-mer 平均向量"
  - "只预测蛋白质结构，不处理 DNA 序列"
  - "完全删除远端上下文，只保留局部 200 bp 窗口"
answer: 0
explain: "Hyena operator 用 MLP 生成长卷积核并通过 FFT 计算卷积，复杂度约为 \(O(L\log L)\)，因此可以保留单碱基 token 同时扩展到超长上下文。"
```
