### IgFold — 基于语言模型的端到端抗体结构快速预测

```yaml
id: igfold
name: IgFold
full_name: "IgFold: Fast, accurate antibody structure prediction from deep learning on massive set of natural antibodies"
year: 2023
org: Johns Hopkins University
paper_url: https://www.nature.com/articles/s41467-023-38063-x
category: structure_prediction
parent: "—"
motivation: "利用抗体语言模型嵌入替代MSA，结合图Transformer直接预测原子坐标，实现秒级抗体结构预测"
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