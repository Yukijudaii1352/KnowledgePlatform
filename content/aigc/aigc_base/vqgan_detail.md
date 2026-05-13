### VQGAN

```yaml
id: vqgan
name: VQGAN
full_name: 向量量化生成对抗网络 (Taming Transformers for High-Resolution Image Synthesis)
year: 2021
org: CompVis (Heidelberg University)
paper_url: https://arxiv.org/abs/2012.09841
category: gan_vae
parent: vq-vae
motivation: 用对抗训练提升离散码本的表征质量，使Transformer能在压缩的离散潜空间中高效建模高分辨率图像
```

#### 📝 一句话总结

VQGAN 提出用感知损失与对抗训练替代传统 VQ-VAE 的 L2 重建损失来学习高质量离散码本，并在压缩后的离散潜空间上训练自回归 Transformer，从而首次实现了百万像素级高分辨率图像的高保真合成。

#### 🎯 核心要点

- **两阶段框架**：第一阶段训练 VQGAN（CNN 编码器-解码器 + 向量量化码本），第二阶段在离散码本索引上训练自回归 Transformer
- **感知损失 + 对抗训练**：用 LPIPS 感知损失和 Patch-based 判别器替代 L2 重建损失，显著提升码本表征质量
- **自适应权重 \(\lambda\)**：根据重建损失与 GAN 损失对解码器最后一层梯度的比值，动态平衡两个损失项
- **向量量化码本**：将连续特征离散化为 \(|\mathcal{Z}|=1024\) 个码本条目，大幅压缩序列长度
- **条件生成**：将条件信息（类别标签、分割图等）也编码为离散索引，拼接在目标序列前，实现 decoder-only 条件生成
- **滑动窗口注意力**：训练时裁剪局部 patch，推理时用滑动窗口方式生成超高分辨率图像

#### 🔬 深入细节

##### 整体架构

![VQGAN 架构图](https://ar5iv.labs.arxiv.org/html/2012.09841/assets/x2.png)
*图：VQGAN 两阶段训练流程。左侧为 CNN-based VQGAN 学习离散码本，右侧为 Transformer 在码本索引序列上进行自回归建模。*

##### 算法伪代码

```python
# ========== 第一阶段：训练 VQGAN ==========
# 输入：图像 x, 编码器 E, 解码器 G, 码本 Z, 判别器 D
z_e = E(x)                          # 编码: x → 连续特征 z_e ∈ R^{h×w×n_z}
z_q = quantize(z_e, Z)              # 量化: 每个空间位置找码本中最近邻
x_hat = G(z_q)                      # 解码: z_q → 重建图像

# 计算损失
L_rec = LPIPS(x, x_hat)             # 感知重建损失 (非 L2)
L_VQ  = ||sg[z_e] - z_q||^2         # 码本对齐损失
      + β * ||z_e - sg[z_q]||^2     # 承诺损失 (commitment)
L_GAN = -log(D(x)) - log(1 - D(x_hat))  # 对抗损失

# 自适应权重
λ = ∇_{G_L}[L_rec] / (∇_{G_L}[L_GAN] + 1e-6)

# 总损失
L_total = L_rec + L_VQ + λ * L_GAN

# ========== 第二阶段：训练 Transformer ==========
# 输入：预训练的 E 和码本 Z, Transformer T
z_q = quantize(E(x), Z)             # 编码 + 量化
s = codebook_indices(z_q)           # 转为索引序列 s ∈ {0,...,1023}^{h×w}
s = raster_scan(s)                  # 展平为 1D 序列

# 自回归训练
for i in range(len(s)):
    p(s_i | s_{<i}) = T(s_{<i})     # 预测下一个码本索引
L_transformer = -Σ log p(s_i | s_{<i})  # 交叉熵损失
```

##### 动机与背景

传统 Transformer 在图像生成领域面临一个核心矛盾：**Transformer 擅长建模长程依赖和全局组合结构，但其自注意力机制的计算复杂度为 \(O(n^2)\)，无法直接处理高分辨率图像的像素序列**。例如，一张 \(256 \times 256\) 的图像展平后有 65536 个像素，远超 Transformer 的可行序列长度。

此前的 VQ-VAE 通过向量量化将图像压缩为离散码本索引序列，但其使用简单的 L2 重建损失，导致码本表征质量有限——要么需要非常大的码本（序列仍然很长），要么重建质量差。VQGAN 的核心洞察是：**通过引入感知损失和对抗训练，可以在更高压缩比下保持优秀的重建质量**，从而让 Transformer 在足够短的序列上工作。

##### 核心机制一：感知损失 + 对抗训练的码本学习

VQGAN 的第一阶段训练一个编码器 \(E\)、解码器 \(G\)（即生成器）和离散码本 \(\mathcal{Z} = \{z_k\}_{k=1}^{K}\)。编码器将输入图像 \(x \in \mathbb{R}^{H \times W \times 3}\) 映射为连续特征图 \(\hat{z} = E(x) \in \mathbb{R}^{h \times w \times n_z}\)，其中 \(h = H/2^m\)，\(m\) 为下采样次数。

**向量量化**过程将每个空间位置的特征向量替换为码本中最近的条目：

$$z_{\mathbf{q}} = \mathbf{q}(\hat{z}) := \arg\min_{z_k \in \mathcal{Z}} \|\hat{z}_{ij} - z_k\|$$

传统 VQ-VAE 的损失函数为：

$$\mathcal{L}_{\text{VQ}}(E, G, \mathcal{Z}) = \|x - \hat{x}\|^2 + \|\text{sg}[E(x)] - z_{\mathbf{q}}\|_2^2 + \beta\|E(x) - \text{sg}[z_{\mathbf{q}}]\|_2^2$$

其中 \(\text{sg}[\cdot]\) 为 stop-gradient 操作。VQGAN 的关键改进是**将 L2 重建损失替换为感知损失 (LPIPS)**，并加入 **patch-based 判别器** \(D\)：

$$\mathcal{L} = \underbrace{\mathcal{L}_{\text{rec}}}_{\text{LPIPS 感知损失}} + \underbrace{\mathcal{L}_{\text{VQ}}}_{\text{码本损失}} + \underbrace{\lambda \cdot \mathcal{L}_{\text{GAN}}}_{\text{对抗损失}}$$

> 💡 **关键直觉**：L2 损失倾向于产生模糊的重建结果，因为它惩罚的是逐像素差异。感知损失在预训练 VGG 特征空间中度量差异，更符合人类视觉感知；判别器则进一步迫使重建结果具有真实的纹理细节。两者结合使得即使在高压缩比（如 \(16 \times\) 下采样）下，重建图像仍然清晰锐利。

##### 核心机制二：自适应权重 \(\lambda\)

重建损失和 GAN 损失的量级差异很大，直接加权会导致训练不稳定。VQGAN 提出了一种**自适应权重机制**，根据两个损失对解码器最后一层 \(G_L\) 的梯度大小动态调整：

$$\lambda = \frac{\nabla_{G_L}[\mathcal{L}_{\text{rec}}]}{\nabla_{G_L}[\mathcal{L}_{\text{GAN}}] + \delta}$$

其中 \(\delta = 10^{-6}\) 保证数值稳定。

> 💡 **设计直觉**：当 GAN 损失的梯度远大于重建损失时，\(\lambda\) 自动减小，抑制判别器对生成器的过度影响；反之则增大 GAN 损失的权重。这使得训练过程中两个损失项始终保持平衡，无需手动调参。

##### 核心机制三：Transformer 自回归建模

第二阶段冻结 VQGAN 的编码器和码本，将图像编码为离散索引序列 \(s \in \{0, \dots, |\mathcal{Z}|-1\}^{h \times w}\)。将 2D 索引图按光栅扫描顺序展平为 1D 序列后，训练一个 GPT-2 风格的自回归 Transformer 建模其分布：

$$p(s) = \prod_{i} p(s_i \mid s_{<i})$$

训练目标为最大化数据表示的对数似然：

$$\mathcal{L}_{\text{Transformer}} = \mathbb{E}_{x \sim p(x)}\left[-\log p(s)\right]$$

**条件生成**的实现非常优雅：将条件信息 \(c\)（如语义分割图）也通过另一个 VQGAN 编码为索引序列 \(r\)，然后将 \(r\) 拼接在 \(s\) 前面作为前缀。Transformer 只需学习 \(p(s_i \mid s_{<i}, r)\)，这种 "decoder-only" 策略无需修改模型架构。

##### 高分辨率生成：滑动窗口策略

![滑动注意力窗口](https://ar5iv.labs.arxiv.org/html/2012.09841/assets/x3.png)
*图：滑动窗口注意力机制示意。训练时在局部 patch 上训练，推理时通过滑动窗口逐步生成超高分辨率图像。*

当目标分辨率超过 Transformer 的最大序列长度时，VQGAN 采用**滑动窗口**策略：训练时裁剪图像为固定大小的 patch，推理时按滑动窗口方式逐块生成，每个窗口可以利用前面已生成区域作为上下文。这使得 VQGAN 能够生成百万像素级的图像。

##### 与传统方法的对比

| 方法 | 离散化 | 重建损失 | 全局建模 | 高分辨率 |
|------|--------|----------|----------|----------|
| VQ-VAE | ✅ 向量量化 | L2 | PixelCNN (局部) | ❌ |
| VQ-VAE-2 | ✅ 多尺度 VQ | L2 | 多尺度 PixelCNN | 部分 |
| **VQGAN** | ✅ 向量量化 | **LPIPS + GAN** | **Transformer (全局)** | **✅ 滑动窗口** |
| DALL-E (dVAE) | ✅ Gumbel-Softmax | ELBO | Transformer | ✅ |

> ⚠️ **注意**：VQGAN 的核心贡献不是 Transformer 本身，而是**通过改进离散化阶段的训练目标（感知损失 + GAN），使得 Transformer 能够在更短的序列上工作**。这是一种"卷积归纳偏置"与"Transformer 表达能力"的互补结合。

#### 🧪 练习题

```yaml
question: "VQGAN 相比 VQ-VAE 的核心改进是什么？"
options:
  - "使用更大的码本尺寸来提升重建质量"
  - "用感知损失和对抗训练替代 L2 重建损失，提升离散码本的表征质量"
  - "将 PixelCNN 替换为 Transformer 进行自回归建模"
  - "引入多尺度向量量化机制"
answer: 1
explain: "VQGAN 的核心创新在于用 LPIPS 感知损失 + patch-based 判别器替代 L2 损失来训练编码器-解码器和码本，使得在更高压缩比下仍能保持高质量重建，从而让 Transformer 在更短的序列上高效建模。"
```