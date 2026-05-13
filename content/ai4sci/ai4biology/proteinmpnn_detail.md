### ProteinMPNN — 蛋白质序列设计的鲁棒深度学习方法

```yaml
id: proteinmpnn
name: ProteinMPNN
full_name: "蛋白质序列设计的鲁棒深度学习方法 (Robust deep learning–based protein sequence design using ProteinMPNN)"
year: 2022
org: "University of Washington, Institute for Protein Design"
paper_url: "https://www.science.org/doi/10.1126/science.add2187"
category: ai4biology
parent: "—"
motivation: "用消息传递神经网络实现蛋白质序列设计，支持单链/多链/对称/折叠设计"
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