### ConsistentID

```yaml
id: consistentid
name: ConsistentID
full_name: "ConsistentID: Identity-Preserving Text-to-Image Generation with Fine-Grained Multimodal Facial Prompts"
year: 2024
org: Sun Yat-sen University, Lenovo, IIAI
paper_url: https://arxiv.org/abs/2404.16771
category: text_edit
parent: Stable Diffusion
motivation: "通过细粒度多模态面部提示实现单张参考图的身份保持文本到图像生成，无需微调即可精确保留面部局部细节，实现细粒度身份保持"
```

#### 📝 一句话总结

ConsistentID 提出了多模态面部提示生成器与 ID 保持网络两大模块，通过将面部分割为多个语义区域并分别提取视觉-文本多模态特征，结合面部注意力定位策略约束交叉注意力图与面部区域对齐，实现了仅需单张参考图、无需测试时微调的细粒度身份保持文本到图像生成。

#### 🎯 核心要点

- **多模态面部提示生成器**：包含细粒度多模态特征提取器和面部 ID 特征提取器两个子模块，分别捕获面部局部细节和全局身份信息
- **细粒度面部区域分割**：利用 BiSeNet 将面部分割为 5 个语义区域（面部轮廓、鼻子、眼睛、耳朵、嘴巴），每个区域独立编码
- **视觉-文本多模态融合**：对每个面部区域同时提取 CLIP 视觉特征和 LLaVA 生成的文本描述特征，通过 FacialEncoder 融合为统一的面部提示
- **ID 保持网络**：提出面部注意力定位策略（Facial Attention Localization Strategy），通过平衡 \(L_1\) 损失 \(\mathcal{L}_{loc}\) 约束交叉注意力图与面部分割掩码对齐
- **FGID 数据集**：构建包含 525,258 张面部图像的细粒度身份数据集，整合 FFHQ、CelebA、SFHQ 并添加多模态标注
- **FGIS 评估指标**：提出细粒度身份相似度（Fine-Grained Identity Similarity）指标，分区域评估面部身份保持质量
- **零样本推理**：基于 Stable Diffusion 1.5，仅需单张参考图即可生成身份一致的多样化图像，无需测试时微调

#### 🔬 深入细节

##### 整体框架

![ConsistentID 整体框架图](https://ar5iv.labs.arxiv.org/html/2404.16771/assets/x3.png)
*图：ConsistentID 整体框架。上方为多模态面部提示生成器（包含细粒度多模态特征提取器和面部 ID 特征提取器），下方为 ID 保持网络中的面部注意力定位策略。面部图像经 BiSeNet 分割后，各区域分别通过 CLIP 视觉编码和 LLaVA 文本描述编码，再由 FacialEncoder 融合后注入 UNet 的交叉注意力层。*

##### 背景与动机

个性化文本到图像生成（Personalized T2I Generation）旨在根据用户提供的参考图像生成保持特定身份的新图像。现有方法存在以下核心问题：

1. **测试时微调方法**（如 DreamBooth、Textual Inversion）需要针对每个新身份进行数分钟到数小时的微调，效率低下且容易过拟合，导致生成多样性不足。
2. **免微调方法**（如 IP-Adapter、PhotoMaker）虽然实现了零样本推理，但通常仅使用全局面部特征（如 ArcFace 嵌入），难以保留面部局部细节（如痣、疤痕、特定五官形状等），导致生成结果"形似而神不似"。
3. **现有方法缺乏对面部不同区域的精细化建模**，将整张面部作为单一特征处理，丢失了大量细粒度身份信息。

ConsistentID 的核心洞察是：**身份保持不仅需要全局面部 ID 特征，更需要对面部各局部区域进行细粒度的多模态（视觉+文本）特征提取和精确的空间定位**。

##### 多模态面部提示生成器（Multimodal Facial Prompt Generator）

该模块是 ConsistentID 的核心创新之一，包含两个并行的子模块：

**1. 细粒度多模态特征提取器（Fine-Grained Multimodal Feature Extractor）**

首先，使用预训练的 BiSeNet 对输入面部图像进行语义分割，将面部划分为 5 个关键区域：面部轮廓（facial contour）、鼻子（nose）、眼睛（eyes）、耳朵（ears）和嘴巴（mouth）。

对于每个区域 \(k\)，同时提取两种模态的特征：
- **视觉特征**：将裁剪后的区域图像送入 CLIP 视觉编码器，得到视觉嵌入 \(\mathbf{v}_k\)
- **文本特征**：利用多模态大语言模型 LLaVA-1.5 对每个区域生成自然语言描述（如"尖尖的鼻子"、"棕色的大眼睛"），再通过 CLIP 文本编码器得到文本嵌入 \(\mathbf{t}_k\)

随后，通过一个可训练的 **FacialEncoder**（基于 Transformer 架构）将所有区域的视觉和文本特征融合为统一的面部提示嵌入：

$$\mathbf{F}_{multi} = \text{FacialEncoder}(\{\mathbf{v}_k, \mathbf{t}_k\}_{k=1}^{5})$$

FacialEncoder 的设计参考了 IP-Adapter 中的解耦交叉注意力机制，使用独立的交叉注意力层将面部提示注入 UNet，避免干扰原始文本条件。

**2. 面部 ID 特征提取器（Facial ID Feature Extractor）**

与细粒度特征互补，该子模块使用预训练的 ArcFace 模型提取全局面部身份嵌入，并通过一个可训练的 MLP 投影层将其映射到与 CLIP 特征兼容的空间：

$$\mathbf{F}_{id} = \text{MLP}(\text{ArcFace}(\mathbf{I}_{face}))$$

两种特征通过拼接后共同注入 UNet 的交叉注意力层，实现全局身份一致性与局部细节保真的统一。

> 💡 **关键设计**：细粒度多模态特征捕获面部局部细节（"是什么样的鼻子"），而全局 ID 特征确保整体身份一致性（"是同一个人"），两者互补不可或缺。

##### ID 保持网络与面部注意力定位策略

仅通过特征注入并不能保证生成图像中面部各区域的精确空间对应。为此，ConsistentID 提出了**面部注意力定位策略（Facial Attention Localization Strategy）**。

核心思想是：**交叉注意力图中，面部相关 token 的注意力响应应当与对应的面部分割掩码在空间上对齐**。

具体而言，在 UNet 的交叉注意力层中，面部提示 token 会产生注意力图 \(\mathbf{A} \in \mathbb{R}^{H \times W}\)。同时，BiSeNet 的分割掩码 \(\mathbf{M}\) 被下采样到与注意力图相同的分辨率。训练时引入平衡 \(L_1\) 损失：

$$\mathcal{L}_{loc} = \frac{1}{N} \sum_{i=1}^{N} \left[ \omega_1 \cdot \mathbf{M}_i \cdot |\mathbf{A}_i - \mathbf{M}_i| + \omega_0 \cdot (1 - \mathbf{M}_i) \cdot |\mathbf{A}_i| \right]$$

其中 \(\omega_1\) 和 \(\omega_0\) 分别为面部区域内和区域外的平衡权重，\(N\) 为像素总数。该损失鼓励注意力集中在对应的面部区域内，同时抑制区域外的无关响应。

总训练损失为扩散去噪损失与定位损失的加权和：

$$\mathcal{L}_{total} = \mathcal{L}_{noise} + \lambda \cdot \mathcal{L}_{loc}$$

其中 \(\mathcal{L}_{noise}\) 为标准的扩散模型去噪损失：

$$\mathcal{L}_{noise} = \mathbb{E}_{z_0, \epsilon, t} \left[ \| \epsilon - \epsilon_\theta(z_t, t, c_{text}, c_{face}) \|^2 \right]$$

> ⚠️ **注意**：\(\mathcal{L}_{loc}\) 使用平衡权重而非简单的 \(L_1\) 损失，是因为面部区域在整张图像中通常只占较小比例，若不加权则区域外的损失会主导优化方向，导致注意力无法有效聚焦。

##### 算法伪代码

```python
# ConsistentID 训练流程伪代码
# 输入: 面部图像 I_face, 文本提示 text_prompt

# Step 1: 面部区域分割
regions = BiSeNet(I_face)  # {face, nose, eyes, ears, mouth}
masks = get_segmentation_masks(regions)  # 5个二值掩码

# Step 2: 细粒度多模态特征提取
for k in range(5):  # 遍历5个面部区域
    v_k = CLIP_visual(crop(I_face, regions[k]))   # 视觉特征
    desc_k = LLaVA(I_face, region_prompt[k])       # 文本描述
    t_k = CLIP_text(desc_k)                         # 文本特征

# Step 3: 特征融合
F_multi = FacialEncoder([v_1..v_5, t_1..t_5])  # 多模态融合
F_id = MLP(ArcFace(I_face))                     # 全局ID特征
F_face = concat(F_multi, F_id)                   # 拼接

# Step 4: 扩散训练 + 注意力定位
z_t = add_noise(VAE_encode(I_face), t)
epsilon_pred = UNet(z_t, t, CLIP_text(text_prompt), F_face)
L_noise = MSE(epsilon_pred, epsilon)

# Step 5: 注意力定位损失
A = get_cross_attention_maps(UNet, face_tokens)
M = downsample(masks, A.shape)
L_loc = balanced_L1(A, M, w1=1.0, w0=1.0)

# Step 6: 总损失
L_total = L_noise + lambda * L_loc
optimizer.step(L_total)
```

##### 训练细节与数据集

**FGID 数据集构建**：作者整合了 FFHQ（70K）、CelebA（200K）和 SFHQ（255K）三个公开面部数据集，共计 525,258 张图像。对每张图像进行以下标注：
- BiSeNet 面部分割（5 个区域掩码）
- LLaVA-1.5 生成的面部区域文本描述
- ArcFace 面部身份嵌入

**训练配置**：
- 基础模型：Stable Diffusion 1.5
- 初始化：从 IP-Adapter FaceID-Plus 的预训练权重初始化
- 硬件：8 × NVIDIA 3090 GPU
- 学习率：\(1 \times 10^{-4}\)，Adam 优化器
- 批量大小：16（每 GPU 2 张）
- 训练时冻结 SD UNet 和 CLIP 编码器，仅训练 FacialEncoder、MLP 投影层和交叉注意力层

##### 与现有方法的对比

| 特性 | DreamBooth | IP-Adapter FaceID | PhotoMaker | InstantID | **ConsistentID** |
|------|-----------|-------------------|------------|-----------|-----------------|
| 测试时微调 | ✅ 需要 | ❌ 不需要 | ❌ 不需要 | ❌ 不需要 | ❌ **不需要** |
| 面部特征粒度 | 全局 | 全局 (ArcFace) | 全局 (CLIP) | 全局 (ArcFace) | **局部+全局** |
| 多模态特征 | 单模态 | 单模态 | 单模态 | 单模态 | **视觉+文本** |
| 注意力空间约束 | ❌ | ❌ | ❌ | ❌ | ✅ **\(\mathcal{L}_{loc}\)** |
| 面部细节保持 | 中等 | 较低 | 中等 | 较高 | **最高** |

在定量评估中，ConsistentID 在多项指标上取得最优：
- **CLIP-I**（图像相似度）：76.7%（vs InstantID 72.1%）
- **DINO**（结构相似度）：78.5%（vs InstantID 72.3%）
- **FaceSim**（面部相似度）：77.2%（vs InstantID 72.5%）
- **FGIS**（细粒度身份相似度）：81.4%（vs InstantID 73.2%）
- **CLIP-T**（文本对齐度）：31.1%（vs InstantID 28.3%）

> 💡 **关键优势**：ConsistentID 不仅在身份保持指标上大幅领先，在文本对齐度（CLIP-T）上也表现最优，说明细粒度面部特征注入没有牺牲文本可控性。

#### 🧪 练习题

```yaml
question: "ConsistentID 中面部注意力定位策略（Facial Attention Localization Strategy）的核心作用是什么？"
options:
  - "加速扩散模型的去噪收敛速度"
  - "约束交叉注意力图与面部分割掩码在空间上对齐，确保面部特征精确定位"
  - "替代 ArcFace 提取更精确的全局面部 ID 特征"
  - "减少 FacialEncoder 的参数量以提升推理效率"
answer: 1
explain: "面部注意力定位策略通过平衡 L1 损失 L_loc 约束 UNet 交叉注意力图与 BiSeNet 分割掩码对齐，使面部各区域的特征注入精确对应到生成图像的正确空间位置，从而实现细粒度的身份保持。"
```