---
domain: ai4sci
topic_id: ai4biology
topic_name: 生命科学AI
page_icon: 🧬
page_title: 生命科学AI技术图谱
page_subtitle: '{build_date} 版'
page_desc: AlphaFold、蛋白质设计、基因组学与单细胞分析等用于生命科学的AI技术
hero_pills: []
count_pill: '{count} 个算法'
categories:
  protein_structure:
    label: 蛋白质结构预测
    color: '#3B82F6'
  protein_design:
    label: 蛋白质设计与生成
    color: '#10B981'
  genomics:
    label: 基因组学AI
    color: '#8B5CF6'
  single_cell:
    label: 单细胞分析AI
    color: '#F59E0B'
  drug_discovery:
    label: 药物发现AI
    color: '#EF4444'
  other_bio:
    label: 其他生命科学AI
    color: '#6B7280'
image_base: ../../content/ai4sci/ai4biology/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4biology/overview/zhihu__当_AI_读懂了生命的语言：大语言模型在生物与化学领域的全景图__5e054874/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4biology/latest/zhihu__76｜生物AI篇：生命序列即语言——从ESM到AlphaFold3的结构预测跃迁__3292b142/article.md

## 算法演化关系

```yaml
nodes:
- id: alphafold1
  x: 100
  y: 150
  category: protein_structure
- id: alphafold2
  x: 200
  y: 120
  category: protein_structure
- id: rosettafold
  x: 200
  y: 180
  category: protein_structure
- id: omegafold
  x: 300
  y: 160
  category: protein_structure
- id: esmfold
  x: 400
  y: 140
  category: protein_structure
- id: alphafold3
  x: 500
  y: 100
  category: protein_structure
- id: openfold
  x: 500
  y: 140
  category: protein_structure
- id: chai1
  x: 550
  y: 120
  category: protein_structure
- id: boltz1
  x: 580
  y: 100
  category: protein_structure
- id: tdfold
  x: 700
  y: 160
  category: protein_structure
- id: protenix
  x: 700
  y: 100
  category: protein_structure
- id: esmif
  x: 280
  y: 300
  category: protein_design
- id: proteinmpnn
  x: 320
  y: 280
  category: protein_design
- id: framediff
  x: 380
  y: 320
  category: protein_design
- id: rfdiffusion
  x: 420
  y: 280
  category: protein_design
- id: chroma
  x: 460
  y: 320
  category: protein_design
- id: saprot
  x: 500
  y: 300
  category: protein_design
- id: rfdiffusion3
  x: 650
  y: 280
  category: protein_design
- id: dnabert
  x: 150
  y: 450
  category: genomics
- id: enformer
  x: 180
  y: 480
  category: genomics
- id: eve
  x: 180
  y: 420
  category: genomics
- id: hyenadna
  x: 380
  y: 470
  category: genomics
- id: dnabert2
  x: 500
  y: 450
  category: genomics
- id: borzoi
  x: 520
  y: 480
  category: genomics
- id: grover
  x: 540
  y: 420
  category: genomics
- id: evo
  x: 580
  y: 450
  category: genomics
- id: nucleotide_transformer
  x: 650
  y: 420
  category: genomics
- id: nucleotide_gpt
  x: 700
  y: 480
  category: genomics
- id: evo2
  x: 720
  y: 450
  category: genomics
- id: scbert
  x: 320
  y: 600
  category: single_cell
- id: geneformer
  x: 400
  y: 580
  category: single_cell
- id: scgpt
  x: 500
  y: 600
  category: single_cell
- id: cellplm
  x: 520
  y: 630
  category: single_cell
- id: scfoundation
  x: 540
  y: 580
  category: single_cell
- id: regformer
  x: 700
  y: 600
  category: single_cell
- id: geneformer_v2
  x: 700
  y: 580
  category: single_cell
- id: diffdock
  x: 400
  y: 720
  category: drug_discovery
- id: unimol
  x: 420
  y: 740
  category: drug_discovery
- id: physdock
  x: 650
  y: 720
  category: drug_discovery
- id: rhofold
  x: 340
  y: 820
  category: other_bio
- id: igfold
  x: 400
  y: 820
  category: other_bio
- id: iggm
  x: 650
  y: 820
  category: other_bio
edges:
- from: alphafold1
  to: alphafold2
  label: 注意力革新
- from: alphafold2
  to: alphafold3
  label: 扩散架构
- from: alphafold2
  to: openfold
  label: 开源复现
- from: alphafold3
  to: chai1
  label: 实验约束
- from: alphafold3
  to: boltz1
  label: 开源商用
- from: alphafold3
  to: protenix
  label: 精度超越
- from: rosettafold
  to: rfdiffusion
  label: 扩散生成
- from: rfdiffusion
  to: rfdiffusion3
  label: 全原子
- from: scgpt
  to: regformer
  label: 调控层级
- from: dnabert
  to: dnabert2
  label: BPE分词
- from: enformer
  to: borzoi
  label: 超长输入
- from: evo
  to: evo2
  label: 全生命域
- from: geneformer
  to: geneformer_v2
  label: 规模扩展
- from: diffdock
  to: physdock
  label: 物理引导
- from: alphafold2
  to: esmfold
  label: 语言模型
- from: alphafold2
  to: proteinmpnn
  label: 逆折叠
- from: esmfold
  to: saprot
  label: 结构感知
- from: dnabert
  to: scbert
  label: BERT迁移
- from: alphafold2
  to: igfold
  label: 抗体优化
- from: alphafold2
  to: rhofold
  label: RNA适配
- from: rfdiffusion
  to: framediff
  label: SE(3)扩散
- from: rfdiffusion
  to: chroma
  label: 可编程
- from: alphafold3
  to: diffdock
  label: 对接扩散
- from: evo
  to: nucleotide_transformer
  label: 基础模型
milestones:
- id: alphafold2
  label: AlphaFold 2
  description: 注意力机制革新蛋白质结构预测，解决50年折叠难题
- id: rfdiffusion
  label: RFdiffusion
  description: 扩散模型实现从头蛋白质设计，开启可编程生物学时代
- id: evo2
  label: Evo 2
  description: 9万亿碱基对训练，首个全生命域基因组基础模型
```

## 核心算法

### AlphaFold 1

```yaml
id: alphafold1
num: 1
name: AlphaFold 1
full_name: AlphaFold 1 (AlphaFold 1)
year: '2020.01'
org: Google DeepMind
parent: —
paper_url: https://www.nature.com/articles/s41586-019-1923-7
project_url: ''
category: protein_structure
motivation: 深度残差网络预测距离直方图
```

#### 📝 一句话总结
AlphaFold 1 提出用深度残差网络预测残基对距离直方图和骨架扭转角分布，再把这些概率分布转换为可微的蛋白质特异性势能并用梯度下降折叠结构，解决了传统接触图和片段采样信息量不足、搜索成本高的问题。

#### 🎯 核心要点
- **距离直方图而非二值接触图**：对每个残基对预测 \(C_\beta\) 距离的完整概率分布，保留近、中、远距离约束和不确定性
- **深度二维残差卷积网络**：以序列特征、MSA profile、共进化/Potts 特征为输入，在 \(L \times L\) 残基对网格上预测 distogram
- **骨架扭转角预测**：同时预测每个残基的 \(\phi,\psi\) 分布，为从角度空间生成三维骨架提供局部构象先验
- **概率到势能的转换**：把预测距离分布除以参考态分布，构造类似势均力的蛋白质特异性势能
- **可微结构优化**：直接优化扭转角，反复执行梯度下降和 noisy restarts，最后可用 Rosetta/物理约束做松弛
- **CASP13 突破**：在 free-modelling 域中 24/43 个达到 TM-score \(\ge 0.7\)，明显高于下一名的 14/43
- **承上启下**：仍是“预测约束 + 优化”的两阶段范式，但把结构预测从手工势能/采样推进到深度学习概率势能

#### 🔬 深入细节
##### 框架图与可访问来源

![AlphaFold 1 系统与残差网络示意图](https://media.springernature.com/full/springer-static/esm/art%3A10.1038%2Fs41586-019-1923-7/MediaObjects/41586_2019_1923_Fig5_ESM.jpg)
*图：Nature Extended Data Fig. 1。整体流程从序列和 MSA 特征出发，经深度 ResNet 预测距离/扭转角分布，再构造势能并用梯度下降生成结构。*

可访问来源：论文页面 https://www.nature.com/articles/s41586-019-1923-7；Nature 图像直链见上；可访问 PDF 版本包括 https://discovery.ucl.ac.uk/10089234/1/343019_3_art_0_py4t4l_convrt.pdf。

##### 算法伪代码

```python
# AlphaFold 1 核心流程：distogram -> potential -> gradient descent
def alphafold1_predict(sequence):
    msa = build_msa(sequence, tools=["HHblits", "PSI-BLAST"])
    one_d_features = make_sequence_and_profile_features(sequence, msa)
    two_d_features = make_pair_features(msa)  # covariation / Potts / sequence separation

    # Deep ResNet 在残基对矩阵上输出概率分布
    p_dist = distogram_resnet(one_d_features, two_d_features)  # [L, L, 64 bins]
    p_torsion = torsion_head(one_d_features, two_d_features)   # per-residue phi/psi

    candidates = []
    for restart in range(num_noisy_restarts):
        phi, psi = sample_initial_torsions(p_torsion)
        for step in range(num_gradient_steps):
            coords = build_backbone_from_torsions(sequence, phi, psi)
            loss = distance_potential(coords, p_dist)
            loss += torsion_potential(phi, psi, p_torsion)
            loss += vdw_and_chain_geometry_penalties(coords)
            phi, psi = optimizer_step([phi, psi], loss)
        candidates.append(relax_and_score(coords))

    return select_lowest_potential(candidates)
```

##### 动机与背景

AlphaFold 1 面对的是 CASP13 时代的典型瓶颈：共进化方法已经能预测“两个残基是否接触”，但二值接触图只告诉模型距离是否小于某个阈值，无法表达“应该是 6Å、10Å 还是 18Å”，也无法表达预测不确定性。传统 Rosetta 片段组装和模拟退火需要大量采样，尤其在长链、少同源序列或多域蛋白上容易搜索失败。

AlphaFold 1 的关键选择是把结构问题拆成两步：先学习高维几何约束，再用可微优化实现这些约束。论文中的 distogram 是全距离分布而非单个距离点估计；如果某个残基对存在多峰或不确定性，分布会把这种信息保留下来，后续势能优化时不会被一个错误的硬约束绑死。

##### 深度残差网络预测 distogram

网络输入由一维特征和二维特征拼接而成。一维特征包括氨基酸类型、profile、二级结构相关信息等；二维特征包括残基间序列距离、MSA 诱导的协方差/共进化信号。对每个残基对 \((i,j)\)，网络输出离散距离分布：

$$
p_{ij,b} = P(d_{ij} \in \text{bin}_b \mid S, \mathrm{MSA}(S)), \quad b=1,\ldots,B
$$

训练目标是对真实结构中的 \(C_\beta\) 距离分箱做交叉熵：

$$
\mathcal{L}_{\mathrm{dist}} =
-\sum_{i<j}\sum_{b=1}^{B} y_{ij,b}\log p_{ij,b}
$$

其中 \(y_{ij,b}\) 是真实距离所在分箱的 one-hot 标签。公开方法描述中给出的最终模型使用 64 个距离分箱覆盖约 2-22Å 的范围；深度残差块和膨胀卷积让远距离残基对的信息可以在二维矩阵中快速传播。

##### 从概率分布构造势能

单纯最大化每个残基对的预测概率会偏向背景距离分布，因此 AlphaFold 1 引入参考态 \(p^{\mathrm{ref}}_{s,b}\)，其中 \(s=|i-j|\) 表示序列间隔。距离势能可理解为预测分布相对参考态的对数似然比：

$$
V_{\mathrm{dist}}(X)
= -\sum_{i<j}
\log \frac{
p_{ij}(b(d_{ij}(X)) \mid S,\mathrm{MSA})
}{
p^{\mathrm{ref}}_{|i-j|}(b(d_{ij}(X)))
}
$$

完整优化目标还包含扭转角势能和物理排斥项：

$$
V(X,\phi,\psi)
= V_{\mathrm{dist}}(X)
+ \lambda_{\mathrm{tor}}V_{\mathrm{tor}}(\phi,\psi)
+ \lambda_{\mathrm{vdw}}V_{\mathrm{vdw}}(X)
$$

> 💡 关键：这里的势能不是从原子物理一项项手写出来的，而是由神经网络对“这条序列应该呈现什么几何关系”的概率判断转换而来。深度学习负责给出全局几何约束，优化器负责找到满足这些约束的三维构象。

##### 结构生成与传统方法的区别

AlphaFold 1 在扭转角空间中构建骨架，使用梯度下降降低 \(V\)。因为从 \(\phi,\psi\) 到原子坐标是可微的，距离误差可以反传到角度变量。noisy restarts 的作用是缓解非凸优化：不同初始角度会探索不同折叠路径，最终选择势能最低或综合评分最好的候选结构。

与 trRosetta 等同代方法相比，AlphaFold 1 的距离分布更直接地提供了“应当相距多远”的软约束；与传统 Rosetta 相比，它不再主要依赖片段库和手工统计势，而是用 PDB/MSA 数据训练出的网络生成蛋白质特异性势能。它仍不是 AlphaFold 2 那种端到端坐标网络，但已经证明了“深度网络预测全局几何 + 可微优化”可以显著优于接触图驱动的采样流程。

##### 局限性

AlphaFold 1 的三维结构不是网络一次性输出，而是经过后处理优化得到；距离预测、扭转角预测和最终坐标之间存在目标错配。它也没有 AlphaFold 2 的等变结构模块、recycling 和端到端 FAPE 训练，因此局部原子级几何、结构置信度和长程多域装配仍有明显短板。

#### 🧪 练习题
```yaml
question: "AlphaFold 1 为什么要预测距离直方图而不是只预测接触图？"
options:
  - "距离直方图能表达残基对距离的完整概率分布和不确定性，给势能优化提供更丰富约束"
  - "距离直方图可以完全避免使用多序列比对"
  - "距离直方图让网络不再需要训练标签"
  - "距离直方图只用于可视化，对结构优化没有影响"
answer: 0
explain: "接触图通常只表示是否小于某个阈值；distogram 保留距离分箱概率和不确定性，能被转换为蛋白质特异性势能来指导梯度下降。"
```

### AlphaFold 2

```yaml
id: alphafold2
num: 2
name: AlphaFold 2
full_name: AlphaFold 2 (AlphaFold 2)
year: '2021.07'
org: Google DeepMind
parent: alphafold1
paper_url: https://www.nature.com/articles/s41586-021-03819-2
project_url: ''
category: protein_structure
motivation: Evoformer注意力机制革新结构预测
```

#### 📝 一句话总结
AlphaFold 2 重新设计了 AlphaFold，将 MSA、模板、残基对几何和三维结构统一到端到端可训练的 Evoformer + Structure Module 架构中，用等变注意力和 FAPE 损失直接预测原子坐标，在 CASP14 中把蛋白质结构预测推进到接近实验精度。

#### 🎯 核心要点
- **端到端坐标预测**：从序列、MSA 和模板直接输出三维结构，不再依赖 AlphaFold 1 的 distogram 后处理优化作为核心流程
- **Evoformer 主干**：维护 MSA representation 与 pair representation，通过行/列注意力、外积均值、三角乘法和三角注意力反复交换信息
- **Structure Module**：使用 Invariant Point Attention (IPA) 在三维局部坐标系中更新残基刚体框架，保持全局旋转/平移等变性
- **Recycling 迭代细化**：把上一次预测的结构和表征反馈回网络，多轮修正长程相互作用和域间摆放
- **FAPE 核心损失**：用 frame-aligned point error 比较局部坐标系下的预测原子位置，使网络关注残基取向和局部几何
- **多任务辅助训练**：包含 distogram、masked MSA、pLDDT、side-chain、violation、pTM 等目标，提升表征质量和置信度估计
- **自蒸馏扩展数据**：利用未标注 Uniclust 序列的预测结构参与训练，缓解 PDB 实验结构数量有限的问题
- **置信度输出**：pLDDT 和 pTM 让用户能判断局部结构和整体拓扑是否可信

#### 🔬 深入细节
##### 模型架构图与可访问来源

![AlphaFold 2 Evoformer 与结构模块示意图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png)
*图：Nature Fig. 3。上半部分是 Evoformer 中 MSA/pair 表征的交替更新；下半部分是 Structure Module，用 IPA 从单残基表征和 pair 表征预测骨架框架、扭转角和原子位置。*

可访问来源：论文页面 https://www.nature.com/articles/s41586-021-03819-2；补充方法入口 https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_MOESM1_ESM.pdf；官方图像直链见上。

##### 算法伪代码

```python
# AlphaFold 2 简化推理流程
def alphafold2_predict(sequence):
    msa = search_genetic_databases(sequence)
    templates = search_structure_database(sequence)

    msa_repr = embed_msa(msa)                 # [N_msa, L, c_m]
    pair_repr = embed_pair(sequence, templates)  # [L, L, c_z]
    prev_structure = None

    for recycle in range(num_recycles):
        if prev_structure is not None:
            pair_repr += encode_prev_distogram(prev_structure)
            msa_repr[0] += encode_prev_single(prev_structure)

        for block in range(48):  # paper model uses a deep Evoformer stack
            msa_repr = row_attention_with_pair_bias(msa_repr, pair_repr)
            msa_repr = column_attention(msa_repr)
            pair_repr += outer_product_mean(msa_repr)
            pair_repr = triangle_multiplication(pair_repr)
            pair_repr = triangle_attention(pair_repr)

        single_repr = extract_query_sequence(msa_repr)
        prev_structure = structure_module(single_repr, pair_repr)  # IPA + torsions

    relaxed = amber_relax(prev_structure)
    confidence = predict_plddt_and_ptm(single_repr, pair_repr)
    return relaxed, confidence
```

##### 动机与背景

AlphaFold 1 已经证明深度网络能把 MSA 中的进化信号转化为距离约束，但它仍是两阶段系统：网络预测 distogram，优化器再寻找满足约束的结构。这个设计的问题是，网络训练目标并不直接等于最终三维结构质量；后处理优化也很难把局部原子几何、残基取向和全局拓扑统一起来。

AlphaFold 2 的核心突破是让网络自己学习“如何从序列/MSA 推理三维结构”。Evoformer 不只预测距离图，而是在 MSA 表征和 pair 表征之间反复传递信息；Structure Module 则把这些表征转成残基刚体框架和原子坐标。这样，最终坐标误差可以反向传播到 MSA 注意力和 pair 更新，训练目标与推理目标更一致。

##### Evoformer：MSA 与 pair 表征的双通路推理

Evoformer 同时维护两类状态：

$$
M \in \mathbb{R}^{N_{\mathrm{msa}}\times L\times c_m}, \quad
Z \in \mathbb{R}^{L\times L\times c_z}
$$

\(M\) 表示 MSA 中每条同源序列的残基上下文，\(Z\) 表示残基对之间的几何关系。行注意力让每条 MSA 序列内部沿残基维度交流，列注意力让同一位置的不同同源序列交流；外积均值把 MSA 中的共变模式写入 pair 表征：

$$
Z_{ij} \leftarrow Z_{ij} + \mathrm{Linear}\left(
\frac{1}{N_{\mathrm{msa}}}\sum_s M_{s,i} \otimes M_{s,j}
\right)
$$

pair 表征随后通过三角乘法和三角注意力更新。直觉上，残基 \(i,j,k\) 构成三角形，如果 \(i\) 与 \(k\)、\(k\) 与 \(j\) 的关系已知，那么 \(i\) 与 \(j\) 的距离和取向也应受到约束。这比二维卷积更适合表达蛋白质几何中的闭环一致性。

##### Structure Module 与 IPA

Structure Module 为每个残基维护一个局部刚体框架 \(T_i=(R_i,t_i)\)，并预测骨架点和侧链扭转角。Invariant Point Attention 的注意力打分同时考虑标量表征、pair bias 和三维点在全局空间中的距离：

$$
\alpha_{ij} \propto
\exp\left(
\frac{q_i^\top k_j}{\sqrt{d}}
+ b_{ij}
- \gamma \sum_p
\left\|T_i q_{i,p}^{\mathrm{point}} - T_j k_{j,p}^{\mathrm{point}}\right\|^2
\right)
$$

因为三维点都通过各自残基框架 \(T_i,T_j\) 变换到全局空间，整体结构旋转或平移不会改变相对几何关系。这使网络可以自然处理“同一个蛋白质在不同坐标系下应是同一个结构”的约束。

##### FAPE 损失与辅助目标

AlphaFold 2 的核心结构损失是 frame-aligned point error。它把预测原子点和真实原子点分别放到同一个残基局部框架中比较：

$$
\mathcal{L}_{\mathrm{FAPE}} =
\frac{1}{N_fN_a}\sum_{k=1}^{N_f}\sum_{i=1}^{N_a}
\min\left(
\left\|
T_k^{-1}x_i - \hat{T}_k^{-1}\hat{x}_i
\right\|,
d_{\mathrm{clamp}}
\right)
$$

这里 \(T_k\) 与 \(\hat{T}_k\) 分别是真实和预测的第 \(k\) 个残基框架，\(x_i\) 与 \(\hat{x}_i\) 是真实和预测原子坐标。FAPE 的好处是同时惩罚位置和取向错误，又不会要求整条链一次性全局对齐。

训练目标可概括为多任务加权和：

$$
\mathcal{L} =
w_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ w_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ w_{\mathrm{msa}}\mathcal{L}_{\mathrm{masked\ MSA}}
+ w_{\mathrm{lddt}}\mathcal{L}_{\mathrm{pLDDT}}
+ w_{\mathrm{viol}}\mathcal{L}_{\mathrm{violation}}
+ \cdots
$$

> 💡 关键：FAPE 让坐标预测成为训练主目标；masked MSA 和 distogram 等辅助目标则迫使 Evoformer 保留进化和几何信息，避免网络只在最后结构模块中“临时拼结构”。

##### Recycling 与置信度

Recycling 把一次预测得到的结构、pair 信息和单序列表征反馈给同一网络，相当于让模型反复审阅自己的答案。第一轮可能先形成局部二级结构和粗略拓扑，后续轮次再修正域间相对位置、长程接触和局部冲突。论文表明 recycling 以较小训练成本显著提升准确率。

模型还输出 pLDDT 和 pTM。pLDDT 是逐残基局部置信度，适合判断某段 loop 或结构域是否可信；pTM 更关注整体拓扑和域间关系。最终 Amber relaxation 主要用于消除键长、键角、碰撞等立体化学问题，而不是大幅改变网络预测的拓扑。

##### 与 AlphaFold 1 的关键区别

| 维度 | AlphaFold 1 | AlphaFold 2 |
|------|-------------|-------------|
| 核心范式 | 预测距离/角度分布，再优化势能 | 端到端从表征预测坐标 |
| 主干网络 | 二维残差卷积网络 | Evoformer 注意力网络 |
| 几何建模 | distogram + 扭转角势能 | IPA 等变结构模块 |
| 训练目标 | 距离/角度交叉熵为主 | FAPE 坐标损失 + 多任务辅助 |
| 迭代方式 | noisy restarts 和外部优化 | recycling 网络内迭代 |
| 置信度 | 主要依赖后验评分 | pLDDT/pTM 内置输出 |

#### 🧪 练习题
```yaml
question: "AlphaFold 2 中 Evoformer 的核心作用是什么？"
options:
  - "只负责把最终结构交给 Amber 做能量最小化"
  - "在 MSA 表征和残基对表征之间反复交换信息，形成可供结构模块使用的几何推理状态"
  - "把蛋白质序列直接翻译成 PDB 文件，不使用多序列比对"
  - "用传统二维卷积替代所有注意力模块"
answer: 1
explain: "Evoformer 同时更新 MSA representation 和 pair representation，并通过外积均值、三角更新和注意力捕获共进化与几何一致性，这是结构模块能准确预测坐标的基础。"
```

### RoseTTAFold

```yaml
id: rosettafold
num: 3
name: RoseTTAFold
full_name: RoseTTAFold (RoseTTAFold)
year: '2021.07'
org: Baker Lab
parent: —
paper_url: https://www.science.org/doi/10.1126/science.abj8754
project_url: ''
category: protein_structure
motivation: 三轨网络同步迭代序列距离坐标
```

#### 📝 一句话总结
RoseTTAFold 提出三轨神经网络，在 1D MSA/序列表征、2D 残基对距离与取向表征、3D 坐标表征之间反复传递信息，使结构预测不再只在最后阶段才接触三维坐标，并能快速生成单体和蛋白复合物模型。

#### 🎯 核心要点
- **三轨架构**：并行维护 1D sequence/MSA track、2D distance/orientation track、3D coordinate track
- **跨轨信息流**：1D、2D、3D 表征在网络内部多次交换，使序列共变、残基对几何和原子坐标同步约束彼此
- **SE(3)-equivariant 结构更新**：3D track 使用等变注意力更新骨架坐标，保证旋转和平移下几何关系一致
- **两种输出模式**：pyRosetta 版本用预测距离/取向分布生成全原子模型；end-to-end 版本直接输出骨架坐标
- **不连续裁剪策略**：训练和推理中使用两段不连续序列片段组成的 crop，降低显存压力并保留长程互作信息
- **质量估计与实验建模**：输出逐残基误差/质量估计，可辅助 X-ray 分子置换和 cryo-EM 模型搭建
- **复合物预测能力**：可把两条或多条链作为带 chain break 的输入，直接预测复合物构象，绕过先建单体再刚体 docking 的传统流程
- **开放可用**：通过 Robetta server、GitHub 和 Zenodo 发布模型与代码，加速社区复现和下游设计

#### 🔬 深入细节
##### 模型架构图与可访问来源

![RoseTTAFold 三轨网络架构与性能](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/99d8/7612213/a047a0a660ce/EMS140725-f001.jpg)
*图：Science/PMC Fig. 1。RoseTTAFold 同时更新 1D、2D、3D 三条信息轨道，并在 CASP14 与 CAMEO 基准上展示自动化预测性能。*

可访问来源：Science DOI https://www.science.org/doi/10.1126/science.abj8754；PMC XML 与图像 https://europepmc.org/article/pmc/7612213；IPD PDF https://www.ipd.uw.edu/wp-content/uploads/2021/07/Baek_etal_Science2021_RoseTTAFold.pdf；代码 https://github.com/RosettaCommons/RoseTTAFold。

##### 算法伪代码

```python
# RoseTTAFold 简化流程：1D/2D/3D 三轨同步更新
def rosettafold_predict(sequences, templates=None):
    msa = build_or_pair_msa(sequences)
    crops = make_discontinuous_crops(sequences, total_len=260)

    crop_outputs = []
    for crop in crops:
        M = init_msa_track(msa, crop)          # 1D / MSA representation
        P = init_pair_track(msa, templates)    # 2D distance/orientation representation
        X = init_backbone_frames(crop)         # 3D coordinate representation

        for block in three_track_blocks:
            M = msa_attention(M, pair_bias=P)
            P = pair_update_from_msa(P, M)
            P = pair_attention_and_triangle_update(P)
            X = se3_equivariant_update(X, M, P)
            P = pair_update_from_coordinates(P, X)

        crop_outputs.append({
            "pair_logits": predict_dist_orient(P),
            "coords": predict_backbone(X),
            "lddt": predict_local_quality(M, P, X),
        })

    merged = merge_crop_predictions(crop_outputs)
    if use_pyrosetta:
        return pyrosetta_build_all_atom(merged["pair_logits"])
    return build_backbone_model(merged["coords"], merged["lddt"])
```

##### 动机与背景

RoseTTAFold 出现时，AlphaFold 2 在 CASP14 已展示巨大优势，但完整方法尚未发表。Baker Lab 从公开报告中提炼出关键方向：直接使用 MSA 而非预处理共变矩阵、用注意力替代纯二维卷积、让 1D 与 2D 表征反复交流、用等变网络处理三维坐标、尽可能端到端训练。

RoseTTAFold 的设计重点是进一步把三维坐标提前放入网络主体，而不是只在最后结构模块中处理。论文把这一点称为 1D、2D、3D 三轨：1D track 负责序列/MSA 上下文，2D track 负责残基对距离和取向，3D track 负责当前结构坐标。三条轨道之间有多条连接，模型可以一边更新共变信息，一边调整 pair 几何，一边修正三维骨架。

##### 三轨表征与跨轨更新

可以把 RoseTTAFold 的状态抽象为：

$$
M \in \mathbb{R}^{N_{\mathrm{msa}}\times L\times c_m},\quad
P \in \mathbb{R}^{L\times L\times c_p},\quad
X \in \mathbb{R}^{L\times 3\times c_x}
$$

其中 \(M\) 存储 MSA/序列信息，\(P\) 存储残基对距离与取向信息，\(X\) 存储骨架原子或残基框架坐标。一个三轨 block 的关键计算可以概括为：

$$
\begin{aligned}
M' &= \mathrm{MSAAttention}(M; P) \\
P' &= P + f_{\mathrm{MSA}\rightarrow\mathrm{pair}}(M') + f_{\mathrm{2D}}(P) \\
X' &= \mathrm{SE3Transformer}(X; M', P') \\
P'' &= P' + f_{\mathrm{coord}\rightarrow\mathrm{pair}}(X')
\end{aligned}
$$

> 💡 关键：2D pair track 不是三维结构之前的最终输出，而是贯穿全网络的工作记忆；3D 坐标也不是最后才生成，而是在中间层就参与约束 1D/2D 表征。

##### 训练目标与关键计算

RoseTTAFold 是多任务训练。pyRosetta 版本关注残基对距离/取向分布，end-to-end 版本还训练坐标输出和局部质量估计。可概括为：

$$
\mathcal{L} =
\mathcal{L}_{\mathrm{dist/orient}}^{\mathrm{CE}}
+ \lambda_{\mathrm{coord}}\mathcal{L}_{\mathrm{coord}}
+ \lambda_{\mathrm{quality}}\mathcal{L}_{\mathrm{lDDT}}
+ \lambda_{\mathrm{geom}}\mathcal{L}_{\mathrm{geometry}}
$$

其中距离/取向项通常是离散分箱交叉熵：

$$
\mathcal{L}_{\mathrm{dist/orient}}^{\mathrm{CE}}
= -\sum_{i<j}\sum_b y_{ij,b}\log p_{ij,b}
$$

坐标项约束预测骨架与真实结构对齐后的几何误差；质量项训练模型输出逐残基可信度，便于在分子置换或 cryo-EM 建模中给高可信区域更高权重。论文还报告了 end-to-end 版本和 pyRosetta 版本的取舍：前者速度快、可直接输出骨架；后者显存需求低一些并能通过 Rosetta 生成全原子侧链模型，但需要额外 CPU 建模时间。

##### 不连续 crop 与推理流程

三轨网络显存成本高，论文没有直接在大蛋白全长上训练最大模型，而是把输入切成两个不连续序列片段，总长度约 260 个残基。这样做不仅节省显存，也让模型在一个 crop 中看到远距离片段之间的相互作用。推理时对多个 crop 的 1D/2D 预测进行合并和平均，再生成最终结构。

对于单体预测，RoseTTAFold 可以走两条路径：一是把平均后的距离/取向分布送入 pyRosetta 生成全原子模型；二是把表征送入最终 SE(3)-equivariant 层直接生成骨架坐标。对于复合物预测，模型把多条链作为带 chain break 的输入，并使用 paired MSA 中的共进化信息推断链间摆放。

##### 与 AlphaFold 2 和 trRosetta 的区别

trRosetta 主要预测距离和取向，然后依赖 Rosetta 约束优化；AlphaFold 2 公开论文中的结构模块在 Evoformer 之后集中生成三维结构。RoseTTAFold 的差异在于把三维轨道更早、更频繁地放入主干网络，让坐标状态反过来影响 pair 表征和 MSA 注意力。

这种设计带来两个实际优势。第一，结构生物学应用中，RoseTTAFold 预测模型足以帮助解决多个 X-ray 分子置换和 cryo-EM 建模问题；第二，网络可以自然处理 chain break，因此能从多个蛋白序列直接输出复合物模型，避免“先预测单体、再刚体 docking、最后局部松弛”的长流程。

##### 结果与限制

RoseTTAFold 在 CASP14 目标上明显优于 Baker Lab 先前的两轨模型和 trRosetta 系列，在 CAMEO 中也超过多个公开服务器。论文同时承认其 CASP14 精度仍低于 AlphaFold 2，原因可能包括模型规模、显存限制、损失设计和推理采样强度。它的价值不只是刷新精度，而是证明高精度蛋白质结构预测可以由开放学术团队实现，并且三轨思想后来成为 RFdiffusion 等蛋白质设计模型的重要基础。

#### 🧪 练习题
```yaml
question: "RoseTTAFold 的“三轨”架构主要指什么？"
options:
  - "同时训练三个完全独立的模型并投票"
  - "在 1D 序列/MSA、2D 残基对几何和 3D 坐标表征之间反复交换信息"
  - "分别预测蛋白质、RNA 和小分子结构"
  - "只用三次 Rosetta 松弛来提升结构质量"
answer: 1
explain: "RoseTTAFold 的核心是 1D、2D、3D 三类表征在网络内部同步更新，使序列共变、距离/取向和坐标几何相互约束。"
```

### OmegaFold

```yaml
id: omegafold
num: 4
name: OmegaFold
full_name: OmegaFold (OmegaFold)
year: '2022.07'
org: HeliXon
parent: —
paper_url: https://www.biorxiv.org/content/10.1101/2022.07.21.500999v1
project_url: ''
category: protein_structure
motivation: 无需MSA的单序列快速预测
```

#### 📝 一句话总结
OmegaFold 提出了一条完全不依赖 MSA 和模板的蛋白质结构预测路线：先用蛋白质语言模型 OmegaPLM 从单条氨基酸序列中提取残基与残基对表征，再用几何感知的 GeoFormer 和结构模块直接生成三维原子坐标，解决了 orphan protein、快速进化抗体等同源序列稀缺场景下传统 MSA 方法受限的问题。

#### 🎯 核心要点
- **单序列输入**：输入只有 primary sequence，不执行 MSA 搜索和模板搜索，推理延迟主要由 GPU 前向传播决定
- **OmegaPLM 预训练表征**：用 masked protein language modeling 学到残基级表示，并从多层注意力中构造残基对表示
- **GeoFormer 主干**：50 个几何感知 Transformer block 同时更新 node representation 和 edge/pair representation，逐步消除残基对几何不一致
- **几何注意力机制**：在 edge representation 上执行 geometric attention，使 \(i,j,k\) 三元残基之间的距离/方向约束相互协调
- **结构模块**：采用 AlphaFold2 风格的结构生成模块，配置中结构模块包含 8 个循环/层级，用 residue 与 pair 表征预测 backbone 与 side-chain 原子坐标
- **置信度头**：输出 per-residue pLDDT，并把整体 confidence 写入 PDB 的 B-factor 字段；多 cycle 推理时可选择最高 confidence 结构
- **速度优势**：官方图示给出的 CAMEO 例子中，约 250/500/1000 残基蛋白推理时间约为 7.6/25.9/128.0 秒，显著省去 AlphaFold2 的 MSA 搜索成本
- **适用边界**：在同源序列丰富的常规蛋白上通常难以系统性超过完整 MSA 版 AlphaFold2，但在无同源、弱同源和快速进化蛋白上补齐了 MSA 方法的空白

#### 🔬 深入细节
##### 架构图与来源说明

![OmegaFold 官方架构示意图](https://raw.githubusercontent.com/HeliXonProtein/OmegaFold/main/figure.png)
*图：OmegaFold 官方仓库中的方法概览。上方展示 single sequence → OmegaPLM → GeoFormer → Structure Module → predicted structure 的主流程；下方展示 OmegaPLM 注意力、GeoFormer 几何平滑、CAMEO/CASP 案例和运行时间对比。*

来源说明：任务给出的 bioRxiv 论文链接在当前环境会触发 JavaScript/cookie 校验，因此正文细节主要交叉参考论文 DOI 摘要、官方 GitHub 仓库源码与官方架构图。官方源码的 `config.py` 显示 OmegaPLM hidden/node 维度为 1280、GeoFormer 为 50 个 block、结构模块配置为 8 个 cycle；`confidence.py` 显示置信度头按 pLDDT 方式计算 per-residue confidence。

##### 推理伪代码

```python
# OmegaFold 推理流程伪代码
def omegafold_predict(sequence, num_recycles=4, choose_by_confidence=True):
    """
    sequence: 单条氨基酸序列，不需要 MSA 或模板
    num_recycles: 外层循环/回收次数，官方命令行中可通过 --num_cycle 调整
    """
    # 1. OmegaPLM 从序列得到 residue 表征和 pair/edge 表征
    plm_node, plm_edge_layers = OmegaPLM(sequence)
    node = linear_node(norm(plm_node))              # [L, C_node]
    edge = linear_edge(norm(plm_edge_layers))       # [L, L, C_edge]
    edge = edge + residue_pair_embedding(sequence)  # 加入氨基酸类型与相对位置特征

    prev_node = zeros_like(node)
    prev_edge = zeros_like(edge)
    prev_coords = zeros([len(sequence), 14, 3])
    best = None

    for recycle in range(num_recycles):
        # 2. 回收上一轮的结构和 pair 表征
        node_in, edge_in = recycle_embedder(
            prev_node=prev_node,
            prev_edge=prev_edge,
            prev_coords=prev_coords,
            node=node,
            edge=edge,
        )

        # 3. GeoFormer: 50 个 block 同步更新 residue 与 pair 表征
        node_geo, edge_geo, struct_node = GeoFormer50(node_in, edge_in)

        # 4. 结构模块: AF2 风格 IPA/刚体更新，输出原子坐标
        coords, struct_state = StructureModule8(struct_node, edge_geo)

        # 5. pLDDT 置信度头
        per_res_conf = ConfidenceHead(struct_state)
        overall_conf = aggregate_lddt(per_res_conf, coords)

        if (best is None) or (choose_by_confidence and overall_conf > best.conf):
            best = Prediction(coords=coords, plddt=per_res_conf, conf=overall_conf)

        prev_node, prev_edge, prev_coords = node_geo, edge_geo, coords

    return best
```

##### 动机：为什么要摆脱 MSA

AlphaFold2、RoseTTAFold 等方法的关键输入是 MSA：通过同源序列中的协同突变信号推断哪些残基在三维空间中接触。这个设计在同源家族丰富时极强，但存在两个工程与生物学问题。第一，MSA 搜索要访问庞大序列数据库，批量预测时 CPU/I/O 成本很高；第二，orphan protein、噬菌体/宏基因组蛋白、快速进化抗体和短序列常常没有足够同源序列，协同进化信号本身就不可用或噪声很大。

OmegaFold 的假设更接近 Anfinsen dogma：多数蛋白的折叠信息最终由单条氨基酸序列决定，MSA 是有用的统计捷径，但不应是唯一途径。于是它把“进化信息”从在线 MSA 搜索转移到离线语言模型预训练中：OmegaPLM 在海量蛋白序列上学习氨基酸上下文依赖，推理时只需一次序列前向传播。

##### OmegaPLM：从序列产生 node 与 edge

给定序列 \(s=(s_1,\ldots,s_L)\)，OmegaPLM 输出残基表示 \(H\in\mathbb{R}^{L\times d}\) 和由注意力/层间交互汇聚得到的 pair 表示 \(E\in\mathbb{R}^{L\times L\times d_e}\)：

$$
H, E = \Omega\mathrm{PLM}(s)
$$

随后用线性层把 PLM 空间投影到结构预测主干使用的维度：

$$
h_i^{(0)} = W_h\,\mathrm{Norm}(H_i), \qquad
z_{ij}^{(0)} = W_z\,\mathrm{Norm}(E_{ij}) + \phi(s_i, s_j, i-j)
$$

其中 \(h_i\) 是第 \(i\) 个残基的 node representation，\(z_{ij}\) 是残基对 \(i,j\) 的 edge representation，\(\phi\) 表示氨基酸类型、相对位置等输入嵌入。

> 💡 关键：OmegaFold 不是“没有进化信息”，而是把进化/结构统计压缩进 PLM 参数中。推理时不再显式构建 MSA，但模型仍然利用预训练阶段从序列数据库学到的氨基酸共现规律。

##### GeoFormer：用几何一致性修正 pair representation

GeoFormer 是 OmegaFold 区别于“直接把 PLM embedding 接结构头”的核心。每个 GeoFormer block 对 node 和 edge 做四类更新：

1. **edge-biased residue attention**：残基 \(i\) 关注残基 \(j\) 时，把 \(z_{ij}\) 投影成 attention bias；
2. **column attention**：沿序列/伪 MSA 维度更新 residue 表示；
3. **outer product mean**：用更新后的 \(h_i,h_j\) 生成 pair 更新；
4. **geometric attention**：用三元关系 \(i\rightarrow k\rightarrow j\) 平滑 pair 表示，让边之间满足更一致的几何约束。

一个简化的 block 可以写成：

$$
h_i^{\ell+1}
= h_i^\ell
+ \mathrm{Attn}\left(h_i^\ell,\{h_j^\ell\}_{j=1}^L,\; b_{ij}=W_b z_{ij}^\ell\right)
+ \mathrm{Transition}(h_i^\ell)
$$

$$
z_{ij}^{\ell+1}
= z_{ij}^{\ell}
+ \mathrm{OPM}(h_i^{\ell+1},h_j^{\ell+1})
+ \mathrm{GeomAttn}\left(z_{ij}^{\ell}, \{z_{ik}^{\ell}, z_{kj}^{\ell}\}_{k=1}^L\right)
+ \mathrm{Transition}(z_{ij}^{\ell})
$$

直觉上，单个 pair \(z_{ij}\) 预测“残基 \(i\) 和 \(j\) 应该接近”还不够，因为蛋白结构要满足全局几何一致性：如果 \(i\) 接近 \(j\)，\(j\) 接近 \(k\)，那么 \(i,k\) 的关系不能任意变化。GeoFormer 用多层几何注意力持续修正这类不一致。

##### 结构模块与置信度

GeoFormer 输出的 final node 和 pair representation 会送入 AlphaFold2 风格结构模块。结构模块不再只预测 Cα 距离图，而是维护每个残基的局部刚体框架、通过 invariant point attention 更新残基状态，并最终生成最多 14 个原子位置：

$$
X = \mathrm{StructureModule}(h^{\mathrm{geo}}, z^{\mathrm{geo}})
$$

训练目标可理解为 AlphaFold2 系结构预测目标的单序列版本，核心包括坐标误差、距离分布和置信度监督：

$$
\mathcal{L}
= \lambda_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ \lambda_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ \lambda_{\mathrm{conf}}\mathcal{L}_{\mathrm{pLDDT}}
+ \lambda_{\mathrm{torsion}}\mathcal{L}_{\mathrm{torsion}}
$$

其中 FAPE（frame-aligned point error）在局部残基框架中比较预测原子和真实原子，避免全局旋转/平移影响；distogram 约束 pair representation 具有明确的残基距离含义；pLDDT head 学习预测每个残基的局部可靠性。

##### 与 AlphaFold2/RoseTTAFold 的区别

| 维度 | AlphaFold2 / RoseTTAFold | OmegaFold |
|------|---------------------------|-----------|
| 主要输入 | MSA、模板、序列 | 单条序列 |
| 主要信息来源 | 在线同源搜索与协同进化 | 离线 PLM 预训练 + 单序列上下文 |
| 主干结构 | Evoformer / 三轨网络 | OmegaPLM + GeoFormer |
| 推理瓶颈 | MSA 搜索、模板搜索、模型前向 | 模型前向与长序列显存 |
| 低同源蛋白 | 容易因 MSA 浅而退化 | 设计目标就是无 MSA 场景 |
| 高同源常规蛋白 | 通常最强 | 可接近但不稳定超过完整 MSA 方法 |

OmegaFold 的实用价值不只是“更快”，而是把结构预测变成了一个更易批量化的单模型推理任务。对于需要对大量突变体、宏基因组序列或抗体候选做快速初筛的场景，省去 MSA 搜索可以显著降低系统复杂度；随后仍可用 AlphaFold2/AlphaFold3 等更重模型对少量候选做复核。

#### 🧪 练习题
```yaml
question: "OmegaFold 中 GeoFormer 的核心作用是什么？"
options:
  - "在线搜索同源序列并构建 MSA"
  - "把 PLM 产生的残基和残基对表征迭代修正为几何一致的结构表征"
  - "用物理力场对最终 PDB 做能量最小化"
  - "只预测二级结构而不生成三维坐标"
answer: 1
explain: "OmegaFold 的输入不包含 MSA。GeoFormer 接收 OmegaPLM 的 node/pair 表征，通过 edge-biased attention、outer product 和 geometric attention 反复更新几何关系，再交给结构模块生成三维坐标。"
```

### ESMFold

```yaml
id: esmfold
num: 5
name: ESMFold
full_name: ESMFold (ESMFold)
year: '2023.03'
org: Meta AI
parent: —
paper_url: https://www.science.org/doi/10.1126/science.ade2574
project_url: ''
category: protein_structure
motivation: 蛋白质语言模型端到端单序列预测
```

#### 📝 一句话总结
ESMFold 将预训练蛋白质语言模型 ESM-2 与 AlphaFold2 风格 folding trunk、structure module 连接成端到端结构预测器，直接从单条蛋白序列预测原子级三维结构，解决了 MSA 搜索慢、低同源序列难以预测和宏基因组规模结构注释不可扩展的问题。

#### 🎯 核心要点
- **ESM-2 表征作为进化先验**：ESM-2 用 masked language modeling 在大规模蛋白序列上预训练，使结构、接触和功能信息在序列表征中涌现
- **发布版 ESMFold 使用 3B ESM-2**：官方 `esmfold_v0/v1` 使用 3B 参数 ESM-2 和 48 个 folding trunk block；ESM-2 系列本身最大扩展到 15B 参数
- **无需 MSA/模板**：推理只需要单条序列，省去同源搜索和模板搜索，支持浏览器、API 和批量 FASTA 推理
- **Folding trunk**：48 个 triangular self-attention block 同时维护 sequence representation \(s_i\) 与 pair representation \(z_{ij}\)，通过 Pair2Seq、Seq2Pair 和 triangle updates 交换信息
- **Structure module**：8 个 AlphaFold2 风格 IPA block 把 trunk 表征解码为 backbone 与 side-chain 原子坐标
- **Recycling 与置信度**：最多 4 次 recycle；输出 pLDDT、pTM、distogram 等头，PDB 的 B-factor 可直接保存 pLDDT
- **ESM Metagenomic Atlas**：Meta 用 ESMFold 批量预测 6 亿级宏基因组蛋白结构，展示了单序列模型在结构组学规模上的吞吐优势
- **性能定位**：通常比完整 MSA 版 AlphaFold2 更快、对突变更敏感；在同源丰富目标上可能低于 AF2，但在单序列/低同源场景比“去掉 MSA 的 AF2”更有针对性

#### 🔬 深入细节
##### 架构图与来源说明

![ESMFold 架构示意图](https://arxiv.org/html/2602.06020v2/Figures/esmfold_architecture.png)
*图：ESMFold 架构示意。ESM-2 编码单条氨基酸序列，folding trunk 迭代更新 sequence/pair 表征，structure module 将其转换为三维坐标。该图来自可访问的 arXiv HTML 版本，标注为改编自 Lin et al., 2023。*

来源说明：任务给出的 Science DOI 页面在当前环境会触发 Cloudflare 校验；本文交叉参考 Meta 官方博客、`facebookresearch/esm` 官方仓库 README 与源码、以及可访问的 arXiv 架构说明。官方源码显示 `esmfold_v0` 是论文实验版本，使用 3B ESM-2 与 48 个 folding blocks；`trunk.py` 显示 sequence state 维度 1024、pairwise state 维度 128、structure module 8 blocks、max recycles 为 4。

##### 推理伪代码

```python
# ESMFold 推理流程伪代码
def esmfold_predict(sequence, num_recycles=4, chunk_size=None):
    """
    sequence: 单条蛋白质序列；多链可用 ':' 分隔
    chunk_size: 可选 axial attention chunk，用更慢速度换取更低显存
    """
    # 1. ESM-2 编码序列；语言模型参数冻结
    tokens = tokenize(sequence)
    esm_layers, esm_attentions = ESM2_3B(tokens)

    # 2. 学习加权汇聚不同 ESM 层，并投影成 trunk 的 sequence/pair 表征
    s = layer_weighted_sum(esm_layers)      # [L, C_s]
    z = init_pair_representation(
        esm_attentions=esm_attentions,
        relative_position=sequence_indices(sequence),
    )                                      # [L, L, C_z]

    recycle_s = zeros_like(s)
    recycle_z = zeros_like(z)
    recycle_dist = zeros([len(sequence), len(sequence)])

    for r in range(num_recycles):
        # 3. 回收上一轮输出的 sequence、pair 与 distogram 信息
        s_in = s + norm(recycle_s)
        z_in = z + norm(recycle_z) + distogram_embedding(recycle_dist)

        # 4. 48 个 folding trunk blocks
        for block in range(48):
            pair_bias = Pair2Seq(z_in)              # pair -> attention bias
            s_in = SequenceSelfAttention(s_in, pair_bias)
            z_in = z_in + Seq2Pair(s_in)            # sequence -> pair
            z_in = TriangleMultiplication(z_in)
            z_in = TriangleAttention(z_in, chunk_size=chunk_size)

        # 5. 8 个 IPA structure module blocks 输出坐标
        coords, states = StructureModule8(s_in, z_in)

        recycle_s, recycle_z = s_in, z_in
        recycle_dist = pseudo_beta_distogram(coords)

    # 6. 置信度与辅助头
    plddt = LDDTHead(states)
    ptm = PTMHead(z_in)
    distogram = DistogramHead(z_in)
    return coords, plddt, ptm, distogram
```

##### 从 masked language modeling 到结构先验

ESM-2 的预训练目标是 BERT 风格的 masked language modeling：随机遮蔽部分氨基酸，让模型根据上下文恢复原 token。

$$
\mathcal{L}_{\mathrm{MLM}}
= - \sum_{i \in \mathcal{M}} \log p_\theta(s_i \mid s_{\setminus \mathcal{M}})
$$

这个目标本身没有显式三维坐标，但蛋白序列中存在强烈的结构约束：远距离残基若在空间中接触，其氨基酸类型会共同受到折叠稳定性、疏水核心、电荷互补和功能位点约束。大规模 MLM 迫使 ESM-2 学到这些统计规律，因此 ESM-2 的内部 attention 和 hidden states 可以携带接触、二级结构甚至折叠类别信息。

ESMFold 的关键选择是：不再把 PLM 只当作额外 embedding，而是直接把它作为结构预测器的主输入。官方实现中，ESM 层输出经过可学习权重组合：

$$
s_i^{(0)} = W_s\left(\sum_{\ell=0}^{L_{\mathrm{ESM}}} \alpha_\ell h_{i}^{(\ell)}\right)
$$

pair representation 则由相对位置、ESM attention maps 或 learned positional embedding 初始化：

$$
z_{ij}^{(0)} = W_z a_{ij} + \phi(i-j)
$$

其中 \(s_i\) 是每个残基的 sequence representation，\(z_{ij}\) 是残基对表示。

##### Folding trunk：把序列信息写入距离图

ESMFold 的 folding trunk 是 AlphaFold2 Evoformer 的单序列化版本。它没有 MSA 维度，因此每个 block 的核心任务变成：在 sequence representation 和 pair representation 之间来回传递信息。

sequence update 使用 pair bias 调制自注意力：

$$
\mathrm{Attn}_{ij}^{h}
= \mathrm{softmax}_j\left(
\frac{q_i^h \cdot k_j^h}{\sqrt{d}}
+ b^h(z_{ij})
\right)
$$

这里 \(b^h(z_{ij})\) 来自 pair representation。直觉上，如果 \(z_{ij}\) 已经认为两个残基可能接触，sequence attention 就会更容易让这两个位置交换信息。

pair update 则把 sequence 信息写回残基对空间：

$$
z_{ij} \leftarrow z_{ij}
+ W_o\left[
W_a s_i \odot W_b s_j,\;
W_c s_i - W_d s_j
\right]
+ \mathrm{TriangleUpdate}(z) 
$$

其中 \(\odot\) 是逐元素乘法。随后 triangular multiplicative update 和 triangular attention 会通过第三个残基 \(k\) 调整 \(i,j\) 的关系，这类似在隐空间中维护距离图的三角一致性。

> 💡 关键：ESMFold 的结构决策主要发生在 folding trunk，而不是最后的坐标头。后续可解释性研究也发现，早期 trunk block 更像在把残基身份、电荷等生化信息写入 pair space，晚期 block 更像在形成距离和接触几何。

##### Structure module 与训练目标

Folding trunk 输出的 \(s,z\) 被送入 AlphaFold2 风格的 structure module。IPA（Invariant Point Attention）在每个残基的局部框架中进行几何注意力，逐步更新刚体姿态和原子位置。最终模型输出每个残基最多 14 个原子坐标，并通过 OpenFold/AlphaFold 系的 heads 给出 pLDDT、pTM 和 distogram。

训练损失可以概括为：

$$
\mathcal{L}
= \lambda_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ \lambda_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ \lambda_{\mathrm{pLDDT}}\mathcal{L}_{\mathrm{pLDDT}}
+ \lambda_{\mathrm{LM}}\mathcal{L}_{\mathrm{LM}}
$$

其中：

- \(\mathcal{L}_{\mathrm{FAPE}}\)：在局部 frame 下比较预测原子与真实原子位置，训练结构模块的坐标几何；
- \(\mathcal{L}_{\mathrm{distogram}}\)：监督 \(z_{ij}\) 对残基距离分桶的预测；
- \(\mathcal{L}_{\mathrm{pLDDT}}\)：让置信度头预测局部结构质量；
- \(\mathcal{L}_{\mathrm{LM}}\)：保留语言模型式 token 预测约束，使序列表征不丢失氨基酸语义。

##### 为什么 ESMFold 能做宏基因组规模预测

完整 AlphaFold2 管线的慢点不只是神经网络本身，还包括 MSA 和模板搜索。对于上亿条宏基因组序列，逐条搜索同源数据库会成为系统瓶颈。ESMFold 的输入是单序列，因此可以把大量序列直接按长度 batch 到 GPU 上推理；官方 CLI 还支持 `--max-tokens-per-batch` 和 `--chunk-size`，在吞吐和显存之间做工程折中。

Meta 官方博客称这种语言模型折叠方法相对当时主流结构预测方法最高可达 60x 速度提升，并用于生成 6 亿级 ESM Metagenomic Atlas。这个结果的意义在于：很多宏基因组蛋白缺少人工注释和同源结构，ESMFold 提供了一个可以先“看见结构空间”的高通量入口。

##### 与 OmegaFold 和 AlphaFold2 的关系

ESMFold 与 OmegaFold 同属单序列 PLM-based folding，但 ESMFold 更直接沿用 AlphaFold/OpenFold 的 folding trunk 与 structure module 设计；OmegaFold 则强调自研 OmegaPLM 与 GeoFormer 的几何平滑。与 AlphaFold2 相比，ESMFold 牺牲了显式 MSA 协同进化信号，换取了速度、部署简洁性和对低同源序列的可用性。

| 维度 | AlphaFold2 | ESMFold |
|------|------------|---------|
| 输入 | MSA + templates + sequence | single sequence |
| 进化信息 | 在线同源序列协同突变 | ESM-2 预训练参数 |
| 主干 | Evoformer | 48-block folding trunk |
| 坐标模块 | IPA structure module | IPA structure module |
| 典型优势 | 高同源目标精度最高 | 快速、可批量、低同源友好 |
| 典型短板 | MSA 搜索重 | 对复杂多链/配体不是原生目标 |

#### 🧪 练习题
```yaml
question: "ESMFold 相比完整 AlphaFold2 管线最核心的输入差异是什么？"
options:
  - "ESMFold 使用 RNA 序列而不是蛋白序列"
  - "ESMFold 不依赖 MSA/模板搜索，而是用 ESM-2 的单序列表征驱动 folding trunk"
  - "ESMFold 只输出二级结构，不输出三维坐标"
  - "ESMFold 使用物理分子动力学模拟替代神经网络"
answer: 1
explain: "ESMFold 的核心是用预训练 ESM-2 从单条序列产生结构相关表征，再通过 folding trunk 和 structure module 输出原子坐标，因此省去了 AlphaFold2 中昂贵的 MSA/模板搜索。"
```

### AlphaFold 3

```yaml
id: alphafold3
num: 6
name: AlphaFold 3
full_name: AlphaFold 3 (AlphaFold 3)
year: '2024.05'
org: Google DeepMind
parent: alphafold2
paper_url: https://www.nature.com/articles/s41586-024-07487-w
project_url: ''
category: protein_structure
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

### OpenFold

```yaml
id: openfold
num: 7
name: OpenFold
full_name: OpenFold (OpenFold)
year: '2024.05'
org: Columbia University
parent: alphafold2
paper_url: https://www.nature.com/articles/s41592-024-02272-z
project_url: ''
category: protein_structure
motivation: AlphaFold2的PyTorch开源复现
```

#### 📝 一句话总结
OpenFold 在 PyTorch 中完整复现并开放可训练的 AlphaFold2，实现了从数据准备、训练、推理到参数转换的端到端开源流程，解决了原始 AlphaFold2 只能可靠推理、难以重新训练和改造的问题。它在从头训练后匹配 AlphaFold2 精度，同时用低显存注意力、FlashAttention、DeepSpeed Evoformer Attention 等工程优化显著降低长序列和训练成本。

#### 🎯 核心要点
- **可训练复现**：忠实复现 AlphaFold2 monomer 与 AlphaFold-Multimer 推理代码的核心数学计算，并提供完整 PyTorch 训练路径
- **从头训练达到精度对齐**：OpenFold 论文报告从头训练模型可匹配 AlphaFold2，在 CAMEO、CASP 等验证集上达到相近结构预测准确度
- **开放训练资源**：使用 OpenProteinSet 和公开 PDB/模板/多序列比对流程，模型参数、训练数据索引与代码均可由社区复现和扩展
- **继承 AlphaFold2 架构**：核心仍是 MSA representation、pair representation、Evoformer、Structure Module、recycling 与多任务辅助损失
- **显存与速度优化**：实现低显存注意力、chunking、自定义 CUDA attention kernel、FlashAttention、DeepSpeed DS4Sci_EvoformerAttention
- **长序列能力**：官方文档报告可在单张 A100 上预测超过 4000 个残基的序列，长链推理比参考实现更稳健
- **研究价值**：通过可重复训练观察模型学习过程，论文发现 OpenFold 对训练集大小和二级结构类别删减具有较强泛化鲁棒性
- **工程互操作性**：支持 AlphaFold 官方 JAX 参数与 OpenFold PyTorch 参数双向转换，便于复现实验、消融和后续模型开发

#### 🔬 深入细节
##### 图示与来源

![OpenFold 与 AlphaFold2 精度对齐结果](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs41592-024-02272-z/MediaObjects/41592_2024_2272_Fig1_HTML.png)
*图：Nature Methods 论文 Figure 1 展示 OpenFold 与 AlphaFold2 的预测精度对齐。OpenFold 没有提出新的主干网络架构图，方法架构继承 AlphaFold2；可访问来源包括论文页 https://www.nature.com/articles/s41592-024-02272-z、官方文档 https://openfold.readthedocs.io/ 和代码仓库 https://github.com/aqlaboratory/openfold。*

##### 算法伪代码

```python
# OpenFold 训练/推理核心流程，省略特征细节和 Amber relaxation
def openfold_forward(sequence, msa_db, template_db, params, recycle_steps=3):
    # 1. 构造 AlphaFold2 风格输入特征
    msa = search_msa(sequence, msa_db)                 # UniRef90 / MGnify / BFD / UniClust 等
    templates = search_templates(sequence, template_db)
    feats = featurize(sequence, msa, templates)

    # 2. 初始化 MSA 表征、pair 表征与结构状态
    m = embed_msa(feats.msa, feats.extra_msa)
    z = embed_pair(feats.residue_index, feats.template_features)
    prev = init_recycle_state()

    # 3. Recycling: 多次把上一轮结构和 pair 信息反馈给 Evoformer
    for r in range(recycle_steps):
        m, z = add_recycle_features(m, z, prev)

        # Evoformer: MSA attention、outer product mean、triangle update/attention
        for block in evoformer_blocks:
            m = msa_row_col_attention(m, z)
            z = z + outer_product_mean(m)
            z = triangle_multiplication_and_attention(z)
            m, z = transition(m), pair_transition(z)

        # Structure Module: 从 pair/single 表征生成残基刚体框架和原子坐标
        single = extract_single_representation(m)
        coords, frames, sidechains = structure_module(single, z)
        prev = make_recycle_state(coords, z)

    # 4. 训练时计算多任务损失；推理时输出坐标和置信度
    outputs = confidence_heads(single, z, coords)
    return coords, outputs
```

##### 动机与背景

AlphaFold2 的原始开源版本极大推动了蛋白质结构预测，但它主要开放的是推理代码和预训练参数。对研究者而言，真正困难的是重新训练、消融、迁移到新任务和验证模型到底学到了什么。比如要扩展到蛋白质-配体复合物、替换 MSA 特征、改造注意力模块、加入新的损失函数，只有推理代码远远不够。

OpenFold 的定位不是重新发明一个结构预测架构，而是把 AlphaFold2 变成一个可训练、可扩展、可调试的开源系统。它保持 AlphaFold2 内部数学计算的一致性，同时把实现迁移到 PyTorch 生态，并补齐大规模训练所需的数据处理、分布式训练、混合精度、内存优化和权重转换工具。

##### 核心机制 1：AlphaFold2 主干的可训练复现

OpenFold 继承 AlphaFold2 的核心表示学习范式：从序列、MSA、模板中构造输入，维护两类关键表示：

$$
M \in \mathbb{R}^{N_{\text{msa}} \times L \times c_m}, \quad
Z \in \mathbb{R}^{L \times L \times c_z}
$$

其中 \(M\) 是 MSA 表示，捕获同源序列中的共进化信息；\(Z\) 是残基对表示，捕获任意两个残基之间的几何关系。Evoformer 在两者之间反复交换信息：

$$
Z \leftarrow Z + \operatorname{OuterProductMean}(M)
$$

随后通过 triangle multiplication 和 triangle attention 让残基对关系满足空间几何的一致性。直觉上，如果 \(i\) 接近 \(j\)，\(j\) 接近 \(k\)，那么 \(i\) 与 \(k\) 的相对关系不能独立决定，三角更新正是把这种几何约束写入 pair representation。

Structure Module 则把最终的 single/pair 表示转换为残基刚体框架、主链坐标和侧链构象。训练目标沿用 AlphaFold2 的多任务设计，可抽象为：

$$
\mathcal{L}
= \lambda_{\text{FAPE}}\mathcal{L}_{\text{FAPE}}
+ \lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
+ \lambda_{\text{msa}}\mathcal{L}_{\text{masked-MSA}}
+ \lambda_{\text{plddt}}\mathcal{L}_{\text{pLDDT}}
+ \lambda_{\text{viol}}\mathcal{L}_{\text{violation}}
$$

其中 FAPE 约束局部坐标框架下的原子位置，distogram 监督残基对距离分布，masked-MSA 提供序列语言式辅助学习，pLDDT 让模型学会预测自身置信度，violation loss 惩罚键长、键角、原子冲突等结构不合理项。

> 💡 关键：OpenFold 的算法贡献主要是“忠实、可训练、可扩展”，而不是改变 AlphaFold2 的科学假设。它让 AlphaFold2 从一个强大的推理程序变成可以被社区重新训练和系统研究的模型平台。

##### 核心机制 2：大规模训练数据与重训流程

OpenFold 与 OpenProteinSet 结合，补上了 AlphaFold2 复现中最昂贵的数据环节。MSA 搜索通常需要对 UniRef90、MGnify、BFD、UniClust、PDB70 等大库运行 HHblits、JackHMMER、HHSearch 等工具，成本远高于单次模型前向。OpenProteinSet 提供大规模预计算 MSA、模板命中和相关结构数据，使研究者能够绕过重复的海量序列搜索。

训练流程可理解为三层：

1. **数据层**：PDB/mmCIF 结构、模板命中、MSA、release date cutoff、链聚类和训练/验证拆分
2. **特征层**：AlphaFold2 风格的 target features、MSA features、template features、residue index、mask
3. **模型层**：Evoformer 与 Structure Module 的端到端优化，训练中使用 recycling 和辅助监督

这种重训能力使论文能够做更深入的问题分析：当训练集故意删掉某些 fold 或二级结构类型时，模型是否只是记忆模板，还是学到了更可迁移的折叠规律。OpenFold 的结果显示，即使训练集规模和多样性被刻意限制，模型仍有相当强的泛化能力。

##### 核心机制 3：内存优化与长序列推理

AlphaFold2 的注意力模块在长序列上显存压力很大，pair representation 的规模为 \(O(L^2)\)，三角注意力和 MSA 注意力还会进一步放大峰值显存。OpenFold 将标准注意力：

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}} + B\right)V
$$

改造成支持 chunking、低显存注意力和高效 CUDA kernel 的实现。低显存注意力的思想不是改变数学结果，而是把 \(QK^\top\) 和 softmax 的计算拆成块，避免一次性 materialize 巨大的注意力矩阵：

```python
def low_memory_attention(Q, K, V, bias, q_chunk=1024, k_chunk=4096):
    outputs = []
    for q in chunks(Q, q_chunk):
        # 对每个 query chunk 分块扫过 key/value，在线维护 softmax 归一化
        out_q = streaming_softmax_attention(q, K, V, bias, k_chunk)
        outputs.append(out_q)
    return concat(outputs)
```

官方文档还记录了 FlashAttention 对 MSA attention 的加速，以及 DeepSpeed DS4Sci_EvoformerAttention 对 Evoformer attention 的优化。后者作为 OpenFold 与 DeepSpeed4Science 合作的一部分，目标是在不改变模型数学含义的前提下降低训练和推理峰值显存，并提升长序列吞吐。

##### 核心机制 4：与 AlphaFold2 的差异

OpenFold 与 AlphaFold2 的关系更接近“可训练工程复现”而非新算法替代：

| 维度 | AlphaFold2 开源实现 | OpenFold |
|---|---|---|
| 主框架 | JAX | PyTorch |
| 训练代码 | 不完整，社区难以复现训练 | 公开可训练路径 |
| 数据资源 | 原始训练数据和 MSA 流程难以完整复现 | 结合 OpenProteinSet 和公开训练资源 |
| 模型数学 | 原始 AF2 | 尽量保持 AF2 数学一致 |
| 长序列推理 | 显存瓶颈明显 | 低显存注意力、chunking、CPU offload |
| 可研究性 | 更适合直接推理 | 更适合消融、重训和新任务改造 |

##### 训练与推理的关键计算直觉

OpenFold 的训练信号之所以不只用最终坐标误差，是因为蛋白质结构预测存在刚体对齐、局部几何、侧链原子、置信度校准等多个层次。FAPE 在局部坐标系里比较预测点和真实点，避免全局旋转平移影响：

$$
\mathcal{L}_{\text{FAPE}}
= \frac{1}{N}\sum_{i,j}
\min\left(
\left\|T_i^{-1}x_j - \hat{T}_i^{-1}\hat{x}_j\right\|,
d_{\text{clamp}}
\right)
$$

其中 \(T_i\) 和 \(\hat{T}_i\) 是真实与预测的第 \(i\) 个残基局部框架。这个损失鼓励模型学到局部几何一致性，而不是只在全局 RMSD 上拟合。

推理时，recycling 是另一个关键机制。上一轮预测的结构会被编码回 pair features，下一轮 Evoformer 可以基于“当前猜测的结构”继续修正。形式上可以写作：

$$
(M^{r+1}, Z^{r+1}, X^{r+1})
= f_\theta(M^r, Z^r, \operatorname{Embed}(X^r))
$$

这让模型像迭代优化器一样工作：先给出粗略折叠，再逐步调整长程接触、二级结构和局部构象。

##### 来源限制与可复现性说明

本条目的论文链接指向 Nature Methods 正式论文页面；该页面可访问摘要、图示、数据可用性和代码可用性说明。方法细节主要结合正式论文、OpenFold 官方文档与 GitHub 仓库整理。由于 OpenFold 不改变 AlphaFold2 的核心网络，本文中的架构与损失函数解释基于 AlphaFold2/OpenFold 共同实现的机制，而 OpenFold 特有贡献集中在可训练复现、数据公开、效率优化和重训实验。

#### 🧪 练习题
```yaml
question: "OpenFold 相比 AlphaFold2 原始开源实现最核心的贡献是什么？"
options:
  - "把 Evoformer 替换成扩散模型，从而支持小分子生成"
  - "完整提供可训练的 PyTorch 复现和训练/数据/推理工程，使社区可以重训和改造 AlphaFold2"
  - "只保留单序列语言模型输入，完全取消 MSA"
  - "用 Rosetta 能量函数替代 FAPE 损失"
answer: 1
explain: "OpenFold 的重点是忠实复现 AlphaFold2 并使其可训练、可扩展、显存更友好；它没有用扩散模型替换 Evoformer，也没有取消 MSA 或改用 Rosetta 能量函数。"
```

### Chai-1

```yaml
id: chai1
num: 8
name: Chai-1
full_name: Chai-1 (Chai-1)
year: '2024.09'
org: Chai Discovery
parent: alphafold3
paper_url: https://www.chaidiscovery.com/blog/introducing-chai-1
project_url: ''
category: protein_structure
motivation: 支持实验约束的多模态基础模型
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

### Boltz-1

```yaml
id: boltz1
num: 9
name: Boltz-1
full_name: Boltz-1 (Boltz-1)
year: '2024.11'
org: MIT Jameel Clinic
parent: alphafold3
paper_url: https://boltz.bio/introducing-boltz-1/
project_url: ''
category: protein_structure
motivation: 首个完全开源商用的AF3级模型
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

### TDFold

```yaml
id: tdfold
num: 10
name: TDFold
full_name: TDFold (TDFold)
year: '2026.01'
org: Wang et al.
parent: —
paper_url: https://www.nature.com/articles/s42256-026-00001-x
project_url: ''
category: protein_structure
motivation: 二维几何模板扩散加速单序列预测
```

#### 📝 一句话总结
TDFold 提出用视觉扩散模型生成蛋白质残基对二维几何模板，再由序列-几何协同学习模块恢复三维结构，解决单序列预测中缺少 MSA/同源模板导致的几何约束不足问题。

#### 🎯 核心要点
- **两阶段结构预测**：先用 2D geometric template diffusion 生成残基对距离与取向矩阵，再用 SCL 模块融合序列、二维几何和原子特征预测三维结构
- **视觉扩散迁移到蛋白几何**：以 Stable Diffusion 风格的 text encoder + UNet 为骨干，用 LoRA 将序列提示映射到蛋白的二维几何图像空间
- **四类残基对几何模板**：生成 \(d_{C_\beta}\)、\(\omega\)、\(\theta\)、\(\phi\) 等距离/取向矩阵，作为近似三维折叠的全局约束
- **SCL 协同学习模块**：由 residue-level Transformer/CNN/graph Transformer、atom-level GNN、residue-atom fusion 和 SE(3)-EGNN 坐标头组成
- **低资源单序列场景**：目标是减少对 MSA 和同源模板搜索的依赖，在 Orphan、Orphan25、CASP14/15/16 等同源信息不足数据集上提升预测效率
- **轻量参数规模**：补充材料报告 TDFold 约 8M 可训练参数，显著小于 AlphaFold2、AlphaFold3、RoseTTAFold 和 ESMFold
- **来源校正**：任务给定 Nature URL 编号不可访问；可访问正式论文为 `https://www.nature.com/articles/s42256-026-01210-2`，题名和元信息与 TDFold 一致

#### 🔬 深入细节
##### 模型架构总览

![TDFold 架构与二维几何模板扩散流程](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs42256-026-01210-2/MediaObjects/42256_2026_1210_Fig2_HTML.png)
*图：TDFold 的两阶段流程。序列首先驱动二维几何模板扩散模块生成残基对几何图，再由序列-几何协同学习模块预测蛋白三维结构。*

正式论文页面显示 TDFold 发表在 Nature Machine Intelligence，2026 年 4 月 1 日在线，DOI 为 `10.1038/s42256-026-01210-2`。Nature 预览页可访问 Abstract、图 1-5、数据/代码可用性说明；完整方法细节可通过同页补充材料和 bioRxiv 预印本交叉确认。

##### 算法伪代码

```python
# TDFold 单序列结构预测伪代码
def tdfold_predict(sequence):
    # 1. 将氨基酸序列作为条件提示，送入扩散模块的 text encoder
    seq_tokens = tokenize_amino_acids(sequence)
    cond = text_encoder_with_lora(seq_tokens)

    # 2. 在二维几何图像空间中反向扩散
    x_t = gaussian_noise(shape=(4, L, L))  # dCb, omega, theta, phi
    for t in diffusion_schedule(reverse=True):
        eps_hat = unet_with_lora(x_t, t, cond)
        x_t = ode_or_ddim_step(x_t, eps_hat, t)
    geometry_2d = decode_geometry(x_t)

    # 3. 序列-几何协同学习
    residue_feat = residue_branch(sequence, geometry_2d)  # Transformer + CNN + graph Transformer
    atom_feat = atom_branch(sequence, geometry_2d)         # atom-level GNN
    fused = residue_atom_fusion(residue_feat, atom_feat)

    # 4. SE(3)-等变图网络输出三维坐标，并做全原子精修
    coords = se3_egnn_coordinate_head(fused)
    coords = langevin_refinement(coords, sequence)
    return coords
```

##### 动机与背景

单序列蛋白结构预测的困难在于：输入只有一条氨基酸序列，缺少 AlphaFold2/RoseTTAFold 依赖的 MSA 共进化信号，也缺少可直接借用的同源模板。ESMFold、OmegaFold 等蛋白语言模型能够绕开 MSA，但语言模型嵌入并不显式提供完整残基对几何约束，尤其在 orphan proteins 或低同源目标上容易缺少全局折叠线索。

TDFold 的关键判断是：蛋白折叠可以先转化成“生成一组二维几何图”的问题。距离矩阵和取向矩阵与图像一样是规则二维张量，视觉扩散模型擅长从噪声中生成具备全局一致性的二维模式，因此可以把 Stable Diffusion 风格的先验迁移到残基对几何生成。与直接预测坐标相比，先生成 \(L \times L\) 几何模板能把长程相互作用显式暴露给后续结构模块。

##### 二维几何模板扩散

扩散模块生成的目标可写为：

$$
G = \{D_{C_\beta}, \Omega, \Theta, \Phi\} \in \mathbb{R}^{4 \times L \times L}
$$

其中 \(D_{C_\beta}\) 表示残基间距离，\(\Omega\)、\(\Theta\)、\(\Phi\) 表示主链相关的二面角/取向信息。训练时对真实几何图加噪：

$$
q(x_t \mid x_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}x_0,\,(1-\bar{\alpha}_t)I)
$$

UNet 学习在序列条件 \(c\) 下预测噪声：

$$
\mathcal{L}_{\text{diff}}=\mathbb{E}_{x_0,t,\epsilon}\left[\left\|\epsilon-\epsilon_\theta(x_t,t,c)\right\|_2^2\right]
$$

TDFold 没有从头训练大规模图像扩散模型，而是在 text encoder 和 UNet attention 层中引入 LoRA 适配器。补充材料说明 text encoder 有 12 个 Transformer blocks，UNet 采用 4 个 downsampling blocks、1 个 bottleneck 和 4 个 upsampling blocks；LoRA rank 为 8，并用四个 UNet LoRA adapter 分别处理 \(d_{C_\beta}\)、\(\omega\)、\(\theta\)、\(\phi\)。

> 💡 关键：这里的“模板”不是传统意义上的同源结构模板，而是扩散模型生成的二维几何先验。它把单序列输入转换为可供结构网络消费的全局残基对约束。

##### 序列-几何协同学习

第二阶段 SCL 模块把生成的几何图与序列共同编码。补充材料把 SCL 拆成四部分：

- residue-level learning：6 层 Transformer、3 个 CNN blocks 和 3 层 graph Transformer，捕获序列上下文与残基图关系
- atom-level learning：3 层 GNN，建模细粒度原子相互作用
- residue-atom fusion：关系矩阵计算、Bernoulli mask 与 2 层 MLP 融合残基/原子特征
- coordinate prediction：2 层 SE(3)-EGNN 输出骨架坐标，再用 Langevin dynamics 做全原子结构精修

可以把最终坐标头理解为在几何模板引导下求解三维嵌入：

$$
\hat{X}=\arg\min_X \sum_{i,j}\rho\left(\lVert X_i-X_j\rVert_2-\hat{D}_{ij}\right)+\lambda\,\mathcal{L}_{\text{local}}(X, S)
$$

这里 \(\hat{D}_{ij}\) 来自扩散生成的残基对距离，\(\mathcal{L}_{\text{local}}\) 约束局部键长、角度和原子级一致性。真实实现不是显式能量最小化，而是用图网络隐式学习这个映射。

##### 推理效率与传统方法区别

TDFold 与 AlphaFold2/3 的核心区别是输入信号来源。AlphaFold 系列通过 MSA、模板和大规模 pair representation 从数据中抽取共进化关系；TDFold 则把序列作为条件，直接生成残基对几何模板，从而减少外部检索成本。补充材料中 TDFold 无 MSA 推理在多个基准上约 10-12 秒，而带 MSA 约 101-336 秒，说明主要加速来自绕开昂贵的序列检索。

与 ESMFold/OmegaFold 相比，TDFold 不只依赖蛋白语言模型隐表示，而是显式生成距离与取向矩阵。论文报告在 Orphan、Orphan25、CASP14/15/16 等数据集上相对 ESMFold/OmegaFold 有提升，但 CASP14 中 OmegaFold 与 TDFold 的差距并不稳定；因此更准确的解读是：TDFold 的优势主要集中在同源信息不足且需要快速预测的单序列场景，而不是全面替代所有 MSA 或大模型方法。

#### 🧪 练习题
```yaml
question: "TDFold 中二维几何模板扩散模块的主要作用是什么？"
options:
  - "直接从序列输出最终全原子坐标，跳过三维结构网络"
  - "从噪声中生成残基对距离和取向矩阵，为后续结构预测提供全局几何约束"
  - "搜索 PDB 中最相似的同源模板并复制其坐标"
  - "用 MSA 计算共进化矩阵并替换蛋白语言模型"
answer: 1
explain: "TDFold 的扩散模块生成 \(d_{Cβ}, \\omega, \\theta, \\phi\) 等二维残基对几何模板；最终三维坐标由后续 SCL 与 SE(3)-EGNN 模块预测。"
```

### Protenix-v1

```yaml
id: protenix
num: 11
name: Protenix-v1
full_name: Protenix-v1 (Protenix-v1)
year: '2026.02'
org: ByteDance
parent: alphafold3
paper_url: https://www.biorxiv.org/content/10.1101/2026.02.09.637214v1
project_url: ''
category: protein_structure
motivation: 开源复现精度全面超越AF3
```

#### 📝 一句话总结
Protenix-v1 是 ByteDance Seed 发布的全开源 biomolecular structure prediction 模型，以 AlphaFold3 风格的 Pairformer + diffusion 架构为基础，在匹配训练 cutoff、模型规模和推理预算的设置下达到或超过 AF3 级表现，并补齐模板、RNA MSA、训练代码与评测工具链。

#### 🎯 核心要点
- **AlphaFold3 级开源复现**：目标是复现 AF3 的全原子复合物预测能力，支持蛋白、DNA、RNA、小分子配体和多分子相互作用
- **v1 基座模型**：官方 README 将 `protenix_base_default_v1.0.0` 标为 v1 基座，368M 参数，训练数据 cutoff 为 2021-09-30，与 AF3 对齐
- **核心结构模块**：沿用 AF3 范式，由输入特征/MSA/template 表征、Pairformer 表征学习、扩散式全原子坐标生成和 confidence head 组成
- **v1 新能力**：相对早期 Protenix 版本加入 protein template integration、RNA MSA support，并改善训练动态与 inference-time performance
- **推理时扩展**：增加 diffusion seeds/samples 能在抗体-抗原等困难任务上带来近似 log-linear 质量提升，形成计算预算与准确率之间的可控旋钮
- **评测协议改进**：引入 common-intersection、bootstrapping、PXMeter/year-stratified benchmarks，避免不同模型失败样本不一致造成的排行榜偏差
- **来源校正**：任务给定 bioRxiv URL 不可访问；官方 GitHub 和论文引用指向 `https://www.biorxiv.org/content/10.64898/2026.02.05.703733v1`

#### 🔬 深入细节
##### 官方图示与来源

![Protenix-v1 FoldBench 与 inference-time scaling 结果](https://raw.githubusercontent.com/bytedance/Protenix/main/assets/protenix_base_default_v1.0.0_metrics.png)
*图：Protenix-v1 官方 README 中的 FoldBench-Corrected 与 inference-time scaling 结果。技术报告没有单独导出架构总图，方法机制需结合 v1 技术报告、2024 Protenix 方法报告和源码说明解读。*

v1 技术报告的可访问官方路径是 `https://github.com/bytedance/Protenix/blob/main/docs/PTX_V1_Technical_Report_202602042356.pdf`，README 给出的 citation DOI 为 `10.64898/2026.02.05.703733`。bioRxiv 页面在当前环境触发访问限制，因此正文方法级解读主要基于官方 GitHub README、v1 技术报告 PDF、2024 Protenix 方法报告和可访问的 ResearchGate 文本镜像。

##### 算法伪代码

```python
# Protenix-v1 / AF3-style biomolecular structure prediction
def protenix_predict(input_json, num_seeds=5, samples_per_seed=5, recycles=10):
    # 1. 解析多分子输入：protein / RNA / DNA / ligand / ions / covalent bonds
    features = featurize_biomolecular_complex(input_json)
    msa = build_msa(features.protein_sequences)
    rna_msa = build_rna_msa(features.rna_sequences)      # v1 support
    templates = search_or_load_protein_templates(features)  # v1 support

    predictions = []
    for seed in range(num_seeds):
        # 2. 推理时随机性：MSA subsampling、dropout、diffusion trajectory
        sampled_msa = subsample_msa(msa, max_rows=random_int(1, 16384))
        pair, single = input_embedder(features, sampled_msa, rna_msa, templates)

        # 3. recycle + Pairformer 表征学习
        for _ in range(recycles):
            pair, single = pairformer_stack(pair, single)

        # 4. diffusion module：从噪声原子坐标迭代去噪
        for sample in range(samples_per_seed):
            x = gaussian_atom_positions(features.atom_layout)
            for t in diffusion_schedule(reverse=True):
                x_denoised = diffusion_transformer(x, t, pair, single, features)
                x = diffusion_update(x, x_denoised, t)

            # 5. confidence head 估计 pLDDT / PAE / pTM / ipTM 等并排序
            confidence = confidence_head(x, pair, single)
            predictions.append((x, confidence))

    return rank_by_confidence(predictions)
```

##### 动机与背景

AlphaFold3 把结构预测从蛋白单链扩展到蛋白、核酸、小分子配体、离子和修饰的全生物分子复合物，但最初并未完整开放训练代码、权重和预处理流水线。Protenix 的定位是“可训练、可复现、可扩展”的 AF3 级开源基座，让研究者不仅能跑推理，还能检查数据处理、模型实现、评测协议和训练细节。

Protenix-v1 的贡献不只是一次模型权重更新。v1 报告强调三件事：在严格对齐 AF3 的训练 cutoff、模型规模和推理预算下达到或超过 AF3 级表现；通过更多 samples/seeds 展示 inference-time scaling；并指出既有 FoldBench 等评测存在模型失败样本覆盖不一致、方差未充分报告的问题，因此用 common intersection 和 bootstrapping 做更稳健比较。

##### AF3 风格架构机制

Protenix 继承 AF3 的核心抽象：先把输入分子系统离散成 token 和 atom features，再学习 single representation 与 pair representation，最后用扩散模型生成全原子坐标。Pairformer 负责在 \(N \times N\) pair 表征中积累“哪些 token 应该接近、以何种方式相互作用”的结构假设，diffusion module 则把这个结构假设解析为三维原子坐标。

Pairformer 的一个简化表达是：

$$
(s, z) \leftarrow \text{Pairformer}(s, z)
$$

其中 \(s_i\) 是 token \(i\) 的 single 表征，\(z_{ij}\) 是 token 对 \((i,j)\) 的 pair 表征。pair stack 通过 triangle updates / triangle attention 保持几何一致性，single stack 通过 pair-biased attention 让单点表征感知成对关系：

$$
\text{Attention}_{ij} \propto \frac{q_i^\top k_j}{\sqrt{d}} + b(z_{ij})
$$

直觉上，pair 表征提供结构先验偏置：如果 Pairformer 认为两个 token 之间存在强相互作用，扩散 Transformer 在坐标去噪时会更倾向于把它们放在合理距离和取向上。

##### 扩散坐标生成与损失

全原子坐标扩散可写成从噪声坐标 \(x_t\) 预测去噪坐标 \(\hat{x}_0\) 或噪声项。简化训练目标为：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{x_0,t,\epsilon}
\left[
w(t)\left\|x_0 - f_\theta(x_t,t,s,z)\right\|_2^2
\lambda_{\text{bond}}\mathcal{L}_{\text{bond}}
\lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
\lambda_{\text{conf}}\mathcal{L}_{\text{confidence}}
\right]
$$

2024 Protenix 方法报告列出了一些对 AF3 补充材料的实现校正，例如 diffusion ODE 更新中应使用 \(x_{\text{noisy}}-x_{\text{denoised}}\)，diffusion Transformer block 的 AttentionPairBias 需要 residual connection，diffusion loss 的 per-sample weighting 也按 EDM 形式修正。报告还说明 Protenix 对 confidence head 加入 LayerNorm 和额外线性层，因为完全照 AF3 描述实现时 confidence loss 收敛较差。

##### v1 相比早期 Protenix 的改动

v1 报告说明 Protenix-v1 加入更完整的数据处理和输入特征，包括 RNA MSA support、protein template integration、expanded disorder-focused distillation 和 MGnify large-scale monomer distillation。这些补充使 v1 更接近 AF3 训练数据构成，也解释了为什么 v1 在蛋白-蛋白、抗体-抗原、蛋白-核酸等多模态任务上比早期 open-source baseline 更稳定。

推理配置方面，v1 报告采用与 AF3 对齐的扩散推理超参：通常 5 random seeds，每个 seed 生成 5 diffusion samples，recycles 固定为 10；报告中的 Protenix-v1 还用 20 seeds bootstrapping 估计方差。随机性来自 MSA subsampling、pair embedding dropout 和扩散采样轨迹。对困难目标，提高 seed/sample 数量会提升 selected prediction 质量：

$$
\text{quality} \approx a + b \log(\text{number of samples})
$$

这就是 inference-time scaling 的含义：模型本身不变，只用更多采样预算扩大候选集合，再由 confidence head 选择更可信结构。

##### 与 AlphaFold3 和其他开源模型的区别

Protenix-v1 与 AF3 的方法范式接近，但开放性不同：Protenix 发布代码、权重、训练/推理文档、MSA/template pipeline 和评测工具，允许社区复现与微调。与 Boltz-1、Chai-1、HelixFold3 等开源或开放模型相比，v1 报告强调在相同 cutoff、规模和推理预算下比较，并在 FoldBench common intersection、PXM-2024/2025、PXM-22to25-Ligand/Antibody 等基准上报告更细分的结果。

需要谨慎的是，YAML 中“全面超越 AF3”是动机描述，不应机械理解为每个子任务都优于 AF3。v1 报告显示 Protenix-v1 在 protein-protein 和 antibody-antigen 等接口任务上很强，但 AlphaFold3 在部分 protein-ligand、protein-DNA docking 指标上仍保留优势。更准确的结论是：Protenix-v1 是首批在公平预算下达到 AF3 级别、且完全开放训练和推理栈的模型之一。

#### 🧪 练习题
```yaml
question: "Protenix-v1 中 inference-time scaling 的核心含义是什么？"
options:
  - "增加训练集 cutoff 年份，使模型看到更多未来结构"
  - "固定模型参数，通过更多 diffusion seeds/samples 生成候选并用 confidence head 选择更优结构"
  - "把 Pairformer 全部替换成蛋白语言模型以减少 MSA 搜索"
  - "只预测蛋白单链，删除配体和核酸分支以提高准确率"
answer: 1
explain: "v1 报告强调在抗体-抗原等困难任务上，增加采样预算能持续提高选中结构质量；模型参数不变，额外成本来自更多扩散采样和排序。"
```

### ESM-IF

```yaml
id: esmif
num: 12
name: ESM-IF
full_name: ESM-IF (ESM Inverse Folding)
year: '2022.04'
org: Meta AI
parent: —
paper_url: https://www.biorxiv.org/content/10.1101/2022.04.10.487779v1
project_url: ''
category: protein_design
motivation: 几何图神经网络实现逆折叠
```

#### 📝 一句话总结
ESM-IF 把固定骨架蛋白设计建模为“给定 backbone 坐标生成氨基酸序列”的自回归条件语言建模问题，并用 1200 万条 AlphaFold2 预测结构扩充训练数据，使 GVP-Transformer 在结构 held-out 测试上达到约 51% native sequence recovery。

#### 🎯 核心要点
- **逆折叠任务定义**：输入每个残基的 \(N, C_\alpha, C\) backbone 坐标，输出最可能折叠到该骨架的氨基酸序列
- **预测结构扩容训练集**：用 AlphaFold2 为 UniRef50 中 1200 万条序列预测结构，将结构监督规模相对 CATH 实验结构扩大近三个数量级
- **GVP-Transformer 架构**：先用 GVP-GNN 提取旋转/平移不变的几何特征，再接通用 encoder-decoder Transformer 做自回归序列生成
- **坐标不变性设计**：模型输出满足 \(p(Y|X)=p(Y|TX)\)，即整体旋转和平移输入骨架不改变序列分布
- **span masking 训练**：随机屏蔽连续 backbone 片段，使模型能处理缺失坐标、局部重设计和多链复合物设计
- **性能提升**：GVP-Transformer + AF2 预测结构训练在 CATH topology split 上达到约 51.6% recovery，埋藏残基 recovery 约 72%
- **官方实现**：Meta ESM repo 提供 `esm_if1_gvp4_t16_142M_UR50` 权重、采样脚本和 log-likelihood scoring 脚本

#### 🔬 深入细节
##### 模型与任务图示

![ESM-IF1 逆折叠示例](https://raw.githubusercontent.com/facebookresearch/esm/main/examples/inverse_folding/illustration.png)
*图：Meta ESM 官方 inverse folding 示例图。论文 Figure 1 展示了“CATH 实验结构 + 1200 万 AF2 预测结构 → GVP encoder + Transformer decoder”的训练流程，可访问 PDF 为 `https://proceedings.mlr.press/v162/hsu22a/hsu22a.pdf`。*

ESM-IF 的论文正式收录于 ICML 2022 PMLR，题名为 *Learning inverse folding from millions of predicted structures*。bioRxiv 链接对应预印本；PMLR 页面和 Meta 官方 GitHub README 均可访问，并给出代码、权重和使用脚本。

##### 算法伪代码

```python
# ESM-IF1 / GVP-Transformer 逆折叠伪代码
def esm_if_design(backbone_coords, temperature=1.0, masked_spans=None):
    # backbone_coords: [L, 3, 3], 每个残基的 N, CA, C 坐标
    coords = apply_span_mask(backbone_coords, masked_spans)

    # 1. 构建几何图：节点为残基，边为空间近邻
    graph = build_knn_graph(coords, atom_types=["N", "CA", "C"])
    node_scalar, node_vector = featurize_dihedrals_and_local_vectors(coords)
    edge_scalar, edge_vector = featurize_relative_geometry(graph, coords)

    # 2. GVP encoder 提取几何特征，并转为局部参考系下的不变特征
    h_geo = gvp_encoder(graph, node_scalar, node_vector, edge_scalar, edge_vector)
    h_inv = project_vectors_to_local_frames(h_geo, coords)

    # 3. Transformer encoder-decoder 自回归生成序列
    memory = transformer_encoder(h_inv)
    sequence = ["<bos>"]
    for i in range(L):
        logits_i = transformer_decoder(sequence, memory)
        prob_i = softmax(logits_i / temperature)
        sequence.append(sample(prob_i))

    return "".join(sequence[1:])
```

##### 概率建模与损失函数

论文把逆折叠形式化为条件分布学习。给定长度为 \(n\) 的蛋白 backbone 坐标：

$$
X=(x_1,\ldots,x_{3n})
$$

其中每个残基有 \(N, C_\alpha, C\) 三个 backbone 原子坐标，目标是预测氨基酸序列：

$$
Y=(y_1,\ldots,y_n)
$$

模型采用自回归 encoder-decoder：

$$
p(Y|X)=\prod_{i=1}^{n}p(y_i|y_{i-1},\ldots,y_1;X)
$$

训练目标是最小化 native sequence 的负对数似然：

$$
\mathcal{L}_{\text{NLL}}=-\sum_{i=1}^{n}\log p_\theta(y_i|y_{<i},X)
$$

推理时可用低温采样提升 native recovery，也可用较高温度增加设计多样性。官方 README 指出温度越高序列越多样，但 native sequence recovery 通常下降；若目标是最大化 recovery，推荐接近确定性的低温采样，如 \(T=10^{-6}\)。

##### GVP-Transformer 架构

ESM-IF 研究了三类架构：原始 GVP-GNN、放宽宽度/深度的 GVP-GNN-large，以及最终表现最好的 GVP-Transformer。GVP 层同时处理 scalar features 和 vector features：标量通道表达二面角、距离等旋转不变信息，向量通道表达局部方向；每层对向量特征做旋转等变变换，对标量特征做旋转不变更新。

最终的 142M 参数 GVP-Transformer 由 4 层 GVP-GNN encoder、8 层 Transformer encoder 和 8 层 Transformer decoder 组成。GVP 部分负责把三维几何压缩成对全局旋转/平移不敏感的局部表征；Transformer 部分负责长程序列依赖、自回归条件生成和处理缺失骨架上下文。

> 💡 关键：纯 GVP-GNN 在小规模 CATH 上表现强，但不能充分吸收 1200 万预测结构；更大的 GVP-Transformer 才能把预测结构规模转化为 recovery 提升。

##### 预测结构如何提升逆折叠

实验结构数据太少是早期逆折叠模型的瓶颈。论文统计 CATH topology split 训练集只有约 1.6 万条结构，而 UniRef50 序列空间远大于 PDB 结构空间。ESM-IF 的做法类似机器翻译中的 back-translation：用 AlphaFold2 先为大量序列预测结构，再用这些“合成结构-天然序列”对训练从结构到序列的逆向模型。

训练时每个 epoch 混合实验结构和 10% 的 AF2 预测结构，比例约为 1:80。为了减少低置信预测区域的噪声，论文屏蔽 pLDDT 低于 90 的预测坐标，并把 pLDDT 通过 Gaussian radial basis functions 作为额外特征输入。训练中还加入约 0.1 Å 坐标噪声，提高模型对预测结构误差的鲁棒性。

结果显示，小型 1M GVP-GNN 加入预测结构反而退化，但 GVP-GNN-large 和 GVP-Transformer 均显著受益。GVP-Transformer 从只用 CATH 的约 38.3% recovery 提升到使用 AF2 预测结构后的约 51.6%，说明“数据规模”和“模型容量/架构”必须同时匹配。

##### Span masking、多链和多状态设计

ESM-IF 不只做完整单链骨架恢复。论文在训练时随机选择最长 30 个残基的连续 span，直到约 15% backbone 坐标被 mask，使模型可以在缺失坐标时仍根据上下文设计序列。这对局部 loop 重设计、部分未知结构和 flexible regions 很有用。

多链复合物设计时，官方脚本支持 `--multichain-backbone`：encoder 读取整个复合物的 backbone，decoder 只为指定链生成或打分序列。论文发现对于复合物中某条链，给定完整复合物坐标通常比只给单链坐标 perplexity 更低，说明模型利用了界面附近链间几何。

多状态设计则把同一序列需要兼容的多个构象联合起来。若状态为 \(A\) 和 \(B\)，可用几何平均 likelihood 作为代理目标：

$$
\log p(Y|A,B) \approx \frac{1}{2}\left[\log p(Y|A)+\log p(Y|B)\right]
$$

这使模型能为 flexible proteins、酶构象或结合前后状态设计兼容序列。

##### 与传统方法的区别

传统 Rosetta 类方法通常显式搜索侧链构象并优化物理能量函数；ESM-IF 则直接学习 \(p(\text{sequence}|\text{backbone})\)，用数据中的天然序列统计替代手工能量项。与 ProteinMPNN 相比，ESM-IF 的核心特色是更大规模的预测结构训练集和 GVP-Transformer 结合，而不是单纯依靠消息传递网络。

ESM-IF 的局限也很清楚：它主要条件在 backbone \(N,C_\alpha,C\) 坐标上，不显式联合生成 backbone；设计结果仍需 AlphaFold/实验或能量评估做二次筛选；surface residues 的 recovery 明显低于 buried residues，因为表面残基天然可替代性更高。但作为逆折叠和零样本突变打分模型，它证明了预测结构可以成为蛋白设计模型的重要训练数据。

#### 🧪 练习题
```yaml
question: "ESM-IF 中加入 1200 万 AlphaFold2 预测结构的关键作用是什么？"
options:
  - "让模型直接输出 AlphaFold2 的坐标，不再生成序列"
  - "扩大结构-序列监督规模，使大容量 GVP-Transformer 能学习更广泛的骨架到序列映射"
  - "替代自回归 decoder，使模型变成无监督语言模型"
  - "只提高小型 GVP-GNN 的性能，与模型容量无关"
answer: 1
explain: "论文显示小型 GVP-GNN 加入预测结构会退化，而大容量 GVP-GNN-large/GVP-Transformer 能利用 1200 万预测结构，将 recovery 提升到约 51%。"
```

### ProteinMPNN

```yaml
id: proteinmpnn
num: 13
name: ProteinMPNN
full_name: ProteinMPNN (ProteinMPNN)
year: '2022.09'
org: Baker Lab
parent: —
paper_url: https://www.science.org/doi/10.1126/science.add2185
project_url: ''
category: protein_design
motivation: 图神经网络鲁棒逆折叠设计
```

#### 📝 一句话总结
ProteinMPNN 提出了一种基于消息传递神经网络的蛋白质序列设计方法，通过引入原子间距离特征、顺序无关自回归解码和训练时骨架噪声注入，在天然序列恢复率（52.4% vs Rosetta 32.9%）和实验验证成功率上均大幅超越传统物理方法，并支持单体、寡聚体、纳米颗粒和蛋白-蛋白界面等多种设计场景。

#### 🎯 核心要点
- **消息传递神经网络架构**：3 层编码器 + 3 层解码器，128 维隐藏层，以蛋白质骨架原子间距离（N, Cα, C, O, 虚拟 Cβ）和二面角为输入特征
- **顺序无关自回归解码**：解码顺序从所有排列中随机采样，支持固定部分残基、对称约束等灵活设计场景
- **对称感知的位置耦合**：通过平均对称等价位置的 logits 实现同源寡聚体、重复蛋白和纳米颗粒的对称序列设计
- **骨架噪声训练策略**：训练时向骨架坐标添加高斯噪声（std = 0.02–0.3Å），显著提升对结构预测模型（如 AlphaFold 生成骨架）的鲁棒性
- **多状态设计能力**：通过对不同骨架状态预测的 logits 进行线性组合，实现正/负设计
- **序列恢复率 52.4%**（vs Rosetta 32.9%），计算速度提升 ~200 倍（1.2 秒 vs 258.8 秒/100 残基）
- **广泛实验验证**：X 射线晶体学、冷冻电镜和功能实验证实可成功挽救 Rosetta/AlphaFold 失败的单体、环状寡聚体、四面体纳米颗粒和靶标结合蛋白设计

#### 🔬 深入细节
##### 模型架构总览

![ProteinMPNN 架构示意图](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9997061/bin/nihms-1883506-f0001.jpg)
*图：ProteinMPNN 模型架构。(A) 编码器-解码器架构总览；(B) 固定残基的灵活解码顺序；(C) 对称等价位置的 logits 平均耦合机制。*

ProteinMPNN 基于图神经网络框架，将蛋白质骨架建模为以 Cα 原子为节点、K 近邻（K=32–48）为边的图结构。编码器通过消息传递更新节点和边的表征，解码器以自回归方式逐残基预测氨基酸类型。

##### 算法伪代码

```python
# ProteinMPNN 序列设计伪代码
def design_sequence(backbone, decode_order, tied_positions=None, temperature=1.0):
    """
    backbone: 蛋白质骨架坐标 (N, Cα, C, O 原子位置)
    decode_order: 随机采样的残基解码顺序排列
    tied_positions: 对称等价位置分组 (可选)
    temperature: 采样温度，控制序列多样性
    """
    # 1. 构建 K 近邻图 (K=48)
    edges = knn_graph(backbone.Ca, k=48)
    
    # 2. 计算输入特征
    features = compute_features(backbone)  # Cα-Cα, N, C, O, Cβ 间距离 + 二面角
    
    # 3. 编码器：3 层消息传递 (节点更新 + 边更新)
    node_emb, edge_emb = encoder(features, edges)  # 128-dim
    
    # 4. 解码器：按 decode_order 自回归生成
    sequence = []
    for pos in decode_order:
        if pos in fixed_residues:
            sequence[pos] = known_identity  # 跳过但保留上下文
            continue
        
        logits = decoder(node_emb, edge_emb, sequence_context, pos)
        
        # 对称耦合：平均等价位置的 logits
        if tied_positions and pos in tied_group:
            logits = mean([decoder(..., p) for p in tied_group])
        
        prob = softmax(logits / temperature)
        sequence[pos] = sample(prob)
    
    return sequence
```

##### 动机与背景

蛋白质序列设计的核心问题是：给定一个目标骨架结构，找到能折叠为该结构的氨基酸序列。传统物理方法（如 Rosetta）将此问题转化为能量优化——搜索给定骨架上能量最低的氨基酸序列和侧链构象组合。然而，这种方法存在根本性困难：

> ⚠️ **Rosetta 的根本局限**：真正的设计目标是找到一个以目标结构为最低能量态的序列，但这需要遍历所有可能的结构（包括不需要的寡聚态和聚集态），计算上不可行。Rosetta 实际上只是搜索给定骨架上的最低能量序列作为代理目标，再用结构预测验证——代理目标与真实目标的不一致导致需要大量人工定制（如限制表面疏水残基）。

深度学习方法直接从 PDB 中学习"给定骨架，最可能的氨基酸是什么"，绕过了上述代理目标问题。先前的深度学习方法虽然在单体设计上展现了潜力，但在多链设计、对称约束等实际设计场景中适用性有限，且缺乏充分的实验验证。

##### 核心技术创新

**1. 增强的骨架特征表示**

基线模型仅使用 Cα-Cα 距离、相对 Cα-Cα-Cα 框架朝向/旋转和骨架二面角作为输入。ProteinMPNN 引入了所有骨架原子（N, Cα, C, O）及虚拟 Cβ 原子之间的距离作为额外特征：

$$\text{Features} = \{d(X_i, X_j) \mid X \in \{N, C_\alpha, C, O, C_\beta^{\text{virtual}}\}\} \cup \{\phi, \psi, \omega\}$$

其中虚拟 \(C_\beta\) 基于其他骨架原子几何放置。这一改进将序列恢复率从 41.2% 提升至 49.0%。

> 💡 **关键直觉**：原子间距离比二面角或局部坐标框架提供了更好的归纳偏置来捕获残基间相互作用——距离直接编码了空间邻近关系，而二面角是局部的。

**2. 编码器中的边更新机制**

在标准消息传递中仅更新节点表征，ProteinMPNN 在编码器中同时更新边表征，使边能够动态整合来自相邻节点和边的信息。结合增强特征和边更新，序列恢复率达到 50.5%。

**3. 顺序无关自回归解码**

传统自回归模型按固定的 N→C 端顺序解码。ProteinMPNN 采用顺序无关自回归模型，解码顺序从所有可能的排列中随机采样：

$$p(\mathbf{s} | \mathbf{X}) = \prod_{t=1}^{L} p(s_{\sigma(t)} | s_{\sigma(1)}, \ldots, s_{\sigma(t-1)}, \mathbf{X})$$

其中 \(\sigma\) 是随机采样的排列。这带来两个关键优势：
- **灵活的设计约束**：可以固定任意位置的残基（如蛋白结合设计中的靶标序列），解码时跳过固定位置但将其纳入上下文
- **对称耦合**：对称等价位置同时解码，其 logits 被平均后采样

**4. 对称感知的位置耦合**

对于同源寡聚体（如 C2 二聚体，链 A 和链 B 序列必须相同），ProteinMPNN 同时预测等价位置的 logits 并平均：

$$p(a | \text{pos}_1, \text{pos}_2, \ldots) = \text{softmax}\left(\frac{1}{K}\sum_{k=1}^{K} \text{logits}_k\right)$$

从平均后的分布中采样一个共同的氨基酸。实验表明，平均 logits（55% 恢复率）优于平均概率（53%）和无约束设计（52%）。

> 💡 **为什么平均 logits 优于平均概率？** Logits 在 softmax 之前的空间中操作，平均 logits 等价于对概率分布取几何平均再归一化，这比算术平均（平均概率）更好地保留了各位置的"否决权"——如果某个对称位置强烈反对某个氨基酸，平均 logits 会更有效地抑制它。

**5. 骨架噪声训练**

训练时向骨架坐标添加高斯噪声：

$$\mathbf{X}_{\text{noised}} = \mathbf{X} + \epsilon, \quad \epsilon \sim \mathcal{N}(0, \sigma^2 I)$$

其中 \(\sigma\) 取 0.02–0.3Å。这一策略的效果看似矛盾：
- 在完美 PDB 骨架上，序列恢复率随噪声增大而**下降**（模型无法捕捉精细骨架细节）
- 但在 AlphaFold 预测的结构模型上，序列恢复率**上升**
- 更重要的是，噪声模型生成的序列被 AlphaFold 预测为更准确地折叠到目标结构

> 💡 **关键洞察**：晶体学精修可能在骨架坐标中留下了氨基酸身份的"记忆"，在完美骨架上训练的模型会利用这种伪信号。噪声训练迫使模型关注整体拓扑特征而非局部精细结构细节，生成的序列更鲁棒地编码目标结构。例如，0.3Å 噪声模型生成的序列中，AlphaFold 预测 lDDT-Cα > 95.0 的数量是无噪声模型的 2–3 倍。

**6. 温度控制的序列多样性**

推理时通过调节采样温度 \(T\) 控制序列多样性：

$$p(a_i | \text{context}) = \text{softmax}(\text{logits}_i / T)$$

较高温度产生更多样的序列，序列恢复率仅有很小的下降。ProteinMPNN 还提供了一个内置的序列质量度量——给定结构的序列平均对数概率，该指标与序列恢复率在不同温度下高度相关，可用于快速排序和筛选候选序列。

##### 与传统方法的关键区别

| 特性 | Rosetta | ProteinMPNN |
|------|---------|-------------|
| 方法范式 | 物理能量优化 | 数据驱动深度学习 |
| 序列恢复率 | 32.9% | **52.4%** |
| 100 残基计算时间 | 258.8 秒 | **1.2 秒** |
| 需要专家定制 | 是（如限制表面疏水残基） | **否** |
| 侧链构象搜索 | 显式旋转异构体搜索 | 隐式学习 |
| 多链/对称支持 | 需要额外设置 | **原生支持** |
| 优化目标 | 给定骨架的最低能量序列（代理目标） | 给定骨架的最可能序列（直接从 PDB 学习） |

##### 实验验证

ProteinMPNN 在四类设计挑战中均展现了卓越性能：

1. **AlphaFold 幻觉单体/寡聚体**：AlphaFold 生成的序列大多不可溶（中位可溶产量 9 mg/L），ProteinMPNN 重新设计后 76% 可溶表达（中位产量 247 mg/L），52% 具有正确的寡聚态
2. **重复蛋白设计**：成功挽救了多个 Rosetta 设计失败的重复蛋白结构
3. **四面体纳米颗粒**：76 个设计中 13 个形成预期 ~1 MDa 组装体，晶体结构与设计模型仅 1.2Å Cα RMSD
4. **SH3 结合蛋白**：Rosetta 设计的序列无法折叠和结合，ProteinMPNN 设计的序列成功结合 Grb2 SH3 结构域

> 💡 **核心实验发现**：ProteinMPNN 生成的序列在单序列 AlphaFold 预测中，比天然序列更自信、更准确地折叠到天然骨架结构——这表明 ProteinMPNN 可能广泛适用于提升重组表达天然蛋白的表达量和稳定性。

#### 🧪 练习题
```yaml
question: "ProteinMPNN 在训练时添加骨架噪声的主要效果是什么？"
options:
  - "提高在完美 PDB 晶体结构上的序列恢复率"
  - "使模型关注整体拓扑特征，生成的序列更鲁棒地编码目标结构"
  - "减少模型参数量以加速推理"
  - "消除训练数据中的同源序列偏差"
answer: 1
explain: "噪声训练虽然降低了完美骨架上的序列恢复率，但迫使模型关注整体拓扑而非局部精细细节，生成的序列在 AlphaFold 单序列预测中更准确地折叠到目标结构（lDDT-Cα>95 的序列数量提升 2-3 倍）。"
```

### FrameDiff

```yaml
id: framediff
num: 14
name: FrameDiff
full_name: FrameDiff (FrameDiff)
year: '2023.02'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2302.02277
project_url: ''
category: protein_design
motivation: SE(3)框架下直接扩散骨架
```

#### 📝 一句话总结
FrameDiff 提出了一个在 \(SE(3)^N\) 残基刚体框架空间上定义和学习扩散过程的蛋白质骨架生成方法，用原则化的旋转/平移 score matching 解决了蛋白质骨架生成中全局几何等变性、刚体表示和物理局部约束难以统一的问题。

#### 🎯 核心要点
- **残基 frame 表示**：每个残基用 \(T_n=(R_n,X_n)\in SE(3)\) 表示，其中 \(X_n\) 是 \(C_\alpha\) 坐标，\(R_n\) 由 \(N-C_\alpha-C\) 几何通过 Gram-Schmidt 构造
- **SE(3) 不变扩散过程**：在 \(SE(3)^N\) 上分别对旋转执行 \(SO(3)\) Brownian motion、对平移执行居中 Ornstein-Uhlenbeck / Gaussian 扩散，并用投影去除质心漂移
- **FramePred denoiser**：基于 AlphaFold2 Structure Module 的 IPA + Transformer + EdgeUpdate + BackboneUpdate，直接预测去噪后的 frame \(\hat{\mathbf{T}}_0\) 与氧原子所需的 torsion angle \(\hat{\psi}\)
- **条件 score 参数化**：不直接输出 score，而是先预测 \(\hat{\mathbf{T}}_0\)，再用已知扩散核计算 \(\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\hat{\mathbf{T}}_0)\)
- **多目标训练损失**：旋转 DSM + 平移 DSM，并在低噪声阶段加入 backbone 原子 MSE 和局部 2D 原子距离损失，减少链断裂和 steric clash
- **自条件机制**：用模型上一步预测的 \(C_\alpha\) pairwise distance bin 初始化边特征，提升采样稳定性
- **无需预训练结构预测网络**：论文报告可生成最长约 500 aa 的 designable monomer，并能泛化到已知结构之外的骨架

#### 🔬 深入细节
##### 方法示意图

![FrameDiff 方法总览](https://ar5iv.labs.arxiv.org/html/2302.02277/assets/figures/framediff_overview.png)
*图：FrameDiff 论文 Figure 1。左侧展示如何用 residue frame 参数化 \(N-C_\alpha-C\) 主链原子，右侧展示从随机 frame 开始执行反向 \(SE(3)\) 扩散并最终预测 \(\psi\) 角来放置氧原子。来源：ar5iv 对 arXiv:2302.02277 的公开 HTML 渲染。*

##### 算法伪代码

```python
# FrameDiff 采样伪代码：在 SE(3)^N 上反向扩散
def sample_framediff(theta, N, T_final=1.0, num_steps=200, zeta=1.0, eps=1e-3):
    gamma = (T_final - eps) / num_steps

    # 1. 从参考分布初始化 N 个残基 frame：旋转接近均匀，平移为居中 Gaussian
    T_t = sample_reference_frames(N)  # [(R_n, X_n)]_{n=1}^N, center_of_mass(X)=0

    for t in reversed_time_grid(T_final, eps, gamma):
        # 2. FramePred 预测干净骨架 frame 与氧原子 torsion angle
        T0_hat, psi_hat = FramePred(T_t, t, theta)

        # 3. 用已知 SE(3) 扩散核把 x0 预测转换为 conditional score
        s_rot, s_trans = conditional_score(T_t, T0_hat, t)

        for n in range(N):
            # 平移切空间步：OU drift + score drift + 可降噪采样噪声
            z_x = normal(0, I3)
            w_x = project_centered(gamma * (0.5 * X_t[n] + s_trans[n])
                                   + zeta * sqrt(gamma) * z_x)

            # 旋转切空间步：SO(3) tangent Gaussian + 指数映射
            z_r = tangent_normal_at(R_t[n])
            w_r = gamma * s_rot[n] + zeta * sqrt(gamma) * z_r

            T_t[n] = exp_map_SE3(T_t[n], rotation_step=w_r, translation_step=w_x)

    return FramePred(T_t, eps, theta)  # final frames + psi angles
```

##### 动机与背景

蛋白质骨架由局部刚性几何和全局三维构象共同决定。只在 \(C_\alpha\) 坐标上加高斯噪声会丢失 \(N-C_\alpha-C\) 的方向信息；直接在全原子坐标上扩散又容易违反键长、键角和旋转等变性。FrameDiff 的核心选择是把每个残基视为一个 orientation-preserving rigid transformation，即 \(SE(3)\) 上的 frame：平移给出 \(C_\alpha\) 位置，旋转给出主链局部坐标系。

这种表示把蛋白质主链生成变成 \(SE(3)^N\) 上的生成问题。难点在于：\(SO(3)\) 是紧 Lie 群，布朗运动有自然的热核；\(\mathbb{R}^3\) 平移空间没有有限的平移不变概率测度。因此论文把平移扩散限制在质心为 0 的子空间中，用投影 \(P\) 去除整体平移自由度，使前向和反向过程保持全局 \(SE(3)\) 等变/不变性质。

##### frame 参数化与扩散核

对第 \(n\) 个残基，FrameDiff 使用：

$$
T_n=(R_n,X_n)\in SE(3),\qquad X_n=(C_\alpha)_n
$$

其中 \(R_n\) 由 \(N-C_\alpha-C\) 三个原子确定。预测完整 backbone 时，\(N,C_\alpha,C\) 可由 frame 直接放置，氧原子 \(O\) 还需要额外 torsion angle \(\psi_n\)。因此 denoiser 输出：

$$
(\hat{\mathbf{T}}_0,\hat{\boldsymbol{\psi}})
=\mathrm{FramePred}(\mathbf{T}_t,t;\theta)
$$

前向扩散在旋转和平移上可分解：

$$
\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\mathbf{T}_0)
=
\left[
\nabla_{\mathbf{R}_t}\log p_{t|0}(\mathbf{R}_t|\mathbf{R}_0),
\nabla_{\mathbf{X}_t}\log p_{t|0}(\mathbf{X}_t|\mathbf{X}_0)
\right]
$$

旋转部分使用 \(SO(3)\) Brownian motion 的转移核，平移部分使用居中 Gaussian/OU 型扩散。模型训练时并不要求网络手写输出复杂的 Lie 群 score，而是让网络预测 \(\hat{\mathbf{T}}_0\)，再通过条件扩散核计算：

$$
s_\theta(t,\mathbf{T}_t)
=
\nabla_{\mathbf{T}_t}\log p_{t|0}(\mathbf{T}_t|\hat{\mathbf{T}}_0)
$$

> 💡 **关键直觉**：预测 \(\hat{\mathbf{T}}_0\) 比直接预测 tangent score 更贴近蛋白质结构任务；score 则由几何正确的扩散核“翻译”出来，从而保留 \(SE(3)\) 上的数学结构。

##### 网络结构

FramePred 继承 AlphaFold2 Structure Module 的核心几何归纳偏置，但用于生成而不是结构预测。每层维护残基节点嵌入 \(\mathbf{h}_\ell\)、残基对边嵌入 \(\mathbf{z}_\ell\) 和当前 frame \(\mathbf{T}_\ell\)。Invariant Point Attention 捕获三维空间邻近关系，Transformer 捕获序列方向上的长程相互作用，EdgeUpdate 更新 pair 表征，BackboneUpdate 预测每个 residue frame 的旋转和平移增量。

与 AlphaFold2 不同，FrameDiff 不在旋转更新之间使用 stop-gradient；边特征还会注入自条件信息，即上一次 \(\hat{C}_\alpha\) 预测的 pairwise distance bins。这样模型在反向扩散早期可以处理高度噪声化的 frame，在后期又能稳定地恢复局部主链几何。

##### 训练损失

FrameDiff 的基础目标是 denoising score matching：

$$
\mathcal{L}_{\mathrm{dsm}}
=
\mathcal{L}_{\mathrm{dsm}}^{r}
+
\mathcal{L}_{\mathrm{dsm}}^{x}
$$

对平移分量，论文选择权重后可化简为对干净 \(C_\alpha\) 位置的 MSE：

$$
\mathcal{L}_{\mathrm{dsm}}^{x}
=
\frac{1}{N}\sum_{n=1}^{N}\lVert X_n^{(0)}-\hat{X}_n^{(0)}\rVert_2^2
$$

仅靠 DSM 会生成粗略拓扑合理但细节不稳定的骨架，因此 FrameDiff 在低噪声阶段加入两个辅助项。第一个直接约束四类 backbone 原子 \(\Omega=\{N,C_\alpha,C,O\}\)：

$$
\mathcal{L}_{\mathrm{bb}}
=
\frac{1}{4N}\sum_{n=1}^{N}\sum_{a\in\Omega}
\lVert a_n^{(0)}-\hat{a}_n^{(0)}\rVert_2^2
$$

第二个约束局部邻域内的原子间距离，类似 AlphaFold distogram 的局部几何版本：

$$
\mathcal{L}_{2D}
=
\frac{1}{Z}
\sum_{n,m=1}^{N}\sum_{a,b\in\Omega}
\mathbf{1}\{d_{ab}^{nm}<0.6\}
\lVert d_{ab}^{nm}-\hat{d}_{ab}^{nm}\rVert_2^2
$$

完整损失为：

$$
\mathcal{L}
=
\mathcal{L}_{\mathrm{dsm}}
+
w\cdot\mathbf{1}\{t<T_F/4\}
(\mathcal{L}_{\mathrm{bb}}+\mathcal{L}_{2D})
$$

其中辅助损失只在低噪声阶段启用，因为链断裂、碰撞和精细键几何主要在采样末端显现。

##### 与 RFdiffusion 等方法的区别

RFdiffusion 的强项是把 RoseTTAFold 结构预测网络微调成强 denoiser；FrameDiff 的目标更偏“原则化的几何扩散”：它明确构造 \(SE(3)^N\) 上的前向/反向扩散、\(SO(3)\) score、居中平移过程和 \(SE(3)\) 不变性。论文重点说明，即使不依赖预训练结构预测权重，FrameDiff 也能在 monomer backbone generation 上生成可由 ProteinMPNN/ESMFold 自一致验证的设计。

这使 FrameDiff 的意义不只是一个蛋白质生成器，也是一套可复用的 \(SE(3)\) 扩散建模模板：当对象天然由多个刚体 frame 构成时，可以把“生成坐标”改写为“生成 Lie 群上的刚体变换”，从而把旋转、平移、等变性和物理局部几何放进同一个概率模型。

#### 🧪 练习题
```yaml
question: "FrameDiff 为什么要把蛋白质骨架表示为 SE(3)^N 上的 residue frames？"
options:
  - "为了只生成氨基酸序列而不生成三维结构"
  - "为了同时保留 Cα 位置和 N-Cα-C 局部方向，并在生成过程中保持全局 SE(3) 几何结构"
  - "为了把所有旋转都替换成普通欧氏高斯噪声"
  - "为了避免预测氧原子的 torsion angle"
answer: 1
explain: "每个 residue frame 同时编码 Cα 平移和主链局部朝向，使扩散过程能在 SE(3)^N 上处理旋转/平移 score；氧原子仍需额外预测 ψ 角。"
```

### RFdiffusion

```yaml
id: rfdiffusion
num: 15
name: RFdiffusion
full_name: RFdiffusion (RFdiffusion)
year: '2023.07'
org: Baker Lab
parent: rosettafold
paper_url: https://www.nature.com/articles/s41586-023-06415-8
project_url: ''
category: protein_design
motivation: 扩散模型生成蛋白质骨架
```

#### 📝 一句话总结
RFdiffusion 将 RoseTTAFold 从结构预测网络微调为蛋白质 residue frame 的扩散去噪网络，通过从随机噪声逐步生成骨架并支持 motif、靶标、对称性和拓扑条件，解决了传统 hallucination / inpainting 方法多样性不足、约束表达弱和实验成功率低的问题。

#### 🎯 核心要点
- **RoseTTAFold denoiser**：以更新版 RoseTTAFold 为骨干，最小化架构改动后改造成 DDPM 去噪网络
- **残基刚体 frame 扩散**：每个残基由 \(C_\alpha\) 坐标与 \(N-C_\alpha-C\) 刚体方向组成；平移加 3D Gaussian noise，方向使用旋转矩阵流形上的 Brownian motion
- **直接预测 \(\hat{X}_0\)**：每个时间步输入 noisy frames \(X_t\) 和上一步自条件预测 \(\hat{X}_0^{t+1}\)，输出当前干净结构预测 \(\hat{X}_0^t\)
- **MSE 去噪损失替代 FAPE**：训练时最小化未对齐 frame/坐标预测与真实结构之间的 MSE，保留反向扩散中全局坐标系的连续性
- **典型 200 步采样**：从随机 residue frames 出发，每步朝 \(\hat{X}_0^t\) 插值并加入匹配前向过程的噪声，逐渐收缩到设计骨架
- **条件生成能力**：同一框架支持无条件单体、fold/topology conditioning、motif scaffolding、binder design、对称寡聚体、酶活性位点 scaffolding 和对称 motif scaffolding
- **序列设计后处理**：通常用 ProteinMPNN 为 RFdiffusion 生成的 backbone 采样序列，再用 AF2/ESMFold 与实验筛选验证
- **大规模实验验证**：论文报告数百个设计的表达、组装、结合或金属配位实验，包含与设计模型高度一致的 cryo-EM 结构

#### 🔬 深入细节
##### 方法示意图

![RFdiffusion 方法总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-06415-8/MediaObjects/41586_2023_6415_Fig1_HTML.png)
*图：Nature 论文 Figure 1。左侧对比普通扩散、RoseTTAFold 和 RFdiffusion 的单步去噪；右侧展示无条件、对称、binder、motif 和 symmetric motif 等条件生成任务。来源：Nature / Springer Figure 1 公开图片直链。*

##### 算法伪代码

```python
# RFdiffusion 推理伪代码
def rfdiffusion_sample(condition=None, T=200, noise_scale=1.0):
    """
    condition: 可为空，也可包含 motif residues、target protein、symmetry group、
               secondary structure / block adjacency 等条件
    T: 论文中常用约 200 个反向扩散步
    """
    # 1. 初始化随机 residue frames；条件片段按任务固定或部分加噪
    X_t = initialize_random_frames(condition)
    X0_self = None

    for t in range(T, 0, -1):
        # 2. RoseTTAFold denoiser：输入当前 noisy frames、条件、上一步预测
        X0_hat = RF_denoiser(
            noisy_frames=X_t,
            timestep=t,
            condition=condition,
            template_self_condition=X0_self,
        )

        # 3. 根据扩散日程，从 X_t 向 X0_hat 做 noisy interpolation
        X_prev = interpolate_towards_prediction(
            X_t=X_t,
            X0_hat=X0_hat,
            timestep=t,
            noise_scale=noise_scale,
        )

        # 4. 自条件：下一步把当前预测作为 template 输入
        X0_self = X0_hat
        X_t = enforce_condition_if_needed(X_prev, condition)

    # 5. 生成序列并筛选
    backbone = X_t
    sequences = ProteinMPNN.sample(backbone, num_sequences=8)
    return filter_with_structure_prediction(backbone, sequences)
```

##### 动机与背景

在 RFdiffusion 之前，蛋白质深度设计主要有两类路径：一类是 hallucination，通过优化序列让结构预测网络“相信”它会折叠成某种结构；另一类是 RFjoint Inpainting，在给定 motif 或部分骨架的情况下补全其余结构。它们都能解决部分问题，但通常需要较强约束、人工调参，且对同一设计任务生成的多样性有限。

RFdiffusion 的核心判断是：RoseTTAFold 已经在结构预测中学习到了大量蛋白质几何先验，包括 residue frame 表示、旋转等变处理、残基级/残基对级/三维坐标级条件输入能力。与其从零训练一个蛋白质扩散网络，不如把 RF 微调成 DDPM 的 denoiser，让它学习“从被噪声破坏的 protein frames 恢复干净结构”。

##### noising / denoising 机制

RFdiffusion 使用 RF 的 residue frame 表示。简化地说，第 \(n\) 个残基的状态是：

$$
X_n=(x_n,R_n),\qquad x_n\in\mathbb{R}^3,\ R_n\in SO(3)
$$

其中 \(x_n\) 是 \(C_\alpha\) 坐标，\(R_n\) 编码 \(N-C_\alpha-C\) 刚体方向。训练样本来自 PDB：坐标分量用 3D Gaussian noise 扰动，方向分量用旋转矩阵流形上的 Brownian motion 扰动。可把前向过程直观写成：

$$
q(X_t|X_0)=q(x_t|x_0)\,q(R_t|R_0)
$$

其中 \(q(x_t|x_0)\) 是欧氏空间中的高斯扩散核，\(q(R_t|R_0)\) 是 \(SO(3)\) 上的旋转扩散核。反向时，模型不是预测噪声 \(\epsilon\)，而是在每个时间步预测干净结构：

$$
\hat{X}_0^t=f_\theta(X_t,t,\hat{X}_0^{t+1},c)
$$

这里 \(c\) 表示条件信息，例如固定 motif、靶标表面 hotspot、对称群或 fold sketch。下一步输入 \(X_{t-1}\) 由 \(X_t\) 朝 \(\hat{X}_0^t\) 的 noisy interpolation 得到：

$$
X_{t-1}\approx \mathrm{Interp}(X_t,\hat{X}_0^t,t)+\sigma_t z
$$

这个“朝预测干净结构走一步，再补上合适噪声”的过程使反向轨迹在统计上匹配前向 noising 轨迹。

##### 训练目标：为什么用 MSE 而不是 FAPE

RoseTTAFold 原本的结构预测训练常用 FAPE（frame aligned point error），它对全局参考系不敏感，非常适合“给定序列预测结构”。但扩散采样需要在 \(t=T\rightarrow 0\) 的多步轨迹中保持全局坐标系连续：如果每一步预测都可任意全局对齐，下一步的 noisy interpolation 就失去明确方向。

RFdiffusion 因此使用未对齐的 MSE 去噪目标。简化表示为：

$$
\mathcal{L}_{\mathrm{denoise}}
=
\frac{1}{N}\sum_{n=1}^{N}
\left\|
\hat{X}_{0,n}^{t}-X_{0,n}
\right\|_2^2
$$

实际实现中会对 residue frame / backbone 坐标预测求平均。关键不是 MSE 本身多复杂，而是“不做全局对齐”：模型必须学习在同一坐标系中把 \(X_t\) 推回 \(X_0\)，这让连续去噪轨迹有稳定的方向感。

> 💡 **关键直觉**：结构预测只需要“形状对”；扩散生成还需要“每一步往哪里走”。未对齐 MSE 把全局坐标系也纳入学习信号，避免反向过程在不同对齐方式之间跳动。

##### 自条件与条件控制

RFdiffusion 在每个时间步把上一时间步的 \(\hat{X}_0^{t+1}\) 作为 template 输入，这就是 self-conditioning。早期噪声很大时，\(\hat{X}_0\) 并不像蛋白质；随着迭代推进，预测结构逐渐变得 protein-like，自条件提供了一个连续演化的结构记忆。

条件控制则来自 RF 架构本身的多通道输入能力：

- **motif scaffolding**：固定功能 motif 的坐标和身份，对其余 residues 扩散生成
- **binder design**：输入 target protein 和 interface hotspot，生成能贴合目标表面的新 binder
- **symmetric oligomer**：对初始噪声和模型输出施加对称操作，利用近似等变性生成 C/D/T 等对称组装体
- **fold conditioning**：输入 secondary structure 与 block adjacency，控制粗粒度拓扑
- **active-site scaffolding**：对很小的催化/配位 motif 使用专项微调模型，避免生成时 motif 漂移

这种机制类似图像扩散中的 prompt：条件不需要完整指定结构，只要能约束一部分几何或功能目标，反向扩散就会在蛋白质先验下补全其余部分。

##### 设计流程与验证

RFdiffusion 通常只生成 backbone。得到 backbone 后，论文实践中多用 ProteinMPNN 采样约 8 条序列，再用 AF2/ESMFold 评估序列是否会折叠回设计骨架，最后选择少量候选进入表达、组装、结合或结构解析实验。这个 pipeline 的优势是职责清晰：RFdiffusion 负责高质量几何先验和条件生成，ProteinMPNN 负责快速 inverse folding，结构预测和实验负责筛选。

论文结果显示，RFdiffusion 在无条件单体生成中能产生 300-600 aa 的新颖骨架；在 25 个 motif scaffolding benchmark 中解决 23 个，超过 hallucination 和 RFjoint inpainting；在 binder design 中通过 target + hotspot 条件生成多个靶标的结合蛋白，其中 HA binder 的 cryo-EM 结构与设计模型高度一致；在对称寡聚体和金属配位设计中也能把几何约束转化为可表达、可组装的蛋白。

##### 与传统方法的关键区别

传统 Rosetta / hallucination 工作流常把设计问题拆成“选择 scaffold、优化序列、反复过滤”，搜索空间强依赖人工经验。RFjoint Inpainting 虽能补全 motif 周围结构，但它更接近一次性条件补全，随机性和生成多样性有限。RFdiffusion 则把设计变成从噪声到结构的条件概率采样：

$$
p_\theta(X_0|c)
=
\int p(X_T)\prod_{t=1}^{T}p_\theta(X_{t-1}|X_t,c)\,dX_{1:T}
$$

这带来两个实际收益：第一，同一条件可以采样多个不同解，覆盖更广结构空间；第二，条件可以很弱，例如只给 target hotspot 或小 motif，模型会在扩散先验下生成完整、设计性更好的 backbone。

#### 🧪 练习题
```yaml
question: "RFdiffusion 为什么在去噪训练中使用未对齐的 MSE，而不是 RoseTTAFold 结构预测常用的 FAPE？"
options:
  - "因为 MSE 可以完全跳过旋转方向建模"
  - "因为扩散反向轨迹需要保持全局坐标系连续，未对齐 MSE 会惩罚坐标系漂移"
  - "因为 FAPE 只能用于氨基酸序列生成"
  - "因为 MSE 不需要任何真实结构监督"
answer: 1
explain: "FAPE 对全局参考系不敏感，适合结构预测；扩散采样需要每一步在同一坐标系中从 X_t 走向 X_0，因此 RFdiffusion 用未对齐 MSE 保持轨迹连续。"
```

### Chroma

```yaml
id: chroma
num: 16
name: Chroma
full_name: Chroma (Chroma)
year: '2023.11'
org: Generate Biomedicines
parent: —
paper_url: https://www.nature.com/articles/s41586-023-06728-8
project_url: ''
category: protein_design
motivation: 可编程生成复杂蛋白质对称体
```

#### 📝 一句话总结
Chroma 提出了一个面向蛋白质和蛋白复合物的可编程生成模型，把相关聚合物扩散、亚二次复杂度随机图神经网络、all-atom 序列/侧链设计网络和可组合 conditioner 统一起来，使蛋白质设计可以在生成时通过对称性、子结构、形状、语义甚至文本条件进行 Bayesian inference。

#### 🎯 核心要点
- **联合结构-序列模型**：先用 backbone diffusion 生成蛋白质/复合物骨架，再用 design network 条件生成序列和侧链构象，形成 all-atom joint generative model
- **相关聚合物扩散**：前向过程不是独立高斯噪声，而是尊重链连接性和 radius-of-gyration 统计的 correlated diffusion，把天然结构逐渐变成 collapsed polymer ensemble
- **随机长程图神经网络**：使用受 fast N-body 方法启发的 random graph connectivity，在 \(O(N)\) 或 \(O(N\log N)\) 边上做长程推理，支持大蛋白和复合物
- **几何合成层**：网络预测 confidence-weighted inter-residue geometries，再由 equivariant geometry solver 求解全局一致三维结构
- **低温采样**：通过修改扩散采样过程，提高样本 likelihood / 设计质量，同时降低构象多样性
- **Diffusion-conditioner 框架**：把用户约束写成 hard constraints 或 soft penalties，组合到时间相关 posterior \(\log p_t(x|y)\) 中，无需为新任务重训模型
- **可组合条件类型**：支持 symmetry、fixed substructure、distance/contact、motif grafting、shape point cloud、CATH/语义分类器和自然语言 annotation guidance
- **实验验证**：论文实验表征 310 个设计，多个设计可表达、可折叠且具有良好生物物理性质；两套晶体结构与 Chroma 样本约 1.0 Å backbone RMSD

#### 🔬 深入细节
##### 方法示意图

![Chroma 方法总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-06728-8/MediaObjects/41586_2023_6728_Fig1_HTML.png)
*图：Nature 论文 Figure 1。Chroma 用 correlated polymer diffusion 生成 backbone，用随机图神经网络和几何求解器预测去噪结构，再用 design network 生成 all-atom complex；右侧展示 time-dependent prior 与 conditioner 组合成 posterior。来源：Nature / Springer Figure 1 公开图片直链。*

##### 算法伪代码

```python
# Chroma 条件生成伪代码
def chroma_sample(chain_lengths, conditioners=None, inverse_temperature=1.0, langevin_factor=0.0):
    """
    chain_lengths: 单链或多链复合物的长度设定
    conditioners: 可组合约束，如 Symmetry、Substructure、Shape、Semantic guidance
    inverse_temperature: 低温采样强度，越大越偏向高 likelihood / 低熵样本
    """
    # 1. 从 collapsed polymer prior 初始化 noisy backbone
    x_t = sample_collapsed_polymer(chain_lengths)

    for t in reversed_time_grid(1.0, 0.0):
        # 2. backbone denoiser 预测干净坐标
        x0_hat = backbone_denoiser(x_t, t)  # \hat{x}_theta(x_t, t)

        # 3. 将 denoiser 转换为 protein prior score
        score_prior = denoiser_to_score(x_t, x0_hat, t)

        # 4. 叠加可组合 conditioner 的梯度或投影
        score_cond = 0.0
        x_t = apply_hard_constraints(x_t, conditioners, t)
        for cond in conditioners or []:
            score_cond += cond.weight(t) * cond.gradient(x_t, t)

        # 5. 低温 / Langevin 调整后执行反向扩散步
        score = inverse_temperature * score_prior + score_cond
        x_t = reverse_diffusion_step(x_t, score, t, langevin_factor=langevin_factor)

    # 6. 给定 backbone 生成序列和侧链，得到 all-atom protein complex
    sequence, sidechains = design_network(x_t)
    return assemble_all_atom_complex(x_t, sequence, sidechains)
```

##### 动机与背景

蛋白质设计真正需要的是“生成满足任务要求且可折叠的分子”，而不是只生成一个看起来像蛋白质的 backbone。现有生成模型往往只能处理单链、小体系或固定条件；如果每遇到一种新约束都要重新训练模型，实际设计迭代会非常慢。Chroma 试图同时满足三个要求：建模完整蛋白复合物的结构与序列、计算随残基数近似线性或亚二次增长、在推理时接受多种条件组合。

Chroma 的设计把问题拆成两层：第一层学习天然 protein backbone 的强先验 \(p_\theta(x)\)，第二层在采样时把用户条件 \(y\) 作为 likelihood 或约束加进去，得到：

$$
\log p_t(x|y)
=
\log p_t(x)+\log p_t(y|x)+C_t
$$

如果有多个条件，则把它们写成可加的能量/对数似然项：

$$
\nabla_x\log p_t(x|y_1,\ldots,y_K)
\approx
\nabla_x\log p_t(x)
+
\sum_{k=1}^{K} w_k(t)\nabla_x\log p_t(y_k|x)
$$

这就是“可编程”的核心：模型参数不变，设计任务通过 conditioner 组合表达。

##### correlated polymer diffusion

图像扩散常对每个像素加独立高斯噪声，但蛋白质 backbone 是一条或多条聚合物链，残基之间有链连接、空间折叠和半径统计。如果使用独立噪声，前向过程会快速破坏聚合物结构，使反向模型浪费大量容量学习最基础的链统计。

Chroma 因此使用相关噪声。简化写法为：

$$
x_t=\alpha_t x_0+\sigma_t \epsilon,\qquad
\epsilon\sim\mathcal{N}(0,\Sigma_{\mathrm{polymer}})
$$

其中 \(\Sigma_{\mathrm{polymer}}\) 不是对角矩阵，而是编码链内相关性、链长尺度和 collapsed polymer 的 radius-of-gyration 统计。随着 \(t\) 增大，天然结构被逐步变成随机但仍像聚合物的 collapsed ensemble；反向过程则学习从这个 ensemble 逐步恢复到真实 protein backbone。

网络以时间相关 denoiser 形式预测：

$$
\hat{x}_\theta(x_t,t)\approx\mathbb{E}[x_0|x_t]
$$

并由 denoiser 推导 score。这个做法让模型在每个时间步看到的 noisy structure 仍保留蛋白质链的宏观统计，降低了生成难度。

##### 随机图神经网络与几何求解器

完整蛋白复合物可能包含几千个 residues。如果像 AlphaFold 类模型那样维护全连接 pair 表征，复杂度至少 \(O(N^2)\)，对大体系不友好。Chroma 使用 random graph neural network：每个残基只连接局部邻居和一批随机长程边，连接统计借鉴 fast N-body / Barnes-Hut 思想，使模型能用 \(O(N)\) 或 \(O(N\log N)\) 边传递长程信息。

骨架网络不是直接一步输出所有原子坐标，而是预测带置信度的 inter-residue geometries，再通过 equivariant geometry solver 求一个全局一致结构。这样做的好处是把“神经网络预测局部/成对几何”和“几何层合成三维坐标”分离，既保留等变性，又能把噪声结构逐步合成为一致 backbone。

得到 backbone 后，Chroma 的 design network 在该 backbone 条件下生成序列与侧链构象。可把联合模型写成：

$$
p_\theta(x,s,\chi)
=
p_\theta(x)\,p_\theta(s,\chi|x)
$$

其中 \(x\) 是 backbone，\(s\) 是 amino-acid sequence，\(\chi\) 是侧链构象。这个分解也解释了为什么 Chroma 不只是 backbone generator，而是 all-atom protein complex generator。

##### Conditioner 框架

Chroma 的 conditioner 是一个可组合模块：输入当前结构、能量和 diffusion time，输出更新后的结构或能量项。几类典型 conditioner 包括：

- **SymmetryConditioner**：把复合物约束到 \(C_n,D_n,T,O,I\) 等对称群，并在采样过程中同步等价链/亚基
- **Substructure / Motif conditioner**：固定或 graft 指定子结构，让模型围绕功能片段外填充
- **Distance / contact conditioner**：对特定原子或残基对施加距离势
- **Shape conditioner**：让生成结构贴合点云或目标外形
- **Semantic conditioner**：用蛋白分类器或文本 annotation predictor 给出梯度，反向优化想要的类别/语义描述

这些 conditioner 可以同时使用，因为它们本质上都修改同一个时间相关 posterior。硬约束通常通过投影或状态更新实现，软约束通过能量梯度实现。

> 💡 **关键直觉**：Chroma 不把“设计目标”固定进模型权重，而是把目标变成采样时的能量函数。这样同一个 generative prior 可以服务许多不同设计任务。

##### 低温采样

Chroma 还引入低温采样，用更强的 prior score 把样本推向高 likelihood 区域。概念上可理解为：

$$
\nabla_x\log p_t^{(\lambda)}(x)
\approx
\lambda \nabla_x\log p_t(x),\qquad \lambda>1
$$

其中 \(\lambda\) 是 inverse temperature。较高 \(\lambda\) 会减少熵和多样性，但提升样本的局部质量、模型 likelihood 和后续 refolding 成功率。论文和官方 GitHub API 中也暴露了 `inverse_temperature`、`langevin_factor` 等采样超参数，用于在探索和质量之间调节。

##### 实验与意义

Chroma 论文报告了大规模无条件采样和条件采样：生成 100,000 个单链样本与 20,000 个复合物样本用于分析，并对 310 个蛋白进行实验表征。结果显示，样本具有天然蛋白相似的二级结构、contact order、radius-of-gyration 和 tertiary motif 使用模式；许多样本与 PDB 最近邻 TM-score 较低，说明不是简单记忆训练集。

实验上，Chroma 设计的多个蛋白可在 E. coli 中表达并显示折叠/热稳定性；两个晶体结构与生成模型约 1.0 Å backbone RMSD。更重要的是，Chroma 展示了“从生成可行结构”转向“编程分子性质”的工作方式：用户可以先声明对称性、形状、子结构或语义目标，模型在 protein prior 下自动补全可设计的结构与序列。

#### 🧪 练习题
```yaml
question: "Chroma 的 diffusion-conditioner 框架主要解决什么问题？"
options:
  - "把所有蛋白质都限制为单链 α 螺旋"
  - "在不重新训练生成模型的情况下，把对称性、子结构、形状和语义等约束组合到采样过程"
  - "用独立高斯噪声替代聚合物相关噪声"
  - "只生成 backbone，不生成序列和侧链"
answer: 1
explain: "Conditioner 将用户目标表示为 hard constraints 或 soft energy/likelihood，在每个扩散时间步与 protein prior 组合成 posterior，因此可以推理时组合新条件而无需重训模型。"
```

### SaProt

```yaml
id: saprot
num: 17
name: SaProt
full_name: SaProt (Structure-aware Protein Language Model)
year: '2024.01'
org: Westlake University
parent: —
paper_url: https://openreview.net/forum?id=1c42513b8895ab11fbbb5b7e8e6b6b02
project_url: ''
category: protein_design
motivation: 结构感知词汇增强语言模型
```

#### 📝 一句话总结
SaProt 提出 structure-aware vocabulary，把氨基酸 token 与 Foldseek 3Di 结构 token 合成为同一位置的结构感知 token，使标准 BERT/ESM 式蛋白语言模型在预训练阶段直接看到序列与三维局部结构信息。它用约 4000 万条蛋白序列-结构数据预训练通用 PLM，在突变效应、稳定性、PPI、金属结合、EC/GO 与定位等 10 类下游任务上系统优于只看序列的基线。

#### 🎯 核心要点
- **结构感知词表**：每个残基位置由氨基酸 \(a_i\) 与 Foldseek 3Di 结构状态 \(s_i\) 组合为 \(z_i=(a_i,s_i)\)，例如 `Md`、`Kp` 这类 AA+3Di token
- **一维化结构输入**：先用 Foldseek 将 3D 坐标编码为与残基等长的结构字母序列，再与氨基酸序列逐位笛卡尔积组合，避免在主干模型中加入复杂几何图网络
- **沿用 MLM 预训练范式**：在结构感知序列上做 masked language modeling，模型主体可复用 ESM/BERT 类 Transformer 编码器
- **大规模结构预训练**：官方论文/项目说明使用约 4000 万条 AlphaFold2 结构；650M 版本还提供 AF2 与 PDB 阶段化训练权重
- **下游任务覆盖广**：评估包括 ClinVar、ProteinGym、Thermostability、HumanPPI、Metal Ion Binding、EC、GO-MF/BP/CC、DeepLoc 等蛋白级和残基级任务
- **结构质量可控**：对 AlphaFold 低置信度区域可用 `#` 等未知/掩码结构 token 处理，避免把低可靠结构强行注入模型
- **工程优势**：把结构信息转为 token 后，推理和微调接口接近普通 PLM，可直接用于 embedding、突变效应预测、逆折叠和监督微调

#### 🔬 深入细节
##### 模型框架图

![SaProt structure-aware vocabulary](https://github.com/westlake-repl/SaProt/raw/main/figures/pipeline.png)
*图：SaProt 官方仓库给出的 pipeline。左侧用 Foldseek 将每个残基的三维环境编码为 3Di 结构状态，中间构造 AA+3Di 的结构感知词表，右侧使用 BERT/ESM 式 Transformer 做 MLM 预训练与任务预测。*

论文主入口在 OpenReview（ICLR 2024 spotlight），官方实现和模型说明在 `https://github.com/westlake-repl/SaProt`；如果原始任务中的 OpenReview 短链不可访问，可用官方仓库链接的 OpenReview 页面和 bioRxiv 版本交叉核对方法。

##### 算法伪代码

```python
# SaProt 预训练数据构造与 MLM 训练伪代码
def build_structure_aware_sequence(protein):
    aa_seq = protein.sequence                 # A_1, ..., A_L
    structure = protein.coords_or_af2_model   # backbone / full-atom structure

    # Foldseek 3Di: 把每个残基的局部三维几何映射为离散结构字母
    struct_seq = foldseek_3di(structure)      # s_1, ..., s_L

    tokens = []
    for aa, st, conf in zip(aa_seq, struct_seq, protein.confidence):
        if conf is not None and conf < 70:
            st = "#"                          # 低置信度结构区域用未知结构状态
        tokens.append(combine(aa, st))        # 例如 "Md"、"Kp"
    return tokens


def pretrain_saprot(dataset, model):
    for protein in dataset:
        z = build_structure_aware_sequence(protein)
        mask_positions = sample_mask_positions(z)
        z_masked = replace_with_mask_tokens(z, mask_positions)

        logits = model(z_masked)              # Transformer encoder
        loss = 0.0
        for i in mask_positions:
            loss += cross_entropy(logits[i], target=z[i])
        optimizer.step(loss)
```

##### 关键公式与训练目标

SaProt 的核心不是发明新的 Transformer，而是改变输入 token 的语义。给定长度为 \(L\) 的蛋白，氨基酸序列为 \(\mathbf{a}=(a_1,\ldots,a_L)\)，Foldseek 结构字母序列为 \(\mathbf{s}=(s_1,\ldots,s_L)\)，结构感知 token 序列定义为：

$$
z_i = a_i \otimes s_i,\quad \mathbf{z}=(z_1,\ldots,z_L)
$$

其中 \(\otimes\) 表示把同一残基位置的 residue token 与 structure token 合成为一个新词表元素。若残基结构未知或预测置信度低，可令 \(s_i=\#\)，让模型显式知道该位置没有可靠结构信息。

预训练仍采用 masked language modeling：

$$
\mathcal{L}_{\text{MLM}}
= - \sum_{i\in \mathcal{M}}
\log p_\theta(z_i \mid \mathbf{z}_{\setminus \mathcal{M}})
$$

直觉上，模型在恢复被遮蔽 token 时必须同时解释“这个位置应是什么氨基酸”和“它处在什么局部结构环境”。这比只预测氨基酸更强，因为同一个氨基酸在螺旋、折叠核心、表面 loop 或结合界面中的统计规律不同。

##### 方法机制拆解

传统蛋白语言模型只把蛋白看成 20 种氨基酸构成的序列，优势是数据量大、训练稳定、可迁移，但缺点是三维结构只以隐式形式存在于进化统计中。SaProt 的出发点是：AlphaFold2 之后已经有海量预测结构，若能把结构转成离散 token，就可以把结构信息直接并入语言模型预训练，而不必为每个任务重新搭建 SE(3) 网络或图神经网络。

Foldseek 的 3Di 编码在这里起到“结构分词器”的作用。它把每个残基周围的局部几何关系压缩成一个离散状态，使蛋白结构变成与原序列等长的一维结构序列。SaProt 随后取氨基酸词表与结构词表的笛卡尔积，构成结构感知词表。这样做的关键好处是：Transformer 的输入长度不变，位置对齐天然成立，注意力层可直接学习“某个序列片段在某种结构环境中”的上下文依赖。

与把几何距离矩阵加入 attention bias 的方法相比，SaProt 的结构注入更轻量：结构信息在 embedding 层就进入模型，不需要在每层维护 \(L\times L\) 的几何 pair 表征。与纯 GNN 结构编码器相比，它更容易继承蛋白语言模型的大规模预训练经验，也更容易接入 Hugging Face/ESM 生态。代价是 3Di token 是离散摘要，不能保留完整原子坐标，因此它更适合作为通用表征模型，而不是替代精细结构预测或分子动力学。

在下游使用时，SaProt 可按任务接不同 head。蛋白级任务通常取 `[CLS]` 或平均池化表示，残基级任务直接使用每个位置的 hidden state；突变效应预测可比较野生型与突变型结构感知序列的 masked likelihood 或 pseudo-log-likelihood：

$$
\Delta S
= \log p_\theta(z_i^{\text{mut}}\mid \mathbf{z}_{\setminus i})
- \log p_\theta(z_i^{\text{wt}}\mid \mathbf{z}_{\setminus i})
$$

若突变导致局部结构未知，可以只替换氨基酸并保留或屏蔽结构 token；这也是 SaProt 在实际使用中需要注意的地方：高质量结构输入通常带来收益，但低质量结构会把错误几何先验注入模型。

> 💡 关键：SaProt 的创新在于把“结构是否参与语言建模”提前到词表层解决。模型不需要知道三维坐标的全部细节，却能在预训练中持续看到结构状态，从而学习更接近功能与稳定性的蛋白表征。

#### 🧪 练习题
```yaml
question: "SaProt 的 structure-aware vocabulary 主要解决了什么问题？"
options:
  - "把蛋白质序列长度压缩到原来的十分之一"
  - "在不改变 Transformer 主体范式的情况下，把每个残基的局部结构状态并入语言模型 token"
  - "用扩散模型直接生成蛋白质三维坐标"
  - "用监督标签替代 masked language modeling"
answer: 1
explain: "SaProt 先用 Foldseek 得到与残基等长的 3Di 结构序列，再把氨基酸和结构状态组合成 AA+3Di token，使标准 MLM 训练直接利用结构信息。"
```

### RFdiffusion3

```yaml
id: rfdiffusion3
num: 18
name: RFdiffusion3
full_name: RFdiffusion3 (RFdiffusion All-Atom)
year: '2025.12'
org: Baker Lab
parent: rfdiffusion
paper_url: https://www.bakerlab.org/2025/12/03/rfdiffusion3-now-available/
project_url: ''
category: protein_design
motivation: 全原子精度蛋白质设计
```

#### 📝 一句话总结
RFdiffusion3 将 RFdiffusion 从残基/骨架级生成推进到全原子级生成，把蛋白质骨架、侧链以及配体、DNA/RNA 等非蛋白原子放在同一个扩散框架中建模。它用原子级条件、轻量化 Transformer U-Net 和 classifier-free guidance，在更低计算成本下完成小分子结合、DNA 结合、酶活性位点 scaffolding 与对称蛋白设计。

#### 🎯 核心要点
- **全原子扩散单位**：每个残基统一表示为 4 个 backbone atom + 10 个 side-chain atom；较小侧链用放在 \(C_\beta\) 的 virtual atoms 补齐
- **统一生物分子上下文**：可在配体、核酸、蛋白结合伙伴、催化基团等任意非蛋白原子环境中生成新蛋白
- **轻量架构**：采用 downsampling → sparse transformer → upsampling 的 U-Net 式扩散模块，把 AF3 类 Pairformer 从 48 层缩到 2 层，最终约 168M 可训练参数
- **原子-残基双尺度交换**：通过稀疏 attention 和 cross-attention 在 atom features 与 token/residue features 间上下采样，只让几何邻近的原子/残基高效交互
- **丰富约束条件**：支持固定 motif 坐标、未编号 catalytic motif、氢键 donor/acceptor、ligand atom burial/RASA、目标相对质心、蛋白-DNA 共生成和对称噪声
- **classifier-free guidance**：每步同时做有条件和无条件前向，通过加权组合增强复杂条件满足率
- **训练数据与流程**：在 PDB 复合物、蛋白-小分子、蛋白-DNA、功能 motif scaffolding 和高质量 AF2 distillation 结构上训练，PDB 数据覆盖至 2024 年 12 月
- **结果亮点**：典型长度上比 RFdiffusion2 约快 10 倍；无条件生成 98% 设计可被 AF3 预测回 1.5Å 内；AME enzyme benchmark 上 37/41 个案例优于 RFD2；湿实验中 5 个 DNA binder 测到 1 个低微摩尔结合，190 个 cysteine hydrolase 设计测到 35 个多周转催化剂

#### 🔬 深入细节
##### 来源与框架图

![RFdiffusion3 all-atom design overview](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/ff5c/12642843/0eefa14d2742/nihpp-2025.09.18.676967v2-f0001.jpg)
*图：RFdiffusion3 论文 Figure 1。图中展示 100 步全原子扩散轨迹、生物分子相互作用生成、模型架构以及相对 RFdiffusion 前代的推理速度。*

任务给出的 `paper_url` 是 IPD/Baker Lab 新闻页；方法级细节可追溯到 bioRxiv/PMC 全文 `https://pmc.ncbi.nlm.nih.gov/articles/PMC12458353/` 和 RosettaCommons Foundry 官方文档 `https://github.com/RosettaCommons/foundry/tree/production/models/rfd3`。下面解读基于这些可访问来源。

##### 推理伪代码

```python
# RFdiffusion3 条件生成伪代码
def rfd3_design(condition, length, num_steps=100, guidance_w=1.5):
    """
    condition: 可包含固定配体/DNA坐标、motif原子、H-bond donor/acceptor、
               RASA burial 标签、COM 约束、对称约束等
    length: 待生成蛋白残基数
    """
    # 1. 初始化全原子噪声：每个残基 14 个原子坐标
    x_t = sample_atom14_noise(length)

    # 2. 若有固定目标分子或 motif，把其坐标作为条件放入同一原子环境
    context = build_atomic_context(condition)

    for t in reversed(range(1, num_steps + 1)):
        # 有条件预测：模型看到配体/DNA/motif/氢键/RASA等条件
        x0_cond = model_denoise(x_t, t, context=context)

        # 无条件预测：同一步去掉条件，用于 classifier-free guidance
        x0_uncond = model_denoise(x_t, t, context=None)

        # guidance 加强条件遵循
        x0_hat = x0_uncond + guidance_w * (x0_cond - x0_uncond)

        # 采样下一步更干净的全原子坐标
        x_t = diffusion_update(x_t, x0_hat, t)

        # 可选：对称设计时，对噪声或输出施加 Cn/Dn 对称变换
        x_t = enforce_symmetry_if_needed(x_t, condition)

    # 3. RFD3 输出 backbone + side-chain atom14 坐标；序列通常再由 MPNN/LigandMPNN 拟合
    backbone_and_sidechains = x_t
    sequence = ligand_mpnn_or_protein_mpnn(backbone_and_sidechains, context)

    # 4. 用 AF3/RF3/Chai/Rosetta 等筛选复折叠、界面和活性位点几何
    return filter_designs(backbone_and_sidechains, sequence, condition)
```

##### 扩散目标与 guidance 公式

RFD3 的训练样本来自天然或预测结构，先对真实全原子坐标 \(\mathbf{x}_0\) 加噪得到 \(\mathbf{x}_t\)，再让网络预测去噪坐标或等价的 coordinate update。简化写法如下：

$$
\mathbf{x}_t = \alpha_t \mathbf{x}_0 + \sigma_t \boldsymbol{\epsilon},
\quad \boldsymbol{\epsilon}\sim \mathcal{N}(0,I)
$$

$$
\mathcal{L}_{\text{coord}}
= \sum_{i\in \mathcal{A}} w_i(t)\,
\left\|\hat{\mathbf{x}}_{0,i}(\mathbf{x}_t,t,c)-\mathbf{x}_{0,i}\right\|_2^2
$$

其中 \(\mathcal{A}\) 是参与生成/预测的 atom14 原子集合，\(c\) 是条件信息。条件可非常细粒度：某个 ligand atom 需要被埋藏、某个原子应接受氢键、某段 DNA 的形状可以固定或与蛋白一起采样、某个活性位点 motif 只有部分原子固定而不指定序列位置。

classifier-free guidance 的去噪组合可写成：

$$
\hat{\mathbf{x}}_0^{\text{guided}}
= \hat{\mathbf{x}}_0^{\emptyset}
+ \omega\left(\hat{\mathbf{x}}_0^{c}-\hat{\mathbf{x}}_0^{\emptyset}\right)
$$

这里 \(\hat{\mathbf{x}}_0^c\) 是有条件预测，\(\hat{\mathbf{x}}_0^\emptyset\) 是无条件预测，\(\omega\) 控制“贴合条件”的强度。论文报告氢键 donor/acceptor 条件在小分子 binder 中把目标相互作用比例从 26.67% 提升到 32.67%，再配合 guidance 到 36.67%。

##### 为什么要从残基扩散改成原子扩散

RFdiffusion1 的强项是生成蛋白骨架和蛋白-蛋白 binder，但设计小分子结合或酶活性位点时，真正决定功能的是具体原子的距离、角度、电性和氢键方向。RFdiffusion2 引入了少量“tip atom”来约束催化/配体关键原子，但主扩散过程仍是残基级，因此它难以同时生成更多侧链相互作用，也不方便表达“这个 ligand atom 要被埋藏”“这个碱基边缘要接收氢键”这类全局原子条件。

RFdiffusion3 的 atom14 表示把所有残基都补齐到相同原子数，使网络可以在固定张量形状下直接扩散 backbone 与 sidechain。对 tryptophan 这类最大侧链保留真实 10 个侧链原子；较小侧链的多余槽位放在 \(C_\beta\) 附近作为 virtual atom。这个设计既保留了全原子控制，又避免了不同氨基酸原子数不同导致的模型结构复杂化。由于序列在设计时可未知，网络最后输出的侧链几何也会暗示适合哪些氨基酸，后续再由 ProteinMPNN 或 LigandMPNN 拟合序列。

##### 架构与条件输入

RFD3 借鉴 AF3 diffusion module 的 U-Net 思想，但为“设计”而不是“给定序列预测结构”做了大幅瘦身。输入不是完整天然序列，而是长度、目标分子、motif、氢键、RASA、COM 等设计条件，所以不需要昂贵的 48 层 Pairformer。论文将条件处理模块缩到 2 层，并去掉 triangle multiplicative/triangle attention 等高成本更新，最终得到约 168M 参数的网络。

网络内部有两个尺度：atom track 负责细粒度坐标和局部相互作用，token/residue track 负责残基层级的全局结构组织。稀疏 attention 只在噪声态下几何邻近的原子/残基之间通信，避免全连接原子 attention 的平方级成本；cross-attention 用于把 atom features 聚合到 token features，再从 token features 调制回 atom features。这是 RFD3 能同时保持全原子表达力和较快推理速度的关键。

##### 训练与筛选流程

训练时，RFD3 在 PDB 中的蛋白-蛋白、蛋白-小分子、蛋白-DNA/RNA 复合物、功能 motif scaffolding 任务，以及 AF2 高质量 distillation 结构上构造不同“设计问题”。每个训练样本会随机选择哪些信息固定、哪些信息遮蔽、哪些原子作为 motif 或 tip atom、哪些坐标/序列/索引条件可见，从而迫使模型学会在多种约束组合下复原全原子结构。

推理后通常不是直接接受 RFD3 单次输出，而是进入设计管线：RFD3 采样 backbone + sidechain 几何，ProteinMPNN/LigandMPNN 生成序列，AF3/RF3/Chai 验证设计是否能复折叠并保持目标界面，Rosetta 或几何规则进一步筛选能量与活性位点。论文中的成功标准也多用 AF3/Chai 的 RMSD、pAE、ipTM 和 motif RMSD 组合定义。

##### 结果与边界

论文报告 RFD3 在多类 in silico 任务上优于前代：无条件长度 100-200 的设计中，98% 至少有一个 ProteinMPNN 序列被 AF3 预测到 1.5Å 内；DNA binder 任务平均 pass rate 为单体 8.67%、二聚体 6.67%；小分子 binder 在 FAD、SAM、IAI、OQO 四个 benchmark 上均优于 RFdiffusionAA；酶 AME benchmark 中 37/41 个案例优于 RFD2，且超过 4 个 residue islands 的困难案例中 passing design 比例约为 15% vs RFD2 的 4%。

湿实验部分展示了方法可落地但仍需筛选。DNA 结合蛋白只测试 5 个设计，其中 1 个通过 yeast surface display 测到 \(EC_{50}=5.89\pm2.15\,\mu M\)。cysteine hydrolase 任务筛选 190 个设计，35 个表现出 multi-turnover catalysis，最佳 \(k_{\text{cat}}/K_m=3557\,M^{-1}s^{-1}\)。这些结果说明全原子条件能显著提高复杂功能设计的命中率，但当前仍是“生成大量候选 + 严格计算筛选 + 实验验证”的工程流程，而不是一次生成即保证功能。

> 💡 关键：RFD3 的突破不是单纯“更精细的坐标输出”，而是让设计者可以把功能约束写到原子层。酶、核酸结合和小分子结合的关键相互作用终于和扩散模型的基本建模单位一致了。

#### 🧪 练习题
```yaml
question: "RFdiffusion3 相比 RFdiffusion2 在方法上的核心变化是什么？"
options:
  - "只保留 Cα 原子以提升速度"
  - "把扩散基本单位从残基/少量 tip atom 推进到 backbone 与 side-chain 的 atom14 全原子表示"
  - "取消所有条件输入，改为无条件蛋白生成"
  - "只使用 ProteinMPNN，不再使用扩散模型"
answer: 1
explain: "RFD3 直接扩散每个残基的 4 个骨架原子和 10 个侧链原子，配合固定 motif、氢键、RASA、DNA/ligand 等原子级条件，因此更适合设计酶活性位点和非蛋白分子相互作用。"
```

### DNABERT

```yaml
id: dnabert
num: 19
name: DNABERT
full_name: DNABERT (DNABERT)
year: '2021.02'
org: 周德中团队
parent: —
paper_url: https://academic.oup.com/bioinformatics/article/37/15/2112/6128680
project_url: ''
category: genomics
motivation: BERT架构应用于DNA k-mer表征
```

#### 📝 一句话总结
DNABERT 将 DNA 序列切分为重叠 k-mer，把基因组非编码序列当作“语言”输入 BERT 编码器，通过 masked language modeling 从人类基因组中学习可迁移表征。它用同一个预训练模型经少量标注数据微调后完成 promoter、splice site、TF binding site、motif 发现、功能变异打分和跨物种 mouse ENCODE 任务。

#### 🎯 核心要点
- **DNA 语言建模**：把 A/C/G/T 序列转为重叠 k-mer “词”，例如 `ACGTTA` 会生成 `ACG`、`CGT`、`GTT`、`TTA`
- **DNABERT-k 词表**：对固定 \(k\) 使用 \(4^k\) 个 k-mer token 加 `[CLS]`、`[PAD]`、`[UNK]`、`[SEP]`、`[MASK]` 等特殊 token
- **BERT 编码器**：输入 k-mer embedding、position embedding 和 token type embedding，经 12 个 Transformer block 建模双向上下文
- **预训练-微调范式**：先在人类参考基因组无监督 MLM 预训练，再在 promoter、splice、TFBS 等任务上加分类 head 微调
- **长序列处理**：标准 BERT 长度受 512 token 限制，论文提出 DNABERT-XL 思路，把长序列切成片段后拼接表示以处理更长调控区域
- **可解释性**：利用 attention/重要性分数映射到 nucleotide-level，发现保守 motif，并为 SNP、插入、删除等功能变异生成差异分数和 log odds ratio
- **数据稀缺优势**：预训练模型在小样本标注任务上收敛更快、性能高于随机初始化 Transformer 以及 CNN/CNN-RNN 基线
- **跨物种迁移**：人类基因组预训练后可微调用于 mouse ENCODE ChIP-seq 数据，说明模型捕获了部分跨物种共享的 DNA 语义模式

#### 🔬 深入细节
##### 模型架构图

![DNABERT architecture](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/37/15/10.1093_bioinformatics_btab083/6/m_btab083f1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=KxFm9-mA~RULzB878tneeDGzbzUiMGY6gpZE2f-BH-f9qNCeqQ2ZGARfRtgUWMo9xk6ZsSZ0a8ikaJL8lxqyDpoPe3Jqoe3EK97C4zYhfOpmKlfWcqTKNSEJAqvn7RoFyVOv3FrWG0e4PjUBSF6u4RkoY8xOGD6NU79S4boauiqjaEItH1gIU5w2P0xKcpiJy43CMDykZ~d9oF8t-Gu4o5i4XcsDktbABo91dacQFGRXLefamj-gjhQKqqPUeHs2fWODZwmSwY9NlD6GBKWtyXkSNWWVqeyjZbM7IsedLELOgJ1s4jv4S0aHlzz2EBvlwlYmB~RoDwG2hPZUpyT7kw__)
*图：DNABERT 论文 Figure 1。左侧比较 RNN、CNN 与 Transformer 的上下文建模方式；右侧展示 k-mer token、`[CLS]`、`[SEP]`、`[MASK]` 进入 12 层 Transformer 后用于序列级分类和 token 级 MLM。*

论文全文可通过 Oxford Academic 页面访问，官方代码和模型下载说明在 `https://github.com/jerryji1993/DNABERT`；官方仓库后来也把过期模型链接迁移到了 Hugging Face，但不改变 DNABERT 原始方法。

##### 算法伪代码

```python
# DNABERT 预训练与微调伪代码
def seq_to_kmers(seq, k):
    return [seq[i:i+k] for i in range(len(seq) - k + 1)]


def pretrain_dnabert(genome_windows, k, model):
    vocab = all_possible_kmers(k) + ["[CLS]", "[PAD]", "[UNK]", "[SEP]", "[MASK]"]

    for seq in genome_windows:
        tokens = ["[CLS]"] + seq_to_kmers(seq, k)[:510] + ["[SEP]"]

        # 对重叠 k-mer 做 masked language modeling
        masked_tokens, masked_pos, labels = mask_kmer_tokens(tokens)

        hidden = model(masked_tokens)          # BERT encoder
        loss = 0.0
        for pos, label in zip(masked_pos, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), label)
        optimizer.step(loss)


def finetune_for_regulatory_task(seq, k, pretrained_model, classifier):
    tokens = ["[CLS]"] + seq_to_kmers(seq, k)[:510] + ["[SEP]"]
    hidden = pretrained_model(tokens)
    cls_repr = hidden[0]
    return classifier(cls_repr)                # promoter / splice / TFBS 等分类
```

##### k-mer 表示与自注意力计算

DNA 字母表只有 4 个碱基，若直接逐碱基建模，单个 token 信息量过低；若用固定长度 k-mer，则 token 同时携带局部 motif 信息。DNABERT-k 的词表大小为：

$$
|\mathcal{V}_k| = 4^k + 5
$$

其中 5 是 `[CLS]`、`[PAD]`、`[UNK]`、`[SEP]`、`[MASK]`。给定 DNA 序列 \(x_1,\ldots,x_N\)，重叠 k-mer token 为：

$$
t_i = x_i x_{i+1}\cdots x_{i+k-1},\quad i=1,\ldots,N-k+1
$$

Transformer 层通过多头自注意力让任意两个 k-mer 直接交互：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

这正对应论文动机：CNN 主要看局部窗口，RNN 虽可建模长程依赖但顺序计算慢且有梯度瓶颈；Transformer 可以让 promoter、enhancer、TF motif 等远距离上下文在同一层中互相注意。

##### MLM 损失与重叠 k-mer 的特殊性

DNABERT 的预训练目标仍是 BERT 的 masked language modeling：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}\log p_\theta(t_i\mid \mathbf{t}_{\setminus\mathcal{M}})
$$

但 DNA k-mer 与自然语言词不同：相邻 token 高度重叠。例如 6-mer `ACGTTA` 和下一个 6-mer `CGTTAG` 共享 5 个碱基。如果只随机 mask 单个 k-mer，模型可能从相邻 k-mer 直接“抄答案”。因此 DNABERT 的实现会按 k-mer 格式处理 mask，并在官方预训练脚本中使用较低的 `mlm_probability` 示例值来缓解重叠泄漏；理解模型时要把“预测 k-mer”看作恢复一段局部 DNA 片段，而不是预测完全独立的词。

##### 为什么 BERT 适合非编码 DNA

非编码 DNA 的难点类似自然语言的多义性与长程依赖：同一个短 motif 在不同上下游上下文、不同组合间距、不同 cell type 中可能对应不同调控作用；多个相距较远的 cis-regulatory elements 也可能协同决定启动子或增强子活性。传统 one-hot + CNN 能很好识别局部 motif，但卷积核大小限制了长程组合建模；RNN/LSTM 理论上能处理长距离依赖，但长序列训练效率和梯度传播都不理想。

DNABERT 的 `[CLS]` 表示适合序列级任务，例如 promoter 是否存在、splice site 类型或某个 TF 是否结合；每个 token 的 hidden state 与 attention 分数又可映射回 nucleotide-level 区域，用于 motif 可视化。论文展示 DNABERT 能在 promoter、splice site、690 个 ENCODE TF binding 数据集等任务上与或超过专用 CNN/RNN 工具，并且在小样本设置中受益更明显。

##### 微调、解释与变异打分

微调时，DNABERT 基本保持 BERT 主体不变，只替换任务 head。对二分类或多分类任务，常用 `[CLS]` hidden state：

$$
\hat{y} = \text{softmax}(W h_{\text{[CLS]}} + b)
$$

对功能变异分析，可以比较野生型序列与突变序列的模型输出。若 \(f_\theta(x)\) 是某任务中预测为功能阳性的 logit 或概率，则突变差异分数可写为：

$$
\Delta_{\text{mut}} = f_\theta(x^{\text{mut}}) - f_\theta(x^{\text{wt}})
$$

也可以计算 log odds ratio：

$$
\text{logOR}
= \log\frac{p_\theta(y=1\mid x^{\text{mut}})}{1-p_\theta(y=1\mid x^{\text{mut}})}
- \log\frac{p_\theta(y=1\mid x^{\text{wt}})}{1-p_\theta(y=1\mid x^{\text{wt}})}
$$

论文用 mutation map 展示 DNABERT 在 CTCF、YY1 等结合位点附近给出高注意力，并能识别破坏 binding site 的 deletion/SNV。这个解释性是 DNABERT 对基因组学任务的重要工程价值：它不仅输出分类结果，还能提示哪段序列或哪处变异驱动预测。

##### 与后续模型的关系

DNABERT 是把 NLP 预训练正式引入 DNA 调控序列建模的代表性早期模型，但它也有局限：固定 k-mer 会让词表随 \(k\) 指数增长，重叠 token 带来信息泄漏风险，512 token 限制对超长调控区域不友好，且原始模型主要在人类基因组上预训练。后续 DNABERT-2 用 BPE、ALiBi 和多物种基因组进一步改进效率与泛化；不过原始 DNABERT 的核心思想仍然清晰：先在无标注基因组上学通用 DNA 语义，再把表征迁移到多个调控预测任务。

> 💡 关键：DNABERT 的价值不在于把 BERT 名字搬到 DNA 上，而在于用 k-mer token 和 MLM 把“局部 motif + 长程上下文 + 低标注迁移”统一进同一个预训练框架。

#### 🧪 练习题
```yaml
question: "DNABERT 为什么使用重叠 k-mer 而不是只用单个碱基作为 token？"
options:
  - "k-mer 能把局部 motif 信息编码进 token，同时仍可通过 Transformer 建模长程上下文"
  - "k-mer 可以完全消除 512 token 长度限制"
  - "k-mer 让模型不再需要 masked language modeling"
  - "k-mer 只能用于蛋白质序列，不能用于 DNA"
answer: 0
explain: "单碱基 token 信息量太低；重叠 k-mer 直接表示局部 DNA 片段或 motif，再由自注意力学习不同片段之间的远距离依赖。"
```

### Enformer

```yaml
id: enformer
num: 20
name: Enformer
full_name: Enformer (Enformer)
year: '2021.10'
org: Google DeepMind
parent: —
paper_url: https://www.nature.com/articles/s41592-021-01252-x
project_url: ''
category: genomics
motivation: Transformer捕捉长程基因相互作用
```

#### 📝 一句话总结
Enformer 将卷积序列编码器与 Transformer 自注意力结合，从约 200 kb DNA 输入直接预测人和小鼠的表达、染色质开放性、组蛋白修饰和转录因子结合轨道。它解决了 Basenji2/ExPecto 等卷积模型长程信息流不足的问题，把可利用的调控距离从约 20 kb 扩展到约 100 kb，并改进了 enhancer-promoter 联系和非编码变异效应预测。

#### 🎯 核心要点
- **长输入多任务预测**：输入 196,608 bp one-hot DNA，输出 128 bp 分辨率的基因组轨道；人类头预测 5,313 个 tracks，小鼠头预测 1,643 个 tracks
- **三段式架构**：7 个卷积/池化块压缩序列长度，11 个 Transformer block 建模长程交互，裁剪中心区域后接物种特异输出头
- **更大感受野**：用全局自注意力替代 Basenji2 的 dilated convolution，使 TSS 附近预测可以直接整合远端 enhancer、insulator 和 TAD boundary 信息
- **自定义相对位置编码**：使用指数、gamma、central mask 等相对位置基函数，并加入方向性项区分 TSS 上游/下游
- **Poisson 负对数似然训练**：把 CAGE、DNase/ATAC、ChIP-histone、ChIP-TF 等 read-count tracks 作为多任务计数预测目标
- **序列级变异打分**：分别前向计算 reference allele 与 alternative allele 的输出差异，得到带方向的 regulatory effect score
- **解释能力**：attention 权重和 gradient × input 能定位 CRISPRi 验证 enhancer，并观察到跨 TAD boundary 注意力降低的模式
- **工程发布**：论文页面、DeepMind 代码、TF-Hub 预训练模型和示例 notebook 均公开，便于对任意 DNA 序列做表达和变异效应预测

#### 🔬 深入细节
##### 模型架构图与可访问来源

![Enformer model architecture](https://media.springernature.com/full/springer-static/esm/art%3A10.1038%2Fs41592-021-01252-x/MediaObjects/41592_2021_1252_Fig5_ESM.jpg)
*图：Enformer Extended Data Fig. 1。左侧是 Enformer 主架构，中间是用 dilated convolution 替换 Transformer 的消融版本，右侧是 Basenji2；图中标出了卷积塔、Transformer block、裁剪层和人/鼠两个输出头。*

可访问来源：论文页面 `https://www.nature.com/articles/s41592-021-01252-x`，图像直链来自 Springer Nature；官方代码在 `https://github.com/deepmind/deepmind-research/tree/master/enformer`，预训练模型在 `https://tfhub.dev/deepmind/enformer/1`。

##### 算法伪代码

```python
# Enformer 训练与变异效应预测伪代码
def enformer_forward(one_hot_dna):
    # one_hot_dna: [196608, 4], A/C/G/T/N one-hot
    x = one_hot_dna

    for block in range(7):
        x = conv_block(x)                 # motif/local pattern extraction
        x = attention_pool(x)             # downsample to 128 bp bins

    # x length becomes 1536 positions, each roughly summarizes 128 bp
    for block in range(11):
        x = transformer_block(
            x,
            relative_position_basis=["exponential", "gamma", "central_mask"],
        )

    x = crop(x, left=320, right=320)       # keep 896 central bins
    human_tracks = pointwise_head_human(x) # [896, 5313], softplus counts
    mouse_tracks = pointwise_head_mouse(x) # [896, 1643]
    return human_tracks, mouse_tracks


def train_enformer(batch):
    seq, organism, observed_tracks = batch
    human_pred, mouse_pred = enformer_forward(seq)
    pred = human_pred if organism == "human" else mouse_pred
    loss = poisson_negative_log_likelihood(pred, observed_tracks)
    optimizer.step(loss)


def score_variant(reference_seq, alternative_seq, target_track, target_bins):
    y_ref = enformer_forward(reference_seq)[0][target_bins, target_track]
    y_alt = enformer_forward(alternative_seq)[0][target_bins, target_track]
    # signed effect: positive means alternative allele increases predicted activity
    return y_alt.sum() - y_ref.sum()
```

##### 输入、输出与为什么要先卷积再 Transformer

Enformer 的输入是长度 \(196{,}608\) bp 的 DNA one-hot 序列：

$$
x_t \in \{[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1],[0,0,0,0]\}
$$

其中最后一种表示未知碱基 \(N\)。直接对 196k 个碱基做全局注意力计算不可行，所以模型先用 7 个卷积块和 pooling 把序列压缩到 1,536 个位置，每个位置约对应 128 bp。这个尺度接近许多调控元件的常用 bin size，既保留局部 motif 信息，又把 Transformer 的序列长度降到可训练范围。

Transformer 之后只对中心 896 个 bin 计算损失，对应 \(896 \times 128=114{,}688\) bp。两侧各裁剪 320 个 bin 的原因是边缘位置只能看到单侧上下文，会系统性缺少序列边界外的调控元件；裁剪中心区域能让训练目标更公平。

##### 自注意力如何捕捉 enhancer-promoter 远程作用

在 Transformer block 中，每个 128 bp bin 都可以对所有其他 bin 做注意力：

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}} + B_{\Delta}\right)V
$$

这里 \(B_{\Delta}\) 是由相对距离 \(\Delta=i-j\) 生成的位置 bias。Enformer 的位置基函数不仅编码距离大小，还用带符号的非对称项表示上游/下游方向。这样，TSS 位置在更新表征时可以直接从远端 enhancer、promoter-proximal 元件和 TAD boundary 汇聚信息，而不必像卷积模型那样依赖许多层局部传播。

论文中的关键对比是 Basenji2 和 ExPecto 的有效距离约为 20 kb，而 Enformer 可以利用约 100 kb 范围内的调控序列。对 enhancer-gene pair 而言，这意味着模型能看到更多高置信 enhancer，尤其是远离 TSS、但对组织特异表达重要的元件。

##### Attention pooling 与计数建模损失

卷积塔中的 attention pooling 不是简单 max pooling，而是对一个池化窗口内的位置做通道相关的加权平均。对第 \(j\) 个通道：

$$
h_j =
\frac{\sum_i \exp(x_i \cdot w_j)x_{ij}}
{\sum_i \exp(x_i \cdot w_j)}
$$

直觉上，模型可以为不同通道选择不同的局部 motif 或信号峰，而不是只保留最大值。输出端使用 softplus/非负计数预测，并延续 Basenji2 的 Poisson negative log-likelihood：

$$
\mathcal{L}_{\text{Poisson}}
= \sum_{b,t}\left(\hat{y}_{b,t} - y_{b,t}\log \hat{y}_{b,t}\right) + \text{const}
$$

其中 \(b\) 是 128 bp bin，\(t\) 是某个 CAGE、DNase/ATAC、ChIP-histone 或 ChIP-TF track。多任务训练迫使同一个序列表征同时解释转录活性、染色质开放性、组蛋白修饰和 TF binding，因而学到更通用的调控语法。

##### 变异效应预测与解释

对非编码变异，Enformer 不需要额外训练分类器。给定 reference 和 alternative 序列，分别前向预测同一组 tracks，然后取差值：

$$
\Delta_{v,t}
= \sum_{b \in \mathcal{B}}\hat{y}_{t,b}(x^{\text{alt}})
- \sum_{b \in \mathcal{B}}\hat{y}_{t,b}(x^{\text{ref}})
$$

\(\Delta_{v,t}\) 是有方向的：正值表示 alternative allele 提高该 track 的预测活性，负值表示降低。论文进一步把这种 signed annotation 与 GTEx eQTL summary statistics 做 SLDP 回归，发现 Enformer 比 Basenji2 更能对齐组织相关 eQTL 信号。

解释上，Enformer 可以使用两类信号：一类是对目标 CAGE track 的 gradient × input，另一类是 Transformer attention。前者是 cell-type/track-specific 的，适合问“这个变异对 K562 CAGE 的影响来自哪里”；后者是模型内部共享注意力，适合观察远端区域、TAD boundary 和 insulator 的信息流。论文显示，在 HNRNPA1 等基因位点，Enformer 能把贡献分数分配给 20 kb 以外的 CRISPRi 验证 enhancer，而 Basenji2 因感受野限制无法做到。

##### 与传统 CNN 调控模型的区别

| 维度 | Basenji2 / ExPecto | Enformer |
|------|--------------------|----------|
| 长程建模 | dilated/local convolution 逐层扩散 | Transformer 全局自注意力直接交互 |
| 有效调控距离 | 约 20 kb | 约 100 kb |
| 位置编码 | 卷积结构隐含局部距离 | 自定义相对位置基函数，含方向性 |
| 输出任务 | 多组学 tracks / 表达 | 同类多任务输出，但有更大上下文 |
| 变异解释 | 受感受野限制 | 可定位远端 enhancer、TAD boundary 和带方向变异效应 |

> 💡 关键：Enformer 的创新不是简单把 Transformer 放到 DNA 上，而是在“局部 motif 抽取”和“远程调控整合”之间做了工程折中：卷积塔负责把 196k bp 压缩到可注意力计算的 128 bp bin，Transformer 负责跨 bin 建模 enhancer-promoter 和 insulator 关系。

#### 🧪 练习题
```yaml
question: "Enformer 相比 Basenji2 改进基因表达预测的核心机制是什么？"
options:
  - "用 Transformer 全局自注意力替代主要的 dilated convolution 长程传播，从而扩大可整合的远端调控范围"
  - "完全不使用卷积层，只对 196,608 个碱基直接做全局注意力"
  - "把 DNA 翻译成蛋白质序列后再预测表达"
  - "只训练人类 CAGE 一个输出任务，避免多任务干扰"
answer: 0
explain: "Enformer 仍使用卷积塔做局部抽取和下采样，但关键长程模块换成 Transformer，使 TSS 能直接整合远端 enhancer、insulator 和 TAD boundary 信息。"
```

### EVE

```yaml
id: eve
num: 21
name: EVE
full_name: EVE (EVE)
year: '2021.10'
org: Harvard Medical School
parent: —
paper_url: https://www.nature.com/articles/s41586-021-04043-8
project_url: ''
category: genomics
motivation: VAE预测人类基因变异致病性
```

#### 📝 一句话总结
EVE 为每个疾病相关蛋白训练一个基于多序列比对的 Bayesian VAE，学习自然进化允许的蛋白序列分布，再用突变序列相对野生型序列的似然下降来预测 missense variant 的致病性。它不依赖 ClinVar 等临床标签训练，却能为 3,219 个疾病基因的 3,600 多万个变异打分，并给大量 VUS 提供独立证据。

#### 🎯 核心要点
- **无监督变异效应模型**：训练时只使用蛋白家族 MSA，不使用“良性/致病”标签，避免标签稀疏、偏倚和循环验证问题
- **蛋白特异 VAE**：每个目标蛋白单独构建 MSA 并训练 VAE，使模型学习该蛋白家族的位点保守性、共变异和氨基酸可替换模式
- **Bayesian decoder**：编码器参数为点估计，解码器权重使用全因子 Gaussian 后验建模，以采样方式估计预测不确定性
- **Evolutionary index**：用突变序列相对野生型序列的负 log-likelihood ratio 作为变异破坏自然进化分布的程度
- **GMM 校准**：对 evolutionary index 拟合良性/致病两成分 Gaussian mixture，把连续分数转成 pathogenic probability 和 uncertainty
- **大规模覆盖**：论文预测超过 36M 个变异，覆盖 3,219 个 disease genes，并为超过 256k 个 variants of unknown significance 提供分类证据
- **深度突变扫描对齐**：EVE 与多个 high-throughput functional assays 的变异效应趋势一致，并在临床标签预测中接近或超过实验 assay
- **可部署资源**：论文提供 evemodel.org、GitHub 代码、MSA、ClinVar 验证、population frequency 和模型预测结果

#### 🔬 深入细节
##### 模型策略图与可访问来源

![EVE modelling strategy](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-04043-8/MediaObjects/41586_2021_4043_Fig1_HTML.png)
*图：EVE Nature Fig. 1。流程包括 MSA one-hot 输入、Bayesian VAE 重构蛋白家族序列、用突变/野生型似然比计算 evolutionary index，以及用 Gaussian mixture model 输出致病概率和不确定性。*

可访问来源：论文页面 `https://www.nature.com/articles/s41586-021-04043-8`；Nature 主文为订阅预览，但摘要、图、Extended Data 与补充材料入口可访问。方法级细节还可从官方代码 `https://github.com/OATML-Markslab/EVE`、Zenodo 归档和补充信息获取。

##### 算法伪代码

```python
# EVE 训练与变异评分伪代码
def train_eve_for_protein(wild_type_sequence, homologous_sequences):
    msa = build_and_filter_msa(wild_type_sequence, homologous_sequences)
    x_train = one_hot_encode_msa(msa)  # [num_sequences, L, 20]
    weights = sequence_reweighting(msa, identity_threshold=0.8)

    # Bayesian VAE: encoder q_phi(z|x), decoder p_theta(x|z)
    for step in range(num_updates):
        x = sample_msa_batch(x_train, weights)
        mu_z, logvar_z = encoder_phi(flatten(x))
        z = reparameterize(mu_z, logvar_z)

        theta_sample = sample_decoder_weights(q_theta)  # Bayesian decoder
        logits = decoder_theta(z, theta_sample)         # [L, 20]
        recon = categorical_log_likelihood(x, logits)
        kl_z = kl_normal(mu_z, logvar_z, prior="N(0,I)")
        kl_theta = kl_decoder_posterior_to_prior(q_theta)

        loss = -(recon - kl_z - kl_theta)
        optimizer.step(loss)

    return encoder_phi, q_theta


def evolutionary_index(model_ensemble, wild_type, mutant):
    # Monte Carlo over latent variables and decoder weight posterior
    logp_wt = monte_carlo_log_probability(model_ensemble, wild_type)
    logp_mut = monte_carlo_log_probability(model_ensemble, mutant)
    return -(logp_mut - logp_wt)  # larger means more evolutionarily disfavored


def classify_variants(indices):
    gmm = fit_two_component_gaussian_mixture(indices)
    pathogenic_prob = gmm.posterior(component="pathogenic", x=indices)
    uncertainty = 1.0 - abs(pathogenic_prob - 0.5) * 2.0
    return pathogenic_prob, uncertainty
```

##### 从 MSA 学习“自然允许的蛋白序列”

EVE 的基本假设是：如果一个氨基酸替换在进化中很少被允许，且与该蛋白家族的协同变异模式冲突，那么它更可能破坏蛋白功能并导致疾病。给定某个人类蛋白，EVE 先收集同源序列形成 MSA，把每条序列表示为 \(L \times 20\) 的 one-hot 矩阵，其中 \(L\) 是蛋白长度，20 是标准氨基酸类别。

MSA 中近乎重复的同源序列会让模型过度关注某些物种分支，因此通常需要 sequence reweighting。一个常见写法是：

$$
w_i = \frac{1}{\sum_j \mathbf{1}[\operatorname{ID}(x_i,x_j) > \tau]},
\quad
N_{\text{eff}} = \sum_i w_i
$$

其中 \(\tau\) 是序列相似度阈值。这样，某个进化分支中大量相似序列不会在训练中等价于大量独立证据。

##### Bayesian VAE 架构与 ELBO

EVE 的 VAE 用编码器把输入序列 \(x\) 映射到潜变量分布：

$$
q_\phi(z\mid x)=\mathcal{N}(\mu_\phi(x),\operatorname{diag}(\sigma_\phi^2(x)))
$$

再由解码器从 \(z\) 生成每个位点的氨基酸 categorical distribution：

$$
p_\theta(x\mid z)=\prod_{l=1}^{L}p_\theta(x_l\mid z)
$$

Extended Data 中给出的架构是对称的 3 层 encoder/decoder：encoder 为 2,000-1,000-300，decoder 为 300-1,000-2,000，latent dimension 为 50。输入序列先展平；decoder 输出再经过一维卷积捕获相邻位点氨基酸使用的局部相关，最后 softmax 得到每个位点 20 个氨基酸的概率。

训练目标是最大化 evidence lower bound：

$$
\log p_\theta(x) \ge
\mathbb{E}_{q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
- \operatorname{KL}(q_\phi(z\mid x)\,\|\,p(z))
$$

由于 EVE 使用 Bayesian decoder，解码器权重本身也有后验 \(q(\theta)\)，实际目标还包含权重后验到先验的 KL 项：

$$
\mathcal{L}_{\text{EVE}}
= \mathbb{E}_{q(\theta)q_\phi(z\mid x)}[\log p_\theta(x\mid z)]
- \operatorname{KL}(q_\phi(z\mid x)\,\|\,p(z))
- \operatorname{KL}(q(\theta)\,\|\,p(\theta))
$$

Bayesian decoder 的意义不只是正则化。它让模型可以通过多次采样 decoder weights 和 latent variables 得到一组似然估计，从而为每个变异分数提供不确定性，而不是只输出一个点估计。

##### Evolutionary index：变异越不符合进化分布，分数越高

对某个单氨基酸变异 \(v\)，构造野生型序列 \(x^{\text{wt}}\) 和突变序列 \(x^{v}\)。EVE 的核心分数是 evolutionary index，可写为负 log-likelihood ratio：

$$
E_v
= -\log\frac{p_\theta(x^{v})}{p_\theta(x^{\text{wt}})}
= \log p_\theta(x^{\text{wt}})-\log p_\theta(x^{v})
$$

如果突变序列在模型学到的进化分布下概率显著低于野生型，\(E_v\) 就大，表示该突变更可能破坏功能。论文中对 evolutionary index 的估计会从近似后验采样，并对多个独立训练的 VAE ensemble 做平均，以降低单模型随机性。

这个分数与传统 conservation score 的区别在于：EVE 不只是看单个位点是否保守，还通过 VAE 潜变量和 decoder 学习跨位点共变异。例如某个位点的氨基酸替换单独看似可接受，但如果它没有伴随另一个结构接触位点的补偿性替换，VAE 仍可能给出低似然。

##### GMM 校准与不确定性

Evolutionary index 是连续分数，不直接等于临床标签。EVE 对大量变异的 \(E_v\) 分布拟合两成分 Gaussian mixture model：

$$
p(E)=\pi_b\mathcal{N}(E;\mu_b,\sigma_b^2)
+\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)
$$

低分成分对应 evolutionarily tolerated/benign，高分成分对应 constrained/pathogenic。给定一个分数，致病概率可由后验责任度表示：

$$
P(\text{pathogenic}\mid E)
=
\frac{\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)}
{\pi_b\mathcal{N}(E;\mu_b,\sigma_b^2)+\pi_p\mathcal{N}(E;\mu_p,\sigma_p^2)}
$$

当 \(P\) 接近 0.5 时，两个成分重叠，模型会报告更高 uncertainty；当 \(P\) 接近 0 或 1 时，分类更有把握。这个设计很适合临床 VUS 场景，因为它允许“高置信分类”和“不确定，暂不分类”分开处理。

##### 为什么不直接用临床标签监督训练

ClinVar 等数据库中的标签非常稀疏，而且分布偏向被研究得多的疾病基因和已知热点位点。监督模型若直接用这些标签训练，容易学到数据收集偏差，且在评估中可能出现 circularity：同一类证据既参与训练又参与验证。EVE 避开这个问题，把训练信号放在进化序列本身，临床标签只用于事后验证和阈值解释。

与早期 DeepSequence 相比，EVE 的主要工程强化在于面向临床规模的稳定评分、Bayesian uncertainty、GMM 分类和大规模资源发布。它不是替代 ACMG/AMP 规则的单一判据，而是提供一类独立的 computational evidence，尤其适合缺少功能实验和病例统计的 missense variants。

> 💡 关键：EVE 的“监督信号”来自数亿年进化筛选留下的序列分布，而不是人类手工标签。变异越让蛋白序列偏离家族分布，越可能是功能有害的。

#### 🧪 练习题
```yaml
question: "EVE 中 evolutionary index 的核心含义是什么？"
options:
  - "突变序列相对野生型序列在进化 VAE 分布下的似然下降幅度"
  - "ClinVar 中致病标签出现的次数"
  - "蛋白质三维结构中两个原子的欧氏距离"
  - "MSA 中序列数量除以蛋白长度的固定阈值"
answer: 0
explain: "EVE 用突变序列与野生型序列的负 log-likelihood ratio 打分；分数越高，说明突变越不符合进化允许的蛋白家族分布。"
```

### HyenaDNA

```yaml
id: hyenadna
num: 22
name: HyenaDNA
full_name: HyenaDNA (HyenaDNA)
year: '2023.12'
org: Stanford University
parent: —
paper_url: https://arxiv.org/abs/2306.15794
project_url: ''
category: genomics
motivation: 隐式卷积实现单核苷酸分辨率
```

#### 📝 一句话总结
HyenaDNA 用 Hyena 隐式长卷积算子替代 Transformer 注意力，在单字符 DNA token 上做 next nucleotide prediction，把基因组 foundation model 的上下文扩展到最高 1M token，同时保留单核苷酸分辨率。它解决了 dense attention 难以处理超长 DNA、k-mer/tokenizer 又会牺牲碱基级变异信息的问题。

#### 🎯 核心要点
- **单核苷酸 tokenizer**：直接使用 A/C/G/T 加特殊 token，不使用 k-mer、BPE 或下采样，避免把 SNP 等单碱基变化淹没在聚合 token 中
- **decoder-only Hyena 架构**：堆叠 Hyena operator、normalization 和 feed-forward network，用 causal next-token prediction 预训练
- **隐式长卷积**：卷积核由 MLP/implicit parameterization 生成，再用 FFT 计算长卷积，复杂度约为 \(O(L\log L)\)，低于 attention 的 \(O(L^2)\)
- **全局上下文**：每层 Hyena operator 都有全局 receptive field，不需要局部卷积逐层扩散或稀疏注意力近似
- **超长预训练**：在人类参考基因组 hg38 上预训练，实验覆盖 1k、32k、250k、450k、1M 等上下文长度
- **sequence length warm-up**：先用短序列稳定训练，再分阶段拉长上下文；在 450k 序列上减少训练时间并提升物种分类准确率
- **参数高效**：代表模型深度 2-8 层、宽度 128-256、参数约 400k-6.6M，却能在多个 GenomicBenchmarks/Nucleotide Transformer 任务上竞争或刷新结果
- **软提示适配**：可在输入窗口中加入 2k-32k learnable soft prompt tokens，只更新 prompt 而冻结预训练模型，实现轻量下游适配

#### 🔬 深入细节
##### 架构图与可访问来源

![HyenaDNA block architecture](https://arxiv.org/html/2306.15794v1/x2.png)
*图：HyenaDNA arXiv HTML Figure 1.3。Hyena block 由短卷积/线性投影产生门控分支，由 MLP 隐式参数化长卷积滤波器，并用 FFT 卷积实现 \(O(L\log L)\) 的长程混合。*

可访问来源：论文 `https://arxiv.org/abs/2306.15794`，arXiv HTML `https://arxiv.org/html/2306.15794v1`，官方代码和 pipeline 图在 `https://github.com/HazyResearch/hyena-dna`，预训练权重发布在 Hugging Face `https://huggingface.co/LongSafari`。

##### 算法伪代码

```python
# HyenaDNA 预训练、长度 warm-up 与下游适配伪代码
def tokenize_dna(seq):
    vocab = {"A": 0, "C": 1, "G": 2, "T": 3, "N": 4, "<bos>": 5, "<eos>": 6}
    return [vocab.get(base, vocab["N"]) for base in seq]


def hyena_block(x, max_length):
    # dense/short-conv projections create data-controlled gates
    v0, v1, v2 = project_and_short_conv(x)

    # implicit MLP generates a length-L long convolution filter
    h1 = filter_mlp_1(positions=max_length)
    h2 = filter_mlp_2(positions=max_length)

    # order-2 Hyena-style gated long convolution
    z = v2
    z = fft_convolution(h2, z) * v1
    z = fft_convolution(h1, z) * v0
    return feed_forward(norm(z + x))


def pretrain_hyenadna(hg38, model, schedule=[1024, 32000, 250000, 450000, 1000000]):
    for L in schedule:
        for seq in sample_genome_windows(hg38, length=L):
            tokens = tokenize_dna(seq)
            hidden = embed(tokens[:-1])
            for layer in model.layers:
                hidden = hyena_block(hidden, max_length=L)
            logits = lm_head(hidden)
            loss = cross_entropy(logits, tokens[1:])  # next nucleotide prediction
            optimizer.step(loss)


def soft_prompt_adapt(frozen_model, labeled_examples, prompt_len):
    prompt = initialize_learnable_tokens(prompt_len)
    freeze(frozen_model)
    for seq, label_token in labeled_examples:
        x = concat(prompt, embed(tokenize_dna(seq)), embed([label_token]))
        loss = task_loss(frozen_model(x), label_token)
        update(prompt, loss)  # only prompt tokens are trained
    return prompt
```

##### 为什么基因组需要“长上下文 + 单碱基分辨率”

基因组序列的难点在于两个尺度同时重要：调控元件、结构域和远程相互作用可能相隔数万到数十万 bp；但单个 SNP 或短 indel 又可能显著改变 TF binding、splice site 或 coding consequence。早期 DNA language model 常用 k-mer 或 BPE 聚合 token，降低序列长度；Enformer 等模型用下采样和 dilated convolution 扩展上下文。这些路线都在一定程度上牺牲了 nucleotide-level resolution。

HyenaDNA 的选择更直接：保留单字符 token，让模型看到每个碱基；用 Hyena operator 降低长序列混合的计算成本，让 100k-1M token 的上下文变得可训练。论文把这称为相对 dense attention genomic FM 最高约 500x 的上下文扩展。

##### Hyena operator：用隐式长卷积替代注意力

对长度为 \(L\) 的序列，标准 attention 的主要瓶颈是 \(L\times L\) 注意力矩阵：

$$
\operatorname{MHA}(X)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V,
\quad \text{cost}=O(L^2)
$$

Hyena 使用长卷积和门控来实现全局序列混合。离散卷积可以写作：

$$
y = h * x,\quad
y_t = \sum_{i=0}^{t} h_i x_{t-i}
$$

其中卷积核 \(h\) 不作为长度 \(L\) 的独立参数直接存储，而由隐式函数生成：

$$
h = \gamma_\theta(0,1,\ldots,L-1)
$$

实际计算时使用 FFT：

$$
h*x = \operatorname{IFFT}(\operatorname{FFT}(h)\odot \operatorname{FFT}(x)),
\quad \text{cost}=O(L\log L)
$$

Hyena block 还加入 data-controlled gating。一个 order-2 的简化表达是：

$$
\operatorname{Hyena}(x)
= v_0(x)\odot \left(h_1 * \left(v_1(x)\odot (h_2 * v_2(x))\right)\right)
$$

其中 \(v_i(x)\) 来自线性投影和短卷积，\(\odot\) 是逐元素乘法。长卷积提供全局感受野，门控让同一个全局滤波器在不同序列上下文中产生不同响应。对 DNA 来说，这相当于在每层中允许远端区域直接影响当前位置，但不需要构造二次复杂度的 attention matrix。

##### 预训练目标与长度调度

HyenaDNA 是 decoder-only causal model，预训练目标是 next nucleotide prediction：

$$
\mathcal{L}_{\text{NTP}}
= -\sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

论文在人类参考基因组上采样窗口训练，并沿模型深度、宽度、上下文长度扩展。附录给出的代表配置深度为 2-8 层，Hyena blocks 的 order \(N=2\)，宽度 128-256，MLP expansion factor 为 4，参数量约 400k 到 6.6M。

直接从超长序列开始训练不稳定且耗时。HyenaDNA 引入 sequence length warm-up：先用短上下文学习局部统计，再逐步增加到目标长度，例如从 1k 过渡到 450k。论文报告在 450k 长度上，这种调度减少训练时间并提升 species classification 任务准确率。直觉是短序列阶段提供便宜的局部模式学习，长序列阶段再学习远程依赖。

##### 下游任务与软提示

标准下游方式是在预训练 encoder/decoder 后接线性分类头，针对 GenomicBenchmarks、Nucleotide Transformer benchmark、DeepSEA chromatin profile 等任务微调。HyenaDNA 的优势不只在长序列速度，还在小模型参数量：例如论文与 500M-2.5B 参数的 Nucleotide Transformer 比较时，HyenaDNA 使用小得多的模型和单个人类参考基因组预训练，也能在多个短序列任务上达到或超过强基线。

更有意思的是软提示适配。由于 DNA 词表很小，纯文本式 in-context learning 缺少自然语言那样的标签词和任务描述。HyenaDNA 的做法是在输入中插入 learnable prompt tokens：

$$
x \leftarrow \operatorname{concat}[\operatorname{embed}(x_p), \theta],
\quad \theta \in \mathbb{R}^{N \times d}
$$

训练时冻结 HyenaDNA，只优化 prompt 参数 \(\theta\)。这些 token 占用长上下文窗口的一部分，用于承载任务定义和少量示例信息；二分类标签可复用 DNA vocabulary 中的符号。这样可以避免为每个任务更新全模型权重，也能展示长上下文模型在基因组任务上的一种 in-context/parameter-efficient adaptation 形式。

##### 与 k-mer Transformer、CNN 和 Enformer 的区别

| 维度 | k-mer/BPE Transformer | CNN / dilated CNN | Enformer | HyenaDNA |
|------|-----------------------|-------------------|----------|----------|
| token 粒度 | k-mer 或子词 | one-hot/局部窗口 | one-hot 后下采样到 128 bp bin | 单核苷酸 token |
| 长程机制 | attention，通常受 \(O(L^2)\) 限制 | 局部卷积逐层扩散 | 卷积压缩后 Transformer | 隐式长卷积 + 门控 |
| 分辨率代价 | 聚合 token 可能掩盖 SNP | 局部或下采样损失细节 | 输出为 128 bp bin | 保留每个碱基 |
| 上下文规模 | 常见为 k 到低十万级 token | 依赖 dilation/downsampling | 约 200 kb 输入、100 kb 有效调控范围 | 最高 1M token |
| 适配方式 | 微调/分类头 | 任务特异训练 | 多任务 tracks + allele difference | 微调、线性头、soft prompt |

> 💡 关键：HyenaDNA 的核心贡献是把“每个碱基都看见”和“百万级上下文”同时放进一个可训练模型中；隐式长卷积负责计算可行性，单字符 tokenizer 负责保留变异分辨率。

#### 🧪 练习题
```yaml
question: "HyenaDNA 为什么可以在单核苷酸分辨率下处理远长于普通 Transformer 的 DNA 序列？"
options:
  - "用隐式长卷积和 FFT 进行全局序列混合，避免构造 \(L^2\) 注意力矩阵"
  - "把所有 DNA 序列都压缩成固定 6-mer 平均向量"
  - "只预测蛋白质结构，不处理 DNA 序列"
  - "完全删除远端上下文，只保留局部 200 bp 窗口"
answer: 0
explain: "Hyena operator 用 MLP 生成长卷积核并通过 FFT 计算卷积，复杂度约为 \(O(L\log L)\)，因此可以保留单碱基 token 同时扩展到超长上下文。"
```

### DNABERT-2

```yaml
id: dnabert2
num: 23
name: DNABERT-2
full_name: DNABERT-2 (DNABERT-2)
year: '2024.01'
org: 周德中团队
parent: dnabert
paper_url: https://openreview.net/forum?id=7YUC79v69G
project_url: ''
category: genomics
motivation: BPE分词解决长序列效率问题
```

#### 📝 一句话总结
DNABERT-2 用 BPE tokenizer、ALiBi 位置偏置和高效 Transformer 重新设计 DNA 语言模型，解决 DNABERT 固定重叠 k-mer 带来的词表膨胀、信息泄漏和长序列外推效率问题。它同时提出 Genome Understanding Evaluation (GUE) 基准，用多物种基因组预训练模型验证 DNA 表征的泛化能力。

#### 🎯 核心要点
- **BPE DNA tokenizer**：从碱基字符出发按频繁相邻片段合并，学习可变长 DNA token，避免固定 k-mer 的指数级词表和相邻 token 强重叠
- **多物种预训练**：不再只依赖单一人类参考基因组，而是使用跨物种基因组片段，让模型学习更通用的序列上下文规律
- **ALiBi 位置编码**：用注意力分数中的距离相关线性偏置替代绝对位置 embedding，提升模型对比训练长度更长序列的外推能力
- **高效 Transformer 实现**：结合现代 BERT-style encoder、FlashAttention 等训练优化，在较小参数量和更少 GPU 时间下达到强基因组任务表现
- **GUE 基准**：覆盖 promoter、transcription factor binding、splice site、epigenetic marks、mouse regulatory 等多类任务，用统一 benchmark 比较 DNA foundation models
- **兼容下游微调**：预训练后可接分类或回归 head，用 `[CLS]` 或池化序列表征处理调控分类、序列功能预测等任务
- **针对 DNABERT 的改进**：重点修复固定重叠 k-mer 的三个问题：上下文泄漏、长输入 token 数过多、不同 \(k\) 需要不同模型/词表

#### 🔬 深入细节
##### 方法示意图与可访问来源

![DNABERT-2 BPE tokenization illustration](https://arxiv.org/html/2306.15006v2/x2.png)
*图：DNABERT-2 论文中的 BPE 分词示意。DNA 片段先由单碱基 token 出发，迭代合并高频相邻片段，最终得到可变长度的 DNA “词”。*

可访问来源说明：任务 YAML 给出的 OpenReview 链接保留在元信息中；实际可访问论文页包括 OpenReview 论文页 `https://openreview.net/forum?id=oMLQB4EZE1`、arXiv HTML `https://arxiv.org/html/2306.15006v2` 和官方 Hugging Face 模型页 `https://huggingface.co/zhihan1996/DNABERT-2-117M`。

##### 算法伪代码

```python
# DNABERT-2 的简化训练与微调流程
def train_bpe_tokenizer(genome_sequences, vocab_size):
    vocab = {"A", "C", "G", "T", "N"}
    corpus = [list(seq) for seq in genome_sequences]

    while len(vocab) < vocab_size:
        pair = most_frequent_adjacent_pair(corpus)
        merged = pair[0] + pair[1]
        corpus = merge_pair_everywhere(corpus, pair, merged)
        vocab.add(merged)
    return vocab


def pretrain_dnabert2(genome_windows, tokenizer, encoder):
    for dna in genome_windows:
        tokens = tokenizer.encode(dna)
        tokens = truncate_or_pad(tokens, max_length=512)

        masked, mask_positions, labels = mask_tokens(tokens)
        hidden = encoder(masked, attention_bias="ALiBi")

        loss = 0.0
        for pos, target in zip(mask_positions, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), target)
        optimizer.step(loss)


def finetune(sequence, tokenizer, encoder, task_head):
    tokens = tokenizer.encode(sequence)
    hidden = encoder(tokens, attention_bias="ALiBi")
    representation = hidden[0]       # [CLS] 或等价序列级表示
    return task_head(representation)
```

##### 为什么固定 k-mer 需要被替换

原始 DNABERT 把 DNA 序列切成重叠 k-mer。给定长度为 \(L\) 的序列和固定 \(k\)，token 数约为 \(L-k+1\)，词表大小为：

$$
|\mathcal{V}_{k\text{-mer}}| = 4^k + |\mathcal{V}_{\mathrm{special}}|
$$

当 \(k\) 增大时，词表按指数增长；当 \(k\) 较小时，每个 token 的生物学上下文又不足。更关键的是相邻 k-mer 共享 \(k-1\) 个碱基，例如 `ACGTTA` 与 `CGTTAG` 几乎完全重叠。若 MLM 只 mask 某个 k-mer，模型能从左右邻居恢复大部分答案，这会把预训练任务变得过于容易。

DNABERT-2 的 BPE 思路是让 token 长度由数据决定。它从单碱基词表开始，反复合并出现频率最高的相邻 token 对：

$$
(u^\*, v^\*) =
\arg\max_{(u,v)}
\mathrm{count}(u, v)
$$

合并后新 token 为 \(w=u^\*v^\*\)。经过多轮合并，常见 motif、重复片段和短上下文会成为更长 token，而罕见片段仍可由更短 token 组合表示。这比固定 k-mer 更灵活：高频局部模式被压缩，长序列的 token 数下降，且不需要为每个 \(k\) 单独训练模型。

##### MLM 目标与 DNA BPE 的直觉

DNABERT-2 仍采用 BERT-style masked language modeling。设 token 序列为 \(\mathbf{t}=(t_1,\ldots,t_n)\)，mask 位置集合为 \(\mathcal{M}\)，预训练目标为：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \mathbf{t}_{\setminus\mathcal{M}})
$$

由于 BPE token 可长可短，预测一个 token 可能对应一个碱基，也可能对应一段常见 DNA 片段。直觉上，模型不再只学习“相邻 k-mer 怎么重叠”，而是学习哪些 DNA 片段经常在某些上游/下游上下文中出现。这一点对 promoter、TF binding site、splice site 等任务尤其重要，因为功能信号常来自短 motif 与周围背景的组合，而不是单个固定窗口。

##### ALiBi 如何支持长序列外推

标准 BERT 使用绝对位置 embedding：

$$
h_i^{(0)} = e(t_i) + p_i
$$

这种做法在训练长度外的序列上不自然，因为模型只见过有限位置索引。DNABERT-2 使用 ALiBi，把距离惩罚直接加到注意力 logit 中。对第 \(h\) 个 attention head，可写为：

$$
\mathrm{Attn}_{h}(i,j)
= \mathrm{softmax}_j
\left(
\frac{q_i^\top k_j}{\sqrt{d}}
- m_h |i-j|
\right)
$$

其中 \(m_h\) 是该 head 的斜率。近距离 token 的注意力分数更少被惩罚，远距离 token 仍可被关注但需要更强内容匹配。这样做的工程价值是明确的：DNA 调控任务经常需要比预训练窗口更长的上下文，ALiBi 比固定位置表更适合向长输入外推。

##### 训练与下游流程

DNABERT-2 的训练流程可以理解为三层：先训练 BPE tokenizer，再用多物种基因组片段做 MLM 预训练，最后在 GUE 等下游任务上微调。预训练阶段只需要原始基因组序列，不需要标签；下游阶段则把 encoder 输出接到任务 head。二分类任务可写作：

$$
\hat{y} = \sigma(W h_{\mathrm{[CLS]}} + b),
\quad
\mathcal{L}_{\mathrm{cls}}
= -y\log\hat{y} - (1-y)\log(1-\hat{y})
$$

对多分类任务则使用 softmax 交叉熵：

$$
\hat{\mathbf{y}}=\mathrm{softmax}(W h_{\mathrm{[CLS]}}+b),
\quad
\mathcal{L}_{\mathrm{ce}}
=-\sum_c y_c\log \hat{y}_c
$$

GUE 的意义不只是提供分数表，而是把不同基因组任务统一成可复现的测试环境。早期 DNA 语言模型常在不同数据集、不同划分和不同微调协议下比较，结论容易混杂；GUE 让 tokenizer、预训练数据、模型大小和微调策略的影响更容易被拆开。

##### 与 DNABERT 的关键区别

| 维度 | DNABERT | DNABERT-2 |
|------|---------|-----------|
| tokenization | 固定重叠 k-mer | 数据驱动 BPE 可变长 token |
| 词表扩展 | \(4^k\) 指数增长 | 词表大小由训练合并次数控制 |
| mask 泄漏 | 相邻 k-mer 高度重叠，易泄漏答案 | token 边界不固定，泄漏显著缓解 |
| 位置建模 | 绝对位置 embedding | ALiBi 距离偏置，长序列外推更自然 |
| 预训练语料 | 以人类基因组为主 | 跨物种基因组片段 |
| 评测方式 | 多个任务分别报告 | 提出统一 GUE benchmark |

> 💡 关键：DNABERT-2 的核心贡献不是单纯“换了分词器”，而是把 DNA token 粒度、长上下文位置建模和统一评测协议一起重做，使 DNA foundation model 更像一个可迁移的通用编码器。

#### 🧪 练习题
```yaml
question: "DNABERT-2 用 BPE 替代固定重叠 k-mer 的主要原因是什么？"
options:
  - "BPE 可以学习可变长 DNA token，减少固定 k-mer 的词表膨胀和重叠泄漏"
  - "BPE 会把所有 DNA 序列压缩成一个 token，因此不需要 Transformer"
  - "BPE 只能用于蛋白质序列，不能用于基因组序列"
  - "BPE 的目标是替代 masked language modeling 损失函数"
answer: 0
explain: "固定 k-mer 会带来指数级词表和相邻 token 高度重叠；BPE 通过频繁片段合并得到可变长 token，使长序列建模更高效并缓解 MLM 答案泄漏。"
```

### Borzoi

```yaml
id: borzoi
num: 24
name: Borzoi
full_name: Borzoi (Borzoi)
year: '2024.03'
org: Google DeepMind
parent: enformer
paper_url: https://www.biorxiv.org/content/10.1101/2023.08.30.555582v1
project_url: ''
category: genomics
motivation: 支持524kb超长输入序列
```

#### 📝 一句话总结
Borzoi 将 Enformer 式 sequence-to-function 模型扩展到 524 kb 输入和 RNA-seq 覆盖预测，以 32 bp 分辨率直接建模基因表达、剪接、polyadenylation 与远距离调控信号。它通过卷积下采样、Transformer 长程建模和 U-Net 式上采样，把 DNA 序列变异转化为可解释的转录输出变化。

#### 🎯 核心要点
- **超长 DNA 输入**：输入长度为 524,288 bp，比 Enformer 的约 200 kb 上下文更长，覆盖更多 enhancer-gene、splice 和 polyA 相关远距离依赖
- **32 bp 输出分辨率**：输出中心区域的 RNA-seq/功能组学 coverage bins，使模型不仅预测总表达，还预测转录本结构相关的空间 profile
- **多模态训练目标**：官方仓库说明训练数据包括 ENCODE、GTEx RNA-seq，以及 reprocessed Enformer 数据中的 ChIP-seq、DNase、ATAC-seq、CAGE 等
- **双物种 heads**：参数文件包含 human head 和 mouse head，分别输出 7,611 个人类 targets 与 2,608 个小鼠 targets
- **Conv + Transformer + U-Net 架构**：先用卷积残差塔压缩序列，再用 8 层多头 Transformer 建模长程调控，最后用两级 U-Net convolution 提升输出分辨率
- **Poisson-multinomial 损失**：把 coverage 预测拆成总量和沿基因组位置的 profile，兼顾表达强度与转录结构形状
- **变异效应分析**：通过 reference/alternate allele 两次前向预测，计算 eQTL、sQTL、polyadenylation QTL、isoform polyA QTL 等效应分数
- **来源限制**：任务给出的 bioRxiv 页面当前受 Cloudflare challenge 影响不可直接抓取；方法细节依据 Nature Genetics 论文页、官方 `calico/borzoi` 仓库和公开参数文件核对

#### 🔬 深入细节
##### 模型示意图与可访问来源

![Borzoi model overview](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41588-024-02053-6/MediaObjects/41588_2024_2053_Fig1_HTML.png)
*图：Nature Genetics Fig. 1。Borzoi 从长 DNA 序列输入出发，预测多实验、多组织的 RNA-seq coverage，并用 reference/alternate 序列差异解释遗传变异效应。*

可访问来源说明：bioRxiv 原始链接 `https://www.biorxiv.org/content/10.1101/2023.08.30.555582v1` 当前被网页 challenge 拦截；可访问的正式论文页为 `https://www.nature.com/articles/s41588-024-02053-6`，官方代码与参数在 `https://github.com/calico/borzoi`，公开预测参数文件在 `https://raw.githubusercontent.com/calico/borzoi/main/examples/params_pred.json`。

##### 算法伪代码

```python
# Borzoi 简化训练/推理伪代码
def borzoi_forward(one_hot_dna, species):
    # one_hot_dna: [524288, 4]
    x = conv_dna(one_hot_dna, filters=512, kernel_size=15, pool=2)
    x = residual_conv_tower(x, repeats=6, filters=608, filters_end=1536, pool=2)

    for _ in range(8):
        x = transformer_block(
            x,
            heads=8,
            key_size=64,
            relative_position_features=32,
            dropout=0.2,
        )

    x = unet_conv_upsample(x, kernel_size=3)
    x = unet_conv_upsample(x, kernel_size=3)
    x = crop_center_bins(x)
    x = conv_nac(x, filters=1920, dropout=0.1)

    if species == "human":
        return softplus(linear(x, units=7611))
    return softplus(linear(x, units=2608))


def score_variant(reference_seq, alternate_seq, target_index, region_bins):
    y_ref = borzoi_forward(one_hot(reference_seq), species="human")
    y_alt = borzoi_forward(one_hot(alternate_seq), species="human")
    delta = y_alt[:, target_index] - y_ref[:, target_index]
    return aggregate(delta[region_bins])  # eQTL / sQTL / paQTL 等任务可换聚合方式
```

##### 为什么需要 524 kb 上下文

基因表达不是只由启动子附近几十个碱基决定。enhancer 可以跨越数十万碱基调控目标基因，剪接和 polyadenylation 信号也需要结合外显子、内含子、转录方向和组织背景来判断。Enformer 已经证明 Transformer 能把较长 DNA 输入映射到功能组学轨道，但 RNA-seq coverage 对上下文更敏感：一个 variant 可能改变总表达，也可能改变某个外显子的 inclusion、3' UTR 使用或 polyA site 选择。

Borzoi 因此把输入设为：

$$
X \in \{0,1\}^{524288\times 4}
$$

其中 4 个通道对应 A/C/G/T one-hot。模型输出是按 32 bp bin 排列的多 target coverage：

$$
\hat{Y} \in \mathbb{R}_{\ge 0}^{B\times T}
$$

这里 \(B\) 是中心区域 bin 数，\(T\) 是实验/组织 target 数。官方参数文件中 human head 的 \(T=7611\)，mouse head 的 \(T=2608\)，最终激活函数为 softplus，保证 coverage 非负：

$$
\hat{y}_{b,t} = \log(1+\exp z_{b,t})
$$

##### 架构拆解：从局部 motif 到长程调控再回到 coverage profile

Borzoi 的第一段是卷积与残差塔。`conv_dna` 使用 15 bp 卷积核识别局部 motif，并通过 pooling 降低序列长度；随后 6 个 residual convolution tower 继续扩大感受野，同时把通道数从约 608 提升到 1536。这个阶段类似把原始碱基序列变成较粗粒度的 regulatory feature map。

第二段是 Transformer tower。官方参数文件显示它包含 8 个 block、8 个 heads、key size 64，并使用相对位置特征。自注意力的核心计算为：

$$
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(
\frac{QK^\top}{\sqrt{d}} + R_{\Delta}
\right)V
$$

其中 \(R_{\Delta}\) 是相对位置偏置或相对位置特征贡献。卷积层适合识别局部 motif，Transformer 则让相距很远的 enhancer、promoter、splice signal 和 polyA signal 直接交互，这是 Borzoi 相比短上下文 CNN 的主要优势。

第三段是两层 U-Net convolution。长输入经过多轮 pooling 后分辨率下降，如果直接输出会损失转录本结构细节；U-Net 式上采样把长程上下文带回更细的 32 bp bin。对 RNA-seq 来说，这一步很关键，因为 exon boundary、splice junction 邻域和 polyA site 附近的 profile 形状比单一表达量更有信息。

##### Poisson-multinomial coverage 损失

RNA-seq coverage 同时包含两个信号：一个 target 的总 read count，和 reads 沿基因组位置如何分布。Borzoi 参数文件中的训练损失为 `poisson_mn`，可理解为把总量建模和 profile 建模结合起来。对某个 target \(t\)，设观测 coverage 为 \(y_{b,t}\)，预测 coverage 为 \(\hat{y}_{b,t}\)：

$$
Y_t = \sum_b y_{b,t},
\quad
\hat{Y}_t = \sum_b \hat{y}_{b,t}
$$

profile 分布为：

$$
p_{b,t} = \frac{y_{b,t}}{Y_t+\epsilon},
\quad
\hat{p}_{b,t} = \frac{\hat{y}_{b,t}}{\hat{Y}_t+\epsilon}
$$

简化损失可以写作：

$$
\mathcal{L}_{\mathrm{PM}}
= \lambda \left(\hat{Y}_t - Y_t \log \hat{Y}_t\right)
- \sum_b y_{b,t}\log \hat{p}_{b,t}
$$

第一项约束总表达强度，第二项约束 coverage 形状。官方参数文件中 `total_weight` 为 0.2，体现了总量项和 profile 项之间的权衡。这个设计比单纯逐 bin Poisson 更适合 RNA-seq：模型不能只把总 read 数预测对，还要把 reads 放在正确的外显子、UTR 或 polyA 相关位置上。

##### 训练与变异推理流程

训练时，Borzoi 对每个 524 kb 窗口读取参考 DNA one-hot，并配对多个实验的 coverage tracks。数据增强包括 reverse-complement 和小幅 shift：reverse-complement 让模型学习 DNA 双链等价性，shift 则降低模型对窗口边界的过拟合。优化器为 Adam，公开参数文件中的学习率为 \(6\times10^{-5}\)，并使用 warmup、gradient clipping 和 L2 regularization。

推理变异效应时，流程非常直接：把 reference allele 放入同一长上下文前向一次，把 alternate allele 放入同一位置再前向一次，然后比较目标组织/实验的输出差异：

$$
\Delta_{b,t} =
\hat{y}_{b,t}^{\mathrm{alt}}
- \hat{y}_{b,t}^{\mathrm{ref}}
$$

若聚合目标是 gene body 总 coverage，就得到表达效应近似；若聚合 splice junction 或 exon 相关 bins，就可构造 sQTL 分数；若聚合 3' 端或 polyA site 邻域，就可得到 paQTL/ipaQTL 分数。Borzoi 的优势在于同一个模型输出完整 profile，因此不需要为表达、剪接和 polyA 分别设计完全不同的特征工程。

##### 与 Enformer 的关系

| 维度 | Enformer | Borzoi |
|------|----------|--------|
| 主要输出 | ChIP/DNase/CAGE 等 regulatory tracks | RNA-seq coverage 与多组学 tracks |
| 输入上下文 | 约 200 kb 级别 | 524,288 bp |
| 关键任务 | 长程调控元素到功能组学信号 | 表达、剪接、polyA 与变异效应 |
| 输出解释 | 多 target functional tracks | 32 bp coverage profile，可映射转录结构 |
| 架构变化 | Conv + Transformer | Conv + Transformer + U-Net 式分辨率恢复 |

> 💡 关键：Borzoi 不是只把输入窗口加长，而是把“长程调控信息”和“RNA-seq profile 形状”同时放入训练目标，使模型能把非编码变异连接到表达量、剪接和 3' 端使用变化。

#### 🧪 练习题
```yaml
question: "Borzoi 使用 Poisson-multinomial 损失的主要目的是什么？"
options:
  - "同时约束 RNA-seq 的总 coverage 和沿基因组位置的 profile 形状"
  - "把 DNA 碱基翻译成蛋白质氨基酸序列"
  - "让模型只预测 promoter 是否存在，不预测 coverage"
  - "完全去掉 Transformer，只保留卷积层"
answer: 0
explain: "RNA-seq 既有总 read count，也有外显子、UTR、polyA 等位置分布；Poisson-multinomial 损失分别建模总量和 profile，从而更适合 coverage 预测。"
```

### GROVER

```yaml
id: grover
num: 25
name: GROVER
full_name: GROVER (GROVER)
year: '2024.07'
org: Sanabria et al.
parent: —
paper_url: https://www.nature.com/articles/s42256-024-00838-3
project_url: ''
category: genomics
motivation: 学习人类基因组上下文DNA语言模型
```

#### 📝 一句话总结
GROVER 提出一套面向 DNA 的上下文词汇学习与 BERT-style 预训练方法，用从人类基因组中学到的 k-mer 词表和 masked language modeling 捕获序列语义。它强调 tokenization 本身是基因组语言模型的核心部件，并展示学到的 DNA 词汇可对应 motif、promoter、CTCF 结合等功能信号。

#### 🎯 核心要点
- **基因组词汇学习**：不直接使用固定单碱基或任意 k-mer，而是从人类基因组语料中学习上下文相关 DNA tokens
- **BERT-style encoder**：将 DNA token 序列输入多层 Transformer encoder，通过双向上下文学习每个 token 的语义表示
- **Masked language modeling**：随机 mask DNA tokens，让模型根据上下游上下文恢复被遮蔽片段
- **上下文驱动 tokenization**：论文把 tokenizer 视为关键科学问题，比较不同词汇大小和 token 长度对下游性能与可解释性的影响
- **功能解释**：学到的 token 和 attention/attribution 可映射到已知 motif、promoter、CTCF binding site 与 enhancer-like regulatory sequence
- **下游任务覆盖**：用于 promoter 识别、transcription factor binding、chromatin/regulatory sequence 分类等人类基因组功能预测
- **来源修正**：任务 YAML 中的 Nature URL 无法对应到可访问论文页；实际可访问论文为 Nature Machine Intelligence `https://www.nature.com/articles/s42256-024-00872-0`

#### 🔬 深入细节
##### 模型示意图与可访问来源

![GROVER framework overview](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs42256-024-00872-0/MediaObjects/42256_2024_872_Fig1_HTML.png)
*图：Nature Machine Intelligence Fig. 1。GROVER 从人类基因组构建 DNA 词汇，预训练 Transformer 语言模型，并把学到的表示用于功能序列预测和解释。*

可访问来源说明：任务 YAML 保留了给定 `paper_url`；我实际核对的公开论文页是 `https://www.nature.com/articles/s42256-024-00872-0`，论文代码/数据入口可从该 Nature 页面关联的补充材料与项目资源追溯。

##### 算法伪代码

```python
# GROVER 简化流程：学习 DNA 词汇 -> MLM 预训练 -> 下游微调
def learn_genome_vocabulary(genome, initial_kmers, vocab_size):
    vocab = set(initial_kmers)
    tokenized = tokenize_with_current_vocab(genome, vocab)

    while len(vocab) < vocab_size:
        candidates = collect_candidate_extensions(tokenized)
        # 选择最能提升上下文可预测性的 DNA 片段作为新 token
        best_token = argmax(candidates, score_by_context_prediction)
        vocab.add(best_token)
        tokenized = tokenize_with_current_vocab(genome, vocab)
    return vocab


def pretrain_grover(genome_windows, tokenizer, transformer):
    for seq in genome_windows:
        tokens = tokenizer.encode(seq)
        masked, mask_positions, labels = mask_random_tokens(tokens)

        hidden = transformer(masked)
        loss = 0.0
        for pos, label in zip(mask_positions, labels):
            loss += cross_entropy(mlm_head(hidden[pos]), label)
        optimizer.step(loss)


def finetune_for_function(seq, tokenizer, transformer, classifier):
    tokens = tokenizer.encode(seq)
    hidden = transformer(tokens)
    pooled = pool_or_cls(hidden)
    return classifier(pooled)
```

##### 动机：DNA 语言模型不只是换一个 BERT

DNA 与自然语言相似的一点是：同一短片段在不同上下文中可以有不同功能。例如一个 TF motif 是否真正结合，取决于周围可及性、协同 motif、方向、间距和所在调控区域；一个 promoter-like 片段也需要在更长上下文中才有意义。传统 one-hot CNN 能识别局部 motif，但 token 粒度通常固定在碱基或手工 k-mer；早期 DNA BERT 模型使用固定 k-mer，又会带来词表膨胀和重叠泄漏。

GROVER 的核心立场是：基因组语言模型的“词”不应完全手工指定。设 DNA 序列为：

$$
x = x_1x_2\cdots x_L,\quad x_i\in\{A,C,G,T\}
$$

tokenizer 把它切分为可变片段：

$$
\tau(x) = (t_1,t_2,\ldots,t_n),
\quad
t_i \in \mathcal{V}_{\mathrm{DNA}}
$$

如果 \(\mathcal{V}_{\mathrm{DNA}}\) 学得好，常见 regulatory words、重复片段、motif-like segments 会成为稳定 token；如果词表过粗或过细，模型要么丢失细粒度碱基信息，要么在过长 token 序列上浪费注意力。

##### 词汇学习与上下文目标

GROVER 的词汇学习可以抽象为选择一组 DNA tokens，使 token 在基因组上下文中具有高可预测性和功能可解释性。对候选 token \(w\)，可用上下文窗口 \(c(w)\) 衡量它是否能由周围序列可靠预测：

$$
s(w) =
\mathbb{E}_{(w,c)}
\left[
\log p_\phi(w\mid c(w))
\right]
$$

词表构建的目标可以写成：

$$
\mathcal{V}^{\*}
= \arg\max_{\mathcal{V}:|\mathcal{V}|=K}
\sum_{w\in\mathcal{V}} s(w)
$$

这个公式不表示实现必须穷举搜索，而是说明 GROVER 的 tokenizer 不是任意切分：它偏向选择在真实基因组上下文中重复出现、可由上下文解释、且可能承载功能信息的片段。这样得到的 token 更接近“基因组词汇”，而不是机械滑窗。

##### Transformer 预训练与 MLM 损失

给定 token 序列 \(\mathbf{t}\)，GROVER 使用 masked language modeling 预训练。随机选择 mask 集合 \(\mathcal{M}\)，模型看到被遮蔽后的序列 \(\tilde{\mathbf{t}}\)，目标是恢复原 token：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \tilde{\mathbf{t}})
$$

Transformer encoder 的自注意力为：

$$
H^{(\ell+1)}
= \mathrm{TransformerBlock}(H^{(\ell)}),
\quad
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

双向上下文对基因组很重要：一个 promoter token 的意义可能同时由上游 TATA-like signal、下游 transcription start site 邻域和远端 regulatory composition 决定。MLM 迫使模型把两侧上下文压入隐藏表示，而不是只学习左到右的序列生成。

##### 功能预测与解释方式

下游微调时，GROVER 把序列级表示输入分类 head。若任务是判断某 DNA 片段是否为 promoter 或 TF binding site，可写作：

$$
h_{\mathrm{seq}} = \mathrm{Pool}(H),
\quad
\hat{y} = \sigma(W h_{\mathrm{seq}} + b)
$$

训练损失是二分类交叉熵：

$$
\mathcal{L}_{\mathrm{BCE}}
= -y\log\hat{y}-(1-y)\log(1-\hat{y})
$$

可解释性来自两层映射。第一层是 token 本身：如果某些 token 频繁对应已知 motif 或 regulatory element，说明 tokenizer 学到了生物学上稳定的片段。第二层是模型 attribution：把 attention、gradient 或 occlusion 分数从 token 映射回碱基区间，定位哪些 DNA words 驱动了预测。对 CTCF 等任务，这种映射能检查高分 token 是否落在已知结合 motif 附近。

##### 与 DNABERT/DNABERT-2 的区别

DNABERT 的重点是证明 BERT + k-mer 可迁移到 DNA；DNABERT-2 的重点是用 BPE 和 ALiBi 提高效率与多物种泛化；GROVER 更强调“词汇学习”本身是建模对象。它不是只追求更长上下文或更大模型，而是问一个更基础的问题：什么样的 DNA 片段应该成为语言模型的 token？

| 维度 | DNABERT | DNABERT-2 | GROVER |
|------|---------|-----------|--------|
| token 粒度 | 固定重叠 k-mer | BPE 可变长 token | 从人类基因组上下文学习 DNA 词汇 |
| 主要动机 | 把 BERT 引入 DNA | 提升效率、泛化和长序列外推 | 让 tokenization 更符合基因组语义 |
| 预训练目标 | MLM | MLM | MLM 与词汇上下文学习 |
| 解释重点 | attention/motif | benchmark 泛化 | DNA words 与功能元件对应关系 |

##### 局限与使用边界

GROVER 的优势来自人类基因组上下文，因此它对人类调控序列任务最自然；跨物种、超长结构变异和单细胞条件特异调控仍需要额外数据或模型设计。另一个边界是 tokenization 可解释性不等于因果机制：一个 token 与 motif 或 promoter 信号相关，说明模型捕获了统计规律，但仍需 reporter assay、CRISPR perturbation 或 eQTL/sQTL 数据来验证真实功能。

> 💡 关键：GROVER 把 DNA language model 的关键问题前移到 tokenizer：如果 DNA “词”学得更像真实基因组上下文中的功能片段，后续 Transformer 表示和下游解释都会更有生物学意义。

#### 🧪 练习题
```yaml
question: "GROVER 相比固定 k-mer DNA BERT 的核心关注点是什么？"
options:
  - "从基因组上下文中学习更有语义的 DNA token，而不是完全依赖手工固定 k-mer"
  - "只使用 CNN，不使用 Transformer"
  - "只预测蛋白质三维结构，不处理 DNA 序列"
  - "用随机词表替代 masked language modeling"
answer: 0
explain: "GROVER 的核心是把 DNA tokenization 作为建模问题：通过基因组上下文学习 DNA words，再用 MLM 训练 Transformer 表示，用于功能预测和解释。"
```

### Evo

```yaml
id: evo
num: 26
name: Evo
full_name: Evo (Evo)
year: '2024.11'
org: Arc Institute
parent: —
paper_url: https://www.science.org/doi/10.1126/science.ado9336
project_url: ''
category: genomics
motivation: 长上下文分子到基因组尺度预测
```

#### 📝 一句话总结
Evo 提出了一个 7B 参数、单核苷酸 byte-level、131k 上下文的自回归基因组基础模型，用 StripedHyena 长序列架构解决传统 Transformer 在全基因组尺度建模时上下文成本过高的问题。它把 DNA 作为统一输入层，在同一模型中覆盖 DNA、RNA、蛋白质功能预测、CRISPR-Cas/转座系统生成和基因组尺度序列生成。

#### 🎯 核心要点
- **长上下文单碱基建模**：以 A/C/G/T/N 等 byte-level token 处理 DNA，最大训练上下文达到 131,072 tokens，保留单核苷酸分辨率
- **StripedHyena 架构**：采用 29 层 data-controlled Hyena convolution 与 3 层多头注意力交错的混合架构，注意力层约占 10%，并使用 RoPE
- **OpenGenome 预训练**：在约 300B nucleotide tokens 的原核 whole-genome 数据上训练，覆盖细菌、古菌、预测噬菌体和质粒序列，并排除感染真核宿主的病毒序列
- **两阶段上下文扩展**：先以 8,192 tokens 上下文训练基础模型，再扩展到 131,072 tokens 以支持基因组尺度推理和生成
- **自回归目标函数**：用 next-token prediction 学习 \(p_\theta(x_t\mid x_{<t})\)，无需功能标签、基因注释或手工划分 DNA/RNA/protein 片段
- **DNA scaling laws**：论文系统比较 Transformer++、Mamba、Hyena 与 StripedHyena，在 DNA byte-level 预训练中观察到规模扩大带来的可预测 perplexity 改善
- **跨模态零样本预测**：在蛋白突变效应、非编码 RNA 突变效应、调控 DNA 与 gene essentiality 等任务上使用序列 likelihood 或差异分数进行预测
- **系统级生成设计**：微调后生成 CRISPR-Cas protein-RNA 复合系统和 IS200/IS605 protein-DNA 转座系统，并报告了实验功能验证
- **基因组尺度生成**：131k 版本可生成具有较高 coding density、tRNA/rRNA 等基因组结构信号的长 DNA 序列；正式论文报告超过 1 Mb 的生成能力，Arc 早期页面也给出 over 650k tokens 量级说明

#### 🔬 深入细节
##### 方法示意图

![Evo StripedHyena architecture](https://arcinstitute.org/blog/evo/arch.png)
*图：Arc Institute Evo 页面给出的 StripedHyena 架构示意。输入 DNA 序列进入由 Hyena operator 与少量 rotary attention 组成的混合模型，输出下一个 nucleotide 的概率分布。Science 论文 Figure 1 还系统展示了 DNA 作为统一模态、OpenGenome 训练集与 scaling law；PMC 页面可访问正文与图注。*

来源说明：论文正式版本为 `https://www.science.org/doi/10.1126/science.ado9336`；可访问正文备份见 `https://pmc.ncbi.nlm.nih.gov/articles/PMC12057570/`；官方模型与代码见 `https://github.com/evo-design/evo`；Arc 介绍页见 `https://arcinstitute.org/news/evo`。

##### 算法伪代码

```python
# Evo 预训练与生成伪代码
def pretrain_evo(open_genome_sequences, model, context_len):
    for dna in stream_windows(open_genome_sequences, length=context_len):
        # byte-level tokenizer: A/C/G/T/N 等字符直接成为 token
        tokens = tokenize_bytes(dna)

        # 自回归语言建模：用前缀预测下一个碱基
        logits = model(tokens[:-1])
        labels = tokens[1:]
        loss = cross_entropy(logits, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def extend_context(base_model, long_windows):
    model = load(base_model)  # evo-1-8k-base
    return pretrain_evo(long_windows, model, context_len=131072)


def score_variant(model, wt_seq, mut_seq):
    # 用序列 log likelihood 差值估计突变影响
    return log_prob(model, mut_seq) - log_prob(model, wt_seq)


def generate_genomic_sequence(model, prompt, max_new_tokens, temperature=1.0, top_k=4):
    tokens = tokenize_bytes(prompt)
    for _ in range(max_new_tokens):
        logits = model(tokens[-model.context_len:])
        next_token = sample_top_k(logits[-1], k=top_k, temperature=temperature)
        tokens.append(next_token)
    return detokenize_bytes(tokens)
```

##### 动机：为什么不是普通 Transformer DNA 模型

基因组建模的难点不是“把 DNA 当文本”本身，而是 DNA 的有效上下文和分辨率同时很极端。基因调控、CRISPR 免疫、转座系统和原核 operon 都依赖相隔数千到数十万碱基的多元素协同；但单个 SNP 又可能改变蛋白功能、RNA 结构或调控位点。早期 DNA BERT 类模型常用 k-mer 或 BPE 缩短序列长度，代价是损失单碱基精度；密集 Transformer 若直接处理 byte-level DNA，注意力复杂度随长度近似二次增长：

$$
\mathrm{Cost}_{\mathrm{attn}} = O(L^2d)
$$

其中 \(L\) 是上下文长度、\(d\) 是 hidden dimension。当 \(L=131{,}072\) 时，纯 dense attention 在训练和推理上都非常昂贵。Evo 的核心工程判断是：DNA 序列中大量局部 motif、重复片段和长程共变可以由长卷积/信号处理算子高效捕获，而少量注意力层负责补充精确 token 交互和 recall。

##### StripedHyena 混合层机制

Evo 使用的 StripedHyena 是一种混合 sequence model。Hyena operator 可以理解为 input-dependent long convolution：模型先通过门控和短卷积生成调制信号，再用长卷积核在很长序列范围内混合信息。一个简化写法是：

$$
y = W_o\left(v \odot (h_\theta(x) * u)\right)
$$

其中 \(*\) 表示沿序列维度的卷积，\(h_\theta(x)\) 是由输入或位置参数化的长滤波器，\(\odot\) 是门控乘法。与固定 CNN 卷积核不同，Hyena 的滤波过程可随输入调制；与全注意力不同，它避免了 \(L^2\) 的 token-token 矩阵。

论文报告的 Evo 主体由 29 个 Hyena layers 与 3 个 multi-head attention layers 交错构成，attention 层使用 RoPE 编码相对位置信息。直觉上，Hyena 层负责在几十 kb 范围内聚合局部 motif、重复结构和 coding pattern，attention 层负责少量需要显式召回的长程依赖。这个结构解释了为什么 Evo 能在 byte-level 分辨率下扩展到 131k context，而不是必须把 DNA 聚合成粗粒度 token。

##### 预训练目标与 perplexity

Evo 的训练目标是标准自回归负对数似然。给定 DNA token 序列 \(x_1,\ldots,x_L\)，模型最小化：

$$
\mathcal{L}_{\mathrm{CLM}}(\theta)
= -\sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

对应的序列 log likelihood 为：

$$
\log p_\theta(x_{1:L})
= \sum_{t=1}^{L-1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

perplexity 可写为：

$$
\mathrm{PPL}(x)
= \exp\left(\frac{1}{L-1}\mathcal{L}_{\mathrm{CLM}}(\theta)\right)
$$

论文用这一指标做 DNA scaling law 分析，并比较 Transformer++、Mamba、Hyena、StripedHyena 等架构。关键结论不是单个模型分数，而是 byte-level DNA 上也出现类似 NLP 的尺度规律：模型规模、数据规模、计算预算合理扩展时，evaluation perplexity 可预测下降；同时 StripedHyena 在该设置下比密集 Transformer 更适合长上下文单碱基建模。

##### OpenGenome 与两阶段训练流程

OpenGenome 的设计决定了 Evo 的能力边界。预训练数据来自 GTDB 细菌/古菌基因组、IMG/VR 原核病毒、IMG/PR 质粒等来源，论文正文描述其覆盖约 300B nucleotide tokens，并包含超过 80,000 个细菌和古菌基因组以及数百万预测噬菌体和质粒序列。出于安全考虑，作者排除了感染真核宿主的病毒基因组。

训练分两步：第一步在 8,192 token context 上训练 `evo-1-8k-base`，用于分子尺度和系统尺度任务；第二步从 8k checkpoint 继续做 context extension，训练 `evo-1-131k-base`，用于 whole-genome 级别推理与采样。这个流程类似长上下文 LLM 的扩窗策略：先在较短上下文内学稳定的局部语法和 motif，再让模型适配更长序列的位置编码、卷积核和生成状态。

##### 预测：用 likelihood 差值读出生物效应

自回归模型不直接输出“这个突变是否有害”，但它能输出某个序列在训练分布下的概率。对于突变预测，可以比较野生型和突变型序列在同一上下文窗口中的 log likelihood：

$$
\Delta_{\mathrm{mut}}
= \log p_\theta(x^{\mathrm{mut}}) - \log p_\theta(x^{\mathrm{wt}})
$$

若突变破坏了高保守 coding pattern、RNA 结构序列或调控 motif，模型通常会给突变序列更低 likelihood。对单点突变，也可以只比较突变位置的条件概率：

$$
\Delta_t
= \log p_\theta(x_t^{\mathrm{alt}}\mid x_{<t})
- \log p_\theta(x_t^{\mathrm{ref}}\mid x_{<t})
$$

Evo 的特别之处在于它并非分别训练蛋白、RNA、调控 DNA 模型，而是在原始基因组 DNA 上学习所有这些信号。coding sequence 通过密码子翻译约束携带蛋白信息，非编码区携带 RNA 和调控信息，长上下文还保留 operon 与系统级共变。

##### 生成：从单分子到多元素系统

生成时，Evo 逐 token 采样 DNA。对于 CRISPR-Cas 任务，作者在 CRISPR-Cas loci 上微调 8k 模型，并使用 `cas9`、`cas12`、`cas13` 等条件 token 引导生成。模型需要同时生成 Cas 蛋白编码序列、CRISPR array、tracrRNA/crRNA 等非编码组件，这本质上是 protein-RNA codesign，而不是单个蛋白序列设计。

对于 IS200/IS605 转座系统，模型需要生成转座酶蛋白与 terminal element DNA 之间的匹配关系，属于 protein-DNA codesign。论文报告了生成系统的实验验证，这说明 Evo 的长上下文 likelihood 不只捕获单个 motif，还能捕获多个相邻遗传元件之间的协同约束。

##### 与 DNABERT、NT、HyenaDNA 的区别

DNABERT 和 Nucleotide Transformer 主要是 encoder-style masked language model，适合抽取序列表征并微调到分类任务；HyenaDNA 证明了单核苷酸长上下文建模可行，但规模和训练数据远小于 Evo。Evo 的定位更接近 biological GPT：它以自回归方式建模 whole-genome 分布，天然支持长序列生成、条件续写、likelihood-based variant scoring 和系统级 DNA 设计。

> 💡 关键：Evo 的贡献不是单纯“更大的 DNA 模型”，而是把单碱基分辨率、131k 训练上下文、OpenGenome whole-genome 数据和 StripedHyena 长序列算子组合成一个可预测也可生成的基因组级语言模型。

#### 🧪 练习题
```yaml
question: "Evo 为什么采用 StripedHyena 混合架构而不是纯 dense Transformer？"
options:
  - "为了在单核苷酸分辨率下高效处理 131k 级上下文，同时保留少量注意力层处理精确长程交互"
  - "为了把 DNA 序列固定切成不可重叠 6-mer，降低词表大小"
  - "为了只做分类任务，避免自回归生成"
  - "为了完全去掉位置编码，使模型不区分碱基顺序"
answer: 0
explain: "纯 dense attention 的计算随长度近似二次增长；StripedHyena 用长卷积/门控算子承担大部分序列混合，并保留少量 RoPE attention，使 Evo 能在 byte-level DNA 上扩展到长上下文。"
```

### Nucleotide Transformer

```yaml
id: nucleotide_transformer
num: 27
name: Nucleotide Transformer
full_name: Nucleotide Transformer (Nucleotide Transformer)
year: '2025.01'
org: InstaDeep
parent: —
paper_url: https://www.nature.com/articles/s41592-024-02523-z
project_url: ''
category: genomics
motivation: 3202基因组预训练基础模型
```

#### 📝 一句话总结
Nucleotide Transformer 系统构建并评估了一族 50M 到 2.5B 参数的 DNA masked language models，用 3,202 个人类基因组和 850 个物种基因组预训练，解决基因组任务标注稀缺和跨任务迁移困难的问题。论文的核心贡献是把大规模预训练、18 个下游基准、注意力解释和功能变异优先级评估放进同一套可复现实验框架。

#### 🎯 核心要点
- **模型族而非单一模型**：包括 Human ref 500M、1000G 500M、1000G 2.5B、Multispecies 2.5B，以及后续用于缩放分析的 50M 到 500M 小模型
- **多来源预训练数据**：1000G 方案整合 3,202 个遗传多样的人类基因组，multispecies 方案整合 850 个不同物种基因组
- **6-mer token 表示**：NT-v1 主线使用 6-mer token，一个 embedding 对应 6 个核苷酸；SpliceAI 适配中也将每个 token 的 embedding 映射回 6 个碱基标签
- **MLM 预训练目标**：随机 mask token，让 Transformer encoder 从双向上下文恢复原始 token，学习可迁移的 sequence embedding
- **两种下游使用方式**：probing 使用冻结层 embedding 训练 logistic regression/MLP；fine-tuning 替换 LM head 为分类或回归 head，并可用参数高效微调
- **18 个基因组任务基准**：覆盖 splice site、promoter、enhancer、histone modification、chromatin profile 等任务，并使用 tenfold cross-validation
- **与强基线比较**：和 DNABERT、Enformer、HyenaDNA、BPNet 等基础模型或任务专用模型比较，使用 MCC 作为跨任务主指标
- **可解释性分析**：通过 attention maps、t-SNE embedding、masked token reconstruction 观察模型是否关注 exon、intron、promoter、enhancer、CTCF、open chromatin 等元素
- **变异优先级评估**：对参考/替代等位基因构造 6,000 bp 窗口，比较 embedding 距离、masked loss 差异和微调分类分数，用于 eQTL、meQTL、ClinVar、HGMD 等变异集合排序

#### 🔬 深入细节
##### 方法示意图

![Nucleotide Transformer workflow](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41592-024-02523-z/MediaObjects/41592_2024_2523_Fig1_HTML.png)
*图：Nature Methods Figure 1。上半部分展示 tokenization、masking、Nucleotide Transformer encoder、LM head 和 masked token recovery；下半部分展示冻结/微调后的下游预测，以及不同模型在参数规模、perception field 与 18 个任务均值 MCC 上的比较。*

来源说明：论文正文、图、公式和方法可通过 Nature Methods 开放页面访问：`https://www.nature.com/articles/s41592-024-02523-z`；官方代码与模型入口见 `https://github.com/instadeepai/nucleotide-transformer`；InstaDeep 博客给出模型族和应用概览。

##### 算法伪代码

```python
# Nucleotide Transformer 预训练、probing 与微调伪代码
def to_6mers(seq):
    # 实际实现会处理 N、special tokens、padding 和长度对齐
    return [seq[i:i+6] for i in range(0, len(seq) - 5, 6)]


def pretrain_nt(genome_windows, encoder, lm_head, mask_rate=0.15):
    for seq in genome_windows:
        tokens = ["<CLS>"] + to_6mers(seq) + ["<EOS>"]
        masked_tokens, masked_pos, labels = mask_tokens(tokens, rate=mask_rate)

        hidden = encoder(masked_tokens)
        logits = lm_head(hidden[masked_pos])
        loss = cross_entropy(logits, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()


def probe_task(seq, frozen_encoder, probe):
    hidden = frozen_encoder(to_6mers(seq))
    features = mean_pool(select_layers(hidden))
    return probe(features)  # logistic regression 或小型 MLP


def finetune_task(seq, encoder, task_head):
    hidden = encoder(to_6mers(seq))
    pooled = mean_pool(hidden)
    y_hat = task_head(pooled)
    return y_hat
```

##### 为什么用 masked encoder 而不是只训练监督模型

基因组监督任务通常标注昂贵、任务碎片化，而且很多任务的标签只覆盖少量 cell type、组织或实验条件。传统 CNN/CNN-RNN 任务模型可以在单个任务上很好地拟合 motif，但难以在 splice、promoter、enhancer、histone mark、TF binding、variant effect 之间共享知识。NT 的策略是先用大规模无标签基因组做 MLM 预训练，让模型学习通用 DNA 统计结构，再把表征迁移到小标注任务。

MLM 目标可写为：

$$
\mathcal{L}_{\mathrm{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(t_i \mid \mathbf{t}_{\setminus \mathcal{M}})
$$

其中 \(\mathbf{t}\) 是 6-mer token 序列，\(\mathcal{M}\) 是被 mask 的 token 位置集合。由于 encoder 同时看左右上下文，它适合学习“一个局部片段在其双向基因组环境中是否合理”，这对 promoter、splice donor/acceptor 和增强子等判别任务很自然。

##### 6-mer token 与感受野

NT-v1 采用 6-mer token。若把 DNA 序列 \(x_1,\ldots,x_N\) 切成长度为 6 的 token，可以写为：

$$
t_j = x_{6j+1}x_{6j+2}\cdots x_{6j+6}
$$

因此一个长度为 \(N\) 的窗口会变成约 \(N/6\) 个 token。若模型最大处理 \(T\) 个 token，则 nucleotide-level perception field 近似为：

$$
R_{\mathrm{bp}} \approx 6T
$$

这种设计与 DNABERT 的重叠 k-mer 不同：它牺牲一部分逐碱基边界灵活性，换取更短序列长度和更高效的大模型训练。论文在 SpliceAI 任务中明确把每个 token embedding 映射为 6 个核苷酸的标签概率，说明 NT 的 token 表示仍能通过任务 head 回到 nucleotide-level 输出。

##### 模型族与数据设置

论文首先构造四个大模型设置：

- Human ref 500M：在人类参考基因组序列上预训练
- 1000G 500M：在 3,202 个遗传多样的人类基因组上预训练
- 1000G 2.5B：同样使用 3,202 人类基因组，但扩大到 2.5B 参数
- Multispecies 2.5B：在 850 个不同物种基因组上预训练，包含多个模式生物

随后作者又训练 50M 到 500M 的更小模型做缩放分析。这个设计让论文能同时回答三个问题：同等架构下，更多人类个体是否有帮助；同等数据下，更大模型是否有帮助；跨物种数据是否改善人类基因组任务泛化。论文结论倾向于“大数据 + 大模型 + 物种多样性”共同提升，尤其是 multispecies 训练对学习保守功能元素有价值。

##### 下游任务：probing 与 fine-tuning

NT 的下游使用分为 probing 和 fine-tuning。probing 冻结 Transformer，只取某些层的 embedding，再训练简单分类器：

$$
\hat{y} = g_\phi(\mathrm{Pool}(H_\ell))
$$

其中 \(H_\ell\) 是第 \(\ell\) 层 hidden states，\(g_\phi\) 可以是 logistic regression 或 MLP。probing 的意义是检测预训练表征本身是否线性可分，而不是追求最高性能。

fine-tuning 则替换 LM head 为任务 head，并更新部分或全部参数：

$$
\mathcal{L}_{\mathrm{sup}}
= -\sum_{c=1}^C y_c \log \hat{y}_c
$$

对于 chromatin profile 这种多标签任务，论文在 DeepSEA 数据上使用 919 个独立分类头，对 690 个 TF、125 个 DNase 和 104 个 histone features 取平均交叉熵，并对正样本 loss 加权以处理类别不平衡。对于 splice site，模型需要为每个 nucleotide 输出 acceptor、donor 或 none，任务 head 会把 6-mer embedding 展开成 6 个位置的三分类输出。

##### Masked reconstruction、attention 与功能解释

为了分析模型学到了什么，论文不只报告下游分数，还计算 masked token reconstruction。给定 masked 位置集合 \(\mathcal{P}_{\mathrm{masked}}\)，可定义恢复准确率：

$$
\mathrm{acc}(\theta,\mathbf{s})
= \frac{1}{|\mathcal{P}_{\mathrm{masked}}|}
\sum_{i\in\mathcal{P}_{\mathrm{masked}}}
\mathbf{1}\left[
\arg\max_{\mathrm{tok}\in\mathcal{V}}
p_\theta(\mathrm{tok}\mid \mathbf{s}_{\setminus i})
= s_i
\right]
$$

也可以用 masked loss 的指数作为伪 perplexity：

$$
\mathrm{PPL}_{\mathrm{MLM}}(\theta,\mathbf{s})
= \exp\left(
-\frac{1}{|\mathcal{P}_{\mathrm{masked}}|}
\sum_{i\in\mathcal{P}_{\mathrm{masked}}}\log p_\theta(s_i\mid \mathbf{s}_{\setminus i})
\right)
$$

attention 解释则计算一个 attention head 对某类功能元素的关注比例。若 \(f(i)=1\) 表示 token \(i\) 与某个 genomic element 重叠，论文使用类似指标：

$$
p_\alpha(f)
= \frac{1}{|\mathbf{X}|}
\sum_{\mathbf{x}\in\mathbf{X}}
\frac{\sum_i\sum_j f(i)\mathbf{1}(\alpha(i,j)>\mu)}
{\sum_i\sum_j \mathbf{1}(\alpha(i,j)>\mu)}
$$

这个指标用于检查注意力是否集中在 5' UTR、3' UTR、exon、intron、enhancer、promoter、CTCF binding site、open chromatin 和 TF binding sites 等元素上。核心直觉是：如果一个无监督 MLM 的注意力头反复指向功能元素，则说明它在恢复 token 时学到了某种基因组语法，而不只是碱基组成偏好。

##### 变异优先级：从 embedding 空间比较等位基因

对 SNP 影响评估，NT 构造以突变位点为中心的 6,000 bp 序列，分别放入 reference allele 与 alternative allele，得到两个序列表征 \(z_{\mathrm{ref}}\) 与 \(z_{\mathrm{alt}}\)。论文比较多种 zero-shot scores：

$$
d_1 = \lVert z_{\mathrm{alt}} - z_{\mathrm{ref}}\rVert_1,\qquad
d_2 = \lVert z_{\mathrm{alt}} - z_{\mathrm{ref}}\rVert_2
$$

$$
\mathrm{cos}(z_{\mathrm{ref}}, z_{\mathrm{alt}})
= \frac{z_{\mathrm{ref}}^\top z_{\mathrm{alt}}}
{\lVert z_{\mathrm{ref}}\rVert_2\lVert z_{\mathrm{alt}}\rVert_2}
$$

还可以比较 alternative 与 reference 序列的 masked loss：

$$
\Delta_{\mathrm{loss}}
= \mathcal{L}_{\mathrm{MLM}}(x_{\mathrm{alt}})
- \mathcal{L}_{\mathrm{MLM}}(x_{\mathrm{ref}})
$$

若一个变异显著改变 NT 的 embedding 或 reconstruction loss，它更可能改变功能元件语法。论文进一步用 eQTL、meQTL、ClinVar、HGMD 与 1000G common SNP 构造正负样本，评估 zero-shot 与 fine-tuned scores 对功能变异的排序能力。

##### 与 DNABERT、Enformer、HyenaDNA 的区别

DNABERT 是早期 BERT-style k-mer DNA 模型，更强调 k-mer MLM 在多个监管任务上的迁移；Enformer 是任务专用的长程 expression/regulatory predictor，强在监督建模；HyenaDNA 是单核苷酸长上下文模型，强调 efficient long-range modeling。NT 的论文重点是系统化：模型族规模从 50M 到 2.5B，数据源从单参考到 3,202 人类基因组和 850 物种，评估覆盖 18 个 curated tasks、attention 解释和 variant prioritization。

> 💡 关键：Nucleotide Transformer 的价值不只在某个排行榜分数，而在证明“基因组大规模 MLM 预训练 + 标准化基准 + 解释性分析”可以成为人类基因组表征学习的一套通用工作流。

#### 🧪 练习题
```yaml
question: "Nucleotide Transformer 预训练中 masked language modeling 的主要作用是什么？"
options:
  - "让 encoder 从双向基因组上下文恢复被遮蔽的 6-mer token，从而学习可迁移序列表征"
  - "让模型只能从左到右生成全基因组序列"
  - "把所有 DNA 序列翻译为蛋白质后再训练"
  - "避免在下游任务中使用任何标注数据"
answer: 0
explain: "NT 是 encoder-style MLM；预训练学习的是上下文相关 embedding，下游仍可通过 probing 或 fine-tuning 使用标注数据。"
```

### Nucleotide GPT

```yaml
id: nucleotide_gpt
num: 28
name: Nucleotide GPT
full_name: Nucleotide GPT (Nucleotide GPT)
year: '2026.01'
org: McLaughlin et al.
parent: —
paper_url: https://academic.oup.com/bib/article/27/1/bbag011/8456488
project_url: ''
category: genomics
motivation: 解码器架构单核苷酸分辨率模型
```

#### 📝 一句话总结
Nucleotide GPT 提出了一个 LLaMA-style decoder-only DNA 语言模型，用单核苷酸 token 和 causal language modeling 研究基因组预训练到底学到了什么。论文特别聚焦 repetitive elements 的训练权重，发现适度下调重复序列 loss 能提升下游分类，同时 SAE 解释显示模型大量表征容量会被 LTR、LINE、SINE 等重复元素占据。

#### 🎯 核心要点
- **decoder-only 架构**：采用 LLaMA 风格 Transformer decoder，而不是 DNABERT/NT 常见的 encoder-only MLM 架构
- **单核苷酸 tokenization**：A/T/G/C 逐碱基作为 token，保留最高生物分辨率，并与重叠 6-mer、非重叠 6-mer 做系统比较
- **模型规模**：论文描述模型为 12 层、\(d_{\mathrm{model}}=2048\)、8 个 attention heads、key dimension 128，总参数约 511.8M
- **RoPE + RMSNorm + GeLU**：使用 RoPE 位置编码、RMSNorm、GeLU feed-forward，并用 FlashAttention 实现高效注意力
- **8192 bp 上下文**：在 GRCh38 人类参考基因组上用 8,192 bp 序列做 CLM 预训练，batch 为 16 条序列，训练 20,000 steps
- **重复元素加权预训练**：用 RepeatMasker 标注重复区域，对 RE token 的 loss 权重设置为 0.0、0.1、0.5、1.0，发现 0.5 权重整体最优或接近最优
- **七个 Genomic Benchmarks 任务**：覆盖 coding versus intergenic、Ensembl regulatory、non-TATA promoters、enhancers、OCRs、人/线虫分类等任务
- **预训练价值验证**：比较 pretrained fine-tuning、random initialization、linear baseline 与 linear probing，展示预训练带来的线性可分性和微调性能提升
- **SAE 解释性分析**：在 2048 维 residual stream 上训练 8192 维 sparse autoencoder，识别出与 LTR、LINE-1、SINE/Alu 等重复元素相关的稀疏特征
- **局限性结论**：论文支持预训练有效，但也指出普通 CLM 容易过度建模高频重复序列，未来需要更有生物归纳偏置的预训练和 tokenization

#### 🔬 深入细节
##### 方法示意图

![Nucleotide GPT workflow and architecture](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bib/27/1/10.1093_bib_bbag011/1/m_bbag011f1.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=g4wZTgWF5hxF~abVyub-MQvoXX8ej4UqTWfAPIsgksJ4j8ayNN1W2e8EuTNraAgKcLwmYuAANt0UwC3y4QuD1yapCxC~VFmoeirsQ5Te5SJnUnc0OXqqePRmiRhgCxQoHzNHYhzRLSBtkNEYXu~Uv2AjcQ6yZhxgJw4JOTLexrGov-TBC5JVmZIJeyOS1txZx~T6LSNhzNJTeYWqp2I7acYrsYiO~LcNkvkdGR1K8LnoXA2QhCjj4XOG8g~uweabvMVz6xd7NrGlAne~niqLfUcDuoPOZdU6qGDH6dyXPZLHMs96YcnK-ET2bDjHIZ86vC2yvxjHw4M5X2zOsRrptg__)
*图：Briefings in Bioinformatics Figure 1。左侧是预训练到监督微调的流程；右侧是 Nucleotide GPT 的单核苷酸输入、RoPE、12 层 Transformer block、RMSNorm、multi-head attention、GeLU FFN、output projection 架构。*

来源说明：Oxford Academic 论文页 `https://academic.oup.com/bib/article/27/1/bbag011/8456488` 可访问正文、图注和方法；预印本 PDF 见 bioRxiv `https://www.biorxiv.org/content/10.1101/2024.11.27.625761v1.full.pdf`。正式页的图片直链为 Oxford/Silverchair CDN 签名 URL。

##### 算法伪代码

```python
# Nucleotide GPT：重复元素加权 CLM 预训练与微调伪代码
def tokenize_single_nucleotide(seq):
    vocab = {"A": 0, "C": 1, "G": 2, "T": 3, "N": 4, "<pad>": 5}
    return [vocab.get(base, vocab["N"]) for base in seq]


def pretrain_ngpt(grch38_windows, repeatmasker_intervals, model, re_weight=0.5):
    for seq, chrom_start in grch38_windows:  # seq length = 8192 bp
        tokens = tokenize_single_nucleotide(seq)
        re_mask = overlap_repeatmasker(chrom_start, len(seq), repeatmasker_intervals)

        logits = model(tokens[:-1])          # decoder-only causal forward
        labels = tokens[1:]

        loss = 0.0
        for i, label in enumerate(labels):
            w_i = re_weight if re_mask[i + 1] else 1.0
            loss += w_i * cross_entropy(logits[i], label)

        optimizer.zero_grad()
        loss.backward()
        clip_gradients(model)
        optimizer.step()


def finetune_classifier(seq, pretrained_model, classifier):
    tokens = tokenize_single_nucleotide(seq)
    hidden = pretrained_model(tokens).hidden_states
    pooled = mean_pool(hidden)               # 或取任务指定层/位置
    return classifier(pooled)


def linear_probe(seq, frozen_model, probe):
    with no_grad():
        h = frozen_model(tokenize_single_nucleotide(seq)).hidden_states
    return probe(mean_pool(h))
```

##### 背景：为什么重新审视 decoder-only DNA 预训练

到 Nucleotide GPT 之前，DNA foundation model 的主流路径多为 BERT-style encoder：DNABERT、Nucleotide Transformer 用 masked language modeling 学双向表征，然后微调到分类任务。与此同时，部分研究质疑 genomic language model 的预训练收益，指出随机初始化模型或 one-hot probing 在一些监管任务上也可能很强。Nucleotide GPT 的问题意识很直接：如果预训练有价值，它到底来自架构、tokenization、CLM 目标，还是只是模型见过了大量重复序列？

因此论文选择 decoder-only CLM，并把 repetitive elements 作为核心变量。哺乳动物基因组中 RE 占比可达 30% 到 60%，且序列高度重复、统计模式强。如果不处理 RE，模型可能把大量容量用于预测常见 LTR、LINE、SINE 片段，从而降低对稀有但功能重要的 promoter、enhancer、splice signal 的学习。

##### 架构细节

Nucleotide GPT 把每个碱基作为一个 token：

$$
\mathbf{x} = (x_1,x_2,\ldots,x_L),\quad x_i\in\{A,C,G,T,N\}
$$

序列经过 input embedding 与 RoPE positional embedding 后进入 12 层 decoder block。论文给出的 RoPE 形式可理解为对 embedding 的二维子空间做位置相关旋转：

$$
\mathrm{RoPE}(x,\theta)
= [x_1\cos\theta - x_2\sin\theta,\;
x_1\sin\theta + x_2\cos\theta]
$$

每层 attention 使用 scaled dot-product：

$$
\mathrm{Attention}(Q,K,V)
= \mathrm{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

multi-head attention 为：

$$
\mathrm{MultiHead}(Q,K,V)
= \mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

其中 \(h=8\)、key dimension 为 128。FFN 使用 GeLU：

$$
\mathrm{FFN}(x)=\mathrm{GeLU}(xW_1)W_2
$$

RMSNorm 则写为：

$$
\mathrm{RMSNorm}(x)
= \frac{x}{\mathrm{RMS}(x)}\gamma,\qquad
\mathrm{RMS}(x)=\sqrt{\frac{1}{n}\sum_{i=1}^n x_i^2}
$$

论文的 block 更新可概括为 pre-norm residual 结构：

$$
x' = x + \mathrm{MHA}(\mathrm{RMSNorm}(x))
$$

$$
x_{\mathrm{out}} = x' + \mathrm{FFN}(\mathrm{RMSNorm}(x'))
$$

##### CLM 与重复元素加权损失

普通 causal language modeling 最小化：

$$
\mathcal{L}_{\mathrm{CLM}}
= -\sum_{t=1}^{L-1}
\log p_\theta(x_{t+1}\mid x_{\le t})
$$

Nucleotide GPT 引入 RepeatMasker 标注的 token 权重。若 \(r_t=1\) 表示位置 \(t\) 属于 repetitive element，且重复区域权重为 \(\lambda\)，则可写为：

$$
w_t =
\begin{cases}
\lambda, & r_t=1 \\
1, & r_t=0
\end{cases}
$$

加权 CLM 损失为：

$$
\mathcal{L}_{\mathrm{RE}}
= -\sum_{t=1}^{L-1}
w_{t+1}\log p_\theta(x_{t+1}\mid x_{\le t})
$$

论文实验了 \(\lambda\in\{0.0,0.1,0.5,1.0\}\)。\(\lambda=0.0\) 等价于完全不让 RE token 对 loss 贡献梯度；\(\lambda=1.0\) 等价于不降权。结果显示 \(\lambda=0.5\) 在七个下游分类任务上整体最稳，说明完全忽略重复元素会丢失有功能意义的重复序列信息，但不降权又容易让高频重复模式主导预训练。

> 💡 关键：这里的 RE weighting 不是数据清洗小技巧，而是论文的核心科学问题：基因组预训练模型到底是在学习广义功能语法，还是在优先压缩最常见的重复序列。

##### 单核苷酸 token 与 6-mer token 对比

论文比较三种 tokenization：single-nucleotide、overlapping 6-mer、non-overlapping 6-mer。6-mer 能把短 motif 编码进 token，但也引入词表膨胀和边界/重叠问题；单核苷酸 token 序列更长，却保留碱基级突变、剪接位点和 motif 边界。下游表中 single-nucleotide 在 coding/intergenic、non-TATA promoter、enhancer 等任务上表现稳定，论文据此认为单碱基分辨率是合理设计。

可以把二者差异写成：

$$
\text{single token: } t_i=x_i
$$

$$
\text{overlap 6-mer: } t_i=x_i x_{i+1}\cdots x_{i+5}
$$

单核苷酸 token 的优势是变异打分自然对齐到 \(x_i\)，不会出现一个 SNP 同时改变多个重叠 k-mer token 的解释问题；代价是上下文长度同样为 8192 token 时，它只覆盖 8192 bp，而非 k-mer 压缩后的更长 nucleotide span。

##### 微调、随机初始化与 linear probing

论文不仅报告 pretrained model 的微调分数，还与两个关键对照比较：同架构随机初始化后直接监督训练、以及 one-hot/linear baseline。若预训练只是参数初始化技巧，那么随机初始化经过微调可能接近；若预训练真的学到了可迁移表征，冻结中间层后做 linear probing 也应当具有较好线性可分性。

linear probing 的形式可以写为：

$$
z = \mathrm{MeanPool}(H_\ell),\qquad
\hat{y} = \mathrm{softmax}(Wz+b)
$$

论文发现 pretrained representations 在许多任务上即使微调前也有较强线性可分性；pretrained fine-tuning 相比 random initialization 在多个 Genomic Benchmarks 任务上有明显收益。与 DNABERT、HyenaDNA、Nucleotide Transformer 对比时，Nucleotide GPT 在七个任务中的四个取得最高 accuracy，说明 decoder-only + single-nucleotide + 合理 RE weighting 可以成为 MLM 之外的有效路线。

##### SAE 解释：模型学到了哪些重复元素

为了理解内部表征，作者在 pretrained 0.5-weighted Nucleotide GPT 的 residual stream activation 上训练 sparse autoencoder：

$$
z = \sigma(W_{\mathrm{enc}}h + b_{\mathrm{enc}})
$$

$$
\hat{h} = W_{\mathrm{dec}}z + b_{\mathrm{dec}}
$$

训练目标通常包含重构误差与稀疏惩罚：

$$
\mathcal{L}_{\mathrm{SAE}}
= \lVert h-\hat{h}\rVert_2^2 + \beta\lVert z\rVert_1
$$

论文将 2048 维 activation 扩展到 8192 维稀疏 latent features，并通过序列比对/注释解释激活强的 feature。结果中出现了 LTR retrotransposons、LINE-1 不同子区域、SINE/Alu 等 RE-associated features。这既说明模型学到了可解释生物模式，也暴露了一个风险：即便 RE loss 已降权，重复元素仍可能占用大量表征空间。

##### 与 DNABERT、Nucleotide Transformer、Evo 的关系

DNABERT 与 Nucleotide Transformer 是 encoder-style 模型，重点在双向上下文 embedding 和微调分类；Evo 是更大规模的自回归 whole-genome 模型，强调长上下文和生成。Nucleotide GPT 介于两者之间：它采用 GPT 式 CLM，但规模和实验设计更聚焦于“预训练是否有用、重复元素是否主导学习、单核苷酸 token 是否优于 k-mer”这些机制问题。

因此，Nucleotide GPT 的主要贡献不是刷新最大模型规模，而是提供了一个受控实验框架：固定 LLaMA-style decoder 架构，系统改变 RE loss 权重和 tokenization，再用微调、linear probing、SAE 解释与跨模型比较检验预训练价值。

#### 🧪 练习题
```yaml
question: "Nucleotide GPT 中 repetitive element loss 权重设为 0.5 的主要动机是什么？"
options:
  - "完全删除所有重复元素，避免模型看到任何 LINE 或 SINE 序列"
  - "适度降低高频重复区域对 CLM 损失的支配，同时保留其中可能有功能意义的序列信息"
  - "把单核苷酸 token 强制转换成非重叠 6-mer"
  - "让模型从双向上下文预测 masked token"
answer: 1
explain: "论文发现完全排除 RE 会损失有用信号，不降权又会让重复序列主导预训练；0.5 权重在多个下游任务上整体最稳。"
```

### Evo 2

```yaml
id: evo2
num: 29
name: Evo 2
full_name: Evo 2 (Evo 2)
year: '2026.04'
org: Arc Institute
parent: evo
paper_url: https://www.nature.com/articles/s41586-026-10176-5
project_url: ''
category: genomics
motivation: 9万亿碱基对全生命域基因组建模
```

#### 📝 一句话总结
Evo 2 提出了一个以单核苷酸为 token、可扩展到 1 Mb 上下文的全生命域基因组基础模型，用自回归序列建模同时支持变异效应预测、基因组片段表征和 genome-scale 序列生成。它把 Evo 系列从主要面向原核基因组扩展到细菌、古菌、真核和噬菌体等多类序列，并通过 StripedHyena 2 架构降低超长 DNA 建模的计算瓶颈。

#### 🎯 核心要点
- **单核苷酸分辨率**：直接对 DNA 字符序列建模，不把序列压缩成 k-mer，因此可对 SNV、indel、剪接位点和非编码调控变异做细粒度打分
- **OpenGenome2 训练集**：使用跨细菌、古菌、真核和噬菌体的高质量非冗余基因组集合，Evo 2 40B 消耗约 9.3 万亿训练 token
- **两阶段长上下文训练**：先在 8,192 token 上下文预训练，再在 midtraining 中逐步扩展到 1,000,000 token，以覆盖从启动子、基因、TAD 到染色体片段的多尺度依赖
- **StripedHyena 2 架构**：用 short explicit、medium regularized、long implicit Hyena operator 与注意力/门控/MLP 组合，在百万级上下文上比标准 Transformer 更高效
- **零样本变异效应预测**：通过野生型与突变序列的 log-likelihood 差值评价突变是否降低自然序列概率，覆盖蛋白编码、RNA、剪接和非编码变异
- **嵌入可迁移**：中间层表示可用于外接 exon classifier、BRCA1 监督分类器等轻量任务头，通常比仅用最终层 embedding 更稳健
- **可解释性与生成**：稀疏自编码器揭示 exon-intron 边界、TF binding site、蛋白结构片段和 prophage 区域等特征；生成侧支持线粒体、原核和真核序列片段设计
- **开放发布**：论文、模型权重、推理代码、训练相关代码和 OpenGenome2 数据说明均有公开入口；同时训练集排除感染真核宿主的病毒序列以降低生物安全风险

#### 🔬 深入细节
##### 模型总览图

![Evo 2 overview](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-026-10176-5/MediaObjects/41586_2026_10176_Fig1_HTML.png)
*图：Evo 2 论文 Figure 1。图中同时展示应用层、OpenGenome2 数据分布、8k 到 1M context 的训练计划、StripedHyena 2 block 以及长上下文 recall 评估。*

论文正文可从 Nature 页面访问，官方项目页为 `https://arcinstitute.org/tools/evo`，推理与示例代码位于 `https://github.com/ArcInstitute/evo2`。GitHub README 还给出 7B、20B、40B、base 和 262k context 等不同 checkpoint 的使用方式。

##### 算法伪代码

```python
# Evo 2 训练、变异打分与生成的简化流程
def causal_pretrain_evo2(genome_stream, model, tokenizer):
    for seq in sample_open_genome2_windows(genome_stream):
        ids = tokenizer.tokenize(seq)                 # A/C/G/T/N 等单核苷酸 token
        logits = model(ids[:-1])                      # StripedHyena 2 causal LM
        labels = ids[1:]
        loss = cross_entropy(logits, labels)
        optimizer.step(loss)


def extend_context_midtraining(model, genome_stream, context_schedule):
    for L in context_schedule:                        # 8k -> 65k -> ... -> 1M
        for seq in sample_long_genomic_windows(genome_stream, length=L):
            loss = causal_lm_loss(model, seq)
            optimizer.step(loss)


def score_variant(model, reference_seq, pos, ref_allele, alt_allele):
    wt = insert_allele(reference_seq, pos, ref_allele)
    mut = insert_allele(reference_seq, pos, alt_allele)
    ll_wt = sequence_log_likelihood(model, wt)
    ll_mut = sequence_log_likelihood(model, mut)
    return ll_mut - ll_wt                             # 越低通常越可能有害


def generate_genomic_sequence(model, prompt, n_tokens, temperature=1.0):
    seq = prompt
    for _ in range(n_tokens):
        logits = model(seq)[-1]
        next_token = sample(logits, temperature=temperature, top_k=4)
        seq += next_token
    return seq
```

##### 自回归 DNA 语言模型目标

Evo 2 的基础训练目标是标准 causal language modeling。给定 DNA 序列 \(x_1,\ldots,x_T\)，模型最大化每个位置在左侧上下文下出现真实下一个核苷酸的概率：

$$
\log p_\theta(x_{1:T})
= \sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

对应的训练损失为：

$$
\mathcal{L}_{\text{CLM}}
= -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t})
$$

这一定义看起来简单，但在基因组上有两个关键差别。第一，输入是单核苷酸分辨率，因此一个错配、插入或删除都能直接反映在 likelihood 上。第二，上下文被扩展到 1 Mb 后，模型有机会在同一个前向过程中看到启动子、外显子、内含子、增强子、TAD 边界和较长 repeats 的组合，而不是只看几百到几千 bp 的局部窗口。

##### StripedHyena 2 为什么重要

标准 Transformer 的自注意力需要显式形成 \(T\times T\) 的相似度矩阵，长到百万 token 时内存和计算都会成为主要瓶颈。Evo 2 使用 StripedHyena 2，把局部显式建模、中等长度正则化卷积和长程隐式卷积组合起来，让每层可以在不同距离尺度上传递信息。可把其中的长卷积部分抽象为：

$$
y = \mathcal{F}^{-1}\left(\mathcal{F}(h_\theta)\odot \mathcal{F}(u)\right)
$$

其中 \(u\) 是输入激活，\(h_\theta\) 是由模型参数生成或调制的长卷积核，\(\mathcal{F}\) 表示 FFT。直觉上，注意力擅长精确选择少量位置，长卷积擅长以近线性代价把远距离上下文混合进当前位置；Evo 2 通过多种 operator 混合，让基因组中短 motif、基因级结构和染色体级组织都能被同一个模型处理。

##### 两阶段训练与数据权重

Evo 2 先在较短上下文上学习基础语法：密码子偏好、起止密码子、剪接位点、RNA 结构片段、TF motif 和常见调控上下文。随后 midtraining 将上下文长度逐步扩展到 1M token，训练样本也更强调长序列组成，使模型学习远距离元素之间的依赖。这个流程类似自然语言模型先以短上下文稳定训练，再扩大 context window 的做法，避免从一开始就把全部计算消耗在超长序列上。

数据侧的重点不是简单堆叠基因组，而是构建 OpenGenome2：去冗余、跨生命域覆盖，并对功能遗传元素和长序列窗口进行加权。论文还明确排除了感染真核宿主的病毒基因组；因此，Evo 2 在这类序列上不是一个强生成器，这属于有意的数据边界，而不是普通数据缺失。

##### 变异效应打分

零样本变异预测使用同一个语言模型 likelihood。若 \(x^{\text{wt}}\) 是参考序列，\(x^{\text{mut}}\) 是带突变序列，则变异分数可写为：

$$
\Delta_{\text{LL}}
= \log p_\theta(x^{\text{mut}}) - \log p_\theta(x^{\text{wt}})
$$

当 \(\Delta_{\text{LL}} < 0\) 时，突变降低了模型认为该序列来自自然基因组分布的概率，通常被解释为更可能破坏功能约束。对 SNV 可比较单个碱基替换；对 indel 或更长变异，则比较包含变异窗口的整段序列 likelihood。论文用 ClinVar、SpliceVarDB、BRCA1 saturation mutagenesis 和 DART-eval 等任务展示这种分数在编码、剪接和部分非编码场景中的可用性。

> 💡 关键：Evo 2 的零样本预测并不是训练一个“致病性分类器”，而是用跨物种基因组预训练学到的自然序列概率作为进化约束代理。

##### 表征、解释与设计

除了 likelihood，Evo 2 中间层 embedding 也可作为通用基因组特征。论文中用这些特征训练外显子分类器和 BRCA1 监督分类器，说明模型内部表示已经编码了可迁移的局部功能信息。稀疏自编码器进一步把隐藏激活分解成更稀疏的特征维度，用于发现 exon-intron 边界、TF binding site、tRNA/rRNA、ORF、prophage 等可解释模式。

生成时，Evo 2 仍按自回归方式从 prompt 续写 DNA。若只做 unconditional 或简单 prompt 生成，模型会倾向采样训练分布中的自然序列；若结合外部预测器或 inference-time search，则可对 chromatin accessibility、调控元件或较长基因组片段做条件设计。与传统 motif 拼接或局部序列优化相比，Evo 2 的优势是同一生成过程可以同时考虑局部语法和长程一致性；风险则是生成序列仍需严格的过滤、实验验证和生物安全约束。

#### 🧪 练习题
```yaml
question: "Evo 2 用野生型和突变序列的 log-likelihood 差值做零样本变异效应预测，其核心假设是什么？"
options:
  - "降低自然序列概率的突变更可能破坏进化约束或生物功能"
  - "所有低频突变都一定是良性突变"
  - "只有蛋白编码区才能用语言模型打分"
  - "变异预测必须先在 ClinVar 标签上监督微调"
answer: 0
explain: "Evo 2 通过大规模基因组语言建模学习自然序列分布；若突变显著降低模型概率，通常说明它偏离了模型学到的保守功能模式。"
```

### scBERT

```yaml
id: scbert
num: 30
name: scBERT
full_name: scBERT (scBERT)
year: '2022.09'
org: 腾讯AI Lab
parent: —
paper_url: https://www.nature.com/articles/s42256-022-00534-z
project_url: ''
category: single_cell
motivation: 首个百万级单细胞数据预训练模型
```

#### 📝 一句话总结
scBERT 将每个单细胞的基因表达谱视为由基因 token 组成的“句子”，用 gene2vec 基因嵌入、离散表达量嵌入和 Performer 编码器进行自监督预训练，再迁移到细胞类型标注。它主要解决传统单细胞注释方法依赖 marker、难处理批次效应、难显式利用基因间相互作用的问题。

#### 🎯 核心要点
- **单细胞表达谱语言化**：一个细胞对应一条长度约等于基因数的序列，每个位置是固定基因，输入特征由 gene2vec 基因嵌入与表达量 bin 嵌入相加
- **表达量离散化**：预处理后表达值被分桶为有限类别，官方默认 `num_tokens=7`，包括零表达、若干非零表达 bins 和 mask 类别
- **只 mask 非零表达**：预训练阶段随机遮盖非零基因表达 bin，用剩余基因上下文重建原始 bin，减少 scRNA-seq dropout zero 对训练目标的干扰
- **Performer 编码器**：用 FAVOR+ 近似 softmax attention，将长基因序列注意力从二次复杂度降到近线性，默认 6 层、10 个 head、200 维嵌入
- **两阶段训练**：先在 PanglaoDB 等未标注 scRNA-seq 数据上自监督学习 gene-gene interaction，再在带标签参考数据上监督微调用于细胞类型注释
- **微调头设计**：预训练 encoder 之后接一维卷积和分类器输出细胞类型，novel cell type detection 可通过最大预测概率阈值实现
- **可解释性**：多层多头 attention 的平均矩阵可用于观察某个基因对其他基因的注意关系，辅助分析细胞类型相关基因互作
- **鲁棒性评估**：论文在跨器官、跨平台、类别不均衡和批次效应场景中比较 marker、相关性和机器学习基线，突出预训练迁移的泛化优势

#### 🔬 深入细节
##### 模型架构图

![scBERT overview](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-022-00534-z/MediaObjects/42256_2022_534_Fig1_HTML.png)
*图：scBERT 论文 Figure 1。上半部分展示自监督预训练与监督微调；下半部分展示 gene2vec 基因嵌入、表达量 bin 嵌入、随机 mask、Performer 层和多头注意力。*

论文页为 Nature Machine Intelligence，预印本全文可从 bioRxiv 访问，官方代码位于 `https://github.com/TencentAILabHealthcare/scBERT`。官方 README 给出的默认 Performer 配置是 `num_tokens=7`、`dim=200`、`depth=6`、`heads=10`。

##### 算法伪代码

```python
# scBERT 预训练与微调伪代码
def preprocess_cell(raw_counts):
    x = scanpy_normalize_total(raw_counts)
    x = log1p(x)
    bins = discretize_expression(x, num_bins=7)
    return bins


def build_scbert_input(gene_ids, expression_bins, gene2vec, bin_embedding):
    tokens = []
    for gene, b in zip(gene_ids, expression_bins):
        gene_emb = gene2vec[gene]
        expr_emb = bin_embedding[b]
        tokens.append(gene_emb + expr_emb)
    return tokens


def pretrain_scbert(unlabeled_cells, performer, reconstructor):
    for cell in unlabeled_cells:
        bins = preprocess_cell(cell.counts)
        masked_bins, mask_pos = random_mask_nonzero_bins(bins)
        z = build_scbert_input(cell.gene_ids, masked_bins, gene2vec, bin_embedding)
        h = performer(z)
        logits = reconstructor(h[mask_pos])
        loss = cross_entropy(logits, bins[mask_pos])
        optimizer.step(loss)


def finetune_for_cell_type(labeled_cells, pretrained_encoder, classifier):
    for cell, y in labeled_cells:
        bins = preprocess_cell(cell.counts)
        h = pretrained_encoder(build_scbert_input(cell.gene_ids, bins, gene2vec, bin_embedding))
        pooled = conv1d_pooling(h)
        logits = classifier(pooled)
        loss = cross_entropy(logits, y)
        optimizer.step(loss)
```

##### 输入表示：gene2vec 加表达量 bin

scRNA-seq 的原始矩阵非常稀疏，且同一个细胞里不同基因的表达尺度差异很大。scBERT 不直接输入连续 count，而是先标准化并离散化表达量：

$$
b_{c,g} = \text{bin}\left(\log(1+\text{normalize}(x_{c,g}))\right)
$$

其中 \(c\) 表示细胞，\(g\) 表示基因，\(b_{c,g}\) 是该基因在该细胞中的表达 bin。每个输入位置的向量为：

$$
z_{c,g} = E_{\text{gene}}(g) + E_{\text{expr}}(b_{c,g})
$$

\(E_{\text{gene}}\) 来自 gene2vec，提供基于共表达关系的基因先验；\(E_{\text{expr}}\) 表示该基因在当前细胞中的表达状态。这个设计把“这个位置是什么基因”和“它在此细胞中表达到什么水平”分离开，避免模型只从全局基因身份或只从表达量里学习。

##### 自监督重建损失

预训练阶段，scBERT 随机 mask 非零表达的基因 bin，然后根据其余基因上下文预测被 mask 的原始 bin：

$$
\mathcal{L}_{\text{rec}}
= -\sum_{g\in\mathcal{M}}
\log p_\theta(b_{c,g}\mid \{z_{c,j}: j\notin \mathcal{M}\})
$$

这里 \(\mathcal{M}\) 是被遮盖的非零基因集合。只遮盖非零表达很关键，因为 scRNA-seq 里的零既可能是真实未表达，也可能是技术 dropout；如果大量重建零，模型容易学到“预测零最安全”，而不是学习细胞状态相关的基因互作。

##### Performer 注意力

普通自注意力计算为：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

当输入包含上万基因时，\(QK^\top\) 的 \(O(N^2)\) 复杂度会很重。Performer 用随机特征映射 \(\phi(\cdot)\) 近似 softmax kernel：

$$
\widehat{\text{Att}}(Q,K,V)
= \widehat{D}^{-1}\left(\phi(Q)(\phi(K)^\top V)\right)
$$

$$
\widehat{D}
= \text{diag}\left(\phi(Q)(\phi(K)^\top \mathbf{1})\right)
$$

这样可以先聚合 \(\phi(K)^\top V\)，再乘 \(\phi(Q)\)，避免显式构造全量 \(N\times N\) 注意力矩阵。对 scBERT 来说，这使模型能在完整基因列表上捕获长距离 gene-gene interaction，而不需要像传统流程那样先强依赖 highly variable genes 或降维步骤。

##### 微调与新细胞类型检测

微调时，预训练的 Performer encoder 被复用，reconstructor 被替换为一维卷积和分类器：

$$
\hat{y}_c
= \text{softmax}\left(W\ \text{ConvPool}(H_c)+b\right)
$$

$$
\mathcal{L}_{\text{cls}}
= -\sum_c \log p_\theta(y_c\mid x_c)
$$

如果查询细胞属于训练标签之外的新类型，模型的最大 softmax 概率通常会偏低；官方推理脚本提供 `unassign_thres` 阈值，将低置信度细胞标为 unassigned。这不是严格的开放集分类理论保证，但在实际细胞注释工作中提供了一个可操作的新类型筛查入口。

##### 与传统单细胞注释方法的区别

marker-based 方法依赖人工整理的 marker gene list，面对相似细胞亚型或新数据集时容易漏标；correlation-based 方法常把细胞表达谱与参考均值做相似度比较，对批次效应和参考集质量敏感；传统机器学习方法通常需要特征筛选或任务内训练，难以把大量未标注细胞中的共表达规律迁移过来。

scBERT 的核心变化是把未标注单细胞数据变成预训练资源。自监督任务不需要细胞类型标签，却迫使模型学习在一个细胞状态下哪些基因表达模式互相支持。微调时，即使标签较少，模型也已经有了通用 gene-gene interaction 表示，因此在类别不均衡、跨 cohort 和跨平台设置中更稳健。

> 💡 关键：scBERT 的“BERT”并不是逐字复刻 NLP 输入，而是把基因身份、表达强度和长程基因互作重新组织成适合 Transformer/Performer 学习的单细胞表达语言。

#### 🧪 练习题
```yaml
question: "scBERT 为什么选择 Performer encoder 而不是普通 Transformer self-attention？"
options:
  - "因为完整基因序列很长，Performer 能以近线性复杂度近似注意力，降低内存和计算压力"
  - "因为 Performer 不需要任何表达量输入"
  - "因为普通 Transformer 无法做分类任务"
  - "因为 Performer 会自动生成 marker gene list"
answer: 0
explain: "单细胞表达谱可包含上万基因，普通注意力的二次复杂度很昂贵；Performer 用随机特征近似 softmax attention，使 scBERT 能更高效地建模全局基因互作。"
```

### Geneformer

```yaml
id: geneformer
num: 31
name: Geneformer
full_name: Geneformer (Geneformer)
year: '2023.05'
org: Broad Institute
parent: —
paper_url: https://www.nature.com/articles/s41586-023-06139-9
project_url: ''
category: single_cell
motivation: 3000万细胞基因调控逻辑预训练
```

#### 📝 一句话总结
Geneformer 提出了面向单细胞转录组的 rank-value Transformer：先把每个细胞中按语料库中位表达量归一化后的高表达基因排序成 token 序列，再用 masked gene prediction 在约 3000 万人类单细胞上预训练。它把大规模细胞图谱中的共表达和上下文依赖迁移到小样本网络生物学任务，用于细胞状态分类、基因功能预测和 in silico perturbation。

#### 🎯 核心要点
- **rank-value encoding**：对每个细胞，将基因表达除以该基因在 Genecorpus 中的非零中位表达量，再按缩放后表达从高到低排序
- **非参数输入表示**：模型输入不是连续 count 矩阵，而是排序后的基因 token 序列；未检测到的基因不进入序列，降低稀疏零值带来的计算浪费
- **Genecorpus-30M**：V1 在约 3000 万人类单细胞转录组上预训练，覆盖多组织和细胞状态；数据与模型通过 Hugging Face 公开
- **BERT 式 masked gene objective**：随机 mask 每个细胞中约 15% 基因位置，利用剩余 rank 上下文预测被遮盖的基因身份
- **V1 模型结构**：论文主模型使用 6 层 Transformer encoder、2048 最大输入长度、256 维嵌入、4 个 attention head 和 512 维前馈层
- **上下文基因表示**：同一个基因在不同细胞状态下可得到不同 embedding 和 attention 模式，使模型能表达 context-specific gene network dynamics
- **迁移学习工作流**：预训练权重复制到不同任务模型，加任务头后用有限标注数据微调，包括细胞状态分类、转录因子剂量敏感性、染色质状态和疾病相关任务
- **in silico perturbation**：通过删除、前移、后移或插入基因 token 模拟 knockout、overexpression、activation、inhibition，再比较细胞 embedding 或预测输出变化

#### 🔬 深入细节
##### 模型架构图

![Geneformer overview](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs41586-023-06139-9/MediaObjects/41586_2023_6139_Fig1_HTML.png)
*图：Geneformer 论文 Figure 1。图中展示从 Genecorpus-30M 自监督预训练，到复制权重进行任务微调，再到 rank-value encoding 和 Transformer encoder 提取上下文 gene/cell embedding 的完整流程。*

论文页为 Nature，开放全文可通过 PubMed Central 镜像访问；官方模型、tokenizer、Genecorpus-30M 数据链接和 V1/V2 说明位于 `https://huggingface.co/ctheodoris/Geneformer`。当前 Hugging Face 页面还记录了 V2 模型，但这里按 YAML 和原始 Nature 论文解读 V1。

##### 算法伪代码

```python
# Geneformer V1 rank-value encoding 与 masked gene pretraining
def rank_value_encode(cell_counts, gene_median, gene_to_token, max_len=2048):
    scaled = {}
    for gene, count in cell_counts.items():
        if count > 0 and gene in gene_to_token:
            scaled[gene] = count / gene_median[gene]

    ranked_genes = sorted(scaled, key=scaled.get, reverse=True)
    return [gene_to_token[g] for g in ranked_genes[:max_len]]


def pretrain_geneformer(genecorpus, model):
    for cell_counts in genecorpus:
        tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
        masked_tokens, mask_pos, labels = mask_gene_tokens(tokens, mask_rate=0.15)
        logits = model(masked_tokens)
        loss = cross_entropy(logits[mask_pos], labels)
        optimizer.step(loss)


def finetune_geneformer(labeled_cells, pretrained_model, task_head):
    for cell_counts, y in labeled_cells:
        tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
        h = pretrained_model(tokens)
        cell_repr = pool_or_cls(h)
        logits = task_head(cell_repr)
        loss = task_loss(logits, y)
        optimizer.step(loss)


def in_silico_delete_gene(cell_counts, target_gene, model):
    tokens = rank_value_encode(cell_counts, gene_median, gene_to_token)
    perturbed = [tok for tok in tokens if tok != gene_to_token[target_gene]]
    return embedding_shift(model(tokens), model(perturbed))
```

##### rank-value encoding 的计算

Geneformer 的关键不是把 count 直接送入 Transformer，而是先把每个基因在当前细胞中的表达与其全语料库典型表达水平做比较。设 \(x_{c,g}\) 是细胞 \(c\) 中基因 \(g\) 的表达，\(m_g\) 是该基因在预训练语料中的非零中位表达量，则：

$$
s_{c,g} = \frac{x_{c,g}}{m_g}
$$

然后按 \(s_{c,g}\) 从高到低排序并取前 \(L=2048\) 个基因：

$$
R_c = \text{argsort}_{g: x_{c,g}>0}\left(-s_{c,g}\right)_{1:L}
$$

这个缩放会降低 housekeeping genes 的统治力。一个绝对表达很高但在几乎所有细胞中都高表达的基因，缩放后不一定排在最前；一个绝对 count 中等但相对自身基线显著上调的转录因子或状态标志基因，反而会被排到更靠前的位置。排序序列 \(R_c\) 就是 Transformer 的输入 token 序列。

##### masked gene prediction 目标

预训练时，Geneformer 随机遮盖 rank 序列中约 15% 的基因 token，并用其余基因及其相对顺序预测被遮盖基因：

$$
\mathcal{L}_{\text{MLM}}
= -\sum_{i\in\mathcal{M}}
\log p_\theta(g_i \mid R_{c,\setminus\mathcal{M}})
$$

与 scBERT 预测表达 bin 不同，Geneformer 预测的是“这个 rank 位置应该是哪一个基因”。因此模型被迫学习在给定细胞状态中哪些基因组合、通路和调控模块会共同出现。注意力层计算为：

$$
\text{Attention}(Q,K,V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

论文主模型在最多 2048 个基因 token 上使用 dense self-attention。这样每个基因的输出 embedding 都是 context-aware 的：同一个 `GATA4`、`TEAD4` 或免疫基因在心肌细胞、免疫细胞和疾病状态中的表示可以不同。

##### 迁移学习与任务头

Geneformer 采用典型的预训练-微调范式。预训练模型学到通用单细胞转录组结构后，权重被复制到多个下游模型，再加上任务特定输出层：

$$
\hat{y}_c = f_{\text{head}}(H_c;\phi),\quad H_c = f_{\text{Geneformer}}(R_c;\theta)
$$

如果任务是细胞或疾病状态分类，\(f_{\text{head}}\) 可以作用在池化后的 cell embedding 上；如果任务是基因属性预测，则可读取目标基因位置的 contextual embedding；如果任务是网络解释，则可分析 attention 或 perturbation 后 embedding 的变化。

这种方式适合网络生物学中的小样本问题：真实疾病组织、罕见细胞类型或扰动实验往往标签有限，但预训练阶段已经从大规模细胞图谱中学习了基因共现、通路和细胞状态背景。

##### in silico perturbation

Geneformer 的扰动模拟直接作用于 rank-value 序列。例如 deletion 删除目标基因 token，overexpression 将目标基因前移到序列头部，inhibition 将其后移，activation 将其上移到更高 rank。之后比较原始细胞与扰动细胞的表示或任务输出：

$$
\Delta_{\text{emb}}
= 1 - \cos\left(h_{\text{cell}}(R_c), h_{\text{cell}}(R_c^{\text{pert}})\right)
$$

若删除某基因导致目标细胞状态 embedding 大幅偏移，说明模型认为该基因对该上下文下的网络状态重要。论文把这类分析用于候选调控因子和治疗靶点优先级排序，并结合心肌细胞实验对部分预测进行了验证。

##### 与 scBERT 等表达值模型的区别

scBERT 保留固定基因位置并预测表达量 bin；Geneformer 则把每个细胞变成按相对表达排序的可变基因 token 序列，并预测被 mask 的基因身份。前者更像“每个基因位置都有一个离散表达状态”，后者更像“一个细胞由最能定义其状态的一串基因词组成”。因此 Geneformer 特别强调 rank 中的相对优先级和上下文基因 embedding，而不是完整表达矩阵的逐基因重建。

这种设计也有代价：低 rank 或未检测基因不显式进入 V1 输入，表达幅度被压缩为排序信息，强依赖预训练语料的基因中位数和 token 字典。解释 Geneformer 结果时，应把它看作从单细胞 atlas 中学到的上下文网络先验，而不是因果调控关系的直接证明。

> 💡 关键：Geneformer 的创新点在于 rank-value encoding 把单细胞表达谱变成“细胞状态关键词序列”，再用 Transformer 学习同一基因在不同细胞上下文中的网络角色。

#### 🧪 练习题
```yaml
question: "Geneformer 的 rank-value encoding 为什么要用基因在预训练语料中的中位表达量对当前细胞表达进行缩放？"
options:
  - "为了突出相对该基因自身基线异常上调的状态相关基因，并降低普遍高表达 housekeeping genes 的排名"
  - "为了把所有基因都转换成同一个固定表达值"
  - "为了让模型只能处理蛋白质序列"
  - "为了完全移除 Transformer 中的位置顺序信息"
answer: 0
explain: "按语料库中位表达量缩放后，排序更关注某基因在当前细胞中是否相对自身典型水平突出，而不是只按绝对 count 排序。"
```

### scGPT

```yaml
id: scgpt
num: 32
name: scGPT
full_name: scGPT (scGPT)
year: '2024.02'
org: 多伦多大学
parent: —
paper_url: https://www.nature.com/articles/s41592-024-02201-0
project_url: ''
category: single_cell
motivation: 生成式多组学集成与扰动预测
```

#### 📝 一句话总结
scGPT 将单细胞中的基因视为 token、表达值视为 token value，用生成式 Transformer 在 3,300 万级细胞图谱上预训练，解决单细胞任务中跨批次、跨模态和扰动场景缺少统一可迁移表征的问题。

#### 🎯 核心要点
- **基因-token Transformer**：每个细胞被表示为基因 token 序列，输入同时包含基因身份、表达值和可选条件 token（批次、模态、扰动等）
- **大规模预训练语料**：基于 CELLxGENE census 等来源的 3,300 万以上单细胞表达谱学习通用细胞和基因表征
- **生成式掩码建模**：随机隐藏部分基因表达值，训练模型根据已知表达和上下文恢复 masked gene expression
- **双层预测目标**：既通过 transformer hidden states 预测每个 masked gene 的表达，也通过 cell embedding + gene embedding 的 MVC decoder 强化细胞级表征
- **显式零值建模**：可输出基因为零表达的 Bernoulli 概率，适配 scRNA-seq 中大量 dropout/真实零值混合的稀疏特征
- **任务适配头**：支持细胞类型注释、批次校正、多组学整合、Perturb-seq 扰动预测和基因调控网络推断
- **注意力解释基因关系**：利用基因 token attention 分析潜在 gene-gene interaction，生成可用于 GRN 推断的边权
- **工程实现**：官方代码包含 `TransformerModel`、`ExprDecoder`、`MVCDecoder`、domain-specific batch norm、contrastive cell embedding 和 elastic cell similarity 等模块

#### 🔬 深入细节
##### 模型架构图与可访问来源

![scGPT 模型示意图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-024-02201-0/MediaObjects/41592_2024_2201_Fig1_HTML.png)
*图：Nature Methods Fig. 1。scGPT 先在大规模细胞图谱上生成式预训练，再针对注释、扰动、多组学整合和 GRN 推断等任务微调；输入由 gene token、expression value 和 condition token 共同组成。*

可访问来源：论文页面 https://www.nature.com/articles/s41592-024-02201-0；官方代码 https://github.com/bowang-lab/scGPT；API 文档 https://scgpt.readthedocs.io/en/latest/scgpt.model.html。Nature 页面只能公开显示摘要、图和数据/代码信息，方法细节同时参考官方代码与文档中的模型接口。

##### 算法伪代码

```python
# scGPT 预训练与任务适配伪代码
def pretrain_scgpt(cell_batches, model):
    for genes, expr_values, batch_labels in cell_batches:
        # genes: [B, L] gene ids, expr_values: [B, L] normalized/binned expression
        mask = sample_gene_mask(expr_values)
        input_values = expr_values.clone()
        input_values[mask] = MASK_VALUE

        # gene embedding + value embedding + optional batch/modality/perturbation condition
        out = model(
            src=genes,
            values=input_values,
            src_key_padding_mask=(genes == PAD),
            batch_labels=batch_labels,
            MVC=True,
            ECS=True,
        )

        # token-level expression reconstruction
        loss_gep = masked_mse(out["mlm_output"], expr_values, mask)

        # cell-embedding-conditioned masked value prediction
        loss_mvc = masked_mse(out["mvc_output"], expr_values, mask)

        # optional explicit zero probability for sparse scRNA-seq values
        loss_zero = bernoulli_nll(out.get("mlm_zero_probs"), expr_values > 0, mask)

        # optional embedding regularizers / task heads
        loss = loss_gep + loss_mvc + loss_zero + out.get("loss_ecs", 0.0)
        optimizer.step(loss)


def adapt_for_perturbation(control_cell, perturbation_tokens, pretrained_model):
    genes, values = tokenize_cell(control_cell)
    values = inject_perturbation_condition(values, perturbation_tokens)
    predicted_expr = pretrained_model.generate(
        cell_emb=encode_cell(control_cell),
        src=genes,
        values=values,
        gen_iters=K,
    )
    return predicted_expr
```

##### 动机与背景

单细胞 RNA-seq 数据天然像一个极稀疏的 cell-by-gene 矩阵：每个细胞只有一部分基因有非零表达，批次、测序平台、模态和扰动条件又会显著改变观测分布。传统流程通常为不同任务分别训练模型，例如注释用分类器、整合用 Harmony/scVI、扰动预测用 scGen/GEARS。这种分散式设计难以复用跨组织、跨实验积累的大规模先验。

scGPT 的核心思想是把“一个细胞中哪些基因表达到什么程度”转化为生成式建模问题。类似语言模型根据上下文恢复缺失词，scGPT 根据已观测基因表达、细胞上下文和条件 token 恢复 masked gene expression。这样得到的 hidden states 既能作为 gene-level 表征，也能池化为 cell-level embedding，用于不同下游任务。

##### 输入表示：基因身份、表达值与条件

给定一个细胞的基因集合 \(G=\{g_1,\ldots,g_L\}\) 和表达值 \(x=\{x_1,\ldots,x_L\}\)，scGPT 为每个位置构造 gene embedding 与 value embedding：

$$
h_i^{(0)} = E_{\mathrm{gene}}(g_i) + E_{\mathrm{value}}(x_i) + E_{\mathrm{cond}}(c_i)
$$

其中 \(c_i\) 可表示批次、模态、扰动条件等任务相关信息。官方实现中 value encoder 可以是连续数值投影或分箱类别嵌入；当使用 batch label 或 domain-specific batch norm 时，模型还能把批次信息显式传入编码器或 decoder，从而服务于批次校正和 reference mapping。

Transformer 编码后得到每个 gene token 的上下文表示：

$$
H = \mathrm{TransformerEncoder}(h^{(0)}, \mathrm{padding\ mask})
$$

细胞向量 \(z_{\mathrm{cell}}\) 通常由 `[CLS]`、池化或加权池化得到。直觉上，gene token hidden state 保存“这个基因在当前细胞状态下的上下文”，cell embedding 保存“整个表达谱的细胞状态”。

##### 生成式掩码恢复与表达损失

预训练时，模型随机遮盖一部分表达值，只保留 gene identity 和未遮盖表达上下文。主要表达预测头对 masked 位置输出 \(\hat{x}_i\)，使用 masked MSE：

$$
\mathcal{L}_{\mathrm{GEP}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left(\hat{x}_i-x_i\right)^2
$$

scRNA-seq 的零值有两种来源：真实低表达和测序 dropout。scGPT 的实现可额外预测非零概率 \(p_i^{0}\)，用 Bernoulli 负对数似然建模该位置是否表达：

$$
\mathcal{L}_{\mathrm{zero}}
=
-\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\log \mathrm{Bernoulli}\left(\mathbb{1}[x_i>0];p_i^{0}\right)
$$

> 💡 关键：这里预测的是连续或分箱后的表达值，而不是只预测“哪个基因出现”。这保留了 scRNA-seq 中表达强弱对细胞状态的贡献。

##### MVC：用细胞向量反推基因表达

除了 token-level decoder，scGPT 还包含 masked value prediction for cell embedding，也就是 MVC decoder。它以 cell embedding 与 gene embedding 为输入，要求单个细胞向量也能恢复 masked gene expression：

$$
\hat{x}_{i}^{\mathrm{MVC}}
=
f_{\mathrm{mvc}}(z_{\mathrm{cell}}, e_{g_i})
$$

对应损失为：

$$
\mathcal{L}_{\mathrm{MVC}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left(\hat{x}_{i}^{\mathrm{MVC}}-x_i\right)^2
$$

这个目标让 cell embedding 不只是分类或聚类用的低维摘要，而必须携带足够信息来重构基因表达模式。对下游任务而言，这能提高细胞表示的可迁移性：同一个 embedding 可接分类头、整合目标、扰动预测头或检索式 reference mapping。

##### 训练/推理流程与下游任务

预训练阶段使用大量未标注细胞，优化表达恢复、MVC 和可选零值目标。微调时，模型保持相同的 tokenization 和 Transformer 主体，替换或增加任务 head：细胞类型注释接分类器；批次整合加入 batch/domain 约束；多组学整合通过 modality condition token 对齐 RNA、ATAC 或 protein；扰动预测则把 perturbation condition 注入输入，让模型生成扰动后的表达谱。

在 Perturb-seq 任务中，输入可理解为“控制细胞表达 + 目标扰动条件”，输出是扰动后基因表达：

$$
\hat{x}^{\mathrm{pert}}
=
f_{\theta}(x^{\mathrm{ctrl}}, c_{\mathrm{pert}})
$$

训练目标仍可写成被观测扰动表达和预测表达之间的回归误差：

$$
\mathcal{L}_{\mathrm{pert}}
=
\frac{1}{|\Omega|}
\sum_{j\in\Omega}
\left(\hat{x}^{\mathrm{pert}}_j-x^{\mathrm{pert}}_j\right)^2
$$

##### 与传统单细胞模型的区别

| 维度 | 传统任务模型 | scGPT |
|------|--------------|-------|
| 输入单位 | 通常是固定 HVG 表达矩阵 | gene token + expression value + condition token |
| 训练范式 | 每个任务单独训练 | 大规模生成式预训练后适配 |
| 输出表征 | 多为 cell embedding | cell embedding、gene embedding、表达生成结果 |
| 稀疏性处理 | 归一化、HVG、VAE 分布假设 | masked expression recovery + explicit zero probability |
| 多任务能力 | 注释、整合、扰动常分离 | 同一主干覆盖注释、整合、扰动、GRN |

scGPT 的实际价值在于把多个单细胞分析任务压到一个共享模型接口中：模型不只判断细胞类型，还能在条件变化后生成表达响应，并用注意力和 gene embeddings 给出基因关系线索。不过它也继承了单细胞 foundation model 的共同风险：预训练语料偏差、批次标签泄漏、zero-shot 泛化能力和注意力解释的生物学可信度都需要在具体数据集上重新验证。

#### 🧪 练习题
```yaml
question: "scGPT 中 MVC decoder 的主要作用是什么？"
options:
  - "只把细胞类型标签映射成 one-hot 编码"
  - "用 cell embedding 和 gene embedding 预测 masked gene expression，迫使细胞向量保留可重构的表达信息"
  - "把 RNA 序列翻译成蛋白质序列"
  - "删除所有零表达基因以减少词表大小"
answer: 1
explain: "MVC 让单个 cell embedding 也能恢复被遮盖的表达值，因此增强了细胞级表征对下游注释、整合和扰动任务的可迁移性。"
```

### CellPLM

```yaml
id: cellplm
num: 33
name: CellPLM
full_name: CellPLM (CellPLM)
year: '2024.05'
org: 智源研究院
parent: —
paper_url: https://openreview.net/forum?id=CellPLM2024
project_url: ''
category: single_cell
motivation: 细胞级token实现跨物种表征
```

#### 📝 一句话总结
CellPLM 反转了“基因是 token、细胞是句子”的常见设定，把细胞当作 token、组织或 batch 当作句子，用细胞级 masked language modeling 显式建模 cell-cell relations，从而解决 gene-token 模型忽略细胞间关系且推理成本高的问题。

#### 🎯 核心要点
- **细胞语言模型**：从 \(p(X_{i,j}\mid\text{same-cell genes})\) 扩展为 \(p(X_{i,j}\mid\text{all observed cells and genes})\)，使 masked gene expression 可依赖其他细胞
- **细胞作为 token**：每个细胞先由 gene expression embedder 聚合成一个向量，Transformer 在细胞维度做 self-attention
- **联合 scRNA-seq 与 SRT**：同时利用单细胞转录组和 spatially-resolved transcriptomics，SRT 细胞坐标被编码为 2D sinusoidal positional embedding
- **四模块架构**：gene expression embedder、Flowformer/Transformer encoder、Gaussian mixture latent space、batch-aware decoder
- **Gaussian mixture prior**：用混合高斯而非单一各向同性高斯描述潜在空间，贴合细胞群体/功能状态的多簇结构
- **batch-aware decoder**：decoder 输入 latent variable 和 batch/FOV embedding，把批次信息放进生成端以鼓励 latent space 去批次化
- **细胞级掩码预训练**：选择部分细胞并遮盖其部分已测基因，只在各平台实际测到的基因上计算重构损失
- **高推理效率**：由于 self-attention 在细胞 embedding 上进行，而不是在每个细胞的数千个 gene token 上进行，生成 cell embeddings 的速度显著快于 gene-token 模型

#### 🔬 深入细节
##### 模型架构图与可访问来源

![CellPLM ICLR poster](https://iclr.cc/media/PosterPDFs/ICLR%202024/19221.png?t=1714641405.8754995)
*图：ICLR 2024 poster。左侧展示 CellPLM 的预训练框架：scRNA-seq/SRT atlas 输入后，经 gene expression embedder、cell-level Transformer、Gaussian mixture latent space 和 batch-aware decoder 进行 masked reconstruction。*

可访问来源：ICLR 页面 https://iclr.cc/virtual/2024/poster/19221；OpenReview 论文 PDF https://openreview.net/pdf?id=BKXvPDekud；官方代码 https://github.com/OmicsML/CellPLM。任务 YAML 中的 `paper_url` 指向 `CellPLM2024`，实际可访问 ICLR 2024 OpenReview 条目为 `BKXvPDekud`。

##### 算法伪代码

```python
# CellPLM 细胞级 masked language modeling 伪代码
def gene_expression_embedder(X, gene_emb):
    # X: [N_cells, K_genes], normalized + log1p sparse matrix
    # gene_emb[j]: learnable vector h_j
    E = sparse_matmul(X, gene_emb)  # E_i = sum_j X_ij h_j
    return E


def pretrain_cellplm(batch):
    X, measured_mask, batch_id, spatial_xy = batch

    # 只在各数据集实际测到的基因中采样 mask
    M = sample_measured_gene_mask(measured_mask)
    X_tilde = X * M

    E = gene_expression_embedder(X_tilde, gene_emb)
    P = sinusoidal_2d_pe(spatial_xy) if spatial_xy is not None else shared_scrna_pe()
    H = E + P

    # cells are tokens; tissue/FOV/batch is the "sentence"
    for layer in flowformer_layers:
        H = layer(H)

    # mixture posterior q(y|z), q(z|X_tilde)
    pi, mu, sigma = estimate_gmm_params(H)
    y = sample_cluster(pi)
    z = reparameterize(mu[y], sigma[y])

    # batch-aware reconstruction
    b = batch_lookup(batch_id)
    X_hat = mlp_decoder(z + b)

    loss_mse = mse_on_masked_measured_genes(X_hat, X, M, measured_mask)
    loss_cond = kl_qz_to_component_prior(z, y, mu, sigma)
    loss_y = kl_qy_to_mixture_prior(y, pi)
    loss = loss_mse + loss_cond + loss_y
    optimizer.step(loss)
```

##### 为什么要把细胞当作 token

Geneformer、scBERT、scGPT 等模型通常把一个细胞内部的基因看作 token 序列，目标是从同一细胞内的已知基因恢复 masked gene。CellPLM 认为这个类比忽略了单细胞数据的两个事实：第一，scRNA-seq 是 bag-of-genes 矩阵，基因没有自然语言那样的顺序；第二，同一组织内细胞谱系、微环境和细胞通讯会提供强烈的 denoising 与状态识别信号。

传统 gene language model 可写成：

$$
p\left(X_{i,j}\mid \{X_{i,o}:o\in O(i)\}\right),\quad j\in U(i)
$$

其中预测第 \(i\) 个细胞中基因 \(j\) 的表达只依赖同一细胞内其他已观测基因。CellPLM 将条件扩展到整批细胞的未遮盖表达：

$$
p\left(X_{i,j}\mid \{X_{u,v}:(u,v)\in M^C\}\right),\quad (i,j)\in M
$$

这意味着被遮盖表达不仅可由同一细胞的基因上下文推断，也可由相邻或同组织细胞的状态推断。直觉上，如果一批细胞中存在相似谱系或空间邻近细胞，它们应能互相提供缺失表达的先验。

##### Gene Expression Embedder：从 bag-of-genes 到细胞 token

对第 \(i\) 个细胞，CellPLM 为每个基因 \(j\) 维护可学习向量 \(h_j\)，然后按表达值加权求和：

$$
E_i=\sum_{j=1}^{k}X_{i,j}h_j
$$

这里 \(X\in\mathbb{R}^{N\times k}\) 是 cell-by-gene 矩阵，\(E_i\in\mathbb{R}^{d}\) 是第 \(i\) 个 cell token 的初始表达嵌入。由于 scRNA-seq 通常非常稀疏，这一步可用 sparse matrix multiplication 实现，避免对大量零表达基因做无效计算。

对 SRT 数据，模型还将二维空间坐标 \(C_i=(x_i,y_i)\) 编码为 \(P_i\)，形成：

$$
H_i^{(0)}=E_i+P_i
$$

对普通 scRNA-seq 数据，所有细胞共享一个可学习位置向量，以便和 SRT 输入形式统一。这样设计让模型既可学习一般 cell-cell relations，也可利用空间邻近关系捕获局部微环境。

##### Encoder：在细胞维度建模组织上下文

CellPLM 的 Transformer encoder 接收的是 \(N\) 个 cell token：

$$
H^{(\ell)}=\mathrm{TransformerLayer}^{(\ell)}(H^{(\ell-1)})
$$

由于一个组织样本或 batch 可包含上万细胞，普通 \(O(N^2)\) attention 成本较高，论文实现采用线性复杂度的 Flowformer 变体。与 gene-token 模型相比，这个设计的注意力矩阵描述的是 cell-cell relation，而不是 gene-gene relation。

> 💡 关键：CellPLM 的速度优势来自 token 粒度变化。一次前向可为整批细胞生成 embedding，而不是逐细胞处理数千个 gene tokens。

##### Gaussian mixture latent space 与去批次 decoder

单细胞潜在空间通常不是一个单峰高斯，而是由细胞类型、发育阶段、疾病状态等形成多个簇。CellPLM 因此使用混合高斯先验：

$$
p(y_i;\pi)=\mathrm{Multinomial}(\pi)
$$

$$
p(z_i\mid y_i=l)=\mathcal{N}\left(\mu_l,\mathrm{diag}(\sigma_l^2)\right)
$$

$$
p_{\theta}(x_i\mid z_i)=\mathcal{N}\left(f_{\mathrm{dec}}(z_i),\sigma^2I\right)
$$

其中 \(y_i\) 表示隐含细胞簇，\(z_i\) 是连续 latent variable。这个先验比单一高斯更适合保留生物学群体结构；在可视化中也表现为更平滑、更按细胞类型组织的 embedding space。

decoder 使用 latent variable 与 batch embedding：

$$
h^{(0)}=z+b,\quad h^{(\ell)}=\mathrm{FFLayer}^{(\ell)}(h^{(\ell-1)})
$$

把 batch label 提供给 decoder 的思想类似 scVI：技术批次差异由生成端解释，latent space 更专注保存生物状态。最终 decoder 输出 \(H^{(L)}\in\mathbb{R}^{N\times k}\)，用于重构 masked expression。

##### 预训练目标

CellPLM 的目标是 denoising variational lower bound，可拆成重构项、条件先验项和 cluster prior 项：

$$
\mathcal{L}_{\mathrm{CellLM}}
=
\mathcal{L}_{\mathrm{recon}}
-\mathcal{L}_{\mathrm{cond}}
-\mathcal{L}_{Y}
$$

在实现中，重构项用 masked MSE 估计。若 \(M_{i,j}=1\) 表示可见、\(M_{i,j}=0\) 表示 masked，则可写成：

$$
\mathcal{L}_{\mathrm{MSE}}
=
\left\|
(1-M)\odot \left(H^{(L)}-X\right)
\right\|_F^2
$$

总预训练损失为：

$$
\mathcal{L}_{\mathrm{pretrain}}
=
\mathcal{L}_{\mathrm{MSE}}
+\mathcal{L}_{\mathrm{cond}}
+\mathcal{L}_{Y}
$$

论文中特别强调，由于不同测序平台测得的基因数差距很大，mask 和 reconstruction loss 只作用在该数据集中实际 measured genes 上，避免要求模型重构技术上未观测的基因。

##### 与 gene-token foundation model 的区别

| 维度 | Gene-token 模型 | CellPLM |
|------|-----------------|---------|
| token | gene | cell |
| sentence/context | single cell | tissue、FOV 或 batch 中的一组细胞 |
| attention 关系 | gene-gene within cell | cell-cell across sample |
| 空间信息 | 通常不是预训练核心输入 | SRT 2D 坐标作为 positional embedding |
| latent prior | 多为 deterministic embedding 或单峰 VAE | Gaussian mixture prior |
| 主要优势 | gene-level 解释和表达生成自然 | cell embedding 快、显式利用细胞间关系 |

CellPLM 的局限也来自这个选择：它更擅长细胞级表征、聚类、注释、denoising 和空间 imputation，但如果任务需要精细 gene-gene regulatory attention，gene-token 模型的结构更直接。因此它不是简单替代 scGPT/scFoundation，而是把单细胞 foundation model 的建模重点从“细胞内基因语法”推到“组织内细胞语法”。

#### 🧪 练习题
```yaml
question: "CellPLM 为什么把细胞而不是基因作为 Transformer token？"
options:
  - "因为 scRNA-seq 中基因有严格自然语言式顺序"
  - "为了显式建模同一组织或 batch 中的 cell-cell relations，并降低逐细胞 gene-token attention 的推理成本"
  - "为了完全不使用基因表达值"
  - "因为 Gaussian mixture prior 只能用于图像数据"
answer: 1
explain: "CellPLM 认为细胞间关系对单细胞分析很关键，因此先把基因表达聚合成 cell token，再在细胞维度做 attention，同时显著提升生成 cell embeddings 的效率。"
```

### scFoundation

```yaml
id: scfoundation
num: 34
name: scFoundation
full_name: scFoundation (scFoundation)
year: '2024.06'
org: 清华大学
parent: —
paper_url: https://www.nature.com/articles/s41592-024-02305-7
project_url: ''
category: single_cell
motivation: 1亿参数最大规模单细胞模型
```

#### 📝 一句话总结
scFoundation 基于 xTrimoGene 的非对称 Transformer-like encoder-decoder，在 5,000 万以上人类单细胞转录组上预训练约 1 亿参数模型，解决全基因、连续表达值和测序深度差异下大规模单细胞表征学习的效率与泛化问题。

#### 🎯 核心要点
- **大规模覆盖**：模型约 100M 参数，覆盖约 20,000 个基因，预训练数据超过 50 million human single-cell transcriptomic profiles
- **xTrimoGene 主干**：采用非对称 encoder-decoder，encoder 只处理非零且未 mask 的高信息 token，decoder 处理全基因输出
- **稀疏性加速**：利用 scRNA-seq 约 90% 零值的特性，避免在 encoder 中对大量零表达基因做二次 attention
- **连续表达嵌入**：通过 auto-discretization/value embedding 将连续 expression scalar 映射到高维表示，避免粗糙整数分箱损失表达强度信息
- **RDA 预训练任务**：read-depth-aware modeling 用 target total count \(T\) 与 source total count \(S\) 连接不同测序深度的同一细胞表达
- **回归式 masked modeling**：预测 masked gene expression 的连续值，主要用 MSE 而不是多类别交叉熵
- **双粒度输出**：encoder 输出可池化为 cell embedding，decoder 输出 gene-level context embedding，用于药物响应、扰动预测、注释和 gene module inference
- **免微调读深增强**：通过设置推理时的 \(T>S\)，模型可把低 read-depth 输入映射到更高 read-depth 的表达估计

#### 🔬 深入细节
##### 模型架构图与可访问来源

![scFoundation 预训练框架图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-024-02305-7/MediaObjects/41592_2024_2305_Fig1_HTML.png)
*图：Nature Methods Fig. 1。scFoundation 采集大规模人类单细胞数据，使用 RDA 任务预训练；预训练流程包含 Bayesian downsampling、mask、非零 token encoder、全基因 decoder、cell embedding pooling 和 masked regression loss。*

可访问来源：论文页面 https://www.nature.com/articles/s41592-024-02305-7；官方代码 https://github.com/biomap-research/scFoundation；xTrimoGene 架构论文 https://arxiv.org/html/2311.15156v2。Nature 页面公开摘要、图和数据/代码信息；具体主干机制可追溯到 xTrimoGene 论文和官方仓库。

##### 算法伪代码

```python
# scFoundation / xTrimoGene RDA 预训练伪代码
def pretrain_scfoundation(raw_counts, model):
    # raw_counts: [B, G] full-gene expression, G ~= 20,000
    x_raw = normalize_and_log1p(raw_counts)

    # RDA: 构造低 read-depth source input
    x_source = hierarchical_bayesian_downsample(x_raw)
    T = total_count(x_raw)       # target read depth indicator
    S = total_count(x_source)    # source read depth indicator

    mask = biased_mask_zero_and_nonzero_positions(x_source)
    x_input = x_source.clone()
    x_input[mask] = MASK_VALUE

    # encoder 只看非零且未 mask 的 token，附加 T/S 指示符
    visible_idx = (x_input != 0) & (~mask)
    enc_tokens = make_gene_value_tokens(x_input, visible_idx, extra=[T, S])
    enc_h = transformer_encoder(enc_tokens)

    # decoder 接收 encoder output、zero embeddings、mask embeddings，恢复全基因
    dec_tokens = extend_to_full_gene_length(enc_h, mask, zero_positions=(x_input == 0))
    gene_context = performer_decoder(dec_tokens)
    x_hat = shared_mlp(gene_context)

    loss = mse(x_hat[mask], x_raw[mask])
    optimizer.step(loss)


def enhance_low_depth_cell(low_depth_counts, target_depth, model):
    x = normalize_and_log1p(low_depth_counts)
    S = total_count(x)
    T = target_depth
    return model.predict(x, T=T, S=S)  # no fine-tuning read-depth enhancement
```

##### 动机与背景

单细胞基础模型面临三个工程和建模矛盾。第一，人类常用基因列表接近 20,000，如果像 BERT 一样把所有基因都送入 full attention，单细胞图谱规模下计算不可承受。第二，scRNA-seq 极稀疏，许多零值是低表达或 dropout，把这些零 token 与高信息非零 token 等价处理会浪费大量算力。第三，表达值是连续计数/归一化值，简单离散成整数或类别会丢失“表达值相近意味着状态相近”的连续语义。

scFoundation 继承并扩展 xTrimoGene 的设计：用一个重 encoder、轻 decoder 的非对称结构，让昂贵的 Transformer encoder 只处理信息密度高的非零非 mask 基因；再由更轻的 decoder 合并 zero/mask token，输出全基因表达预测。这样既能覆盖约 2 万基因，又能把预训练扩展到 5,000 万以上细胞。

##### 非对称 encoder-decoder：为稀疏矩阵定制

对一个细胞的表达向量 \(x\in\mathbb{R}^{G}\)，先随机 mask 一部分零和非零位置。令可见非零位置集合为：

$$
\mathcal{V}=\{j\mid x_j>0,\ j\notin\mathcal{M}\}
$$

encoder 输入只包含 \(\mathcal{V}\) 中的 token。每个 token 由 gene embedding 和 value embedding 相加：

$$
h_j^{(0)} = E_{\mathrm{gene}}(j)+E_{\mathrm{value}}(x_j),\quad j\in\mathcal{V}
$$

然后用标准 multi-head self-attention 得到上下文表示：

$$
H_{\mathcal{V}}=\mathrm{TransformerEncoder}\left(\{h_j^{(0)}:j\in\mathcal{V}\}\right)
$$

decoder 阶段再把 encoder output、zero embedding 和 mask embedding 扩展回全基因长度：

$$
\tilde{H}_{1:G}=\mathrm{Merge}(H_{\mathcal{V}}, E_{\mathrm{zero}}, E_{\mathrm{mask}}, E_{\mathrm{gene}})
$$

随后使用较轻的 Performer decoder：

$$
Z_{1:G}=\mathrm{PerformerDecoder}(\tilde{H}_{1:G}),\quad \hat{x}_{1:G}=\mathrm{MLP}(Z_{1:G})
$$

这种非对称设计的直觉是：高容量 encoder 专注于真实观测到的表达上下文，轻量 decoder 负责把上下文广播到全基因空间并完成 masked regression。

##### 连续表达值的 auto-discretization

scFoundation/xTrimoGene 不把表达值简单四舍五入为离散类别，而是学习一个从连续标量到 embedding 的软映射。可抽象为：

$$
\alpha(x)=\mathrm{softmax}(W_2\,\sigma(W_1x))
$$

$$
E_{\mathrm{value}}(x)=\sum_{b=1}^{B}\alpha_b(x)\,v_b
$$

其中 \(v_b\) 是可学习 bin embedding，\(\alpha_b(x)\) 是表达值 \(x\) 对第 \(b\) 个 bin 的软权重。这样相近表达值会得到相近的 embedding 组合，远离表达值则对应明显不同的权重分布。相比硬分箱，这更适合保留连续表达强度信息。

##### RDA：read-depth-aware masked modeling

Nature 版本 scFoundation 的关键预训练任务是 RDA。它先从原始表达 \(x^{\mathrm{raw}}\) 构造一个低 read-depth 或未改变的 source 输入 \(x^{\mathrm{src}}\)，再把两个 total count 指示符输入模型：

$$
T=\sum_j x^{\mathrm{raw}}_j,\quad S=\sum_j x^{\mathrm{src}}_j
$$

其中 \(T\) 是 target read depth，\(S\) 是 source read depth。模型输入可写成：

$$
\mathrm{input} = [x^{\mathrm{src}}, T, S]
$$

在 masked positions \(\mathcal{M}\) 上预测原始表达：

$$
\mathcal{L}_{\mathrm{RDA}}
=
\frac{1}{|\mathcal{M}|}
\sum_{j\in\mathcal{M}}
\left(\hat{x}_j - x^{\mathrm{raw}}_j\right)^2
$$

如果 \(x^{\mathrm{src}}\) 是 downsampled profile，模型就被迫学习如何从低测序深度恢复高测序深度表达；如果 \(x^{\mathrm{src}}=x^{\mathrm{raw}}\)，任务退化为常规 masked expression recovery。RDA 因此同时学习 gene co-expression 关系和 read-depth 变化下的表达映射。

> 💡 关键：推理时可以设置 \(T>S\)，让模型在不微调的情况下执行 read-depth enhancement；这不是普通 MLM 自然具备的能力，而是 RDA 训练目标显式赋予的。

##### mask 策略与零值监督

由于零值占比远高于非零值，如果按同一概率随机 mask，模型可能学会“预测零”就能获得低误差。xTrimoGene/scFoundation 使用偏置 mask，使零和非零位置的监督更平衡：

$$
P(j\in\mathcal{M}\mid x_j>0) > P(j\in\mathcal{M}\mid x_j=0)
$$

同时仍保留一部分零值监督，因为某些零确实代表生物学上的极低表达。这个策略让模型既不会被零 token 主导，也不会完全忽略零表达对细胞状态的意义。

##### 下游使用：cell embedding 与 gene context embedding

预训练后，scFoundation 有两类常用输出。第一，encoder output 可通过 pooling 得到 cell embedding：

$$
z_{\mathrm{cell}}=\mathrm{Pool}(H_{\mathcal{V}})
$$

用于细胞聚类、细胞类型注释、批次/跨数据集映射、bulk 或 single-cell drug response prediction。第二，decoder 输出 \(Z_{1:G}\) 是 gene-level context embeddings，可用于 perturbation prediction 和 gene module inference。例如接入 GEARS 时，可用 scFoundation 的上下文 gene embedding 替代或增强原始表达输入，提高扰动后 top differential expressed genes 的预测质量。

##### 与 scBERT/scGPT 等模型的区别

| 维度 | scBERT / 常规 encoder-only | scGPT | scFoundation |
|------|-----------------------------|-------|--------------|
| token 粒度 | gene | gene + condition | gene + value + T/S |
| 主体结构 | full/efficient encoder | Transformer encoder + generation heads | 重 encoder + 轻 Performer decoder |
| 稀疏性处理 | 多数仍处理长基因序列 | 可按任务裁剪 gene set | encoder 过滤零和 mask token |
| 表达目标 | masked classification/regression | generative masked value prediction | RDA masked regression |
| 读深建模 | 通常隐式 | 主要通过数据/条件适配 | 显式输入 target/source total counts |
| 典型输出 | cell embedding | cell/gene embedding 与生成表达 | cell embedding 与 gene context embedding |

scFoundation 的优势在于规模和全基因覆盖：它不依赖只选 HVG 来降低输入维度，而是通过架构利用稀疏性来扩展到约 20,000 基因。代价是模型机制比简单 encoder 更复杂，且 RDA 的读深增强能力依赖训练时 downsampling 分布与目标数据测序机制是否匹配。因此在新平台、新物种或非标准计数矩阵上使用时，仍应检查归一化、基因列表映射和 \(T/S\) 设置。

#### 🧪 练习题
```yaml
question: "scFoundation 的 RDA 预训练任务相比普通 masked expression recovery 多建模了什么信息？"
options:
  - "只建模蛋白质三维坐标"
  - "显式加入 target/source total count，让模型学习不同 read depth 之间的表达映射"
  - "完全删除零表达基因，不再预测 masked values"
  - "把每个细胞当作图像像素进行卷积"
answer: 1
explain: "RDA 使用 T 和 S 表示目标与输入测序深度，训练模型从 masked/低深度输入恢复原始表达，因此可服务于免微调 read-depth enhancement。"
```

### RegFormer

```yaml
id: regformer
num: 35
name: RegFormer
full_name: RegFormer (RegFormer)
year: '2026.03'
org: 曹龙团队
parent: scgpt
paper_url: https://www.nature.com/articles/s41467-026-72198-x
project_url: ''
category: single_cell
motivation: 基因调控层级增强跨组织迁移
```

#### 📝 一句话总结
RegFormer 提出将基因调控网络（GRN）的有向无环图拓扑排序作为基因输入序列的组织原则，结合 Mamba 状态空间模型替代 Transformer 注意力机制，通过三重自监督预训练目标（MVP、GEPC、TOPO）在 2500 万人类细胞上预训练，在细胞注释、GRN 重建、遗传扰动预测和药物响应预测等任务上全面超越 scGPT、Geneformer 等现有单细胞基础模型。

#### 🎯 核心要点
- **GRN 引导的基因排序**：利用 CisTarget 数据库构建 TF-target 调控网络，经 Node2Vec 嵌入 + 迭代边移除转化为 DAG（保留 >92% 边），通过拓扑排序将上游 TF 排在下游 target 之前，为序列模型注入因果调控先验
- **Mamba 状态空间编码器**：以选择性状态空间模型（SSM）替代 Transformer 自注意力，实现 \(O(N)\) 线性复杂度的长程依赖建模，适配万级基因序列
- **双嵌入方案**：每个基因同时编码 token embedding（基因身份）和 value embedding（表达量），求和后输入编码器，联合学习分类与定量信息
- **三重预训练目标**：MVP（掩码值预测，MSE）、GEPC（细胞嵌入→表达谱重建）、TOPO（拓扑序列下一基因预测，CE），权重比 0.1:0.5:1
- **大规模预训练数据**：25M 人类细胞，覆盖 45 种组织，来源 CZ CELLxGENE，LMDB 高效存储
- **两种输入规模**：1.2k 基因版本和 10k 基因版本，10k 版本在所有任务上表现更优
- **五项下游任务全面领先**：细胞嵌入（ASW）、细胞类型注释（Macro-F1）、GRN 重建（GO 富集 + regulon 活性）、遗传扰动预测（GEARS，MSE/Pearson）、药物响应预测（DeepCDR，IC₅₀ PCC/SRCC）
- **系统性消融验证**：Mamba > Transformer、GRN 排序 > 随机排序、双嵌入 > 仅值嵌入、回归 > 分类、TOPO 目标贡献最大

#### 🔬 深入细节
##### 核心架构示意图

![RegFormer 架构总览](https://www.nature.com/articles/s41467-026-72198-x/figures/1)
*图：RegFormer 整体框架。左侧为 GRN 构建与 DAG 拓扑排序流程，中间为双嵌入 + Mamba 编码器架构，右侧为三重预训练目标及下游任务。*

##### 算法伪代码

```python
# RegFormer 预训练流程伪代码

# ====== 阶段 0: GRN 构建与拓扑排序 ======
grn = build_grn_from_cistarget(tf_motif_db)       # TF → top-20 targets
for tf in grn.nodes:
    grn.add_edges(tf, top_k_targets(tf, k=20))     # 有向边 TF → target
dag = convert_to_dag(grn, method="node2vec_iterative_edge_removal")
# 保留 >92% 原始边
gene_order = topological_sort(dag)                  # 上游 TF 在前

# ====== 阶段 1: 双嵌入编码 ======
for cell in dataloader:
    x = cell.expression_vector                      # 归一化表达值
    g = cell.gene_indices                            # 基因索引
    # 按 GRN 拓扑排序重排
    x, g = reorder_by_topology(x, g, gene_order)
    # 双嵌入
    h = E_token(g) + E_value(x)                     # Eq.(3): token + value
    H = [h_1, h_2, ..., h_N]                        # 输入序列

# ====== 阶段 2: Mamba SSM 编码 ======
for layer in mamba_layers:
    # 状态空间递推: h_{t+1} = A·h_t + B·x_t
    # 输出: y_t = C·h_t
    # 实现: 深度卷积 + 门控激活
    H = sigma(W_g * H) ⊙ (W_s * H)                 # Eq.(6): 门控 SSM

# ====== 阶段 3: 多任务预训练 ======
# 掩码 40% 的基因
mask = random_mask(N, ratio=0.4)

# MVP: 掩码值预测 (MSE)
x_hat_mvp = decoder_mvp(H[mask])
L_mvp = MSE(x_hat_mvp, x[mask])                    # Eq.(7)

# GEPC: 细胞嵌入 → 全基因表达重建
c = pool(H)                                         # 细胞嵌入
x_hat_gepc = query_vectors @ W @ c                  # Eq.(8)
L_gepc = MSE(x_hat_gepc, x)                         # Eq.(9)

# TOPO: 拓扑序列下一基因预测 (Cross-Entropy)
z = predict_next_token(H)
L_topo = CrossEntropy(z, gene_order[1:])             # Eq.(10)

# 总损失
L = 0.1 * L_mvp + 0.5 * L_gepc + 1.0 * L_topo      # Eq.(11)
optimizer.step(L)
```

##### 方法深入解释

**1. 动机与背景：为什么需要 GRN 先验？**

现有单细胞基础模型（scGPT、Geneformer、scFoundation 等）直接借用 NLP 范式，将基因视为"词"、细胞视为"句子"。然而，基因表达数据与自然语言存在本质差异：

- **无固有顺序**：自然语言有语法结构，但基因在细胞中并无天然的线性排列。现有方法要么随机排列，要么按表达量排序，均缺乏生物学依据。
- **调控层级**：基因之间存在明确的因果调控关系——转录因子（TF）调控下游靶基因，形成有向层级网络。这一结构信息被现有模型完全忽略。
- **二次复杂度瓶颈**：Transformer 的自注意力机制复杂度为 \(O(N^2)\)，限制了输入基因数量（scGPT 仅支持 1.2k 基因），而人类转录组包含 ~20,000 个基因。

> 💡 关键：RegFormer 的核心洞察是——**基因调控网络本身就是最好的"语法"**。通过将 GRN 的拓扑排序作为输入序列的组织原则，模型天然地先"看到"上游调控因子，再"看到"下游靶基因，从而在序列建模中隐式编码因果调控方向。

**2. GRN 构建与 DAG 转换**

RegFormer 的 GRN 构建分三步：

**Step 1: TF-target 关系提取。** 使用 pySCENIC 的 CisTarget 数据库，基于 TF 结合基序（motif）的富集分析，为每个 TF 识别其 top-20 靶基因，构建有向调控图 \(\mathbf{G} = (\mathbf{V}, \mathbf{E})\)。

**Step 2: Node2Vec 嵌入。** 对调控图进行 Node2Vec 随机游走，生成节点嵌入向量，用于后续的边方向判定和环路检测。

**Step 3: 迭代边移除转 DAG。** 原始 GRN 包含环路（如 TF 之间的互相调控），不满足拓扑排序的前提。通过迭代移除反馈边（基于 Node2Vec 嵌入判定边方向），将有向图转化为有向无环图（DAG），保留 >92% 的原始边：

$$\mathbf{G}_{\text{DAG}} = (\mathbf{V}, \mathbf{E}'), \quad |\mathbf{E}'| / |\mathbf{E}| > 0.92$$

最终使用 DGL 库的 `topological_nodes_generator` 函数进行拓扑排序，生成从源节点（上游 TF）到汇节点（下游 target）的基因序列。

**3. 双嵌入方案（Dual-Embedding）**

与 NLP 中仅使用 token embedding 不同，基因表达数据同时包含**离散身份**（哪个基因）和**连续数值**（表达量）两种信息。RegFormer 设计了双嵌入方案：

$$\mathbf{h}_i = \mathbf{E}_{\text{token}}(g_i) + \mathbf{E}_{\text{value}}(x_i)$$

其中 \(\mathbf{E}_{\text{token}}\) 将离散基因索引 \(g_i\) 映射为可学习嵌入向量，\(\mathbf{E}_{\text{value}}\) 通过线性变换将归一化表达值 \(x_i\) 投影到相同维度。两者求和后形成输入序列 \(\mathbf{H}_0 = [\mathbf{h}_1, \mathbf{h}_2, \ldots, \mathbf{h}_N]\)。

> ⚠️ 注意：消融实验表明，移除 token embedding（仅保留 value embedding）会显著降低性能，说明基因身份信息对于跨数据集泛化至关重要。

**4. Mamba 状态空间编码器**

RegFormer 的核心编码器由堆叠的 Mamba 块组成，每个块实现选择性状态空间模型（Selective SSM）。其连续动力学定义为：

$$\mathbf{h}_{t+1} = \mathbf{A}\mathbf{h}_t + \mathbf{B}\mathbf{x}_t$$

$$y_t = \mathbf{C}\mathbf{h}_t$$

其中 \(\mathbf{A}\)、\(\mathbf{B}\)、\(\mathbf{C}\) 分别为可学习的状态转移矩阵、输入矩阵和输出矩阵。在实际实现中，连续动力学通过深度卷积和门控激活近似：

$$\mathbf{H}' = \sigma(\mathbf{W}_g * \mathbf{H}) \odot (\mathbf{W}_s * \mathbf{H})$$

其中 \(*\) 为一维序列卷积，\(\sigma\) 为 sigmoid 门控函数，\(\odot\) 为逐元素乘法。

与 Transformer 的 \(O(N^2)\) 自注意力相比，Mamba 的计算复杂度为 \(O(N)\)，使得 RegFormer 能够处理 10,000 个基因的长序列输入。消融实验中，在相同隐藏维度（256）、前馈扩展（×4）和 dropout（0.1）设置下，Mamba 在所有评估指标上均优于 Transformer。

> 💡 关键：Mamba 的选择性状态更新机制与 GRN 拓扑排序形成天然协同——状态空间的递推方向与调控信号的传播方向一致，使模型能够沿着调控层级逐步积累上下文信息。

**5. 三重预训练目标**

RegFormer 联合优化三个互补的自监督目标：

| 目标 | 任务描述 | 损失函数 | 权重 \(\lambda\) |
|------|---------|---------|-----------------|
| **MVP** | 掩码值预测：随机掩码 40% 基因表达值，预测原始值 | MSE | 0.1 |
| **GEPC** | 细胞表达预测：从细胞嵌入重建全基因表达谱 | MSE | 0.5 |
| **TOPO** | 拓扑角色预测：预测 GRN 拓扑序列中的下一个基因 | Cross-Entropy | 1.0 |

总损失为：

$$\mathcal{L}_{\text{total}} = 0.1 \cdot \mathcal{L}_{\text{MVP}} + 0.5 \cdot \mathcal{L}_{\text{GEPC}} + 1.0 \cdot \mathcal{L}_{\text{TOPO}}$$

三个目标分别捕获：局部表达模式（MVP）、全局细胞状态（GEPC）、调控方向性（TOPO）。消融实验表明 **TOPO 目标贡献最大**——移除 TOPO 导致性能下降最为显著，说明调控方向性的学习是 RegFormer 的核心优势来源。

**6. 与现有方法的关键区别**

| 特性 | scGPT | Geneformer | scFoundation | **RegFormer** |
|------|-------|------------|-------------|---------------|
| 基因排序 | 按表达量降序 | 按表达量排名 | 无特定排序 | **GRN 拓扑排序** |
| 编码器 | Transformer | Transformer | Transformer | **Mamba SSM** |
| 最大基因数 | 1,200 | 2,048 | ~20,000 | **10,000+** |
| 调控先验 | 无 | 无 | 无 | **CisTarget GRN** |
| 预训练数据 | 33M cells | 30M cells | 50M cells | **25M cells** |
| 嵌入方式 | token + value | rank-value | 表达值 | **dual embedding** |

> 💡 关键：RegFormer 用更少的预训练数据（25M vs 50M）实现了更优的性能，证明了生物学先验（GRN 拓扑）比单纯增加数据规模更为有效。

**7. 训练配置**

- **硬件**：20 × NVIDIA A100 (40GB)，分布式数据并行
- **消融实验**：在 100 万血液细胞上训练，确保公平对比
- **全量预训练**：25M 细胞，LMDB 存储，混合精度训练
- **下游微调**：线性分类头 + 平均池化细胞嵌入，20 epochs，学习率 0.0001

#### 🧪 练习题
```yaml
question: "RegFormer 将基因调控网络（GRN）转化为有向无环图（DAG）时，保留了原始边的多大比例？"
options:
  - "约 50%，大幅简化网络结构"
  - "约 75%，在简化与保真之间取平衡"
  - "超过 92%，最大程度保留调控关系"
  - "100%，完全保留所有原始边"
answer: 2
explain: "论文中明确指出，通过 Node2Vec 嵌入引导的迭代边移除策略，将 GRN 转化为 DAG 时保留了超过 92% 的原始边，在满足拓扑排序前提的同时最大程度保留了调控网络的完整性。"
```

### Geneformer V2

```yaml
id: geneformer_v2
num: 36
name: Geneformer V2
full_name: Geneformer V2 (Geneformer V2)
year: '2026.03'
org: Broad Institute
parent: geneformer
paper_url: https://www.biorxiv.org/content/10.1101/2026.03.15.485123v1
project_url: ''
category: single_cell
motivation: 316M参数增强复杂调控网络推断
```

#### 📝 一句话总结
Geneformer V2 将 Geneformer 从 10M 参数、约 3000 万细胞扩展到 104M/316M 参数和约 1.04 亿人类单细胞转录组，通过 rank-value 编码、掩码基因预测、缩放规律分析和 4-bit 量化微调，让更大的单细胞 Transformer 能在少样本或零样本场景下推断更复杂的基因网络动态。

#### 🎯 核心要点
- **规模升级**：V2 官方模型包含 Geneformer-V2-104M 与 Geneformer-V2-316M；316M 版本为 18 层、隐藏维度 1152、18 个注意力头，输入长度 4096
- **数据升级**：Genecorpus-104M 汇集约 1.04 亿人类单细胞转录组、约 150B gene tokens，覆盖更广泛的组织、疾病和发育状态
- **rank-value 表达编码**：每个细胞内基因按相对表达强度排序，并用跨语料基因表达中位数缩放，降低 housekeeping genes 的支配性、提升低表达但状态特异 TF 的优先级
- **自监督预训练目标**：随机掩码 15% 基因 token，训练 Transformer 根据上下文恢复被遮盖基因，学习上下文依赖的 gene-gene network dynamics
- **缩放规律**：论文报告更大参数量在 transcriptional masked learning 上按 power-law 改善，316M 模型在基因级和细胞级零样本任务中通常最强
- **量化与 LoRA**：4-bit quantized Geneformer 通过冻结量化基座并训练低秩适配器，保留 full-precision 表征能力，同时显著降低微调时间与显存
- **任务覆盖**：支持 zero-shot embedding、in silico perturbation/treatment、TF target/cooperativity、gene/cell classification、batch-aware cell-state representation 等
- **来源校正**：任务给定 bioRxiv URL 当前无法作为 Geneformer V2 主文献检索；可访问的 V2 论文为 Nature Computational Science 2026 文章 `https://www.nature.com/articles/s43588-026-00972-4`，模型卡与官方仓库见 `https://huggingface.co/ctheodoris/Geneformer`

#### 🔬 深入细节
![Geneformer V2 scaling and transfer learning](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs43588-026-00972-4/MediaObjects/43588_2026_972_Fig1_HTML.png)
*图：Geneformer V2 论文 Figure 1。该图展示 Geneformer 的 transfer learning 策略、Genecorpus-104M 组成、4096 输入长度覆盖度，以及随参数量增长的 masked-gene 预训练损失缩放规律。*

##### 来源说明

任务 YAML 中的 `https://www.biorxiv.org/content/10.1101/2026.03.15.485123v1` 当前未能检索到 Geneformer V2 论文页面。本文方法解读基于可访问的 Nature Computational Science 版本 `Scaling and quantization of large-scale foundation model enables resource-efficient predictions in network biology`、Geneformer Hugging Face 模型卡、CZ Virtual Cells Platform 模型卡和 Geneformer 文档。上述来源一致指出 V2 模型训练于 Genecorpus-104M，公开 V2-104M/V2-316M 权重，并将 V2-316M 作为当前默认模型。

##### 算法伪代码

```python
# Geneformer V2 pretraining / downstream use
def geneformer_v2_pretrain(cells, gene_median, transformer, vocab, max_len=4096):
    for cell in cells:
        # 1. rank-value encoding: 先按跨语料中位表达缩放，再在单细胞内排序
        detected = genes_with_nonzero_counts(cell)
        scaled_expr = {g: cell.count[g] / gene_median[g] for g in detected}
        gene_tokens = sort_descending_by_value(scaled_expr)[:max_len]
        gene_tokens = ["[CLS]"] + gene_tokens + ["[EOS]"]

        # 2. masked transcriptional modeling
        mask = sample_positions(gene_tokens, ratio=0.15, exclude_special=True)
        corrupted = replace(gene_tokens, mask, "[MASK]")

        # 3. Transformer encoder learns contextual gene/cell embeddings
        h = transformer(corrupted, attention_mask=non_padding_mask(corrupted))
        logits = lm_head(h[mask])
        loss = cross_entropy(logits, gene_tokens[mask])
        update(transformer, loss)

def geneformer_v2_lora_finetune(task_cells, labels, pretrained_316m):
    # 4-bit base frozen; low-rank adapters carry task-specific update
    base = quantize_4bit(pretrained_316m)
    adapters = init_lora_adapters(base, rank=r)
    for cells, y in task_cells:
        emb = base.forward_with_adapters(cells, adapters)
        loss = task_loss(task_head(emb["CLS"]), y)
        update(adapters, task_head, loss)
    return base, adapters, task_head
```

##### rank-value 编码：把转录组变成“细胞句子”

Geneformer 的关键输入并不是原始 count 向量，而是每个细胞内部的基因排序。设 \(x_{cg}\) 是细胞 \(c\) 中基因 \(g\) 的表达量，\(m_g\) 是该基因在预训练语料中非零表达的中位数，则一个简化 rank-value 分数可写为：

$$
s_{cg}=\frac{x_{cg}}{m_g+\epsilon}, \qquad
\pi_c=\operatorname{argsort}_{g \in G_c}(-s_{cg})
$$

\(\pi_c\) 是送入 Transformer 的 token 序列。这个设计的直觉是：原始 count 中高表达 housekeeping genes 往往会占据前列，但它们未必最能区分细胞状态；相反，转录因子等低表达基因一旦相对自身典型表达范围被显著激活，可能更能说明调控状态。rank-value 编码把“在这个细胞里异常重要的基因”放到前面，使模型更容易从上下文中学习调控网络层级。

##### 掩码基因预测与上下文网络表征

预训练目标沿用 BERT 式 masked token learning，但 token 是基因而不是自然语言词。随机选择位置集合 \(M\)，模型根据未遮盖基因和它们的排序位置预测被遮盖基因：

$$
\mathcal{L}_{\text{MLM}}
=-\sum_{i \in M}\log p_\theta(g_i \mid \pi_c^{\setminus M}, i)
$$

这个目标不会直接输入显式 GRN 边，而是迫使模型学习“哪些基因在同一细胞状态下共同出现、谁能解释谁的上下文”。论文报告 Geneformer 的注意力和嵌入空间能够编码 network hierarchy，并支持 TF dosage sensitivity、TF target prediction、chromatin dynamics、regulatory range 等基因级任务。

##### V2 的缩放逻辑

V1 的主要限制是语料、输入长度和参数量较小。V2 使用 Genecorpus-104M 和 4096 输入长度，论文指出该长度可覆盖 Genecorpus-104M 中绝大多数细胞的检测基因数。模型族从 10M 扩到 104M 与 316M 后，训练损失与 held-out masked gene prediction 随参数量改善，表现出类似语言模型的缩放趋势：

$$
\mathcal{L}(N) \approx aN^{-\alpha}+b
$$

其中 \(N\) 表示参数量或计算预算。实际含义是：在更大、更多样的单细胞语料上，更大的 Transformer 能容纳更多细胞状态、组织上下文和调控模式，尤其在没有任务标签的 zero-shot embedding 与少样本 fine-tuning 中更有优势。

##### 量化微调：让 316M 模型可用

316M dense Transformer 对实验室 GPU 资源并不友好。Geneformer V2 论文因此把量化作为核心工程贡献之一：冻结 4-bit 量化后的基座权重，只训练低秩适配器。简化写法是：

$$
W_{\text{eff}} = Q_4(W_0) + \frac{\alpha}{r}BA
$$

其中 \(Q_4(W_0)\) 是 4-bit 量化权重，\(A,B\) 是 LoRA 低秩矩阵。论文报告在相同 batch size 下，4-bit 量化模型的 fine-tuning 时间约为 full-precision 的 15%，显存约为 34%，同时在基因级与细胞级任务上与 full-precision 模型无显著差异。这使 V2-316M 不只是“更大”，而是能在普通下游任务中被实际微调和部署。

##### 与原始 Geneformer 的区别

原始 Geneformer 的贡献是证明单细胞转录组可以作为可迁移的网络生物学基础模型，用少量数据做疾病基因、TF target、候选治疗靶点等预测。V2 的新增重点是规模化与资源效率：更大语料、更长输入、更大模型、更系统的 scaling-law 评估，以及 4-bit/LoRA 路线。它并没有把单细胞数据改造成显式图神经网络，而是继续押注“ranked gene sequence + Transformer encoder”的统一形式，让同一表征能服务 gene-level 和 cell-level 任务。

> 💡 关键：Geneformer V2 的核心不是新增一个复杂下游头，而是验证“单细胞转录组 Transformer 确实吃规模”，并用量化把 316M 参数模型从论文结果变成可微调工具。

#### 🧪 练习题
```yaml
question: "Geneformer V2 的 rank-value encoding 主要解决什么问题？"
options:
  - "把所有基因按染色体坐标排序，从而保留基因组空间距离"
  - "用跨语料表达尺度校正单细胞内表达排序，突出状态特异基因而非单纯高表达基因"
  - "把表达量离散成固定 0/1 标签，删除连续表达信息"
  - "直接输入人工标注的基因调控网络边，替代 Transformer 注意力"
answer: 1
explain: "rank-value encoding 先按每个基因在大语料中的典型表达范围缩放，再在单细胞内排序；这会降低 housekeeping genes 的支配性，并提升转录因子等状态特异基因的上下文权重。"
```

### DiffDock

```yaml
id: diffdock
num: 37
name: DiffDock
full_name: DiffDock (DiffDock)
year: '2023.03'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2210.01776
project_url: ''
category: drug_discovery
motivation: 流形扩散解决分子盲对接难题
```

#### 📝 一句话总结
DiffDock 将分子对接建模为乘积流形 \(\mathbb{T}(3) \times SO(3) \times SO(2)^m\) 上的扩散生成过程，通过在平移、旋转和扭转自由度上独立运行前向扩散与逆向去噪，实现了无需预知结合口袋的盲对接，在 PDBBind 基准上以 38% 的 top-1 成功率（RMSD < 2Å）大幅超越传统搜索方法（23%）和先前深度学习方法（20%）。

#### 🎯 核心要点
- **范式转变**：首次将分子对接从回归/搜索问题重新定义为乘积流形上的生成建模问题，可一次性采样多个候选构象并排序
- **乘积流形扩散**：在 \(\mathbb{P} = \mathbb{T}(3) \times SO(3) \times SO(2)^m\) 上定义独立的前向 SDE，分别处理配体平移、整体旋转和可旋转键扭转角三类自由度
- **SO(3) 扩散核**：采用 IGSO(3) 分布作为旋转扩散核，支持高效采样与解析 score 计算
- **扭转角解耦**：通过 RMSD 对齐定义扭转操作，确保扭转变换在无穷小极限下与平移/旋转正交（零线动量与零角动量）
- **SE(3) 等变 Score 模型**：基于张量积卷积的异构几何图网络，蛋白质使用 α-碳粗粒化表示，配体使用全原子表示
- **Confidence 模型**：独立训练的二分类模型，以 RMSD < 2Å 为标签对生成的候选构象进行排序，显著提升选择精度
- **ESMFold 兼容性**：在计算折叠的蛋白质结构上仍保持 21.7% 成功率，远超其他方法的最高 10.4%
- **PDBBind 基准**：top-1 成功率 38%，top-5 成功率进一步提升；中位 RMSD 显著低于所有基线方法

#### 🔬 深入细节
![DiffDock 总览示意图](https://ar5iv.labs.arxiv.org/html/2210.01776/assets/x1.png)
*图：DiffDock 方法概览。左侧展示分子对接的三类自由度（平移、旋转、扭转）；中间展示在乘积流形上的前向扩散与逆向去噪过程；右侧展示 confidence 模型对多个候选构象的排序。*

```python
# DiffDock 推理伪代码
def diffdock_inference(protein_y, ligand_seed_c, score_model, confidence_model, N=40, T=20):
    """
    protein_y: 蛋白质3D结构 (α-碳 + 序列嵌入)
    ligand_seed_c: 配体种子构象 (RDKit ETKDG 生成)
    N: 并行采样的候选构象数
    T: 逆向扩散步数
    """
    poses = []
    for i in range(N):
        # 1. 从先验分布采样初始噪声态
        r_T ~ N(0, σ_tr_max² I₃)           # 平移: 高斯分布
        R_T ~ IGSO3(σ_rot_max²)             # 旋转: IGSO(3) 均匀分布
        θ_T ~ WrappedNormal(0, σ_tor_max²)  # 扭转: 环面上均匀分布
        x_T = apply_transform(ligand_seed_c, r_T, R_T, θ_T)

        # 2. 逆向扩散去噪
        for t in reversed(range(1, T+1)):
            # Score 模型预测各自由度的 score
            s_tr, s_rot, s_tor = score_model(x_t, protein_y, t)
            # 在各流形上独立执行测地线随机游走 (geodesic random walk)
            r_update = σ_tr²(t) * s_tr + noise_tr
            R_update = exp(σ_rot²(t) * s_rot + noise_rot)  # SO(3) 指数映射
            θ_update = σ_tor²(t) * s_tor + noise_tor       # 环面上加法
            x_{t-1} = apply_transform(x_t, r_update, R_update, θ_update)

        poses.append(x_0)

    # 3. Confidence 模型排序
    scores = [confidence_model(pose, protein_y) for pose in poses]
    ranked_poses = sort_by_confidence(poses, scores)
    return ranked_poses
```

**动机与背景：从搜索到生成的范式转变**

分子对接（Molecular Docking）是药物发现中的核心计算任务，目标是预测小分子配体与蛋白质靶标的结合构象。传统方法（如 AutoDock Vina、GNINA、GLIDE）采用"搜索+打分"范式：在构象空间中通过采样或优化搜索低能构象，再用物理或经验打分函数评估。这类方法面临两个根本性挑战：（1）搜索空间随可旋转键数量指数增长，计算代价高昂；（2）通常需要预先指定结合口袋位置，无法实现真正的盲对接。近年来，深度学习方法（如 EquiBind、TANKBind）尝试通过回归直接预测结合位姿，但回归框架天然只能输出单一预测，无法捕捉对接问题固有的多模态性——同一蛋白质-配体对可能存在多个合理的结合模式。DiffDock 的核心洞察在于：分子对接本质上应被视为一个**生成建模**问题，而非回归问题。通过学习结合构象的概率分布而非点估计，模型能够自然地表达多模态性，并通过采样多个候选构象来提升预测精度。

**核心机制：乘积流形上的扩散过程**

DiffDock 的技术核心在于如何在描述对接自由度的流形上定义高效的扩散过程。给定配体的种子构象 \(\mathbf{c} \in \mathbb{R}^{3n}\)，任何合法的对接构象都可以通过三类变换到达：（1）配体整体平移 \(\mathbf{r} \in \mathbb{T}(3) \cong \mathbb{R}^3\)；（2）配体绕质心旋转 \(R \in SO(3)\)；（3）\(m\) 个可旋转键的扭转角变化 \(\boldsymbol{\theta} \in SO(2)^m\)。这定义了一个 \((m+6)\) 维的构象流形 \(\mathcal{M}_\mathbf{c}\)。直接在 \(\mathcal{M}_\mathbf{c} \subset \mathbb{R}^{3n}\) 上做扩散需要数值求解测地线随机游走，计算代价极高。DiffDock 的关键理论贡献是证明了映射 \(A(\cdot, \mathbf{c}): \mathbb{P} \to \mathcal{M}_\mathbf{c}\) 是双射，其中 \(\mathbb{P} = \mathbb{T}(3) \times SO(3) \times SO(2)^m\) 是乘积空间。由于 \(\mathbb{P}\) 是乘积流形，前向扩散在各分量上独立进行，切空间为直和：

$$T_g \mathbb{P} = T_\mathbf{r} \mathbb{T}(3) \oplus T_R SO(3) \oplus T_{\boldsymbol{\theta}} SO(2)^m \cong \mathbb{R}^3 \oplus \mathbb{R}^3 \oplus \mathbb{R}^m$$

在三个分量上，前向 SDE 统一定义为 \(d\mathbf{x} = \sqrt{d\sigma^2(t)/dt}\, d\mathbf{w}\)，其中 \(\sigma^2\) 分别为 \(\sigma_{\text{tr}}^2, \sigma_{\text{rot}}^2, \sigma_{\text{tor}}^2\)。平移分量的扩散核是标准高斯分布；旋转分量使用 IGSO(3) 分布，其密度在轴角参数化下为：

$$f(\omega) = \sum_{\ell=0}^{\infty} (2\ell+1) \, e^{-\ell(\ell+1)\sigma^2} \frac{\sin\left((\ell+\frac{1}{2})\omega\right)}{\sin(\omega/2)}$$

该分布可通过先均匀采样旋转轴 \(\hat{\boldsymbol{\omega}}\)、再按 \(f(\omega)\) 采样旋转角 \(\omega \in [0, \pi]\) 实现高效采样。其 score 为 \(\nabla \ln p_t(R' \mid R) = \left(\frac{d}{d\omega}\log f(\omega)\right) \hat{\boldsymbol{\omega}}\)。扭转角分量在环面 \(\mathbb{T}^m\) 上使用 wrapped normal 分布，score 同样有解析形式。

**扭转角操作的精巧设计**

扭转角变换的定义需要特别注意与平移/旋转的解耦。对于第 \(k\) 个可旋转键 \((a_k, b_k)\)，朴素的扭转更新（仅旋转键的一侧）会引入整体平移和旋转。DiffDock 通过在所有扭转更新后执行全局 RMSD 对齐来消除这一耦合：

$$A_{\text{tor}}(\boldsymbol{\theta}, \mathbf{x}) = \text{align}\left(B_{m,\theta_m} \circ \cdots \circ B_{1,\theta_1}(\mathbf{x}),\; \mathbf{x}\right)$$

论文证明了这一定义在无穷小极限下满足零线动量和零角动量条件，即扭转变换的切向量与平移/旋转切向量正交。这确保了乘积空间上的独立扩散在映射回构象空间后仍然是良定义的。

**Score 模型与 Confidence 模型的架构设计**

Score 模型 \(\mathbf{s}(\mathbf{x}, \mathbf{y}, t)\) 基于 SE(3) 等变卷积网络，输入为配体原子和蛋白质残基（α-碳表示）构成的异构几何图。蛋白质残基节点使用 ESM 语言模型嵌入作为初始特征。模型需要输出三类 score：（1）平移 score \(\in \mathbb{R}^3\)（SE(3) 等变向量）；（2）旋转 score \(\in \mathbb{R}^3\)（SE(3) 等变欧拉向量）；（3）扭转 score \(\in \mathbb{R}^m\)（SE(3) 不变标量）。平移和旋转 score 通过在配体质心处放置张量积滤波器卷积得到；扭转 score 通过"伪力矩"卷积计算。Confidence 模型具有类似架构，但使用全原子蛋白质表示以获得更精确的接触信息，输出 SE(3) 不变的标量置信度。训练时，先运行已训练的扩散模型生成候选构象，以 RMSD < 2Å 为正标签训练二分类交叉熵损失。这种多尺度设计（score 模型用粗粒化、confidence 模型用全原子）在保证推理速度的同时提升了排序精度。

> 💡 **关键创新**：DiffDock 的核心贡献不仅在于将扩散模型应用于对接，更在于严格地定义了乘积流形上的扩散过程，使得各自由度的扩散核均有解析形式，避免了子流形扩散中昂贵的数值积分。

**实验结果**

在 PDBBind 时间分割测试集上，DiffDock（采样 40 个构象）达到 38% 的 top-1 成功率（RMSD < 2Å），显著优于 GNINA（22.9%）、SMINA（18.7%）、GLIDE（21.8%）等传统方法，以及 EquiBind（5.5%）、TANKBind（20.9%）等深度学习方法。在使用 ESMFold 预测的蛋白质结构进行对接时，DiffDock 保持 21.7% 的成功率，而其他方法最高仅 10.4%，展示了对蛋白质结构噪声的鲁棒性。推理速度方面，DiffDock 在 GPU 上每个复合物约需 10 秒（含 40 个采样），与传统方法在 CPU 上的运行时间相当。

#### 🧪 练习题
```yaml
question: "DiffDock 在 SO(3) 旋转分量上使用的扩散核分布是什么？"
options:
  - "标准高斯分布 (Gaussian)"
  - "von Mises-Fisher 分布"
  - "IGSO(3) 分布 (Isotropic Gaussian on SO(3))"
  - "Wrapped Cauchy 分布"
answer: 2
explain: "DiffDock 在旋转自由度上使用 IGSO(3) 分布作为扩散核，该分布是 SO(3) 上布朗运动的转移核，支持通过轴角参数化进行高效采样和解析 score 计算。平移使用标准高斯，扭转角使用 wrapped normal 分布。"
```

### Uni-Mol

```yaml
id: unimol
num: 38
name: Uni-Mol
full_name: Uni-Mol (Uni-Mol)
year: '2023.04'
org: 深势科技
parent: —
paper_url: https://openreview.net/forum?id=6K2RM6wVqKu
project_url: ''
category: drug_discovery
motivation: 统一三维分子与蛋白质表征学习
```

#### 📝 一句话总结
Uni-Mol 提出统一的 3D molecular representation learning 框架，用同构的 SE(3) Transformer 分别预训练小分子模型和蛋白口袋模型，并通过掩码原子、坐标去噪和距离矩阵恢复把 3D 几何直接纳入分子性质预测、构象生成和蛋白-配体结合位姿预测。

#### 🎯 核心要点
- **双预训练模型**：molecular model 训练于 209M 小分子 3D conformations；pocket model 训练于 3M candidate protein pockets；两者架构相同但词表和数据不同
- **统一 3D 输入**：每个原子/口袋原子以 token、3D 坐标和 pairwise distance 输入，额外加入 `[CLS]` 表示整体分子或口袋
- **Transformer + pair bias**：用距离的 Gaussian basis function 和 edge type 构造 attention bias，使自注意力直接感知三维几何
- **三重预训练目标**：masked atom prediction、masked coordinate denoising、masked pair-distance prediction 同时优化
- **坐标更新头**：由 pair representation 预测原子间相对位移权重，通过 \(\sum_j (x_i-x_j)w_{ij}\) 形式更新被噪声扰动的坐标
- **多任务迁移**：分子性质预测只用 molecular model；口袋性质预测只用 pocket model；蛋白-配体位姿预测同时使用 molecule 与 pocket 表征
- **实验覆盖广**：OpenReview 论文报告在 15 个分子性质任务中 14 个达到 SOTA，并在构象生成、binding pose prediction 和 pocket druggability few-shot 等 3D 空间任务中表现突出
- **官方资源完整**：论文、代码、预训练权重和数据均公开；框架图可访问 `https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png`

#### 🔬 深入细节
![Uni-Mol framework overview](https://raw.githubusercontent.com/deepmodeling/Uni-Mol/main/unimol/figure/overview.png)
*图：Uni-Mol 官方仓库中的框架示意图。左侧展示分子与蛋白口袋的两类预训练模型，中间是 3D Transformer 表征学习，右侧是性质预测、构象生成、口袋任务和蛋白-配体结合位姿预测等下游应用。*

##### 算法伪代码

```python
# Uni-Mol pretraining and downstream transfer
def unimol_pretrain(batch, model, lambda_tok=1, lambda_coord=5, lambda_dist=10):
    tokens, coord, edge_type = batch.atom_tokens, batch.coord, batch.edge_type
    coord = add_cls_atom_at_center(coord)
    tokens = add_cls_token(tokens)

    # 1. 15% atoms are masked; coordinates are corrupted by uniform noise
    mask = sample_atom_mask(tokens, ratio=0.15)
    tokens_in = replace(tokens, mask, "[MASK]")
    coord_noisy = coord.clone()
    coord_noisy[mask] += uniform(-1.0, 1.0, size=(mask.sum(), 3))

    # 2. Pairwise distance becomes pair attention bias
    dist = pairwise_distance(coord_noisy)
    pair_bias = gaussian_basis(dist, edge_type)

    # 3. SE(3)-aware Transformer encoder
    atom_repr, pair_repr = model(tokens_in, dist, coord_noisy, pair_bias)

    # 4. Three pretraining heads
    logits_atom = atom_head(atom_repr[mask])
    coord_pred = coord_head(pair_repr, coord_noisy)[mask]
    dist_pred = distance_head(pair_repr)[mask, :]

    loss_tok = cross_entropy(logits_atom, tokens[mask])
    loss_coord = smooth_l1(coord_pred, coord[mask])
    loss_dist = smooth_l1(normalize(dist_pred), normalize(pairwise_distance(coord)[mask, :]))
    return lambda_tok * loss_tok + lambda_coord * loss_coord + lambda_dist * loss_dist

def unimol_binding_pose(protein_pocket, ligand):
    pocket_h = pocket_unimol(protein_pocket).cls_and_pair_repr()
    ligand_h = molecular_unimol(ligand).cls_and_pair_repr()
    cross_distance = binding_pose_head(pocket_h, ligand_h)
    pose = optimize_ligand_pose(ligand.initial_conformer, cross_distance)
    return pose
```

##### 为什么 1D/2D 分子表示不够

传统 molecular representation learning 常把 SMILES 当作 1D 序列，或把分子拓扑当作 2D 图。它们能覆盖原子连接关系，却很难直接表达构象、手性、远程空间接触、蛋白口袋几何互补等 3D 信息。药物设计中的很多任务本质上依赖三维结构：构象生成要输出坐标，docking 要预测配体在口袋中的位置和取向，结合亲和力也强依赖氢键、疏水接触、空间排斥等几何关系。

Uni-Mol 的设计目标是把 3D 坐标作为一等公民，而不是在 2D 图模型后面外挂几何特征。模型输入包含原子 token、原子坐标 \(x_i \in \mathbb{R}^3\)、原子对距离 \(d_{ij}=\|x_i-x_j\|_2\) 和边类型 \(e_{ij}\)。距离不是简单拼到节点特征中，而是转成 pair attention bias 影响任意两原子的注意力：

$$
b_{ij}=\operatorname{MLP}(\operatorname{GBF}(d_{ij}, e_{ij}))
$$

其中 GBF 是 Gaussian basis function expansion。这样每个注意力头都能根据空间距离和原子对类型调整信息传递强度。

##### 三重预训练目标

Uni-Mol 预训练的核心是让模型同时恢复“化学身份”和“几何结构”。被掩码原子的 token loss 是：

$$
\mathcal{L}_{\text{atom}}
=-\sum_{i \in M}\log p_\theta(a_i \mid A_{\setminus M}, X_{\text{noisy}})
$$

如果只做 atom prediction，模型可能利用 3D 位置泄漏的信息轻易猜出原子类型，学不到强表征。因此论文对被选中原子的坐标加入均匀噪声，并要求模型恢复真实坐标和距离矩阵：

$$
\mathcal{L}_{\text{coord}}
=\operatorname{SmoothL1}(\hat{x}_i, x_i), \qquad
\mathcal{L}_{\text{dist}}
=\operatorname{SmoothL1}(\hat{d}_{ij}, d_{ij})
$$

总目标可写为：

$$
\mathcal{L}
=\lambda_{\text{atom}}\mathcal{L}_{\text{atom}}
+\lambda_{\text{coord}}\mathcal{L}_{\text{coord}}
+\lambda_{\text{dist}}\mathcal{L}_{\text{dist}}
+\lambda_x\mathcal{L}_{x\text{-norm}}
+\lambda_{\Delta p}\mathcal{L}_{\Delta\text{pair-norm}}
$$

官方训练配置中 molecular pretraining 常使用 `masked_token_loss=1`、`masked_coord_loss=5`、`masked_dist_loss=10`，说明几何恢复在预训练中被显式加权。

##### 坐标头如何从 pair 表征恢复 3D 结构

Uni-Mol 的坐标恢复不是直接对每个原子输出绝对坐标，而是利用 pair representation 预测相对位移的权重。源码中的简化更新形式为：

$$
\Delta x_i=\frac{1}{N}\sum_j (x_i-x_j)\,w_{ij}, \qquad
\hat{x}_i=x_i+\Delta x_i
$$

其中 \(w_{ij}\) 来自 pair representation 的投影。这个形式天然依赖相对坐标，因此对整体平移不敏感；如果分子整体移动，\((x_i-x_j)\) 不变，模型预测的几何修正也保持一致。距离头则从 pair representation 预测 \(\hat{d}_{ij}\)，迫使 pair 通道保留全局几何一致性。

##### 分子模型与口袋模型为何分开训练

小分子和蛋白口袋都可以表示为原子集合，但数据分布差异很大：小分子有明确化学键、构象库和药物样属性；口袋来自蛋白局部环境，残基类型、空间约束和生物大分子上下文不同。Uni-Mol 因此用相同架构训练两个模型：molecular model 学小分子构象和性质，pocket model 学蛋白局部结合环境。下游任务按需组合：

- 分子性质预测：取 molecular model 的 `[CLS]` 表征接 MLP head
- 口袋 druggability：取 pocket model 的 `[CLS]` 表征做分类或回归
- 蛋白-配体结合位姿：联合 pocket 与 ligand 表征，预测跨分子几何约束，再优化配体构象

这种拆分让 Uni-Mol 既能作为通用分子 encoder，又能在 docking 场景中显式建模 pocket-ligand 互补。

##### 与后续 docking diffusion 方法的区别

Uni-Mol 的原始论文不是扩散 docking 模型。它更像“3D 表征基座”：先通过大规模 3D 预训练得到稳定的原子级和分子级表征，再把表征迁移到具体任务。DiffDock/PhysDock 这类方法把 docking 本身建模为生成过程；Uni-Mol 则先学习分子与口袋的几何语言，再用下游头或优化过程完成位姿预测。优势是任务覆盖广、可复用性强；不足是原始 Uni-Mol 的 docking 生成能力不如后续专门面向 realistic docking 的 Uni-Mol Docking V2 或 diffusion docking 方法。

> 💡 关键：Uni-Mol 的贡献在于把“原子 token + 3D 坐标 + pair distance”组织成一个统一预训练问题，让同一个 3D Transformer 可以服务性质、构象、口袋和蛋白-配体任务。

#### 🧪 练习题
```yaml
question: "Uni-Mol 预训练中加入坐标去噪和 pair-distance prediction 的主要目的是什么？"
options:
  - "让模型只学习 SMILES 语法，避免使用三维坐标"
  - "防止 masked atom prediction 过于简单，同时迫使表征编码真实 3D 几何"
  - "把分子坐标固定为二维平面，便于图卷积计算"
  - "删除蛋白口袋模型，只保留小分子性质预测"
answer: 1
explain: "Uni-Mol 对部分原子坐标加噪，并要求恢复坐标和距离矩阵；这样模型不能只靠泄漏的空间位置猜原子类型，而必须学习可迁移的三维分子几何。"
```

### PhysDock

```yaml
id: physdock
num: 39
name: PhysDock
full_name: PhysDock (PhysDock)
year: '2025.04'
org: Zhang et al.
parent: diffdock
paper_url: https://arxiv.org/abs/2504.12345
project_url: ''
category: drug_discovery
motivation: 物理势能引导扩散提升对接真实性
```

#### 📝 一句话总结
PhysDock 是面向蛋白-小分子复合物预测的 physics-guided all-atom diffusion 模型，将 AF3 风格的全原子坐标去噪、口袋/关键残基等物理先验条件、配体 conformer library、MMFF94 力场投影和手性检查结合起来，提升 docking 位姿的几何准确性与物理合理性。

#### 🎯 核心要点
- **链接校正**：任务给定 `https://arxiv.org/abs/2504.12345` 实际指向无关城市科学论文；PhysDock 的可访问 DOI 是 `10.1101/2025.04.28.650887`，官方代码为 `https://github.com/KexinZhangResearch/PhysDock`
- **全原子扩散**：不是仅扩散配体平移/旋转/扭转，而是直接在蛋白-配体复合物全原子坐标上做 denoising diffusion
- **蛋白 precision-flexibility**：允许结合口袋残基产生细微构象调整，避免把蛋白视为完全刚体
- **DiffusionConditioning**：整合原子特征、MSA、template、相对位置、token bonds、pocket feature、key residue feature 等条件信息
- **AF3DiT 去噪器**：采用 atom DiT encoder → token DiT → atom DiT decoder 的三段式结构，在原子级和 token 级交替传播几何信息
- **两阶段物理引导**：高噪声阶段用参考 conformer library/刚体对齐约束配体几何；低噪声阶段用 RDKit MMFF94 局部优化修正键长、键角、碰撞和手性问题
- **迭代采样与筛选**：多轮采样、手性检查、接受/拒绝队列、K-means 聚类和代表构象排序，提高多模态位姿探索能力
- **应用场景**：官方仓库支持 redocking、cross docking、blind docking、standard precision flexible docking 和 virtual screening；当前限制是多蛋白链加单个小分子 ligand

#### 🔬 深入细节
![PhysDock Overview](https://raw.githubusercontent.com/KexinZhangResearch/PhysDock/master/figs/PhysDockOverview.png)
*图：PhysDock 官方仓库总览图。由于 bioRxiv 页面在当前环境触发 Cloudflare 限制，图示使用官方 GitHub raw 图片；论文摘要和全文镜像可通过 ScienceCast、Sciety、Semantic Scholar 与 ResearchGate 交叉核对。*

##### 来源说明

PhysDock 的 bioRxiv 页面 `https://www.biorxiv.org/content/10.1101/2025.04.28.650887v1` 在当前环境不可直接抓取全文，但 ScienceCast、Sciety 和 Semantic Scholar 均给出同一 DOI、作者列表和摘要；ResearchGate 提供了可读全文镜像；官方 GitHub 提供代码、模型参数下载、总览图、推理脚本和基准图。因此本文方法细节以官方 GitHub 源码为主，辅以可访问全文镜像中的方法描述。

##### 算法伪代码

```python
# PhysDock inference with physics-guided all-atom diffusion
def physdock_predict(receptor_pdb, ligand_sdf, model, max_rounds=10, steps=40):
    # 1. system preparation
    system = build_system_pkl(receptor_pdb, ligand_sdf)
    msa_feat = search_msa(system.protein_sequence)        # HHsuite / HMMER databases
    plip_key_res = detect_key_residues(system)            # optional interaction priors
    batch = featurize(system, msa_feat, plip_key_res,
                      use_pocket=True, use_key_res=True)

    accepted, rejected = [], []
    ref_conformers = rdkit_embed_conformers(ligand_sdf, num_confs=128)
    gamma_factor = 6.0

    for round_id in range(max_rounds):
        # 2. diffusion conditioning: atom/token/pair representations
        cond = model.diffusion_conditioning(batch)

        # 3. EDM/Karras sampling on all atom coordinates
        x = normal_noise(shape=(num_samples, batch.num_atoms, 3)) * sigma_max
        for sigma_i, sigma_next in karras_schedule(steps, rho=1000):
            x_hat = add_churn_noise(x, sigma_i)
            x_denoised = model.af3_dit_denoise(x_hat, sigma_i, cond)

            if sigma_i > gamma_factor:
                # phase 1: project ligand geometry toward a reference conformer library
                x_proj = align_ligand_to_best_conformer(x_denoised, ref_conformers)
            else:
                # phase 2: local MMFF94 correction for ligand geometry
                x_proj = mmff94_optimize_ligand_atoms(x_denoised, iters=5)

            direction = (x_hat - replace_ligand_part(x_denoised, x_proj)) / sigma_i
            x = x_hat + (sigma_next - sigma_i) * direction

        # 4. chirality check and adaptive retry
        for pose in x:
            if ligand_chirality_ok(pose, ligand_sdf):
                accepted.append(pose)
            else:
                rejected.append(pose)
        gamma_factor = adapt_projection_strength(gamma_factor, accepted)
        if len(accepted) >= target_num_samples:
            break

    # 5. cluster/rank diverse final poses
    poses = accepted if accepted else rejected
    return kmeans_representative_poses(poses, k=5)
```

##### 从 DiffDock 到 PhysDock：为什么要全原子与物理投影

DiffDock 把 docking 建模为配体平移、旋转和扭转自由度上的扩散生成，优点是搜索空间清晰、采样高效；但蛋白一般被近似为刚体，模型主要输出配体位姿。PhysDock 的出发点是：真实结合不仅是配体进入口袋，口袋侧链也会发生细微调整，且配体本身必须满足键长、键角、手性、空间排斥等物理约束。仅靠几何 RMSD 很接近的扩散位姿，仍可能出现不合理手性或局部碰撞。

因此 PhysDock 直接在全原子坐标 \(x \in \mathbb{R}^{N \times 3}\) 上做扩散，覆盖蛋白与 ligand 原子。训练时给真实复合物坐标加噪：

$$
x_\sigma=x_0+\sigma\epsilon,\qquad \epsilon\sim \mathcal{N}(0,I)
$$

去噪网络 \(D_\theta(x_\sigma,\sigma,c)\) 在条件 \(c\) 下预测干净坐标。核心 denoising loss 可简化为：

$$
\mathcal{L}_{\text{diff}}
=\mathbb{E}_{x_0,\sigma,\epsilon}
\left[
w(\sigma)\left\|D_\theta(x_0+\sigma\epsilon,\sigma,c)-\operatorname{Align}(x_0)\right\|_2^2
\lambda_{\text{lddt}}\mathcal{L}_{\text{lDDT}}
\lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
\lambda_{\text{bond}}\mathcal{L}_{\text{bond}}
\right]
$$

源码中 weighted MSE 使用 EDM 风格权重：

$$
w(\sigma)=\frac{\sigma^2+\sigma_{\text{data}}^2}{(\sigma\sigma_{\text{data}})^2}
$$

并对 DNA、RNA、ligand token 赋予更高权重，其中 ligand 的默认权重增益最大，以强调结合位姿。

##### DiffusionConditioning：把生物与物理先验变成条件

PhysDock 的 `DiffusionConditioning` 分为 AtomEmbedder 与 TokenEmbedder。AtomEmbedder 处理 atom-wise reference features、reference coordinates、atom pair masks 等，构造原子表征 \(a\) 和原子对表征 \(a_p\)。TokenEmbedder 将原子表征下采样到 token/residue 层级，并加入 target features、pocket residue feature、key residue feature、relative position、token bonds、MSA features 和 template pair features。

可抽象为：

$$
(a,a_p)=\operatorname{AtomEmbedder}(f_{\text{atom}},x_{\text{ref}})
$$

$$
(s,z)=\operatorname{TokenEmbedder}(a,\text{MSA},\text{template},\text{pocket},\text{key-res},\text{bonds})
$$

其中 \(s_i\) 是 token 表征，\(z_{ij}\) 是 pair 表征。TokenEmbedder 内部包含 Evoformer、Triangleformer 和 Pairformer，因此继承了 AlphaFold 系列中利用 MSA、三角更新和 pair-biased attention 维持几何一致性的思想。最后，\(s,z\) 会再投影回原子层，补充到 \(a,a_p\) 中，为全原子 DiT 去噪器提供条件。

##### AF3DiT 去噪器：原子级和 token 级交替建模

PhysDock 的 `AF3DiT` 由三段组成：AtomDiffusionTransformer encoder、Token DiffusionTransformer、AtomDiffusionTransformer decoder。它先把 noisy coordinates 通过 EDM preconditioning 缩放：

$$
c_{\text{in}}=\frac{1}{\sqrt{\sigma^2+\sigma_{\text{data}}^2}}, \qquad
c_{\text{noise}}=\frac{\log(\sigma/\sigma_{\text{data}})}{4}
$$

然后把 \(c_{\text{in}}x_\sigma\)、原子条件 \(a\) 和时间嵌入送入 atom-level DiT；中间下采样到 token 级与 \(s,z\) 交互；最后上采样回原子级输出残差。EDM denoised 坐标为：

$$
D_\theta(x_\sigma,\sigma,c)
=c_{\text{skip}}x_\sigma+c_{\text{out}}\,r_\theta(x_\sigma,\sigma,c)
$$

$$
c_{\text{skip}}=\frac{\sigma_{\text{data}}^2}{\sigma^2+\sigma_{\text{data}}^2}, \qquad
c_{\text{out}}=\frac{\sigma_{\text{data}}\sigma}{\sqrt{\sigma^2+\sigma_{\text{data}}^2}}
$$

这种结构避免只在 residue/token 层级预测，再粗糙还原到原子；它让 ligand 原子、口袋侧链原子和远距离原子对都能通过 attention 参与去噪。

##### Karras 采样与两阶段物理引导

PhysDock 采样使用 Karras/EDM 噪声日程。源码默认 \(\rho=1000\)，让低噪声阶段有更密的步长：

$$
\sigma_i=\left(\sigma_{\max}^{1/\rho}+
\frac{i}{N-1}(\sigma_{\min}^{1/\rho}-\sigma_{\max}^{1/\rho})\right)^\rho
$$

每步先进行 stochastic churn：

$$
\hat{\sigma}_i=(1+\gamma_i)\sigma_i,\qquad
\hat{x}_i=x_i+\sqrt{\hat{\sigma}_i^2-\sigma_i^2}\epsilon
$$

普通 EDM 更新方向是：

$$
d_i=\frac{\hat{x}_i-D_\theta(\hat{x}_i,\hat{\sigma}_i,c)}{\hat{\sigma}_i}, \qquad
x_{i+1}=\hat{x}_i+(\sigma_{i+1}-\hat{\sigma}_i)d_i
$$

PhysDock 的关键改动是把 ligand 部分替换为物理投影后的去噪目标 \(P(D_\theta)\)。高噪声阶段，\(P\) 从 RDKit 生成的 reference conformer library 中选择内部距离矩阵最接近当前 ligand 的构象，并做 weighted rigid alignment；低噪声阶段，\(P\) 使用 MMFF94 对 ligand 做少量局部优化。于是 ligand 更新方向变成：

$$
d_i^{\text{lig}}=\frac{\hat{x}_i-P(D_\theta(\hat{x}_i,\hat{\sigma}_i,c))}{\hat{\sigma}_i}
$$

这相当于在扩散轨迹中加入“软物理校正”：早期保证构象族合理，后期修复局部化学错误。源码还会用 RDKit 检查手性，失败样本进入 reject queue；若当前轮通过样本少，会自适应调整 projection 边界并继续采样。

##### 推理、排序与局限

官方仓库的推理先把 receptor `.pdb` 与 ligand `.sdf` 编成 system `.pkl.gz`，再运行 MSA 搜索生成 `msa_feature` 和 `uniprot_msa_feature`。用户可启用 pocket feature、key residue feature、physics correction、ranking 和 sidechain relaxation。最终多个候选 pose 会根据 ligand 之间的 RMSD 距离做 K-means 聚类，选择代表构象作为 top-k 输出。

论文与仓库都强调 PhysDock 在 redocking、cross-docking、CB1/CB2 receptor selectivity 和 NTRK3 virtual screening 上展示实用价值；但它当前主要面向一个小分子 ligand 和一个或多个蛋白链，不是通用多配体、多核酸或肽-蛋白复合物预测器。此外，方法依赖 MSA 数据库、RDKit conformer 生成和 MMFF 投影，推理工程栈比单纯端到端 diffusion docking 更复杂。

> 💡 关键：PhysDock 的“物理引导”不是简单把打分函数接到输出末端，而是把 conformer library 与 MMFF94 作为采样轨迹中的投影算子，逐步改变反向扩散方向。

#### 🧪 练习题
```yaml
question: "PhysDock 相比 DiffDock 的关键方法差异是什么？"
options:
  - "PhysDock 只预测 2D 分子图，不输出三维坐标"
  - "PhysDock 在全原子坐标上做扩散，并在采样中用 conformer library 与 MMFF94 力场投影修正 ligand 几何"
  - "PhysDock 完全删除蛋白结构，只根据 SMILES 做虚拟筛选"
  - "PhysDock 只使用刚体平移和旋转，不处理配体内部构象"
answer: 1
explain: "DiffDock 主要在配体位姿自由度上建模；PhysDock 采用全原子坐标扩散，并把物理投影嵌入反向采样过程，以减少手性、键长键角和碰撞等物理错误。"
```

### RhoFold

```yaml
id: rhofold
num: 40
name: RhoFold
full_name: RhoFold (RhoFold)
year: '2022.11'
org: Shen Lab
parent: —
paper_url: https://www.biorxiv.org/content/10.1101/2022.11.28.518224v1
project_url: ''
category: other_bio
motivation: Transformer实现RNA三维结构预测
```

#### 📝 一句话总结
RhoFold 是一个面向 RNA 三维结构预测的端到端深度学习模型，用 RNA-FM、MSA/E2Eformer 和 IPA 结构模块从序列直接生成全原子 RNA 坐标，重点解决传统 FARFAR2 等采样式 de novo 方法慢、且 RNA 结构数据稀缺导致深度模型难训练的问题。

#### 🎯 核心要点
- **端到端 RNA 3D 预测**：从 RNA 序列、MSA 和 RNA-FM 表征直接输出主链框架、碱基框架、扭转角和全原子坐标
- **RNA-FM 预训练特征**：利用在约 2300 万条非冗余 RNA 序列上训练的 RNA foundation model 缓解 PDB RNA 三维结构稀缺
- **E2Eformer 表征学习**：借鉴 AlphaFold 的 Evoformer，用 4 层注意力模块共同更新 MSA 表征和 residue-pair 表征
- **RNA 专用结构模块**：不直接预测不规则的碱基框架，而是预测 backbone main frame \((C4', C1', N1/N9)\) 与扭转角 \(\alpha,\beta,\gamma,\omega\)
- **IPA 几何注意力**：用 Invariant Point Attention 预测每个核苷酸局部框架，使结构更新对全局旋转和平移保持一致
- **二级结构辅助训练**：在 2D pair loss 和 3D base-pair constraint 中引入二级结构监督，强制模型学习碱基配对几何
- **自蒸馏扩充数据**：用二级结构标签筛选高置信伪三维结构，将 PDB 数据和蒸馏数据混合训练
- **快速推理**：论文报告平均推理约 0.14 秒，不做采样即可产生有效 RNA 结构，远快于 FARFAR2 的大规模 decoy 采样

#### 🔬 深入细节
##### 模型架构图与可访问来源

![RhoFold / E2Efold-3D 总体流程](https://ar5iv.labs.arxiv.org/html/2207.01586/assets/figures/overview.png)
*图：arXiv HTML 中的 Figure 1。该工作原名 E2Efold-3D，官方代码仓库说明其后续更名为 RhoFold；bioRxiv 原链接当前返回 Cloudflare 403，因此这里采用可访问的 arXiv HTML 与官方仓库作为来源。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2207.01586；arXiv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2207.01586；官方仓库 https://github.com/ml4bio/RhoFold。

##### 算法伪代码

```python
# RhoFold / E2Efold-3D 简化推理流程
def rhofold_predict(rna_sequence):
    # 1. 构建序列特征
    msa = search_rna_homologs(rna_sequence)          # Infernal / rMSA, Rfam + RNAcentral
    msa_repr = linear_embed(one_hot(msa))
    fm_repr = RNA_FM.encode(rna_sequence)            # 预训练 RNA foundation model

    # 2. E2Eformer 更新单体和 pair 表征
    single_repr, pair_repr = combine(msa_repr, fm_repr)
    prev_backbone = None
    while not plddt_converged():
        if prev_backbone is not None:
            pair_repr += encode_previous_geometry(prev_backbone)
        for block in range(4):
            single_repr = row_col_gated_attention(single_repr, pair_repr)
            pair_repr = update_pair_from_msa(single_repr, pair_repr)

        # 3. Structure module: IPA + RNA 专用几何参数化
        main_frame = IPA_predict_frame(single_repr, pair_repr)  # C4', C1', N1/N9
        torsions = predict_torsions(single_repr)                # alpha,beta,gamma,omega
        coords = reconstruct_full_atoms(main_frame, torsions)
        plddt = predict_lddt(single_repr, pair_repr)
        prev_backbone = main_frame

    # 4. 可选 AMBER restrained minimization 去除碰撞
    return amber_relax(coords), plddt
```

##### 动机与背景

RNA 三维结构对 RNA 靶向药物、核酸器件和核酶机制研究很关键，但 RNA-only 结构在 PDB 中占比很低，且 RNA 的构象异质性、柔性和 NMR 信号重叠使实验解析更困难。传统 de novo 方法如 FARFAR2、3dRNA、SimRNA 主要依靠物理/知识势能和大规模采样；它们可以生成 decoy，但耗时长，而且排序最优 decoy 本身也困难。

RhoFold 的核心选择是把 RNA folding 写成一个完全可微的坐标预测问题。这样，模型不再先采样大量候选再打分，而是让序列、MSA、二级结构和三维坐标误差共同反向传播到同一个网络中。对 RNA 来说，这比简单照搬蛋白结构预测更难，因为 RNA 的折叠主要受碱基配对和核糖-磷酸骨架构象共同驱动，而可用三维训练样本约只有千级。

##### 输入特征与 E2Eformer

模型同时使用两类信息。第一类是 MSA 共进化信息：通过 Infernal/rMSA 从 Rfam 与 RNAcentral 搜索同源序列，编码为 MSA 表征；第二类是 RNA-FM 的语言模型表征，它来自大规模未标注 RNA 序列预训练，提供不依赖结构标签的上下文先验。两类特征合并后进入 E2Eformer。

E2Eformer 与 AlphaFold Evoformer 的作用相似：维护序列表征 \(M\) 和 residue-pair 表征 \(Z\)，并通过 gated row/column attention、transition 与 pair 更新反复交换信息。直观上，\(M\) 负责记录每个核苷酸在同源序列中的上下文，\(Z_{ij}\) 负责记录第 \(i,j\) 个核苷酸之间的几何关系。二级结构预测头也接在 pair 表征上，让模型在进入 3D 坐标阶段前先学会哪些位置可能形成碱基配对。

##### RNA 专用结构参数化

直接预测 RNA 碱基框架会遇到收敛问题，因为嘌呤/嘧啶碱基原子模式不同、局部几何不如蛋白主链规则。RhoFold 改为预测 backbone main frame：

$$
F_i = (C4'_i, C1'_i, N_i), \quad N_i \in \{N1, N9\}
$$

再预测四个关键扭转角 \(\alpha,\beta,\gamma,\omega\)，由 main frame 与扭转角重建 base frame 和全原子坐标。这个设计把不规则碱基几何转化为更稳定的局部框架和角度预测问题，同时仍能通过碱基配对约束回到 RNA 的生物物理结构。

结构模块使用 Invariant Point Attention。若第 \(i\) 个残基的局部刚体变换为 \(T_i\)，IPA 的几何项可概括为：

$$
\alpha_{ij} \propto \exp\left(
\frac{q_i^\top k_j}{\sqrt{d}} + b_{ij}
- \lambda \sum_p \|T_i q_{i,p}^{point} - T_j k_{j,p}^{point}\|^2
\right)
$$

这里 \(b_{ij}\) 来自 pair 表征。由于所有点都通过局部框架映射到全局空间，整体旋转或平移不会改变相对几何，因此模型学习的是结构本身而不是坐标系。

##### 损失函数与二级结构约束

RhoFold 的训练目标分为 1D、2D、3D 三层：

$$
\mathcal{L} =
\mathcal{L}_{mlm}
+0.3\mathcal{L}_{dis}
+0.1\mathcal{L}_{ss}
+0.03\mathcal{L}_{clash}
+2\mathcal{L}_{FAPE}
+0.1\mathcal{L}_{ss3d}
+0.01\mathcal{L}_{plDDT}
$$

- \(\mathcal{L}_{mlm}\)：随机 mask 约 5% MSA token，重建序列以学习共进化特征
- \(\mathcal{L}_{dis}\)：预测 \(P\)、\(C4'\)、\(N\) 等原子间距离分箱，用 cross entropy 监督 pair 表征
- \(\mathcal{L}_{ss}\)：预测二级结构矩阵 \(C\in\{0,1\}^{L\times L}\)，其中 \(C_{ij}=1\) 表示形成碱基对
- \(\mathcal{L}_{FAPE}\)：Frame Aligned Point Error，在局部框架中比较预测坐标和真实坐标，天然忽略全局刚体变换
- \(\mathcal{L}_{ss3d}\)：把二级结构约束直接放进 3D 坐标，惩罚应配对碱基的伪原子距离过远
- \(\mathcal{L}_{clash}\)：惩罚非键合原子过近，减少立体碰撞
- \(\mathcal{L}_{plDDT}\)：训练置信度头，使 pLDDT 能估计局部结构质量

其中 3D 二级结构约束可写成：

$$
\mathcal{L}_{ss3d} =
\sum_{(m,n)\in \text{base pairs}}
\max\left(\hat{d}^{m,n}_{ij} - d^{m,n}_{ij} - \tau, 0\right)
$$

它的直觉是：如果二级结构认为 \(m,n\) 应形成碱基对，那么碱基局部框架中的若干伪原子距离必须满足配对几何，不能只在 2D contact map 上预测正确。

##### 自蒸馏、recycling 与推理

RhoFold 先用 PDB RNA 三维结构训练，再在有二级结构标注的大规模数据上生成伪三维标签，并用二级结构一致性筛选高置信样本。最终训练时混合约 25% PDB 数据和 75% 自蒸馏数据，使模型既保留真实坐标监督，又从大量 RNA 二级结构样本中学习更广的折叠模式。

Recycling 则把上一轮结构预测反馈给 E2Eformer。第一轮通常形成粗略二级结构和空间摆放，后续轮次用上一次的 backbone frame 修正长程接触、局部冲突和碱基配对几何。论文报告 pLDDT 与真实 lDDT 有较强相关性，说明模型的置信度头可用于过滤低可靠区域。

##### 与传统 RNA folding 方法的区别

| 维度 | FARFAR2 / 3dRNA / SimRNA | RhoFold |
|------|--------------------------|---------|
| 核心范式 | 采样大量候选结构，再用能量或打分函数筛选 | 单个可微网络直接输出坐标 |
| 输入信息 | 序列、二级结构、片段库或物理约束 | 序列、MSA、RNA-FM、二级结构辅助监督 |
| 速度 | 需要大量 decoy 采样，单目标可达数千秒 | 论文报告平均约 0.14 秒生成结构 |
| 几何建模 | 手工势能和局部片段组合 | IPA、局部框架、FAPE、base-pair 3D constraint |
| 主要瓶颈 | 采样成本高、decoy 排序难 | 训练数据少，对长 RNA 和复杂 RNA 复合体仍有限 |

> 💡 关键：RhoFold 的贡献不是简单把 Transformer 用到 RNA 上，而是用 RNA-FM、自蒸馏、二级结构约束和 RNA 专用局部框架共同解决“RNA 3D 数据太少但必须直接预测坐标”的问题。

#### 🧪 练习题
```yaml
question: "RhoFold 为什么不直接预测 RNA 碱基框架，而是预测 backbone main frame 与扭转角？"
options:
  - "因为 RNA 不存在碱基配对，只需要预测磷酸骨架"
  - "因为碱基局部原子模式较不规则，直接预测 base frame 收敛困难；用 main frame 加扭转角更稳定且可重建全原子坐标"
  - "因为 RNA-FM 只能输出扭转角，不能输出坐标"
  - "因为 FARFAR2 已经提供了所有碱基坐标，不需要模型预测"
answer: 1
explain: "论文方法部分说明，直接预测 nucleobase base frame 会因不规则结构模式出现收敛问题；RhoFold 用 C4'/C1'/N1或N9 主框架和扭转角完成更稳定的几何参数化。"
```

### IgFold

```yaml
id: igfold
num: 41
name: IgFold
full_name: IgFold (IgFold)
year: '2023.04'
org: Johns Hopkins University
parent: —
paper_url: https://www.nature.com/articles/s41467-023-38063-x
project_url: ''
category: other_bio
motivation: 抗体H3环快速结构预测工具
```

#### 📝 一句话总结
IgFold 提出了一种端到端的抗体结构预测方法，利用在 5.58 亿条天然抗体序列上预训练的语言模型 AntiBERTy 生成序列嵌入，通过图 Transformer 架构直接预测三维原子坐标，在精度与 AlphaFold-Multimer 相当的情况下将推理时间缩短至 25 秒以内，并成功预测了 140 万条抗体序列的结构。

#### 🎯 核心要点
- **语言模型驱动**：使用 AntiBERTy（12 层 Transformer，预训练于 5.58 亿条天然抗体序列）生成序列嵌入，替代传统 MSA 输入，大幅降低计算开销
- **端到端坐标预测**：图 Transformer 架构直接从序列嵌入预测蛋白质骨架原子 \((\text{N}, \text{C}_\alpha, \text{C})\) 的三维坐标，无需中间几何约束
- **结构感知模块**：融合三角乘法更新（Triangle Multiplicative Updates）和不变点注意力（Invariant Point Attention, IPA），捕获残基间的几何关系
- **逐残基误差估计**：模型同时输出每个残基的预测质量估计，为下游应用提供可靠性指标
- **模板信息整合**：支持可选的模板结构输入，通过将模板坐标注入图节点初始化来提升非 CDR3 区域的预测精度
- **4 模型集成**：训练 4 个独立模型取平均，提升预测鲁棒性；总参数量仅约 160 万
- **极速推理**：配对抗体平均 23 秒、纳米抗体平均 15 秒完成全原子结构预测（含 Rosetta 侧链添加）
- **大规模结构数据库**：预测了来自 OAS 数据库的 140 万条配对抗体序列结构，将已知抗体结构数量扩展 500 倍

#### 🔬 深入细节
##### 模型架构总览

![IgFold 端到端抗体结构预测流程](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-023-38063-x/MediaObjects/41467_2023_38063_Fig1_HTML.png)
*图 1：IgFold 方法流程图。抗体序列经 AntiBERTy 编码为上下文嵌入，图 Transformer 层直接预测骨架原子坐标，同时输出逐残基误差估计，最后由 Rosetta 完成侧链添加与结构优化。*

IgFold 的核心思想是：**用预训练语言模型的嵌入替代多序列比对（MSA）**，从而绕过 MSA 构建这一最耗时的步骤。整个流程分为三个阶段：

1. **序列编码**：AntiBERTy 将抗体序列转化为上下文嵌入
2. **坐标预测**：图 Transformer 迭代更新节点/边表示并预测 3D 坐标
3. **结构精修**：Rosetta 进行侧链添加和能量最小化

##### 算法伪代码

```python
# IgFold 端到端抗体结构预测
def igfold_predict(sequence_H, sequence_L=None):
    # 1. AntiBERTy 编码
    node_emb_H = antiberty.encode(sequence_H)  # [L_H, d_model]
    edge_emb_H = antiberty.get_attention_maps(sequence_H)  # [n_heads*n_layers, L_H, L_H]
    
    if sequence_L is not None:  # 配对抗体
        node_emb_L = antiberty.encode(sequence_L)
        edge_emb_L = antiberty.get_attention_maps(sequence_L)
        # 拼接，链间边初始化为零
        nodes = concat(node_emb_H, node_emb_L)
        edges = block_diagonal(edge_emb_H, edge_emb_L)  # 链间为0
    else:
        nodes, edges = node_emb_H, edge_emb_H
    
    # 2. 图 Transformer 迭代 (N=10 层)
    for layer in graph_transformer_layers:
        # 2a. 三角乘法更新 (边)
        edges = edges + tri_mul_outgoing(edges)
        edges = edges + tri_mul_incoming(edges)
        
        # 2b. 节点注意力更新
        nodes = nodes + attention(nodes, edges)
        
        # 2c. 不变点注意力 (IPA) — 结构感知
        frames = predict_frames(nodes)  # 每个残基的局部坐标系
        nodes = nodes + ipa(nodes, edges, frames)
        
        # 2d. 坐标预测
        coords = predict_coords(nodes)  # [L, 3, 3] → N, Cα, C
        error_est = predict_error(nodes)  # [L] 逐残基误差
    
    # 3. Rosetta 精修
    structure = rosetta_refine(coords, sequence)
    return structure, error_est
```

##### 动机与背景

**传统方法的瓶颈**：通用蛋白质结构预测方法（如 AlphaFold2）依赖多序列比对（MSA）来捕获进化共变信息。然而，抗体具有独特的进化特征——其互补决定区（CDR）通过体细胞超突变快速多样化，导致传统 MSA 难以构建有意义的比对。更重要的是，MSA 搜索本身极为耗时（AlphaFold 单条序列需数分钟至数小时），使得大规模抗体结构预测在计算上不可行。

**已有抗体专用方法的局限**：
- **同源建模方法**（如 RepertoireBuilder）：依赖模板库，对 CDR H3 等高度可变区域效果差
- **DeepAb**：预测残基间几何约束后用 Rosetta 组装，流程复杂且较慢
- **ABlooper**：仅预测 CDR 环结构，需要外部框架结构输入
- **NanoNet**：仅支持纳米抗体

> 💡 **关键洞察**：AntiBERTy 在 5.58 亿条天然抗体序列上的自监督预训练，使其嵌入天然编码了 CDR 环的结构特征（如 canonical fold 聚类），可直接替代 MSA 提供进化信息。

##### 核心机制详解

**1. AntiBERTy 语言模型嵌入**

AntiBERTy 是一个 12 层 Transformer 语言模型，在来自免疫组库测序研究的 5.58 亿条天然抗体序列上进行掩码语言模型（MLM）预训练。IgFold 从 AntiBERTy 中提取两类信息：

- **节点特征**：最后一层隐藏状态 \(\mathbf{h}_i \in \mathbb{R}^{d}\)，作为每个残基的上下文表示
- **边特征**：所有层的注意力矩阵 \(\mathbf{A}^{(l,h)}_{ij}\)，编码残基对之间的信息通路

通过 t-SNE 可视化验证，AntiBERTy 嵌入空间中 CDR 环按 canonical 结构聚类组织，表明语言模型仅通过序列预训练就学到了结构特征。

**2. 图 Transformer 与坐标预测**

IgFold 将抗体结构建模为全连接图，每个残基为节点。核心更新机制包括：

**三角乘法更新（Triangle Multiplicative Updates）**：借鉴 AlphaFold2 的 Evoformer，通过三角不等式约束更新边表示：

$$\mathbf{e}_{ij} \leftarrow \mathbf{e}_{ij} + \sum_k \mathbf{e}_{ik} \otimes \mathbf{e}_{kj}$$

其中 \(\otimes\) 表示逐元素乘法后线性投影。这一机制确保边表示满足距离三角不等式的几何一致性——如果残基 \(i\) 和 \(k\) 近、\(k\) 和 \(j\) 近，则 \(i\) 和 \(j\) 也应较近。

**不变点注意力（IPA）**：同样借鉴 AlphaFold2 的 Structure Module，IPA 在每个残基的局部坐标系中操作，使注意力计算对全局旋转和平移不变：

$$\text{IPA}(\mathbf{h}_i, \mathbf{T}_i) = \text{Softmax}\left(\frac{1}{\sqrt{d_h}} \mathbf{q}_i^\top \mathbf{k}_j + w_L \|\mathbf{T}_i \circ \mathbf{p}_i - \mathbf{T}_j \circ \mathbf{p}_j\|^2 + b_{ij}\right) \mathbf{v}_j$$

其中 \(\mathbf{T}_i\) 是残基 \(i\) 的刚体变换（旋转 + 平移），\(\mathbf{p}_i\) 是局部坐标系中的查询/键点。

> ⚠️ **注意**：与 AlphaFold2 不同，IgFold 不使用 MSA 模块和模板搜索模块，而是直接用语言模型嵌入初始化，这是其速度优势的根本来源。

**3. 损失函数设计**

IgFold 采用三项损失的加权组合：

$$\mathcal{L} = \lambda_{\text{coord}} \cdot \mathcal{L}_{\text{coord}} + \lambda_{\text{bond}} \cdot \mathcal{L}_{\text{bond}} + \lambda_{\text{error}} \cdot \mathcal{L}_{\text{error}}$$

- **坐标损失** \(\mathcal{L}_{\text{coord}}\)：预测坐标与真实坐标的均方误差（MSE），在 Kabsch 对齐后计算
- **键长损失** \(\mathcal{L}_{\text{bond}}\)：相邻残基间键长与理想值的 L1 偏差，约束局部几何合理性
- **误差估计损失** \(\mathcal{L}_{\text{error}}\)：预测误差与实际 \(\text{C}_\alpha\) RMSD 之间的 L1 损失

> 💡 **关键**：误差估计损失使模型能自我评估预测质量。实验表明，误差估计与实际 RMSD 的 Spearman 相关系数 \(\rho > 0.7\)，为大规模预测的质量筛选提供了可靠依据。

**4. 训练策略**

- **数据集**：SAbDab 数据库中 3467 条配对抗体 + 纳米抗体的实验结构，按时间划分训练/验证/测试集
- **模型规模**：每个模型仅约 160 万参数（10 层图 Transformer），训练 4 个独立模型取集成
- **训练细节**：Adam 优化器，学习率 5×10⁻⁴，batch size 1，训练约 50 epoch
- **Rosetta 精修**：预测骨架坐标后，使用 PyRosetta 的 FastRelax 协议添加侧链并进行能量最小化

##### 与现有方法的对比

| 方法 | 类型 | 配对抗体 Fv 框架 RMSD | CDR H3 精度 | 纳米抗体 CDR3 RMSD | 平均推理时间 |
|------|------|----------------------|-------------|-------------------|-------------|
| **IgFold** | 端到端深度学习 | 0.43–0.53 Å | 与 AlphaFold 互有胜负 | 4.25 Å | **23 s**（配对）/ **15 s**（纳米） |
| AlphaFold-Multimer | 通用蛋白预测 | ~0.50 Å | 最佳之一 | 4.00 Å | ~10 min |
| DeepAb | 约束预测+Rosetta | ~0.50 Å | 与 IgFold 相当 | 8.52 Å | ~3 min |
| ABlooper | CDR 环预测 | 需外部输入 | 与 IgFold 相当 | — | ~1 min |
| RepertoireBuilder | 同源建模 | ~0.50 Å | 较差 | 7.54 Å | 快（需模板） |
| NanoNet | 纳米抗体专用 | — | — | 5.43 Å | ~30 s |

**关键发现**：
- 对于配对抗体，IgFold 的框架和 CDR 环预测精度与 AlphaFold-Multimer 和 DeepAb 相当，但速度快 10–100 倍
- 对于纳米抗体 CDR3，IgFold（4.25 Å）略逊于 AlphaFold（4.00 Å），但推理速度快 24 倍
- IgFold 和 AlphaFold 在许多靶标上预测出不同的 CDR H3 构象，两者互补，可用于构建结构集成
- 模板信息的引入可显著提升非 CDR3 区域的预测精度

##### 大规模结构预测

IgFold 的速度优势使其能够进行前所未有的大规模抗体结构预测：

- 从 OAS 数据库中选取 **140 万条**配对抗体序列（人、小鼠、大鼠）
- 预测的 CDR H3 环中位预测 RMSD 为 1.95 Å（13 残基中位长度）
- 将已知抗体结构数量从约 3000 扩展至 **140 万**（500 倍增长）
- 所有预测结构及误差估计已公开发布

#### 🧪 练习题
```yaml
question: "IgFold 相比 AlphaFold 实现秒级推理的核心设计选择是什么？"
options:
  - "使用更小的 Transformer 模型（仅 160 万参数）"
  - "用预训练语言模型嵌入替代多序列比对（MSA），避免耗时的序列搜索"
  - "仅预测 Cα 原子坐标而非全原子结构"
  - "使用同源建模模板而非从头预测"
answer: 1
explain: "AlphaFold 的主要时间瓶颈在于 MSA 搜索（数分钟至数小时）。IgFold 用 AntiBERTy 语言模型的嵌入直接替代 MSA 输入，将进化信息的获取从数据库搜索转化为前向推理，从根本上消除了这一瓶颈。"
```

### IgGM

```yaml
id: iggm
num: 42
name: IgGM
full_name: IgGM (IgGM)
year: '2025.01'
org: ICLR
parent: —
paper_url: https://openreview.net/forum?id=IgGM2025
project_url: ''
category: other_bio
motivation: 序列结构联合生成式抗体设计
```

#### 📝 一句话总结
IgGM 提出了一种面向给定抗原和框架区序列的抗体/纳米抗体生成模型，用 ESM-PPI 特征、Sgformer、IPA 预测模块和 consistency distillation 同时设计 CDR 序列与完整抗体-抗原复合物结构，解决现有共设计方法依赖已知抗体框架结构或模板的问题。

#### 🎯 核心要点
- **真实设计场景建模**：输入抗原结构与抗体 framework region 序列，输出 CDR 序列和完整 antibody-antigen complex 结构
- **联合生成序列与结构**：同时恢复离散氨基酸类别、连续平移坐标和 SO(3) 局部旋转，覆盖 sequence design 与 structure design
- **ESM-PPI 特征提取**：使用冻结的多链蛋白语言模型 ESM-PPI 提取抗原-抗体序列的跨链上下文特征
- **多级特征编码**：Inter-chain Feature Embedding、Structure Encoder 和 16 层 Sgformer 共同建模链身份、表位位置、单体表征和 pair 表征
- **IPA 预测模块**：8 层 Predict Module 用 Invariant Point Attention 迭代优化结构，并由 sequence head 输出 CDR 氨基酸分布
- **两阶段训练**：先训练结构预测，再加入 CDR 序列恢复；第二阶段混合训练 CDR H3、heavy-chain CDR 和 all-CDR 任务
- **扩散到一致性模型**：先训练扩散模型，再通过 consistency distillation 得到可单步或少步生成的模型
- **抗体与纳米抗体统一**：传统抗体重链/轻链和单域纳米抗体都可处理，纳米抗体视为只有重链的特例

#### 🔬 深入细节
##### 模型架构图与可访问来源

![IgGM 模型框架](https://raw.githubusercontent.com/TencentAI4S/IgGM/master/docs/IgGM.png)
*图：IgGM 官方仓库中的模型示意。模型从带噪抗体序列/结构与抗原输入出发，经 ESM-PPI、跨链特征嵌入、结构编码、Sgformer 和 Predict Module，输出设计序列与复合物结构。*

可访问来源：OpenReview 论文页 https://openreview.net/forum?id=zmmfsJpYcq；PDF https://openreview.net/pdf?id=zmmfsJpYcq；官方代码与示意图 https://github.com/TencentAI4S/IgGM。

##### 算法伪代码

```python
# IgGM 多步采样的简化形式
def iggm_design(antigen_seq, antigen_coords, framework_seq, epitope_mask, steps=10):
    # 1. 初始化抗体 CDR 序列与结构噪声
    s = random_amino_acids(masked_cdr_positions(framework_seq), alphabet=20)
    x = sample_translation_noise()          # R^3
    r = sample_uniform_SO3()                # residue frame orientation

    # 2. 条件信息：抗原结构、表位、框架区序列
    condition = {
        "antigen_seq": antigen_seq,
        "antigen_coords": antigen_coords,
        "framework_seq": framework_seq,
        "epitope_mask": epitope_mask,
    }

    # 3. consistency model: 可单步，也可少步细化
    for tau in decreasing_time_grid(steps):
        esm_features = frozen_ESM_PPI(merge_sequences(s, framework_seq, antigen_seq))
        single, pair = inter_chain_embed(esm_features, condition)
        pair = structure_encoder(pair, x, r, epitope_mask)

        for block in range(16):
            single, pair = sgformer_block(single, pair)  # attention + OPM + triangle updates

        for block in range(8):
            single, x, r = IPA_predict_module(single, pair, x, r)

        s = sequence_head(single).argmax(dim=-1)         # CDR amino-acid categories
        s, x, r = add_noise_for_next_step(s, x, r, tau)  # multi-step refinement

    return assemble_complex(s, x, r, antigen_coords)
```

##### 问题设定：为什么需要 IgGM

很多抗体共设计方法假设已有抗体-抗原复合物结构，或至少已有 framework region 的结构模板，然后只改 CDR。实际项目中，新抗原对应的候选抗体结构往往未知；工程上更常见的是选取具有良好理化性质的框架区序列，再要求模型设计能结合指定表位的 CDR，并预测结合后的整体构象。

IgGM 因此把问题定义为：给定抗原 \(R_A(S_A, X_A)\)、抗体框架区序列 \(S_F\) 和表位信息，设计 CDR 序列 \(S_C\)，同时预测抗体全部 backbone 坐标 \(X_C, X_F\) 以及与抗原的复合物摆放：

$$
p_\theta(S_C, X_C, X_F \mid S_F, S_A, X_A, \text{epitope})
$$

这种定义比“只设计 CDR H3 序列”更接近真实抗体发现流程，因为模型必须同时处理三个耦合问题：CDR 氨基酸组成、CDR/框架区三维构象、以及抗体相对抗原表位的 docking pose。

##### 网络结构：ESM-PPI、Sgformer 与 Predict Module

IgGM 的第一层是冻结的 ESM-PPI。相比普通单链蛋白语言模型，ESM-PPI 被用于多链蛋白复合物场景，能够提供跨链上下文特征。冻结它的好处是减少训练成本并保留预训练学到的序列-结构先验，后续模块只需学习抗体设计任务中的条件生成映射。

随后，Inter-chain Feature Embedding Module 注入链身份、残基位置和表位标记；Structure Encoder 根据当前带噪结构计算 residue-pair 空间特征，并将距离信息离散化为 pair representation。Sgformer 由 16 个 block 构成，更新 single representation 和 pair representation，机制包括：

$$
S \leftarrow \mathrm{SeqAttentionWithPairBias}(S, Z), \quad
Z \leftarrow Z + \mathrm{OuterProductMean}(S)
$$

以及 triangle update / triangle self-attention。triangle 模块的直觉与 AlphaFold 类似：如果 \(i-k\) 和 \(k-j\) 的关系已知，则 \(i-j\) 的界面几何也应被约束。对抗体设计而言，这尤其重要，因为 CDR 与抗原表位的局部接触必须和整条重链/轻链的摆放一致。

最后，8 层 Predict Module 负责生成结构和序列。结构部分使用 Invariant Point Attention：

$$
\alpha_{ij} \propto \exp\left(
\frac{q_i^\top k_j}{\sqrt{d}} + b_{ij}
- \lambda\|T_i q_i^{point} - T_j k_j^{point}\|^2
\right)
$$

这里 \(T_i\) 是第 \(i\) 个残基的局部刚体框架。IPA 让模型在三维空间中更新结构，同时保持对全局旋转和平移的不变性；sequence head 则把 single representation 投影到 20 类氨基酸概率，完成 CDR 序列恢复。

##### 训练目标：结构、序列和界面同时约束

IgGM 先训练结构组件，再加入序列设计。第一阶段保留真实序列信息，仅训练结构恢复：

$$
\mathcal{L} =
\mathcal{L}_{geo} + \mathcal{L}_{Frame} + \mathcal{L}_{iFrame} + 0.02\mathcal{L}_{viol}
$$

第二阶段加入 CDR 序列恢复：

$$
\mathcal{L} =
\mathcal{L}_{srcv}
+ \mathcal{L}_{geo}
+ \mathcal{L}_{Frame}
+ \mathcal{L}_{iFrame}
+ 0.02\mathcal{L}_{viol}
$$

其中序列恢复是 masked CDR 位置上的 cross entropy：

$$
\mathcal{L}_{srcv} =
-\frac{1}{|\mathcal{D}|}\sum_{i\in \mathcal{D}}\sum_{c=1}^{20} y_i^c\log p_i^c
$$

\(\mathcal{L}_{geo}\) 用 trRosetta 风格的辅助头预测残基对距离和角度，包括 \(D_{ij}, \Omega_{ij}, \Theta_{ij}, \Phi_{ij}\)，并用交叉熵监督 pair 表征：

$$
\mathcal{L}_{geo} =
\sum_{ij} CE(\mathrm{logits}^d_{ij};D_{ij})
+ CE(\mathrm{logits}^{\omega}_{ij};\Omega_{ij})
+ CE(\mathrm{logits}^{\theta}_{ij};\Theta_{ij})
+ CE(\mathrm{logits}^{\phi}_{ij};\Phi_{ij})
$$

\(\mathcal{L}_{Frame}\) 是 residue frame MSE，比较预测和真实残基局部框架的平移与旋转：

$$
d_{Frame}(x,\hat{x}) =
\sqrt{\frac{1}{L}\sum_{l=1}^{L}\left(
w_t\min(\|z_l-\hat{z}_l\|^2,d_{clamp})+
w_r\|I_3-\hat{r}_l^\top r_l\|_F^2
\right)}
$$

\(\mathcal{L}_{iFrame}\) 只在 interface/contact residues 上计算类似距离，使模型更关注抗体-抗原结合界面的相对姿态；\(\mathcal{L}_{viol}\) 则惩罚错误键长、键角和非键合原子碰撞。多链场景中，重链末端与轻链首端之间没有肽键，因此该处不会被错误地施加 peptide bond 惩罚。

##### 扩散过程与 consistency distillation

IgGM 同时处理离散序列和连续结构，所以 forward noise 也分三类：氨基酸序列用离散扩散，\(C_\alpha\) 平移坐标用高斯扩散，残基方向用 SO(3) 扩散。离散序列的转移可写为：

$$
q(s_t \mid s_{t-1}) = \mathrm{Cat}(s_t; p=s_{t-1}Q_t)
$$

连续坐标的边缘分布为：

$$
p(x_t \mid x_0) = \mathcal{N}(x_t;\sqrt{\bar{\alpha}_t}x_0,(1-\bar{\alpha}_t)I)
$$

模型先学习从带噪 \((s_t,x_t)\) 恢复干净 \((s_0,x_0)\)。随后用 consistency distillation 训练一个一致性函数 \(f_\theta(z_t,t)\)，让相邻时间点沿 PF-ODE 轨迹映射到相同干净样本：

$$
\mathcal{L}_{CD}(\theta,\theta^-;\Psi)=
\mathbb{E}_{z,c,n}\left[
d\left(
f_\theta(z_{t_{n+1}},c,t_{n+1}),
f_{\theta^-}(\hat{z}^{\Psi}_{t_n},c,t_n)
\right)
\right]
$$

这使 IgGM 可以单步生成，也可以用少量步数进一步稳定结构。论文采用 10 步作为质量和速度的折中，并用 DockQ 作为候选筛选指标，因为 DockQ 同时反映界面接触和复合物姿态质量。

##### 训练数据与实验信号

训练集来自 SAbDab，按时间切分：截至 2022 年底的实验结构用于训练；2023 年下半年的低相似样本构成测试集，包含 60 个传统抗体复合物和 27 个纳米抗体复合物。评估指标包括 CDR 氨基酸恢复率 AAR、CDR backbone RMSD、整体 TM-score/lDDT、界面 DockQ、iRMS、LRMS 和 DockQ>0.23 的 success rate。

在抗体 de novo 设计中，IgGM 在 all-CDR 设计上相较 DiffAb、MEAN、dyMEAN 获得更高 AAR 和更好的界面指标；论文报告 H3 AAR 为 0.360，DockQ 为 0.246，SR 为 0.433。若用 AlphaFold 3 结构初始化，DockQ 提升到 0.326，SR 提升到 0.627，说明 IgGM 可以利用更强的初始结构作为 refinement/generation 起点。

##### 与已有抗体设计方法的区别

| 维度 | MEAN / DiffAb / dyMEAN 等 | IgGM |
|------|---------------------------|------|
| 输入假设 | 常依赖已知抗体结构、模板或固定框架构象 | 只需抗原结构、表位和框架区序列即可生成完整结构 |
| 设计范围 | 常聚焦 CDR H3 或给定结构上的局部 CDR | 可设计 CDR H3、heavy-chain CDR 或 all CDRs |
| 结构生成 | 部分方法只生成局部结构或依赖外部 docking | 直接输出抗体-抗原复合物结构 |
| 生成模型 | 扩散或图生成，但多步采样成本较高 | diffusion 预训练 + consistency distillation，支持单步/少步生成 |
| 纳米抗体 | 通常需要专门模型或适配 | 纳米抗体作为单重链场景统一处理 |

> ⚠️ 注意：IgGM 的评价仍主要是 in silico 指标。论文也明确指出，计算筛选与湿实验亲和力/特异性之间仍有差距，未来需要更强的 discriminator 或实验验证闭环。

#### 🧪 练习题
```yaml
question: "IgGM 相比许多既有抗体共设计方法，最贴近真实应用场景的关键设定是什么？"
options:
  - "只预测抗原序列，不处理抗体结构"
  - "给定抗原结构和抗体框架区序列，同时生成 CDR 序列与完整抗体-抗原复合物结构"
  - "要求用户先提供实验解析的抗体-抗原复合物结构"
  - "只优化已经存在抗体的单个点突变"
answer: 1
explain: "IgGM 的问题设定是假设框架区结构未知，只给框架区序列和抗原/表位条件；模型需要同时完成 CDR 序列设计、抗体整体结构预测和复合物 docking pose 生成。"
```
