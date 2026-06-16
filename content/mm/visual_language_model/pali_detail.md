### PaLI — 联合缩放视觉与语言组件的多语言图像文本生成模型

```yaml
id: pali
name: PaLI
year: '2022'
category: encoder_decoder
institution: Google
paper: arXiv
motivation: 视觉语言联合缩放定律
parent: —
description: 提出视觉编码器和语言模型规模应同步增长，支持100+语言的多语言多模态理解。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/pali_detail.md
```

#### 📝 一句话总结

PaLI 提出一个简洁的 ViT + mT5 encoder-decoder 架构，用文本生成接口统一 captioning、VQA、OCR、检测和纯语言任务，并通过 WebLI 多语言数据与 ViT/mT5 联合缩放证明视觉侧和语言侧都需要同步增大。

#### 🎯 核心要点

- **统一 text-in/text-out 接口**：输入图像和文本 prompt，输出文本序列，不为不同任务添加专用分类头。
- **架构简单可扩展**：ViT 输出 patch features 作为视觉 token 送入 mT5 encoder，decoder 以 teacher forcing 学习目标文本。
- **联合缩放结论**：PaLI-3B 使用 mT5-Large + ViT-G，PaLI-15B 使用 mT5-XXL + ViT-G，PaLI-17B 使用 mT5-XXL + 4B 参数 ViT-e。
- **WebLI 多语言语料**：构建覆盖 109 种语言的 WebLI，原始规模约 10B images、12B alt-texts，并提取 29B OCR pairs。
- **八类预训练任务混合**：text-only span corruption、WebLI split-captioning、CC3M-35L captioning、OCR、VQA、VQG、object-aware VQA、generative detection。
- **开放词表多语言评估**：在 COCO/NoCaps captioning、VQAv2/OKVQA/TextVQA、Crossmodal-3600、xGQA/MaXM 等任务上展示多语言与场景文字能力。

#### 🔬 深入细节

##### 架构图

![PaLI 主架构](https://ar5iv.labs.arxiv.org/html/2209.06794/assets/x1.png)
*图：PaLI 使用大规模 ViT 提取视觉 token，并将它们送入 encoder-decoder Transformer 以生成文本答案。*

##### 算法/流程伪代码

```python
# PaLI 预训练与任务统一伪代码
vit = FrozenOrPartiallyTrainableViT(size="G_or_e")
mt5 = MT5EncoderDecoder(size="Large_or_XXL")
mixture = [
    TextOnlySpanCorruption(),
    WebLISplitCaptioning(),
    CC3M35LCaptioning(),
    WebLIOCR(),
    CrossLingualVQA(),
    CrossLingualVQG(),
    ObjectAwareVQA(),
    GenerativeDetection(),
]

for task in sample_by_mixture_weights(mixture):
    image, prompt, target_text = task.sample()

    if image is not None:
        patch_tokens = vit(image)  # no pooling, keep visual token sequence
        encoder_input = concat(patch_tokens, tokenize(prompt))
    else:
        encoder_input = tokenize(prompt)

    decoder_input = shift_right(tokenize(target_text))
    logits = mt5(encoder_input, decoder_input)
    loss = cross_entropy(logits, tokenize(target_text))
    update_trainable_parameters(loss)

# 推理时不同任务只换 prompt 和候选输出格式
caption = generate(image, prompt="Generate alt_text in EN:")
answer = generate(image, prompt="Answer in ZH: 图中有什么?")
boxes = generate(image, prompt="detect cat and dog")
```

##### 1. 动机：多模态模型不能只缩放语言侧

PaLI 的论文标题强调 jointly-scaled。此前许多大 VLM 把参数主要放在语言模型侧，视觉编码器相对小；这在开放式文本生成上合理，但会限制细粒度视觉、OCR、跨语言 captioning 和 VQA。PaLI 的核心问题是：当语言模型已经达到 13B 级别后，继续扩大视觉 backbone 是否仍能带来多模态收益？

论文给出的答案是肯定的。PaLI-15B 和 PaLI-17B 的语言侧同为 mT5-XXL，主要区别是视觉侧从 1.8B ViT-G 升级到 4B ViT-e。结果显示视觉语言任务仍有增益，说明多模态性能并未在视觉侧饱和。这个结论对后续 VLM 很重要：只把图像压成少量弱视觉特征再交给超大 LLM，不一定是最优缩放路径。

##### 2. 架构：ViT patch token 直接进入 encoder-decoder

PaLI 的架构刻意保持简单：图像由 ViT 编码，输出 patch-level visual tokens；这些 token 不做 pooling，而是与文本 prompt 一起输入 mT5 encoder。decoder 只负责生成目标文本。因此所有任务都变成条件文本生成：

$$
p_\theta(y \mid I, x)
= \prod_{t=1}^{T} p_\theta(y_t \mid y_{<t},\ \operatorname{Enc}_\theta([\operatorname{ViT}(I); x])) .
$$

训练损失是标准 teacher-forcing cross entropy：

$$
\mathcal{L}
= -\sum_{t=1}^{T}\log p_\theta(y_t^\star \mid y_{<t}^\star, I, x).
$$

这套接口的优点是任务头极少：captioning 输出一句话，VQA 输出答案字符串，OCR 输出识别文字，检测输出坐标和类别的文本序列。模型不需要维护“分类头/检测头/问答头”的并行体系，迁移到新语言或新任务时主要改变 prompt 和目标格式。

##### 3. WebLI：规模、多语言和 OCR 三个维度一起做

PaLI 构建 WebLI 来补足多语言图文数据。原始 WebLI 覆盖约 10B images 和 12B alt-texts，语言覆盖 109 种；同时对所有图像提取 OCR，得到约 29B image-OCR pairs。为了兼顾质量和规模，论文使用跨模态相似度给 image-alt-text pair 打分，并保留前 10% 高质量图文对，约 1B examples。

最终预训练混合约 1.6B examples，八类任务覆盖纯文本、图文描述、OCR、VQA、问题生成、object-aware VQA 和生成式检测。任务混合可写为：

$$
\mathcal{L}_{\text{mix}}
= \sum_{k=1}^{8} \lambda_k
\mathbb{E}_{(I,x,y)\sim \mathcal{D}_k}
\left[-\log p_\theta(y \mid I,x)\right].
$$

其中 object detection 的输出也被文本化，例如用 \(0\) 到 \(999\) 的整数坐标生成 `ymin xmin ymax xmax class`。这让 PaLI 在不引入检测器头的情况下学习空间定位能力，但也意味着检测精度依赖文本序列建模和坐标离散化质量。

##### 4. 训练策略：先冻结视觉侧，再做高分辨率联合阶段

PaLI 各规模模型先在 224×224 分辨率上跑完整 1.6B 预训练混合；这一阶段只更新语言组件，视觉组件冻结。这个选择有两个作用：复用强 ViT 表征，控制大规模训练成本；同时避免在噪声多语言数据上过早破坏视觉 backbone。

对最大 PaLI-17B，论文额外加入 588×588 高分辨率阶段，约 10k steps、10M examples，并更新所有参数。高分辨率阶段对 OCR、TextVQA、细粒度 captioning 等任务尤其关键，因为这些任务需要读取小文字或局部细节。可以把它理解为先用低分辨率完成跨任务/跨语言对齐，再用短程高分辨率训练补足视觉细节。

##### 5. ViT-e 与联合缩放：视觉侧的参数仍然有价值

PaLI-17B 使用新训练的 ViT-e：宽度、深度和 MLP 维度都比 ViT-G 进一步放大，总参数约 4B。论文比较显示，ViT-e 在传统 ImageNet 分类上的提升相对有限，但在 PaLI 的视觉语言任务中能带来更明显收益，例如 COCO captioning 和 VQAv2 等指标均随视觉侧放大提高。

这个现象说明 V&L 任务对视觉表征的要求和单纯分类不同。分类可以由全局语义支撑，而 captioning/VQA/OCR 需要对象属性、数量、文字、空间关系等细节；因此当语言模型足够强时，视觉 token 的容量和分辨率会成为瓶颈。PaLI 的价值不只是一个模型结果，而是提出了“语言和视觉共同扩展”的经验路线。

##### 6. 与 Flamingo、BLIP 类方法的区别

Flamingo 更像冻结 LM 的少样本连接器，强调 in-context learning；BLIP 更强调 CapFilt 改善英文图文预训练质量，并统一理解/生成目标。PaLI 则选择 encoder-decoder 生成接口和多语言数据混合，核心关注联合缩放、开放词表和 100+ 语言覆盖。它不是把视觉信息当作少量 prompt token 附加给 decoder-only LM，而是让视觉 token 进入 encoder，decoder 在 mT5 的多语言词表上生成答案。

这种设计带来两个直接结果：一是 VQA 不再局限于 3k 答案分类，而是开放词表生成；二是同一模型可以在英文 captioning、跨语言 captioning、xGQA/MaXM 多语言 VQA 和 OCR-heavy benchmarks 上复用。代价是训练数据和模型规模都很大，且许多能力依赖 WebLI 这种高覆盖多语言数据集。

#### 🧪 练习题

```yaml
question: "PaLI 论文中“jointly-scaled”的主要含义是什么？"
options:
  - "只扩大语言模型，视觉编码器保持很小即可"
  - "视觉编码器和语言 encoder-decoder 都应随任务规模同步扩大"
  - "把所有任务都改成闭集分类"
  - "用单语言英文数据替代多语言数据"
answer: 1
explain: "PaLI 比较了 mT5 与 ViT 的不同组合，并用 ViT-e 证明视觉侧继续放大仍能提升多模态任务表现，因此强调视觉和语言组件需要联合缩放。"
```
