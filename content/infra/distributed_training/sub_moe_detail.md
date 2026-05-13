### Sub-MoE: Training-Free MoE Expert Compression via Union SVD

```yaml
id: sub_moe
name: "Sub-MoE"
year: 2025
org: "AAAI 2025 (Peking University, Shanghai AI Lab)"
category: model_compression
parent: switch_transformer
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/43425"
```

---

## 📝 一句话总结

Sub-MoE提出**无需训练**的MoE专家压缩方法：先通过K-means聚类将相似专家分组，再用**Union SVD**提取组内共享基底并以路由频率加权合并专家特有分量，实现专家数量25%-50%缩减的同时保留86%-96%的原始性能。

---

## 🎯 核心要点

1. **问题定义**：MoE模型（如Mixtral-8x7B）因专家数量多导致显存占用巨大，现有压缩方法（剪枝/量化）要么损失严重要么需要昂贵微调，亟需**无训练**的高效压缩方案。

2. **两阶段压缩框架**：
   - **阶段一（专家聚类）**：用校准数据计算专家输出的余弦相似度矩阵，再用K-means将N个专家聚为M个组（M < N）。
   - **阶段二（Union SVD合并）**：对每组专家的权重矩阵联合做SVD，提取共享左奇异向量U作为公共基底，以路由频率加权合并各专家的右奇异向量V，重构出单个合并专家。

3. **Union SVD vs Vanilla SVD**：直接对合并后权重做SVD（Vanilla）会丢失专家个性化信息；Union SVD先对每个专家独立分解再在共享基底下合并，**保留了专家间的结构差异**，消融实验显示Union SVD在所有指标上显著优于Vanilla SVD。

4. **Sub-MoE†扩展**：在合并后的专家上进一步做**激活感知截断SVD**（按激活值缩放的奇异值重要性排序截断），实现专家内部额外压缩。

5. **实验结果**：在Mixtral-8x7B上，8→6专家保留原始性能96%，8→4保留86%；在Qwen1.5-MoE-A2.7B（60→30专家）上同样有效。全程**无需任何训练/微调**，仅需少量校准数据。

---

## 🔬 深入细节

### 方法总览

> **图示说明**（对应论文Figure 2）：整体流程分三步——(1) 用校准数据收集专家输出，计算余弦相似度矩阵并K-means聚类；(2) 对同组专家权重做Union SVD，提取共享U矩阵；(3) 以路由频率加权合并V矩阵，重构合并专家权重。Sub-MoE†在此基础上对合并专家做激活感知截断SVD进一步压缩。

### 1. 专家相似度计算与聚类

对于MoE层 $l$ 中的专家 $E_i^l$ 和 $E_j^l$，使用校准数据集 $\mathcal{D}$ 计算输出级余弦相似度：

$$S_{ij}^l = \frac{1}{|\mathcal{D}|} \sum_{x \in \mathcal{D}} \frac{E_i^l(x) \cdot E_j^l(x)}{\|E_i^l(x)\| \cdot \|E_j^l(x)\|}$$

得到相似度矩阵 $\mathbf{S}^l \in \mathbb{R}^{N \times N}$ 后，将 $1 - \mathbf{S}^l$ 作为距离矩阵，用**K-means**将 $N$ 个专家聚为 $M$ 个组。

**聚类粒度选择**：论文对比了逐层独立聚类（layer-wise）和多层联合聚类（2-layer, 4-layer等），发现**2层联合聚类**效果最佳——既能捕获跨层专家关联，又不会因粒度过粗丢失层间差异。

### 2. Union SVD 专家合并（核心算法）

假设一个聚类组包含专家 $\{E_1, E_2, ..., E_K\}$，每个专家的权重矩阵为 $W_k \in \mathbb{R}^{m \times n}$。

**Step 1: 联合SVD分解**

将组内所有专家权重纵向拼接后做SVD：

$$[W_1; W_2; ...; W_K] = U \Sigma V^T$$

其中 $U \in \mathbb{R}^{Km \times r}$ 是**共享左奇异向量基底**，$\Sigma \in \mathbb{R}^{r \times r}$ 是奇异值矩阵，$V \in \mathbb{R}^{n \times r}$ 是右奇异向量。

**Step 2: 提取各专家投影**

将 $U$ 按行分块为 $[U_1; U_2; ...; U_K]$（每块 $m$ 行），则每个专家的权重可近似为：

$$W_k \approx U_k \Sigma V^T$$

定义每个专家的**特有右分量**为 $\hat{V}_k = \Sigma^T U_k^T W_k$（在共享基底下的投影）。

**Step 3: 频率加权合并**

以路由器分配给各专家的**激活频率** $f_k$ 为权重，合并右分量：

$$\hat{V}_{merged} = \sum_{k=1}^{K} \frac{f_k}{\sum_{j} f_j} \hat{V}_k$$

**Step 4: 重构合并专家**

$$W_{merged} = U_{shared} \cdot \hat{V}_{merged}$$

其中 $U_{shared}$ 取自联合SVD的前 $m$ 行（或任意一个 $U_k$，因为共享基底对所有专家一致）。

### 3. 伪代码

```
Algorithm: Sub-MoE Expert Compression
Input: MoE model M with N experts per layer, target M experts, calibration data D
Output: Compressed model M' with M experts per layer

# Phase 1: Expert Clustering
for each MoE layer l (or 2-layer group):
    for each expert pair (i, j):
        S[i,j] = mean cosine_similarity(E_i(x), E_j(x)) for x in D
    distance = 1 - S
    clusters = KMeans(distance, n_clusters=M)

# Phase 2: Union SVD Merging  
for each cluster C = {E_1, ..., E_K}:
    # For each weight matrix (gate_proj, up_proj, down_proj):
    W_stack = vertical_stack(W_1, W_2, ..., W_K)    # [Km, n]
    U, Sigma, V = SVD(W_stack)                        # Union SVD
    
    # Extract per-expert projections
    for k = 1 to K:
        U_k = U[m*(k-1) : m*k, :]                    # [m, r]
        V_hat_k = Sigma^T @ U_k^T @ W_k              # expert-specific component
    
    # Frequency-weighted merging
    freq = [routing_frequency(E_k, D) for k in 1..K]
    V_merged = weighted_sum(V_hat_k, weights=freq/sum(freq))
    
    # Reconstruct merged expert
    W_merged = U_shared @ V_merged                    # [m, n]
    
    # Update router: redirect all experts in cluster to merged expert

# Optional: Sub-MoE† (activation-aware truncated SVD)
for each merged expert:
    W = merged_weight                                  # [m, n]
    U, S, V = SVD(W)
    importance[i] = S[i] * ||activation_scale||        # activation-aware
    keep_indices = top_k(importance, ratio=compression_ratio)
    W_compressed = U[:, keep] @ diag(S[keep]) @ V[keep, :]

return compressed model M'
```

### 4. 关键消融实验结果

| 消融维度 | 最优选择 | 关键发现 |
|---------|---------|---------|
| SVD方式 | Union SVD | Union SVD在ARC-c上比Vanilla SVD高**7.3%**（8→6专家） |
| 聚类算法 | K-means | K-means优于层次聚类(Hierarchical)和谱聚类(Spectral) |
| 聚类粒度 | 2-layer联合 | 2层联合 > 逐层独立 > 4层/全局联合 |
| V合并方式 | 频率加权 | 频率加权 > 均匀平均 > 仅保留最高频专家 |
| 相似度度量 | 输出余弦相似度 | 输出级 > 权重级相似度 |

### 5. 主要实验数据

**Mixtral-8x7B（8→6专家，25%压缩）**：
- 平均性能保留率：**96.0%**
- ARC-c: 57.0→54.4, MMLU: 68.5→65.1, GSM8K: 54.1→48.1
- 对比：优于所有无训练基线（随机剪枝、频率剪枝、权重平均合并等）

**Mixtral-8x7B（8→4专家，50%压缩）**：
- 平均性能保留率：**86.0%**
- 显存从93GB降至约60GB

**Qwen1.5-MoE-A2.7B（60→30专家，50%压缩）**：
- 平均性能保留率：**90.2%**
- 验证了方法在细粒度MoE（大量小专家）上的泛化能力

### 6. 核心洞察

- **为什么Union SVD有效**：同组专家因功能相似，其权重矩阵共享相近的列空间（左奇异向量）。Union SVD通过联合分解显式提取这一共享结构，而非简单平均权重（会破坏专家特性）。
- **频率加权的直觉**：高频专家对模型输出贡献更大，合并时应赋予更高权重，这与知识蒸馏中按重要性加权的思想一致。
- **无需训练的关键**：SVD是精确分解（非近似），信息损失仅来自聚类分组和V分量合并，而非参数拟合不足。

---

## 🧪 练习题

### Q1（理解题）
**Sub-MoE为什么选择在专家输出空间而非权重空间计算相似度进行聚类？**

<details><summary>参考答案</summary>

权重空间的相似度不能直接反映专家的**功能相似性**。两个专家可能权重差异较大但对相同输入产生相似输出（功能等价），也可能权重相近但因非线性激活函数导致输出差异显著。输出空间的余弦相似度直接衡量了专家在实际数据分布上的行为一致性，是更准确的功能相似性度量。论文消融实验也证实输出级相似度优于权重级相似度。

</details>

### Q2（分析题）
**Union SVD相比直接对合并权重做Vanilla SVD的核心优势是什么？请从信息保留角度分析。**

<details><summary>参考答案</summary>

Vanilla SVD的做法是先将多个专家权重平均/加权合并为一个矩阵，再做SVD低秩近似。问题在于**合并步骤本身就已经不可逆地丢失了专家间的差异信息**——平均操作会抹平各专家的个性化特征。

Union SVD的做法是先将所有专家权重纵向拼接做联合SVD，此时**每个专家的完整信息都参与了分解**。共享的U矩阵捕获了组内专家的公共列空间结构，而每个专家独有的V分量 $\hat{V}_k$ 保留了其个性化信息。最后的频率加权合并是在**已经提取了公共结构之后**对残差部分的合并，信息损失远小于直接在原始权重上合并。

实验数据：8→6专家时，Union SVD在ARC-c上比Vanilla SVD高7.3个百分点。

</details>

### Q3（扩展题）
**如果要将Sub-MoE应用于一个有128个专家的超大规模MoE模型（如类似DeepSeek-MoE的架构），你预期会遇到什么挑战？如何改进？**

<details><summary>参考答案</summary>

主要挑战：
1. **相似度矩阵计算开销**：128个专家需计算 $128 \times 128 / 2 = 8192$ 对相似度，每对需要在校准数据上前向传播，计算成本显著增加。
2. **联合SVD内存瓶颈**：如果一个聚类组包含K个专家，拼接矩阵大小为 $Km \times n$，当K较大时SVD的内存和计算复杂度（$O(Km \cdot n \cdot \min(Km,n))$）可能不可接受。
3. **聚类质量下降**：专家数量增多时，K-means在高维空间中的聚类质量可能下降，需要更精细的聚类策略。

改进方向：
- 采用**分层聚类**：先粗聚类再细聚类，控制每组专家数量。
- 使用**随机化SVD**（如Halko算法）替代精确SVD，降低计算复杂度至 $O(mn \log r)$。
- 引入**增量式相似度计算**：利用路由器的gate logits作为专家相似度的代理指标，避免逐对计算输出相似度。
- 考虑**共享专家**（DeepSeek-MoE中已有的shared expert）与路由专家的不同处理策略。

</details>