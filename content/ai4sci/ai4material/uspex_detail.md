### USPEX — 通用结构预测演化算法 (Universal Structure Predictor: Evolutionary Xtallography)

```yaml
id: uspex
name: USPEX
full_name: "通用结构预测演化算法 (Universal Structure Predictor: Evolutionary Xtallography)"
year: "2006"
org: "Oganov Group"
paper_url: "https://uspex-team.org/en/uspex/overview"
category: structure_prediction
parent: "—"
motivation: "遗传算法全局搜索能量最低点"
```

#### 📝 一句话总结

USPEX 将晶体结构预测表述为自由能/焓面的全局优化问题，用“局域弛豫 + 适应度选择 + 遗传/变异/置换算子”在只给定化学组成的条件下搜索稳定和亚稳结构。

#### 🎯 核心要点

- **目标函数**：以局域优化后结构的负自由能/负焓作为适应度，低能结构更可能成为下一代父代
- **种群式搜索**：每一代由若干候选晶体结构组成，初代可随机生成或使用用户提供 seed，后续代由变异算子生成
- **局域优化嵌入全流程**：每个候选结构在进入种群前都要经过 DFT 或经验势局域弛豫，搜索空间从原始构型空间收缩到局域极小点集合
- **三类早期核心算子**：heredity 组合父代空间片段，mutation 扭曲晶格/扰动原子，permutation 交换不同元素原子以优化占位
- **约束和体积自适应**：用最小原子间距、晶胞角范围、最小晶格矢量长度等硬约束过滤病态结构，并根据优良个体动态调整候选体积
- **精英保留**：新一代从 offspring 与上一代保留优良个体中选取最佳结构，兼顾探索和利用
- **软件生态**：官方版本可对接 VASP、SIESTA、Quantum ESPRESSO、GULP、CP2K、LAMMPS 等能量计算后端，并扩展到纳米粒子、表面、界面、二维晶体、分子晶体和变组成搜索

#### 🔬 深入细节

##### 图示与来源说明

![USPEX 搜索效率示意](https://uspex-team.org/static/img/uspex-video-1.gif)
*图：USPEX 官方 overview 中的 MgSiO3 post-perovskite 搜索示例。官方说明中，随机局域优化在大量尝试后仍未找到正确结构，而 USPEX 演化搜索在更少步数内收敛到稳定结构。*

> 来源说明：给定 `paper_url` 是 USPEX 项目页而非单篇论文。这里的方法细节主要追溯到 Glass, Oganov & Hansen 2006 CPC 论文（官方 PDF: https://uspex-team.org/static/file/CPC-USPEX-2006.pdf）以及 USPEX 官方 overview 和 2025 manual。

##### 算法伪代码

```python
# USPEX 固定组成晶体结构预测伪代码
population = initialize_random_or_seed_structures(composition)
population = [local_relax(x) for x in population if hard_constraints(x)]
fitness = {-enthalpy_or_free_energy(x): x for x in population}
V_uc = estimate_initial_cell_volume(population)

while not converged(population):
    offspring = []

    for operator, ratio in operator_percentages.items():
        while count_from(operator, offspring) < ratio * population_size:
            parents = rank_based_select(population, fitness)

            if operator == "heredity":
                child = splice_spatial_slabs(parents[0], parents[1])
                child.lattice = weighted_average_lattice(parents[0], parents[1])
            elif operator == "mutation":
                child = strain_lattice_and_perturb_atoms(parents[0])
            elif operator == "permutation":
                child = swap_different_atom_types(parents[0])
            else:
                child = random_structure(composition)

            child = scale_to_volume(child, V_uc)
            if hard_constraints(child):
                child = local_relax(child)
                offspring.append(child)

    fitness_offspring = evaluate_by_ab_initio_or_forcefield(offspring)
    population = elitist_environmental_selection(
        parents=population,
        offspring=offspring,
        parent_fitness=fitness,
        offspring_fitness=fitness_offspring,
    )
    V_uc = adapt_volume_from_best_structures(population)
```

##### 动机与背景

晶体结构预测的输入通常只有化学组成、压力和温度条件，输出却是晶格参数、原子坐标和元素占位。若单胞含 \(N\) 个原子，连续变量维数约为：

$$
d = 6 + 3(N-1)
$$

其中 6 个变量来自晶格参数，去掉一个整体平移自由度后还有 \(3(N-1)\) 个原子坐标自由度。即便粗略离散化，可能结构数也随 \(N\) 指数增长。USPEX 的基本策略不是穷举，而是利用能量面上的经验事实：低能局域极小往往在同一“盆地/漏斗”附近聚集，好的结构片段可以组合出更好的结构。

在固定压力 \(P\) 和 0 K 条件下，很多搜索以焓为主要目标：

$$
H(\mathbf{R},\mathbf{A}) = E_{\text{DFT}}(\mathbf{R},\mathbf{A}) + PV
$$

其中 \(\mathbf{R}\) 是原子坐标，\(\mathbf{A}\) 是晶格矩阵。USPEX 用局域弛豫后的结构评价适应度：

$$
\text{fitness}(x) = -G(x^*) \quad \text{或} \quad -H(x^*), \qquad
x^*=\operatorname*{arg\,local\,min}_{x'} G(x')
$$

这样高适应度对应低自由能/低焓结构，选择机制会自然偏向更稳定的候选。

##### 三类核心演化算子

**Heredity（遗传/交叉）**是 USPEX 的标志性算子。两个父代先经过随机平移以避免人为单胞原点偏置，然后沿随机晶格方向切成空间相干的 slab。子代从父代 1 取一部分 slab，从父代 2 取剩余 slab，再修正各元素数量。晶格矩阵通常取两个父代的加权平均：

$$
\mathbf{A}_{\text{child}} = \lambda \mathbf{A}_1 + (1-\lambda)\mathbf{A}_2,\qquad \lambda\sim U(0,1)
$$

直觉是：晶体的有用信息主要在局域近邻关系和结构片段中，空间相干切片比随机拼接坐标更容易保留化学合理的键合环境。

**Mutation（变异）**用于跳出局部收敛。早期 USPEX 对晶格施加随机应变：

$$
\mathbf{A}'=(\mathbf{I}+\boldsymbol{\epsilon})\mathbf{A}, \qquad
\epsilon_{ij}\sim\mathcal{N}(0,\sigma_{\text{lattice}}^2)
$$

原子坐标也可加高斯扰动 \(\mathcal{N}(0,\sigma_{\text{atoms}}^2)\)。论文指出，晶格变异通常比原子位置随机扰动更关键，因为局域优化会修正原子小扰动，而晶格形变能探索相邻低能盆地。

**Permutation（置换）**用于多元素体系。它随机交换不同元素的原子位置，解决“同一几何骨架上哪种元素占哪个位点”的组合问题。对于离子/共价材料，这一步常常决定是否能找到正确的有序结构。

##### 约束、局域优化与选择

USPEX 不把所有随机结构都交给昂贵的 DFT。候选结构先经过硬约束过滤：

- 原子对距离必须大于元素相关的最小距离
- 晶胞角 \(\alpha,\beta,\gamma\) 落在合理范围
- 晶格矢量长度不能过短

这些约束不会精确告诉模型答案，但会排除明显不物理的高能区域，例如原子核/赝势芯重叠导致的病态结构。通过局域优化，每个候选都落到附近的局域极小点，能量排序更可比，也让 heredity/selection 学到“低能结构片段”而非热噪声坐标。

选择过程采用按适应度排名的随机父代选择，最差的一部分个体可被置零概率排除；生成 offspring 后，再把 offspring 与少量上一代精英合并，保留最佳个体进入下一代。这个精英保留机制防止已找到的好结构被随机漂移丢失。

##### 与随机搜索和普通遗传算法的区别

普通随机搜索缺少历史学习，每次采样几乎从头开始；普通二进制编码遗传算法又容易把晶体结构编码成不具物理意义的 bit string。USPEX 直接在连续晶格和坐标空间中操作，变异算子也尽量对应真实晶体形变和结构片段重组。

与后来的 CALYPSO 粒子群方法相比，USPEX 的核心更新来自遗传算子和精英选择；CALYPSO 则把候选结构看成粒子，用 pbest/gbest 或 lbest 的“速度”更新位置。两者都依赖局域优化和物理约束，但全局探索机制不同。

##### 能力与局限

USPEX 的强项是从组成直接预测稳定/亚稳结构，且可以自然地接入第一性原理计算。官方材料显示，现代 USPEX 还支持变组成搜索、分子晶体、二维层状材料、表面重构、聚合物、纳米粒子，以及以硬度、密度、带隙、介电常数等非能量性质为目标的优化。

局限也很明确：随着单胞原子数增加，局域极小点数量和 DFT 单次计算成本都会快速上升。USPEX 的演化策略显著减少了无效搜索，但不能消除结构预测问题的指数复杂性；对很大体系，通常需要空间群/片段/实验晶格/机器学习势等额外先验来降低成本。

#### 🧪 练习题

```yaml
question: "USPEX 为什么要对每个候选结构先做局域优化再评价适应度？"
options:
  - "为了让所有结构具有完全相同的空间群"
  - "为了把搜索从嘈杂的原始构型空间收缩到局域极小点集合，使能量排序更可比"
  - "为了避免使用第一性原理计算"
  - "为了保证每一代只产生一个新结构"
answer: 1
explain: "原始坐标的小扰动会造成很大的能量噪声。局域优化后比较的是各候选对应的局域极小点，更能反映结构 motif 的真实优劣。"
```
