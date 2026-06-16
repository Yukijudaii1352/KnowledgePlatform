### Mamba: 曼巴 (Mamba)

```yaml
id: mamba
name: Mamba
full_name: 曼巴 (Mamba)
year: '2023'
org: CMU/Princeton
paper_url: https://arxiv.org/abs/2312.00752
category: linear_attn
parent: —
motivation: 选择性状态空间模型线性时间扩展
```

#### 📝 一句话总结

Mamba 提出选择性状态空间模型 S6，让 \(\Delta\)、\(B\)、\(C\) 等 SSM 参数依赖输入 token，并用硬件感知 selective scan 高效执行，从而在保持线性时间和常数状态推理的同时获得接近 Transformer 的内容选择能力。

#### 🎯 核心要点

- 将传统 LTI SSM 改造成 selective SSM：\(B_t=s_B(x_t)\)、\(C_t=s_C(x_t)\)、\(\Delta_t=s_\Delta(x_t)\)，使模型能按内容写入、遗忘和读出状态
- 选择性破坏卷积等价性，论文改用 recurrent scan，并通过 kernel fusion、parallel scan、recomputation 避免物化巨大状态
- Mamba block 将 H3/SSM 分支与现代 gated MLP 思路合并，使用 input projection、depthwise Conv1D、SiLU、selective scan、gate 和 output projection
- 训练和长序列处理复杂度随序列长度线性增长；自回归推理每层只维护固定 SSM state，不需要 KV cache
- 选择性机制解决 S4 等固定动态模型在 selective copying、induction heads 等离散内容推理任务上的短板
- 论文报告 Mamba 在语言、DNA、音频等多模态序列任务上表现强，Mamba-3B 可匹配约两倍规模 Transformer，并具备更高生成吞吐

#### 🔬 深入细节

##### 论文图与架构

![Mamba selective SSM 总览](https://arxiv.org/html/2312.00752v2/x1.png)
![Mamba block 架构](https://arxiv.org/html/2312.00752v2/x3.png)
*图源：Mamba arXiv HTML Figure 1 和 Figure 3。第一张展示从固定 LTI SSM 到选择性 SSM 后需要硬件感知 scan；第二张展示 Mamba block 如何把 SSM 与 gated MLP 式结构合并。*

##### 核心伪代码

```python
# Mamba selective SSM layer (S6), simplified
def mamba_block(x, state=None):
    # x: [batch, length, d_model]
    u, gate = linear_in(x).chunk(2, dim=-1)
    u = silu(depthwise_conv1d(u))

    # 输入依赖参数：每个 token 都生成自己的 Delta、B、C
    delta = softplus(delta_bias + linear_delta(u))
    B = linear_B(u)
    C = linear_C(u)
    A = negative_diagonal_parameter()  # shared across positions

    # 离散化；实际实现不会把完整 [B,L,D,N] 状态写回 HBM
    A_bar = exp(delta[..., None] * A)
    B_bar = delta[..., None] * B[..., None, :]

    y, new_state = selective_scan(A_bar, B_bar, C, u, state)
    y = y * silu(gate)
    return linear_out(y), new_state


def selective_scan(A_bar, B_bar, C, u, state):
    h = zeros_like_state() if state is None else state
    outputs = []
    for t in range(u.length):  # 真实 kernel 用 parallel prefix scan
        h = A_bar[:, t] * h + B_bar[:, t] * u[:, t, :, None]
        y_t = (C[:, t, None, :] * h).sum(dim=-1)
        outputs.append(y_t)
    return stack(outputs, dim=1), h
```

##### 机制拆解

Mamba 建立在结构化状态空间模型上。连续形式的 SSM 可写为

$$
h'(t)=Ah(t)+Bx(t),\qquad y(t)=Ch(t).
$$

离散化后得到序列递推：

$$
h_t=\bar A h_{t-1}+\bar B x_t,\qquad y_t=C h_t,
$$

其中 \(\bar A=\exp(\Delta A)\)，\(\bar B\) 由 \(\Delta,A,B\) 的离散化规则得到。S4 等模型为了高效通常是 Linear Time-Invariant (LTI)：\(A,B,C,\Delta\) 对所有时间步固定。LTI 带来卷积等价性，训练时能把整段序列变成卷积并行计算，但代价是动态不看输入内容。

论文指出，固定动态对文本这类离散、高信息密度序列不够。Selective Copying 任务需要模型只记住彩色/关键 token，忽略填充 token；Induction Heads 任务需要根据上下文触发关联回忆。固定卷积核只能按位置距离传播信息，无法基于当前 token 决定 “写入还是跳过”。Mamba 的关键改动是让部分 SSM 参数变成输入函数：

$$
B_t=s_B(x_t),\qquad C_t=s_C(x_t),\qquad \Delta_t=\operatorname{softplus}(s_\Delta(x_t)).
$$

直觉上，\(B_t\) 控制当前 token 写入状态的方式，\(C_t\) 控制从状态读出哪些信息，\(\Delta_t\) 控制状态更新步长。较大的 \(\Delta_t\) 会让 \(\bar A_t=\exp(\Delta_t A)\) 更强地衰减历史，效果接近重置并关注当前输入；较小的 \(\Delta_t\) 则让状态更接近保持，效果类似跳过当前输入。这相当于把 RNN 的门控直觉放入连续时间 SSM 框架。

选择性带来一个直接工程问题：参数随时间变化后，模型不再是 LTI，不能像 S4 那样预先构造卷积核。朴素递推又会串行且需要保存形如 \([B,L,D,N]\) 的中间状态。Mamba 的 selective scan 使用三个技巧解决：kernel fusion 把参数离散化、递推和读出合并在一个 GPU kernel 中；parallel scan 利用仿射递推的结合律并行化前缀计算；recomputation 在反向传播时重算中间状态而不是全部存储。这样大状态主要停留在 SRAM/寄存器层级，HBM 只读写输入输出级别张量，思想上接近 FlashAttention 的 IO-aware 设计。

Mamba block 也做了架构简化。传统 Transformer block 交替使用 attention 和 MLP，早期 SSM 架构也常把 SSM block 与 MLP block 分开。Mamba 将输入投影成主分支和门控分支，主分支经过短卷积提供局部混合，再进入 selective SSM，最后与 SiLU gate 相乘并输出投影。用公式概括：

$$
u=\operatorname{SiLU}(\operatorname{Conv1D}(XW_u)),\quad
z=\operatorname{SiLU}(XW_z),\quad
Y=W_o\left(\operatorname{S6}(u)\odot z\right).
$$

这种设计保留了 gated MLP 的非线性和通道扩展，同时把序列混合交给 S6；因此 Mamba 可以同质堆叠 block，而不需要显式 attention 层或独立 MLP 层。

与 Transformer 相比，Mamba 不保存 KV cache，推理状态大小由层数、通道数和 SSM state size 决定，与已生成长度无关；训练成本也避免了 \(O(L^2)\) attention 矩阵。与 RetNet/RWKV 等递推架构相比，Mamba 的选择性参数直接作用在 SSM 的写入、读出和步长上，因而更强调内容感知状态压缩。它的风险也来自同一点：所有历史必须被压缩进有限状态，模型必须学会何时丢弃信息；论文的贡献在于用选择性和硬件实现把这个压缩过程做得足够强且足够快。

#### 🧪 练习题

```yaml
question: "Mamba 中选择性 SSM 相比传统 S4/LTI SSM 的关键变化是什么？"
options:
  - "让 Delta、B、C 等参数依赖输入 token，从而按内容控制状态更新"
  - "把所有参数固定为常数以便使用全局卷积"
  - "在每层加入标准 softmax attention"
  - "删除递推状态，只保留 FFN"
answer: 0
explain: "Mamba 的 S6 通过输入依赖的参数实现选择性写入、遗忘和读出；这破坏卷积等价性，但配合 selective scan 仍保持高效。"
```
