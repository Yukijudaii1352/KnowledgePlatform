### 自监督语音表征学习 (wav2vec 2.0)

```yaml
id: wav2vec2
name: wav2vec 2.0
full_name: 自监督语音表征学习 (wav2vec 2.0)
year: '2020'
org: Facebook AI
paper_url: https://arxiv.org/abs/2006.11477
category: ssl_representation
parent: —
motivation: 对比学习+掩码预测预训练
```

#### 📝 一句话总结

wav2vec 2.0 提出了在原始语音上进行自监督预训练的框架：先用卷积编码器得到连续 latent，再在 latent 空间掩码，用 Transformer 上下文表示去对比识别被掩码位置的量化语音单元，从而显著降低 ASR 对人工转写数据的依赖。

#### 🎯 核心要点

- **端到端自监督语音预训练**：直接从原始波形学习，预训练后用 CTC 在少量标注语音上微调
- **连续输入、离散目标**：Transformer 接收连续 latent 表示，训练目标是同一 latent 经 Gumbel-Softmax 产品量化后的离散向量
- **掩码 latent 预测**：在卷积特征序列上随机遮盖连续片段，而不是遮盖原始波形或 filterbank 特征
- **对比学习目标**：对每个被掩码时间步，从真实量化目标和同 utterance 采样的负例中识别正确目标
- **码本多样性损失**：通过最大化码本使用熵，避免少数 codeword 被过度使用
- **低资源 ASR 效果突出**：在 53k 小时无标注 LibriVox 预训练后，仅用 10 分钟标注数据可达 LibriSpeech test-clean/test-other 4.8/8.2 WER
- **两阶段训练范式**：无标注语音上预训练表征，有标注语音上冻结卷积编码器并用 CTC 微调识别头

#### 🔬 深入细节

##### 框架总览

![wav2vec 2.0 框架图](https://ar5iv.labs.arxiv.org/html/2006.11477/assets/x1.png)
*图：wav2vec 2.0 同时学习上下文语音表示和离散语音单元；掩码后的 latent 进入 Transformer，未掩码的 latent 经量化器形成对比学习目标。*

```python
# wav2vec 2.0 预训练与微调伪代码
def wav2vec2_pretrain(raw_audio):
    # 1. 原始波形 -> 卷积特征，约 49 Hz，每帧步长约 20 ms
    z = conv_feature_encoder(raw_audio)          # [T, d]

    # 2. 生成 mask span，只遮盖 Transformer 输入，不遮盖量化目标
    mask = sample_span_mask(T=len(z), p=0.065, span_len=10)
    z_masked = z.clone()
    z_masked[mask] = learned_mask_embedding

    # 3. 上下文网络建模完整序列依赖
    c = transformer_context_network(z_masked)    # [T, d]

    # 4. 同一批 latent 经产品量化，作为被预测目标
    q = gumbel_product_quantizer(z)              # [T, d_q]

    # 5. 对每个 masked timestep 做对比分类
    loss_m = 0.0
    for t in masked_indices(mask):
        positives = [q[t]]
        negatives = sample_negatives(q, t, K=100, same_utterance=True)
        candidates = positives + negatives
        logits = [cosine(c[t], cand) / kappa for cand in candidates]
        loss_m += cross_entropy(logits, target_index=0)

    loss_d = codebook_diversity_loss(quantizer_probs)
    return loss_m + alpha * loss_d

def wav2vec2_finetune(raw_audio, transcript):
    z = conv_feature_encoder(raw_audio)
    c = transformer_context_network(z)
    logits = linear_ctc_head(c)
    return ctc_loss(logits, transcript)
```

##### 1. 为什么在 latent 空间做掩码

wav2vec 2.0 的核心动机是解决语音标注昂贵的问题：ASR 需要大量转写文本，而无标注语音远多于标注语音。早期自监督语音方法已经证明“预测未来”或“预测离散语音单元”有效，但常见做法要么先离线学习量化器再训练上下文模型，要么把重建 filterbank 特征作为目标，容易把任务变成低层声学复原，而不是学习对识别有用的抽象结构。

因此 wav2vec 2.0 把学习过程拆成两个角色但端到端联合训练：卷积编码器 \(f: \mathcal{X}\mapsto\mathcal{Z}\) 从原始波形 \(\mathcal{X}\) 得到 latent 序列 \(\mathbf{z}_1,\dots,\mathbf{z}_T\)，Transformer \(g:\mathcal{Z}\mapsto\mathcal{C}\) 在部分 latent 被替换成 mask embedding 的情况下输出上下文表示 \(\mathbf{c}_t\)。关键是 **Transformer 输入保持连续**，这样不丢失细粒度声学信息；而 **训练目标使用离散量化表示**，这样避免模型只匹配说话人、信道、背景等过细节特征。

论文的卷积特征编码器包含 7 个 temporal convolution block，通道数为 512，stride 为 \((5,2,2,2,2,2,2)\)，kernel width 为 \((10,3,3,3,3,2,2)\)。这会把 16 kHz 波形下采样到约 49 Hz，也就是相邻 latent 约 20 ms；每个 latent 的感受野约 25 ms。预训练时以概率 \(p=0.065\) 采样 mask span 起点，每段连续遮盖 \(M=10\) 个时间步，重叠后约 49% 的时间步被遮盖，平均遮盖片段约 299 ms。

##### 2. 产品量化与 Gumbel-Softmax

量化模块把卷积输出 \(\mathbf{z}\) 转换为离散目标 \(\mathbf{q}\)。它使用产品量化：有 \(G\) 个 codebook，每个 codebook 有 \(V\) 个 entry，从每个 codebook 中选一个向量，拼接后再线性投影到目标维度。论文主要配置为 \(G=2, V=320\)，理论组合数为 \(320^2=102{,}400\) 个离散语音单元。

Gumbel-Softmax 让离散选择可微。对第 \(g\) 个 codebook 的第 \(v\) 个 entry，选择概率为：

$$
p_{g,v} =
\frac{\exp((l_{g,v}+n_v)/\tau)}
{\sum_{k=1}^{V}\exp((l_{g,k}+n_k)/\tau)}
$$

其中 \(l_{g,v}\) 是编码器输出映射得到的 logit，\(n_v=-\log(-\log u)\) 是 Gumbel 噪声，\(u\sim\mathcal{U}(0,1)\)，\(\tau\) 是温度。前向传播用 hard argmax 选 codeword，反向传播用 soft 概率的梯度，这是 straight-through estimator 的典型用法。

> 💡 关键：wav2vec 2.0 不把量化后的 \(\mathbf{q}\) 送进 Transformer，而是只把 \(\mathbf{q}\) 作为目标。论文消融显示，“连续输入 + 量化目标”优于“量化输入 + 量化目标”和“连续输入 + 连续目标”。

##### 3. 对比学习目标如何工作

对每个被掩码时间步 \(t\)，Transformer 只能通过周围上下文产生 \(\mathbf{c}_t\)。模型要从候选集合 \(\mathbf{Q}_t\) 中找出真实量化目标 \(\mathbf{q}_t\)，候选集合包含 1 个正例和 \(K=100\) 个从同一 utterance 其他掩码位置采样的负例。对比损失是：

$$
\mathcal{L}_{m}
= -\log
\frac{\exp(\operatorname{sim}(\mathbf{c}_t,\mathbf{q}_t)/\kappa)}
{\sum_{\tilde{\mathbf{q}}\sim\mathbf{Q}_t}
\exp(\operatorname{sim}(\mathbf{c}_t,\tilde{\mathbf{q}})/\kappa)}
$$

其中：

$$
\operatorname{sim}(\mathbf{a},\mathbf{b})
= \frac{\mathbf{a}^{T}\mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}
$$

\(\kappa=0.1\) 是 contrastive temperature。这个目标比直接重建连续特征更难，因为模型必须利用音素、词形、局部上下文和长程依赖来排除负例；同时目标又不是人工标签，所以能在无转写语音上大规模训练。

##### 4. 多样性损失防止码本坍缩

如果没有额外约束，模型可能只使用少数 codeword，使对比目标退化。wav2vec 2.0 加入 diversity loss，鼓励每个 codebook 的 entry 被均匀使用。整体预训练损失为：

$$
\mathcal{L} = \mathcal{L}_m + \alpha \mathcal{L}_d
$$

论文中 \(\alpha=0.1\)。对 \(G\) 个 codebook、每个 \(V\) 个 entry，若 \(\bar{p}_{g,v}\) 表示 batch 内第 \(g\) 个 codebook 第 \(v\) 个 entry 的平均选择概率，则：

$$
\mathcal{L}_d
= \frac{1}{GV}\sum_{g=1}^{G}\sum_{v=1}^{V}
\bar{p}_{g,v}\log\bar{p}_{g,v}
$$

这是负熵形式；最小化它等价于最大化平均分布的熵，使 codebook 覆盖更充分。直觉上，\(\mathcal{L}_m\) 让每个时间步“可区分”，\(\mathcal{L}_d\) 让整个离散空间“别塌缩”。

##### 5. 微调阶段与传统 ASR 的连接

预训练后，wav2vec 2.0 丢弃量化训练头，在 Transformer 输出上接一个随机初始化线性层，用 CTC 进行 ASR 微调。LibriSpeech 设置中输出 vocabulary 是字符和 word boundary，微调时卷积特征编码器保持冻结，先只训练输出分类器，再更新 Transformer。论文还使用类似 SpecAugment 的时间和通道遮盖来缓解少量标注下的过拟合。

这个范式与传统监督 ASR 的区别在于：监督 ASR 从一开始就用转写文本训练声学到字符/子词的映射；wav2vec 2.0 先用无标注音频学习“什么语音片段在上下文中合理”，再用少量文本标注把表征对齐到字词空间。因此它在低资源设置尤其有效。论文报告在 53.2k 小时 LibriVox 无标注数据上预训练 Large 模型，只用 10 分钟标注数据微调即可达到 4.8/8.2 WER；用完整 960 小时标注数据时达到 1.8/3.3 WER。

##### 6. 与 vq-wav2vec / DiscreteBERT 的关键差异

vq-wav2vec 与 DiscreteBERT 更像“两步流水线”：先学离散单元，再训练上下文模型。wav2vec 2.0 把特征编码、量化和上下文建模放入同一个预训练目标中，量化器会随 ASR 有用的表示一起更新。同时，它把连续 latent 作为上下文模型输入，而不是把离散 token 当输入，这保留了更多声学细节。论文的量化消融中，“连续输入、量化目标”平均 WER 为 7.97，而“量化输入、量化目标”为 12.18，说明信息在输入端过早离散化会明显伤害表示学习。

#### 🧪 练习题

```yaml
question: "wav2vec 2.0 为什么采用“连续 latent 作为 Transformer 输入、量化 latent 作为训练目标”的设计？"
options:
  - "为了让模型完全避免使用卷积编码器"
  - "为了保留输入端细粒度声学信息，同时让预测目标更抽象、更适合对比学习"
  - "为了把 CTC 损失提前用于无标注预训练"
  - "为了让负例必须来自不同语音样本"
answer: 1
explain: "连续输入避免过早丢失声学信息，量化目标减少对说话人和信道等低层细节的直接重建，使模型更偏向学习对 ASR 有用的上下文语音结构。"
```
