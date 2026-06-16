### eSEN — 等变光滑能量网络 (equivariant Smooth Energy Network)

```yaml
id: esen
name: eSEN
full_name: "等变光滑能量网络 (equivariant Smooth Energy Network)"
year: "2025"
org: Meta FAIR
paper_url: "https://arxiv.org/abs/2502.12147"
category: mlip
parent: mace
motivation: "光滑势能面确保长程能量守恒"
```

#### 📝 一句话总结

eSEN 提出一种以能量守恒和势能面平滑性为核心约束的等变 MLIP，通过保守力输出、非离散化球谐表示、cutoff envelope 和直接力预训练后保守微调，让静态测试误差更可靠地转化为材料稳定性、热导率和声子等物理性质预测能力。

#### 🎯 核心要点

- **问题重定义**：指出低 energy/force test error 不一定意味着下游物性好，必须测试 NVE MD 中的实际能量守恒能力
- **保守力设计**：最终力由 \(\mathbf{F}=-\nabla_{\mathbf{r}}E\) 得到，而不是用独立 direct-force head，避免能量和力不一致
- **等变球谐表示**：节点 embedding 是 multi-channel spherical harmonics representation，支持旋转等变的几何消息传递
- **Edgewise Convolution**：拼接 source/target 节点表示，使用两层 SO(2) convolution 和中间非线性，并在边消息上加入 envelope function
- **Nodewise FFN 不离散化**：用 equivariant linear + SiLU gated nonlinearity，避免把球谐通道投影到离散网格造成采样误差
- **平滑 PES 三原则**：不设最大邻居数、使用距离 cutoff 内所有邻居、在 cutoff 处让边消息及其导数平滑衰减
- **训练策略**：先用 direct-force head 高效预训练，再移除 force head，切换到保守力目标进行 fine-tuning
- **物性基准**：在 Matbench-Discovery、MDR Phonon、thermal conductivity 和 SPICE-MACE-OFF 等任务上展示强物性预测表现

#### 🔬 深入细节

![eSEN 模型架构图](https://ar5iv.labs.arxiv.org/html/2502.12147/assets/x2.png)
*图：eSEN Figure 2，左侧是总体架构，右侧是 Edgewise Convolution。最终 \(L=0\) 节点特征预测原子能量，总能量求和后通过反向传播得到力和应力。开放版本见 arXiv:2502.12147。*

##### 算法伪代码

```python
# eSEN 核心流程伪代码
for batch in dataset:
    graph = radius_graph(batch.positions, cutoff=6.0, keep_all_neighbors=True)
    h = embed_as_spherical_harmonics(batch.atomic_numbers)

    for layer in range(num_layers):
        messages = []
        for edge in graph.edges:
            i, j = edge.source, edge.target
            r_ij = batch.positions[j] - batch.positions[i]
            radial = radial_basis(norm(r_ij))
            envelope = polynomial_envelope(norm(r_ij), cutoff=6.0)

            z = concat(h[i], h[j], radial)
            m_ij = so2_conv(z, r_ij)
            m_ij = gated_silu(m_ij)
            m_ij = so2_conv(m_ij, r_ij) * envelope
            messages.append((j, m_ij))

        h = h + aggregate_equivariant(messages)
        h = h + nodewise_equivariant_ffn(layer_norm(h))  # no grid discretization

    atom_energy = scalar_energy_head(select_L0_channels(h))
    energy = atom_energy.sum()
    force = -grad(energy, batch.positions)
    stress = grad(energy, batch.cell_strain) / batch.volume

    loss = energy_weight * mae(energy_per_atom, dft_energy_per_atom)
    loss += force_weight * l2(force, dft_force)
    loss += stress_weight * mae(stress, dft_stress)
    optimizer.step(loss)
```

##### 动机：为什么静态误差不够

很多 MLIP 论文主要报告 held-out DFT 构型上的能量、力和应力误差，但真实材料工作流更常见的是结构弛豫、MD、热导率、声子和自由能计算。这些任务会反复调用势能面，并依赖一阶、二阶甚至三阶导数。一个模型即使在随机测试集上力误差很低，如果势能面局部不连续、力不是能量梯度，仍可能在 NVE MD 中产生能量漂移，在声子计算中出现虚频或错误声学支。

eSEN 先把评价标准拉回物理约束：保守力场在闭合路径上做功应为 0：

$$
\oint \mathbf{F}\cdot d\mathbf{r}=0
$$

如果力来自势能面梯度，则满足：

$$
\mathbf{F} = -\nabla_{\mathbf{r}}E(\mathbf{r}, \mathbf{a})
$$

对于周期体系，应力也来自能量对晶格或应变的导数。论文进一步用 Verlet 积分的能量漂移界解释平滑性的重要性：

$$
\left|E(\mathbf{r}_T,\mathbf{a})-E(\mathbf{r}_0,\mathbf{a})\right|
\leq C\Delta t^2 + C_N\Delta t^N T
$$

这里高阶导数是否连续且有界，会影响常数 \(C_N\) 和长期能量漂移。于是 eSEN 把“给定时间步长下能否实际守恒能量”作为设计 MLIP 的筛选标准。

##### 架构：edgewise + nodewise 的等变消息传递

eSEN 的节点表示是 spherical harmonics channels，既包含标量 \(L=0\) 通道，也包含向量/高阶张量通道，因此能在旋转下保持等变。每个 layer block 由两个部分组成：先做 Edgewise Convolution，把邻居关系上的方向和距离信息注入节点；再做 Nodewise Feed-Forward Network，对每个节点的等变表示做非线性变换。

Edgewise Convolution 借鉴 eSCN 的 SO(2) convolution，但做了两处关键修改：第一，先拼接 source 和 target node embedding，让边消息同时看到发送端与接收端；第二，在两层 SO(2) convolution 中间加入非线性，并把 envelope function 乘到边消息上。可抽象为：

$$
\mathbf{m}_{ij} =
\eta(r_{ij})
\cdot
\mathrm{SO2Conv}_2\left(
\psi\left(
\mathrm{SO2Conv}_1(
\mathbf{h}_i \Vert \mathbf{h}_j \Vert \rho(r_{ij}), \hat{\mathbf{r}}_{ij}
)
\right),
\hat{\mathbf{r}}_{ij}
\right)
$$

其中 \(\rho(r_{ij})\) 是径向基函数，\(\eta(r_{ij})\) 是 cutoff envelope，\(\psi\) 是等变非线性。节点更新可写成：

$$
\mathbf{h}_i^{t+1}
=
\mathbf{h}_i^t
+ \sum_{j\in\mathcal{N}(i)} \mathbf{m}_{ij}
+ \mathrm{FFN}_{\mathrm{eq}}\left(\mathrm{LN}_{\mathrm{eq}}(\mathbf{h}_i^t)\right)
$$

这种结构类似 Transformer/Equiformer 的残差 block，但 eSEN 特意简化并约束 nodewise 处理，减少会破坏平滑性和等变性的操作。

##### 为什么不做网格离散化

eSCN 和 EquiformerV2 中常见做法是把球谐通道投影到球面离散网格，在网格上做 pointwise nonlinearity 或 \(1\times1\) convolution，再投回球谐空间。这个做法表达力强，但非线性可能产生超出当前球谐截断频率的高频信号，离散采样会引入 aliasing，从而破坏严格等变性和能量守恒。

eSEN 的 nodewise FFN 直接在球谐表示中使用 equivariant linear layers 和 SiLU-based gated nonlinearity，不经过离散网格。直观上，它牺牲了一部分网格非线性的自由度，换取更干净的连续表示和更稳定的势能导数。论文的 ablation 显示，表示离散化会影响 MD 能量守恒，尤其在下游声子和热性质任务中放大。

##### 平滑势能面的工程细节

eSEN 关注的不是单个漂亮的公式，而是一组会共同决定 PES 连续性的选择。

第一，图构建不用最大邻居数限制。固定最近 \(K\) 个邻居虽然能降低计算量，但当两个邻居距离排序发生微小交换时，边集合会跳变，势能面出现不连续。eSEN 使用 \(6\ \text{\AA}\) 距离 cutoff 内的所有邻居。

第二，边消息乘上 envelope function。没有 envelope 时，径向基函数在 cutoff 处被硬截断，边突然消失；使用 envelope 后，消息值以及位置导数在 \(r\to r_{\mathrm{cut}}\) 时趋近 0：

$$
\lim_{r\to r_{\mathrm{cut}}}\eta(r)=0,
\qquad
\lim_{r\to r_{\mathrm{cut}}}\frac{d\eta(r)}{dr}=0
$$

第三，力必须来自能量梯度。eSEN 可以利用 direct-force 训练的效率，但最终用于物性预测的模型会去掉 direct-force head，采用保守力 fine-tuning。最终输出为：

$$
E = \sum_i \epsilon_i(\mathbf{h}_{i,L=0}^{T}),
\qquad
\mathbf{F}_i=-\frac{\partial E}{\partial \mathbf{r}_i},
\qquad
\boldsymbol{\sigma}=\frac{1}{V}\frac{\partial E}{\partial \boldsymbol{\varepsilon}}
$$

##### 损失函数与训练流程

论文的训练目标包含 per-atom energy MAE、force \(l_2\) loss 和 stress MAE，可概括为：

$$
\mathcal{L} =
\lambda_E \left|\frac{\hat{E}}{N}-\frac{E}{N}\right|
+ \lambda_F \frac{1}{3N}\sum_i \left\|\hat{\mathbf{F}}_i-\mathbf{F}_i\right\|_2^2
+ \lambda_{\sigma}\left\|\hat{\boldsymbol{\sigma}}-\boldsymbol{\sigma}\right\|_1
$$

对 MPTrj 这类大材料数据，eSEN-30M 采用 direct-force pre-training 与 conservative fine-tuning 的两阶段策略：先用直接力头提高训练吞吐并学习有用表示，再移除直接力头，用 \( -\nabla E \) 形式微调。论文报告这种策略比从零开始训练保守模型更快，并能保留下游物性需要的能量守恒属性。

> 💡 关键：eSEN 不是简单“更大的等变网络”，而是把可微势能面的连续性、导数有界性和保守力约束当作架构目标来优化。

##### 与 MACE、EquiformerV2、direct-force 模型的区别

MACE 和许多等变 MLIP 也从能量求导得到力，因此天然适合保守力场；eSEN 的差异在于系统分析了为什么某些高表达等变设计仍会在 MD 中漂移，并把“不离散化表示、cutoff 处平滑、无邻居数跳变”作为一组架构约束。与 EquiformerV2/Orb 这类高效 direct-force 模型相比，eSEN 训练更重，但在声子、热导率和长时间 MD 这类依赖势能面高阶导数的任务中更稳。它的代价是反向求力增加计算成本，且无最大邻居数限制会提高稠密结构中的边数。

#### 🧪 练习题

```yaml
question: "eSEN 为什么最终使用 F = -∇E 的保守力形式，而不只依赖 direct-force head？"
options:
  - "因为 direct-force head 无法预测任何力"
  - "因为保守力保证力与同一个势能面一致，更适合 MD、声子和热性质计算"
  - "因为保守力可以完全避免训练能量标签"
  - "因为 direct-force head 只能用于分子，不能用于晶体"
answer: 1
explain: "Direct-force 模型可能让力与能量不一致并产生能量漂移；eSEN 用能量梯度得到力，使势能面及其导数更符合下游物性计算要求。"
```
