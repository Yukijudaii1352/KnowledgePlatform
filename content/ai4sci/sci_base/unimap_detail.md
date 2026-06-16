### UniMAP：统一分子预训练 (Unified Molecular Pre-training)
```yaml
id: unimap
name: UniMAP
full_name: 统一分子预训练 (Unified Molecular Pre-training)
year: '2024'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2402.13163
category: molecular
parent: —
motivation: 多模态融合SMILES序列与分子图
```

#### 📝 一句话总结
UniMAP 提出了一个单流 Transformer 分子表征学习框架，把 SMILES token 与分子图节点嵌入拼接到同一个序列中，并用分子级与片段级预训练任务同时对齐 1D SMILES 和 2D 图结构。

#### 🎯 核心要点
- 单流跨模态架构：SMILES 经 regex tokenizer 得到 token embedding，分子图经 GCN 得到原子/边相关表示，再拼接后输入共享 Transformer。
- 细粒度融合目标：不仅做分子级 SMILES-Graph Matching，还做 token/fragment 级 Multi-Level Cross-Modality Masking 与 Fragment-Level Alignment。
- 片段分解机制：把 SMILES 片段与图子结构对应起来，让模型学习“同一化学片段在两种模态中的语义一致性”。
- Domain Knowledge Learning：利用化学功能团、scaffold 等领域知识作为额外监督，补足纯自监督目标对药化语义的约束。
- 下游覆盖：在 MoleculeNet 分子性质预测、drug-target affinity 与 drug-drug interaction 等任务上评估，强调预训练表征的通用性。
- 与双流方法的区别：MOCO 等方法通常分别编码 SMILES 和 graph 后做全局对比；UniMAP 让两种模态在 Transformer 内部逐层交互。
- 来源限制：任务给出的 `paper_url` 实际指向数学逻辑论文；本文依据可追溯的 UniMAP 论文 `https://arxiv.org/abs/2310.14216` 与 HTML `https://arxiv.org/html/2310.14216v2` 撰写。

#### 🔬 深入细节
##### 图示与来源
![UniMAP 框架总览](https://arxiv.org/html/2310.14216v2/x2.png)
*图：UniMAP 论文 Figure 2，SMILES 与 Graph 被输入同一个 Transformer，并由片段级和分子级预训练任务共同监督。*

可访问来源：UniMAP 的 arXiv HTML 为 `https://arxiv.org/html/2310.14216v2`；任务中的 `https://arxiv.org/abs/2402.13163` 不是 UniMAP 论文，正文按实际论文校正。

##### 机制拆解
UniMAP 解决的是分子表征中的一个具体矛盾：SMILES 是 1D 序列，适合捕获长程上下文、手性符号与字符串模式；分子图是 2D 拓扑，适合捕获原子邻接、环与局部子结构。双流模型通常只在最终向量上做对齐，容易错过“一个片段替换导致药性反转”的细粒度关系。UniMAP 因此采用早期融合：让 SMILES token 和图节点从第一层 Transformer 起就相互注意。

设 SMILES 为 \(S=[t_1,t_2,\dots,t_n]\)，其 embedding 为 \(\mathbf{s}=[s_1,\dots,s_n]\)；分子图为 \(G=\{V,E\}\)，经 GCN 得到 \(\mathbf{g}=[g_1,\dots,g_m]\)。UniMAP 的 Transformer 输入可概括为：

$$
H_0=[s_1+p_1,\dots,s_n+p_n,g_1,\dots,g_m]
$$

其中 SMILES token 加位置编码，图节点本身不强行赋予线性顺序。经过多层 Transformer 后，SMILES token 可以 attend 到图节点，图节点也能 attend 到序列上下文，从而在单个骨干内完成融合。

Multi-Level Cross-Modality Masking (CMM) 是核心预训练目标。它包含 token-level masking 与 fragment-level masking：前者遮盖个别 SMILES token 或图原子并用另一模态上下文辅助恢复；后者遮盖对应的 SMILES/graph 片段，迫使模型学习片段级语义。片段级损失可写成：

$$
\mathcal{L}_f=-\sum_{\forall(S,G)}
\left(
\log P_\theta(\mathbf{s_m}\mid S_{\backslash\mathbf{m}},G)
+\log P_\theta(\mathbf{g_m}\mid S,G_{\backslash\mathbf{m}})
\right)
$$

整体 CMM 损失为：

$$
\mathcal{L}_{CMM}=\mathcal{L}_t+\mathcal{L}_f
$$

SMILES-Graph Matching (SGM) 是分子级二分类任务：给定一对 SMILES 和 graph，判断它们是否来自同一个分子。它可以用二元交叉熵表示：

$$
\mathcal{L}_{SGM}
=-\left[y\log q_\theta(S,G)+(1-y)\log(1-q_\theta(S,G))\right]
$$

Fragment-Level Alignment (FLA) 进一步把对应片段拉近、非对应片段推远。可用对比学习形式理解：

$$
\mathcal{L}_{FLA}
=-\sum_i \log
\frac{\exp(\mathrm{sim}(f_i^S,f_i^G)/\tau)}
{\sum_j \exp(\mathrm{sim}(f_i^S,f_j^G)/\tau)}
$$

Domain Knowledge Learning (DKL) 则把功能团、分子 scaffold 等药化先验变成多标签监督，让模型不只恢复表面 token，还学习与性质相关的化学类别。最终预训练目标可以概括为：

$$
\mathcal{L}
=\mathcal{L}_{CMM}
+\mathcal{L}_{SGM}
+\mathcal{L}_{FLA}
+\mathcal{L}_{DKL}
$$

##### 训练伪代码
```python
# UniMAP pretraining: single-stream SMILES-graph fusion
for molecule in pretrain_loader:
    smiles = regex_tokenize(molecule.smiles)
    graph = build_molecular_graph(molecule)

    s_emb = smiles_embedding(smiles) + position_embedding(smiles)
    g_emb = gcn_encoder(graph)  # atom/node embeddings
    h = transformer(concat([s_emb, g_emb]))

    # molecular-level alignment
    pos_pair = (molecule.smiles, molecule.graph)
    neg_pair = sample_mismatched_pair()
    loss_sgm = binary_cross_entropy(match_head(h), labels=[1, 0])

    # token/fragment reconstruction
    masked_tokens = mask_smiles_tokens_and_graph_atoms(molecule)
    masked_frags = mask_corresponding_smiles_graph_fragments(molecule)
    loss_cmm = reconstruct(masked_tokens, h) + reconstruct(masked_frags, h)

    # fragment-level and domain-knowledge supervision
    loss_fla = contrastive_align(fragment_repr_smiles(h), fragment_repr_graph(h))
    loss_dkl = multi_label_bce(domain_head(h), functional_group_labels(molecule))

    loss = loss_cmm + loss_sgm + loss_fla + loss_dkl
    loss.backward()
    optimizer.step()
```

推理或下游微调时，UniMAP 仍同时接收 SMILES 与 graph；模型输出的 `[CLS]`/pooling 表示可接分类或回归头，用于 MoleculeNet 性质预测、DTA 或 DDI。相比只用 SMILES 或只用图，单流结构的优势在于同一层注意力可以发现跨模态互补：例如 SMILES 显式保存手性和 disconnected ionic moieties 的字符串关系，而图更直接表达环、邻接和药效片段。

> 💡 关键：UniMAP 的“统一”不是把 SMILES 转成图或把图转成 SMILES，而是让两种表示作为异构 token 同时进入 Transformer，并用片段级任务约束它们在局部化学语义上对齐。

#### 🧪 练习题
```yaml
question: "UniMAP 相比仅做 SMILES-Graph 全局对比的双流方法，最核心的改进是什么？"
options:
  - "把 SMILES 和 graph 拼接进同一个 Transformer，并加入片段级遮盖与对齐目标"
  - "只保留 SMILES 字符串，完全删除分子图"
  - "用 3D 构象监督替代所有 1D/2D 信息"
  - "只在下游有标签数据上从零训练分类器"
answer: 0
explain: "UniMAP 的关键是单流早期融合和片段级预训练，使模型能捕获 SMILES token 与图子结构之间的细粒度对应关系。"
```
