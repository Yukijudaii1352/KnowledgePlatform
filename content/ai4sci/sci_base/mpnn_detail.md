### MPNN

```yaml
id: mpnn
name: MPNN
full_name: 消息传递神经网络 (Message Passing Neural Network)
year: '2017'
org: Google
paper_url: https://arxiv.org/abs/1704.01212
category: molecular
parent: —
motivation: 统一框架处理图结构分子表征学习
```

#### 📝 一句话总结

MPNN 将多种图神经网络统一为“消息函数、节点更新函数、读出函数”三段式框架，解决了分子图学习中模型形式分散、难以比较和难以利用化学对称性的问题，并在 QM9 量子化学属性预测上验证了这一框架的有效性。

#### 🎯 核心要点

- **统一框架**：把 Molecular Graph Convolution、GG-NN、Interaction Network、DTNN 等方法都写成消息传递与图级读出的共同形式
- **两阶段前向传播**：先进行 \(T\) 轮局部消息聚合与节点状态更新，再用置换不变的 readout 得到整图表示或属性预测
- **化学图归纳偏置**：节点表示原子特征，边表示化学键、距离或空间信息，使模型天然适配分子图结构
- **Edge Network 消息函数**：用边特征生成线性变换矩阵，让连续距离和键类型直接调制从邻居传来的信息
- **Set2Set 读出**：用面向集合的读出模型替代简单求和，提升对可变大小分子图的表达能力并保持节点顺序不变性
- **长程信息设计**：通过虚拟边或 master node 缩短远距离节点的信息传播路径，缓解纯局部消息传递的深度需求
- **Multiple Towers 加速**：将高维节点隐状态拆成多个低维 tower 独立传播后混合，降低大隐藏维度下的计算成本
- **QM9 实证结果**：在 13 个 DFT 属性预测任务上取得当时最优结果，最佳 MPNN 变体在 11/13 个目标上达到化学精度

#### 🔬 深入细节

##### 框架总览

![MPNN 量子化学属性预测示意图](https://ar5iv.labs.arxiv.org/html/1704.01212/assets/x1.png)
*图：MPNN 用分子图近似昂贵的 DFT 计算，从原子和键的结构信息预测能量、振动频率等量子化学属性。来源为论文 ar5iv 页面 Figure 1。*

论文来源：arXiv 论文页 https://arxiv.org/abs/1704.01212；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1704.01212。

MPNN 的关键不是提出单一网络层，而是给分子图学习提供一个抽象接口。给定分子图 \(G=(V,E)\)，每个原子 \(v\) 有节点特征 \(x_v\)，每条边 \((v,w)\) 有边特征 \(e_{vw}\)。模型维护每个节点的隐状态 \(h_v^t\)，初始状态通常由原子特征填充或投影得到：

$$h_v^0 = \mathrm{pad}(x_v)$$

每一轮消息传递中，节点 \(v\) 从所有邻居 \(w \in N(v)\) 接收消息并聚合：

$$m_v^{t+1} = \sum_{w \in N(v)} M_t(h_v^t, h_w^t, e_{vw})$$

随后用更新函数刷新节点状态：

$$h_v^{t+1} = U_t(h_v^t, m_v^{t+1})$$

经过 \(T\) 轮后，readout 函数将所有节点状态汇总为图级输出：

$$\hat{y} = R(\{h_v^T \mid v \in V\})$$

这里 \(M_t\)、\(U_t\)、\(R\) 都是可学习的可微函数。由于 readout 接收的是节点状态集合，它必须对节点排列不敏感；这正是分子图属性预测所需的图同构不变性。

##### 核心算法伪代码

```python
# Message Passing Neural Network for graph-level molecular property prediction
def mpnn_forward(graph, atom_features, edge_features, T):
    h = initialize_hidden_states(atom_features)  # h_v^0

    for t in range(T):
        new_h = {}
        for v in graph.nodes:
            m_v = 0
            for w in graph.neighbors(v):
                e_vw = edge_features[(v, w)]
                m_v += message_fn[t](h[v], h[w], e_vw)
            new_h[v] = update_fn[t](h[v], m_v)  # often a GRU
        h = new_h

    graph_embedding = permutation_invariant_readout([h[v] for v in graph.nodes])
    y_hat = output_mlp(graph_embedding)
    return y_hat
```

##### 消息函数：从离散键类型到连续边特征

最基础的 GG-NN 式消息可以写作：

$$M_t(h_v^t, h_w^t, e_{vw}) = A_{e_{vw}}h_w^t$$

其中 \(A_{e_{vw}}\) 是由边标签选择的矩阵，适合单键、双键、芳香键等离散化学键类型。但量子化学属性常常依赖原子间三维距离，仅靠离散键标签不够。论文因此重点探索 Edge Network：

$$M_t(h_v^t, h_w^t, e_{vw}) = A(e_{vw})h_w^t$$

这里 \(A(\cdot)\) 是一个小神经网络，它把边特征 \(e_{vw}\) 映射成矩阵。若 \(e_{vw}\) 包含欧氏距离与键类型 one-hot，消息函数就能根据距离连续地改变邻居信息的线性变换。这比把距离粗暴分桶更平滑，也更适合拟合 DFT 属性。

论文还尝试 Pair Message：

$$M_t(h_v^t, h_w^t, e_{vw}) = f(h_v^t, h_w^t, e_{vw})$$

它让消息同时依赖源节点、目标节点和边，表达力更强，但计算与优化更难。最终表现最好的配置是 Edge Network + Set2Set readout + 显式氢原子。

##### 更新函数与读出函数

节点更新函数常使用 GRU：

$$h_v^{t+1} = \mathrm{GRU}(h_v^t, m_v^{t+1})$$

GRU 的作用是控制新消息与历史状态的融合，避免多轮传播后信息被完全覆盖。对分子图来说，\(T\) 轮传播相当于让每个原子看到 \(T\)-hop 化学环境；更大的 \(T\) 可以引入更远的结构信息，但也增加过平滑和计算成本。

读出函数需要把不同大小的分子图映射到固定维度。简单求和满足置换不变性，但表达力有限。Set2Set 读出用一个序列式注意力过程反复查询节点状态集合，得到更强的图级嵌入：

$$q_t = \mathrm{LSTM}(q_{t-1}^*)$$

$$a_{v,t} = \mathrm{softmax}(h_v^T \cdot q_t), \quad r_t = \sum_v a_{v,t}h_v^T$$

$$q_t^* = [q_t, r_t]$$

直觉上，Set2Set 不是只问“所有原子的平均模式是什么”，而是多次聚焦于不同局部环境，例如官能团、长程相互作用或空间几何贡献。

##### 输入表示与训练目标

论文在 QM9 数据集上做系统实验。节点特征包括原子类型 H/C/N/O/F、原子序数、是否受体/供体、芳香性、杂化类型、氢原子数量等。边特征有三类设置：仅化学键类型、距离分桶、原始距离加键类型 one-hot。实验发现，显式加入氢原子和完整边特征对许多量子化学目标非常重要。

训练时每个目标属性通常单独训练一个模型，预测值 \(\hat{y}\) 与 DFT 标签 \(y\) 的损失为均方误差：

$$\mathcal{L}_{\mathrm{MSE}} = \frac{1}{B}\sum_{i=1}^{B}\|\hat{y}_i - y_i\|_2^2$$

评估使用 MAE，并将 MAE 与化学精度阈值比较。最佳模型的 ensemble 在所有 13 个目标上达到当时 SOTA，并在 11 个目标上达到化学精度。

##### 长程传播：虚拟边、Master Node 与 Towers

纯局部消息传递需要多轮传播才能让远距离原子互相影响。对分子属性，某些电子效应或空间相互作用并不严格局限于共价键邻域。论文测试了两类长程机制：第一类是给非相邻节点添加虚拟边，让信息能在更少步数内跨越分子；第二类是添加 master node，它连接所有原子，作为全局 scratch space，每一轮都收集全图信息再广播回节点。

Multiple Towers 解决的是高维隐藏状态计算昂贵的问题。将 \(d\) 维状态拆成 \(k\) 个较小 tower，各自做消息传递得到临时状态，再通过共享混合网络融合：

$$\tilde{h}_{v,i}^{t+1} = U_i(h_{v,i}^t, m_{v,i}^{t+1}), \quad i=1,\ldots,k$$

$$h_v^{t+1} = g([\tilde{h}_{v,1}^{t+1}, \ldots, \tilde{h}_{v,k}^{t+1}])$$

这保留了节点置换不变性，同时降低了单次传播的矩阵计算规模。论文报告 towers 在无显式氢的距离分桶设置下比 vanilla GG-NN 更快，也有一定泛化收益。

##### 与传统分子特征工程的区别

传统量子化学机器学习常依赖 Coulomb Matrix、Bag of Bonds、ECFP 等手工分子描述符。这些特征要么需要人为设计对称性，要么在图同构、原子排列和空间几何上处理不够自然。MPNN 的优势是把对称性和局部相互作用写入网络结构：同一套消息函数共享于所有原子和边，readout 对节点顺序不敏感，模型能从数据中学习哪些局部环境与目标属性相关。

> 💡 关键：MPNN 的贡献在于抽象出“消息传递 + 置换不变读出”的通用接口。后续许多分子 GNN、材料 GNN 和等变网络都可以看作在消息函数、几何特征或对称性约束上继续强化这一框架。

#### 🧪 练习题

```yaml
question: "MPNN 中 readout 函数必须满足置换不变性的主要原因是什么？"
options:
  - "让模型能够在每一轮传播中减少参数数量"
  - "保证同一个分子图在原子编号改变后仍得到相同图级预测"
  - "让边特征可以从连续距离自动离散化"
  - "强制所有节点拥有完全相同的隐藏状态"
answer: 1
explain: "分子属性不应依赖原子编号。readout 接收节点状态集合并保持置换不变，才能保证同构图得到一致的图级表示和预测。"
```
