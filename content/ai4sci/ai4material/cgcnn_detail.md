### CGCNN — 晶体图卷积神经网络 (Crystal Graph Convolutional NN)

```yaml
id: cgcnn
name: CGCNN
full_name: "晶体图卷积神经网络 (Crystal Graph Convolutional NN)"
year: "2018"
org: MIT
paper_url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.120.145301"
category: gnn_representation
parent: schnet
motivation: "首个通用晶体GNN捕捉周期性"
```

#### 📝 一句话总结

CGCNN 提出把周期晶体直接表示为带原子与键特征的无向多重图，并在图上做残差式卷积与池化，解决了传统材料机器学习依赖手工固定长度描述符、难以统一处理不同晶体结构的问题。

#### 🎯 核心要点

- **晶体图表示**：节点表示原胞中的原子，边表示周期边界下的近邻连接；同一对原子可因周期镜像产生多条边，因此是多重图
- **原子与键特征**：节点特征编码元素属性，边特征编码原子间距离或键类型，模型可从 CIF 结构直接学习结构-性质关系
- **图卷积更新**：每层用中心原子、邻居原子与键特征共同生成消息，并通过门控项控制邻居信息写入
- **残差式卷积**：最终采用 \(v_i^{(t+1)} = v_i^{(t)} + \sum_{j,k} \sigma(\cdot)\odot g(\cdot)\)，缓解多层图卷积的信息丢失
- **晶体级池化**：对所有原子的最终表示做归一化池化，得到固定长度晶体向量，再接全连接层预测标量性质
- **数据与任务**：在 Materials Project 的 DFT 数据上评估形成能、带隙、费米能、体模量、剪切模量、泊松比等多种晶体性质
- **可解释性设计**：可把最终局域环境表示映射到每个原子的局域贡献，用钙钛矿示例总结稳定性筛选规则

#### 🔬 深入细节

![CGCNN 晶体图与卷积网络示意图](https://ar5iv.labs.arxiv.org/html/1710.10324/assets/fig1.png)
*图：CGCNN Figure 1，展示从周期晶体构建晶体图，以及在晶体图上堆叠卷积层、池化层和输出层的流程。原论文发表于 PRL，开放版本见 arXiv:1710.10324。*

##### 算法伪代码

```python
# CGCNN 核心流程伪代码
for crystal in dataset:
    graph = build_periodic_multigraph(crystal, cutoff_radius)
    # node: atom feature v_i, edge: bond/distance feature u_(i,j,k)

    for t in range(num_conv_layers):
        next_v = {}
        for atom_i in graph.nodes:
            msg_sum = 0
            for atom_j, edge_k in graph.neighbors_with_periodic_images(atom_i):
                z = concat(v[atom_i], v[atom_j], u[(atom_i, atom_j, edge_k)])
                gate = sigmoid(z @ W_f[t] + b_f[t])
                candidate = softplus(z @ W_s[t] + b_s[t])
                msg_sum += gate * candidate
            next_v[atom_i] = v[atom_i] + msg_sum
        v = next_v

    crystal_vector = normalize(sum(v_i for v_i in v.values()), len(graph.nodes))
    y_pred = mlp(crystal_vector)
    loss = regression_or_classification_loss(y_pred, y_true)
    loss.backward()
```

##### 动机与背景

CGCNN 之前，材料性质预测常见做法是把晶体转成固定长度手工特征，例如组成统计量、局部环境指纹或对称不变量。这类表示有两个问题：一是不同性质和不同结构体系往往需要重新设计特征；二是复杂坐标变换虽然能保证平移、旋转、置换不变性，却会牺牲模型对局域化学环境的可解释性。

CGCNN 的核心选择是回到晶体本身的连接关系：晶体可以被看成周期图，原子是节点，近邻关系是边。由于周期性，同一对原胞内原子可能通过不同晶胞镜像形成多条连接，论文把它建模为无向多重图 \(\mathcal{G}\)。这种表示既保留了原子身份和键长，又天然适配不同大小、不同组成、不同空间群的晶体。

##### 图卷积机制

初始时，每个原子 \(i\) 有节点向量 \(\mathbf{v}_i\)，每条边 \((i,j)_k\) 有键向量 \(\mathbf{u}_{(i,j)_k}\)。直观上，一层卷积把“中心原子、邻居原子、两者之间的键”拼接成消息输入：

$$
\mathbf{z}_{(i,j)_k}^{(t)} =
\mathbf{v}_i^{(t)} \oplus \mathbf{v}_j^{(t)} \oplus \mathbf{u}_{(i,j)_k}
$$

论文先给出一种普通图卷积形式，即对邻居特征求和后做非线性变换；最终实际采用更稳定的门控残差版本：

$$
\mathbf{v}_i^{(t+1)} =
\mathbf{v}_i^{(t)} +
\sum_{j,k}
\sigma\left(\mathbf{z}_{(i,j)_k}^{(t)} \mathbf{W}_f^{(t)} + \mathbf{b}_f^{(t)}\right)
\odot
g\left(\mathbf{z}_{(i,j)_k}^{(t)} \mathbf{W}_s^{(t)} + \mathbf{b}_s^{(t)}\right)
$$

其中 \(\sigma\) 是 sigmoid 门控函数，\(g\) 通常为 softplus，\(\odot\) 是逐元素乘法。门控项决定某个邻居-键消息对中心原子的贡献强度；残差项 \(\mathbf{v}_i^{(t)}\) 保留上一层原子表示，减少深层传播时的信息覆盖。

> 💡 关键：CGCNN 的“卷积核”不是固定网格上的卷积模板，而是根据中心原子、邻居原子和边特征动态计算的局域环境更新函数。

##### 池化与性质预测

经过 \(R\) 层卷积后，\(\mathbf{v}_i^{(R)}\) 表示以原子 \(i\) 为中心、半径随层数扩大的局域化学环境。晶体性质通常是全局标量，因此需要把任意数量的原子表示汇聚成固定长度向量：

$$
\mathbf{v}_c = \mathrm{Pool}\left(\mathbf{v}_0^{(R)}, \mathbf{v}_1^{(R)}, \ldots, \mathbf{v}_N^{(R)}\right)
$$

实践中可用求和或平均并做尺寸归一化，保证不同原胞大小的晶体可比较。之后接若干全连接层输出回归值或分类概率。对于形成能、带隙、弹性模量等回归任务，常用 MAE/MSE 类损失：

$$
\mathcal{L}_{\mathrm{reg}} = \frac{1}{B}\sum_{b=1}^{B}\left|\hat{y}_b - y_b\right|
$$

##### 可解释性：从全局性质回到局域环境

CGCNN 的一个重要设计是可把最终原子表示映射为局域贡献 \(\tilde{v}_i\)，再用求和得到晶体性质：

$$
\hat{y}_c = \sum_i \tilde{v}_i
$$

这使模型不仅能预测“这个晶体的形成能是多少”，还能分析“哪些局域化学环境贡献了更低或更高的能量”。论文在钙钛矿 \(ABX_3\) 搜索中用该机制解释 A/B/X 位点对稳定性的贡献，并把高通量候选空间缩小到更容易验证的范围。

##### 与此前材料表示方法的区别

与手工特征方法相比，CGCNN 不需要为每个性质单独设计描述符，而是从晶体图自动学习局域环境表征；与只使用分子图的早期 GNN 相比，它明确处理晶体周期性和多重边；与 SchNet 这类连续滤波模型相比，CGCNN 更强调晶体材料场景中的结构输入、周期邻接、池化和局域贡献解释。

它的局限也很清楚：CGCNN 主要依赖距离截断内的局部连接，对长程库仑、磁性、电荷态等物理量没有显式建模；边特征以距离为主，角度和高阶几何关系需要后续模型（如 DimeNet、ALIGNN、GemNet）进一步补足。

#### 🧪 练习题

```yaml
question: "CGCNN 为什么把晶体表示为无向多重图，而不是普通分子图？"
options:
  - "因为晶体中的所有原子都必须互相连接"
  - "因为周期边界会让同一对原胞原子通过不同镜像产生多条近邻边"
  - "因为多重图可以避免使用原子特征"
  - "因为多重图只适用于分类任务"
answer: 1
explain: "晶体具有周期性，同一对原胞内原子可能通过不同晶胞镜像相邻，因此需要多条边记录不同周期连接和距离信息。"
```
