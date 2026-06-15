### Wav2Lip：用唇同步专家监督任意人脸口型生成

```yaml
id: wav2lip
name: Wav2Lip
full_name: "口型同步专家 (A Lip Sync Expert Is All You Need)"
year: "2020"
org: "IIIT Hyderabad"
paper_url: "https://arxiv.org/abs/2008.10010"
category: "lip_sync"
parent: "syncnet"
motivation: "SyncNet判别器强制精确同步"
```

#### 📝 一句话总结

Wav2Lip 预训练强唇同步专家判别器，并用它监督生成器重绘任意身份视频的嘴部区域，解决野外视频中口型与目标语音不准的问题。

#### 🎯 核心要点

- 输入目标音频和待修改人脸帧，生成与音频匹配的下半脸/嘴部。
- 使用预训练 lip-sync expert 提供同步损失，而不是只靠像素重建。
- 生成器包含人脸编码器、音频编码器和解码器，融合语音与视觉身份特征。
- 额外使用视觉质量判别器提升嘴部纹理真实感。
- 提出更严格的 LSE-C、LSE-D 等同步评价思路，影响后续口型同步论文。

#### 🔬 深入细节

![Wav2Lip 框架图](https://ar5iv.labs.arxiv.org/html/2008.10010/assets/x1.png)
*图：Wav2Lip 使用音频编码、视觉编码和 lip-sync expert 监督生成口型同步结果。*

Wav2Lip 的关键观察是：普通重建损失会鼓励模型生成“平均嘴型”，但不会强制每个音素对应正确唇形。于是论文先训练一个专家同步网络 \(D_{sync}\)，它像 SyncNet 一样判断音频片段和嘴部视频片段是否同步，再把它冻结为生成器的训练监督。

生成器输入包括目标帧、被 mask 的下半脸区域和音频 mel 片段。视觉编码器负责保留身份、姿态、光照；音频编码器提取当前发音；解码器输出修复后的嘴部图像。核心同步损失可写为：

$$\mathcal{L}_{sync}=-\log\left(\cos(f_v(\hat{V}), f_a(A))\right)$$

总损失通常结合重建项、同步项和视觉质量对抗项：

$$\mathcal{L}=\mathcal{L}_{recon}+\lambda_{sync}\mathcal{L}_{sync}+\lambda_{adv}\mathcal{L}_{adv}$$

```python
# Wav2Lip 训练伪代码
def train_wav2lip(face_frames, audio_mel, gt_frames):
    masked_face = mask_lower_half(face_frames)
    pred = generator(masked_face, face_frames, audio_mel)
    recon_loss = l1(pred, gt_frames)
    sync_loss = lip_sync_expert_loss(pred, audio_mel)  # expert 冻结
    adv_loss = visual_quality_discriminator(pred)
    loss = recon_loss + lambda_sync * sync_loss + lambda_adv * adv_loss
    loss.backward()
```

与 MakeItTalk、Audio2Head 等生成完整头部运动的方法相比，Wav2Lip 更专注“口型重绘”。它的优势是同步精度高、身份泛化强；局限是头部运动和表情整体自然度主要继承输入视频，不能从单图生成完整动态。

#### 🧪 练习题

```yaml
question: "Wav2Lip 的核心创新是什么？"
options:
  - "只用 L1 像素损失训练嘴部生成器"
  - "用预训练唇同步专家作为冻结监督，强制生成嘴型与音频匹配"
  - "完全不输入人脸图像"
  - "只生成音频而不生成视频"
answer: 1
explain: "lip-sync expert 提供跨模态同步信号，使生成器不只是重建像素，而是学会按音频发音修正口型。"
```
