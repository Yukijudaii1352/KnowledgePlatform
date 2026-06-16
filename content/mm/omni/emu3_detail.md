### Emu第三代 (Emu3)

```yaml
id: emu3
name: Emu3
full_name: Emu第三代 (Emu3)
year: '2024'
org: BAAI
paper_url: https://baai.ac.cn/news/861
category: autoregressive
parent: anygpt
motivation: 纯Token预测统一图文视频生成
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/emu3_detail.md
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
