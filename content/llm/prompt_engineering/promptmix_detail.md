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
PromptMix 利用 LLM 生成多粒度语义属性，再通过语言感知提示增强和跨模态自适应对齐，把类别语义、文本 prompt 与视觉特征混合起来提升 VLM 泛化。

#### 🎯 核心要点
- 针对视觉语言模型 prompt learning 在跨域和新类上的泛化不足
- 用 LLM 提供类别属性、语义层级和可区分概念
- MASR 选择高判别性的多粒度语义知识
- LAPE 通过门控残差机制把语义表示注入文本 prompt
- CAA 在跨模态空间动态对齐图像语义和文本语义
- 在零样本、少样本、base-to-new 和跨数据集迁移中验证泛化收益

#### 🔬 深入细节
[ScienceDirect 论文页](https://www.sciencedirect.com/science/article/pii/S1566253526000655)；[东南大学网络空间安全学院论文公开介绍与图源](https://cybersecurity.seu.edu.cn/2026/0317/c18223a520402/page.htm)；[DOI 页面](https://doi.org/10.1016/j.inffus.2026.104186)。

```python
# PromptMix 语义提示混合伪代码
def promptmix_train(vlm, class_names, images, labels, llm):
    raw_attributes = {
        c: llm.generate_semantic_attributes(c) for c in class_names
    }
    selected_semantics = MASR_select_discriminative_attributes(raw_attributes)

    for image, label in minibatches(images, labels):
        text_prompt = build_base_prompt(class_names)
        enhanced_prompt = LAPE_gate_residual(text_prompt, selected_semantics)

        image_feature = vlm.encode_image(image)
        text_feature = vlm.encode_text(enhanced_prompt)
        mixed_feature = CAA_align_and_fuse(image_feature, text_feature)

        loss = classification_loss(mixed_feature, label) + alignment_regularizer(mixed_feature)
        update_prompt_parameters(loss)
    return enhanced_prompt
```

PromptMix 的出发点是：类别名本身常常太贫乏。例如“jaguar”可能是动物也可能是汽车；即使类别名明确，不同数据集中的视觉风格也可能变化。LLM 可以补充类别外观、部件、场景和语义层级，但直接把所有属性塞进 prompt 会引入噪声，所以需要选择和融合机制。

MASR 负责从 LLM 生成的候选语义中筛出真正有区分度的概念。多粒度意味着既保留宏观类别描述，也保留局部属性、上下文和易混类别差异。这样 prompt 不再只是“a photo of a class”，而是包含能区分相似类的语义线索。

LAPE 将这些语义表示注入文本 prompt，但不是简单拼接文本。门控残差机制允许模型控制语义增强的强度：当外部语义有帮助时增强文本特征，当语义与图像域不匹配时保留原始 prompt 表达。这比固定模板更适合跨数据集迁移。

CAA 则处理图像和文本空间的动态对齐。视觉特征可能突出背景、姿态或风格，文本语义突出类别属性；CAA 通过跨模态融合让两者在任务相关维度上对齐。PromptMix 的整体思想是把 LLM 语义作为可筛选、可门控、可对齐的增强信号，而不是把 LLM 描述当作固定标签解释。

#### 🧪 练习题
```yaml
question: "PromptMix 中 MASR 的主要作用是什么？"
options:
  - "从 LLM 生成的多粒度语义中选择高判别性属性"
  - "把图像全部转换成文本"
  - "替代 VLM 的视觉编码器"
  - "随机混合两个类别标签"
answer: 0
explain: "MASR 负责语义重构与筛选，避免把所有 LLM 属性无差别注入 prompt。"
```
