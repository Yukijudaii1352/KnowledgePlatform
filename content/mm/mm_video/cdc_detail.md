### CDC - 卷积反卷积网络 (CDC Network)
```yaml
id: cdc
name: CDC
full_name: 卷积反卷积网络 (CDC Network)
year: '2017'
org: Columbia
paper_url: http://openaccess.thecvf.com/content_cvpr_2017/html/Shou_CDC_Convolutional-De-Convolutional_Networks_CVPR_2017_paper.html
category: localization
parent: scnn
motivation: 反卷积实现精确边界定位
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/cdc_detail.md
```

#### 📝 一句话总结
CDC 提出 Convolutional-De-Convolutional filter，在 3D ConvNets 之后同时做时间维反卷积上采样和空间维卷积下采样，解决 S-CNN 等 proposal 级方法边界只能停留在候选段上的问题。它把视频动作定位从“给 proposal 打分”推进到“逐帧输出类别置信度，再回修 proposal 边界”。

#### 🎯 核心要点
- 在 C3D 主干之后堆叠 CDC6、CDC7、CDC8，使时间分辨率从 \(L/8\) 恢复到 \(L\)，空间尺寸从 \(4\times4\) 压到 \(1\times1\)。
- CDC filter 将一组空间卷积核按时间维耦合，等价于“空间卷积 + 时间反卷积”的联合操作，而不是串联两个独立层。
- 利用 C3D 预训练 FC 层初始化 CDC 层，缓解联合卷积-反卷积参数更多、直接训练困难的问题。
- 训练时使用 frame-wise softmax loss，让每一帧都参与监督并输出 \(K+1\) 类置信度。
- 推理时先扩展 proposal，再用逐帧分数估计类别和收缩边界，提升高 tIoU 阈值下的定位精度。
- 主要验证在 THUMOS14 与 ActivityNet Challenge 2016；论文报告 CDC 网络本身可达到约 500 FPS。

#### 🔬 深入细节
![CDC temporal localization framework](https://ar5iv.labs.arxiv.org/html/1703.01515/assets/x1.png)
*图：CDC 将原始视频送入 3D ConvNets 和 CDC 层得到逐帧分数，再结合 proposal 进行精确边界定位。*

```python
# CDC temporal boundary refinement
for proposal in proposals:
    ts, te = proposal.start, proposal.end
    length = te - ts + 1

    # 1. 扩展 proposal，给边界回修留出搜索范围
    ext_start = max(video_start, ts - alpha * length)
    ext_end = min(video_end, te + alpha * length)

    # 2. CDC 输出每一帧对每个类别的置信度
    scores = CDC(video_frames[ext_start:ext_end + 1])  # shape: T x K
    cls = argmax(mean(scores, axis="time"))

    # 3. 用该类别的逐帧分数估计阈值，并从两端向中间收缩
    class_scores = scores[:, cls]
    mu, sigma = gaussian_kde_stats(class_scores)
    threshold = mu - sigma

    left = ext_start
    while left < ext_end and scores[left - ext_start, cls] < threshold:
        left += 1

    right = ext_end
    while right > left and scores[right - ext_start, cls] < threshold:
        right -= 1

    refined_score = mean(scores[left - ext_start:right - ext_start + 1, cls])
    emit(start=left, end=right, category=cls, score=refined_score)
```

CDC 的直接动机是 S-CNN 这类两阶段方法的边界瓶颈：proposal 可以被分类器打出更高或更低的分数，但最终边界仍然继承候选段本身。如果候选段开始/结束时间偏粗，定位结果在高 tIoU 阈值下会明显吃亏。CDC 因此不再只预测 segment-level score，而是在 proposal 覆盖的扩展片段中产生 frame-level score sequence，让边界可以根据每帧置信度重新收缩。

核心算子是 CDC filter。C3D 的前几层适合建模动作语义，但池化会把时间长度从 \(L\) 降到 \(L/8\)；动作定位又需要回到帧级时间分辨率。CDC filter 用一个三维核 \(F\in\mathbb{R}^{k_l\times k_h\times k_w}\) 同时完成两件事：在空间上像卷积一样汇聚 \(k_h\times k_w\) 感受野，在时间上像反卷积一样产生 \(k_l\) 个连续输出：

$$
Y[c]=\sum_{a=1}^{k_h}\sum_{b=1}^{k_w}F[c,a,b]\cdot X[a,b],\quad c=1,\dots,k_l
$$

这个设计比“先 conv6 再 deconv6”的串联方案更强，因为每个时间输出 \(Y[c]\) 有独立的空间卷积核；串联方案中多个上采样时间点共享同一个高层语义响应。论文也意识到 CDC filter 参数更多，所以将 C3D 的 FC6/FC7 转换成卷积核后复制初始化到 CDC6/CDC7 中，使网络可以从已有动作识别模型平滑迁移。

网络结构上，C3D 的 conv1a 到 conv5b 先把输入变成 \(L/8\) 个 \(4\times4\) 特征图；CDC6 把时间从 \(L/8\) 上采样到 \(L/4\)，同时把空间压到 \(1\times1\)；CDC7 和 CDC8 继续各做 2 倍时间上采样，最终得到 \((K+1)\times L\times1\times1\) 的逐帧类别 logits。训练目标是逐帧 softmax：

$$
\mathcal{L}=\frac{1}{N}\sum_{n=1}^{N}\sum_{t=1}^{L}-\log\left(P_n^{(z_n)}[t]\right)
$$

其中 \(P_n^{(z_n)}[t]\) 是第 \(n\) 个训练片段在第 \(t\) 帧对真实类别的概率。这个损失让 CDC 层不仅学会“动作是什么”，还学会“动作在时间上何时出现/消失”。

推理阶段 CDC 仍依赖外部 proposal，但它改变了 proposal 的用法：proposal 只是粗搜索区域，最终类别由该区域逐帧平均分数决定，边界则用类别分数曲线回修。论文采用高斯核密度估计得到分数分布的 \(\mu\) 和 \(\sigma\)，并以 \(\mu-\sigma\) 作为保守阈值，从扩展段两端向中间移动，直到遇到足够高的动作置信度。这样可以把原本偏长的候选段裁到更贴近真实动作的时间范围。

> 💡 关键：CDC 的贡献不只是“用了反卷积”，而是把反卷积限制在时间维、把卷积保留在空间维，从而正好匹配“时间要恢复分辨率、空间要聚合语义”的动作定位需求。

#### 🧪 练习题
```yaml
question: "CDC filter 相比单独串联 conv 和 deconv 的核心优势是什么？"
options:
  - "减少所有层的参数量"
  - "同时进行空间下采样和时间上采样，并为不同时间输出学习独立空间语义"
  - "完全不需要 proposal"
  - "只使用光流特征即可完成定位"
answer: 1
explain: "CDC filter 将多个空间卷积核按时间维耦合，既恢复帧级时间分辨率，又避免多个上采样时间点共享同一个高层响应。"
```
