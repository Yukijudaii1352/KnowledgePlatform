### CoCoGraph — 分子拆解重组生成 (CoCoGraph)

```yaml
id: cocograph
name: CoCoGraph
full_name: 分子拆解重组生成 (CoCoGraph)
year: '2026.05'
org: Universitat Rovira i Virgili
paper_url: https://www.nature.com/articles/s42256-026-00987-9
category: generation
parent: —
motivation: 分子拆解重组生成820万新分子
```

#### 📝 一句话总结

CoCoGraph 提出协作式约束图扩散模型，用“双边交换”在整个扩散轨迹中保持分子式和每个原子的价态不变，从机制上保证生成分子 100% 化学有效。它把化学规则硬编码进 noising/denoising 操作，让神经网络专注学习真实分子的结构模式，并据此生成了 820 万个合成候选分子数据库。

#### 🎯 核心要点

- **约束离散图扩散**：前向噪声不是随机删边/加边，而是选择两条键并交换端点，保持每个原子度数和分子式不变
- **化学有效性由构造保证**：每一步都满足价态、连通性和键重数约束，因此生成阶段不需要再用模型参数“学习”基础化学规则
- **协作式双模型机制**：扩散模型预测下一步应撤销的 double edge swap，时间模型估计当前图距离真实分子的归一化扩散进度
- **自适应去噪进度**：采样时用时间模型预测的进度替代固定时间步，并从整条轨迹中选择预测时间最小的分子作为输出
- **轻量 GNN 架构**：BASE 版约 53.4 万参数，FPS 版加入 Morgan fingerprint 后约 440 万参数，仍少于多数基线
- **GuacaMol 基准表现**：BASE/FPS 均达到 100% validity 和 99.9% uniqueness，FPS 的 KL divergence score 达 96.7%，优于 DiGress 和 JTVAE
- **大规模生成与专家测试**：生成 820 万个合成分子，冗余率约 7.1%；121 名有机化学受试者识别真实分子的总体准确率约 62%
- **当前不是目标性质生成器**：论文明确说明 CoCoGraph 现阶段主要生成“合理分子”，尚不能直接按用户指定性质优化

#### 🔬 深入细节

##### 论文与图示来源说明

任务给定的 Nature URL `s42256-026-00987-9` 未能稳定对应到可访问论文正文；可公开访问的论文与 PDF 指向题为 *A collaborative constrained graph diffusion model for the generation of realistic synthetic molecules* 的 Nature Machine Intelligence 文章，DOI 为 `10.1038/s42256-026-01229-5`，arXiv 版本为 https://arxiv.org/html/2505.16365v1。以下方法解读基于该 arXiv HTML、Nature PDF 公开文本和 URV/EurekAlert 新闻稿，YAML 中仍保留任务提供的原始 `paper_url`。

![CoCoGraph 协作约束图扩散示意图](https://arxiv.org/html/2505.16365v1/x1.png)
*图：CoCoGraph 的整体流程。前向过程通过 double edge swapping 扰乱真实分子；反向过程由扩散模型预测要撤销的换边操作，由时间模型估计当前图的去噪进度；采样时从随机有效图出发，沿协作去噪轨迹生成分子。*

##### 算法核心流程

```python
# CoCoGraph 训练与采样伪代码
for molecule in molecular_dataset:
    G0 = mol_to_explicit_hydrogen_graph(molecule)
    trajectory = [G0]

    # 1. 前向 noising：只执行可行 double edge swap
    for t in range(T(G0)):
        candidates = feasible_des_quadruplets(trajectory[-1])
        i, j, k, l = random_choice(candidates)
        Gt = swap_edges(trajectory[-1], remove=[(i, j), (k, l)], add=[(i, k), (j, l)])
        trajectory.append(Gt)

    # 2. 训练扩散模型：预测反向要撤销的 DES、成键概率、断键概率
    for t, Gt in enumerate(trajectory[1:], start=1):
        target_swap = inverse_swap_that_returns_to(trajectory[t - 1])
        q_logits, p_form, p_break = diffusion_model(Gt, t / T(G0))
        loss_des = bce(q_logits, target_swap)
        loss_form = bce(p_form, edges_to_form_against_G0)
        loss_break = bce(p_break, edges_to_break_against_G0)

        # 3. 训练时间模型：估计当前图离真实分子还有多远
        t_pred = time_model(Gt)
        loss_time = mse(t_pred, t / T(G0))

        optimize(loss_des + loss_form + loss_break + loss_time)

# 采样：给定分子式/度序列，从随机有效图开始
G = sample_valid_graph_with_formula(formula)
best_G, best_tau = G, 1.0
for step in range(max_steps):
    tau = time_model(G)
    q = diffusion_model(G, tau)
    swap = sample_feasible_des(q, G)
    G = apply_des(G, swap)
    if time_model(G) < best_tau:
        best_G, best_tau = G, time_model(G)
return best_G
```

##### 动机与背景

分子图生成的核心难点是离散化学约束非常硬：碳、氮、氧、卤素等元素有特定价态，键重数不能任意增加，图还要保持连通。普通图扩散模型在前向过程里随机扰乱节点和边，反向模型需要同时学会“真实分子长什么样”和“哪些图根本不是分子”。这会浪费大量容量，并且生成后常要靠 RDKit 过滤无效结构。

CoCoGraph 的设计更像把化学空间本身作为生成域：扩散轨迹从头到尾都限制在固定分子式和固定度序列的图空间里。模型不再学习“碳最多几价”这类规则，而是学习在合法图空间中，哪些换边路径更可能回到真实分子分布。

##### 双边交换如何保证价态

前向 noising 的基本操作是 double edge swap (DES)。给定当前分子图 \(G_t\)，选择两条存在的边：

$$
e_1=(i,j), \qquad e_2=(k,l)
$$

然后删除它们，并创建交叉连接：

$$
(i,j),(k,l) \rightarrow (i,k),(j,l)
$$

每个参与原子都失去一条键并得到一条新键，因此原子度数不变；节点集合不变，因此分子式不变；若同时限制新键不超过三键并保持图连通，则每一步都仍是化学可行图。论文把可行操作写成：

$$
[Q_t]_{ijkl}
= \frac{F_t(i,j,k,l)}
{\sum_{i',j',k',l'} F_t(i',j',k',l')}
$$

其中：

$$
F_t(i,j,k,l)=
\begin{cases}
1, & \text{若删除 }(i,j),(k,l)\text{ 并创建 }(i,k),(j,l)\text{ 后仍为有效分子图}\\
0, & \text{否则}
\end{cases}
$$

这个 \(Q_t\) 不是固定转移矩阵，因为哪些 DES 可行取决于当前图 \(G_t\)。反复执行 DES 后，图会逐渐走向具有固定度序列的最大熵 Molloy-Reed 分布，类似“保持原子价态不变的随机化”。

> 💡 **关键：** CoCoGraph 的有效性来自采样空间约束，而不是事后过滤。只要初始图有效且每次 DES 可行，轨迹中的所有图都保留分子式、原子价态和连通性。

##### 协作式 denoising：扩散模型 + 时间模型

反向生成需要选择哪个 DES 能让当前图更像真实分子。CoCoGraph 的扩散模型学习三个概率：

$$
[Q_t^{-1}]_{ijkl}
= \Pr_{\theta,\theta_f,\theta_b}
\big(\text{select }(i,j)\ \&\ (k,l)\mid G_t,t\big)
$$

$$
[P_t^{\text{form}}]_{ij}
= \Pr_{\theta,\theta_f}\big((i,j)\text{ exists}\mid G_t,t\big)
$$

$$
[P_t^{\text{break}}]_{ij}
= \Pr_{\theta,\theta_b}\big((i,j)\text{ does not exist}\mid G_t,t\big)
$$

对应损失是 DES 选择、成键、断键三个二元交叉熵。例如 DES 目标：

$$
\mathcal{L}_{\text{BCE-DES}}
= -\frac{1}{N_q}
\sum_{(i,j,k,l)}
\left[
y_{ijkl}^{t-1}\log [Q_t^{-1}]_{ijkl}
+ (1-y_{ijkl}^{t-1})\log(1-[Q_t^{-1}]_{ijkl})
\right]
$$

时间模型输入当前分子图、节点特征、边特征和图特征，输出 \(t_{\text{pred}}\in[0,1]\)，损失为：

$$
\mathcal{L}_{\text{MSE}}
= (t_{\text{pred}}-t_{\text{real}})^2
$$

论文发现不同分子随机化速度差别很大，固定时间步不能准确反映“当前图离真实分子有多远”。时间模型因此在采样时为扩散模型提供更真实的进度信号，并在生成结束时选择整条轨迹中 \(t_{\text{pred}}\) 最小的图作为输出，而不是盲目取最后一步。

##### 模型架构与数据

BASE 版 CoCoGraph 使用 EnhancedGINE 消息传递层。扩散模型先处理节点、边、图级特征和时间，再对节点对组合进行预测：一个 feed-forward head 预测形成边的概率，另一个预测断开边的概率，外部再组合成 DES 选择概率。时间模型共享类似 GNN 主干，但把节点嵌入平均池化成图嵌入，再输出一个标量时间。

FPS 版在 BASE 上加入 2048 维 Morgan fingerprint，经 1024/512/256 维前馈网络压缩后与图嵌入拼接。这样模型能显式感知子结构模式，参数量从 BASE 的约 53.4 万增加到约 440 万，但仍少于 JTVAE、DiGress 等常见基线。

训练数据来自 PubChem、ChEMBL、ZINC、NIST 等数据库的 curated 分子。作者先用 RDKit canonicalize 和去重，再把 SMILES 转成显式氢分子图，并限制分子大小在 5-70 个原子；过滤后训练集规模约 167 万个分子。

##### 结果与意义

在 GuacaMol 分布学习基准上，CoCoGraph BASE 和 FPS 都达到 100% validity、99.9% uniqueness，novelty 分别约 98.6% 和 98.5%。FPS 的 KL divergence score 为 96.7%，高于 DiGress 的 92.6% 和 JTVAE 的 47.3%。在额外 36 个 RDKit 描述符上，FPS 版对 DiGress 赢 23/36，对 JTVAE 赢 33/36，说明它不是只在标准 GuacaMol 指标上调优。

由于模型轻量，作者生成了 820 万个合成分子，冗余率约 7.1%，并进行了专家“图灵测试”：121 名具有有机化学背景的参与者在真实/生成分子二选一中总体正确率约 62%；无硕博层级训练者约 59%。这不能证明生成分子完全不可区分，但说明很多候选分子对人类化学直觉已经相当可信。

##### 局限性

CoCoGraph 每条扩散轨迹固定分子式和度序列。如果任务本身要求同时搜索分子式，就需要先有一个 formula seeding 过程。DES 还带来 \(O(n^4)\) 的候选四元组复杂度，尽管当前实现能在中端 GPU 上生成最多 70 原子的分子，但更大分子需要更高效的候选筛选。最后，CoCoGraph 还不是条件性质优化模型；论文把“按目标性质生成分子”列为后续方向。

#### 🧪 练习题

```yaml
question: "CoCoGraph 为什么能在生成过程中保持 100% 化学有效性？"
options:
  - "因为生成后用 RDKit 删除所有无效分子"
  - "因为 double edge swap 每步保持节点集合和每个原子的度数，并只允许满足价态/连通性约束的交换"
  - "因为模型只复制训练集中的真实分子"
  - "因为时间模型直接预测分子的药物活性"
answer: 1
explain: "DES 让每个参与原子失去一条键又得到一条键，分子式和价态不变；再加上可行性约束，轨迹始终位于有效分子图空间。"
```
