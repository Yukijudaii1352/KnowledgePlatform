### GNoME — 图网络材料探索 (Graph Networks for Materials Exploration)

```yaml
id: gnome
name: GNoME
full_name: "图网络材料探索 (Graph Networks for Materials Exploration)"
year: "2023"
org: "DeepMind"
paper_url: "https://www.nature.com/articles/s41586-023-06735-9"
category: foundation_model
parent: m3gnet
motivation: "主动学习发现220万新晶体"
```

#### 📝 一句话总结

GNoME 将图神经网络能量预测、结构/成分候选生成、DFT 验证和主动学习闭环结合起来，大规模筛选无机晶体稳定性，解决了材料发现中“候选空间巨大但第一性原理计算昂贵”的核心瓶颈。

#### 🎯 核心要点

- **两条候选生成管线**：结构管线用已知晶体替换与 SAPS 生成结构候选；成分管线先筛公式，再用 AIRSS 为每个成分生成随机结构
- **图网络能量模型**：结构模型把晶体转成原子图，节点使用元素 one-hot 嵌入，消息传递 MLP 预测形成能/总能量；成分模型在没有结构时预测公式稳定性
- **主动学习数据飞轮**：GNoME 先过滤候选，DFT 对高价值候选做几何弛豫和能量计算，验证结果再加入下一轮训练与候选生成
- **六轮主动学习**：从 Materials Project 约 69k 材料起步，多轮迭代后发现 2.2M 个相对旧凸包稳定的结构，其中 381k 个进入更新后的最终凸包
- **稳定性判据**：以分解能/凸包距离衡量材料是否会分解为竞争相；主动学习过滤阶段使用约 50 meV/atom 阈值提高召回
- **不确定性与测试时增强**：结构模型使用 10 个深度集成模型、晶格体积 80% 到 120% 的 20 个缩放增强，并用中位数/IQR 稳定预测
- **实验与高保真验证**：736 个 GNoME 结构被同期实验数据库独立匹配，二元/三元候选中 84% 在 r²SCAN 复算下仍保持负分解能
- **下游势能模型数据源**：GNoME 的弛豫轨迹还能预训练 NequIP 等 MLIP，提升零样本分子动力学与离子导体筛选能力

#### 🔬 深入细节

##### 框架示意图

![GNoME 主动学习发现框架](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41586-023-06735-9/MediaObjects/41586_2023_6735_Fig1_HTML.png)
*图：GNoME Figure 1。结构/成分候选经图网络过滤后进入 DFT 计算，新的弛豫结果再回流训练集，形成材料发现数据飞轮；图源为 Nature 论文公开图片。*

##### 算法伪代码

```python
# GNoME 主动学习闭环伪代码
dataset = load_materials_project_snapshot(year=2018)  # initial DFT labels
gnn_struct = train_structural_gnn(dataset)
gnn_comp = train_compositional_gnn(dataset)
gnome_db = initialize_database(dataset)

for round_id in range(6):
    # 1. 结构管线：从已知稳定晶体出发做替换和 SAPS
    structural_candidates = generate_by_substitution(
        gnome_db.stable_structures,
        symmetry_aware_partial_substitutions=True,
    )

    # 2. 成分管线：生成化学式，再用 AIRSS 初始化随机结构
    compositions = generate_charge_balanced_or_relaxed_formulas()
    composition_scores = gnn_comp.predict(compositions)
    selected_compositions = filter_by_predicted_stability(composition_scores)
    random_structures = []
    for comp in selected_compositions:
        random_structures += AIRSS(comp, num_initial_structures=100)

    candidates = structural_candidates + random_structures

    # 3. 模型过滤：测试时缩放增强 + 深度集成不确定性
    ranked = []
    for material in candidates:
        preds = []
        for scale in linspace(0.80, 1.20, 20):
            scaled = isotropic_scale_lattice(material, scale)
            preds += [model.predict_energy(scaled) for model in gnn_struct.ensemble]
        energy_pred = median(preds)
        uncertainty = interquartile_range(preds)
        e_decomp_pred = energy_above_convex_hull(energy_pred, gnome_db)
        if e_decomp_pred <= 0.050:  # eV/atom, active-learning recall threshold
            ranked.append((material, energy_pred, uncertainty))

    # 4. DFT 验证：只对最有希望的候选做 VASP 弛豫和静态计算
    dft_results = run_vasp_relaxations(select_for_dft(ranked))

    # 5. 数据飞轮：新能量更新凸包、数据库和下一轮训练集
    gnome_db.add(dft_results)
    dataset = dataset + dft_results
    gnn_struct = train_structural_gnn(dataset)
    gnn_comp = train_compositional_gnn(dataset)

stable_final = compute_final_convex_hull(gnome_db)
```

##### 动机与背景

无机晶体的候选空间极大，稳定材料只占很小一部分。直接对所有候选做 DFT 几何弛豫不可行；只靠人类化学直觉做元素替换又会把搜索限制在已知原型附近。GNoME 的核心判断是：材料发现不应该是一次性训练一个预测器，而应该是一个能不断产生数据、验证数据、再训练模型的闭环。

论文把“稳定”定义为相对于竞争相凸包的热力学稳定。对某个结构 \(s\) 的组成 \(c\)，可以先计算形成能：

$$
E_{\mathrm{form}}(s)=E_{\mathrm{DFT}}(s)-\sum_{e} n_e\mu_e
$$

再与同一化学体系的凸包能量比较：

$$
E_{\mathrm{decomp}}(s)
=E_{\mathrm{form}}(s)-E_{\mathrm{hull}}(c)
$$

当 \(E_{\mathrm{decomp}}\le 0\) 时，结构位于凸包上或低于旧数据库凸包，代表在当前竞争相集合下不倾向于分解。GNoME 的模型目标不是直接替代 DFT 给出最终结论，而是把 DFT 预算集中到更可能稳定、更多样的候选上。

##### 图网络模型与候选过滤

结构模型把晶体表示为图：节点是原子，节点输入是元素 one-hot/嵌入，边携带邻近关系和几何信息。论文采用标准 message passing 形式，聚合函数由浅层 MLP 和 Swish 非线性构成。可抽象为：

$$
\mathbf{m}_{ij}^{(\ell)}
=\phi_e^{(\ell)}(\mathbf{h}_i^{(\ell)},\mathbf{h}_j^{(\ell)},\mathbf{e}_{ij}),
\qquad
\mathbf{h}_i^{(\ell+1)}
=\phi_v^{(\ell)}\left(\mathbf{h}_i^{(\ell)},\frac{1}{\bar{d}}\sum_{j\in\mathcal{N}(i)}\mathbf{m}_{ij}^{(\ell)}\right)
$$

其中 \(\bar{d}\) 是全数据集平均邻接度，用于归一化边到节点的消息。图级能量通常由节点贡献汇聚得到：

$$
\hat{E}(s)=\sum_{i\in s}\hat{\epsilon}_i
$$

监督信号来自 DFT 弛豫后的形成能，训练可写成能量回归目标：

$$
\mathcal{L}_{\mathrm{energy}}
=\frac{1}{B}\sum_{b=1}^{B}
\left|\frac{\hat{E}_{\mathrm{form},b}}{N_b}
-\frac{E_{\mathrm{form},b}}{N_b}\right|
$$

论文还强调了评估时的稳健性处理。结构候选往往还没有 DFT 弛豫，输入分布会偏离训练集；因此 GNoME 对同一结构做多个等比例晶格缩放，并训练 10 个图网络组成 ensemble。最终预测不简单取单模型输出，而是用集成输出的中位数作为能量估计，用四分位距近似不确定性。

##### 两条发现管线

结构管线从 Materials Project、OQMD 等数据库中的晶体出发做替换。传统替换通常一次性替换完整元素位点，容易错过部分占位或对称相关位点的组合。GNoME 引入 symmetry-aware partial substitutions (SAPS)，让替换操作尊重晶体对称性，同时允许不完全替换，从而显著扩展候选空间。论文报告在主动学习过程中结构管线累计产生超过 \(10^9\) 个候选。

成分管线先在化学式空间做更随机的探索。模型在没有结构输入时预测成分稳定性，筛出的公式再交给 AIRSS 生成随机初始结构；每个成分可初始化 100 个随机结构，然后由 DFT 弛豫得到真实能量。这条管线降低了对已知原型的依赖，尤其有利于探索多元素组合空间。

##### 主动学习闭环

每轮主动学习包含四个动作：生成候选、GNoME 过滤、DFT 验证、回流训练。DFT 计算使用 VASP、PBE/PAW 以及与 Materials Project 兼容的设置；新得到的弛豫结构和能量会更新数据库、凸包和下一轮训练集。这个闭环的实际效果体现在命中率上：结构管线和成分管线早期命中率较低，最终分别提升到超过 80% 和约 33%。

> 💡 关键：GNoME 的“模型”不只是单个 GNN，而是候选生成、稳定性预测、不确定性过滤、DFT 验证和数据库更新组成的系统。

##### 与传统材料发现方法的区别

传统高通量计算常先枚举已知原型或做人工规则替换，再把候选送入 DFT；这种方式精度可靠但探索范围窄。GNoME 用神经网络把“是否值得做 DFT”变成一个可学习的排序问题，允许在更大的候选池中保持可承受的验证成本。与单次训练的材料性质模型相比，GNoME 的核心优势来自数据飞轮：模型越好，筛到的稳定结构越多；稳定结构越多，下一轮候选和训练数据也越丰富。

论文最终给出的规模结果是：发现 2.2M 个相对旧数据库凸包稳定的结构，更新后的最终凸包中有 381k 个新稳定条目，使稳定晶体目录扩大近一个数量级。这些结果仍是计算稳定性预测，后续实验合成和性质验证是独立步骤；但 736 个结构被同期实验数据库匹配，说明模型搜索到的区域并非纯粹的数值幻觉。

#### 🧪 练习题

```yaml
question: "GNoME 主动学习闭环中，DFT 计算结果最关键的作用是什么？"
options:
  - "只用于生成论文中的可视化晶体图片"
  - "验证被模型筛出的候选，并把弛豫能量回流为下一轮训练数据和凸包更新"
  - "替代图神经网络完成所有候选的稳定性预测"
  - "只用于计算元素 one-hot 编码"
answer: 1
explain: "GNoME 的效率来自模型过滤与 DFT 验证的闭环；DFT 既确认稳定性，也提供新的监督标签，驱动后续主动学习轮次。"
```
