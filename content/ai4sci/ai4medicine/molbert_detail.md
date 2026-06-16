### MolBERT — 分子BERT (MolBERT)

```yaml
id: molbert
name: MolBERT
full_name: 分子BERT (MolBERT)
year: '2020'
org: BenevolentAI
paper_url: https://arxiv.org/abs/2011.13230
category: foundation
parent: —
motivation: MLM结合多任务回归预训练
```

#### 📝 一句话总结

MolBERT 把 BERT encoder 用于 SMILES 分子序列，并系统比较 MaskedLM、SMILES 等价判别和 RDKit 理化描述符回归三类预训练任务，证明化学相关辅助任务能显著改善虚拟筛选和 QSAR 表征。

#### 🎯 核心要点

- BERT-Base 分子编码器：12 层、12 个注意力头、768 hidden size，约 8500 万参数，用 SMILES 字符序列学习分子 embedding
- 三类预训练任务：MaskedLM 预测被掩码 token，SMILES-Eq 判断两条 SMILES 是否表示同一分子，PhysChemPred 回归 200 个归一化 RDKit 描述符
- 多任务损失简单：最终损失是启用任务损失的算术平均，便于做任务组合消融
- SMILES permutation：训练时可使用随机非规范 SMILES，降低模型对 canonicalization 人工规则的过拟合
- 相对位置编码：固定训练序列长度为 128，但用 relative positional embeddings 支持推理时处理更长 SMILES
- 预训练数据：使用 GuacaMol benchmark 中约 160 万个 ChEMBL 分子，最终模型训练 100 epochs
- 下游评估：覆盖 RDKit 虚拟筛选 benchmark 的 69 个蛋白靶点，以及 MoleculeNet/ChemBench 中 ESOL、FreeSolv、Lipophilicity、BACE、BBBP、HIV 等 QSAR 任务
- 关键结论：PhysChemPred 是最有效的辅助任务，MaskedLM + PhysChemPred 最优；加入 SMILES-Eq 在论文实验中反而略微降低性能

#### 🔬 深入细节

##### 图示与来源

![MolBERT 预训练任务示意图](https://ar5iv.labs.arxiv.org/html/2011.13230/assets/figs/molbert_schematic-crop-smaller.png)
*图：MolBERT 的论文 Figure 1，展示从 SMILES 输入到 BERT embedding，并接入 MaskedLM、SMILES-Eq 与 PhysChemPred 三个预训练头。论文 PDF 也可从 `https://ml4molecules.github.io/papers2020/ML4Molecules_2020_paper_74.pdf` 访问。*

##### 算法核心流程

```python
# MolBERT 预训练与下游使用伪代码
tokenizer = SmilesTokenizer(vocab_size=42, max_length=128)
encoder = BertBaseEncoder(layers=12, heads=12, hidden_size=768, relative_positions=True)

for smiles in guacamol_chEMBL_loader:
    s1 = randomize_smiles(smiles) if use_permutation else canonical_smiles(smiles)
    tokens = tokenizer(s1)
    masked_tokens, mask_labels = mask_15_percent(tokens)

    h_seq, h_cls = encoder(masked_tokens)
    losses = []

    if use_masked_lm:
        logits = masked_lm_head(h_seq)
        losses.append(cross_entropy(logits[mask_positions], mask_labels))

    if use_smiles_eq:
        s2, same_label = sample_equivalent_or_random_smiles(smiles)
        pair_repr = encode_pair(encoder, tokenizer(s1), tokenizer(s2))
        losses.append(cross_entropy(smiles_eq_head(pair_repr), same_label))

    if use_physchem_pred:
        descriptors = normalized_rdkit_descriptors(smiles, dim=200)
        pred = physchem_head(h_cls)
        losses.append(mean_squared_error(pred, descriptors))

    loss = mean(losses)
    loss.backward()
    optimizer.step()

# 下游：用 pooled embedding 做相似性检索、SVM，或接线性任务头微调
embedding = encoder(tokenizer(query_smiles)).pooled_output
```

##### 关键损失函数

MaskedLM 沿用 BERT 的 token 恢复目标。给定被掩码位置集合 \(M\)，模型根据双向上下文预测真实 token：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in M}\log p_\theta(s_i\mid s_{\setminus M})
$$

SMILES-Eq 把两条 SMILES 拼成 pair 输入，预测它们是否表示同一分子：

$$
\mathcal{L}_{\text{Eq}}
= -y\log \hat{y}-(1-y)\log(1-\hat{y})
$$

PhysChemPred 是最具化学归纳偏置的任务。RDKit 为每个分子计算 \(D=200\) 个描述符，模型用 pooled representation 回归归一化后的描述符向量：

$$
\mathcal{L}_{\text{PhysChem}}
= \frac{1}{D}\sum_{d=1}^{D}(\hat{z}_d-z_d)^2
$$

多任务训练时，MolBERT 不引入复杂权重，而是取启用任务集合 \(\mathcal{T}\) 的平均：

$$
\mathcal{L}_{\text{total}}
= \frac{1}{|\mathcal{T}|}\sum_{t\in\mathcal{T}}\mathcal{L}_t
$$

##### 方法机制

MolBERT 的出发点是：SMILES 是线性字符串，但同一分子可以有多种合法 SMILES，这会让标准语言模型同时学习化学规律和遍历规则。BERT 的双向上下文适合属性预测，因为分子表征不需要像生成模型那样只能看左侧前缀；每个 token 都可以同时感知左右邻域，最后用 pooled output 或 token-level output 形成分子 embedding。

MaskedLM 让模型学习 SMILES 语法和局部上下文，例如括号、环闭合、芳香原子和键符号之间的依赖。但论文发现，单靠 MLM 不一定足够化学相关，因为它可能更关注字符串恢复而不是理化性质。PhysChemPred 直接要求 embedding 含有分子量、拓扑极性表面积、氢键供受体、logP 等 RDKit 描述符信息，因此更贴近虚拟筛选和 QSAR 的需求。

SMILES-Eq 的设计动机是处理表示歧义：若两条不同 SMILES 对应同一个分子，模型应学到它们 embedding 的等价性。实验结果却显示，加入 SMILES-Eq 会略微但稳定地降低虚拟筛选表现。这说明“看起来合理”的辅助任务并不一定改善下游指标；pair 分类可能让模型过度关注随机化 SMILES 的表面差异，或与 PhysChem/MLM 目标产生梯度冲突。

论文消融表明，PhysChemPred 单独带来的平均 BEDROC20 高于 MLM 单独；MaskedLM + PhysChemPred 是最佳组合之一，最终 100 epoch 的 MolBERT 在 RDKit 虚拟筛选 benchmark 上达到 AUROC 0.743、BEDROC20 0.344，超过 CDDD、RDKit descriptors 和 ECFC4。QSAR 中，接线性任务头微调的 MolBERT 在六个 MoleculeNet/ChemBench 数据集上均达到该表中的最佳表现。

与手工指纹相比，MolBERT 的优势是可从上下文中学习连续表征，并能通过下游微调适配任务；与图神经网络相比，它避免了显式图消息传递，直接利用成熟 NLP Transformer 工具链。不过它仍依赖 SMILES 文本表示，不直接建模 3D 构象和反应条件，因此更适合作为快速分子表征基础模型，而不是完整药物设计系统。

> 💡 关键：MolBERT 的核心贡献不是“把 BERT 套到 SMILES”本身，而是证明预训练任务选择会强烈影响分子 embedding 质量，尤其是化学描述符回归比纯文本 MLM 更能服务虚拟筛选。

#### 🧪 练习题

```yaml
question: "MolBERT 论文中最能提升虚拟筛选表现的辅助预训练信号是什么？"
options:
  - "只使用 MaskedLM 恢复被掩码 SMILES token"
  - "使用 PhysChemPred 回归 RDKit 计算的理化描述符，并与 MaskedLM 组合"
  - "把 BERT encoder 改成自回归 decoder"
  - "在推理时枚举所有可能 SMILES 并投票"
answer: 1
explain: "消融实验显示 PhysChemPred 对 BEDROC20 等虚拟筛选指标贡献最大，MaskedLM + PhysChemPred 是表现最好的组合之一；SMILES-Eq 在该实验中反而略降性能。"
```
