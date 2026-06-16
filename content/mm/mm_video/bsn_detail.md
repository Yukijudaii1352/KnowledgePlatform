### BSN - 边界敏感网络 (Boundary Sensitive Network)
```yaml
id: bsn
name: BSN
full_name: 边界敏感网络 (Boundary Sensitive Network)
year: '2018'
org: CUHK
paper_url: https://arxiv.org/abs/1806.02964
category: localization
parent: cdc
motivation: 边界敏感机制生成高质量提案
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/bsn_detail.md
```

#### 📝 一句话总结
BSN 提出“local to global”的 temporal action proposal generation 框架，先在局部预测每个时间位置的 start/end/actionness 概率，再在全局用 Boundary-Sensitive Proposal feature 评估 proposal 质量。它解决了滑窗 proposal 边界不灵活、置信度不可靠的问题，成为后续 BMN 等边界匹配方法的重要前置工作。

#### 🎯 核心要点
- 使用 two-stream 网络提取 snippet-level 视频特征，作为 BSN 的输入序列。
- Temporal Evaluation Module (TEM) 同时预测 start probability、end probability 和 actionness probability。
- Proposal Generation Module (PGM) 直接组合高 start/end 概率位置，生成灵活长度、边界更精细的候选 proposal。
- Boundary-Sensitive Proposal (BSP) feature 从 proposal 的起点区间、中心区间和终点区间采样 actionness 序列。
- Proposal Evaluation Module (PEM) 用一层隐藏层 MLP 根据 BSP feature 回归 proposal 与真实动作的 IoU 置信度。
- 最终分数融合 \(p_{conf}\)、起点概率和终点概率，并用 Soft-NMS 抑制冗余 proposal。
- 在 ActivityNet-1.3 和 THUMOS14 上验证 proposal 质量，同时与分类器结合提升完整 temporal action detection。

#### 🔬 深入细节
![BSN framework](https://ar5iv.labs.arxiv.org/html/1806.02964/assets/eccv_framework.jpg)
*图：BSN 框架包含特征编码、TEM、PGM、PEM 和 Soft-NMS 后处理。*

```python
# BSN proposal generation and scoring
features = two_stream_encoder(video)

# 1. TEM 输出每个 temporal location 的局部概率
P_start, P_end, P_action = TEM(features)

# 2. 选取高概率或局部峰值位置作为候选边界
start_candidates = select_peaks(P_start)
end_candidates = select_peaks(P_end)

proposals = []
for ts in start_candidates:
    for te in end_candidates:
        duration = te - ts
        if d_min <= duration <= d_max and ts < te:
            # 3. 在起点、中心、终点区域采样 actionness，构造 BSP
            f_s = interpolate(P_action, ts - duration / 5, ts + duration / 5, num=8)
            f_c = interpolate(P_action, ts, te, num=16)
            f_e = interpolate(P_action, te - duration / 5, te + duration / 5, num=8)
            f_bsp = concat(f_s, f_c, f_e)

            # 4. PEM 预测 proposal 质量，并融合边界概率
            p_conf = PEM(f_bsp)
            p_final = p_conf * P_start[ts] * P_end[te]
            proposals.append((ts, te, p_final))

final_proposals = soft_nms(proposals)
```

BSN 的核心问题意识是：高质量 temporal proposal 需要同时满足“覆盖率高”和“边界精确”。传统滑窗或预定义 duration 的方法虽然容易枚举，但时间间隔固定，动作长度变化大时会产生大量边界偏粗的候选段；而只给这些候选段打分，并不能从根本上修正边界。BSN 因此先预测边界本身，再组合边界形成 proposal。

TEM 把每个 temporal location 看成一个候选事件点，输出三条概率序列：

$$
P_S=\{p^s_{t_n}\}_{n=1}^{l_s},\quad
P_E=\{p^e_{t_n}\}_{n=1}^{l_s},\quad
P_A=\{p^a_{t_n}\}_{n=1}^{l_s}
$$

其中 \(P_S\) 和 \(P_E\) 分别表示该位置作为动作开始/结束的概率，\(P_A\) 表示该位置位于动作内部的概率。TEM 的训练目标是三任务二分类损失：

$$
L_{TEM}=\lambda L_{bl}^{action}+L_{bl}^{start}+L_{bl}^{end}
$$

$$
L_{bl}=\frac{1}{l_s}\sum_{n=1}^{l_s}\left[-g_{t_n}\log p_{t_n}-(1-g_{t_n})\log(1-p_{t_n})\right]
$$

这里 \(\lambda=2\)，用来提高 actionness 分支的重要性。由于 start/end/actionness 都是序列预测，TEM 能一次性扫描视频并给出所有候选边界，而不是对每个滑窗重复计算。

PGM 的关键是 BSP feature。给定候选 proposal \(\varphi=[t_s,t_e]\)，设 \(d=t_e-t_s\)，BSN 定义中心区间 \(r_C=[t_s,t_e]\)，起点区间 \(r_S=[t_s-d/5,t_s+d/5]\)，终点区间 \(r_E=[t_e-d/5,t_e+d/5]\)。它分别在三段上从 \(P_A\) 采样：

$$
f_{BSP}=(f_s^A,f_c^A,f_e^A)
$$

直觉上，中心区间回答“proposal 内部是否像一个动作”，起点/终点区间回答“边界附近的 actionness 是否发生合理变化”。这比只用 proposal 内部平均特征更边界敏感，也解释了为什么 PEM 的输入不直接是视觉特征，而是围绕边界组织过的 actionness 序列。

PEM 将 BSP feature 输入 MLP，预测 \(p_{conf}\)，训练目标是回归该候选 proposal 与所有真实动作的最大 IoU：

$$
L_{PEM}=\frac{1}{N_{train}}\sum_{i=1}^{N_{train}}(p_{conf,i}-g_{iou,i})^2
$$

训练时论文把 \(g_{iou}>0.7\) 的 proposal 作为正样本，\(g_{iou}<0.3\) 的 proposal 作为负样本，并采样到约 \(1:2\) 的正负比例。推理时，最终 proposal 分数融合 PEM 置信度和两个边界概率：

$$
p_f=p_{conf}\cdot p^s_{t_s}\cdot p^e_{t_e}
$$

这个乘法设计很直接：一个 proposal 只有在“内部质量高、起点可信、终点可信”三者同时成立时才会得到高分。随后 Soft-NMS 对重叠 proposal 衰减分数：

$$
p_{f,i}'=
\begin{cases}
p_{f,i}, & \operatorname{IoU}(\varphi_m,\varphi_i)<\theta \\
p_{f,i}\cdot e^{-\operatorname{IoU}(\varphi_m,\varphi_i)^2/\varepsilon}, & \operatorname{IoU}(\varphi_m,\varphi_i)\ge\theta
\end{cases}
$$

> 💡 关键：BSN 不是简单“边界分类器 + 排序器”，而是把边界概率、动作内部概率和 proposal-level IoU 评估串成一个闭环；局部边界负责生成，BSP/PEM 负责全局质量校准。

#### 🧪 练习题
```yaml
question: "BSN 中 BSP feature 的主要作用是什么？"
options:
  - "直接替代 two-stream 特征提取器"
  - "把 proposal 起点、中心和终点区域的 actionness 序列编码成 proposal-level 质量特征"
  - "只用于 Soft-NMS 的 IoU 计算"
  - "生成视频级动作类别标签"
answer: 1
explain: "BSP feature 围绕 proposal 的边界和内部采样 actionness，使 PEM 能判断该候选段是否边界合理且包含完整动作。"
```
