### UniVTG — 统一时序定位 (Unified VTG)

```yaml
id: univtg
name: UniVTG
full_name: 统一时序定位 (Unified VTG)
year: '2023'
org: Tsinghua
paper_url: http://openaccess.thecvf.com/content/ICCV2023/html/Lin_UniVTG_Towards_Unified_Video-Language_Temporal_Grounding_ICCV_2023_paper.html
category: grounding
parent: moment_detr
motivation: 统一时刻检索与高亮检测
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/univtg_detail.md
```

#### 📝 一句话总结

UniVTG 提出统一的视频-语言时序定位框架，将时刻检索、高亮检测和查询式视频摘要都转写为 clip 级前景、边界和显著性预测，解决了 VTG 方法长期依赖任务专用标签和任务专用模型的问题。

#### 🎯 核心要点

- **统一标签三元组**：每个 clip 被表示为 \((f_i, d_i, s_i)\)，分别对应前景指示、边界偏移和语言相关显著性分数
- **三类 VTG 标签互转**：interval-wise 时刻检索标签、curve-wise 高亮曲线标签、point-wise 摘要/叙事点标签都可转换到统一形式
- **可扩展伪监督**：使用 VideoCC 构造伪区间标签，使用 CLIP teacher 和开放概念库构造伪显著性曲线，并利用 Ego4D/QFVS 等点标签扩展预训练语料
- **统一 grounding 模型**：沿用 Moment-DETR 风格的视频/文本编码器，加入多模态 Transformer 编码器，并用 foreground、boundary、saliency 三个预测头对应统一三元组
- **多目标训练**：前景头用 BCE，边界头用 Smooth L1 + generalized IoU，显著性头用 intra-video 与 inter-video 对比学习
- **多任务推理**：moment retrieval 用 \(\tilde f_i\) 排序边界并做 1D NMS，高亮检测用 \(\tilde f_i+\tilde s_i\) 排序 clip，视频摘要用 KTS 分段后聚合 clip 分数
- **评估范围**：覆盖 QVHighlights、Charades-STA、TACoS、Ego4D、YouTube Highlights、TVSum、QFVS，并通过约 4.2M 样本的 grounding 预训练增强迁移和零样本能力

#### 🔬 深入细节

##### 核心框架图

![UniVTG 统一标签与训练管线](https://ar5iv.labs.arxiv.org/html/2307.16715/assets/x3.png)
*图：UniVTG 先把不同来源的 interval、curve、point 标签统一成 clip 级 \((f_i,d_i,s_i)\)，再用同一个 grounding 模型预训练并迁移到不同 VTG 下游任务。*

![UniVTG 统一模型结构](https://ar5iv.labs.arxiv.org/html/2307.16715/assets/x5.png)
*图：UniVTG 模型由冻结视频编码器、冻结文本编码器、多模态编码器和三个输出头组成，分别预测前景、边界偏移和显著性。*

##### 算法流程

```python
# UniVTG 训练与推理流程伪代码
def train_univtg(video, query, raw_label):
    clips = split_into_fixed_length_clips(video)

    # 1. 将不同任务标签转成统一监督
    if raw_label.type == "interval":
        f, d, s = interval_to_foreground_boundary_saliency(clips, raw_label)
    elif raw_label.type == "curve":
        s = raw_label.saliency_curve
        f = (s > adaptive_threshold(s))
        d = nearest_background_offsets(f)
    elif raw_label.type == "point":
        f = point_labels_to_foreground(clips, raw_label)
        s = f.astype(float)
        d = estimate_interval_from_neighboring_points(raw_label)

    # 2. 编码与跨模态交互
    V = video_encoder(clips)                  # CLIP + SlowFast, frozen
    Q = text_encoder(query)                   # CLIP text encoder, frozen
    V, Q = project_to_same_dim(V), project_to_same_dim(Q)
    S = attentive_pool(Q)                     # sentence representation
    Z = multimodal_transformer(concat(V, Q))
    V_joint = take_video_tokens(Z)

    # 3. 三头预测
    f_hat = foreground_head(V_joint)
    d_hat = boundary_head(V_joint)
    s_hat = cosine_similarity(V, S)

    # 4. 联合优化
    loss_f = binary_cross_entropy(f_hat, f)
    loss_b = smooth_l1_and_giou(d_hat, d, mask=(f == 1))
    loss_s = intra_inter_video_contrastive(s_hat, s)
    return loss_f + loss_b + loss_s

def infer_univtg(video, query, task):
    f_hat, b_hat, s_hat = forward(video, query)
    if task == "moment_retrieval":
        return nms_1d(rank_by_score(b_hat, f_hat), threshold=0.7)
    if task == "highlight_detection":
        return topk_clips(score=f_hat + s_hat)
    if task == "video_summarization":
        shots = kernel_temporal_segmentation(video)
        return select_summary_by_aggregated_clip_scores(shots, f_hat + s_hat)
```

##### 方法解读

**动机：从任务专用 VTG 走向统一 VTG。** 早期 moment retrieval 通常输出一个连续时间区间，highlight detection 输出每个片段的 worthiness 曲线，video summarization 输出若干离散关键片段。它们看起来监督形式不同，导致模型、标签和评估流程都被任务切开。UniVTG 的核心判断是：这些任务本质上都在回答“给定视频 \(V\) 和查询 \(Q\)，哪些 clip 是目标 clip”。因此与其为每种任务设计专门 head，不如把 clip 当作统一原子，并让不同标签都落到同一组 clip 级变量上。

**统一三元组是整篇论文的中心抽象。** 给定视频 clip \(v_i\) 及其中心时间 \(t_i\)，UniVTG 定义：

$$
v_i = (f_i, d_i, s_i), \quad d_i=[d_i^s,d_i^e], \quad b_i=[t_i-d_i^s, t_i+d_i^e].
$$

其中 \(f_i\in\{0,1\}\) 判断该 clip 是否属于查询相关前景，\(d_i\) 只在前景 clip 上有效，用来把 clip 中心回归到完整区间边界；\(s_i\in[0,1]\) 则表示 clip 与语言查询的相关显著性。这个设计把“区间定位”“曲线打分”“离散摘要点”压到同一个监督空间：区间标签提供 \(f_i,d_i\)，高亮曲线直接提供 \(s_i\)，点标签提供稀疏 \(f_i\)，缺失项再通过阈值、邻近背景或平均叙事间隔补全。

**伪标签机制解决了时序 grounding 预训练语料少的问题。** 对 interval-wise 标签，论文利用 VideoCC 中裁剪视频与文本标题/描述的对应关系构造伪时间区间；对 curve-wise 标签，先用开放概念库生成候选概念，再用 CLIP 计算每个 clip 与概念的相似度，取 top-5 概念作为视频 gist，并把相似度作为伪显著性曲线；对 point-wise 标签，利用 Ego4D 叙事时间戳或 QFVS 概念点标注，把点扩展成局部时间监督。这样做的关键不是让伪标签完全准确，而是让三类标签可以在同一目标下共同训练，给模型大量“语言-时间”对齐信号。

**模型结构继承 Moment-DETR，但输出被改造成三头统一预测。** UniVTG 使用冻结视频编码器和文本编码器：视频侧采用 CLIP ViT-B/32 与 SlowFast R-50 特征拼接，文本侧采用 CLIP text encoder。视频 token 与文本 token 加入位置和模态嵌入后拼接，送入多层 Transformer 做跨模态交互：

$$
\tilde V=V+E_V^{pos}+E_V^{type}, \quad
\tilde Q=Q+E_T^{pos}+E_T^{type}, \quad
Z_0=[\tilde V;\tilde Q],
$$

$$
Z_d=\operatorname{MLP}(\operatorname{MSA}(Z_{d-1})), \quad d=1,\ldots,k.
$$

输出的视频 token 接三个 head：foreground head 预测 \(\tilde f_i\)，boundary head 预测 \(\tilde d_i\)，saliency head 则通过视频 clip 表示与句子表示的余弦相似度预测 \(\tilde s_i\)。

**训练目标把匹配、定位和显著性显式拆开。** 前景匹配使用二元交叉熵：

$$
L_f=-\lambda_f\left(f_i\log\tilde f_i+(1-f_i)\log(1-\tilde f_i)\right).
$$

边界回归只在前景 clip 上生效，组合 Smooth L1 和 generalized IoU：

$$
L_b=\mathbf{1}_{f_i=1}\left[\lambda_{L1}L_{\text{SmoothL1}}(\tilde d_i,d_i)+\lambda_{\text{iou}}L_{\text{iou}}(\tilde b_i,b_i)\right].
$$

显著性头先用 attentive pooling 得到句子表示 \(S\)，再计算：

$$
\tilde s_i=\cos(v_i,S)=\frac{v_i^\top S}{\|v_i\|_2\|S\|_2}.
$$

论文进一步用 intra-video 对比学习区分同一视频内高低显著性 clip，用 inter-video 对比学习把当前正 clip 与 batch 中其他句子拉开。总损失为：

$$
L=\frac{1}{N}\sum_{i=1}^{N}(L_f+L_b+L_s), \quad
L_s=\lambda_{\text{inter}}L_s^{\text{inter}}+\lambda_{\text{intra}}L_s^{\text{intra}}.
$$

**推理时按任务选择不同读出方式。** Moment retrieval 使用 foreground 概率排序所有预测边界，并用 1D NMS 去重；highlight detection 同时利用“是否前景”和“是否显著”，以 \(\tilde f_i+\tilde s_i\) 排序 clip；video summarization 则先用 KTS 切成 shot，再聚合 clip 分数生成摘要。与 Moment-DETR 相比，UniVTG 的创新不只是换一个 head，而是把标签空间、预训练语料和推理读出统一起来，使一个模型可以吸收不同粒度的时序监督。

#### 🧪 练习题

```yaml
question: "UniVTG 中统一三元组 (f_i, d_i, s_i) 的主要作用是什么？"
options:
  - "把视频帧压缩成固定长度视觉 token，降低显存占用"
  - "将时刻检索、高亮检测和视频摘要的不同标签统一到 clip 级监督空间"
  - "替代 CLIP 文本编码器，直接生成查询句向量"
  - "只用于 moment retrieval 的边界框后处理"
answer: 1
explain: "UniVTG 的核心是用前景、边界偏移和显著性三类 clip 级变量表示不同 VTG 标签，使多任务预训练和统一模型成为可能。"
```
