### Nucleotide GPT — 单核苷酸分辨率的解码器式基因组语言模型

```yaml
id: nucleotide_gpt
name: Nucleotide GPT
full_name: Nucleotide GPT (Nucleotide GPT)
year: '2026.01'
org: McLaughlin et al.
paper_url: https://academic.oup.com/bib/article/27/1/bbag011/8456488
category: genomics
parent: —
motivation: 解码器架构单核苷酸分辨率模型
```

#### 📝 一句话总结

Nucleotide GPT 提出了一个 LLaMA-style decoder-only DNA 语言模型，用单核苷酸 token 和 causal language modeling 研究基因组预训练到底学到了什么。论文特别聚焦 repetitive elements 的训练权重，发现适度下调重复序列 loss 能提升下游分类，同时 SAE 解释显示模型大量表征容量会被 LTR、LINE、SINE 等重复元素占据。

#### 🎯 核心要点

- **decoder-only 架构**：采用 LLaMA 风格 Transformer decoder，而不是 DNABERT/NT 常见的 encoder-only MLM 架构
- **单核苷酸 tokenization**：A/T/G/C 逐碱基作为 token，保留最高生物分辨率，并与重叠 6-mer、非重叠 6-mer 做系统比较
- **模型规模**：论文描述模型为 12 层、\(d_{\mathrm{model}}=2048\)、8 个 attention heads、key dimension 128，总参数约 511.8M
- **RoPE + RMSNorm + GeLU**：使用 RoPE 位置编码、RMSNorm、GeLU feed-forward，并用 FlashAttention 实现高效注意力
- **8192 bp 上下文**：在 GRCh38 人类参考基因组上用 8,192 bp 序列做 CLM 预训练，batch 为 16 条序列，训练 20,000 steps
- **重复元素加权预训练**：用 RepeatMasker 标注重复区域，对 RE token 的 loss 权重设置为 0.0、0.1、0.5、1.0，发现 0.5 权重整体最优或接近最优
- **七个 Genomic Benchmarks 任务**：覆盖 coding versus intergenic、Ensembl regulatory、non-TATA promoters、enhancers、OCRs、人/线虫分类等任务
- **预训练价值验证**：比较 pretrained fine-tuning、random initialization、linear baseline 与 linear probing，展示预训练带来的线性可分性和微调性能提升
- **SAE 解释性分析**：在 2048 维 residual stream 上训练 8192 维 sparse autoencoder，识别出与 LTR、LINE-1、SINE/Alu 等重复元素相关的稀疏特征
- **局限性结论**：论文支持预训练有效，但也指出普通 CLM 容易过度建模高频重复序列，未来需要更有生物归纳偏置的预训练和 tokenization

#### 🔬 深入细节

##### 方法示意图

![Nucleotide GPT workflow and architecture](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bib/27/1/10.1093_bib_bbag011/1/m_bbag011f1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=g4wZTgWF5hxF~abVyub-MQvoXX8ej4UqTWfAPIsgksJ4j8ayNN1W2e8EuTNraAgKcLwmYuAANt0UwC3y4QuD1yapCxC~VFmoeirsQ5Te5SJnUnc0OXqqePRmiRhgCxQoHzNHYhzRLSBtkNEYXu~Uv2AjcQ6yZhxgJw4JOTLexrGov-TBC5JVmZIJeyOS1txZx~T6LSNhzNJTeYWqp2I7acYrsYiO~LcNkvkdGR1K8LnoXA2QhCjj4XOG8g~uweabvMVz6xd7NrGlAne~niqLfUcDuoPOZdU6qGDH6dyXPZLHMs96YcnK-ET2bDjHIZ86vC2yvxjHw4M5X2zOsRrptg__)
*图：Briefings in Bioinformatics Figure 1。左侧是预训练到监督微调的流程；右侧是 Nucleotide GPT 的单核苷酸输入、RoPE、12 层 Transformer block、RMSNorm、multi-head attention、GeLU FFN、output projection 架构。*

来源说明：Oxford Academic 论文页 `https://academic.oup.com/bib/article/27/1/bbag011/8456488` 可访问正文、图注和方法；预印本 PDF 见 bioRxiv `https://www.biorxiv.org/content/10.1101/2024.11.27.625761v1.full.pdf`。正式页的图片直链为 Oxford/Silverchair CDN 签名 URL。

##### 算法伪代码

```python
# Nucleotide GPT：重复元素加权 CLM 预训练与微调伪代码
def tokenize_single_nucleotide(seq):
    vocab = {"A": 0, "C": 1, "G": 2, "T": 3, "N": 4, "<pad>": 5}
    return [vocab.get(base, vocab["N"]) for base in seq]


def pretrain_ngpt(grch38_windows, repeatmasker_intervals, model, re_weight=0.5):
    for seq, chrom_start in grch38_windows:  # seq length = 8192 bp
        tokens = tokenize_single_nucleotide(seq)
        re_mask = overlap_repeatmasker(chrom_start, len(seq), repeatmasker_intervals)

        logits = model(tokens[:-1])          # decoder-only causal forward
        labels = tokens[1:]

        loss = 0.0
        for i, label in enumerate(labels):
            w_i = re_weight if re_mask[i + 1] else 1.0
            loss += w_i * cross_entropy(logits[i], label)

        optimizer.zero_grad()
        loss.backward()
        clip_gradients(model)
        optimizer.step()


def finetune_classifier(seq, pretrained_model, classifier):
    tokens = tokenize_single_nucleotide(seq)
    hidden = pretrained_model(tokens).hidden_states
    pooled = mean_pool(hidden)               # 或取任务指定层/位置
    return classifier(pooled)


def linear_probe(seq, frozen_model, probe):
    with no_grad():
        h = frozen_model(tokenize_single_nucleotide(seq)).hidden_states
    return probe(mean_pool(h))
```

##### 背景：为什么重新审视 decoder-only DNA 预训练

到 Nucleotide GPT 之前，DNA foundation model 的主流路径多为 BERT-style encoder：DNABERT、Nucleotide Transformer 用 masked language modeling 学双向表征，然后微调到分类任务。与此同时，部分研究质疑 genomic language model 的预训练收益，指出随机初始化模型或 one-hot probing 在一些监管任务上也可能很强。Nucleotide GPT 的问题意识很直接：如果预训练有价值，它到底来自架构、tokenization、CLM 目标，还是只是模型见过了大量重复序列？

因此论文选择 decoder-only CLM，并把 repetitive elements 作为核心变量。哺乳动物基因组中 RE 占比可达 30% 到 60%，且序列高度重复、统计模式强。如果不处理 RE，模型可能把大量容量用于预测常见 LTR、LINE、SINE 片段，从而降低对稀有但功能重要的 promoter、enhancer、splice signal 的学习。

##### 架构细节

Nucleotide GPT 把每个碱基作为一个 token：

$$
\mathbf{x} = (x_1,x_2,\ldots,x_L),\quad x_i\in\{A,C,G,T,N\}
$$

序列经过 input embedding 与 RoPE positional embedding 后进入 12 层 decoder block。论文给出的 RoPE 形式可理解为对 embedding 的二维子空间做位置相关旋转：

$$
\mathrm{RoPE}(x,\theta)
= [x_1\cos\theta - x_2\sin\theta,\;
x_1\sin\theta + x_2\cos\theta]
$$

每层 attention 使用 scaled dot-product：

$$
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

multi-head attention 为：

$$
\mathrm{MultiHead}(Q,K,V)
= \mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

其中 \(h=8\)、key dimension 为 128。FFN 使用 GeLU：

$$
\mathrm{FFN}(x)=\mathrm{GeLU}(xW_1)W_2
$$

RMSNorm 则写为：

$$
\mathrm{RMSNorm}(x)
= \frac{x}{\mathrm{RMS}(x)}\gamma,\qquad
\mathrm{RMS}(x)=\sqrt{\frac{1}{n}\sum_{i=1}^n x_i^2}
$$

论文的 block 更新可概括为 pre-norm residual 结构：

$$
x' = x + \mathrm{MHA}(\mathrm{RMSNorm}(x))
$$

$$
x_{\mathrm{out}} = x' + \mathrm{FFN}(\mathrm{RMSNorm}(x'))
$$

##### CLM 与重复元素加权损失

普通 causal language modeling 最小化：

$$
\mathcal{L}_{\mathrm{CLM}}
= -\sum_{t=1}^{L-1}
\log p_\theta(x_{t+1}\mid x_{\le t})
$$

Nucleotide GPT 引入 RepeatMasker 标注的 token 权重。若 \(r_t=1\) 表示位置 \(t\) 属于 repetitive element，且重复区域权重为 \(\lambda\)，则可写为：

$$
w_t =
\begin{cases}
\lambda, & r_t=1 \\
1, & r_t=0
\end{cases}
$$

加权 CLM 损失为：

$$
\mathcal{L}_{\mathrm{RE}}
= -\sum_{t=1}^{L-1}
w_{t+1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

论文实验了 \(\lambda\in\{0.0,0.1,0.5,1.0\}\)。\(\lambda=0.0\) 等价于完全不让 RE token 对 loss 贡献梯度；\(\lambda=1.0\) 等价于不降权。结果显示 \(\lambda=0.5\) 在七个下游分类任务上整体最稳，说明完全忽略重复元素会丢失有功能意义的重复序列信息，但不降权又容易让高频重复模式主导预训练。

> 💡 关键：这里的 RE weighting 不是数据清洗小技巧，而是论文的核心科学问题：基因组预训练模型到底是在学习广义功能语法，还是在优先压缩最常见的重复序列。

##### 单核苷酸 token 与 6-mer token 对比

论文比较三种 tokenization：single-nucleotide、overlapping 6-mer、non-overlapping 6-mer。6-mer 能把短 motif 编码进 token，但也引入词表膨胀和边界/重叠问题；单核苷酸 token 序列更长，却保留碱基级突变、剪接位点和 motif 边界。下游表中 single-nucleotide 在 coding/intergenic、non-TATA promoter、enhancer 等任务上表现稳定，论文据此认为单碱基分辨率是合理设计。

可以把二者差异写成：

$$
\text{single token: } t_i=x_i
$$

$$
\text{overlap 6-mer: } t_i=x_i x_{i+1}\cdots x_{i+5}
$$

单核苷酸 token 的优势是变异打分自然对齐到 \(x_i\)，不会出现一个 SNP 同时改变多个重叠 k-mer token 的解释问题；代价是上下文长度同样为 8192 token 时，它只覆盖 8192 bp，而非 k-mer 压缩后的更长 nucleotide span。

##### 微调、随机初始化与 linear probing

论文不仅报告 pretrained model 的微调分数，还与两个关键对照比较：同架构随机初始化后直接监督训练、以及 one-hot/linear baseline。若预训练只是参数初始化技巧，那么随机初始化经过微调可能接近；若预训练真的学到了可迁移表征，冻结中间层后做 linear probing 也应当具有较好线性可分性。

linear probing 的形式可以写为：

$$
z = \mathrm{MeanPool}(H_\ell),\qquad
\hat{y} = \mathrm{softmax}(Wz+b)
$$

论文发现 pretrained representations 在许多任务上即使微调前也有较强线性可分性；pretrained fine-tuning 相比 random initialization 在多个 Genomic Benchmarks 任务上有明显收益。与 DNABERT、HyenaDNA、Nucleotide Transformer 对比时，Nucleotide GPT 在七个任务中的四个取得最高 accuracy，说明 decoder-only + single-nucleotide + 合理 RE weighting 可以成为 MLM 之外的有效路线。

##### SAE 解释：模型学到了哪些重复元素

为了理解内部表征，作者在 pretrained 0.5-weighted Nucleotide GPT 的 residual stream activation 上训练 sparse autoencoder：

$$
z = \sigma(W_{\mathrm{enc}}h + b_{\mathrm{enc}})
$$

$$
\hat{h} = W_{\mathrm{dec}}z + b_{\mathrm{dec}}
$$

训练目标通常包含重构误差与稀疏惩罚：

$$
\mathcal{L}_{\mathrm{SAE}}
= \lVert h-\hat{h}\rVert_2^2 + \beta\lVert z\rVert_1
$$

论文将 2048 维 activation 扩展到 8192 维稀疏 latent features，并通过序列比对/注释解释激活强的 feature。结果中出现了 LTR retrotransposons、LINE-1 不同子区域、SINE/Alu 等 RE-associated features。这既说明模型学到了可解释生物模式，也暴露了一个风险：即便 RE loss 已降权，重复元素仍可能占用大量表征空间。

##### 与 DNABERT、Nucleotide Transformer、Evo 的关系

DNABERT 与 Nucleotide Transformer 是 encoder-style 模型，重点在双向上下文 embedding 和微调分类；Evo 是更大规模的自回归 whole-genome 模型，强调长上下文和生成。Nucleotide GPT 介于两者之间：它采用 GPT 式 CLM，但规模和实验设计更聚焦于“预训练是否有用、重复元素是否主导学习、单核苷酸 token 是否优于 k-mer”这些机制问题。

因此，Nucleotide GPT 的主要贡献不是刷新最大模型规模，而是提供了一个受控实验框架：固定 LLaMA-style decoder 架构，系统改变 RE loss 权重和 tokenization，再用微调、linear probing、SAE 解释与跨模型比较检验预训练价值。

#### 🧪 练习题

```yaml
question: "Nucleotide GPT 中 repetitive element loss 权重设为 0.5 的主要动机是什么？"
options:
  - "完全删除所有重复元素，避免模型看到任何 LINE 或 SINE 序列"
  - "适度降低高频重复区域对 CLM 损失的支配，同时保留其中可能有功能意义的序列信息"
  - "把单核苷酸 token 强制转换成非重叠 6-mer"
  - "让模型从双向上下文预测 masked token"
answer: 1
explain: "论文发现完全排除 RE 会损失有用信号，不降权又会让重复序列主导预训练；0.5 权重在多个下游任务上整体最稳。"
```
