### HelixADMET：基于自监督预训练的多阶段ADMET预测系统

```yaml
id: helixadmet
name: "HelixADMET"
year: 2022
org: "Baidu Research"
category: admet
parent: admetlab
paper_url: "https://arxiv.org/abs/2205.08055"
doi: "10.1093/bioinformatics/btac342"
motivation: "自监督学习+多阶段迁移学习，在可比端点上精度提升约4-7%"
```

---

## 一句话总结

HelixADMET 通过**三阶段迁移学习框架**（自监督预训练 → 多任务监督学习 → 单任务微调）训练图神经网络，在 52 个 ADMET 端点上实现平均 AUC 0.898，较现有系统 admetSAR 2.0 和 ADMETlab 2.0 分别提升约 7% 和 4.8%。

---

## 核心要点

1. **三阶段训练框架**：Stage 1 利用约 2000 万无标签分子进行自监督预训练（节点/几何/图级任务）；Stage 2 在约 50 万标注数据上进行多任务监督学习（36 个 ADMET 端点 + 辅助生物活性任务，与 SSL 任务联合训练）；Stage 3 对每个端点单独微调（学习率降低 10 倍）。

2. **多层次自监督任务**：
   - **节点/边级**：随机掩码子图中的原子/键属性并预测（类似 BERT 的 Masked Language Model）
   - **几何级**：预测键长和键角的分布（离散化为分类任务）
   - **图级**：预测分子指纹（ECFP 和 MACCS）

3. **52 个端点覆盖 7 大类别**：理化性质（LogP/LogS/LogD/pKa）、药物化学（Lipinski/QED/SA）、吸收（Caco-2/Pgp/口服生物利用度）、分布（BBB/PPB/VDss）、代谢（5 种 CYP 酶的底物/抑制剂）、排泄（半衰期/清除率）、毒性（宏观：致癌/肝毒/急性毒性 + 微观：hERG/AMES/线粒体毒性等）。

4. **模型集成策略**：GNN 骨架采用 LiteGEM 和 GINE+，辅以传统 Random Forest；每个端点选择表现最优的模型。

5. **可扩展性**：用户可基于预训练模型，使用私有数据微调生成新的自定义 ADMET 端点。

---

## 深入细节

### 1. 三阶段训练框架

```
┌─────────────────────────────────────────────────────────────────────┐
│                    Stage 1: Self-Supervised Pre-training            │
│  ┌──────────────┐                                                   │
│  │  ~20M 无标签  │──→ GNN Backbone (共享参数)                        │
│  │   分子数据    │      ├─ Node/Edge Head: 掩码原子/键属性预测        │
│  └──────────────┘      ├─ Geometry Head:  键长/键角分布预测          │
│                        └─ Graph Head:     ECFP/MACCS 指纹预测        │
├─────────────────────────────────────────────────────────────────────┤
│                Stage 2: Multi-Task Supervised Learning              │
│  ┌──────────────┐                                                   │
│  │  ~500K 标注   │──→ GNN Backbone (继承 Stage 1 参数, 共享)         │
│  │   分子数据    │      ├─ 36 ADMET 端点 Heads (分类/回归)           │
│  └──────────────┘      ├─ 辅助生物活性任务 Heads                     │
│                        └─ SSL 任务 Heads (继续联合训练)               │
├─────────────────────────────────────────────────────────────────────┤
│              Stage 3: Single-Task Fine-Tuning (per endpoint)        │
│  ┌──────────────┐                                                   │
│  │  端点专属数据  │──→ 独立 GNN Backbone (继承 Stage 2, LR×0.1)      │
│  └──────────────┘      └─ 单一任务 Head                              │
└─────────────────────────────────────────────────────────────────────┘
```

**关键设计**：
- Stage 1 和 Stage 2 中，GNN backbone 参数在所有任务间**共享**，而每个任务有**独立的预测头**
- Stage 3 中，每个端点拥有**独立的 backbone 和 head**，学习率降至 Stage 2 的 1/10
- Stage 2 的数据集与 Stage 1 有重叠（Stage 2 的标注分子也参与 SSL 任务）

### 2. 自监督学习任务详解

#### 节点/边级任务（Atom/Bond Masking）

随机选取分子图中的一个子图（局部结构），掩码其中所有原子和键的属性，利用周围上下文预测被掩码的属性：

$$\mathcal{L}_{\text{mask}} = \sum_{v \in \mathcal{V}_{\text{masked}}} \text{CE}(\hat{y}_v, y_v) + \sum_{e \in \mathcal{E}_{\text{masked}}} \text{CE}(\hat{y}_e, y_e)$$

其中 $\mathcal{V}_{\text{masked}}$ 和 $\mathcal{E}_{\text{masked}}$ 分别为被掩码的节点和边集合。

#### 几何级任务（Bond Length & Angle Prediction）

利用 RDKit 生成分子 3D 构象，将键长和键角离散化为分类任务：

$$\mathcal{L}_{\text{geom}} = \sum_{(i,j) \in \mathcal{E}} \text{CE}(\hat{d}_{ij}, \text{bin}(d_{ij})) + \sum_{(i,j,k)} \text{CE}(\hat{\theta}_{ijk}, \text{bin}(\theta_{ijk}))$$

这使得 2D 图模型能隐式学习 3D 几何信息，无需在推理时计算 3D 构象。

#### 图级任务（Fingerprint Prediction）

预测整个分子的 ECFP（Extended Connectivity Fingerprint）和 MACCS 分子指纹：

$$\mathcal{L}_{\text{fp}} = \text{BCE}(\hat{\mathbf{f}}_{\text{ECFP}}, \mathbf{f}_{\text{ECFP}}) + \text{BCE}(\hat{\mathbf{f}}_{\text{MACCS}}, \mathbf{f}_{\text{MACCS}})$$

### 3. GNN 骨架架构

| 模型 | 类型 | 特点 |
|------|------|------|
| **LiteGEM** | 图神经网络 | 轻量级 Graph Isomorphism Network 变体，支持虚拟节点（Virtual Node），适合大规模预训练 |
| **GINE+** | 图神经网络 | GIN-E 的增强版，引入边特征更新机制，表达能力更强 |
| **Random Forest** | 传统 ML | 基于分子指纹（ECFP/MACCS）的集成模型，作为 GNN 的补充 |

分子图表示：原子作为节点（特征包括原子类型、形式电荷、手性等），化学键作为边（特征包括键类型、是否共轭、是否在环中等）。

### 4. 消融实验结果

| 训练阶段组合 | Random Split AUC | Scaffold Split AUC |
|:---:|:---:|:---:|
| Stage 3 only | 0.850 | 0.767 |
| Stage 1 + 3 | 0.855 (+0.5%) | 0.784 (+1.7%) |
| Stage 2 + 3 | 0.882 (+3.2%) | 0.803 (+3.6%) |
| **Stage 1 + 2 + 3** | **0.887 (+3.7%)** | **0.817 (+5.0%)** |

**关键发现**：
- **Stage 2（多任务监督）贡献最大**：单独加入 Stage 2 比 Stage 1 带来更大提升（+3.2% vs +0.5%）
- **三阶段组合效果最优**：完整框架在 scaffold split 上提升 5.0%，说明对未见骨架的泛化能力显著增强
- **Scaffold split 提升更明显**：SSL 预训练对分布外（OOD）分子的预测帮助更大

### 5. 与现有系统的对比

```
                    分类任务平均 AUC（可比端点）
  ┌────────────────────────────────────────────┐
  │  admetSAR 2.0    ████████████░░░  0.828    │
  │  ADMETlab 2.0    █████████████░░  0.850    │
  │  HelixADMET      ███████████████  0.898    │
  └────────────────────────────────────────────┘
       比 admetSAR 2.0 高 ~7.0%
       比 ADMETlab 2.0 高 ~4.8%
```

在 **17 个与 admetSAR 2.0 重叠的端点**中，HelixADMET 在 15 个上取得更优结果；在 **30 个与 ADMETlab 2.0 重叠的端点**中，HelixADMET 在 24 个上取得更优结果。

### 6. 数据来源与规模

| 阶段 | 数据来源 | 规模 |
|------|----------|------|
| Stage 1 (SSL) | ChEMBL, PubChem | ~20,000,000 分子 |
| Stage 2 (MTL) | ChEMBL (bioactivity) + ADMET 数据集 | ~500,000 分子 |
| Stage 3 (FT) | 各端点专属数据集 (Tox21, ToxCast 等) | 数百~数万/端点 |

### 7. 端点分类体系

```
HelixADMET 52 Endpoints
├── 理化性质 (Physicochemical): LogP, LogS, LogD, pKa
├── 药物化学 (Medicinal Chemistry): Lipinski, QED, SA Score
├── 吸收 (Absorption): Caco-2, Pgp inhibitor, 口服生物利用度, HIA
├── 分布 (Distribution): BBB penetration, PPB, VDss
├── 代谢 (Metabolism): CYP1A2/2C9/2C19/2D6/3A4 × {inhibitor, substrate}
├── 排泄 (Excretion): Half-life, Clearance
└── 毒性 (Toxicity)
    ├── 宏观毒性: 致癌性, 肝毒性, 啮齿类急性毒性
    └── 微观毒性: hERG, AMES, 线粒体毒性, 皮肤敏化, 眼毒性
```

---

## 练习题

1. **概念理解**：HelixADMET 的三阶段训练框架中，为什么 Stage 2（多任务监督学习）的贡献大于 Stage 1（自监督预训练）？从数据质量和任务相关性的角度分析。

2. **设计思考**：几何级 SSL 任务将键长/键角预测离散化为分类任务而非回归任务，这样做有什么优势？如果改为回归任务可能会遇到什么问题？

3. **实验分析**：消融实验中，scaffold split 下三阶段框架的提升（+5.0%）远大于 random split（+3.7%）。请解释这一现象背后的原因，并讨论这对药物发现实际应用的意义。

4. **扩展思考**：HelixADMET 允许用户使用私有数据微调预训练模型以生成新端点。请设计一个实验方案，评估在不同规模的私有数据（如 100/500/2000 条）下，预训练模型相比从头训练的优势有多大。