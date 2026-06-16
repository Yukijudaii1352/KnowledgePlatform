### Nucleotide Transformer — 面向人类基因组表征迁移的 DNA 基础模型族

```yaml
id: nucleotide_transformer
name: Nucleotide Transformer
full_name: Nucleotide Transformer (Nucleotide Transformer)
year: '2025.01'
org: InstaDeep
paper_url: https://www.nature.com/articles/s41592-024-02523-z
category: genomics
parent: —
motivation: 3202基因组预训练基础模型
```

#### 📝 一句话总结

Nucleotide Transformer 系统构建并评估了一族 50M 到 2.5B 参数的 DNA masked language models，用 3,202 个人类基因组和 850 个物种基因组预训练，解决基因组任务标注稀缺和跨任务迁移困难的问题。论文的核心贡献是把大规模预训练、18 个下游基准、注意力解释和功能变异优先级评估放进同一套可复现实验框架。

#### 🎯 核心要点

- **模型族而非单一模型**：包括 Human ref 500M、1000G 500M、1000G 2.5B、Multispecies 2.5B，以及后续用于缩放分析的 50M 到 500M 小模型
- **多来源预训练数据**：1000G 方案整合 3,202 个遗传多样的人类基因组，multispecies 方案整合 850 个不同物种基因组
- **6-mer token 表示**：NT-v1 主线使用 6-mer token，一个 embedding 对应 6 个核苷酸；SpliceAI 适配中也将每个 token 的 embedding 映射回 6 个碱基标签
- **MLM 预训练目标**：随机 mask token，让 Transformer encoder 从双向上下文恢复原始 token，学习可迁移的 sequence embedding
- **两种下游使用方式**：probing 使用冻结层 embedding 训练 logistic regression/MLP；fine-tuning 替换 LM head 为分类或回归 head，并可用参数高效微调
- **18 个基因组任务基准**：覆盖 splice site、promoter、enhancer、histone modification、chromatin profile 等任务，并使用 tenfold cross-validation
- **与强基线比较**：和 DNABERT、Enformer、HyenaDNA、BPNet 等基础模型或任务专用模型比较，使用 MCC 作为跨任务主指标
- **可解释性分析**：通过 attention maps、t-SNE embedding、masked token reconstruction 观察模型是否关注 exon、intron、promoter、enhancer、CTCF、open chromatin 等元素
- **变异优先级评估**：对参考/替代等位基因构造 6,000 bp 窗口，比较 embedding 距离、masked loss 差异和微调分类分数，用于 eQTL、meQTL、ClinVar、HGMD 等变异集合排序

#### 🔬 深入细节

##### 方法示意图

![Nucleotide Transformer workflow](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41592-024-02523-z/MediaObjects/41592_2024_2523_Fig1_HTML.png)
*图：Nature Methods Figure 1。上半部分展示 tokenization、masking、Nucleotide Transformer encoder、LM head 和 masked token recovery；下半部分展示冻结/微调后的下游预测，以及不同模型在参数规模、perception field 与 18 个任务均值 MCC 上的比较。*

来源说明：论文正文、图、公式和方法可通过 Nature Methods 开放页面访问：`https://www.nature.com/articles/s41592-024-02523-z`；官方代码与模型入口见 `https://github.com/instadeepai/nucleotide-transformer`；InstaDeep 博客给出模型族和应用概览。

##### 算法伪代码

```python
# Nucleotide Transformer 预训练、probing 与微调伪代码
def to_6mers(seq):
    # 实际实现会处理 N、special tokens、padding 和长度对齐
    return [seq[i:i+6] for i in range(0, len(seq) - 5, 6)]


def pretrain_nt(genome_windows, encoder, lm_head, mask_rate=0.15):
    for seq in genome_windows:
        tokens = ["<CLS>"] + to_6mers(seq) + ["<EOS>"]
        masked_tokens, masked_pos, labels = mask_tokens(tokens, rate=mask_rate)

        hidden = encoder(masked_tokens)
        logits = lm_head(hidden[masked_pos])
        loss = cross_entropy(logits, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def probe_task(seq, frozen_encoder, probe):
    hidden = frozen_encoder(to_6mers(seq))
    features = mean_pool(select_layers(hidden))
    return probe(features)  # logistic regression 或小型 MLP


def finetune_task(seq, encoder, task_head):
    hidden = encoder(to_6mers(seq))
    pooled = mean_pool(hidden)
    y_hat = task_head(pooled)
    return y_hat
```

##### 为什么用 masked encoder 而不是只训练监督模型

基因组监督任务通常标注昂贵、任务碎片化，而且很多任务的标签只覆盖少量 cell type、组织或实验条件。传统 CNN/CNN-RNN 任务模型可以在单个任务上很好地拟合 motif，但难以在 splice、promoter、enhancer、histone mark、TF binding、variant effect 之间共享知识。NT 的策略是先用大规模无标签基因组做 MLM 预训练，让模型学习通用 DNA 统计结构，再把表征迁移到小标注任务。

MLM 目标可写为：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \mathbf{t}_{\setminus \mathcal{M}})
$$

其中 \(\mathbf{t}\) 是 6-mer token 序列，\(\mathcal{M}\) 是被 mask 的 token 位置集合。由于 encoder 同时看左右上下文，它适合学习“一个局部片段在其双向基因组环境中是否合理”，这对 promoter、splice donor/acceptor 和增强子等判别任务很自然。

##### 6-mer token 与感受野

NT-v1 采用 6-mer token。若把 DNA 序列 \(x_1,\ldots,x_N\) 切成长度为 6 的 token，可以写为：

$$
t_j = x_{6j+1}x_{6j+2}\cdots x_{6j+6}
$$

因此一个长度为 \(N\) 的窗口会变成约 \(N/6\) 个 token。若模型最大处理 \(T\) 个 token，则 nucleotide-level perception field 近似为：

$$
R_{\mathrm{bp}} \approx 6T
$$

这种设计与 DNABERT 的重叠 k-mer 不同：它牺牲一部分逐碱基边界灵活性，换取更短序列长度和更高效的大模型训练。论文在 SpliceAI 任务中明确把每个 token embedding 映射为 6 个核苷酸的标签概率，说明 NT 的 token 表示仍能通过任务 head 回到 nucleotide-level 输出。

##### 模型族与数据设置

论文首先构造四个大模型设置：

- Human ref 500M：在人类参考基因组序列上预训练
- 1000G 500M：在 3,202 个遗传多样的人类基因组上预训练
- 1000G 2.5B：同样使用 3,202 人类基因组，但扩大到 2.5B 参数
- Multispecies 2.5B：在 850 个不同物种基因组上预训练，包含多个模式生物

随后作者又训练 50M 到 500M 的更小模型做缩放分析。这个设计让论文能同时回答三个问题：同等架构下，更多人类个体是否有帮助；同等数据下，更大模型是否有帮助；跨物种数据是否改善人类基因组任务泛化。论文结论倾向于“大数据 + 大模型 + 物种多样性”共同提升，尤其是 multispecies 训练对学习保守功能元素有价值。

##### 下游任务：probing 与 fine-tuning

NT 的下游使用分为 probing 和 fine-tuning。probing 冻结 Transformer，只取某些层的 embedding，再训练简单分类器：

$$
\hat{y} = g_\phi(\mathrm{Pool}(H_\ell))
$$

其中 \(H_\ell\) 是第 \(\ell\) 层 hidden states，\(g_\phi\) 可以是 logistic regression 或 MLP。probing 的意义是检测预训练表征本身是否线性可分，而不是追求最高性能。

fine-tuning 则替换 LM head 为任务 head，并更新部分或全部参数：

$$
\mathcal{L}_{\mathrm{sup}}
= -\sum_{c=1}^C y_c \log \hat{y}_c
$$

对于 chromatin profile 这种多标签任务，论文在 DeepSEA 数据上使用 919 个独立分类头，对 690 个 TF、125 个 DNase 和 104 个 histone features 取平均交叉熵，并对正样本 loss 加权以处理类别不平衡。对于 splice site，模型需要为每个 nucleotide 输出 acceptor、donor 或 none，任务 head 会把 6-mer embedding 展开成 6 个位置的三分类输出。

##### Masked reconstruction、attention 与功能解释

为了分析模型学到了什么，论文不只报告下游分数，还计算 masked token reconstruction。给定 masked 位置集合 \(\mathcal{P}_{\mathrm{masked}}\)，可定义恢复准确率：

$$
\mathrm{acc}(\theta,\mathbf{s})
= \frac{1}{|\mathcal{P}_{\mathrm{masked}}|}
\sum_{i\in\mathcal{P}_{\mathrm{masked}}}
\mathbf{1}\left[
\arg\max_{\mathrm{tok}\in\mathcal{V}}
p_\theta(\mathrm{tok}\mid \mathbf{s}_{\setminus i})
= s_i
\right]
$$

也可以用 masked loss 的指数作为伪 perplexity：

$$
\mathrm{PPL}_{\mathrm{MLM}}(\theta,\mathbf{s})
= \exp\left(
-\frac{1}{|\mathcal{P}_{\mathrm{masked}}|}
\sum_{i\in\mathcal{P}_{\mathrm{masked}}}\log p_\theta(s_i\mid \mathbf{s}_{\setminus i})
\right)
$$

attention 解释则计算一个 attention head 对某类功能元素的关注比例。若 \(f(i)=1\) 表示 token \(i\) 与某个 genomic element 重叠，论文使用类似指标：

$$
p_\alpha(f)
= \frac{1}{|\mathbf{X}|}
\sum_{\mathbf{x}\in\mathbf{X}}
\frac{\sum_i\sum_j f(i)\mathbf{1}(\alpha(i,j)>\mu)}
{\sum_i\sum_j \mathbf{1}(\alpha(i,j)>\mu)}
$$

这个指标用于检查注意力是否集中在 5' UTR、3' UTR、exon、intron、enhancer、promoter、CTCF binding site、open chromatin 和 TF binding sites 等元素上。核心直觉是：如果一个无监督 MLM 的注意力头反复指向功能元素，则说明它在恢复 token 时学到了某种基因组语法，而不只是碱基组成偏好。

##### 变异优先级：从 embedding 空间比较等位基因

对 SNP 影响评估，NT 构造以突变位点为中心的 6,000 bp 序列，分别放入 reference allele 与 alternative allele，得到两个序列表征 \(z_{\mathrm{ref}}\) 与 \(z_{\mathrm{alt}}\)。论文比较多种 zero-shot scores：

$$
d_1 = \lVert z_{\mathrm{alt}} - z_{\mathrm{ref}}\rVert_1,\qquad
d_2 = \lVert z_{\mathrm{alt}} - z_{\mathrm{ref}}\rVert_2
$$

$$
\mathrm{cos}(z_{\mathrm{ref}}, z_{\mathrm{alt}})
= \frac{z_{\mathrm{ref}}^\top z_{\mathrm{alt}}}
{\lVert z_{\mathrm{ref}}\rVert_2\lVert z_{\mathrm{alt}}\rVert_2}
$$

还可以比较 alternative 与 reference 序列的 masked loss：

$$
\Delta_{\mathrm{loss}}
= \mathcal{L}_{\mathrm{MLM}}(x_{\mathrm{alt}})
- \mathcal{L}_{\mathrm{MLM}}(x_{\mathrm{ref}})
$$

若一个变异显著改变 NT 的 embedding 或 reconstruction loss，它更可能改变功能元件语法。论文进一步用 eQTL、meQTL、ClinVar、HGMD 与 1000G common SNP 构造正负样本，评估 zero-shot 与 fine-tuned scores 对功能变异的排序能力。

##### 与 DNABERT、Enformer、HyenaDNA 的区别

DNABERT 是早期 BERT-style k-mer DNA 模型，更强调 k-mer MLM 在多个监管任务上的迁移；Enformer 是任务专用的长程 expression/regulatory predictor，强在监督建模；HyenaDNA 是单核苷酸长上下文模型，强调 efficient long-range modeling。NT 的论文重点是系统化：模型族规模从 50M 到 2.5B，数据源从单参考到 3,202 人类基因组和 850 物种，评估覆盖 18 个 curated tasks、attention 解释和 variant prioritization。

> 💡 关键：Nucleotide Transformer 的价值不只在某个排行榜分数，而在证明“基因组大规模 MLM 预训练 + 标准化基准 + 解释性分析”可以成为人类基因组表征学习的一套通用工作流。

#### 🧪 练习题

```yaml
question: "Nucleotide Transformer 预训练中 masked language modeling 的主要作用是什么？"
options:
  - "让 encoder 从双向基因组上下文恢复被遮蔽的 6-mer token，从而学习可迁移序列表征"
  - "让模型只能从左到右生成全基因组序列"
  - "把所有 DNA 序列翻译为蛋白质后再训练"
  - "避免在下游任务中使用任何标注数据"
answer: 0
explain: "NT 是 encoder-style MLM；预训练学习的是上下文相关 embedding，下游仍可通过 probing 或 fine-tuning 使用标注数据。"
```
