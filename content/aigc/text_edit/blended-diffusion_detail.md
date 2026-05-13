### Blended Diffusion — 基于文本驱动的扩散模型局部图像编辑 (Blended Diffusion for Text-driven Editing of Natural Images)

```yaml
id: blended-diffusion
name: Blended Diffusion
full_name: "基于文本驱动的扩散模型局部图像编辑 (Blended Diffusion for Text-driven Editing of Natural Images)"
year: 2022
org: Technion & Google Research
paper_url: "https://arxiv.org/abs/2111.14818"
category: text_edit
parent: "—"
motivation: "结合CLIP语义引导与DDPM扩散过程，通过逐步混合实现自然、局部化的文本驱动图像编辑"
```

#### 📝 一句话总结

Blended Diffusion 提出在 DDPM 扩散采样的每一步中，将 CLIP 引导生成的前景区域与原图加噪的背景区域按 mask 进行混合，利用扩散模型的去噪投影自然恢复前景-背景一致性，实现了**无需训练、背景完美保留**的文本驱动局部图像编辑。

#### 🎯 核心要点

- **CLIP + DDPM 联合引导**：利用 CLIP 的文本-图像对齐能力提供语义方向，利用预训练 DDPM 的强大图像先验保证生成质量，二者结合实现文本驱动的图像编辑
- **逐步混合（Blending）机制**：在扩散过程的每个时间步 $t$，将 CLIP 引导的前景 latent 与原图加噪后的背景 latent 按 mask 混合，再由 DDPM 去噪投影到自然图像流形上，自动恢复前景-背景的一致性
- **背景完美保留**：通过在噪声空间中直接替换背景区域为原图的加噪版本，确保背景在编辑过程中完全不受影响
- **扩展增强（Extending Augmentations）**：对中间估计结果施加多个投影变换后再计算 CLIP 梯度并取平均，有效防止对抗样本现象，确保编辑产生真实的高层语义变化
- **零样本、无需训练**：直接使用预训练的 CLIP 和 DDPM 模型，无需任何微调或额外训练，即可在真实图像上进行编辑
- **结果排序机制**：利用 CLIP 对多个生成结果进行自动排序，选出最佳编辑结果

#### 🔬 深入细节

##### 核心架构示意图

![Blended Diffusion 方法总览 — 文本驱动的前景/背景编辑示例](https://ar5iv.labs.arxiv.org/html/2111.14818/assets/x1.png)
*图：Blended Diffusion 方法概览。上排为前景编辑（替换/添加对象），下排为背景编辑（改变场景）。用户提供原图、mask 和文本描述，方法自动在 mask 区域生成与文本匹配且与背景自然融合的内容*

![Blended Diffusion 流水线详细示意](https://ar5iv.labs.arxiv.org/html/2111.14818/assets/x2.png)
*图：Blended Diffusion 核心流水线。每个扩散时间步中：(1) 用 CLIP 引导生成前景区域；(2) 对原图加噪得到背景；(3) 按 mask 混合前景和背景；(4) DDPM 去噪投影恢复一致性*

##### 算法伪代码

```python
# Blended Diffusion 核心算法伪代码
# 输入: x_orig (原图), mask m, text_desc (文本描述), DDPM模型, CLIP模型
# 输出: 编辑后的图像

# === Algorithm 1: Local CLIP-Guided Diffusion (基线方法) ===
def local_clip_guided_diffusion(text_desc, mask, x_orig, T, lambda_):
    """CLIP引导的局部扩散生成"""
    x_T = sample_noise()  # 从N(0,I)采样
    for t in range(T, 0, -1):
        # 1. 估计 x_0（利用DDPM的去噪能力）
        x0_hat = estimate_x0(x_t, t)  # Eq.5: x̂₀ = (x_t - √(1-ᾱ_t)·ε_θ(x_t,t)) / √ᾱ_t
        
        # 2. 计算CLIP引导梯度（带扩展增强）
        grad = 0
        for aug in augmentations:  # 多个投影变换
            x0_aug = aug(x0_hat)
            # D_CLIP: 编辑区域的CLIP方向损失 (Eq.6)
            clip_loss = D_CLIP(x0_aug, text_desc, mask)
            # D_bg: 背景保留损失 (Eq.7)
            bg_loss = D_bg(x0_aug, x_orig, mask)
            grad += gradient(clip_loss + bg_loss, x_t)
        grad = grad / len(augmentations)
        
        # 3. DDPM采样步 + CLIP梯度引导
        x_{t-1} = ddpm_sample_step(x_t, t) - lambda_ * grad
    return x_0

# === Algorithm 2: Blended Diffusion (核心方法) ===
def blended_diffusion(text_desc, mask, x_orig, T, lambda_):
    """混合扩散 — 逐步混合前景与背景"""
    x_T = sample_noise()
    for t in range(T, 0, -1):
        # Step 1: CLIP引导的前景生成（同Algorithm 1）
        x0_hat = estimate_x0(x_t, t)
        grad = compute_augmented_clip_grad(x0_hat, text_desc, mask, x_orig)
        x_fg = ddpm_sample_step(x_t, t) - lambda_ * grad  # 前景latent
        
        # Step 2: 原图加噪得到背景latent
        x_bg = q_sample(x_orig, t-1)  # 对原图加噪到t-1步: √ᾱ_{t-1}·x_orig + √(1-ᾱ_{t-1})·ε
        
        # Step 3: 按mask混合前景和背景 ← 核心操作!
        x_{t-1} = mask * x_fg + (1 - mask) * x_bg
        
        # 扩散模型的下一步去噪会自然地"修复"混合边界的不一致
    return x_0
```

##### 动机与背景

现有的文本驱动图像编辑方法面临几个关键挑战：

1. **GAN-based 方法**（如 PaintByWord）：仅能编辑 GAN 生成的图像，无法处理真实照片；且编辑时常导致全局变化，无法精确保留背景
2. **VQGAN-CLIP**：虽然可以处理真实图像，但缺乏局部编辑能力，且生成质量受限于 VQGAN 的重建能力
3. **直接 CLIP 优化**：容易产生对抗样本——像素级别的微小扰动可以降低 CLIP 损失，但不会产生人类可感知的语义变化

> 💡 **核心洞察**：扩散模型（DDPM）具有一个关键特性——在去噪过程中，它会将任何输入"投影"到自然图像流形上。因此，即使在噪声空间中粗暴地将两个不同来源的 latent 按 mask 拼接，DDPM 的后续去噪步骤也能自然地恢复拼接边界的一致性，就像图像修复（inpainting）一样。

##### 核心机制详解

**1. 从 DDPM 去噪中估计 $\hat{x}_0$**

在扩散过程的每个时间步 $t$，利用训练好的噪声预测网络 $\epsilon_\theta$ 估计原始图像：

$$\hat{x}_0 = \frac{x_t - \sqrt{1 - \bar{\alpha}_t} \cdot \epsilon_\theta(x_t, t)}{\sqrt{\bar{\alpha}_t}}$$

这个估计值虽然在早期步骤中较为粗糙，但足以用于计算 CLIP 梯度方向。

**2. 局部 CLIP 方向损失（$\mathcal{D}_{CLIP}$）**

为了使编辑区域匹配目标文本描述，定义 CLIP 损失：

$$\mathcal{D}_{CLIP}(\hat{x}_0, t_{desc}, m) = D_{cos}\big(\text{CLIP}_{img}(\hat{x}_0 \odot m),\ \text{CLIP}_{txt}(t_{desc})\big)$$

其中 $D_{cos}$ 为余弦距离，$m$ 为编辑区域的 mask。仅对 mask 区域计算 CLIP 相似度，确保编辑的局部性。

**3. 背景保留损失（$\mathcal{D}_{bg}$）**

$$\mathcal{D}_{bg}(\hat{x}_0, x_{orig}, m) = \|\hat{x}_0 \odot (1 - m) - x_{orig} \odot (1 - m)\|_2^2$$

直接约束非编辑区域与原图一致。

> ⚠️ **关键发现**：仅靠 $\mathcal{D}_{bg}$ 损失无法完美保留背景（Algorithm 1 的局限），因为梯度更新是全局的。Blended Diffusion 通过在噪声空间中直接替换背景来彻底解决这个问题。

**4. 逐步混合（Blending）— 核心创新**

在每个时间步 $t$，执行以下操作：

$$x_{t-1} = m \odot x_{t-1}^{fg} + (1 - m) \odot x_{t-1}^{bg}$$

其中：
- $x_{t-1}^{fg}$：CLIP 引导的 DDPM 采样结果（前景）
- $x_{t-1}^{bg} = \sqrt{\bar{\alpha}_{t-1}} \cdot x_{orig} + \sqrt{1 - \bar{\alpha}_{t-1}} \cdot \epsilon$：原图加噪到 $t-1$ 步（背景）

> 💡 **为什么这样做有效？** 在高噪声水平（大 $t$）时，前景和背景的 latent 都接近纯噪声，混合边界几乎不可见。随着 $t$ 减小，DDPM 的去噪过程会逐步"修复"混合边界，自然地使前景与背景融合。这本质上利用了扩散模型的 inpainting 能力。

**5. 扩展增强（Extending Augmentations）**

为防止 CLIP 引导产生对抗样本，对每步的 $\hat{x}_0$ 施加多个随机投影变换（perspective transforms），分别计算 CLIP 梯度后取平均：

$$\nabla = \frac{1}{N} \sum_{i=1}^{N} \nabla_{x_t} \mathcal{D}_{CLIP}(\text{Aug}_i(\hat{x}_0), t_{desc}, m)$$

> 💡 **直觉理解**：要同时"欺骗"多个不同视角下的 CLIP 评估，仅靠像素级对抗扰动是不够的，必须产生真正的高层语义变化。

**6. 结果排序**

由于扩散过程的随机性，同一输入可生成多个不同结果。利用 CLIP 对编辑区域与文本描述的匹配度进行自动排序，选出最佳结果。

##### 实验结果与对比

| 方法 | 真实感 ↑ | 背景保留 ↑ | 文本匹配 ↑ |
|------|---------|-----------|-----------|
| PaintByWord | 3.31±1.38 | 3.25±1.33 | 3.14±1.31 |
| Local CLIP GD | 3.50±1.19 | 3.11±1.24 | 3.86±1.32 |
| PaintByWord++ | 1.94±1.36 | 3.37±1.30 | 3.01±1.38 |
| **Blended Diffusion (Ours)** | **3.93±1.08** | **4.73±0.61** | **4.63±0.77** |

*表：用户研究结果（Likert 1-5 量表）。Blended Diffusion 在真实感、背景保留和文本匹配三个维度上均显著优于所有基线方法*

##### 局限性

- **推理速度慢**：由于 DDPM 的序列化去噪特性，单张图像生成约需 30 秒，加上多次采样排序，不适合实时应用
- **排序不完美**：排序仅考虑编辑区域与文本的匹配度，缺乏对全局上下文一致性的评估
- **继承 CLIP 偏差**：CLIP 的 typographic attack 弱点会传递到生成结果中（如生成文字标签而非对应物体）

##### 与相关方法的关键区别

| 特性 | PaintByWord | VQGAN-CLIP | Blended Diffusion |
|------|------------|------------|-------------------|
| 输入图像 | 仅 GAN 生成图 | 真实图像 | **真实图像** |
| 背景保留 | 不完美 | 不完美 | **完美保留** |
| 生成质量 | 受限于 GAN | 受限于 VQGAN | **DDPM 高质量先验** |
| 局部编辑 | 支持 | 有限 | **精确 mask 控制** |
| 额外训练 | 需要 | 不需要 | **不需要** |
| 对抗样本 | 进化策略缓解 | 存在 | **增强策略有效缓解** |

> 💡 **Blended Diffusion 的核心贡献**：首次将 CLIP 的语义理解能力与 DDPM 的高质量图像先验相结合，通过巧妙的逐步混合机制实现了背景完美保留的局部文本驱动编辑，为后续的扩散模型编辑方法（如 SDEdit、DiffEdit 等）奠定了重要基础。

#### 🧪 练习题

```yaml
question: "Blended Diffusion 中，为什么在扩散过程的每一步将前景和背景 latent 按 mask 混合后，不会产生明显的拼接痕迹？"
options:
  - "因为 mask 的边缘经过了高斯模糊平滑处理"
  - "因为 CLIP 损失会自动优化混合边界的一致性"
  - "因为在噪声空间中混合后，DDPM 的后续去噪步骤会自然地将结果投影到自然图像流形上，修复边界不一致"
  - "因为前景和背景使用了相同的随机噪声种子"
answer: 2
explain: "Blended Diffusion 的核心洞察在于利用扩散模型的去噪投影特性。在高噪声水平时，前景和背景 latent 都接近纯噪声，混合几乎无缝；随着去噪进行，DDPM 会将混合结果投影到自然图像流形上，自动修复拼接边界的不一致，类似于 inpainting 的效果。这不依赖于 mask 模糊、CLIP 优化或噪声种子。"
```