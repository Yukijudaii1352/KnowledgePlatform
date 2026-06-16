### Boltz-1 - 完全开源商用的 AlphaFold3 级生物分子交互模型

```yaml
id: boltz1
name: Boltz-1
full_name: "Boltz-1 (Boltz-1)"
year: "2024.11"
org: "MIT Jameel Clinic"
paper_url: "https://boltz.bio/introducing-boltz-1/"
category: protein_structure
parent: alphafold3
motivation: "首个完全开源商用的AF3级模型"
```

#### 📝 一句话总结

Boltz-1 提出了一个 MIT 许可的开源 AlphaFold3 级生物分子复合物结构预测模型，在 AF3-like trunk + all-atom diffusion 框架上加入密集 MSA 配对、统一 crop、鲁棒 pocket conditioning、Kabsch diffusion interpolation 和改造后的 confidence model，使训练代码、推理代码、权重、数据与 benchmark 都能被社区复现和商用。

#### 🎯 核心要点

- **完全开源商用**：训练/推理代码、模型权重、数据处理和 benchmark 在 MIT license 下开放，定位为可商用的 AF3 级基础模型
- **多分子结构预测**：输入包括蛋白质序列、小分子 SMILES/共价键信息、RNA/DNA 序列，并可加入 MSA 与分子 conformer
- **不使用模板**：技术报告明确不包含 AlphaFold3 式模板输入，原因是大型模型中模板影响有限，同时简化数据与推理流程
- **数据管线创新**：提出 dense MSA pairing、unified cropping、robust pocket-conditioning 三个关键数据/条件算法
- **架构改动**：调整 MSA module 操作顺序，使 single representation 更新能更直接传入 pair representation；为 DiffusionTransformer 加入标准残差路径
- **Kabsch diffusion interpolation**：在反向扩散中对 denoised prediction 做刚体对齐后再插值，避免坐标系不一致导致下一步结构劣化
- **置信度模型重构**：把 confidence 视为 trunk fine-tuning 任务，聚合反向扩散每一步 token 表示，输出 pLDDT、PDE、resolved、PAE 等指标
- **效率优化**：sequence-local atom attention、attention bias sharing/caching、greedy symmetry correction、MSA/triangle chunking 降低显存和推理成本
- **代表性结果**：MIT Jameel Clinic 博客报告 CASP15 上 Boltz-1 的 LDDT-PLI 为 65%（Chai-1 为 40%），DockQ > 0.23 比例为 83%（Chai-1 为 76%）

#### 🔬 深入细节

##### 图示与来源

![Boltz-1 官方结果图](https://jclinic.mit.edu/wp-content/uploads/2024/11/results-300x276.png)
*图：MIT Jameel Clinic 发布页展示 Boltz-1 与 Chai-1 在 CASP15 和 curated PDB test set 上的结果对比。*

![Boltz-1 蛋白-小分子预测示例](https://jclinic.mit.edu/wp-content/uploads/2024/11/hero_blog2-884x453.png)
*图：Boltz-1 对蛋白-小分子复合物的预测示例。*

原始 `paper_url` 会跳转到 MIT Jameel Clinic 发布页；方法细节主要来自技术报告 PDF https://gcorso.github.io/assets/boltz1.pdf、bioRxiv DOI https://doi.org/10.1101/2024.11.19.624167 和官方仓库 https://github.com/jwohlwend/boltz。技术报告 Figure 2 展示 Boltz-1 与 AlphaFold3 反向扩散插值差异，Figure 3 展示 confidence model schematic；PDF 是可访问来源，但稳定图片直链主要来自官方发布页。

##### 算法伪代码

```python
# Boltz-1 训练/推理核心流程抽象
def boltz1_predict(complex_input, msa_db, boltz_model, n_samples=5):
    # 1. 构造多分子输入
    tokens = tokenize(
        proteins=complex_input.protein_sequences,
        ligands=complex_input.ligand_smiles,
        nucleic_acids=complex_input.rna_dna_sequences,
        covalent_bonds=complex_input.covalent_bonds,
    )
    conformers = rdkit_etkdg_conformers(tokens.ligands)

    # 2. 数据增强/条件输入
    msa = colabfold_mmseqs_search(tokens.proteins, msa_db)
    paired_msa = dense_taxonomy_msa_pairing(msa)
    pocket_feats = encode_partial_pocket_condition(complex_input.pocket_hint)

    # 3. AF3-like trunk，一次运行后供多个 diffusion sample 复用
    feats = featurize(tokens, paired_msa, conformers, pocket_feats)
    single, pair = boltz_model.trunk(feats)

    candidates, diffusion_acts = [], []
    for k in range(n_samples):
        x = initialize_noisy_coordinates(tokens)
        acts = []
        for t in reverse_noise_schedule():
            x0_hat, a_t = boltz_model.denoiser(x, t, single, pair)

            # Boltz-1 关键：Kabsch 对齐后再做反向扩散插值
            x0_aligned = kabsch_align(x0_hat, reference=x)
            x = interpolate_reverse_step(x, x0_aligned, t)
            acts.append((a_t, t))

        candidates.append(x)
        diffusion_acts.append(acts)

    # 4. confidence model 聚合扩散轨迹并排名
    conf = boltz_model.confidence(candidates, diffusion_acts, single, pair, feats)
    return rank_by_confidence(candidates, conf)
```

##### 动机与背景

AlphaFold3 证明了 all-atom diffusion 可以统一预测蛋白、核酸、小分子和修饰残基复合物，但其训练代码、数据处理细节和权重并未以完全可复现、可商用的方式开放。对于学术实验室、药物发现团队和开源社区来说，这会带来两个问题：一是难以验证和改造模型，二是商业使用与私有部署受限。

Boltz-1 的目标是填补这个空缺：尽量达到 AF3 级别的结构预测能力，同时把完整工程栈开放出来。它不是只复现一段推理伪代码，而是从数据清洗、MSA pairing、训练 crop、pocket conditioning、扩散采样、置信度模型到 benchmark 都做了系统化设计。

##### 核心机制 1：输入表示与数据管线

Boltz-1 接受三类主要分子输入：

$$
\mathcal{I} = \{\text{protein sequences}, \text{ligand SMILES/bonds}, \text{RNA/DNA sequences}\}
$$

蛋白质通过序列和 MSA 表示；小分子由 SMILES 和 CCD/RDKit conformer 表示；核酸由序列表示。技术报告指出 Boltz-1 不使用模板，理由是模板在大模型中的边际收益有限，并且会增加数据泄漏控制与推理复杂度。

训练数据方面，报告使用 2021-09-30 前发布的 PDB 结构，并按 AlphaFold3 类似流程清洗 biological assembly、配体、链和冲突结构。MSA 由 ColabFold/MMseqs2 生成，并给 UniRef 序列分配 taxonomy label。配体 conformer 使用 RDKit ETKDGv3 预计算。

##### 核心机制 2：Dense MSA pairing

多链复合物中的 MSA 配对比单链困难得多。单链 MSA 只要找同源序列即可；多链 MSA 还要判断不同链的同源序列是否来自同一物种、同一基因组或可能共同进化。Boltz-1 提出 dense MSA pairing，用 taxonomy 信息在“保留 MSA 密度”和“配对共进化信号”之间折中。

可以把目标写成：

$$
\max_{\pi}
\sum_{r=1}^{R}
\operatorname{signal}\left(
\text{msa}^{(1)}_r,
\text{msa}^{(2)}_{\pi(r)},
\text{taxonomy}
\right)
\quad
\text{s.t. keep enough rows}
$$

这里 \(\pi\) 表示不同链 MSA 行之间的配对。过度严格配对会丢掉大量 MSA 行，削弱序列覆盖；过度宽松则会引入错误共进化信号。dense pairing 的意义是让模型仍能看到足够多的 MSA 行，同时尽量保留跨链相互作用信息。

##### 核心机制 3：Unified cropping

大复合物无法每次完整送入训练，因此必须 crop。传统做法有两端：

- **contiguous crop**：截取序列上连续的一段，适合学习局部序列上下文
- **spatial crop**：围绕空间中心取附近 token，适合学习界面和配体口袋

Boltz-1 用 neighborhood 把二者统一。若 neighborhood size 为 0，就接近纯 spatial crop；若 neighborhood size 接近 token budget 的一半，就接近 contiguous crop。报告中训练时会在每个样本上从 0 到 40 token 随机采样 neighborhood size：

```python
def unified_crop(tokens, center_token, token_budget):
    n = uniform_int(0, 40)  # neighborhood size
    neighborhoods = make_sequence_neighborhoods(tokens, radius=n)
    crop = []
    for block in sort_by_distance_to_center(neighborhoods, center_token):
        if len(crop) + len(block) <= token_budget:
            crop.extend(block)
    return crop
```

这种设计让模型在训练中同时看到连续结构域、空间界面、配体口袋和跨链邻域，减少 crop 策略造成的分布偏差。

##### 核心机制 4：Robust pocket-conditioning

真实使用中，研究者常常知道“某些残基在口袋附近”，但不知道完整 6Å 内所有接触残基。AlphaFold3 式 pocket conditioning 如果要求精确给出所有口袋残基，就不符合多数实验场景。Boltz-1 的做法是训练单个统一模型，并在训练中随机给出部分 pocket 信息。

对于 binder \(b\) 和 pocket residue set \(P_b\)，训练时以一定概率启用 pocket condition，从真实口袋中抽取一个子集：

$$
\tilde{P}_b \subseteq P_b,\quad |\tilde{P}_b| \sim \operatorname{Geometric}(p)
$$

然后把 \(\tilde{P}_b\) 编码为 token one-hot feature：

$$
p_i =
\begin{cases}
1, & i \in \tilde{P}_b \\
0, & \text{otherwise}
\end{cases}
$$

这样模型推理时可以接受不完整口袋提示，也能在没有提示时正常工作。它把 pocket conditioning 从“另一个特化模型”变成了主模型的一个可选输入通道。

##### 核心机制 5：架构修改与反向扩散

Boltz-1 从 AlphaFold3 风格的 trunk 和 denoising transformer 出发，但做了几处关键改动。

**MSA module 顺序调整**：报告将操作顺序从：

```text
OuterProductMean -> PairWeightedAveraging -> MSATransition -> TriangleUpdates -> PairTransition
```

改为：

```text
PairWeightedAveraging -> MSATransition -> OuterProductMean -> TriangleUpdates -> PairTransition
```

这样 MSATransition 学到的 single/MSA 更新可以通过 OuterProductMean 更直接地写入 pair representation。

**DiffusionTransformer 残差路径**：报告指出 AF3 supplement 中的写法类似：

$$
a \leftarrow \operatorname{AttentionPairBias}(a) + \operatorname{ConditionedTransitionBlock}(a)
$$

Boltz-1 改为标准残差形式：

$$
a \leftarrow a + \operatorname{AttentionPairBias}(a)
$$

$$
a \leftarrow a + \operatorname{ConditionedTransitionBlock}(a)
$$

这使注意力更新能传入后续 transition，也让反向传播路径更稳定。

**Kabsch diffusion interpolation**：扩散模型训练坐标损失通常会做刚体对齐，因为全局旋转平移不应被惩罚。但反向扩散采样时，如果直接把未对齐的 denoised prediction 与当前 noisy state 插值，可能把下一步输入推到不合理的坐标系。Boltz-1 在插值前加入 Kabsch 对齐：

$$
(R^\*, t^\*) =
\arg\min_{R,t}
\left\|R\hat{x}_0 + t - x_t\right\|_2^2
$$

$$
\hat{x}_{0,\text{align}} = R^\*\hat{x}_0 + t^\*
$$

$$
x_{t-\Delta t}
= \alpha_t x_t + (1-\alpha_t)\hat{x}_{0,\text{align}} + \eta_t \epsilon
$$

其中 \(\hat{x}_0 = D_\theta(x_t,t,c)\) 是 denoiser 预测的干净结构。直觉是：先把模型预测放回当前采样轨迹的坐标系，再进行下一步插值，避免“预测本身对齐后看起来正确，但用于下一步采样时坐标系错位”。

##### 核心机制 6：Confidence model

Boltz-1 把 confidence model 设计成对 trunk 的 fine-tuning，而不是完全独立的小头。报告中的 Algorithm 1 可以概括为：

```python
def boltz_confidence(diffusion_activations, predicted_distogram, trunk_s, trunk_z, feats):
    acc = 0
    for a_t, t in diffusion_activations:
        t_emb = layer_norm(fourier_embedding(0.25 * log(t / sigma_data)))
        a_t = layer_norm(a_t)
        acc += conditioned_transition_block(a_t, concat(acc, t_emb))

    s = input_feature_embedder(feats) + project(trunk_s) + project(acc)
    z = pair_init_from_inputs(feats) + project(trunk_z) + one_hot(predicted_distogram)

    z += msa_module(z, feats)
    s, z = pairformer_module(s, z)

    return {
        "plddt": softmax(linear(s)),
        "pde": softmax(linear(z + transpose(z))),
        "resolved": softmax(linear(s)),
        "pae": softmax(linear(z)),
    }
```

关键点是它不只看最终坐标，也看整个反向扩散轨迹中的 token 表示。若一个结构在早期和晚期去噪中表现稳定，confidence model 可以利用这种动态信号；若候选结构只是最终偶然成形，置信度可能更低。

##### 效率优化

Boltz-1 的工程优化服务于一个现实问题：AF3-like all-atom diffusion 需要对每个候选结构运行多步 denoising，成本很高。报告提出几类优化：

- **sequence-local atom attention**：AtomAttentionEncoder/Decoder 中，32 个原子 block 只 attend 到序列空间最近的 128 个原子，形成 block-sparse attention
- **attention bias sharing/caching**：denoising 中部分 pair bias 不依赖当前坐标和 diffusion timestep，可以在多个样本和多个时间步之间共享
- **greedy symmetry correction**：对相同链和对称配体原子做近似匹配，避免枚举指数级排列
- **MSA 与 triangular attention chunking**：借鉴 OpenFold chunking，将 MSA transition、pair-weighted average、outer product 等层分块降低峰值显存

##### 与 Chai-1 / AlphaFold3 的区别

| 维度 | AlphaFold3 | Chai-1 | Boltz-1 |
|---|---|---|---|
| 开放性 | 权重/训练栈未完全开放，商用受限 | 提供仓库和服务，但训练栈不完整 | MIT license，代码/权重/数据/benchmark 开放 |
| 模型范式 | trunk + all-atom diffusion | AF3-like + PLM/constraints | AF3-like + 数据/架构/采样/置信度改造 |
| 模板 | 使用模板相关输入 | 支持 templates | 不使用 templates |
| 口袋提示 | 有 pocket-conditioned 思路 | 支持 pocket/contact/docking restraints | 单模型鲁棒 partial pocket-conditioning |
| 关键工程 | 未完整开放 | 推理包和 Web | 训练、推理、评测和效率优化均开放 |

Boltz-1 的价值不只在“分数接近 AF3”。更重要的是它把一个前沿 biomolecular interaction model 变成可检查、可部署、可二次开发的工程资产。对 AI4Science 来说，这意味着研究者可以系统地改 loss、换数据、加条件、做消融，而不是只能调用黑盒服务。

#### 🧪 练习题

```yaml
question: "Boltz-1 中 Kabsch diffusion interpolation 的主要作用是什么？"
options:
  - "在反向扩散插值前把 denoised prediction 对齐到当前采样坐标系，减少坐标系不一致造成的结构劣化"
  - "用 Kabsch 算法替代所有神经网络模块，从而不需要训练"
  - "把 MSA 中的同源序列按 taxonomy 进行配对"
  - "把蛋白质模板转换为小分子 conformer"
answer: 0
explain: "Boltz-1 发现直接使用未对齐的 denoised prediction 做下一步反向扩散可能破坏采样轨迹，因此先用 Kabsch 对齐再插值；MSA 配对和 conformer 生成是其它数据管线模块。"
```
