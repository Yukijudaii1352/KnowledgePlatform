### Janus-Pro
```yaml
id: janus-pro
name: Janus-Pro
full_name: Janus专业版 (Janus-Pro)
year: '2025'
org: DeepSeek
paper_url: https://arxiv.org/abs/2501.17833
category: frontier_2026
parent: chameleon
motivation: 解耦视觉编码解决表征冲突
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/janus-pro_detail.md
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
