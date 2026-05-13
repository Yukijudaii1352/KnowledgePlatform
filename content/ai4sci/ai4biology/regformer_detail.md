### RegFormer — 基因调控网络引导的单细胞基础模型

```yaml
id: regformer
name: RegFormer
full_name: "RegFormer: A Gene Regulatory Network-Informed Foundation Model for Single-Cell Analysis"
year: "2026.03"
org: "BGI Research / 曹龙团队"
paper_url: "https://www.nature.com/articles/s41467-026-72198-x"
category: single_cell
parent: scgpt
motivation: "将基因调控网络（GRN）的层级拓扑结构融入Mamba状态空间模型，替代传统Transformer注意力机制，实现跨组织迁移的单细胞基础模型"
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