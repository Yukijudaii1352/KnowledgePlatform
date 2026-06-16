### GraphDTA — 图神经网络药物-靶点亲和力预测

```yaml
id: graphdta
name: GraphDTA
full_name: 图神经网络药物-靶点亲和力 (GraphDTA)
year: '2019'
org: Vietnam National University
paper_url: https://academic.oup.com/bioinformatics/article/37/8/1140/5942970
category: screening
parent: deepdta
motivation: 图神经网络提升分子表征能力
```

#### 📝 一句话总结

GraphDTA 将 DeepDTA 的药物 SMILES 字符 CNN 替换为分子图神经网络，用原子节点和化学键边直接学习药物结构表示，再与蛋白序列 CNN 表示融合回归结合亲和力，解决 SMILES 线性化丢失分子拓扑的问题。

#### 🎯 核心要点

- **药物图表示**：把 SMILES 转换为分子图，原子为节点、化学键为边，用图神经网络学习 graph-level drug embedding
- **蛋白序列分支保留**：蛋白仍采用字符编码、128 维嵌入和 3 层 1D-CNN，最大长度为 1000 residues
- **四种 GNN 变体**：系统比较 GCN、GAT、GIN、GAT-GCN 四类药物图编码器
- **图级池化**：GNN 输出节点表示后使用 global max pooling 得到整分子的向量表示
- **融合回归结构**：药物图表示与蛋白序列表示拼接，通过全连接层预测连续 DTA 分数
- **训练目标一致**：与 DeepDTA 一样使用 Davis 和 KIBA 数据集，将任务建模为亲和力回归并用 MSE 优化
- **性能提升来自分子拓扑**：在 Davis 和 KIBA 上多种 GNN 变体超过 DeepDTA/WideDTA 等 1D 药物表示基线
- **可解释性分析**：作者对 128 维药物潜变量做冗余分析，发现部分 latent variables 与已知 JoeLib 分子描述符相关
- **局限明确**：药物侧使用 2D 图拓扑，不显式建模 3D 构象、立体化学和蛋白口袋空间结构

#### 🔬 深入细节

![GraphDTA 架构图](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/8/10.1093_bioinformatics_btaa921/2/m_btaa921f1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=wLz4aiPhUUkcyjGm6aOME~gRkxpzJiYjFgJD9eynI8QdjaPe4qJNiRe1nL43pF~t2m~YgIFEPVUW~L4xc-61gAmlDM~b87KU41M9aDgW93fgkE3eDxGKkBjrznbM4nlYhcmDtMPcahex6EyvGHZQf8sqeGemfotBDiPBg6ZHnJwfAfvz7BEClETcvujB7cpJIPYfjUcbThxGPFKPIz14qehZekSc9WCyncbJ3~BqE7gH6JvIw-RZ4jJ5eaSdklpnWjWvdzTs8yqy-aXtCoGEJsBUBilx-bt~Raw493Mye7NAhJ~TP6GlT~5ryaM-wZ0WvUD7EK~8u7eV6CnJghTV3A__)
*图：GraphDTA 论文 Figure 1。左侧将 SMILES 转为分子图后用 GCN/GAT/GIN/GAT-GCN 学习药物表示；右侧用 1D-CNN 学习蛋白序列表示；两者拼接后回归亲和力。若 CDN 图片受限，可在论文 OUP 页面 Figure 1 查看同一图。*

```python
# GraphDTA 简化训练伪代码
for smiles, protein_seq, affinity in dataloader:
    # 1. 药物侧：SMILES -> RDKit molecule -> PyG/DGL graph
    graph = mol_from_smiles(smiles)
    X = atom_features(graph)          # 节点特征，如原子类型、度、芳香性等
    A = adjacency_with_bonds(graph)   # 分子键连通关系

    # 2. 任选一种图编码器：GCN / GAT / GIN / GAT-GCN
    H = X
    for layer in drug_gnn_layers:
        H = layer(H, A)
        H = relu(H)
    z_drug = global_max_pool(H)

    # 3. 蛋白侧：字符编码 + embedding + 1D-CNN
    x_protein = pad_or_truncate(label_encode(protein_seq), max_len=1000)
    E = Embedding(num_tokens, 128)(x_protein)
    P = Conv1D(...)(E)
    P = Conv1D(...)(P)
    P = Conv1D(...)(P)
    z_protein = max_pool(P)

    # 4. 联合回归
    z = concat([z_drug, z_protein])
    y_hat = MLP(z)
    loss = mean((y_hat - affinity) ** 2)
    optimizer.step(loss)
```

**动机：SMILES 是字符串，但分子本质上是图**

DeepDTA 证明了端到端序列学习可以处理 DTA，但药物的 SMILES 表示存在一个结构性缺陷：SMILES 是分子图的线性遍历，同一分子可以有多种合法 SMILES，字符邻近不一定等价于化学邻近。GraphDTA 的核心判断是，药物侧应该直接使用分子图：

$$
G = (V,E), \quad v_i \in V \text{ 表示原子}, \quad e_{ij}\in E \text{ 表示化学键}
$$

这样模型在消息传递时沿真实化学键传播信息，而不是沿 SMILES 字符位置传播。

**药物图编码：从节点表示到分子表示**

GraphDTA 比较了四种 GNN。以 GCN 为例，加入自连接后的规范化传播可写为：

$$
H^{(\ell+1)}
= \sigma\left(\tilde{D}^{-\frac{1}{2}}\tilde{A}\tilde{D}^{-\frac{1}{2}}
H^{(\ell)}W^{(\ell)}\right)
$$

其中 \(\tilde{A}=A+I\)，\(\tilde{D}\) 是度矩阵，\(H^{(0)}=X\) 是原子特征矩阵。多层 GCN 后仍得到每个原子的节点级表示，需要通过全局池化得到分子级表示：

$$
z_d = \mathrm{GlobalMaxPool}\left(H^{(L)}\right)
$$

GAT 变体则让每个原子对邻居分配注意力权重：

$$
\alpha_{ij}
= \frac{\exp\left(\mathrm{LeakyReLU}(a^\top[Wh_i \Vert Wh_j])\right)}
{\sum_{k\in \mathcal{N}(i)} \exp\left(\mathrm{LeakyReLU}(a^\top[Wh_i \Vert Wh_k])\right)}
$$

$$
h_i' = \sigma\left(\sum_{j\in\mathcal{N}(i)}\alpha_{ij}Wh_j\right)
$$

GIN 变体使用更强的邻域聚合：

$$
h_i^{(\ell+1)}
= \mathrm{MLP}^{(\ell)}\left((1+\epsilon)h_i^{(\ell)}
+ \sum_{j\in\mathcal{N}(i)}h_j^{(\ell)}\right)
$$

论文结果显示 GIN 在 Davis 上取得 CI 0.893、MSE 0.229；KIBA 上 GCN 和 GAT-GCN 的 MSE 可到 0.139，明显低于 1D 药物表示基线。

**蛋白侧：沿用 DeepDTA 的序列卷积思想**

GraphDTA 的主要改动在药物侧，蛋白侧基本沿用 DeepDTA/WideDTA 的序列 CNN：蛋白序列先做字符级 label encoding，截断或补零到 1000 个 residue，再映射到 128 维 embedding，经过三层 1D convolution 和 max pooling 得到 \(z_t\)。这使论文能更清楚地回答一个问题：如果只把药物表示从 SMILES-CNN 换成 molecular graph-GNN，DTA 性能是否会提升？

**融合与损失：图表示和序列表示共同回归**

最终预测仍然是简单而有效的 late fusion：

$$
\hat{y}_{d,t} = f_{\mathrm{MLP}}\left([z_d;z_t]\right)
$$

训练损失为：

$$
\mathcal{L}
= \frac{1}{N}\sum_{(d,t,y)\in\mathcal{D}}
\left(f_{\mathrm{MLP}}([z_d;z_t])-y\right)^2
$$

这种设计把模型差异集中在药物编码器上：相同的蛋白编码器、相似的回归头和相同的数据集，让图结构表示的贡献更容易被验证。

**为什么图表示带来提升**

分子中的芳香环、羟基、胺基、卤素取代、支链连接等结构特征都由图拓扑自然表达。GNN 的消息传递相当于从每个原子出发逐步聚合邻居环境，和 ECFP 的圆形邻域思想有相似直觉，但 GNN 的聚合函数可学习、连续且可针对 DTA 任务优化。论文的后验分析还发现，药物 latent variables 与部分 JoeLib 分子描述符存在相关性，例如与脂肪族 OH 数量相关，说明图网络能自动抽象一些化学概念。

**边界与后续发展**

GraphDTA 仍然没有显式使用蛋白三维结构，也没有把蛋白残基建成结构图；药物侧也主要是 2D graph，难以区分依赖构象、立体化学或诱导契合的相互作用。这些不足推动了后续 DGraphDTA、结构感知 DTA、等变 GNN 和蛋白-配体 3D 复合物模型的发展。但在 DeepDTA 到现代结构模型之间，GraphDTA 是关键一步：它把“药物是图”这件事引入了 DTA 回归基线。

#### 🧪 练习题

```yaml
question: "GraphDTA 相比 DeepDTA 最核心的结构改动是什么？"
options:
  - "把蛋白序列分支改为分子对接打分函数"
  - "把药物 SMILES 字符 CNN 改为基于分子图的 GNN 编码器"
  - "完全去掉药物输入，只预测靶点活性"
  - "把回归任务改为只判断是否结合的二分类任务"
answer: 1
explain: "GraphDTA 的核心贡献是用分子图和 GCN/GAT/GIN 等 GNN 学习药物表示，保留蛋白序列 CNN 分支，再融合回归连续亲和力。"
```
