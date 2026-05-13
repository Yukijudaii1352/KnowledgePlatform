### 弹性扩散Transformer (Elastic Diffusion Transformer)

```yaml
id: e-dit
name: E-DiT
full_name: 弹性扩散Transformer (Elastic Diffusion Transformer)
year: '2026'
org: Multiple Institutions
paper_url: https://arxiv.org/abs/2602.13993
category: diffusion
parent: dynamic-dit
motivation: 弹性宽度调整优化推理效率
```

#### 📝 一句话总结

E-DiT 为每个 DiT block 引入轻量级路由器（Router），在推理时**自适应地跳过冗余 block 并动态缩减 MLP 宽度**，结合 block 级特征缓存机制，在 Qwen-Image、FLUX 和 Hunyuan3D-3.0 上实现约 2× 加速且几乎无质量损失。

#### 🎯 核心要点

- **轻量路由器（Router）**：每个 DiT block 配备一个参数量极小的路由器，基于输入 latent 和时间步条件，预测该 block 的跳过概率 \(p_g\) 和 MLP 最优宽度比 \(p_w\)
- **Block 跳过机制**：路由器输出经 Sigmoid 后通过 Straight-Through Estimator（STE）二值化（阈值 \(\tau=0.5\)），实现端到端可微的 block 级跳过决策
- **MLP 弹性宽度缩减**：从候选集 \(\{1/4, 1/2, 3/4, 1\}\) 中选择最优 MLP 宽度比，训练时用 activation masking 保持梯度流，推理时直接矩阵切片
- **联合训练目标**：性能损失 \(\mathcal{L}_{\text{perf}}\)（flow-matching）+ 效率损失 \(\mathcal{L}_{\text{eff}}\)（gating + width 正则），权重 \(\lambda=1\)，从全容量预训练权重初始化
- **Block 级特征缓存**：推理时对"边界区域"（\(p_g \in [\tau, \tau+\delta]\)）的 block 复用缓存残差 \(\Delta\)，最多连续复用 \(K\) 步，无需额外训练
- **广泛验证**：在 2D 图像（Qwen-Image、FLUX）和 3D 资产（Hunyuan3D-3.0）三大模型上均取得约 2× 加速，质量指标几乎无下降

#### 🔬 深入细节

![E-DiT 整体框架](https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x1.png)
*图 1：E-DiT 整体框架。每个 DiT block 配备轻量路由器，动态决定 block 跳过与 MLP 宽度缩减；推理时结合 block 级特征缓存进一步消除冗余计算。*

![E-DiT 路由器架构与训练细节](https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x2.png)
*图 2：路由器架构细节。路由器接收 block 输入特征，经时间步条件 LayerNorm 调制后，通过线性层映射到隐藏维度 \(H_r\)，再分别输出 gating head（1 维）和 width head（4 维）。*

```python
# E-DiT 推理伪代码
def e_dit_inference(x, t, blocks, routers, cache, delta, K, tau):
    """
    x: 输入 latent [B, N, D]
    t: 时间步
    blocks: DiT block 列表
    routers: 对应路由器列表
    cache: 每个 block 的缓存残差 {block_id: (Delta, reuse_count)}
    delta: 边界区域宽度
    K: 最大连续复用次数
    tau: 跳过阈值 (默认 0.5)
    """
    for i, (block, router) in enumerate(zip(blocks, routers)):
        # Step 1: 路由器预测
        p_g, p_w = router(x, t)  # p_g: 跳过概率, p_w: 宽度分布

        # Step 2: Block 跳过决策
        if p_g > tau + delta:
            # 高置信跳过 → 直接 skip
            continue
        elif p_g > tau and cache[i].reuse_count < K:
            # 边界区域 → 复用缓存残差
            x = x + cache[i].Delta
            cache[i].reuse_count += 1
            continue
        else:
            # 执行该 block
            width_ratio = select_width(p_w)  # argmax 选择 {1/4,1/2,3/4,1}
            Delta = block.forward(x, t, width_ratio)  # MLP 矩阵切片
            x = x + Delta
            # 更新缓存
            cache[i] = Cache(Delta=Delta, reuse_count=0)

    return x
```

**动机与背景：为什么需要自适应加速？**

扩散 Transformer（DiT）在图像、视频和 3D 生成领域展现了卓越的生成能力，但其计算代价极高——以 Qwen-Image 为例，单次生成需要 2431ms。传统加速方法如剪枝（pruning）和蒸馏（distillation）采用**固定计算容量**，即对所有输入样本和所有去噪时间步施加相同的压缩策略。然而，E-DiT 的作者通过实验观察到一个关键现象：DiT 的生成过程存在**显著且样本依赖的稀疏性**——不同输入样本在不同时间步下，各 block 的计算冗余程度差异巨大。例如，简单的纯色背景区域可能只需少量 block 参与计算，而复杂纹理区域则需要更多 block 的完整计算。这种稀疏性的**输入依赖性**使得固定策略无法同时兼顾效率和质量。

**核心机制：路由器设计与双维度弹性**

E-DiT 的核心创新在于为每个 DiT block 设计了一个极轻量的路由器（Router），其参数量仅占原 block 的约 0.1%。路由器的输入是当前 block 的输入特征 \(\mathbf{h} \in \mathbb{R}^{B \times N \times D}\)，经过**时间步条件 LayerNorm 调制**（与 DiT 中的 adaLN 机制一致）后，通过一个线性层映射到隐藏维度 \(H_r\)，再经全局平均池化（Global Average Pooling）压缩空间维度，最终分出两个预测头：

1. **Gating Head**（block 跳过）：输出 1 维标量，经 Sigmoid 得到跳过概率 \(p_g \in [0,1]\)。训练时通过 STE（Straight-Through Estimator）将其二值化为 \(g \in \{0, 1\}\)：

$$g = \begin{cases} 1 & \text{if } p_g > \tau \\ 0 & \text{otherwise} \end{cases}, \quad \frac{\partial \mathcal{L}}{\partial p_g} = \frac{\partial \mathcal{L}}{\partial g}$$

当 \(g=1\) 时整个 block 被跳过，输出直接等于输入。

2. **Width Head**（MLP 宽度选择）：输出 4 维向量，经 Softmax 得到候选宽度比 \(\{1/4, 1/2, 3/4, 1\}\) 的概率分布。训练时采用 **activation masking** 策略——始终用完整 MLP 前向传播，但将超出所选宽度的激活值置零，从而保持梯度可微：

$$\text{MLP}_{\text{masked}}(\mathbf{x}) = (\mathbf{x} \cdot \mathbf{W}_1) \odot \mathbf{m}_r \cdot \mathbf{W}_2$$

其中 \(\mathbf{m}_r \in \{0,1\}^{d_{\text{ff}}}\) 是由所选宽度比 \(r\) 决定的二值掩码，前 \(r \cdot d_{\text{ff}}\) 维为 1，其余为 0。推理时则直接对权重矩阵做切片（slicing），只计算前 \(r \cdot d_{\text{ff}}\) 列/行，实现真正的计算节省。

> 💡 **关键设计**：训练时的 activation masking 与推理时的 matrix slicing 在数学上等价，但前者保持了完整的计算图以支持反向传播，后者则实现了真正的 FLOPs 节省。

**训练策略：效率-质量联合优化**

E-DiT 的训练损失由两部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{perf}} + \lambda \cdot \mathcal{L}_{\text{eff}}$$

其中 \(\mathcal{L}_{\text{perf}}\) 是标准的 flow-matching 损失（即预测速度场的 MSE），保证生成质量；\(\mathcal{L}_{\text{eff}}\) 是效率正则项，进一步分解为：

$$\mathcal{L}_{\text{eff}} = \mathcal{L}_{\text{gating}} + \mathcal{L}_{\text{width}}$$

$$\mathcal{L}_{\text{gating}} = \max\left(0, \rho_g - \frac{1}{L}\sum_{i=1}^{L} p_g^{(i)}\right)^2$$

$$\mathcal{L}_{\text{width}} = \max\left(0, \rho_w - \frac{1}{L}\sum_{i=1}^{L} \mathbb{E}[r^{(i)}]\right)^2$$

这里 \(\rho_g\) 和 \(\rho_w\) 分别是目标跳过率和目标宽度缩减率。注意损失采用 **hinge 形式**（\(\max(0, \cdot)\)），即只在实际效率未达目标时才产生梯度，避免过度压缩。实验中 \(\lambda=1\)。

> ⚠️ **关键发现**：从**全容量预训练权重**初始化（即所有路由器初始化为"不跳过、全宽度"）远优于随机初始化。这确保了训练初期模型保持原始生成质量，路由器在此基础上逐步学习哪些计算可以安全移除。

**推理优化：Block 级特征缓存**

在推理阶段，E-DiT 引入了一个**无需额外训练**的 block 级特征缓存机制。核心观察是：路由器预测的跳过概率 \(p_g\) 在阈值附近（即"边界区域" \(p_g \in [\tau, \tau+\delta]\)）的 block，其计算贡献较小但非零。对于这些 block，E-DiT 不是简单跳过，而是**复用上一次该 block 被完整执行时的残差输出** \(\Delta = \text{Block}(\mathbf{x}) - \mathbf{x}\)：

$$\mathbf{x}_{\text{out}} = \mathbf{x}_{\text{in}} + \Delta_{\text{cached}}$$

每个 block 最多连续复用 \(K\) 次缓存，超过后强制重新计算。消融实验表明，边界宽度 \(\delta\) 比最大复用次数 \(K\) 对性能影响更大——\(\delta\) 过大会引入过多近似误差，而适中的 \(\delta\)（如 0.1-0.15）能在几乎不损失质量的前提下进一步提升 10-15% 的速度。

**实验结果与路由器行为分析**

E-DiT 在三个大规模生成模型上验证了有效性：

| 模型 | 原始延迟 | E-DiT 延迟 | 加速比 | 质量变化 |
|------|---------|-----------|--------|---------|
| Qwen-Image (base) | 2431ms | 1627ms | 1.49× | GenEval 0.74→0.73 |
| Qwen-Image (turbo) | 2431ms | 1283ms | 1.89× | GenEval 0.74→0.72 |
| FLUX | 715ms | 374ms | 1.91× | GenEval 0.76→0.75 |
| Hunyuan3D-3.0 | 5012ms | 2587ms | 1.94× | Chamfer ↑0.002 |

路由器行为分析揭示了有趣的模式：（1）**首尾 block 几乎从不被跳过**，表明它们承担了关键的特征编码和输出映射功能；（2）**中间 block 的跳过率随时间步变化**，早期去噪步（高噪声）倾向于保留更多 block，后期步（低噪声/细节精修）则跳过更多；（3）**不同输入样本的跳过模式差异显著**，验证了自适应策略的必要性。

![路由器行为可视化](https://ar5iv.labs.arxiv.org/html/2602.13993/assets/x5.png)
*图 3：路由器在不同时间步和不同输入下的 block 跳过/宽度决策热力图，展示了 E-DiT 的自适应特性。*

#### 🧪 练习题

```yaml
question: "E-DiT 在训练时对 MLP 宽度缩减采用 activation masking 而非直接矩阵切片，主要原因是什么？"
options:
  - "activation masking 计算速度更快"
  - "保持完整计算图以支持反向传播梯度流"
  - "activation masking 能减少显存占用"
  - "直接矩阵切片会导致数值不稳定"
answer: 1
explain: "训练时需要梯度回传到路由器的 width head，直接切片会截断计算图。activation masking 保留了完整的前向路径，仅将未选中维度的激活置零，数学上与切片等价但保持了可微性。"
```