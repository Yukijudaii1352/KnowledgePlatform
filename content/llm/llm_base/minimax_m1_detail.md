### MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention

#### 📝 一句话总结
MiniMax-M1 是全球首个开源的大规模混合注意力推理模型，通过 Hybrid MoE + Lightning Attention 架构和 CISPO 强化学习算法，以仅 $534,700 的训练成本在 512 张 H800 GPU 上 3 周完成训练，实现与 DeepSeek-R1 等顶尖模型相当的推理性能，同时将长序列生成的 FLOPs 消耗降至 25%。

#### 🎯 核心要点
1. **架构创新**：456B 总参数 / 45.9B 激活，32 专家 MoE，每 7 个 Lightning Attention 块后接 1 个 Softmax Attention 块的混合设计
2. **线性复杂度推理**：Lightning Attention 实现 O(N) 复杂度，生成 100K token 时 FLOPs 仅为 DeepSeek-R1 的 25%
3. **CISPO 算法**：通过裁剪重要性采样权重而非 token 更新来提升 RL 训练效率，优于 PPO/GRPO 等变体
4. **百万级上下文**：原生支持 1M token 上下文，是 DeepSeek-R1 的 8 倍
5. **两阶段 RL 训练**：40K 思维预算 → 80K 思维预算，采用分阶段窗口扩展策略

#### 🔬 深入细节

![Figure 1: 左：主流模型在数学、编程、软件工程、工具使用和长上下文理解上的基准性能对比；右：推理 FLOPs 随生成长度的理论缩放曲线](https://arxiv.org/html/2506.13585v1/extracted/7872847/figures/radar_flops_v4.png)

##### 1. 混合注意力架构设计（Hybrid Attention Architecture）

MiniMax-M1 基于 MiniMax-Text-01 构建，其核心设计理念是**用线性注意力处理长序列依赖，在关键层保留 Softmax 注意力以维持精度**。具体结构如下：

```
[H1: Lightning Attn] → [H2: Lightning Attn] → ... → [H7: Lightning Attn] → [H8: Softmax Attn] → [H9: Lightning Attn] → ...
```

即每 **8 个 Transformer 块** 为一个循环单元，其中 7 个使用 Lightning Attention（线性注意力），1 个使用传统 Softmax Attention。这种设计在长序列推理时显著降低了计算复杂度：

| 模型 | 注意力复杂度 | 64K token FLOPs | 100K token FLOPs |
|------|-------------|-----------------|------------------|
| DeepSeek-R1 (Softmax) | O(N²) | 基准 100% | 基准 100% |
| MiniMax-M1 (Hybrid) | O(N) | < 50% | ≈ 25% |

##### 2. Lightning Attention 的原理与实现

Lightning Attention 是一种 I/O-aware 的线性注意力实现。传统 Linear Attention 的核心公式为：

$$\text{LinearAttn}(Q, K, V) = \frac{Q(K^\top V)}{Q(K^\top \mathbf{1})}$$

其关键优势在于可以通过**右乘结合律**（即先计算 $K^\top V$，再左乘 $Q$），将复杂度从 $O(N^2d)$ 降至 $O(Nd^2)$。然而，朴素的线性注意力在**因果推理**时仍需逐 token 递推。Lightning Attention 巧妙地将计算分为块内（intra-block）和块间（inter-block）两个阶段：

**伪代码（Lightning Attention 前向传播）：**
```python
def lightning_attention(Q, K, V, block_size=128):
    """
    Q, K, V: [batch, seq_len, heads, dim]
    使用 tiling 策略实现 I/O-aware 线性注意力
    """
    N = Q.shape[1]
    d = Q.shape[-1]
    O = torch.zeros_like(Q)

    # 分块计算
    num_blocks = ceil(N / block_size)

    # 块间状态（类似 RNN 的 hidden state）
    KV_state = torch.zeros(batch, heads, d, d)  # K^T V 累积
    K_sum = torch.zeros(batch, heads, d)          # K 求和归一化

    for i in range(num_blocks):
        start = i * block_size
        end = min((i+1) * block_size, N)

        Q_block = Q[:, start:end]
        K_block = K[:, start:end]
        V_block = V[:, start:end]

        # 1. 块间贡献（利用累积状态）
        O_inter = Q_block @ KV_state        # [B, L, d]
        O_norm_inter = Q_block @ K_sum.unsqueeze(-1)  # 归一化项

        # 2. 块内因果注意力（标准 causal linear attention）
        # 对块内使用 mask 保证因果性
        K_cumsum = torch.cumsum(K_block, dim=1)
        KV_intra = torch.einsum('bld,bld->bldd', K_block, V_block)
        KV_intra_cumsum = torch.cumsum(KV_intra, dim=1)
        O_intra = torch.einsum('bld,bldd->bld', Q_block, KV_intra_cumsum)
        O_norm_intra = (Q_block * K_cumsum).sum(dim=-1, keepdim=True)

        # 3. 合并输出
        O_total = O_inter + O_intra
        O_norm = O_norm_inter + O_norm_intra + 1e-8
        O[:, start:end] = O_total / O_norm

        # 4. 更新块间累积状态
        KV_state += K_block.transpose(-1, -2) @ V_block  # 累积 K^T V
        K_sum += K_block.sum(dim=1)  # 累积 K 求和

    return O
```

**深度解读：**
- Lightning Attention 的本质是将线性注意力实现为一种**块级递推计算**，在保持 $O(Nd^2)$ 理论复杂度的同时，通过 I/O-aware 的 tiling 策略最大化 GPU 显存带宽利用率，避免了传统线性注意力在长序列上的显存瓶颈。与 Mamba 等 SSM 不同，Lightning Attention 仍然是**显式的注意力机制**，保留了 $Q, K, V$ 的可解释性。
- 该设计在推理阶段自然支持 KV 缓存沿序列累积，使得**自回归解码的每步复杂度为 O(1)**，而非 Softmax Attention 的 O(N)。这意味着生成 100K token 时的总体计算量仅为 DeepSeek-R1 的约四分之一，大幅降低了大规模推理成本。

##### 3. CISPO：重要性采样权重裁剪的强化学习算法

CISPO（**C**lipped **I**mportance **S**ampling for **P**olicy **O**ptimization）是 MiniMax-M1 提出的新型 RL 算法。其核心思想借鉴了 PPO 的 Clipped Surrogate Objective，但**裁剪的对象从策略概率比改为重要性采样权重**，以进一步提升 RL 训练稳定性。

与 GRPO（DeepSeek-R1 使用的算法）对比，CISPO 的关键区别如下：

**GRPO 的更新目标：**
$$\mathcal{L}^{\text{GRPO}} = -\min\left(r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t\right)$$

其中 $r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\text{old}}(a_t|s_t)}$ 是新旧策略的概率比。

**CISPO 的更新目标（简化版）：**
$$\mathcal{L}^{\text{CISPO}} = -\min\left(w_t \cdot \hat{A}_t, \text{clip}(w_t, 1-\epsilon_{low}, 1+\epsilon_{high}) \cdot \hat{A}_t\right)$$

其中 $w_t$ 是重要性采样权重，且 CISPO 设置了不对称裁剪区间 $\epsilon_{low}^{IS}, \epsilon_{high}^{IS}$：

$$\epsilon_{low}^{IS} = 0.2, \quad \epsilon_{high}^{IS} = 0.3$$

**伪代码（CISPO 训练循环）：**
```python
def cispo_update(policy, old_policy, data, epsilon_low=0.2, epsilon_high=0.3):
    """
    policy: 当前策略网络
    old_policy: 旧策略网络（用于计算重要性采样权重）
    data: 包含 state, action, advantage 的批次数据
    """
    states, actions, advantages = data

    # 1. 计算重要性采样权重
    with torch.no_grad():
        logp_old = old_policy.log_prob(states, actions)

    logp_new = policy.log_prob(states, actions)

    # 重要性采样权重 w = exp(logp_new - logp_old)
    importance_weights = torch.exp(logp_new - logp_old)

    # 2. 计算未裁剪的损失
    unclipped_loss = -importance_weights * advantages

    # 3. CISPO 核心：裁剪重要性采样权重（而非概率比）
    w_clipped = torch.clamp(
        importance_weights,
        min=1.0 - epsilon_low,   # 裁剪下界
        max=1.0 + epsilon_high   # 裁剪上界
    )
    clipped_loss = -w_clipped * advantages

    # 4. 取两者中的较大值（保守更新）
    loss = torch.max(unclipped_loss, clipped_loss).mean()

    # 5. （可选）加入 KL 散度正则化
    kl_penalty = 0.01 * torch.mean((logp_old - logp_new) ** 2)

    return loss + kl_penalty
```

**深度解读：**
- CISPO 与 PPO/GRPO 的核心哲学差异在于**"保护什么"**：PPO 裁剪概率比 $r_t(\theta)$，本质上是限制单步更新的幅度；而 CISPO 直接裁剪重要性采样权重 $w_t$，对应的是累积多步后的分布偏移。在 RL 训练中，由于 CoT（Chain-of-Thought）推理序列可能长达数万 token，多步累积的策略偏移远大于单步，因此 CISPO 在长序列 RL 训练中更为稳定。
- 不对称裁剪区间（$\epsilon_{low}=0.2, \epsilon_{high}=0.3$）允许对正优势样本施加更大的更新幅度，这是一种**乐观探索**机制——鼓励模型在发现有价值的新推理路径时更激进地利用，而对不利探索保持保守。
- 结合 Lightning Attention 的线性复杂度优势，CISPO 使得 MiniMax-M1 能以 512 张 H800 GPU 在 3 周内完成全量 RL 训练，总成本仅 $534,700，相比 DeepSeek-R1 据称的数百万美元训练成本大幅降低。

##### 4. 长上下文 RL 训练的稳定性工程

MiniMax-M1 在扩展到 80K 思维预算的过程中，发现了长序列 RL 训练的**模式坍缩**（Pattern Collapse）问题，并提出了系统性的解决方案：

**问题：** 随着输出长度从 40K 扩展到 80K，模型生成的后半段文本会出现**无意义的重复或乱码**。根因分析发现：
(1) GRPO 的优势归一化（Advantage Normalization）与 token 级损失的不匹配：负样本的长度增长远快于正样本，导致后半段累积大量负梯度；
(2) 梯度分布极广（$10^{-18}$ 到 $10^{-5}$），且相邻迭代间的梯度相关性弱。

**解决方案：**

| 问题 | 解决方案 | 效果 |
|------|---------|------|
| 重复文本导致序列过长 | 重复检测早停（连续 3000 token 概率 > 0.99 则截断） | 消除病态长尾样本 |
| 正负样本长度不平衡 | 结合样本级损失和 token 级归一化 | 缓解负梯度累积 |
| 梯度分布极广 | Adam 参数调整为 $\beta_2=0.95$, eps=$10^{-15}$ | 稳定更新幅度 |
| 大梯度破坏稳定性 | 降低梯度裁剪阈值和 $\epsilon^{IS}_{high}$ | 进一步平滑训练 |

##### 5. 分阶段窗口扩展策略（Staged Window Expansion）

MiniMax-M1-80K 的训练采用了**6 阶段渐进式扩展**方案：
$$40\text{K} \rightarrow 48\text{K} \rightarrow 56\text{K} \rightarrow 64\text{K} \rightarrow 72\text{K} \rightarrow 80\text{K}$$

每阶段的切换依据两个经验性指标：
- **生成序列的困惑度收敛**：当 perplexity 不再下降时触发扩展
- **99 百分位输出长度接近当前窗口上限**：表明模型已充分利用现有预算

这一策略的核心思想与课程学习（Curriculum Learning）一致：逐步增加任务难度，让模型在每一步都有充足的"舒适区"来适应新的生成长度，避免了直接从 40K 跳到 80K 导致的训练崩溃。

---

**练习题 (可选)：**

1. Lightning Attention 的块间状态 $KV_{state} = K^\top V$ 如何实现因果性？为什么"先算 $K^\top V$" 的右乘结合律在因果序列中仍然成立？
2. CISPO 使用不对称裁剪区间 $[1-\epsilon_{low}, 1+\epsilon_{high}]$ 且 $\epsilon_{high} > \epsilon_{low}$。这一设计是否可能导致训练中的乐观偏差（Optimism Bias）？为什么 MiniMax-M1 在实践中反而更稳定？
3. 比较 MiniMax-M1 的分阶段窗口扩展与 DeepSeek-R1 的"冷启动"训练策略的异同，各自适用什么场景？
