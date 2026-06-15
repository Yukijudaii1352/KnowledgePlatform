### 世界卷轴 (4D Video via Consistent Geometry)

```yaml
id: worldreel
name: WorldReel
full_name: 世界卷轴 (4D Video via Consistent Geometry)
year: "2026.03"
org: SenseTime
paper_url: https://arxiv.org/abs/2603.worldreel
category: generative
parent: sora
motivation: 几何一致性建模解决视频生成幻觉问题
```

#### 📝 一句话总结

WorldReel 提出把视频生成从单纯 RGB 帧生成提升为联合生成 RGB、点图、相机轨迹、光流和 3D scene flow 的 4D 生成框架，解决视频扩散模型在大相机运动和动态物体下容易出现几何漂移与时空不一致的问题。

#### 🎯 核心要点

- **输入链接限制**：清单中的 `https://arxiv.org/abs/2603.worldreel` 疑似占位符；实际可访问公开论文为 `https://arxiv.org/abs/2512.07821`
- **统一 4D 输出**：同时生成 RGB、per-frame geometry、calibrated camera trajectory、optical flow、scene flow 和 object masks
- **geo-motion augmented latent**：在视频扩散 Transformer 的 latent 中显式携带几何与运动信息
- **appearance-independent 表征**：减少外观纹理泄漏到几何/运动通道，提升跨视角和跨光照泛化
- **Temporal DPT 多任务解码器**：共享轻量 DPT 风格主干，任务头分别预测点图、相机、动态 mask、scene flow
- **混合数据训练**：结合有精确 4D 标注的合成数据和更具真实外观多样性的真实视频

#### 🔬 深入细节

![WorldReel 框架图](https://arxiv.org/html/2512.07821/figures/figure2_v2.png)
*图：WorldReel 在视频扩散模型中加入 geo-motion latent，并通过 temporal DPT 解码统一 4D 表征。*

##### 算法伪代码

```python
# WorldReel 的联合 4D 视频生成训练
for batch in mixed_synthetic_real_videos:
    rgb_latent = video_vae.encode(batch.rgb)
    geo_motion_latent = encode_geometry_motion(
        depth=batch.depth_or_pseudo_depth,
        optical_flow=batch.flow,
        camera=batch.camera,
        scene_flow=batch.scene_flow,
        mask=batch.dynamic_mask,
    )

    noisy_latent, noise, t = diffusion_forward(rgb_latent, geo_motion_latent)
    pred = video_dit(noisy_latent, t, prompt=batch.prompt, geo_motion=geo_motion_latent)

    rgb_loss = diffusion_loss(pred.rgb, noise.rgb)
    task_outputs = temporal_dpt(pred.geo_motion_features)
    four_d_loss = (
        l1(task_outputs.pointmap, batch.pointmap)
        + pose_loss(task_outputs.camera, batch.camera)
        + huber(task_outputs.scene_flow, batch.scene_flow)
        + bce(task_outputs.dynamic_mask, batch.dynamic_mask)
    )
    consistency_loss = static_geometry_consistency() + dynamic_motion_smoothness()
    update(rgb_loss + four_d_loss + consistency_loss)
```

##### 动机与背景

强视频生成模型可以产生逼真的局部纹理和运动，但它们通常没有维护“同一个 3D 世界随时间演化”的内部状态。因此在视角外推、相机大幅移动或非刚体运动中，常见失败包括物体形状漂移、背景几何闪烁、相机运动和物体运动相互混淆。

WorldReel 的目标不是只让视频“看起来连续”，而是让生成过程显式输出一个随时间一致的 4D 场景。这里的 4D 指 3D 几何随时间演化：每帧有点图/深度，相机轨迹可标定，动态区域有 3D scene flow 描述其运动。

##### 核心机制：geo-motion augmented latent

普通 latent video diffusion 可以写成：

$$
\epsilon_{\theta}(z_t, t, c)
$$

其中 \(z_t\) 是带噪视频 latent，\(c\) 是文本或图像条件。WorldReel 扩展为：

$$
\epsilon_{\theta}(z_t, g_t, t, c)
$$

\(g_t\) 是几何-运动增强 latent，包含与外观解耦的深度、点图、相机、光流和 3D scene flow 信息。这样做的关键收益是把生成约束从“RGB 相邻帧像不像”提升到“同一个 3D 结构在不同时间和视角下是否一致”。

##### 多任务 4D 解码与正则

WorldReel 使用 temporal DPT-style decoder 将 latent 特征映射为多个 4D 任务输出。共享 backbone 学习统一几何表示，最后用轻量任务头预测不同输出：

$$
(\hat{P}, \hat{C}, \hat{F}_{3D}, \hat{M}) = D_{\phi}(h)
$$

其中 \(\hat{P}\) 是 pointmap，\(\hat{C}\) 是相机参数，\(\hat{F}_{3D}\) 是 scene flow，\(\hat{M}\) 是动态 mask。训练损失组合为：

$$
\mathcal{L} =
\mathcal{L}_{diff}
+ \lambda_p \mathcal{L}_{point}
+ \lambda_c \mathcal{L}_{camera}
+ \lambda_f \mathcal{L}_{flow}
+ \lambda_m \mathcal{L}_{mask}
+ \lambda_r \mathcal{L}_{reg}
$$

正则项区分静态背景和动态前景：背景更强调跨帧几何一致，前景更强调非刚体 motion smoothness 和 camera/object motion 解耦。

##### 数据策略与传统方法区别

只用合成数据可获得精确 4D 监督，但外观域窄；只用真实视频则标签噪声大。WorldReel 的混合策略让合成数据负责精确几何/运动监督，让真实视频补充视觉多样性。真实视频的伪标签来自深度、相机和光流估计模型，再通过 back-projection 与 scene flow 构造 4D 监督。

与后处理式 4D 重建不同，WorldReel 在生成时就联合输出视频和 4D 表征，而不是先生成 RGB 再尝试补救几何错误。这个“生成即 4D”的设计使模型更适合作为世界模型：agent 可以在同一稳定时空表征中渲染、编辑和推理。

> ⚠️ 注意：本文实际机构与 YAML 中的 `SenseTime` 不一致，公开 arXiv/CVPR 页面列出的作者机构包括 UT Austin、Adobe Research 和 UCL；本文件保留清单 YAML 原文。

#### 🧪 练习题

```yaml
question: "WorldReel 相比普通视频扩散模型最关键的改动是什么？"
options:
  - "只提高 RGB 视频分辨率"
  - "在生成过程中显式联合建模几何、相机和 3D 运动"
  - "删除所有真实视频数据，只用合成数据"
  - "把视频生成改成纯文本生成任务"
answer: 1
explain: "WorldReel 的核心是 geo-motion augmented latent 和多任务 4D 解码器，使 RGB 生成受到点图、相机轨迹和 scene flow 等几何运动约束。"
```
