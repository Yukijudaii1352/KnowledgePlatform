### Video-ChatGPT：开启视频对话指令微调范式

```yaml
id: video_chatgpt
name: Video-ChatGPT
full_name: 视频对话模型 (Video-ChatGPT)
year: '2023'
org: MBZUAI
paper_url: https://arxiv.org/abs/2306.05424
category: video_llm
parent: clip4clip
motivation: 开启视频对话微调范式
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/video_chatgpt_detail.md
```

#### 📝 一句话总结

Video-ChatGPT 将 LLaVA 式图像对话模型扩展到视频输入，通过 CLIP 帧级编码、时空平均池化和视频指令微调，解决早期 Video-LMM 无法进行开放式视频对话的问题。

#### 🎯 核心要点

- 架构以 CLIP ViT-L/14 视觉编码器和 Vicuna-v1.1 7B 语言解码器为基础，并从 LLaVA 权重初始化
- 视频表示不训练重型视频 backbone，而是把帧独立编码后分别做空间池化和时间池化，得到 temporal tokens 与 spatial tokens
- 使用一个可学习线性层 \(g(\cdot)\) 将视频 token 投影到 LLM 词嵌入空间，形成可拼接的 video soft prompt
- 指令微调阶段冻结视觉编码器与 LLM，只优化视频到语言空间的投影层，降低训练成本和灾难性遗忘风险
- 构建 100,000 个 video-instruction pairs，结合人工增强标注与半自动 dense caption/tagging/GPT 后处理流程
- 提出视频对话量化评估维度：correctness、detail orientation、contextual understanding、temporal understanding、consistency

#### 🔬 深入细节

![Video-ChatGPT 架构图](https://arxiv.org/html/2306.05424v2/extracted/5655180/images/video-chatgpt.png)
*图：Video-ChatGPT 使用 CLIP-L/14 提取帧级视觉 token，经时空池化和线性投影后，与用户指令一起输入 Vicuna。*

Video-ChatGPT 的核心判断是：早期图像 LMM 已经具备较好的视觉-语言对齐能力，视频对话不必从零训练一个视频编码器。给定视频 \(V_i \in \mathbb{R}^{T \times H \times W \times C}\)，模型把 \(T\) 帧当作一批图像送入 CLIP ViT-L/14，得到帧级 patch 表示：

$$
x_i \in \mathbb{R}^{T \times h \times w \times D}, \quad
h = H / p,\; w = W / p,\; N = h \times w
$$

这里 \(N\) 是每帧 patch token 数，\(D\) 是视觉特征维度。论文没有引入显式 3D 卷积或时序 Transformer，而是用两个互补的平均池化方向保留视频信息：沿空间维平均得到逐帧时间表示，沿时间维平均得到跨帧空间表示。

$$
t_i(\tau)=\frac{1}{N}\sum_{n=1}^{N}x_i[\tau,n,:]\in\mathbb{R}^{D}
$$

$$
z_i(n)=\frac{1}{T}\sum_{\tau=1}^{T}x_i[\tau,n,:]\in\mathbb{R}^{D}
$$

$$
v_i=[t_i \; z_i]\in\mathbb{R}^{(T+N)\times D}, \qquad
Q_v=g(v_i)\in\mathbb{R}^{(T+N)\times K}
$$

这个设计的关键在于把“视频”拆成两类软提示：\(t_i\) 关注事件随时间发生了什么，\(z_i\) 保留跨时间稳定的空间布局、对象和场景。二者拼接后由线性层 \(g\) 投到 Vicuna 的 embedding 维度 \(K\)，因此 LLM 接收到的是一段和文本 token 同维度的视频 token 序列，而不是外部 caption 或离散标签。

```python
# Video-ChatGPT 训练流程伪代码
for video, instruction, answer in dataloader:
    frames = uniform_sample(video, T)

    # 1. 冻结 CLIP，把视频按帧编码为 patch token
    x = clip_vit_l14(frames)                      # [T, N, D]

    # 2. 两个方向的平均池化构造时空视频表示
    temporal_tokens = mean(x, dim="patch")        # [T, D]
    spatial_tokens = mean(x, dim="time")          # [N, D]
    video_features = concat(temporal_tokens, spatial_tokens, dim="token")

    # 3. 仅训练投影层，把视频 token 对齐到 LLM embedding 空间
    video_tokens = linear_projector(video_features)  # [T + N, K]
    text_tokens = tokenizer_embed(instruction)       # [L, K]

    # 4. 冻结 Vicuna，用自回归目标预测答案 token
    prompt = concat(text_tokens, video_tokens, assistant_prefix)
    logits = vicuna(prompt, labels=answer)
    loss = cross_entropy(logits, answer)
    loss.backward()
    optimizer.step()
```

训练目标仍是标准语言模型负对数似然，只是条件上下文多了 \(Q_v\)。若答案 token 为 \(a_1,\dots,a_M\)，训练优化：

$$
\mathcal{L}
=-\sum_{m=1}^{M}\log p_\theta(a_m \mid a_{<m}, Q_t, Q_v)
$$

其中 \(Q_t\) 是用户指令 token，\(Q_v\) 是投影后的视频 token。因为视觉编码器和 LLM 都冻结，梯度主要更新 \(g(\cdot)\)。直觉上，Video-ChatGPT 并不是重新学习“语言如何生成”，而是学习“怎样把时空视觉证据摆到 Vicuna 已能理解的位置”。

数据侧同样是贡献重点。论文把原始视频 caption 扩展成更适合对话训练的 instruction-answer：人工标注负责补充外观、空间关系、事件顺序和推理线索；半自动流程则用 BLIP-2、GRIT、Tag2Text 等模型产出帧级 caption、dense caption 和标签，再通过 GPT 后处理生成多样化视频问答。这样得到的 100K 样本覆盖描述、摘要、问答、创意生成和多轮对话，比单句 caption 更能训练 LMM 对时间顺序和上下文一致性的敏感度。

与 CLIP4Clip 这类检索模型相比，Video-ChatGPT 的变化不只是把输出头从相似度换成文本生成。检索模型学习的是视频和文本的全局匹配分数，而 Video-ChatGPT 需要在开放式问题下选择性读取视觉证据并生成细粒度回答。因此它强调 instruction tuning 和 conversation evaluation，尤其关注 temporal understanding 与 consistency，这也为后续 VideoLLaMA、LLaVA-Video 等视频指令模型奠定了范式。

> 💡 关键：Video-ChatGPT 的方法简洁但影响很大。它证明了“冻结图像 LMM + 视频 token 适配 + 视频指令数据”足以形成可用的视频对话模型，后续工作主要沿着更强数据、更强视频表示和更多模态继续扩展。

#### 🧪 练习题

```yaml
question: "Video-ChatGPT 为什么同时使用 temporal tokens 和 spatial tokens？"
options:
  - "为了让 CLIP 视觉编码器可以端到端训练"
  - "为了分别保留跨帧事件变化和跨时间稳定的空间/对象信息"
  - "为了把视频转成自然语言 caption 后再输入 LLM"
  - "为了用 3D 卷积替代 ViT patch embedding"
answer: 1
explain: "temporal tokens 来自空间池化，保留每帧随时间变化的语义；spatial tokens 来自时间池化，保留稳定空间结构。二者拼接后作为视频软提示输入 LLM。"
```
