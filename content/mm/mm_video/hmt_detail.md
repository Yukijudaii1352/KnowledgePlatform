### HMT：用于视频摘要的层次多模态 Transformer

```yaml
id: hmt
name: HMT
full_name: 层次多模态Transformer (Hierarchical Multimodal Transformer)
year: '2022'
org: —
paper_url: https://www.sciencedirect.com/science/article/pii/S0925231221015253
category: frontier_2026
parent: dsnet
motivation: 层次化融合视觉与音频
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/hmt_detail.md
```

#### 📝 一句话总结

HMT 提出用于关键镜头视频摘要的层次多模态 Transformer，把视频的 frame-shot-video 结构和视觉/音频双模态融合进两层注意力网络，解决 RNN 摘要模型难以建模全局依赖、多跳关系和音画互补信息的问题。

#### 🎯 核心要点

- 面向 key-shot based video summarization，输出每个 shot 被选入摘要的概率，再用长度约束选择关键镜头
- 用 KTS 将长视频切成 shot，并按照相同边界切分音频，使输入符合 frame-shot-video 的天然层次结构
- 第一层为 frame-level Transformer：视觉分支独立编码每个 shot 内帧序列，音频分支在视觉 query 指导下编码音频特征
- 第二层为 shot-level multimodal Transformer：把每个 shot 的视觉向量和视觉引导音频向量拼接后建模全局 shot 依赖
- 采用多头注意力捕获全局依赖和多跳关系，相比 LSTM 更适合并行处理长序列
- 使用 MSE 拟合人工标注的重要性分数，预测 shot 概率后扩展到 frame-level 评价
- 在 SumMe 和 TVsum 上验证层次结构、视觉引导音频融合和完整 HMT 均带来增益

#### 🔬 深入细节

![HMT 层次多模态 Transformer 架构](https://ar5iv.labs.arxiv.org/html/2109.10559/assets/x1.png)
*图：HMT 第一层由视觉 Transformer 与视觉引导的音频 Transformer 组成，第二层用多模态 Transformer 建模 shot 间关系并预测摘要概率。*

HMT 的任务是从一段长视频中选择能代表主要内容的关键镜头。早期视频摘要常把帧序列当作一条平坦时间序列，用 LSTM 或注意力直接预测 frame score；问题是视频通常由多个 shot 构成，同一个 shot 内帧变化平滑，不同 shot 之间才体现事件结构。HMT 因此先用 Kernel-based Temporal Segmentation (KTS) 切分 shot，再分别建模 shot 内 frame 依赖和 shot 间全局依赖。

第一层 frame-level Transformer 对每个 shot 单独运行。视觉分支接收 GoogLeNet pool-5 提取的帧特征，得到 shot 内帧的上下文表示，再通过 mean pooling 得到视觉 shot 表示。标准自注意力写作：

$$
Q=XW_Q,\quad K=XW_K,\quad V=XW_V
$$

$$
\operatorname{Attn}(Q,K,V)
=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d}}\right)V
$$

多头版本在不同子空间并行计算注意力，再拼接并线性映射。它比 LSTM 更适合摘要任务，因为任意两帧或两个 shot 可直接建立联系，不必依赖递归状态逐步传递。

音频分支不是简单把 VGGish 音频特征和视觉特征拼接，而是用视觉特征作为 query、音频特征作为 key/value 做视觉引导的跨模态注意力：

$$
H_i^a
=\operatorname{softmax}
\left(\frac{Q_i^v (K_i^a)^\top}{\sqrt{d}}\right)V_i^a
$$

这样设计的原因是音频和画面并不总是严格同步：画面中可能没有发声物体，背景音乐也可能与视觉事件弱相关。视觉 query 相当于询问“当前 shot 的视觉内容需要哪些音频证据”，让模型更关注与画面一致或互补的音频片段，降低直接拼接带来的模态干扰。

第一层完成后，每个 shot 得到视觉向量 \(s_i^v\) 和音频向量 \(s_i^a\)，二者拼接为多模态 shot 表示：

$$
z_i=[s_i^v; s_i^a]
$$

第二层 shot-level Transformer 接收 \(\{z_1,\dots,z_N\}\)，建模整个视频中的 shot 间关系，最后用一个预测头输出每个 shot 的选择概率：

$$
H^s=\operatorname{Transformer}_{\text{shot}}(z_1,\dots,z_N)
$$

$$
p_i=\sigma(Wh_i^s+b)
$$

训练时将 shot 概率扩展回帧级概率，与人工重要性分数做均方误差：

$$
\mathcal{L}_{\text{MSE}}
=\frac{1}{T}\sum_{t=1}^{T}
\left(\hat{p}_t-y_t\right)^2
$$

推理时，模型先得到每个 shot 的重要性，再在摘要长度不超过原视频 15% 的约束下，用动态规划把选择问题转成 knapsack，选出得分最高的一组关键 shot。这一点很实用：模型不需要逐帧生成摘要，而是输出可排序、可约束优化的概率曲线。

```python
# HMT 视频摘要流程伪代码
def hmt_summarize(video):
    frames = sample_frames(video, fps=2)
    visual_feats = googlenet_pool5(frames)          # [T, 1024]
    audio_feats = vggish(segment_audio(video))      # [T_audio, 128]

    shot_boundaries = kts(frames)
    visual_shots = split_by_boundaries(visual_feats, shot_boundaries)
    audio_shots = split_by_boundaries(audio_feats, shot_boundaries)

    shot_tokens = []
    for v_seq, a_seq in zip(visual_shots, audio_shots):
        v_context = visual_transformer(v_seq)
        v_shot = mean_pool(v_context)

        # audio is encoded under visual guidance
        q = linear_q(v_context)
        k = linear_k(a_seq)
        value = linear_v(a_seq)
        a_context = softmax(q @ k.T / sqrt(dim)) @ value
        a_shot = mean_pool(a_context)

        shot_tokens.append(concat(v_shot, a_shot))

    global_context = shot_transformer(shot_tokens)
    shot_scores = sigmoid(linear(global_context))
    summary = knapsack_select(shot_scores, max_duration=0.15 * video.duration)
    return summary
```

HMT 的消融结果说明了三个组件的作用：单模态 Transformer 已经优于对应 LSTM，说明全局注意力对视频摘要有效；直接两流拼接的 Two-stream Transformer 反而可能不如视觉 Transformer，说明音画模态差异会引入噪声；加入视觉引导的 Multimodal Transformer 后性能提升，说明跨模态融合需要显式对齐。完整 HMT 再叠加层次结构，在 SumMe 和 TVsum 的 F-measure 上分别达到 0.441 和 0.601。

与 DSNet 这类 detect-to-summarize 思路相比，HMT 更强调输入结构与模态结构：它没有把摘要看成独立 proposal 检测问题，而是先尊重 shot 边界，再在 shot 内和 shot 间分别建模。它的优势是结构清晰、可解释性较强，能展示每个 shot 的概率曲线；局限是依赖预提取视觉/音频特征和 KTS 边界，且论文也指出音画异步和局部 object-aware 特征仍未充分解决。

> 💡 关键：HMT 的多模态融合不是“视觉 + 音频直接拼接”，而是先用视觉引导音频注意力，再把 shot 级音画表示送入第二层全局 Transformer。

#### 🧪 练习题

```yaml
question: "HMT 为什么要采用两层层次结构，而不是把所有帧直接输入一个 Transformer？"
options:
  - "因为视频摘要只需要音频，不需要视觉帧信息"
  - "因为视频天然具有 frame-shot-video 结构，先建模 shot 内帧关系再建模 shot 间关系更符合任务"
  - "因为 Transformer 只能处理固定长度为 1 的序列"
  - "因为 KTS 会直接给出最终摘要，不需要模型预测"
answer: 1
explain: "HMT 先用 frame-level Transformer 得到每个 shot 的表示，再用 shot-level Transformer 捕获全局 shot 依赖，既符合视频层次结构，也降低长序列建模负担。"
```
