### BitNet b1.58: 比特网 (BitNet b1.58)

```yaml
id: bitnet_b158
name: BitNet b1.58
full_name: 比特网 (BitNet b1.58)
year: '2024'
org: 微软
paper_url: https://arxiv.org/abs/2402.17764
category: quantize
parent: gptq
motivation: 三值化权重消除浮点乘法
```

#### 📝 一句话总结

BitNet b1.58 将 Transformer 中的线性层替换为 BitLinear，把每个权重约束到 \(\{-1,0,1\}\)，解决了后训练低比特量化仍依赖乘法和反量化开销的问题，并把主要矩阵乘变成整数加减与跳过。

#### 🎯 核心要点

- 每个权重只有三种状态 \(\{-1,0,1\}\)，信息量为 \(\log_2 3\approx1.58\) bit
- 基于 BitNet 架构，把注意力和 FFN 中的 `nn.Linear` 替换为 BitLinear，并从头训练适应离散权重
- 权重采用 absmean quantization：按平均绝对值缩放后四舍五入并裁剪到三值集合
- 激活使用 per-token 8-bit 量化到对称区间 \([-Q_b,Q_b]\)，避免 zero-point 量化
- 保留 LLaMA 风格组件，包括 RMSNorm、SwiGLU、RoPE，并移除 bias，便于接入主流 LLM 生态
- 论文报告从 3B 规模开始可接近或匹配同配置 FP16 LLaMA 基线，同时显著降低内存、延迟、吞吐和能耗成本

#### 🔬 深入细节

![BitNet b1.58 Pareto 与计算范式示意图](https://ar5iv.labs.arxiv.org/html/2402.17764/assets/x2.png)
*图：BitNet b1.58 论文 Figure 1 的计算范式部分。FP16 线性层需要乘法再加法，三值权重把 \(Wx\) 变成加、减或跳过。图片来源：arXiv HTML。*

```python
# BitLinear forward sketch for BitNet b1.58
# W_fp is the trainable high-precision shadow weight used by optimizer.
def bitlinear_forward(x_fp, W_fp, activation_bits=8, eps=1e-6):
    # Weight absmean quantization: {-1, 0, +1}
    gamma_w = W_fp.abs().mean()
    W_q = torch.round(W_fp / (gamma_w + eps)).clamp(-1, 1)

    # Per-token symmetric activation quantization
    Q_b = 2 ** (activation_bits - 1)
    gamma_x = x_fp.abs().amax(dim=-1, keepdim=True).clamp_min(eps)
    x_q = torch.round(x_fp * Q_b / gamma_x).clamp(-Q_b, Q_b)

    # Integer/additive matmul followed by scale recovery
    y_int = x_q @ W_q.T
    y = y_int * (gamma_x / Q_b) * gamma_w
    return y
```

BitNet b1.58 的动机不是压缩一个已经训练好的 FP16 checkpoint，而是从模型设计上改变线性层的数值约束。传统 PTQ 例如 GPTQ/AWQ 可以把权重压到 4 bit，但推理时仍常需要反量化、缩放和低比特乘法 kernel；BitNet b1.58 从训练开始就让权重只取 \(-1,0,1\)，因此矩阵乘中每个权重要么选择输入取反、要么保留输入、要么跳过输入，核心算子更接近加法累加。

论文把权重量化写成 absmean quantization。对权重矩阵 \(W\in\mathbb{R}^{n\times m}\)，先计算平均绝对值尺度：

$$
\gamma=\frac{1}{nm}\sum_{ij}|W_{ij}|
$$

再进行三值化：

$$
\tilde{W}=\mathrm{RoundClip}\left(\frac{W}{\gamma+\epsilon},-1,1\right)
$$

$$
\mathrm{RoundClip}(x,a,b)=\max(a,\min(b,\mathrm{round}(x)))
$$

因此小幅值权重会落到 0，正负较大的权重分别落到 \(+1\) 或 \(-1\)。0 的加入是 b1.58 相比原始 1-bit BitNet 的关键：它提供显式 feature filtering 能力，让模型不仅能选择方向，还能关闭不重要连接；三种状态的信息量就是 \(\log_2 3\approx1.585\) bit。

激活侧并没有压到 1.58 bit，而是使用 8-bit per-token 对称量化。设 \(Q_b=2^{b-1}\)，对每个 token 的隐藏向量可用最大绝对值作为尺度：

$$
\tilde{x}=\mathrm{Clip}\left(x\cdot\frac{Q_b}{\|x\|_\infty+\epsilon},-Q_b,Q_b\right)
$$

这样每个 token 自己决定激活 scale，避免不同 token 的幅值差异互相污染；同时使用对称区间减少 zero-point 处理，便于系统实现。最终输出近似为整数累加结果乘回激活尺度和权重尺度：

$$
y\approx(\tilde{x}\tilde{W})\cdot\frac{\|x\|_\infty}{Q_b}\cdot\gamma
$$

训练时通常保留可学习的高精度 shadow weight，由优化器在反向传播中更新；前向使用量化后的 \(\tilde{W}\) 和 \(\tilde{x}\)，反向通过直通估计器近似离散化操作的梯度。这也是它与 GPTQ 类后训练量化的根本差异：BitNet b1.58 的参数、激活分布和残差路径是在三值约束下共同适应出来的，不能简单把任意 FP16 模型离线 round 成三值并期待同等质量。

![BitNet b1.58 延迟随规模变化](https://ar5iv.labs.arxiv.org/html/2402.17764/assets/x3.png)
*图：BitNet b1.58 论文 Figure 2 左图，模型越大，线性层占比越高，三值线性层带来的解码延迟收益越明显。图片来源：arXiv HTML。*

在架构上，BitNet b1.58 采用 LLaMA-like 组件：RMSNorm、SwiGLU、RoPE、无 bias，并把主要 `nn.Linear` 换成 BitLinear。embedding、归一化、部分输出头等非矩阵乘瓶颈组件通常不承担三值权重收益，因此整体加速会随模型变大而增强。论文在 100B token 训练设置中比较 700M、1.3B、3B、3.9B 等模型，报告 3B BitNet b1.58 的 PPL 可匹配 FP16 LLaMA 3B，同时内存约 3.55 倍更省、延迟约 2.71 倍更低；扩展估算中 70B 还展示了更高吞吐和更低能耗潜力。

推理侧的直觉很直接：若一行权重是 \([1,-1,0,1]\)，则输出项由 \(x_0-x_1+0+x_3\) 构成，不需要 \(0.2961x_0-0.0495x_1-\cdots\) 这种 FP16 乘加。实际速度仍取决于 kernel 和硬件是否能高效打包三值权重、跳过 0、用低位累加器处理 8-bit 激活；论文也强调这种新计算范式会推动专门面向 1-bit/1.58-bit LLM 的硬件设计。

> 💡 关键：BitNet b1.58 的价值在“训练范式 + 数值格式 + kernel/硬件”的协同，而不只是一个量化公式。它更适合从头训练或充分继续训练的模型族，不是 GPTQ 那种即插即用的后训练压缩器。

#### 🧪 练习题

```yaml
question: "BitNet b1.58 中的 1.58 bit 来自哪里？"
options:
  - "权重有 {-1, 0, 1} 三种状态，信息量约为 log2(3)"
  - "激活固定使用 1.58 位整数"
  - "模型只训练 1.58T tokens"
  - "每个 Transformer block 保留 1.58 个线性层"
answer: 0
explain: "三值权重共有 3 种可能状态，编码其信息量约为 log2(3)=1.585 bit，因此称为 b1.58。"
```
