### PhotoMaker

```yaml
id: photomaker
name: PhotoMaker
full_name: "PhotoMaker: Customizing Realistic Human Photos via Stacked ID Embedding"
year: 2024
org: Tencent
paper_url: "https://arxiv.org/abs/2312.04461"
category: identity_preserve
parent: ip-adapter
motivation: 堆叠ID嵌入多参考图融合
```

#### 📝 一句话总结

PhotoMaker 提出了 **Stacked ID Embedding** 机制，将多张参考人脸图像的 CLIP 特征与文本类别词嵌入融合后堆叠，注入扩散模型的交叉注意力层，实现了无需 test-time fine-tuning 的高保真人物身份定制生成。

#### 🎯 核心要点

- **Stacked ID Embedding**：将多张参考图的 CLIP 图像特征分别与类别词（如 "man"/"woman"）文本嵌入通过 MLP 融合，再沿 token 维度堆叠，形成统一的身份表示
- **统一 ID 表示**：融合图像语义与文本语义，使模型同时保持身份保真度和文本可控性
- **Cross-Attention 注入**：用 Stacked ID Embedding 替换文本 prompt 中类别词对应位置的 token，直接参与 UNet 的交叉注意力计算
- **LoRA 微调策略**：仅在注意力层添加 LoRA 适配器，保持预训练 SDXL 的生成能力
- **ID-oriented 数据构建流水线**：自动化的名人图像采集→人脸检测→质量过滤→背景分割→字幕生成流程
- **多样化应用**：支持身份重上下文化、身份混合、风格迁移、年龄/性别变换等，无需额外训练
- **推理加速**：无需 test-time 微调，单次前向推理即可完成身份定制，比 DreamBooth 快数十倍

#### 🔬 深入细节

##### 整体架构

![PhotoMaker 架构总览](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x2.png)
*图：(a) PhotoMaker 整体框架——多张参考图经 CLIP 图像编码器提取特征后，与类别词嵌入融合并堆叠，替换 prompt 中对应位置后送入 UNet 交叉注意力；(b) ID-oriented 数据构建流水线。*

##### 算法伪代码

```python
# PhotoMaker 训练伪代码
# 输入: 同一身份的 1~4 张参考图 {I_1, ..., I_N}, 文本 prompt T (含类别词 c_class)
# 模型: CLIP ViT-L/14 图像编码器 (冻结), SDXL UNet (LoRA), MLP 融合层

# === 1. 构建 Stacked ID Embedding ===
for i in range(N):
    # 对参考图做人脸裁剪+背景 mask
    I_masked_i = face_crop_and_mask(I_i)
    # CLIP 图像编码 (取 CLS token + 最后一层 penultimate 特征)
    v_i = CLIP_image_encoder(I_masked_i)          # [1, D_img]
    # 获取类别词的文本嵌入
    t_class = text_encoder.get_embedding(c_class)  # [1, D_text]
    # MLP 融合: 将图像特征与文本嵌入合并
    s_i = MLP(concat(v_i, t_class))                # [1, D_text]

# 沿 token 维度堆叠
S_id = stack([s_1, s_2, ..., s_N], dim=1)          # [1, N, D_text]

# === 2. 替换文本嵌入中的类别词位置 ===
T_emb = text_encoder(T)                            # [1, L, D_text]
T_emb[class_pos] = S_id                            # 替换 → [1, L-1+N, D_text]

# === 3. 扩散模型训练 ===
t = random_timestep()
noise = randn_like(x_0)
x_t = add_noise(x_0, noise, t)
noise_pred = UNet_LoRA(x_t, t, T_emb)

# Masked diffusion loss: 仅在人脸区域加权
loss = MSE(noise_pred * face_mask, noise * face_mask)
loss.backward()
optimizer.step()
```

##### 核心机制详解

**1. 动机与背景**

现有的身份定制方法主要分为两类：(1) **test-time fine-tuning** 方法（如 DreamBooth、Textual Inversion），每个新身份需要数分钟到数十分钟的微调，实用性受限；(2) **encoder-based** 方法（如 IP-Adapter），虽然推理快速，但通常只支持单张参考图且身份保真度不足。PhotoMaker 的核心目标是：**在不需要 test-time 微调的前提下，利用多张参考图实现高保真身份保持**。

> 💡 关键洞察：将图像特征与文本类别词嵌入融合（而非简单拼接或替换），可以让身份信息"继承"文本空间的语义结构，从而在保持身份的同时不损失文本可控性。

**2. Stacked ID Embedding 机制**

这是 PhotoMaker 的核心创新。给定 \(N\) 张同一身份的参考图 \(\{I_1, I_2, \ldots, I_N\}\)，每张图经过以下处理：

**Step 1: 图像编码。** 使用冻结的 CLIP ViT-L/14 图像编码器提取特征：

$$\mathbf{v}_i = \text{CLIP}_{\text{img}}(I_i^{\text{masked}})$$

其中 \(I_i^{\text{masked}}\) 是经过人脸裁剪和背景分割后的图像，去除无关背景信息以聚焦身份特征。

**Step 2: 与类别词融合。** 获取 prompt 中类别词（如 "man"、"woman"）的文本嵌入 \(\mathbf{t}_{\text{class}}\)，通过 MLP 将图像特征与文本嵌入融合：

$$\mathbf{s}_i = \text{MLP}([\mathbf{v}_i; \mathbf{t}_{\text{class}}])$$

> ⚠️ 注意：这里的融合不是简单的加法或拼接后直接使用，而是通过可学习的 MLP 将两种模态的信息映射到统一的文本嵌入空间。类别词提供了"人物"的语义先验，图像特征提供了具体身份信息。

**Step 3: 堆叠。** 将所有融合后的嵌入沿 token 维度堆叠：

$$\mathbf{S}_{\text{id}} = [\mathbf{s}_1; \mathbf{s}_2; \ldots; \mathbf{s}_N] \in \mathbb{R}^{N \times D}$$

这个 Stacked ID Embedding 替换文本嵌入序列中类别词对应位置的 token。由于交叉注意力机制天然支持变长 key/value 序列，替换后序列长度从 \(L\) 变为 \(L - 1 + N\)，无需修改模型架构。

**3. 交叉注意力中的身份注入**

在 UNet 的交叉注意力层中，修改后的文本嵌入作为 key 和 value：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right) V$$

其中 \(Q\) 来自图像特征，\(K, V\) 来自包含 Stacked ID Embedding 的文本嵌入。身份信息通过注意力机制自然地融入生成过程。

**4. 训练策略**

- **基础模型**：SDXL（1024×1024 分辨率）
- **可训练参数**：MLP 融合层 + UNet 注意力层的 LoRA 适配器 + CLIP 图像编码器最后两层
- **训练数据**：每个样本包含同一身份的 1~4 张图像，训练时随机采样
- **Masked Diffusion Loss**：在人脸区域施加更高的损失权重，引导模型关注身份特征

$$\mathcal{L} = \mathbb{E}_{t, \epsilon}\left[\|\mathbf{M} \odot (\epsilon - \epsilon_\theta(\mathbf{x}_t, t, \mathbf{c}))\|^2\right]$$

其中 \(\mathbf{M}\) 是人脸区域的 mask（50% 概率启用），\(\mathbf{c}\) 是包含 Stacked ID Embedding 的条件信息。

- **Classifier-Free Guidance**：10% 概率将文本 prompt 置空，训练无条件生成能力
- **硬件**：8×A100 GPU，训练约 2 周；batch size 48，学习率 LoRA 部分 1e-4、其余 1e-5

**5. 推理技巧**

- **Delayed Subject Conditioning**：在去噪的前若干步不注入身份条件，让模型先建立整体构图，再逐步引入身份信息，提升生成质量和多样性
- **Identity Mixing**：输入不同身份的参考图，模型可以生成融合多个身份特征的新面孔
- **无需微调**：推理时仅需前向传播，50 步 DDIM 采样，CFG scale = 5

**6. 与先前方法的对比**

| 方法 | 需要微调 | 多参考图 | 推理速度 | 身份保真度 |
|------|---------|---------|---------|-----------|
| DreamBooth | ✅ (数分钟) | ❌ | 慢 | 高 |
| Textual Inversion | ✅ (数小时) | ❌ | 慢 | 中 |
| IP-Adapter | ❌ | ❌ (单图) | 快 | 中 |
| **PhotoMaker** | **❌** | **✅** | **快** | **高** |

![定性对比结果](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x3.png)
*图：与 IP-Adapter、InstantID 等方法的定性对比。PhotoMaker 在身份保真度和文本一致性上均表现优异。*

**7. 消融实验：堆叠 vs 其他融合策略**

![输入图片数量对指标的影响](https://ar5iv.labs.arxiv.org/html/2312.04461/assets/x7.png)
*图：输入参考图数量对 CLIP-I、DINO、CLIP-T 和 Face Similarity 指标的影响。更多参考图提升身份保真度（CLIP-I、DINO、Face Sim 上升），但文本一致性（CLIP-T）略有下降。*

消融实验表明：
- **Stacking > Averaging**：堆叠保留了每张参考图的独立信息，而平均会丢失细节
- **Stacking > Linear Projection**：线性投影将多图压缩为固定维度，信息损失更大
- **更多参考图 → 更高身份保真度**：但存在 ID 保真度与文本可控性的 trade-off

#### 🧪 练习题

```yaml
question: "PhotoMaker 中 Stacked ID Embedding 的核心操作是什么？"
options:
  - "将多张参考图的 CLIP 特征取平均后替换文本嵌入中的类别词"
  - "将每张参考图的 CLIP 特征与类别词嵌入融合后，沿 token 维度堆叠替换类别词位置"
  - "将参考图特征通过额外的交叉注意力层注入 UNet，不修改文本嵌入"
  - "将多张参考图拼接为一张大图后送入 CLIP 编码器"
answer: 1
explain: "PhotoMaker 的核心是将每张参考图的 CLIP 图像特征与类别词文本嵌入通过 MLP 融合，然后将 N 个融合嵌入沿 token 维度堆叠，替换文本序列中类别词的位置，利用交叉注意力的变长特性自然注入身份信息。"
```