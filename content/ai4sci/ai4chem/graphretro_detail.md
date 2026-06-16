### GraphRetro — 先预测合子再补全离去基的图半模板逆合成

```yaml
id: graphretro
name: GraphRetro
full_name: "图半模板逆合成 (GraphRetro)"
year: '2021'
org: Tsinghua University
paper_url: "https://arxiv.org/abs/2006.15426"
category: retrosynthesis
parent: 3n_mcts
motivation: "先预测合子再补全，提升复杂分子预测精度"
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
