---
domain: ai4sci
topic_id: ai4material
topic_name: 材料学AI
page_icon: 🧪
page_title: 材料学AI 算法总结
page_subtitle: '{build_date} 版'
page_desc: AI在晶体结构预测、性质预测及新材料发现领域的演进脉络
hero_pills:
- 材料发现 · 结构预测
count_pill: '{count} 个算法'
categories:
  gnn_representation:
    label: 图神经网络表征
    color: '#22a06b'
  structure_prediction:
    label: 晶体结构预测
    color: '#0065ff'
  mlip:
    label: 机器学习原子间势
    color: '#ff8b00'
  property_prediction:
    label: 性质预测
    color: '#9c27b0'
  foundation_model:
    label: 基础模型/LLM
    color: '#e91e63'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4material/overview/zhihu__北京大学张锦院士团队Chem._Rev.：面向材料科学的人工智能__a2eb40c8/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4material/latest/zhihu__56｜AI4Science篇：语言模型能造出常温超导吗？——蛋白质、材料与数学的发现范式__be044594/article.md

## 算法演化关系

```yaml
nodes:
- id: schnet
  x: 430
  y: 100
  category: gnn_representation
- id: cgcnn
  x: 460
  y: 100
  category: gnn_representation
- id: megnet
  x: 490
  y: 100
  category: gnn_representation
- id: dimenet
  x: 520
  y: 100
  category: gnn_representation
- id: alignn
  x: 550
  y: 100
  category: gnn_representation
- id: painn
  x: 550
  y: 100
  category: gnn_representation
- id: gemnet
  x: 550
  y: 100
  category: gnn_representation
- id: equiformer
  x: 610
  y: 100
  category: gnn_representation
- id: uspex
  x: 100
  y: 250
  category: structure_prediction
- id: calypso
  x: 280
  y: 250
  category: structure_prediction
- id: cdvae
  x: 550
  y: 250
  category: structure_prediction
- id: diffcsp
  x: 640
  y: 250
  category: structure_prediction
- id: flowmm
  x: 640
  y: 250
  category: structure_prediction
- id: mattergen
  x: 670
  y: 250
  category: structure_prediction
- id: m3gnet
  x: 580
  y: 400
  category: mlip
- id: mace
  x: 580
  y: 400
  category: mlip
- id: chgnet
  x: 610
  y: 400
  category: mlip
- id: orb
  x: 640
  y: 400
  category: mlip
- id: esen
  x: 670
  y: 400
  category: mlip
- id: matminer
  x: 460
  y: 550
  category: property_prediction
- id: modnet
  x: 550
  y: 550
  category: property_prediction
- id: anisonet
  x: 670
  y: 550
  category: property_prediction
- id: e2gnn
  x: 670
  y: 550
  category: property_prediction
- id: gnome
  x: 610
  y: 700
  category: foundation_model
- id: crystallm
  x: 640
  y: 700
  category: foundation_model
- id: matllmsearch
  x: 670
  y: 700
  category: foundation_model
- id: mattersim_mt
  x: 700
  y: 700
  category: foundation_model
- id: llema
  x: 700
  y: 700
  category: foundation_model
edges:
- from: schnet
  to: cgcnn
  label: 周期性建模
- from: cgcnn
  to: megnet
  label: 全局状态
- from: schnet
  to: dimenet
  label: 方向性
- from: cgcnn
  to: alignn
  label: 线图表征
- from: schnet
  to: painn
  label: 等变性
- from: dimenet
  to: gemnet
  label: 对称性
- from: mace
  to: equiformer
  label: Transformer
- from: uspex
  to: calypso
  label: 群智能
- from: cdvae
  to: diffcsp
  label: 坐标扩散
- from: cdvae
  to: flowmm
  label: 流匹配
- from: diffcsp
  to: mattergen
  label: 逆向设计
- from: megnet
  to: m3gnet
  label: 通用势
- from: gemnet
  to: mace
  label: 高阶等变
- from: m3gnet
  to: chgnet
  label: 电荷感知
- from: mace
  to: orb
  label: GPU加速
- from: mace
  to: esen
  label: 光滑势面
- from: matminer
  to: modnet
  label: 小样本
- from: equiformer
  to: anisonet
  label: 张量预测
- from: equiformer
  to: e2gnn
  label: 效率优化
- from: m3gnet
  to: gnome
  label: 主动学习
- from: crystallm
  to: matllmsearch
  label: 智能搜索
- from: chgnet
  to: mattersim_mt
  label: 多任务
- from: matllmsearch
  to: llema
  label: 演化引导
milestones:
- cgcnn
- gnome
- mattersim_mt
```

## 核心算法

### SchNet

```yaml
id: schnet
num: 1
name: SchNet
full_name: 连续过滤器卷积网络 (Continuous-filter Convolutional NN)
year: '2017'
org: TU Berlin
parent: —
paper_url: https://proceedings.neurips.cc/paper/2017/hash/303ed4c69846ab36c2904d3ba8573050-Abstract.html
project_url: ''
category: gnn_representation
motivation: 连续过滤器处理非网格原子位置
```

#### 📝 一句话总结
SchNet 提出 continuous-filter convolution，将卷积滤波器从固定网格推广到由原子间连续距离动态生成的滤波器，解决分子/材料原子位置不在规则网格上而又需要平滑、旋转不变能量面和能量守恒力场的问题。

#### 🎯 核心要点
- **连续过滤器卷积 cfconv**：滤波器 \(W(\mathbf{r}_i-\mathbf{r}_j)\) 由神经网络根据相对位置生成，而不是在图像网格上使用固定卷积核
- **原子类型 embedding**：每个原子以核电荷 \(Z_i\) 的可学习向量 \(\mathbf{a}_{Z_i}\) 初始化，避免手工构造分子指纹
- **距离径向基展开**：用 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|\) 和 Gaussian radial basis 作为 filter network 输入，从结构上保证能量旋转不变
- **三层 interaction blocks**：每个 block 通过 atom-wise layers、cfconv 和残差连接更新原子表示，逐步形成多体相互作用表示
- **原子能量分解与池化**：最终对每个原子预测能量贡献并求和得到分子总能量，天然支持不同原子数的体系
- **力由能量梯度得到**：\(\hat{\mathbf{F}}_i=-\partial\hat{E}/\partial\mathbf{r}_i\)，使预测力场能量守恒且随旋转等变
- **平滑激活函数**：使用 shifted softplus \(\operatorname{ssp}(x)=\ln(0.5e^x+0.5)\)，保证势能面和力损失所需的高阶可微性
- **基准覆盖三类难度**：QM9 平衡分子性质、MD17 单分子动力学构象、论文提出的 ISO17 同时包含化学组成和构象变化

#### 🔬 深入细节
##### 图示与可访问来源

![SchNet 架构与 continuous-filter convolution](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 的整体架构、interaction block 和 filter-generating network。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1706.08566；arXiv 论文见 https://arxiv.org/abs/1706.08566；NeurIPS 页面见 https://proceedings.neurips.cc/paper/2017/hash/303ed4c69846ab36c2904d3ba8573050-Abstract.html。*

##### 问题背景：为什么普通卷积不适合原子体系

图像卷积假设信号在规则像素网格上，卷积核的每个权重对应固定相对偏移。但分子中的原子坐标是连续的三维点集，原子数可变，原子之间没有规则网格。若把原子密度插值到三维体素网格，会引入分辨率选择、插值误差和巨大稀疏体积；若只使用离散键类型或 one-hot 距离 bin，则势能面可能不连续，不适合几何优化和分子动力学。

SchNet 的核心是把“卷积核查表”改成“滤波器生成函数”。给定任意两个原子的相对位置，filter network 直接生成用于消息传递的连续滤波器权重。原子轻微移动时，距离和滤波器权重也连续变化，因此能量预测是平滑的。

##### Continuous-filter convolution 公式

设第 \(l\) 层有 \(n\) 个对象/原子的表示：

$$
X^l=(\mathbf{x}_1^l,\ldots,\mathbf{x}_n^l),\qquad
\mathbf{x}_i^l\in\mathbb{R}^{F}
$$

原子位置为：

$$
R=(\mathbf{r}_1,\ldots,\mathbf{r}_n),\qquad
\mathbf{r}_i\in\mathbb{R}^{3}
$$

连续过滤器卷积定义为：

$$
\mathbf{x}_{i}^{l+1}
=
(X^l * W^l)_i
=
\sum_j \mathbf{x}_j^l \circ W^l(\mathbf{r}_i-\mathbf{r}_j)
$$

\(\circ\) 表示逐通道乘法。与普通图消息传递相比，边权不是离散 bond type，而是由连续坐标差输入的 \(W^l\) 动态产生。为了保持旋转不变，SchNet 实际使用原子间距离：

$$
d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|
$$

再用 Gaussian radial basis 展开：

$$
e_k(d_{ij})=
\exp\left(-\gamma\|d_{ij}-\mu_k\|^2\right)
$$

论文设置 \(0\text{\AA}\leq \mu_k\leq 30\text{\AA}\)，间隔 \(0.1\text{\AA}\)，\(\gamma=10\)。这相当于把连续距离投影到平滑的径向基特征上，让 filter network 更容易学习不同距离范围的相互作用。

##### SchNet 架构：从原子 embedding 到总能量

每个原子以核电荷 embedding 初始化：

$$
\mathbf{x}_i^0=\mathbf{a}_{Z_i}
$$

然后通过多个 interaction block。一个 block 可以概括为：

$$
\mathbf{x}_i^{l+1}=\mathbf{x}_i^l+\mathbf{v}_i^l
$$

\(\mathbf{v}_i^l\) 由 atom-wise layer、cfconv、shifted softplus 和后续 atom-wise layers 计算。atom-wise layer 是对每个原子共享参数的全连接层：

$$
\mathbf{x}_i^{l+1}=W^l\mathbf{x}_i^l+\mathbf{b}^l
$$

共享参数保证模型对原子编号置换不敏感；cfconv 汇聚邻居几何信息；残差连接让多层相互作用能稳定训练。经过 interaction blocks 后，SchNet 为每个原子预测能量贡献 \(\hat{E}_i\)，总能量由求和得到：

$$
\hat{E}=\sum_{i=1}^{n}\hat{E}_i
$$

这种分解让模型可以处理不同大小的分子，也符合量子化学中能量可看作局部环境贡献聚合的建模直觉。

##### 力场训练：由能量梯度保证守恒

分子动力学需要力，而力与势能的物理关系是：

$$
\mathbf{F}_{i}(\mathbf{r}_1,\ldots,\mathbf{r}_n)
=
-
\frac{\partial E}{\partial \mathbf{r}_{i}}
(\mathbf{r}_1,\ldots,\mathbf{r}_n)
$$

SchNet 不单独输出任意力向量，而是对预测能量求负梯度：

$$
\hat{\mathbf{F}}_{i}
=
-
\frac{\partial \hat{E}}{\partial \mathbf{r}_{i}}
(Z_1,\ldots,Z_n,\mathbf{r}_1,\ldots,\mathbf{r}_n)
$$

这样得到的力场天然是保守力场，不会出现沿闭合路径做功导致能量凭空增加的情况。由于 \(\hat{E}\) 使用距离构造而旋转不变，\(\hat{\mathbf{F}}_i\) 会随坐标旋转而等变。

训练时同时纳入能量和力：

$$
\ell(\hat{E},(E,\mathbf{F}_1,\ldots,\mathbf{F}_n))
=
\rho\|E-\hat{E}\|^2
+
\frac{1}{n}\sum_{i=1}^{n}
\left\|
\mathbf{F}_i
-
\left(
-
\frac{\partial \hat{E}}{\partial \mathbf{R}_i}
\right)
\right\|^2
$$

论文实验使用 \(\rho=0.01\) 来平衡能量和力的尺度。为了让力损失可优化，模型需要对位置至少二阶可微，因此 SchNet 使用 shifted softplus：

$$
\operatorname{ssp}(x)=\ln(0.5e^x+0.5)
$$

它比 ReLU 更适合势能面建模，因为 ReLU 的导数不连续会传导到力预测。

##### 伪代码：SchNet 前向与训练

```python
# SchNet 的核心前向与能量-力联合训练
def schnet_energy(Z, R):
    # Z: 原子核电荷/元素类型, R: 原子坐标 [n, 3]
    x = atom_embedding[Z]  # x_i^0 = a_Zi

    for block in interaction_blocks:
        # 距离矩阵保证旋转不变
        d = pairwise_distances(R)  # d_ij = ||r_i - r_j||
        rbf = gaussian_rbf(d, centers=mu, gamma=10)

        # filter network 生成连续滤波器 W(d_ij)
        W = block.filter_network(rbf)

        # cfconv: 按距离生成的滤波器聚合邻居表示
        message = sum_over_neighbors(x[:, None, :] * W)

        # atom-wise layers + shifted softplus + residual
        v = block.atomwise_after(block.atomwise_before(message))
        x = x + v

    atom_energy = energy_head(x)
    return atom_energy.sum()


def train_step(batch):
    Z, R, E_true, F_true = batch
    R.requires_grad_(True)

    E_pred = schnet_energy(Z, R)
    F_pred = -grad(E_pred, R)  # 能量守恒力场

    loss_E = (E_true - E_pred).pow(2)
    loss_F = ((F_true - F_pred).pow(2).sum(dim=-1)).mean()
    loss = rho * loss_E + loss_F
    optimizer.step(loss)
```

##### 与 DTNN、MPNN、手工指纹的差异

DTNN 已经把分子看作原子间相互作用系统，但 SchNet 明确把这种相互作用写成 continuous-filter convolution，使任意位置点集上的卷积成为可复用构件。传统分子图网络常依赖离散键类型、one-hot 边标签或距离 bin，这对平衡分子性质预测足够，但在分子动力学轨迹上会暴露势能面不连续问题。

SchNet 的创新在于把几何连续性、旋转/平移/置换对称性和能量-力物理关系放进同一个神经网络势里。它不是事后约束力守恒，而是从能量标量出发自动微分得到力；也不是把三维结构体素化，而是在原子坐标原生空间直接建模。

##### 为什么 ISO17 重要

QM9 主要是平衡构型，检验化学组成泛化；MD17 是单分子的构象轨迹，检验势能面局部形状；ISO17 同时包含不同同分异构体和非平衡构象，要求模型同时泛化化学组成和几何构象。论文显示加入力监督能提升 ISO17 泛化，这说明力标签不仅帮助拟合某个分子的局部轨迹，也能给表示学习提供更强的几何梯度信息。

> 💡 关键：SchNet 的“连续过滤器”不是普通 attention 权重，而是把距离连续映射到通道级滤波器，使原子移动的微小变化能平滑地反映到能量与力上。

#### 🧪 练习题
```yaml
question: "SchNet 为什么通过能量的负梯度来得到力，而不是让网络直接输出力？"
options:
  - "为了减少原子类型 embedding 的数量"
  - "为了保证预测力场与势能一致，天然满足能量守恒，并让力在旋转坐标时等变"
  - "为了避免使用原子间距离"
  - "为了把分子坐标固定到规则图像网格上"
answer: 1
explain: "力定义为势能对坐标的负梯度。SchNet 先预测旋转不变的能量，再自动微分得到力，因此力场是保守的，并与分子几何变换保持一致。"
```

### CGCNN

```yaml
id: cgcnn
num: 2
name: CGCNN
full_name: 晶体图卷积神经网络 (Crystal Graph Convolutional NN)
year: '2018'
org: MIT
parent: schnet
paper_url: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.120.145301
project_url: ''
category: gnn_representation
motivation: 首个通用晶体GNN捕捉周期性
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

### MEGNet

```yaml
id: megnet
num: 3
name: MEGNet
full_name: 材料图网络 (MatErials Graph Network)
year: '2019'
org: UCSD
parent: cgcnn
paper_url: https://pubs.acs.org/doi/10.1021/acs.chemmater.9b01294
project_url: ''
category: gnn_representation
motivation: 全局状态向量实现多属性预测
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

### DimeNet

```yaml
id: dimenet
num: 4
name: DimeNet
full_name: 方向性消息传递网络 (Directional Message Passing NN)
year: '2020'
org: TU Munich
parent: schnet
paper_url: https://openreview.net/forum?id=B1e79eBKvS
project_url: ''
category: gnn_representation
motivation: 显式建模键角的方向性消息
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

### ALIGNN

```yaml
id: alignn
num: 5
name: ALIGNN
full_name: 原子线图神经网络 (Atomistic Line Graph NN)
year: '2021'
org: NIST
parent: cgcnn
paper_url: https://www.nature.com/articles/s41524-021-00650-1
project_url: ''
category: gnn_representation
motivation: 线图同时捕捉键长与键角
```

#### 📝 一句话总结
ALIGNN 提出在原子键图 \(g\) 和其线图 \(L(g)\) 上交替消息传递，把键长的二体相互作用与键角的三体相互作用显式耦合起来，解决了 CGCNN/SchNet 类距离图网络难以高效学习角度敏感材料性质的问题。

#### 🎯 核心要点
- **双图表示**：原子图节点表示原子、边表示键；线图节点表示原子图中的键、线图边表示共享一个中心原子的键对，即键角三元组
- **ALIGNN 层结构**：先在 \(L(g)\) 上更新 bond/triplet 表示，再把更新后的 bond 表示映射回 \(g\)，继续更新 atom/bond 表示
- **边门控图卷积**：使用 edge-gated graph convolution，同时更新节点与边，并以归一化边门控 \(\hat{e}_{ij}\) 控制邻居信息权重
- **输入特征**：晶体采用周期性 12 最近邻图，节点使用 CGCNN 风格元素特征；边长用 RBF 展开，键角余弦用 RBF 展开
- **默认模型**：4 个 ALIGNN 层 + 4 个普通 GCN 层，隐藏维度 256；最后对原子表示做平均池化并接线性预测头
- **训练任务**：覆盖 Materials Project、JARVIS-DFT、QM9；在 MP 形成能和带隙上分别达到 0.022 eV/atom 和 0.218 eV MAE
- **效率取舍**：线图引入显式角度信息但仍保持图消息传递形式；论文消融显示至少 2 个 ALIGNN 更新即可获得主要收益

#### 🔬 深入细节
##### 核心架构示意图

![ALIGNN 原子图与线图构造](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00650-1/MediaObjects/41524_2021_650_Fig1_HTML.png)
*图 1：以 SiO4 多面体为例，左侧是原子键图，右侧线图把“键”提升为节点，把“键角”表示为线图边。*

![ALIGNN 层结构](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00650-1/MediaObjects/41524_2021_650_Fig2_HTML.png)
*图 2：ALIGNN layer 先在线图上更新 pair/triplet 表示，再回到直接原子图更新 atom/pair 表示。*

##### 算法伪代码

```python
# ALIGNN 核心前向流程
def build_alignn_graph(structure):
    g = periodic_knn_graph(structure, k=12)
    h = atom_features(structure.atomic_numbers)        # 原子节点特征
    e = rbf_expand(bond_lengths(g), start=0.0, end=8.0, bins=80)

    lg = line_graph(g)                                 # 节点=原子图边
    t = rbf_expand(cosine_bond_angles(lg), bins=40)    # 线图边=键角
    return g, lg, h, e, t

def alignn_forward(g, lg, h, e, t):
    for _ in range(num_alignn_layers):
        # 1. 线图卷积：用键角三元组更新 bond 表示
        m, t = edge_gated_conv(lg, node_features=e, edge_features=t)

        # 2. 原子图卷积：把更新后的 bond 表示作为原子图边特征
        h, e = edge_gated_conv(g, node_features=h, edge_features=m)

    for _ in range(num_gcn_layers):
        h, e = edge_gated_conv(g, node_features=h, edge_features=e)

    graph_repr = mean_pool(h)
    return prediction_head(graph_repr)
```

##### 动机与背景

CGCNN、SchNet、MEGNet 等早期材料 GNN 通常把晶体或分子表示为原子图：原子是节点，键长或邻接关系是边。这类表示能很好捕捉二体距离信息，但许多材料性质对局域配位几何、键角、八面体畸变和多面体连接方式非常敏感。例如两个局域环境可能有相近的键长分布，却因为键角不同而产生不同的电子结构或弹性响应。

直接把所有角度特征塞入原子图边更新并不自然，因为角度属于三元组 \((i,j,k)\)，不是单独一条边的属性。ALIGNN 的关键做法是引入线图：原图中的每条键 \((i,j)\) 成为线图节点，两条共享原子的键 \((i,j)\) 与 \((j,k)\) 在线图中相连，这条线图边天然携带键角 \(\theta_{ijk}\)。这样，三体几何被转化为线图上的普通边消息传递。

> 💡 关键：ALIGNN 不是简单“增加角度特征”，而是让 bond 表示先通过 line graph 聚合 angle 信息，再把更新后的 bond 表示反馈到 atom graph；这使二体和三体信息在同一层中闭环耦合。

##### 双图表示与特征初始化

原子图 \(g=(V,E)\) 中，节点 \(v_i\) 是原子，边 \(e_{ij}\) 是周期性近邻键。论文对晶体使用周期性 12 最近邻构图，并扩展到第 12 近邻所在邻居壳层的所有原子，避免由于同距离邻居截断导致的非物理不连续。

节点初始特征借鉴 CGCNN，包含电负性、族数、共价半径、价电子数、第一电离能、电子亲和能、元素区块、原子体积等元素属性。边长 \(r_{ij}\) 通过径向基函数展开：

$$
e_{ij}^{(0)} = \mathrm{RBF}(r_{ij})
$$

线图 \(L(g)\) 的节点与原子图边一一对应，线图边表示键对，因此可以为每条线图边计算键角：

$$
\theta_{ijk}=\arccos\left(\frac{\mathbf{r}_{ij}\cdot\mathbf{r}_{jk}}{\left|\mathbf{r}_{ij}\right|\left|\mathbf{r}_{jk}\right|}\right)
$$

论文把键角余弦也做 RBF 展开，记作 triplet 表示 \(t_{ijk}\)。为避免混淆，ALIGNN 通常把原子、键、三元组表示分别记为 \(h\)、\(e\)、\(t\)。

##### 边门控图卷积

ALIGNN 的基本卷积模块是 edge-gated graph convolution。它与 CGCNN 的门控思想相近，但边特征不只是作为拼接输入，而是变成归一化后的边门控，用于控制邻居 \(j\) 对中心节点 \(i\) 的贡献：

$$
h_i^{l+1}=h_i^l+\mathrm{SiLU}\left(\mathrm{Norm}\left(W_\mathrm{src}^l h_i^l+\sum_{j\in \mathcal{N}_i}\hat{e}_{ij}^l W_\mathrm{dst}^l h_j^l\right)\right)
$$

$$
\hat{e}_{ij}^l=\frac{\sigma(e_{ij}^l)}{\sum_{k\in\mathcal{N}_i}\sigma(e_{ik}^l)+\epsilon}
$$

边本身也被更新：

$$
e_{ij}^{l}=e_{ij}^{l-1}+\mathrm{SiLU}\left(\mathrm{Norm}\left(A^l h_i^{l-1}+B^l h_j^{l-1}+C^l e_{ij}^{l-1}\right)\right)
$$

直觉上，\(\hat{e}_{ij}\) 是一个由当前键状态决定的 soft gate：重要或化学上更相关的邻居会得到更高权重，同时边状态也会随两端原子的环境变化而更新。

##### ALIGNN 更新机制

一个 ALIGNN 层由两个 edge-gated graph convolution 组成。第一步在线图上进行：

$$
m^l,t^l=\mathrm{EdgeGatedConv}(L(g), e^{l-1}, t^{l-1})
$$

这里 \(e^{l-1}\) 作为线图节点特征，\(t^{l-1}\) 作为线图边特征。输出 \(m^l\) 是已融合角度上下文的 bond message。

第二步回到原子图：

$$
h^l,e^l=\mathrm{EdgeGatedConv}(g, h^{l-1}, m^l)
$$

这一步用带角度信息的 bond message 更新原子节点与键表示。多层堆叠后，角度信息可以从局域键对逐步传播到更远的原子环境中。

##### 训练目标与性能边界

ALIGNN 对回归任务最小化 MSE，对分类任务最小化负对数似然。默认训练配置为 AdamW、batch size 64、300 epochs、one-cycle 学习率策略，最大学习率 0.001，隐藏维度 256，4 个 ALIGNN 层和 4 个 GCN 层。

在 Materials Project 2018.6.1 数据集上，论文采用 60,000/5,000/4,239 的 train/validation/test 划分；在 JARVIS-DFT 上采用 80/10/10 划分；在 QM9 上采用 110,000/10,000/10,829 划分。MP 形成能任务上 ALIGNN 达到 0.022 eV/atom MAE，相比 CGCNN、MEGNet、SchNet 分别有约 43.6%、21.4%、37.1% 的误差降低；MP 带隙任务达到 0.218 eV MAE，相比 CGCNN 和 MEGNet 也显著更低。

消融实验显示，单纯加深 GCN 并不能完全替代 ALIGNN 层。对于 JARVIS-DFT 形成能，ALIGNN-only 模型比 GCN-only 模型在相同原子更新次数下有约 29% 的相对 MAE 降低；包含至少两个 ALIGNN 更新基本可以获得主要精度收益。代价是线图引入了额外计算，但论文指出 ALIGNN 通常 300 epochs 即可收敛，而一些角度显式模型需要更长训练。

##### 与 CGCNN 的区别

CGCNN 在原子图上以边特征调制邻居消息，但其几何输入主要是 pairwise distance；如果要学键角，只能通过多层传播间接拟合。ALIGNN 则把键角作为线图边的一等公民，因此每一层都可以显式读取 \((i,j,k)\) 的三体几何。与 DimeNet 的方向消息传递相比，ALIGNN 的实现更贴近通用图卷积：它复用 edge-gated convolution，只是把原图和线图交替组合起来。

> ⚠️ 注意：ALIGNN 并不是严格旋转等变网络。它通过距离与角度这类旋转不变几何量编码结构，因此适合标量材料属性预测；若目标是力场或张量性质，后续 PaiNN、GemNet、NequIP/MACE 等方法会更强调等变性或保守力。

#### 🧪 练习题
```yaml
question: "ALIGNN 引入 atomistic line graph 的核心目的是什么？"
options:
  - "把所有原子特征转换成 one-hot 编码"
  - "让原子图中的键成为线图节点，从而把键角三体信息表示为线图边消息传递"
  - "减少图中的边数量以降低训练时间"
  - "直接预测原子力而不需要能量梯度"
answer: 1
explain: "线图把原图边提升为节点，把共享中心原子的键对表示为线图边，因此键角可以作为线图边特征被显式更新，再反馈到原子图中。"
```

### PaiNN

```yaml
id: painn
num: 6
name: PaiNN
full_name: 极速旋转等变消息传递 (Polarizable Atom Interaction NN)
year: '2021'
org: TU Berlin
parent: schnet
paper_url: https://proceedings.mlr.press/v139/schutt21a.html
project_url: ''
category: gnn_representation
motivation: 极速旋转等变提升力场效率
```

#### 📝 一句话总结
PaiNN 在 SchNet 式连续滤波消息传递上加入标量-向量双表示，用笛卡尔向量特征实现旋转等变消息传递，在保持 \(O(|\mathcal{N}|)\) 邻域复杂度的同时传播方向信息，并高效预测能量、力、偶极矩、极化率等标量与张量性质。

#### 🎯 核心要点
- **双表示设计**：每个原子同时维护不变标量特征 \(\mathbf{s}_i\) 与等变向量特征 \(\vec{\mathbf{v}}_i\)，标量负责非线性，向量负责方向
- **不使用球谐/CG 张量积**：相比 TFN/Cormorant 等球谐等变模型，PaiNN 在笛卡尔空间中用向量缩放、线性组合、内积实现等变
- **线性复杂度方向传播**：用邻居方向 \(\mathbf{r}_{ij}/\|\mathbf{r}_{ij}\|\) 和向量特征传播角度信息，避免显式角度枚举的 \(O(|\mathcal{N}|^2)\)
- **Message + Update 交替结构**：message block 在邻居间传播标量/向量信息，update block 在原子内耦合标量与向量通道
- **保守力预测**：力通常由能量梯度 \(\mathbf{F}_i=-\partial E/\partial \mathbf{r}_i\) 得到，保证力场保守，适合稳定分子动力学
- **张量性质输出**：用 gated equivariant block 构造偶极矩与极化率张量，可用于 IR/Raman 光谱模拟
- **效率优势**：约 600k 参数，小于 DimeNet++ 约 1.8M；QM9 随机 50 分子批次推理从 45 ms 降到 13 ms

#### 🔬 深入细节
##### 核心架构示意图

![PaiNN 架构图](https://ar5iv.labs.arxiv.org/html/2102.03150/assets/x5.png)
*图 2：PaiNN 完整架构、message block 与 update block。来源为 ar5iv 转换的 arXiv:2102.03150 论文图。*

![PaiNN 方向信息传播示意](https://ar5iv.labs.arxiv.org/html/2102.03150/assets/x4.png)
*图 1：角度消息与方向消息的区别；等变方向表示可以在小截断半径下传播远程方向信息。*

##### 算法伪代码

```python
# PaiNN 核心前向流程
def painn_forward(Z, R, edge_index):
    # 标量特征由元素嵌入初始化，向量特征初始为 0
    s = atom_embedding(Z)                 # [n_atoms, F]
    v = zeros(n_atoms, F, 3)              # [n_atoms, F, xyz]

    for _ in range(num_interactions):
        # Message block: 邻居间传播标量与方向
        ds_msg = zeros_like(s)
        dv_msg = zeros_like(v)
        for i, j in edge_index:
            rij = R[j] - R[i]
            d = norm(rij)
            unit = rij / d
            w_s, w_vv, w_vs = radial_filter(d)  # RBF + cutoff + MLP

            ds_msg[i] += phi_s(s[j]) * w_s
            dv_msg[i] += v[j] * phi_vv(s[j]) * w_vv
            dv_msg[i] += phi_vs(s[j]) * w_vs * unit

        s = s + ds_msg
        v = v + dv_msg

        # Update block: 原子内耦合标量与向量
        Uv = linear_U(v)
        Vv = linear_V(v)
        scale = update_mlp(concat(s, norm(Vv)))
        a_ss, a_sv, a_vv = split(scale)

        s = s + a_ss + a_sv * dot(Uv, Vv)
        v = v + a_vv * Uv

    E = sum(atomwise_energy_head(s))
    F = -grad(E, R)                       # 保守力
    return E, F
```

##### 动机与背景

SchNet 类分子 GNN 使用连续滤波卷积，消息依赖原子间距离 \(\|\mathbf{r}_{ij}\|\)，天然满足旋转不变性。但只使用距离会丢掉方向信息，模型需要依靠多层传播间接恢复角度、扭转等几何关系。DimeNet 通过显式角度消息增强表达力，但枚举角度通常随邻居数二次增长。

PaiNN 的出发点是：如果原子表示不仅有标量，还保留一组会随坐标一起旋转的向量特征，那么模型可以在线性邻域复杂度内传播方向信息。对于方向消息，有如下直觉关系：

$$
\left\|\sum_{j=1}^{N}\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}\right\|^2
= \sum_{j=1}^{N}\sum_{k=1}^{N}
\left\langle
\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|},
\frac{\mathbf{r}_{ik}}{\|\mathbf{r}_{ik}\|}
\right\rangle
=\sum_{j,k}\cos\alpha_{jik}
$$

也就是说，先聚合方向向量，再通过内积或范数收缩回标量时，角度信息会自然出现；而方向聚合本身只需要遍历邻居一次。

##### 等变表示规则

PaiNN 把原子 \(i\) 的隐藏状态写成标量特征 \(\mathbf{s}_i\in\mathbb{R}^{F}\) 和向量特征 \(\vec{\mathbf{v}}_i\in\mathbb{R}^{F\times 3}\)。旋转矩阵 \(R\) 作用于空间维度时，标量保持不变，向量必须满足：

$$
\vec{\mathbf{f}}(R\vec{\mathbf{x}})=R\vec{\mathbf{f}}(\vec{\mathbf{x}})
$$

为了保持这个性质，PaiNN 只对标量通道使用普通 MLP/SiLU 非线性；向量通道只做线性组合、标量缩放、范数、内积等不会破坏等变性的操作。相比基于球谐函数和 Clebsch-Gordan 系数的等变模型，这种笛卡尔向量设计更简单、推理更快，也更适合需要百万步调用的分子动力学。

##### Message Block：邻居间传播方向

标量消息沿用 SchNet 的 continuous-filter convolution：

$$
\Delta \mathbf{s}_i^m
= \sum_j \boldsymbol{\phi}_s(\mathbf{s}_j)\circ \mathcal{W}_s(\|\mathbf{r}_{ij}\|)
$$

其中 \(\mathcal{W}_s\) 是由径向基函数和余弦截断构成的距离滤波器，\(\circ\) 是逐特征乘法。

向量消息包含两项：

$$
\Delta \vec{\mathbf{v}}_i^m
= \sum_j \vec{\mathbf{v}}_j\circ \boldsymbol{\phi}_{vv}(\mathbf{s}_j)\circ \mathcal{W}_{vv}(\|\mathbf{r}_{ij}\|)
+ \sum_j \boldsymbol{\phi}_{vs}(\mathbf{s}_j)\circ \mathcal{W}'_{vs}(\|\mathbf{r}_{ij}\|)
\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

第一项把已有向量特征从邻居传播过来，第二项从标量特征和相对方向生成新的向量特征。论文指出第二项可看成不变径向滤波器梯度的形式：

$$
\nabla \mathcal{W}_{vs}(\|\mathbf{r}_{ij}\|)
= \mathcal{W}'_{vs}(\|\mathbf{r}_{ij}\|)\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

这也是 PaiNN 名称中 polarizable 的直觉来源：原子的局域表示像可极化的多极矩，标量类似局域电荷，向量类似局域偶极。

##### Update Block：原子内耦合标量与向量

消息聚合后，PaiNN 在每个原子内部用 update block 混合 \(\mathbf{s}_i\) 和 \(\vec{\mathbf{v}}_i\)。标量残差为：

$$
\Delta \mathbf{s}_i^u
= \mathbf{a}_{ss}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)
+ \mathbf{a}_{sv}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)
\left\langle \mathbf{U}\vec{\mathbf{v}}_i,\mathbf{V}\vec{\mathbf{v}}_i \right\rangle
$$

向量残差为：

$$
\Delta \vec{\mathbf{v}}_i^u
= \mathbf{a}_{vv}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)\mathbf{U}\vec{\mathbf{v}}_i
$$

这里 \(\mathbf{U},\mathbf{V}\) 是特征维上的线性映射。向量范数与内积被收缩为标量，可安全地送入 MLP；MLP 输出的标量再去缩放向量，因此等变性仍然成立。

##### 张量性质与光谱模拟

对于标量能量，PaiNN 和 Behler-Parrinello/SchNet 一样使用原子贡献求和：

$$
E=\sum_{i=1}^{N}\epsilon(\mathbf{s}_i)
$$

对于力，论文在 MD17 等任务中使用能量负梯度：

$$
\mathbf{F}_i=-\frac{\partial E}{\partial \mathbf{r}_i}
$$

这样得到的力场是保守的，对分子动力学稳定性很重要。

对于张量输出，PaiNN 使用 gated equivariant block 构造秩 \(M\) 的张量：

$$
T=\sum_{i=1}^{N}\sum_{k=1}^{R}\lambda(\mathbf{s}_i)\,
\vec{\nu}(\vec{\mathbf{v}}_i)_{k,1}\otimes\cdots\otimes
\vec{\nu}(\vec{\mathbf{v}}_i)_{k,M}
$$

偶极矩可以写成局域偶极与局域电荷贡献之和：

$$
\boldsymbol{\mu}
= \sum_{i=1}^{N}\boldsymbol{\mu}_{\mathrm{atom}}(\vec{\mathbf{v}}_i)
+ q_{\mathrm{atom}}(\mathbf{s}_i)\mathbf{r}_i
$$

极化率张量则可写成：

$$
\boldsymbol{\alpha}
= \sum_{i=1}^{N}\alpha_0(\mathbf{s}_i)I_3
+ \vec{\nu}(\vec{\mathbf{v}}_i)\otimes\mathbf{r}_i
+ \mathbf{r}_i\otimes\vec{\nu}(\vec{\mathbf{v}}_i)
$$

这些张量输出被用于红外与 Raman 光谱模拟。论文报告乙醇单步电子结构计算约 140 秒，而 PaiNN 在 V100 上约 14 ms；阿司匹林从估计 25 年的参考模拟时间降到约 1 小时量级，体现了 4-5 个数量级的加速。

##### 实验结果与消融

在 QM9 上，PaiNN 对 12 个目标性质中的 6 个达到 SOTA，对另外 2 个与 DimeNet++ 接近；偶极矩 MAE 达到 0.012 D。它的参数量约 600k，明显小于 DimeNet++ 的约 1.8M，并且随机 50 个 QM9 分子的推理时间从 DimeNet++ 参考实现的 45 ms 降至 13 ms。

在 MD17 上，论文强调小样本设置：每个分子轨迹只用 950 个训练结构和 50 个验证结构。PaiNN 在仅用力训练时 14 个 energy/force 目标中有 12 个达到最低 MAE；在能量+力联合训练时也与 FCHL19 等核方法接近，说明等变神经网络可以同时兼顾小样本效率与大数据可扩展性。

消融实验在 aspirin MD 轨迹上验证了向量特征的作用：去掉 update 中的向量内积项、去掉 message 中的向量传播项都会增加误差；完全移除向量特征后，即使增加标量通道保持参数量，力 MAE 也从约 0.371 kcal/mol/Å 上升到 1.194 kcal/mol/Å。这个结果说明 PaiNN 的优势不仅来自参数量，而来自对方向信息的等变传播。

#### 🧪 练习题
```yaml
question: "PaiNN 为什么可以比显式角度消息更高效地传播几何方向信息？"
options:
  - "它完全不使用原子坐标，只使用元素编号"
  - "它用等变向量特征和邻居方向传播信息，复杂度随邻居数线性增长，而角度可由向量内积隐式恢复"
  - "它把所有分子转换成固定大小的二维图像"
  - "它直接预测所有键角标签作为监督信号"
answer: 1
explain: "PaiNN 的向量消息包含相对方向 r_ij/||r_ij||，聚合后通过范数或内积可以恢复角度信息，因此避免显式枚举所有邻居对的 O(|N|^2) 角度消息。"
```

### GemNet

```yaml
id: gemnet
num: 7
name: GemNet
full_name: 通用方向性图网络 (Geometric Message Passing NN)
year: '2021'
org: TU Munich
parent: dimenet
paper_url: https://proceedings.neurips.cc/paper/2021/hash/35cf8659cfcb13224cbd47863a34fc58-Abstract.html
project_url: ''
category: gnn_representation
motivation: 解决分子对称性破缺问题
```

#### 📝 一句话总结
GemNet 从球面表示的通用逼近性出发，把连续球面表示离散成 directed edge embeddings 和 two-hop geometric message passing，并通过对称消息传递、双线性层、Q-MP/T-MP 与方差缩放等工程改进，在分子能量/力预测上显著超过 DimeNet++、PaiNN、NequIP 等当时强基线。

#### 🎯 核心要点
- **理论贡献**：证明球面表示足以逼近平移不变、旋转/置换等变的分子预测函数，并将其离散化为有向边嵌入
- **有向边表示**：用 \(\mathbf{m}_{ca}\) 表示从原子 \(c\) 指向原子 \(a\) 的方向嵌入，保留相对旋转信息而非只保留原子标量
- **几何消息传递**：two-hop 消息在边嵌入之间传播，可同时使用距离 \(x\)、角度 \(\varphi\)、二面角 \(\theta\) 的 RBF/CBF/SBF 基函数
- **Q-MP 与 T-MP**：GemNet-Q 使用四元组 two-hop 消息，表达力更强；GemNet-T 去掉昂贵的四元组项，只保留更便宜的一跳角度消息和原子自交互
- **对称消息传递**：同时利用 \(\mathbf{m}_{ca}\) 与反向 \(\mathbf{m}_{ac}\)，一次消息计算服务两个方向，避免任意方向选择带来的信息损失
- **保守力优先**：主模型通过 \(\mathbf{F}_a=-\partial E/\partial\mathbf{x}_a\) 得到力，保证力场保守；直接力预测版本更快但通常精度较差
- **结果**：论文报告在 COLL、MD17、OC20 上相对前序方法平均提升约 34%、41%、20%，且在链状、非平面、动态构型更复杂的分子上优势更明显

#### 🔬 深入细节
##### 核心图示来源

GemNet 原论文的主架构图是 NeurIPS 论文 Fig. 1，由 arXiv 源码中的 TikZ 文件生成，而不是独立 PNG。可访问来源如下：

![GemNet NeurIPS 官方 Poster](https://neurips.cc/media/PosterPDFs/NeurIPS%202021/35cf8659cfcb13224cbd47863a34fc58_E70pQCX.png?t=1638466681.9316065)
*图：NeurIPS 2021 官方 poster 汇总了 GemNet 的球面表示理论、几何消息传递模块、模型架构和实验结果；原论文 Fig. 1 的 TikZ 源码对应同一架构设计。*

- 论文 PDF：`https://proceedings.neurips.cc/paper_files/paper/2021/file/35cf8659cfcb13224cbd47863a34fc58-Paper.pdf`
- arXiv 页面：`https://arxiv.org/abs/2106.08903`
- arXiv 源码包：`https://arxiv.org/e-print/2106.08903`，其中 `figures/architecture_main.tex` 是主架构图，`figures/architecture_appendix.tex` 是完整架构图
- 官方项目页：`https://www.cs.cit.tum.de/daml/gemnet/`

图 1 展示了 GemNet 的三层结构：输入端构造 RBF/CBF/SBF 几何基函数；中间堆叠 4 个 interaction blocks；每个 interaction block 内包含 message passing、residual、atom embedding 和输出头。消息传递模块同时包含 Q-MP（quadruplet/two-hop）和 T-MP（triplet/one-hop）路径。

##### 算法伪代码

```python
# GemNet 核心前向流程
def gemnet_forward(Z, X):
    # 1. 构图：为每条有向边 c -> a 建立 directional embedding
    edges = radius_graph(X, cutoff_emb=5.0)
    m_ca = edge_embedding(Z, edges, rbf(distance(edges)))
    h_a = atom_embedding(Z)

    # 2. 预计算几何基函数
    rbf = radial_basis(distance(edges))                         # x_ca
    cbf = circular_basis(distance_angle_triplets(edges))         # x_ca, phi_cab
    sbf = spherical_basis(distance_angle_dihedral_quads(edges))  # x_ca, phi_cab, theta_cabd

    layer_outputs = []
    for l in range(num_interaction_blocks):
        # T-MP: 一跳几何消息，类似 DimeNet 的角度三元组消息
        t_msg = aggregate_over_triplets(
            source=m_ba,
            basis=cbf,
            target_edge=m_ca,
        )

        # Q-MP: two-hop 几何消息，使用四元组和二面角
        q_msg = aggregate_over_quadruplets(
            source=m_db,
            basis=(rbf, cbf, sbf),
            target_edge=m_ca,
        )

        # 对称消息 + 高效双线性/残差更新
        m_ca = residual_update(m_ca, t_msg + q_msg)

        # 原子自交互：聚合指向同一原子的边嵌入，更新 atom embedding
        h_a = atom_self_interaction(h_a, aggregate_edges_to_atom(m_ca), rbf)

        layer_outputs.append((h_a, m_ca))

    E = sum(output_energy_heads(layer_outputs))
    F = -grad(E, X)  # 主模型用能量梯度获得保守力
    return E, F
```

##### 动机与理论背景

普通分子 GNN 的节点表示多为旋转不变标量，这会带来一个类似“Picasso problem”的问题：如果中间层过早丢掉相对方向关系，最终即使输出是旋转不变标量，也可能无法区分只在局部相对方向上不同的构型。DimeNet 通过边方向和角度消息缓解了这一点，但 GemNet 进一步追问：什么样的方向性 GNN 足以成为通用逼近器？

论文先从 Tensor Field Network 的 \(\mathrm{SO}(3)\) 表示出发，再证明对分子预测而言，球面 \(S^2\) 上的表示已经足够。形式上，点云输入 \((\mathbf{X},\mathbf{H}_{\text{in}})\) 需要满足平移不变、旋转不变或等变、置换等变。GemNet 用球面表示函数 \(\mathbf{H}:S^2\to\mathbb{R}\)，其更新可写成：

$$
\tilde{\mathbf{H}}^{\mathrm{sphere}}_a(\mathbf{X},\mathbf{H})(\hat{\mathbf{r}})
=\theta \mathbf{H}_a(\hat{\mathbf{r}})
+\sum_{b\in\mathcal{N}_a}
F_{\mathrm{sphere}}(\mathbf{x}_b-\mathbf{x}_a,\hat{\mathbf{r}})
\mathbf{H}_b(\hat{\mathbf{r}})
$$

其中滤波器由径向函数和球谐基展开：

$$
F_{\mathrm{sphere}}(\mathbf{x},\hat{\mathbf{r}})
=\sum_{l,m}R^{(l)}(x)\,
\mathrm{Re}\left[Y_m^{(l)*}(\hat{\mathbf{x}})Y_m^{(l)}(\hat{\mathbf{r}})\right]
$$

理论模型仍是连续球面函数，不能直接作为高效 GNN。GemNet 的离散化思路是：用邻居方向作为球面采样点，把原子 \(a\) 在方向 \(c\to a\) 上的球面值表示为有向边嵌入 \(\mathbf{m}_{ca}\)。因此，边而不是原子成为保留方向信息的核心载体。

##### Two-Hop Geometric Message Passing

GemNet 的几何消息传递在 directed edge embeddings 之间进行。一个典型 two-hop 消息从 \(\mathbf{m}_{db}\) 传到 \(\mathbf{m}_{ca}\)，中间经过 \(b\to a\) 等连接关系。这个路径引入三类几何量：

- 距离 \(x_{db}\) 或 \(x_{ca}\)：通过 RBF 编码
- 角度 \(\varphi_{abd}\)、\(\varphi_{cab}\)：通过 CBF 编码
- 二面角 \(\theta_{cabd}\)：通过 SBF 编码

论文给出的核心几何消息可概括为：

$$
\tilde{\mathbf{m}}_{ca}
=
\sum_{\substack{
b\in\mathcal{N}^{\mathrm{int}}_a\setminus\{c\}\\
d\in\mathcal{N}^{\mathrm{emb}}_b\setminus\{a,c\}
}}
\left(
(\mathbf{W}_{\mathrm{SBF}1}\mathbf{e}_{\mathrm{SBF}}(x_{ca},\varphi_{cab},\theta_{cabd}))^\top
\tilde{\mathbf{W}}
\left[
(\mathbf{W}_{\mathrm{CBF}2}\mathbf{W}_{\mathrm{CBF}1}\mathbf{e}_{\mathrm{CBF}}(x_{ba},\varphi_{abd}))
\odot
(\mathbf{W}_{\mathrm{RBF}2}\mathbf{W}_{\mathrm{RBF}1}\mathbf{e}_{\mathrm{RBF}}(x_{db}))
\odot
\mathbf{m}_{db}
\right]
\right)
$$

这里 \(\mathbf{e}_{\mathrm{RBF}}\)、\(\mathbf{e}_{\mathrm{CBF}}\)、\(\mathbf{e}_{\mathrm{SBF}}\) 分别表示径向、圆形和球面基函数特征。这个式子看起来复杂，但直觉很直接：目标边 \(\mathbf{m}_{ca}\) 不只看与其相邻的边，还看两跳外的方向嵌入 \(\mathbf{m}_{db}\)，并用距离、夹角、二面角对消息进行几何调制。

##### Q-MP、T-MP 与三种交互

GemNet 的 interaction block 包含三类互补交互：

1. **Q-MP**：quadruplet/two-hop geometric message passing，使用四元组和二面角，表达力最强但开销最高
2. **T-MP**：triplet/one-hop geometric message passing，只使用同一中心附近的角度消息，类似 DimeNet 的方向消息，复杂度更低
3. **Atom self-interaction**：先把指向同一原子的边嵌入聚合为原子嵌入，再用原子嵌入更新所有相关边

GemNet-Q 使用 Q-MP + T-MP + atom self-interaction；GemNet-T 去掉 Q-MP，只保留更便宜的 T-MP 和 atom self-interaction。论文给出复杂度对比：

$$
\mathrm{GemNet\text{-}Q}: O(nk_{\mathrm{int}}k_{\mathrm{emb}}^2),\qquad
\mathrm{GemNet\text{-}T}: O(nk_{\mathrm{emb}}^2)
$$

其中 \(k_{\mathrm{int}}\) 是 interaction cutoff 内邻居数，\(k_{\mathrm{emb}}\) 是 embedding cutoff 内方向数。实验显示，MD17 单分子任务有时 GemNet-T 已足够，但在 COLL 或多分子联合设置中，GemNet-Q 的 two-hop 消息更有优势。

##### 对称消息传递与高效双线性层

如果存在 \(\mathbf{m}_{ca}\)，通常也存在反向嵌入 \(\mathbf{m}_{ac}\)。把哪一个看作原子 \(a\) 的方向表示是人为选择。GemNet 采用 symmetric message passing：一次计算得到的消息同时用于正反两个方向，再通过两个不同的可学习矩阵区分方向。这减少了重复计算，也避免了只更新一个方向带来的不对称信息流。

GemNet 还把 Hadamard 乘积推广为双线性层，同时通过改变求和顺序实现高效计算。由于 basis transform、neighbor aggregation 和 bilinear layer 本质上都是线性运算，论文把求和重排以降低中间张量大小；在实验中，高效聚合可把普通 Hadamard 乘积下的显存从约 4.1 GB 降到约 2.2 GB。

##### 方差缩放与训练目标

分子回归中，BatchNorm 会把不同分子/原子的统计量耦合起来，LayerNorm 又会强行压平不同距离尺度的相互作用。GemNet 因此使用预设 scaling factors 稳定激活方差，重点修正 skip connection、SiLU 非线性、消息聚合、Hadamard/双线性层后的方差漂移。

对于 MD17 类能量-力任务，训练损失为：

$$
\mathcal{L}_{\mathrm{MD}}(\mathbf{X},\mathbf{z})
=(1-\rho)\left|f_{\theta}(\mathbf{X},\mathbf{z})-\hat{t}(\mathbf{X},\mathbf{z})\right|
+\frac{\rho}{N}\sum_{i=1}^{N}
\sqrt{
\sum_{\alpha=1}^{3}
\left(
-\frac{\partial f_{\theta}(\mathbf{X},\mathbf{z})}{\partial x_{i\alpha}}
-\hat{F}_{i\alpha}(\mathbf{X},\mathbf{z})
\right)^2
}
$$

论文在 MD17 设置中使用较高的力权重 \(\rho=0.999\)，因为分子动力学的轨迹质量主要由力误差决定。主模型通过能量梯度算力，保证保守力场；直接力预测版本 GemNet-dQ/dT 更快，训练平均加速约 4 倍、推理约 1.6 倍，但在多数小数据集上误差显著更高。

##### 与 DimeNet、PaiNN 的区别

DimeNet 的核心是方向消息和角度基函数，主要处理三元组几何；GemNet 继承这一方向性思想，但把边嵌入提升为离散球面表示，并加入 two-hop 四元组消息，因此可以显式使用二面角。PaiNN 则用笛卡尔向量特征保持旋转等变，复杂度更轻；GemNet 的表示仍主要是不变边嵌入，但通过方向采样和几何基函数保留相对旋转信息，主打高精度能量/力预测。

从结果看，GemNet 在 COLL、MD17、OC20 上分别比此前模型平均提升约 34%、41%、20%。论文特别指出，提升最大的是 ethanol、malonaldehyde 等链状或非平面动态构型，因为这些体系的扭转和远程方向关系更难由普通局域距离模型捕捉。

> 💡 关键：GemNet 的“通用性”不是指一个模型覆盖所有化学空间，而是指其 directed edge + two-hop 几何消息传递具有更强的函数表达能力；实际性能仍依赖 cutoff、基函数维度、数据规模和训练目标权重。

#### 🧪 练习题
```yaml
question: "GemNet 中 Q-MP 相比 T-MP 的主要区别是什么？"
options:
  - "Q-MP 完全不使用几何信息，只使用原子编号"
  - "Q-MP 使用 two-hop/四元组消息并引入二面角信息，表达力更强但计算更贵"
  - "Q-MP 只预测能量，T-MP 只预测力"
  - "Q-MP 是图级池化层，T-MP 是优化器"
answer: 1
explain: "T-MP 主要是一跳三元组角度消息；Q-MP 在有向边嵌入间做 two-hop 消息传递，使用四元组和二面角，因此能表达更复杂的几何关系，但复杂度更高。"
```

### Equiformer

```yaml
id: equiformer
num: 8
name: Equiformer
full_name: 等变图注意力Transformer (Equivariant Graph Attention Transformer)
year: '2023'
org: SEAS
parent: mace
paper_url: https://openreview.net/forum?id=KwmPfARgOTD
project_url: ''
category: gnn_representation
motivation: Transformer与SE(3)等变结合
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

### USPEX

```yaml
id: uspex
num: 9
name: USPEX
full_name: '通用结构预测演化算法 (Universal Structure Predictor: Evolutionary Xtallography)'
year: '2006'
org: Oganov Group
parent: —
paper_url: https://uspex-team.org/en/uspex/overview
project_url: ''
category: structure_prediction
motivation: 遗传算法全局搜索能量最低点
```

#### 📝 一句话总结
USPEX 将晶体结构预测表述为自由能/焓面的全局优化问题，用“局域弛豫 + 适应度选择 + 遗传/变异/置换算子”在只给定化学组成的条件下搜索稳定和亚稳结构。

#### 🎯 核心要点
- **目标函数**：以局域优化后结构的负自由能/负焓作为适应度，低能结构更可能成为下一代父代
- **种群式搜索**：每一代由若干候选晶体结构组成，初代可随机生成或使用用户提供 seed，后续代由变异算子生成
- **局域优化嵌入全流程**：每个候选结构在进入种群前都要经过 DFT 或经验势局域弛豫，搜索空间从原始构型空间收缩到局域极小点集合
- **三类早期核心算子**：heredity 组合父代空间片段，mutation 扭曲晶格/扰动原子，permutation 交换不同元素原子以优化占位
- **约束和体积自适应**：用最小原子间距、晶胞角范围、最小晶格矢量长度等硬约束过滤病态结构，并根据优良个体动态调整候选体积
- **精英保留**：新一代从 offspring 与上一代保留优良个体中选取最佳结构，兼顾探索和利用
- **软件生态**：官方版本可对接 VASP、SIESTA、Quantum ESPRESSO、GULP、CP2K、LAMMPS 等能量计算后端，并扩展到纳米粒子、表面、界面、二维晶体、分子晶体和变组成搜索

#### 🔬 深入细节
##### 图示与来源说明

![USPEX 搜索效率示意](https://uspex-team.org/static/img/uspex-video-1.gif)
*图：USPEX 官方 overview 中的 MgSiO3 post-perovskite 搜索示例。官方说明中，随机局域优化在大量尝试后仍未找到正确结构，而 USPEX 演化搜索在更少步数内收敛到稳定结构。*

> 来源说明：给定 `paper_url` 是 USPEX 项目页而非单篇论文。这里的方法细节主要追溯到 Glass, Oganov & Hansen 2006 CPC 论文（官方 PDF: https://uspex-team.org/static/file/CPC-USPEX-2006.pdf）以及 USPEX 官方 overview 和 2025 manual。

##### 算法伪代码

```python
# USPEX 固定组成晶体结构预测伪代码
population = initialize_random_or_seed_structures(composition)
population = [local_relax(x) for x in population if hard_constraints(x)]
fitness = {-enthalpy_or_free_energy(x): x for x in population}
V_uc = estimate_initial_cell_volume(population)

while not converged(population):
    offspring = []

    for operator, ratio in operator_percentages.items():
        while count_from(operator, offspring) < ratio * population_size:
            parents = rank_based_select(population, fitness)

            if operator == "heredity":
                child = splice_spatial_slabs(parents[0], parents[1])
                child.lattice = weighted_average_lattice(parents[0], parents[1])
            elif operator == "mutation":
                child = strain_lattice_and_perturb_atoms(parents[0])
            elif operator == "permutation":
                child = swap_different_atom_types(parents[0])
            else:
                child = random_structure(composition)

            child = scale_to_volume(child, V_uc)
            if hard_constraints(child):
                child = local_relax(child)
                offspring.append(child)

    fitness_offspring = evaluate_by_ab_initio_or_forcefield(offspring)
    population = elitist_environmental_selection(
        parents=population,
        offspring=offspring,
        parent_fitness=fitness,
        offspring_fitness=fitness_offspring,
    )
    V_uc = adapt_volume_from_best_structures(population)
```

##### 动机与背景

晶体结构预测的输入通常只有化学组成、压力和温度条件，输出却是晶格参数、原子坐标和元素占位。若单胞含 \(N\) 个原子，连续变量维数约为：

$$
d = 6 + 3(N-1)
$$

其中 6 个变量来自晶格参数，去掉一个整体平移自由度后还有 \(3(N-1)\) 个原子坐标自由度。即便粗略离散化，可能结构数也随 \(N\) 指数增长。USPEX 的基本策略不是穷举，而是利用能量面上的经验事实：低能局域极小往往在同一“盆地/漏斗”附近聚集，好的结构片段可以组合出更好的结构。

在固定压力 \(P\) 和 0 K 条件下，很多搜索以焓为主要目标：

$$
H(\mathbf{R},\mathbf{A}) = E_{\text{DFT}}(\mathbf{R},\mathbf{A}) + PV
$$

其中 \(\mathbf{R}\) 是原子坐标，\(\mathbf{A}\) 是晶格矩阵。USPEX 用局域弛豫后的结构评价适应度：

$$
\text{fitness}(x) = -G(x^*) \quad \text{或} \quad -H(x^*), \qquad
x^*=\operatorname*{arg\,local\,min}_{x'} G(x')
$$

这样高适应度对应低自由能/低焓结构，选择机制会自然偏向更稳定的候选。

##### 三类核心演化算子

**Heredity（遗传/交叉）**是 USPEX 的标志性算子。两个父代先经过随机平移以避免人为单胞原点偏置，然后沿随机晶格方向切成空间相干的 slab。子代从父代 1 取一部分 slab，从父代 2 取剩余 slab，再修正各元素数量。晶格矩阵通常取两个父代的加权平均：

$$
\mathbf{A}_{\text{child}} = \lambda \mathbf{A}_1 + (1-\lambda)\mathbf{A}_2,\qquad \lambda\sim U(0,1)
$$

直觉是：晶体的有用信息主要在局域近邻关系和结构片段中，空间相干切片比随机拼接坐标更容易保留化学合理的键合环境。

**Mutation（变异）**用于跳出局部收敛。早期 USPEX 对晶格施加随机应变：

$$
\mathbf{A}'=(\mathbf{I}+\boldsymbol{\epsilon})\mathbf{A}, \qquad
\epsilon_{ij}\sim\mathcal{N}(0,\sigma_{\text{lattice}}^2)
$$

原子坐标也可加高斯扰动 \(\mathcal{N}(0,\sigma_{\text{atoms}}^2)\)。论文指出，晶格变异通常比原子位置随机扰动更关键，因为局域优化会修正原子小扰动，而晶格形变能探索相邻低能盆地。

**Permutation（置换）**用于多元素体系。它随机交换不同元素的原子位置，解决“同一几何骨架上哪种元素占哪个位点”的组合问题。对于离子/共价材料，这一步常常决定是否能找到正确的有序结构。

##### 约束、局域优化与选择

USPEX 不把所有随机结构都交给昂贵的 DFT。候选结构先经过硬约束过滤：

- 原子对距离必须大于元素相关的最小距离
- 晶胞角 \(\alpha,\beta,\gamma\) 落在合理范围
- 晶格矢量长度不能过短

这些约束不会精确告诉模型答案，但会排除明显不物理的高能区域，例如原子核/赝势芯重叠导致的病态结构。通过局域优化，每个候选都落到附近的局域极小点，能量排序更可比，也让 heredity/selection 学到“低能结构片段”而非热噪声坐标。

选择过程采用按适应度排名的随机父代选择，最差的一部分个体可被置零概率排除；生成 offspring 后，再把 offspring 与少量上一代精英合并，保留最佳个体进入下一代。这个精英保留机制防止已找到的好结构被随机漂移丢失。

##### 与随机搜索和普通遗传算法的区别

普通随机搜索缺少历史学习，每次采样几乎从头开始；普通二进制编码遗传算法又容易把晶体结构编码成不具物理意义的 bit string。USPEX 直接在连续晶格和坐标空间中操作，变异算子也尽量对应真实晶体形变和结构片段重组。

与后来的 CALYPSO 粒子群方法相比，USPEX 的核心更新来自遗传算子和精英选择；CALYPSO 则把候选结构看成粒子，用 pbest/gbest 或 lbest 的“速度”更新位置。两者都依赖局域优化和物理约束，但全局探索机制不同。

##### 能力与局限

USPEX 的强项是从组成直接预测稳定/亚稳结构，且可以自然地接入第一性原理计算。官方材料显示，现代 USPEX 还支持变组成搜索、分子晶体、二维层状材料、表面重构、聚合物、纳米粒子，以及以硬度、密度、带隙、介电常数等非能量性质为目标的优化。

局限也很明确：随着单胞原子数增加，局域极小点数量和 DFT 单次计算成本都会快速上升。USPEX 的演化策略显著减少了无效搜索，但不能消除结构预测问题的指数复杂性；对很大体系，通常需要空间群/片段/实验晶格/机器学习势等额外先验来降低成本。

#### 🧪 练习题
```yaml
question: "USPEX 为什么要对每个候选结构先做局域优化再评价适应度？"
options:
  - "为了让所有结构具有完全相同的空间群"
  - "为了把搜索从嘈杂的原始构型空间收缩到局域极小点集合，使能量排序更可比"
  - "为了避免使用第一性原理计算"
  - "为了保证每一代只产生一个新结构"
answer: 1
explain: "原始坐标的小扰动会造成很大的能量噪声。局域优化后比较的是各候选对应的局域极小点，更能反映结构 motif 的真实优劣。"
```

### CALYPSO

```yaml
id: calypso
num: 10
name: CALYPSO
full_name: 粒子群晶体结构搜索 (Crystal structure AnaLYsis by Particle Swarm Optimization)
year: '2012'
org: 吉林大学
parent: uspex
paper_url: https://www.calypso.cn
project_url: ''
category: structure_prediction
motivation: 粒子群优化超硬材料预测
```

#### 📝 一句话总结
CALYPSO 将晶体结构预测中的候选结构视为粒子，用粒子群优化在局域弛豫后的能量面上演化结构，并结合对称性约束、键表征矩阵去重和随机注入来高效寻找稳定/亚稳材料结构。

#### 🎯 核心要点
- **PSO 搜索框架**：每个候选结构是一个粒子，位置表示晶格与原子坐标，速度由自身历史最优 \(pbest\) 和群体/局部最优 \(gbest/lbest\) 共同决定
- **从组成出发**：只需给定化学组成和外部条件（如压力），即可预测稳定或亚稳晶体结构
- **对称性约束生成结构**：随机初始结构和新结构生成时引入空间群/对称性，减少搜索变量并提高低能有序结构出现概率
- **键表征矩阵（BCM）**：用基于键长和键方向的旋转不变量描述结构相似性，删除重复结构并辅助划分能量漏斗
- **局域优化降噪**：每个候选结构经 DFT 或经验势弛豫到局域极小点后再进入比较和演化
- **多样性维护**：每代保留一定比例随机新结构，并使用 penalty/Metropolis 等策略避免粒子群过早收敛
- **方法扩展**：CALYPSO 已扩展到 3D 晶体、团簇、二维材料、表面重构、固定分子/固定晶胞/变组成搜索，以及以硬度等功能性质为目标的材料设计

#### 🔬 深入细节
##### 流程图与来源说明

![CALYPSO 流程图](https://cpb.iphy.ac.cn/article/2019/2006/cpb_28_10_106105/cpb_28_10_106105_f2.jpg)
*图：CALYPSO 方法流程，从对称性约束随机生成、BCM 结构表征、局域优化，到 PSO 生成下一代结构并循环至收敛。图源为《中国物理 B》CALYPSO 方法综述 Figure 2。*

> 来源说明：给定 `paper_url` 是 CALYPSO 项目主页。这里的方法细节主要追溯到 Wang, Lv, Zhu & Ma 2012 CPC 论文（arXiv: https://arxiv.org/abs/1205.2264）、2010 PRB 论文（arXiv: https://arxiv.org/abs/1008.3601）、CALYPSO 官方主页和 2019 方法综述。

##### 算法伪代码

```python
# CALYPSO 固定组成结构预测伪代码
population = []
while len(population) < population_size:
    x = generate_random_structure_with_symmetry(composition, pressure)
    if min_distance_constraints(x):
        x = local_relax(x)  # DFT / force field relaxation
        if not similar_by_BCM(x, population):
            population.append(x)

personal_best = {i: population[i] for i in range(population_size)}
global_best = best_by_enthalpy(population)

while not converged(population):
    next_population = keep_low_energy_structures(population)

    # 低能结构按 PSO 演化生成新结构
    for particle in selected_particles(population):
        pbest = personal_best[particle.id]
        guide = choose_gbest_or_lbest(particle, global_best, population)
        particle.velocity = (
            omega * particle.velocity
            + c1 * rand() * (pbest.position - particle.position)
            + c2 * rand() * (guide.position - particle.position)
        )
        child = particle.position + particle.velocity
        child = repair_structure(child, composition, symmetry=True)
        child = local_relax(child)
        if not similar_by_BCM(child, next_population):
            next_population.append(child)

    # 注入一定比例随机结构，防止早熟收敛
    while len(next_population) < population_size:
        x = generate_random_structure_with_symmetry(composition, pressure)
        x = local_relax(x)
        if accept_by_penalty_or_metropolis(x, next_population):
            next_population.append(x)

    population = select_next_generation(next_population)
    update_personal_and_global_best(population, personal_best, global_best)
```

##### 动机与问题设定

晶体结构预测在 0 K 下通常可近似为焓面的全局优化：

$$
\min_{\mathbf{R},\mathbf{A}} H(\mathbf{R},\mathbf{A};P)
= E(\mathbf{R},\mathbf{A}) + P\,V(\mathbf{A})
$$

其中 \(\mathbf{R}\) 是原子坐标，\(\mathbf{A}\) 是晶格矩阵。CALYPSO 的出发点与 USPEX 类似：穷举局域极小点不可行，必须利用能量面中低能结构聚集成漏斗的性质。但它不用遗传算法的 crossover/mutation 作为主更新，而是采用粒子群优化：每个结构既记住自己的历史最好位置，也受群体中最好结构吸引。

PSO 的基础更新写作：

$$
\mathbf{v}_i^{t+1}
= \omega\mathbf{v}_i^t
+ c_1 r_1\left(\mathbf{pbest}_i^t-\mathbf{x}_i^t\right)
+ c_2 r_2\left(\mathbf{gbest}^t-\mathbf{x}_i^t\right)
$$

$$
\mathbf{x}_i^{t+1}=\mathbf{x}_i^t+\mathbf{v}_i^{t+1}
$$

其中 \(\omega\) 是惯性权重，\(c_1,c_2\) 是学习因子，\(r_1,r_2\sim U(0,1)\)。在结构预测语境中，\(\mathbf{x}\) 不是普通向量点，而是编码后的晶格与原子坐标；更新后还必须修复组成、约束和几何合理性，再做局域优化。

##### 全局 PSO 与局部 PSO

CALYPSO 实现了 global PSO 和 local PSO。Global PSO 中所有粒子都被同一个 \(\mathbf{gbest}\) 吸引，收敛快，适合相对简单或小体系。Local PSO 则先利用结构相似性把粒子划分到不同能量漏斗，每个粒子受其所在漏斗的 \(\mathbf{lbest}\) 牵引：

$$
\mathbf{v}_i^{t+1}
= \omega\mathbf{v}_i^t
+ c_1 r_1\left(\mathbf{pbest}_i^t-\mathbf{x}_i^t\right)
+ c_2 r_2\left(\mathbf{lbest}_i^t-\mathbf{x}_i^t\right)
$$

这个设计牺牲一部分收敛速度，换取多漏斗并行探索，降低整个群体过早贴到单一低能 motif 的风险。

##### BCM：结构去重与漏斗划分

只按能量去重不够，因为很多几乎相同的结构会重复占据种群。CALYPSO 使用 Bond Characterization Matrix（BCM）描述结构，它把不同元素对之间的键方向和键长转换成旋转不变量。简化表示如下：

$$
Q_{lm}^{AB} =
\frac{1}{N_b^{AB}}
\sum_{(i,j)\in AB}
w(r_{ij})Y_{lm}(\theta_{ij},\phi_{ij})
$$

再构造旋转不变组合：

$$
Q_l^{AB} =
\left(\frac{4\pi}{2l+1}\sum_{m=-l}^{l}|Q_{lm}^{AB}|^2\right)^{1/2}
$$

两个结构 \(u,v\) 的相似性可用 BCM 向量的欧氏距离度量：

$$
D(u,v)=\left[\sum_{A,B,l}\left(Q_{l,u}^{AB}-Q_{l,v}^{AB}\right)^2\right]^{1/2}
$$

BCM 的作用有两层：一是消除重复/过近结构，节省局域优化预算；二是估计结构属于哪个漏斗，为 local PSO 的 \(\mathbf{lbest}\) 提供依据。

##### 对称性约束与随机注入

完全随机生成的结构通常是无序、液态样式或高能构型。CALYPSO 在生成结构时引入空间群对称性和最小原子间距约束，既减少自由度，也提高有序低能晶体出现概率。这种约束不是把答案写死，而是利用真实晶体常见的对称性先验缩小无效搜索空间。

同时，纯 PSO 容易过早收敛到当前最好结构附近。CALYPSO 每代保留一定比例随机新结构，并用 penalty function 或 Metropolis 接受准则控制多样性。低能结构负责“利用”，随机结构负责“探索”，BCM 负责防止探索预算被重复结构浪费。

##### 与 USPEX 的关系和区别

CALYPSO 和 USPEX 都是从头结构预测工具，都依赖局域优化、硬约束和种群式选择。差异在全局移动规则：USPEX 主要通过 heredity/mutation/permutation 生成子代；CALYPSO 主要通过 PSO 的速度-位置更新让结构朝历史最优和群体最优移动。

这使 CALYPSO 的搜索更像“带记忆的连续优化”：每个粒子保留自己的历史经验，群体共享低能结构信息；而遗传算法更像“结构片段重组”。在复杂体系中，CALYPSO 的 local PSO 和 BCM 漏斗划分尤其重要，因为它允许多个结构 motif 同时演化。

##### 应用与局限

CALYPSO 官方主页列出的能力包括 3D 晶体、团簇、二维层状材料、表面、固定晶胞/固定空间群/固定分子，以及变组成搜索；并已用于超硬材料、超导氢化物和高压新奇化合物设计。局限同样来自结构预测问题本身：DFT 评价昂贵，局域极小点数量随体系规模指数增长；当单胞非常大或组分非常复杂时，需要机器学习势、原型数据库、实验约束或分层筛选降低成本。

#### 🧪 练习题
```yaml
question: "CALYPSO 中 BCM 的主要作用是什么？"
options:
  - "直接替代 DFT 计算结构能量"
  - "用旋转不变的键特征度量结构相似性，以去重并辅助划分能量漏斗"
  - "把所有结构强制转换为同一个空间群"
  - "决定 PSO 中惯性权重 omega 的固定取值"
answer: 1
explain: "BCM 基于键长和键方向构造结构指纹，可识别重复/相似结构，也可帮助 local PSO 判断粒子所在的结构漏斗。"
```

### CDVAE

```yaml
id: cdvae
num: 11
name: CDVAE
full_name: 晶体扩散变分自编码器 (Crystal Diffusion Variational AutoEncoder)
year: '2021'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2110.14810
project_url: ''
category: structure_prediction
motivation: 首次将扩散模型引入晶体生成
```

#### 📝 一句话总结
CDVAE 把周期晶体生成拆成“VAE 潜变量生成组成/晶格/原子数”和“噪声条件分数网络逐步去噪坐标与原子类型”，用退火 Langevin 动力学把随机初始晶体推向稳定结构，解决早期晶体生成模型缺少稳定性归纳偏置和周期对称性处理的问题。

#### 🎯 核心要点
- **VAE + 扩散解码器**：编码真实稳定晶体为潜变量 \(z\)，再由聚合属性预测器输出组成 \(c\)、晶格 \(L\)、原子数 \(N\)，最后用分数网络生成原子坐标和类型
- **周期 PGNN 编码/解码**：使用带周期边界多重图的 SE(3) 等变/不变图网络，显式编码跨晶胞相互作用
- **稳定性归纳偏置**：把真实稳定晶体加噪，再学习去噪方向；生成时分数场类似局部谐振子力场，把坐标推回能量局部极小附近
- **双去噪任务**：坐标分支预测每个原子的 score，类型分支预测真实元素类别，兼顾局部几何稳定性和邻域成键偏好
- **周期最短位移目标**：坐标 score 不直接用 \(X-\tilde X\)，而用跨周期镜像后的最短位移 \(d_{\min}(X,\tilde X)\)，避免等价晶胞表示导致训练目标冲突
- **退火 Langevin 采样**：从预测的组成/晶格约束下随机初始化结构，按噪声从大到小迭代更新坐标并把原子映回晶胞
- **标准基准**：整理 Perov-5、Carbon-24、MP-20 三个数据集，并评估重构、无条件生成、性质优化三类任务

#### 🔬 深入细节
> 来源说明：任务 YAML 给出的 `https://arxiv.org/abs/2110.14810` 实际指向另一篇 HCI 论文。CDVAE 论文的可访问正式来源是 arXiv:2110.06197 和官方代码库 `https://github.com/txie-93/cdvae`，以下方法解读基于这些来源。

![CDVAE 方法总览](https://ar5iv.labs.arxiv.org/html/2110.06197/assets/x2.png)
*图：CDVAE Figure 2。模型先从晶体编码出潜变量，再预测组成、晶格和原子数，随后通过条件分数网络和退火 Langevin 动力学生成周期晶体结构。*

##### 算法伪代码

```python
# CDVAE 训练与生成的核心流程
for crystal M = (A, X, L) in stable_crystal_dataset:
    # 1. VAE 编码：周期多重图 -> 潜变量
    mu, logvar = PGNN_encoder(M)
    z = mu + exp(0.5 * logvar) * normal_noise()

    # 2. 聚合属性预测：组成、晶格参数、原子数
    c_hat = MLP_comp(z)
    L_hat = MLP_lattice(z)
    N_hat = MLP_num_atoms(z)

    # 3. 条件加噪：类型按组成分布扰动，坐标按高斯噪声扰动
    sigma_A, sigma_X = sample_noise_levels()
    A_tilde = perturb_atom_types(A, c_hat, sigma_A)
    X_tilde = X + sigma_X * normal_noise_like(X)

    # 4. 分数解码器：预测周期最短方向和真实元素分布
    score_X, prob_A = PGNN_decoder(A_tilde, X_tilde, L, z, sigma_A, sigma_X)
    loss_dec = mse(score_X, d_min(X, X_tilde) / sigma_X) + atom_ce(prob_A, A)
    loss = loss_agg(c_hat, L_hat, N_hat) + loss_dec + beta * kl_normal(mu, logvar)
    optimizer.step(loss)

# 生成
z = normal_noise()
c, L, N = MLP_agg(z)
A = sample_atom_types(c, N)
X = uniform_points_inside_cell(L, N)
for sigma_A, sigma_X in descending_noise_schedule:
    alpha = eps * sigma_X**2 / sigma_X_min**2
    for step in range(T):
        score_X, prob_A = PGNN_decoder(A, X, L, z, sigma_A, sigma_X)
        X = X + alpha * score_X + sqrt(2 * alpha) * normal_noise_like(X)
        X = back_to_unit_cell(X, L)
        A = sample_or_argmax(prob_A)
return A, X, L
```

##### 动机与背景

晶体结构生成不是普通 3D 点云生成。一个晶体可写成 \(\mathcal{M}=(A,X,L)\)：\(A\) 是原子类型，\(X\in\mathbb{R}^{N\times 3}\) 是原子坐标，\(L\in\mathbb{R}^{3\times 3}\) 是晶格矩阵。它还代表无限周期结构：

$$
\{x_i + k_1 l_1 + k_2 l_2 + k_3 l_3 \mid i=1,\ldots,N,\; k_1,k_2,k_3\in\mathbb{Z}\}
$$

稳定材料只占所有周期排列的极小子空间：坐标和晶格需要接近量子力学能量面的局部极小，元素邻域还要满足复杂成键偏好。早期 voxel、坐标向量或自回归方法通常缺少旋转、平移、置换、周期等不变性，也没有把“从扰动结构回到稳定结构”作为训练目标。

CDVAE 的关键判断是：训练集中的晶体本来就是稳定结构，因此给稳定结构加噪再学习去噪，相当于学习一个把结构推回稳定流形的方向场。这个方向场在坐标上像力场，在元素类型上像局部成键偏好修正器。

##### 模型分解：编码器、聚合属性、分数解码器

CDVAE 的 VAE 部分用周期图神经网络编码晶体：

$$
q_\phi(z\mid M)=\mathcal{N}(\mu_\phi(M),\sigma_\phi^2(M)I),\qquad
z=\mu_\phi(M)+\sigma_\phi(M)\odot\epsilon
$$

解码时并不直接一次性输出所有坐标，而是先预测三个聚合属性：

$$
\hat c,\hat L,\hat N = \mathrm{MLP}_{\mathrm{Agg}}(z)
$$

其中组成 \(c\) 用交叉熵监督，晶格 \(L\) 先经 Niggli reduction 规约成 3 个边长和 3 个夹角，再用回归损失监督，原子数 \(N\) 用分类损失监督。聚合属性约束了后续搜索空间，避免分数网络从完全任意的 100 多元素随机结构开始去噪。

##### 条件分数匹配损失

对真实晶体 \(M=(A,X,L)\)，CDVAE 采样类型噪声 \(\sigma_A\) 和坐标噪声 \(\sigma_X\)。坐标扰动为：

$$
\tilde X \sim \mathcal{N}(X,\sigma_X^2 I)
$$

类型扰动不是简单随机替换，而是用预测组成分布 \(\hat c\) 与真实 one-hot 类型分布 \(p_A\) 混合：

$$
\tilde A \sim \frac{1}{1+\sigma_A}p_A + \frac{\sigma_A}{1+\sigma_A}p_{\hat c}
$$

分数解码器输入 \((\tilde A,\tilde X,L,z,\sigma_A,\sigma_X)\)，输出坐标 score \(s_X\) 和元素概率 \(p_\theta(A)\)。由于晶体坐标有周期等价性，坐标监督目标采用跨镜像后的最短位移：

$$
d_{\min}(x_i,\tilde x_i)=
\min_{k_1,k_2,k_3}
\left(x_i-\tilde x_i+k_1l_1+k_2l_2+k_3l_3\right)
$$

解码器损失可概括为：

$$
\mathcal{L}_{\mathrm{Dec}} =
\frac{1}{2L}\sum_{j=1}^{L}
\mathbb{E}\left[
\left\|s_X(\tilde M\mid z)-\frac{d_{\min}(X,\tilde X)}{\sigma_{X,j}}\right\|_2^2
+\frac{\lambda_a}{\sigma_{A,j}}\mathcal{L}_{a}(p_\theta(A\mid \tilde M,z),p_A)
\right]
$$

总损失为：

$$
\mathcal{L} =
\mathcal{L}_{\mathrm{Agg}}+
\mathcal{L}_{\mathrm{Dec}}+
\beta\,D_{\mathrm{KL}}\left(q_\phi(z\mid M)\,\|\,\mathcal{N}(0,I)\right)
$$

> 💡 关键：CDVAE 的“扩散”不是独立于 VAE 的完整 DDPM，而是把噪声条件分数网络作为 VAE 解码器，用 Langevin 动力学在解码阶段搜索稳定周期结构。

##### 退火 Langevin 动力学与力场直觉

生成时，模型从 \(z\sim\mathcal{N}(0,I)\) 开始预测 \((c,L,N)\)，再随机初始化 \((A_0,X_0)\)。在每个噪声层级 \(j\) 上，用解码器给出的 score 更新坐标：

$$
X_t' = X_{t-1} + \alpha_j s_X(A_{t-1},X_{t-1},L\mid z;\sigma_{A,j},\sigma_{X,j})
+ \sqrt{2\alpha_j}\epsilon_t
$$

$$
X_t = \mathrm{back\_to\_cell}(X_t',L),\qquad
\alpha_j=\epsilon\frac{\sigma_{X,j}^2}{\sigma_{X,L}^2}
$$

论文证明，当噪声足够小时，若分数网络把去噪目标拟合到零误差，则坐标更新中的“力”项近似：

$$
\alpha_j s_X(\tilde A,\tilde X,L\mid z;\sigma_{A,j},\sigma_{X,j})
= -k\,d_{\min}(\tilde X,X)
$$

若扰动小到不跨越周期边界，则退化为普通谐振子力场：

$$
F(\tilde X)=-k(\tilde X-X)
$$

这解释了为什么 CDVAE 的生成过程不像任意坐标采样，而更像在学习数据驱动的局部势能面：坐标被逐步拉回局部平衡位置，元素类型也通过邻域消息传递被拉向合理成键组合。

##### 与此前晶体生成方法的区别

与 voxel-VAE 或直接坐标向量 VAE 相比，CDVAE 明确处理周期多重图和 SE(3) 对称性；与传统 DFT 搜索相比，它不在生成时反复调用昂贵量子计算，而是从稳定结构分布学习低成本先验；与后续 DiffCSP 相比，CDVAE 仍先预测晶格、再在固定晶格下去噪坐标和类型，没有联合扩散晶格和分数坐标，因此在给定组成的 CSP 场景中会被 DiffCSP 进一步改进。

#### 🧪 练习题
```yaml
question: "CDVAE 为什么用周期最短位移 d_min(X, X_tilde) 作为坐标去噪目标？"
options:
  - "为了让所有晶体都转换成正交晶胞"
  - "为了让周期等价的坐标扰动对应同一个去噪方向，避免训练目标冲突"
  - "为了去掉元素类型预测分支"
  - "为了把 Langevin 动力学替换成一次性 MLP 解码"
answer: 1
explain: "晶体中原子跨出晶胞后可由周期镜像表示，同一物理结构有多种坐标写法。d_min 选择跨镜像后的最短位移，使 score 目标与周期等价性一致。"
```

### DiffCSP

```yaml
id: diffcsp
num: 12
name: DiffCSP
full_name: 扩散晶体结构预测 (Diffusion-based Crystal Structure Prediction)
year: '2024'
org: Tsinghua
parent: cdvae
paper_url: https://openreview.net/forum?id=9T_v_8AAAAJ
project_url: ''
category: structure_prediction
motivation: 学习原子坐标扩散提升搜索率
```

#### 📝 一句话总结
DiffCSP 提出对晶格矩阵和分数坐标进行联合等变扩散，用 DDPM 处理连续晶格、用 wrapped-normal score matching 处理周期分数坐标，解决 CDVAE 固定晶格去噪和笛卡尔坐标建模难以充分表达晶体几何对称性的问题。

#### 🎯 核心要点
- **CSP 条件生成**：给定化学组成 \(A\)，直接生成稳定晶格 \(L\) 和分数坐标 \(F\)，目标是结构预测而非纯无条件材料生成
- **联合扩散**：同时更新晶格和坐标，而不是先预测晶格再固定晶格去噪坐标
- **分数坐标表示**：用 \(F\in[0,1)^{3\times N}\) 表示原子位置，天然适配周期边界，比笛卡尔坐标上的周期多重图更直接
- **晶格 DDPM**：把 \(L\) 作为连续变量扩散到高斯先验，并用 O(3)-等变噪声预测器反向去噪
- **坐标 wrapped normal**：把分数坐标视作环面/商空间，用 wrapped normal 前向扰动和 score matching 反向采样
- **周期 E(3) 对称性**：模型保证置换不变、晶格旋转/反射等变、分数坐标周期平移不变
- **Fourier 相对坐标特征**：在全连接图上用 \(\sin/\cos\) 展开相对分数坐标，避免动态周期多重图在噪声晶格下不稳定
- **实验基准**：在 Perov-5、Carbon-24、MP-20、MPTS-52 上对比 CDVAE、P-cG-SchNet、随机搜索、BO、PSO 等方法

#### 🔬 深入细节
> 来源说明：任务给出的 OpenReview 链接可访问但返回 “Note not found”。DiffCSP 论文可访问来源为 arXiv:2309.04475（Crystal Structure Prediction by Joint Equivariant Diffusion）和官方代码库 `https://github.com/jiaor17/DiffCSP`，以下方法解读基于这些来源。

![DiffCSP 方法总览](https://arxiv.org/html/2309.04475v2/x2.png)
*图：DiffCSP Figure 2。给定组成后，模型在时间步 \(t\) 上同时处理晶格矩阵 \(L_t\) 与分数坐标 \(F_t\)，并预测两者的去噪项。*

##### 算法伪代码

```python
# DiffCSP 训练
for crystal in dataset:
    A, L0, F0 = crystal.atom_types, crystal.lattice, crystal.frac_coords
    t = uniform_int(1, T)

    # 晶格 DDPM 前向扰动
    eps_L = normal_like(L0)
    L_t = sqrt(alpha_bar[t]) * L0 + sqrt(1 - alpha_bar[t]) * eps_L

    # 分数坐标 wrapped-normal 前向扰动
    eps_F = normal_like(F0)
    F_t = wrap_to_unit_cell(F0 + sigma[t] * eps_F)

    # 周期 E(3) 等变/不变 denoising model
    eps_L_hat, score_F_hat = phi(L_t, F_t, A, t)

    loss_L = mse(eps_L_hat, eps_L)
    loss_F = lambda_t * mse(score_F_hat, grad_log_wrapped_normal(F_t, F0, sigma[t]))
    optimizer.step(loss_L + loss_F)

# DiffCSP 采样 / CSP 推理
L_T = normal_matrix()
F_T = uniform(0, 1, shape=(3, N))
for t in reversed(range(1, T + 1)):
    eps_L_hat, score_F_hat = phi(L_t, F_t, A, t)
    L_t_minus_1 = ddpm_reverse_step(L_t, eps_L_hat, t)
    F_t_minus_1 = predictor_step_wrapped_normal(F_t, score_F_hat, t)
    F_t_minus_1 = langevin_corrector(F_t_minus_1, score_F_hat, gamma)
    F_t_minus_1 = wrap_to_unit_cell(F_t_minus_1)
return L_0, F_0
```

##### 问题设定与表示

CSP 的输入是组成 \(A\)，输出是稳定结构 \((L,F)\)。晶体的笛卡尔坐标可由晶格和分数坐标恢复：

$$
X = L F
$$

分数坐标的关键好处是周期性变成模 1 的坐标等价：

$$
F \sim w(F+\tau\mathbf{1}^{\top}),\qquad \tau\in\mathbb{R}^{3}
$$

其中 \(w(\cdot)\) 取每个坐标的小数部分。这样，平移周期边界不再需要在笛卡尔空间构造多个镜像边；模型只需在 \([0,1)\) 的环面上学习相对位置。

DiffCSP 把晶体结构分布的对称性拆成三类：原子顺序置换不变、晶格 \(L\) 对 O(3) 旋转/反射等变、分数坐标 \(F\) 对周期平移不变。只要先验分布具备这些不变性，反向转移具备相应等变性，扩散生成的边际分布就继承这些对称性。

##### 晶格扩散：DDPM 处理 \(L\)

晶格矩阵 \(L\) 是连续变量，因此 DiffCSP 使用标准 DDPM 前向过程：

$$
q(L_t\mid L_0)=
\mathcal{N}\left(L_t\mid \sqrt{\bar\alpha_t}L_0,\,(1-\bar\alpha_t)I\right)
$$

等价重参数化为：

$$
L_t=\sqrt{\bar\alpha_t}L_0+\sqrt{1-\bar\alpha_t}\epsilon_L,\qquad
\epsilon_L\sim\mathcal{N}(0,I)
$$

反向过程由 denoising model \(\phi\) 预测噪声 \(\hat\epsilon_L(M_t,t)\)：

$$
p(L_{t-1}\mid M_t)=
\mathcal{N}\left(L_{t-1}\mid \mu(M_t),\sigma^2(M_t)I\right)
$$

$$
\mu(M_t)=\frac{1}{\sqrt{\alpha_t}}
\left(L_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\hat\epsilon_L(M_t,t)\right)
$$

训练损失是噪声预测误差：

$$
\mathcal{L}_{L}=
\mathbb{E}_{\epsilon_L,t}
\left[\left\|\epsilon_L-\hat\epsilon_L(M_t,t)\right\|_2^2\right]
$$

为了保证生成分布对晶格旋转/反射不敏感，\(\hat\epsilon_L\) 要满足 O(3)-等变：

$$
\hat\epsilon_L(QL_t,F_t,A,t)=Q\hat\epsilon_L(L_t,F_t,A,t),\qquad Q^\top Q=I
$$

##### 分数坐标扩散：wrapped normal + score matching

分数坐标 \(F\) 的定义域是 \([0,1)^{3\times N}\)，本质上是由周期性诱导的商空间 \(\mathbb{R}^{3\times N}/\mathbb{Z}^{3\times N}\)。普通高斯 DDPM 的极限分布不适合这个有界环面，因此 DiffCSP 用 wrapped normal 前向扰动：

$$
F_t=w(F_0+\sigma_t\epsilon_F),\qquad \epsilon_F\sim\mathcal{N}(0,I)
$$

其转移密度可写成所有整数镜像的高斯和：

$$
q(F_t\mid F_0)\propto
\sum_{Z\in\mathbb{Z}^{3\times N}}
\exp\left(
-\frac{\|F_t-F_0+Z\|_F^2}{2\sigma_t^2}
\right)
$$

当 \(\sigma_T\) 足够大时，wrapped normal 接近 \(\mathcal{U}(0,1)\)，因此反向采样可从均匀分数坐标开始。坐标分支训练为 score matching：

$$
\mathcal{L}_{F}=
\mathbb{E}_{F_t,t}
\left[
\lambda_t
\left\|
\nabla_{F_t}\log q(F_t\mid F_0)
-\hat\epsilon_F(M_t,t)
\right\|_2^2
\right]
$$

其中 \(\lambda_t\) 用 Monte Carlo 估计做尺度归一化。反向采样结合 ancestral predictor 和 Langevin corrector：predictor 负责沿扩散反向转移推进，corrector 负责用 score 在当前噪声层细化坐标。

> 💡 关键：DiffCSP 没有把周期性当作图构建的后处理，而是直接把坐标空间建模为环面；这让扩散噪声、score 目标和周期平移不变性保持一致。

##### 去噪网络：Fourier 相对分数坐标

DiffCSP 的 denoising model 建在 EGNN 风格消息传递上，但输入边特征不是笛卡尔距离多重边，而是相对分数坐标的 Fourier 展开。第 \(s\) 层可概括为：

$$
m_{ij}^{(s)}=
\varphi_m\left(
h_i^{(s-1)},h_j^{(s-1)},L^\top L,\psi_{\mathrm{FT}}(f_j-f_i),t
\right)
$$

$$
m_i^{(s)}=\sum_j m_{ij}^{(s)},\qquad
h_i^{(s)}=h_i^{(s-1)}+\varphi_h(h_i^{(s-1)},m_i^{(s)})
$$

Fourier 特征可写成：

$$
\psi_{\mathrm{FT}}(\Delta f)=
\left(\sin(2\pi k\Delta f),\cos(2\pi k\Delta f)\right)_{k=1}^{K}
$$

由于 \(\sin/\cos\) 对整数平移周期不变，\(\psi_{\mathrm{FT}}(w(f_j+\tau)-w(f_i+\tau))=\psi_{\mathrm{FT}}(f_j-f_i)\)。晶格分支用全局池化后的节点表示预测 \(\hat\epsilon_l\)，再左乘 \(L\) 得到 O(3)-等变的 \(\hat\epsilon_L=L\hat\epsilon_l\)；坐标分支输出每个原子的 \(\hat\epsilon_F\)，保持周期平移不变。

##### 与 CDVAE 的差异

CDVAE 更像“VAE 先预测聚合属性，固定晶格后用分数网络去噪坐标和类型”；DiffCSP 则把给定组成下的 CSP 看成条件扩散问题，对 \(L\) 和 \(F\) 联合建模。这个联合过程能在生成时同步修正晶胞形状和原子排布，避免坐标去噪被早期晶格预测误差限制。

此外，CDVAE 使用周期多重图处理笛卡尔坐标；DiffCSP 改用分数坐标和 Fourier 相对位置，使周期性成为坐标系统的一部分。论文消融显示，动态多重图在噪声晶格下会带来训练不稳定，而 Fourier 特征帮助模型更快收敛并避免破坏周期平移不变性。

#### 🧪 练习题
```yaml
question: "DiffCSP 为什么不用普通高斯 DDPM 直接扩散分数坐标 F？"
options:
  - "因为分数坐标是离散变量，不能求梯度"
  - "因为分数坐标位于周期环面上，普通高斯不能正确表达模 1 等价和均匀极限"
  - "因为 DDPM 只能用于图像，不能用于材料"
  - "因为晶格矩阵 L 已经包含了所有坐标信息"
answer: 1
explain: "分数坐标的 0 和 1 在周期边界下等价，定义域是商空间/环面。wrapped normal 的镜像求和能保持这种周期性，并在大噪声时接近均匀分布。"
```

### FlowMM

```yaml
id: flowmm
num: 13
name: FlowMM
full_name: 黎曼流匹配材料生成 (Riemannian Flow Matching for Materials)
year: '2024'
org: MIT
parent: cdvae
paper_url: https://arxiv.org/abs/2406.04713
project_url: ''
category: structure_prediction
motivation: 流匹配技术效率提升3倍
```

#### 📝 一句话总结
FlowMM 把晶体生成建模为晶格参数、周期分数坐标和可选原子类型上的黎曼流匹配问题，用连续归一化流替代多种扩散过程，在 CSP 和 de novo 生成中以更少积分步数获得与 DiffCSP 竞争或更好的结构质量。

#### 🎯 核心要点
- **Riemannian Flow Matching**：在晶体天然所在的乘积流形 \(\mathcal{C}=\mathcal{A}\times\mathcal{F}\times\mathcal{L}\) 上学习时间依赖向量场
- **两类模型**：CSP 模型给定组成，只生成分数坐标和晶格；DNG 模型同时生成原子类型、分数坐标和晶格
- **周期分数坐标流形**：把 \(F\) 视作 flat torus，路径沿周期测地线连接 base 样本和真实样本
- **晶格参数化**：用 3 个边长和 3 个角度表示晶胞，角度经 \([60,120]\to\mathbb{R}\) 的可逆变换进入无约束空间
- **更自由的 base distribution**：边长用从训练集拟合的 log-normal，角度用 uniform，坐标用 \(\mathcal{U}(0,1)\)，比扩散模型必须收敛到标准高斯更贴合晶体
- **平移不变的条件向量场**：在坐标分支从 torus log map 中减去平均平移，保证边际概率路径对周期平移不变
- **analog bits 原子类型**：DNG 中用 \(\lceil\log_2 h\rceil\) 维二进制表示替代 100 维 one-hot/simplex，降低原子类型生成维度
- **推理效率**：CSP 中约 50 个积分步即可达到强匹配率，相比 DiffCSP 常用 1000 步显著减少；DNG 稳定材料发现成本约提升 3 倍

#### 🔬 深入细节
![FlowMM 概念图](https://arxiv.org/html/2406.04713v1/x1.png)
*图：FlowMM Figure 1。模型学习从 base distribution 到目标晶体分布的向量场，联合处理晶格参数、周期分数坐标和原子类型表示。*

##### 算法伪代码

```python
# FlowMM 训练：Riemannian Flow Matching
for target_crystal in dataset:
    A1, F1, ell1 = encode_crystal(target_crystal)  # ell: lattice lengths + angles
    A0 = normal_bits_like(A1) if de_novo else A1   # CSP 中 A 是条件，不流动
    F0 = uniform(0, 1, shape=F1.shape)
    ell0 = sample_lattice_base_distribution()
    t = uniform(0.0, 1.0)

    # 在各自流形上沿测地线取中间点
    A_t = interpolate_euclidean(A0, A1, t) if de_novo else A1
    F_t = torus_geodesic(F0, F1, t)
    ell_t = euclidean_geodesic(transform(ell0), transform(ell1), t)

    # 目标向量场：欧氏变量是 (x1 - x0)，周期坐标用 torus log map 并去掉平均平移
    u_A = A1 - A0
    u_F = torus_log(F1, F0) - mean_i(torus_log(F1_i, F0_i))
    u_ell = transform(ell1) - transform(ell0)

    v_A, v_F, v_ell = GNN_vector_field(A_t, F_t, ell_t, t)
    loss = weighted_mse(v_A, u_A) + weighted_mse(v_F, u_F) + weighted_mse(v_ell, u_ell)
    optimizer.step(loss)

# FlowMM 推理
A, F, ell = sample_base_distribution(conditioned_composition=None_or_A)
for t in ode_solver_grid(0.0, 1.0, num_steps):
    v_A, v_F, v_ell = GNN_vector_field(A, F, ell, t)
    scale = 1 + s_prime * t              # optional inference anti-annealing
    A = A + dt * scale * v_A
    F = wrap_to_unit_cell(F + dt * scale * v_F)
    ell = ell + dt * scale * v_ell
return discretize_atom_bits(A), decode_lattice_params(ell), F
```

##### 从扩散到流匹配

DiffCSP/CDVAE 要为不同变量设计不同扩散：晶格用高斯 DDPM，周期坐标用 wrapped-normal score matching，原子类型用离散或连续分类扩散。FlowMM 的出发点是：晶体变量本来就在不同几何空间上，与其强行把它们都扩散到某种固定极限分布，不如直接学习从一个可选 base distribution 到目标数据分布的连续流。

Flow Matching 的基本目标是在时间 \(t\in[0,1]\) 上学习向量场 \(v_t^\theta\)，回归一个已知的条件向量场 \(u_t(\cdot\mid m_1)\)：

$$
\mathcal{L}(\theta)=
\mathbb{E}_{t,q(m_1),p_t(m\mid m_1)}
\left\|v_t^\theta(m)-u_t(m\mid m_1)\right\|^2
$$

在推理时，从 base 样本 \(m_0\sim p_0\) 出发，求解 ODE：

$$
\frac{d}{dt}\psi_t(m)=v_t^\theta(\psi_t(m)),\qquad \psi_0(m)=m_0
$$

最终 \(\psi_1(m_0)\) 近似服从目标晶体分布。相比扩散模型反复去噪，FlowMM 的路径是有限时间的确定性流，因此通常需要少得多的积分步。

##### 晶体乘积流形 \(\mathcal{C}\)

FlowMM 把晶体写成：

$$
\mathcal{C}=\mathcal{A}\times\mathcal{F}\times\mathcal{L}
$$

其中 \(\mathcal{F}\) 是 \(n\times 3\) 个分数坐标组成的 flat torus，\(\mathcal{L}\) 是晶格参数空间，\(\mathcal{A}\) 是原子类型空间。CSP 中 \(\mathcal{A}\) 是条件输入，速度为 0；DNG 中 \(\mathcal{A}\) 也参与生成。

晶格不直接用 \(3\times 3\) 矩阵，而用旋转不变的 6 个晶格参数：

$$
\ell=(a,b,c,\alpha,\beta,\gamma)
$$

边长 \(a,b,c>0\)，角度由 Niggli reduction 约束在 \([60,120]\)。为避免角度边界导致向量场不光滑，FlowMM 使用可逆变换：

$$
\varphi(\eta)=\log\frac{(\eta-60)/120}{1-(\eta-60)/120}
$$

推理结束后再用：

$$
\varphi^{-1}(\eta')=120\,\mathrm{sigmoid}(\eta')+60
$$

映回物理角度范围。

##### Base distribution 的选择

扩散模型通常需要一个简单极限分布，例如标准高斯。但晶格边长为正、角度有界，标准高斯并不自然。FlowMM 借助 Flow Matching 可自由选择 base distribution：

$$
p(A,F,\ell)=p(A)p(F)p(\ell)
$$

坐标分支使用：

$$
p(F)=\mathcal{U}(0,1)
$$

晶格边长使用从训练集最大似然拟合的 log-normal，角度使用 \(\mathcal{U}(60,120)\)。DNG 的原子类型用 analog bits：

$$
A\in\{-1,1\}^{\lceil\log_2 h\rceil}
$$

当 \(h\approx 100\) 个元素类别时，analog bits 只需 7 维，而 one-hot/simplex 需要约 100 维。模型在连续空间中流动，最后用 \(\mathrm{sign}\) 离散化为类别编码。

> 💡 关键：FlowMM 的 base distribution 不是“数学上最简单”，而是“对晶体变量更自然”。这减少了模型要学习的无谓变形，尤其是晶格分布。

##### 周期分数坐标的测地线与平移不变目标

在 flat torus 上，两个分数坐标之间的 log map 要按周期最短方向计算。对单个原子坐标 \(f^i\)，FlowMM 使用：

$$
\omega^i=2\pi(f_1^i-f_0^i)
$$

$$
\log_{f_0^i}(f_1^i)=
\frac{1}{2\pi}\operatorname{atan2}(\sin\omega^i,\cos\omega^i)
$$

如果直接用 \(-\log_{F_1}(F)/(1-t)\) 作为坐标向量场，它会对全局周期平移等变，而不是不变。FlowMM 在切空间中减去平均平移：

$$
u_t^{\mathcal{F}}(F\mid F_1)=
\log_{F_1}(F)-
\frac{1}{n}\sum_{i=1}^{n}\log_{f_1^i}(f^i)
$$

这类似欧氏点云中去中心化，但发生在 torus 的切空间里。这样条件路径可以集中到与 \(F_1\) 周期平移等价的一整类点，而边际概率路径保持周期平移不变。

##### FlowMM 目标函数

FlowMM 在三个变量分量上做加权向量场回归。简化写法为：

$$
\mathcal{L}=
\mathbb{E}\left[
\frac{\lambda_A}{hn}\|v_t^{A,\theta}-u_A\|^2+
\frac{\lambda_F}{3n}\|v_t^{F,\theta}-u_F\|^2+
\frac{\lambda_\ell}{6}\|v_t^{\ell,\theta}-u_\ell\|^2
\right]
$$

其中 CSP 中 \(u_A=0\)，DNG 中 \(u_A=A_1-A_0\)；坐标目标 \(u_F\) 使用上面的去平均 torus log map；晶格目标 \(u_\ell\) 在无约束晶格参数空间中计算。论文还约束权重为仿射组合：

$$
\lambda_A+\lambda_F+\lambda_\ell=1
$$

##### 神经网络结构与推理 anti-annealing

FlowMM 在 CSP 中沿用 DiffCSP 风格的 EGNN 消息传递，以便做公平比较。边特征使用相对分数坐标的正弦嵌入：

$$
\mathrm{SinusoidalEmbedding}(x)=
\left(\sin(2\pi kx),\cos(2\pi kx)\right)_{k=0}^{n_{\mathrm{freq}}}
$$

消息传递后，节点头输出 \(\dot F=v_t^{F,\theta}\)，图级池化头输出 \(\dot\ell=v_t^{\ell,\theta}\)。DNG 中再增加 \(\dot A\) 输出头，并用 analog-bit sigmoid cross entropy 辅助原子类型离散化。

推理时，FlowMM 可对速度做 anti-annealing：

$$
\frac{d}{dt}\psi_t^\theta=s(t)v_t^\theta(\psi_t^\theta),\qquad
s(t)=1+s't
$$

论文发现 CSP 中对分数坐标分支增大后期速度通常有益，但对晶格分支可能有害。这是推理技巧，不改变训练目标。

##### 与 CDVAE/DiffCSP 的关系

CDVAE 首先把扩散思想引入晶体生成，但通过 VAE 潜变量和 score decoder 间接生成结构；DiffCSP 把给定组成的 CSP 变成联合扩散问题，显著增强了晶格和坐标协同生成；FlowMM 则把同一问题进一步改写为流匹配，保留 DiffCSP 的对称性思想，同时避免为每类变量设计独立扩散过程。

在实验上，FlowMM 在 MP-20、MPTS-52 等更真实数据集上用更少积分步达到高 match rate。论文报告 CSP 中约 50 步即可达到强表现，相比 DiffCSP 常用 1000 步是数量级下降；DNG 中用 DFT/energy-above-hull 做稳定性验证，稳定材料发现成本约为已有开放方法的 1/3。

#### 🧪 练习题
```yaml
question: "FlowMM 相比 DiffCSP 的核心效率优势来自哪里？"
options:
  - "完全不生成晶格，只复制训练集晶格"
  - "用 Riemannian Flow Matching 学习从合适 base distribution 到晶体分布的连续向量场，减少反向采样步数"
  - "把所有原子类型都固定为碳元素"
  - "取消周期边界条件以简化坐标空间"
answer: 1
explain: "FlowMM 不需要像扩散模型那样长链反向去噪，而是通过连续归一化流积分从 base 分布到目标分布；再配合自然晶格 base 和流形几何，因此推理步数显著减少。"
```

### MatterGen

```yaml
id: mattergen
num: 14
name: MatterGen
full_name: 材料生成模型 (Matter Generator)
year: '2025'
org: Microsoft
parent: diffcsp
paper_url: https://www.nature.com/articles/s41586-023-06735-9
project_url: ''
category: structure_prediction
motivation: 目标性质逆向设计生成
```

#### 📝 一句话总结
MatterGen 提出面向无机晶体的联合扩散生成模型，同时去噪原子类型、周期坐标和晶格，并通过 adapter 微调与 classifier-free guidance 实现化学组成、空间群、带隙、体模量、磁密度等目标性质的逆向设计。

#### 🎯 核心要点
- **三路晶体扩散**：对原子类型 \(\mathbf{A}\)、分数坐标 \(\mathbf{X}\) 和晶格 \(\mathbf{L}\) 分别定义适配其几何结构的 corruption process
- **周期坐标建模**：坐标扩散使用 wrapped Normal，保证分数坐标在周期边界 \([0,1)^3\) 上连续去噪
- **晶格去噪**：晶格扩散在对称晶格矩阵子空间中进行，噪声极限接近具有训练集平均原子密度的立方晶格分布
- **离散元素扩散**：原子类型使用 D3PM 式 categorical diffusion，把元素逐步腐化到 masked state，再学习反向元素分布
- **等变 score 网络**：采用 SE(3)-equivariant GNN 预测坐标 score、晶格 score 和原子类型 logits，减少模型自行学习物理对称性的负担
- **adapter 条件微调**：在预训练 base model 的消息传递层注入 property embedding，少量标注数据即可学习条件 score
- **classifier-free guidance**：同时学习有条件与无条件 score，采样时用 guidance factor 放大目标性质条件
- **大规模预训练数据**：base model 使用 Alex-MP-20，包含约 607,684 个稳定、20 原子以内的无机晶体结构
- **多目标设计**：支持化学体系、空间群、磁密度、带隙、体模量以及低供应链风险磁体等单目标和联合约束

#### 🔬 深入细节
![MatterGen 无机材料生成流程](https://ar5iv.labs.arxiv.org/html/2312.03687/assets/x1.png)
*图：MatterGen 的总体流程。模型从随机晶体出发，反向去噪原子类型、坐标和晶格；预训练 score network 后，通过 adapter 注入目标性质条件。公开图源来自 arXiv:2312.03687 的 ar5iv HTML。*

> ⚠️ 来源说明：任务 YAML 中的 `paper_url` 指向 `s41586-023-06735-9`，该链接不是 MatterGen 论文。MatterGen 的实际 Nature 论文为 `https://www.nature.com/articles/s41586-025-08628-5`，可访问预印本为 `https://arxiv.org/abs/2312.03687`，本文方法细节依据 arXiv 版本和官方 Microsoft MatterGen 仓库。

##### 算法伪代码

```python
# MatterGen 训练与条件生成伪代码
base_data = load_stable_crystals("Alex-MP-20")  # A, X, L

for step in pretraining_steps:
    A0, X0, L0 = sample(base_data)
    t = sample_diffusion_step()
    At = categorical_corrupt(A0, t)        # atom type diffusion
    Xt = wrapped_normal_corrupt(X0, t, Lt) # periodic coordinate diffusion
    Lt = symmetric_lattice_corrupt(L0, t)  # lattice diffusion

    pred_coord_score, pred_lattice_score, pred_type_logits = score_net(At, Xt, Lt, t)
    loss = lambda_coord * score_loss(pred_coord_score, true_coord_score)
    loss += lambda_cell * score_loss(pred_lattice_score, true_lattice_score)
    loss += lambda_types * d3pm_type_loss(pred_type_logits, A0, At, t)
    update(score_net, loss)

for property_task in labeled_tasks:
    add_adapters(score_net, property_embedding=property_task.label_encoder)
    fine_tune_with_same_diffusion_loss(score_net, property_task.labeled_crystals)

def generate(condition, gamma=2.0):
    A, X, L = sample_noise_limit()
    for t in reversed(range(1, T + 1)):
        s_cond = score_net(A, X, L, t, condition)
        s_uncond = score_net(A, X, L, t, condition=None)
        s_guided = gamma * s_cond + (1 - gamma) * s_uncond
        A, X, L = reverse_diffusion_step(A, X, L, s_guided, t)
        X, L = langevin_corrector(X, L, s_guided)
    return decode_crystal(A, X, L)
```

##### 晶体表示与三路扩散

MatterGen 把一个晶体写成：

$$
\mathbf{M} = (\mathbf{A}, \mathbf{X}, \mathbf{L})
$$

其中 \(\mathbf{A}\) 是 unit cell 内每个原子的元素类型，\(\mathbf{X}\in[0,1)^{3\times n}\) 是分数坐标，\(\mathbf{L}\in\mathbb{R}^{3\times 3}\) 是晶格矩阵。分数坐标与笛卡尔坐标的关系为：

$$
\mathbf{R} = \mathbf{L}\mathbf{X}, \qquad \mathbf{X} = \mathbf{L}^{-1}\mathbf{R}
$$

普通图像扩散只需要给像素加高斯噪声，但晶体同时有离散元素、周期坐标和可变晶格。MatterGen 因此把前向扩散分解为：

$$
q(\mathbf{M}_{t+1}\mid\mathbf{M}_t)
= q(\mathbf{A}_{t+1}\mid\mathbf{A}_t)\,
q(\mathbf{X}_{t+1}\mid\mathbf{X}_t)\,
q(\mathbf{L}_{t+1}\mid\mathbf{L}_t)
$$

坐标部分使用 wrapped Normal：

$$
\mathcal{N}_{W}(\bar{\mathbf{x}};\mathbf{x},\sigma^2\mathbf{I})
= \sum_{\mathbf{k}\in\mathbb{Z}^3}
\mathcal{N}(\bar{\mathbf{x}};\mathbf{x}-\mathbf{k},\sigma^2\mathbf{I})
$$

这个设计的直觉是，\(\mathbf{x}=0.99\) 与 \(\mathbf{x}=0.01\) 在周期晶胞里相邻，而普通高斯会错误地把它们看作相距很远。wrapped Normal 把整数平移后的概率叠加起来，使扩散过程尊重周期边界。

##### 训练目标

score network 需要同时预测坐标 score、晶格 score 和原子类型反向分布。总损失写作：

$$
L = \lambda_{\text{coord}}L_{\text{coord}}
+ \lambda_{\text{cell}}L_{\text{cell}}
+ \lambda_{\text{types}}L_{\text{types}}
$$

其中坐标和晶格损失是 score matching：

$$
L_{\text{coord}}
= \sum_{t=1}^{T}\sigma_t(n)^2
\mathbb{E}\left[
\left\|s_{\mathbf{X},\theta}(\mathbf{M}_t,t)
- \nabla_{\mathbf{X}_t}\log q(\mathbf{X}_t\mid\mathbf{X}_0)\right\|_2^2
\right]
$$

$$
L_{\text{cell}}
= \sum_{t=1}^{T}(1-\bar{\alpha}_t)\sigma_t(n)^2
\mathbb{E}\left[
\left\|s_{\mathbf{L},\theta}(\mathbf{M}_t,t)
- \nabla_{\mathbf{L}_t}\log q(\mathbf{L}_t\mid\mathbf{L}_0)\right\|_2^2
\right]
$$

原子类型是离散变量，使用 D3PM 的变分项加 cross-entropy：

$$
L_{\text{types}}
\approx
\mathbb{E}\left[
\mathrm{KL}\big(q(\mathbf{A}_{t-1}\mid\mathbf{A}_t,\mathbf{A}_0)
\|p_{\theta}(\mathbf{A}_{t-1}\mid\mathbf{M}_t)\big)
-\lambda_{\text{CE}}\log p_{\theta}(\mathbf{A}_0\mid\mathbf{M}_t,t)
\right]
$$

论文实现中 base model 使用 \(\lambda_{\text{coord}}=0.1\)，\(\lambda_{\text{cell}}=\lambda_{\text{types}}=1\)，并采用 \(\lambda_{\text{CE}}=0.01\)。这体现了一个关键取舍：坐标和晶格是连续 score matching，元素类型则更像 masked categorical recovery。

##### adapter 与条件生成

MatterGen 不为每个性质从头训练扩散模型，而是在预训练 score network 的每个消息传递层前加入 adapter。给定性质 embedding \(\mathbf{g}\) 和第 \(L\) 层节点表示 \(\mathbf{H}^{(L)}_j\)，adapter 的形式可概括为：

$$
\mathbf{H}'^{(L)}_j
= \mathbf{H}^{(L)}_j
+ f_{\text{mixin}}^{(L)}\left(
f_{\text{adapter}}^{(L)}(\mathbf{g})
\right)\cdot\mathbb{I}(\text{property is not null})
$$

其中 mix-in 层零初始化，所以微调刚开始时模型仍等价于无条件 base model。这一点很重要：稳定晶体生成能力来自大规模无标签结构预训练，少量标注性质只负责把分布推向目标区域，而不是重新学习“什么是合理晶体”。

采样时采用 classifier-free guidance。连续变量的 guided score 可写为：

$$
s_{\text{guided}}(\mathbf{M}_t,c)
= \gamma s_{\theta}(\mathbf{M}_t,c,t)
+ (1-\gamma)s_{\theta}(\mathbf{M}_t,\varnothing,t)
$$

论文条件生成实验采用 \(\gamma=2\)。当需要联合约束多个性质时，模型把多个性质 embedding 同时输入 adapter，例如同时要求高磁密度和低 HHI 供应链风险分数。

##### 与 DiffCSP/CDVAE 的区别

DiffCSP 已经把扩散用于晶体结构预测，但 MatterGen 的目标更接近通用逆向设计：它不只在固定组成下生成坐标或结构，而是联合生成元素、坐标和晶格，并可以用 property labels 调控整个反向扩散轨迹。与只做筛选的流程相比，MatterGen 直接在目标性质条件下采样候选结构，能更高效地探索尾部分布，例如高体模量、目标带隙或低供应链风险磁体。

> 💡 关键：MatterGen 的核心不是“把文本条件塞进扩散模型”，而是为晶体的三种变量类型分别设计物理一致的噪声极限，再用 adapter 把少量性质标注转化为条件 score。

#### 🧪 练习题
```yaml
question: "MatterGen 为什么不能直接对晶体分数坐标使用普通高斯扩散？"
options:
  - "因为分数坐标是离散变量，只能用交叉熵训练"
  - "因为分数坐标存在周期边界，0 和 1 附近的位置在物理上相邻"
  - "因为晶格矩阵必须被固定为单位矩阵"
  - "因为 classifier-free guidance 只能处理整数坐标"
answer: 1
explain: "晶体分数坐标定义在周期晶胞中，普通高斯会破坏边界连续性；wrapped Normal 通过整数平移求和来尊重周期结构。"
```

### M3GNet

```yaml
id: m3gnet
num: 15
name: M3GNet
full_name: 三体图网络 (Multi-body Graph Network)
year: '2022'
org: UCSD
parent: megnet
paper_url: https://www.nature.com/articles/s43588-022-00349-3
project_url: ''
category: mlip
motivation: 通用势函数覆盖89种元素
```

#### 📝 一句话总结
M3GNet 把材料图网络扩展为显式包含三体角度信息、原子坐标和晶格矩阵的通用机器学习原子间势，在 89 种元素的大规模 Materials Project 弛豫数据上学习能量、力和应力，从而让结构弛豫、分子动力学和新材料筛选不必为每个化学体系重新拟合势函数。

#### 🎯 核心要点
- **位置增强材料图**：图表示为 \(\mathcal{G}=(\mathcal{V},\mathcal{E},\mathcal{X},[\mathbf{M},\mathbf{u}])\)，显式包含原子坐标 \(\mathcal{X}\) 和晶格矩阵 \(\mathbf{M}\)
- **三体 many-body block**：在 bond update 前计算 \(\theta_{jik}\) 等三体角度，把 atom \(i\) 周围完整键环境注入 \(\mathbf{e}_{ij}\)
- **平滑距离基函数**：键距离展开到连续基函数，并要求函数及一、二阶导数在 cutoff 边界平滑归零，保证力和应力连续
- **能量保守势函数**：readout 输出 atomic energy，求和得到总能量，再通过自动微分得到 \(\mathbf{f}=-\partial E/\partial\mathbf{x}\) 和 \(\boldsymbol{\sigma}=V^{-1}\partial E/\partial\boldsymbol{\epsilon}\)
- **EFS 联合训练**：通用势训练同时拟合 energy、force、stress，论文指出只用 energy 会导致力和应力误差不可用
- **覆盖 89 元素**：MPF.2021.2.8 数据集包含 62,783 个化合物的 187,687 个 ionic steps、约 1,687 万 force components 和 168.9 万 stress components
- **Materials discovery workflow**：用 M3GNet 弛豫约 3166 万个假想结构，筛出约 184.9 万个 \(E_{\text{hull-m}}<0.001\ \mathrm{eV/atom}\) 的候选
- **与 MEGNet 的关系**：继承 MEGNet 的材料图与状态更新思想，但为 IAP 增加坐标、晶格、三体交互和平滑可微约束

#### 🔬 深入细节
![M3GNet many-body graph potential 示意图](https://ar5iv.labs.arxiv.org/html/2202.02450/assets/x1.png)
*图：M3GNet 从 position-included graph 出发，经过 featurization、many-body-to-bond、graph convolution 和 readout，输出能量并由自动微分得到力与应力。公开图源来自 arXiv:2202.02450 的 ar5iv HTML。*

##### 算法伪代码

```python
# M3GNet universal interatomic potential 伪代码
graph = build_periodic_graph(structure, radial_cutoff=5.0)
V = embed_atomic_numbers(Z, dim=64)
E0 = smooth_distance_basis(pair_distances)  # derivatives vanish at cutoff
triplets = enumerate_triplets(center=i, cutoff=4.0)
u = optional_state_vector

for block in range(3):
    # many-body to bond: use angles around center atom i to update bond e_ij
    for (i, j) in graph.edges:
        env = 0
        for k in neighbors(i, exclude=j):
            theta_jik = angle(edge(i, j), edge(i, k))
            env += bessel_spherical_basis(r_ik, theta_jik) * gate(V[k])
        E[i, j] = E[i, j] + gated_mlp(env)

    # graph convolution: update bonds, atoms, and optional global state
    for (i, j) in graph.edges:
        E[i, j] = E[i, j] + phi_e(concat(V[i], V[j], E[i, j], u)) @ E0[i, j]
    for i in graph.nodes:
        V[i] = V[i] + sum(phi_e_prime(concat(V[i], V[j], E[i, j], u)) @ E0[i, j]
                         for j in neighbors(i))
    u = update_state(mean(V), u)

atomic_energy = gated_mlp_readout(V)
E_total = sum(atomic_energy)
forces = -grad(E_total, atomic_positions)
stress = grad(E_total, strain) / volume

loss = huber(E_per_atom, E_dft_per_atom)
loss += w_f * huber(forces, forces_dft)
loss += w_sigma * huber(stress, stress_dft)
```

##### 为什么普通材料 GNN 不够做 IAP

CGCNN、MEGNet 等图网络主要面向性质预测，常把边表示为截断半径内的距离展开，再做消息传递和池化。这对 formation energy、band gap 等标量性质有效，但直接作为势函数会遇到两个问题。第一，势函数需要对坐标和晶格连续可微，否则力、声子、MD 会出现不稳定。第二，局域化学环境不只由 pair distance 决定，角度和多体相互作用对晶体稳定性很关键。

M3GNet 因此把图定义为：

$$
\mathcal{G}=(\mathcal{V},\mathcal{E},\mathcal{X},[\mathbf{M},\mathbf{u}])
$$

其中 \(\mathcal{V}\) 是原子特征，\(\mathcal{E}\) 是键特征，\(\mathcal{X}\) 是原子坐标，\(\mathbf{M}\) 是晶格矩阵，\(\mathbf{u}\) 是可选全局状态。坐标和晶格进入图表示后，模型不仅能预测标量能量，也能通过能量对几何变量的导数给出物理量。

##### 三体 many-body to bond

设 \(\mathcal{N}_i\) 是中心原子 \(i\) 的邻居集合。M3GNet 先用 \(n\)-body 思路更新 bond \(\mathbf{e}_{ij}\)：

$$
\tilde{\mathbf{e}}_{ij}
= \sum_{k_1,\ldots,k_{n-2}\in\mathcal{N}_i/j}
\phi_n(\mathbf{e}_{ij},\mathbf{r}_{ij},\mathbf{v}_{j},
\mathbf{r}_{ik_1},\ldots,\mathbf{v}_{k_{n-2}})
$$

论文聚焦 \(n=3\)，即三体 M3GNet。令 \(\theta_{jik}\) 为 \(\mathbf{e}_{ij}\) 与 \(\mathbf{e}_{ik}\) 的夹角，三体角度项用 spherical Bessel 与 spherical harmonics 展开：

$$
\tilde{\mathbf{e}}_{ij}
= \sum_k
j_l\left(z_{ln}\frac{r_{ik}}{r_c}\right)
Y_l^0(\theta_{jik})
\odot \sigma(\mathbf{W}_v\mathbf{v}_k+\mathbf{b}_v)
f_c(r_{ij})f_c(r_{ik})
$$

$$
\mathbf{e}'_{ij}
= \mathbf{e}_{ij}
+ g(\tilde{\mathbf{W}}_2\tilde{\mathbf{e}}_{ij}+\tilde{\mathbf{b}}_2)
\odot
\sigma(\tilde{\mathbf{W}}_1\tilde{\mathbf{e}}_{ij}+\tilde{\mathbf{b}}_1)
$$

这里 \(f_c(r)=1-6(r/r_c)^5+15(r/r_c)^4-10(r/r_c)^3\) 是平滑 cutoff，\(g(x)=x\sigma(x)\) 是 swish-like gate。直觉上，\(\mathbf{e}_{ij}\) 不再只代表一条边的距离，而是吸收了中心原子 \(i\) 周围其他邻居 \(k\) 构成的角环境。

##### 图卷积、readout 与物理量

三体更新后，M3GNet 继续做 bond、atom、state 更新：

$$
\mathbf{e}'_{ij}
= \mathbf{e}_{ij}
+ \phi_e(\mathbf{v}_i\oplus\mathbf{v}_j\oplus\mathbf{e}_{ij}\oplus\mathbf{u})
\mathbf{W}_e^0\mathbf{e}_{ij}^0
$$

$$
\mathbf{v}'_i
= \mathbf{v}_i
+ \sum_j
\phi'_e(\mathbf{v}_i\oplus\mathbf{v}_j\oplus\mathbf{e}'_{ij}\oplus\mathbf{u})
\mathbf{W}_e^{0'}\mathbf{e}_{ij}^0
$$

$$
\mathbf{u}'
= g\left(\mathbf{W}_2^u g\left(\mathbf{W}_1^u
\left(\frac{1}{N_v}\sum_i^{N_v}\mathbf{v}_i\oplus\mathbf{u}\right)
+\mathbf{b}_1^u\right)+\mathbf{b}_2^u\right)
$$

最后 readout 不是直接预测力，而是预测原子能量并求和：

$$
E = \sum_i E_i
$$

力和应力来自能量导数：

$$
\mathbf{f} = -\frac{\partial E}{\partial \mathbf{x}}, \qquad
\boldsymbol{\sigma}=V^{-1}\frac{\partial E}{\partial\boldsymbol{\epsilon}}
$$

这让模型保持能量守恒：力场不是独立回归出来的一组向量，而是同一个势能面的梯度。

##### EFS 训练目标

通用 IAP 使用 Huber loss 联合训练能量、力和应力：

$$
L = \ell(e,e_D)
+ w_f\ell(\mathbf{f},\mathbf{f}_D)
+ w_{\sigma}\ell(\boldsymbol{\sigma},\boldsymbol{\sigma}_D)
$$

其中 \(e\) 是 energy per atom，\(\ell\) 是 Huber loss，\(D\) 表示 DFT 标签。论文在 MPF.2021.2.8 训练中使用 \(w_f=1\)、\(w_{\sigma}=0.1\)。在训练前还会用线性回归拟合元素参考能：

$$
E_{\text{ref}} = \sum_i c_i E_i
$$

再从总能量中扣除参考项，以降低不同元素组成带来的能量尺度差异。最终 M3GNet-EFS 在测试集上达到约 \(0.035\ \mathrm{eV/atom}\) energy MAE、\(0.072\ \mathrm{eV/\AA}\) force MAE 和 \(0.41\ \mathrm{GPa}\) stress MAE。

##### 与 MEGNet 和传统势函数的区别

MEGNet 的全局状态向量适合多性质预测，但它本身不保证作为 IAP 所需的几何连续性。M3GNet 保留材料图框架，同时加入三体角度、平滑 cutoff、坐标/晶格自微分和 EFS 损失。与 EAM、MEAM、MTP 等传统或局域 ML 势相比，M3GNet 的元素以 learnable embedding 进入节点特征，避免为每个元素组合单独扩大参数表，因此能覆盖 89 种元素和多组分晶体。

> 💡 关键：M3GNet 的“通用性”来自两个条件同时成立：训练数据覆盖足够多的 Materials Project 弛豫轨迹，模型结构又把能量、力、应力绑定到同一个可微势能面。

#### 🧪 练习题
```yaml
question: "M3GNet 作为通用原子间势时，为什么要同时训练能量、力和应力？"
options:
  - "因为只训练能量会使元素 embedding 失效"
  - "因为力和应力是结构弛豫、声子和晶格变化所需的导数信息，只用能量会放大导数误差"
  - "因为应力标签可以替代所有原子坐标"
  - "因为 Huber loss 不能用于单一目标"
answer: 1
explain: "M3GNet 的力和应力来自能量导数；如果训练只约束能量，导数误差会被放大，难以用于弛豫和动力学。"
```

### MACE

```yaml
id: mace
num: 16
name: MACE
full_name: 高阶等变消息传递 (Multi-Atomic Cluster Expansion)
year: '2022'
org: Cambridge
parent: gemnet
paper_url: https://proceedings.neurips.cc/paper/2022/hash/4a36c3c51af11ed9f34615b81edb5bbc-Abstract-Conference.html
project_url: ''
category: mlip
motivation: 高阶等变消息实现近DFT精度
```

#### 📝 一句话总结
MACE 把 Atomic Cluster Expansion 的高体阶基函数与 E(3)/O(3) 等变消息传递结合起来，用高阶对称张量积一次性构造多体消息，解决传统二体 MPNN 需要堆很多层才能表达复杂原子环境的问题。

#### 🎯 核心要点
- **高体阶消息传递**：消息从二体扩展到 \((\nu+1)\)-body，四体消息通常只需约两层 message passing 即可达到高精度
- **ACE + MPNN 结合**：用 ACE 式多体完备基构造局域环境，同时保留神经网络消息传递的可学习性和灵活性
- **O(3) 等变特征**：内部特征按球谐阶数 \(L\) 变换，标量能量保持旋转不变，向量/张量信息在消息中保持等变
- **Clebsch-Gordan 张量积**：通过广义 Clebsch-Gordan 系数对 \(A\)-features 做张量积与对称化，避免显式枚举所有 triplets/quadruplets
- **系统可收敛表达**：提高 correlation order \(\nu\)、球谐阶数 \(L\) 和通道数可系统提升多体相互作用表达能力
- **能量-力联合训练**：readout 输出原子 site energy，总能量求和，力由 \(-\partial \hat{E}/\partial r\) 得到
- **训练和推理效率**：相比需要 4-6 层的等变 MPNN，MACE 用更少层数达到相近或更好精度，利于并行化
- **基准表现**：论文在 rMD17、3BPA、AcAc 等分子力场基准上达到或超过当时 SOTA，并展示更陡的学习曲线

#### 🔬 深入细节
![MACE 层数与误差对比图](https://ar5iv.labs.arxiv.org/html/2206.07697/assets/x1.png)
*图：MACE、NequIP、BOTNet 在 3BPA 数据集上的能量/力误差随 message passing 层数变化。论文主文没有单独给出架构框图；其架构由第 4 节公式与附录 tensor contraction algorithm 描述。公开图源来自 arXiv:2206.07697 的 ar5iv HTML。*

##### 算法伪代码

```python
# MACE force field forward pass 伪代码
graph = build_neighbor_graph(atoms, cutoff=r_max)
h = embed_species(atomic_numbers)  # scalar node features

for t in range(num_layers):
    # 1. construct equivariant two-body A-features from radial basis and spherical harmonics
    for atom_i in graph.nodes:
        A_i = 0
        for atom_j in neighbors(atom_i):
            r_ji, rhat_ji = relative_geometry(atom_j, atom_i)
            A_i += radial_mlp(r_ji) * spherical_harmonics(rhat_ji) * linear(h[atom_j])

        # 2. symmetrized tensor products build higher-order B-features
        B_i = []
        for nu in range(1, max_correlation_order + 1):
            B_i.append(clebsch_gordan_symmetrize(tensor_power(A_i, nu)))

        # 3. element-conditioned linear combination gives message
        m_i = sum(element_weight(Z_i, nu, L) @ B_i[nu] for nu in orders)

        # 4. residual equivariant update
        h_next[atom_i] = linear_message(m_i) + residual_by_species(Z_i, h[atom_i])
    h = h_next

# 5. invariant readout to site energies; forces are conservative gradients
E_atoms = [readout_invariant_scalar(h_i) for h_i in h]
E_total = sum(E_atoms)
forces = -grad(E_total, positions)
loss = lambda_E * mse(E_total, E_ref) + lambda_F * mse(forces, F_ref)
```

##### 从二体消息到高体阶消息

普通 MPNN 的一层消息大多依赖中心原子 \(i\) 和一个邻居 \(j\)，因此是二体交互。要表达更高体阶相互作用，传统做法要么堆更多层，让信息通过多跳传播间接组合；要么显式枚举角度、三元组甚至四元组，计算成本很高。MACE 的核心想法是直接把消息写成层级 body-order expansion：

$$
\mathbf{m}_i^{(t)}
= \sum_j \mathbf{u}_1(\sigma_i^{(t)};\sigma_j^{(t)})
+ \sum_{j_1,j_2}\mathbf{u}_2(\sigma_i^{(t)};\sigma_{j_1}^{(t)},\sigma_{j_2}^{(t)})
+ \cdots
+ \sum_{j_1,\ldots,j_\nu}
\mathbf{u}_\nu(\sigma_i^{(t)};\sigma_{j_1}^{(t)},\ldots,\sigma_{j_\nu}^{(t)})
$$

其中 \(\nu\) 是 maximum correlation order，消息的状态体阶为 \(\nu+1\)。论文特意允许 \(j_1=j_2\) 这样的 self-interaction，使求和可以转化为张量积结构，而不是显式枚举所有互异邻居组合。

##### A-features：等变二体基

每层先从邻居构造 \(A\)-features。它们通过径向基、球谐函数和上一层节点特征耦合得到：

$$
A_{i,k l_3 m_3}^{(t)}
=
\sum_{l_1m_1,l_2m_2}
C_{l_1m_1,l_2m_2}^{l_3m_3}
\sum_{j\in\mathcal{N}(i)}
R_{k l_1l_2l_3}^{(t)}(r_{ji})
Y_{l_1}^{m_1}(\hat{\mathbf{r}}_{ji})
\sum_{\tilde{k}}W_{k\tilde{k}l_2}^{(t)}
h_{j,\tilde{k}l_2m_2}^{(t)}
$$

这里 \(Y_l^m\) 携带方向信息，\(C\) 是 Clebsch-Gordan 系数，保证结果按正确的 \(O(3)\) 表示变换。第一层中 \(h_j\) 只是元素 embedding，因此公式可简化为：

$$
A_{i,k l_1m_1}^{(1)}
= \sum_{j\in\mathcal{N}(i)}
R_{k l_1}^{(1)}(r_{ji})
Y_{l_1}^{m_1}(\hat{\mathbf{r}}_{ji})
W_{kz_j}^{(1)}
$$

直觉上，\(A_i\) 是“带方向的邻居密度展开”：它已经聚合了所有邻居，但仍保留球谐阶数和通道维度，后续可以组合成多体项。

##### B-features：张量积与对称化

MACE 的关键操作是从 \(A\)-features 构造高阶 \(B\)-features：

$$
\mathbf{B}_{i,\eta_\nu kLM}^{(t)}
= \sum_{\mathbf{l}\mathbf{m}}
\mathcal{C}_{\eta_\nu,\mathbf{l}\mathbf{m}}^{LM}
\prod_{\xi=1}^{\nu}
\sum_{\tilde{k}}
w_{k\tilde{k}l_\xi}^{(t)}
A_{i,\tilde{k}l_\xi m_\xi}^{(t)}
$$

\(\mathcal{C}^{LM}_{\eta_\nu}\) 是广义 Clebsch-Gordan coupling coefficient，负责把多个球谐表示耦合成目标等变阶数 \(L\)。\(\eta_\nu\) 枚举能耦合到同一 \(L\) 的不同路径。由于这些 coupling 系数非常稀疏且可预计算，MACE 不需要显式遍历所有三元组/四元组，也能得到高体阶信息。

然后消息是这些多体基的线性组合：

$$
m_{i,kLM}^{(t)}
= \sum_\nu\sum_{\eta_\nu}
W_{z_i kL,\eta_\nu}^{(t)}
\mathbf{B}_{i,\eta_\nu kLM}^{(t)}
$$

其中权重依赖接收原子元素 \(z_i\) 和消息对称阶数 \(L\)。这使 MACE 同时具备元素条件化、等变性和高体阶表达。

##### 更新、读出与训练损失

MACE 的节点更新是线性 message update 加 species-dependent residual：

$$
h_{i,kLM}^{(t+1)}
= \sum_{\tilde{k}}W_{kL,\tilde{k}}^{(t)}m_{i,\tilde{k}LM}
+ \sum_{\tilde{k}}W_{z_i kL,\tilde{k}}^{(t)}h_{i,\tilde{k}LM}^{(t)}
$$

readout 只使用 \(L=0,M=0\) 的不变标量特征，保证 site energy 不随旋转改变：

$$
E_i = E_i^{(0)}+E_i^{(1)}+\cdots+E_i^{(T)}
$$

$$
E_i^{(t)} =
\begin{cases}
\sum_{\tilde{k}}W_{\text{readout},\tilde{k}}^{(t)}h_{i,\tilde{k}00}^{(t)}, & t<T \\
\mathrm{MLP}_{\text{readout}}^{(t)}(\{h_{i,k00}^{(t)}\}_k), & t=T
\end{cases}
$$

总能量为 \(\hat{E}=\sum_i E_i\)，力由能量梯度给出。论文训练损失为：

$$
\mathcal{L}
= \frac{\lambda_E}{B}\sum_b^B(\hat{E}_b-E_b)^2
+ \frac{\lambda_F}{3BN}\sum_{i=1}^{B\cdot N}\sum_{\alpha=1}^{3}
\left(-\frac{\partial\hat{E}}{\partial r_{i,\alpha}}-F_{i,\alpha}\right)^2
$$

其中 \(\lambda_E=1\)、\(\lambda_F=1000\)。大力权重的直觉是：分子动力学和结构弛豫直接依赖力，能量误差小但力场不准仍然不可用。

##### 与 GemNet/NequIP 的区别

GemNet、DimeNet 类模型通过角度和方向消息增强几何表达，但高阶关系仍常依赖显式角度组合或多层传播。NequIP 等等变 MPNN 通过等变特征提高数据效率，但二体消息往往需要更多层来逐步扩大表达体阶和感受野。MACE 把“提高体阶”和“增加层数”解耦：单层消息内部已经通过对称张量积构造多体项，因此两层模型就能覆盖很强的局域环境表达。

> 💡 关键：MACE 的高精度不只是因为使用等变性，而是因为它把高体阶多项式基直接嵌入消息构造；等变性负责正确的旋转/反射变换，多体张量积负责表达复杂局域相互作用。

#### 🧪 练习题
```yaml
question: "MACE 相比普通二体 MPNN 的核心结构优势是什么？"
options:
  - "用随机森林替代神经网络 readout"
  - "通过 Clebsch-Gordan 对称张量积直接构造高体阶等变消息，减少对堆叠多层的依赖"
  - "完全不使用原子间距离"
  - "只预测力而不预测能量"
answer: 1
explain: "MACE 先构造 A-features，再通过对称张量积得到高阶 B-features，使一层消息就包含多体环境信息，并保持 O(3) 等变性。"
```

### CHGNet

```yaml
id: chgnet
num: 17
name: CHGNet
full_name: 电荷感知图网络 (Charge-informed Graph Network)
year: '2023'
org: Berkeley
parent: m3gnet
paper_url: https://www.nature.com/articles/s42256-023-00716-3
project_url: ''
category: mlip
motivation: 引入磁矩区分氧化态
```

#### 📝 一句话总结
CHGNet 在晶体图神经网络势能面中加入磁矩监督，把局域磁矩作为氧化态和轨道占据的代理信号，从而在只输入原子种类与位置时同时预测能量、力、应力和电荷态相关信息。它解决了通用 MLIP 难以区分同元素不同价态、难以模拟离子重排与电子态耦合的问题。

#### 🎯 核心要点
- **电荷感知 MLIP**：通过预测 site-wise magnetic moments regularize 原子隐藏表示，使模型学到与氧化态、局域电子占据相关的特征
- **多图结构**：把周期晶体构成 atom graph，同时用 bond graph 表示三体角度关系，显式更新 atom、bond、angle 三类 embedding
- **平滑距离与角度基函数**：键长用 SmoothRBF 展开并在 cutoff 处令值和导数趋零，角度用 Fourier basis 展开
- **Interaction block**：每个 block 依次做 AtomConv、BondConv、AngleUpdate，用 gated MLP 和距离权重聚合邻域消息
- **保守力场输出**：总能量由原子级能量贡献求和得到，力和应力通过对能量自动微分得到，保证力与势能一致
- **多任务损失**：同时拟合 DFT energy、force、stress 和 magmom，使用加权 Huber loss，其中 magmom loss 直接约束 latent space
- **MPtrj 预训练数据**：使用 Materials Project Trajectory Dataset，包含约 1.58M 结构、49.3M 力标签、14.2M 应力标签和 7.94M 磁矩标签
- **应用场景**：用于 Li_xMnO2 相变与价态演化、Li_xFePO4 有限温相图、石榴石型固态电解质 Li 扩散等 charge-coupled 模拟

#### 🔬 深入细节
![CHGNet 模型架构图](https://ar5iv.labs.arxiv.org/html/2302.14231/assets/x1.png)
*图：CHGNet Figure 1，展示从未知电荷晶体输入，到 atom graph / bond graph、interaction blocks、magmom head、energy/force/stress 输出的完整流程。开放版本见 arXiv:2302.14231。*

##### 算法伪代码

```python
# CHGNet 核心训练/推理流程伪代码
for structure in dataset:
    atom_graph = build_periodic_atom_graph(structure, cutoff=5.0)
    bond_graph = build_bond_graph(atom_graph, angle_cutoff=3.0)

    v = embed_atomic_number(structure.Z)              # atom features
    e = smooth_rbf_expand(atom_graph.distances)       # bond features
    a = fourier_expand(bond_graph.angles)             # angle features

    for t in range(3):
        v = v + atom_conv(v, e, atom_graph)
        e = e + bond_conv(e, a, v, bond_graph)
        a = a + angle_update(e, a, v, bond_graph)

    magmom_pred = linear_magmom_head(v)               # charge-state constraint
    v = v + atom_conv(v, e, atom_graph)               # final atom-only conv

    site_energy = mlp_energy_head(v)
    energy_pred = site_energy.sum()
    force_pred = -grad(energy_pred, structure.positions)
    stress_pred = grad(energy_pred, strain) / volume

    loss = huber(energy_pred, energy_dft)
    loss += w_f * huber(force_pred, force_dft)
    loss += w_s * huber(stress_pred, stress_dft)
    loss += w_m * huber(abs(magmom_pred), abs(magmom_dft))
    optimizer.step(loss)
```

##### 动机与背景

传统经验力场通常需要预先给定原子电荷或固定价态，无法可靠处理过渡金属氧化物中随局域环境变化的价态；DFT/AIMD 可以显式处理电子结构，但计算量限制了纳秒级、大体系的相变、离子迁移和降解模拟。早期通用 MLIP 虽能从结构学习势能面，但如果只把原子种类和几何邻域作为输入，同一个元素的不同氧化态往往被压到相近的表示里。

CHGNet 的关键判断是：在自旋极化 DFT 中，局域磁矩与未成对电子数、轨道占据和过渡金属价态高度相关。与直接学习 Bader charge 或完整电荷密度相比，magmom 标签更容易从 Materials Project 的计算轨迹中大规模获得，也更能区分许多异价离子的化学行为。因此 CHGNet 不把电荷作为输入，而是在中间层预测磁矩，让隐藏表示被电荷态信息约束。

##### 图构建与基函数展开

CHGNet 首先在周期晶体中以默认 \(r_{\mathrm{cut}}=5\ \text{\AA}\) 构造 atom graph，边表示 cutoff 内的近邻原子对；再以 bond 为节点构造 bond graph，用于表示 \((i,j,k)\) 三体角度。距离和角度不是直接作为标量输入，而是展开成可学习的平滑基：

$$
\tilde{e}_{ij,n} =
\sqrt{\frac{2}{r_{\mathrm{cut}}}}
\frac{\sin(n\pi r_{ij}/r_{\mathrm{cut}})}{r_{ij}}
\odot u(r_{ij})
$$

$$
a_{ijk,\ell} =
\begin{cases}
\frac{1}{\sqrt{2\pi}}, & \ell=0 \\
\frac{1}{\sqrt{\pi}}\cos(\ell\theta_{ijk}), & 1\leq \ell\leq N \\
\frac{1}{\sqrt{\pi}}\sin((\ell-N)\theta_{ijk}), & N<\ell\leq 2N
\end{cases}
$$

其中 \(u(r_{ij})\) 是 polynomial envelope，使距离基函数及其导数在 cutoff 处平滑衰减到 0。这个设计对 MLIP 很关键：如果邻居消息在截断半径处突然消失，势能面对原子位移会出现不连续，力和声子等导数性质会变差。

##### Atom-Bond-Angle 交互块

每个 interaction block 显式更新三类状态：原子特征 \(v_i^t\)、键特征 \(e_{ij}^t\)、角特征 \(a_{ijk}^t\)。核心更新可概括为：

$$
v_i^{t+1} =
v_i^{t} +
L_v^t\left[
\sum_j \tilde{e}_{ij}\cdot
\phi_v^t(v_i^t \Vert v_j^t \Vert e_{ij}^t)
\right]
$$

$$
e_{jk}^{t+1} =
e_{jk}^{t} +
L_e^t\left[
\sum_i \tilde{e}_{ij}\cdot\tilde{e}_{jk}\cdot
\phi_e^t(e_{ij}^t \Vert e_{jk}^t \Vert a_{ijk}^t \Vert v_j^{t+1})
\right]
$$

$$
a_{ijk}^{t+1} =
a_{ijk}^{t} +
\phi_a^t(e_{ij}^{t+1}\Vert e_{jk}^{t+1}\Vert a_{ijk}^t\Vert v_j^{t+1})
$$

这里 \(\Vert\) 表示拼接，\(L\) 是线性层，\(\phi\) 是 gated MLP：

$$
\phi(x)=
\sigma(L_{\mathrm{gate}}(x))\odot
\mathrm{SiLU}(L_{\mathrm{core}}(x))
$$

直观上，AtomConv 让中心原子吸收邻居原子和键长信息；BondConv 让一条键看到相邻键和夹角，从而注入三体几何；AngleUpdate 则持续更新角度通道。与 M3GNet 中通过三体球谐特征更新键不同，CHGNet 把 atom、bond、angle 都作为显式 embedding 流动，便于在同一 message passing 过程中携带几何和电荷态约束。

##### 磁矩如何成为电荷态约束

CHGNet 在三个 interaction blocks 后用线性头预测每个原子的磁矩：

$$
m_i = L_m(v_i^3)
$$

这一步不是附加的可解释性输出，而是训练目标的一部分。因为最终能量头使用的是继续更新后的 \(v_i^4\)，而 \(v_i^4\) 由已被 magmom loss 约束过的 \(v_i^3\) 生成，所以能量、力和应力预测都会受到电荷态信息的间接约束。论文在 Na\(_2\)V\(_2\)(PO\(_4\))\(_3\) 中展示，V 离子的隐藏表示会按 V\(^{3+}\)/V\(^{4+}\) 分群；在 Li\(_x\)MnO\(_2\) 的长时间 MD 中，Mn 的磁矩分布可追踪 Mn\(^{2+}\)、Mn\(^{3+}\)、Mn\(^{4+}\) 的演化。

> 💡 关键：CHGNet 没有要求用户先提供氧化态或电荷标签；它从结构出发预测 magmom，再把这个预测任务作为 latent regularization，使同元素不同价态在隐藏空间中可分。

##### 能量、力、应力与训练损失

最终总能量由原子级能量贡献求和：

$$
E_{\mathrm{tot}} =
\sum_i L_3\circ g\circ L_2\circ g\circ L_1(v_i^4)
$$

力和应力不是独立预测头，而是从能量自动微分得到：

$$
\mathbf{f}_i = -\frac{\partial E_{\mathrm{tot}}}{\partial \mathbf{x}_i},
\qquad
\boldsymbol{\sigma} =
\frac{1}{V}\frac{\partial E_{\mathrm{tot}}}{\partial \boldsymbol{\varepsilon}}
$$

这种势能导数式输出保证了力场的保守性，也让结构弛豫、MD 和声子相关任务更物理一致。训练时使用 \(\delta=0.1\) 的 Huber loss：

$$
\mathcal{H}(x,\hat{x}) =
\begin{cases}
0.5(x-\hat{x})^2, & |x-\hat{x}|<\delta \\
\delta(|x-\hat{x}|-0.5\delta), & \mathrm{otherwise}
\end{cases}
$$

总损失为：

$$
\mathcal{L} =
\mathcal{H}(E,\hat{E})
+ w_f\mathcal{H}(\mathbf{f},\hat{\mathbf{f}})
+ w_{\sigma}\mathcal{H}(\boldsymbol{\sigma},\hat{\boldsymbol{\sigma}})
+ w_m\mathcal{H}(m,\hat{m})
$$

论文设置 \(w_f=1\)、\(w_{\sigma}=0.1\)、\(w_m=0.1\)。能量项让模型学习势能面高度，力项约束一阶导数，应力项约束晶胞形变响应，磁矩项则把电子态信息压入原子表示。四个原子卷积层叠加后，论文称预训练 CHGNet 可用较低计算成本覆盖约 \(20\ \text{\AA}\) 的长程相互作用范围。

##### 与传统 MLIP 的区别

普通 GNN-MLIP 往往只把隐藏表示用于能量回归，电子态差异只能从几何环境中隐式推断；CHGNet 则把磁矩作为可监督的中间物理量，显式区分异价离子。与需要预先赋电荷的经验 charge equilibration 方法相比，CHGNet 的 charge-decorated structure 是模型从结构中推断出来的，适合在 MD 中追踪价态随时间变化。它的限制也很明确：magmom 作为 charge proxy 对非磁性体系、强共价体系或 DFT 自旋设置敏感，且最终准确性依赖 MPtrj 中磁矩标签的覆盖和一致性。

#### 🧪 练习题
```yaml
question: "CHGNet 中 magnetic moment 监督最核心的作用是什么？"
options:
  - "把晶体结构转换成固定大小的分子指纹"
  - "作为局域电荷态和轨道占据的代理信号，约束原子隐藏表示"
  - "替代能量标签，使模型不需要训练势能面"
  - "只用于可视化，不参与损失函数"
answer: 1
explain: "CHGNet 在中间层预测 site-wise magmom，并把它加入训练损失，使隐藏表示携带氧化态/电荷态信息，再用于能量、力和应力预测。"
```

### Orb

```yaml
id: orb
num: 18
name: Orb
full_name: 轨道力场 (Orbital Force Field)
year: '2024'
org: Orbital Materials
parent: mace
paper_url: https://arxiv.org/abs/2410.22570
project_url: ''
category: mlip
motivation: 比GNoME快3-6倍误差降31%
```

#### 📝 一句话总结
Orb 提出了一种基于图网络模拟器（GNS）与平滑图注意力机制的非等变通用原子间势（UIP），结合去噪扩散预训练策略，在 Matbench Discovery 基准上以 F1=0.88 刷新开源 SOTA，同时推理速度比 MACE 快 3–6 倍，为大规模材料模拟提供了精度与效率兼备的解决方案。

#### 🎯 核心要点
- **非等变架构设计**：放弃等变约束，采用 GNS 架构通过数据增强学习旋转/平移不变性，大幅提升 GPU 利用率与推理速度
- **平滑图注意力（Smoothed Attention）**：将 softmax 注意力权重乘以距离衰减包络函数，消除原子进出截断半径时的力不连续性
- **两阶段训练**：Phase 1 在大规模晶体结构上做去噪扩散预训练；Phase 2 在 DFT 轨迹数据上有监督微调能量/力/应力
- **力守恒后处理**：通过 Lagrangian 约束优化对预测力施加净力为零和净力矩为零的修正，保证物理一致性
- **D3 色散校正摊销**：将 D3 长程色散校正预计算并加入训练数据，避免推理时 \(O(n^2)\) 的额外开销
- **数据集**：预训练使用跨多个数据库的基态材料结构；微调使用 MPtraj + Alexandria（均为 PBE 泛函 + VASP）
- **开源 Apache 2.0 许可**：模型权重与代码完全开放

#### 🔬 深入细节
##### 模型架构总览

![Orb 模型架构图](https://arxiv.org/html/2410.22570v2/x1.png)
*图：Orb 模型架构示意。左侧为图构建与消息传递流程，右侧为平滑注意力机制与力守恒后处理的细节。*

Orb 的核心架构基于 **Graph Network Simulator (GNS)**，这是一种在粒子模拟领域已被验证的图神经网络框架。与当前主流的等变神经网络势（如 MACE、NequIP）不同，Orb 刻意选择了**非等变**设计路线——不在网络结构中硬编码旋转等变性，而是通过随机旋转数据增强让模型从数据中学习这些对称性。

> 💡 **关键洞察**：等变架构虽然在数据效率上有优势，但其所依赖的球谐张量运算（如 Clebsch-Gordan 乘积）在 GPU 上的并行效率较低。Orb 的非等变设计使其能充分利用 GPU 的密集矩阵运算能力，在大系统上实现 3–6 倍的速度优势。

##### 图构建与特征化

给定一个原子系统，Orb 构建一个有向图 \(\mathcal{G} = (\mathcal{V}, \mathcal{E})\)：

- **节点** \(\mathcal{V}\)：每个原子 \(i\) 对应一个节点，初始特征为原子序数的可学习嵌入向量 \(\mathbf{h}_i^{(0)} \in \mathbb{R}^{128}\)
- **边** \(\mathcal{E}\)：在截断半径 \(r_c = 10\) Å 内的所有原子对 \((i, j)\) 之间建立有向边
- **边特征**：由两部分拼接而成：
  1. 原子间距离 \(r_{ij}\) 的径向基函数（RBF）展开
  2. 周期性边界条件下的晶胞偏移向量 \(\mathbf{k}_{ij}\) 的 one-hot 编码

##### 消息传递与平滑注意力

Orb 使用 **10 层 GNS 消息传递块**，每层包含：

1. **边更新**：融合发送节点、接收节点和边特征
2. **注意力聚合**：使用平滑图注意力进行邻居信息聚合
3. **节点更新**：通过 MLP 更新节点表示

**平滑注意力机制**是 Orb 的核心创新之一。标准 softmax 注意力在原子进出截断半径时会产生不连续的权重跳变，导致预测力出现非物理的不连续性。Orb 的解决方案是将注意力权重乘以一个距离衰减包络函数：

$$\alpha_{ij}^{\text{smooth}} = \alpha_{ij}^{\text{softmax}} \cdot u(r_{ij})$$

其中 \(u(r_{ij})\) 是一个在截断半径处平滑衰减到零的包络函数（如余弦衰减），\(\alpha_{ij}^{\text{softmax}}\) 是带有可学习温度参数 \(\tau\) 的标准 softmax 注意力权重：

$$\alpha_{ij}^{\text{softmax}} = \frac{\exp(\mathbf{q}_i \cdot \mathbf{k}_j / \tau)}{\sum_{j' \in \mathcal{N}(i)} \exp(\mathbf{q}_i \cdot \mathbf{k}_{j'} / \tau)}$$

> ⚠️ **注意**：仅使用包络函数（如 DimeNet 中的做法）而不结合注意力会导致远处原子的贡献过小；仅使用 softmax 注意力则会在截断边界处产生力的不连续。Orb 的平滑注意力巧妙地结合了两者的优点。

##### 输出头与力守恒

经过 10 层消息传递后，Orb 使用三个独立的 MLP 输出头：

- **能量头**：对所有节点特征求和后通过 MLP 输出标量能量 \(E\)
- **力头**：直接从节点特征通过 MLP 预测每个原子的三维力向量 \(\mathbf{f}_i\)
- **应力头**：从图级特征预测 \(3 \times 3\) 应力张量 \(\boldsymbol{\sigma}\)

由于力是直接预测而非通过能量的负梯度计算，预测的力不自动满足牛顿第三定律。Orb 通过**后处理校正**来恢复物理守恒律：

1. **净力消除**：计算所有原子预测力的均值并减去，确保 \(\sum_i \tilde{\mathbf{f}}_i = 0\)
2. **净力矩消除**：通过求解一个带约束的 Lagrangian 优化问题，找到最小 L2 范数的力修正 \(\delta\mathbf{f}_i\)，使得修正后的力既满足零净力又满足零净力矩

最终预测力为：

$$\tilde{\mathbf{f}}_i^{\text{pred}} = \hat{\mathbf{f}}_i + \delta\mathbf{f}_i$$

##### 算法伪代码：两阶段训练流程

```python
# ===== Phase 1: 去噪扩散预训练 =====
# 数据: 大规模基态晶体结构 (仅需原子位置和晶胞)
for epoch in pretraining_epochs:
    for x0 in ground_state_structures:
        t = sample_timestep()           # 采样噪声时间步
        eps = sample_noise()            # 采样高斯噪声
        x_t = x0 + sigma_t * eps       # 前向扩散加噪
        eps_pred = model(x_t, t)        # 模型预测噪声
        loss = ||eps_pred - eps||^2     # epsilon 预测损失
        optimizer.step(loss)

# ===== Phase 2: NNP 有监督微调 =====
# 数据: DFT 优化轨迹 (MPtraj + Alexandria)
model = load_pretrained_diffusion_model()
for epoch in finetuning_epochs:
    for batch in dft_trajectories:
        E_pred, f_pred, sigma_pred = model(batch)
        # 能量损失 (per-atom MAE, 减去参考能量)
        L_E = |E_pred - (E_true - E_ref) / N|
        # 力损失 (MAE over all atoms in batch)
        L_f = (1/3N) * sum(||f_pred_i - f_true_i||_1)
        # 应力损失
        L_sigma = MAE(sigma_pred, sigma_true)
        # 总损失
        L_total = lambda_E * L_E + L_f + L_sigma
        optimizer.step(L_total)
```

##### 动机与背景：为什么需要 Orb？

通用原子间势（Universal Interatomic Potentials, UIPs）旨在用单一模型替代传统的密度泛函理论（DFT）计算，以数量级的速度提升实现接近 DFT 精度的原子模拟。然而，现有的 UIP 面临两个核心挑战：

1. **精度瓶颈**：早期模型（如 M3GNet、CHGNet）在 Matbench Discovery 等严格基准上的 F1 分数仅为 0.57–0.61，距离实用化仍有差距
2. **速度瓶颈**：高精度的等变模型（如 MACE）依赖球谐张量运算，在大系统上的 GPU 利用率低，限制了可模拟的系统规模

Orb 通过非等变架构设计同时解决了这两个问题：放弃等变约束换取 GPU 友好的密集运算，同时通过扩散预训练和高质量数据策划来弥补数据效率的损失。

##### 扩散预训练的作用

扩散预训练是 Orb 的另一核心创新。其动机在于：

- **数据兼容性**：预训练仅需原子位置和晶胞信息，不需要能量/力等标签，因此可以混合使用不同 DFT 泛函、不同软件产生的数据
- **广覆盖性**：预训练数据集覆盖了广泛的原子类型、材料类别和对称群
- **训练稳定性**：实验表明，扩散预训练不仅降低了 17%–70% 的力场误差，还显著减少了训练过程中的过平滑（oversmoothing）现象

##### 与传统方法的对比

| 特性 | 等变模型 (MACE/NequIP) | Orb (非等变) |
|------|----------------------|-------------|
| 对称性处理 | 架构内置等变性 | 数据增强学习不变性 |
| 核心运算 | 球谐张量积 (Clebsch-Gordan) | 标准矩阵乘法 + 注意力 |
| GPU 利用率 | 较低（稀疏运算） | 高（密集运算） |
| 力计算 | 能量负梯度（自动守恒） | 直接预测 + 后处理校正 |
| 大系统速度 | 基准 | 3–6× 更快 |
| 数据效率 | 较高 | 通过预训练弥补 |

##### 实验结果亮点

**Matbench Discovery**（Table 1）：Orb 以 F1=0.880 大幅领先所有开源模型（此前最佳 SevenNet 为 0.724），精度（Precision=0.923）尤其突出，意味着极低的假阳性率——在实际材料筛选中，这可以避免大量无效的实验验证。

**速度基准**（Figure 3）：在单张 NVIDIA A100 GPU 上，Orb 的前向传播速度在大系统（>1000 原子）时比 MACE 快 3–6 倍。此外，通过将 D3 色散校正摊销到训练数据中，Orb 避免了推理时 \(O(n^2)\) 的 D3 计算开销。

**MD17 分子动力学**（Table 2）：在分子特异性微调设置下，Orb 在所有 4 个分子上均达到最大稳定性（300 ps），h(r) 指标与 NequIP 相当。在零样本设置下（仅用晶体数据训练），Orb 也展现出对非周期分子体系的良好泛化能力。

#### 🧪 练习题
```yaml
question: "Orb 模型使用平滑注意力机制的主要目的是什么？"
options:
  - "提高模型在小分子上的预测精度"
  - "消除原子进出截断半径时预测力的不连续性"
  - "减少消息传递层数以加速推理"
  - "替代径向基函数实现更好的距离编码"
answer: 1
explain: "标准 softmax 注意力在截断半径边界处会产生权重跳变，导致力的不连续。平滑注意力通过乘以距离衰减包络函数，确保边界处权重平滑过渡到零，从而保证力的连续性。"
```

### eSEN

```yaml
id: esen
num: 19
name: eSEN
full_name: 等变光滑能量网络 (equivariant Smooth Energy Network)
year: '2025'
org: Meta FAIR
parent: mace
paper_url: https://arxiv.org/abs/2502.12147
project_url: ''
category: mlip
motivation: 光滑势能面确保长程能量守恒
```

#### 📝 一句话总结
eSEN 提出一种以能量守恒和势能面平滑性为核心约束的等变 MLIP，通过保守力输出、非离散化球谐表示、cutoff envelope 和直接力预训练后保守微调，让静态测试误差更可靠地转化为材料稳定性、热导率和声子等物理性质预测能力。

#### 🎯 核心要点
- **问题重定义**：指出低 energy/force test error 不一定意味着下游物性好，必须测试 NVE MD 中的实际能量守恒能力
- **保守力设计**：最终力由 \(\mathbf{F}=-\nabla_{\mathbf{r}}E\) 得到，而不是用独立 direct-force head，避免能量和力不一致
- **等变球谐表示**：节点 embedding 是 multi-channel spherical harmonics representation，支持旋转等变的几何消息传递
- **Edgewise Convolution**：拼接 source/target 节点表示，使用两层 SO(2) convolution 和中间非线性，并在边消息上加入 envelope function
- **Nodewise FFN 不离散化**：用 equivariant linear + SiLU gated nonlinearity，避免把球谐通道投影到离散网格造成采样误差
- **平滑 PES 三原则**：不设最大邻居数、使用距离 cutoff 内所有邻居、在 cutoff 处让边消息及其导数平滑衰减
- **训练策略**：先用 direct-force head 高效预训练，再移除 force head，切换到保守力目标进行 fine-tuning
- **物性基准**：在 Matbench-Discovery、MDR Phonon、thermal conductivity 和 SPICE-MACE-OFF 等任务上展示强物性预测表现

#### 🔬 深入细节
![eSEN 模型架构图](https://ar5iv.labs.arxiv.org/html/2502.12147/assets/x2.png)
*图：eSEN Figure 2，左侧是总体架构，右侧是 Edgewise Convolution。最终 \(L=0\) 节点特征预测原子能量，总能量求和后通过反向传播得到力和应力。开放版本见 arXiv:2502.12147。*

##### 算法伪代码

```python
# eSEN 核心流程伪代码
for batch in dataset:
    graph = radius_graph(batch.positions, cutoff=6.0, keep_all_neighbors=True)
    h = embed_as_spherical_harmonics(batch.atomic_numbers)

    for layer in range(num_layers):
        messages = []
        for edge in graph.edges:
            i, j = edge.source, edge.target
            r_ij = batch.positions[j] - batch.positions[i]
            radial = radial_basis(norm(r_ij))
            envelope = polynomial_envelope(norm(r_ij), cutoff=6.0)

            z = concat(h[i], h[j], radial)
            m_ij = so2_conv(z, r_ij)
            m_ij = gated_silu(m_ij)
            m_ij = so2_conv(m_ij, r_ij) * envelope
            messages.append((j, m_ij))

        h = h + aggregate_equivariant(messages)
        h = h + nodewise_equivariant_ffn(layer_norm(h))  # no grid discretization

    atom_energy = scalar_energy_head(select_L0_channels(h))
    energy = atom_energy.sum()
    force = -grad(energy, batch.positions)
    stress = grad(energy, batch.cell_strain) / batch.volume

    loss = energy_weight * mae(energy_per_atom, dft_energy_per_atom)
    loss += force_weight * l2(force, dft_force)
    loss += stress_weight * mae(stress, dft_stress)
    optimizer.step(loss)
```

##### 动机：为什么静态误差不够

很多 MLIP 论文主要报告 held-out DFT 构型上的能量、力和应力误差，但真实材料工作流更常见的是结构弛豫、MD、热导率、声子和自由能计算。这些任务会反复调用势能面，并依赖一阶、二阶甚至三阶导数。一个模型即使在随机测试集上力误差很低，如果势能面局部不连续、力不是能量梯度，仍可能在 NVE MD 中产生能量漂移，在声子计算中出现虚频或错误声学支。

eSEN 先把评价标准拉回物理约束：保守力场在闭合路径上做功应为 0：

$$
\oint \mathbf{F}\cdot d\mathbf{r}=0
$$

如果力来自势能面梯度，则满足：

$$
\mathbf{F} = -\nabla_{\mathbf{r}}E(\mathbf{r}, \mathbf{a})
$$

对于周期体系，应力也来自能量对晶格或应变的导数。论文进一步用 Verlet 积分的能量漂移界解释平滑性的重要性：

$$
\left|E(\mathbf{r}_T,\mathbf{a})-E(\mathbf{r}_0,\mathbf{a})\right|
\leq C\Delta t^2 + C_N\Delta t^N T
$$

这里高阶导数是否连续且有界，会影响常数 \(C_N\) 和长期能量漂移。于是 eSEN 把“给定时间步长下能否实际守恒能量”作为设计 MLIP 的筛选标准。

##### 架构：edgewise + nodewise 的等变消息传递

eSEN 的节点表示是 spherical harmonics channels，既包含标量 \(L=0\) 通道，也包含向量/高阶张量通道，因此能在旋转下保持等变。每个 layer block 由两个部分组成：先做 Edgewise Convolution，把邻居关系上的方向和距离信息注入节点；再做 Nodewise Feed-Forward Network，对每个节点的等变表示做非线性变换。

Edgewise Convolution 借鉴 eSCN 的 SO(2) convolution，但做了两处关键修改：第一，先拼接 source 和 target node embedding，让边消息同时看到发送端与接收端；第二，在两层 SO(2) convolution 中间加入非线性，并把 envelope function 乘到边消息上。可抽象为：

$$
\mathbf{m}_{ij} =
\eta(r_{ij})
\cdot
\mathrm{SO2Conv}_2\left(
\psi\left(
\mathrm{SO2Conv}_1(
\mathbf{h}_i \Vert \mathbf{h}_j \Vert \rho(r_{ij}), \hat{\mathbf{r}}_{ij}
)
\right),
\hat{\mathbf{r}}_{ij}
\right)
$$

其中 \(\rho(r_{ij})\) 是径向基函数，\(\eta(r_{ij})\) 是 cutoff envelope，\(\psi\) 是等变非线性。节点更新可写成：

$$
\mathbf{h}_i^{t+1}
=
\mathbf{h}_i^t
+ \sum_{j\in\mathcal{N}(i)} \mathbf{m}_{ij}
+ \mathrm{FFN}_{\mathrm{eq}}\left(\mathrm{LN}_{\mathrm{eq}}(\mathbf{h}_i^t)\right)
$$

这种结构类似 Transformer/Equiformer 的残差 block，但 eSEN 特意简化并约束 nodewise 处理，减少会破坏平滑性和等变性的操作。

##### 为什么不做网格离散化

eSCN 和 EquiformerV2 中常见做法是把球谐通道投影到球面离散网格，在网格上做 pointwise nonlinearity 或 \(1\times1\) convolution，再投回球谐空间。这个做法表达力强，但非线性可能产生超出当前球谐截断频率的高频信号，离散采样会引入 aliasing，从而破坏严格等变性和能量守恒。

eSEN 的 nodewise FFN 直接在球谐表示中使用 equivariant linear layers 和 SiLU-based gated nonlinearity，不经过离散网格。直观上，它牺牲了一部分网格非线性的自由度，换取更干净的连续表示和更稳定的势能导数。论文的 ablation 显示，表示离散化会影响 MD 能量守恒，尤其在下游声子和热性质任务中放大。

##### 平滑势能面的工程细节

eSEN 关注的不是单个漂亮的公式，而是一组会共同决定 PES 连续性的选择。

第一，图构建不用最大邻居数限制。固定最近 \(K\) 个邻居虽然能降低计算量，但当两个邻居距离排序发生微小交换时，边集合会跳变，势能面出现不连续。eSEN 使用 \(6\ \text{\AA}\) 距离 cutoff 内的所有邻居。

第二，边消息乘上 envelope function。没有 envelope 时，径向基函数在 cutoff 处被硬截断，边突然消失；使用 envelope 后，消息值以及位置导数在 \(r\to r_{\mathrm{cut}}\) 时趋近 0：

$$
\lim_{r\to r_{\mathrm{cut}}}\eta(r)=0,
\qquad
\lim_{r\to r_{\mathrm{cut}}}\frac{d\eta(r)}{dr}=0
$$

第三，力必须来自能量梯度。eSEN 可以利用 direct-force 训练的效率，但最终用于物性预测的模型会去掉 direct-force head，采用保守力 fine-tuning。最终输出为：

$$
E = \sum_i \epsilon_i(\mathbf{h}_{i,L=0}^{T}),
\qquad
\mathbf{F}_i=-\frac{\partial E}{\partial \mathbf{r}_i},
\qquad
\boldsymbol{\sigma}=\frac{1}{V}\frac{\partial E}{\partial \boldsymbol{\varepsilon}}
$$

##### 损失函数与训练流程

论文的训练目标包含 per-atom energy MAE、force \(l_2\) loss 和 stress MAE，可概括为：

$$
\mathcal{L} =
\lambda_E \left|\frac{\hat{E}}{N}-\frac{E}{N}\right|
+ \lambda_F \frac{1}{3N}\sum_i \left\|\hat{\mathbf{F}}_i-\mathbf{F}_i\right\|_2^2
+ \lambda_{\sigma}\left\|\hat{\boldsymbol{\sigma}}-\boldsymbol{\sigma}\right\|_1
$$

对 MPTrj 这类大材料数据，eSEN-30M 采用 direct-force pre-training 与 conservative fine-tuning 的两阶段策略：先用直接力头提高训练吞吐并学习有用表示，再移除直接力头，用 \( -\nabla E \) 形式微调。论文报告这种策略比从零开始训练保守模型更快，并能保留下游物性需要的能量守恒属性。

> 💡 关键：eSEN 不是简单“更大的等变网络”，而是把可微势能面的连续性、导数有界性和保守力约束当作架构目标来优化。

##### 与 MACE、EquiformerV2、direct-force 模型的区别

MACE 和许多等变 MLIP 也从能量求导得到力，因此天然适合保守力场；eSEN 的差异在于系统分析了为什么某些高表达等变设计仍会在 MD 中漂移，并把“不离散化表示、cutoff 处平滑、无邻居数跳变”作为一组架构约束。与 EquiformerV2/Orb 这类高效 direct-force 模型相比，eSEN 训练更重，但在声子、热导率和长时间 MD 这类依赖势能面高阶导数的任务中更稳。它的代价是反向求力增加计算成本，且无最大邻居数限制会提高稠密结构中的边数。

#### 🧪 练习题
```yaml
question: "eSEN 为什么最终使用 F = -∇E 的保守力形式，而不只依赖 direct-force head？"
options:
  - "因为 direct-force head 无法预测任何力"
  - "因为保守力保证力与同一个势能面一致，更适合 MD、声子和热性质计算"
  - "因为保守力可以完全避免训练能量标签"
  - "因为 direct-force head 只能用于分子，不能用于晶体"
answer: 1
explain: "Direct-force 模型可能让力与能量不一致并产生能量漂移；eSEN 用能量梯度得到力，使势能面及其导数更符合下游物性计算要求。"
```

### matminer

```yaml
id: matminer
num: 20
name: matminer
full_name: 材料数据挖掘工具 (Materials Data Miner)
year: '2018'
org: LBNL
parent: —
paper_url: https://doi.org/10.1016/j.commatsci.2018.05.018
project_url: ''
category: property_prediction
motivation: 70+特征提取器的标准工具
```

#### 📝 一句话总结
matminer 不是一个单一预测模型，而是把材料数据库检索、材料对象特征化、pandas/scikit-learn 机器学习和可视化串成统一接口的材料信息学工具箱，解决了材料数据源、描述符实现和数据科学工具之间长期割裂的问题。

#### 🎯 核心要点
- **三段式材料 ML 管线**：data retrieval → feature extraction → visualization / machine learning，所有中间结果以 pandas DataFrame 组织
- **统一数据检索接口**：论文版本支持 Citrination、Materials Project、MDF、MPDS 和 MongoDB，并把不同 API/schema 输出标准化为表格
- **标准 Featurizer 抽象**：每个 featurizer 实现 `featurize`、`feature_labels`、`citations`、`implementors`，并可批量作用于 DataFrame
- **材料专用描述符库**：覆盖 composition、structure、site、band structure、density of states 等输入类型；论文 v0.3.2 有 47 个 featurizers，官方文档后续版本列出 70+ featurizers
- **scikit-learn 兼容**：featurizers 继承类似 sklearn transformer 的接口，可与 `Pipeline`、预处理器、模型选择工具组合
- **pymatgen 集成**：直接复用 `Composition`、`Structure`、空间群、局域环境等材料对象和算法，避免重新实现基础材料解析
- **内置数据集**：提供一行加载的材料数据集，便于复现实验、快速 benchmark 和教学示例
- **可解释与可追溯**：`citations()` 机制把每个特征生成方法关联到原始论文，避免描述符来源不明

#### 🔬 深入细节
![matminer 工作流总览](https://hackingmaterials.lbl.gov/matminer/_images/Flowchart.png)
*图：matminer 官方文档中的工作流图，与论文 Figure 1 的核心内容一致：从材料数据库取数，经特征提取变成材料-特征-性质表，再交给 scikit-learn/Keras 等工具建模，并配合可视化分析。*

##### 算法伪代码

```python
# matminer 典型材料性质预测流程伪代码
from matminer.datasets import load_dataset
from matminer.featurizers.composition import ElementProperty
from matminer.featurizers.conversions import StrToComposition
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

# 1. 数据检索或加载：统一为 pandas DataFrame
df = load_dataset("elastic_tensor_2015")

# 2. 数据转换：把 formula 字符串转成 pymatgen Composition
df = StrToComposition(target_col_id="composition").featurize_dataframe(df, "formula")

# 3. 特征化：把材料对象映射成数值描述符列
featurizer = ElementProperty.from_preset("magpie")
df = featurizer.featurize_dataframe(df, col_id="composition")
feature_cols = featurizer.feature_labels()

# 4. 交给通用机器学习工具
X = df[feature_cols]
y = df["K_VRH"]  # e.g. bulk modulus target
model = Pipeline([
    ("scale", StandardScaler()),
    ("regressor", RandomForestRegressor())
])
score = cross_val_score(model, X, y, scoring="neg_mean_absolute_error")
```

##### 来源说明

matminer 的 2018 论文是工具箱论文，不像 CGCNN/CHGNet 那样有单个神经网络架构或唯一损失函数。因此这里的方法级解读基于两个可访问来源：论文 PDF 对 v0.3.2 架构、47 个 featurizers、DataFrame/sklearn/pymatgen 集成的描述，以及官方文档对当前 40+ datasets、70+ featurizers 和模块化接口的说明。图示采用官方文档公开图片。

##### 核心抽象：材料对象到特征矩阵

matminer 的核心计算可以抽象成一个特征映射：

$$
\boldsymbol{\phi}(m)=
\left[f_1(m), f_2(m), \ldots, f_d(m)\right]\in\mathbb{R}^d
$$

其中 \(m\) 可以是 composition、crystal structure、site、band structure 或 DOS。给定材料-性质数据集 \(\{(m_i,y_i)\}_{i=1}^{N}\)，matminer 负责生成矩阵：

$$
X =
\begin{bmatrix}
\boldsymbol{\phi}(m_1)^\top \\
\boldsymbol{\phi}(m_2)^\top \\
\cdots \\
\boldsymbol{\phi}(m_N)^\top
\end{bmatrix},
\qquad
\mathbf{y}=[y_1,\ldots,y_N]^\top
$$

下游模型由 scikit-learn、Keras 或其他库完成：

$$
\theta^\* =
\arg\min_{\theta}
\sum_{i=1}^{N}
\ell\left(g_{\theta}(\boldsymbol{\phi}(m_i)), y_i\right)
+ \Omega(\theta)
$$

这也是 matminer 与端到端 GNN 的本质区别：它不直接学习 \(\boldsymbol{\phi}\)，而是把大量文献中的材料描述符实现为可复用、可组合、可审计的函数。

##### Composition featurizer 的直觉

以 composition featurizer 为例，一个化学式可写成元素分数 \(x_e\) 的集合。若元素属性表给出每个元素的电负性、原子半径、熔点、Mendeleev number 等属性 \(p_e\)，常见描述符包括加权平均、范围和方差：

$$
\bar{p}=\sum_{e\in\mathcal{E}}x_e p_e
$$

$$
\mathrm{range}(p)=\max_{e\in\mathcal{E}}p_e-\min_{e\in\mathcal{E}}p_e
$$

$$
\mathrm{var}(p)=\sum_{e\in\mathcal{E}}x_e(p_e-\bar{p})^2
$$

这些数值把“Fe\(_2\)O\(_3\)”这样的符号对象变成机器学习可处理的向量，同时保留可解释的化学含义。结构和 site featurizers 则进一步利用 pymatgen 的晶体结构对象，计算配位数、局域环境、径向分布、Voronoi 邻域、结构有序度等与几何有关的量。

##### BaseFeaturizer 设计

论文强调所有 featurizers 都继承统一的 `BaseFeaturizer` 模式，至少包含四个方法：

- `featurize(x)`：把一个材料对象转成一个特征向量
- `feature_labels()`：返回每个输出维度的列名，便于 DataFrame 追踪
- `citations()`：返回对应方法的 BibTeX 引用，保证描述符来源可追溯
- `implementors()`：记录实现与维护者

批量计算时，`featurize_dataframe(df, col_id)` 会把某一列材料对象展开成多列数值特征，并可对大量行并行处理。这个接口选择很务实：研究者可以在同一张 DataFrame 上做清洗、特征化、缺失值处理、训练/测试划分、模型拟合和误差分析，而不需要在自定义材料对象、JSON、CSV 和 numpy 数组之间反复手工转换。

##### 数据检索与标准化

材料数据源的麻烦在于每个数据库都有不同 API、认证方式和 schema。matminer 的 data retrieval 层把查询封装成 `get_dataframe`，输出统一的 pandas 表。论文版本列出 Citrination、Materials Project、MDF、MPDS 和 MongoDB：例如 Materials Project 检索会通过 pymatgen 的 `MPRester` 获取晶体结构、带结构、声子、压电、介电、弹性等属性，再转成 DataFrame；Citrination 的 PIF 层级记录也会被展平成表格。

这种标准化使跨数据库对比变简单。例如可以从 Citrination 取实验带隙，从 Materials Project 或 OQMD 取计算带隙，然后按化学式或结构键合并，直接比较实验-计算偏差。matminer 本身还提供内置数据集，减少教程、benchmark 和复现实验对外部 API key 的依赖。

##### 与 scikit-learn 的关系

matminer 明确不重复实现常规机器学习算法。它的边界是“把材料科学对象变成通用数据科学栈可用的数据”。因此它与 scikit-learn 的连接有两层：

第一，所有数据都用 pandas DataFrame 表示，天然能与 sklearn 的 `train_test_split`、`Pipeline`、`GridSearchCV` 等工具交互。第二，featurizer 的设计接近 sklearn transformer，可以与标准化、特征选择、回归器或分类器组合成端到端管线。

> 💡 关键：matminer 的价值不是某个最高精度模型，而是把材料领域知识编码为稳定接口，让研究者能快速比较不同描述符和下游模型。

##### 与端到端材料 GNN 的区别

CGCNN、MEGNet、CHGNet 等 GNN 从结构图中自动学习表示，优势是减少手工特征工程；matminer 的优势则是可解释、轻量、可复现，并能在小数据集上充分利用成熟的物理/化学描述符。很多实际项目会先用 matminer 建立随机森林、梯度提升树或线性模型基线，再决定是否需要更重的深度图模型。

它的局限也来自同一处：手工描述符的表达力受设计者限制，复杂长程相互作用、电子结构细节和动力学势能面并不会自动从数据中涌现。matminer 更适合材料性质表格预测、快速筛选、特征重要性分析和基准构建，而不是替代 MLIP 做原子级 MD。

#### 🧪 练习题
```yaml
question: "matminer 中 BaseFeaturizer 统一接口的主要目的是什么？"
options:
  - "直接替代所有 scikit-learn 模型"
  - "把不同材料对象的特征生成方法标准化，使其能批量加入 DataFrame 并进入 ML 管线"
  - "只用于下载 Materials Project 数据"
  - "让每个特征必须由神经网络自动学习"
answer: 1
explain: "BaseFeaturizer 规定 featurize、feature_labels、citations 等方法，使不同描述符可以用同一方式批量生成、命名、引用并与 pandas/scikit-learn 集成。"
```

### MODNet

```yaml
id: modnet
num: 21
name: MODNet
full_name: 材料最优描述符网络 (Materials Optimal Descriptor Network)
year: '2021'
org: UCLouvain
parent: matminer
paper_url: https://doi.org/10.1038/s41524-021-00552-2
project_url: ''
category: property_prediction
motivation: 小样本数据集优化预测
```

#### 📝 一句话总结
MODNet 提出了一种基于**归一化互信息 (NMI) 的最优特征选择**与**树形神经网络联合学习**的材料属性预测框架，在小样本数据集（<4000 样本）上显著优于图神经网络等端到端方法，实现了振动熵预测误差比先前最优结果低 4 倍的精度。

#### 🎯 核心要点
- **三大支柱**：(1) 基于 matminer 的物理特征工程（~1500 维描述符）；(2) NMI 驱动的特征选择算法（MOD-selection）；(3) 树形前馈神经网络的多属性联合学习
- **特征选择核心**：定义 Relevance-Redundancy (RR) 评分，在最大化特征-目标相关性的同时最小化已选特征间的冗余，公式为 \( \text{RR}(f) = \frac{\text{NMI}(f, y)}{[\max_{f_s} \text{NMI}(f, f_s)]^p + c} \)
- **归一化互信息 (NMI)**：采用 \( \text{NMI}(X,Y) = \frac{2 \cdot \text{MI}(X,Y)}{H(X) + H(Y)} \) 捕捉非线性依赖关系，优于 Pearson 相关系数
- **树形架构联合学习**：共享层 → 分组层 → 属性专用层，多目标联合训练提供 ~8% 精度提升
- **小样本优势**：在 ~1200 样本的振动热力学数据集上，MAE = 8.9 μeV/K/atom（比 Legrain 等人低 4 倍，比 Tawfik 等人低 25 倍）
- **可解释性**：特征选择保留了物理可解释的输入空间，可揭示属性背后的关键物理因素（如振动熵与键长、离子性的关系）
- **基准对比**：在小数据集上优于 MEGNet、CGCNN 等图网络；在大数据集（>10k）上图网络仍有优势，确立了 ~4000 样本的方法边界

#### 🔬 深入细节
![MODNet 框架总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00552-2/MediaObjects/41524_2021_552_Fig1_HTML.png)
*图 1：MODNet 框架总览 — 从结构/组成出发，经 matminer 特征化、NMI 特征选择，到前馈神经网络预测*

![MODNet 树形架构](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00552-2/MediaObjects/41524_2021_552_Fig6_HTML.png)
*图 6：MODNet 用于振动属性预测的树形架构 — 四个层级块（共享→分组→子组→属性），实现多目标联合学习*

##### 算法伪代码

```python
# === MODNet 完整流程伪代码 ===

# 第一阶段：特征工程
features = matminer.featurize(structures)  # ~1500 维物理描述符
# 包含: 组成特征(元素统计)、结构特征(键长/配位数/AGNI指纹)、电子特征(价电子统计)等

# 第二阶段：NMI 特征选择 (MOD-selection)
nmi_matrix = compute_pairwise_NMI(features, target)  # NMI(X,Y) = 2*MI(X,Y)/(H(X)+H(Y))
selected = []
for i in range(n_optimal_features):  # 通常 ~300
    for f in remaining_features:
        relevance = nmi_matrix[f, target]
        redundancy = max(nmi_matrix[f, fs] for fs in selected) if selected else 0
        RR[f] = relevance / (redundancy ** p + c)  # p ∈ [0,3], c 为小常数
    best = argmax(RR)
    selected.append(best)

# 第三阶段：树形神经网络训练
# 架构: [256共享] → [128分组] → [64子组] → [8属性专用] → 输出
model = TreeNN(
    shared_block=[256, 256],        # 所有属性共享
    group_block=[128, 128],         # 按属性组分裂 (如: 热力学 vs 形成能)
    subgroup_block=[64, 64],        # 子组分裂 (如: 熵/焓 vs 比热/自由能)
    property_block=[8, 8]           # 每个属性独立
)
optimizer = Adam(lr=0.01, beta1=0.9, beta2=0.999)
for epoch in range(600):
    for batch in dataloader(batch_size=256):
        X = batch[selected_features]
        X = min_max_normalize(X)
        preds = model(X)  # 同时预测多个属性
        loss = sum(w_i * MSE(preds[i], targets[i]) for i in properties)
        loss.backward()
        optimizer.step()
```

##### 动机与背景

材料属性预测是计算材料科学的核心任务。传统的第一性原理方法（如 DFT、DFPT）虽然精确，但计算成本极高——例如计算一个材料的振动热力学属性需要数百 CPU 小时。机器学习方法可以将预测速度提升数个数量级，但面临两大挑战：

1. **小样本困境**：许多高精度计算数据集仅包含数百到数千个样本（如振动热力学仅 1245 个化合物），远小于图像或 NLP 领域的数据规模。端到端的图神经网络（如 MEGNet、CGCNN）在大数据集上表现优异，但在小数据集上容易过拟合。

2. **维度灾难**：matminer 等工具可生成 ~1500 维的物理描述符，但在小样本下，大量不相关特征会引入噪声，降低模型泛化能力。

> 💡 **关键洞察**：MODNet 的核心思想是——在数据稀缺时，利用领域知识（物理特征）+ 智能特征选择 + 多任务联合学习，比端到端学习更有效。

##### 核心机制一：NMI 驱动的特征选择

MODNet 的特征选择算法（MOD-selection）基于最大相关-最小冗余（mRMR）的思想，但使用归一化互信息（NMI）替代传统的 Pearson 相关系数，以捕捉非线性依赖关系。

**归一化互信息定义**：

$$\text{NMI}(X, Y) = \frac{2 \cdot \text{MI}(X, Y)}{H(X) + H(Y)}$$

其中 \(\text{MI}(X,Y) = H(X) + H(Y) - H(X,Y)\) 为互信息，\(H(\cdot)\) 为 Shannon 熵。NMI 的值域为 \([0, 1]\)，1 表示完全依赖，0 表示独立。

**Relevance-Redundancy (RR) 评分**：

$$\text{RR}(f) = \frac{\text{NMI}(f, y)}{\left[\max_{f_s \in \mathcal{S}} \text{NMI}(f, f_s)\right]^p + c}$$

- 分子 \(\text{NMI}(f, y)\)：特征 \(f\) 与目标 \(y\) 的相关性（**相关性项**）
- 分母 \(\max_{f_s} \text{NMI}(f, f_s)\)：特征 \(f\) 与已选特征集 \(\mathcal{S}\) 中最相似特征的 NMI（**冗余惩罚项**）
- 超参数 \(p \in [0, 3]\)：控制冗余惩罚强度；\(c\) 为小常数防止除零

> ⚠️ **与 SISSO 的区别**：SISSO 通过压缩感知在巨大的特征组合空间中搜索最优低维描述符，计算量随特征数指数增长，实际限制在 ~10 个特征。MOD-selection 的贪心策略可线性扩展到数百个特征，更适合神经网络的高维输入需求。

**实验验证**：在振动熵预测任务中，MOD-selection 在 200 个训练样本时带来 ~12% 的误差降低；在 1000 个样本时仍有 ~5% 的提升。与 Pearson 相关、RF 重要性、SISSO、OMP 等方法对比，MOD-selection 在需要选择 >10 个特征时表现最优。

##### 核心机制二：树形神经网络联合学习

MODNet 的另一核心创新是将多属性预测组织为**树形架构**，利用属性间的相似性实现联合迁移学习。

**架构设计原则**：
- 相似属性共享更多层（如不同温度下的振动熵），不相似属性在更早的层分裂
- 属性间的"架构距离"（分隔的层数和神经元数）决定了联合学习的程度
- 距离太小 → 不同属性被迫共享不合适的表示；距离太大 → 退化为独立模型，失去联合学习的优势

**具体架构（振动属性预测）**：

```
输入 (300 特征)
    │
    ├── Block 1: [256, 256] ← 所有属性共享
    │
    ├── Block 2: [128, 128] ← 按属性组分裂
    │   ├── 组A: 熵 + 焓
    │   └── 组B: 比热 + 自由能
    │
    ├── Block 3: [64, 64] ← 子组分裂
    │   ├── 熵
    │   ├── 焓
    │   ├── 比热
    │   └── 自由能
    │
    └── Block 4: [8, 8] → 各属性独立输出
```

属性分组依据 NMI 相似性：先计算所有目标属性对之间的 NMI，相似属性分入同一组。例如，振动熵与焓在物理上更相关（都与声子态密度的低阶矩相关），因此共享更多层。

**联合学习的增益**：在振动熵预测上，m-MODNet（多属性）比单属性 MODNet 提供 ~8% 的 MAE 降低，且在训练样本越少时增益越明显。

> 💡 **直觉理解**：联合学习的本质是正则化——通过强制不同属性共享底层表示，减少了模型的有效自由度，从而在小样本下获得更好的泛化。

##### 核心机制三：物理特征工程

MODNet 使用 matminer 库生成约 1500 维的物理描述符，涵盖：

| 特征类别 | 示例 | 数量 |
|---------|------|------|
| 组成特征 | 元素统计（原子量、电负性、价电子数的均值/方差/范围等） | ~200 |
| 结构特征 | 键长、配位数、AGNI 指纹、Voronoi 多面体特征 | ~800 |
| 电子特征 | 价电子分布、轨道统计 | ~300 |
| 其他 | 密度、体积、空间群特征 | ~200 |

这些特征编码了丰富的物理先验知识。例如，AGNI 指纹（Adaptive Generalized Neighborhood Informatics）提供了键长倒数的度量，被发现是振动熵的最重要预测因子——键长越长，振动熵越高，这与物理直觉完全一致。

##### 与传统方法的对比

| 方法 | 特征来源 | 小样本性能 | 大样本性能 | 可解释性 | 多属性 |
|------|---------|-----------|-----------|---------|--------|
| **MODNet** | 物理描述符 + 选择 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ✅ |
| MEGNet | 图表示端到端学习 | ⭐ | ⭐⭐⭐ | ⭐ | ❌ |
| CGCNN | 图表示端到端学习 | ⭐ | ⭐⭐⭐ | ⭐ | ❌ |
| SISSO | 压缩感知解析公式 | ⭐⭐ | ⭐ | ⭐⭐⭐ | 有限 |
| RF + matminer | 物理描述符 + 全部 | ⭐⭐ | ⭐⭐ | ⭐⭐ | ❌ |

论文通过系统实验确立了一个重要的**方法边界**：在 ~4000 样本以下，基于物理特征的 MODNet 优于图网络；在更大数据集上，图网络的端到端学习能力占优。这一发现为实践者选择方法提供了明确指导。

**关键基准结果**：
- 振动熵 \(S_{305K}\)：MAE = 8.9 μeV/K/atom（RMSE = 12.0），测试集 145 个材料
- 形成能（MP 69k）：MAE = 0.044 eV/atom（与 MEGNet 的 0.028 相比，大数据集上图网络更优）
- 带隙（MP 69k）：MAE = 0.34 eV
- 折射率（4040 样本）：MAE = 0.05

#### 🧪 练习题
```yaml
question: "MODNet 特征选择算法 (MOD-selection) 中 RR 评分的分母设计目的是什么？"
options:
  - "增加特征与目标属性的相关性权重"
  - "惩罚与已选特征高度冗余的候选特征，确保互补性"
  - "对特征进行归一化以消除量纲差异"
  - "限制神经网络的输入维度以加速训练"
answer: 1
explain: "RR 评分的分母为候选特征与已选特征集中最相似特征的 NMI 的 p 次方，当候选特征与已选特征高度冗余时分母增大、RR 降低，从而优先选择互补性强的特征。"
```

### AnisoNet

```yaml
id: anisonet
num: 22
name: AnisoNet
full_name: 各向异性网络 (Anisotropic Network)
year: '2025'
org: 多机构
parent: equiformer
paper_url: https://pubs.rsc.org/en/content/articlehtml/2024/fd/d4fd00096j
project_url: ''
category: property_prediction
motivation: 完整介电张量预测
```

#### 📝 一句话总结
AnisoNet 提出了一种基于球谐函数不可约表示（\(0_e + 2_e\)）的等变图神经网络，直接预测晶体材料的完整介电张量而非标量值，通过等变约束保证输出自动满足晶体点群对称性，并成功筛选出 137 种具有高各向异性的新型介电材料。

#### 🎯 核心要点
- **等变输出设计**：将 3×3 对称介电张量分解为不可约表示 \(0_e + 2_e\)（1 个标量 + 5 个对称无迹张量分量），模型输出天然满足晶体对称性约束
- **消息传递架构**：基于 e3nn 库的等变消息传递网络，利用 Clebsch-Gordon 系数控制球谐特征的张量积交互，最优 \(l_{\max} = 3\)
- **各向异性比指标**：定义 \(a_r = \varepsilon_{\max} / \varepsilon_{\min}\)（介电张量最大/最小特征值之比）量化各向异性程度
- **数据集**：基于 Materials Project 的 6706 条 DFPT 高频介电张量数据，按 8:1:1 划分训练/验证/测试集
- **性能**：多晶介电常数 MAE = 0.311（误差 6.6%），各向异性比 MAE = 0.078（误差 5.96%）
- **等变 vs 标量模型对比**：标量模型（6×0_e）在各向异性比上 MAE 为 0.147，几乎是等变模型的 2 倍；立方晶系下等变模型误差严格为零
- **高通量筛选**：对 Materials Project 中 18835 个未计算结构进行预测，筛选出 137 种 \(a_r > 2.5\) 的候选材料，经 DFPT 验证 95% 以上 \(a_r > 2\)

#### 🔬 深入细节
##### 核心架构示意图

![AnisoNet 工作流程总览](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f1.gif)
*图 1：AnisoNet 工作流程——从晶体结构到介电张量预测再到高通量材料筛选*

![介电张量不可约分解](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f2.gif)
*图 2：介电张量分解为不可约表示 \(0_e + 2_e\)，标量部分对应多晶平均值，\(l=2\) 部分编码各向异性信息*

![AnisoNet 模型架构](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f3.gif)
*图 3：AnisoNet 等变消息传递网络架构，输入为原子图（节点=原子，边=键），输出为介电张量的不可约表示*

##### 算法核心逻辑

```python
# AnisoNet 核心流程伪代码
# 1. 图构建：晶体结构 → 原子图（截断半径 5Å）
graph = build_graph(crystal_structure, cutoff=5.0)
# 节点特征：原子序数的 one-hot 嵌入
# 边特征：球谐函数 Y_l^m(r_ij) 编码方向信息

# 2. 等变消息传递（T 步）
for t in range(T):
    for node_i in graph.nodes:
        # 张量积消息聚合（公式 2）
        messages = sum(
            CG_coeff * R(||r_ij||) * Y(r_ij) ⊗ h_j
            for j in neighbors(i)
        )
        h_i = update(h_i, messages)
    if t < T - 1:
        h = gated_nonlinearity(h)  # 门控非线性
    # 最后一步仅保留 l=0 和 l=2 特征

# 3. 全局池化 → 不可约表示输出
output = (1/N) * sum(h_i for i in graph.nodes)  # 0_e + 2_e

# 4. 重构介电张量
epsilon = reconstruct_tensor(output)  # 从不可约表示恢复 3×3 张量
```

##### 动机与背景

晶体材料的介电响应本质上是**张量性质**——不同晶轴方向的介电常数可以显著不同。这种各向异性对于光纤传感器、双折射光学器件、暗物质探测器等应用至关重要。然而，现有的机器学习方法（如 MatBench 排行榜上的所有模型）仅预测标量多晶介电常数，完全丢失了方向信息。

传统方法的核心缺陷在于：(1) 标量模型无法捕获各向异性；(2) 即使预测 6 个独立张量分量，也无法保证输出满足晶体对称性——例如，立方晶系的介电张量必须是各向同性的（三个特征值相等），但标量模型可能给出不等的预测值。

> 💡 **关键洞察**：对称实 3×3 张量可以分解为球谐不可约表示 \(0_e + 2_e\)，其中 \(0_e\) 是标量（多晶平均值的 \(\sqrt{3}\) 倍），\(2_e\) 是 5 维对称无迹张量（编码各向异性）。等变网络天然保证：如果输入结构具有立方对称性，则 \(2_e\) 分量**必须为零**。

##### 等变消息传递机制

AnisoNet 的核心是基于球谐函数的等变消息传递。每个消息传递步骤中，节点特征通过**广义张量积**更新：

$$x_{i,cm}^{(t+1),l} = \sum_{l_1, l_2} C_{l_1 l_2}^{l} \sum_{j \in \mathcal{N}(i)} R_{c}^{l_1 l_2 l}(\|\mathbf{r}_{ij}\|) \sum_{m_1, m_2} C_{m_1 m_2 m}^{l_1 l_2 l} \, x_{j,cm_1}^{(t),l_1} \, Y_{m_2}^{l_2}(\hat{\mathbf{r}}_{ij})$$

其中：
- \(C_{l_1 l_2}^{l}\) 和 \(C_{m_1 m_2 m}^{l_1 l_2 l}\) 是 **Clebsch-Gordon 系数**，决定两个球谐特征是否具有正确的对称性进行交互（不满足时系数为零）
- \(R(\|\mathbf{r}_{ij}\|)\) 是作用于边长径向基投影的**可学习 MLP**
- \(Y_{m}^{l}(\hat{\mathbf{r}}_{ij})\) 是边方向的**球谐基函数**，编码角度信息
- 张量积操作等价于两个向量的外积后进行 Wigner 分解，保证旋转等变性

> ⚠️ **注意**：在除最后一步外的所有消息传递步骤中，使用**门控非线性**：标量特征通过 ReLU，张量特征由一个额外的标量特征（经 ReLU 后）进行缩放。这种设计保持了等变性，因为标量缩放不破坏旋转对称性。

最终步骤仅使用 \(l = 0\) 和 \(l = 2\) 特征构建输出，而中间步骤使用所有 \(l \leq l_{\max}\) 的特征。全局池化通过简单平均实现：

$$\mathbf{o} = \frac{1}{N} \sum_{i=1}^{N} x_i^{(T)}$$

##### 等变性的关键优势

论文通过系统对比实验揭示了等变性的核心价值：

| 指标 | 等变模型 (\(0_e + 2_e\)) | 标量模型 (\(6 \times 0_e\)) | 改进幅度 |
|------|:---:|:---:|:---:|
| \(\varepsilon_{\text{poly}}\) MAE | **0.311** | 0.336 | 7.4% |
| \(a_r\) MAE | **0.078** | 0.147 | 46.9% |
| 立方晶系 \(a_r\) MAE | **0.000** | 0.108 | 100% |

![多晶介电常数预测性能](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f4.gif)
*图 4：(a) 等变模型预测 vs DFPT 参考值热力图；(b) 等变与标量模型在不同晶系上的 MAE 对比*

![各向异性比预测性能](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f5.gif)
*图 5：各向异性比 \(a_r\) 预测性能——等变模型在所有晶系上均优于标量模型，差距在低对称晶系中更为显著*

关键发现：
- 对于**标量性质**（多晶介电常数），等变性的贡献较小（~8%），因为不变特征（组成、键长）已足够
- 对于**张量性质**（各向异性比），等变性至关重要（~58% 平均改进），因为方向信息必须被正确编码
- \(l_{\max} \geq 2\) 是等变模型良好性能的必要条件，这与输出包含 \(l = 2\) 分量一致

##### 高通量材料发现

AnisoNet 被应用于 Materials Project 中 18835 个未计算结构的筛选，筛选条件包括：能量高于凸包 < 50 meV/atom、带隙 > 0.5 eV、单胞原子数 < 40 等。

![发现的高各向异性材料](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f6.gif)
*图 6：(a) 各向异性比与结构维度的关系——2D 和 1D 材料各向异性最强；(b) 新发现材料 vs 训练集的 \(a_r\) 分布*

![代表性材料的晶体结构与光吸收谱](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f7.gif)
*图 7：代表性高各向异性材料——NaV₂O₄（\(a_r = 7.74\)，最高）展现巨大的光吸收各向异性*

关键发现：
- 137 个候选材料中 95% 以上经 DFPT 验证 \(a_r > 2\)，平均 \(a_r = 3.9\)（训练集平均仅 1.2）
- 80% 的高各向异性材料为 2D 或准 2D 结构（主要是含 W/Mo 的过渡金属二硫化物）
- NaV₂O₄ 具有最高 \(a_r = 7.74\)，其 VO₆ 八面体层间由 Na⁺ 分隔，平行于层的方向吸收系数达 \(10^5\) cm⁻¹，而垂直方向接近零

##### 局限性与未来方向

- **截断半径限制**：5 Å 的截断半径无法捕获大层间距的范德华材料中的长程相互作用
- **仅限高频介电张量**：未包含离子贡献，而高-κ 介电体的大介电响应往往由离子贡献主导
- **数据不平衡**：训练集中 \(\varepsilon > 10\) 的样本不足 5%，导致高介电常数区域预测偏差较大
- **候选材料验证**：部分顶级候选（如 Ba₂Cu₂O₅）为假设化合物，需进一步评估可合成性和动力学稳定性

#### 🧪 练习题
```yaml
question: "AnisoNet 将介电张量输出设计为不可约表示 0_e + 2_e 的主要优势是什么？"
options:
  - "减少模型参数量，加快训练速度"
  - "保证输出张量自动满足输入晶体结构的点群对称性"
  - "提高多晶介电常数的预测精度"
  - "使模型能够预测频率依赖的介电响应"
answer: 1
explain: "等变不可约表示输出确保了 Neumann 原理的自动满足——例如立方晶系输入必然产生各向同性输出（2_e 分量为零），消除了标量模型可能产生的非物理张量。"
```

### E²GNN

```yaml
id: e2gnn
num: 23
name: E²GNN
full_name: 高效等变图神经网络 (Efficient Equivariant Graph NN)
year: '2025'
org: 多机构
parent: equiformer
paper_url: https://www.nature.com/articles/s41524-025-01535-3
project_url: ''
category: property_prediction
motivation: 平衡精度与效率的等变设计
```

#### 📝 一句话总结
E²GNN 用每个原子的标量-向量双表示替代高阶球谐/张量积表示，并通过直接力预测与两体局域消息传递实现等变原子间势建模，解决了等变模型在精度与训练/推理效率之间难以兼顾的问题。

#### 🎯 核心要点
- **标量-向量双表示**：每个原子节点同时维护 \(F\) 个标量特征 \(\mathbf{x}_i\) 和 \(F\) 个三维向量特征 \(\vec{\mathbf{x}}_i\)，分别承载不变量与等变量信息
- **四阶段迭代结构**：每层依次执行 global message distributing、local message passing、local message updating、global message aggregating
- **轻量等变消息传递**：局域消息只依赖邻居标量、邻居向量、距离径向基与单位方向向量，避免 MACE、Equiformer 等高阶不可约表示中的昂贵张量积
- **新消息更新单元（NMU）**：用向量范数把等变信息转成不变量门控信号，再用线性组合更新标量和向量通道
- **全局标量/向量通信**：引入图级全局标量与全局向量，使浅层网络也能交换长程信息，缓解单纯堆深局域 GNN 的过平滑和梯度问题
- **能量可加、力直接预测**：总能量由原子能量求和得到，保证 extensivity；力由最终向量表示线性读出，跳过对能量的一阶/二阶求导
- **联合能量-力损失**：训练目标同时约束结构能量与每个原子三维力分量，在 OC20、MD17、ISO17 以及 LiPS/H₂O/CH₄ 分子动力学系统上评估
- **效率取舍清晰**：直接力预测显著提高训练和推理速度，但力场不严格能量守恒，MD 中通常需要恒温器控制温度漂移

#### 🔬 深入细节
##### 架构示意图

![E²GNN 总体架构图](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41524-025-01535-3/MediaObjects/41524_2025_1535_Fig2_HTML.png)
*图：E²GNN Figure 2。模型在每一层中执行全局消息分发、局域消息传递、局域消息更新和全局消息聚合；图源为 npj Computational Materials 论文公开图片。*

##### 算法伪代码

```python
# E²GNN 核心流程伪代码
graph = build_3d_interaction_graph(atoms, positions, cutoff_D, max_neighbors_N)

# 初始化：标量来自原子序数嵌入，向量从零开始
x = atom_embedding(Z)                   # shape: [num_atoms, F]
v = zeros(num_atoms, F, 3)              # vector channels
x_g = trainable_global_scalar(F)
v_g = zeros(F, 3)

for layer in range(T):
    # 1. global message distributing
    for i in graph.nodes:
        x[i] = mlp(concat(x[i], x_g)) + x[i]
        v[i] = linear(v[i] + v_g) + v[i]

    # 2. local message passing
    m_x = zeros_like(x)
    m_v = zeros_like(v)
    for i in graph.nodes:
        for j in graph.neighbors(i):
            r_ji = positions[i] - positions[j]
            d = norm(r_ji)
            direction = r_ji / d
            gate_h = radial_h(d)
            gate_u = radial_u(d)
            gate_v = radial_v(d)

            m_x[i] += (W_h @ x[j]) * gate_h
            m_v[i] += (W_u @ x[j]) * gate_u * v[j]
            m_v[i] += (W_v @ x[j]) * gate_v * direction

    # 3. local message updating / NMU
    for i in graph.nodes:
        inv_from_vec = norm(V @ m_v[i])
        z = concat(m_x[i], inv_from_vec)
        x[i] = W_s @ z + tanh(W_g @ z) * m_x[i]
        v[i] = (W_h_update @ z) * (U @ m_v[i])

    # 4. global message aggregating
    x_g = mlp(concat(mean(x), x_g)) + x_g
    v_g = linear(mean(v) + v_g) + v_g

atom_energy = mlp_energy(x)             # scalar head
energy = atom_energy.sum()
forces = linear_force(v)                # direct vector readout
loss = alpha * abs(energy - energy_label) + beta * mae(forces, force_labels)
```

##### 动机与背景

机器学习原子间势要同时预测能量和力。能量应对平移、旋转、反射保持不变；力作为三维向量，在旋转结构时也应按同样方式旋转。传统不变量模型只用距离、角度或二面角编码几何，效率高但方向信息利用有限；高阶等变模型用球谐函数、Clebsch-Gordan 张量积和不可约表示显式保存方向信息，精度强但计算开销大。

E²GNN 的设计目标是保留等变性的主要收益，同时把表示压到最低复杂度：只维护标量和普通三维向量，不使用 \(l \ge 2\) 的高阶张量通道。节点初始状态为：

$$
\mathbf{x}_i^{(0)}=E(z_i)\in\mathbb{R}^{F},\qquad
\vec{\mathbf{x}}_i^{(0)}=\vec{\mathbf{0}}\in\mathbb{R}^{F\times 3}
$$

其中 \(z_i\) 是原子序数，\(E\) 是可学习嵌入。标量通道不会随旋转改变，向量通道随旋转一起变换，因此只要消息函数由距离、标量门控和单位方向向量组成，就可以保持 E(3) 等变。

##### 局域消息传递：用两体力直觉构造向量消息

在第 \(t\) 层，原子 \(i\) 从截断半径内的邻居 \(j\) 聚合标量消息：

$$
\mathbf{m}_i
=\sum_{v_j\in\mathcal{N}(v_i)}
(W_h\mathbf{x}_j^{(t)})\circ
\lambda_h(\|\vec{\mathbf{r}}_{ji}\|)
$$

向量消息由两部分组成：

$$
\vec{\mathbf{m}}_i
=\sum_{v_j\in\mathcal{N}(v_i)}
(W_u\mathbf{x}_j^{(t)})\circ\lambda_u(\|\vec{\mathbf{r}}_{ji}\|)\circ\vec{\mathbf{x}}_j^{(t)}
+(W_v\mathbf{x}_j^{(t)})\circ\lambda_v(\|\vec{\mathbf{r}}_{ji}\|)\circ
\frac{\vec{\mathbf{r}}_{ji}}{\|\vec{\mathbf{r}}_{ji}\|}
$$

第一项传播上一层已经学到的方向特征；第二项像一个可学习的两体力分解：\((W_v\mathbf{x}_j)\lambda_v(d_{ji})\) 给出强度，\(\vec{\mathbf{r}}_{ji}/\|\vec{\mathbf{r}}_{ji}\|\) 给出方向。因为距离是旋转不变标量、单位方向是等变向量，整体消息在旋转下仍按向量方式变换。

> 💡 关键：E²GNN 不显式枚举角度、二面角或高阶球谐通道，而是让多层标量-向量交互逐步学习几何对称信息。

##### NMU：让向量信息安全地控制标量更新

局域消息更新阶段把 \(\mathbf{m}_i\) 和 \(\vec{\mathbf{m}}_i\) 汇合。向量不能直接加到标量里，否则会破坏旋转对称性；E²GNN 先取线性变换后向量的范数，把方向特征转成不变量：

$$
\mathbf{x}_i^{(t+1)}
=W_s(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)
+\tanh\left(W_g(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)\right)\mathbf{m}_i
$$

$$
\vec{\mathbf{x}}_i^{(t+1)}
=\left(W_h(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)\right)
\circ\left(U\vec{\mathbf{m}}_i\right)
$$

直觉上，\(\|V\vec{\mathbf{m}}_i\|\) 告诉标量通道“周围方向模式有多强”，但不暴露坐标系方向；向量更新则用标量门控缩放向量线性组合，从而保持等变性。

##### 全局通信与输出头

单纯局域 GNN 需要堆很多层才能让远距离原子互相影响，但深层会带来过平滑和训练不稳定。E²GNN 引入图级全局标量 \(\mathbf{x}_{\mathcal{G}}\) 与全局向量 \(\vec{\mathbf{x}}_{\mathcal{G}}\)。每层开始前把全局状态分发到节点，每层结束后再用节点均值更新全局状态：

$$
\mathbf{x}_{\mathcal{G}}^{(t+1)}
=\phi\left(\frac{1}{|\mathcal{G}|}\sum_{v_i\in\mathcal{G}}\mathbf{x}_i^{(t)}
\oplus \mathbf{x}_{\mathcal{G}}^{(t)}\right)+\mathbf{x}_{\mathcal{G}}^{(t)}
$$

最终能量由原子标量读出后求和：

$$
e=\sum_{v_i\in\mathcal{G}} e_i,\qquad e_i=\phi(\mathbf{x}_i^{(T)})
$$

力由最终向量通道直接线性读出：

$$
\vec{\mathbf{F}}_i=W_f\vec{\mathbf{x}}_i^{(T)}
$$

这种设计省去了 \(\vec{\mathbf{F}}_i=-\nabla_{\vec{\mathbf{r}}_i}E\) 的反向求导成本，尤其避免了训练力损失时对能量梯度再求参数梯度的二阶开销。代价是直接预测的力不自动满足能量守恒，因此论文在讨论中也指出 MD 场景通常需要恒温器。

##### 训练目标与传统方法对比

论文使用能量和力的加权 L1 损失：

$$
\mathcal{L}
=\frac{1}{N}\sum_{n=1}^{N}\left(
\alpha |e_n-e_n^l|
+\beta\frac{1}{3M}\sum_{m=1}^{M}\sum_{k=1}^{3}
|\vec{\mathbf{F}}_{nmk}-\vec{\mathbf{F}}_{nmk}^{\,l}|
\right)
$$

其中 \(N\) 是样本数，\(M\) 是每个结构的原子数，\(\alpha,\beta\) 控制能量与力的权重。与 Equiformer/MACE 这类高阶等变模型相比，E²GNN 的表达能力来自“标量门控 + 向量传播 + 全局节点”，而不是昂贵的高阶张量路径；与 SchNet/CGCNN 这类标量不变量模型相比，它能直接在中间层保存方向响应，因而更自然地预测力。

#### 🧪 练习题
```yaml
question: "E²GNN 为什么可以在不用高阶球谐张量的情况下保持等变性？"
options:
  - "因为它只预测标量能量，不预测力"
  - "因为它用距离作为标量门控、用单位方向向量承载方向变化，并让向量通道随旋转同步变换"
  - "因为它把所有原子坐标先旋转到同一个标准方向"
  - "因为全局节点会消除所有方向信息"
answer: 1
explain: "距离和向量范数是不变量，单位方向和向量通道是等变量；用标量门控缩放等变向量不会破坏 E(3) 等变性。"
```

### GNoME

```yaml
id: gnome
num: 24
name: GNoME
full_name: 图网络材料探索 (Graph Networks for Materials Exploration)
year: '2023'
org: DeepMind
parent: m3gnet
paper_url: https://www.nature.com/articles/s41586-023-06735-9
project_url: ''
category: foundation_model
motivation: 主动学习发现220万新晶体
```

#### 📝 一句话总结
GNoME 将图神经网络能量预测、结构/成分候选生成、DFT 验证和主动学习闭环结合起来，大规模筛选无机晶体稳定性，解决了材料发现中“候选空间巨大但第一性原理计算昂贵”的核心瓶颈。

#### 🎯 核心要点
- **两条候选生成管线**：结构管线用已知晶体替换与 SAPS 生成结构候选；成分管线先筛公式，再用 AIRSS 为每个成分生成随机结构
- **图网络能量模型**：结构模型把晶体转成原子图，节点使用元素 one-hot 嵌入，消息传递 MLP 预测形成能/总能量；成分模型在没有结构时预测公式稳定性
- **主动学习数据飞轮**：GNoME 先过滤候选，DFT 对高价值候选做几何弛豫和能量计算，验证结果再加入下一轮训练与候选生成
- **六轮主动学习**：从 Materials Project 约 69k 材料起步，多轮迭代后发现 2.2M 个相对旧凸包稳定的结构，其中 381k 个进入更新后的最终凸包
- **稳定性判据**：以分解能/凸包距离衡量材料是否会分解为竞争相；主动学习过滤阶段使用约 50 meV/atom 阈值提高召回
- **不确定性与测试时增强**：结构模型使用 10 个深度集成模型、晶格体积 80% 到 120% 的 20 个缩放增强，并用中位数/IQR 稳定预测
- **实验与高保真验证**：736 个 GNoME 结构被同期实验数据库独立匹配，二元/三元候选中 84% 在 r²SCAN 复算下仍保持负分解能
- **下游势能模型数据源**：GNoME 的弛豫轨迹还能预训练 NequIP 等 MLIP，提升零样本分子动力学与离子导体筛选能力

#### 🔬 深入细节
##### 框架示意图

![GNoME 主动学习发现框架](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41586-023-06735-9/MediaObjects/41586_2023_6735_Fig1_HTML.png)
*图：GNoME Figure 1。结构/成分候选经图网络过滤后进入 DFT 计算，新的弛豫结果再回流训练集，形成材料发现数据飞轮；图源为 Nature 论文公开图片。*

##### 算法伪代码

```python
# GNoME 主动学习闭环伪代码
dataset = load_materials_project_snapshot(year=2018)  # initial DFT labels
gnn_struct = train_structural_gnn(dataset)
gnn_comp = train_compositional_gnn(dataset)
gnome_db = initialize_database(dataset)

for round_id in range(6):
    # 1. 结构管线：从已知稳定晶体出发做替换和 SAPS
    structural_candidates = generate_by_substitution(
        gnome_db.stable_structures,
        symmetry_aware_partial_substitutions=True,
    )

    # 2. 成分管线：生成化学式，再用 AIRSS 初始化随机结构
    compositions = generate_charge_balanced_or_relaxed_formulas()
    composition_scores = gnn_comp.predict(compositions)
    selected_compositions = filter_by_predicted_stability(composition_scores)
    random_structures = []
    for comp in selected_compositions:
        random_structures += AIRSS(comp, num_initial_structures=100)

    candidates = structural_candidates + random_structures

    # 3. 模型过滤：测试时缩放增强 + 深度集成不确定性
    ranked = []
    for material in candidates:
        preds = []
        for scale in linspace(0.80, 1.20, 20):
            scaled = isotropic_scale_lattice(material, scale)
            preds += [model.predict_energy(scaled) for model in gnn_struct.ensemble]
        energy_pred = median(preds)
        uncertainty = interquartile_range(preds)
        e_decomp_pred = energy_above_convex_hull(energy_pred, gnome_db)
        if e_decomp_pred <= 0.050:  # eV/atom, active-learning recall threshold
            ranked.append((material, energy_pred, uncertainty))

    # 4. DFT 验证：只对最有希望的候选做 VASP 弛豫和静态计算
    dft_results = run_vasp_relaxations(select_for_dft(ranked))

    # 5. 数据飞轮：新能量更新凸包、数据库和下一轮训练集
    gnome_db.add(dft_results)
    dataset = dataset + dft_results
    gnn_struct = train_structural_gnn(dataset)
    gnn_comp = train_compositional_gnn(dataset)

stable_final = compute_final_convex_hull(gnome_db)
```

##### 动机与背景

无机晶体的候选空间极大，稳定材料只占很小一部分。直接对所有候选做 DFT 几何弛豫不可行；只靠人类化学直觉做元素替换又会把搜索限制在已知原型附近。GNoME 的核心判断是：材料发现不应该是一次性训练一个预测器，而应该是一个能不断产生数据、验证数据、再训练模型的闭环。

论文把“稳定”定义为相对于竞争相凸包的热力学稳定。对某个结构 \(s\) 的组成 \(c\)，可以先计算形成能：

$$
E_{\mathrm{form}}(s)=E_{\mathrm{DFT}}(s)-\sum_{e} n_e\mu_e
$$

再与同一化学体系的凸包能量比较：

$$
E_{\mathrm{decomp}}(s)
=E_{\mathrm{form}}(s)-E_{\mathrm{hull}}(c)
$$

当 \(E_{\mathrm{decomp}}\le 0\) 时，结构位于凸包上或低于旧数据库凸包，代表在当前竞争相集合下不倾向于分解。GNoME 的模型目标不是直接替代 DFT 给出最终结论，而是把 DFT 预算集中到更可能稳定、更多样的候选上。

##### 图网络模型与候选过滤

结构模型把晶体表示为图：节点是原子，节点输入是元素 one-hot/嵌入，边携带邻近关系和几何信息。论文采用标准 message passing 形式，聚合函数由浅层 MLP 和 Swish 非线性构成。可抽象为：

$$
\mathbf{m}_{ij}^{(\ell)}
=\phi_e^{(\ell)}(\mathbf{h}_i^{(\ell)},\mathbf{h}_j^{(\ell)},\mathbf{e}_{ij}),
\qquad
\mathbf{h}_i^{(\ell+1)}
=\phi_v^{(\ell)}\left(\mathbf{h}_i^{(\ell)},\frac{1}{\bar{d}}\sum_{j\in\mathcal{N}(i)}\mathbf{m}_{ij}^{(\ell)}\right)
$$

其中 \(\bar{d}\) 是全数据集平均邻接度，用于归一化边到节点的消息。图级能量通常由节点贡献汇聚得到：

$$
\hat{E}(s)=\sum_{i\in s}\hat{\epsilon}_i
$$

监督信号来自 DFT 弛豫后的形成能，训练可写成能量回归目标：

$$
\mathcal{L}_{\mathrm{energy}}
=\frac{1}{B}\sum_{b=1}^{B}
\left|\frac{\hat{E}_{\mathrm{form},b}}{N_b}
-\frac{E_{\mathrm{form},b}}{N_b}\right|
$$

论文还强调了评估时的稳健性处理。结构候选往往还没有 DFT 弛豫，输入分布会偏离训练集；因此 GNoME 对同一结构做多个等比例晶格缩放，并训练 10 个图网络组成 ensemble。最终预测不简单取单模型输出，而是用集成输出的中位数作为能量估计，用四分位距近似不确定性。

##### 两条发现管线

结构管线从 Materials Project、OQMD 等数据库中的晶体出发做替换。传统替换通常一次性替换完整元素位点，容易错过部分占位或对称相关位点的组合。GNoME 引入 symmetry-aware partial substitutions (SAPS)，让替换操作尊重晶体对称性，同时允许不完全替换，从而显著扩展候选空间。论文报告在主动学习过程中结构管线累计产生超过 \(10^9\) 个候选。

成分管线先在化学式空间做更随机的探索。模型在没有结构输入时预测成分稳定性，筛出的公式再交给 AIRSS 生成随机初始结构；每个成分可初始化 100 个随机结构，然后由 DFT 弛豫得到真实能量。这条管线降低了对已知原型的依赖，尤其有利于探索多元素组合空间。

##### 主动学习闭环

每轮主动学习包含四个动作：生成候选、GNoME 过滤、DFT 验证、回流训练。DFT 计算使用 VASP、PBE/PAW 以及与 Materials Project 兼容的设置；新得到的弛豫结构和能量会更新数据库、凸包和下一轮训练集。这个闭环的实际效果体现在命中率上：结构管线和成分管线早期命中率较低，最终分别提升到超过 80% 和约 33%。

> 💡 关键：GNoME 的“模型”不只是单个 GNN，而是候选生成、稳定性预测、不确定性过滤、DFT 验证和数据库更新组成的系统。

##### 与传统材料发现方法的区别

传统高通量计算常先枚举已知原型或做人工规则替换，再把候选送入 DFT；这种方式精度可靠但探索范围窄。GNoME 用神经网络把“是否值得做 DFT”变成一个可学习的排序问题，允许在更大的候选池中保持可承受的验证成本。与单次训练的材料性质模型相比，GNoME 的核心优势来自数据飞轮：模型越好，筛到的稳定结构越多；稳定结构越多，下一轮候选和训练数据也越丰富。

论文最终给出的规模结果是：发现 2.2M 个相对旧数据库凸包稳定的结构，更新后的最终凸包中有 381k 个新稳定条目，使稳定晶体目录扩大近一个数量级。这些结果仍是计算稳定性预测，后续实验合成和性质验证是独立步骤；但 736 个结构被同期实验数据库匹配，说明模型搜索到的区域并非纯粹的数值幻觉。

#### 🧪 练习题
```yaml
question: "GNoME 主动学习闭环中，DFT 计算结果最关键的作用是什么？"
options:
  - "只用于生成论文中的可视化晶体图片"
  - "验证被模型筛出的候选，并把弛豫能量回流为下一轮训练数据和凸包更新"
  - "替代图神经网络完成所有候选的稳定性预测"
  - "只用于计算元素 one-hot 编码"
answer: 1
explain: "GNoME 的效率来自模型过滤与 DFT 验证的闭环；DFT 既确认稳定性，也提供新的监督标签，驱动后续主动学习轮次。"
```

### CrystaLLM

```yaml
id: crystallm
num: 25
name: CrystaLLM
full_name: 晶体语言模型 (Crystal Language Model)
year: '2024'
org: UCL
parent: —
paper_url: https://www.nature.com/articles/s41467-024-54639-7
project_url: ''
category: foundation_model
motivation: CIF作为语言的生成式模型
```

#### 📝 一句话总结
CrystaLLM 把晶体结构文件 CIF 直接当作文本序列，用 decoder-only Transformer 做自回归下一个 token 预测，从而在不显式构造晶体图或扩散过程的情况下生成语法正确且物理上可行的无机晶体结构。

#### 🎯 核心要点
- **CIF-as-language**：直接训练标准化后的 CIF 文本，而不是把 CIF 先转换为图、点云、晶格矩阵或对称操作特征
- **自回归 Transformer**：模型是 GPT-2/nanoGPT 风格的 decoder-only Transformer，按上下文 token 预测下一个 token
- **大规模晶体语料**：训练数据来自 2.3M 个无机结构 CIF；训练/验证/测试划分为 2,047,889 / 227,544 / 10,286 个 CIF
- **371 词表与数字级建模**：词表包含 CIF 标签、空间群符号、元素符号、数字和标点；训练集 token 数约 768M
- **可条件生成**：推理时可用 `data_` 加 cell composition 作为 prompt，也可加入空间群条件，逐 token 采样生成完整 CIF
- **标准语言模型损失**：最大化 \(\sum_i \log P(u_i|u_{i-c},\dots,u_{i-1})\)，等价于最小化 next-token cross entropy
- **有效性检查**：生成后用 pymatgen/spglib 检查空间群一致性、键长合理性和 atom-site multiplicity 与组成是否匹配
- **MCTS 解码增强**：用 CrystaLLM 的 token 概率扩展搜索树，并用 ALIGNN 形成能预测作为快速 reward，引导采样到更低能结构

#### 🔬 深入细节
##### 模型示意图

![CrystaLLM CIF 语言建模流程](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41467-024-54639-7/MediaObjects/41467_2024_54639_Fig1_HTML.png)
*图：CrystaLLM Figure 1。CIF 文件被 token 化后输入 decoder-only Transformer，训练时预测右移一位的目标 token；生成时从组成 prompt 开始逐 token 采样 CIF。图源为 Nature Communications 论文公开图片。*

##### 算法伪代码

```python
# ===== 训练阶段：CIF 自回归语言建模 =====
cifs = load_cif_corpus(num_structures=2_300_000)
cifs = standardize_cifs(cifs, round_float_decimals=4, symmetry_tolerance=0.1)
tokens = tokenize_cifs(cifs, vocab_size=371)

model = DecoderOnlyTransformer(
    n_layers=8,
    n_heads=8,
    embedding_dim=512,
    num_parameters="25M",
)

for batch in sample_token_windows(tokens, context_length=c):
    input_tokens = batch[:, :-1]
    target_tokens = batch[:, 1:]
    logits = model(input_tokens)
    loss = cross_entropy(logits, target_tokens)
    optimizer.step(loss)

# ===== 普通生成：按组成或空间群条件采样 CIF =====
prompt = tokenize("data_" + sorted_cell_composition)  # optionally add space group
generated = prompt
while not stop_condition(generated):
    logits = model(generated[-c:])
    next_token = sample_top_k(logits[-1], k=10, temperature=1.0)
    generated.append(next_token)

cif = detokenize(generated)
valid = check_space_group(cif) and check_bond_lengths(cif) and check_multiplicity(cif)

# ===== MCTS 解码：用 ALIGNN 形成能引导采样 =====
root = TreeNode(prompt)
for iteration in range(num_mcts_iters):
    node = select_by_puct(root)
    child = expand_with_model_probabilities(node, model)
    completed_cif = rollout_until_terminal(child, model, max_tokens=1000)
    if is_valid_cif(completed_cif):
        energy = ALIGNN.predict_formation_energy(completed_cif)
        reward = -energy
    else:
        reward = invalid_penalty
    backpropagate(child, reward)

best_cif = best_valid_sequence(root)
```

##### 动机与背景

晶体结构生成通常要同时满足周期性、空间群、元素组成、晶胞参数、原子分数坐标和合理键长。许多生成模型会先把晶体编码成图或连续几何变量，再用 VAE、扩散或优化过程生成结构。CrystaLLM 选择了更直接的路线：CIF 本来就是材料数据库交换结构的标准语言，里面已经包含组成、对称性、晶胞和原子位点，因此可以把“生成晶体”改写成“生成一段合法 CIF 文本”。

这种做法的难点在于，CIF 里的数字坐标和晶格参数不是普通自然语言词汇。论文没有把坐标离散成特殊几何对象，而是让模型逐符号、逐数字预测。若模型真正学会 CIF 语法和晶体统计规律，它不仅应能闭合括号、标签和循环结构，还应能生成与空间群和组成相容的坐标。

##### 训练目标

设 token 序列为 \(\mathcal{U}=(u_1,\ldots,u_n)\)，词表为 \(\mathcal{V}\)，上下文窗口大小为 \(c\)。CrystaLLM 最大化自回归似然：

$$
\mathcal{L}(\theta;\mathcal{U})
=\sum_i \log P(u_i \mid u_{i-c},\ldots,u_{i-1};\theta)
$$

实际训练最小化负对数似然：

$$
\mathcal{J}(\theta;\mathcal{U})=-\mathcal{L}(\theta;\mathcal{U})
$$

这就是标准 next-token cross entropy。模型结构是 25M 参数的多层 Transformer decoder，包含 8 层、8 个 attention head 和 512 维嵌入；学习率从 \(10^{-3}\) 衰减到 \(10^{-4}\)，batch size 为 32。

##### 数据标准化与 token 化

训练前，论文先把 2.3M 个结构转换为 CIF，并用 pymatgen 做标准化。为了减少无意义格式差异，浮点数保留 4 位小数；对于同一 cell composition 和 space group 的重复结构，保留每化学式体积更低的结构。token 词表由 371 个符号构成，包括 CIF tag、空间群符号、元素符号、数字和标点。

> 💡 关键：CrystaLLM 的归纳偏置主要来自 CIF 格式本身。标准化让同一结构尽量对应稳定文本模式，token 化则让模型能够同时学习语法 token 和数字 token 的统计关系。

##### 条件生成流程

生成时，模型从 prompt 开始逐 token 采样。最常见 prompt 是 `data_` 拼接目标 cell composition；如果希望约束空间群，也可以把空间群相关字段放进前缀。每一步：

$$
u_t \sim P_\theta(\cdot \mid u_{t-c},\ldots,u_{t-1})
$$

论文基准中使用 top-k sampling，\(k=10\)，temperature 为 1.0，并给每个测试结构最多 20 次生成尝试。生成结束后，CIF 不是直接接受，而要经过三类验证：声明空间群与结构一致、键长在预期键长 30% 范围内、atom-site multiplicity 与 cell composition 一致。

##### MCTS 解码：把语言模型采样和能量模型结合

普通 top-k 采样只按语言模型概率生成，容易偏向“训练集中常见且语法自然”的结构，但不一定能量低。CrystaLLM 进一步把 Monte Carlo Tree Search 用作解码器：树节点表示当前已经生成的 CIF token 前缀，子节点是候选下一 token。选择阶段使用 PUCT 在“高价值分支”和“尚未探索分支”之间平衡：

$$
a^*=\arg\max_a
\left[
Q(s,a)+c_{\mathrm{puct}}P_\theta(a|s)
\frac{\sqrt{N(s)}}{1+N(s,a)}
\right]
$$

扩展后，CrystaLLM 从该前缀继续 rollout 到终止条件，得到完整 CIF；若 CIF 有效，就用预训练 ALIGNN 预测形成能 \(E_f\)，并把 reward 设为与能量相反的方向：

$$
R(s)\approx -E_f(s)
$$

随后把 reward 回传到路径上的节点，提升后续选择低形成能结构的概率。论文报告，在挑战集中最困难的 20 个案例上，MCTS 相比随机 top-k 采样通常提高有效率并降低最小形成能；对 102 个无条件生成的新成分，MCTS 后 ALIGNN 能量平均下降，DFT 计算的 hull distance 也平均改善。

##### 与传统晶体生成方法的区别

与 CDVAE、DiffCSP 一类显式几何生成模型相比，CrystaLLM 不直接在连续坐标空间建模噪声或潜变量，而是在 CIF 文本空间学习联合分布。这带来两个优点：第一，空间群、组成、晶胞和坐标天然在同一序列中，条件控制可以通过 prompt 完成；第二，可以复用成熟语言模型训练和解码技术，例如 top-k sampling、temperature、MCTS 和外部 reward reranking。

局限也同样清楚：CIF 语法正确不等于热力学稳定，生成结构仍需要后处理验证、能量模型筛选以及 DFT 复算。CrystaLLM 的实用定位更像晶体结构预测工作流中的 proposal generator，而不是最终稳定性判定器。

#### 🧪 练习题
```yaml
question: "CrystaLLM 与许多晶体扩散模型最核心的建模差异是什么？"
options:
  - "CrystaLLM 不生成晶体结构，只做分类"
  - "CrystaLLM 直接在标准化 CIF 文本 token 上做自回归语言建模，而不是在显式几何表示上扩散采样"
  - "CrystaLLM 只能生成已有训练集中的 CIF"
  - "CrystaLLM 完全不需要验证空间群和键长"
answer: 1
explain: "CrystaLLM 把 CIF 当作语言序列，用 next-token objective 生成完整 CIF；生成后仍要用结构解析、键长和能量模型等步骤筛选。"
```

### MatLLMSearch

```yaml
id: matllmsearch
num: 26
name: MatLLMSearch
full_name: 材料LLM搜索 (Materials LLM Search)
year: '2025'
org: 多机构
parent: crystallm
paper_url: https://arxiv.org/abs/2502.20933
project_url: ''
category: foundation_model
motivation: LLM作为智能提案代理
```

#### 📝 一句话总结
MatLLMSearch 将预训练大语言模型放进进化搜索闭环中，让 LLM 在少量参考晶体的提示下隐式执行交叉、突变和结构改写，解决纯生成模型需要材料数据库微调且难以同时兼顾稳定性、有效性和多目标设计的问题。

#### 🎯 核心要点
- **训练自由的 LLM 结构提案器**：直接调用 Llama 3.1-70B 等预训练 LLM 生成 POSCAR/CIF 晶体结构，不对材料数据库做微调
- **三阶段进化闭环**：Selection 选择高分父代，Reproduction 让 LLM 修改或组合父代结构，Evaluation 用规则、MLIP 和 DFT 逐级验证
- **隐式交叉与突变**：LLM 可同时改变化学组分、晶格参数、原子坐标、元素替换和结构基元，而不是依赖手写晶体遗传算子
- **物理约束评估**：先检查三维周期性、原子间距和电荷平衡，再用 CHGNet/M3GNet 松弛并计算 decomposition energy \(E_d\)
- **选择机制可切换目标**：可按 \(E_d\) 做稳定性优化，也可按体模量、deformation energy 或多目标排序更新父代池
- **结果验证链条**：CHGNet/M3GNet 作为快速代理筛选，最终对 \(E_d < 0.1\) eV/atom 的候选进行 VASP/PBE DFT 验证
- **任务泛化**：同一框架可用于 crystal structure generation、给定化学式的 crystal structure prediction，以及稳定性-力学性质多目标搜索

#### 🔬 深入细节
##### 框架示意图

![MatLLMSearch 进化搜索流程](https://raw.githubusercontent.com/JingruG/MatLLMSearch/main/assets/pipeline.png)
*图：MatLLMSearch 官方仓库中的 pipeline 图。流程从已知稳定结构初始化父代池，经 LLM 生成子代、规则/MLIP 评估、目标排序选择，迭代推动晶体结构族群进化。*

来源说明：主要来源为 arXiv:2502.20933 v2、官方 GitHub README 与 arXiv TeX 源文件；官方仓库提供了可访问的 pipeline 图片。论文还在 OpenReview/TMLR 页面出现过，但方法细节以 arXiv v2 为准。

##### 任务建模与总体流程

论文把晶体结构生成写成学习或搜索一个晶体分布：

$$
p(c,l,s)
$$

其中 \(c \in \mathbb{R}^{N \times K}\) 表示 \(N\) 个原子在 \(K\) 种元素上的组成矩阵，\(l \in \mathbb{R}^{6}\) 表示晶格常数和角度，\(s \in \mathbb{R}^{N \times 3}\) 表示周期单胞内的原子坐标。MatLLMSearch 的关键不是重新训练一个显式分布模型，而是把 LLM 当成可查询的 proposal policy，通过进化选择把输出分布逐步推向稳定区域。

初始化时，从已知稳定结构数据库 \(\mathcal{D}\) 中采样 \(K \times P\) 个结构，组成父代池 \(\mathcal{P}_0\)。论文实验中常用 \(K=100\)、父代数 \(P=2\)、每轮子代数 \(C=5\)、迭代轮数 \(N=10\)，并用 POSCAR 格式和 12 位小数描述结构。每组父代被放进提示词，要求 LLM “modify or combine the base materials”，从而在自然语言和结构文本层面执行隐式交叉/突变。

##### 算法伪代码

```python
# MatLLMSearch 核心流程
def matllmsearch(database_D, objective, K=100, P=2, C=5, N=10):
    # 1. 初始化：采样已知稳定结构作为父代
    parent_pool = sample_stable_structures(database_D, K * P)
    optional_extra_pool = retrieve_extra_pool(database_D, objective)
    all_children = []

    for i in range(N):
        children = []
        for group in split(parent_pool, group_size=P):
            prompt = build_prompt(
                parents=group,
                objective=objective,
                format="POSCAR or CIF",
                instruction="modify or combine base materials"
            )
            # 2. Reproduction：LLM 生成新候选
            children.extend(llm_generate(prompt, num_candidates=C, temperature=0.95))

        # 3. Evaluation：先做规则过滤，再做 MLIP 松弛和性质预测
        scored = []
        for structure in children:
            if not valid_periodic_structure(structure):
                continue
            if not valid_interatomic_distances(structure, ratio_range=(0.6, 1.3)):
                continue
            if not charge_balanced(structure):
                continue

            relaxed = chgnet_relax(structure)
            E_d = distance_to_mp_convex_hull(relaxed)
            properties = predict_properties(relaxed, objective)
            scored.append((structure, E_d, properties))

        all_children.extend(scored)

        # 4. Selection：从父代、子代和可选参考池中选择下一轮父代
        candidates = parent_pool + scored + optional_extra_pool
        parent_pool = select_top_k(candidates, objective=objective, k=K * P)

    # 5. Final verification：对代理模型判断为亚稳的候选做 DFT
    metastable = [s for s in all_children if s.E_d < 0.1]  # eV/atom
    return dft_verify(metastable)
```

##### 为什么 LLM 能做晶体“交叉/突变”

传统晶体遗传算法的交叉和突变通常是显式算子：交换原子片段、扰动坐标、改变晶格、替换元素等。这些算子可控，但很容易局限于局部几何操作，且需要研究者为不同材料体系手动设计规则。MatLLMSearch 的假设是：预训练 LLM 已从通用科学文本和结构化文本中学到一部分晶体化学先验，能够在 POSCAR/CIF 这种文本表示中识别“相近元素”“合理化学计量”“晶格与坐标的格式约束”等模式。

因此，Reproduction 阶段并不告诉 LLM 执行某个固定突变算子，而是把父代结构、优化目标和输出格式一起放进提示词。LLM 生成的子代可能来自元素替换、晶格缩放、坐标重排、结构基元组合，甚至是新的但与父代功能相关的结构。进化选择随后负责纠偏：物理无效结构被过滤，能量和目标性质更好的结构进入下一代。

##### 评估函数与稳定性计算

MatLLMSearch 的评估分两层。第一层是低成本规则验证：

- 三维周期性和 POSCAR/CIF 格式是否可解析
- 任意原子间距离是否落在经验合理范围，例如 \(0.6\) 到 \(1.3\) 倍原子半径和
- 化学式是否满足电荷平衡或基本价态约束

第二层是代理模型和相图评估。给定 CHGNet 松弛后的结构，论文用 Materials Project 相图计算 decomposition energy：

$$
E_d(m)=E_\text{form}(m)-E_\text{hull}(\mathrm{composition}(m))
$$

当 \(E_d < 0.1\) eV/atom 时，结构通常被视为亚稳候选；更严格的稳定性验证使用 DFT 松弛和静态计算确认是否落到凸包上或接近凸包。最终 DFT 设置采用 VASP 6、GGA-PBE、PAW、520 eV 截断能、每倒易原子 1000 的 \(k\)-点密度，并用 \(10^{-6}\) eV 电子收敛和 0.02 eV/Å 离子力阈值。

##### Selection 如何把 LLM 输出变成搜索

如果只让 LLM 一次性生成晶体，输出质量容易被提示词偶然性主导。MatLLMSearch 的核心增益来自选择压力。第 \(i\) 轮后，下一代父代池从三类候选中产生：

$$
\mathcal{P}_{i+1}
= \operatorname{TopK}_{\mathrm{objective}}
\left(\mathcal{P}_{i} \cup \mathcal{C}_{i} \cup \mathcal{R}\right)
$$

其中 \(\mathcal{P}_i\) 是当前父代，\(\mathcal{C}_i\) 是 LLM 子代，\(\mathcal{R}\) 是可选额外参考池。对于稳定性任务，排序目标主要是最小化 \(E_d\)；对于多目标设计，可以交替优化稳定性和体模量，或使用加权/字典序策略。

> 💡 关键：LLM 负责提出“可能合理”的离散结构跳跃，CHGNet/M3GNet 和相图负责给出连续、物理可解释的选择信号。两者结合后，系统不需要反向传播更新 LLM，也能把候选分布逐轮推向更稳定区域。

##### 与 CrystaLLM / CrystalTextLLM 等方法的区别

CrystaLLM 或 CrystalTextLLM 的基本路线是把 CIF/POSCAR 当作语言序列，通过材料结构数据库训练或微调自回归模型。优势是结构文本建模直接，缺点是训练成本高、任务迁移需要重新调优，而且单次采样没有强反馈。MatLLMSearch 反过来使用通用预训练 LLM 的现成能力，把训练成本转移到推理时搜索和快速物性评估上。

论文报告的关键结果包括：在晶体结构生成任务中，MatLLMSearch 使用 Llama 3.1-70B 时取得约 76.8% 的 CHGNet 亚稳率和 31.7% 的 DFT 验证稳定率，显著高于 CrystalTextLLM-70B 的对应结果。去除 \(f\)-electron 元素作为父代捷径后，CHGNet 亚稳率仍约 78.4%，并提高了非 \(f\)-electron 稳定结构比例，说明框架并非只在强相关元素上“钻空子”。

#### 🧪 练习题
```yaml
question: "MatLLMSearch 相比直接让 LLM 一次性生成晶体结构，最关键的机制改进是什么？"
options:
  - "用更大的 LLM 替代所有物理评估模型"
  - "把 LLM 放入进化闭环，用规则、MLIP 和相图评分选择下一代父代"
  - "只允许 LLM 改变元素组成，不允许改变晶格和坐标"
  - "通过微调让 LLM 记住 Materials Project 的全部 CIF 文件"
answer: 1
explain: "MatLLMSearch 的核心是 LLM 负责提出候选，物理评估和选择机制负责保留高质量结构并构造下一轮提示，从而形成搜索闭环，而不是单次无反馈生成。"
```

### MatterSim-MT

```yaml
id: mattersim_mt
num: 27
name: MatterSim-MT
full_name: 材料模拟多任务模型 (MatterSim Multi-Task)
year: '2026'
org: Microsoft
parent: chgnet
paper_url: https://www.microsoft.com/en-us/research/blog/mattersim-updates-experimental-validation-faster-simulation-and-a-new-multi-task-model/
project_url: ''
category: foundation_model
motivation: 3500万结构多任务基础模型
```

#### 📝 一句话总结
MatterSim-MT 在 MatterSim 的能量-力-应力势能面基础上扩展出多任务材料基础模型，用 3500 万个第一性原理标注结构和多种辅助物性头同时学习统一原子表示，使同一个模型既能做结构/动力学/热力学模拟，也能预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵。

#### 🎯 核心要点
- **超大覆盖预训练集**：约 35M 第一性原理结构、约 450M 原子力标签，覆盖 89 种元素、0-5000 K、0-1000 GPa
- **多任务物性扩展**：在 E/F/S 势能面之外，额外预测 Bader charges、magnetic moments、Born effective charges \(Z^*\)、dielectric matrices \(\varepsilon_\infty\)
- **GeoMFormer 主干**：使用 invariant/equivariant 双流 Transformer，通过 self-attention 和 cross-attention 交换标量与几何等变信息
- **物理先验约束**：周期边界多图构建、平滑截断函数、平移/旋转不变性、向量性质等变性和能量守恒
- **统一多任务损失**：能量、力、应力与四类辅助目标按 MAE 加权联合训练
- **超越 PES 的模拟能力**：可模拟 SiC 压力依赖 LO-TO splitting、BaTiO3 铁电电滞回线、富锂正极脱锂过程中的阴离子氧氧化
- **可扩展与可适配**：10M 参数模型用于主实验，模型规模可扩至 1.3B；可通过主动学习和少量高层级理论数据快速微调

#### 🔬 深入细节
##### 框架示意图

![MatterSim-MT 总体框架](https://arxiv.org/html/2605.07927v1/x1.png)
*图：MatterSim-MT Figure 1。上部是主动学习材料探索器，中部是带 invariant/equivariant 表示的 Transformer 主干，下部是能量、力、应力和多任务物性头。*

![MatterSim-MT 多任务能力](https://arxiv.org/html/2605.07927v1/x3.png)
*图：MatterSim-MT Figure 3。模型从同一原子结构中输出 E/F/S、磁矩、Born 有效电荷和介电矩阵，并支撑 LO-TO splitting、铁电电滞和电池氧氧化案例。*

来源说明：任务给定链接是 Microsoft Research 新闻页/博客入口；可追溯到 Microsoft Research publication 页面和 arXiv:2605.07927，论文 HTML 与 TeX 源均可访问，图示使用 arXiv HTML 直链。

##### 材料图表示

MatterSim-MT 输入是带周期边界条件的材料图：

$$
\mathcal{G}=(\boldsymbol{Z},\boldsymbol{V},\boldsymbol{R},[\boldsymbol{L},\boldsymbol{S}])
$$

其中 \(\boldsymbol{Z}\) 是原子序数和原子特征，\(\boldsymbol{R}=\{\boldsymbol{r}_i\}\) 是三维原子位置，\(\boldsymbol{V}\) 是原子对相对位移，\(\boldsymbol{L}\) 是 \(3\times3\) 晶格矩阵，\(\boldsymbol{S}\) 可包含温度、压力等全局状态。边在截断半径 \(r_c\) 内建立，并通过周期镜像原子构造 multi-graph，使单胞内原子能感知邻近周期图像。

平滑截断 mask 用于避免邻居进出截断半径时产生不连续：

$$
m_{ij}=1-6\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^5
+15\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^4
-10\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^3
$$

节点初始标量嵌入叠加中心性编码：

$$
\boldsymbol{b}_i=
\sum_{j\in\mathcal{N}(i)}
\mathrm{Linear}\left(m_{ij}\cdot\tilde{\Phi}(\|\boldsymbol{r}_{ij}\|)\right),
\qquad
\boldsymbol{x}_i^{\prime 0}=\boldsymbol{x}_i^0+\boldsymbol{b}_i
$$

等变流则用径向基和单位方向向量初始化：

$$
\boldsymbol{e}_i^0=
\sum_j m_{ij}\tilde{\Phi}(\|\boldsymbol{r}_{ij}\|)
\cdot \mathrm{concat}\left(1,\frac{\boldsymbol{r}_{ij}}{\|\boldsymbol{r}_{ij}\|}\right)
$$

##### GeoMFormer 双流 Transformer

MatterSim-MT 的主干来自 GeoMFormer。它维护两套表示：invariant stream \(\boldsymbol{x}_i\) 承载标量不变信息，equivariant stream \(\boldsymbol{e}_i\) 承载方向相关几何信息。每个 Transformer block 包含四类注意力模块：

- Inv-Self-Attn：标量流内部自注意力
- Equ-Self-Attn：等变流内部自注意力
- Inv-Cross-Attn：等变信息注入标量流
- Equ-Cross-Attn：标量信息门控或调制等变流

对 invariant self-attention，论文使用带截断 mask 的注意力：

$$
a_{ij}=\left(\frac{\boldsymbol{Q}\boldsymbol{K}^{T}}{\sqrt{d}}\right)_{ij}
$$

$$
\mathrm{Softmax}^{*}(a_{ij})
=\frac{\exp(a_{ij})m_{ij}}
{\sum_{k\in\mathcal{N}(i)}\exp(a_{ik})m_{ik}}
$$

$$
\boldsymbol{x}_i^{h+1}
=\sum_{j\in\mathcal{N}(i)}
\mathrm{Softmax}^{*}(a_{ij})\,m_{ij}\,\boldsymbol{V}_j
$$

周期镜像原子的 key/value 从原胞原子复制，避免同一物理原子在不同镜像中产生不一致表示。FFN 对 invariant feature 可使用标准非线性，而 equivariant feature 不能随意过非线性，因此用 invariant feature 做 gate 来缩放等变通道。

##### 多任务头与关键计算

最终 Transformer block 输出 \((x_i^N,e_i^N)\)。每个 task head 先用 Inv-Cross-Attn 融合两流：

$$
\boldsymbol{x}_i^{N+1}=\mathrm{InvCrossAttn}(x_i^N,e_i^N)
$$

标量型预测，如能量、Bader 电荷和磁矩，使用 MLP：

$$
\boldsymbol{p}_i=
W_2 f_{\mathrm{LN}}\left(\sigma(W_1x_i^{N+1}+b_1)\right)+b_2
$$

能量对原子做 mean pooling 或图级聚合；Bader 电荷和磁矩保留为 per-atom 输出。Born 有效电荷和介电矩阵采用 ETGNN 风格的张量构造。介电张量可写为：

$$
\varepsilon
=\frac{1}{N}
\sum_{i=1}^{N}\sum_{j\in\mathcal{N}(i)}
(\boldsymbol{p}_i\boldsymbol{p}_j)
\frac{\vec{r}_{ji}}{\|\vec{r}_{ji}\|}
\otimes
\frac{\vec{r}_{ji}}{\|\vec{r}_{ji}\|}
$$

Born 有效电荷分为对称和非对称贡献：

$$
\boldsymbol{Z}_i=\boldsymbol{Z}_i^{\mathrm{sym}}+\boldsymbol{Z}_i^{\mathrm{non\mbox{-}sym}}
$$

这些张量输出是 MatterSim-MT 区别于普通 MLIP 的关键：普通势能面模型只能给出能量、力、应力，无法直接构造极化、长程库仑非解析修正或电荷/磁矩演化。

##### 联合训练目标

GeoMFormer 多任务损失为：

$$
L=
l(e,e_{\mathrm{DFT}})
+\omega_f l(\boldsymbol{f},\boldsymbol{f}_{\mathrm{DFT}})
+\omega_\sigma l(\boldsymbol{\sigma},\boldsymbol{\sigma}_{\mathrm{DFT}})
+\sum_{i=1}^{4}\omega_{t_i}l(\boldsymbol{p}_{t_i},\boldsymbol{p}_{t_i,\mathrm{DFT}})
$$

其中 \(l(\cdot,\cdot)\) 是 MAE，\(e\) 是每原子能量，\(\boldsymbol{f}\) 是 per-atom force，\(\boldsymbol{\sigma}\) 是应力张量，四个辅助目标 \(t_i\) 分别对应 magnetic moments、Bader charges、Born effective charges 和 dielectric matrices。

辅助标签规模远小于 E/F/S 主数据：Bader charge 数据约 172,488 个周期结构，Born effective charge 与 dielectric matrix 约 3,051 个结构，磁矩约 284,195 个结构。因此多任务训练的核心工程问题是让大规模 PES 预训练学到通用局域化学表示，再用小得多的高价值物性标签扩展输出能力。

##### 算法伪代码

```python
# MatterSim-MT 训练与推理伪代码
for batch in first_principles_batches:
    graph = build_periodic_multigraph(
        atoms=batch.atomic_numbers,
        positions=batch.positions,
        lattice=batch.lattice,
        states=batch.temperature_pressure,
        cutoff=r_c,
    )

    x = atom_embedding(graph.Z) + centrality_encoding(graph.distances, graph.mask)
    e = equivariant_embedding(graph.directions, graph.distances, graph.mask)

    for block in geomformer_blocks:
        x = inv_self_attention(x, graph.mask)
        e = equ_self_attention(e, graph.mask)
        x = inv_cross_attention(x, e, graph.mask)
        e = equ_cross_attention(e, x, graph.mask)
        x, e = gated_ffn(x, e)

    energy = energy_head(x).mean_over_atoms()
    forces = -grad(energy, graph.positions)        # 能量守恒路径
    stress = stress_head(x, graph.lattice)
    bader = bader_head(x, e)                       # per-atom
    magmom = magnetic_head(x, e)                   # per-atom
    born = born_effective_charge_head(x, e, graph.directions)
    dielectric = dielectric_head(x, e, graph.directions)

    loss = mae(energy, E_dft)
    loss += w_f * mae(forces, F_dft)
    loss += w_s * mae(stress, stress_dft)
    loss += w_aux * available_auxiliary_mae(
        bader, magmom, born, dielectric, labels=batch.aux_labels
    )
    optimizer.step(loss)
```

##### 多任务能力为何重要

势能面模型擅长结构弛豫、分子动力学、声子和热力学，但许多材料问题依赖 PES 之外的电子响应。例如极性晶体的 LO-TO splitting 需要 Born 有效电荷和电子介电矩阵来构造动力学矩阵的非解析修正：

$$
{}^{\mathrm{NA}}C_{I\alpha,J\beta}
=\frac{4\pi}{\Omega}
\frac{(\mathbf{q}\cdot Z_I^*)_\alpha(\mathbf{q}\cdot Z_J^*)_\beta}
{\mathbf{q}\cdot\boldsymbol{\varepsilon}_\infty\cdot\mathbf{q}}
$$

仅有能量和力无法得到这项长程库仑修正。MatterSim-MT 直接预测 \(Z^*\) 和 \(\varepsilon_\infty\)，所以能模拟 3C-SiC 在高压下的 LO-TO splitting；同理，Born 有效电荷使 BaTiO3 在外电场下的极化-电场电滞回线成为可模拟对象，Bader 电荷和磁矩让富锂正极脱锂过程中的阳离子/阴离子氧化转变可被跟踪。

论文报告的代表性误差包括：Bader 电荷 MAE 约 0.023 e，磁矩约 0.064 \(\mu_B\)，Born 有效电荷约 0.0756 e，介电张量元素约 0.2478。主文还展示了 10M 参数模型在速度和精度间的折中，1.3B 参数模型进一步降低自由能误差，说明多任务材料基础模型仍有可预期的 scaling 空间。

#### 🧪 练习题
```yaml
question: "MatterSim-MT 相比只预测能量、力、应力的普通机器学习势，最重要的能力扩展是什么？"
options:
  - "只用更少数据拟合相同的势能面"
  - "通过多任务头预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵，从而模拟 PES 之外的电子响应现象"
  - "完全取消周期边界条件以处理分子体系"
  - "用手写经验势替代 Transformer 主干"
answer: 1
explain: "普通 MLIP 主要描述势能面，难以直接处理极化、介电响应、LO-TO splitting 或氧化态演化。MatterSim-MT 的多任务输出补上了这些物理量。"
```

### LLEMA

```yaml
id: llema
num: 28
name: LLEMA
full_name: LLM引导材料演化 (LLM-guided Evolution for Materials)
year: '2026'
org: 多机构
parent: matllmsearch
paper_url: https://arxiv.org/abs/2603.05123
project_url: ''
category: foundation_model
motivation: LLM引导演化多目标发现
```

#### 📝 一句话总结
LLEMA 将 LLM 候选生成、化学规则、代理物性预测、多目标评分和成功/失败记忆池组成闭环，解决材料发现中多目标约束、合成可行性和 LLM 易记忆已知数据库候选的问题。

#### 🎯 核心要点
- **来源纠错**：任务给定的 `paper_url` arXiv:2603.05123 实际是超导 DFT 论文，不是 LLEMA；LLEMA 实际论文为 OpenReview ICLR 2026 与 arXiv:2510.22503
- **Agentic 进化框架**：LLM 在每轮根据任务、约束、化学规则和历史示例生成候选材料，并输出结构化 JSON/CIF
- **化学信息进化规则**：引入同族元素替换、化学计量保持、氧化态一致性、晶体结构操作等规则，约束 LLM 的突变/交叉方向
- **层级 oracle**：先查 Materials Project 等数据库；若候选超出数据库覆盖，再调用 CGCNN、ALIGNN 等 surrogate models 预测物性
- **多目标评分**：用归一化 reward \(\Phi_i\) 衡量每个属性约束的满足程度，并加权得到综合分数
- **成功/失败双记忆池**：把满足硬约束的候选放入 \(\mathbb{M}^+\)，违反约束的候选放入 \(\mathbb{M}^-\)，下一轮同时提供正例和反例
- **多岛演化**：5 个独立 island 通过 Boltzmann sampling 选择，降低早熟收敛和数据库记忆，提升多样性
- **评测覆盖广**：14 个真实材料发现任务，跨电子、能源、涂层、光学和航天应用，显式要求多属性权衡与热力学稳定性

#### 🔬 深入细节
##### 框架示意图

![LLEMA 框架图](https://arxiv.org/html/2510.22503v2/x1.png)
*图：LLEMA Figure 1。四个组件依次为 Material Candidate Generation、Crystallographic Representation、Physicochemical Property Prediction、Fitness Assessment and Feedback。*

来源说明：任务 YAML 中的 `paper_url` 指向 arXiv:2603.05123，经核验该链接标题为 “First-principles calculation of coherence length and penetration depth ...”，与 LLEMA 无关。本文实际依据 OpenReview ICLR 2026 页面、arXiv:2510.22503 v2、项目页 `https://scientific-discovery.github.io/llema-project/` 和官方 GitHub `scientific-discovery/LLEMA` 撰写。

##### 问题形式化：从单目标到多目标约束

最简单的材料发现可写成：

$$
m^*=\arg\max_{m\in\mathcal{M}} f(m)
$$

其中 \(m\) 是候选材料，\(\mathcal{M}\) 是有效化学空间，\(f\) 是黑箱性质函数。但真实材料任务通常不只优化一个属性，而是要同时满足多个硬约束 \(\mathcal{C}=\{c_1,\dots,c_k\}\)，并在多个目标 \(f_1,\dots,f_n\) 间权衡。每个约束可写为区间、下界或上界：

$$
c_i:f_i(m)\in[l_i,u_i]
\quad\mathrm{or}\quad
c_i:f_i(m)\ge l_i
\quad\mathrm{or}\quad
c_i:f_i(m)\le u_i
$$

一个朴素多目标聚合为：

$$
m^*=\arg\max_{m\in\mathcal{M}}\sum_i w_i f_i(m)
$$

LLEMA 的贡献在于不只定义目标函数，而是让 LLM、规则、oracle 和记忆共同参与搜索，使候选生成本身逐轮向满足约束的区域偏移。

##### Prompt 构成与候选生成

第 \(n\) 轮，LLM \(\pi_\theta\) 从 prompt \(\mathbf{p}_n\) 中采样一批 \(b\) 个候选：

$$
\mathcal{M}^{b}\sim \pi_\theta(\mathbf{p}_n)
$$

prompt 由四部分组成：

- **Task Specification**：自然语言任务，如 wide-bandgap semiconductors，并显式写入 band gap、formation energy、density、bulk/shear modulus 等约束
- **Chemistry-Informed Design Principles**：从第 1 轮之后加入化学进化规则，例如同族替换、化学计量保持、氧化态一致性和结构原型迁移
- **Demonstrations**：从上一轮 population buffer 中抽取成功候选 \(\mathbb{M}^+\) 与失败候选 \(\mathbb{M}^-\)，作为正反例反馈
- **Crystallographic Representation**：要求输出 reduced formula、lattice parameters、atomic species 和 fractional coordinates，最终转成 CIF 供 oracle 评估

官方实现中，候选采样常用 \(b=2\)、温度 \(\tau=0.8\)，并从规则集中随机采样 6 条规则加入提示。相比 MatLLMSearch，LLEMA 更强调多任务约束和记忆式自我改进：LLM 不是只看父代结构，而是同时看任务规格、失败原因和跨岛经验。

##### 代理评估与综合分数

对候选 \(\mathcal{M}_j\)，LLEMA 先生成 CIF，再用层级 oracle 预测物性。若候选可以在 Materials Project 等数据库中精确或相似匹配，则直接读取已有计算/实验属性；否则调用 surrogate models，例如 CGCNN 和 ALIGNN，得到属性向量：

$$
\mathbf{f}(m)=[f_1(m),f_2(m),\dots,f_d(m)]\in\mathbb{R}^{d}
$$

综合分数写为：

$$
S(\mathcal{T},\mathcal{C};\mathcal{M}_j)
=\sum_{i=1}^{k}w_i\cdot
\Phi_i(f_i(\mathcal{M}_j),c_i)
$$

其中 \(w_i\) 是第 \(i\) 个属性的重要性权重，\(\Phi_i\) 是把“是否满足约束、离目标有多远”转成归一化 reward 的函数。满足所有硬约束的候选进入成功池：

$$
\mathbb{M}^{+}=\{m\mid \Phi_i(f_i(m),c_i)\ge 0,\forall i\}
$$

违反任一硬约束的候选进入失败池 \(\mathbb{M}^{-}\)。失败池不是废弃物，而是下一轮提示中的负例：它告诉 LLM 哪些元素组合、晶格配置或属性权衡会失败。

##### 多岛记忆与 Boltzmann 选择

LLEMA 使用 \(m=5\) 个独立 island。每个 island 都维护成功/失败 buffer，独立探索化学空间。每轮先按 island 平均分数选择一个 island：

$$
P_i=\frac{\exp(s_i/\tau_c)}{\sum_j\exp(s_j/\tau_c)}
$$

其中 \(s_i\) 是第 \(i\) 个 island 的平均分数，\(\tau_c\) 是温度。附录实现进一步给出退火形式：

$$
\tau_c=T_0\left(1-\frac{u\bmod M}{M}\right)
$$

其中 \(u\) 是当前 island 的候选数，\(T_0=0.1\)、\(M=10{,}000\)。被选中的 island 内再用 top-\(k\) 从 \(\mathbb{M}^{+}\) 和 \(\mathbb{M}^{-}\) 取示例，构造下一轮 prompt。

> 💡 关键：success memory 推动 exploitation，failure memory 提供反例边界，multi-island sampling 保持 exploration。三者共同降低 LLM 反复生成 Materials Project 已知材料的倾向。

##### 算法伪代码

```python
# LLEMA 核心流程
def llema(task_T, constraints_C, rules_R, predictor_f, llm, N, num_islands=5):
    islands = init_islands(num_islands)  # 每个 island 含 success/error buffers
    candidate_pool = init_candidates_from_materials_project(task_T)
    base_prompt = build_prompt(task_T, constraints_C)

    for n in range(1, N):
        # 1. 选择一个 island，并从成功/失败池取 in-context 示例
        island = boltzmann_select(islands, score="mean_fitness")
        demos_pos = island.success.topk(k=2)
        demos_neg = island.failure.topk(k=2)

        # 2. 注入任务、约束、化学规则和历史反馈
        prompt = compose_prompt(
            base_prompt=base_prompt,
            positive_examples=demos_pos,
            negative_examples=demos_neg,
            evolution_rules=sample(rules_R, k=6),
            output_schema="JSON + CIF"
        )

        # 3. LLM 生成候选晶体
        candidates = llm.generate(prompt, batch_size=2, temperature=0.8)

        for m in candidates:
            cif = parse_or_repair_cif(m)
            if not cif.is_valid():
                island.failure.add(m, reason="invalid CIF")
                continue

            # 4. 层级 oracle：数据库优先，OOD 时用 surrogate
            properties = predictor_f(cif)  # MP API, CGCNN, ALIGNN, etc.
            score = multi_objective_score(properties, constraints_C)

            # 5. 更新成功/失败记忆
            if satisfies_all_hard_constraints(properties, constraints_C):
                island.success.add(cif, properties, score)
                candidate_pool.add(cif)
            else:
                island.failure.add(cif, properties, score)

        update_population(island)

    return merge_success_buffers(islands)
```

##### 与 MatLLMSearch 的关系

MatLLMSearch 已经证明“LLM + 进化选择 + MLIP 评估”可以在不微调的情况下产生稳定晶体。LLEMA 可看作沿着同一路线的多目标、记忆化、规则增强版本。它把“父代结构提示”扩展为“任务约束 + 化学规则 + 成功/失败经验 + surrogate oracle”的 agentic system，并把稳定性从单一筛选指标变成每个真实应用任务都必须满足的硬约束。

与纯生成模型 CDVAE、G-SchNet、DiffCSP、MatterGen 相比，LLEMA 不依赖为每个任务重新训练生成器；与普通 LLM direct prompting 或 LLMatDesign 相比，LLEMA 的优势来自闭环反馈、反例记忆和多岛演化，而不是单步自反思。

##### 评测与限制

论文构建了 14 个应用驱动任务，包括宽带隙半导体、SAW/BAW 声学基底、高 \(k\) 介电体、固态电解质、压电能量采集、透明导体、光伏吸收体、硬涂层、硬/刚性陶瓷、航天结构材料、低密度结构和无毒钙钛矿氧化物等。所有任务都至少包含多个属性约束，并以 \(E_{\mathrm{hull}}<0.1\) eV/atom 作为稳定性判断。

主表显示，LLEMA-GPT 在多个任务上显著优于基线，例如 wide-bandgap semiconductors 的 hit-rate/stability 为 33.62/22.42，SAW/BAW acoustic substrates 为 59.88/10.74，solid-state electrolytes 为 46.17/25.37，hard stiff ceramics 为 30.99/5.73。消融实验显示：只有 memory 的 LLM 容易继续记忆数据库；去掉 surrogate 后 hit-rate 和 stability 下降到接近零；加入 domain-guided evolution 后在 hit-rate、stability 和 memorization rate 之间取得最好平衡。

论文也承认局限：评估主要依赖代理模型和 Materials Project/DFT 数据覆盖，实验合成验证有限，迭代 LLM 查询存在成本。作者用 Quantum ESPRESSO 对 150 个有效候选做补充验证，其中 144 个满足任务约束；在对 surrogate 加高斯噪声后，150 个候选中 141 个仍满足 DFT 约束，说明代理误差不会完全破坏搜索方向，但高保真验证仍是实际部署的必要步骤。

#### 🧪 练习题
```yaml
question: "LLEMA 中成功池和失败池同时进入下一轮 prompt 的主要作用是什么？"
options:
  - "让 LLM 只复制成功材料，避免生成任何新结构"
  - "同时提供高分正例和约束违反反例，帮助 LLM 学到可行区域边界并减少重复记忆"
  - "替代所有 surrogate models，不再需要物性预测"
  - "把多目标问题退化成单目标文本分类任务"
answer: 1
explain: "成功池强化可行设计模式，失败池提供负反馈和约束边界；两者与多岛采样结合，使 LLEMA 能在探索和利用之间取得平衡。"
```
