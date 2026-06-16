### LLaMA：开放高效基础语言模型
```yaml
id: llama
name: LLaMA
full_name: 开放高效基础语言模型 (LLaMA)
year: "2023.02"
org: Meta AI
paper_url: https://arxiv.org/abs/2302.13971
category: open_foundation
parent: chinchilla
motivation: 公开数据训练高效小模型
```

#### 📝 一句话总结
LLaMA 提出了一组 7B 到 65B 的高效基础语言模型，用纯公开数据和更多训练 token 证明“小模型长训练”可以在推理成本更低的前提下达到或超过更大闭源模型的效果。

#### 🎯 核心要点
- 模型族覆盖 7B、13B、33B、65B；7B/13B 训练 1.0T token，33B/65B 训练 1.4T token，全局 batch 为 4M token。
- 训练语料全部来自公开可获取数据：CommonCrawl、C4、GitHub、Wikipedia、Books、ArXiv、StackExchange。
- 采用 decoder-only Transformer，并集成 RMSNorm 预归一化、SwiGLU 前馈激活、RoPE 旋转位置编码。
- 使用 SentencePiece BPE tokenizer，数字按单个 digit 切分，未知 UTF-8 字符 fallback 到 byte。
- 优化器为 AdamW，使用 cosine learning-rate schedule、2000 warmup steps、0.1 weight decay、1.0 gradient clipping。
- 工程侧使用高效 causal attention、activation checkpointing、model/sequence parallelism 和通信计算重叠来提升训练吞吐。
- 核心设计目标不是“最大参数量”，而是在给定推理预算下获得最佳性能；LLaMA-13B 在多数 benchmark 上超过 GPT-3 175B，65B 接近 Chinchilla-70B 与 PaLM-540B。

#### 🔬 深入细节
![LLaMA 训练损失曲线](https://ar5iv.labs.arxiv.org/html/2302.13971/assets/x1.png)
*图：LLaMA 7B、13B、33B、65B 随训练 token 增加的 loss 曲线；33B/65B 训练到 1.4T token，小模型训练到 1.0T token。*

```python
# LLaMA 预训练核心流程（按论文方法整理）
public_sources = ["CommonCrawl", "C4", "GitHub", "Wikipedia", "Books", "ArXiv", "StackExchange"]
model = DecoderOnlyTransformer(norm="RMSNorm", ffn="SwiGLU", position="RoPE")
optimizer = AdamW(beta1=0.9, beta2=0.95, weight_decay=0.1)
scheduler = CosineSchedule(warmup_steps=2000, final_lr_ratio=0.1)

for batch in stream_tokens(public_sources, batch_tokens=4_000_000):
    x = sentencepiece_bpe(batch, split_digits=True, byte_fallback=True)
    logits = model(x[:, :-1])
    loss = cross_entropy(logits, x[:, 1:])
    loss.backward()
    clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()
    scheduler.step()
```

LLaMA 的问题设定来自 Chinchilla scaling law 之后的一个实际矛盾：如果只按训练 compute 最优来选模型，模型可能仍然太大，线上推理成本很高；而服务一个基础模型时，推理预算往往比一次性训练预算更关键。因此论文把目标改成“在多个推理预算点上获得尽可能强的模型”，选择训练较小的 decoder-only Transformer，但让它们看远多于传统设置的 token。论文中特别指出，虽然 Chinchilla 建议 10B 模型约配 200B token，但他们观察到 7B 模型在超过 1T token 后仍持续变好，这就是 LLaMA 选择长训练的直接依据。

核心训练目标仍是标准自回归语言建模：给定 token 序列 \(x_1,\ldots,x_T\)，模型最大化下一个 token 的条件概率，等价于最小化负对数似然：

$$
\mathcal{L}_{\text{LM}}(\theta)=-\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t})
$$

这个目标看似普通，但 LLaMA 的关键在于数据和预算组合。预训练数据中 CommonCrawl 占 67%，C4 占 15%，GitHub、Wikipedia、Books 各占 4.5%，ArXiv 占 2.5%，StackExchange 占 2%。这些语料的共同约束是公开可获取、可支持研究发布，而不是依赖“Books 2TB”或社交媒体对话这类不可复现数据源。数据侧还进行了去重、语言识别、质量过滤、许可证过滤等处理，使得开放模型能在透明数据来源下逼近闭源模型能力。

架构上，LLaMA 没有提出全新的 Transformer 结构，而是把当时被证明有效的组件组合成稳定高效的 decoder-only 模型。预归一化把每个子层输入先做 RMSNorm：

$$
\operatorname{RMSNorm}(x)=\frac{x}{\sqrt{\frac{1}{d}\sum_{i=1}^{d}x_i^2+\epsilon}}\odot g
$$

这样做的直觉是让 attention 和 FFN 子层看到尺度更稳定的输入，降低大规模训练时梯度爆炸或深层不稳定的风险。前馈层用 SwiGLU 替代 ReLU，常见写法为：

$$
\operatorname{FFN}(x)=\left(\operatorname{Swish}(xW_1)\odot xW_3\right)W_2
$$

SwiGLU 通过门控分支控制信息流，比普通 ReLU FFN 更有表达能力；论文还把隐藏维度设为 \(\frac{2}{3}\cdot4d\)，在性能和计算量之间折中。

位置编码使用 RoPE，而不是绝对位置 embedding。RoPE 的做法是在每层 attention 的 query/key 上施加与位置相关的旋转，使相对位置信息自然进入点积注意力：

$$
q_m^\top k_n \rightarrow (R_m q)^\top(R_n k)
$$

其中 \(R_m\) 和 \(R_n\) 是由 token 位置决定的旋转矩阵。直觉上，RoPE 让注意力分数依赖相对距离 \(m-n\)，比固定绝对位置表更适合长序列泛化，也避免为每个位置学习单独参数。

工程优化也是 LLaMA 能训练 65B 模型的关键。论文使用 xFormers 风格的 memory-efficient causal attention，不存完整 attention matrix，也不计算 causal mask 会屏蔽掉的 query-key 分数；再通过 activation checkpointing 只保留线性层输出等昂贵激活，减少反向传播显存压力。模型并行和序列并行负责把参数、激活和序列维度拆到多卡上，通信计算重叠则尽量隐藏 all-reduce 的开销。最终 65B 模型在 2048 张 80GB A100 上约可达到 380 tokens/sec/GPU，1.4T token 训练约 21 天。

与 GPT-3、PaLM、Chinchilla 等闭源或半闭源系统相比，LLaMA 的创新不是某个单点公式，而是一个可复现的训练配方：公开数据、长 token 训练、高效 Transformer 组件、以及面向推理预算的模型尺寸选择。它直接影响了后续开源 LLM 生态，因为 13B 级模型可在单卡或少量 GPU 上运行，却能在常识推理、问答、阅读理解、代码等任务上接近或超过更大模型。

#### 🧪 练习题
```yaml
question: "LLaMA 相比单纯扩大参数量的路线，最核心的效率思想是什么？"
options:
  - "用 encoder-decoder 架构替代 decoder-only 架构"
  - "在推理预算约束下，用较小模型训练更多公开 token"
  - "主要依赖人工标注指令数据提升能力"
  - "用检索系统替代参数化语言模型"
answer: 1
explain: "LLaMA 的核心是让较小模型看更多 token，从而在服务成本更低的情况下达到强性能；它仍是 decoder-only 自回归 Transformer。"
```
