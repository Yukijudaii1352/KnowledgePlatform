### S²Drug: Bridging Protein Sequence and 3D Structure in Contrastive Representation Learning for Virtual Screening

```yaml
id: s2drug
name: S²Drug
full_name: 序列-结构双模态筛选 (S²Drug)
year: '2026'
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/36997
category: screening
parent: drugclip
motivation: 序列与3D结构双模态对比学习
```

#### 📝 一句话总结

S²Drug 提出两阶段对比学习框架，先用大规模蛋白序列-配体数据预训练绑定感知的序列表征，再在 PDBBind 上用 residue-level gating 融合序列与 3D 口袋结构，并通过结合位点预测辅助任务提升虚拟筛选泛化能力。

#### 🎯 核心要点

- 两阶段框架：ChemBL 上进行蛋白序列-配体对比预训练，PDBBind 上进行序列-结构融合微调。
- 蛋白侧使用 ESM2 序列编码器，配体和口袋结构侧使用 Uni-Mol 结构编码器。
- 设计 bilateral data sampling：蛋白侧做同源下采样和功能去重，配体侧做亲和力变异过滤、frequent hitter/PAINS 过滤。
- 在微调阶段引入 residue-level gating，对每个口袋残基自适应融合序列 embedding 与结构 embedding。
- 增加结合位点预测辅助任务，只用序列表示和配体 probe 注意力预测哪些残基属于 binding site，避免直接泄露结构标签。
- 总目标由融合后的口袋-配体对比损失与 binding site prediction 的 BCE 损失组成，兼顾全局检索排序和局部口袋定位。

#### 🔬 深入细节

##### 图示与来源

![S²Drug 两阶段框架图](https://arxiv.org/html/2511.07006v1/x1.png)

*图：S²Drug 的两阶段序列-结构对比学习流程。公开来源为 arXiv HTML: https://arxiv.org/html/2511.07006v1；官方 AAAI 论文页和 PDF 分别为 https://ojs.aaai.org/index.php/AAAI/article/view/36997 与 https://ojs.aaai.org/index.php/AAAI/article/view/36997/40959。*

##### 核心算法伪代码

```python
# S²Drug 两阶段训练伪代码

# Stage 1: sequence-ligand contrastive pretraining on ChemBL
D0 = load_chembl_triplets()  # (protein_sequence, ligand, affinity)
D = []
for P, L, affinity_records in D0:
    if is_functional_duplicate(P):
        continue
    if affinity_std(log_values(affinity_records)) >= delta:
        continue
    if is_frequent_hitter(L) or contains_pains_substructure(L):
        continue
    weight = homology_downweight(P) * ligand_rebalance_weight(L)
    D.append((P, L, weight))

for batch in sample_with_weights(D):
    h_p_seq = project(mean_pool(ESM2(batch.protein_sequences)))
    h_l_3d = project(mean_pool(UniMolLigand(batch.ligands_3d)))
    loss_pc = symmetric_infonce(h_p_seq, h_l_3d)
    update(ESM2, UniMolLigand, loss_pc)

# Stage 2: sequence-structure fusion finetuning on PDBBind
for batch in pdbbind_complexes:
    # residue-level sequence representation
    x_seq = ESM2(batch.full_sequences)  # [residue, d_s]

    # atom-level pocket structure representation -> residue pooling
    z_atoms = UniMolPocket(batch.pocket_3d_atoms)
    x_geo = masked_mean_pool_atoms_to_residues(z_atoms, batch.residue_atom_map)

    # residue-level gating fusion
    beta = sigmoid(MLP(concat(W_s(x_seq), W_g(x_geo))))
    x_fused = beta * W_s(x_seq) + (1 - beta) * W_g(x_geo)
    h_pocket = mean_pool(Transformer(x_fused over pocket residues))

    # ligand structural embedding
    h_ligand = mean_pool(UniMolLigand(batch.ligands_3d))

    # main contrastive retrieval objective
    loss_fc = symmetric_infonce(h_pocket, h_ligand)

    # auxiliary binding-site prediction from sequence-only residue features
    residue_prob = average_probe_attention(x_seq, probe_ligand_embeddings)
    loss_bsp = binary_cross_entropy(residue_prob, batch.binding_site_labels)

    loss = loss_fc + lambda_bsp * loss_bsp
    update(all_trainable_modules, loss)

# Inference: encode query pocket with fused sequence-structure representation,
# precompute ligand embeddings, rank by cosine similarity.
```

##### 方法机制

S²Drug 关注 DrugCLIP/DrugHash 这一类结构检索模型的一个短板：它们主要利用口袋 3D 结构，而蛋白序列信息在虚拟筛选中没有被充分监督使用。序列数据规模远大于结构复合物数据，且蛋白语言模型已经能编码进化和功能语义；但若直接把 ChemBL 等蛋白-配体数据拿来训练，又会遇到蛋白同源冗余、功能重复、亲和力测定噪声和非特异性配体等问题。S²Drug 因此把训练拆成“序列预训练”和“序列-结构融合微调”两个阶段。

第一阶段在大规模蛋白-配体亲和力三元组上训练。清洗策略从蛋白和配体两侧同时做采样控制。蛋白同源簇 \(C_m^{hom}\) 中的样本概率被下调为：

$$
\Pr(P_n)=\frac{1}{|C_m^{hom}|^\alpha},\qquad \alpha\in(0,1]
$$

功能去重进一步按 UniProt/GO 等功能注释分组：

$$
C_k^{fun}=\{P_n\mid \phi(P_n)=\phi_k\}
$$

配体侧先检查同一蛋白-配体对在不同实验中的亲和力离散度：

$$
\sigma_n=\mathrm{StdDev}(\log a_n^1,\ldots,\log a_n^J)
$$

只保留 \(\sigma_n<\delta\) 的稳定样本，并下调或移除频繁命中多个靶点的 promiscuous ligands。最终采样可写成：

$$
\mathcal{D}
=
\mathrm{Sample}_{(P,L,a)\sim\mathcal{D}_0}
\left[
\Pr(P)\cdot
\mathbb{I}_{\mathrm{clean}(P,L,a)}
\cdot
w_{\mathrm{lig}}(L)
\right]
$$

预训练目标是让蛋白序列 embedding 和配体结构 embedding 在共享空间中对齐。蛋白序列由 ESM2 编码并做 mean pooling：

$$
h_n^{p,s}=\mathrm{MeanPool}(\mathrm{Seq}^{p}(S(P_n)))
$$

配体由 Uni-Mol 结构编码器得到：

$$
h_n^{l,g}=\mathrm{MeanPool}(\mathrm{Stru}^{l}(G(L_n)))
$$

二者经 MLP 投影后使用对称 InfoNCE。相似度为：

$$
\mathrm{sim}(h_n^{p,s},h_m^{l,g})
=
\frac{\langle h_n^{p,s},h_m^{l,g}\rangle}
{\|h_n^{p,s}\|\|h_m^{l,g}\|}
$$

预训练对比损失为：

$$
\mathcal{L}_{pc}
=
-\frac{1}{N}\sum_{n=1}^{N}
\left[
\log
\frac{\exp(\mathrm{sim}(h_n^{p,s},h_n^{l,g})/\tau)}
{\sum_{m=1}^{N}\exp(\mathrm{sim}(h_n^{p,s},h_m^{l,g})/\tau)}
+
\log
\frac{\exp(\mathrm{sim}(h_n^{p,s},h_n^{l,g})/\tau)}
{\sum_{m=1}^{N}\exp(\mathrm{sim}(h_m^{p,s},h_n^{l,g})/\tau)}
\right]
$$

第二阶段转向 PDBBind 这类有高分辨率口袋结构的数据。对每个口袋残基 \(r_i\)，S²Drug 将 Uni-Mol 产生的 atom-level 结构表示聚合成 residue-level 几何表示：

$$
x^g_{n,i}
=
\frac{1}{|r_i|}
\sum_{a\in r_i}\mathbb{I}_{a\in r_i}\cdot z_a
$$

然后用 gating 机制融合序列和结构：

$$
\beta_{n,i}
=
\sigma\left(
W_\beta^\top[W_s x^s_{n,i}; W_g x^g_{n,i}]
+b_\beta
\right)
$$

$$
x^f_{n,i}
=
\beta_{n,i}\cdot W_sx^s_{n,i}
+
(1-\beta_{n,i})\cdot W_gx^g_{n,i}
$$

这个门控不是简单拼接，而是让每个残基按局部情况决定更依赖序列语义还是 3D 结构。例如保守功能残基可能由序列信息提供强先验，而口袋形状、空间邻近性和侧链构象则需要结构分支补充。

辅助任务是结合位点预测。论文强调口袋并不一定是序列上的连续片段，而是蛋白折叠后在三维空间中聚集的一组残基。S²Drug 采样 \(K\) 个 ligand probes，用共享注意力投影计算残基与配体 probe 的相关性：

$$
\alpha_{n,i}^{k}
=
\frac{\exp(W_r x^s_{n,i}\cdot W_l h_k^{l,g})}
{\sum_{i=1}^{I_n}\exp(W_r x^s_{n,i}\cdot W_l h_k^{l,g})}
$$

多个 probe 的平均值作为残基属于 binding site 的概率：

$$
\hat{y}_{n,i}
=
\frac{1}{K}\sum_{k=1}^{K}\alpha_{n,i}^{k}
$$

训练使用逐残基 BCE：

$$
\mathcal{L}_{bsp}
=
-\frac{1}{N}
\sum_{n=1}^{N}\sum_{i=1}^{I_n}
\left[
y_{n,i}\log\hat{y}_{n,i}
+
(1-y_{n,i})\log(1-\hat{y}_{n,i})
\right]
$$

主任务仍是融合口袋表示与配体表示的对比检索。微调阶段的最终目标为：

$$
\mathcal{L}_{total}
=
\mathcal{L}_{fc}
+
\lambda\mathcal{L}_{bsp}
$$

因此，S²Drug 与 DrugCLIP 的区别不只是“多加一个序列编码器”。它先用大规模序列-配体数据让序列分支学到 ligand-binding-aware 表征，再用残基层门控把序列和结构对齐到同一个口袋表示中，最后用 binding site prediction 把局部残基定位信号注入检索 embedding。这样做的实际价值是：当 3D 结构存在扰动、口袋定义不完整或新蛋白与训练复合物分布差异较大时，序列侧的进化和功能先验能提供额外约束。

#### 🧪 练习题

```yaml
question: "S²Drug 为什么要使用两阶段训练，而不是直接在 PDBBind 上训练序列-结构融合模型？"
options:
  - "因为 PDBBind 没有任何 3D 结构信息"
  - "因为大规模序列-配体数据可先注入绑定偏好，随后小规模结构复合物用于精细融合和口袋定位"
  - "因为 ESM2 只能处理分子图，不能处理蛋白序列"
  - "因为结合位点预测任务不能与对比学习同时优化"
answer: 1
explain: "第一阶段利用 ChemBL 等大规模数据学习蛋白序列与配体的绑定偏好；第二阶段再用 PDBBind 的结构信息进行 residue-level 融合，并加入结合位点预测辅助监督。"
```
