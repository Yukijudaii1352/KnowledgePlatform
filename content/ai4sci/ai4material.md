---
domain: ai4sci
topic_id: ai4material
topic_name: 材料学AI
page_icon: 🧪
page_title: 材料学AI 算法总结
page_subtitle: '{build_date} 版'
page_desc: AI在晶体结构预测、性质预测及新材料发现领域的演进脉络
hero_pills:
- 材料发现 · 结构预测
count_pill: '{count} 个算法'
categories:
  gnn_representation:
    label: 图神经网络表征
    color: '#22a06b'
  structure_prediction:
    label: 晶体结构预测
    color: '#0065ff'
  mlip:
    label: 机器学习原子间势
    color: '#ff8b00'
  property_prediction:
    label: 性质预测
    color: '#9c27b0'
  foundation_model:
    label: 基础模型/LLM
    color: '#e91e63'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4material/overview/zhihu__北京大学张锦院士团队Chem._Rev.：面向材料科学的人工智能__a2eb40c8/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4material/latest/zhihu__56｜AI4Science篇：语言模型能造出常温超导吗？——蛋白质、材料与数学的发现范式__be044594/article.md

## 算法演化关系

```yaml
nodes:
- id: schnet
  x: 430
  y: 100
  category: gnn_representation
- id: cgcnn
  x: 460
  y: 100
  category: gnn_representation
- id: megnet
  x: 490
  y: 100
  category: gnn_representation
- id: dimenet
  x: 520
  y: 100
  category: gnn_representation
- id: alignn
  x: 550
  y: 100
  category: gnn_representation
- id: painn
  x: 550
  y: 100
  category: gnn_representation
- id: gemnet
  x: 550
  y: 100
  category: gnn_representation
- id: equiformer
  x: 610
  y: 100
  category: gnn_representation
- id: uspex
  x: 100
  y: 250
  category: structure_prediction
- id: calypso
  x: 280
  y: 250
  category: structure_prediction
- id: cdvae
  x: 550
  y: 250
  category: structure_prediction
- id: diffcsp
  x: 640
  y: 250
  category: structure_prediction
- id: flowmm
  x: 640
  y: 250
  category: structure_prediction
- id: mattergen
  x: 670
  y: 250
  category: structure_prediction
- id: m3gnet
  x: 580
  y: 400
  category: mlip
- id: mace
  x: 580
  y: 400
  category: mlip
- id: chgnet
  x: 610
  y: 400
  category: mlip
- id: orb
  x: 640
  y: 400
  category: mlip
- id: esen
  x: 670
  y: 400
  category: mlip
- id: matminer
  x: 460
  y: 550
  category: property_prediction
- id: modnet
  x: 550
  y: 550
  category: property_prediction
- id: anisonet
  x: 670
  y: 550
  category: property_prediction
- id: e2gnn
  x: 670
  y: 550
  category: property_prediction
- id: gnome
  x: 610
  y: 700
  category: foundation_model
- id: crystallm
  x: 640
  y: 700
  category: foundation_model
- id: matllmsearch
  x: 670
  y: 700
  category: foundation_model
- id: mattersim_mt
  x: 700
  y: 700
  category: foundation_model
- id: llema
  x: 700
  y: 700
  category: foundation_model
edges:
- from: schnet
  to: cgcnn
  label: 周期性建模
- from: cgcnn
  to: megnet
  label: 全局状态
- from: schnet
  to: dimenet
  label: 方向性
- from: cgcnn
  to: alignn
  label: 线图表征
- from: schnet
  to: painn
  label: 等变性
- from: dimenet
  to: gemnet
  label: 对称性
- from: mace
  to: equiformer
  label: Transformer
- from: uspex
  to: calypso
  label: 群智能
- from: cdvae
  to: diffcsp
  label: 坐标扩散
- from: cdvae
  to: flowmm
  label: 流匹配
- from: diffcsp
  to: mattergen
  label: 逆向设计
- from: megnet
  to: m3gnet
  label: 通用势
- from: gemnet
  to: mace
  label: 高阶等变
- from: m3gnet
  to: chgnet
  label: 电荷感知
- from: mace
  to: orb
  label: GPU加速
- from: mace
  to: esen
  label: 光滑势面
- from: matminer
  to: modnet
  label: 小样本
- from: equiformer
  to: anisonet
  label: 张量预测
- from: equiformer
  to: e2gnn
  label: 效率优化
- from: m3gnet
  to: gnome
  label: 主动学习
- from: crystallm
  to: matllmsearch
  label: 智能搜索
- from: chgnet
  to: mattersim_mt
  label: 多任务
- from: matllmsearch
  to: llema
  label: 演化引导
milestones:
- cgcnn
- gnome
- mattersim_mt
```

## 核心算法

### SchNet

```yaml
id: schnet
num: 1
name: SchNet
full_name: 连续过滤器卷积网络 (Continuous-filter Convolutional NN)
year: '2017'
org: TU Berlin
parent: —
paper_url: https://proceedings.neurips.cc/paper/2017/hash/303ed4c69846ab36c2904d3ba8573050-Abstract.html
project_url: ''
category: gnn_representation
motivation: 连续过滤器处理非网格原子位置
```

#### 📝 一句话总结
SchNet 的核心目标是：连续过滤器处理非网格原子位置。

#### 🎯 核心要点
- 核心动机：连续过滤器处理非网格原子位置
- 代表机构：TU Berlin

#### 🔬 深入细节
连续过滤器处理非网格原子位置


### CGCNN

```yaml
id: cgcnn
num: 2
name: CGCNN
full_name: 晶体图卷积神经网络 (Crystal Graph Convolutional NN)
year: '2018'
org: MIT
parent: schnet
paper_url: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.120.145301
project_url: ''
category: gnn_representation
motivation: 首个通用晶体GNN捕捉周期性
```

#### 📝 一句话总结
CGCNN 的核心目标是：首个通用晶体GNN捕捉周期性。

#### 🎯 核心要点
- 核心动机：首个通用晶体GNN捕捉周期性
- 演化来源：继承或改进自 schnet
- 代表机构：MIT

#### 🔬 深入细节
首个通用晶体GNN捕捉周期性


### MEGNet

```yaml
id: megnet
num: 3
name: MEGNet
full_name: 材料图网络 (MatErials Graph Network)
year: '2019'
org: UCSD
parent: cgcnn
paper_url: https://pubs.acs.org/doi/10.1021/acs.chemmater.9b01294
project_url: ''
category: gnn_representation
motivation: 全局状态向量实现多属性预测
```

#### 📝 一句话总结
MEGNet 的核心目标是：全局状态向量实现多属性预测。

#### 🎯 核心要点
- 核心动机：全局状态向量实现多属性预测
- 演化来源：继承或改进自 cgcnn
- 代表机构：UCSD

#### 🔬 深入细节
全局状态向量实现多属性预测


### DimeNet

```yaml
id: dimenet
num: 4
name: DimeNet
full_name: 方向性消息传递网络 (Directional Message Passing NN)
year: '2020'
org: TU Munich
parent: schnet
paper_url: https://openreview.net/forum?id=B1e79eBKvS
project_url: ''
category: gnn_representation
motivation: 显式建模键角的方向性消息
```

#### 📝 一句话总结
DimeNet 的核心目标是：显式建模键角的方向性消息。

#### 🎯 核心要点
- 核心动机：显式建模键角的方向性消息
- 演化来源：继承或改进自 schnet
- 代表机构：TU Munich

#### 🔬 深入细节
显式建模键角的方向性消息


### ALIGNN

```yaml
id: alignn
num: 5
name: ALIGNN
full_name: 原子线图神经网络 (Atomistic Line Graph NN)
year: '2021'
org: NIST
parent: cgcnn
paper_url: https://www.nature.com/articles/s41524-021-00650-1
project_url: ''
category: gnn_representation
motivation: 线图同时捕捉键长与键角
```

#### 📝 一句话总结
ALIGNN 的核心目标是：线图同时捕捉键长与键角。

#### 🎯 核心要点
- 核心动机：线图同时捕捉键长与键角
- 演化来源：继承或改进自 cgcnn
- 代表机构：NIST

#### 🔬 深入细节
线图同时捕捉键长与键角


### PaiNN

```yaml
id: painn
num: 6
name: PaiNN
full_name: 极速旋转等变消息传递 (Polarizable Atom Interaction NN)
year: '2021'
org: TU Berlin
parent: schnet
paper_url: https://proceedings.mlr.press/v139/schutt21a.html
project_url: ''
category: gnn_representation
motivation: 极速旋转等变提升力场效率
```

#### 📝 一句话总结
PaiNN 的核心目标是：极速旋转等变提升力场效率。

#### 🎯 核心要点
- 核心动机：极速旋转等变提升力场效率
- 演化来源：继承或改进自 schnet
- 代表机构：TU Berlin

#### 🔬 深入细节
极速旋转等变提升力场效率


### GemNet

```yaml
id: gemnet
num: 7
name: GemNet
full_name: 通用方向性图网络 (Geometric Message Passing NN)
year: '2021'
org: TU Munich
parent: dimenet
paper_url: https://proceedings.neurips.cc/paper/2021/hash/35cf8659cfcb13224cbd47863a34fc58-Abstract.html
project_url: ''
category: gnn_representation
motivation: 解决分子对称性破缺问题
```

#### 📝 一句话总结
GemNet 的核心目标是：解决分子对称性破缺问题。

#### 🎯 核心要点
- 核心动机：解决分子对称性破缺问题
- 演化来源：继承或改进自 dimenet
- 代表机构：TU Munich

#### 🔬 深入细节
解决分子对称性破缺问题


### Equiformer

```yaml
id: equiformer
num: 8
name: Equiformer
full_name: 等变图注意力Transformer (Equivariant Graph Attention Transformer)
year: '2023'
org: SEAS
parent: mace
paper_url: https://openreview.net/forum?id=KwmPfARgOTD
project_url: ''
category: gnn_representation
motivation: Transformer与SE(3)等变结合
```

#### 📝 一句话总结
Equiformer 的核心目标是：Transformer与SE(3)等变结合。

#### 🎯 核心要点
- 核心动机：Transformer与SE(3)等变结合
- 演化来源：继承或改进自 mace
- 代表机构：SEAS

#### 🔬 深入细节
Transformer与SE(3)等变结合


### USPEX

```yaml
id: uspex
num: 9
name: USPEX
full_name: '通用结构预测演化算法 (Universal Structure Predictor: Evolutionary Xtallography)'
year: '2006'
org: Oganov Group
parent: —
paper_url: https://uspex-team.org/en/uspex/overview
project_url: ''
category: structure_prediction
motivation: 遗传算法全局搜索能量最低点
```

#### 📝 一句话总结
USPEX 的核心目标是：遗传算法全局搜索能量最低点。

#### 🎯 核心要点
- 核心动机：遗传算法全局搜索能量最低点
- 代表机构：Oganov Group

#### 🔬 深入细节
遗传算法全局搜索能量最低点


### CALYPSO

```yaml
id: calypso
num: 10
name: CALYPSO
full_name: 粒子群晶体结构搜索 (Crystal structure AnaLYsis by Particle Swarm Optimization)
year: '2012'
org: 吉林大学
parent: uspex
paper_url: https://www.calypso.cn
project_url: ''
category: structure_prediction
motivation: 粒子群优化超硬材料预测
```

#### 📝 一句话总结
CALYPSO 的核心目标是：粒子群优化超硬材料预测。

#### 🎯 核心要点
- 核心动机：粒子群优化超硬材料预测
- 演化来源：继承或改进自 uspex
- 代表机构：吉林大学

#### 🔬 深入细节
粒子群优化超硬材料预测


### CDVAE

```yaml
id: cdvae
num: 11
name: CDVAE
full_name: 晶体扩散变分自编码器 (Crystal Diffusion Variational AutoEncoder)
year: '2021'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/2110.14810
project_url: ''
category: structure_prediction
motivation: 首次将扩散模型引入晶体生成
```

#### 📝 一句话总结
CDVAE 的核心目标是：首次将扩散模型引入晶体生成。

#### 🎯 核心要点
- 核心动机：首次将扩散模型引入晶体生成
- 代表机构：MIT

#### 🔬 深入细节
首次将扩散模型引入晶体生成


### DiffCSP

```yaml
id: diffcsp
num: 12
name: DiffCSP
full_name: 扩散晶体结构预测 (Diffusion-based Crystal Structure Prediction)
year: '2024'
org: Tsinghua
parent: cdvae
paper_url: https://openreview.net/forum?id=9T_v_8AAAAJ
project_url: ''
category: structure_prediction
motivation: 学习原子坐标扩散提升搜索率
```

#### 📝 一句话总结
DiffCSP 的核心目标是：学习原子坐标扩散提升搜索率。

#### 🎯 核心要点
- 核心动机：学习原子坐标扩散提升搜索率
- 演化来源：继承或改进自 cdvae
- 代表机构：Tsinghua

#### 🔬 深入细节
学习原子坐标扩散提升搜索率


### FlowMM

```yaml
id: flowmm
num: 13
name: FlowMM
full_name: 黎曼流匹配材料生成 (Riemannian Flow Matching for Materials)
year: '2024'
org: MIT
parent: cdvae
paper_url: https://arxiv.org/abs/2406.04713
project_url: ''
category: structure_prediction
motivation: 流匹配技术效率提升3倍
```

#### 📝 一句话总结
FlowMM 的核心目标是：流匹配技术效率提升3倍。

#### 🎯 核心要点
- 核心动机：流匹配技术效率提升3倍
- 演化来源：继承或改进自 cdvae
- 代表机构：MIT

#### 🔬 深入细节
流匹配技术效率提升3倍


### MatterGen

```yaml
id: mattergen
num: 14
name: MatterGen
full_name: 材料生成模型 (Matter Generator)
year: '2025'
org: Microsoft
parent: diffcsp
paper_url: https://www.nature.com/articles/s41586-023-06735-9
project_url: ''
category: structure_prediction
motivation: 目标性质逆向设计生成
```

#### 📝 一句话总结
MatterGen 的核心目标是：目标性质逆向设计生成。

#### 🎯 核心要点
- 核心动机：目标性质逆向设计生成
- 演化来源：继承或改进自 diffcsp
- 代表机构：Microsoft

#### 🔬 深入细节
目标性质逆向设计生成


### M3GNet

```yaml
id: m3gnet
num: 15
name: M3GNet
full_name: 三体图网络 (Multi-body Graph Network)
year: '2022'
org: UCSD
parent: megnet
paper_url: https://www.nature.com/articles/s43588-022-00349-3
project_url: ''
category: mlip
motivation: 通用势函数覆盖89种元素
```

#### 📝 一句话总结
M3GNet 的核心目标是：通用势函数覆盖89种元素。

#### 🎯 核心要点
- 核心动机：通用势函数覆盖89种元素
- 演化来源：继承或改进自 megnet
- 代表机构：UCSD

#### 🔬 深入细节
通用势函数覆盖89种元素


### MACE

```yaml
id: mace
num: 16
name: MACE
full_name: 高阶等变消息传递 (Multi-Atomic Cluster Expansion)
year: '2022'
org: Cambridge
parent: gemnet
paper_url: https://proceedings.neurips.cc/paper/2022/hash/4a36c3c51af11ed9f34615b81edb5bbc-Abstract-Conference.html
project_url: ''
category: mlip
motivation: 高阶等变消息实现近DFT精度
```

#### 📝 一句话总结
MACE 的核心目标是：高阶等变消息实现近DFT精度。

#### 🎯 核心要点
- 核心动机：高阶等变消息实现近DFT精度
- 演化来源：继承或改进自 gemnet
- 代表机构：Cambridge

#### 🔬 深入细节
高阶等变消息实现近DFT精度


### CHGNet

```yaml
id: chgnet
num: 17
name: CHGNet
full_name: 电荷感知图网络 (Charge-informed Graph Network)
year: '2023'
org: Berkeley
parent: m3gnet
paper_url: https://www.nature.com/articles/s42256-023-00716-3
project_url: ''
category: mlip
motivation: 引入磁矩区分氧化态
```

#### 📝 一句话总结
CHGNet 的核心目标是：引入磁矩区分氧化态。

#### 🎯 核心要点
- 核心动机：引入磁矩区分氧化态
- 演化来源：继承或改进自 m3gnet
- 代表机构：Berkeley

#### 🔬 深入细节
引入磁矩区分氧化态


### Orb

```yaml
id: orb
num: 18
name: Orb
full_name: 轨道力场 (Orbital Force Field)
year: '2024'
org: Orbital Materials
parent: mace
paper_url: https://arxiv.org/abs/2410.22570
project_url: ''
category: mlip
motivation: 比GNoME快3-6倍误差降31%
```

#### 📝 一句话总结
Orb 提出了一种基于图网络模拟器（GNS）与平滑图注意力机制的非等变通用原子间势（UIP），结合去噪扩散预训练策略，在 Matbench Discovery 基准上以 F1=0.88 刷新开源 SOTA，同时推理速度比 MACE 快 3–6 倍，为大规模材料模拟提供了精度与效率兼备的解决方案。

#### 🎯 核心要点
- **非等变架构设计**：放弃等变约束，采用 GNS 架构通过数据增强学习旋转/平移不变性，大幅提升 GPU 利用率与推理速度
- **平滑图注意力（Smoothed Attention）**：将 softmax 注意力权重乘以距离衰减包络函数，消除原子进出截断半径时的力不连续性
- **两阶段训练**：Phase 1 在大规模晶体结构上做去噪扩散预训练；Phase 2 在 DFT 轨迹数据上有监督微调能量/力/应力
- **力守恒后处理**：通过 Lagrangian 约束优化对预测力施加净力为零和净力矩为零的修正，保证物理一致性
- **D3 色散校正摊销**：将 D3 长程色散校正预计算并加入训练数据，避免推理时 \(O(n^2)\) 的额外开销
- **数据集**：预训练使用跨多个数据库的基态材料结构；微调使用 MPtraj + Alexandria（均为 PBE 泛函 + VASP）
- **开源 Apache 2.0 许可**：模型权重与代码完全开放

#### 🔬 深入细节
##### 模型架构总览

![Orb 模型架构图](https://arxiv.org/html/2410.22570v2/x1.png)
*图：Orb 模型架构示意。左侧为图构建与消息传递流程，右侧为平滑注意力机制与力守恒后处理的细节。*

Orb 的核心架构基于 **Graph Network Simulator (GNS)**，这是一种在粒子模拟领域已被验证的图神经网络框架。与当前主流的等变神经网络势（如 MACE、NequIP）不同，Orb 刻意选择了**非等变**设计路线——不在网络结构中硬编码旋转等变性，而是通过随机旋转数据增强让模型从数据中学习这些对称性。

> 💡 **关键洞察**：等变架构虽然在数据效率上有优势，但其所依赖的球谐张量运算（如 Clebsch-Gordan 乘积）在 GPU 上的并行效率较低。Orb 的非等变设计使其能充分利用 GPU 的密集矩阵运算能力，在大系统上实现 3–6 倍的速度优势。

##### 图构建与特征化

给定一个原子系统，Orb 构建一个有向图 \(\mathcal{G} = (\mathcal{V}, \mathcal{E})\)：

- **节点** \(\mathcal{V}\)：每个原子 \(i\) 对应一个节点，初始特征为原子序数的可学习嵌入向量 \(\mathbf{h}_i^{(0)} \in \mathbb{R}^{128}\)
- **边** \(\mathcal{E}\)：在截断半径 \(r_c = 10\) Å 内的所有原子对 \((i, j)\) 之间建立有向边
- **边特征**：由两部分拼接而成：
  1. 原子间距离 \(r_{ij}\) 的径向基函数（RBF）展开
  2. 周期性边界条件下的晶胞偏移向量 \(\mathbf{k}_{ij}\) 的 one-hot 编码

##### 消息传递与平滑注意力

Orb 使用 **10 层 GNS 消息传递块**，每层包含：

1. **边更新**：融合发送节点、接收节点和边特征
2. **注意力聚合**：使用平滑图注意力进行邻居信息聚合
3. **节点更新**：通过 MLP 更新节点表示

**平滑注意力机制**是 Orb 的核心创新之一。标准 softmax 注意力在原子进出截断半径时会产生不连续的权重跳变，导致预测力出现非物理的不连续性。Orb 的解决方案是将注意力权重乘以一个距离衰减包络函数：

$$\alpha_{ij}^{\text{smooth}} = \alpha_{ij}^{\text{softmax}} \cdot u(r_{ij})$$

其中 \(u(r_{ij})\) 是一个在截断半径处平滑衰减到零的包络函数（如余弦衰减），\(\alpha_{ij}^{\text{softmax}}\) 是带有可学习温度参数 \(\tau\) 的标准 softmax 注意力权重：

$$\alpha_{ij}^{\text{softmax}} = \frac{\exp(\mathbf{q}_i \cdot \mathbf{k}_j / \tau)}{\sum_{j' \in \mathcal{N}(i)} \exp(\mathbf{q}_i \cdot \mathbf{k}_{j'} / \tau)}$$

> ⚠️ **注意**：仅使用包络函数（如 DimeNet 中的做法）而不结合注意力会导致远处原子的贡献过小；仅使用 softmax 注意力则会在截断边界处产生力的不连续。Orb 的平滑注意力巧妙地结合了两者的优点。

##### 输出头与力守恒

经过 10 层消息传递后，Orb 使用三个独立的 MLP 输出头：

- **能量头**：对所有节点特征求和后通过 MLP 输出标量能量 \(E\)
- **力头**：直接从节点特征通过 MLP 预测每个原子的三维力向量 \(\mathbf{f}_i\)
- **应力头**：从图级特征预测 \(3 \times 3\) 应力张量 \(\boldsymbol{\sigma}\)

由于力是直接预测而非通过能量的负梯度计算，预测的力不自动满足牛顿第三定律。Orb 通过**后处理校正**来恢复物理守恒律：

1. **净力消除**：计算所有原子预测力的均值并减去，确保 \(\sum_i \tilde{\mathbf{f}}_i = 0\)
2. **净力矩消除**：通过求解一个带约束的 Lagrangian 优化问题，找到最小 L2 范数的力修正 \(\delta\mathbf{f}_i\)，使得修正后的力既满足零净力又满足零净力矩

最终预测力为：

$$\tilde{\mathbf{f}}_i^{\text{pred}} = \hat{\mathbf{f}}_i + \delta\mathbf{f}_i$$

##### 算法伪代码：两阶段训练流程

```python
# ===== Phase 1: 去噪扩散预训练 =====
# 数据: 大规模基态晶体结构 (仅需原子位置和晶胞)
for epoch in pretraining_epochs:
    for x0 in ground_state_structures:
        t = sample_timestep()           # 采样噪声时间步
        eps = sample_noise()            # 采样高斯噪声
        x_t = x0 + sigma_t * eps       # 前向扩散加噪
        eps_pred = model(x_t, t)        # 模型预测噪声
        loss = ||eps_pred - eps||^2     # epsilon 预测损失
        optimizer.step(loss)

# ===== Phase 2: NNP 有监督微调 =====
# 数据: DFT 优化轨迹 (MPtraj + Alexandria)
model = load_pretrained_diffusion_model()
for epoch in finetuning_epochs:
    for batch in dft_trajectories:
        E_pred, f_pred, sigma_pred = model(batch)
        # 能量损失 (per-atom MAE, 减去参考能量)
        L_E = |E_pred - (E_true - E_ref) / N|
        # 力损失 (MAE over all atoms in batch)
        L_f = (1/3N) * sum(||f_pred_i - f_true_i||_1)
        # 应力损失
        L_sigma = MAE(sigma_pred, sigma_true)
        # 总损失
        L_total = lambda_E * L_E + L_f + L_sigma
        optimizer.step(L_total)
```

##### 动机与背景：为什么需要 Orb？

通用原子间势（Universal Interatomic Potentials, UIPs）旨在用单一模型替代传统的密度泛函理论（DFT）计算，以数量级的速度提升实现接近 DFT 精度的原子模拟。然而，现有的 UIP 面临两个核心挑战：

1. **精度瓶颈**：早期模型（如 M3GNet、CHGNet）在 Matbench Discovery 等严格基准上的 F1 分数仅为 0.57–0.61，距离实用化仍有差距
2. **速度瓶颈**：高精度的等变模型（如 MACE）依赖球谐张量运算，在大系统上的 GPU 利用率低，限制了可模拟的系统规模

Orb 通过非等变架构设计同时解决了这两个问题：放弃等变约束换取 GPU 友好的密集运算，同时通过扩散预训练和高质量数据策划来弥补数据效率的损失。

##### 扩散预训练的作用

扩散预训练是 Orb 的另一核心创新。其动机在于：

- **数据兼容性**：预训练仅需原子位置和晶胞信息，不需要能量/力等标签，因此可以混合使用不同 DFT 泛函、不同软件产生的数据
- **广覆盖性**：预训练数据集覆盖了广泛的原子类型、材料类别和对称群
- **训练稳定性**：实验表明，扩散预训练不仅降低了 17%–70% 的力场误差，还显著减少了训练过程中的过平滑（oversmoothing）现象

##### 与传统方法的对比

| 特性 | 等变模型 (MACE/NequIP) | Orb (非等变) |
|------|----------------------|-------------|
| 对称性处理 | 架构内置等变性 | 数据增强学习不变性 |
| 核心运算 | 球谐张量积 (Clebsch-Gordan) | 标准矩阵乘法 + 注意力 |
| GPU 利用率 | 较低（稀疏运算） | 高（密集运算） |
| 力计算 | 能量负梯度（自动守恒） | 直接预测 + 后处理校正 |
| 大系统速度 | 基准 | 3–6× 更快 |
| 数据效率 | 较高 | 通过预训练弥补 |

##### 实验结果亮点

**Matbench Discovery**（Table 1）：Orb 以 F1=0.880 大幅领先所有开源模型（此前最佳 SevenNet 为 0.724），精度（Precision=0.923）尤其突出，意味着极低的假阳性率——在实际材料筛选中，这可以避免大量无效的实验验证。

**速度基准**（Figure 3）：在单张 NVIDIA A100 GPU 上，Orb 的前向传播速度在大系统（>1000 原子）时比 MACE 快 3–6 倍。此外，通过将 D3 色散校正摊销到训练数据中，Orb 避免了推理时 \(O(n^2)\) 的 D3 计算开销。

**MD17 分子动力学**（Table 2）：在分子特异性微调设置下，Orb 在所有 4 个分子上均达到最大稳定性（300 ps），h(r) 指标与 NequIP 相当。在零样本设置下（仅用晶体数据训练），Orb 也展现出对非周期分子体系的良好泛化能力。

#### 🧪 练习题
```yaml
question: "Orb 模型使用平滑注意力机制的主要目的是什么？"
options:
  - "提高模型在小分子上的预测精度"
  - "消除原子进出截断半径时预测力的不连续性"
  - "减少消息传递层数以加速推理"
  - "替代径向基函数实现更好的距离编码"
answer: 1
explain: "标准 softmax 注意力在截断半径边界处会产生权重跳变，导致力的不连续。平滑注意力通过乘以距离衰减包络函数，确保边界处权重平滑过渡到零，从而保证力的连续性。"
```

### eSEN

```yaml
id: esen
num: 19
name: eSEN
full_name: 等变光滑能量网络 (equivariant Smooth Energy Network)
year: '2025'
org: Meta FAIR
parent: mace
paper_url: https://arxiv.org/abs/2502.12147
project_url: ''
category: mlip
motivation: 光滑势能面确保长程能量守恒
```

#### 📝 一句话总结
eSEN 的核心目标是：光滑势能面确保长程能量守恒。

#### 🎯 核心要点
- 核心动机：光滑势能面确保长程能量守恒
- 演化来源：继承或改进自 mace
- 代表机构：Meta FAIR

#### 🔬 深入细节
光滑势能面确保长程能量守恒


### matminer

```yaml
id: matminer
num: 20
name: matminer
full_name: 材料数据挖掘工具 (Materials Data Miner)
year: '2018'
org: LBNL
parent: —
paper_url: https://doi.org/10.1016/j.commatsci.2018.05.018
project_url: ''
category: property_prediction
motivation: 70+特征提取器的标准工具
```

#### 📝 一句话总结
matminer 的核心目标是：70+特征提取器的标准工具。

#### 🎯 核心要点
- 核心动机：70+特征提取器的标准工具
- 代表机构：LBNL

#### 🔬 深入细节
70+特征提取器的标准工具


### MODNet

```yaml
id: modnet
num: 21
name: MODNet
full_name: 材料最优描述符网络 (Materials Optimal Descriptor Network)
year: '2021'
org: UCLouvain
parent: matminer
paper_url: https://doi.org/10.1038/s41524-021-00552-2
project_url: ''
category: property_prediction
motivation: 小样本数据集优化预测
```

#### 📝 一句话总结
MODNet 提出了一种基于**归一化互信息 (NMI) 的最优特征选择**与**树形神经网络联合学习**的材料属性预测框架，在小样本数据集（<4000 样本）上显著优于图神经网络等端到端方法，实现了振动熵预测误差比先前最优结果低 4 倍的精度。

#### 🎯 核心要点
- **三大支柱**：(1) 基于 matminer 的物理特征工程（~1500 维描述符）；(2) NMI 驱动的特征选择算法（MOD-selection）；(3) 树形前馈神经网络的多属性联合学习
- **特征选择核心**：定义 Relevance-Redundancy (RR) 评分，在最大化特征-目标相关性的同时最小化已选特征间的冗余，公式为 \( \text{RR}(f) = \frac{\text{NMI}(f, y)}{[\max_{f_s} \text{NMI}(f, f_s)]^p + c} \)
- **归一化互信息 (NMI)**：采用 \( \text{NMI}(X,Y) = \frac{2 \cdot \text{MI}(X,Y)}{H(X) + H(Y)} \) 捕捉非线性依赖关系，优于 Pearson 相关系数
- **树形架构联合学习**：共享层 → 分组层 → 属性专用层，多目标联合训练提供 ~8% 精度提升
- **小样本优势**：在 ~1200 样本的振动热力学数据集上，MAE = 8.9 μeV/K/atom（比 Legrain 等人低 4 倍，比 Tawfik 等人低 25 倍）
- **可解释性**：特征选择保留了物理可解释的输入空间，可揭示属性背后的关键物理因素（如振动熵与键长、离子性的关系）
- **基准对比**：在小数据集上优于 MEGNet、CGCNN 等图网络；在大数据集（>10k）上图网络仍有优势，确立了 ~4000 样本的方法边界

#### 🔬 深入细节
![MODNet 框架总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00552-2/MediaObjects/41524_2021_552_Fig1_HTML.png)
*图 1：MODNet 框架总览 — 从结构/组成出发，经 matminer 特征化、NMI 特征选择，到前馈神经网络预测*

![MODNet 树形架构](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41524-021-00552-2/MediaObjects/41524_2021_552_Fig6_HTML.png)
*图 6：MODNet 用于振动属性预测的树形架构 — 四个层级块（共享→分组→子组→属性），实现多目标联合学习*

##### 算法伪代码

```python
# === MODNet 完整流程伪代码 ===

# 第一阶段：特征工程
features = matminer.featurize(structures)  # ~1500 维物理描述符
# 包含: 组成特征(元素统计)、结构特征(键长/配位数/AGNI指纹)、电子特征(价电子统计)等

# 第二阶段：NMI 特征选择 (MOD-selection)
nmi_matrix = compute_pairwise_NMI(features, target)  # NMI(X,Y) = 2*MI(X,Y)/(H(X)+H(Y))
selected = []
for i in range(n_optimal_features):  # 通常 ~300
    for f in remaining_features:
        relevance = nmi_matrix[f, target]
        redundancy = max(nmi_matrix[f, fs] for fs in selected) if selected else 0
        RR[f] = relevance / (redundancy ** p + c)  # p ∈ [0,3], c 为小常数
    best = argmax(RR)
    selected.append(best)

# 第三阶段：树形神经网络训练
# 架构: [256共享] → [128分组] → [64子组] → [8属性专用] → 输出
model = TreeNN(
    shared_block=[256, 256],        # 所有属性共享
    group_block=[128, 128],         # 按属性组分裂 (如: 热力学 vs 形成能)
    subgroup_block=[64, 64],        # 子组分裂 (如: 熵/焓 vs 比热/自由能)
    property_block=[8, 8]           # 每个属性独立
)
optimizer = Adam(lr=0.01, beta1=0.9, beta2=0.999)
for epoch in range(600):
    for batch in dataloader(batch_size=256):
        X = batch[selected_features]
        X = min_max_normalize(X)
        preds = model(X)  # 同时预测多个属性
        loss = sum(w_i * MSE(preds[i], targets[i]) for i in properties)
        loss.backward()
        optimizer.step()
```

##### 动机与背景

材料属性预测是计算材料科学的核心任务。传统的第一性原理方法（如 DFT、DFPT）虽然精确，但计算成本极高——例如计算一个材料的振动热力学属性需要数百 CPU 小时。机器学习方法可以将预测速度提升数个数量级，但面临两大挑战：

1. **小样本困境**：许多高精度计算数据集仅包含数百到数千个样本（如振动热力学仅 1245 个化合物），远小于图像或 NLP 领域的数据规模。端到端的图神经网络（如 MEGNet、CGCNN）在大数据集上表现优异，但在小数据集上容易过拟合。

2. **维度灾难**：matminer 等工具可生成 ~1500 维的物理描述符，但在小样本下，大量不相关特征会引入噪声，降低模型泛化能力。

> 💡 **关键洞察**：MODNet 的核心思想是——在数据稀缺时，利用领域知识（物理特征）+ 智能特征选择 + 多任务联合学习，比端到端学习更有效。

##### 核心机制一：NMI 驱动的特征选择

MODNet 的特征选择算法（MOD-selection）基于最大相关-最小冗余（mRMR）的思想，但使用归一化互信息（NMI）替代传统的 Pearson 相关系数，以捕捉非线性依赖关系。

**归一化互信息定义**：

$$\text{NMI}(X, Y) = \frac{2 \cdot \text{MI}(X, Y)}{H(X) + H(Y)}$$

其中 \(\text{MI}(X,Y) = H(X) + H(Y) - H(X,Y)\) 为互信息，\(H(\cdot)\) 为 Shannon 熵。NMI 的值域为 \([0, 1]\)，1 表示完全依赖，0 表示独立。

**Relevance-Redundancy (RR) 评分**：

$$\text{RR}(f) = \frac{\text{NMI}(f, y)}{\left[\max_{f_s \in \mathcal{S}} \text{NMI}(f, f_s)\right]^p + c}$$

- 分子 \(\text{NMI}(f, y)\)：特征 \(f\) 与目标 \(y\) 的相关性（**相关性项**）
- 分母 \(\max_{f_s} \text{NMI}(f, f_s)\)：特征 \(f\) 与已选特征集 \(\mathcal{S}\) 中最相似特征的 NMI（**冗余惩罚项**）
- 超参数 \(p \in [0, 3]\)：控制冗余惩罚强度；\(c\) 为小常数防止除零

> ⚠️ **与 SISSO 的区别**：SISSO 通过压缩感知在巨大的特征组合空间中搜索最优低维描述符，计算量随特征数指数增长，实际限制在 ~10 个特征。MOD-selection 的贪心策略可线性扩展到数百个特征，更适合神经网络的高维输入需求。

**实验验证**：在振动熵预测任务中，MOD-selection 在 200 个训练样本时带来 ~12% 的误差降低；在 1000 个样本时仍有 ~5% 的提升。与 Pearson 相关、RF 重要性、SISSO、OMP 等方法对比，MOD-selection 在需要选择 >10 个特征时表现最优。

##### 核心机制二：树形神经网络联合学习

MODNet 的另一核心创新是将多属性预测组织为**树形架构**，利用属性间的相似性实现联合迁移学习。

**架构设计原则**：
- 相似属性共享更多层（如不同温度下的振动熵），不相似属性在更早的层分裂
- 属性间的"架构距离"（分隔的层数和神经元数）决定了联合学习的程度
- 距离太小 → 不同属性被迫共享不合适的表示；距离太大 → 退化为独立模型，失去联合学习的优势

**具体架构（振动属性预测）**：

```
输入 (300 特征)
    │
    ├── Block 1: [256, 256] ← 所有属性共享
    │
    ├── Block 2: [128, 128] ← 按属性组分裂
    │   ├── 组A: 熵 + 焓
    │   └── 组B: 比热 + 自由能
    │
    ├── Block 3: [64, 64] ← 子组分裂
    │   ├── 熵
    │   ├── 焓
    │   ├── 比热
    │   └── 自由能
    │
    └── Block 4: [8, 8] → 各属性独立输出
```

属性分组依据 NMI 相似性：先计算所有目标属性对之间的 NMI，相似属性分入同一组。例如，振动熵与焓在物理上更相关（都与声子态密度的低阶矩相关），因此共享更多层。

**联合学习的增益**：在振动熵预测上，m-MODNet（多属性）比单属性 MODNet 提供 ~8% 的 MAE 降低，且在训练样本越少时增益越明显。

> 💡 **直觉理解**：联合学习的本质是正则化——通过强制不同属性共享底层表示，减少了模型的有效自由度，从而在小样本下获得更好的泛化。

##### 核心机制三：物理特征工程

MODNet 使用 matminer 库生成约 1500 维的物理描述符，涵盖：

| 特征类别 | 示例 | 数量 |
|---------|------|------|
| 组成特征 | 元素统计（原子量、电负性、价电子数的均值/方差/范围等） | ~200 |
| 结构特征 | 键长、配位数、AGNI 指纹、Voronoi 多面体特征 | ~800 |
| 电子特征 | 价电子分布、轨道统计 | ~300 |
| 其他 | 密度、体积、空间群特征 | ~200 |

这些特征编码了丰富的物理先验知识。例如，AGNI 指纹（Adaptive Generalized Neighborhood Informatics）提供了键长倒数的度量，被发现是振动熵的最重要预测因子——键长越长，振动熵越高，这与物理直觉完全一致。

##### 与传统方法的对比

| 方法 | 特征来源 | 小样本性能 | 大样本性能 | 可解释性 | 多属性 |
|------|---------|-----------|-----------|---------|--------|
| **MODNet** | 物理描述符 + 选择 | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ✅ |
| MEGNet | 图表示端到端学习 | ⭐ | ⭐⭐⭐ | ⭐ | ❌ |
| CGCNN | 图表示端到端学习 | ⭐ | ⭐⭐⭐ | ⭐ | ❌ |
| SISSO | 压缩感知解析公式 | ⭐⭐ | ⭐ | ⭐⭐⭐ | 有限 |
| RF + matminer | 物理描述符 + 全部 | ⭐⭐ | ⭐⭐ | ⭐⭐ | ❌ |

论文通过系统实验确立了一个重要的**方法边界**：在 ~4000 样本以下，基于物理特征的 MODNet 优于图网络；在更大数据集上，图网络的端到端学习能力占优。这一发现为实践者选择方法提供了明确指导。

**关键基准结果**：
- 振动熵 \(S_{305K}\)：MAE = 8.9 μeV/K/atom（RMSE = 12.0），测试集 145 个材料
- 形成能（MP 69k）：MAE = 0.044 eV/atom（与 MEGNet 的 0.028 相比，大数据集上图网络更优）
- 带隙（MP 69k）：MAE = 0.34 eV
- 折射率（4040 样本）：MAE = 0.05

#### 🧪 练习题
```yaml
question: "MODNet 特征选择算法 (MOD-selection) 中 RR 评分的分母设计目的是什么？"
options:
  - "增加特征与目标属性的相关性权重"
  - "惩罚与已选特征高度冗余的候选特征，确保互补性"
  - "对特征进行归一化以消除量纲差异"
  - "限制神经网络的输入维度以加速训练"
answer: 1
explain: "RR 评分的分母为候选特征与已选特征集中最相似特征的 NMI 的 p 次方，当候选特征与已选特征高度冗余时分母增大、RR 降低，从而优先选择互补性强的特征。"
```

### AnisoNet

```yaml
id: anisonet
num: 22
name: AnisoNet
full_name: 各向异性网络 (Anisotropic Network)
year: '2025'
org: 多机构
parent: equiformer
paper_url: https://pubs.rsc.org/en/content/articlehtml/2024/fd/d4fd00096j
project_url: ''
category: property_prediction
motivation: 完整介电张量预测
```

#### 📝 一句话总结
AnisoNet 提出了一种基于球谐函数不可约表示（\(0_e + 2_e\)）的等变图神经网络，直接预测晶体材料的完整介电张量而非标量值，通过等变约束保证输出自动满足晶体点群对称性，并成功筛选出 137 种具有高各向异性的新型介电材料。

#### 🎯 核心要点
- **等变输出设计**：将 3×3 对称介电张量分解为不可约表示 \(0_e + 2_e\)（1 个标量 + 5 个对称无迹张量分量），模型输出天然满足晶体对称性约束
- **消息传递架构**：基于 e3nn 库的等变消息传递网络，利用 Clebsch-Gordon 系数控制球谐特征的张量积交互，最优 \(l_{\max} = 3\)
- **各向异性比指标**：定义 \(a_r = \varepsilon_{\max} / \varepsilon_{\min}\)（介电张量最大/最小特征值之比）量化各向异性程度
- **数据集**：基于 Materials Project 的 6706 条 DFPT 高频介电张量数据，按 8:1:1 划分训练/验证/测试集
- **性能**：多晶介电常数 MAE = 0.311（误差 6.6%），各向异性比 MAE = 0.078（误差 5.96%）
- **等变 vs 标量模型对比**：标量模型（6×0_e）在各向异性比上 MAE 为 0.147，几乎是等变模型的 2 倍；立方晶系下等变模型误差严格为零
- **高通量筛选**：对 Materials Project 中 18835 个未计算结构进行预测，筛选出 137 种 \(a_r > 2.5\) 的候选材料，经 DFPT 验证 95% 以上 \(a_r > 2\)

#### 🔬 深入细节
##### 核心架构示意图

![AnisoNet 工作流程总览](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f1.gif)
*图 1：AnisoNet 工作流程——从晶体结构到介电张量预测再到高通量材料筛选*

![介电张量不可约分解](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f2.gif)
*图 2：介电张量分解为不可约表示 \(0_e + 2_e\)，标量部分对应多晶平均值，\(l=2\) 部分编码各向异性信息*

![AnisoNet 模型架构](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f3.gif)
*图 3：AnisoNet 等变消息传递网络架构，输入为原子图（节点=原子，边=键），输出为介电张量的不可约表示*

##### 算法核心逻辑

```python
# AnisoNet 核心流程伪代码
# 1. 图构建：晶体结构 → 原子图（截断半径 5Å）
graph = build_graph(crystal_structure, cutoff=5.0)
# 节点特征：原子序数的 one-hot 嵌入
# 边特征：球谐函数 Y_l^m(r_ij) 编码方向信息

# 2. 等变消息传递（T 步）
for t in range(T):
    for node_i in graph.nodes:
        # 张量积消息聚合（公式 2）
        messages = sum(
            CG_coeff * R(||r_ij||) * Y(r_ij) ⊗ h_j
            for j in neighbors(i)
        )
        h_i = update(h_i, messages)
    if t < T - 1:
        h = gated_nonlinearity(h)  # 门控非线性
    # 最后一步仅保留 l=0 和 l=2 特征

# 3. 全局池化 → 不可约表示输出
output = (1/N) * sum(h_i for i in graph.nodes)  # 0_e + 2_e

# 4. 重构介电张量
epsilon = reconstruct_tensor(output)  # 从不可约表示恢复 3×3 张量
```

##### 动机与背景

晶体材料的介电响应本质上是**张量性质**——不同晶轴方向的介电常数可以显著不同。这种各向异性对于光纤传感器、双折射光学器件、暗物质探测器等应用至关重要。然而，现有的机器学习方法（如 MatBench 排行榜上的所有模型）仅预测标量多晶介电常数，完全丢失了方向信息。

传统方法的核心缺陷在于：(1) 标量模型无法捕获各向异性；(2) 即使预测 6 个独立张量分量，也无法保证输出满足晶体对称性——例如，立方晶系的介电张量必须是各向同性的（三个特征值相等），但标量模型可能给出不等的预测值。

> 💡 **关键洞察**：对称实 3×3 张量可以分解为球谐不可约表示 \(0_e + 2_e\)，其中 \(0_e\) 是标量（多晶平均值的 \(\sqrt{3}\) 倍），\(2_e\) 是 5 维对称无迹张量（编码各向异性）。等变网络天然保证：如果输入结构具有立方对称性，则 \(2_e\) 分量**必须为零**。

##### 等变消息传递机制

AnisoNet 的核心是基于球谐函数的等变消息传递。每个消息传递步骤中，节点特征通过**广义张量积**更新：

$$x_{i,cm}^{(t+1),l} = \sum_{l_1, l_2} C_{l_1 l_2}^{l} \sum_{j \in \mathcal{N}(i)} R_{c}^{l_1 l_2 l}(\|\mathbf{r}_{ij}\|) \sum_{m_1, m_2} C_{m_1 m_2 m}^{l_1 l_2 l} \, x_{j,cm_1}^{(t),l_1} \, Y_{m_2}^{l_2}(\hat{\mathbf{r}}_{ij})$$

其中：
- \(C_{l_1 l_2}^{l}\) 和 \(C_{m_1 m_2 m}^{l_1 l_2 l}\) 是 **Clebsch-Gordon 系数**，决定两个球谐特征是否具有正确的对称性进行交互（不满足时系数为零）
- \(R(\|\mathbf{r}_{ij}\|)\) 是作用于边长径向基投影的**可学习 MLP**
- \(Y_{m}^{l}(\hat{\mathbf{r}}_{ij})\) 是边方向的**球谐基函数**，编码角度信息
- 张量积操作等价于两个向量的外积后进行 Wigner 分解，保证旋转等变性

> ⚠️ **注意**：在除最后一步外的所有消息传递步骤中，使用**门控非线性**：标量特征通过 ReLU，张量特征由一个额外的标量特征（经 ReLU 后）进行缩放。这种设计保持了等变性，因为标量缩放不破坏旋转对称性。

最终步骤仅使用 \(l = 0\) 和 \(l = 2\) 特征构建输出，而中间步骤使用所有 \(l \leq l_{\max}\) 的特征。全局池化通过简单平均实现：

$$\mathbf{o} = \frac{1}{N} \sum_{i=1}^{N} x_i^{(T)}$$

##### 等变性的关键优势

论文通过系统对比实验揭示了等变性的核心价值：

| 指标 | 等变模型 (\(0_e + 2_e\)) | 标量模型 (\(6 \times 0_e\)) | 改进幅度 |
|------|:---:|:---:|:---:|
| \(\varepsilon_{\text{poly}}\) MAE | **0.311** | 0.336 | 7.4% |
| \(a_r\) MAE | **0.078** | 0.147 | 46.9% |
| 立方晶系 \(a_r\) MAE | **0.000** | 0.108 | 100% |

![多晶介电常数预测性能](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f4.gif)
*图 4：(a) 等变模型预测 vs DFPT 参考值热力图；(b) 等变与标量模型在不同晶系上的 MAE 对比*

![各向异性比预测性能](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f5.gif)
*图 5：各向异性比 \(a_r\) 预测性能——等变模型在所有晶系上均优于标量模型，差距在低对称晶系中更为显著*

关键发现：
- 对于**标量性质**（多晶介电常数），等变性的贡献较小（~8%），因为不变特征（组成、键长）已足够
- 对于**张量性质**（各向异性比），等变性至关重要（~58% 平均改进），因为方向信息必须被正确编码
- \(l_{\max} \geq 2\) 是等变模型良好性能的必要条件，这与输出包含 \(l = 2\) 分量一致

##### 高通量材料发现

AnisoNet 被应用于 Materials Project 中 18835 个未计算结构的筛选，筛选条件包括：能量高于凸包 < 50 meV/atom、带隙 > 0.5 eV、单胞原子数 < 40 等。

![发现的高各向异性材料](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f6.gif)
*图 6：(a) 各向异性比与结构维度的关系——2D 和 1D 材料各向异性最强；(b) 新发现材料 vs 训练集的 \(a_r\) 分布*

![代表性材料的晶体结构与光吸收谱](https://pubs.rsc.org/image/article/2025/FD/d4fd00096j/d4fd00096j-f7.gif)
*图 7：代表性高各向异性材料——NaV₂O₄（\(a_r = 7.74\)，最高）展现巨大的光吸收各向异性*

关键发现：
- 137 个候选材料中 95% 以上经 DFPT 验证 \(a_r > 2\)，平均 \(a_r = 3.9\)（训练集平均仅 1.2）
- 80% 的高各向异性材料为 2D 或准 2D 结构（主要是含 W/Mo 的过渡金属二硫化物）
- NaV₂O₄ 具有最高 \(a_r = 7.74\)，其 VO₆ 八面体层间由 Na⁺ 分隔，平行于层的方向吸收系数达 \(10^5\) cm⁻¹，而垂直方向接近零

##### 局限性与未来方向

- **截断半径限制**：5 Å 的截断半径无法捕获大层间距的范德华材料中的长程相互作用
- **仅限高频介电张量**：未包含离子贡献，而高-κ 介电体的大介电响应往往由离子贡献主导
- **数据不平衡**：训练集中 \(\varepsilon > 10\) 的样本不足 5%，导致高介电常数区域预测偏差较大
- **候选材料验证**：部分顶级候选（如 Ba₂Cu₂O₅）为假设化合物，需进一步评估可合成性和动力学稳定性

#### 🧪 练习题
```yaml
question: "AnisoNet 将介电张量输出设计为不可约表示 0_e + 2_e 的主要优势是什么？"
options:
  - "减少模型参数量，加快训练速度"
  - "保证输出张量自动满足输入晶体结构的点群对称性"
  - "提高多晶介电常数的预测精度"
  - "使模型能够预测频率依赖的介电响应"
answer: 1
explain: "等变不可约表示输出确保了 Neumann 原理的自动满足——例如立方晶系输入必然产生各向同性输出（2_e 分量为零），消除了标量模型可能产生的非物理张量。"
```

### E²GNN

```yaml
id: e2gnn
num: 23
name: E²GNN
full_name: 高效等变图神经网络 (Efficient Equivariant Graph NN)
year: '2025'
org: 多机构
parent: equiformer
paper_url: https://www.nature.com/articles/s41524-025-01535-3
project_url: ''
category: property_prediction
motivation: 平衡精度与效率的等变设计
```

#### 📝 一句话总结
E²GNN 的核心目标是：平衡精度与效率的等变设计。

#### 🎯 核心要点
- 核心动机：平衡精度与效率的等变设计
- 演化来源：继承或改进自 equiformer
- 代表机构：多机构

#### 🔬 深入细节
平衡精度与效率的等变设计


### GNoME

```yaml
id: gnome
num: 24
name: GNoME
full_name: 图网络材料探索 (Graph Networks for Materials Exploration)
year: '2023'
org: DeepMind
parent: m3gnet
paper_url: https://www.nature.com/articles/s41586-023-06735-9
project_url: ''
category: foundation_model
motivation: 主动学习发现220万新晶体
```

#### 📝 一句话总结
GNoME 的核心目标是：主动学习发现220万新晶体。

#### 🎯 核心要点
- 核心动机：主动学习发现220万新晶体
- 演化来源：继承或改进自 m3gnet
- 代表机构：DeepMind

#### 🔬 深入细节
主动学习发现220万新晶体


### CrystaLLM

```yaml
id: crystallm
num: 25
name: CrystaLLM
full_name: 晶体语言模型 (Crystal Language Model)
year: '2024'
org: UCL
parent: —
paper_url: https://www.nature.com/articles/s41467-024-54639-7
project_url: ''
category: foundation_model
motivation: CIF作为语言的生成式模型
```

#### 📝 一句话总结
CrystaLLM 的核心目标是：CIF作为语言的生成式模型。

#### 🎯 核心要点
- 核心动机：CIF作为语言的生成式模型
- 代表机构：UCL

#### 🔬 深入细节
CIF作为语言的生成式模型


### MatLLMSearch

```yaml
id: matllmsearch
num: 26
name: MatLLMSearch
full_name: 材料LLM搜索 (Materials LLM Search)
year: '2025'
org: 多机构
parent: crystallm
paper_url: https://arxiv.org/abs/2502.20933
project_url: ''
category: foundation_model
motivation: LLM作为智能提案代理
```

#### 📝 一句话总结
MatLLMSearch 的核心目标是：LLM作为智能提案代理。

#### 🎯 核心要点
- 核心动机：LLM作为智能提案代理
- 演化来源：继承或改进自 crystallm
- 代表机构：多机构

#### 🔬 深入细节
LLM作为智能提案代理


### MatterSim-MT

```yaml
id: mattersim_mt
num: 27
name: MatterSim-MT
full_name: 材料模拟多任务模型 (MatterSim Multi-Task)
year: '2026'
org: Microsoft
parent: chgnet
paper_url: https://www.microsoft.com/en-us/research/blog/mattersim-updates-experimental-validation-faster-simulation-and-a-new-multi-task-model/
project_url: ''
category: foundation_model
motivation: 3500万结构多任务基础模型
```

#### 📝 一句话总结
MatterSim-MT 的核心目标是：3500万结构多任务基础模型。

#### 🎯 核心要点
- 核心动机：3500万结构多任务基础模型
- 演化来源：继承或改进自 chgnet
- 代表机构：Microsoft

#### 🔬 深入细节
3500万结构多任务基础模型


### LLEMA

```yaml
id: llema
num: 28
name: LLEMA
full_name: LLM引导材料演化 (LLM-guided Evolution for Materials)
year: '2026'
org: 多机构
parent: matllmsearch
paper_url: https://arxiv.org/abs/2603.05123
project_url: ''
category: foundation_model
motivation: LLM引导演化多目标发现
```

#### 📝 一句话总结
LLEMA 的核心目标是：LLM引导演化多目标发现。

#### 🎯 核心要点
- 核心动机：LLM引导演化多目标发现
- 演化来源：继承或改进自 matllmsearch
- 代表机构：多机构

#### 🔬 深入细节
LLM引导演化多目标发现
