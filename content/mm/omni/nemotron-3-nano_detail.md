### Nemotron全模态Nano (Nemotron 3 Nano Omni)
```yaml
id: nemotron-3-nano
name: Nemotron 3 Nano
full_name: Nemotron全模态Nano (Nemotron 3 Nano Omni)
year: '2026'
org: NVIDIA
paper_url: https://nvidianews.nvidia.com/news/nvidia-nemotron-3-nano-omni-open-multimodal-model
category: frontier_2026
parent: janus-pro
motivation: 开源高效全模态小模型
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/nemotron-3-nano_detail.md
```

#### 📝 一句话总结
Nemotron 3 Nano Omni 是 NVIDIA 发布的开放高效多模态理解模型，用 31B 总参数、约 3B active 参数的 Mamba2-Transformer 混合 MoE 骨干统一处理文本、图像、视频和音频输入，面向文档理解、GUI agent、音视频推理等企业级感知子智能体。

#### 🎯 核心要点
- **输入/输出边界**：支持文本、图像、视频、音频输入，输出为文本；定位是 agent 系统的多模态 perception/reasoning 子模型。
- **高效 MoE 骨干**：基于 Nemotron 3 Nano 30B-A3B，Hugging Face 模型卡标注总参数约 31B、每 token active 参数约 3B、上下文长度 256K。
- **Encoder-Projector-LLM 架构**：视觉使用 C-RADIOv4-H，音频使用 Parakeet-TDT-0.6B-v2，二者经 MLP projector 后与文本 token 拼接送入 LLM。
- **多模态 token 压缩**：动态图像分辨率、pixel shuffle、视频 Conv3D temporal compression、Efficient Video Sampling 降低视觉/视频 token 和 TTFT。
- **音频原生支持**：16 kHz mono 音频转 log-mel，三层 stride-2 卷积下采样，总体约 12.5 audio tokens/s，并按 30 秒 clip 分段。
- **分阶段训练**：7 个 SFT 阶段从视觉 projector warmup 扩展到 256K 上下文 omni SFT，总计约 434.1M 样本、466.9B tokens，之后进行 MPO/Text-RL/Image-RL/Omni-RL。
- **部署形态**：开放 BF16、FP8、NVFP4 权重，支持 vLLM、TensorRT-LLM、SGLang、llama.cpp、Ollama 等运行时。

#### 🔬 深入细节
![Nemotron 3 Nano Omni 架构图](https://ar5iv.labs.arxiv.org/html/2604.24954v2/assets/x1.png)
*图：Nemotron 3 Nano Omni 使用视觉编码器、音频编码器和文本 token 构造统一上下文，再交给 Nemotron 3 Nano MoE LLM 推理。*

```python
# Nemotron 3 Nano Omni 推理路径伪代码
def build_multimodal_context(text, images=None, video=None, audio=None):
    seq = text_tokenizer(text)

    if images:
        for image in images:
            patches = dynamic_resolution_patches(image, min_tokens=1024, max_tokens=13312)
            v = c_radio_v4_h(patches)
            v = pixel_shuffle_downsample(v, factor=4)
            seq += vision_projector(v)

    if video:
        frames = efficient_video_sampling(video, pruning_rate=0.5)
        v = c_radio_v4_h(frames)
        v = conv3d_temporal_compress(v, stride_frames=2)
        seq += vision_projector(v)

    if audio:
        wav = resample_mono(audio, sample_rate=16000)
        mel = log_mel(wav, hop_ms=10)
        a = parakeet_tdt_encoder(mel)          # ~8x temporal downsampling
        seq += audio_projector(segment(a, seconds=30))

    seq = interleave_temporal_order(seq)       # video+audio: align by time
    return seq[:256_000]

def generate_answer(multimodal_context, enable_thinking=True):
    return nemotron3_nano_moe.generate(
        multimodal_context,
        output_modality="text",
        reasoning_mode=enable_thinking,
    )
```

Nemotron 3 Nano Omni 的核心不是“能生成任意模态”，而是把企业 agent 常见的感知输入统一到一个高吞吐文本推理模型里。NVIDIA 博文把它描述为 agent 的“eyes and ears”：屏幕录制、PDF/表格/图表、会议音频、长视频不再分别交给 OCR、ASR、VLM、LLM 多个模型串联，而是合并为同一上下文。其概率形式可以抽象为：

$$
p_{\theta}(y_{1:T}^{text}\mid x^{text},x^{image},x^{video},x^{audio})
=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t},Z)
$$

其中 \(Z\) 是由文本 token、视觉 token、音频 token 拼接并时序交错后的统一上下文。它与 OmniFlow/Omni-Diffusion 的区别在于输出侧只承诺文本，而不是图像/音频生成；但在输入侧，它覆盖文档、GUI、音频、视频等高频 agent 感知任务。

架构上，模型遵循 encoder-projector-decoder 设计。视觉输入先由 C-RADIOv4-H 编码，再通过 MLP projector 映射到 LLM hidden size；音频使用 Parakeet-TDT-0.6B-v2 FastConformer 编码器，log-mel 特征以 10 ms hop 提取，三层 stride-2 卷积使时间维下采样 \(2^3=8\)，因此约每 80 ms 产生一个 token：

$$
r_{\mathrm{audio}}=\frac{1000/10}{2^3}=12.5\ \mathrm{tokens/s}
$$

30 秒音频片段约产生 \(30\times12.5=375\) 个音频 token。视频和音频同时输入时，token 按时间顺序交错，避免“先看完整视频再听完整音频”的错位上下文。

视觉侧的效率来自 token reduction。图像不再固定切 tile，而是按原始长宽比动态选择 patch 数；pixel shuffle 进一步把视觉 token 数缩小。视频则用 Conv3D 对时间维压缩，每两个 frame 合成一个时间单元：

$$
N_{\mathrm{video}}'
\approx \frac{T}{2}\cdot \frac{N_{\mathrm{patch}}}{16}
$$

这里 \(/2\) 来自 Conv3D temporal compression，\(/16\) 是 4 倍 pixel shuffle 对二维 patch 网格的面积级压缩。再叠加 Efficient Video Sampling 时，推理可丢弃冗余视频 token，降低 prefill 显存和 time-to-first-token。

语言骨干是 Mamba2-Transformer Hybrid MoE。对每层输入 \(h\)，可抽象为注意力/Mamba 混合序列模块加稀疏专家 FFN：

$$
h'=\mathrm{SeqMix}(h)+
\sum_{e\in \mathrm{TopK}(g(h))}g_e(h)\,\mathrm{FFN}_e(h)
$$

稀疏路由使总参数达到 31B，但每个 token 只激活约 3B 参数。这也是它能在单卡部署、长上下文和高并发之间取得平衡的原因。模型卡给出 BF16 约 62GB、FP8 约 33GB、NVFP4 约 21GB 的权重形态，技术报告还评估了低比特量化在 25 个文本/图像/视频/音频 benchmark 上的精度保持。

训练采用先对齐、再联合、再强化学习的路线。SFT Stage 0 只训练视觉 projector；Stage 1 联合训练视觉和 LLM；Stage 2 只热身音频 projector；Stage 3 解冻音频 encoder 与 projector；Stage 4 开始全模态 16K SFT；Stage 5 扩到 48K，强调中长视频和 omni reasoning；Stage 6 扩到 256K，强化长文档和长上下文。SFT 目标仍是标准条件语言建模：

$$
\mathcal{L}_{\mathrm{SFT}}
=-\sum_t \log p_{\theta}(y_t\mid x^{text},x^{image},x^{video},x^{audio},y_{<t})
$$

后训练阶段包含 MPO、Text-RL、Image-RL、Omni-RL 和第二轮 Text-RL。MPO 可概括为偏好优化和质量分类优化的组合：

$$
\mathcal{L}_{\mathrm{MPO}}
=\mathcal{L}_{\mathrm{DPO}}+\lambda\mathcal{L}_{\mathrm{BCO}}
$$

Omni-RL 进一步混合图像、视频、音频、文本推理任务，用 multiple-choice、string match、数学规则、GUI 坐标和 ASR WER 等 verifier 给奖励。ASR 子任务的奖励可写成：

$$
R_{\mathrm{ASR}}=1-\mathrm{WER}(\hat{y},y)
$$

因此模型不是只靠大规模 SFT 学会看听，而是在后训练中显式强化跨模态证据整合、坐标定位、文档推理和语音转写。

> 💡 关键：Nemotron 3 Nano Omni 的“全模态”主要体现在统一多模态输入理解和 agent 感知闭环；它不是任意模态生成器，输出侧仍以文本、JSON、工具调用和转写时间戳为主。

#### 🧪 练习题
```yaml
question: "Nemotron 3 Nano Omni 获得高吞吐多模态推理的关键组合是什么？"
options:
  - "把所有输入先转写成文本，再交给普通 dense LLM"
  - "使用 31B 总参数但约 3B active 参数的混合 MoE 骨干，并对视觉/视频/音频 token 做压缩"
  - "只支持低分辨率图片，不支持音频和视频"
  - "通过图像扩散解码器输出最终答案"
answer: 1
explain: "模型的效率来自稀疏 MoE active 参数、动态视觉 token、Conv3D/EVS 视频压缩和音频下采样，而不是级联多个单模态模型。"
```
