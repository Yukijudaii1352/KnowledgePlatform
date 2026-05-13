### SparseGPT

```yaml
id: sparsegpt
name: SparseGPT
full_name: "SparseGPT: Massive Language Models Can Be Accurately Pruned in One-Shot"
year: 2023
org: ISTA
paper_url: https://arxiv.org/abs/2301.00774
category: pruning
parent: gptq
motivation: 首个支持千亿参数模型一键剪枝
```

#### 📝 一句话总结

SparseGPT 提出了一种基于近似二阶信息的高效逐层剪枝方法，首次实现了对 OPT-175B / BLOOM-176B 等千亿参数大语言模型的一次性（one-shot）剪枝，在单张 A100 GPU 上约 4 小时即可将模型压缩至 50–60% 非结构化稀疏度，且几乎无精度损失。

#### 🎯 核心要点

- **逐层稀疏重建问题**：将全局剪枝分解为逐层最小化 \(\|\mathbf{W}\mathbf{X} - (\mathbf{M} \odot \hat{\mathbf{W}})\mathbf{X}\|_F^2\)，避免端到端反向传播
- **基于 OBS 的列式贪心剪枝**：按列顺序逐一剪枝，每次利用 Hessian 逆的闭式解更新未剪枝权重以补偿误差
- **部分更新（Partial Updates）**：仅更新尚未处理的列子集 \(U\)，将更新限制在"未来"权重上，保证已剪枝列不被回改
- **Hessian 同步**：所有行共享同一 Hessian 逆矩阵 \((\mathbf{H}_U)^{-1}\)，通过 Gaussian Elimination 递推更新，单步 \(O(d^2)\)，总复杂度 \(O(d_{\text{col}}^3)\)
- **自适应掩码选择**：以 \(B_s = 128\) 列为一块，在块内按 OBS 误差排序选择 \(p\%\) 最小权重剪枝，兼顾全局与局部最优
- **半结构化 n:m 稀疏**：令 \(B_s = m\)（如 \(m=4\) 对应 2:4 模式），天然适配 NVIDIA Ampere 硬件加速
- **联合稀疏化 + 量化**：在同一遍扫描中同时执行剪枝与权重量化（Eq. 7），50% 稀疏 + 4-bit 优于等存储量的 GPTQ 3-bit
- **规模效应**：模型越大越容易剪枝——OPT-175B 在 50% 稀疏度下 ZeroShot 平均精度甚至略高于稠密基线

#### 🔬 深入细节

##### 示意图

![SparseGPT sparsity-perplexity trade-off on OPT-175B](https://arxiv.org/html/2301.00774v4/extracted/5005954/figs/opt-175b.png)
*图：OPT-175B 在不同稀疏度下的 WikiText2 困惑度对比。Magnitude Pruning 在 10% 稀疏度即崩溃，SparseGPT 可达 60% 稀疏度仍保持接近稠密基线的困惑度。*

##### 算法伪代码

```python
# SparseGPT 核心算法（单层）
# 输入: 权重 W ∈ R^{d_row × d_col}, Hessian H = 2·X·X^T, 目标稀疏度 p%
# 输出: 稀疏化后的权重 Ŵ

H_inv = cholesky(inverse(H))  # Cholesky 分解 H^{-1}，O(d_col^3)
E = zeros(d_row, B)           # 误差缓存

for i in range(0, d_col, B):           # B: lazy batch size (e.g. 128)
    for j in range(i, i + B, B_s):     # B_s: mask selection block (e.g. 128)
        # === 自适应掩码选择 ===
        # 对 W[:, j:j+B_s] 中每个权重计算 OBS 误差 w_jk^2 / [H_inv]_{jk,jk}
        # 选择误差最小的 p% 权重设为 0 → 得到掩码 M[:, j:j+B_s]

        for k in range(j, j + B_s):    # 逐列处理
            # === 剪枝 + 权重更新 ===
            if M[:, k] == 0:           # 该列被剪枝
                err = W[:, k] / H_inv[k, k]
            else:
                err = 0
            W[:, k] = M[:, k] * W[:, k]  # 应用掩码
            E[:, k - i] = err
            # 更新后续列: W[:, k+1:i+B] -= err · H_inv[k, k+1:i+B]
            W[:, k+1:i+B] -= err.unsqueeze(1) * H_inv[k, k+1:i+B].unsqueeze(0)

    # === Lazy batch 更新 ===
    # 将累积误差传播到所有未处理列
    W[:, i+B:] -= E @ H_inv[i:i+B, i+B:]
```

##### 动机与背景

传统剪枝方法（如 Magnitude Pruning、Lottery Ticket 等）依赖大量重训练（retraining）来恢复精度，而 GPT 规模模型的训练成本极其高昂（OPT-175B 训练需数千 GPU 天），使得这些方法在实践中不可行。

已有的后训练（post-training）剪枝方法如 AdaPrune 基于 Optimal Brain Surgeon（OBS）框架，虽然不需要重训练，但其复杂度为 \(O(d_{\text{row}} \cdot d_{\text{col}}^3)\)——对于 GPT-175B 中 \(d = 12288\) 的线性层，单层需约 \(10^{13}\) 次运算，完全不可扩展。

SparseGPT 的核心贡献在于：**将 OBS 剪枝的复杂度从 \(O(d_{\text{row}} \cdot d_{\text{col}}^3)\) 降至 \(O(d_{\text{col}}^3 + d_{\text{row}} \cdot d_{\text{col}}^2)\)**，使千亿参数模型的剪枝在单 GPU 上成为可能。

##### 核心机制详解

**1. 逐层稀疏重建问题**

SparseGPT 将全局剪枝分解为独立的逐层子问题。对于每一层，目标是找到稀疏掩码 \(\mathbf{M}\) 和更新后的权重 \(\hat{\mathbf{W}}\)，最小化：

$$\min_{\mathbf{M}, \hat{\mathbf{W}}} \|\mathbf{W}\mathbf{X} - (\mathbf{M} \odot \hat{\mathbf{W}})\mathbf{X}\|_F^2$$

其中 \(\mathbf{X}\) 是该层的输入激活（通过少量校准数据前向传播获得）。定义 Hessian \(\mathbf{H} = 2\mathbf{X}\mathbf{X}^T\)，问题等价于：

$$\min_{\mathbf{M}, \hat{\mathbf{W}}} \|\mathbf{W} - \mathbf{M} \odot \hat{\mathbf{W}}\|_{\mathbf{H}}^2$$

> 💡 关键：联合优化掩码和权重是 NP-hard 问题，SparseGPT 通过贪心列式处理将其转化为一系列可解的子问题。

**2. OBS 闭式更新**

当决定剪枝第 \(j\) 列时，OBS 给出最优的权重补偿公式：

$$\boldsymbol{\delta}_j = -\frac{w_j}{[\mathbf{H}^{-1}]_{jj}} \cdot \mathbf{H}^{-1}_{:,j}$$

即将第 \(j\) 列权重置零后，按 Hessian 逆的第 \(j\) 列方向对所有其他权重进行补偿更新，更新幅度与 \(w_j / [\mathbf{H}^{-1}]_{jj}\) 成正比。对应的剪枝误差为：

$$\varepsilon_j = \frac{w_j^2}{[\mathbf{H}^{-1}]_{jj}}$$

**3. 部分更新与 Hessian 同步**

SparseGPT 的关键洞察是：**不需要更新所有权重，只需更新尚未处理的列**。定义 \(U_j\) 为第 \(j\) 步时尚未处理的列集合，则：

- 更新限制在 \(U_j\) 上仍然是 \(U_j\) 范围内的最优解
- 所有行的 \(U_j\) 相同 → 可共享同一个 \((\mathbf{H}_{U_j})^{-1}\)
- \(U_{j+1} = U_j \setminus \{j\}\)，对应的逆矩阵可通过 Gaussian Elimination 在 \(O(|U_j|^2)\) 内递推更新

> ⚠️ 注意：这一"Hessian 同步"是 SparseGPT 相比传统 OBS 的核心加速来源——将 \(d_{\text{row}}\) 次独立的 \(O(d_{\text{col}}^3)\) Hessian 求逆合并为一次共享的 \(O(d_{\text{col}}^3)\) 递推序列。

**4. 自适应掩码选择**

固定列顺序的贪心策略可能导致次优掩码。SparseGPT 引入分块自适应机制：

- 将 \(d_{\text{col}}\) 列分为大小 \(B_s = 128\) 的块
- 在每个块内，根据 OBS 误差 \(w_{ij}^2 / [\mathbf{H}^{-1}]_{jj}\) 选择误差最小的 \(p\%\) 权重剪枝
- 块间按固定顺序处理，块内自适应选择

这在全局最优（\(B_s = d_{\text{col}}\)，计算不可行）和纯贪心（\(B_s = 1\)）之间取得了良好平衡。

**5. 半结构化稀疏与联合量化**

对于 n:m 半结构化稀疏（如 NVIDIA 的 2:4 模式），只需设置 \(B_s = m\)，在每 \(m\) 个连续权重中保留 \(n\) 个。

联合量化通过修改误差公式实现：

$$\mathbf{E}_{:,j} = \frac{\mathbf{W}_{:,j} - \mathbf{M}_{:,j} \cdot \text{quant}(\mathbf{W}_{:,j})}{[\mathbf{H}^{-1}]_{jj}}$$

在同一遍列扫描中同时完成剪枝和量化，无额外计算开销。

##### 关键实验结果

| 模型 | 方法 | 稀疏度 | ZeroShot 平均精度 |
|------|------|--------|------------------|
| OPT-175B | Dense | 0% | 70.29 |
| OPT-175B | Magnitude | 50% | 31.10（崩溃） |
| OPT-175B | **SparseGPT** | **50%** | **70.52** |
| OPT-175B | SparseGPT | 4:8 | 69.62 |
| OPT-175B | SparseGPT | 2:4 | 69.11 |

核心发现：
- **Magnitude Pruning 在所有规模上均崩溃**，而 SparseGPT 在 50% 稀疏度下精度甚至略优于稠密基线
- **规模效应显著**：OPT-2.7B 约损失 1 点困惑度，OPT-66B 几乎无损，OPT-175B 反而略有提升
- OPT-175B 可达 **60% 稀疏度**仍保持合理困惑度；Magnitude Pruning 在 10% 即崩溃
- **50% 稀疏 + 4-bit 量化**优于等存储量的 GPTQ 3-bit（OPT-175B: 8.29 vs 8.68 困惑度）
- 2:4 半结构化在最大模型上仅增加 0.39 困惑度
- **后层更敏感**：跳过最后 1/3 层的 2:4 剪枝效果最佳

##### 与传统方法的对比

| 维度 | Magnitude Pruning | AdaPrune (OBS) | SparseGPT |
|------|-------------------|----------------|-----------|
| 需要重训练 | 通常需要 | 否 | 否 |
| 单层复杂度 | \(O(d)\) | \(O(d_{\text{row}} \cdot d_{\text{col}}^3)\) | \(O(d_{\text{col}}^3 + d_{\text{row}} \cdot d_{\text{col}}^2)\) |
| 175B 模型可行性 | ✅（但精度崩溃） | ❌（内存/时间不可行） | ✅（~4h, 单 A100） |
| 精度（50% 稀疏） | 崩溃 | N/A | 接近无损 |
| 支持 n:m 稀疏 | 否 | 否 | ✅ |
| 支持联合量化 | 否 | 否 | ✅ |

#### 🧪 练习题

```yaml
question: "SparseGPT 相比传统 OBS 剪枝方法的核心加速来源是什么？"
options:
  - "使用更小的校准数据集减少 Hessian 计算量"
  - "所有行共享同一 Hessian 逆矩阵，通过递推更新避免重复求逆"
  - "用 Magnitude 代替 OBS 误差进行掩码选择"
  - "将逐层问题转化为全局优化问题"
answer: 1
explain: "SparseGPT 的关键洞察是所有行的未处理列集合 U_j 相同，因此可共享同一个 (H_{U_j})^{-1}，通过 Gaussian Elimination 递推更新，将复杂度从 O(d_row·d_col³) 降至 O(d_col³ + d_row·d_col²)。"
```