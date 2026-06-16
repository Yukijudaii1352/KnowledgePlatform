### AlphaFold 3 — AlphaFold第三代 (AlphaFold 3)

```yaml
id: alphafold3
name: AlphaFold 3
full_name: AlphaFold第三代 (AlphaFold 3)
year: '2024'
org: DeepMind
paper_url: https://www.nature.com/articles/s41586-024-07487-w
category: design
parent: alphafold2
motivation: 蛋白-配体-核酸复合物建模
```

#### 📝 一句话总结

AlphaFold 3 把 AlphaFold 2 的蛋白单链/蛋白复合物建模扩展为统一的多生物分子复合物结构预测，把 Pairformer 表征学习与原子坐标扩散模块结合，解决了蛋白、核酸、小分子、离子和修饰残基共同建模的问题。它不再依赖 AF2 的残基刚体 frame 和侧链 torsion 表示，而是直接在全原子坐标上去噪生成复合物结构。

#### 🎯 核心要点

- **统一生物分子输入**：支持蛋白质、DNA、RNA、小分子 ligand、离子、共价修饰和常见化学组分
- **Token 体系泛化**：聚合物按残基/核苷酸 token，小分子和非标准组分可按原子/化学组分 token 表示，以覆盖 PDB 中多类实体
- **MSA 降权**：相比 AF2 的 Evoformer，AF3 只用更小的 MSA processing block，随后丢弃 MSA 表示，把信息集中到 pair representation
- **Pairformer 主干**：48 个 Pairformer block 在 single/pair 表示上运行，保留三角乘法、三角注意力和 single attention with pair bias
- **扩散结构模块**：用 diffusion module 直接从噪声原子坐标生成结构，替代 AF2 的 Structure Module、residue gas 和显式等变 IPA
- **多样本生成与排序**：推理时对多个 model seeds 和 diffusion samples 生成候选结构，再用 confidence module 排名
- **训练损失**：扩散模块使用 weighted aligned MSE、bond loss 和 smooth LDDT；对 DNA/RNA/ligand 原子加权以平衡蛋白主导的数据分布
- **性能范围**：论文报告 AF3 在蛋白-配体、蛋白-核酸、RNA、修饰残基、蛋白-蛋白/抗体抗原等类别上整体超过专用基线
- **重要边界**：AF3 预测结构和置信度，不等价于亲和力、动力学 ensemble 或反应机制预测

#### 🔬 深入细节

##### 模型架构总览

![AlphaFold 3 总体架构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig1_HTML.png)
*图 1：AF3 在多类生物分子复合物上的示例、基准结果和推理架构。输入序列/ligand/共价键信息经过模板、遗传搜索和 conformer generation 后进入 trunk，Pairformer 后接扩散模块和 confidence module。来源：Nature 论文 Figure 1。*

![AlphaFold 3 Pairformer 与扩散模块](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig2_HTML.png)
*图 2：AF3 的 Pairformer、Diffusion Module 和训练设置。扩散模块在训练时对同一个 trunk 输出并行生成多份随机旋转/平移与加噪样本，以较低成本扩大 diffusion 监督。来源：Nature 论文 Figure 2。*

##### 算法核心流程

```python
# AlphaFold 3 条件扩散结构预测伪代码

def alphafold3(entities):
    # entities: proteins, DNA/RNA, ligands, ions, modified residues, covalent bonds
    tokens, atom_graph = tokenize_biomolecular_complex(entities)
    msa_features = genetic_search_for_polymer_chains(tokens)
    template_features = template_search(tokens)
    ligand_conformers = generate_small_molecule_conformers(tokens)

    # 1. 输入嵌入与轻量 MSA/template 处理
    single, pair = input_embedder(tokens, atom_graph, ligand_conformers)
    pair = pair + template_module(template_features)
    pair = pair + msa_module(msa_features, pair)  # AF3 中 MSA 模块明显变小

    # 2. Pairformer 主干
    for block in range(48):
        pair = triangle_multiplication(pair)
        pair = triangle_attention(pair)
        pair = transition(pair)
        single = attention_with_pair_bias(single, pair)
        single = transition(single)

    # 3. 扩散结构生成
    candidates = []
    for seed in model_seeds:
        for sample in diffusion_samples:
            x_t = sample_standard_normal_coordinates(atom_graph)
            for t in inference_noise_schedule:
                x0_hat = diffusion_module(
                    noisy_coords=x_t,
                    noise_level=t,
                    input_features=tokens,
                    single=single,
                    pair=pair,
                )
                x_t = diffusion_denoising_step(x_t, x0_hat, t)
            candidates.append(x_t)

    # 4. 置信度排序
    scores = confidence_module(stop_gradient(single), stop_gradient(pair), candidates)
    return select_top_confidence(candidates, scores)


# 训练 diffusion module
for complex in training_set:
    single, pair = run_trunk_once(complex)
    for replica in range(48):
        x_gt_aug = random_rotate_translate(complex.atom_coords)
        t = sample_noise_level()
        x_noisy = x_gt_aug + t * normal_noise()
        x_pred = diffusion_module(x_noisy, t, complex.features, single, pair)
        loss = diffusion_loss(x_pred, x_gt_aug, complex.atom_weights, complex.bonds, t)
    optimizer.step(mean(losses))
```

##### 动机与背景

AlphaFold 2 的架构高度适合标准蛋白：每个残基有 backbone frame，侧链由 torsion angles 表示，MSA 协变提供强信号。但多生物分子复合物并不满足这种规则结构。小分子 ligand 有任意图拓扑，核酸和修饰残基有不同化学几何，金属离子和共价修饰也很难塞进“氨基酸残基 frame + 侧链角”的模板。

AF3 的核心变化是把结构生成问题改写为条件扩散：trunk 仍负责理解输入实体之间的关系，structure module 则不再使用蛋白专用的 frame/torsion，而是在所有原子坐标上直接学习去噪。这样同一个模型可以处理蛋白-蛋白、蛋白-核酸、蛋白-ligand、RNA、DNA、修饰蛋白等任务。

##### 从 Evoformer 到 Pairformer：MSA 信息变成辅助输入

AF2 的 Evoformer 同时维护 MSA representation 和 pair representation；AF3 则大幅减少 MSA 处理。论文说明 AF3 的 MSA block 只有较少层，随后不再保留 MSA representation，信息主要写入 pair representation：

$$
Z = Z + \text{MSAModule}(M, Z)
$$

之后 Pairformer 在 single 表示 \(s_i\) 与 pair 表示 \(z_{ij}\) 上运行：

$$
(s, z) = \text{Pairformer}^{48}(s, z)
$$

一个 Pairformer block 可以概括为：

$$
z_{ij} \leftarrow z_{ij}
+ \text{TriMul}_{\text{out}}(z)_{ij}
+ \text{TriMul}_{\text{in}}(z)_{ij}
+ \text{TriAttn}_{\text{start/end}}(z)_{ij}
$$

$$
s_i \leftarrow s_i
+ \text{AttentionPairBias}(s_i,\{s_j\}, z_{ij})
$$

直觉上，Pairformer 仍然保留 AF2 的几何一致性归纳偏置，但把架构重心从“深度 MSA 推理”转向“所有实体 token 之间的 pair 图推理”。这对 ligand、离子和修饰残基尤其重要，因为它们没有像蛋白序列那样丰富的 MSA。

##### 扩散模块：直接生成 raw atom coordinates

AF3 的 Diffusion Module 接收 noisy atom coordinates、输入 token 特征、single/pair 表示和噪声水平 \(\hat{t}\)，输出去噪坐标：

$$
\hat{x}_0
= D_{\theta}(x_{\hat{t}}, \hat{t}, f_{\text{input}}, s, z)
$$

训练时加噪可写为：

$$
x_{\hat{t}} = x_{\text{GT}} + \hat{t}\,\epsilon,
\qquad
\epsilon \sim \mathcal{N}(0, I)
$$

推理时则从随机坐标开始，沿噪声日程反复调用 diffusion module 去噪。论文补充材料中的采样更新可概括为：

$$
\delta_l = \frac{x_l - \hat{x}^{\text{denoised}}_l}{\hat{t}},
\qquad
x_l \leftarrow x_l^{\text{noisy}} + \eta\,\Delta t\,\delta_l
$$

AF3 的扩散模块不是显式 SE(3)-等变网络；它依靠随机旋转/平移增强、全局 alignment loss 和大量结构数据学习坐标分布。这样牺牲了一部分手工几何约束，但换来了对任意化学图更简单的表达。

##### 扩散损失：aligned MSE + ligand/nucleic acid 加权 + bond/smooth-LDDT

由于整体结构可以任意旋转和平移，AF3 先把真实坐标刚体对齐到预测坐标：

$$
\{x_l^{\text{GT-aligned}}\}
= \text{weighted\_rigid\_align}
\left(
\{x_l^{\text{GT}}\}, \{x_l\}, \{w_l\}
\right)
$$

然后计算加权 MSE：

$$
\mathcal{L}_{\text{MSE}}
= \frac{1}{3}
\operatorname{mean}_l
\left[
w_l
\left\|
x_l - x_l^{\text{GT-aligned}}
\right\|_2^2
\right]
$$

权重对核酸和 ligand 原子上调，避免训练被蛋白原子数量主导：

$$
w_l =
1
+ f_l^{\text{is\_dna}}\alpha_{\text{dna}}
+ f_l^{\text{is\_rna}}\alpha_{\text{rna}}
+ f_l^{\text{is\_ligand}}\alpha_{\text{ligand}}
$$

补充材料给出：

$$
\alpha_{\text{dna}} = \alpha_{\text{rna}} = 5,\qquad
\alpha_{\text{ligand}} = 10
$$

对共价连接 ligand/glycan，fine-tuning 中加入 bond loss：

$$
\mathcal{L}_{\text{bond}}
=
\operatorname{mean}_{(l,m)\in B}
\left(
\|x_l-x_m\|_2
-
\|x_l^{\text{GT}}-x_m^{\text{GT}}\|_2
\right)^2
$$

最终 diffusion loss 为：

$$
\mathcal{L}_{\text{diffusion}}
=
\frac{\hat{t}^2+\sigma_{\text{data}}^2}
{(\hat{t}+\sigma_{\text{data}})^2}
\left(
\mathcal{L}_{\text{MSE}}
+ \alpha_{\text{bond}}\mathcal{L}_{\text{bond}}
\right)
+ \mathcal{L}_{\text{smooth\_lddt}}
$$

其中 \(\sigma_{\text{data}}=16\)，\(\alpha_{\text{bond}}\) 在常规训练为 0，在两个 fine-tuning 阶段为 1。这个目标让高噪声阶段学习全局构象，低噪声阶段学习局部键长、接触和立体化学。

##### 训练与推理：多样本生成后用置信度排序

AF3 的训练包含 initial training 和两个 fine-tuning 阶段，crop size 从 384 token 增加到 640 和 768。为了提高 diffusion module 训练效率，论文在一次 trunk 前向后，生成多份随机旋转/平移和独立加噪的结构副本，并行训练 diffusion module。因为 diffusion module 比 trunk 便宜，这能显著增加坐标监督样本量。

推理时 AF3 通常不是只生成一个结构。论文主结果中常用多个 model seeds，每个 seed 再产生多个 diffusion samples，最后按 confidence module 排名选择最可信候选。这个流程体现了扩散模型的分布式输出：对于不确定界面或柔性 ligand，多个样本可以探索不同构象，但最终交给用户的仍是按置信度排序的结构。

##### 与 AlphaFold 2 的区别

AF2 的归纳偏置非常蛋白专用：残基刚体、侧链角、IPA、FAPE 都围绕氨基酸几何设计。AF3 则将“结构模块”抽象成对任意原子坐标的条件扩散，减少化学特例。它还降低了 MSA 在主干中的比重，因为 ligand、离子和许多修饰没有可比的进化序列信息。

这种改变带来两个重要结果：一方面，AF3 可以处理几乎所有 PDB 中常见的分子类型，尤其是蛋白-配体和蛋白-核酸；另一方面，它的输出仍是静态结构预测，不直接提供结合自由能、动力学速率、反应路径或实验条件下的构象分布。对于药物发现，AF3 的 ligand pose 很有价值，但亲和力排序通常还需要 docking/FEP/MD/实验或 Boltz-2 这类专门 affinity 模块补充。

#### 🧪 练习题

```yaml
question: "AlphaFold 3 为什么用扩散模块替代 AlphaFold 2 的 Structure Module？"
options:
  - "为了只预测蛋白质单链，不再处理复合物"
  - "为了直接在任意原子坐标上建模，避免蛋白专用的残基 frame 和侧链 torsion 表示限制"
  - "为了完全删除 Pairformer 和 pair representation"
  - "为了让模型输出结合自由能而不是结构"
answer: 1
explain: "AF3 需要统一处理蛋白、核酸、小分子、离子和修饰残基；全原子扩散比 AF2 的蛋白专用 frame/torsion 结构模块更容易覆盖任意化学图。"
```
