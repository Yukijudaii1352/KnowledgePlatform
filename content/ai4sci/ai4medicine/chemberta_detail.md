### ChemBERTa — 化学BERT (ChemBERTa)

```yaml
id: chemberta
name: ChemBERTa
full_name: 化学BERT (ChemBERTa)
year: '2021'
org: DeepChem
paper_url: https://arxiv.org/abs/2010.09885
category: foundation
parent: molbert
motivation: BERT架构分子性质预测基础模型
```

#### 📝 一句话总结

ChemBERTa 基于 RoBERTa/HuggingFace 在大规模 PubChem SMILES 上进行 masked language modeling 预训练，并系统评估预训练数据规模、tokenizer、SMILES/SELFIES 表示和注意力可视化对分子性质预测的影响。

#### 🎯 核心要点

- RoBERTa 分子编码器：使用 HuggingFace RoBERTa 实现，6 层、12 个注意力头，共 72 个 attention mechanisms
- 大规模无标注语料：整理 7700 万条 PubChem unique SMILES，并以 100K、250K、1M、10M 子集研究数据规模效应
- MLM 预训练目标：随机掩码 15% token，用上下文恢复被掩码 token，学习化学字符串的上下文表示
- 下游任务：在 MoleculeNet 的 BBBP、ClinTox、HIV、Tox21 等分类任务上微调，采用 scaffold split 和 ROC-AUC/PRC-AUC 指标
- Tokenizer 对比：默认使用 HuggingFace BPE，也比较 DeepChem 的 regex-based SmilesTokenizer
- 表示对比：比较 SMILES 与 SELFIES，论文在 Tox21 SR-p53 上未观察到显著差异
- 可解释性探索：使用 BertViz 分析注意力，发现部分 head 会关注官能团、芳香环、括号闭合等化学/语法结构
- 实验结论克制：ChemBERTa 在部分任务接近但未全面超过 D-MPNN/RF/SVM 基线，主要贡献是证明 Transformer 预训练可扩展且具有研究价值

#### 🔬 深入细节

##### 图示与来源

![ChemBERTa 预训练规模效果](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/scaling_2.png)
*图：论文 Figure 1 显示从 100K 扩展到 10M PubChem SMILES 预训练数据时，BBBP、ClinTox 和 Tox21 的下游 AUC 改善趋势。*

![ChemBERTa 注意力可视化](https://ar5iv.labs.arxiv.org/html/2010.09885/assets/img/ketone_head_crop.png)
*图：论文 Figure 2 的 ChemBERTa SMILES attention 示例，展示模型可在 token 层面关注羰基、括号等结构线索。*

##### 算法核心流程

```python
# ChemBERTa 预训练和微调伪代码
pubchem = load_unique_pubchem_smiles(total=77_000_000)
subsets = [100_000, 250_000, 1_000_000, 10_000_000]

for n in subsets:
    train_smiles = sample_and_shuffle(pubchem, n)
    tokenizer = train_or_load_tokenizer(type="BPE or SmilesTokenizer", vocab_size=52_000)
    model = RoBERTaEncoder(num_layers=6, num_attention_heads=12, max_length=512)

    for epoch in range(num_epochs(n)):
        for smiles in batch(train_smiles):
            tokens = tokenizer(smiles, max_length=512)
            masked_tokens, labels = mask_15_percent(tokens)
            logits = model(masked_tokens)
            loss = cross_entropy(logits[mask_positions], labels[mask_positions])
            loss.backward()
            optimizer.step()

    for task in ["BBBP", "ClinTox", "HIV", "Tox21"]:
        train, valid, test = scaffold_split(load_moleculenet(task), ratios=(0.8, 0.1, 0.1))
        classifier = LinearHead(model.hidden_size, task.num_labels)
        finetune(model, classifier, train, valid, early_stop_metric="ROC-AUC", max_epochs=25)
        report_auc(model, classifier, test)
```

##### 关键损失函数

ChemBERTa 将分子表示为 token 序列 \(x=(s_1,\ldots,s_n)\)。MLM 随机选择约 15% 的位置 \(M\)，让 RoBERTa encoder 根据双向上下文恢复原 token：

$$
\mathcal{L}_{\text{MLM}}(\theta)
= -\sum_{x\in\mathcal{D}}\sum_{i\in M(x)}
\log p_\theta(s_i \mid x_{\setminus M})
$$

下游分类任务在 `[CLS]` 或 pooled representation \(h_x\) 上接线性分类器：

$$
\hat{y}=\sigma(W h_x+b)
$$

二分类端点使用交叉熵微调：

$$
\mathcal{L}_{\text{task}}
= -y\log\hat{y}-(1-y)\log(1-\hat{y})
$$

##### 方法机制

ChemBERTa 的核心问题是：在分子性质预测中，能否像 NLP 一样先用海量无标注文本预训练 Transformer，再用少量标注数据微调？分子领域的标注实验昂贵，但 SMILES 字符串很容易从 PubChem 这类数据库中获得，因此 MLM 预训练是利用无标注化学结构的一条低门槛路径。

与 MolBERT 更强调化学辅助任务不同，ChemBERTa 首版主要采用 RoBERTa 式 MLM，并把重点放在规模和工具链上。模型使用 6 层、12 头的 encoder，预训练输入最大长度 512，默认 BPE tokenizer 的最大词表为 52K。论文发布多个预训练模型到 HuggingFace model hub，也提供 DeepChem 教程，让研究者可以直接加载模型、做 masked prediction、可视化 attention 和微调 Tox21。

预训练规模实验是 ChemBERTa 的关键证据。论文将 PubChem SMILES 划分成 100K、250K、1M、10M 子集，观察到更大预训练集通常带来更好的下游平均 AUC。10M 子集训练约 3 epochs，以避免过拟合；论文同时声明 77M 全量数据集公开，但首版实验没有完整训练全部 77M。

Tokenizer 和分子字符串表示也是论文关心的问题。BPE 能把常见字符片段合并成子词，适合复用 NLP 基础设施；SmilesTokenizer 则用化学正则规则保留更明确的 SMILES token。论文在 PubChem-1M/Tox21 SR-p53 对比中发现 SmilesTokenizer 略优，但证据不足以得出普遍结论。SELFIES 理论上能保证生成有效分子，但在该属性预测实验里相对 SMILES 没有显著优势。

ChemBERTa 的可解释性分析表明，某些注意力头会聚焦羰基、芳香环、括号闭合等结构线索。这不能证明模型已经拥有完整化学理解，但说明 SMILES 上的 Transformer attention 可以捕捉部分化学相关模式。对属性预测而言，这类 token-level 可视化比传统指纹更容易调试。

局限也很明确：论文表 1 中，ChemBERTa 10M 在 BBBP、ClinTox、HIV 上未全面超过 D-MPNN、RF、SVM 等强基线，只在 Tox21 的 ROC-AUC 上有竞争力。首版 ChemBERTa 更像一个可扩展分子 Transformer baseline，而不是最终性能最强的药物发现模型；其后 ChemBERTa-2 才进一步引入多任务回归等更化学化的预训练目标。

> 💡 关键：ChemBERTa 的价值在于把分子性质预测接入成熟 Transformer 预训练范式，并给出数据规模、tokenizer、表示和可解释性的一套系统基线。

#### 🧪 练习题

```yaml
question: "ChemBERTa 首版论文中，扩大 PubChem 预训练数据规模的主要观察是什么？"
options:
  - "数据越多，模型参数必须同步减少"
  - "从 100K 扩展到 10M SMILES 通常改善 BBBP、ClinTox 和 Tox21 的下游 AUC"
  - "SELFIES 在所有 MoleculeNet 任务上显著优于 SMILES"
  - "无需微调即可直接超过所有 D-MPNN、RF 和 SVM 基线"
answer: 1
explain: "论文 Figure 1 展示更大 PubChem 预训练子集带来更好的平均下游 AUC，但首版 ChemBERTa 并未全面超过所有传统和图神经网络基线。"
```
