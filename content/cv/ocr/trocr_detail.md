### TrOCR: Transformer-based Optical Character Recognition with Pre-trained Models

```yaml
id: trocr
name: TrOCR
full_name: "TrOCR: Transformer-based Optical Character Recognition with Pre-trained Models"
year: 2021
org: Microsoft
paper_url: https://arxiv.org/abs/2109.10282
category: ocr
parent: "—"
motivation: 首个纯Transformer预训练架构
```

#### 📝 一句话总结

TrOCR 提出了首个端到端纯 Transformer 架构的 OCR 模型，通过利用预训练的图像 Transformer（DeiT/BEiT）作为编码器和预训练的语言模型（RoBERTa）作为解码器，在无需 CNN 和 RNN 的情况下，在印刷文本、手写文本和场景文本识别任务上均达到了 SOTA 性能。

#### 🎯 核心要点

- 首个纯 Transformer 的 OCR 架构：完全摒弃 CNN 特征提取器和 RNN 序列建模器，仅使用 Transformer encoder-decoder 结构
- 编码器采用预训练图像 Transformer（DeiT/BEiT），将输入图像分割为 16×16 patch 序列作为视觉特征
- 解码器采用预训练语言模型（RoBERTa/MiniLM），通过交叉注意力机制融合视觉信息进行自回归文本生成
- 三种模型规模：TrOCR_SMALL（62M）、TrOCR_BASE（334M）、TrOCR_LARGE（558M）
- 两阶段预训练策略：第一阶段使用 684M 合成印刷文本行，第二阶段使用合成手写文本数据
- 在 SROIE（F1=96.58）、IAM（CER=2.89）等基准上达到 SOTA，无需外部语言模型或复杂后处理

#### 🔬 深入细节

![TrOCR 模型架构图](https://arxiv.org/html/2109.10282v2/x1.png)
*图：TrOCR 的 encoder-decoder 架构。编码器将输入图像分割为固定大小的 patch 并提取视觉特征，解码器以自回归方式生成文本 token。*

```python
# TrOCR 推理伪代码
def trocr_inference(image):
    # 1. 图像预处理：resize 到 384x384
    image = resize(image, (384, 384))
    
    # 2. Patch Embedding：分割为 16x16 的 patch
    patches = split_into_patches(image, patch_size=16)  # 得到 (384/16)^2 = 576 个 patch
    
    # 3. 编码器：预训练 ViT/BEiT 提取视觉特征
    visual_features = encoder(patches)  # [576, hidden_dim]
    
    # 4. 解码器：自回归生成文本
    tokens = [BOS]
    while tokens[-1] != EOS:
        # 自注意力 + 交叉注意力（attend to visual_features）
        logits = decoder(tokens, visual_features)
        next_token = beam_search(logits)
        tokens.append(next_token)
    
    return tokenizer.decode(tokens)
```

**动机与背景**

传统 OCR 系统通常采用 CNN+RNN 的混合架构：CNN 作为视觉特征提取器，RNN（如 LSTM/GRU）作为序列建模器，再配合 CTC 解码或注意力机制进行文本输出。这种流水线式设计存在以下问题：

1. CNN 和 RNN 的组合增加了模型复杂度，难以端到端优化
2. 无法充分利用大规模预训练模型的知识迁移能力
3. 通常需要外部语言模型（External LM）进行后处理以提升准确率

TrOCR 的核心动机是：既然 Transformer 在 CV（ViT、BEiT）和 NLP（BERT、GPT）领域都已证明了强大的表示能力，能否构建一个纯 Transformer 的 OCR 模型，同时利用两个领域的预训练知识？

**核心机制：Encoder-Decoder 架构**

TrOCR 采用标准的 Transformer encoder-decoder 架构，但创新性地将预训练的视觉 Transformer 和语言模型分别作为编码器和解码器的初始化：

**编码器（Image Transformer）：**

输入图像首先被 resize 到 \(384 \times 384\) 的固定分辨率，然后分割为 \(16 \times 16\) 的不重叠 patch，得到 \((384/16)^2 = 576\) 个 patch 序列。每个 patch 通过线性投影映射为一个 embedding 向量，加上可学习的位置编码后送入 Transformer 编码器：

$$\mathbf{z}_0 = [\mathbf{x}_1 E; \mathbf{x}_2 E; \ldots; \mathbf{x}_N E] + \mathbf{E}_{pos}$$

其中 \(E \in \mathbb{R}^{P^2 \cdot C \times D}\) 是 patch 投影矩阵，\(\mathbf{E}_{pos}\) 是位置编码。编码器支持三种预训练初始化：
- **DeiT**（Data-efficient Image Transformer）：在 ImageNet 上通过知识蒸馏训练
- **BEiT**（Bidirectional Encoder representation from Image Transformers）：使用 masked image modeling 自监督预训练

实验表明 BEiT 编码器性能最优，因为其自监督预训练目标与 OCR 的视觉理解需求更匹配。

**解码器（Language Model Transformer）：**

解码器使用标准 Transformer decoder 结构，包含 masked self-attention 和 cross-attention 层。关键创新在于使用预训练语言模型（RoBERTa）初始化解码器权重：

$$\text{CrossAttn}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$

其中 \(Q\) 来自解码器的 self-attention 输出，\(K, V\) 来自编码器的视觉特征。由于原始 RoBERTa 没有 cross-attention 层，这些层采用随机初始化。解码器以自回归方式逐 token 生成输出文本，使用 BPE（Byte Pair Encoding）分词。

> 💡 关键：TrOCR 的解码器同时承担了"语言模型"和"序列解码器"的双重角色——预训练的 RoBERTa 权重提供了强大的语言先验，使模型无需外部语言模型即可生成流畅准确的文本。

**两阶段预训练策略**

TrOCR 采用精心设计的两阶段预训练：

- **第一阶段**：使用大规模合成印刷文本数据（684M 文本行，从 IIT-CDIP 文档数据集通过文本渲染引擎生成）进行预训练，使模型学习基本的视觉-文本对齐能力
- **第二阶段**：使用合成手写文本数据（从 IAM 手写风格生成的 17.9M 文本行）继续预训练，使模型适应手写文本的视觉特征

数据增强策略包括：RandAugment、随机旋转（-15°~15°）、高斯模糊和图像质量退化（JPEG 压缩、高斯噪声等）。

**与传统方法的区别**

| 特性 | 传统 OCR (CNN+RNN) | TrOCR |
|------|-------------------|-------|
| 视觉特征提取 | CNN (ResNet等) | Image Transformer (ViT/BEiT) |
| 序列建模 | RNN (LSTM/GRU) | Transformer Decoder |
| 解码方式 | CTC / Attention | 自回归 + Beam Search |
| 预训练利用 | 有限（ImageNet CNN） | 充分（CV+NLP 双预训练） |
| 外部语言模型 | 通常需要 | 不需要 |
| 输入处理 | 特征图 + 序列化 | Patch 序列化 |

> ⚠️ 注意：TrOCR 的成功关键不仅在于架构设计，更在于充分利用了预训练模型的知识迁移。消融实验表明，去除预训练初始化会导致性能显著下降（IAM 上 CER 从 4.22 升至 7.01）。

**实验结果**

TrOCR 在三个主要基准上验证了有效性：
- **SROIE**（印刷收据）：TrOCR_LARGE 达到 F1=96.58，超越所有 CNN+RNN 基线
- **IAM**（手写文本）：TrOCR_LARGE 达到 CER=2.89，在不使用外部 LM 的条件下创造新 SOTA
- **场景文本**（6个标准基准）：TrOCR_LARGE 在 IC13 上达到 98.4% 准确率，整体与专用场景文本模型竞争力相当

#### 🧪 练习题

```yaml
question: "TrOCR 解码器使用预训练 RoBERTa 初始化时，哪一部分需要随机初始化？"
options:
  - "Self-attention 层的全部参数"
  - "Cross-attention 层的参数"
  - "Feed-forward 层的参数"
  - "Token embedding 层的参数"
answer: 1
explain: "RoBERTa 是纯编码器模型，不包含 cross-attention 层，因此 TrOCR 解码器中的 cross-attention 层只能随机初始化，其余层可从 RoBERTa 权重迁移。"
```