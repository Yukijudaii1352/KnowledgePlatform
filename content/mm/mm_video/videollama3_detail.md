### VideoLLaMA 3：视觉中心的图像与视频理解基础模型

```yaml
id: videollama3
name: VideoLLaMA 3
full_name: 视觉中心架构 (VideoLLaMA 3)
year: '2025'
org: Alibaba
paper_url: https://github.com/DAMO-NLP-SG/VideoLLaMA3
category: video_llm
parent: videollama
motivation: 动态分辨率视觉编码
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/videollama3_detail.md
```

#### 📝 一句话总结

VideoLLaMA 3 提出视觉中心的图像/视频 MLLM 框架，用任意分辨率视觉 token 化和差分帧剪枝解决固定分辨率编码、视频 token 冗余和图像能力向视频迁移不足的问题。

#### 🎯 核心要点

- 采用 SigLIP 视觉编码器、两层 MLP projector、DiffFP 视频压缩器和 Qwen2.5 系列 LLM 构成统一图像/视频理解模型
- 提出 Any-resolution Vision Tokenization (AVT)，用 2D-RoPE 替换 ViT 绝对位置编码，使视觉编码器处理动态分辨率与非常规长宽比
- 提出 Differential Frame Pruner (DiffFP)，在像素 patch 空间比较相邻帧 1-norm 差异，剪除低变化区域的视觉 token
- 采用四阶段视觉中心训练：Vision Encoder Adaptation、Vision-Language Alignment、Multi-task Fine-tuning、Video-centric Fine-tuning
- 构建 VL3-Syn7M，从 COYO-700M 经宽高比过滤、美学过滤、图文相似度过滤、KNN 多样性选择和 InternVL2 重标注得到 7M 高质量图文对
- 把高质量图像-文本数据作为视频理解基础，先强化 OCR、文档、图表、数学等图像能力，再用视频数据补齐时序理解
- 在图像和视频基准上同时保持强性能，避免许多视频 LLM 只提升视频任务但牺牲高分辨率图像理解的问题

#### 🔬 深入细节

![VideoLLaMA 3 总体流水线](https://ar5iv.labs.arxiv.org/html/2501.13106v2/assets/x3.png)
*图：VideoLLaMA 3 的整体框架，核心包含 AVT、DiffFP、高质量图像重标注数据和四阶段训练。*

VideoLLaMA 3 的“视觉中心”有两层含义。训练上，它认为视频本质上是时间相关的图像序列，因此应先把图像理解底座做强，再迁移到视频；架构上，它把视觉编码器改造成可接收任意分辨率输入的 tokenizer，并为视频增加 token 压缩器。这个取向与只在视频指令数据上继续微调的做法不同：模型先获得文档、图表、场景文字和细粒度视觉定位能力，再学习跨帧动态关系。

AVT 解决的是固定分辨率 ViT 的信息损失问题。传统 SigLIP/CLIP 类 ViT 通常绑定预训练分辨率和绝对位置编码，输入高分辨率文档或极端长宽比图像时，要么缩放导致文字模糊，要么切块后失去原图空间关系。VideoLLaMA 3 将绝对位置编码替换为二维 RoPE，让 patch token 的位置由其二维坐标决定：

$$
N(H,W)=\left\lceil \frac{H}{P} \right\rceil
\left\lceil \frac{W}{P} \right\rceil
$$

$$
\operatorname{AVT}(I)
= \left\{ \operatorname{ViT}_{\text{2D-RoPE}}(x_{u,v}, u, v)
\mid 1 \le u \le H/P,\ 1 \le v \le W/P \right\}
$$

其中 \(P\) 是 patch 大小，\((u,v)\) 是 patch 在原图网格中的二维位置。这样，视觉 token 数量会随图像大小自然变化，而不是被压到固定长度；LLM 接收到的是更接近原始图像结构的 token 序列。Stage 1 专门训练视觉编码器和 projector，让 SigLIP 从固定分辨率编码器适配为动态分辨率处理器。

![VideoLLaMA 3 DiffFP 流程](https://ar5iv.labs.arxiv.org/html/2501.13106v2/assets/x4.png)
*图：DiffFP 在像素空间比较相邻帧 patch 差异，剪除变化很小的后续 patch token。*

视频输入的瓶颈不只是分辨率，还有 token 冗余。若把每帧都按 AVT 展开，长视频会产生大量静态背景 token。DiffFP 的策略很直接：先在像素空间比较相邻帧同位置 patch 的 1-norm 距离，若小于阈值 \(\tau=0.1\)，说明该 patch 相对上一帧变化很小，后续帧对应 token 可以剪除：

$$
d_{t,p}=\left\| \operatorname{patch}(F_t,p)-\operatorname{patch}(F_{t-1},p) \right\|_1
$$

$$
m_{t,p}=\mathbb{1}[d_{t,p}\ge \tau]
$$

论文还在视觉编码后对视频 token 做每帧 \(2 \times 2\) 空间下采样，以控制上下文长度。DiffFP 的好处是决策发生在便宜的像素 patch 差分上，不需要额外训练一个复杂剪枝网络；同时它保留运动和画面变化显著的区域，让 LLM 更关注动态信息。

```python
# VideoLLaMA 3 AVT + DiffFP 视觉编码流程伪代码
def encode_image_or_video(input):
    if input.type == "image":
        patches = patchify_with_original_grid(input.image)
        # 2D-RoPE uses patch coordinates instead of fixed absolute embeddings
        visual_tokens = siglip_vit_2d_rope(patches, coords=patches.coords)
        return projector(visual_tokens)

    kept_tokens = []
    previous_frame = None
    for frame in sample_frames(input.video, fps=1, max_frames=MAX_FRAMES):
        patches = patchify_with_original_grid(frame)
        frame_tokens = siglip_vit_2d_rope(patches, coords=patches.coords)
        frame_tokens = bilinear_downsample_tokens(frame_tokens, scale=2)

        if previous_frame is None:
            keep_mask = ones_like_patch_grid(frame)
        else:
            diff = l1_patch_distance(frame, previous_frame)
            keep_mask = diff >= 0.1

        kept_tokens.append(frame_tokens[keep_mask])
        previous_frame = frame

    return projector(concat(kept_tokens))
```

四阶段训练把这些模块逐步接起来。第一阶段 Vision Encoder Adaptation 只训练视觉编码器和 projector，冻结语言模型，使动态分辨率视觉 token 能对齐到 LLM 表示空间；第二阶段 Vision-Language Alignment 解冻全部参数，用大规模图文、文档、图表、文字识别和少量 text-only 数据注入多模态知识；第三阶段 Multi-task Fine-tuning 加入图像问答和视频 caption/QA 数据，并开始使用视频压缩器；第四阶段 Video-centric Fine-tuning 聚焦通用视频、流式视频和 temporal grounding 等视频任务，同时保留图像和文本数据避免能力遗忘。

VL3-Syn7M 是这套训练策略的关键数据资产。它不是简单从 COYO-700M 抽样，而是先去掉极端比例和低审美图像，再用 BLIP2 粗 caption 与 CLIP 相似度过滤图文不匹配样本，接着用 CLIP 视觉特征做 KNN 聚类以保证语义多样性，最后用 InternVL2-8B/26B 生成短描述和详细描述。短 caption 更适合早期视觉适配，详细 caption 更适合视觉-语言对齐。数据量从 700M 压到 7M，目的不是覆盖所有噪声，而是让每个样本的视觉细节和文本监督更可靠。

相对 VideoLLaMA/VideoLLaMA 2，VideoLLaMA 3 的变化在于把“视频模型”重新定义成“强图像模型 + 视频高效压缩 + 视频专项微调”。这解释了它为什么同时重视 DocVQA、ChartQA、MathVista 等图像基准和 VideoMME、MLVU、LongVideoBench 等视频基准：如果视觉编码器不能保留高分辨率细节，视频问答中的文字、图表、远处物体和细粒度动作也会丢失。

> 💡 关键：AVT 解决“看清楚不同尺寸画面”，DiffFP 解决“不要把静止背景反复塞给 LLM”；两者共同把视觉 token 预算花在更有信息量的位置上。

#### 🧪 练习题

```yaml
question: "VideoLLaMA 3 中 DiffFP 剪除视频 token 的依据是什么？"
options:
  - "LLM 对每个 token 的注意力权重是否小于均值"
  - "相邻帧同位置 patch 在像素空间的 1-norm 差异是否低于阈值"
  - "文本问题中是否出现动作相关动词"
  - "视觉编码器最后一层 token 的通道数是否过大"
answer: 1
explain: "DiffFP 在像素空间比较相邻帧 patch 差异，低于默认阈值 0.1 的后续 patch 被视为冗余并剪除。"
```
