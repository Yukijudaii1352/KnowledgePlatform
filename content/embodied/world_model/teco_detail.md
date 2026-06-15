### 时序一致Transformer (TECO)

```yaml
id: teco
name: TECO
full_name: 时序一致Transformer (Temporally Consistent Transformer)
year: "2023.07"
org: Google Research
paper_url: "http://proceedings.mlr.press/v202/yan23b.html"
category: generative
parent: videogpt
motivation: "弱瓶颈潜在表示解决长视频时空一致性"
```

#### 📝 一句话总结

TECO 通过“高质量 VQ latent 压缩 - temporal causal transformer - spatial MaskGIT 展开”的结构，在保持长上下文的同时降低注意力成本，解决了 VideoGPT 类模型长视频生成中内容遗忘和时序不一致的问题。

#### 🎯 核心要点

- **面向长时域一致性**：关注物体离开视野后再出现时是否保持一致，而不只评估短 horizon 清晰度
- **三类长依赖基准**：构建 DMLab 迷宫、Minecraft 世界、Habitat 室内场景等部分可观测 3D 视频预测数据集
- **VQ latent dynamics**：先用 VQ-GAN/VQ tokenizer 将图像帧压缩成离散视觉 token
- **弱瓶颈压缩**：将高分辨率时空 token 序列进一步压成较少 temporal embeddings，显著降低长序列注意力开销
- **Temporal causal transformer**：在压缩后的时间序列上建模长程动态，支持数百帧上下文
- **Spatial MaskGIT prior**：在每个时间步并行迭代生成空间 token，比纯自回归逐 token 采样更快
- **强于滑窗方法**：相比只能看短窗口的模型，TECO 更能记住全局地图、场景布局和被遮挡对象

#### 🔬 深入细节

##### 核心示意图

![TECO 架构](https://raw.githubusercontent.com/wilson1yan/teco/master/TECO.png)
*图：TECO 将视频 token 压缩到更短的时间表征，在 temporal transformer 中建模长程依赖，再通过 spatial MaskGIT 还原每帧 token。*

##### 动机与背景

VideoGPT 证明了“VQ tokenizer + Transformer prior”可以用于视频生成，但长视频里有一个硬问题：如果直接对所有时空 token 做 Transformer，注意力复杂度随 token 数平方增长；如果用滑动窗口分段生成，模型只能看到短历史，物体、地图和场景布局很容易在长程 rollout 中漂移。

TECO 的核心假设是，长程一致性并不要求 temporal transformer 处理每个空间位置的所有细节。模型可以先把一帧的 VQ token 压成较少的 latent embeddings，让 temporal module 负责“场景状态和动态记忆”，再让 spatial generator 负责把该时间步展开成清晰图像。

设输入视频为 \(x_{1:T}\)，VQ tokenizer 得到离散 token \(z_{1:T}\)。TECO 学习压缩表征 \(h_t\)，并在时间上自回归建模：

$$
h_t = C_\psi(z_t), \quad
p_\theta(h_{1:T}) =
\prod_{t=1}^{T} p_\theta(h_t \mid h_{<t}, a_{<t})
$$

随后 spatial MaskGIT 根据 \(h_t\) 和可见/已生成 token 预测该帧的空间 token：

$$
\mathcal{L}_{\text{mask}} =
-\mathbb{E}_{z,m}
\left[
\log p_\omega(z \mid z \odot m, h_t)
\right]
$$

其中 \(m\) 是随机 mask。MaskGIT 在推理时可以多轮并行填充 token，而不是像 VideoGPT 那样完全逐 token 自回归，因此采样速度更好。

##### 算法伪代码

```python
# TECO training
freeze_or_train_vq_tokenizer()
initialize(spatial_compressor, temporal_transformer, spatial_maskgit)

for video, actions in long_video_batches:
    z = vq_tokenizer.encode(video)            # [T, H, W] discrete codes
    h = spatial_compressor(z)                 # [T, small_h, small_w, dim]

    # Long-horizon dynamics over compressed temporal states
    h_pred = temporal_transformer(h[:-1], actions[:-1])
    temporal_loss = cross_entropy_or_regression(h_pred, stopgrad(h[1:]))

    # Spatial reconstruction/prediction with MaskGIT
    masked_z, mask = random_mask(z)
    logits = spatial_maskgit(masked_z, h, mask)
    maskgit_loss = cross_entropy(logits[mask], z[mask])

    optimize(spatial_compressor, temporal_transformer, spatial_maskgit,
             temporal_loss + maskgit_loss)

# TECO sampling
z_context = vq_tokenizer.encode(context_frames)
h_context = spatial_compressor(z_context)
for t in future_steps:
    h_t = temporal_transformer.sample_next(h_context, actions)
    z_t = maskgit_iterative_decode(spatial_maskgit, h_t)
    append(h_context, spatial_compressor(z_t))
video = vq_tokenizer.decode(all_z)
```

##### 方法机制拆解

TECO 的“弱瓶颈”很重要。瓶颈太强会牺牲画面细节，导致生成模糊或语义丢失；瓶颈太弱又会让 temporal transformer 面对过长序列。TECO 在二者之间折中：长程模块只看压缩状态，空间细节由 MaskGIT 根据当前 latent state 并行恢复。

Temporal transformer 使用 causal mask，因此未来帧只能依赖过去帧和动作条件。这与世界模型的预测需求一致：给定历史和动作，预测下一段视觉状态。对于 DMLab、Minecraft、Habitat 这类部分可观测 3D 场景，模型必须记住曾经看到但当前不可见的空间布局。

Spatial MaskGIT 与纯自回归 decoder 的区别在于生成顺序。纯 AR decoder 每次只生成一个 token，误差和采样时间都随空间 token 数累积；MaskGIT 每轮填充一批 token，并用置信度机制逐步 refine，因此可以更快生成整帧，同时保持清晰度。

与传统 FitVid、CW-VAE 或短窗口 latent models 相比，TECO 的优势不是单帧重建更锐利，而是可以把长视频中的“世界状态”传递得更久。论文的长 horizon benchmark 正是为了评估模型是否在回到同一地点时记住原来的几何和物体。

> ⚠️ 注意：TECO 的核心收益来自架构化分工。VQ tokenizer 负责压缩和像素还原，temporal transformer 负责长程状态，MaskGIT 负责空间细节。把三者合成一个巨大时空 Transformer 会明显增加长序列成本。

#### 🧪 练习题

```yaml
question: "TECO 为什么要先把每帧 VQ token 压缩成更少的 temporal embeddings？"
options:
  - "为了让 temporal transformer 能在数百帧上建模长程依赖，同时避免完整时空注意力的平方开销"
  - "为了完全丢弃空间信息，只保留动作标签"
  - "为了让模型只能生成单帧图像"
  - "为了把 MaskGIT 替换成像素级 GAN"
answer: 0
explain: "弱瓶颈压缩降低了长视频序列长度，temporal transformer 负责长期记忆，spatial MaskGIT 再恢复每帧细节。"
```
