### 自动驾驶生成式AI 3 (GAIA-3)

```yaml
id: gaia3
name: GAIA-3
full_name: 自动驾驶生成式AI 3 (GAIA-3)
year: "2026.03"
org: Wayve
paper_url: "https://wayve.ai/news/series-d-funding-1-2-billion/"
category: generative
parent: gaia1
motivation: "生成极端长尾场景助力伦敦L4级测试"
```

#### 📝 一句话总结

GAIA-3 将 Wayve 的驾驶世界模型从视觉合成推进到可度量的安全评估，使用 15B 参数 latent diffusion world model 生成受控、可重复的反事实驾驶场景，解决真实道路长尾风险难以规模化复现和验证的问题。

#### 🎯 核心要点

- **资料限制说明**：清单 `paper_url` 指向融资新闻，非 GAIA-3 技术页；本文依据 Wayve 官方 `GAIA-3: Scaling World Models to Power Safety and Evaluation` 页面完成
- **15B latent diffusion world model**：官方技术页披露 GAIA-3 是 15B 参数、面向自动驾驶离线评估的潜在扩散世界模型
- **规模化训练**：相比 GAIA-2 使用约 5 倍训练计算、约 10 倍数据，覆盖 9 个国家和 3 个大洲
- **更大视频 tokenizer**：新 tokenizer 规模约为 GAIA-2 的 2 倍，强化行人、骑行者、标志、交通控制设施等安全关键结构
- **World-on-Rails**：改变 ego vehicle 轨迹时保持其他车辆、静态场景、光照和天气等元素一致
- **安全关键场景生成**：可生成碰撞、近碰撞、NCAP 风格 CCFTAP/CCRS 等可重复测试场景
- **离线评估套件**：通过动作条件和轨迹扰动生成多个 what-if 测试，评估驾驶模型从偏离状态恢复的能力
- **Embodiment transfer**：用少量未配对目标 rig 样本，把同一场景重渲染到不同车辆相机配置

#### 🔬 深入细节

##### 核心示意图

![GAIA-3 embodiment transfer](https://wayve.ai/wp-content/uploads/2025/11/EmbodimentGraph-1920x737.jpg)
*图：GAIA-3 支持把同一驾驶场景迁移到不同车辆和相机 rig，用于跨 embodiment 的评估复用。*

##### 动机与背景

真实道路测试是自动驾驶安全验证的必要环节，但效率很低：模型越强，真实道路上可观察错误越少，想得到统计显著的安全结论就需要更多里程。传统仿真可控但不够真实，3D 重建仿真更真实但难处理遮挡和动态交通参与者。GAIA-3 试图把真实数据的视觉/行为真实性与仿真的可控性结合起来。

GAIA-3 的核心任务可以抽象成条件化世界重生成。给定真实种子序列 \(x_{1:T}^{\text{seed}}\)、ego 轨迹或动作条件 \(u_{1:T}^{\text{ego}}\)、外观条件 \(c\) 和相机 embodiment \(e\)，模型生成一个结构一致但可控变化的视频：

$$
x'_{1:T} \sim
p_\theta(
x_{1:T}
\mid x_{1:T}^{\text{seed}},
u_{1:T}^{\text{ego}},
c,
e
)
$$

作为 latent diffusion model，它在压缩 latent 空间中完成去噪生成：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{z_0,t,\epsilon}
\left[
\|\epsilon - \epsilon_\theta(z_t, t, \text{conditions})\|_2^2
\right]
$$

条件不仅包括动作，还包括光照、天气、语义外观、相机 rig 和 seed scene structure。这样 GAIA-3 可以只改变被指定的因素，其他因素保持一致，用于可归因的评估。

##### 算法伪代码

```python
# GAIA-3-style counterfactual evaluation generation
seed_sequence = load_real_driving_clip()
scene_latents = video_tokenizer.encode(seed_sequence)

for perturbation in evaluation_suite:
    conditions = {
        "ego_trajectory": perturbation.ego_path,      # drift left, too fast, collision path
        "appearance": perturbation.weather_or_light,  # night, rain, sunset
        "embodiment": perturbation.camera_rig,        # target vehicle sensor setup
        "world_on_rails": True                        # keep non-ego scene consistent
    }

    noisy_latents = sample_noise_like(scene_latents)
    generated_latents = latent_diffusion_denoise(
        noisy_latents,
        context=scene_latents,
        conditions=conditions
    )
    generated_video = video_tokenizer.decode(generated_latents)

    metrics = evaluate_driving_policy(
        policy=model_under_test,
        scenario=generated_video,
        metrics=["occupancy", "trajectory", "recovery"]
    )
    log(metrics)
```

##### 方法机制拆解

World-on-Rails 是 GAIA-3 从“生成好看视频”走向“可评估仿真”的关键。假设只想测试 ego 车偏离车道时模型能否恢复，那么其他交通参与者、道路、天气和场景结构应尽量保持不变。否则策略表现变化无法归因到 ego perturbation。

安全关键场景生成关注低频高风险事件，例如迎面碰撞、追尾、前车急刹、车辆横穿等。这些事件在真实道路上稀有且不能主动制造。GAIA-3 用真实场景作为基础，通过动作条件和轨迹扰动生成反事实碰撞或近碰撞视频，再用占用、轨迹等指标评估驾驶策略。

Embodiment transfer 解决的是数据复用问题。不同车型的相机高度、视场角、遮挡和车身外观不同，同一真实数据不能直接迁移。GAIA-3 通过目标 rig 的少量未配对样本学习重渲染条件，使评估套件能跨 OEM 和传感器配置复用。

Robustness 与 interpretable control 则让外观变量可控：同一几何与运动结构可以被渲染成白天、夜晚、雨天或不同光照。这样可以直接测量驾驶模型对视觉域变化的敏感性，而不是把几何变化和外观变化混在一起。

官方页面还披露，GAIA-3 相比 GAIA-2 在模型规模、tokenizer、数据覆盖和生成质量上提升明显，尤其更擅长生成清晰标志、行人运动、地标和长轨迹遮挡后的场景一致性。这些能力都服务于离线评估，而不仅是视觉展示。

> ⚠️ 注意：YAML 中的年份与链接和 Wayve 官方 GAIA-3 技术页存在不一致。为保持元信息一致，YAML 原样保留；正文按当前可访问的官方 GAIA-3 技术资料说明依据限制。

#### 🧪 练习题

```yaml
question: "GAIA-3 中 World-on-Rails 机制对自动驾驶评估的核心价值是什么？"
options:
  - "只改变指定的 ego 行为或外观因素，保持其他场景元素一致，从而让评估结果可归因"
  - "随机改变所有车辆和道路，使每次测试完全不可重复"
  - "只生成静态图片，不生成视频"
  - "替代驾驶策略模型本身，不再需要评估"
answer: 0
explain: "World-on-Rails 让反事实场景在保持背景和非 ego 动态一致的前提下改变测试变量，适合构造可重复、可度量的安全评估套件。"
```
