### MolDeBERTa — 分子DeBERTa (MolDeBERTa)

```yaml
id: moldeberta
name: MolDeBERTa
full_name: 分子DeBERTa (MolDeBERTa)
year: '2026.02'
org: Stanford University
paper_url: https://www.biorxiv.org/content/10.1101/2026.02.15.706011v1
category: foundation
parent: molbert
motivation: BPE编码1.23亿分子预训练
```

#### 📝 一句话总结

MolDeBERTa 提出基于 DeBERTaV2 的 SMILES 分子编码器，用 byte-level BPE 和 123M PubChem 分子进行大规模预训练，并用分子描述符、Morgan 指纹和对比学习目标把理化性质与子结构相似性直接注入表示空间。它针对 MLM 只学习 token 上下文、不显式对齐化学性质的问题，给出了一组 chemistry-informed 的自监督目标。

#### 🎯 核心要点

- **现代 encoder 骨架**：从 BERT/RoBERTa 系列升级到 DeBERTaV2，利用 disentangled attention 和更强的 encoder 表示能力
- **byte-level BPE tokenizer**：在 SMILES 字符串上训练 BPE，减少纯字符 tokenization 的序列长度和稀疏组合问题
- **大规模 PubChem 预训练**：系统比较 10M 与 123M SMILES 数据规模，是公开 SMILES encoder 中较大的预训练语料之一
- **三种模型规模**：tiny、small、base 三档架构，论文比较模型容量与预训练目标的交互影响
- **五类预训练目标**：MLM、MTR、MLC、contrastive MTR、contrastive MLC，其中 MLC 和两个 contrastive 目标强调子结构/性质归纳偏置
- **MTR 目标**：预测由 SMILES 确定性计算的分子理化描述符，让 `[CLS]` 表示靠近物性空间
- **MLC 目标**：预测 2048 维 Morgan fingerprint，显式学习半径 2 子结构是否存在
- **对比学习目标**：把同一分子的 SMILES 表示与描述符/指纹派生表示拉近，把不同分子的表示拉远
- **MoleculeNet 验证**：在 9 个下游任务上评估，官方摘要称整体 4/9 任务最佳，并在 7/9 任务超过 SMILES-based encoder
- **可解释性分析**：用梯度归因分析 ibuprofen 在 Delaney 溶解度和 Lipo 脂溶性任务中的原子重要性，检查表示是否符合化学直觉

#### 🔬 深入细节

##### 核心示意图与来源说明

原始 YAML 给出的 `10.1101` bioRxiv 链接在当前检索中没有作为可直接打开的页面返回；可访问来源为 bioRxiv DOI `https://doi.org/10.64898/2026.02.15.706011`、官方 GitHub `https://github.com/pcdslab/MolDeBERTa`、Hugging Face 模型集合 `https://huggingface.co/collections/SaeedLab/moldeberta`，以及作者上传到 ResearchGate 的全文。bioRxiv 图像端点在本环境返回 Cloudflare/403，因此这里用可复现文字图示表达论文框架。

![MolDeBERTa 官方仓库概览](https://opengraph.githubassets.com/moldeberta/pcdslab/MolDeBERTa)
*图：MolDeBERTa 官方 GitHub 仓库的公开预览图；论文图像端点不可直连时，正文下方用文字框架图复现其预训练与微调流程。*

```text
PubChem SMILES (10M / 123M)
        │
        ▼
byte-level BPE tokenizer
        │
        ▼
DeBERTaV2 encoder: tiny / small / base
        │
        ├── MLM: masked token prediction
        ├── MTR: RDKit-like physicochemical descriptor regression
        ├── MLC: 2048-bit Morgan fingerprint multi-label classification
        ├── contrastive MTR: align SMILES embedding with descriptor-derived target
        └── contrastive MLC: align SMILES embedding with fingerprint-derived target
        │
        ▼
MoleculeNet finetuning: BACE, BBBP, ClinTox, HIV, Tox21, Delaney, Lipo, Clearance, ...
```

##### 算法伪代码

```python
# MolDeBERTa 预训练与微调伪代码
for smiles in pubchem_corpus:
    tokens = byte_level_bpe.encode(smiles, max_length=128)
    cls_repr, token_repr = deberta_v2_encoder(tokens)

    if objective == "mlm":
        masked_tokens, labels = mask_tokens(tokens)
        outputs = deberta_v2_encoder(masked_tokens)
        loss = cross_entropy(outputs.masked_logits, labels)

    elif objective == "mtr":
        descriptors = compute_physchem_descriptors(smiles)
        pred = regression_head(cls_repr)
        loss = mean_squared_error(pred, descriptors)

    elif objective == "mlc":
        fingerprint = morgan_fingerprint(smiles, radius=2, n_bits=2048)
        pred = multilabel_head(cls_repr)
        loss = binary_cross_entropy_with_logits(pred, fingerprint)

    elif objective in ["contrastive_mtr", "contrastive_mlc"]:
        target = compute_descriptors_or_fingerprint(smiles)
        z_smiles = projection_head(cls_repr)
        z_target = target_encoder_or_projection(target)
        loss_ssl = supervised_loss_if_used(cls_repr, target)
        loss_nce = info_nce(z_smiles, z_target, negatives=in_batch_targets)
        loss = loss_ssl + loss_nce

    optimizer.step(loss)

# 下游任务
for task in moleculenet_tasks:
    model = load_pretrained_moldeberta(best_checkpoint)
    model.add_prediction_head(task.type)
    finetune(model, task.train)
    report(task.metric(model, task.test))
```

##### 动机：MLM 学语言，不一定学物性

SMILES encoder 的常见预训练目标是 MLM：遮住一部分 token，让模型根据上下文预测被遮住的字符或子词。这个目标能学习 SMILES 语法、局部官能团模式和长程括号/环闭合依赖，但它没有直接告诉模型“哪些结构会影响溶解度、脂溶性、清除率或毒性”。因此，MLM 学到的表示可能在 token 层面很强，却和下游物性空间不够对齐。

MolDeBERTa 的设计思路是保留语言模型的可扩展性，同时把可由 SMILES 确定性计算的化学知识作为自监督信号。因为 RDKit 描述符和 Morgan 指纹不需要人工实验标签，仍然可以用于大规模无标签分子预训练。这样模型既从 SMILES 序列中学习上下文，也从目标函数中学习“表示应该保留哪些化学属性”。

##### DeBERTaV2 与 byte-level BPE

MolDeBERTa 使用 DeBERTaV2 encoder，而不是早期 ChemBERTa/MolBERT 常用的 BERT/RoBERTa。DeBERTa 的关键思想是 disentangled attention：把 token 内容表示和相对位置表示分开建模，注意力分数不只依赖内容-内容匹配，也能显式处理内容-位置关系。对 SMILES 来说，这有助于区分相同原子符号在不同环、支链和上下文中的角色。

byte-level BPE 解决了纯字符级 SMILES tokenization 的两个问题。第一，字符级序列较长，括号、数字、芳香原子符号和多字符元素会被拆得很碎；第二，常见子结构片段无法作为稳定单元出现。BPE 会把高频字节片段合并成 token，使模型能更有效地表示常见化学片段，同时保留开放词表能力。

##### 五类预训练目标

MLM 目标与常规语言模型一致：

$$
\mathcal{L}_{\mathrm{MLM}}
=-\sum_{t\in\mathcal{M}}\log p_\theta(x_t\mid \mathbf{x}_{\setminus\mathcal{M}})
$$

MTR（Multi-Task Regression）让 `[CLS]` 表示预测 \(n\) 个理化描述符，论文中的核心形式为：

$$
\mathcal{L}_{\mathrm{MTR}}
=\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat y_i)^2
$$

MLC（Multi-Label Classification）把每个分子映射为 2048 维 Morgan fingerprint，半径为 2。每一位表示某类局部子结构是否存在：

$$
\mathcal{L}_{\mathrm{MLC}}
=-\frac{1}{K}\sum_{k=1}^{K}
\left[
f_k\log \sigma(\hat f_k)
+(1-f_k)\log(1-\sigma(\hat f_k))
\right]
$$

其中 \(K=2048\)，\(f_k\in\{0,1\}\)。这比 MLM 更直接地要求模型识别结构片段，尤其适合性质预测中常见的官能团和局部骨架模式。

contrastive MTR/MLC 则进一步把 SMILES encoder 的表示与描述符/指纹目标表示对齐。设 \(\mathbf{z}_i\) 是第 \(i\) 个 SMILES 的 `[CLS]` 投影，\(\mathbf{u}_i\) 是同一分子的描述符或指纹投影，InfoNCE 可写为：

$$
\mathcal{L}_{\mathrm{NCE}}
=-\log
\frac{\exp(\mathrm{sim}(\mathbf{z}_i,\mathbf{u}_i)/\tau)}
{\sum_{j=1}^{B}\exp(\mathrm{sim}(\mathbf{z}_i,\mathbf{u}_j)/\tau)}
$$

这个目标的直觉是：同一分子的“语言表示”和“化学属性表示”应该靠近，不同分子应该分开。相比单纯回归或分类，对比学习更强调表示空间的相对几何结构。

##### 数据规模、模型规模与下游迁移

MolDeBERTa 系统比较了 10M 和 123M PubChem SMILES。官方 GitHub 说明模型族包含 tiny、small、base 三种规模，以及五类预训练目标，因此组合出 30 个预训练变体。论文结论是，增大数据规模通常能提升多数下游任务，尤其在回归任务上可带来明显 RMSE 降低；但收益并不在所有任务上单调，因为部分任务在 10M 规模已能学到足够通用的上下文，额外数据可能带来冗余。

下游评估覆盖 9 个 MoleculeNet 类任务，包括分类任务 BBBP、ClinTox、HIV、Tox21、BACE classification，以及回归任务 Delaney/ESOL、Lipo、Clearance、BACE regression。官方摘要称 MolDeBERTa 在 4/9 任务达到整体最佳，并在 7/9 任务超过 SMILES-based encoder；回归任务最多约 16% error reduction，分类任务最高约 2.2 ROC-AUC points 改善。

##### 与 MolBERT/ChemBERTa 的区别

MolBERT 早期已经使用过理化性质辅助任务，ChemBERTa/ChemBERTa-2 系列则系统探索了 MLM、MTR 和数据规模。MolDeBERTa 的区别在于三点：第一，encoder 升级到 DeBERTaV2；第二，引入 byte-level BPE 而不是完全依赖字符级 token；第三，把 Morgan fingerprint 多标签预测与描述符/指纹对比学习纳入同一实验矩阵。也就是说，它不是只靠更多数据，而是同时调整 architecture、tokenizer 和 self-supervised objective。

> ⚠️ 注意：MolDeBERTa 仍然是 SMILES encoder，不直接输入 3D 坐标或分子图。它的“structure-informed”主要来自 Morgan fingerprints、描述符和对比目标，而不是像 Uni-Mol 那样显式建模三维坐标。

#### 🧪 练习题

```yaml
question: "MolDeBERTa 中 MLC 预训练目标的主要作用是什么？"
options:
  - "预测 2048 维 Morgan fingerprint，让模型显式学习分子局部子结构是否存在"
  - "把所有 SMILES 转换成 3D 坐标并最小化 RMSD"
  - "只预测被 mask 的 SMILES token，不引入任何化学先验"
  - "用自回归方式生成下一个分子"
answer: 0
explain: "MLC 使用 Morgan fingerprint 作为多标签监督信号，每一位对应局部子结构存在性，因此能把子结构归纳偏置直接注入 `[CLS]` 表示。"
```
