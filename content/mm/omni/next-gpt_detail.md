### 下一代GPT (NExT-GPT)

```yaml
id: next-gpt
name: NExT-GPT
full_name: 下一代GPT (NExT-GPT)
year: '2023'
org: NUS
paper_url: https://arxiv.org/abs/2309.05519
category: encoder_llm_decoder
parent: —
motivation: LLM+编码器+扩散解码器架构
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/next-gpt_detail.md
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
