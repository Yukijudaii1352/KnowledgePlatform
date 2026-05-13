### RealTalk：基于改进面部先验的音频驱动人脸生成

```yaml
id: realtalk
name: RealTalk
full_name: "RealTalk: Real-Time and Realistic Audio-Driven Face Generation with 3D Facial Prior-Guided Identity Alignment Network"
year: "2024"
org: "腾讯优图实验室 & 南京大学"
paper_url: "https://arxiv.org/abs/2406.18284"
category: "digital_human"
parent: "aigc"
motivation: "利用3D面部先验（身份形状+个体内表情变化）引导跨模态注意力精准预测表情，结合可学习遮罩与身份对齐网络FIA实现单帧参考、实时高保真的音频驱动说话人脸生成"
```

#### 📝 一句话总结

RealTalk 提出了两阶段音频驱动说话人脸生成框架：第一阶段通过融合身份形状和历史表情先验的跨模态注意力 Transformer 将音频精准映射为3D表情系数；第二阶段通过可学习遮罩和身份对齐网络（FIA，结合 AdaIN 注入3D系数与 Cross-Attention 对齐参考帧纹理）实现仅需单帧参考的实时高保真人脸渲染，在多个基准上全面超越现有方法且速度达 30FPS。

#### 🎯 核心要点

- **两阶段解耦框架**：Stage1 Audio-to-Expression (A2E) Transformer 预测3D表情系数 → Stage2 Expression-to-Face (E2F) 渲染器生成最终图像
- **改进的3D面部先验**：引入身份形状系数 \(\alpha\) 和历史表情系数 \(\beta_{1:N}\) 作为 Transformer 的额外条件，通过 Cross-Modal Self-Attention (CMSA) 编码器融合音频与面部先验
- **可学习遮罩 (Learnable Mask)**：利用预测的3D表情系数投影生成自适应遮罩（覆盖嘴部+下颌轮廓），替代传统固定下半脸遮罩，与目标音频内在关联
- **FIA 模块 (Face Identity-Aware Alignment)**：共享编码器提取源/参考帧多尺度特征 → 解码器每层通过 AdaIN 注入3D系数控制表情 + Cross-Attention 从参考帧查询纹理细节
- **高效设计**：仅需1帧参考（对比 IP-LAP 的25帧、DINet 的5帧），Cross-Attention 仅在 1/8 和 1/16 分辨率执行，V100 上达 33.1ms/帧（约30FPS），比 IP-LAP 快 11.5×
- **全面的损失设计**：A2E 阶段使用 MSE + 顶点距离损失；E2F 阶段使用 L1 像素 + VGG 感知 + GAN 对抗 + 牙齿区域局部像素损失
- **在 VoxCeleb1、MEAD、HDTF 三个基准上全面 SOTA**，FID 指标在 MEAD 上超越第二名 51%，用户研究中视觉质量和唇同步分别超越 IP-LAP 33% 和 44%

#### 🔬 深入细节

##### 框架总览

![RealTalk 框架总览图](https://arxiv.org/html/2406.18284v2/x2.png)
*图：RealTalk 整体框架。上半部分为 Audio-to-Expression Transformer（CMSA 编码器 + TCA 解码器），下半部分为 Expression-to-Face 渲染器（Learnable Mask + FIA 模块）。*

##### 算法流程伪代码

```python
# ========== Stage 1: Audio-to-Expression Transformer ==========
# 输入: audio_features A (mel-spectrogram), shape α, history expressions β_{1:N}
# 输出: predicted expressions β̂_{1:T}

# CMSA Encoder: 跨模态自注意力融合
audio_tokens = linear_proj(A)           # [l tokens], l=32 audio frames
shape_token = linear_proj(α)            # [1 token], 身份形状先验
expr_tokens = linear_proj(β_{1:N})      # [N tokens], N=16 历史表情先验
x = concat(audio_tokens, shape_token, expr_tokens)  # [l+N+1 tokens]
for layer in cmsa_encoder:
    x = multi_head_self_attention(x) + x  # 跨模态交互

# TCA Decoder: 时序交叉注意力解码
query = positional_embedding(T)         # T=16 target frames
for layer in tca_decoder:
    query = cross_attention(Q=query, K=x, V=x) + query
β̂ = linear_head(query)                 # 预测 T 帧表情系数

# ========== Stage 2: Expression-to-Face Renderer ==========
# 输入: source image I_s, reference image I_r, 3D coefficients (α, β̂, ρ)
# 输出: generated face Î

# Step 1: Learnable Mask 生成
V = reconstruct_3d_vertices(α, β̂, ρ)   # 3DMM 重建顶点
V_xy = perspective_project(V, τ)         # 投影到2D
M = convex_hull(V_xy)                    # 凸包生成遮罩
I_s_masked = M * I_s                     # 遮罩源图像

# Step 2: 共享编码器提取多尺度特征
F_s = shared_encoder(I_s_masked)         # {F_s^1, ..., F_s^d}, d=4 scales
F_r = shared_encoder(I_r)               # {F_r^1, ..., F_r^d}

# Step 3: FIA 解码器逐层生成
F̄ = bottleneck_features
for i in range(d):  # d=4, 从低分辨率到高分辨率
    F̄ = upsample(F̄)
    # AdaIN: 3D系数注入控制表情
    γ, μ = MLP([α, β̂, ρ])
    F̄ = γ * normalize(F̄) + μ
    F̄ = residual_blocks(F̄, num_blocks=2)
    # Cross-Attention: 从参考帧查询纹理 (仅在1/8和1/16分辨率)
    if scale in [1/8, 1/16]:
        F̄ = cross_attention(Q=F̄, K=F_r[d-i], V=F_r[d-i]) + F̄

# Step 4: Blending 融合
Î = M * I_s + (1 - M) * F̄_final        # 遮罩外保留源图，遮罩内用生成结果
```

##### 动机与背景

现有音频驱动说话人脸生成方法面临三大核心挑战：

**1. 音频到表情的映射缺乏身份感知。** 传统方法（如 Wav2Lip、IP-LAP）直接将音频特征映射到嘴部运动，忽略了不同人说同一句话时嘴型幅度和习惯差异巨大的事实。例如，面部骨骼结构（宽脸 vs 窄脸）和个人说话习惯（张嘴幅度大 vs 小）都会显著影响嘴部运动模式。RealTalk 的核心洞察是：**3D 面部形状系数 \(\alpha\) 编码了骨骼结构信息，历史表情系数 \(\beta_{1:N}\) 编码了个人说话习惯**，将两者作为先验注入 Transformer 可实现身份感知的表情预测。

**2. 固定遮罩导致面部结构变化困难。** 大多数方法使用固定的下半脸遮罩，但说话时下颌轮廓会随嘴部张合而变化。固定遮罩要么遮盖不足（无法生成大张嘴时的下颌变化），要么遮盖过多（增加不必要的生成难度）。RealTalk 提出的可学习遮罩直接从预测的3D表情系数投影生成，自适应地覆盖需要修改的区域。

**3. 多帧参考的效率瓶颈。** IP-LAP 需要25帧参考图通过光流对齐，DINet 需要5帧参考图提取变形特征，这严重制约了推理速度。RealTalk 的 FIA 模块通过 Cross-Attention 机制从单帧参考中自适应查询所需纹理，无需显式对齐即可完成纹理迁移。

##### 核心机制详解

**A. Audio-to-Expression Transformer**

A2E Transformer 的设计核心在于 CMSA（Cross-Modal Self-Attention）编码器。它将三种模态的 token 拼接后进行自注意力计算：

$$X = [A_1, ..., A_l, \alpha, \beta_1, ..., \beta_N]$$

其中 \(l=32\) 个音频 token、1 个形状 token、\(N=16\) 个历史表情 token。自注意力机制使得音频 token 可以"看到"身份形状和历史表情模式，从而学习到身份感知的音频-表情映射。

> 💡 **关键直觉**：形状系数 \(\alpha\) 告诉模型"这个人的脸长什么样"，历史表情 \(\beta_{1:N}\) 告诉模型"这个人说话时嘴巴通常怎么动"，两者共同约束了音频到表情的映射空间。

TCA（Temporal Cross-Attention）解码器则以可学习的位置编码作为 query，通过交叉注意力从编码器输出中解码出 \(T=16\) 帧的表情系数序列。

A2E 阶段的损失函数为：

$$\mathcal{L}_{a2e} = \mathcal{L}_{MSE} + 0.1 \cdot \mathcal{L}_V$$

其中 \(\mathcal{L}_{MSE}\) 是表情系数的均方误差，\(\mathcal{L}_V\) 是通过3DMM重建后的顶点距离损失。顶点损失的引入确保了系数空间的误差能反映到实际的面部几何变化上。

**B. Learnable Mask**

可学习遮罩的生成过程完全可微分：

$$V_{xy} = P(V(\alpha, \hat{\beta}, \rho), \tau)$$
$$M = C(V_{xy})$$
$$I_s^m = M \cdot I_s$$

其中 \(V(\cdot)\) 是3DMM顶点重建函数，\(P(\cdot)\) 是透视投影，\(C(\cdot)\) 是凸包运算。由于遮罩由预测的表情系数 \(\hat{\beta}\) 决定，它天然与目标音频关联——张大嘴时遮罩自动扩大覆盖下颌变化区域，闭嘴时遮罩自动缩小。

> ⚠️ **注意**：遮罩不参与梯度反传到 A2E 阶段（两阶段独立训练），但它在 E2F 阶段的 blending 操作中起到关键作用——遮罩外区域直接保留源图像像素，遮罩内区域由网络生成，大幅降低了生成难度。

**C. FIA 模块（Face Identity-Aware Alignment Network）**

FIA 是本文最核心的架构创新，其设计哲学是**将3D系数的"控制信号"和参考帧的"纹理信息"解耦注入**：

1. **共享权重编码器**：同一个编码器分别处理遮罩后的源图像和参考图像，提取4个尺度的特征金字塔 \(\{F^1, ..., F^4\}\)。共享权重确保两路特征在同一语义空间中，便于后续 Cross-Attention 对齐。

2. **AdaIN 注入3D系数**：在解码器每一层，将拼接的3D系数 \([\alpha, \hat{\beta}, \rho]\) 通过 MLP 映射为仿射变换参数 \((\gamma, \mu)\)，通过 Adaptive Instance Normalization 注入特征：

$$\text{AdaIN}(F, \gamma, \mu) = \gamma \cdot \frac{F - \text{mean}(F)}{\text{std}(F)} + \mu$$

这使得3D系数直接控制生成特征的统计分布，实现对表情和姿态的精确控制。

3. **Cross-Attention 纹理对齐**：在 1/8 和 1/16 分辨率的解码层中，以当前生成特征为 query、参考帧特征为 key/value 进行交叉注意力：

$$\text{CrossAttn}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

> 💡 **为什么 Cross-Attention 优于光流/变形卷积？** 光流和变形卷积建立的是像素级的刚性对应关系，当源图和参考图姿态差异较大时容易产生伪影。Cross-Attention 则允许每个生成位置从参考帧的**任意位置**加权聚合纹理信息，实现更灵活的非刚性纹理迁移。消融实验证实 Cross-Attention 在 FID 上优于 Flow（12.73 vs 13.68）和 Deformation（12.73 vs 13.38），且参数量更少（69.24M vs 82.94M/98.79M）。

4. **Blending 融合**：最终输出通过可学习遮罩混合源图像和生成结果：

$$\hat{I} = M \cdot I_s + (1 - M) \cdot \bar{F}_d$$

遮罩外区域（额头、背景等）直接保留源图像的原始像素，网络只需关注嘴部和下颌区域的生成。

**D. 渲染损失函数**

E2F 阶段的总损失为：

$$\mathcal{L}_{e2f} = \lambda_1 \mathcal{L}_1 + \lambda_2 \mathcal{L}_2 + \lambda_3 \mathcal{L}_3 + \lambda_4 \mathcal{L}_4$$

其中 \(\lambda_1=1, \lambda_2=1, \lambda_3=0.1, \lambda_4=1\)：
- \(\mathcal{L}_1\)：L1 像素重建损失
- \(\mathcal{L}_2\)：VGG 感知损失（多层特征匹配）
- \(\mathcal{L}_3\)：GAN 对抗损失（权重较小以稳定训练）
- \(\mathcal{L}_4\)：牙齿区域局部 L1 损失（使用牙齿区域二值遮罩 \(M'\)），专门提升牙齿纹理清晰度

##### 实验结果与消融分析

**定量比较**：在 VoxCeleb1、MEAD、HDTF 三个数据集上，RealTalk 在几乎所有指标上均取得最优。关键数据：

| 指标 | VoxCeleb1 | MEAD | HDTF |
|------|-----------|------|------|
| FID ↓ | **12.73** (vs IP-LAP 16.84) | **11.68** (vs IP-LAP 31.57, ↓63%) | **6.065** (vs IP-LAP 9.490, ↓36%) |
| LPIPS ↓ | **0.0916** | **0.0958** | **0.0820** |
| Runtime | **33.1ms** (vs IP-LAP 381.5ms, 11.5×快) | 同左 | 同左 |

**用户研究 (MOS)**：视觉质量 3.77 分（IP-LAP 2.84，↑33%），唇同步 3.72 分（IP-LAP 2.58，↑44%）。

**消融实验关键发现**：

1. **面部先验的有效性**（Table 6）：移除形状先验和历史表情先验后，表情系数预测的 MSE 增加 57.9%。两种先验互补——形状提供身份约束，历史表情提供个人习惯约束。

2. **可学习遮罩 vs 固定遮罩**（Table 6）：使用固定下半脸遮罩时性能下降，因为固定遮罩包含无关背景区域且无法适应不同张嘴幅度。

3. **FIA 中 Cross-Attention vs Flow vs Deformation**（Table 7）：Cross-Attention 以最少参数（69.24M）取得最优 FID（12.73），Flow（82.94M, FID 13.68）和 Deformation（98.79M, FID 13.38）均不如。

4. **残差块数量**（Table 7）：1 block 快但质量差，3 blocks 质量好但超实时，2 blocks 是速度-质量的最优平衡点。

#### 🧪 练习题

```yaml
question: "RealTalk 的 Audio-to-Expression Transformer 中，CMSA 编码器融合了哪些模态的信息？"
options:
  - "音频特征 + 2D 面部关键点"
  - "音频特征 + 3D 身份形状系数 + 历史表情系数"
  - "音频特征 + 参考图像特征 + 姿态系数"
  - "音频特征 + 光流特征 + 深度图"
answer: 1
explain: "CMSA 将音频 token、身份形状系数 α（1个token）和历史表情系数 β_{1:N}（N个token）拼接后进行自注意力计算，使音频特征能感知说话人的面部结构和个人表情习惯，实现身份感知的表情预测。"
```