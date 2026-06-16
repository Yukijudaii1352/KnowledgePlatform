### AttentiveFP — 注意力分子指纹

```yaml
id: attentivefp
name: AttentiveFP
full_name: 注意力指纹 (AttentiveFP)
year: '2020'
org: Genentech
paper_url: https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959
category: screening
parent: graphdta
motivation: 注意力机制增强可解释性
```

#### 📝 一句话总结

AttentiveFP 提出一种带注意力和 GRU 更新的分子图神经网络，在原子级消息传递和分子级读出两处学习可解释权重，从分子图自动生成面向药物发现任务的 neural fingerprint。

#### 🎯 核心要点

- **分子图输入**：原子为节点、化学键为边，节点特征包含元素、度、形式电荷、杂化、芳香性、氢数、手性等
- **键特征参与首轮消息**：邻居原子特征与键特征拼接，避免普通 GAT 只看节点而忽略化学键类型
- **原子级注意力**：每个中心原子对一跳邻居计算 attention weight，选择性聚合更相关的局部化学环境
- **GRU 状态更新**：用 GRUCell 将邻居上下文与中心原子旧表示融合，控制保留旧信息和吸收新信息的比例
- **多层半径扩展**：堆叠 \(K\) 个 attentive layers，类似可学习版 ECFP，从近邻逐步扩展到更大化学环境
- **分子级注意力读出**：构造 super node/star graph，通过 \(T\) 次注意力读出把原子表示聚合为 molecule fingerprint
- **可解释性**：attention 权重可视化能显示模型关注的原子、官能团或非局部分子内相互作用
- **多任务适配**：分类任务使用交叉熵，回归任务使用 MSE，可用于 ESOL、FreeSolv、HIV、BACE、Tox21、ClinTox 等分子性质/筛选任务
- **工程实现广泛**：官方 OpenDrugAI 仓库、PyTorch Geometric、DeepChem/DGL-LifeSci 均提供 AttentiveFP 实现

#### 🔬 深入细节

![AttentiveFP 网络结构示意](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/18/10.1093_bioinformatics_btab195/2/m_btab195f3.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=Q7gnHX6vwFFT99QDBxeDWsDi2UtLEOG5b-gsmsv8j-OJYdB~kNs6QBYFg7KzrL9hiV60-ORnirHE6rUK6XyE0vNtn5aEilcU1T9g0SGj3VaEDa4-GmIv3RZcI99mLS0TPDWdTzPLOuvlELQ2AxBxhs30Ziai5qedxMvNZxOHS6B8I8STsHZqHymTd3ynPJSN-90SyWBjEGzycM41ntsr8M8UYQVFM1aFNDjej3QD8L5pjsXwfILrjsp7hOk05V1Pap2QLf-WhWD-0pKVh54NUHwAd5BzNqjYPJeBP0-PsV86Cz95kEETdRTLwn6YfFQlp2QhIyTVlJCoySN5qhTMdw__)
*图：FraGAT 论文 Figure 3 中复现的 Attentive FP 网络结构。原 ACS 论文页面在当前环境中受 403 限制，因此这里使用可访问的 OUP 图示和官方 OpenDrugAI 代码仓库核对：AttentiveFP 包含 node embedding network 与 graph embedding/readout network。*

可访问方法来源：
- 原论文 DOI：https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959
- 官方实现：https://github.com/OpenDrugAI/AttentiveFP/blob/master/code/AttentiveFP/AttentiveLayers.py
- PyTorch Geometric 实现：https://raw.githubusercontent.com/pyg-team/pytorch_geometric/master/torch_geometric/nn/models/attentive_fp.py

```python
# AttentiveFP 核心机制伪代码
def attentivefp_forward(atom_features, bond_features, edge_index, graph_batch):
    # 1. 初始原子投影
    h = leaky_relu(atom_fc(atom_features))

    # 2. 第 1 层：邻居原子特征与键特征拼接
    for atom i:
        messages = []
        scores = []
        for neighbor j in N(i):
            m_ij = leaky_relu(neighbor_fc(concat(atom_features[j], bond_features[j, i])))
            e_ij = leaky_relu(align_0(concat(h[i], m_ij)))
            messages.append(attend_0(m_ij))
            scores.append(e_ij)
        alpha = softmax(scores)
        context = elu(sum(alpha[j] * messages[j] for j in N(i)))
        h[i] = relu(GRUCell(context, h[i]))

    # 3. 后续 K-1 层：在 learned atom embeddings 上继续 attentive message passing
    for layer in range(1, K):
        for atom i:
            e_ij = [leaky_relu(align_layer(concat(h[i], h[j]))) for j in N(i)]
            alpha = softmax(e_ij)
            context = elu(sum(alpha[j] * attend_layer(h[j]) for j in N(i)))
            h[i] = relu(GRUCell_layer(context, h[i]))

    # 4. 分子级 readout：super node 对所有原子做 T 次 attention + GRU 更新
    g = sum_pool(h, graph_batch)
    for t in range(T):
        for molecule m:
            scores = [leaky_relu(mol_align(concat(g[m], h[i]))) for i in atoms(m)]
            beta = softmax(scores)
            context = elu(sum(beta[i] * mol_attend(h[i]) for i in atoms(m)))
            g[m] = relu(mol_GRUCell(context, g[m]))

    return output_layer(dropout(g))
```

**动机：让神经指纹既强表达又能解释**

传统 ECFP 通过固定哈希规则把原子邻域映射为离散指纹，稳定、快速、可解释，但不能针对具体任务学习“哪些邻域更重要”。早期 neural fingerprint 和 MPNN 能学习连续分子表示，却经常缺少清晰的关注位置。AttentiveFP 的设计目标是在分子图上学习指纹，同时把注意力权重暴露出来：模型不仅输出性质预测，还能显示哪些原子邻域对预测更关键。

**分子图与特征：化学键不是附属信息**

分子被建模为带属性的图：

$$
G=(V,E,X,E_f)
$$

其中 \(X_i\) 是原子特征，\(E_{ij}\) 是键特征。官方实现中的 atom features 包括元素 one-hot、原子度、形式电荷、自由基电子数、杂化类型、芳香性、连接氢数和手性；bond features 包括单/双/三/芳香键、共轭、环内键和立体信息。首轮消息传递把邻居原子与键特征拼接：

$$
m_{ij}^{(0)} = \phi_m\left([x_j; e_{ij}]\right)
$$

这比只在节点之间做普通 GAT 更适合化学图，因为 C-C 单键、C=C 双键、芳香键和手性键会显著改变局部化学语义。

**原子级 attention：可学习的局部邻域聚合**

第 \(\ell\) 层中，中心原子 \(i\) 对每个邻居 \(j\) 计算对齐分数：

$$
s_{ij}^{(\ell)}
= \mathrm{LeakyReLU}\left(a_\ell^\top
[h_i^{(\ell)}; h_j^{(\ell)}]\right)
$$

然后在邻居集合上归一化：

$$
\alpha_{ij}^{(\ell)}
= \frac{\exp(s_{ij}^{(\ell)})}
{\sum_{k\in\mathcal{N}(i)}\exp(s_{ik}^{(\ell)})}
$$

聚合上下文为：

$$
c_i^{(\ell)}
= \mathrm{ELU}\left(\sum_{j\in\mathcal{N}(i)}
\alpha_{ij}^{(\ell)} W_\ell h_j^{(\ell)}\right)
$$

注意力的直觉是：一个原子的所有邻居不应等权处理。例如在溶解度、毒性或活性预测中，极性官能团、芳香系统、带电中心或特定取代基可能比普通碳链更重要。

**GRU 更新：控制“保留自身”和“吸收邻居”的比例**

AttentiveFP 不直接用 \(c_i\) 覆盖节点表示，而是用 GRUCell 更新：

$$
h_i^{(\ell+1)}
= \mathrm{GRU}\left(c_i^{(\ell)}, h_i^{(\ell)}\right)
$$

GRU 的门控机制可以决定当前节点状态中多少来自上一层自身表示、多少来自邻居上下文。对分子图很有意义：某些原子身份本身很关键，不能被邻居平均淹没；同时多层传播又需要把远处取代基、环系统和非局部相互作用逐步纳入表示。

**分子级 readout：用 super node 生成 neural fingerprint**

原子表示学习完成后，AttentiveFP 不是简单平均所有节点，而是构造一个分子级 super node \(s\)，把所有原子连接到 \(s\)，形成 star graph。第 \(t\) 次读出时，分子表示 \(g^{(t)}\) 对原子 \(i\) 计算 attention：

$$
\beta_i^{(t)}
= \mathrm{softmax}_i\left(
\mathrm{LeakyReLU}(b^\top[g^{(t)}; h_i])
\right)
$$

$$
r^{(t)}
= \sum_i \beta_i^{(t)} W_r h_i
$$

$$
g^{(t+1)} = \mathrm{GRU}(r^{(t)}, g^{(t)})
$$

经过 \(T\) 次迭代后，\(g^{(T)}\) 就是 AttentiveFP 的分子指纹，可接线性层或 MLP 做分类/回归。这个 readout 让模型在分子层面再次决定“哪些原子更影响当前任务”，因此 attention visualization 可以映射回分子结构。

**训练目标与虚拟筛选关系**

AttentiveFP 本身是通用分子性质预测模型，不是专门的药物-蛋白配对模型。它常用于筛选相关的单分子任务，例如溶解度、毒性、BACE/HIV 活性、血脑屏障穿透等。对于回归任务：

$$
\mathcal{L}_{\mathrm{reg}}
= \frac{1}{N}\sum_i(\hat{y}_i-y_i)^2
$$

对于多任务分类：

$$
\mathcal{L}_{\mathrm{cls}}
= -\sum_{i=1}^{N}\sum_{k=1}^{K} m_{ik}
\left[y_{ik}\log \hat{p}_{ik}
+ (1-y_{ik})\log(1-\hat{p}_{ik})\right]
$$

其中 \(m_{ik}\) 表示第 \(i\) 个样本在第 \(k\) 个任务上是否有标签。训练好的 AttentiveFP embedding 可作为虚拟筛选中的 ligand-side 表示，也可替换 GraphDTA 药物侧编码器，用更细粒度的 attention 和 bond-aware message passing 表达分子。

**优势与局限**

AttentiveFP 的优势是结构归纳偏置清楚：局部邻域聚合类似 ECFP，但 attention 和 GRU 是可学习的；分子级 readout 又能告诉使用者模型关注哪些原子。局限是它主要使用 2D 分子图，不能直接表示 3D 构象、蛋白口袋环境和诱导契合效应；attention 权重也不等于严格因果解释，只能作为模型内部证据的可视化线索。

#### 🧪 练习题

```yaml
question: "AttentiveFP 中分子级 super node/star graph readout 的主要作用是什么？"
options:
  - "把蛋白质序列截断到固定长度"
  - "通过注意力从所有原子表示中迭代聚合出分子指纹"
  - "把连续回归任务强制改成二分类任务"
  - "用随机哈希替代所有可学习参数"
answer: 1
explain: "AttentiveFP 在原子级消息传递后构造分子级 super node，对原子表示做注意力聚合并用 GRU 更新，最终得到可用于性质预测的 neural fingerprint。"
```
