### Mamba：选择性状态空间模型
```yaml
id: mamba
name: Mamba
full_name: 选择性状态空间模型 (Selective State Space Model)
year: "2023.12"
org: CMU / Princeton
paper_url: https://arxiv.org/abs/2312.00752
category: long_context
parent: transformer
motivation: 线性序列建模挑战注意力
```

#### 📝 一句话总结
Mamba 提出了输入依赖的选择性状态空间模型 S6，并用硬件感知的 selective scan 解决传统 SSM 无法内容选择、而 Transformer 长序列代价二次增长的问题。它把 SSM、门控和局部卷积整合成无注意力、无 MLP 的统一块，在语言、音频和基因组等序列任务上实现线性复杂度建模。

#### 🎯 核心要点
- 选择性 SSM：让 \(\Delta\)、\(B\)、\(C\) 随当前 token 输入变化，使模型能选择性记忆、遗忘或重置状态。
- 硬件感知 selective scan：放弃传统 LTI SSM 的卷积路径，改用并行 scan，并避免在 HBM 中物化完整 \(B \times L \times D \times N\) 状态。
- 简化 Mamba block：用输入投影、深度可分离卷积、Selective SSM、SiLU 门控和输出投影组成一个统一层，替代注意力层和独立 MLP 层。
- 线性长上下文：训练与序列长度近似线性扩展，自回归推理每步只更新常数大小状态，不需要 Transformer 的 KV cache。
- 方法验证重点：选择性复制、induction heads、语言建模、DNA、音频和速度/显存实验共同说明选择机制对离散高密度序列有效。

#### 🔬 深入细节
![Mamba 选择性 SSM 总览](https://arxiv.org/html/2312.00752v2/x1.png)
*图：论文 Figure 1。传统结构化 SSM 依赖时间不变参数以避免物化大状态，Mamba 重新引入输入依赖动态，并通过硬件感知 scan 控制显存访问。*

![Mamba block 结构](https://arxiv.org/html/2312.00752v2/x3.png)
*图：论文 Figure 3。Mamba block 将局部卷积、选择性 SSM 与门控融合成一个无注意力的序列建模块。*

传统结构化 SSM 从连续系统出发，用隐状态 \(h(t)\) 将输入序列映射到输出：

$$
h'(t)=Ah(t)+Bx(t), \qquad y(t)=Ch(t)
$$

离散化后变成递推式：

$$
h_t=\bar A h_{t-1}+\bar B x_t, \qquad y_t=C h_t
$$

此前 S4/H3/Hyena 等模型为了高效训练，通常要求 \(\Delta,A,B,C\) 沿时间不变，因此可把递推等价成卷积：\(y=x * \bar K\)。这个设计的瓶颈是内容无关：卷积核只知道相对位置，不知道当前位置 token 是否重要，所以在 selective copying、induction heads 这类需要“看到内容再决定记什么”的任务上会失败。

Mamba 的核心改变是把若干 SSM 参数改成输入函数，而不是全局固定参数：

$$
B_t=s_B(x_t), \qquad C_t=s_C(x_t), \qquad \Delta_t=\operatorname{softplus}(\theta_\Delta+s_\Delta(x_t))
$$

再对每个位置使用离散化参数：

$$
\bar A_t=\exp(\Delta_t A), \qquad \bar B_t=f_B(\Delta_t,A,B_t)
$$

于是递推变为时间变化系统：

$$
h_t=\bar A_t h_{t-1}+\bar B_t x_t, \qquad y_t=C_t h_t + D x_t
$$

直觉上，\(\Delta_t\) 控制状态更新的“步长”：大 \(\Delta_t\) 可以快速刷新或遗忘旧状态，小 \(\Delta_t\) 可以更保守地保留历史；\(B_t\) 控制当前 token 写入状态的方式；\(C_t\) 控制从状态读出哪些信息。这样，模型可以在遇到关键 token 时写入，在遇到噪声 token 时跳过，并在边界处重置记忆。

```python
# Mamba / S6 selective scan 伪代码
# x: [batch, length, d_model]

def selective_ssm(x):
    A = Parameter(shape=[d_model, state_dim])
    D = Parameter(shape=[d_model])

    B = s_B(x)                         # [batch, length, state_dim]
    C = s_C(x)                         # [batch, length, state_dim]
    delta = softplus(theta_delta + s_delta(x))  # [batch, length, d_model]

    A_bar, B_bar = discretize(delta, A, B)

    h = zeros([batch, d_model, state_dim])
    ys = []
    for t in parallel_scan_over_length(x):
        h = A_bar[:, t] * h + B_bar[:, t] * x[:, t]
        y_t = dot(C[:, t], h) + D * x[:, t]
        ys.append(y_t)
    return stack(ys, dim="length")


def mamba_block(u):
    x, z = linear_in(u).chunk(2)
    x = silu(depthwise_conv1d(x))
    x = selective_ssm(x)
    return linear_out(x * silu(z))
```

选择性带来的代价是不能再走卷积快速路径，因为参数随位置变化，卷积核不再固定。论文的工程贡献是 selective scan：把递推写成可并行前缀扫描的问题，在 GPU SRAM 等快层级中临时展开状态，避免把巨大中间状态完整写入 HBM，并在反向传播中重算必要状态以换取显存。这个设计把“内容选择”与“线性复杂度”同时保留下来，是 Mamba 能作为长上下文 backbone 的关键。

与 Transformer 相比，Mamba 不显式存储所有历史 token 的 KV cache，而是把历史压缩进固定维度状态；因此训练成本随长度线性增长，推理每步只需更新状态。与传统 RNN 相比，它又不是简单标量门控，而是在结构化 SSM 中用 \(A\) 提供长程动态、用 \(B_t,C_t,\Delta_t\) 提供内容相关选择；与传统 LTI SSM 相比，它牺牲卷积等价性，换来能处理离散语言中“某些 token 才值得记”的能力。

> 💡 关键：Mamba 的创新不是单纯“把注意力换成 RNN”，而是把 SSM 从时间不变系统改成输入选择系统，并用 selective scan 把这个变化做成 GPU 友好的线性时间层。

#### 🧪 练习题
```yaml
question: "Mamba 中让 B、C、Delta 依赖输入 x 的主要目的是什么？"
options:
  - "让模型拥有内容相关的写入、读出和遗忘能力"
  - "把所有计算转化为标准卷积以提升并行度"
  - "减少词表大小并降低 embedding 参数量"
  - "用 KV cache 保存全部历史 token"
answer: 0
explain: "选择性参数使 SSM 从时间不变系统变为时间变化系统，能够根据当前 token 决定保留或过滤信息；这也是 Mamba 区别于传统 SSM 的核心。"
```
