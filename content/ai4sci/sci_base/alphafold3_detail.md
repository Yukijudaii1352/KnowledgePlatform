### AlphaFold 3

```yaml
id: alphafold3
name: AlphaFold 3
full_name: AlphaFold 3 (AlphaFold 3)
year: '2024'
org: DeepMind/Isomorphic
paper_url: https://www.nature.com/articles/s41586-024-07487-w
category: protein_structure
parent: alphafold2
motivation: 扩散模块预测全生物分子相互作用
```

#### 📝 一句话总结

AlphaFold 3 提出了面向全生物分子复合物的统一结构预测框架，用 Pairformer 表征分子间关系，并用条件扩散模块直接生成原子坐标，解决了 AlphaFold 2 主要聚焦蛋白质和蛋白复合物、难以统一处理核酸、小分子配体、离子和修饰残基的问题。

#### 🎯 核心要点

- **统一建模范围**：输入可同时包含蛋白质、DNA/RNA、小分子配体、离子、共价连接与修饰残基，输出复合物的全原子三维结构
- **架构主干重写**：推理流程由 Input Embedder、Template Module、MSA Module、48 层 Pairformer、Diffusion Module 和 Confidence Module 组成
- **Pairformer 替代 Evoformer 主干**：主干维护 token 级 single representation 与 pair representation，MSA 信息先被压入 pair 表示，后续主干不再保留 AlphaFold 2 式 MSA track
- **几何关系仍由三角操作刻画**：Pairformer 使用 triangle multiplicative update、triangle self-attention 和 pair-biased single attention 建模残基/原子 token 之间的三体一致性
- **扩散模块直接预测原子坐标**：从带噪坐标开始迭代去噪，条件来自输入特征、single/pair 表示和原子级注意力，不再使用 AlphaFold 2 的 Structure Module/FAPE 作为主要坐标生成机制
- **训练损失更适合全原子复合物**：核心结构损失是 weighted aligned MSE，额外加入 smooth LDDT 与 bonded ligand/glycan 的键长损失，核酸和配体原子被上权重
- **采样与置信度排名分离**：同一输入可运行多个随机种子和多个 diffusion samples，再用 pLDDT、pTM、ipTM、clash/disorder 等置信度相关指标选择最终结构
- **对专用工具形成统一替代**：在蛋白-配体、蛋白-核酸、抗体-抗原、修饰残基等任务上，用一个框架超过多类任务专用模型

#### 🔬 深入细节

##### 架构总览

![AlphaFold 3 整体推理框架](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig1_HTML.png)
*图：Nature 论文 Fig. 1，展示 AlphaFold 3 对多类生物分子复合物的预测效果，以及从序列/配体/共价键输入到 Pairformer、Diffusion Module 和 Confidence Module 的推理流程。*

![AlphaFold 3 Pairformer 与扩散训练细节](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_Fig2_HTML.png)
*图：Nature 论文 Fig. 2，展示 Pairformer block、扩散模块、训练时的去噪目标和不同类型界面的训练曲线。*

可访问来源：主论文为 Nature 论文页面 `https://www.nature.com/articles/s41586-024-07487-w`；完整算法伪代码和损失函数在补充材料 `https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-024-07487-w/MediaObjects/41586_2024_7487_MOESM1_ESM.pdf`。

##### 核心流程伪代码

```python
# AlphaFold 3 推理流程的高层伪代码
def alphafold3_predict(input_complex, num_seeds=5, samples_per_seed=5):
    tokens, atom_features = tokenize_biomolecules(
        proteins=input_complex.proteins,
        dna=input_complex.dna,
        rna=input_complex.rna,
        ligands=input_complex.ligands,
        ions=input_complex.ions,
        covalent_bonds=input_complex.covalent_bonds,
    )
    msa_features = genetic_search(tokens.polymer_sequences)
    template_features = template_search(tokens.polymer_sequences)
    conformer_features = generate_ligand_conformers(input_complex.ligands)

    s_inputs, z = input_embedder(tokens, atom_features, conformer_features)
    z = template_module(z, template_features)
    z = msa_module(z, msa_features, s_inputs)

    predictions = []
    for seed in range(num_seeds):
        s, pair = s_inputs, z
        for recycle in range(num_recycles):
            pair, s = pairformer_stack(pair, s, num_blocks=48)

        for _ in range(samples_per_seed):
            x = sample_gaussian_atom_coordinates(tokens)
            for t in diffusion_noise_schedule():
                x = diffusion_module.denoise(
                    noisy_coords=x,
                    noise_level=t,
                    single=s,
                    pair=pair,
                    atom_features=atom_features,
                )
            confidence = confidence_module(x, s, pair)
            predictions.append((x, confidence))

    return rank_by_confidence(predictions)
```

##### 从蛋白折叠到“复合物全原子生成”

AlphaFold 2 的强项是蛋白质单体和蛋白复合物结构预测，但很多真实生物系统不是纯蛋白问题：转录因子结合 DNA，核酶和蛋白形成 RNA-蛋白复合物，药物发现关心蛋白-小分子口袋，翻译后修饰和金属离子也会改变局部几何。若为每类对象分别设计模型，数据管线、特征、坐标约束和评价指标都会碎片化。

AlphaFold 3 的设计选择是把复合物拆成 token 和 atom 两个尺度。Pairformer 在 token 尺度上推理长程关系，token 可以对应聚合物残基，也可以代表非聚合物组分中需要参与结构推理的单元；扩散模块再在 atom 尺度上生成坐标。这个分层让模型既能保留 AlphaFold 系列擅长的 pair representation，又能处理配体、离子和修饰残基带来的原子级几何。

##### Pairformer：保留三角几何，弱化 MSA 主干地位

Pairformer 的输入是 single representation \(s_i \in \mathbb{R}^{c_s}\) 与 pair representation \(z_{ij} \in \mathbb{R}^{c_z}\)。MSA 与模板仍然重要，但它们先经过 MSA Module 和 Template Module 更新 pair 表示，之后主干不再像 Evoformer 那样维护完整 MSA track。这样做的直接收益是：同一主干可以处理没有自然 MSA 的配体、离子和修饰残基。

一个 Pairformer block 可以抽象为：

$$
z \leftarrow z + \text{TriangleMul}_{out}(z) + \text{TriangleMul}_{in}(z)
$$

$$
z \leftarrow z + \text{TriangleAttn}_{start}(z) + \text{TriangleAttn}_{end}(z)
$$

$$
s \leftarrow s + \text{AttentionWithPairBias}(s, z)
$$

其中三角更新继续表达“边 \(i \to j\) 应参考第三个 token \(k\)”的几何一致性；single attention with pair bias 则让每个 token 的状态在关注其他 token 时显式读取 pair 表示。与 AlphaFold 2 相比，核心差异不是完全放弃进化信息，而是把进化信息压缩到 pair 表示后，用更通用的 token-pair 主干服务所有分子类型。

##### 条件扩散：从噪声原子云到复合物坐标

AlphaFold 3 不再用 Structure Module 迭代更新残基刚体框架，而是把坐标预测转成条件去噪问题。训练时，真实原子坐标 \(x^{GT}\) 被加入噪声得到 \(x_t\)，Diffusion Module 在输入特征和 Pairformer 表示条件下预测去噪后的坐标 \(\hat{x}\)。推理时，从随机原子云开始沿噪声日程逐步去噪，得到一个满足输入序列、配体、共价键和界面约束的结构样本。

这种做法对小分子和核酸尤其自然，因为模型不必把所有对象强行塞进“蛋白质残基刚体+侧链扭转角”的参数化形式，而是直接在原子坐标空间学习局部键长、口袋几何和跨分子界面。代价是扩散采样具有随机性，因此论文默认用多个随机种子和多个 diffusion samples，再靠 Confidence Module 排名。

##### 损失函数：weighted aligned MSE + 局部几何约束

补充材料给出的核心结构损失先把真实结构刚性对齐到预测结构，再计算加权 MSE：

$$
\{x_l^{GT\text{-}aligned}\} =
\text{weighted\_rigid\_align}(\{x_l^{GT}\}, \{\hat{x}_l\}, \{w_l\})
$$

$$
\mathcal{L}_{MSE}
= \frac{1}{3}\operatorname{mean}_l
\left(w_l \left\|\hat{x}_l - x_l^{GT\text{-}aligned}\right\|_2^2\right)
$$

权重对 DNA、RNA 和 ligand 原子上调：

$$
w_l = 1
+ f_l^{DNA}\alpha_{DNA}
+ f_l^{RNA}\alpha_{RNA}
+ f_l^{ligand}\alpha_{ligand}
$$

论文补充材料中给出 \(\alpha_{DNA}=\alpha_{RNA}=5\)，\(\alpha_{ligand}=10\)。最终扩散损失还包含 bonded ligand/glycan 的键长损失与 smooth LDDT：

$$
\mathcal{L}_{diffusion}
=
\frac{\hat{t}^2 + \sigma_{data}^2}{(\hat{t}+\sigma_{data})^2}
\left(\mathcal{L}_{MSE} + \alpha_{bond}\mathcal{L}_{bond}\right)
+ \mathcal{L}_{smooth\_lddt}
$$

> 💡 关键：AlphaFold 3 的主要坐标损失不再是 AlphaFold 2 的 FAPE，而是更适合全原子复合物的对齐后坐标误差与局部结构质量约束。

##### 置信度与排名

Diffusion Module 可以给出多个候选构象，但下游用户通常需要一个可信结构。Confidence Module 因此预测残基/原子级和链间界面相关置信度；论文方法部分说明，全局排名会混合 pTM、ipTM，并加入减少严重 clash、提升无序区域处理的项；如果只关心特定链、界面或修饰残基，也可以使用链特异 pTM、界面 ipTM 或修饰残基局部 pLDDT 排名。

这种“生成多个候选，再用置信度选择”的范式比 AlphaFold 2 更接近生成模型工作流。它解释了为什么论文报告的结果通常来自多个 model seeds 和 diffusion samples 的 top-ranked 结构，也解释了 AF3 在配体 pose 或蛋白-核酸界面上能显著受益于采样。

##### 与 AlphaFold 2 的本质区别

AlphaFold 2 的创新核心是 Evoformer + Structure Module：用 MSA/pair 双通道推理蛋白折叠，再通过 IPA 和 FAPE 生成蛋白原子坐标。AlphaFold 3 的创新核心则是 Pairformer + Diffusion Module：把多分子复合物编码为统一 token-pair 表示，再在全原子坐标空间条件生成结构。前者像“端到端蛋白折叠器”，后者更像“生物分子复合物生成器”。

#### 🧪 练习题

```yaml
question: "AlphaFold 3 相比 AlphaFold 2 的关键结构生成变化是什么？"
options:
  - "完全删除 MSA 和模板搜索，只使用小分子指纹预测结构"
  - "用条件扩散模块从噪声原子坐标迭代去噪，替代以 Structure Module/FAPE 为核心的坐标生成方式"
  - "只预测蛋白质二级结构，不输出三维坐标"
  - "把所有配体都转换成氨基酸残基后再运行 AlphaFold 2"
answer: 1
explain: "AlphaFold 3 的主干仍使用序列、模板、MSA 等信息，但最终坐标由条件扩散模块在原子坐标空间生成，并用 weighted aligned MSE、smooth LDDT 和键长损失训练。"
```
