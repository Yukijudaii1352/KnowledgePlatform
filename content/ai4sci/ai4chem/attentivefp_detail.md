### AttentiveFP — 用双层图注意力生成可解释分子指纹

```yaml
id: attentivefp
name: AttentiveFP
full_name: 注意力指纹网络 (AttentiveFP)
year: '2020'
org: Tencent AI Lab
paper_url: https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959
category: property
parent: moleculenet
motivation: 双层注意力机制提升ADMET预测可解释性
```

#### 📝 一句话总结

AttentiveFP 将分子表示学习写成“原子级图注意力消息传递 + 分子级注意力读出”的可微指纹生成过程，在提升多种药物发现性质预测表现的同时，用注意力权重提供可视化解释。

#### 🎯 核心要点

- **分子图输入**：原子作为节点、化学键作为边，输入包含原子特征和键特征
- **边特征初始化**：第一轮 GetContext 将源原子特征与键特征拼接，经注意力和 GRU 融入目标原子表示
- **原子级注意力**：后续多层 GNN 根据目标原子和邻居原子状态计算边注意力权重，只聚合与当前任务更相关的邻居信息
- **GRU 更新**：每一轮消息传递都用 GRUCell 更新原子隐藏状态，缓解深层传播中的信息覆盖问题
- **分子级读出**：以所有原子状态求和初始化图状态，再多步计算原子注意力权重并用 GRU 更新分子指纹
- **可解释性**：readout 阶段可返回每一步原子权重，用于可视化模型认为影响性质预测的关键原子或非局部相互作用
- **任务形式**：支持回归和分类；回归常用 MSE/MAE，分类输出 softmax 概率并可对缺失标签使用 mask
- **实验定位**：面向 MoleculeNet/ADMET 等药物发现相关任务，强调在性质预测中兼顾准确性和化学解释

#### 🔬 深入细节

##### 图示与可访问来源

![AttentiveFP 总体框架](https://ask.qcloudimg.com/http-save/yehe-8199873/ipr9ejvfq8.png)
*图：AttentiveFP 通过原子嵌入阶段的图注意力层和分子嵌入阶段的注意力读出层生成分子指纹。*

可访问来源：ACS DOI 页面 https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959；OpenAIRE 摘要页 https://oamonitor.ireland.openaire.eu/national/search/publication?pid=10.1021%2Facs.jmedchem.9b00959；DeepChem 实现 https://github.com/deepchem/deepchem/blob/master/deepchem/models/torch_models/attentivefp.py；DGL-LifeSci 实现 https://github.com/awslabs/dgl-lifesci/blob/master/python/dgllife/model/model_zoo/attentivefp_predictor.py。ACS 正文页可能受访问限制，因此方法细节同时参考开放摘要和官方开源实现。

##### 算法伪代码

```python
# AttentiveFP molecular property prediction
def attentivefp_predict(graph, atom_features, bond_features, T_atom, T_graph):
    # Initial context: inject bond features into atom states
    h = linear_atom(atom_features)
    edge_repr = {}
    for (u, v, e_uv) in graph.edges:
        edge_repr[u, v] = linear_edge(concat(atom_features[u], bond_features[u, v]))
        logit[u, v] = score_init(concat(h[v], edge_repr[u, v]))
    alpha = edge_softmax_by_dst(logit)
    for v in graph.nodes:
        context = sum(alpha[u, v] * transform(edge_repr[u, v]) for u in N(v))
        h[v] = GRU(ELU(context), h[v])

    # Atom-level attentive message passing
    for _ in range(T_atom):
        for (u, v) in graph.edges:
            logit[u, v] = score_edge(concat(h[v], h[u]))
        alpha = edge_softmax_by_dst(logit)
        new_h = {}
        for v in graph.nodes:
            context = sum(alpha[u, v] * W_node(h[u]) for u in N(v))
            new_h[v] = GRU(ELU(context), h[v])
        h = new_h

    # Molecule-level attentive fingerprint readout
    g = sum(h[v] for v in graph.nodes)
    atom_weights = []
    for _ in range(T_graph):
        for v in graph.nodes:
            z[v] = score_readout(concat(ReLU(g), h[v]))
        beta = softmax_over_nodes(z)
        atom_weights.append(beta)
        context = sum(beta[v] * W_readout(h[v]) for v in graph.nodes)
        g = GRU(ELU(context), g)

    y_hat = linear(g)
    return y_hat, atom_weights
```

##### 原子级注意力消息传递

AttentiveFP 的输入分子图为 \(G=(V,E)\)。每个原子 \(v\in V\) 有初始特征 \(x_v\)，每条键 \((u,v)\in E\) 有键特征 \(e_{uv}\)。第一步不是直接丢弃键特征，而是把键和源原子拼接：

$$
\tilde{e}_{uv}=W_e[x_u\|e_{uv}]
$$

再结合目标原子投影表示计算边打分：

$$
s_{uv}= \mathrm{LeakyReLU}(a^\top[h_v\|\tilde{e}_{uv}])
$$

对同一目标节点的入边做 softmax：

$$
\alpha_{uv}=
\frac{\exp(s_{uv})}{\sum_{k\in\mathcal{N}(v)}\exp(s_{kv})}
$$

上下文向量为：

$$
c_v=\sum_{u\in\mathcal{N}(v)}\alpha_{uv}W\tilde{e}_{uv}
$$

原子状态用 GRU 更新：

$$
h_v'=\mathrm{GRU}(\mathrm{ELU}(c_v), h_v)
$$

这一步的直觉是：同一个原子周围的不同键和邻居对预测任务贡献不同，注意力权重让模型学习“看哪个邻居”，GRU 则决定保留多少旧状态、写入多少新上下文。

##### 多层 GNN：边注意力从键特征转向原子状态

初始化后，后续 GNN 层主要在原子表示之间传播。DGL-LifeSci 实现中，每条边的注意力打分来自目标原子与源原子隐藏状态拼接：

$$
s_{uv}^{(t)}=\mathrm{LeakyReLU}(a_t^\top[h_v^{(t)}\|h_u^{(t)}])
$$

聚合为：

$$
c_v^{(t)}=\sum_{u\in\mathcal{N}(v)}
\alpha_{uv}^{(t)}W_t h_u^{(t)}
$$

再更新：

$$
h_v^{(t+1)}=\mathrm{GRU}(\mathrm{ELU}(c_v^{(t)}), h_v^{(t)})
$$

与普通 GCN 的均匀聚合或固定归一化不同，AttentiveFP 对每个目标原子的邻居动态分配权重。例如在溶解度或毒性预测中，模型可以把更高权重放在极性基团、芳香环、卤素取代位或特定官能团相互作用上，而不是平均所有邻居。

##### 分子级 readout：虚拟分子状态与原子权重

图级表示先用原子状态求和初始化：

$$
g^{(0)}=\sum_{v\in V} h_v^{(T)}
$$

随后每个 readout step 都让当前分子状态 \(g^{(r)}\) 反过来查询所有原子：

$$
z_v^{(r)}=f([ \mathrm{ReLU}(g^{(r)}) \| h_v^{(T)} ])
$$

$$
\beta_v^{(r)}=
\frac{\exp(z_v^{(r)})}{\sum_{k\in V}\exp(z_k^{(r)})}
$$

图上下文为：

$$
m^{(r)}=\sum_{v\in V}\beta_v^{(r)}W_g h_v^{(T)}
$$

并用 GRU 更新分子指纹：

$$
g^{(r+1)}=\mathrm{GRU}(\mathrm{ELU}(m^{(r)}), g^{(r)})
$$

这个双层注意力是 AttentiveFP 与许多早期分子 GNN 的主要区别。原子级注意力决定局部消息怎么传，分子级注意力决定最终指纹应该关注哪些原子。readout 返回的 \(\beta_v^{(r)}\) 就是可视化解释的基础。

##### 训练目标与缺失标签

对回归任务，AttentiveFP 可使用标准 MSE：

$$
\mathcal{L}_{reg}=
\frac{1}{B}\sum_{i=1}^{B}
\|\hat{y}_i-y_i\|_2^2
$$

对多任务分类，常见形式是带 mask 的交叉熵：

$$
\mathcal{L}_{cls}=
-\frac{1}{\sum_{i,k}m_{ik}}
\sum_{i=1}^{B}\sum_{k=1}^{K}m_{ik}
\sum_{c}y_{ikc}\log p_{ikc}
$$

其中 \(m_{ik}=0\) 表示第 \(i\) 个分子在第 \(k\) 个任务上标签缺失，不参与损失。这个设计对 MoleculeNet 的毒性和 ADMET 任务很关键，因为多任务生物测定数据常常标签不完整。

##### 可解释性的边界

论文摘要强调 AttentiveFP 的特征可视化可揭示任务相关的非局部分子内相互作用。实现层面，模型确实可以返回 readout 阶段的原子权重，用颜色映射到分子结构上。但注意力权重并不等价于严格因果解释：高权重说明该原子对当前前向预测贡献大，不必然说明化学实验中改变该原子一定导致同方向性质变化。因此更稳妥的用法是把注意力图作为假设生成工具，再结合子结构消融、反事实编辑或实验验证。

##### 与 MoleculeNet 关系

AttentiveFP 属于 MoleculeNet 之后的分子图学习模型：MoleculeNet 定义了数据、split 和评价指标，AttentiveFP 则在这个评估范式下改进分子表示。它继承了 MPNN 的消息传递思想，但在两个位置引入注意力和 GRU，使模型能在局部邻域和全局指纹两级选择性聚合信息。

> 💡 关键：AttentiveFP 的“FP”不是手工 fingerprint，而是由图注意力和 GRU 从分子图中端到端生成的任务相关指纹。

#### 🧪 练习题

```yaml
question: "AttentiveFP 中分子级 readout 注意力的主要作用是什么？"
options:
  - "把所有原子按固定权重平均，避免任何可解释性"
  - "根据当前分子状态为原子分配权重，迭代更新图级分子指纹"
  - "只编码键长和键角，不使用原子特征"
  - "替代训练损失函数，使模型无需标签"
answer: 1
explain: "AttentiveFP readout 用当前图状态查询原子状态，经 softmax 得到原子权重，再用 GRU 更新分子指纹；这些权重也可用于可视化解释。"
```
