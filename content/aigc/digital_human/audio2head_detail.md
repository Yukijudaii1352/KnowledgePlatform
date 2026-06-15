### Audio2Head：音频驱动的单样本自然头部运动生成

```yaml
id: audio2head
name: Audio2Head
full_name: "音频驱动单样本头部 (Audio-driven One-shot Talking-head)"
year: "2021"
org: "浙江大学"
paper_url: "https://arxiv.org/abs/2107.09293"
category: "lip_sync"
parent: "makeittalk"
motivation: "Flow网络驱动头部姿态生成"
```

#### 📝 一句话总结

Audio2Head 用运动感知 RNN 预测与语音韵律匹配的 6D 头部姿态，并用关键点驱动的 dense motion field 生成完整 talking-head 视频，解决单图说话头缺少自然头动和大姿态下背景不稳的问题。

#### 🎯 核心要点

- 显式预测 6D 刚性头部运动，作为低频整体动态。
- 使用 motion-aware RNN 建模语音韵律与头姿之间的时序关系。
- 再用关键点/光流式 dense motion field 表示整幅图像运动。
- 生成器专注细粒度脸部运动，同时保持非脸区域稳定。
- 支持单张参考图像驱动，强调自然头部运动而非只做嘴部同步。

#### 🔬 深入细节

![Audio2Head 框架图](https://ar5iv.labs.arxiv.org/html/2107.09293/assets/x1.png)
*图：Audio2Head 先预测头部姿态，再通过 dense motion field 驱动单图生成 talking-head。*

Audio2Head 针对的是早期单图 talking-head 的典型问题：嘴会动，但头不动或头动不自然。人的头部运动往往与语音韵律、重音和停顿有关，属于低频整体运动；嘴唇和表情则是高频局部运动。把两者混在一个像素生成器里学习会很困难。

因此论文先预测 6D 头姿 \(p_t=(R_t, T_t)\)，再把头姿转换成关键点运动和 dense motion field。运动场告诉生成器每个像素应从源图哪里采样或如何变形，能在大姿态下更好保持身份和背景。

```python
# Audio2Head 推理伪代码
def audio2head(source_image, audio):
    audio_feat = audio_encoder(audio)
    pose_seq = motion_aware_rnn(audio_feat)  # 6D head pose
    kp_source = keypoint_detector(source_image)
    frames = []
    for pose in pose_seq:
        kp_driving = transform_keypoints(kp_source, pose)
        flow, occlusion = dense_motion_network(kp_source, kp_driving)
        frames.append(generator(source_image, flow, occlusion, audio_feat))
    return frames
```

相比 MakeItTalk 的 landmark 中间表示，Audio2Head 更强调通过 flow/dense motion 描述整幅图像的运动，尤其是头部转动带来的非嘴部区域变化。相比 Wav2Lip，它牺牲部分极致唇同步精度，换取更完整的头部自然运动。

#### 🧪 练习题

```yaml
question: "Audio2Head 为什么先预测 6D 头部姿态？"
options:
  - "因为头部姿态是语音相关的低频整体运动，可帮助生成自然头动并减轻后续生成器负担"
  - "因为不需要生成嘴部"
  - "因为只能处理静音视频"
  - "因为姿态预测可以替代所有图像渲染"
answer: 0
explain: "显式头姿提供整体运动骨架，后续 dense motion 和生成器再补充脸部细节。"
```
