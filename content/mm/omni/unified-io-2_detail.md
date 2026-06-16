### Unified-IO 2
```yaml
id: unified-io-2
name: Unified-IO 2
full_name: 统一输入输出模型第二代 (Unified-IO 2)
year: '2024'
org: Allen AI
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Lu_Unified-IO_2_Scaling_Autoregressive_Multimodal_Models_with_Vision_Language_Audio_CVPR_2024_paper.html
category: autoregressive
parent: unified-io
motivation: Any-to-Any自回归统一模型
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/unified-io-2_detail.md
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
