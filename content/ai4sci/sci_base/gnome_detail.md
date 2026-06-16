### GNoME

```yaml
id: gnome
name: GNoME
full_name: 材料探索图网络 (Graph Networks for Materials Exploration)
year: '2023'
org: DeepMind
paper_url: https://www.nature.com/articles/s41586-023-06735-9
category: materials_weather
parent: —
motivation: GNN预测220万新晶体等效800年知识
```

#### 📝 一句话总结

GNoME 将晶体图网络、两条候选生成管线、DFT 验证和主动学习闭环扩展到工业级规模，解决了传统晶体发现依赖人工原型替换、搜索空间巨大且 DFT 成本过高的问题。

#### 🎯 核心要点

- **两条发现管线**：结构管线从已知晶体做元素替换，组合管线从化学计量式出发并用 AIRSS 生成结构
- **图网络稳定性过滤**：把候选晶体表示为原子图，用 GNN 预测形成能或稳定性，优先把低能候选送入 DFT
- **DFT 主动学习闭环**：模型提出候选，DFT 计算能量与弛豫结果，新增标签回流到 GNoME 数据库并继续训练
- **凸包稳定性判定**：用分解能/相分离能衡量候选相对已知材料凸包的稳定性，越接近或低于凸包越值得验证
- **规模化搜索结果**：发现 2.2M 个相对先前数据库稳定的晶体，其中 381,000 个位于更新后的最终凸包
- **效率提升**：论文报告最终模型在结构管线和组合管线中的命中率随主动学习显著提升，稳定材料发现效率提高一个数量级
- **外部分布泛化**：随着训练集扩大，GNoME 对随机结构搜索产生的 out-of-domain 候选也呈现更好的能量预测泛化
- **官方数据发布**：DeepMind 发布约 381,000 个新稳定结构及更新凸包数据，后续官方仓库还扩展到超过 520,000 个接近凸包材料
- **MLIP 扩展**：论文还训练基于 NequIP 的 GNoME interatomic potential，用大规模 relaxation 数据学习能量与力，服务分子动力学和稳定性分析

#### 🔬 深入细节

##### 框架总览

![GNoME 主动学习材料发现流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-023-06735-9/MediaObjects/41586_2023_6735_Fig1_HTML.png)
*图：GNoME 用结构管线和组合管线生成候选，经图网络筛选后送入 DFT，DFT 结果再回流数据库形成主动学习数据飞轮。来源为 Nature 论文 Figure 1。*

论文来源：Nature 论文页 https://www.nature.com/articles/s41586-023-06735-9；Google DeepMind 介绍页 https://deepmind.google/blog/millions-of-new-materials-discovered-with-deep-learning/；官方数据与模型仓库 https://github.com/google-deepmind/materials_discovery。

GNoME 的核心不是单个新 GNN layer，而是一套可扩展的材料发现系统。晶体稳定性预测本质上要回答：给定组成和结构，这个材料的能量是否低到不会分解为其他已知相？直接用 DFT 对所有候选做结构弛豫和能量计算不可行，因为候选空间随着元素数、配比和原型组合急剧膨胀。GNoME 用图网络先做廉价能量估计，把 DFT 计算集中到最可能稳定的区域。

##### 核心算法伪代码

```python
# GNoME active-learning discovery loop
def gnome_discovery_loop(seed_databases, rounds):
    dataset = load_materials_project_and_oqmd(seed_databases)
    model_ensemble = train_gnome_graph_networks(dataset)
    gnome_database = []

    for r in range(rounds):
        structural_candidates = substitution_pipeline(
            stable_structures=dataset.stable_crystals,
            promote_novel_compositions=True,
        )
        composition_candidates = compositional_pipeline(
            oxidation_state_relaxation=True,
            structure_generator="AIRSS",
        )
        candidates = deduplicate_by_composition_hash(
            structural_candidates + composition_candidates
        )

        scored = []
        for crystal in candidates:
            graph = crystal_to_periodic_graph(crystal)
            energy_pred = model_ensemble.predict_formation_energy(graph)
            decomp_pred = distance_to_convex_hull(energy_pred, dataset.hull)
            scored.append((crystal, decomp_pred, model_uncertainty(crystal)))

        selected = select_low_energy_and_diverse_candidates(scored)
        dft_results = run_dft_relaxations(selected)

        dataset.add(dft_results)
        gnome_database.extend(dft_results)
        model_ensemble = train_gnome_graph_networks(dataset)

    final_hull = build_updated_convex_hull(dataset + gnome_database)
    return materials_on_or_near_hull(final_hull)
```

##### 晶体图网络如何预测稳定性

GNoME 把周期晶体表示为图。节点是原子，边连接 cutoff 内的周期近邻，边特征包含相对位移、距离或距离展开，图级全局特征承载结构级信息。官方仓库中的 GNN 实现基于 Jraph 的 `GraphsTuple`，包含 nodes、edges、senders、receivers、globals、n_node 和 n_edge；消息传递时先更新边，再把入边和出边聚合到节点，最后可更新图级全局特征。

简化的一轮 graph network 可以写成：

$$
\mathbf{e}_{ij}^{t+1}
= \phi_e(\mathbf{e}_{ij}^{t},\mathbf{h}_i^t,\mathbf{h}_j^t,\mathbf{u}^t)
$$

$$
\mathbf{m}_i^{t+1}
= \sum_{j:(j,i)\in E}\mathbf{e}_{ji}^{t+1}
$$

$$
\mathbf{h}_i^{t+1}
= \phi_v(\mathbf{h}_i^t,\mathbf{m}_i^{t+1},\mathbf{u}^t)
$$

$$
\mathbf{u}^{t+1}
= \phi_u\left(\mathbf{u}^t,\sum_i\mathbf{h}_i^{t+1},\sum_{(i,j)}\mathbf{e}_{ij}^{t+1}\right)
$$

读出层把节点或全局状态映射成结构能量。对发现任务，模型最关心的是形成能和相对凸包的距离，而不是孤立结构的绝对总能量。形成能可写作：

$$
E_f(x)=\frac{E_{\mathrm{tot}}(x)-\sum_{\alpha}n_{\alpha}\mu_{\alpha}}{\sum_{\alpha}n_{\alpha}}
$$

其中 \(n_{\alpha}\) 是元素 \(\alpha\) 的原子数，\(\mu_{\alpha}\) 是元素参考化学势。稳定性由分解能衡量：

$$
E_{\mathrm{decomp}}(x)
= E_f(x) -
\min_{\{\lambda_q\}}
\sum_q \lambda_q E_f(q)
$$

约束为 \(\sum_q \lambda_q \mathbf{c}_q=\mathbf{c}_x\)、\(\sum_q\lambda_q=1\)、\(\lambda_q\ge 0\)。如果 \(E_{\mathrm{decomp}}\le 0\)，候选在当前参考集合下位于或低于凸包；如果略高于 0，也可能因 DFT 误差或亚稳态而有合成价值。

##### 两条候选生成管线

结构管线利用材料科学中一个强先验：许多新晶体可以通过已知稳定晶体的元素替换得到。GNoME 从 Materials Project 和 OQMD 等稳定结构出发，使用替换概率和启发式规则生成新组成/新结构。论文为了鼓励探索，调整了原始替换概率模型，降低对“已知常见替换”的偏好，使高元素数和更少见组合也能进入候选池。

组合管线则从化学式空间出发。它先用放宽的氧化态约束生成可能的化学计量式，再用 AIRSS 随机结构搜索生成候选结构。这个管线比结构替换更随机、更偏 out-of-distribution，因此命中率起初较低，但它能发现不容易从已知结构原型直接替换出来的组合。两条管线互补：结构管线更高效，组合管线提供更大的探索半径。

##### 主动学习数据飞轮

GNoME 的发现效率来自闭环，而不是一次性训练。第 \(r\) 轮中，模型 \(\theta_r\) 对候选集合 \(\mathcal{C}_r\) 预测能量和稳定性，选择低分解能、高新颖性或高价值候选做 DFT：

$$
\mathcal{S}_r
= \mathrm{Select}\left(
\{x \in \mathcal{C}_r :
\hat{E}_{\mathrm{decomp},\theta_r}(x) < \tau\}
\right)
$$

DFT 返回的弛豫结构和能量标签加入训练集：

$$
\mathcal{D}_{r+1}
= \mathcal{D}_{r}
\cup
\{(x,E_{\mathrm{DFT}}(x)) : x\in \mathcal{S}_r\}
$$

再训练得到 \(\theta_{r+1}\)。随着 rounds 增加，模型不仅看到更多稳定候选，也看到大量“看起来可能稳定但 DFT 后不稳定”的负例，因此筛选边界不断改善。论文报告经过六轮主动学习，最终 ensembles 在 relaxation 后结构上的误差约为 11 meV atom\(^{-1}\)，结构管线命中率超过 80%，组合管线命中率超过 33%。

##### 训练目标与 ensemble

发现模型可以用 DFT 形成能监督训练，基本损失为：

$$
\mathcal{L}_{E}
= \frac{1}{B}\sum_{b=1}^{B}
\left(\hat{E}_{f,\theta}(x_b)-E_{f,\mathrm{DFT}}(x_b)\right)^2
$$

实际系统会使用多个模型形成 ensemble，以降低单模型偶然误差对候选选择的影响。候选选择时，预测均值用于估计稳定性，模型间分歧可作为不确定性信号；这对主动学习很关键，因为高不确定但潜在低能的候选可能扩展模型覆盖范围。

论文还训练了 GNoME interatomic potential，用于学习 relaxation trajectory 中的能量和力。该部分采用 NequIP 架构，能量由原子贡献加和：

$$
\hat{E}=\sum_{i\in N_{\mathrm{atoms}}}(\hat{\epsilon}_i\sigma+\mu)
$$

联合 Huber 损失拟合能量和力：

$$
\mathcal{L}
= \lambda_E\frac{1}{N_b}\sum_b
\mathcal{H}_{\delta_E}\left(\frac{\hat{E}_b}{N_a},\frac{E_b}{N_a}\right)
+ \lambda_F\frac{1}{N_b}\sum_b\sum_{a,\alpha}
\mathcal{H}_{\delta_F}\left(
-\frac{\partial \hat{E}_b}{\partial r_{b,a,\alpha}},
F_{b,a,\alpha}
\right)
$$

这部分说明 GNoME 数据不仅能训练静态能量筛选器，也能训练可用于分子动力学的机器学习势。

##### 与传统材料发现的区别

传统高通量材料发现通常从少量结构原型出发，做人工设计的元素替换，再对有限候选跑 DFT。瓶颈有两个：一是候选空间大到无法穷举，二是 DFT 弛豫成本太高。GNoME 把“提出候选”和“验证候选”分离：GNN 负责在巨大空间中快速排序，DFT 负责给被选候选提供高可信标签，新增标签再提升 GNN。

与单纯的一次性 surrogate model 相比，GNoME 更像搜索算法。模型错误不是终点，而会通过 DFT 反馈暴露并进入下一轮训练。最终发现的 2.2M 个稳定晶体和 381,000 个最终凸包材料，来自这种规模化闭环，而不是一次模型推理。

##### 结果如何理解

GNoME 的“稳定”是计算材料学意义上的热力学稳定：材料位于给定 DFT 设置和参考数据库构成的凸包上或附近。这不等价于一定能在实验中合成，因为真实合成还受动力学、温度、压力、缺陷和反应路径影响。论文和官方说明也把数据发布给社区用于进一步筛选、DFT 复核和实验验证。Nature 论文提到有 736 个 GNoME 结构在并行外部实验/数据库工作中得到匹配，可视为部分外部支撑，但不是对全部预测的实验确认。

> 💡 关键：GNoME 的核心机制是“GNN 筛选 + DFT 反馈 + 凸包稳定性”的主动学习飞轮。它用机器学习扩大搜索半径，用 DFT 保持物理标签可信，再把新标签转化为下一轮搜索效率。

#### 🧪 练习题

```yaml
question: "GNoME 主动学习循环中 DFT 计算的主要作用是什么？"
options:
  - "为模型筛出的候选提供高可信能量与弛豫标签，并把这些标签反馈给下一轮训练"
  - "替代图神经网络中的所有消息传递层"
  - "只用于生成 LaTeX 公式，与材料稳定性无关"
  - "把所有候选都判定为实验可合成"
answer: 0
explain: "GNoME 用 GNN 降低候选筛选成本，但稳定性标签仍依赖 DFT 验证。DFT 结果回流训练集后，模型在后续轮次中筛选更准确。"
```
