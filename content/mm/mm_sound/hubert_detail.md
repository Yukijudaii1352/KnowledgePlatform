### 隐藏单元BERT (Hidden-Unit BERT)

```yaml
id: hubert
name: HuBERT
full_name: 隐藏单元BERT (Hidden-Unit BERT)
year: '2021'
org: Facebook AI
paper_url: https://arxiv.org/abs/2106.07447
category: ssl_representation
parent: wav2vec2
motivation: 离线聚类伪标签迭代训练
```

#### 📝 一句话总结

HuBERT 提出用离线 k-means 聚类产生帧级隐藏单元标签，再让 BERT 风格的语音模型只在被掩码区域预测这些伪标签，通过“聚类 → 掩码预测 → 再聚类”的迭代流程学习强语音表征。

#### 🎯 核心要点

- **隐藏单元预测**：用无监督聚类得到每帧离散 hidden unit，作为 BERT-like masked prediction 的目标
- **masked-only loss**：主要只在被遮盖帧上计算预测损失，避免模型仅复制低质量聚类标签
- **离线 teacher / 在线 student 解耦**：聚类标签离线生成，模型训练时不需要负例采样或在线量化器
- **迭代聚类细化**：第一轮用 MFCC 上的 100 类 k-means，后续用 HuBERT 中间层特征上的 500 类 k-means 生成更好目标
- **沿用 wav2vec 2.0 骨干**：7 层 CNN waveform encoder + Transformer/BERT encoder，Base/Large/X-Large 分别约 95M/317M/964M 参数
- **可扩展到 cluster ensemble**：可用多个 k-means 或 product k-means 目标做多任务式训练
- **ASR 表现优于或持平 wav2vec 2.0**：在 LibriSpeech/Libri-Light 多个标注规模下，HuBERT 匹配或超过 wav2vec 2.0，1B 模型在 test-other 上进一步降低 WER

#### 🔬 深入细节

##### 框架总览

![HuBERT 框架图](https://ar5iv.labs.arxiv.org/html/2106.07447/assets/figures/hubert_arch.png)
*图：HuBERT 用声学单元发现系统生成帧级隐藏单元标签，并让 masked speech encoder 预测被遮盖位置的 cluster assignment。*

```python
# HuBERT 迭代预训练伪代码
def train_hubert(unlabeled_audio):
    # Iteration 1: 用 MFCC 聚类生成初始 hidden units
    mfcc = extract_mfcc(unlabeled_audio, dim=39)       # 13 + delta + delta-delta
    z_iter1 = kmeans_predict(mfcc, num_clusters=100)

    hubert_base_it1 = masked_prediction_train(
        audio=unlabeled_audio,
        targets=z_iter1,
        mask_start_prob=0.08,
        mask_span=10,
        alpha=1.0,              # 只在 masked frames 上算损失
    )

    # Iteration 2: 用第一轮 HuBERT 中间层特征重新聚类
    h6 = extract_transformer_layer(hubert_base_it1, unlabeled_audio, layer=6)
    z_iter2 = minibatch_kmeans_predict(h6, num_clusters=500, sample_ratio=0.10)

    hubert_base_it2 = masked_prediction_train(
        audio=unlabeled_audio,
        targets=z_iter2,
        mask_start_prob=0.08,
        mask_span=10,
        alpha=1.0,
    )

    # Large / X-Large: 可用第二轮 Base 的第 9 层特征聚类标签继续训练
    h9 = extract_transformer_layer(hubert_base_it2, unlabeled_audio, layer=9)
    z_iter3 = minibatch_kmeans_predict(h9, num_clusters=500)
    return masked_prediction_train(audio=unlabeled_audio, targets=z_iter3)
```

##### 1. HuBERT 要解决什么问题

语音自监督学习不像 NLP 那样天然有离散 token。文本 BERT 可以直接遮盖 word piece 并预测词表 id；语音是连续信号，一个 utterance 内有多个声音单元，没有预先词表，也没有明确音素边界。wav2vec 2.0 用在线量化器和对比学习绕过这个问题，但需要负例采样、Gumbel-Softmax 温度调度和码本多样性损失。

HuBERT 的思路更直接：先用一个简单声学单元发现系统给每帧分配离散标签，即使这些标签很噪，只要它们在相似声音上保持一致，就足以驱动 masked prediction。模型看到的是被遮盖的连续语音特征，预测的是遮盖位置的 cluster id。这样训练目标变成普通分类交叉熵，不需要对比负例，也不需要在线学习量化码本。

> 💡 关键：HuBERT 强调 target 的“consistency”比绝对正确性更重要。粗糙的 k-means 标签不一定等价于音素，但只要相似片段稳定落入相同 cluster，模型就能通过上下文学习语音结构。

##### 2. 隐藏单元与 masked prediction 损失

设一段语音帧序列为：

$$
X=[x_1,\dots,x_T]
$$

离线聚类器 \(h\) 产生隐藏单元序列：

$$
h(X)=Z=[z_1,\dots,z_T],\quad z_t\in[C]
$$

设 \(M\subset[T]\) 是被掩码时间步集合，\(\tilde{X}=r(X,M)\) 表示把 \(t\in M\) 的输入替换为 mask embedding 后的序列。HuBERT 模型 \(f\) 输出每个时间步上的 cluster 分布 \(p_f(\cdot\mid\tilde{X},t)\)。masked loss 为：

$$
L_m(f;X,M,Z)
= \sum_{t\in M}\log p_f(z_t\mid\tilde{X},t)
$$

unmasked loss \(L_u\) 对 \(t\notin M\) 求和，最终损失写作：

$$
L=\alpha L_m+(1-\alpha)L_u
$$

实际核心设置是 \(\alpha=1\)，也就是只在被遮盖帧上计算损失。若 \(\alpha=0\)，模型只需在可见帧上复现聚类器，训练会退化成模仿 noisy teacher；而 \(\alpha=1\) 强迫模型同时解决两个问题：把未遮盖输入编码成有用声学表示，并利用长程上下文推断缺失位置的 hidden unit。

##### 3. 模型结构：wav2vec 2.0 骨干，但目标更简单

HuBERT 继承 wav2vec 2.0 的基本骨干：7 层 512-channel CNN waveform encoder，stride 为 \([5,2,2,2,2,2,2]\)，kernel width 为 \([10,3,3,3,3,2,2]\)，在 16 kHz 音频上输出 20 ms 帧率的特征。随后用 Transformer/BERT encoder 处理被遮盖的特征序列。

论文给出三档模型：Base 为 12 层 Transformer、768 维、8 heads、约 95M 参数；Large 为 24 层、1024 维、16 heads、约 317M 参数；X-Large 为 48 层、1280 维、16 heads、约 964M 参数。BERT encoder 输出 \(o_t\) 后，与 cluster embedding 做 cosine-softmax 分类：

$$
p_f^{(k)}(c\mid\tilde{X},t)
=
\frac{
\exp(\operatorname{sim}(A^{(k)}o_t,e_c)/\tau)
}{
\sum_{c'=1}^{C}
\exp(\operatorname{sim}(A^{(k)}o_t,e_{c'})/\tau)
}
$$

其中 \(A^{(k)}\) 是投影矩阵，\(e_c\) 是第 \(c\) 个 codeword embedding，\(\tau=0.1\)。如果使用多个聚类器组成 ensemble，每个聚类器 \(k\) 可以有自己的投影头。

##### 4. 迭代聚类为什么有效

第一轮 HuBERT 使用非常朴素的 teacher：在 39 维 MFCC 特征上做 100 类 k-means。这个 teacher 的标签质量不高，但足以提供粗粒度声学分组。训练出第一轮模型后，HuBERT 的中间层已经比 MFCC 更接近音素结构，于是第二轮改为提取第一轮 Base 模型第 6 层 Transformer 特征，再做 500 类 k-means，生成更细、更一致的目标。

这种迭代可以概括为：

$$
X \xrightarrow{\text{MFCC+k-means}} Z^{(1)}
\xrightarrow{\text{masked prediction}} f^{(1)}
\xrightarrow{\text{middle-layer features+k-means}} Z^{(2)}
\xrightarrow{\text{masked prediction}} f^{(2)}
$$

Large 和 X-Large 训练时没有从 MFCC 重新开始，而是使用第二轮 Base HuBERT 第 9 层特征聚类出的标签，因此可以看作第三轮模型。论文分析显示，用 HuBERT 中间层特征聚类的 PNMI 明显高于 MFCC，并且第一轮模型第 6 层附近的聚类质量最好；这也解释了为什么“中间层特征再聚类”比直接用最终层更可靠。

##### 5. cluster ensemble 与 product k-means

HuBERT 还讨论了多个聚类目标的扩展。若第 \(k\) 个聚类器产生目标序列 \(Z^{(k)}\)，masked loss 可写为：

$$
L_m(f;X,\{Z^{(k)}\}_k,M)
=
\sum_{t\in M}\sum_k
\log p_f^{(k)}(z_t^{(k)}\mid\tilde{X},t)
$$

这相当于用无监督聚类自动构造多任务学习：不同 cluster 数或不同特征子空间提供不同粒度的声学划分。例如 50 类 cluster 可能更接近元音/辅音等粗类别，500 类 cluster 则可能更接近子音素状态。product k-means 进一步把高维特征拆成多个子空间分别聚类，组合空间更大，但每个子任务仍是可控的分类问题。

##### 6. 与 wav2vec 2.0 的关键区别

wav2vec 2.0 需要从候选集合中对比识别真实量化 latent，因此训练目标依赖负例采样和码本使用；HuBERT 则先离线产生 frame-level label，再做普通 masked classification。换句话说，wav2vec 2.0 的离散单元是在线学习出来的训练目标，HuBERT 的离散单元是离线 teacher 产生的伪标签。

两者都强调“不要重建低层连续特征”，但路径不同：wav2vec 2.0 用 contrastive loss 避免逐点重建，HuBERT 用 noisy hidden units 和 masked-only loss 避免模型复制输入。HuBERT 的优势是训练目标简单稳定，且迭代聚类能逐步提升 teacher；代价是需要离线抽特征和 k-means 聚类流程。

##### 7. 微调与效果

HuBERT 预训练后去掉 projection head，换成 CTC softmax 层进行 ASR 微调；微调时卷积 waveform encoder 保持冻结。论文在 LibriSpeech 960h 与 Libri-Light 60k 小时无标注语音上预训练，并在 10 分钟、1 小时、10 小时、100 小时和 960 小时标注设置上评估。

结果上，HuBERT 在多种标注规模下匹配或超过 wav2vec 2.0。尤其在 10 分钟标注设置中，HuBERT Large 达到 test-clean/test-other 4.7/7.6 WER，X-Large 进一步达到 4.6/6.8；1B 参数模型相比 Large 在更困难的 dev-other/test-other 上分别有最高 19%/13% 相对 WER 降低。这说明 HuBERT 的离线聚类目标可以随模型规模和无标注数据量继续受益。

#### 🧪 练习题

```yaml
question: "HuBERT 为什么通常只在 masked frames 上计算预测损失？"
options:
  - "为了让模型更容易直接复制 k-means 标签"
  - "为了避免使用 Transformer 编码器"
  - "为了迫使模型根据上下文推断被遮盖位置，并降低对低质量聚类标签的机械模仿"
  - "为了把所有 hidden units 合并成一个连续向量"
answer: 2
explain: "若在未遮盖帧上也大量计算损失，模型可能只学习复现 noisy clustering teacher。masked-only loss 要求模型通过上下文预测不可见帧，从而学习声学表示和长程语音结构。"
```
