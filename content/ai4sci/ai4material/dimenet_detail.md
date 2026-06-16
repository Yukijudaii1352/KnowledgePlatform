### DimeNet — 方向性消息传递网络 (Directional Message Passing NN)

```yaml
id: dimenet
name: DimeNet
full_name: "方向性消息传递网络 (Directional Message Passing NN)"
year: "2020"
org: "TU Munich"
paper_url: "https://openreview.net/forum?id=B1e79eBKvS"
category: gnn_representation
parent: schnet
motivation: "显式建模键角的方向性消息"
```

#### 📝 一句话总结

DimeNet 提出把消息绑定到有方向的原子对 \((j \rightarrow i)\)，并用三元组角度 \(\angle kji\) 更新消息，解决了只用原子间距离的分子/材料 GNN 无法显式表达键角和方向性相互作用的问题。

#### 🎯 核心要点

- **方向性消息**：不再只更新原子节点，而是更新有向边消息 \(m_{ji}\)，每条消息与三维空间中的方向对应
- **角度三元组**：用 \(k \rightarrow j \rightarrow i\) 三元组中的夹角 \(\alpha_{(kj,ji)}\) 调制消息交互，显式建模键角
- **旋转不变预测**：消息方向随分子旋转而等变，但最终只用距离和角度等不变量读出性质，保证预测不随坐标系改变
- **正交基表示**：用球贝塞尔函数和球谐函数构建径向/球面基，相比高斯距离基更有物理归纳偏置
- **消息级 belief propagation 类比**：更新 \(m_{ji}\) 时聚合进入中间原子 \(j\) 的消息 \(m_{kj}\)，但排除从目标原子 \(i\) 反向回来的路径
- **性能结果**：论文报告在 MD17 上平均优于此前 GNN 约 76%，在 QM9 上平均优于约 31%，且参数量显著少于常见高斯基方案
- **后续影响**：DimeNet 启发了 DimeNet++、GemNet、ALIGNN 等显式角度或高阶几何消息传递模型

#### 🔬 深入细节

![DimeNet 架构图](https://github.com/gasteigerjo/dimenet/blob/master/architecture.svg?raw=true&sanitize=true)
*图：作者官方 GitHub 提供的 DimeNet 架构图。OpenReview 论文 PDF 中 Figure 1 展示的是消息 \(m_{kj}\) 经由中心原子 \(j\) 聚合并更新 \(m_{ji}\) 的方向性消息机制；ar5iv 对该论文转换失败，因此这里使用官方实现仓库的可访问架构图作为嵌入图示。*

来源说明：任务给定的 `paper_url` 中 OpenReview id 未能检索到公开页面；本文追溯到可访问的 OpenReview 页面 `https://openreview.net/forum?id=B1eWbxStPH`、arXiv:2003.03123 以及作者官方实现仓库 `https://github.com/gasteigerjo/dimenet`。YAML 中仍保留任务给定的原始 `paper_url`。

##### 算法伪代码

```python
# DimeNet 核心流程伪代码
graph = build_radius_graph(molecule_positions, cutoff)

# edge/message features: each directed pair j -> i owns a message m_ji
for directed_edge (j, i) in graph.directed_edges:
    rbf_ji = radial_bessel_basis(distance(j, i))
    m[j, i] = embedding(atom_type[j], atom_type[i], rbf_ji)

for layer in range(num_interaction_blocks):
    new_m = {}
    for directed_edge (j, i) in graph.directed_edges:
        interaction_sum = 0
        for k in graph.neighbors(j):
            if k == i:
                continue
            angle = angle_between(pos[k] - pos[j], pos[i] - pos[j])
            rbf = radial_bessel_basis(distance(j, i))
            sbf = spherical_basis(distance(k, j), angle)
            interaction_sum += interaction_network(m[k, j], rbf, sbf)

        new_m[j, i] = update_network(m[j, i], interaction_sum)
    m = new_m

    # output blocks predict atom-wise contributions from incoming messages
    for atom_i in graph.nodes:
        h_i = sum(m[j, i] for j in graph.neighbors(i))
        y_i[layer] = output_network(h_i)

y_pred = sum_over_atoms_and_layers(y_i)
loss = mean_absolute_error(y_pred, target_property)
```

##### 动机与背景

SchNet 等早期连续滤波 GNN 主要依赖原子间距离 \(d_{ij}\)。距离能够保证旋转和平移不变性，但它丢失了方向关系：两个局部结构可能有相同的两两距离分布或相近的径向邻域，却因为键角不同而具有不同能量、力或量子性质。传统分子力场早就使用键角势、二面角势来表达这种方向性，说明角度是物理上必要的信息。

DimeNet 的关键不是简单把角度作为节点特征拼接进去，而是把消息本身放到有向边上。消息 \(m_{ji}\) 可以理解为“从原子 \(j\) 发往原子 \(i\) 的、带方向的局域表示”。当更新 \(m_{ji}\) 时，模型查看所有进入 \(j\) 的消息 \(m_{kj}\)，并根据 \(\angle kji\) 决定这些消息如何影响从 \(j\) 发往 \(i\) 的方向。

##### 方向性消息更新

DimeNet 的消息聚合可以概括为：

$$
\mathbf{h}_i = \sum_{j \in \mathcal{N}(i)} \mathbf{m}_{ji}
$$

$$
\mathbf{m}_{ji}^{(l+1)} =
f_{\mathrm{update}}\left(
\mathbf{m}_{ji}^{(l)},
\sum_{k \in \mathcal{N}(j)\setminus\{i\}}
f_{\mathrm{int}}\left(
\mathbf{m}_{kj}^{(l)},
\mathbf{e}_{\mathrm{RBF}}^{(ji)},
\mathbf{a}_{\mathrm{SBF}}^{(kj,ji)}
\right)
\right)
$$

其中 \(\mathbf{e}_{\mathrm{RBF}}^{(ji)}\) 是距离 \(d_{ji}\) 的径向基表示，\(\mathbf{a}_{\mathrm{SBF}}^{(kj,ji)}\) 是距离与夹角共同确定的球面基表示。排除 \(k=i\) 的原因是避免消息立即沿同一条边反向回传，使更新更接近 belief propagation 中的非回溯消息传递。

> 💡 关键：DimeNet 的信息流是“边到边”的。中心原子 \(j\) 不只是一个节点聚合器，它把来自不同方向的入射消息按角度转换为出射消息。

##### 球贝塞尔函数与球谐基

DimeNet 不使用常见的高斯距离展开，而是构造更接近物理势函数展开的正交基。径向部分可写成类似：

$$
e_n(d) =
\sqrt{\frac{2}{c}}
\frac{\sin(n\pi d / c)}{d}
u(d)
$$

其中 \(c\) 是截断半径，\(u(d)\) 是在截断处平滑衰减到 0 的 envelope 函数。角度部分用球谐函数 \(Y_l^m\) 与球贝塞尔函数 \(j_l\) 组合，形成二维的 spherical basis：

$$
a_{ln}(d,\alpha) =
j_l\left(\frac{z_{ln}}{c}d\right)
Y_l^0(\alpha)
u(d)
$$

这里 \(z_{ln}\) 是球贝塞尔函数的零点，\(\alpha\) 是 \(\angle kji\)。由于模型最终只使用距离和角度，输出对整体旋转、平移保持不变；同时，因为消息绑定到方向，网络内部仍能区分不同键角的几何环境。

##### 训练与读出流程

每个 interaction block 更新一轮有向消息，并通过 output block 生成原子级贡献。所有原子的贡献求和得到分子性质：

$$
\hat{y} = \sum_i \sum_l f_{\mathrm{out}}^{(l)}(\mathbf{h}_i^{(l)})
$$

对于能量、偶极矩、HOMO/LUMO、热容等 QM9/MD17 回归任务，训练通常使用 MAE 或加权 MAE：

$$
\mathcal{L} = \frac{1}{B}\sum_{b=1}^{B}|\hat{y}_b - y_b|
$$

DimeNet 原论文主要面向分子图；用于周期晶体时，需要像后续材料模型那样处理周期邻居和跨晶胞三元组。它的核心贡献仍然是几何消息传递范式：从只看 \(d_{ij}\) 的径向图，扩展到同时看 \(d_{ji}\)、\(d_{kj}\) 和 \(\angle kji\) 的方向图。

##### 与 SchNet/CGCNN 的区别

SchNet 通过连续滤波器处理原子间距离，CGCNN 通过晶体图边特征处理周期近邻，但二者的早期形式都没有把键角作为核心消息传递变量。DimeNet 的边级消息让模型直接学习“从一个键方向转到另一个键方向”的相互作用，这与分子力场中的角度项更接近。因此，在构象变化明显、角度势重要的任务上，DimeNet 的归纳偏置更强。

它的代价是计算更重：模型不仅遍历边，还要遍历三元组 \((k,j,i)\)，复杂度随局部邻居数平方增长。后续 DimeNet++ 通过更高效的 interaction block、降维和逐元素乘法替代部分双线性层来降低成本。

#### 🧪 练习题

```yaml
question: "DimeNet 相比只使用距离的 GNN，最核心的结构创新是什么？"
options:
  - "把所有原子距离离散成 one-hot 特征"
  - "在有向边消息中引入 k-j-i 三元组夹角来更新消息"
  - "完全删除节点和边，只保留全局状态向量"
  - "只用元素组成预测所有性质"
answer: 1
explain: "DimeNet 的消息绑定到有向原子对，并用进入中心原子 j 的消息与出射消息之间的夹角进行交互，从而显式建模键角和方向性。"
```
