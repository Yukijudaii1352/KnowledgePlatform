### LlamaGen — 自回归模型超越扩散：基于 Llama 的可扩展图像生成

```yaml
id: llamagen
name: LlamaGen
full_name: "Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation"
year: 2024
org: "Peking University / ByteDance"
paper_url: "https://arxiv.org/abs/2406.06525"
category: aigc_base
parent: "—"
motivation: "验证原生自回归模型（Llama架构）在图像生成上的可扩展性"
```

#### 📝 一句话总结

LlamaGen 证明了**不做任何视觉特化修改**的原生 Llama 架构（next-token prediction）即可实现高质量图像生成：通过改进的图像 tokenizer（低维码本 + 大码本 + \(\ell_2\)-归一化）和标准 Llama Transformer（RMSNorm / SwiGLU / 2D-RoPE），在 ImageNet 256×256 类条件生成上以 FID 2.18 超越 DiT-XL/2（FID 2.27），并可无缝复用 LLM 生态的 vLLM 推理加速（326%–414% 提速）。

#### 🎯 核心要点

- **图像 Tokenizer 改进**：基于 VQGAN 编码器-解码器架构，引入三项关键设计——码本向量 \(\ell_2\)-归一化、低维码本嵌入（8-dim vs 传统 256-dim）、大码本容量（16384 codes），将 rFID 从 8.30 降至 2.19（ds16）/ 0.94（ds16@384），码本利用率达 97%
- **原生 Llama 架构**：直接复用 Llama 的 RMSNorm 预归一化、SwiGLU 激活、2D Rotary Position Embedding，**不使用 AdaLN** 等视觉特化模块，模型规模从 111M 到 3.1B
- **类条件生成**：类别嵌入作为 prefilling token，next-token prediction 生成图像 token 序列；LlamaGen-3B 在 ImageNet 256×256 上 FID=2.18，超越 DiT-XL/2（FID=2.27）和 LDM-4（FID=3.60）
- **文本条件生成**：使用 FLAN-T5 XL 编码文本 + MLP 投影为 prefilling embedding，两阶段训练（50M LAION-COCO 256² → 10M 高质量内部数据 512²）
- **Classifier-Free Guidance（CFG）**：训练时随机丢弃条件，推理时 \(\ell_g = \ell_u + s(\ell_c - \ell_u)\) 融合无条件/有条件 logits
- **LLM 推理加速直接复用**：vLLM（PagedAttention + KV-Cache）对 111M–1.4B 模型实现 326%–414% 加速
- **Scaling Law 验证**：模型从 B→3B 持续降低 FID，但受限于 ImageNet 仅 1M 图像，3B 后边际收益递减

#### 🔬 深入细节

##### 整体框架

![LlamaGen 整体框架](https://ar5iv.labs.arxiv.org/html/2406.06525/assets/x1.png)
*图 1：LlamaGen 整体流程——图像经 VQGAN tokenizer 离散化为 token 序列，由 Llama Transformer 以 next-token prediction 方式自回归生成，最后由 tokenizer decoder 重建图像。*

LlamaGen 的核心思想极为简洁：**将图像视为离散 token 序列，直接套用 LLM 的 next-token prediction 范式**。整个系统由两个组件构成：

1. **Image Tokenizer**：将 \(H \times W\) 的图像编码为 \(\frac{H}{f} \times \frac{W}{f}\) 的离散 token 网格（\(f\) 为下采样率），然后按光栅扫描顺序展平为一维序列。
2. **Autoregressive Transformer**：标准 Llama 架构，以条件嵌入（类别 / 文本）作为 prefix token，逐个预测后续图像 token。

##### Image Tokenizer 的关键改进

论文对传统 VQGAN tokenizer 做了三项针对性改进，显著提升了重建质量和码本利用率：

**（1）码本向量 \(\ell_2\)-归一化**：对编码器输出 \(z_e\) 和码本向量 \(e_k\) 均做 \(\ell_2\)-归一化后再进行最近邻查找。这使得量化过程等价于在单位超球面上的余弦相似度匹配，避免了码本坍塌（codebook collapse）问题。

**（2）低维码本嵌入**：将码本向量维度从传统的 256 降至 8。实验表明（Table 2a），维度从 256→32→8 时，rFID 从 3.04→2.34→2.19，PSNR 从 19.96→20.53→20.79，码本利用率从 20.9%→82.0%→97.0%。低维空间中最近邻搜索更高效，码本向量分布更均匀。

**（3）大码本容量**：将码本大小从 1024 扩大到 16384。更大的码本提供更精细的量化粒度，rFID 从 3.02（4096）降至 2.19（16384）。

Tokenizer 的训练损失为：

$$\mathcal{L}_{\text{AE}} = \ell_2(x, \hat{x}) + \mathcal{L}_{\text{P}}(x, \hat{x}) + \lambda_{\text{G}} \mathcal{L}_{\text{G}}(\hat{x})$$

其中 \(\ell_2\) 为像素重建损失，\(\mathcal{L}_{\text{P}}\) 为 LPIPS 感知损失，\(\mathcal{L}_{\text{G}}\) 为 PatchGAN 对抗损失。

> 💡 **关键洞察**：离散 tokenizer 的重建质量（rFID 0.59 @ds8）已可媲美连续 VAE（SD-VAE rFID 0.74），说明**离散表示不再是自回归图像生成的瓶颈**。

##### Llama 架构与条件注入

```python
# LlamaGen 自回归生成伪代码
class LlamaGen(nn.Module):
    def __init__(self, vocab_size=16384, dim=1280, n_layers=36, n_heads=20):
        # 标准 Llama 架构：RMSNorm + SwiGLU + 2D-RoPE
        self.tok_embed = nn.Embedding(vocab_size, dim)
        self.layers = [LlamaBlock(dim, n_heads) for _ in range(n_layers)]
        self.norm = RMSNorm(dim)
        self.head = nn.Linear(dim, vocab_size)  # next-token prediction head

    def generate(self, condition_embed, max_len=576):
        """
        condition_embed: 类别嵌入 或 FLAN-T5 文本特征经 MLP 投影
        """
        tokens = [condition_embed]  # prefilling token
        for i in range(max_len):
            x = self.forward(tokens)          # Transformer forward
            logits = self.head(x[:, -1])      # 取最后位置的 logits
            # Classifier-Free Guidance
            logits = logits_uncond + cfg_scale * (logits_cond - logits_uncond)
            next_token = sample(logits, top_k, top_p, temperature)
            tokens.append(next_token)
        return tokens[1:]  # 去掉条件 token
```

**模型配置**（Table 1）：

| 模型 | 参数量 | 层数 | 隐藏维度 | 注意力头数 |
|------|--------|------|----------|-----------|
| LlamaGen-B | 111M | 12 | 768 | 12 |
| LlamaGen-L | 343M | 24 | 1024 | 16 |
| LlamaGen-XL | 775M | 36 | 1280 | 20 |
| LlamaGen-XXL | 1.4B | 48 | 1536 | 24 |
| LlamaGen-3B | 3.1B | 24 | 3200 | 32 |

论文刻意**不使用 AdaLN**（DiT 中将条件信息注入到 LayerNorm 的 scale/shift 参数中），而是将条件嵌入直接作为序列前缀。这一设计使模型结构与 LLM 完全一致，可无缝复用 LLM 的训练和推理基础设施。

> ⚠️ **注意**：2D-RoPE 是唯一的"视觉适配"——将 1D 旋转位置编码扩展为 2D，使模型感知图像 token 的空间位置关系。但这一修改不改变模型架构本身。

##### Classifier-Free Guidance 在 AR 模型中的应用

CFG 最初为扩散模型设计，LlamaGen 将其适配到自回归框架：训练时以 10% 概率将条件嵌入替换为空嵌入（null embedding），推理时对每个 token 的 logit 进行引导：

$$\ell_g = \ell_u + s \cdot (\ell_c - \ell_u)$$

其中 \(\ell_c\) 为有条件 logit，\(\ell_u\) 为无条件 logit，\(s\) 为引导强度。实验表明 CFG 对 AR 模型同样有效：LlamaGen-L 在 cfg=2.0 时 FID 从约 15（无 CFG）降至 3.07。

##### Scaling 行为与 SOTA 对比

![Scaling Law](https://ar5iv.labs.arxiv.org/html/2406.06525/assets/figure/fid_scaling_law_cfg.png)
*图 2(b)：使用 CFG 时，模型从 B→3B 的 FID 随训练 epoch 持续下降，展现出良好的 scaling 行为。*

![采样配置效果](https://ar5iv.labs.arxiv.org/html/2406.06525/assets/figure/effect_cfg.png)
*图 3(a)：CFG 强度对 FID 和 IS 的影响——最优 FID 在 cfg≈2.0 处取得。*

**ImageNet 256×256 类条件生成 SOTA 对比**（Table 6）：

| 类型 | 模型 | 参数量 | FID↓ | IS↑ |
|------|------|--------|------|-----|
| GAN | StyleGAN-XL | 166M | 2.30 | 265.1 |
| Diffusion | DiT-XL/2 | 675M | 2.27 | 278.2 |
| Diffusion | LDM-4 | 400M | 3.60 | 247.7 |
| AR | ViT-VQGAN-re | 1.7B | 3.04 | 227.4 |
| **AR** | **LlamaGen-3B** | **3.1B** | **2.18** | **263.3** |

LlamaGen-3B 以 FID 2.18 超越了所有对比方法（包括 DiT-XL/2 的 2.27），且无需 rejection sampling。这是首次证明**原生自回归模型可以在图像生成质量上超越主流扩散模型**。

##### 文本条件生成与推理加速

**文本条件生成**采用两阶段训练：Stage I 在 50M LAION-COCO（256²）上学习文本-图像对齐；Stage II 在 10M 高质量内部数据（512²）上提升视觉美感。文本编码使用 FLAN-T5 XL，通过 MLP 投影为 prefilling embedding。

![文本条件生成可视化](https://ar5iv.labs.arxiv.org/html/2406.06525/assets/x4.png)
*图 4：两阶段训练效果对比——Stage I 学习文本对齐，Stage II 显著提升视觉美感质量。*

**推理加速**：由于架构与 Llama 完全一致，可直接使用 vLLM 框架（PagedAttention + continuous batching），在 111M–1.4B 模型上实现 326%–414% 加速，无需任何代码修改。这体现了"与 LLM 生态对齐"的核心优势。

> 💡 **核心启示**：LlamaGen 的意义不仅在于 FID 数字，更在于证明了图像生成可以完全复用 LLM 的模型架构、训练框架（PyTorch FSDP）和推理引擎（vLLM），为统一多模态生成奠定基础。

#### 🧪 练习题

```yaml
question: "LlamaGen 的图像 tokenizer 相比传统 VQGAN 的关键改进不包括以下哪项？"
options:
  - "对码本向量进行 ℓ2-归一化以避免码本坍塌"
  - "将码本嵌入维度从 256 降低到 8"
  - "使用 Adaptive Layer Normalization (AdaLN) 注入条件信息"
  - "将码本大小从 1024 扩大到 16384"
answer: 2
explain: "AdaLN 是 DiT 中的条件注入方式，LlamaGen 明确不使用 AdaLN 以保持与 LLM 架构一致。Tokenizer 的三项改进是 ℓ2-归一化、低维嵌入和大码本。"
```