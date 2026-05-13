### UniTok：统一离散视觉分词器

```yaml
id: unitok
name: UniTok
full_name: "统一离散视觉分词器 (Unified Tokenizer for Visual Generation and Understanding)"
year: 2025
org: "ByteDance / HKU"
paper_url: "https://arxiv.org/abs/2502.20321"
category: aigc_base
parent: "VQVAE / CLIP"
motivation: "通过多码本量化与注意力分解突破离散 token 表征瓶颈，构建同时服务于视觉生成与理解的统一分词器"
```

#### 📝 一句话总结

UniTok 提出多码本量化（Multi-Codebook Quantization）与注意力分解（Attention Factorization）来扩展离散 token 的表征能力，证明生成与理解的监督信号并不内在冲突，真正瓶颈在于离散量化的信息损失，从而构建了首个在重建质量（rFID=0.38）和语义对齐（zero-shot acc=78.6%）上同时超越领域专用分词器的统一视觉分词器。

#### 🎯 核心要点

- **核心洞察**：生成（重建）与理解（对比学习）的训练目标并不内在冲突，统一分词器性能差的真正瓶颈是离散量化带来的信息损失——维度分解（768d→16d）、离散化、有限码本容量三重瓶颈
- **多码本量化（MCQ）**：将潜在向量切分为 \(n\) 个子段，每段由独立子码本量化；8 个子码本 × 4096 条目 = 理论词汇量 \(4096^8 \approx 2^{96}\)，远超单码本的 \(2^{12}\)
- **注意力分解**：用多头因果注意力替代线性投影进行维度分解，保留更丰富的上下文信息
- **统一监督**：VQVAE 重建损失 + CLIP 对比损失联合训练，无需额外蒸馏或多阶段训练
- **统一 MLLM 集成**：将 \(K\) 个子码本编码合并为 1 个 token 输入 LLM，用 Depth Transformer 预测下一组 \(K\) 个码字
- **SOTA 结果**：ImageNet rFID=0.38（超越 SD-VAE 的 0.87）、zero-shot accuracy=78.6%（超越 CLIP ViT-L 的 76.2%）；VQA 任务全面超越 VILA-U 等统一模型

#### 🔬 深入细节

##### 1. 问题背景与动机

当前多模态大语言模型（MLLM）的视觉分词器存在"生成-理解"割裂问题：

| 分词器类型 | 代表方法 | 生成能力 | 理解能力 |
|:---:|:---:|:---:|:---:|
| 连续 VAE | SD-VAE | ✅ 优秀 | ❌ 差 |
| 离散 VQVAE | VQGAN | ✅ 较好 | ❌ 差 |
| 对比学习 | CLIP ViT | ❌ 无 | ✅ 优秀 |
| 统一（已有） | VILA-U | ⚠️ 一般 | ⚠️ 一般 |

已有统一方法（如 VILA-U）尝试在 VQVAE 上添加对比损失，但效果有限。**传统观点认为生成与理解的训练目标存在内在冲突**，UniTok 的核心发现是：**冲突的根源不在于损失函数，而在于离散量化的信息瓶颈**。

![UniTok 总览图](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x1.png)
*图 1：UniTok 与已有分词器的对比。UniTok 同时在重建质量和语义对齐上超越领域专用分词器。*

##### 2. 量化瓶颈分析

UniTok 通过系统实验揭示了离散量化的三重信息瓶颈：

![量化瓶颈分析路线图](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x3.png)
*图 3：从标准 VQVAE 到 UniTok 的渐进式改进路线图。每一步改进都显著提升了重建 FID 和零样本准确率。*

**瓶颈 1：维度分解（Factorization）**

标准 VQVAE 将编码器输出 \(\mathbf{z} \in \mathbb{R}^d\)（如 \(d=768\)）通过线性投影降维到 \(\mathbf{z}' \in \mathbb{R}^{d'}\)（如 \(d'=16\)），再进行码本查找。这一步骤丢失了大量信息。

**瓶颈 2：离散化（Discretization）**

将连续向量映射到最近码字的过程本身是有损的：

$$\mathbf{z}_q = \arg\min_{\mathbf{e}_k \in \mathcal{C}} \|\mathbf{z}' - \mathbf{e}_k\|_2$$

**瓶颈 3：有限码本容量**

单码本通常仅有 \(K=8192\) 或 \(16384\) 个条目，理论信息容量仅为 \(\log_2 K \approx 13\) bits/token，远不足以编码丰富的视觉信息。

> 💡 **关键洞察**：当离散 token 的表征能力足够强时，重建损失和对比损失可以和谐共存。这一发现从根本上改变了统一分词器的设计思路——不是去调和损失冲突，而是去扩展离散空间的容量。

##### 3. 多码本量化（Multi-Codebook Quantization）

MCQ 是 UniTok 的核心技术创新。其思想是将一个潜在向量分解为多个子段，每个子段独立量化：

给定分解后的潜在向量 \(\mathbf{z}' \in \mathbb{R}^{d'}\)，将其均匀切分为 \(n\) 个子段：

$$\mathbf{z}' = [\mathbf{z}'_1, \mathbf{z}'_2, \ldots, \mathbf{z}'_n], \quad \mathbf{z}'_i \in \mathbb{R}^{d'/n}$$

每个子段由独立的子码本 \(\mathcal{C}_i\) 量化：

$$\mathbf{z}_{q,i} = \arg\min_{\mathbf{e}_k \in \mathcal{C}_i} \|\mathbf{z}'_i - \mathbf{e}_k\|_2$$

最终量化结果为所有子段的拼接：

$$\mathbf{z}_q = [\mathbf{z}_{q,1}, \mathbf{z}_{q,2}, \ldots, \mathbf{z}_{q,n}]$$

**容量分析**：若每个子码本有 \(M\) 个条目，则总理论词汇量为 \(M^n\)。UniTok 默认使用 \(n=8\) 个子码本、每个 \(M=4096\) 条目：

$$\text{有效词汇量} = 4096^8 = 2^{96} \approx 7.9 \times 10^{28}$$

相比单码本的 \(2^{12} = 4096\)，信息容量提升了约 \(2^{84}\) 倍。

```python
# Multi-Codebook Quantization 伪代码
def multi_codebook_quantize(z_prime, codebooks, n_books=8):
    """
    z_prime: [B, L, d']  分解后的潜在向量
    codebooks: list of n_books codebooks, each [M, d'/n_books]
    """
    d_sub = z_prime.shape[-1] // n_books
    z_chunks = z_prime.chunk(n_books, dim=-1)  # n 个 [B, L, d_sub]
    
    z_q_list, indices_list = [], []
    for i, (chunk, codebook) in enumerate(zip(z_chunks, codebooks)):
        # 每个子段独立量化
        distances = torch.cdist(chunk, codebook)  # [B, L, M]
        indices = distances.argmin(dim=-1)         # [B, L]
        z_q_i = codebook[indices]                  # [B, L, d_sub]
        z_q_list.append(z_q_i)
        indices_list.append(indices)
    
    z_q = torch.cat(z_q_list, dim=-1)  # [B, L, d']
    # Straight-through estimator
    z_q = z_prime + (z_q - z_prime).detach()
    return z_q, indices_list
```

##### 4. 注意力分解（Attention Factorization）

传统 VQVAE 使用线性投影进行维度分解（\(d \to d'\)），这是一个无上下文的逐 token 操作。UniTok 提出用**多头因果注意力**替代线性投影：

![注意力分解模块](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x4.png)
*图 4：修改后的注意力模块。左：编码器端使用因果注意力进行分解；右：解码器端使用交叉注意力进行反分解。*

**编码器端（分解）**：在编码器最后一层注意力块中，将 Value 投影的输出维度从 \(d\) 改为 \(d'\)，使得注意力输出为低维向量。由于注意力机制聚合了序列中其他 token 的信息，每个低维 token 能编码更丰富的上下文语义。

**解码器端（反分解）**：在解码器第一层注意力块中，将 Query/Key 的维度设为 \(d'\)，Value 的维度设为 \(d\)，实现从低维到高维的映射。

> ⚠️ **注意**：注意力分解使用**因果注意力**（causal attention），这是为了兼容自回归生成——确保每个 token 只依赖前面的 token，使得 token 序列可以被自回归模型逐个预测。

##### 5. 统一训练目标

UniTok 的总损失函数由重建损失和对比损失两部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{recon}} + \mathcal{L}_{\text{contrastive}}$$

**重建损失**（VQVAE 风格）：

$$\mathcal{L}_{\text{recon}} = \|\mathbf{x} - \hat{\mathbf{x}}\|_2^2 + \lambda_p \mathcal{L}_{\text{perceptual}} + \lambda_g \mathcal{L}_{\text{GAN}} + \|\text{sg}[\mathbf{z}'] - \mathbf{z}_q\|_2^2 + \beta \|\mathbf{z}' - \text{sg}[\mathbf{z}_q]\|_2^2$$

其中包含像素级 L2 损失、感知损失、GAN 对抗损失、码本损失和承诺损失。

**对比损失**（CLIP 风格）：

$$\mathcal{L}_{\text{contrastive}} = -\frac{1}{2}\left[\log \frac{\exp(\text{sim}(\mathbf{v}, \mathbf{t})/\tau)}{\sum_j \exp(\text{sim}(\mathbf{v}, \mathbf{t}_j)/\tau)} + \log \frac{\exp(\text{sim}(\mathbf{t}, \mathbf{v})/\tau)}{\sum_j \exp(\text{sim}(\mathbf{t}, \mathbf{v}_j)/\tau)}\right]$$

其中 \(\mathbf{v}\) 为视觉全局特征（通过 [CLS] token 获取），\(\mathbf{t}\) 为文本特征，\(\tau\) 为温度参数。

##### 6. 统一 MLLM 架构

![UniTok 框架总览](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/x2.png)
*图 2：UniTok 整体框架。左：统一分词器训练；右：统一 MLLM 的理解与生成流程。*

UniTok 分词器产生的每个视觉 token 实际上由 \(K=8\) 个子码字索引组成。为高效集成到 LLM 中，UniTok 采用以下策略：

**理解路径**：将 \(K\) 个子码本的嵌入向量拼接后通过线性层合并为 1 个 token，输入 LLM 进行 VQA 等任务。

**生成路径**：LLM 自回归预测下一个"合并 token"，然后通过一个轻量级 **Depth Transformer** 将其展开为 \(K\) 个子码字索引：

```python
# 统一 MLLM 中的生成流程伪代码
def generate_image(text_tokens, llm, depth_transformer, decoder):
    """
    Step 1: LLM 自回归生成合并 token 序列
    Step 2: Depth Transformer 展开每个合并 token 为 K 个子码字
    Step 3: 解码器重建图像
    """
    # Step 1: LLM 预测 256 个合并 token (16×16 网格)
    merged_tokens = llm.autoregressive_generate(text_tokens, n_visual=256)
    
    # Step 2: 对每个位置，用 Depth Transformer 预测 K=8 个子码字
    all_sub_indices = []
    for pos in range(256):
        context = merged_tokens[pos]
        sub_indices = depth_transformer.generate(context, n_codes=8)
        all_sub_indices.append(sub_indices)
    
    # Step 3: 查表 + 拼接 + 解码
    z_q = lookup_and_concat(all_sub_indices, codebooks)  # [1, 256, 64]
    image = decoder(z_q.reshape(1, 16, 16, 64))          # [1, 3, 256, 256]
    return image
```

##### 7. 关键实验结果

**分词器性能对比**（ImageNet 256×256）：

| 方法 | 类型 | rFID ↓ | Zero-shot Acc ↑ |
|:---:|:---:|:---:|:---:|
| SD-VAE v2.1 | 连续 | 0.87 | — |
| VQGAN | 离散/生成 | 1.49 | — |
| CLIP ViT-L | 连续/理解 | — | 76.2% |
| VILA-U | 离散/统一 | 1.73 | 70.5% |
| **UniTok** | **离散/统一** | **0.38** | **78.6%** |

**VQA 理解性能**：

| 方法 | VQAv2 | GQA | TextVQA | POPE | MME |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Chameleon | 69.6 | — | — | — | — |
| VILA-U | 74.0 | 59.5 | 48.3 | 83.3 | 1336 |
| **UniTok** | **76.8** | **61.1** | **51.6** | **83.2** | **1448** |

**消融实验——子码本数量的影响**（固定总码本大小 16384）：

| 码本配置 | rFID ↓ | Zero-shot Acc ↑ |
|:---:|:---:|:---:|
| 1 × 16384 | 1.50 | 41.0% |
| 2 × 8192 | 0.98 | 43.9% |
| 4 × 4096 | 0.54 | 44.7% |
| 8 × 2048 | 0.33 | 46.1% |

> 💡 **关键发现**：在总码本大小不变的情况下，增加子码本数量持续提升重建和分类性能，验证了 MCQ 的有效性与通用性。

**消融实验——CLIP 权重初始化**：

| 初始化方式 | VQAv2 | GQA | TextVQA | POPE | MME |
|:---:|:---:|:---:|:---:|:---:|:---:|
| CLIP 预训练权重 | 69.9 | 56.2 | 49.3 | 81.2 | 1331 |
| **随机初始化** | **72.4** | **58.2** | **51.6** | **82.4** | **1392** |

> ⚠️ **反直觉发现**：随机初始化的 UniTok 在下游 VQA 任务上反而优于 CLIP 预训练初始化版本。这暗示 CLIP 的特征空间可能对统一分词器形成负面先验——统一视觉特征空间与纯 CLIP 特征空间存在本质差异。

![生成示例](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/fig/vis.png)
*图 5：UniTok 统一 MLLM 生成的 256×256 图像示例，展示了对复杂概念（如"梵高画风"、"比特币"）的理解与组合能力。*

![重建示例](https://ar5iv.labs.arxiv.org/html/2502.20321/assets/fig/rec.png)
*图 6：UniTok 的图像重建示例。离散分词器实现了接近无损的重建质量。*

#### 🧪 练习题

```yaml
question: "UniTok 认为统一视觉分词器性能不佳的根本原因是什么？"
options:
  - "重建损失和对比损失存在内在的梯度冲突"
  - "离散量化的信息瓶颈限制了 token 的表征能力"
  - "编码器和解码器的架构不兼容"
  - "训练数据中图文对的质量不足"
answer: 1
explain: "UniTok 的核心发现是生成与理解的损失并不内在冲突，真正瓶颈在于维度分解、离散化和有限码本容量导致的信息损失。通过多码本量化扩展离散空间容量后，两种损失可以和谐共存。"
```