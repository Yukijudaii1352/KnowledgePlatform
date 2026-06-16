### 全模态扩散 (Omni-Diffusion)
```yaml
id: omni-diffusion
name: Omni-Diffusion
full_name: 全模态扩散 (Omni-Diffusion)
year: '2026'
org: —
paper_url: https://arxiv.org/abs/2603.06000
category: frontier_2026
parent: omniflow
motivation: 任意模态扩散策略学习
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/omni-diffusion_detail.md
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
