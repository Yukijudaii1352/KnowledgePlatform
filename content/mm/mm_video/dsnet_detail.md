### DSNet — 检测摘要网络 (Detect-to-Summarize)

```yaml
id: dsnet
name: DSNet
full_name: 检测摘要网络 (Detect-to-Summarize)
year: '2020'
org: —
paper_url: https://ieeexplore.ieee.org/abstract/document/9275314/
category: video_llm
parent: —
motivation: 时序提案机制做视频摘要
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/dsnet_detail.md
```

#### 📝 一句话总结

DSNet 将监督式视频摘要改写为时序兴趣检测问题，用 anchor-based 或 anchor-free 方式同时预测片段重要性和时间边界，再通过 KTS 分镜与 0/1 背包选择生成受长度约束的摘要。

#### 🎯 核心要点

- **Detect-to-Summarize 范式**：不只预测每帧重要性，而是检测“值得进入摘要的时间片段”，同时考虑片段完整性和重要性
- **长程特征建模**：GoogLeNet 提取帧特征，默认用 self-attention 建模长程依赖，并将长程表示与原始视觉特征相加
- **Anchor-based DSNet**：在每个时间位置生成多尺度 temporal interest proposals，对 proposal 做重要性分类和中心/长度偏移回归
- **Anchor-free DSNet**：去掉预定义 proposal，逐时间位置直接预测重要性分数、左右边界距离和 center-ness 分数
- **检测式训练损失**：anchor-based 使用交叉熵 + Smooth L1 回归；anchor-free 使用 focal loss + tIoU loss + center-ness BCE
- **摘要生成后处理**：NMS 去除高重叠低质量片段，KTS 切分 shot，片段分数转换为 shot 分数，最后用 15% 视频长度预算下的 0/1 背包选择关键 shot
- **主要数据集**：在 SumMe 和 TVSum 上验证两种 DSNet 形式，并与 LSTM、attention、强化学习等摘要方法对比

#### 🔬 深入细节

##### 核心框架图

![DSNet Detect-to-Summarize 框架](https://raw.githubusercontent.com/li-plus/DSNet/master/docs/framework.jpg)
*图：DSNet 同时提供 anchor-based 与 anchor-free 两条路径，前者生成 temporal interest proposals，后者逐位置直接预测 segment；二者最终都通过 NMS、KTS 和背包选择生成视频摘要。*

##### 算法流程

```python
# DSNet 推理流程伪代码：anchor-based 与 anchor-free 共享后处理
def dsnet_summarize(video, mode="anchor_free"):
    frame_feats = googlenet_without_last_layers(video)
    long_range = self_attention(frame_feats)
    x = frame_feats + long_range

    if mode == "anchor_based":
        segments = []
        for t in range(len(x)):
            for length in [4, 8, 16, 32]:
                proposal = [t - length / 2, t + length / 2]
                pooled = temporal_average_pool(x, proposal)
                score, delta_c, delta_l = cls_reg_head(pooled)
                refined = refine_center_length(proposal, delta_c, delta_l)
                segments.append((refined, score))
    else:
        segments = []
        for j in range(len(x)):
            score, delta_l, delta_r, center = anchor_free_head(x[j])
            start = j - exp(delta_l)
            end = j + exp(delta_r)
            confidence = score * center
            segments.append(([start, end], confidence))

    segments = nms_1d(segments)
    frame_scores = assign_max_segment_score_to_frames(segments, len(video))
    shots = kernel_temporal_segmentation(video)
    shot_scores = average_frame_scores_in_each_shot(frame_scores, shots)
    summary = zero_one_knapsack(shots, shot_scores, budget=0.15 * len(video))
    return summary
```

##### 方法解读

**动机：帧级重要性预测容易破坏片段完整性。** 传统监督式视频摘要通常分三步：预测帧级重要性、把视频切成 shot、在长度预算内选择关键 shot。问题是，帧级分数不能显式表达“一个完整事件片段从哪里开始、到哪里结束”，同一语义片段内部也可能出现不一致的重要性分数，导致摘要片段不完整或边界不合理。DSNet 借鉴目标检测和时序动作定位，把摘要目标改写为“检测 temporal interest segment”：不仅判断重要，还要回归位置。

**Anchor-based DSNet 使用多尺度时序提案覆盖不同长度兴趣片段。** 给定 \(T\) 帧视频，在每个时间位置 \(t\)，模型生成 \(K\) 个固定长度 proposal：

$$
[t-l_k/2,\;t+l_k/2), \quad k=1,\ldots,K.
$$

论文根据 SumMe/TVSum 中 ground-truth segment 长度范围和正样本 tIoU 阈值 \(\zeta=0.6\) 推导多尺度 proposal 应满足：

$$
l_k/l_{k+1}\geq \zeta^2,\quad l_K\geq \zeta \ell_2,\quad l_1\leq \ell_1/\zeta.
$$

实践中选用长度 \(4,8,16,32\)，平衡召回和效率。训练时 proposal 与任一真实片段 tIoU \(>0.6\) 标为正样本；tIoU \(=0\) 的无关片段和 \(0<tIoU<0.3\) 的不完整片段标为负样本。这一点很关键：DSNet 明确把“不完整但有重叠”的片段当作负例，让分类头学习片段完整性。

**Anchor-based 分类回归头同时预测重要性和边界修正。** 对任意长度 proposal 先做 temporal average pooling 得到固定长度特征，再经过共享全连接层和两个 sibling branches：分类分支输出 proposal 重要性，回归分支输出中心偏移和长度偏移。多任务损失为：

$$
L(p,p^\*,t,t^\*)=
\frac{1}{N}\sum_i L_{\text{cls}}(p_i,p_i^\*)+
\frac{\lambda}{N_{pos}}\sum_i p_i^\* L_{\text{reg}}(t_i,t_i^\*).
$$

其中 \(L_{\text{cls}}\) 是交叉熵，\(L_{\text{reg}}\) 是 Smooth L1；回归目标为：

$$
\delta c_i^\*=\frac{c_i^\*-c_i}{l_i},\quad
\delta l_i^\*=\log\frac{l_i^\*}{l_i}.
$$

这与目标检测中的 bbox regression 很接近，只是空间框变成了一维时间段。

**Anchor-free DSNet 去掉 proposal，减少超参数和类别不平衡。** Anchor-based 需要密集 proposal、正负采样比例、proposal 尺度和 NMS 阈值等超参数，而且大多数 proposal 是负样本。Anchor-free 版本直接在每个时间位置 \(j\) 预测该帧是否属于摘要片段，以及到左右边界的距离：

$$
\delta_l^\*=j-t_o^s,\quad \delta_r^\*=t_o^e-j.
$$

模型用 \(\exp(\cdot)\) 保证预测距离为正，并增加 center-ness 约束，降低靠近边界位置生成低质量片段的影响：

$$
v_e^\*=\frac{\min(\delta_l^\*,\delta_r^\*)}{\max(\delta_l^\*,\delta_r^\*)}.
$$

训练损失为：

$$
L=\frac{1}{N_{pos}}\sum_j L_{\text{cls}}(s_j,s_j^\*)+
\frac{\lambda}{N_{pos}}\sum_e L_{\text{reg}}(\delta t_e,\delta t_e^\*),
$$

$$
L^\*=L+\frac{\mu}{N_{pos}}\sum_e L_{\text{center}}(v_e,v_e^\*).
$$

其中分类采用 focal loss 处理正负不平衡，位置回归采用 tIoU loss，更适合不同长度的时序片段。

**后处理把检测结果变成可评估的视频摘要。** 无论 anchor-based 还是 anchor-free，推理都会得到大量重叠候选片段。DSNet 先用 NMS 过滤冗余片段，再把每一帧的分数设为覆盖该帧的候选片段最大分数。之后使用 KTS 将视频切成 shots，并计算第 \(h\) 个 shot 的平均重要性：

$$
y_h=\frac{1}{n_h}\sum_{r=1}^{n_h}s_{h,r}.
$$

最后按照视频摘要评测惯例，摘要长度不能超过原视频的 15%，因此选择 shot 被写成 0/1 背包：

$$
\max \sum_{h=1}^{c}u_h y_h,\quad
\text{s.t.}\ \sum_{h=1}^{c}u_h n_h\leq 0.15T,\quad u_h\in\{0,1\}.
$$

**与普通摘要网络的区别在于显式建模“边界”。** LSTM/attention 摘要方法通常只学习重要性曲线，边界依赖 KTS 或后处理间接决定；DSNet 把摘要片段当作检测目标，训练时就要求模型判断完整 proposal 或直接预测 segment boundaries。Anchor-free 进一步把“预定义 anchor”放宽为每个时间位置动态生成的柔性片段，因此工程上更简单、推理也更快。

#### 🧪 练习题

```yaml
question: "DSNet 相比传统帧级重要性预测方法的关键改动是什么？"
options:
  - "只使用视频标题作为监督信号"
  - "将视频摘要建模为时序兴趣片段检测，同时预测重要性和时间边界"
  - "完全取消 KTS 和背包选择，直接输出整段视频"
  - "把所有帧平均采样为固定数量的图像分类样本"
answer: 1
explain: "DSNet 的 Detect-to-Summarize 思路把摘要片段当作检测目标，显式学习 proposal/segment 的重要性和边界，从而缓解帧级分数导致的片段不完整问题。"
```
