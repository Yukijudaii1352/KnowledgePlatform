### Equiformer — 等变图注意力 Transformer (Equivariant Graph Attention Transformer)

```yaml
id: equiformer
name: Equiformer
full_name: "等变图注意力Transformer (Equivariant Graph Attention Transformer)"
year: "2023"
org: "SEAS"
paper_url: "https://openreview.net/forum?id=KwmPfARgOTD"
category: gnn_representation
parent: mace
motivation: "Transformer与SE(3)等变结合"
```

#### 📝 一句话总结

Equiformer 将 Transformer 的注意力、层归一化、前馈网络等模块替换为基于不可约表示和张量积的 SE(3)/E(3) 等变版本，解决 3D 原子图中既要利用几何对称性、又要保持 Transformer 表达能力的问题。

#### 🎯 核心要点

- **等变 Transformer 主干**：输入 3D 原子图后，经原子嵌入、边度嵌入和多层 Equiformer block 处理，每个 block 包含等变图注意力与等变前馈网络
- **Irreps 特征表示**：节点特征按 \(l=0,1,\dots,L_{\max}\) 的不可约表示分组，标量、向量和高阶张量通道在旋转下按对应 Wigner 矩阵变换
- **深度可分张量积（DTP）**：用相对位置的球谐函数 \(Y_l^m(\hat{\mathbf{r}}_{ij})\) 与节点特征做张量积，并让径向基函数生成距离相关权重
- **等变图注意力（Equivariant Graph Attention）**：用 DTP 先融合目标节点、源节点和边几何，再用标量通道产生 MLP attention 权重，用 gate 非线性产生等变 value
- **MLP 注意力替代点积注意力**：避免传统 dot-product attention 在 3D 原子图上的表达限制，可学习更灵活的邻居相互作用模式
- **非线性消息传递**：value 不再只是线性映射，而是经过 gate activation、DTP 和线性层形成非线性等变消息
- **基准验证**：在 QM9、MD17、OC20 上验证同一架构可处理分子量子性质、分子动力学势能/力和开放催化材料任务

#### 🔬 深入细节

##### 架构示意图

![Equiformer 架构图](https://ar5iv.labs.arxiv.org/html/2206.11990/assets/figure/equiformer.png)
*图：Equiformer 总体结构。左侧是 Transformer block 堆叠；中间是等变图注意力；右侧展示 atom + edge-degree embedding 与等变前馈网络。图源为 ar5iv 渲染的论文 Figure 1。*

##### 算法伪代码

```python
# Equiformer 核心流程伪代码
graph = build_radius_graph(atoms, positions, cutoff=r_c)

# 节点初始特征：原子类型嵌入 + 边度嵌入
h = atom_embedding(graph.atomic_numbers)
edge_sh = spherical_harmonics(graph.relative_vectors)  # Y_l^m(r_ij)
edge_rbf = radial_basis(graph.distances)
h = h + edge_degree_embedding(edge_sh, edge_rbf, graph.edges)

for block in range(num_layers):
    # 1. 等变 LayerNorm
    h_norm = equivariant_layer_norm(h)

    # 2. 等变图注意力：每条边先融合内容和几何
    messages = []
    for (i, j) in graph.edges:
        qk = linear(h_norm[i]) + linear(h_norm[j])
        m_ij = DTP(qk, edge_sh[i, j], weights=radial_mlp(edge_rbf[i, j]))
        m_ij = linear(m_ij)

        # 注意力权重只从 l=0 标量通道产生，因此是旋转不变标量
        score_ij = mlp_attention(scalar_channels(m_ij))
        value_ij = nonlinear_equivariant_value(m_ij)  # gate + DTP + linear
        messages.append((i, score_ij, value_ij))

    attn_out = aggregate_softmax_weighted(messages)
    h = h + output_linear(attn_out)

    # 3. 等变 FFN：Linear -> Gate -> Linear
    h = h + equivariant_ffn(equivariant_layer_norm(h))

# 标量任务：节点标量输出后求和/归一化
y_hat = output_head(h).sum_over_nodes() / sqrt(avg_num_atoms)
```

##### 动机与背景

3D 原子图的预测目标必须满足欧氏群对称性：平移整个体系不能改变能量，旋转体系时力等向量量也应同步旋转。普通 Transformer 擅长全局/邻域关系建模，但它的 token 表示没有内建 3D 旋转等变性；只用距离、角度等不变量又会丢掉方向性信息，难以自然地产生向量或高阶张量响应。

Equiformer 的核心判断是：不需要重新发明一个完全不同的 3D 网络，而是把 Transformer 中的线性层、归一化、激活、注意力和 FFN 全部替换为等变版本。这样保留了 residual block、多头注意力和前馈网络的工程形态，同时把几何约束放进特征空间和算子中。

节点特征被写成不可约表示的直和：

$$
\mathbf{h}_i = \bigoplus_{\ell=0}^{L_{\max}} \mathbf{h}_i^{(\ell)}, \qquad
\mathbf{h}_i^{(\ell)} \mapsto D^{(\ell)}(R)\mathbf{h}_i^{(\ell)}
$$

其中 \(l=0\) 是旋转不变标量，\(l=1\) 类似普通三维向量，高阶 \(l\) 表示更复杂的角向模式。只要每个模块都保持这种变换规则，堆叠后的网络仍然等变。

##### 等变图注意力机制

标准 Transformer 的注意力可抽象为：

$$
\mathbf{y}_i = \sum_{j \in \mathcal{N}(i)} \alpha_{ij}\mathbf{v}_{ij}
$$

Equiformer 的关键改造是让 \(\alpha_{ij}\) 是旋转不变标量，让 \(\mathbf{v}_{ij}\) 是等变 value。这样标量权重乘以等变张量后仍然等变。对边 \((i,j)\)，先将节点内容和边方向结合：

$$
\mathbf{m}_{ij}
= W_m\left(
\left(W_i\mathbf{h}_i + W_j\mathbf{h}_j\right)
\otimes_{W_r(\|\mathbf{r}_{ij}\|)}
Y(\hat{\mathbf{r}}_{ij})
\right)
$$

这里 \(Y(\hat{\mathbf{r}}_{ij})\) 是相对方向的球谐函数，\(W_r\) 由径向基函数经过 MLP 得到，\(\otimes\) 是带 Clebsch-Gordan 路径约束的张量积。直觉上，节点内容告诉模型“谁和谁相互作用”，球谐函数告诉模型“沿哪个方向相互作用”，径向函数告诉模型“距离多远时权重多大”。

注意力分数只取 \(\mathbf{m}_{ij}\) 的标量通道：

$$
e_{ij} = \mathbf{w}^{\top}\sigma\left(W_s\mathbf{m}_{ij}^{(0)}\right), \qquad
\alpha_{ij} = \frac{\exp(e_{ij})}{\sum_{k\in\mathcal{N}(i)}\exp(e_{ik})}
$$

这就是论文中的 MLP attention。它比点积注意力更像 GATv2：先把目标节点、源节点和几何边特征混合，再用小 MLP 评分，而不是只比较 query/key 的内积。

##### 等变算子与 FFN

Equiformer 复用了 Transformer 的宏观结构，但每个算子都有等变约束：

- **Linear**：只在相同 \(l\) 的通道之间混合，不把标量、向量、高阶张量随意相加
- **LayerNorm**：对非标量特征使用 L2 norm/RMS 归一化，不减去会破坏方向的均值
- **Gate activation**：标量通道走 SiLU/sigmoid，非标量通道只能被标量门控缩放
- **DTP**：每个输出通道只依赖一个输入通道的张量积路径，降低距离相关权重的内存开销
- **FFN**：用等变 Linear → Gate → Linear 替代普通 MLP

> 💡 关键：Equiformer 的注意力权重必须是标量不变量；复杂几何信息不是丢掉，而是在生成标量分数前已经通过球谐张量积注入到了标量通道中。

##### 训练目标与任务输出

对于 QM9 这类标量性质预测，输出头把每个节点变成标量后做图级求和：

$$
\hat{y} = \frac{1}{\sqrt{\bar{N}}}\sum_{i=1}^{N} W_o\mathbf{h}_i^{(0)}
$$

常见损失为 MAE 或标准化后的 L1/L2 回归损失：

$$
\mathcal{L}_{\text{prop}} = \frac{1}{B}\sum_{b=1}^{B}\left|\hat{y}_b-y_b\right|
$$

用于势能面任务时，能量是旋转不变标量，保守力可由能量对坐标的负梯度得到：

$$
\hat{\mathbf{F}}_i = -\nabla_{\mathbf{r}_i}\hat{E}, \qquad
\mathcal{L}=\lambda_E|\hat{E}-E|+\lambda_F\frac{1}{3N}\sum_i\|\hat{\mathbf{F}}_i-\mathbf{F}_i\|_1
$$

这种输出设计把物理约束放在最后一层之前：网络内部可以携带方向信息，但图级能量仍是标量不变量。

##### 与传统方法的区别

与 SchNet、DimeNet++ 等主要基于不变量的模型相比，Equiformer 能在特征通道中保留方向和高阶角向信息；与 NequIP、TFN 等等变卷积相比，它引入 Transformer 风格的注意力和 FFN；与 SE(3)-Transformer 的点积注意力相比，它用 MLP attention 和非线性 value message 增强表达能力。

论文的消融结论可以概括为两层：第一，只把 Transformer 操作替换为等变操作已经能得到强基线；第二，MLP attention 加非线性消息传递进一步提升了 QM9、MD17、OC20 等跨尺度任务上的泛化能力。

#### 🧪 练习题

```yaml
question: "Equiformer 中注意力权重为什么只从标量通道生成？"
options:
  - "因为标量通道参数最少，可以降低显存"
  - "因为注意力权重必须是旋转不变标量，乘到等变 value 上才不破坏等变性"
  - "因为球谐函数只能产生标量特征"
  - "因为模型只支持预测标量性质，不能处理向量信息"
answer: 1
explain: "若注意力权重随旋转改变，聚合后的消息会破坏等变性。Equiformer 先用张量积把几何信息注入标量通道，再由这些标量生成不变的 attention score。"
```
