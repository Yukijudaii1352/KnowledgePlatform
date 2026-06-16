### CHGNet — 电荷感知图网络 (Charge-informed Graph Network)

```yaml
id: chgnet
name: CHGNet
full_name: "电荷感知图网络 (Charge-informed Graph Network)"
year: "2023"
org: Berkeley
paper_url: "https://www.nature.com/articles/s42256-023-00716-3"
category: mlip
parent: m3gnet
motivation: "引入磁矩区分氧化态"
```

#### 📝 一句话总结

CHGNet 在晶体图神经网络势能面中加入磁矩监督，把局域磁矩作为氧化态和轨道占据的代理信号，从而在只输入原子种类与位置时同时预测能量、力、应力和电荷态相关信息。它解决了通用 MLIP 难以区分同元素不同价态、难以模拟离子重排与电子态耦合的问题。

#### 🎯 核心要点

- **电荷感知 MLIP**：通过预测 site-wise magnetic moments regularize 原子隐藏表示，使模型学到与氧化态、局域电子占据相关的特征
- **多图结构**：把周期晶体构成 atom graph，同时用 bond graph 表示三体角度关系，显式更新 atom、bond、angle 三类 embedding
- **平滑距离与角度基函数**：键长用 SmoothRBF 展开并在 cutoff 处令值和导数趋零，角度用 Fourier basis 展开
- **Interaction block**：每个 block 依次做 AtomConv、BondConv、AngleUpdate，用 gated MLP 和距离权重聚合邻域消息
- **保守力场输出**：总能量由原子级能量贡献求和得到，力和应力通过对能量自动微分得到，保证力与势能一致
- **多任务损失**：同时拟合 DFT energy、force、stress 和 magmom，使用加权 Huber loss，其中 magmom loss 直接约束 latent space
- **MPtrj 预训练数据**：使用 Materials Project Trajectory Dataset，包含约 1.58M 结构、49.3M 力标签、14.2M 应力标签和 7.94M 磁矩标签
- **应用场景**：用于 Li_xMnO2 相变与价态演化、Li_xFePO4 有限温相图、石榴石型固态电解质 Li 扩散等 charge-coupled 模拟

#### 🔬 深入细节

![CHGNet 模型架构图](https://ar5iv.labs.arxiv.org/html/2302.14231/assets/x1.png)
*图：CHGNet Figure 1，展示从未知电荷晶体输入，到 atom graph / bond graph、interaction blocks、magmom head、energy/force/stress 输出的完整流程。开放版本见 arXiv:2302.14231。*

##### 算法伪代码

```python
# CHGNet 核心训练/推理流程伪代码
for structure in dataset:
    atom_graph = build_periodic_atom_graph(structure, cutoff=5.0)
    bond_graph = build_bond_graph(atom_graph, angle_cutoff=3.0)

    v = embed_atomic_number(structure.Z)              # atom features
    e = smooth_rbf_expand(atom_graph.distances)       # bond features
    a = fourier_expand(bond_graph.angles)             # angle features

    for t in range(3):
        v = v + atom_conv(v, e, atom_graph)
        e = e + bond_conv(e, a, v, bond_graph)
        a = a + angle_update(e, a, v, bond_graph)

    magmom_pred = linear_magmom_head(v)               # charge-state constraint
    v = v + atom_conv(v, e, atom_graph)               # final atom-only conv

    site_energy = mlp_energy_head(v)
    energy_pred = site_energy.sum()
    force_pred = -grad(energy_pred, structure.positions)
    stress_pred = grad(energy_pred, strain) / volume

    loss = huber(energy_pred, energy_dft)
    loss += w_f * huber(force_pred, force_dft)
    loss += w_s * huber(stress_pred, stress_dft)
    loss += w_m * huber(abs(magmom_pred), abs(magmom_dft))
    optimizer.step(loss)
```

##### 动机与背景

传统经验力场通常需要预先给定原子电荷或固定价态，无法可靠处理过渡金属氧化物中随局域环境变化的价态；DFT/AIMD 可以显式处理电子结构，但计算量限制了纳秒级、大体系的相变、离子迁移和降解模拟。早期通用 MLIP 虽能从结构学习势能面，但如果只把原子种类和几何邻域作为输入，同一个元素的不同氧化态往往被压到相近的表示里。

CHGNet 的关键判断是：在自旋极化 DFT 中，局域磁矩与未成对电子数、轨道占据和过渡金属价态高度相关。与直接学习 Bader charge 或完整电荷密度相比，magmom 标签更容易从 Materials Project 的计算轨迹中大规模获得，也更能区分许多异价离子的化学行为。因此 CHGNet 不把电荷作为输入，而是在中间层预测磁矩，让隐藏表示被电荷态信息约束。

##### 图构建与基函数展开

CHGNet 首先在周期晶体中以默认 \(r_{\mathrm{cut}}=5\ \text{\AA}\) 构造 atom graph，边表示 cutoff 内的近邻原子对；再以 bond 为节点构造 bond graph，用于表示 \((i,j,k)\) 三体角度。距离和角度不是直接作为标量输入，而是展开成可学习的平滑基：

$$
\tilde{e}_{ij,n} =
\sqrt{\frac{2}{r_{\mathrm{cut}}}}
\frac{\sin(n\pi r_{ij}/r_{\mathrm{cut}})}{r_{ij}}
\odot u(r_{ij})
$$

$$
a_{ijk,\ell} =
\begin{cases}
\frac{1}{\sqrt{2\pi}}, & \ell=0 \\
\frac{1}{\sqrt{\pi}}\cos(\ell\theta_{ijk}), & 1\leq \ell\leq N \\
\frac{1}{\sqrt{\pi}}\sin((\ell-N)\theta_{ijk}), & N<\ell\leq 2N
\end{cases}
$$

其中 \(u(r_{ij})\) 是 polynomial envelope，使距离基函数及其导数在 cutoff 处平滑衰减到 0。这个设计对 MLIP 很关键：如果邻居消息在截断半径处突然消失，势能面对原子位移会出现不连续，力和声子等导数性质会变差。

##### Atom-Bond-Angle 交互块

每个 interaction block 显式更新三类状态：原子特征 \(v_i^t\)、键特征 \(e_{ij}^t\)、角特征 \(a_{ijk}^t\)。核心更新可概括为：

$$
v_i^{t+1} =
v_i^{t} +
L_v^t\left[
\sum_j \tilde{e}_{ij}\cdot
\phi_v^t(v_i^t \Vert v_j^t \Vert e_{ij}^t)
\right]
$$

$$
e_{jk}^{t+1} =
e_{jk}^{t} +
L_e^t\left[
\sum_i \tilde{e}_{ij}\cdot\tilde{e}_{jk}\cdot
\phi_e^t(e_{ij}^t \Vert e_{jk}^t \Vert a_{ijk}^t \Vert v_j^{t+1})
\right]
$$

$$
a_{ijk}^{t+1} =
a_{ijk}^{t} +
\phi_a^t(e_{ij}^{t+1}\Vert e_{jk}^{t+1}\Vert a_{ijk}^t\Vert v_j^{t+1})
$$

这里 \(\Vert\) 表示拼接，\(L\) 是线性层，\(\phi\) 是 gated MLP：

$$
\phi(x)=
\sigma(L_{\mathrm{gate}}(x))\odot
\mathrm{SiLU}(L_{\mathrm{core}}(x))
$$

直观上，AtomConv 让中心原子吸收邻居原子和键长信息；BondConv 让一条键看到相邻键和夹角，从而注入三体几何；AngleUpdate 则持续更新角度通道。与 M3GNet 中通过三体球谐特征更新键不同，CHGNet 把 atom、bond、angle 都作为显式 embedding 流动，便于在同一 message passing 过程中携带几何和电荷态约束。

##### 磁矩如何成为电荷态约束

CHGNet 在三个 interaction blocks 后用线性头预测每个原子的磁矩：

$$
m_i = L_m(v_i^3)
$$

这一步不是附加的可解释性输出，而是训练目标的一部分。因为最终能量头使用的是继续更新后的 \(v_i^4\)，而 \(v_i^4\) 由已被 magmom loss 约束过的 \(v_i^3\) 生成，所以能量、力和应力预测都会受到电荷态信息的间接约束。论文在 Na\(_2\)V\(_2\)(PO\(_4\))\(_3\) 中展示，V 离子的隐藏表示会按 V\(^{3+}\)/V\(^{4+}\) 分群；在 Li\(_x\)MnO\(_2\) 的长时间 MD 中，Mn 的磁矩分布可追踪 Mn\(^{2+}\)、Mn\(^{3+}\)、Mn\(^{4+}\) 的演化。

> 💡 关键：CHGNet 没有要求用户先提供氧化态或电荷标签；它从结构出发预测 magmom，再把这个预测任务作为 latent regularization，使同元素不同价态在隐藏空间中可分。

##### 能量、力、应力与训练损失

最终总能量由原子级能量贡献求和：

$$
E_{\mathrm{tot}} =
\sum_i L_3\circ g\circ L_2\circ g\circ L_1(v_i^4)
$$

力和应力不是独立预测头，而是从能量自动微分得到：

$$
\mathbf{f}_i = -\frac{\partial E_{\mathrm{tot}}}{\partial \mathbf{x}_i},
\qquad
\boldsymbol{\sigma} =
\frac{1}{V}\frac{\partial E_{\mathrm{tot}}}{\partial \boldsymbol{\varepsilon}}
$$

这种势能导数式输出保证了力场的保守性，也让结构弛豫、MD 和声子相关任务更物理一致。训练时使用 \(\delta=0.1\) 的 Huber loss：

$$
\mathcal{H}(x,\hat{x}) =
\begin{cases}
0.5(x-\hat{x})^2, & |x-\hat{x}|<\delta \\
\delta(|x-\hat{x}|-0.5\delta), & \mathrm{otherwise}
\end{cases}
$$

总损失为：

$$
\mathcal{L} =
\mathcal{H}(E,\hat{E})
+ w_f\mathcal{H}(\mathbf{f},\hat{\mathbf{f}})
+ w_{\sigma}\mathcal{H}(\boldsymbol{\sigma},\hat{\boldsymbol{\sigma}})
+ w_m\mathcal{H}(m,\hat{m})
$$

论文设置 \(w_f=1\)、\(w_{\sigma}=0.1\)、\(w_m=0.1\)。能量项让模型学习势能面高度，力项约束一阶导数，应力项约束晶胞形变响应，磁矩项则把电子态信息压入原子表示。四个原子卷积层叠加后，论文称预训练 CHGNet 可用较低计算成本覆盖约 \(20\ \text{\AA}\) 的长程相互作用范围。

##### 与传统 MLIP 的区别

普通 GNN-MLIP 往往只把隐藏表示用于能量回归，电子态差异只能从几何环境中隐式推断；CHGNet 则把磁矩作为可监督的中间物理量，显式区分异价离子。与需要预先赋电荷的经验 charge equilibration 方法相比，CHGNet 的 charge-decorated structure 是模型从结构中推断出来的，适合在 MD 中追踪价态随时间变化。它的限制也很明确：magmom 作为 charge proxy 对非磁性体系、强共价体系或 DFT 自旋设置敏感，且最终准确性依赖 MPtrj 中磁矩标签的覆盖和一致性。

#### 🧪 练习题

```yaml
question: "CHGNet 中 magnetic moment 监督最核心的作用是什么？"
options:
  - "把晶体结构转换成固定大小的分子指纹"
  - "作为局域电荷态和轨道占据的代理信号，约束原子隐藏表示"
  - "替代能量标签，使模型不需要训练势能面"
  - "只用于可视化，不参与损失函数"
answer: 1
explain: "CHGNet 在中间层预测 site-wise magmom，并把它加入训练损失，使隐藏表示携带氧化态/电荷态信息，再用于能量、力和应力预测。"
```
