### Vision Mamba (Vim)

```yaml
id: vim
name: Vision Mamba
full_name: "Vision Mamba: Efficient Visual Representation Learning with Bidirectional State Space Model"
year: "2024"
org: "HUST & Horizon Robotics"
paper_url: "https://arxiv.org/abs/2401.09417"
category: "backbone"
parent: "Mamba"
motivation: "将 Mamba 的线性复杂度序列建模能力引入视觉领域，用双向状态空间模型替代自注意力，实现 O(n) 复杂度的视觉表征学习"
```

#### 📝 一句话总结

Vision Mamba (Vim) 提出了基于双向状态空间模型 (Bidirectional SSM) 的纯序列视觉骨干网络，以 \(O(n)\) 线性复杂度替代 ViT 的 \(O(n^2)\) 自注意力机制，在 ImageNet 分类、ADE20K 语义分割和 COCO 检测上均超越同规模 DeiT，同时在高分辨率场景下实现 2.8× 加速与 86.8% 显存节省。

#### 🎯 核心要点

- **纯 SSM 视觉骨干**：首次将 Mamba（选择性状态空间模型）应用于通用视觉表征学习，无需卷积或自注意力
- **双向 SSM 机制**：对每个 token 序列同时进行前向和后向 SSM 扫描，弥补单向 SSM 无法捕获全局上下文的缺陷
- **线性复杂度**：序列长度 \(n\) 下计算和内存均为 \(O(n)\)，对比 ViT 的 \(O(n^2)\) 在高分辨率输入上优势显著
- **位置嵌入 + CLS Token**：采用双向学习的位置嵌入和类别 token，兼容分类与密集预测任务
- **长序列微调策略**：通过减小 patch 提取步长（stride=8, patch_size=16）增加序列长度，进一步提升性能（Vim-S† 达 81.6 top-1）
- **ImageNet-1K**：Vim-Ti 76.1 (+3.9 vs DeiT-Ti)，Vim-S 80.5 (+0.7 vs DeiT-S)
- **ADE20K 语义分割**：Vim-Ti 41.0 mIoU (+1.8 vs DeiT-Ti)，Vim-S 44.9 mIoU (+0.9 vs DeiT-S)
- **COCO 检测**：Vim-Ti AP\(^{\text{box}}\) 45.7 (+1.3 vs DeiT-Ti)，AP\(^{\text{mask}}\) 39.2 (+1.1)

#### 🔬 深入细节

![Vim 整体架构](https://github.com/hustvl/Vim/raw/main/assets/vim_pipeline.png)
*图：Vision Mamba 整体流程——图像经 Patch Embedding 后加入位置嵌入和 CLS Token，送入 L 层 Vim Encoder Block，最后通过 Norm + MLP Head 输出分类结果。*

![Vim Block 结构](https://github.com/hustvl/Vim/raw/main/assets/vim_block.png)
*图：Vim Block 内部结构——输入经 Normalize 后分为两个线性分支 (x, z)，x 分支进行双向 SSM 处理，z 分支提供门控信号。*

**算法伪代码（Vim Block）：**

```python
# Vim Block 前向传播
def vim_block(input_T, params):
    # input_T: (B, L, D) — B=batch, L=序列长度, D=维度
    x_norm = Normalize(input_T)                  # LayerNorm
    x = Linear_x(x_norm)  # (B, L, D) → (B, L, E)  投影到扩展维度
    z = Linear_z(x_norm)  # (B, L, D) → (B, L, E)  门控分支

    # === 前向 SSM ===
    x_fwd = SiLU(Conv1d(x))                     # 局部特征 + 激活
    B_fwd = Linear_B(x_fwd)                      # (B, L, N) 输入矩阵
    C_fwd = Linear_C(x_fwd)                      # (B, L, N) 输出矩阵
    delta_fwd = softplus(Linear_delta(x_fwd))     # (B, L, E) 步长参数
    # 离散化: A_bar = exp(delta * A), B_bar = delta * B
    y_fwd = SSM_scan(x_fwd, A_bar_fwd, B_bar_fwd, C_fwd)  # (B, L, E)

    # === 后向 SSM ===
    x_bwd = flip(x)  # 反转序列
    # 同样流程: Conv1d → SiLU → Linear_{B,C,Δ} → 离散化 → SSM
    y_bwd = SSM_scan(x_bwd, A_bar_bwd, B_bar_bwd, C_bwd)
    y_bwd = flip(y_bwd)  # 反转回原序列顺序

    # === 门控融合 ===
    y_fwd_gated = y_fwd * SiLU(z)               # 前向输出 × 门控
    y_bwd_gated = y_bwd * SiLU(z)               # 后向输出 × 门控
    output = Linear_T(y_fwd_gated + y_bwd_gated) # (B, L, E) → (B, L, D)

    return output + input_T                       # 残差连接
```

##### 动机与背景

Vision Transformer (ViT) 将图像切分为 patch 序列后使用自注意力建模，取得了优异的视觉表征能力，但自注意力的 \(O(n^2)\) 复杂度在高分辨率图像（如 1024×1024 产生 4096 个 patch）上带来严重的计算和内存瓶颈。传统解决方案如窗口注意力 (Swin) 虽降低了复杂度，但引入了 2D 先验，破坏了纯序列建模的通用性。

Mamba 是一种选择性状态空间模型 (Selective SSM)，在 NLP 领域已展示出与 Transformer 匹敌的性能，同时保持 \(O(n)\) 的线性复杂度。然而，Mamba 原生设计为单向因果模型（从左到右），直接应用于视觉任务存在两个关键问题：
1. **单向性**：图像 patch 序列不具有因果性，单向扫描无法充分利用全局上下文
2. **位置感知**：视觉 token 需要空间位置信息

##### 核心机制：双向状态空间模型

**SSM 基础**：状态空间模型将输入序列 \(x(t)\) 映射到输出 \(y(t)\)，通过隐状态 \(h(t)\) 进行信息传递：

$$h'(t) = \mathbf{A} h(t) + \mathbf{B} x(t), \quad y(t) = \mathbf{C} h(t)$$

其中 \(\mathbf{A} \in \mathbb{R}^{N \times N}\) 是状态转移矩阵，\(\mathbf{B} \in \mathbb{R}^{N \times 1}\)、\(\mathbf{C} \in \mathbb{R}^{1 \times N}\) 分别是输入和输出投影。通过零阶保持 (ZOH) 离散化：

$$\bar{\mathbf{A}} = \exp(\Delta \mathbf{A}), \quad \bar{\mathbf{B}} = (\Delta \mathbf{A})^{-1}(\exp(\Delta \mathbf{A}) - \mathbf{I}) \cdot \Delta \mathbf{B}$$

离散后的递推形式为：

$$h_t = \bar{\mathbf{A}} h_{t-1} + \bar{\mathbf{B}} x_t, \quad y_t = \mathbf{C} h_t$$

> 💡 **关键直觉**：SSM 本质上是一个"压缩记忆"机制——隐状态 \(h_t\) 将历史信息压缩为固定大小的向量，每步仅需 \(O(1)\) 更新，因此整个序列处理为 \(O(n)\)。

**Mamba 的选择性机制**：与传统 SSM（参数固定）不同，Mamba 让 \(\mathbf{B}\)、\(\mathbf{C}\)、\(\Delta\) 依赖于输入 \(x_t\)，使模型能够根据内容动态选择保留或遗忘信息，类似于注意力机制的"选择性关注"。

**Vim 的双向扩展**：为解决单向 SSM 的局限性，Vim 对同一输入序列分别进行前向（\(t = 1 \to L\)）和后向（\(t = L \to 1\)）SSM 扫描，两个方向使用独立的参数（\(\mathbf{B}\)、\(\mathbf{C}\)、\(\Delta\)），最终将两个方向的输出相加融合。这确保每个 token 都能同时获取来自序列两端的上下文信息。

> ⚠️ **设计选择**：消融实验表明，"双向 SSM + Conv1d"组合效果最佳（ImageNet 73.9 / ADE20K 35.9），优于仅双向层（70.9 / 33.6）或仅双向 SSM（72.8 / 33.2）。Conv1d 提供了局部特征提取能力，与 SSM 的全局建模形成互补。

##### 整体架构

Vim 的整体架构遵循 ViT 的设计范式：

1. **Patch Embedding**：将输入图像 \(I \in \mathbb{R}^{H \times W \times C}\) 切分为 \(J\) 个大小为 \(P \times P\) 的 patch，线性投影为 \(D\) 维 token 序列
2. **位置嵌入 + CLS Token**：添加可学习的 1D 位置嵌入 \(E_{\text{pos}} \in \mathbb{R}^{(J+1) \times D}\) 和分类 token \(t_{\text{cls}}\)
3. **L 层 Vim Block**：每层包含 Normalize → 双分支投影 → 双向 SSM → 门控融合 → 残差连接
4. **分类头**：最终 Normalize + MLP Head 作用于 CLS token

模型配置：
| 变体 | 层数 L | 维度 D | SSM 维度 N | 扩展比 E/D | 参数量 |
|------|--------|--------|-----------|-----------|--------|
| Vim-Ti | 24 | 192 | 16 | ~2× | 7M |
| Vim-S | 24 | 384 | 16 | ~2× | 26M |

##### 效率分析

Vim 的核心优势在于线性复杂度。对于序列长度 \(n\)：
- **自注意力 (ViT)**：计算 \(O(n^2 \cdot D)\)，内存 \(O(n^2)\)
- **SSM (Vim)**：计算 \(O(n \cdot D \cdot N)\)，内存 \(O(n \cdot D \cdot N)\)

实测效率对比（Vim-Ti vs DeiT-Ti）：

| 分辨率 | Vim FPS 优势 | Vim 内存节省 |
|--------|-------------|-------------|
| 512×512 | ~1× | ~1× |
| 1248×1248 | **2.8×** 更快 | **86.8%** 节省 |

> 💡 **关键**：在低分辨率下 Vim 与 DeiT 效率相当，但随着分辨率增长，线性 vs 二次的差距急剧放大。这使 Vim 特别适合高分辨率密集预测任务（语义分割、目标检测）以及超长序列多模态应用。

##### 与传统方法的对比

| 方面 | ViT / DeiT | Swin Transformer | Vim |
|------|-----------|-------------------|-----|
| 序列建模 | 全局自注意力 | 窗口注意力 + 移位 | 双向 SSM |
| 复杂度 | \(O(n^2)\) | \(O(n)\)（窗口内） | \(O(n)\) |
| 2D 先验 | 无 | 窗口划分 | 无 |
| 高分辨率扩展 | 差 | 中 | 优 |
| 纯序列建模 | ✓ | ✗ | ✓ |

Vim 的独特优势在于：保持了 ViT 纯序列建模的通用性（无需窗口等 2D 先验），同时获得了与 Swin 类似的线性复杂度。在 COCO 检测中，DeiT 需要使用窗口注意力才能处理 1024×1024 输入，而 Vim 可以直接以纯序列方式处理。

##### 实验结果汇总

**ImageNet-1K 分类：**

| 模型 | 参数量 | Top-1 Acc |
|------|--------|-----------|
| ResNet-50 | 25M | 76.2 |
| DeiT-Ti | 6M | 72.2 |
| DeiT-S | 22M | 79.8 |
| DeiT-B | 87M | 81.8 |
| **Vim-Ti** | 7M | **76.1** |
| **Vim-Ti†** | 7M | **78.3** |
| **Vim-S** | 26M | **80.5** |
| **Vim-S†** | 26M | **81.6** |

**ADE20K 语义分割（UperNet）：**

| 骨干网络 | 参数量 | mIoU |
|---------|--------|------|
| DeiT-Ti | — | 39.2 |
| DeiT-S | — | 44.0 |
| **Vim-Ti** | 13M | **41.0** |
| **Vim-S** | 46M | **44.9** |

**COCO 检测与实例分割（Cascade Mask R-CNN）：**

| 骨干网络 | AP\(^{\text{box}}\) | AP\(^{\text{mask}}\) |
|---------|---------------------|----------------------|
| DeiT-Ti | 44.4 | 38.1 |
| **Vim-Ti** | **45.7** | **39.2** |

#### 🧪 练习题

```yaml
question: "Vision Mamba 采用双向 SSM 的主要原因是什么？"
options:
  - "降低模型参数量"
  - "图像 patch 序列不具有因果性，单向 SSM 无法捕获完整的上下文信息"
  - "加速 SSM 的并行计算"
  - "替代位置嵌入提供空间信息"
answer: 1
explain: "图像不同于自然语言，patch 序列没有固有的因果方向。单向 SSM 只能从一个方向积累信息，导致序列末端 token 缺少来自另一方向的上下文。双向 SSM 通过同时进行前向和后向扫描，确保每个 token 都能获取完整的全局信息。"
```