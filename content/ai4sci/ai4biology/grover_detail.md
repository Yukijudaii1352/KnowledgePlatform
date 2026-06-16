### GROVER — 从人类基因组语料中学习上下文相关 DNA 词汇与表示

```yaml
id: grover
name: GROVER
full_name: GROVER (GROVER)
year: '2024.07'
org: Sanabria et al.
paper_url: https://www.nature.com/articles/s42256-024-00838-3
category: genomics
parent: —
motivation: 学习人类基因组上下文DNA语言模型
```

#### 📝 一句话总结

GROVER 提出一套面向 DNA 的上下文词汇学习与 BERT-style 预训练方法，用从人类基因组中学到的 k-mer 词表和 masked language modeling 捕获序列语义。它强调 tokenization 本身是基因组语言模型的核心部件，并展示学到的 DNA 词汇可对应 motif、promoter、CTCF 结合等功能信号。

#### 🎯 核心要点

- **基因组词汇学习**：不直接使用固定单碱基或任意 k-mer，而是从人类基因组语料中学习上下文相关 DNA tokens
- **BERT-style encoder**：将 DNA token 序列输入多层 Transformer encoder，通过双向上下文学习每个 token 的语义表示
- **Masked language modeling**：随机 mask DNA tokens，让模型根据上下游上下文恢复被遮蔽片段
- **上下文驱动 tokenization**：论文把 tokenizer 视为关键科学问题，比较不同词汇大小和 token 长度对下游性能与可解释性的影响
- **功能解释**：学到的 token 和 attention/attribution 可映射到已知 motif、promoter、CTCF binding site 与 enhancer-like regulatory sequence
- **下游任务覆盖**：用于 promoter 识别、transcription factor binding、chromatin/regulatory sequence 分类等人类基因组功能预测
- **来源修正**：任务 YAML 中的 Nature URL 无法对应到可访问论文页；实际可访问论文为 Nature Machine Intelligence `https://www.nature.com/articles/s42256-024-00872-0`

#### 🔬 深入细节

##### 模型示意图与可访问来源

![GROVER framework overview](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-024-00872-0/MediaObjects/42256_2024_872_Fig1_HTML.png)
*图：Nature Machine Intelligence Fig. 1。GROVER 从人类基因组构建 DNA 词汇，预训练 Transformer 语言模型，并把学到的表示用于功能序列预测和解释。*

可访问来源说明：任务 YAML 保留了给定 `paper_url`；我实际核对的公开论文页是 `https://www.nature.com/articles/s42256-024-00872-0`，论文代码/数据入口可从该 Nature 页面关联的补充材料与项目资源追溯。

##### 算法伪代码

```python
# GROVER 简化流程：学习 DNA 词汇 -> MLM 预训练 -> 下游微调
def learn_genome_vocabulary(genome, initial_kmers, vocab_size):
    vocab = set(initial_kmers)
    tokenized = tokenize_with_current_vocab(genome, vocab)

    while len(vocab) < vocab_size:
        candidates = collect_candidate_extensions(tokenized)
        # 选择最能提升上下文可预测性的 DNA 片段作为新 token
        best_token = argmax(candidates, score_by_context_prediction)
        vocab.add(best_token)
        tokenized = tokenize_with_current_vocab(genome, vocab)
    return vocab


def pretrain_grover(genome_windows, tokenizer, transformer):
    for seq in genome_windows:
        tokens = tokenizer.encode(seq)
        masked, mask_positions, labels = mask_random_tokens(tokens)

        hidden = transformer(masked)
        loss = 0.0
        for pos, label in zip(mask_positions, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), label)
        optimizer.step(loss)


def finetune_for_function(seq, tokenizer, transformer, classifier):
    tokens = tokenizer.encode(seq)
    hidden = transformer(tokens)
    pooled = pool_or_cls(hidden)
    return classifier(pooled)
```

##### 动机：DNA 语言模型不只是换一个 BERT

DNA 与自然语言相似的一点是：同一短片段在不同上下文中可以有不同功能。例如一个 TF motif 是否真正结合，取决于周围可及性、协同 motif、方向、间距和所在调控区域；一个 promoter-like 片段也需要在更长上下文中才有意义。传统 one-hot CNN 能识别局部 motif，但 token 粒度通常固定在碱基或手工 k-mer；早期 DNA BERT 模型使用固定 k-mer，又会带来词表膨胀和重叠泄漏。

GROVER 的核心立场是：基因组语言模型的“词”不应完全手工指定。设 DNA 序列为：

$$
x = x_1x_2\cdots x_L,\quad x_i\in\{A,C,G,T\}
$$

tokenizer 把它切分为可变片段：

$$
\tau(x) = (t_1,t_2,\ldots,t_n),
\quad
t_i \in \mathcal{V}_{\mathrm{DNA}}
$$

如果 \(\mathcal{V}_{\mathrm{DNA}}\) 学得好，常见 regulatory words、重复片段、motif-like segments 会成为稳定 token；如果词表过粗或过细，模型要么丢失细粒度碱基信息，要么在过长 token 序列上浪费注意力。

##### 词汇学习与上下文目标

GROVER 的词汇学习可以抽象为选择一组 DNA tokens，使 token 在基因组上下文中具有高可预测性和功能可解释性。对候选 token \(w\)，可用上下文窗口 \(c(w)\) 衡量它是否能由周围序列可靠预测：

$$
s(w) =
\mathbb{E}_{(w,c)}
\left[
\log p_\phi(w\mid c(w))
\right]
$$

词表构建的目标可以写成：

$$
\mathcal{V}^{\*}
= \arg\max_{\mathcal{V}:|\mathcal{V}|=K}
\sum_{w\in\mathcal{V}} s(w)
$$

这个公式不表示实现必须穷举搜索，而是说明 GROVER 的 tokenizer 不是任意切分：它偏向选择在真实基因组上下文中重复出现、可由上下文解释、且可能承载功能信息的片段。这样得到的 token 更接近“基因组词汇”，而不是机械滑窗。

##### Transformer 预训练与 MLM 损失

给定 token 序列 \(\mathbf{t}\)，GROVER 使用 masked language modeling 预训练。随机选择 mask 集合 \(\mathcal{M}\)，模型看到被遮蔽后的序列 \(\tilde{\mathbf{t}}\)，目标是恢复原 token：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \tilde{\mathbf{t}})
$$

Transformer encoder 的自注意力为：

$$
H^{(\ell+1)}
= \mathrm{TransformerBlock}(H^{(\ell)}),
\quad
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

双向上下文对基因组很重要：一个 promoter token 的意义可能同时由上游 TATA-like signal、下游 transcription start site 邻域和远端 regulatory composition 决定。MLM 迫使模型把两侧上下文压入隐藏表示，而不是只学习左到右的序列生成。

##### 功能预测与解释方式

下游微调时，GROVER 把序列级表示输入分类 head。若任务是判断某 DNA 片段是否为 promoter 或 TF binding site，可写作：

$$
h_{\mathrm{seq}} = \mathrm{Pool}(H),
\quad
\hat{y} = \sigma(W h_{\mathrm{seq}} + b)
$$

训练损失是二分类交叉熵：

$$
\mathcal{L}_{\mathrm{BCE}}
= -y\log\hat{y}-(1-y)\log(1-\hat{y})
$$

可解释性来自两层映射。第一层是 token 本身：如果某些 token 频繁对应已知 motif 或 regulatory element，说明 tokenizer 学到了生物学上稳定的片段。第二层是模型 attribution：把 attention、gradient 或 occlusion 分数从 token 映射回碱基区间，定位哪些 DNA words 驱动了预测。对 CTCF 等任务，这种映射能检查高分 token 是否落在已知结合 motif 附近。

##### 与 DNABERT/DNABERT-2 的区别

DNABERT 的重点是证明 BERT + k-mer 可迁移到 DNA；DNABERT-2 的重点是用 BPE 和 ALiBi 提高效率与多物种泛化；GROVER 更强调“词汇学习”本身是建模对象。它不是只追求更长上下文或更大模型，而是问一个更基础的问题：什么样的 DNA 片段应该成为语言模型的 token？

| 维度 | DNABERT | DNABERT-2 | GROVER |
|------|---------|-----------|--------|
| token 粒度 | 固定重叠 k-mer | BPE 可变长 token | 从人类基因组上下文学习 DNA 词汇 |
| 主要动机 | 把 BERT 引入 DNA | 提升效率、泛化和长序列外推 | 让 tokenization 更符合基因组语义 |
| 预训练目标 | MLM | MLM | MLM 与词汇上下文学习 |
| 解释重点 | attention/motif | benchmark 泛化 | DNA words 与功能元件对应关系 |

##### 局限与使用边界

GROVER 的优势来自人类基因组上下文，因此它对人类调控序列任务最自然；跨物种、超长结构变异和单细胞条件特异调控仍需要额外数据或模型设计。另一个边界是 tokenization 可解释性不等于因果机制：一个 token 与 motif 或 promoter 信号相关，说明模型捕获了统计规律，但仍需 reporter assay、CRISPR perturbation 或 eQTL/sQTL 数据来验证真实功能。

> 💡 关键：GROVER 把 DNA language model 的关键问题前移到 tokenizer：如果 DNA “词”学得更像真实基因组上下文中的功能片段，后续 Transformer 表示和下游解释都会更有生物学意义。

#### 🧪 练习题

```yaml
question: "GROVER 相比固定 k-mer DNA BERT 的核心关注点是什么？"
options:
  - "从基因组上下文中学习更有语义的 DNA token，而不是完全依赖手工固定 k-mer"
  - "只使用 CNN，不使用 Transformer"
  - "只预测蛋白质三维结构，不处理 DNA 序列"
  - "用随机词表替代 masked language modeling"
answer: 0
explain: "GROVER 的核心是把 DNA tokenization 作为建模问题：通过基因组上下文学习 DNA words，再用 MLM 训练 Transformer 表示，用于功能预测和解释。"
```
