### UniTime (2026)
```yaml
id: unitime
name: UniTime
full_name: 通用时序定位 (Universal Video Temporal Grounding)
year: '2026'
org: NeurIPS
paper_url: https://nips.cc/virtual/2025/poster/UniTime
category: frontier_2026
parent: moment_detr
motivation: 时间戳token实现零样本泛化
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/unitime_detail.md
```

#### 📝 一句话总结
UniTime 将时间戳作为文本 token 插入视频 token 序列，让生成式 MLLM 直接读出查询对应的时间边界，并通过自适应帧缩放与粗到细推理实现跨短视频、长视频和复杂查询的通用时序定位。

#### 🎯 核心要点
- 把 temporal grounding 表述为生成式 MLLM 输出时间边界的问题，而不是固定检测头回归边界。
- Timestamp-interleaved sequence 在每帧或每段视频 token 前插入可读时间戳文本，使模型通过语言空间引用时间。
- Adaptive Frame Scaling 根据视频帧数动态分配每帧 token 预算，短视频保留高空间分辨率，长视频压缩 token 或切分处理。
- 支持 multi-scale prediction：长视频先做粗粒度片段检索，再在候选区域内做细粒度边界细化。
- 用 autoregressive loss 训练模型只生成目标答案 token，格式类似 “From \(s\) seconds to \(e\) seconds”。
- Video-centric training 将同一视频的多个 query-answer 对合并到一次输入中，减少长视频重复编码和 I/O 开销。
- 在 Ego4D-NLQ、TACoS、Charades-STA、QVHighlights、ANet-Captions 等时序定位基准以及长视频 VideoQA 中验证泛化能力。

#### 🔬 深入细节
![UniTime 框架图](https://arxiv.org/html/2506.18883v1/x2.png)
*图：UniTime 的自适应帧缩放、粗到细时序定位和 timestamp-interleaved sequence 架构。*

UniTime 的问题定义是：给定未裁剪视频 \(\mathcal{V}=\{f_1,\ldots,f_{N_f}\}\)、采样时间戳集合 \(\mathcal{T}=\{t_1,\ldots,t_{N_f}\}\) 和自由文本查询 \(\mathcal{Q}\)，输出一个或多个匹配查询的时间段：

$$
\mathcal{Y}=\{(s_1,e_1),\ldots,(s_K,e_K)\}
=\Phi_{\text{UniTime}}(\mathcal{V},\mathcal{T},\mathcal{Q})
$$

与传统 DETR/dual-encoder 类方法不同，UniTime 不让模型预测连续坐标，而是让 MLLM 从插入的 timestamp token 中“读出”边界。这降低了时序编码与语言模型对齐的难度，也让时间信息以普通文本形式进入 LLM。

```python
# UniTime 训练与粗到细推理伪代码
def build_unitime_sequence(video, timestamps, query, segment_level=False):
    visual_tokens = adaptive_frame_scaling(video)
    seq = []
    if not segment_level:
        for t_i, v_i in zip(timestamps, visual_tokens):
            seq += [tokenize(f"timestamp: {t_i} seconds"), v_i]
    else:
        for segment in group_frames(visual_tokens, length="L_s"):
            seq += [tokenize(f"timestamp: {segment.start_time} seconds"), segment.tokens]
    seq += [tokenize(query)]
    return seq

def train_step(video, timestamps, queries, answers):
    # video-centric: one video, many query-answer pairs
    seq = build_video_centric_batch(video, timestamps, queries, answers)
    mask = block_attention_between_different_query_answer_pairs(seq)
    loss = autoregressive_nll(target_tokens=answers, context=seq, attention_mask=mask)
    update_model(loss)

def infer_long_video(video, query):
    clips = split_if_long(video, max_frames="N_f_long")
    coarse_segments = []
    for clip in clips:
        seq = build_unitime_sequence(clip, clip.coarse_timestamps, query, segment_level=True)
        coarse_segments.append(generate_time_interval(seq))
    candidate = aggregate_and_select(coarse_segments)
    fine_seq = build_unitime_sequence(candidate.video_crop, candidate.fine_timestamps, query)
    return generate_time_interval(fine_seq)
```

自适应帧缩放解决的是 MLLM 上下文窗口和显存约束。若视频帧数为 \(N_f\)，总 token 预算为 \(N_{\text{total}}\)，每帧分到的 token 数为：

$$
N_{\text{res}}=\left\lfloor\frac{N_{\text{total}}}{N_f}\right\rfloor
$$

短视频帧数少，UniTime 可以通过 resize 给每帧更高空间分辨率；中长视频则用 token compression 通过双线性插值压缩视觉 token；超过 \(N_f^{\text{long}}\) 的视频会切成多个 clip 分治处理。论文给出的形式是：

$$
V_i=
\begin{cases}
\phi_{\text{project}}(\phi_{\text{vision}}(\psi_{\text{resize}}(f_i)))\in\mathbb{R}^{N_{\text{res}}\times d},
& N_f<N_f^{\text{short}}\\
\psi_{\text{compress}}(\phi_{\text{project}}(\phi_{\text{vision}}(f_i)))\in\mathbb{R}^{N_{\text{res}}\times d},
& N_f^{\text{short}}\le N_f<N_f^{\text{long}}
\end{cases}
$$

Timestamp-interleaved sequence 是 UniTime 的核心机制。细粒度定位时，模型在每帧视觉 token 前插入文本时间戳：

$$
S=[T_1;V_1;T_2;V_2;\ldots;T_{N_f};V_{N_f};Q],
\qquad T_i=\phi_{\text{tokenizer}}(\tau_i)
$$

其中 \(\tau_i\) 是类似 “timestamp: 15.0 seconds” 的文本。粗粒度定位时，时间戳不再插在每帧前，而是插在固定长度 segment 前：

$$
S=[T_1;S_1;T_2;S_2;\ldots;T_{N_s};S_{N_s};Q]
$$

这个设计让同一个模型能根据输入粒度输出不同尺度的边界：长视频先读出粗段位置，再对候选段重采样并细化边界。它比固定位置编码更容易迁移，因为时间是语言 token，不需要额外学习一套连续时间嵌入与 LLM 语义空间对齐。

训练目标仍然是标准自回归负对数似然，只在答案 token 上计算损失：

$$
\mathcal{L}(S,Y)=-\sum_{i=1}^{N_y}\log P(y_i\mid S,y_{<i};\theta)
$$

训练数据构造同时包含完整视频的粗粒度样本和包含 ground-truth moment 的短片段细粒度样本，并对长视频样本做重复采样以平衡分布。Video-centric training 进一步把同一视频下的多个 query-answer 对拼到同一个输入序列中，用 attention mask 阻止不同问答对互相看见，同时共享已编码的视频 token，从而避免长视频被重复加载和重复前向。

> 💡 关键：UniTime 的“零样本泛化”主要来自两个选择：时间戳以文本 token 进入 LLM，视频长度差异由 adaptive scaling 和 coarse-to-fine inference 处理。

#### 🧪 练习题
```yaml
question: "UniTime 为什么要把 timestamp 作为文本 token 插入视频 token 序列？"
options:
  - "让 MLLM 在语言空间中直接引用时间边界，减少额外时序嵌入对齐需求"
  - "让模型完全忽略视觉 token，只根据字幕回答"
  - "替代所有视频帧采样，从而不再需要视觉编码器"
  - "把 temporal grounding 退化为普通文本分类任务"
answer: 0
explain: "时间戳文本 token 与 LLM 原生语言空间兼容，模型可以生成或读出这些时间边界，同时支持不同粒度的粗到细定位。"
```
