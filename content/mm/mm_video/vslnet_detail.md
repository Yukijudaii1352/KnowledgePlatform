### VSLNet — 视频跨度网络 (Video Span Localizing Network)

```yaml
id: vslnet
name: VSLNet
full_name: 视频跨度网络 (Video Span Localizing Network)
year: '2020'
org: NTU
paper_url: https://aclanthology.org/2020.acl-main.585/
category: grounding
parent: tall
motivation: 跨度预测与查询高亮机制
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/vslnet_detail.md
```

#### 📝 一句话总结

VSLNet 将自然语言视频定位重写为类似机器阅读理解的 span prediction 问题，直接预测查询对应片段的开始和结束位置，并用 Query-Guided Highlighting 先突出与查询相关的视频帧来缓解视频背景噪声。

#### 🎯 核心要点

- **Span-based QA 形式化**：把未裁剪视频看作 passage，把自然语言查询看作 question，把目标时刻看作 answer span。
- **VSLBase 主干**：由特征编码器、Context-Query Attention 和 conditioned span predictor 构成，避免显式滑窗提案。
- **共享 Feature Encoder**：视频片段特征和词嵌入分别投影到同维度后，使用由卷积、多头自注意力和前馈层组成的 QANet 风格编码器。
- **跨模态注意力**：用 context-to-query 与 query-to-context attention 建模每个视频位置和查询词之间的匹配关系。
- **Conditioned Span Predictor**：先预测 start 分布，再用第二个单向 LSTM 在 start 隐状态条件下预测 end 分布。
- **Query-Guided Highlighting (QGH)**：把目标时刻及其前后扩展区域标为 foreground，学习 clip-wise 高亮分数并重加权视频特征。
- **训练目标**：总损失为边界交叉熵 \(L_{span}\) 与高亮二分类损失 \(L_{QGH}\) 之和。

#### 🔬 深入细节

##### 核心框架图

![VSLNet 框架总览](https://raw.githubusercontent.com/26hzhang/VSLNet/master/figures/overview.jpg)
*图：VSLNet 在 VSLBase 的 span prediction 主干上增加 Query-Guided Highlighting，使模型先突出与查询相关的视频区域，再预测答案跨度边界。*

##### 算法伪代码

```python
# VSLNet 核心流程伪代码
def vslnet(video_features, query_tokens, gt_start=None, gt_end=None):
    V0 = linear_video(video_features)       # [n, d]
    Q0 = linear_text(glove(query_tokens))   # [m, d]

    Ve = feature_encoder(V0)                # conv + multi-head attention + FFN
    Qe = feature_encoder(Q0)                # 与视频侧共享编码器参数

    S = trilinear_similarity(Ve, Qe)        # [n, m]
    A = softmax(S, dim="query") @ Qe        # context-to-query
    B = softmax(S, dim="query") @ softmax(S, dim="video").T @ Ve
    Vq = ffn(concat(Ve, A, Ve * A, Ve * B))

    hQ = self_attention_pool(Qe)
    V_bar = concat_each_timestep(Vq, hQ)
    Sh = sigmoid(conv1d(V_bar))             # query-guided highlighting score
    V_tilde = Sh[:, None] * V_bar

    Hs = unilstm_start(V_tilde)
    He = unilstm_end(Hs)
    Ps = softmax(ffn_start(concat(Hs, V_tilde)))
    Pe = softmax(ffn_end(concat(He, V_tilde)))

    if gt_start is not None:
        loss_span = 0.5 * (cross_entropy(Ps, gt_start) + cross_entropy(Pe, gt_end))
        loss_qgh = binary_cross_entropy(Sh, build_highlight_labels(gt_start, gt_end))
        return loss_span + loss_qgh

    best = None
    for i in range(len(Ps)):
        for j in range(i, len(Pe)):
            score = Ps[i] * Pe[j]
            best = max(best, (score, i, j), key=lambda x: x[0]) if best else (score, i, j)
    return best[1], best[2]
```

##### 方法解读

VSLNet 的出发点是对滑窗/提案式方法的反思。早期 TALL/MCN 系列通常先枚举候选片段，再对每个候选做文本匹配，这会带来大量冗余候选，并且边界精度受候选生成策略限制。VSLNet 把问题改写为：

$$
V=\{f_t\}_{t=1}^{n},\quad Q=\{q_j\}_{j=1}^{m},\quad \text{output }(\tau^s,\tau^e)
$$

也就是在视频片段序列上直接找一个答案跨度。这个视角借鉴了 SQuAD 式抽取问答：文本 passage 中答案是连续 token span，视频中答案则是连续 clip span。区别在于，视频的背景片段多、语义变化慢、噪声高，因此需要专门的高亮机制辅助。

在特征编码阶段，视频特征和查询词向量先投影到同一维度，再通过共享 Feature Encoder：

$$
V_e=\operatorname{FeatureEncoder}(V_0),\quad Q_e=\operatorname{FeatureEncoder}(Q_0)
$$

该编码器是简化版 QANet embedding encoder，包含卷积层、多头自注意力、前馈层、残差连接和 LayerNorm。卷积负责局部上下文，自注意力负责长程依赖；视频和语言共享参数则让二者在后续注意力计算前进入更可比较的表示空间。

跨模态交互使用 Context-Query Attention。先计算视频位置 \(i\) 与查询词 \(j\) 的相似度矩阵 \(S\in\mathbb{R}^{n\times m}\)，再得到 context-to-query 注意力 \(A\) 和 query-to-context 注意力 \(B\)：

$$
A=S_r Q_e,\quad B=S_r S_c^\top V_e
$$

最终每个视频位置的 query-aware 表示为：

$$
V_q=\operatorname{FFN}\left([V_e;A;V_e\odot A;V_e\odot B]\right)
$$

这里的拼接不仅保留原始视频上下文，还显式加入查询聚合表示与乘性交互项，使模型能判断某个 clip 是否与查询词中的动作、对象和关系匹配。

Conditioned Span Predictor 是 VSLBase 的边界预测头。它先用单向 LSTM 读取 \(V_q\) 得到 start 隐状态，再把 start 隐状态送入 end LSTM，让 end 预测条件化于 start：

$$
h_t^s=\operatorname{UniLSTM}_{start}(v_t^q,h_{t-1}^s),\quad
h_t^e=\operatorname{UniLSTM}_{end}(h_t^s,h_{t-1}^e)
$$

对应边界分布为：

$$
P_s=\operatorname{SoftMax}(S^s),\quad P_e=\operatorname{SoftMax}(S^e)
$$

训练时使用交叉熵：

$$
L_{span}=\frac{1}{2}\left[f_{CE}(P_s,Y_s)+f_{CE}(P_e,Y_e)\right]
$$

推理时枚举所有合法 \(0\leq \hat{a}^s\leq \hat{a}^e\leq n\) 的跨度，最大化联合概率：

$$
(\hat{a}^s,\hat{a}^e)=\operatorname*{arg\,max}_{\hat{a}^s,\hat{a}^e}P_s(\hat{a}^s)P_e(\hat{a}^e)
$$

VSLNet 在 VSLBase 上加入 QGH。QGH 把目标时刻视作 foreground，并按超参数 \(\alpha\) 向前后扩展，覆盖 antecedent/consequent context。它先把查询编码为句子向量 \(h_Q\)，与每个 \(v_i^q\) 拼接成 \(\bar{v}_i^q=[v_i^q;h_Q]\)，再通过一维卷积和 Sigmoid 得到高亮分数：

$$
S_h=\sigma(\operatorname{Conv1D}(\bar{V}^{q})),\quad \widetilde{V}^{q}=S_h\cdot\bar{V}^{q}
$$

这个分数不是最终答案，而是一个软门控：背景 clip 的特征被压低，查询相关片段及其附近上下文被放大。随后 span predictor 使用 \(\widetilde{V}^{q}\) 替代 \(V_q\)，因此边界预测建立在更干净的视频序列上。

总损失为：

$$
L=L_{span}+L_{QGH},\quad L_{QGH}=f_{CE}(S_h,Y_h)
$$

VSLNet 的优势是把“候选评分”变成“边界抽取”，减少候选设计带来的工程偏差；QGH 则补上了视频任务相对文本 QA 的关键差异，即视频中大部分片段是背景且相邻片段高度相似。它仍是单跨度预测模型，因此面对一个查询对应多个不连续时刻的场景时表达力有限，这也是后来 Moment-DETR 这类集合预测模型继续推进的原因。

> 💡 关键：VSLNet 的跨度预测提升了端到端程度，QGH 则让模型先学会“哪里值得看”，再判断“从哪里开始、到哪里结束”。

#### 🧪 练习题

```yaml
question: "VSLNet 中 Query-Guided Highlighting 的直接作用是什么？"
options:
  - "生成固定长度滑动窗口候选"
  - "预测每个视频位置属于查询相关前景的概率，并用该分数重加权视频特征"
  - "把自然语言查询压缩成单个类别标签"
  - "用非极大值抑制过滤重叠候选"
answer: 1
explain: "QGH 通过 Conv1D+Sigmoid 得到 clip-wise 高亮分数，将查询相关的前景片段放大、背景片段压低，再交给 span predictor 预测起止边界。"
```
