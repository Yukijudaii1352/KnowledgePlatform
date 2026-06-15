### TrajTok — 轨迹Token

```yaml
id: trajtok
name: TrajTok
full_name: "轨迹Token (Learning Trajectory Tokens)"
year: 2026
org: "Tsinghua/CAS"
paper_url: "https://arxiv.org/abs/2604.trajtok"
category: "foundation_model"
parent: "videomae"
motivation: "端到端轨迹Token解耦时长"
```

#### 📝 一句话总结

TrajTok 提出端到端可训练的视频轨迹 tokenizer，用统一 segmenter 隐式聚合跨时空像素并生成轨迹 token，使视频 token 数更多取决于语义复杂度而不是视频时长。

#### 🎯 核心要点

- 端到端轨迹 tokenizer：与下游视频模型联合训练，不依赖外部分割和跟踪流水线
- Universal segmenter：用 learnable queries 对像素/特征做隐式时空聚类，单次前向产生轨迹 mask
- Trajectory encoder：按轨迹 mask 聚合视觉特征，输出紧凑语义 token
- 可调 token 粒度：每条轨迹可输出不同数量子 token，适配算力预算
- 三种使用方式：TrajViT2 预训练、TrajAdapter 特征探针、TrajVLM 多模态连接器
- 长视频收益：轨迹表示减少冗余 patch token，尤其利于长视频推理和视频语言模型

#### 🔬 深入细节

> 注：给定 `paper_url` 为不可访问占位符；可检索论文为 `arXiv:2602.22779`，CVPR 2026 open access 版本题名为 *TrajTok: Learning Trajectory Tokens Enhances Video Understanding*。

![TrajTok 架构概览](https://arxiv.org/html/2602.22779v3/x2.png)
*图：TrajTok 由 trajectory segmenter 和 trajectory encoder 组成，先产生轨迹 mask，再聚合为轨迹 token。*

##### 1. 动机与背景

VideoMAE、TimeSformer、Video Swin 等方法通常把视频切成固定时空 patch。这样做简单稳定，但 token 数与帧数线性增长；长视频中大量背景、静止区域或重复帧会产生冗余 token，限制模型规模和上下文长度。

轨迹 token 的想法是：视频理解更关心“对象或部件随时间如何变化”，而不是每一帧每个网格都单独成 token。此前 TrajViT 等方法已证明轨迹式 tokenization 可以减少冗余，但依赖 SAM/跟踪器等外部流水线，慢、不可微、也无法根据下游目标调整 token 粒度。

##### 2. Universal Segmenter

TrajTok 的 segmenter 用一组 learnable queries 对视频像素或中间视觉特征做隐式聚类。它不追求像 SAM 那样像素级完美分割，而是追求对下游理解任务有用的语义分组。

可以将 segmenter 看成一个 mask proposal 网络：

$$
M = \text{Segmenter}(X; Q_s), \quad M \in \mathbb{R}^{K \times T \times H \times W}
$$

其中 \(K\) 是轨迹数，\(M_k\) 表示第 \(k\) 条轨迹在各帧上的软 mask。由于整个模块在模型内部，梯度可以从分类、检索或 VLM 目标回传到分组策略，使 tokenization 随任务自适应。

##### 3. Trajectory Encoder

Trajectory encoder 根据 mask 聚合原始视频特征或预训练视觉特征：

$$
u_k = \frac{\sum_{t,h,w} M_{k,t,h,w} \cdot f_{t,h,w}}
{\sum_{t,h,w} M_{k,t,h,w} + \epsilon}
$$

随后通过 perceiver/attention 模块细化轨迹 token。论文还允许每条轨迹展开为 \(n \in \{1,2,4\}\) 个子 token，训练时随机采样粒度，推理时可按算力预算选择。

```python
# TrajTok 前向伪代码
def trajtok(video_or_features):
    feats = patch_encoder(video_or_features)

    # 统一 segmenter 产生 K 条软轨迹
    masks = trajectory_segmenter(feats, learnable_queries)

    # 按轨迹聚合时空特征
    traj_tokens = []
    for k in range(K):
        token = masked_pool(feats, masks[k])
        traj_tokens.append(token)

    # 轨迹 token 细化和可选子 token 展开
    traj_tokens = trajectory_encoder(traj_tokens, masks)
    return traj_tokens
```

##### 4. 三种接入方式

![TrajTok 应用方式](https://arxiv.org/html/2602.22779v3/x4.png)
*图：TrajTok 可用于从头训练视频编码器、适配预训练特征，也可作为 VLM 的视觉连接器。*

TrajViT2 从头训练视频 CLIP 式模型，用 TrajTok 替代固定 patch token，直接学习适合检索和分类的轨迹表示。TrajAdapter 则把 TrajTok 插到冻结视觉 backbone 后面，作为下游分类/检索的轻量探针头。TrajVLM 把轨迹 token 作为 LLaVA 风格 VLM 的视觉输入，让长视频问答不必吞下海量 patch token。

这三种设置说明 TrajTok 不是单一模型，而是一个可插拔 tokenization 模块。它可以处在预训练阶段，也可以处在微调或多模态对齐阶段。

##### 5. 与 VideoMAE/patch token 的区别

VideoMAE 的 mask reconstruction 仍基于规则网格 patch，适合学习局部时空表征；TrajTok 则把 token 单位改成对象/部件轨迹，目标是减少冗余并突出长期语义一致性。前者的 token 数主要由 \(T \times H \times W\) 决定，后者更接近由场景中对象和运动复杂度决定。

> 💡 关键：TrajTok 的“解耦时长”不是说完全不受帧数影响，而是通过轨迹聚合让长视频中重复背景和持续对象不再按每帧网格重复计费。

#### 🧪 练习题

```yaml
question: "TrajTok 相比依赖外部 SAM+Tracker 的轨迹 tokenization 最大优势是什么？"
options:
  - "完全不使用视觉特征"
  - "端到端可训练，token 分组能根据下游任务目标自适应"
  - "把所有帧压缩成一个固定类别标签"
  - "只能用于 GPS 轨迹数据，不能用于视频"
answer: 1
explain: "TrajTok 将 segmenter 和 trajectory encoder 集成进模型内部，梯度可回传到 tokenization 过程，因此比外部不可微流水线更灵活。"
```
