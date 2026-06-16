### OC20: 开放催化剂项目

```yaml
id: oc20
name: OC20
full_name: 开放催化剂项目 (Open Catalyst 2020)
year: '2020'
org: Meta AI / CMU
paper_url: https://ai.meta.com/blog/open-catalyst-project-accelerating-renewable-energy-storage-with-ai/
category: catalyst
parent: —
motivation: 128万弛豫+2.65亿DFT点，催化剂AI基石
```

#### 📝 一句话总结

OC20 提出面向吸附物-催化剂表面体系的大规模 DFT 数据集、生成流程和三项基准任务，把催化剂筛选中的结构弛豫、能量和力预测问题标准化为可训练、可比较的图神经网络挑战。

#### 🎯 核心要点

- **数据规模奠基**：包含约 1,281,040 条 DFT 结构弛豫轨迹和约 2.65 亿个单点能量/力计算，覆盖 55 种元素、82 种吸附物以及大量二元/三元催化剂表面
- **四阶段数据生成**：吸附物选择 → Materials Project 体相材料/表面枚举 → CatKit/ASE 生成初始吸附构型 → VASP/RPBE DFT 弛豫
- **三项核心任务**：S2EF 预测结构能量和原子力，IS2RS 从初始结构预测弛豫结构，IS2RE 从初始结构预测弛豫后吸附能
- **泛化切分设计**：验证和测试集同时包含 In-Domain、OOD Adsorbate、OOD Catalyst、OOD Both，用于评估模型对新吸附物和新催化剂组成的外推能力
- **基线模型体系**：以 CGCNN、SchNet、DimeNet++ 为代表，统一使用周期边界下的原子图、距离/角度消息传递和能量-力联合损失
- **评价指标贴近实际计算**：S2EF 使用 Energy MAE、Force MAE、Force Cosine 和 EFwT；IS2RS 使用 ADwT、FbT、AFbT；IS2RE 使用 Energy MAE 与 EwT
- **方法价值不止数据**：OC20 将催化剂发现中的 DFT 近似、ML 势能、吸附能估计和弛豫流程连接成统一 benchmark，后续 GemNet-OC、EquiformerV2/V3 等模型都围绕该基准迭代

#### 🔬 深入细节

![OC20 输入生成工作流](https://raw.githubusercontent.com/Open-Catalyst-Project/Open-Catalyst-Dataset/main/workflow_image.png)
*图：Open Catalyst Dataset 官方仓库中的吸附物-催化剂输入生成流程。OC20 论文的 arXiv TeX 源包含 `figures/workflow/scale.png`、`figures/relaxations/Figure2_01_27.png` 等论文图，但没有稳定的 arXiv HTML 图片直链；这里使用同一官方仓库提供的可访问工作流图。*

##### 动机与任务建模

催化剂筛选的瓶颈在于 DFT 弛豫：给定一个吸附物放在催化剂表面的初始构型，传统流程要反复计算能量和力，再用优化器更新原子坐标，直到最大受力低于阈值。单个体系可能需要数十到数百次 DFT 单点计算，而潜在的吸附物、表面、元素组合数量极大。OC20 的核心贡献是把这个计算化学工作流拆成可学习的三个问题。

S2EF 是最基础的机器学习势问题：输入某个轨迹中间帧的原子种类和坐标，输出吸附能与自由原子上的力：

$$
\mathbf{F}_i = -\frac{\partial E}{\partial \mathbf{r}_i}
$$

IS2RS 关注“从初始结构到弛豫结构”，可以通过反复调用 S2EF 模型做 ML relaxation，也可以训练端到端模型直接预测最终坐标。IS2RE 关注催化中最常用的量：从初始构型直接预测弛豫后吸附能，或者先用 S2EF/IS2RS 得到近似弛豫结构再估计能量。

##### 数据生成机制

OC20 的生成流程可理解为在一个巨大组合树上采样：

```python
# OC20 数据生成流程伪代码
for seed in random_seeds:
    # 1. 选择体相材料：偏向二元/三元体系以覆盖未充分研究的催化剂
    n_elem = sample([1, 2, 3], probs=[0.05, 0.65, 0.30])
    bulk = sample_materials_project_bulk(n_elem, stable_or_near_hull=True)

    # 2. 枚举并采样表面
    surfaces = enumerate_symmetry_distinct_surfaces(
        bulk,
        max_miller_index=2,
        min_depth_angstrom=7,
        min_width_angstrom=8,
    )
    slab = random_choice(surfaces)

    # 3. 选择吸附物并生成初始吸附构型
    adsorbate = sample_from_82_adsorbates()
    binding_sites = catkit_enumerate_sites(slab, adsorbate)
    init_structure = place_adsorbate(slab, adsorbate, random_choice(binding_sites))

    # 4. DFT 弛豫并保存所有中间帧
    trajectory = vasp_relax(
        init_structure,
        functional="RPBE",
        force_threshold=0.03,  # eV / Angstrom
        max_wall_time_hours=144,
        fixed_atoms="subsurface",
    )
    save_energy_force_frames(trajectory)
```

吸附能统一引用到裸 slab 和气相吸附物：

$$
E_{\mathrm{ad}} = E_{\mathrm{sys}} - E_{\mathrm{slab}} - E_{\mathrm{gas}}
$$

其中 \(E_{\mathrm{sys}}\) 是吸附物+表面的系统能量，\(E_{\mathrm{slab}}\) 是弛豫后的裸表面能量，\(E_{\mathrm{gas}}\) 是气相吸附物参考能。这个定义使不同体系的能量标签可以放进同一监督学习任务。

##### 基线 GNN 与损失函数

OC20 基线模型都把体系表示成周期性原子图：节点是原子，边是 cutoff 半径内的邻居关系，计算距离时考虑周期边界。论文中使用 6 Å cutoff，最多保留 50 个近邻，并把原子标记成 fixed slab、free surface、free adsorbate 三类，从而只在自由原子上计算力误差。

能量-力联合训练损失为：

$$
\mathcal{L}
= \lambda_E \sum_i \left|E_i - E_i^{\mathrm{DFT}}\right|
+ \lambda_F \sum_{i,j}\frac{1}{N_i}
\left|F_{i,j} - F_{i,j}^{\mathrm{DFT}}\right|
$$

其中 \(i\) 表示结构帧，\(j\) 表示第 \(i\) 个结构中的自由原子，\(N_i\) 是自由原子数量。IS2RE 只评估能量时令 \(\lambda_F=0\)。SchNet 通过连续滤波器学习距离依赖，DimeNet++ 额外引入角度方向消息，因此在早期 OC20 基线里通常比只用距离的模型更适合力预测。

##### 三项任务如何互相连接

```python
# 三项任务之间的关系
def s2ef_model(structure):
    energy = energy_head(gnn(structure))
    forces = -grad(energy, structure.positions)
    return energy, forces

def is2rs_via_s2ef(initial_structure):
    structure = initial_structure
    for step in range(max_relax_steps):
        energy, forces = s2ef_model(structure)
        structure.positions = lbfgs_update(structure.positions, forces)
        if max_norm(forces) < 0.05:  # practical force threshold
            break
    return structure

def is2re(initial_structure):
    relaxed_structure = is2rs_via_s2ef(initial_structure)
    relaxed_energy, _ = s2ef_model(relaxed_structure)
    return relaxed_energy
```

这个伪代码展示了 OC20 的关键思想：S2EF 是可复用的局部势能/力近似器，IS2RS 是用这个近似器替代 DFT 做结构优化，IS2RE 则服务于催化中常见的吸附能筛选。如果 S2EF 的力方向误差很小，ML relaxation 才可能收敛到合理局部极小值；如果力 MAE 低但方向不稳，IS2RS 仍可能失败。

##### 评价指标的工程含义

OC20 没有只报告 MAE，而是设计了更接近“能否替代 DFT”的阈值指标。S2EF 的 EFwT 要求同一结构同时满足能量误差低于 0.02 eV、最大原子力误差低于 0.03 eV/Å；IS2RE 的 EwT 同样以 0.02 eV 为阈值；IS2RS 的 FbT/AFbT 要用单点 DFT 重新评估模型弛豫后的结构是否接近真实局部极小值。

> 💡 关键：OC20 的难点不是单一化学体系的插值，而是跨吸附物、跨催化剂组成、跨表面位点的外推。OOD Both 切分同时隐藏吸附物和催化剂组成，暴露了模型是否真正学到可迁移的局部化学规律。

##### 与传统小规模催化数据集的区别

传统催化 ML 数据集通常围绕少量金属表面、少量吸附物或已知反应族构建，手工描述符和线性模型也能发挥作用。OC20 的不同之处在于它把高通量 DFT 轨迹本身作为学习对象：不仅提供最终能量，也提供大量中间结构、随机扰动、短时 MD、Bader 电荷和 LOBSTER 分析。这使模型可以学习完整势能面附近的局部几何响应，而不只是拟合最终吸附能表。

这也是后续模型演进的原因：SchNet/DimeNet++ 基线证明数据规模有用但离实用阈值很远；GemNet-OC 针对 OC20 调整几何消息传递和邻居图；EquiformerV2/V3 进一步用高阶等变表示和更强注意力机制提升力预测与训练效率。换言之，OC20 本身不是一个单一网络结构，而是催化剂 AI 的任务定义、数据生成协议和模型竞赛基础设施。

#### 🧪 练习题

```yaml
question: "OC20 中 S2EF、IS2RS、IS2RE 三个任务的核心关系是什么？"
options:
  - "三者分别处理文本、图像和语音输入，互不相关"
  - "S2EF 预测能量和力，可驱动 ML 弛豫形成 IS2RS，并进一步用于估计 IS2RE 的弛豫能量"
  - "IS2RE 只预测吸附物 SMILES，不涉及三维结构"
  - "IS2RS 要求直接运行完整 DFT，不允许使用机器学习模型"
answer: 1
explain: "OC20 将 DFT 弛豫流程拆解为能量/力预测、结构弛豫和弛豫能量预测。S2EF 是最基础的势能近似器，后两项任务可以直接或间接建立在它之上。"
```
