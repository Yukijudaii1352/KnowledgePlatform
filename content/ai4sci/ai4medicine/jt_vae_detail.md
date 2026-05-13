### 连接树变分自编码器 (Junction Tree VAE)

```yaml
id: jt_vae
name: JT-VAE
full_name: 连接树变分自编码器 (Junction Tree VAE)
year: 2018
org: MIT
paper_url: https://arxiv.org/abs/1802.04364
category: generation
parent: chemical_vae
motivation: 连接树分解保证100%生成有效性
```

#### 📝 一句话总结

JT-VAE 提出将分子图分解为由化学子结构（环、键、原子）组成的连接树（Junction Tree），通过"先生成树骨架、再组装分子图"的两阶段粗到细策略，从根本上保证了生成分子 100% 的化学有效性，显著优于基于 SMILES 字符串和逐原子生成的方法。

#### 🎯 核心要点

- **连接树分解**：将分子图分解为子结构（环、化学键、原子）组成的树结构，子结构词表大小约 780（基于 250K ZINC 数据集）
- **双潜变量设计**：潜向量 \(\mathbf{z} = [\mathbf{z}_T, \mathbf{z}_G]\) 分别编码树拓扑结构和图连接方式
- **两阶段生成**：先由 Tree Decoder 生成连接树骨架 \(\hat{\mathcal{T}}\)，再由 Graph Decoder 将子结构组装为完整分子图 \(\hat{G}\)
- **图编码器**：基于 Loopy Belief Propagation 的消息传递网络编码分子图
- **树编码器**：基于 GRU 的双向（自底向上 + 自顶向下）树消息传递网络编码连接树
- **树解码器**：深度优先逐节点生成，每步同时预测拓扑（是否扩展）和标签（子结构类型）
- **图解码器**：在每个树节点处枚举候选子图并评分，选择最优组装方式
- **100% 有效性**：生成过程中每一步都保持化学有效性，无需后处理验证
- **三项评估任务**：分子重建（76.7%）、贝叶斯优化（penalized logP 最优）、约束分子优化（新任务）

#### 🔬 深入细节

![JT-VAE 整体框架](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x1.png)
*图 1：JT-VAE 的编码-解码流程。左侧为编码过程：分子图 G 和其连接树 T 分别通过图编码器和树编码器映射到潜空间；右侧为解码过程：先从 z_T 生成连接树骨架，再从 z_G 和树骨架组装完整分子图。*

![连接树分解示例](https://ar5iv.labs.arxiv.org/html/1802.04364/assets/x2.png)
*图 2：分子图的连接树分解。分子被拆解为环（蓝色）、化学键和原子等子结构，这些子结构构成树的节点，相邻子结构间共享原子形成树的边。*

```python
# JT-VAE 生成流程伪代码
def jt_vae_generate(z_T, z_G):
    """两阶段分子生成"""
    # ===== 阶段一：生成连接树骨架 =====
    # 从根节点开始，深度优先逐节点生成
    root = predict_label(z_T)          # 预测根节点子结构类型
    stack = [root]
    tree = JunctionTree(root)
    
    while stack:
        node_i = stack[-1]
        # 拓扑预测：是否向当前节点添加子节点
        expand = predict_topology(h_i, z_T)  # sigmoid → {0, 1}
        if expand:
            label_j = predict_label(h_i, z_T)  # softmax over vocabulary
            node_j = tree.add_child(node_i, label_j)
            stack.append(node_j)       # 深度优先：继续扩展
        else:
            stack.pop()                # 回溯到父节点
    
    # ===== 阶段二：组装分子图 =====
    molecule = Graph()
    for node_i in tree.nodes_in_order():
        # 枚举当前节点子结构与已有子图的所有合法组装方式
        candidates = enumerate_subgraphs(node_i, molecule)
        # 用消息传递网络对每个候选评分，选最优
        scores = [score_candidate(c, z_G, tree_messages) for c in candidates]
        best = candidates[argmax(scores)]
        molecule.merge(best)
    
    return molecule  # 保证化学有效性
```

**动机与背景：为什么需要 JT-VAE？**

在 JT-VAE 之前，分子生成主要基于 SMILES 字符串。Character VAE（CVAE）逐字符生成 SMILES，但大量生成结果不是合法的化学式（有效率仅 0.7%）。Grammar VAE（GVAE）引入上下文无关文法约束，将有效率提升到 7.2%，SD-VAE 进一步加入语义约束达到 43.5%，但这些方法仍然无法完全保证化学有效性。另一类方法如 GraphVAE 直接预测邻接矩阵，或逐原子生成分子图，但它们在生成中间状态时会经过化学无效的构型（如原子价态不满足），有效率仅达 89.2%。JT-VAE 的核心洞察是：**如果用化学上合法的子结构（环、键）作为构建单元，而非单个原子，则生成过程中的每一步都天然保持化学有效性**。这就是连接树分解的动机——将分子图分解为一棵由合法子结构组成的树。

**核心机制：连接树分解与双编码器**

连接树分解（Junction Tree Decomposition）是图论中的经典概念。对于分子图 \(G = (V, E)\)，其连接树 \(\mathcal{T}_G = (\mathcal{V}, \mathcal{E})\) 满足：(1) 每个节点 \(C_i \in \mathcal{V}\) 是 \(G\) 的一个子图（称为"簇"），所有簇的并集覆盖 \(G\) 的全部边；(2) 对于 \(G\) 中任意节点 \(v\)，包含 \(v\) 的所有簇在 \(\mathcal{T}_G\) 中构成连通子树（running intersection property）。在化学场景中，簇就是环结构、化学键或单个原子，词表大小约 780。编码端，**图编码器**采用 Loopy Belief Propagation 风格的消息传递：

$$\boldsymbol{\nu}_{uv}^{(t)} = \tau\left(\mathbf{W}_1^g \mathbf{x}_u + \mathbf{W}_2^g \mathbf{x}_{uv} + \mathbf{W}_3^g \sum_{w \in N(u) \setminus v} \boldsymbol{\nu}_{wu}^{(t-1)}\right)$$

经过 \(T\) 轮迭代后，对所有节点隐向量取平均得到图表示 \(\mathbf{h}_G\)，再映射为 \(\mathbf{z}_G\)。**树编码器**则采用 GRU 驱动的双向消息传递——先自底向上（叶→根），再自顶向下（根→叶），消息更新为：

$$\mathbf{m}_{ij} = \text{GRU}(\mathbf{x}_i, \{\mathbf{m}_{ki}\}_{k \in N(i) \setminus j})$$

树的最终表示取根节点隐向量 \(\mathbf{h}_{\mathcal{T}} = \mathbf{h}_{\text{root}}\)（不做平均池化，因为解码器需要知道从哪个节点开始生成），映射为 \(\mathbf{z}_T\)。

> 💡 **关键设计**：图编码器用平均池化（因为图无根），树编码器用根节点表示（因为解码是从根开始的深度优先过程）。这种不对称设计确保了编码-解码的一致性。

**解码流程：从树到图的粗到细生成**

解码分两步。**树解码器**从根节点开始，按深度优先顺序逐步扩展连接树。在每个节点 \(i\)，模型做两个决策：(1) **拓扑预测**——是否添加新的子节点，通过 \(\sigma(\mathbf{u}^d \cdot \tau(\mathbf{W}_1^d \mathbf{h}_i + \mathbf{W}_2^d \mathbf{h}_{ij} + \mathbf{W}_3^d \mathbf{z}_T))\) 计算概率；(2) **标签预测**——新节点的子结构类型，通过 softmax 在词表上选择。每生成一个新节点后，模型立即对该节点执行消息传递更新，将信息传播回已生成的树结构中，这种"即时传播"机制让后续决策能感知全局上下文。

**图解码器**负责将连接树中的子结构组装为完整分子图。核心挑战在于：两个相邻子结构可能有多种合法的连接方式（例如两个环可以共享不同的原子对）。图解码器按树的拓扑顺序，在每个节点处枚举所有候选子图 \(\mathcal{G}_i\)，用增强了树消息的消息传递网络对每个候选评分：

$$f^a(G_i) = \sum_{(u,v) \in E_i} \mathbf{s}^a \cdot \tau(\mathbf{W}^a [\boldsymbol{\mu}_u, \boldsymbol{\mu}_v])$$

由于连接树分解的性质，任意两个相邻簇最多共享两个原子，因此候选数平均仅约 4 个，计算复杂度关于簇数量线性增长。

> ⚠️ **注意**：训练时使用 teacher forcing（输入真实树结构），但测试时树解码器的输出直接传给图解码器，形成完全自回归的生成流程。

**实验结果与方法对比**

在 ZINC 250K 数据集上，JT-VAE 在三项任务中均表现优异：(1) **分子重建**准确率 76.7%，与 SD-VAE（76.2%）持平，远超 CVAE（44.6%）和 GVAE（53.7%）；(2) **先验采样有效率 100%**，而逐原子生成方法仅 89.2%，SMILES 方法更低；(3) **贝叶斯优化**发现的最优分子 penalized logP 达 5.68，优于所有基线；(4) 论文还首次提出**约束分子优化**任务——在保持与原始分子相似度 ≥ 0.4 的前提下优化目标属性，JT-VAE 的成功率达 83.6%。与传统 SMILES 方法的根本区别在于：JT-VAE 直接在分子图空间操作，用子结构级别的构建块替代字符/原子级别的生成，从架构层面消除了无效分子的可能性。

#### 🧪 练习题

```yaml
question: "JT-VAE 能够保证 100% 生成有效分子的根本原因是什么？"
options:
  - "使用了更大的训练数据集和更深的神经网络"
  - "在解码后添加了 RDKit 有效性过滤器"
  - "以化学合法的子结构（环、键）为构建单元，生成过程中每步都保持有效性"
  - "采用了强化学习奖励信号来惩罚无效分子"
answer: 2
explain: "JT-VAE 的核心设计是将分子分解为化学合法的子结构词表，生成时以这些子结构为最小单元进行组装，因此每一步中间状态都是化学有效的，无需额外的后处理验证。"
```