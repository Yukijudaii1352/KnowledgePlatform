### UniLS

```yaml
id: unils
name: UniLS
full_name: "统一唇语同步 (Unified Lip Sync)"
year: "2026.06"
org: "CVPR 2026"
paper_url: "https://openaccess.thecvf.com/CVPR2026/UniLS"
category: "face"
parent: "arcface"
motivation: "音频驱动头像捕捉自发性微表情"
```

#### 📝 一句话总结

UniLS 提出仅由双轨音频驱动的端到端 speak-listen 头像表情生成框架，先无音频学习自然面部运动先验，再用双音频 cross-attention 微调以同时生成说话与聆听表情。

#### 🎯 核心要点

- **正式资料补足**：用户给定 URL 是 CVF 简写，正式论文页为 CVPR 2026 openaccess，arXiv 为 `2512.09327`
- **统一说话/聆听生成**：输入 speaker-A 与 speaker-B 双轨音频，输出双方 FLAME 面部运动
- **问题诊断**：直接音频驱动会让 listening branch 变僵硬，因为聆听动作与对方音频弱相关
- **两阶段训练**：Stage 1 无音频 autoregressive generator 学 internal motion prior；Stage 2 加入双轨音频做条件微调
- **Multi-scale VQ codec**：将 FLAME 表情/姿态 motion chunk 编成多尺度离散运动码，提高时序稳定性
- **双 cross-attention**：每个 Transformer block 分别关注自身说话音频与对方音频，避免混音条件纠缠
- **LoRA 微调**：Stage 2 新增 cross-attention 从头训练，主干用 LoRA 适配，保留 Stage 1 运动先验
- **实时性能**：论文报告 RTX 5090 上约 560.6 FPS，并在 listening metrics 上显著优于基线

#### 🔬 深入细节

![UniLS 两阶段训练框架](https://arxiv.org/html/2512.09327v2/x3.png)
*图：Stage 1 在无音频多场景数据上学习自由面部运动先验；Stage 2 在对话数据上加入双轨音频 cross-attention。*

```python
# UniLS 两阶段训练伪代码
for motion_chunk, style_id in multi_scenario_loader:
    codes = multiscale_vq_codec.encode(motion_chunk)
    pred_next = ar_transformer(prev_motion=codes[:-1], style=style_id)
    loss_stage1 = autoregressive_reconstruction(pred_next, codes[1:])
    optimize_stage1(loss_stage1)

load_stage1_weights()
for speaker_a, speaker_b in conversational_loader:
    audio_a = wav2vec(speaker_a.audio)
    audio_b = wav2vec(speaker_b.audio)
    # 生成 A：A 的音频驱动 speaking，B 的音频调制 listening
    pred_a = generator(prev_motion=speaker_a.motion, own_audio=audio_a, other_audio=audio_b)
    # 生成 B 时交换音频角色
    pred_b = generator(prev_motion=speaker_b.motion, own_audio=audio_b, other_audio=audio_a)
    loss_stage2 = chunk_reconstruction(pred_a, speaker_a.motion) + chunk_reconstruction(pred_b, speaker_b.motion)
    optimize_lora_and_cross_attention(loss_stage2)
```

**动机与背景。** 大多数 talking avatar 只生成说话者：音频和唇部动作强相关，学习目标相对明确。但真实对话中头像还要会聆听，包括眨眼、点头、微表情和视线变化。直接把双人对话数据端到端训练成 audio-to-motion 会失败：当某人处于聆听状态时，自身音频常是静音，而对方音频与自己的面部微动作只有弱相关，模型最安全的解是输出低方差“扑克脸”。

**核心观察。** UniLS 通过音频特征和 FLAME 表情参数的相关性分析发现：speaking motion 与自身音频聚类接近，而 listening motion 与对方音频分布距离更远。这说明聆听动作不是简单由外部语音直接决定，而是“内部运动先验 + 外部语音调制”。内部先验包括自然眨眼频率、头部微动、肌肉协同和个体风格。

**Multi-scale codec。** UniLS 使用 FLAME 表示面部运动，包含 expression、pose、jaw、eye gaze 等参数。为了稳定长序列生成，先训练多尺度 VQ codec，把 motion chunk 编为逐级细化的离散码。设 codebook 多尺度为 \([1,5,25,50,100]\)，低尺度捕捉全局趋势，高尺度补充细粒度时间变化。这样生成器预测的是压缩运动码，而不是直接回归每帧高维参数。

**Stage 1：无音频自由运动先验。** 第一阶段在新闻、访谈、直播、普通 talking video 等 unpaired multi-scenario data 上训练 autoregressive model。输入过去 motion chunk 和 style embedding，预测下一 chunk：

$$
\hat{M}_{t+1}=G_\theta(M_{\le t}, s)
$$

训练目标是 chunk-wise reconstruction。由于不看音频，模型必须从历史运动和风格中学习自然面部动态，这正是聆听状态需要的自发性先验。

**Stage 2：双轨音频调制。** 第二阶段在 paired conversational clips 上加入 speaker-A 和 speaker-B 的音频。生成 A 的 motion 时，A 音频负责 speaking/lip-sync，B 音频负责调制 A 的 listening reaction；生成 B 时角色交换。每个 Transformer block 新增两个 cross-attention，而不是把双音频混成一路，避免模型混淆“自己的话”和“对方的话”。主干用 LoRA 微调，防止 Stage 2 覆盖 Stage 1 学到的内部先验。

**与 DualTalk 的区别。** DualTalk 类方法需要先生成或输入一方的面部运动，再用它驱动另一方，因而不是纯音频端到端，也不利于实时。UniLS 只需双轨音频即可生成双方 speak-listen motion，并报告在 Seamless Interaction 上 listening FDD/PDD/JDD/FID 明显降低，同时支持实时。

> 💡 关键：UniLS 不是把 listening 当作“对方音频到表情”的直接映射，而是先学一个会自然动的脸，再让对话音频轻量调制它。

#### 🧪 练习题

```yaml
question: "UniLS 第一阶段为什么要进行 audio-free generator training？"
options:
  - "为了删除所有口型信息"
  - "为了学习眨眼、点头、微表情等内部运动先验，缓解直接音频驱动造成的聆听僵硬"
  - "为了把人脸检测框转换成 SMPL"
  - "为了训练 DeepFake 二分类器"
answer: 1
explain: "聆听动作与对方音频弱相关，先无音频学习自然运动动态，再用音频调制，能避免低方差静态表情。"
```
