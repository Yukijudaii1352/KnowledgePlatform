### x-vector: 扩展向量 (x-vector)

```yaml
id: x_vector
name: x-vector
full_name: 扩展向量 (x-vector)
year: '2018'
org: JHU
paper_url: https://ieeexplore.ieee.org/document/8461375
category: speaker
parent: d_vector
motivation: TDNN+统计池化嵌入
topic_id: mm_sound
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/x_vector_detail.md
quality_reasons:
  - no_image
```

#### 📝 一句话总结

x-vector 提出了用 TDNN 帧级网络加统计池化层训练说话人分类器，并从中间段级层提取固定长度说话人嵌入的方法，解决了 i-vector 无监督前端判别性不足和对噪声增强利用不充分的问题。

#### 🎯 核心要点

- 监督式嵌入：用说话人 ID 作为分类标签训练 DNN，使提取器直接优化说话人可分性。
- TDNN 帧级建模：前 5 层在有限时间上下文上抽取帧级说话人线索，最终输出 1500 维帧表示。
- 统计池化：对整段帧级表示计算均值和标准差，把任意长度语音映射成固定 3000 维段级表示。
- x-vector 提取点：通常从 segment6 层的仿射输出提取 512 维嵌入，训练时保留 softmax，推理时丢弃分类层。
- 数据增强：用混响、babble、音乐和噪声扩充训练集，使监督 DNN 学会忽略非说话人因素。
- 后端兼容：提取的 x-vector 继续使用中心化、LDA、长度归一化和 PLDA 等 i-vector 生态中的成熟后端。
- 实验结论：在 SITW 与 NIST SRE 2016 等测试上，增强训练的 x-vector 系统超过 acoustic i-vector 和 BNF i-vector 基线。

#### 🔬 深入细节

![x-vector 系统的帧级与段级结构](https://media.springernature.com/full/springer-static/image/art%3A10.1007%2Fs10772-023-10058-5/MediaObjects/10772_2023_10058_Fig1_HTML.png)
*图：x-vector 系统族的典型分层结构：帧级 TDNN 提取局部特征，统计池化汇总为段级表示，再经全连接层输出说话人嵌入或分类结果。*

```python
# x-vector 训练、提取与验证流程

# ---------- 训练 TDNN 说话人分类器 ----------
for features, speaker_id in minibatches(training_chunks):
    # features: T x 24 filterbank 特征，chunk 通常约 2 到 4 秒
    h1 = relu(tdnn(features, context=[-2, -1, 0, 1, 2], out_dim=512))
    h2 = relu(tdnn(h1,       context=[-2, 0, 2],        out_dim=512))
    h3 = relu(tdnn(h2,       context=[-3, 0, 3],        out_dim=512))
    h4 = relu(affine(h3, out_dim=512))
    h5 = relu(affine(h4, out_dim=1500))

    mean = h5.mean(dim="time")
    std = h5.std(dim="time")
    pooled = concat(mean, std)       # 3000 维，和输入时长无关

    segment6_affine = affine(pooled, out_dim=512)
    segment6 = relu(segment6_affine)
    segment7 = relu(affine(segment6, out_dim=512))
    logits = affine(segment7, out_dim=num_training_speakers)

    loss = cross_entropy(logits, speaker_id)
    update_network(loss)

# ---------- 提取 x-vector ----------
def extract_xvector(utterance):
    h5 = forward_frame_layers(utterance)
    pooled = concat(mean_over_time(h5), std_over_time(h5))
    return segment6_affine_output(pooled)  # 常用 ReLU 前的 512 维输出

# ---------- 验证后端 ----------
enroll_x = length_norm(LDA(center(extract_xvector(enroll_audio))))
test_x = length_norm(LDA(center(extract_xvector(test_audio))))
score = PLDA(enroll_x, test_x)
accept = score > threshold
```

##### 1. 为什么要从 i-vector 转向监督 DNN

i-vector 的 UBM 和全变分矩阵主要由最大似然目标训练，并不直接知道“哪些差异能区分说话人”。x-vector 把前端训练改成说话人分类任务：输入一段语音，网络必须预测训练集中对应的 speaker ID。分类任务本身迫使隐藏层保留稳定的说话人属性，压低语音内容、噪声和通道条件等对类别无益的变化。

这种做法也改变了数据增强的价值。对无监督 i-vector 来说，加入噪声/混响样本只是改变声学分布，不一定会让 \(T\) 学到更强的说话人判别方向；对监督 x-vector 来说，同一个说话人的增强样本共享标签，网络会被训练成在噪声和房间响应变化下仍输出同一类别，因此增强直接转化为鲁棒性。

##### 2. TDNN 帧级层负责有限上下文建模

x-vector 的帧级部分是时延神经网络。论文中的前 3 个 TDNN 层使用稀疏时间拼接逐步扩大感受野：第一层看 \([t-2,t+2]\)，第二层看 \(\{t-2,t,t+2\}\)，第三层看 \(\{t-3,t,t+3\}\)。叠加后，frame3 的总上下文约为 15 帧，能够覆盖短时音素和发音方式线索。

frame4 和 frame5 不再扩大时间上下文，而是逐帧做非线性变换，并把维度提升到 1500。这样的设计把“局部时间模式提取”和“全局语音段聚合”分开：TDNN 层只负责每个时间点附近的声学模式，统计池化层再把整段语音的信息汇总起来。

##### 3. 统计池化是变长到定长的核心接口

设 frame5 输出为 \(\mathbf{h}_1,\ldots,\mathbf{h}_T\)，其中 \(\mathbf{h}_t\in\mathbb{R}^{1500}\)。统计池化计算：

$$
\boldsymbol{\mu}=\frac{1}{T}\sum_{t=1}^{T}\mathbf{h}_t
$$

$$
\boldsymbol{\sigma}=\sqrt{\frac{1}{T}\sum_{t=1}^{T}(\mathbf{h}_t-\boldsymbol{\mu})^2}
$$

最终段级向量为 \([\boldsymbol{\mu};\boldsymbol{\sigma}]\in\mathbb{R}^{3000}\)。均值描述整段语音的平均说话人特征，标准差描述这些特征在时间上的变化范围。只用最后一帧会丢掉大部分语音段信息，只用均值又会忽略韵律和发音稳定性差异，因此均值和标准差的拼接是一个简单但有效的全局描述。

##### 4. x-vector 的提取位置与训练目标

网络训练时最后一层是 \(N\) 类 softmax，\(N\) 是训练说话人数。训练损失是标准交叉熵：

$$
\mathcal{L}=-\log\frac{\exp(z_{y})}{\sum_{s=1}^{N}\exp(z_s)}
$$

完成训练后，softmax 层只作为训练约束，不参与验证。x-vector 通常从 segment6 层的仿射输出提取，而不是从最终 softmax 概率提取，因为概率维度绑定训练说话人集合，不能泛化到新说话人；仿射嵌入则保留了可迁移的连续判别特征。

论文还强调了训练数据规模和增强策略。增强方式包括混响、babble、多种环境噪声和音乐叠加，形成“同一说话人、多种声学条件”的训练信号。网络因此学习到的不是某个固定录音环境，而是跨环境稳定的说话人线索。

##### 5. 后端沿用 i-vector 体系但前端更判别

x-vector 的后端通常仍是中心化、LDA、长度归一化和 PLDA。LDA 把 512 维嵌入投影到更适合验证的低维空间，PLDA 估计同说话人和异说话人嵌入对的似然比。这个组合说明 x-vector 并不是完全抛弃传统说话人验证体系，而是用监督神经嵌入替换 i-vector 前端。

与 d-vector 相比，x-vector 的统计池化显式针对变长文本无关说话人验证；与 i-vector 相比，它把“提取器训练目标”从无监督似然改成有监督 speaker classification。这个改变让 x-vector 更容易从大规模带 speaker ID 的数据和数据增强中获益，也解释了它后来成为 ECAPA-TDNN 等改进模型的直接基线。

> 💡 关键：x-vector 的方法核心不是“某个 512 维向量”，而是 TDNN 帧级建模、统计池化、监督说话人分类和 PLDA 后端组成的一整套训练/验证接口。

#### 🧪 练习题

```yaml
question: "x-vector 中统计池化层的主要作用是什么？"
options:
  - "把 softmax 输出转换成说话人概率"
  - "将变长帧级特征序列聚合成固定维度的段级表示"
  - "用 PLDA 计算注册语音和测试语音的似然比"
  - "随机混合噪声与混响以扩充训练集"
answer: 1
explain: "统计池化对所有帧级输出计算均值和标准差，使任意长度语音都能变成固定 3000 维段级向量，后续全连接层才能提取 x-vector。"
```
