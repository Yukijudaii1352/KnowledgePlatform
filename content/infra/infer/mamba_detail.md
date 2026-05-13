### Mamba: Linear-Time Sequence Modeling with Selective State Spaces

```yaml
id: mamba
name: Mamba
full_name: 曼巴(Mamba)
year: 2023
org: CMU / Princeton
category: linear_attn
parent: S4
paper: https://arxiv.org/abs/2312.00752
code: https://github.com/state-spaces/mamba
motivation: 通过选择性状态空间模型实现线性时间序列建模，解决Transformer二次复杂度瓶颈
```

---

## 📝 一句话总结

Mamba 提出**选择性状态空间模型（Selective SSM / S6）**，通过让 SSM 参数（$\Delta$, $B$, $C$）依赖于输入实现内容感知的选择性过滤，配合硬件感知的并行扫描算法，在保持线性时间复杂度的同时达到甚至超越同规模 Transformer 的性能。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | 先前 SSM（如 S4）是线性时不变（LTI）系统，无法进行内容感知推理；Transformer 虽有效但训练/推理复杂度为 $O(L^2)$ |
| **核心思想** | **选择性机制**：让 SSM 的关键参数成为输入的函数，使模型能根据内容动态决定"记住什么、忘记什么" |
| **关键创新** | ① 输入依赖的 $\Delta$, $B$, $C$ 参数化 ② 硬件感知并行扫描算法（kernel fusion + recomputation） ③ 简化的端到端架构（无需 Attention + MLP 交替） |
| **复杂度** | 训练：$O(BLD N)$（线性于序列长度）；推理：$O(1)$ 每步（常数时间，类似 RNN） |
| **效果** | Mamba-3B 在语言建模上匹配 Transformer-6B（2倍参数量）；推理吞吐量达 Transformer 的 5 倍；首个在 scaling law 上匹配强 Transformer++ 的非注意力模型 |

---

## 🔬 深入细节

### 架构示意图

> **Mamba Block 架构**（对应论文 Figure 3）
>
> 将 H3 block（SSM 架构基础）与 MLP block 合并为单一 Mamba block，同质堆叠：

```
Input x
  │
  ├──→ Linear Projection (expand D→ED) ──→ Conv1D ──→ SiLU ──→ Selective SSM ──→ ⊗
  │                                                                                │
  └──→ Linear Projection (expand D→ED) ──→ SiLU ─────────────────────────────────→ ⊗
                                                                                   │
                                                                          Linear Projection (ED→D)
                                                                                   │
                                                                              + Residual
                                                                                   │
                                                                              LayerNorm
                                                                                   ↓
                                                                               Output y
```

> **选择性 SSM 核心机制**（对应论文 Figure 1）
>
> S4（LTI）→ S6（Selective）的关键变化：参数从固定变为输入依赖

```
┌─────────────────────────────────────────────────────────────┐
│  S4 (LTI):  A, B, C, Δ 均为固定参数                          │
│  → 可用卷积加速，但无法做内容感知推理                            │
│                                                               │
│  S6 (Selective):  B(x), C(x), Δ(x) 依赖输入                  │
│  → 必须用递推(scan)计算，但能选择性记忆/遗忘                     │
│  → 通过硬件感知算法(SRAM scan + kernel fusion)保持高效          │
└─────────────────────────────────────────────────────────────┘
```

### 伪代码

**Algorithm 1: S4（传统 LTI SSM）**

```python
# Input:  x: (B, L, D)
# Output: y: (B, L, D)

A = Parameter(shape=(D, N))        # 结构化 N×N 矩阵
B = Parameter(shape=(D, N))        # 固定参数
C = Parameter(shape=(D, N))        # 固定参数
Delta = softplus(Parameter(D))     # 固定步长

A_bar, B_bar = discretize(Delta, A, B)  # 离散化
y = SSM(A_bar, B_bar, C)(x)             # 时不变：可用卷积或递推
return y
```

**Algorithm 2: S6（选择性 SSM = Mamba 核心）**

```python
# Input:  x: (B, L, D)
# Output: y: (B, L, D)

A = Parameter(shape=(D, N))              # 结构化 N×N 矩阵（仍为固定参数）
B = Linear_N(x)                          # (B,L,D) → (B,L,N)  输入依赖！
C = Linear_N(x)                          # (B,L,D) → (B,L,N)  输入依赖！
Delta = softplus(Parameter + Linear_R(x)) # (B,L,D)  输入依赖！

# 离散化（逐时间步不同）
A_bar = exp(einsum('bld,dn->bldn', Delta, A))   # (B,L,D,N)
B_bar = einsum('bld,bln->bldn', Delta, B)       # (B,L,D,N)

# 选择性扫描（并行 scan，非卷积）
h = zeros(B, D, N)
for t in range(L):  # 实际用并行 prefix scan
    h = A_bar[:, t] * h + B_bar[:, t] * x[:, t, :, None]
    y[:, t] = einsum('bdn,bn->bd', h, C[:, t])

return y
```

**Algorithm 3: 硬件感知实现**

```python
# 关键优化：避免在 HBM 中物化 (B,L,D,N) 大小的中间状态
# 1. Kernel Fusion: 离散化 + scan 在 SRAM 中一次完成
# 2. Parallel Scan: O(L) work, O(log L) span
# 3. Recomputation: 反向传播时重算中间状态而非存储

def selective_scan_fwd(x, Delta, A, B, C):
    # 在 GPU SRAM 中：
    #   - 从 HBM 加载 (B,L,D) 的输入
    #   - 在 SRAM 中计算离散化 + scan
    #   - 只写回 (B,L,D) 的输出到 HBM
    #   - 不物化 (B,L,D,N) 的完整状态
    pass

def selective_scan_bwd(x, Delta, A, B, C, grad_y):
    # 重新计算前向中间状态（recomputation）
    # 避免存储 O(BLDN) 的激活值
    pass
```

### 方法详解

#### 1. 背景：连续状态空间模型

Mamba 建立在**结构化状态空间模型（Structured SSM）**的基础上。SSM 将输入序列 $x(t) \in \mathbb{R}$ 通过隐状态 $h(t) \in \mathbb{R}^N$ 映射到输出 $y(t) \in \mathbb{R}$：

**连续形式：**

$$h'(t) = Ah(t) + Bx(t)$$

$$y(t) = Ch(t)$$

其中 $A \in \mathbb{R}^{N \times N}$，$B \in \mathbb{R}^{N \times 1}$，$C \in \mathbb{R}^{1 \times N}$。

**离散化（ZOH）：** 通过步长 $\Delta$ 将连续系统离散化：

$$\bar{A} = \exp(\Delta A)$$

$$\bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B$$

离散递推形式：

$$h_t = \bar{A} h_{t-1} + \bar{B} x_t$$

$$y_t = C h_t$$

#### 2. 核心创新：选择性机制

**问题：** S4 等 LTI 模型的 $A$, $B$, $C$, $\Delta$ 均为固定参数，对所有输入 token 施加相同的动态变换。这导致：
- 无法根据内容决定记住/遗忘（如 Selective Copying 任务）
- 无法根据上下文产生不同输出（如 Induction Heads 任务）

**解决方案：** 让关键参数成为输入 $x_t$ 的函数：

$$s_B(x) = \text{Linear}_N(x), \quad B_t \in \mathbb{R}^{B \times L \times N}$$

$$s_C(x) = \text{Linear}_N(x), \quad C_t \in \mathbb{R}^{B \times L \times N}$$

$$s_\Delta(x) = \text{Broadcast}_D(\text{Linear}_R(x)), \quad \Delta_t \in \mathbb{R}^{B \times L \times D}$$

**$\Delta$ 的直觉解释：**
- **大 $\Delta$** → $\bar{A} \to 0$：重置隐状态，聚焦当前输入（"选择"当前 token）
- **小 $\Delta$** → $\bar{A} \to I$：保持隐状态，忽略当前输入（"跳过"当前 token）
- 这本质上是 RNN 门控机制的连续推广（类比 LSTM/GRU 的遗忘门）

**$B$ 和 $C$ 的直觉解释：**
- 选择性 $B$：控制输入 $x_t$ 是否写入隐状态 $h_t$（输入门）
- 选择性 $C$：控制隐状态 $h_t$ 是否读出到输出 $y_t$（输出门）

**为什么 $A$ 不需要选择性？** 因为 $A$ 通过 $\bar{A} = \exp(\Delta A)$ 与 $\Delta$ 交互，$\Delta$ 的选择性已经隐含了 $\bar{A}$ 的选择性。

#### 3. 硬件感知并行算法

选择性 SSM 是时变系统，无法展开为全局卷积。朴素递推是 $O(BLDN)$ 且串行。Mamba 通过三个技术实现高效计算：

| 技术 | 作用 |
|------|------|
| **Kernel Fusion** | 将离散化、scan、乘法融合为单个 CUDA kernel，避免 HBM 读写 |
| **Parallel Scan** | 利用 scan 的结合律，$O(\log L)$ 深度并行化递推 |
| **Recomputation** | 反向传播时重算中间状态，将激活内存从 $O(BLDN)$ 降至 $O(BLD)$ |

核心思想：**状态 $h \in \mathbb{R}^{B \times L \times D \times N}$ 只在 GPU SRAM 中存在，不写回 HBM**。这类似 FlashAttention 的 IO 感知设计。

#### 4. 简化架构设计

Mamba 将 H3 的"SSM block + MLP block"交替结构简化为单一同质 block：

- **扩展因子** $E = 2$：输入维度 $D$ 扩展到 $ED$
- **参数量**：每个 block 约 $3ED^2$（两个输入投影 $2ED^2$ + 一个输出投影 $ED^2$）
- **两个 Mamba block ≈ 一个 Transformer block**（$2 \times 6D^2 = 12D^2$，匹配 MHA + MLP）
- 使用 SiLU/Swish 激活（对应 SwiGLU 变体）
- 可选 LayerNorm（受 RetNet 启发）

#### 5. 与 Transformer 的关键对比

| 特性 | Transformer | Mamba |
|------|-------------|-------|
| 训练复杂度 | $O(L^2 D)$ | $O(LDN)$，线性 |
| 推理复杂度 | $O(L)$ per token (KV cache) | $O(1)$ per token |
| 推理内存 | $O(L)$ KV cache | $O(DN)$ 固定状态 |
| 内容感知 | ✅ Attention 天然内容感知 | ✅ 选择性参数实现 |
| 长序列 | 受限于 $O(L^2)$ | 线性扩展，百万级序列 |
| 推理吞吐 | 基准 | **5× 吞吐提升** |

#### 6. 关键实验结果

**语言建模（Pile 数据集）：**
- Mamba 是首个在 scaling law 上匹配 Transformer++（PaLM/LLaMA 配方）的非注意力模型
- Mamba-3B 的零样本下游任务表现匹配同数据训练的 Transformer-6B（Pythia-6B）
- 在 125M 到 1.3B 参数规模上，Mamba 持续优于 RWKV、RetNet 等其他亚二次模型

**其他领域：**
- **DNA 序列建模**：在长程基因组分类（Species DNA，序列长度 1024-32768）上显著优于 HyenaDNA
- **音频建模**：在音频波形生成上优于 SaShiMi（基于 S4 的音频模型）

**效率基准：**
- 序列长度 2K-1M 上，Mamba 的训练吞吐量随长度线性扩展
- A100 80GB GPU 上，Mamba-3B 的推理吞吐量约为同规模 Transformer 的 5 倍
- 支持百万级序列长度的训练和推理

---

## 🧪 练习题

### 概念理解

1. **为什么 S4 等 LTI-SSM 无法解决 Selective Copying 任务？** 请从卷积核的角度解释。

2. **Mamba 中 $\Delta$ 参数的选择性机制如何类比 LSTM 的门控？** 当 $\Delta \to \infty$ 和 $\Delta \to 0$ 时，递推行为分别是什么？

3. **为什么 Mamba 不需要让 $A$ 矩阵也具有选择性？** 请从离散化公式 $\bar{A} = \exp(\Delta A)$ 的角度解释。

### 技术深入

4. **推导题：** 给定连续 SSM $h'(t) = Ah(t) + Bx(t)$，使用零阶保持（ZOH）离散化，推导 $\bar{A} = \exp(\Delta A)$ 和 $\bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B$ 的过程。

5. **计算题：** 假设 batch size $B=8$，序列长度 $L=4096$，模型维度 $D=2048$，SSM 状态维度 $N=16$。
   - S6 的中间状态 $h$ 的完整形状是什么？占用多少内存（FP16）？
   - 为什么 Mamba 的硬件感知算法要避免在 HBM 中物化这个张量？

6. **设计题：** 如果要将 Mamba 的选择性机制应用到传统 LSTM 中，你会如何修改 LSTM 的门控机制？与原始 LSTM 相比有什么优势？

### 扩展思考

7. **Mamba 使用实数值 SSM 而非复数值 SSM，论文认为这与数据模态有关。** 请解释为什么复数值可能对连续信号（音频）有帮助，而对离散信号（文本）不必要。

8. **对比分析：** Mamba 的"选择性"与 Transformer 的"注意力"本质上都是实现内容感知。请分析两者在以下方面的异同：(a) 信息压缩方式 (b) 长程依赖建模 (c) 计算效率。