### EditYourself：音频驱动的说话头视频生成与编辑

```yaml
id: edityourself
name: EditYourself
full_name: "音频驱动生成与编辑 (Audio-Driven Generation and Manipulation)"
year: "2026"
org: "学术界"
paper_url: "https://arxiv.org/abs/2502.09876"
category: "talking_head"
parent: "emo"
motivation: "视频到视频编辑修复能力"
```

#### 📝 一句话总结

EditYourself 将通用视频 DiT 扩展为音频条件的视频到视频编辑模型，通过口部区域噪声训练和音频 cross-attention，实现替换台词、增删片段和重定时的 talking-head 修复。

#### 🎯 核心要点

- 面向已有预录视频的 V2V 编辑，而不是只从单图重新生成整段视频。
- 在视频 DiT 中加入 global audio projection 和 audio cross-attention。
- 训练时对口部区域 latent 加噪，让模型学习在保持身份/背景的前提下重绘可说话区域。
- 推理时通过不同 mask 控制 lip、face、head 三种同步范围。
- 支持时间线级编辑：插入新语音、删除片段、重定时相邻 latent 以平滑过渡。

#### 🔬 深入细节

![EditYourself 框架图](https://arxiv.org/html/2601.22127v1/x2.png)
*图：EditYourself 在视频 DiT 中加入全局音频投影和音频 cross-attention，并对口部 token 做区域化去噪编辑。*

> ⚠️ 资料限制：manifest 中 `2502.09876` 快速核验为不相关论文；公开可匹配论文为 `EditYourself: Audio-Driven Generation and Manipulation of Talking Head Videos with Diffusion Transformers`，本文据此整理，YAML 保留 manifest 原链接。

EditYourself 解决的问题与传统 talking-head 生成不同：很多真实需求并不是从照片生成全新视频，而是修改已有视频中的一句话。如果直接整段重生成，身份、背景、头部运动和镜头质感都会改变；如果只贴嘴，又难以处理新增词、删除词或语速改变带来的脸部运动变化。

方法的关键是区域化扩散编辑。训练时保留干净的首帧/上下文 latent，只对嘴部区域 token 加噪，并要求模型根据新音频把这些 token 去噪回来。这样模型学到的是“在已有视频结构中修复说话区域”，而不是无约束地生成全帧。

```python
# EditYourself V2V 编辑伪代码
def edit_yourself(video, new_audio, edit_mask, timeline_ops):
    latents = video_vae.encode(video)
    latents = apply_timeline_ops(latents, timeline_ops)  # add/remove/retime
    noisy = add_noise(latents, region=edit_mask)
    audio_tokens = audio_encoder(new_audio)

    for step in diffusion_steps:
        eps = video_dit(noisy, step, audio_tokens, mask=edit_mask)
        noisy = scheduler.step(noisy, eps, step, region=edit_mask)
    return video_vae.decode(merge_clean_and_edited(latents, noisy, edit_mask))
```

mask 的大小决定编辑强度：只 mask mouth 可获得最强身份和背景保持；扩大到 face 可以让表情也匹配新音频；扩大到 head 则允许生成新的头部动态。这个设计让 EditYourself 更像视频后期工具，而不仅是一个 talking-head 生成器。

#### 🧪 练习题

```yaml
question: "EditYourself 训练时为什么只对口部等编辑区域 latent 加噪？"
options:
  - "为了让模型只学习修改需要变化的区域，同时保留原视频身份、背景和非编辑运动"
  - "为了完全删除音频条件"
  - "为了让所有帧随机重排"
  - "为了把视频变成单张图片"
answer: 0
explain: "区域化加噪将生成能力集中在需要同步新音频的部分，能减少全帧重生成带来的身份漂移和背景闪烁。"
```
