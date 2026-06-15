### PERSONA
```yaml
id: persona
name: PERSONA
full_name: "个性化全身3D化身 (Personalized Whole-Body 3D Avatar)"
year: "2026"
org: "ICCV 2026"
paper_url: "https://arxiv.org/abs/2508.09973"
category: body_motion
parent: cyberhost
motivation: "单图生成非刚性衣物形变全身3D"
```

#### 📝 一句话总结
PERSONA 用扩散生成的 pose-rich 视频补足单张图像缺少的姿态变化，再优化 3DGS/参数化 avatar，并通过 balanced sampling 与 geometry-weighted optimization 保持身份真实性和非刚性衣物形变。

#### 🎯 核心要点
- 单图个性化 avatar：输入一张人物图像，生成可动画化的全身 3D 化身，而不是要求多视角或长视频采集。
- 扩散生成训练视频：利用 2D pose-conditioned diffusion animator 从单图生成多姿态视频，提供衣物和身体的 pose-driven deformation 监督。
- Balanced sampling：优化 avatar 时过采样原始输入图，抵消扩散生成帧的身份漂移和纹理伪影。
- Geometry-weighted optimization：降低生成帧的 image loss 权重、提高 geometry loss 权重，避免把扩散伪影烘进 3D 表示。
- 资料说明：manifest 保留 2026/ICCV 2026 元信息；公开 arXiv 页面 `2508.09973` 发布时间为 2025 年 8 月。

#### 🔬 深入细节
##### 核心示意图/框架图
![PERSONA overview](https://arxiv.org/html/2508.09973v1/x1.png)
*图：PERSONA 对比 3D-based 与 diffusion-based avatar 路线，并将二者结合为单图个性化 3D avatar。*

##### 核心流程伪代码
```python
# PERSONA single-image avatar personalization
input_image = load_person_image()
smplx_init = estimate_body_model(input_image)

# 1. Generate pose-rich pseudo videos from a single image
pose_bank = sample_diverse_poses()
generated_frames = diffusion_animator(input_image, pose_bank)

# 2. Balanced sampling mixes authentic input and generated frames
train_set = balanced_sample(
    authentic=[input_image],
    generated=generated_frames,
    ratio=(1, 1),
)

# 3. Optimize avatar with geometry-weighted losses
for frame, pose in train_set:
    render_rgb, render_geom = avatar.render(pose)
    target_geom = estimate_geometry(frame)
    w_img, w_geom = choose_weights(frame_is_generated(frame))
    loss = w_img * l1(render_rgb, frame) + w_geom * l1(render_geom, target_geom)
    loss += regularize_pose_driven_offsets()
    update_avatar(loss)
```

##### 方法解读
单图 avatar 的核心矛盾是：真实身份信息只有一张图，姿态驱动形变却需要大量不同姿态下的观测。传统 3D-based 方法能保持身份，但要学习衣服褶皱、宽松衣物离体等非刚性形变，通常需要 pose-rich 视频。Diffusion-based 方法能从大规模视频中学到姿态形变，却容易在生成帧中改变人脸、衣纹和身份。

PERSONA 的策略是“用扩散补姿态，用 3D 优化保身份”。它先用 pose-conditioned diffusion animator 生成多姿态训练帧，让模型看到抬手、转身等动作下衣物如何变形；然后基于这些帧优化个性化 3D avatar。这样做把 diffusion 的泛化形变能力转化成可渲染、可重定位的 3D 表示。

Balanced sampling 解决身份漂移。若训练时生成帧占比过高，avatar 会逐渐拟合扩散模型的平均脸、错误纹理或阴影；若只用输入图，又无法学习 pose-driven deformation。论文因此在采样中提高原始输入图出现频率，使身份锚点反复参与优化。直觉上，输入图负责“像本人”，生成帧负责“会变形”。

Geometry-weighted optimization 解决伪影烘焙。对生成帧直接施加强 image loss，会把模糊纹理、错位衣纹、光照阴影写进 3D avatar。PERSONA 因此对生成帧降低 RGB 重建权重，并提高 geometry map 约束：
$$
\mathcal{L}=w_{img}\|I-\hat{I}\|_1+w_{geo}\|G-\hat{G}\|_1+\lambda\mathcal{R}.
$$
对于扩散生成帧，\(w_{img}\) 较低、\(w_{geo}\) 较高；对于真实输入图，身份相关的 image loss 更重要。

与 CyberHost 这种直接生成 2D talking body 的模型相比，PERSONA 的目标是可复用的 3D avatar。它不会只输出一段视频，而是优化出可在新姿态、新视角下渲染的个性化表示；代价是需要一次个体级优化流程。

#### 🧪 练习题
```yaml
question: "PERSONA 中 balanced sampling 的主要作用是什么？"
options:
  - "让所有训练帧都来自扩散模型"
  - "过采样原始输入图，抵消扩散生成帧导致的身份漂移"
  - "把 3D avatar 压缩成文本 token"
  - "完全取消几何损失"
answer: 1
explain: "原始输入图提供最可靠的身份和纹理锚点，balanced sampling 防止优化过程过度拟合扩散生成帧中的身份偏移和伪影。"
```
