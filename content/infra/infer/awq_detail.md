### AWQ (Activation-aware Weight Quantization)

```yaml
id: awq
name: AWQ
full_name: "激活感知权重量化 (Activation-aware Weight Quantization)"
year: 2023
org: MIT
paper_url: https://arxiv.org/abs/2306.00978
category: infra/infer
parent: "—"
motivation: "基于激活感知的权重量化方法，通过保护显著权重通道提升低比特量化精度"
```

#### 📝 一句话总结

AWQ 提出了一种激活感知的权重量化方法，通过观察激活分布识别显著权重通道并施加逐通道缩放保护，无需反向传播或权重重建即可显著提升低比特（INT3/INT4）权重量化精度，同时保持对不同领域和模态的泛化能力。

#### 🎯 核心要点

- **核心观察**：LLM 中仅 1% 的显著权重通道（由激活幅度决定而非权重幅度）对量化性能至关重要
- **逐通道缩放**：对显著权重通道乘以缩放因子 \(s > 1\)，等价地缩小对应激活通道，在不引入混合精度的前提下降低量化误差
- **激活感知搜索**：缩放因子搜索空间设计为 \(s = s_X^\alpha\)（\(s_X\) 为逐通道激活均值，\(\alpha \in [0, 1]\)），通过网格搜索最小化量化输出误差
- **无需训练/回归**：仅需少量校准数据测量激活统计量，比 GPTQ 所需校准集小 10 倍
- **对校准集分布鲁棒**：跨域校准时 PPL 仅增加 0.5-0.6，而 GPTQ 增加 2.3-4.9
- **广泛泛化**：支持 LLaMA、OPT 等基础模型，以及指令微调模型（Vicuna）和多模态模型（OpenFlamingo、LLaVA）
- **TinyChat 推理系统**：通过内核融合实现实际加速，4090 上达 3.9× 加速，笔记本 4070（8GB）上以 33 tok/s 运行 Llama-2-13B
- **与 GPTQ 正交**：可与 GPTQ 组合进一步提升 INT2 极低比特量化性能

#### 🔬 深入细节

![AWQ 核心方法示意图](https://ar5iv.labs.arxiv.org/html/2306.00978/assets/x1.png)
*图：AWQ 方法概览。左：直接 INT3 量化导致严重性能退化（PPL=43.2）；中：保留 1% 显著权重为 FP16 可大幅改善（PPL=13.0），但混合精度硬件不友好；右：AWQ 通过逐通道缩放保护显著权重，实现硬件友好的高精度量化。*

```python
# AWQ 核心算法伪代码
# 输入: 权重矩阵 W (c_out × c_in), 校准集激活 X, 量化比特数 N, 搜索粒度 n_grid
# 输出: 最优缩放向量 s*

def awq_search(W, X, N, n_grid=20):
    # Step 1: 计算逐通道激活均值作为显著性指标
    s_X = X.abs().mean(dim=0)  # shape: (c_in,)
    
    best_loss = float('inf')
    best_alpha = 0
    
    # Step 2: 网格搜索最优 alpha
    for alpha in linspace(0, 1, n_grid):
        s = s_X.pow(alpha)  # 缩放因子
        
        # Step 3: 对权重施加缩放后量化
        W_scaled = W * s.unsqueeze(0)        # W · diag(s)
        W_q = quantize(W_scaled, N)           # Q(W · diag(s))
        
        # Step 4: 计算量化输出误差 (缩放逆变换应用于激活)
        X_scaled = X / s.unsqueeze(0)         # diag(s)^{-1} · X
        loss = (W_q @ X_scaled - W @ X).pow(2).mean()
        
        if loss < best_loss:
            best_loss = loss
            best_alpha = alpha
    
    return s_X.pow(best_alpha)

def quantize(w, N):
    """均匀量化函数"""
    delta = w.abs().max() / (2**(N-1) - 1)
    return delta * torch.round(w / delta)
```

##### 动机与背景

大语言模型（LLM）的参数量从数十亿到数千亿不等，部署时面临严峻的内存和计算瓶颈。**权重量化**（Weight-only Quantization）是一种有效的模型压缩方法，将权重从 FP16 压缩到 INT3/INT4，可以减少 3-4 倍模型大小，并加速 token 生成阶段的内存受限推理。

现有方法存在两大问题：
1. **Round-to-Nearest (RTN)**：直接将权重四舍五入到最近整数，简单但在低比特（≤4bit）下性能退化严重
2. **GPTQ**：基于逐层权重重建（OBQ/OBS），通过最小化重建误差调整量化权重，但依赖反向传播/回归过程，容易**过拟合校准集**，损害模型在其他领域和模态上的泛化能力

> 💡 **关键洞察**：AWQ 发现 LLM 权重的重要性不均等——仅 1% 的权重通道对模型性能至关重要，而这些显著通道应通过**激活分布**（而非权重分布）来识别。

##### 核心机制：激活感知缩放

**Step 1: 识别显著权重通道**

AWQ 的第一个发现是：保留少量（0.1%-1%）权重通道为 FP16 可以显著改善量化性能。关键在于如何选择这些通道：

- 按**权重幅度**选择 → 效果与随机选择相当
- 按**激活幅度**选择 → 显著提升性能，甚至匹配 GPTQ

直觉是：激活幅度大的输入特征通常更重要，保留对应权重可以保护这些特征的传递。

**Step 2: 用缩放替代混合精度**

混合精度（部分 FP16 + 部分 INT3）虽然有效，但硬件实现困难。AWQ 提出用**逐通道缩放**来等效保护显著权重。

对于线性运算 \(y = \mathbf{w} \cdot \mathbf{x}\)，量化误差为：

$$\text{Err}(Q(\mathbf{w})) = \Delta \cdot \text{RoundErr}, \quad \Delta = \frac{\max(|\mathbf{w}|)}{2^{N-1} - 1}$$

当对权重通道乘以缩放因子 \(s > 1\) 时（同时对激活除以 \(s\) 以保持等价性），量化误差变为：

$$\text{Err}(Q(w \cdot s) / s \cdot x) = \frac{\Delta \cdot \text{RoundErr}}{s} \cdot x$$

> 💡 **关键**：缩放因子 \(s\) 使得显著通道的**相对量化误差**降低为原来的 \(1/s\)。虽然 \(\Delta\) 可能因最大值变化而略微增大，但对于显著通道（激活幅度大），\(s\) 带来的误差降低远大于 \(\Delta\) 增大的代价。

**Step 3: 自动搜索最优缩放因子**

直接为每个通道独立搜索 \(s\) 会导致搜索空间过大。AWQ 巧妙地将搜索空间参数化为：

$$\mathbf{s} = \mathbf{s}_X^\alpha, \quad \alpha \in [0, 1]$$

其中 \(\mathbf{s}_X\) 是逐通道的激活均值幅度。这一设计的直觉是：
- \(\alpha = 0\)：不缩放（等同于 RTN）
- \(\alpha = 1\)：完全按激活幅度缩放
- 最优 \(\alpha\) 在两者之间，平衡显著通道保护与非显著通道的量化精度

搜索目标为最小化量化前后的输出误差：

$$\mathcal{L}(\mathbf{s}) = \| Q(\mathbf{W} \cdot \text{diag}(\mathbf{s})) \cdot (\text{diag}(\mathbf{s})^{-1} \cdot \mathbf{X}) - \mathbf{W} \mathbf{X} \|$$

通过在 \([0, 1]\) 上进行网格搜索（默认 20 个点），逐层确定最优 \(\alpha\)。整个搜索过程无需梯度计算，仅需前向传播，非常高效。

> ⚠️ **注意**：缩放操作在数学上等价于将缩放因子融合到前一层的权重或归一化参数中（如 LayerNorm），因此不引入额外的推理开销。

##### 与传统方法的对比

| 特性 | RTN | GPTQ | AWQ |
|------|-----|------|-----|
| 是否需要反向传播 | ❌ | ✅（逐层重建） | ❌ |
| 校准数据需求 | 无 | 较多（128-192 序列） | 极少（~16 序列） |
| 校准集过拟合风险 | 无 | 高 | 低 |
| 多模态/跨域泛化 | 一般 | 差（过拟合） | 好 |
| INT3 LLaMA-7B PPL | 25.54 | 5.69 | 5.60 |
| INT4 LLaMA-7B PPL | 5.68 | 5.63 | 5.60 |
| 与 GPTQ 组合 | — | — | ✅（INT2 场景） |

##### TinyChat 推理系统

AWQ 不仅是量化算法，还配套了 TinyChat 高效推理系统：

- **内核融合**：将反量化与矩阵乘法融合，减少中间 DRAM 访问和内核启动开销
- **全模型优化**：同时优化量化线性层和非量化层（如 LayerNorm、Attention）
- **跨平台部署**：支持桌面 GPU（RTX 4090）、笔记本 GPU（RTX 4070）和边缘设备（Jetson Orin）
- **实测加速**：
  - RTX 4090：2.7-3.9× 加速（对比 HuggingFace FP16）
  - RTX 4070（8GB）：以 33 tok/s 运行 Llama-2-13B（FP16 连 7B 都无法加载）
  - Jetson Orin（32GB）：可运行 MPT-30B，达 7.8 tok/s

#### 🧪 练习题

```yaml
question: "AWQ 选择显著权重通道的依据是什么？"
options:
  - "权重的 L2 范数大小"
  - "权重的绝对值大小"
  - "对应输入激活的幅度大小"
  - "梯度的幅度大小"
answer: 2
explain: "AWQ 的核心发现是按激活幅度（而非权重幅度）选择显著通道效果最好，因为激活幅度大的特征通常更重要，保护对应权重可以保留这些关键特征的传递。"
```