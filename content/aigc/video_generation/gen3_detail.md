### Gen-3 Alpha

```yaml
id: gen3
name: Gen-3 Alpha
full_name: Runway Gen-3 Alpha (Runway Gen-3 Alpha)
year: '2024.06'
org: Runway
paper_url: https://runwayml.com/research/introducing-gen-3-alpha
category: diffusion_based
parent: gen2
motivation: 时空世界模型，全局物理一致性建模
```

#### 📝 一句话总结

Gen-3 Alpha 是 Runway 推出的新一代视频生成基础模型，通过大规模视频-图像联合训练和时空世界模型架构，在保真度、时序一致性和运动表现上大幅超越 Gen-2，迈向通用世界模型（General World Models）的目标。

#### 🎯 核心要点

- **多模态联合训练**：在视频和图像上联合训练，统一支持 Text-to-Video、Image-to-Video、Text-to-Image 三种生成模式
- **大规模训练基础设施**：全新构建的大规模多模态训练基础设施，支撑更大参数量和更长序列的训练
- **时间密集描述（Temporally Dense Captions）**：训练时使用高描述性的时间密集标注，实现精细的时序控制和关键帧编排
- **多种控制模式**：支持 Motion Brush（运动笔刷）、Advanced Camera Controls（高级相机控制）、Director Mode（导演模式）等精细控制手段
- **逼真人物生成**：在人物表情、动作、手势和情感表达方面表现突出，支持多样化的叙事场景
- **行业定制化**：支持针对特定艺术风格和叙事需求的模型微调（Fine-tuning），与娱乐和媒体机构合作定制
- **安全与溯源**：集成 C2PA 内容溯源标准和自研视觉内容审核系统
- **通用世界模型方向**：定位为迈向 General World Models（GWM）的关键一步，目标是构建能理解和模拟真实世界动态的 AI 系统

#### 🔬 深入细节

##### 核心架构示意

![Gen-3 Alpha 生成示例](https://d3phaj0sisr2ct.cloudfront.net/site/videos/gen-3-alpha/gen-3-alpha-output-001.jpg)
*图：Gen-3 Alpha 生成的视频帧示例——展示了模型在光影反射、人物细节和场景一致性方面的能力*

> ⚠️ 注意：Gen-3 Alpha 未发布正式学术论文，以下技术分析基于 Runway 官方博客、General World Models 研究公告及公开的技术信息综合推断。

##### 推测架构伪代码

```python
# Gen-3 Alpha 推测训练流程伪代码
# 基于 Diffusion Transformer (DiT) 架构的视频生成

# Stage 1: 视频-图像联合编码
video_latent = VideoVAE.encode(video)          # 视频编码到潜空间 [B, T, C, H, W]
image_latent = VideoVAE.encode(image)          # 图像视为单帧视频 [B, 1, C, H, W]
text_emb = TextEncoder(temporally_dense_caption)  # 时间密集描述编码

# Stage 2: 扩散过程 (Diffusion Transformer)
noise = torch.randn_like(video_latent)
t = sample_timestep()
noisy_latent = scheduler.add_noise(video_latent, noise, t)

# 时空注意力机制
for block in DiT_blocks:
    # 空间自注意力 — 帧内像素关系
    x = block.spatial_attention(noisy_latent)
    # 时间自注意力 — 帧间时序一致性
    x = block.temporal_attention(x)
    # 文本交叉注意力 — 条件控制
    x = block.cross_attention(x, text_emb)
    x = block.ffn(x)

# 预测噪声并优化
pred_noise = DiT(noisy_latent, t, text_emb)
loss = MSE(pred_noise, noise)
```

##### 动机与背景

传统视频生成模型面临三大核心挑战：**时序一致性差**（帧间闪烁、物体变形）、**运动质量低**（不自然的运动轨迹）、**物理合理性不足**（违反基本物理规律）。Runway 的前代产品 Gen-2 虽然在文本到视频生成领域取得了突破，但仍然在复杂相机运动和物体运动方面存在明显局限。

2023 年 12 月，Runway 提出了 **General World Models（通用世界模型）** 的研究方向，其核心理念是：

> 💡 关键：世界模型是一种构建环境内部表征并用其模拟未来事件的 AI 系统。通用世界模型的目标是表征和模拟真实世界中遇到的各种情境和交互，而非局限于游戏或驾驶等狭窄场景。

Gen-3 Alpha 正是这一研究方向的首个重要成果——它不仅是一个视频生成工具，更是一个初步具备世界理解能力的基础模型。

##### 核心技术机制

**1. 大规模视频-图像联合训练**

Gen-3 Alpha 采用视频和图像的联合训练策略。这种多模态联合训练带来两个关键优势：

- **数据效率提升**：图像数据量远大于高质量视频数据，联合训练使模型能从海量图像中学习丰富的视觉先验（纹理、光影、构图），再将这些知识迁移到视频生成中
- **统一表征空间**：视频和图像共享同一潜空间表征，使得模型能够无缝支持 Text-to-Video、Image-to-Video 和 Text-to-Image 三种生成模式

这一策略与 Stable Video Diffusion（SVD）等工作的思路一致，但 Gen-3 Alpha 在训练规模和数据质量上进行了大幅提升。

**2. 时间密集描述（Temporally Dense Captions）**

Gen-3 Alpha 训练的一个核心创新是使用 **时间密集描述**（temporally dense captions）。与传统的单句视频描述不同，时间密集描述为视频的不同时间段提供详细的文本标注：

$$
\text{Caption}(v) = \{(t_i, c_i)\}_{i=1}^{N}, \quad t_i \in [0, T]
$$

其中 \(t_i\) 是时间戳，\(c_i\) 是对应时刻的描述文本，\(T\) 是视频总时长。这种标注方式使模型能够：

- 实现精确的**关键帧控制**：用户可以描述场景在不同时间点的状态变化
- 支持**想象性过渡**：如"镜头从蚂蚁特写拉远，展现远处的社区"这样的复杂时序叙事
- 理解**电影术语**：如 FPV（第一人称视角）、推拉镜头、航拍等专业摄影指令

**3. 时空注意力机制**

Gen-3 Alpha 的架构核心是基于 Diffusion Transformer（DiT）的时空注意力机制。推测其采用分离式时空注意力设计：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

- **空间注意力**：在每一帧内部建模像素间的空间关系，捕获场景结构和纹理细节
- **时间注意力**：跨帧建模同一空间位置的时序演变，确保运动连贯性和物理一致性
- **交叉注意力**：将文本条件注入生成过程，实现精确的语义控制

这种设计使模型能够同时保证**帧内质量**和**帧间一致性**，是解决视频生成中"闪烁"和"漂移"问题的关键。

**4. 多层次控制体系**

Gen-3 Alpha 提供了从粗粒度到细粒度的多层次控制：

| 控制模式 | 功能描述 | 控制粒度 |
|---------|---------|---------|
| Text Prompt | 文本描述驱动生成 | 全局语义 |
| Image-to-Video | 以参考图像为起始帧 | 视觉风格+内容 |
| Motion Brush | 指定区域的运动方向和强度 | 局部运动 |
| Advanced Camera Controls | 控制相机运动轨迹 | 相机参数 |
| Director Mode | 综合场景编排 | 多维度协同 |

##### 与 Gen-2 的关键区别

| 维度 | Gen-2 | Gen-3 Alpha |
|------|-------|-------------|
| 训练数据 | 视频为主 | 视频+图像联合训练 |
| 训练基础设施 | 常规规模 | 全新大规模多模态训练基础设施 |
| 标注方式 | 常规视频描述 | 时间密集描述（Temporally Dense Captions） |
| 人物生成 | 表情和动作有限 | 丰富的表情、手势和情感表达 |
| 运动质量 | 复杂运动易失败 | 大幅改善运动合理性 |
| 时序一致性 | 存在闪烁和漂移 | 显著提升帧间一致性 |
| 控制能力 | 基础文本控制 | 多层次精细控制（Motion Brush、Camera Controls 等） |
| 定位 | 视频生成工具 | 迈向通用世界模型的基础模型 |

##### 安全与责任

Gen-3 Alpha 在安全性方面引入了两项重要机制：

- **C2PA 内容溯源标准**：为生成内容嵌入数字水印和元数据，确保 AI 生成内容可追溯、可验证
- **自研视觉内容审核系统**：在生成管线中集成内容安全过滤，防止生成有害或不当内容

> 💡 关键：Gen-3 Alpha 的核心贡献不在于提出全新的算法公式，而在于工程层面的系统性突破——通过大规模训练基础设施、高质量数据标注流程和精细化控制体系的协同优化，将视频生成质量推向新的高度，并首次将"世界模型"的概念从学术探索推进到产品级应用。

#### 🧪 练习题

```yaml
question: "Gen-3 Alpha 相比 Gen-2 的核心训练策略变化是什么？"
options:
  - "从 GAN 架构切换到扩散模型架构"
  - "采用视频和图像联合训练，并使用时间密集描述标注"
  - "将模型参数量缩小以提升推理速度"
  - "放弃文本条件，改用纯图像条件生成"
answer: 1
explain: "Gen-3 Alpha 的关键变化是在视频和图像上联合训练，并引入时间密集描述（temporally dense captions）实现精细时序控制，这是其在保真度、一致性和运动质量上大幅提升的核心原因。"
```