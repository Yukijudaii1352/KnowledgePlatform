### GROVER — 大规模分子数据上的自监督图 Transformer

```yaml
id: grover
name: GROVER
full_name: "大规模分子数据上的自监督图 Transformer (Self-Supervised Graph Transformer on Large-Scale Molecular Data)"
year: 2020
org: Tencent AI Lab
paper_url: "https://arxiv.org/abs/2007.02835"
category: ai4chem
parent: "—"
motivation: "提出 GTransformer 架构结合动态消息传递与 Transformer 注意力，在千万级无标注分子上进行三层级自监督预训练，成为分子性质预测的大规模自监督模型"
```

#### 📝 一句话总结

GROVER 提出了 GTransformer（将动态消息传递网络 dyMPN 与 Transformer 多头注意力深度融合）作为骨干网络，在 1000 万无标注分子上通过节点级上下文属性预测、边级上下文属性预测和图级功能基团预测三层自监督任务进行预训练，在 11 个分子性质预测基准上全面超越此前 SOTA，平均相对提升 6.1%。

#### 🎯 核心要点

- **GTransformer 架构**：将 dyMPN（动态消息传递网络，每层随机化跳数 \(K_l\)）作为 Transformer 中 Q/K/V 的生成器，替代传统线性投影，使注意力机制天然感知图拓扑结构
- **双视图设计**：节点级 GTransformer 和边级 GTransformer 并行处理，分别以节点和边为中心聚合信息，最终通过 readout 融合两个视图的表示
- **动态消息传递 (dyMPN)**：每一层随机采样消息传递跳数 \(K_l \sim \text{Uniform}[1, K]\)，起到类似 DropOut 的正则化效果，提升泛化能力
- **长程残差连接**：跨 GTransformer 层的残差连接缓解深层 GNN 的过平滑问题
- **三级自监督预训练任务**：
  - 节点级/边级：上下文属性预测（Contextual Property Prediction）——提取 k-hop 子图中 (节点类型, 边类型) 对的统计分布作为上下文属性标签
  - 图级：功能基团预测（Graph-level Motif Prediction）——多标签分类预测 85 种 RDKit 提取的官能团
- **大规模预训练**：GROVER\_base（~48M 参数）和 GROVER\_large（~100M 参数），在 ZINC15 + ChEMBL 共约 1000 万分子上预训练，使用 250 块 V100 GPU
- **11 个基准全面 SOTA**：6 个分类任务（ROC-AUC）和 5 个回归任务（RMSE）上均取得最优或接近最优结果，分类平均提升 2.2%，回归平均提升 10.8%

#### 🔬 深入细节

##### 整体架构

![GROVER 完整架构图](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x8.png)
*图：GROVER 完整架构。左侧为节点级 GTransformer，右侧为边级 GTransformer，两个视图并行处理后通过 readout 层融合。每个 GTransformer 层内部由 dyMPN + 多头注意力 + 前馈网络组成。*

GROVER 的核心思想是：**将 GNN 的消息传递机制嵌入 Transformer 架构内部**，而非简单地将两者串联。具体来说，传统 Transformer 中通过线性变换生成 Q、K、V，而 GTransformer 用 dyMPN（动态消息传递网络）替代这些线性变换，使得每个注意力头的查询/键/值都携带了局部图拓扑信息。

![GTransformer 单层结构](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x1.png)
*图：GTransformer 单层结构。dyMPN 替代线性投影生成 Q、K、V，随后进入标准多头注意力和前馈网络。*

##### GTransformer 与 dyMPN 核心机制

**动态消息传递网络 (dyMPN)** 是 GROVER 的关键创新之一。在标准 MPNN 中，消息传递的跳数（depth）在所有层中固定。dyMPN 在每一层 \(l\) 中随机采样跳数：

$$K_l \sim \text{Uniform}[1, K]$$

其中 \(K\) 是预设的最大跳数。这种随机化机制有两个好处：(1) 每次前向传播看到不同大小的感受野，起到数据增强和正则化的效果；(2) 避免固定深度带来的过平滑问题。

对于节点 \(v\) 在第 \(l\) 层的消息传递，dyMPN 执行 \(K_l\) 步迭代：

$$m_v^{(t)} = \sum_{u \in \mathcal{N}(v)} M_t(h_v^{(t-1)}, h_u^{(t-1)}, e_{uv}), \quad t = 1, \ldots, K_l$$

$$h_v^{(t)} = U_t(h_v^{(t-1)}, m_v^{(t)})$$

其中 \(M_t\) 为消息函数，\(U_t\) 为更新函数，\(e_{uv}\) 为边特征。最终 \(h_v^{(K_l)}\) 作为该层的输出。

**GTransformer 层** 的完整计算流程为：

$$Q = \text{dyMPN}_Q(H^{(l-1)}), \quad K = \text{dyMPN}_K(H^{(l-1)}), \quad V = \text{dyMPN}_V(H^{(l-1)})$$

$$\text{Attn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

$$H^{(l)} = \text{FFN}(\text{Attn}(Q, K, V)) + H^{(l-1)}$$

> 💡 **关键直觉**：传统 Transformer 的注意力权重仅基于特征相似度，而 GTransformer 的注意力权重隐式编码了图拓扑距离——因为 Q 和 K 本身就是通过消息传递在局部子图上聚合得到的。这使得注意力机制能够同时捕获**局部化学键连接模式**和**全局分子结构关系**。

**双视图并行处理**：GROVER 同时运行两个 GTransformer——一个以节点（原子）为中心，一个以边（化学键）为中心。两者共享相同的架构但参数独立，最终通过 readout 函数（如均值池化 + 拼接）融合两个视图的表示，生成分子级别的嵌入向量。

##### 自监督预训练任务

![自监督任务示意图](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x2.png)
*图：GROVER 的自监督预训练任务。左：上下文属性预测（节点/边级）；右：功能基团预测（图级）。*

GROVER 设计了三个层级的自监督任务，覆盖从局部到全局的分子信息：

**1. 上下文属性预测 (Contextual Property Prediction)**

![上下文属性提取](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x3.png)
*图：上下文属性的提取过程。对目标节点提取 k-hop 子图，统计子图中 (节点类型, 边类型) 对的出现频次，形成上下文属性字符串。*

对于每个节点 \(v\)，提取其 \(k\)-hop 邻域子图 \(\mathcal{G}_k(v)\)，统计子图中所有 (原子类型, 键类型) 对的出现次数，将这些计数排序后拼接成一个字符串，作为该节点的**上下文属性标签**。例如，一个碳原子的 1-hop 邻域中有 2 个 C-单键、1 个 N-双键，则其上下文属性为 `"C-single:2,N-double:1"`。

训练时，随机遮蔽 15% 的节点/边标签，让模型预测被遮蔽位置的上下文属性类别（多分类任务）。实验中 \(k=1\)，共提取出 2518 种节点上下文属性和 2686 种边上下文属性。

> ⚠️ **与 BERT 的类比**：上下文属性预测类似于 BERT 的 Masked Language Model，但不是简单地预测原子类型，而是预测**原子在其化学环境中的角色**——这编码了更丰富的局部化学信息。

**2. 功能基团预测 (Graph-level Motif Prediction)**

在图级别，使用 RDKit 工具包提取每个分子中存在的 85 种官能团（如羟基 -OH、羧基 -COOH、苯环等），构建多标签分类任务。模型需要从分子图的全局表示中预测哪些官能团存在。

这一任务迫使模型学习**全局化学结构模式**，与局部的上下文属性预测形成互补。

```python
# GROVER 预训练伪代码
for batch in unlabeled_molecules:
    # 1. 双视图编码
    node_repr = NodeGTransformer(batch.graph)   # 节点视图
    edge_repr = EdgeGTransformer(batch.graph)   # 边视图
    graph_repr = Readout(node_repr, edge_repr)  # 图级表示
    
    # 2. 节点级上下文属性预测 (随机遮蔽 15%)
    masked_nodes = random_mask(batch.nodes, ratio=0.15)
    loss_node_ctx = CrossEntropy(
        predict(node_repr[masked_nodes]),
        contextual_property_labels[masked_nodes]  # 2518 类
    )
    
    # 3. 边级上下文属性预测 (随机遮蔽 15%)
    masked_edges = random_mask(batch.edges, ratio=0.15)
    loss_edge_ctx = CrossEntropy(
        predict(edge_repr[masked_edges]),
        contextual_property_labels[masked_edges]  # 2686 类
    )
    
    # 4. 图级功能基团预测
    loss_motif = BCELoss(
        predict(graph_repr),
        functional_group_labels  # 85 维多标签
    )
    
    # 5. 联合优化
    loss = loss_node_ctx + loss_edge_ctx + loss_motif
    optimizer.step(loss)
```

##### 与传统方法的对比

| 特性 | 传统 GNN (MPNN/GIN) | Hu et al. (2020) 预训练 | **GROVER** |
|------|---------------------|------------------------|------------|
| 骨干网络 | 固定深度消息传递 | GIN + 线性层 | GTransformer (dyMPN + 注意力) |
| 预训练数据 | 无 | ~2M 分子 | **~10M 分子** |
| 预训练任务 | 无 | 节点/边属性预测 + 图属性预测 | **上下文属性预测 + 功能基团预测** |
| 参数规模 | ~1-5M | ~2-5M | **48M-100M** |
| 注意力机制 | 无/简单 GAT | 无 | **拓扑感知多头注意力** |
| 正则化 | Dropout | Dropout | **dyMPN 随机跳数 + Dropout** |

> 💡 **核心区别**：Hu et al. (2020) 的预训练任务直接预测原子/键的化学属性（如原子序数、键类型），这些信息在输入特征中已经存在，模型可能学到"捷径"。GROVER 的上下文属性预测要求模型理解**原子在化学环境中的角色**，是一种更高层次的语义信息，迫使模型学习更有意义的表示。

##### 实验结果

GROVER 在 MoleculeNet 基准的 11 个数据集上进行了评估，使用 scaffold split（基于分子骨架的划分，更接近真实应用场景）：

**分类任务 (ROC-AUC ↑)**：

| 数据集 | DMPNN | Hu et al. | GROVER\_base | **GROVER\_large** |
|--------|-------|-----------|-------------|-------------------|
| BBBP | 0.919 | 0.915 | 0.936 | **0.940** |
| SIDER | 0.632 | 0.614 | 0.656 | **0.658** |
| ClinTox | 0.897 | 0.762 | 0.925 | **0.944** |
| BACE | 0.852 | 0.851 | 0.878 | **0.894** |
| Tox21 | 0.826 | 0.811 | 0.819 | **0.831** |
| ToxCast | 0.718 | 0.714 | 0.723 | **0.737** |

**回归任务 (RMSE ↓)**：

| 数据集 | DMPNN | AttentiveFP | GROVER\_base | **GROVER\_large** |
|--------|-------|-------------|-------------|-------------------|
| FreeSolv | 2.177 | 2.030 | 1.592 | **1.544** |
| ESOL | 0.980 | 0.853 | 0.888 | **0.831** |
| Lipo | 0.653 | 0.650 | 0.563 | **0.560** |
| QM7 | 105.8 | 126.7 | **72.5** | 72.6 |
| QM8 | 0.0143 | 0.0282 | 0.0172 | **0.0125** |

GROVER\_large 在全部 11 个数据集上取得最优结果，整体相对提升 6.1%（分类 2.2%，回归 10.8%）。尤其在小数据集 FreeSolv（仅 642 个标注分子）上取得了 23.9% 的相对提升，验证了预训练对低资源场景的显著增益。

**消融实验关键发现**：
- **预训练 vs 无预训练**：自监督预训练带来平均 +3.8% AUC 提升，小数据集（SIDER、ClinTox、BACE）提升更大
- **GTransformer vs GIN/MPNN 骨干**：在相同参数量（~38M）下，GTransformer 的训练和验证损失均优于 GIN 和 MPNN
- **dyMPN 的作用**：移除 dyMPN（固定跳数）后训练损失略优但验证损失变差，说明 dyMPN 的随机化机制提升了泛化能力
- **GTransformer vs 简单拼接**：将 GTransformer 替换为原始 Transformer（即 GNN 输出直接送入标准 Transformer）效果最差，说明**不能简单地将 GNN 和 Transformer 串联**，必须深度融合

#### 🧪 练习题

```yaml
question: "GROVER 中 GTransformer 与标准 Transformer 的核心区别是什么？"
options:
  - "GTransformer 使用更多的注意力头数"
  - "GTransformer 用动态消息传递网络 (dyMPN) 替代线性投影来生成 Q、K、V"
  - "GTransformer 移除了前馈网络层以减少参数"
  - "GTransformer 使用图卷积网络替代了 softmax 注意力计算"
answer: 1
explain: "GTransformer 的核心创新是用 dyMPN 替代标准 Transformer 中生成 Q/K/V 的线性投影层，使注意力机制天然感知图拓扑结构，而非简单地将 GNN 和 Transformer 串联。"
```