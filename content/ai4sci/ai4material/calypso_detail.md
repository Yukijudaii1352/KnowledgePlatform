### CALYPSO — 粒子群晶体结构搜索 (Crystal structure AnaLYsis by Particle Swarm Optimization)

```yaml
id: calypso
name: CALYPSO
full_name: "粒子群晶体结构搜索 (Crystal structure AnaLYsis by Particle Swarm Optimization)"
year: "2012"
org: "吉林大学"
paper_url: "https://www.calypso.cn"
category: structure_prediction
parent: uspex
motivation: "粒子群优化超硬材料预测"
```

#### 📝 一句话总结

CALYPSO 将晶体结构预测中的候选结构视为粒子，用粒子群优化在局域弛豫后的能量面上演化结构，并结合对称性约束、键表征矩阵去重和随机注入来高效寻找稳定/亚稳材料结构。

#### 🎯 核心要点

- **PSO 搜索框架**：每个候选结构是一个粒子，位置表示晶格与原子坐标，速度由自身历史最优 \(pbest\) 和群体/局部最优 \(gbest/lbest\) 共同决定
- **从组成出发**：只需给定化学组成和外部条件（如压力），即可预测稳定或亚稳晶体结构
- **对称性约束生成结构**：随机初始结构和新结构生成时引入空间群/对称性，减少搜索变量并提高低能有序结构出现概率
- **键表征矩阵（BCM）**：用基于键长和键方向的旋转不变量描述结构相似性，删除重复结构并辅助划分能量漏斗
- **局域优化降噪**：每个候选结构经 DFT 或经验势弛豫到局域极小点后再进入比较和演化
- **多样性维护**：每代保留一定比例随机新结构，并使用 penalty/Metropolis 等策略避免粒子群过早收敛
- **方法扩展**：CALYPSO 已扩展到 3D 晶体、团簇、二维材料、表面重构、固定分子/固定晶胞/变组成搜索，以及以硬度等功能性质为目标的材料设计

#### 🔬 深入细节

##### 流程图与来源说明

![CALYPSO 流程图](https://cpb.iphy.ac.cn/article/2019/2006/cpb_28_10_106105/cpb_28_10_106105_f2.jpg)
*图：CALYPSO 方法流程，从对称性约束随机生成、BCM 结构表征、局域优化，到 PSO 生成下一代结构并循环至收敛。图源为《中国物理 B》CALYPSO 方法综述 Figure 2。*

> 来源说明：给定 `paper_url` 是 CALYPSO 项目主页。这里的方法细节主要追溯到 Wang, Lv, Zhu & Ma 2012 CPC 论文（arXiv: https://arxiv.org/abs/1205.2264）、2010 PRB 论文（arXiv: https://arxiv.org/abs/1008.3601）、CALYPSO 官方主页和 2019 方法综述。

##### 算法伪代码

```python
# CALYPSO 固定组成结构预测伪代码
population = []
while len(population) < population_size:
    x = generate_random_structure_with_symmetry(composition, pressure)
    if min_distance_constraints(x):
        x = local_relax(x)  # DFT / force field relaxation
        if not similar_by_BCM(x, population):
            population.append(x)

personal_best = {i: population[i] for i in range(population_size)}
global_best = best_by_enthalpy(population)

while not converged(population):
    next_population = keep_low_energy_structures(population)

    # 低能结构按 PSO 演化生成新结构
    for particle in selected_particles(population):
        pbest = personal_best[particle.id]
        guide = choose_gbest_or_lbest(particle, global_best, population)
        particle.velocity = (
            omega * particle.velocity
            + c1 * rand() * (pbest.position - particle.position)
            + c2 * rand() * (guide.position - particle.position)
        )
        child = particle.position + particle.velocity
        child = repair_structure(child, composition, symmetry=True)
        child = local_relax(child)
        if not similar_by_BCM(child, next_population):
            next_population.append(child)

    # 注入一定比例随机结构，防止早熟收敛
    while len(next_population) < population_size:
        x = generate_random_structure_with_symmetry(composition, pressure)
        x = local_relax(x)
        if accept_by_penalty_or_metropolis(x, next_population):
            next_population.append(x)

    population = select_next_generation(next_population)
    update_personal_and_global_best(population, personal_best, global_best)
```

##### 动机与问题设定

晶体结构预测在 0 K 下通常可近似为焓面的全局优化：

$$
\min_{\mathbf{R},\mathbf{A}} H(\mathbf{R},\mathbf{A};P)
= E(\mathbf{R},\mathbf{A}) + P\,V(\mathbf{A})
$$

其中 \(\mathbf{R}\) 是原子坐标，\(\mathbf{A}\) 是晶格矩阵。CALYPSO 的出发点与 USPEX 类似：穷举局域极小点不可行，必须利用能量面中低能结构聚集成漏斗的性质。但它不用遗传算法的 crossover/mutation 作为主更新，而是采用粒子群优化：每个结构既记住自己的历史最好位置，也受群体中最好结构吸引。

PSO 的基础更新写作：

$$
\mathbf{v}_i^{t+1}
= \omega\mathbf{v}_i^t
+ c_1 r_1\left(\mathbf{pbest}_i^t-\mathbf{x}_i^t\right)
+ c_2 r_2\left(\mathbf{gbest}^t-\mathbf{x}_i^t\right)
$$

$$
\mathbf{x}_i^{t+1}=\mathbf{x}_i^t+\mathbf{v}_i^{t+1}
$$

其中 \(\omega\) 是惯性权重，\(c_1,c_2\) 是学习因子，\(r_1,r_2\sim U(0,1)\)。在结构预测语境中，\(\mathbf{x}\) 不是普通向量点，而是编码后的晶格与原子坐标；更新后还必须修复组成、约束和几何合理性，再做局域优化。

##### 全局 PSO 与局部 PSO

CALYPSO 实现了 global PSO 和 local PSO。Global PSO 中所有粒子都被同一个 \(\mathbf{gbest}\) 吸引，收敛快，适合相对简单或小体系。Local PSO 则先利用结构相似性把粒子划分到不同能量漏斗，每个粒子受其所在漏斗的 \(\mathbf{lbest}\) 牵引：

$$
\mathbf{v}_i^{t+1}
= \omega\mathbf{v}_i^t
+ c_1 r_1\left(\mathbf{pbest}_i^t-\mathbf{x}_i^t\right)
+ c_2 r_2\left(\mathbf{lbest}_i^t-\mathbf{x}_i^t\right)
$$

这个设计牺牲一部分收敛速度，换取多漏斗并行探索，降低整个群体过早贴到单一低能 motif 的风险。

##### BCM：结构去重与漏斗划分

只按能量去重不够，因为很多几乎相同的结构会重复占据种群。CALYPSO 使用 Bond Characterization Matrix（BCM）描述结构，它把不同元素对之间的键方向和键长转换成旋转不变量。简化表示如下：

$$
Q_{lm}^{AB} =
\frac{1}{N_b^{AB}}
\sum_{(i,j)\in AB}
w(r_{ij})Y_{lm}(\theta_{ij},\phi_{ij})
$$

再构造旋转不变组合：

$$
Q_l^{AB} =
\left(\frac{4\pi}{2l+1}\sum_{m=-l}^{l}|Q_{lm}^{AB}|^2\right)^{1/2}
$$

两个结构 \(u,v\) 的相似性可用 BCM 向量的欧氏距离度量：

$$
D(u,v)=\left[\sum_{A,B,l}\left(Q_{l,u}^{AB}-Q_{l,v}^{AB}\right)^2\right]^{1/2}
$$

BCM 的作用有两层：一是消除重复/过近结构，节省局域优化预算；二是估计结构属于哪个漏斗，为 local PSO 的 \(\mathbf{lbest}\) 提供依据。

##### 对称性约束与随机注入

完全随机生成的结构通常是无序、液态样式或高能构型。CALYPSO 在生成结构时引入空间群对称性和最小原子间距约束，既减少自由度，也提高有序低能晶体出现概率。这种约束不是把答案写死，而是利用真实晶体常见的对称性先验缩小无效搜索空间。

同时，纯 PSO 容易过早收敛到当前最好结构附近。CALYPSO 每代保留一定比例随机新结构，并用 penalty function 或 Metropolis 接受准则控制多样性。低能结构负责“利用”，随机结构负责“探索”，BCM 负责防止探索预算被重复结构浪费。

##### 与 USPEX 的关系和区别

CALYPSO 和 USPEX 都是从头结构预测工具，都依赖局域优化、硬约束和种群式选择。差异在全局移动规则：USPEX 主要通过 heredity/mutation/permutation 生成子代；CALYPSO 主要通过 PSO 的速度-位置更新让结构朝历史最优和群体最优移动。

这使 CALYPSO 的搜索更像“带记忆的连续优化”：每个粒子保留自己的历史经验，群体共享低能结构信息；而遗传算法更像“结构片段重组”。在复杂体系中，CALYPSO 的 local PSO 和 BCM 漏斗划分尤其重要，因为它允许多个结构 motif 同时演化。

##### 应用与局限

CALYPSO 官方主页列出的能力包括 3D 晶体、团簇、二维层状材料、表面、固定晶胞/固定空间群/固定分子，以及变组成搜索；并已用于超硬材料、超导氢化物和高压新奇化合物设计。局限同样来自结构预测问题本身：DFT 评价昂贵，局域极小点数量随体系规模指数增长；当单胞非常大或组分非常复杂时，需要机器学习势、原型数据库、实验约束或分层筛选降低成本。

#### 🧪 练习题

```yaml
question: "CALYPSO 中 BCM 的主要作用是什么？"
options:
  - "直接替代 DFT 计算结构能量"
  - "用旋转不变的键特征度量结构相似性，以去重并辅助划分能量漏斗"
  - "把所有结构强制转换为同一个空间群"
  - "决定 PSO 中惯性权重 omega 的固定取值"
answer: 1
explain: "BCM 基于键长和键方向构造结构指纹，可识别重复/相似结构，也可帮助 local PSO 判断粒子所在的结构漏斗。"
```
