### TimeSformer —— 时空Transformer

```yaml
id: timesformer
name: TimeSformer
full_name: "时空Transformer (Is Space-Time Attention All You Need for Video Understanding?)"
year: 2021
org: Facebook AI Research
paper_url: https://arxiv.org/abs/2102.05095
category: transformer
parent: non_local
motivation: 分层时空自注意力机制
```

#### 📝 一句话总结

TimeSformer 提出了首个纯 Transformer 视频理解架构，通过将自注意力分解为**时间注意力**和**空间注意力**两个独立步骤（Divided Space-Time Attention），在保持高效计算的同时实现了对视频时空特征的有效建模，取代了传统 3D 卷积方法。

#### 🎯 核心要点

- **纯 Transformer 架构**：完全基于自注意力机制进行视频理解，不使用任何卷积操作，将 ViT 从图像扩展到视频领域
- **5 种时空注意力方案系统对比**：Space-only (S)、Joint Space-Time (ST)、Divided Space-Time (T+S)、Sparse Local-Global (L+G)、Axial (T+W+H)
- **Divided Space-Time Attention 最优**：先在时间维度（同一空间位置跨帧）做注意力，再在空间维度（同一帧内跨位置）做注意力，使用独立的 Q/K/V 参数
- **计算复杂度优势**：Divided 方案每个 patch 仅需 \(N + F + 2\) 次比较（\(N\) 为每帧 patch 数，\(F\) 为帧数），远低于 Joint 方案的 \(NF + 1\)
- **高效训练**：仅需 416 V100 GPU 小时即可在 K400 上达到 75.8% 准确率，而 SlowFast 需要 3840 GPU 小时才达到 75.6%
- **三种模型变体**：TimeSformer (8×224×224)、TimeSformer-HR (16×448×448 高分辨率)、TimeSformer-L (96×224×224 长视频)
- **ImageNet 预训练至关重要**：从头训练仅达 64.8%，ImageNet-21K 预训练可达 80.7% (K400)
- **基准结果**：K400 Top-1 80.7%（TimeSformer-L）、K600 82.2%、SSv2 62.4%、Diving-48 81.0%

#### 🔬 深入细节

![TimeSformer 五种时空注意力方案对比](https://ar5iv.labs.arxiv.org/html/2102.05095/assets/x1.png)
*图：TimeSformer 提出的五种时空自注意力方案。蓝色 patch 为查询位置，非蓝色彩色 patch 为该查询对应的注意力计算范围。(a) Space-only；(b) Joint Space-Time；(c) Divided Space-Time（最优方案）；(d) Sparse Local-Global；(e) Axial*

##### 动机与背景

3D 卷积网络（如 I3D、SlowFast）是视频理解的主流方法，但存在以下问题：
- **训练成本极高**：SlowFast 需要 3840 V100 GPU 小时，对计算资源要求苛刻
- **感受野有限**：3D 卷积核通常为 3×3×3，需要堆叠多层才能捕获长程依赖
- **难以处理长视频**：通常限制在 8-32 帧输入

Transformer 的自注意力机制天然具有全局感受野，且 ViT 已在图像分类上证明了纯 Transformer 的可行性。TimeSformer 的核心问题是：**如何将 ViT 的自注意力从 2D 图像高效扩展到 3D 视频？**

##### 输入表示与 Patch Embedding

给定视频片段 \(X \in \mathbb{R}^{H \times W \times 3 \times F}\)（\(F\) 帧，每帧 \(H \times W \times 3\)），TimeSformer 将每帧分割为 \(N = HW/P^2\) 个不重叠的 patch（\(P = 16\)）。每个 patch 通过线性嵌入映射到 \(D\) 维向量：

$$\mathbf{z}^{(0)}_{(p,t)} = E \cdot \mathbf{x}_{(p,t)} + \mathbf{e}^{pos}_{(p,t)}$$

其中 \(E \in \mathbb{R}^{D \times 3P^2}\) 为线性嵌入矩阵，\(\mathbf{e}^{pos}_{(p,t)}\) 为可学习的时空位置编码。额外添加一个分类 token \(\mathbf{z}^{(0)}_{(0,0)}\)，最终输入序列长度为 \(NF + 1\)。

> 💡 **关键**：位置编码同时编码空间位置和时间位置，实验表明时空位置编码比纯空间编码在 SSv2 上高出 7%（59.5% vs 52.5%），因为 SSv2 需要复杂的时序推理。

##### 自注意力计算

每个编码块中，对查询 patch \(\mathbf{z}^{(\ell)}_{(p,t)}\) 计算 Query、Key、Value：

$$\mathbf{q}^{(\ell, a)}_{(p,t)} = W_Q^{(\ell, a)} \text{LN}(\mathbf{z}^{(\ell-1)}_{(p,t)}) \quad \in \mathbb{R}^{D_h}$$
$$\mathbf{k}^{(\ell, a)}_{(p,t)} = W_K^{(\ell, a)} \text{LN}(\mathbf{z}^{(\ell-1)}_{(p,t)}) \quad \in \mathbb{R}^{D_h}$$
$$\mathbf{v}^{(\ell, a)}_{(p,t)} = W_V^{(\ell, a)} \text{LN}(\mathbf{z}^{(\ell-1)}_{(p,t)}) \quad \in \mathbb{R}^{D_h}$$

其中 \(a \in \{1, \dots, A\}\) 为注意力头索引，\(D_h = D/A\)，LN 为 LayerNorm。注意力权重通过缩放点积计算：

$$\alpha^{(\ell, a)}_{(p,t)} = \text{SM}\left(\frac{\mathbf{q}^{(\ell, a)}_{(p,t)} \cdot [\mathbf{k}^{(\ell, a)}_{(p',t')}]_{(p',t') \in \Omega}}{\sqrt{D_h}}\right)$$

##### 五种时空注意力方案

**核心区别在于注意力集合 \(\Omega\) 的定义**，即每个查询 patch 关注哪些其他 patch：

| 方案 | 注意力范围 \(\Omega\) | 每 patch 比较数 | 参数量 |
|------|----------------------|----------------|--------|
| Space-only (S) | 同帧所有 patch + CLS | \(N + 1\) | 85.9M |
| Joint Space-Time (ST) | 所有帧所有 patch + CLS | \(NF + 1\) | 85.9M |
| **Divided Space-Time (T+S)** | **先：同位置跨帧 + CLS；后：同帧跨位置 + CLS** | **\(N + F + 2\)** | **121.4M** |
| Sparse Local-Global (L+G) | 相邻帧局部 + 全局稀疏 | \(\sim H/2 \cdot F + N + 2\) | 121.4M |
| Axial (T+W+H) | 分别沿时间/宽度/高度轴 | \(F + H/P + W/P + 3\) | 156.8M |

##### Divided Space-Time Attention（核心创新）

这是 TimeSformer 的核心设计，每个编码块包含**两步注意力**：

**第一步——时间注意力**：对位置 \((p, t)\) 的 patch，关注**所有帧中相同空间位置**的 patch：

$$\mathbf{a}^{(\ell, a)time}_{(p,t)} = \sum_{t'=1}^{F} \alpha^{(\ell, a)}_{(p,t)(p,t')} \cdot \mathbf{v}^{(\ell, a)}_{(p,t')}$$

**第二步——空间注意力**：对时间注意力的输出，关注**同一帧中所有空间位置**的 patch：

$$\mathbf{a}^{(\ell, a)space}_{(p,t)} = \sum_{p'=1}^{N} \alpha^{(\ell, a)}_{(p,t)(p',t)} \cdot \mathbf{v}^{(\ell, a)}_{(p',t)}$$

> 💡 **关键设计选择**：时间注意力和空间注意力使用**独立的 Q/K/V 权重矩阵**，这赋予了模型更大的学习容量。虽然参数量从 85.9M 增加到 121.4M，但计算复杂度从 \(O(NF)\) 降低到 \(O(N + F)\)，在高分辨率或长视频场景下优势显著。

```python
# Divided Space-Time Attention 伪代码
def divided_spacetime_attention(x, temporal_qkv, spatial_qkv):
    """
    x: (B, F, N, D) — B:batch, F:frames, N:patches/frame, D:dim
    """
    # Step 1: Temporal Attention — 同一空间位置，跨帧交互
    for p in range(N):
        x_temporal = x[:, :, p, :]          # (B, F, D) — 所有帧的第p个patch
        q, k, v = temporal_qkv(LN(x_temporal))
        attn = softmax(q @ k.T / sqrt(D_h))
        x[:, :, p, :] += attn @ v           # 残差连接

    # Step 2: Spatial Attention — 同一帧内，跨空间位置交互
    for t in range(F):
        x_spatial = x[:, t, :, :]            # (B, N, D) — 第t帧所有patch
        q, k, v = spatial_qkv(LN(x_spatial))
        attn = softmax(q @ k.T / sqrt(D_h))
        x[:, t, :, :] += attn @ v           # 残差连接

    # MLP
    x = x + MLP(LN(x))
    return x
```

##### 计算效率分析

Divided 方案的核心优势在于**将二次复杂度分解为两个较小的二次项**：

- **Joint**: 注意力矩阵大小 \((NF+1) \times (NF+1)\)，计算量 \(O(N^2F^2)\)
- **Divided**: 时间注意力 \(O(NF^2)\) + 空间注意力 \(O(FN^2)\)，总计 \(O(NF(N+F))\)

当 \(N = 196\)（224×224/16²）、\(F = 8\) 时：
- Joint: \(196 \times 8 + 1 = 1569\) 个 token 的全注意力
- Divided: 时间 \(8+1=9\) + 空间 \(196+1=197\) = 每 patch 仅 206 次比较

> ⚠️ **注意**：Joint 方案在分辨率达到 448 像素或帧数增至 32 时会导致 GPU 内存溢出，而 Divided 方案可以处理 96 帧 224×224 或 16 帧 448×448 的输入。

##### 训练细节与预训练策略

- **骨干网络**：ViT-Base（12 层，768 维，12 头）
- **预训练**：ImageNet-1K 或 ImageNet-21K 上的 ViT 权重初始化
- **时间注意力权重初始化**：从预训练的空间注意力权重复制，确保训练初期模型行为与 ViT 一致
- **推理**：1 个时间 clip × 3 个空间 crop（左上、中心、右下），取平均分数
- **帧采样**：默认 1/32 采样率（即每 32 帧取 1 帧）

##### 与传统方法的对比

| 维度 | 3D CNN (SlowFast/I3D) | TimeSformer |
|------|----------------------|-------------|
| 基本操作 | 3D 卷积 | 自注意力 |
| 感受野 | 局部（需堆叠扩大） | 全局（每层即全局） |
| 时空建模 | 隐式耦合 | 显式分解（T+S） |
| 训练成本 | 3840 GPU·h (SlowFast) | 416 GPU·h |
| 长视频能力 | 8-32 帧 | 最多 96 帧 |
| 预训练依赖 | 可从头训练 | 强依赖 ImageNet 预训练 |
| K400 准确率 | 79.8% (SlowFast 16×8 R101) | 80.7% (TimeSformer-L) |

> 💡 **关键洞察**：在 K400 上，Space-only 注意力（无时间建模）即可达到 76.9%，说明该数据集偏重空间场景信息。而在 SSv2 上，Space-only 仅 36.6%，Divided 达 59.5%，凸显了时间建模对时序推理任务的必要性。

#### 🧪 练习题

```yaml
question: "TimeSformer 中 Divided Space-Time Attention 相比 Joint Space-Time Attention 的主要优势是什么？"
options:
  - "参数量更少，模型更轻量"
  - "通过分解时空注意力降低计算复杂度，同时使用独立参数提升学习容量"
  - "不需要位置编码，简化了模型设计"
  - "仅在空间维度计算注意力，忽略时间信息以提高效率"
answer: 1
explain: "Divided 方案将注意力分解为时间和空间两步，复杂度从 O(N²F²) 降至 O(NF(N+F))，且使用独立的 Q/K/V 参数增加学习容量。虽然参数量从 85.9M 增至 121.4M，但计算量大幅降低，尤其在高分辨率和长视频场景下优势显著。"
```