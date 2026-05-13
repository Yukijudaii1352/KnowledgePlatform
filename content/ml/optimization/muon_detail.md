### Muon

```yaml
id: muon
name: Muon
full_name: "Muon 优化器：可扩展的 LLM 训练优化方法 (Moonlight: Muon is Scalable for LLM Training)"
year: "2025"
org: "Moonshot AI, UCLA"
paper_url: "https://arxiv.org/abs/2502.16982"
category: "optimization"
parent: "—"
motivation: "通过 Newton-Schulz 正交化梯度动量实现矩阵级别的最速下降，以约 52% 的训练 FLOPs 达到 AdamW 同等性能"
```

#### 📝 一句话总结

Muon 将梯度动量通过 Newton-Schulz 迭代正交化后作为更新方向，实现矩阵参数的谱范数（Schatten-∞）最速下降；论文进一步提出 weight decay 与 per-parameter update RMS scaling 两项关键改进，使 Muon 首次成功扩展到 16B 参数 MoE 模型（Moonlight），在相同性能下仅需 AdamW 约 52% 的训练计算量。

#### 🎯 核心要点

- **Newton-Schulz 正交化**：对梯度动量矩阵执行 5 步 Newton-Schulz 迭代，近似计算矩阵极分解（polar decomposition）的正交因子，作为更新方向
- **Weight Decay**：为 Muon 引入解耦 weight decay（类似 AdamW），解决大规模训练中权重发散问题
- **Per-Parameter Update RMS Scaling**：通过乘以 \(0.2 \cdot \sqrt{\max(A, B)}\) 使 Muon 各参数的 update RMS 与 AdamW 匹配，消除矩阵维度不对称带来的更新幅度差异
- **分布式 Muon（Distributed Muon）**：采用 ZeRO-1 风格分片 + DP all-gather 全矩阵，在保持通信效率的同时完成全矩阵 Newton-Schulz 迭代
- **Scaling Law 验证**：在 399M–1.5B 模型上拟合 scaling law，证明 Muon 仅需 ~52% FLOPs 即可匹配 AdamW 的 compute-optimal 性能
- **Moonlight 模型**：3B 激活 / 16B 总参数的 DeepSeek-V3-Small 架构 MoE 模型，使用 5.7T tokens 训练，在多项基准上超越同规模 AdamW 基线

#### 🔬 深入细节

![Muon Scaling Law](https://arxiv.org/html/2502.16982v1/x1.png)
*图：Muon 与 AdamW 的 Scaling Law 对比。Muon 仅需约 52% 的训练 FLOPs 即可达到 AdamW 同等验证损失。*

##### 算法伪代码

```python
# Muon Optimizer (Scalable Version)
# 输入: 参数 W (shape A×B), 学习率 η, 动量系数 μ=0.95, weight decay λ
# Newton-Schulz 系数: a=3.4445, b=-4.7750, c=2.0315

def muon_step(W, grad, momentum_buffer, η, μ=0.95, λ=0.1):
    # 1. 更新动量
    momentum_buffer = μ * momentum_buffer + grad  # EMA of gradients
    G = momentum_buffer
    
    # 2. Newton-Schulz 正交化 (5 iterations)
    # 先对 G 做谱范数归一化
    G = G / spectral_norm(G)
    X = G
    for _ in range(5):
        X = a * X + b * (X @ X.T) @ X + c * (X @ X.T @ X @ X.T) @ X
    O = X  # 正交化后的更新方向
    
    # 3. Per-parameter scaling + weight decay
    scale = 0.2 * sqrt(max(A, B))
    W = W - η * (scale * O + λ * W)
    
    return W, momentum_buffer
```

##### 动机与背景

传统 AdamW 优化器对每个参数元素独立地进行自适应学习率调整，本质上是逐元素的 \(\ell_\infty\) 最速下降。然而对于矩阵形状的权重参数（如 Transformer 中的线性层），更自然的优化视角是在**矩阵空间**中进行最速下降。

Muon（**Mu**-**O**rthogonalized **N**esterov）的核心思想是：在 Schatten-∞ 范数（即谱范数）约束下做最速下降，其最优更新方向恰好是梯度矩阵的**正交因子**（polar decomposition 中的酉矩阵部分）。这等价于对梯度做矩阵符号函数（matrix sign function）运算。

> 💡 关键：AdamW 是逐元素的 \(\ell_\infty\) steepest descent，Muon 是矩阵级别的 Schatten-∞ steepest descent。两者是同一思想在不同范数下的推广。

##### 核心机制：Newton-Schulz 正交化

给定动量矩阵 \(\mathbf{G} \in \mathbb{R}^{A \times B}\)，Muon 通过以下步骤计算正交化更新：

**Step 1: 动量累积**

$$\mathbf{G}_t = \mu \cdot \mathbf{G}_{t-1} + \nabla_{\mathbf{W}} \mathcal{L}(\mathbf{W}_{t-1})$$

**Step 2: 谱范数归一化**

$$\mathbf{X}_0 = \mathbf{G}_t / \|\mathbf{G}_t\|_2$$

其中 \(\|\cdot\|_2\) 为谱范数（最大奇异值）。

**Step 3: Newton-Schulz 迭代（5 步）**

$$\mathbf{X}_{k+1} = a \mathbf{X}_k + b (\mathbf{X}_k \mathbf{X}_k^\top) \mathbf{X}_k + c (\mathbf{X}_k \mathbf{X}_k^\top)^2 \mathbf{X}_k$$

其中 \(a = 3.4445,\ b = -4.7750,\ c = 2.0315\)。经过 5 次迭代后 \(\mathbf{X}_5 \approx \mathbf{O}_t\)，即 \(\mathbf{G}_t\) 极分解的正交因子。

> ⚠️ 注意：Newton-Schulz 迭代要求输入矩阵的谱范数严格小于 1 才能收敛，因此 Step 2 的归一化是必要的。系数 \((a, b, c)\) 经过优化使得在 5 步内即可达到足够精度。

**Step 4: 参数更新**

$$\mathbf{W}_t = \mathbf{W}_{t-1} - \eta_t \left( 0.2 \cdot \mathbf{O}_t \cdot \sqrt{\max(A, B)} + \lambda \mathbf{W}_{t-1} \right)$$

##### Per-Parameter Update RMS Scaling 的设计动机

原始 Muon 的正交化输出 \(\mathbf{O}_t\) 满足 \(\text{RMS}(\mathbf{O}_t) = 1/\sqrt{\min(A,B)}\)，这意味着不同形状矩阵的 update RMS 不一致。例如对于 \([H, 4H]\) 的 MLP 权重和 \([H, H]\) 的 attention 权重，前者的 update RMS 会偏小。

论文提出两种修正方案并最终选择 **Adjusted LR** 方法：将更新乘以 \(\sqrt{\max(A,B)}\)，使得所有参数的 update RMS 统一为 \(\sqrt{\max(A,B)/\min(A,B)} / \sqrt{\min(A,B)} = 1/\sqrt{\min(A,B)} \cdot \sqrt{\max(A,B)}\)。再乘以常数 0.2 使其与 AdamW 的典型 update RMS 匹配。

这一设计使得 Muon 可以**直接复用 AdamW 的最优超参数**（学习率、batch size 等），大幅降低调参成本。

##### 分布式 Muon 实现

Newton-Schulz 迭代需要对**完整矩阵**进行运算（涉及 \(\mathbf{X}\mathbf{X}^\top\) 等全矩阵乘法），这与 ZeRO 的参数分片策略冲突。论文提出的解决方案：

1. **ZeRO-1 分片**：每个 DP rank 只存储部分参数的优化器状态（动量 buffer）
2. **All-Gather 全矩阵**：在执行 NS 迭代前，通过 all-gather 收集完整的动量矩阵
3. **本地 NS 迭代**：每个 rank 独立执行相同的 NS 迭代（确定性运算，结果一致）
4. **切片更新**：NS 迭代后，每个 rank 只保留自己负责的参数切片进行更新

> 💡 关键：NS 迭代的通信开销与 ZeRO-1 的参数 all-gather 重叠，不引入额外通信瓶颈。

##### 与 AdamW 的对比

| 维度 | AdamW | Muon |
|------|-------|------|
| 更新方向 | 逐元素自适应（一阶+二阶矩） | 矩阵正交化（极分解） |
| 范数约束 | \(\ell_\infty\) steepest descent | Schatten-∞ steepest descent |
| 优化器状态 | 2× 参数量（m, v） | 1× 参数量（仅动量） |
| 计算开销 | 逐元素运算 | 矩阵乘法（NS 迭代） |
| 适用参数 | 所有参数 | 仅 ≥2D 矩阵参数（embedding/head 仍用 AdamW） |
| 计算效率 | 基线 | ~2× (52% FLOPs 达同等性能) |

##### Scaling Law 结果

论文在 399M 到 1.5B 参数的 Llama 架构模型上拟合 scaling law：

$$\text{Muon: } L = 2.506 \times C^{-0.052}$$
$$\text{AdamW: } L = 2.608 \times C^{-0.054}$$

Muon 的曲线在各计算预算下均低于 AdamW，且在相同 loss 目标下仅需约 52% 的 FLOPs。

#### 🧪 练习题

```yaml
question: "Muon 优化器中 Newton-Schulz 迭代的主要作用是什么？"
options:
  - "计算梯度的二阶矩估计，实现自适应学习率"
  - "近似计算梯度动量矩阵的极分解正交因子，作为最速下降方向"
  - "对梯度进行低秩近似，减少通信开销"
  - "实现梯度裁剪，防止梯度爆炸"
answer: 1
explain: "Newton-Schulz 迭代用于近似矩阵极分解（polar decomposition），提取动量矩阵的正交因子，该正交因子是 Schatten-∞ 范数下的最速下降方向。"
```