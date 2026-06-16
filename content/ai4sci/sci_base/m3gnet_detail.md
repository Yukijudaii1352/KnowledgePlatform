### M3GNet

```yaml
id: m3gnet
name: M3GNet
full_name: 材料三体图网络 (Materials 3-body Graph Network)
year: '2022'
org: UC San Diego
paper_url: https://www.nature.com/articles/s43588-022-00349-3
category: materials_weather
parent: —
motivation: 三体相互作用GNN材料建模
```

#### 📝 一句话总结

M3GNet 在材料图神经网络中显式加入三体角度相互作用，并用能量对坐标和晶格应变的自动微分同时得到力与应力，解决了普通材料 GNN 难以作为平滑通用原子间势的问题。

#### 🎯 核心要点

- **三体材料图**：在原子节点和成键边之外，显式计算同一中心原子周围的键-键夹角，让消息传递包含 \(i-j-k\) 三体环境
- **坐标与晶格进入图表示**：把原子坐标 \(\mathbf{R}\) 和晶格矩阵 \(\mathbf{L}\) 纳入模型，使力与应力可由总能量自动微分得到
- **平滑距离基函数**：边距离展开使用在截断半径处数值、一阶导和二阶导都平滑消失的基函数，避免邻居进出 cutoff 时能量和导数跳变
- **Many-body to bond 模块**：先把三体角度信息汇入边特征，再执行标准的边、原子、全局状态图卷积更新
- **原子能量加和读出**：每个原子经 gated MLP 输出原子能量，所有原子能量求和得到总能量，天然适配不同大小晶体
- **能量-力-应力联合训练**：通用势训练同时拟合 DFT 能量、力和应力，使用 Huber 损失稳定处理大范围 relaxation 数据
- **周期表级数据覆盖**：MPF.2021.2.8 数据集覆盖 89 种元素、62,783 个化合物和 187,687 个离子步
- **材料发现应用**：用 M3GNet 快速弛豫 3,166 万个假想晶体，筛出约 184.9 万个潜在稳定材料，并用 DFT 验证 top-2000 中 1,578 个稳定

#### 🔬 深入细节

##### 架构总览

![M3GNet 多体图势架构](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs43588-022-00349-3/MediaObjects/43588_2022_349_Fig1_HTML.png)
*图：M3GNet 从包含坐标的材料图出发，经图 featurizer、三体 many-body 计算、many-body to bond、图卷积和原子能量读出，输出能量、力与应力。来源为 Nature Computational Science 论文 Figure 1。*

论文来源：Nature 论文页 https://www.nature.com/articles/s43588-022-00349-3；arXiv 可读版本 https://ar5iv.labs.arxiv.org/html/2202.02450；MatGL 文档对 M3GNet 架构和预训练势也有说明 https://matgl.ai/。

M3GNet 的直接目标不是只预测一个静态材料属性，而是学习一个可用于结构弛豫、分子动力学和材料筛选的原子间势。传统材料 GNN 往往只把原子看作节点、近邻键看作边，用两两距离作为边特征；这种模型可以做属性回归，但当邻居跨过截断半径时，能量、力和应力的连续性很难保证。M3GNet 因此把原子坐标、晶格和三体角度都纳入图计算。

给定材料图 \(G=(V,E,u;\mathbf{R},\mathbf{L})\)，节点 \(i\) 表示原子，边 \((i,j)\) 表示 cutoff 内的近邻关系，\(u\) 是可选全局状态。原子特征由元素原子序数 embedding 得到，边特征来自距离

$$
r_{ij}=\|\mathbf{R}_j-\mathbf{R}_i+\mathbf{L}\mathbf{n}_{ij}\|
$$

其中 \(\mathbf{n}_{ij}\) 是周期性镜像偏移。为了让势能面对原子位置平滑，距离被展开为满足 cutoff 平滑约束的基函数：

$$
\mathbf{b}_{ij}=[b_1(r_{ij}),\ldots,b_K(r_{ij})], \quad
b_k(r_c)=b_k'(r_c)=b_k''(r_c)=0
$$

这保证不只是能量值，连力和应力所需的一阶、二阶导数在邻居列表边界也不会突然跳变。

##### 核心算法伪代码

```python
# M3GNet universal interatomic potential
def m3gnet_forward(structure, cutoff_pair=5.0, cutoff_three_body=4.0):
    graph = build_periodic_graph(structure, cutoff=cutoff_pair)
    h = element_embedding(graph.atomic_numbers)      # atom features
    e = smooth_distance_basis(graph.distances)       # bond features
    triplets = enumerate_triplets(graph, cutoff_three_body)

    for block in range(num_blocks):
        # many-body to bond: inject angular environment into each bond
        angle_messages = {}
        for (k, i, j) in triplets:
            theta = angle_between(i, k, j, structure.positions)
            basis = spherical_bessel_harmonic_basis(
                graph.distance(i, j), graph.distance(i, k), theta
            )
            angle_messages[(i, j)] += three_body_mlp(
                h[i], h[j], h[k], e[(i, j)], e[(i, k)], basis
            )
        e = e + angle_messages

        # graph convolution: update bonds, atoms and optional state
        for (i, j) in graph.edges:
            e[(i, j)] = bond_update_mlp(h[i], h[j], e[(i, j)], graph.state)
        for i in graph.nodes:
            m_i = sum(e[(i, j)] for j in graph.neighbors(i))
            h[i] = atom_update_mlp(h[i], m_i, graph.state)
        graph.state = state_update_mlp(h, e, graph.state)

    atomic_energy = {i: energy_mlp(h[i]) for i in graph.nodes}
    energy = sum(atomic_energy.values())
    forces = -grad(energy, structure.positions)
    stress = grad(energy, structure.strain) / structure.volume
    return energy, forces, stress
```

##### 三体相互作用为什么重要

在许多晶体中，局部稳定性不仅由某一对原子的距离决定，也由键角决定。例如四面体、八面体配位和层状结构即使拥有相似的近邻距离，也可能因为角度排列不同而有完全不同的能量。传统两体消息传递需要多层间接传播才可能区分这些角度模式，而 M3GNet 在每个中心原子 \(i\) 上枚举相邻键 \((i,j)\) 与 \((i,k)\)，直接把夹角

$$
\theta_{jik}=\angle(\mathbf{r}_{ij},\mathbf{r}_{ik})
$$

编码进边更新。论文采用球贝塞尔函数和球谐函数构造三体基，直观上可写成：

$$
\mathbf{a}_{jik}
= \mathrm{SBF}(r_{ij}, r_{ik}, \theta_{jik})
\odot c(r_{ij})c(r_{ik})
$$

其中 \(c(\cdot)\) 是平滑 cutoff 函数。随后每条边 \((i,j)\) 汇聚所有第三原子 \(k\) 贡献：

$$
\tilde{\mathbf{e}}_{ij}
= \mathbf{e}_{ij}
+ \sum_{k\in \mathcal{N}(i)\setminus j}
\phi_3(\mathbf{h}_i,\mathbf{h}_j,\mathbf{h}_k,\mathbf{e}_{ij},\mathbf{e}_{ik},\mathbf{a}_{jik})
$$

这一步就是论文 Figure 1 中的 many-body to bond 模块。它借鉴 Tersoff 等传统多体势的思想：某条键的强弱要由中心原子的完整配位环境调制，而不是只由两端原子决定。

##### 图卷积与读出

三体信息注入边之后，M3GNet 执行多轮标准材料图更新。一个简化写法是：

$$
\mathbf{e}_{ij}^{t+1}
= \mathbf{e}_{ij}^{t}
+ \phi_e([\mathbf{h}_i^t,\mathbf{h}_j^t,\mathbf{e}_{ij}^t,\mathbf{u}^t,\mathbf{b}_{ij}])
$$

$$
\mathbf{h}_i^{t+1}
= \mathbf{h}_i^{t}
+ \phi_v\left([\mathbf{h}_i^t,\sum_{j\in \mathcal{N}(i)}\mathbf{e}_{ij}^{t+1},\mathbf{u}^t]\right)
$$

$$
\mathbf{u}^{t+1}
= \phi_u\left(\mathbf{u}^{t}, \sum_i \mathbf{h}_i^{t+1}, \sum_{(i,j)}\mathbf{e}_{ij}^{t+1}\right)
$$

\(\phi_e,\phi_v,\phi_u\) 在实现中使用 gated MLP。门控结构相当于让模型同时学习“候选更新”和“是否通过该更新”，在多轮传播中能更稳定地融合局部几何、元素类型和全局状态。

对原子间势，M3GNet 将总能量拆成原子能量加和：

$$
\hat{E} = \sum_{i=1}^{N}\hat{\epsilon}_i,\quad
\hat{\epsilon}_i=\phi_{\mathrm{readout}}(\mathbf{h}_i^T)
$$

这种读出满足原子排列不变性，也让模型可迁移到不同原子数的结构。力和应力不由独立网络输出，而是从同一个能量函数求导：

$$
\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{R}_i}
$$

$$
\hat{\boldsymbol{\sigma}} = \frac{1}{V}\frac{\partial \hat{E}}{\partial \boldsymbol{\epsilon}}
$$

这里 \(\boldsymbol{\epsilon}\) 是晶格应变。这样得到的力场与能量一致，避免了能量和力由两个模型分别预测时可能出现的非守恒问题。

##### 训练目标与数据

通用 M3GNet IAP 使用 Materials Project 十年结构弛豫过程中积累的中间构型，而不只是最终稳定结构。MPF.2021.2.8 数据包含 187,687 个离子步、187,687 个能量标签、16,875,138 个力分量和 1,689,183 个应力分量，覆盖 89 个元素。论文强调，只用能量训练会导致力和应力导数误差被放大，因此最终模型联合拟合三类物理量：

$$
\mathcal{L}
= \lambda_E\,\mathcal{H}_{\delta}\left(\frac{\hat{E}}{N},\frac{E_{\mathrm{DFT}}}{N}\right)
+ \lambda_F\,\frac{1}{3N}\sum_{i,\alpha}
\mathcal{H}_{\delta}(\hat{F}_{i\alpha},F^{\mathrm{DFT}}_{i\alpha})
+ \lambda_{\sigma}\,\frac{1}{9}\sum_{\alpha,\beta}
\mathcal{H}_{\delta}(\hat{\sigma}_{\alpha\beta},\sigma^{\mathrm{DFT}}_{\alpha\beta})
$$

\(\mathcal{H}_{\delta}\) 是 Huber 损失。Huber 损失在小误差区间像 MSE，在大误差区间像 MAE，适合处理 relaxation 数据中跨度很大的能量、力和应力。训练前还会用线性回归拟合元素参考能并从总能量中扣除，降低不同化学组成带来的基线差异。

##### 与 MEGNet、SchNet 和传统势的区别

MEGNet 等早期材料图网络擅长材料性质预测，但它们通常没有面向力和应力设计连续可微的能量面；SchNet 通过连续距离滤波器处理分子坐标，但主要依靠两两距离和多层传播来形成多体效应。M3GNet 的差异在于把“可作为势能函数”作为结构设计约束：距离基函数要在 cutoff 处高阶平滑，三体角度要直接进入边更新，总能量要通过自动微分导出力和应力。

传统经验势如 EAM、MEAM、Tersoff 具有明确物理形式和高效率，但通常需要针对单元素或少量化学空间重新拟合。M3GNet 用元素 embedding 和共享图网络把这种局部多体势思想扩展到周期表级化学空间。论文中的单元素基准显示 M3GNet 接近局部环境 ML-IAP 的精度，同时更容易扩展到多元素组合。

##### 材料发现流程

M3GNet 的最终应用是大规模候选晶体筛选。流程是：先从 ICSD 结构原型出发做等价离子替换，生成 31,664,858 个假想晶体；然后用 M3GNet 快速弛豫结构并估计能量；再根据相对于 Materials Project 凸包的能量距离筛选潜在稳定材料；最后对优先级最高的候选做 DFT 验证。M3GNet 不是替代最终 DFT，而是把昂贵的第一性原理计算前移到更小、更有希望的候选集合。

> 💡 关键：M3GNet 的核心不是“多加一个角度特征”，而是把三体局部几何、平滑势能面、能量-力-应力一致性和周期表级元素 embedding 组合成一个可用于实际结构弛豫的通用材料势。

#### 🧪 练习题

```yaml
question: "M3GNet 为什么要从总能量自动微分得到力和应力，而不是用独立网络直接预测它们？"
options:
  - "这样可以保证力和应力与同一个势能函数一致，并支持结构弛豫和分子动力学"
  - "这样可以完全避免使用 DFT 数据"
  - "这样可以让模型只处理分子而不能处理周期晶体"
  - "这样可以把三体角度信息从模型中删除"
answer: 0
explain: "力和应力是能量对坐标和应变的导数，由同一能量函数导出可保持物理一致性；这也是 M3GNet 能作为原子间势使用的关键。"
```
