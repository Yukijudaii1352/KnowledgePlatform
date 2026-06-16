### HiTeA (2026)
```yaml
id: hitea
name: HiTeA
full_name: 层次时序对齐 (Hierarchical Temporal Alignment)
year: '2026'
org: ICLR
paper_url: https://iclr.cc/virtual/2026/poster/HiTeA
category: frontier_2026
parent: univtg
motivation: 无需训练的层次化定位框架
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/hitea_detail.md
```

#### 📝 一句话总结
HiTeA 提出一个完全 training-free 的长视频时序定位框架，通过事件、场景、动作三层时间分解生成候选片段，再用冻结 VLM 打分和候选精炼完成自然语言查询到时间区间的定位。

#### 🎯 核心要点
- 无需任务标注、无需微调，直接组合冻结的特征提取器、VideoCLIP 与 VLM 完成 zero-shot temporal grounding。
- Hierarchical Temporal Decomposition (HTD) 将视频拆成 event、scene、action 三种粒度，显式建模长视频层次结构。
- Temporal Signal Construction 使用 ViT 表示语义事件、DINO 表示场景/镜头变化、RAFT 光流表示动作边界。
- 边界检测采用事件级局部极小值阈值与场景/动作级 PELT change point detection。
- 长视频启用 hierarchical merging，保证 event ⊃ scene ⊃ action 的包含关系；短视频可绕过该约束以保留候选多样性。
- 两阶段候选打分：先用 VideoCLIP 粗过滤与相邻段合并，再用冻结 VLM 做 query-conditioned 细粒度相似度评分。
- Candidate Refinement 通过分数融合、跨层 progressive merging 和排名输出最终时间段。

#### 🔬 深入细节
![HiTeA ICLR 2026 官方海报](https://iclr.cc/media/PosterPDFs/ICLR%202026/10006820.png?t=1775547230.391188)
*图：ICLR 2026 官方 poster，展示 HiTeA 的层次分解、候选评分与候选精炼流程。*

HiTeA 针对的是训练无关的长视频 temporal grounding：给定未裁剪视频 \(V=\{f_1,\ldots,f_T\}\) 和查询 \(Q\)，输出与查询语义最匹配的时间区间 \((\hat{t}_s,\hat{t}_e)\)。它的核心判断是：VLM 很擅长判断“发生了什么”，但不天然擅长“什么时候发生”；因此先用显式时间结构生成高质量候选，再把 VLM 用在候选排序上。

```python
# HiTeA training-free temporal grounding 伪代码
def hitea_ground(video, query, is_long_video=True):
    vit_feat = frozen_vit(video.frames)          # event-aware semantic context
    dino_feat = frozen_dino(video.frames)        # scene/shot transitions
    flow_feat = frozen_raft(video.frame_pairs)   # action/motion dynamics

    event_curve = cosine_to_current_segment_mean(vit_feat)
    scene_curve = cosine_consecutive(dino_feat)
    action_curve = -l2_norm(flow_feat)

    event_points = local_minima(event_curve, threshold="tau_k")
    scene_points = pelt_change_points(scene_curve)
    action_points = pelt_change_points(action_curve)

    if is_long_video:
        scene_points = hierarchical_merge(event_points, scene_points, tolerance="alpha")
        action_points = hierarchical_merge(scene_points, action_points, tolerance="alpha")

    candidates = build_segments([event_points, scene_points, action_points])
    clip_scores = videoclip_similarity(candidates, query)
    candidates = merge_adjacent_if_score_close(candidates, clip_scores, beta="beta")
    candidates = top_k_per_level(candidates, clip_scores)

    vlm_scores = frozen_vlm_score(candidates, query)
    final_scores = lambda_ * vlm_scores + (1 - lambda_) * normalize(clip_scores)
    refined = progressive_merge_across_levels(candidates, final_scores)
    return argmax(refined, key="final_score")
```

第一步是构造三类互补的时间信号。对每一帧 \(f_t\)，HiTeA 用冻结编码器抽取特征：

$$
v_t^{\text{vit}}=\phi_{\text{ViT}}(f_t),\quad
v_t^{\text{dino}}=\phi_{\text{DINO}}(f_t),\quad
v_t^{\text{flow}}=\phi_{\text{RAFT}}(f_t,f_{t+1})
$$

然后分别构造事件、场景、动作级相似度曲线：

$$
s_t^{\text{event}}=
\frac{v_t^{\text{vit}}\cdot \bar{v}_{t-1}^{\text{vit}}}
{\|v_t^{\text{vit}}\|\|\bar{v}_{t-1}^{\text{vit}}\|},\quad
s_t^{\text{scene}}=
\frac{v_t^{\text{dino}}\cdot v_{t-1}^{\text{dino}}}
{\|v_t^{\text{dino}}\|\|v_{t-1}^{\text{dino}}\|},\quad
s_t^{\text{action}}=-\|v_t^{\text{flow}}\|_2
$$

其中 \(\bar{v}_{t-1}^{\text{vit}}\) 是当前事件段内历史 ViT 特征均值。事件级信号关注长程语义转折，场景级信号关注镜头/结构变化，动作级信号则通过光流强度捕捉短时动作边界。论文还对这些曲线做 Gaussian smoothing，以降低噪声。

HTD 的关键是“先粗后细”的候选边界组织。事件级边界来自相似度曲线低于阈值的局部极小值，场景级和动作级边界用 PELT 检测非线性分布变化。长视频中，HiTeA 用合并函数 \(M(\cdot)\) 把高层边界注入低层边界：如果高层边界附近 \(\alpha\) 容差内已有低层边界，就用高层边界替换最近点；否则插入高层边界。这样能让 action segment 不脱离 scene/event 的上位结构。

候选评分分成粗过滤和细评分。VideoCLIP 先计算候选片段与查询的粗相似度 \(s_{\text{clip}}\)，并把相邻且分数接近的候选合并：

$$
|s_{\text{clip}}^i-s_{\text{clip}}^j|<\beta
$$

这样可以减少碎片化并降低 VLM 调用成本。随后冻结 VLM 对保留候选打分得到 \(s_{\text{vlm}}\)。最终分数融合为：

$$
s_{\text{final}}=\lambda s_{\text{vlm}}+(1-\lambda)s_{\text{clip}}
$$

这里 \(s_{\text{vlm}}\) 负责语义对齐，归一化后的 \(s_{\text{clip}}\) 提供连续分值来打破 VLM 离散打分导致的并列。最后 Candidate Refinement 会跨 action、scene、event 候选做 progressive merging，把时间上接近且语义分数一致的候选整合成更稳定的预测，并输出：

$$
(\hat{t}_s,\hat{t}_e)=\arg\max_{c_i\in S_{\text{final}}} s_{\text{final}}^{(i)}
$$

> 💡 关键：HiTeA 的创新不在于训练更大的定位器，而在于把长视频的时间结构显式暴露给冻结 VLM，使其只需要判断候选片段和查询的语义匹配。

#### 🧪 练习题
```yaml
question: "HiTeA 中 HTD 模块的核心作用是什么？"
options:
  - "用事件、场景、动作三层边界生成结构化候选片段"
  - "用监督标注训练一个新的 DETR 定位网络"
  - "将所有视频统一裁成固定长度并随机采样"
  - "只依赖语言模型生成时间戳，不使用视觉特征"
answer: 0
explain: "HTD 通过多层时间信号和层次合并构造 event/scene/action 候选，为后续 VideoCLIP 与 VLM 打分提供显式时间结构。"
```
