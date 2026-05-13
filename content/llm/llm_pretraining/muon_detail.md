### Muon 优化器 (Muon is Scalable for LLM Training)

```yaml
id: muon
name: Muon
full_name: "Muon 优化器 (Muon is Scalable for LLM Training)"
year: 2025
org: Moonshot AI
paper_url: "https://arxiv.org/abs/2502.16982"
category: foundation
parent: "—"
motivation: "通过Newton-Schulz迭代对梯度动量进行正交化，实现谱范数下的最速下降，以约50%的训练FLOPs达到AdamW同等性能"
```

#### 📝 一句话总结

Muon 通过 Newton-Schulz 迭代对梯度动量进行正交化，实现谱范数下的最速下降方向，并引入 weight decay 与 update RMS 匹配机制使其可扩展至大规模 LLM 训练，仅需约 **50% 的训练 FLOPs** 即可达到 AdamW 同等性能。

#### 🎯 核心要点

- **谱范数最速下降**：Muon 将梯度动量矩阵正交化（取其最近正交矩阵），等价于在谱范数约束下的最速下降方向，比 AdamW 的逐元素缩放更高效利用矩阵结构
- **Newton-Schulz 迭代**：使用 5 次多项式迭代 \(X_{k+1} = a X_k + b X_k^3 + c X_k^5\) 近似矩阵极分解，完全由矩阵乘法组成，GPU 友好且无需 SVD
- **Weight Decay 稳定训练**：原始 Muon 无 weight decay 导致权重范数膨胀、训练不稳定；引入 \(\lambda = 0.1\) 的 weight decay 解决此问题
- **Update RMS 匹配**：通过 \(\text{lr} \times \sqrt{\max(m, n)/n} \times 0.2\) 的缩放因子，使 Muon 的 update RMS 与 AdamW 对齐，可直接复用 AdamW 的超参数
- **分布式 ZeRO-1 实现**：每个 GPU 仅存储部分参数的动量，通过 all-gather 拼接后执行 Newton-Schulz 迭代，内存开销仅为 AdamW 的约 50%
- **混合策略**：2D 权重矩阵使用 Muon，1D 参数（bias、LayerNorm、embedding）仍使用 AdamW
- **Scaling Law 验证**：在 1.5B 到 16B 参数规模上验证，Muon 的 scaling law 曲线始终优于 AdamW，仅需约 52% FLOPs 匹配同等损失
- **Moonlight 模型**：基于 Muon 训练的 3B/16B MoE 模型（5.7T tokens），在多项基准上超越同规模竞品

#### 🔬 深入细节

##### 核心框架图

![Muon vs AdamW Scaling Law](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x1.png)
*图 1(a)：Muon 与 AdamW 在不同 FLOPs 预算下的验证损失对比。Muon 在所有计算预算下均优于 AdamW，且差距随规模增大而保持。*

![Moonlight MMLU 对比](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x2.png)
*图 1(b)：Moonlight（Muon 训练）与其他同规模模型在 MMLU 上的对比，展示了 Muon 在下游任务上的优势。*

##### 算法伪代码

```python
# Muon 优化器核心算法（含 weight decay 和 update RMS 匹配）
# 输入: 参数 θ, 学习率 η, 动量系数 μ, weight decay λ, NS迭代次数 k=5
# NS多项式系数: a=3.4445, b=-4.7750, c=2.0315

def muon_step(θ, grad, momentum_buffer, η, μ=0.95, λ=0.1):
    # 1. 更新动量（Nesterov 风格）
    buf = μ * momentum_buffer + grad
    grad_with_nesterov = grad + μ * buf
    
    # 2. Newton-Schulz 迭代正交化（仅对 2D 权重矩阵）
    G = grad_with_nesterov  # shape: (m, n)
    # 初始缩放使谱范数约为 1
    G = G / (G.norm() + 1e-7)
    
    # 5 次 NS 迭代
    for _ in range(5):
        A = G @ G.T                    # (m, m)
        G = 3.4445 * G - 4.7750 * (A @ G) + 2.0315 * (A @ A @ G)
    
    # 3. Update RMS 匹配缩放
    m, n = θ.shape
    scale = 0.2 * sqrt(max(m, n) / n)
    
    # 4. 参数更新（含 weight decay）
    θ = θ - η * (scale * G + λ * θ)
    
    return θ, buf
```

```python
# 分布式 Muon（ZeRO-1 风格）
# 每个 GPU rank 仅存储 1/world_size 的动量

def distributed_muon_step(θ_full, grad_full, local_momentum, rank, world_size):
    # 每个 rank 只处理自己负责的参数分片
    chunk_size = len(θ_full) // world_size
    local_grad = grad_full[rank * chunk_size : (rank+1) * chunk_size]
    
    # 本地更新动量
    local_momentum = μ * local_momentum + local_grad
    local_nesterov = local_grad + μ * local_momentum
    
    # All-gather 拼接完整动量矩阵
    full_nesterov = all_gather(local_nesterov)  # 通信
    
    # 在完整矩阵上执行 Newton-Schulz 迭代
    G = newton_schulz_orthogonalize(full_nesterov, k=5)
    
    # 取回本地分片进行参数更新
    local_update = G[rank * chunk_size : (rank+1) * chunk_size]
    θ_local = θ_local - η * (scale * local_update + λ * θ_local)
```

##### 动机与背景

**AdamW 的局限性**：AdamW 通过逐元素的二阶矩估计来缩放梯度，本质上是在 \(\ell_\infty\) 范数约束下的最速下降。这种逐元素操作忽略了权重矩阵的矩阵结构，无法利用梯度矩阵的奇异值分布信息。

**Muon 的核心洞察**：对于权重矩阵 \(W \in \mathbb{R}^{m \times n}\)，更自然的约束应该是谱范数（最大奇异值）。在谱范数约束下的最速下降方向恰好是梯度矩阵的**正交极因子**（orthogonal polar factor），即将梯度 SVD 分解 \(G = U \Sigma V^T\) 后取 \(UV^T\)。

> 💡 **关键直觉**：正交化后的更新方向 \(UV^T\) 保留了梯度的方向信息但移除了奇异值的不均匀缩放，使得所有方向上的更新幅度一致，避免了某些方向更新过大或过小的问题。

##### Newton-Schulz 迭代的数学原理

直接计算 SVD 代价高昂且不适合 GPU 并行。Muon 使用 **Newton-Schulz 迭代** 来近似极分解：

$$X_{k+1} = a X_k + b X_k (X_k^T X_k) + c X_k (X_k^T X_k)^2$$

其中 \(a = 3.4445, b = -4.7750, c = 2.0315\)，这些系数经过优化以最大化收敛速度。

**为什么只需 5 次迭代？** 初始矩阵经过谱范数归一化后，其奇异值已经在 \([0, 1]\) 范围内。5 次迭代足以将所有奇异值映射到接近 1（即正交化），因为每次迭代都是一个 5 阶多项式映射 \(\sigma \mapsto (a + b\sigma^2 + c\sigma^4) \cdot \sigma\)，在 \([0, 1]\) 上快速收敛到恒等函数。

**计算复杂度**：每次迭代仅涉及矩阵乘法，5 次迭代共需约 15 次矩阵乘法。对于 \(m \times n\) 矩阵，总 FLOPs 约为 \(O(15 \cdot m \cdot n \cdot \min(m,n))\)，远小于前向/反向传播的计算量。

##### Weight Decay 的必要性

![Weight Decay 消融实验](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x3.png)
*图 2：AdamW（绿色）、无 weight decay 的 Muon（红色）、有 weight decay 的 Muon（蓝色）的验证损失曲线。无 weight decay 的 Muon 在训练后期出现损失上升。*

原始 Muon 没有 weight decay，导致两个问题：

1. **权重范数膨胀**：正交化更新的范数恒定（不随权重大小调整），缺乏隐式正则化效果
2. **训练不稳定**：在大规模训练中（>100B tokens），权重范数持续增长最终导致训练崩溃

> ⚠️ **注意**：AdamW 的逐元素归一化天然具有一定的权重范数控制效果（大权重对应大梯度时更新比例较小），而 Muon 的正交化更新不具备此性质，因此显式 weight decay 是必需的。

论文实验表明 \(\lambda = 0.1\) 在所有规模上都表现良好，无需针对模型大小调整。

##### Update RMS 匹配机制

这是使 Muon 可扩展的关键工程创新。核心问题是：**如何让 Muon 直接复用 AdamW 经过大量调参得到的学习率？**

**观察**：AdamW 的 update RMS（参数更新的均方根）约为 \(\text{lr} \times 0.2\)（因为 Adam 的二阶矩归一化使 update 幅度约为 1，再乘以 lr）。

**Muon 的 update RMS 推导**：正交化后的矩阵 \(G \in \mathbb{R}^{m \times n}\) 满足 \(\|G\|_F^2 = \min(m, n)\)（正交矩阵的 Frobenius 范数等于其秩），因此：

$$\text{RMS}(G) = \sqrt{\frac{\|G\|_F^2}{m \cdot n}} = \sqrt{\frac{\min(m, n)}{m \cdot n}} = \frac{1}{\sqrt{\max(m, n)}}$$

为了匹配 AdamW 的 update RMS \(\approx \text{lr} \times 0.2\)，Muon 的缩放因子设为：

$$\text{scale} = 0.2 \times \sqrt{\frac{\max(m, n)}{n}}$$

> 💡 **关键**：这个匹配使得 Muon 可以直接使用 AdamW 的学习率、warmup 策略和 decay schedule，大幅降低了超参数搜索成本。实验验证（Table 1）显示匹配后的 update RMS 在 \(10^{-4}\) 量级上与 AdamW 一致。

##### 分布式实现与内存优化

Muon 采用类似 ZeRO-1 的分布式策略：

| 组件 | AdamW | Muon |
|------|-------|------|
| 优化器状态 | 动量 + 二阶矩 = **2份** | 仅动量 = **1份** |
| 分布式策略 | 每 GPU 存全部状态 | 每 GPU 存 1/N 动量 |
| 通信 | 梯度 all-reduce | 动量 all-gather |
| 内存占用 | 2× 参数量 | ~0.5× 参数量（分片后） |

Newton-Schulz 迭代需要完整的动量矩阵，因此在迭代前需要 all-gather 操作。但由于 Muon 只需存储一份动量（而非 AdamW 的动量+二阶矩两份），分片后的总内存开销反而更低。

##### Scaling Law 分析

![Scaling Law 拟合曲线](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x4.png)
*图 3：Muon 和 AdamW 的 Scaling Law 拟合曲线。Muon 在所有 FLOPs 预算下均低于 AdamW。*

论文在 1.5B–16B 参数规模上进行了系统的 scaling law 实验，使用 Chinchilla 风格的拟合：

$$L(C) = A \cdot C^{-\alpha} + L_\infty$$

拟合结果：

| 优化器 | \(A\) | \(\alpha\) | \(L_\infty\) |
|--------|-------|-----------|-------------|
| Muon | 2.506 | 0.052 | 2.839 |
| AdamW | 2.608 | 0.054 | 2.857 |

关键发现：**Muon 仅需约 52% 的 FLOPs 即可达到 AdamW 相同的验证损失**。两者的 \(\alpha\)（缩放指数）接近，说明 Muon 的优势是一个近似恒定的乘法因子，而非改变缩放规律本身。

##### SVD 熵分析

![SVD 熵分析](https://ar5iv.labs.arxiv.org/html/2502.16982/assets/x5.png)
*图 4：不同训练阶段权重矩阵的 SVD 熵。Muon 训练的模型具有更高的 SVD 熵，说明奇异值分布更均匀。*

论文通过 SVD 熵（对归一化奇异值计算信息熵）分析了 Muon 与 AdamW 训练的权重矩阵差异：

$$H = -\sum_i \hat{\sigma}_i \log \hat{\sigma}_i, \quad \hat{\sigma}_i = \frac{\sigma_i}{\sum_j \sigma_j}$$

Muon 训练的模型在所有层类型（attention QKV、output projection、FFN）上都具有更高的 SVD 熵，意味着：
- 权重矩阵的奇异值分布更均匀
- 模型利用了更多的方向来编码信息
- 有效秩更高，表示能力更强

> 💡 **关键直觉**：Muon 的正交化更新天然倾向于均匀化奇异值——因为更新方向 \(UV^T\) 的所有奇异值都是 1，不会像 AdamW 那样因梯度奇异值不均匀而导致某些方向被过度更新。

##### Moonlight 模型实验结果

Moonlight 是基于 Muon 训练的 3B 激活 / 16B 总参数的 MoE 模型，在 5.7T tokens 上训练。

**与 AdamW 基线对比（1.2T tokens）**：

| 基准 | Moonlight (Muon) | Moonlight-A (AdamW) |
|------|------------------|---------------------|
| MMLU | 59.1 | 55.5 |
| MATH-500 | 30.0 | 22.8 |
| HumanEval | 53.7 | 48.8 |
| MBPP | 56.3 | 54.3 |
| GSM8K | 60.0 | 50.0 |

Muon 在所有基准上均优于 AdamW，尤其在数学（MATH +7.2）和代码（HumanEval +4.9）任务上优势显著。

**与同规模开源模型对比（5.7T tokens）**：

| 基准 | Moonlight | Llama-3.2-3B (9T) | Qwen2.5-3B (18T) |
|------|-----------|-------------------|-------------------|
| MMLU | 62.6 | 63.4 | 65.6 |
| MATH-500 | 42.4 | 44.4 | 42.4 |
| HumanEval | 68.3 | 36.0 | 42.7 |
| GSM8K | 71.7 | 54.4 | 79.2 |

Moonlight 仅用 5.7T tokens 即在 HumanEval 上大幅超越使用 9T/18T tokens 训练的竞品，在 MATH 上与 Qwen2.5-3B 持平，展示了 Muon 的数据效率优势。

##### 与 AdamW 的本质区别

| 维度 | AdamW | Muon |
|------|-------|------|
| 更新方向 | 逐元素梯度/二阶矩 | 梯度动量的正交极因子 |
| 范数约束 | \(\ell_\infty\) 最速下降 | 谱范数最速下降 |
| 矩阵结构利用 | ❌ 忽略 | ✅ 利用奇异值结构 |
| 优化器状态 | 2 份（\(m_t, v_t\)） | 1 份（\(m_t\)） |
| 适用参数 | 所有参数 | 仅 2D 权重矩阵 |
| Weight decay | 解耦式 | 同样解耦式（\(\lambda=0.1\)） |

#### 🧪 练习题

```yaml
question: "Muon 优化器使用 Newton-Schulz 迭代的主要目的是什么？"
options:
  - "计算梯度矩阵的逆，实现二阶优化"
  - "近似梯度动量矩阵的极分解，获取正交化更新方向"
  - "对梯度进行低秩近似以减少通信量"
  - "估计梯度的二阶矩以实现自适应学习率"
answer: 1
explain: "Newton-Schulz 迭代用于近似矩阵极分解 G = U Σ V^T → UV^T，将梯度动量正交化为最近正交矩阵，实现谱范数下的最速下降方向。"
```