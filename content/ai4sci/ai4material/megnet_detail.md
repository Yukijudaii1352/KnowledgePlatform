### MEGNet — 材料图网络 (MatErials Graph Network)

```yaml
id: megnet
name: MEGNet
full_name: "材料图网络 (MatErials Graph Network)"
year: "2019"
org: UCSD
paper_url: "https://pubs.acs.org/doi/10.1021/acs.chemmater.9b01294"
category: gnn_representation
parent: cgcnn
motivation: "全局状态向量实现多属性预测"
```

#### 📝 一句话总结

MEGNet 把材料结构表示为包含节点、边和全局状态 \(\mathbf{u}\) 的 Graph Network，并通过边更新、节点更新、全局更新的模块化流程统一预测分子与晶体性质，尤其解决了温度、压力、熵等状态变量难以进入传统材料 GNN 的问题。

#### 🎯 核心要点

- **Graph Network 三元组**：材料图由原子属性 \(V\)、键属性 \(E\) 和全局状态 \(\mathbf{u}\) 组成，而不是只有节点和边
- **三阶段更新**：每个 MEGNet block 依次更新边、聚合到节点、再聚合到全局状态，显式实现结构-状态-性质关系学习
- **全局状态向量**：温度、压力、熵等状态变量可作为 \(\mathbf{u}\) 输入，用单个模型统一预测 \(U_0\)、\(U\)、\(H\)、\(G\) 等相关自由能量
- **通用材料框架**：同一模型范式覆盖 QM9 分子数据和 Materials Project 晶体数据，不局限于某一类结构或性质
- **晶体性能**：在约 60,000 个 Materials Project 晶体上预测形成能、带隙、弹性模量等，形成能 MAE 达到约 \(0.028\ \mathrm{eV/atom}\)
- **嵌入可迁移**：由形成能任务学到的元素 embedding 呈现周期表化学趋势，可迁移到带隙、弹性模量等小数据任务
- **与 CGCNN 的关系**：MEGNet 可看作把 CGCNN/MPNN 扩展到包含全局状态和更标准 Graph Network 更新函数的材料框架

#### 🔬 深入细节

![MEGNet 模块示意图](https://ar5iv.labs.arxiv.org/html/1812.05055/assets/x1.png)
*图 1：MEGNet block 的 Graph Network 更新流程，包含边、节点和全局状态三类属性。开放版本见 arXiv:1812.05055。*

![MEGNet 统一自由能模型示意图](https://ar5iv.labs.arxiv.org/html/1812.05055/assets/x2.png)
*图 2：通过全局状态输入温度、压力和熵，把多个热力学能量预测统一到一个模型中。*

##### 算法伪代码

```python
# MEGNet 核心流程伪代码
graph = build_graph(structure, cutoff=4.0)  # molecules or crystals
V = atom_embedding(atomic_numbers)
E = gaussian_expand(pair_distances)
u = global_state_vector  # e.g. [temperature, pressure_flag, entropy_flag]

for block in range(num_megnet_blocks):
    # 1. edge update: bond sees sender, receiver, old bond, global state
    for edge_k in graph.edges:
        sender = graph.sender(edge_k)
        receiver = graph.receiver(edge_k)
        E_new[edge_k] = phi_e(concat(E[edge_k], V[sender], V[receiver], u))

    # 2. node update: aggregate incoming updated edges, then update atom state
    for node_i in graph.nodes:
        incoming = aggregate(E_new[e] for e in graph.in_edges(node_i))
        V_new[node_i] = phi_v(concat(V[node_i], incoming, u))

    # 3. global update: aggregate all edges and all nodes, then update u
    e_bar = aggregate(E_new.values())
    v_bar = aggregate(V_new.values())
    u = phi_u(concat(u, e_bar, v_bar))

    V, E = V_new, E_new

graph_repr = set2set_readout(V, E, u)
y_pred = mlp(graph_repr)
loss = mean_absolute_error(y_pred, y_true)
```

##### 动机与背景

CGCNN 证明了晶体可以用图神经网络直接学习性质，但它的图主要由原子和键构成，缺少显式的“状态”输入。材料性质并不总是结构唯一决定的：自由能依赖温度，焓依赖压力，某些实验或计算条件也会改变目标值。如果把每个状态下的性质都训练成一个独立模型，不仅数据利用率低，也忽略了热力学量之间的关系。

MEGNet 的出发点是 Graph Network 框架：图不仅有节点和边，还应有一个全局状态向量 \(\mathbf{u}\)。对材料而言，节点是原子，边是键或近邻距离，全局状态可以是温度、压力、熵标记、外场或任何结构外条件。这样模型学习的是 quantitative structure-state-property relationship，而不仅是 structure-property relationship。

##### Graph Network 更新公式

MEGNet 把图定义为：

$$
G = (\mathbf{u}, V, E)
$$

其中 \(V=\{\mathbf{v}_i\}_{i=1}^{N^v}\) 是原子属性集合，\(E=\{(\mathbf{e}_k, r_k, s_k)\}_{k=1}^{N^e}\) 是键属性及其接收/发送节点索引，\(\mathbf{u}\) 是全局状态。每个 block 的核心更新可以写成：

$$
\mathbf{e}'_k = \phi^e(\mathbf{e}_k, \mathbf{v}_{r_k}, \mathbf{v}_{s_k}, \mathbf{u})
$$

$$
\bar{\mathbf{e}}'_i = \rho^{e \rightarrow v}(E'_i), \qquad
\mathbf{v}'_i = \phi^v(\bar{\mathbf{e}}'_i, \mathbf{v}_i, \mathbf{u})
$$

$$
\bar{\mathbf{e}}' = \rho^{e \rightarrow u}(E'), \qquad
\bar{\mathbf{v}}' = \rho^{v \rightarrow u}(V'), \qquad
\mathbf{u}' = \phi^u(\bar{\mathbf{e}}', \bar{\mathbf{v}}', \mathbf{u})
$$

这里 \(\phi^e,\phi^v,\phi^u\) 通常由 MLP 实现，\(\rho\) 是对边或节点集合的置换不变聚合函数。这样的顺序让键先看到两端原子和全局状态，原子再看到周围键环境，全局状态最后吸收整张图的信息。

> 💡 关键：\(\mathbf{u}\) 不是最终读出时才拼进去的辅助特征，而是参与每个 block 的边、节点、全局更新，因此状态变量会持续调制局域相互作用。

##### 输入特征与读出

在分子任务中，边通常由键类型和距离构成；在晶体任务中，边来自截断半径内的原子对，距离通过高斯基展开成连续特征：

$$
e_m(r) = \exp\left[-\frac{(r-\mu_m)^2}{\sigma^2}\right]
$$

节点由元素编号经过 embedding 得到。经过多个 MEGNet blocks 后，模型用 Set2Set 等集合读出方式把节点、边和全局状态变为固定长度表示，再接 MLP 输出目标性质。训练损失多为回归 MAE/MSE，例如：

$$
\mathcal{L} = \frac{1}{B}\sum_{b=1}^{B}|\hat{y}_b-y_b|
$$

##### 全局状态如何统一自由能模型

论文最有代表性的例子是把 QM9 中四个相关能量 \(U_0\)、\(U\)、\(H\)、\(G\) 放到一个模型里。它们满足热力学关系：

$$
H = U + PV, \qquad G = U + PV - TS
$$

MEGNet 用全局状态 \(\mathbf{u}\) 编码不同任务所处的状态，例如温度 \(T\)、是否包含压力项 \(P\)、是否包含熵项 \(S\)。这样同一套结构参数可以根据 \(\mathbf{u}\) 输出不同能量，等价于把原本四个模型合并为一个条件模型。论文报告统一自由能模型整体 MAE 约 \(0.010\ \mathrm{eV}\)，与分别训练模型相当，但训练样本量相当于多任务共享后变大。

##### 元素 embedding 与迁移学习

MEGNet 的原子 embedding 不是静态元素表，而是在大规模性质预测中学习得到。形成能任务上的 embedding 会自然呈现元素周期趋势：相似族元素在 embedding 空间中接近，化学性质差异大的元素分离。论文进一步用形成能模型的元素 embedding 初始化带隙和弹性模量等数据更少的任务，提升小数据任务表现。

##### 与 CGCNN 和 SchNet 的区别

CGCNN 的核心是晶体图上的局域卷积和池化；SchNet 强调连续距离滤波器；MEGNet 则把它们统一到更一般的 Graph Network 框架，并加入全局状态更新。它的优势是表达材料性质中的外部条件和全局上下文，代价是模型结构更复杂，对数据规模、状态变量定义和读出方式更敏感。

#### 🧪 练习题

```yaml
question: "MEGNet 中全局状态向量 u 的主要作用是什么？"
options:
  - "只在最后一层替代池化操作"
  - "编码温度、压力等结构外状态，并参与边、节点和全局更新"
  - "把所有节点特征压缩成一个原子编号"
  - "强制模型只能预测形成能"
answer: 1
explain: "MEGNet 的 u 是 Graph Network 的全局属性，进入每个 block 的边更新、节点更新和全局更新，因此可让状态变量调制整个消息传递过程。"
```
