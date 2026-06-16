### WavLM

```yaml
id: wavlm
name: WavLM
full_name: 语音语言模型 (WavLM)
year: '2022'
org: Microsoft
paper_url: https://ieeexplore.ieee.org/document/9814838/
category: ssl_representation
parent: hubert
motivation: 掩码语音去噪与预测框架
```

#### 📝 一句话总结

WavLM 在 HuBERT 的离线聚类伪标签预测框架上加入噪声/重叠语音模拟与门控相对位置偏置，使自监督语音模型不仅学习语音内容，还显式适配说话人识别、分离、增强和 diarization 等全栈语音任务。

#### 🎯 核心要点

- **掩码语音去噪与预测**：输入是带 mask 的噪声或重叠语音，目标仍是原始主说话人语音的离散伪标签
- **继承 HuBERT 离线聚类目标**：使用 MFCC 或 HuBERT 隐层表示的 k-means cluster id 作为 masked prediction target
- **噪声/重叠语音模拟算法**：在 batch 内随机抽取 secondary utterance 或 DNS noise，按随机能量比混入主语音的局部片段
- **门控相对位置偏置**：在 Transformer attention logits 中加入由当前 query 内容调节的 relative position bias
- **大规模多场景预训练数据**：Base+ 与 Large 使用约 94k 小时公开英文语音，包括 Libri-Light、GigaSpeech、VoxPopuli
- **全栈语音处理定位**：在 SUPERB、说话人验证、语音分离、说话人日志、ASR 等任务上验证通用表示能力

#### 🔬 深入细节

![WavLM 模型架构](https://ar5iv.labs.arxiv.org/html/2110.13900/assets/x1.png)
*图：WavLM 的卷积特征编码器、掩码输入、Transformer 编码器与离散伪标签预测结构。核心变化不在输出头，而在输入扰动、去噪目标和 Transformer 位置建模。*

##### 算法伪代码

```python
# WavLM 掩码语音去噪与预测预训练
def wavlm_pretrain(batch_utterances, dns_noises, teacher_clusterer, model):
    # 1. 用干净主语音生成 HuBERT 式离散伪标签
    clean_units = teacher_clusterer(batch_utterances)  # z_t in {1, ..., C}

    # 2. 随机把部分语音替换成噪声/重叠版本
    corrupted = []
    for u_pri in batch_utterances:
        if bernoulli(p_mix):
            if uniform(0, 1) > p_noise:
                u_sec = sample(batch_utterances)
                ratio_db = uniform(-5, 5)
            else:
                u_sec = sample(dns_noises)
                ratio_db = uniform(-5, 20)

            # 混合长度不超过 50%，保证主说话人仍可辨认
            span = sample_span(max_len=len(u_pri) // 2)
            scale = energy_scale(u_pri, u_sec, ratio_db)
            u_pri = mix_span(u_pri, u_sec, span, scale)
        corrupted.append(u_pri)

    # 3. 卷积特征提取 + 时间 mask
    features = conv_feature_encoder(corrupted)
    masked_features, mask_idx = apply_time_mask(features)

    # 4. Transformer 编码，attention 中使用 gated relative position bias
    hidden = model.transformer(masked_features)

    # 5. 只在 masked 区域预测干净主语音的伪标签
    loss = 0.0
    for t in mask_idx:
        loss += cross_entropy(model.unit_logits(hidden[t]), clean_units[t])
    return loss / len(mask_idx)
```

##### 动机：从“识别内容”扩展到“理解复杂声场”

HuBERT 已经证明了离线聚类伪标签加 masked prediction 对 ASR 很有效，但它的预训练输入大多是单人、相对干净的语音，模型主要被迫恢复被遮挡的音素/词内容。真实语音处理远不止 ASR：说话人验证需要保留 speaker identity，diarization 要处理“谁在什么时候说话”，分离和增强则要求模型能从噪声或重叠说话人中抓住主信号。WavLM 的关键判断是：如果预训练阶段从不见重叠和噪声，模型很难自然获得这些非 ASR 能力。

因此 WavLM 没有推翻 HuBERT 的目标，而是改变了输入和学习压力：伪标签仍来自原始主语音 \(\mathbf{u}\)，当前网络看到的却是其扰动版本 \(\mathbf{u}'\)。这等价于要求模型在噪声、背景声或第二说话人干扰下恢复主说话人的离散内容单元。相比单纯 masked speech prediction，这个目标把“内容建模”和“去噪/主说话人选择”绑定在一起。

##### 核心目标：对扰动输入预测干净伪标签

WavLM 沿用 HuBERT 的 codeword softmax。设第 \(L\) 层 Transformer 在时刻 \(t\) 的输出为 \(\mathbf{h}_t^L\)，第 \(c\) 个聚类中心嵌入为 \(\mathbf{e}_c\)，则预测分布为：

$$
p(c|\mathbf{h}_t^L)=
\frac{\exp(\mathrm{sim}(\mathbf{h}_t^L\mathbf{W}^P,\mathbf{e}_c)/\tau)}
{\sum_{c'=1}^{C}\exp(\mathrm{sim}(\mathbf{h}_t^L\mathbf{W}^P,\mathbf{e}_{c'})/\tau)}
$$

预训练损失只作用在 mask 位置集合 \(M\) 上：

$$
\mathcal{L}_{\text{mask}}=-\sum_{t\in M}\log p(z_t|\mathbf{h}_t^L)
$$

这里最重要的是 \(z_t\) 的来源：它来自干净主语音，而 \(\mathbf{h}_t^L\) 来自扰动后的输入。也就是说，模型不是学习“重建混合语音中最显眼的成分”，而是学习“在复杂声场中跟踪主语音并恢复其离散语音单元”。这解释了为什么 WavLM 对说话人相关任务、分离任务和日志任务提升明显。

##### 噪声/重叠语音模拟：让预训练任务具备声场难度

对每个被选中的主语音 \(\mathbf{u}^{\text{pri}}\)，WavLM 从当前 batch 或 DNS noise 集合中采样 secondary signal \(\mathbf{u}^{\text{sec}}\)，再随机采样混合长度 \(l\)、主语音起点 \(s^{\text{pri}}\)、副语音起点 \(s^{\text{sec}}\) 与能量比 \(r\)。论文将混合片段限制在原语音长度的 50% 以内，目的是让主说话人始终占优，避免“目标说话人是谁”变成不可辨别问题。

混合缩放因子按主/副信号能量计算：

$$
scl=\sqrt{\frac{E^{\text{pri}}}{10^{r/10}E^{\text{sec}}}}
$$

并将局部片段改写为：

$$
\mathbf{u}^{\text{pri}}[s^{\text{pri}}:s^{\text{pri}}+l]
\leftarrow
\mathbf{u}^{\text{pri}}[s^{\text{pri}}:s^{\text{pri}}+l]
+scl\cdot \mathbf{u}^{\text{sec}}[s^{\text{sec}}:s^{\text{sec}}+l]
$$

这个设计比普通 data augmentation 更强：增强不是为了让模型对噪声“不敏感”，而是让模型在训练目标中必须区分主语音、副说话人和背景噪声。也因此，WavLM 在 speech separation 和 diarization 中更像一个具备声源归因能力的通用前端。

##### 门控相对位置偏置：让位置关系依赖语音内容

WavLM 的另一个结构改动是 gated relative position bias。普通相对位置偏置只根据 \(i-j\) 决定两个帧之间的距离影响；但语音中同样的时间距离在静音、元音、辅音、重叠段里作用不同。WavLM 用 query 产生 update/reset gate，使偏置由当前内容调节：

$$
a_{ij}\propto \exp\left(\frac{\mathbf{q}_i\cdot\mathbf{k}_j}{\sqrt{d_k}}+r_{i-j}\right)
$$

$$
g_i^{\text{update}},g_i^{\text{reset}}
=\sigma(\mathbf{q}_i\cdot\mathbf{u}),\sigma(\mathbf{q}_i\cdot\mathbf{w})
$$

$$
\tilde{r}_{i-j}=w\,g_i^{\text{reset}}d_{i-j},\qquad
r_{i-j}=d_{i-j}+g_i^{\text{update}}\tilde{r}_{i-j}+(1-g_i^{\text{update}})d_{i-j}
$$

直观上，模型可以在“当前帧是静音”与“当前帧是有效语音”时采用不同的位置偏置，从而改善长序列语音中的局部/远程依赖建模。论文消融显示，这个结构改动尤其有利于 PR、ASR 等内容相关任务，而噪声/重叠建模则更直接改善说话人与复杂声场任务。

##### 训练流程与模型规模

WavLM 的卷积特征编码器由 7 个 temporal convolution block 组成，stride 为 \((5,2,2,2,2,2,2)\)，使每个输出约覆盖 25ms 音频并以 20ms 步长前进。Base 与 Base+ 使用 12 层 Transformer、768 hidden、8 heads，Large 使用 24 层 Transformer、1024 hidden、12 heads。Base+ 和 Large 在约 94k 小时混合公开数据上预训练，覆盖有声书、播客、YouTube、欧洲议会录音等多种声学场景。

与 wav2vec 2.0 的 contrastive learning 相比，WavLM 的输出空间是离散伪标签，不需要构造负样本；与 HuBERT 相比，它的输入分布更接近真实多说话人/噪声场景，并且位置建模更灵活。WavLM 的贡献不只是“把数据做大”，而是把自监督目标从单一内容恢复扩展成“复杂声场中的主语音恢复”。

> 💡 关键：WavLM 的目标标签来自干净主语音，输入来自混合/噪声语音。这一输入-目标不对称性，是它区别于普通 masked speech modeling 的核心。

#### 🧪 练习题

```yaml
question: "WavLM 中掩码语音去噪与预测的关键区别是什么？"
options:
  - "直接重建被 mask 的连续波形采样点"
  - "用噪声/重叠语音作为输入，但预测干净主语音的离散伪标签"
  - "只在无噪声 LibriSpeech 上训练更大的 Transformer"
  - "通过 CTC 损失直接预测文本转录"
answer: 1
explain: "WavLM 仍使用 HuBERT 式离散伪标签预测，但当前网络看到的是扰动后的输入，目标来自原始主语音，因此模型被迫学习去噪、主说话人跟踪和内容恢复。"
```
