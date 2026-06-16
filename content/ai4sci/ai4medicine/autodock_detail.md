### AutoDock — 自动分子对接

```yaml
id: autodock
name: AutoDock
full_name: 自动分子对接 (AutoDock)
year: '1990'
org: Scripps Research
paper_url: https://onlinelibrary.wiley.com/doi/10.1002/jcc.540110311
category: screening
parent: —
motivation: 基于物理力场的分子对接
```

#### 📝 一句话总结

AutoDock 提出用预计算三维能量网格加随机全局搜索来自动预测小分子在蛋白结合位点中的构象与结合能，解决了早期分子对接中手工摆放配体、逐原子能量计算过慢和柔性配体搜索空间巨大的问题。

#### 🎯 核心要点

- **网格化能量评估**：AutoGrid 为每种配体原子类型预计算 receptor 周围三维 affinity map，使 docking 时能用插值快速估计相互作用能
- **物理力场打分**：早期 AutoDock 使用 van der Waals、静电、氢键等分子力场项；后续 AutoDock3/4 扩展为半经验结合自由能函数
- **柔性配体搜索**：配体构象由平移、旋转和可旋转键 torsion 共同定义，receptor 通常固定或只允许少量侧链柔性
- **模拟退火起源**：1990 年原始 AutoDock 用 Monte Carlo simulated annealing 在位姿空间中搜索低能构象
- **多次独立运行与聚类**：对同一 ligand 执行多次随机搜索，按能量排序并按 RMSD 聚类，用最低能且可重复的 cluster 作为候选 pose
- **PDBQT 表示**：输入文件包含原子坐标、部分电荷、AutoDock atom type 和 torsion tree 信息
- **后续 LGA 演化**：AutoDock 2/3/4 引入 genetic algorithm、Lamarckian genetic algorithm 和 Solis-Wets local search，但网格打分与构象搜索框架保持核心地位
- **虚拟筛选影响**：AutoDock 把蛋白-配体对接从专家交互建模推进到可批量运行的自动筛选流程

#### 🔬 深入细节

![AutoDock grid map 示意图](https://ics.uci.edu/~dock/manuals/autodock_manual/Using_AutoDock_305-11.gif)
*图：AutoDock/AutoGrid 手册中的 grid map 示意图；网格包围受体活性位点，每个格点保存某类 probe atom 与 receptor 的势能。来源：AutoDock 3.0.5 官方手册镜像。*

任务 YAML 中的 `paper_url` 指向 `10.1002/jcc.540110311`，该 DOI 实际对应 Breneman 与 Wiberg 关于 electrostatic potential charges 的 JCC 论文，并非 AutoDock 原始论文。AutoDock 1990 原始引文通常为 Goodsell & Olson, *Automated docking of substrates to proteins by simulated annealing*, Proteins 8:195-202, DOI `10.1002/prot.340080302`；方法细节还可从 Scripps AutoDock 4.2 手册 `https://autodocksuite.scripps.edu/wp-content/uploads/sites/31/2019/03/AutoDock4.2.6_UserGuide.pdf` 和 AutoDock 3.0.5 手册 `https://autodock.scripps.edu/wp-content/uploads/sites/56/2022/04/AutoDock3.0.5_UserGuide.pdf` 核对。

```python
# AutoDock 经典流程伪代码：AutoGrid + simulated annealing docking

# 1. 受体和配体准备
receptor = load_pdbqt("receptor.pdbqt")    # atom types, partial charges
ligand = load_pdbqt("ligand.pdbqt")        # torsion tree, rotatable bonds
grid_box = define_binding_site(center, size, spacing=0.375)

# 2. AutoGrid：为每种 ligand atom type 预计算 receptor affinity map
maps = {}
for atom_type in ligand.atom_types:
    maps[atom_type] = compute_3d_grid(
        receptor=receptor,
        probe_type=atom_type,
        box=grid_box,
        terms=["vdw", "hbond", "electrostatic", "desolvation"],
    )

# 3. AutoDock：在 pose 空间中搜索
best_poses = []
for run in range(num_runs):
    pose = random_pose(
        translation=grid_box.random_point(),
        rotation=random_quaternion(),
        torsions=random_torsion_angles(ligand),
    )
    temperature = initial_temperature

    for cycle in range(num_annealing_cycles):
        for step in range(max_steps_per_cycle):
            proposal = perturb(pose,
                               translation_step=0.2,
                               rotation_step_degrees=5.0,
                               torsion_step_degrees=5.0)
            e_old = score_pose(ligand, pose, maps)
            e_new = score_pose(ligand, proposal, maps)
            delta = e_new - e_old

            # Metropolis 接受准则：高温允许爬坡，低温趋向局部最小
            if delta < 0 or random() < exp(-delta / temperature):
                pose = proposal

        temperature = cool(temperature)  # linear/geometric schedule

    best_poses.append(local_minimize_if_enabled(pose))

clusters = rmsd_cluster(best_poses, tolerance=2.0)
ranked = sort_by_energy_and_cluster_size(clusters)
```

**动机：把 docking 拆成“能量表查询 + 构象搜索”**

蛋白-配体 docking 的理想目标是在所有平移、旋转、配体内旋转键、甚至 receptor 柔性自由度上找到结合自由能全局最小值。直接逐步计算每个 pose 中所有 receptor-ligand 原子对相互作用非常昂贵。AutoDock 的核心工程化拆解是：receptor 大多固定，因此 receptor 对某类 probe atom 的势能可以预先计算成三维网格；搜索时只需要把 ligand 每个原子的位置映射到网格并做插值求和。

**AutoGrid：为什么网格能加速**

对 ligand 中每个原子 \(i\)，其类型为 \(t_i\)，在 pose \(p\) 下坐标为 \(\mathbf{r}_i(p)\)。AutoGrid 预先为类型 \(t\) 计算 map \(M_t(\mathbf{r})\)，那么 docking 时的受体-配体相互作用可近似为：

$$
E_{\text{inter}}(p)
= \sum_{i\in \text{ligand}}
\mathrm{interp}\left(M_{t_i}, \mathbf{r}_i(p)\right)
+ \sum_i q_i\,\mathrm{interp}\left(M_{\text{elec}}, \mathbf{r}_i(p)\right)
+ \sum_i \mathrm{interp}\left(M_{\text{desolv}}, \mathbf{r}_i(p)\right)
$$

其中 \(\mathrm{interp}\) 通常是三线性插值。这样每次评分从 \(O(N_{\text{ligand}}N_{\text{receptor}})\) 降为接近 \(O(N_{\text{ligand}})\)，使得 Monte Carlo、遗传算法等全局搜索可以执行成千上万次能量评估。

**搜索空间：平移、旋转和 torsion tree**

AutoDock 把 ligand pose 表示为：

$$
x = \left(\mathbf{t},\; \mathbf{q},\; \tau_1,\ldots,\tau_m\right)
$$

其中 \(\mathbf{t}\) 是 ligand 中心平移，\(\mathbf{q}\) 是四元数旋转，\(\tau_k\) 是第 \(k\) 个可旋转键的二面角。这个表示把刚体位姿和内部柔性统一进一个向量；每次搜索 move 可以小幅改变平移、旋转或 torsion。原始 AutoDock 用 simulated annealing 在该空间中搜索，后续版本把全局搜索替换/增强为 GA、LGA 和局部搜索。

**模拟退火：接受坏 move 以逃离局部最小**

在每一步中，若 proposal 的能量更低则直接接受；若能量更高，也以 Metropolis 概率接受：

$$
P(\text{accept})
= \min\left(1,\exp\left(-\frac{E_{\text{new}}-E_{\text{old}}}{kT}\right)\right)
$$

高温时模型可以穿过能量障碍，探索多个结合口袋或 torsion 组合；降温后逐渐收敛到低能构象。AutoDock 手册中的 simulated annealing 参数包括 translation step、quaternion step、torsion step、初始温度、退火 cycles、每轮接受/拒绝上限等。

**评分函数：从力场能到半经验结合自由能**

原始 AutoDock 强调基于物理力场的相互作用能。AutoDock3/4 进一步把打分函数写成可拟合的结合自由能模型，常见形式为：

$$
\Delta G_{\text{bind}}
= W_{\text{vdW}}\sum_{ij}\left(\frac{A_{ij}}{r_{ij}^{12}}-\frac{B_{ij}}{r_{ij}^{6}}\right)
+ W_{\text{hbond}}\sum_{ij}E(t)
\left(\frac{C_{ij}}{r_{ij}^{12}}-\frac{D_{ij}}{r_{ij}^{10}}\right)
$$

$$
\quad
+ W_{\text{elec}}\sum_{ij}\frac{q_i q_j}{\epsilon(r_{ij})r_{ij}}
+ W_{\text{sol}}\sum_{ij}(S_iV_j+S_jV_i)
\exp\left(-\frac{r_{ij}^2}{2\sigma^2}\right)
+ W_{\text{tor}}N_{\text{tor}}
$$

前两项对应 Lennard-Jones 型范德华和方向性氢键，第三项是距离依赖介电中的静电项，第四项是去溶剂化项，最后一项惩罚配体可旋转键带来的构象熵损失。实际实现中，receptor-ligand 的许多 pairwise 项已经压缩进 grid maps；ligand 内部能量和 torsion penalty 则在 pose 评分时加入。

**为什么要多次运行并聚类**

对接能量面高度粗糙，单次随机搜索得到的最低能 pose 不一定可靠。AutoDock 因此通常执行多次独立 run，再按 RMSD 聚类。一个可信 pose 往往不只是能量低，还会在多个 run 中反复出现，形成较大的低能 cluster。这个实践把随机优化的不确定性转化为可诊断的输出：能量排名、cluster size、cluster 内 RMSD 都能帮助判断 pose 是否稳定。

**与现代 docking 工具的关系**

AutoDock Vina、AutoDock-GPU、ADFR 等后续工具在搜索算法、并行化和评分函数上有明显改进，但 AutoDock 的基本思想仍然清晰可见：准备标准化 receptor/ligand 表示，预计算或快速估计相互作用能，在高维 pose 空间中做启发式全局搜索，再用聚类和能量排序解释结果。这个框架也是后来大规模虚拟筛选工作流的基础。

**局限性**

经典 AutoDock 通常假设 receptor 刚性或只允许有限侧链柔性，因此难以处理强诱导契合、结合位点大构象变化和水网络重排。评分函数是近似的，\(\Delta G_{\text{bind}}\) 更适合 pose ranking 和富集筛选，不应直接等同于精确实验亲和力。质子化状态、金属配位、共价结合、糖类和高柔性配体也需要额外参数或专门协议。

#### 🧪 练习题

```yaml
question: "AutoDock 使用预计算 grid maps 的主要目的是什么？"
options:
  - "把蛋白序列翻译成氨基酸结构"
  - "避免在每个候选 pose 中重复计算所有 receptor-ligand 原子对相互作用，从而加速能量评估"
  - "保证所有 docking pose 都是真实晶体结构"
  - "用深度学习模型替代物理力场"
answer: 1
explain: "AutoGrid 预先计算受体周围每种 probe atom 的势能网格，AutoDock 搜索时只需插值求和，使大量 Monte Carlo 或遗传算法评分变得可行。"
```
