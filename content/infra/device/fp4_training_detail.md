### FP4 Training

```yaml
id: fp4_training
name: FP4 Training
full_name: "FP4全量化训练 (FP4 Fully Quantized LLM Training)"
year: 2025
org: "Intel Labs / Habana Labs / NeurIPS 2025"
paper_url: "https://neurips.cc/virtual/2025/poster/101234"
category: efficiency
parent: bnn
motivation: "首次实现FP4精度全量化LLM训练"
```

#### 📝 一句话总结

本文首次实现了 FP4 精度下的 **全量化** LLM 从头训练（权重、激活、梯度全部量化为 4-bit 浮点），通过提出 **NVFP4 数据格式**、**Split Rounding 策略** 和 **QAF 收尾微调**，在 Llama2-7B / 1T tokens 规模上达到与 BF16 基线持平的性能，预估可比 BF16 训练加速约 85%。

#### 🎯 核心要点

- **首次全量化 FP4 训练**：同时将权重 \(W\)、激活 \(a\)、梯度 \(\delta\) 量化为 FP4，覆盖训练中全部三个 GEMM（Forward / Backward / Update）
- **NVFP4 格式优于 MXFP4**：采用 E2M1 数据 + E4M3 缩放因子 + block_size=16，相比 MXFP4（E8M0 缩放 + block_size=32）在训练 loss 上显著更优
- **Split Rounding 策略**：前向传播使用 Round-to-Nearest (RtN)，反向传播和参数更新使用 Stochastic Rounding (SR)，针对不同 GEMM 的 6 个量化位置分别选择最优舍入方式
- **理论分析**：证明当梯度标准差降至 \(\sqrt{3} \cdot \sigma_q\) 以下时 FP4 训练失效，为 QAF 切换时机提供理论依据
- **QAF 收尾微调**：训练末期切换为前向 FP4 + 反向 BF16，仅需 4% 额外 tokens（40B/1T）即可完全闭合与 BF16 的精度差距
- **大规模验证**：Llama2-7B 在 256 块 Gaudi2 HPU 上训练 1T tokens（约 30 天），零样本评估平均准确率 45.75 vs BF16 的 45.63

#### 🔬 深入细节

##### 核心框架示意

论文的核心思路可概括为下图所示的三阶段流程：

```
┌─────────────────────────────────────────────────────────────────┐
│                    FP4 全量化训练框架                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐    │
│  │  Forward GEMM │   │ Backward GEMM│   │   Update GEMM    │    │
│  │  Q(W)·Q(a)   │   │ Q(Wᵀ)·Q(δ)  │   │   Q(δ)·Q(aᵀ)    │    │
│  │              │   │              │   │                  │    │
│  │ W: RtN (FP4) │   │ W: RtN (FP4) │   │ δ: SR  (FP4)     │    │
│  │ a: RtN (FP4) │   │ δ: SR  (FP4) │   │ a: SR  (FP4)     │    │
│  └──────┬───────┘   └──────┬───────┘   └────────┬─────────┘    │
│         │                  │                     │              │
│         ▼                  ▼                     ▼              │
│    输出激活 a          梯度 δ 传播           权重更新 ΔW          │
│   (BF16 存储)        (BF16 存储)          (BF16 主权重)         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  训练末期 QAF：Forward 保持 FP4，Backward/Update 切回 BF16       │
│  仅需 ~4% 额外 tokens 即可闭合与 BF16 的精度差距                  │
└─────────────────────────────────────────────────────────────────┘
```

*图：FP4 全量化训练的三个 GEMM 及其量化策略。每个 GEMM 的两个输入矩阵分别采用不同的舍入方式（Split Rounding）。*

##### 算法伪代码

```python
# FP4 全量化 LLM 训练 (Split Rounding + QAF)
# ============================================

def quantize_fp4(x, block_size=16, rounding='rtn'):
    """将 BF16 张量量化为 NVFP4 格式 (E2M1 data + E4M3 scale)"""
    # 按 block_size 分组，每组计算 E4M3 缩放因子
    blocks = x.reshape(-1, block_size)
    scales = blocks.abs().max(dim=-1).values  # E4M3 格式存储
    normalized = blocks / scales.unsqueeze(-1)
    if rounding == 'rtn':
        quantized = round_to_nearest(normalized, fp4_grid)  # 确定性舍入
    elif rounding == 'sr':
        quantized = stochastic_round(normalized, fp4_grid)   # 随机舍入
    return quantized, scales

def fp4_train_step(model, x, y, optimizer, phase='fp4'):
    # ========== Forward GEMM: Q_rtn(W) · Q_rtn(a) ==========
    for layer in model.layers:
        W_q = quantize_fp4(layer.weight, rounding='rtn')   # 权重: RtN
        a_q = quantize_fp4(layer.input,  rounding='rtn')   # 激活: RtN
        layer.output = gemm_fp4(W_q, a_q)  # FP4×FP4 → BF16 累加

    loss = cross_entropy(model.output, y)

    if phase == 'fp4':  # 全 FP4 阶段
        # ========== Backward GEMM: Q_rtn(Wᵀ) · Q_sr(δ) ==========
        for layer in reversed(model.layers):
            W_q = quantize_fp4(layer.weight.T, rounding='rtn')  # 权重: RtN
            d_q = quantize_fp4(layer.grad_out,  rounding='sr')  # 梯度: SR
            layer.grad_in = gemm_fp4(W_q, d_q)

        # ========== Update GEMM: Q_sr(δ) · Q_sr(aᵀ) ==========
        for layer in model.layers:
            d_q = quantize_fp4(layer.grad_out,   rounding='sr')  # 梯度: SR
            a_q = quantize_fp4(layer.input.T,    rounding='sr')  # 激活: SR
            grad_W = gemm_fp4(d_q, a_q)
            optimizer.step(layer.weight, grad_W)  # BF16 主权重更新

    elif phase == 'qaf':  # QAF 收尾阶段
        # Backward 和 Update 使用 BF16 精度
        loss.backward()  # 标准 BF16 反向传播
        optimizer.step()

# 主训练循环
total_tokens = 1_000_000_000_000  # 1T tokens
qaf_tokens   =    40_000_000_000  # 40B tokens (4%)

for step, (x, y) in enumerate(dataloader):
    tokens_seen = step * batch_size * seq_len
    if tokens_seen < total_tokens - qaf_tokens:
        fp4_train_step(model, x, y, optimizer, phase='fp4')
    else:
        fp4_train_step(model, x, y, optimizer, phase='qaf')
```

##### 方法详解

**1. 动机与背景：为什么要 FP4 训练？**

当前 LLM 训练的主流精度路径为 BF16 → FP8，但 FP4（4-bit 浮点）训练此前被认为不可行，因为 4-bit 仅能表示 16 个离散值（含符号），量化噪声极大。然而，FP4 GEMM 的理论吞吐量是 FP8 的 2 倍、BF16 的 4 倍，若能实现 FP4 训练将带来巨大的效率提升。

此前的工作要么仅量化权重和激活（不量化梯度），要么仅量化梯度（不量化权重和激活），从未实现过三者同时 FP4 量化的**全量化训练**。本文首次攻克了这一挑战。

**2. NVFP4 vs MXFP4：数据格式的选择**

FP4 有两种主流格式：

| 特性 | NVFP4 | MXFP4 |
|------|-------|-------|
| 数据位宽 | E2M1 (4-bit) | E2M1 (4-bit) |
| 缩放因子格式 | **E4M3** (8-bit FP) | E8M0 (8-bit, 纯指数) |
| Block 大小 | **16** | 32 |
| 缩放因子精度 | 高（有尾数位） | 低（无尾数位，仅2的幂） |

> 💡 **关键洞察**：NVFP4 的优势来自两方面——(1) E4M3 缩放因子比 E8M0 精度更高（有 3 位尾数），能更精确地表示每个 block 的动态范围；(2) block_size=16 比 32 更细粒度，减少了组内异常值对量化精度的影响。实验表明 NVFP4 在训练 loss 上比 MXFP4 低约 0.05（350M 模型，15B tokens）。

**3. Split Rounding：不同位置用不同舍入**

这是本文最核心的技术贡献。训练中的三个 GEMM 共涉及 6 个量化位置（每个 GEMM 的两个输入矩阵）。作者发现：

- **前向传播**中的权重和激活应使用 **RtN**（Round-to-Nearest），因为 RtN 的均方误差比 SR 更小（SR 引入的方差会在前向传播中累积）
- **反向传播**中的梯度和**参数更新**中的梯度/激活应使用 **SR**（Stochastic Rounding），因为 SR 是无偏的（\(\mathbb{E}[Q_{SR}(x)] = x\)），能保证梯度期望正确

> ⚠️ **为什么不能全用 RtN？** RtN 是有偏的——当真实值恰好落在两个量化点中间时，RtN 总是偏向同一方向。对于前向传播这不是大问题（推理也用 RtN），但对于梯度更新，这种偏差会导致优化收敛到错误的点。Appendix B.2 证明了 RtN 梯度会产生残差损失 \(L_\infty = \mu_\varepsilon^2 / (2\lambda)\)，永远无法收敛到最优解。

> ⚠️ **为什么不能全用 SR？** SR 虽然无偏，但方差更大。在前向传播中，SR 的额外方差会使输出噪声增大，反而降低训练质量。实验（Figure 7）证实：对前向传播中的权重和激活使用 RtN 比 SR 的 loss 更低。

Split Rounding 的完整策略总结：

$$
\begin{aligned}
\text{Forward:} \quad & Q_{\text{RtN}}(W) \cdot Q_{\text{RtN}}(a) \\
\text{Backward:} \quad & Q_{\text{RtN}}(W^\top) \cdot Q_{\text{SR}}(\delta) \\
\text{Update:} \quad & Q_{\text{SR}}(\delta) \cdot Q_{\text{SR}}(a^\top)
\end{aligned}
$$

**4. 理论分析：FP4 训练何时失效？**

作者通过量化 SGD 的收敛性分析，推导出 FP4 训练的**临界噪声阈值**。核心推导如下：

使用二阶 Taylor 展开，量化梯度更新的期望损失变化为：

$$
\mathbb{E}[L(\theta_{t+1}) - L(\theta_t)] \approx \underbrace{-\eta\|\nabla L\|_2^2 + \frac{1}{2}\eta^2 \nabla L^\top H \nabla L}_{\text{有用下降分量}} + \underbrace{\frac{1}{2}\eta^2 \sigma_q^2 \text{tr}(H)}_{\text{量化噪声效应}}
$$

其中 \(\sigma_q^2\) 是量化噪声方差，\(H\) 是 Hessian 矩阵。对最优步长 \(\eta^*\) 求解后，找到损失对噪声最敏感的临界点：

$$
\sigma_{\text{critical}} = \frac{\|\nabla L(\theta_t)\|_2}{\sqrt{3d}}
$$

> 💡 **直觉解释**：当每个参数维度的平均梯度幅度降到量化噪声标准差的 \(\sqrt{3}\) 倍以下时，量化噪声开始主导梯度信号，FP4 训练失去有效性。这为 QAF 切换时机提供了理论指导——当观察到 loss 曲线开始偏离 BF16 基线时，说明梯度已接近临界阈值。

**5. QAF（Quantization-Aware Finetuning）收尾策略**

训练末期（学习率衰减阶段），梯度幅度减小，FP4 量化噪声的相对影响增大，导致 FP4 训练的 loss 曲线与 BF16 基线出现 gap。QAF 的解决方案：

- **前向传播**：保持 FP4 量化（维持量化感知）
- **反向传播 + 参数更新**：切回 BF16 精度（消除梯度量化噪声）
- **学习率**：使用 FP4 训练结束时的最后学习率作为 QAF 的峰值学习率

QAF 所需的额外 tokens 比例随总训练量增加而降低：

| 总训练量 | QAF 长度 | 比例 |
|---------|---------|------|
| 200B | 20B | 10% |
| 500B | 28B | 5.6% |
| 1T | 40B | **4%** |

**6. 实验规模与结果**

最大规模实验：**Llama2-7B**，1T tokens，256 块 Gaudi2 HPU，训练约 30 天。

零样本评估结果（QAF 后）：

| 基准 | BF16 | FP4+QAF |
|------|------|---------|
| ARC-e | 54.0 | 54.6 |
| ARC-c | 27.6 | 28.2 |
| HellaSwag | 52.2 | 52.2 |
| PIQA | 72.4 | 72.0 |
| WinoGrande | 58.6 | 58.2 |
| **平均** | **45.63** | **45.75** |

> 💡 **关键结论**：FP4 全量化训练 + QAF 收尾后的模型性能与 BF16 基线完全持平（甚至略优），证明了 FP4 训练的可行性。

**7. 与前作的对比**

| 方法 | 权重量化 | 激活量化 | 梯度量化 | 全量化 |
|------|---------|---------|---------|-------|
| [21] Quantized LLM Training | ✅ FP4 | ✅ FP4 | ❌ | ❌ |
| [19] 4-bit Gradient | ❌ | ❌ | ✅ FP4 | ❌ |
| **本文** | **✅ FP4** | **✅ FP4** | **✅ FP4** | **✅** |

本文是首个将三者统一到 FP4 精度的工作，使得训练中的**所有 GEMM 运算**都可以在 FP4 精度下执行。

**8. 性能预估**

由于 Gaudi2 HPU 不原生支持 FP4 运算（实验为模拟），作者基于 GEMM 吞吐量理论分析给出预估：

- 相比 FP8 训练：**加速 35-40%**
- 相比 BF16 训练：**加速约 85%**
- 内存节省：FP4 权重/激活存储减半，梯度通信量减半

#### 🧪 练习题

```yaml
question: "在 FP4 全量化训练的 Split Rounding 策略中，前向传播的权重和激活使用 RtN 而非 SR 的主要原因是什么？"
options:
  - "RtN 计算速度比 SR 更快，可以加速前向传播"
  - "RtN 的均方误差更小，减少前向传播中的累积噪声"
  - "SR 在前向传播中会导致梯度消失问题"
  - "RtN 可以保证前向传播结果的无偏性"
answer: 1
explain: "RtN 虽然是有偏估计，但其均方误差（MSE）比 SR 更小。在前向传播中，量化噪声的方差会逐层累积，因此选择 MSE 更小的 RtN 可以减少输出噪声，提升训练质量。SR 的无偏性优势主要体现在梯度更新中。"
```