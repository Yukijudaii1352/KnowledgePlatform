### Boltz-2 — 生物分子基础模型2 (Boltz-2)

```yaml
id: boltz2
name: Boltz-2
full_name: 生物分子基础模型2 (Boltz-2)
year: '2025.06'
org: MIT/Recursion
paper_url: https://nanohelix.ai/generative-models-for-novel-proteins/
category: foundation
parent: unimol
motivation: 单GPU 20秒蛋白-配体协同折叠
```

#### 📝 一句话总结

Boltz-2 在 Boltz-1/AlphaFold3 式协同折叠框架上加入亲和力预测模块与更强的结构可控性，解决了蛋白-配体复合物既要预测结合姿态、又要快速排序结合强弱的问题。它把结构扩散生成、置信度估计和亲和力回归/分类接到同一生物分子表示上，使单个 GPU 上约 20 秒级的虚拟筛选成为可能。

#### 🎯 核心要点

- **联合任务**：同时预测蛋白、DNA、RNA、小分子复合物结构，以及蛋白-配体的 binding likelihood 和连续亲和力数值
- **AF3/Boltz-1 系主干**：沿用 Atom Attention Encoder、MSA Module、PairFormer Module、recycling、扩散式结构模块和 confidence module
- **亲和力模块**：从结构模型产生的 trunk pair representation、预测坐标和蛋白-配体 pocket crop 中学习，输出二分类结合概率与连续亲和力
- **亲和力监督**：对同一 assay 内样本做 pairwise difference 监督，用 Huber loss 降低跨实验条件噪声，并用 focal loss 处理 binder/decoy 分类
- **Activity-cliff sampler**：按 assay 内亲和力四分位距加权采样，并把同一 assay 的多个化合物放进一个 batch，强调细微结构变化导致的大亲和力变化
- **可控结构预测**：支持实验方法 conditioning、用户距离/口袋约束、多链模板集成，以及可选 Boltz-steering 物理势修正
- **动态与物理性增强**：训练数据扩展到实验结构、分子动力学 ensemble 和 Boltz-1 自蒸馏结构，以改善构象多样性与物理合理性
- **速度-精度权衡**：论文报告其亲和力预测接近 FEP 类方法的相关性，同时计算效率提升 1000 倍量级；单配体推理约 20 秒
- **来源限制**：任务给定 `paper_url` 是二级介绍页；本文追溯使用作者技术报告、bioRxiv/官方仓库与可访问的架构图页面

#### 🔬 深入细节

##### 模型架构总览

![Boltz-2 架构示意图](https://rowansci.com/tools/cofolding/boltz2-arch.png)
*图：Boltz-2 的端到端流程。输入序列、MSA、模板和小分子信息先进入 trunk；扩散结构模块从随机坐标反向去噪得到复合物结构；confidence module 与 affinity module 复用 trunk 表示并 stop-gradient 训练。该图来自 Rowan 对 Boltz-2 预印本 Figure 2 的转载；原始技术报告可访问于 https://jeremywohlwend.com/assets/boltz2.pdf，官方代码与权重位于 https://github.com/jwohlwend/boltz。*

##### 算法核心流程

```python
# Boltz-2 结构-亲和力联合推理与亲和力训练伪代码

# === 结构模型预计算/推理 ===
for complex in protein_ligand_inputs:
    features = featurize(
        protein_sequence=complex.sequence,
        ligand_smiles=complex.smiles,
        msa=search_msa(complex.sequence),
        templates=search_or_user_templates(complex.sequence),
        constraints=complex.user_constraints,
        experimental_method=complex.method_hint,
    )

    trunk_pair, trunk_single = boltz2_trunk(features, recycle=True)

    x_t = sample_random_atom_coordinates(features.atoms)
    for step in reverse_diffusion_schedule:
        x0_hat = denoising_module(x_t, trunk_pair, trunk_single, step)
        if use_boltz_steering:
            x0_hat = apply_physics_potentials(
                x0_hat,
                clash_weight=True,
                bond_geometry_weight=True,
                template_or_distance_constraints=features.constraints,
            )
        x_t = diffusion_update(x_t, x0_hat, step)

    structure = x_t
    confidence = confidence_head(stop_gradient(trunk_pair), structure)

    # 亲和力模块只在蛋白-配体任务上启用
    pocket_crop = crop_ligand_and_nearby_protein_tokens(structure, complex.ligand)
    affinity_pair = select_pair_features(trunk_pair, pocket_crop)
    pred_affinity, pred_bind_logit = affinity_module(
        stop_gradient(affinity_pair),
        structure[pocket_crop],
    )

# === 亲和力模块训练 ===
for batch in activity_cliff_sampler(affinity_dataset, batch_size=5):
    # batch 内样本来自同一个 assay，便于比较相对亲和力
    pred_y, pred_logit = [], []
    for complex in batch:
        structure, trunk_pair = precomputed_or_run_structure_model(complex)
        crop = affinity_cropper(structure, complex.ligand)
        y_hat, logit = affinity_module(stop_gradient(trunk_pair[crop]), structure[crop])
        pred_y.append(y_hat)
        pred_logit.append(logit)

    loss_abs = censor_aware_huber_absolute(pred_y, batch.affinity, batch.qualifier)
    loss_diff = censor_aware_pairwise_huber(pred_y, batch.affinity, batch.qualifier)
    loss_binary = focal_loss(pred_logit, batch.binary_label, gamma=1)
    loss = 0.9 * loss_diff + 0.1 * loss_abs + loss_binary
    optimizer.step(loss)
```

##### 动机与背景

AlphaFold3 和 Boltz-1 已经把“多生物分子协同折叠”推进到实用阶段，但药物发现里只知道复合物几何仍然不够。早期筛选和 lead optimization 更关心的是候选分子是否真的更强地结合靶点。传统 docking 速度快但排序噪声大；FEP/ABFE 更接近物理但计算昂贵，难以覆盖几十万到上亿规模的化合物库。Boltz-2 的核心定位就是把协同折叠模型的表征能力转化为亲和力预测信号，在速度与精度之间提供新的折中。

给定的 `paper_url` 并不是论文页面，因此可访问来源需要追溯。作者技术报告题为 *Boltz-2: Towards Accurate and Efficient Binding Affinity Prediction*，公开 PDF 和 GitHub 仓库说明其权重、推理和训练代码以 MIT license 发布；Rowan 页面提供了可直接访问的 Figure 2 架构图。本文的方法级解读基于这些可访问来源，而不是任务中的二级新闻页。

##### 架构机制：结构主干服务亲和力头

Boltz-2 的结构部分可以看作 AF3/Boltz-1 风格的协同折叠器。输入被整理成 token：蛋白/核酸残基、小分子原子、模板、MSA、方法标签和用户约束。trunk 用 Atom Attention Encoder、MSA Module 和 PairFormer Module 生成单体表示 \(s_i\) 与 pair 表示 \(z_{ij}\)：

$$
(s, z) = \text{Trunk}_{\theta}
(\text{sequence}, \text{MSA}, \text{templates}, \text{ligand}, \text{constraints})
$$

扩散结构模块从随机坐标开始反向去噪：

$$
x_{t-\Delta t}
= \text{Update}\left(x_t,\;
\hat{x}_0 =
D_{\theta}(x_t, s, z, t)
\right)
$$

结构模型给亲和力模块提供两个关键信息：一是 co-folding 后的 pocket 几何，二是 trunk 的蛋白-配体 pair representation。亲和力模块不需要重新从 SMILES 和序列学习全部相互作用，而是利用结构模型已经学到的接触、构象和界面上下文：

$$
\hat{y},\ \hat{p}_{\text{bind}}
= A_{\phi}\left(
\text{stopgrad}(z_{\text{pocket}}),\ x_{\text{pocket}}
\right)
$$

其中 \(\hat{y}\) 是连续亲和力预测，\(\hat{p}_{\text{bind}}\) 是二分类结合概率。图中 stop-gradient 的设计很关键：亲和力头可以复用结构表征，但训练亲和力数据时不直接破坏结构 trunk 的几何能力。

##### 亲和力监督：为什么不直接回归所有 IC50/Ki

公开亲和力数据的噪声很大：不同实验室、底物浓度、assay 类型和读数单位都会改变数值。论文因此把绝对数值监督和同一 assay 内的相对差值监督结合起来。对精确标签 \(s = "="\)，绝对值项可写为：

$$
\mathcal{L}_{\text{abs}}(y,\hat{y},s)
= \text{Huber}(y,\hat{y}; \delta=0.5)
$$

对下界标签 \(s = ">"\)，只有当模型预测低于报告下界时才惩罚：

$$
\mathcal{L}_{\text{abs}}(y,\hat{y},s)
= \text{Huber}(y,\hat{y}; \delta=0.5)\cdot \mathbf{1}[\hat{y}<y]
$$

更重要的是 pairwise difference loss。对同一 assay 内两个化合物，模型学习亲和力差：

$$
\mathcal{L}_{\text{diff}}
= \text{Huber}
\left(
(y_1-y_2),\;(\hat{y}_1-\hat{y}_2);\delta=0.5
\right)
$$

这样 assay 级偏移会在差分中被抵消，模型更关注“同一个靶点和同一种读数条件下，哪个类似物更强”。二分类 binder/decoy 使用 focal loss：

$$
\mathcal{L}_{\text{binary}}
= \text{Focal}(\text{logits}, \gamma=1, \alpha=\lambda_{\text{focal}})
$$

总目标为：

$$
\mathcal{L}_{\text{total}}
= 0.9\,\mathcal{L}_{\text{diff}}
+ 0.1\,\mathcal{L}_{\text{abs}}
+ \mathcal{L}_{\text{binary}}
$$

> 💡 **关键：** Boltz-2 的亲和力模块不是简单“结构预测后再加一个打分器”。它把同一结构 trunk 的蛋白-配体表示、预测 pocket 几何和 assay 内差分监督合在一起，试图让模型学到 ligand series 内的活性排序。

##### 采样器：把 activity cliff 放到训练中心

药物化学中常见 activity cliff：两个结构很相似的小分子，亲和力却相差很大。普通随机采样容易被 assay 数量、弱信号和重复 scaffold 淹没。Boltz-2 为连续亲和力数据定义 assay 级信息量：

$$
\text{IQR}_a
= Q_{0.75}(\{y_i\}_{i\in D_a})
- Q_{0.25}(\{y_i\}_{i\in D_a})
$$

采样概率按 \(\text{IQR}_a\) 归一化：

$$
p(a)
= \frac{\text{IQR}_a}{\sum_b \text{IQR}_b}
$$

每个 batch 从同一个 assay 取 5 个蛋白-配体复合物，使 pairwise loss 有可比较的语义。对二分类数据，则先采样一个 binder，再从同一 assay 采样多个 decoy，减少“蛋白上下文不同导致的伪差异”。

##### Boltz-steering 与可控性

协同折叠模型常见问题是局部物理不合理：小分子键长/键角错误、手性中心翻转、芳香环非平面、界面 steric clash。Boltz-2 沿用 Boltz-1x 的 Boltz-steering 思路，在反向扩散时加入物理势或用户约束势，对结构更新施加额外引导：

$$
\hat{x}_0^{\text{steered}}
= \hat{x}_0
- \eta \nabla_x
\left(
\lambda_{\text{clash}}E_{\text{clash}}
+ \lambda_{\text{bond}}E_{\text{bond}}
+ \lambda_{\text{template}}E_{\text{template}}
+ \lambda_{\text{dist}}E_{\text{dist}}
\right)
$$

这不是训练一个新模型，而是在推理时改变反向扩散轨迹。好处是能减少明显物理错误，也能强制满足模板或距离约束；代价是推理更慢，且过强约束可能把模型推向局部不自然构象。

##### 与 AlphaFold3、Boltz-1 和 FEP 的区别

与 AlphaFold3 相比，Boltz-2 的最大变化不是“再预测一个更漂亮的结构”，而是把 binding affinity 变成一级输出。AF3 的置信度可以告诉用户预测结构是否可信，但不直接回答某个 ligand 是否更强。Boltz-2 在 protein-ligand pocket 上学习连续和二分类亲和力信号，能用于虚拟筛选排序。

与 Boltz-1 相比，Boltz-2 增强了结构主干、训练数据和可控性，并加入专门的亲和力模块。论文还使用分子动力学 ensemble 与自蒸馏数据来提升对局部动态的理解，使结构输出不只拟合静态晶体结构。

与 FEP/ABFE 相比，Boltz-2 并不显式积分物理自由能路径，而是用神经网络从大量结构与活性数据中学习近似排序信号。因此它的优势是速度和规模：约 20 秒级别可让多 GPU/HPC worker 每天筛选大量化合物；局限是对 out-of-distribution 蛋白、异常化学、金属/水介导相互作用、构象大变化和 assay 偏差仍然敏感。实际药物发现中更合理的用法是先用 Boltz-2 缩小候选集，再用 FEP、MD 或实验验证最终 lead。

#### 🧪 练习题

```yaml
question: "Boltz-2 在亲和力预测中为什么强调同一 assay 内的 pairwise difference loss？"
options:
  - "因为它可以完全替代结构扩散模块"
  - "因为同一 assay 内做差能部分抵消实验条件偏移，更适合学习类似物之间的活性排序"
  - "因为它只需要负样本，不需要任何连续亲和力标签"
  - "因为它会强制所有蛋白使用相同的结合口袋"
answer: 1
explain: "IC50/Ki 等读数受 assay 条件影响很大；同一 assay 内的亲和力差更可比，能让模型关注化学结构变化带来的相对活性变化。"
```
