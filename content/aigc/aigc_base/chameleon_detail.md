### Chameleon 混合模态早期融合基础模型

```yaml
id: chameleon
name: Chameleon
full_name: "Chameleon: Mixed-Modal Early-Fusion Foundation Models"
year: "2024"
org: Meta
paper_url: "https://arxiv.org/abs/2405.09818"
category: aigc_base
parent: "—"
motivation: "将图像和文本统一token化后用单一Transformer端到端训练，实现任意模态组合的理解与生成"
```

#### 📝 一句话总结

Chameleon 提出早期融合(early-fusion)的token化多模态架构，将图像离散化为8192码本的1024个token与文本token统一输入单一Transformer，通过QK-Norm等架构创新解决多模态训练稳定性难题，在约10T tokens上预训练后实现了跨模态理解与生成的统一，混合模态人评胜率达60.4% vs Gemini-Pro。

#### 🎯 核心要点

- **早期融合架构**：图像经VQ-VAE tokenizer编码为1024个离散token（codebook=8192），与BPE文本token共享统一词表（65,536），输入同一自回归Transformer
- **训练稳定性三板斧**：QK-Norm（必需）+ Swin-style LayerNorm重排序（34B必需）+ Dropout（7B使用，34B不用），解决多模态softmax竞争导致的norm发散
- **两阶段预训练**：~10T tokens，Stage 1（80%）大规模混合数据 + Stage 2（20%）高质量数据上采样
- **SFT对齐**：覆盖Text/Code/VisualChat/ImageGen/Interleaved/Safety六类数据，仅对answer token计算loss
- **文本能力不退化**：Chameleon-34B在5/8常识推理任务上超越Llama-2 70B，与Mixtral 8x7B持平
- **视觉语言SOTA**：34B模型2-shot即超越Flamingo-80B和IDEFICS-80B的32-shot（COCO CIDEr 120.2 vs 113.8/116.6）
- **混合模态人评优势**：vs Gemini-Pro胜率60.4%，vs GPT-4V胜率51.6%

#### 🔬 深入细节

##### 1. 整体架构：统一Token化的早期融合

Chameleon的核心思想是**将所有模态映射到统一的离散token空间**，然后用标准的自回归Transformer进行端到端训练，无需独立的编码器或解码器模块。

![Chameleon架构概览](https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x1.png)
*图：Chameleon将图像和文本统一token化，通过单一Transformer处理任意模态组合的输入与输出*

与传统后期融合方法（如LLaVA将冻结视觉编码器的连续特征投影到LLM空间）不同，Chameleon将图像也编码为离散token，使得图文token在模型内部完全对等——共享embedding层、attention层和输出头。这意味着模型天然支持任意模态组合的输入输出：文→文、图→文、文→图、图文→图文。

##### 2. 图像Token化

基于Make-A-Scene的VQ-VAE变体训练图像tokenizer，将512×512图像编码为32×32=1024个离散token，codebook大小为8192。这8192个图像码本token与57,344个BPE文本token合并为统一词表（共65,536）。

```python
# 伪代码：图像token化与解码流程
def image_to_tokens(image):
    """512x512 图像 → 1024个离散token"""
    image = resize_and_crop(image, 512, 512)
    z = encoder(image)                    # [B, 32, 32, D]
    indices = quantize(z, codebook)       # codebook_size=8192
    tokens = indices.flatten()            # [B, 1024]
    return tokens  # 每个token ∈ {0, 1, ..., 8191}

def tokens_to_image(tokens):
    """1024个离散token → 512x512 图像"""
    indices = tokens.reshape(32, 32)
    z_q = codebook[indices]               # 查表得到连续向量
    image = decoder(z_q)                  # 解码为像素
    return image
```

> ⚠️ 注意：图像tokenizer对含大量文字的图像重建能力差，这构成了OCR相关任务的性能上界。

##### 3. QK-Norm：解决多模态训练发散的关键

**问题根源**：当文本和图像共享同一Transformer时，两种模态的熵差异显著。由于softmax的平移不变性 \(\text{softmax}(\mathbf{z}) = \text{softmax}(\mathbf{z} + c)\)，各模态会通过不断增大自身的norm来"竞争"注意力权重，导致训练中后期norm超出bf16表示范围而发散。

![训练稳定性消融](https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x5.png)
*图：不同稳定性技术组合下的norm增长对比。无QK-Norm时norm持续增长直至发散*

**解决方案**：对注意力机制中的Query和Key向量施加LayerNorm，直接约束softmax输入的norm：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{\text{LN}(Q) \cdot \text{LN}(K)^T}{\sqrt{d_k}}\right) V$$

```python
# QK-Norm 实现
class QKNormAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)
        self.q_norm = nn.LayerNorm(d_model // n_heads)  # 每个head独立norm
        self.k_norm = nn.LayerNorm(d_model // n_heads)
    
    def forward(self, x):
        Q, K, V = self.q_proj(x), self.k_proj(x), self.v_proj(x)
        Q = self.q_norm(Q)  # 约束Q的norm范围
        K = self.k_norm(K)  # 约束K的norm范围
        attn = softmax(Q @ K.T / sqrt(d_k)) @ V
        return attn
```

> 💡 关键：QK-Norm在所有模型规模和配置中都是**必需的**，是Chameleon多模态训练成功的基石。

##### 4. Swin-style Norm重排序与Dropout

对于34B模型，仅QK-Norm不够，还需要将LLaMA的Pre-Norm改为Swin-style Post-Norm，以约束FFN块中SwiGLU乘法性质导致的norm放大：

```
# LLaMA-2 Pre-Norm:
h = x + attention(attention_norm(x))
output = h + feed_forward(ffn_norm(h))

# Chameleon-34B Post-Norm (Swin-style):
h = x + attention_norm(attention(x))
output = h + ffn_norm(feed_forward(h))
```

![训练曲线](https://ar5iv.labs.arxiv.org/html/2405.09818/assets/x6.png)
*图：不同稳定性配置的训练loss曲线。Swin-norm+QK-Norm组合在34B规模下最稳定*

稳定性方案总结：

| 技术 | 7B | 34B | 作用 |
|------|-----|------|------|
| QK-Norm | ✅ 必需 | ✅ 必需 | 控制attention softmax输入的norm |
| Dropout (0.1) | ✅ 使用 | ❌ 不用 | 正则化，但与Swin-norm不兼容 |
| Swin Norm重排序 | 可选 | ✅ 必需 | 约束FFN输出norm增长 |
| z-loss | ✅ | ✅ | 稳定输出logit的softmax |

> ⚠️ 注意：Swin-style norm与dropout不兼容——dropout会破坏Post-Norm的归一化效果，实验证实34B同时使用两者仍会发散。

##### 5. 预训练与SFT

**预训练**：在约10T tokens上分两阶段训练。Stage 1（80%）使用大规模混合模态数据，text-image对50%概率翻转顺序增强双向理解；Stage 2（20%）上采样高质量数据。优化器为AdamW（\(\beta_1=0.9, \beta_2=0.95\)），4000步线性warmup后指数衰减。

**SFT对齐**：覆盖6类数据（Text 1.6M + Code 14.1K + VisualChat 15.6K + ImageGen 64.3K + Interleaved 16.9K + Safety 95.3K），学习率1e-5 cosine schedule，仅对answer token计算loss。关键策略包括模态平衡采样（防止某模态过度主导）和图像差异化处理（prompt用border padding保留信息，answer用center crop保证视觉质量）。

##### 6. 实验结果

**文本基准**（Table 6）：

| 基准 | Chameleon-34B | Llama-2 70B | Mixtral 8x7B |
|------|---------------|-------------|--------------|
| MMLU | 65.8 | 68.9 | 70.6 |
| HellaSwag | 82.7 | 85.3 | 84.4 |
| ARC-C | **59.7** | 57.4 | 59.7 |
| GSM8k | 61.4 | 56.8 | 74.4 |

**视觉语言基准**（Table 7）：

| 模型 | 参数 | COCO CIDEr | Flickr30k | VQAv2 |
|------|------|------------|-----------|-------|
| Flamingo-80B | 80B | 113.8 (32-shot) | 75.1 (4-shot) | 67.6 (32-shot) |
| IDEFICS-80B | 80B | 116.6 (32-shot) | 73.7 (4-shot) | 65.9 (32-shot) |
| **Chameleon-34B** | 34B | **120.2** (2-shot) | 74.7 (2-shot) | 66.0 (2-shot) |
| **Chameleon-MultiTask** | 34B | 139.1 (2-shot) | 76.2 (2-shot) | **69.6** |

**混合模态人评**：在1,048个开放式prompt上，Chameleon-34B vs Gemini-Pro胜率**60.4%**，vs GPT-4V胜率**51.6%**。

##### 7. 推理管线

Chameleon推理面临独特的模态切换挑战：每步需检查生成的token属于哪个模态，图像生成时需mask文本token并固定生成1024个图像token。基于PyTorch + xformers构建独立推理管线。

```python
# 混合模态推理伪代码
def generate(prompt_tokens, max_len):
    tokens = prompt_tokens
    for step in range(max_len):
        logits = model(tokens)
        next_token = sample(logits)
        if is_image_start_token(next_token):
            # 图像模式：固定生成1024个图像token
            for i in range(1024):
                logits = model(tokens)
                logits = mask_non_image_tokens(logits)
                tokens.append(sample(logits))
            yield vqvae_decode(tokens[-1024:])  # 解码为像素图像
        else:
            tokens.append(next_token)
            yield decode_text(next_token)
```

#### 🧪 练习题

```yaml
question: "Chameleon 在多模态训练中引入 QK-Norm 的主要目的是什么？"
options:
  - "加速 Transformer 的注意力计算效率"
  - "约束 Query 和 Key 向量的 norm 增长，防止多模态 softmax 竞争导致训练发散"
  - "替代 RMSNorm 以减少归一化层的参数量"
  - "增强图像 token 在注意力中的权重，提升视觉理解能力"
answer: 1
explain: "多模态共享 softmax 时，不同模态因熵差异会通过增大 norm 竞争注意力权重，最终超出 bf16 范围导致发散。QK-Norm 对 Q、K 施加 LayerNorm，直接约束 softmax 输入的 norm，从根本上阻止这种竞争。"
```