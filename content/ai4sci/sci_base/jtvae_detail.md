### JT-VAE

```yaml
id: jtvae
name: JT-VAE
full_name: 联结树变分自编码器 (Junction Tree VAE)
year: '2018'
org: MIT
paper_url: https://arxiv.org/abs/1802.04364
category: molecular
parent: —
motivation: 基于分子子结构的可解释生成模型
```

#### 📝 一句话总结

JT-VAE 提出了先生成分子子结构联结树、再组装成完整分子图的变分自编码器，解决了 SMILES 字符串生成不平滑和逐原子图生成容易产生化学无效中间态的问题。

#### 🎯 核心要点

- **两阶段分子生成**：先解码 junction tree 作为粗粒度骨架，再用图解码器决定子结构之间的具体连接方式
- **子结构词表**：将环、键、单原子等有效化学片段作为 cluster label，避免从非法的单个芳香键等中间状态开始构造
- **双潜变量表示**：用 \(z_T\) 编码树结构和子结构类型，用 \(z_G\) 编码完整分子图的细粒度连接
- **Tree Encoder**：在 junction tree 上做上下行消息传递，获得用于树解码和图组装的上下文表示
- **Graph Encoder**：在原子-键图上做 loopy message passing，捕捉局部化学连接与原子环境
- **Tree Decoder**：按深度优先顺序递归生成树节点，分别预测是否扩展子节点和新节点的 cluster label
- **Graph Decoder/Assembly**：枚举并打分相邻 cluster 的合法拼接方案，逐个局部组装完整分子图
- **化学有效性约束**：解码时屏蔽与当前邻域不兼容的 cluster label 或拼接方式，提高 prior sampling 的有效率

#### 🔬 深入细节

##### 方法总览

![JT-VAE 分子图与联结树双表示](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/paradigm.png)
*图：JT-VAE 将分子图分解为 junction tree，分别编码树与图，再先重建树骨架、后组装完整分子。来源为论文 ar5iv 页面 Figure 3。*

论文来源：arXiv 论文页 https://arxiv.org/abs/1802.04364；PMLR PDF https://proceedings.mlr.press/v80/jin18a/jin18a.pdf；官方实现 https://github.com/wengong-jin/icml18-jtnn；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1802.04364。

分子生成的难点在于输出空间同时有图结构约束和化学价态约束。早期 VAE 常生成 SMILES 字符串，但两个结构相近的分子可能有差异很大的规范 SMILES，导致潜空间不平滑；同时，字符串语法合法也不等于化学合法。直接逐原子生成图也有问题：例如芳香环单独拆成一个个键时，中间结构往往不满足化学规则。

JT-VAE 的核心思想是引入化学上有效的子结构作为生成单位。一个分子先被分解为多个 cluster，例如环、非环键、单原子等；这些 cluster 组成满足 running intersection property 的 junction tree。模型先生成这棵树，保证粗粒度骨架由有效片段构成，再解决片段之间如何共享原子或键的细粒度组装问题。

##### 联结树分解

给定分子图 \(G=(V,E)\)，junction tree \(T=(\mathcal{C},\mathcal{E})\) 的每个节点 \(C_i \in \mathcal{C}\) 是 \(G\) 的一个诱导子图或原子集合。它需要满足两个条件：

$$\bigcup_i C_i = V$$

以及 running intersection property：若某个原子同时出现在 \(C_i\) 和 \(C_j\)，则在树上 \(C_i\) 到 \(C_j\) 路径中的所有 cluster 都必须包含该原子。

论文的分解过程针对分子做了简化：先找出所有简单环和不属于环的键；若两个环共享超过两个原子，则将其合并为 bridged ring cluster；再构造 cluster graph 并取最大生成树作为 junction tree。由于任意两个相邻 cluster 最多共享两个原子，后续组装的候选数量可以被有效控制。

##### 核心算法伪代码

```python
# JT-VAE training and sampling sketch
def encode_molecule(G):
    T = tree_decomposition(G)
    z_G = graph_encoder(G)  # loopy message passing on atoms and bonds
    z_T = tree_encoder(T)   # bottom-up and top-down message passing on clusters
    return q_mu_logvar(z_T, z_G)

def decode_molecule(z_T, z_G):
    T_hat = sample_tree_depth_first(z_T)
    for node in depth_first_order(T_hat):
        # enumerate chemically feasible attachments between this cluster and neighbors
        candidates = enumerate_valid_assemblies(node, T_hat)
        scores = [graph_assembly_score(c, z_G, tree_context=T_hat) for c in candidates]
        choose_or_sample_best_candidate(candidates, scores)
    return assembled_molecular_graph(T_hat)

def train_step(G):
    mu_T, logvar_T, mu_G, logvar_G = encode_molecule(G)
    z_T, z_G = reparameterize(mu_T, logvar_T), reparameterize(mu_G, logvar_G)
    tree_loss = teacher_forced_tree_decode_loss(z_T, ground_truth_tree(G))
    graph_loss = teacher_forced_assembly_loss(z_G, ground_truth_graph=G)
    kl = kl_normal(mu_T, logvar_T) + kl_normal(mu_G, logvar_G)
    return tree_loss + graph_loss + beta * kl
```

##### Graph Encoder 与 Tree Encoder

Graph Encoder 在原子图上做消息传递。对有向边 \((u,v)\)，第 \(t\) 轮消息可抽象为：

$$\nu_{uv}^{(t)}
= \tau\!\left(W_1x_u + W_2x_{uv} + W_3\sum_{w \in N(u)\setminus v}\nu_{wu}^{(t-1)}\right)$$

其中 \(x_u\) 是原子特征，\(x_{uv}\) 是键特征，\(\tau\) 通常为 ReLU。经过多轮后，节点表示聚合进入图级表示 \(h_G\)，再由两个仿射层得到变分后验参数：

$$q_\phi(z_G \mid G) = \mathcal{N}(\mu_G(G), \mathrm{diag}(\sigma_G^2(G)))$$

Tree Encoder 在 junction tree 上传递 cluster 消息。每个 cluster 节点用其子结构标签 one-hot 表示。由于树没有环，消息按调度传播：先从叶子到底部向根汇聚，再从根向叶子广播。论文使用树形 GRU，使每个 cluster 的表示含有其子树和全树上下文。

两个编码器分工明确：\(z_T\) 负责“有哪些子结构、骨架怎么连”，\(z_G\) 负责“这些子结构具体如何共享原子和键”。这种拆分比单一潜变量更贴合分子生成的层次结构。

##### Tree Decoder：先生成可解释骨架

Tree Decoder 从 \(z_T\) 出发，以深度优先顺序递归生成 junction tree。每访问一个节点 \(i\)，模型先预测是否继续扩展子节点：

$$p_t = \sigma(f_{\mathrm{topo}}(h_i, z_T, m_i))$$

若决定扩展，则预测新子节点的 cluster label：

$$p_{\ell} = \mathrm{softmax}(f_{\mathrm{label}}(h_i, z_T, m_i))$$

训练时用 teacher forcing，将真实拓扑动作和真实标签喂给下一步，树解码损失为拓扑二分类交叉熵与标签多分类交叉熵之和：

$$\mathcal{L}_{\mathrm{tree}}
= \sum_t \mathrm{CE}(a_t, \hat{a}_t)
+ \sum_t \mathrm{CE}(\ell_t, \hat{\ell}_t)$$

采样时还会构造与当前邻域化学兼容的标签集合，并对不合法标签做 mask。这使模型不只是“事后检查”分子是否合法，而是在生成过程中尽量避免走入不可实现的树骨架。

##### Graph Decoder：组装 cluster 到完整分子

同一棵 junction tree 可能对应多个分子，因为相邻子结构可以用不同原子共享方式连接。Graph Decoder 将完整图生成写成结构化预测：

$$G^* = \arg\max_{G \in \mathcal{G}(T)} f(G)$$

其中 \(\mathcal{G}(T)\) 是与树 \(T\) 一致的候选分子集合。为了降低复杂度，论文不是全局枚举所有分子，而是按树解码顺序逐个 cluster 处理局部邻域：对当前 cluster 与相邻 cluster 的拼接方式进行枚举，过滤价态或结构不合法的候选，再用图消息传递网络给候选子图打分。

候选 \(c\) 的概率可以写作：

$$p(c \mid z_G, T) =
\frac{\exp(s(c, z_G, T))}
{\sum_{c' \in \mathcal{A}(i)} \exp(s(c', z_G, T))}$$

对应训练损失为正确拼接候选的交叉熵：

$$\mathcal{L}_{\mathrm{graph}}
= -\sum_i \log p(c_i^\star \mid z_G, T)$$

这个局部组装策略的优势是可解释且高效：树控制“模块级结构”，图解码器只在局部决定共享原子/键方式。论文指出，在 ZINC 标准药物分子数据上，经过化学剪枝和同构合并后，平均候选数可控，整体复杂度近似随 cluster 数线性增长。

##### VAE 目标与分子优化

JT-VAE 使用标准 VAE 的重参数化采样：

$$z_T = \mu_T + \sigma_T \odot \epsilon_T,\quad z_G = \mu_G + \sigma_G \odot \epsilon_G,\quad \epsilon \sim \mathcal{N}(0,I)$$

总体目标由重建损失和 KL 正则组成：

$$\mathcal{L}
= \mathcal{L}_{\mathrm{tree}}
+ \mathcal{L}_{\mathrm{graph}}
+ \beta\left[
D_{\mathrm{KL}}(q_\phi(z_T\mid G)\|p(z_T))
+ D_{\mathrm{KL}}(q_\phi(z_G\mid G)\|p(z_G))
\right]$$

得到连续潜空间后，可以在 \(z=[z_T,z_G]\) 上训练属性预测器并做贝叶斯优化或梯度优化，再将优化后的潜变量解码回分子。这正是 JT-VAE 相比纯规则生成器的重要价值：它把离散化学结构搜索转化为相对平滑的连续空间搜索，同时尽量保持解码有效性。

##### 与 SMILES VAE 和逐原子图生成的区别

SMILES VAE 的主要瓶颈是表示层面不稳定：同一类结构可能对应差异很大的字符串，潜空间相邻不一定意味着化学相似。逐原子图生成虽然避开字符串，但在构造环、芳香体系和多键结构时会频繁经过非法中间态。JT-VAE 的折中方案是“先结构块、后原子级组装”：用有效子结构提高生成合法性，用图组装保留分子连接的细节。

> 💡 关键：JT-VAE 并不是简单把图 VAE 换成树 VAE，而是把分子生成拆成两个难度更可控的问题：生成有效子结构骨架，以及在骨架约束下选择化学合法的局部拼接。

#### 🧪 练习题

```yaml
question: "JT-VAE 先生成 junction tree 再组装分子图的主要目的是什么？"
options:
  - "把所有分子都强制转换成线性 SMILES 字符串"
  - "先使用有效化学子结构构造骨架，减少非法中间态并提升生成有效性"
  - "避免使用任何图神经网络编码分子"
  - "让模型只预测分子性质而不生成分子"
answer: 1
explain: "junction tree 的节点是环、键等有效子结构。先生成这些结构块的树骨架，再枚举合法拼接方式，可以避免逐原子生成中常见的化学无效中间态。"
```
