### 双向DPO (BiDPO)
```yaml
id: bidpo
full_name: 双向DPO (BiDPO)
year: "2026.02"
paper_url: https://arxiv.org/abs/2602.10234
motivation: 双向Token级VLM偏好优化
parent: tdpo
category: token_multimodal
source_paper_url: https://doi.org/10.36227/techrxiv.177091884.42596378/v1
source_note: "任务 JSON 的 paper_url 指向无关的交通控制论文；本文按算法名与动机精读 TechRxiv 预印本 BiDPO: Bidirectional Preference Optimization with Token-level Supervision for Vision-Language Models。"
```

#### 📝 一句话总结
BiDPO 针对 VLM 依赖语言先验、忽视细粒度视觉证据的问题，构造语义受控的最小对比图像对，并用正反两个方向的偏好优化和 token-level grounding 让模型同时识别正确与错误的图文-答案配对。它把 DPO 从“整句级偏好”推进到“视觉细节驱动的双向、token 级偏好监督”，用于降低多模态幻觉。

#### 🎯 核心要点
- 面向 vision-language models 的 hallucination 问题，尤其是模型凭语言先验回答而不看关键视觉细节。
- 自动识别问题中的 semantic focus，例如对象、属性、数量、空间关系或局部视觉线索。
- 基于 semantic focus 对图像做 targeted visual modification，构造最小但有判别力的 contrastive image pairs。
- 使用 CLIP-based similarity filtering 保证修改前后语义整体一致、局部变化可控，形成 BiDPO-data-12k 数据集。
- 双向偏好优化同时训练 forward direction 与 reverse direction，使模型学习“正确图像-答案配对优于错配”以及“反向错配也应被拒绝”。
- 引入 explicit token-level supervision 与 regularization，让答案中的关键 token 对齐到相应视觉证据。
- 在 AMBER、MMHalBench、ObjectHalBench 等幻觉基准上评估，并报告 7B 规模模型在 MMHalBench 上 hallucination rate 从 57.0% 降到 31.2%。

#### 🔬 深入细节
![BiDPO framework reconstruction](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgUVtRdWVzdGlvbl0gLS0-IFNbU2VtYW50aWMgZm9jdXMgZXh0cmFjdG9yXQogIElbT3JpZ2luYWwgaW1hZ2VdIC0tPiBFW1RhcmdldGVkIHZpc3VhbCBlZGl0XQogIFMgLS0-IEUKICBFIC0tPiBQW01pbmltYWwgY29udHJhc3RpdmUgaW1hZ2UgcGFpcl0KICBQIC0tPiBDW0NMSVAgc2ltaWxhcml0eSBmaWx0ZXJdCiAgQyAtLT4gRFtCaURQTy1kYXRhLTEya10KICBEIC0tPiBGW0ZvcndhcmQgcHJlZmVyZW5jZTogY29ycmVjdCBwYWlyID4gbWlzbWF0Y2hlZCBwYWlyXQogIEQgLS0-IFJbUmV2ZXJzZSBwcmVmZXJlbmNlOiBlZGl0ZWQtY29ycmVjdCBwYWlyID4gb3JpZ2luYWwtbWlzbWF0Y2ggcGFpcl0KICBGIC0tPiBMW0JpZGlyZWN0aW9uYWwgRFBPIGxvc3NdCiAgUiAtLT4gTAogIEwgLS0-IFRbVG9rZW4tbGV2ZWwgZ3JvdW5kaW5nIHJlZ3VsYXJpemVyXQogIFQgLS0-IE1bVkxNIHdpdGggbG93ZXIgaGFsbHVjaW5hdGlvbl0K)
*图：根据 BiDPO 公开摘要、DOI 元数据与可检索方法描述复现的流程示意。TechRxiv PDF 对命令行访问返回 Cloudflare challenge，任务给定 arXiv 链接又对应无关论文，因此此处不用错误论文图。*

```python
# BiDPO 的核心流程，按公开论文摘要与方法描述简化整理
for sample in vqa_corpus:
    image, question, answer = sample.image, sample.question, sample.answer

    # 1. 找到问题真正依赖的视觉语义焦点
    focus = semantic_focus_extractor(question, answer)

    # 2. 生成最小视觉改动：只改变 focus 相关区域，保持其他语义稳定
    edited_image = targeted_visual_edit(image, focus)

    # 3. CLIP 过滤：整体仍相似，但局部语义差异足以影响答案
    if not clip_similarity_in_range(image, edited_image):
        continue

    # 4. 构造正反方向偏好对
    forward_pair = ((image, question, answer), (edited_image, question, answer))
    reverse_answer = answer_for_edited_image(question, edited_image)
    reverse_pair = ((edited_image, question, reverse_answer), (image, question, reverse_answer))

    # 5. 训练时同时优化双向 DPO 与 token-level grounding regularizer
    loss_f = dpo_loss(policy, reference, forward_pair)
    loss_r = dpo_loss(policy, reference, reverse_pair)
    loss_tok = token_grounding_loss(policy, image, question, answer, focus)
    loss = loss_f + loss_r + alpha * loss_tok
    policy.update(loss)
```

VLM 幻觉的根源之一是“答案 token 可以被语言先验解释，却没有被图像证据约束”。例如问题问图中物体颜色、数量或空间关系时，模型可能根据训练语料中的常见搭配回答，而不是检查局部视觉区域。普通 DPO 只告诉模型某个回答整体更好，不能保证模型关注了导致偏好差异的视觉 token。BiDPO 的动机是把偏好对构造成视觉最小对比：图像大部分保持一致，只修改问题所依赖的关键语义，从而让偏好信号集中到“看没看对视觉证据”上。

数据构造首先需要 semantic focus extraction。给定问题 \(q\) 和原始图像 \(I\)，算法识别答案依赖的局部概念 \(s\)，例如“红色杯子”的颜色、“三只狗”的数量、“左边的人”的空间位置。然后生成编辑图像 \(\tilde I\)，只对 \(s\) 做 targeted modification。CLIP similarity filtering 的作用是排除两类坏样本：一种是修改太小，模型不需要视觉辨别也能给同一答案；另一种是修改太大，整张图语义变了，偏好差异不再能归因到 semantic focus。

在优化目标上，BiDPO 可以看作多模态 DPO 的双向扩展。设 \((I,q,a^+)\) 是正确图像-问题-答案组合，\((\tilde I,q,a^-)\) 是由于视觉局部被改动而不再匹配的组合，单向 DPO 项可简化写成
$$
\mathcal{L}_{\mathrm{DPO}}^{\rightarrow}=-\log\sigma\left(\beta\left[\log\frac{\pi_\theta(a^+\mid I,q)}{\pi_{\mathrm{ref}}(a^+\mid I,q)}-\log\frac{\pi_\theta(a^-\mid \tilde I,q)}{\pi_{\mathrm{ref}}(a^-\mid \tilde I,q)}\right]\right).
$$
但只做 forward direction 仍可能让模型学到“原图答案比编辑图答案好”的浅层规律。BiDPO 额外加入 reverse direction：对编辑图像的正确答案 \(\tilde a^+\)，要求 \((\tilde I,q,\tilde a^+)\) 优于 \((I,q,\tilde a^+)\)。整体目标可写成
$$
\mathcal{L}_{\mathrm{BiDPO}}=\mathcal{L}_{\mathrm{DPO}}^{\rightarrow}+\mathcal{L}_{\mathrm{DPO}}^{\leftarrow}+\alpha\mathcal{L}_{\mathrm{token}}+\gamma\mathcal{R}_{\mathrm{reg}}.
$$
其中 \(\mathcal{L}_{\mathrm{token}}\) 表示 token-level supervision，\(\mathcal{R}_{\mathrm{reg}}\) 表示防止偏好优化过度破坏原模型能力的正则项。

Token-level supervision 是 BiDPO 区别于普通图文偏好优化的关键。整句级 DPO 只对完整答案打分，而 token-level 约束会关注答案中与视觉焦点直接相关的 token，例如颜色词、数量词、实体名或空间介词。可把它理解为对每个关键 token \(t\) 加一个 grounding mask \(m_t\)：
$$
\mathcal{L}_{\mathrm{token}}=\sum_{t=1}^{T}m_t\,\mathrm{CE}(z_t,\hat z_t)+\eta\,\mathrm{KL}(A_t\Vert M_s),
$$
其中 \(A_t\) 是模型在生成 token \(t\) 时的视觉注意或对齐分布，\(M_s\) 是 semantic focus 对应的视觉证据区域。这个公式是机制化写法：核心含义是，关键答案 token 不只要生成对，还要从对应图像区域获得支持。

双向优化带来的直接收益是降低“单向捷径”。如果只训练 \((I,a)\) 优于 \((\tilde I,a)\)，模型可能记住原图分布或问题模板；加入反向后，同一个 semantic focus 的两种状态都会被当作正例和负例出现，模型必须根据图像状态切换答案。换言之，BiDPO 把“不要幻觉”变成一个可判别任务：当局部视觉证据变化时，答案 token 必须随之变化；当局部证据没变化时，答案不应被无关背景扰动影响。

从与 TDPO / token-level DPO 的关系看，BiDPO 继承了“偏好信号不应只落在序列末端”的思想，但把 token 级别监督绑定到视觉证据。对 VLM 来说，偏好优化的失败常不是语言流畅性问题，而是视觉 grounding 问题；因此 BiDPO 的贡献在于同时控制数据构造、偏好方向和 token grounding。实验中使用 AMBER、MMHalBench、ObjectHalBench 等幻觉评测，公开摘要报告 MMHalBench hallucination rate 在 7B 模型上从 57.0% 降至 31.2%，说明这种最小视觉对比数据能显著提高模型对细粒度视觉线索的敏感度。

> 💡 关键：BiDPO 的“Bi”不是简单把 loss 乘二，而是让同一语义焦点的两个视觉状态互为正负样本；模型只有真正读取视觉证据，才能同时满足 forward 与 reverse preference。

#### 🧪 练习题
```yaml
question: "BiDPO 中双向偏好优化的主要目的是什么？"
options:
  - "让模型在训练时同时使用两个不同的语言分词器"
  - "让正确与错误的图像-答案配对在正反两个视觉状态下都被区分，减少依赖语言先验的幻觉"
  - "用 CLIP 完全替代 VLM 的视觉编码器"
  - "只提高答案长度，不改变视觉 grounding"
answer: 1
explain: "BiDPO 构造最小对比图像对，并在 forward 与 reverse 两个方向上训练偏好差异；这样模型必须根据局部视觉证据改变答案。"
```
