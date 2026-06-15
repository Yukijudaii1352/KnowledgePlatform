### GE-1：AGIBOT 生成式世界模型

```yaml
id: ge1
name: GE-1
full_name: AGIBOT世界模型 (AGIBOT World Model)
year: "2026"
org: AGIBOT
paper_url: https://www.agibot.com/ge1
category: foundation_model
parent: pi0
motivation: 视频生成式物理交互预测
```

#### 📝 一句话总结

GE-1 可理解为 AGIBOT Genie Envisioner 系列的生成式机器人世界模型路线：把机器人交互预测建模为语言和视觉条件下的视频生成，用多视角自回归 DiT 预测未来物理交互，从而服务策略评估、数据生成和世界模型内训练。

#### 🎯 核心要点

- 目标是从视频层面预测机器人与环境的未来交互，而不是只回归低维状态
- 以 language instruction、初始视觉观测和历史 sparse memory 为条件，生成未来多视角视频 chunk
- 采用视频 diffusion transformer/DiT 作为核心，借助通用视频生成模型能力迁移到机器人领域
- 使用自回归 chunk 生成，逐段预测长时域交互，增强时间一致性
- 引入跨视角信息交换的 causal block，保持多视角空间一致性
- 面向机器人 manipulation、策略评估、虚拟 rollout、数据扩增和 sim-to-real 前验证
- 清单 URL 当前不可用，内容基于公开 Genie Envisioner / GE-Base 资料和论文整理

#### 🔬 深入细节

##### 核心示意图

![GE-Base 世界模型总览](https://ar5iv.labs.arxiv.org/html/2508.05635/assets/x3.png)
*图：Genie Envisioner / GE-Base 的世界基础模型概览。模型以多视角视觉条件、语言指令和 sparse memory 为输入，自回归生成未来视频片段。*

> ⚠️ 依据限制：`https://www.agibot.com/ge1` 当前返回 404。以下内容基于 AGIBOT Genie Envisioner / GE-Base 公开论文和官网新闻整理，作为 GE-1/AGIBOT 世界模型条目的格式化精读。

##### 算法伪代码

```python
# GE-style video world model for robot interaction prediction

memory = []
current_obs = multi_view_images_t0

for k in range(num_chunks):
    visual_condition = build_condition(
        initial_obs=multi_view_images_t0,
        current_obs=current_obs,
        sparse_memory=sample_sparse(memory),
    )

    noise = randn(video_latent_shape)
    for step in diffusion_steps:
        denoised_velocity = video_dit(
            noisy_latent=noise,
            language=instruction,
            visual_condition=visual_condition,
            cross_view_causal_block=True,
            timestep=step,
        )
        noise = solver_update(noise, denoised_velocity, step)

    next_video_chunk = vae_decode(noise)
    memory.extend(select_frames(next_video_chunk))
    current_obs = last_frame(next_video_chunk)

return generated_future_video
```

##### 方法详解

**动机与背景：为什么机器人需要视频世界模型？**

传统仿真器依赖几何、材质、接触参数和手工物理建模，面对衣物、包装袋、液体、杂乱桌面等开放世界物体时成本很高。机器人策略如果只能在真实世界试错，数据又昂贵且有安全风险。生成式世界模型试图走第三条路：直接从真实或生成视频中学习物理交互的像素级未来。

GE-Base 将机器人世界建模为 text-and-image-to-video generation：给定语言指令和初始观测，模型生成接下来可能发生的多视角视频。这种表示保留了物体外观、遮挡、接触后形变和环境变化，比低维状态预测更贴近视觉策略实际看到的数据。

**核心机制一：自回归视频 chunk**

一次生成完整长视频很难保持一致性，也不利于在线交互。GE 将未来分成多个 video chunk，逐段生成：

$$
V_{k+1} \sim p_\theta(V_{k+1} \mid V_0, m_{\le k}, l)
$$

其中 \(V_0\) 是初始视觉观测，\(m_{\le k}\) 是 sparse memory，\(l\) 是语言指令。每生成一段，就把关键帧加入 memory，再预测下一段。这使模型能在较长任务中保持历史上下文，而不必把所有帧都塞进上下文窗口。

**核心机制二：多视角一致性**

机器人通常有头部、腕部、外部相机等多视角输入。若每个视角独立生成，物体位置和接触状态容易不一致。GE-Base 在视频 DiT 中加入跨视角信息交换模块，让不同视角在生成过程中共享空间线索。

直觉上，多视角世界模型不只是“生成好看的视频”，还要满足同一物理事件在不同相机中一致。例如夹爪推开盒子，侧视角和俯视角都必须表现同一接触结果，否则策略评估会被虚假视觉反馈误导。

**核心机制三：从通用视频生成到 embodied prediction**

GE 使用通用视频生成模型作为基础，再通过 robotic-adaptive pretraining 迁移到机器人交互场景。通用视频模型提供外观、运动和场景先验；机器人数据让模型学会指令条件、机械臂/人形手的运动模式和接触后果。

扩散/flow matching 训练目标可概括为：

$$
\mathcal{L} =
\mathbb{E}_{x_0,\epsilon,t,c}
\left\|
v_\theta(x_t,t,c) - u_t(x_t \mid x_0)
\right\|^2
$$

其中 \(x_0\) 是真实未来视频 latent，\(x_t\) 是加噪 latent，\(c\) 包含语言、初始帧、多视角条件和 memory。模型学习从噪声视频 latent 流向真实未来视频 latent。

**应用：策略评估、数据生成和模型内训练**

GE 类世界模型的价值不在直接输出电机命令，而在为策略提供“想象空间”。给定候选策略或动作计划，世界模型可以生成未来视觉结果，用于过滤明显失败的动作、做离线策略评估，或为 VLA 训练生成更多交互变化。AGIBOT 后续 GE 2.0/GE-2 Sim 资料也延续了这一方向：让世界模型从离线预测器逐步变成可交互的模拟环境。

> ⚠️ 注意：公开视频世界模型的物理一致性仍有限，尤其在精确接触力、长期累积误差和反事实动作方面需要系统评估。它更适合作为策略训练和评估的补充，而不是完全替代物理仿真器。

#### 🧪 练习题

```yaml
question: "GE-1/Genie Envisioner 类世界模型的核心建模对象是什么？"
options:
  - "机器人未来交互的视频片段，而不是单纯低维状态"
  - "只预测关节电流，不处理视觉信息"
  - "只做语言问答，不参与机器人训练"
  - "用手写碰撞规则替代神经网络"
answer: 0
explain: "该路线把机器人世界建模为语言和视觉条件下的视频生成问题，通过预测未来视频来表示物理交互结果。"
```
