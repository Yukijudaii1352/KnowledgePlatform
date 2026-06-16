### CoCoGraph — 约束协作图扩散

```yaml
id: cocograph
name: CoCoGraph
full_name: 约束协作图扩散 (CoCoGraph)
year: '2026.05'
org: Universitat Rovira i Virgili
paper_url: https://www.thebrighterside.news/post/new-ai-tool-can-generate-millions-of-new-molecules
category: generation
parent: edm
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
