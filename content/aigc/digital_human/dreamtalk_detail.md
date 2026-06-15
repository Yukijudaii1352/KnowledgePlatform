### DreamTalk — 扩散模型驱动的情感可控说话人脸

```yaml
id: dreamtalk
name: DreamTalk
full_name: "情感可控扩散说话人脸 (Emotional Talking Head with Diffusion)"
year: "2023"
org: "清华/字节"
paper_url: "https://arxiv.org/abs/2312.09767"
category: "expression"
parent: "sadtalker"
motivation: "LDM情感嵌入实现情感控制"
```

#### 📝 一句话总结

DreamTalk 提出用扩散模型生成情感说话人脸的 3DMM 运动，并用 style-aware lip expert 与 style predictor 同时保证唇同步、表情风格和无需额外风格视频的情感控制。

#### 🎯 核心要点

- **三组件架构**：denoising network、style-aware lip expert、style predictor
- **3DMM 运动扩散**：扩散模型在面部运动参数空间生成表情/口型，而不是直接逐像素生成视频
- **风格参考控制**：style encoder 从参考视频的 3DMM expression sequence 中提取 speaking style code
- **style-aware lip expert**：在给定说话风格条件下评估音频和嘴部运动同步，避免情感夸张破坏口型
- **style predictor**：从音频和输入 portrait 预测 style code，使推理时可以只靠语音指定情感说话风格
- **classifier-free guidance**：通过引导强度 \(\omega\) 调节情感/风格强度
- **适用数据**：在 MEAD、HDTF、VoxCeleb2 等数据上评估表情一致性、唇同步、图像质量和身份保持

#### 🔬 深入细节

##### 核心示意图

![DreamTalk 方法框架](https://arxiv.org/html/2312.09767/x2.png)
*图：DreamTalk 包含扩散去噪网络、style-aware lip expert 和 style predictor。风格可来自参考视频，也可由音频和 portrait 预测。*

##### 核心流程伪代码

```python
# DreamTalk 推理简化
def dreamtalk(portrait, audio, style_ref=None, guidance=1.0):
    id_params = extract_3dmm_identity(portrait)
    audio_feat = speech_encoder(audio)

    if style_ref is not None:
        style_motion = extract_3dmm_expression(style_ref)
        style_code = style_encoder(style_motion)
    else:
        style_code = diffusion_style_predictor(audio_feat, id_params)

    motion_t = normal_sequence()
    for t in reversed(diffusion_steps):
        cond = denoiser(motion_t, audio_feat, style_code, t)
        uncond = denoiser(motion_t, audio_feat, empty_style, t)
        motion_0 = uncond + guidance * (cond - uncond)
        motion_t = diffusion_step(motion_t, motion_0, t)

    frames = face_renderer(portrait, motion_0)
    return frames
```

##### 方法解读

情感 talking head 的难点是“一段音频同时决定口型和情绪”。普通唇同步模型倾向只优化嘴部闭合与音素对齐，容易生成中性表情；情感模型若过度追求表情强度，又会把应闭合的嘴做成张开，破坏 /m/、/b/ 等音素。DreamTalk 用扩散模型建模多样 speaking style，再用专门的 lip expert 约束风格条件下的同步。

扩散主体在 3DMM motion \(\mathbf{m}\) 上工作。前向过程把真实运动加噪：

$$
q(\mathbf{m}_t|\mathbf{m}_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}\mathbf{m}_0,(1-\bar{\alpha}_t)I)
$$

denoising network 接收 noisy motion、音频窗口 \(\mathbf{A}_w\)、timestep 和 style code \(\mathbf{s}\)，预测干净运动 \(\hat{\mathbf{m}}_0\)。论文使用 transformer 结构：音频经 encoder，噪声运动和 timestep 作为 key/value，style code 重复成 query token，最终输出中间帧的运动预测。

style-aware lip expert 的直觉类似“带情感条件的 SyncNet”。它不是只判断音频和嘴形是否同步，而是在给定 style reference 的条件下，把嘴部顶点运动和音频分别编码后计算相似度。这样，模型可以在“愤怒大张嘴”“悲伤嘴角下压”等风格中寻找正确的唇形，而不是被普通同步网络拉回中性嘴型。

style predictor 解决部署成本。早期情感方法常要求用户提供一段同一风格的参考视频，实际使用并不方便。DreamTalk 的 predictor 用音频特征和 portrait 的身份信息预测 style code；加入 portrait 是因为 style code 与说话者身份、性别、脸型等因素相关，完全只靠音频会导致身份风格不匹配。

classifier-free guidance 用来调节风格强度：

$$
\hat{\epsilon}_{guided}=(1+\omega)\epsilon_\theta(\mathbf{m}_t,\mathbf{s})-\omega\epsilon_\theta(\mathbf{m}_t,\varnothing)
$$

\(\omega=0\) 时更接近中性表达；增大 \(\omega\) 会增强指定情感，但过大可能降低唇同步或引入嘴部伪影。DreamTalk 的设计重点就是在这个表情强度与口型准确度之间取得更稳定的平衡。

> ⚠️ 注意：DreamTalk 仍依赖 3DMM 表达参数，参考身份和目标 portrait 差异很大时，表达参数可能泄漏身份信息，导致轻微 identity drift。

#### 🧪 练习题

```yaml
question: "DreamTalk 中 style-aware lip expert 的作用是什么？"
options:
  - "只预测人脸身份参数"
  - "在说话风格条件下约束音频与嘴部运动同步，平衡情感表达和口型准确"
  - "把 3DMM 网格转换为 NeRF"
  - "删除 classifier-free guidance"
answer: 1
explain: "情感表达可能改变嘴部形态，普通同步监督会与风格控制冲突。style-aware lip expert 在风格条件下评估同步，使模型既保留情感又对齐音频。"
```
