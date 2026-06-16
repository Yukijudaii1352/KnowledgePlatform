### CADG-DTA — 交叉注意力图神经网络药物-靶标亲和力预测

```yaml
id: cadg_dta
name: CADG-DTA
full_name: 交叉注意力等变图网络 (CADG-DTA)
year: '2026.01'
org: Springer
paper_url: https://link.springer.com/article/10.1007/s10044-026-01638-7
category: screening
parent: graphdta
motivation: 交叉注意力融合等变图网络
```

#### 📝 一句话总结

CADG-DTA 将药物 SMILES 构造成原子级分子图、将蛋白 FASTA 构造成残基级接触图，再用双路 GNN 编码和 drug-target cross-attention 融合子结构交互，解决早期 DTA 模型只用序列或简单拼接特征而丢失拓扑交互信息的问题。

#### 🎯 核心要点

- **双图输入**：药物由 RDKit 从 SMILES 生成 atom-level graph，蛋白由 FASTA 经 PConsC4 contact map 生成 residue-level graph
- **双路图编码器**：药物图与蛋白图分别经过 GNN、graph pooling、MLP、BatchNorm 得到结构表征
- **GNN 组合消融**：公开图 3 对比 GAT_GAT、GAT_GIN、GIN_GAT、GIN_GIN，并用 MSE、CI、\(r_m^2\) 评估编码器选择
- **交叉注意力融合**：用 drug representation 和 protein representation 构造 \(Q,K,V\)，显式学习药物子结构与靶标残基子结构之间的匹配权重
- **DTA 回归任务**：输出连续 binding affinity，而不是 DTI 的二分类相互作用标签
- **标准基准**：在 Davis 和 KIBA 两个 DTA 数据集上评估，并与 DeepDTA、GraphDTA 一类序列/图模型对比
- **解释性来源**：cross-attention 权重可定位对预测贡献较大的药物原子团和蛋白残基区域
- **来源限制**：Springer 页面目前只公开摘要、图示、数据/代码链接；任务 full_name 中的“等变”未在可访问摘要和图注中体现为严格的 SE(3)/E(n) 等变网络

#### 🔬 深入细节

##### 论文与图示来源说明

任务给定论文为 Springer Pattern Analysis and Applications 文章，DOI `10.1007/s10044-026-01638-7`。截至本次读取，Springer 正文为订阅预览，公开可访问内容包括摘要、Fig. 1 至 Fig. 4、数据来源和代码链接；ResearchGate 预览也提供了 Fig. 1 图注。论文页面列出的代码仓库 `https://github.com/mtnrzna/CADG-DTA` 当前不可访问，因此下面的方法解读基于 Springer 摘要、公开图示和图注，并把推断性部分明确限定在架构层面。

![CADG-DTA 总体架构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs10044-026-01638-7/MediaObjects/10044_2026_1638_Fig1_HTML.png)
*图：CADG-DTA 的公开 Fig. 1。上半部分展示从 SMILES/FASTA 到双图构造、双路编码、cross-attention 融合和 MLP 预测；下半部分展示药物图、蛋白接触图、编码器结构和 cross-attention 模块。*

##### 算法伪代码

```python
# CADG-DTA 简化训练流程
for smiles, fasta, affinity in dta_dataset:
    # 1. 构图
    drug_graph = rdkit_atom_graph(smiles)
    contact_map = pconsc4_contact_prediction(fasta)
    protein_graph = residue_graph(fasta, contact_map, threshold=0.5)

    # 2. 双路图编码
    H_d = drug_gnn(drug_graph.x, drug_graph.edge_index, drug_graph.edge_attr)
    H_p = protein_gnn(protein_graph.x, protein_graph.edge_index, protein_graph.edge_attr)
    z_d = batch_norm(mlp(graph_pool(H_d)))
    z_p = batch_norm(mlp(graph_pool(H_p)))

    # 3. 药物-蛋白交叉注意力
    Q = linear_q(H_d)          # drug substructures as queries
    K = linear_k(H_p)          # protein residues/substructures as keys
    V = linear_v(H_p)          # protein values
    A = softmax(Q @ K.T / sqrt(hidden_dim), dim=-1)
    H_dp = A @ V               # drug-conditioned protein context

    # 4. 融合和亲和力回归
    fused = concat(graph_pool(H_dp), z_d, z_p)
    y_hat = mlp_decoder(fused)
    loss = mse(y_hat, affinity)
    loss.backward()
    optimizer.step()
```

##### 为什么从 GraphDTA 发展到双图交叉注意力

GraphDTA 的核心改进是把小分子从字符序列转为分子图，用图卷积捕捉原子邻接和局部官能团结构。但许多 DTA 模型仍把蛋白作为一维序列，或在编码后把 drug vector 与 target vector 直接拼接。这种做法能学习“这个分子”和“这个蛋白”的总体兼容性，却很难显式表达“哪个药物片段可能和哪个残基区域相关”。

CADG-DTA 的设计把药物和蛋白都放到图空间中：药物图的节点是原子，蛋白图的节点是氨基酸残基，蛋白边来自 contact map。这样，模型输入不只是序列顺序，还包含化学键拓扑和残基空间邻近关系。对 DTA 来说，这一点很关键，因为结合亲和力通常由局部药效团、口袋残基、疏水/电荷互补和空间邻接共同决定。

##### 双路 GNN 编码机制

对药物图 \(G_D=(V_D,E_D)\) 和蛋白图 \(G_P=(V_P,E_P)\)，GNN 层可以抽象为：

$$
h_v^{(\ell+1)}
= \phi\left(
h_v^{(\ell)},
\operatorname{AGG}_{u\in\mathcal{N}(v)}
\psi(h_v^{(\ell)},h_u^{(\ell)},e_{uv})
\right)
$$

其中 \(h_v^{(\ell)}\) 是第 \(\ell\) 层节点表示，\(e_{uv}\) 是键或接触边特征，\(\operatorname{AGG}\) 可以是加和、均值或注意力加权。若编码器采用 GAT，邻居消息会带有注意力权重；若采用 GIN，模型更强调图同构判别能力。公开 Fig. 3 显示作者比较了 GAT/GAT、GAT/GIN、GIN/GAT、GIN/GIN 四种药物-蛋白编码器组合，说明 CADG-DTA 的性能并不只依赖 cross-attention，前端图编码器的归纳偏置同样影响 MSE、CI 和 \(r_m^2\)。

图编码完成后，节点级表示通过 pooling 压缩为图级表示：

$$
z_D = \operatorname{Pool}(\{h_i^D\}_{i\in V_D}), \qquad
z_P = \operatorname{Pool}(\{h_j^P\}_{j\in V_P})
$$

随后经过 MLP 和 BatchNorm。这个步骤的作用是把不同大小的分子图和蛋白图映射到统一维度，同时保留可用于下游交互建模的全局结构信息。

##### Cross-attention 融合：从“拼接两个向量”到“对齐两个子结构集合”

CADG-DTA 的核心不是简单计算 \(z=[z_D;z_P]\)，而是让药物节点/子结构对蛋白残基/子结构做交叉注意力。一个标准形式为：

$$
Q = H_D W_Q,\qquad K = H_P W_K,\qquad V = H_P W_V
$$

$$
A_{ij}
= \frac{\exp(q_i^\top k_j/\sqrt{d})}
{\sum_{j'}\exp(q_i^\top k_{j'}/\sqrt{d})},
\qquad
c_i=\sum_j A_{ij}v_j
$$

这里 \(A_{ij}\) 表示药物第 \(i\) 个原子环境对蛋白第 \(j\) 个残基环境的注意力强度。直觉上，模型不再只问“这个药物和这个蛋白是否匹配”，而是学习“这个药效团应该关注哪些残基区域”。这也解释了论文摘要中强调的 interpretability：注意力矩阵可以作为候选相互作用区域的软证据，虽然它不等价于真实物理接触。

##### 亲和力预测与损失函数

DTA 是连续值回归。Davis 常用 \(pK_d\) 变换后的亲和力，KIBA 使用综合 KIBA score。训练目标通常是均方误差：

$$
\mathcal{L}_{\mathrm{MSE}}
= \frac{1}{N}\sum_{n=1}^{N}
\left(\hat{y}_n-y_n\right)^2
$$

评估时还会使用 concordance index (CI) 衡量排序一致性：

$$
\mathrm{CI}
= \frac{1}{Z}\sum_{y_i>y_j}
\left[
\mathbb{I}(\hat{y}_i>\hat{y}_j)
+ \frac{1}{2}\mathbb{I}(\hat{y}_i=\hat{y}_j)
\right]
$$

其中 \(Z\) 是可比较样本对数量。MSE 更关注数值误差，CI 更关注药物筛选排序是否正确；因此一个 DTA 模型需要同时在回归精度和排序能力上表现稳定。

##### 蛋白图构造的意义和风险

CADG-DTA 用 PConsC4 从 FASTA 序列和序列比对结果预测 contact map，再按阈值过滤边。这个设计的优势是即使没有实验蛋白结构，也能构建残基级拓扑图；相比一维 CNN/RNN，模型可以把远距离但空间接近的残基连接起来。风险是 contact map 本身是预测结果，若蛋白家族同源序列不足或序列过短，接触图噪声会传递到 DTA 模型。

> 💡 关键：CADG-DTA 的“结构信息”主要来自分子键图和蛋白接触图，而不是显式蛋白-配体三维复合物坐标。因此它比纯序列模型更结构化，但仍不同于基于 docking pose 或等变 3D GNN 的结合能模型。

##### 与传统 DTA 模型的区别

DeepDTA 把 SMILES 和蛋白序列都视作字符串，用 CNN 提取局部 n-gram 模式；GraphDTA 把药物端换成图，但蛋白端多仍依赖序列编码。CADG-DTA 进一步把蛋白端也图化，并在融合层显式引入 drug-target cross-attention。这个变化把模型瓶颈从“各自编码后拼接”改为“在子结构集合之间建模相互作用”，更符合 DTA 的物理直觉。

不过，cross-attention 不保证因果解释。注意力高的残基可能只是统计相关，也可能受数据偏差影响。因此它适合用于生成可检查的候选区域，而不应直接替代分子动力学、突变实验或结构生物学验证。

#### 🧪 练习题

```yaml
question: "CADG-DTA 相比只拼接药物向量和蛋白向量的 DTA 模型，最核心的改进是什么？"
options:
  - "把 DTA 回归任务改成了无监督聚类任务"
  - "用 cross-attention 学习药物子结构与蛋白残基子结构之间的交互权重"
  - "完全依赖蛋白-配体复合物的实验三维结构"
  - "只使用蛋白序列，不再使用分子图"
answer: 1
explain: "CADG-DTA 的关键在于双图编码后用交叉注意力对齐 drug/protein 子结构，使融合层能够建模局部交互，而不是只做全局向量拼接。"
```
