### Chai-1 - 支持实验约束的多模态分子结构预测模型

```yaml
id: chai1
name: Chai-1
full_name: "Chai-1 (Chai-1)"
year: "2024.09"
org: "Chai Discovery"
paper_url: "https://www.chaidiscovery.com/blog/introducing-chai-1"
category: protein_structure
parent: alphafold3
motivation: "支持实验约束的多模态基础模型"
```

#### 📝 一句话总结

Chai-1 提出了一个面向蛋白质、小分子、DNA/RNA、修饰残基和复合物的多模态结构预测模型，在 AlphaFold3 式 all-atom 扩散框架上加入蛋白语言模型嵌入与实验约束输入，解决了多分子体系预测对 MSA 依赖强、难以利用湿实验先验的问题。

#### 🎯 核心要点

- **多模态输入**：统一处理蛋白质序列、小分子 SMILES、DNA/RNA、糖基化和共价修饰等生物分子实体
- **AlphaFold3 式框架**：整体训练策略和结构预测范式跟随 AlphaFold3，即 token/pair trunk 加 all-atom diffusion 生成坐标
- **蛋白语言模型嵌入**：额外加入 residue-level protein language model embeddings，增强无 MSA single-sequence 模式
- **实验约束特征**：支持 pocket、contact、docking constraints，用于模拟 XL-MS、epitope mapping、已知接触残基等湿实验信息
- **单模型评测设定**：技术报告称训练一个 cutoff 为 2021-01-12 的单一模型，而不是为不同评测集训练多个模型
- **采样与排序**：主报告中使用 recycles、trunk samples、diffusion samples 生成多个候选，并用 confidence model 排名
- **代表性结果**：官方博客报告 PoseBusters 蛋白-配体成功率 77%（AF3 为 76%），CASP15 单体 Cα-LDDT 0.849，蛋白 multimer DockQ acceptable rate 69.8%
- **开放使用路径**：提供 Web 界面和 `chai-lab` 仓库；原始链接是新闻页，完整方法细节需要追溯到 bioRxiv 技术报告与代码仓库

#### 🔬 深入细节

##### 图示与来源

![Chai-1 官方性能图](https://github.com/chaidiscovery/chai-lab/raw/main/assets/performance_barplot.png)
*图：Chai-1 官方仓库中的性能概览图，展示蛋白-配体、蛋白复合物、抗体-蛋白和单体任务上的成功率对比。*

![Chai-1 实验约束效果图](https://framerusercontent.com/images/icSSrTXU76WdTzKi30rSK70UY.png?height=1962&width=4716)
*图：官方发布页展示的抗体-抗原约束实验。指定少量 epitope/contact 信息可以显著提升抗体-抗原复合物预测。*

原始 `paper_url` 是 Chai Discovery 新闻页，方法级解读主要追溯到技术报告 `Chai-1: Decoding the molecular interactions of life`（bioRxiv DOI: https://doi.org/10.1101/2024.10.10.615955）和官方代码仓库 https://github.com/chaidiscovery/chai-lab。技术报告 Figure 1 描述模型架构和输入特征，但公开网页上更稳定的直链图片主要来自官方博客和仓库资产。

##### 算法伪代码

```python
# Chai-1 推理流程的抽象伪代码
def chai1_predict(entities, optional_inputs, model, n_trunk=5, n_diffusion=5):
    """
    entities: proteins / DNA / RNA / ligands / modified residues
    optional_inputs: MSA, templates, protein LM embeddings, pocket/contact/docking restraints
    """
    # 1. 构造多模态 token
    tokens = tokenize_entities(entities)       # residue/base/ligand atom or component tokens
    feats = embed_chemical_and_sequence_features(tokens)

    # 2. 加入可选信息
    if optional_inputs.msa:
        feats += encode_msa(optional_inputs.msa)
    if optional_inputs.templates:
        feats += encode_templates(optional_inputs.templates)
    if optional_inputs.protein_lm_embeddings:
        feats += project_plm_embeddings(optional_inputs.protein_lm_embeddings)
    if optional_inputs.restraints:
        feats += encode_restraints(optional_inputs.restraints)

    candidates = []
    for i in range(n_trunk):
        # 3. AF3-like trunk: 更新 single/token 与 pair 表征
        single, pair = pairformer_trunk(feats, recycle=True)

        for j in range(n_diffusion):
            # 4. all-atom diffusion: 从噪声坐标逐步去噪生成结构
            x = initialize_noisy_coordinates(tokens)
            for t in diffusion_schedule():
                x = denoise_coordinates(x, t, single, pair)
            candidates.append(x)

    # 5. 置信度模型排序，输出 top-ranked 结构和 PAE/pLDDT/ipTM 等指标
    scores = confidence_model(candidates, single, pair)
    return rank_by_confidence(candidates, scores)
```

##### 动机与背景

AlphaFold2/AlphaFold-Multimer 在蛋白质单体和部分复合物上非常强，但它们的输入和输出空间主要围绕蛋白质序列和 MSA 设计。真实药物发现问题通常更复杂：蛋白质会与小分子、核酸、修饰残基、糖基化结构和抗体抗原界面共同出现，而且研究者往往已经掌握部分实验先验，例如某个交联残基对、抗体识别的 epitope、可能的结合口袋或已知共价键。

Chai-1 的目标是把结构预测模型变成可提示的多模态基础模型。它沿用 AlphaFold3 之后的关键范式：用 token/pair trunk 建模分子实体间的关系，再用 all-atom diffusion 生成三维坐标。与只从序列和 MSA 预测不同，Chai-1 明确把 wet-lab constraints 作为模型输入通道，让模型在困难复合物上利用外部证据。

##### 核心机制 1：多模态 token 与 PairFormer 表征

Chai-1 的报告说明其架构和训练策略大体跟随 AlphaFold3。抽象来看，模型把不同分子实体统一成 token：

$$
\mathcal{T} = \{t_1, t_2, \ldots, t_L\}
$$

蛋白质残基、核酸碱基、配体原子或化学组件都可以成为 token。模型维护 single/token representation \(s_i\) 和 pair representation \(z_{ij}\)：

$$
s_i \in \mathbb{R}^{c_s}, \quad z_{ij} \in \mathbb{R}^{c_z}
$$

single 表示描述单个 token 的身份、化学类型、序列上下文和语言模型嵌入；pair 表示描述两个 token 的相对位置、链关系、模板距离、接触约束和潜在相互作用。PairFormer/Trunk 的任务是把这些异构输入融合成可用于扩散去噪的条件信息。

##### 核心机制 2：蛋白语言模型嵌入降低 MSA 依赖

传统结构预测依赖 MSA 中的共进化信息：如果两个残基在进化过程中协同突变，它们更可能在三维空间中接触。但抗体、孤儿蛋白、快速演化蛋白或工程蛋白经常缺乏深 MSA。Chai-1 在输入中加入 residue-level protein language model embeddings：

$$
s_i^{(0)} =
\operatorname{Embed}_{\text{token}}(t_i)
+ W_{\text{PLM}} h_i^{\text{PLM}}
+ W_{\text{MSA}} h_i^{\text{MSA}}
+ W_{\text{template}} h_i^{\text{template}}
$$

其中 \(h_i^{\text{PLM}}\) 来自大规模蛋白语言模型。直觉上，PLM 从海量单序列中学习到局部 motif、结构倾向和远程依赖，不能完全替代 MSA 的家族共进化信息，但可以在 single-sequence 模式下补足很多结构先验。

> 💡 关键：Chai-1 的 single-sequence 能力不是简单“去掉 MSA”，而是用语言模型嵌入给 trunk 提供额外的序列语义表示，使模型在没有遗传搜索结果时仍能工作。

##### 核心机制 3：实验约束作为可提示条件

Chai-1 把约束设计成训练时可见、推理时可选的特征。报告中提到 pocket、contact、docking 三类约束，它们对应不同粒度的先验：

- **pocket constraint**：指定某些残基属于潜在结合口袋或 epitope
- **contact constraint**：指定两个 token/残基在某个距离阈值内接触
- **docking constraint**：指定实体之间更粗粒度的结合或相对定位信息

一个 contact 约束可以抽象为 pair feature：

$$
c_{ij}^{(r)} =
\begin{cases}
1, & \text{用户或实验提示 } d(i,j) \le r \\
0, & \text{否则}
\end{cases}
$$

一个 pocket 约束可以抽象为 token feature：

$$
p_i =
\begin{cases}
1, & i \in \text{specified pocket/epitope residues} \\
0, & \text{otherwise}
\end{cases}
$$

这些特征会进入 single/pair 表示，影响后续 trunk 和 diffusion。训练时对约束做 dropout 或随机采样，避免模型在有约束时过拟合，也让模型能处理现实中“不完整、不精确”的实验提示。官方报告中的抗体-抗原实验显示，只指定少量 epitope/contact 信息即可显著提升 DockQ 成功率。

##### 核心机制 4：All-atom diffusion 生成结构

在 AlphaFold3 式框架中，最终坐标不是由 IPA 逐步构造残基框架，而是由扩散模块在全原子空间去噪生成。简化写法如下：

$$
\tilde{x}_\sigma = x_0 + \sigma \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)
$$

模型学习在条件 \(c=(s,z,\text{features})\) 下从带噪坐标 \(\tilde{x}_\sigma\) 恢复真实坐标：

$$
\mathcal{L}_{\text{diff}}
= \mathbb{E}_{\sigma,\epsilon}
\left[
w(\sigma)
\left\|
\operatorname{Align}\left(D_\theta(\tilde{x}_\sigma, \sigma, c), x_0\right)
- x_0
\right\|_2^2
\right]
$$

这里 \(\operatorname{Align}\) 表示训练中常见的刚体对齐或局部对齐处理，用于避免全局旋转平移影响坐标误差。由于 Chai-1 技术报告没有完整公开所有扩散超参和损失权重，上式是对其 AF3-like all-atom diffusion 范式的抽象描述，而不是逐项复刻实现。

推理时模型从噪声坐标出发，按噪声日程多步去噪：

$$
x_{\sigma_{k-1}} = \operatorname{Step}\left(x_{\sigma_k}, D_\theta(x_{\sigma_k}, \sigma_k, c)\right)
$$

同一输入会采样多个候选结构，再由 confidence model 根据 pLDDT、PAE、pTM/ipTM 等置信度信号排序。

##### 训练与推理细节

技术报告给出的关键训练/推理设定包括：

- 训练数据包含 PDB 与 AlphaFoldDB 结构，PDB cutoff 为 2021-01-12
- 模板由 PDB70 生成，并使用相同 cutoff 避免评测泄漏
- 遗传搜索使用 OpenProteinSet 中已有 MSA，缺失时用 JackHMMER 对 UniRef90、UniProt、MGnify 等数据库生成
- 主报告推理使用同一个模型完成所有评测，不为各评测集单独训练模型
- 默认主评测中使用 4 次 recycles、5 个 trunk samples 和 5 个 diffusion samples，总计 25 个候选结构
- single-sequence 模式下省略 MSAs 和 templates，只提供输入序列与 protein LM embeddings
- 当前推理限制为最多 2048 tokens

##### 与 AlphaFold3 / AlphaFold-Multimer 的区别

| 维度 | AlphaFold-Multimer | AlphaFold3 | Chai-1 |
|---|---|---|---|
| 主要对象 | 蛋白质复合物 | 蛋白、核酸、小分子、修饰等 | 蛋白、核酸、小分子、修饰等 |
| 生成方式 | Evoformer + Structure Module | AF3 trunk + all-atom diffusion | AF3-like trunk + all-atom diffusion |
| MSA 依赖 | 强 | 仍使用遗传信息 | 支持 MSA，也强调 single-sequence |
| 实验约束 | 非核心输入 | 有相关条件能力但公开使用受限 | 明确支持 pocket/contact/docking restraints |
| 开放形态 | 开源推理权重 | 商业/服务受限 | Web + `chai-lab` 代码/权重 |

Chai-1 最有特色的地方是“可提示结构预测”：当用户知道几个接触残基或 epitope 残基时，不需要把这些信息转化为手工 docking 约束或后处理筛选，而是直接作为模型输入，让 trunk 和 diffusion 在生成过程中使用它。

##### 结果解读

官方博客报告 Chai-1 在 PoseBusters 上达到 77% 成功率，与 AlphaFold3 报告的 76% 相当，并明显高于 RoseTTAFold All-Atom。蛋白 multimer 任务中，Chai-1 的 DockQ acceptable prediction rate 为 69.8%，高于 AlphaFold-Multimer 2.3 的 67.7%。CASP15 单体上，Chai-1 报告 Cα-LDDT 0.849，高于 AF2.3 的 0.843 和 ESM3-98B 的 0.801。

这些数字的重点不是简单宣称“全面超过 AF3”，而是说明一个公开可用的多模态模型已经能在蛋白-配体、蛋白复合物和单体结构上接近前沿系统，并且额外提供了约束输入和 single-sequence 推理能力。对于药物发现工作流，后两点往往比单一 benchmark 分数更重要。

#### 🧪 练习题

```yaml
question: "Chai-1 引入实验约束特征的主要目的是什么？"
options:
  - "减少模型参数量，使模型可以在 CPU 上训练"
  - "把 epitope、交联残基、接触残基等湿实验先验直接作为结构生成条件"
  - "替代 all-atom diffusion，使模型只输出二维接触图"
  - "让模型完全不需要任何序列输入"
answer: 1
explain: "Chai-1 的 pocket/contact/docking constraints 用来把实验或先验知识注入 single/pair 表示，从而引导困难复合物的结构生成；它并不替代扩散模块，也不取消序列输入。"
```
