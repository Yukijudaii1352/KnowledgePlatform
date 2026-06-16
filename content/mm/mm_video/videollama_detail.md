### VideoLLaMA：联合视觉与音频的视频大模型

```yaml
id: videollama
name: VideoLLaMA
full_name: 视频大模型 (VideoLLaMA)
year: '2023'
org: Alibaba
paper_url: https://arxiv.org/abs/2306.02858
category: video_llm
parent: video_chatgpt
motivation: 视觉-音频联合理解
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/videollama_detail.md
```

#### 📝 一句话总结

VideoLLaMA 提出视觉-语言分支与音频-语言分支并行的 Video-LLM 框架，用 Video Q-Former 和 Audio Q-Former 将视频帧与声音片段对齐到冻结 LLM 的 embedding 空间，解决视频对话只看画面、不理解声音的问题。

#### 🎯 核心要点

- 架构包含 Vision-Language Branch 与 Audio-Language Branch，两条分支分别把视频帧和音频片段变成 LLM 可读的 soft prompt
- 视觉分支使用冻结图像编码器提取帧表示，加入时间位置嵌入后交给 Video Q-Former 聚合成固定长度视频 token
- 音频分支使用 ImageBind 作为冻结音频编码器，将 2 秒音频片段转为 mel-spectrogram 后编码，再由 Audio Q-Former 汇聚
- 通过线性层把视觉/音频 query token 投影到 LLM 词嵌入维度，并与文本指令拼接输入冻结语言模型
- 采用多分支跨模态训练：视觉分支先用 WebVid-2M 与 CC595K 做 caption 预训练，再用高质量指令数据微调
- 由于音频-文本数据稀缺，音频分支利用 ImageBind 的共享嵌入空间，用视觉-文本数据进行替代式对齐训练

#### 🔬 深入细节

![VideoLLaMA 总体架构](https://ar5iv.labs.arxiv.org/html/2306.02858/assets/x1.png)
*图：VideoLLaMA 的总体架构，左侧视觉分支处理视频帧，右侧音频分支处理声音片段，二者都通过 Q-Former 和线性层对齐到 LLM。*

VideoLLaMA 继承了 BLIP-2 的思想：不直接微调整个大语言模型，而是在冻结编码器与冻结 LLM 之间训练一个轻量连接器。视觉分支中，一个视频包含 \(N\) 帧，每帧经冻结图像编码器得到 \(K_f\) 个图像 token：

$$
\mathbf{V}=[\mathbf{v}_1,\mathbf{v}_2,\dots,\mathbf{v}_N], \qquad
\mathbf{v}_i\in\mathbb{R}^{K_f\times d_f}
$$

这些帧表示最初没有显式时间信息，所以 VideoLLaMA 在帧维度加入可学习位置嵌入，再送入 Video Q-Former。Q-Former 用一组可学习 query 从所有帧 token 中抽取固定长度的视频表示：

$$
\hat{\mathbf{v}}
=\operatorname{QFormer}_V(\mathbf{V}+\mathbf{P}_V,\mathbf{Q}_V)
\in\mathbb{R}^{k_V\times d_V}
$$

随后线性层把 \(\hat{\mathbf{v}}\) 映射到 LLM embedding 维度，作为 video soft prompt。相比 Video-ChatGPT 的简单时空平均池化，VideoLLaMA 的视觉分支更强调“用 query 压缩多帧信息”：模型可以学习哪些帧、哪些 patch 对当前语言生成更有用，而不是固定地平均所有位置。

音频分支是 VideoLLaMA 区别于早期纯视觉 Video-LMM 的关键。模型从视频中均匀采样 \(M\) 个 2 秒音频片段，转换成 128-bin mel-spectrogram 后送入 ImageBind 音频编码器，得到：

$$
\mathbf{A}=[\mathbf{a}_1,\mathbf{a}_2,\dots,\mathbf{a}_M]
$$

Audio Q-Former 与视觉分支结构对称，同样加入时间位置嵌入并输出固定长度音频表示：

$$
\hat{\mathbf{A}}
=\operatorname{QFormer}_A(\mathbf{A}+\mathbf{P}_A,\mathbf{Q}_A)
\in\mathbb{R}^{K_a\times d_a}
$$

投影后的视觉 token、音频 token 和文本指令 token 被拼接为同一个上下文，送入冻结 LLM 自回归生成回答。若两种模态同时可用，条件生成可以写作：

$$
p(y\mid x,V,A)
=\prod_{m=1}^{M_y}p(y_m\mid y_{<m}, E_x, W_V\hat{\mathbf{v}}, W_A\hat{\mathbf{A}})
$$

训练目标仍是生成目标文本的负对数似然：

$$
\mathcal{L}_{\text{gen}}
=-\sum_m \log p(y_m\mid y_{<m}, E_x, E_V, E_A)
$$

```python
# VideoLLaMA 多分支训练/推理流程伪代码
for sample in dataloader:
    text_prompt, target_text = sample.instruction, sample.answer

    if sample.has_video_frames:
        frames = sample_video_frames(sample.video)
        frame_tokens = frozen_image_encoder(frames)          # [N, Kf, df]
        frame_tokens = frame_tokens + temporal_pos_embed(N)
        video_queries = video_qformer(frame_tokens)          # [kV, dV]
        video_prompt = video_linear(video_queries)           # [kV, K]
    else:
        video_prompt = empty()

    if sample.has_audio:
        clips = sample_audio_segments(sample.audio, seconds=2)
        specs = mel_spectrogram(clips, bins=128)
        audio_tokens = frozen_imagebind_audio(specs)         # [M, d]
        audio_tokens = audio_tokens + audio_pos_embed(M)
        audio_queries = audio_qformer(audio_tokens)          # [Ka, da]
        audio_prompt = audio_linear(audio_queries)           # [Ka, K]
    else:
        audio_prompt = empty()

    text_prompt_tokens = llm_embed(text_prompt)
    llm_input = concat(video_prompt, audio_prompt, text_prompt_tokens)
    loss = autoregressive_nll(frozen_llm(llm_input), target_text)
    loss.backward()                                          # 更新 Q-Former/线性层/位置嵌入
    optimizer.step()
```

训练流程分为两条主线。视觉分支先在 WebVid-2M 视频 caption 和 CC595K 图像 caption 上做 video/image-to-text generation，让连接器学会把视觉编码器输出转成 LLM 可利用的语义提示；之后再用 MiniGPT-4、LLaVA 和 Video-Chat 等高质量指令数据做视觉指令微调，恢复并增强 instruction following 能力。图像被视为单帧视频，因此图像理解和视频理解共享同一条视觉连接器。

音频分支面临更现实的数据问题：高质量音频-文本对远少于图像/视频-文本对。VideoLLaMA 的做法是利用 ImageBind 已把图像、音频等模态对齐到共同空间这一性质，让音频连接器也用视觉-文本数据训练。这个策略不是让模型“听到”图像，而是学习把 ImageBind 公共空间中的向量搬到 LLM 词嵌入空间；推理时真实音频通过 ImageBind 落入相近空间，Audio Q-Former 因而可以零样本地提供声音线索。

与 Video-ChatGPT 相比，VideoLLaMA 的主要扩展有两点：一是从固定平均池化升级为 Q-Former 查询聚合，增强多帧信息筛选能力；二是显式引入音频分支，让模型能回答“画面中发生了什么”和“声音中出现了什么”两类问题。代价是训练和模块复杂度更高，而且论文也指出它仍受数据规模、长视频上下文和 LLM 幻觉问题限制。

> 💡 关键：VideoLLaMA 的价值在于把 Video-LLM 从“看视频”推进到“看并听视频”，并给出了一套冻结基础模型、训练轻量跨模态连接器的工程路线。

#### 🧪 练习题

```yaml
question: "VideoLLaMA 为什么可以在音频-文本数据稀缺时仍训练音频分支？"
options:
  - "因为 Audio Q-Former 不需要任何训练"
  - "因为 ImageBind 已将音频和视觉等模态对齐到公共嵌入空间，可用视觉-文本数据间接训练对齐到 LLM 的连接器"
  - "因为模型把音频先转写成字幕，再输入文本编码器"
  - "因为音频分支和视觉分支完全共享同一组参数"
answer: 1
explain: "VideoLLaMA 利用 ImageBind 的跨模态公共空间，用视觉-文本数据学习从该空间到 LLM embedding 空间的映射，推理时音频特征也能通过同一空间被利用。"
```
