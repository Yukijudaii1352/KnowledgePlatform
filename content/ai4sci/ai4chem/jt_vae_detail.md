### JT-VAE — 连接树变分自编码器

```yaml
id: jt_vae
name: JT-VAE
full_name: 连接树变分自编码器 (JT-VAE)
year: '2018'
org: MIT
paper_url: https://arxiv.org/abs/1802.04364
category: generation
parent: —
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
