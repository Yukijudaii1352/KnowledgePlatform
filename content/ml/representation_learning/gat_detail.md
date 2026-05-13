### 图注意力网络 (Graph Attention Networks)

```yaml
id: gat
name: GAT
full_name: 图注意力网络 (Graph Attention Networks)
year: 2018
org: Mila (Université de Montréal)
paper_url: https://arxiv.org/abs/1710.10903
category: foundation
parent: —
motivation: 将注意力机制引入图神经网络，通过学习邻居节点的重要性权重实现自适应聚合
```

#### 📝 一句话总结

GAT 提出了基于 masked self-attention 的图神经网络层，通过为每个节点的邻居学习不同的注意力权重来自适应聚合信息，无需预知全局图结构，同时支持归纳学习（inductive learning），在多个图节点分类基准上取得了当时的最优结果。

#### 🎯 核心要点

- **Masked Self-Attention 机制**：仅对图中直接相连的邻居节点计算注意力系数，避免了全图信息的需求
- **共享注意力机制 \(a\)**：使用单层前馈网络 + LeakyReLU 计算节点对之间的注意力分数
- **多头注意力（Multi-Head Attention）**：中间层使用 \(K\) 个独立注意力头并拼接（concat），最终层使用平均（averaging）
- **计算效率**：单头注意力层的时间复杂度为 \(O(|V|FF' + |E|F')\)，与 GCN 同级别
- **归纳学习能力**：不依赖全局图结构（如拉普拉斯特征分解），可直接应用于未见过的图
- **支持有向图**：注意力系数 \(\alpha_{ij} \neq \alpha_{ji}\)，天然适配有向图和异构邻居关系
- **实验基准**：在 Cora（83.0%）、Citeseer（72.5%）、Pubmed（79.0%）转导任务和 PPI（97.3% F1）归纳任务上达到 SOTA

#### 🔬 深入细节

##### 核心示意图

GAT 的核心架构如下图所示。左侧展示了单个注意力头的计算过程：对中心节点 \(\vec{h}_i\) 的每个邻居 \(\vec{h}_j\)，先通过共享线性变换 \(\mathbf{W}\) 映射到高维空间，再通过注意力机制 \(a\) 计算注意力系数 \(\alpha_{ij}\)；右侧展示了多头注意力的拼接方式，\(K=3\) 个独立注意力头的输出被拼接或平均。

![GAT t-SNE 特征可视化](https://ar5iv.labs.arxiv.org/html/1710.10903/assets/t-sne.png)
*图：预训练 GAT 模型第一隐藏层输出的 t-SNE 可视化（Cora 数据集），颜色代表节点的 7 个类别，可见注意力机制学到了良好的类别可分特征表示。*

##### 算法伪代码

```python
# GAT 单层前向传播伪代码
def gat_layer(h, W, a, adj, K, concat=True):
    """
    h: 输入节点特征 [N, F]
    W: 共享线性变换权重 [F, F']
    a: 注意力向量 [2F', 1]
    adj: 邻接关系 (邻居集合)
    K: 注意力头数
    """
    heads = []
    for k in range(K):
        # Step 1: 线性变换
        h_prime = h @ W[k]                    # [N, F']
        
        # Step 2: 计算注意力系数
        for i in range(N):
            for j in adj[i]:                  # 仅邻居节点 (masked)
                e_ij = LeakyReLU(a[k].T @ concat(h_prime[i], h_prime[j]))
            alpha_i = softmax(e_ij for j in adj[i])  # 归一化
        
        # Step 3: 加权聚合
        for i in range(N):
            h_out[i] = sigma(sum(alpha_ij * h_prime[j] for j in adj[i]))
        
        heads.append(h_out)
    
    # Step 4: 多头合并
    if concat:
        return concatenate(heads)             # 中间层: [N, K*F']
    else:
        return mean(heads)                    # 最终层: [N, F']
```

##### 方法细节解释

**动机与背景**

图结构数据（社交网络、引文网络、生物网络等）广泛存在，但传统卷积无法直接应用于非欧几里得域。此前的图神经网络方法主要分为两类：

1. **谱方法（Spectral approaches）**：如 GCN (Kipf & Welling, 2017)，依赖图拉普拉斯矩阵的特征分解，计算开销大且无法泛化到新图结构
2. **非谱方法（Non-spectral approaches）**：如 GraphSAGE (Hamilton et al., 2017)，直接在图上定义卷积操作，但对邻居的聚合权重要么固定（如均值/最大值），要么需要复杂的采样策略

> 💡 **关键洞察**：Transformer 中的 self-attention 机制能够自适应地为不同输入分配不同权重，如果将其引入图神经网络，就能让每个节点"学会"关注哪些邻居更重要，而不是简单地平等对待所有邻居。

**核心机制：Graph Attention Layer**

GAT 层的计算分为以下几步：

**Step 1 — 共享线性变换**：对所有节点应用共享的权重矩阵 \(\mathbf{W} \in \mathbb{R}^{F' \times F}\)，将输入特征从 \(F\) 维映射到 \(F'\) 维：

$$\vec{h}'_i = \mathbf{W} \vec{h}_i$$

**Step 2 — 注意力系数计算**：对节点 \(i\) 的每个邻居 \(j \in \mathcal{N}_i\)（包括自身），通过共享注意力机制 \(a: \mathbb{R}^{F'} \times \mathbb{R}^{F'} \rightarrow \mathbb{R}\) 计算原始注意力分数：

$$e_{ij} = \text{LeakyReLU}\left(\vec{\mathbf{a}}^T [\mathbf{W}\vec{h}_i \| \mathbf{W}\vec{h}_j]\right)$$

其中 \(\vec{\mathbf{a}} \in \mathbb{R}^{2F'}\) 是可学习的注意力向量，\(\|\) 表示向量拼接，LeakyReLU 的负斜率为 \(\alpha = 0.2\)。

> ⚠️ **注意**：这里使用 **masked attention**——只对节点 \(j \in \mathcal{N}_i\) 计算 \(e_{ij}\)，而非所有节点。这是 GAT 与标准 Transformer self-attention 的关键区别，使得计算复杂度与边数而非节点数的平方成正比。

**Step 3 — Softmax 归一化**：对节点 \(i\) 的所有邻居的注意力分数进行 softmax 归一化，得到最终的注意力权重：

$$\alpha_{ij} = \text{softmax}_j(e_{ij}) = \frac{\exp(e_{ij})}{\sum_{k \in \mathcal{N}_i} \exp(e_{ik})}$$

**Step 4 — 加权聚合**：用注意力权重对邻居的变换特征进行加权求和，并通过非线性激活函数：

$$\vec{h}'_i = \sigma\left(\sum_{j \in \mathcal{N}_i} \alpha_{ij} \mathbf{W} \vec{h}_j\right)$$

**Step 5 — 多头注意力**：为了稳定注意力学习过程，GAT 使用 \(K\) 个独立的注意力头。对于中间层，将各头输出拼接：

$$\vec{h}'_i = \overset{K}{\underset{k=1}{\Big\|}} \sigma\left(\sum_{j \in \mathcal{N}_i} \alpha_{ij}^k \mathbf{W}^k \vec{h}_j\right)$$

对于最终（预测）层，使用平均后再激活：

$$\vec{h}'_i = \sigma\left(\frac{1}{K} \sum_{k=1}^{K} \sum_{j \in \mathcal{N}_i} \alpha_{ij}^k \mathbf{W}^k \vec{h}_j\right)$$

> 💡 **为什么最终层用平均而非拼接？** 拼接会使输出维度变为 \(K \times F'\)，而分类层通常需要固定维度等于类别数。平均操作保持输出维度为 \(F'\)，同时仍能利用多头注意力的稳定性优势。

**训练流程与实验配置**

- **转导学习（Transductive）**：Cora / Citeseer / Pubmed
  - 2 层 GAT：第一层 \(K=8\) 头，每头 \(F'=8\) 特征（共 64 维）；第二层 \(K=1\) 头，输出 \(C\) 类
  - 激活函数：ELU；正则化：L2 = 0.0005（Cora/Citeseer）/ 0.001（Pubmed）；Dropout = 0.6（应用于输入和注意力系数）
  
- **归纳学习（Inductive）**：PPI（蛋白质交互网络）
  - 3 层 GAT：\(K=4\) 头 × 256 维 → \(K=4\) 头 × 256 维 → \(K=6\) 头 × 121 类
  - 激活函数：ELU（中间层）；无正则化/Dropout；训练时使用 batch size = 2 个图

**与传统方法的关键区别**

| 特性 | GCN | GraphSAGE | MoNet | **GAT** |
|------|-----|-----------|-------|---------|
| 邻居权重 | 固定（度归一化） | 固定（均值/LSTM/池化） | 可学习（伪坐标） | **自适应注意力** |
| 需要全局图结构 | ✅ | ❌ | ✅ | **❌** |
| 支持归纳学习 | ❌ | ✅ | ❌ | **✅** |
| 支持有向图 | ❌ | ❌ | ❌ | **✅** |
| 计算可并行化 | ✅ | 部分 | ✅ | **✅** |
| 时间复杂度 | \(O(|E|F')\) | \(O(|V|s^L F')\) | \(O(|E|F')\) | \(O(|V|FF' + |E|F')\) |

> 💡 **GAT 的核心优势**：注意力权重是数据驱动的——同一个节点对不同邻居可以分配不同的重要性，这使得模型能够捕获图中更精细的结构信息，而不像 GCN 那样对所有邻居一视同仁。

#### 🧪 练习题

```yaml
question: "GAT 在最终预测层使用多头注意力时，为什么采用平均（averaging）而非拼接（concatenation）？"
options:
  - "平均操作的计算效率更高"
  - "拼接会导致输出维度为 K×F'，不适合直接用于分类"
  - "平均操作能产生更好的注意力权重"
  - "拼接只适用于归纳学习任务"
answer: 1
explain: "拼接会使输出维度变为 K×F'，而最终分类层需要输出维度等于类别数 C，因此使用平均来保持输出维度为 F'=C。"
```