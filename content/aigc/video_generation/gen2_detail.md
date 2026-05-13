### Gen-2：结构与内容引导的视频扩散合成

```yaml
id: gen2
name: "Gen-2"
full_name: "结构与内容引导的视频扩散合成 (Structure and Content-Guided Video Synthesis with Diffusion Models)"
year: "2023"
org: "Runway"
paper_url: "https://arxiv.org/abs/2302.03011"
category: "video_generation"
parent: "Stable Diffusion / Gen-1"
motivation: "通过将视频解耦为结构（深度）和内容（CLIP嵌入）两种表示，引导潜在扩散模型实现高质量、多模态条件的视频合成与编辑"
```

#### 📝 一句话总结

Gen-2 提出了一种基于潜在扩散模型的视频合成框架，通过将视频分解为**结构表示**（单目深度估计）和**内容表示**（CLIP 图像嵌入），并结合时空联合训练与时序引导机制，实现了文本、图像、视频等多模态条件下的高质量视频生成与编辑。

#### 🎯 核心要点

- **结构-内容解耦表示**：将视频分解为结构信号（MiDaS 单目深度图，可控细节层级）和内容信号（CLIP 图像嵌入），分别通过拼接和交叉注意力注入扩散模型
- **时空潜在扩散模型**：在预训练图像 LDM（Stable Diffusion）的 UNet 中插入 1D 时序卷积和 1D 时序注意力层，实现图像-视频联合训练
- **时序引导尺度 \(\omega_t\)**：利用图像模型与视频模型的预测差异，通过类似 classifier-free guidance 的方式显式控制生成视频的时序一致性
- **多模态条件支持**：支持文本→图像 prior 映射、图像 CLIP 嵌入、深度图等多种条件输入，实现 text-to-video、image-to-video、video-to-video 等多种生成模式
- **v-参数化**：采用 v-prediction 替代 \(\epsilon\)-prediction，显著改善视频样本的色彩一致性
- **多阶段训练策略**：从预训练 SD 出发，依次引入 CLIP 图像条件（15k步）→ 时序层（75k步）→ 结构条件（25k+10k步），使用 240M 图像 + 6.4M 视频片段
- **用户研究验证**：在 AMT 用户研究中，Gen-2 在 prompt 忠实度和时序一致性上均显著优于 Text2Live、SDEdit 等基线方法

#### 🔬 深入细节

![Gen-2 方法总览](https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x2.png)
*图：Gen-2 方法总览。输入视频通过 MiDaS 提取深度图作为结构表示 \(s\)，通过 CLIP 提取图像嵌入作为内容表示 \(c\)。结构表示经编码器后与噪声潜变量拼接输入 UNet，内容表示通过交叉注意力机制注入。文本条件通过 prior 网络映射为 CLIP 图像嵌入。*

![时序扩展架构](https://ar5iv.labs.arxiv.org/html/2302.03011/assets/x3.png)
*图：时序扩展架构。在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（左）；在每个 2D 空间注意力块后插入 1D 时序注意力块（右）。图像被视为单帧视频，时序层仅对多帧视频激活。*

```python
# Gen-2 训练与推理伪代码
# === 训练阶段 ===
# 输入: 视频帧 x ∈ R^(n×3×H×W), 深度图 d = MiDaS(x)
# 结构表示: 对深度图加噪控制细节层级
x_s = alpha(t_s) * d + sigma(t_s) * epsilon   # t_s 控制结构细节
s = Encoder(x_s)                                # 编码为潜在结构表示

# 内容表示: CLIP 图像嵌入
c = CLIP_image(x[0])                            # 取首帧的 CLIP 嵌入

# 潜在编码
z = Encoder_LDM(x)                              # z ∈ R^(n×4×H/8×W/8)

# 前向扩散
t ~ Uniform(0, T)
z_t = alpha(t) * z + sigma(t) * epsilon

# UNet 预测 (v-parameterization)
# 结构 s 与 z_t 在通道维拼接; 内容 c 通过交叉注意力注入
v_pred = UNet(concat(z_t, s), t, c)             # 含时序层的 UNet
loss = ||v - v_pred||^2                          # v = alpha(t)*eps - sigma(t)*z

# === 推理阶段 (含时序引导) ===
for t in reversed(timesteps):                    # DDIM 采样
    mu_video = UNet_video(z_t, t, c=None, s)     # 视频模型无条件预测
    mu_image = UNet_image(z_t, t, c=None, s)     # 图像模型逐帧预测
    mu_cond  = UNet_video(z_t, t, c, s)           # 视频模型有条件预测
    
    # 三项引导: 基础 + 时序引导 + 内容引导
    mu_guided = mu_image \
        + omega_t * (mu_video - mu_image) \       # 时序一致性控制
        + omega   * (mu_cond - mu_video)           # 内容引导
    
    z_{t-1} = DDIM_step(z_t, mu_guided)
```

**动机与背景：从图像扩散到视频合成的挑战**

扩散模型在图像生成领域取得了突破性进展（DALL-E 2、Stable Diffusion、Imagen），但将其扩展到视频合成面临三大核心挑战：（1）视频数据的时序一致性要求模型理解帧间关系；（2）视频数据集规模远小于图像数据集，导致泛化能力不足；（3）视频的高维特性使得直接在像素空间建模计算代价极高。此前的方法如 Video Diffusion Models (VDM) 直接在像素空间操作，受限于分辨率和长度；而基于 GAN 或自回归模型的方法则难以保证生成质量和多样性。Gen-2 的核心洞察在于：**视频可以被分解为与运动相关的"结构"和与外观相关的"内容"两个独立维度**，通过分别控制这两个维度，可以实现灵活且高质量的视频合成。

**核心机制一：结构与内容的解耦表示**

Gen-2 的关键创新在于将条件信号分为结构表示 \(s\) 和内容表示 \(c\) 两个正交维度。**结构表示**采用 MiDaS 单目深度估计网络从输入视频中提取深度图，深度图天然编码了场景的几何布局和物体运动轨迹，同时对外观变化具有不变性。为了控制结构信息的细节层级，论文提出了一个巧妙的机制：对深度图施加扩散噪声，噪声时间步 \(t_s\) 越大，深度图细节越模糊，仅保留粗略的场景布局；\(t_s = 0\) 时保留完整深度细节。具体地，带噪深度图为：

$$x_s = \alpha_{t_s} \cdot d + \sigma_{t_s} \cdot \epsilon, \quad \epsilon \sim \mathcal{N}(0, I)$$

其中 \(d\) 为原始深度图，\(\alpha_{t_s}\) 和 \(\sigma_{t_s}\) 为扩散调度参数。编码后的结构表示 \(s = \mathcal{E}(x_s)\) 在通道维度上与噪声潜变量 \(z_t\) 拼接，作为 UNet 的输入。**内容表示**则采用 CLIP 图像编码器提取的嵌入向量，通过交叉注意力机制注入 UNet 的每一层。对于文本条件输入，论文训练了一个类似 DALL-E 2 的 prior 网络，将 CLIP 文本嵌入映射为 CLIP 图像嵌入空间，从而统一了文本和图像两种条件输入的处理方式。

> 💡 **关键洞察**：结构-内容解耦使得用户可以独立控制"视频中发生什么运动"（结构）和"视频看起来像什么"（内容），例如保持原视频的运动轨迹但将场景风格从夏天变为冬天。

**核心机制二：时空联合训练与时序引导**

Gen-2 在预训练的图像 LDM（Stable Diffusion）基础上，通过插入时序层将其扩展为视频模型。具体地，在 UNet 的每个残差块中，2D 空间卷积后插入 1D 时序卷积（沿时间轴操作）；在每个 2D 空间注意力块后插入 1D 时序注意力块（帧间自注意力）。关键设计是：**图像和视频共享所有空间层参数，时序层仅对多帧视频输入激活**。这通过张量重排实现：形状为 \(b \times n \times c \times h \times w\) 的视频张量在空间层中被重排为 \((b \cdot n) \times c \times h \times w\)（每帧独立处理），在时序层中被重排为 \((b \cdot h \cdot w) \times c \times n\)（每个空间位置跨帧处理）。

这种联合训练策略带来了一个独特的推理时控制能力——**时序引导尺度 \(\omega_t\)**。由于图像模型和视频模型共享参数，对同一输入，图像模型（逐帧独立预测）和视频模型（跨帧联合预测）会给出不同的去噪方向。类比 classifier-free guidance 的思想，论文将图像模型的预测视为"无时序条件"的基线，视频模型的预测视为"有时序条件"的增强，通过线性外推控制时序一致性强度：

$$\tilde{\mu}_\theta(z_t, t, c, s) = \mu^\pi_\theta(z_t, t, \varnothing, s) + \omega_t \left(\mu_\theta(z_t, t, \varnothing, s) - \mu^\pi_\theta(z_t, t, \varnothing, s)\right) + \omega \left(\mu_\theta(z_t, t, c, s) - \mu_\theta(z_t, t, \varnothing, s)\right)$$

其中 \(\mu^\pi_\theta\) 为图像模型预测，\(\mu_\theta\) 为视频模型预测，\(\omega_t\) 控制时序一致性，\(\omega\) 为标准的内容引导尺度。实验表明，\(\omega_t\) 较低时生成的视频具有"手绘"风格（帧间变化大），\(\omega_t\) 较高时生成更平滑一致的视频。

> ⚠️ **注意**：时序引导需要三次 UNet 前向传播（图像无条件、视频无条件、视频有条件），推理成本约为标准 classifier-free guidance 的 1.5 倍。

**训练流程与工程细节**

Gen-2 采用精心设计的多阶段训练策略：（1）从预训练 Stable Diffusion 出发，将条件从 CLIP 文本嵌入切换为 CLIP 图像嵌入，仅在图像上微调 15k 步；（2）引入时序卷积和时序注意力层，在图像（12.5% 概率采样）和视频上联合训练 75k 步，视频为 8 帧、间隔 4 帧、分辨率 448×256；（3）添加结构条件（固定 \(t_s = 0\)）训练 25k 步；（4）将 \(t_s\) 在 0-7 之间均匀采样，继续训练 10k 步。训练数据包括 240M 内部图像和 6.4M 视频片段。模型采用 v-parameterization（预测 \(v = \alpha_t \epsilon - \sigma_t z\) 而非 \(\epsilon\)），这对视频样本的色彩一致性至关重要。推理时使用 DDIM 采样器。

#### 🧪 练习题

```yaml
question: "Gen-2 中控制结构表示细节层级的机制是什么？"
options:
  - "调整 MiDaS 深度估计网络的分辨率参数"
  - "对深度图施加不同程度的扩散噪声，通过噪声时间步 t_s 控制"
  - "使用不同大小的卷积核对深度图进行模糊处理"
  - "通过 CLIP 嵌入的维度裁剪控制信息量"
answer: 1
explain: "论文通过对 MiDaS 深度图施加扩散噪声 x_s = α_{t_s}·d + σ_{t_s}·ε 来控制结构细节层级，t_s 越大噪声越多，深度图越模糊仅保留粗略布局，t_s=0 时保留完整细节。"
```