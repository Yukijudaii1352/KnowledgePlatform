---
domain: ai4sci
topic_id: ai4chem
topic_name: 化学AI 技术演进图谱
page_icon: 🧪
page_title: 化学AI 技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 从分子表示学习到反应预测、逆合成分析、催化剂设计与分子生成，AI正在重塑化学研究范式。本图谱涵盖2017-2026年化学AI领域的经典算法与前沿突破，展现从数据驱动到物理感知、从辅助工具到AI科学家的演化历程。
hero_pills:
- 🏷️ AI4Chemistry · Reaction Prediction · Retrosynthesis · Catalyst Discovery · Molecular Generation
count_pill: '{count} 个算法'
categories:
  representation:
    label: 分子表示学习
    color: '#3B82F6'
  reaction:
    label: 反应预测
    color: '#10B981'
  retrosynthesis:
    label: 逆合成分析
    color: '#F59E0B'
  generation:
    label: 分子生成
    color: '#8B5CF6'
  catalyst:
    label: 催化剂设计
    color: '#EF4444'
  property:
    label: 性质预测
    color: '#EC4899'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4chem/overview/zhihu__化学领域最具影响力的20项人工智能技术__29f8838d/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4chem/latest/zhihu__如何评价2026年5月6日AI实验室12小时发现无铅材料、量子计算加速催化剂研发等一系列化学前沿动态__9841e2be/article.md

## 算法演化关系

```yaml
nodes:
- id: mpnn
  x: 50
  y: 150
  category: representation
- id: schnet
  x: 100
  y: 120
  category: representation
- id: grover
  x: 200
  y: 180
  category: representation
- id: dimenet
  x: 250
  y: 120
  category: representation
- id: gemnet
  x: 350
  y: 120
  category: representation
- id: unimol
  x: 500
  y: 140
  category: representation
- id: mist
  x: 700
  y: 130
  category: representation
- id: mattersim_mt
  x: 720
  y: 170
  category: representation
- id: chemmlm
  x: 680
  y: 200
  category: representation
- id: molecular_transformer
  x: 100
  y: 280
  category: reaction
- id: flower
  x: 600
  y: 270
  category: reaction
- id: reactome
  x: 700
  y: 300
  category: reaction
- id: 3n_mcts
  x: 100
  y: 400
  category: retrosynthesis
- id: aizynthfinder
  x: 250
  y: 380
  category: retrosynthesis
- id: localretro
  x: 350
  y: 420
  category: retrosynthesis
- id: graphretro
  x: 350
  y: 360
  category: retrosynthesis
- id: synthegy
  x: 650
  y: 380
  category: retrosynthesis
- id: mosaic
  x: 700
  y: 420
  category: retrosynthesis
- id: jt_vae
  x: 100
  y: 530
  category: generation
- id: reinvent4
  x: 450
  y: 550
  category: generation
- id: geodiff
  x: 300
  y: 510
  category: generation
- id: edm
  x: 400
  y: 500
  category: generation
- id: cocograph
  x: 650
  y: 500
  category: generation
- id: propmolflow
  x: 680
  y: 540
  category: generation
- id: trajcast
  x: 720
  y: 480
  category: generation
- id: oc20
  x: 250
  y: 640
  category: catalyst
- id: gemnet_oc
  x: 350
  y: 630
  category: catalyst
- id: equiformerv2
  x: 500
  y: 620
  category: catalyst
- id: equiformerv3
  x: 700
  y: 610
  category: catalyst
- id: digcat
  x: 650
  y: 660
  category: catalyst
- id: moleculenet
  x: 100
  y: 730
  category: property
- id: attentivefp
  x: 250
  y: 720
  category: property
- id: admetpred
  x: 700
  y: 730
  category: property
edges:
- from: mpnn
  to: schnet
  label: 连续滤波
- from: mpnn
  to: grover
  label: 预训练
- from: schnet
  to: dimenet
  label: 加入角度
- from: dimenet
  to: gemnet
  label: 二面角
- from: gemnet
  to: unimol
  label: 3D预训练
- from: unimol
  to: mist
  label: 基础模型
- from: unimol
  to: mattersim_mt
  label: 材料模拟
- from: grover
  to: chemmlm
  label: 多模态
- from: molecular_transformer
  to: flower
  label: 物理约束
- from: molecular_transformer
  to: reactome
  label: 药用数据
- from: 3n_mcts
  to: aizynthfinder
  label: 工业化
- from: 3n_mcts
  to: localretro
  label: 局部预测
- from: 3n_mcts
  to: graphretro
  label: 半模板
- from: aizynthfinder
  to: synthegy
  label: LLM引导
- from: aizynthfinder
  to: mosaic
  label: 实验方案
- from: jt_vae
  to: reinvent4
  label: 强化学习
- from: jt_vae
  to: geodiff
  label: 扩散模型
- from: geodiff
  to: edm
  label: 等变性
- from: edm
  to: cocograph
  label: 约束协作
- from: edm
  to: propmolflow
  label: 物理启发
- from: edm
  to: trajcast
  label: 无力MD
- from: oc20
  to: gemnet_oc
  label: 几何GNN
- from: gemnet_oc
  to: equiformerv2
  label: 等变注意力
- from: equiformerv2
  to: equiformerv3
  label: 效率优化
- from: oc20
  to: digcat
  label: AI智能体
- from: moleculenet
  to: attentivefp
  label: 注意力
- from: attentivefp
  to: admetpred
  label: 高通量
milestones:
- 3n_mcts
- oc20
- mist
```

## 核心算法

### MPNN

```yaml
id: mpnn
num: 1
name: MPNN
full_name: 消息传递神经网络 (Message Passing Neural Networks)
year: '2017'
org: Google Research
parent: —
paper_url: https://proceedings.mlr.press/v70/gilmer17a.html
project_url: ''
category: representation
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

### SchNet

```yaml
id: schnet
num: 2
name: SchNet
full_name: 连续滤波卷积网络 (SchNet)
year: '2017'
org: TU Berlin
parent: mpnn
paper_url: https://arxiv.org/abs/1706.08566
project_url: ''
category: representation
motivation: 引入连续滤波器处理原子间距离信息
```

#### 📝 一句话总结
SchNet 提出了 continuous-filter convolution（cfconv），用由原子间连续距离生成的滤波器替代离散网格卷积，解决分子中原子坐标不规则、不能固定到像素网格的问题。它把分子能量写成原子贡献之和，并通过能量对坐标求负梯度得到守恒力场，成为早期 3D 分子图神经网络的重要基线。

#### 🎯 核心要点
- **连续滤波卷积**：滤波器 \(W(d_{ij})\) 由距离 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|_2\) 经径向基展开和小型 MLP 生成，而不是在固定格点上学习离散卷积核
- **交互块堆叠**：每层 interaction block 通过 atom-wise dense、cfconv、shifted softplus 和残差更新原子表示 \(\mathbf{x}_i^{(l)}\)
- **旋转/平移不变**：cfconv 只依赖相对距离，分子能量预测天然对全局旋转和平移不变
- **置换不变读出**：最终预测为 \(\hat{E}=\sum_i \hat{E}_i\)，对原子顺序置换不敏感，也支持不同大小分子
- **能量-力联合训练**：力由 \(\hat{\mathbf{F}}_i=-\nabla_{\mathbf{r}_i}\hat{E}\) 得到，联合能量和力监督可保证预测力是保守场
- **Gaussian 距离展开**：用多个高斯中心把标量距离映射成平滑径向特征，提升滤波器生成网络对距离变化的分辨率
- **基准覆盖化学与构象变化**：在 QM9、MD17 和论文新提出的 ISO17 上验证，覆盖平衡分子、单分子动力学轨迹和跨异构体构象变化

#### 🔬 深入细节
##### 核心架构示意

![SchNet 架构图](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 架构总览。左侧是原子嵌入与多层 interaction block，中间展示 interaction block 内部，右侧展示由距离特征生成连续滤波器的 cfconv。图源为 ar5iv 对 arXiv:1706.08566 的 HTML 渲染。*

##### 算法伪代码

```python
# SchNet 前向传播与能量/力训练核心逻辑
def schnet_forward(atom_numbers, positions, cutoff, n_interactions):
    # 1. 原子类型嵌入
    x = embedding(atom_numbers)  # x_i^(0)

    # 2. 构建距离邻接，SchNet 只使用距离而非角度或二面角
    pairs = [(i, j) for i != j if norm(positions[i] - positions[j]) < cutoff]
    d_ij = {pair: norm(positions[pair[0]] - positions[pair[1]]) for pair in pairs}

    # 3. 多层交互块
    for l in range(n_interactions):
        messages = zeros_like(x)
        for i, j in pairs:
            rbf = gaussian_rbf(d_ij[(i, j)])          # e_k(d_ij)
            filt = filter_network_l(rbf)              # W_l(d_ij)
            messages[i] += dense_in_l(x[j]) * filt    # cfconv 聚合
        x = x + dense_out_l(shifted_softplus(messages))

    # 4. 原子能量读出并求和
    atomic_energy = readout_mlp(x)  # E_i
    energy = atomic_energy.sum()
    return energy

def training_step(atom_numbers, positions, target_energy, target_forces):
    pred_energy = schnet_forward(atom_numbers, positions, cutoff=5.0, n_interactions=6)
    pred_forces = -grad(pred_energy, positions)
    loss = rho * mse(pred_energy, target_energy)
    loss += (1 - rho) / (3 * len(atom_numbers)) * mse(pred_forces, target_forces)
    return loss
```

##### 动机与背景：为什么不能直接用普通卷积？

图像卷积的核心假设是数据位于规则网格上，同一个滤波器可以在像素平面平移复用。分子结构不满足这个条件：原子位置是 \(\mathbb{R}^3\) 中的任意点，距离连续变化，且分子整体旋转和平移不应改变能量。若把空间粗暴离散化到体素网格，会引入分辨率误差；若只用离散邻接矩阵，又会丢失决定量子相互作用强弱的连续距离信息。

SchNet 的解决方式是把卷积核从“离散格点上的参数表”改成“距离的连续函数”。对每一对原子 \(i,j\)，模型先计算距离 \(d_{ij}\)，再用滤波器生成网络产生 \(W(d_{ij})\)。这样，两个原子只要距离有细微变化，卷积权重也会平滑变化，因此适合分子动力学轨迹中的连续构象变化。

##### 核心机制：continuous-filter convolution

连续滤波卷积可写为：

$$
\mathbf{x}_i' = \sum_{j \in \mathcal{N}(i)} \mathbf{x}_j \odot W(d_{ij})
$$

其中 \(\mathbf{x}_j\) 是邻居原子的隐藏表示，\(\odot\) 是逐元素乘法，\(W(d_{ij})\) 是由距离生成的通道级滤波器。为了让小型 MLP 更容易学习距离函数，SchNet 先把距离投影到 Gaussian radial basis：

$$
e_k(d_{ij})=\exp\left[-\gamma(d_{ij}-\mu_k)^2\right], \quad k=1,\ldots,K
$$

然后经两层 dense 网络和 shifted softplus 生成滤波器：

$$
W(d_{ij})=\operatorname{MLP}_{\theta}\left([e_1(d_{ij}),\ldots,e_K(d_{ij})]\right),
\qquad
\operatorname{ssp}(x)=\ln(0.5e^x+0.5)
$$

> 💡 关键：SchNet 并没有显式输入键类型、键角或二面角；它让多个 interaction block 通过距离调制的邻居聚合逐步形成高阶原子环境表示。

##### 交互块与读出

每个 interaction block 都是残差形式：先对原子表示做 atom-wise 变换，再通过 cfconv 聚合邻域几何信息，最后再经过 atom-wise 非线性层回写到 \(\mathbf{x}_i\)。这种结构的好处是把“跨原子交互”和“单原子通道混合”拆开，前者由距离滤波器控制，后者由普通全连接层控制。

分子级能量采用原子贡献求和：

$$
\hat{E}(Z,R)=\sum_{i=1}^{N}\hat{E}_i(\mathbf{x}_i^{(T)})
$$

求和读出带来两个重要性质：第一，原子排列顺序改变不会改变 \(\hat{E}\)；第二，模型可以自然处理不同原子数的分子。对需要原子力的数据集，SchNet 不单独训练一个力头，而是令：

$$
\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{r}_i}
$$

这使得预测力来自同一个势能面，满足能量守恒约束。联合训练损失通常写成：

$$
\mathcal{L}
= \rho\left\|E-\hat{E}\right\|_2^2
+ \frac{1-\rho}{3N}\sum_{i=1}^{N}\left\|\mathbf{F}_i-\hat{\mathbf{F}}_i\right\|_2^2
$$

##### 与 MPNN 和后续 3D GNN 的区别

从消息传递视角看，SchNet 是一种边特征由距离连续生成的 MPNN：消息不仅取决于邻居表示，也取决于两原子的 3D 距离。相较于早期只使用二维分子图拓扑的 MPNN，它能区分同一拓扑下的不同构象；相较于 DimeNet、GemNet 等后续方法，它没有显式建模键角和二面角，因此表达复杂方向性相互作用时需要更多层通过距离间接推断。

这也解释了 SchNet 的历史地位：它把“分子是连续 3D 点云”这一事实引入可微消息传递框架，奠定了后续 3D 分子表示模型的接口形式，即输入原子序数 \(Z\) 和坐标 \(R\)，输出能量、性质或力。

#### 🧪 练习题
```yaml
question: "SchNet 中 continuous-filter convolution 的主要作用是什么？"
options:
  - "把分子坐标离散化成 3D 体素图像后使用普通 CNN"
  - "根据原子间连续距离生成卷积滤波器，使消息传递能平滑感知 3D 几何"
  - "显式计算所有键角和二面角作为输入特征"
  - "只根据原子类型预测分子性质，不使用坐标"
answer: 1
explain: "SchNet 的 cfconv 由距离 d_ij 生成滤波器 W(d_ij)，避免固定网格离散化，并让能量随原子坐标连续变化。"
```

### GROVER

```yaml
id: grover
num: 3
name: GROVER
full_name: 图表示预训练模型 (GROVER)
year: '2020'
org: 腾讯AI Lab
parent: mpnn
paper_url: https://arxiv.org/abs/2007.02835
project_url: ''
category: representation
motivation: 集成GNN与Transformer的1亿参数自监督模型
```

#### 📝 一句话总结
GROVER 提出了 GTransformer（将动态消息传递网络 dyMPN 与 Transformer 多头注意力深度融合）作为骨干网络，在 1000 万无标注分子上通过节点级上下文属性预测、边级上下文属性预测和图级功能基团预测三层自监督任务进行预训练，在 11 个分子性质预测基准上全面超越此前 SOTA，平均相对提升 6.1%。

#### 🎯 核心要点
- **GTransformer 架构**：将 dyMPN（动态消息传递网络，每层随机化跳数 \(K_l\)）作为 Transformer 中 Q/K/V 的生成器，替代传统线性投影，使注意力机制天然感知图拓扑结构
- **双视图设计**：节点级 GTransformer 和边级 GTransformer 并行处理，分别以节点和边为中心聚合信息，最终通过 readout 融合两个视图的表示
- **动态消息传递 (dyMPN)**：每一层随机采样消息传递跳数 \(K_l \sim \text{Uniform}[1, K]\)，起到类似 DropOut 的正则化效果，提升泛化能力
- **长程残差连接**：跨 GTransformer 层的残差连接缓解深层 GNN 的过平滑问题
- **三级自监督预训练任务**：
- 节点级/边级：上下文属性预测（Contextual Property Prediction）——提取 k-hop 子图中 (节点类型, 边类型) 对的统计分布作为上下文属性标签
- 图级：功能基团预测（Graph-level Motif Prediction）——多标签分类预测 85 种 RDKit 提取的官能团
- **大规模预训练**：GROVER\_base（~48M 参数）和 GROVER\_large（~100M 参数），在 ZINC15 + ChEMBL 共约 1000 万分子上预训练，使用 250 块 V100 GPU
- **11 个基准全面 SOTA**：6 个分类任务（ROC-AUC）和 5 个回归任务（RMSE）上均取得最优或接近最优结果，分类平均提升 2.2%，回归平均提升 10.8%

#### 🔬 深入细节
##### 整体架构

![GROVER 完整架构图](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x8.png)
*图：GROVER 完整架构。左侧为节点级 GTransformer，右侧为边级 GTransformer，两个视图并行处理后通过 readout 层融合。每个 GTransformer 层内部由 dyMPN + 多头注意力 + 前馈网络组成。*

GROVER 的核心思想是：**将 GNN 的消息传递机制嵌入 Transformer 架构内部**，而非简单地将两者串联。具体来说，传统 Transformer 中通过线性变换生成 Q、K、V，而 GTransformer 用 dyMPN（动态消息传递网络）替代这些线性变换，使得每个注意力头的查询/键/值都携带了局部图拓扑信息。

![GTransformer 单层结构](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x1.png)
*图：GTransformer 单层结构。dyMPN 替代线性投影生成 Q、K、V，随后进入标准多头注意力和前馈网络。*

##### GTransformer 与 dyMPN 核心机制

**动态消息传递网络 (dyMPN)** 是 GROVER 的关键创新之一。在标准 MPNN 中，消息传递的跳数（depth）在所有层中固定。dyMPN 在每一层 \(l\) 中随机采样跳数：

$$K_l \sim \text{Uniform}[1, K]$$

其中 \(K\) 是预设的最大跳数。这种随机化机制有两个好处：(1) 每次前向传播看到不同大小的感受野，起到数据增强和正则化的效果；(2) 避免固定深度带来的过平滑问题。

对于节点 \(v\) 在第 \(l\) 层的消息传递，dyMPN 执行 \(K_l\) 步迭代：

$$m_v^{(t)} = \sum_{u \in \mathcal{N}(v)} M_t(h_v^{(t-1)}, h_u^{(t-1)}, e_{uv}), \quad t = 1, \ldots, K_l$$

$$h_v^{(t)} = U_t(h_v^{(t-1)}, m_v^{(t)})$$

其中 \(M_t\) 为消息函数，\(U_t\) 为更新函数，\(e_{uv}\) 为边特征。最终 \(h_v^{(K_l)}\) 作为该层的输出。

**GTransformer 层** 的完整计算流程为：

$$Q = \text{dyMPN}_Q(H^{(l-1)}), \quad K = \text{dyMPN}_K(H^{(l-1)}), \quad V = \text{dyMPN}_V(H^{(l-1)})$$

$$\text{Attn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

$$H^{(l)} = \text{FFN}(\text{Attn}(Q, K, V)) + H^{(l-1)}$$

> 💡 **关键直觉**：传统 Transformer 的注意力权重仅基于特征相似度，而 GTransformer 的注意力权重隐式编码了图拓扑距离——因为 Q 和 K 本身就是通过消息传递在局部子图上聚合得到的。这使得注意力机制能够同时捕获**局部化学键连接模式**和**全局分子结构关系**。

**双视图并行处理**：GROVER 同时运行两个 GTransformer——一个以节点（原子）为中心，一个以边（化学键）为中心。两者共享相同的架构但参数独立，最终通过 readout 函数（如均值池化 + 拼接）融合两个视图的表示，生成分子级别的嵌入向量。

##### 自监督预训练任务

![自监督任务示意图](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x2.png)
*图：GROVER 的自监督预训练任务。左：上下文属性预测（节点/边级）；右：功能基团预测（图级）。*

GROVER 设计了三个层级的自监督任务，覆盖从局部到全局的分子信息：

**1. 上下文属性预测 (Contextual Property Prediction)**

![上下文属性提取](https://ar5iv.labs.arxiv.org/html/2007.02835/assets/x3.png)
*图：上下文属性的提取过程。对目标节点提取 k-hop 子图，统计子图中 (节点类型, 边类型) 对的出现频次，形成上下文属性字符串。*

对于每个节点 \(v\)，提取其 \(k\)-hop 邻域子图 \(\mathcal{G}_k(v)\)，统计子图中所有 (原子类型, 键类型) 对的出现次数，将这些计数排序后拼接成一个字符串，作为该节点的**上下文属性标签**。例如，一个碳原子的 1-hop 邻域中有 2 个 C-单键、1 个 N-双键，则其上下文属性为 `"C-single:2,N-double:1"`。

训练时，随机遮蔽 15% 的节点/边标签，让模型预测被遮蔽位置的上下文属性类别（多分类任务）。实验中 \(k=1\)，共提取出 2518 种节点上下文属性和 2686 种边上下文属性。

> ⚠️ **与 BERT 的类比**：上下文属性预测类似于 BERT 的 Masked Language Model，但不是简单地预测原子类型，而是预测**原子在其化学环境中的角色**——这编码了更丰富的局部化学信息。

**2. 功能基团预测 (Graph-level Motif Prediction)**

在图级别，使用 RDKit 工具包提取每个分子中存在的 85 种官能团（如羟基 -OH、羧基 -COOH、苯环等），构建多标签分类任务。模型需要从分子图的全局表示中预测哪些官能团存在。

这一任务迫使模型学习**全局化学结构模式**，与局部的上下文属性预测形成互补。

```python
# GROVER 预训练伪代码
for batch in unlabeled_molecules:
    # 1. 双视图编码
    node_repr = NodeGTransformer(batch.graph)   # 节点视图
    edge_repr = EdgeGTransformer(batch.graph)   # 边视图
    graph_repr = Readout(node_repr, edge_repr)  # 图级表示
    
    # 2. 节点级上下文属性预测 (随机遮蔽 15%)
    masked_nodes = random_mask(batch.nodes, ratio=0.15)
    loss_node_ctx = CrossEntropy(
        predict(node_repr[masked_nodes]),
        contextual_property_labels[masked_nodes]  # 2518 类
    )
    
    # 3. 边级上下文属性预测 (随机遮蔽 15%)
    masked_edges = random_mask(batch.edges, ratio=0.15)
    loss_edge_ctx = CrossEntropy(
        predict(edge_repr[masked_edges]),
        contextual_property_labels[masked_edges]  # 2686 类
    )
    
    # 4. 图级功能基团预测
    loss_motif = BCELoss(
        predict(graph_repr),
        functional_group_labels  # 85 维多标签
    )
    
    # 5. 联合优化
    loss = loss_node_ctx + loss_edge_ctx + loss_motif
    optimizer.step(loss)
```

##### 与传统方法的对比

| 特性 | 传统 GNN (MPNN/GIN) | Hu et al. (2020) 预训练 | **GROVER** |
|------|---------------------|------------------------|------------|
| 骨干网络 | 固定深度消息传递 | GIN + 线性层 | GTransformer (dyMPN + 注意力) |
| 预训练数据 | 无 | ~2M 分子 | **~10M 分子** |
| 预训练任务 | 无 | 节点/边属性预测 + 图属性预测 | **上下文属性预测 + 功能基团预测** |
| 参数规模 | ~1-5M | ~2-5M | **48M-100M** |
| 注意力机制 | 无/简单 GAT | 无 | **拓扑感知多头注意力** |
| 正则化 | Dropout | Dropout | **dyMPN 随机跳数 + Dropout** |

> 💡 **核心区别**：Hu et al. (2020) 的预训练任务直接预测原子/键的化学属性（如原子序数、键类型），这些信息在输入特征中已经存在，模型可能学到"捷径"。GROVER 的上下文属性预测要求模型理解**原子在化学环境中的角色**，是一种更高层次的语义信息，迫使模型学习更有意义的表示。

##### 实验结果

GROVER 在 MoleculeNet 基准的 11 个数据集上进行了评估，使用 scaffold split（基于分子骨架的划分，更接近真实应用场景）：

**分类任务 (ROC-AUC ↑)**：

| 数据集 | DMPNN | Hu et al. | GROVER\_base | **GROVER\_large** |
|--------|-------|-----------|-------------|-------------------|
| BBBP | 0.919 | 0.915 | 0.936 | **0.940** |
| SIDER | 0.632 | 0.614 | 0.656 | **0.658** |
| ClinTox | 0.897 | 0.762 | 0.925 | **0.944** |
| BACE | 0.852 | 0.851 | 0.878 | **0.894** |
| Tox21 | 0.826 | 0.811 | 0.819 | **0.831** |
| ToxCast | 0.718 | 0.714 | 0.723 | **0.737** |

**回归任务 (RMSE ↓)**：

| 数据集 | DMPNN | AttentiveFP | GROVER\_base | **GROVER\_large** |
|--------|-------|-------------|-------------|-------------------|
| FreeSolv | 2.177 | 2.030 | 1.592 | **1.544** |
| ESOL | 0.980 | 0.853 | 0.888 | **0.831** |
| Lipo | 0.653 | 0.650 | 0.563 | **0.560** |
| QM7 | 105.8 | 126.7 | **72.5** | 72.6 |
| QM8 | 0.0143 | 0.0282 | 0.0172 | **0.0125** |

GROVER\_large 在全部 11 个数据集上取得最优结果，整体相对提升 6.1%（分类 2.2%，回归 10.8%）。尤其在小数据集 FreeSolv（仅 642 个标注分子）上取得了 23.9% 的相对提升，验证了预训练对低资源场景的显著增益。

**消融实验关键发现**：
- **预训练 vs 无预训练**：自监督预训练带来平均 +3.8% AUC 提升，小数据集（SIDER、ClinTox、BACE）提升更大
- **GTransformer vs GIN/MPNN 骨干**：在相同参数量（~38M）下，GTransformer 的训练和验证损失均优于 GIN 和 MPNN
- **dyMPN 的作用**：移除 dyMPN（固定跳数）后训练损失略优但验证损失变差，说明 dyMPN 的随机化机制提升了泛化能力
- **GTransformer vs 简单拼接**：将 GTransformer 替换为原始 Transformer（即 GNN 输出直接送入标准 Transformer）效果最差，说明**不能简单地将 GNN 和 Transformer 串联**，必须深度融合

#### 🧪 练习题
```yaml
question: "GROVER 中 GTransformer 与标准 Transformer 的核心区别是什么？"
options:
  - "GTransformer 使用更多的注意力头数"
  - "GTransformer 用动态消息传递网络 (dyMPN) 替代线性投影来生成 Q、K、V"
  - "GTransformer 移除了前馈网络层以减少参数"
  - "GTransformer 使用图卷积网络替代了 softmax 注意力计算"
answer: 1
explain: "GTransformer 的核心创新是用 dyMPN 替代标准 Transformer 中生成 Q/K/V 的线性投影层，使注意力机制天然感知图拓扑结构，而非简单地将 GNN 和 Transformer 串联。"
```

### DimeNet

```yaml
id: dimenet
num: 4
name: DimeNet
full_name: 方向性消息传递网络 (DimeNet)
year: '2020'
org: TU Munich
parent: schnet
paper_url: https://arxiv.org/abs/2003.03123
project_url: ''
category: representation
motivation: 加入角度信息提升3D构象区分度
```

#### 📝 一句话总结
DimeNet 通过在消息传递中引入原子间键角的方向信息，并使用球面 Fourier-Bessel 基函数联合表示距离和角度，使 GNN 首次能够区分仅靠距离无法区分的分子构型，在 QM9 基准上平均误差降低 31%。

#### 🎯 核心要点
- **方向消息传递**：消息定义在原子对（边）上而非节点上，聚合时引入键角 \(\alpha_{(kj,ji)}\)，直接建模力场中的键角弯曲项
- **球面 Fourier-Bessel 2D 基**：从薛定谔方程推导正交基函数，联合表示距离 \(d_{kj}\) 和角度 \(\alpha_{(kj,ji)}\)，提供物理归纳偏置
- **径向 Bessel 基**：仅 16 个基函数（SchNet 用 300 个高斯），参数效率提升 20 倍且性能更优
- **连续可微设计**：Swish 激活 + 包络函数（三重零点截断），支持通过反向传播预测原子力
- **QM9 SOTA**：12 个量子化学目标中 11 个达到最优，平均标准化 MAE 降低 31%
- **MD17 分子动力学**：1000 样本下大幅超越 SchNet，与手工特征的 sGDML 持平
- **消融验证**：去掉角度信息误差 +26%，退化为节点嵌入误差 +68%，Bessel 基替换高斯基误差 -10%

#### 🔬 深入细节
##### 核心架构示意

![DimeNet Architecture](https://raw.githubusercontent.com/gasteigerjo/dimenet/master/2dfilter_crop.png)
*图：DimeNet 架构总览——Embedding Block 生成初始消息嵌入，多个 Interaction Block 通过方向消息传递迭代更新，每层输出经 Output Block 汇聚为最终预测。*

```
┌─────────────────────────────────────────────────────────────┐
│                      DimeNet 架构                            │
│                                                              │
│  原子类型 z, 坐标 x                                          │
│    │                                                         │
│    ▼  计算: d_ji → e_RBF ;  d_kj, α_(kj,ji) → a_SBF        │
│  ┌────────────┐                                              │
│  │ Embedding   │ m_ji^(1) = σ([h_j ∥ h_i ∥ e_RBF] W + b)   │
│  └─────┬──────┘                                              │
│        │                                                     │
│        ▼  ×T 层                                              │
│  ┌────────────┐  m_ji^(l+1) = f_update(m_ji^(l),            │
│  │ Interaction │       Σ_{k∈N_j\i} f_int(m_kj, e_RBF, a_SBF))│
│  └─────┬──────┘                                              │
│        │  每层 → Output Block                                │
│        ▼                                                     │
│  ┌────────────┐  t_i^(l) = MLP(Σ_j (e_RBF ⊙ W)·m_ji)      │
│  │  Output     │  t = Σ_i Σ_l t_i^(l)                       │
│  └────────────┘                                              │
└─────────────────────────────────────────────────────────────┘
```

##### 算法伪代码

```python
# DimeNet 前向传播核心逻辑
def DimeNet_forward(atom_types, positions, cutoff=5.0):
    # 1. 构建邻居图 & 计算几何特征
    edges = {(j,i) for all pairs where ||x_j - x_i|| < cutoff}
    d_ji = ||x_j - x_i||                          # 原子间距离
    alpha_kji = angle(x_k, x_j, x_i)              # 三体键角

    # 2. 基函数表示 (Sec.5)
    e_RBF = envelope(d_ji) * sqrt(2/c) * sin(n*π*d_ji/c) / d_ji   # Eq.7, n=1..16
    a_SBF = envelope(d_kj) * j_l(z_ln/c * d_kj) * Y_l^0(alpha)   # Eq.6, 2D基

    # 3. Embedding Block (Eq.9)
    h_i = learnable_embedding[atom_types[i]]       # F维原子嵌入
    m_ji = swish(concat(h_j, h_i, e_RBF) @ W + b) # 初始消息嵌入

    # 4. 累积输出
    t = output_block(m_ji, e_RBF)

    # 5. T个 Interaction Block (Eq.4)
    for l in range(T):
        for each (j, i) in edges:
            # 交互: 利用角度+距离的2D表示
            x_kj = W_bilinear @ a_SBF              # 双线性变换
            inter = sum_k( (m_kj @ W) * x_kj )     # 聚合邻居消息
            # 更新: 残差块
            m_ji = residual(m_ji + inter)
            m_ji = m_ji * (e_RBF @ W_rbf)          # 径向调制
        t += output_block(m_ji, e_RBF)

    return sum_over_atoms(t)                        # 分子级预测
```

##### 动机与背景：为什么距离不够？

传统分子 GNN（如 SchNet、PhysNet）仅使用原子间距离 \(d_{ji} = \|x_j - x_i\|\) 作为几何信息。论文从两个互补视角论证了这一局限性。**物理视角**：经典分子力场包含键伸缩项 \(E_{\text{bond}}(d)\)（仅依赖距离）和键角弯曲项 \(E_{\text{angle}}(\alpha)\)（依赖角度），仅用距离的模型只能建模前者，无法捕获后者。**图论视角**：仅使用距离的 GNN 等价于 1-WL 图同构测试，存在理论上无法区分的分子对——论文给出精妙反例：正六边形与两个等边三角形具有完全相同的距离多重集 \(\{d, d, d, d, d, d, \sqrt{3}d, \sqrt{3}d, \sqrt{3}d, 2d, ...\}\)，但化学性质截然不同。

##### 核心机制：方向消息传递

DimeNet 的关键创新是将消息定义在**原子对**（有向边）\((j, i)\) 上，而非原子（节点）上。更新消息 \(m_{ji}\) 时，聚合所有从邻居 \(k\) 到 \(j\) 的入射消息 \(m_{kj}\)，并利用三体键角 \(\alpha_{(kj,ji)} = \angle x_k x_j x_i\)：

$$m_{ji}^{(l+1)} = f_{\text{update}}\Big(m_{ji}^{(l)},\; \sum_{k \in \mathcal{N}_j \setminus \{i\}} f_{\text{int}}(m_{kj}^{(l)},\; e_{\text{RBF}}^{(ji)},\; a_{\text{SBF}}^{(kj,ji)})\Big)$$

这一设计的三重优势：(1) 消息嵌入自然与方向关联，\(m_{ji}\) 对应从 \(j\) 到 \(i\) 的方向；(2) 键角 \(\alpha_{(kj,ji)}\) 是旋转不变量，保证模型对全局旋转不变；(3) 消息嵌入等价于原子对嵌入，对应更高阶的 WL 测试，理论表达能力更强。

> 💡 **关键直觉**：与等变 CNN 在固定全局方向上应用滤波器不同，DimeNet 在每个邻居的**局部方向**上应用相同的学习滤波器，因此对全局旋转保持等变性，同时保留了邻居间的相对方向信息。

##### 物理启发的基表示：从薛定谔方程到 Fourier-Bessel

这是论文最优雅的部分。作者从量子力学第一性原理出发构建基函数：

1. DFT 计算的目标是电子密度 \(\langle\Psi|\Psi\rangle\)，波函数 \(\Psi\) 满足薛定谔方程
2. 在截断距离 \(c\) 内设 \(V=0\)，外部 \(V=\infty\)，简化为 Helmholtz 方程 \((\nabla^2 + k^2)\Psi = 0\)
3. 极坐标分离变量得到球面 Bessel 函数 \(j_l\) 和球面谐波 \(Y_l^m\) 的乘积

取 \(m=0\) 得到仅依赖 \(d\) 和 \(\alpha\) 的 2D 球面 Fourier-Bessel 基：

$$\tilde{a}_{\text{SBF},ln}(d, \alpha) = \sqrt{\frac{2}{c^3 j_{l+1}^2(z_{ln})}} \; j_l\!\left(\frac{z_{ln}}{c}d\right) Y_l^0(\alpha)$$

径向基取 \(l=m=0\)，利用 \(j_0(x) = \sin(x)/x\)：

$$\tilde{e}_{\text{RBF},n}(d) = \sqrt{\frac{2}{c}} \; \frac{\sin(n\pi d / c)}{d}$$

> ⚠️ **注意**：这些基函数的最高频率被 \(N_{\text{SHB}}\) 和 \(N_{\text{RBF}}\) 自然限制，提供了有效的正则化——仅 16 个径向基函数即可替代 SchNet 的 300 个高斯基函数（参数效率提升 20 倍）。

##### 连续可微性与力预测

DimeNet 需要二阶连续可微以通过反向传播预测原子力（\(\mathbf{F}_i = -\nabla_{x_i} E\)）。三处关键设计：(a) Swish 激活函数 \(\sigma(x) = x \cdot \text{sigmoid}(x)\) 替代 ReLU；(b) 包络函数 \(u(d)\) 在截断距离 \(c\) 处有三重零点，确保基函数及其一、二阶导数在截断处连续归零；(c) 仅使用原子类型和坐标，不依赖辅助数据。这些设计使 DimeNet 既能预测分子性质，又能用于分子动力学模拟，且预测的力天然满足能量守恒。

##### 实验亮点

在 QM9 基准（~130k 分子）上，DimeNet 在 12 个量子化学性质中 11 个达到 SOTA，平均标准化 MAE 比第二名（PhysNet）降低 31%。在 MD17 分子动力学基准（仅 1000 训练样本）上，大幅超越 SchNet 并与手工特征的 sGDML 持平。消融实验清晰量化了各组件贡献：Bessel 基替换高斯基降低 10% 误差；去掉角度信息误差增加 26%；退化为节点嵌入误差增加 68%。学到的 2D 滤波器在苯环特征角度（120°）和 C-C 键距离（1.39Å）处被激活，证实模型确实学会了利用方向信息。

#### 🧪 练习题
```yaml
question: "DimeNet 相比 SchNet 等传统分子 GNN 的核心创新是什么？"
options:
  - "使用 Transformer 注意力机制替代消息传递"
  - "在消息传递中引入原子间键角信息，将消息定义在原子对而非原子上"
  - "使用更大的截断距离以包含更多邻居原子"
  - "引入预训练策略提升小数据集性能"
answer: 1
explain: "DimeNet 的核心创新是方向消息传递——将消息定义在原子对（边）上并在聚合时利用键角 α_(kj,ji)，使模型能区分仅靠距离无法区分的分子构型。"
```

### GemNet

```yaml
id: gemnet
num: 5
name: GemNet
full_name: 几何消息传递网络 (GemNet)
year: '2021'
org: TU Munich
parent: dimenet
paper_url: https://arxiv.org/abs/2106.08903
project_url: ''
category: representation
motivation: 引入二面角和两步消息传递，成为3D图通用近似器
```

#### 📝 一句话总结
GemNet 从球面表示的通用近似理论出发，将其离散化为有向边嵌入上的两跳几何消息传递，把距离、键角和二面角统一纳入分子 GNN。相比 DimeNet 只显式使用三体角度，GemNet 进一步引入四元组交互、对称消息传递和高效双线性层，在 COLL、MD17 和 OC20 等分子动力学任务上显著降低力预测误差。

#### 🎯 核心要点
- **理论出发点**：证明球面表示足以近似对平移不变、对旋转/置换等变或不变的分子函数，再将球面方向离散为邻居原子方向
- **有向边嵌入**：用 \(\mathbf{m}_{ca}\) 表示“从原子 \(a\) 朝向原子 \(c\)”的方向嵌入，而不是只维护节点嵌入
- **两跳几何消息传递**：更新 \(\mathbf{m}_{ca}\) 时聚合 \(\mathbf{m}_{db}\)，路径 \(d \to b \to a \to c\) 形成四元组 \((c,a,b,d)\)
- **完整几何信息**：RBF 表示距离 \(x_{db}\)，CBF 表示距离-角度 \((x_{ba},\varphi_{abd})\)，SBF 表示距离-角度-二面角 \((x_{ca},\varphi_{cab},\theta_{cabd})\)
- **GemNet-Q / GemNet-T**：GemNet-Q 使用昂贵但表达力更强的四元组两跳消息传递；GemNet-T 去除两跳四元组交互，只保留较便宜的一跳几何交互
- **方差稳定缩放**：用固定 scaling factors 稳定跳连、SiLU、聚合和双线性层的激活方差，避免 batch/layer normalization 对分子回归的不利影响
- **力预测两种路线**：默认由 \(\mathbf{F}_a=-\partial E/\partial \mathbf{x}_a\) 保证守恒力场，也提出直接力预测变体以换取训练和推理速度

#### 🔬 深入细节
##### 核心架构示意

![GemNet NeurIPS 官方 Poster](https://neurips.cc/media/PosterPDFs/NeurIPS%202021/35cf8659cfcb13224cbd47863a34fc58_E70pQCX.png?t=1638466681.9316065)
*图：NeurIPS 2021 官方 poster，包含 GemNet 的理论路线、几何消息传递、架构块和实验结果。论文源码中的 `figures/architecture_main.tex` 也给出同一架构细节；arXiv 未提供稳定的 HTML 图片直链，因此这里使用 NeurIPS 官方 poster 图源。*

```
原子序数 z, 坐标 X
   │
   ├─ 计算邻居方向与几何基:
   │   RBF(x_db), CBF(x_ba, phi_abd), SBF(x_ca, phi_cab, theta_cabd)
   │
   ├─ Embedding: 初始化原子嵌入 h_a 与有向边嵌入 m_ca
   │
   ├─ ×L Interaction Blocks
   │     ├─ Q-MP: 四元组两跳消息 m_db -> m_ca
   │     ├─ T-MP: 三元组/一跳角度消息
   │     ├─ Atom self-interaction: 聚合边嵌入更新 h_a
   │     └─ Residual + variance scaling
   │
   └─ 输出能量 E；力 F = -grad_X E 或直接方向力头
```

##### 算法伪代码

```python
# GemNet-Q 单个前向传播的核心逻辑
def gemnet_forward(atom_numbers, positions, cutoff_emb, cutoff_int, n_blocks):
    # 1. 构建嵌入图和交互图
    emb_edges = [(c, a) for c != a if dist(c, a) < cutoff_emb]
    int_edges = [(b, a) for b != a if dist(b, a) < cutoff_int]

    # 2. 初始化原子与有向边嵌入
    h_a = atom_embedding(atom_numbers)
    m_ca = edge_embedding(atom_numbers, emb_edges, positions)

    # 3. 预计算几何基函数
    rbf = RBF(dist(d, b))                         # 二体距离
    cbf = CBF(dist(b, a), angle(a, b, d))         # 三体角度
    sbf = SBF(dist(c, a), angle(c, a, b),
              dihedral(c, a, b, d))              # 四体二面角

    for l in range(n_blocks):
        # Q-MP: 两跳几何消息传递，四元组 c-a-b-d
        delta_m = zeros_like(m_ca)
        for c, a in emb_edges:
            for b in neighbors_int(a):
                for d in neighbors_emb(b):
                    if all_distinct(c, a, b, d):
                        filt = bilinear(sbf[c,a,b,d], cbf[b,a,d], rbf[d,b])
                        delta_m[c,a] += filt @ m_ca[d,b]

        # T-MP: 较便宜的一跳几何消息，类似 DimeNet 的角度交互
        delta_m += triplet_message_passing(m_ca, cbf, rbf)

        # 原子自交互：边 -> 原子 -> 边
        h_a = h_a + atom_update(aggregate_edges_to_atoms(m_ca))
        m_ca = scaled_residual(m_ca, delta_m, h_a)

    energy = sum(readout_atom_energy(h_a, m_ca))
    forces = -grad(energy, positions)
    return energy, forces
```

##### 从球面通用近似到边消息传递

GemNet 的理论起点不是简单“再加一个角度特征”，而是先考虑每个原子上的球面函数表示。对于原子 \(a\)，如果方向 \(\hat{\mathbf{r}}\in S^2\) 上维护一个表示 \(H_a(\hat{\mathbf{r}})\)，那么全局旋转只会旋转球面函数的方向坐标，不会破坏相对几何。论文证明，基于球面表示的网络可以近似分子中需要的平移不变、旋转和置换等变函数。

实际计算不可能在连续球面上积分，因此 GemNet 把球面方向采样为邻居原子方向。于是 \(H_a(\hat{\mathbf{x}}_{ca})\) 就变成有向边嵌入 \(\mathbf{m}_{ca}\)：它不是普通的“边 \(c,a\) 特征”，而是原子 \(a\) 在朝向 \(c\) 的方向上的局部表示。

##### 核心机制：两跳几何消息传递

GemNet 更新 \(\mathbf{m}_{ca}\) 时，考虑另一个方向嵌入 \(\mathbf{m}_{db}\) 如何通过交互边 \(b \to a\) 影响它。四个原子 \(c,a,b,d\) 共同定义了距离、两个角度和一个二面角：

$$
\tilde{\mathbf{m}}_{ca}
= \sum_{\substack{b\in\mathcal{N}^{\text{int}}_a\setminus\{c\}\\
d\in\mathcal{N}^{\text{emb}}_b\setminus\{a,c\}}}
\mathcal{F}(x_{db},x_{ba},x_{ca},\varphi_{abd},\varphi_{cab},\theta_{cabd})
\;\mathbf{m}_{db}
$$

论文中将 \(\mathcal{F}\) 拆成三类基函数，再用线性/双线性层组合：

$$
\tilde{e}_{\text{RBF},n}(x_{db})
= \sqrt{\frac{2}{c_{\text{emb}}}}
\frac{\sin(\frac{n\pi}{c_{\text{emb}}}x_{db})}{x_{db}}
$$

$$
\tilde{e}_{\text{CBF},ln}(x_{ba},\varphi_{abd})
=
\sqrt{\frac{2}{c_{\text{int}}^3j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c_{\text{int}}}x_{ba}\right)Y_{l0}(\varphi_{abd})
$$

$$
\tilde{e}_{\text{SBF},lmn}(x_{ca},\varphi_{cab},\theta_{cabd})
=
\sqrt{\frac{2}{c_{\text{emb}}^3j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c_{\text{emb}}}x_{ca}\right)Y_{lm}(\varphi_{cab},\theta_{cabd})
$$

> 💡 关键：DimeNet 的方向消息传递主要使用距离和键角；GemNet 的 Q-MP 通过四元组引入二面角，使模型能区分更复杂的非平面构象和分子动力学状态。

##### Q-MP、T-MP 与复杂度权衡

四元组两跳消息传递的复杂度约为：

$$
\mathcal{O}(n k_{\text{int}} k_{\text{emb}}^2)
$$

其中 \(k_{\text{int}}\) 是交互邻居数，\(k_{\text{emb}}\) 是方向嵌入邻居数。这比 DimeNet 式三元组消息更贵，因此论文同时提出两类模型：GemNet-Q 保留 Q-MP，表达力更强；GemNet-T 删除两跳四元组交互，只保留 T-MP、原子自交互等较便宜模块，复杂度约为 \(\mathcal{O}(n k_{\text{emb}}^2)\)。

实验现象也符合这个设计：在单个分子构象变化相对简单的 MD17 上，GemNet-T 可接近 GemNet-Q；在 COLL 这种覆盖更多碰撞和非平面动态的任务上，GemNet-Q 的两跳消息优势更明显。这说明二面角和两跳路径不是“免费提升”，而是在几何复杂度足够高时更有价值。

##### 方差缩放与力预测

分子势能模型通常不适合直接套用 batch normalization：一个 batch 里不同分子/原子之间的统计相关会干扰物理回归；layer normalization 又会抹平不同距离尺度下本该存在的交互强弱差异。GemNet 因此采用固定缩放因子稳定激活方差，例如跳连：

$$
y = \frac{x + f(x)}{\sqrt{2}}
$$

SiLU 非线性、聚合和双线性层也使用预估 scaling factors，让初始化时各层方差大体稳定。

力预测方面，默认路线仍然是能量梯度：

$$
\mathbf{F}_a = -\frac{\partial E}{\partial \mathbf{x}_a}
$$

它保证保守力场，适合分子动力学稳定模拟。论文也利用等变向量分解提出直接力预测：为每条方向嵌入预测一个标量强度，再沿对应方向求和：

$$
\hat{\mathbf{F}}_a
= \sum_{c\neq a} s_{ca}\,\frac{\mathbf{x}_c-\mathbf{x}_a}{\|\mathbf{x}_c-\mathbf{x}_a\|_2}
$$

直接预测更快，但在小分子动力学数据上通常牺牲精度；在更大规模 OC20 任务上，直接力变体的速度和优化优势更明显。

#### 🧪 练习题
```yaml
question: "GemNet-Q 相比 DimeNet 的关键几何增强是什么？"
options:
  - "完全去掉坐标，只使用 2D 分子图拓扑"
  - "使用四元组两跳消息传递，引入二面角信息更新有向边嵌入"
  - "把所有原子坐标投影到固定 3D 体素网格"
  - "只扩大模型层数，不改变几何特征"
answer: 1
explain: "GemNet-Q 通过 c-a-b-d 四元组在有向边嵌入之间做两跳消息传递，显式利用距离、角度和二面角，因此比只用三体角度的 DimeNet 表达力更强。"
```

### Uni-Mol

```yaml
id: unimol
num: 6
name: Uni-Mol
full_name: 通用分子表示框架 (Uni-Mol)
year: '2023'
org: DP Technology
parent: gemnet
paper_url: https://arxiv.org/abs/2302.12600
project_url: ''
category: representation
motivation: 3D空间位置预训练，统一性质预测与对接任务
```

#### 📝 一句话总结
Uni-Mol 提出了首个通用的 3D 分子预训练框架，通过高效的 SE(3)-invariant Transformer 骨干网络在 2.09 亿分子构象和 300 万蛋白口袋数据上进行预训练，利用 3D 坐标去噪和掩码原子预测两个自监督任务学习 3D 空间表示，在分子性质预测（14/15 SOTA）、蛋白-配体对接和构象生成等下游任务上全面超越现有方法。

#### 🎯 核心要点
- **双模型预训练架构**：分子模型（209M 构象预训练）和口袋模型（3M 蛋白口袋预训练）共享同一 SE(3) Transformer 骨干
- **高效 SE(3) Transformer 骨干**：基于 Pre-LayerNorm Transformer，引入原子表示（atom representation）和对表示（pair representation）双通道，通过不变性空间位置编码（Euclidean 距离 + Gaussian 核）编码 3D 信息
- **双向通信机制**：atom-to-pair（QK 乘积更新 pair 表示）和 pair-to-atom（pair 表示作为注意力偏置），实现原子级与对级表示的信息交互
- **两个预训练任务**：3D 坐标去噪恢复（coordinate denoising）+ 15% 掩码原子类型预测（masked atom prediction）
- **3D 坐标直接输入/输出**：首个能直接以 3D 坐标作为输入和输出的分子预训练框架，支持构象生成和对接等 3D 空间任务
- **多任务微调策略**：分子性质预测（CLS token + MLP）、构象生成（迭代坐标优化）、对接（双模型联合 + 距离矩阵打分）
- **MoleculeNet 14/15 SOTA**；CASF-2016 对接 Top-1 成功率 91.2%；RMSD ≤ 2Å 占比 80.35%（较最佳基线提升 22.58%）

#### 🔬 深入细节
![Uni-Mol 框架总览](https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png)
*图：Uni-Mol 预训练与微调框架示意。上方为预训练阶段（分子模型 + 口袋模型），下方为多种下游任务微调。*

##### 算法伪代码

```python
# Uni-Mol 骨干网络前向传播伪代码
def unimol_forward(atom_types, coordinates, n_layers):
    # 初始化
    x = Embedding(atom_types)                          # atom repr: [N, d]
    d_ij = pairwise_euclidean(coordinates)             # [N, N]
    q = gaussian_kernel(d_ij, pair_types)              # pair repr: [N, N, H]

    for l in range(n_layers):
        # === Self-Attention with pair-to-atom communication ===
        Q, K, V = linear_qkv(LayerNorm(x))            # [N, H, d/H]
        attn_logits = Q @ K.T / sqrt(d) + q           # pair repr as bias
        attn_weights = softmax(attn_logits)
        x = x + attn_weights @ V                      # update atom repr

        # === Atom-to-pair communication ===
        q = q + concat_heads(Q @ K.T / sqrt(d))       # QK product → pair repr

        # === FFN ===
        x = x + FFN(LayerNorm(x))

    return x, q  # atom representations, pair representations

# 预训练任务
def pretrain_step(atom_types, coordinates):
    # 1. 掩码原子预测：随机掩码 15% 原子
    masked_types, mask_indices = random_mask(atom_types, ratio=0.15)

    # 2. 坐标去噪：对坐标添加均匀噪声
    noisy_coords = coordinates + uniform_noise(-1, 1)

    # 前向传播
    x, q = unimol_forward(masked_types, noisy_coords, N)

    # 损失计算
    L_atom = CrossEntropy(atom_head(x[mask_indices]), atom_types[mask_indices])
    L_coord = SmoothL1(coord_head(x, q), coordinates)  # 恢复原始坐标
    L_dist = SmoothL1(dist_head(q), pairwise_dist(coordinates))  # 恢复原子对距离
    return L_atom + L_coord + L_dist
```

##### 动机与背景

分子表示学习（MRL）在药物设计中至关重要，但现有方法存在根本性局限：**大多数方法将分子视为 1D 序列（SMILES）或 2D 拓扑图，无法充分利用决定分子性质的 3D 空间信息**。虽然部分工作（如 GraphMVP、GEM）尝试引入 3D 信息，但它们仅将 3D 作为辅助监督信号，无法直接以 3D 坐标作为输入/输出，因此无法处理构象生成、对接等真正的 3D 空间任务。Uni-Mol 的核心动机是构建一个**纯 3D 的通用分子预训练框架**，让 3D 坐标既是输入也是输出。

##### 核心机制：SE(3)-Invariant Transformer

Uni-Mol 选择 Transformer 而非 GNN 作为骨干，原因在于 Transformer 的全连接注意力能捕获**长程原子间交互**，而 GNN 受限于局部连接图。但标准 Transformer 无法处理 3D 空间数据，因此 Uni-Mol 引入了以下关键修改：

**1. 不变性空间位置编码（Invariant Spatial Positional Encoding）**

给定原子坐标 \(\mathbf{r}_i, \mathbf{r}_j\)，计算欧氏距离：

$$d_{ij} = \|\mathbf{r}_i - \mathbf{r}_j\|_2$$

然后通过对类型感知的 Gaussian 核将标量距离映射为向量表示：

$$\phi_k(d_{ij}) = \exp\left(-\beta_k (d_{ij} - \mu_k)^2\right), \quad k = 1, \ldots, K$$

其中 \(\mu_k\) 和 \(\beta_k\) 是可学习参数。这种编码对全局旋转和平移不变（SE(3)-invariant），因为仅依赖原子对距离。

**2. 双通道表示与双向通信**

Uni-Mol 维护两种表示：
- **原子表示** \(\mathbf{x}_i \in \mathbb{R}^d\)：由原子类型嵌入初始化
- **对表示** \(\mathbf{q}_{ij} \in \mathbb{R}^H\)：由空间位置编码初始化

两者通过双向通信机制交互：

**Pair-to-Atom**（对表示作为注意力偏置）：

$$\text{Attention}(\mathbf{Q}_i^{l,h}, \mathbf{K}_j^{l,h}, \mathbf{V}_j^{l,h}) = \text{softmax}\left(\frac{\mathbf{Q}_i^{l,h} (\mathbf{K}_j^{l,h})^T}{\sqrt{d}} + q_{ij}^{l-1,h}\right) \mathbf{V}_j^{l,h}$$

> 💡 **关键直觉**：对表示 \(q_{ij}\) 编码了原子 \(i, j\) 之间的空间距离信息，将其加到注意力 logits 上，使得空间上更近的原子对获得更高的注意力权重，从而让模型"感知"3D 结构。

**Atom-to-Pair**（QK 乘积更新对表示）：

$$\mathbf{q}_{ij}^{l+1} = \mathbf{q}_{ij}^l + \left\{\frac{\mathbf{Q}_i^{l,h} (\mathbf{K}_j^{l,h})^T}{\sqrt{d}} \;\middle|\; h \in [1, H]\right\}$$

> 💡 **关键直觉**：注意力的 QK 乘积反映了原子间的语义相关性，将其反馈到对表示中，使得对表示不仅包含几何距离信息，还融合了化学语义信息。

**3. 坐标预测头（SE(3)-Equivariant Output）**

虽然内部表示是 SE(3)-invariant 的，但 Uni-Mol 通过巧妙的坐标预测头实现了 SE(3)-equivariant 的坐标输出：

$$\Delta \mathbf{r}_i = \frac{1}{N} \sum_{j \neq i} f(\mathbf{q}_{ij}) \cdot \frac{\mathbf{r}_i - \mathbf{r}_j}{\|\mathbf{r}_i - \mathbf{r}_j\| + \epsilon}$$

其中 \(f(\cdot)\) 是从对表示到标量的映射。方向向量 \(\frac{\mathbf{r}_i - \mathbf{r}_j}{\|\mathbf{r}_i - \mathbf{r}_j\|}\) 提供等变性，而 \(f(\mathbf{q}_{ij})\) 提供不变的标量权重。

##### 预训练策略

Uni-Mol 使用两个互补的预训练任务：

**任务 1：3D 坐标去噪恢复（Coordinate Denoising）**

对输入坐标添加均匀噪声 \(\boldsymbol{\delta} \sim U(-1, 1)\)，模型需恢复原始坐标。损失包含两部分：

$$\mathcal{L}_{\text{coord}} = \frac{1}{N}\sum_i \text{SmoothL1}(\hat{\mathbf{r}}_i, \mathbf{r}_i) + \frac{1}{N^2}\sum_{i,j} \text{SmoothL1}(\hat{d}_{ij}, d_{ij})$$

第一项直接监督坐标恢复，第二项监督原子对距离恢复，两者共同约束 3D 结构重建。

> ⚠️ **注意**：坐标去噪任务的设计灵感来自去噪自编码器（Denoising Autoencoder），但应用在 3D 空间中——这迫使模型学习原子间的空间关系和化学键约束，而不仅仅是记忆坐标值。

**任务 2：掩码原子预测（Masked Atom Prediction）**

随机掩码 15% 的原子类型（替换为特殊 [MASK] token），模型预测被掩码原子的类型。这类似于 BERT 的 MLM 任务，但在 3D 上下文中进行：

$$\mathcal{L}_{\text{atom}} = -\frac{1}{|\mathcal{M}|}\sum_{i \in \mathcal{M}} \log P(\text{type}_i | \mathbf{x}_i)$$

##### 微调策略

Uni-Mol 针对不同下游任务设计了专门的微调策略：

| 任务类型 | 微调方式 | 关键设计 |
|---------|---------|---------|
| 分子性质预测 | CLS token + MLP | 初始构象由 RDKit 生成，无需实验3D数据 |
| 构象生成 | 迭代坐标优化 | 从 RDKit 初始构象出发，多轮前向传播逐步优化坐标 |
| 蛋白-配体对接 | 双模型联合 | 分子模型 + 口袋模型分别编码，学习距离矩阵打分函数 |
| 口袋性质预测 | 口袋模型 + MLP | 利用口袋预训练模型的表示 |

**对接任务的特殊设计**：将分子模型和口袋模型的对表示拼接，学习一个预测蛋白-配体原子对距离的打分函数。然后通过优化配体坐标使预测距离与实际距离匹配，实现对接姿态预测。

##### 预训练数据规模

- **分子数据**：从 2.09 亿个分子构象中预训练（来自 19M 分子，每个分子最多 11 个构象，由 RDKit ETKDG + MMFF94 力场生成）
- **口袋数据**：从 AlphaFold2 预测结构中提取 300 万候选蛋白口袋（使用 fpocket 工具检测）
- **模型规模**：~48M 参数（分子模型），15 层 Transformer，隐藏维度 512，注意力头 64

##### 与传统方法的区别

| 特性 | 1D/2D MRL (SMILES-BERT, MolCLR) | 3D-辅助 MRL (GraphMVP, GEM) | **Uni-Mol** |
|------|------|------|------|
| 3D 信息使用 | ❌ 无 | ⚠️ 仅作辅助监督 | ✅ 直接输入/输出 |
| 构象生成 | ❌ 不支持 | ❌ 不支持 | ✅ 迭代优化 |
| 对接任务 | ❌ 不支持 | ❌ 不支持 | ✅ 双模型联合 |
| 预训练数据 | 2D 图/SMILES | 2D+3D 对比 | 纯 3D 构象 |
| 位置编码 | 序列/图位置 | 键角/键长 | 欧氏距离 Gaussian 核 |

#### 🧪 练习题
```yaml
question: "Uni-Mol 中 pair representation 的初始化方式和更新机制分别是什么？"
options:
  - "由原子类型嵌入初始化，通过 FFN 更新"
  - "由欧氏距离 Gaussian 核初始化，通过注意力 QK 乘积更新"
  - "由键角和键长初始化，通过消息传递更新"
  - "由随机初始化，通过对比学习更新"
answer: 1
explain: "Pair representation 由原子对欧氏距离经 Gaussian 核编码初始化（SE(3)-invariant），在每层通过 atom-to-pair 通信（即注意力的 QK 乘积）进行更新，融合几何与语义信息。"
```

### MIST

```yaml
id: mist
num: 7
name: MIST
full_name: 分子交互结构Tokenizer (MIST)
year: '2026.04'
org: 密歇根大学
parent: unimol
paper_url: https://midas.umich.edu/events/aiir-symposium-2026/
project_url: ''
category: representation
motivation: 18亿参数基础模型，捕获核、电子与几何信息
```

#### 📝 一句话总结
公开论文和项目页中，MIST 指 **Molecular Insight SMILES Transformers**，Tokenizer 名称是 **Smirk**；它用 Smirk 把 SMILES 中的核素、电子、手性和几何相关标记编码为 token，再以 RoBERTa PreLayerNorm 编码器做 masked language modeling 预训练。最大 MIST-1.8B 在约 20 亿分子、116B token 上训练，用分子序列基础模型支撑 400 多个分子/混合物性质预测和化学空间探索任务。

#### 🎯 核心要点
- **来源限制说明**：任务给出的 `paper_url` 是 2026 AIIR Symposium 活动页；可追溯的主要技术来源是 arXiv:2510.18900、scifm 项目页、ALCF/Hugging Face 模型页，以及 Smirk tokenizer 论文 arXiv:2409.15370
- **MIST 不是 tokenizer 本身**：公开论文将 MIST 展开为 Molecular Insight SMILES Transformers；捕获核、电子和几何信息的 tokenizer 是 Smirk
- **编码器式分子基础模型**：生产模型采用 HuggingFace `RoBERTa-PreLayerNorm` encoder-only Transformer、绝对位置编码和 MLM 目标
- **模型规模**：MIST-28M 为 8 层、512 hidden、8 heads；MIST-1.8B 为 28 层、2304 hidden、18 heads、最大序列长 2048
- **预训练数据**：主要来自 Enamine REALSpace 的 SMILES；MIST-28M 约 246M 分子/12B tokens，MIST-1.8B 约 2B 分子/116B tokens
- **Smirk 表示能力**：相较普通字符/BPE tokenizer，Smirk 显式覆盖同位素、电荷、手性、非四面体立体化学、环与键等 SMILES 语义片段
- **下游任务**：单分子性质用 pooled encoder embedding + 两层 MLP；混合物性质使用 permutation-invariant 或物理启发 task network
- **缩放律贡献**：提出 hyperparameter-penalized Bayesian neural scaling laws，用模型大小 \(N\)、数据量 \(D\) 和超参惩罚项预测 MLM loss

#### 🔬 深入细节
##### 核心架构示意

![MIST 框架图](https://arxiv.org/html/2510.18900v1/x1.png)
*图：MIST 论文的总览图，展示从 Smirk tokenization、MLM 预训练到多类下游化学空间任务的流程。*

![Smirk Tokenizer 示意](https://scifm.ai/assets/img/mist-figures/smirk.svg)
*图：scifm 项目页提供的 Smirk tokenizer 图示。Smirk 是 MIST 使用的分子 tokenization 方案，而不是 MIST 模型本身。*

##### 算法伪代码

```python
# MIST 预训练与微调核心逻辑
def mist_pretrain_step(smiles_batch, mask_ratio=0.15):
    # 1. Smirk tokenizer: 把 SMILES 解析成带化学语义的 token 序列
    token_ids = smirk_tokenize(smiles_batch, max_length=2048)

    # 2. MLM corruption: 随机选择约 15% token 替换为 [MASK]
    masked_ids, labels, mask_positions = random_mask(token_ids, ratio=mask_ratio)

    # 3. RoBERTa-PreLayerNorm encoder
    hidden = roberta_prelayernorm_encoder(masked_ids)

    # 4. 只在被 mask 的位置计算交叉熵
    logits = lm_head(hidden[mask_positions])
    loss = cross_entropy(logits, labels[mask_positions])
    return loss

def mist_finetune_single_molecule(smiles, target):
    token_ids = smirk_tokenize(smiles)
    hidden = pretrained_mist_encoder(token_ids)
    mol_embedding = hidden[first_token_index]  # 论文采用首 token hidden state pooling
    pred = two_layer_mlp(mol_embedding)
    return task_loss(pred, target)

def mist_finetune_binary_mixture(smiles_1, smiles_2, x_1, x_2, target_property):
    e1 = pooled_mist_embedding(smiles_1)
    e2 = pooled_mist_embedding(smiles_2)
    # permutation-invariant task network: 交换组分顺序不改变混合物性质
    linear_part = x_1 * property_head(e1) + x_2 * property_head(e2)
    excess_part = x_1 * x_2 * excess_head(abs(e1 - e2), e1 + e2, x_1, x_2)
    pred = linear_part + excess_part
    return mse(pred, target_property)
```

##### 来源与命名澄清

任务元信息把 `full_name` 写为“分子交互结构Tokenizer (MIST)”。但可访问论文 `Foundation Models for Discovery and Exploration in Chemical Space` 明确把 MIST 定义为 **Molecular Insight SMILES Transformers**，并把 tokenizer 称为 **Smirk**。因此这篇解读按公开论文的方法写 MIST，同时保留任务 YAML 元信息原文。

Smirk 的关键价值在于减少“SMILES 是文本但又不是普通自然语言”的错配。普通字符 tokenizer 会把同位素、手性、电荷、环闭合等化学语义拆散；通用 BPE 又可能学到频繁但化学意义不稳定的片段。Smirk 则面向 SMILES 语法设计 token，使模型能更直接看到核素、电子状态和立体化学相关符号。

##### 预训练目标：Masked Language Modeling

MIST 采用 encoder-only Transformer，训练方式与 RoBERTa/BERT 类似。给定 token 序列 \(X=(x_1,\ldots,x_T)\)，随机选择约 15% 的位置集合 \(\mathcal{M}\)，把输入替换为 `[MASK]` 或扰动 token，模型根据上下文预测原 token：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}\log p_{\theta}(x_i \mid X_{\setminus \mathcal{M}})
$$

这种目标不会直接输出 3D 坐标，也不显式求力；它学习的是可迁移的分子序列表示。下游性质预测时，通常取首 token 的 final hidden state 作为分子 embedding：

$$
\mathbf{e}_{\text{mol}}=\mathbf{h}^{(L)}_{\text{first}}
$$

再接任务网络：

$$
\hat{y}=g_{\phi}(\mathbf{e}_{\text{mol}})
$$

其中 \(g_{\phi}\) 可以是两层 MLP，也可以是为混合物或电解液任务设计的物理启发网络。

##### 模型与训练规模

论文列出的两个主模型如下：

| 模型 | 参数量 | 层数 | hidden | heads | 最大长度 | 训练分子 | 总 token |
|---|---:|---:|---:|---:|---:|---:|---:|
| MIST-28M | 28M | 8 | 512 | 8 | 2048 | 246M | 12B |
| MIST-1.8B | 1.8B | 28 | 2304 | 18 | 2048 | 2B | 116B |

MIST-1.8B 使用 500,000 training steps、有效 batch size 4096、FusedLAMB 优化器，并用线性 warmup + cosine decay。这里的规模重点不是“比 3D GNN 更懂几何”，而是把大规模可合成分子库的 SMILES 表示压缩成一个可迁移 encoder。

> ⚠️ 注意：MIST 论文也指出 SMILES 本身是有损的结构表示。Smirk 可以编码很多 SMILES 内显式存在的核、电子和立体信息，但不能凭空恢复输入里没有的真实 3D 构象分布。

##### 缩放律：为什么能训练到 1.8B？

论文的一项方法贡献是 hyperparameter-penalized Bayesian neural scaling laws。标准 Chinchilla/Hoffmann 式缩放律将交叉熵损失写成模型非嵌入参数量 \(N\) 和数据量 \(D\) 的函数：

$$
L(N,D)=\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}+E
$$

MIST 进一步把学习率、FFN 宽度比例、模型形状等超参 \(\lambda_i\) 的偏离影响建模为乘性惩罚：

$$
\hat{L}(N,D,\lambda)
=
\left(\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}+E\right)
\times \prod_i \exp(P_i(\lambda_i))
$$

这样做的工程意义是：不必在每个模型规模上做完整网格搜索，而是用较少训练实验拟合后验分布，再选择更接近 compute-optimal frontier 的大模型配置。论文报告 MIST 的数据/模型平衡指数 \(\alpha/\beta\) 大于 1，暗示继续扩展时数据多样性和质量会比单纯堆参数更快成为瓶颈。

##### 下游机制：从单分子到混合物

单分子任务中，MIST encoder 输出 \(\mathbf{e}_{\text{mol}}\)，接两层 MLP 做分类或回归即可。论文覆盖了 MoleculeNet、量子化学、药物相似规则、同位素半衰期、气味感知等多类任务。

混合物任务不能简单拼接，因为组分顺序不应改变性质。一个典型物理启发形式是把混合物性质分解为线性混合项和 excess 项：

$$
P_{\text{mix}} = P_L + P_E,\qquad
P_L=x_1P_1+x_2P_2
$$

其中 \(P_E\) 由对称网络根据两种组分 embedding 和摩尔分数预测，常用 \(x_1x_2\) 这类因子保证纯组分边界 \(x_1=0\) 或 \(x_2=0\) 时 excess 项为 0。这个设计让 MIST 不只是单分子性质预测器，也能作为配方/电解液搜索中的组分表示模型。

##### 与 Uni-Mol 的关系和区别

YAML 中把 MIST 的 parent 标为 Uni-Mol，但两者技术路线并不相同。Uni-Mol 是直接输入 3D 坐标和距离矩阵的 SE(3)-invariant Transformer，适合构象、对接和 3D 几何任务；MIST 是 SMILES encoder，靠 Smirk tokenizer 尽量保留 SMILES 中的结构语义，优势在于可以用数十亿级文本化分子库预训练。

因此，MIST 更像“化学语言模型 + 化学语义 tokenizer + 下游任务网络”的组合；它的几何能力主要来自 SMILES 中显式编码的手性/构型符号、训练数据统计和下游监督，而不是像 SchNet/GemNet/Uni-Mol 那样直接对原子坐标做几何消息传递。

#### 🧪 练习题
```yaml
question: "根据公开论文，MIST 与 Smirk 的关系是什么？"
options:
  - "MIST 是 tokenizer，Smirk 是下游性质预测头"
  - "MIST 是 encoder-only 分子基础模型家族，Smirk 是其使用的 SMILES tokenization 方案"
  - "MIST 是 3D 坐标去噪模型，Smirk 是力场优化器"
  - "MIST 和 Smirk 都只用于蛋白质序列建模"
answer: 1
explain: "公开来源中 MIST 指 Molecular Insight SMILES Transformers；Smirk 是面向 SMILES 化学语义设计的 tokenizer，用于 MIST 的 MLM 预训练输入。"
```

### MatterSim-MT

```yaml
id: mattersim_mt
num: 8
name: MatterSim-MT
full_name: 多任务材料模拟基础模型 (MatterSim-MT)
year: '2026.05'
org: 微软亚洲研究院
parent: unimol
paper_url: https://www.microsoft.com/en-us/research/publication/mattersim-mt-a-multi-task-foundation-model-for-in-silico-materials-characterization/
project_url: ''
category: representation
motivation: 3500万DFT数据预训练，支持极端温压环境模拟
```

#### 📝 一句话总结
MatterSim-MT 提出一个面向材料结构、动力学、热力学和多物性表征的多任务基础模型，通过 3500 万级第一性原理标注结构预训练和 GeoMFormer 双流 Transformer 架构，解决传统机器学习势只能建模势能面、难以模拟电荷、介电和极化等现象的问题。

#### 🎯 核心要点
- **大规模第一性原理材料数据**：覆盖 89 种元素，训练结构超过 3500 万个，包含最高 5000 K、最高 1000 GPa 的非平衡构型
- **主动学习材料探索器**：用 ground-state explorer 与 off-equilibrium explorer 选择高信息量结构，减少高成本 DFT 标注浪费
- **GeoMFormer 双流架构**：同时维护 invariant 标量特征和 equivariant 向量特征，通过自注意力与跨流注意力交换几何信息
- **材料图建模**：在周期性边界条件下构造 cutoff 邻接图，显式输入原子种类、坐标、相对位移、晶格和温压状态变量
- **多任务预测头**：联合预测能量、力、应力、磁矩、Bader 电荷、Born 有效电荷和介电矩阵
- **物理先验约束**：标量性质保持平移/旋转不变，力等向量性质保持 SE(3) 等变，并通过能量梯度保证力的保守性
- **多尺度模型扩展**：论文报告 1M、10M、220M、1.3B 参数版本，验证误差随数据和模型规模继续下降
- **超越势能面模拟**：支持 LO-TO 声子劈裂、BaTiO3 铁电滞回、Li-rich 正极脱锂氧化还原等仅靠能量/力无法描述的过程

#### 🔬 深入细节
![MatterSim-MT 总体框架](https://arxiv.org/html/2605.07927v1/x1.png)
*图：MatterSim-MT 的数据探索、双流 Transformer 表征和多任务性质预测框架。*

![MatterSim-MT 多任务能力](https://arxiv.org/html/2605.07927v1/x3.png)
*图：多任务输出使模型能够模拟 LO-TO 声子劈裂、铁电极化滞回和电池材料氧电荷演化。*

##### 算法伪代码

```python
# MatterSim-MT 训练流程伪代码
def mattersim_mt_step(structure, dft_labels):
    # 1. 周期性材料图
    graph = build_periodic_graph(
        atomic_numbers=structure.Z,
        positions=structure.R,
        lattice=structure.L,
        state=[structure.temperature, structure.pressure],
        cutoff=r_c,
    )

    # 2. 嵌入：标量 invariant stream + 向量 equivariant stream
    x = atom_embedding(graph.Z) + centrality_embedding(graph.edges)
    e = equivariant_embedding(graph.relative_vectors)

    # 3. GeoMFormer Transformer blocks
    for block in geomformer_blocks:
        x = block.inv_self_attention(x, graph.edges)
        e = block.equ_self_attention(e, graph.relative_vectors)
        x = block.inv_cross_attention(query=x, key_value=e)
        e = block.equ_cross_attention(query=e, key_value=x)
        x, e = block.gated_ffn(x, e)

    # 4. 多任务头
    E = energy_head(mean_pool(x))
    F = -gradient(E, structure.R)
    stress = -cell_gradient(E, structure.L)
    bader = atom_scalar_head(x, task="bader_charge")
    magnetic = atom_scalar_head(x, task="magnetic_moment")
    born = tensor_head(x, e, task="born_effective_charge")
    dielectric = tensor_head(x, e, task="dielectric_matrix")

    # 5. 加权多任务 MAE
    loss = mae(E, dft_labels.energy_per_atom)
    loss += w_f * mae(F, dft_labels.forces)
    loss += w_s * mae(stress, dft_labels.stress)
    loss += w_bader * mae(bader, dft_labels.bader_charge)
    loss += w_mag * mae(magnetic, dft_labels.magnetic_moment)
    loss += w_born * mae(born, dft_labels.born_effective_charge)
    loss += w_eps * mae(dielectric, dft_labels.dielectric_matrix)
    return loss
```

##### 动机与背景

通用机器学习势能模型通常只学习势能面：输入原子结构，输出能量、力和应力。这对结构弛豫、分子动力学和相稳定性已经很有用，但许多材料表征问题并不只由势能面决定。例如极性晶体的 LO-TO 声子劈裂需要 Born 有效电荷和介电张量，铁电开关需要原子位移和宏观极化之间的耦合，电池正极中的阴离子氧化还原需要电荷和磁性演化。MatterSim-MT 的核心问题就是：能否用一个统一原子表征同时覆盖势能面和这些额外物性。

论文将输入结构表示为周期性材料图：

$$
\mathcal{G} = (\boldsymbol{Z}, \boldsymbol{V}, \boldsymbol{R}, [\boldsymbol{L}, \boldsymbol{S}])
$$

其中 \(\boldsymbol{Z}\) 是原子种类和原子特征，\(\boldsymbol{R}\) 是三维坐标，\(\boldsymbol{V}\) 是原子对相对位移，\(\boldsymbol{L}\) 是晶格矩阵，\(\boldsymbol{S}\) 可包含温度、压力等全局状态变量。边由 cutoff 半径内的原子对构成，并通过周期性镜像原子处理晶体边界条件。

##### GeoMFormer 双流机制

MatterSim-MT 采用受 GeoMFormer 启发的双流 Transformer。第一条流学习 invariant 标量特征 \(x_i\)，用于能量、电荷、磁矩等不随整体旋转而变化的性质；第二条流学习 equivariant 向量特征 \(e_i\)，用于保留方向信息，使模型能处理力、张量和几何响应。

嵌入阶段包含三类信息：

- 原子嵌入：由原子序数 \(Z_i\) 初始化
- 空间关系嵌入：用邻居数量、距离和 cutoff 权重编码局部环境
- 等变特征嵌入：由相对方向 \(\boldsymbol{r}_{ij}/\|\boldsymbol{r}_{ij}\|\) 初始化

在每个 Transformer block 内，模型执行 invariant self-attention、equivariant self-attention、invariant cross-attention 和 equivariant cross-attention。直观上，self-attention 在同一特征类型内聚合邻域信息，cross-attention 则让标量化学环境和向量几何方向互相校正。

> 💡 关键：普通 Transformer 的 token 位置是序列位置；MatterSim-MT 的 token 是周期晶体中的原子，因此注意力必须同时尊重 cutoff 邻接、周期镜像、旋转等变和能量守恒。

##### 任务头与损失函数

最终 Transformer block 输出每个原子的 \(x_i^N\) 和 \(e_i^N\)。对于能量、Bader 电荷和磁矩，模型用标量头预测：

$$
p_i = W_2 \sigma(W_1 f_{LN}(x_i^{N+1}))
$$

其中 \(f_{LN}\) 是 layer normalization，\(\sigma\) 是 GELU。能量任务对原子级输出做 pooling；Bader 电荷和磁矩保留为原子级预测。Born 有效电荷和介电矩阵是张量性质，论文采用类似 ETGNN 的张量头，将标量和等变特征组合成满足物理对称性的输出。

训练损失是多任务加权 MAE：

$$
L = l(e, e_{\mathrm{DFT}}) + \omega_f l(\boldsymbol{f}, \boldsymbol{f}_{\mathrm{DFT}})
  + \omega_\sigma l(\boldsymbol{\sigma}, \boldsymbol{\sigma}_{\mathrm{DFT}})
  + \sum_{i=1}^{4}\omega_{t_i}l(\boldsymbol{p}_{t_i}, \boldsymbol{p}_{t_i,\mathrm{DFT}})
$$

其中 \(e\) 是每原子能量，\(\boldsymbol{f}\) 是原子力，\(\boldsymbol{\sigma}\) 是应力张量，四个辅助任务 \(t_i\) 分别对应磁矩、Bader 电荷、Born 有效电荷和介电矩阵。

能量和力之间的关系通过梯度保持：

$$
\boldsymbol{F}_i = -\frac{\partial E}{\partial \boldsymbol{r}_i}
$$

这比直接用独立头预测力更符合保守力场要求，也让分子动力学模拟中的能量一致性更好。

##### 主动学习与数据覆盖

MatterSim-MT 的数据不是简单收集平衡晶体结构，而是由材料探索器主动扩展。ground-state explorer 关注近稳态结构，off-equilibrium explorer 通过 NPT 分子动力学采样高温高压构型。补充材料说明 off-equilibrium 采样覆盖 300、1000、2000、5000 K 和 0、200、500、800、1000 GPa 等设置，最终得到比 MPF2021、MPtrj、Alexandria、OMat24 更宽的构型分布。

辅助性质数据规模远小于能量/力/应力主数据：Bader 电荷约 17.2 万结构，Born 有效电荷和介电矩阵约 3051 个结构，磁矩约 28.4 万结构。多任务训练的价值在于让这些稀疏高成本标签共享 3500 万结构预训练出的统一原子表征。

##### 与传统方法的区别

| 维度 | 传统 DFT | 通用 ML 势 | MatterSim-MT |
|---|---|---|---|
| 主要输出 | 能量、力、应力和多种电子性质 | 多数只输出能量、力、应力 | 同时输出势能面和多种物性 |
| 成本 | 高 | 低 | 低 |
| 泛化范围 | 由计算设置决定 | 常受数据温压范围限制 | 覆盖 89 元素、高温高压与非平衡构型 |
| 极化/介电模拟 | 可做但昂贵 | 通常不支持 | 通过 BEC 和介电矩阵支持 |
| 新体系适配 | 重新计算成本高 | 需补充训练 | 可用不确定性主动学习和微调 |

MatterSim-MT 的关键贡献不是单纯提高力场精度，而是把材料模拟从“只预测势能面”扩展到“统一预测多种第一性原理物性”。这使模型可以直接服务于声子、相图、铁电、电池等需要多物理量耦合的真实材料工作流。

#### 🧪 练习题
```yaml
question: "MatterSim-MT 相比只预测能量/力/应力的通用机器学习势，最关键的扩展是什么？"
options:
  - "把所有材料结构都转换成 SMILES 序列"
  - "联合预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵等额外物性"
  - "只在零温零压的平衡结构上训练"
  - "用规则模板枚举所有可能晶体结构"
answer: 1
explain: "这些额外物性让模型能够模拟 LO-TO 声子劈裂、铁电滞回和电荷转移等仅靠势能面无法描述的现象。"
```

### ChemMLLM

```yaml
id: chemmlm
num: 9
name: ChemMLLM
full_name: 化学多模态大语言模型 (ChemMLLM)
year: '2026.01'
org: 上海人工智能实验室
parent: grover
paper_url: https://arxiv.org/abs/2412.04112
project_url: ''
category: representation
motivation: 统一处理文本、SMILES和分子图像的多模态架构
```

#### 📝 一句话总结
ChemMLLM 提出“图像 tokenizer - LLM - 图像 de-tokenizer”的化学多模态生成框架，将文本、SMILES 和二维分子图像统一为离散 token 序列，解决既有化学 LLM 多数只能理解图像、不能直接生成分子图像的问题。

#### 🎯 核心要点
- **来源限制说明**：输入 YAML 中的 `paper_url` 指向 arXiv:2412.04112，但该编号实际为光子神经网络论文；本文基于可访问的 ChemMLLM arXiv:2505.16326、GitHub 和 Cell Reports Physical Science 2026 版本信息整理
- **统一三模态表示**：文本、SMILES 和分子图像都被转换为 token 序列，送入同一个自回归 LLM
- **Mol-VQGAN 图像 tokenizer**：针对稀疏、线条化的二维分子结构图微调 VQGAN，避免自然图像 VQGAN 重构原子和键时失真
- **图像生成闭环**：模型不仅能 image-to-text / image-to-SMILES，还能 text-to-image、property-to-image 和 image-to-image 分子优化
- **五类多模态任务**：img2caption、img2property、img2smiles、property2img、img2img，覆盖理解、识别、设计和优化
- **两阶段训练**：先训练 Mol-VQGAN，再冻结 Mol-VQGAN 并用 Lumina-mGPT/Chameleon 风格框架对 LLM 做监督微调
- **化学有效性评估**：使用 BLEU、ROUGE、METEOR、MSE、MAE、Pearson、Tanimoto、valid rate、Increased LogP、diversity 等指标
- **实证优势**：在图像到 SMILES、图像性质预测、多目标图像生成和分子图像优化等任务上超过通用 MLLM 与化学专用 LLM 基线

#### 🔬 深入细节
![ChemMLLM 总体架构](https://arxiv.org/html/2505.16326v2/x2.png)
*图：ChemMLLM 的 Mol-VQGAN 图像 tokenizer/de-tokenizer、SMILES/text tokenizer、自回归训练与推理流程。*

##### 算法伪代码

```python
# ChemMLLM 两阶段训练与推理伪代码
def train_mol_vqgan(molecule_images):
    E, G, codebook, D = init_from_chameleon_vqgan()
    for x in molecule_images:
        z_cont = E(x)
        z_q = nearest_codebook_vector(z_cont, codebook)
        x_hat = G(z_q)
        loss = vqvae_loss(x, x_hat, z_cont, z_q)
        loss += lambda_1 * perceptual_loss(x, x_hat)
        loss += lambda_2 * gan_loss(D, x, x_hat)
        update(E, G, codebook, D, loss)
    return E, G, codebook

def train_chemmllm(samples, mol_vqgan, text_tokenizer, llm):
    freeze(mol_vqgan)
    for sample in samples:
        image_tokens = mol_vqgan.encode(sample.image) if sample.has_image else []
        text_tokens = text_tokenizer.encode(sample.text_or_smiles)
        target_tokens = encode_output(sample.output, mol_vqgan, text_tokenizer)
        sequence = concat(prompt_tokens, image_tokens, text_tokens, target_tokens)
        loss = next_token_cross_entropy(llm, sequence) + z_loss(llm.logits)
        update(llm, loss)

def infer(prompt):
    seq = tokenize_prompt(prompt)
    generated = autoregressive_decode(llm, seq)
    if generated.contains_image_tokens():
        return mol_vqgan.decode(generated.image_tokens)
    return text_tokenizer.decode(generated.text_tokens)
```

##### 动机与背景

化学信息天然是多模态的：论文和实验记录中有自然语言描述，数据库中有 SMILES，化学家日常交流中又大量使用二维分子结构图。此前的化学 LLM 往往只能处理文本或 SMILES；一些化学视觉语言模型可以把分子图像作为输入，但输出仍然主要是文本，缺少直接生成分子图像的能力。

ChemMLLM 的设计目标是将分子图像也变成“语言式 token”。这样，图像理解和图像生成都可以被改写为同一个 next-token prediction 问题，而不需要为每个任务单独构造 CNN、GNN 或扩散模型。

##### Mol-VQGAN：把分子图像离散化

二维分子图像和自然图像差异很大：背景大面积空白，信息主要集中在细线、原子字符、键型和环结构上。自然图像 tokenizer 在这里容易把键线弄断、把原子字符模糊化，导致生成结果化学不可读。ChemMLLM 因此微调了一个面向分子图像的 Mol-VQGAN。

给定图像 \(x \in \mathbb{R}^{H \times W \times 3}\)，编码器得到连续特征：

$$
\hat{z} = E(x), \quad \hat{z} \in \mathbb{R}^{h \times w \times n_z}
$$

然后对每个空间位置做向量量化，选择最近的 codebook 向量：

$$
z_q = \mathbf{q}(\hat{z})
  = \arg\min_{z_k \in Z}\|\hat{z}_{ij} - z_k\|
$$

解码器从离散 latent 重建图像：

$$
\hat{x} = G(z_q) = G(\mathbf{q}(E(x)))
$$

Mol-VQGAN 的训练目标结合了 VQVAE 重构、感知损失和对抗损失：

$$
\min_{E,G,Z}\max_D
\left[
\mathcal{L}_{vqvae}(E,G,Z)
+ \lambda_1 \mathcal{L}_{perceptual}(E,G,Z)
+ \lambda_2 \mathcal{L}_{GAN}(\{E,G,Z\},D)
\right]
$$

其中 \(\mathcal{L}_{vqvae}\) 包含图像重构误差、codebook 误差和 commitment 误差；\(\mathcal{L}_{perceptual}\) 用高层视觉特征约束分子图像清晰度；\(\mathcal{L}_{GAN}\) 通过 patch discriminator 让重构的原子、键和局部结构更像真实分子图。

##### LLM 统一建模文本、SMILES 和图像

SMILES 直接通过文本 tokenizer 映射成 token 序列；分子图像通过 Mol-VQGAN 映射成 image token 序列。ChemMLLM 将两类 token 拼接成统一序列：

$$
s_i \in S = \{S_I, S_T\}
$$

其中 \(S_I\) 是图像 token，\(S_T\) 是文本或 SMILES token。LLM 使用标准自回归 next-token objective：

$$
\mathcal{L}_{LLM}
= -\sum_{i=1}^{L}\log p_\theta(s_i \mid s_1,\ldots,s_{i-1})
+ \lambda\sum_k\left(\log \sum_{j=1}^{V}\exp(z_{k,j})\right)^2
$$

第二项是 z-loss，用于缓解 logits shift，提高大模型微调稳定性。推理时，如果模型输出文本 token，就直接解码为 caption、性质值或 SMILES；如果输出图像 token，就交给 Mol-VQGAN de-tokenizer 还原为二维分子结构图。

> 💡 关键：ChemMLLM 不是给 LLM 外接一个“只读”的视觉编码器，而是让图像输入和图像输出都进入同一个离散 token 空间，从而支持 any-to-any 式化学任务。

##### 五类任务如何统一

| 任务 | 输入 | 输出 | 主要能力 |
|---|---|---|---|
| img2caption | 分子图像 + 指令 | 文本 | 读图并解释结构、来源、功能或用途 |
| img2property | 分子图像 + 指令 | 文本数值 | 从二维结构图估计 MW、LogP、TPSA、Hbd、Hba、Rb、QED |
| img2smiles | 分子图像 + 指令 | SMILES | 分子结构识别与符号化 |
| property2img | 属性约束文本 | 分子图像 | 按多目标性质生成分子结构图 |
| img2img | 原分子图像 + 优化指令 | 新分子图像 | 保持相似性并提升目标性质，如 LogP |

所有任务的本质都是给定前缀 token，预测后续 token。区别只在于 token 的模态和评价指标不同。

##### 与 GROVER 等分子表示模型的区别

GROVER 以分子图为核心，在图 Transformer 上做自监督预训练，目标是提升分子性质预测表示；ChemMLLM 则以 LLM 为核心，把 SMILES、文本和分子图像都变成语言式 token，目标是支持化学问答、识别、设计和图像生成的统一交互。

| 维度 | GROVER | ChemMLLM |
|---|---|---|
| 核心输入 | 分子图 | 文本、SMILES、二维分子图像 |
| 主干 | 图 Transformer | 自回归多模态 LLM |
| 预训练任务 | 节点/边上下文、官能团预测 | 多任务监督微调 + 图像 tokenizer 训练 |
| 输出形式 | 表示向量或性质预测 | 文本、SMILES、分子图像 |
| 关键能力 | 分子表示学习 | 化学多模态理解与生成 |

ChemMLLM 的风险也来自这个设计：二维分子图像的生成质量并不等价于化学有效性，仍需要 RDKit 解析、Tanimoto 相似度、valid rate 和性质计算来过滤。换言之，Mol-VQGAN 解决的是“能否画清楚”，LLM 还必须学习“画出的结构是否有效且满足目标”。

#### 🧪 练习题
```yaml
question: "ChemMLLM 为什么要训练 Mol-VQGAN，而不是直接使用自然图像 VQGAN？"
options:
  - "自然图像 VQGAN 参数太少，不能处理任何图片"
  - "分子图像稀疏且由原子字符和键线组成，普通 VQGAN 容易重构失真"
  - "SMILES 不能被文本 tokenizer 编码"
  - "Mol-VQGAN 用来替代所有语言模型参数"
answer: 1
explain: "分子图像的关键信息是细线、环和原子符号，微小失真会导致化学结构错误，因此需要面向分子图像微调的 tokenizer/de-tokenizer。"
```

### Molecular Transformer

```yaml
id: molecular_transformer
num: 10
name: Molecular Transformer
full_name: 分子Transformer (Molecular Transformer)
year: '2018'
org: IBM Research / ETH Zurich
parent: —
paper_url: https://pubs.acs.org/doi/10.1021/acscentsci.9b00576
project_url: ''
category: reaction
motivation: 将反应预测类比为机器翻译，Top-1准确率超90%
```

#### 📝 一句话总结
Molecular Transformer 将正向化学反应预测建模为 SMILES 到 SMILES 的机器翻译任务，用多头注意力 encoder-decoder 取代模板规则和 RNN，在 USPTO_MIT 等基准上达到超过 90% 的 Top-1 准确率，并用生成 token 概率给出可校准的不确定性分数。

#### 🎯 核心要点
- **模板无关反应预测**：不依赖手工反应模板、反应中心标注或原子映射，直接从反应 SMILES 学习输入到产物的映射
- **机器翻译视角**：将反应物/试剂 SMILES 视作源语言，将产物 SMILES 视作目标语言
- **Transformer encoder-decoder**：使用多头 scaled-dot attention 捕获 SMILES 序列中远距离 token 的依赖关系
- **支持混合输入**：不仅能处理反应物与试剂分离的输入，也能处理不区分 reactant/reagent 的 mixed 输入
- **SMILES 数据增强**：用随机等价 SMILES 扩充训练集，降低模型对单一规范化字符串顺序的过拟合
- **beam search 解码**：使用 beam size 5 输出 Top-k 产物候选，Top-2 准确率显著高于 Top-1
- **不确定性估计**：用预测产物 token 概率的乘积作为 confidence，用于区分正确和错误预测，ROC-AUC 约 0.89
- **强基准表现**：单模型在 USPTO_MIT separated 设置达到 90.4% Top-1、93.7% Top-2；mixed 设置仍达到 88.6% Top-1

#### 🔬 深入细节
![Molecular Transformer 性能图](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7081/6764164/679744a6414d/oc9b00576_0001.jpg)
*图：Molecular Transformer 在常见和稀有反应模板桶中均超过先前图模型。来源为 PMC 开放全文 Figure 1。*

![Molecular Transformer 不确定性 ROC](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7081/6764164/fe4b019e71bc/oc9b00576_0007.jpg)
*图：基于预测 token 概率的不确定性分数，用于区分正确和错误反应预测。来源为 PMC 开放全文 Figure 7。*

##### 算法伪代码

```python
# Molecular Transformer 训练与预测伪代码
def smiles_tokenize(smi):
    pattern = r"(\[[^\]]+]|Br?|Cl?|N|O|S|P|F|I|b|c|n|o|s|p|\(|\)|\.|=|#|-|\+|\\\\|\/|:|~|@|\?|>|\*|\$|\%[0-9]{2}|[0-9])"
    return regex_find_all(pattern, smi)

def train_step(reaction):
    src = smiles_tokenize(canonicalize(reaction.reactants_and_reagents))
    tgt = smiles_tokenize(canonicalize(reaction.products))

    # 可选：随机等价 SMILES 做数据增强
    if use_augmentation:
        src = smiles_tokenize(random_equivalent_smiles(src))

    memory = transformer_encoder(src)
    logits = transformer_decoder(tgt[:-1], memory)
    loss = cross_entropy(logits, tgt[1:])
    update(loss)

def predict(reaction):
    src = smiles_tokenize(canonicalize(reaction.reactants_and_reagents))
    memory = transformer_encoder(src)
    beams = beam_search_decode(transformer_decoder, memory, beam_size=5)

    candidates = []
    for seq in beams:
        product = detokenize(seq.tokens)
        confidence = product_of_token_probabilities(seq)
        candidates.append((product, confidence))
    return rank_by_confidence(candidates)
```

##### 动机与背景

传统反应预测方法通常依赖反应模板：先识别反应中心，再套用人工或数据挖掘得到的变换规则。这类方法的弱点是模板覆盖有限，稀有反应表现差，并且对原子映射和 reactant/reagent 分离等预处理非常敏感。早期 seq2seq RNN 方法证明了 SMILES 翻译可行，但 RNN 对序列距离有强归纳偏置，容易把 SMILES 中相邻 token 误认为化学上更相关。

Molecular Transformer 的关键观察是：SMILES 的字符串距离不等于分子中的拓扑距离，也不等于反应中的化学相关性。多头注意力可以让模型在每一步同时关注多个远距离 token，更适合捕获官能团、催化剂、离去基和立体信息之间的长程依赖。

##### Transformer 反应翻译机制

输入序列是反应物和试剂的 token：

$$
X = (x_1, x_2, \ldots, x_m)
$$

输出序列是产物 SMILES token：

$$
Y = (y_1, y_2, \ldots, y_n)
$$

训练目标是最大化条件似然：

$$
\log p_\theta(Y \mid X)
= \sum_{t=1}^{n}\log p_\theta(y_t \mid y_{<t}, X)
$$

实现上使用标准 Transformer encoder-decoder。encoder 对输入 SMILES token 做双向编码；decoder 是自回归的，先通过 masked self-attention 只看已生成产物 token，再通过 cross-attention 读取 encoder 输出。

单个 scaled-dot attention 头的计算为：

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

多头注意力把多个 attention head 并行计算后拼接：

$$
\mathrm{MultiHead}(Q,K,V)=\mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

论文使用比原始 Transformer 小的配置：4 层、隐藏维度 256、8 个 attention heads，总参数约 12M；训练使用 Adam、Noam 风格学习率 schedule、8000 warmup steps、约 4096 token batch，并基于 OpenNMT-py 实现。

##### SMILES 预处理与数据增强

模型使用正则表达式对 SMILES 切分，确保 `Cl`、`Br`、括号、环编号、键型、手性符号等化学 token 不被拆坏。论文比较了两种输入设置：

- **separated**：反应物和试剂用 `>` 弱分隔，隐含使用了一些产物相关信息
- **mixed**：不区分反应物和试剂，所有输入分子混在一起，更接近实际使用场景

数据增强通过为同一分子生成随机等价 SMILES 实现。一个分子可以有多个合法 SMILES 写法，随机化后模型不能只记住规范化字符串中的局部模式，而必须学习更稳定的反应语义。

##### 不确定性估计

反应预测在多步合成规划中需要知道“这一步是否可信”。Molecular Transformer 使用生成序列的 token 概率构造 confidence：

$$
\mathrm{conf}(Y \mid X) = \prod_{t=1}^{n} p_\theta(y_t \mid y_{<t}, X)
$$

也可写成平均负对数似然形式，避免长序列概率过小：

$$
\mathrm{NLL}(Y \mid X) = -\frac{1}{n}\sum_{t=1}^{n}\log p_\theta(y_t \mid y_{<t}, X)
$$

confidence 越高，模型越相信该产物。论文发现 label smoothing 会略微影响准确率，但会显著削弱 confidence 对正确/错误预测的区分能力，因此最终将 label smoothing 设为 0。这个不确定性分数在测试中达到约 0.89 ROC-AUC，可用于给反应路线排序或把高风险步骤提前验证。

> 💡 关键：这里的不确定性不是外部校准模型给出的，而是 Transformer 自回归生成过程天然产生的 token 概率。

##### 与模板和 RNN 方法的区别

| 维度 | 模板/图规则方法 | RNN seq2seq | Molecular Transformer |
|---|---|---|---|
| 规则依赖 | 需要模板或反应中心 | 不需要模板 | 不需要模板 |
| 长程依赖 | 依赖特征工程 | 受递归顺序偏置影响 | 多头注意力直接建模远距离 token |
| reactant/reagent | 常需显式区分 | 通常依赖预处理 | separated 和 mixed 都可用 |
| 立体信息 | 受模板覆盖限制 | 能处理但较弱 | 支持 USPTO_STEREO 设置 |
| 置信度 | 通常需额外模型 | 有概率但校准较弱 | 用 token 概率得到可用 uncertainty score |

在稀有模板桶中，Molecular Transformer 相比先前图模型的优势更明显，这说明模型不是单纯记忆常见模板，而是在更大程度上迁移了常见反应中学到的化学模式。它仍然受训练数据分布限制，例如错误标注、缺失试剂、稀少立体选择性样本都会降低预测质量，但它把正向反应预测从模板工程推进到端到端神经翻译范式。

#### 🧪 练习题
```yaml
question: "Molecular Transformer 用什么方式估计单步反应预测的不确定性？"
options:
  - "统计训练集中相同模板出现次数"
  - "计算生成产物序列中各 token 概率的乘积或平均负对数似然"
  - "用 DFT 重新计算所有候选产物能量"
  - "让人工专家给每个预测打分"
answer: 1
explain: "Transformer 解码每个产物 token 时都会给出条件概率，整条序列的概率可作为 confidence，用于区分更可信和更不可信的预测。"
```

### FlowER

```yaml
id: flower
num: 11
name: FlowER
full_name: 电子再分配流匹配模型 (FlowER)
year: '2025.09'
org: MIT
parent: molecular_transformer
paper_url: https://news.mit.edu/2025/system-developed-mit-realistic-predictions-chemical-reactions-0903
project_url: ''
category: reaction
motivation: 引入质量守恒和电子守恒约束，防止化学幻觉
```

#### 📝 一句话总结
FlowER 将反应预测从“生成产物字符串”改写为“在固定原子集合上生成电子再分配轨迹”，用 Bond-Electron 矩阵和条件流匹配同时约束质量守恒与电子守恒。它解决了 Molecular Transformer、Graph2SMILES 等序列模型容易凭空增删原子或电子的化学幻觉问题，并能递归生成可解释的机理步骤。

#### 🎯 核心要点
- 反应状态用 Ugi Bond-Electron (BE) 矩阵表示：原子身份固定，矩阵条目记录孤对电子与成键电子，因此生成过程中不会改变原子集合
- 生成目标不是直接输出 SMILES，而是预测 \(\Delta B = B_{\text{product}} - B_{\text{reactant}}\) 的电子流速度场
- 条件流匹配把反应建模为 \(t=0\) 反应物电子分布到 \(t=1\) 产物电子分布的连续传输路径
- 主干为图 Transformer：输入 BE 矩阵、原子特征和伪时间 \(t\)，输出孤对电子与成键电子的变化量
- 通过对称、零和噪声与零和输出投影保证电子总数守恒；后处理用 sum-safe rounding 将连续电子数离散化且不改变总电子数
- 递归生成 elementary step，重复采样可得到分支机理、潜在副产物和不同反应条件下的路径
- 训练数据由约 110 万 USPTO-Full 专利反应经 1,220 个专家模板补全机理，形成 252 个反应类别、约 140 万 elementary steps
- 可追溯论文为 arXiv:2502.12979 与 Nature 2025；worker 给出的 MIT 新闻页是二级报道

#### 🔬 深入细节
![FlowER 框架示意图](https://arxiv.org/html/2502.12979v1/x1.png)
*图：FlowER 的核心表示与模型流程。反应被表示为 BE 矩阵上的电子再分配；图 Transformer 在任意伪时间点预测电子流变化，并约束孤对电子与成键电子变化总和为 0。*

##### 算法伪代码

```python
# FlowER: electron redistribution with conditional flow matching
def train_flower(mechanistic_steps):
    for reactant, product, atom_features in mechanistic_steps:
        B0 = bond_electron_matrix(reactant)       # fixed atoms, reactant electrons
        B1 = bond_electron_matrix(product)        # same atoms, product electrons
        eps = symmetric_zero_sum_noise(B0.shape)
        t = uniform(0.0, 1.0)

        x_t = (1 - t) * B0 + t * B1 + sigma(t) * eps
        target_velocity = B1 - B0

        pred_velocity = graph_transformer(x_t, atom_features, t)
        pred_velocity = project_symmetric_zero_sum(pred_velocity)
        loss = mse(pred_velocity, target_velocity)
        update(loss)

def sample_mechanism(reactants, atom_features, max_steps, dt):
    B = bond_electron_matrix(reactants)
    pathway = []
    for _ in range(max_steps):
        x = B + symmetric_zero_sum_noise(B.shape)
        for t in arange(0.0, 1.0, dt):
            v = graph_transformer(x, atom_features, t)
            x = x + dt * project_symmetric_zero_sum(v)

        B_next = sum_safe_round(x)
        pathway.append(B_next)
        if is_stable_product(B_next):
            break
        B = B_next
    return pathway
```

##### 关键公式

设 \(B_0\) 是反应物 BE 矩阵，\(B_1\) 是目标 elementary step 后的 BE 矩阵。FlowER 使用线性条件路径加零和对称噪声构造训练样本：

$$
x_t = (1-t)B_0 + tB_1 + \sigma(t)\epsilon,\quad
\epsilon=\epsilon^\top,\quad \sum_{i \le j}\epsilon_{ij}=0
$$

在该路径下，条件向量场的核心监督信号可写成电子矩阵差：

$$
u_t(x\mid z) \approx B_1 - B_0 = \Delta B
$$

条件流匹配损失为：

$$
\mathcal{L}_{\mathrm{CFM}}(\theta)
= \mathbb{E}_{t,z,x_t}
\left\|v_\theta(t, x_t, A) - u_t(x_t\mid z)\right\|_2^2
$$

其中 \(A\) 是原子特征，\(v_\theta\) 是图 Transformer 预测的电子速度场。守恒约束通过两个位置进入模型：采样噪声满足零和，预测速度也被投影到零和空间：

$$
\sum_{i \le j}\Delta B_{ij}=0
$$

这意味着模型可以移动电子，但不能创建或删除电子；原子身份固定则意味着质量守恒。

##### 方法机制解释

传统反应预测把反应物和试剂编码成 SMILES 序列，然后自回归生成产物序列。这个设计的弱点是“语法正确”并不等于“物理守恒”：模型只要在 token 空间中犯错，就可能漏掉一个氢、凭空多出一个重原子，或者生成无法配平的产物。FlowER 的关键改变是把输出空间换成 BE 矩阵空间，生成动作只是在固定原子集合之间重新分配电子。

BE 矩阵提供了类似箭推机理的可解释中间表示。对角线可理解为原子局部电子状态，非对角线描述原子对之间的成键电子；一次 elementary step 就是矩阵中若干条目的增减。模型输出不再是“产物长什么样”，而是“哪些孤对电子减少、哪些键电子增加或减少”，这与有机化学中的亲核进攻、离去基团离去、质子转移等机理语言直接对应。

流匹配部分负责把离散的电子重排转化为连续生成问题。训练时，模型在任意 \(t\) 时刻看到一个介于反应物和产物之间的带噪 BE 矩阵，学习指向产物 BE 矩阵的速度；推理时，从带噪反应物状态出发，用 Euler 等 ODE 积分器沿着学到的速度场前进。由于重复采样的噪声不同，同一组反应物可以生成不同产物或不同中间路径，适合描述副反应和条件依赖。

与 Molecular Transformer 的主要区别在于约束位置不同：Transformer 序列模型把守恒性留给数据统计规律去“学会”，而 FlowER 把守恒性嵌入表示和生成空间。论文报道 Graph2SMILES 即使在配平的机理数据上训练，仍经常违反重原子、质子或电子守恒；FlowER 则通过 BE 矩阵结构天然满足这些守恒约束，剩下主要学习的是“哪一种电子迁移在化学上合理”。

> 💡 关键：FlowER 的创新不是简单加一个守恒惩罚项，而是把反应预测的坐标系换成守恒坐标系；无效产物不再只是低概率事件，而是在表示层面被排除。

#### 🧪 练习题
```yaml
question: "FlowER 为什么能避免序列反应模型中常见的质量守恒幻觉？"
options:
  - "因为它在 SMILES 生成后用规则删除非法 token"
  - "因为它固定反应原子集合，并只在 BE 矩阵上预测零和电子再分配"
  - "因为它完全不用神经网络，只使用专家反应模板"
  - "因为它只预测单一最终产物，不生成中间体"
answer: 1
explain: "FlowER 的状态空间固定原子身份，生成动作是 BE 矩阵中的电子迁移，并约束电子变化总和为 0，因此模型不能凭空创建或删除原子与电子。"
```

### Reactome

```yaml
id: reactome
num: 12
name: Reactome
full_name: 药用反应数据集与预测模型 (Reactome)
year: '2026.04'
org: 剑桥大学 / Pfizer
parent: molecular_transformer
paper_url: https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/
project_url: ''
category: reaction
motivation: 3.9万药用反应数据集，预测实验室真实反应性
```

#### 📝 一句话总结
Reactome 对应的可追溯论文提出 HiTEA：一个面向高通量实验反应数据的统计机器学习分析框架，用随机森林、Z-score ANOVA-Tukey 和 PCA 从 39,000+ 药物化学 HTE 反应中抽取反应组分、条件与真实实验结果之间的相关性。它更像“实验反应性地图”和可解释分析器，而不是单一端到端产物生成模型。

#### 🎯 核心要点
- 数据来自 Cambridge / Pfizer 公开的 10 年以上历史药物化学 HTE 数据，包含 39,000+ 反应条件、350+ 目标产物、多种反应类别
- HiTEA 的目标是推断 HTE reactome：数据集中隐含的反应变量重要性、最佳/最差试剂类别、数据偏置和未充分探索区域
- 三个正交统计模块：随机森林回答“哪些变量重要”，Z-score ANOVA-Tukey 回答“哪些试剂显著好/坏”，PCA 回答“这些试剂在化学空间中如何分布”
- 支持不完整组合设计，不要求每个底物和每个试剂全因子交叉，适合真实 HTE 数据的稀疏、偏置和类别不均衡特征
- 分析对象包括 Buchwald-Hartwig 偶联、Ullmann 偶联、非均相氢化和均相氢化等药物化学常见反应
- 通过保留 0% 和低产率反应，框架能识别负相关变量和失败条件，这是文献正例数据难以提供的信息
- worker 给出的链接是新闻页；可追溯论文为 Nature Chemistry 2024 的 “Probing the chemical reactome with high-throughput experimentation data”

#### 🔬 深入细节
![Reactome / HiTEA 总览图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41557-023-01393-w/MediaObjects/41557_2023_1393_Fig1_HTML.png)
*图：HiTEA 框架将 HTE 数据与化学文献知识并行分析，比较 HTE reactome 与 literature reactome；右侧展示 39,000+ 反应条件在不同反应类别中的分布。*

##### 算法伪代码

```python
# HiTEA / chemical reactome analysis
def hitea(reaction_table, reagent_descriptors, literature_reactome):
    results = {}
    for reaction_class in split_by_reaction_class(reaction_table):
        subdatasets = make_subreactomes(
            reaction_class,
            min_reactions=80,
            min_reacting_pairs=2,
        )

        for D in subdatasets:
            # 1. Normalize experimental outcome within substrate/target context
            D["z_yield"] = zscore_by_group(
                values=D["yield"],
                group=D["reacting_pair_or_target"],
            )

            # 2. Random forest: variable importance
            X = encode_reactants_reagents_conditions(D)
            y = D["yield_or_z_yield"]
            rf = RandomForestRegressor(oob_score=True).fit(X, y)
            variable_importance = rf.feature_importances_

            # 3. ANOVA + Tukey: statistically best/worst reagents
            significant_variables = anova(D["z_yield"], D["variable"])
            best_worst = {}
            for var in significant_variables:
                pairs = tukey_hsd(D["z_yield"], groups=D[var])
                best_worst[var] = rank_by_mean_zscore(pairs)

            # 4. PCA: locate best/worst reagents in descriptor space
            Z = reagent_descriptors.loc[unique_reagents(D)]
            pc_scores = PCA(n_components=2).fit_transform(standardize(Z))

            results[D.name] = compare_to_literature(
                variable_importance, best_worst, pc_scores, literature_reactome
            )
    return results
```

##### 关键计算

为分离试剂作用与底物本身难易度，HiTEA 先在同一目标产物或反应对内部对产率做 Z-score 标准化：

$$
z_{ij}=\frac{y_{ij}-\mu_j}{\sigma_j}
$$

其中 \(y_{ij}\) 是第 \(j\) 个底物/目标上下文中使用第 \(i\) 个条件得到的产率，\(\mu_j,\sigma_j\) 是该上下文内的均值与标准差。直觉上，\(z_{ij}>0\) 表示这个条件比同底物的平均水平更好，\(z_{ij}<0\) 表示更差。

随机森林变量重要性可写作对树中分裂带来的 impurity decrease 求和：

$$
I_m=\frac{1}{T}\sum_{t=1}^{T}\sum_{n:\,v(n)=m}p(n)\Delta i(n)
$$

其中 \(m\) 是变量，\(v(n)\) 是节点 \(n\) 使用的分裂变量，\(p(n)\) 是到达该节点的样本比例。它适合捕捉非线性和变量交互，不要求产率与描述符之间是线性关系。

ANOVA-Tukey 模块先检验某一变量分组均值是否显著不同：

$$
F=\frac{\mathrm{MS}_{\mathrm{between}}}{\mathrm{MS}_{\mathrm{within}}}
$$

若变量显著，再用 Tukey HSD 对试剂组两两比较：

$$
|\bar z_a-\bar z_b| >
q_{\alpha,k,N-k}\sqrt{\frac{\mathrm{MS}_{\mathrm{within}}}{n}}
$$

PCA 模块将试剂描述符矩阵中心化后分解：

$$
X_c = U\Sigma V^\top,\quad
T_{1:2}=X_cV_{1:2}
$$

二维主成分得分 \(T_{1:2}\) 用来观察最佳/最差试剂是否形成清晰化学簇，从而判断模型结论是否有化学解释。

##### 方法机制解释

这项工作与 Molecular Transformer 一类端到端反应预测的差异很大。后者通常学习 \(p(\text{product}\mid \text{reactants, reagents})\)，强调给定输入后直接生成产物；HiTEA 则从真实实验矩阵中学习“反应类别、底物、试剂、条件和产率之间有哪些稳定统计结构”。因此它的主要产出不是单条预测，而是一个反应类别的 reactome：哪些因素支配结果，哪些条件普遍有效，哪些失败条件揭示了偏置或机制限制。

真实 HTE 数据的难点在于它不是干净的机器学习 benchmark。实验设计常常是 campaign-driven：某些底物、某些配体或某些反应类别被反复探索，另一些区域很稀疏；产率可能来自 UV 吸收比而非分离产率；大量 0% 产率在文献数据库中不常出现，却对理解“不该做什么”非常关键。HiTEA 的设计重点就是让统计分析在这种不完整、偏置但实验真实性很高的数据上仍然可用。

三模块的组合具有互补性。随机森林给出变量重要性，但无法直接告诉研究者某个配体是好还是坏；Z-score ANOVA-Tukey 能给出最佳/最差试剂列表，但不显示这些试剂是否覆盖了足够宽的化学空间；PCA 则把试剂放回描述符空间，帮助判断“好试剂簇”是化学规律，还是数据只采样了很窄的一类试剂。

论文特别强调 HTE reactome 与 literature reactome 的比较。如果二者一致，说明 HTE 数据支持已有机理认知；如果不一致，可能意味着数据存在选择偏置，也可能揭示文献未充分报道的负结果或条件依赖。例如某些子反应中，HiTEA 发现底物身份比配体更重要，这提示现有筛选可能没有覆盖足够多的底物，不能简单把结论推广为通用反应规律。

> ⚠️ 来源限制：worker 元信息中的年份和新闻链接保留不变；实际可追溯论文公开发表于 2024 年 1 月 2 日，论文内容把该系统称为 HiTEA 和 chemical reactome，而非名为 Reactome 的单一神经网络。

#### 🧪 练习题
```yaml
question: "HiTEA 为什么要先对同一底物或目标上下文中的产率做 Z-score 标准化？"
options:
  - "为了把所有产率强制变成 0% 或 100%"
  - "为了削弱底物本身难易度的影响，更公平地比较试剂和条件"
  - "为了让随机森林只能学习线性关系"
  - "为了删除所有失败反应，避免负样本干扰"
answer: 1
explain: "Z-score 在同一反应上下文内比较条件相对表现，能把底物固有难度与试剂/条件效果部分分离；论文还强调保留失败反应对识别负相关变量很重要。"
```

### 3N-MCTS

```yaml
id: 3n_mcts
num: 13
name: 3N-MCTS
full_name: 三网络蒙特卡洛树搜索 (3N-MCTS)
year: '2018'
org: University of Münster
parent: —
paper_url: https://www.nature.com/articles/nature25978
project_url: ''
category: retrosynthesis
motivation: 结合MCTS与三神经网络，解决组合爆炸问题
```

#### 📝 一句话总结
3N-MCTS 将逆合成规划形式化为单智能体树搜索问题，用扩展策略网络、in-scope 过滤网络和 rollout 策略网络共同引导 Monte Carlo Tree Search，在巨大的反应规则空间中快速找到可购买砌块。它把符号反应规则的可执行性与神经网络的模式识别能力结合起来，显著缓解了传统启发式搜索的组合爆炸。

#### 🎯 核心要点
- 逆合成状态 \(s\) 定义为一组待合成分子；动作 \(a\) 是对其中一个分子应用一条逆反应 transformation rule
- 从 Reaxys 的 1,240 万单步反应自动抽取规则：rollout 规则约 17,134 条，expansion 规则约 301,671 条
- 三个神经网络协同：扩展策略网络负责提出 top transformations；in-scope 网络判断候选反应是否化学可行；rollout 策略网络用于模拟到终局
- MCTS 四阶段：selection 选择最紧急节点，expansion 展开候选前体，rollout 模拟是否能到达砌块，update 回传路线价值
- 树策略把累计价值 \(Q\)、访问次数 \(N\) 和扩展策略先验 \(P\) 结合，优先探索高概率且访问不足的路线
- 构建块集合包含商业可得分子和历史常见反应物；状态中所有分子都属于构建块时视为 solved
- 时间切分评估：训练只用 2015 年前反应，测试用 2014 年后首次报道目标，减少信息泄漏
- Nature 论文报告该方法相对传统启发式 BFS 解决更多目标且速度约快 30 倍，化学家盲测中难以区分文献路线和算法路线

#### 🔬 深入细节
![3N-MCTS 搜索与扩展流程](https://ar5iv.labs.arxiv.org/html/1708.04202/assets/x2.png)
*图：3N-MCTS 的四阶段搜索流程和扩展过程。扩展策略网络先给出高概率 transformation，符号规则生成候选前体，再由 in-scope filter 删除不太可能发生的反应。*

##### 算法伪代码

```python
# 3N-MCTS retrosynthesis planning
def plan(target, building_blocks, budget):
    root = State(molecules={target})
    tree = SearchTree(root)

    for _ in range(budget):
        path = []
        s = root

        # 1. Selection: descend by policy-guided UCB
        while tree.is_expanded(s) and not terminal(s, building_blocks):
            a = argmax(
                actions(s),
                key=lambda a: Q[s, a] / max(1, N[s, a])
                              + c * P[s, a] * sqrt(parent_visits(s))
                                / (1 + N[s, a])
            )
            path.append((s, a))
            s = transition(s, a)

        # 2. Expansion: propose top transformations and filter by feasibility
        if not terminal(s, building_blocks):
            candidates = []
            for mol in unsolved_molecules(s, building_blocks):
                top_rules = expansion_policy.top_k(mol, k=50)
                for rule in top_rules:
                    rxn = apply_retro_rule(rule, mol)
                    if in_scope_filter.predict(rxn) > threshold:
                        candidates.append((rule, rxn.precursors))
            tree.add_children(s, candidates)

        # 3. Rollout: simulate with rollout policy until solved or depth limit
        value = rollout_policy_simulation(s, building_blocks, max_depth=25)

        # 4. Update: backpropagate rollout result
        for s_prev, a_prev in path:
            N[s_prev, a_prev] += 1
            Q[s_prev, a_prev] += value

        if tree.has_solved_route():
            return tree.best_solved_route()
    return None
```

##### 关键公式

MCTS 选择阶段使用带策略先验的树策略。每条边 \((s,a)\) 存储动作价值 \(Q(s,a)\)、访问次数 \(N(s,a)\) 和扩展策略网络给出的先验概率 \(P(s,a)\)：

$$
a_t=\underset{a\in\mathcal{A}(s_t)}{\arg\max}
\left(
\frac{Q(s_t,a)}{N(s_t,a)}
+ cP(s_t,a)\frac{\sqrt{N(s_{t-1},a_{t-1})}}{1+N(s_t,a)}
\right)
$$

第一项是 exploitation：已知平均回报高的路线更值得继续；第二项是 exploration：策略网络认为合理但访问次数少的 transformation 会被优先尝试。访问越多，探索奖励越小。

策略网络训练可抽象为对真实 reaction rule 的多分类交叉熵：

$$
\mathcal{L}_{\text{policy}}
=-\sum_{r\in\mathcal{R}} y_r\log p_\theta(r\mid m)
$$

其中 \(m\) 是目标分子指纹，\(r\) 是抽取出的逆反应规则。in-scope filter 是二分类器，用于估计候选反应是否在适用范围内：

$$
\mathcal{L}_{\text{scope}}
= -y\log \hat y -(1-y)\log(1-\hat y)
$$

rollout 得到的成功/失败回报沿路径回传：

$$
N(s,a)\leftarrow N(s,a)+1,\quad
Q(s,a)\leftarrow Q(s,a)+R
$$

其中 \(R\) 可以包含是否到达构建块、路线长度和策略先验置信度等因素。

##### 方法机制解释

逆合成规划天然是树搜索：目标分子位于根节点，每一步把一个分子拆成更简单的前体，直到所有叶子都是可购买或已知可得的构建块。难点是分支因子巨大，论文指出可适用 transformation 的数量可从几十到数万；如果用普通 BFS 或手写启发式函数，搜索会很快被大量化学上不合理的规则淹没。

3N-MCTS 的第一个网络是 expansion policy。它把分子编码为 ECFP 指纹，并预测哪些 transformation rule 最可能用于合成该分子。这样扩展阶段不用枚举 30 万条规则，只保留 top-k 候选，大幅降低分支因子。这个网络学到的是有机化学文献中的“合成直觉”：相似官能团和反应上下文中，哪些断键方式更常见。

第二个网络是 in-scope filter。符号规则只保证子结构匹配，不保证真实反应会发生；同一反应模板可能因为位阻、电子效应或竞争官能团而失效。in-scope filter 对“由规则生成的候选反应”做二分类，过滤掉不太可能在该分子上下文中成立的步骤，相当于给符号规则补上化学适用域判断。

第三个网络是 rollout policy。MCTS 需要估计一个新节点能否在若干步内到达构建块，但完整展开代价太高；rollout policy 用更小、更保守的规则集快速模拟一条路线到终局。rollout 的结果再回传到路径上的 \(Q\) 值，使搜索逐步偏向那些不仅局部合理、而且全局上能完成合成的分支。

与传统启发式 BFS 相比，3N-MCTS 的优势来自“局部先验 + 全局模拟”的结合。只按 policy 贪心选择会错过早期看似不优但后续很短的路线；只做无引导 MCTS 又会浪费大量尝试在不合理反应上。三网络设计分别处理候选生成、化学可行性和终局价值估计，使搜索能在秒级给出完整路线。

> 💡 关键：3N-MCTS 不是让神经网络直接吐出整条路线，而是让神经网络改变树搜索的概率结构；最终路线仍由可执行的符号 transformation 串联而成。

#### 🧪 练习题
```yaml
question: "3N-MCTS 中 in-scope filter 的主要作用是什么？"
options:
  - "把最终路线翻译成自然语言实验步骤"
  - "判断由符号规则生成的候选反应在当前分子上下文中是否可行"
  - "替代 MCTS 的 selection 阶段，直接返回最短路线"
  - "从商业目录中下载新的构建块"
answer: 1
explain: "符号 transformation 只说明子结构可匹配，不能保证反应真实发生；in-scope filter 用二分类方式过滤掉不适用或不合理的候选反应。"
```

### AiZynthFinder

```yaml
id: aizynthfinder
num: 14
name: AiZynthFinder
full_name: AI逆合成规划工具 (AiZynthFinder)
year: '2020'
org: AstraZeneca
parent: 3n_mcts
paper_url: https://jcheminf.biomedcentral.com/articles/10.1186/s13321-020-00472-1
project_url: ''
category: retrosynthesis
motivation: 神经网络引导MCTS，工业级多步合成规划
```

#### 📝 一句话总结
AiZynthFinder 将单步逆合成模板预测网络嵌入 Monte Carlo Tree Search，把目标分子递归拆解到可购买原料集合，解决了多步合成规划中模板组合空间巨大、搜索难以工程复现的问题。

#### 🎯 核心要点
- **MCTS 路线搜索框架**：每个节点表示一组待解释分子，动作是对其中一个未解决分子应用一个逆合成反应模板
- **神经网络 expansion policy**：用训练好的模板分类网络为候选反应模板排序，优先展开概率最高的断键/转化
- **Stock 作为终止条件**：当一个状态中所有前体都能在 stock 中查询到时，该节点被视为 solved
- **UCB 选择机制**：用 \(Q+U\) 在 exploitation 和 exploration 之间折中，避免只贪心选择当前最高概率模板
- **惰性实例化子节点**：扩展阶段先保存 reaction action 和 prior，只有被选中时才真正调用 RDChiral 生成前体，降低无效模板开销
- **可插拔工程结构**：Policy、Stock、Filter policy、Scorer、Search tree 等组件解耦，支持替换数据源、模板库、评分函数和搜索策略
- **开放工具链**：论文发布 Python 包、CLI、Jupyter GUI、USPTO policy 与 ZINC stock 数据，强调可复现和可维护的软件实现

#### 🔬 深入细节
![AiZynthFinder 包结构与搜索类关系](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1186%2Fs13321-020-00472-1/MediaObjects/13321_2020_472_Fig1_HTML.png)
*图：论文 Figure 1 展示 AiZynthFinder 的模块结构，以及 AiZynthFinder、Configuration、Policy、Stock、TreeSearch、Node、State、Reaction 等核心类如何协同完成树搜索。*

##### 算法伪代码

```python
# AiZynthFinder 的 MCTS 主循环伪代码
def aizynthfinder_search(target_smiles, policy, stock, scorer, max_iter, max_depth):
    root = Node(State([TreeMolecule(target_smiles)], stock=stock))

    for _ in range(max_iter):
        # 1. Selection: 从根节点沿 Q+U 最大的子节点向下走
        leaf = root
        while leaf.is_expanded and not leaf.state.is_solved:
            leaf = leaf.promising_child()  # instantiate child if needed
            if leaf is None:
                break
        if leaf is None:
            continue

        # 2. Expansion: policy 对未购买分子提出模板候选
        if leaf.is_expandable:
            actions, priors = policy(leaf.state.expandable_mols)
            leaf.store_uninstantiated_children(actions, priors)

        # 3. Rollout: 持续选择最有希望的 child，直到 solved 或达到深度上限
        rollout_node = leaf
        while not rollout_node.is_terminal():
            child = rollout_node.promising_child()
            if child is None:
                break
            child.expand_with_policy(policy)
            rollout_node = child

        # 4. Backpropagation: 用 route/state scorer 更新路径上每条边的累计价值
        reward = scorer(rollout_node)
        while rollout_node is not root:
            parent = rollout_node.parent
            parent.update_child_stats(rollout_node, reward)
            rollout_node = parent

    return extract_ranked_reaction_trees(root)
```

##### 核心机制：把逆合成写成搜索问题

AiZynthFinder 处理的是多步 retrosynthesis planning，而不是单步 reactant prediction。给定目标分子 \(m_0\)，系统维护一个状态：

$$s = \{m_1, m_2, \ldots, m_n\}$$

其中每个分子要么已经在 stock 中，要么还需要继续拆解。状态是否解决由 stock 查询决定：

$$\text{solved}(s)=\bigwedge_{m_i \in s} \mathbb{1}[m_i \in \text{Stock}]$$

这使得搜索树天然是 AND/OR 风格：一次逆合成动作会把一个目标分子替换为一组前体，路线只有在所有叶子前体都可获得时才算完成。

##### 神经网络 policy 如何引导模板选择

传统模板系统会对大量 reaction templates 做子图匹配，组合空间很快爆炸。AiZynthFinder 使用模板分类网络作为 expansion policy：先把分子编码为特征向量，再输出模板分布：

$$p_\theta(t \mid m)=\text{softmax}(f_\theta(\phi(m)))_t$$

搜索时并不穷举全部模板，而是按 \(p_\theta(t \mid m)\) 排序，只对高 prior 的模板调用 RDChiral 应用模板。一个模板 \(t\) 应用于分子 \(m\) 后得到前体集合：

$$m \xRightarrow{t} \{r_1, r_2, \ldots, r_k\}$$

若模板无法应用、生成原分子、被 filter policy 拒绝，或产生循环回到已拆解过的未购买分子，对应 child 会被赋极低价值，避免反复选择。

##### MCTS 选择公式

AiZynthFinder 的 MCTS 节点为每个 child 保存 value、prior、visitations。公开实现中的默认选择逻辑是选取 \(Q+U\) 最大的 child：

$$Q_i = \frac{W_i}{N_i}$$

$$U_i = C\sqrt{\frac{2\log\left(\sum_j N_j\right)}{N_i}}$$

$$i^\* = \arg\max_i (Q_i + U_i)$$

其中 \(W_i\) 是从后续 rollout 回传的累计 reward，\(N_i\) 是该 child 的访问次数，\(C\) 控制探索强度。若启用 `use_prior`，child 的初始 value 来自 policy prior；这等价于在搜索初期把神经网络对模板的偏好注入树搜索。

> 💡 关键：policy network 决定“哪些模板值得尝试”，MCTS 决定“哪些部分路线值得继续投入搜索预算”。前者减少分支，后者避免单步高概率但多步不可达的局部最优。

##### 搜索流程中的四个阶段

**Selection** 从 root 开始，只要当前节点已扩展且尚未 solved，就调用 `promising_child()` 选择 \(Q+U\) 最大的 child。由于 child 是惰性实例化的，被选中时才真正应用 reaction action 生成新状态。

**Expansion** 对 leaf 中所有未在 stock 的分子调用 expansion policy。返回的 reaction actions 和 priors 被保存在节点上，访问次数初始化为 1，value 初始化为 prior 或默认 prior。

**Rollout** 在 AiZynthFinder 中不是完全随机 rollout，而是继续用相同的 policy/UCB 逻辑沿树向下展开，直到状态 solved、达到最大 transform depth，或节点不再可扩展。

**Backpropagation** 对终止节点计算 reward，并把同一个 reward 沿路径回传给祖先边。reward 可以由配置的 scorer 决定；论文中的 GUI route score 主要反映前体是否 solved 和路线步数，但作者也提醒该 score 更适合辅助搜索，不应直接等同于化学路线质量。

##### 与 Segler 3N-MCTS 的关系和工程差异

AiZynthFinder 继承了神经网络引导 MCTS 的核心思想：用深度网络预测模板 prior，再用树搜索组合多步路线。但 2020 年工具论文强调的是一个可用、可扩展、可复现的软件平台，而不是单一模型指标。与 Segler 等人的 3N-MCTS 方案相比，AiZynthFinder 论文明确说明该版本不使用快速 filter 来删除不可行反应，也不区分 expansion 和 rollout 的不同 policy；这让核心实现更简单，也便于后续扩展。

工程上，`Policy`、`Stock`、`Reaction`、`State` 和 `TreeSearch` 的分离很关键。它允许研究者替换商业/公开模板库，换用 ZINC、Enamine 或规则型 stock，也可以在不改搜索主循环的情况下增加 filter policy、路线 scorer 或新搜索算法。

##### 实验与使用场景

论文用 USPTO policy 和 ZINC stock 对示例药物 Amenamevir 及 100 个 ChEMBL 随机分子做演示。摘要报告该软件通常能在 10 秒内找到一个解，并在 1 分钟内完成一次搜索。和 ASKCOS 的比较不是严格 benchmark，因为两者使用的模板库和 stock 不同；论文更强调 AiZynthFinder 的开放性、速度、测试覆盖、文档和低耦合结构。

##### 可访问来源说明

论文主文和图示来自 Journal of Cheminformatics / Springer Open Access 页面；搜索执行细节还参考了官方文档的 MCTS sequence 页面和 GitHub 源码。由于该论文是软件论文，核心“损失函数”不在论文中展开，本文用其公开 MCTS 实现中的 \(Q+U\) 选择公式和 policy prior 作为关键计算说明。

#### 🧪 练习题
```yaml
question: "AiZynthFinder 中神经网络 policy 与 MCTS 的分工是什么？"
options:
  - "policy 直接输出完整多步路线，MCTS 只负责可视化"
  - "policy 为单步模板提供 prior，MCTS 在多步路线树中用 Q+U 选择要继续展开的节点"
  - "policy 判断 stock 是否可购买，MCTS 训练模板分类器"
  - "policy 只过滤无效反应，MCTS 穷举所有模板"
answer: 1
explain: "policy network 对单步逆合成模板排序，降低分支数；MCTS 用访问统计和 reward 回传在多步搜索树里平衡探索和利用。"
```

### LocalRetro

```yaml
id: localretro
num: 15
name: LocalRetro
full_name: 局部反应中心预测 (LocalRetro)
year: '2021'
org: MIT
parent: 3n_mcts
paper_url: https://pubs.acs.org/doi/10.1021/jacsau.1c00173
project_url: ''
category: retrosynthesis
motivation: 预测局部反应中心简化搜索空间
```

#### 📝 一句话总结
LocalRetro 把单步逆合成拆成“在每个原子/键上预测局部反应模板”的分类问题，并用全局反应性注意力补充远程取代基效应，从而在保留模板可解释性的同时显著缩小搜索空间。

#### 🎯 核心要点
- **局部反应模板 (local reaction template)**：只描述反应中心附近的 atom edit、bond edit 或二者同时发生的局部变化，而不是把整条反应编码成全局模板
- **原子/键双分类器**：分别预测每个原子可应用的 atom template 和每条键可应用的 bond template
- **MPNN 局部环境编码**：先用 message passing 编码邻域化学环境，再把两端原子表示拼接成键表示
- **GRA 全局反应性注意力**：用 multi-head self-attention 让每个原子/键感知分子内所有其他原子/键，建模非局部电子效应和位点竞争
- **模板应用即生成 reactants**：预测中心和模板后，用 RDKit/RDChiral 风格的模板应用得到前体，按预测分数排序
- **数据规模验证**：论文在 USPTO-50K 和 USPTO-MIT 上评估，报告 USPTO-50K top-1 exact match 53.4%、top-5 round-trip 99.2%
- **来源校正**：任务给出的 DOI `10.1021/jacsau.1c00173` 与 LocalRetro 论文不一致；可访问论文和官方仓库对应 `10.1021/jacsau.1c00246`

#### 🔬 深入细节
![LocalRetro 模型架构](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/7c32/8549044/7ce463dc4376/au1c00246_0002.jpg)
*图：LocalRetro 论文 Figure 2。模型先初始化分子图、原子特征和键特征，再经过 MPNN、bond feature encoding、GRA，最后分别对原子模板和键模板打分。*

##### 算法伪代码

```python
# LocalRetro 训练与推理伪代码
def train_localretro(reactions):
    atom_templates, bond_templates = extract_local_templates(reactions)

    for product, true_center, true_template in reactions:
        G = molecular_graph(product)
        v, e = initialize_atom_bond_features(G)

        # 1. 局部环境编码
        v_prime = mpnn_atom_update(G, v, e)
        e_prime = bond_encoder(v_prime, G.edges)

        # 2. 全局反应性注意力
        x_atom = gra_update_atoms(v_prime, e_prime)
        x_bond = gra_update_bonds(v_prime, e_prime)

        # 3. 原子/键模板分类
        atom_logits = atom_template_classifier(x_atom)
        bond_logits = bond_template_classifier(x_bond)

        loss = cross_entropy(atom_logits, true_atom_template_labels)
        loss += cross_entropy(bond_logits, true_bond_template_labels)
        optimizer.step(loss)


def predict_localretro(product, reaction_class=None, top_k=50):
    G = molecular_graph(product)
    x_atom, x_bond = encode_with_mpnn_and_gra(G)
    candidates = []

    for atom in G.atoms:
        for template, score in top_templates(atom_classifier(x_atom[atom])):
            if allowed(template, reaction_class):
                candidates.append(apply_template(product, atom, template, score))

    for bond in G.bonds:
        for template, score in top_templates(bond_classifier(x_bond[bond])):
            if allowed(template, reaction_class):
                candidates.append(apply_template(product, bond, template, score))

    return rank_by_score_and_validity(candidates)[:top_k]
```

##### 局部模板的建模动机

传统 template-based retrosynthesis 往往把整条反应抽象成一个全局模板。问题是模板库长尾严重：同一种反应中心在不同取代基背景下会变成许多稀疏模板，模型需要在数千到数万模板里做全局分类。LocalRetro 的化学假设更局部：大多数结构变化只发生在少数原子和键附近，因此可以先枚举所有可能的局部中心，再判断哪个局部模板适合该中心。

论文把局部模板分为三类：只发生原子属性变化时派生 atom reaction template；发生键断裂、键级变化时派生 bond reaction template；原子和键都变化时同时记为两类模板。这样，模型输出天然带有“反应发生在哪里”和“发生了什么局部变化”的解释。

##### MPNN 与键表示

给定分子图 \(G=(V,E)\)，原子特征 \(v_a\)、邻居原子特征集合 \(\{v_b\}\)、连接键特征集合 \(\{e_{ab}\}\)，论文用 MPNN 更新原子表示：

$$v'_a = \text{MPNN}(v_a, \{v_b\}, \{e_{ab}\})$$

更新后的键表示由两端原子表示拼接后经全连接层得到：

$$e'_{ab} = w(v'_a \Vert v'_b) + c$$

这里 \(\Vert\) 表示向量拼接。这个阶段捕获的是局部邻域环境，例如反应中心附近的杂原子、芳香性、键型、价态和氢数等。

##### GRA：全局反应性注意力

局部环境不足以解释所有位点选择。例如同一个分子里可能存在多个看似相似的卤素或羰基，远程供电子/吸电子基团会改变哪个中心更容易反应。LocalRetro 因此加入 global reactivity attention (GRA)，让每个原子和键都能与分子内所有原子/键交互：

$$x_a = \text{GRA}(v'_a, \{v'_a\}_{a\in V}, \{e'_{ab}\}_{ab\in E})$$

$$x_{ab} = \text{GRA}(e'_{ab}, \{v'_a\}_{a\in V}, \{e'_{ab}\}_{ab\in E})$$

直观上，GRA 类似 Transformer 的 multi-head self-attention，但注意对象不只是序列 token，而是原子和键的化学表征。若用标准注意力形式表示某个中心 \(i\) 对全局中心 \(j\) 的依赖，可写作：

$$\alpha_{ij}^{(h)}=\text{softmax}_j\left(\frac{(W_Q^{(h)}x_i)^\top(W_K^{(h)}x_j)}{\sqrt{d_h}}\right)$$

$$\tilde{x}_i^{(h)}=\sum_j \alpha_{ij}^{(h)} W_V^{(h)}x_j$$

多头结果拼接后得到更新表示。GRA 的目的不是替代局部模板，而是在模板分类前加入非局部反应性上下文。

##### 原子模板与键模板分类器

GRA 后的原子表示 \(x_a\) 和键表示 \(x_{ab}\) 分别进入两套分类器：

$$o_a = u_A^\top \sigma(w_A x_a + c_A)$$

$$o_{ab} = u_B^\top \sigma(w_B x_{ab} + c_B)$$

其中 \(\sigma\) 是 ReLU。随后对候选局部模板集合做 softmax：

$$s(T \mid a)=\text{Softmax}(o_a), \quad T \in \{T_{\text{atom}}\}$$

$$s(T \mid ab)=\text{Softmax}(o_{ab}), \quad T \in \{T_{\text{bond}}\}$$

训练目标可以概括为原子模板和键模板的交叉熵之和：

$$\mathcal{L}=
-\sum_{a\in V}\log s(T_a^\* \mid a)
-\sum_{ab\in E}\log s(T_{ab}^\* \mid ab)$$

其中 \(T_a^\*\) 与 \(T_{ab}^\*\) 是从 atom-mapped 训练反应中提取的监督标签。若反应类别已知，推理时只在该类别对应的模板池中选择模板。

##### 为什么能简化搜索空间

LocalRetro 不直接输出 reactant SMILES，也不对整库全局模板做一次性分类。它把候选空间拆成：

$$\text{candidate} = (\text{center}, \text{local template})$$

中心只来自已有原子和键，数量约为 \(O(|V|+|E|)\)。局部模板只覆盖反应中心附近变化，复用率更高。论文报告 USPTO-50K 训练集抽取出 731 个 local reaction templates，覆盖测试集中 98.1% 的反应；USPTO-MIT 抽取出 21,081 个模板，覆盖 97.0%。

> 💡 关键：LocalRetro 的“模板”不是放弃规则，而是把规则局部化。局部规则保留化学可解释性，同时比全局模板更容易跨取代基背景复用。

##### 结果与局限

在 USPTO-50K 上，LocalRetro 论文报告 top-1 exact match 为 53.4%，top-3/5/10 分别为 77.5%、85.9%、92.4%；round-trip top-1/3/5 为 89.5%、97.9%、99.2%。在 USPTO-MIT 大规模数据上，top-1 exact match 为 54.1%，top-5 round-trip 为 97.4%。GRA 带来的增益在多产物或存在远程位点竞争的反应中更明显，论文中给出可视化示例说明 GRA 能让模型关注远程取代基环境。

局限也很清楚：LocalRetro 仍依赖 atom mapping 来派生模板；若正确反应需要训练集中没有覆盖的局部模板，模型无法生成对应路线。由于它本质上是模板应用模型，泛化能力介于全局模板模型和完全 template-free 生成模型之间。

##### 可访问来源说明

任务文件中的 `paper_url` 指向的 DOI 与 LocalRetro 论文不匹配。本文依据 PubMed Central 可访问全文、ACS 论文 DOI `10.1021/jacsau.1c00246`、以及官方 GitHub `kaist-amsg/LocalRetro` 整理方法细节；YAML 块仍按任务元信息保留。

#### 🧪 练习题
```yaml
question: "LocalRetro 中 GRA 的主要作用是什么？"
options:
  - "把反应中心扩展为所有原子对，从而穷举断键"
  - "让原子和键表示感知分子内非局部反应性依赖，帮助区分相似局部中心"
  - "替代局部反应模板，直接生成完整 reactant SMILES"
  - "判断候选前体是否在商业 stock 中可购买"
answer: 1
explain: "MPNN 主要编码局部邻域，GRA 通过全局注意力补充远程取代基和位点竞争信息，再用于原子/键模板分类。"
```

### GraphRetro

```yaml
id: graphretro
num: 16
name: GraphRetro
full_name: 图半模板逆合成 (GraphRetro)
year: '2021'
org: Tsinghua University
parent: 3n_mcts
paper_url: https://arxiv.org/abs/2006.15426
project_url: ''
category: retrosynthesis
motivation: 先预测合子再补全，提升复杂分子预测精度
```

#### 📝 一句话总结
GraphRetro 把单步逆合成分解为图编辑预测和 synthon completion 两阶段：先在产物图上预测少量键/原子编辑得到合子，再从预计算离去基词表中选择片段补全为反应物。

#### 🎯 核心要点
- **半模板两阶段框架**：不直接生成完整 reactants，也不匹配全局反应模板，而是先生成 synthons，再选择 leaving groups
- **图编辑预测**：只对产物中已有键和原子预测编辑分数，利用“新键形成从 product 到 synthon 极少见”的事实，把复杂度从 \(O(N^2)\) 降到 \(O(N)\)
- **MPN 分子图编码**：用 message passing network 学习原子表示，并构造置换不变的键表示
- **键编辑依赖图**：把键视为节点、共享原子的键之间连边，再用第二个 MPN 更新 bond edit scores，建模编辑之间的依赖
- **离去基词表分类**：从训练集中抽取 synthon 与 reactant 的差异子图作为 leaving group vocabulary；USPTO-50K 上词表约 170 个，覆盖测试集 99.7%
- **确定性 attachment**：选择离去基后，基于标记 attachment atoms 和价态约束把离去基接回合子，attachment 本身不是神经生成过程
- **来源校正**：任务给出的 arXiv:2006.15426 实际为 MEGAN；GraphRetro 官方论文是 arXiv:2006.07038 / NeurIPS 2021，官方实现为 `vsomnath/graphretro`

#### 🔬 深入细节
![GraphRetro 两阶段流程](https://github.com/vsomnath/graphretro/raw/main/assets/graphretro.png)
*图：GraphRetro 官方仓库中的流程图。上半部分为 edit prediction，将 product 转换为 synthons；下半部分为 synthon completion，选择 leaving groups 并接到 synthons 上生成 reactants。*

##### 算法伪代码

```python
# GraphRetro 推理伪代码
def graphretro_predict(product_graph, beam_size):
    # 1. Edit prediction
    atom_repr = MPN(product_graph)
    bond_repr = make_bond_repr(atom_repr, product_graph.bonds)
    atom_edit_scores = score_atom_edits(atom_repr)
    bond_edit_scores = score_bond_edits(bond_repr)

    # 可选：在 bond-dependency graph 上更新 bond edit scores
    bond_graph = build_bond_dependency_graph(product_graph)
    bond_messages = MPN_bond_graph(bond_graph)
    bond_edit_scores = gated_update(bond_edit_scores, bond_messages)

    # 2. 取 top beam_size 个编辑，应用到产物得到 synthons
    beams = []
    for edit in top_k(atom_edit_scores, bond_edit_scores, beam_size):
        synthons = apply_edit(product_graph, edit)
        beams.append((synthons, logprob(edit)))

    # 3. Synthon completion：逐个 synthon component 选择 leaving group
    completed = []
    for synthons, score in beams:
        partials = [(score, [], START)]
        for component in connected_components(synthons):
            new_partials = []
            for partial_score, groups, prev_group in partials:
                probs = leaving_group_classifier(
                    product_graph, component, prev_group
                )
                for lg, lg_score in top_k(probs, beam_size):
                    new_partials.append((partial_score + log(lg_score),
                                         groups + [lg], lg))
            partials = keep_top_k(new_partials, beam_size)

        for partial_score, groups, _ in partials:
            reactants = attach_leaving_groups(synthons, groups)
            completed.append((reactants, partial_score))

    return rank_by_log_likelihood(completed)
```

##### 概率分解

GraphRetro 的核心概率分解是：

$$P(G_r \mid G_p)=\sum_{E,G_l} P(E\mid G_p)P(G_l\mid G_p,G_s)$$

其中 \(G_p\) 是 product graph，\(E\) 是从 product 到 synthon 的编辑集合，\(G_s\) 是应用编辑后的 synthons，\(G_l\) 是要接到 synthons 上的 leaving groups，\(G_r\) 是最终 reactants。给定 \(G_p,E,G_l\) 后，\(G_s\) 和 \(G_r\) 是确定的。

这个分解对齐了化学家的工作流：先找反应中心或断键位置，再判断断开后缺失了什么离去基/官能团。相比端到端 SMILES 生成，它显著减少自由生成步骤，也让错误更容易定位到“edit 错了”还是“leaving group 错了”。

##### 图编辑预测

GraphRetro 把 edits 定义为两类：键编辑 \(((u,v),k)\)，表示 product 到 reactant/synthon 的键型变化或断裂；原子编辑 \(u\)，表示 attached hydrogens 数量变化。模型只对已有键和原子打分，而不枚举所有原子对。

先用 MPN 编码产物图：

$$\{c_u\}=\text{MPN}(G,\{x_u\},\{x_{uv}\}_{v\in\mathcal{N}(u)})$$

图级表示可由原子表示求和：

$$c_G=\sum_{u\in V}c_u$$

键 \((u,v)\) 的表示采用绝对差和求和拼接，保证对端点顺序不敏感：

$$c_{uv}=\left(|c_u-c_v|\ \Vert\ c_u+c_v\right)$$

随后分别预测原子编辑和键编辑分数：

$$s_u=u_a^\top\tau(W_a c_u+b)$$

$$s_{uvk}=u_k^\top\tau(W_k c_{uv}+b_k)$$

其中 \(\tau\) 是 ReLU。由于 USPTO-50K 中大多数样本只有单一 edit，论文主模型重点描述 single-edit 设置；多编辑版本在附录中用 autoregressive 方式逐步预测编辑并加入停止符。

##### 用键依赖图更新编辑分数

不同 bond edits 并非独立。例如芳香环中相邻键倾向于共同保持稳定，某个键变化可能隐含另一些键不能变化。GraphRetro 构造 bond dependency graph：原分子中的每条键变成一个节点，若两条键共享原子，就在它们之间连边。第二个 MPN 在这个图上传递消息 \(m_{uv}\)，再用门控方式更新初始键编辑分数：

$$f_{uvk}=\sigma(W^f_{kx}x_{uv}+W^f_{km}m_{uv})$$

$$i_{uvk}=\sigma(W^i_{kx}x_{uv}+W^i_{km}m_{uv})$$

$$\tilde{m}_{uvk}=u_m^\top\tau(W^m_{kx}x_{uv}+W^m_{km}m_{uv})$$

$$\tilde{s}_{uvk}=f_{uvk}\cdot s_{uvk}+i_{uvk}\cdot\tilde{m}_{uvk}$$

这里 \(f\) 像保留门，决定保留多少原始 edit score；\(i\) 像输入门，决定加入多少来自邻近键依赖图的新消息。

##### Edit prediction 的训练目标

GraphRetro 用交叉熵学习“哪个 edit 是正确 edit”的分布，而不是对每个候选编辑独立做 binary classification：

$$\mathcal{L}_e=
-\sum_{(G_p,E)}
\left(
\sum_{((u,v),k)\in E} y_{uvk}\log \tilde{s}_{uvk}
+\sum_{u\in E} y_u\log s_u
\right)$$

这种目标更符合推理场景：模型最终要在候选编辑中排序并选择 top edits，而不是分别判断每个键是否可能变化。

##### Synthon completion：把离去基选择变成分类

应用 edit 后，product graph 变成一个或多个 synthons。GraphRetro 从训练集中构造 leaving group vocabulary：对齐每个 synthon component 和 reactant component，抽取 \(V_{lc}=V_{rc}\setminus V_{sc}\) 对应的差异子图，并标记 attachment atoms。USPTO-50K 上词表很小，说明许多反应复用相似离去基。

对第 \(c\) 个 synthon component，模型输入三类信息：product 表示 \(c_{G_p}\)、当前 synthon component 表示 \(c_{G_s^c}\)、上一个 component 的 leaving group 表示 \(e_{l(c-1)}\)。分类分布为：

$$\hat{q}_{lc}=\text{softmax}\left(U\tau(W_1c_{G_p}+W_2c_{G_s^c}+W_3e_{l(c-1)})\right)$$

训练时使用 teacher forcing，令 \(q_{lc}\) 为真实 leaving group 的 one-hot 标签：

$$\mathcal{L}_s=\sum_{c=1}^{C}\mathcal{L}(\hat{q}_{lc},q_{lc})$$

推理时采用 beam search，把 edit log-likelihood 和每步 leaving group log-likelihood 累加：

$$\text{score}(G_r)=\log P(E\mid G_p)+\sum_{c=1}^{C}\log P(l_c\mid G_p,G_s^c,l_{c-1})$$

最后 attachment 是确定性规则：根据 leaving group 中标记的 attachment atom、synthon 中参与 edit 的原子，以及价态约束决定接单键还是双键。论文报告在给定正确 synthons 和 leaving groups 时，attachment 过程可以达到 100% 准确。

##### 与模板法和 template-free 法的区别

GraphRetro 相比全局模板法，不需要把整条反应限制在模板库内；相比 template-free SMILES 生成，不需要从零逐字符生成反应物。它牺牲了一部分自由生成能力，换来更强的结构约束、可解释性和更小的搜索空间。

相比 G2Gs、RetroXpert 等半模板方法，GraphRetro 的关键差异是 synthon completion 不做逐原子/逐字符生成，而是直接从离去基词表中选择子图。这个设计让生成路径短得多，也更容易控制化学有效性。

##### 结果与局限

在 canonicalized USPTO-50K 上，GraphRetro 报告 reaction class unknown 的 top-1 accuracy 为 53.7%，top-3/5/10 为 68.3%、72.2%、75.5%；reaction class known 的 top-1 为 63.9%，top-5 为 85.2%。模块消融显示：edit score update 和“只预测已有键/原子而非所有原子对”都带来提升；synthon completion 在给定真实 edits 时 top-5 可以接近 97%。

主要局限来自两阶段结构：如果第一阶段 edit 预测错，第二阶段通常无法恢复真实 reactants。模型也依赖 atom mapping 来抽取 edits 和 leaving groups；当正确反应需要词表外离去基或 synthons/reactants component 数量假设不成立时，预测会受限。

##### 可访问来源说明

任务给出的 `paper_url` 指向 arXiv:2006.15426，其标题是 MEGAN，不是 GraphRetro。本文依据 GraphRetro 官方论文 arXiv:2006.07038、NeurIPS 2021 页面、OpenReview 页面和官方 GitHub 图示整理；YAML 块仍按任务元信息保留。

#### 🧪 练习题
```yaml
question: "GraphRetro 为什么把 synthon completion 建模为 leaving group 词表分类？"
options:
  - "因为离去基在训练集中高度复用，词表较小，分类比逐字符生成更简单且更可控"
  - "因为所有反应物都可以由一个固定离去基生成"
  - "因为 edit prediction 无法产生多个 synthons"
  - "因为模型不需要 atom mapping 或任何反应中心信息"
answer: 0
explain: "GraphRetro 从训练集中抽取重复出现的 leaving group 子图；选择子图并确定性接回 synthons，减少生成复杂度并提高可解释性。"
```

### Synthegy

```yaml
id: synthegy
num: 17
name: Synthegy
full_name: 自然语言引导逆合成 (Synthegy)
year: '2026.05'
org: EPFL
parent: aizynthfinder
paper_url: https://www.sciencedaily.com/releases/2026/05/260506133400.htm
project_url: ''
category: retrosynthesis
motivation: LLM驱动自然语言战略引导，专家一致性71.2%
```

#### 📝 一句话总结
Synthegy 将大语言模型放在“化学策略评估器”而不是“直接生成结构”的位置，用自然语言约束对 AiZynthFinder、Reaxys、Synthia 等逆合成工具给出的候选路线打分、解释并排序，从而把专家的合成意图转化为可搜索的路线偏好。

#### 🎯 核心要点
- **自然语言策略输入**：用户可直接写“尽早形成某个环”“避免不必要保护基”“优先高收率且副反应少”等目标，而不是手工配置固定规则
- **候选路线后评估**：底层仍由传统逆合成引擎生成路线，LLM 负责读取路线文本、判断与策略要求的匹配度，并给出 0-10 分和理由
- **兼容多种路线来源**：论文评估了 AiZynthFinder、Reaxys、Synthia 和文献实验路线，说明 Synthegy 是路线评估层而非单一逆合成搜索器
- **策略感知基准**：构建目标分子与自然语言 prompt 的成对任务，用程序化指标或专家评价衡量 route-to-prompt alignment
- **专家一致性验证**：EPFL 新闻稿披露双盲研究中 36 位化学家给出 368 个有效评价，Synthegy 与专家判断平均一致率为 71.2%
- **机制推断同构扩展**：同一框架也用于反应机理搜索，把候选 elementary step 序列交给 LLM 判断化学合理性
- **关键边界**：LLM 不替代反应规则、库存和图搜索；路线质量仍受候选路线生成器的覆盖度限制

#### 🔬 深入细节
##### 来源与框架图

任务给出的 `paper_url` 是新闻页；可追溯到 Matter 论文 *Chemical reasoning in LLMs unlocks strategy-aware synthesis planning and reaction mechanism elucidation*（DOI: `10.1016/j.matt.2026.102812`）、arXiv HTML 版本 `https://arxiv.org/html/2503.08537v2`，以及官方代码仓库 `https://github.com/schwallergroup/steer`。新闻页和论文题名在“strategy-aware synthesis planning”上略有命名差异，但指向同一方法线。

![Synthegy/steer 总览图](https://raw.githubusercontent.com/schwallergroup/steer/main/assets/overview.png)
*图：官方仓库给出的 LLM-as-chemical-reasoning-engine 总览。Synthegy 的核心不是让 LLM 直接画分子，而是让 LLM 解释并评价由化学搜索算法枚举出的候选路线或机理。*

##### 基本流程

Synthegy 的输入是目标分子 \(m\) 和用户策略文本 \(q\)。底层逆合成工具先产生候选路线集合：

$$
\mathcal{R}(m)=\{r_1,r_2,\ldots,r_N\}
$$

每条路线 \(r_i\) 被序列化为包含反应 SMILES、中间体、反应顺序和步骤描述的文本 \(s_i=\text{Serialize}(r_i)\)。LLM 评估器接收 \((q,s_i)\)，输出路线对策略的匹配分数和解释：

$$
S_\theta(q,r_i),\ a_i=\text{LLM}_\theta(\text{Prompt}(q,s_i)),\quad S_\theta\in[0,10]
$$

最终选择或展示：

$$
r^\*=\arg\max_{r_i\in\mathcal{R}(m)} S_\theta(q,r_i)
$$

这里 \(S_\theta\) 不是反应模板概率，也不是路径长度惩罚，而是把“化学家想要的策略”作为文本条件后的语义评分。它可以表达传统搜索权重难以编码的偏好，例如“这个保护基循环是否多余”“关键偶联步骤是否过晚”“某一步是否可能引入副产物”。

```python
# Synthegy 策略感知逆合成伪代码
def synthegy(target_smiles, user_instruction, retrosynthesis_engine, llm):
    routes = retrosynthesis_engine.search(target_smiles)
    scored_routes = []

    for route in routes:
        route_text = serialize_route(
            route,
            include_intermediates=True,
            include_reaction_smiles=True,
            include_step_order=True,
        )
        prompt = build_evaluation_prompt(
            instruction=user_instruction,
            route_text=route_text,
            score_range="0-10",
            require_rationale=True,
        )
        score, rationale = llm.evaluate(prompt)
        scored_routes.append((score, rationale, route))

    return sorted(scored_routes, key=lambda x: x[0], reverse=True)
```

##### 为什么不是直接让 LLM 做逆合成

直接让 LLM 生成分子结构或完整路线时，常见问题是化学合法性、库存约束、反应模板覆盖和可复现性都难控制。Synthegy 采用更保守的分工：图搜索和反应枚举仍由成熟 CASP 系统负责，LLM 只在文本层面对“路线是否符合策略”做判别。

这个设计把 LLM 的强项放在合适位置：它擅长读自然语言约束、综合多步上下文、指出保护基、官能团兼容性、反应顺序等战略问题；而不要求它独自承担原子映射、反应模板应用或购买库存判断。EPFL 新闻稿也明确说明，Synthegy 是把 LLM 作为 evaluator 来指导传统计算工具。

##### 策略评分与基准构造

论文中有两类评估方式。第一类是可程序化验证的策略 prompt，例如“某类环形成反应应尽早发生”。这时可以把路线中满足条件的反应位置转为自动得分：

$$
S_{\text{early}}(r)=
\begin{cases}
10\left(1-\frac{\min J(r)-1}{L(r)-1}\right), & J(r)\neq\varnothing\\
0, & J(r)=\varnothing
\end{cases}
$$

其中 \(L(r)\) 是路线步数，\(J(r)\) 是满足目标反应模式的步骤集合。越靠近起始原料端发生，得分越高；没有发生则为 0。这类任务用于检验 LLM 是否能从路线文本中恢复可验证的结构事件。

第二类是更接近真实研发的可行性 prompt，例如“高可行性、高总收率、考虑副反应和副产物、避免不必要反应”。这种评价没有简单程序答案，因此论文将 AiZynthFinder、Reaxys、Synthia 和文献实验路线放到同一评分框架下，由 LLM 比较路线的全局合理性。arXiv 方法部分说明，feasibility assessment 使用 Gemini-2.5-pro 作为后端 LLM，并要求模型给出 0-10 数值分和详细理由。

##### 与 AiZynthFinder 的关系

YAML 中的 `parent: aizynthfinder` 可以理解为“候选路线生成层”的默认父系统。AiZynthFinder 给定目标分子后，会在反应模板和库存库上执行逆合成树搜索，产出若干可到达原料的路线。Synthegy 在其上增加一层语义价值函数：

$$
\text{CASP route score}(r)
\quad\longrightarrow\quad
\big(\text{CASP score}(r),\ S_\theta(q,r),\ \text{rationale}_\theta(q,r)\big)
$$

如果只做后处理，Synthegy 是 reranker；如果进一步把 \(S_\theta(q,r)\) 接入搜索队列，它就可以成为策略感知 value function，引导搜索优先扩展更符合自然语言目标的路线。当前公开论文和仓库更强调前者：对已有候选路线打分、排序、解释和筛选。

##### 机理搜索的同构思想

Synthegy 还把反应机理拆成最小动作空间：`ionization` 与 `attack`。给定当前分子状态、目标产物、历史 elementary steps 和一个候选下一步，LLM 评估该动作是否符合化学原则：

$$
a_t^\*=\arg\max_{a\in\mathcal{A}(x_t)} S_\theta(a\mid x_t,\text{history},\text{product},q)
$$

这说明框架本质上是“搜索枚举 + LLM 化学判别”：只要候选对象能被文本化，并且评分标准能用自然语言表达，就可以复用同一评估器。

> 💡 关键：Synthegy 的创新不是新的反应模板，而是把专家策略从硬编码过滤器变成自然语言条件下的 LLM 评价函数，使传统 CASP 工具能按人类合成策略重新排序。

#### 🧪 练习题
```yaml
question: "Synthegy 相比直接用 LLM 生成逆合成路线的核心设计差异是什么？"
options:
  - "它完全不用传统逆合成搜索，只由 LLM 生成所有反应步骤"
  - "它让传统工具生成候选路线，再用 LLM 按自然语言策略评分、解释和排序"
  - "它只预测单步反应产率，不处理多步路线"
  - "它把所有路线都转化为固定模板，不允许用户输入自然语言"
answer: 1
explain: "Synthegy 将 LLM 作为 evaluator/reranker，底层路线仍由 AiZynthFinder、Reaxys、Synthia 等工具生成，因此能结合结构搜索的可靠性和自然语言策略表达能力。"
```

### MOSAIC

```yaml
id: mosaic
num: 18
name: MOSAIC
full_name: 自动实验方案生成平台 (MOSAIC)
year: '2026.01'
org: Yale / Boehringer Ingelheim
parent: aizynthfinder
paper_url: https://news.yale.edu/2026/01/19/new-recipes-accelerating-chemistry-discoveries-dash-ai
project_url: ''
category: retrosynthesis
motivation: 导航百万反应协议，生成可操作实验室规程
```

#### 📝 一句话总结
MOSAIC 提出“多个专门化化学专家”的 LLM 框架，把百万级反应协议划分到 2,498 个 Voronoi 专家域中，再按待预测反应检索 top-k 专家生成试剂、条件和可执行实验步骤，解决单一大模型难以覆盖复杂化学子领域的问题。

#### 🎯 核心要点
- **Multiple Optimized Specialists**：基于 Llama-3.1-8B-Instruct 微调出 2,498 个专门化化学专家，而不是依赖一个通用模型
- **反应空间分区**：使用反应指纹、kernel metric network 和 FAISS/Voronoi 聚类，把反应协议映射到可搜索的专家区域
- **top-k 专家路由**：对新反应计算嵌入，检索最近的专家中心，调用多个专家生成候选实验规程并显示专家距离
- **实验规程输出**：目标不是只给反应是否可行，而是输出反应物、试剂、条件、温度和逐步 procedure
- **置信度/适用域提示**：用待预测反应到专家中心的距离和参考协议相似度提示该建议是否处于专家经验范围内
- **实验验证**：Nature 摘要和 Yale 新闻披露整体实验成功率约 71%，并实现 35 个以上此前未报道化合物
- **开放实现**：官方 GitHub 提供数据处理、Voronoi 域创建、kernel metric network、专家微调和预测工具链

#### 🔬 深入细节
##### 来源与框架图

任务给出的 `paper_url` 是 Yale 新闻；它链接到 Nature 论文 *Collective intelligence for AI-assisted chemical synthesis*（DOI: `10.1038/s41586-026-10131-4`）。Nature 页面目前公开摘要、图题、数据与代码可用性，详细正文需要访问权限；方法级细节主要来自官方开源仓库 `https://github.com/haoteli/MOSAIC`。因此下面的解读以 Nature 摘要、Yale 新闻和官方代码/README 可见流程为依据。

![MOSAIC 图形摘要](https://raw.githubusercontent.com/haoteli/MOSAIC/main/Graphical_Abstract_v2.png)
*图：MOSAIC 官方仓库的图形摘要。系统先把反应知识划分为许多专家域，再根据新反应的嵌入位置选择相邻专家生成实验方案。*

##### 反应表示与专家路由

MOSAIC 的第一步是把待处理反应 \(r\) 编成固定维度向量。官方预测代码中使用 RDKit 生成混合反应指纹，并将反应物、差分和产物信息拼接：

$$
x_r = [\text{FP}_{reactant},\ \text{FP}_{diff},\ \text{FP}_{product}]
$$

其中 \(\text{FP}_{diff}\) 表示从反应物到产物的结构变化。随后 kernel metric network 将高维指纹映射到更适合检索的嵌入空间：

$$
h_r = f_\phi(x_r)
$$

官方 `Transformation_Model.py` 中的网络是两层 MLP：`input -> 256 -> 128 -> classes`，中间包含 ReLU、BatchNorm 和 Dropout；`get_embeddings()` 返回 128 维左右的中间表示用于专家检索。Voronoi 专家域由中心 \(\{c_j\}_{j=1}^{2498}\) 定义：

$$
e^\*(r)=\arg\min_j \|h_r-c_j\|_2
$$

推理时不只取一个专家，而是通过 FAISS 检索 top-\(k\) 最近专家：

$$
\mathcal{E}_k(r)=\operatorname{TopK}_{j}\left(-\|h_r-c_j\|_2\right)
$$

这些距离就是 MOSAIC 的适用域信号：距离越小，说明待预测反应越接近该专家见过的协议分布。代码会打印 `Expert Centroid Distances`，并可展示该专家域中反应类别和试剂统计。

```python
# MOSAIC 推理伪代码
def mosaic_predict(reaction_smiles, n_expert=3):
    rxn_fp = make_mixed_reaction_fingerprint(reaction_smiles)
    x = concat([rxn_fp.reactant, rxn_fp.diff, rxn_fp.product])

    # kernel metric network: reaction fingerprint -> searchable embedding
    h = metric_network.get_embeddings(x)

    # FAISS/Voronoi 路由：选择最接近的专家域
    distances, expert_ids = faiss_index.quantizer.search(h, k=n_expert)

    all_candidates = []
    for expert_id, distance in zip(expert_ids, distances):
        expert_model = load_lora_or_adapter("Expert_" + str(expert_id))
        prompt = build_protocol_prompt(reaction_smiles)
        sequences = expert_model.generate(
            prompt,
            beam_size=20,
            beam_group=2,
            diversity_penalty=0.1,
        )
        for seq in sequences:
            protocol = parse_reagents_conditions_procedure(seq)
            references = retrieve_nearest_reference_protocols(protocol, expert_id)
            all_candidates.append((distance, expert_id, protocol, references))

    return rank_by_domain_distance_and_protocol_quality(all_candidates)
```

##### 训练机制

MOSAIC 的训练分为三层。第一层是数据处理：从 Pistachio 或自定义数据库中抽取反应协议，生成反应指纹，并为每条记录保留 reaction SMILES、自然语言 procedure、试剂和条件等字段。第二层是 metric learning/分类式路由：训练 kernel metric network，让相似反应在嵌入空间中相邻，再用 FAISS 生成 Voronoi 专家索引。第三层是语言模型训练：先对 Llama-3.1-8B-Instruct 做通用化学暴露式微调，再按专家域继续训练每个 specialist。

专家 \(e\) 的语言建模目标可以写成标准监督微调损失：

$$
\mathcal{L}_e(\theta_e)
=-\sum_{(x,y)\in D_e}\sum_{t=1}^{|y|}
\log p_{\theta_e}(y_t\mid y_{<t},\text{Prompt}(x))
$$

其中 \(D_e\) 是 Voronoi 域 \(e\) 内的反应协议集合，\(x\) 是反应描述，\(y\) 是规程文本。这个目标让每个专家只在局部反应空间中学习“怎么写可执行 procedure”，减少通用模型在冷门反应上的平均化和幻觉。

##### 置信度与参考协议

MOSAIC 的 uncertainty 不是简单的 softmax 分类置信度。官方代码中更直接暴露两类证据：一是待预测反应到专家中心的距离 \(d_j=\|h_r-c_j\|_2\)，二是生成 procedure 与专家域内参考协议的编辑距离。可以把 top-k 距离归一化为一个可读权重：

$$
w_j=\frac{\exp(-d_j/\tau)}{\sum_{\ell\in\mathcal{E}_k(r)}\exp(-d_\ell/\tau)}
$$

但需要注意：这是对代码中距离信号的解释性归一化，不等同于论文宣称的严格校准概率。实际使用时，更重要的是查看专家域反应分布、最近参考协议和生成步骤是否化学上可执行。

##### 与传统逆合成规划的区别

传统 retrosynthesis 系统主要回答“从哪些前体能到达目标分子”，输出的是路线或反应模板序列。MOSAIC 更靠近实验执行层：给定某个反应或合成目标后，它尝试生成可操作协议，包括试剂、溶剂、温度、时间、加料顺序和后处理。Yale 新闻将其比作“化学 recipe book”，这个比喻准确反映了任务边界：它不是只做路径搜索，而是把数据库中分散的实验文本压缩成可检索、可组合、可生成的 protocol knowledge。

这种设计也解释了为什么它采用多专家而非单模型。化学反应空间高度非均匀：光反应、过渡金属催化、天然产物后期官能团化、材料单体合成等子领域的实验语言和失败模式都不同。用 Voronoi 域分片后，专家模型可以在更窄的局部分布上学习具体做法，推理阶段再通过 top-k 专家形成“集体智能”。

> ⚠️ 注意：MOSAIC 生成的是实验建议，不是免验证的实验指令。实际执行仍需要化学家审阅安全性、可购买性、放大风险、保护基兼容性和机构 SOP。

#### 🧪 练习题
```yaml
question: "MOSAIC 中 Voronoi/FAISS 专家路由的主要作用是什么？"
options:
  - "把每个反应都随机分配给一个 LLM，以增加输出多样性"
  - "根据反应指纹嵌入检索最接近的化学专家域，用局部专家生成实验规程"
  - "用固定规则删除所有低产率反应，避免模型生成 procedure"
  - "把自然语言 procedure 转换为 SMILES，不参与模型选择"
answer: 1
explain: "MOSAIC 先用反应指纹和 kernel metric network 得到嵌入，再用 FAISS/Voronoi 检索最近的专家模型；专家距离同时提供适用域和不确定性线索。"
```

### JT-VAE

```yaml
id: jt_vae
num: 19
name: JT-VAE
full_name: 连接树变分自编码器 (JT-VAE)
year: '2018'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1802.04364
project_url: ''
category: generation
motivation: 先生成子结构再组装，实现100%化学合法性
```

#### 📝 一句话总结
JT-VAE 提出先生成由合法化学子结构组成的 junction tree，再用图消息传递网络把子结构装配成完整分子图的两阶段 VAE，解决 SMILES/逐原子生成容易产生非法中间结构和非法分子的问题。

#### 🎯 核心要点
- **图生成而非 SMILES 生成**：直接在分子图上建模，避免相似分子对应差异很大的 canonical SMILES 字符串
- **两阶段解码**：先用 tree decoder 生成子结构骨架，再用 graph decoder 预测相邻子结构的具体连接方式
- **合法子结构词表**：词表由训练集中的环、键和原子簇构成，生成过程以化学上合法的片段为基本单元
- **双潜变量表示**：\(z_T\) 编码 junction tree 的粗粒度骨架，\(z_G\) 编码分子图的细粒度连接
- **化学可行性 mask**：树生成时只允许与当前邻居兼容的 cluster label，图装配时枚举并剪除化学非法候选
- **消息传递编码器**：同时使用 graph message passing network 和 tree message passing network，分别编码分子图与连接树
- **核心结果**：在 ZINC 约 250K 分子上，先验采样有效率达到 100%，明显优于 CVAE/GVAE/SD-VAE 和逐原子图生成基线

#### 🔬 深入细节
##### 架构图与来源

论文 arXiv 页面、ar5iv HTML 和官方代码仓库均可访问：`https://arxiv.org/abs/1802.04364`、`https://ar5iv.labs.arxiv.org/html/1802.04364`、`https://github.com/wengong-jin/icml18-jtnn`。官方仓库说明 `fast_jtnn/` 和 `fast_molvae/` 是更新后的加速实现，原始实验脚本位于 `bo/`、`molvae/`、`molopt/` 和 `jtnn/`。

![JT-VAE 方法总览](https://raw.githubusercontent.com/wengong-jin/icml18-jtnn/master/paradigm.png)
*图：JT-VAE 官方仓库中的方法总览。模型将分子先分解为 junction tree；编码时同时得到树潜变量 \(z_T\) 与图潜变量 \(z_G\)，解码时先还原树，再装配完整分子图。*

##### Junction tree 分解

给定分子图 \(G=(V,E)\)，JT-VAE 将其拆成一组 cluster \(\mathcal{C}=\{C_1,\ldots,C_m\}\)。cluster 主要来自简单环、非环边和必要的原子簇。分解需要满足两个条件：

$$
\bigcup_i C_i = V,\quad \bigcup_i E(C_i)=E
$$

以及 running intersection property：如果某个原子同时出现在 \(C_i\) 和 \(C_j\) 中，那么连接树上从 \(C_i\) 到 \(C_j\) 的路径上的每个 cluster 都必须包含该原子。这样得到的 cluster graph 可抽取一棵 junction tree \(T\)，其中每个节点是一个合法化学片段。

这个设计的化学直觉很直接：芳香环、稠环、官能团等结构很难逐原子生成，因为中间状态常常不满足价态或芳香性规则；如果把它们作为合法片段一次性放入图中，生成过程就能持续停留在更接近真实分子的空间里。

##### 编码器：图消息与树消息

JT-VAE 使用两个编码器。图编码器在原子图上进行 loopy message passing。对有向边 \(u\to v\)，消息可概括为：

$$
\nu_{uv}^{(t)}
=\tau\left(W_1x_u+W_2e_{uv}+W_3\sum_{w\in N(u)\setminus v}\nu_{wu}^{(t-1)}\right)
$$

迭代 \(T\) 步后聚合到原子表示：

$$
h_v=\tau\left(U_1x_v+U_2\sum_{u\in N(v)}\nu_{uv}^{(T)}\right)
$$

图潜变量由所有原子表示池化得到：

$$
q_\phi(z_G\mid G)=\mathcal{N}(\mu_G,\operatorname{diag}(\sigma_G^2))
$$

树编码器则在 junction tree 上做两遍消息传递：先从叶到根，再从根到叶。由于 \(T\) 是树结构，消息计算不需要 loopy 迭代，而是按拓扑顺序使用 GRU 聚合子树上下文。最终得到：

$$
q_\phi(z_T\mid T)=\mathcal{N}(\mu_T,\operatorname{diag}(\sigma_T^2))
$$

论文实验中为与 SMILES VAE 基线公平比较，总潜空间维度设为 56，其中树表示和图表示各 28 维。

##### 解码器：先树后图

Tree decoder 以深度优先顺序生成 junction tree。每访问一个节点，模型先预测它是否继续扩展子节点，再预测新子节点的 cluster label。训练时使用 teacher forcing；采样时使用化学兼容性 mask，避免选择无法与已有邻居装配的片段。

```python
# JT-VAE 解码伪代码
def decode(z_T, z_G):
    # 1. 从树潜变量生成合法子结构骨架
    T_hat = initialize_tree_with_root()
    stack = [T_hat.root]
    while stack:
        node = stack[-1]
        p_expand = tree_decoder.predict_topology(node, z_T, T_hat)
        if sample(p_expand) == "expand":
            valid_labels = compatible_cluster_labels(node, T_hat)
            label = sample_masked(tree_decoder.predict_label(node, z_T), valid_labels)
            child = T_hat.add_child(node, label)
            stack.append(child)
        else:
            stack.pop()

    # 2. 将树节点代表的子结构装配为完整分子图
    G = initialize_graph_from_root_cluster(T_hat.root)
    for node in traversal_order(T_hat):
        candidates = enumerate_attachments(node, T_hat.neighbors(node), G)
        candidates = [c for c in candidates if rdkit_valence_check(c)]
        scores = graph_decoder.score_candidates(candidates, z_G, tree_context=T_hat)
        G = merge_best_candidate(G, candidates[argmax(scores)])
    return G
```

Graph decoder 的任务不是重新生成所有原子，而是解决“相邻 cluster 具体怎样重叠/连接”。对每个树节点 \(i\)，枚举其与邻居片段的候选装配集合 \(\mathcal{A}_i\)，并用图消息传递网络结合树上下文打分：

$$
a_i^\*=\arg\max_{a\in\mathcal{A}_i} s_\psi(a,z_G,T)
$$

由于论文的分解规则使任意两个 cluster 最多共享两个原子，候选装配数通常很小；再加上 RDKit 价态检查和同构去重，平均计算量随 cluster 数近似线性增长。

##### 损失函数

JT-VAE 的训练目标是 VAE 负 ELBO 加上树生成和图装配的监督项。可以概括为：

$$
\mathcal{L}
=\mathcal{L}_{tree}^{topo}
+\mathcal{L}_{tree}^{label}
+\mathcal{L}_{assem}
+\beta\left[
D_{KL}(q_\phi(z_T\mid T)\|p(z_T))
+D_{KL}(q_\phi(z_G\mid G)\|p(z_G))
\right]
$$

其中 \(\mathcal{L}_{tree}^{topo}\) 是是否继续扩展的二分类交叉熵，\(\mathcal{L}_{tree}^{label}\) 是 cluster label 的多分类交叉熵，\(\mathcal{L}_{assem}\) 是正确装配候选的交叉熵，先验 \(p(z_T)\) 和 \(p(z_G)\) 通常取标准正态分布。

##### 为什么能达到 100% 合法性

JT-VAE 的合法性来自两道约束。第一道在 tree decoder：节点标签来自训练集合法子结构词表，并且采样时 mask 掉与当前邻域不兼容的 label。第二道在 graph decoder：候选装配通过化学可行性检查，非法价态、非法芳香性或无法合并的候选不会进入最终选择。

这与 SMILES VAE 的区别很大。SMILES 模型即使语法合法，也可能生成化学非法结构；逐原子图模型则会在生成环或芳香体系时经历大量非法中间状态。JT-VAE 把“先生成合法子结构，再局部装配”作为归纳偏置，因此在从先验采样 1000 个 latent vector 并多次解码的实验中报告 100.0% validity。

##### 结果与影响

论文在 ZINC 约 250K drug-like molecules 上评估。重构与有效性任务中，JT-VAE 的 reconstruction 为 76.7%，validity 为 100.0%；作为对比，CVAE/GVAE/SD-VAE 的 validity 分别为 0.7%、7.2%、43.5%，逐原子 LSTM 图生成基线为 89.2%。在 penalized logP 的 Bayesian optimization 中，JT-VAE 找到的前三个分子得分为 5.30、4.93、4.49，高于 SD-VAE 的 4.04、3.50、2.96。

JT-VAE 的后续影响在于把分子生成从“字符语言建模”推向“结构化图生成”。后来的 HierVAE、hgraph2graph、graph-to-graph optimization 等方法延续了这种层次化思想：先在可解释的化学片段层面建模，再处理原子级连接细节。

> 💡 关键：JT-VAE 不是靠事后过滤非法分子取胜，而是在生成过程本身加入化学片段词表、junction tree 约束和装配合法性检查，使非法候选尽量无法被采样出来。

#### 🧪 练习题
```yaml
question: "JT-VAE 为什么比直接逐原子生成分子图更容易保证化学合法性？"
options:
  - "它完全不生成图，只生成文本描述"
  - "它先生成合法子结构组成的 junction tree，再枚举并筛选合法装配方式"
  - "它把所有分子都限制为线性链，因此不会违反价态"
  - "它只在训练集上做最近邻检索，不产生新分子"
answer: 1
explain: "JT-VAE 的基本单元是合法环、键和片段，tree decoder 有兼容性 mask，graph decoder 又剪除化学非法装配，因此能在生成过程中持续约束合法性。"
```

### REINVENT 4

```yaml
id: reinvent4
num: 20
name: REINVENT 4
full_name: 强化学习分子设计 (REINVENT 4)
year: '2024'
org: AstraZeneca
parent: jt_vae
paper_url: https://link.springer.com/article/10.1186/s13321-024-00812-5
project_url: ''
category: generation
motivation: 集成Transformer和课程学习的多目标优化
```

#### 📝 一句话总结
REINVENT 4 将 SMILES 序列生成器、迁移学习、强化学习和课程式 staged learning 统一到一个开源分子设计框架中，用固定 prior 约束的增强似然目标把多目标评分函数转化为可训练的分子生成策略。

#### 🎯 核心要点
- **统一生成框架**：在同一套命令行与配置系统中支持 sampling、scoring、transfer learning 和 staged learning
- **多类序列生成器**：覆盖 Reinvent de novo 生成、LibInvent scaffold/R-group 装饰、LinkInvent linker 设计与 scaffold hopping、Mol2Mol Transformer 分子优化
- **自回归 SMILES agent**：无条件模型学习 \(P(T)\)，条件模型学习 \(P(T\mid S)\)，用 teacher forcing 最小化 token 级 NLL
- **DAP 强化学习目标**：用 \(\log P_{\text{aug}}(T)=\log P_{\text{prior}}(T)+\sigma S(T)\) 把评分函数并入似然，训练 agent 靠近增强似然
- **固定 prior 正则化**：prior 不参与 RL 更新，只作为化学合理性锚点，限制 agent 偏离药物样分布
- **课程学习/staged learning**：把多个 RL stage 串联起来，逐步引入更严格或更昂贵的评分项，例如先过滤不良化学结构再启用 docking
- **可扩展 scoring subsystem**：支持 RDKit 理化性质、QED、SA score、DockStream docking、QSAR/Qptuna、ChemProp、ROCS、REST/external process 等组件
- **多目标聚合与变换**：各 endpoint 分数可先映射到 \([0,1]\)，再按权重做算术均值或几何均值聚合为标量 reward
- **多样性与经验回放**：scaffold bucket diversity filter 抑制重复骨架，inception memory 把高分历史分子加入 loss 加速学习

#### 🔬 深入细节
##### 框架图与可访问来源

![REINVENT 4 信息流与生成器总览](https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-024-00812-5/MediaObjects/13321_2024_812_Fig3_HTML.png)
*图：REINVENT 4 的 run modes、generator model 与 scoring subsystem 信息流。*

![REINVENT 4 prior、TL 与 staged RL 的行为示意](https://media.springernature.com/lw685/springer-static/image/art%3A10.1186%2Fs13321-024-00812-5/MediaObjects/13321_2024_812_Fig1_HTML.png)
*图：prior 学习广泛药物样空间，TL 偏向局部区域，staged/RL 进一步集中到高分区域。*

可访问来源：论文 HTML https://link.springer.com/article/10.1186/s13321-024-00812-5；官方代码 https://github.com/MolecularAI/REINVENT4。论文图像由 Springer Nature 页面公开提供。

##### 算法伪代码

```python
# REINVENT 4 staged learning with DAP loss
def staged_learning(prior, agent, stages, sigma):
    # prior is fixed; agent is trainable
    for stage in stages:
        scoring_profile = stage.scoring_components
        diversity_filter = stage.optional_diversity_filter
        replay_memory = stage.optional_inception_memory

        for epoch in range(stage.max_steps):
            smiles = agent.sample(batch_size=stage.batch_size)
            smiles = rdkit_canonicalize(smiles)

            raw_scores = []
            for smi in smiles:
                if violates_global_filter(smi):
                    raw_scores.append(0.0)
                    continue
                component_scores = [
                    transform(component(smi)) * weight
                    for component, transform, weight in scoring_profile
                ]
                total_score = aggregate(component_scores)  # arithmetic or geometric mean
                total_score = diversity_filter.penalize(smi, total_score)
                raw_scores.append(total_score)

            logp_prior = prior.log_prob(smiles).detach()
            logp_agent = agent.log_prob(smiles)
            logp_aug = logp_prior + sigma * raw_scores
            batch_loss = mean((logp_aug - logp_agent) ** 2)

            memory_loss = 0.0
            if replay_memory is not None:
                top_smiles = replay_memory.sample_high_scoring()
                memory_loss = dap_loss(top_smiles, prior, agent, sigma, scoring_profile)
                replay_memory.update(smiles, raw_scores)

            loss = batch_loss + memory_loss
            agent.optimizer.zero_grad()
            loss.backward()
            agent.optimizer.step()

            write_epoch_csv(smiles, logp_prior, logp_agent, logp_aug, raw_scores)
            if mean(raw_scores) >= stage.target_score:
                save_checkpoint(agent)
                break
```

##### 序列生成器：把分子看成 token 序列

REINVENT 4 的底层对象是 agent，即一个对 SMILES token 序列建模的神经网络。对 de novo 生成器，长度为 \(\ell\) 的 token 序列 \(T=(t_1,\ldots,t_\ell)\) 的概率写作：

$$
P(T)=\prod_{i=1}^{\ell}P(t_i\mid t_{i-1},t_{i-2},\ldots,t_1)
$$

对有条件生成器，例如给定 scaffold、warheads 或输入分子 \(S\) 的 generator，则学习：

$$
P(T\mid S)=\prod_{i=1}^{\ell}P(t_i\mid t_{i-1},t_{i-2},\ldots,t_1,S)
$$

预训练 prior 时使用 teacher forcing，最小化负对数似然：

$$
NLL(T)=-\log P(T)=-\sum_{i=1}^{\ell}\log P(t_i\mid t_{<i})
$$

这一步的作用不是直接优化项目目标，而是让模型掌握 SMILES 语法和训练集中的药物样分布。之后的 TL 和 RL 都是在这个 prior 的基础上偏置生成分布，而不是从随机策略开始搜索庞大的化学空间。

##### DAP 强化学习目标

REINVENT 4 的核心强化学习策略是 DAP（Difference between Augmented and Posterior）。对每个生成分子，scoring subsystem 给出标量分数 \(S(T)\in[0,1]\)。然后定义增强似然：

$$
\log P_{\text{aug}}(T)=\log P_{\text{prior}}(T)+\sigma S(T)
$$

其中 \(\sigma\ge 0\) 控制 reward 对似然的拉动强度。训练 agent 时最小化：

$$
\mathcal{L}(T)=\left(\log P_{\text{aug}}(T)-\log P_{\text{agent}}(T)\right)^2
$$

直觉上，prior 给每个 SMILES 一个“化学合理性基准”，高分分子的目标似然在这个基准上被抬高，agent 因而学会更频繁地采样它们。固定 prior 的设计很关键：如果只有 reward，模型可能快速坍缩到不可合成、重复或语法边缘的分子；如果只做 TL，模型只能贴近给定小数据集。DAP 在二者之间建立了可调的偏置。

> 💡 关键：DAP 并不是让低分分子显式变得“不可能”，而是主要提高高分分子的相对采样概率；因此多样性过滤器、inception memory 和评分函数设计会显著影响探索行为。

##### Staged learning：把多目标优化拆成课程

药物设计评分函数通常既多目标又昂贵，例如需要同时考虑活性预测、QED、毒性、合成可行性、相似性约束和 docking。REINVENT 4 将 curriculum learning 实现为多 stage 的 RL：每个 stage 可以有自己的 scoring profile、终止阈值、步数、diversity filter 和其他参数。

常见策略是先用便宜规则塑形，例如 custom alerts、Lipinski/QED、分子量、SA score；当 agent 已经稳定生成合理分子后，再逐步加入 QSAR、shape similarity 或 docking。这样做的机制优势是：早期 batch 不会被昂贵 scorer 大量浪费在显然无效的分子上，后期又可以把更接近真实项目目标的评价信号注入同一个 DAP 目标。

每个 stage 会写出包含 SMILES、prior NLL、agent NLL、augmented likelihood、total score 和各组件分数的 CSV。stage 达到最大平均分阈值时进入下一阶段；如果达到最大步数仍不达标，通常意味着该 stage 的评分目标或模型能力需要人工检查。

##### Scoring subsystem 与多目标聚合

REINVENT 4 的 scoring subsystem 把不同来源的模型或规则统一成 endpoint 分数。每个 endpoint 通常先经过一个 transformation，把原始数值映射到 \([0,1]\)，例如 docking 能量越低越好、QED 越高越好、分子量落在窗口内最好。之后用权重聚合为总分：

$$
S_{\text{arith}}(T)=\frac{\sum_k w_k s_k(T)}{\sum_k w_k}
$$

或几何均值：

$$
S_{\text{geom}}(T)=\prod_k s_k(T)^{w_k/\sum_j w_j}
$$

几何均值更像“短板约束”：任一关键分数接近 0 时总分会显著下降；算术均值则允许高分组件补偿低分组件。REINVENT 4 还会对 canonical SMILES 做组件级缓存，避免重复计算昂贵评分。

##### 多样性过滤与 Inception

RL 分子生成很容易出现“同一高分骨架反复被采样”的模式。REINVENT 4 的 diversity filter 用 scaffold bucket 记录已出现的 Bemis-Murcko 或拓扑 scaffold；当某个 bucket 满了，后续同 scaffold 分子会被置零分。它还维护全局 canonical SMILES 记忆，重复分子也会被惩罚。

Inception memory 则是反方向的加速机制：把历史最高分分子加入 loss，让每轮更新不仅学习当前 batch，也复习已发现的好分子。这相当于经验回放，能提高样本效率；但如果 memory 太大或采样太多，训练会被少数历史分子主导，降低探索能力。

##### 与早期分子生成方法的区别

| 维度 | JT-VAE / 图生成模型 | 早期 REINVENT | REINVENT 4 |
|------|--------------------|---------------|------------|
| 分子表示 | 子结构树或图 | 主要是 SMILES RNN | SMILES RNN + Transformer 条件生成器 |
| 优化方式 | latent search 或目标函数搜索 | RL / TL 分散实现 | TL、RL、CL、scoring 统一框架 |
| 任务类型 | de novo 或局部优化为主 | de novo、scaffold/linker 等分散代码 | de novo、R-group、linker、scaffold hopping、Mol2Mol |
| 多目标评分 | 需要单独工程实现 | 支持但扩展成本较高 | 插件式 scoring subsystem + TOML/JSON 配置 |
| 项目流程 | 研究原型居多 | 工业实践工具 | 开源参考实现，面向教育、生产和复现 |

#### 🧪 练习题
```yaml
question: "REINVENT 4 中 DAP 损失的主要作用是什么？"
options:
  - "直接最小化分子坐标的扩散去噪误差"
  - "让 agent 的序列似然靠近由 fixed prior 和评分函数共同定义的增强似然"
  - "用图神经网络预测所有化学键类型"
  - "只通过随机筛选保留最高 QED 分子的 SMILES"
answer: 1
explain: "DAP 定义 logP_aug = logP_prior + sigma*S(T)，再最小化 logP_aug 与 logP_agent 的平方差；fixed prior 提供化学合理性约束，评分函数提供项目目标方向。"
```

### GeoDiff

```yaml
id: geodiff
num: 21
name: GeoDiff
full_name: 几何扩散模型 (GeoDiff)
year: '2022'
org: Stanford University
parent: jt_vae
paper_url: https://arxiv.org/abs/2203.02923
project_url: ''
category: generation
motivation: 首个3D构象生成扩散模型
```

#### 📝 一句话总结
GeoDiff 提出一个面向分子构象生成的几何扩散模型，直接在原子 3D 坐标上学习从噪声到稳定构象的反向 Markov 过程，并用 SE(3) 等变转移核保证生成分布对旋转和平移不敏感。

#### 🎯 核心要点
- **任务定位**：给定 2D 分子图 \(G\)，生成符合 Boltzmann 构象分布的 3D 原子坐标 \(C\)
- **直接坐标建模**：不先预测距离矩阵、键角或扭转角，而是在坐标空间中扩散和去噪
- **热力学扩散直觉**：把原子看作粒子，正向过程逐步加噪破坏构象，反向过程逐步恢复平衡构象
- **不变分布理论**：若初始密度 SE(3) 不变、Markov transition SE(3) 等变，则边缘构象分布天然 SE(3) 不变
- **CoM-free prior**：把坐标移到零质心子空间，在采样和似然中处理平移不变性
- **Graph Field Network (GFN)**：用依赖距离和边类型的不变消息更新节点特征，再用相对方向加权和更新坐标，得到等变噪声场
- **改进训练目标**：从 diffusion ELBO 推出噪声预测损失，并用 alignment 或 chain-rule 构造等变监督信号
- **一阶段采样**：从 CoM-free Gaussian 噪声开始，经反向 Markov kernels 逐步采样 \(C^{T-1},\ldots,C^0\)
- **基准验证**：在 GEOM-QM9 和 GEOM-Drugs 构象生成上用 COV/MAT recall/precision 评估，尤其在大分子上显著优于当时 ML baselines

#### 🔬 深入细节
##### 框架图与可访问来源

![GeoDiff 扩散与反向生成过程](https://ar5iv.labs.arxiv.org/html/2203.02923/assets/x1.png)
*图：GeoDiff Figure 1。正向过程把真实构象逐步扰动为噪声，反向过程从高斯噪声逐步恢复 3D 构象。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2203.02923；ar5iv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2203.02923；官方实现 https://github.com/MinkaiXu/GeoDiff。

##### 算法伪代码

```python
# GeoDiff sampling: conformation generation conditioned on molecular graph G
def geodiff_sample(G, reverse_model, T, alpha, alpha_bar, beta, sigma):
    # Sample initial coordinates from an isotropic Gaussian, then remove CoM.
    C_t = sample_standard_gaussian(shape=(num_atoms(G), 3))
    C_t = C_t - C_t.mean(axis=0, keepdims=True)

    for t in reversed(range(1, T + 1)):
        # Equivariant noise/vector field predicted by Graph Field Network.
        eps_hat = reverse_model.eps_theta(G, C_t, t)
        eps_hat = eps_hat - eps_hat.mean(axis=0, keepdims=True)

        # DDPM-style reverse mean.
        mu = (C_t - beta[t] / sqrt(1 - alpha_bar[t]) * eps_hat) / sqrt(alpha[t])
        mu = mu - mu.mean(axis=0, keepdims=True)

        if t > 1:
            z = sample_standard_gaussian(C_t.shape)
            z = z - z.mean(axis=0, keepdims=True)
            C_t = mu + sigma[t] * z
        else:
            C_t = mu

    return C_t  # generated conformation C^0
```

##### 为什么不能只预测距离或扭转角

分子构象的观测形式是原子坐标，但真实物理性质不依赖整体旋转和平移。早期方法为了规避这个对称性，常把问题改写为预测距离矩阵、键长、键角或 torsion，再通过 distance geometry 或规则流程重建坐标。GeoDiff 指出这类中间变量路线有两个缺陷：训练时模型学习的是间接几何量，采样时还要再解一个坐标重建问题；中间预测误差会在重建过程中累积，距离矩阵甚至可能违反三角不等式。

GeoDiff 的选择是更直接的：在 \(N\times 3\) 坐标矩阵 \(C\) 上做扩散，但让整个反向过程满足几何等变性。这样既避免了中间变量 OOD 问题，又保留了分子构象对刚体变换不敏感的归纳偏置。

##### 正向扩散与反向 Markov 过程

给定真实构象 \(C^0\)，正向过程逐步加入高斯噪声：

$$
q(C^t\mid C^{t-1})=\mathcal{N}\left(C^t;\sqrt{1-\beta_t}C^{t-1},\beta_t I\right)
$$

令 \(\alpha_t=1-\beta_t\)，\(\bar{\alpha}_t=\prod_{s=1}^{t}\alpha_s\)，任意时刻可以直接采样：

$$
q(C^t\mid C^0)=\mathcal{N}\left(C^t;\sqrt{\bar{\alpha}_t}C^0,(1-\bar{\alpha}_t)I\right)
$$

反向生成过程学习：

$$
p_\theta(C^{t-1}\mid G,C^t)=\mathcal{N}\left(C^{t-1};\mu_\theta(G,C^t,t),\sigma_t^2 I\right)
$$

其中 \(\mu_\theta\) 用噪声预测网络 \(\epsilon_\theta\) 参数化：

$$
\mu_\theta(G,C^t,t)=\frac{1}{\sqrt{\alpha_t}}\left(C^t-\frac{\beta_t}{\sqrt{1-\bar{\alpha}_t}}\epsilon_\theta(G,C^t,t)\right)
$$

如果 \(\epsilon_\theta\) 对旋转等变、对平移不变，并且所有坐标都投影到零质心子空间，那么反向 transition 就能保持几何对称性。

##### SE(3) 不变性的构造

GeoDiff 的理论核心可以概括为：从一个 SE(3) 不变的初始密度出发，如果每一步 Markov kernel 都是 SE(3) 等变的，那么任意时刻的边缘密度都是 SE(3) 不变的。分子构象的似然因此不会因为整体旋转或平移而改变。

平移问题通过 CoM-free 系统处理。对坐标矩阵 \(C\)，使用：

$$
\tilde{C}=C-\frac{1}{N}\sum_{i=1}^{N}C_i
$$

即把所有原子坐标移到零质心。旋转问题交给等变网络：如果输入坐标被旋转 \(RC\)，网络输出的噪声场也应变为 \(R\epsilon_\theta(C)\)。这样，反向均值会跟随坐标一起旋转，而不是学习到依赖绝对坐标轴的伪模式。

##### Graph Field Network 的机制

GFN 维护原子特征 \(h_i\) 和坐标 \(x_i\)。一层更新可写为：

$$
m_{ij}=\phi_e\left(h_i,h_j,\|x_i-x_j\|^2,e_{ij},t\right)
$$

$$
h_i'=\phi_h\left(h_i,\sum_{j\in\mathcal{N}(i)}m_{ij}\right)
$$

$$
x_i'=x_i+\sum_{j\in\mathcal{N}(i)}(x_i-x_j)\phi_x(m_{ij})
$$

消息 \(m_{ij}\) 只依赖原子特征、边类型和距离平方，因而对旋转和平移不变；坐标更新由相对方向 \((x_i-x_j)\) 乘以不变标量权重组成，所以整体对旋转等变、对平移不变。邻域 \(\mathcal{N}(i)\) 不只包含化学键，也可包含半径阈值内的非键合原子，从而显式建模长程相互作用。

> 💡 关键：GFN 输出的是“该如何移动每个原子以去噪”的向量场。这个向量场像力场一样指向更稳定的构象区域，但它来自学习到的扩散反向动力学。

##### 训练目标：带几何修正的噪声预测

扩散模型的 ELBO 可以化简为加权噪声回归：

$$
\mathcal{L}_{\text{diff}}=
\mathbb{E}_{t,C^0,\epsilon}
\left[
w_t\left\|\tilde{\epsilon}-\epsilon_\theta(G,C^t,t)\right\|_2^2
\right]
$$

其中 \(C^t=\sqrt{\bar{\alpha}_t}C^0+\sqrt{1-\bar{\alpha}_t}\epsilon\)，\(\tilde{\epsilon}\) 是经过几何处理的监督噪声。普通 DDPM 直接用 \(\epsilon\) 作标签，但 GeoDiff 注意到这个噪声标签本身不一定与 \(C^t\) 等变一致，所以提出两种修正：

- **Alignment approach**：先用 Kabsch alignment 将 \(C^t\) 与 \(C^0\) 对齐，再反推出等变噪声标签
- **Chain-rule approach**：从距离等不变量的 score 出发，通过链式法则得到坐标上的等变噪声向量

这两种训练方式分别对应论文中的 GeoDiff-A 和 GeoDiff-C。实验证据显示 chain-rule 版本通常略优，说明监督信号是否尊重几何对称性会直接影响采样质量。

##### 采样与传统方法对比

采样阶段只需要给定分子图 \(G\)，先从 CoM-free Gaussian 抽取混乱坐标，再迭代应用反向 transition。整个流程没有“先预测距离再求解坐标”的后处理，因此误差不会在中间几何变量和坐标重建之间来回传递。

| 维度 | 距离/角度中间变量方法 | GeoDiff |
|------|----------------------|---------|
| 建模对象 | 距离矩阵、键角、torsion 等 | 原子 3D 坐标 |
| 对称性处理 | 中间变量天然不变 | CoM-free prior + 等变 Markov kernel |
| 训练流程 | 常涉及重建或复杂优化 | 端到端噪声预测 |
| 采样流程 | 预测几何量后求解坐标 | 从噪声直接反向扩散到坐标 |
| 主要风险 | 中间误差累积、无效距离矩阵 | 扩散步数带来采样成本 |

GeoDiff 的意义在于把“3D 构象生成”从工程化几何重建问题转化为一个带物理对称性的概率生成问题，这也是后续等变扩散分子模型的重要起点。

#### 🧪 练习题
```yaml
question: "GeoDiff 为什么要使用 CoM-free Gaussian 和等变 Markov kernels？"
options:
  - "为了减少 SMILES token vocabulary 的大小"
  - "为了让构象生成分布对整体平移和旋转保持不变"
  - "为了把所有分子强制映射到二维平面"
  - "为了跳过正向加噪过程，只训练分类器"
answer: 1
explain: "CoM-free 处理移除平移自由度，等变 transition 保证输入旋转时输出也同步旋转；二者结合使边缘构象密度不依赖绝对坐标系。"
```

### EDM

```yaml
id: edm
num: 22
name: EDM
full_name: 等变扩散模型 (EDM)
year: '2022'
org: University of Amsterdam
parent: geodiff
paper_url: https://arxiv.org/abs/2203.17003
project_url: ''
category: generation
motivation: 原子类型与3D坐标联合等变生成
```

#### 📝 一句话总结
EDM 提出 E(3) Equivariant Diffusion Model，在同一个扩散过程中联合去噪连续 3D 坐标和离散原子特征，用 EGNN 保证欧氏变换等变，从而直接生成带 atom types 的 3D 分子。

#### 🎯 核心要点
- **无条件 3D 分子生成**：不只做给定图的构象生成，而是同时生成原子坐标、原子类型和电荷等节点特征
- **联合 latent 表示**：把每个分子表示为 \(z=(x,h)\)，其中 \(x\) 是 3D 坐标，\(h\) 是 atom type/charge 等特征
- **E(3) 等变扩散**：坐标对旋转、反射和平移等变，节点特征保持不变，生成似然不依赖绝对坐标系
- **零重心坐标子空间**：坐标噪声定义在 center-of-gravity 为 0 的线性子空间，解决平移不变分布无法归一化的问题
- **EGNN 去噪网络**：用全连接图上的 E(n) Equivariant Graph Neural Network 预测坐标和特征噪声
- **连续-离散统一训练**：连续坐标使用高斯扩散，类别特征使用 one-hot 加高斯扰动，并在 zeroth likelihood term 中还原为类别概率
- **显式 likelihood 分析**：给出坐标与离散特征共同存在时的 variational lower bound 和 likelihood 计算方式
- **可条件生成**：将目标性质 \(y\) 拼接到节点特征中，可生成满足指定量子化学性质的分子
- **实验优势**：在 QM9 上相较 E-NF 和 G-Schnet 获得更高 molecule stability，并能扩展到 GEOM-Drugs

#### 🔬 深入细节
##### 框架图与可访问来源

![EDM 旋转等变生成分布示意](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x1.png)
*图：EDM Figure 1。旋转输入分子只会旋转坐标部分，原子类型特征保持不变，模型似然保持一致。*

![EDM 扩散与去噪流程](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x2.png)
*图：EDM Figure 2。从标准高斯噪声开始，逐步去噪得到 3D 坐标和原子特征。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2203.17003；PMLR 论文页 https://proceedings.mlr.press/v162/hoogeboom22a.html；ar5iv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2203.17003；官方实现 https://github.com/ehoogeboom/e3_diffusion_for_molecules。

##### 算法伪代码

```python
# EDM training and sampling for 3D molecule generation
def train_edm_step(molecule, edm, noise_schedule):
    x, h = molecule.coordinates, molecule.node_features  # h: atom type/charge
    x = x - x.mean(axis=0, keepdims=True)                # zero center of gravity
    z0 = concat(x, h)

    t = sample_uniform_time()
    alpha_t, sigma_t = noise_schedule(t)

    eps_x = sample_gaussian_like(x)
    eps_x = eps_x - eps_x.mean(axis=0, keepdims=True)
    eps_h = sample_gaussian_like(h)
    eps = concat(eps_x, eps_h)

    z_t = alpha_t * z0 + sigma_t * eps
    eps_hat = edm.egnn_dynamics(z_t, t)
    eps_hat.x = eps_hat.x - eps_hat.x.mean(axis=0, keepdims=True)

    loss = mean_squared_error(eps_hat, eps)
    loss.backward()
    optimizer.step()

def sample_edm(edm, n_atoms, T, noise_schedule):
    x_T = sample_gaussian(shape=(n_atoms, 3))
    x_T = x_T - x_T.mean(axis=0, keepdims=True)
    h_T = sample_gaussian(shape=(n_atoms, num_features))
    z_t = concat(x_T, h_T)

    for t in reversed(range(1, T + 1)):
        eps_hat = edm.egnn_dynamics(z_t, t)
        x0_hat, h0_hat = predict_clean_data(z_t, eps_hat, noise_schedule[t])
        z_t = sample_posterior(z_t, x0_hat, h0_hat, t)
        z_t.x = z_t.x - z_t.x.mean(axis=0, keepdims=True)

    atom_types = decode_categorical_features(z_t.h)
    coordinates = z_t.x
    return build_molecule(atom_types, coordinates)
```

##### 从构象生成到完整 3D 分子生成

GeoDiff 这类模型通常以分子图为条件，目标是为已有 2D graph 生成合理构象。EDM 的问题更进一步：分子图、原子类型和坐标都要生成。模型先从训练集的分子大小分布中采样原子数 \(N\)，再对 \(N\) 个点联合生成坐标 \(x\in\mathbb{R}^{N\times 3}\) 和节点特征 \(h\)。

这种设定要求模型同时满足两类约束：几何上，分子整体旋转、反射或平移不应改变概率；化学上，生成的 atom types 和距离应能推导出合理价态与键结构。EDM 的核心贡献就是把连续坐标和离散特征放入同一个扩散框架，并保持 E(3) 对称性。

##### 联合扩散过程

令 \(z=[x,h]\)。正向扩散把真实分子 \(z_0\) 扰动为 \(z_t\)：

$$
q(z_t\mid z_0)=\mathcal{N}(z_t;\alpha_t z_0,\sigma_t^2 I)
$$

坐标部分使用零重心子空间中的高斯分布：

$$
\sum_{i=1}^{N}x_i=0
$$

特征部分是普通高斯扰动。对 categorical atom type，EDM 不把类别当作任意整数，而是使用 one-hot 表示再加噪，这避免了“类别 1 比类别 4 更近”这种人为顺序偏置。

反向过程用神经网络预测噪声 \(\epsilon_\theta(z_t,t)\)，再得到干净样本估计：

$$
\hat{z}_0=\frac{z_t-\sigma_t\epsilon_\theta(z_t,t)}{\alpha_t}
$$

生成 transition 使用真实 posterior \(q(z_{t-1}\mid z_t,z_0)\) 的形式，只是把未知 \(z_0\) 替换成 \(\hat{z}_0\)：

$$
p_\theta(z_{t-1}\mid z_t)=q(z_{t-1}\mid z_t,\hat{z}_0)
$$

训练时常用简化噪声预测目标：

$$
\mathcal{L}_t=
\mathbb{E}_{z_0,\epsilon,t}
\left[
\left\|\epsilon-\epsilon_\theta(z_t,t)\right\|_2^2
\right]
$$

论文还给出带 SNR 权重的 variational objective，用于 likelihood 计算；实践中使用未加权 L2 目标有更好的样本质量。

##### EGNN dynamics 如何保证等变

EDM 的去噪网络基于 EGNN。对第 \(\ell\) 层，节点 \(i,j\) 的消息可写成：

$$
m_{ij}=\phi_e\left(h_i^\ell,h_j^\ell,\|x_i^\ell-x_j^\ell\|^2,a_{ij}\right)
$$

坐标更新为相对方向的加权和：

$$
x_i^{\ell+1}=x_i^\ell+\sum_{j\ne i}
\frac{x_i^\ell-x_j^\ell}{\|x_i^\ell-x_j^\ell\|+1}\phi_x(m_{ij})
$$

节点特征更新为：

$$
h_i^{\ell+1}=\phi_h\left(h_i^\ell,\sum_{j\ne i}m_{ij}\right)
$$

距离平方和节点特征不随旋转或平移改变，因此 \(m_{ij}\) 是不变量；坐标更新只由相对向量线性组合构成，因此输入坐标旋转时输出坐标也同样旋转。EDM 还把时间 \(t\) 拼接到节点特征，使同一 EGNN 能在不同噪声强度下预测对应去噪方向。

> 💡 关键：EDM 不是在固定体素网格上生成分子，也不需要给原子指定自回归顺序；它把分子作为无序点云处理，用等变网络承担几何归纳偏置。

##### 离散特征的 zeroth likelihood term

普通扩散模型常处理连续或有自然顺序的像素值。原子类型是 categorical，不能简单用整数距离衡量。EDM 对 atom type 使用 one-hot \(h\)，在接近 \(t=0\) 时计算每个类别对应 one-hot 区间的高斯积分，并归一化为类别概率：

$$
p(h_i=k\mid z_0)\propto
\int_{-1/2}^{1/2}
\mathcal{N}\left(u;\hat{h}_{0,i,k}-1,\sigma_0^2\right)du
\prod_{r\ne k}
\int_{-1/2}^{1/2}
\mathcal{N}\left(u;\hat{h}_{0,i,r},\sigma_0^2\right)du
$$

这个处理让“离散类别最终要落回 one-hot 顶点”成为 likelihood 的一部分，而不是只在采样后硬性 argmax。坐标部分则保留连续密度，并加入零重心子空间的归一化修正。

##### 条件生成与性质控制

EDM 可以扩展到条件生成。给定目标性质 \(y\)，训练目标变为：

$$
\mathcal{L}_{\text{cond}}=
\mathbb{E}\left[
\left\|\epsilon-\epsilon_\theta(z_t,t,y)\right\|_2^2
\right]
$$

实现上只需把 \(y\) 拼接到每个节点的输入特征。采样时先选择原子数和目标性质，再运行同样的反向扩散。论文在 QM9 上用 polarizability、HOMO、LUMO、gap、dipole 等性质验证，生成样本的目标性质误差优于与性质无关的 baseline。

##### 与 GeoDiff 和 normalizing flow 的区别

| 维度 | GeoDiff | E-NF / 等变 flow | EDM |
|------|---------|------------------|-----|
| 任务 | 给定分子图生成构象 | 3D 分子生成/密度建模 | 联合生成 atom features 与 3D 坐标 |
| 生成对象 | 坐标 \(C\) | 连续变量 | \(z=(x,h)\)，含坐标与类别特征 |
| 对称性 | SE(3) 等变 kernel | 等变可逆动力学 | E(3) 等变 denoising network |
| 训练成本 | 扩散噪声预测 | 需积分 ODE/flow likelihood | DDPM 式训练，较 flow 更易扩展 |
| 离散原子类型 | 通常由条件图给定 | 处理不自然 | one-hot 加噪 + categorical likelihood |

EDM 的关键影响是证明 3D 分子生成不必拆成“先生成图，再生成构象”两个模型；坐标和化学身份可以在一个等变扩散过程中共同出现。后续 GeoLDM、DiffDock、分子/材料等变扩散模型都沿用了这种“几何对称性 + diffusion”的设计路线。

#### 🧪 练习题
```yaml
question: "EDM 相比只做构象生成的 GeoDiff，最核心的扩展是什么？"
options:
  - "把分子固定到二维网格上生成"
  - "在同一扩散过程中联合生成 3D 坐标和原子类型等节点特征"
  - "完全取消神经网络，只使用 RDKit 力场优化"
  - "只预测分子的 SMILES 字符串，不处理坐标"
answer: 1
explain: "EDM 的 latent 是 z=(x,h)，其中 x 是连续 3D 坐标，h 是 atom type/charge 等特征；EGNN 去噪网络同时预测两部分噪声并保持 E(3) 等变。"
```

### CoCoGraph

```yaml
id: cocograph
num: 23
name: CoCoGraph
full_name: 约束协作图扩散 (CoCoGraph)
year: '2026.05'
org: Universitat Rovira i Virgili
parent: edm
paper_url: https://www.thebrighterside.news/post/new-ai-tool-can-generate-millions-of-new-molecules
project_url: ''
category: generation
motivation: 学习硬性规则，生成820万高真实感新分子
```

#### 📝 一句话总结
CoCoGraph 提出一种协作式约束离散图扩散模型，用双边交换在生成过程中严格保持分子式和每个原子的价态，从而解决许多分子生成模型需要事后过滤非法结构的问题。它用扩散模型预测要反转的边交换，用时间模型估计当前图离真实分子的距离，生成 820 万个高新颖性且化学有效的候选分子。

#### 🎯 核心要点
- 扩散状态是分子图而非连续 3D 点云；每一步只执行 double edge swap，固定原子集合、分子式、键数和每个原子的度数/价态
- 噪声过程把真实分子逐步随机化到固定度序列上的 Molloy-Reed 最大熵图分布，避免进入违反价态的图空间
- 扩散模型输入当前图和时间信息，输出所有可行双边交换的打分，学习反转噪声过程中的成键/断键选择
- 时间模型输入当前分子图并预测归一化扩散时间，替代固定时间表，修正不同分子随机化速度不一致的问题
- 采样时两个模型协作：时间模型给扩散模型提供实际进度，并在整条去噪轨迹中选择预测时间最小的分子作为输出
- BASE 模型约 53.4 万参数，FPS 变体引入 2048 维 Morgan 指纹，仍显著小于 DiGress 和 JTVAE 等基线
- 评估包含 GuacaMol、36 项理化性质分布、新颖性/冗余度和有机化学专家 Turing-like 测试
- worker 给出的链接是新闻页；可追溯方法来源为 arXiv:2505.16365 / Nature Machine Intelligence 论文 "A collaborative constrained graph diffusion model for the generation of realistic synthetic molecules"

#### 🔬 深入细节
![CoCoGraph 框架示意图](https://arxiv.org/html/2505.16365v1/x1.png)
*图：CoCoGraph 的约束扩散、扩散模型、时间模型和协作采样流程。噪声通过交换两条化学键产生，去噪时由扩散模型和时间模型共同决定下一步图结构。*

##### 算法伪代码

```python
# CoCoGraph: constrained collaborative graph diffusion
def double_edge_swap(G):
    # Choose two existing bonds AB and CD, then reconnect them
    (A, B), (C, D) = sample_disjoint_edges(G)
    if can_form(G, A, C) and can_form(G, B, D):
        G.remove_edges([(A, B), (C, D)])
        G.add_edges([(A, C), (B, D)])
    return G

def train_cocograph(real_molecules, T):
    for G0 in real_molecules:
        G = G0.copy()
        trajectory = [G0]
        for t in range(1, T + 1):
            G = double_edge_swap(G)
            trajectory.append(G)

        for t, Gt in enumerate(trajectory[1:], start=1):
            target_swap = inverse_swap(trajectory[t - 1], Gt)
            p_break, p_form = diffusion_model(Gt, t / T)
            loss_des = binary_cross_entropy(p_break, target_swap.break_edges)
            loss_form = binary_cross_entropy(p_form, target_swap.form_edges)

            t_hat = time_model(Gt)
            loss_time = (t_hat - t / T) ** 2
            update(loss_des + loss_form + loss_time)

def sample_cocograph(formula, degree_sequence, steps):
    G = random_graph_with_fixed_degree_sequence(formula, degree_sequence)
    best_G, best_time = G, float("inf")
    for _ in range(steps):
        tau = time_model(G)
        candidate_swaps = enumerate_valid_double_edge_swaps(G)
        scores = diffusion_model(G, tau)
        G = apply_high_score_swap(G, candidate_swaps, scores)
        if tau < best_time:
            best_G, best_time = G.copy(), tau
    return best_G
```

##### 关键公式

CoCoGraph 的基本约束可以写成图扩散状态空间约束。设分子图为 \(G_t=(V,E_t,X)\)，其中 \(V\) 是固定原子集合，\(X\) 是原子类型。双边交换满足：

$$
E_{t+1}=E_t\setminus\{(A,B),(C,D)\}\cup\{(A,C),(B,D)\}
$$

因此每个节点的度数保持不变：

$$
\deg_{G_{t+1}}(v)=\deg_{G_t}(v),\quad \forall v\in V
$$

这相当于把生成空间限制在固定分子式和固定价态序列的图集合：

$$
\mathcal{G}(\mathbf{x}, \mathbf{d})
=\{G=(V,E,X): X=\mathbf{x},\ \deg_G(v_i)=d_i\}
$$

扩散模型学习反向转移 \(T_\theta^{-1}:G_t\rightarrow G_{t-1}\)。论文把双边交换拆成要断开的边和要形成的边，使用二元交叉熵训练：

$$
\mathcal{L}_{\mathrm{DES}}
=-\sum_{e}\left[y_e\log p_\theta(e\mid G_t,\hat t)
+(1-y_e)\log(1-p_\theta(e\mid G_t,\hat t))\right]
$$

时间模型学习当前图的归一化扩散进度：

$$
\mathcal{L}_{\mathrm{time}}
=\left\|f_\phi(G_t)-\frac{t}{T}\right\|_2^2
$$

##### 方法机制解释

传统图扩散或序列生成模型通常先在较大的候选空间里采样，再用 RDKit 或价态规则过滤非法分子。CoCoGraph 反过来把硬约束放进扩散过程本身：如果每一步只做保持节点度数的双边交换，那么原子数、分子式、键数和每个原子的价态从头到尾都不会改变。模型不需要“学会”碳四价、氮三价等基础规则，学习容量可以集中在真实分子图中哪些连接模式更合理。

双边交换也解释了为什么 CoCoGraph 与 EDM/GeoDiff 类 3D 扩散不同。EDM 关注原子类型和三维坐标的等变生成，化学有效性通常需要由数据和后处理共同保证；CoCoGraph 只在 2D 分子图上进行离散结构变换，并且每一步都是合法图操作。这个设计牺牲了“从零决定分子式”的自由度，但换来了从采样过程开始就不会产生价态非法结构。

协作机制来自一个实用观察：不同分子被随机化的速度不同，即使按分子大小缩放步数，实际噪声程度也不一定等于名义时间 \(t/T\)。如果扩散模型只看固定时间表，它可能在“已经很乱”或“还很像真实分子”的图上做错强度。时间模型 \(f_\phi(G_t)\) 估计当前图离真实分子有多远，采样时把这个估计喂给扩散模型，相当于用数据驱动的进度条替代手写 schedule。

采样阶段并不是简单输出最后一步。CoCoGraph 从符合给定分子式和度序列的随机图开始，逐步执行扩散模型推荐的反向双边交换；同时记录时间模型预测的进度，最后选择整条轨迹中预测时间最小的图。直觉上，预测时间越接近 0，图越像训练分布中的真实分子。

论文报告 CoCoGraph 在 GuacaMol 标准基准上达到 100% 化学有效性，并生成 820 万个合成分子；其中可用公开摘要追溯到 7.1% 冗余度和 98.5% 新颖性。专家测试中，有机化学背景参与者识别真实分子的准确率接近随机猜测，说明这些生成结构在局部化学规则和整体理化性质分布上都比较接近已知分子。

> ⚠️ 来源限制：任务元信息中的 `paper_url` 是新闻报道；方法细节以上述可访问 arXiv HTML 论文为主。新闻中的 2026.05 与 arXiv 预印本日期存在差异，本文保留 YAML 元信息不改。

#### 🧪 练习题
```yaml
question: "CoCoGraph 为什么能在生成过程中保证分子的价态约束？"
options:
  - "因为它先生成任意图，再删除所有非法分子"
  - "因为每一步只执行保持节点度数不变的双边交换"
  - "因为它只生成训练集中已经出现过的分子"
  - "因为它把所有键都限制为单键"
answer: 1
explain: "双边交换删除两条旧边并添加两条新边，使每个原子的度数保持不变；若初始图满足价态约束，整个扩散和去噪轨迹也保持该约束。"
```

### PropMolFlow

```yaml
id: propmolflow
num: 24
name: PropMolFlow
full_name: 物理启发多尺度流模型 (PropMolFlow)
year: '2026.04'
org: MIT
parent: edm
paper_url: https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/
project_url: ''
category: generation
motivation: 10倍速度提升，符合DFT物理约束
```

#### 📝 一句话总结
PropMolFlow 提出面向属性条件分子设计的 geometry-complete SE(3)-等变流匹配框架，把目标性质嵌入、原子类型、键阶、电荷和 3D 坐标放在同一个联合生成过程中学习。它解决了扩散模型属性引导采样慢、连续化离散化学特征不可靠和评估过度依赖代理回归器的问题，并用 DFT 验证生成分子的真实性质。

#### 🎯 核心要点
- 基于 FlowMol 风格的 geometry-complete flow matching，同时生成原子类型、键阶、电荷和三维坐标，而不是只生成点云
- 主干为 SE(3)-等变 GVP/GNN，能保留手性相关的旋转等变结构，比 E(3) 点云模型更适合区分手性分子
- 属性条件 \(k\) 先经过可选 Gaussian expansion，再经 MLP 得到属性嵌入 \(P=\phi_{\mathrm{prop}}(k)\)
- 研究五种属性嵌入交互方式：concatenate、sum、multiply、concatenate+sum、concatenate+multiply
- 训练和评估使用修正后的 QM9 SDF，修复大量键阶、电荷和闭壳层价电子配置不一致问题
- 条件属性覆盖 \(\alpha\)、HOMO-LUMO gap、HOMO、LUMO、\(\mu\)、\(C_v\) 六类 QM9 DFT 性质
- 推理用 Euler ODE 积分约 100 步，相比多步扩散采样显著更快；官方仓库也暴露 `n_timesteps` 控制采样步数
- 引入 DFT 复核、closed-shell ratio、修订后的 atomic/molecular stability，指出仅靠代理回归器和旧稳定性指标会高估生成质量
- worker 给出的链接实际指向 Reactome/HiTEA 新闻；可追溯论文为 arXiv:2505.21469 和 Nature Computational Science 2026，作者机构以 University of Florida / NYU 等为主，并非 YAML 中的 MIT

#### 🔬 深入细节
![PropMolFlow 方法总览](https://arxiv.org/html/2505.21469v3/x1.png)
*图：PropMolFlow 的属性嵌入、联合流匹配和五种属性-图交互方式。分子图包含节点标量特征、三维坐标和边/键特征；属性条件通过 Gaussian expansion 与 MLP 进入生成主干。*

##### 算法伪代码

```python
# PropMolFlow: property-guided geometry-complete flow matching
def property_embedding(k, use_gaussian=True):
    if use_gaussian:
        z = [exp(-((k - c_m) ** 2) / (2 * sigma ** 2)) for c_m in centers]
    else:
        z = normalize(k)
    return mlp_prop(z)

def train_propmolflow(qm9_molecules):
    for mol in qm9_molecules:
        G1 = encode_geometry_complete_graph(
            atom_types=mol.atom_types,
            charges=mol.charges,
            bond_orders=mol.bond_orders,
            positions=mol.positions,
        )
        k = mol.target_property
        P = property_embedding(k)

        G0 = sample_base_graph_like(G1)      # base distribution over modalities
        t = uniform(0.0, 1.0)
        Gt = interpolate_multimodal(G0, G1, t)

        pred = se3_gvp_denoiser(Gt, t, P)
        loss_pos = mse(pred.positions, G1.positions)
        loss_atom = cross_entropy(pred.atom_types, G1.atom_types)
        loss_charge = cross_entropy(pred.charges, G1.charges)
        loss_bond = cross_entropy(pred.bond_orders, G1.bond_orders)
        update(weighted_sum(loss_pos, loss_atom, loss_charge, loss_bond))

def sample_propmolflow(target_property, n_steps=100):
    P = property_embedding(target_property)
    G = sample_base_graph_with_atom_count()
    for t in linspace(0.0, 1.0, n_steps):
        dG = se3_gvp_velocity_or_denoiser(G, t, P)
        G = euler_update_joint_modalities(G, dG)
    return decode_valid_molecule(G)
```

##### 关键公式

属性值 \(k\) 的 Gaussian expansion 将一个标量映射成多个基函数响应：

$$
\gamma_m(k)=\exp\left(-\frac{(k-c_m)^2}{2\sigma^2}\right),\quad
P=\phi_{\mathrm{prop}}(\gamma_1(k),\ldots,\gamma_M(k))
$$

随后 \(P\) 与节点标量特征 \(h_i\) 交互，例如：

$$
h_i'=\varphi_\theta([h_i, P]),\quad
h_i'=h_i+P,\quad
h_i'=h_i\odot P
$$

流匹配的连续部分可写成从基分布 \(x_0\) 到真实分子坐标 \(x_1\) 的概率路径，并学习速度场：

$$
\frac{d x_t}{dt}=v_\theta(x_t,t,P),\quad x_{t=0}\sim p_0,\quad x_{t=1}\sim p_{\mathrm{data}}
$$

端点式训练也可理解为让网络从中间状态预测最终状态：

$$
\mathcal{L}_{\mathrm{pos}}
=\mathbb{E}_{t,x_0,x_1,k}\left\|\hat x_1^\theta(x_t,t,P)-x_1\right\|_2^2
$$

离散模态如原子类型、键阶和电荷使用连续时间 Markov 链/离散流匹配对应的交叉熵：

$$
\mathcal{L}_{\mathrm{disc}}
=-\mathbb{E}\sum_{m\in\{\mathrm{atom,bond,charge}\}}
\log p_\theta(z_1^{(m)}\mid z_t,t,P)
$$

总损失是多模态加权和：

$$
\mathcal{L}
=\lambda_x\mathcal{L}_{\mathrm{pos}}
+\lambda_a\mathcal{L}_{\mathrm{atom}}
+\lambda_b\mathcal{L}_{\mathrm{bond}}
+\lambda_c\mathcal{L}_{\mathrm{charge}}
$$

##### 方法机制解释

PropMolFlow 的核心动机不是单纯“让分子更像 QM9”，而是让生成模型能按目标物理化学属性定向采样。早期 EDM/GeoDiff/EquiFM 一类模型证明了 3D 等变生成很有效，但属性条件通常只是把一个标量拼到节点特征上；同时，许多模型把原子类型和键阶当连续变量处理，最后再离散化，容易产生价态、电荷或闭壳层不一致的问题。

geometry-complete 表示解决的是“生成对象不完整”的问题。一个可用分子不仅需要坐标，还需要原子类型、键阶和电荷；对于药物设计或量化性质预测，键阶和电荷错误会直接改变电子结构。PropMolFlow 把这些模态放进同一个流匹配过程中联合去噪，因此模型可以在坐标调整、键阶选择和电荷配置之间共享信息。

属性嵌入模块解决的是条件信号太弱的问题。标量 \(k\) 直接拼接到每个节点上时，模型只看到一个线性尺度上的数；Gaussian expansion 则把目标值变成一组局部基函数响应，让模型更容易区分“接近训练分布中心的目标”和“边界或低密度区域的目标”。论文系统比较不同属性和任务中 Gaussian expansion 是否有帮助，而不是假设一种条件注入方式对所有属性都最优。

流匹配带来的速度优势来自推理路径更短。扩散模型通常需要很多噪声步逐步反演，而 PropMolFlow 在推理时用 ODE 积分学习到的速度场，论文和官方仓库均展示用约 100 个 Euler 步即可采样。对于属性搜索任务，这一点很重要，因为研究者通常要批量生成数千到上万个候选分子，再用代理模型、DFT 或实验继续筛选。

论文特别强调评估不能只看代理 GVP 回归器。生成分子可能没有完全弛豫，代理回归器在训练分布外可能给出过乐观结果；因此作者对 10,773 个生成分子做 DFT 复核，并提出 closed-shell ratio 与修订稳定性指标，过滤 open-shell 或价态-电荷不一致结构。这个评估设计与 YAML 中“符合 DFT 物理约束”的动机相吻合，但它更准确地说是“用 DFT 验证和修订指标约束评估”，而非模型内部显式求解 DFT。

> ⚠️ 来源限制：任务给出的 Earth.com 链接对应的是另一项 Cambridge/Pfizer Reactome/HiTEA 新闻；PropMolFlow 的可访问论文与官方仓库均指向 arXiv:2505.21469、Nature Computational Science DOI 10.1038/s43588-025-00946-y 和 GitHub `Liu-Group-UF/PropMolFlow`。本文保留 YAML 元信息不改，但方法解读以这些可追溯来源为准。

#### 🧪 练习题
```yaml
question: "PropMolFlow 中 Gaussian expansion 的主要作用是什么？"
options:
  - "把 3D 坐标投影成 2D 分子图"
  - "把目标属性标量变成更丰富的局部基函数表示，便于与节点特征交互"
  - "在采样后用规则删除所有非法价态"
  - "完全替代 SE(3)-等变 GNN 主干"
answer: 1
explain: "Gaussian expansion 将目标属性映射到多个基函数响应，再经 MLP 得到属性嵌入，使条件信号比直接拼接单个标量更可表达。"
```

### TrajCast

```yaml
id: trajcast
num: 25
name: TrajCast
full_name: 无力分子动力学 (TrajCast)
year: '2026.03'
org: University of Cambridge
parent: edm
paper_url: https://www.nature.com/articles/s42256-026-00000-0
project_url: ''
category: generation
motivation: 等变MPNN自回归预测，无需计算原子力
```

#### 📝 一句话总结
TrajCast 提出一种 force-free 分子动力学生成框架，用自回归等变 MPNN 直接从当前原子位置和速度预测下一时刻位置与速度，绕过传统 MD 中“预测力再用小步长积分”的瓶颈。它在小分子、晶体和液态水等体系上用 10× 到 30× 更大的预测间隔生成轨迹，并保持结构、动力学和能量统计的一致性。

#### 🎯 核心要点
- 状态定义为 \(\mathbf{x}(t)=\{Z_i,\mathbf{r}_i(t),\mathbf{v}_i(t)\}_{i=1}^N\)，模型直接输出 \(\Delta\mathbf{r}_i\) 与 \(\mathbf{v}_i'\)
- 不预测势能或原子力，也不依赖 Velocity-Verlet 等小步长数值积分；预测间隔 \(\Delta t\) 可远大于传统 MD 步长 \(\delta t\)
- 主干为 e3nn 风格等变 MPNN，使用标量、向量和高阶张量特征，包含 4 个 message passing 层
- 节点/边嵌入包括化学元素、相对位置、速度方向、速度大小的 Gaussian basis，以及径向基和球谐展开
- 输出后施加约束修正，保持总线性动量和总角动量；NVT 推理中接入类似 CSVR 的速度重标定 thermostat
- 自回归 rollout 将上一预测状态作为下一输入，保留轨迹的 Markov 结构，可计算时间相关性质
- 参考数据来自 LAMMPS 经典 MD，覆盖 paracetamol、quartz、liquid water，并测试大体系迁移和低温玻璃化等分布外场景
- Nature Machine Intelligence 版本报道 TrajCast 可使用 10× 到 30× 更大时间步，在 4,000+ 原子石英体系上每天生成超过 15 ns 轨迹
- worker 给出的 Nature URL 含占位符；可访问正式论文 URL 为 https://www.nature.com/articles/s42256-026-01227-7，预印本为 arXiv:2503.23794

#### 🔬 深入细节
![TrajCast 架构示意图](https://arxiv.org/html/2503.23794v1/extracted/6321508/figures/fig1.png)
*图：TrajCast 的自回归工作流、节点/边嵌入、消息构造、更新模块和动量约束。模型直接预测下一时刻的位移与速度，并把输出继续滚动成完整轨迹。*

##### 算法伪代码

```python
# TrajCast: force-free autoregressive molecular dynamics
def train_trajcast(reference_trajectories, horizon):
    for traj in reference_trajectories:
        for state_t, state_next in pairs_with_gap(traj, horizon):
            Z, r_t, v_t = state_t.Z, state_t.positions, state_t.velocities
            target_dr = state_next.positions - r_t
            target_v = state_next.velocities

            h = embed_nodes_and_edges(Z, r_t, v_t)
            h = equivariant_message_passing(h, r_t, v_t, layers=4)
            pred_dr, pred_v = readout_displacement_velocity(h)
            pred_dr, pred_v = conserve_linear_angular_momentum(
                pred_dr, pred_v, masses=state_t.masses
            )

            loss = mae(pred_dr, target_dr) + mae(pred_v, target_v)
            update(loss)

def rollout_trajcast(initial_state, n_steps, thermostat=None):
    state = initial_state
    trajectory = [state]
    for _ in range(n_steps):
        dr, v_next = trajcast_model(state)
        r_next = state.positions + dr
        if thermostat is not None:
            v_next = thermostat.rescale(v_next, target_temperature=thermostat.T)
        state = State(state.Z, r_next, v_next)
        trajectory.append(state)
    return trajectory
```

##### 关键公式

传统 MD 通常先由势能 \(U(\mathbf{r})\) 计算力，再用小步长积分：

$$
\mathbf{F}_i(t)=-\nabla_{\mathbf{r}_i}U(\mathbf{r}(t)),\quad
(\mathbf{r}_{t+\delta t},\mathbf{v}_{t+\delta t})
=\mathrm{Integrator}(\mathbf{r}_t,\mathbf{v}_t,\mathbf{F}_t,\delta t)
$$

TrajCast 直接学习大步长状态转移：

$$
(\Delta\hat{\mathbf{r}}_i,\hat{\mathbf{v}}_i')
=f_\theta\left(\{Z_j,\mathbf{r}_j(t),\mathbf{v}_j(t)\}_{j=1}^N\right),\quad
\hat{\mathbf{r}}_i(t+\Delta t)=\mathbf{r}_i(t)+\Delta\hat{\mathbf{r}}_i
$$

其中 \(\Delta t\gg\delta t\)，论文实验中可达到传统 MD 时间步的 \(10\times\) 到 \(30\times\)。训练目标可写成位移与速度误差：

$$
\mathcal{L}(\theta)=
\frac{1}{N}\sum_i
\left(
\left\|\Delta\hat{\mathbf{r}}_i-\Delta\mathbf{r}_i^\star\right\|_1
+\beta\left\|\hat{\mathbf{v}}_i'-\mathbf{v}_i^\star\right\|_1
\right)
$$

为了避免 rollout 中整体漂移，输出会被投影/修正到守恒约束附近：

$$
\sum_i m_i\hat{\mathbf{v}}_i'=\mathbf{P}_0,\quad
\sum_i m_i\hat{\mathbf{r}}_i'\times \hat{\mathbf{v}}_i'=\mathbf{L}_0
$$

在 NVT 采样中，速度可按 thermostat 缩放以匹配目标温度：

$$
K=\frac{1}{2}\sum_i m_i\|\mathbf{v}_i\|^2,\quad
T_{\mathrm{inst}}=\frac{2K}{k_B N_{\mathrm{dof}}}
$$

##### 方法机制解释

机器学习势函数 MLIP 的常见路线是学习 \(U_\theta(\mathbf{r})\) 或 \(\mathbf{F}_\theta(\mathbf{r})\)，然后仍然用传统积分器推进轨迹。这样能降低单步力计算成本，但时间步长仍受数值稳定性和高频振动限制，尤其含氢体系常需要 0.5 到 1 fs 级别步长。TrajCast 的关键变化是学习“状态到状态”的转移核，而不是学习力场。

输入速度是 TrajCast 与很多结构生成模型的关键差异。只看位置时，系统可能处在同一构型但沿不同方向运动；加入 \(\mathbf{v}(t)\) 后，模型能区分即将靠近、远离或振动反相的局部环境。论文的消息更新中还把聚合消息与速度方向的球谐嵌入做张量积，使速度不仅作为标量附加信息，而是以等变向量形式参与状态更新。

输出相对位移而非绝对坐标，使模型对模拟盒整体平移更稳健；输出速度则保留动力学信息，使 rollout 轨迹可以继续计算扩散系数、径向分布函数、振动态密度等时间相关或统计性质。与一次性生成多个构象不同，TrajCast 生成的是连续轨迹，因此误差累积和物理守恒是核心风险。

为控制误差累积，TrajCast 在读出后加入线性动量和角动量约束修正；在需要 NVT ensemble 时，还用类似 CSVR thermostat 的速度重标定维持目标温度。这些模块不等同于重新引入力计算，而是在模型预测的状态转移上做物理一致性投影和采样控制。

论文用 paracetamol、quartz 和 liquid water 展示从孤立小分子到凝聚相体系的泛化，并报告用少于 1 ns、实际为数百 ps 级轨迹即可训练出有效模型。正式 Nature Machine Intelligence 版本还展示零样本访问训练数据之外的相空间区域，例如低温水的非平衡/亚稳态行为。当前限制也很明确：由于不计算力，压力等依赖力的性质不能直接得到，NpT ensemble 还需要额外机制或与力场耦合。

> ⚠️ 来源限制：任务中的 Nature 链接 `s42256-026-00000-0` 是占位式 URL，无法作为正式论文页使用；本文依据可访问的 arXiv HTML 和 Nature Machine Intelligence 正式页 `s42256-026-01227-7` 撰写。YAML 元信息按任务要求保留不改。

#### 🧪 练习题
```yaml
question: "TrajCast 与典型机器学习势函数 MD 的主要区别是什么？"
options:
  - "TrajCast 仍先预测原子力，再用更小的积分步长推进"
  - "TrajCast 直接预测下一状态的位置增量和速度，不显式计算力"
  - "TrajCast 只生成静态分子构象，不生成时间轨迹"
  - "TrajCast 完全不使用速度信息"
answer: 1
explain: "TrajCast 学习从当前位置、速度和原子类型到下一状态的自回归映射，绕过力计算和小步长数值积分，因此可以使用更大的预测间隔生成轨迹。"
```

### OC20

```yaml
id: oc20
num: 26
name: OC20
full_name: 开放催化剂项目 (Open Catalyst 2020)
year: '2020'
org: Meta AI / CMU
parent: —
paper_url: https://ai.meta.com/blog/open-catalyst-project-accelerating-renewable-energy-storage-with-ai/
project_url: ''
category: catalyst
motivation: 128万弛豫+2.65亿DFT点，催化剂AI基石
```

#### 📝 一句话总结
OC20 提出面向吸附物-催化剂表面体系的大规模 DFT 数据集、生成流程和三项基准任务，把催化剂筛选中的结构弛豫、能量和力预测问题标准化为可训练、可比较的图神经网络挑战。

#### 🎯 核心要点
- **数据规模奠基**：包含约 1,281,040 条 DFT 结构弛豫轨迹和约 2.65 亿个单点能量/力计算，覆盖 55 种元素、82 种吸附物以及大量二元/三元催化剂表面
- **四阶段数据生成**：吸附物选择 → Materials Project 体相材料/表面枚举 → CatKit/ASE 生成初始吸附构型 → VASP/RPBE DFT 弛豫
- **三项核心任务**：S2EF 预测结构能量和原子力，IS2RS 从初始结构预测弛豫结构，IS2RE 从初始结构预测弛豫后吸附能
- **泛化切分设计**：验证和测试集同时包含 In-Domain、OOD Adsorbate、OOD Catalyst、OOD Both，用于评估模型对新吸附物和新催化剂组成的外推能力
- **基线模型体系**：以 CGCNN、SchNet、DimeNet++ 为代表，统一使用周期边界下的原子图、距离/角度消息传递和能量-力联合损失
- **评价指标贴近实际计算**：S2EF 使用 Energy MAE、Force MAE、Force Cosine 和 EFwT；IS2RS 使用 ADwT、FbT、AFbT；IS2RE 使用 Energy MAE 与 EwT
- **方法价值不止数据**：OC20 将催化剂发现中的 DFT 近似、ML 势能、吸附能估计和弛豫流程连接成统一 benchmark，后续 GemNet-OC、EquiformerV2/V3 等模型都围绕该基准迭代

#### 🔬 深入细节
![OC20 输入生成工作流](https://raw.githubusercontent.com/Open-Catalyst-Project/Open-Catalyst-Dataset/main/workflow_image.png)
*图：Open Catalyst Dataset 官方仓库中的吸附物-催化剂输入生成流程。OC20 论文的 arXiv TeX 源包含 `figures/workflow/scale.png`、`figures/relaxations/Figure2_01_27.png` 等论文图，但没有稳定的 arXiv HTML 图片直链；这里使用同一官方仓库提供的可访问工作流图。*

##### 动机与任务建模

催化剂筛选的瓶颈在于 DFT 弛豫：给定一个吸附物放在催化剂表面的初始构型，传统流程要反复计算能量和力，再用优化器更新原子坐标，直到最大受力低于阈值。单个体系可能需要数十到数百次 DFT 单点计算，而潜在的吸附物、表面、元素组合数量极大。OC20 的核心贡献是把这个计算化学工作流拆成可学习的三个问题。

S2EF 是最基础的机器学习势问题：输入某个轨迹中间帧的原子种类和坐标，输出吸附能与自由原子上的力：

$$
\mathbf{F}_i = -\frac{\partial E}{\partial \mathbf{r}_i}
$$

IS2RS 关注“从初始结构到弛豫结构”，可以通过反复调用 S2EF 模型做 ML relaxation，也可以训练端到端模型直接预测最终坐标。IS2RE 关注催化中最常用的量：从初始构型直接预测弛豫后吸附能，或者先用 S2EF/IS2RS 得到近似弛豫结构再估计能量。

##### 数据生成机制

OC20 的生成流程可理解为在一个巨大组合树上采样：

```python
# OC20 数据生成流程伪代码
for seed in random_seeds:
    # 1. 选择体相材料：偏向二元/三元体系以覆盖未充分研究的催化剂
    n_elem = sample([1, 2, 3], probs=[0.05, 0.65, 0.30])
    bulk = sample_materials_project_bulk(n_elem, stable_or_near_hull=True)

    # 2. 枚举并采样表面
    surfaces = enumerate_symmetry_distinct_surfaces(
        bulk,
        max_miller_index=2,
        min_depth_angstrom=7,
        min_width_angstrom=8,
    )
    slab = random_choice(surfaces)

    # 3. 选择吸附物并生成初始吸附构型
    adsorbate = sample_from_82_adsorbates()
    binding_sites = catkit_enumerate_sites(slab, adsorbate)
    init_structure = place_adsorbate(slab, adsorbate, random_choice(binding_sites))

    # 4. DFT 弛豫并保存所有中间帧
    trajectory = vasp_relax(
        init_structure,
        functional="RPBE",
        force_threshold=0.03,  # eV / Angstrom
        max_wall_time_hours=144,
        fixed_atoms="subsurface",
    )
    save_energy_force_frames(trajectory)
```

吸附能统一引用到裸 slab 和气相吸附物：

$$
E_{\mathrm{ad}} = E_{\mathrm{sys}} - E_{\mathrm{slab}} - E_{\mathrm{gas}}
$$

其中 \(E_{\mathrm{sys}}\) 是吸附物+表面的系统能量，\(E_{\mathrm{slab}}\) 是弛豫后的裸表面能量，\(E_{\mathrm{gas}}\) 是气相吸附物参考能。这个定义使不同体系的能量标签可以放进同一监督学习任务。

##### 基线 GNN 与损失函数

OC20 基线模型都把体系表示成周期性原子图：节点是原子，边是 cutoff 半径内的邻居关系，计算距离时考虑周期边界。论文中使用 6 Å cutoff，最多保留 50 个近邻，并把原子标记成 fixed slab、free surface、free adsorbate 三类，从而只在自由原子上计算力误差。

能量-力联合训练损失为：

$$
\mathcal{L}
= \lambda_E \sum_i \left|E_i - E_i^{\mathrm{DFT}}\right|
+ \lambda_F \sum_{i,j}\frac{1}{N_i}
\left|F_{i,j} - F_{i,j}^{\mathrm{DFT}}\right|
$$

其中 \(i\) 表示结构帧，\(j\) 表示第 \(i\) 个结构中的自由原子，\(N_i\) 是自由原子数量。IS2RE 只评估能量时令 \(\lambda_F=0\)。SchNet 通过连续滤波器学习距离依赖，DimeNet++ 额外引入角度方向消息，因此在早期 OC20 基线里通常比只用距离的模型更适合力预测。

##### 三项任务如何互相连接

```python
# 三项任务之间的关系
def s2ef_model(structure):
    energy = energy_head(gnn(structure))
    forces = -grad(energy, structure.positions)
    return energy, forces

def is2rs_via_s2ef(initial_structure):
    structure = initial_structure
    for step in range(max_relax_steps):
        energy, forces = s2ef_model(structure)
        structure.positions = lbfgs_update(structure.positions, forces)
        if max_norm(forces) < 0.05:  # practical force threshold
            break
    return structure

def is2re(initial_structure):
    relaxed_structure = is2rs_via_s2ef(initial_structure)
    relaxed_energy, _ = s2ef_model(relaxed_structure)
    return relaxed_energy
```

这个伪代码展示了 OC20 的关键思想：S2EF 是可复用的局部势能/力近似器，IS2RS 是用这个近似器替代 DFT 做结构优化，IS2RE 则服务于催化中常见的吸附能筛选。如果 S2EF 的力方向误差很小，ML relaxation 才可能收敛到合理局部极小值；如果力 MAE 低但方向不稳，IS2RS 仍可能失败。

##### 评价指标的工程含义

OC20 没有只报告 MAE，而是设计了更接近“能否替代 DFT”的阈值指标。S2EF 的 EFwT 要求同一结构同时满足能量误差低于 0.02 eV、最大原子力误差低于 0.03 eV/Å；IS2RE 的 EwT 同样以 0.02 eV 为阈值；IS2RS 的 FbT/AFbT 要用单点 DFT 重新评估模型弛豫后的结构是否接近真实局部极小值。

> 💡 关键：OC20 的难点不是单一化学体系的插值，而是跨吸附物、跨催化剂组成、跨表面位点的外推。OOD Both 切分同时隐藏吸附物和催化剂组成，暴露了模型是否真正学到可迁移的局部化学规律。

##### 与传统小规模催化数据集的区别

传统催化 ML 数据集通常围绕少量金属表面、少量吸附物或已知反应族构建，手工描述符和线性模型也能发挥作用。OC20 的不同之处在于它把高通量 DFT 轨迹本身作为学习对象：不仅提供最终能量，也提供大量中间结构、随机扰动、短时 MD、Bader 电荷和 LOBSTER 分析。这使模型可以学习完整势能面附近的局部几何响应，而不只是拟合最终吸附能表。

这也是后续模型演进的原因：SchNet/DimeNet++ 基线证明数据规模有用但离实用阈值很远；GemNet-OC 针对 OC20 调整几何消息传递和邻居图；EquiformerV2/V3 进一步用高阶等变表示和更强注意力机制提升力预测与训练效率。换言之，OC20 本身不是一个单一网络结构，而是催化剂 AI 的任务定义、数据生成协议和模型竞赛基础设施。

#### 🧪 练习题
```yaml
question: "OC20 中 S2EF、IS2RS、IS2RE 三个任务的核心关系是什么？"
options:
  - "三者分别处理文本、图像和语音输入，互不相关"
  - "S2EF 预测能量和力，可驱动 ML 弛豫形成 IS2RS，并进一步用于估计 IS2RE 的弛豫能量"
  - "IS2RE 只预测吸附物 SMILES，不涉及三维结构"
  - "IS2RS 要求直接运行完整 DFT，不允许使用机器学习模型"
answer: 1
explain: "OC20 将 DFT 弛豫流程拆解为能量/力预测、结构弛豫和弛豫能量预测。S2EF 是最基础的势能近似器，后两项任务可以直接或间接建立在它之上。"
```

### GemNet-OC

```yaml
id: gemnet_oc
num: 27
name: GemNet-OC
full_name: 催化剂优化GemNet (GemNet-OC)
year: '2021'
org: TU Munich / Meta AI
parent: oc20
paper_url: https://arxiv.org/abs/2106.08903
project_url: ''
category: catalyst
motivation: OC20数据集上的高效几何GNN
```

#### 📝 一句话总结
GemNet-OC 在 GemNet 基础上提出邻居图构建、简化球谐基函数、可控四元组交互和多层级交互层级（原子-边-四元组）等改进，使其在 OC20 所有任务上达到 SOTA，同时训练速度提升 10 倍；并通过系统性数据集分析揭示了小数据集与大数据集上模型选择的显著差异。

#### 🎯 核心要点
- **基于 GemNet 的几何消息传递**：同时维护原子嵌入 \(h_a\) 和有向边嵌入 \(m_{ca}\)，利用距离、角度和二面角的完整几何信息进行消息传递
- **邻居图替代距离截断**：用固定数量的最近邻（\(k_{\text{emb}}=30\)）替代固定距离截断，解决大化学多样性下图过稀/过密问题，吞吐量提升 3 倍
- **简化基函数**：将球谐函数解耦为 Legendre 多项式外积 \(P_l(\cos\phi) P_m(\cos\theta)\)，吞吐量提升 29%
- **可控四元组交互**：将四元组邻居数 \(k_{\text{qint}}\) 降至 8（远小于 \(k_{\text{emb}}=30\)），开销从 330% 降至 31%
- **多层级交互层级**：引入原子-原子（AA）、原子-边（AE）、边-原子（EA）消息传递，AA 交互可使用 12 Å 长程截断
- **架构改进**：交互块输出嵌入拼接后经 MLP 预测、每个交互块增加原子嵌入 MLP、能量输出块中注入原子嵌入
- **OC-2M 代理数据集**：识别出 200 万样本子集 OC-2M，其模型趋势与完整 OC20（1.34 亿样本）高度相关
- **全面 SOTA**：GemNet-OC-Large 在 S2EF、IS2RS、IS2RE 三大任务上均超越此前最优模型 16%

#### 🔬 深入细节
![GemNet-OC 架构示意图](https://arxiv.org/html/2204.02782v2/x1.png)
*图：GemNet-OC 架构总览。橙色部分为相对于原始 GemNet 的改进。左侧为整体模型流程，中间为交互块内部结构，右侧为不同类型消息传递（AA/AE/EA/EE/Q-MP）的细节。*

##### 动机与背景

分子动力学模拟需要精确预测原子系统的能量 \(E\) 和力 \(\mathbf{F}\)。图神经网络（GNN）已成为主流方法，但面对 OC20 这样包含 1.34 亿样本、涵盖 56 种元素的大规模催化剂数据集时，此前的模型存在两大瓶颈：

1. **计算效率**：GemNet 的四元组交互（二面角）复杂度为 \(O(N k_{\text{qint}} k_{\text{emb}}^2)\)，在大系统中极其昂贵
2. **图构建策略**：固定距离截断（5-6 Å）在化学多样性大的数据集中会导致部分系统图断裂、部分系统图过密

GemNet-OC 系统性地解决了这些问题，同时研究了数据集规模和多样性对模型设计选择的影响。

##### 核心机制详解

**1. 邻居图替代距离截断**

传统 GNN 通过距离截断 \(c_{\text{int}}\) 构建图，并使用包络函数保证力的二次连续可微性：

$$e_{\text{env}}(x) = \begin{cases} 1 - (p+1)(p+2)/2 \cdot x^p + p(p+2) \cdot x^{p+1} - p(p+1)/2 \cdot x^{p+2} & x \leq 1 \\ 0 & x > 1 \end{cases}$$

GemNet-OC 改为使用固定数量的最近邻 \(k_{\text{emb}}\) 构建图。虽然这在理论上破坏了力的可微性（当两个原子距离排序发生切换时），但实验表明这在实践中不构成问题。这一改变带来三个优势：
- 吞吐量提升 3 倍
- 计算和内存需求可控
- 邻域大小一致，避免图断裂

**2. 简化基函数**

原始 GemNet 使用球 Bessel 函数和球谐函数表示几何信息，径向阶 \(l\) 与角度阶耦合，需计算 \(O(N k_{\text{qint}} k_{\text{emb}}^2)\) 个基函数。GemNet-OC 做了两步简化：

- **解耦径向基**：使用高斯函数或零阶 Bessel 函数，独立于球谐函数
- **简化角度基**：用零阶球谐函数的外积替代完整球谐函数，简化为 Legendre 多项式：

$$Y_0^{(l)}(\phi_{cab}) \cdot Y_0^{(m)}(\theta_{cabd}) = P_l(\cos\phi_{cab}) \cdot P_m(\cos\theta_{cabd})$$

这只需要边方向的归一化内积，无需显式计算角度，吞吐量提升 29% 且不损失精度。

**3. 可控四元组交互**

四元组交互利用二面角 \(\theta_{cabd}\) 捕获四体相互作用，但复杂度为 \(O(N k_{\text{qint}} k_{\text{emb}}^2)\)。关键观察是：**四元组交互主要对最近邻有效**，随距离增大收益迅速递减。因此 GemNet-OC 将 \(k_{\text{qint}}\) 设为 8，远小于 \(k_{\text{emb}}=30\)，将四元组交互开销从 330% 降至仅 31%。

**4. 多层级交互层级**

低 \(k_{\text{qint}}\) 自然引入了交互层级：短程四元组交互（昂贵但精确）+ 中程边-边交互（较便宜）。GemNet-OC 进一步扩展为完整的多层级体系：

| 交互类型 | 输入→输出 | 几何信息 | 截断/邻居数 | 复杂度 | 额外开销 |
|---------|----------|---------|-----------|--------|---------|
| Q-MP（四元组） | 边→边 | 距离+角度+二面角 | \(k_{\text{qint}}=8\) | \(O(Nk_{\text{qint}}k_{\text{emb}}^2)\) | 31% |
| EE-MP（边-边） | 边→边 | 距离+角度 | \(k_{\text{emb}}=30\) | \(O(Nk_{\text{emb}}^2)\) | 基础 |
| AA-MP（原子-原子） | 原子→原子 | 仅距离 | 12 Å 无限制 | \(O(Nk_{\text{emb}})\) | ~10% |
| AE-MP（原子-边） | 原子→边 | 距离+角度 | \(k_{\text{emb}}=30\) | \(O(Nk_{\text{emb}}^2)\) | ~10% |
| EA-MP（边-原子） | 边→原子 | 距离+角度 | \(k_{\text{emb}}=30\) | \(O(Nk_{\text{emb}}^2)\) | ~10% |

> 💡 **关键**：AA-MP 由于仅使用距离信息，复杂度极低，可以使用 12 Å 的长程截断，有效捕获远程相互作用。

**5. 架构改进**

三项改进总计增加不到 2% 的计算开销：

- **嵌入拼接输出**：各交互块输出嵌入而非直接预测，拼接后经 MLP 生成最终预测，允许模型更好地组合不同层级的信息
- **原子嵌入 MLP**：每个交互块中增加可学习 MLP 更新原子嵌入，配合新引入的 AA/AE/EA 交互
- **能量输出注入**：在每个能量输出块中加入原子嵌入，创建从原子嵌入到能量预测的直接路径

##### 消息传递核心伪代码

```python
# GemNet-OC 单个交互块伪代码
def interaction_block(h_a, m_ca, graph):
    # 1. 四元组消息传递 (Q-MP) - 短程精细交互
    for (c,a,b,d) in quadruplet_neighbors(graph, k_qint=8):
        e_cabd = SBF(x_ca, phi_cab, theta_cabd)  # 球面基函数
        m_ca += W_q @ (m_db * e_cabd)             # 二面角加权消息

    # 2. 边-边消息传递 (EE-MP) - 中程三体交互
    for (c,a,b) in triplet_neighbors(graph, k_emb=30):
        e_cab = CBF(x_ca, phi_cab)                # 圆柱基函数
        m_ca += W_ee @ (m_ba * e_cab)

    # 3. 原子-原子消息传递 (AA-MP) - 长程两体交互
    for (a,b) in atom_neighbors(graph, cutoff=12.0):
        e_ab = RBF(x_ab)                          # 径向基函数
        h_a += W_aa @ (h_b * e_ab)

    # 4. 原子-边 / 边-原子消息传递
    m_ca += AE_MP(h_a, graph)   # 原子嵌入 → 边嵌入
    h_a  += EA_MP(m_ca, graph)  # 边嵌入 → 原子嵌入

    # 5. 原子嵌入 MLP 更新
    h_a = h_a + MLP(h_a)

    return h_a, m_ca
```

##### 数据集效应分析

论文的重要贡献之一是系统性研究了数据集属性对模型选择的影响。通过构建 6 个 OC20 子集，分别隔离 4 种数据集属性的效应：

1. **化学多样性**：窄数据集（如 MD17）上有效的组件在宽数据集上可能无效甚至有害
2. **领域偏移**：OOD 测试集上的表现可能与 ID 测试集上的趋势不一致
3. **训练集大小**：某些组件只在大训练集上才能发挥优势
4. **系统大小**：大系统中计算效率成为关键约束

> ⚠️ **注意**：论文发现模型组件在不同数据集上可能产生截然相反的效果。例如，四元组交互在小分子数据集 MD17 上提升显著，但在 OC20 的某些子集上收益有限。这表明在小基准上的模型开发结论不能直接迁移到大规模数据集。

##### 实验结果

GemNet-OC 在 OC20 所有三个任务上均达到 SOTA：

- **S2EF**（结构→能量和力）：Force MAE 在 OC20 全量训练集上达到 19.4 meV/Å，GemNet-OC-Large 进一步降至 ~16%
- **IS2RS**（初始结构→弛豫结构）：ADwT 和 AFbT 指标均大幅领先
- **IS2RE**（初始结构→弛豫能量）：能量 MAE 显著优于此前模型
- **训练效率**：在 OC-2M 子集上训练的 GemNet-OC 已超越此前在完整 OC20 上训练的所有 pre-GemNet 模型

#### 🧪 练习题
```yaml
question: "GemNet-OC 将四元组交互的邻居数 k_qint 设为 8（远小于嵌入邻居数 k_emb=30），其主要依据是什么？"
options:
  - "四元组交互的计算复杂度与 k_qint 无关"
  - "四元组交互主要对最近邻有效，随距离增大收益迅速递减"
  - "OC20 数据集中大多数原子只有 8 个邻居"
  - "减少 k_qint 可以提升模型在小分子数据集上的精度"
answer: 1
explain: "论文观察到四元组交互（二面角信息）主要对最近邻原子有益，增大 k_qint 后收益迅速趋于平缓，因此用低 k_qint=8 即可获得大部分收益，同时将计算开销从 330% 降至 31%。"
```

### EquiformerV2

```yaml
id: equiformerv2
num: 28
name: EquiformerV2
full_name: 等变Transformer V2 (EquiformerV2)
year: '2023'
org: Atomic Architects
parent: gemnet_oc
paper_url: https://arxiv.org/abs/2306.12059
project_url: ''
category: catalyst
motivation: SE(3)等变图注意力，OC20 SOTA性能
```

#### 📝 一句话总结
EquiformerV2 在 Equiformer 的 SE(3)/E(3) 等变图注意力框架中引入 eSCN 高效卷积、attention re-normalization、separable \(S^2\) activation 和 separable layer normalization，使等变 Transformer 能在 OC20 上使用更高阶 irreps 表示并刷新能量/力预测性能。

#### 🎯 核心要点
- **高阶等变表示扩展**：用 eSCN convolution 替换传统 \(SO(3)\) tensor product，使 \(L_{\max}\) 可扩展到 6 或 8，以捕获更高角分辨率的局部几何
- **等变图注意力保留 Transformer 结构**：节点特征是 irreps feature，边消息通过旋转到局部边坐标系、\(SO(2)\) linear、再旋回全局坐标系实现等变传播
- **Attention re-normalization**：在注意力 logits 的非线性和 softmax 前额外加入 LN，稳定高阶表示带来的输入尺度变化
- **Separable \(S^2\) activation**：将标量 \(L=0\) 与高阶 \(L>0\) 通道分开激活，避免直接 \(S^2\) activation 的梯度不稳定，同时比 gate activation 更能混合不同 degree
- **Separable Layer Normalization**：标量通道使用标准 LN，高阶通道共享 RMS 归一化，保留不同高阶 degree 之间的相对幅值
- **统一能量/力输出**：能量通过节点标量读出并求和，力可以由 degree-1 等变输出直接预测，也可用于后续 AdsorbML 弛豫流程
- **OC20/OC22 数据效率**：论文报告在 OC20 上相对既有 SOTA 最高约 9% force、4% energy 改进，并在 AdsorbML 中减少约 2 倍 DFT 计算需求

#### 🔬 深入细节
![EquiformerV2 总体架构](https://arxiv.org/html/2306.12059v3/extracted/5453842/figures/equiformer_v2.png)
*图：EquiformerV2 总览。红色部分标出相对 Equiformer 的修改：eSCN/\(SO(2)\) convolution、attention re-normalization、edge-degree embedding 变化和 separable \(S^2\) FFN。*

![EquiformerV2 激活与归一化](https://arxiv.org/html/2306.12059v3/extracted/5453842/figures/activation.png)
*图：gate activation、\(S^2\) activation 与 separable \(S^2\) activation 的差异。*

##### 动机与背景

Equiformer 的核心思想是把 Transformer 的注意力和 FFN 替换成等变版本，使每个原子节点维护从 \(L=0\) 到 \(L_{\max}\) 的 irreps 特征。\(L=0\) 是旋转不变的标量，\(L=1\) 类似向量，高阶 \(L\) 则编码更细的角向变化。对力预测而言，高阶角信息很重要，因为原子力对局部几何方向高度敏感。

问题在于传统 \(SO(3)\) tensor product 的复杂度随 \(L_{\max}\) 快速上升。原始 Equiformer 在 OC20 这类大规模体系上难以使用很高的 \(L_{\max}\)，导致表达力受限。EquiformerV2 的主线就是：保留 Equiformer 的注意力式消息传递，同时用 eSCN 的高效 \(SO(2)\) 计算方式降低高阶 irreps 的成本。

##### eSCN 卷积如何替代昂贵 tensor product

传统等变卷积要把输入 irreps 与相对位置的球谐函数做 Clebsch-Gordan tensor product。eSCN 的思路是先把边方向 \(\vec{r}_{ij}\) 旋转到固定轴，此时许多 spherical harmonic 分量变稀疏，复杂的 \(SO(3)\) 交互可以降为沿 order \(m\) 的 \(SO(2)\) linear 操作。

对边 \((i,j)\)，EquiformerV2 的消息计算可以抽象为：

$$
\tilde{x}_{ij} = D_{ij}[x_i \Vert x_j]
$$

$$
f_{ij} = SO(2)\text{-Linear}(\tilde{x}_{ij} \odot \phi_r(\|\vec{r}_{ij}\|))
$$

其中 \(D_{ij}\) 是由边方向确定的旋转矩阵，\(\phi_r\) 是由距离径向基经 MLP 得到的边距离嵌入。得到的 \(f_{ij}\) 被拆成标量部分 \(f_{ij}^{(0)}\) 和高阶 irreps 部分 \(f_{ij}^{(L)}\)，分别用于注意力权重和值向量。

##### Attention re-normalization

高阶 \(L_{\max}\) 增大后，计算注意力 logits 的输入通道数也随之增大，直接进入 LeakyReLU 和 softmax 会导致尺度不稳。EquiformerV2 在 \(f_{ij}^{(0)}\) 上加入一层 LN：

$$
z_{ij} = w_a^\top \mathrm{LeakyReLU}(\mathrm{LN}(f_{ij}^{(0)}))
$$

$$
a_{ij} = \mathrm{softmax}_j(z_{ij})
= \frac{\exp(z_{ij})}{\sum_{k\in\mathcal{N}(i)}\exp(z_{ik})}
$$

注意力消息随后写为：

$$
m_{ij} = D_{ij}^{-1}(a_{ij} \cdot v_{ij})
$$

这里 \(v_{ij}\) 是经过 separable \(S^2\) activation 和第二个 \(SO(2)\) linear 得到的等变值向量。旋转回原坐标系的步骤保证输出随输入旋转而等变。

##### Separable \(S^2\) activation

gate activation 只用标量门控高阶 irreps，主要是 \(L=0\) 对 \(L>0\) 的调制；当模型使用 \(L_{\max}=6/8\) 时，这种激活对高阶之间的混合不足。\(S^2\) activation 则先把 irreps 投影到球面采样网格，在网格上施加普通非线性，再投影回 irreps：

$$
y = G^{-1}(F(G(x)))
$$

其中 \(G\) 表示 ToSphere，\(G^{-1}\) 表示 FromSphere。直接替换为 \(S^2\) activation 会产生大梯度和训练不稳定，因此 EquiformerV2 做了分离设计：一部分 \(L=0\) 标量直接经过 SiLU，另一部分 \(L=0\) 与 \(L>0\) 一起进入 \(S^2\) activation，最后拼接输出并丢弃辅助标量分支。这保留了高阶混合能力，又避免了直接 \(S^2\) 非线性的优化问题。

##### Separable Layer Normalization

原始等变 LN 对每个 degree 独立归一化，容易抹掉不同 degree 之间的相对强弱。EquiformerV2 改为：

$$
y^{(0)} = \gamma^{(0)} \circ \frac{x^{(0)}-\mu^{(0)}}{\sigma^{(0)}} + \beta^{(0)}
$$

$$
y^{(L)} = \gamma^{(L)} \circ \frac{x^{(L)}}{\sigma^{(L>0)}} \quad (L>0)
$$

$$
\sigma^{(L>0)} =
\sqrt{\frac{1}{L_{\max}}\sum_{L=1}^{L_{\max}}(\sigma^{(L)})^2}
$$

这意味着所有高阶 degree 共享一个 RMS 分母，而不是各自被拉到同一尺度。直觉上，模型可以保留“哪个角频率更重要”的信息。

##### 前向传播伪代码

```python
# EquiformerV2 单个 Transformer block 的核心逻辑
def equiformerv2_block(x, positions, edge_index):
    messages = []
    for i, j in edge_index:
        r_ij = positions[j] - positions[i]
        D_ij = rotation_to_edge_frame(r_ij)
        radial = radial_mlp(gaussian_rbf(norm(r_ij)))

        # 1. 旋转到边坐标系并用 SO(2) linear 替代 SO(3) tensor product
        h_ij = concat(x[i], x[j])
        h_local = D_ij @ h_ij
        f_ij = so2_linear_1(h_local * radial)

        # 2. 标量部分计算注意力权重
        f_scalar, f_irreps = split_scalar_and_irreps(f_ij)
        z_ij = attn_linear(leaky_relu(layer_norm(f_scalar)))
        a_ij = neighborhood_softmax(z_ij, center=i)

        # 3. 高阶部分计算 value，并旋回全局坐标系
        v_ij = separable_s2_activation(f_irreps)
        v_ij = so2_linear_2(v_ij)
        m_ij = inverse(D_ij) @ (a_ij * v_ij)
        messages.append((i, m_ij))

    x = x + aggregate(messages)
    x = separable_layer_norm(x)
    x = x + ffn_with_separable_s2(x)
    return x
```

##### 与 GemNet-OC 的差异

GemNet-OC 的强项是几何消息传递工程化：距离、角度、二面角、多层级邻居图和 OC20 特化优化。EquiformerV2 则把注意力机制与群表示结合起来，让节点内部显式维护可旋转的高阶 irreps 通道。它不需要手工枚举所有二面角路径，而是通过高阶等变表示和 \(SO(2)\) 消息传递学习角向响应。

> 💡 关键：EquiformerV2 的性能并不是“把 eSCN 放进 Equiformer”自动得到的。论文消融显示，单纯使用 eSCN 高阶卷积并不能优于 eSCN 基线；attention re-normalization、separable \(S^2\) activation 和 separable LN 是让高阶表示真正可训练、可利用的必要组件。

##### 训练和应用意义

在 OC20 S2EF-2M 消融中，EquiformerV2 的 force MAE 随 \(L_{\max}\)、训练 epoch 和 Transformer block 数增加而稳定下降，说明高阶表示确实提供了有效角信息。更重要的是，EquiformerV2 在 AdsorbML 这类工作流中可以减少 DFT 单点确认次数：模型越能准确排序和弛豫候选吸附构型，越少需要昂贵 DFT 去修正错误局部极小值。

#### 🧪 练习题
```yaml
question: "EquiformerV2 中 separable S² activation 的主要作用是什么？"
options:
  - "完全移除所有高阶 irreps，只保留标量特征"
  - "在避免直接 S² activation 训练不稳定的同时，加强不同 degree 等变特征之间的非线性混合"
  - "把原子图转换成 SMILES 字符串再训练 Transformer"
  - "只改变输出层，不影响注意力和 FFN"
answer: 1
explain: "直接 S² activation 更有表达力但在 Equiformer 中会出现大梯度和不收敛。separable 设计把标量与高阶路径分开处理，使高阶混合可训练。"
```

### EquiformerV3

```yaml
id: equiformerv3
num: 29
name: EquiformerV3
full_name: 等变Transformer V3 (EquiformerV3)
year: '2026.04'
org: Atomic Architects
parent: equiformerv2
paper_url: https://arxiv.org/abs/2604.09130
project_url: ''
category: catalyst
motivation: 5.9倍训练效率提升，SwiGLU-S²激活函数
```

#### 📝 一句话总结
EquiformerV3 在 EquiformerV2 基础上通过实现级融合、merged layer normalization、平滑 cutoff 注意力和 SwiGLU-\(S^2\) activation 同时提升训练效率、势能面平滑性与高阶表达力，使等变 Transformer 更适合 OC20、OMat24 和 Matbench Discovery 等大规模原子模拟任务。

#### 🎯 核心要点
- **实现优化带来 1.75× 加速**：将 \(SO(2)\) linear 中的排列矩阵融合进旋转矩阵 \(\widetilde{D}_{ij}=S D_{ij}\)，并修复动态 shape 以启用 `torch.compile()`
- **训练效率 5.9× 对比**：在与更深、更长训练的 EquiformerV2 对比时，EquiformerV3 达到相近 force MAE，同时按论文计算节省约 5.9× 训练时间
- **Equivariant merged layer normalization**：用所有 degree 共享的 merged RMS 归一化，进一步保留 \(L=0\) 与 \(L>0\) 之间的相对幅值
- **FFN 容量重新分配**：利用节点级 FFN 比边级 tensor product 便宜的特点，将 FFN hidden size 提高 4×，以较小训练开销增加模型容量
- **Smooth radius cutoff attention**：把 envelope function 同时放进 softmax 分子/分母和 value message，避免邻居进出 cutoff 时注意力权重突变
- **SwiGLU-\(S^2\) activation**：在球面网格上用标量 sigmoid 门控两个 grid feature 的乘法，引入 many-body 交互，同时减少保持严格等变所需的网格采样
- **面向平滑 PES 和高阶导数**：严格等变和平滑 cutoff 使模型更适合能量守恒模拟、梯度力、应力和热导率等依赖势能面高阶导数的任务
- **DeNS 辅助训练**：在直接预测训练中加入非平衡结构去噪任务，提高对扰动构型和材料弛豫工作流的泛化

#### 🔬 深入细节
![EquiformerV3 架构](https://arxiv.org/html/2604.09130v1/figure/equiformer_v3.png)
*图：EquiformerV3 架构。论文 Figure 1 标出实现融合、attention、embedding、FFN 和 SwiGLU-\(S^2\) 等改动。*

![SwiGLU-S2 激活](https://arxiv.org/html/2604.09130v1/figure/swiglu_s2_activation_v2.png)
*图：gate activation、\(S^2\) activation 和 SwiGLU-\(S^2\) activation 对比。SwiGLU-\(S^2\) 在球面 grid feature 上同时使用标量非线性门控和乘法交互。*

##### 从 EquiformerV2 到 V3 的核心问题

EquiformerV2 证明了高阶等变 Transformer 在 OC20 上有效，但仍有三个限制。第一，eSCN/\(SO(2)\) 操作的实现中存在重复排列和动态图开销，训练成本高。第二，直接预测单点能量/力的模型不一定生成光滑势能面；当原子跨过 cutoff 半径时，如果邻居集合变化导致 softmax 分母突变，能量和力可能不连续。第三，V2 的 \(S^2\) activation 虽然更强，但直接对球面 grid 施加非线性会引入高频成分，保持严格等变需要较密的采样网格。

EquiformerV3 的设计目标是同时处理这三类问题：把软件路径变快，把注意力变平滑，把激活函数变得既有更高 body-order 表达力又更容易保持严格等变。

##### 软件优化：融合冗余操作

EquiformerV2 的 eSCN 卷积对每条边先用旋转矩阵 \(D_{ij}\) 将特征转到边坐标系，再用 \(SO(2)\) linear。原实现中还需要排列矩阵 \(S\) 调整 degree/order 的存储顺序。EquiformerV3 直接预融合：

$$
\widetilde{D}_{ij}=S\cdot D_{ij}
$$

$$
SO(2)\_\mathrm{Linear}(S\cdot(D_{ij}x))
= SO(2)\_\mathrm{Linear}((S\cdot D_{ij})x)
= SO(2)\_\mathrm{Linear}(\widetilde{D}_{ij}x)
$$

这样所有后续 \(SO(2)\) linear 都不再显式执行排列。再配合预计算常量张量、为 scatter 指定输出 shape 等改动，模型可以使用 `torch.compile()`，论文报告在 OC20 训练中实现约 1.75× 加速且精度保持一致。

##### Merged layer normalization

V2 的 separable LN 分开处理标量和高阶通道，而 V3 进一步把所有 degree 的 RMS 合并成一个共享分母。设输入 irreps 特征为 \(x\in\mathbb{R}^{(L_{\max}+1)^2\times C}\)，先计算每个 degree 的 RMS：

$$
\sigma^{(0)}=
\sqrt{\frac{1}{C}\sum_{i=1}^{C}(x^{(0)}_{0,i}-\mu^{(0)})^2}
$$

$$
\sigma^{(L)}=
\sqrt{\frac{1}{C}\sum_{i=1}^{C}\frac{1}{2L+1}
\sum_{m=-L}^{L}(x^{(L)}_{m,i})^2}
$$

再合并：

$$
\sigma =
\sqrt{\frac{1}{L_{\max}+1}\sum_{L=0}^{L_{\max}}(\sigma^{(L)})^2}
$$

输出为：

$$
y^{(0)}=\gamma^{(0)}\circ\frac{x^{(0)}-\mu^{(0)}}{\sigma}+\beta^{(0)},\quad
y^{(L)}=\gamma^{(L)}\circ\frac{x^{(L)}}{\sigma}
$$

这比逐 degree 归一化更少破坏 degree 间相对大小，也比 V2 的二分归一化更统一。

##### 平滑 cutoff 注意力

普通注意力权重为：

$$
a_{ij}=
\frac{\exp(z_{ij})}{\sum_{k\in\mathcal{N}(i)}\exp(z_{ik})}
$$

如果只在最终 message 上乘 envelope，当某个邻居进入或离开 cutoff，softmax 分母仍会突变。EquiformerV3 将 envelope 放进注意力归一化本身：

$$
a_{ij}
=
\frac{\mathrm{env}(\|\vec{r}_{ij}\|)\exp(z_{ij})}
{\sum_{k\in\mathcal{N}(i)}\mathrm{env}(\|\vec{r}_{ik}\|)\exp(z_{ik})}
$$

$$
m_{ij}=a_{ij}\times
\left(\mathrm{env}(\|\vec{r}_{ij}\|)\cdot v_{ij}\right)
$$

这样当距离接近 cutoff 时，对 softmax 分子、分母和值向量的贡献都会连续衰减到 0。对单点 S2EF MAE 来说收益可能不显著，但对能量守恒模拟、力的梯度一致性和 Matbench Discovery 中的声子/热导率高阶导数更关键。

##### SwiGLU-\(S^2\) activation

\(S^2\) activation 将 irreps 投影到单位球面、在 grid 上施加非线性，再投影回 irreps：

$$
x^{grid}(\phi,\theta)
=
\sum_{L=0}^{L_{\max}}\sum_{m=-L}^{L}
Y^{(L)}_m(\phi,\theta)x^{(L)}_m
$$

$$
y^{(L)}_m
=
\int_0^{2\pi}\int_0^\pi
y^{grid}(\phi,\theta)Y^{(L)}_m(\phi,\theta)\sin\theta\,d\theta\,d\phi
$$

V3 的新点是把快速 tensor product 的思想融入激活：两个 irreps 投影到球面后，grid feature 的逐点乘法等价于 irreps 空间中的一类 self tensor product：

$$
z^{grid}(\phi,\theta)=x_1^{grid}(\phi,\theta)\odot x_2^{grid}(\phi,\theta)
$$

论文提出的 SwiGLU-\(S^2\) 写作：

$$
\mathrm{SwiGLU}\text{-}S^2(x_{\mathrm{scalar}},x_1^{grid},x_2^{grid})
=
\sigma(x_{\mathrm{scalar}})\cdot x_1^{grid}\odot x_2^{grid}
$$

其中 \(\sigma(\cdot)\) 是 sigmoid，非线性只作用在标量门控上，grid feature 本身只做双线性乘法。这有两点好处：乘法引入 many-body/self tensor product 交互，提高理论表达力；标量非线性避免向球面 grid 注入高频成分，因此在 \(L_{\max}=6\) 时可以把 attention 的 grid 点数从 V2 的 \(18\times18=324\) 降到 \(8\times20=160\)，仍保持严格等变。

##### 前向传播伪代码

```python
# EquiformerV3 block 的核心路径
def equiformerv3_block(x, positions, edge_index):
    out = zeros_like(x)
    for i, j in edge_index:
        r_ij = positions[j] - positions[i]
        env = smooth_envelope(norm(r_ij))

        # 1. 融合排列后的旋转矩阵
        D_tilde = fused_permuted_rotation(r_ij)  # S @ D_ij
        h = D_tilde @ concat(x[i], x[j])

        # 2. SO(2) linear 得到 attention scalar 与 irreps value 输入
        f_scalar, f_irreps = split(so2_linear_1(h))
        z_ij = attn_linear(leaky_relu(layer_norm(f_scalar)))

        # 3. smooth cutoff softmax：env 同时进入分子和分母
        a_ij = smooth_cutoff_softmax(z_ij, env, center=i)

        # 4. SwiGLU-S2 value：标量门控 + grid feature 乘法
        x_scalar, x_grid_1, x_grid_2 = prepare_s2_features(f_irreps)
        v_grid = sigmoid(x_scalar) * x_grid_1 * x_grid_2
        v_irreps = from_sphere(v_grid)
        v_irreps = so2_linear_2(v_irreps)

        # 5. value message 也乘 envelope，再旋回全局坐标系
        m_ij = inverse(D_tilde) @ (a_ij * env * v_irreps)
        out[i] += m_ij

    x = x + out
    x = equivariant_merged_layer_norm(x)
    x = x + ffn_with_swiglu_s2(x, hidden_multiplier=4)
    return x
```

##### DeNS 与直接/梯度训练

V3 继续区分 direct prediction 和 gradient prediction：direct 直接预测力/应力，训练快且适合大规模预训练；gradient 通过能量对坐标/晶胞求导得到力/应力，更符合保守势能面。论文在 OMat24 和 Matbench Discovery 中采用 direct pre-training + gradient fine-tuning，并在 direct 阶段加入 DeNS 辅助任务，让模型从非平衡扰动结构中恢复噪声方向。

> 💡 关键：V3 的“通用性”不是只看 OC20 单点 MAE，而是让同一个等变 Transformer 同时适应催化吸附、材料非平衡结构、结构弛豫、热导率等需要平滑 PES 与高阶导数的任务。

##### 实验数字如何理解

在 OC20 S2EF-2M 消融中，V3 从 EquiformerV2 baseline 的 energy 296 meV、force 21.23 meV/Å、270 H100 GPU-hours 出发；改为预测 total energy 后 force 降到 19.73；实现优化把训练时间降到 154 GPU-hours；merged LN、FFN hidden 扩大、smooth cutoff 和 SwiGLU-\(S^2\) 后达到 energy 201 meV、force 18.15 meV/Å、171 GPU-hours。论文进一步与更深、训练更久的 V2 设置比较，给出约 \(270/171\times1.5\times2.5\approx5.9\) 倍训练时间节省。

这说明 EquiformerV3 的进步不是单一 trick：软件优化降低成本，merged LN 和 FFN 调参改善优化，smooth cutoff 改善物理连续性，SwiGLU-\(S^2\) 同时增加表达力并降低等变采样成本。几项改动组合后，才得到更好的精度-速度-物理一致性权衡。

#### 🧪 练习题
```yaml
question: "EquiformerV3 的 SwiGLU-S² activation 相比 EquiformerV2 的普通 S² activation，关键优势是什么？"
options:
  - "完全取消等变约束，从而提升速度"
  - "用标量非线性门控和 grid feature 乘法引入 many-body 交互，同时减少保持严格等变所需的球面采样"
  - "只改变数据集切分，不改变模型结构"
  - "将所有力预测改为随机采样"
answer: 1
explain: "SwiGLU-S² 的乘法等价于一类 self tensor product，可提升 body-order 表达力；非线性只作用于标量门控，避免 grid 上高频误差，从而降低严格等变所需采样成本。"
```

### DigCat

```yaml
id: digcat
num: 30
name: DigCat
full_name: 数字催化AI智能体 (DigCat)
year: '2026.02'
org: 东北大学
parent: oc20
paper_url: https://www.miragenews.com/ai-identifies-key-characteristic-for-sustainable-fuel-catalysts/
project_url: ''
category: catalyst
motivation: 发现CO₂电还原铜基单原子合金设计原则
```

#### 📝 一句话总结
DigCat/Catalysis AI Agent 将大规模催化实验数据库、LLM 辅助假设生成和第一性原理计算串成闭环，用于解释 Cu 基单原子合金在 CO2 电还原中生成 C2+ 产物的选择性差异，并提出可快速筛选掺杂元素的结构描述符 \(\phi\)。

#### 🎯 核心要点
- **数据底座**：DigCat 平台整合电催化、热催化和光催化实验性能数据及催化剂结构数据；该 CO2RR 案例从文献中汇总约 50 篇研究、约 80 个 C2+ 法拉第效率数据点和 29 种 Cu 基 SAA 掺杂元素
- **Agent 作用**：Catalysis AI Agent 先从 DigCat 实验统计中定位研究目标，再建议把理论计算集中到 C-C 偶联限速步骤和掺杂元素分类上
- **理论筛选对象**：围绕 Cu 基单原子合金 \(M_1/Cu(111)\)，比较 CO*、CHO* 等 C-C 偶联前驱体在掺杂金属位 \(M\) 与邻近 Cu 位 \(Cu_1\) 上的吸附和偶联势垒
- **能量描述符**：用 \(E_{\mathrm{ads}}(CO_M^*)-E_{\mathrm{ads}}(CO_{Cu1}^*)\) 或 \(E_{\mathrm{ads}}(CHO_M^*)-E_{\mathrm{ads}}(CHO_{Cu1}^*)\) 把 SAA 分成 5 类线性趋势
- **结构描述符**：提出 \(\phi=|10-N-X+Y|\)，其中 \(N\) 是元素族/列号，\(X\) 是 Pauling 电负性，\(Y\) 是对半满或全满 d 轨道元素的修正
- **设计原则**：\(\phi\) 将电子结构、前驱体吸附强度、C-C 偶联势垒和实验 C2+ 法拉第效率连接起来，用于定性预测高选择性 Cu 基 SAA
- **验证路径**：设计原则不仅解释既有文献趋势，还被用于稀土元素、双单原子合金和实验合成验证
- **来源限制**：任务给出的 URL 是新闻页；可追溯论文为 Angew. Chem. Int. Ed. 2026, 65, e24612，DOI: https://doi.org/10.1002/anie.202524612

#### 🔬 深入细节
##### 图示与可访问来源

![DigCat 辅助 Cu 基 SAA 设计流程](https://www.tohoku.ac.jp/en/press/images/397_ai_agent_accelerates_catalyst_discovery_for_sustainable_fuel_development_fig1.jpg)
*图：智能设计流程。左侧从 DigCat 实验数据出发，中间由 Catalysis AI Agent 辅助构造描述符，右侧将通用设计原则用于催化剂筛选和定向合成。*

可访问来源：Tohoku University 新闻稿 https://www.tohoku.ac.jp/en/press/ai_agent_accelerates_catalyst_discovery_for_sustainable_fuel_development.html；EurekAlert 图页 https://www.eurekalert.org/multimedia/1122101；论文 DOI https://doi.org/10.1002/anie.202524612；DigCat 平台说明 https://www.li-lab-cat-design.com/digcat-platform.html。

##### 算法伪代码

```python
# DigCat / Catalysis AI Agent assisted catalyst-design workflow
def digcat_design_cu_saa(digcat_database, dopants):
    # 1. Mine literature-scale experimental CO2RR records
    records = query(
        digcat_database,
        reaction="CO2 reduction",
        catalyst_family="Cu-based single-atom alloy",
        target_product="C2+",
    )
    fe_table = normalize_faradaic_efficiency(records)

    # 2. Agent proposes mechanistic focus from experimental trends
    hypothesis = catalysis_agent.reason(
        data=fe_table,
        question="What controls C2+ selectivity in Cu-based SAAs?",
    )
    # Focus on dopant classification and C-C coupling RDS

    results = []
    for M in dopants:
        surface = build_surface(host="Cu(111)", dopant=M)
        barriers = []
        for path in c_c_coupling_paths(surface):
            # DFT transition-state calculation for CO*/CHO* coupling
            barriers.append(compute_activation_barrier(path))

        ea_c2 = min(barriers)
        dE_CO = E_ads(surface, "CO*", site="M") - E_ads(surface, "CO*", site="Cu1")
        dE_CHO = E_ads(surface, "CHO*", site="M") - E_ads(surface, "CHO*", site="Cu1")
        phi = structural_descriptor(M)
        results.append((M, ea_c2, dE_CO, dE_CHO, phi))

    # 3. Agent + researchers classify dopants and fit descriptor trends
    groups = classify_by_adsorption_behavior(results)
    design_rule = fit_linear_trends(groups, x="phi", y="Ea_C2+")
    candidates = screen_high_selectivity_saas(design_rule, dopants)
    return design_rule, candidates
```

##### 方法机制：Agent 不是替代 DFT，而是决定算什么

这个工作不是简单地训练一个端到端黑箱模型预测催化剂性能。它的关键在于把三类信息分层使用：DigCat 提供实验统计，Catalysis AI Agent 负责从统计结果中提出可检验的研究路线，第一性原理计算负责给出可物理解释的能垒和吸附能。公开论文与新闻稿显示，Agent 的第一步判断是：C2+ 选择性不能只看某个单一产物或副反应抑制，而应关注乙烯、乙醇等多碳产物路径在 C-C 偶联阶段的分化。

实验端用法拉第效率衡量选择性。对某个产物 \(i\)，可写为：

$$
FE_i=\frac{z_i F n_i}{Q}
$$

其中 \(z_i\) 是生成 1 mol 产物需要转移的电子数，\(F\) 是法拉第常数，\(n_i\) 是产物物质的量，\(Q\) 是总电荷。论文关心的是 \(FE(C2+)\)，即所有多碳产物的总选择性。DigCat 从文献中汇总不同掺杂元素对应的 \(FE(C2+)\)，但这些数据本身带有反应器、电解质、电位和材料制备差异，因此需要理论描述符来抽取更稳定的规律。

##### C-C 偶联势垒与能量描述符

Cu 基 SAA 表面同时有掺杂金属位 \(M\) 和邻近铜位 \(Cu_1\)。CO2RR 到 C2+ 的核心难点是 C-C 键形成，常见前驱体包括 CO* 与 CHO*。一个简化的选择性代理量可以写成：

$$
E_{a-C2+}(M)=\min_{p\in\mathcal{P}_{C-C}}\max_j \Delta G_{p,j}^{\ddagger}(M)
$$

其中 \(\mathcal{P}_{C-C}\) 是候选 C-C 偶联路径集合，\(\Delta G_{p,j}^{\ddagger}\) 是路径 \(p\) 上第 \(j\) 个关键步骤的活化自由能。直觉是：如果某个掺杂元素能显著降低最有利 C-C 偶联路径的限速势垒，那么它更可能提高 C2+ 选择性。

吸附能按常规定义为：

$$
E_{\mathrm{ads}}(X^*)=
E_{\mathrm{surface}+X}-E_{\mathrm{surface}}-E_X
$$

论文进一步比较同一前驱体在 \(M\) 位和 \(Cu_1\) 位上的相对吸附强度：

$$
\Delta E_{CO}=E_{\mathrm{ads}}(CO_M^*)-E_{\mathrm{ads}}(CO_{Cu1}^*)
$$

$$
\Delta E_{CHO}=E_{\mathrm{ads}}(CHO_M^*)-E_{\mathrm{ads}}(CHO_{Cu1}^*)
$$

这两个差分描述符比单点吸附能更适合 SAA：它们直接描述掺杂位相对邻近 Cu 位是否更容易抓住 CO*/CHO*，从而决定是对称偶联、非对称偶联还是 spectator 型机制更可能发生。Agent 提出的“先按掺杂元素化学性质分类”使不同族元素不再被强行拟合同一条线，而是形成 5 类更清晰的线性趋势。

##### 结构描述符 \(\phi\)

能量描述符依赖 DFT；为了快速筛选，还需要只从元素表即可计算的结构描述符。论文基于 10 电子规则、电负性和 d 电子构型修正提出：

$$
\phi = |10-N-X+Y|
$$

其中 \(N\) 是掺杂元素在周期表中的列号，\(X\) 是 Pauling 电负性，\(n\) 是价层 d 电子数。对 Cr、Mn、Fe 以及 Pd、Pt 等半满或全满 d 轨道相关异常元素，使用修正项：

$$
Y=8-n
$$

其他元素 \(Y=0\)。当 \(N>10\) 时，论文给出的形式为：

$$
\phi=|10-X+Y|
$$

这个描述符的作用链条是：

$$
\phi \rightarrow E_{\mathrm{ads}}(CO_M^*) \rightarrow E_{a-C2+} \rightarrow FE(C2+)
$$

也就是说，\(\phi\) 不是直接拟合实验产率的任意统计量，而是先解释 CO*/CHO* 前驱体吸附，再间接解释 C-C 偶联势垒和宏观选择性。公开图 3 显示结构描述符对 CO* 吸附强度可达到较高线性相关，新闻稿和论文摘要也强调该原则被大部分已有实验文献和实验验证支持。

##### 与传统催化筛选的区别

传统 DFT 高通量筛选常从预设反应网络出发，对所有候选材料机械计算同一组中间体和过渡态。这里的差别在于，Agent 先从实验数据库发现“应该把注意力放在哪里”：不是泛泛讨论所有 CO2RR 中间体，而是把计算资源集中到 C-C 偶联限速步骤，并指出掺杂元素分类是建立稳定相关性的前提。

这带来两个实际价值。第一，计算量下降，因为研究者不必对所有副反应和路径做同等深度扫描。第二，解释性增强，因为最终规则能落在周期表列号、电负性、d 电子数这些化学量上。这样的结果比“模型预测某元素好”更有用：它告诉研究者为什么某类元素可能推动 CO2RR 向 C2+ 方向移动。

##### 局限与适用边界

该案例仍然依赖人类定义问题、清洗数据、选择 DFT 模型并解释物理含义。公开评论指出，Agent 更像研究策略的共同设计者，而不是完全自主的科学家。当前框架主要聚焦 C-C 偶联，并以相对简化方式处理电化学界面、电场、溶剂、局部 pH 和传质效应。因此，\(\phi\) 更适合做候选材料的快速定性排序，后续仍需显式界面模型、微观动力学和实验验证来确定真实器件条件下的性能。

> 💡 关键：DigCat 的方法价值在于“数据统计 → Agent 提问 → DFT 验证 → 可计算描述符 → 实验反馈”的闭环，而不是把催化设计交给一个不可解释的单步预测器。

#### 🧪 练习题
```yaml
question: "DigCat/Catalysis AI Agent 在 Cu 基 SAA CO2RR 案例中的核心作用是什么？"
options:
  - "直接用 LLM 生成最终催化剂结构，完全跳过 DFT 和实验验证"
  - "从 DigCat 实验统计中提出研究重点，并辅助建立掺杂元素分类和结构描述符"
  - "只做网页问答系统，不参与催化机理分析"
  - "用固定距离截断构建催化剂图神经网络"
answer: 1
explain: "该工作把 Agent 用于研究路线规划和相关性发现，再结合 DFT 与实验验证形成描述符和设计原则；它不是跳过物理计算的端到端生成器。"
```

### MoleculeNet

```yaml
id: moleculenet
num: 31
name: MoleculeNet
full_name: 分子性质预测基准 (MoleculeNet)
year: '2018'
org: Stanford University
parent: —
paper_url: https://pubs.rsc.org/en/content/articlelanding/2018/sc/c7sc02664a
project_url: ''
category: property
motivation: 化学AI的ImageNet，多维度标准数据集
```

#### 📝 一句话总结
MoleculeNet 不是单个预测模型，而是为分子机器学习建立统一的数据集、划分方式、评价指标、特征化器和基线模型，使分子性质预测从“各算各的”变成可复现实验比较。

#### 🎯 核心要点
- **基准定位**：面向分子机器学习的 ImageNet 式基准，解决不同论文使用不同数据、split 和 metric 导致不可比较的问题
- **数据覆盖**：论文版本整理 17 个公开数据集、超过 70 万个化合物，覆盖量子力学、物理化学、生物物理和生理/毒理四类性质
- **统一入口**：所有数据集集成到 DeepChem 的 MolNet/`deepchem.molnet` 加载接口中，支持标准化下载、特征化、划分和变换
- **标准 split**：默认训练/验证/测试比例为 80/10/10，并提供 random、scaffold、stratified 和 time split
- **推荐 metric**：回归任务使用 MAE/RMSE，分类任务使用 ROC-AUC 或 PRC-AUC；高度类别不平衡任务更强调 PRC-AUC
- **特征化器集合**：实现 ECFP4、Coulomb Matrix、Grid Featurizer、Symmetry Function、Graph Convolution 和 Weave 等分子表示
- **基线模型集合**：比较 Logistic Regression、SVM/KRR、Random Forest、Gradient Boosting、Multitask Network、IRV、GraphConv、Weave、DAG、DTNN、ANI-1、MPNN 等方法
- **关键结论**：可学习图表示整体很强，但在小数据、强类别不平衡、量子力学和蛋白-配体任务中，物理感知特征和合适 split 往往比单纯换模型更重要

#### 🔬 深入细节
##### 图示与可访问来源

![MoleculeNet 数据集任务层级](https://pubs.rsc.org/image/article/2018/sc/c7sc02664a/c7sc02664a-f2_hi-res.gif)
*图：MoleculeNet Figure 2。不同数据集覆盖从原子/分子量子性质到药物体内影响的多层级分子性质。*

可访问来源：RSC Open Access 论文页 https://pubs.rsc.org/en/content/articlelanding/2018/sc/c7sc02664a；arXiv 页面 https://arxiv.org/abs/1703.00564；RSC Figure 1 图像 https://pubs.rsc.org/image/article/2018/sc/c7sc02664a/c7sc02664a-f1_hi-res.gif。

##### 算法伪代码

```python
# MoleculeNet-style benchmark protocol
def run_moleculenet_benchmark(dataset_name, featurizer, splitter, model, metric):
    # 1. Load curated molecules and task labels
    tasks, raw_dataset, transformers = molnet_load(dataset_name)

    # 2. Convert SMILES / coordinates / protein-ligand structures to model inputs
    X = featurizer.featurize(raw_dataset.molecules)
    y = raw_dataset.labels
    masks = raw_dataset.label_masks

    # 3. Split by a protocol appropriate for chemistry
    train, valid, test = splitter.train_valid_test_split(
        X, y, masks, frac_train=0.8, frac_valid=0.1, frac_test=0.1
    )

    # 4. Fit hyperparameters on validation set only
    best_model = None
    best_valid = -float("inf")
    for params in hyperparameter_grid(model):
        candidate = model(**params)
        candidate.fit(train)
        score = evaluate(candidate, valid, metric, transformers)
        if score > best_valid:
            best_valid = score
            best_model = candidate

    # 5. Report final held-out test score with the recommended metric
    test_score = evaluate(best_model, test, metric, transformers)
    return test_score
```

##### 为什么需要 MoleculeNet

化学机器学习的难点不是只有模型结构。分子数据通常昂贵、稀疏、异质，而且任务跨度很大：QM9 预测量子化学性质，ESOL 预测水溶解度，PDBbind 预测蛋白-配体亲和力，Tox21/ToxCast/ClinTox 预测毒理或临床风险。如果每篇论文只挑自己方便的数据子集、随机划分和评价指标，模型间结论很容易互相矛盾。

MoleculeNet 的核心贡献是把评估协议显式化。一个数据集被定义为：

$$
\mathcal{D}=\{(x_i, y_i, m_i)\}_{i=1}^{N}
$$

其中 \(x_i\) 是分子结构或复合物结构，\(y_i\) 是单任务或多任务标签，\(m_i\) 是标签是否缺失的 mask。标准划分为：

$$
\mathcal{D}=\mathcal{D}_{train}\cup\mathcal{D}_{valid}\cup\mathcal{D}_{test},\quad
|\mathcal{D}_{train}|:|\mathcal{D}_{valid}|:|\mathcal{D}_{test}|=8:1:1
$$

训练集用于拟合参数，验证集用于调超参数，测试集只用于最终报告。这个约束看似普通，但对分子任务非常重要，因为随机划分会把相似骨架分子同时放进训练和测试，夸大泛化能力。

##### Split：化学泛化比随机泛化更难

MoleculeNet 提供多种 split：

- **Random split**：随机划分样本，适合快速 sanity check，但可能泄漏相似 scaffold
- **Scaffold split**：按 Bemis-Murcko scaffold 分组，让结构骨架不同的分子进入不同集合，更接近药物发现中的 scaffold hopping
- **Stratified split**：在 QM7 等回归任务中按标签排序后均匀抽样，使各集合覆盖相似标签范围
- **Time split**：在 PDBbind 等带时间信息的数据中，用旧数据训练、新数据测试，模拟真实模型部署

Scaffold split 是 MoleculeNet 对后续分子图学习影响最大的实践之一。许多模型在 random split 上差距不大，但在 scaffold split 上性能明显下降，这说明模型未必学到了可迁移的化学规律。

##### Metric：类别不平衡时 PRC-AUC 更敏感

回归任务常用 MAE 和 RMSE：

$$
\mathrm{MAE}=\frac{1}{N}\sum_{i=1}^{N}|\hat{y}_i-y_i|
$$

$$
\mathrm{RMSE}=\sqrt{\frac{1}{N}\sum_{i=1}^{N}(\hat{y}_i-y_i)^2}
$$

分类任务常用 ROC-AUC 和 PRC-AUC。ROC 曲线横轴使用假阳性率：

$$
\mathrm{FPR}=\frac{FP}{FP+TN}
$$

PR 曲线使用 precision：

$$
\mathrm{Precision}=\frac{TP}{TP+FP}
$$

当阳性样本极少时，少量假阳性会显著拉低 precision，但对 FPR 的影响可能不明显。因此 MoleculeNet 建议对正例率很低的虚拟筛选类任务使用 PRC-AUC，对其他分类任务使用 ROC-AUC。这一点避免了模型在高度不平衡任务上“看起来 AUC 很高，但真正命中很少”的问题。

##### Featurization：同一任务可以比较固定特征和可学习表示

MoleculeNet 将分子表示也纳入基准，而不是只比较模型。典型特征包括：

- **ECFP4**：把以原子为中心的局部子结构迭代扩展后 hash 成固定长度二进制指纹
- **Coulomb Matrix**：用核电荷和原子间距离编码 3D 分子，适合量子化学任务
- **Grid Featurizer**：为蛋白-配体复合物构建空间网格，编码氢键、盐桥和 SPLIF 等相互作用
- **Symmetry Function**：用径向和角向对称函数描述局部原子环境，强调平移、旋转和置换不变性
- **Graph Convolution / Weave**：把原子作为节点、键或原子对作为边/对特征，支持图神经网络端到端学习

Coulomb Matrix 的核心定义是：

$$
M_{IJ}=
\begin{cases}
0.5 Z_I^{2.4}, & I=J \\
\frac{Z_I Z_J}{\|R_I-R_J\|}, & I\ne J
\end{cases}
$$

它天然对平移和旋转不变，但不自动对原子编号置换不变，因此论文还讨论了随机排序和展开等处理。这个例子说明 MoleculeNet 关注的是完整评估链路：表示选择、模型选择、split 和 metric 都会影响结论。

##### 基线模型与主要发现

MoleculeNet 同时评估传统方法和图模型。传统方法包括 Logistic Regression、SVM/KRR、Random Forest、Gradient Boosting、Multitask Network 和 IRV；图模型包括 Graph Convolution、Weave、DAG、DTNN、ANI-1 和 MPNN。这样做的好处是避免把“新模型变强”误判为“新特征、split 或调参变强”。

论文结论具有长期影响：可学习表示通常是强基线，尤其在有足够数据的分子性质预测中表现突出；但在数据稀缺、类别高度不平衡、量子力学和蛋白-配体结构任务中，物理先验特征、3D 几何和恰当指标仍然非常关键。换句话说，MoleculeNet 并没有宣称图神经网络总是赢，而是把“什么时候赢、在哪种 split 上赢、用什么 metric 赢”变成可检验问题。

##### 与普通数据库的区别

PubChem、ChEMBL、PDBbind 等数据库主要服务检索和知识沉淀；MoleculeNet 则服务机器学习评估。它要求每个任务都有明确输入、标签、推荐 split、推荐 metric、基线实现和可复现实验脚本。这个规范后来成为分子预训练、图神经网络、分子 Transformer 和 ADMET 预测论文的共同参照系。

> 💡 关键：MoleculeNet 的贡献不是“收集了很多分子”，而是规定了如何公平地用这些分子比较算法。

#### 🧪 练习题
```yaml
question: "为什么 MoleculeNet 在药物发现类任务中强调 scaffold split？"
options:
  - "它可以让训练和测试分子共享更多相同骨架，从而提高测试分数"
  - "它按分子骨架划分数据，更能检验模型对新化学骨架的泛化能力"
  - "它只适用于量子化学数据集，不适用于分类任务"
  - "它会自动把所有缺失标签补全"
answer: 1
explain: "Scaffold split 将结构骨架相似的分子分到同一集合，减少训练/测试间的相似性泄漏，因此比随机划分更接近真实药物发现中的新骨架预测。"
```

### AttentiveFP

```yaml
id: attentivefp
num: 32
name: AttentiveFP
full_name: 注意力指纹网络 (AttentiveFP)
year: '2020'
org: Tencent AI Lab
parent: moleculenet
paper_url: https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959
project_url: ''
category: property
motivation: 双层注意力机制提升ADMET预测可解释性
```

#### 📝 一句话总结
AttentiveFP 将分子表示学习写成“原子级图注意力消息传递 + 分子级注意力读出”的可微指纹生成过程，在提升多种药物发现性质预测表现的同时，用注意力权重提供可视化解释。

#### 🎯 核心要点
- **分子图输入**：原子作为节点、化学键作为边，输入包含原子特征和键特征
- **边特征初始化**：第一轮 GetContext 将源原子特征与键特征拼接，经注意力和 GRU 融入目标原子表示
- **原子级注意力**：后续多层 GNN 根据目标原子和邻居原子状态计算边注意力权重，只聚合与当前任务更相关的邻居信息
- **GRU 更新**：每一轮消息传递都用 GRUCell 更新原子隐藏状态，缓解深层传播中的信息覆盖问题
- **分子级读出**：以所有原子状态求和初始化图状态，再多步计算原子注意力权重并用 GRU 更新分子指纹
- **可解释性**：readout 阶段可返回每一步原子权重，用于可视化模型认为影响性质预测的关键原子或非局部相互作用
- **任务形式**：支持回归和分类；回归常用 MSE/MAE，分类输出 softmax 概率并可对缺失标签使用 mask
- **实验定位**：面向 MoleculeNet/ADMET 等药物发现相关任务，强调在性质预测中兼顾准确性和化学解释

#### 🔬 深入细节
##### 图示与可访问来源

![AttentiveFP 总体框架](https://ask.qcloudimg.com/http-save/yehe-8199873/ipr9ejvfq8.png)
*图：AttentiveFP 通过原子嵌入阶段的图注意力层和分子嵌入阶段的注意力读出层生成分子指纹。*

可访问来源：ACS DOI 页面 https://pubs.acs.org/doi/10.1021/acs.jmedchem.9b00959；OpenAIRE 摘要页 https://oamonitor.ireland.openaire.eu/national/search/publication?pid=10.1021%2Facs.jmedchem.9b00959；DeepChem 实现 https://github.com/deepchem/deepchem/blob/master/deepchem/models/torch_models/attentivefp.py；DGL-LifeSci 实现 https://github.com/awslabs/dgl-lifesci/blob/master/python/dgllife/model/model_zoo/attentivefp_predictor.py。ACS 正文页可能受访问限制，因此方法细节同时参考开放摘要和官方开源实现。

##### 算法伪代码

```python
# AttentiveFP molecular property prediction
def attentivefp_predict(graph, atom_features, bond_features, T_atom, T_graph):
    # Initial context: inject bond features into atom states
    h = linear_atom(atom_features)
    edge_repr = {}
    for (u, v, e_uv) in graph.edges:
        edge_repr[u, v] = linear_edge(concat(atom_features[u], bond_features[u, v]))
        logit[u, v] = score_init(concat(h[v], edge_repr[u, v]))
    alpha = edge_softmax_by_dst(logit)
    for v in graph.nodes:
        context = sum(alpha[u, v] * transform(edge_repr[u, v]) for u in N(v))
        h[v] = GRU(ELU(context), h[v])

    # Atom-level attentive message passing
    for _ in range(T_atom):
        for (u, v) in graph.edges:
            logit[u, v] = score_edge(concat(h[v], h[u]))
        alpha = edge_softmax_by_dst(logit)
        new_h = {}
        for v in graph.nodes:
            context = sum(alpha[u, v] * W_node(h[u]) for u in N(v))
            new_h[v] = GRU(ELU(context), h[v])
        h = new_h

    # Molecule-level attentive fingerprint readout
    g = sum(h[v] for v in graph.nodes)
    atom_weights = []
    for _ in range(T_graph):
        for v in graph.nodes:
            z[v] = score_readout(concat(ReLU(g), h[v]))
        beta = softmax_over_nodes(z)
        atom_weights.append(beta)
        context = sum(beta[v] * W_readout(h[v]) for v in graph.nodes)
        g = GRU(ELU(context), g)

    y_hat = linear(g)
    return y_hat, atom_weights
```

##### 原子级注意力消息传递

AttentiveFP 的输入分子图为 \(G=(V,E)\)。每个原子 \(v\in V\) 有初始特征 \(x_v\)，每条键 \((u,v)\in E\) 有键特征 \(e_{uv}\)。第一步不是直接丢弃键特征，而是把键和源原子拼接：

$$
\tilde{e}_{uv}=W_e[x_u\|e_{uv}]
$$

再结合目标原子投影表示计算边打分：

$$
s_{uv}= \mathrm{LeakyReLU}(a^\top[h_v\|\tilde{e}_{uv}])
$$

对同一目标节点的入边做 softmax：

$$
\alpha_{uv}=
\frac{\exp(s_{uv})}{\sum_{k\in\mathcal{N}(v)}\exp(s_{kv})}
$$

上下文向量为：

$$
c_v=\sum_{u\in\mathcal{N}(v)}\alpha_{uv}W\tilde{e}_{uv}
$$

原子状态用 GRU 更新：

$$
h_v'=\mathrm{GRU}(\mathrm{ELU}(c_v), h_v)
$$

这一步的直觉是：同一个原子周围的不同键和邻居对预测任务贡献不同，注意力权重让模型学习“看哪个邻居”，GRU 则决定保留多少旧状态、写入多少新上下文。

##### 多层 GNN：边注意力从键特征转向原子状态

初始化后，后续 GNN 层主要在原子表示之间传播。DGL-LifeSci 实现中，每条边的注意力打分来自目标原子与源原子隐藏状态拼接：

$$
s_{uv}^{(t)}=\mathrm{LeakyReLU}(a_t^\top[h_v^{(t)}\|h_u^{(t)}])
$$

聚合为：

$$
c_v^{(t)}=\sum_{u\in\mathcal{N}(v)}
\alpha_{uv}^{(t)}W_t h_u^{(t)}
$$

再更新：

$$
h_v^{(t+1)}=\mathrm{GRU}(\mathrm{ELU}(c_v^{(t)}), h_v^{(t)})
$$

与普通 GCN 的均匀聚合或固定归一化不同，AttentiveFP 对每个目标原子的邻居动态分配权重。例如在溶解度或毒性预测中，模型可以把更高权重放在极性基团、芳香环、卤素取代位或特定官能团相互作用上，而不是平均所有邻居。

##### 分子级 readout：虚拟分子状态与原子权重

图级表示先用原子状态求和初始化：

$$
g^{(0)}=\sum_{v\in V} h_v^{(T)}
$$

随后每个 readout step 都让当前分子状态 \(g^{(r)}\) 反过来查询所有原子：

$$
z_v^{(r)}=f([ \mathrm{ReLU}(g^{(r)}) \| h_v^{(T)} ])
$$

$$
\beta_v^{(r)}=
\frac{\exp(z_v^{(r)})}{\sum_{k\in V}\exp(z_k^{(r)})}
$$

图上下文为：

$$
m^{(r)}=\sum_{v\in V}\beta_v^{(r)}W_g h_v^{(T)}
$$

并用 GRU 更新分子指纹：

$$
g^{(r+1)}=\mathrm{GRU}(\mathrm{ELU}(m^{(r)}), g^{(r)})
$$

这个双层注意力是 AttentiveFP 与许多早期分子 GNN 的主要区别。原子级注意力决定局部消息怎么传，分子级注意力决定最终指纹应该关注哪些原子。readout 返回的 \(\beta_v^{(r)}\) 就是可视化解释的基础。

##### 训练目标与缺失标签

对回归任务，AttentiveFP 可使用标准 MSE：

$$
\mathcal{L}_{reg}=
\frac{1}{B}\sum_{i=1}^{B}
\|\hat{y}_i-y_i\|_2^2
$$

对多任务分类，常见形式是带 mask 的交叉熵：

$$
\mathcal{L}_{cls}=
-\frac{1}{\sum_{i,k}m_{ik}}
\sum_{i=1}^{B}\sum_{k=1}^{K}m_{ik}
\sum_{c}y_{ikc}\log p_{ikc}
$$

其中 \(m_{ik}=0\) 表示第 \(i\) 个分子在第 \(k\) 个任务上标签缺失，不参与损失。这个设计对 MoleculeNet 的毒性和 ADMET 任务很关键，因为多任务生物测定数据常常标签不完整。

##### 可解释性的边界

论文摘要强调 AttentiveFP 的特征可视化可揭示任务相关的非局部分子内相互作用。实现层面，模型确实可以返回 readout 阶段的原子权重，用颜色映射到分子结构上。但注意力权重并不等价于严格因果解释：高权重说明该原子对当前前向预测贡献大，不必然说明化学实验中改变该原子一定导致同方向性质变化。因此更稳妥的用法是把注意力图作为假设生成工具，再结合子结构消融、反事实编辑或实验验证。

##### 与 MoleculeNet 关系

AttentiveFP 属于 MoleculeNet 之后的分子图学习模型：MoleculeNet 定义了数据、split 和评价指标，AttentiveFP 则在这个评估范式下改进分子表示。它继承了 MPNN 的消息传递思想，但在两个位置引入注意力和 GRU，使模型能在局部邻域和全局指纹两级选择性聚合信息。

> 💡 关键：AttentiveFP 的“FP”不是手工 fingerprint，而是由图注意力和 GRU 从分子图中端到端生成的任务相关指纹。

#### 🧪 练习题
```yaml
question: "AttentiveFP 中分子级 readout 注意力的主要作用是什么？"
options:
  - "把所有原子按固定权重平均，避免任何可解释性"
  - "根据当前分子状态为原子分配权重，迭代更新图级分子指纹"
  - "只编码键长和键角，不使用原子特征"
  - "替代训练损失函数，使模型无需标签"
answer: 1
explain: "AttentiveFP readout 用当前图状态查询原子状态，经 softmax 得到原子权重，再用 GRU 更新分子指纹；这些权重也可用于可视化解释。"
```

### ADMETPred

```yaml
id: admetpred
num: 33
name: ADMETPred
full_name: 高通量ADMET预测平台 (ADMETPred)
year: '2026.03'
org: 中国科学院
parent: attentivefp
paper_url: https://link.springer.com/article/10.1007/s11427-025-3166-8
project_url: ''
category: property
motivation: 集成多模型与可解释子结构识别
```

#### 📝 一句话总结
ADMETPred 提出了一个面向早期药物发现的高通量 ADMET 预测平台，把 LightGBM、XGBoost、Random Forest 与 GAT 组成多模型池，并用注意力驱动的子结构高亮把“预测结果”连接到“结构优化线索”。

#### 🎯 核心要点
- **189 个预测模型覆盖 27 个 ADMET 终点**：基于 120,616 个严格整理的小分子数据，覆盖吸收、分布、代谢、排泄与毒性相关任务
- **四类模型协同**：树模型负责处理 RDKit 描述符、指纹和表格化特征，GAT 直接在分子图上学习原子和键的局部拓扑贡献
- **高通量平台化流程**：支持批量 SMILES 输入、并行推理、端点选择、算法选择和结果表格输出，降低大规模虚拟筛选中的 ADMET 评估成本
- **注意力解释模块**：利用 GAT 的原子邻域注意力权重定位与预测端点强相关的子结构，为毒性规避或 ADME 性质优化提供可视化线索
- **补充材料报告 PCA 消融**：不使用 PCA 的模型平均表现优于 PCA 降维版本，分类任务 AUC 从 0.694 提升到 0.728，回归任务 \(R^2\) 从 0.440 提升到 0.566
- **应用案例面向真实决策**：论文摘要报告了上市后药物安全监测、天然产物毒性筛选和先导化合物临床前安全评估案例，并与实验或临床证据保持一致

#### 🔬 深入细节
##### 来源与图示

![ADMETPred 平台框架](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11427-025-3166-8/MediaObjects/11427_2025_3166_Fig1_HTML.jpg)
*图：Springer 页面公开的 ADMETPred Figure 1。左侧是 GAT、Random Forest、LightGBM、XGBoost 多模型集成，中间是可解释子结构高亮，右侧是 27 个 ADMET 端点和 189 个预测模型的输出概览。*

> ⚠️ 来源限制：Springer 正文当前只开放摘要、Figure 1、数据可用性和补充材料入口；方法级细节主要来自公开摘要、平台首页和可访问补充材料。补充材料给出了 RF、LightGBM、XGBoost、GAT 的实现说明、GAT 关键公式、PCA 消融表和 RDKit 描述符列表。

##### 算法伪代码

```python
# ADMETPred 的端到端预测流程伪代码
def admetpred(smiles_batch, selected_endpoints, selected_models=None):
    molecules = [standardize_and_validate(s) for s in smiles_batch]

    # 1. 生成两类输入表示
    descriptor_x = rdkit_descriptors_and_fingerprints(molecules)
    graph_x = molecular_graphs(molecules)  # atoms, bonds, atom features, edge features

    results = {}
    explanations = {}
    for endpoint in selected_endpoints:
        model_pool = load_models(endpoint)  # LightGBM, XGBoost, RF, GAT variants
        if selected_models is not None:
            model_pool = filter_models(model_pool, selected_models)

        endpoint_preds = []
        endpoint_scores = []
        for model in model_pool:
            if model.family in {"LightGBM", "XGBoost", "RandomForest"}:
                pred = model.predict(descriptor_x)
            else:  # GAT
                pred, attn = model.predict_with_attention(graph_x)
                explanations[endpoint] = highlight_substructures(molecules, attn)
            endpoint_preds.append(pred)
            endpoint_scores.append(model.validation_score)

        # 2. 可按验证性能选择最优模型，也可保留多模型输出供平台展示
        results[endpoint] = aggregate_or_select(endpoint_preds, endpoint_scores)

    # 3. 批量导出端点矩阵与 GAT 子结构解释
    return format_admet_table(results), explanations
```

##### 为什么需要多模型 ADMET 预测

ADMET 任务很难用单一模型统一解决。不同端点的标签来源、数据规模、类别比例和物理含义差异很大：有些是二分类毒性风险，有些是连续药代动力学指标，有些强依赖局部官能团，有些更依赖全分子疏水性、极性表面积或环系复杂度。单一深度模型容易在小数据端点上过拟合，单一树模型又难以显式建模分子图的局部相互作用。

ADMETPred 的工程选择是把问题拆成“端点级模型池”。对每个端点 \(e\)，平台维护多个候选模型：

$$
\mathcal{M}_e=\{f_{e,1}^{\mathrm{LGBM}}, f_{e,2}^{\mathrm{XGB}}, f_{e,3}^{\mathrm{RF}}, f_{e,4}^{\mathrm{GAT}}, \ldots\}
$$

预测时输入分子 \(x\) 既被转换为描述符向量 \(\phi(x)\)，也被转换为图 \(G=(V,E)\)。树模型读取 \(\phi(x)\)，GAT 读取原子节点和化学键邻接关系。平台可按端点、模型和特征表示组织推理结果，因此适合批量筛选时同时输出多个 ADMET 风险维度。

##### 树模型分支：稳定处理表格化分子特征

补充材料列出的描述符覆盖分子量、LogP、TPSA、氢键供受体、可旋转键、环数、EState/VSA、BCUT2D、MQNs、SMARTS 片段等 RDKit 特征。对于这类高维但样本量有限的 QSAR 表格数据，树模型有三个实际优势：

- Random Forest 通过 bootstrap 和随机特征选择降低方差，适合噪声标签和非线性特征交互
- XGBoost 通过二阶梯度和正则化控制树复杂度，适合需要稳健泛化的端点
- LightGBM 使用直方图分桶和 leaf-wise 生长，适合大规模批量训练与高维稀疏特征

梯度提升树的统一目标可以写成：

$$
\mathcal{L}_{\mathrm{boost}} =
\sum_{i=1}^{n}\ell(y_i,\hat{y}_i)
+\sum_{k=1}^{K}\Omega(f_k)
$$

其中 \(\ell\) 是分类交叉熵或回归误差，\(\Omega(f_k)\) 惩罚树的叶子数和叶子权重，防止模型只记住训练集中的局部化学模式。

##### GAT 分支：从分子图中学习可解释子结构

GAT 将分子看作原子节点图。对原子 \(i\)，模型先计算邻居 \(j\) 对它的注意力权重：

$$
\alpha_{ij} =
\frac{\exp(\mathrm{LeakyReLU}(\mathbf{a}^{\top}[\mathbf{W}\mathbf{h}_i \Vert \mathbf{W}\mathbf{h}_j]))}
{\sum_{k\in\mathcal{N}(i)} \exp(\mathrm{LeakyReLU}(\mathbf{a}^{\top}[\mathbf{W}\mathbf{h}_i \Vert \mathbf{W}\mathbf{h}_k]))}
$$

再按注意力聚合邻域信息：

$$
\mathbf{h}'_i =
\sigma\left(\sum_{j\in\mathcal{N}(i)}\alpha_{ij}\mathbf{W}\mathbf{h}_j\right)
$$

这里的关键不只是预测准确率。因为 \(\alpha_{ij}\) 是归一化后的邻域贡献，平台可以把原子或键级权重映射回二维分子结构图，标出对某个 ADMET 端点最敏感的片段。例如一个预测为高毒性风险的分子，若芳香硝基、亲电受体或特定杂环附近权重较高，药物化学家就能把模型输出转化为候选改造位点。

##### 为什么不只做降维后的通用模型

补充材料的 PCA 消融显示，降维会损失 ADMET 端点所需的细粒度结构信息。平均而言，未降维模型在回归任务上 \(R^2=0.566\)，PCA 版本为 \(0.440\)；分类任务 AUC 为 \(0.728\)，PCA 版本为 \(0.694\)。这说明大量化学描述符中存在端点相关的局部信号，简单压缩到主成分空间会削弱模型识别罕见但重要子结构的能力。

> 💡 关键：ADMETPred 的“集成”不是把所有分子塞进一个黑盒模型，而是把端点、特征表示和算法族解耦；树模型提供稳健的表格特征建模，GAT 提供结构敏感预测和注意力解释。

##### 与传统 ADMET 工具的区别

传统在线 ADMET 工具通常存在三个瓶颈：端点覆盖有限、批量处理吞吐不足、预测结果难以解释。ADMETPred 的论文摘要明确把改进点放在三件事上：多算法协同提升准确率，并行架构提升高通量处理能力，可定制工作流提升端点和模型选择灵活性。其注意力子结构模块尤其重要，因为早期药物发现不是只需要“是否有风险”的标签，还需要知道“该改哪里”。

平台化设计也影响使用方式。研究者可以对一个候选库一次性输出 \(N_{\mathrm{mol}}\times 27\) 的 ADMET 矩阵，再按端点阈值过滤；对少数高价值分子，则进一步查看 GAT 高亮结构，判断风险来自可替换片段还是核心药效团。这样 ADMET 预测从单点打分变成了可嵌入虚拟筛选和 lead optimization 的决策节点。

#### 🧪 练习题
```yaml
question: "ADMETPred 中注意力驱动子结构高亮的主要作用是什么？"
options:
  - "把所有 ADMET 端点合并成一个总分"
  - "根据 GAT 的原子邻域注意力权重，把预测风险映射回可能相关的分子片段"
  - "用 PCA 压缩分子描述符以减少端点数量"
  - "只保留 Random Forest 的预测结果"
answer: 1
explain: "GAT 的注意力权重反映邻域原子对端点预测的相对贡献，映射回分子结构后可作为药物化学结构优化线索。"
```
