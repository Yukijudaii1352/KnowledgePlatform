### Kangaroo — 长视频语言模型

```yaml
id: kangaroo
name: Kangaroo
full_name: "长视频语言模型 (Kangaroo VLM)"
year: 2026
org: "IJCV"
paper_url: "https://link.springer.com/kangaroo"
category: "foundation_model"
parent: "internvideo"
motivation: "超长上下文视频语言对齐"
```

#### 📝 一句话总结

Kangaroo 通过高质量视频-文本数据策划、时序位置编码、空间-时间 patchify 压缩和渐进式课程训练，构建了支持长上下文视频输入的 8B 级视频语言模型。

#### 🎯 核心要点

- 长视频 VLM 架构：视觉编码器 + spatial-temporal patchify + multimodal projector + LLM
- 时间戳位置编码：用真实浮点时间戳增强帧特征，而不是只用离散帧序号
- 数据策划系统：围绕图像/视频预训练和指令微调构建高质量多模态数据
- 课程训练：从图像对齐、短视频预训练逐步过渡到高分辨率和长视频微调
- 上下文扩展：通过 token 压缩、动态帧采样和序列打包支持更多帧输入
- 长视频基准收益：在 MLVU、LVBench、VideoMME、EgoSchema 等长视频理解任务上强调竞争力

#### 🔬 深入细节

> 注：给定 `paper_url` 是占位式短链；可检索正式版本为 IJCV 2026 DOI `10.1007/s11263-025-02620-2`，预印本为 `arXiv:2408.15542`。

![Kangaroo 架构图](https://arxiv.org/html/2408.15542v1/x2.png)
*图：Kangaroo 由 vision encoder、spatial-temporal patchify、multi-modal projector 和 LLM 组成。*

##### 1. 动机与背景

视频语言模型面临两个互相牵制的问题。第一，长视频需要更多帧才能覆盖关键事件，但帧数增加会让视觉 token 爆炸，迅速耗尽 LLM 上下文。第二，公开视频-文本数据噪声高，字幕常只描述局部片段或缺少细粒度事件，模型很难学到可靠的视频语言对齐。

Kangaroo 的策略是同时处理数据和架构：用数据策划系统提升监督质量，用课程训练逐步扩大分辨率、帧数和上下文长度，并用 patchify 压缩把高分辨率多帧视觉特征变成 LLM 可承受的 token 序列。

##### 2. 模型结构与时间编码

每帧先经过视觉编码器得到 patch 特征 \(Z_f^t\)。Kangaroo 给每帧加入基于真实时间戳 \(t\) 的 temporal position embedding：

$$
\hat{Z}_f^t = Z_f^t + \text{TPE}(t)
$$

其中 \(t\) 是浮点秒级时间，而不是第几帧的整数索引。这样模型能区分均匀采样、稀疏采样和不同视频时长下的同一帧序号。随后 spatial-temporal patchify 对视觉 token 进行压缩，projector 将其映射到 LLM embedding 空间，与文本 token 拼接后送入语言模型。

##### 3. 课程训练流程

![Kangaroo 课程训练](https://arxiv.org/html/2408.15542v1/x5.png)
*图：Kangaroo 通过逐步增加任务难度、分辨率和帧数来训练长视频能力。*

```python
# Kangaroo 课程训练伪代码
stage1_image_pretrain(
    data=image_text_pairs,
    trainable=["projector"],
    frozen=["vision_encoder", "llm"],
)

stage2_video_pretrain(
    data=short_video_text_pairs,
    frames=8,
    resolution=224,
    trainable=["vision_encoder", "projector"],
)

stage3_refine(
    data=curated_high_quality_data,
    frames=16,
    resolution=448,
    trainable=["vision_encoder", "patchify", "projector", "llm"],
)

stage4_instruction_tune(
    data=video_instruction_data,
    frames="up_to_64",
    context="10K",
)

stage5_long_video_tune(
    data=long_video_subset,
    frames="up_to_160",
    context="22K",
)
```

这种安排避免了一开始就把 LLM 暴露在超长、超噪声、多帧高分辨率输入下。先学图文对齐，再学短视频时序，最后扩展到长视频指令任务，训练稳定性更好。

##### 4. 长视频处理机制

Spatial-temporal patchify 是 Kangaroo 控制视觉 token 数的关键。分辨率从 224 到 448 会使每帧 patch 数显著增加，如果直接把所有 token 输入 LLM，长视频不可行。Patchify 模块在空间和时间维度上做结构化压缩，保留关键视觉语义，同时减少 token 数。

动态帧采样负责覆盖不同长度视频：短视频不必采太多冗余帧，长视频则增加采样以覆盖事件跨度。序列打包和注意力 mask 减少 padding 浪费，使不同长度样本可以更高效地训练。

##### 5. 与 InternVideo 等视频基础模型的关系

InternVideo 更偏视频表示/编码预训练，强调视觉 backbone 的通用视频表征；Kangaroo 则聚焦把长视频接入 LLM，解决视觉 token 压缩、长上下文对齐和指令问答。它的关键不只是视觉编码器强，而是数据质量、时间元信息和逐步扩展训练共同支撑长视频语言推理。

> 💡 关键：Kangaroo 的长视频能力主要来自“少丢信息地压缩视觉 token”与“课程式扩大上下文”的配合，而不是简单增加输入帧数。

#### 🧪 练习题

```yaml
question: "Kangaroo 使用真实浮点时间戳做 TPE 的主要意义是什么？"
options:
  - "让模型感知帧的真实时间间隔和采样密度"
  - "替代视觉编码器，使模型不再需要图像特征"
  - "只用于计算视频文件大小"
  - "强制所有视频采样相同帧数"
answer: 0
explain: "真实时间戳能保留视频时长和采样间隔等元信息，比单纯帧序号更适合长视频理解。"
```
