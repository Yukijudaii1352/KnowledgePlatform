### BMN

```yaml
id: bmn
name: BMN
full_name: 边界匹配网络 (Boundary-Matching Network)
year: 2019
org: CUHK & Baidu
paper_url: https://arxiv.org/abs/1907.09702
category: temporal_action_proposal
parent: BSN
motivation: 用边界匹配机制构建二维置信度图，同时评估所有提案的置信度，解决BSN逐提案评估效率低、特征缺乏上下文且需多阶段训练的问题
```

#### 📝 一句话总结

BMN 提出了边界匹配（Boundary-Matching）机制，将时序动作提案表示为二维置信度图中的点，通过统一网络同时生成所有提案的边界概率和置信度分数，解决了 BSN 逐提案特征构建效率低下、缺乏全局上下文且需多阶段训练的问题，在 ActivityNet-1.3 和 THUMOS-14 上取得了当时最优的提案生成性能，同时推理速度提升约 12 倍。

#### 🎯 核心要点

- **边界匹配（BM）机制**：将提案表示为 \((t_s, d)\) 即起始时刻与持续时长的组合，映射到二维 BM 置信度图 \(M_{CC} \in \mathbb{R}^{D \times T}\)，实现对所有候选提案的同时评估
- **BM 特征层（BM Layer）**：通过预计算的采样掩码矩阵 \(W\)，将一维时序特征 \(S_F \in \mathbb{R}^{C \times T}\) 转换为二维 BM 特征图 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\)，在每个提案的扩展区域内均匀采样 \(N\) 个特征点
- **三模块统一架构**：Base Module（时序特征编码）+ TEM（边界概率预测）+ PEM（提案置信度评估），端到端联合训练
- **双输出置信度图**：PEM 同时输出分类置信度图 \(M_{CC}\) 和回归置信度图 \(M_{CR}\)，融合后得到最终提案分数
- **评估基准**：ActivityNet-1.3（AUC 67.10%，提升 0.93%）和 THUMOS-14（AR@1000 达 65.49%），推理速度比 BSN 快约 12 倍
- **泛化能力**：在未见过的动作类别上性能几乎无下降，表明模型学习了通用的"动作何时发生"的概念

#### 🔬 深入细节

##### 核心架构图

![BMN 整体框架图](https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x3.png)
*图：BMN 网络架构。输入视频经 TSN 编码为时序特征后，Base Module 提取共享特征，TEM 预测边界概率，PEM 通过 BM Layer 生成二维特征图并输出置信度图。*

![BM 机制示意图](https://ar5iv.labs.arxiv.org/html/1907.09702v1/assets/x1.png)
*图：边界匹配机制。左侧为 BSN 的逐提案评估方式，右侧为 BMN 的二维置信度图方式，每个点 \((i,j)\) 对应一个起始于 \(t_i\)、持续 \(d_j\) 的提案。*

##### 算法伪代码

```python
# BMN 训练与推理流程伪代码
# === 特征编码 ===
S_F = TSN_encode(video)              # S_F ∈ R^{C×T}, T=100 for ANet

# === Base Module ===
x = Conv1D(S_F, 256, k=3) + ReLU     # 时序卷积
x = Conv1D(x, 128, k=3) + ReLU       # 共享时序特征

# === TEM: 边界概率预测 ===
P_start = Sigmoid(Conv1D(x, 1, k=3)) # 起始边界概率 ∈ R^T
P_end   = Sigmoid(Conv1D(x, 1, k=3)) # 结束边界概率 ∈ R^T

# === PEM: 提案置信度评估 ===
# BM Layer: 一维特征 → 二维特征图
W = precompute_sampling_mask(N, D, T) # 采样掩码 W ∈ R^{N×D×T×T}
M_F = einsum('ct,ndtk->cndt', x, W)  # BM特征图 M_F ∈ R^{C×N×D×T}

# 3D+2D 卷积生成置信度图
h = Conv3D(M_F, 512, k=(N,1,1))      # 压缩采样维度 → R^{512×D×T}
h = Conv2D_stack(h)                    # 多层2D卷积
M_CC = Sigmoid(Conv2D(h, 1))          # 分类置信度图 ∈ R^{D×T}
M_CR = Sigmoid(Conv2D(h, 1))          # 回归置信度图 ∈ R^{D×T}

# === 推理: 提案生成 ===
proposals = peak_detect(P_start, P_end)  # 从边界概率中选取峰值组合
for (ts, te) in proposals:
    p_s, p_e = P_start[ts], P_end[te]
    cc, cr = M_CC[te-ts, ts], M_CR[te-ts, ts]
    score = p_s * p_e * (cc * cr) ** 0.5  # 融合分数
proposals = SoftNMS(proposals, scores)     # 去冗余
```

##### 动机与背景

时序动作提案生成（Temporal Action Proposal Generation）旨在从未裁剪视频中定位可能包含动作实例的时间区间，是时序动作检测的关键前置步骤。此前最优方法 BSN（Boundary Sensitive Network）采用"局部到全局"的框架：先用 TEM 预测每个时刻的边界概率，再组合边界生成候选提案，最后用 PEM 逐一评估每个提案的置信度。

BSN 存在三个核心缺陷：

1. **逐提案特征构建效率低**：PEM 需要为每个候选提案单独构建特征（通过在边界概率序列上采样），当提案数量达到数千时，计算开销巨大
2. **提案特征缺乏上下文**：BSN 仅使用边界概率序列构建提案特征，丢失了视觉内容信息，限制了置信度评估的准确性
3. **多阶段训练流程**：TEM 和 PEM 需要分别训练，无法端到端优化，增加了工程复杂度

> 💡 关键：BMN 的核心洞察是——如果将所有可能的提案组织为一个二维矩阵（起始时刻 × 持续时长），就可以用一次前向传播同时生成所有提案的置信度，而非逐一评估。

##### 核心机制：边界匹配（Boundary-Matching）

**BM 置信度图的定义**

BMN 将每个提案 \(\phi_{i,j}\) 用起始位置 \(t_i\) 和持续时长 \(d_j\) 来索引，构成一个二维矩阵。置信度图 \(M_C \in \mathbb{R}^{D \times T}\) 中的每个元素 \(m^c_{i,j}\) 表示提案 \(\phi_{i,j} = (t_i, d_j)\) 的置信度分数，其中 \(D\) 为最大持续时长，\(T\) 为时序长度。

这种表示的优势在于：所有合法提案（满足 \(t_i + d_j \leq T\)）构成置信度图的下三角区域，可以通过卷积网络一次性生成。

**BM 特征层（BM Layer）**

BM Layer 是连接一维时序特征与二维置信度图的桥梁。给定共享时序特征 \(S_F \in \mathbb{R}^{C \times T}\)，BM Layer 为每个提案 \(\phi_{i,j}\) 提取一个包含 \(N\) 个采样点的特征向量。

具体地，对于提案 \(\phi_{i,j} = (t_i, d_j)\)，首先计算其扩展区域 \([t_i - 0.25 d_j, \; t_i + d_j + 0.25 d_j]\)，然后在该区域内均匀采样 \(N\) 个位置。扩展 25% 的上下文区域是为了捕获提案边界附近的环境信息。

采样过程通过预计算的掩码矩阵 \(W \in \mathbb{R}^{N \times D \times T \times T}\) 实现：

$$M_F = S_F \cdot W$$

其中 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\) 为 BM 特征图。掩码 \(W\) 的每个元素 \(w^{n}_{i,j,k}\) 表示第 \((i,j)\) 个提案的第 \(n\) 个采样点对时序位置 \(k\) 的权重（通过线性插值计算）。由于 \(W\) 仅依赖于 \(N, D, T\) 的取值，可在训练前一次性计算并固定。

> ⚠️ 注意：BM Layer 的计算本质上是矩阵乘法，因此可以高效地在 GPU 上并行执行，这是 BMN 相比 BSN 速度大幅提升的关键。

**从 BM 特征图到置信度图**

BM 特征图 \(M_F \in \mathbb{R}^{C \times N \times D \times T}\) 经过以下卷积处理生成最终置信度图：

1. **3D 卷积层**：卷积核大小 \((N, 1, 1)\)，将采样维度 \(N\) 压缩，输出 \(\mathbb{R}^{512 \times D \times T}\)
2. **多层 2D 卷积**：逐步提取空间特征
3. **双头输出**：
   - 分类头 \(M_{CC}\)：输出二值分类置信度（该位置是否为有效提案）
   - 回归头 \(M_{CR}\)：输出 IoU 回归值（该提案与真实动作的重叠度）

##### 训练流程

**TEM 损失函数**

TEM 的标签通过 IoR（Intersection over Region）计算：对于每个真实动作实例，其边界区域定义为 \([t_s - d/10, t_s + d/10]\)（起始）和 \([t_e - d/10, t_e + d/10]\)（结束），其中 \(d\) 为动作持续时长。每个时刻的标签为其与所有边界区域的最大 IoR 值。

TEM 采用加权二值逻辑回归损失：

$$L_{TEM} = L_{bl}(P_S, G_S) + L_{bl}(P_E, G_E)$$

其中 \(L_{bl}\) 使用阈值 \(\theta = 0.5\) 将标签二值化，并通过正负样本数量的倒数进行加权，平衡类别不均衡问题：

$$L_{bl}(P, G) = \frac{1}{l_\omega} \sum_{i=1}^{l_\omega} \left( \alpha^+ \cdot b_i \cdot \log(p_i) + \alpha^- \cdot (1-b_i) \cdot \log(1-p_i) \right)$$

**PEM 损失函数**

PEM 的标签 \(G_C\) 为每个提案与所有真实动作的最大 IoU 值。PEM 损失包含分类和回归两部分：

$$L_{PEM} = L_C(M_{CC}, G_C) + \lambda \cdot L_R(M_{CR}, G_C)$$

其中分类损失 \(L_C\) 同样使用 \(L_{bl}\)，回归损失 \(L_R\) 使用 L2 损失，\(\lambda = 10\)。为平衡正负样本，取 IoU > 0.6 的点为正样本，随机采样 IoU < 0.2 的点为负样本，保持正负比例约 1:1。

**总体训练目标**

$$L = L_{TEM} + \lambda_1 \cdot L_{PEM} + \lambda_2 \cdot L_2(\Theta)$$

其中 \(\lambda_1 = 1\)，\(\lambda_2 = 0.0001\)。三个模块端到端联合训练。

##### 推理流程

1. **候选提案生成**：从 TEM 输出的边界概率序列中，选取概率值高于阈值的峰值位置作为候选起始/结束点，两两组合生成候选提案
2. **分数融合**：对每个候选提案 \((t_s, t_e)\)，从置信度图中查询对应位置的分类分数 \(cc\) 和回归分数 \(cr\)，与边界概率融合：

$$score = p_s \cdot p_e \cdot \sqrt{cc \cdot cr}$$

3. **冗余抑制**：使用 Soft-NMS 去除重叠提案

##### 与 BSN 的关键区别

| 对比维度 | BSN | BMN |
|---------|-----|-----|
| 提案评估方式 | 逐提案构建特征并评分 | 一次前向生成所有提案的置信度图 |
| 提案特征来源 | 仅边界概率序列 | 视觉时序特征 + 上下文扩展 |
| 训练方式 | TEM 和 PEM 分别训练 | 端到端联合训练 |
| 推理速度（3min视频） | 0.629s | 0.052s（快 ~12x） |
| AUC (ActivityNet-1.3) | 66.17% | 67.10% |

##### 实验结果

**ActivityNet-1.3**：BMN 在验证集上 AUC 达到 67.10%（BSN 为 66.17%），AR@100 达到 75.01%。在测试集上 AUC 达到 67.19%。结合视频级分类结果后，时序动作检测 average mAP 达到 33.85%（验证集）和 36.42%（测试集），显著优于 BSN 的 30.03% 和 32.87%。

**THUMOS-14**：使用 Two-Stream 特征 + Soft-NMS，AR@50 达到 39.36%，AR@1000 达到 65.49%，全面超越 BSN。

**消融实验关键发现**：
- 端到端联合训练比分别训练 TEM+PEM 提升 AUC 0.67%（67.10% vs 66.43%）
- BM 机制使 PEM 推理时间从 BSN 的 0.624s 降至 0.062s（分别训练）或 0.047s（联合训练）
- 模型在未见过的动作类别上性能几乎无下降（AUC 64.47% vs 64.37%），展现出强泛化能力

#### 🧪 练习题

```yaml
question: "BMN 中 BM Layer 的核心作用是什么？"
options:
  - "将视频帧转换为光流特征"
  - "将一维时序特征转换为二维 BM 特征图，使所有提案可同时评估"
  - "对候选提案进行非极大值抑制"
  - "预测每个时刻的动作类别概率"
answer: 1
explain: "BM Layer 通过预计算的采样掩码矩阵，将共享的一维时序特征映射为二维 BM 特征图，使得后续卷积网络可以一次性生成所有提案的置信度，这是 BMN 相比 BSN 效率大幅提升的关键。"
```