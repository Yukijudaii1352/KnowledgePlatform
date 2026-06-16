### S-CNN：面向未剪辑视频的多阶段时序动作定位网络

```yaml
id: scnn
name: S-CNN
full_name: 时序动作定位网络 (Segment-CNN)
year: '2016'
org: Columbia
paper_url: http://openaccess.thecvf.com/content_cvpr_2016/html/Shou_Temporal_Action_Localization_CVPR_2016_paper.html
category: localization
parent: —
motivation: 首个深度时序动作定位框架
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/scnn_detail.md
```

#### 📝 一句话总结

S-CNN 将 R-CNN 式“候选区域-分类-后处理”思想迁移到视频时间轴，提出 proposal、classification、localization 三阶段 3D ConvNet 框架，用 overlap-aware loss 提升未剪辑视频中的动作起止边界定位精度。

#### 🎯 核心要点

- 首个系统性使用 segment-based 3D ConvNets 处理未剪辑长视频时序动作定位的深度框架之一
- 用多尺度 temporal sliding window 生成候选片段，窗口长度为 16、32、64、128、256、512 帧，并使用 75% overlap
- 每个候选片段统一采样 16 帧，输入 C3D 风格 3D ConvNet，捕获外观与运动信息
- Proposal network 做 action/background 二分类，先过滤大量背景窗口以提升效率和精度
- Classification network 学习 \(K+1\) 类动作分类器，主要用于给 localization network 提供可靠初始化
- Localization network 引入 overlap loss，让预测分数和片段-真值 IoU 对齐，避免 NMS 保留“分类强但边界差”的片段
- 推理阶段只使用 proposal network 与 localization network，最后通过类别先验和 NMS 输出最终动作区间
- 在 IoU 0.5 下，MEXaction2 mAP 从 1.7% 提升到 7.4%，THUMOS 2014 mAP 从 15.0% 提升到 19.0%

#### 🔬 深入细节

![S-CNN 总体框架](https://ar5iv.labs.arxiv.org/html/1601.02129/assets/x1.png)
*图：S-CNN 的三阶段流程，包括多尺度候选片段生成、Segment-CNN 三个网络阶段和 NMS 后处理*

S-CNN 面向的任务是 temporal action localization：给定一个未剪辑长视频，不只判断视频里有什么动作，还要输出每个动作实例的开始和结束时间。论文将视频记为：

$$
X=\{x_t\}_{t=1}^{T}
$$

每个视频有一组动作标注：

$$
\Psi=\{(\psi_m,\psi'_m,k_m)\}_{m=1}^{M}
$$

其中 \(\psi_m,\psi'_m\) 是第 \(m\) 个动作实例的起止帧，\(k_m\in\{1,\dots,K\}\) 是动作类别。相比 trimmed action recognition，难点在于背景片段大量存在、动作持续时间差异很大、一个视频可能包含多个动作实例，而且分类分数高并不等价于边界准确。

候选片段生成直接在时间轴上做多尺度滑窗。S-CNN 对未剪辑视频使用 16、32、64、128、256、512 帧长度的窗口，每个尺度内部有 75% overlap；每个窗口再均匀采样 16 帧，缩放到 \(171 \times 128\)，输入 3D ConvNet。两个 temporal segments 的 IoU 可写为：

$$
\operatorname{IoU}([a,b],[c,d])=
\frac{\max(0,\min(b,d)-\max(a,c))}
{\max(b,d)-\min(a,c)}
$$

Proposal network 的作用类似 objectness detector，但对象从图像框变成时间片段。训练时，候选片段与所有 ground truth 的最大 IoU 大于 0.7 就标为 positive，小于 0.3 就标为 background；如果某个 ground truth 没有 IoU 大于 0.7 的窗口，则选择和它 IoU 最大且大于 0.5 的片段作为 positive。这个阶段不关心具体动作类别，只学习“这里是否可能包含目标动作”，因此能在推理时大量减少后续分类/定位计算。

Classification network 是普通 \(K+1\) 类分类器，其中第 0 类为 background。它使用 proposal 过滤后的片段训练动作类别判别能力，但论文明确指出它不是最终定位器：分类网络容易抓住片段内部的局部判别证据，即使候选窗口只覆盖了动作的一小段，也可能给出很高分类分数。这样的分数进入 NMS 后，会把 IoU 更高但分类分数略低的片段压掉，造成边界错误。

Localization network 复用 classification network 的结构和初始化，但加入 overlap-aware loss。对第 \(n\) 个训练片段，记真实类别为 \(k_n\)，softmax 后真实类别概率为 \(P_n^{(k_n)}\)，与关联 ground truth 的 IoU 为 \(v_n\)。总损失为：

$$
\mathcal{L}=\mathcal{L}_{\text{softmax}}+\lambda\mathcal{L}_{\text{overlap}}
$$

$$
\mathcal{L}_{\text{softmax}}
=\frac{1}{N}\sum_n -\log P_n^{(k_n)}
$$

$$
\mathcal{L}_{\text{overlap}}
=\frac{1}{N}\sum_n
\frac{1}{2}
\left(
\frac{(P_n^{(k_n)})^2}{(v_n)^\alpha}-1
\right)
\mathbb{1}[k_n>0]
$$

其中 \(\mathbb{1}[k_n>0]\) 表示 overlap loss 只作用于非背景片段。这个损失的直觉是：如果片段和真值高度重叠，模型应该给它更高置信度；如果片段只覆盖动作的一部分，即使分类正确，也不应该得到过高分数。论文指出正样本上的最优趋势是让 \(P_n^{(k_n)}\) 接近 \(\sqrt{(v_n)^\alpha}\)，也就是把分类置信度校准到时序重叠质量。

```python
# S-CNN 推理流程伪代码
def scnn_localize(video):
    candidates = []
    for length in [16, 32, 64, 128, 256, 512]:
        for window in sliding_windows(video, length=length, overlap=0.75):
            segment = uniform_sample(window, num_frames=16)
            candidates.append((window.start, window.end, segment))

    proposals = []
    for start, end, segment in candidates:
        p_action = proposal_network(segment)["action"]
        if p_action >= 0.7:
            proposals.append((start, end, segment))

    detections = []
    for start, end, segment in proposals:
        probs = localization_network(segment)      # K+1 类，0 是 background
        cls = argmax(probs)
        if cls != 0:
            score = probs[cls] * length_prior(cls, end - start)
            detections.append((start, end, cls, score))

    return temporal_nms(detections, threshold=eval_iou_threshold - 0.1)
```

与 R-CNN 的类比很清楚：多尺度滑窗对应 region proposals，3D ConvNet 对应候选特征提取，NMS 对应冗余去除。但 S-CNN 没有像 Faster R-CNN 那样回归边界偏移。论文尝试后认为动作持续时间和边界变化太多样，直接回归 start/end 不稳定；因此采用 overlap loss 重新校准候选片段分数，让 NMS 更倾向保留高 IoU 的候选。

S-CNN 的三个阶段分工也解释了为什么 classification network 虽然推理不用，但训练中不能省。Localization network 既要保持类别判别能力，又要学习 IoU-aware scoring；如果没有先训练好的分类网络初始化，定位网络直接从较难目标开始优化会更差。论文消融显示，去掉 proposal network 时 THUMOS 2014 mAP 为 17.1%，完整 S-CNN 为 19.0%；去掉 localization network 则会失去对边界质量的分数校准。

从历史位置看，S-CNN 的意义不在于今天的精度仍最高，而在于它把视频动作定位从“手工特征 + 滑窗 SVM/FV”推进到深度多阶段检测范式。后续 TAL 方法中的 proposal generation、boundary quality scoring、classification/localization 分离、NMS 后处理，都能在 S-CNN 中看到早期雏形。

#### 🧪 练习题

```yaml
question: "S-CNN 的 localization network 为什么要加入 overlap loss？"
options:
  - "为了减少 3D ConvNet 的参数量"
  - "为了让分类置信度反映候选片段与真实动作边界的 IoU，从而帮助 NMS 保留更准的片段"
  - "为了把所有背景片段都强制标为正样本"
  - "为了在推理阶段替代 proposal network"
answer: 1
explain: "普通分类分数可能偏爱只包含局部判别证据的片段；overlap loss 会压低低 IoU 正片段的分数，提高高 IoU 片段在 NMS 中被保留的机会。"
```
