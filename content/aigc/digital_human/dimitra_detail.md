### Dimitra：音频驱动的表情与头姿扩散模型

```yaml
id: dimitra
name: Dimitra
full_name: "音频驱动表情扩散 (Audio-driven Diffusion for Expressive Talking Head)"
year: "2025"
org: "学术界"
paper_url: "https://arxiv.org/abs/2502.17198"
category: "talking_head"
parent: "emo"
motivation: "条件运动扩散Transformer架构"
```

#### 📝 一句话总结

Dimitra 用条件 Motion Diffusion Transformer 在 3D 人脸运动空间生成唇形、表情和头部姿态，解决仅靠音频到像素生成时身份保持弱、表情不自然和运动难控的问题。

#### 🎯 核心要点

- Motion Modeling Module 从训练视频提取 3DMM/3D mesh 运动序列作为扩散目标。
- Conditional Motion Diffusion Transformer 生成面部运动，而不是直接生成像素。
- 仅以音频序列和参考人脸图像为主条件，简化推理输入。
- 从音频中进一步提取 phoneme 与 transcript 相关特征，分别增强口型和表情/头姿真实感。
- 由 video renderer 将生成的 3D 运动序列渲染回最终 talking-head 视频。

#### 🔬 深入细节

![Dimitra 框架图](https://arxiv.org/html/2502.17198v1/extracted/6228656/Figures/dimitra.png)
*图：Dimitra 包含 Motion Modeling Module、条件 Motion Diffusion Transformer 和 Video Renderer 三部分。*

Dimitra 的核心取舍是先生成“运动”，再生成“视频”。音频到像素的端到端模型虽然直接，但很容易把口型、身份纹理、头姿、背景稳定性混在一起学习；Dimitra 将中间表示显式设为 3D 人脸运动序列，使扩散模型只负责动态建模。

训练时，Motion Modeling Module 从真实视频中估计 3DMM 或 mesh 运动，得到 \(m_{1:T}\)。扩散模型学习从噪声恢复该运动序列：

$$\mathcal{L} = \mathbb{E}_{t,m,\epsilon}\|\epsilon - \epsilon_\theta(m_t, t, a, r)\|_2^2$$

其中 \(a\) 是音频特征，\(r\) 是参考图像特征。论文摘要特别强调 phoneme 序列提升唇部运动真实性，transcript 相关信息帮助表情和头姿更符合语义节奏。

```python
# Dimitra 核心流程伪代码
def dimitra_generate(reference_image, audio):
    ref_cond = face_reference_encoder(reference_image)
    audio_cond = audio_encoder(audio)
    phoneme_cond = phoneme_encoder(audio)
    text_cond = transcript_encoder(audio)

    motion = gaussian_noise(shape=[T, motion_dim])
    for step in diffusion_steps:
        eps = cMDT(motion, step, ref_cond, audio_cond, phoneme_cond, text_cond)
        motion = scheduler.step(motion, eps, step)
    return video_renderer(reference_image, motion)
```

与 EMO 这类直接 Audio2Video 方法相比，Dimitra 的优势是可解释和可控：口型、表情、头姿都落在运动空间中，便于约束和分析。缺点是上限依赖 3D 运动估计器和 renderer，若 3DMM 无法表示细微皱纹或复杂遮挡，最终视频也会受限。

#### 🧪 练习题

```yaml
question: "Dimitra 为什么先生成 3D 人脸运动而不是直接生成视频像素？"
options:
  - "为了避免使用扩散模型"
  - "为了将唇形、表情和头姿解耦到更可控的运动空间"
  - "为了只支持文本输入"
  - "为了删除参考图像条件"
answer: 1
explain: "3D 运动空间能把动态和身份纹理分离，扩散模型专注学习运动序列，renderer 再负责视频合成。"
```
