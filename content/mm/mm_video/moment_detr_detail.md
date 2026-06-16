### Moment-DETR — 时刻检测Transformer (Moment Detection Transformer)

```yaml
id: moment_detr
name: Moment-DETR
full_name: 时刻检测Transformer (Moment Detection Transformer)
year: '2021'
org: UNC
paper_url: https://proceedings.neurips.cc/paper/2021/hash/62e0973455fd26eb03e91d5741a4a3bb-Abstract.html
category: grounding
parent: vslnet
motivation: 端到端Transformer定位
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/moment_detr_detail.md
```

#### 📝 一句话总结

Moment-DETR 将自然语言视频时刻定位建模为 DETR 式集合预测问题，用 Transformer encoder-decoder 直接输出一个或多个时刻坐标及逐 clip saliency 分数，从而去掉提案生成和 NMS 等手工流程。

#### 🎯 核心要点

- **端到端集合预测**：使用固定数量的 learnable moment queries，一次性预测多个候选时刻和前景/背景类别。
- **视频-文本联合 Transformer 编码**：把 SlowFast/CLIP 视频特征与 CLIP 文本 token 特征投影到同一维度后拼接输入 encoder。
- **DETR 风格 decoder**：moment queries 通过自注意力和 cross-attention 从编码后的多模态序列中抽取定位信息。
- **三类预测头**：encoder 输出预测 clip-wise saliency；decoder 输出 foreground/background 分类与归一化中心点/宽度坐标。
- **Hungarian matching**：训练时用二分图匹配将预测集合和真实时刻集合对齐，避免人为指定第几个 query 对应哪个 GT。
- **复合定位损失**：moment 坐标同时使用 L1 loss 和 1D generalized IoU loss。
- **QVHighlights 数据集**：支持一个查询对应多个不连续时刻，并提供查询相关 highlight 标注。
- **ASR 弱监督预训练**：使用 YouTube ASR caption-timestamp pairs 预训练，缓解端到端 Transformer 对数据量的需求。

#### 🔬 深入细节

##### 核心框架图

![Moment-DETR 模型总览](https://raw.githubusercontent.com/jayleicn/moment_detr/main/res/model_overview.png)
*图：Moment-DETR 使用 Transformer encoder-decoder、learnable moment queries，以及 saliency、foreground/background、moment coordinates 三个预测头。*

##### 算法伪代码

```python
# Moment-DETR 核心训练流程
def moment_detr_forward(video_clips, text_query):
    Ev = concat(normalize(slowfast(video_clips)), normalize(clip_video(video_clips)))
    Eq = clip_text_tokens(text_query)

    Pv = mlp_project_video(Ev)       # [Lv, d]
    Pq = mlp_project_text(Eq)        # [Lq, d]
    E_input = concat_along_time(Pv, Pq)

    E_enc = transformer_encoder(E_input + positional_encoding(E_input))
    video_enc = E_enc[:len(video_clips)]
    saliency = linear_saliency(video_enc)        # [Lv]

    moment_queries = learned_embeddings(N)       # [N, d]
    E_dec = transformer_decoder(moment_queries, E_enc)
    cls_logits = linear_fg_bg(E_dec)             # [N, 2]
    moments = sigmoid(ffn_moment(E_dec))         # [N, 2], center + width
    return cls_logits, moments, saliency

def train_step(video, query, gt_moments, gt_saliency):
    cls_logits, pred_moments, saliency = moment_detr_forward(video, query)

    # Hungarian matching: each GT is assigned to one prediction slot.
    cost = classification_cost(cls_logits, gt_moments) + moment_cost(pred_moments, gt_moments)
    assignment = hungarian_match(cost)

    loss_cls = cross_entropy_for_matched_and_background(cls_logits, assignment)
    loss_loc = l1_loss(pred_moments, gt_moments, assignment)
    loss_iou = generalized_temporal_iou_loss(pred_moments, gt_moments, assignment)
    loss_sal = pairwise_saliency_hinge(saliency, gt_saliency, gt_moments)
    return loss_cls + lambda_l1 * loss_loc + lambda_iou * loss_iou + lambda_sal * loss_sal
```

##### 方法解读

Moment-DETR 解决的是 VSLNet 之后仍然存在的两个问题：一是很多真实查询可能对应多个分离的相关片段，单一 span 不够；二是提案生成、NMS、窗口长度等手工组件会把定位性能绑定到启发式设计。Moment-DETR 借鉴 DETR，把时刻定位写成集合预测：

$$
\hat{Y}=\{(\hat{c}_i,\hat{m}_i)\}_{i=1}^{N},\quad \hat{m}_i=(\hat{c}^{time}_i,\hat{w}_i)\in[0,1]^2
$$

这里 \(N\) 是固定数量的 moment queries，每个 query 输出一个 foreground/background 标签和一个归一化时刻坐标。背景类表示这个 query 没有匹配到真实时刻，因此模型可以自然处理“真实时刻数量小于 query 数量”的情况。

输入表示上，视频用 SlowFast 与 CLIP video encoder 提取每 2 秒一个 clip 的特征，文本用 CLIP text encoder 提取 token-level 特征。二者分别经 MLP 投影到共同维度 \(d\)，再沿长度维拼接：

$$
E_{input}=[P_v(E_v);P_q(E_q)]\in\mathbb{R}^{(L_v+L_q)\times d}
$$

Transformer encoder 对这个联合序列做自注意力，因而视频 clip 可以直接关注查询 token，查询 token 也能回看视频上下文。相比先独立编码再匹配的两塔式方法，这种单流编码更适合捕捉“某个动作在某个对象出现之后”的跨模态关系。

Decoder 的输入不是文本查询，而是一组可学习的 **moment queries**。每个 query 经过 decoder self-attention 与 encoder cross-attention 后，学习成为一个“时刻槽位”。这些槽位没有人为语义标签，但训练后会分化：有的偏向短片段，有的偏向视频开头或结尾，有的偏向长跨度。这种槽位分化来自 Hungarian matching 和集合损失，而不是预设 anchors。

匹配阶段定义预测集合 \(\hat{y}\) 和带背景 padding 的真实集合 \(y\)，用 Hungarian algorithm 找最小成本排列：

$$
\hat{\sigma}=\operatorname*{arg\,min}_{\sigma\in\mathfrak{S}_N}\sum_i^N \mathcal{C}_{match}(y_i,\hat{y}_{\sigma(i)})
$$

匹配成本包含前景分类概率和时刻坐标误差：

$$
\mathcal{C}_{match}(y_i,\hat{y}_{\sigma(i)})=-\mathbb{1}_{\{c_i\neq\varnothing\}}\hat{p}_{\sigma(i)}(c_i)+\mathbb{1}_{\{c_i\neq\varnothing\}}\mathcal{L}_{moment}(m_i,\hat{m}_{\sigma(i)})
$$

背景 padding 不参与坐标匹配，避免模型被不存在的时刻约束。匹配完成后，每个真实时刻只监督一个预测槽位，其余槽位学习为 background，这就是去掉 NMS 的关键。

定位损失由 L1 和 1D generalized IoU 组成：

$$
\mathcal{L}_{moment}(m_i,\hat{m}_{\hat{\sigma}(i)})=\lambda_{L1}\|m_i-\hat{m}_{\hat{\sigma}(i)}\|_1+\lambda_{iou}\mathcal{L}_{iou}(m_i,\hat{m}_{\hat{\sigma}(i)})
$$

L1 提供坐标回归的直接梯度，IoU 项关注时间段重叠质量。由于时刻是 1D 区间，IoU 损失使用 temporal IoU 的形式，而不是 2D box IoU。

Moment-DETR 还把 highlight detection 合入同一模型。encoder 的视频 clip 输出通过线性层得到 saliency score \(S\in\mathbb{R}^{L_v}\)。saliency loss 使用成对 hinge 约束：相关片段内部高分 clip 应高于低分 clip，真实时刻内部 clip 应高于外部 clip：

$$
\mathcal{L}_{saliency}(S)=\max(0,\Delta+S(t_{low})-S(t_{high}))+\max(0,\Delta+S(t_{out})-S(t_{in}))
$$

最终目标为：

$$
\mathcal{L}=\lambda_{saliency}\mathcal{L}_{saliency}(S)+\sum_{i=1}^{N}\left[-\lambda_{cls}\log\hat{p}_{\hat{\sigma}(i)}(c_i)+\mathbb{1}_{\{c_i\neq\varnothing\}}\mathcal{L}_{moment}(m_i,\hat{m}_{\hat{\sigma}(i)})\right]
$$

这个联合目标让模型同时学“哪里是相关时刻”和“相关时刻内部哪些 clip 更适合当 highlight”。论文消融显示去掉 saliency loss 不仅影响 highlight，也会影响 moment retrieval，说明 clip-level 查询相关性监督会反过来改善时刻定位。

Moment-DETR 的代价是数据需求更高。论文因此引入 ASR 弱监督预训练：从 YouTube ASR caption 中取 caption 作为查询、timestamp 作为弱标签，使用同一架构预训练。由于 ASR 没有人工 saliency 标注，预训练时移除 saliency loss 中依赖高低 saliency 标注的部分。这个策略体现了端到端 Transformer 的典型取舍：架构更少先验、更统一，但需要更多弱监督或大规模数据来学到可靠定位偏好。

> 💡 关键：Moment-DETR 的本质转变是从“给候选片段打分”转到“直接预测一组时刻”，用 Hungarian matching 解决多个预测和多个真实片段之间的对齐问题。

#### 🧪 练习题

```yaml
question: "Moment-DETR 为什么需要 Hungarian matching？"
options:
  - "因为视频帧必须按时间重新排序"
  - "因为模型输出的是无序预测集合，需要把预测槽位和真实时刻一一匹配后才能计算损失"
  - "因为 CLIP 文本 token 需要和视频帧逐词对齐"
  - "因为 NMS 只能在匹配之后运行"
answer: 1
explain: "Moment queries 输出的是无序集合，无法预先指定第几个 query 对应哪个真实时刻；Hungarian matching 用最小成本分配建立监督关系，也让模型不依赖 NMS。"
```
