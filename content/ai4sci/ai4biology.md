---
domain: ai4sci
topic_id: ai4biology
topic_name: 生命科学AI
page_icon: "\U0001F9EC"
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

### 待定
待定。

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
AlphaFold 1 的核心目标是：深度残差网络预测距离直方图。

#### 🎯 核心要点
- 核心动机：深度残差网络预测距离直方图
- 代表机构：Google DeepMind

#### 🔬 深入细节
深度残差网络预测距离直方图


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
AlphaFold 2 的核心目标是：Evoformer注意力机制革新结构预测。

#### 🎯 核心要点
- 核心动机：Evoformer注意力机制革新结构预测
- 演化来源：继承或改进自 alphafold1
- 代表机构：Google DeepMind

#### 🔬 深入细节
Evoformer注意力机制革新结构预测


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
RoseTTAFold 的核心目标是：三轨网络同步迭代序列距离坐标。

#### 🎯 核心要点
- 核心动机：三轨网络同步迭代序列距离坐标
- 代表机构：Baker Lab

#### 🔬 深入细节
三轨网络同步迭代序列距离坐标


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
OmegaFold 的核心目标是：无需MSA的单序列快速预测。

#### 🎯 核心要点
- 核心动机：无需MSA的单序列快速预测
- 代表机构：HeliXon

#### 🔬 深入细节
无需MSA的单序列快速预测


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
ESMFold 的核心目标是：蛋白质语言模型端到端单序列预测。

#### 🎯 核心要点
- 核心动机：蛋白质语言模型端到端单序列预测
- 代表机构：Meta AI

#### 🔬 深入细节
蛋白质语言模型端到端单序列预测


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
AlphaFold 3 的核心目标是：扩散模型预测全生物分子相互作用。

#### 🎯 核心要点
- 核心动机：扩散模型预测全生物分子相互作用
- 演化来源：继承或改进自 alphafold2
- 代表机构：Google DeepMind

#### 🔬 深入细节
扩散模型预测全生物分子相互作用


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
OpenFold 的核心目标是：AlphaFold2的PyTorch开源复现。

#### 🎯 核心要点
- 核心动机：AlphaFold2的PyTorch开源复现
- 演化来源：继承或改进自 alphafold2
- 代表机构：Columbia University

#### 🔬 深入细节
AlphaFold2的PyTorch开源复现


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
Chai-1 的核心目标是：支持实验约束的多模态基础模型。

#### 🎯 核心要点
- 核心动机：支持实验约束的多模态基础模型
- 演化来源：继承或改进自 alphafold3
- 代表机构：Chai Discovery

#### 🔬 深入细节
支持实验约束的多模态基础模型


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
Boltz-1 的核心目标是：首个完全开源商用的AF3级模型。

#### 🎯 核心要点
- 核心动机：首个完全开源商用的AF3级模型
- 演化来源：继承或改进自 alphafold3
- 代表机构：MIT Jameel Clinic

#### 🔬 深入细节
首个完全开源商用的AF3级模型


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
TDFold 的核心目标是：二维几何模板扩散加速单序列预测。

#### 🎯 核心要点
- 核心动机：二维几何模板扩散加速单序列预测
- 代表机构：Wang et al.

#### 🔬 深入细节
二维几何模板扩散加速单序列预测


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
Protenix-v1 的核心目标是：开源复现精度全面超越AF3。

#### 🎯 核心要点
- 核心动机：开源复现精度全面超越AF3
- 演化来源：继承或改进自 alphafold3
- 代表机构：ByteDance

#### 🔬 深入细节
开源复现精度全面超越AF3


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
ESM-IF 的核心目标是：几何图神经网络实现逆折叠。

#### 🎯 核心要点
- 核心动机：几何图神经网络实现逆折叠
- 代表机构：Meta AI

#### 🔬 深入细节
几何图神经网络实现逆折叠


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
FrameDiff 的核心目标是：SE(3)框架下直接扩散骨架。

#### 🎯 核心要点
- 核心动机：SE(3)框架下直接扩散骨架
- 代表机构：MIT

#### 🔬 深入细节
SE(3)框架下直接扩散骨架


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
RFdiffusion 的核心目标是：扩散模型生成蛋白质骨架。

#### 🎯 核心要点
- 核心动机：扩散模型生成蛋白质骨架
- 演化来源：继承或改进自 rosettafold
- 代表机构：Baker Lab

#### 🔬 深入细节
扩散模型生成蛋白质骨架


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
Chroma 的核心目标是：可编程生成复杂蛋白质对称体。

#### 🎯 核心要点
- 核心动机：可编程生成复杂蛋白质对称体
- 代表机构：Generate Biomedicines

#### 🔬 深入细节
可编程生成复杂蛋白质对称体


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
SaProt 的核心目标是：结构感知词汇增强语言模型。

#### 🎯 核心要点
- 核心动机：结构感知词汇增强语言模型
- 代表机构：Westlake University

#### 🔬 深入细节
结构感知词汇增强语言模型


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
RFdiffusion3 的核心目标是：全原子精度蛋白质设计。

#### 🎯 核心要点
- 核心动机：全原子精度蛋白质设计
- 演化来源：继承或改进自 rfdiffusion
- 代表机构：Baker Lab

#### 🔬 深入细节
全原子精度蛋白质设计


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
DNABERT 的核心目标是：BERT架构应用于DNA k-mer表征。

#### 🎯 核心要点
- 核心动机：BERT架构应用于DNA k-mer表征
- 代表机构：周德中团队

#### 🔬 深入细节
BERT架构应用于DNA k-mer表征


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
Enformer 的核心目标是：Transformer捕捉长程基因相互作用。

#### 🎯 核心要点
- 核心动机：Transformer捕捉长程基因相互作用
- 代表机构：Google DeepMind

#### 🔬 深入细节
Transformer捕捉长程基因相互作用


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
EVE 的核心目标是：VAE预测人类基因变异致病性。

#### 🎯 核心要点
- 核心动机：VAE预测人类基因变异致病性
- 代表机构：Harvard Medical School

#### 🔬 深入细节
VAE预测人类基因变异致病性


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
HyenaDNA 的核心目标是：隐式卷积实现单核苷酸分辨率。

#### 🎯 核心要点
- 核心动机：隐式卷积实现单核苷酸分辨率
- 代表机构：Stanford University

#### 🔬 深入细节
隐式卷积实现单核苷酸分辨率


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
DNABERT-2 的核心目标是：BPE分词解决长序列效率问题。

#### 🎯 核心要点
- 核心动机：BPE分词解决长序列效率问题
- 演化来源：继承或改进自 dnabert
- 代表机构：周德中团队

#### 🔬 深入细节
BPE分词解决长序列效率问题


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
Borzoi 的核心目标是：支持524kb超长输入序列。

#### 🎯 核心要点
- 核心动机：支持524kb超长输入序列
- 演化来源：继承或改进自 enformer
- 代表机构：Google DeepMind

#### 🔬 深入细节
支持524kb超长输入序列


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
GROVER 的核心目标是：学习人类基因组上下文DNA语言模型。

#### 🎯 核心要点
- 核心动机：学习人类基因组上下文DNA语言模型
- 代表机构：Sanabria et al.

#### 🔬 深入细节
学习人类基因组上下文DNA语言模型


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
Evo 的核心目标是：长上下文分子到基因组尺度预测。

#### 🎯 核心要点
- 核心动机：长上下文分子到基因组尺度预测
- 代表机构：Arc Institute

#### 🔬 深入细节
长上下文分子到基因组尺度预测


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
Nucleotide Transformer 的核心目标是：3202基因组预训练基础模型。

#### 🎯 核心要点
- 核心动机：3202基因组预训练基础模型
- 代表机构：InstaDeep

#### 🔬 深入细节
3202基因组预训练基础模型


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
Nucleotide GPT 的核心目标是：解码器架构单核苷酸分辨率模型。

#### 🎯 核心要点
- 核心动机：解码器架构单核苷酸分辨率模型
- 代表机构：McLaughlin et al.

#### 🔬 深入细节
解码器架构单核苷酸分辨率模型


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
Evo 2 的核心目标是：9万亿碱基对全生命域基因组建模。

#### 🎯 核心要点
- 核心动机：9万亿碱基对全生命域基因组建模
- 演化来源：继承或改进自 evo
- 代表机构：Arc Institute

#### 🔬 深入细节
9万亿碱基对全生命域基因组建模


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
scBERT 的核心目标是：首个百万级单细胞数据预训练模型。

#### 🎯 核心要点
- 核心动机：首个百万级单细胞数据预训练模型
- 代表机构：腾讯AI Lab

#### 🔬 深入细节
首个百万级单细胞数据预训练模型


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
Geneformer 的核心目标是：3000万细胞基因调控逻辑预训练。

#### 🎯 核心要点
- 核心动机：3000万细胞基因调控逻辑预训练
- 代表机构：Broad Institute

#### 🔬 深入细节
3000万细胞基因调控逻辑预训练


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
scGPT 的核心目标是：生成式多组学集成与扰动预测。

#### 🎯 核心要点
- 核心动机：生成式多组学集成与扰动预测
- 代表机构：多伦多大学

#### 🔬 深入细节
生成式多组学集成与扰动预测


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
CellPLM 的核心目标是：细胞级token实现跨物种表征。

#### 🎯 核心要点
- 核心动机：细胞级token实现跨物种表征
- 代表机构：智源研究院

#### 🔬 深入细节
细胞级token实现跨物种表征


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
scFoundation 的核心目标是：1亿参数最大规模单细胞模型。

#### 🎯 核心要点
- 核心动机：1亿参数最大规模单细胞模型
- 代表机构：清华大学

#### 🔬 深入细节
1亿参数最大规模单细胞模型


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
Geneformer V2 的核心目标是：316M参数增强复杂调控网络推断。

#### 🎯 核心要点
- 核心动机：316M参数增强复杂调控网络推断
- 演化来源：继承或改进自 geneformer
- 代表机构：Broad Institute

#### 🔬 深入细节
316M参数增强复杂调控网络推断


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
Uni-Mol 的核心目标是：统一三维分子与蛋白质表征学习。

#### 🎯 核心要点
- 核心动机：统一三维分子与蛋白质表征学习
- 代表机构：深势科技

#### 🔬 深入细节
统一三维分子与蛋白质表征学习


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
PhysDock 的核心目标是：物理势能引导扩散提升对接真实性。

#### 🎯 核心要点
- 核心动机：物理势能引导扩散提升对接真实性
- 演化来源：继承或改进自 diffdock
- 代表机构：Zhang et al.

#### 🔬 深入细节
物理势能引导扩散提升对接真实性


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
RhoFold 的核心目标是：Transformer实现RNA三维结构预测。

#### 🎯 核心要点
- 核心动机：Transformer实现RNA三维结构预测
- 代表机构：Shen Lab

#### 🔬 深入细节
Transformer实现RNA三维结构预测


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
IgGM 的核心目标是：序列结构联合生成式抗体设计。

#### 🎯 核心要点
- 核心动机：序列结构联合生成式抗体设计
- 代表机构：ICLR

#### 🔬 深入细节
序列结构联合生成式抗体设计
