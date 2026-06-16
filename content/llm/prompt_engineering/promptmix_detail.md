### PromptMix：提示混合增强 (PromptMix)
```yaml
id: promptmix
name: PromptMix
full_name: 提示混合增强 (PromptMix)
year: '2026.03'
org: Information Fusion
paper_url: https://www.sciencedirect.com/science/article/pii/S1566253526000655
category: frontier_2026
parent: —
motivation: 语义提示与多模态混合增强泛化能力
```

#### 📝 一句话总结
PromptMix 提出一种由 LLM 辅助的视觉语言模型提示学习框架，通过语义提示进化、模态无关共享表示和跨注意力适配器，缓解小样本工业识别中的过拟合、提示表达不足和跨模态对齐不稳问题。

#### 🎯 核心要点
- 面向真实工程视觉识别：重点处理标注稀缺、缺陷形态细微、类间差异容易混淆的低数据场景
- LLM 语义增强：为类别生成细粒度自然语言描述，并经冻结文本编码器得到局部语义 \(T_{local}\) 与全局语义 \(T_{global}\)
- MASR：构建 Modality-Agnostic Shared Representation，减少预训练数据与目标工业数据之间的分布差异
- LAPE：利用 LLM-Aided Prompt Evolution 将外部语义融入可学习上下文提示，迭代改进提示表达
- CAA：通过 Cross-Attentive Adapter 对文本与图像分支进行跨模态融合，提升低样本条件下的鲁棒性
- 多损失训练：联合分类损失、提示进化/对齐相关损失与教师分布蒸馏，使 student 预测接近更稳定的 teacher 分布
- 实验覆盖七个数据集：包含六个公开工业基准和一个自建工业数据集，验证 base-to-novel 与 few-shot 泛化

#### 🔬 深入细节
![PromptMix 框架图](https://ars.els-cdn.com/content/image/1-s2.0-S1566253526000655-gr1_lrg.jpg)
*图：PromptMix 的整体流程。LLM 生成类别描述，MASR 产生共享表示，LAPE 进化文本提示，CAA 对图像与文本分支做跨注意力适配。*

```python
# PromptMix 训练流程伪代码
def train_promptmix(vlm, class_names, train_loader, llm, teacher):
    freeze(vlm.text_encoder, vlm.image_encoder)
    prompts = init_learnable_context(class_names)          # X_prompt + class token
    adapters = init_cross_attentive_adapters()
    masr = init_modality_agnostic_shared_representation()

    llm_prompts = {
        c: llm.generate_description(c, domain="industrial recognition")
        for c in class_names
    }
    llm_tokens = tokenize(llm_prompts)
    t_local, t_global = vlm.text_encoder(llm_tokens).token_features_and_mean()

    for images, labels in train_loader:
        r_text, r_vision = masr(prompts, images)
        evolved_prompt = LAPE(
            base_prompt=prompts,
            llm_local=t_local,
            llm_global=t_global,
            shared_text=r_text,
        )

        text_feat = vlm.text_encoder(evolved_prompt)
        image_feat = vlm.image_encoder(images, visual_prompt=r_vision)
        fused_text, fused_image = adapters.cross_attend(text_feat, image_feat)

        student_logits = cosine_classifier(fused_image, fused_text)
        with no_grad():
            teacher_logits = teacher(images, class_names)

        loss = (
            ce_loss(student_logits, labels)
            + lambda_pil * prompt_image_language_loss(fused_image, fused_text)
            + lambda_prl * prompt_refinement_loss(evolved_prompt, t_global)
            + lambda_kd * kl_divergence(student_logits, teacher_logits)
        )
        update(prompts, adapters, masr, loss)

    return prompts, adapters, masr
```

PromptMix 的直接动机是 CLIP 类视觉语言模型在低样本工业场景中容易出现两类失败：一是可学习 prompt 只由少量样本驱动，容易记住训练域的表面纹理；二是类别名或模板句过短，无法表达“焊缝细黑沟槽”“轻微划痕”这类细粒度语义。论文因此不把 LLM 只当作离线文字扩写器，而是把 LLM 描述、可学习 prompt、图像特征放入同一个可训练融合流程中。

在语义侧，LLM 根据类别和任务上下文生成更具判别性的描述 \(T_{LLM}\)，再通过冻结的文本编码器得到 token 级局部语义 \(T_{local}\) 与平均池化后的全局语义 \(T_{global}\)。局部语义适合描述部件、形状、颜色和缺陷模式，全局语义提供类别级概念锚点；这比直接使用 “a photo of a class” 更能覆盖工业图像中的细微差异。

MASR 的作用是建立模态无关共享表示。图中可以看到 MASR 同时向文本 prompt 编码器与图像 prompt 编码器提供 \(R_t\) 与 \(R_v\)，直觉上是在可学习 prompt 前先构造一个跨模态共享的潜在空间。这样做的意义是降低 CLIP 预训练分布与目标工业数据分布之间的落差，避免文本分支只学到自然图像语义、视觉分支只响应目标域噪声。

LAPE 是 PromptMix 的提示进化核心。它不是简单把 LLM 输出拼接到模板里，而是让 Prompt Evolution 模块在 \(T_{local}\)、\(T_{global}\)、当前 prompt 表示之间进行迭代更新，并用提示相关损失约束更新方向。可以把整体目标概括为：

$$
\mathcal{L} =
\mathcal{L}_{CE}
+ \lambda_{PIL}\mathcal{L}_{PIL}
+ \lambda_{PRL}\mathcal{L}_{PRL}
+ \lambda_{KD}\mathcal{L}_{KD}.
$$

其中 \(\mathcal{L}_{CE}\) 负责监督分类，\(\mathcal{L}_{PIL}\) 与 \(\mathcal{L}_{PRL}\) 约束图文提示交互和提示进化质量，\(\mathcal{L}_{KD}\) 让 student 的预测分布向 teacher 分布靠近。这个组合目标的核心不是追求更复杂的分类头，而是让提示、图像和文本三类信号在低样本下保持一致。

CAA 负责最后的跨模态适配。图中 Text Adapter 与 Image Adapter 接收文本信号、图像信号和多模态信号，通过交互后输出 \(T_{TA}\) 与 \(V_{IA}\)，再计算 student 预测 \(P_{student}\)。相比只调文本 prompt 的 CoOp 式方法，PromptMix 同时让视觉侧与文本侧参与适配；相比只做特征 adapter 的方法，它又保留了 LLM 语义对类别边界的指导。

推理时，训练好的 prompt、MASR 和 adapter 被固定，输入图像经图像编码器与图像适配器得到视觉特征，类别侧使用进化后的文本提示得到文本原型，再以图文相似度完成分类。因此 PromptMix 的优势主要体现在需要从少量标注中泛化到新类别或新工业场景时：LLM 语义提供更宽的概念覆盖，MASR 降低域偏移，CAA 让两种模态在任务相关维度上重新对齐。

#### 🧪 练习题
```yaml
question: "PromptMix 中 LAPE 的主要作用是什么？"
options:
  - "利用 LLM 语义迭代增强和细化可学习文本提示"
  - "把所有图像转换为纯文本描述后再分类"
  - "替代 CLIP 的文本编码器和图像编码器"
  - "只用 BM25 检索类别相关文档"
answer: 0
explain: "LAPE 即 LLM-Aided Prompt Evolution，核心是把 LLM 生成的局部/全局语义注入可学习 prompt，并约束提示进化过程。"
```
