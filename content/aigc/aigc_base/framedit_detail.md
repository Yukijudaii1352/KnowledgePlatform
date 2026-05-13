### FrameDiT — 基于矩阵注意力的帧级时序建模

```yaml
id: framedit
name: FrameDiT
full_name: "帧级扩散Transformer (Frame-level Diffusion Transformer)"
year: 2025
org: "Deakin University & FPT Smart Cloud"
arxiv: "2603.09721"
category: diffusion
parent: dit
motivation: "提出Matrix Attention实现帧级时序注意力，高效生成长视频"
```

#### 📝 一句话总结

FrameDiT 提出 **矩阵注意力（Matrix Attention）** 机制，将每帧视为一个矩阵整体计算帧间时序相似度，以 \(O(T^2 N_{qk}D + TND)\) 的复杂度替代传统逐 token 时序注意力的 \(O(T^2N)\)，在保持全局时序感受野的同时大幅降低计算开销，实现高质量长视频生成。

#### 🎯 核心要点

- **核心问题**：视频 DiT 中时序注意力的效率瓶颈——Full 3D Attention 复杂度 \(O(T^2N^2)\) 不可扩展，Local Factorized Attention 虽降至 \(O(T^2N + TN^2)\) 但仅在相同空间位置做时序关联，无法捕捉大幅运动
- **矩阵注意力（Matrix Attention）**：将每帧所有空间 token 视为一个矩阵，通过行权重矩阵 \(U\) 将 \(N\) 个空间 token 压缩为 \(N_{qk}\) 行，利用 Frobenius 内积计算帧级相似度
- **FrameDiT-G（Global）**：用矩阵注意力直接替换 DiT 中的时序注意力，仅保留全局帧级建模
- **FrameDiT-H（Hybrid）**：并行运行局部时序注意力与全局矩阵注意力两个分支，通过拼接+线性投影融合（而非 softmax 门控，因其存在梯度消失问题）
- **即插即用集成**：冻结预训练 DiT 参数，仅训练新增的矩阵注意力模块，可直接集成到 Latte、OpenSora 等现有架构
- **高效长视频扩展**：在 128 帧生成任务中，FrameDiT-H 仅增加约 5% 的计算开销，而 Full 3D Attention 增加超过 200%
- **SOTA 性能**：在 UCF-101、Sky Time-lapse、Taichi-HD、FaceForensics 四个数据集上均取得最优 FVD；在 VBench 文本到视频基准上显著提升动态程度（Dynamic Degree 从 42.50 提升至 70.83）

#### 🔬 深入细节

##### 架构总览

![FrameDiT 架构示意图](https://arxiv.org/html/2603.09721v1/x2.png)
*图：(a) 标准 Local Factorized Attention 仅在相同空间位置做时序关联；(b) FrameDiT-G 用矩阵注意力替换时序注意力；(c) FrameDiT-H 并行融合局部与全局两个分支。*

![Matrix Attention 机制详解](https://arxiv.org/html/2603.09721v1/x1.png)
*图：Matrix Attention 的核心思想——将每帧视为矩阵，通过行权重矩阵压缩后计算帧级 Frobenius 内积相似度。*

##### 算法伪代码

```python
# Matrix Attention 核心伪代码
# 输入: Z = [z^1, z^2, ..., z^T], 每帧 z^t ∈ R^{N×D}
# 参数: U ∈ R^{N×N_qk} (行权重矩阵), W_Q, W_K, W_V, B_Q, B_K

# Step 1: 构造 Q/K/V
U_norm = softmax(U, dim=0)          # 沿空间维度归一化, R^{N×N_qk}
for t in range(T):
    Q[t] = U_norm.T @ Z[t] @ W_Q + B_Q   # R^{N_qk × D}
    K[t] = U_norm.T @ Z[t] @ W_K + B_K   # R^{N_qk × D}
    V[t] = Z[t] @ W_V                      # R^{N × D}, 不压缩

# Step 2: 计算帧级相似度 (Frobenius 内积)
for i in range(T):
    for j in range(T):
        S[i,j] = frobenius_inner_product(Q[i], K[j]) / sqrt(N_qk * D)
    alpha[i] = softmax(S[i, :])       # 帧级注意力权重

# Step 3: 加权聚合
for i in range(T):
    O[i] = sum(alpha[i,j] * V[j] for j in range(T))  # R^{N × D}

# FrameDiT-H: 并行融合
O_local = local_temporal_attention(Z)   # 标准逐token时序注意力
O_global = matrix_attention(Z)          # 上述矩阵注意力
O_fused = Linear(concat(O_local, O_global, dim=-1))  # 拼接+线性投影
```

##### 动机与背景：视频时序注意力的效率困境

视频扩散 Transformer（Video DiT）通常采用 **空间-时序分离** 的注意力设计。给定视频潜在表示 \(Z \in \mathbb{R}^{T \times N \times D}\)（\(T\) 帧，每帧 \(N\) 个空间 token，维度 \(D\)），现有方案面临两难：

| 方案 | 时序复杂度 | 全局感受野 | 代表方法 |
|------|-----------|-----------|---------|
| Full 3D Attention | \(O(T^2 N^2)\) | ✅ | CogVideoX |
| Local Factorized | \(O(T^2 N + T N^2)\) | ❌ | Latte, OpenSora |
| **Matrix Attention** | \(O(T^2 N_{qk} D + TND)\) | ✅ | **FrameDiT** |

**Full 3D Attention** 将所有 \(T \times N\) 个 token 展平后做全局自注意力，计算量随帧数和分辨率的平方增长，对长视频完全不可行。

**Local Factorized Attention**（如 Latte、OpenSora 采用）将空间和时序注意力完全解耦：时序注意力仅在 **相同空间位置** 的 token 之间计算。这意味着位置 \((x, y)\) 处的 token 只能"看到"其他帧中 \((x, y)\) 处的 token。当视频中存在大幅运动（如物体从画面左侧移动到右侧）时，运动前后的语义对应关系被完全切断。

> 💡 **关键洞察**：FrameDiT 的核心思想是——时序注意力不需要在 token 级别精确匹配，而应在 **帧级别** 建模整体时序关系。一帧的"语义摘要"可以通过对所有空间 token 的加权聚合来获得。

##### 核心机制：矩阵注意力（Matrix Attention）

**标准向量注意力** 中，Q/K/V 都是向量，相似度通过点积计算。**矩阵注意力** 的核心创新是将每帧的 Q/K 保持为 **矩阵** 形式，用 Frobenius 内积替代点积。

**Step 1：行权重压缩构造 Q/K**

对每帧 \(z^t \in \mathbb{R}^{N \times D}\)，通过可学习的行权重矩阵 \(U \in \mathbb{R}^{N \times N_{qk}}\) 将 \(N\) 个空间 token 压缩为 \(N_{qk}\) 行：

$$Q^t = U^\top z^t W_Q + B_Q \in \mathbb{R}^{N_{qk} \times D}$$

$$K^t = U^\top z^t W_K + B_K \in \mathbb{R}^{N_{qk} \times D}$$

其中 \(U\) 经过 softmax 归一化（沿空间维度），使得每一行是所有空间 token 的凸组合。这相当于学习了 \(N_{qk}\) 个"帧摘要视角"，每个视角关注帧内不同的空间区域。

> ⚠️ **注意**：V 矩阵 **不做压缩**，保持 \(V^t = z^t W_V \in \mathbb{R}^{N \times D}\)，确保输出保留完整的空间分辨率。

**Step 2：Frobenius 内积计算帧级相似度**

两帧 \(i, j\) 之间的相似度通过矩阵的 Frobenius 内积计算：

$$s(Q^i, K^j) = \frac{\langle Q^i, K^j \rangle_F}{\sqrt{N_{qk} \cdot D}} = \frac{\text{tr}((Q^i)^\top K^j)}{\sqrt{N_{qk} \cdot D}}$$

Frobenius 内积等价于将矩阵展平为向量后做点积，但保留了矩阵结构的语义——它衡量两帧在 \(N_{qk}\) 个"摘要视角"上的整体一致性。归一化因子 \(\sqrt{N_{qk} \cdot D}\) 类比标准注意力中的 \(\sqrt{d_k}\)。

**Step 3：帧级注意力聚合**

$$\alpha_{ij} = \text{softmax}_j\left(s(Q^i, K^j)\right)$$

$$O^i = \sum_{j=1}^{T} \alpha_{ij} V^j \in \mathbb{R}^{N \times D}$$

注意输出 \(O^i\) 是一个 **矩阵**（而非向量），保持了完整的空间结构。每帧的输出是所有帧 V 矩阵的加权和，权重由帧级相似度决定。

**多头机制**：沿列维度 \(D\) 将 Q/K/V 矩阵切分为 \(h\) 个头，每个头独立计算矩阵注意力后拼接。

**复杂度分析**：
- Q/K 构造：\(O(T \cdot N \cdot N_{qk} \cdot D)\)
- 相似度计算：\(O(T^2 \cdot N_{qk} \cdot D)\)
- 聚合：\(O(T^2 \cdot N \cdot D)\)（但 \(\alpha\) 是标量，实际为广播乘法）
- 总计：\(O(T^2 N_{qk} D + TND)\)，当 \(N_{qk} \ll N\) 时远优于 \(O(T^2 N)\)

##### FrameDiT-G vs FrameDiT-H：两种集成策略

**FrameDiT-G（Global Only）**：直接用矩阵注意力 **替换** DiT 块中的时序注意力。每个 DiT 块的结构变为：空间自注意力 → 矩阵注意力（时序） → FFN。优点是简洁高效，缺点是完全丢失了 token 级的精细时序对应。

**FrameDiT-H（Hybrid Parallel）**：保留原始局部时序注意力，**并行** 添加矩阵注意力分支。两个分支的输出通过拼接后线性投影融合：

$$O = \text{Linear}\left(\text{Concat}(O_{\text{local}}, O_{\text{global}})\right)$$

> ⚠️ **设计选择**：论文尝试了 softmax 门控融合（\(O = \sigma(g) \cdot O_{\text{local}} + (1-\sigma(g)) \cdot O_{\text{global}}\)），但发现 softmax 门控存在梯度消失问题，导致训练不稳定。拼接+线性投影的方式更为稳定且效果更好。

**训练策略**：冻结预训练 DiT 的所有参数，仅训练新增的矩阵注意力模块参数（\(U, W_Q, W_K, W_V, B_Q, B_K\) 及融合层）。这使得 FrameDiT 可以作为即插即用模块集成到任何现有视频 DiT 中。

##### 关键消融实验与结果

**U 矩阵归一化方式**（Table 4）：

| 归一化 | UCF-101 FVD ↓ | Sky FVD ↓ |
|--------|--------------|-----------|
| None | 207.2 | 57.1 |
| L1 | 194.1 | 50.5 |
| L2 | 192.5 | 49.8 |
| **Softmax** | **170.1** | **39.5** |

Softmax 归一化效果最佳，因为它确保 \(U\) 的每列是空间 token 的概率分布，具有明确的"加权摘要"语义。

**压缩维度 \(N_{qk}\) 的影响**（Table 5）：

| \(N_{qk}\) | UCF-101 FVD ↓ | Sky FVD ↓ |
|------------|--------------|-----------|
| 1 | 195.2 | 52.3 |
| 16 | 182.7 | 45.1 |
| **64** | **170.1** | **39.5** |
| 256 | 173.8 | 41.2 |

\(N_{qk} = 64\) 为最优值。值得注意的是，即使 \(N_{qk} = 1\)（每帧仅用一个标量表示帧级相似度），性能仍优于基线 Latte（FVD 357.4），说明帧级时序建模本身就是有效的。

**主要定量结果**（256×256 分辨率，16 帧，类别条件生成）：

| 方法 | UCF-101 FVD ↓ | Sky FVD ↓ | Taichi FVD ↓ | Face FVD ↓ |
|------|--------------|-----------|-------------|------------|
| Latte | 357.4 | 98.5 | 247.0 | 35.9 |
| FrameDiT-G | 213.5 | 56.8 | 143.2 | 22.1 |
| **FrameDiT-H** | **170.1** | **39.5** | **95.5** | **16.6** |

**文本到视频（VBench 基准，集成到 OpenSora）**：

| 方法 | Quality Score ↑ | Dynamic Degree ↑ |
|------|----------------|------------------|
| OpenSora | 80.18 | 42.50 |
| + FrameDiT-G | 81.02 | 62.78 |
| + **FrameDiT-H** | **81.69** | **70.83** |

> 💡 **关键发现**：FrameDiT 最显著的提升在于 **动态程度**（Dynamic Degree 从 42.50 → 70.83），说明帧级全局时序注意力有效解决了局部注意力无法捕捉大幅运动的问题。

![长视频扩展性](https://arxiv.org/html/2603.09721v1/x3.png)
*图：随帧数增加（16→128），FrameDiT 的计算开销增长远低于 Full 3D Attention，同时保持优异的生成质量。*

#### 🧪 练习题

```yaml
question: "FrameDiT 的 Matrix Attention 中，V 矩阵为什么不像 Q/K 一样通过行权重矩阵 U 进行压缩？"
options:
  - "V 矩阵压缩会导致梯度消失"
  - "V 矩阵不参与相似度计算，压缩没有意义"
  - "为了保持输出的完整空间分辨率，V 需要保留所有 N 个空间 token"
  - "V 矩阵的维度已经足够小，不需要压缩"
answer: 2
explain: "Q/K 压缩是为了高效计算帧级相似度（标量），而 V 的加权聚合结果需要作为每帧的输出（R^{N×D}），必须保留完整的 N 个空间 token 以维持空间分辨率。"
```