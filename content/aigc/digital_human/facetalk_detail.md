### FaceTalk — 面向 NPHM 的音频驱动头部运动扩散

```yaml
id: facetalk
name: FaceTalk
full_name: "音频驱动运动扩散 (Audio-Driven Motion Diffusion for NPHM)"
year: "2024"
org: "TUM/Meta"
paper_url: "https://arxiv.org/abs/2312.17635"
category: "expression"
parent: "dreamtalk"
motivation: "扩散模型驱动NPHM参数化头部"
```

#### 📝 一句话总结

FaceTalk 提出在 Neural Parametric Head Model 的表达 latent 空间中用音频条件扩散模型生成 3D 头部运动，解决 FLAME/3DMM 表达能力有限、难以高保真驱动完整头部的问题。

#### 🎯 核心要点

- **NPHM 表达空间**：用神经参数化头模型表示包含头部、耳朵、头发附近几何的高保真 volumetric head
- **音频到表达扩散**：以 Wav2Vec 2.0 音频嵌入为条件，扩散生成 NPHM expression sequence
- **Transformer decoder + FiLM**：表达解码器通过 self-attention、cross-attention 和 FiLM timestep 注入完成去噪
- **配对数据构建**：利用 Nersemble 多视角视频，把每帧优化成 temporally consistent NPHM expression，构造音频-表达训练集
- **随机采样带来多样性**：同一音频可从不同噪声采样出合理但不同的面部运动
- **资料限制**：manifest 中 `paper_url` 指向 `2312.17635`，该链接与 FaceTalk 不匹配；本文方法依据公开正确论文 `https://arxiv.org/abs/2312.08459`

#### 🔬 深入细节

##### 核心示意图

![FaceTalk pipeline](https://arxiv.org/html/2312.08459v2/x2.png)
*图：FaceTalk 使用冻结 Wav2Vec 2.0 提取音频嵌入，扩散模型在 NPHM expression sequence 上迭代去噪，并用 transformer decoder 与 FiLM timestep conditioning 生成最终表达序列。*

##### 核心流程伪代码

```python
# FaceTalk 训练和推理简化
for audio, theta_exp_0 in paired_audio_nphm_dataset:
    audio_feat = wav2vec2(audio).detach()
    t = sample_timestep()
    noise = normal_like(theta_exp_0)
    theta_t = sqrt(alpha_bar[t]) * theta_exp_0 + sqrt(1 - alpha_bar[t]) * noise

    theta_hat = expression_decoder(
        noisy_expression=theta_t,
        audio_context=audio_feat,
        timestep=t,
    )
    loss = mse(theta_hat, theta_exp_0)
    loss.backward()

def sample_facetalk(audio):
    audio_feat = wav2vec2(audio)
    theta_t = normal_sequence()
    for t in reversed(diffusion_steps):
        theta_0 = expression_decoder(theta_t, audio_feat, t)
        theta_t = ddpm_or_ddim_step(theta_t, theta_0, t)
    return NPHM(identity_code, theta_0)
```

##### 方法解读

FaceTalk 的背景是：FLAME/3DMM 参数低维、稳定、易拟合，但对复杂口腔、眼睑、脸颊细节和非模板头部几何表达不足。NPHM 用神经隐式/参数化方式描述完整头部，可以表示更丰富的身份和表达，但它本身不是音频驱动模型。FaceTalk 把音频条件扩散接到 NPHM 的 expression latent 上。

训练数据是论文的关键工程。公开数据集通常有音频和视频，却没有逐帧 NPHM 表达参数。FaceTalk 使用 Nersemble 多视角说话视频，通过多视角几何、landmark、temporal prior 等约束，把每帧拟合到 NPHM expression code，并对序列做时间一致性优化。这样得到 \((A,\theta_{\text{exp}}^{1:N})\) 配对样本。

扩散过程对表达序列加噪：

$$
q(\theta_t|\theta_0)=\mathcal{N}(\sqrt{\bar{\alpha}_t}\theta_0,(1-\bar{\alpha}_t)I)
$$

模型学习反向去噪 \(p_\theta(\theta_{t-1}|\theta_t,A)\)。与图像扩散不同，FaceTalk 的目标是低维但时序相关的 expression sequence，因此采用 transformer decoder 结构：noisy expression 先嵌入到 latent 维度，Wav2Vec 2.0 特征作为 cross-attention 条件，timestep 通过 FiLM 调制中间层。

FaceTalk 的输出是 NPHM expression code，而不是最终 RGB 图像。渲染或重建时把 expression code 与 identity/shape code 输入 NPHM，即可得到高保真头部几何和动画。这个解耦让模型专注学习“音频到运动”，把几何细节和身份保持交给 NPHM 先验。

与 DreamTalk 相比，FaceTalk 更偏 3D 头部动画而非 2D talking head 视频生成；与 FLAME 系方法相比，它牺牲了一些简单参数接口，换来更丰富的 volumetric head 表示和更真实的复杂表情。扩散采样也允许同一音频产生多样合理 motion，而不是确定性平均表情。

> 💡 关键：FaceTalk 的创新在于把音频驱动从传统 3DMM/FLAME 系数迁移到 NPHM expression latent，使 talking head 可以利用更强的神经头部先验。

#### 🧪 练习题

```yaml
question: "FaceTalk 为什么要先构造音频-NPHM expression 配对数据？"
options:
  - "因为公开音频视频数据通常不直接提供 NPHM 表达参数"
  - "因为 Wav2Vec 2.0 只能处理 3D 网格"
  - "因为扩散模型不能在 latent 空间训练"
  - "因为 NPHM 不支持身份参数"
answer: 0
explain: "FaceTalk 的训练目标是从音频生成 NPHM expression sequence，但原始视频数据没有这些参数，因此需要通过多视角拟合和时间一致性优化先得到监督信号。"
```
