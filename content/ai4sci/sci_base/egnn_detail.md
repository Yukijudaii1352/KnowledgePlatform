### EGNN

```yaml
id: egnn
name: EGNN
full_name: E(n)等变图神经网络 (E(n) Equivariant GNN)
year: '2021'
org: UvA
paper_url: https://arxiv.org/abs/2102.09844
category: neural_operator
parent: —
motivation: E(n)等变性保证旋转平移不变
```

#### 📝 一句话总结

EGNN 提出了一种只用标量消息和相对坐标向量更新节点坐标的 E(n) 等变图神经网络，解决了 3D 分子、点云和 N-body 系统中普通 GNN 不满足旋转、平移、反射等对称性的问题，同时避免了球谐函数和高阶张量表示的计算开销。

#### 🎯 核心要点

- **E(n) 等变目标**：同时满足平移、旋转、反射等变，以及节点置换等变，适用于任意维欧氏空间中的点集图
- **EGCL 层设计**：每层同时更新节点特征 \(h_i\) 和坐标 \(x_i\)，坐标更新由相对向量 \((x_i-x_j)\) 与标量边权相乘得到
- **距离驱动消息**：边消息输入包括节点特征、边属性和平方距离 \(\|x_i-x_j\|^2\)，保证消息本身对 E(n) 变换不变
- **无需高阶表示**：不使用 spherical harmonics、Clebsch-Gordan 系数或 irreducible representation，计算上比 TFN/SE(3)-Transformer 更轻
- **特征不变、坐标等变**：节点隐藏特征保持旋转/平移不变，坐标输出随输入几何变换同步变换
- **支持速度扩展**：在动力系统中可加入速度 \(v_i\)，用等变方式预测动量或位移
- **可学习边关系**：当图结构未知时，可以从边消息中推断软邻接 \(e_{ij}\)，再调制消息聚合
- **验证场景多样**：论文在带电粒子 N-body、图自编码器、QM9 分子属性预测上验证 EGNN 的数据效率和性能

#### 🔬 深入细节

##### 等变示意图

![EGNN 旋转等变示意图](https://ar5iv.labs.arxiv.org/html/2102.09844/assets/x1.png)
*图：对输入图先旋转再经过网络，与先经过网络再旋转输出应得到一致结果。来源为论文 ar5iv 页面 Figure 1。*

论文来源：arXiv 论文页 https://arxiv.org/abs/2102.09844；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/2102.09844。

普通 GNN 只关心图上的节点和边，天然满足节点重编号下的置换等变，却不保证三维坐标的几何对称性。对分子或物理粒子系统来说，把整个系统旋转、平移或镜像，不应该改变标量属性；如果任务输出坐标或速度，输出也应该被同样旋转、平移或镜像。EGNN 的设计目标就是把这种物理归纳偏置直接写入消息传递层。

给定图 \(G=(V,E)\)，每个节点有标量特征 \(h_i^l\) 和坐标 \(x_i^l \in \mathbb{R}^n\)。第 \(l\) 个 Equivariant Graph Convolutional Layer 首先为每条边构造不变消息：

$$m_{ij}=\phi_e\left(h_i^l,h_j^l,\|x_i^l-x_j^l\|^2,a_{ij}\right)$$

其中 \(\phi_e\) 是 MLP，\(a_{ij}\) 是可选边属性。关键是只把平方距离送入 \(\phi_e\)，而不是直接把绝对坐标送入 MLP；平方距离在平移、旋转和反射下都不变。

##### 核心算法伪代码

```python
# One EGNN / EGCL layer
def egcl_layer(h, x, edge_attr, edges):
    # h[i]: invariant node feature, x[i]: equivariant coordinate
    messages = {}
    coord_delta = {i: 0 for i in nodes}
    agg = {i: 0 for i in nodes}

    for i, j in edges:
        r2 = squared_norm(x[i] - x[j])
        m_ij = phi_e(concat(h[i], h[j], r2, edge_attr[i, j]))
        messages[i, j] = m_ij

        # scalar weight times relative vector: still transforms as a vector
        w_ij = phi_x(m_ij)
        coord_delta[i] += (x[i] - x[j]) * w_ij
        agg[i] += m_ij

    for i in nodes:
        x_next[i] = x[i] + coord_delta[i] / max(1, degree(i))
        h_next[i] = phi_h(concat(h[i], agg[i]))

    return h_next, x_next
```

##### 坐标更新为什么等变

EGNN 的核心坐标更新为：

$$x_i^{l+1}=x_i^l+C\sum_{j\neq i}(x_i^l-x_j^l)\phi_x(m_{ij})$$

这里 \(C\) 常取 \(1/(M-1)\) 或邻居数归一化，\(\phi_x(m_{ij})\) 输出标量。设整体坐标做 E(n) 变换 \(x_i \mapsto Qx_i+g\)，其中 \(Q\) 是正交矩阵、\(g\) 是平移向量，则相对向量满足：

$$x_i-x_j \mapsto Q(x_i-x_j)$$

平方距离不变：

$$\|Qx_i+g-(Qx_j+g)\|^2=\|Q(x_i-x_j)\|^2=\|x_i-x_j\|^2$$

因此 \(m_{ij}\) 和 \(\phi_x(m_{ij})\) 都不变，而相对向量整体乘上 \(Q\)。求和后坐标增量也乘上 \(Q\)，最后再加上被同样变换的 \(x_i\)，所以 \(x_i^{l+1}\) 与输入坐标保持同样的旋转、反射和平移关系。

节点特征更新则只依赖不变消息的聚合：

$$m_i=\sum_{j\neq i}m_{ij},\qquad h_i^{l+1}=\phi_h(h_i^l,m_i)$$

所以 \(h_i\) 是 E(n) 不变的标量表示。对分子能量、图分类等标量任务，可以进一步使用 permutation-invariant readout，例如 \(\hat{y}=\rho(\sum_i h_i^L)\)；对坐标预测任务，则直接读取 \(x_i^L\)。

##### 与 GNN、SchNet 和 SE(3) 方法的区别

标准 GNN 消息一般写作：

$$m_{ij}=\phi_e(h_i,h_j,a_{ij}),\qquad h_i'=\phi_h(h_i,\sum_j m_{ij})$$

它没有坐标更新机制，若把坐标直接拼进特征，MLP 会学习到依赖坐标系方向和原点位置的函数，旋转或平移输入会破坏预测一致性。SchNet 等距离型模型能输出旋转不变的标量属性，但如果需要输出坐标或速度，仅依赖距离不足以产生等变向量场。

TFN、SE(3)-Transformer 通过不可约表示和球谐函数在特征通道中维护不同阶张量，表达力强，但计算复杂且主要面向三维空间。EGNN 选择更朴素的路径：所有可学习消息都是标量，唯一的向量来源是相对坐标 \((x_i-x_j)\)。这个约束降低了表示复杂度，却足以覆盖很多 AI4Sci 中常见的标量-向量任务。

##### 速度扩展与动力系统建模

在 N-body 预测中，粒子还带有速度 \(v_i\)。论文给出带速度的变体：

$$v_i^{l+1}=\phi_v(h_i^l)v_i^l+C\sum_{j\neq i}(x_i^l-x_j^l)\phi_x(m_{ij})$$

$$x_i^{l+1}=x_i^l+v_i^{l+1}$$

\(\phi_v(h_i^l)\) 是标量门控，因此 \(v_i\) 在旋转或反射下仍作为向量等变变换。这个形式接近学习一个物理向量场：节点特征决定相互作用强弱，相对位置决定力或位移方向。

##### 边推断与训练目标

如果图的邻接未知，EGNN 可以先假设全连接图，再用边消息估计软边：

$$e_{ij}=\phi_{\mathrm{inf}}(m_{ij})$$

并在消息聚合时用 \(e_{ij}m_{ij}\) 进行加权。这适合粒子系统或点云中“哪些对象真正相互作用”未知的场景。

训练损失由任务决定。N-body 坐标预测通常使用位置 MSE：

$$\mathcal{L}_{\mathrm{pos}}=\frac{1}{BN}\sum_{b=1}^{B}\sum_{i=1}^{N}\|\hat{x}_{b,i}^{T}-x_{b,i}^{T}\|_2^2$$

QM9 分子属性预测则对分子级标量属性使用 MAE/MSE 监督。核心收益来自结构性约束：模型不需要从数据中反复学习“同一个物理系统旋转后仍是同一个系统”，因此在小数据和需要几何泛化的任务上更省样本。

> 💡 关键：EGNN 的等变性不是靠数据增强学出来的，而是由“距离生成标量消息、相对坐标生成向量更新”这两个设计保证的。

#### 🧪 练习题

```yaml
question: "EGNN 坐标更新保持 E(n) 等变性的关键原因是什么？"
options:
  - "把绝对坐标直接输入一个足够大的 MLP"
  - "用平方距离产生标量边权，再乘以相对坐标向量进行坐标更新"
  - "在每一层随机旋转训练样本以增强数据"
  - "只使用全连接图而不使用边属性"
answer: 1
explain: "平方距离在旋转、平移、反射下不变，标量权重不随坐标系改变；相对坐标向量会按同样的正交变换旋转，因此加权和仍是等变向量。"
```
