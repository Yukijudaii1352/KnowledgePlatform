### WavSLM

```yaml
id: wavslm
name: WavSLM
full_name: "WavSLM — 基于 WavLM 蒸馏的单流语音语言模型"
year: "2026.03"
org: "Mila / Concordia / Université de Montréal / Cambridge"
paper_url: "https://arxiv.org/abs/2603.05299"
category: frontier_2026
parent: wavlm
motivation: "通过 WavLM 蒸馏实现单流离散语音建模，以极简架构和纯语音训练达到与大规模文本预训练 SLM 可比的性能"
```

#### 📝 一句话总结

WavSLM 将预训练 WavLM 的前 6 层蒸馏为可流式单码本语音编解码器（FocalCodec-Stream），并将其余 7–24 层改造为因果语言模型骨干，在仅使用语音数据、无任何文本预训练的条件下，以 305M 参数实现了与 7B+ 文本预训练语音语言模型可比的语义与声学建模性能。

#### 🎯 核心要点

- **单流离散表示**：提出 FocalCodec-Stream，从 WavLM 第 6 层中间表示出发，通过压缩器 + 单码本 RVQ + 解压缩器生成 50 Hz 单流离散 token，端到端延迟仅 80 ms
- **WavLM 权重复用**：WavLM 第 7–24 层直接作为因果 SLM 骨干，仅需添加线性 LM 头即可完成自回归建模，无需从头训练 Transformer
- **Next-Chunk Prediction**：以 \(C=4\) 个 token 为一个 chunk 进行自回归预测，chunk 内部并行、chunk 间因果，兼顾建模质量与推理速度
- **滑动窗口注意力**：默认窗口大小 512 token（约 10 秒语音），支持长序列高效推理
- **纯语音训练**：仅使用 Libri-Light ~60k 小时语音数据，不依赖任何文本 LLM 预训练或文本数据
- **三种变体**：WavSLM-2k（305M）、WavSLM-4k（307M）、WavSLM-65k（370M），码本大小分别为 2048/4096/65536
- **高效推理**：WavSLM-4k 在单张 H100 上实现 RTF=5.8×，比 LLaMA-Mimi 8B（RTF=1.1×）快约 5 倍

#### 🔬 深入细节

##### 架构总览

![WavSLM 架构图](https://arxiv.org/html/2603.05299v1/x1.png)
*图：WavSLM 整体框架。WavLM 前 6 层的中间表示经 FocalCodec-Stream 量化为单流离散 token，WavLM 第 7–24 层被改造为因果语言模型骨干进行 next-chunk prediction。*

WavSLM 的核心设计哲学是：**将一个预训练好的自监督语音模型（WavLM）一分为二，前半部分变成编解码器，后半部分变成语言模型**。这种设计避免了传统 SLM 中编解码器与语言模型各自独立训练再拼接的割裂问题，实现了从表示学习到语言建模的无缝过渡。

##### FocalCodec-Stream：可流式单码本语音编解码器

传统语音编解码器（如 EnCodec、SpeechTokenizer）通常使用多层 RVQ 产生多流 token，这给自回归建模带来了"展平顺序"或"多流交织"等复杂性。WavSLM 的关键洞察是：**WavLM 的中间层表示（第 6 层）天然平衡了语义与声学信息**，因此只需单个码本即可编码足够丰富的语音特征。

FocalCodec-Stream 的流水线如下：

```
原始波形 → WavLM 层 1-6 (非因果) → 压缩器 (因果卷积, 下采样) → RVQ (单码本) → 解压缩器 (因果卷积, 上采样) → WavLM 层 7-24 (教师) → 重建损失
```

具体来说：

1. **特征提取**：WavLM 前 6 层以 50 Hz 提取中间表示 \(\mathbf{h}_6 \in \mathbb{R}^{T \times D}\)
2. **压缩器**：因果卷积网络将 \(\mathbf{h}_6\) 下采样并映射到低维空间
3. **量化器**：单码本向量量化（VQ），码本大小 \(V \in \{2048, 4096, 65536\}\)，产生离散 token 序列 \(\mathbf{z} = (z_1, z_2, \ldots, z_T)\)
4. **解压缩器**：因果卷积网络将量化后的表示上采样回原始维度
5. **训练目标**：最小化重建表示与 WavLM 第 7–24 层教师表示之间的余弦距离

$$\mathcal{L}_{\text{codec}} = \sum_{l=7}^{24} \left(1 - \frac{\hat{\mathbf{h}}_l \cdot \mathbf{h}_l}{\|\hat{\mathbf{h}}_l\| \|\mathbf{h}_l\|}\right)$$

> 💡 **关键设计**：所有卷积均为因果卷积，确保编解码器可流式运行。在 50 Hz 帧率下，编码器引入的端到端延迟仅为 80 ms，满足实时交互需求。

> ⚠️ **为什么选第 6 层？** 作者通过消融实验发现，WavLM 的浅层（1-3 层）偏重声学细节但语义不足，深层（10+ 层）语义丰富但声学信息已被抽象化。第 6 层恰好处于语义-声学信息的"甜蜜点"，单码本即可同时编码两类信息。

##### 因果语言模型骨干

WavSLM 将 WavLM 的第 7–24 层（共 18 层 Transformer）直接改造为因果语言模型：

- **注意力掩码**：将原始双向注意力替换为因果掩码（下三角矩阵），使模型只能看到当前及之前的 token
- **滑动窗口**：默认窗口大小 \(W=512\) 个 token（约 10.24 秒语音），限制注意力范围以支持长序列
- **LM 头**：在最后一层之上添加线性投影层 \(\mathbf{W} \in \mathbb{R}^{D \times V}\)，将隐藏状态映射到码本词汇表上的概率分布

##### Next-Chunk Prediction 训练

WavSLM 采用 next-chunk prediction 而非逐 token 预测，每次预测 \(C=4\) 个连续 token：

$$\mathcal{L}_{\text{SLM}} = -\sum_{t=1}^{T/C} \sum_{j=1}^{C} \log p_\theta\left(z_{(t-1)C+j} \mid z_{<(t-1)C+j}\right)$$

```python
# WavSLM Next-Chunk Prediction 伪代码
def wavslm_forward(z_tokens, chunk_size=4, window_size=512):
    """
    z_tokens: 离散 token 序列 [B, T], 由 FocalCodec-Stream 编码
    """
    T = z_tokens.shape[1]
    
    # 1. Token embedding (码本嵌入)
    h = embedding(z_tokens)  # [B, T, D]
    
    # 2. 通过 WavLM 层 7-24 (因果注意力 + 滑动窗口)
    for layer in wavlm_layers[7:25]:
        # 因果掩码: 只看当前及之前的 token
        # 滑动窗口: 注意力范围限制在最近 window_size 个 token
        causal_mask = build_sliding_window_mask(T, window_size)
        h = layer(h, attention_mask=causal_mask)
    
    # 3. LM 头预测下一个 token
    logits = lm_head(h)  # [B, T, V]
    
    # 4. Next-chunk prediction loss
    # chunk 内部: 每个 token 可以看到同 chunk 内之前的 token
    # chunk 之间: 严格因果
    loss = cross_entropy(logits[:, :-1], z_tokens[:, 1:])
    
    return loss

# 推理时: 每次生成一个 chunk (4 个 token)
def wavslm_generate(prompt_tokens, num_chunks, temperature=0.8, top_k=30):
    generated = prompt_tokens
    for _ in range(num_chunks):
        for j in range(chunk_size):  # chunk 内逐 token 生成
            logits = wavslm_forward(generated)[:, -1]
            logits = top_k_filtering(logits / temperature, k=top_k)
            next_token = torch.multinomial(softmax(logits), 1)
            generated = torch.cat([generated, next_token], dim=1)
    return generated
```

> 💡 **为什么用 chunk 而非逐 token？** Chunk prediction 在推理时可以利用 chunk 内部的并行性加速生成。同时，chunk 大小 \(C=4\) 对应 80 ms 的语音片段，恰好与编解码器的延迟对齐，使整个系统的流式延迟保持一致。

##### 训练配置

| 配置项 | 值 |
|--------|-----|
| 训练数据 | Libri-Light ~60k 小时（纯语音） |
| 优化器 | AdamW, lr=1e-4, β=(0.9, 0.95) |
| 训练步数 | 500k steps |
| 批大小 | ~500k tokens/batch |
| 硬件 | 单张 NVIDIA H100 GPU |
| 注意力窗口 | 512 tokens（~10s） |
| Chunk 大小 | 4 tokens（80ms） |

##### 与传统方法的关键区别

| 维度 | 传统 SLM（如 LLaMA-Mimi） | WavSLM |
|------|---------------------------|--------|
| **编解码器** | 独立训练的多流 RVQ 编解码器 | WavLM 蒸馏的单流单码本编解码器 |
| **语言模型** | 从文本 LLM 初始化（7B+） | WavLM 层 7-24 直接改造（305M） |
| **训练数据** | 语音 + 大规模文本预训练 | 仅语音（~60k 小时） |
| **Token 流** | 多流（需要交织/展平策略） | 单流（直接自回归） |
| **推理速度** | RTF ~1.1×（8B 参数） | RTF ~5.8×（307M 参数） |

传统 SLM 的核心困难在于：语音的多流离散表示使得自回归建模变得复杂，需要设计专门的交织策略（如 delay pattern、interleaving）来处理多个码本流之间的依赖关系。WavSLM 通过将问题简化为单流建模，完全回避了这一难题，使得语音 LM 的训练和推理与文本 LM 一样简洁。

##### 实验结果

**主要基准测试结果（SALMon + ZeroSpeech）：**

| 模型 | 参数量 | 文本预训练 | Acoustic Consist. | Alignment | Spoken Content | **Avg** |
|------|--------|-----------|-------------------|-----------|---------------|---------|
| TWIST | 1.3B | ✓ | 64.2 | 50.0 | 54.6 | 56.3 |
| SpiRit LM (Expressive) | 7B | ✓ | 79.8 | 56.5 | 58.7 | 65.0 |
| Moshi | 7B | ✓ | 73.5 | 50.0 | 56.5 | 60.0 |
| LLaMA-Mimi 8B | 8B | ✓ | 75.3 | 53.0 | 61.5 | 63.3 |
| SmolTolk | 8B | ✓ | **84.5** | **59.5** | 61.1 | 68.4 |
| **WavSLM-4k** | **307M** | ✗ | 84.7 | 51.5 | 60.3 | **69.5** |

**语音生成评估：**

| 模型 | UTMOS ↑ | Speaker Sim ↑ | PPL ↓ | RTF ↑ |
|------|---------|---------------|-------|-------|
| LLaMA-Mimi 1.3B | 3.55 | 88.3 | 173 | 2.1 |
| LLaMA-Mimi 8B | 3.59 | 90.1 | **136** | 1.1 |
| WavSLM-2k | **3.71** | **92.0** | 176 | 5.8 |
| **WavSLM-4k** | 3.69 | 91.6 | 162 | **5.8** |

> 💡 **关键发现**：WavSLM-4k 以仅 307M 参数、无文本预训练的条件下，在 SALMon+ZeroSpeech 综合评分上达到 69.5，超越了所有 7B+ 文本预训练基线。在生成质量上，UTMOS 和说话人相似度均优于 LLaMA-Mimi 8B，且推理速度快 5 倍以上。

**窗口与 Chunk 大小消融（WavSLM-4k）：**

| Window | Chunk | Avg ↑ | UTMOS ↑ | Sim ↑ | PPL ↓ | RTF ↑ |
|--------|-------|-------|---------|-------|-------|-------|
| 512 | 4 | **69.5** | 3.69 | 91.6 | 162 | 5.8 |
| 1024 | 4 | **69.5** | 3.69 | 91.7 | 151 | 5.8 |
| 2048 | 4 | 69.1 | 3.70 | 91.7 | **148** | 5.8 |
| 512 | 8 | 68.6 | 2.92 | 90.0 | 174 | 10.9 |
| 512 | 16 | 65.9 | 1.97 | 86.5 | 181 | 16.4 |

增大窗口可略微提升语言建模指标（PPL 从 162 降至 148），但增大 chunk 会显著损害生成质量（UTMOS 从 3.69 降至 1.97），说明 chunk 大小应与编解码器的帧级粒度对齐。

#### 🧪 练习题

```yaml
question: "WavSLM 选择 WavLM 第 6 层作为编解码器与语言模型的分割点，主要原因是什么？"
options:
  - "第 6 层的计算量最小，有利于降低推理延迟"
  - "第 6 层处于语义与声学信息的平衡点，单码本即可编码两类信息"
  - "第 6 层之后的层数恰好是 18 层，与标准 GPT-2 架构一致"
  - "第 6 层的隐藏维度最适合向量量化操作"
answer: 1
explain: "WavLM 浅层偏重声学细节，深层偏重语义抽象。第 6 层恰好在两者之间取得平衡，使得单个码本就能同时保留足够的语义和声学信息，这是 WavSLM 单流设计成立的关键前提。"
```