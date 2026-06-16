### MatterSim-MT - 多任务材料模拟基础模型

```yaml
id: mattersim_mt
name: MatterSim-MT
full_name: "多任务材料模拟基础模型 (MatterSim-MT)"
year: "2026.05"
org: 微软亚洲研究院
paper_url: "https://www.microsoft.com/en-us/research/publication/mattersim-mt-a-multi-task-foundation-model-for-in-silico-materials-characterization/"
category: representation
parent: unimol
motivation: "3500万DFT数据预训练，支持极端温压环境模拟"
```

#### 📝 一句话总结

MatterSim-MT 提出一个面向材料结构、动力学、热力学和多物性表征的多任务基础模型，通过 3500 万级第一性原理标注结构预训练和 GeoMFormer 双流 Transformer 架构，解决传统机器学习势只能建模势能面、难以模拟电荷、介电和极化等现象的问题。

#### 🎯 核心要点

- **大规模第一性原理材料数据**：覆盖 89 种元素，训练结构超过 3500 万个，包含最高 5000 K、最高 1000 GPa 的非平衡构型
- **主动学习材料探索器**：用 ground-state explorer 与 off-equilibrium explorer 选择高信息量结构，减少高成本 DFT 标注浪费
- **GeoMFormer 双流架构**：同时维护 invariant 标量特征和 equivariant 向量特征，通过自注意力与跨流注意力交换几何信息
- **材料图建模**：在周期性边界条件下构造 cutoff 邻接图，显式输入原子种类、坐标、相对位移、晶格和温压状态变量
- **多任务预测头**：联合预测能量、力、应力、磁矩、Bader 电荷、Born 有效电荷和介电矩阵
- **物理先验约束**：标量性质保持平移/旋转不变，力等向量性质保持 SE(3) 等变，并通过能量梯度保证力的保守性
- **多尺度模型扩展**：论文报告 1M、10M、220M、1.3B 参数版本，验证误差随数据和模型规模继续下降
- **超越势能面模拟**：支持 LO-TO 声子劈裂、BaTiO3 铁电滞回、Li-rich 正极脱锂氧化还原等仅靠能量/力无法描述的过程

#### 🔬 深入细节

![MatterSim-MT 总体框架](https://arxiv.org/html/2605.07927v1/x1.png)
*图：MatterSim-MT 的数据探索、双流 Transformer 表征和多任务性质预测框架。*

![MatterSim-MT 多任务能力](https://arxiv.org/html/2605.07927v1/x3.png)
*图：多任务输出使模型能够模拟 LO-TO 声子劈裂、铁电极化滞回和电池材料氧电荷演化。*

##### 算法伪代码

```python
# MatterSim-MT 训练流程伪代码
def mattersim_mt_step(structure, dft_labels):
    # 1. 周期性材料图
    graph = build_periodic_graph(
        atomic_numbers=structure.Z,
        positions=structure.R,
        lattice=structure.L,
        state=[structure.temperature, structure.pressure],
        cutoff=r_c,
    )

    # 2. 嵌入：标量 invariant stream + 向量 equivariant stream
    x = atom_embedding(graph.Z) + centrality_embedding(graph.edges)
    e = equivariant_embedding(graph.relative_vectors)

    # 3. GeoMFormer Transformer blocks
    for block in geomformer_blocks:
        x = block.inv_self_attention(x, graph.edges)
        e = block.equ_self_attention(e, graph.relative_vectors)
        x = block.inv_cross_attention(query=x, key_value=e)
        e = block.equ_cross_attention(query=e, key_value=x)
        x, e = block.gated_ffn(x, e)

    # 4. 多任务头
    E = energy_head(mean_pool(x))
    F = -gradient(E, structure.R)
    stress = -cell_gradient(E, structure.L)
    bader = atom_scalar_head(x, task="bader_charge")
    magnetic = atom_scalar_head(x, task="magnetic_moment")
    born = tensor_head(x, e, task="born_effective_charge")
    dielectric = tensor_head(x, e, task="dielectric_matrix")

    # 5. 加权多任务 MAE
    loss = mae(E, dft_labels.energy_per_atom)
    loss += w_f * mae(F, dft_labels.forces)
    loss += w_s * mae(stress, dft_labels.stress)
    loss += w_bader * mae(bader, dft_labels.bader_charge)
    loss += w_mag * mae(magnetic, dft_labels.magnetic_moment)
    loss += w_born * mae(born, dft_labels.born_effective_charge)
    loss += w_eps * mae(dielectric, dft_labels.dielectric_matrix)
    return loss
```

##### 动机与背景

通用机器学习势能模型通常只学习势能面：输入原子结构，输出能量、力和应力。这对结构弛豫、分子动力学和相稳定性已经很有用，但许多材料表征问题并不只由势能面决定。例如极性晶体的 LO-TO 声子劈裂需要 Born 有效电荷和介电张量，铁电开关需要原子位移和宏观极化之间的耦合，电池正极中的阴离子氧化还原需要电荷和磁性演化。MatterSim-MT 的核心问题就是：能否用一个统一原子表征同时覆盖势能面和这些额外物性。

论文将输入结构表示为周期性材料图：

$$
\mathcal{G} = (\boldsymbol{Z}, \boldsymbol{V}, \boldsymbol{R}, [\boldsymbol{L}, \boldsymbol{S}])
$$

其中 \(\boldsymbol{Z}\) 是原子种类和原子特征，\(\boldsymbol{R}\) 是三维坐标，\(\boldsymbol{V}\) 是原子对相对位移，\(\boldsymbol{L}\) 是晶格矩阵，\(\boldsymbol{S}\) 可包含温度、压力等全局状态变量。边由 cutoff 半径内的原子对构成，并通过周期性镜像原子处理晶体边界条件。

##### GeoMFormer 双流机制

MatterSim-MT 采用受 GeoMFormer 启发的双流 Transformer。第一条流学习 invariant 标量特征 \(x_i\)，用于能量、电荷、磁矩等不随整体旋转而变化的性质；第二条流学习 equivariant 向量特征 \(e_i\)，用于保留方向信息，使模型能处理力、张量和几何响应。

嵌入阶段包含三类信息：

- 原子嵌入：由原子序数 \(Z_i\) 初始化
- 空间关系嵌入：用邻居数量、距离和 cutoff 权重编码局部环境
- 等变特征嵌入：由相对方向 \(\boldsymbol{r}_{ij}/\|\boldsymbol{r}_{ij}\|\) 初始化

在每个 Transformer block 内，模型执行 invariant self-attention、equivariant self-attention、invariant cross-attention 和 equivariant cross-attention。直观上，self-attention 在同一特征类型内聚合邻域信息，cross-attention 则让标量化学环境和向量几何方向互相校正。

> 💡 关键：普通 Transformer 的 token 位置是序列位置；MatterSim-MT 的 token 是周期晶体中的原子，因此注意力必须同时尊重 cutoff 邻接、周期镜像、旋转等变和能量守恒。

##### 任务头与损失函数

最终 Transformer block 输出每个原子的 \(x_i^N\) 和 \(e_i^N\)。对于能量、Bader 电荷和磁矩，模型用标量头预测：

$$
p_i = W_2 \sigma(W_1 f_{LN}(x_i^{N+1}))
$$

其中 \(f_{LN}\) 是 layer normalization，\(\sigma\) 是 GELU。能量任务对原子级输出做 pooling；Bader 电荷和磁矩保留为原子级预测。Born 有效电荷和介电矩阵是张量性质，论文采用类似 ETGNN 的张量头，将标量和等变特征组合成满足物理对称性的输出。

训练损失是多任务加权 MAE：

$$
L = l(e, e_{\mathrm{DFT}}) + \omega_f l(\boldsymbol{f}, \boldsymbol{f}_{\mathrm{DFT}})
  + \omega_\sigma l(\boldsymbol{\sigma}, \boldsymbol{\sigma}_{\mathrm{DFT}})
  + \sum_{i=1}^{4}\omega_{t_i}l(\boldsymbol{p}_{t_i}, \boldsymbol{p}_{t_i,\mathrm{DFT}})
$$

其中 \(e\) 是每原子能量，\(\boldsymbol{f}\) 是原子力，\(\boldsymbol{\sigma}\) 是应力张量，四个辅助任务 \(t_i\) 分别对应磁矩、Bader 电荷、Born 有效电荷和介电矩阵。

能量和力之间的关系通过梯度保持：

$$
\boldsymbol{F}_i = -\frac{\partial E}{\partial \boldsymbol{r}_i}
$$

这比直接用独立头预测力更符合保守力场要求，也让分子动力学模拟中的能量一致性更好。

##### 主动学习与数据覆盖

MatterSim-MT 的数据不是简单收集平衡晶体结构，而是由材料探索器主动扩展。ground-state explorer 关注近稳态结构，off-equilibrium explorer 通过 NPT 分子动力学采样高温高压构型。补充材料说明 off-equilibrium 采样覆盖 300、1000、2000、5000 K 和 0、200、500、800、1000 GPa 等设置，最终得到比 MPF2021、MPtrj、Alexandria、OMat24 更宽的构型分布。

辅助性质数据规模远小于能量/力/应力主数据：Bader 电荷约 17.2 万结构，Born 有效电荷和介电矩阵约 3051 个结构，磁矩约 28.4 万结构。多任务训练的价值在于让这些稀疏高成本标签共享 3500 万结构预训练出的统一原子表征。

##### 与传统方法的区别

| 维度 | 传统 DFT | 通用 ML 势 | MatterSim-MT |
|---|---|---|---|
| 主要输出 | 能量、力、应力和多种电子性质 | 多数只输出能量、力、应力 | 同时输出势能面和多种物性 |
| 成本 | 高 | 低 | 低 |
| 泛化范围 | 由计算设置决定 | 常受数据温压范围限制 | 覆盖 89 元素、高温高压与非平衡构型 |
| 极化/介电模拟 | 可做但昂贵 | 通常不支持 | 通过 BEC 和介电矩阵支持 |
| 新体系适配 | 重新计算成本高 | 需补充训练 | 可用不确定性主动学习和微调 |

MatterSim-MT 的关键贡献不是单纯提高力场精度，而是把材料模拟从“只预测势能面”扩展到“统一预测多种第一性原理物性”。这使模型可以直接服务于声子、相图、铁电、电池等需要多物理量耦合的真实材料工作流。

#### 🧪 练习题

```yaml
question: "MatterSim-MT 相比只预测能量/力/应力的通用机器学习势，最关键的扩展是什么？"
options:
  - "把所有材料结构都转换成 SMILES 序列"
  - "联合预测 Bader 电荷、磁矩、Born 有效电荷和介电矩阵等额外物性"
  - "只在零温零压的平衡结构上训练"
  - "用规则模板枚举所有可能晶体结构"
answer: 1
explain: "这些额外物性让模型能够模拟 LO-TO 声子劈裂、铁电滞回和电荷转移等仅靠势能面无法描述的现象。"
```
