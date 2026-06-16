### ChemBERTa

```yaml
id: chemberta
name: ChemBERTa
full_name: ChemBERTa (ChemBERTa)
year: '2020'
org: DeepChem
paper_url: https://arxiv.org/abs/2010.09885
category: molecular
parent: —
motivation: BERT架构化学分子SMILES预训练
```

#### 📝 一句话总结

ChemBERTa 将 RoBERTa/BERT 式自监督预训练迁移到分子 SMILES 序列上，通过大规模 PubChem 分子字符串的 masked language modeling 学习可迁移的分子表示，用于 MoleculeNet 属性预测。

#### 🎯 核心要点

- **分子 Transformer 预训练**：把 SMILES/SELFIES 当作化学语言序列，使用 RoBERTa 架构学习上下文相关分子 token 表示
- **MLM 自监督目标**：随机 mask 15% token，让模型根据上下文恢复被遮蔽 token，形成化学空间中的表示拓扑
- **PubChem 77M 数据集**：论文整理 7700 万 unique SMILES，并在 100K、250K、1M、10M 子集上研究预训练规模效应
- **RoBERTa 实现细节**：基于 HuggingFace RoBERTa，使用 6 层、12 个 attention heads，总计 72 个注意力机制
- **Tokenization 对比**：比较 BPE 与基于化学正则的 SmilesTokenizer，后者在 Tox21 SR-p53 上略优
- **SMILES vs SELFIES**：探索更鲁棒的 SELFIES 表示，但论文中的 Tox21 结果未显示显著差异
- **MoleculeNet 微调**：在 BBBP、ClinTox、HIV、Tox21 等任务上加线性分类头并用 scaffold split 评估
- **可解释性探索**：使用 BertViz 检查注意力头，观察到部分神经元/头关注功能团、芳香环和括号闭合等 SMILES 语法结构

#### 🔬 深入细节

##### 模型与可视化来源

![ChemBERTa 分子 Transformer 示意图](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/bert_chemistry.png)
*图：ChemBERTa 论文源包中的分子 Transformer 示意图，展示 BERT/RoBERTa 风格模型用于化学字符串。*

![ChemBERTa 预训练规模曲线](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/scaling_2.png)
*图：预训练数据从 100K 扩展到 10M PubChem SMILES 后，下游 AUC 整体提升。*

ChemBERTa 的出发点很直接：GNN 和化学指纹是分子属性预测的主流，但 NLP 中 Transformer 预训练已经证明，大规模无标签序列可以产生强迁移表示。SMILES 本质上是带语法约束的分子字符串，因此可以把分子建模为语言建模问题，再把预训练模型微调到属性预测任务。

与图神经网络不同，ChemBERTa 不显式构建原子-键图，也不直接使用 3D 构象。它依赖 SMILES 序列中的 token 顺序、分支括号、环编号、原子符号和化学键符号来学习分子结构线索。这使它可以复用 HuggingFace 的高吞吐训练和可视化生态，但也意味着它的结构归纳偏置弱于 3D GNN。

##### RoBERTa 式 MLM 预训练

ChemBERTa 使用 RoBERTa 实现。给定 SMILES token 序列：

$$
\mathbf{x} = (x_1, x_2, \ldots, x_L)
$$

随机选择约 15% 的 token 作为 mask 集合 \(M\)，模型根据未遮蔽上下文预测原 token。损失函数是 masked token 上的交叉熵：

$$
\mathcal{L}_{\text{MLM}}
=
-
\sum_{i \in M}
\log p_\theta(x_i \mid \mathbf{x}_{\setminus M})
$$

对 SMILES 来说，这个任务会迫使模型学习诸如原子价态、环闭合、支链括号、芳香性符号和常见功能团上下文等统计规律。论文使用最大词表 52K、最大序列长度 512，并在 PubChem 子集上预训练。

```python
# ChemBERTa 预训练伪代码
for smiles in pubchem_loader:
    tokens = tokenizer(smiles, max_length=512)
    masked_tokens, labels = random_mask(tokens, mask_ratio=0.15)

    hidden = roberta_encoder(masked_tokens)
    logits = lm_head(hidden)

    loss = cross_entropy(logits[labels != IGNORE], labels[labels != IGNORE])
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 数据规模与 tokenization

论文整理了 7700 万 unique PubChem SMILES，并构造 100K、250K、1M、10M 子集。最大 10M 子集的预训练约使用单张 NVIDIA V100 训练 48 小时。实验观察到，从 100K 扩展到 10M 时，BBBP、ClinTox、Tox21 等任务的平均 ROC-AUC 和 PRC-AUC 均提升，说明 Transformer 在分子字符串上也具有类似 NLP 的规模收益。

Tokenization 是 ChemBERTa 的关键变量。默认 BPE 会从字符对频率中学习子词单元，优点是通用、可扩展，缺点是可能把化学语义单元切得不自然。SmilesTokenizer 使用化学正则规则，更倾向于保留 `Cl`、`Br`、环编号、括号、键符号等有意义 token。论文在 PubChem-1M 上训练两个相同模型，发现 SmilesTokenizer 在 Tox21 SR-p53 的 PRC-AUC 上小幅领先：

$$
\Delta \text{PRC-AUC} \approx +0.015
$$

这不是决定性结论，但提示化学感知 tokenization 对分子语言模型很重要。

##### 微调到 MoleculeNet

预训练完成后，ChemBERTa 在下游任务上接线性分类头。给定 `[CLS]` 或池化后的序列表示 \(\mathbf{h}\)，二分类属性预测为：

$$
\hat{y} = \sigma(\mathbf{w}^{\top}\mathbf{h}+b)
$$

训练损失为二元交叉熵：

$$
\mathcal{L}_{\text{clf}}
=
-
y\log \hat{y}
-
(1-y)\log(1-\hat{y})
$$

论文选取 BBBP、ClinTox、HIV、Tox21 等 MoleculeNet 任务，使用 DeepChem 的 scaffold splitter 做 80/10/10 训练、验证、测试划分。scaffold split 比随机划分更接近真实药物发现场景，因为测试集包含训练集中未见过的分子骨架。

```python
# ChemBERTa 微调伪代码
encoder = load_pretrained_chemberta()
classifier = Linear(hidden_dim, num_labels)

for smiles, y in moleculenet_loader:
    tokens = tokenizer(smiles)
    h = encoder(tokens).pooled_output
    y_hat = classifier(h)
    loss = task_loss(y_hat, y)
    update(encoder, classifier, loss)
```

##### 注意力可解释性

![ChemBERTa SMILES attention 示例](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/ketone_head_crop.png)
*图：ChemBERTa 使用 BertViz 观察 SMILES token 间注意力，论文报告部分头会关注功能团和括号/分支结构。*

ChemBERTa 的一个优点是可以直接使用 NLP 工具分析注意力。论文用 BertViz 检查 Tox21 分子时，观察到部分注意力头与化学功能团、芳香环相关，另一些神经元追踪括号闭合等 SMILES 语法。这并不能证明模型学到了完整化学机制，但提供了一个可调试入口：当模型预测某个毒性标签时，可以观察哪些 token 对最终表示贡献较大。

##### 与 GNN/指纹方法的差异与限制

ChemBERTa 的优势在于简单、可扩展、可迁移：只需大量无标签 SMILES，就能利用成熟 Transformer 工具链训练分子表征。相比 Morgan fingerprint，它不依赖固定半径哈希特征；相比监督 GNN，它可以先从大规模无标签分子中获得先验。

限制也很明确。SMILES 是一种线性化表示，同一分子可有多种 SMILES；序列模型需要自己从字符串中恢复图结构与化学约束。论文尝试 SELFIES 是为了解决合法性与鲁棒性问题，但早期结果未显示明显优势。另外，ChemBERTa 没有显式 3D 构象、键角、距离或量子化学信息，因此在强依赖几何结构的任务上通常不如专门的 3D GNN 或等变模型。

#### 🧪 练习题

```yaml
question: "ChemBERTa 的 MLM 预训练目标在分子建模中的主要作用是什么？"
options:
  - "直接预测分子的 3D 原子坐标"
  - "根据 SMILES 上下文恢复被遮蔽 token，从无标签分子中学习可迁移表示"
  - "把所有 SMILES 转换成固定 Morgan fingerprint"
  - "只训练最后的分类头，不更新 Transformer 参数"
answer: 1
explain: "ChemBERTa 随机 mask 约 15% 的 SMILES token，并用上下文预测原 token；这种自监督任务让模型学习化学字符串的语法和结构统计规律。"
```
