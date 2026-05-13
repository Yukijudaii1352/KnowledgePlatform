### Parti

```yaml
id: parti
name: Parti
full_name: 路径自回归文本到图像模型 (Scaling Autoregressive Models for Content-Rich Text-to-Image Generation)
year: 2022
org: Google Research
paper_url: https://arxiv.org/abs/2206.10789
category: autoregressive
parent: vit-vqgan
motivation: 将文本到图像生成建模为序列到序列翻译问题，通过扩展自回归Transformer至20B参数并结合ViT-VQGAN图像tokenizer，实现内容丰富的高质量文本到图像合成
```

#### 📝 一句话总结

Parti 将文本到图像生成视为序列到序列问题，使用 ViT-VQGAN 将图像编码为离散 token 序列，再通过 encoder-decoder Transformer 自回归生成图像 token，并证明了将模型从 350M 扩展到 20B 参数可以持续提升生成质量，在 MS-COCO 上取得了零样本 FID 7.23 和微调 FID 3.22 的当时最优结果。

#### 🎯 核心要点

- **序列到序列框架**：将文本到图像生成建模为"翻译"任务，文本 token 为源序列（最长 128 token），图像 token 为目标序列（32×32 = 1024 token）
- **两阶段架构**：第一阶段用 ViT-VQGAN（8192 码本）将 256×256 图像编码为离散 token；第二阶段用 encoder-decoder Transformer 自回归生成图像 token
- **模型扩展**：训练了 350M、750M、3B、20B 四个规模的模型，证明自回归模型在文本到图像任务上具有清晰的 scaling 优势
- **Classifier-Free Guidance (CFG)**：在自回归模型中实现无分类器引导，通过随机丢弃文本条件并在推理时线性组合有/无条件 logits
- **CoCa 重排序**：生成 16 个候选图像后，用 CoCa 模型按图文匹配分数选择最佳结果
- **超分辨率级联**：使用两级 WDSR 超分网络将 256×256 图像逐步提升至 512×512 和 1024×1024
- **PartiPrompts (P2) 基准**：提出包含 1600 条英文提示的评测基准，覆盖 12 个类别和 11 种挑战维度
- **大规模分布式训练**：20B 模型使用 GSPMD 在 TPUv4 上实现 16 级流水线并行 + 64 路数据并行

#### 🔬 深入细节

##### 整体架构

![Parti 架构图](https://ar5iv.labs.arxiv.org/html/2206.10789/assets/figures/parti.jpg)
*图：Parti 整体架构。文本经 Transformer 编码器编码，图像经 ViT-VQGAN 编码为离散 token 序列，Transformer 解码器自回归生成图像 token，最后由 ViT-VQGAN 解码器重建图像。*

![Parti 生成示例](https://ar5iv.labs.arxiv.org/html/2206.10789/assets/figures/teaser.jpg)
*图：Parti-20B 生成的高质量图像示例，展示了对复杂文本提示的理解能力。*

##### 算法伪代码

```python
# ========== 第一阶段：ViT-VQGAN 图像 Tokenizer（预训练，冻结） ==========
# 编码器 E (30M 参数), 解码器 G (600M 参数), 码本 Z (8192 entries)
z_e = E(image)                          # ViT 编码: 256×256 → 连续特征
z_q = quantize(z_e, Z)                  # 向量量化: 找码本最近邻
tokens = codebook_indices(z_q)          # 转为索引序列: 32×32 = 1024 tokens
image_hat = G(z_q)                      # 解码重建（训练时用）

# ========== 第二阶段：Encoder-Decoder Transformer ==========
# 文本编码器 Enc, 图像解码器 Dec
text_tokens = tokenize(text_prompt)     # SentencePiece 分词, 最长 128 tokens
text_features = Enc(text_tokens)        # Transformer 编码器

# 自回归生成图像 token
image_tokens = []
for i in range(1024):                   # 32×32 = 1024 步
    logits = Dec(image_tokens, text_features)  # 交叉注意力 + 因果自注意力
    
    # Classifier-Free Guidance
    logits_cond = logits                        # 有条件 logits
    logits_uncond = Dec(image_tokens, NULL)     # 无条件 logits (文本=空)
    logits_final = logits_uncond + w * (logits_cond - logits_uncond)  # w=3.0
    
    next_token = sample(logits_final)   # Top-k 采样
    image_tokens.append(next_token)

# 解码 + 超分辨率
image_256 = G(lookup(Z, image_tokens))  # ViT-VQGAN 解码: tokens → 256×256
image_512 = WDSR_15M(image_256)         # 超分: 256→512
image_1024 = WDSR_30M(image_512)        # 超分: 512→1024

# ========== CoCa 重排序 ==========
candidates = [generate() for _ in range(16)]  # 生成 16 个候选
scores = [CoCa.score(text, img) for img in candidates]
best_image = candidates[argmax(scores)]       # 选图文匹配最高的
```

##### 动机与背景

文本到图像生成领域在 2022 年经历了快速发展，DALL-E、CogView 等自回归模型和 GLIDE、DALL-E 2、Imagen 等扩散模型相继涌现。然而，**自回归模型在文本到图像任务上的 scaling 行为尚未被充分探索**。在自然语言处理中，GPT-3 等工作已经证明了自回归模型随参数量增长的持续性能提升，但这一规律是否适用于跨模态的图像生成任务仍是开放问题。

此前的自回归文本到图像模型（如 DALL-E、CogView）通常将文本和图像 token 拼接为单一序列，使用 decoder-only Transformer 建模。Parti 的核心洞察是：**将文本到图像生成重新建模为序列到序列（seq2seq）翻译问题**，类似于机器翻译中将源语言"翻译"为目标语言。这种 encoder-decoder 架构天然适合处理输入（文本）和输出（图像）长度不对称的场景，并且可以直接借鉴 NLP 领域成熟的 scaling 策略。

##### 核心机制一：ViT-VQGAN 图像 Tokenizer

Parti 使用经过微调的 ViT-VQGAN 作为图像 tokenizer，将 \(256 \times 256\) 的图像编码为 \(32 \times 32 = 1024\) 个离散 token，码本大小为 8192。相比原始 ViT-VQGAN，Parti 做了一个关键修改：**移除了 sigmoid 激活函数和 logit-Laplace 损失**，改用标准的 L2 重建损失，发现这在大规模训练中更加稳定。

编码器仅有 30M 参数（推理时冻结），而解码器有 600M 参数，这种不对称设计反映了"编码容易、解码难"的直觉——从离散 token 重建高质量图像比将图像压缩为 token 更具挑战性。

$$\text{Image} \xrightarrow{E_{\text{ViT}}} z_e \xrightarrow{\text{Quantize}} z_q = \arg\min_{z_k \in \mathcal{Z}} \|z_e - z_k\| \xrightarrow{\text{Index}} s \in \{0, \dots, 8191\}^{1024}$$

> 💡 **关键直觉**：图像 tokenizer 的质量是整个系统的瓶颈。无论 Transformer 多强大，它只能在 tokenizer 所能表达的视觉空间内生成图像。Parti 使用 600M 参数的 ViT 解码器（而非传统 CNN 解码器）来确保从离散 token 到像素的重建质量。

##### 核心机制二：Encoder-Decoder Transformer

![解码器注意力模式](https://ar5iv.labs.arxiv.org/html/2206.10789/assets/x1.png)
*图：Parti 解码器中的卷积形状稀疏注意力掩码。每个 token 只关注同行及上方的 token，模拟了 2D 图像的局部结构。*

Parti 的核心是一个 encoder-decoder Transformer，其中：

- **编码器**处理文本 token（最长 128 个），使用双向自注意力
- **解码器**自回归生成图像 token（1024 个），使用因果自注意力 + 交叉注意力

20B 模型的具体配置为：

| 组件 | 层数 | 隐藏维度 | 注意力头数 | 参数量 |
|------|------|----------|-----------|--------|
| 编码器 | 16 | 4096 | 64 | ~2B |
| 解码器 | 64 | 4096 | 64 | ~18B |

解码器中使用了**卷积形状的稀疏注意力掩码**（Conv-shaped Masked Sparse Attention）：在因果注意力的基础上，每个 token 不仅关注之前的所有 token，还特别关注同一行和上方行的 token。这种设计利用了图像 token 的 2D 空间结构，在不增加计算量的情况下引入了局部归纳偏置。

> 💡 **设计直觉**：图像 token 按光栅扫描顺序排列为 1D 序列，但它们本质上具有 2D 空间关系。卷积形状的注意力掩码让模型在生成每个 token 时能更好地利用空间邻域信息，类似于 CNN 的局部感受野，但保持了 Transformer 的灵活性。

##### 核心机制三：Classifier-Free Guidance (CFG)

Parti 在自回归模型中实现了 Classifier-Free Guidance，这是提升生成质量的关键技术。训练时以 10% 的概率随机将文本输入替换为空序列，使模型同时学习有条件和无条件分布。推理时，对每一步的 logits 进行线性组合：

$$\ell_{\text{final}} = \ell_{\text{uncond}} + w \cdot (\ell_{\text{cond}} - \ell_{\text{uncond}})$$

其中 \(w\) 为引导权重（guidance scale），Parti 使用 \(w = 3.0\)。

> ⚠️ **注意**：与扩散模型中对连续噪声预测应用 CFG 不同，自回归模型中的 CFG 作用于离散 token 的 logits 空间。这意味着引导权重不能设得太大（扩散模型常用 7.5-15），否则会导致 logits 分布过于尖锐，生成退化。Parti 发现 \(w = 3.0\) 是最优值。

CFG 的引入带来了显著的 FID 提升。在微调阶段，Parti 额外使用 LAION-400M 数据集进行带 CFG 的训练，使零样本 FID 从约 10+ 降至 7.23。

##### 核心机制四：模型扩展（Scaling）

![Scaling 对比](https://ar5iv.labs.arxiv.org/html/2206.10789/assets/x5.png)
*图：不同规模 Parti 模型在相同提示下的生成效果对比，展示了 scaling 带来的质量提升。*

Parti 训练了四个规模的模型，清晰展示了自回归模型在文本到图像任务上的 scaling 优势：

| 模型 | 参数量 | 零样本 FID ↓ |
|------|--------|-------------|
| Parti-350M | 350M | 14.10 |
| Parti-750M | 750M | 10.71 |
| Parti-3B | 3B | 8.10 |
| Parti-20B | 20B | **7.23** |

微调后，Parti-20B 进一步达到 **FID 3.22**，为当时 MS-COCO 256×256 的最优结果。

20B 模型的训练使用了 Google 的 GSPMD 框架在 TPUv4 集群上进行：
- **16 级流水线并行**（将模型层分配到不同设备）
- **64 路数据并行**（共 1024 个 TPUv4 芯片）
- 优化器：Adafactor，精度：bfloat16
- 批量大小 8192，训练 450K 步

> 💡 **关键发现**：随着模型规模增大，Parti 在多个维度上持续改善——不仅 FID 分数下降，生成图像的细节丰富度、文本理解准确度、物体组合能力都显著提升。这与 NLP 中观察到的 scaling law 一致，表明自回归模型在跨模态生成中同样受益于规模扩展。

##### 训练数据与文本编码器预训练

Parti 使用了三个大规模数据集的组合：
- **LAION-400M**：公开的网络图文对数据集
- **FIT400M**：内部的图文对数据集
- **JFT-4B**：大规模图像分类数据集，使用 SimVLM 模型为每张图像生成文本描述

文本编码器并非从零训练，而是经过两阶段预训练：
1. 在 C4 数据集上进行 BERT 风格的掩码语言建模
2. 在图文对数据上进行对比学习

这种预训练策略使文本编码器具备了更强的语义理解能力，尤其是对复杂、长文本提示的处理。

##### 已知局限性

论文详细分析了 Parti 的 13 类典型失败模式：

| 失败类型 | 描述 |
|---------|------|
| 颜色溢出 | 一个物体的颜色泄漏到相邻物体 |
| 特征融合 | 多个物体的属性错误混合 |
| 计数失败 | 超过 7 个物体时计数不可靠 |
| 空间关系 | "左/右"等方位词几乎随机 |
| 否定/缺失 | 忽略"没有""不含"等否定表达 |
| 文本渲染 | 生成的图内文字常有拼写错误 |
| 实体解耦 | 难以将多个属性正确分配给多个物体 |
| 视觉先验 | 过度依赖训练数据中的常见搭配 |

> ⚠️ **注意**：这些局限性中的许多（如计数、空间关系、否定理解）至今仍是文本到图像模型的共性挑战，反映了当前模型在组合性推理能力上的根本不足。

##### 与同期方法的对比

| 方法 | 类型 | 参数量 | 零样本 FID ↓ | 图像分辨率 |
|------|------|--------|-------------|-----------|
| DALL-E | 自回归 | 12B | 27.50 | 256×256 |
| CogView | 自回归 | 4B | 27.10 | 256×256 |
| GLIDE | 扩散 | 5B | 12.24 | 256×256 |
| Make-A-Scene | 自回归 | 4B | 11.84 | 256×256 |
| DALL-E 2 | 扩散 | 5.5B | 10.39 | 256×256 |
| Imagen | 扩散 | 3B | 7.27 | 256×256 |
| **Parti-20B** | **自回归** | **20B** | **7.23** | **256×256** |

Parti 是当时首个在零样本 FID 上与扩散模型（Imagen）持平的自回归模型，证明了自回归方法在文本到图像生成中的竞争力。

#### 🧪 练习题

```yaml
question: "Parti 相比 DALL-E 等先前自回归文本到图像模型的核心架构区别是什么？"
options:
  - "使用更大的图像码本（8192 vs 8192），提升图像重建质量"
  - "采用 encoder-decoder Transformer 将文本到图像建模为序列到序列翻译问题，而非 decoder-only 拼接"
  - "使用扩散模型替代自回归解码，提升生成多样性"
  - "引入多尺度向量量化，在不同分辨率上分别生成图像 token"
answer: 1
explain: "DALL-E 将文本和图像 token 拼接为单一序列用 decoder-only Transformer 建模，而 Parti 采用 encoder-decoder 架构，编码器处理文本、解码器自回归生成图像 token，这种 seq2seq 框架更适合输入输出长度不对称的跨模态生成任务，并可直接借鉴 NLP 的 scaling 策略。"
```