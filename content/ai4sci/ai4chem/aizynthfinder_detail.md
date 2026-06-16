### AiZynthFinder — 神经网络引导的开源逆合成路线搜索工具

```yaml
id: aizynthfinder
name: AiZynthFinder
full_name: "AI逆合成规划工具 (AiZynthFinder)"
year: '2020'
org: AstraZeneca
paper_url: "https://jcheminf.biomedcentral.com/articles/10.1186/s13321-020-00472-1"
category: retrosynthesis
parent: 3n_mcts
motivation: "神经网络引导MCTS，工业级多步合成规划"
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
