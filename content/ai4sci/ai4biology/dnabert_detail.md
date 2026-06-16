### DNABERT — 面向 DNA 语言的 k-mer BERT 预训练模型

```yaml
id: dnabert
name: DNABERT
full_name: DNABERT (DNABERT)
year: '2021.02'
org: 周德中团队
paper_url: https://academic.oup.com/bioinformatics/article/37/15/2112/6128680
category: genomics
parent: —
motivation: BERT架构应用于DNA k-mer表征
```

#### 📝 一句话总结

DNABERT 将 DNA 序列切分为重叠 k-mer，把基因组非编码序列当作“语言”输入 BERT 编码器，通过 masked language modeling 从人类基因组中学习可迁移表征。它用同一个预训练模型经少量标注数据微调后完成 promoter、splice site、TF binding site、motif 发现、功能变异打分和跨物种 mouse ENCODE 任务。

#### 🎯 核心要点

- **DNA 语言建模**：把 A/C/G/T 序列转为重叠 k-mer “词”，例如 `ACGTTA` 会生成 `ACG`、`CGT`、`GTT`、`TTA`
- **DNABERT-k 词表**：对固定 \(k\) 使用 \(4^k\) 个 k-mer token 加 `[CLS]`、`[PAD]`、`[UNK]`、`[SEP]`、`[MASK]` 等特殊 token
- **BERT 编码器**：输入 k-mer embedding、position embedding 和 token type embedding，经 12 个 Transformer block 建模双向上下文
- **预训练-微调范式**：先在人类参考基因组无监督 MLM 预训练，再在 promoter、splice、TFBS 等任务上加分类 head 微调
- **长序列处理**：标准 BERT 长度受 512 token 限制，论文提出 DNABERT-XL 思路，把长序列切成片段后拼接表示以处理更长调控区域
- **可解释性**：利用 attention/重要性分数映射到 nucleotide-level，发现保守 motif，并为 SNP、插入、删除等功能变异生成差异分数和 log odds ratio
- **数据稀缺优势**：预训练模型在小样本标注任务上收敛更快、性能高于随机初始化 Transformer 以及 CNN/CNN-RNN 基线
- **跨物种迁移**：人类基因组预训练后可微调用于 mouse ENCODE ChIP-seq 数据，说明模型捕获了部分跨物种共享的 DNA 语义模式

#### 🔬 深入细节

##### 模型架构图

![DNABERT architecture](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/15/10.1093_bioinformatics_btab083/6/m_btab083f1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=KxFm9-mA~RULzB878tneeDGzbzUiMGY6gpZE2f-BH-f9qNCeqQ2ZGARfRtgUWMo9xk6ZsSZ0a8ikaJL8lxqyDpoPe3Jqoe3EK97C4zYhfOpmKlfWcqTKNSEJAqvn7RoFyVOv3FrWG0e4PjUBSF6u4RkoY8xOGD6NU79S4boauiqjaEItH1gIU5w2P0xKcpiJy43CMDykZ~d9oF8t-Gu4o5i4XcsDktbABo91dacQFGRXLefamj-gjhQKqqPUeHs2fWODZwmSwY9NlD6GBKWtyXkSNWWVqeyjZbM7IsedLELOgJ1s4jv4S0aHlzz2EBvlwlYmB~RoDwG2hPZUpyT7kw__)
*图：DNABERT 论文 Figure 1。左侧比较 RNN、CNN 与 Transformer 的上下文建模方式；右侧展示 k-mer token、`[CLS]`、`[SEP]`、`[MASK]` 进入 12 层 Transformer 后用于序列级分类和 token 级 MLM。*

论文全文可通过 Oxford Academic 页面访问，官方代码和模型下载说明在 `https://github.com/jerryji1993/DNABERT`；官方仓库后来也把过期模型链接迁移到了 Hugging Face，但不改变 DNABERT 原始方法。

##### 算法伪代码

```python
# DNABERT 预训练与微调伪代码
def seq_to_kmers(seq, k):
    return [seq[i:i+k] for i in range(len(seq) - k + 1)]


def pretrain_dnabert(genome_windows, k, model):
    vocab = all_possible_kmers(k) + ["[CLS]", "[PAD]", "[UNK]", "[SEP]", "[MASK]"]

    for seq in genome_windows:
        tokens = ["[CLS]"] + seq_to_kmers(seq, k)[:510] + ["[SEP]"]

        # 对重叠 k-mer 做 masked language modeling
        masked_tokens, masked_pos, labels = mask_kmer_tokens(tokens)

        hidden = model(masked_tokens)          # BERT encoder
        loss = 0.0
        for pos, label in zip(masked_pos, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), label)
        optimizer.step(loss)


def finetune_for_regulatory_task(seq, k, pretrained_model, classifier):
    tokens = ["[CLS]"] + seq_to_kmers(seq, k)[:510] + ["[SEP]"]
    hidden = pretrained_model(tokens)
    cls_repr = hidden[0]
    return classifier(cls_repr)                # promoter / splice / TFBS 等分类
```

##### k-mer 表示与自注意力计算

DNA 字母表只有 4 个碱基，若直接逐碱基建模，单个 token 信息量过低；若用固定长度 k-mer，则 token 同时携带局部 motif 信息。DNABERT-k 的词表大小为：

$$
|\mathcal{V}_k| = 4^k + 5
$$

其中 5 是 `[CLS]`、`[PAD]`、`[UNK]`、`[SEP]`、`[MASK]`。给定 DNA 序列 \(x_1,\ldots,x_N\)，重叠 k-mer token 为：

$$
t_i = x_i x_{i+1}\cdots x_{i+k-1},\quad i=1,\ldots,N-k+1
$$

Transformer 层通过多头自注意力让任意两个 k-mer 直接交互：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

这正对应论文动机：CNN 主要看局部窗口，RNN 虽可建模长程依赖但顺序计算慢且有梯度瓶颈；Transformer 可以让 promoter、enhancer、TF motif 等远距离上下文在同一层中互相注意。

##### MLM 损失与重叠 k-mer 的特殊性

DNABERT 的预训练目标仍是 BERT 的 masked language modeling：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}\log p_\theta(t_i\mid \mathbf{t}_{\setminus\mathcal{M}})
$$

但 DNA k-mer 与自然语言词不同：相邻 token 高度重叠。例如 6-mer `ACGTTA` 和下一个 6-mer `CGTTAG` 共享 5 个碱基。如果只随机 mask 单个 k-mer，模型可能从相邻 k-mer 直接“抄答案”。因此 DNABERT 的实现会按 k-mer 格式处理 mask，并在官方预训练脚本中使用较低的 `mlm_probability` 示例值来缓解重叠泄漏；理解模型时要把“预测 k-mer”看作恢复一段局部 DNA 片段，而不是预测完全独立的词。

##### 为什么 BERT 适合非编码 DNA

非编码 DNA 的难点类似自然语言的多义性与长程依赖：同一个短 motif 在不同上下游上下文、不同组合间距、不同 cell type 中可能对应不同调控作用；多个相距较远的 cis-regulatory elements 也可能协同决定启动子或增强子活性。传统 one-hot + CNN 能很好识别局部 motif，但卷积核大小限制了长程组合建模；RNN/LSTM 理论上能处理长距离依赖，但长序列训练效率和梯度传播都不理想。

DNABERT 的 `[CLS]` 表示适合序列级任务，例如 promoter 是否存在、splice site 类型或某个 TF 是否结合；每个 token 的 hidden state 与 attention 分数又可映射回 nucleotide-level 区域，用于 motif 可视化。论文展示 DNABERT 能在 promoter、splice site、690 个 ENCODE TF binding 数据集等任务上与或超过专用 CNN/RNN 工具，并且在小样本设置中受益更明显。

##### 微调、解释与变异打分

微调时，DNABERT 基本保持 BERT 主体不变，只替换任务 head。对二分类或多分类任务，常用 `[CLS]` hidden state：

$$
\hat{y} = \text{softmax}(W h_{\text{[CLS]}} + b)
$$

对功能变异分析，可以比较野生型序列与突变序列的模型输出。若 \(f_\theta(x)\) 是某任务中预测为功能阳性的 logit 或概率，则突变差异分数可写为：

$$
\Delta_{\text{mut}} = f_\theta(x^{\text{mut}}) - f_\theta(x^{\text{wt}})
$$

也可以计算 log odds ratio：

$$
\text{logOR}
= \log\frac{p_\theta(y=1\mid x^{\text{mut}})}{1-p_\theta(y=1\mid x^{\text{mut}})}
- \log\frac{p_\theta(y=1\mid x^{\text{wt}})}{1-p_\theta(y=1\mid x^{\text{wt}})}
$$

论文用 mutation map 展示 DNABERT 在 CTCF、YY1 等结合位点附近给出高注意力，并能识别破坏 binding site 的 deletion/SNV。这个解释性是 DNABERT 对基因组学任务的重要工程价值：它不仅输出分类结果，还能提示哪段序列或哪处变异驱动预测。

##### 与后续模型的关系

DNABERT 是把 NLP 预训练正式引入 DNA 调控序列建模的代表性早期模型，但它也有局限：固定 k-mer 会让词表随 \(k\) 指数增长，重叠 token 带来信息泄漏风险，512 token 限制对超长调控区域不友好，且原始模型主要在人类基因组上预训练。后续 DNABERT-2 用 BPE、ALiBi 和多物种基因组进一步改进效率与泛化；不过原始 DNABERT 的核心思想仍然清晰：先在无标注基因组上学通用 DNA 语义，再把表征迁移到多个调控预测任务。

> 💡 关键：DNABERT 的价值不在于把 BERT 名字搬到 DNA 上，而在于用 k-mer token 和 MLM 把“局部 motif + 长程上下文 + 低标注迁移”统一进同一个预训练框架。

#### 🧪 练习题

```yaml
question: "DNABERT 为什么使用重叠 k-mer 而不是只用单个碱基作为 token？"
options:
  - "k-mer 能把局部 motif 信息编码进 token，同时仍可通过 Transformer 建模长程上下文"
  - "k-mer 可以完全消除 512 token 长度限制"
  - "k-mer 让模型不再需要 masked language modeling"
  - "k-mer 只能用于蛋白质序列，不能用于 DNA"
answer: 0
explain: "单碱基 token 信息量太低；重叠 k-mer 直接表示局部 DNA 片段或 motif，再由自注意力学习不同片段之间的远距离依赖。"
```
