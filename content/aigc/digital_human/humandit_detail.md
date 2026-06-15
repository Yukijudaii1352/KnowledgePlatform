### HumanDiT
```yaml
id: humandit
name: HumanDiT
full_name: "姿态引导扩散Transformer (Pose-guided Diffusion Transformer)"
year: "2025"
org: "学术界"
paper_url: "https://arxiv.org/abs/2502.04847"
category: body_motion
parent: mdm
motivation: "DiT架构长序列时序一致性"
```

#### 📝 一句话总结
HumanDiT 提出姿态引导的 Diffusion Transformer 视频生成框架，用 3D VAE、prefix-latent reference、Keypoint-DiT 和 Pose Adapter 解决长序列人体视频中的身份保持、细粒度手脸渲染和可变分辨率问题。

#### 🎯 核心要点
- DiT 视频去噪器：在视频 latent 上做全注意力建模，支持多分辨率和可变时长，而不是固定尺寸的 U-Net 管线。
- Prefix-latent reference：把首帧/参考图像编码成无噪声 prefix latent，使长视频生成过程中持续保留人物身份。
- Pose guider：将身体、手、脸关键点转成空间条件特征，约束最终视频严格跟随姿态。
- Keypoint-DiT：在推理时生成后续关键点序列，用于静态图像的视频续写和长序列延展。
- Pose Adapter：对外部 pose transfer 序列做对齐和过渡帧 refinement，缓解参考图与目标姿态之间的尺度和局部错位。

#### 🔬 深入细节
##### 核心示意图/框架图
![HumanDiT overview](https://arxiv.org/html/2502.04847v1/x2.png)
*图：HumanDiT 总览。3D VAE 编码视频，prefix latent 保存参考身份，DiT 在姿态条件下完成视频去噪，Keypoint-DiT 与 Pose Adapter 支持续写和姿态迁移。*

##### 核心流程伪代码
```python
# HumanDiT training and inference skeleton
for video, pose_seq, ref_frame in dataset:
    z0 = video_vae.encode(video)              # 3D latent tokens
    prefix = video_vae.encode(ref_frame)       # noise-free reference latent
    t = sample_t()
    eps = randn_like(z0[:, 1:])
    zt = concat(prefix, add_noise(z0[:, 1:], eps, t))

    pose_feat = pose_guider(pose_seq)
    eps_hat = video_dit(zt, t, pose_feat, prefix_mask=True)
    loss = mse(eps_hat, eps)
    update(loss)

def generate(ref_image, optional_pose=None):
    if optional_pose is None:
        pose_seq = keypoint_dit.sample(initial_pose(ref_image))
    else:
        pose_seq = pose_adapter.refine(initial_pose(ref_image), optional_pose)
    return diffusion_decode_with_prefix(ref_image, pose_seq)
```

##### 方法解读
HumanDiT 面对的是“从单图或短视频生成长人体视频”。此前 pose-guided human animation 常见问题有三类：手和脸在长序列里细节不稳，人物身份随着时间漂移，模型只能处理固定分辨率或短片段。HumanDiT 的核心策略是把视频压到 3D VAE latent，再用 DiT 进行时空联合去噪，让时间维和空间维都能进入 Transformer attention。

扩散训练目标可写成：
$$
\mathcal{L}=\mathbb{E}_{z_0,t,\epsilon}\left[\|\epsilon-\epsilon_\theta(z_t,t,\phi(P),z_{ref})\|_2^2\right],
$$
其中 \(\phi(P)\) 是 pose guider 从关键点序列得到的条件特征，\(z_{ref}\) 是参考帧 latent。与把参考图作为普通条件拼接不同，prefix-latent reference 将参考帧保留为无噪声前缀 token，让后续 token 在每一步去噪中都能直接 attend 到稳定身份锚点。

Keypoint-DiT 解决“没有完整驱动姿态怎么办”。给定第一帧关键点 \(j_0\)，它迭代去噪得到后续 \(\{j_1,\ldots,j_m\}\)。这让系统可以从静态图像自动续写运动，而不是依赖外部视频模板。对于 pose transfer，外部关键点往往和参考图的体型、脸手尺度不一致，Pose Adapter 会先做对齐，再交给 Keypoint-DiT refinement 生成平滑过渡。

HumanDiT 的训练数据规模是论文强调的另一部分：大规模 wild human videos 让 DiT 学到多场景、多衣着、多动作的分布。和 MDM 类“生成 3D motion 序列”的模型相比，HumanDiT 直接生成人体视频，因此评估重点转为身份保持、视觉质量、pose accuracy 和 temporal consistency。

> ⚠️ 注意：HumanDiT 的“长序列一致性”不是只靠更长上下文，而是 reference prefix、pose 条件和 Keypoint-DiT 共同减少身份漂移与姿态漂移。

#### 🧪 练习题
```yaml
question: "HumanDiT 中 prefix-latent reference 的核心目的是什么？"
options:
  - "减少训练数据规模"
  - "把参考帧作为无噪声前缀，稳定长视频中的人物身份"
  - "把 2D 姿态转换成 3D SMPL 参数"
  - "在推理时完全跳过扩散采样"
answer: 1
explain: "prefix latent 在每一步去噪中作为稳定参考 token 被 DiT 访问，比普通条件拼接更利于长序列身份保持。"
```
