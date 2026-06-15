### 双向DPO (BiDPO)

```yaml
id: bidpo
full_name: 双向DPO (BiDPO)
year: '2026.02'
paper_url: https://arxiv.org/abs/2602.10234
motivation: 双向Token级VLM偏好优化
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
BiDPO 面向视觉语言模型幻觉问题，构造最小但语义对比的图像-答案偏好对，并用正向与反向两种 DPO 约束加上 token 级监督，让模型更关注细粒度视觉证据。

#### 🎯 核心要点
- 公开摘要显示 BiDPO 会自动识别问题的 semantic focus，并构造带局部视觉修改的 contrastive image pairs。
- 使用 CLIP-based similarity filtering 保证改图保持语义一致、变化局部且与问题相关。
- 双向偏好优化同时比较正确图像-答案与错误图像-答案，也比较反向组合，迫使模型区分视觉证据是否支持答案。
- 加入 token-level supervision / regularization，使答案 token 与相应视觉证据绑定，降低语言先验驱动的幻觉。
- 在 AMBER、MMHalBench、ObjectHalBench 以及 VQAv2/GQA/SQA 等基准上报告幻觉率下降与通用能力提升。

#### 🔬 深入细节
公开页面/图源链接：[TechRxiv DOI 页面](https://www.techrxiv.org/doi/full/10.36227/techrxiv.177091884.42596378)，备用摘要页：[ResearchGate publication page](https://www.researchgate.net/publication/400740150_BiDPO_Bidirectional_Preference_Optimization_with_Token-level_Supervision_for_Vision-Language_Models)。manifest 中的 arXiv 链接指向无关论文，因此方法解读依据上述公开摘要页和 DOI 索引。

```python
# BiDPO 简化训练流程
for image, question, answer in multimodal_data:
    focus = identify_semantic_focus(question, answer)
    image_cf = edit_image_locally(image, focus)
    if clip_similarity(image, image_cf) < sim_threshold:
        continue

    # forward: 原图应支持正确答案，反事实图不应支持该答案
    loss_fwd = dpo_loss(
        chosen=(image, question, answer),
        rejected=(image_cf, question, answer),
        policy=vlm,
        reference=ref_vlm,
    )

    # reverse: 反事实图对应的答案应优于原图上的错误匹配
    answer_cf = build_counterfactual_answer(answer, focus)
    loss_rev = dpo_loss(
        chosen=(image_cf, question, answer_cf),
        rejected=(image, question, answer_cf),
        policy=vlm,
        reference=ref_vlm,
    )

    token_loss = visual_grounding_regularizer(vlm, answer_tokens=[answer, answer_cf])
    update(vlm, loss_fwd + loss_rev + lambda_tok * token_loss)
```

BiDPO 的动机来自 VLM 的典型失败：模型会凭语言先验回答，而不是仔细读取图像中的局部证据。例如问题只关心物体颜色、数量或空间关系时，模型可能生成看似合理但与图像不符的答案。普通 DPO 只比较两个文本回答，无法强制模型确认“这张图是否真的支持这个 token”。

方法的第一步是构造反事实视觉偏好数据。BiDPO 先识别问题和答案中的 semantic focus，再对图像做最小局部修改，例如改变目标属性、对象或关系。CLIP 相似度过滤用于保证修改不是大幅换图，而是在保持整体语义的前提下制造局部差异，这样偏好信号才指向视觉 grounding，而不是图像分布偏移。

“双向”是 BiDPO 相对普通 DPO 的核心。正向约束要求原图-正确答案优于反事实图-原答案；反向约束要求反事实图-反事实答案优于原图-反事实答案。两个方向合起来，让模型不能只记住某个答案文本更常见，而必须根据当前图像证据判断哪个图文配对更合理。

token-level supervision 进一步把偏好压力落到答案 token 上。对 VLM 来说，错误往往集中在颜色词、数量词、类别词、位置词等少数 token；如果只做序列级偏好，梯度可能被无关句式吸收。BiDPO 通过显式 token 级正则让这些关键 token 与视觉区域或视觉差异绑定，提升可解释性和可靠性。

> ⚠️ 注意：BiDPO 的公开全文访问受限，当前可核验信息主要来自 TechRxiv DOI 索引和 ResearchGate 摘要；因此这里的伪代码按摘要描述的双向 DPO 机制整理为实现级流程。

#### 🧪 练习题
```yaml
question: "BiDPO 的双向优化主要想解决什么问题？"
options:
  - "让 VLM 在原图和反事实图上都根据视觉证据选择匹配答案"
  - "让 VLM 忽略图像，只优化语言流畅度"
  - "把所有图像转换为文本再训练"
  - "只减少训练 batch size"
answer: 0
explain: "双向约束同时检查原图-答案和反事实图-答案的匹配关系，迫使模型关注细粒度视觉变化。"
```
