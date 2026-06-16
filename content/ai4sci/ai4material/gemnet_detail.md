### GemNet — 通用方向性图网络 (Geometric Message Passing Neural Network)

```yaml
id: gemnet
name: GemNet
full_name: "通用方向性图网络 (Geometric Message Passing NN)"
year: "2021"
org: "TU Munich"
paper_url: "https://proceedings.neurips.cc/paper/2021/hash/35cf8659cfcb13224cbd47863a34fc58-Abstract.html"
category: gnn_representation
parent: dimenet
motivation: "解决分子对称性破缺问题"
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
