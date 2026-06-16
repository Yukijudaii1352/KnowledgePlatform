### EGNN — 等变图神经网络 (Equivariant Graph Neural Networks)

```yaml
id: egnn
name: EGNN
full_name: 等变图神经网络 (Equivariant Graph Neural Networks)
year: '2021'
org: 阿姆斯特丹大学
paper_url: https://proceedings.mlr.press/v139/satorras21a.html
category: physics_constrained
parent: —
motivation: 旋转平移反射等变保证物理一致
```

#### 📝 一句话总结

EGNN 提出了一种不依赖球谐函数和高阶表示的 \(E(n)\)-等变消息传递层：节点特征通过距离不变量传递消息，坐标沿相对位移方向做标量加权更新，从而天然满足平移、旋转、反射和节点置换等变。

#### 🎯 核心要点

- **作用群更一般**：对 \(E(n)\) 群等变，包括 \(n\) 维空间中的平移、旋转与反射，同时保持图节点置换等变
- **不使用高阶表示**：相比 Tensor Field Networks、SE(3)-Transformer 等方法，不需要球谐函数、Clebsch-Gordan 系数或昂贵的 type-\(\ell\) 中间特征
- **坐标与特征双更新**：节点标量特征 \(h_i\) 通过普通消息传递更新，坐标 \(x_i\) 通过相对向量 \((x_i-x_j)\) 乘标量权重更新
- **距离作为不变量输入**：边消息使用 \(\|x_i-x_j\|^2\)，它对旋转、反射和平移不变，因此不会破坏几何对称性
- **可扩展到任意维度**：模型公式与空间维度 \(n\) 无关，不局限于 3D 分子或点云
- **支持速度/动量扩展**：对动力系统可加入速度变量，使坐标更新兼顾初始速度和消息传递得到的相互作用项
- **实验覆盖多域**：N-body 动力学、图自编码器、QM9 分子性质预测，证明等变归纳偏置提升数据效率与泛化

#### 🔬 深入细节

##### 核心示意图

论文主页为 PMLR: https://proceedings.mlr.press/v139/satorras21a.html，PDF 为 http://proceedings.mlr.press/v139/satorras21a/satorras21a.pdf；可访问 HTML 图示来自 ar5iv: https://ar5iv.labs.arxiv.org/html/2102.09844。

![EGNN 旋转等变示意](https://ar5iv.labs.arxiv.org/html/2102.09844/assets/x1.png)
*图：EGNN 期望满足的旋转等变性质。先旋转输入图再过网络，等价于先过网络再旋转输出坐标。*

##### 算法伪代码

```python
# 单层 EGCL / EGNN 消息传递伪代码
def egcl_layer(h, x, edge_attr, edges):
    # h_i: node scalar features, shape [N, d_h]
    # x_i: coordinates in R^n, shape [N, n]
    messages = {}
    coord_updates = zeros_like(x)

    for i, j in edges:
        r2_ij = squared_norm(x[i] - x[j])  # E(n)-invariant
        m_ij = phi_e(concat(h[i], h[j], r2_ij, edge_attr[i, j]))
        messages[(i, j)] = m_ij

        # scalar gate times relative vector: equivariant vector field
        scalar = phi_x(m_ij)
        coord_updates[i] += (x[i] - x[j]) * scalar

    x_next = x + coord_updates / normalizer(len(edges))

    h_next = []
    for i in range(num_nodes):
        m_i = sum(messages[(i, j)] for j in neighbors(i))
        h_next.append(phi_h(concat(h[i], m_i)))

    return stack(h_next), x_next

def egnn(h0, x0, edge_attr, edges, num_layers):
    h, x = h0, x0
    for _ in range(num_layers):
        h, x = egcl_layer(h, x, edge_attr, edges)
    return h, x
```

##### EGCL 的核心公式

EGNN 的基本层称为 Equivariant Graph Convolutional Layer (EGCL)。给定节点特征 \(h_i^l\)、坐标 \(x_i^l\in\mathbb{R}^n\) 和边属性 \(a_{ij}\)，先计算边消息：

$$
m_{ij}
=
\phi_e\left(
h_i^l,\ h_j^l,\ \|x_i^l-x_j^l\|^2,\ a_{ij}
\right).
$$

这里 \(\|x_i-x_j\|^2\) 是关键：平移不改变差向量，旋转/反射只会左乘正交矩阵 \(Q\)，因此距离平方不变：

$$
\|Qx_i+g-(Qx_j+g)\|^2
=
\|Q(x_i-x_j)\|^2
=
\|x_i-x_j\|^2.
$$

坐标更新写成相对方向的加权和：

$$
x_i^{l+1}
=
x_i^l
+
C
\sum_{j\ne i}
(x_i^l-x_j^l)\,
\phi_x(m_{ij}),
$$

其中 \(C\) 是归一化常数，\(\phi_x(m_{ij})\) 输出标量。因为每一项都是“相对向量 \(\times\) 不变量标量”，整体在旋转或反射后会随坐标一起变换：

$$
x_i^l\mapsto Qx_i^l+g
\quad\Rightarrow\quad
x_i^{l+1}\mapsto Qx_i^{l+1}+g.
$$

节点消息聚合和特征更新与标准 GNN 类似：

$$
m_i=\sum_{j\ne i}m_{ij},
\qquad
h_i^{l+1}=\phi_h(h_i^l,m_i).
$$

由于 \(m_{ij}\) 只依赖标量特征、边属性和距离不变量，\(h_i\) 保持 \(E(n)\)-不变；由于聚合是对邻居求和，节点重排只会重排输出，因此保留 permutation equivariance。

##### 为什么它比传统 SE(3) 等变网络简单

许多 3D 等变网络使用高阶张量/球谐函数表示不同类型的几何量。这类方法表达力强，但需要维护 type-0、type-1、type-2 等特征，并计算旋转群相关基函数，工程和计算成本都高。EGNN 做了更克制的选择：只维护标量节点特征和坐标向量，不显式构造高阶表示。

这种选择适合很多物理问题，因为输入输出往往就是标量属性和向量坐标/速度。例如分子性质预测需要对整体旋转平移不变的能量或性质；N-body 预测需要坐标轨迹随输入旋转而旋转。EGNN 用距离不变量驱动标量消息，再用相对位移恢复等变向量更新，正好覆盖这类任务。

> 💡 关键：EGNN 的等变性来自“标量只看不变量，向量只由相对向量线性组合生成”。这比在每层维护高阶表示更简单，但也意味着模型表达的是径向方向加权的向量场。

##### 速度/动量扩展

对动力系统，论文还给出速度型扩展。将坐标更新拆成速度更新和位置更新：

$$
v_i^{l+1}
=
\phi_v(h_i^l)v_i^l
+
C
\sum_{j\ne i}
(x_i^l-x_j^l)\phi_x(m_{ij}),
$$

$$
x_i^{l+1}=x_i^l+v_i^{l+1}.
$$

如果初始速度 \(v_i^0=0\)，该形式退化为基本坐标更新。若速度存在，它本身在旋转/反射下也按向量变换，因此乘以由 \(h_i\) 生成的标量门控 \(\phi_v(h_i)\) 不会破坏等变性。这对带初速度的 charged particles N-body 预测尤其自然。

##### 边推断与训练流程

如果图边已知，EGNN 直接在给定边集合上传递消息；如果只有点云或粒子集合，可使用全连接图，也可以学习软邻接：

$$
e_{ij}=\phi_{\text{inf}}(m_{ij})\in[0,1],
\qquad
m_i=\sum_{j\ne i}e_{ij}m_{ij}.
$$

因为 \(e_{ij}\) 也是由不变量消息得到的标量，边推断不会破坏几何等变性。训练目标取决于任务：N-body 用未来位置均方误差，图自编码器用边重构二元交叉熵，QM9 用分子性质回归误差。N-body 位置预测可写成：

$$
\mathcal{L}_{\text{pos}}
=
\frac{1}{N}
\sum_{i=1}^{N}
\|\hat{x}_i^{T}-x_i^{T}\|_2^2.
$$

##### 与普通 GNN 的差异

| 方法 | 几何输入处理 | 坐标输出 | 对 \(E(n)\) 变换的性质 | 成本特点 |
|------|--------------|----------|------------------------|----------|
| 标准 GNN | 可拼接坐标但无约束 | 任意 MLP 输出 | 通常不等变 | 简单但需数据学会旋转/平移 |
| SchNet 类模型 | 使用距离不变量 | 主要输出不变量 | 适合分子标量性质 | 不直接给等变坐标更新 |
| TFN/SE(3)-Transformer | 球谐函数与高阶表示 | 等变 | 强 SE(3)/E(3) 结构 | 计算与实现复杂 |
| EGNN | 距离不变量 + 相对向量 | 相对向量标量加权更新 | \(E(n)\) 等变、置换等变 | 不用球谐函数，可扩展到任意维 |

EGNN 的局限也来自它的简洁性：坐标更新本质上是相对方向的标量加权和，如果任务需要复杂角向高阶张量相互作用，高阶等变模型可能更有表达优势。但对许多物理模拟和分子任务，EGNN 在精度、数据效率和运行成本之间给出了非常实用的折中。

#### 🧪 练习题

```yaml
question: "EGNN 坐标更新为什么能够保持旋转和反射等变？"
options:
  - "因为坐标更新完全忽略节点之间的相对位置"
  - "因为边消息只输入绝对坐标，网络会自动学习坐标系"
  - "因为更新由相对向量乘以不变量标量组成，输入旋转/反射后更新向量会同步旋转/反射"
  - "因为 EGNN 使用球谐函数显式表示所有高阶张量"
answer: 2
explain: "EGNN 的标量权重来自距离等不变量，而方向来自 x_i-x_j；正交变换会作用到相对向量上，标量不变，因此输出坐标按同样方式变换。"
```
