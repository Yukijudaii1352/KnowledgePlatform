### MarkIt：用显式视觉标记提升视频时序定位

```yaml
id: markit
name: MarkIt
full_name: 显式视觉线索定位 (Explicit Visual Cues for Grounding)
year: '2026'
org: CVPR
paper_url: https://www.researchgate.net/publication/380000000
category: frontier_2026
parent: llava_video
motivation: 帧内嵌入语义标记增强定位
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/markit_detail.md
```

#### 📝 一句话总结

MarkIt 提出一种 training-free 的视频重写框架，把查询相关主体的分割掩码、语义标签和帧编号直接渲染进视频帧，解决 Vid-LLM 在长视频时序定位中缺少显式时间参照和稳定实体对应的问题。

#### 🎯 核心要点

- 提出 MarkIt：只改写输入视频，不修改 Vid-LLM 参数，可直接接入 Qwen2-VL、LLaVA-OV、InternVL2、LongVA 等模型
- 核心模块 Q2M-Bridge：从自然语言查询抽取 canonical subject tags，再用开放词表分割模型生成 query-conditioned instance masks
- 双重显式线索：每帧同时叠加语义实例标记和持久帧编号，把“找事件边界”转化为读取可见标记
- 采用 recall-first mask 保留策略：宁可保留冗余实例，也尽量避免漏掉查询主体
- 渲染顺序为 mask/contour 先行、文字后置，避免语义标签和帧编号被遮挡
- 覆盖 Moment Retrieval 和 Highlight Detection，实验使用 Charades-STA、ActivityNet、QVHighlights 等基准
- 支持纯推理增强，也兼容监督微调；在多种 Vid-LLM backbone 上持续提升时序定位精度

#### 🔬 深入细节

![MarkIt 框架图](https://arxiv.org/html/2604.25886v1/x1.png)
*图：MarkIt 先从查询中抽取主体，再把主体 mask 和帧编号写入视频帧，最后交给已有 Vid-LLM 输出时间区间。公开 arXiv 版本为 https://arxiv.org/html/2604.25886v1。*

MarkIt 的动机很直接：很多 Vid-LLM 能识别视频里发生了什么，却不擅长稳定地说出“从第几帧到第几帧”。原因不是单纯的语言能力不足，而是视频输入本身缺少两类可读线索：一是绝对或相对时间位置，二是查询主体在帧间的连续对应。MarkIt 的做法不是重新训练一个定位模型，而是构造一个 markerization operator \(\Phi\)，把原始视频 \(V\) 和查询 \(q\) 改写为带标记视频：

$$
\tilde{V}=\Phi(V,q)=R\left(V,\mathcal{B}(q,V),\mathcal{I}\right), \qquad
\hat{y}=M_\theta(\tilde{V}, p(q))
$$

其中 \(R\) 是渲染器，\(\mathcal{B}(q,V)\) 是查询相关的语义实例标记集合，\(\mathcal{I}\) 是每帧固定位置的编号标记，\(M_\theta\) 是被冻结的任意 Vid-LLM。对 Moment Retrieval，\(\hat{y}=(\hat{s},\hat{e})\)；对 Highlight Detection，\(\hat{y}\) 可以是帧或 clip 的相关性分数。

Q2M-Bridge 负责把语言查询变成可画在帧上的区域证据。它先用语言解析和归一化提取主体标签，例如把 “the man along the chair” 这类描述压缩成 `person`、`chair` 等更容易被开放词表分割模型识别的视觉类别；随后对每一帧、每个主体标签调用 text-conditioned open-vocabulary segmentation，得到实例掩码：

$$
\mathcal{Z}(q)=\{z_1,\ldots,z_K\},\qquad
\mathcal{P}_{t,j}=G(f_t,z_j)=\{m_{t,j}^{(1)},\ldots,m_{t,j}^{(n)}\}
$$

这里 \(G\) 可以由 YOLOE-Large 这类开放词表分割器实例化。MarkIt 不做激进的 top-k 筛选，而是保留所有候选 mask；这体现了它的定位偏好：多画几个无关实例最多增加一点视觉噪声，但漏掉真正的主体会直接破坏时间边界判断。

```python
# MarkIt 推理流程伪代码
def markit_temporal_grounding(video, query, vid_llm, instruction):
    # 1. 语言查询 -> 主体标签
    tags = extract_subject_tags(
        query,
        rules=["main grammatical subjects", "singular nouns", "person normalization"],
        max_tags=K,
    )

    marked_video = []
    for frame_id, frame in enumerate(video):
        semantic_markers = []

        # 2. 主体标签 -> 每帧开放词表实例 mask
        for tag in tags:
            masks = open_vocab_segment(frame, text=tag)
            for mask in masks:  # recall-first: 不按置信度强剪枝
                semantic_markers.append({"mask": mask, "label": tag})

        # 3. 叠加主体 mask、轮廓、语义文字和帧编号
        frame_index = {"anchor": "bottom_right", "label": str(frame_id)}
        marked_frame = render_markers(
            frame,
            region_markers=semantic_markers,
            index_marker=frame_index,
            fill_alpha=0.3,
            contour=True,
        )
        marked_video.append(marked_frame)

    # 4. 冻结 Vid-LLM 直接读取标记视频并生成时间边界
    prompt = instruction.format(query=query)
    answer = vid_llm.generate(video=marked_video, text=prompt)
    return parse_temporal_span_or_highlight_scores(answer)
```

渲染阶段把每一帧的标记集合写成：

$$
\mathcal{M}_t
=\{(m_{t,j}^{(r)}, z_j)\mid z_j\in\mathcal{Z}(q), m_{t,j}^{(r)}\in\mathcal{P}_{t,j}\}
\cup \{(a_{\text{idx}}, \mathrm{text}(t))\}
$$

被标记帧为：

$$
\tilde{f}_t=R(f_t,\mathcal{M}_t;\omega)
$$

其中 \(\omega\) 控制颜色、透明度、轮廓宽度、字体大小和帧编号位置。论文消融显示，中等透明度和适度轮廓通常优于过重遮挡；帧编号放在固定角落比放在画面中心更稳定。直觉上，标记要足够显眼，让 LLM 能读到；但不能遮住动作本身，否则定位证据反而被破坏。

与传统 VTG 模型相比，MarkIt 的关键差异在于它不学习一个新的时间边界回归头，也不要求额外时间戳监督。Moment-DETR、UniVTG 这类模型通常把视频和文本编码后在隐空间做匹配；MarkIt 则把“时间”和“主体对应”外显到像素空间，让已有 Vid-LLM 通过 OCR/视觉读取能力完成定位。它特别适合那些已经有强通用理解能力、但对帧号和实体跟踪不敏感的视频大模型。

MarkIt 和 LLaVA-Video 的关系也很清楚。LLaVA-Video 通过大规模合成视频指令数据提升视频问答和理解能力；MarkIt 则更像一个推理时插件，把帧内语义线索注入输入表示。前者主要改进模型训练数据，后者主要改进输入可解释性。因此 MarkIt 可以作为 LLaVA-Video 类模型的上层增强：不用重新训练，也能让模型更容易输出稳定的 \([\hat{s},\hat{e}]\)。

> 💡 关键：MarkIt 的核心不是“让模型学会定位”，而是把定位所需的主体和时间参照画出来，让冻结 Vid-LLM 少做隐式跟踪、多读显式线索。

#### 🧪 练习题

```yaml
question: "MarkIt 中 Q2M-Bridge 的主要作用是什么？"
options:
  - "把视频帧压缩成更少的视觉 token"
  - "把自然语言查询转换为主体标签，并进一步生成每帧的查询相关实例 mask"
  - "训练一个新的 DETR 边界回归头"
  - "用音频字幕替代视觉帧输入"
answer: 1
explain: "Q2M-Bridge 先抽取 canonical subject tags，再用开放词表分割模型得到实例 mask，供 MarkIt 渲染成显式视觉标记。"
```
