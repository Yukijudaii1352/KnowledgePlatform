### DiT：扩散 Transformer

```yaml
id: dit
name: DiT
full_name: 扩散 Transformer (Scalable Diffusion Models with Transformers)
year: 2023
org: Meta AI & UC Berkeley
paper_url: https://arxiv.org/abs/2212.09748
category: diffusion
parent: stable-diffusion
motivation: 用 Transformer 替换 U-Net 作为扩散模型骨干网络，验证扩展定律
```

#### 📝 一句话总结

DiT 提出在潜空间扩散模型（LDM）框架中用 Transformer 替换 U-Net 作为去噪骨干网络，系统探索了条件注入策略和模型缩放规律，证明增加模型计算量（Gflops）可持续降低 FID，最终 DiT-XL/2 在 ImageNet 256×256 上以 FID=2.27 达到当时 SOTA。

#### 🎯 核心要点

- **架构替换**：在 LDM 潜空间上用 Vision Transformer（ViT）完全替换 U-Net，证明 Transformer 是扩散模型的有效骨干
- **Patchify 机制**：将潜空间表示切分为 patch 序列（patch size \(p \in \{2, 4, 8\}\)），\(p\) 越小 token 数越多、Gflops 越高、质量越好
- **4 种条件注入策略**：In-context conditioning、Cross-attention、Adaptive LayerNorm（adaLN）、adaLN-Zero → **adaLN-Zero 最优**
- **adaLN-Zero 创新**：在 adaLN 基础上回归出额外的维度缩放参数 \(\alpha\)，并将所有 \(\alpha\) 初始化为零向量，使每个 DiT block 初始化时等价于恒等函数
- **Scaling Law**：模型 Gflops 与 FID 呈强负相关，增加模型计算量（增大模型或减小 patch size）均可持续提升生成质量
- **4 种模型配置**：DiT-S（33M）、DiT-B（130M）、DiT-L（458M）、DiT-XL（675M），层数 12→28，隐藏维度 384→1152
- **SOTA 结果**：DiT-XL/2 在 ImageNet 256×256 达到 FID=2.27，512×512 达到 FID=3.04，均为当时最优
- **计算效率**：DiT-XL/2 仅需 118.6 Gflops（256×256），远低于 ADM 的 1120 Gflops，但 FID 更优

#### 🔬 深入细节

##### 架构总览

![DiT 架构总览图](https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x3.png)
*图：DiT 整体架构。左侧为完整流程：输入潜空间经 Patchify 后送入 N 个 DiT Block，最终通过线性解码器输出噪声预测和方差预测。右侧展示了四种条件注入策略的 DiT Block 变体。*

DiT 的整体流程建立在 Latent Diffusion Model（LDM）框架之上：

1. **编码**：输入图像 \(x \in \mathbb{R}^{H \times W \times 3}\) 通过预训练 VAE 编码器压缩为潜空间表示 \(z \in \mathbb{R}^{h \times w \times c}\)（Stable Diffusion 的 VAE 将 256×256 图像编码为 32×32×4）
2. **Patchify**：将潜空间 \(z\) 切分为不重叠的 \(p \times p\) patch，每个 patch 通过线性嵌入转为 \(d\) 维 token，加上标准 ViT 频率位置编码，得到长度为 \(T = (h \cdot w) / p^2\) 的 token 序列
3. **DiT Blocks**：\(N\) 个 Transformer block 处理 token 序列，注入时间步 \(t\) 和类别标签 \(c\) 的条件信息
4. **解码**：最终 layer norm → 线性层将每个 token 解码为 \(p \times p \times 2c\) 的输出（噪声 \(\epsilon\) 和对角协方差 \(\Sigma\)），reshape 回空间维度

![Patchify 示意图](https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x4.png)
*图：不同 patch size 下的输入规格。patch size 越小，token 数越多，计算量越大。*

##### 条件注入策略

DiT 系统比较了四种将条件信息（时间步 \(t\) 和类别标签 \(c\)）注入 Transformer 的方式：

```python
# 四种条件注入策略伪代码

# 1. In-context conditioning：将 t, c 的 embedding 作为额外 token 拼接到序列中
tokens = concat([t_embed, c_embed, patch_tokens])  # 序列长度 +2
output = transformer_block(tokens)

# 2. Cross-attention：在 self-attention 后加 cross-attention 层
x = self_attention(x) + x
x = cross_attention(x, key_value=concat([t_embed, c_embed])) + x
x = mlp(x) + x

# 3. adaLN：用条件信息回归 LayerNorm 的 γ, β 参数
gamma, beta = MLP(t_embed + c_embed)  # 回归 scale 和 shift
x = gamma * LayerNorm(x) + beta       # 替代标准 LayerNorm

# 4. adaLN-Zero（最优）：在 adaLN 基础上增加维度缩放 α，初始化为零
gamma, beta, alpha = MLP(t_embed + c_embed)  # 额外回归 α
x = alpha * attention(gamma * LayerNorm(x) + beta) + x  # α 初始化为零
# 初始化时 α=0 → block 输出为零 → 整个 block 等价于恒等映射
```

![条件策略对比](https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x5.png)
*图：四种条件注入策略的 FID 训练曲线对比。adaLN-Zero 在所有模型尺寸下均表现最优。*

> 💡 **关键**：adaLN-Zero 的零初始化设计借鉴了 ResNet 中残差块零初始化的思想。在训练初期，每个 DiT block 等价于恒等函数，整个网络从"什么都不做"开始逐步学习去噪，这显著稳定了训练过程并提升了最终性能。

##### 核心公式

DiT 的训练目标沿用标准扩散模型的去噪目标。给定干净潜变量 \(z_0\)，前向扩散过程为：

$$z_t = \sqrt{\bar{\alpha}_t} \, z_0 + \sqrt{1 - \bar{\alpha}_t} \, \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

DiT 学习预测噪声 \(\epsilon_\theta(z_t, t, c)\) 和对角协方差 \(\Sigma_\theta(z_t, t, c)\)，训练损失为：

$$\mathcal{L} = \mathbb{E}_{z_0, \epsilon, t} \left[ \| \epsilon - \epsilon_\theta(z_t, t, c) \|^2 \right]$$

其中 \(t\) 和类别标签 \(c\) 通过 adaLN-Zero 机制注入。adaLN-Zero 的具体计算为：

$$\gamma, \beta, \alpha = \text{MLP}(\text{embed}(t) + \text{embed}(c))$$

$$\text{adaLN-Zero}(h, c) = \alpha \odot \text{Block}\!\left(\gamma \odot \text{LayerNorm}(h) + \beta\right)$$

其中 \(\alpha\) 在初始化时为零向量，使得 \(\text{adaLN-Zero}(h, c) = 0\)，整个残差块退化为恒等映射 \(h + 0 = h\)。

##### 模型配置

| 模型 | 层数 \(N\) | 隐藏维度 \(d\) | 注意力头数 | 参数量（M） | Gflops（p=4） |
|------|-----------|---------------|-----------|------------|--------------|
| DiT-S | 12 | 384 | 6 | 33 | 1.4 |
| DiT-B | 12 | 768 | 12 | 130 | 5.6 |
| DiT-L | 24 | 1024 | 16 | 458 | 19.7 |
| DiT-XL | 28 | 1152 | 16 | 675 | 29.1 |

> ⚠️ **注意**：Gflops 随 patch size 变化显著。以 DiT-XL 为例，p=8 时仅 5.7 Gflops，p=4 时 29.1 Gflops，p=2 时 118.6 Gflops（256×256 输入）。

##### Scaling Law：Gflops 决定生成质量

DiT 的核心发现是**模型计算量（Gflops）而非参数量是决定生成质量的关键因素**：

![Gflops 与 FID 的关系](https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x8.png)
*图：不同 DiT 配置在 400K 训练步后的 Gflops-FID 关系。Gflops 相近的不同配置（如 DiT-S/2 和 DiT-B/4）获得相似的 FID。*

这一发现有两个重要推论：

1. **固定模型大小，减小 patch size**：参数量几乎不变（甚至略减），但 Gflops 增加，FID 显著下降。这说明增加 token 数量（即处理更细粒度的空间信息）本身就能提升质量。

2. **固定 patch size，增大模型**：Gflops 和参数量同时增加，FID 同样下降。更大的模型在相同训练计算预算下更高效——类似于 LLM 领域的 Chinchilla scaling law。

![Scaling 曲线](https://ar5iv.labs.arxiv.org/html/2212.09748/assets/x6.png)
*图：上排为固定 patch size 增大模型的 FID 曲线；下排为固定模型大小减小 patch size 的 FID 曲线。两种缩放方式均持续提升性能。*

##### 与 U-Net 的关键区别

| 维度 | U-Net（如 ADM） | DiT |
|------|-----------------|-----|
| 架构 | 编码器-解码器 + 跳跃连接 | 纯 Transformer，无层级结构 |
| 空间处理 | 多尺度特征图，逐层下/上采样 | 单一分辨率 token 序列 |
| 条件注入 | 时间步通过 adaGN，类别通过 cross-attn | 统一的 adaLN-Zero |
| 归纳偏置 | 强空间局部性（卷积） | 弱归纳偏置，依赖数据和规模 |
| 可扩展性 | 扩展方式不统一（宽度/深度/注意力头） | 直接复用 ViT 的成熟缩放策略 |
| 计算效率 | ADM: 1120 Gflops | DiT-XL/2: 118.6 Gflops（FID 更优） |

> 💡 **关键**：DiT 证明了扩散模型不依赖 U-Net 的归纳偏置也能达到甚至超越 SOTA，这为后续 Sora 等视频生成模型采用 Transformer 架构奠定了理论基础。

##### SOTA 结果

DiT-XL/2 经过 7M 步训练后，在 ImageNet 类条件生成上达到 SOTA：

**ImageNet 256×256**（使用 classifier-free guidance, cfg=1.50）：
- **FID-50K = 2.27**（前最优 LDM: 3.60）
- sFID = 4.60, IS = 278.24
- Precision = 0.83, Recall = 0.57

**ImageNet 512×512**（cfg=1.50）：
- **FID-50K = 3.04**（前最优 ADM-G+ADM-U: 3.85）
- 仅需 524.6 Gflops，远低于 ADM 的 1983 Gflops

#### 🧪 练习题

```yaml
question: "DiT 的核心实验发现中，决定扩散模型生成质量的最关键因素是什么？"
options:
  - "模型的总参数量"
  - "模型的计算量（Gflops）"
  - "训练数据集的大小"
  - "采样步数的多少"
answer: 1
explain: "DiT 实验表明，Gflops 相近但参数量不同的配置（如 DiT-S/2 和 DiT-B/4）获得相似的 FID，而增加采样步数无法弥补模型计算量的不足，证明 Gflops 是决定生成质量的关键因素。"
```