### PermLLM

```yaml
id: permllm
name: PermLLM
full_name: "PermLLM: Permutation Matters — Channel Permutation Learning for N:M Sparsity in Large Language Models"
year: 2025
org: Tsinghua University, NVIDIA
paper_url: https://arxiv.org/abs/2510.10136
category: sparsity_deploy
parent: nm_sparsity
motivation: >
  N:M 结构化稀疏（如 2:4）可被 GPU Sparse Tensor Core 硬件加速，
  但要求每 M 个连续权重中恰好保留 N 个。现有方法（Wanda、RIA 等）
  在固定通道顺序下选择保留权重，而通道排列（channel permutation）
  可以改变哪些权重被分到同一组，从而影响剪枝质量。
  已有的手工排列指标（如最大化保留权重重要性之和）与实际剪枝损失
  相关性极差（Spearman ρ 仅 0.09–0.28），PermLLM 提出将通道排列
  作为可学习参数，通过 Sinkhorn 松弛 + STE 端到端优化，
  显著提升 N:M 稀疏 LLM 的精度。
```

#### 📝 一句话总结

PermLLM 发现手工设计的通道排列指标与实际剪枝损失几乎不相关，转而将排列矩阵参数化为可学习的 Sinkhorn 双随机矩阵，配合 block-wise 分解和 STE 梯度传递，端到端学习最优通道排列，在 LLaMA/Qwen 等模型的 2:4 和 4:8 稀疏下大幅超越现有通道排列方法（如 LLaMA-3.1 8B 2:4 PPL 从 21.09 降至 14.03）。

#### 🎯 核心要点

- **核心发现**：手工排列指标（最大化保留权重重要性之和）与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，说明现有启发式排列策略本质上是在错误的代理目标上优化
- **可微排列学习**：将排列矩阵松弛为双随机矩阵（Sinkhorn 归一化），前向用 Hungarian 算法硬化为真排列矩阵，反向用 STE 穿透离散操作传梯度
- **Block-wise 分解**：将 $C_{in} \times C_{in}$ 排列矩阵分解为 $N_B$ 个 $B \times B$ 块对角矩阵，参数量从 $O(C_{in}^2)$ 降至 $O(C_{in} \cdot B)$，Hungarian 复杂度从 $O(C_{in}^3)$ 降至 $O(C_{in} \cdot B^2)$
- **即插即用**：PermLLM 可与任意 N:M 剪枝指标（Wanda、RIA）组合，仅需 128 条校准样本、约 2.5 小时（7B/4×GPU）即可完成排列学习
- **高效部署**：设计 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生实现加速 84×，排列开销可忽略

#### 🔬 深入细节

##### 问题动机

![Figure 1: 手工排列指标与实际剪枝损失的对比](https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x1.png)

**Figure 1**：对同一层的不同通道排列，手工指标 Score $S$（保留权重重要性之和）最高的排列（左图）实际剪枝损失反而最大；而 Score 较低的排列（右图）实际损失最小。这说明最大化 $S$ 是一个错误的代理目标。

##### 方法概览

![Figure 2: PermLLM 框架](https://ar5iv.labs.arxiv.org/html/2510.10136/assets/x2.png)

**Figure 2**：PermLLM 整体流程。对每个线性层：(1) 学习 block-wise 排列矩阵 $P_B$；(2) 对权重施加排列 $W \cdot P_B$；(3) 基于剪枝指标生成 N:M mask $M$；(4) 最小化稀疏输出与稠密输出的距离。

##### Sinkhorn 可微排列

**核心思想**：排列矩阵 $P \in \{0,1\}^{n \times n}$ 是离散的，无法直接求梯度。PermLLM 将其松弛为双随机矩阵（每行每列之和均为 1 的非负矩阵），通过 Sinkhorn 归一化实现：

$$\hat{P} = \text{Sinkhorn}(W_P, \tau) \quad \text{where} \quad W_P \in \mathbb{R}^{n \times n} \text{ is learnable}$$

Sinkhorn 迭代过程：
1. 初始化：$S^{(0)} = \exp(W_P / \tau)$（温度 $\tau$ 控制软硬程度）
2. 行归一化：$S^{(l)} = S^{(l-1)} \oslash (S^{(l-1)} \mathbf{1} \mathbf{1}^\top)$
3. 列归一化：$S^{(l)} = S^{(l)} \oslash (\mathbf{1} \mathbf{1}^\top S^{(l)})$
4. 重复 $L$ 次（默认 $L=5$），得到软排列 $\hat{P}$

**前向硬化**：用 Hungarian 算法从 $\hat{P}$ 提取最优硬排列 $P^* = \text{Hungarian}(\hat{P})$

**反向 STE**：$\nabla_{W_P} \mathcal{L} = \nabla_{\hat{P}} \mathcal{L}$（梯度直接穿透 Hungarian 操作传给软排列）

**温度退火**：$\tau$ 从 1 线性衰减到 0.1，使训练初期探索充分、后期逼近离散解。

##### Block-wise 排列

全排列矩阵 $P \in \mathbb{R}^{C_{in} \times C_{in}}$ 参数量和 Hungarian 复杂度过高（如 $C_{in}=4096$）。PermLLM 将其分解为块对角结构：

$$P_B = \text{diag}(P_1, P_2, \ldots, P_{N_B}), \quad N_B = C_{in} / B$$

每个 $P_i \in \mathbb{R}^{B \times B}$，默认 $B=64$。这意味着排列只在每个大小为 $B$ 的通道块内进行，跨块通道顺序不变。

**复杂度对比**：

| | 参数量 | Hungarian 复杂度 |
|---|---|---|
| 全排列 | $C_{in}^2$ | $O(C_{in}^3)$ |
| Block-wise | $C_{in} \times B$ | $O(C_{in} \cdot B^2)$ |

当 $B=64, C_{in}=4096$：参数从 16.8M 降至 262K（64×），复杂度从 $O(10^{10})$ 降至 $O(10^6)$。

##### Mask 生成与 STE

给定排列后的权重 $W \cdot P_B^*$ 和剪枝指标（如 Wanda: $|w_{ij}| \cdot \|x_j\|_2$），计算重要性分数 $S$。

**前向**：在每个 M 元素组内，用 argmax 选择 top-N 生成硬 mask $M^*$

**反向**：用 softmax 近似 argmax 以传递梯度：

$$\hat{M}_{ij} = \frac{\exp(S_{ij} / t)}{\sum_{k \in \text{group}} \exp(S_{ik} / t)}$$

STE 使得梯度可以从 mask 传回排列矩阵参数。

##### 损失函数

逐层优化，最小化稀疏层输出与稠密层输出的余弦距离：

$$\mathcal{L} = 1 - \cos(Y_{\text{dense}}, \; Y_{\text{sparse}})$$

其中 $Y_{\text{sparse}} = (M^* \odot (W \cdot P_B^*)) \cdot X$，$Y_{\text{dense}} = W \cdot X$。

##### 算法伪代码

```
Algorithm: PermLLM — Learnable Channel Permutation for N:M Sparsity
Input: 预训练权重 W ∈ R^{C_out × C_in}, 校准集输入 X, 
       block_size B=64, Sinkhorn iter L=5, τ: 1→0.1
Output: 最优排列 P*_B, 稀疏 mask M*

1. 初始化 W_P ∈ R^{N_B × B × B} (N_B = C_in/B 个块)
2. for each training step:
   a. Sinkhorn 归一化:
      for each block i = 1..N_B:
          P̂_i = Sinkhorn(W_P[i], τ)      // 软双随机矩阵
          P*_i = Hungarian(P̂_i)           // 硬排列矩阵
      P*_B = diag(P*_1, ..., P*_NB)
   b. 排列权重: W_perm = W · P*_B
   c. 计算重要性: S = metric(W_perm, X)   // e.g., Wanda
   d. 生成 mask:
      前向: M* = argmax_N:M(S)            // 硬 mask
      反向: M̂ = softmax_N:M(S/t)          // 软 mask (STE)
   e. 稀疏输出: Y_sparse = (M* ⊙ W_perm) · X
   f. 损失: L = 1 - cos(W·X, Y_sparse)
   g. 反向传播: ∇W_P via STE through Hungarian and argmax
   h. 更新 W_P (AdamW, lr ∈ {1e-3, 5e-3})
   i. 线性衰减 τ
3. 返回 P*_B, M*
```

##### 实验结果

**主要结果（WikiText-2 PPL，↓ 更好）**：

| 模型 | 稀疏度 | Wanda | Wanda+CP | PermLLM_Wanda |
|---|---|---|---|---|
| LLaMA-2 7B | 2:4 | 12.03 | 12.02 | **11.07** |
| LLaMA-2 13B | 2:4 | 9.54 | 9.37 | **8.85** |
| LLaMA-3.1 8B | 2:4 | 15.82 | 21.09 | **14.03** |
| Qwen-2.5 7B | 2:4 | 13.10 | 12.83 | **11.63** |

- Wanda+CP 使用手工排列指标（最大化保留权重重要性之和），在 LLaMA-3.1 上反而严重恶化（21.09 vs 15.82），验证了手工指标的不可靠性
- PermLLM 在所有模型和稀疏度设置下均一致优于基线
- 与 RIA 指标组合同样有效：LLaMA-2 7B 2:4 PPL 从 11.49 降至 10.75

**部署效率**：自定义 CUDA kernel 实现 block-wise 排列，相比 PyTorch 原生 `index_select` 加速 **84×**（0.01ms vs 0.84ms per layer），额外延迟可忽略。

**训练开销**：128 条 C4 校准样本，序列长度 1024，LLaMA-2 7B 在 4×A100 上约 2.5 小时。

#### 🧪 练习题

**Q1**：为什么 PermLLM 不直接优化全排列矩阵 $P \in \mathbb{R}^{C_{in} \times C_{in}}$，而要使用 block-wise 分解？如果 block_size 设为 $C_{in}$（即全排列），会发生什么？

<details><summary>参考答案</summary>

全排列矩阵的参数量为 $C_{in}^2$（如 4096² = 16.8M），Hungarian 算法复杂度为 $O(C_{in}^3)$（如 $O(10^{10})$），在 LLM 的每个线性层上都不可接受。Block-wise 分解将参数量降至 $C_{in} \times B$，Hungarian 复杂度降至 $O(C_{in} \cdot B^2)$。如果 $B = C_{in}$，则退化为全排列，训练将极其缓慢且内存不足。论文消融实验表明 $B=64$ 已接近最优，更大的 $B$ 收益递减。

</details>

**Q2**：PermLLM 中有两处使用了 STE（Straight-Through Estimator），分别是哪里？为什么需要 STE？

<details><summary>参考答案</summary>

两处 STE：
1. **排列矩阵硬化**：前向用 Hungarian 算法将软双随机矩阵 $\hat{P}$ 转为硬排列 $P^*$，反向时梯度直接传给 $\hat{P}$（跳过 Hungarian）
2. **Mask 生成**：前向用 argmax 在每个 M 元素组内选 top-N 生成硬 mask $M^*$，反向时用 softmax 近似 argmax 传递梯度

两处都涉及离散操作（Hungarian 和 argmax），其梯度为零或未定义。STE 通过在反向传播时用连续近似替代离散操作，使梯度能够流过这些不可微节点，从而实现端到端优化。

</details>

**Q3**：在 LLaMA-3.1 8B 上，Wanda+CP（手工排列）的 PPL 从 15.82 恶化到 21.09，而 PermLLM 则改善到 14.03。请解释为什么手工排列可能反而损害性能。

<details><summary>参考答案</summary>

手工排列方法（如 Channel Permutation）使用"最大化保留权重重要性之和"作为排列质量指标。但论文 Figure 1 表明，该指标与实际剪枝损失的 Spearman 相关系数仅 0.09–0.28，几乎不相关。这意味着手工指标可能将通道排列到一个看似"重要性分数高"但实际输出误差更大的配置。在 LLaMA-3.1 这种架构上，这种错误代理目标的危害尤为严重，导致排列后的剪枝质量反而不如不排列。PermLLM 直接优化真实目标（稀疏输出与稠密输出的余弦相似度），因此能找到真正最优的排列。

</details>