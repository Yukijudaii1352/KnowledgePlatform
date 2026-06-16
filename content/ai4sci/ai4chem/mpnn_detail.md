### MPNN — 用消息传递统一分子图神经网络并预测量子化学性质

```yaml
id: mpnn
name: MPNN
full_name: 消息传递神经网络 (Message Passing Neural Networks)
year: '2017'
org: Google Research
paper_url: https://proceedings.mlr.press/v70/gilmer17a.html
category: representation
parent: —
motivation: 统一图神经网络框架，在QM9达到化学精度
```

#### 📝 一句话总结

MPNN 将多种分子图神经网络统一为“消息函数 \(M\) → 节点更新 \(U\) → 图级读出 \(R\)”的通用框架，并在 QM9 量子化学基准上通过 Edge Network、Set2Set 读出和虚拟图元素等设计达到当时最强性能，11/13 个目标达到化学精度。

#### 🎯 核心要点

- **统一框架**：把 GG-NN、Neural Fingerprints、Interaction Networks、DTNN、图卷积等方法归纳为同一类 Message Passing Neural Networks
- **两阶段前向传播**：先运行 \(T\) 步邻域消息传递更新节点状态，再用 permutation-invariant readout 生成图级分子性质预测
- **Edge Network 消息函数**：用神经网络 \(A(e_{vw})\) 将连续边特征映射为矩阵，使模型能利用原子间距离等 3D 几何信息
- **Set2Set 读出**：用集合到向量的注意力式读出替代简单求和，提升图级表示能力且保持节点置换不变性
- **Virtual Edges / Master Node**：通过虚拟边或全局主节点增强长程信息传播，缓解有限 message passing 步数的问题
- **Multiple Towers**：把 \(d\) 维节点表示拆成 \(k\) 个子表示并行传播，将密集图上的复杂度近似从 \(O(n^2d^2)\) 降到 \(O(n^2d^2/k)\)
- **QM9 任务验证**：在 约 13 万个小有机分子的 13 个量子化学性质上评估，Edge Network + Set2Set 的 enn-s2s 表现最好
- **方法论影响**：MPNN 成为后续分子 GNN、3D GNN 和图表示学习论文描述模型结构的基础语言

#### 🔬 深入细节

##### 模型架构图与可访问来源

![MPNN 分子量子性质预测示意图](https://ar5iv.labs.arxiv.org/html/1704.01212/assets/x1.png)
*图：论文 Figure 1。MPNN 在分子图上执行可学习的消息传递，用快速神经网络近似昂贵的 DFT 量子化学计算。*

可访问来源：PMLR 论文页 https://proceedings.mlr.press/v70/gilmer17a.html；PDF https://proceedings.mlr.press/v70/gilmer17a/gilmer17a.pdf；arXiv HTML 图像页 https://ar5iv.labs.arxiv.org/html/1704.01212。

##### 算法伪代码

```python
# Message Passing Neural Network for molecular property prediction
def mpnn_predict(graph, node_features, edge_features, T):
    # h_v^0: atom features, padded/projected to hidden dimension d
    h = {v: init_atom_state(node_features[v]) for v in graph.nodes}

    # Message passing phase
    for t in range(T):
        new_h = {}
        for v in graph.nodes:
            m_v = 0
            for w in graph.neighbors(v):
                e_vw = edge_features[v, w]
                # Edge Network example: A(e_vw) is a learned d x d matrix
                m_v += message_fn(h[v], h[w], e_vw)
            new_h[v] = update_fn(h[v], m_v)  # often a GRU
        h = new_h

    # Readout phase: permutation-invariant graph representation
    graph_emb = readout_fn([h[v] for v in graph.nodes])  # sum / gated sum / Set2Set
    y_hat = mlp(graph_emb)
    return y_hat
```

##### MPNN 的统一抽象

论文将图 \(G\) 表示为节点特征 \(x_v\) 和边特征 \(e_{vw}\)。在第 \(t\) 步，节点 \(v\) 从邻居 \(w\in\mathcal{N}(v)\) 收集消息：

$$
m_v^{t+1} = \sum_{w\in\mathcal{N}(v)} M_t(h_v^t, h_w^t, e_{vw})
$$

再用更新函数得到下一步节点状态：

$$
h_v^{t+1} = U_t(h_v^t, m_v^{t+1})
$$

运行 \(T\) 步后，用读出函数将节点集合聚合为图级输出：

$$
\hat{y} = R(\{h_v^T \mid v\in G\})
$$

这个定义的关键是 \(R\) 必须对节点排列不变，否则同一个分子换一种原子编号会得到不同预测。论文的贡献之一是指出许多看似不同的图神经网络只是在 \(M_t,U_t,R\) 的实现上不同。

##### 统一已有模型的方式

GG-NN 可写成离散边类型矩阵乘法：

$$
M(h_v,h_w,e_{vw}) = A_{e_{vw}}h_w,\quad
U(h_v,m_v)=\mathrm{GRU}(h_v,m_v)
$$

Interaction Networks 则让消息依赖源节点、目标节点和边：

$$
M(h_v,h_w,e_{vw}) = f([h_v,h_w,e_{vw}])
$$

DTNN 可看作对连续距离特征进行门控乘法后更新节点。MPNN 抽象让这些模型可以在同一个化学任务上比较：到底是消息函数、更新函数、输入几何信息还是读出函数带来性能提升。

##### Edge Network：连续边特征的核心变体

分子不只是拓扑图。QM9 提供了低能构象的 3D 原子坐标，原子间距离对偶极矩、HOMO/LUMO、能量等性质都很重要。GG-NN 的 \(A_{e_{vw}}\) 只能处理离散边类型，如 single/double/triple/aromatic bond，难以利用连续距离。MPNN 因此提出 Edge Network：

$$
M(h_v,h_w,e_{vw}) = A(e_{vw})h_w
$$

其中 \(A(\cdot)\) 是一个小神经网络，把边特征 \(e_{vw}\) 映射为 \(d\times d\) 矩阵。若使用 raw distance feature，边特征可以包含欧氏距离和键类型 one-hot；若没有空间信息，则只用化学键类型。Edge Network 的直觉是：不同距离和键型应对应不同的消息变换，而这种变换不应被限制在少数离散矩阵中。

##### 虚拟图元素和长程相互作用

有限 \(T\) 步消息传递意味着一个节点只能看到 \(T\)-hop 邻域。小分子中很多性质依赖长程相互作用，尤其当输入包含空间距离时，非键合原子之间的距离也可能重要。论文探索了两种增强：

- **Virtual Edge**：为未直接相连的节点对添加特殊虚拟边，让远距离节点也能在一步内交换信息
- **Master Node**：加入一个连接所有节点的 latent node，作为全局 scratch space，每个原子每轮都能写入和读取全局信息

Master Node 的复杂度为：

$$
O(|E|d^2 + nd_{master}^2)
$$

因此可以在不把所有原子对都显式变成高维边的情况下，增加全局信息通道。

##### Set2Set 与 Multiple Towers

读出阶段要把节点集合变成分子级向量。简单求和能保持置换不变，但表达力有限。论文使用 Set2Set 读出，先把每个节点的 \((h_v^T,x_v)\) 投影，再通过多步注意力产生图级 embedding \(q_t^\*\)，最后接 MLP 输出 13 个回归目标。它的优势是可以学习“哪些原子状态对当前分子性质更重要”，而不是所有节点等权求和。

Multiple Towers 解决扩展隐藏维度时的计算成本问题。对密集图，单步消息传递复杂度约为：

$$
O(n^2d^2)
$$

将 \(d\) 维节点状态拆成 \(k\) 个 \(d/k\) 维 tower，分别传播后再混合：

$$
(h_v^{t,1},h_v^{t,2},\ldots,h_v^{t,k})
= g(\tilde{h}_v^{t,1},\tilde{h}_v^{t,2},\ldots,\tilde{h}_v^{t,k})
$$

理论复杂度变为：

$$
O\left(k\cdot n^2\left(\frac{d}{k}\right)^2\right)
= O\left(\frac{n^2d^2}{k}\right)
$$

这相当于用多个较小通道近似一个大表示，在保留节点置换不变性的同时降低计算量。

##### 训练与 QM9 评估

QM9 包含约 13.4 万个由 H/C/N/O/F 构成的小有机分子，每个分子有 DFT 计算得到的 13 个性质。论文使用约 110k 训练、10k 验证、10k 测试，并用 MAE 评估。训练目标可写成标准多目标或单目标回归损失：

$$
\mathcal{L}_{MSE} =
\frac{1}{B}\sum_{b=1}^{B}\sum_{k=1}^{13}
\left(\hat{y}_{b,k}-y_{b,k}\right)^2
$$

论文特别报告误差与 chemical accuracy 的比值，低于 1 表示达到化学精度。最佳模型 enn-s2s 在所有 13 个目标上达到当时 SOTA，单模型在 11/13 个目标上达到化学精度；5 模型集成进一步降低误差。仅使用分子拓扑、没有 3D 空间信息时，模型仍能在 5/13 个目标达到化学精度，说明消息传递本身已经能学习大量化学结构信息。

##### 方法机制的直觉

MPNN 适合分子，是因为它的归纳偏置和化学系统匹配：原子是节点，键和距离是边，局部相互作用通过消息逐步传播，最终性质通常是整个分子的函数。与 Coulomb matrix、手工 fingerprints 等特征工程相比，MPNN 不需要预先指定每一种化学模式，而是学习哪些邻域、距离和原子组合对目标性质有用。

但 MPNN 也暴露了后续研究的方向。它没有显式保证三维旋转/平移等变性，只是把距离作为边特征；它对长程相互作用依赖虚拟边或主节点；在更大分子上，完整 pairwise 消息的复杂度和分布外泛化会成为瓶颈。这些问题后来推动了 SchNet、DimeNet、GemNet、PaiNN、Equiformer 等几何 GNN 的发展。

##### 与传统分子机器学习的区别

| 维度 | 手工特征/KRR/ECFP 等 | MPNN |
|------|----------------------|------|
| 表示方式 | Coulomb matrix、fingerprint、人工描述符 | 从原子/边特征端到端学习图表示 |
| 不变性 | 需要精心设计或数据增强 | 节点聚合和 readout 天然对图同构/排列不变 |
| 几何信息 | 常作为固定描述符输入 | Edge Network 可学习连续边特征如何变换消息 |
| 可解释框架 | 各模型形式分散 | 统一为 \(M,U,R\) 三个组件便于比较和扩展 |
| 主要局限 | 表征能力受手工设计限制 | 缺少显式等变性，长程和大图扩展仍需改进 |

> 💡 关键：MPNN 的最大价值不只是一个 QM9 模型，而是把“在图上学习可微消息传递算法”变成标准接口；后续模型大多可以继续用消息函数、更新函数、读出函数这三个位置来解释。

#### 🧪 练习题

```yaml
question: "MPNN 中 Edge Network 消息函数的主要作用是什么？"
options:
  - "把所有节点特征直接求平均，避免使用边信息"
  - "用神经网络从连续边特征生成消息变换矩阵，从而利用原子间距离等 3D 几何信息"
  - "只允许模型处理离散单键、双键、三键和芳香键"
  - "替代读出函数，使模型不再需要图级聚合"
answer: 1
explain: "Edge Network 将边特征 e_vw 映射为矩阵 A(e_vw)，再作用于邻居隐藏状态 h_w，因此能处理连续距离和键类型，而不是固定使用离散边类型矩阵。"
```
