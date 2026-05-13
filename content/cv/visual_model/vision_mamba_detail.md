### Vision Mamba (Vim)

```yaml
id: vision_mamba
name: "Vision Mamba"
full_name: "Vision Mamba: Efficient Visual Representation Learning with Bidirectional State Space Model"
year: "2024.01"
org: "华中科技大学 / 地平线机器人 / 北京智源人工智能研究院"
paper_url: "https://arxiv.org/abs/2401.09417"
category: "foundation"
parent: "swin"
motivation: "将 Mamba 状态空间模型引入视觉领域，通过双向 SSM 实现线性复杂度的视觉表征学习"
```

#### 📝 一句话总结

Vision Mamba（Vim）将 Mamba 的选择性状态空间模型（SSM）引入计算机视觉，提出双向 SSM 编码器处理图像 patch 序列，在保持与 ViT 相当性能的同时实现了序列长度的线性计算复杂度，显著降低了高分辨率图像处理的计算和显存开销。

#### 🎯 核心要点

- 首个纯 SSM 架构的通用视觉骨干网络，不使用任何注意力机制
- 双向状态空间模型（Bidirectional SSM）：对 patch 序列同时进行前向和后向扫描，弥补单向 SSM 缺乏全局上下文的不足
- 类 ViT 的 patch 嵌入方式：图像分块 → 线性投影 + 位置编码 + CLS token
- 数据依赖的 SSM 参数：\(\mathbf{B}\)、\(\mathbf{C}\)、\(\boldsymbol{\Delta}\) 均由输入动态生成（继承 Mamba 的选择性机制）
- 线性复杂度 \(O(M)\)：相比 ViT 的 \(O(M^2)\) 自注意力，序列长度增长时计算量线性增长
- 两种模型规格：Vim-Ti（Tiny）和 Vim-S（Small），分别对标 DeiT-Ti 和 DeiT-S
- 在 ImageNet 分类、COCO 检测/分割、ADE20K 语义分割等任务上验证有效性

#### 🔬 深入细节

![Vision Mamba 整体架构图](https://arxiv.org/html/2401.09417v1/x2.png)
*图：Vision Mamba（Vim）模型总览。输入图像被分割为 patch 并投影为 token 序列，经过 L 层 Vim 编码器处理后，通过 CLS token 输出分类结果。Vim 编码器的核心是双向 SSM 处理（前向 + 后向）。*

##### 算法伪代码

```python
# Vision Mamba Block (Algorithm 1)
def vim_block(T_prev, norm, linear_x, linear_z, linear_T,
              conv1d_fwd, conv1d_bwd, ssm_params_fwd, ssm_params_bwd):
    # Step 1: 归一化
    T_norm = norm(T_prev)                        # (B, M, D)

    # Step 2: 双分支线性投影
    x = linear_x(T_norm)                         # (B, M, E)
    z = linear_z(T_norm)                         # (B, M, E)

    y_list = []
    for direction in ['forward', 'backward']:
        conv1d = conv1d_fwd if direction == 'forward' else conv1d_bwd
        params = ssm_params_fwd if direction == 'forward' else ssm_params_bwd

        # Step 3: 1D 卷积 + SiLU 激活
        x_prime = silu(conv1d(x))                # (B, M, E)

        # Step 4: 数据依赖的 SSM 参数
        B = linear_B(x_prime)                    # (B, M, N)
        C = linear_C(x_prime)                    # (B, M, N)
        Delta = softplus(linear_delta(x_prime) + param_delta)  # (B, M, E)

        # Step 5: 离散化
        A_bar = Delta ⊗ param_A                  # (B, M, E, N)
        B_bar = Delta ⊗ B                        # (B, M, E, N)

        # Step 6: SSM 递推
        y = SSM(A_bar, B_bar, C)(x_prime)        # (B, M, E)
        y_list.append(y)

    # Step 7: 门控融合 + 残差连接
    y_fwd_gated = y_list[0] * silu(z)            # (B, M, E)
    y_bwd_gated = y_list[1] * silu(z)            # (B, M, E)
    T_out = linear_T(y_fwd_gated + y_bwd_gated) + T_prev  # (B, M, D)
    return T_out
```

##### 动机与背景

Vision Transformer（ViT）凭借自注意力机制在视觉任务中取得了巨大成功，但其核心瓶颈在于自注意力的 **二次复杂度**——对于长度为 \(M\) 的序列，计算和显存开销为 \(O(M^2)\)。当处理高分辨率图像（如 1248×1248 像素）时，patch 序列长度可达数千甚至上万，导致 ViT 的计算成本急剧膨胀。

与此同时，状态空间模型（SSM）在 NLP 领域展现了处理长序列的强大能力。特别是 **Mamba** 通过引入数据依赖的选择性机制，在语言建模任务上达到了与 Transformer 相当的性能，同时保持了序列长度的线性复杂度。然而，Mamba 是为 1D 序列设计的，直接应用于 2D 图像面临两个关键挑战：

1. **空间感知不足**：图像具有 2D 空间结构，而标准 Mamba 仅处理 1D 序列
2. **单向建模局限**：标准 Mamba 采用因果（单向）扫描，无法同时捕获前后文信息

##### 核心机制：双向状态空间模型

**SSM 基础公式**

Vision Mamba 建立在连续状态空间模型之上。连续系统将输入信号 \(x(t) \in \mathbb{R}\) 通过隐状态 \(h(t) \in \mathbb{R}^N\) 映射到输出 \(y(t) \in \mathbb{R}\)：

$$h'(t) = \mathbf{A}h(t) + \mathbf{B}x(t)$$
$$y(t) = \mathbf{C}h(t)$$

其中 \(\mathbf{A} \in \mathbb{R}^{N \times N}\) 是状态转移矩阵，\(\mathbf{B} \in \mathbb{R}^{N \times 1}\)、\(\mathbf{C} \in \mathbb{R}^{1 \times N}\) 是投影参数。

通过零阶保持（ZOH）离散化，引入时间步长 \(\boldsymbol{\Delta}\)：

$$\overline{\mathbf{A}} = \exp(\boldsymbol{\Delta} \mathbf{A})$$
$$\overline{\mathbf{B}} = (\boldsymbol{\Delta} \mathbf{A})^{-1}(\exp(\boldsymbol{\Delta} \mathbf{A}) - \mathbf{I}) \cdot \boldsymbol{\Delta} \mathbf{B}$$

离散递推形式为：

$$h_t = \overline{\mathbf{A}} h_{t-1} + \overline{\mathbf{B}} x_t, \quad y_t = \mathbf{C} h_t$$

> 💡 **关键直觉**：SSM 的递推形式类似 RNN，每一步只需 \(O(1)\) 计算（给定隐状态维度），因此处理长度为 \(M\) 的序列总复杂度为 \(O(M)\)，而非注意力的 \(O(M^2)\)。

**图像 Patch 化与嵌入**

与 ViT 类似，Vim 首先将输入图像 \(\mathbf{t} \in \mathbb{R}^{H \times W \times C}\) 分割为 \(J\) 个大小为 \(P \times P\) 的 patch，然后通过线性投影和位置编码生成 token 序列：

$$\mathbf{T}_0 = [\mathbf{t}_{cls}; \mathbf{t}_p^1 \mathbf{W}; \mathbf{t}_p^2 \mathbf{W}; \cdots; \mathbf{t}_p^J \mathbf{W}] + \mathbf{E}_{pos}$$

其中 \(\mathbf{W} \in \mathbb{R}^{(P^2 \cdot C) \times D}\) 是可学习的投影矩阵，\(\mathbf{E}_{pos} \in \mathbb{R}^{(J+1) \times D}\) 是位置编码，\(\mathbf{t}_{cls}\) 是可学习的分类 token。

**双向 Vim Block**

Vim Block 是整个架构的核心创新。与标准 Mamba 的单向扫描不同，Vim Block 对 token 序列同时进行 **前向扫描** 和 **后向扫描**，确保每个 token 都能感知到序列中所有其他 token 的信息：

1. **归一化与投影**：输入 \(\mathbf{T}_{l-1}\) 经过 LayerNorm 后，分别投影为主分支 \(\mathbf{x}\) 和门控分支 \(\mathbf{z}\)
2. **双向 SSM 处理**：对 \(\mathbf{x}\) 分别进行前向和后向的 Conv1d → SiLU → SSM 处理，每个方向有独立的参数
3. **数据依赖参数**：\(\mathbf{B}_o\)、\(\mathbf{C}_o\)、\(\boldsymbol{\Delta}_o\) 均从输入 \(\mathbf{x}'_o\) 动态生成，使模型能根据输入内容选择性地关注或忽略信息
4. **门控融合**：前向和后向的输出分别与 \(\text{SiLU}(\mathbf{z})\) 逐元素相乘（门控），然后相加
5. **残差连接**：最终通过线性投影映射回 \(D\) 维并加上残差

$$\mathbf{T}_l = \text{Linear}^{\mathbf{T}}(\mathbf{y}'_{forward} + \mathbf{y}'_{backward}) + \mathbf{T}_{l-1}$$

> ⚠️ **注意**：双向扫描是 Vim 区别于原始 Mamba 的核心设计。单向 SSM 在处理图像时，后面的 patch 无法感知前面的信息（或反之），而图像的空间关系是非因果的，双向扫描正好弥补了这一缺陷。

##### 架构配置与效率分析

Vim 的超参数包括：
- \(\mathtt{L}\)：Vim Block 的层数
- \(\mathtt{D}\)：隐藏状态维度
- \(\mathtt{E}\)：扩展状态维度（通常 \(E = 2D\)）
- \(\mathtt{N}\)：SSM 维度

| 模型 | 层数 L | 隐藏维度 D | 参数量 | ImageNet Top-1 |
|------|--------|-----------|--------|----------------|
| Vim-Ti | 24 | 192 | 7M | 76.1% |
| Vim-S | 24 | 384 | 26M | 80.5% |

**效率优势**：
- **计算复杂度**：Vim 的 SSM 递推为 \(O(M)\)，而 ViT 自注意力为 \(O(M^2)\)。当图像分辨率从 224 增加到 1248 时，Vim 的计算量仅线性增长，而 DeiT 的计算量增长了约 8.5 倍
- **显存效率**：Vim 在推理时显存占用远低于 DeiT，尤其在高分辨率场景下优势更加明显（1248×1248 时节省约 86.8% GPU 显存）
- **推理速度**：在 batch size=1 的 1248×1248 图像推理中，Vim-Ti 比 DeiT-Ti 快 2.8 倍

##### 与传统方法的区别

| 特性 | ViT / DeiT | Swin Transformer | Vision Mamba (Vim) |
|------|-----------|-------------------|-------------------|
| 核心机制 | 全局自注意力 | 窗口注意力 + 移位 | 双向状态空间模型 |
| 序列复杂度 | \(O(M^2)\) | \(O(M)\)（窗口内） | \(O(M)\) |
| 全局感受野 | ✅ 每层全局 | ❌ 需跨窗口交互 | ✅ 通过 SSM 递推 |
| 位置编码 | 绝对/相对 | 相对位置偏置 | 绝对位置编码 |
| 高分辨率扩展 | 显存爆炸 | 线性扩展 | 线性扩展 |
| 建模方式 | 无序集合 | 局部窗口 | 序列递推（双向） |

> 💡 **核心优势总结**：Vim 同时具备了 ViT 的全局感受野和 Swin 的线性复杂度，是首个纯 SSM 架构的通用视觉骨干，为视觉模型提供了注意力机制之外的新范式。

#### 🧪 练习题

```yaml
question: "Vision Mamba 引入双向 SSM 的主要目的是什么？"
options:
  - "加速模型训练收敛"
  - "弥补单向 SSM 无法同时捕获前后文信息的缺陷，适应图像的非因果空间关系"
  - "减少模型参数量"
  - "替代位置编码以增强空间感知能力"
answer: 1
explain: "图像 patch 之间的空间关系是非因果的，单向 SSM 只能从一个方向扫描，后方 patch 无法感知前方信息。双向扫描使每个 token 都能聚合来自两个方向的全局上下文。"
```