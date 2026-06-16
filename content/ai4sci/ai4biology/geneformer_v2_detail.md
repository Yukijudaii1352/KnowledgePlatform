### Geneformer V2 (Geneformer V2)

```yaml
id: geneformer_v2
name: Geneformer V2
full_name: Geneformer V2 (Geneformer V2)
year: '2026.03'
org: Broad Institute
paper_url: https://www.biorxiv.org/content/10.1101/2026.03.15.485123v1
category: single_cell
parent: geneformer
motivation: 316M参数增强复杂调控网络推断
```

#### 📝 一句话总结

Geneformer V2 将 Geneformer 从 10M 参数、约 3000 万细胞扩展到 104M/316M 参数和约 1.04 亿人类单细胞转录组，通过 rank-value 编码、掩码基因预测、缩放规律分析和 4-bit 量化微调，让更大的单细胞 Transformer 能在少样本或零样本场景下推断更复杂的基因网络动态。

#### 🎯 核心要点

- **规模升级**：V2 官方模型包含 Geneformer-V2-104M 与 Geneformer-V2-316M；316M 版本为 18 层、隐藏维度 1152、18 个注意力头，输入长度 4096
- **数据升级**：Genecorpus-104M 汇集约 1.04 亿人类单细胞转录组、约 150B gene tokens，覆盖更广泛的组织、疾病和发育状态
- **rank-value 表达编码**：每个细胞内基因按相对表达强度排序，并用跨语料基因表达中位数缩放，降低 housekeeping genes 的支配性、提升低表达但状态特异 TF 的优先级
- **自监督预训练目标**：随机掩码 15% 基因 token，训练 Transformer 根据上下文恢复被遮盖基因，学习上下文依赖的 gene-gene network dynamics
- **缩放规律**：论文报告更大参数量在 transcriptional masked learning 上按 power-law 改善，316M 模型在基因级和细胞级零样本任务中通常最强
- **量化与 LoRA**：4-bit quantized Geneformer 通过冻结量化基座并训练低秩适配器，保留 full-precision 表征能力，同时显著降低微调时间与显存
- **任务覆盖**：支持 zero-shot embedding、in silico perturbation/treatment、TF target/cooperativity、gene/cell classification、batch-aware cell-state representation 等
- **来源校正**：任务给定 bioRxiv URL 当前无法作为 Geneformer V2 主文献检索；可访问的 V2 论文为 Nature Computational Science 2026 文章 `https://www.nature.com/articles/s43588-026-00972-4`，模型卡与官方仓库见 `https://huggingface.co/ctheodoris/Geneformer`

#### 🔬 深入细节

![Geneformer V2 scaling and transfer learning](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs43588-026-00972-4/MediaObjects/43588_2026_972_Fig1_HTML.png)
*图：Geneformer V2 论文 Figure 1。该图展示 Geneformer 的 transfer learning 策略、Genecorpus-104M 组成、4096 输入长度覆盖度，以及随参数量增长的 masked-gene 预训练损失缩放规律。*

##### 来源说明

任务 YAML 中的 `https://www.biorxiv.org/content/10.1101/2026.03.15.485123v1` 当前未能检索到 Geneformer V2 论文页面。本文方法解读基于可访问的 Nature Computational Science 版本 `Scaling and quantization of large-scale foundation model enables resource-efficient predictions in network biology`、Geneformer Hugging Face 模型卡、CZ Virtual Cells Platform 模型卡和 Geneformer 文档。上述来源一致指出 V2 模型训练于 Genecorpus-104M，公开 V2-104M/V2-316M 权重，并将 V2-316M 作为当前默认模型。

##### 算法伪代码

```python
# Geneformer V2 pretraining / downstream use
def geneformer_v2_pretrain(cells, gene_median, transformer, vocab, max_len=4096):
    for cell in cells:
        # 1. rank-value encoding: 先按跨语料中位表达缩放，再在单细胞内排序
        detected = genes_with_nonzero_counts(cell)
        scaled_expr = {g: cell.count[g] / gene_median[g] for g in detected}
        gene_tokens = sort_descending_by_value(scaled_expr)[:max_len]
        gene_tokens = ["[CLS]"] + gene_tokens + ["[EOS]"]

        # 2. masked transcriptional modeling
        mask = sample_positions(gene_tokens, ratio=0.15, exclude_special=True)
        corrupted = replace(gene_tokens, mask, "[MASK]")

        # 3. Transformer encoder learns contextual gene/cell embeddings
        h = transformer(corrupted, attention_mask=non_padding_mask(corrupted))
        logits = lm_head(h[mask])
        loss = cross_entropy(logits, gene_tokens[mask])
        update(transformer, loss)

def geneformer_v2_lora_finetune(task_cells, labels, pretrained_316m):
    # 4-bit base frozen; low-rank adapters carry task-specific update
    base = quantize_4bit(pretrained_316m)
    adapters = init_lora_adapters(base, rank=r)
    for cells, y in task_cells:
        emb = base.forward_with_adapters(cells, adapters)
        loss = task_loss(task_head(emb["CLS"]), y)
        update(adapters, task_head, loss)
    return base, adapters, task_head
```

##### rank-value 编码：把转录组变成“细胞句子”

Geneformer 的关键输入并不是原始 count 向量，而是每个细胞内部的基因排序。设 \(x_{cg}\) 是细胞 \(c\) 中基因 \(g\) 的表达量，\(m_g\) 是该基因在预训练语料中非零表达的中位数，则一个简化 rank-value 分数可写为：

$$
s_{cg}=\frac{x_{cg}}{m_g+\epsilon}, \qquad
\pi_c=\operatorname{argsort}_{g \in G_c}(-s_{cg})
$$

\(\pi_c\) 是送入 Transformer 的 token 序列。这个设计的直觉是：原始 count 中高表达 housekeeping genes 往往会占据前列，但它们未必最能区分细胞状态；相反，转录因子等低表达基因一旦相对自身典型表达范围被显著激活，可能更能说明调控状态。rank-value 编码把“在这个细胞里异常重要的基因”放到前面，使模型更容易从上下文中学习调控网络层级。

##### 掩码基因预测与上下文网络表征

预训练目标沿用 BERT 式 masked token learning，但 token 是基因而不是自然语言词。随机选择位置集合 \(M\)，模型根据未遮盖基因和它们的排序位置预测被遮盖基因：

$$
\mathcal{L}_{\text{MLM}}
=-\sum_{i \in M}\log p_\theta(g_i \mid \pi_c^{\setminus M}, i)
$$

这个目标不会直接输入显式 GRN 边，而是迫使模型学习“哪些基因在同一细胞状态下共同出现、谁能解释谁的上下文”。论文报告 Geneformer 的注意力和嵌入空间能够编码 network hierarchy，并支持 TF dosage sensitivity、TF target prediction、chromatin dynamics、regulatory range 等基因级任务。

##### V2 的缩放逻辑

V1 的主要限制是语料、输入长度和参数量较小。V2 使用 Genecorpus-104M 和 4096 输入长度，论文指出该长度可覆盖 Genecorpus-104M 中绝大多数细胞的检测基因数。模型族从 10M 扩到 104M 与 316M 后，训练损失与 held-out masked gene prediction 随参数量改善，表现出类似语言模型的缩放趋势：

$$
\mathcal{L}(N) \approx aN^{-\alpha}+b
$$

其中 \(N\) 表示参数量或计算预算。实际含义是：在更大、更多样的单细胞语料上，更大的 Transformer 能容纳更多细胞状态、组织上下文和调控模式，尤其在没有任务标签的 zero-shot embedding 与少样本 fine-tuning 中更有优势。

##### 量化微调：让 316M 模型可用

316M dense Transformer 对实验室 GPU 资源并不友好。Geneformer V2 论文因此把量化作为核心工程贡献之一：冻结 4-bit 量化后的基座权重，只训练低秩适配器。简化写法是：

$$
W_{\text{eff}} = Q_4(W_0) + \frac{\alpha}{r}BA
$$

其中 \(Q_4(W_0)\) 是 4-bit 量化权重，\(A,B\) 是 LoRA 低秩矩阵。论文报告在相同 batch size 下，4-bit 量化模型的 fine-tuning 时间约为 full-precision 的 15%，显存约为 34%，同时在基因级与细胞级任务上与 full-precision 模型无显著差异。这使 V2-316M 不只是“更大”，而是能在普通下游任务中被实际微调和部署。

##### 与原始 Geneformer 的区别

原始 Geneformer 的贡献是证明单细胞转录组可以作为可迁移的网络生物学基础模型，用少量数据做疾病基因、TF target、候选治疗靶点等预测。V2 的新增重点是规模化与资源效率：更大语料、更长输入、更大模型、更系统的 scaling-law 评估，以及 4-bit/LoRA 路线。它并没有把单细胞数据改造成显式图神经网络，而是继续押注“ranked gene sequence + Transformer encoder”的统一形式，让同一表征能服务 gene-level 和 cell-level 任务。

> 💡 关键：Geneformer V2 的核心不是新增一个复杂下游头，而是验证“单细胞转录组 Transformer 确实吃规模”，并用量化把 316M 参数模型从论文结果变成可微调工具。

#### 🧪 练习题

```yaml
question: "Geneformer V2 的 rank-value encoding 主要解决什么问题？"
options:
  - "把所有基因按染色体坐标排序，从而保留基因组空间距离"
  - "用跨语料表达尺度校正单细胞内表达排序，突出状态特异基因而非单纯高表达基因"
  - "把表达量离散成固定 0/1 标签，删除连续表达信息"
  - "直接输入人工标注的基因调控网络边，替代 Transformer 注意力"
answer: 1
explain: "rank-value encoding 先按每个基因在大语料中的典型表达范围缩放，再在单细胞内排序；这会降低 housekeeping genes 的支配性，并提升转录因子等状态特异基因的上下文权重。"
```
