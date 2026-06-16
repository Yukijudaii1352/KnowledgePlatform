### Streaming SP-ASR: 融合目标说话人 VAD 的流式目标说话人识别

```yaml
meta:
  id: streaming_sp_asr
  name: Streaming SP-ASR
  full_name: 流式目标说话人ASR (Streaming SP-ASR)
  year: "2026.03"
  org: "—"
  paper_url: https://www.sciencedirect.com/science/article/pii/S1051200426000862
  category: frontier_2026
  parent: tagspeech
  motivation: VAD融合流式说话人识别
  topic_id: mm_sound
  yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound.yaml
  output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_sound/streaming_sp_asr_detail.md
```

#### 📝 一句话总结

Streaming SP-ASR 将目标说话人语音识别与目标说话人 VAD 融合到端到端流式模型中，用帧级“目标说话人是否在说话”的后验去门控 ASR 声学状态，解决混合语音中非目标说话人干扰和流式场景无法等待离线分段的问题。

#### 🎯 核心要点

- 任务目标：给定混合语音流和目标说话人注册语音，只输出目标说话人的转写，非目标语音和静音应输出空。
- VAD 融合：引入目标说话人 VAD 分支预测帧级活动概率，并把该概率作为 ASR 编码状态的门控/注意力先验。
- 流式约束：按 chunk 增量处理音频，避免依赖完整录音后的离线分离、日志或重排序。
- 端到端训练：联合优化 ASR 识别损失与目标说话人活动检测损失，让识别和检测共享声学表征。
- 与 TagSpeech 的关系：TagSpeech 解决多人会议的全局“谁在何时说了什么”，Streaming SP-ASR 更像面向一个指定目标说话人的低延迟在线子问题。
- 可核验元信息：论文正式题名为 “End-to-end target speaker speech recognition with voice activity detection fusion”，发表于 Digital Signal Processing 174:105966，DOI 为 10.1016/j.dsp.2026.105966。

#### 🔬 深入细节

![Streaming SP-ASR 的 VAD 融合流程图](https://quickchart.io/graphviz?graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3Drounded%5D%3BX%5Blabel%3D%22mixture%20audio%20chunk%22%5D%3BE%5Blabel%3D%22speaker%20enrollment%5Cnx-vector%2Fembedding%22%5D%3BEnc%5Blabel%3D%22streaming%20ASR%20encoder%22%5D%3BVAD%5Blabel%3D%22target-speaker%20VAD%5Cnframe%20posterior%22%5D%3BFuse%5Blabel%3D%22VAD%20fusion%5Cngated%20acoustic%20states%22%5D%3BDec%5Blabel%3D%22CTC%2FRNN-T%20decoder%5Cntarget%20transcript%22%5D%3BX-%3EEnc%3BE-%3EVAD%3BEnc-%3EVAD%3BVAD-%3EFuse%3BEnc-%3EFuse%3BFuse-%3EDec%3B%7D)

*图：ScienceDirect 正文图没有公开稳定直链，这里用流程图抽象论文题名所指的核心方法：目标说话人 VAD 后验被融合进流式 ASR 解码。*

```python
# Streaming SP-ASR 的抽象在线解码流程
speaker_vec = speaker_encoder(enrollment_audio)
cache = StreamingCache()
partial = []

for chunk in audio_stream:
    h, cache = streaming_encoder(chunk, cache)          # 只看当前块和有限左上下文
    p_tvad = target_vad_head(h, speaker_vec)            # [frames], target-active posterior

    # VAD fusion: 用目标活动概率抑制非目标帧，保留目标说话人声学证据。
    h_target = h * p_tvad[:, None]

    token_post = streaming_asr_decoder(h_target, cache)
    partial.extend(prefix_beam_search(token_post))

    if end_of_target_segment(p_tvad):
        emit(stabilize(partial))
        partial = []
```

目标说话人 ASR 的难点不是普通 ASR 的“听清楚”，而是“只听某个人”。输入是混合语音 \(\mathbf{X}_{1:T}\) 和目标说话人注册语音 \(\mathbf{R}\)，模型需要输出目标说话人的 token 序列 \(\mathbf{Y}\)，同时对非目标说话人和静音保持空输出。若先做分离或 diarization，再做 ASR，离线系统可以利用完整上下文；但流式场景只能看到当前 chunk 和有限历史，错误分段会直接造成漏识别或把他人语音误转写给目标说话人。

VAD 融合的核心是把“目标说话人是否活跃”显式变成 ASR 的条件变量。令编码器输出为 \(\mathbf{H}=(\mathbf{h}_1,\dots,\mathbf{h}_T)\)，目标说话人嵌入为 \(\mathbf{e}\)，VAD 分支估计：

$$
p_t = P(z_t=1\mid \mathbf{h}_t,\mathbf{e})
$$

其中 \(z_t=1\) 表示第 \(t\) 帧属于目标说话人。最直接的融合方式是门控：

$$
\tilde{\mathbf{h}}_t = p_t\mathbf{h}_t
$$

也可以写成带残差的形式：

$$
\tilde{\mathbf{h}}_t = \mathbf{h}_t + \gamma p_t W[\mathbf{h}_t;\mathbf{e}]
$$

直觉上，VAD 后验不是单独拿来切段，而是作为 ASR 的软先验：目标活跃概率高的帧被增强，非目标帧被压低。这样 ASR 解码器在重叠说话时仍能保留连续声学上下文，而不是被硬 VAD 边界切碎。

训练目标通常由识别损失和活动检测损失组成：

$$
\mathcal{L} = \mathcal{L}_{asr}(\mathbf{Y}, \hat{\mathbf{Y}}) + \lambda\mathcal{L}_{vad}(\mathbf{z}, \hat{\mathbf{z}})
$$

其中 \(\mathcal{L}_{asr}\) 可由 CTC、RNN-T 或流式 attention/CTC 组合实现，\(\mathcal{L}_{vad}\) 是帧级二分类交叉熵。联合训练的价值在于共享 encoder 不只为 token 识别优化，也被迫学习“这帧是不是目标说话人”的判别边界；这比把一个外部 VAD 模型后处理到 ASR 输出上更一致。

流式推理要求模型满足因果性或有限右看。对第 \(n\) 个 chunk，编码器只能使用：

$$
\mathbf{H}^{(n)} = f_{\theta}(\mathbf{X}^{(n)}, \mathrm{cache}^{(n-1)})
$$

因此系统要在低延迟和稳定输出之间折中。若 VAD 太敏感，短暂重叠或噪声会触发错误转写；若 VAD 太保守，目标说话人的短词和插话会被漏掉。融合式设计比硬阈值切段更平滑，因为 \(p_t\) 可以作为连续权重参与解码，后续 prefix beam search 或 RNN-T state 仍能跨 chunk 保持上下文。

与 TagSpeech 相比，Streaming SP-ASR 的输出空间更窄，但在线性更强。TagSpeech 面向多人会议全局结构化输出，需要同时恢复多个说话人的时间线；Streaming SP-ASR 面向一个给定目标说话人，关键是把 speaker embedding、目标 VAD 和 ASR 解码耦合起来。两者的共同点是都把说话人信息从后处理环节前移到模型内部，不再依赖“先识别文本、再猜是谁说的”的级联补丁。

> ⚠️ 注意：该 ScienceDirect 页面当前只稳定开放元数据，正文和原图没有可直接访问的公开 URL；上面的流程图是对论文题名、DOI 元数据和目标说话人 ASR/VAD 融合范式的算法化整理，而非逐像素复刻论文原图。

#### 🧪 练习题

```yaml
question: "Streaming SP-ASR 中融合目标说话人 VAD 的主要目的是什么？"
options:
  - "把所有非语音帧删除后再离线转写"
  - "用目标说话人活动概率软门控 ASR 表征，抑制非目标说话人干扰"
  - "替代目标说话人的注册语音"
  - "把流式系统改成完整录音后的离线系统"
answer: 1
explain: "VAD 融合把帧级目标活跃概率作为识别先验，帮助流式 ASR 在混合语音中只输出目标说话人的内容。"
```
