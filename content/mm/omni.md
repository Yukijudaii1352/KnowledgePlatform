---
domain: multimodal
topic_id: omni
topic_name: Omni模型技术演进总结
page_icon: 🌐
page_title: Omni模型技术演进总结
page_subtitle: '{build_date} 版'
page_desc: 全模态统一处理技术的发展脉络，涵盖文本/图像/视频/音频的Any-to-Any交互
hero_pills:
- 🏷️ Omni-Modal · Any-to-Any · Foundation Models
count_pill: '{count} 个算法'
categories:
  unified_seq2seq:
    label: 统一Seq2Seq
    color: '#3498db'
  autoregressive:
    label: 自回归生成
    color: '#27ae60'
  diffusion_fusion:
    label: 扩散模型融合
    color: '#9b59b6'
  encoder_llm_decoder:
    label: 编码器-LLM-解码器
    color: '#e67e22'
  native_e2e:
    label: 原生端到端
    color: '#e74c3c'
  frontier_2026:
    label: 2026前沿
    color: '#1abc9c'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: ofa
  x: 100
  y: 100
  category: unified_seq2seq
- id: unified-io
  x: 120
  y: 100
  category: unified_seq2seq
- id: uni-perceiver-v2
  x: 200
  y: 100
  category: unified_seq2seq
- id: unival
  x: 220
  y: 100
  category: unified_seq2seq
- id: speecht5
  x: 100
  y: 150
  category: unified_seq2seq
- id: lauragpt
  x: 200
  y: 150
  category: unified_seq2seq
- id: unified-io-2
  x: 300
  y: 200
  category: autoregressive
- id: anygpt
  x: 300
  y: 250
  category: autoregressive
- id: emu3
  x: 320
  y: 250
  category: autoregressive
- id: chameleon
  x: 340
  y: 250
  category: autoregressive
- id: show-o
  x: 360
  y: 250
  category: autoregressive
- id: audiopalm
  x: 200
  y: 300
  category: encoder_llm_decoder
- id: qwen-audio
  x: 220
  y: 300
  category: encoder_llm_decoder
- id: next-gpt
  x: 200
  y: 350
  category: encoder_llm_decoder
- id: onellm
  x: 300
  y: 350
  category: encoder_llm_decoder
- id: imagebind
  x: 200
  y: 400
  category: encoder_llm_decoder
- id: meta-transformer
  x: 220
  y: 400
  category: encoder_llm_decoder
- id: languagebind
  x: 300
  y: 400
  category: encoder_llm_decoder
- id: codi
  x: 200
  y: 500
  category: diffusion_fusion
- id: codi-2
  x: 300
  y: 500
  category: diffusion_fusion
- id: omniflow
  x: 400
  y: 500
  category: diffusion_fusion
- id: gpt-4o
  x: 300
  y: 600
  category: native_e2e
- id: gemini-1.5
  x: 320
  y: 600
  category: native_e2e
- id: llama-4-scout
  x: 400
  y: 600
  category: native_e2e
- id: janus-pro
  x: 400
  y: 700
  category: frontier_2026
- id: minicpm-o
  x: 500
  y: 650
  category: frontier_2026
- id: qwen3.5-omni
  x: 520
  y: 650
  category: frontier_2026
- id: omni-diffusion
  x: 500
  y: 700
  category: frontier_2026
- id: nemotron-3-nano
  x: 540
  y: 650
  category: frontier_2026
- id: gpt-5.5-instant
  x: 560
  y: 650
  category: frontier_2026
edges:
- from: ofa
  to: unified-io
  label: 任务扩展
- from: ofa
  to: uni-perceiver-v2
  label: 视觉增强
- from: ofa
  to: unival
  label: 轻量化
- from: unified-io
  to: unified-io-2
  label: 自回归化
- from: speecht5
  to: audiopalm
  label: LLM融合
- from: speecht5
  to: lauragpt
  label: 端到端
- from: audiopalm
  to: qwen-audio
  label: 规模扩展
- from: anygpt
  to: emu3
  label: 纯Token化
- from: anygpt
  to: chameleon
  label: 早期融合
- from: chameleon
  to: show-o
  label: 混合建模
- from: chameleon
  to: janus-pro
  label: 解耦编码
- from: show-o
  to: omni-diffusion
  label: 扩散统一
- from: next-gpt
  to: onellm
  label: 模态扩展
- from: imagebind
  to: meta-transformer
  label: 编码统一
- from: imagebind
  to: languagebind
  label: 语言中心
- from: codi
  to: codi-2
  label: 交错生成
- from: codi-2
  to: omniflow
  label: 修正流
- from: gpt-4o
  to: gemini-1.5
  label: MoE架构
- from: gpt-4o
  to: minicpm-o
  label: 全双工
- from: gpt-4o
  to: nemotron-3-nano
  label: 智能体优化
- from: gpt-4o
  to: gpt-5.5-instant
  label: 可靠性强化
- from: gemini-1.5
  to: qwen3.5-omni
  label: 双核架构
- from: gemini-1.5
  to: llama-4-scout
  label: 开源MoE
milestones:
- ofa
- gpt-4o
- qwen3.5-omni
```

## 核心算法

### OFA

```yaml
id: ofa
num: 1
name: OFA
full_name: 统一架构模型 (One For All)
year: '2022'
org: 阿里达摩院
parent: —
paper_url: https://arxiv.org/abs/2202.03052
project_url: ''
category: unified_seq2seq
motivation: 架构/模态/任务三统一的Seq2Seq
```

#### 📝 一句话总结
OFA 提出了一个指令驱动的统一 Seq2Seq 多模态预训练框架，把视觉、语言、跨模态理解与生成任务都改写成“给定输入与任务指令，生成目标 token 序列”的问题，解决了传统多模态模型依赖任务专用头和模态专用适配器的问题。

#### 🎯 核心要点
- 统一架构：采用 Transformer encoder-decoder，把预训练、微调和零样本推理都放入同一个 Seq2Seq 生成框架。
- 统一 I/O：文本使用 BPE token，图像输出使用离散图像码，目标框使用离散位置 token，所有输出共享同一词表。
- 统一任务：跨模态任务包含 visual grounding、grounded captioning、image-text matching、image captioning、VQA。
- 统一单模态学习：视觉侧使用 image infilling 与 object detection，语言侧使用 text infilling。
- 指令化训练：每个任务用自然语言 instruction 指定输出语义，微调时不增加任务专用层。
- 训练目标：所有任务统一为自回归交叉熵，输出可以是文本、位置序列或图像离散码。

#### 🔬 深入细节
![OFA 预训练任务示意图](https://ar5iv.labs.arxiv.org/html/2202.03052/assets/x1.png)
*图：OFA 将视觉定位、带定位描述、图文匹配、图像描述、VQA、目标检测、图像补全和文本补全统一为 Seq2Seq 预训练任务。*

```python
# OFA 统一 Seq2Seq 训练流程伪代码
for batch in mixed_pretraining_tasks:
    x = encode_input(batch.image, batch.text, batch.region)
    s = build_instruction(batch.task)          # 例如 "What does the image describe?"
    y = encode_target(batch.answer)            # 文本、位置 token 或图像离散码

    h = encoder(concat(x, s))
    logits = decoder(y_shifted_right, cross_attend=h)
    loss = cross_entropy(logits, y)
    update(theta, loss)

for request in downstream_tasks:
    x, s = format_as_instruction(request)
    y_hat = autoregressive_decode(encoder(concat(x, s)), strategy="beam_search")
```

OFA 的关键不是发明一个新的视觉骨干，而是把“任务接口”统一掉。传统 V&L 模型常见做法是：图像先经过检测器或视觉 backbone 得到区域特征，再为 VQA、检索、定位、分类等任务接不同的分类头或回归头。OFA 反过来要求所有任务都输出一串 token：VQA 输出答案文本，visual grounding 输出 \(\langle x_1,y_1,x_2,y_2\rangle\) 位置 token，图像生成输出离散图像码。这样模型看到的训练目标始终是“根据输入和指令预测下一个 token”。

输入表示也围绕这个目标设计。视觉输入 \(\mathrm{x}_v\in\mathbb{R}^{H\times W\times C}\) 经 ResNet 模块转成 patch feature；文本经 BPE 转成子词序列；图像输出被量化成稀疏离散码，例如 \(256\times256\) 图像可表示成 \(16\times16\) 的图像码序列；物体位置则将连续坐标均匀离散为 location token。最终词表同时包含 subword、image code 和 location token，使 decoder 不必切换输出头。

训练目标是标准自回归交叉熵。给定输入 \(x\)、任务指令 \(s\) 和目标序列 \(y\)，OFA 最小化：

$$
\mathcal{L}_{\text{OFA}}=-\sum_{i=1}^{|y|}\log P_{\theta}(y_i\mid y_{<i},x,s)
$$

这个公式的直觉很简单：无论目标是“yes/no”、一段 caption、一个框坐标，还是图像离散码，模型都只学习条件生成分布 \(P_\theta(y_i\mid y_{<i},x,s)\)。任务差异被前缀指令和目标 token 类型吸收，而不是被不同网络分支吸收。

在架构上，OFA 采用 encoder-decoder Transformer。encoder 对输入图像 patch、文本 token 和 instruction 建模，decoder 自回归生成目标序列，并通过 cross-attention 访问 encoder 表示。为了兼容不同模态的位置结构，OFA 使用文本与图像各自的绝对位置嵌入，并结合文本 1D relative position bias 与图像 2D relative position bias；这比只把图像 patch 当成普通一维文本 token 更适合空间任务。

预训练任务覆盖“跨模态 + 视觉单模态 + 语言单模态”。跨模态部分学习图文对齐、描述生成、问答和定位；视觉单模态的 image infilling 让模型从被遮挡图像生成中间区域的离散图像码，object detection 让模型生成对象框和类别；语言侧 text infilling 继承 BART 式去噪预训练。相比只在图文对上训练的模型，OFA 的多任务组合让同一个 decoder 同时练到理解、定位和生成能力。

> 💡 关键：OFA 的“一统”不是把所有模态压成同一种原始特征，而是把所有任务输出压成同一种可生成序列；架构统一由 Seq2Seq 保证，模态统一由离散 token 词表保证，任务统一由 instruction 保证。

### Unified-IO

```yaml
id: unified-io
num: 2
name: Unified-IO
full_name: 统一输入输出模型 (Unified-IO)
year: '2022'
org: Allen AI
parent: ofa
paper_url: https://arxiv.org/abs/2206.08916
project_url: ''
category: unified_seq2seq
motivation: 首个处理95种视觉语言任务
```

#### 📝 一句话总结
Unified-IO 将文本、图像、深度图、分割 mask、关键点、框等输入输出全部离散化为统一词表 token，并用单一 T5 式 encoder-decoder 处理 95 个视觉、语言和多模态数据集，解决了通用视觉语言模型仍依赖任务或模态专用分支的问题。

#### 🎯 核心要点
- 单一架构：基于 T5 的 Transformer encoder-decoder，无任务专用 head、无模态专用输出分支。
- 统一表示：文本用 SentencePiece，图像与密集结构用 VQ-GAN token，框和关键点用 1000 个离散坐标 token。
- 密集输出转图像：深度、法线、分割等 per-pixel 输出先转成 RGB/灰度图，再通过 VQ-GAN 变为离散 token。
- 两阶段训练：先做文本 span denoising 与 masked image denoising，再在 95 个数据集、62 个公开数据源上大规模多任务训练。
- 训练混合策略：任务组近似均衡采样，图像生成与密集标注单独调权，组内按数据集规模平方根采样以照顾小任务。
- 泛化目标：不做任务专用 fine-tuning，直接覆盖 GRIT 7 个任务，并在 16 个额外 CV/NLP benchmark 上验证。

#### 🔬 深入细节
![Unified-IO 架构示意图](https://ar5iv.labs.arxiv.org/html/2206.08916/assets/x2.png)
*图：Unified-IO 用同一个 Seq2Seq 模型处理对象分割、VQA、深度估计和目标定位等异构任务。*

```python
# Unified-IO 统一输入输出流程伪代码
for example in train_stream:
    prompt = task_to_prompt(example.task)
    input_tokens = []
    input_tokens += sentencepiece(example.text_input)
    input_tokens += patch_embed(example.image_input)
    input_tokens += coord_tokens(example.sparse_input)

    if example.output_is_dense:
        target_tokens = vqgan_encode(to_rgb_image(example.dense_target))
    elif example.output_is_sparse:
        target_tokens = coord_tokens(example.boxes_or_keypoints)
    else:
        target_tokens = sentencepiece(example.text_target)

    logits = unified_encoder_decoder(prompt, input_tokens, target_tokens[:-1])
    loss = cross_entropy(logits, target_tokens)
    update(theta, loss)
```

Unified-IO 延续 OFA 的 Seq2Seq 方向，但把“统一输入输出”的范围显著扩大到更典型的计算机视觉任务。它面对的难点是：VQA 输出文本，检测输出框，关键点输出坐标，深度估计输出连续图，语义或实例分割输出 mask，图像生成输出像素。如果每种输出都接一个 head，模型仍然只是共享 backbone，不是真正统一。Unified-IO 的做法是把这些输出全部转成 token 序列，让 decoder 始终只做离散序列生成。

密集结构的处理是核心设计。深度图被归一化为灰度图，surface normal 的 \(x/y/z\) 方向被映射到 \(r/g/b\)，分割 mask 则将实例映射为颜色图并在文本中说明颜色到类别的对应关系。随后这些图像式目标通过 VQ-GAN 编码为离散码；论文使用 \(256\times256\) 分辨率、压缩率 16、16384 大小 codebook 的 VQ-GAN，因此一个密集输出可以变成 \(16\times16=256\) 个视觉 token。

稀疏结构则用坐标 token。模型向词表加入 1000 个 location token，将归一化坐标离散化；一个点由 \(x,y\) 两个 token 表示，一个 box 由四个角点坐标 token 表示，带标签的 box 再跟随文本类别 token。于是检测、定位、姿态估计都可以写成：

$$
y=[\text{loc}_{x_1},\text{loc}_{y_1},\text{loc}_{x_2},\text{loc}_{y_2},\text{text label}]
$$

统一后的训练目标仍是自回归似然。若把文本、图像 patch、坐标和 VQ-GAN token 统一记为输入序列 \(z\)，则：

$$
\mathcal{L}_{\text{UIO}}=-\sum_{i=1}^{|y|}\log P_{\theta}(y_i\mid y_{<i},z)
$$

这个目标让所有任务共用同一 decoder softmax。词表总规模约为 49536，其中包含 32152 个语言 token、1000 个 location token 和 16384 个 vision token；因此“生成一个类别词”和“生成一个图像码”在建模形式上完全一致，只是 token 类型不同。

架构层面，Unified-IO 基本沿用 T5 encoder-decoder：encoder 接收提示、文本、图像 patch 和稀疏结构，decoder 生成目标 token。为了适配视觉输入，它将图像 reshape 为 patch 后线性投影，并扩展 T5 的相对位置表示为二维 learned relative embedding，同时加入绝对位置嵌入，因为深度、分割、定位这类任务对空间位置极敏感。

训练分两步。第一步预训练包含 text span denoising 和 masked image denoising：文本随机破坏 15% token，图像随机遮挡 75% patch，并允许另一模态作为上下文。第二步多任务训练把 95 个数据集混合进 batch。采样策略不是简单按样本量抽取，否则小任务几乎见不到；论文对任务组做近似均衡，对组内数据集按规模平方根采样，使深度估计、grounded VQA 等小任务仍能得到训练信号。

> 💡 关键：Unified-IO 的贡献在于把“任务适配”从模型结构中移出，放到输入提示、输出 token 化和数据混合策略中；模型本身始终是一个普通的 Seq2Seq Transformer。

### Unified-IO 2

```yaml
id: unified-io-2
num: 3
name: Unified-IO 2
full_name: 统一输入输出模型第二代 (Unified-IO 2)
year: '2024'
org: Allen AI
parent: unified-io
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Lu_Unified-IO_2_Scaling_Autoregressive_Multimodal_Models_with_Vision_Language_Audio_CVPR_2024_paper.html
project_url: ''
category: autoregressive
motivation: Any-to-Any自回归统一模型
```

#### 📝 一句话总结
Unified-IO 2 提出了一个从头训练的 Any-to-Any 自回归多模态模型，把文本、图像、音频、视频、动作和稀疏/密集标签都表示为共享 token 序列，并通过多模态 mixture-of-denoisers、稳定化注意力和动态 packing 解决大规模异构模态训练不稳定与低效的问题。

#### 🎯 核心要点
- Any-to-Any 能力：可输入文本、图像、音频、视频/历史帧等，可输出文本、图像、音频、动作、框、关键点和密集图。
- 统一 tokenizer：文本使用 LLaMA BPE，稀疏结构使用 1000 个坐标 token，图像输出用 VQ-GAN token，音频输出用 ViT-VQGAN token。
- 统一架构：单一 encoder-decoder Transformer，ViT/AST 编码图像和音频，decoder 自回归生成目标模态 token。
- 多模态预训练：从头训练于 1B 图文对、1T 文本 token、180M 视频、130M 图文交错样本、3M 3D assets 和 1M agent trajectories 等数据。
- 指令微调：组合超过 120 个数据集、约 220 个任务，覆盖视觉、语言、音频、动作和 embodied AI。
- 稳定化设计：2D RoPE、QK normalization、perceiver resampler 的 scaled cosine attention、float32 attention logits、冻结 ViT/AST 预训练阶段。
- 效率设计：动态 packing 在流式训练中把长短样本组合进同一序列，带来接近 4x 的训练吞吐提升。

#### 🔬 深入细节
![Unified-IO 2 架构示意图](https://arxiv.org/html/2312.17172v1/x2.png)
*图：Unified-IO 2 将文本、图像、音频及历史模态编码为序列，经单一 encoder-decoder Transformer 生成文本、图像或音频离散 token。*

```python
# Unified-IO 2 多模态自回归训练伪代码
for sample in multimodal_stream:
    target_modality = sample.target_modality      # text / image / audio / action / structure
    paradigm = sample.denoiser_type               # [R] span/masked denoise, [S] causal generation, [X] extreme corruption

    text_tokens = llama_bpe(sample.text)
    sparse_tokens = discretize_boxes_points_actions(sample.structures)
    image_embeds = vit_encode(sample.images)
    audio_embeds = ast_encode(sample.audio_spectrograms)
    history_tokens = perceiver_resample(sample.history_images_or_audio)

    encoder_input = pack([target_modality, paradigm, text_tokens,
                          sparse_tokens, image_embeds, audio_embeds, history_tokens])
    target_tokens = tokenize_target(sample.target, target_modality)

    logits = encoder_decoder(encoder_input, target_tokens[:-1])
    loss = autoregressive_ce(logits, dynamic_mask(target_tokens, paradigm))
    update(theta, loss)
```

Unified-IO 2 相比 Unified-IO 的最大变化是从“视觉+语言+部分视觉输出”扩展到真正的 Any-to-Any：图像、音频、文本、动作和结构化标签都可以作为条件或目标。它没有采用“LLM + 外挂视觉编码器 + 外挂扩散解码器”的模块拼接路线，而是从头训练一个 encoder-decoder Transformer，让目标模态都以离散 token 形式进入同一个自回归生成过程。

表示层仍是统一的基础。文本输入输出采用 LLaMA BPE，以支持 Unicode 和空白符；框、关键点、相机位姿等稀疏结构被离散为 1000 个特殊坐标 token；图像输入经 ViT 提取 patch feature，图像输出由 VQ-GAN 量化，\(256\times256\) 图像被编码为 1024 个 token，codebook 大小为 16512；音频先转 spectrogram，经 AST 编码输入，输出侧用 ViT-VQGAN 将 \(256\times128\) 频谱图变成 512 个 token，codebook 大小为 8196。

多轮或跨帧上下文通过 history 机制处理。模型允许最多 4 个额外图像或音频片段作为历史输入，但直接拼接会让序列过长，因此 Unified-IO 2 用 perceiver resampler 压缩历史特征：图像历史压到 32 个 token，音频历史压到 16 个 token。这样模型能做视频跟踪、图像编辑参考、音频上下文等任务，同时控制 Transformer 的上下文成本。

训练目标被设计成多模态 Mixture of Denoisers。文本沿用 UL2 的 \([R]\) span corruption、\([S]\) causal LM 和 \([X]\) extreme span corruption；图像和音频也定义对应范式：\([R]\) 做 masked denoising，\([S]\) 表示只根据其他模态生成目标模态。若 \(\tau_m\) 是目标模态 token，\(\rho_p\) 是 denoiser 范式 token，则可概括为：

$$
\mathcal{L}_{\text{MM-MoD}}
=\mathbb{E}_{(m,p)\sim\pi}\left[
-\sum_{t=1}^{|y|}\log P_{\theta}(y_t^{(m,p)}\mid y_{<t}^{(m,p)},E_{\theta}(\tilde{x}^{(m,p)}),\tau_m,\rho_p)
\right]
$$

这个目标的直觉是：同一个模型既要会“补全被遮掉的图像/音频/文本”，也要会“从其他模态条件生成完整目标”。为避免图像和音频 denoising 的 decoder 侧信息泄漏，论文提出 autoregressive with dynamic masking：被 mask 的 token 不能通过 decoder 前缀偷看到答案，但在预测该 token 时仍保持自回归生成形式，从而兼顾表示学习和生成能力。

大规模多模态混训的主要工程风险是注意力数值不稳定。Unified-IO 2 将位置建模从 Unified-IO 的相对位置扩展为 2D RoPE：对二维坐标 \((i,j)\)，把 query/key head 维度拆成两半，分别施加行与列方向的 rotary embedding。注意力中再对 query/key 做 LayerNorm，抑制 logits 爆炸：

$$
\mathrm{Attn}(Q,K,V)=\mathrm{softmax}\left(\frac{\mathrm{LN}(Q)\mathrm{LN}(K)^\top}{\sqrt{d}}\right)V
$$

对于 perceiver resampler，论文进一步使用 scaled cosine attention，因为即使 QK normalization 也不足以稳定压缩图像/音频历史时的极端 logits。此外，预训练阶段冻结 ViT 和 AST，attention logits 用 float32 计算，这些细节共同保证模型在加入视频、音频、动作后仍能稳定训练。

效率上，Unified-IO 2 引入动态 packing。多模态样本长度差异极大：一句文本可能只有几十 token，一张输出图像有 1024 token，音频也有数百 token。静态预处理 packing 难以处理流式数据和外部模态编码器，因此论文在 encoder-decoder 前后动态重排，把短样本和长样本组合成同一 transformer 序列，并用 attention mask 防止不同样本交叉注意。这让训练吞吐接近提升 4 倍，是其能扩展到 600TB 级数据的重要条件。

> 💡 关键：Unified-IO 2 的 Any-to-Any 不是靠多个专家模型路由完成，而是靠统一 token 空间、统一自回归目标和稳定化训练配方把多模态能力压进一个模型。

### Uni-Perceiver v2

```yaml
id: uni-perceiver-v2
num: 4
name: Uni-Perceiver v2
full_name: 通用感知器第二代 (Uni-Perceiver v2)
year: '2023'
org: 商汤/清华
parent: ofa
paper_url: https://openaccess.thecvf.com/content/CVPR2023/html/Li_Uni-Perceiver_v2_A_Generalist_Model_for_Large-Scale_Vision_and_Vision-Language_CVPR_2023_paper.html
project_url: ''
category: unified_seq2seq
motivation: 通用视觉-语言统一建模
```

#### 📝 一句话总结
Uni-Perceiver v2 提出用“通用区域提议 + 共享任务解码器”统一建模大规模视觉与视觉-语言任务，解决早期通用模型难以覆盖检测、分割、检索等核心任务且性能弱的问题。

#### 🎯 核心要点
- 将图像编码为全局表示与区域提议表示的拼接，区域提议同时包含语义、边框和掩码信息
- 使用预训练 RoBERTa BASE 编码文本，使用 ResNet/Swin + MaskDINO 风格区域提议网络编码图像
- 用共享的 modality-agnostic Transformer decoder 处理不同任务，避免任务特定 decoder 和任务特定微调
- 将分类、检测、实例分割、图文检索、图像描述、语言建模等任务统一为最大似然估计
- 定位任务直接复用区域提议的 box/mask 作为空间输出，非定位任务使用统一 decoder 后的跨模态匹配或生成结果
- 在 unified decoder 的 FFN 中采用 attribute-level Conditional MoE 缓解多任务干扰
- 提出非混合采样策略与 MT-AdamW，通过任务梯度归一化和采样比例补偿稳定多任务训练
- 训练数据覆盖 ImageNet-1k、COCO、BookCorpus/Wikipedia、SBU、Visual Genome、COCO Caption、CC3M、CC12M、YFCC 等公开数据

#### 🔬 深入细节
##### 框架总览

![Uni-Perceiver v2 通用任务建模对比](https://ar5iv.labs.arxiv.org/html/2211.09808/assets/x1.png)
*图：传统 foundation model 需要按任务接入不同 decoder，而 Uni-Perceiver v2 用共享的通用 decoder 覆盖主要视觉与视觉-语言任务。*

![Uni-Perceiver v2 架构概览](https://ar5iv.labs.arxiv.org/html/2211.09808/assets/x3.png)
*图：Uni-Perceiver v2 由图像编码器、文本编码器和统一 decoder 三部分构成，图像分支显式产生通用区域提议。*

Uni-Perceiver v2 的关键判断是：如果仍把图像切成固定 patch，再让 seq2seq 模型“猜”空间结构，那么检测和实例分割这类定位任务会非常吃力。它改用区域提议作为图像 token，每个区域 token 不只是语义向量，还绑定了边框和掩码线索，因此同一套表示既能支持分类/检索/描述，也能自然落到检测/分割输出。

图像编码器先从 backbone 得到多尺度特征，再用 Transformer-based region proposal network 生成候选区域。图像最终表示是全局 token 与区域 token 的拼接：

$$
f_{\text{image}}(x)=\operatorname{Concat}\left(\{q_i^{\text{global}}\}_{i=1}^{M},\{q_j^{\text{proposal}}\}_{j=1}^{N}\right)
$$

其中区域 token 由三类信息相加得到：

$$
q_j^{\text{proposal}}=q_j^{\text{sem}}+\mathcal{B}(q_j^{\text{box}})+\mathcal{M}(q_j^{\text{mask}})
$$

\(q_j^{\text{sem}}\) 表示区域语义，\(\mathcal{B}(\cdot)\) 把 box 坐标编码到同一隐空间，\(\mathcal{M}(\cdot)\) 将 mask 自适应池化到固定大小后线性投影。论文实现中会按 objectness 选 top proposal，默认进入统一 decoder 的区域数为 \(O=200\)。

文本分支相对直接：BPE tokenizer 后接预训练 RoBERTa BASE，得到 \(f_{\text{text}}(x)\)。无论输入是图像、文本还是图文拼接，都会加上 `<SPE>` token 后送入共享 Transformer decoder \(g(\cdot)\)。任务的候选目标也以同样方式编码，模型通过输入和目标的 decoder 表示相似度估计似然：

$$
P(x,y)\propto \exp\left(\frac{\cos(g\circ f(x),g\circ f(y))}{\tau}\right)
$$

统一任务目标写成：

$$
\hat{y}=\arg\max_{y\in\mathcal{Y}}P(x,y)
$$

多任务训练损失为：

$$
L=\sum_{k=1}^{K}s_k\,\mathbb{E}_{(x,y)\in(\mathcal{X}_k,\mathcal{Y}_k)}
\left[-w_k\log\frac{P(x,y)}{\sum_{z\in\mathcal{Y}_k}P(x,z)}\right]
$$

这套公式的直觉是把所有任务都变成“在候选集合中挑出最匹配目标”。分类时目标是类别文本，图文检索时目标是图像或文本候选，检测/分割时则对每个区域提议用 decoder 输出与类别 embedding 做匹配，并直接复用对应 \(q_j^{\text{box}}\)、\(q_j^{\text{mask}}\) 作为定位预测。

```python
# Uni-Perceiver v2 训练流程伪代码
for step in range(num_steps):
    task_k = sample_one_task(sampling_ratio=s)  # unmixed sampling
    batch = load_batch(task_k)

    if batch.has_image:
        multi_scale = image_backbone(batch.image)
        proposals = region_proposal_net(multi_scale)
        image_tokens = concat(global_tokens(multi_scale), topk(proposals, k=200))
    else:
        image_tokens = None

    if batch.has_text:
        text_tokens = roberta_encoder(bpe(batch.text))
    else:
        text_tokens = None

    x_tokens = add_spe(concat_available(image_tokens, text_tokens))
    y_tokens = encode_candidates(batch.targets)

    x_repr = unified_decoder(x_tokens, conditional_moe=True)
    y_repr = unified_decoder(y_tokens, conditional_moe=True)
    logits = cosine(x_repr, y_repr) / temperature
    loss = task_weight[task_k] * cross_entropy(logits, batch.correct_target)

    grad = normalize(gradient(loss)) * omega[task_k]
    mt_adamw_update(grad, sampling_compensation=1 / s[task_k])
```

多任务训练的另一个问题是 batch 结构。混合采样会在同一个 iteration 中塞入多个任务，导致每个任务实际 batch 变小；这对图文检索这种依赖大量负样本的任务很不利。Uni-Perceiver v2 改成 unmixed sampling：一个 iteration 只采一个任务，所有 GPU 都服务于该任务，并可同步 gather retrieval 特征来放大负样本池。

但 unmixed sampling 会让相邻 iteration 的梯度分布剧烈变化，所以论文把 AdamW 改成 MT-AdamW。若第 \(t\) 步采到任务 \(k\)，先将该任务梯度归一化，再乘以任务权重 \(\omega_k\)，并用 \(1/s_k\) 修正一阶和二阶动量估计：

$$
g_t\leftarrow \omega_k\frac{\nabla L_{t,k}(\theta_{t-1})}{\|\nabla L_{t,k}(\theta_{t-1})\|}
$$

$$
m_t=(1-\beta_1)m_{t-1}+\frac{\beta_1}{s_k}g_t,\quad
n_t=(1-\beta_2)n_{t-1}+\frac{\beta_2}{s_k}g_t^2
$$

这个设计把“任务被采到的频率”和“任务应贡献的梯度强度”解耦：小采样率任务不会因为出现少而被 Adam 动量低估，大梯度任务也不会因为尺度过大破坏共享 decoder 的训练稳定性。

与 OFA/Unified-IO 这类更偏生成式 seq2seq 的方法相比，Uni-Perceiver v2 的优势在于显式保留定位结构。它不是把所有空间输出都强行离散成文本 token，而是在通用区域提议中保留 box/mask，再用统一似然框架做类别和目标选择。因此它能在没有任务特定适配的情况下同时覆盖 ImageNet 分类、COCO 检测与分割、COCO/Flickr 图文检索、COCO caption 等“支柱任务”。

#### 🧪 练习题
```yaml
question: "Uni-Perceiver v2 为什么要把图像编码为通用区域提议，而不是只使用固定 patch token？"
options:
  - "为了完全取消图像 backbone，减少所有视觉计算"
  - "为了把语义、边框和掩码线索绑定到区域 token，使检测/分割等定位任务能被统一 decoder 处理"
  - "为了只支持图像分类，避免处理图文任务"
  - "为了把文本 token 转换成图像 token"
answer: 1
explain: "通用区域提议提供显式空间线索，区域 token 同时包含 semantic、box 和 mask 表示，因此定位任务可直接复用这些输出，非定位任务也能获得更细粒度的区域信息。"
```

### UniVal

```yaml
id: unival
num: 5
name: UniVal
full_name: 统一价值模型 (UniVal)
year: '2023'
org: Sorbonne
parent: ofa
paper_url: https://arxiv.org/abs/2307.16184
project_url: ''
category: unified_seq2seq
motivation: 四模态轻量统一模型
```

#### 📝 一句话总结
UniVal 提出一个约 0.25B 参数的统一 seq2seq 多模态模型，用 BART 风格 encoder-decoder 与轻量模态编码器统一文本、图像、视频和音频任务，解决小中规模模型难以跨越两种以上模态的问题。

#### 🎯 核心要点
- 统一四个轴：统一模型、统一输入/输出 token 格式、统一任务提示、统一 next-token 训练目标
- 共享核心为 BART-base 初始化的 encoder-decoder Transformer，不使用任务特定 head
- 图像、视频、音频分别使用轻量 CNN 编码器：ResNet-101、3D ResNeXt-101、PANN-CNN14
- 所有任务被转写为带文本提示的序列到序列生成任务，例如 caption、VQA、visual grounding、video QA、audio captioning
- 预训练主要使用高质量公开 image-text 与 video-text 数据，而非十亿级噪声图文对
- 使用 Multimodal Curriculum Learning：先图文，再加入视频文本，最终可微调到音频文本等新模态
- 使用 task balancing 缓解不同数据集规模差异，避免大数据集如 CC12M 主导训练
- 研究多模态任务的权重插值，将不同任务微调得到的权重线性合并以提升鲁棒性和 OOD 泛化
- 支持参数高效微调场景，只训练模态线性连接也能迁移到新任务/新模态

#### 🔬 深入细节
##### 框架总览

![UnIVAL 统一模型示意](https://arxiv.org/html/2307.16184v2/x1.png)
*图：UnIVAL 将架构、任务、输入输出格式和训练目标统一为序列到序列的 next-token prediction。*

![UnIVAL 架构细节](https://arxiv.org/html/2307.16184v2/x7.png)
*图：UnIVAL 使用典型 encoder-decoder Transformer，并在输入侧接入轻量 CNN 模态编码器。*

UnIVAL 的出发点是反对“每个模态、每个任务都配一套专门结构”的做法。它把语言模型作为共享核心，让图像、视频、音频编码器只负责把原始模态压成 token 序列，再线性投影到 LM 的输入维度。这样模型主体始终面对同一种对象：一串带位置、模态和词表语义的 token。

架构上，UnIVAL 采用 encoder-decoder 而不是 decoder-only。原因是非文本模态输入通常需要双向上下文建模，encoder 的 self-attention 适合吸收图像区域、视频帧或音频片段 token；decoder 再通过 cross-attention 读取 encoder 输出并自回归生成答案。其条件生成目标可以写成：

$$
\mathcal{L}_{\text{seq2seq}}=-\sum_{i=1}^{T}\log p_{\theta}(y_i\mid y_{<i},\,x_{\text{modal}},\,p_{\text{task}})
$$

其中 \(x_{\text{modal}}\) 是图像/视频/音频/文本 token，\(p_{\text{task}}\) 是任务提示，例如 “what does the video describe?”，\(y_i\) 是输出序列 token。视觉 grounding 等判别任务也被改写为生成任务：模型输出离散化坐标 token，而不是接一个专门检测 head。

```python
# UnIVAL 预训练与迁移流程伪代码
model = BartLikeEncoderDecoder.init_from_bart_base()
encoders = {
    "image": ResNet101(pretrained="ImageNet"),
    "video": ResNeXt3D101(pretrained="Kinetics400"),
    "audio": PANN_CNN14(pretrained="AudioSet"),
}

for stage in ["image_text", "image_video_text"]:
    tasks = curriculum_tasks(stage)
    for step in range(stage_steps[stage]):
        task = balanced_sample(tasks)  # task balancing
        modal_tokens = encoders[task.modality](task.raw_input)
        lm_tokens = linear_project(flatten(modal_tokens))
        prompt = tokenize(task.prompt)
        target = tokenize_or_discretize(task.target)

        logits = model.encoder_decoder(prompt, lm_tokens, decoder_input=target[:-1])
        loss = cross_entropy(logits, target[1:])
        optimizer.step(loss)

# 新模态或新任务：可全量微调，也可只训练线性连接
freeze(model)
train(linear_projection_for_new_modality)
```

论文强调“小中规模可训练性”。如果所有模态和所有任务一开始混在一起训练，长视频和音频会显著增加计算与显存压力；UnIVAL 使用 Multimodal Curriculum Learning，先做语言/图文，再加入视频文本任务。论文报告两阶段 curriculum 在性能接近 one-stage 的情况下，训练时间约快 18%，GPU 显存约省 25%。这说明 curriculum 的主要价值不是制造新目标，而是让模型逐步适应新模态分布，减少从零混训的成本。

task balancing 则处理另一个实际问题：公开数据集规模差异非常大。若 batch 内样本数按数据集大小自然比例分配，CC12M 这类大集会压过 VQA、RefCOCO 等高质量但较小的任务集，模型会向 caption-style 目标偏移。UnIVAL 改成让任务在 batch 中更均衡出现，使 VQA、visual grounding、captioning 等能力共同训练。

UnIVAL 的预训练任务覆盖 image captioning、VQA、visual grounding、grounded captioning、image-text matching、video captioning、video QA、video-text matching。训练数据包括 COCO、Visual Genome、SBU、CC3M、CC12M、VQAv2、GQA、RefCOCO 系列、WebVid2M、WebVidQA 等。音频并不是主要预训练模态，但模型在音频文本任务上可通过微调 PANN-CNN14 连接层迁移，体现了“统一 LM 核心 + 轻量模态投影”的可扩展性。

论文还研究了多模态模型合并。若从同一个 UnIVAL 预训练权重出发，在不同多模态任务上得到 \(W_A\)、\(W_B\)，可以直接线性插值：

$$
W(\lambda)=\lambda W_A+(1-\lambda)W_B,\quad \lambda\in[0,1]
$$

这个公式的直觉是：共享初始化下的不同微调模型往往处在相连的低损失区域，权重平均可以近似集成多个任务专长，却不会增加推理成本。对多模态模型而言，这提供了除多任务预训练之外的第二条“任务协作”路径。

与 OFA 相比，UnIVAL 的重点不是做更大的图文模型，而是把统一框架推进到图像、视频、音频和文本四类输入/输出场景，并证明 0.25B 量级模型也能通过 curriculum、task balancing 和权重插值获得可用的跨模态迁移能力。它的局限也很清楚：复杂指令跟随、零样本任务和只训练线性连接的性能仍弱于更大模型，因此它更像轻量通用多模态框架的工程可行性验证。

#### 🧪 练习题
```yaml
question: "UnIVAL 使用 Multimodal Curriculum Learning 的主要目的是什么？"
options:
  - "把所有任务改成分类任务"
  - "逐步加入新模态和任务，降低一次性混训的计算/显存成本并提供更好的初始化"
  - "只训练音频模型，放弃图像和视频"
  - "用多个任务特定 head 替换共享 decoder"
answer: 1
explain: "UnIVAL 先训练图文能力，再加入视频文本任务，逐步扩展模态覆盖；这种课程式训练在性能接近的同时减少训练时间和显存需求。"
```

### SpeechT5

```yaml
id: speecht5
num: 6
name: SpeechT5
full_name: 语音T5模型 (SpeechT5)
year: '2022'
org: Microsoft
parent: —
paper_url: https://aclanthology.org/2022.acl-long.393/
project_url: ''
category: unified_seq2seq
motivation: 语音-文本统一预训练框架
```

#### 📝 一句话总结
SpeechT5 提出了一个统一的编码器-解码器预训练框架，通过共享的 Transformer 骨干网络和模态特定的前/后处理网络，将语音和文本任务统一为序列到序列的格式，并利用跨模态向量量化（Cross-Modal VQ）对齐语音与文本的隐空间表示，在 ASR、TTS、语音翻译、声音转换、语音增强和说话人识别等 6 项任务上均取得了显著提升。

#### 🎯 核心要点
- **统一编码器-解码器架构**：共享的 12 层 Transformer 编码器 + 6 层 Transformer 解码器，配合 6 个模态特定的前/后处理网络（speech/text 各 3 个），将所有语音-文本任务统一为 seq2seq 格式
- **跨模态向量量化（Cross-Modal VQ）**：利用共享码本将语音和文本的连续表示离散化，通过随机混合语音/文本的潜在单元实现跨模态对齐，作为编码器与解码器之间的信息瓶颈
- **多任务预训练**：联合使用语音 MLM 损失、语音 seq2seq 重建损失（L1 + BCE）、文本 MLM 损失和 VQ 多样性损失进行预训练
- **预训练数据**：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料（约 4000 万句）
- **6 项下游任务全面验证**：ASR（WER 5.8%）、TTS（MOS 3.65）、语音翻译（BLEU 35.30）、声音转换（MCD 5.87）、语音增强（WER 8.9%）、说话人识别
- **消融实验**：语音预训练贡献最大；联合语音-文本预训练对跨模态任务有显著增益；MLM 损失有助于语音表示学习

#### 🔬 深入细节
##### 框架总览

![SpeechT5 框架总览](https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x1.png)
*图 1：SpeechT5 框架示意图。所有语音-文本任务被统一为 speech/text → speech/text 的序列到序列格式，包括 ASR、TTS、ST、VC、SE 和 SID。*

SpeechT5 的核心思想来源于 NLP 领域的 T5（Text-to-Text Transfer Transformer）：**将所有任务统一为同一种输入-输出格式**。在语音领域，这意味着将 ASR（语音→文本）、TTS（文本→语音）、VC（语音→语音）、ST（语音→文本）等任务全部视为序列到序列的转换问题。

> 💡 **关键动机**：此前的语音预训练工作（如 wav2vec 2.0、HuBERT）存在两个问题：(1) 仅使用语音数据预训练，忽略了文本信息对跨模态任务的重要性；(2) 仅预训练编码器，解码器未经预训练，不利于生成类任务。SpeechT5 同时解决了这两个问题。

##### 模型架构

SpeechT5 由三部分组成：**共享编码器-解码器骨干** + **模态特定前处理网络（Pre-net）** + **模态特定后处理网络（Post-net）**。

```
输入 ──→ [Pre-net] ──→ [共享 Encoder (12L)] ──→ [Cross-Modal VQ] ──→ [共享 Decoder (6L)] ──→ [Post-net] ──→ 输出
         ↑ 模态特定                                  ↑ 跨模态对齐                                ↑ 模态特定
```

**共享编码器-解码器**：
- 编码器：12 层 Transformer，隐藏维度 768，FFN 维度 3072，12 个注意力头（与 wav2vec 2.0 Base / HuBERT Base 编码器配置一致）
- 解码器：6 层 Transformer，配置与编码器相同

**6 个模态特定网络**：

| 网络 | 结构 | 功能 |
|------|------|------|
| 语音编码器 Pre-net | 7 层时序卷积（来自 wav2vec 2.0），512 通道，步长 (5,2,2,2,2,2,2)，核大小 (10,3,3,3,3,2,2) | 将原始波形下采样为特征序列 |
| 语音解码器 Pre-net | 3 层全连接 + ReLU | 将 log Mel 滤波器组特征映射到隐空间 |
| 语音解码器 Post-net | 线性层 + 5 层 1D 卷积（残差细化）+ 停止标记预测头 | 从解码器输出生成 Mel 频谱 |
| 文本编码器 Pre-net | 共享词嵌入矩阵 | 将 token 索引映射为嵌入向量 |
| 文本解码器 Pre-net | 共享词嵌入矩阵 | 同上 |
| 文本解码器 Post-net | 共享词嵌入矩阵（转置） | 将隐状态映射回词表概率 |

##### 跨模态向量量化（Cross-Modal VQ）

![跨模态向量量化示意图](https://ar5iv.labs.arxiv.org/html/2110.07205/assets/x2.png)
*图 2：跨模态向量量化机制。通过共享码本将语音和文本的连续表示离散化，并随机混合两种模态的潜在单元。*

跨模态 VQ 是 SpeechT5 最核心的创新，其目标是**在编码器和解码器之间建立一个统一的离散语义空间**，使语音和文本共享相同的表示。

具体流程如下：

1. **编码器输出量化**：将编码器的连续输出 \(\mathbf{u}_i\) 通过最近邻搜索映射到码本 \(\mathbf{C}^K\) 中的离散码：

$$\mathbf{c}_i = \arg\min_j \|\mathbf{u}_i - \mathbf{e}_j\|_2$$

其中 \(\mathbf{e}_j\) 是码本中第 \(j\) 个可学习嵌入向量。

2. **乘积量化**：使用 2 个码本，每个包含 \(V = 100\) 个条目，总共可表示 \(V \times V = 10000\) 种离散状态，在表达能力和压缩率之间取得平衡。

3. **随机混合**：在预训练时，**随机将一个 batch 中的语音和文本量化后的潜在单元进行混合**，作为解码器的输入。这迫使解码器学会从统一的离散表示中恢复两种模态的信息，从而实现跨模态对齐。

4. **多样性损失**：为防止码本坍缩（只使用少数几个码），引入多样性损失最大化码本使用的熵：

$$\mathcal{L}_d = \frac{1}{K}\sum_{k=1}^{K} p_k \log p_k$$

其中 \(p_k\) 是选择第 \(k\) 个码的平均概率。

> ⚠️ **注意**：VQ 的梯度通过 straight-through estimator 传播，即前向传播使用离散码，反向传播时梯度直接复制到编码器输出。

##### 预训练策略

```python
# SpeechT5 预训练伪代码
for step in range(500_000):
    # 1. 采样语音和文本 batch
    speech_batch = sample_speech(LibriSpeech_960h)
    text_batch = sample_text(LibriSpeech_LM)
    
    # 2. 语音分支：Masked Language Model + Seq2Seq
    speech_hidden = speech_encoder_prenet(speech_batch.waveform)
    speech_enc_out = shared_encoder(mask(speech_hidden))
    speech_vq = cross_modal_vq(speech_enc_out)
    
    # 语音 MLM：预测被遮蔽位置的语音特征
    L_mlm_s = mlm_loss(speech_enc_out, speech_hidden)
    
    # 语音 Seq2Seq：自回归重建 Mel 频谱
    mel_pred = shared_decoder(speech_vq) -> speech_decoder_postnet
    L_1_s = L1_loss(mel_pred, target_mel)
    L_bce_s = BCE_loss(stop_pred, stop_target)
    
    # 3. 文本分支：Masked Language Model
    text_hidden = text_encoder_prenet(text_batch.tokens)
    text_enc_out = shared_encoder(mask(text_hidden))
    text_vq = cross_modal_vq(text_enc_out)
    text_pred = shared_decoder(text_vq) -> text_decoder_postnet
    L_mle_t = cross_entropy(text_pred, text_batch.tokens)
    
    # 4. 多样性损失
    L_d = diversity_loss(cross_modal_vq.codebook_usage)
    
    # 5. 总损失
    loss = L_mlm_s + L_1_s + L_bce_s + L_mle_t + 0.1 * L_d
    optimizer.step(loss)
```

预训练的总损失函数为：

$$\mathcal{L} = \mathcal{L}_{mlm}^{s} + \mathcal{L}_{1}^{s} + \mathcal{L}_{bce}^{s} + \mathcal{L}_{mle}^{t} + \gamma \mathcal{L}_{d}$$

其中：
- \(\mathcal{L}_{mlm}^{s}\)：语音遮蔽语言模型损失，预测被遮蔽位置的语音特征
- \(\mathcal{L}_{1}^{s}\)：语音序列到序列的 L1 重建损失
- \(\mathcal{L}_{bce}^{s}\)：停止标记的二元交叉熵损失
- \(\mathcal{L}_{mle}^{t}\)：文本遮蔽语言模型的最大似然损失
- \(\mathcal{L}_{d}\)：VQ 多样性损失，\(\gamma = 0.1\)

##### 训练配置

- **预训练数据**：LibriSpeech 960 小时语音 + LibriSpeech LM 文本语料
- **硬件**：32 块 V100 GPU
- **优化器**：Adam，学习率 \(2 \times 10^{-4}\)
- **预训练步数**：500K 步，更新频率为 2
- **编码器初始化**：语音编码器 Pre-net 使用 wav2vec 2.0 的卷积特征提取器初始化

##### 微调与下游任务结果

预训练完成后，针对不同下游任务微调编码器-解码器骨干，同时替换相应的模态特定前/后处理网络。

| 任务 | 数据集 | 指标 | SpeechT5 | 对比基线 |
|------|--------|------|-----------|----------|
| ASR | LibriSpeech 100h | WER (test-other) | **5.8%** | wav2vec 2.0: 6.3%, HuBERT: 6.3% |
| TTS | LibriTTS | MOS / CMOS | **3.65 / +0.29** | Baseline: 3.36 |
| VC | CMU Arctic (clb→slt) | MCD | **5.87** | VTN: 5.97 |
| ST | MUST-C EN-FR | BLEU | **35.30** | HuBERT init: 34.53 |
| SE | WHAM! | WER | **8.9%** | Baseline: 10.9% |

##### 与传统方法的对比

| 维度 | 传统方法 | SpeechT5 |
|------|----------|----------|
| 预训练范围 | 仅编码器（wav2vec 2.0, HuBERT） | 编码器 + 解码器联合预训练 |
| 模态 | 单模态（仅语音） | 语音 + 文本联合 |
| 任务适配 | 每个任务独立模型 | 统一框架，共享骨干 |
| 跨模态对齐 | 无显式对齐 | Cross-Modal VQ 实现隐式对齐 |
| 生成能力 | 解码器随机初始化 | 解码器经过预训练，生成质量更高 |

> 💡 **消融实验关键发现**：(1) 语音预训练对所有任务贡献最大；(2) 联合语音-文本预训练对跨模态任务（ASR、TTS）有显著增益；(3) 语音 MLM 损失有助于编码器学习更好的语音表示，移除后 TTS 的自然度反而提升（因为 MLM 主要服务于编码器而非解码器）。

#### 🧪 练习题
```yaml
question: "SpeechT5 中跨模态向量量化（Cross-Modal VQ）的核心作用是什么？"
options:
  - "将语音信号压缩为更短的序列以加速推理"
  - "通过共享离散码本对齐语音和文本的隐空间表示，作为编码器与解码器的统一接口"
  - "替代注意力机制实现编码器到解码器的信息传递"
  - "为预训练提供自监督的离散标签"
answer: 1
explain: "Cross-Modal VQ 通过共享码本将语音和文本的连续表示映射到同一离散空间，并随机混合两种模态的量化单元，迫使模型学习统一的跨模态表示，作为编码器和解码器之间的信息瓶颈。"
```

### AudioPaLM

```yaml
id: audiopalm
num: 7
name: AudioPaLM
full_name: 音频PaLM模型 (AudioPaLM)
year: '2023'
org: Google
parent: speecht5
paper_url: https://arxiv.org/abs/2306.12925
project_url: ''
category: encoder_llm_decoder
motivation: 融合PaLM与AudioLM能力
```

#### 📝 一句话总结
AudioPaLM 将 PaLM/PaLM-2 的文本语言能力与 AudioLM 的离散音频建模能力融合到一个 decoder-only Transformer 中，解决单一模型同时听懂语音、生成文本并合成语音的问题。

#### 🎯 核心要点
- 使用 decoder-only Transformer 统一建模文本 token 与音频 token，模型主体结构与文本 LLM 基本不变
- 将 SentencePiece 文本词表与离散音频词表合并为联合词表，音频 token 可作为输入也可作为输出
- 从 PaLM 或 PaLM-2 文本 checkpoint 初始化，仅扩展 embedding/softmax 矩阵以容纳音频 token
- 音频 token 来自 w2v-BERT 或 USM 编码器的离散化表示，典型码率为 25Hz、词表大小为 1024
- 输出音频 token 后，使用 AudioLM stage 2/3 或 SoundStorm 生成 SoundStream token 并还原波形
- 通过任务标签表达 ASR、AST、S2ST、TTS、MT 等任务，例如 `[ASR French]` 或 `[S2ST English French]`
- 引入 combined tasks，让模型在一次自回归解码中先输出中间文本再输出最终文本/音频，类似语音任务里的链式推理
- 训练混合覆盖 CoVoST2/CVSS、VoxPopuli、CommonVoice、Conversational EsEn、YouTube ASR、WMT/TED TTS、PaLM MT TTS 等数据
- 使用 3 秒语音提示作为 voice conditioning，在跨语言语音翻译中保留说话人音色和韵律信息

#### 🔬 深入细节
##### 框架总览

![AudioPaLM 模型示意](https://arxiv.org/html/2306.12925/x1.png)
*图：AudioPaLM 在预训练文本模型上扩展音频 token embedding，输入可混合文本和音频 token，输出可为文本或音频 token。*

AudioPaLM 的核心非常简洁：把语音也变成离散 token，然后让 LLM 像处理文本一样处理它。这样一来，ASR 是“音频 token 到文本 token”，TTS 是“文本 token 到音频 token”，S2ST 是“源语言音频 token 到目标语言音频 token”，都可以被同一个自回归 token 预测目标覆盖。

文本模型迁移的关键在 embedding surgery。设原文本词表大小为 \(t\)，embedding 维度为 \(m\)，音频词表大小为 \(a\)。PaLM 的输入 embedding 为 \(\mathbf{E}\in\mathbb{R}^{t\times m}\)，输出 softmax 权重共享为 \(\mathbf{E}'=\mathbf{E}^{\top}\)。AudioPaLM 将其扩展为：

$$
\mathbf{E}_{\text{multi}}=
\begin{bmatrix}
\mathbf{E}_{\text{text}}\\
\mathbf{E}_{\text{audio}}
\end{bmatrix}
\in\mathbb{R}^{(t+a)\times m}
$$

前 \(t\) 行保留原 SentencePiece 文本 embedding，后 \(a\) 行随机初始化为音频 token embedding。除此之外，Transformer 主体不需要改结构；论文发现训练时需要更新全部参数，而不是只冻结原文本 LLM。

音频 tokenization 直接决定模型能听到什么。论文比较了三类 token：多语 w2v-BERT 特征经 k-means 离散化、USM-v1 特征离散化、以及带辅助 ASR 损失训练的 USM-v2 token。w2v-BERT/USM-v1 都产生约 25Hz 的 token 序列，词表大小 1024；USM-v2 的目标是让离散单元更适合多语语音理解和翻译。

```python
# AudioPaLM 训练与推理流程伪代码
text_llm = load_checkpoint("PaLM_or_PaLM2")
E_text = text_llm.token_embedding
E_audio = random_init(num_audio_tokens=1024, dim=E_text.dim)
model = expand_embedding(text_llm, concat(E_text, E_audio))

for batch in speech_text_mixture:
    task_tag = tokenize("[ASR French]")  # 或 [ASR AST S2ST English French]
    input_tokens = task_tag + tokenize_modal_inputs(batch)
    target_tokens = tokenize_modal_outputs(batch)

    tokens = input_tokens + target_tokens
    logits = model(tokens[:-1])
    loss = masked_cross_entropy(logits, tokens[1:], mask_only_target=True)
    adafactor_update(model.parameters(), loss, lr=5e-5)

def synthesize_speech(prompt_audio, source_audio, target_lang):
    source_tokens = audio_tokenizer(source_audio)
    task = tokenize(f"[S2ST source {target_lang}]")
    semantic_tokens = model.generate(task + source_tokens)
    voice_cond = first_3_seconds(prompt_audio)
    soundstream_tokens = audiolm_or_soundstorm(semantic_tokens, voice_cond)
    return soundstream_decoder(soundstream_tokens)
```

训练目标仍是标准自回归语言模型损失，只是对输入部分做 loss masking，让模型主要为目标输出付出损失：

$$
\mathcal{L}_{\text{AR}}=-\sum_{i\in\mathcal{O}}\log p_{\theta}(z_i\mid z_{<i})
$$

其中 \(z\) 是文本 token 与音频 token 的混合序列，\(\mathcal{O}\) 表示需要预测的输出位置。这个统一目标的好处是不同任务可以自然混训：ASR/AST 强化语音到文本映射，TTS/S2ST 让模型学会输出音频 token，MT 保留文本翻译能力。

AudioPaLM 还将任务表达为普通文本前缀，而不是新增大量特殊符号。例如 `[ASR French]` 表示转写法语音频，`[TTS English]` 表示读出英文文本，`[S2ST English French]` 表示英到法语音翻译。论文指出人类可读的任务短语与方括号标签效果接近，但在低资源语言中显式写出语言名有帮助。

combined tasks 是论文中很实用的设计。直接 S2ST 要模型从源音频 token 一步生成目标音频 token；combined 版本则要求模型在一次自回归过程中先输出源转写，再输出目标翻译文本，最后输出目标音频 token：

$$
p(y_{\text{src text}},y_{\text{tgt text}},y_{\text{tgt audio}}\mid x_{\text{src audio}})
=\prod_i p(z_i\mid z_{<i},x_{\text{src audio}})
$$

这不是级联调用三个模型，因为所有中间结果和原始音频都在同一个上下文里，生成目标音频时仍能注意到源音频中的韵律和说话人信息。论文实验显示 combined tasks 能提升复杂语音翻译任务的表现。

输出音频 token 之后，AudioPaLM 还需要语音解码器。AudioLM 路线用 stage 2 生成低码率 SoundStream token，再用 stage 3 重建更高层 residual quantizer；SoundStorm 则用非自回归迭代方式并行生成，速度快两个数量级且音色一致性更好。两者都可接收 3 秒 voice conditioning，因此 AudioPaLM 能在翻译时保留未见说话人的音色。

与 SpeechT5 这类 encoder-decoder 统一语音文本框架相比，AudioPaLM 更接近“给 LLM 扩词表”。它的优势是继承 PaLM/PaLM-2 的文本知识和翻译能力，同时借助 AudioLM/SoundStorm 把离散语音 token 还原成自然语音；代价是强依赖音频 tokenizer 质量，且输出音频任务会占用模型容量，可能对纯文本输出的 ASR/AST 指标产生一定折衷。

#### 🧪 练习题
```yaml
question: "AudioPaLM 将文本 PaLM 改造成语音-文本模型时，最核心的结构改动是什么？"
options:
  - "把 decoder-only Transformer 改成 CNN 编码器"
  - "扩展 token embedding/softmax 矩阵，加入离散音频 token 词表"
  - "删除文本 SentencePiece 词表，只保留音频 token"
  - "把所有语音任务拆成多个独立模型串联调用"
answer: 1
explain: "AudioPaLM 保留 PaLM 主体结构，只把联合词表扩展为文本 token 与音频 token 的并集，并随机初始化新增音频 embedding 后在混合任务上微调。"
```

### Qwen-Audio

```yaml
id: qwen-audio
num: 8
name: Qwen-Audio
full_name: 通义千问音频模型 (Qwen-Audio)
year: '2023'
org: 阿里通义
parent: audiopalm
paper_url: https://arxiv.org/abs/2311.07919
project_url: ''
category: encoder_llm_decoder
motivation: 大规模音频-语言统一模型
```

#### 📝 一句话总结
Qwen-Audio 提出了一个以单一音频编码器连接 Qwen-7B 的大规模音频语言模型，通过层级任务标签统一语音、声音、音乐和歌曲等 30 多类任务，解决多数据集联合训练中的输出格式冲突和任务干扰问题。

#### 🎯 核心要点
- 模型结构：Whisper-large-v2 初始化的音频编码器 + Qwen-7B Transformer decoder。
- 音频覆盖：人声语音、自然声音、音乐、歌曲，训练任务超过 30 个，覆盖 8 种语言。
- 输入表示：16 kHz 音频转 80 通道 mel-spectrogram，编码器输出经 stride=2 pooling 后约每帧对应 40 ms 原始音频。
- 统一目标：LLM 在音频表示条件下自回归预测文本 token。
- 层级任务标签：起始标签、音频语言标签、任务标签、输出文本语言标签、时间戳标签共同控制输出空间。
- SRWT：引入 speech recognition with word-level timestamps，在每个词前后交错预测起止时间 token。
- 两阶段训练：多任务预训练阶段冻结 LLM、优化音频编码器；指令微调阶段冻结音频编码器、优化 LLM 得到 Qwen-Audio-Chat。

#### 🔬 深入细节
![Qwen-Audio 架构与多任务预训练总览](https://arxiv.org/html/2311.07919v2/x3.png)
*图：Qwen-Audio 使用单一音频编码器接入 Qwen-7B，并通过层级标签把不同音频任务映射到统一自回归文本生成框架。*

```python
# Qwen-Audio 多任务训练流程伪代码
for audio, target_text, meta in multitask_audio_corpus:
    mel = log_mel_spectrogram(audio, sample_rate=16000, n_mels=80)
    audio_repr = whisper_like_encoder(mel)       # shared for speech, sound, music, song
    audio_repr = stride2_pool(audio_repr)        # about 40 ms per output frame

    prompt_tags = [
        meta.start_tag,       # <|startoftranscripts|> or <|startofanalysis|>
        meta.audio_lang_tag,  # language tag or <|unknown|>
        meta.task_tag,        # transcribe / translate / caption / analysis / QA
        meta.text_lang_tag,
        meta.timestamp_tag,   # <|timestamps|> or <|notimestamps|>
    ]
    decoder_input = concat(audio_repr, embed(prompt_tags), shift_right(target_text))
    loss = cross_entropy(qwen_decoder(decoder_input), target_text)
    loss.backward()
```

Qwen-Audio 的核心建模假设是：不同音频任务可以共享底层听觉感知，但必须显式告诉解码器“现在要输出什么类型的文本”。给定音频序列 \(\mathbf{a}\) 和文本序列 \(\mathbf{x}\)，论文把训练目标写成在音频编码条件下预测下一个文本 token：

$$
\mathcal{P}_{\theta}(x_t \mid \mathbf{x}_{<t}, \mathrm{Encoder}_{\phi}(\mathbf{a}))
$$

也可以写成负对数似然形式：

$$
\mathcal{L}_{\mathrm{NLL}}
=-\sum_{t=1}^{T}\log p_{\theta}(x_t \mid x_{<t}, \mathrm{Encoder}_{\phi}(\mathbf{a}), \mathbf{z})
$$

其中 \(\mathbf{z}\) 是层级标签序列。这个设计保留了 decoder-only LLM 的语言生成能力，同时把音频编码器输出作为条件上下文输入给 Qwen-7B。与先 ASR 再把转写喂给 LLM 的级联系统不同，Qwen-Audio 让模型直接在音频表征上学习情绪、背景声、音乐信息和时间对齐信息，减少中间转写丢失非语义线索的问题。

层级标签是论文最关键的工程与算法设计。简单混合 ASR、翻译、音频问答、场景分类、音乐分析等数据时，同一段音频可能对应文本转写、类别标签、自然语言描述或问答答案，形成 one-to-many 的监督冲突。Qwen-Audio 用共享标签促进相近任务知识共享，用细粒度任务标签分隔输出格式：例如 `<|transcribe|>` 与 `<|translate|>` 对应不同文本目标，`<|caption|>` 面向开放描述，`<|question-answer|>` 会把问题拼接到标签后。这样 decoder 不是被迫从音频本身猜监督语义，而是在明确任务条件下学习条件分布 \(p(y \mid a,z)\)。

SRWT 词级时间戳进一步把“听懂内容”和“定位音频片段”绑在一起训练。对于带时间戳的识别样本，模型不只生成词，还在每个词前后生成起止时间 token，形式近似：

$$
y = [t^{\mathrm{start}}_1, w_1, t^{\mathrm{end}}_1,\ldots,t^{\mathrm{start}}_n,w_n,t^{\mathrm{end}}_n]
$$

这使模型学习词与声学帧之间的细粒度对齐。论文报告该任务不仅服务于语音 grounding，也提升音频问答和 ASR，因为时间定位迫使共享编码器保留比纯句级文本监督更细的声学结构。

训练流程也体现了“先接入模态、再对齐交互”的分工。多任务预训练阶段冻结 Qwen-7B，只优化音频编码器，让音频表示适配已有语言空间；随后在 Qwen-Audio-Chat 的监督微调中冻结音频编码器，只优化 LLM，让模型学习多轮对话和人类指令格式。这样的两阶段方案降低了同时更新大语言模型和音频编码器时的灾难性漂移风险，也让基础 Qwen-Audio 保持零样本执行多类音频理解任务的能力。

> 💡 关键：Qwen-Audio 的创新不只是“给 LLM 接一个音频 encoder”，而是用层级标签把异构音频数据整理成可共享、可区分的条件语言建模问题。

#### 🧪 练习题
```yaml
question: "Qwen-Audio 使用层级任务标签的主要目的是什么？"
options:
  - "压缩音频序列长度，减少显存占用"
  - "让 decoder 区分任务、语言、输出格式和时间戳需求，缓解多任务 one-to-many 干扰"
  - "替代 Whisper 音频编码器，使模型完全不需要声学特征"
  - "只提高音乐生成质量，与语音识别无关"
answer: 1
explain: "层级标签把不同任务的输出条件显式写入 decoder 上下文，使相近任务共享表示，同时避免不同数据集文本标签互相冲突。"
```

### LauraGPT

```yaml
id: lauragpt
num: 9
name: LauraGPT
full_name: 劳拉GPT音频模型 (LauraGPT)
year: '2023'
org: 阿里达摩院
parent: speecht5
paper_url: https://arxiv.org/abs/2310.04673
project_url: ''
category: unified_seq2seq
motivation: 端到端音频理解与生成
```

#### 📝 一句话总结
LauraGPT 提出了一个统一音频-文本 GPT 框架，用连续声学表示处理音频输入、用离散 codec token 生成音频输出，并通过 one-step codec vocoder 解决多步音频合成效率低和 codec token 多峰预测困难的问题。

#### 🎯 核心要点
- 混合音频表示：输入音频使用 Conformer 编码成连续表示，输出音频使用 codec tokenizer 离散化。
- 统一 GPT 主干：以 Qwen-1.8B 为 backbone，LauraGPT 总参数约 2B，文本 token、音频 token、任务 token 共享自回归建模框架。
- 统一任务表达：所有任务整理为 `[input embeddings, task ID, output tokens]`。
- 基础任务：ASR、SLU、S2TT、SER、AAC、SE、TTS 统一多任务微调。
- 音频 tokenizer：EnCodec 风格 codec，RVQ 使用 32 个 quantizer，每组词表大小 1024，生成侧只取第一组 codec token。
- One-step codec vocoder：Transformer predictor 直接回归 32 组 codec embedding 之和，再由 frozen codec decoder 还原波形。
- 复杂任务组合：可把基础任务串联成 S2ST、个性化 TTS、噪声鲁棒 ASR 等复合流程。

#### 🔬 深入细节
![LauraGPT 模型架构与 one-step codec vocoder](https://arxiv.org/html/2310.04673v4/x1.png)
*图：LauraGPT 用连续音频编码作为输入，用离散 codec token 作为音频输出，并在右侧用 one-step codec vocoder 从 token 还原波形。*

```python
# LauraGPT 训练与音频生成伪代码
for sample in multitask_batch:
    if sample.input_modality == "audio":
        u = conformer_audio_encoder(log_mel(sample.audio))   # continuous input
    else:
        u = qwen_text_embedding(qwen_tokenize(sample.text))

    task = embed_task_id(sample.task)                         # ASR / S2TT / TTS / SE / ...

    if sample.output_modality == "audio":
        v = codec_tokenizer_first_rvq(sample.target_audio)    # discrete output tokens
    else:
        v = qwen_tokenize(sample.target_text)

    logits = qwen_gpt(concat(u, task, shift_right(embed(v))))
    lm_loss = masked_cross_entropy(logits, v)                 # mask input and task positions

    if sample.output_modality == "audio":
        predicted_codec_tokens = autoregressive_decode(logits)
        codec_embedding = one_step_predictor(predicted_codec_tokens, conditions=u)
        waveform = frozen_codec_decoder(codec_embedding)
```

LauraGPT 的出发点是反驳“音频输入和输出都离散化就足够统一”的路线。论文指出，早期 decoder-only 音频文本模型把输入音频也量化为 codec token，确实便于塞进统一词表，但会损失识别、翻译、增强等任务所需的细粒度声学信息。LauraGPT 因此采用不对称表示：输入侧保留连续 log-mel/Conformer 表示，输出侧才用离散 codec token，以兼顾理解任务的精度和生成任务的自回归可建模性。

统一语言建模目标如下：

$$
\mathcal{L}_{LM}
=-\frac{1}{T_v}\sum_{j=1}^{T_v}
\log p_{\theta}\left(
\mathbf{v}_{j}\mid
\mathbf{u}_{1:T_u},\mathbf{u}_{task},\mathbf{v}_{1:j-1}
\right)
$$

其中 \(\mathbf{u}\) 是输入 embedding 序列，\(\mathbf{u}_{task}\) 是任务 token，\(\mathbf{v}\) 是目标 token 序列。损失只计算输出 token 位置，输入和任务 token 位置会被 mask 掉。这个格式把 ASR 的“音频到文本”、TTS 的“文本到音频”、SE 的“噪声音频到增强音频”都化成同一种条件自回归预测问题，区别只在输入 embedding 来源、任务 ID 和目标 token 类型。

音频 tokenizer 采用 EnCodec 风格的 codec 模型：卷积循环 encoder/decoder 加 RVQ。论文对 codec 做了三点改造：加入频谱幅度重建损失以改善中高频质量；使用步幅为 \([8,5,4,2,2]\) 的五层 strided convolution，把每组 token rate 降到 25 Hz；使用 32 个 vocabulary size 为 1024 的 quantizer，并带 structured dropout。LauraGPT 只把第一组 RVQ token 交给 LLM 预测，因为更多组 token 会拉长序列、增加训练成本；其余组信息由 vocoder 的 predictor 在还原阶段补全。

One-step codec vocoder 是 LauraGPT 区别于 VALL-E 类多步方案的关键。传统做法常把后续 codec 组逐组分类预测，既要多次前向，又会遇到 codec token 分布多峰导致分类目标不稳定。LauraGPT 改成回归问题：Transformer predictor 根据 LLM 生成的第一组 codec token 和输入条件，估计 32 组 codec embedding 的求和表示 \(\hat{\mathbf{E}}\)，再交给预训练并冻结的 codec decoder 合成波形：

$$
\mathcal{L}_{pre}
=\sum_{t,i}^{T,D_c}
\left\lVert \mathbf{E}_{t,i}-\hat{\mathbf{E}}_{t,i}\right\rVert_1
+
\left\lVert \mathbf{E}_{t,i}-\hat{\mathbf{E}}_{t,i}\right\rVert_2
$$

这种设计把“预测很多离散 codec 组”的问题改成“一次前向估计连续 embedding”。对于 TTS，文本和提示音频可作为条件；对于 SE，噪声音频特征作为条件。也就是说，生成音频并不只依赖第一组 codec token，而是把连续输入条件重新注入 vocoder，弥补浅层 codec token 信息不足。

多任务微调把 LauraGPT 从单一音频生成器扩展成音频理解与生成统一模型。基础任务包括 ASR、SLU、S2TT、SER、AAC、SE、TTS；更复杂任务则通过模块化级联实现。例如 S2ST 可以先用 `[audio encoding, <S2TT>]` 生成目标语言文本，再用 `[text embedding, <TTS>]` 合成语音；若要保留说话人特征，还可以把原始输入音频 token 加入 TTS 条件。它不是把多个外部模型硬拼成系统，而是在同一个 GPT 主干上用任务 token 切换条件分布。

> 💡 关键：LauraGPT 的“统一”不是强迫所有音频都离散化，而是在输入和输出两侧分别选择更适合的表示，理解靠连续特征，生成靠 codec token，再由 one-step vocoder 补齐高质量波形。

#### 🧪 练习题
```yaml
question: "LauraGPT 为什么不把输入音频也完全表示为离散 codec token？"
options:
  - "因为 codec token 只能表示文本，不能表示音频"
  - "因为输入侧离散化会丢失细粒度声学信息，影响 ASR、翻译和增强等理解任务"
  - "因为 Conformer 编码器不能和 GPT 连接"
  - "因为 LauraGPT 不支持音频输出"
answer: 1
explain: "论文采用连续输入、离散输出的混合表示：连续特征保留理解任务需要的声学细节，codec token 则便于音频生成的自回归建模。"
```

### GPT-4o

```yaml
id: gpt-4o
num: 10
name: GPT-4o
full_name: GPT-4全模态版 (GPT-4 Omni)
year: '2024'
org: OpenAI
parent: —
paper_url: https://openai.com/index/hello-gpt-4o/
project_url: ''
category: native_e2e
motivation: 原生端到端全模态交互
```

#### 📝 一句话总结
GPT-4o 提出了原生端到端的 omni 模型，把文本、音频、图像和视频输入以及文本、音频、图像输出交给同一个神经网络处理，解决传统语音助手 ASR→LLM→TTS 级联管线的延迟高和信息丢失问题。

#### 🎯 核心要点
- 原生全模态：输入可包含文本、音频、图像、视频，输出可包含文本、音频、图像。
- 单模型端到端：官方描述为同一神经网络跨文本、视觉、音频训练，而不是多个模型串联。
- 低延迟语音：官方发布页报告音频响应最低 232 ms，平均约 320 ms。
- 管线替代：相比旧 Voice Mode 的 ASR→GPT-3.5/GPT-4→TTS 三模型流程，GPT-4o 能直接感知语气、多说话人和背景声等非文本信息。
- 能力平衡：发布时文本和代码能力接近 GPT-4 Turbo，同时视觉和音频理解显著增强。
- 训练数据组成：System Card 披露预训练数据截至 2023 年 10 月，包含网页、代码、数学以及图像、音频、视频等多模态数据。
- 安全机制：围绕语音输出、说话人识别、未根据证据推断敏感属性、版权内容和音频输出安全建立了后训练与系统级防护。

#### 🔬 深入细节
![GPT-4o 官方视觉生成能力示例](https://cdn.openai.com/hello-gpt-4o/robot-writers-block-01.jpg?fm=webp&q=90&w=1200)
*图：OpenAI 在 GPT-4o 发布页展示的视觉生成样例。官方未公开完整模型架构图，因此这里用公开图源展示全模态输出能力，并在下文用抽象流程解释方法。*

```python
# GPT-4o 原生全模态交互的抽象流程
conversation_state = []

while user_is_interacting:
    multimodal_events = read_stream(
        text=user_text,
        audio=user_audio_stream,
        image=user_images,
        video=user_video_frames,
    )

    # 同一个 omni 模型对跨模态上下文做联合建模；具体内部结构未公开
    hidden_state = omni_model.encode_and_update(conversation_state, multimodal_events)

    for token in omni_model.stream_decode(hidden_state, output_modalities=["text", "audio", "image"]):
        if violates_safety_policy(token):
            block_or_redirect(token)
        else:
            render_to_target_modality(token)

    conversation_state.append(multimodal_events)
```

GPT-4o 的方法重点不在某个公开的 adapter 或 tokenizer 细节，而在系统范式从“级联工具链”切换到“原生端到端建模”。旧语音模式可以抽象成：

$$
y_{\mathrm{audio}}
=\mathrm{TTS}\left(
M_{\mathrm{text}}\left(\mathrm{ASR}(x_{\mathrm{audio}})\right)
\right)
$$

这个分解把音频先压缩成文字，再由文本模型推理，最后再合成语音。它的缺点是明显的：ASR 转写会丢失语气、笑声、歌唱、重音、背景声、多说话人重叠等信息；LLM 只能看到文本中间结果；TTS 只能根据文本重建声音表现。GPT-4o 则把这些信号放入同一模型上下文，目标从“转写后理解”变成“直接对原始多模态交互建模”。

官方 System Card 把 GPT-4o 描述为 autoregressive omni model。一个高层抽象可以写成跨模态条件自回归：

$$
p_{\theta}(y_{1:T}^{\mathcal{M}_{out}}\mid x_{1:S}^{\mathcal{M}_{in}}, c)
=\prod_{t=1}^{T}
p_{\theta}(y_t^{\mathcal{M}_{out}}\mid y_{<t}^{\mathcal{M}_{out}}, x_{1:S}^{\mathcal{M}_{in}}, c)
$$

其中 \(\mathcal{M}_{in}\) 可包含文本、音频、图像、视频，\(\mathcal{M}_{out}\) 可包含文本、音频、图像，\(c\) 是系统指令和对话状态。这个公式不是 OpenAI 公开的逐层实现，而是对官方“同一神经网络处理所有输入输出”的训练目标抽象：模型学习的不是单一文本 token 分布，而是在跨模态上下文下生成目标模态序列的条件分布。

端到端带来的直接收益是延迟和表达能力。旧 Voice Mode 官方给出的平均延迟是 GPT-3.5 约 2.8 秒、GPT-4 约 5.4 秒；GPT-4o 发布页报告音频输入响应最低 232 ms、平均 320 ms。更重要的是，延迟降低不是单纯优化工程队列，而是减少了 ASR、文本推理、TTS 之间的串行边界，让模型可以边接收音频流边形成多模态状态，并以流式方式输出语音或文本。

GPT-4o 也把后训练和安全边界推到了多模态层面。System Card 披露的防护包括：语音输出限制在预设声音、输出分类器检测是否偏离允许声音；对基于声音识别说话人的请求进行拒答训练；对音频中的未根据证据推断和敏感属性推断进行后训练约束；对音频提示和输出转写运行安全分类器。这说明 native multimodal 模型不只是能力更强，也引入了传统文本 LLM 没有的部署风险，尤其是声音相似、身份推断和音频版权内容。

与 Qwen-Audio、LauraGPT 等公开论文模型相比，GPT-4o 的技术报告没有给出可复现的模块图、参数规模、tokenizer 细节或损失函数。可确定的核心差异是系统层级的：Qwen-Audio 更像“音频 encoder 接入 LLM 做理解”，LauraGPT 用“连续输入 + 离散输出 + codec vocoder”统一理解与生成，而 GPT-4o 的目标是把文本、视觉、音频交互直接内化到一个端到端 omni 模型里，让实时对话成为模型原生能力。

> ⚠️ 注意：GPT-4o 的公开材料主要是发布页和 System Card，缺少完整论文级方法细节；因此上面的公式和伪代码用于解释公开描述，不代表 OpenAI 披露的内部实现。

#### 🧪 练习题
```yaml
question: "GPT-4o 相比旧版 Voice Mode 的关键方法变化是什么？"
options:
  - "仍然使用 ASR、文本 LLM、TTS 三个独立模型，但换了更大的 ASR"
  - "只提升文本 tokenizer 压缩率，不改变语音交互路径"
  - "训练单一端到端 omni 模型直接处理文本、视觉和音频输入输出"
  - "完全取消安全后训练，只依赖用户端过滤"
answer: 2
explain: "官方发布页明确对比旧三模型语音管线，并说明 GPT-4o 是跨文本、视觉、音频端到端训练的单一新模型。"
```

### Gemini 1.5 Pro

```yaml
id: gemini-1.5
num: 11
name: Gemini 1.5 Pro
full_name: Gemini 1.5专业版 (Gemini 1.5 Pro)
year: '2024'
org: Google
parent: gpt-4o
paper_url: https://arxiv.org/abs/2403.05530
project_url: ''
category: native_e2e
motivation: 稀疏MoE+200万token上下文
```

#### 📝 一句话总结
Gemini 1.5 Pro 提出了稀疏 MoE Transformer 原生多模态模型，通过条件计算和长上下文训练把文本、图像、音频、视频、代码统一放入同一序列中建模，解决了高质量通用能力与百万级上下文成本难以兼得的问题。

#### 🎯 核心要点
- **稀疏 MoE Transformer**：用学习到的路由函数只激活部分专家参数，在总参数规模扩大的同时保持每个 token 的激活计算量相对稳定
- **原生多模态长上下文**：同一输入序列支持交错文本、图像、视频、音频和代码，报告中强调 2M+ 上下文能力，并在研究评测中扩展到 10M token 级别
- **长上下文能力不牺牲核心能力**：在文本、视觉、音频、视频、代码、函数调用等基准上达到或超过 Gemini 1.0 Ultra，同时显著降低训练和服务成本
- **多模态 needle-in-a-haystack 评测**：在文本、视频、音频中测试不同长度和不同插入深度的检索，1M token 内接近完美召回，研究设置延伸到 10M token
- **真实长上下文任务**：覆盖长文档 QA、长视频 QA、长音频 ASR、代码库理解、整本语法书上下文学习低资源语言 Kalamang
- **训练与对齐流程**：大规模多模态多语言预训练后，使用多模态指令数据微调，并结合人类偏好数据进行后训练对齐

#### 🔬 深入细节
![Gemini 1.5 Pro 多模态长上下文检索热力图](https://arxiv.org/html/2403.05530v2/extracted/5559627/figs/haystack/gemini_1.5_tech-report_03.png)
*图：Gemini 1.5 Pro 在文本、视频、音频 needle-in-a-haystack 任务中的召回热力图。横轴是上下文长度，纵轴是目标信息插入深度，绿色表示成功召回。*

Gemini 1.5 Pro 的核心不是把一个短上下文多模态模型简单扩窗，而是同时重做了架构、数据、优化和服务系统。论文把它定义为 sparse mixture-of-experts Transformer：在 Transformer 的若干前馈或专家模块处，用路由器 \(g_\phi(x)\) 为每个 token 选择少数专家，只有被选中的专家参与计算。因此模型可以拥有更大的总容量 \(N_{\text{total}}\)，但单次前向传播激活的参数量 \(N_{\text{active}}\) 只随 top-\(k\) 专家增长。

$$
h' = \sum_{i \in \operatorname{TopK}(g_\phi(h), k)} g_i(h)\,E_i(h),
\qquad
N_{\text{active}} \ll N_{\text{total}}
$$

这个设计解释了 Gemini 1.5 Pro 的效率来源：长上下文会让注意力和 KV 缓存压力急剧上升，如果每个 token 都激活完整稠密参数，百万级上下文的训练和服务成本会非常高。MoE 的条件计算把“容量”和“每 token 计算量”部分解耦，使模型能保持足够的知识和推理容量，同时把实际激活计算控制在可服务范围内。

```python
# Gemini 1.5 Pro 风格的长上下文多模态推理流程（概念伪代码）
def gemini15_infer(multimodal_prompt):
    # 1. 将文本、图像帧、音频片段、视频帧、代码等统一转换为 token/embedding 序列
    tokens = []
    for segment in multimodal_prompt:
        tokens.extend(encode_by_modality(segment))

    # 2. 构造百万级上下文位置与模态标记
    states = add_position_and_modality_embeddings(tokens)

    # 3. Transformer 层处理；MoE 层只激活 top-k 专家
    kv_cache = {}
    for layer in transformer_layers:
        states = layer.self_attention(states, kv_cache=kv_cache)
        if layer.has_moe:
            route = router(states)             # 每个 token 的专家分配
            states = sum_topk_experts(states, route, k=2)
        else:
            states = layer.feed_forward(states)

    # 4. 自回归解码，输出文本答案或工具调用等结构化结果
    return decode_next_tokens(states)
```

长上下文能力的关键评测是“needle-in-a-haystack”：把一个目标事实、关键词或事件插入到很长的干扰上下文中，要求模型在问题中准确取回。令 \(L\) 表示上下文长度、\(d\in[0,1]\) 表示插入深度、\(s\) 表示目标信息，评测本质上是在估计：

$$
\operatorname{Recall}(L,d)=\mathbb{1}\{\operatorname{extract}(M(x_{1:L}, q_s)) = s\}
$$

论文的重点在于，这个检索不是只做文本；视频和音频会先被编码成长序列，并与文本查询一起输入同一个多模态模型。因而模型需要同时具备跨模态感知、长距离定位和指令遵循能力。报告中给出的现实量级很直观：10M token 约对应 107 小时音频、10.5 小时 1 FPS 视频，或者远超整本《战争与和平》的文本长度。

训练流程也体现了“原生多模态”的路线。预训练数据来自网页、代码、图像、音频、视频等多域多语言数据；后训练阶段用成对的多模态指令与期望响应做指令微调，再用人类偏好数据改善有用性、安全性和风格。可以把目标写成多项加权优化：

$$
\mathcal{L}
= \mathcal{L}_{\text{next-token}}
+ \lambda_{\text{inst}}\mathcal{L}_{\text{instruction}}
+ \lambda_{\text{pref}}\mathcal{L}_{\text{preference}}
+ \lambda_{\text{safety}}\mathcal{L}_{\text{safety}}
$$

与传统 RAG 或滑窗式长文处理相比，Gemini 1.5 Pro 的优势是把大量上下文直接放入模型可见窗口，让模型能在同一次前向/解码上下文中做跨段推理。RAG 的检索器若漏掉关键片段，下游模型通常无法恢复；而百万级上下文模型能在整本书、完整代码库或长视频中直接综合多个远距离证据。不过这也带来新的工程约束：注意力效率、KV cache、长序列位置泛化、低延迟流式服务和长上下文安全评测都必须一起解决。

> 💡 关键：Gemini 1.5 Pro 的“长上下文”不是单一技巧，而是 MoE 条件计算、原生多模态序列化、大规模长序列训练、后训练对齐和服务系统共同作用的结果。

#### 🧪 练习题
```yaml
question: "Gemini 1.5 Pro 使用稀疏 MoE 的主要目的是什么？"
options:
  - "让所有专家在每个 token 上同时计算，从而提升召回率"
  - "用路由器为 token 选择少数专家，在扩大总模型容量的同时控制单次激活计算量"
  - "把视频和音频预先检索成文本摘要，避免多模态编码"
  - "只提升短文本聊天能力，与长上下文无关"
answer: 1
explain: "MoE 的条件计算让模型拥有更大的总参数容量，但每个 token 只经过少数专家，因此有助于在百万级上下文下兼顾质量和训练/服务效率。"
```

### CoDi

```yaml
id: codi
num: 12
name: CoDi
full_name: 可组合扩散模型 (Composable Diffusion)
year: '2023'
org: Microsoft
parent: —
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/33edf072fe44f19079d66713a1831550-Abstract-Conference.html
project_url: ''
category: diffusion_fusion
motivation: 可组合扩散Any-to-Any生成
```

#### 📝 一句话总结
CoDi 提出了可组合扩散框架，通过输入侧 Bridging Alignment 和输出侧 Latent Alignment，把文本、图像、视频、音频的条件空间与扩散潜空间对齐，解决了 any-to-any 多模态生成组合数量指数爆炸、训练数据缺失的问题。

#### 🎯 核心要点
- **Any-to-Any 生成目标**：支持任意输入模态组合到任意输出模态组合，包括单输出、多条件输入和多模态同步输出
- **Bridging Alignment**：以文本为桥接模态，对齐文本、图像、视频、音频 prompt encoder，使单条件训练后的扩散模型可零样本接受多条件组合
- **Composable Diffusion**：分别训练图像、视频、音频、文本 LDM，再通过对齐后的条件表示和跨模态 attention 组合成统一生成系统
- **Latent Alignment**：在扩散步骤 \(t\) 对不同输出模态的 noisy latent 建立共享环境表示，让一个模态的 UNet 可关注另一个模态的扩散状态
- **线性任务覆盖组合空间**：只训练有限的成对/桥接任务，就能在推理时通过表示插值覆盖未见过的多输入、多输出组合
- **多模态数据覆盖**：使用 LAION-400M、AudioSet、AudioCaps、Freesound、BBC Sound Effect、SoundNet、WebVid10M、HD-Villa-100M 等数据训练和对齐

#### 🔬 深入细节
![CoDi 模型架构](https://codi-gen.github.io/static/images/main_architecture.jpg)
*图：CoDi 的三阶段架构。先对齐 prompt encoder，再训练单模态 diffuser，最后在扩散潜变量层面对不同 diffuser 做 Latent Alignment，实现多模态联合生成。*

CoDi 的出发点是：真实世界的生成需求常常不是“文本到图像”这么单一，而是“文本+音频到视频+音频”“图像到文本+音频”等组合。若有 \(n\) 个模态，朴素训练所有输入/输出组合会接近指数复杂度；更现实的问题是许多组合根本没有成对数据。CoDi 因此选择把问题拆成两个对齐空间：输入条件空间和输出扩散潜空间。

输入侧的 Composable Multimodal Conditioning 先把不同模态 prompt encoder 对齐到同一空间。论文记文本、图像、视频、音频编码器为 \(C_t,C_i,C_v,C_a\)，对多输入条件直接做加权组合：

$$
C(x_t,x_i,x_v,x_a)=\sum_{m\in\{t,i,v,a\}}\alpha_m C_m(x_m),
\qquad \sum_m \alpha_m = 1
$$

这里的关键是 Bridging Alignment：文本几乎和所有模态都有大规模配对数据，因此 CoDi 不尝试训练所有模态两两对齐，而是固定已有的 CLIP 文本-图像空间，再用音频-文本、视频-文本对比学习把音频和视频拉到同一空间。这样，虽然单个 diffuser 训练时可能只见过一个条件模态，推理时仍可把多个条件编码相加或插值，形成组合条件。

```python
# CoDi 训练与推理核心流程（简化伪代码）
modalities = ["text", "image", "video", "audio"]

# 1. Bridging Alignment: 以 text 为桥，对齐 prompt encoders
freeze(C_text, C_image)  # 复用 CLIP 文本-图像空间
for batch in audio_text_pairs:
    loss = contrastive(C_audio(batch.audio), C_text(batch.text))
    update(C_audio, loss)
for batch in video_text_pairs:
    loss = contrastive(C_video(batch.video), C_text(batch.text))
    update(C_video, loss)

# 2. 单模态 LDM: 分别训练 text/image/video/audio diffuser
for modality in modalities:
    for x, condition in dataset[modality]:
        z = VAE_encoder[modality](x)
        t, eps = sample_timestep(), normal_noise()
        z_t = alpha(t) * z + sigma(t) * eps
        cond = aligned_prompt_encoder(condition)
        loss = mse(eps, UNet[modality](z_t, t, cond))
        update(UNet[modality], loss)

# 3. Latent Alignment: 多输出联合生成时互相 cross-attend
for paired_modalities in joint_pairs:
    zA_t, zB_t = sample_noisy_latents(paired_modalities)
    envB = V_B(zB_t)
    lossA = mse(epsA, UNet_A.cross_attend(zA_t, envB, t, cond))
    lossB = mse(epsB, UNet_B.cross_attend(zB_t, V_A(zA_t), t, cond))
    update(cross_attention_and_env_encoders, lossA + lossB)
```

CoDi 的基础生成器是 Latent Diffusion Model。输入样本 \(x\) 先经自编码器变成潜变量 \(z=E(x)\)，再按时间步 \(t\) 加噪：

$$
z_t=\alpha_t z+\sigma_t\epsilon,\qquad \epsilon\sim\mathcal{N}(0,I)
$$

单模态扩散训练目标是预测噪声：

$$
\mathcal{L}_D
=\mathbb{E}_{z,\epsilon,t}\left\|\epsilon-\epsilon_\theta(z_t,t,C(y))\right\|_2^2
$$

这一步让每个模态保持自己的最佳生成结构：图像 LDM 继承 Stable Diffusion 1.5，视频 LDM 在图像 diffuser 上加入时序模块和 latent shift，音频 LDM 把 mel-spectrogram 当作单通道图像潜变量建模，文本 LDM 使用 OPTIMUS/GPT-2 风格的文本潜空间。也就是说，CoDi 没有强行把所有输出塞进一个 decoder，而是让每种模态保留擅长的 diffuser。

输出侧的 Latent Alignment 是 CoDi 的第二个关键。设要联合生成模态 \(A\) 和 \(B\)，它们在扩散步 \(t\) 的潜变量为 \(z_t^A,z_t^B\)。CoDi 用环境编码器 \(V_B\) 把 \(z_t^B\) 投到共享潜空间，然后让 \(A\) 的 UNet 在每层通过 cross-attention 关注 \(V_B(z_t^B)\)：

$$
\mathcal{L}_{\text{Cross}}^A
=\mathbb{E}_{z,\epsilon,t}
\left\|\epsilon-\epsilon_{\theta_c}(z_t^A,V_B(z_t^B),t,C(y))\right\|_2^2
$$

直觉上，Bridging Alignment 解决“我该听哪些输入条件”，Latent Alignment 解决“多个输出在生成过程中如何同步”。例如文本提示生成雨天街景视频和雨声时，视频 diffuser 的中间状态能关注音频 diffuser 的中间状态，音频也能反向关注视频，从而比后处理拼接更容易产生时间一致的输出。

与传统单向跨模态模型相比，CoDi 的优势在于可组合性。单向模型通常为某个固定方向训练，如 text-to-image 或 text-to-audio；CoDi 则将训练成本压到一组线性的桥接任务和成对 latent alignment 任务。未见过的组合在推理时通过条件表示插值、环境表示对齐和多 diffuser 同步去噪完成，因此它更像一个“可插拔的多模态扩散系统”，而不是一个固定输入输出接口的生成器。

> ⚠️ 注意：CoDi 的 any-to-any 能力主要来自对齐空间的可组合泛化，并不意味着所有未见组合都有同等质量；质量仍受单模态 diffuser、成对数据覆盖和 alignment 稳定性影响。

#### 🧪 练习题
```yaml
question: "CoDi 中 Bridging Alignment 的核心作用是什么？"
options:
  - "让所有输出模态共用同一个 VAE decoder"
  - "以文本为桥，把不同模态的 prompt encoder 对齐到同一条件空间，减少组合训练成本"
  - "在推理时把多个 diffuser 的像素输出直接平均"
  - "只用于提升文本生成质量，与多模态条件无关"
answer: 1
explain: "Bridging Alignment 利用文本与图像、音频、视频之间更容易获得的配对数据，把条件编码器对齐到共享空间，使模型能通过表示插值组合任意输入条件。"
```

### CoDi-2

```yaml
id: codi-2
num: 13
name: CoDi-2
full_name: 可组合扩散模型第二代 (CoDi-2)
year: '2024'
org: Microsoft
parent: codi
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Tang_CoDi-2_In-Context_Interleaved_and_Interactive_Any-to-Any_Generation_CVPR_2024_paper.html
project_url: ''
category: diffusion_fusion
motivation: 上下文交错生成增强交互
```

#### 📝 一句话总结
CoDi-2 在 CoDi 的可组合扩散基础上引入多模态大语言模型作为交互与推理中枢，让模型能理解交错的图文音频上下文，并自回归地产生可供扩散模型解码的连续条件特征，从而实现更强的 in-context、交互式 any-to-any 生成。

#### 🎯 核心要点
- **MLLM 作为生成中枢**：用 LLM/MLLM 理解多轮对话、交错图像/音频/文本指令和 in-context 示例，而不是只依赖扩散模型的条件编码器
- **连续特征生成**：不把图像和音频离散化成 token，而是让 MLLM 自回归预测扩散模型所需的条件特征 \(c\)
- **扩散模型解码输出**：预测出的视觉/音频条件特征输入 Stable Diffusion 2.1 unCLIP、AudioLDM 等扩散解码器生成高质量样本
- **联合训练损失**：同时优化文本 token loss、扩散像素/潜变量生成 loss、MLLM 输出特征与目标特征的 MSE loss
- **交错式 in-context 数据构造**：引入 MIMIC-IT、LAION-400M、AudioSet、WebVid、InstructPix2Pix、AUDIT 风格音频编辑和构造式 in-context multimodal generation 数据
- **能力范围扩展**：覆盖多轮对话、图像编辑、音频编辑、主体驱动图像生成、示例学习、组合推理和同步多模态输出

#### 🔬 深入细节
![CoDi-2 模型架构](https://codi-2.github.io/static/images/main_model.jpg)
*图：CoDi-2 架构。多模态编码器把图像/音频输入变成特征序列并插入 LLM 上下文；MLLM 生成文本 token 或连续多模态特征，后者再交给扩散模型生成图像/音频。*

CoDi-2 解决的是 CoDi 的交互短板。CoDi 已经能把多种 diffuser 可组合起来，但它本质上仍是围绕扩散条件和潜空间对齐设计的生成系统，对多轮对话、上下文示例、复杂编辑指令的理解不如 LLM 自然。CoDi-2 因此把 MLLM 放在中心：输入端用多模态编码器把图像、音频变成特征序列，并用特殊 token 包裹后插入语言上下文，例如 `<image> feature sequence </image>`、`<audio> feature sequence </audio>`。

这个设计让交错上下文成为普通的自回归序列问题。对于一句“参考这张图中的主体，把它放到另一张场景里，并保留这段音频的节奏”这样的指令，CoDi-2 不需要为每种任务写固定接口；MLLM 在同一上下文里看到文本、图像特征、音频特征和历史对话，再决定要输出文本回答，还是输出用于图像/音频扩散解码的条件特征。

```python
# CoDi-2 交错 any-to-any 生成流程（概念伪代码）
def codi2_generate(conversation):
    sequence = []

    # 1. 编码交错输入：文本保留 token，图像/音频转为连续特征并加特殊边界 token
    for item in conversation:
        if item.type == "text":
            sequence.extend(text_tokenizer(item.text))
        elif item.type == "image":
            sequence.extend(["<image>", image_encoder(item.image), "</image>"])
        elif item.type == "audio":
            sequence.extend(["<audio>", audio_encoder(item.audio), "</audio>"])

    # 2. MLLM 自回归推理，输出文本 token 或多模态条件特征
    outputs = MLLM.generate(sequence)

    # 3. 文本直接解码；图像/音频特征送入对应 diffusion decoder
    result = []
    for out in outputs:
        if out.kind == "text_token":
            result.append(text_decoder(out))
        elif out.kind == "image_feature":
            result.append(image_diffusion_decoder(condition=out.feature))
        elif out.kind == "audio_feature":
            result.append(audio_diffusion_decoder(condition=out.feature))

    return result
```

CoDi-2 没有采用“把图片/音频压成离散 token 再像文本一样生成”的路线。论文认为这种方案受 VAE 式 decoder 限制，生成质量难以追上扩散模型。因此它保留扩散模型作为最终生成器，让 MLLM 预测扩散模型需要的连续条件特征。扩散模型的基础目标仍是：

$$
\mathcal{L}_{DM}
=\mathbb{E}_{z,\epsilon,t}
\left\|\epsilon-\epsilon_\theta(z_t,t,C_y(y))\right\|_2^2
$$

其中 \(z_t\) 是噪声潜变量，\(C_y(y)\) 是条件编码器输出。CoDi-2 的关键改动是让 MLLM 输出条件特征 \(c_{\text{MLLM}}\)，并显式逼近目标样本的编码特征 \(C_x(x)\)。总损失为：

$$
\mathcal{L}
=\alpha\,\operatorname{MSE}(c_{\text{MLLM}}, C_x(x))
+\mathcal{L}_{DM}
+\mathcal{L}_t
$$

\(\mathcal{L}_t\) 是标准文本 token 预测损失，\(\mathcal{L}_{DM}\) 让扩散解码器生成高质量感知输出，MSE 项则给 MLLM 更直接的连续特征监督。这样做的直觉是：LLM 负责“理解和规划生成什么”，扩散模型负责“把连续条件变成高保真图像/音频”。

训练数据是 CoDi-2 能进行 in-context 生成的另一半。论文不仅使用图文、音文、视频文本等成对数据，还把 InstructPix2Pix、AUDIT 风格音频编辑、Kosmos-G/主体驱动生成等任务改造成交错示例格式。对于没有天然多模态输出的数据，CoDi-2 利用已对齐的编码器特征，把文本侧的任务描述或响应替换成同一空间中的多模态特征，从而构造“示例输入 + 当前指令 + 目标输出”的上下文学习格式。

与 CoDi 相比，CoDi-2 的关键差异是控制流从 diffuser 侧转移到了 MLLM 侧。CoDi 擅长把多个 diffuser 同步组合，但任务接口更像生成图；CoDi-2 则能在多轮聊天中读取历史示例、理解抽象编辑意图、进行组合推理，再调用扩散解码器落地为图像或音频。这使它更接近一个交互式多模态生成代理，而不是单次调用的跨模态生成模型。

> 💡 关键：CoDi-2 不是抛弃扩散模型，而是让 MLLM 生成扩散模型的连续条件特征；语言模型负责 in-context 推理，扩散模型负责高保真解码。

#### 🧪 练习题
```yaml
question: "CoDi-2 为什么让 MLLM 预测连续条件特征，而不是直接离散化生成图像/音频 token？"
options:
  - "因为连续特征可以直接交给扩散模型解码，保留扩散模型的高质量生成能力"
  - "因为 CoDi-2 不需要任何图像或音频解码器"
  - "因为文本 token loss 已经足以训练所有模态输出"
  - "因为连续特征只用于检索，不参与生成"
answer: 0
explain: "论文认为离散 token 方案受生成 decoder 限制；CoDi-2 让 MLLM 预测扩散条件特征，再由图像/音频扩散模型生成高保真输出。"
```

### AnyGPT

```yaml
id: anygpt
num: 14
name: AnyGPT
full_name: 任意模态GPT (AnyGPT)
year: '2024'
org: 复旦/上海AI Lab
parent: —
paper_url: https://aclanthology.org/2024.findings-acl.521/
project_url: ''
category: autoregressive
motivation: 离散Token统一处理所有模态
```

#### 📝 一句话总结
AnyGPT 提出用离散 token 统一表示文本、图像、语音和音乐，让现有 LLM 在不改 Transformer 架构和训练目标的前提下完成任意模态到任意模态的理解与生成。它的关键不是增加大量模态专用桥接层，而是把多模态输入输出都变成同一种自回归 token 序列。

#### 🎯 核心要点
- **统一离散序列建模**：图像、语音、音乐先由专用 tokenizer 压缩为离散 token，再与文本 token 交错拼接给 LLaMA-2-7B 做 next-token prediction
- **模型结构基本不变**：只扩展词表、输入 embedding 和输出 prediction head，LLM 主体结构与语言模型训练范式保持不变
- **多模态 tokenizer/de-tokenizer 组合**：图像使用 SEED tokenizer 与扩散式解码，语音使用 SpeechTokenizer 语义 token + SoundStorm 补全声学 token，音乐使用 Encodec RVQ token
- **两级生成策略**：LLM 负责语义级 token，非自回归或扩散式后处理模块负责恢复高保真感知细节，缓解音频/图像长序列带来的自回归负担
- **文本中心对齐预训练**：利用文本作为语义桥，将不同模态先与文本对齐，再间接实现模态间互相对齐
- **AnyInstruct-108k**：用生成模型合成 108k 条多轮、交错多模态 instruction 数据，训练模型在对话中自由选择输出文本、图像、语音或音乐

#### 🔬 深入细节
##### 框架总览

![AnyGPT 模型架构总览](https://arxiv.org/html/2402.12226v2/x1.png)
*图：AnyGPT 将各模态先离散化为 token，LLM 在统一 token 序列上做自回归理解与生成，再由对应 de-tokenizer 还原为图像、语音或音乐。*

AnyGPT 的核心动机是避免“每个模态一套 encoder/decoder 投影接口”的系统复杂度。NExT-GPT 这类方案把 LLM 接到外部编码器和扩散解码器，输入侧和输出侧的表示形式并不统一；AnyGPT 则把非文本模态先转成离散语义 token，使图像、语音、音乐在 LLM 看来更像“新语言”。因此训练目标可以保持为标准语言模型目标：

$$
\mathcal{L}_{\mathrm{NTP}}=-\sum_{t=1}^{T}\log p_{\theta}(z_t \mid z_{<t})
$$

其中 \(z_t\) 可以是文本 BPE token，也可以是图像、语音或音乐 tokenizer 产生的离散 token。这样做的工程含义很直接：新增模态主要发生在数据预处理、词表扩展和后处理模块上，而不是重写 LLM 主干。

##### 核心流程伪代码

```python
# AnyGPT 统一离散序列训练流程
for dialogue in multimodal_corpus:
    seq = []
    for segment in dialogue:
        if segment.type == "text":
            seq += text_tokenizer(segment.text)
        elif segment.type == "image":
            seq += ["<image>"] + seed_tokenizer(segment.image) + ["</image>"]
        elif segment.type == "speech":
            semantic = speech_tokenizer.semantic_tokens(segment.audio)
            seq += ["<speech>"] + semantic + ["</speech>"]
        elif segment.type == "music":
            rvq_codes = encodec_tokenizer(segment.music)
            seq += ["<music>"] + flatten_frame_by_frame(rvq_codes) + ["</music>"]

    logits = llama2(seq[:-1])
    loss = cross_entropy(logits, seq[1:])
    update(llama2, loss)

# 推理时按特殊边界 token 分段，再交给对应 de-tokenizer
generated = autoregressive_decode(llama2, prompt_tokens)
outputs = detokenize_by_modality(generated)
```

##### 离散 token 是统一性的关键

AnyGPT 对不同模态采取“语义压缩优先”的 tokenizer 设计。图像侧使用 SEED tokenizer：输入 \(224\times224\) 图像，经 ViT 与 Causal Q-Former 得到 32 个因果视觉 embedding，再由 VQ codebook 离散化；这些 token 与 unCLIP Stable Diffusion 的潜空间对齐，方便后续还原为高质量图像。语音侧使用 SpeechTokenizer 的第一层 RVQ token 作为语义 token，后续声学细节交给 SoundStorm 与解码器补全；音乐侧使用 Encodec 的 RVQ code，并按帧展开成自回归序列。

词表扩展可以写成：

$$
V=\sum_{i=1}^{n}V_i
$$

其中 \(V_i\) 是第 \(i\) 个模态的离散词表大小。直觉上，AnyGPT 不强迫 LLM 直接预测高维像素或波形，而是预测已经被 tokenizer 压缩过的语义索引；tokenizer 的质量决定了上限，LLM 的困惑度决定了跨模态组合与推理能力。

##### 训练数据用文本做桥

多模态任意互转的真实数据稀缺，AnyGPT 采用文本中心的对齐策略：先收集图文、语音文本、音乐文本等配对数据，让每个非文本模态都能映射到自然语言语义空间；由于文本本身是最密集、最成熟的语义表示，模态 A 和模态 B 只要都能与文本对齐，就可以通过同一个 LLM 隐空间产生间接对齐。

在 instruction 阶段，作者进一步合成 AnyInstruct-108k。合成流程先生成文本版多轮对话、主题和场景，再把对话中的占位内容转换成图像、语音或音乐。这一步解决的是“模型什么时候应该输出哪种模态”的问题，而不仅是“给定 X 生成文本”。因此 AnyGPT 可以在同一轮回复中混合文本解释、图片、语音或音乐片段。

##### 生成分成语义层和感知层

纯自回归 LLM 直接生成高保真音频或图像会遇到序列极长的问题。AnyGPT 将生成拆成两层：LLM 只生成语义层离散 token，感知层细节由专业 de-tokenizer 生成。图像 token 交给扩散模型还原，语音语义 token 先由 SoundStorm 生成声学 token，再由 SpeechTokenizer decoder 还原波形；音乐 token 则由 Encodec decoder 复原。

> 💡 关键：AnyGPT 的“统一”发生在语义 token 层，而不是像素、波形或扩散 latent 层。这样既保留 LLM 的推理和对话能力，也把高保真重建交给更适合的专用生成器。

#### 🧪 练习题
```yaml
question: "AnyGPT 能在不大改 LLM 架构的情况下支持多模态生成，最核心的原因是什么？"
options:
  - "把所有非文本模态先转换为离散 token，并继续使用 next-token prediction"
  - "为每个模态训练一个独立的大型 Transformer"
  - "完全依赖外部工具链，不训练 LLM"
  - "只把图像和语音转写成文本描述"
answer: 0
explain: "AnyGPT 的统一性来自离散 token 序列建模；非文本模态被当作新词表中的 token，LLM 主体仍按标准自回归目标训练。"
```

### NExT-GPT

```yaml
id: next-gpt
num: 15
name: NExT-GPT
full_name: 下一代GPT (NExT-GPT)
year: '2023'
org: NUS
parent: —
paper_url: https://arxiv.org/abs/2309.05519
project_url: ''
category: encoder_llm_decoder
motivation: LLM+编码器+扩散解码器架构
```

#### 📝 一句话总结
NExT-GPT 提出一个 encoder-LLM-decoder 式 any-to-any 多模态 LLM：用 ImageBind 等编码器接入 Vicuna，用特殊模态信号 token 指挥 Stable Diffusion、Zeroscope、AudioLDM 等扩散解码器，从而支持文本、图像、视频、音频任意组合输入和输出。

#### 🎯 核心要点
- **三段式架构**：多模态编码器 → LLM 理解与规划 → 多模态扩散解码器
- **输入侧统一编码**：使用 ImageBind 作为高性能多模态编码器，并用输入投影层把图像/视频/音频特征映射到 LLM 可理解的语言式表示
- **LLM 作为决策中枢**：Vicuna 直接生成文本，同时生成 `[IMG_i]`、`[VID_i]`、`[AUD_i]` 等模态信号 token，决定是否触发对应模态生成器
- **输出侧扩散生成**：图像用 Stable Diffusion，视频用 Zeroscope，音频用 AudioLDM；输出投影层把 LLM 信号 token 映射到扩散模型条件空间
- **轻量训练**：冻结编码器、LLM 主体和扩散 U-Net，主要训练输入/输出投影层，论文报告仅约 1% 参数需要更新
- **三阶段训练**：编码侧 X-to-text 对齐、解码侧 instruction-following 对齐、基于 MosIT 的端到端 instruction tuning
- **MosIT 数据集**：人工构建 5k 条高质量 modality-switching instruction 数据，覆盖跨文本/图像/视频/音频的多轮复杂指令

#### 🔬 深入细节
##### 框架总览

![NExT-GPT 模型架构](https://arxiv.org/html/2309.05519v3/x1.png)
*图：NExT-GPT 连接多模态编码器、Vicuna LLM 和多种扩散解码器，用模态信号 token 实现任意输入到任意输出。*

NExT-GPT 的问题设定是：现有多模态 LLM 大多只能“看懂”图像/视频/音频，然后输出文本；如果要输出图像或音频，常见做法是让 LLM 调外部工具，但工具链之间只传递文本，容易丢失视觉数量、空间关系、音色等非语言信息。NExT-GPT 把外部生成器纳入同一个可训练系统，用隐藏状态中的模态信号 token 承载比文本 caption 更细的生成条件。

整体数据流可以写成：

$$
h_X=P_{\mathrm{in}}(E_X(X)),\quad
y_{\mathrm{text}}, s_m=\mathrm{LLM}(h_X, q),\quad
\hat{X}_m=D_m(P_{\mathrm{out}}^m(s_m))
$$

其中 \(E_X\) 是输入模态编码器，\(P_{\mathrm{in}}\) 是输入投影层，\(s_m\) 是 LLM 产生的模态信号 token，\(P_{\mathrm{out}}^m\) 是对应输出投影层，\(D_m\) 是图像、视频或音频扩散解码器。

##### 核心流程伪代码

```python
# NExT-GPT 推理与训练主流程
def forward(user_inputs, instruction):
    llm_inputs = text_tokenizer(instruction)

    for modality, x in user_inputs:
        feats = frozen_imagebind_encoder[modality](x)
        concept_tokens = input_projector[modality](feats)
        llm_inputs = insert_modality_tokens(llm_inputs, concept_tokens)

    llm_outputs = vicuna(llm_inputs)
    text_response = decode_text_tokens(llm_outputs)
    signal_tokens = collect_signal_tokens(llm_outputs, ["IMG", "VID", "AUD"])

    generated = {}
    for modality, signals in signal_tokens.items():
        cond = output_projector[modality](signals.hidden_states)
        generated[modality] = frozen_diffusion_decoder[modality](cond)

    return text_response, generated

# 训练时主要更新 projector，第三阶段再用 LoRA 调整部分 LLM 参数
loss = ce_text + ce_signal + lambda_l2 * align(signal_hidden, diffusion_text_cond) + lambda_diff * denoise_loss
```

##### 输入侧：把多模态特征变成 LLM token

输入侧使用 ImageBind 这类统一编码器处理图像、视频和音频，避免为每种模态维护完全不同的 encoder。编码后的 patch/grid 特征并不天然等价于文本 token 语义，因此论文设计 learnable concept tokens 进行分组聚合，再通过投影层送入 Vicuna。第一阶段训练使用 X-caption 数据：给定图像/视频/音频，让冻结 LLM 生成对应 caption，只更新输入投影层。

这个阶段的目标本质上是让 \(P_{\mathrm{in}}\) 成为“多模态 tokenizer”：

$$
\mathcal{L}_{\mathrm{enc}}=-\sum_t \log p_{\theta}(c_t \mid P_{\mathrm{in}}(E_X(X)), c_{<t})
$$

训练数据包括 CC3M 图像-caption、WebVid 视频-caption 和 AudioCaps 音频-caption。由于 LLM 主体冻结，投影层必须学会把外部编码器的表示压缩到 LLM 已经能解释的语义空间。

##### 输出侧：模态信号 token 对齐扩散解码器

LLM 需要决定“输出什么模态”以及“把什么语义传给生成器”。NExT-GPT 为三类输出引入特殊 token：`[IMG_i]`、`[AUD_i]`、`[VID_i]`。如果 LLM 输出某类信号 token，就触发对应扩散解码器；如果不输出，就表示该模态不生成。不同模态使用不同数量的信号 token，例如图像较少、视频更多，以承载不同复杂度的条件信息。

输出侧训练同时包含三类损失：信号 token 的负对数似然、信号隐藏状态与扩散文本条件之间的 \(l_2\) 对齐、以及条件扩散去噪损失：

$$
\mathcal{L}_{\mathrm{dec}}
=\mathcal{L}_{\mathrm{NLL}}(s)
+\lambda_1\lVert P_{\mathrm{out}}(h_s)-T(c)\rVert_2^2
+\lambda_2\mathbb{E}_{\epsilon,t}\lVert \epsilon-\epsilon_{\phi}(z_t,t,P_{\mathrm{out}}(h_s))\rVert_2^2
$$

其中 \(T(c)\) 是扩散模型文本编码器得到的 caption 条件，\(\epsilon_{\phi}\) 是冻结扩散 U-Net。这样训练后，LLM 的隐状态不只是“文本提示词”，而是可被下游生成器直接消费的条件向量。

##### MosIT：让系统学会跨模态切换

前两阶段解决的是对齐问题，但还不足以让模型在复杂对话中自主选择输出模态。NExT-GPT 因此提出 modality-switching instruction tuning，使用 5k 条人工构建的 MosIT 数据进行第三阶段训练。每条对话可包含 3-7 轮，多轮之间输入/输出模态会切换，例如文本+图像输入，输出文本+音频，下一轮再要求生成视频。

第三阶段使用 instruction-following 数据训练整体系统：输入/输出投影层保持可训练，并通过 LoRA 更新部分 LLM 参数。相比纯工具调用式系统，NExT-GPT 的优势是中间表示不是硬 caption，而是保留在 LLM hidden states 和模态信号 token 中的连续条件；这能减少文本瓶颈带来的信息丢失。

> ⚠️ 注意：NExT-GPT 的统一性主要来自系统级连接和训练流程，而不是像 AnyGPT 那样把所有模态都变成同一个离散 token 词表。因此它更容易利用强大的现成扩散模型，但输入/输出表示仍然依赖模态专用接口。

#### 🧪 练习题
```yaml
question: "NExT-GPT 中模态信号 token 的主要作用是什么？"
options:
  - "替代所有扩散模型的参数"
  - "让 LLM 指示是否生成某种模态，并为对应解码器提供条件表示"
  - "只用于把图像转写成文本 caption"
  - "减少 ImageBind 编码器的输入分辨率"
answer: 1
explain: "模态信号 token 是 LLM 与输出扩散解码器之间的接口：它们既表示生成哪种模态，也通过隐藏状态携带生成条件。"
```

### OneLLM

```yaml
id: onellm
num: 16
name: OneLLM
full_name: 统一大语言模型 (OneLLM)
year: '2024'
org: 上海AI Lab
parent: next-gpt
paper_url: https://github.com/csuhan/OneLLM
project_url: ''
category: encoder_llm_decoder
motivation: 8种模态统一映射对齐
```

#### 📝 一句话总结
OneLLM 提出用一个冻结的通用 CLIP-ViT 编码器、轻量模态 tokenizer 和 Universal Projection Module 将 8 种模态统一对齐到 LLaMA2 语言空间，解决以往多模态 LLM 为每种模态单独设计 encoder/projector 的扩展困难。

#### 🎯 核心要点
- **8 种模态统一接入**：支持图像、音频、视频、点云、深度图、法线图、IMU 和 fMRI 脑活动信号
- **轻量模态 tokenizer**：每种模态用 1D/2D 卷积把原始信号转为 token 序列，保留必要的形态差异但避免大型专用编码器
- **冻结通用编码器**：使用 CLIP-ViT 作为所有模态共享的 universal encoder，训练时保持冻结
- **Universal Projection Module (UPM)**：多个图文预训练投影专家加动态 router，把任意模态映射为 LLM 可消费的固定长度 modality tokens
- **learnable modality tokens**：为不同模态引入可学习查询 token，用于模态切换、信息汇聚和统一输出长度
- **渐进式多模态对齐**：先做 image-text alignment，再扩展到视频/音频/点云，最后扩展到深度/法线/IMU/fMRI，缓解数据规模不均衡和遗忘
- **2M instruction 数据**：构建覆盖 captioning、QA、reasoning、conversation 的多模态指令数据，最终在 25 个 benchmark 上评估

#### 🔬 深入细节
##### 框架总览

![OneLLM 模型架构](https://arxiv.org/html/2312.03700v2/x2.png)
*图：OneLLM 由轻量模态 tokenizer、冻结 CLIP-ViT universal encoder、UPM 和 LLaMA2 组成；对齐阶段训练 tokenizer 与 UPM，指令微调阶段主要训练 LLM。*

OneLLM 的核心问题是可扩展性。许多多模态 LLM 沿用“每种模态一个 encoder + 一个 projector”的结构，图像、音频、视频还能依赖成熟预训练模型，但点云、IMU、fMRI 这类模态很难找到同等质量的专用 encoder。OneLLM 的假设是：一个强视觉-语言 Transformer 已经学到足够通用的 token 处理能力，可以作为跨模态 universal encoder；真正需要针对模态变化适配的是输入 tokenizer 和投影模块。

##### 核心流程伪代码

```python
# OneLLM 渐进式统一对齐流程
modalities_stage = [
    ["image"],
    ["video", "audio", "point_cloud"],
    ["depth", "normal", "imu", "fmri"],
]

# stage 0: 先用图文数据训练 image projection，并复制初始化多个 UPM experts
P_image = train_image_text_projection(image_text_pairs, frozen_clip_vit, frozen_llama2)
UPM.experts = [copy(P_image) for _ in range(K)]

for current_modalities in modalities_stage:
    replay = sample_previous_modalities()
    batch = sample(current_modalities) + replay

    for x, modality, caption in batch:
        tokens = modality_tokenizer[modality](x)
        feats = frozen_clip_vit(tokens)
        q_bar = UPM(feats, modality_tokens[modality])
        loss = lm_caption_loss(frozen_llama2, q_bar, caption)
        update(modality_tokenizer[modality], UPM, loss)

# instruction tuning: 冻结 tokenizer/encoder/UPM，训练 LLM 遵循多模态指令
for q_bar, prompt, answer in multimodal_instruction_data:
    loss = response_ce_loss(llama2, [q_bar, system_prompt, prompt], answer)
    update(llama2, loss)
```

##### UPM：共享投影而不是模态专用投影

OneLLM 的 UPM 是论文最关键的结构。对模态 \(m\)，先把输入信号经过轻量 tokenizer 得到 \(\mathbf{x}_m\in\mathbb{R}^{L\times D}\)，再拼接该模态的可学习查询 token \(\mathbf{q}_m\)。UPM 用多个投影专家 \(P_k\) 和 router 权重 \(\mathbf{w}_m\) 进行软混合：

$$
[\bar{\mathbf{q}}_m,\bar{\mathbf{x}}_m]
=\mathrm{UPM}([\mathbf{q}_m,\mathbf{x}_m])
=\sum_{k=1}^{K}\mathbf{w}_m\cdot P_k([\mathbf{q}_m,\mathbf{x}_m])
$$

$$
\mathbf{w}_m=\sigma\left(R_m([\mathbf{q}_m,\mathbf{x}_m])\right),\quad
\sum_{k=1}^{K}\mathbf{w}_{m,k}=1
$$

最终只取 \(\bar{\mathbf{q}}_m\) 作为输入信号摘要送入 LLM。这一步相当于把任意长度、任意模态的输入统一压缩成固定长度的“语言前缀 token”，避免 LLM 上下文被视频帧、音频帧或点云点数拖垮。

##### 为什么先训练图文投影

直接把 8 种模态混在一起训练会遇到数据不均衡：图文数据巨大，IMU/fMRI 数据小且噪声高，模型容易偏向高资源模态或遗忘早期能力。OneLLM 先训练基础 vision LLM：CLIP-ViT + image projection + LLaMA2。图像投影 \(P_I\) 学会把 CLIP 表示映射进 LLM embedding space 后，再复制它初始化 UPM 的多个专家：

$$
\mathrm{UPM}=\{P_k\}=\{\mathrm{Init}(P_I)\}
$$

这样做的直觉是，CLIP-ViT 本来就与语言强对齐，图文投影是最稳定的起点。后续音频、视频、点云等模态不必从随机 projector 开始学习“怎么接到 LLM”，而是在已有图文对齐接口上迁移。

##### 渐进式对齐与指令微调分离

OneLLM 将训练分成两类目标。第一类是 multimodal-text alignment：给定任意模态输入，让冻结 LLaMA2 生成 caption 或文本描述，训练 tokenizer 与 UPM。该阶段不加复杂 system prompt，重点是把模态表示对齐到语言空间。对齐顺序按照数据规模分组：先 image，再 video/audio/point cloud，最后 depth/normal/IMU/fMRI；每个新阶段都会均匀采样旧模态数据，减少 catastrophic forgetting。

第二类是 unified multimodal instruction tuning。对齐完成后，OneLLM 已经像一个“多模态 captioning 模型”，但还不一定会遵循开放式指令。作者整理约 2M 条 instruction 数据，包括图像 VQA、视频 QA、音频 caption、点云描述、深度/法线衍生指令、IMU 动作描述和 fMRI 场景描述等。该阶段冻结 tokenizer、CLIP-ViT 和 UPM，主要全量微调 LLaMA2-7B，使其学会在统一 modality tokens 前缀条件下回答、推理和对话。

##### 与 NExT-GPT 的关系

OneLLM 可以看作对 NExT-GPT 输入侧扩展性的进一步收敛。NExT-GPT 更强调 any-to-any 生成，输出侧连接多个扩散解码器；OneLLM 重点解决“如何把更多输入模态统一接进 LLM”，因此不追求统一生成图像/音频/视频，而是追求统一理解、caption、QA 和 reasoning。它牺牲了一部分输出模态生成能力，换来更强的模态扩展性和更少的专用 encoder 依赖。

> 💡 关键：OneLLM 的统一不是把所有原始信号变成同一 tokenizer，而是用轻量 tokenizer 保留模态入口差异，再用共享 CLIP-ViT + UPM 把它们压到同一个 LLM 前缀空间。

#### 🧪 练习题
```yaml
question: "OneLLM 中 UPM 的主要作用是什么？"
options:
  - "把不同模态的 token 通过多个投影专家和动态路由映射为固定长度的 LLM 输入 token"
  - "替代 LLaMA2 完成文本生成"
  - "把所有模态直接解码成图像"
  - "只用于压缩图像分辨率"
answer: 0
explain: "UPM 是 OneLLM 的统一 X-to-language 接口，它用投影专家和 soft router 对不同模态进行共享映射，并输出固定长度 modality tokens。"
```

### Emu3

```yaml
id: emu3
num: 17
name: Emu3
full_name: Emu第三代 (Emu3)
year: '2024'
org: BAAI
parent: anygpt
paper_url: https://baai.ac.cn/news/861
project_url: ''
category: autoregressive
motivation: 纯Token预测统一图文视频生成
```

#### 📝 一句话总结
Emu3 提出只用 next-token prediction 训练一个统一多模态 Transformer，把文本、图像和视频都离散化为 token，解决图像/视频生成长期依赖扩散模型、视觉理解依赖 CLIP+LLM 组合的问题。它的核心判断是：只要视觉 tokenizer 足够强，图文视频生成与理解可以退化为同一个“预测下一个 token”的问题。

#### 🎯 核心要点
- **纯自回归统一范式**：图像、视频、文本全部转为离散 token，用单个 decoder-only Transformer 从头训练，不使用扩散 UNet、CLIP 视觉编码器或预训练 LLM 组合架构
- **视频级视觉 tokenizer**：基于 SBER-MoVQGAN 训练视觉 tokenizer，codebook size 为 32,768，可将 \(512\times512\) 图像或 \(4\times512\times512\) 视频片段编码为 4096 个视觉 token
- **显式多模态文档格式**：用 `[SOV]`、`[SOT]`、`[EOV]`、`[EOL]`、`[EOF]` 描述视觉片段、行边界和帧边界，并把分辨率、帧率、时长等元信息写成普通文本 token
- **长上下文视频预训练**：预训练分两阶段，第一阶段只用文本/图像、上下文长度 5120，第二阶段引入视频、上下文长度扩展到 131072
- **统一交叉熵目标**：所有模态都使用标准 next-token cross entropy；为避免视觉 token 数量压过文本学习，视觉 token loss 权重设为 0.5
- **生成后训练链路**：视觉生成先做高质量数据 QFT，再用人类偏好构造 chosen/rejected 样本做 DPO，同时保留 next-token loss
- **理解后训练链路**：视觉语言理解经过 image-to-text 训练与指令微调，训练时忽略视觉 token 的预测损失，重点优化文本回答

#### 🔬 深入细节
##### 框架总览

![Emu3 统一 next-token prediction 架构](https://raw.githubusercontent.com/baaivision/Emu3/main/assets/arch.png)
*图：Emu3 将视频、图像、文本先 token 化，再用单个 Transformer Decoder 预测下一个 token，最后按模态 detokenize 为文本、图像或视频。*

Emu3 的出发点是把多模态系统里的两条主流路线都压缩掉：图像/视频生成不再走“文本编码器 + 扩散去噪网络”，视觉理解也不再走“CLIP/ViT 编码器 + LLM 投影层”。它要求所有输入输出都先进入同一个离散符号空间，然后只训练一个条件概率模型：

$$
p_\theta(z_1,\dots,z_T)=\prod_{t=1}^{T}p_\theta(z_t\mid z_{<t})
$$

这里 \(z_t\) 可以是文本 token，也可以是视觉 tokenizer 产生的图像/视频 token。这个设计的关键不是“把图像硬塞给语言模型”，而是先用高压缩率视觉 tokenizer 把连续像素变成可预测的离散索引，使视觉生成变成类似语言建模的序列建模问题。

##### 核心流程伪代码

```python
# Emu3 统一图文视频预训练与后训练流程
for sample in multimodal_dataset:
    if sample.modality in ["image", "video"]:
        vision_tokens = vision_tokenizer.encode(sample.frames_or_image)
        meta_text = format_meta(
            resolution=sample.resolution,
            fps=sample.fps,
            duration=sample.duration,
        )
        seq = [
            "[BOS]",
            *text_tokenizer(sample.caption),
            "[SOV]",
            *text_tokenizer(meta_text),
            "[SOT]",
            *insert_eol_eof(vision_tokens),
            "[EOV]",
            "[EOS]",
        ]
    else:
        seq = ["[BOS]", *text_tokenizer(sample.text), "[EOS]"]

    logits = emu3(seq[:-1])
    weights = [0.5 if is_vision_token(tok) else 1.0 for tok in seq[1:]]
    loss = weighted_cross_entropy(logits, seq[1:], weights)
    update(emu3, loss)

# 视觉生成后训练：QFT 后再做 DPO
for prompt, chosen_tokens, rejected_tokens in preference_data:
    dpo_loss = preference_loss(emu3, ref_model, prompt, chosen_tokens, rejected_tokens)
    ntp_loss = next_token_loss(emu3, prompt + chosen_tokens)
    update(emu3, dpo_loss + ntp_loss)
```

##### 视觉 tokenizer 决定统一上限

Emu3 的视觉 tokenizer 基于 MoVQGAN 思路扩展到视频场景，可以把一个 \(4\times512\times512\) 视频片段或一张 \(512\times512\) 图像压成 4096 个离散 token，压缩率为时间维 \(4\times\)、空间维 \(8\times8\)。它在编码器和解码器中加入 3D convolution 的 temporal residual layer，使同一个 tokenizer 能处理图像和短视频片段，而不是只对单帧图像做 VQ。

tokenizer 的训练目标可以概括为重建误差、感知误差、对抗损失和 VQ commitment loss 的组合：

$$
\mathcal{L}_{\mathrm{tok}}
=\lambda_2\mathcal{L}_2
+\lambda_p\mathcal{L}_{\mathrm{LPIPS}}
+\lambda_g\mathcal{L}_{\mathrm{GAN}}
+\lambda_c\mathcal{L}_{\mathrm{commit}}
$$

这一步是 Emu3 能“纯 token 化”的基础。如果 tokenizer 重建能力差，Transformer 即使预测出了正确 token，也无法还原出高质量视觉内容；如果 tokenizer 不能覆盖视频时序变化，视频生成就会退化成相邻图像拼接。论文把视觉 tokenizer 作为关键开源技术之一，原因也在这里。

##### 训练格式把图像生成和图像理解变成同一件事

Emu3 的多模态样本不是简单地把 caption 和图像 token 拼起来，而是设计成类文档格式：

$$
[\mathrm{BOS}]\,\text{caption}\,[\mathrm{SOV}]\,\text{meta}\,[\mathrm{SOT}]\,\text{vision tokens}\,[\mathrm{EOV}]\,[\mathrm{EOS}]
$$

其中 meta text 用自然语言形式记录分辨率、帧率、时长等条件信息。这样，图像生成时模型先读 caption 和 meta，再自回归预测视觉 token；图像理解时，训练数据中一部分样本会把 caption 放在 `[EOV]` 之后，模型就变成先读视觉 token 再预测文本 token。也就是说，方向不同的任务不需要换网络，只需要换序列排列。

统一训练目标是加权交叉熵：

$$
\mathcal{L}_{\mathrm{NTP}}
=-\sum_{t=1}^{T}w_t\log p_\theta(z_t\mid z_{<t}),\quad
w_t=\begin{cases}
0.5,& z_t\in V_{\mathrm{vision}}\\
1.0,& z_t\in V_{\mathrm{text}}
\end{cases}
$$

视觉 token 的数量通常远多于文本 token，如果不降权，模型会把大量容量用于局部视觉重建，削弱语言条件和跨模态对齐。0.5 权重不是改变任务定义，而是调整不同 token 类型对梯度的贡献。

##### 视频生成依赖长上下文和帧边界 token

Emu3 的视频能力来自第二阶段预训练：模型上下文长度扩展到 131072，并加入视频数据。视频 token 序列中插入 `[EOL]` 表示视觉 token 的行边界，插入 `[EOF]` 表示帧边界，这使 decoder-only Transformer 在纯一维序列里仍能获得二维空间和时间分段信息。

与扩散视频模型从噪声场并行去噪不同，Emu3 的视频生成是因果的：给定提示或前序视频上下文，模型连续预测后续视觉 token。这带来一个重要能力：视频续写可以自然表示为 \(p(z_{t:T}\mid z_{<t})\)，不需要另设“未来帧预测”网络；代价是视觉 token 序列很长，推理速度和 KV cache 成本会明显高于并行扩散或 MaskGIT 类方法。

##### QFT 与 DPO 让自回归视觉生成对齐人类偏好

基础预训练让 Emu3 学会“能生成”，但高质量图像还需要后训练。QFT 阶段筛选高质量图像/视频，并把图像训练分辨率提高到 720 像素，仍然只对视觉 token 做 next-token prediction。随后 DPO 阶段对每个 prompt 采样多个候选，由人工按视觉吸引力和 prompt alignment 评分，形成 \((x, y^+, y^-)\) 偏好三元组。

DPO 可写成：

$$
\mathcal{L}_{\mathrm{DPO}}
=-\mathbb{E}\log\sigma\left(
\beta\left[
\log\frac{\pi_\theta(y^+\mid x)}{\pi_{\mathrm{ref}}(y^+\mid x)}
-\log\frac{\pi_\theta(y^-\mid x)}{\pi_{\mathrm{ref}}(y^-\mid x)}
\right]\right)
$$

这说明 Emu3 把 RLHF/DPO 这套语言模型后训练方法直接迁移到了视觉 token 序列上。它不需要对扩散采样过程设计奖励反传，而是把一张图对应的离散 token 序列当成“回答”，用偏好学习提高生成质量和条件对齐。

> 💡 关键：Emu3 的统一不是把所有模态都变成文本描述，而是把所有模态都变成可自回归预测的离散 token；文本、图像、视频之间的差异主要由 tokenizer、特殊边界 token 和损失权重承担。

#### 🧪 练习题
```yaml
question: "Emu3 能同时做视觉生成和视觉理解，最核心的机制是什么？"
options:
  - "用 CLIP 提取图像特征后交给 LLM 回答"
  - "把图像、视频和文本统一离散化为 token，并用同一个 Transformer 做 next-token prediction"
  - "用扩散模型生成图像，再用 OCR 模型读取图像"
  - "为图像生成和图像理解分别训练两个独立模型"
answer: 1
explain: "Emu3 的统一性来自离散 token 空间和标准自回归目标；不同任务通过序列排列、特殊 token 和后训练数据来区分。"
```

### Chameleon

```yaml
id: chameleon
num: 18
name: Chameleon
full_name: 变色龙模型 (Chameleon)
year: '2024'
org: Meta FAIR
parent: anygpt
paper_url: https://ai.meta.com/blog/meta-fair-research-new-release-june-2024/
project_url: ''
category: autoregressive
motivation: 早期融合自回归统一架构
```

#### 📝 一句话总结
Chameleon 提出早期融合的 token-based 混合模态基础模型，把文本、图像和代码从输入开始就放进同一个离散序列，由一个自回归 Transformer 同时完成理解、图像生成和交错图文生成。它的贡献不仅是“图像 token 化”，还包括让 7B/34B 级别早期融合模型稳定训练的架构与优化配方。

#### 🎯 核心要点
- **早期融合 mixed-modal LM**：所有模态在进入 Transformer 前就被表示为离散 token，同一套权重处理文本 token、图像 token 和代码 token
- **图像 tokenizer**：将 \(512\times512\) 图像编码为 1024 个离散 token，图像 codebook size 为 8192
- **统一 BPE 词表**：训练 65,536 大小的 SentencePiece BPE 词表，其中包含 8192 个图像 codebook token
- **大规模混合预训练**：训练数据覆盖 2.9T text-only tokens、1.4B text-image pairs 产生的 1.5T tokens、以及 400B interleaved text-image tokens
- **自回归统一目标**：任意文本、图像、交错文档都被看作序列，统一最大化下一个 token 的条件似然
- **稳定训练配方**：QK-Norm 控制 attention softmax 输入范数，norm reordering 限制 FFN 范数增长，z-loss 约束最终 softmax 的 partition function
- **混合模态推理工程**：生成文本时逐 token streaming，生成图像时按固定大小 token block 解码，并用 token mask 限制当前模态的可选词表

#### 🔬 深入细节
##### 框架总览

![Chameleon 早期融合混合模态架构](https://arxiv.org/html/2405.09818v1/x1.png)
*图：Chameleon 把图像和文本都表示为离散 token，在同一个自回归 Transformer 中进行混合模态预训练和交错图文生成。*

Chameleon 解决的是传统多模态系统“输入侧融合太晚、输出侧各自为政”的问题。Flamingo、LLaVA 等模型通常把图像编码成连续特征，再通过投影层接入 LLM；文本生成和图像生成也往往由不同模块负责。Chameleon 选择更激进的早期融合：图像在一开始就被量化成类似词的离散 token，Transformer 不再区分“视觉编码器特征”和“语言 token”，而是在同一个序列空间中学习跨模态依赖。

##### 核心流程伪代码

```python
# Chameleon mixed-modal 自回归训练流程
for document in mixed_modal_corpus:
    seq = []
    for segment in document:
        if segment.type in ["text", "code"]:
            seq.extend(bpe_tokenizer(segment.content))
        elif segment.type == "image":
            image_codes = image_tokenizer.encode(segment.image)  # 512x512 -> 1024 ids
            seq.extend(["<image_start>", *image_codes, "<image_end>"])

    logits = chameleon(seq[:-1])
    loss_ntp = cross_entropy(logits, seq[1:])

    # 稳定训练：z-loss 约束最终 softmax，QK-Norm 在 attention 内部控制范数
    z = logsumexp(logits, dim=-1)
    loss = loss_ntp + 1e-5 * mean(z ** 2)
    update(chameleon, loss)

# 交错生成时，模型可在文本 token 和图像 token block 之间切换
generated = autoregressive_decode(
    prompt_tokens,
    modality_masks={"text": text_vocab, "image": image_codebook},
)
```

##### 早期融合的本质是“同一序列，同一目标”

Chameleon 的训练目标可以写成标准语言模型负对数似然：

$$
\mathcal{L}_{\mathrm{AR}}
=-\sum_{t=1}^{T}\log p_\theta(s_t\mid s_{<t})
$$

不同之处在于 \(s_t\) 不再只来自文本词表，也可能来自图像 codebook。图像 tokenizer 将 \(512\times512\) 图像压缩为 1024 个 token，因此一次图像生成就是连续预测一个固定长度的图像 token block；图像理解则是先把图像 token 放进上下文，再预测后续文本 token。captioning、text-to-image、interleaved document generation 本质上只是同一个序列的不同排列。

这种设计让模型能生成真正交错的图文文档。例如回答中可以先写一段说明，再生成一张图，再继续解释下一张图。传统“LLM 调用外部图像生成器”的系统也能拼接出类似输出，但跨图像 token 与文本 token 的依赖并不在同一模型内部学习；Chameleon 则直接在 token 序列层面建模这些依赖。

##### 数据混合让模型同时保留语言能力和视觉生成能力

Chameleon 的预训练不是只用图文对。第一阶段包含大规模 text-only、text-image 和 text/image interleaved 数据：text-only 保持语言和代码能力，text-image pairs 支撑 captioning 与 text-to-image，interleaved web documents 则让模型学习长文档中的图文布局和跨段落依赖。对 text-to-image pair，论文还会把图像和文本顺序轮换，使同一类数据既能训练“看图说话”，也能训练“按文生图”。

如果只训练图文对，模型容易学成任务模型：输入 caption 输出图像，或输入图像输出 caption。Chameleon 的混合数据目标更接近“完整多模态文档建模”，这也是它和只接视觉编码器的 MLLM 的关键差别。

##### 稳定性是早期融合的主要技术难点

早期融合把不同熵、不同长度、不同分布的 token 放进同一个 softmax 系统，训练中会出现范数缓慢增长和后期 loss divergence。论文指出 softmax 的平移不变性会放大这个问题：

$$
\mathrm{softmax}(z)=\mathrm{softmax}(z+c)
$$

当所有模态共享参数时，不同模态可能通过增大激活或 logits 范数来“竞争”表示空间；在 bf16 有效表示范围之外，这会演化成不稳定训练。Chameleon 因此在 attention 内部使用 QK-Norm：

$$
\mathrm{Attention}(Q,K,V)
=\mathrm{softmax}\left(
\frac{\mathrm{LN}(Q)\mathrm{LN}(K)^\top}{\sqrt{d}}
\right)V
$$

QK-Norm 控制的是 attention softmax 的输入范数，但最终词表 softmax 仍可能发生 logit drift，所以还要加入 z-loss：

$$
Z=\sum_i e^{x_i},\quad
\mathcal{L}=\mathcal{L}_{\mathrm{AR}}+10^{-5}(\log Z)^2
$$

7B 模型还使用 dropout 辅助稳定，34B 模型则更依赖 norm reordering。34B 的 block 形式可概括为先执行 attention/FFN，再对分支输出做 normalization，从而限制 SwiGLU FFN 带来的范数增长：

$$
h=x+\mathrm{Norm}(\mathrm{Attention}(x)),\quad
y=h+\mathrm{Norm}(\mathrm{FFN}(h))
$$

##### 推理阶段要处理“变长文本”和“定长图像块”的冲突

Chameleon 是自回归模型，但文本和图像的解码形态不同。文本可以在任意位置停止，图像 token 通常对应固定大小的 block；生成文本时还要监控是否产生 image-start token，一旦进入图像生成区间，就需要 mask 掉非图像 token，只允许从图像 codebook 中采样。图像 block 结束后再切回文本词表。

这解释了 Chameleon 为什么需要专门的 mixed-modal inference pipeline。它不是简单地 `model.generate()` 到结束，而是每一步都要根据当前模态、边界 token 和词表 mask 控制解码。早期融合让模型能力统一，但工程上仍要尊重不同模态 detokenize 的结构差异。

> 💡 关键：Chameleon 证明了“从输入层就融合”的统一多模态 LM 可以规模化，但它也暴露了早期融合的核心代价：不同模态共享 softmax 和 Transformer 权重后，训练稳定性成为一等问题。

#### 🧪 练习题
```yaml
question: "Chameleon 中 QK-Norm 和 z-loss 的主要作用是什么？"
options:
  - "减少图像 tokenizer 的 codebook 大小"
  - "让图像 token 可以直接跳过 Transformer"
  - "缓解混合模态自回归训练中的范数增长和 softmax/logit drift"
  - "把自回归生成改成扩散生成"
answer: 2
explain: "早期融合会让不同模态共享 attention 和最终 softmax；QK-Norm 控制 attention 输入范数，z-loss 约束最终 softmax 的 partition function。"
```

### Show-o

```yaml
id: show-o
num: 19
name: Show-o
full_name: 展示-全模态 (Show-o)
year: '2024'
org: NUS
parent: chameleon
paper_url: https://arxiv.org/abs/2408.12528
project_url: ''
category: autoregressive
motivation: 自回归+离散扩散混合建模
```

#### 📝 一句话总结
Show-o 提出在一个 Transformer 内同时使用自回归建模和离散扩散建模：文本 token 继续按因果方式生成，图像 token 则通过 mask token prediction 以全注意力迭代去噪。它解决了 Chameleon 类纯自回归模型生成高分辨率图像需要大量逐 token 采样步的问题，同时保留 MLLM 的文本推理和视觉理解能力。

#### 🎯 核心要点
- **单 Transformer 双建模范式**：一个模型同时承担 multimodal understanding、text-to-image、inpainting/extrapolation 和 mixed-modality generation
- **离散图像 token 空间**：默认使用 MAGVIT-v2 风格 tokenizer，codebook size 为 8192，将 \(256\times256\) 图像编码为 \(16\times16\) 离散 token
- **预训练 LLM 初始化**：Show-o 基于 Phi-1.5 等预训练 LLM，扩展 8192 个图像 token embedding，并在 attention 层前加入 QK-Norm
- **统一 prompting 格式**：用 `[MMU]`、`[T2I]` 区分理解与生成任务，用 `[SOT]`/`[EOT]` 包裹文本，用 `[SOI]`/`[EOI]` 包裹图像 token
- **Omni-Attention**：文本 token 使用 causal attention，图像 token 使用 full attention；同一输入序列中根据任务格式自动混合两类注意力
- **双训练目标**：文本理解使用 next-token prediction，图像生成使用 mask token prediction，整体损失为 \(\mathcal{L}=\mathcal{L}_{\mathrm{MTP}}+\alpha\mathcal{L}_{\mathrm{NTP}}\)
- **迭代去 mask 推理**：生成图像时从全 `[MASK]` 图像 token 开始，多步预测并替换 mask token，天然支持局部 inpainting 和画布 extrapolation

#### 🔬 深入细节
##### 框架总览

![Show-o 统一理解与生成架构](https://arxiv.org/html/2408.12528v6/x2.png)
*图：Show-o 将输入统一 token 化并格式化成序列；文本部分用自回归因果注意力，图像部分用离散扩散式 full attention 进行 mask token prediction。*

Show-o 的核心问题意识来自 Chameleon：既然一个 Transformer 可以同时处理文本和图像 token，是否必须把图像也按严格自回归顺序一个 token 一个 token 生成？纯自回归图像生成在 \(16\times16\)、\(32\times32\) token 网格上需要数百到上千步采样，而且早期 token 错误会因因果顺序累积。Show-o 因此保留文本的自回归建模，但把图像生成改成离散扩散/MaskGIT 风格的并行去 mask。

##### 核心流程伪代码

```python
# Show-o 统一训练与生成流程
for example in multimodal_batch:
    text_tokens = text_tokenizer(example.text)
    image_tokens = image_tokenizer.encode(example.image)  # 256x256 -> 16x16 ids

    if example.task == "mmu":
        seq = ["[MMU]", "[SOI]", *image_tokens, "[EOI]",
               "[SOT]", *text_tokens, "[EOT]"]
        logits = show_o(seq, attention="omni")
        loss = next_token_loss(logits, target_text_tokens=text_tokens)

    elif example.task == "t2i":
        masked_image, mask_positions = random_mask(image_tokens, timestep=random_t())
        seq = ["[T2I]", "[SOT]", *text_tokens, "[EOT]",
               "[SOI]", *masked_image, "[EOI]"]
        logits = show_o(seq, attention="omni")
        loss = mask_token_loss(logits, targets=image_tokens, positions=mask_positions)

    update(show_o, loss)

# 图像推理：从全 mask 开始迭代预测
image_seq = ["[MASK]"] * num_image_tokens
for step in range(T):
    logits = show_o(["[T2I]", *prompt_tokens, "[SOI]", *image_seq, "[EOI]"])
    selected = choose_low_confidence_masks(image_seq, schedule=step)
    image_seq[selected] = sample_image_tokens(logits[selected], guidance_scale=w)

image = image_tokenizer.decode(image_seq)
```

##### 统一 prompting 把任务类型显式写进序列

Show-o 使用特殊 token 把不同任务都表示成结构化序列。多模态理解通常是：

$$
[\mathrm{MMU}]\,[\mathrm{SOI}]\,u_{1:M}\,[\mathrm{EOI}]\,[\mathrm{SOT}]\,v_{1:N}\,[\mathrm{EOT}]
$$

文本到图像生成则是：

$$
[\mathrm{T2I}]\,[\mathrm{SOT}]\,v_{1:N}\,[\mathrm{EOT}]\,[\mathrm{SOI}]\,u_{1:M}\,[\mathrm{EOI}]
$$

其中 \(u\) 是图像 token，\(v\) 是文本 token。这个格式的意义是把“当前是在回答问题还是生成图像”变成模型可见的 token 条件，而不是依赖外部路由器。对于 mixed-modality generation，Show-o 可以把文本描述和关键帧 token 交错排列，文本段按自回归预测，单帧内部的图像 token 按 mask prediction 生成。

##### Omni-Attention 同时容纳因果文本和全局图像

文本生成天然需要因果约束：第 \(i\) 个文本 token 只能看之前的文本 token 以及输入图像条件。图像生成则不同，一个待生成图像的 token 网格内部更适合双向交互，因为局部区域可以由全局布局共同决定。Show-o 的 Omni-Attention 因此按 token 类型和任务格式混合 mask：文本块使用 causal attention，图像块使用 full attention。

这种设计是 Show-o 区别于 Chameleon 的关键。Chameleon 对图像 token 也使用自回归顺序，而 Show-o 允许图像 token 之间在每一次 denoising step 中全连接通信。因此图像生成不再被固定 raster order 绑死，模型可以同时利用左上角、右下角、文本条件和未遮盖区域来恢复被 mask 的 token。

##### NTP 负责语言，MTP 负责视觉生成

在多模态理解中，Show-o 对文本答案使用标准 next-token prediction：

$$
\mathcal{L}_{\mathrm{NTP}}
=-\sum_i \log p_\theta(v_i\mid v_{<i},u_{1:M})
$$

在图像生成中，Show-o 随机把一部分图像 token 替换为 `[MASK]`，只在这些 mask 位置上预测原始 token：

$$
\mathcal{L}_{\mathrm{MTP}}
=-\sum_{j\in\mathcal{M}}\log p_\theta(u_j\mid u^*,v_{1:N})
$$

整体目标是：

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{MTP}}+\alpha\mathcal{L}_{\mathrm{NTP}}
$$

论文把这种 mask token prediction 解释为简化的 absorbing discrete diffusion：图像 token 在前向 corruption 中要么保持原值，要么变成 `[MASK]`；反向过程学习从被 mask 的序列恢复原始 token。相比连续扩散，它不预测高维噪声，而是在离散 codebook 上做分类；相比纯自回归，它可以并行修复多个图像位置。

##### 推理时的离散扩散让生成更适合图像编辑

文本到图像时，Show-o 用全 `[MASK]` 图像 token 初始化，然后在 \(T\) 个步骤中逐步替换 mask token。每一步都可以依据模型置信度选择哪些位置先确定，剩余低置信度位置继续保留为 mask。classifier-free guidance 通过以一定概率把条件文本替换为空文本训练得到，推理时可用条件/无条件 logits 差增强 prompt alignment。

这个机制天然支持 inpainting 和 extrapolation：inpainting 时保留未编辑区域的图像 token，只把待编辑区域置为 `[MASK]`；extrapolation 时把原图 token 放在已知区域，新扩展画布填 `[MASK]`。模型不需要额外训练一个修补网络，因为“局部 mask 恢复”本来就是它的视觉生成目标。

##### 混合模态生成把视频关键帧看成“时间上的自回归，帧内的扩散”

Show-o 的 mixed-modality generation 示例把视频拆成文本描述和关键帧序列。序列层面，下一段文本或下一帧依赖前面所有文本和关键帧，这是时间自回归；但对于某一帧内部，图像 token 是通过离散扩散式 mask prediction 生成的。可概括为：

$$
p(\text{sequence})
=\prod_k p(\text{text}_k,\text{frame}_k\mid \text{history}_{<k}),
\quad
p(\text{frame}_k)\ \text{由 MTP 迭代近似}
$$

这让 Show-o 介于 Chameleon 和扩散模型之间：它不像 Chameleon 那样对每个视觉 token 做长链式 AR，也不像传统扩散系统那样把理解模型和生成模型拆成两个网络，而是在同一 Transformer 内根据模态选择合适的建模假设。

> 💡 关键：Show-o 的“统一”不是强迫所有模态使用同一种生成顺序，而是在一个 Transformer 里共享 token、prompt 和参数，同时让文本走 causal AR、图像走 full-attention discrete diffusion。

#### 🧪 练习题
```yaml
question: "Show-o 相比 Chameleon 的关键方法差异是什么？"
options:
  - "Show-o 不再使用图像 token，只使用连续像素"
  - "Show-o 用两个完全独立的模型分别做理解和生成"
  - "Show-o 保留文本自回归建模，但用 mask token prediction/离散扩散生成图像 token"
  - "Show-o 只能做视觉问答，不能生成图像"
answer: 2
explain: "Show-o 的核心是混合建模：文本答案用 NTP，图像 token 用 MTP 和 full attention 迭代去 mask，从而减少纯自回归图像生成的采样瓶颈。"
```

### ImageBind

```yaml
id: imagebind
num: 20
name: ImageBind
full_name: 图像绑定模型 (ImageBind)
year: '2023'
org: Meta
parent: —
paper_url: https://ai.meta.com/blog/imagebind-six-modalities-binding-ai/
project_url: ''
category: encoder_llm_decoder
motivation: 六模态统一嵌入空间
```

#### 📝 一句话总结
ImageBind 提出用图像作为语义锚点，将图像/视频、文本、音频、深度、热成像和 IMU 六类模态绑定到同一个嵌入空间，解决多模态两两配对数据难以收集的问题。它的关键贡献是只依赖“图像-其他模态”的自然配对，就能涌现出未直接训练过的跨模态检索、零样本分类和嵌入组合能力。

#### 🎯 核心要点
- 覆盖 6 类模态：图像/视频、文本、音频、深度、热成像、IMU 传感器数据
- 以图像为中心模态，不要求音频-文本、深度-文本、IMU-文本等所有模态组合同时成对出现
- 使用大规模图文数据，以及视频-音频、图像-深度、图像-热成像、视频-IMU 等自然同步数据
- 每个模态使用独立 Transformer 编码器和模态专属线性投影头，输出同维度且归一化的嵌入
- 训练目标是图像锚定的对称 InfoNCE，对齐每个非视觉模态与图像嵌入
- 可初始化图像和文本编码器自 CLIP/OpenCLIP，把视觉-语言零样本能力扩展到非语言模态
- 涌现能力包括跨模态检索、模态嵌入算术、音频驱动图像生成、跨模态检测和少样本识别
- 评估覆盖 ImageNet-1K、Kinetics-400、NYU-D、ESC、LLVIP、Ego4D 等视觉和非视觉任务

#### 🔬 深入细节
##### 框架总览

![ImageBind 官方跨模态演示](https://user-images.githubusercontent.com/8495451/236859695-ffa13364-3e39-4d99-a8da-fbfab17f9a6b.gif)
*图：ImageBind 官方项目展示的跨模态检索与语义绑定效果；不同模态经过各自编码器后落入同一嵌入空间。*

ImageBind 的出发点是多模态联合数据的稀缺性。如果要求文本、图像、音频、深度、热成像、IMU 在同一个样本中全部共现，那么数据规模会非常有限；但图像天然可以和许多感知信号配对，例如网页图文、视频音频、RGB-D、热成像图像、带 IMU 的第一视角视频。ImageBind 把图像当作“中介节点”，分别学习 \((I,M)\) 的对齐关系，其中 \(M\) 是文本、音频、深度、热成像或 IMU。

每个模态都有自己的编码路径。图像/视频使用 ViT 类视觉编码器，文本沿用 CLIP 文本 Transformer，音频先转成 2 秒、128 mel-bin 的谱图再作为二维信号编码，深度和热成像被当作单通道图像处理，IMU 的加速度计和陀螺仪序列先经 1D 卷积投影再输入 Transformer。所有编码器后接线性投影头，得到相同维度的 L2 归一化向量：

$$
q_i=\operatorname{norm}(P_I(E_I(I_i))),\quad
k_i^{(m)}=\operatorname{norm}(P_m(E_m(M_i)))
$$

其中 \(E_I,E_m\) 是图像和第 \(m\) 个模态的编码器，\(P_I,P_m\) 是线性投影头。归一化后，点积就等价于余弦相似度，便于跨模态检索和对比学习。

核心训练目标是图像到模态的 InfoNCE 损失。对一批图像 \(I_i\) 和对应模态样本 \(M_i\)，正样本是同一索引的配对，batch 内其他样本作为负样本：

$$
L_{I,M}=-\log
\frac{\exp(q_i^\top k_i/\tau)}
{\exp(q_i^\top k_i/\tau)+\sum_{j\neq i}\exp(q_i^\top k_j/\tau)}
$$

实际训练采用对称形式：

$$
L=L_{I,M}+L_{M,I}
$$

这个损失只显式拉近“图像-某模态”的距离，但因为所有模态都被压到同一个图像语义空间，未见过的模态对也会产生间接对齐。例如训练中没有直接使用音频-文本样本，但音频靠近对应图像，文本也靠近对应图像，于是音频嵌入可以直接和文本提示做零样本分类。

```python
# ImageBind 图像锚定对比学习伪代码
modalities = ["text", "audio", "depth", "thermal", "imu"]

for step in range(num_steps):
    m = sample(modalities)
    image_or_video, paired_m = load_image_paired_batch(m)

    q = image_encoder(image_or_video)
    q = normalize(image_projection(q))

    k = modality_encoder[m](paired_m)
    k = normalize(modality_projection[m](k))

    logits = q @ k.T / temperature
    labels = arange(batch_size)
    loss_i2m = cross_entropy(logits, labels)
    loss_m2i = cross_entropy(logits.T, labels)
    loss = loss_i2m + loss_m2i

    update(encoders_and_projection_heads, loss)

# 推理：任意模态都编码为同空间向量，直接用点积检索或分类
query = normalize(encoder["audio"](audio_clip))
class_text = normalize(encoder["text"](prompt_templates))
prediction = argmax(query @ class_text.T)
```

ImageBind 与 CLIP 的区别在于锚点范围更广。CLIP 只训练图像和文本之间的双塔对齐，因此非文本模态要想获得语言零样本能力，通常需要专门的音频-文本、点云-文本或视频-文本数据。ImageBind 保留 CLIP 式的对比学习和文本提示机制，但把训练数据改成多组“图像配对数据”，从而把语言能力通过图像空间迁移给音频、深度、热成像和 IMU。

> 💡 关键：ImageBind 的“统一”不是把所有模态 token 混到一个 Transformer 里联合建模，而是把不同编码器的输出投影到同一个几何空间。它更像一个跨模态基础嵌入层，可被下游检索、分类、检测或生成模型复用。

在应用上，零样本分类可以写成：

$$
\hat{y}=\arg\max_{c\in\mathcal{C}}
\operatorname{sim}\left(e_M(x), e_T(\text{prompt}(c))\right)
$$

其中 \(e_M(x)\) 是任意模态输入的嵌入，\(e_T\) 是文本提示嵌入。跨模态检索同理，只需要把候选库中的图像、文本、音频或深度样本预先编码成向量，并按余弦相似度排序。论文还展示了嵌入算术，例如把图像语义和音频语义相加后检索新图像，这说明共享空间不只是分类头前的特征，而具备一定可组合语义结构。

#### 🧪 练习题
```yaml
question: "ImageBind 为什么能在没有音频-文本配对训练的情况下做音频零样本分类？"
options:
  - "因为它把音频先转写成文本再调用文本分类器"
  - "因为音频和文本都通过图像锚点被间接对齐到同一个嵌入空间"
  - "因为它为每个音频类别训练了独立监督分类头"
  - "因为它只在推理时使用图像，不使用音频嵌入"
answer: 1
explain: "ImageBind 显式训练的是图像-音频和图像-文本等图像配对关系，所有模态共享同一归一化嵌入空间后，音频可以直接和文本提示比较相似度。"
```

### Meta-Transformer

```yaml
id: meta-transformer
num: 21
name: Meta-Transformer
full_name: 元Transformer (Meta-Transformer)
year: '2023'
org: 上海AI Lab
parent: imagebind
paper_url: https://arxiv.org/abs/2307.10802
project_url: ''
category: encoder_llm_decoder
motivation: 12种模态单一编码器处理
```

#### 📝 一句话总结
Meta-Transformer 提出“模态专属 tokenizer + 冻结共享 Transformer 编码器 + 任务头”的统一框架，让同一个编码器参数处理 12 种模态，解决多模态系统依赖大量模态专属 backbone 和成对预训练数据的问题。

#### 🎯 核心要点
- 覆盖 12 种模态：自然语言、图像、点云、音频、视频、红外、高光谱、X-Ray、IMU、表格、图、时间序列
- 核心结构包含三部分：data-to-sequence tokenizer、modality-shared encoder、task-specific head
- 不依赖成对多模态数据，每个模态可在自己的任务数据上训练轻量 tokenizer 和任务头
- 将不同原始输入统一变成 \(n\times D\) token 序列，再交给同一个 Transformer 编码器
- 共享编码器采用 ViT/CLIP 风格预训练权重，并在主要设置中冻结以验证跨模态共享参数空间
- tokenization 针对模态定制：文本 WordPiece、图像 patch、点云 FPS/KNN 分组、音频谱图 patch、视频 3D 卷积等
- 下游任务用任务专属 MLP、检测头、分割头或预测头适配，不要求共享输出空间
- 实验覆盖 GLUE、ImageNet、COCO、ADE20K、ModelNet40、Speech Commands、UCF101、Ego4D、PCQM4M-LSC 等

#### 🔬 深入细节
##### 框架总览

![Meta-Transformer 框架图](https://ar5iv.labs.arxiv.org/html/2307.10802/assets/x28.png)
*图：Meta-Transformer 将不同模态先转成序列 token，再由同一个冻结 Transformer 编码器抽取特征，最后接任务专属 head。*

![Meta-Transformer 数据到序列 tokenization](https://ar5iv.labs.arxiv.org/html/2307.10802/assets/x29.png)
*图：论文提出的 meta-tokenization 思路，用 grouping、convolution、transformation 把文本、图像、点云、音频等输入映射到共享 token 空间。*

Meta-Transformer 的核心判断是：Transformer 编码器本质上处理的是 token 序列，而不是天然绑定某一种输入格式。不同模态之间最大的差异不一定在编码器主体，而在“如何把原始数据变成合适的 token”。因此论文把统一性放在 backbone 参数上，把模态差异压到 tokenizer 和任务头里。

论文形式化地把多模态统一目标写成寻找一个共享有效参数 \(\theta^*\)，它位于多个模态可用参数空间的交集中：

$$
\theta^* \in \Theta_1\cap\Theta_2\cap\cdots\cap\Theta_n,\quad
\Theta_1\cap\Theta_2\cap\cdots\cap\Theta_n\neq\varnothing
$$

多模态预测则可抽象为：

$$
\hat{y}=\mathcal{F}(\boldsymbol{x};\theta^*),\quad
\theta^*=\arg\min_{\theta}\mathcal{L}(\hat{y},y)
$$

这里的 \(\boldsymbol{x}\) 可以来自任何模态。和 ImageBind 的“共享嵌入空间”不同，Meta-Transformer 更强调“共享编码器参数”：不同模态不一定要输出可直接互检索的向量，而是要证明同一个 Transformer backbone 能作为通用感知器。

```python
# Meta-Transformer 训练/适配流程伪代码
for task in multimodal_tasks:
    tokenizer = tokenizer_by_modality[task.modality]
    head = task_specific_head[task.name]

    for batch in task_loader(task):
        raw_x, y = batch
        tokens = tokenizer(raw_x)                  # raw data -> n x D sequence
        tokens = add_cls_and_position(tokens)

        with freeze(shared_transformer_encoder):
            z = shared_transformer_encoder(tokens)

        summary = layer_norm(z.cls_token)
        y_hat = head(summary)
        loss = task_loss(task, y_hat, y)

        update(tokenizer, head, loss)              # frozen setting

# 可选：在高性能设置中继续 fine-tune encoder
```

tokenizer 是 Meta-Transformer 的主要工程载体。图像输入 \(\boldsymbol{x}_I\in\mathbb{R}^{C\times H\times W}\) 会被切成 patch，并投影到 \(D\) 维 token：

$$
\boldsymbol{x}_I \rightarrow
\boldsymbol{x}_I'\in\mathbb{R}^{N_s\times(S^2C)}
\rightarrow
\boldsymbol{x}_I''\in\mathbb{R}^{N_s\times D}
$$

点云则先用 FPS 采样骨架点，再用 KNN 聚合局部几何结构，形成更短的结构 token 序列：

$$
\boldsymbol{x}_P\in\mathbb{R}^{P\times(3+c)}
\rightarrow
\boldsymbol{x}_P'\in\mathbb{R}^{\frac{P}{4}\times\frac{D}{2}}
\rightarrow
\boldsymbol{x}_P''\in\mathbb{R}^{\frac{P}{16}\times D}
$$

音频先变成 log Mel filterbank，再在时间和频率维度切重叠 patch：

$$
\boldsymbol{x}_A\in\mathbb{R}^{T\times F}
\rightarrow
\boldsymbol{x}_A'\in\mathbb{R}^{N_s\times S\times S}
\rightarrow
\boldsymbol{x}_A''\in\mathbb{R}^{(N_sD/S^2)\times D}
$$

共享编码器部分基本沿用标准 ViT。加入 CLS token 和 1D 位置嵌入后，序列经过 \(L\) 层 MSA 与 MLP：

$$
\boldsymbol{z}_0=[\boldsymbol{x}_{CLS};\boldsymbol{E}_{x_1};\cdots;\boldsymbol{E}_{x_n}]+\boldsymbol{E}_{pos}
$$

$$
\boldsymbol{z}'_\ell=\operatorname{MSA}(\operatorname{LN}(\boldsymbol{z}_{\ell-1}))+\boldsymbol{z}_{\ell-1},\quad
\boldsymbol{z}_\ell=\operatorname{MLP}(\operatorname{LN}(\boldsymbol{z}'_\ell))+\boldsymbol{z}'_\ell
$$

最终用 \(\operatorname{LN}(\boldsymbol{z}_L^0)\) 作为样本级表示，再交给任务头。任务头 \(h(\cdot)\) 可以是分类 MLP，也可以接入检测、分割、预测等任务结构：

$$
\hat{\boldsymbol{y}}=\mathcal{F}(\boldsymbol{x};\theta^*)=h\circ g\circ f(\boldsymbol{x})
$$

其中 \(f\) 是 tokenizer，\(g\) 是共享 Transformer 编码器，\(h\) 是任务头。这个拆分的好处是把“模态格式适配”和“任务输出适配”从共享 backbone 中剥离出来，避免为每个模态复制一套主干网络。

与 ImageBind 相比，Meta-Transformer 不以跨模态检索为主要目标，也不要求把文本、音频、图像全部拉到一个对比学习空间。它更像一个统一感知框架：只要能把输入变成 token 序列，同一个冻结编码器就可以抽取可迁移特征。代价是模态间语义对齐不如 ImageBind/LanguageBind 那样天然适合零样本跨模态匹配，但它更直接地回答了“单一编码器能否处理许多模态”这个架构问题。

#### 🧪 练习题
```yaml
question: "Meta-Transformer 实现 12 种模态单一编码器处理的关键是什么？"
options:
  - "把所有模态都转写成自然语言文本"
  - "为每个模态训练完全独立的 Transformer backbone"
  - "先用模态专属 tokenizer 映射到共享 token 序列，再使用同一个 Transformer 编码器"
  - "只训练图像和文本两个模态，其他模态在推理时忽略"
answer: 2
explain: "Meta-Transformer 的统一性来自 data-to-sequence tokenization 与冻结共享编码器；模态差异主要由 tokenizer 和任务头吸收。"
```

### LanguageBind

```yaml
id: languagebind
num: 22
name: LanguageBind
full_name: 语言绑定模型 (LanguageBind)
year: '2024'
org: ICLR
parent: imagebind
paper_url: https://arxiv.org/abs/2310.01852
project_url: ''
category: encoder_llm_decoder
motivation: 语言中心N模态语义对齐
```

#### 📝 一句话总结
LanguageBind 提出以语言而不是图像作为绑定中心，将视频、红外、深度、音频等模态直接对齐到语言特征空间，解决 ImageBind 式图像中介在语言相关下游任务中间接对齐不足的问题。

#### 🎯 核心要点
- 将 video-language 预训练扩展到 \(N\geq3\) 的多模态语义对齐
- 以冻结的语言编码器作为统一语义中心，其他模态编码器通过对比学习直接向语言空间靠拢
- 多模态编码器采用 OpenCLIP-Large 初始化的 ViT-L/14，24 层、1024 维、patch size 14
- 深度和红外复制为 3 通道以适配 RGB 初始化；音频转为 10 秒、128 mel-bin 谱图并重复/填充
- 采用 patch masking 降低编码器处理 token 的成本
- 使用 LoRA 微调非语言模态编码器，在保留 OpenCLIP 先验的同时降低训练显存和时间
- 训练目标是模态到文本 \(L_{M2T}\) 与文本到模态 \(L_{T2M}\) 的双向对比损失
- 构建 VIDAL-10M：3M video-language、3M infrared-language、3M depth-language、1M audio-language 对
- 文本侧采用 multi-view 描述，包括标题、hashtags、关键帧 caption、视频 caption 和 ChatGPT 增强 caption
- 在视频、音频、深度、红外共 15 个 benchmark 上验证零样本检索、分类和间接跨模态对齐

#### 🔬 深入细节
##### 框架总览

![LanguageBind 与 ImageBind 对比](https://arxiv.org/html/2310.01852v7/x1.png)
*图：ImageBind 依赖图像作为中介，而 LanguageBind 直接把非语言模态对齐到语言空间。*

![LanguageBind 方法总览](https://arxiv.org/html/2310.01852v7/x3.png)
*图：LanguageBind 冻结语言编码器，用 LoRA 调整多模态编码器，并通过模态-语言对比学习完成语义绑定。*

LanguageBind 对 ImageBind 的主要修正是中心模态的选择。实际下游任务中，零样本分类和检索往往最终都要与文本提示或文本描述比较；如果先把音频/深度/红外对齐到图像，再通过图像间接对齐到语言，语义会经过一个中介空间，可能损失与类别词、描述句相关的细粒度信息。LanguageBind 因此把语言直接作为 bind，把每个新模态都拉向冻结语言编码器所在的语义空间。

多模态编码器沿用视觉 Transformer 的强初始化。除语言外，视频、深度、红外和音频都初始化自 OpenCLIP-Large 的 ViT-L/14。深度和红外被复制到 3 个通道，音频先变成谱图；短于 10 秒的音频会重复并补零，长音频则从前、中、后三段各采样 10 秒片段。这样做的工程意图是复用 OpenCLIP 在视觉 patch 上学到的结构先验，而不是从零训练每个模态。

为了减少 token 成本，LanguageBind 使用 patch masking。给定模态输入 \(\boldsymbol{m}\in\mathbb{R}^{H\times W\times C}\)，先切成 patch 序列 \(\boldsymbol{m}'\in\mathbb{R}^{N\times C}\)，其中：

$$
N=\frac{H\times W}{S^2}
$$

只保留 encoder mask \(\mathbb{M}_e\) 中的可见 token，并加上位置向量：

$$
\boldsymbol{x}=\{\boldsymbol{m}'_i+\boldsymbol{P}_i\}_{i\in\mathbb{M}_e}
$$

这里 \(\boldsymbol{P}_i\) 是可学习位置 token。这个机制类似 MAE 的 encoder-side masking，重点不是重建被 mask 的 patch，而是减少对齐训练时进入编码器的 token 数。

```python
# LanguageBind 语言中心对齐训练伪代码
for modality in ["video", "infrared", "depth", "audio"]:
    encoder_m = init_from_openclip_vit_l14(modality)
    attach_lora(encoder_m)

for batch in VIDAL_10M:
    m, text = batch.modality_data, batch.multi_view_text

    tokens_m = preprocess_to_patches(m)             # video/IR/depth/audio -> patch tokens
    visible = apply_encoder_mask(tokens_m)
    z_m = normalize(encoder_m(visible, lora=True))

    with freeze(language_encoder):
        z_t = normalize(language_encoder(bpe(text)))

    logits = z_m @ z_t.T / temperature
    labels = arange(batch_size)
    loss_m2t = cross_entropy(logits, labels)
    loss_t2m = cross_entropy(logits.T, labels)
    loss = loss_m2t + loss_t2m

    update(lora_parameters_and_projection, loss)

# 推理：任意模态向量直接和文本 prompt 或文本库比较
score = normalize(encoder_m(query)) @ normalize(language_encoder(prompts)).T
```

LoRA 是 LanguageBind 训练效率的关键。对编码器中的权重矩阵 \(W_0\in\mathbb{R}^{d\times k}\)，原权重保持冻结，只学习低秩增量 \(BA\)：

$$
h(\boldsymbol{x})=W_0\boldsymbol{x}+BA\boldsymbol{x},\quad
B\in\mathbb{R}^{d\times r},\ A\in\mathbb{R}^{r\times k}
$$

这样每个模态只需要少量可训练参数就能适配新分布。论文的消融也强调，相比从零训练或全量微调，LoRA 在时间和显存上更便宜，并且能更好保留 OpenCLIP 的预训练知识。

对齐损失沿用 CLIP 式双向对比学习。设 \(x_i\) 是第 \(i\) 个模态样本特征，\(y_i\) 是匹配文本特征，二者均归一化，batch size 为 \(K\)，温度为 \(\tau\)：

$$
L_{M2T}=-\frac{1}{K}\sum_{i=1}^{K}
\log\frac{\exp(x_i^\top y_i/\tau)}
{\sum_{j=1}^{K}\exp(x_i^\top y_j/\tau)}
$$

$$
L_{T2M}=-\frac{1}{K}\sum_{i=1}^{K}
\log\frac{\exp(y_i^\top x_i/\tau)}
{\sum_{j=1}^{K}\exp(y_i^\top x_j/\tau)}
$$

总损失通常取 \(L=L_{M2T}+L_{T2M}\)。相比 ImageBind 的图像锚定损失，这里正样本直接是“模态-文本”配对，因此文本检索、文本提示零样本分类和语言条件跨模态任务更直接。

VIDAL-10M 是 LanguageBind 能工作的另一个核心组件。它不是简单收集长视频切片，而偏向短视频平台中语义完整的短视频，并为每个样本组织多视角文本：原始标题和 hashtags 捕捉主题，OFA 生成关键帧 caption 补充空间信息，mPLUG-Owl 生成视频 caption 补充整体时序语义，最后用 ChatGPT 做文本增强。深度与红外数据则通过生成/增强流程补齐，使 video、infrared、depth、audio 都有直接对齐到 language 的训练对。

> 💡 关键：LanguageBind 的扩展路径是“新增模态 -> 转 token -> 初始化 OpenCLIP 编码器 -> LoRA 对齐语言空间”。只要能构造模态-文本对，理论上就能继续加入更多模态，而不必重新设计一个图像中介系统。

#### 🧪 练习题
```yaml
question: "LanguageBind 相比 ImageBind 的核心变化是什么？"
options:
  - "取消对比学习，改成纯自回归生成"
  - "以语言作为中心模态，直接把其他模态对齐到语言空间"
  - "只支持视频和文本两个模态，不支持音频、红外和深度"
  - "完全从零训练所有编码器，避免使用 OpenCLIP 初始化"
answer: 1
explain: "LanguageBind 冻结语言编码器，并用模态-文本双向对比损失训练其他模态编码器，避免通过图像间接获得语言对齐。"
```

### Janus-Pro

```yaml
id: janus-pro
num: 23
name: Janus-Pro
full_name: Janus专业版 (Janus-Pro)
year: '2025'
org: DeepSeek
parent: chameleon
paper_url: https://arxiv.org/abs/2501.17833
project_url: ''
category: frontier_2026
motivation: 解耦视觉编码解决表征冲突
```

#### 📝 一句话总结
Janus-Pro 在 Janus 的解耦视觉编码框架上扩展训练策略、数据规模和模型规模，用独立的理解编码器与生成编码器解决同一视觉表征同时服务理解和图像生成时的冲突问题。

#### 🎯 核心要点
- 解耦视觉编码：理解路径使用 SigLIP 语义特征，生成路径使用 VQ tokenizer 离散图像码。
- 统一自回归 Transformer：文本、图像理解特征和图像生成码嵌入被映射到同一 LLM 输入空间。
- 双预测头：LLM 原生文本 head 负责文本 token，随机初始化 image head 负责图像离散 token。
- 三阶段训练优化：Stage I 加长 adaptor 和 image head 训练，Stage II 去掉 ImageNet 类名生成任务并聚焦密集文本到图像数据，Stage III 将多模态、纯文本、图像生成比例调为 5:1:4。
- 数据扩展：理解侧增加约 9000 万样本，生成侧加入约 7200 万 synthetic aesthetic data，使真实与合成图像生成数据约为 1:1。
- 模型扩展：从 Janus 的小规模验证扩展到 Janus-Pro-1B 和 Janus-Pro-7B，7B 版本在 MMBench、GenEval 等指标上显著提升。

#### 🔬 深入细节
![Janus-Pro 架构图](https://arxiv.org/html/2501.17811v1/x5.png)
*图：DeepSeek Janus-Pro 的整体结构。公开输入链接 `2501.17833` 实际指向另一篇论文，Janus-Pro 技术报告对应公开 arXiv 页面 `2501.17811`，这里使用该报告中的架构图。*

```python
# Janus-Pro 统一理解与生成的核心流程
def janus_pro_forward(task, text_tokens, image=None, target_image_codes=None):
    seq = embed_text(text_tokens)

    if task == "understanding":
        siglip_grid = siglip_encoder(image)              # semantic visual features
        image_feats = flatten_2d_to_1d(siglip_grid)
        seq += understanding_adaptor(image_feats)        # map to LLM space
        logits_text = llm(seq).text_head()
        return cross_entropy(logits_text, target_text_tokens)

    if task == "text_to_image":
        # teacher forcing during training; autoregressive sampling during inference
        code_embeds = vq_code_embedding(target_image_codes)
        seq += generation_adaptor(code_embeds[:-1])
        hidden = llm(seq)
        logits_image = image_prediction_head(hidden)
        return cross_entropy(logits_image, target_image_codes)

    if task == "mixed_sft":
        return loss_understanding + loss_text + loss_image_generation
```

Janus-Pro 的直接动机来自统一多模态模型中的表征冲突。图像理解希望视觉编码器输出高层语义、对象关系和场景知识；图像生成则希望 token 保留可还原的局部纹理、布局和像素依赖。如果像 Chameleon 式统一模型那样让同一套视觉离散表示同时承担两类任务，理解任务容易被低层重建需求拖累，生成任务又可能因语义压缩丢失视觉细节。Janus-Pro 的回答是只统一后端 Transformer，不强行统一前端视觉编码。

理解分支可以写成：

$$
H^{u}=A_u\left(\mathrm{Flatten}(E_{\mathrm{SigLIP}}(I))\right),
\qquad
p_{\theta}(y_{1:T}\mid x, I)=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t}, x, H^{u})
$$

其中 \(E_{\mathrm{SigLIP}}\) 把图像 \(I\) 编成二维语义网格，\(A_u\) 是两层 MLP adaptor，将视觉特征映射到 LLM embedding 空间。这样理解任务看到的是适合语义判别的连续特征，而不是必须服务像素重建的 VQ 编码。

生成分支则先把目标图像离散化：

$$
z_{1:N}=\mathrm{VQEnc}(I),\qquad
H^{g}=A_g(\mathrm{Embed}_{vq}(z_{1:N})),\qquad
p_{\theta}(z_{1:N}\mid x)=\prod_{i=1}^{N}p_{\theta}(z_i\mid z_{<i}, x)
$$

训练时使用 teacher forcing 预测下一个图像 code，推理时根据文本 prompt 自回归采样 \(z_i\)，再经 VQ decoder 还原图像。这里的关键不是把图像生成改成扩散模型，而是把图像 token 当作 LLM 序列的一部分，让统一 Transformer 学习文本和视觉离散码之间的条件分布。

总损失可抽象为多任务交叉熵：

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{text}}
\lambda_u\mathcal{L}_{\mathrm{understanding}}
\lambda_g\mathcal{L}_{\mathrm{image}}
=-\sum_t\log p_{\theta}(y_t)-\lambda_g\sum_i\log p_{\theta}(z_i)
$$

Janus-Pro 相比 Janus 的主要增量在训练配方。原 Janus 在 Stage II 将大量文本到图像步数用于 ImageNet 类名生成，DeepSeek 发现这对密集描述图像生成不够高效。Janus-Pro 把像素依赖学习前移到更长的 Stage I，让冻结 LLM 的情况下 adaptor 和 image head 先学会基础类别图像生成；Stage II 直接使用正常文本到图像数据，减少算力浪费；Stage III 再降低图像生成数据占比，避免生成目标过度挤压多模态理解能力。

数据和模型扩展补齐了 Janus 的另一个短板。理解侧加入文档、图表、表格、对话和中文数据，提升模型对真实多模态任务的覆盖；生成侧加入 synthetic aesthetic data，缓解真实网页图文对噪声大、审美质量不稳定的问题。由于前端已经解耦，扩到 7B 后理解和生成损失都更快收敛，说明这种设计不是只适合小模型的技巧，而是可以随 LLM 容量增长继续受益。

> 💡 关键：Janus-Pro 的“统一”发生在自回归 Transformer 层，“解耦”发生在视觉输入层。它避免了把语义理解和像素生成硬塞进同一视觉 token 空间。

#### 🧪 练习题
```yaml
question: "Janus-Pro 为什么要为图像理解和图像生成使用不同的视觉编码路径？"
options:
  - "为了让图像生成完全依赖扩散模型"
  - "因为理解需要语义特征，生成需要可还原的离散视觉码，两者共享编码会产生表征冲突"
  - "为了取消自回归 Transformer 中的文本 token"
  - "因为 SigLIP 只能处理文本，不能处理图像"
answer: 1
explain: "Janus-Pro 的核心设计是解耦视觉编码，理解路径使用 SigLIP 语义特征，生成路径使用 VQ 离散码，再交给统一自回归 Transformer。"
```

### MiniCPM-o 4.5

```yaml
id: minicpm-o
num: 24
name: MiniCPM-o 4.5
full_name: MiniCPM全模态4.5版 (MiniCPM-o 4.5)
year: '2026'
org: OpenBMB
parent: gpt-4o
paper_url: https://minicpm.vercel.app/blog/minicpm-o-2-6-en
project_url: ''
category: frontier_2026
motivation: 全双工实时交互边端模型
```

#### 📝 一句话总结
MiniCPM-o 4.5 提出了面向端侧部署的 9B 全模态全双工模型，用 Omni-Flow 将实时视觉、实时音频和助手输出放到同一时间轴上，解决传统 turn-based 多模态助手“先听看、再回答”的阻塞式交互问题。

#### 🎯 核心要点
- 端到端 omni-modal 架构：流式视觉编码器、流式音频编码器、Qwen3-8B LLM backbone、轻量 speech token decoder 和 streaming flow-matching waveform decoder。
- Omni-Flow：把 env-visual、env-audio、out-stream 三条流按共享时间轴切块并序列化，支持边看边听边说。
- Listen-Speak 控制：模型先判断当前时间窗是否需要输出，再生成文本或语音内容，减少对外部 VAD 的依赖。
- 高压缩输入：LLaVA-UHD 图像切片加 SigLIP ViT，每 slice 从 1024 token 压缩到 64 token；Whisper Medium 音频特征从 50 token/s 压缩到 10 token/s。
- 轻量语音生成：LLM 只生成 3-4 token/s 的文本和隐藏状态，0.3B speech decoder 生成约 25 token/s 的 S3 speech token。
- TAIL 对齐：Time-Aligned Interleaving 让每个时间窗生成的文本与可播放语音时长匹配，避免全双工场景中输出滞后于环境。
- 训练流程：speech pretraining、joint pretraining、joint SFT、RL，再配合 smooth length reward 和 RLAIF-V 抑制幻觉。

#### 🔬 深入细节
![MiniCPM-o 4.5 端到端全模态架构](https://arxiv.org/html/2604.27393v1/x6.png)
*图：MiniCPM-o 4.5 的端到端 omni-modal 架构。输入元信息中的链接是 MiniCPM-o 2.6 博客，4.5 的公开技术报告对应 arXiv `2604.27393`。*

```python
# Omni-Flow 全双工推理的抽象流程
state = []

for k, window in enumerate(stream(time_chunk=delta)):
    visual_tokens = visual_encoder.encode(window.video_frames)   # optional
    audio_tokens = audio_encoder.encode(window.audio_samples)    # optional

    group = make_time_aligned_group(
        env_visual=visual_tokens,
        env_audio=audio_tokens,
        boundary_token="<chunk>",
    )
    state.extend(group)

    control = llm.generate_control(state)  # listen or speak
    if control == "listen":
        state.append("[listen]")
        continue

    text_tokens, hidden_states = llm.stream_text_and_hidden(state)
    speech_tokens = speech_decoder.interleave_and_decode(
        text_tokens=text_tokens,
        llm_hidden=hidden_states,
        target_duration=delta,             # TAIL keeps speech timely
    )
    waveform = flow_matching_decoder.stream(speech_tokens)
    play(waveform)
    state.extend(text_tokens + speech_tokens)
```

MiniCPM-o 4.5 的核心不是简单把图像、音频、文本都接到 LLM，而是改变交互序列的定义。传统语音或视频助手通常按 turn 运行：

$$
\mathrm{Observe}(V_{1:T}, A_{1:T}) \rightarrow \mathrm{Think} \rightarrow \mathrm{Speak}(Y_{1:M})
$$

这个流程在模型说话期间通常不能吸收新的视觉和音频输入，因此用户打断、场景变化和主动提醒都要依赖外部工程模块。Omni-Flow 把连续时间拆成长度为 \(\Delta\) 的小窗，在第 \(k\) 个时间窗中同时接收环境 token 并决定是否输出：

$$
G_k=[B_k, V_k, A_k, C_k, O_k],\qquad
S=\mathrm{Concat}(G_1,G_2,\ldots,G_K)
$$

其中 \(V_k\) 是当前窗口视觉 token，\(A_k\) 是音频 token，\(C_k\in\{\mathrm{listen},\mathrm{speak}\}\) 是控制 token，\(O_k\) 是输出 token。因果 LLM 看到的是标准序列 \(S\)，但序列内部保留了时间窗结构，所以每次输出都能条件于最新到达的输入。

端侧可跑的关键在于 token 预算。视觉侧采用 LLaVA-UHD 切片策略，每个切片先由 SigLIP ViT 编成 1024 token，再由 resampler 压成 64 token，形成 16 倍压缩；全双工流式模式最高使用 448x448，非流式高分辨率模式可到 2240x2240。音频侧用 Whisper Medium encoder 以 chunk 方式输出 50 feature token/s，再用两层 MLP 做 5 倍时间压缩，进入 LLM 时约 10 audio token/s。这样 Qwen3-8B backbone 的上下文主要用于理解和文本决策，而不是被原始音视频帧率耗尽。

语音生成被拆成“LLM 决策”和“轻量 decoder 发声”。LLM backbone 只按人类说话速度生成文本 token，并把隐藏状态传给 speech token decoder：

$$
h_t=\mathrm{LLM}_{\theta}(S_{\le t}),\qquad
r_t=W_h h_t + e_{\mathrm{text}}(y_t)
$$

$$
p_{\phi}(q_{t,1:m}\mid r_{\le t}, q_{<t})
=\prod_{j=1}^{m}p_{\phi}(q_{t,j}\mid r_{\le t}, q_{<t}, q_{t,<j})
$$

其中 \(q\) 是 S3 speech token。生成的 speech token 再由 streaming flow-matching decoder 合成为 waveform。这个设计避免让 8B LLM 直接承担 25 token/s 的语音码生成压力，也降低语音生成对语言能力的干扰。

全双工语音还需要解决“文本生成进度”和“音频播放进度”不一致。TAIL 可以抽象为在每个时间窗选择文本前缀 \(Y_k\)，使其预计播放时长贴近窗口长度：

$$
Y_k=\arg\min_{Y}\left|\sum_{y_i\in Y}d(y_i)-\Delta\right|
$$

这里 \(d(y_i)\) 表示文本 token 对应的预估语音时长。若文本领先太多，助手会继续播放已经过时的内容；若语音领先太多，则容易产生断裂和重复。TAIL 的作用是把文字和语音按时间窗自适应交错，让输出流始终跟随最新环境上下文。

训练上，MiniCPM-o 4.5 先做 speech pretraining，让语音 decoder 具备稳定发声能力；再做 joint pretraining，把视觉、音频、文本和语音输出联合起来；随后用 joint SFT 学习全双工指令、主动提醒和多模态对话；最后通过强化学习改进回答质量、长度偏好和视觉一致性。其 RL 阶段使用 smooth length reward 抑制“为了短而短”的回答，同时使用 RLAIF-V 缓解视觉幻觉，并把图文幻觉抑制迁移到流式 omni 场景。

> 💡 关键：MiniCPM-o 4.5 的 full-duplex 能力来自序列建模方式的改变。它把“是否说、说什么、什么时候说”都放进模型时间序列中学习，而不是只靠外部对话管理器切换输入和输出。

#### 🧪 练习题
```yaml
question: "MiniCPM-o 4.5 中 Omni-Flow 的主要作用是什么？"
options:
  - "把图像生成改为扩散模型"
  - "把环境视觉、环境音频和助手输出按共享时间轴序列化，使模型能边感知边输出"
  - "只压缩模型权重，与交互模式无关"
  - "让 LLM 直接以 25 token/s 生成所有语音码"
answer: 1
explain: "Omni-Flow 将输入输出组织成时间对齐的连续序列，模型在每个时间窗吸收新输入并决定 listen 或 speak，从而实现全双工交互。"
```

### Qwen3.5-Omni

```yaml
id: qwen3.5-omni
num: 25
name: Qwen3.5-Omni
full_name: 通义千问3.5全模态版 (Qwen3.5-Omni)
year: '2026'
org: 阿里通义
parent: gemini-1.5
paper_url: https://qwen.ai/blog/qwen2.5-omni/
project_url: ''
category: frontier_2026
motivation: Thinker-Talker双核低延迟架构
```

#### 📝 一句话总结
Qwen3.5-Omni 沿用并扩展 Thinker-Talker 双核架构，用 Hybrid-Attention MoE、长上下文音视频输入、多码本流式语音和 ARIA 对齐机制，把文本、图像、音频、视频理解与实时语音输出统一到低延迟 omni agent 中。

#### 🎯 核心要点
- Thinker-Talker 架构：Thinker 负责多模态理解、推理和文本生成，Talker 接收 Thinker 表征并生成流式语音。
- Hybrid-Attention MoE：Thinker 和 Talker 都采用 Hybrid MoE，并利用 Gated Delta Net 降低长音视频序列 KV-cache I/O。
- 长上下文多模态：支持 256k context，公开报告称可处理超过 10 小时音频和 400 秒 720P、1 FPS 音视频输入。
- AuT 音频编码器：Audio Transformer 从头训练，FBank 经 4 个 Conv2D block 下采样 16 倍，得到 6.25 Hz audio tokens。
- 时间感知输入：继承 TM-RoPE 思路，并加入显式秒级 timestamp，缓解长视频中绝对时间位置过稀疏的问题。
- 多码本流式语音：Talker 预测 RVQ 多码本 token，MTP 输出当前 frame 的残差码本，Code2Wav/causal ConvNet 增量合成 waveform。
- ARIA：Adaptive Rate Interleave Alignment 将文本和语音组织为单一交错流，用单调比例约束减少漏字、错读和数字读法不稳定。
- 后训练：Thinker 做 multimodal post-training，Talker 经过通用、长上下文、DPO/GSPO 强化学习和 speaker fine-tuning 四阶段训练。

#### 🔬 深入细节
![Qwen3.5-Omni Thinker-Talker 架构](https://arxiv.org/html/2604.15804v2/figures/model.jpg)
*图：Qwen3.5-Omni 总览。输入元信息中的链接是 Qwen2.5-Omni 博客，Qwen3.5-Omni 的公开技术报告对应 arXiv `2604.15804`。*

```python
# Qwen3.5-Omni 流式理解和语音生成的抽象流程
thinker_cache = KVCache()
talker_cache = KVCache()

for chunk in multimodal_stream():
    text_tokens = tokenize_text(chunk.text)
    audio_tokens = AuT(chunk.audio)              # 6.25 Hz after Conv2D downsampling
    vision_tokens = vision_encoder(chunk.frames)
    timestamp_tokens = format_timestamps(chunk.time)

    thinker_inputs = interleave(
        text_tokens,
        timestamp_tokens,
        audio_tokens,
        vision_tokens,
    )
    thinker_hidden, text_out = thinker.stream_decode(
        thinker_inputs,
        cache=thinker_cache,
    )

    # ARIA creates one monotonic interleaved text-speech stream
    aligned_units = aria_schedule(text_out, global_speech_text_ratio)
    for unit in aligned_units:
        if unit.kind == "text":
            emit_text(unit.token)
        else:
            rvq_codes = talker.predict_multi_codebook(
                thinker_hidden=thinker_hidden,
                text_prefix=text_out,
                cache=talker_cache,
            )
            audio_chunk = code2wav.stream(rvq_codes)
            play(audio_chunk)
```

Qwen3.5-Omni 的基本分工是“Thinker 管语义，Talker 管声音”。Thinker 接收文本、图像、音频和音视频输入，通过 Vision Encoder 与 AuT 将非文本信号变成 token，再在统一上下文中生成文本和高层隐藏状态。Talker 不再重新理解世界，而是读取 Thinker 的上下文、文本输出和多模态表征，决定语音的发音、情感、音量、速度和说话人风格。

这种拆分可以写成两级条件生成：

$$
H, y_{1:T}
=\mathrm{Thinker}_{\theta}(x^{text}, x^{img}, x^{aud}, x^{vid})
$$

$$
p_{\phi}(q_{1:N}\mid H,y_{1:T},s)
=\prod_{n=1}^{N}p_{\phi}(q_n\mid q_{<n},H,y_{1:T},s)
$$

其中 \(H\) 是 Thinker 的高层表示，\(y\) 是文本响应，\(s\) 是 Talker 的声音控制 system prompt，\(q\) 是 RVQ speech codec token。这样做的直觉是：语义推理和多模态 grounding 交给大模型主干，声学细节由专门的语音生成模块承担，避免主干在高频 speech token 上浪费解码预算。

AuT 解决的是长音频输入进入 LLM 的吞吐问题。公开报告描述 AuT 使用从头训练的 transformer 音频编码器，音频 FBank 特征先经过 4 个 Conv2D block 下采样 16 倍，再进入 self-attention，得到约 6.25 Hz 的 audio token。若原始声学帧率是 \(100\) Hz，则下采样后 token 率为：

$$
r_{\mathrm{audio}}=\frac{100}{16}=6.25\ \mathrm{tokens/s}
$$

这使 10 小时级音频在 256k 上下文中更可行。对音视频，Qwen3.5-Omni 还显式插入秒级 timestamp，并让音频每 160 ms 对应一个 temporal ID，视频帧按实际时间戳映射到同一 160 ms 分辨率，减少长视频中仅依赖绝对位置 ID 导致的稀疏和外推困难。

Talker 的语音输出采用多码本预测。对第 \(t\) 个声学 frame，RVQ token 可写为：

$$
q_t=(q_t^{(1)},q_t^{(2)},\ldots,q_t^{(C)})
$$

$$
p(q_t\mid H,q_{<t})
=p(q_t^{(1)}\mid H,q_{<t})
\prod_{c=2}^{C}p(q_t^{(c)}\mid H,q_{<t},q_t^{(<c)})
$$

更严格地说，上式的乘积项表示对多码本条件概率的分解。MTP module 在每个解码步输出当前 frame 的残差码本，随后 causal streaming ConvNet codec decoder 增量合成 waveform，因此第一包音频不必等完整句子生成完才能播放。

ARIA 针对的是文本 token 与语音 token 速率不匹配。Qwen3-Omni 的双轨 Talker 需要同步文本轨和语音轨，容易出现漏词、错读数字或某些低编码效率语言的语音延迟。Qwen3.5-Omni 将它改成一个单通道交错流，并约束任意前缀中的累计 speech-to-text 比例不超过样本级全局比例：

$$
\rho=\frac{N_{\mathrm{speech}}}{N_{\mathrm{text}}},\qquad
\frac{N_{\mathrm{speech}}(k)}{\max(1,N_{\mathrm{text}}(k))}\le \rho
$$

这个约束让模型可以先生成任意长度文本前缀，再接上相应 speech token，但不能让语音 token 相对文本过度超前。它比固定 text:speech token 比例更灵活，也比强制 MFA 对齐更适合端到端流式生成。

训练流程上，Qwen3.5-Omni 先做大规模 omnimodal pretraining，数据包括图文、视频文本、音频文本、视频音频、视频音频文本和纯文本；报告中的 General Stage 使用约 4T token，其中音频约 1.99T、图像约 0.95T、文本约 0.92T。Talker 后训练分为四步：通用多语种语音上下文预训练、长上下文 CPT、基于人类偏好的 DPO 与规则奖励/GSPO、最后做轻量 speaker fine-tuning。这个训练顺序对应了从“会说”到“按上下文自然地说”，再到“按偏好和目标音色说”的逐步约束。

> 💡 关键：Qwen3.5-Omni 的低延迟来自两层设计：Thinker 用 chunked prefilling 和 Hybrid MoE 快速产出语义与文本，Talker 用多码本、MTP 和 ARIA 把文本与语音流稳定地交错成可播放音频。

#### 🧪 练习题
```yaml
question: "Qwen3.5-Omni 中 ARIA 主要解决什么问题？"
options:
  - "将图像 patch 压缩成更少视觉 token"
  - "动态对齐文本和语音 token 的生成速率，减少流式语音中的漏词、错读和同步开销"
  - "把 MoE 专家全部改为稠密 FFN"
  - "取消 Talker，让 Thinker 直接输出 waveform"
answer: 1
explain: "ARIA 将文本和语音组织为单一交错流，并用自适应比例约束处理不同语言和不同 tokenization 效率下的同步问题。"
```

### OmniFlow

```yaml
id: omniflow
num: 26
name: OmniFlow
full_name: 全模态流模型 (OmniFlow)
year: '2025'
org: UCLA
parent: codi-2
paper_url: https://openaccess.thecvf.com/content/CVPR2025/html/Li_OmniFlow_Any-to-Any_Generation_with_Multi-Modal_Rectified_Flows_CVPR_2025_paper.html
project_url: ''
category: diffusion_fusion
motivation: 多模态修正流统一生成
```

#### 📝 一句话总结
OmniFlow 提出多模态修正流和 Omni-Transformer，把文本、图像、音频放到统一的连续流匹配框架中，解决 CoDi/UniDiffuser 等 any-to-any 系统跨模态交互浅、训练代价高的问题。

#### 🎯 核心要点
- **多模态修正流**：为每个模态分配独立噪声时间 \(t_i\)，用路径 \(\tau(t)=(t_1,\ldots,t_M)\) 表示任意输入到任意输出任务。
- **统一任务编码**：条件模态保持 \(t_i=0\)，待生成模态从 \(t_i=1\) 积分到 \(0\)，缺失模态保持纯噪声。
- **Omni-Transformer**：继承 Stable Diffusion 3 的 MMDiT 思路，为图像、文本、音频设置独立投影/FFN，并通过联合注意力直接交互。
- **多模态 CFG**：用 \(\alpha_{ij}\) 独立控制输入模态 \(j\) 对输出模态 \(i\) 的引导强度。
- **模块化训练**：先复用/训练图文与文音专家模块，再合并微调，避免从零训练全模态生成模型。
- **训练配方探索**：系统比较连续流、离散扩散、时间步分布和 timestep shift，论文报告 RF + logit-normal 采样和 shift=3 在音频/文本任务上表现更稳。
- **实验定位**：在文本到图像、文本到音频、音频/图像到文本等任务上优于先前通用 any-to-any 生成模型，并在部分指标上接近单任务专家模型。

#### 🔬 深入细节
![OmniFlow 架构示意图](https://arxiv.org/html/2412.01169v1/x3.png)
*图：OmniFlow 将图像、文本、音频编码到潜变量空间，用多流 Omni-Transformer 预测各模态速度场。*

```python
# OmniFlow 多模态修正流训练/推理伪代码
def train_step(batch, model):
    clean = encode_modalities(batch)          # image/text/audio -> latent x_i^0
    path = sample_task_path(batch.task)       # e.g. text+audio -> image
    s = uniform(0.0, 1.0)
    loss = 0.0

    noisy_inputs = {}
    targets = {}
    for modality, x0 in clean.items():
        eps = normal_like(x0)
        t_i = path(modality, s)
        x_t = (1 - t_i) * x0 + t_i * eps
        noisy_inputs[modality] = x_t
        targets[modality] = x0 - eps          # rectified-flow velocity

    v_pred = model(noisy_inputs, times=path.times(s))
    for modality in batch.observed_modalities:
        loss += mse(v_pred[modality], targets[modality])
    loss.backward()

def sample(condition_modalities, output_modalities, model, steps):
    state = init_with_conditions_and_noise(condition_modalities, output_modalities)
    for k in range(steps):
        times = task_path_at_step(k)
        v = multimodal_cfg(model, state, times)
        for m in output_modalities:
            state[m] = ode_update(state[m], v[m], times[m])
    return decode_modalities(state, output_modalities)
```

OmniFlow 的关键动机来自两个矛盾：一方面，图像扩散/流模型、音频扩散模型已经很强；另一方面，把多个单任务模型简单串起来会让跨模态信息只能通过 caption 或 embedding 平均传递。论文特别指出，CoDi 在音频+文本到图像任务中把音频 embedding 和文本 embedding 加权平均，这种表示会把不同条件压到同一个向量里，无法保证两个输入都被忠实保留。OmniFlow 改为学习联合分布，让图像、文本、音频 token/latent 在每一层注意力里互相可见。

多模态修正流把单模态 RF 的线性插值推广到每个模态：

$$
x_i^{t_i}=(1-t_i)x_i^0+t_i x_i^1,\qquad x_i^1\sim\mathcal{N}(0,I)
$$

目标速度为：

$$
u_i=x_i^0-x_i^1,\qquad
\mathcal{L}_{\mathrm{MRF}}=
\mathbb{E}_{x^0,x^1,t}\sum_{i\in\mathcal{O}}
\left\|v_{\theta,i}(x_1^{t_1},\ldots,x_M^{t_M},t_1,\ldots,t_M)-u_i\right\|_2^2
$$

其中 \(\mathcal{O}\) 是当前样本里参与训练的模态集合。与普通扩散只处理一个时间 \(t\) 不同，OmniFlow 使用多维时间向量。若任务是文本+音频到图像，文本和音频作为条件保持干净，图像从噪声走向数据：

$$
\tau_{T+A\rightarrow I}(s)=
(t_I,t_T,t_A)=(1-s,0,0),\quad s:0\rightarrow1
$$

这让“理解任务”和“生成任务”在同一数学对象下表达：条件模态不是外部 prompt，而是联合状态向量里 \(t=0\) 的坐标；待生成模态不是单独解码器，而是同一个向量场中的某些坐标。

架构上，Omni-Transformer 继承 MMDiT 的“模态独立投影 + 联合注意力”。每个模态有自己的 QKV、输出投影和 FFN，以适配图像 latent patch、文本 latent、音频 latent 的不同统计分布；跨模态交换只发生在 attention 矩阵里：

$$
Q=[Q_I;Q_T;Q_A],\quad K=[K_I;K_T;K_A],\quad V=[V_I;V_T;V_A]
$$

$$
\mathrm{Attn}_i=\mathrm{softmax}\left(\frac{Q_iK^\top}{\sqrt{d}}\right)V
$$

这种设计的工程价值很直接：独立流可以用 SD3 的图文权重初始化，也可以单独训练文本到音频模块，然后把模块合并后做多任务微调。相比从零训练一个统一全模态模型，它更适合在已有高质量专家模型上扩展能力。

多模态 CFG 进一步解决“多个条件谁更重要”的问题。对输出模态 \(i\)，论文把输入模态 \(j\) 的边际影响写成：

$$
\delta_{ij}=v_{\theta,i}(x_i^{t_i},x_j^0)-v_{\theta,i}(x_i^{t_i})
$$

并用可调系数组合：

$$
\hat{v}_{\theta,i}
=v_{\theta,i}(x_1^{t_1},\ldots,x_M^{t_M})
+\sum_{j\ne i}(\alpha_{ij}-1)\delta_{ij}
$$

当只有一个条件模态时，这会退化为标准 classifier-free guidance；当有图像和音频同时作为条件时，用户可以增大 \(\alpha_{\mathrm{text,image}}\) 让输出文本更贴近视觉内容，或增大 \(\alpha_{\mathrm{text,audio}}\) 让文本更贴近音频事件。

推理时，路径 \(\tau\) 决定哪些坐标积分。给定条件模态直接编码为 \(x_i^0\)，待生成模态初始化为高斯噪声，模型在每一步预测速度场并沿 ODE 更新。与“LLM 先生成文本，再调用扩散模型”的工具链相比，OmniFlow 的生成状态一直是联合的，因此可以支持文本到图像+音频、音频到图像、音频+图像到文本等组合，并让输出模态之间共享同一去噪轨迹。

> 💡 关键：OmniFlow 的统一性不是把所有模态离散化到一个词表，而是在连续潜空间里为每个模态保留独立坐标，再用同一个多模态向量场学习它们的联合动力学。

#### 🧪 练习题
```yaml
question: "OmniFlow 用路径 τ(t) 表示 any-to-any 任务时，条件模态和待生成模态通常分别处于什么状态？"
options:
  - "条件模态保持 t=0 的干净状态，待生成模态从 t=1 的噪声积分到 t=0"
  - "条件模态和待生成模态都始终保持 t=1"
  - "条件模态必须先转写成文本，待生成模态再由单独扩散模型生成"
  - "所有模态共享同一个标量时间，不能区分输入和输出"
answer: 0
explain: "多模态修正流用每个模态自己的时间坐标表达任务；条件保持干净，输出从噪声去噪到数据。"
```

### Omni-Diffusion

```yaml
id: omni-diffusion
num: 27
name: Omni-Diffusion
full_name: 全模态扩散模型 (Omni-Diffusion)
year: '2026'
org: arXiv
parent: show-o
paper_url: https://arxiv.org/abs/2603.06000
project_url: ''
category: frontier_2026
motivation: 掩码离散扩散统一理解与生成
```

#### 📝 一句话总结
Omni-Diffusion 提出基于 mask-based discrete diffusion 的 any-to-any 多模态语言模型，把文本、图像、语音统一成离散 token 序列并直接建模联合分布，解决自回归 MLLM 串行生成和模态接口割裂的问题。

#### 🎯 核心要点
- **公开来源校正**：输入 `paper_url` 指向 arXiv `2603.06000`，该编号实际是数学优化论文；Omni-Diffusion 对应公开论文为 arXiv `2603.06577` 和项目页 `https://omni-diffusion.github.io/`。
- **统一离散扩散骨干**：模型不是用 AR LLM 外接图像/语音解码器，而是用 mask token prediction 直接预测文本、图像、语音 token。
- **多模态 tokenization**：图像使用 MAGVIT-v2 tokenizer，语音理解使用 SenseVoiceSmall，语音生成使用 GLM-4-Voice tokenizer/decoder，文本使用语言 tokenizer。
- **Dream-7B 扩展**：以预训练离散扩散语言模型 Dream-7B 为骨干，扩展词表、embedding 和输出层以容纳图像与语音 token。
- **三阶段训练**：视觉-语言预对齐、语音-视觉-语言联合对齐、SDVI 语音驱动视觉交互微调。
- **变长生成优化**：Attenuated Tail-Pad Masking 降低 pad token 过拟合，提升可变长度回答和语音输出稳定性。
- **扩散式推理策略**：使用熵驱动的并行解码、重复惩罚、CFG、图像 position penalty、语音 special token pre-infilling 和自适应长度初始化。

#### 🔬 深入细节
![Omni-Diffusion 架构总览](https://arxiv.org/html/2603.06577v1/x2.png)
*图：Omni-Diffusion 将文本、图像、语音包装为统一离散 token 序列，随机 mask 后由同一个离散扩散模型恢复。*

```python
# Omni-Diffusion 的统一训练与采样伪代码
def tokenize_sample(sample):
    tokens = []
    if sample.text:
        tokens += ["<BoT>"] + text_tokenizer(sample.text) + ["<EoT>"]
    if sample.image:
        tokens += ["<BoI>"] + magvit_v2_tokenizer(sample.image) + ["<EoI>"]
    if sample.speech:
        tokens += ["<BoS>"] + glm4_voice_tokenizer(sample.speech) + ["<EoS>"]
    return tokens

def train_step(sample, model):
    x0 = tokenize_sample(sample)
    t = uniform(0.0, 1.0)
    r = mask_ratio_schedule(t)
    xt, mask_positions = random_mask(x0, ratio=r, attenuate_pad=True)
    logits = model(xt, timestep=t, full_attention=True)
    loss = cross_entropy(logits[mask_positions], x0[mask_positions])
    loss.backward()

def diffuse_decode(prompt_tokens, target_layout, model, steps):
    x = prompt_tokens + ["[MASK]"] * target_layout.num_target_tokens
    pre_infill_special_tokens(x, target_layout)
    for k in range(steps):
        logits = model(x, timestep=1 - k / steps)
        logits = apply_cfg_and_repetition_penalty(logits)
        logits = apply_position_penalty_for_image(logits, k, steps)
        probs = softmax(logits)
        confidence = -entropy(probs)
        positions = select_top_confident_masks(x, confidence, budget_per_step(k))
        x[positions] = sample_tokens(probs[positions])
    return detokenize_by_modality(x)
```

Omni-Diffusion 的出发点是替代“自回归 LLM + 多个外部生成器”的主流全模态路线。传统 MLLM 往往把图像、语音编码成 LLM 能读的前缀特征，输出仍以文本为中心；若要生成图像或语音，再把 LLM 隐状态或文本 prompt 交给另一个扩散/声码器。这样会形成表示瓶颈。Omni-Diffusion 则直接在一个序列里混合文本 token、图像 token 和语音 token，让模型学习：

$$
p_{\theta}(x_0^{T},x_0^{I},x_0^{S})
$$

其中 \(T,I,S\) 分别表示文本、图像、语音。理解任务可以看成“给定某些模态 token，恢复文本答案 token”，生成任务可以看成“给定文本或语音条件，恢复图像/语音 token”，两者都落在同一个 mask 恢复目标中。

训练时，干净多模态序列先由各模态 tokenizer 拼接而成：

$$
x_0=[\mathrm{BoT},t_1,\ldots,\mathrm{EoT},
\mathrm{BoI},i_1,\ldots,\mathrm{EoI},
\mathrm{BoS},s_1,\ldots,\mathrm{EoS}]
$$

然后按时间 \(t\sim U(0,1)\) 得到 mask 比例 \(r(t)\)，随机把部分 token 替换为 `[MASK]`，模型只在被 mask 的位置计算交叉熵：

$$
\mathcal{L}
=-\mathbb{E}_{t,q(x_t|x_0)}
\sum_{\ell=1}^{L}
\mathbf{1}[x_t^\ell=\mathrm{MASK}]
\log p_{\theta}(x_0^\ell\mid x_t,t)
$$

这个目标的特点是并行性强：同一步可以同时预测多个位置，而不是像 AR 模型必须从左到右逐 token 展开。它也让跨模态 attention 是双向的，图像 token 可以在同一层看到语音 token 和文本 token，适合语音指令生成图像、图像+语音问答等需要多源融合的任务。

架构上，论文尽量少改离散扩散语言模型本体。图像侧用 MAGVIT-v2 把图像压缩成离散视觉 token，论文实现中图像 codebook 为 8192、下采样因子为 16；语音侧用 SenseVoiceSmall 作为语音输入编码器，经轻量 MLP 对齐到骨干 hidden size，用 GLM-4-Voice 的语音 tokenizer/decoder 进行语音生成，语音 token 率约 12.5 Hz、codebook 为 16384；骨干使用 Dream-7B，只扩展词表、embedding 和输出层。这个设计把“多模态能力”主要放在离散 token 语义对齐上，而不是为每种输出训练独立生成头。

训练流程是渐进式的。第一阶段用文本-图像数据做视觉-语言预对齐，覆盖 text-to-image 和 image captioning；第二阶段保留图文数据并加入 ASR/TTS 数据，让语音 token 对齐到同一语义空间；第三阶段使用作者构造的 SDVI 数据，包含 spoken visual QA 和 speech-to-image，用来强化“语音驱动视觉交互”。这种 curriculum 能降低一次性混合文本、图像、语音时的训练不稳定。

推理时，Omni-Diffusion 从目标区域的全 mask 序列开始迭代恢复。每一步计算各位置 token 分布的熵：

$$
H_\ell=-\sum_{v\in\mathcal{V}}p_{\theta}(v\mid x_t)_\ell
\log p_{\theta}(v\mid x_t)_\ell
$$

低熵位置表示模型更有把握，因此先解码这些位置，剩余位置继续保持 `[MASK]`。图像生成中，模型容易同时从序列两端向中间填充，导致重复纹理；position penalty 在早期降低尾部位置 logits，形成软顺序约束：

$$
\tilde{z}_{\ell,v}=
\begin{cases}
\lambda z_{\ell,v}, & \ell\in\mathrm{tail},\ k<K_{\mathrm{early}} \\
z_{\ell,v}, & \text{otherwise}
\end{cases}
$$

语音生成则通过 special token pre-infilling 先填入边界/结构 token，使模型在恢复语音 token 时能更稳定地利用文本语义；adaptive token length assignment 根据任务和输入长度估计目标语音 token 数，避免固定长度导致截断或过多 pad。

与 OmniFlow 相比，Omni-Diffusion 的“扩散”发生在离散 token 层，而不是连续潜变量 ODE。它更接近一个非自回归多模态语言模型：优势是文本、图像、语音都能走同一词表扩展和 mask 恢复流程，推理可并行；代价是必须依赖高质量离散 tokenizer，并且图像/语音最终质量会受到 tokenizer 重建上限影响。

> ⚠️ 注意：本文件的 YAML 保留用户给定 `paper_url`；方法解读基于实际公开的 Omni-Diffusion 论文 arXiv `2603.06577`，因为 `2603.06000` 与该算法不匹配。

#### 🧪 练习题
```yaml
question: "Omni-Diffusion 为什么能用一个目标同时覆盖理解和生成任务？"
options:
  - "因为它把所有任务都转成外部工具调用"
  - "因为它只训练文本 token，不处理图像和语音"
  - "因为它把文本、图像、语音表示为统一离散 token 序列，并用 mask 恢复目标预测缺失 token"
  - "因为它使用单模态连续 ODE，不需要 tokenizer"
answer: 2
explain: "理解和生成都可以视为在给定部分多模态 token 的条件下恢复被 mask 的目标 token，因此共享同一个离散扩散目标。"
```

### Nemotron 3 Nano

```yaml
id: nemotron-3-nano
num: 28
name: Nemotron 3 Nano
full_name: Nemotron 3纳米版 (Nemotron 3 Nano)
year: '2026'
org: NVIDIA
parent: gpt-4o
paper_url: https://nvidianews.nvidia.com/news/nvidia-nemotron-3-nano-omni-open-multimodal-model
project_url: ''
category: frontier_2026
motivation: 高吞吐音视频智能体推理
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

### Llama 4 Scout

```yaml
id: llama-4-scout
num: 29
name: Llama 4 Scout
full_name: Llama 4侦察版 (Llama 4 Scout)
year: '2025'
org: Meta
parent: gemini-1.5
paper_url: https://llama.meta.com/llama4-launch
project_url: ''
category: native_e2e
motivation: 开源原生MoE全模态模型
```

#### 📝 一句话总结
Llama 4 Scout 在 Chameleon 式早期融合多模态自回归架构上引入稀疏 MoE、iRoPE 长上下文机制和 10M token 上下文窗口，解决开放权重模型在多图视觉理解、超长文档/代码库推理与单卡可部署效率之间难以兼得的问题。

#### 🎯 核心要点
- 早期融合多模态：把文本 token 与视觉 patch token 放入统一 Transformer 主干，自回归地产生文本/代码输出。
- 稀疏 MoE 架构：Scout 为 17B active parameters、16 experts、109B total parameters，单 token 只激活部分参数以降低训练和推理开销。
- 10M 长上下文：官方模型卡给出 Scout 最大上下文长度 10M tokens，Meta 博客强调从 Llama 3 的 128K 大幅扩展。
- iRoPE 长度泛化：交错使用带 RoPE 的注意力层和无位置编码注意力层，并在推理时对注意力做温度缩放。
- 视觉输入格式：支持文本 + 图像输入，官方文档说明图像按 336×336 tile 切分，并追加全局缩放 tile。
- 训练流程：多模态预训练、长上下文 mid-training、轻量 SFT、在线多模态 RL、轻量 DPO，并用难例筛选保持推理/编码/数学能力。
- 部署目标：INT4 量化版本可在单张 NVIDIA H100 上运行，适合长文档分析、多文档总结和大代码库推理。

#### 🔬 深入细节
![Llama 4 MoE 架构示意](https://scontent-sin11-1.xx.fbcdn.net/v/t39.2365-6/488655517_650996354186993_1043942188415715102_n.png?_nc_cat=105&_nc_gid=VOqEH1RPzVOypMfYnMo47w&_nc_ht=scontent-sin11-1.xx&_nc_oc=AdqtwDvug5p8qikmdahrLbTU3y_kyD3rreSZnPDdK1oKjDdN_1JDUfsrmagrQLhHHwQ&_nc_ohc=MLLT0x0HCvAQ7kNvwGyuHzi&_nc_sid=e280be&_nc_ss=78100&_nc_zt=14&ccb=1-7&oe=6A4ADD00&oh=00_Af8kwVSjnjFLxXIJ85ZbuQ8Zoj4xp3iFThL_DLBFD5oJlQ)
*图：Meta 在 Llama 4 发布页展示的 MoE 层示意。官方以 Maverick 为例说明 shared expert + routed experts 的稀疏激活模式；Scout 同属 Llama 4 MoE 家族，公开卡确认 16 experts、17B active、109B total。*

```python
# Llama 4 Scout 的抽象训练/推理流程（公开资料级别）
def encode_multimodal(prompt):
    seq = []
    for item in prompt:
        if item.type == "text":
            seq.extend(text_tokenizer(item.text))
        elif item.type == "image":
            # 官方文档：动态图像切分为 336x336 局部 tile，并追加一个全局 tile
            tiles = split_into_tiles(item.image, tile_size=336)
            tiles.append(resize_global_tile(item.image, 336))
            seq.extend(vision_encoder_and_image_tokens(tiles))
    return add_role_modality_and_position_features(seq)

def llama4_scout_forward(prompt, kv_cache=None):
    h = encode_multimodal(prompt)
    for layer in transformer_layers:
        h = layer.attention(h, kv_cache=kv_cache, position_scheme=layer.irope_mode)
        if layer.kind == "moe":
            route = router(h, experts=16)          # token -> routed expert
            h = shared_or_dense_path(h) + routed_expert(route, h)
        else:
            h = dense_ffn(h)
    return autoregressive_decode(h, output_modalities=["text", "code"])

# 后训练概念流程
pretrain(multimodal_web_text_image_video_data)
midtrain(long_context_specialized_data, target_context=256_000)
lightweight_sft(hard_instruction_data)
online_multimodal_rl(filter_by="medium_to_hard_prompts")
lightweight_dpo(corner_case_preference_data)
```

Llama 4 Scout 继承了 Chameleon 代表的 early-fusion 思路：不要先用一个独立视觉模型生成文本描述，再把描述交给 LLM，而是把视觉切片映射成和文本同处一个上下文序列的 token/embedding。若文本 token 为 \(t_{1:n}\)，图像经 tile 化和视觉编码后得到 \(v_{1:m}\)，模型实际看到的是交错序列：

$$
z = [e(t_1), \ldots, e(t_n), g(v_1), \ldots, g(v_m)] + e_{\mathrm{role}} + e_{\mathrm{modality}}
$$

然后用自回归目标建模文本或代码输出：

$$
p_{\theta}(y_{1:T}\mid z)=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t}, z)
$$

这种设计的价值在于视觉信息没有被预先压缩成 caption，模型可以直接在文字、图表、文档截图、多张图片之间做联合注意力。官方文档还披露了具体图像 prompt 格式：大图会被切成 336×336 patch token，并添加一个全局缩放视图，用局部细节和全局布局共同支持 DocVQA、ChartQA、图像 grounding 等任务。

Scout 的第二个关键是 MoE 条件计算。稠密模型每个 token 都经过同一套 FFN 参数，扩容会直接增加每 token 计算；MoE 则让路由器为 token 选择少数专家。可抽象为：

$$
r(h)=\operatorname{TopK}(\operatorname{softmax}(W_rh), k),\qquad
\operatorname{MoE}(h)=E_{\mathrm{shared}}(h)+\sum_{i\in r(h)}\alpha_iE_i(h)
$$

其中 \(E_i\) 是专家 FFN，\(\alpha_i\) 是路由权重。对 Scout，公开模型卡给出总参数 109B、活跃参数 17B、16 个专家；这意味着模型需要在内存中保存较大容量，但服务单个 token 时只激活一部分计算路径。它的工程目标不是追求最大总参数，而是在开放权重场景里把多模态质量、长上下文和单 H100 INT4 部署放到同一个可用点上。

长上下文来自训练和位置机制的组合，而不是简单把 RoPE 外推到 10M。Meta 披露 Scout 在预训练和后训练中使用 256K context，并通过 long-context mid-training 获得长度泛化；架构上使用 iRoPE，即大多数层保留 RoPE，部分 interleaved attention layers 不使用位置编码，再配合推理时 attention temperature scaling。可把第 \(\ell\) 层注意力写成：

$$
\operatorname{Attn}_{\ell}(Q,K,V)=
\operatorname{softmax}\left(
\frac{s_{\ell}(Q,K)}{\tau_{\ell}(L)\sqrt{d}}
\right)V
$$

$$
s_{\ell}(q_i,k_j)=
\begin{cases}
(R_iq_i)^\top(R_jk_j), & \ell\in\mathcal{R}_{\mathrm{RoPE}} \\
q_i^\top k_j, & \ell\in\mathcal{R}_{\mathrm{NoPE}}
\end{cases}
$$

这里 \(L\) 是推理上下文长度，\(\tau_{\ell}(L)\) 表示公开资料中提到的推理时注意力温度缩放。直觉上，RoPE 层保留相对位置信息，NoPE 层减少对训练位置范围的硬绑定，温度缩放在极长序列下调整注意力分布，缓解长上下文里注意力权重过度稀释的问题。

后训练方面，Meta 对 Llama 4 系列采用轻量 SFT → 在线 RL → 轻量 DPO。其核心不是把所有指令数据都塞进 SFT，而是先用模型判别去掉大量 easy 数据，让 SFT 聚焦较难样本；在线 RL 阶段持续采样和过滤 medium-to-hard prompts，使模型在多模态、推理、编码、数学任务上保持探索；最后用轻量 DPO 修复回答质量和对话边角问题。一个简化目标可以写成：

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{pretrain}}
+\lambda_{\mathrm{lc}}\mathcal{L}_{\mathrm{long\ context}}
+\lambda_{\mathrm{sft}}\mathcal{L}_{\mathrm{sft}}
-\lambda_{\mathrm{rl}}\mathbb{E}[R(x,y)]
+\lambda_{\mathrm{dpo}}\mathcal{L}_{\mathrm{pref}}
$$

与 Chameleon 相比，Scout 的创新点更偏系统化：Chameleon 证明了图文 token 早期融合可以形成统一自回归多模态模型；Scout 在此基础上把稀疏专家、长上下文位置泛化、图像 tile 化和开放权重部署打包成一个可服务模型。它仍不是音频/视频输出的 any-to-any 生成器，公开模型卡写明输入为文本 + 最多 5 张图像、输出为文本；但训练中使用视频帧静图来增强视觉理解，因此更适合作为“超长上下文视觉-语言推理模型”来理解。

> ⚠️ 注意：Meta 未公开完整逐层超参数、路由损失、专家容量因子和 iRoPE 具体层位配置；上面的公式是对官方 MoE、early fusion、iRoPE 和后训练流程的可解释抽象，不代表未披露实现细节。

#### 🧪 练习题
```yaml
question: "Llama 4 Scout 支持 10M 上下文的关键组合是什么？"
options:
  - "只把 Llama 3 的 RoPE 最大位置参数改成 10M"
  - "用 ASR 先把所有图像和视频转成文本摘要"
  - "256K 长上下文训练、long-context mid-training、iRoPE 交错注意力和推理时注意力温度缩放"
  - "完全取消注意力机制，只保留 MoE 路由器"
answer: 2
explain: "Meta 公开资料说明 Scout 经过 256K context 预训练和后训练，并使用 iRoPE 与推理时 attention temperature scaling 来增强长度泛化。"
```

### GPT-5.5 Instant

```yaml
id: gpt-5.5-instant
num: 30
name: GPT-5.5 Instant
full_name: GPT-5.5即时版 (GPT-5.5 Instant)
year: '2026'
org: OpenAI
parent: gpt-4o
paper_url: https://openai.com/gpt-5-5
project_url: ''
category: frontier_2026
motivation: 强化可靠性与Agentic任务
```

#### 📝 一句话总结
GPT-5.5 Instant 是 OpenAI 面向 ChatGPT 默认交互的低延迟 Instant 模型，把文本、图像、个性化上下文、工具/搜索决策和安全监控统一到快速响应路径中，解决高频日常问答在准确性、简洁性、视觉理解和延迟之间的取舍问题。

#### 🎯 核心要点
- 默认 Instant 模型：OpenAI 发布页说明 GPT-5.5 Instant 从 2026-05-05 起替代 GPT-5.3 Instant 成为 ChatGPT 默认模型，并通过 API `chat-latest` 暴露最新 Instant 快照。
- 多模态输入：OpenAI API 文档显示 `chat-latest` 支持文本和图像输入、文本输出；音频和视频在该模型接口中不作为原生输入输出能力开放。
- 低延迟推理路径：System Card 说明 GPT-5.5 Instant 在部署时使用低 reasoning effort，而能力评估可在更高 effort 下测上限。
- 事实性增强：官方发布页报告相较 GPT-5.3 Instant，高风险提示中的 hallucinated claims 减少 52.5%，用户标记困难对话中的 inaccurate claims 减少 37.3%。
- 自适应工具使用：发布页强调它更会判断何时使用 web search，API 文档也把 GPT-5.5 系列定位为支持 hosted tools、tool search、prompt caching 等生产功能。
- 个性化上下文：发布页强调回答可更好利用历史聊天和连接数据，同时为 Free/Go 等层级提供不同范围的个性化 rollout。
- 安全栈升级：System Card 将 GPT-5.5 Instant 作为首个在 Cybersecurity 与 Biological/Chemical Preparedness 中按 High capability 处理的 Instant 模型，并启用相应监控和缓解。

#### 🔬 深入细节
![GPT-5.5 Instant 图像输入示例](https://images.ctfassets.net/kftzwdyauwt9/5bsfu8NcoBRFtPBIKqg3fv/ec6e143175189cee14e35a02f69e4e11/algebra.jpeg?fm=webp&q=90&w=640)
*图：OpenAI 在 GPT-5.5 Instant 发布页中用于对比视觉/数学纠错能力的手写代数图片。官方没有公开模型内部架构图，因此这里使用官方多模态输入示例，并在下文给出系统级抽象。*

```python
# GPT-5.5 Instant 的公开资料级系统抽象
def gpt55_instant_respond(user_turn, chat_state, personalization, tools):
    # 1. 汇聚 ChatGPT 默认模型可见上下文：文本、图像、历史偏好和可用工具
    context = pack_context(
        text=user_turn.text,
        images=user_turn.images,        # API chat-latest: text/image input
        history=chat_state,
        personalization=personalization,
        system_policy=current_policy(),
    )

    # 2. Instant 路径优先低延迟；必要时选择搜索/工具，而不是无条件长思考
    effort = "low"                     # System Card: deployed at low reasoning effort
    action = decide_action(context, tools, budget="interactive_latency")

    evidence = []
    if action.needs_web_search:
        evidence.append(tools.web_search(action.query))
    if action.needs_file_or_connector:
        evidence.append(tools.retrieve(action.source))

    # 3. 多模态条件生成，并在输出前后运行安全/事实性/策略监控
    draft = model.generate(
        context=context,
        evidence=evidence,
        reasoning_effort=effort,
        output_modality="text",
        verbosity="concise",
    )
    return safety_and_quality_stack(draft, context, high_capability_safeguards=True)
```

GPT-5.5 Instant 的“架构”公开信息更接近产品化系统描述，而不是论文中的逐层网络图。可确定的是：它是 ChatGPT 的默认 Instant 路径，API 的 `chat-latest` 指向当前 ChatGPT Instant 快照；公开 API 能力为文本和图像输入、文本输出，并支持 Responses/Chat Completions 等端点。与 GPT-4o 的端到端音频-视觉-文本 omni 叙事不同，GPT-5.5 Instant 的公开材料没有宣称在该接口上提供原生音频输出，因此这里的“全模态”应理解为 ChatGPT 交互系统中的多模态输入、上下文个性化和工具增强，而不是已披露的任意模态到任意模态生成器。

一个保守的形式化抽象是把用户文本、图像、对话状态、个性化记忆和检索证据都并入条件上下文：

$$
c = \operatorname{Pack}(x_{\mathrm{text}}, x_{\mathrm{image}}, h_{\mathrm{chat}}, m_{\mathrm{personal}}, e_{\mathrm{tool}}, s_{\mathrm{policy}})
$$

模型随后以自回归方式生成文本：

$$
p_{\theta}(y_{1:T}\mid c, r)=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t}, c, r)
$$

其中 \(r\) 是 reasoning effort 或等价的推理预算控制。OpenAI 的最新模型指南说明 GPT-5.5 支持从 none/low/medium/high/xhigh 的 effort 选择，而 System Card 明确 GPT-5.5 Instant 在生产部署中使用低 effort；这解释了 Instant 的产品定位：在大多数日常场景中用更少推理 token 和更短路径获得足够可靠的答案，把更深推理留给 Thinking/Pro 或显式高 effort 工作流。

工具使用是 GPT-5.5 Instant 相比普通聊天模型更重要的推理环节。发布页强调它更会判断何时使用 web search；开发者文档也把 GPT-5.5 系列放在支持 hosted tools、tool search、prompt caching 和长上下文生产工作流的模型族中。可以把即时推理视为带成本约束的动作选择：

$$
a^*=\arg\max_{a\in\{\mathrm{answer},\mathrm{search},\mathrm{retrieve},\mathrm{tool}\}}
\mathbb{E}[U(y,x,a)]-\lambda C_{\mathrm{latency}}(a)-\mu C_{\mathrm{risk}}(a)
$$

如果问题可由当前上下文回答，模型直接生成；如果问题依赖最新事实或外部资料，它应选择搜索或检索。这个目标解释了为什么低延迟模型不应只是“小模型”：它必须在交互预算内做出是否调用工具、引用哪些证据、何时停止的决策，否则会在事实性和响应速度之间来回牺牲。

视觉路径上，官方例子展示 GPT-5.5 Instant 对手写代数过程进行纠错。该能力可抽象为先把图片编码为视觉 token，再与文本提示共同进入语言推理上下文：

$$
z_{\mathrm{vision}}=V_{\psi}(I),\qquad
c=[E(x_{\mathrm{text}}); z_{\mathrm{vision}}; h_{\mathrm{chat}}; m_{\mathrm{personal}}]
$$

在代数例子中，模型不只是 OCR 出公式，而是要验证每一步变形：平方、展开、移项、判别式、定义域约束和回代。视觉 token 提供手写内容，语言推理负责把它转化为可检查的符号链。这个组合也是 Instant 模型最常见的多模态用法：用户上传截图、照片、表格或作业，模型在较低延迟下给出纠错和解释。

训练公开信息主要来自 System Card。OpenAI 披露 GPT-5.5 Instant 使用多样化数据训练，包括公开互联网信息、第三方合作数据、用户或人类训练者/研究者提供或生成的信息；数据处理包含质量过滤、个人信息减少和安全分类器。后训练目标可以概括为有用性、事实性、简洁性、个性化、安全性和工具使用能力的联合优化：

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{next\ token}}
+\lambda_{\mathrm{inst}}\mathcal{L}_{\mathrm{instruction}}
+\lambda_{\mathrm{pref}}\mathcal{L}_{\mathrm{preference}}
+\lambda_{\mathrm{fact}}\mathcal{L}_{\mathrm{factuality}}
+\lambda_{\mathrm{safety}}\mathcal{L}_{\mathrm{safety}}
+\lambda_{\mathrm{tool}}\mathcal{L}_{\mathrm{tool}}
$$

事实性改进是 GPT-5.5 Instant 发布页最明确的质量信号：相较 GPT-5.3 Instant，在医学、法律、金融等高风险提示上幻觉声明减少 52.5%，在用户标记为事实错误的困难对话上不准确声明减少 37.3%。这说明训练和评测重点不是单纯“回答更多”，而是减少错误断言、在需要外部信息时更主动使用搜索，并用更短、更清晰的答案降低用户筛选成本。

安全方面，System Card 把 GPT-5.5 Instant 放进更严格的 Preparedness 框架：这是首个在生物/化学和网络安全类别按 High capability 处理的 Instant 模型。生产系统因此不只依赖模型权重里的拒答行为，还包括自动监控、actor-level enforcement、安全控制、系统级缓解，以及对越狱、prompt injection、健康、幻觉、公平性和高风险能力的持续评估。对一个默认模型来说，这些系统级保护是架构的一部分，因为它决定了哪些输入可进入高风险路径、哪些输出会被中断或改写。

与 GPT-4o 相比，GPT-5.5 Instant 的公开定位发生了偏移：GPT-4o 的核心贡献是端到端 omni 低延迟交互，尤其是音频实时性；GPT-5.5 Instant 的核心贡献是把“默认日常模型”做得更可靠、更会用上下文、更会选择搜索、回答更短，同时保留图像理解和工具增强。它不是公开论文里可复现的单一网络结构，而是一个面向海量 ChatGPT 默认流量的低延迟多模态推理系统。

> ⚠️ 注意：OpenAI 未公开 GPT-5.5 Instant 的参数规模、tokenizer、视觉编码器、训练配比或精确路由器结构；上面的公式和伪代码用于把官方发布页、System Card 与 API 文档中的行为约束形式化，不代表未披露内部实现。

#### 🧪 练习题
```yaml
question: "GPT-5.5 Instant 的公开资料中，最能体现其 Instant 路径设计的是哪一项？"
options:
  - "它在 chat-latest 中提供原生音频输入和音频输出"
  - "它作为 ChatGPT 默认模型，用低 reasoning effort、图像/文本输入、工具/搜索决策和安全监控支撑快速回答"
  - "它取消所有个性化上下文，只依赖固定系统提示"
  - "它只用于离线长任务，不面向 ChatGPT 默认交互"
answer: 1
explain: "OpenAI 发布页和 System Card 将 GPT-5.5 Instant 定位为默认 Instant 模型；API 文档显示 chat-latest 支持文本/图像输入和文本输出，System Card 说明生产部署使用低 reasoning effort。"
```
