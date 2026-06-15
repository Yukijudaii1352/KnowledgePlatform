### SyncNet：音视频同步判别器

```yaml
id: syncnet
name: SyncNet
full_name: "音视频同步判别器 (Out of Time: Audio-Visual Synchronisation)"
year: "2016"
org: "牛津VGG"
paper_url: "https://arxiv.org/abs/1606.00264"
category: "lip_sync"
parent: "—"
motivation: "双流CNN对比学习音视频对齐"
```

#### 📝 一句话总结

SyncNet 用双流 CNN 将口部视频片段和语音片段映射到同一嵌入空间，通过距离最小化判断音视频是否同步，成为后续 Wav2Lip、LSE-C/LSE-D 等口型同步训练与评估的基础。

#### 🎯 核心要点

- 使用视觉流处理连续口部 ROI，音频流处理对应语音频谱。
- 用正负时间偏移样本进行自监督/弱监督对比学习，不依赖逐帧人工标注。
- 通过扫描时间 offset 找到音频和视频嵌入距离最小的位置。
- 可用于自动纠正音画延迟、主动说话人检测和唇读辅助。
- 后续 talking-head 论文常把 SyncNet 作为唇同步判别器或评价指标来源。

#### 🔬 深入细节

![SyncNet 论文图示](https://www.robots.ox.ac.uk/~vgg/publications/2016/Chung16a/chung16a.pdf)
*图：官方论文 PDF 中给出了 SyncNet 双流音视频嵌入框架；早期项目页未提供稳定图片直链，因此此处使用官方 PDF 作为图示来源。*

> ⚠️ 资料限制：manifest 中 `1606.00264` 快速核验为不相关 arXiv 条目；SyncNet 对应官方论文为 Oxford VGG 的 `Out of time: automated lip sync in the wild` PDF，本文据该公开资料整理。

SyncNet 的核心不是生成视频，而是回答一个判别问题：给定一小段口部图像序列 \(v\) 和一小段音频 \(a\)，它们是否来自同一时间？如果同步，视觉嵌入和音频嵌入应该接近；如果错开若干帧，距离应该变大。

模型由两个分支组成。视觉分支输入连续 mouth ROI，提取唇形运动特征；音频分支输入 MFCC/频谱片段，提取发音特征。两个分支输出同维 embedding，训练时用 contrastive loss 拉近同步样本、推远异步样本：

$$\mathcal{L}=yD^2+(1-y)\max(m-D,0)^2,\quad D=\|f_v(v)-f_a(a)\|_2$$

推理时，SyncNet 会在多个时间偏移上计算距离曲线，距离最小的位置就是估计的同步 offset。后续 Wav2Lip 把类似判别器变成训练监督：生成器只有让口型与音频 embedding 接近，才能获得低 sync loss。

```python
# SyncNet offset 搜索伪代码
def syncnet_offset(video_mouth, audio):
    scores = []
    for offset in range(-max_shift, max_shift + 1):
        v_emb = visual_cnn(crop_mouth_window(video_mouth))
        a_emb = audio_cnn(shift_audio_window(audio, offset))
        scores.append((offset, l2_distance(v_emb, a_emb)))
    return min(scores, key=lambda x: x[1])  # distance 最小即最同步
```

SyncNet 的影响在于它给 talking-head 领域提供了一个可学习的“同步感知度量”。相比只看像素重建，SyncNet 更关注发音和口型之间的跨模态一致性，因此特别适合作为唇同步任务的训练信号。

#### 🧪 练习题

```yaml
question: "SyncNet 判断音视频同步的核心依据是什么？"
options:
  - "视频帧的颜色直方图是否一致"
  - "音频嵌入和口部视觉嵌入在共同空间中的距离是否足够小"
  - "人脸检测框面积是否固定"
  - "视频是否达到 4K 分辨率"
answer: 1
explain: "SyncNet 训练双流网络学习共同嵌入，同步音视频距离小，错位样本距离大。"
```
