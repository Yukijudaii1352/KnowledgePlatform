### MODNet — 材料最优描述符网络 (Materials Optimal Descriptor Network)

```yaml
id: modnet
name: MODNet
full_name: "材料最优描述符网络 (Materials Optimal Descriptor Network)"
year: 2021
org: UCLouvain
paper_url: "https://doi.org/10.1038/s41524-021-00552-2"
category: property_prediction
parent: matminer
motivation: "小样本数据集优化预测"
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