### AlphaFold 3 — 扩散式全生物分子复合物结构预测

```yaml
id: alphafold3
name: AlphaFold 3
full_name: AlphaFold 3 (AlphaFold 3)
year: '2024.05'
org: Google DeepMind
paper_url: https://www.nature.com/articles/s41586-024-07487-w
category: protein_structure
parent: alphafold2
motivation: 扩散模型预测全生物分子相互作用
```

#### 📝 一句话总结

AlphaFold 3 将 AlphaFold2 的蛋白质折叠框架扩展为统一的全原子生物分子复合物预测模型，用 Pairformer 表征任意分子实体之间的关系，并用扩散模块直接生成蛋白质、核酸、小分子、离子和修饰残基的联合三维结构。

#### 🎯 核心要点

- **统一生物分子输入**：支持蛋白质、DNA、RNA、小分子配体、离子、糖基化和共价修饰残基等接近 PDB 全覆盖的化学实体
- **Token/atom 双层表示**：聚合物按残基 token 建模，小分子/离子按原子或化学组件建模；atom attention 在细粒度原子层编码局部化学结构
- **Pairformer 替代 Evoformer 主干**：弱化 MSA 处理，只保留简化 MSA module；主体为 48 个 Pairformer block，维护 single representation 和 pair representation
- **扩散结构模块**：不再使用 AF2 的残基框架和 side-chain torsion 解码，而是从噪声原子云开始迭代去噪，直接预测 raw atom coordinates
- **多样本生成与排序**：推理时通常运行 5 个 model seeds，每个 seed 采样 5 个 diffusion samples，共 25 个候选，再按 confidence 选择最优结构
- **全复合物置信度**：输出 pLDDT、PAE、PDE、pTM、ipTM 等置信度，用于评估链内、链间和配体口袋局部可靠性
- **训练策略更新**：包含 PDB 数据、蒸馏数据、空间/界面 crop、初训与两阶段 fine-tuning；训练 crop size 从 384 扩展到 640 和 768 tokens
- **性能提升**：在蛋白-配体、蛋白-核酸、抗体-抗原等任务上显著优于多个专用工具，展示了单一深度学习框架跨生物分子空间建模的可行性

#### 🔬 深入细节

##### 核心架构图

![AlphaFold 3 架构与训练细节](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig2_HTML.png)
*图：AlphaFold 3 的 Pairformer、diffusion module 与训练设置。图 2a 展示 Pairformer block；图 2b 展示 diffusion module；图 2c 展示训练中 mini diffusion rollout、chain permutation 和 confidence heads。*

![AlphaFold 3 跨分子类型预测与推理流程](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig1_HTML.png)
*图：AlphaFold 3 在蛋白-配体、蛋白-核酸、蛋白-蛋白等复合物上的性能示意，以及 inference architecture：输入特征经 template/MSA/input embedder、Pairformer 和 diffusion module 生成坐标，再由 confidence module 排序。*

##### 推理伪代码

```python
# AlphaFold 3 推理流程伪代码
def alphafold3_predict(entities, covalent_bonds=None, num_seeds=5, samples_per_seed=5):
    """
    entities: 蛋白、DNA、RNA、小分子、离子、修饰残基等分子实体
    covalent_bonds: 用户给定或 CCD 推断的共价连接信息
    """
    # 1. 数据管线：遗传搜索、模板搜索、小分子 conformer、CCD 化学组件特征
    input_features = featurize_entities(entities, covalent_bonds)
    msa_features = genetic_search(input_features.protein_or_rna_chains)
    template_features = template_search(input_features.polymer_chains)
    conformers = generate_ligand_conformers(input_features.ligands)

    # 2. 输入嵌入：构造 single 与 pair 表征，加入原子级局部化学信息
    single, pair = InputEmbedder(input_features, msa_features, template_features, conformers)
    single, pair = AtomAttentionEncoder(single, pair, input_features.atom_features)

    # 3. 简化 MSA module + 48-block Pairformer
    pair = MSAModule(msa_features, pair)  # 只把 MSA 信息注入 pair，不保留完整 MSA 表征
    for block in range(48):
        pair = TriangleMultiplication(pair)
        pair = TriangleAttention(pair)
        single = SingleAttentionWithPairBias(single, pair)
        single, pair = Transition(single, pair)

    ranked = []
    for seed in range(num_seeds):
        for sample in range(samples_per_seed):
            # 4. 从高噪声原子云开始扩散去噪
            x = normal_noise_like_atoms(input_features.atoms, sigma_max=160.0)
            for sigma_t, sigma_next in noise_schedule():
                conditioning = DiffusionConditioning(single, pair, sigma_t)
                x0_hat = DiffusionModule(x, conditioning, sigma_t)
                x = diffusion_update(x, x0_hat, sigma_t, sigma_next)

            # 5. confidence heads 评估并排序
            conf = ConfidenceModule(single, pair, x)
            ranked.append((conf.rank_score, x, conf))

    return max(ranked, key=lambda item: item[0])
```

##### 动机：从“蛋白质结构”到“生物分子相互作用”

AlphaFold2 的成功主要覆盖蛋白单体与部分蛋白复合物；AlphaFold-Multimer 进一步强化了蛋白-蛋白相互作用。但细胞中的结构生物学问题往往不是“一个蛋白折成什么样”，而是“多种分子如何结合”：转录因子结合 DNA，小分子药物结合蛋白口袋，RNA 与蛋白形成 RNP 复合物，糖基化和磷酸化改变界面几何，金属离子稳定活性中心。

传统工具通常按任务拆分：docking 工具预测蛋白-配体，RNA 专用模型预测 RNA，抗体 docking 工具处理 antibody-antigen。这导致模型、输入特征、评价指标和失败模式都割裂。AlphaFold 3 的核心目标是把这些任务统一成一个全原子复合物建模问题。

##### 输入表示：token 与 atom 的分工

AF3 不再假设所有对象都是 20 种标准氨基酸。它将输入复合物拆成 token，并为每个 token 保留原子级结构。蛋白质和核酸通常以残基/核苷酸为 token，小分子、离子和修饰基团则由 CCD 化学组件、原子类型、键连接和初始 conformer 描述。

输入嵌入可以抽象为：

$$
s_i^{(0)}, z_{ij}^{(0)}
= \mathrm{InputEmbedder}\left(
\mathrm{entity}_i,\mathrm{entity}_j,
\mathrm{bond}_{ij},
\mathrm{relpos}_{ij},
\mathrm{template}_{ij},
\mathrm{MSA}_{ij}
\right)
$$

其中 \(s_i\) 是 token 的 single representation，\(z_{ij}\) 是两个 token 的 pair representation。对小分子和修饰残基，atom attention encoder/decoder 负责在 token 表征和细粒度原子坐标之间交换信息，从而避免为每类化学组件写大量特例规则。

##### Pairformer：保留 AF2 的 pair 推理，削弱 MSA 依赖

AF2 Evoformer 的 MSA stack 很重，因为它需要在 MSA 维度和 residue-pair 维度之间持续交换信息。AF3 观察到，对于多分子复合物和小分子建模，MSA 不是唯一甚至不是最关键的信息源，因此将 MSA 处理压缩成更小的模块：MSA representation 经过较少 block 后把信息注入 pair representation，后续主干主要由 pair 和 single 表征驱动。

Pairformer block 的核心可以简化写成：

$$
z_{ij} \leftarrow z_{ij}
+ \mathrm{TriangleMul}_{out/in}(z)_{ij}
+ \mathrm{TriangleAttn}_{start/end}(z)_{ij}
+ \mathrm{Transition}(z_{ij})
$$

$$
s_i \leftarrow s_i
+ \mathrm{AttentionWithPairBias}\left(s_i,\{s_j\}, b_{ij}=W_b z_{ij}\right)
+ \mathrm{Transition}(s_i)
$$

triangle update 维护 \(i,j,k\) 三元 token 的几何一致性；single attention with pair bias 则让 token 级信息流受 pair 几何关系调制。这个设计保留了 AF2 中最有效的“关系推理”部分，但让它适配蛋白、核酸和化学小分子的混合图。

##### 扩散模块：直接生成 raw atom coordinates

AF2 的 structure module 使用残基局部框架和 side-chain torsion 来生成蛋白原子坐标，这对标准氨基酸非常合适，但对任意小分子、离子和修饰残基会产生大量特殊处理。AF3 改用扩散模型：把真实结构 \(x_0\) 加噪成 \(x_t\)，训练网络从噪声原子云中恢复干净坐标。

简化的前向加噪过程：

$$
x_t = x_0 + \sigma_t \epsilon,\qquad \epsilon \sim \mathcal{N}(0,I)
$$

去噪网络以 noisy coordinates、noise level 和 Pairformer 表征为条件：

$$
\hat{x}_0 = D_\theta(x_t,\sigma_t,s,z)
$$

训练时的扩散损失可以写成加权、对齐后的坐标误差：

$$
\mathcal{L}_{\mathrm{diff}}
= \mathbb{E}_{t,\epsilon}
\left[
w(\sigma_t)
\left\|
\mathrm{Align}(\hat{x}_0) - x_0
\right\|_2^2
\right]
$$

实际训练还结合 smooth LDDT、distogram、PAE/PDE/pLDDT 等辅助目标。补充材料中的 Smooth LDDT loss 用 0.5/1/2/4 Å 阈值的 sigmoid 平滑近似局部距离差评分：

$$
\epsilon_{lm} =
\frac{1}{4}\left[
\sigma(0.5-\delta_{lm})+
\sigma(1-\delta_{lm})+
\sigma(2-\delta_{lm})+
\sigma(4-\delta_{lm})
\right]
$$

其中 \(\delta_{lm}\) 是预测与真实结构中原子对距离差的绝对值。这个目标鼓励模型不仅坐标接近，还要保持局部几何和接触关系。

> 💡 关键：扩散模块的高噪声阶段学习全局装配，低噪声阶段修正局部化学几何，因此 AF3 可以在同一生成框架中处理蛋白 backbone、核酸碱基、小分子构象和离子位置。

##### 训练与排序机制

AF3 的训练包含三个重要工程点：

- **分阶段训练**：初训使用 crop size 384 tokens，随后两阶段 fine-tuning 扩展到 640 和 768 tokens，使模型逐步适应更大复合物；
- **mini diffusion rollout**：训练 confidence heads 时，从纯噪声短 rollout 20 步得到预测坐标，但不对这段 rollout 反传梯度；
- **chain permutation/symmetry resolution**：对相同链、相同配体和对称实体，训练时先解决预测与真实结构的最佳匹配，避免因链名任意性惩罚正确结构。

推理时，AF3 不只给出一个结构。Nature 正文说明，除特别情况外，结果通常来自 5 个 model seeds，每个 seed 生成 5 个 diffusion samples，共 25 个候选，然后按 confidence ranking 选择最可信样本。对于抗体等场景，论文还报告过更多 seed 的排序设置。

##### 与 AlphaFold2 的关键区别

| 维度 | AlphaFold2 | AlphaFold 3 |
|------|------------|-------------|
| 主要对象 | 蛋白质单体/部分蛋白复合物 | 蛋白、核酸、小分子、离子、修饰残基复合物 |
| 主干 | Evoformer，强 MSA 处理 | Pairformer，弱化 MSA、强化 pair/single 推理 |
| 坐标生成 | 残基框架 + torsion + IPA | 全原子扩散去噪 |
| 化学泛化 | 标准氨基酸最自然 | 基于 CCD/atom features 支持多种化学实体 |
| 输出形式 | 多为蛋白结构坐标与 pLDDT/PAE | 全复合物坐标、界面与配体相关置信度 |
| 采样 | 通常确定性模型多 seed | diffusion samples 多样本生成与排序 |

AlphaFold 3 的范式变化在于：结构预测不再只是“预测蛋白折叠终态”，而是“在给定化学组件和相互作用约束下生成一个联合原子构型”。这使它更接近药物发现、结构生物学和分子机制研究中的实际问题。

#### 🧪 练习题

```yaml
question: "AlphaFold 3 用扩散模块替代 AlphaFold2 structure module 的主要原因是什么？"
options:
  - "扩散模块可以完全不需要训练数据"
  - "扩散模块直接生成 raw atom coordinates，更容易统一处理蛋白、核酸、小分子和修饰残基"
  - "扩散模块只预测 Cα 原子，因此速度更快"
  - "扩散模块的目标是执行 MSA 搜索"
answer: 1
explain: "AlphaFold2 的结构模块围绕氨基酸残基框架和侧链 torsion 设计；AlphaFold 3 面向多种化学实体，采用全原子扩散去噪可以减少特殊规则，并统一预测复合物中所有原子坐标。"
```
