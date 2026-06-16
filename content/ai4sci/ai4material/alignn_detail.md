### ALIGNN — 原子线图神经网络 (Atomistic Line Graph Neural Network)

```yaml
id: alignn
name: ALIGNN
full_name: "原子线图神经网络 (Atomistic Line Graph NN)"
year: "2021"
org: NIST
paper_url: "https://www.nature.com/articles/s41524-021-00650-1"
category: gnn_representation
parent: cgcnn
motivation: "线图同时捕捉键长与键角"
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
