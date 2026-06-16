### YuelDesign: 柔性口袋药物设计 (YuelDesign)

```yaml
id: yueldesign
name: YuelDesign
full_name: 柔性口袋药物设计 (YuelDesign)
year: '2025.05'
org: NIH
paper_url: https://pubmed.ncbi.nlm.nih.gov/40502112/
category: design
parent: alphafold3
motivation: 扩散框架建模柔性口袋
```

#### 📝 一句话总结
YuelDesign 提出一个同时生成蛋白口袋构象和配体三维结构的双扩散框架，解决传统结构化药物生成模型把受体口袋视为刚体、难以表达 induced-fit 柔性变化的问题。它用 E3former 维持三维等变性，用 EDM 处理连续坐标、D3PM 处理离散原子类型，再通过后处理重建化学键。

#### 🎯 核心要点
- 全原子口袋-配体联合建模：把口袋原子和小分子原子拼接成同一个三维坐标系统，而不是只固定蛋白、生成配体。
- E3former 主干：借鉴 AlphaFold/Evoformer 的序列、pair、triangle attention/multiplication 模块，但去掉 MSA，增加 E(3) 等变坐标头直接预测原子位移。
- 双扩散策略：连续坐标使用 EDM 加噪/去噪，离散配体原子类型使用 D3PM 分类转移，从而同时优化几何位置和化学身份。
- 口袋柔性编码：口袋定义为距配体任一原子 6 Å 内的蛋白残基，序列特征区分骨架、侧链和配体原子，pair 特征包含同残基标记和原子间距离。
- 数据与泄漏控制：使用 Binding MOAD 蛋白-配体复合物，按 8:2 划分训练/测试，并用 BLASTp、TM-align、口袋 RMSD 和 RDKit Tanimoto 相似度过滤相似蛋白或配体。
- 后处理化学约束：扩散后执行 bond reconstruction，缓解三维坐标独立生成导致的断裂分子和异常大环问题。
- 评估维度：报告连接性、大环比例、QED、Lipinski RO5、SAS、validity、功能团分布、口袋 RMSD、MedusaDock/redocking 能量和相互作用保留情况。

#### 🔬 深入细节
来源说明：任务给出的 PubMed 链接对应 2025 年 bioRxiv 预印本记录；可访问全文还包括 PMC 上的 Science Advances 版本，论文页面列出代码仓库 `https://github.com/dokhlab/yuel_design` 与 `https://github.com/hust220/yuel_design`。以下方法解读以可访问全文和 PubMed 摘要为主。

![YuelDesign 工作流与 E3former 架构](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/4ec4/13060587/c5730b30d082/sciadv.aeb7045-f1.jpg)
*图：YuelDesign 从口袋提取开始，对口袋-配体复合体进行联合加噪和去噪；E3former 用序列特征、pair 特征和等变坐标头同时更新原子类型与三维坐标。*

```python
# YuelDesign 训练与采样伪代码
for complex in Binding_MOAD:
    pocket = residues_with_any_atom_within_6A(ligand)
    x0 = concat_coordinates(pocket_atoms, ligand_atoms)
    a0 = ligand_atom_types
    seq_feat, pair_feat = build_atom_and_pair_features(pocket, ligand)

    # 训练：连续坐标 EDM + 离散原子类型 D3PM
    t = sample_time_step()
    eps = normal_like(x0)
    xt = alpha[t] * x0 + sigma[t] * eps
    at = categorical_corrupt(a0, beta[t])

    eps_hat, atom_logits, delta_x = E3former(xt, at, seq_feat, pair_feat, t)
    loss = masked_mse(eps_hat, eps) + cross_entropy(atom_logits, a0)
    update(loss)

for target_pocket in new_targets:
    xT = gaussian_noise_for_pocket_and_ligand()
    aT = random_atom_type_distribution()
    for t in reversed(range(T)):
        eps_hat, atom_logits, delta_x = E3former(xT, aT, features, t)
        xT = edm_reverse_step(xT, eps_hat, t)
        aT = d3pm_reverse_step(aT, atom_logits, t)
    molecule = reconstruct_bonds(xT, aT)
```

YuelDesign 的关键动机是：配体结合时蛋白口袋并不是一个静止容器，侧链旋转、局部接触和口袋形状会随配体改变。DiffSBDD、PMDM 等 3D 分子扩散模型通常以固定口袋作为条件，只在口袋内生成配体坐标；这种做法容易错过 induced-fit 形成的新氢键、疏水接触或 π-π stacking。YuelDesign 反过来把口袋和配体放进同一个生成对象中，让蛋白侧链和配体一起经历扩散轨迹。

连续坐标部分采用 EDM 风格的加噪过程。对原子坐标 \(x_0\)，前向过程写作：

$$
x_t = \alpha_t x_0 + \sigma_t \epsilon,\quad \epsilon \sim \mathcal{N}(0, I)
$$

训练目标是让 E3former 预测真实噪声，常用形式可概括为带 mask 的均方误差：

$$
\mathcal{L}_{coord} =
\left\|M \odot \left(\epsilon_\theta(x_t, a_t, t, c)-\epsilon\right)\right\|_2^2
$$

其中 \(c\) 表示口袋-配体条件特征，\(M\) 用于只在需要学习的原子或坐标上计算损失。离散原子类型不能直接加高斯噪声，因此使用 D3PM：前向过程用转移矩阵逐步扰动类别标签，反向网络输出每个位置的 atom-type logits，并用交叉熵或离散扩散的变分项训练：

$$
\mathcal{L}_{atom} = - \sum_i \log p_\theta(a_{0,i}\mid a_{t,i}, x_t, c, t)
$$

E3former 是把这两个扩散头连接起来的主干。它把每个原子当作 token，sequence features 存储原子类型、蛋白/配体身份、骨架/侧链标记；pair features 存储两原子是否同残基、欧氏距离等几何关系。每个 block 先用 sequence attention 和 transition 更新单原子表示，再用 outer product、triangle attention 和 triangle multiplication 更新两两关系。坐标头聚合相对方向向量，形式上可理解为：

$$
\Delta x_i = \sum_{j\ne i} w_{ij}\frac{x_i-x_j}{\|x_i-x_j\|+\varepsilon}
$$

因为只使用相对方向和基于 pair embedding 的权重，整体对平移和旋转保持 E(3) 等变：旋转输入会旋转输出位移，平移输入不会改变相对位移。这对三维结构生成很重要，否则模型可能学习到坐标系伪规律，而不是分子几何。

生成流程从随机坐标和随机原子类别开始，逐步反向去噪。早期步骤决定粗略空间布局和口袋-配体相对位置，中后期步骤细化原子类型、键长、侧链微调和构象变化。论文还专门分析了 denoising trajectory，观察 atom type transitions、bond dynamics 和 conformational adjustments，说明模型不是一次性输出分子，而是在扩散轨迹中逐步稳定化结构。

与传统刚性口袋生成相比，YuelDesign 的优势在于把“配体设计”和“口袋可适配性”放在同一个生成问题里。论文报告生成口袋相对 native pocket 的 median RMSD 约 1.8 Å，这个量级符合局部侧链调整而非大范围折叠变化；在 PTR1 等案例中，模型可保留关键 π-π interaction，同时产生新的 residue-ligand contacts。局限也很明确：扩散初期没有显式价键约束，容易出现小环或异常连接，需要 bond reconstruction 和后续化学过滤；分子越大，联合扩散维度越高，去噪误差也更容易积累。

#### 🧪 练习题
```yaml
question: "YuelDesign 为什么要同时扩散蛋白口袋和配体，而不是只把口袋作为固定条件？"
options:
  - "为了减少 E3former 的参数量"
  - "为了显式建模配体结合诱导的口袋侧链和局部构象变化"
  - "为了避免使用任何化学键重建步骤"
  - "为了把所有原子类型都转换成连续变量"
answer: 1
explain: "YuelDesign 的核心目标是处理 flexible protein pockets；联合生成口袋和配体可以让侧链调整、局部接触和配体几何在同一扩散轨迹中协同优化。"
```
