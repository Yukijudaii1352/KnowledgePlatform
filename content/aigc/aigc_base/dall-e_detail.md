### DALL-E

```yaml
id: dall-e
name: "DALL-E"
full_name: "Zero-Shot Text-to-Image Generation"
year: 2021
org: "OpenAI"
paper_url: "https://arxiv.org/abs/2102.12092"
category: aigc_base
parent: vq-vae
motivation: "文本到图像零样本生成"
```

#### 📝 一句话总结

DALL-E 提出了一种两阶段方法：先用离散变分自编码器（dVAE）将图像压缩为离散 token，再用 120 亿参数的自回归 Transformer 联合建模文本和图像 token，在 2.5 亿图文对上训练后实现了强大的零样本文本到图像生成能力。

#### 🎯 核心要点

- **两阶段训练框架**：Stage 1 训练 dVAE 将 256×256 图像压缩为 32×32 的离散 token 网格（codebook 大小 8192）；Stage 2 训练 120 亿参数稀疏 Transformer 自回归建模 256 个文本 BPE token + 1024 个图像 token 的联合序列
- **离散 VAE（dVAE）**：使用 Gumbel-Softmax 松弛实现离散 token 的可微采样，避免了 VQ-VAE 中的直通估计器（straight-through estimator），codebook 利用率更高
- **稀疏注意力机制**：图像 token 之间采用行注意力、列注意力和卷积注意力的稀疏模式，大幅降低了长序列的计算复杂度
- **CLIP 重排序**：推理时生成 512 个候选样本，使用 CLIP 对比模型按文本-图像匹配度排序，选择最佳结果
- **零样本泛化**：在 MS-COCO 上零样本评估，人类评估者 90% 的情况下更偏好 DALL-E 的生成结果（相比之前在该数据集上训练的方法）
- **大规模数据驱动**：在从互联网收集的 2.5 亿图文对上训练，证明了数据规模和模型规模对文本到图像生成的关键作用

#### 🔬 深入细节

##### 整体架构

DALL-E 的核心思想是将文本到图像生成问题转化为序列建模问题。通过 dVAE 将图像离散化后，文本和图像可以统一表示为 token 序列，从而利用 Transformer 的强大序列建模能力。

![dVAE 重建效果对比](https://ar5iv.labs.arxiv.org/html/2102.12092/assets/dvae_rec.png)
*图：原始图像（上）与 dVAE 重建图像（下）的对比。编码器将空间分辨率下采样 8 倍，使用 8192 大小的 codebook 来减轻信息损失。*

##### 训练目标

整体训练目标是最大化图像 $x$、文本 $y$ 和图像 token $z$ 联合分布的证据下界（ELB）：

$$\ln p_{\theta,\psi}(x, y) \geq \mathbb{E}_{z \sim q_\phi(z|x)} \left[ \ln p_\theta(x | y, z) - \beta \cdot D_{KL}(q_\phi(z|x) \| p_\psi(z|y)) \right]$$

其中：
- $q_\phi(z|x)$：dVAE 编码器，将图像编码为离散 token 的分布
- $p_\theta(x|y,z)$：dVAE 解码器，从 token 重建图像
- $p_\psi(z|y)$：自回归 Transformer 先验，根据文本预测图像 token
- $\beta = 6.6$：KL 散度的权重系数

##### Stage 1：dVAE 训练

```
算法：dVAE 训练过程
输入：RGB 图像 x ∈ R^{256×256×3}
输出：训练好的编码器 q_φ 和解码器 p_θ

1. 编码器将图像映射到 32×32 网格，每个位置输出 8192 维 logits
2. 使用 Gumbel-Softmax 松弛进行可微采样：
   - 对 logits 加 Gumbel 噪声后取 softmax
   - 温度 τ 从 1 退火到 1/16
3. 采样得到的 soft one-hot 向量与 codebook 嵌入相乘得到连续表示
4. 解码器从连续表示重建图像
5. 优化 ELB = E_q[ln p_θ(x|z)] - β·KL(q_φ(z|x) || uniform(1/8192))
   - 重建损失：对 logistic 分布的对数似然
   - KL 正则：鼓励编码分布接近均匀分布
```

**关键设计选择：**
- **Gumbel-Softmax vs Straight-Through**：Gumbel-Softmax 提供了更平滑的梯度，避免了 VQ-VAE 中 straight-through estimator 的梯度偏差问题
- **大 codebook（K=8192）**：相比 VQ-VAE 常用的 512，更大的 codebook 能保留更多图像细节
- **温度退火**：训练初期使用较高温度（τ=1）保证梯度流动，后期降低温度（τ=1/16）使分布更接近离散

##### Stage 2：稀疏 Transformer 训练

```
算法：自回归 Transformer 训练
输入：文本 token y (最多256个BPE token)，图像 token z (1024个)
输出：训练好的 Transformer 先验 p_ψ

1. 将文本 token 和图像 token 拼接为长度 1280 的序列
2. 使用 64 层稀疏 Transformer 自回归建模：
   - 文本→文本：标准因果注意力
   - 图像→文本：全注意力（每个图像 token 可看到所有文本 token）
   - 图像→图像：稀疏注意力（行/列/卷积模式交替）
3. 最大化自回归对数似然：
   ln p_ψ(y, z) = Σ_i ln p_ψ(token_i | token_{<i})
```

**稀疏注意力模式（3 种交替使用）：**
- **行注意力（Row attention）**：每个图像 token 关注同一行的所有 token
- **列注意力（Column attention）**：每个图像 token 关注同一列的所有 token
- **卷积注意力（Convolutional attention）**：每个图像 token 关注局部 3×3 窗口内的 token

这种稀疏模式将注意力复杂度从 $O(n^2)$ 降低到 $O(n\sqrt{n})$，使得处理 1024 个图像 token 变得可行。

##### 推理与 CLIP 重排序

![MS-COCO 生成对比](https://ar5iv.labs.arxiv.org/html/2102.12092/assets/coco_cmp_v2.jpg)
*图：DALL-E 与先前方法在 MS-COCO 文本描述上的生成效果对比。DALL-E 的每个样本是 512 个候选中由 CLIP 排序选出的最佳结果。*

```
算法：推理过程
输入：文本描述 y
输出：生成图像 x*

1. 将文本编码为 BPE token 序列
2. 使用 Transformer 自回归采样 512 组图像 token
3. 对每组图像 token，通过 dVAE 解码器生成 512 张候选图像
4. 使用预训练的 CLIP 模型计算每张图像与文本的匹配分数
5. 选择 CLIP 分数最高的图像作为最终输出 x*
```

##### 模型规模与训练细节

| 组件 | 参数量 | 关键配置 |
|------|--------|----------|
| dVAE 编码器 | ~40M | ResNet blocks, 32×32 输出, K=8192 |
| dVAE 解码器 | ~40M | ResNet blocks, 256×256 输出 |
| Transformer | 12B | 64 层, 62 个注意力头, d=3968 |
| 总计 | ~12B | 250M 图文对训练 |

**训练配置：**
- 优化器：Adam（β₁=0.9, β₂=0.96）
- dVAE 训练：3M 步，学习率 1×10⁻⁴
- Transformer 训练：分布式训练，混合精度（16-bit）
- 数据：2.5 亿互联网图文对（类似 JFT-300M 规模）

##### 实验结果

**MS-COCO 零样本评估：**
- 人类评估：90% 的情况下评估者更偏好 DALL-E 的生成结果（对比 DF-GAN 等在 COCO 上训练的方法）
- FID 分数：约 27.5（零样本，无需在 COCO 上训练）
- 展现了强大的组合泛化能力：能将未见过的概念组合生成合理图像

**零样本能力展示：**
- 概念组合：如"鳄梨形状的扶手椅"
- 文字渲染：能在图像中生成指定文字（如霓虹灯标志）
- 风格迁移：如"以梵高风格画的城市天际线"
- 图像到图像翻译：如"将照片转为素描"

#### 🧪 练习题

**1. DALL-E 使用 dVAE 而非直接对像素建模的主要原因是什么？**

A. 像素级建模需要太多内存，且似然目标倾向于建模高频细节而非语义结构
B. dVAE 的生成质量比像素级模型更高
C. 像素级模型无法处理文本条件
D. dVAE 训练速度比像素级模型快 100 倍

**答案：A**

> 论文指出，直接使用像素作为 token 对高分辨率图像需要大量内存，且似然目标倾向于优先建模像素间的短程依赖（高频细节），而非使物体可识别的低频结构。dVAE 将 256×256 图像压缩为 32×32 token 网格，将上下文长度减少 192 倍。

---

**2. DALL-E 的 dVAE 与 VQ-VAE 在离散化方法上的关键区别是什么？**

A. DALL-E 使用更大的 codebook
B. DALL-E 使用 Gumbel-Softmax 松弛替代 straight-through estimator
C. DALL-E 不使用 codebook
D. DALL-E 使用连续而非离散的潜变量

**答案：B**

> VQ-VAE 使用最近邻查找 + straight-through estimator 来实现离散化的梯度传播，而 DALL-E 的 dVAE 使用 Gumbel-Softmax 松弛，通过温度参数控制分布的离散程度，提供了更平滑的梯度估计。虽然 A 也是事实（8192 vs 通常 512），但这不是离散化方法本身的区别。

---

**3. 在 DALL-E 的 Transformer 中，图像 token 对文本 token 使用什么注意力模式？**

A. 因果注意力（只能看到之前的文本 token）
B. 全注意力（可以看到所有文本 token）
C. 稀疏注意力（行/列模式）
D. 不使用注意力，文本信息通过嵌入注入

**答案：B**

> 论文描述了三种注意力模式：文本→文本使用因果注意力，图像→文本使用全注意力（每个图像 token 可以关注所有 256 个文本 token），图像→图像使用行/列/卷积稀疏注意力。这确保了图像生成能充分利用文本信息。

---

**4. DALL-E 在推理时使用 CLIP 重排序的目的是什么？**

A. 提高生成速度
B. 减少模型参数量
C. 从多个候选中选择与文本最匹配的图像，提升生成质量
D. 对生成图像进行超分辨率增强

**答案：C**

> DALL-E 在推理时为每个文本描述生成 512 个候选图像，然后使用预训练的 CLIP 模型计算每张图像与输入文本的匹配分数，选择得分最高的作为最终输出。这种策略利用了 CLIP 的跨模态理解能力来弥补纯自回归采样的随机性。

---

**5. DALL-E 训练目标中 $\beta = 6.6$ 的 KL 权重系数起什么作用？**

A. 控制生成图像的分辨率
B. 平衡重建质量与先验匹配，较大的 β 鼓励 dVAE 编码更符合 Transformer 先验的 token 分布
C. 控制 Transformer 的学习率
D. 决定 codebook 的大小

**答案：B**

> 在 ELB 目标 $\mathbb{E}_q[\ln p_\theta(x|y,z)] - \beta \cdot D_{KL}(q_\phi \| p_\psi)$ 中，β 控制重建项和 KL 项的相对权重。较大的 β（如 6.6 > 1）使模型更强调让 dVAE 的编码分布与 Transformer 先验对齐，这对两阶段训练的协调至关重要，尽管可能牺牲一些重建精度。