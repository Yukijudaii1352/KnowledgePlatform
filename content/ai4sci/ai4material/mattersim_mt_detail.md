### MatterSim-MT: 材料模拟多任务模型 (MatterSim Multi-Task)

```yaml
id: mattersim_mt
name: MatterSim-MT
full_name: "材料模拟多任务模型 (MatterSim Multi-Task)"
year: "2026"
org: Microsoft
paper_url: "https://www.microsoft.com/en-us/research/blog/mattersim-updates-experimental-validation-faster-simulation-and-a-new-multi-task-model/"
category: foundation_model
parent: chgnet
motivation: 3500万结构多任务基础模型
```

#### 📝 一句话总结

MatterSim-MT 在 MatterSim 的能量-力-应力势能面基础上扩展出多任务材料基础模型，用 3500 万个第一性原理标注结构和多种辅助物性头同时学习统一原子表示，使同一个模型既能做结构/动力学/热力学模拟，也能预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵。

#### 🎯 核心要点

- **超大覆盖预训练集**：约 35M 第一性原理结构、约 450M 原子力标签，覆盖 89 种元素、0-5000 K、0-1000 GPa
- **多任务物性扩展**：在 E/F/S 势能面之外，额外预测 Bader charges、magnetic moments、Born effective charges \(Z^*\)、dielectric matrices \(\varepsilon_\infty\)
- **GeoMFormer 主干**：使用 invariant/equivariant 双流 Transformer，通过 self-attention 和 cross-attention 交换标量与几何等变信息
- **物理先验约束**：周期边界多图构建、平滑截断函数、平移/旋转不变性、向量性质等变性和能量守恒
- **统一多任务损失**：能量、力、应力与四类辅助目标按 MAE 加权联合训练
- **超越 PES 的模拟能力**：可模拟 SiC 压力依赖 LO-TO splitting、BaTiO3 铁电电滞回线、富锂正极脱锂过程中的阴离子氧氧化
- **可扩展与可适配**：10M 参数模型用于主实验，模型规模可扩至 1.3B；可通过主动学习和少量高层级理论数据快速微调

#### 🔬 深入细节

##### 框架示意图

![MatterSim-MT 总体框架](https://arxiv.org/html/2605.07927v1/x1.png)
*图：MatterSim-MT Figure 1。上部是主动学习材料探索器，中部是带 invariant/equivariant 表示的 Transformer 主干，下部是能量、力、应力和多任务物性头。*

![MatterSim-MT 多任务能力](https://arxiv.org/html/2605.07927v1/x3.png)
*图：MatterSim-MT Figure 3。模型从同一原子结构中输出 E/F/S、磁矩、Born 有效电荷和介电矩阵，并支撑 LO-TO splitting、铁电电滞和电池氧氧化案例。*

来源说明：任务给定链接是 Microsoft Research 新闻页/博客入口；可追溯到 Microsoft Research publication 页面和 arXiv:2605.07927，论文 HTML 与 TeX 源均可访问，图示使用 arXiv HTML 直链。

##### 材料图表示

MatterSim-MT 输入是带周期边界条件的材料图：

$$
\mathcal{G}=(\boldsymbol{Z},\boldsymbol{V},\boldsymbol{R},[\boldsymbol{L},\boldsymbol{S}])
$$

其中 \(\boldsymbol{Z}\) 是原子序数和原子特征，\(\boldsymbol{R}=\{\boldsymbol{r}_i\}\) 是三维原子位置，\(\boldsymbol{V}\) 是原子对相对位移，\(\boldsymbol{L}\) 是 \(3\times3\) 晶格矩阵，\(\boldsymbol{S}\) 可包含温度、压力等全局状态。边在截断半径 \(r_c\) 内建立，并通过周期镜像原子构造 multi-graph，使单胞内原子能感知邻近周期图像。

平滑截断 mask 用于避免邻居进出截断半径时产生不连续：

$$
m_{ij}=1-6\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^5
+15\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^4
-10\left(\frac{\|\boldsymbol{r}_{ij}\|}{r_c}\right)^3
$$

节点初始标量嵌入叠加中心性编码：

$$
\boldsymbol{b}_i=
\sum_{j\in\mathcal{N}(i)}
\mathrm{Linear}\left(m_{ij}\cdot\tilde{\Phi}(\|\boldsymbol{r}_{ij}\|)\right),
\qquad
\boldsymbol{x}_i^{\prime 0}=\boldsymbol{x}_i^0+\boldsymbol{b}_i
$$

等变流则用径向基和单位方向向量初始化：

$$
\boldsymbol{e}_i^0=
\sum_j m_{ij}\tilde{\Phi}(\|\boldsymbol{r}_{ij}\|)
\cdot \mathrm{concat}\left(1,\frac{\boldsymbol{r}_{ij}}{\|\boldsymbol{r}_{ij}\|}\right)
$$

##### GeoMFormer 双流 Transformer

MatterSim-MT 的主干来自 GeoMFormer。它维护两套表示：invariant stream \(\boldsymbol{x}_i\) 承载标量不变信息，equivariant stream \(\boldsymbol{e}_i\) 承载方向相关几何信息。每个 Transformer block 包含四类注意力模块：

- Inv-Self-Attn：标量流内部自注意力
- Equ-Self-Attn：等变流内部自注意力
- Inv-Cross-Attn：等变信息注入标量流
- Equ-Cross-Attn：标量信息门控或调制等变流

对 invariant self-attention，论文使用带截断 mask 的注意力：

$$
a_{ij}=\left(\frac{\boldsymbol{Q}\boldsymbol{K}^{T}}{\sqrt{d}}\right)_{ij}
$$

$$
\mathrm{Softmax}^{*}(a_{ij})
=\frac{\exp(a_{ij})m_{ij}}
{\sum_{k\in\mathcal{N}(i)}\exp(a_{ik})m_{ik}}
$$

$$
\boldsymbol{x}_i^{h+1}
=\sum_{j\in\mathcal{N}(i)}
\mathrm{Softmax}^{*}(a_{ij})\,m_{ij}\,\boldsymbol{V}_j
$$

周期镜像原子的 key/value 从原胞原子复制，避免同一物理原子在不同镜像中产生不一致表示。FFN 对 invariant feature 可使用标准非线性，而 equivariant feature 不能随意过非线性，因此用 invariant feature 做 gate 来缩放等变通道。

##### 多任务头与关键计算

最终 Transformer block 输出 \((x_i^N,e_i^N)\)。每个 task head 先用 Inv-Cross-Attn 融合两流：

$$
\boldsymbol{x}_i^{N+1}=\mathrm{InvCrossAttn}(x_i^N,e_i^N)
$$

标量型预测，如能量、Bader 电荷和磁矩，使用 MLP：

$$
\boldsymbol{p}_i=
W_2 f_{\mathrm{LN}}\left(\sigma(W_1x_i^{N+1}+b_1)\right)+b_2
$$

能量对原子做 mean pooling 或图级聚合；Bader 电荷和磁矩保留为 per-atom 输出。Born 有效电荷和介电矩阵采用 ETGNN 风格的张量构造。介电张量可写为：

$$
\varepsilon
=\frac{1}{N}
\sum_{i=1}^{N}\sum_{j\in\mathcal{N}(i)}
(\boldsymbol{p}_i\boldsymbol{p}_j)
\frac{\vec{r}_{ji}}{\|\vec{r}_{ji}\|}
\otimes
\frac{\vec{r}_{ji}}{\|\vec{r}_{ji}\|}
$$

Born 有效电荷分为对称和非对称贡献：

$$
\boldsymbol{Z}_i=\boldsymbol{Z}_i^{\mathrm{sym}}+\boldsymbol{Z}_i^{\mathrm{non\mbox{-}sym}}
$$

这些张量输出是 MatterSim-MT 区别于普通 MLIP 的关键：普通势能面模型只能给出能量、力、应力，无法直接构造极化、长程库仑非解析修正或电荷/磁矩演化。

##### 联合训练目标

GeoMFormer 多任务损失为：

$$
L=
l(e,e_{\mathrm{DFT}})
+\omega_f l(\boldsymbol{f},\boldsymbol{f}_{\mathrm{DFT}})
+\omega_\sigma l(\boldsymbol{\sigma},\boldsymbol{\sigma}_{\mathrm{DFT}})
+\sum_{i=1}^{4}\omega_{t_i}l(\boldsymbol{p}_{t_i},\boldsymbol{p}_{t_i,\mathrm{DFT}})
$$

其中 \(l(\cdot,\cdot)\) 是 MAE，\(e\) 是每原子能量，\(\boldsymbol{f}\) 是 per-atom force，\(\boldsymbol{\sigma}\) 是应力张量，四个辅助目标 \(t_i\) 分别对应 magnetic moments、Bader charges、Born effective charges 和 dielectric matrices。

辅助标签规模远小于 E/F/S 主数据：Bader charge 数据约 172,488 个周期结构，Born effective charge 与 dielectric matrix 约 3,051 个结构，磁矩约 284,195 个结构。因此多任务训练的核心工程问题是让大规模 PES 预训练学到通用局域化学表示，再用小得多的高价值物性标签扩展输出能力。

##### 算法伪代码

```python
# MatterSim-MT 训练与推理伪代码
for batch in first_principles_batches:
    graph = build_periodic_multigraph(
        atoms=batch.atomic_numbers,
        positions=batch.positions,
        lattice=batch.lattice,
        states=batch.temperature_pressure,
        cutoff=r_c,
    )

    x = atom_embedding(graph.Z) + centrality_encoding(graph.distances, graph.mask)
    e = equivariant_embedding(graph.directions, graph.distances, graph.mask)

    for block in geomformer_blocks:
        x = inv_self_attention(x, graph.mask)
        e = equ_self_attention(e, graph.mask)
        x = inv_cross_attention(x, e, graph.mask)
        e = equ_cross_attention(e, x, graph.mask)
        x, e = gated_ffn(x, e)

    energy = energy_head(x).mean_over_atoms()
    forces = -grad(energy, graph.positions)        # 能量守恒路径
    stress = stress_head(x, graph.lattice)
    bader = bader_head(x, e)                       # per-atom
    magmom = magnetic_head(x, e)                   # per-atom
    born = born_effective_charge_head(x, e, graph.directions)
    dielectric = dielectric_head(x, e, graph.directions)

    loss = mae(energy, E_dft)
    loss += w_f * mae(forces, F_dft)
    loss += w_s * mae(stress, stress_dft)
    loss += w_aux * available_auxiliary_mae(
        bader, magmom, born, dielectric, labels=batch.aux_labels
    )
    optimizer.step(loss)
```

##### 多任务能力为何重要

势能面模型擅长结构弛豫、分子动力学、声子和热力学，但许多材料问题依赖 PES 之外的电子响应。例如极性晶体的 LO-TO splitting 需要 Born 有效电荷和电子介电矩阵来构造动力学矩阵的非解析修正：

$$
{}^{\mathrm{NA}}C_{I\alpha,J\beta}
=\frac{4\pi}{\Omega}
\frac{(\mathbf{q}\cdot Z_I^*)_\alpha(\mathbf{q}\cdot Z_J^*)_\beta}
{\mathbf{q}\cdot\boldsymbol{\varepsilon}_\infty\cdot\mathbf{q}}
$$

仅有能量和力无法得到这项长程库仑修正。MatterSim-MT 直接预测 \(Z^*\) 和 \(\varepsilon_\infty\)，所以能模拟 3C-SiC 在高压下的 LO-TO splitting；同理，Born 有效电荷使 BaTiO3 在外电场下的极化-电场电滞回线成为可模拟对象，Bader 电荷和磁矩让富锂正极脱锂过程中的阳离子/阴离子氧化转变可被跟踪。

论文报告的代表性误差包括：Bader 电荷 MAE 约 0.023 e，磁矩约 0.064 \(\mu_B\)，Born 有效电荷约 0.0756 e，介电张量元素约 0.2478。主文还展示了 10M 参数模型在速度和精度间的折中，1.3B 参数模型进一步降低自由能误差，说明多任务材料基础模型仍有可预期的 scaling 空间。

#### 🧪 练习题

```yaml
question: "MatterSim-MT 相比只预测能量、力、应力的普通机器学习势，最重要的能力扩展是什么？"
options:
  - "只用更少数据拟合相同的势能面"
  - "通过多任务头预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵，从而模拟 PES 之外的电子响应现象"
  - "完全取消周期边界条件以处理分子体系"
  - "用手写经验势替代 Transformer 主干"
answer: 1
explain: "普通 MLIP 主要描述势能面，难以直接处理极化、介电响应、LO-TO splitting 或氧化态演化。MatterSim-MT 的多任务输出补上了这些物理量。"
```
